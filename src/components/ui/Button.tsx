'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Tone = 'pink' | 'black' | 'mint';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const SIZE: Record<Size, { h: number; px: number; fs: number; gap: number }> = {
  sm: { h: 32, px: 12, fs: 13, gap: 6 },
  md: { h: 40, px: 18, fs: 14, gap: 8 },
  lg: { h: 48, px: 22, fs: 15, gap: 10 },
};

function bgFor(variant: Variant, tone: Tone): string {
  if (variant === 'danger') return 'var(--color-status-danger)';
  if (variant === 'ghost') return 'transparent';
  if (variant === 'secondary') return 'var(--color-surface-3)';
  // primary
  if (tone === 'pink') return 'var(--color-pink-base)';
  if (tone === 'mint') return 'var(--color-mint-base)';
  return 'var(--color-ink-1)'; // black
}

function fgFor(variant: Variant, tone: Tone): string {
  if (variant === 'ghost') return 'var(--color-ink-2)';
  if (variant === 'secondary') return 'var(--color-ink-1)';
  if (variant === 'primary' && tone === 'mint') return 'var(--color-ink-1)';
  return '#ffffff';
}

function borderFor(variant: Variant): string {
  if (variant === 'ghost') return '1px solid var(--color-border-2)';
  if (variant === 'secondary') return '1px solid var(--color-border-1)';
  return 'none';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    tone = 'black',
    icon,
    loading = false,
    fullWidth = false,
    disabled,
    children,
    className,
    style,
    ...rest
  },
  ref,
) {
  const s = SIZE[size];
  const isDisabled = disabled || loading;

  const css: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.h,
    paddingInline: s.px,
    fontSize: s.fs,
    fontWeight: 700,
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    background: bgFor(variant, tone),
    color: fgFor(variant, tone),
    border: borderFor(variant),
    boxShadow: variant === 'primary' || variant === 'danger' ? 'var(--shadow-sm)' : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.55 : 1,
    transition: 'transform var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft), opacity var(--dur-fast) var(--ease-soft)',
    width: fullWidth ? '100%' : undefined,
    whiteSpace: 'nowrap',
    ...(style ?? {}),
  };

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={['tori-btn', className ?? ''].filter(Boolean).join(' ')}
      style={css}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          style={{
            width: s.fs,
            height: s.fs,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'tori-spin 0.7s linear infinite',
          }}
        />
      ) : icon ? (
        <span style={{ display: 'inline-flex' }}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
});
