import zh from '@/locales/zh';
import en from '@/locales/en';

export type Lang = 'zh' | 'en';
export const LANG_KEY = 'tori_ui_language';

const dicts: Record<Lang, Record<string, string>> = { zh, en };

/** 从 URL 路径判定语言：/en 或 /en/... => 'en'，否则 'zh'。纯函数，客户端/服务端通用。 */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

/** 去掉路径的 /en 前缀，返回裸路径（'/en/grammar' => '/grammar'，'/en' => '/'）。 */
export function stripLangPrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  // URL 前缀优先——SSR rewrite 后客户端 hydration 要与服务端语言一致
  if (langFromPath(window.location.pathname) === 'en') return 'en';
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'zh' || stored === 'en') return stored;
  return 'zh';
}

export function setLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(key: string, lang: Lang, params?: Record<string, string | number>): string {
  let s = dicts[lang]?.[key] ?? dicts['zh']?.[key] ?? key;
  if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
  return s;
}
