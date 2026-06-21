import type { WordEntry, ThemePack, LevelWordList, Word } from '@/types';

interface VocabData {
  allEntries: WordEntry[];
  allEntriesById: Map<string, WordEntry>;
  themePacks: ThemePack[];
  levelWordLists: LevelWordList[];
}

let cached: VocabData | null = null;

async function load(): Promise<VocabData> {
  if (cached) return cached;
  const m = await import('./vocab-data');
  cached = { allEntries: m.allEntries, allEntriesById: m.allEntriesById, themePacks: m.themePacks, levelWordLists: m.levelWordLists };
  return cached;
}

// ── Entries ────────────────────────────────────────────────────

/** Get a single entry by ID. Checks deduped list first, then full source map (handles dedup ID changes). */
export async function getEntry(id: string): Promise<WordEntry | undefined> {
  const data = await load();
  return data.allEntriesById.get(id);
}

/** Get entry by Korean text — used to recover examples when sourceEntryId is missing */
export async function getEntryByKorean(korean: string): Promise<WordEntry | undefined> {
  const data = await load();
  return data.allEntries.find(e => e.korean === korean);
}

/** Get multiple entries by IDs */
export async function getEntriesByIds(ids: string[]): Promise<WordEntry[]> {
  const data = await load();
  return ids.map((id) => data.allEntriesById.get(id)).filter(Boolean) as WordEntry[];
}

/** Search entries by Korean text or Chinese meaning */
export async function searchEntries(query: string): Promise<WordEntry[]> {
  const data = await load();
  const q = query.toLowerCase();
  return data.allEntries.filter(
    (e) =>
      e.korean.includes(q) ||
      e.romanization.toLowerCase().includes(q) ||
      e.meanings.some((m) => m.chinese.includes(q))
  );
}

/** Get entries by emotion tag */
export async function getEntriesByEmotion(emotion: string): Promise<WordEntry[]> {
  const data = await load();
  return data.allEntries.filter((e) => e.emotionTags.includes(emotion));
}

/** Get entries by scene tag */
export async function getEntriesByTag(tag: string): Promise<WordEntry[]> {
  const data = await load();
  return data.allEntries.filter((e) => e.tags.includes(tag));
}

/** Get entries by TOPIK level */
export async function getEntriesByLevel(level: number): Promise<WordEntry[]> {
  const data = await load();
  return data.allEntries.filter((e) => parseInt(e.level) === level);
}

// ── Themes ─────────────────────────────────────────────────────

/** Get all theme packs */
export async function getAllThemes(): Promise<ThemePack[]> {
  const data = await load();
  return data.themePacks;
}

/** Get themes by category */
export async function getThemesByCategory(category: string): Promise<ThemePack[]> {
  const data = await load();
  return data.themePacks.filter((t) => t.category === category);
}

/** Get a single theme pack */
export async function getTheme(id: string): Promise<ThemePack | undefined> {
  const data = await load();
  return data.themePacks.find((t) => t.id === id);
}

/** Get all word entries for a theme pack */
export async function getThemeWords(themeId: string): Promise<WordEntry[]> {
  const theme = await getTheme(themeId);
  if (!theme) return [];
  return getEntriesByIds(theme.wordIds);
}

/** Get all unique categories */
export async function getThemeCategories(): Promise<string[]> {
  const data = await load();
  return [...new Set(data.themePacks.map((t) => t.category))];
}

// ── Levels ─────────────────────────────────────────────────────

/** Get all level word lists (with dynamic counts from entries) */
export async function getAllLevels(): Promise<LevelWordList[]> {
  const data = await load();
  const entries = data.allEntries;
  return data.levelWordLists.map((l) => ({
    ...l,
    totalCount: entries.filter((e) => parseInt(e.level) === l.level).length,
  }));
}

/** Get a single level */
export async function getLevel(level: number): Promise<LevelWordList | undefined> {
  const data = await load();
  const list = data.levelWordLists.find((l) => l.level === level);
  if (!list) return undefined;
  const entries = data.allEntries.filter((e) => parseInt(e.level) === level);
  return { ...list, totalCount: entries.length };
}

/** Get all word entries for a TOPIK level (uses entry's own level field) */
export async function getLevelWords(level: number): Promise<WordEntry[]> {
  return getEntriesByLevel(level);
}

// ── Rich data for user Word ────────────────────────────────────

/** Enrich a user's Word with data from the unified WordEntry */
export async function enrichWord(
  userWord: Word | null,
  entry?: WordEntry
): Promise<{
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
} | null> {
  if (!userWord) return null;

  const e = entry || (userWord.sourceEntryId ? await getEntry(userWord.sourceEntryId) : undefined);

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
      relatedWords: await getEntriesByIds(e.relatedWords),
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
