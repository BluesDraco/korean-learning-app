'use client';

import { forwardRef, type ReactNode, type HTMLAttributes, type CSSProperties } from 'react';

type Variant = 'default' | 'flat' | 'outlined' | 'tinted' | 'hero' | 'feature' | 'stat' | 'row';
type Tone = 'neutral' | 'pink' | 'mint' | 'peach' | 'purple' | 'cream' | 'gold';
type Padding = 'sm' | 'md' | 'lg' | 'none';
type AsTag = 'div' | 'button' | 'a';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  variant?: Variant;
  tone?: Tone;
  padding?: Padding;
  interactive?: boolean;
  as?: AsTag;
  href?: string;
  children?: ReactNode;
}

const PAD: Record<Padding, string> = {
  none: '0',
  sm: '12px 14px',
  md: '16px 18px',
  lg: '20px 24px',
};

const TONE_BG: Record<Tone, string> = {
  neutral: 'var(--color-surface-2)',
  pink:    'var(--color-pink-soft)',
  mint:    'var(--color-mint-soft)',
  peach:   'var(--color-peach-soft)',
  purple:  'var(--color-purple-soft)',
  cream:   'var(--color-surface-3)',
  gold:    'var(--color-gold-soft)',
};

const TONE_BORDER: Record<Tone, string> = {
  neutral: 'var(--color-border-1)',
  pink:    'var(--color-pink-base)',
  mint:    'var(--color-mint-base)',
  peach:   'var(--color-peach-base)',
  purple:  'var(--color-purple-base)',
  cream:   'var(--color-border-2)',
  gold:    'var(--color-gold-base)',
};

const TONE_HERO_GRADIENT: Record<Tone, string> = {
  neutral: 'linear-gradient(135deg, var(--color-surface-2), var(--hero-grad-end-neutral))',
  pink:    'linear-gradient(135deg, var(--color-pink-soft), var(--hero-grad-end-pink))',
  mint:    'linear-gradient(135deg, var(--color-mint-soft), var(--hero-grad-end-mint))',
  peach:   'linear-gradient(135deg, var(--color-peach-soft), var(--hero-grad-end-peach))',
  purple:  'linear-gradient(135deg, var(--color-purple-soft), var(--hero-grad-end-purple))',
  cream:   'linear-gradient(135deg, var(--color-surface-3), var(--color-surface-2))',
  gold:    'linear-gradient(135deg, var(--color-gold-soft), #fffbf3)',
};

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'default',
    tone = 'neutral',
    padding,
    interactive = false,
    as,
    href,
    children,
    className,
    style,
    ...rest
  },
  ref,
) {
  const Tag = (as ?? (href ? 'a' : 'div')) as AsTag;
  const effectivePadding =
    padding ?? (variant === 'hero' ? 'lg' : variant === 'row' ? 'sm' : 'md');

  const base: CSSProperties = {
    display: variant === 'row' ? 'flex' : 'block',
    alignItems: variant === 'row' ? 'center' : undefined,
    gap: variant === 'row' ? 12 : undefined,
    width: '100%',
    textAlign: 'left',
    background:
      variant === 'hero'
        ? TONE_HERO_GRADIENT[tone]
        : variant === 'flat'
          ? 'transparent'
          : variant === 'outlined'
            ? 'var(--color-surface-2)'
            : variant === 'tinted'
              ? TONE_BG[tone]
              : variant === 'feature' || variant === 'stat'
                ? TONE_BG[tone]
                : 'var(--color-surface-2)',
    border:
      variant === 'flat'
        ? 'none'
        : variant === 'outlined'
          ? `1.5px solid ${TONE_BORDER[tone]}`
          : '1px solid var(--color-border-1)',
    borderRadius:
      variant === 'hero'
        ? 'var(--radius-xl)'
        : variant === 'row'
          ? 'var(--radius-md)'
          : 'var(--radius-lg)',
    padding: PAD[effectivePadding],
    boxShadow:
      variant === 'flat' || variant === 'outlined'
        ? 'none'
        : variant === 'hero'
          ? 'var(--shadow-md)'
          : variant === 'stat'
            ? 'var(--shadow-xs)'
            : 'var(--shadow-sm)',
    transition:
      'transform var(--dur-base) var(--ease-out-quart), ' +
      'box-shadow var(--dur-base) var(--ease-out-quart), ' +
      'border-color var(--dur-base) var(--ease-out-quart)',
    cursor: interactive || Tag !== 'div' ? 'pointer' : undefined,
    color: 'var(--color-ink-1)',
    // 当 Card 渲染为 <button> 时，重置浏览器默认样式
    ...(Tag === 'button'
      ? { fontFamily: 'inherit', appearance: 'none' as const, WebkitAppearance: 'none' as const }
      : {}),
    ...(style ?? {}),
  };

  const cls = [
    'tori-card',
    interactive ? 'tori-card-interactive' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref as never}
      href={Tag === 'a' ? href : undefined}
      className={cls}
      style={base}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  );
});
