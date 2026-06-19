'use client';

export type FlashcardTheme = 'warm' | 'dark' | 'paper' | 'pure';

export interface FlashcardThemeDef {
  key: FlashcardTheme;
  label: string;
  desc: string;
  // preview swatches [card bg, example bg, accent]
  swatches: [string, string, string];
}

export const FLASHCARD_THEMES: FlashcardThemeDef[] = [
  { key: 'warm', label: '奶油暖白', desc: '暖白底色，青绿例句', swatches: ['#fafaf8', '#f0f7f4', '#c86080'] },
  { key: 'dark', label: '深夜墨绿', desc: '深色护眼，薄荷点缀', swatches: ['#1a2820', '#1e3028', '#aee3d8'] },
  { key: 'paper', label: '纸张米白', desc: '书卷温暖，橙棕强调', swatches: ['#fdf9f4', '#e8f0ec', '#b05030'] },
  { key: 'pure', label: '纯白极简', desc: '全白留白，淡蓝例句', swatches: ['#ffffff', '#f0f5ff', '#7050c0'] },
];

const STORAGE_KEY = 'flashcard-theme';
const DEFAULT: FlashcardTheme = 'pure';

export function getFlashcardTheme(): FlashcardTheme {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const v = localStorage.getItem(STORAGE_KEY) as FlashcardTheme | null;
    if (v && FLASHCARD_THEMES.some(t => t.key === v)) return v;
  } catch { /* ignore */ }
  return DEFAULT;
}

export function saveFlashcardTheme(theme: FlashcardTheme): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }
}

export function applyFlashcardTheme(theme: FlashcardTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-fc-theme', theme);
}
