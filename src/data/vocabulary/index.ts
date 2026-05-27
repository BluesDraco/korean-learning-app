import type { WordEntry, ThemePack, LevelWordList, Word } from '@/types';
import { vocabularyEntries } from './entries';
import { intermediateEntries } from './entries-intermediate';
import { advancedEntries } from './entries-advanced';
import { themePacks } from './themes';
import { levelWordLists } from './levels';

// Merge all entry sources
const allEntries: WordEntry[] = [...vocabularyEntries, ...intermediateEntries, ...advancedEntries];

// ── Entries ────────────────────────────────────────────────────

/** Get a single entry by ID */
export function getEntry(id: string): WordEntry | undefined {
  return allEntries.find((e) => e.id === id);
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
  emoji: string;
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
