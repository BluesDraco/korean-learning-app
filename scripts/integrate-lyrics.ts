// Integrates extracted Korean lyrics into kpopSongs.ts with romanization
// Run: npx tsx scripts/integrate-lyrics.ts
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import romanizePkg from '@romanize/korean';

const { romanize } = romanizePkg;

const LYRICS_DIR = './scripts/lyrics';
const KPOP_SONGS_FILE = './src/data/kpopSongs.ts';

interface LyricLine {
  korean: string;
  pronunciation: string;
  chinese: string;
  start: number;
  end: number;
}

// Read extracted lyrics
const files = readdirSync(LYRICS_DIR).filter(f => f.endsWith('_ko.txt'));
console.log(`Found ${files.length} lyric files`);

const lyricsData: Record<string, string[]> = {};
for (const file of files) {
  const vid = file.replace('_ko.txt', '');
  const lines = readFileSync(join(LYRICS_DIR, file), 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && /[가-힣]/.test(l));
  if (lines.length > 0) {
    lyricsData[vid] = lines;
  }
}

console.log(`Loaded lyrics for ${Object.keys(lyricsData).length} songs`);

// Read kpopSongs.ts
let data = readFileSync(KPOP_SONGS_FILE, 'utf8');

// For each song with lyrics, replace the empty lyrics array with actual lyrics
let updated = 0;
for (const [vid, lines] of Object.entries(lyricsData)) {
  // Build the lyrics array string
  const lyricLines: LyricLine[] = lines.map((ko, i) => ({
    korean: ko,
    pronunciation: romanize(ko),
    chinese: '',
    start: i * 5,
    end: (i + 1) * 5,
  }));

  const lyricsJson = JSON.stringify(lyricLines, null, 6)
    .replace(/^\[/, '[\n      ')
    .replace(/\]$/, ',\n    ]');

  // Find the song entry and replace lyricsKind + lyrics
  const searchPattern = new RegExp(
    `(videoId: '${vid}'[^,]*,\\s*thumbnail:[^,]*,\\s*level:[^,]*,\\s*color:[^,]*,\\s*tags:[^\\}]*?)lyricsKind:\\s*'highlight',\\s*lyrics:\\s*\\[\\s*\\]`,
    's'
  );

  if (searchPattern.test(data)) {
    data = data.replace(
      searchPattern,
      `$1lyricsKind: 'full' as const,\n    lyrics: ${lyricsJson}`
    );
    updated++;
    console.log(`  Updated: ${vid} (${lines.length} lines)`);
  } else {
    console.log(`  SKIP ${vid}: pattern not matched`);
  }
}

if (updated > 0) {
  writeFileSync(KPOP_SONGS_FILE, data, 'utf8');
  console.log(`\nUpdated ${updated} songs in ${KPOP_SONGS_FILE}`);
} else {
  console.log('\nNo songs updated');
}
