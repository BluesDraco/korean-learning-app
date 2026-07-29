import { getDb } from '@/lib/server/db';

// 账号注销：软删除 + 匿名化。
// 标记 status='deleted' + 清空全部 PII（用户名替换为占位、密码/邮箱/手机/头像/邀请码清空），
// 学习数据行（user_words/diary/等）保留不删。注销后登录/关键写接口按 deleted 拦截。
export type DeactivateResult =
  | { ok: true }
  | { ok: false; reason: 'not_found' | 'already_deleted' };

export async function deactivateUser(userId: string, operator: string): Promise<DeactivateResult> {
  const db = await getDb();

  const rows = await db.exec('SELECT status FROM users WHERE id = ?', [userId]);
  const row = rows[0]?.values[0];
  if (!row) return { ok: false, reason: 'not_found' };
  if (row[0] === 'deleted') return { ok: false, reason: 'already_deleted' };

  const now = Date.now();
  const placeholder = `deleted_${userId}`;
  void operator;

  // 取消 Stripe 订阅（海外站），防止注销后继续扣费
  try {
    const subRows = await db.exec(
      `SELECT stripe_subscription_id FROM subscriptions WHERE user_id = ? AND status = 'active'`,
      [userId],
    );
    for (const row of subRows[0]?.values ?? []) {
      const subId = row[0] as string;
      try {
        const Stripe = (await import('stripe')).default;
        const key = process.env.STRIPE_SECRET_KEY;
        if (key) await new Stripe(key).subscriptions.update(subId, { cancel_at_period_end: true });
      } catch { /* Stripe 不可用不影响注销 */ }
    }
    await db.run(`UPDATE subscriptions SET status = 'canceled', cancel_at_period_end = 1, updated_at = ? WHERE user_id = ? AND status = 'active'`, [now, userId]);
  } catch { /* 表可能不存在 */ }

  await db.run(
    `UPDATE users SET
       status = 'deleted',
       username = ?,
       nickname = '已注销用户',
       email = '',
       phone = '',
       avatar_url = '',
       password_hash = '',
       invite_code = '',
       membership_type = 'free',
       membership_expiry = NULL,
       updated_at = ?
     WHERE id = ?`,
    [placeholder, now, userId],
  );

  return { ok: true };
}

// ── 邮箱 / 社交登录：账号创建辅助（海外站）──
import crypto from 'crypto';
import { generateId, hashPassword } from '@/lib/server/auth';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// 中国大陆手机号
export const PHONE_RE = /^1[3-9]\d{9}$/;

export function normalizePhone(phone: string): string {
  return phone.trim().replace(/\s+/g, '');
}

// 邮箱/社交用户无自然用户名 → 造一个满足 UNIQUE NOT NULL 的合成用户名。
// base 取邮箱本地部分或 provider 前缀，去非法字符，撞名加随机后缀。
export async function generateUniqueUsername(base: string): Promise<string> {
  const db = await getDb();
  let root = base.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16) || 'user';
  if (root.length < 2) root = 'user';
  for (let i = 0; i < 6; i++) {
    const candidate = i === 0 ? root : `${root}_${crypto.randomBytes(2).toString('hex')}`;
    const rows = await db.exec('SELECT 1 FROM users WHERE username = ? LIMIT 1', [candidate]);
    if (!(rows[0] && rows[0].values.length > 0)) return candidate;
  }
  return `user_${crypto.randomBytes(4).toString('hex')}`;
}

// 社交登录用户无密码 → 存一段随机不可用 hash 占位（满足 password_hash NOT NULL）。
export async function randomPasswordHash(): Promise<string> {
  return hashPassword(crypto.randomBytes(32).toString('hex'));
}

// 内测期新用户 3 天免费月度会员（与用户名 register 口径一致）
export function trialExpiry(now: number): number {
  return now + 3 * 24 * 60 * 60 * 1000;
}

export { generateId };
