import type { WordEntry, ThemePack, LevelWordList, Word } from '@/types';
import { vocabularyEntries } from './entries';
import { intermediateEntries } from './entries-intermediate';
import { advancedEntries } from './entries-advanced';
import { topikEntries } from './entries-topik';
import { topikNewEntries1a } from './entries-topik-new';
import { topikNewEntries1b } from './entries-topik-new-1b';
import { topikNewEntries1c } from './entries-topik-new-1c';
import { topikNewEntries1d } from './entries-topik-new-1d';
import { topikNewEntries2 } from './entries-topik-new-2';
import { topikNewEntries2b } from './entries-topik-new-2b';
import { topikNewEntries1e } from './entries-topik-1e';
import { topikNewEntries2c } from './entries-topik-2c';
import { topikNewEntries3 } from './entries-topik-3';
import { topikNewEntries4 } from './entries-topik-4';
import { topikNewEntries5 } from './entries-topik-5';
import { topikNewEntries6 } from './entries-topik-6';
import { topikNewEntries4b } from './entries-topik-4b';
import { topikNewEntries5b } from './entries-topik-5b';
import { topikNewEntries6b } from './entries-topik-6b';
import { topikNewEntries1f } from './entries-topik-1f';
import { topikNewEntries2d } from './entries-topik-2d';
import { topikNewEntries3b } from './entries-topik-3b';
import { topikNewEntries4c } from './entries-topik-4c';
import { topikNewEntries5c } from './entries-topik-5c';
import { topikNewEntries6c } from './entries-topik-6c';
import { topikNewEntries5d } from './entries-topik-5d';
import { topikNewEntries6d } from './entries-topik-6d';
import { topikTextbook1Entries } from './entries-topik-textbook-1';
import { topikTextbook2Entries } from './entries-topik-textbook-2';
import { topikTextbook3Entries } from './entries-topik-textbook-3';
import { topikTextbook4Entries } from './entries-topik-textbook-4';
import { topikTextbook5Entries } from './entries-topik-textbook-5';
import { topikTextbook6Entries } from './entries-topik-textbook-6';
import { themePacks } from './themes';
import { levelWordLists } from './levels';

// Merge all entry sources, deduplicate by korean text (topik entries take priority)
const _seen = new Set<string>();
const allEntries: WordEntry[] = [];
// Full id→entry map across ALL sources (including deduped-out entries) for fallback lookups
const allEntriesById = new Map<string, WordEntry>();
for (const e of [...topikEntries, ...topikNewEntries1a, ...topikNewEntries1b, ...topikNewEntries1c, ...topikNewEntries1d, ...topikNewEntries1e, ...topikNewEntries1f, ...topikNewEntries2, ...topikNewEntries2b, ...topikNewEntries2c, ...topikNewEntries2d, ...topikNewEntries3, ...topikNewEntries3b, ...topikNewEntries4, ...topikNewEntries4b, ...topikNewEntries4c, ...topikNewEntries5, ...topikNewEntries5b, ...topikNewEntries5c, ...topikNewEntries5d, ...topikNewEntries6, ...topikNewEntries6b, ...topikNewEntries6c, ...topikNewEntries6d, ...topikTextbook1Entries, ...topikTextbook2Entries, ...topikTextbook3Entries, ...topikTextbook4Entries, ...topikTextbook5Entries, ...topikTextbook6Entries, ...vocabularyEntries, ...intermediateEntries, ...advancedEntries]) {

  allEntriesById.set(e.id, e);
  if (!_seen.has(e.korean)) {
    _seen.add(e.korean);
    allEntries.push(e);
  }
}

// ── Entries ────────────────────────────────────────────────────

/** Get a single entry by ID. Checks deduped list first, then full source map (handles dedup ID changes). */
export function getEntry(id: string): WordEntry | undefined {
  return allEntriesById.get(id);
}

/** Get entry by Korean text — used to recover examples when sourceEntryId is missing */
export function getEntryByKorean(korean: string): WordEntry | undefined {
  return allEntries.find(e => e.korean === korean);
}

/** Get multiple entries by IDs */
export function getEntriesByIds(ids: string[]): WordEntry[] {
  return ids.map((id) => getEntry(id)).filter(Boolean) as WordEntry[];
}

/** Search entries by Korean text or Chinese meaning */
export function searchEntries(query: string): WordEntry[] {
  const q = query.toLowerCase();
  return allEntries.filter(
    (e) =>
      e.korean.includes(q) ||
      e.romanization.toLowerCase().includes(q) ||
      e.meanings.some((m) => m.chinese.includes(q))
  );
}

/** Get entries by emotion tag */
export function getEntriesByEmotion(emotion: string): WordEntry[] {
  return allEntries.filter((e) => e.emotionTags.includes(emotion));
}

/** Get entries by scene tag */
export function getEntriesByTag(tag: string): WordEntry[] {
  return allEntries.filter((e) => e.tags.includes(tag));
}

/** Get entries by TOPIK level */
export function getEntriesByLevel(level: number): WordEntry[] {
  return allEntries.filter((e) => parseInt(e.level) === level);
}

// ── Themes ─────────────────────────────────────────────────────

/** Get all theme packs */
export function getAllThemes(): ThemePack[] {
  return themePacks;
}

/** Get themes by category */
export function getThemesByCategory(category: string): ThemePack[] {
  return themePacks.filter((t) => t.category === category);
}

/** Get a single theme pack */
export function getTheme(id: string): ThemePack | undefined {
  return themePacks.find((t) => t.id === id);
}

/** Get all word entries for a theme pack */
export function getThemeWords(themeId: string): WordEntry[] {
  const theme = getTheme(themeId);
  if (!theme) return [];
  return getEntriesByIds(theme.wordIds);
}

/** Get all unique categories */
export function getThemeCategories(): string[] {
  return [...new Set(themePacks.map((t) => t.category))];
}

// ── Levels ─────────────────────────────────────────────────────

/** Get all level word lists (with dynamic counts from entries) */
export function getAllLevels(): LevelWordList[] {
  return levelWordLists.map((l) => ({
    ...l,
    totalCount: getEntriesByLevel(l.level).length,
  }));
}

/** Get a single level */
export function getLevel(level: number): LevelWordList | undefined {
  const list = levelWordLists.find((l) => l.level === level);
  if (!list) return undefined;
  return { ...list, totalCount: getEntriesByLevel(level).length };
}

/** Get all word entries for a TOPIK level (uses entry's own level field) */
export function getLevelWords(level: number): WordEntry[] {
  return getEntriesByLevel(level);
}

// ── Rich data for user Word ────────────────────────────────────

/** Enrich a user's Word with data from the unified WordEntry */
export function enrichWord(
  userWord: Word | null,
  entry?: WordEntry
): {
  word: string;
  pronunciation: string;
  meanings: { chinese: string; nuance: string; register: string }[];
  examples: { korean: string; chinese: string; scene: string }[];
  tags: string[];
  emotionTags: string[];
  level: string;
  frequency: number;
  emoji?: string;
  relatedWords: WordEntry[];
} | null {
  if (!userWord) return null;

  const e = entry || (userWord.sourceEntryId ? getEntry(userWord.sourceEntryId) : undefined);

  if (e) {
    return {
      word: e.korean,
      pronunciation: e.romanization,
      meanings: e.meanings,
      examples: e.examples.map((ex) => ({ korean: ex.korean, chinese: ex.chinese, scene: ex.scene })),
      tags: e.tags,
      emotionTags: e.emotionTags,
      level: e.level,
      frequency: e.frequency,
      emoji: e.emoji,
      relatedWords: getEntriesByIds(e.relatedWords),
    };
  }

  // Fallback: use basic Word data
  return {
    word: userWord.word,
    pronunciation: userWord.pronunciation,
    meanings: [{ chinese: userWord.meaning, nuance: '', register: '通用' }],
    examples: userWord.examples.map((ex) => ({ korean: ex.text, chinese: ex.translation, scene: '' })),
    tags: [],
    emotionTags: [],
    level: '',
    frequency: 1,
    emoji: '📖',
    relatedWords: [],
  };
}
