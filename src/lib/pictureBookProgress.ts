import { db, ensureFavoritesBook } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';

const KEY = 'pb_progress';

export interface PBProgress {
  [k: string]: unknown;
  page: number;
  completed: boolean;
  updatedAt: number;
}

type PBMap = Record<string, PBProgress>;

function readMap(): PBMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PBMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: PBMap) {
  try { localStorage.setItem(KEY, JSON.stringify(map)); } catch { /* ignore */ }
}

export function getAllProgress(): PBMap {
  return readMap();
}

export function getProgress(bookId: string): PBProgress | null {
  return readMap()[bookId] ?? null;
}

export function savePage(bookId: string, page: number) {
  const map = readMap();
  const prev = map[bookId];
  map[bookId] = { page, completed: prev?.completed ?? false, updatedAt: Date.now() };
  writeMap(map);
}

export function markComplete(bookId: string) {
  const map = readMap();
  const prev = map[bookId];
  map[bookId] = { page: prev?.page ?? 0, completed: true, updatedAt: Date.now() };
  writeMap(map);
}

const CHINESE_PREF_KEY = 'pb_show_chinese';
export function getChinesePref(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(CHINESE_PREF_KEY) === '1'; } catch { return false; }
}
export function setChinesePref(v: boolean) {
  try { localStorage.setItem(CHINESE_PREF_KEY, v ? '1' : '0'); } catch { /* ignore */ }
}

// 存单词到收藏夹词本，复用文章阅读同款 schema。返回是否新存入。
export async function saveVocabWord(word: string, meaning: string, bookTitle: string): Promise<void> {
  const clean = stripParticle(word);
  let wordId: string;
  const exists = await db.words.where('word').equals(clean).first();
  if (!exists) {
    wordId = crypto.randomUUID();
    await db.words.put({
      id: wordId, word: clean,
      pronunciation: '', meaning,
      partOfSpeech: '单词', partOfSpeechEn: 'Word', examples: [], source: 'reading',
      sourceDetail: bookTitle, mastery: 'new', srsLevel: 0,
      easeFactor: 2.5, interval: 0, nextReview: Date.now(),
      correctCount: 0, wrongCount: 0, createdAt: Date.now(), lastReviewed: null,
    });
  } else {
    wordId = exists.id;
  }
  const bookId = await ensureFavoritesBook();
  const book = await db.wordBooks.get(bookId);
  if (book && !book.wordIds.includes(wordId)) {
    await db.wordBooks.update(bookId, { wordIds: [...book.wordIds, wordId], updatedAt: Date.now() });
  }
}

// 批量存词：word 行去重创建可并发（各写各行无竞态），
// 但 wordBook 的 wordIds append 必须单次读改写，否则并发会互相覆盖丢词。
export async function saveVocabWords(
  vocab: { word: string; meaning: string }[],
  bookTitle: string,
): Promise<void> {
  const ids = await Promise.all(
    vocab.map(async (v) => {
      const clean = stripParticle(v.word);
      const exists = await db.words.where('word').equals(clean).first();
      if (exists) return exists.id;
      const wordId = crypto.randomUUID();
      await db.words.put({
        id: wordId, word: clean,
        pronunciation: '', meaning: v.meaning,
        partOfSpeech: '单词', partOfSpeechEn: 'Word', examples: [], source: 'reading',
        sourceDetail: bookTitle, mastery: 'new', srsLevel: 0,
        easeFactor: 2.5, interval: 0, nextReview: Date.now(),
        correctCount: 0, wrongCount: 0, createdAt: Date.now(), lastReviewed: null,
      });
      return wordId;
    }),
  );
  const bookId = await ensureFavoritesBook();
  const book = await db.wordBooks.get(bookId);
  if (!book) return;
  const merged = [...book.wordIds];
  for (const id of ids) if (!merged.includes(id)) merged.push(id);
  if (merged.length !== book.wordIds.length) {
    await db.wordBooks.update(bookId, { wordIds: merged, updatedAt: Date.now() });
  }
}
