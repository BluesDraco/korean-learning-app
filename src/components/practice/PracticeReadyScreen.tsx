'use client';

import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { type PracticeTone } from './PracticeSessionShell';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../app/practice/practice-redesign.css';
import '../../app/practice/practice-flow.css';

interface PracticeReadyScreenProps {
  [k: string]: unknown;
  tone: PracticeTone;
  /** 模式编号 · 01/02/03 */
  eyebrow: string;
  /** 韩语名 */
  kr: string;
  /** 英文名(serif italic) */
  en: string;
  /** 一句介绍 */
  intro: string;
  /** 题数 */
  count: number;
  /** 上次表现 · 有值时显示 mini stat */
  lastScore?: { value: string | number; unit?: string; hint?: string };
  /** 开始按钮点击 */
  onStart: () => void;
  /** 返回按钮点击 · 不传则隐藏 */
  onBack?: () => void;
  /** CTA 文案 · 默认「开始」 */
  ctaLabel?: string;
  /** CTA 禁用(加载中) */
  ctaDisabled?: boolean;
  /** 追加节点(如权限提示) */
  extra?: ReactNode;
  /** 底部软引导 4 圆点 · 传节点(如 <PracticeNextHint>) */
  hint?: ReactNode;
  /** 题源预览 · 传对象自动显示"你的错题 X 道 + 保存的句 X 道 + ..." */
  poolPreview?: { mistake: number; myStuff: number; system: number };
  /** 换一批 · 传 handler 时显示按钮,允许用户丢掉今日缓存重新生成 */
  onRegenerate?: () => void;
}

export function PracticeReadyScreen({
  tone,
  eyebrow,
  kr,
  en,
  intro,
  count,
  lastScore,
  onStart,
  onBack,
  ctaLabel,
  ctaDisabled = false,
  extra,
  hint,
  poolPreview,
  onRegenerate,
}: PracticeReadyScreenProps) {
  const { lang } = useLang();
  const ctaText = ctaLabel || t('sp.start', lang);
  return (
    <div className="pr-scope">
      <div className="hr-stage" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        {onBack && (
          <div className="hr-mobile-back" style={{ display: 'block' }}>
            <button
              className="hr-mobile-back-btn"
              onClick={onBack}
              aria-label={t('prac.ready_back', lang)}
            >
              <ArrowLeft size={14} /> {t('prac.ready_back', lang)}
            </button>
          </div>
        )}
        <div className="pr-ready">
          <div className={`pr-ready-card ${tone}`}>
            <div className="pr-ready-eyebrow">{eyebrow}</div>
            <div className="pr-ready-kr">{kr}</div>
            <div className="pr-ready-name">{en}</div>
            <p className="pr-ready-intro">{intro}</p>
            <div className="pr-ready-count">{t('prac.ready_count', lang, { n: count, min: Math.max(2, Math.round(count * 0.6)) })}</div>
            <button
              className="pr-ready-cta"
              onClick={onStart}
              disabled={ctaDisabled}
              aria-label={t('prac.ready_start_aria', lang, { en })}
            >
              {ctaText}
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                aria-label={t('prac.ready_regen_aria', lang)}
                style={{
                  marginTop: 6, background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--hr-ink-3)', fontSize: 12, textDecoration: 'underline',
                  textDecorationStyle: 'dashed', textUnderlineOffset: 3, padding: '4px 8px',
                  fontFamily: 'var(--hr-sans)',
                }}
              >{t('prac.ready_regen', lang)}</button>
            )}
          </div>
          {lastScore && (
            <div className="pr-ready-mini">
              {t('prac.ready_last', lang)}<strong>{lastScore.value}{lastScore.unit ?? ''}</strong>
              {lastScore.hint && <span>· {lastScore.hint}</span>}
            </div>
          )}
          {poolPreview && (poolPreview.mistake > 0 || poolPreview.myStuff > 0) && (
            <div
              role="note"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
                padding: '10px 14px', borderRadius: 12,
                background: 'var(--hr-surface-2)',
                border: '1.5px dashed var(--hr-border-2)',
                fontSize: 12, color: 'var(--hr-ink-2)', lineHeight: 1.6,
                textAlign: 'center', boxSizing: 'border-box',
              }}
            >
              <span>{t('prac.ready_source_title', lang)}</span>
              {poolPreview.mistake > 0 && (
                <span style={{ fontWeight: 700, color: 'var(--hr-pink-strong)' }}>
                  {t('prac.ready_pool_mistake', lang, { n: poolPreview.mistake })}
                </span>
              )}
              {poolPreview.myStuff > 0 && (
                <span style={{ fontWeight: 700, color: 'var(--hr-peach-strong)' }}>
                  {t('prac.ready_pool_mine', lang, { n: poolPreview.myStuff })}
                </span>
              )}
              {poolPreview.system > 0 && (
                <span style={{ color: 'var(--hr-ink-3)' }}>
                  {t('prac.ready_pool_system', lang, { n: poolPreview.system })}
                </span>
              )}
            </div>
          )}
          {extra}
          {hint}
        </div>
      </div>
    </div>
  );
}
