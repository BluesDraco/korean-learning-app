'use client';

export type FontPreset = 'cute' | 'clean' | 'classic';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FontSettings {
  [k: string]: unknown;
  preset: FontPreset;
  size: FontSize;
}

const STORAGE_KEY = 'font-settings';

import { t } from './i18n';
import type { Lang } from './i18n';

export const FONT_PRESETS: { key: FontPreset; label: string; desc: string; preview: string }[] = [
  { key: 'cute', label: '手账风', labelEn: 'Journal style', desc: '楷体中文 + 圆润韩文，手账手写感', descEn: 'Kai-style Chinese + rounded Korean, handwritten journal feel', preview: '안녕하세요 你好世界', previewEn: 'Hello, world' },
  { key: 'clean', label: '清晰风', labelEn: 'Clean style', desc: '系统黑体，极简无衬线，干净利落', descEn: 'System sans-serif, minimal and crisp', preview: '안녕하세요 你好世界', previewEn: 'Hello, world' },
  { key: 'classic', label: '经典风', labelEn: 'Classic style', desc: '衬线中文 + 韩文，温润典雅书卷气', descEn: 'Serif Chinese + Korean, elegant and scholarly', preview: '안녕하세요 你好世界', previewEn: 'Hello, world' },
];

export function getTranslatedFontPresets(lang: Lang) {
  return FONT_PRESETS.map(p => ({
    ...p,
    label: t(`font.preset_${p.key}`, lang),
    desc: t(`font.desc_${p.key}`, lang),
  }));
}

export const FONT_SIZES: { key: FontSize; label: string; px: number }[] = [
  { key: 'small', label: '小', labelEn: 'Small.', px: 15 },
  { key: 'medium', label: '中', labelEn: 'Medium', px: 17 },
  { key: 'large', label: '大', labelEn: 'big', px: 19 },
  { key: 'xlarge', label: '特大', labelEn: 'Extra large', px: 21 },
];

export function getTranslatedFontSizes(lang: Lang) {
  return FONT_SIZES.map(s => ({
    ...s,
    label: t(`font.size_${s.key === 'xlarge' ? 'xl' : s.key[0]}`, lang),
  }));
}

const defaults: FontSettings = { preset: 'cute', size: 'medium' };

export function getFontSettings(): FontSettings {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { preset: parsed.preset || defaults.preset, size: parsed.size || defaults.size };
    }
  } catch { /* ignore */ }
  return defaults;
}

export function saveFontSettings(settings: FontSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function applyFontSettings(settings: FontSettings): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-font', settings.preset);
  document.documentElement.setAttribute('data-font-size', settings.size);
}
