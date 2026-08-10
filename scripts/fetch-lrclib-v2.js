// Fetch synced lyrics using LRCLIB SEARCH API (much better coverage)
const fs = require('fs');
const https = require('https');
const path = require('path');

const KPOP = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const OUT = path.join(__dirname, 'lrclib_lyrics_v2.json');

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

function httpGet(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 12000 }, (res) => {
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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Check if a search result matches our artist/title
function isMatch(result, song) {
  const rArtist = (result.artistName || '').toLowerCase();
  const rTrack = (result.trackName || '').toLowerCase();
  const sArtist = song.artist.toLowerCase();
  const sTitle = song.title.toLowerCase();

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

async function main() {
  let newFound = 0;

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const vid = song.videoId;

    // Skip already found
    if (results[vid] && results[vid].syncedLyrics) continue;

    // Search with "Artist Title"
    const query = `${song.artist} ${song.title}`;
    const searchResults = await searchLRC(query);
    await sleep(400);

    if (!searchResults || searchResults.length === 0) {
      results[vid] = { found: false };
      if ((i+1) % 25 === 0) console.log(`  [${i+1}/${songs.length}] MISS (no results)`);
      continue;
    }

    // Find best match
    let best = null;
    // First: look for match with synced lyrics
    for (const r of searchResults) {
      if (r.syncedLyrics && isMatch(r, song)) {
        best = r;
        break;
      }
    }
    // Second: look for any match (even without synced lyrics in search result)
    if (!best) {
      for (const r of searchResults) {
        if (isMatch(r, song)) { best = r; break; }
      }
    }
    // Third: just use first result if it has synced lyrics
    if (!best && searchResults[0]?.syncedLyrics) {
      best = searchResults[0];
    }

    if (!best) {
      results[vid] = { found: false, searched: query, numResults: searchResults.length };
      if ((i+1) % 10 === 0) console.log(`  [${i+1}/${songs.length}] NO MATCH ${song.artist} - ${song.title} (${searchResults.length} results, first: ${searchResults[0]?.trackName})`);
      continue;
    }

    let syncedLyrics = best.syncedLyrics;

    // If search result had no synced lyrics but has an ID, fetch full data
    if (!syncedLyrics && best.id) {
      await sleep(400);
      const fullUrl = `https://lrclib.net/api/get/${best.id}`;
      const full = await httpGet(fullUrl);
      if (full && full.syncedLyrics) {
        syncedLyrics = full.syncedLyrics;
      }
    }

    if (syncedLyrics) {
      const lines = syncedLyrics.split('\n').filter(l => l.trim() && /\[.*\]/.test(l)).length;
      results[vid] = {
        id: song.id, title: song.title, artist: song.artist, videoId: vid,
        syncedLyrics, plainLyrics: best.plainLyrics || '',
        lrcId: best.id, trackName: best.trackName, artistName: best.artistName
      };
      newFound++;
      console.log(`  [${i+1}/${songs.length}] FOUND ${song.artist} - ${song.title}: ${lines} lines`);
    } else {
      results[vid] = { found: false, searched: query };
      console.log(`  [${i+1}/${songs.length}] MISS ${song.artist} - ${song.title} (no synced lyrics)`);
    }

    if ((i + 1) % 10 === 0) {
      fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
      const found = Object.values(results).filter(v => v && v.syncedLyrics).length;
      console.log(`  [save] ${i+1}/${songs.length}: ${found} found`);
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
  const found = Object.values(results).filter(v => v && v.syncedLyrics).length;
  console.log(`\nDone: ${found}/${songs.length} found on LRCLIB v2`);
  console.log(`Saved to ${OUT}`);
}
main().catch(console.error);
