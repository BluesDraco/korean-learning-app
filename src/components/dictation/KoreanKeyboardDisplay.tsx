'use client';

import { useMemo } from 'react';

// Dubeolsik layout rows (display labels only)
const ROWS = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
];

const CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const COMPOUND_JONG: Record<string, string[]> = {
  'ㄳ':['ㄱ','ㅅ'],'ㄵ':['ㄴ','ㅈ'],'ㄶ':['ㄴ','ㅎ'],
  'ㄺ':['ㄹ','ㄱ'],'ㄻ':['ㄹ','ㅁ'],'ㄼ':['ㄹ','ㅂ'],
  'ㄽ':['ㄹ','ㅅ'],'ㄾ':['ㄹ','ㅌ'],'ㄿ':['ㄹ','ㅍ'],
  'ㅀ':['ㄹ','ㅎ'],'ㅄ':['ㅂ','ㅅ'],
};
const COMPOUND_JUNG: Record<string, string[]> = {
  'ㅘ':['ㅗ','ㅏ'],'ㅙ':['ㅗ','ㅐ'],'ㅚ':['ㅗ','ㅣ'],
  'ㅝ':['ㅜ','ㅓ'],'ㅞ':['ㅜ','ㅔ'],'ㅟ':['ㅜ','ㅣ'],
  'ㅢ':['ㅡ','ㅣ'],
};

function decomposeSyllable(ch: string): string[] {
  const code = ch.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return [ch];
  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = Math.floor((offset % (21 * 28)) / 28);
  const ci = Math.floor(offset / (21 * 28));
  const result: string[] = [CHO[ci]];
  const v = JUNG[vi];
  result.push(...(COMPOUND_JUNG[v] ?? [v]));
  if (fi > 0) {
    const f = JONG[fi];
    result.push(...(COMPOUND_JONG[f] ?? [f]));
  }
  return result;
}

function getHighlightedJamo(text: string): Set<string> {
  if (!text) return new Set();
  // Only highlight based on the last syllable being typed
  const lastChar = text[text.length - 1];
  const jamos = decomposeSyllable(lastChar);
  return new Set(jamos);
}

interface KoreanKeyboardDisplayProps {
  value: string;
}

export function KoreanKeyboardDisplay({ value }: KoreanKeyboardDisplayProps) {
  const highlighted = useMemo(() => getHighlightedJamo(value), [value]);

  return (
    <div style={{
      background: '#f5ede8',
      borderRadius: 16,
      padding: '12px 8px 10px',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: ri < ROWS.length - 1 ? 6 : 0 }}>
          {row.map((jamo) => {
            const active = highlighted.has(jamo);
            return (
              <div
                key={jamo}
                style={{
                  minWidth: 30, height: 36, borderRadius: 8,
                  background: active ? '#ff7fa8' : 'white',
                  color: active ? 'white' : '#241917',
                  fontSize: 15, fontWeight: active ? 800 : 400,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                  transition: 'background 0.1s, color 0.1s',
                  flex: 1, maxWidth: 42,
                }}
              >
                {jamo}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
