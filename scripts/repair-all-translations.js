// Comprehensive repair: re-read all lyrics, apply clean translations
const fs = require('fs');
const path = require('path');

const KPOP_FILE = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');
const CACHE_FILE = path.join(__dirname, 'translations_cache.json');

// Load clean translations cache
const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

// Read entire file as a single string, normalize newlines
let content = fs.readFileSync(KPOP_FILE, 'utf8');

// First pass: collapse multi-line _(...) calls
// Find all lines that are part of broken _(...) and join them
// We do this by finding lines that look like they're inside a string literal

const lines = content.split('\n');
const output = [];
let buffer = '';
let inBrokenStr = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  if (inBrokenStr) {
    // We're continuing a broken line
    buffer += ' ' + trimmed;
    // Check if this line closes the string
    if (trimmed.endsWith("')") || trimmed.endsWith("'),") || trimmed.match(/'[^']*'\s*\)/)) {
      output.push(buffer);
      buffer = '';
      inBrokenStr = false;
    }
    continue;
  }

  // Check if this line starts or contains a potential break
  // A line is "broken" if it has _(... and doesn't properly close with ')
  const hasLyricStart = /[_(]\(t\(\d+/.test(line);
  if (hasLyricStart) {
    // Count single quotes
    const singleQuotes = (line.match(/'/g) || []).length;
    // Normal _(...) lines have exactly 2 single quotes (opening and closing '')
    // Lines with translations have 'chinese text'
    // If the last single quote doesn't have a matching close before end of line
    // Check: does the line end with ') or '), or similar?
    const endsClean = /'\s*\)\s*,?\s*$/.test(line.trimEnd());
    if (!endsClean) {
      buffer = line;
      inBrokenStr = true;
      continue;
    }
  }

  output.push(line);
}

if (buffer) {
  output.push(buffer); // shouldn't happen but be safe
}

content = output.join('\n');

console.log(`Collapsed ${lines.length - output.length} broken lines`);

// Now replace all _() calls with clean translations
// Pattern: _(times, "korean", "romanized", 'possibly broken chinese')
// We extract the korean text, look it up in cache, and rebuild

const lyricRegex = /(_\(t\(\d+,[\d.]+\)(?:,\s*t\(\d+,[\d.]+\))?),\s*"([^"]*)",\s*"([^"]*)",\s*'([^']*)'\)/g;

let replaced = 0;
let errors = 0;

content = content.replace(lyricRegex, (match, prefix, korean, romanized, chinese) => {
  // Look up clean translation
  let zh = '';
  if (/[가-힣]/.test(korean)) {
    zh = cache[korean] || '';
    if (!zh) {
      // Try to find a close match
      for (const [key, val] of Object.entries(cache)) {
        if (key.trim() === korean.trim()) {
          zh = val;
          break;
        }
      }
    }
  }

  if (zh && zh.trim()) {
    // Clean the translation: remove newlines, remove SEP artifacts
    zh = zh.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    zh = zh.replace(/---SEP---|---SPE---/g, '');
    zh = zh.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

    if (zh && zh !== chinese) {
      replaced++;
    }
    return `${prefix}, "${korean}", "${romanized}", '${zh}')`;
  } else {
    // English or untranslated - keep empty
    return `${prefix}, "${korean}", "${romanized}", '')`;
  }
});

fs.writeFileSync(KPOP_FILE, content, 'utf8');
console.log(`Replaced ${replaced} translations`);
console.log(`Errors: ${errors}`);
console.log('Done');
