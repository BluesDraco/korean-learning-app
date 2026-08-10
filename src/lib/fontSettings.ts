'use client';

export type FontPreset = 'cute' | 'clean' | 'classic';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FontSettings {
  preset: FontPreset;
  size: FontSize;
}

const STORAGE_KEY = 'font-settings';

import { t } from './i18n';
import type { Lang } from './i18n';

export const FONT_PRESETS: { key: FontPreset; label: string; desc: string; preview: string }[] = [
  { key: 'cute', label: '手账风', desc: '楷体中文 + 圆润韩文，手账手写感', preview: '안녕하세요 你好世界' },
  { key: 'clean', label: '清晰风', desc: '系统黑体，极简无衬线，干净利落', preview: '안녕하세요 你好世界' },
  { key: 'classic', label: '经典风', desc: '衬线中文 + 韩文，温润典雅书卷气', preview: '안녕하세요 你好世界' },
];

export function getTranslatedFontPresets(lang: Lang) {
  return FONT_PRESETS.map(p => ({
    ...p,
    label: t(`font.preset_${p.key}`, lang),
    desc: t(`font.desc_${p.key}`, lang),
  }));
}

export const FONT_SIZES: { key: FontSize; label: string; px: number }[] = [
  { key: 'small', label: '小', px: 15 },
  { key: 'medium', label: '中', px: 17 },
  { key: 'large', label: '大', px: 19 },
  { key: 'xlarge', label: '特大', px: 21 },
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
