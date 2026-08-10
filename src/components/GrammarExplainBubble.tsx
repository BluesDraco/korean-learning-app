'use client';

import { useCallback, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface GrammarParticle { text: string; role: string; }
interface GrammarEnding { text: string; base: string; meaning: string; }
interface GrammarExplain {
  [k: string]: unknown;
  skeleton: { subject: string; predicate: string; object: string };
  translation: string;
  particles: GrammarParticle[];
  endings: GrammarEnding[];
  pitfalls: string[];
}

interface Props {
  [k: string]: unknown;
  sentence: string;
  translation?: string;
  /** 'inline' 跟在例句下方；'compact' 更紧凑（卡片内嵌） */
  variant?: 'inline' | 'compact';
}

// 配色：走主站 CSS 变量，自动跟随亮/暗模式（原为写死暖棕色，暗色下文字不可见）
// 无容器边注风格：不再需要 bubbleBg / cellBg / particleBg
const C = {
  // 触发按钮（低调链接感，非胶囊）
  btnText: 'var(--color-pink-strong)',
  // 左侧装饰线
  accent: 'var(--color-pink-soft)',
  // 区块标题色
  titleSkeleton: 'var(--color-ink-3)',
  titleParticle: 'var(--color-pink-strong)',
  titleEnding: 'var(--color-ink-3)',
  titlePitfall: 'var(--color-gold-strong)',
  // 内容
  ink: 'var(--color-ink-1)',
  inkSoft: 'var(--color-ink-2)',
  inkFaint: 'var(--color-ink-3)',
  // 助词强调（淡粉文本）
  particleText: 'var(--color-pink-strong)',
  // 词尾
  endingText: 'var(--color-ink-2)',
  // 易错点
  pitfallText: 'var(--color-gold-strong)',
};

const GR_BUBBLE_KEYFRAMES = `
@keyframes grReveal {
  0% { opacity: 0; clip-path: inset(0 0 100% 0); transform: translateY(-4px); }
  100% { opacity: 1; clip-path: inset(0 0 0 0); transform: translateY(0); }
}
@keyframes grLineGrow {
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
@keyframes grBlockIn {
  0% { opacity: 0; transform: translateX(-6px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes grDivider {
  0% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}
`;

export default function GrammarExplainBubble({ sentence, translation }: Props) {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GrammarExplain | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/ai/grammar-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ sentence, translation }),
      });
      if (res.status === 401) { setError(t('gsess.explain_login', lang)); return; }
      const json = await res.json();
      if (!res.ok) { setError(json.error || t('gsess.explain_unavailable', lang)); return; }
      setData(json);
    } catch {
      setError(t('gsess.explain_network_error', lang));
    } finally {
      setLoading(false);
    }
  }, [sentence, translation, lang]);

  if (!data) {
    return (
      <div style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={ask}
          disabled={loading}
          className="gr-trigger-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            padding: 0,
            border: 'none',
            background: 'transparent',
            color: C.btnText,
            fontSize: 11, fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            transition: 'opacity .15s ease',
          }}
        >
          <Sparkles size={11} style={{ flexShrink: 0 }} />
          {loading ? t('gsess.explain_thinking', lang) : t('gsess.explain_trigger', lang)}
        </button>
        {error && <span style={{ fontSize: 11, color: 'var(--color-status-danger)' }}>{error}</span>}
        <style>{`
          .gr-trigger-btn:hover:not(:disabled) { opacity: .7; }
        `}</style>
      </div>
    );
  }

  // 收集 block 用于错位动画 —— 每个 block 有自己的 delay
  const blocks: React.ReactNode[] = [];

  blocks.push(
    <Block key="skeleton" title={t('gsess.explain_skeleton', lang)} titleColor={C.titleSkeleton} delay={0.08}>
      <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.65 }}>
        {data.skeleton.subject && <Token label={t('gsess.explain_subject', lang)}>{data.skeleton.subject}</Token>}
        {data.skeleton.object && <Token label={t('gsess.explain_object', lang)}>{data.skeleton.object}</Token>}
        {data.skeleton.predicate && <Token label={t('gsess.explain_predicate', lang)} highlight highlightColor={C.particleText}>{data.skeleton.predicate}</Token>}
      </div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: C.inkSoft }}>
        → {data.translation}
      </div>
    </Block>
  );

  if (data.particles.length > 0) {
    blocks.push(
      <Block key="particles" title={t('gsess.explain_particles', lang)} titleColor={C.titleParticle} delay={0.16}>
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 14, rowGap: 4, fontSize: 12.5, lineHeight: 1.6 }}>
          {data.particles.map((p, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: C.particleText }}>
                {p.text}
              </span>
              <span style={{ color: C.inkSoft }}>{p.role}</span>
            </span>
          ))}
        </div>
      </Block>
    );
  }

  if (data.endings.length > 0) {
    blocks.push(
      <Block key="endings" title={t('gsess.explain_endings', lang)} titleColor={C.titleEnding} delay={0.24}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5, lineHeight: 1.6 }}>
          {data.endings.map((e, i) => (
            <div key={i}>
              <span style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: C.endingText }}>{e.text}</span>
              <span style={{ color: C.inkFaint, fontSize: 11, marginLeft: 6 }}>← {e.base}</span>
              <span style={{ color: C.inkSoft, marginLeft: 8 }}>{e.meaning}</span>
            </div>
          ))}
        </div>
      </Block>
    );
  }

  if (data.pitfalls.length > 0) {
    blocks.push(
      <Block key="pitfalls" title={t('gsess.explain_pitfalls', lang)} titleColor={C.titlePitfall} delay={0.32}>
        <ul style={{ margin: 0, paddingLeft: 16, color: C.inkSoft, fontSize: 12.5, lineHeight: 1.65 }}>
          {data.pitfalls.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Block>
    );
  }

  return (
    <div
      style={{
        marginTop: 12,
        paddingLeft: 14,
        position: 'relative',
        animation: 'grReveal .45s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      {/* 左侧装饰线：单独动画，从上往下"生长" */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 2,
          background: C.accent,
          transformOrigin: 'top',
          animation: 'grLineGrow .55s cubic-bezier(.2,.7,.2,1) both',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={12} style={{ color: C.btnText, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.16em', color: C.btnText, textTransform: 'uppercase' }}>
            {t('gsess.explain_header', lang)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setData(null)}
          aria-label={t('gsess.explain_close', lang)}
          style={{
            width: 20, height: 20,
            border: 'none', background: 'transparent',
            color: C.inkFaint, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
        >
          <X size={12} />
        </button>
      </div>

      {blocks.map((b, i) => (
        <div key={i}>
          {i > 0 && (
            <div
              aria-hidden
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, var(--color-border-2) 15%, var(--color-border-2) 85%, transparent)',
                margin: '12px 0',
                transformOrigin: 'left',
                animation: `grDivider .45s cubic-bezier(.2,.7,.2,1) ${0.12 + i * 0.08}s both`,
              }}
            />
          )}
          {b}
        </div>
      ))}

      <style>{GR_BUBBLE_KEYFRAMES}</style>
    </div>
  );
}

function Block({ title, titleColor, children, delay = 0 }: { title: string; titleColor: string; children: React.ReactNode; delay?: number }) {
  return (
    <div
      style={{
        animation: `grBlockIn .5s cubic-bezier(.2,.7,.2,1) ${delay}s both`,
      }}
    >
      <div style={{
        fontFamily: "'Inter','PingFang SC',sans-serif",
        fontSize: 10, fontWeight: 700, letterSpacing: '.16em',
        color: titleColor, textTransform: 'uppercase',
        marginBottom: 6,
      }}>{title}</div>
      {children}
    </div>
  );
}

function Token({ label, highlight, highlightColor, children }: { label: string; highlight?: boolean; highlightColor?: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 4,
      marginRight: 10, marginBottom: 4,
    }}>
      <span style={{ fontSize: 10, color: 'var(--color-ink-3)', letterSpacing: '.08em' }}>{label}</span>
      <span style={{
        fontFamily: "'Noto Sans KR',sans-serif",
        fontWeight: 600,
        color: highlight ? (highlightColor ?? 'var(--color-pink-strong)') : 'var(--color-ink-1)',
      }}>{children}</span>
    </span>
  );
}
