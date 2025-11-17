// ========================
// HitFlick backend + Spotify - UPDATED
// ✅ Lagt till: quizType-stöd
// ✅ Fixat: Per-game Spotify tokens (inte längre globalt)
// ========================

import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { songCategories, getRandomSongs } from './song-library.js';

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: { 
    origin: ["https://timedrop.se", "https://www.timedrop.se", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: ["https://timedrop.se", "https://www.timedrop.se", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'HitFlick backend is running locally' });
});

// =========================
// Spotify-konfiguration
// =========================

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// ✅ ÄNDRING: Spotify-tokens per session istället för globalt
// Key = state (från auth flow), Value = {tokens, gameId}
const spotifyAuthSessions = new Map();

function generateRandomState(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function isSpotifyAuthed(game) {
  if (!game || !game.spotifyTokens) return false;
  const now = Date.now() / 1000;
  return game.spotifyTokens.expires_at && game.spotifyTokens.expires_at - now > 60;
}

// Starta Spotify-login - nu med gameId
app.get('/spotify-login', (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
    return res.status(500).send('Spotify är inte korrekt konfigurerat (.env saknas?).');
  }

  const gameId = req.query.gameId; // ✅ Får gameId från master.html
  if (!gameId) {
    return res.status(400).send('Saknar gameId - kan inte koppla Spotify till spel.');
  }

  const state = generateRandomState();
  
  // Spara kopplingen mellan state och gameId
  spotifyAuthSessions.set(state, { gameId, timestamp: Date.now() });

  const scopes = [
    'user-read-email',
    'user-read-private',
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state'
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return res.redirect(authUrl);
});

// Callback från Spotify
app.get('/spotify-callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    console.error('Spotify auth error:', error);
    return res.status(400).send(`Spotify-fel: ${error}`);
  }

  if (!state || !spotifyAuthSessions.has(state)) {
    console.error('Spotify state mismatch eller utgången session');
    return res.status(400).send('Ogiltig eller utgången session (försök logga in igen).');
  }

  if (!code) {
    return res.status(400).send('Ingen auth-kod mottagen från Spotify.');
  }

  // Hämta gameId från sessionen
  const session = spotifyAuthSessions.get(state);
  const gameId = session.gameId;
  spotifyAuthSessions.delete(state); // Rensa session

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    });

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error('Spotify token error:', data);
      return res.status(500).send('Kunde inte hämta access token från Spotify.');
    }

    const now = Date.now() / 1000;
    const tokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: now + (data.expires_in || 3600)
    };

    // ✅ ÄNDRING: Spara tokens i specifikt spel istället för globalt
    const game = games[gameId];
    if (game) {
      game.spotifyTokens = tokens;
      console.log(`✅ Spotify ansluten till spel ${gameId}. Token giltig i ~${data.expires_in} sekunder`);
    } else {
      console.warn(`⚠️ Spel ${gameId} finns inte längre, men Spotify-inloggning lyckades.`);
    }

    return res.send(`
      <html>
        <body style="background:#0b1120;color:#e5e7eb;font-family:system-ui;">
          <h1>Spotify-inloggning klar ✅</h1>
          <p>Du är nu inloggad mot Spotify för spel: <strong>${gameId}</strong></p>
          <p>Stäng denna flik och gå tillbaka till spelet.</p>
          <script>setTimeout(() => window.close(), 2000);</script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Spotify callback error:', err);
    return res.status(500).send('Tekniskt fel vid Spotify-inloggning.');
  }
});

// Status för specifikt spel
app.get('/spotify-status', (req, res) => {
  const gameId = req.query.gameId;
  if (!gameId) {
    return res.json({ authed: false, error: 'Saknar gameId' });
  }
  
  const game = games[gameId];
  res.json({ authed: isSpotifyAuthed(game) });
});

// Token för specifikt spel
app.get('/spotify-token', (req, res) => {
  const gameId = req.query.gameId;
  if (!gameId) {
    return res.status(400).json({ error: 'Saknar gameId' });
  }
  
  const game = games[gameId];
  if (!isSpotifyAuthed(game)) {
    return res.status(401).json({ error: 'Not authenticated for this game' });
  }
  
  res.json({ access_token: game.spotifyTokens.access_token });
});

// Hämta tillgängliga kategorier
app.get('/song-categories', (req, res) => {
  const categories = Object.keys(songCategories).map(id => ({
    id,
    name: id === '50s' ? '50-tal' :
          id === '60s' ? '60-tal' :
          id === '70s' ? '70-tal' :
          id === '80s' ? '80-tal' :
          id === '90s' ? '90-tal' :
          id === '2000s' ? '2000-tal' :
          id === 'swedish' ? 'Svenska hits' : id,
    count: songCategories[id].length
  }));
  res.json({ categories });
});

// Spotify-sökning för specifikt spel
app.get('/spotify-search', async (req, res) => {
  const query = req.query.q;
  const gameId = req.query.gameId;

  if (!query) {
    return res.json({ error: 'Saknar sökfråga (använd ?q=...)' });
  }

  if (!gameId) {
    return res.json({ error: 'Saknar gameId' });
  }

  const game = games[gameId];
  if (!isSpotifyAuthed(game)) {
    return res.json({ error: 'Inte inloggad på Spotify för detta spel.' });
  }

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${game.spotifyTokens.access_token}`
      }
    });

    const data = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error('Spotify API error:', data);
      return res.json({ error: data.error?.message || 'Spotify API-fel' });
    }

    const tracks = data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      year: track.album.release_date ? parseInt(track.album.release_date.substring(0, 4)) : null,
      imageUrl: track.album.images[0]?.url || null,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify
    }));

    res.json({ tracks });

  } catch (error) {
    console.error('Spotify search error:', error);
    res.json({ error: error.message });
  }
});

// =========================
// HitFlick spel-logik
// =========================

const games = {};

const demoSongs = [
  { id: 'song1',  title: "Elvis Presley – Jailhouse Rock",              year: 1957 },
  { id: 'song2',  title: "The Beatles – Hey Jude",                      year: 1968 },
  { id: 'song3',  title: "ABBA – Dancing Queen",                        year: 1976 },
  { id: 'song4',  title: "Queen – Bohemian Rhapsody",                   year: 1975 },
  { id: 'song5',  title: "Bee Gees – Stayin' Alive",                    year: 1977 },
  { id: 'song6',  title: "Michael Jackson – Billie Jean",               year: 1982 },
  { id: 'song7',  title: "a-ha – Take On Me",                           year: 1984 },
  { id: 'song8',  title: "Europe – The Final Countdown",                year: 1986 },
  { id: 'song9',  title: "Nirvana – Smells Like Teen Spirit",           year: 1991 },
  { id: 'song10', title: "Oasis – Wonderwall",                          year: 1995 },
  { id: 'song11', title: "Britney Spears – ...Baby One More Time",      year: 1998 },
  { id: 'song12', title: "OutKast – Hey Ya!",                           year: 2003 },
  { id: 'song13', title: "Lady Gaga – Bad Romance",                     year: 2009 },
  { id: 'song14', title: "Adele – Rolling in the Deep",                 year: 2010 },
];

function generateGameId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function shuffled(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildScores(game) {
  const arr = [];
  for (const id in game.players) {
    const p = game.players[id];
    arr.push({
      playerId: id,
      name: p.name,
      score: p.score || 0
    });
  }
  arr.sort((a, b) => b.score - a.score);
  return arr;
}

function isTimelineCorrect(timeline, songLibrary) {
  if (!timeline || timeline.length < 2) return true;
  
  for (let i = 0; i < timeline.length - 1; i++) {
    const song1 = songLibrary[timeline[i]];
    const song2 = songLibrary[timeline[i + 1]];
    
    if (!song1 || !song2) continue;
    if ((song1.year || 9999) > (song2.year || 9999)) return false;
  }
  return true;
}

function calculateTimelinePoints(timeline, currentSongId, songLibrary) {
  if (!timeline || !currentSongId) return 0;
  
  const currentIndex = timeline.indexOf(currentSongId);
  if (currentIndex === -1) return 0;
  
  const currentSong = songLibrary[currentSongId];
  if (!currentSong || !currentSong.year) return 0;
  
  let correctBefore = true;
  if (currentIndex > 0) {
    const songBefore = songLibrary[timeline[currentIndex - 1]];
    if (songBefore && songBefore.year) {
      if (songBefore.year > currentSong.year) {
        correctBefore = false;
      }
    }
  }
  
  let correctAfter = true;
  if (currentIndex < timeline.length - 1) {
    const songAfter = songLibrary[timeline[currentIndex + 1]];
    if (songAfter && songAfter.year) {
      if (songAfter.year < currentSong.year) {
        correctAfter = false;
      }
    }
  }
  
  if (correctBefore && correctAfter) {
    return 10;
  }
  
  if (timeline.length === 1) {
    return 10;
  }
  
  if (currentIndex === 0 && correctAfter) {
    return 8;
  }
  
  if (currentIndex === timeline.length - 1 && correctBefore) {
    return 8;
  }
  
  return 0;
}

function sendFinalAndEnd(gameId, reason) {
  const game = games[gameId];
  if (!game) return;

  const scores = buildScores(game);
  
  const answer = [...game.playedSongs]
    .sort((a, b) => {
      const yearA = a.year || 9999;
      const yearB = b.year || 9999;
      return yearA - yearB;
    })
    .map(song => ({
      title: song.artist ? `${song.artist} – ${song.title}` : song.title,
      year: song.year || '?'
    }));

  io.to(gameId).emit('game_ended', {
    gameId,
    reason,
    scores,
    answer
  });

  delete games[gameId];
  console.log(`Game ${gameId} ended: ${reason}`);
}

// Socket.io events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.emit('connected', { message: 'Welcome to HitFlick server (local)' });

  // ✅ UPPDATERAT: Skapa spel med quizType-stöd
  socket.on('create_game', (payload = {}) => {
    const { mode, rounds, categories, quizType } = payload; // ✅ Tar emot quizType

    const normalizedMode = 'timeline';
    const normalizedQuizType = quizType || 'music'; // ✅ Default till 'music'

    const gameId = generateGameId();
    
    let songOrder;
    if (categories && categories.length > 0) {
      songOrder = getRandomSongs(categories, parseInt(rounds, 10) || 5);
    } else {
      songOrder = shuffled(demoSongs);
    }

    let maxRounds = songOrder.length;
    let chosenRounds = parseInt(rounds, 10);
    if (isNaN(chosenRounds) || chosenRounds < 1) chosenRounds = 5;
    chosenRounds = Math.min(chosenRounds, maxRounds);

    games[gameId] = {
      id: gameId,
      hostId: socket.id,
      players: {},
      createdAt: Date.now(),
      currentRoundIndex: 0,
      currentSong: null,
      guesses: {},
      mode: normalizedMode,
      quizType: normalizedQuizType, // ✅ NYTT: Spara quiz-typ
      songOrder,
      rounds: chosenRounds,
      songLibrary: {},
      playedSongs: [],
      spotifyTokens: null // ✅ NYTT: Per-game Spotify tokens
    };

    songOrder.forEach(song => {
      games[gameId].songLibrary[song.id] = song;
    });

    socket.join(gameId);

    console.log(`Game created: ${gameId} (${normalizedQuizType}, ${chosenRounds} rounds, categories: ${categories || 'demo'})`);

    socket.emit('game_created', {
      gameId,
      mode: normalizedMode,
      rounds: chosenRounds,
      quizType: normalizedQuizType // ✅ NYTT: Skicka tillbaka quiz-typ
    });
  });

  // ✅ UPPDATERAT: Join spel med quizType
  socket.on('join_game', ({ gameId, playerName }) => {
    const game = games[gameId];
    if (!game) {
      socket.emit('join_error', { message: 'Spelet finns inte. Kontrollera koden.' });
      return;
    }

    const cleanName = (playerName || 'Spelare').toString().trim().substring(0, 20) || 'Spelare';

    game.players[socket.id] = {
      id: socket.id,
      name: cleanName,
      score: 0,
      timeline: []
    };

    socket.join(gameId);
    socket.emit('joined_game', { 
      gameId, 
      name: cleanName,
      quizType: game.quizType // ✅ NYTT: Skicka quiz-typ till spelare
    });

    const playerCount = Object.keys(game.players).length;
    io.to(game.hostId).emit('player_joined', {
      gameId,
      playerId: socket.id,
      name: cleanName,
      count: playerCount
    });

    console.log(`${cleanName} joined game ${gameId} (${game.quizType})`);
  });

  // Starta Timeline-runda
  socket.on('start_round', async ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;

    let selectedSong = null;
    let autoSearchedPreview = null;
    
    const songs = game.songOrder || demoSongs;
    if (game.currentRoundIndex >= Math.min(game.rounds, songs.length)) {
      io.to(game.hostId).emit('no_more_songs', {
        gameId,
        message: 'Inga fler rundor. Klicka "Avsluta spel" för slutresultat.'
      });
      return;
    }
    
    selectedSong = songs[game.currentRoundIndex];
    
    let spotifyUri = null;
    let spotifyTrackId = null;
    
    // ✅ ÄNDRAT: Använd game.spotifyTokens istället för globala spotifyTokens
    if (isSpotifyAuthed(game)) {
      console.log(`🔍 Auto-söker Spotify: ${selectedSong.artist} – ${selectedSong.title}`);
      try {
        const searchQuery = `artist:${selectedSong.artist} track:${selectedSong.title}`;
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`;
        
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': `Bearer ${game.spotifyTokens.access_token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.tracks && data.tracks.items.length > 0) {
            const track = data.tracks.items[0];
            autoSearchedPreview = track.preview_url;
            spotifyUri = track.uri;
            spotifyTrackId = track.id;
            
            console.log(`✅ Hittade Spotify-låt: ${track.artists[0].name} – ${track.name}`);
            console.log(`   URI: ${spotifyUri}`);
            
            if (!autoSearchedPreview) {
              console.log(`⚠️ Låten saknar preview`);
            }
          } else {
            console.log(`❌ Ingen låt hittades: ${searchQuery}`);
          }
        } else {
          console.log(`❌ Spotify API fel: ${response.status}`);
        }
      } catch (err) {
        console.log('❌ Auto-search failed:', err.message);
      }
    } else {
      console.log('⚠️ Spotify inte anslutet');
    }
    
    if (!selectedSong) {
      console.log('❌ Ingen låt att spela');
      return;
    }

    game.currentSong = selectedSong;
    game.guesses = {};
    game.playedSongs.push(selectedSong);

    console.log(`Timeline round ${game.currentRoundIndex + 1}/${game.rounds}: ${selectedSong.title}`);

    const previewUrl = autoSearchedPreview || selectedSong.previewUrl || null;

    io.to(gameId).emit('timeline_round_started', {
      gameId,
      round: game.currentRoundIndex + 1,
      totalRounds: game.rounds,
      song: { 
        id: selectedSong.id, 
        title: selectedSong.title,
        artist: selectedSong.artist || '',
        previewUrl: previewUrl
      },
      item: selectedSong
    });
    
    if (previewUrl || spotifyUri) {
      io.to(game.hostId).emit('master_preview', {
        gameId,
        previewUrl,
        spotifyUri,
        spotifyTrackId,
        title: selectedSong.title,
        artist: selectedSong.artist
      });
    }

    game.currentRoundIndex += 1;
  });

  // Placera låt i timeline
  socket.on('submit_position', ({ gameId, position }) => {
    const game = games[gameId];
    if (!game) return;
    if (game.mode !== 'timeline') return;
    if (!game.players[socket.id]) return;
    if (!game.currentSong) return;

    const player = game.players[socket.id];
    if (!Array.isArray(player.timeline)) player.timeline = [];

    const songId = game.currentSong.id;

    const rawPos = parseInt(position, 10);
    const safePosBase = isNaN(rawPos) ? player.timeline.length : rawPos;
    const safePos = Math.max(0, Math.min(safePosBase, player.timeline.length));

    const existingIndex = player.timeline.indexOf(songId);

    if (existingIndex === -1) {
      player.timeline.splice(safePos, 0, songId);
    } else {
      player.timeline.splice(existingIndex, 1);
      const newSafePos = Math.max(0, Math.min(safePos, player.timeline.length));
      player.timeline.splice(newSafePos, 0, songId);
    }

    const readableTimeline = player.timeline.map((sid) => {
      const s = game.songLibrary[sid];
      if (s) {
        return s.artist ? `${s.artist} – ${s.title}` : s.title;
      }
      return sid;
    });

    socket.emit('position_received', { gameId, timeline: readableTimeline });

    if (game.hostId) {
      io.to(game.hostId).emit('timeline_player_update', {
        gameId,
        playerId: player.id,
        name: player.name,
        timeline: readableTimeline
      });
    }

    game.guesses[socket.id] = true;

    const playerIds = Object.keys(game.players);
    const allSubmitted = playerIds.length > 0 && playerIds.every((id) => game.guesses[id]);
    
    if (allSubmitted) {
      endTimelineRound(game);
    }
  });

  socket.on('end_timeline_round', ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;
    
    endTimelineRound(game);
  });

  function endTimelineRound(game) {
    if (!game.currentSong) return;

    const timelines = [];
    const playerIds = Object.keys(game.players);

    const correctOrder = [...game.playedSongs].sort((a, b) => {
      const yearA = a.year || 9999;
      const yearB = b.year || 9999;
      return yearA - yearB;
    });

    playerIds.forEach((id) => {
      const p = game.players[id];
      const ids = p.timeline || [];
      
      const currentSongIndex = ids.indexOf(game.currentSong.id);
      
      let points = 0;
      if (currentSongIndex !== -1) {
        const correctIndex = correctOrder.findIndex(s => s.id === game.currentSong.id);
        
        if (ids.length === 1) {
          points = 10;
        } else {
          const currentSong = game.songLibrary[game.currentSong.id];
          let correctPlacement = true;
          
          for (let i = 0; i < currentSongIndex; i++) {
            const otherSong = game.songLibrary[ids[i]];
            if (otherSong && otherSong.year > currentSong.year) {
              correctPlacement = false;
              break;
            }
          }
          
          for (let i = currentSongIndex + 1; i < ids.length; i++) {
            const otherSong = game.songLibrary[ids[i]];
            if (otherSong && otherSong.year < currentSong.year) {
              correctPlacement = false;
              break;
            }
          }
          
          if (correctPlacement) {
            points = 10;
          }
        }
      }
      
      p.score = (p.score || 0) + points;

      const readable = ids.map((sid) => {
        const s = game.songLibrary[sid];
        if (s) {
          return s.artist ? `${s.artist} – ${s.title}` : s.title;
        }
        return sid;
      });

      const correct = isTimelineCorrect(ids, game.songLibrary);
      timelines.push({ 
        playerId: id, 
        name: p.name, 
        timeline: readable, 
        correct,
        points
      });
    });

    const scores = buildScores(game);
    
    if (game.hostId) {
      io.to(game.hostId).emit('timeline_round_summary', {
        gameId: game.id,
        round: game.currentRoundIndex,
        song: { id: game.currentSong.id, title: game.currentSong.title },
        timelines,
        scores
      });
      
      io.to(game.hostId).emit('scoreboard_update', { 
        gameId: game.id, 
        scores 
      });
    }

    game.currentSong = null;
    game.guesses = {};
    
    console.log('Timeline round ended. Scores:', scores);
  }

  socket.on('end_game', ({ gameId }) => {
    const game = games[gameId];
    if (!game) return;
    if (socket.id !== game.hostId) return;

    sendFinalAndEnd(gameId, 'Spelet avslutades av spelledaren.');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HitFlick backend listening on http://localhost:${PORT}`);
});
