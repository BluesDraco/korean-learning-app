'use client';

export type FontPreset = 'cute' | 'clean' | 'classic';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FontSettings {
  preset: FontPreset;
  size: FontSize;
}

const STORAGE_KEY = 'font-settings';

export const FONT_PRESETS: { key: FontPreset; label: string; desc: string; preview: string }[] = [
  { key: 'cute', label: '手账风', desc: '圆体 + 手写韩文，活泼可爱', preview: '안녕하세요 你好世界' },
  { key: 'clean', label: '清晰风', desc: '系统黑体 + 高丽体，简洁清晰', preview: '안녕하세요 你好世界' },
  { key: 'classic', label: '经典风', desc: '霞鹜文楷 + 高丽体，温润典雅', preview: '안녕하세요 你好世界' },
];

export const FONT_SIZES: { key: FontSize; label: string; px: number }[] = [
  { key: 'small', label: '小', px: 15 },
  { key: 'medium', label: '中', px: 17 },
  { key: 'large', label: '大', px: 19 },
  { key: 'xlarge', label: '特大', px: 21 },
];

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
