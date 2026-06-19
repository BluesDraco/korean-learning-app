import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('../src/data/yonsei-books.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
let content = readFileSync(filePath, 'utf-8');

// Add examples: [] to every word object that doesn't have it
// Match: partOfSpeech: '' } and add examples: [] before the closing }
content = content.replace(
  /(\{ word: "[^"]+", pronunciation: "[^"]+", meaning: "[^"]+", partOfSpeech: '[^']*' \})/g,
  (match) => match.slice(0, -1) + ", examples: [] }"
);

writeFileSync(filePath, content, 'utf-8');
console.log('Done: added examples: [] to all words');
