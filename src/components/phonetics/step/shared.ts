// 分步学习子课屏共享样式（提取 5 个 page.tsx 的重复 inline 样式）
import type { CSSProperties } from 'react';

export const iconBtn: CSSProperties = {
  width: 44, height: 44, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--color-ink-3)',
  background: 'transparent', textDecoration: 'none',
  border: 'none', cursor: 'pointer',
};

export const btnPrimary: CSSProperties = {
  fontSize: 15, fontWeight: 500, padding: '12px 24px',
  borderRadius: 12, border: 'none', cursor: 'pointer',
  background: 'var(--color-pink-base)', color: '#fff',
  boxShadow: '0 4px 14px rgba(255,127,168,.3)',
};

export const btnGhost: CSSProperties = {
  fontSize: 15, fontWeight: 500, padding: '12px 24px',
  borderRadius: 12, cursor: 'pointer',
  background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
  border: '1px solid var(--color-border-2)',
};

export const tipBox: CSSProperties = {
  background: 'var(--color-pink-soft)', borderRadius: 10,
  padding: '12px 14px', marginTop: 10, fontSize: 13, color: 'var(--color-ink-2)',
};
