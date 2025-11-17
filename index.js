<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <title>TimeDrop – Master</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%231b4fd8'/%3E%3Ctext x='50' y='62' text-anchor='middle' font-size='56' fill='white'%3EM%3C/text%3E%3C/svg%3E" />
  <script src="https://sdk.scdn.co/spotify-player.js"></script>
  <style>
    :root{
      /* Steampunk färgpalett - ljust tema */
      --bg:#f5f0e8; --panel:#e8dcc8; --muted:#d4c5b0; --text:#3a2f1f; --sub:#6b5d4f;
      --primary:#8a6f3e; --green:#6b8e5a; --purple:#8b7b9d; --btn:#b8935a; --btnText:#ffffff;
      --chip1:#d4af7a; --chip2:#c9a961; --chip3:#e8c78e; --chip4:#b8935a;
      --gold:#d4af7a; --silver:#a8a8a8; --bronze:#cd7f32;
      --accent:#8a6f3e; /* Brun från loggan */
    }
    *{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial}
    .wrap{max-width:1100px;margin:24px auto;padding:0 16px}
    h1{margin:0 0 16px 0}
    .card{background:var(--panel);border:1px solid #d4c5b0;border-radius:12px;padding:16px;margin:12px 0}
    label{display:block;font-size:.9rem;color:var(--sub);margin:10px 0 6px}
    input{padding:10px;border-radius:8px;border:1px solid #c4b5a0;background:#ffffff;color:var(--text)}
    button{cursor:pointer;border:1px solid #a8926f;background:var(--btn);color:var(--btnText);padding:10px 14px;border-radius:10px}
    button.primary{background:linear-gradient(180deg,#b8935a,#a8835a); border-color:#8a6f3e}
    button:disabled{opacity:.5;cursor:not-allowed}
    .row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
    .col{display:flex;flex-direction:column;gap:12px}
    .hint{color:var(--sub);font-size:.95rem}
    hr{border:none;border-top:1px solid #d4c5b0;margin:16px 0}
    #gameCode{font-size:1.8rem;font-weight:800;letter-spacing:.2rem}

    .list{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto;padding:4px;scrollbar-width:thin;scrollbar-color:#c4b5a0 transparent}
    .list::-webkit-scrollbar{width:8px}
    .list::-webkit-scrollbar-track{background:transparent}
    .list::-webkit-scrollbar-thumb{background:#c4b5a0;border-radius:4px}
    .list::-webkit-scrollbar-thumb:hover{background:#a8926f}
    .player{padding:6px 8px;border:1px solid #c4b5a0;border-radius:8px;background:#ffffff;font-size:.9rem}
    .player.top3{border-color:#8a6f3e;background:#f0e8d8;font-weight:600}
    .player-divider{margin:6px 0;padding:3px 0;font-size:.75rem;color:var(--sub);text-align:center;border-top:1px dashed #c4b5a0}

    table{width:100%;border-collapse:collapse;font-size:.9rem}
    th,td{padding:6px 8px;border-bottom:1px solid #d4c5b0;text-align:left}
    th{color:var(--sub);font-weight:600;font-size:.85rem}

    .chip{display:inline-block;padding:6px 10px;border-radius:10px;color:#ffffff;font-weight:600;margin:3px 3px 0 0;font-size:.85rem}
    .chip:nth-child(4n+1){background:var(--chip1)}
    .chip:nth-child(4n+2){background:var(--chip2)}
    .chip:nth-child(4n+3){background:var(--chip3)}
    .chip:nth-child(4n+4){background:var(--chip4)}

    .podium{display:flex;gap:14px;align-items:flex-end;justify-content:center;margin-top:10px}
    .pod{flex:0 0 160px;background:#ffffff;border:1px solid #c4b5a0;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:10px 8px}
    .pod .place{font-weight:700;margin-bottom:6px}
    .pod .who{font-weight:600;text-align:center}
    .pod .pts{font-size:.9rem;color:var(--sub)}
    .pod.gold{border-color:#d4af7a;box-shadow:0 0 0 2px rgba(212,175,122,.3) inset}
    .pod.silver{border-color:#a8a8a8}
    .pod.bronze{border-color:#cd7f32}
    .h1{height:140px}.h2{height:110px}.h3{height:90px}
    
    /* Spotify */
    .spotify-section{background:#e8f5e9;border:1px solid #a5d6a7;border-radius:10px;padding:14px;margin:12px 0}
    .spotify-btn{background:#1DB954;color:white;font-weight:600;border:none}
    .spotify-btn:hover:not(:disabled){background:#1ed760}
    .search-row{display:flex;gap:10px;margin-bottom:12px}
    .search-input{flex:1;min-width:200px}
    .track-item{display:flex;gap:12px;padding:10px;border:1px solid #d4c5b0;border-radius:8px;background:#ffffff;cursor:pointer;transition:.2s;align-items:center;margin-bottom:8px}
    .track-item:hover{border-color:#b8935a;background:#f8f5f0}
    .track-item.selected{border-color:#1DB954;background:#e8f5e9}
    .track-img{width:56px;height:56px;border-radius:6px;object-fit:cover;background:#e8dcc8}
    .track-info{flex:1;min-width:0}
    .track-title{font-weight:600;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .track-artist{font-size:.85rem;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .track-year{color:var(--primary);font-weight:600;font-size:.9rem;min-width:50px;text-align:right}
    
    /* Kategori-väljare */
    .category-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin:12px 0}
    .category-item{display:flex;align-items:center;gap:8px;padding:10px;border:1px solid #d4c5b0;border-radius:8px;background:#ffffff;cursor:pointer;transition:.2s}
    .category-item:hover{border-color:#b8935a;background:#f8f5f0}
    .category-item input[type="checkbox"]{width:18px;height:18px;cursor:pointer}
    .category-item.selected{border-color:#8a6f3e;background:#f0e8d8}
    .category-label{flex:1;font-size:.9rem}
    .category-count{font-size:.8rem;color:var(--sub)}
    
    /* Tab-navigation */
    .tab-nav{
      display:flex;
      gap:8px;
      margin-bottom:16px;
      border-bottom:2px solid #d4c5b0;
      padding-bottom:0;
    }
    .tab-btn{
      padding:10px 20px;
      background:transparent;
      border:none;
      border-bottom:3px solid transparent;
      color:var(--sub);
      cursor:pointer;
      font-weight:600;
      transition:.2s;
      margin-bottom:-2px;
    }
    .tab-btn:hover{
      color:var(--text);
      background:#f0e8d8;
    }
    .tab-btn.active{
      color:var(--primary);
      border-bottom-color:var(--primary);
    }
    .tab-content{
      display:none;
    }
    .tab-content.active{
      display:block;
    }
    
    /* Loading animation */
    .loading-overlay{
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:rgba(245,240,232,.95);
      display:none;
      align-items:center;
      justify-content:center;
      z-index:9999;
      flex-direction:column;
      gap:20px;
    }
    .loading-overlay.active{
      display:flex;
    }
    .loading-spinner{
      width:60px;
      height:60px;
      border:4px solid #d4c5b0;
      border-top-color:#8a6f3e;
      border-radius:50%;
      animation:spin 1s linear infinite;
    }
    @keyframes spin{
      to{transform:rotate(360deg)}
    }
    .loading-text{
      color:#3a2f1f;
      font-size:1.2rem;
      font-weight:600;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>TimeDrop – Master</h1>

    <div class="card" id="config">
      <h3>Spelinställningar</h3>

      <!-- Spotify-rad -->
      <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:8px;padding:12px;background:#ffffff;border-radius:8px">
        <div>
          <div id="spotifyStatus" class="hint">🎵 Spotify: Ej ansluten</div>
        </div>
        <button id="spotifyLoginBtn" class="spotify-btn">Anslut Spotify</button>
      </div>

      <!-- Kategori-väljare -->
      <div style="margin:16px 0">
        <label style="display:block;margin-bottom:8px;font-weight:600">Välj musikkategorier (valfritt)</label>
        <div class="hint" style="margin-bottom:10px">Om du inte väljer kategorier används demo-låtar</div>
        <div id="categoryGrid" class="category-grid">
          <!-- Fylls dynamiskt med kategorier -->
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="rounds">Antal rundor</label>
          <input id="rounds" type="number" min="1" max="20" value="5" />
        </div>
        <div class="col" style="justify-content:flex-end">
          <button id="createGameBtn" class="primary">Skapa nytt spel</button>
        </div>
      </div>
      <div id="createHint" class="hint"></div>
    </div>

    <div id="gameArea" class="card" style="display:none;">
      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab('control')">⚙️ Spelkontroll</button>
        <button class="tab-btn" onclick="switchTab('stats')">📊 Tidslinjer & Poäng</button>
      </div>

      <!-- TAB 1: Spelkontroll -->
      <div id="tab-control" class="tab-content active">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div class="col" style="min-width:280px;flex:1">
            <div class="hint">Dela denna kod till spelarna:</div>
            <div id="gameCode">—</div>
            
            <!-- QR-kod för mobil anslutning -->
            <div id="qrCodeSection" style="margin-top:20px;display:none;text-align:center">
              <div class="hint" style="margin-bottom:8px">Eller skanna QR-kod:</div>
              <div id="qrCode" style="background:#ffffff;padding:12px;border-radius:8px;display:inline-block"></div>
            </div>
            
            <div class="row" style="margin-top:12px;gap:10px">
              <button id="startRoundBtn" class="primary">Starta runda</button>
              <button id="endGameBtn">Avsluta spel</button>
            </div>
            <div id="roundInfo" class="hint" style="margin-top:10px;"></div>
          </div>
          <div class="col" style="min-width:280px;flex:1">
            <h3>Anslutna spelare</h3>
            <div id="players" class="list"></div>
          </div>
        </div>

        <hr>

        <!-- Spotify Web Player -->
        <div id="spotifyPlayer" class="card" style="display:none;background:#1a1a1a;border:1px solid #1DB954">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h3 style="margin:0;color:#1DB954">🎵 Spotify-spelare</h3>
            <div id="playerStatus" class="hint" style="margin:0">Laddar...</div>
          </div>
          
          <div id="nowPlaying" style="display:none;margin-bottom:12px">
            <div style="display:flex;gap:12px;align-items:center">
              <img id="trackImage" src="" style="width:80px;height:80px;border-radius:8px;background:#2a2a2a" />
              <div style="flex:1">
                <div id="trackTitle" style="font-weight:700;font-size:1.1rem;margin-bottom:4px"></div>
                <div id="trackArtist" style="color:#9ca3af"></div>
              </div>
            </div>
          </div>
          
          <div style="display:flex;gap:10px;align-items:center">
            <button id="playBtn" class="spotify-btn" style="flex:0 0 100px" disabled>▶ Spela</button>
            <button id="pauseBtn" class="spotify-btn" style="flex:0 0 100px" disabled>⏸ Pausa</button>
            <input id="volumeSlider" type="range" min="0" max="100" value="50" style="flex:1" disabled />
            <span id="volumeLabel" style="color:#9ca3af;min-width:40px">50%</span>
          </div>
          
          <div class="hint" style="margin-top:10px;font-size:.85rem">
            💡 Tips: Öppna Spotify-appen på din dator eller mobil för bästa upplevelse
          </div>
        </div>
      </div>

      <!-- TAB 2: Tidslinjer & Poäng -->
      <div id="tab-stats" class="tab-content">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div class="col" style="min-width:320px;flex:1.2">
            <h3>Poängställning</h3>
            <div style="max-height:250px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#374151 transparent">
              <table>
                <thead><tr><th>Plac</th><th>Spelare</th><th>Poäng</th></tr></thead>
                <tbody id="scoreBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <hr>

        <div id="timelineBox" style="display:none;">
          <h3>Tidslinjer</h3>
          <div id="timelinePlayers"></div>

          <div id="timelineRoundSummary" class="card" style="margin-top:12px;display:none;">
            <h4>Sammanfattning (runda)</h4>
            <div id="timelineRoundText" class="hint"></div>
          </div>
        </div>

        <hr>

        <div id="finalBox" style="display:none;">
          <h3>Slutresultat</h3>
          <div id="podium" class="podium"></div>
          <div class="card">
            <table>
              <thead><tr><th>Plac</th><th>Spelare</th><th>Poäng</th></tr></thead>
              <tbody id="finalScoreBody"></tbody>
            </table>
          </div>
          <div id="answerBlock" style="margin-top:14px;display:none;">
            <h4>Facit (rätt ordning):</h4>
            <ol id="answerList" style="margin-top:6px;"></ol>
          </div>
          
          <!-- Spela igen-knapp -->
          <div style="margin-top:20px;text-align:center">
            <button id="playAgainBtn" class="primary" style="padding:14px 28px;font-size:1.1rem">🎮 Spela igen</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading overlay -->
  <div id="loadingOverlay" class="loading-overlay">
    <div class="loading-spinner"></div>
    <div class="loading-text">Letar efter nästa låt...</div>
  </div>

  <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
  <script>
    const socket = io('https://timedrop-api.onrender.com');

    const createGameBtn = document.getElementById('createGameBtn');
    const createHint    = document.getElementById('createHint');
    const roundsInput   = document.getElementById('rounds');

    const gameArea   = document.getElementById('gameArea');
    const gameCodeEl = document.getElementById('gameCode');
    const playersEl  = document.getElementById('players');
    const scoreBody  = document.getElementById('scoreBody');

    const startRoundBtn = document.getElementById('startRoundBtn');
    const endGameBtn    = document.getElementById('endGameBtn');
    const roundInfoEl   = document.getElementById('roundInfo');

    const timelineBox   = document.getElementById('timelineBox');
    const timelinePlayers = document.getElementById('timelinePlayers');
    
    // Spotify Player
    const spotifyPlayerBox = document.getElementById('spotifyPlayer');
    const playerStatus = document.getElementById('playerStatus');
    const nowPlaying = document.getElementById('nowPlaying');
    const trackImage = document.getElementById('trackImage');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeLabel = document.getElementById('volumeLabel');
    const timelineRoundSummary = document.getElementById('timelineRoundSummary');
    const timelineRoundText    = document.getElementById('timelineRoundText');

    const finalBox      = document.getElementById('finalBox');
    const podiumEl      = document.getElementById('podium');
    const finalScoreBody= document.getElementById('finalScoreBody');
    const answerBlock   = document.getElementById('answerBlock');
    const answerList    = document.getElementById('answerList');

    // Spotify-element
    const spotifyStatusEl = document.getElementById('spotifyStatus');
    const spotifyLoginBtn = document.getElementById('spotifyLoginBtn');
    const sendTrackBtn    = document.getElementById('sendTrackBtn');

    let currentGameId = null;
    let mode = 'timeline';
    let roundInProgress = false;
    let currentAudio = null; // För Spotify preview
    let currentRound = 0; // Håll koll på nuvarande runda
    let totalRounds = 0; // Totalt antal rundor

    function setStartBtn(label, disabled=false) {
      startRoundBtn.textContent = label;
      startRoundBtn.disabled = !!disabled;
    }

    socket.on('connected', (d) => console.log('Server:', d));

    // ========== KATEGORIER ==========
    const categoryGrid = document.getElementById('categoryGrid');
    const availableCategories = [
      { id: "50s", name: "50-tal", count: 40 },
      { id: "60s", name: "60-tal", count: 50 },
      { id: "70s", name: "70-tal", count: 50 },
      { id: "80s", name: "80-tal", count: 50 },
      { id: "90s", name: "90-tal", count: 55 },
      { id: "2000s", name: "2000-tal", count: 50 },
      { id: "2010s", name: "2010-tal", count: 51 },
      { id: "2020s", name: "2020-tal", count: 50 },

      { id: "rock", name: "Rock", count: 50 },
      { id: "pop", name: "Pop", count: 50 },
      { id: "metal", name: "Metal", count: 40 },
      { id: "hiphop", name: "Hip Hop", count: 50 },
      { id: "edm", name: "EDM / Dance", count: 50 },

      { id: "soul", name: "Soul & R&B", count: 50 },
      { id: "country", name: "Country", count: 40 },
      { id: "soundtracks", name: "Soundtracks", count: 50 },

      { id: "svenskpop", name: "Svensk pop", count: 50 },
      { id: "dansband", name: "Dansband", count: 40 },

      { id: "onehit", name: "One Hit Wonders", count: 50 },
      { id: "svensk_mello", name: "Svensk Mello", count: 50 }
    ];

    // Rendera kategorier
    availableCategories.forEach(cat => {
      const item = document.createElement('div');
      item.className = 'category-item';
      item.innerHTML = `
        <input type="checkbox" id="cat-${cat.id}" value="${cat.id}" />
        <label for="cat-${cat.id}" class="category-label">${cat.name}</label>
        <span class="category-count">${cat.count} låtar</span>
      `;
      
      const checkbox = item.querySelector('input');
      checkbox.addEventListener('change', () => {
        item.classList.toggle('selected', checkbox.checked);
      });
      
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
          item.classList.toggle('selected', checkbox.checked);
        }
      });
      
      categoryGrid.appendChild(item);
    });

    // Hämta valda kategorier
    function getSelectedCategories() {
      return Array.from(document.querySelectorAll('#categoryGrid input:checked'))
        .map(cb => cb.value);
    }

    // ========== SPOTIFY ==========
    let spotifyConnected = false;

    // Kolla status först när vi har ett gameId
    async function checkSpotifyStatus() {
      if (!currentGameId) {
        console.log('Ingen gameId ännu, hoppar över Spotify-status');
        return;
      }

      try {
        const res = await fetch(
          `https://timedrop-api.onrender.com/spotify-status?gameId=${encodeURIComponent(currentGameId)}`
        );
        const data = await res.json();

        spotifyConnected = !!data.authed;
        updateSpotifyUI(spotifyConnected);
      } catch (err) {
        console.log('Kunde inte kolla Spotify-status', err);
      }
    }

    function updateSpotifyUI(connected) {
      spotifyConnected = connected;
      const statusEl = document.getElementById('spotifyStatus');
      const btnEl = document.getElementById('spotifyLoginBtn');
      
      if (connected) {
        statusEl.textContent = '✅ Spotify ansluten! (preview + Web Player)';
        statusEl.style.color = '#34d399';
        btnEl.textContent = 'Ansluten';
        btnEl.disabled = true;
        initSpotifyPlayer(); // Initiera spelaren automatiskt
      } else {
        statusEl.textContent = '🎵 Spotify: Ej ansluten (inga preview)';
        statusEl.style.color = '#9ca3af';
        btnEl.textContent = 'Anslut Spotify';
        btnEl.disabled = false;
      }
    }

    spotifyLoginBtn.addEventListener('click', () => {
      if (!currentGameId) {
        alert('Skapa ett spel först innan du ansluter Spotify.');
        return;
      }

      const width = 500, height = 700;
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;
      const popup = window.open(
        `https://timedrop-api.onrender.com/spotify-login?gameId=${encodeURIComponent(currentGameId)}`,
        'Spotify Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setTimeout(() => {
            checkSpotifyStatus();
            initSpotifyPlayer(); // Initiera spelaren när Spotify är anslutet
          }, 500);
        }
      }, 500);
    });

    // ========== SPOTIFY WEB PLAYBACK SDK ==========
    let player = null;
    let deviceId = null;
    let currentTrackUri = null;

    // Spotify SDK laddar automatiskt när sidan laddas
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK ready');
      // Vänta tills användaren loggar in
    };

    async function initSpotifyPlayer() {
      if (player) return; // Redan initierad
      if (!spotifyConnected) return;
      if (!currentGameId) return;

      try {
        const tokenRes = await fetch(
          `https://timedrop-api.onrender.com/spotify-token?gameId=${encodeURIComponent(currentGameId)}`
        );
        if (!tokenRes.ok) {
          console.log('Ingen Spotify token tillgänglig');
          return;
        }
        const { access_token } = await tokenRes.json();

        player = new Spotify.Player({
          name: 'TimeDrop Master Player',
          getOAuthToken: cb => { cb(access_token); },
          volume: 0.5
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Spotify Player ready! Device ID:', device_id);
          deviceId = device_id;
          playerStatus.textContent = 'Redo att spela';
          playerStatus.style.color = '#34d399';
          spotifyPlayerBox.style.display = 'block';
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
          playerStatus.textContent = 'Frånkopplad';
          playerStatus.style.color = '#f87171';
        });

        // Player state changed
        player.addListener('player_state_changed', state => {
          if (!state) return;
          
          const track = state.track_window.current_track;
          if (track) {
            trackImage.src = track.album.images[0]?.url || '';
            trackTitle.textContent = track.name;
            trackArtist.textContent = track.artists.map(a => a.name).join(', ');
            nowPlaying.style.display = 'block';
            
            // Uppdatera status baserat på om låten spelar
            if (!state.paused) {
              playerStatus.textContent = `Spelar: ${track.name}`;
              playerStatus.style.color = '#34d399';
            } else {
              playerStatus.textContent = 'Pausad';
              playerStatus.style.color = '#9ca3af';
            }
          }

          playBtn.disabled = false;
          pauseBtn.disabled = false;
        });

        // Connect to player
        const connected = await player.connect();
        if (connected) {
          console.log('Spotify Player connected!');
        }

      } catch (err) {
        console.error('Failed to init Spotify Player:', err);
        playerStatus.textContent = 'Kunde inte ansluta spelare';
        playerStatus.style.color = '#f87171';
      }
    }

    // Play-knapp (om låten inte spelar automatiskt)
    playBtn.addEventListener('click', async () => {
      if (!player || !currentTrackUri) {
        console.log('Ingen låt laddad');
        return;
      }
      if (!currentGameId) {
        console.log('Ingen gameId, kan inte hämta token');
        return;
      }
      
      try {
        const tokenRes = await fetch(
          `https://timedrop-api.onrender.com/spotify-token?gameId=${encodeURIComponent(currentGameId)}`
        );
        const { access_token } = await tokenRes.json();
        
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          body: JSON.stringify({
            uris: [currentTrackUri],
            position_ms: 0 // Starta från början
          })
        });
        
        playerStatus.textContent = 'Spelar...';
        playerStatus.style.color = '#34d399';
        console.log('▶ Play clicked');
      } catch (err) {
        console.error('Play error:', err);
        playerStatus.textContent = 'Kunde inte spela - försök igen';
        playerStatus.style.color = '#f87171';
      }
    });

    // Pause-knapp
    pauseBtn.addEventListener('click', async () => {
      if (!player) return;
      
      try {
        await player.pause();
        playerStatus.textContent = 'Pausad';
        playerStatus.style.color = '#9ca3af';
        console.log('⏸ Pause clicked');
      } catch (err) {
        console.error('Pause error:', err);
      }
    });

    // Volume-slider
    volumeSlider.addEventListener('input', (e) => {
      const volume = parseInt(e.target.value) / 100;
      if (player) {
        player.setVolume(volume);
      }
      volumeLabel.textContent = `${e.target.value}%`;
    });

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Tab-växling
    function switchTab(tabName) {
      // Dölj alla tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Visa vald tab
      document.getElementById('tab-' + tabName).classList.add('active');
      event.target.classList.add('active');
    }

    // ========== GAME LOGIC ==========

    createGameBtn.addEventListener('click', () => {
      const rounds = parseInt(roundsInput.value, 10);
      const categories = getSelectedCategories();

      if (categories.length > 0) {
        createHint.textContent = `Skapar spel med ${categories.length} kategorier...`;
      } else {
        createHint.textContent = 'Skapar spel med demo-låtar...';
      }
      
      socket.emit('create_game', { 
        rounds,
        categories 
      });
    });

    socket.on('game_created', ({ gameId, rounds }) => {
      currentGameId = gameId;
      
      const categories = getSelectedCategories();
      if (categories.length > 0) {
        const catNames = categories.map(c => 
          availableCategories.find(cat => cat.id === c)?.name || c
        ).join(', ');
        createHint.textContent = `Skapade spel med ${rounds} rundor från: ${catNames}`;
      } else {
        createHint.textContent = `Skapade spel med ${rounds} rundor (demo-låtar)`;
      }

      gameCodeEl.textContent = gameId;
      gameArea.style.display = 'block';
      
      // Generera QR-kod för mobil anslutning
      const qrCodeSection = document.getElementById('qrCodeSection');
      const qrCodeDiv = document.getElementById('qrCode');
      qrCodeDiv.innerHTML = ''; // Rensa tidigare QR-kod
      
      const joinUrl = `https://timedrop.se/join.html?code=${gameId}`;
      new QRCode(qrCodeDiv, {
        text: joinUrl,
        width: 200,
        height: 200,
        colorDark: "#3a2f1f",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
      qrCodeSection.style.display = 'block';
      
      // Spara totalt antal rundor
      totalRounds = rounds;
      currentRound = 0;
      
      // Dölj spelinställningar när spelet är aktivt
      document.getElementById('config').style.display = 'none';

      timelineBox.style.display = 'block';

      playersEl.innerHTML = '';
      scoreBody.innerHTML = '';
      finalBox.style.display = 'none';
      timelineRoundSummary.style.display = 'none';
      roundInfoEl.textContent = 'Vänta på att spelare ansluter.';
      setStartBtn('Starta runda', false);

      // ✅ Kolla Spotify-status för just detta spel
      checkSpotifyStatus();
    });

    let loadingTimeout = null;

    startRoundBtn.addEventListener('click', async () => {
      if (!currentGameId) return alert('Skapa först ett spel');

      if (!roundInProgress) {
        // STARTA NY TIMELINE-RUNDA
        
        // 1. Stoppa nuvarande musik först
        if (player) {
          try {
            await player.pause();
            console.log('⏸ Stoppade musik innan ny runda');
          } catch (err) {
            console.log('Kunde inte pausa:', err);
          }
        }
        if (currentAudio) {
          currentAudio.pause();
          currentAudio = null;
        }
        
        // 2. Visa loading-animation
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('active');
        
        // 3. Sätt timeout för loading (om inget händer på 5 sek, dölj loading)
        if (loadingTimeout) clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(() => {
          console.warn('⚠️ Loading timeout - döljer overlay');
          loadingOverlay.classList.remove('active');
          loadingTimeout = null;
        }, 5000);
        
        // 4. Vänta lite (ger känsla av att leta efter låt)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 5. Starta rundan
        socket.emit('start_round', { gameId: currentGameId });
        roundInProgress = true;
        setStartBtn('Väntar på spelare…', true);
        roundInfoEl.textContent = 'Runda startad – väntar på spelarnas svar.';
        
        console.log('📡 Skickade start_round till backend');
      } else {
        // AVSLUTA PÅGÅENDE TIMELINE-RUNDA (räkna poäng)
        socket.emit('end_timeline_round', { gameId: currentGameId });
        setStartBtn('Avslutar runda…', true);
      }
    });

    endGameBtn.addEventListener('click', () => {
      if (!currentGameId) return;
      socket.emit('end_game', { gameId: currentGameId });
    });
    
    // Spela igen-knapp
    document.getElementById('playAgainBtn').addEventListener('click', () => {
      // Dölj gameArea och visa config igen
      document.getElementById('gameArea').style.display = 'none';
      document.getElementById('config').style.display = 'block';
      
      // Rensa spelet
      currentGameId = null;
      roundInProgress = false;
      
      // Återställ formuläret
      createHint.textContent = '';
      
      console.log('🎮 Redo att spela igen!');
    });

    socket.on('player_joined', ({ playerId, name, count }) => {
      if (!playerId || !name) return;
      
      // Lägg till spelare i listan
      let playerDiv = document.querySelector(`[data-player="${playerId}"]`);
      if (!playerDiv) {
        playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.dataset.player = playerId;
        playerDiv.textContent = name;
        playersEl.appendChild(playerDiv);
      }

      // Lägg till i poängtabellen
      let tr = scoreBody.querySelector(`[data-score="${playerId}"]`);
      if (!tr) {
        tr = document.createElement('tr');
        tr.dataset.score = playerId;
        tr.innerHTML = `<td>–</td><td>${name}</td><td>0</td>`;
        scoreBody.appendChild(tr);
      }

      console.log(`${name} joined (total: ${count} players)`);
      
      // Uppdatera gruppering
      updatePlayerGrouping();
    });
    
    function updatePlayerGrouping() {
      const players = Array.from(playersEl.querySelectorAll('.player[data-player]'));
      if (players.length <= 3) return; // Ingen gruppering behövs
      
      // Hämta poäng från tabell
      players.forEach((div, idx) => {
        const playerId = div.dataset.player;
        const scoreRow = scoreBody.querySelector(`[data-score="${playerId}"]`);
        const score = scoreRow ? parseInt(scoreRow.querySelector('td:last-child').textContent) || 0 : 0;
        div.dataset.score = score;
      });
      
      // Sortera efter poäng
      const sorted = players.sort((a, b) => parseInt(b.dataset.score || 0) - parseInt(a.dataset.score || 0));
      
      // Ta bort gamla dividers
      playersEl.querySelectorAll('.player-divider').forEach(d => d.remove());
      
      // Markera topp 3 och lägg till divider
      sorted.forEach((div, idx) => {
        if (idx < 3) {
          div.classList.add('top3');
        } else {
          div.classList.remove('top3');
        }
      });
      
      // Lägg till divider efter tredje spelaren
      if (sorted.length > 3) {
        const divider = document.createElement('div');
        divider.className = 'player-divider';
        divider.textContent = '───';
        sorted[2].after(divider);
      }
    }

    socket.on('player_left', ({ playerId }) => {
      const row = document.querySelector(`[data-player="${playerId}"]`);
      if (row) row.remove();
      const scoreRow = scoreBody.querySelector(`[data-score="${playerId}"]`);
      if (scoreRow) scoreRow.remove();
    });

    function addOrUpdatePlayer(p){
      let row = document.querySelector(`[data-player="${p.id}"]`);
      if (!row) {
        row = document.createElement('div');
        row.className = 'player';
        row.dataset.player = p.id;
        playersEl.appendChild(row);
      }
      row.textContent = p.name;

      let tr = scoreBody.querySelector(`[data-score="${p.id}"]`);
      if (!tr) {
        tr = document.createElement('tr');
        tr.dataset.score = p.id;
        tr.innerHTML = `<td>–</td><td>${escapeHTML(p.name)}</td><td>0</td>`;
        scoreBody.appendChild(tr);
      }
      updatePlacements();
    }

    function updateScoreboard(scores){
      scoreBody.innerHTML = '';
      scores.forEach((s, idx) => {
        const tr = document.createElement('tr');
        tr.dataset.score = s.playerId;
        tr.innerHTML = `<td>${idx+1}</td><td>${escapeHTML(s.name)}</td><td>${s.score}</td>`;
        scoreBody.appendChild(tr);
      });
      
      // Uppdatera spelarlistan också
      playersEl.innerHTML = '';
      scores.forEach((s, idx) => {
        const div = document.createElement('div');
        div.className = 'player';
        div.dataset.player = s.playerId;
        div.dataset.score = s.score;
        
        if (idx < 3 && scores.length > 3) {
          div.classList.add('top3');
        }
        
        div.textContent = `${s.name} (${s.score} p)`;
        playersEl.appendChild(div);
        
        // Divider efter topp 3
        if (idx === 2 && scores.length > 3) {
          const divider = document.createElement('div');
          divider.className = 'player-divider';
          divider.textContent = '───';
          playersEl.appendChild(divider);
        }
      });
    }

    function updatePlacements(){
      const rows = Array.from(scoreBody.querySelectorAll('tr'));
      rows.forEach((tr, i) => tr.firstElementChild.textContent = i+1);
    }

    // YEAR
    // TIMELINE

    // När en spelare har placerat låten
    socket.on('player_placed', ({ playerId, playerName }) => {
      if (!roundInProgress) return;
      
      // Markera spelaren som "klar" i listan
      const playerDiv = document.querySelector(`[data-player="${playerId}"]`);
      if (playerDiv && !playerDiv.textContent.includes('✓')) {
        playerDiv.textContent = `${playerName} ✓`;
        playerDiv.style.opacity = '0.6';
      }
      
      // Uppdatera info - visa att spelare placerat men knappen är redan aktiv
      const placedCount = playersEl.querySelectorAll('.player[data-player]').length;
      const withCheck = Array.from(playersEl.querySelectorAll('.player[data-player]')).filter(p => p.textContent.includes('✓')).length;
      roundInfoEl.textContent = `${withCheck}/${placedCount} spelare har placerat. Avsluta när du vill.`;
    });

    // När servern räknat klart poängen för rundan
    socket.on('scoreboard_update', ({ gameId, scores }) => {
      if (Array.isArray(scores)) {
        updateScoreboard(scores);
      }
      roundInfoEl.textContent = 'Runda avslutad – klicka "Starta runda" för nästa låt.';
      setStartBtn('Starta runda', false);
      roundInProgress = false;
    });

    socket.on('game_created', ({ gameId, rounds }) => {
      currentGameId = gameId;
      roundInProgress = false; // reset
    });

    socket.on('game_ended', ({ reason, scores, answer }) => {
      roundInProgress = false;
      
      // Visa spelinställningar igen när spelet är slut
      document.getElementById('config').style.display = 'block';
    });

    socket.on('timeline_round_started', ({ round, totalRounds, song }) => {
      console.log(`🎮 timeline_round_started: Runda ${round}/${totalRounds} - ${song?.title || 'okänd låt'}`);
      
      // Spara nuvarande runda
      currentRound = round;
      
      // Visa rundor kvar
      const roundsLeft = totalRounds - round;
      roundInfoEl.textContent = `Runda ${round}/${totalRounds} - ${roundsLeft} ${roundsLeft === 1 ? 'runda' : 'rundor'} kvar`;
      
      // Om sista rundan
      if (round === totalRounds) {
        roundInfoEl.textContent = `Sista rundan (${round}/${totalRounds})`;
      }
      
      timelineRoundSummary.style.display = 'none';
      finalBox.style.display = 'none';
      setStartBtn('Avsluta runda', false); // Spelledare kan alltid avsluta
      
      // Rensa ✓ från spelare (ny runda)
      playersEl.querySelectorAll('.player[data-player]').forEach(div => {
        const playerName = div.textContent.replace(' ✓', '');
        div.textContent = playerName;
        div.style.opacity = '1';
      });
      
      // Dölj loading om den fortfarande visas
      const loadingOverlay = document.getElementById('loadingOverlay');
      if (loadingOverlay.classList.contains('active')) {
        console.log('⚠️ Loading fortfarande aktiv vid timeline_round_started - döljer nu');
        loadingOverlay.classList.remove('active');
      }
      
      // Cleara timeout om den finns
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
    });

    // 🎵 Ladda låt i Spotify-spelare eller spela preview
    socket.on('master_preview', async ({ previewUrl, spotifyUri, spotifyTrackId, title, artist }) => {
      console.log(`📻 Ny låt mottagen: ${artist} – ${title}`);
      console.log(`   Spotify URI: ${spotifyUri}`);
      
      // Cleara loading timeout
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      
      // Dölj loading overlay
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingOverlay.classList.remove('active');
      console.log('✅ Loading dold');
      
      // Pausa nuvarande uppspelning först OCH vänta lite
      if (player) {
        try {
          await player.pause();
          console.log('⏸ Pausade tidigare låt');
          // Vänta 200ms för att säkerställa att pausen går igenom
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (err) {
          console.log('Kunde inte pausa:', err);
        }
      }
      
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
      
      // Om vi har Spotify-spelare och track URI, spela låten automatiskt
      if (player && deviceId && spotifyUri && currentGameId) {
        currentTrackUri = spotifyUri;
        
        try {
          // Hämta access token
          const tokenRes = await fetch(
            `https://timedrop-api.onrender.com/spotify-token?gameId=${encodeURIComponent(currentGameId)}`
          );
          const { access_token } = await tokenRes.json();
          
          // Först - se till att spelaren är redo
          playerStatus.textContent = `Förbereder: ${title}...`;
          playerStatus.style.color = '#fbbf24';
          
          // Starta uppspelning direkt på rätt låt
          const playRes = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
              uris: [spotifyUri],
              position_ms: 0 // Starta från början
            })
          });
          
          if (playRes.ok) {
            playerStatus.textContent = `Spelar: ${artist} – ${title}`;
            playerStatus.style.color = '#34d399';
            playBtn.disabled = false;
            pauseBtn.disabled = false;
            volumeSlider.disabled = false;
            
            console.log(`✅ Spelar automatiskt: ${artist} – ${title}`);
          } else {
            throw new Error(`Play failed: ${playRes.status}`);
          }
          
        } catch (err) {
          console.error('Auto-play error:', err);
          playerStatus.textContent = `Låt laddad - klicka ▶ Spela: ${title}`;
          playerStatus.style.color = '#fbbf24';
          playBtn.disabled = false;
          pauseBtn.disabled = false;
          volumeSlider.disabled = false;
        }
        
      } else if (previewUrl) {
        // Fallback: Spela 30-sek preview
        try {
          currentAudio = new Audio(previewUrl);
          currentAudio.volume = 0.5;
          currentAudio.play().catch(err => {
            console.log('Kunde inte spela preview:', err);
          });
          
          console.log(`🎵 Spelar preview: ${artist} – ${title}`);
          
          // Stoppa efter 30 sek
          setTimeout(() => {
            if (currentAudio) {
              currentAudio.pause();
            }
          }, 30000);
        } catch (err) {
          console.log('Preview-fel:', err);
        }
      }
    });

    socket.on('timeline_player_update', ({ playerId, name, timeline }) => {
      if (mode !== 'timeline') return;
      renderPlayerTimeline(playerId, name, timeline);
    });

    socket.on('timeline_round_summary', ({ timelines, scores }) => {
      if (mode !== 'timeline') return;
      if (Array.isArray(scores)) updateScoreboard(scores);

      timelineRoundSummary.style.display = 'block';
      const lines = [];
      if (timelines && timelines.length) {
        timelines.forEach(t => {
          const state = t.correct ? '✅ korrekt ordning' : '❌ fel ordning';
          lines.push(`${t.name}: ${state}`);
        });
      }
      timelineRoundText.textContent = lines.join(' • ') || '—';
      
      // Om det var sista rundan - inaktivera "Nästa låt" knappen
      if (currentRound >= totalRounds) {
        roundInfoEl.textContent = `✅ Alla ${totalRounds} rundor spelade! Tryck "Avsluta spel" för att se vinnaren.`;
        setStartBtn('Inga fler rundor', true);
      } else {
        setStartBtn('Nästa låt', false);
      }
    });

    // SLUT
    socket.on('final_scores', ({ scores, timelineAnswer }) => {
      if (Array.isArray(scores)) updateScoreboard(scores);
      renderPodium(scores);
      renderFinalTable(scores);

      if (Array.isArray(timelineAnswer) && timelineAnswer.length) {
        answerList.innerHTML = '';
        timelineAnswer.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.title} (${item.year})`;
          answerList.appendChild(li);
        });
        answerBlock.style.display = 'block';
      } else {
        answerBlock.style.display = 'none';
      }
      finalBox.style.display = 'block';
    });

    socket.on('no_more_songs', ({ message }) => {
      roundInfoEl.textContent = message || 'Inga fler rundor.';
      setStartBtn('Inga fler låtar – avsluta spelet', true);
    });

    socket.on('game_ended', ({ reason, scores, answer }) => {
      if (scores && (!podiumEl.childElementCount || !finalScoreBody.childElementCount)) {
        renderPodium(scores);
        renderFinalTable(scores);
        finalBox.style.display = 'block';
      }
      if (answer && Array.isArray(answer)) {
        answerList.innerHTML = '';
        answer.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.title} (${item.year})`;
          answerList.appendChild(li);
        });
        answerBlock.style.display = 'block';
      }
      roundInfoEl.textContent = reason || 'Spelet avslutades.';
      setStartBtn('Starta runda', true);
    });

    // UI helpers
    function renderPlayerTimeline(playerId, name, readableTimeline){
      let card = document.querySelector(`[data-tline="${playerId}"]`);
      if (!card) {
        card = document.createElement('div');
        card.className = 'card';
        card.dataset.tline = playerId;
        timelinePlayers.appendChild(card);
      }
      card.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${escapeHTML(name)}</div>`;
      const row = document.createElement('div');
      readableTimeline.forEach((t, idx) => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = `#${idx+1} ${t}`;
        row.appendChild(chip);
      });
      if (!readableTimeline.length) {
        const empty = document.createElement('div');
        empty.className = 'hint';
        empty.textContent = '— tom —';
        row.appendChild(empty);
      }
      card.appendChild(row);
    }

    function renderPodium(scores){
      podiumEl.innerHTML = '';
      if (!Array.isArray(scores) || !scores.length) return;

      const first  = scores[0] || null;
      const second = scores[1] || null;
      const third  = scores[2] || null;

      const pods = [
        { label: '#2', cls: 'pod silver h2', data: second },
        { label: '#1', cls: 'pod gold h1',   data: first  },
        { label: '#3', cls: 'pod bronze h3', data: third  },
      ];

      pods.forEach(p => {
        const pod = document.createElement('div');
        pod.className = p.cls;

        const place = document.createElement('div');
        place.className = 'place';
        place.textContent = p.data ? p.label : '-';

        const who = document.createElement('div');
        who.className = 'who';
        who.textContent = p.data ? p.data.name : '—';

        const pts = document.createElement('div');
        pts.className = 'pts';
        pts.textContent = p.data ? `${p.data.score} p` : '';

        pod.appendChild(place);
        pod.appendChild(who);
        pod.appendChild(pts);
        podiumEl.appendChild(pod);
      });
    }

    function renderFinalTable(scores){
      finalScoreBody.innerHTML = '';
      if (!Array.isArray(scores)) return;
      scores.forEach((s, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${idx+1}</td><td>${escapeHTML(s.name)}</td><td>${s.score}</td>`;
        finalScoreBody.appendChild(tr);
      });
    }

    function escapeHTML(str){
      return String(str).replace(/[&<>"']/g, s => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
      }[s]));
    }
  </script>
</body>
</html>
