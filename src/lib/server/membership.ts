// 会员权益判断核心（服务端）
//
// 档位从 users 表读（判过期回落 free）；额度/内容范围从 app_config 的权益矩阵读，
// 与后台「权益总览」编辑的是同一份数据（[[membership-payment-system]] 的单一事实来源）。

import { getDb } from '@/lib/server/db';
import { generateId } from '@/lib/server/auth';
import { checkAiRateLimit, type AiRateLimitResult } from '@/lib/server/rate-limit';
import {
  TIERS,
  EDITION,
  effectivePricing,
  mergeMatrix,
  aiQuotaOf,
  isPaidTier,
  type Tier,
  type BenefitMatrix,
} from '@/lib/membership-benefits';

// 当前部署币种：海外站 USD，国内站 CNY。订单写入时打烙印，后台按订单币种显示。
export const DEPLOY_CURRENCY: 'CNY' | 'USD' = EDITION === 'overseas' ? 'USD' : 'CNY';

// 内容解锁纯函数在 membership-benefits.ts（客户端也用），这里直接透传出去，
// 让服务端只 import 一个 @/lib/server/membership 就够。
export {
  isPaidTier,
  canAccessDiaryDay,
  canAccessGrammarPart,
  topikFreeCount,
  canAccessTopikIndex,
  canAccessReadingLevel,
  picbookFreeCount,
  canAccessBookIndex,
  roleplayFreeCount,
  canAccessSceneIndex,
  canUseVoice,
} from '@/lib/membership-benefits';

const CONFIG_KEY = 'membership_benefits';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

// ── 档位 ──

// 读某用户当前有效档位；到期的付费档回落 free（lifetime 永不过期）
export async function getUserTier(userId: string): Promise<Tier> {
  const db = await getDb();
  let tier: Tier = 'free';
  let expiry: number | null = null;
  try {
    const rows = await db.exec(
      'SELECT membership_type, membership_expiry FROM users WHERE id = ?',
      [userId],
    );
    const row = rows[0]?.values[0];
    if (row) {
      if (isTier(row[0])) tier = row[0];
      expiry = typeof row[1] === 'number' ? row[1] : null;
    }
  } catch {
    // 列不存在（未迁移的老库），保持 free
  }
  if (tier !== 'free' && tier !== 'lifetime' && expiry != null && expiry < Date.now()) {
    tier = 'free';
  }
  return tier;
}

// ── 权益矩阵 ──

// 读合并后的权益矩阵（默认值 + 后台覆盖值）。所有额度/内容判断都基于它。
export async function getBenefitMatrix(): Promise<BenefitMatrix> {
  const db = await getDb();
  try {
    const rows = await db.exec('SELECT value FROM app_config WHERE key = ?', [CONFIG_KEY]);
    const raw = rows[0]?.values[0]?.[0];
    if (typeof raw === 'string') return mergeMatrix(JSON.parse(raw) as Partial<BenefitMatrix>);
  } catch {
    // 表/键缺失，回落纯默认
  }
  return mergeMatrix(null);
}

// ── AI 额度 ──

export type AiQuotaBenefit = 'analyze' | 'judge' | 'chat';

// 便捷：一次读库拿到某用户某 AI 功能的额度（-1=无限）
export async function getAiQuotaForUser(userId: string, benefit: AiQuotaBenefit): Promise<number> {
  const [tier, matrix] = await Promise.all([getUserTier(userId), getBenefitMatrix()]);
  return aiQuotaOf(matrix, tier, benefit);
}

const UNLIMITED_CAP = 1_000_000; // -1（无限）传给 checkAiRateLimit 的实际大数

// 按用户档位对某 AI 功能限流：读矩阵额度 → 换算成 customLimit → 复用 checkAiRateLimit。
// bucket 用 benefit 名，让同一功能的多个入口共享一个每日额度池。
export async function checkAiQuota(userId: string, benefit: AiQuotaBenefit): Promise<AiRateLimitResult> {
  const quota = await getAiQuotaForUser(userId, benefit);
  if (quota === 0) return { allowed: false, remaining: 0, limit: 0 };
  const cap = quota < 0 ? UNLIMITED_CAP : quota;
  return checkAiRateLimit(userId, benefit, cap);
}

// 服务端会员门：付费档才放行。用于自定义场景创建等会员专属写接口——
// 前端已拦入口，但 API 层必须自证（否则免费用户直接调接口即越权，同 6-26 事故性质）。
export async function isPaidMember(userId: string): Promise<boolean> {
  const tier = await getUserTier(userId);
  return isPaidTier(tier); // 走统一门禁开关（内测期 BETA_UNLOCK 恒真）
}

// ── 会员开通（后台手动开通 + 支付回调 共用）──

const DAY_MS = 24 * 60 * 60 * 1000;

// 计算某档开通后的到期时间（ms）；lifetime/free 返回 null
export function computeExpiry(tier: Tier, from: number): number | null {
  if (tier === 'monthly') return from + 30 * DAY_MS;
  if (tier === 'yearly') return from + 365 * DAY_MS;
  return null; // free / lifetime
}

export interface ActivateOptions {
  source: string;              // 'manual' | 'mock' | 'hupijiao' | ...
  amount: number;              // 实收金额（分）
  note?: string;
  operator?: string;           // 管理员用户名；自助购买为 ''
  channel?: string;            // 手动为 ''；付费为 'mock'|...
  orderId?: string;            // 复用已存在的 pending 订单行（回调路径），而非新插
  outTradeNo?: string | null;
  paidAt?: number;             // 默认 now
  rawCallback?: string;        // 回调 payload JSON（留档）
  extendFromCurrent?: boolean; // 付费续费=true：从 max(now, 当前到期) 起算
}

export interface ActivateResult { tier: Tier; expiry: number | null; orderId: string }

// 开通/调整会员：先升级用户（核心），再落订阅/订单。任一失败 Stripe 重试可补齐。
// 幂等：用户 UPDATE 同值无害；订单 UPDATE 带 status!='paid' guard。
export async function activateMembership(
  userId: string,
  tier: Tier,
  opts: ActivateOptions,
): Promise<ActivateResult> {
  const db = await getDb();
  const now = opts.paidAt ?? Date.now();
  const amount = tier === 'free' ? 0 : Math.max(0, Math.round(opts.amount));

  // 续费/升级延期：当前为付费档且有剩余时长 → 从 max(now, 当前到期) 起算。
  // ⚠️ 必须在过了订单互斥闸门之后才读，否则并发回调各自读到旧到期时间、各自延期一次（二次延期资损）。
  async function computeFinalExpiry(): Promise<number | null> {
    let from = now;
    if (opts.extendFromCurrent && tier !== 'free' && tier !== 'lifetime') {
      try {
        const rows = await db.exec('SELECT membership_type, membership_expiry FROM users WHERE id = ?', [userId]);
        const row = rows[0]?.values[0];
        const curTier = row?.[0];
        const curExpiry = typeof row?.[1] === 'number' ? row[1] : null;
        if (curTier !== 'free' && curExpiry != null && curExpiry > now) from = curExpiry;
      } catch { /* 缺列/异常时按 now 起算 */ }
    }
    return computeExpiry(tier, from);
  }

  let orderId = opts.orderId ?? '';
  let expiry: number | null;

  if (opts.orderId) {
    // 互斥闸门：并发/重复回调中只有一个能把 pending 翻成 paid（rowsAffected=1），
    // 其余 rowsAffected=0 直接返回，绝不再延期。延期 users 必须在过闸门之后。
    const claim = await db.run(
      `UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ? AND status != 'paid'`,
      [now, opts.orderId],
    );
    if (claim.rowsAffected === 0) {
      // 已被处理过（幂等）：读回订单已存的到期时间返回，不做任何延期
      const rows = await db.exec('SELECT expiry FROM orders WHERE id = ?', [opts.orderId]);
      const exp = rows[0]?.values[0]?.[0];
      return { tier, expiry: typeof exp === 'number' ? exp : null, orderId };
    }
    // 过闸门：安全延期 + 补齐订单字段
    expiry = await computeFinalExpiry();
    await db.run(
      'UPDATE users SET membership_type = ?, membership_expiry = ? WHERE id = ?',
      [tier, expiry, userId],
    );
    await db.run(
      `UPDATE orders SET expiry = ?, amount = ?, raw_callback = ?, tier = ? WHERE id = ?`,
      [expiry, amount, opts.rawCallback ?? '', tier, opts.orderId],
    );
  } else {
    // 后台手动开通/新单：无并发回调场景，直接延期 + 插单
    expiry = await computeFinalExpiry();
    await db.run(
      'UPDATE users SET membership_type = ?, membership_expiry = ? WHERE id = ?',
      [tier, expiry, userId],
    );
    orderId = generateId();
    await db.run(
      `INSERT INTO orders (id, user_id, tier, amount, source, note, expiry, operator, created_at, status, channel, out_trade_no, paid_at, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?, ?)`,
      [orderId, userId, tier, amount, opts.source, opts.note ?? '', expiry,
       opts.operator ?? '', now, opts.channel ?? '', opts.outTradeNo ?? null, now, DEPLOY_CURRENCY],
    );
  }

  // 永久档：建默认履约行（周边 + 产品共建），若尚未有
  if (tier === 'lifetime') {
    for (const perkType of ['merch', 'devservice'] as const) {
      const exists = await db.exec(
        `SELECT id FROM lifetime_perks WHERE user_id = ? AND perk_type = ? LIMIT 1`,
        [userId, perkType],
      );
      if (!exists[0]?.values[0]) {
        await db.run(
          `INSERT INTO lifetime_perks (id, user_id, perk_type, status, detail, created_at, updated_at)
           VALUES (?, ?, ?, 'pending', '', ?, ?)`,
          [generateId(), userId, perkType, now, now],
        );
      }
    }
  }

  return { tier, expiry, orderId };
}

// 便捷：档位默认价（分），未显式传金额时用。促销窗口内用首购价，过期回落常规价→0
export function defaultAmount(tier: Tier): number {
  const p = effectivePricing(tier);
  return p.promo ?? p.price ?? 0;
}

// ── 退款（本地标记 + 回落会员）──
// 实际退款走 Stripe/微信后台手动操作；这里只把本地订单标 refunded 并撤销会员。
// 幂等：UPDATE 带 status='paid' guard，重复退款 rowsAffected=0 直接返回。
export type RefundResult =
  | { ok: true; userId: string }
  | { ok: false; reason: 'not_found' | 'not_paid' };

export async function refundOrder(orderId: string, operator: string): Promise<RefundResult> {
  const db = await getDb();

  const rows = await db.exec('SELECT user_id, status FROM orders WHERE id = ?', [orderId]);
  const row = rows[0]?.values[0];
  if (!row) return { ok: false, reason: 'not_found' };
  const userId = row[0] as string;
  if (row[1] !== 'paid') return { ok: false, reason: 'not_paid' };

  const now = Date.now();
  const res = await db.run(
    `UPDATE orders SET status = 'refunded', note = ?, operator = ? WHERE id = ? AND status = 'paid'`,
    [`退款操作 by ${operator} @ ${new Date(now).toISOString()}`, operator, orderId],
  );
  if (res.rowsAffected === 0) return { ok: false, reason: 'not_paid' };

  // 退款即撤销会员：回落 free（不新建 paid 订单，直接改档位）
  await db.run(
    `UPDATE users SET membership_type = 'free', membership_expiry = NULL, updated_at = ? WHERE id = ?`,
    [now, userId],
  );

  return { ok: true, userId };
}

// 按 Stripe customer_id 反查用户订阅信息（续费回调用）
export async function getUserByStripeCustomerId(customerId: string): Promise<{ userId: string; tier: Tier } | null> {
  const db = await getDb();
  try {
    const rows = await db.exec(
      `SELECT user_id, tier FROM subscriptions WHERE stripe_customer_id = ? AND status = 'active' LIMIT 1`,
      [customerId],
    );
    const row = rows[0]?.values[0];
    if (!row) return null;
    const tier = row[1];
    return { userId: row[0] as string, tier: (typeof tier === 'string' && (TIERS as readonly string[]).includes(tier) ? tier : 'monthly') as Tier };
  } catch {
    return null;
  }
}
