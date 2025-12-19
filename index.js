// ========================
// TimeDrop backend - MULTI-QUIZ SUPPORT
// Stödjer: musik, film, historia
// Uppdaterad logik: Gemensam "självläkande" tidslinje
// ========================

import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { songCategories, getRandomSongs } from './song-library.js';
import { movieCategories, getRandomMovies } from './movie-library.js';
import { getRandomHistory, getHistoryCategories } from './history-library.js';

// import { inventionCategories, getRandomInventions } from './invention-library.js';
// import { gameCategories, getRandomGames } from './game-library.js';

const app = express();
const server = http.createServer(app);

// CORS-konfiguration
const allowedOrigins = [
  'https://timedrop.se',
  'https://www.timedrop.se',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];

const io = new SocketIOServer(server, {
  cors: { 
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked request from: ${origin}`);
        callback(null, true);
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'TimeDrop backend is running' });
});

// =========================
// Spotify-konfiguration
// =========================

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const spotifyAuthSessions = new Map();

function generateRandomState(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function isSpotifyAuthed(game) {
  if (!game || !game.spotifyTokens) return false;
  const now = Date.now() / 1000;
  return game.spotifyTokens.expires_at && game.spotifyTokens.expires_at - now > 60;
}

app.get('/spotify-login', (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) return res.status(500).send('Spotify ej konfigurerat.');
  const gameId = req.query.gameId;
  if (!gameId) return res.status(400).send('Saknar gameId.');

  const state = generateRandomState();
  spotifyAuthSessions.set(state, { gameId, timestamp: Date.now() });

  const scopes = 'user-read-email user-read-private streaming user-read-playback-state user-modify-playback-state';
  const params = new URLSearchParams({
    response_type: 'code', client_id: SPOTIFY_CLIENT_ID, scope: scopes, redirect_uri: SPOTIFY_REDIRECT_URI, state
  });
  return res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

app.get('/spotify-callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error || !state || !spotifyAuthSessions.has(state)) return res.status(400).send('Spotify-fel eller ogiltig session.');
  
  const session = spotifyAuthSessions.get(state);
  const gameId = session.gameId;
  spotifyAuthSessions.delete(state);

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code', code, redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID, client_secret: SPOTIFY_CLIENT_SECRET
    });
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body
    });
    const data = await tokenRes.json();
    if (!tokenRes.ok) return res.status(500).send('Token-fel.');

    const now = Date.now() / 1000;
    if (games[gameId]) {
      games[gameId].spotifyTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: now + (data.expires_in || 3600)
      };
    }
    return res.send('<script>window.close();</script><h1>Spotify ansluten!</h1>');
  } catch (err) {
    return res.status(500).send('Serverfel vid Spotify-login.');
  }
});

app.get('/spotify-status', (req, res) => {
  const game = games[req.query.gameId];
  res.json({ authed: isSpotifyAuthed(game) });
});

app.get('/spotify-token', (req, res) => {
  const game = games[req.query.gameId];
  if (!isSpotifyAuthed(game)) return res.status(401).json({ error: 'Not authed' });
  res.json({ access_token: game.spotifyTokens.access_token });
});

// =========================
// Kategorier
// =========================

app.get('/song-categories', (req, res) => {
  const categories = Object.keys(songCategories).map(id => ({ id, name: id, count: songCategories[id].length }));
  res.json({ categories });
});

app.get('/movie-categories', (req, res) => {
  const categories = Object.keys(movieCategories).map(id => ({ id, name: id, count: movieCategories[id].length }));
  res.json({ categories });
});

app.get('/history-categories', (req, res) => {
  const categories = getHistoryCategories().map(cat => ({ id: cat, name: cat, count: 0 }));
  res.json({ categories });
});

// =========================
// Spellogik (UPDATED)
// =========================

const games = {};
const demoSongs = [
  { id: 'song1', title: "Elvis Presley – Jailhouse Rock", year: 1957 },
  { id: 'song3', title: "ABBA – Dancing Queen", year: 1976 },
  { id: 'song9', title: "Nirvana – Smells Like Teen Spirit", year: 1991 },
  { id: 'song12', title: "OutKast – Hey Ya!", year: 2003 },
  { id: 'song14', title: "Adele – Rolling in the Deep", year: 2010 },
];

function generateGameId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function buildScores(game) {
  const arr = [];
  for (const id in game.players) {
    const p = game.players[id];
    arr.push({ playerId: id, name: p.name, score: p.score || 0 });
  }
  arr.sort((a, b) => b.score - a.score);
  return arr;
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // 1. SKAPA SPEL
  socket.on('create_game', (payload = {}) => {
    const { rounds, categories, quizType } = payload;
    const gameId = generateGameId();
    const type = quizType || 'music';
    const numRounds = parseInt(rounds, 10) || 5;

    let itemOrder = [];
    
    // Välj items baserat på typ
    if (type === 'movies') {
      const cats = (categories && categories.length) ? categories : Object.keys(movieCategories);
      itemOrder = getRandomMovies(cats, numRounds);
    } else if (type === 'history') {
      const cats = (categories && categories.length) ? categories : getHistoryCategories();
      itemOrder = getRandomHistory(cats, numRounds);
    } else {
      // Music (default)
      const cats = (categories && categories.length) ? categories : Object.keys(songCategories);
      itemOrder = (cats.length > 0) ? getRandomSongs(cats, numRounds) : demoSongs;
    }

    games[gameId] = {
      id: gameId,
      hostId: socket.id,
      players: {},
      currentRoundIndex: 0,
      currentItem: null,
      guesses: {},
      quizType: type,
      itemOrder,
      rounds: Math.min(numRounds, itemOrder.length),
      playedItems: [],
      masterTimeline: [], // NYTT: Den gemensamma "sanna" tidslinjen
      spotifyTokens: null
    };

    socket.join(gameId);
    console.log(`✅ Game created: ${gameId} (${type})`);
    socket.emit('game_created', { gameId, rounds: games[gameId].rounds, quizType: type });
  });

  // 2. GÅ MED
  socket.on('join_game', ({ gameId, playerName }) => {
    const game = games[gameId];
    if (!game) return socket.emit('join_error', { message: 'Spelet finns inte.' });

    const name = (playerName || 'Spelare').toString().trim().substring(0, 20);
    game.players[socket.id] = { id: socket.id, name, score: 0 };

    socket.join(gameId);
    socket.emit('joined_game', { gameId, name, quizType: game.quizType });
    io.to(game.hostId).emit('player_joined', { gameId, playerId: socket.id, name, count: Object.keys(game.players).length });
  });

  // 3. STARTA RUNDA (Skickar Master Timeline)
  socket.on('start_round', async ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;

    if (game.currentRoundIndex >= game.rounds) {
      return io.to(game.hostId).emit('no_more_songs', { message: 'Spelet är slut.' });
    }

    const item = game.itemOrder[game.currentRoundIndex];
    game.currentItem = item;
    game.guesses = {};

    console.log(`Round ${game.currentRoundIndex + 1}: ${item.title} (${item.year})`);

    // Hämta media (Spotify/Youtube/Bild)
    let previewUrl = null, spotifyUri = null, imageUrl = null, youtubeId = null;
    
    // ... (Här behåller vi din existerande logik för att hämta media, kortat för översikt)
    // För Musik: Auto-sök Spotify om inloggad
    if (game.quizType === 'music' && isSpotifyAuthed(game)) {
      try {
        const q = `artist:${item.artist} track:${item.title}`;
        const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=1`, {
          headers: { 'Authorization': `Bearer ${game.spotifyTokens.access_token}` }
        });
        const data = await res.json();
        if (data.tracks?.items?.length) {
          const t = data.tracks.items[0];
          previewUrl = t.preview_url;
          spotifyUri = t.uri;
        }
      } catch (e) { console.error('Spotify search fail', e); }
    } else if (game.quizType === 'movies') {
      youtubeId = item.youtubeId;
    } else if (game.quizType === 'history') {
      imageUrl = item.imageUrl;
    }

    // SKICKA TILL SPELARE
    // VIKTIGT: Vi skickar med 'timeline' (Master Timeline) till alla!
    io.to(gameId).emit('timeline_round_started', {
      gameId,
      round: game.currentRoundIndex + 1,
      totalRounds: game.rounds,
      item: { 
        id: item.id, 
        title: item.title, 
        artist: item.artist,
        category: item.category,
        // OBS: Skicka INTE 'year' här!
      },
      timeline: game.masterTimeline // Skickar den sanna tidslinjen
    });

    // SKICKA TILL MASTER (Facit/Media)
    io.to(game.hostId).emit('master_preview', {
      gameId,
      title: item.title,
      artist: item.artist,
      year: item.year, // Master får se året direkt
      previewUrl, spotifyUri, imageUrl, youtubeId
    });

    game.currentRoundIndex++;
  });

  // 4. TA EMOT SVAR (Jämför mot Master Timeline)
  socket.on('submit_position', ({ gameId, position }) => {
    const game = games[gameId];
    if (!game || !game.currentItem) return;
    
    const player = game.players[socket.id];
    if (!player) return;

    // -- NY LOGIK: Jämför position (lucka) mot Master Timeline --
    const timeline = game.masterTimeline;
    const cardToPlace = game.currentItem;
    const submittedIndex = parseInt(position, 10);
    
    let isCorrect = true;

    // Kolla kortet FÖRE (om det finns)
    // Om nya kortet är ÄLDRE än kortet till vänster -> FEL
    if (submittedIndex > 0) {
      const prevCard = timeline[submittedIndex - 1];
      if (cardToPlace.year < prevCard.year) isCorrect = false;
    }

    // Kolla kortet EFTER (om det finns)
    // Om nya kortet är NYARE än kortet till höger -> FEL
    if (submittedIndex < timeline.length) {
      const nextCard = timeline[submittedIndex];
      if (cardToPlace.year > nextCard.year) isCorrect = false;
    }

    // Poängsättning
    const points = isCorrect ? 10 : 0; // Exempel: 10 poäng för rätt lucka
    player.score += points;

    // Spara att spelaren har gissat
    game.guesses[socket.id] = { 
      position: submittedIndex, 
      correct: isCorrect, 
      points 
    };

    // Skicka bekräftelse till spelaren (skicka tillbaka tidslinjen så vyn inte buggar)
    socket.emit('position_received', { timeline: game.masterTimeline });

    // Uppdatera Master Live (Visar att spelaren svarat)
    // För att master-vyn inte ska krascha skickar vi en "fejkad" timeline 
    // som bara visar var spelaren *tror* den ligger, eller bara status.
    io.to(game.hostId).emit('timeline_player_update', {
      playerId: player.id,
      name: player.name,
      // Vi skickar en array som representerar var spelaren la kortet för visualisering
      timeline: [`Svarade på plats ${submittedIndex} (${isCorrect ? 'Rätt' : 'Fel'})`] 
    });

    // Kolla om alla svarat
    const allPlayers = Object.keys(game.players);
    const allGuessed = allPlayers.length > 0 && allPlayers.every(id => game.guesses[id]);
    
    if (allGuessed) {
      endTimelineRound(game);
    }
  });

  // 5. AVSLUTA RUNDA (Uppdatera Master Timeline)
  function endTimelineRound(game) {
    if (!game.currentItem) return;

    // 1. Lägg till kortet i den sanna tidslinjen
    game.masterTimeline.push(game.currentItem);
    game.playedItems.push(game.currentItem);
    
    // 2. SORTERA tidslinjen efter år (Självläkande!)
    game.masterTimeline.sort((a, b) => a.year - b.year);

    // Skapa en sammanfattning för master
    const timelinesSummary = Object.keys(game.players).map(pid => ({
      name: game.players[pid].name,
      correct: game.guesses[pid]?.correct || false,
      points: game.guesses[pid]?.points || 0
    }));

    const scores = buildScores(game);

    io.to(game.hostId).emit('timeline_round_summary', {
      gameId: game.id,
      timelines: timelinesSummary, // Lista med vem som hade rätt/fel
      scores
    });

    io.to(game.hostId).emit('scoreboard_update', { scores });

    game.currentItem = null;
    game.guesses = {};
    console.log(`✅ Round ended. Timeline length: ${game.masterTimeline.length}`);
  }

  socket.on('end_timeline_round', ({ gameId }) => {
    const game = games[gameId];
    if (game && socket.id === game.hostId) endTimelineRound(game);
  });

  socket.on('end_game', ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;

    const scores = buildScores(game);
    // Skicka facit
    const answer = [...game.masterTimeline]; // Den är redan sorterad!

    io.to(gameId).emit('game_ended', { 
      gameId, 
      scores, 
      answer 
    });
    delete games[gameId];
  });

  socket.on('disconnect', () => {
    // Valfritt: Ta bort spelare om de kopplar ner
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 TimeDrop backend listening on port ${PORT}`);
});
