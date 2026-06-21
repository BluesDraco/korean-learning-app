'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Lang, getLang, setLang as saveLang } from '@/lib/i18n';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'zh', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    setLangState(getLang());
  }, []);

  const setLang = (l: Lang) => {
    saveLang(l);
    setLangState(l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
