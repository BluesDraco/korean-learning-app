// Retry fetching lyrics for remaining 22 songs with no lyrics
const fs = require('fs');
const https = require('https');
const path = require('path');

const KPOP = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const LYRICS_FILE = path.join(__dirname, 'lrclib_lyrics_v2.json');
const OUT = path.join(__dirname, 'lrclib_retry_results.json');

const data = fs.readFileSync(KPOP, 'utf8');

// Find all highlight songs
const pattern = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)'[^}]*?videoId:\s*'([^']+)'[^}]*?lyricsKind:\s*'highlight'/gs;
const songs = [];
let m;
while ((m = pattern.exec(data)) !== null) {
  songs.push({ id: m[1], title: m[2], artist: m[3], videoId: m[4] });
}
console.log(`Found ${songs.length} songs without lyrics:\n`);
songs.forEach(s => console.log(`  ${s.id}: ${s.artist} - ${s.title} (${s.videoId})`));

let existing = {};
if (fs.existsSync(LYRICS_FILE)) {
  existing = JSON.parse(fs.readFileSync(LYRICS_FILE, 'utf8'));
}
let retryResults = {};
if (fs.existsSync(OUT)) {
  retryResults = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  console.log(`\nLoaded ${Object.keys(retryResults).length} existing retry results`);
}

function httpGet(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve(null); } });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

async function searchLRC(query) {
  const url = `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`;
  return await httpGet(url);
}

function isMatch(result, song) {
  const rArtist = (result.artistName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const rTrack = (result.trackName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const sArtist = song.artist.toLowerCase().replace(/[^a-z0-9]/g, '');
  const sTitle = song.title.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Direct match
  if (rArtist.includes(sArtist) && rTrack.includes(sTitle)) return true;
  if (sArtist.includes(rArtist) && sTitle.includes(rTrack)) return true;

  // Fuzzy: check if major words from title match
  const titleWords = sTitle.split(/\s+/).filter(w => w.length > 2);
  const titleHit = titleWords.filter(w => rTrack.includes(w)).length;
  const artistHit = rArtist.includes(sArtist) || sArtist.includes(rArtist);
  if (artistHit && titleHit >= titleWords.length * 0.5) return true;

  return false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  let newFound = 0;

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];

    // Skip already retried
    if (retryResults[song.id]) {
      if (retryResults[song.id].syncedLyrics) {
        console.log(`  [${i+1}/${songs.length}] ALREADY FOUND ${song.artist} - ${song.title}`);
      } else {
        console.log(`  [${i+1}/${songs.length}] ALREADY TRIED ${song.artist} - ${song.title} (no match)`);
      }
      continue;
    }

    // Strategy 1: "Artist Title" (full)
    const q1 = `${song.artist} ${song.title}`;
    const results = await searchLRC(q1);
    await sleep(500);

    // Strategy 2: Just title (if strategy 1 failed or had poor results)
    let results2 = null;
    if (!results || results.length === 0) {
      results2 = await searchLRC(song.title);
      await sleep(500);
    }

    const allResults = [...(results || []), ...(results2 || [])];

    if (allResults.length === 0) {
      retryResults[song.id] = { found: false, reason: 'no search results' };
      console.log(`  [${i+1}/${songs.length}] MISS ${song.artist} - ${song.title} (0 results for any query)`);
      fs.writeFileSync(OUT, JSON.stringify(retryResults, null, 2));
      continue;
    }

    // Find best match with synced lyrics
    let best = null;
    for (const r of allResults) {
      if (r.syncedLyrics && isMatch(r, song)) {
        best = r;
        break;
      }
    }
    // Any match (even without synced lyrics in search)
    if (!best) {
      for (const r of allResults) {
        if (isMatch(r, song)) { best = r; break; }
      }
    }
    // Fallback: first result with synced lyrics
    if (!best) {
      for (const r of allResults) {
        if (r.syncedLyrics) { best = r; break; }
      }
    }

    if (!best) {
      retryResults[song.id] = {
        found: false, reason: 'no match',
        numResults: allResults.length,
        firstTrack: allResults[0]?.trackName,
        firstArtist: allResults[0]?.artistName
      };
      console.log(`  [${i+1}/${songs.length}] NO MATCH ${song.artist} - ${song.title} (${allResults.length} results, first: ${allResults[0]?.trackName} - ${allResults[0]?.artistName})`);
      fs.writeFileSync(OUT, JSON.stringify(retryResults, null, 2));
      continue;
    }

    let syncedLyrics = best.syncedLyrics;

    // Fetch full data if search result has no synced lyrics
    if (!syncedLyrics && best.id) {
      await sleep(500);
      const full = await httpGet(`https://lrclib.net/api/get/${best.id}`);
      if (full && full.syncedLyrics) {
        syncedLyrics = full.syncedLyrics;
      }
    }

    if (syncedLyrics) {
      const lines = syncedLyrics.split('\n').filter(l => l.trim() && /\[.*\]/.test(l)).length;
      retryResults[song.id] = {
        id: song.id, title: song.title, artist: song.artist, videoId: song.videoId,
        syncedLyrics, plainLyrics: best.plainLyrics || '',
        lrcId: best.id, trackName: best.trackName, artistName: best.artistName
      };
      newFound++;
      console.log(`  [${i+1}/${songs.length}] FOUND ${song.artist} - ${song.title}: ${lines} lines (trackName="${best.trackName}", artistName="${best.artistName}")`);
    } else {
      retryResults[song.id] = { found: false, reason: 'no synced lyrics', trackName: best.trackName };
      console.log(`  [${i+1}/${songs.length}] MISS ${song.artist} - ${song.title} (matched "${best.trackName}" but no synced lyrics)`);
    }

    // Save after each song
    fs.writeFileSync(OUT, JSON.stringify(retryResults, null, 2));
  }

  const found = Object.values(retryResults).filter(v => v && v.syncedLyrics).length;
  console.log(`\nDone: ${found}/${songs.length} newly found`);
  console.log(`Saved to ${OUT}`);
}
main().catch(console.error);
