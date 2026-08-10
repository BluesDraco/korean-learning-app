'use client';

export type ProgressBarTone = 'pink' | 'mint' | 'gold' | 'peach' | 'purple';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  [k: string]: unknown;
  /** 0-100。indeterminate 时忽略 */
  value?: number;
  size?: ProgressBarSize;
  tone?: ProgressBarTone;
  /** API 等待场景：内部条横向滑动 */
  indeterminate?: boolean;
  /** a11y 标签 */
  label?: string;
  className?: string;
}

const SIZE_HEIGHT: Record<ProgressBarSize, number> = {
  sm: 6,
  md: 10,
  lg: 14,
};

const TONE_FILL: Record<ProgressBarTone, string> = {
  pink: 'var(--color-pink-base)',
  mint: 'var(--color-mint-base)',
  gold: 'var(--color-gold-base)',
  peach: 'var(--color-peach-base)',
  purple: 'var(--color-purple-base)',
};

/**
 * ProgressBar — 进度条
 *
 * - 圆角 pill
 * - tone 控制填充色（不影响轨道）
 * - indeterminate: 内部条 keyframe 横向走动（CSS only）
 */
export function ProgressBar({
  value,
  size = 'md',
  tone = 'pink',
  indeterminate = false,
  label,
  className = '',
}: ProgressBarProps) {
  const height = SIZE_HEIGHT[size];
  const safeValue = Math.max(0, Math.min(100, value ?? 0));

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: 'var(--color-surface-3)',
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: indeterminate ? '-40%' : 0,
          height: '100%',
          width: indeterminate ? '40%' : `${safeValue}%`,
          background: TONE_FILL[tone],
          borderRadius: 'var(--radius-pill)',
          transition: indeterminate
            ? 'none'
            : 'width var(--dur-base) var(--ease-out-quart)',
          animation: indeterminate
            ? 'tori-progress-indet 1.4s var(--ease-out-quart) infinite'
            : 'none',
        }}
      />
    </div>
  );
}
