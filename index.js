// ========================
// TimeDrop backend - Multi-Quiz Support
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
  res.json({ status: 'ok', message: 'TimeDrop backend is running' });
});

// =========================
// Spotify-konfiguration
// =========================

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

let spotifyTokens = null;
let lastSpotifyState = null;

function generateRandomState(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function isSpotifyAuthed() {
  if (!spotifyTokens) return false;
  const now = Date.now() / 1000;
  return spotifyTokens.expires_at && spotifyTokens.expires_at - now > 60;
}

// Starta Spotify-login
app.get('/spotify-login', (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
    return res.status(500).send('Spotify är inte korrekt konfigurerat (.env saknas?).');
  }

  const state = generateRandomState();
  lastSpotifyState = state;

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

  if (!state || state !== lastSpotifyState) {
    console.error('Spotify state mismatch');
    return res.status(400).send('Ogiltig state-token (försök logga in igen).');
  }

  if (!code) {
    return res.status(400).send('Ingen auth-kod mottagen från Spotify.');
  }

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
    spotifyTokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: now + (data.expires_in || 3600)
    };

    console.log('Spotify inloggad. Token giltig i ~', data.expires_in, 'sekunder');

    return res.send(`
      <html>
        <body style="background:#0b1120;color:#e5e7eb;font-family:system-ui;">
          <h1>Spotify-inloggning klar ✅</h1>
          <p>Du är nu inloggad mot Spotify för TimeDrop.</p>
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

// Enkel status-endpoint
app.get('/spotify-status', (req, res) => {
  res.json({ authed: isSpotifyAuthed() });
});

// Endpoint för att hämta access token (för Web Playback SDK)
app.get('/spotify-token', (req, res) => {
  if (!isSpotifyAuthed()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ access_token: spotifyTokens.access_token });
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

// Spotify-sökning
app.get('/spotify-search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({ error: 'Saknar sökfråga (använd ?q=...)' });
  }

  if (!isSpotifyAuthed()) {
    return res.json({ error: 'Inte inloggad på Spotify.' });
  }

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${spotifyTokens.access_token}`
      }
    });

    const data = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error('Spotify API error:', data);
      return res.json({ error: data.error?.message || 'Spotify API-fel' });
    }

    // Formatera resultatet
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
// TimeDrop spel-logik med Multi-Quiz Support
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

// Kolla om en tidslinje är helt korrekt sorterad
function isTimelineCorrect(timeline, itemLibrary) {
  if (!timeline || timeline.length < 2) return true;
  
  for (let i = 0; i < timeline.length - 1; i++) {
    const item1 = itemLibrary[timeline[i]];
    const item2 = itemLibrary[timeline[i + 1]];
    
    if (!item1 || !item2) continue;
    if ((item1.year || 9999) > (item2.year || 9999)) return false;
  }
  return true;
}

// Beräkna poäng baserat på korrekt placering
function calculateTimelinePoints(timeline, currentItemId, itemLibrary) {
  if (!timeline || !currentItemId) return 0;
  
  const currentIndex = timeline.indexOf(currentItemId);
  if (currentIndex === -1) return 0;
  
  const currentItem = itemLibrary[currentItemId];
  if (!currentItem || !currentItem.year) return 0;
  
  // Kolla om objektet före är äldre (om det finns en)
  let correctBefore = true;
  if (currentIndex > 0) {
    const itemBefore = itemLibrary[timeline[currentIndex - 1]];
    if (itemBefore && itemBefore.year) {
      if (itemBefore.year > currentItem.year) {
        correctBefore = false;
      }
    }
  }
  
  // Kolla om objektet efter är nyare (om det finns en)
  let correctAfter = true;
  if (currentIndex < timeline.length - 1) {
    const itemAfter = itemLibrary[timeline[currentIndex + 1]];
    if (itemAfter && itemAfter.year) {
      if (itemAfter.year < currentItem.year) {
        correctAfter = false;
      }
    }
  }
  
  // Striktare poängberäkning
  if (correctBefore && correctAfter) {
    return 10; // Perfekt placerad
  }
  
  // Om bara början eller slutet, ge lite poäng
  if (timeline.length === 1) {
    return 10; // Första objektet är alltid rätt
  }
  
  if (currentIndex === 0 && correctAfter) {
    return 8; // Först och rätt efter
  }
  
  if (currentIndex === timeline.length - 1 && correctBefore) {
    return 8; // Sist och rätt före
  }
  
  return 0; // Fel placerad
}

function sendFinalAndEnd(gameId, reason) {
  const game = games[gameId];
  if (!game) return;

  const scores = buildScores(game);
  
  // Bygg facit från de objekt som faktiskt spelades - SORTERAT EFTER ÅRTAL
  const answer = [...game.playedItems]
    .sort((a, b) => {
      const yearA = a.year || 9999;
      const yearB = b.year || 9999;
      return yearA - yearB; // Äldst först
    })
    .map(item => ({
      title: item.artist ? `${item.artist} – ${item.title}` : item.title,
      year: item.year || '?'
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
  socket.emit('connected', { message: 'Welcome to TimeDrop server' });

  // ✅ UPPDATERAD: Skapa spel med quizType-stöd
  socket.on('create_game', (payload = {}) => {
    const { quizType, mode, rounds, categories } = payload;

    // ✅ Standardisera quizType (fallback till 'music' för bakåtkompatibilitet)
    const normalizedQuizType = quizType || 'music';
    const normalizedMode = 'timeline'; // Alltid timeline nu

    const gameId = generateGameId();
    
    // ✅ Välj items baserat på quizType
    let itemOrder;
    
    // För nu: endast musik stöds, men strukturen är förberedd för expansion
    if (normalizedQuizType === 'music') {
      if (categories && categories.length > 0) {
        itemOrder = getRandomSongs(categories, parseInt(rounds, 10) || 5);
      } else {
        itemOrder = shuffled(demoSongs);
      }
    } else {
      // Placeholder för framtida quiz-typer
      console.log(`Quiz type '${normalizedQuizType}' inte implementerad än, använder demo-musik`);
      itemOrder = shuffled(demoSongs);
    }

    let maxRounds = itemOrder.length;
    let chosenRounds = parseInt(rounds, 10);
    if (isNaN(chosenRounds) || chosenRounds < 1) chosenRounds = 5;
    chosenRounds = Math.min(chosenRounds, maxRounds);

    // ✅ Spara quizType i game-objektet
    games[gameId] = {
      id: gameId,
      hostId: socket.id,
      players: {},
      createdAt: Date.now(),
      currentRoundIndex: 0,
      currentItem: null,
      guesses: {},
      quizType: normalizedQuizType,  // ✅ NY: Quiz-typ
      mode: normalizedMode,
      itemOrder,
      rounds: chosenRounds,
      itemLibrary: {},     // Lagrar alla items som används
      playedItems: []      // Lagrar items i den ordning de spelades
    };

    // Fyll itemLibrary med valda items
    itemOrder.forEach(item => {
      games[gameId].itemLibrary[item.id] = item;
    });

    socket.join(gameId);

    console.log(`Game created: ${gameId} (${normalizedQuizType}, ${chosenRounds} rounds, categories: ${categories || 'demo'})`);

    socket.emit('game_created', {
      gameId,
      quizType: normalizedQuizType,  // ✅ Skicka tillbaka quiz-typ
      mode: normalizedMode,
      rounds: chosenRounds
    });
  });

  // ✅ UPPDATERAD: Join spel med quizType-info
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
    
    // ✅ Skicka quiz-typ till spelaren
    socket.emit('joined_game', { 
      gameId, 
      name: cleanName,
      quizType: game.quizType  // ✅ NY: Skicka quiz-typ
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

    let selectedItem = null;
    let autoSearchedPreview = null;
    
    // Välj nästa item från itemOrder
    const items = game.itemOrder || demoSongs;
    if (game.currentRoundIndex >= Math.min(game.rounds, items.length)) {
      io.to(game.hostId).emit('no_more_songs', {
        gameId,
        message: 'Inga fler rundor. Klicka "Avsluta spel" för slutresultat.'
      });
      return;
    }
    
    selectedItem = items[game.currentRoundIndex];
    
    // Auto-sök på Spotify för musik-quiz
    let spotifyUri = null;
    let spotifyTrackId = null;
    
    if (game.quizType === 'music' && isSpotifyAuthed()) {
      console.log(`🔍 Auto-söker Spotify: ${selectedItem.artist} – ${selectedItem.title}`);
      try {
        const searchQuery = `artist:${selectedItem.artist} track:${selectedItem.title}`;
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`;
        
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': `Bearer ${spotifyTokens.access_token}` }
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
    }
    
    if (!selectedItem) {
      console.log('❌ Inget item att spela');
      return;
    }

    game.currentItem = selectedItem;
    game.guesses = {};
    
    // Spara item i playedItems (för facit)
    game.playedItems.push(selectedItem);

    console.log(`Timeline round ${game.currentRoundIndex + 1}/${game.rounds}: ${selectedItem.title}`);

    // Använd auto-sökt preview om den finns
    const previewUrl = autoSearchedPreview || selectedItem.previewUrl || null;

    io.to(gameId).emit('timeline_round_started', {
      gameId,
      round: game.currentRoundIndex + 1,
      totalRounds: game.rounds,
      song: { 
        id: selectedItem.id, 
        title: selectedItem.title,
        artist: selectedItem.artist || '',
        previewUrl: previewUrl
      }
    });
    
    // Skicka preview till master (för uppspelning där)
    if (previewUrl || spotifyUri) {
      io.to(game.hostId).emit('master_preview', {
        gameId,
        previewUrl,
        spotifyUri,
        spotifyTrackId,
        title: selectedItem.title,
        artist: selectedItem.artist
      });
    }

    game.currentRoundIndex += 1;
  });

  // Placera item i timeline
  socket.on('submit_position', ({ gameId, position }) => {
    const game = games[gameId];
    if (!game) return;
    if (game.mode !== 'timeline') return;
    if (!game.players[socket.id]) return;
    if (!game.currentItem) return;

    const player = game.players[socket.id];
    if (!Array.isArray(player.timeline)) player.timeline = [];

    const itemId = game.currentItem.id;

    const rawPos = parseInt(position, 10);
    const safePosBase = isNaN(rawPos) ? player.timeline.length : rawPos;
    const safePos = Math.max(0, Math.min(safePosBase, player.timeline.length));

    const existingIndex = player.timeline.indexOf(itemId);

    if (existingIndex === -1) {
      player.timeline.splice(safePos, 0, itemId);
    } else {
      player.timeline.splice(existingIndex, 1);
      const newSafePos = Math.max(0, Math.min(safePos, player.timeline.length));
      player.timeline.splice(newSafePos, 0, itemId);
    }

    const readableTimeline = player.timeline.map((iid) => {
      const item = game.itemLibrary[iid];
      if (item) {
        return item.artist ? `${item.artist} – ${item.title}` : item.title;
      }
      return iid;
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

  // Avsluta Timeline-runda manuellt
  socket.on('end_timeline_round', ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;
    
    endTimelineRound(game);
  });

  function endTimelineRound(game) {
    if (!game.currentItem) return;

    const timelines = [];
    const playerIds = Object.keys(game.players);

    // Bygg korrekt ordning från playedItems
    const correctOrder = [...game.playedItems].sort((a, b) => {
      const yearA = a.year || 9999;
      const yearB = b.year || 9999;
      return yearA - yearB;
    });

    playerIds.forEach((id) => {
      const p = game.players[id];
      const ids = p.timeline || [];
      
      const currentItemIndex = ids.indexOf(game.currentItem.id);
      
      let points = 0;
      if (currentItemIndex !== -1) {
        const currentItem = game.itemLibrary[game.currentItem.id];
        
        if (ids.length === 1) {
          points = 10;
        } else {
          let correctPlacement = true;
          
          for (let i = 0; i < currentItemIndex; i++) {
            const otherItem = game.itemLibrary[ids[i]];
            if (otherItem && otherItem.year > currentItem.year) {
              correctPlacement = false;
              break;
            }
          }
          
          for (let i = currentItemIndex + 1; i < ids.length; i++) {
            const otherItem = game.itemLibrary[ids[i]];
            if (otherItem && otherItem.year < currentItem.year) {
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

      const readable = ids.map((iid) => {
        const item = game.itemLibrary[iid];
        if (item) {
          return item.artist ? `${item.artist} – ${item.title}` : item.title;
        }
        return iid;
      });

      const correct = isTimelineCorrect(ids, game.itemLibrary);
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
        song: { id: game.currentItem.id, title: game.currentItem.title },
        timelines,
        scores
      });
      
      io.to(game.hostId).emit('scoreboard_update', { 
        gameId: game.id, 
        scores 
      });
    }

    game.currentItem = null;
    game.guesses = {};
    
    console.log('Timeline round ended. Scores:', scores);
  }

  // Avsluta spel
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
  console.log(`TimeDrop backend listening on http://localhost:${PORT}`);
});
