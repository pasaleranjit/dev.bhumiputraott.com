'use client';

import React, { createContext, useContext, useState } from 'react';

export type Lang = 'en' | 'mr';

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (en: string, mr?: string) => string;
}

const LangCtx = createContext<LangContextValue>({
  lang: 'en',
  toggle: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggle = () => setLang(l => l === 'en' ? 'mr' : 'en');

  const t = (en: string, mr?: string): string => {
    if (lang === 'mr' && mr) return mr;
    return en;
  };

  return (
    <LangCtx.Provider value={{ lang, toggle, t }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
