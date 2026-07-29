'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Tone = 'pink' | 'black' | 'mint' | 'gold';
type Shape = 'pill' | 'rounded';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  shape?: Shape;
  /** 左侧图标 */
  icon?: ReactNode;
  /** 右侧图标（如 ChevronRight） */
  trailingIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const SIZE: Record<Size, { h: number; px: number; fs: number; gap: number }> = {
  sm: { h: 36, px: 14, fs: 13, gap: 6 },
  md: { h: 44, px: 20, fs: 14, gap: 8 },
  lg: { h: 52, px: 26, fs: 16, gap: 10 },
};

function bgFor(variant: Variant, tone: Tone): string {
  if (variant === 'danger') return 'var(--color-status-danger)';
  if (variant === 'ghost' || variant === 'text') return 'transparent';
  if (variant === 'secondary') return 'var(--color-surface-3)';
  // primary
  if (tone === 'pink') return 'var(--color-pink-base)';
  if (tone === 'mint') return 'var(--color-mint-base)';
  if (tone === 'gold') return 'var(--color-gold-base)';
  return 'var(--color-ink-1)'; // black
}

function fgFor(variant: Variant, tone: Tone): string {
  if (variant === 'ghost') return 'var(--color-ink-2)';
  if (variant === 'text') {
    if (tone === 'pink') return 'var(--color-pink-strong)';
    if (tone === 'mint') return 'var(--color-mint-strong)';
    if (tone === 'gold') return 'var(--color-gold-strong)';
    return 'var(--color-ink-1)';
  }
  if (variant === 'secondary') return 'var(--color-ink-1)';
  if (variant === 'primary' && tone === 'mint') return 'var(--color-ink-1)';
  // black primary 背景用会翻转的 ink-1，文字必须用同样翻转的 surface-1，否则暗色浅底白字对比不足
  if (variant === 'primary' && tone === 'black') return 'var(--color-surface-1)';
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
    shape = 'pill',
    icon,
    trailingIcon,
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
  const isElevated = variant === 'primary' || variant === 'danger';

  const css: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    minHeight: s.h,                     // touch standard 44px
    paddingInline: variant === 'text' ? 0 : s.px,
    fontSize: s.fs,
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: 'var(--tracking-snug)',
    lineHeight: 1,
    borderRadius:
      shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-md)',
    background: bgFor(variant, tone),
    color: fgFor(variant, tone),
    border: borderFor(variant),
    boxShadow: isElevated ? 'var(--shadow-sm)' : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    transition:
      'transform var(--dur-fast) var(--ease-out-quart), ' +
      'box-shadow var(--dur-fast) var(--ease-out-quart), ' +
      'background var(--dur-fast) var(--ease-out-quart), ' +
      'opacity var(--dur-fast) var(--ease-out-quart)',
    width: fullWidth ? '100%' : undefined,
    whiteSpace: 'nowrap',
    outline: 'none',
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
        <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>
      ) : null}
      {children}
      {!loading && trailingIcon && (
        <span style={{ display: 'inline-flex', flexShrink: 0 }}>{trailingIcon}</span>
      )}
    </button>
  );
});
