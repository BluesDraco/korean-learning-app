/**
 * Legacy color shim — 保持 JS 对象 API 不破坏 11+ 页面的 import，
 * 但所有色值改读 CSS 变量，自动接入全站 token 系统。
 *
 * 不要新增字段。需要新色板 → 直接用 var(--color-*)。
 * 长期目标：每页改完后删除该 import，最后删此文件。
 */
export interface ThemeColors {
  ink: string;
  muted: string;
  line: string;
  pink: string;
  pinkSoft: string;
  mint: string;
  mintBg: string;
  bg: string;
  card: string;
  black: string;
  [key: string]: string;
}

const TOKEN_C: ThemeColors = {
  ink: 'var(--color-ink-1)',
  muted: 'var(--color-ink-3)',
  line: 'var(--color-border-1)',
  pink: 'var(--color-pink-base)',
  pinkSoft: 'var(--color-pink-soft)',
  mint: 'var(--color-mint-soft)',
  mintBg: 'var(--color-mint-soft)',
  bg: 'var(--color-surface-1)',
  card: 'var(--color-surface-2)',
  black: 'var(--color-ink-1)',
};

export const LIGHT_C = TOKEN_C;
export const DARK_C = TOKEN_C;
