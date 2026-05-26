import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Converter } from 'opencc-js';

const DICT_DIR = join(process.cwd(), 'data/dict');
const OUT_FILE = join(process.cwd(), 'data/krdict-compact.json');

// Traditional Chinese → Simplified Chinese converter
const t2s = Converter({ from: 'tw', to: 'cn' });
const toSimplified = (text) => {
  if (!text) return text;
  return t2s(text);
};

// Recursively extract all text from structured-content nodes, flattening tags
function extractText(node, lang = null) {
  if (typeof node === 'string') return node;
  if (!node) return '';

  if (lang && node.lang && node.lang !== lang) return '';

  if (node.content) {
    if (Array.isArray(node.content)) {
      return node.content.map(c => extractText(c, lang)).join('');
    }
    return extractText(node.content, lang);
  }
  return '';
}

// Check if a node is a sentence-pattern label (gray background badge "句型")
function isPatternNode(node) {
  if (!node || typeof node === 'string') return false;
  if (node.style?.backgroundColor === '#666666') return true;
  return false;
}

// Extract Chinese definitions by walking the structured DOM
function extractChineseDefs(defBlocks) {
  if (!Array.isArray(defBlocks)) return [];

  const results = [];

  for (const block of defBlocks) {
    if (block.type !== 'structured-content' || !block.content) continue;

    const children = Array.isArray(block.content) ? block.content : [block.content];

    for (const child of children) {
      if (!child || typeof child === 'string') continue;
      if (child.lang === 'ko') continue;       // skip homonym header (e.g. "가다¹")
      if (child.tag !== 'div') continue;       // only process sense divs

      const parts = Array.isArray(child.content) ? child.content : [child.content];

      let senseNum = '';
      let senseLabel = '';
      let senseDef = '';

      for (const part of parts) {
        if (!part || typeof part === 'string') continue;
        if (isPatternNode(part)) continue;     // skip "句型" badge

        if (part.lang === 'zh') {
          const text = extractText(part).trim();
          if (!text) continue;

          // Sense header like "1. 去" or "1. 去，开往，飞向"
          const headerMatch = text.match(/^(\d+)\.\s*(.*)/);
          if (headerMatch) {
            if (senseLabel || senseDef) {
              let zh;
              if (senseLabel && senseDef) zh = (senseNum ? senseNum + '. ' : '') + senseLabel + '：' + senseDef;
              else zh = senseLabel || senseDef;
              results.push({ zh: zh.replace(/。$/,'').trim(), ko: extractText(child, 'ko').trim() });
            }
            senseNum = headerMatch[1];
            senseLabel = headerMatch[2];
            senseDef = '';
          } else {
            // Definition body — accumulate
            senseDef = (senseDef ? senseDef : '') + text;
          }
        }
      }

      if (senseLabel || senseDef) {
        let zh;
        if (senseLabel && senseDef) {
          zh = (senseNum ? senseNum + '. ' : '') + senseLabel + '：' + senseDef;
        } else if (senseLabel) {
          zh = (senseNum ? senseNum + '. ' : '') + senseLabel;
        } else {
          zh = senseDef;
        }
        // Clean punctuation
        zh = zh.replace(/。$/,'').trim();
        results.push({ zh, ko: extractText(child, 'ko').trim() });
      }
    }
  }

  // Fallback for simple entries without structured divs
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

// Main conversion. Returns null for entries that should be skipped.
function parseEntry(entry) {
  const [word, reading, posChinese, posExtra, score, defBlocks] = entry;

  // ── Filters: skip non-word entries ──

  // Multi-word phrases/idioms (e.g. "벌집 쑤시어 놓은 것 같다")
  if (word.includes(' ')) return null;

  // English/mixed-script entries (e.g. "←air conditioner", "세제곱centimeter", "高速bus")
  if (/[a-zA-Z]/.test(word)) return null;

  // Entries with ← marker (mixed script, e.g. "高層←apartment")
  if (word.includes('←')) return null;

  // Hanja variant notation (e.g. "模倣/摸倣/摹倣하다")
  if (word.includes('/')) return null;

  // Conjugation reference entries (null POS + arrow pointing to base form)
  // We check after extracting definitions
  const isConjugationRef = !posChinese;

  // Extract hanja from word if present, e.g., "친- 〔親〕"
  let hanja = '';
  let cleanWord = word;
  const hanjaMatch = word.match(/〔(.+?)〕/);
  if (hanjaMatch) {
    hanja = hanjaMatch[1];
    cleanWord = word.replace(/\s*〔.+?〕/, '').trim();
  }

  // Strip leftover ←/▼ markers from the headword
  cleanWord = cleanWord.replace(/^[▼←]+/, '');

  // Pure Hanja entries — no Hangul characters (e.g. "價格", "假")
  if (!/[가-힣]/.test(cleanWord)) return null;

  // Mixed Hanja+Hangul entries (e.g. "去頭截尾하다", "加工하다")
  if (/[一-鿿]/.test(cleanWord)) return null;

  const chineseDefs = extractChineseDefs(defBlocks);
  const koreanDef = extractKoreanDefs(defBlocks);
  const patterns = extractPatterns(defBlocks);

  // Clean up Chinese definitions: separate sense number from translation, convert to Simplified
  const meanings = chineseDefs.map(d => {
    let sense = '';
    let zh = toSimplified(d.zh);
    const senseMatch = zh.match(/^(\d+)\.\s*/);
    if (senseMatch) {
      sense = senseMatch[1];
      zh = zh.slice(senseMatch[0].length);
    }
    return { sense, zh, ko: d.ko };
  });

  // Build clean definition text
  const definitionZh = toSimplified(meanings.map(m => (m.sense ? `${m.sense}. ` : '') + m.zh).join('; '));

  // Filter: conjugation references (null POS + arrow in definition)
  if (isConjugationRef && definitionZh.includes('→')) return null;

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
let filteredEntries = 0;
const allWords = [];
const wordMap = new Map(); // dedup by word

for (const file of files) {
  const filePath = join(DICT_DIR, file);
  console.log(`  Processing ${file}...`);
  const data = JSON.parse(readFileSync(filePath, 'utf8'));

  for (const entry of data) {
    const parsed = parseEntry(entry);
    if (!parsed) { filteredEntries++; continue; }
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
console.log(`Filtered out (non-words): ${filteredEntries}`);
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
