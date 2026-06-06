// Integrate LRCLIB lyrics into kpopSongs.ts
// Run: node scripts/integrate-lrclib.js
const fs = require('fs');
const path = require('path');

const LYRICS_FILE = path.join(__dirname, 'lrclib_lyrics.json');
const KPOP_FILE = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const OUT_FILE = KPOP_FILE; // In-place

const lyricsData = JSON.parse(fs.readFileSync(LYRICS_FILE, 'utf8'));
let kpop = fs.readFileSync(KPOP_FILE, 'utf8');

// Parse LRC timestamps: [mm:ss.cc] text
function parseLRC(synced) {
  const lines = [];
  const re = /\[(\d+):(\d+)\.(\d+)\]\s*(.+)/;
  for (const line of synced.split('\n')) {
    const m = line.match(re);
    if (m) {
      lines.push({
        start: parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / 100,
        text: m[4].trim()
      });
    }
  }
  for (let i = 0; i < lines.length; i++) {
    lines[i].end = i + 1 < lines.length ? lines[i + 1].start : lines[i].start + 5;
  }
  return lines;
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(2);
  return `t(${m},${s})`;
}

// Sort videoIds by their position in the file so we process front-to-back
const videoIds = Object.keys(lyricsData).filter(vid => lyricsData[vid] && lyricsData[vid].syncedLyrics);
videoIds.sort((a, b) => kpop.indexOf(`videoId: '${a}'`) - kpop.indexOf(`videoId: '${b}'`));

console.log(`Processing ${videoIds.length} songs with LRCLIB lyrics...`);

let updated = 0;
for (const vid of videoIds) {
  const data = lyricsData[vid];
  if (!data || !data.syncedLyrics) continue;

  // Find this song's position in the file
  const vidPos = kpop.indexOf(`videoId: '${vid}'`);
  if (vidPos === -1) {
    console.log(`  SKIP ${vid}: videoId not found`);
    continue;
  }

  // Check if already has full lyrics
  const songStart = kpop.lastIndexOf('{', vidPos);
  const beforeSong = kpop.substring(songStart, vidPos);
  if (beforeSong.includes("lyricsKind: 'full'")) {
    console.log(`  SKIP ${vid}: already full (${data.artist} - ${data.title})`);
    continue;
  }

  // Build lyrics array
  const lrcLines = parseLRC(data.syncedLyrics);
  if (lrcLines.length === 0) continue;

  const lyricStrs = lrcLines.map((l, i) => {
    const txt = JSON.stringify(l.text);
    const comma = i < lrcLines.length - 1 ? ',' : '';
    return `      _(${fmtTime(l.start)}, ${fmtTime(l.end)}, ${txt}, ${txt}, '')${comma}`;
  });

  const lyricsBlock = '    lyrics: [\n' + lyricStrs.join('\n') + '\n    ],';

  // Find the exact old lyrics pattern for this song
  // Pattern: lyricsKind: 'highlight', lyrics: [] },
  const vidLineStart = kpop.lastIndexOf('\n', vidPos) + 1;
  const vidLineEnd = kpop.indexOf('\n', vidPos);
  const songLine = kpop.substring(vidLineStart, vidLineEnd === -1 ? undefined : vidLineEnd);

  const oldPattern = "lyricsKind: 'highlight', lyrics: [] },";
  const altPattern = "lyricsKind: 'highlight', lyrics: []},";

  let newLine;
  if (songLine.includes(oldPattern)) {
    newLine = songLine.replace(oldPattern, "lyricsKind: 'full' as const,");
  } else if (songLine.includes(altPattern)) {
    newLine = songLine.replace(altPattern, "lyricsKind: 'full' as const,");
  } else {
    console.log(`  SKIP ${vid}: no highlight pattern. Excerpt: ${songLine.substring(songLine.length-60)}`);
    continue;
  }

  // Add the closing brace + lyrics before the next line
  newLine = newLine + '\n' + lyricsBlock + '\n  },';

  // Replace the old line with the new content
  const before = kpop.substring(0, vidLineStart);
  const after = kpop.substring(vidLineEnd === -1 ? kpop.length : vidLineEnd);
  kpop = before + newLine + after;

  updated++;
  console.log(`  UPDATED ${vid}: ${data.artist} - ${data.title} (${lrcLines.length} lines)`);
}

// Write back
fs.writeFileSync(OUT_FILE, kpop, 'utf8');
console.log(`\nUpdated ${updated} songs in ${OUT_FILE}`);

// Quick sanity check
const fullCount = (kpop.match(/lyricsKind: 'full'/g) || []).length;
const highlightCount = (kpop.match(/lyricsKind: 'highlight'/g) || []).length;
console.log(`full=${fullCount} highlight=${highlightCount} total=${fullCount + highlightCount}`);
