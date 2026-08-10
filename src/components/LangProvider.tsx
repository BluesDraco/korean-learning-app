'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Lang, getLang, setLang as saveLang } from '@/lib/i18n';

interface LangContextValue {
  [k: string]: unknown;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'zh', setLang: () => {} });

export function LangProvider({ children, initialLang = 'zh' }: { children: ReactNode; initialLang?: Lang }) {
  // 初始值来自 SSR（layout 经 getServerLang 注入），首帧即与服务端一致，消除 zh→en 闪烁
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const resolved = getLang();
    if (resolved !== initialLang) setLangState(resolved);
  }, [initialLang]);

  const setLang = (l: Lang) => {
    saveLang(l);
    setLangState(l);
    // 切语言 = 换 URL 前缀：EN 进 /en，中文回裸路径。硬跳保证 SSR 语言与 UI 一致。
    if (typeof window !== 'undefined') {
      const { pathname, search, hash } = window.location;
      const bare = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
      const next = l === 'en' ? (bare === '/' ? '/en' : `/en${bare}`) : bare;
      if (next !== pathname) window.location.href = next + search + hash;
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
