// Fetch synced lyrics from LRCLIB for all K-pop songs
const fs = require('fs');
const https = require('https');
const path = require('path');

const KPOP = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const OUT = path.join(__dirname, 'lrclib_lyrics.json');

const data = fs.readFileSync(KPOP, 'utf8');
const pattern = /id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)'[^}]*?videoId:\s*'([^']+)'/gs;
const songs = [];
let m;
while ((m = pattern.exec(data)) !== null) {
  songs.push({ id: m[1], title: m[2], artist: m[3], videoId: m[4] });
}

console.log(`Found ${songs.length} songs`);

let results = {};
if (fs.existsSync(OUT)) {
  results = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  console.log(`Loaded ${Object.keys(results).length} existing results`);
}

function searchLRC(artist, title) {
  const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}&duration=240`;
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  let newFound = 0;
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const vid = song.videoId;
    if (vid in results) continue;

    const lrc = await searchLRC(song.artist, song.title);
    if (lrc && lrc.syncedLyrics) {
      results[vid] = {
        id: song.id, title: song.title, artist: song.artist, videoId: vid,
        syncedLyrics: lrc.syncedLyrics, plainLyrics: lrc.plainLyrics || ''
      };
      const lines = lrc.syncedLyrics.split('\n').filter(l => l.trim()).length;
      newFound++;
      console.log(`  [${i+1}/${songs.length}] FOUND ${song.artist} - ${song.title}: ${lines} lines`);
    } else {
      results[vid] = null;
      console.log(`  [${i+1}/${songs.length}] MISS ${song.artist} - ${song.title}`);
    }

    if ((i + 1) % 10 === 0) {
      fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
      console.log(`  Saved at ${i+1}/${songs.length}`);
    }
    await sleep(200); // rate limit
  }

  fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
  const found = Object.values(results).filter(v => v !== null).length;
  console.log(`\nDone: ${found}/${songs.length} found on LRCLIB`);
  console.log(`Saved to ${OUT}`);
}
main().catch(console.error);
