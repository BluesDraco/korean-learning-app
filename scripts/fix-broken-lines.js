// Fix multi-line _(...) calls caused by newlines in translations
const fs = require('fs');
const path = require('path');

const KPOP_FILE = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');

let content = fs.readFileSync(KPOP_FILE, 'utf8');

// Find _(...) calls that span multiple lines due to newlines in Chinese translations
// Pattern: _(... , 'text\nnext line')
// We need to collapse these back to single lines

// Strategy: join lines where a _( call's closing ') is on a different line
const lines = content.split('\n');
const fixed = [];
let i = 0;
let fixedCount = 0;

while (i < lines.length) {
  let line = lines[i];

  // Check if this line has an unterminated _(...) call
  // An unterminated line would be one that starts with _( or has _( but doesn't end with ');
  // Actually easier: check if next line looks like a continuation (no leading whitespace for a new statement)

  // More precise: if current line has _(... but doesn't end with ') or ''),
  // and next line doesn't start with whitespace+_( or whitespace+L( etc.
  const hasUnterminated =
    (line.includes('_(') || line.includes(', \'')) &&
    !line.match(/,\s*'[^']*'\s*\)\s*,?\s*$/) &&
    !line.match(/,\s*""\s*\)\s*,?\s*$/) &&
    !line.trim().startsWith('//');

  if (hasUnterminated && i + 1 < lines.length) {
    const nextLine = lines[i + 1];
    // If next line is a continuation (just the rest of translation text)
    // not a new statement like _(, L(, id:, etc.
    const isContinuation =
      nextLine.trim() &&
      !nextLine.trim().match(/^(_\(|L\(|id:|title:|artist:|videoId:|thumbnail:|level:|color:|tags:|lyricsKind:|lyrics:|section:|learning:|\)|}|\]|const |import |export )/);

    if (isContinuation) {
      // Merge: current line + next line content (removing leading whitespace from next line)
      const merged = line.trimEnd() + ' ' + nextLine.trim();
      fixed.push(merged);
      fixedCount++;
      i += 2;
      continue;
    }
  }

  fixed.push(line);
  i++;
}

content = fixed.join('\n');
fs.writeFileSync(KPOP_FILE, content, 'utf8');
console.log(`Fixed ${fixedCount} multi-line entries`);
