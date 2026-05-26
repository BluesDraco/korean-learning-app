import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DICT_DIR = join(process.cwd(), 'data/dict');
const OUT_FILE = join(process.cwd(), 'data/krdict-compact.json');

// Recursively extract all text from structured-content nodes, flattening tags
function extractText(node, lang = null) {
  if (typeof node === 'string') return node;
  if (!node) return '';

  // Filter by language if specified
  if (lang && node.lang && node.lang !== lang) return '';

  if (node.content) {
    if (Array.isArray(node.content)) {
      return node.content.map(c => extractText(c, lang)).join('');
    }
    return extractText(node.content, lang);
  }
  return '';
}

// Extract Chinese definitions (sense number + translation)
function extractChineseDefs(defBlocks) {
  if (!Array.isArray(defBlocks)) return [];

  const results = [];
  for (const block of defBlocks) {
    if (block.type !== 'structured-content') continue;
    // Get all zh-lang text
    const zhText = extractText(block, 'zh').trim();
    // Get all ko-lang text (the Korean word/pattern)
    const koText = extractText(block, 'ko').trim();

    if (zhText || koText) {
      // Split Chinese text into individual senses
      const parts = zhText.split(/(?=\d+\.\s*)/);
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed) {
          results.push({ zh: trimmed, ko: koText });
        }
      }
    }
  }

  // If no structured breakdown, try full text extraction
  if (results.length === 0) {
    const fullZh = defBlocks.map(b => extractText(b, 'zh')).join('; ').trim();
    const fullKo = defBlocks.map(b => extractText(b, 'ko')).join(' ').trim();
    if (fullZh) results.push({ zh: fullZh, ko: fullKo });
  }

  return results;
}

// Extract Korean definitions (monolingual explanations)
function extractKoreanDefs(defBlocks) {
  if (!Array.isArray(defBlocks)) return '';
  // Get text without explicit lang tag (usually Korean explanations)
  function extractNoLang(node) {
    if (typeof node === 'string') return '';
    if (!node) return '';
    if (node.lang === 'zh') return ''; // skip Chinese
    if (node.content) {
      if (Array.isArray(node.content)) {
        return node.content.map(c => {
          if (typeof c === 'string') return '';
          if (c.lang === 'zh') return '';
          return extractNoLang(c);
        }).join(' ').trim();
      }
      return extractNoLang(node.content);
    }
    return '';
  }

  const parts = defBlocks.map(b => extractNoLang(b)).filter(Boolean);
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

// Extract sentence patterns
function extractPatterns(defBlocks) {
  const patterns = [];
  function findPatternNodes(node) {
    if (!node || typeof node === 'string') return;
    if (node.content === '句型' || node.content === '문형') {
      // The next sibling might have the pattern
      return;
    }
    if (node.style?.backgroundColor === '#666666') {
      // This is a pattern label, get parent's next content
      return;
    }
    if (Array.isArray(node.content)) {
      node.content.forEach(findPatternNodes);
    }
  }
  // Actually patterns are ko text within specific divs
  defBlocks.forEach(b => {
    if (b.type !== 'structured-content') return;
    const fullText = extractText(b);
    // Match pattern format: "1이 칙칙하다"
    const matches = fullText.match(/\d+[이가은는를과와의]\s+\S+/g);
    if (matches) patterns.push(...matches);
  });
  return [...new Set(patterns)];
}

// Main conversion
function parseEntry(entry) {
  const [word, reading, posChinese, posExtra, score, defBlocks] = entry;

  // Extract hanja from word if present, e.g., "친- 〔親〕"
  let hanja = '';
  let cleanWord = word;
  const hanjaMatch = word.match(/〔(.+?)〕/);
  if (hanjaMatch) {
    hanja = hanjaMatch[1];
    cleanWord = word.replace(/\s*〔.+?〕/, '').trim();
  }

  const chineseDefs = extractChineseDefs(defBlocks);
  const koreanDef = extractKoreanDefs(defBlocks);
  const patterns = extractPatterns(defBlocks);

  // Clean up Chinese definitions: separate sense number from translation
  const meanings = chineseDefs.map(d => {
    let sense = '';
    let zh = d.zh;
    const senseMatch = zh.match(/^(\d+)\.\s*/);
    if (senseMatch) {
      sense = senseMatch[1];
      zh = zh.slice(senseMatch[0].length);
    }
    return { sense, zh, ko: d.ko };
  });

  // Build clean definition text
  const definitionZh = meanings.map(m => (m.sense ? `${m.sense}. ` : '') + m.zh).join('; ');

  return {
    w: cleanWord,           // Korean word (key for search)
    h: hanja,               // Hanja
    p: posChinese,          // Part of speech (Chinese)
    d: definitionZh,        // Chinese definition
    kd: koreanDef || '',    // Korean definition
    m: meanings,            // Structured meanings [{sense, zh, ko}]
    pt: patterns,           // Sentence patterns
  };
}

// ── Main ──

console.log('Reading term_bank files from', DICT_DIR);

const files = readdirSync(DICT_DIR)
  .filter(f => f.startsWith('term_bank_') && f.endsWith('.json'))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });

console.log(`Found ${files.length} term_bank files`);

let totalEntries = 0;
const allWords = [];
const wordMap = new Map(); // dedup by word

for (const file of files) {
  const filePath = join(DICT_DIR, file);
  console.log(`  Processing ${file}...`);
  const data = JSON.parse(readFileSync(filePath, 'utf8'));

  for (const entry of data) {
    const parsed = parseEntry(entry);
    if (!parsed.w || parsed.w.length < 1) continue;

    // Dedup: merge if same word
    const existing = wordMap.get(parsed.w);
    if (existing) {
      // Merge meanings
      const existingSenses = new Set(existing.m.map(m => m.zh));
      for (const m of parsed.m) {
        if (!existingSenses.has(m.zh)) {
          existing.m.push(m);
          existingSenses.add(m.zh);
        }
      }
      // Rebuild d from merged meanings
      existing.d = existing.m.map(m => (m.sense ? `${m.sense}. ` : '') + m.zh).join('; ');
      // Merge patterns
      for (const p of parsed.pt) {
        if (!existing.pt.includes(p)) existing.pt.push(p);
      }
    } else {
      wordMap.set(parsed.w, parsed);
      allWords.push(parsed);
    }
  }
  totalEntries += data.length;
}

console.log(`Total raw entries: ${totalEntries}`);
console.log(`Deduplicated entries: ${allWords.length}`);

// Sort alphabetically (Korean order)
allWords.sort((a, b) => a.w.localeCompare(b.w, 'ko'));

// Build the dictionary structure
const dictionary = {
  meta: {
    source: 'KRDICT (국립국어원 한국어기초사전)',
    language: 'ko-zh',
    license: 'CC BY-SA 2.0 KR',
    buildDate: new Date().toISOString(),
    totalEntries: allWords.length,
  },
  // Index by initial consonant for fast browsing
  index: {},
  words: allWords,
};

// Build initial consonant index
for (let i = 0; i < allWords.length; i++) {
  const initial = allWords[i].w.charCodeAt(0);
  const rangeStart = String.fromCharCode(initial);
  // Group by Unicode block: 가(AC00)~깋, 나~닣, etc.
  const blockIndex = Math.floor((initial - 0xAC00) / 588); // 0-18 for modern Korean
  const blockChar = String.fromCharCode(0xAC00 + blockIndex * 588);
  if (!dictionary.index[blockChar]) {
    dictionary.index[blockChar] = i; // start index in the words array
  }
}

// Write compact JSON
console.log(`Writing ${OUT_FILE}...`);
writeFileSync(OUT_FILE, JSON.stringify(dictionary));
console.log(`Done! File size: ${(dictionary.words.length).toLocaleString()} entries`);
console.log(`Index: ${Object.keys(dictionary.index).length} consonant groups`);

// Also write a stats summary
const posCounts = {};
for (const w of allWords) {
  const pos = w.p || '未知';
  posCounts[pos] = (posCounts[pos] || 0) + 1;
}
console.log('\nPart of speech distribution:');
Object.entries(posCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([pos, count]) => console.log(`  ${pos}: ${count}`));
