'use client';

import { t } from './i18n';
import type { Lang } from './i18n';

export type FlashcardTheme = 'warm' | 'dark' | 'paper' | 'pure';

export interface FlashcardThemeDef {
  [k: string]: unknown;
  key: FlashcardTheme;
  label: string;
  desc: string;
  swatches: [string, string, string];
}

export const FLASHCARD_THEMES: FlashcardThemeDef[] = [
  { key: 'warm', label: '奶油暖白', labelEn: 'Creamy warm white', desc: '暖白底色，青绿例句', descEn: 'Warm white background with teal example sentences', swatches: ['#fafaf8', '#f0f7f4', '#c86080'] },
  { key: 'dark', label: '深夜墨绿', labelEn: 'Midnight dark green', desc: '深色护眼，薄荷点缀', descEn: 'Dark eye-friendly theme with mint accents', swatches: ['#1a2820', '#1e3028', '#aee3d8'] },
  { key: 'paper', label: '纸张米白', labelEn: 'Paper cream white', desc: '书卷温暖，橙棕强调', descEn: 'Warm literary feel with orange-brown accents', swatches: ['#fdf9f4', '#e8f0ec', '#b05030'] },
  { key: 'pure', label: '纯白极简', labelEn: 'Pure white minimal', desc: '全白留白，淡蓝例句', descEn: 'All-white with light blue example sentences', swatches: ['#ffffff', '#f0f5ff', '#7050c0'] },
];

export function getTranslatedThemes(lang: Lang): FlashcardThemeDef[] {
  return FLASHCARD_THEMES.map(th => ({
    ...th,
    label: t(`fctheme.label_${th.key}`, lang),
    desc: t(`fctheme.desc_${th.key}`, lang),
  }));
}

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
