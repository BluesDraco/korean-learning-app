// 会员到期提醒（reveal-at-read）：前端读 /api/membership/me 后用它判断是否弹提醒。
// 无 cron、无后台扫库，与全站「写时冻结、读时揭晓」一致。

import type { Tier } from '@/lib/membership-benefits';

const DAY_MS = 24 * 60 * 60 * 1000;

// 距到期还有多少天（向上取整）；无到期返回 null
export function daysUntil(expiry: number | null): number | null {
  if (expiry == null) return null;
  return Math.ceil((expiry - Date.now()) / DAY_MS);
}

// 是否该提醒续费：付费(月/年)档 + 有到期 + ≤7 天（含已过期当天）
export function shouldRemind(tier: Tier, expiry: number | null): boolean {
  if (tier === 'free' || tier === 'lifetime' || expiry == null) return false;
  const d = daysUntil(expiry);
  return d != null && d <= 7;
}
