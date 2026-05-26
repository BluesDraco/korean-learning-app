'use client';

import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import { getFontSettings, saveFontSettings, applyFontSettings, type FontSettings, type FontPreset, type FontSize, FONT_PRESETS, FONT_SIZES } from '@/lib/fontSettings';

interface FontContextType {
  settings: FontSettings;
  setPreset: (p: FontPreset) => void;
  setSize: (s: FontSize) => void;
}

const FontContext = createContext<FontContextType>({
  settings: { preset: 'cute', size: 'medium' },
  setPreset: () => {},
  setSize: () => {},
});

export function useFontSettings() {
  return useContext(FontContext);
}

export function FontProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<FontSettings>({ preset: 'cute', size: 'medium' });

  // Apply on mount (before React hydrate, to avoid FOUC)
  useEffect(() => {
    const s = getFontSettings();
    setSettings(s);
    applyFontSettings(s);
  }, []);

  const setPreset = (preset: FontPreset) => {
    setSettings((prev) => {
      const next = { ...prev, preset };
      saveFontSettings(next);
      applyFontSettings(next);
      return next;
    });
  };

  const setSize = (size: FontSize) => {
    setSettings((prev) => {
      const next = { ...prev, size };
      saveFontSettings(next);
      applyFontSettings(next);
      return next;
    });
  };

  return (
    <FontContext.Provider value={{ settings, setPreset, setSize }}>
      {children}
    </FontContext.Provider>
  );
}
