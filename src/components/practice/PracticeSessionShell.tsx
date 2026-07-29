'use client';

import { type ReactNode } from 'react';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../app/practice/practice-redesign.css';
import '../../app/practice/practice-session.css';

export type PracticeTone = 'mint' | 'peach' | 'purple' | 'pink';

interface PracticeSessionShellProps {
  tone: PracticeTone;
  /** 模式中文名(如「默写练习」) */
  modeName: string;
  /** 模式韩文副标(如「받아쓰기」) */
  modeKr?: string;
  /** 当前题号,1-based。传 0 表示不显示进度 */
  current?: number;
  /** 总题数 */
  total?: number;
  /** 点击返回按钮 */
  onBack: () => void;
  /** 点击右上角 ⋯ 打开设置面板;不传则不显示 */
  onMore?: () => void;
  /** 主 CTA 文案 */
  ctaLabel?: string;
  /** 主 CTA 点击 · 传 null 隐藏主 CTA */
  onCta?: (() => void) | null;
  /** CTA 是否禁用 */
  ctaDisabled?: boolean;
  /** 是否显示第二个 ghost CTA(用于"再说一次"这类) */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** 中区内容 · 各模式自渲染 */
  children: ReactNode;
}

export function PracticeSessionShell({
  tone,
  modeName,
  modeKr,
  current = 0,
  total = 0,
  onBack,
  onMore,
  ctaLabel,
  onCta,
  ctaDisabled = false,
  secondaryLabel,
  onSecondary,
  children,
}: PracticeSessionShellProps) {
  const { lang } = useLang();
  const showProgress = current > 0 && total > 0;
  const useDots = total > 0 && total <= 7;

  return (
    <div className="pr-scope pr-session">
      <header className={`pr-ss-top ${tone}`} role="banner">
        <button className="pr-ss-back" onClick={onBack} aria-label={t('prac.shell_exit_aria', lang)}>
          <ArrowLeft size={18} />
        </button>

        {showProgress ? (
          <div className="pr-ss-progress" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
            {useDots ? (
              <div className="pr-ss-dots" aria-hidden>
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={`pr-ss-dot${i < current - 1 ? ' done' : i === current - 1 ? ' active' : ''}`}
                  />
                ))}
              </div>
            ) : (
              <div className="pr-ss-bar" aria-hidden>
                <div className="pr-ss-bar-fill" style={{ width: `${(current / total) * 100}%` }} />
              </div>
            )}
            <span className="pr-ss-count">{current} / {total}</span>
          </div>
        ) : (
          <div className="pr-ss-progress" aria-hidden>
            <span className="pr-ss-count" style={{ marginLeft: 4 }}>{modeName}</span>
          </div>
        )}

        {onMore && (
          <button className="pr-ss-more" onClick={onMore} aria-label={t('prac.shell_more_aria', lang)}>
            <MoreHorizontal size={18} />
          </button>
        )}
      </header>

      <main className="pr-ss-stage">
        <div className={`pr-ss-eyebrow ${tone}`} style={{ color: `var(--hr-${tone}-strong)` }}>
          <span className="pr-ss-eyebrow-dot" />
          {modeName}
          {modeKr && <span className="pr-ss-eyebrow-kr">{modeKr}</span>}
        </div>
        {children}
      </main>

      {(onCta || onSecondary) && (
        <footer className="pr-ss-bottom" role="contentinfo">
          <div className="pr-ss-bottom-inner">
            {onSecondary && secondaryLabel && (
              <button className="pr-ss-cta ghost" onClick={onSecondary}>{secondaryLabel}</button>
            )}
            {onCta && ctaLabel && (
              <button className="pr-ss-cta" onClick={onCta} disabled={ctaDisabled}>
                {ctaLabel}
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
