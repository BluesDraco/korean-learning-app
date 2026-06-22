import type { WordEntry, ThemePack, LevelWordList } from '@/types';

// ── 内部 fetch 工具 ───────────────────────────────────────────────

function apiBase(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  }
  return '';
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`);
  if (!res.ok) throw new Error(`vocabulary API error: ${res.status} ${path}`);
  return res.json();
}

// ── 模块级缓存（防双重请求） ─────────────────────────────────────

let themesCache: { themes: ThemePack[]; categories: string[] } | null = null;
const themeByIdCache = new Map<string, { theme: ThemePack | null; words: WordEntry[] }>();

async function fetchThemes() {
  if (themesCache) return themesCache;
  themesCache = await apiFetch<{ themes: ThemePack[]; categories: string[] }>('/api/vocabulary/themes');
  return themesCache!;
}

async function fetchThemeById(id: string) {
  if (themeByIdCache.has(id)) return themeByIdCache.get(id)!;
  const data = await apiFetch<{ theme: ThemePack | null; words: WordEntry[] }>(`/api/vocabulary/themes/${encodeURIComponent(id)}`);
  themeByIdCache.set(id, data);
  return data;
}

// ── Entries ───────────────────────────────────────────────────────

export async function getEntry(id: string): Promise<WordEntry | undefined> {
  const data = await apiFetch<{ entry: WordEntry | null }>(`/api/vocabulary/entry?id=${encodeURIComponent(id)}`);
  return data.entry ?? undefined;
}

export async function getEntryByKorean(korean: string): Promise<WordEntry | undefined> {
  const data = await apiFetch<{ entry: WordEntry | null }>(`/api/vocabulary/entry?korean=${encodeURIComponent(korean)}`);
  return data.entry ?? undefined;
}

export async function getEntriesByIds(ids: string[]): Promise<WordEntry[]> {
  if (ids.length === 0) return [];
  const data = await apiFetch<{ entries: WordEntry[] }>(`/api/vocabulary/entry?ids=${ids.map(encodeURIComponent).join(',')}`);
  return data.entries as WordEntry[];
}

export async function searchEntries(query: string): Promise<WordEntry[]> {
  const data = await apiFetch<{ results: WordEntry[] }>(`/api/vocabulary/search?q=${encodeURIComponent(query)}`);
  return data.results;
}

// ── Themes ────────────────────────────────────────────────────────

export async function getAllThemes(): Promise<ThemePack[]> {
  return (await fetchThemes()).themes;
}

export async function getThemeCategories(): Promise<string[]> {
  return (await fetchThemes()).categories;
}

export async function getTheme(id: string): Promise<ThemePack | undefined> {
  return (await fetchThemeById(id)).theme ?? undefined;
}

export async function getThemeWords(themeId: string): Promise<WordEntry[]> {
  return (await fetchThemeById(themeId)).words;
}

// ── Levels ────────────────────────────────────────────────────────

async function fetchLevel(level: number) {
  return apiFetch<{ level: LevelWordList | null; words: WordEntry[] }>(`/api/vocabulary/levels/${level}`);
}

export async function getAllLevels(): Promise<LevelWordList[]> {
  const results = await Promise.all([1, 2, 3, 4, 5, 6].map(l => fetchLevel(l).then(d => d.level)));
  return results.filter(Boolean) as LevelWordList[];
}

export async function getLevel(level: number): Promise<LevelWordList | undefined> {
  return (await fetchLevel(level)).level ?? undefined;
}

export async function getLevelWords(level: number): Promise<WordEntry[]> {
  return (await fetchLevel(level)).words;
}
