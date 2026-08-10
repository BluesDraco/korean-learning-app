import React from 'react';

interface Props {
  [k: string]: unknown;
  text: string;
  word: string;
  className?: string;
  style?: React.CSSProperties;
  highlightColor?: string;
  highlightBg?: string;
}

export function HighlightedExample({ text, word, className, style, highlightColor, highlightBg }: Props) {
  if (!word || !text.includes(word)) {
    return <span className={className} style={style}>{text}</span>;
  }

  const parts = text.split(word);
  const hColor = highlightColor ?? '#ff7fa8';
  const hBg = highlightBg ?? 'transparent';
  return (
    <span className={className} style={style}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span
              className="font-bold"
              style={{ color: hColor, background: hBg, borderRadius: 3, padding: '0 2px' }}
            >
              {word}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
