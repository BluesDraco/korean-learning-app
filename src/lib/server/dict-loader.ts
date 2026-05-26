import { readFileSync } from 'fs';
import { join } from 'path';

interface DictMeaning {
  sense: string;
  zh: string;
  ko: string;
}

interface DictEntry {
  w: string;
  h: string;
  p: string;
  d: string;
  kd: string;
  m: DictMeaning[];
  pt: string[];
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
  m: DictMeaning[];
  pt: string[];
}

function scoreEntry(entry: DictEntry, q: string): number {
  let score = 0;
  let matched = false;

  if (entry.w === q) {
    score += 1000; matched = true;
  } else if (entry.w.startsWith(q)) {
    score += 500; matched = true;
  } else if (entry.w.includes(q)) {
    score += 200; matched = true;
  }

  if (entry.d.includes(q)) { score += 60; matched = true; }
  if (entry.h && entry.h.includes(q)) { score += 30; matched = true; }

  if (!matched) return 0;

  // Boost by frequency rating (each ⭐ = +10)
  const stars = (entry.p?.match(/⭐/g) || []).length;
  score += stars * 10;

  // Slight boost for shorter words
  if (entry.w.length <= q.length + 2) score += 5;

  return score;
}

export function searchDictionary(query: string, limit = 20, offset = 0): {
  results: DictSearchResult[];
  total: number;
} {
  const dict = loadDictionary();
  const q = query.toLowerCase().trim();

  if (!q) return { results: [], total: 0 };

  const scored: { entry: DictEntry; score: number }[] = [];

  for (const entry of dict.words) {
    const s = scoreEntry(entry, q);
    if (s > 0) {
      scored.push({ entry, score: s });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const total = scored.length;
  const results = scored.slice(offset, offset + limit).map(({ entry }) => ({
    w: entry.w,
    h: entry.h,
    p: entry.p,
    d: entry.d.slice(0, 300),
    m: entry.m.slice(0, 5),
    pt: entry.pt || [],
  }));

  return { results, total };
}

export function getWordEntry(word: string): DictEntry | null {
  const dict = loadDictionary();
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
