import zh from '@/locales/zh';
import en from '@/locales/en';

export type Lang = 'zh' | 'en';
export const LANG_KEY = 'tori_ui_language';

const dicts: Record<Lang, Record<string, string>> = { zh, en };

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'zh' || stored === 'en') return stored;
  return 'zh';
}

export function setLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(key: string, lang: Lang): string {
  return dicts[lang]?.[key] ?? dicts['zh']?.[key] ?? key;
}
