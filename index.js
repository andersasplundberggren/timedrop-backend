// ========================
// TimeDrop backend - MULTI-QUIZ SUPPORT
// Stödjer: musik, film, historia, uppfinningar, spel
// ========================

import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { songCategories, getRandomSongs } from './song-library.js';
import { movieCategories, getRandomMovies } from './movie-library.js';

// ✅ TODO: Lägg till när biblioteken är klara:
// import { historyCategories, getRandomHistory } from './history-library.js';
// import { inventionCategories, getRandomInventions } from './invention-library.js';
// import { gameCategories, getRandomGames } from './game-library.js';

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
// Spotify-konfiguration (endast för musikquiz)
// =========================

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

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

app.get('/spotify-login', (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
    return res.status(500).send('Spotify är inte korrekt konfigurerat (.env saknas?).');
  }

  const gameId = req.query.gameId;
  if (!gameId) {
    return res.status(400).send('Saknar gameId - kan inte koppla Spotify till spel.');
  }

  const state = generateRandomState();
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

  const session = spotifyAuthSessions.get(state);
  const gameId = session.gameId;
  spotifyAuthSessions.delete(state);

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

app.get('/spotify-status', (req, res) => {
  const gameId = req.query.gameId;
  if (!gameId) {
    return res.json({ authed: false, error: 'Saknar gameId' });
  }
  
  const game = games[gameId];
  res.json({ authed: isSpotifyAuthed(game) });
});

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
// Kategori-endpoints för alla quiz-typer
// =========================

app.get('/song-categories', (req, res) => {
  const categories = Object.keys(songCategories).map(id => ({
    id,
    name: id === '50s' ? '50-tal' :
          id === '60s' ? '60-tal' :
          id === '70s' ? '70-tal' :
          id === '80s' ? '80-tal' :
          id === '90s' ? '90-tal' :
          id === '2000s' ? '2000-tal' :
          id === '2010s' ? '2010-tal' :
          id === '2020s' ? '2020-tal' : id,
    count: songCategories[id].length
  }));
  res.json({ categories });
});

app.get('/movie-categories', (req, res) => {
  const categories = Object.keys(movieCategories).map(id => ({
    id,
    name: id === '1970s' ? '1970-tal' :
          id === '1980s' ? '1980-tal' :
          id === '1990s' ? '1990-tal' :
          id === '2000s' ? '2000-tal' :
          id === '2010s' ? '2010-tal' :
          id === 'svenska' ? 'Svenska filmer' :
          id === 'animation' ? 'Animation' : id,
    count: movieCategories[id].length
  }));
  res.json({ categories });
});

// ✅ TODO: Lägg till när biblioteken är klara:
// app.get('/history-categories', (req, res) => { ... });
// app.get('/invention-categories', (req, res) => { ... });
// app.get('/game-categories', (req, res) => { ... });

// =========================
// Spellogik
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

function sendFinalAndEnd(gameId, reason) {
  const game = games[gameId];
  if (!game) return;

  const scores = buildScores(game);
  
  const answer = [...game.playedItems]
    .sort((a, b) => {
      const yearA = a.year || 9999;
      const yearB = b.year || 9999;
      return yearA - yearB;
    })
    .map(item => {
      // Olika format beroende på quiz-typ
      let displayTitle = item.title;
      if (item.artist) {
        displayTitle = `${item.artist} – ${item.title}`;
      } else if (item.director) {
        displayTitle = `${item.title} (regi: ${item.director})`;
      }
      return {
        title: displayTitle,
        year: item.year || '?'
      };
    });

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

  // ✅ UPPDATERAT: Skapa spel med multi-quiz support
  socket.on('create_game', (payload = {}) => {
    const { mode, rounds, categories, quizType } = payload;

    const normalizedMode = 'timeline';
    const normalizedQuizType = quizType || 'music'; // Default till musik

    const gameId = generateGameId();
    
    // ✅ Välj items baserat på quiz-typ
    let itemOrder; // Generiskt namn för alla quiz-typer
    const chosenRounds = parseInt(rounds, 10) || 5;
    
    switch (normalizedQuizType) {
      case 'movies':
        // FILMQUIZ
        if (categories && categories.length > 0) {
          itemOrder = getRandomMovies(categories, chosenRounds);
        } else {
          const allMovieCategories = Object.keys(movieCategories);
          itemOrder = getRandomMovies(allMovieCategories, chosenRounds);
        }
        console.log(`📽️ Creating movie quiz with ${itemOrder.length} films`);
        break;
      
      // ✅ TODO: Lägg till när biblioteken är klara:
      // case 'history':
      //   if (categories && categories.length > 0) {
      //     itemOrder = getRandomHistory(categories, chosenRounds);
      //   } else {
      //     const allHistoryCategories = Object.keys(historyCategories);
      //     itemOrder = getRandomHistory(allHistoryCategories, chosenRounds);
      //   }
      //   console.log(`📜 Creating history quiz with ${itemOrder.length} events`);
      //   break;
      
      // case 'inventions':
      //   if (categories && categories.length > 0) {
      //     itemOrder = getRandomInventions(categories, chosenRounds);
      //   } else {
      //     const allInventionCategories = Object.keys(inventionCategories);
      //     itemOrder = getRandomInventions(allInventionCategories, chosenRounds);
      //   }
      //   console.log(`💡 Creating invention quiz with ${itemOrder.length} inventions`);
      //   break;
      
      // case 'games':
      //   if (categories && categories.length > 0) {
      //     itemOrder = getRandomGames(categories, chosenRounds);
      //   } else {
      //     const allGameCategories = Object.keys(gameCategories);
      //     itemOrder = getRandomGames(allGameCategories, chosenRounds);
      //   }
      //   console.log(`🎮 Creating game quiz with ${itemOrder.length} games`);
      //   break;
      
      case 'music':
      default:
        // MUSIKQUIZ (standard)
        if (categories && categories.length > 0) {
          itemOrder = getRandomSongs(categories, chosenRounds);
        } else {
          itemOrder = shuffled(demoSongs);
        }
        console.log(`🎵 Creating music quiz with ${itemOrder.length} songs`);
        break;
    }

    let maxRounds = itemOrder.length;
    let finalRounds = Math.min(chosenRounds, maxRounds);

    games[gameId] = {
      id: gameId,
      hostId: socket.id,
      players: {},
      createdAt: Date.now(),
      currentRoundIndex: 0,
      currentItem: null,
      guesses: {},
      mode: normalizedMode,
      quizType: normalizedQuizType,
      itemOrder, // Generiskt namn
      rounds: finalRounds,
      itemLibrary: {}, // Generiskt namn
      playedItems: [], // Generiskt namn
      spotifyTokens: null // Endast relevant för musikquiz
    };

    itemOrder.forEach(item => {
      games[gameId].itemLibrary[item.id] = item;
    });

    socket.join(gameId);

    console.log(`✅ Game created: ${gameId} (${normalizedQuizType}, ${finalRounds} rounds, categories: ${categories?.join(',') || 'all'})`);

    socket.emit('game_created', {
      gameId,
      mode: normalizedMode,
      rounds: finalRounds,
      quizType: normalizedQuizType
    });
  });

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
      quizType: game.quizType
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

  // ✅ UPPDATERAT: Starta runda med multi-quiz support
  socket.on('start_round', async ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;

    const items = game.itemOrder || demoSongs;
    if (game.currentRoundIndex >= Math.min(game.rounds, items.length)) {
      io.to(game.hostId).emit('no_more_songs', {
        gameId,
        message: 'Inga fler rundor. Klicka "Avsluta spel" för slutresultat.'
      });
      return;
    }
    
    const selectedItem = items[game.currentRoundIndex];
    if (!selectedItem) {
      console.log('❌ Inget item att spela');
      return;
    }

    // ✅ Hantera media baserat på quiz-typ
    let previewUrl = null;
    let spotifyUri = null;
    let spotifyTrackId = null;
    let youtubeId = null;

    // MUSIKQUIZ: Hämta Spotify-preview
    if (game.quizType === 'music' && isSpotifyAuthed(game)) {
      console.log(`🔍 Auto-söker Spotify: ${selectedItem.artist} – ${selectedItem.title}`);
      try {
        const searchQuery = `artist:${selectedItem.artist} track:${selectedItem.title}`;
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`;
        
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': `Bearer ${game.spotifyTokens.access_token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.tracks && data.tracks.items.length > 0) {
            const track = data.tracks.items[0];
            previewUrl = track.preview_url;
            spotifyUri = track.uri;
            spotifyTrackId = track.id;
            
            console.log(`✅ Hittade Spotify-låt: ${track.artists[0].name} – ${track.name}`);
            if (!previewUrl) console.log(`⚠️ Låten saknar preview`);
          }
        }
      } catch (err) {
        console.log('❌ Auto-search failed:', err.message);
      }
    }
    
    // FILMQUIZ: Hämta YouTube-trailer
    else if (game.quizType === 'movies' && selectedItem.youtubeId) {
      youtubeId = selectedItem.youtubeId;
      console.log(`🎬 Film: ${selectedItem.title} - YouTube: ${youtubeId}`);
    }
    
    // ✅ TODO: HISTORIA/UPPFINNINGAR/SPEL
    // else if (game.quizType === 'history' && selectedItem.imageUrl) {
    //   console.log(`📜 Historisk händelse: ${selectedItem.title}`);
    // }
    // else if (game.quizType === 'inventions' && selectedItem.imageUrl) {
    //   console.log(`💡 Uppfinning: ${selectedItem.title}`);
    // }
    // else if (game.quizType === 'games' && selectedItem.youtubeId) {
    //   youtubeId = selectedItem.youtubeId;
    //   console.log(`🎮 Spel: ${selectedItem.title} - YouTube: ${youtubeId}`);
    // }

    game.currentItem = selectedItem;
    game.guesses = {};
    game.playedItems.push(selectedItem);

    console.log(`Timeline round ${game.currentRoundIndex + 1}/${game.rounds}: ${selectedItem.title}`);

    // Skicka till spelare
    io.to(gameId).emit('timeline_round_started', {
      gameId,
      round: game.currentRoundIndex + 1,
      totalRounds: game.rounds,
      song: { // Behålls för bakåtkompatibilitet
        id: selectedItem.id, 
        title: selectedItem.title,
        artist: selectedItem.artist || '',
        previewUrl: previewUrl || selectedItem.previewUrl || null
      },
      item: selectedItem // Generiskt objekt med all data
    });
    
    // Skicka media-preview till master
    if (previewUrl || spotifyUri || youtubeId) {
      io.to(game.hostId).emit('master_preview', {
        gameId,
        // Spotify (endast för musik)
        previewUrl,
        spotifyUri,
        spotifyTrackId,
        // YouTube (för film/spel)
        youtubeId,
        // Metadata
        title: selectedItem.title,
        artist: selectedItem.artist, // För musik
        director: selectedItem.director, // För film
        inventor: selectedItem.inventor, // För uppfinningar
        platform: selectedItem.platform, // För spel
        category: selectedItem.category // För historia
      });
    }

    game.currentRoundIndex += 1;
  });

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

    const readableTimeline = player.timeline.map((itemId) => {
      const item = game.itemLibrary[itemId];
      if (!item) return itemId;
      
      // Format beroende på quiz-typ
      if (item.artist) {
        return `${item.artist} – ${item.title}`;
      } else if (item.director) {
        return `${item.title} (${item.year})`;
      } else {
        return item.title;
      }
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
    if (!game.currentItem) return;

    const timelines = [];
    const playerIds = Object.keys(game.players);

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
        if (ids.length === 1) {
          points = 10;
        } else {
          const currentItem = game.itemLibrary[game.currentItem.id];
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

      const readable = ids.map((itemId) => {
        const item = game.itemLibrary[itemId];
        if (!item) return itemId;
        
        if (item.artist) {
          return `${item.artist} – ${item.title}`;
        } else if (item.director) {
          return `${item.title} (${item.year})`;
        } else {
          return item.title;
        }
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
    
    console.log(`✅ Timeline round ended. Scores:`, scores.map(s => `${s.name}: ${s.score}`).join(', '));
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
  console.log(`🚀 TimeDrop backend listening on http://localhost:${PORT}`);
  console.log(`📦 Quiz types supported: music, movies`);
  console.log(`🔜 Coming soon: history, inventions, games`);
});
