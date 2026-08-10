'use client';

import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import { getFontSettings, saveFontSettings, applyFontSettings, type FontSettings, type FontPreset, type FontSize } from '@/lib/fontSettings';

interface FontContextType {
  [k: string]: unknown;
  settings: FontSettings;
  previewPreset: (p: FontPreset) => void;
  previewSize: (s: FontSize) => void;
  commitFontSettings: () => void;
}

const FontContext = createContext<FontContextType>({
  settings: { preset: 'cute', size: 'medium' },
  previewPreset: () => {},
  previewSize: () => {},
  commitFontSettings: () => {},
});

export function useFontSettings() {
  return useContext(FontContext);
}

export function FontProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<FontSettings>({ preset: 'cute', size: 'medium' });

  useEffect(() => {
    const s = getFontSettings();
    setSettings(s);
    applyFontSettings(s);
  }, []);

  // Apply to DOM immediately but do NOT save to localStorage yet
  const previewPreset = (preset: FontPreset) => {
    setSettings((prev) => {
      const next = { ...prev, preset };
      applyFontSettings(next);
      return next;
    });
  };

  const previewSize = (size: FontSize) => {
    setSettings((prev) => {
      const next = { ...prev, size };
      applyFontSettings(next);
      return next;
    });
  };

  // Save current preview state to localStorage
  const commitFontSettings = () => {
    saveFontSettings(settings);
  };

  return (
    <FontContext.Provider value={{ settings, previewPreset, previewSize, commitFontSettings }}>
      {children}
    </FontContext.Provider>
  );
}
