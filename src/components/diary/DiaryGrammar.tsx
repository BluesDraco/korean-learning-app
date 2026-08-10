'use client';

import { useState, useRef } from 'react';
import type { ToriDay, ToriGrammar } from '@/types/tori-diary';
import { ChevronRight, ChevronDown, Lightbulb, Sparkles } from 'lucide-react';
import { TappableText } from '@/components/TappableText';
import { DiaryLineActions } from './DiaryLineActions';
import { romanize } from '@/lib/dictionary';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { KoZh, KoZhHighlight } from '@/types/inline';

type BreakdownToken = { text: string; role: string };
// Module-level cache: sentence → tokens
const breakdownCache = new Map<string, BreakdownToken[]>();

interface Props {
  [k: string]: unknown;
  day: ToriDay;
  onComplete: () => void;
  onBack?: () => void;
}

export function DiaryGrammar({ day, onComplete, onBack }: Props) {
  const { lang } = useLang();
  const g = day.grammar;
  const source = `tori-diary-day-${day.day}`;
  // 逐段揭开：用户点「继续」依次展开 公式→用法→规则→例句→易错点
  const [step, setStep] = useState(1);
  const totalSteps = g?.pitfall ? 5 : 4;
  const allRevealed = step >= totalSteps;
  const completedRef = useRef(false);
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // 数据缺失守卫
  if (!g) {
    return (
      <div className="diary-anim-fade-up" style={{ padding: 24, textAlign: 'center' }}>
        <p className="diary-text-soft" style={{ marginBottom: 16 }}>{t('diary.gr.empty', lang)}</p>
        <button onClick={safeComplete} className="diary-btn diary-btn-primary">{t('diary.gr.next', lang)}</button>
      </div>
    );
  }

  // 将规则文本自动分段：① 加粗标题独立一行 ② 句号处换行 ③ line-height 2.0
  const formatRule = (raw: string) => {
    let html = raw.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--diary-stamp-red);font-weight:700;">$1</strong>');
    // "**关键词**：文字" → 关键词独立一行 + 下文缩进
    html = html.replace(
      /(<strong[^>]*>.*?<\/strong>)[：:]\s*/g,
      '<span style="display:block;margin-bottom:4px;">$1：</span>'
    );
    // "。" → "。<br>" 视觉断句
    html = html.replace(/。\s*(?!$)/g, '。<br>');
    return html;
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-pink">{t('diary.gr.tag', lang)}</span>
      </div>

      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {g.title}
      </h2>

      {/* step 1 · 句式 pattern — 核心公式 突出展示 */}
      <div
        className="diary-card-paper diary-anim-fade-up"
        style={{
          background: 'linear-gradient(135deg, var(--diary-gold-soft), var(--diary-paper))',
          border: '2px solid var(--diary-gold)',
          padding: '16px 20px',
          marginTop: 12,
          marginBottom: 22,
          textAlign: 'center',
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(200,153,91,.08)',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--diary-gold-deep)', marginBottom: 6, textTransform: 'uppercase' }}>
          {t('diary.gr.patternLabel', lang)}
        </div>
        <span
          className="diary-handwriting-ko"
          style={{ fontSize: 'var(--diary-text-xl)', color: 'var(--diary-ink)', fontWeight: 700, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: g.pattern.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--diary-stamp-red);">$1</strong>') }}
        />
      </div>

      {/* step 2 · 用法说明 */}
      {step >= 2 && (
      <div className="diary-anim-fade-up" style={{ marginBottom: 24 }}>
        <p className="diary-handwriting-zh" style={{ fontSize: 14, color: 'var(--diary-ink-soft)', lineHeight: 2.0, margin: 0 }}>
          <span style={{ color: 'var(--diary-gold-deep)', fontWeight: 700, display: 'block', marginBottom: 6 }}>🔍 {t('diary.gr.whenToUse', lang)}</span>
          <span dangerouslySetInnerHTML={{ __html: formatRule(g.whenToUse) }} />
        </p>
      </div>
      )}

      {/* step 3 · 规则 — 第一条核心突出，其余统一 */}
      {step >= 3 && (
      <div className="diary-anim-fade-up" style={{ marginBottom: 26 }}>
        <h3 style={{ fontFamily: 'var(--diary-font-zh)', fontSize: 16, color: 'var(--diary-ink)', marginBottom: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: 'var(--diary-grad-accent)', color: '#fff', fontSize: 13, fontWeight: 800 }}>R</span>
          {t('diary.gr.rulesHeading', lang)}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.rules.map((rule, i) => {
            const isCore = i === 0;
            return (
              <div
                key={i}
                style={{
                  padding: isCore ? '16px 18px 16px 52px' : '10px 14px 10px 38px',
                  position: 'relative',
                  background: isCore
                    ? 'linear-gradient(135deg, var(--diary-gold-soft), var(--diary-paper))'
                    : i % 2 === 1 ? 'var(--diary-paper-deep)' : 'var(--diary-paper)',
                  borderRadius: isCore ? 14 : 10,
                  border: isCore ? '2px solid var(--diary-gold)' : '1px solid var(--diary-line)',
                  fontSize: isCore ? 15 : 14,
                  color: 'var(--diary-ink)',
                  lineHeight: 2.1,
                  fontFamily: 'var(--diary-font-zh)',
                  boxShadow: isCore ? '0 2px 8px rgba(200,153,91,.1)' : 'none',
                }}
              >
                {isCore && (
                  <span style={{
                    position: 'absolute', right: 14, top: -10,
                    padding: '2px 10px', borderRadius: 99,
                    background: 'var(--diary-grad-accent)', color: '#fff',
                    fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                    fontFamily: "'Inter',sans-serif",
                  }}>
                    {t('diary.gr.core', lang)}
                  </span>
                )}
                <span style={{
                  position: 'absolute', left: isCore ? 14 : 10, top: isCore ? 15 : 9,
                  width: isCore ? 28 : 22, height: isCore ? 28 : 22, borderRadius: '50%',
                  background: isCore ? 'var(--diary-gold)' : 'var(--diary-paper)',
                  border: isCore ? 'none' : '1.5px solid var(--diary-gold)',
                  color: isCore ? '#fff' : 'var(--diary-gold-deep)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isCore ? 13 : 11, fontWeight: 800,
                  fontFamily: "'Inter',sans-serif",
                }}>
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatRule(rule) }} />
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* step 4 · 例句 — 改进折叠视觉 */}
      {step >= 4 && (
      <div className="diary-anim-fade-up" style={{ marginBottom: 26 }}>
        <h3 style={{ fontFamily: 'var(--diary-font-zh)', fontSize: 16, color: 'var(--diary-ink)', marginBottom: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: 'var(--diary-grad-accent)', color: '#fff', fontSize: 13, fontWeight: 800 }}>{t('diary.gr.exampleStamp', lang)}</span>
          {t('diary.gr.examplesHeading', lang)} <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--diary-ink-faint)', marginLeft: 4 }}>{t('diary.gr.examplesHint', lang)}</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.examples.map((ex, i) => (
            <ExampleRow key={i} ex={ex} grammar={g} source={source} index={i} />
          ))}
        </div>
      </div>
      )}

      {/* step 5 · 易错点 — 醒目标识 */}
      {step >= 5 && g.pitfall && (
        <div
          className="diary-anim-fade-up"
          style={{
            padding: '14px 18px',
            background: 'var(--diary-paper-deep)',
            border: '1.5px solid var(--diary-gold)',
            borderRadius: 14,
            marginBottom: 28,
            boxShadow: '0 2px 8px rgba(200,153,91,.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Lightbulb size={16} color="var(--diary-stamp-red)" />
            <strong className="diary-handwriting-zh" style={{ fontSize: 14, color: 'var(--diary-stamp-red)', letterSpacing: '.04em' }}>
              {t('diary.gr.pitfallHeading', lang)}
            </strong>
          </div>
          <span
            className="diary-handwriting-zh"
            style={{ fontSize: 13, color: 'var(--diary-ink)', lineHeight: 2.0, display: 'block' }}
            dangerouslySetInnerHTML={{ __html: formatRule(g.pitfall) }}
          />
        </div>
      )}

      {allRevealed && (
        <div className="diary-anim-fade-up" style={{ textAlign: 'center', marginBottom: 16 }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openCarrot'))}
            className="diary-handwriting-zh"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--diary-ink-faint)' }}
          >
            🥕 {t('diary.gr.askCarrot', lang)}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{
            flex: 1, height: 52, borderRadius: 14,
            background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)',
            border: '1px solid var(--diary-line)', cursor: 'pointer',
            fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)',
          }}>
            {t('diary.gr.prev', lang)}
          </button>
        )}
        {!allRevealed ? (
          <button
            onClick={() => { sfxPop(); setStep((s) => Math.min(s + 1, totalSteps)); }}
            className="diary-btn diary-btn-primary"
            style={{ flex: 2 }}
          >
            {t('diary.gr.continue', lang)} <span style={{ fontSize: 12, opacity: 0.8, marginLeft: 4 }}>{step}/{totalSteps}</span> <ChevronDown size={16} />
          </button>
        ) : (
          <button onClick={safeComplete} className="diary-btn diary-btn-primary" style={{ flex: 2 }}>
            {t('diary.gr.gotIt', lang)} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

interface ExampleRowProps {
  [k: string]: unknown;
  ex: KoZhHighlight;
  grammar: ToriGrammar;
  source: string;
  index: number;
}

function ExampleRow({ ex, grammar, source, index }: ExampleRowProps) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [tokens, setTokens] = useState<BreakdownToken[] | null>(
    breakdownCache.get(ex.ko) ?? null
  );
  const [loading, setLoading] = useState(false);

  const fetchBreakdown = async () => {
    if (breakdownCache.has(ex.ko)) {
      setTokens(breakdownCache.get(ex.ko)!);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/ai/grammar-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: ex.ko, grammarTitle: grammar.title }),
      });
      if (res.ok) {
        const data = await res.json();
        const toks: BreakdownToken[] = data.tokens ?? [];
        breakdownCache.set(ex.ko, toks);
        setTokens(toks);
      }
    } catch { /* fallback to note */ }
    finally { setLoading(false); }
  };

  const handleExpand = () => {
    sfxPop();
    const next = !expanded;
    setExpanded(next);
    if (next && tokens === null) fetchBreakdown();
  };

  // 韩文带 highlight 的渲染
  const koNode = ex.highlight
    ? (
        <span>
          {ex.ko.split(ex.highlight).reduce<React.ReactNode[]>((acc, part, idx, arr) => {
            if (part) acc.push(<TappableText key={`p-${idx}`} text={part} source={source} />);
            if (idx < arr.length - 1) {
              acc.push(
                <span key={`h-${idx}`} style={{ color: 'var(--diary-stamp-red)', fontWeight: 800 }}>
                  <TappableText text={ex.highlight!} source={source} />
                </span>
              );
            }
            return acc;
          }, [])}
        </span>
      )
    : <TappableText text={ex.ko} source={source} />;

  return (
    <div
      style={{
        padding: '12px 14px 12px 44px',
        background: 'var(--diary-paper-deep)',
        borderLeft: '3px solid var(--diary-gold)',
        borderRadius: 'var(--diary-r-sm)',
        position: 'relative',
      }}
    >
      <span style={{
        position: 'absolute', left: 10, top: 12,
        width: 22, height: 22, borderRadius: '50%',
        background: 'var(--diary-gold-soft)',
        border: '1.5px solid var(--diary-gold)',
        color: 'var(--diary-gold-deep)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, fontFamily: "'Inter',sans-serif",
      }}>
        {index + 1}
      </span>
      {/* 文字整段独占一行，不再被右侧按钮挤压换行 */}
      <div className="diary-handwriting-ko" style={{ fontSize: 15, color: 'var(--diary-ink)', lineHeight: 1.5 }}>
        {koNode}
      </div>
      <div style={{ fontSize: 11, color: 'var(--diary-ink-faint)', marginTop: 2, fontStyle: 'italic', letterSpacing: '.01em' }}>
        {romanize(ex.ko)}
      </div>
      <div className="diary-handwriting-zh" style={{ fontSize: 12, color: 'var(--diary-ink-faint)', marginTop: 3 }}>
        {ex.zh}
      </div>
      {/* 操作栏：文字下方独占一行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <DiaryLineActions ko={ex.ko} zh={ex.zh} source={source} />
        <span style={{ flex: 1 }} />
        <button
          onClick={handleExpand}
          aria-label={expanded ? t('diary.gr.collapse', lang) : t('diary.gr.expand', lang)}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 4,
            color: 'var(--diary-gold-deep)',
            display: 'inline-flex',
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {expanded && (
        <div
          className="diary-anim-fade-up"
          style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--diary-line)' }}
        >
          {/* AI 词素拆解 */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, color: 'var(--diary-gold-deep)', fontSize: 12 }}>
              <Sparkles size={13} style={{ animation: 'spin 1s linear infinite' }} />
              <span className="diary-handwriting-zh">{t('diary.gr.aiParsing', lang)}</span>
            </div>
          )}

          {tokens && tokens.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {tokens.map((tok, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div
                    className="diary-handwriting-ko"
                    style={{
                      fontSize: 'var(--diary-text-md)',
                      fontWeight: 700,
                      color: 'var(--diary-ink)',
                      background: 'var(--diary-paper)',
                      border: '1.5px solid var(--diary-gold)',
                      borderRadius: 8,
                      padding: '4px 10px',
                      marginBottom: 4,
                    }}
                  >
                    <TappableText text={tok.text} source={source} />
                  </div>
                  <div className="diary-handwriting-zh" style={{ fontSize: 10, color: 'var(--diary-ink-faint)', maxWidth: 80, lineHeight: 1.4 }}>
                    {tok.role}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* fallback: static note（AI失败时显示） */}
          {!loading && !tokens && (ex.note || grammar.whenToUse) && (
            <div
              className="diary-handwriting-zh"
              style={{ fontSize: 'var(--diary-text-xs)', color: 'var(--diary-ink-faint)', lineHeight: 1.6, marginBottom: 10, paddingLeft: 8, borderLeft: '2px solid var(--diary-line)' }}
              dangerouslySetInnerHTML={{
                __html: ex.note
                  ? ex.note.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--diary-stamp-red);">$1</strong>')
                  : `<strong style="color:var(--diary-gold-deep);">${t('diary.gr.grammarPointLabel', lang)}</strong>${grammar.whenToUse}`,
              }}
            />
          )}

        </div>
      )}
    </div>
  );
}
