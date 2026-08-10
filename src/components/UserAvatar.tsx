import type { CSSProperties } from 'react';

interface Props {
  [k: string]: unknown;
  avatarUrl?: string | null;
  name?: string;
  size?: number;
  style?: CSSProperties;
}

/**
 * 用户头像
 * - 有 avatarUrl 显示图片
 * - 否则用 name 首字母生成圆圈
 */
export default function UserAvatar({ avatarUrl, name, size = 32, style }: Props) {
  const letter = (name || '?').trim().charAt(0).toUpperCase() || '?';
  const base: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'var(--color-pink-soft)',
    color: 'var(--color-pink-strong)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: Math.max(11, Math.round(size * 0.44)),
    overflow: 'hidden',
    flexShrink: 0,
    ...style,
  };
  if (avatarUrl) {
    return (
      <span style={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name || 'avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </span>
    );
  }
  return <span style={base}>{letter}</span>;
}
