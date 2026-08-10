'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export type StateKind = 'empty' | 'loading' | 'error';

export interface StatePlaceholderProps {
  [k: string]: unknown;
  kind: StateKind;
  title?: string;
  description?: string;
  /** 主操作。href 走 next/link，onClick 走 button */
  cta?: { label: string; onClick?: () => void; href?: string };
  /** 次操作 */
  secondaryCta?: { label: string; onClick?: () => void; href?: string };
  /** Tori pose 编号 01-10，未传则按 kind 自动选 */
  toriPose?: string;
  /** inline：嵌在卡片里小占位 / page：整页空态 */
  size?: 'inline' | 'page';
  className?: string;
  children?: ReactNode;
}

const DEFAULT_TORI_POSE: Record<StateKind, string> = {
  empty: '03',
  loading: '07',
  error: '06',
};

const DEFAULT_TITLE_KEY: Record<StateKind, string> = {
  empty: 'ui.sp_empty_title',
  loading: 'ui.sp_loading_title',
  error: 'ui.sp_error_title',
};

const DEFAULT_DESC_KEY: Record<StateKind, string> = {
  empty: 'ui.sp_empty_desc',
  loading: 'ui.sp_loading_desc',
  error: 'ui.sp_error_desc',
};

/**
 * StatePlaceholder — 统一空态 / 加载 / 错误占位
 * 替代分散的 EmptyState / LoadingState / ErrorState
 */
export function StatePlaceholder({
  kind,
  title,
  description,
  cta,
  secondaryCta,
  toriPose,
  size = 'page',
  className = '',
  children,
}: StatePlaceholderProps) {
  const { lang } = useLang();
  const pose = toriPose ?? DEFAULT_TORI_POSE[kind];
  const _title = title ?? t(DEFAULT_TITLE_KEY[kind], lang);
  const _desc = description ?? t(DEFAULT_DESC_KEY[kind], lang);

  const ariaProps =
    kind === 'loading'
      ? { role: 'status' as const, 'aria-live': 'polite' as const }
      : kind === 'error'
        ? { role: 'alert' as const, 'aria-live': 'assertive' as const }
        : { role: 'status' as const };

  const padding = size === 'page' ? '64px 24px' : '24px 16px';
  const imgSize = size === 'page' ? 120 : 72;

  return (
    <div
      {...ariaProps}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding,
        gap: 14,
      }}
    >
      <div
        style={{
          width: imgSize,
          height: imgSize,
          borderRadius: '50%',
          background: 'var(--color-surface-2)',
          border: '1.5px solid var(--color-border-1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: 4,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/tori-poses/tori-pose-${pose}.webp`}
          alt=""
          width={imgSize * 0.78}
          height={imgSize * 0.78}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: size === 'page' ? 'var(--text-md)' : 'var(--text-base)',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: 'var(--tracking-snug)',
          color: 'var(--color-ink-1)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        {kind === 'loading' ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {_title}
            <LoadingDots />
          </span>
        ) : (
          _title
        )}
      </h3>

      {_desc && (
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-sm)',
            color: 'var(--color-ink-3)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 280,
          }}
        >
          {_desc}
        </p>
      )}

      {children}

      {(cta || secondaryCta) && (
        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {cta && <CtaButton {...cta} variant="primary" tone="pink" />}
          {secondaryCta && <CtaButton {...secondaryCta} variant="ghost" />}
        </div>
      )}
    </div>
  );
}

function CtaButton({
  label,
  onClick,
  href,
  variant,
  tone,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  variant: 'primary' | 'ghost';
  tone?: 'pink';
}) {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        <Button variant={variant} tone={tone} size="md">
          {label}
        </Button>
      </Link>
    );
  }
  return (
    <Button variant={variant} tone={tone} size="md" onClick={onClick}>
      {label}
    </Button>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-pink-base)',
            animation: 'tori-dot-bounce 1.2s var(--ease-out-quart) infinite',
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </span>
  );
}
