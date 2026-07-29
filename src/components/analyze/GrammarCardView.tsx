'use client';

import { speakWord } from '@/lib/tts';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

interface ConjugationItem { form: string; example: string }

export interface AnalyzeGrammar {
  pattern: string;
  title?: string;
  level?: string;
  usage?: string;
  meaning?: string;
  explanation?: string;
  conjugation?: string | ConjugationItem[];
  contrast?: string;
  mistake?: string;
  examples?: Array<{ ko: string; zh: string }> | string[];
}

function norExamples(
  ex: AnalyzeGrammar['examples'],
): Array<{ ko: string; zh: string }> {
  if (!ex || ex.length === 0) return [];
  return ex.map((e) =>
    typeof e === 'string' ? { ko: e, zh: '' } : { ko: e.ko, zh: e.zh || '' },
  );
}

function norConj(
  c: AnalyzeGrammar['conjugation'],
): ConjugationItem[] {
  if (!c) return [];
  if (typeof c === 'string') {
    if (!c.trim()) return [];
    return [{ form: c, example: '' }];
  }
  return c;
}

// v3 · 语法卡金色风（抷取自 DiaryGrammar 视觉语言）
// 金色渐变公式卡 + 编号规则 + 双语例句（左竖金条）+ 对比/易错卡
export function GrammarCardView({ g }: { g: AnalyzeGrammar }) {
  const { lang } = useLang();
  const desc = g.meaning || g.usage || g.explanation;
  const examples = norExamples(g.examples);
  const conj = norConj(g.conjugation);

  const gold = 'var(--color-gold-base)';
  const goldSoft = 'var(--color-gold-soft)';
  const goldDeep = 'var(--color-gold-strong)';

  return (
    <div className="az2-grammar-item">
      {/* Top tag */}
      <div style={{ marginBottom: 10 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--color-pink-strong)',
            background: 'var(--color-pink-soft)',
            padding: '3px 8px',
            borderRadius: 4,
          }}
        >
          GRAMMAR{g.level ? ` · ${g.level}` : ''}
          {!g.level ? t('analyze.grammar_label', lang) : ''}
        </span>
      </div>

      {/* Title */}
      {g.title && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--color-ink-1)',
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {g.title}
        </div>
      )}

      {/* Golden pattern card */}
      <div
        style={{
          background: `linear-gradient(135deg, ${goldSoft}, rgba(200,153,91,.12))`,
          border: `2px solid rgba(200,153,91,.3)`,
          borderRadius: 14,
          padding: '14px 18px',
          textAlign: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: goldDeep,
            letterSpacing: '-.01em',
            lineHeight: 1.4,
          }}
        >
          {g.pattern}
        </div>
        <div
          style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            fontSize: 10,
            color: gold,
            marginTop: 4,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {t('grammar.pattern_label', lang)}
        </div>
      </div>

      {/* Usage */}
      {desc && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--color-ink-3)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            🔍 {t('grammar.when_use', lang)}
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: 'var(--color-ink-2)',
            }}
          >
            {desc}
          </div>
        </div>
      )}

      {/* Conjugation rules */}
      {conj.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--color-ink-3)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {t('analyze.grammar.conjugation_label', lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {conj.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: i === 0 ? `linear-gradient(135deg, ${goldSoft}, rgba(200,153,91,.06))` : 'var(--color-surface-1)',
                  borderRadius: 10,
                  border: i === 0 ? `1px solid rgba(200,153,91,.2)` : '1px solid var(--color-border-1)',
                  position: 'relative',
                }}
              >
                {/* Circular number */}
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: i === 0 ? gold : 'var(--color-surface-2)',
                    color: i === 0 ? '#fff' : 'var(--color-ink-3)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                {i === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: 14,
                      fontSize: 9,
                      fontWeight: 700,
                      color: goldDeep,
                      background: goldSoft,
                      padding: '2px 7px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '.08em',
                    }}
                  >
                    {t('grammar.core', lang)}
                  </span>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-ink-1)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'normal',
                    }}
                  >
                    {c.form}
                  </div>
                  {c.example && (
                    <div
                      style={{
                        fontFamily: "'Noto Sans KR', sans-serif",
                        fontSize: 12,
                        color: 'var(--color-ink-3)',
                        marginTop: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <span>{c.example}</span>
                      <button
                        onClick={() => speakWord(c.example!)}
                        style={{
                          border: 'none', background: 'transparent', color: gold,
                          cursor: 'pointer', fontSize: 11, padding: 0, lineHeight: 1, flexShrink: 0,
                        }}
                        title={t('a11y.play_audio', lang)}
                      >
                        🔊
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--color-ink-3)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {t('analyze.grammar.examples_label', lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {examples.map((ex, i) => (
              <div
                key={i}
                style={{
                  borderLeft: `3px solid ${gold}`,
                  padding: '8px 12px',
                  background: 'var(--color-surface-1)',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Noto Sans KR', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--color-ink-1)',
                        lineHeight: 1.55,
                      }}
                    >
                      {ex.ko}
                    </div>
                    {ex.zh && (
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--color-ink-3)',
                          marginTop: 2,
                          lineHeight: 1.5,
                        }}
                      >
                        {ex.zh}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => speakWord(ex.ko)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      border: '1px solid var(--color-border-1)',
                      background: 'transparent',
                      color: gold,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 11,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    title={t('a11y.play_audio', lang)}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contrast */}
      {g.contrast && (
        <div
          style={{
            marginBottom: 10,
            padding: 12,
            borderRadius: 10,
            background: 'var(--color-mint-soft)',
            border: '1px solid rgba(174,227,216,.4)',
            fontSize: 12,
            color: 'var(--color-mint-strong)',
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 9,
              fontWeight: 700,
              marginRight: 6,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
            }}
          >
            {t('analyze.grammar.contrast_label', lang)}
          </span>
          {g.contrast}
        </div>
      )}

      {/* Pitfall */}
      {g.mistake && (
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            background: 'var(--color-gold-soft)',
            border: '1px solid var(--color-gold-base)',
            fontSize: 12,
            color: 'var(--color-status-danger)',
            lineHeight: 1.55,
          }}
        >
          <div
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--color-status-danger)',
              marginBottom: 2,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
            }}
          >
            ⚠ {t('analyze.grammar.mistake_label', lang)}
          </div>
          {g.mistake}
        </div>
      )}
    </div>
  );
}
