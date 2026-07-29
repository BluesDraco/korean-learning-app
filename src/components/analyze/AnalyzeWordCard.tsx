'use client';

import { useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { stripParticle } from '@/lib/koreanParticles';

export interface AnalyzeWord {
  text: string;
  romanization?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  meaning: string;
  emoji?: string;
  example?: string;
  examples?: Array<{ ko: string; zh: string } | string>;
  synonyms?: string[];
  importance?: '核心' | '常用' | '进阶';
}

interface Props {
  word: AnalyzeWord;
  saved: boolean;
  onSave: () => void;
  onSpeak?: (text: string) => void;
}

function norm(ex: { ko: string; zh: string } | string): { ko: string; zh: string } {
  return typeof ex === 'string' ? { ko: ex, zh: '' } : ex;
}

// v3 · vocabulary 折叠卡风格（参考 themes/[id] 页）
// Collapsed: emoji | korean + romanization pill + meaning | 🔊 + ✓/✓ + ▸
// Expanded: 义项组 + 例句双语（韩高亮 + 中次行 + 独立 🔊）
export function AnalyzeWordCard({ word, saved, onSave, onSpeak }: Props) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const roman = word.romanization || word.pronunciation;
  const cleanWord = stripParticle(word.text);
  const rawExamples = word.examples && word.examples.length > 0
    ? word.examples
    : (word.example ? [word.example] : []);
  const examples = rawExamples.map(norm);
  const hasDetails = examples.length > 0 || (word.synonyms && word.synonyms.length > 0);

  // split meaning into lines (义项)
  const meanings = word.meaning
    .replace(/（[^）]*）/g, '')
    .split(/[\/;；,，·]/)
    .map(m => m.trim())
    .filter(Boolean);

  return (
    <div
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-1)',
        borderRadius: 12,
        overflow: 'hidden',
        animation: 'az2-fade .25s ease both',
      }}
    >
      {/* Collapsed row */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 14px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <strong
              style={{
                fontFamily: "'Noto Sans KR', 'Malgun Gothic', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: 'var(--color-ink-1)',
                lineHeight: 1.3,
              }}
            >
              {word.text}
            </strong>
            {roman && (
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--color-pink-strong)',
                  background: 'color-mix(in srgb, var(--color-pink-strong) 8%, transparent)',
                  padding: '1px 6px',
                  borderRadius: 4,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
                  letterSpacing: '.04em',
                }}
              >
                [{roman}]
              </span>
            )}
            {word.partOfSpeech && (
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--color-ink-3)',
                  background: 'var(--color-surface-1)',
                  padding: '1px 6px',
                  borderRadius: 4,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {word.partOfSpeech}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--color-ink-2, #5a5350)',
              marginTop: 3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.4,
            }}
          >
            {word.meaning}
          </div>
        </div>

        {/* Right action icons */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
          {onSpeak && (
            <button
              onClick={e => { e.stopPropagation(); onSpeak(word.text); }}
              aria-label="speak"
              title={t('a11y.play_audio', lang)}
              style={{
                width: 28, height: 28, borderRadius: 8,
                border: 0,
                background: 'transparent',
                color: 'var(--color-ink-3)',
                display: 'grid', placeItems: 'center',
                fontSize: 15, cursor: 'pointer',
                opacity: .6,
              }}
            >
              🔊
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onSave(); }}
            aria-label={saved ? 'saved' : 'save'}
            style={{
              width: 28, height: 28, borderRadius: 8,
              fontSize: 13, fontWeight: 700,
              border: saved
                ? '1px solid var(--color-mint-strong)'
                : '1px solid var(--color-border-1)',
              background: saved ? 'var(--color-mint-soft)' : 'transparent',
              color: saved ? 'var(--color-mint-strong)' : 'var(--color-ink-3)',
              display: 'grid', placeItems: 'center',
              cursor: 'pointer',
            }}
          >
            {saved ? '✓' : '+'}
          </button>
          {hasDetails && (
            <span
              style={{
                fontSize: 12,
                color: 'var(--color-ink-3)',
                marginLeft: 2,
                transition: 'transform .2s',
                transform: expanded ? 'rotate(180deg)' : 'none',
                display: 'inline-flex',
              }}
            >
              ▾
            </span>
          )}
        </div>
      </div>

      {/* Expanded section */}
      {expanded && hasDetails && (
        <div style={{ borderTop: '1px solid var(--color-border-1)', padding: 14 }}>
          {/* Meanings */}
          {meanings.length > 1 && (
            <div style={{ marginBottom: 12 }}>
              {meanings.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-block',
                    fontSize: 12,
                    color: 'var(--color-ink-2, #5a5350)',
                    background: 'var(--color-surface-1)',
                    padding: '3px 8px',
                    borderRadius: 6,
                    margin: '0 6px 4px 0',
                    lineHeight: 1.5,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}

          {/* Examples */}
          {examples.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {examples.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-surface-1)',
                    borderRadius: 10,
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <HighlightedExample
                        text={ex.ko}
                        word={cleanWord}
                        highlightColor="var(--color-pink-strong)"
                      />
                    </div>
                    <button
                      onClick={() => onSpeak?.(ex.ko)}
                      aria-label="speak example"
                      style={{
                        margin: -8, padding: 8,
                        border: 0,
                        background: 'transparent',
                        color: 'var(--color-ink-3)',
                        display: 'grid', placeItems: 'center',
                        fontSize: 13, cursor: 'pointer', flexShrink: 0,
                        lineHeight: 1,
                        opacity: .55,
                      }}
                    >
                      🔊
                    </button>
                  </div>
                  {ex.zh ? (
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--color-ink-3)',
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {ex.zh}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {/* Synonyms */}
          {word.synonyms && word.synonyms.length > 0 && (
            <div style={{ marginTop: examples.length > 0 ? 10 : 0, fontSize: 12, color: 'var(--color-ink-3)' }}>
              <span style={{ fontWeight: 700, marginRight: 6, color: 'var(--color-ink-2, #5a5350)' }}>
                ≈
              </span>
              {word.synonyms.join(' / ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
