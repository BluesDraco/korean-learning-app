import { readFileSync } from 'fs';
import { join } from 'path';

interface DictMeaning {
  sense: string;
  zh: string;
  ko: string;
}

interface DictEntry {
  w: string;        // Korean word
  h: string;        // Hanja
  p: string;        // Part of speech (Chinese)
  d: string;        // Chinese definition
  kd: string;       // Korean definition
  m: DictMeaning[]; // Structured meanings
  pt: string[];     // Sentence patterns
}

interface DictData {
  meta: { source: string; language: string; license: string; buildDate: string; totalEntries: number };
  index: Record<string, number>;
  words: DictEntry[];
}

let cached: DictData | null = null;

export function loadDictionary(): DictData {
  if (cached) return cached;
  const filePath = join(process.cwd(), 'data', 'krdict-compact.json');
  const raw = readFileSync(filePath, 'utf8');
  cached = JSON.parse(raw);
  return cached!;
}

export interface DictSearchResult {
  w: string;
  h: string;
  p: string;
  d: string;
  pt: string[];
}

export function searchDictionary(query: string, limit = 20, offset = 0): {
  results: DictSearchResult[];
  total: number;
} {
  const dict = loadDictionary();
  const q = query.toLowerCase().trim();

  if (!q) return { results: [], total: 0 };

  const matches: DictSearchResult[] = [];

  for (const entry of dict.words) {
    if (
      entry.w.includes(q) ||
      entry.d.includes(q) ||
      (entry.h && entry.h.includes(q))
    ) {
      matches.push({
        w: entry.w,
        h: entry.h,
        p: entry.p,
        d: entry.d.slice(0, 300),
        pt: entry.pt || [],
      });
    }
  }

  const total = matches.length;
  const results = matches.slice(offset, offset + limit);
  return { results, total };
}

export function getWordEntry(word: string): DictEntry | null {
  const dict = loadDictionary();
  // Binary search or linear — with 85K entries sorted, binary is faster
  const words = dict.words;
  let lo = 0;
  let hi = words.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const cmp = words[mid].w.localeCompare(word, 'ko');
    if (cmp === 0) return words[mid];
    if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}
