// Fetch Korean lyrics from colorcodedlyrics.com + LRCLIB timestamps
// Run on server: node scripts/fetch-lyrics.mjs
import romanizePkg from '@romanize/korean';
const { romanize } = romanizePkg;
import { writeFileSync, readFileSync, existsSync } from 'fs';

const COS_SONGS = [
  'IHNzOHi8sJs','2S24-y0Ij3Y','gQlMMD8auMs','POe9SOEKotk','dyRsYk0LyA8',
  'bwmSjveL3Lc','9pdj4iJD08s','gdZLi9oWNZg','WMweEpGlu_U','CuklIb9d3fI',
  'XsX3ATc3FbA','MBdVXkSdhwU','7C2z4GqqS5E','pBuZEGYXA6E','0lapF4DQPKQ',
  'js1CtxSY38I','pSUydWEqKwE','_ZAgIHmHLdc','ArmDp-zijuc','ZeerrnuLi5E',
  'WPdWvnAAurg','dYRITmpFbJ4','D8VEhcPeSlc','f5_wn8mexmM','kOHB85vDuow',
  'UBURTj20HXI','Jh4QFaPmdss','7HDeem-JaSY','z3szNvgQxHo','D1PvIWdJ8xo',
  'v7bnOxV4jAc','WyiIGEHQP8o','J_CFBjAyPWE','c9RzZpV460k','fE2h3lGlOsk',
  'pNfTK39k55U','Hbb5GPxXF1w','MjCZfZfucEc','EaswWiwMVs8','jYSlpC6Ud2A',
  'X-uJtV8ScYk','gRnuFC4Ualw','J-wFp43XOrA','8dJyRm2jJ-U','zuoSn3ObMz4',
];

// Song metadata map
const kpopData = readFileSync('src/data/kpopSongs.ts', 'utf8');
const songMeta = {};
const songRegex = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)',[^}]*?videoId:\s*'([^']+)'/gs;
let m;
while ((m = songRegex.exec(kpopData)) !== null) {
  songMeta[m[4]] = { id: m[1], title: m[2], artist: m[3], videoId: m[4] };
}

async function searchCCL(artist, title) {
  const query = encodeURIComponent(`${artist} ${title}`);
  try {
    const res = await fetch(`https://colorcodedlyrics.com/?s=${query}`, { signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const matches = [...html.matchAll(/https:\/\/colorcodedlyrics\.com\/\d{4}\/\d{2}\/\d{2}\/([^/"']+)/g)];
    for (const match of matches) {
      if (!match[1].includes('japanese')) return match[0];
    }
    return matches[0]?.[0] ?? null;
  } catch (e) {
    return null;
  }
}

async function fetchKoreanLyrics(pageUrl) {
  try {
    const res = await fetch(pageUrl, { signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const lines = [];
    const spanRegex = /<span[^>]*>([가-힣][^<]*)<\/span>/g;
    let match;
    while ((match = spanRegex.exec(html)) !== null) {
      const text = match[1].trim();
      if (text && /[가-힣]/.test(text)) lines.push(text);
    }
    return lines;
  } catch (e) {
    return [];
  }
}

async function fetchLRCLIB(artist, title) {
  try {
    const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}&duration=210`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function parseLRCTimestamps(syncedLyrics) {
  const result = [];
  const timeRegex = /\[(\d+):(\d+)\.(\d+)\]/;
  for (const line of syncedLyrics.split('\n')) {
    const match = line.match(timeRegex);
    if (match) {
      const text = line.replace(timeRegex, '').trim();
      if (text) result.push({ start: parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100, text });
    }
  }
  return result;
}

async function processSong(videoId) {
  const meta = songMeta[videoId];
  if (!meta) return null;
  console.log(`\n${meta.artist} - ${meta.title}`);

  const url = await searchCCL(meta.artist, meta.title);
  if (!url) { console.log(`  Not found on CCL`); return null; }
  console.log(`  ${url}`);

  const koLines = await fetchKoreanLyrics(url);
  if (koLines.length === 0) { console.log(`  No Korean text`); return null; }
  console.log(`  ${koLines.length} Korean lines`);

  const lrc = await fetchLRCLIB(meta.artist, meta.title);
  let timestamps = [];
  if (lrc?.syncedLyrics) {
    timestamps = parseLRCTimestamps(lrc.syncedLyrics);
    console.log(`  ${timestamps.length} LRC timestamps`);
  }

  const lyrics = koLines.map((ko, i) => {
    const ts = timestamps[i];
    return { korean: ko, pronunciation: romanize(ko), chinese: '', start: ts?.start ?? (i * 5), end: timestamps[i + 1]?.start ?? ((i + 1) * 5) };
  });

  return { id: meta.id, videoId, title: meta.title, artist: meta.artist, lyrics, cclUrl: url };
}

async function main() {
  const results = {};
  const outFile = 'scripts/lyrics-output.json';
  if (existsSync(outFile)) Object.assign(results, JSON.parse(readFileSync(outFile, 'utf8')));

  for (const vid of COS_SONGS) {
    if (results[vid]) { console.log(`\nSKIP ${vid}: done`); continue; }
    try {
      const data = await processSong(vid);
      if (data) { results[vid] = data; writeFileSync(outFile, JSON.stringify(results, null, 2)); }
    } catch (e) { console.error(`  ERROR: ${e.message}`); }
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`\nDone: ${Object.keys(results).length}/${COS_SONGS.length}`);
}

main().catch(console.error);
