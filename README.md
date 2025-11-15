# TimeDrop Backend

Backend för TimeDrop - ett musikquiz-spel där spelare placerar låtar i kronologisk ordning.

## Teknisk stack
- Node.js
- Express
- Socket.io
- Spotify Web API

## Deployment på Render.com

1. Skapa nytt Web Service på Render
2. Anslut detta GitHub-repo
3. Lägg till Environment Variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REDIRECT_URI`

## Lokal utveckling

```bash
npm install
node index.js
```

Server körs på `http://localhost:3000`
