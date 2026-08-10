'use client';

import { useState, useMemo } from 'react';
import { WordTapSheet } from '@/components/WordTapSheet';

interface TappableTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  source?: string;
  highlightWord?: string;
  highlightColor?: string;
  underlineColor?: string;
}

function stripPunctuation(token: string): string {
  return token.replace(/[。？！，,.?!、…]+$/g, '').trim();
}

export function TappableText({ text, className, style, source, highlightWord, highlightColor, underlineColor }: TappableTextProps) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const hiColor = highlightColor ?? 'var(--pink-primary)';
  const ulColor = underlineColor ?? 'rgba(255,127,168,0.35)';

  // If highlightWord contains spaces, split text around it first, then tokenize each segment.
  // Otherwise fall back to simple space-based tokenization.
  const segments = useMemo(() => {
    if (!highlightWord || !highlightWord.includes(' ') || !text.includes(highlightWord)) {
      return [{ highlight: false, text }];
    }
    const parts = text.split(highlightWord);
    const result: { highlight: boolean; text: string }[] = [];
    parts.forEach((part, i) => {
      if (part) result.push({ highlight: false, text: part });
      if (i < parts.length - 1) result.push({ highlight: true, text: highlightWord });
    });
    return result;
  }, [text, highlightWord]);

  return (
    <>
      <span className={className} style={style}>
        {segments.map((seg, si) => {
          if (seg.highlight) {
            return (
              <span
                key={si}
                style={{
                  color: hiColor,
                  fontWeight: 800,
                  borderBottom: `2px solid ${hiColor}`,
                  cursor: 'pointer',
                }}
                onClick={e => { e.stopPropagation(); setActiveWord(seg.text); }}
              >
                {seg.text}
              </span>
            );
          }
          const tokens = seg.text.split(/\s+/).filter(Boolean);
          return tokens.map((token, i) => {
            const key = stripPunctuation(token);
            const hwIdx = highlightWord && !highlightWord.includes(' ') ? token.indexOf(highlightWord) : -1;
            const isHighlighted = hwIdx !== -1;

            const isLast = i === tokens.length - 1;

            if (isHighlighted && highlightWord) {
              const before = token.slice(0, hwIdx);
              const match = token.slice(hwIdx, hwIdx + highlightWord.length);
              const after = token.slice(hwIdx + highlightWord.length);
              return (
                <span key={`${si}-${i}`}>
                  <span
                    onClick={e => { e.stopPropagation(); if (key) setActiveWord(key); }}
                    style={{ cursor: 'pointer', display: 'inline' }}
                  >
                    {before && <span style={{ borderBottom: `1px solid ${ulColor}` }}>{before}</span>}
                    <span style={{ color: hiColor, fontWeight: 800, borderBottom: `2px solid ${hiColor}` }}>{match}</span>
                    {after && <span style={{ borderBottom: `1px solid ${ulColor}` }}>{after}</span>}
                  </span>
                  {!isLast && ' '}
                </span>
              );
            }

            return (
              <span key={`${si}-${i}`}>
                <span
                  onClick={e => { e.stopPropagation(); if (key) setActiveWord(key); }}
                  style={{
                    cursor: key ? 'pointer' : 'default',
                    borderBottom: key ? `1px solid ${ulColor}` : undefined,
                    display: 'inline',
                  }}
                >
                  {token}
                </span>
                {!isLast && ' '}
              </span>
            );
          });
        })}
      </span>

      {activeWord && (
        <WordTapSheet
          surface={activeWord}
          source={source}
          onClose={() => setActiveWord(null)}
          onSaved={() => setActiveWord(null)}
        />
      )}
    </>
  );
}
