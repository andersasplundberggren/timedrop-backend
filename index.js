// ========================
// HitFlick backend + Spotify - PREVIEW MODE
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
// Spotify-konfiguration (APP TOKEN, ingen användarlogin)
// =========================

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyAppToken = null;

/**
 * Hämta/uppdatera ett app-token via client_credentials
 */
async function getSpotifyAppToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.warn('Spotify client id/secret saknas (.env)');
    return null;
  }

  const now = Date.now() / 1000;
  if (spotifyAppToken && spotifyAppToken.expires_at && spotifyAppToken.expires_at - now > 60) {
    return spotifyAppToken.access_token;
  }

  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
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
      console.error('Spotify client credentials error:', data);
      return null;
    }

    spotifyAppToken = {
      access_token: data.access_token,
      expires_at: now + (data.expires_in || 3600)
    };

    console.log('Spotify app-token hämtat, giltigt i ~', data.expires_in, 'sekunder');
    return spotifyAppToken.access_token;
  } catch (err) {
    console.error('Fel vid hämtning av Spotify app-token:', err);
    return null;
  }
}

// Enkel status-endpoint för frontend
app.get('/spotify-status', async (req, res) => {
  try {
    const token = await getSpotifyAppToken();
    res.json({
      available: !!token,
      authed: !!token,   // behåll fältet för bakåtkompabilitet
      mode: 'app-preview'
    });
  } catch (err) {
    res.json({ available: false, authed: false, mode: 'app-preview' });
  }
});

// Behåll en /spotify-token om du vill, men den används inte av Web Playback längre
app.get('/spotify-token', async (req, res) => {
  const token = await getSpotifyAppToken();
  if (!token) {
    return res.status(500).json({ error: 'Spotify ej tillgängligt (app-token saknas)' });
  }
  res.json({ access_token: token, mode: 'app' });
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

// Spotify-sökning (app-token, ej användar-login)
app.get('/spotify-search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({ error: 'Saknar sökfråga (använd ?q=...)' });
  }

  const token = await getSpotifyAppToken();
  if (!token) {
    return res.json({ error: 'Spotify ej tillgängligt (app-token saknas).' });
  }

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
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

// ... (resten av din spel-logik: generateGameId, shuffled, buildScores, osv – oförändrad)

// Skapa spel, join_game etc – oförändrat fram till start_round

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.emit('connected', { message: 'Welcome to HitFlick server (local)' });

  // Skapa spel
  socket.on('create_game', (payload = {}) => {
    const { mode, rounds, categories } = payload;

    const normalizedMode = 'timeline'; // Alltid timeline nu

    const gameId = generateGameId();
    
    // Välj låtar baserat på kategorier eller fallback till demo
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
      songOrder,
      rounds: chosenRounds,
      songLibrary: {}, // Lagrar alla låtar som används (demo + Spotify-info)
      playedSongs: []   // Lagrar låtar i den ordning de spelades
    };

    // Fyll songLibrary med valda låtar
    songOrder.forEach(song => {
      games[gameId].songLibrary[song.id] = song;
    });

    socket.join(gameId);

    console.log(`Game created: ${gameId} (${normalizedMode}, ${chosenRounds} rounds, categories: ${categories || 'demo'})`);

    socket.emit('game_created', {
      gameId,
      mode: normalizedMode,
      rounds: chosenRounds
    });
  });

  // ... join_game osv är oförändrat ...

  // Starta Timeline-runda (låtar från låtbiblioteket + Spotify preview om möjligt)
  socket.on('start_round', async ({ gameId }) => {
    const game = games[gameId];
    if (!game || socket.id !== game.hostId) return;

    let selectedSong = null;
    let autoSearchedPreview = null;
    let spotifyUri = null;
    let spotifyTrackId = null;
    let spotifyUrl = null;
    let imageUrl = null;
    
    // Välj nästa låt från songOrder (låtbiblioteket)
    const songs = game.songOrder || demoSongs;
    if (game.currentRoundIndex >= Math.min(game.rounds, songs.length)) {
      io.to(game.hostId).emit('no_more_songs', {
        gameId,
        message: 'Inga fler rundor. Klicka "Avsluta spel" för slutresultat.'
      });
      return;
    }
    
    selectedSong = songs[game.currentRoundIndex];

    // Auto-sök på Spotify för att få preview + spotifyUrl (app-token)
    const token = await getSpotifyAppToken();
    if (token && (selectedSong.title || selectedSong.artist)) {
      try {
        let searchQuery;
        if (selectedSong.artist && selectedSong.title) {
          searchQuery = `artist:${selectedSong.artist} track:${selectedSong.title}`;
        } else {
          // fallback om du bara har "Artist – Låt" i title
          searchQuery = selectedSong.title || '';
        }

        console.log(`🔍 Auto-söker Spotify: ${searchQuery}`);

        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`;
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.tracks && data.tracks.items.length > 0) {
            const track = data.tracks.items[0];
            autoSearchedPreview = track.preview_url;
            spotifyUri = track.uri;
            spotifyTrackId = track.id;
            spotifyUrl = track.external_urls?.spotify || null;
            imageUrl = track.album?.images?.[0]?.url || null;

            console.log(`✅ Hittade Spotify-låt: ${track.artists[0].name} – ${track.name}`);
            console.log(`   URI: ${spotifyUri}`);

            // Uppdatera songLibrary så facit/tidslinjer också vet
            const existing = game.songLibrary[selectedSong.id] || selectedSong;
            game.songLibrary[selectedSong.id] = {
              ...existing,
              spotifyUri,
              spotifyTrackId,
              spotifyUrl,
              previewUrl: autoSearchedPreview,
              imageUrl
            };
          } else {
            console.log(`❌ Ingen Spotify-träff: ${searchQuery}`);
          }
        } else {
          console.log(`❌ Spotify API-fel: ${response.status}`);
        }
      } catch (err) {
        console.log('❌ Auto-search failed:', err.message);
      }
    } else {
      console.log('⚠️ Spotify app-token saknas eller ingen sökbar låtinfo');
    }
    
    if (!selectedSong) {
      console.log('❌ Ingen låt att spela');
      return;
    }

    game.currentSong = selectedSong;
    game.guesses = {};
    
    // Spara låten i playedSongs (för facit)
    game.playedSongs.push(selectedSong);

    console.log(`Timeline round ${game.currentRoundIndex + 1}/${game.rounds}: ${selectedSong.title}`);

    // Använd auto-sökt preview om den finns, annars ev. statisk previewUrl
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
      }
    });
    
    // Skicka preview + spotifyUrl till master (för uppspelning där)
    if (previewUrl || spotifyUrl || spotifyUri) {
      io.to(game.hostId).emit('master_preview', {
        gameId,
        previewUrl,
        spotifyUri,
        spotifyTrackId,
        spotifyUrl,
        title: selectedSong.title,
        artist: selectedSong.artist || '',
        imageUrl
      });
    }

    game.currentRoundIndex += 1;
  });

  // ... resten av submit_position, end_timeline_round, end_game mm oförändrat ...
});

// ... server.listen etc som tidigare ...
