import { getDb } from '@/lib/server/db';
import { generateId } from '@/lib/server/auth';
import { getUserTier } from '@/lib/server/membership';
import { t, type Lang } from '@/lib/i18n';

const DAY_MS = 24 * 60 * 60 * 1000;

export interface CampaignTier { count: number; days: number }
export interface CampaignConfig { enabled: boolean; tiers: CampaignTier[]; cap: number }

const DEFAULT_CAMPAIGN: CampaignConfig = {
  enabled: true,
  tiers: [
    { count: 1, days: 7 },
    { count: 5, days: 30 },
  ],
  cap: 30,
};

// 邀请码：8 位大写 base32（去掉易混的 0/O/1/I/L），生成时查重
const CODE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

export function genInviteCode(): string {
  let s = '';
  for (let i = 0; i < 8; i++) s += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  return s;
}

export async function getCampaignConfig(): Promise<CampaignConfig> {
  try {
    const db = await getDb();
    const rows = await db.exec('SELECT value FROM app_config WHERE key = ?', ['invite_campaign']);
    const raw = rows[0]?.values[0]?.[0];
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw) as Partial<CampaignConfig>;
      return {
        enabled: parsed.enabled ?? DEFAULT_CAMPAIGN.enabled,
        tiers: Array.isArray(parsed.tiers) && parsed.tiers.length > 0 ? parsed.tiers : DEFAULT_CAMPAIGN.tiers,
        cap: typeof parsed.cap === 'number' ? parsed.cap : DEFAULT_CAMPAIGN.cap,
      };
    }
  } catch { /* 读不到/解析失败 → 用代码默认 */ }
  return DEFAULT_CAMPAIGN;
}

// 精确按天延长会员（方案B）：不复用 activateMembership 的固定档期。
// 从 max(now, 当前未过期到期) 起算 +days，free 用户置 monthly，并写一条 order 留档。
export async function grantInviteDays(userId: string, days: number, lang: Lang = 'zh'): Promise<void> {
  if (days <= 0) return;
  const db = await getDb();
  const now = Date.now();
  const rows = await db.exec('SELECT membership_type, membership_expiry FROM users WHERE id = ?', [userId]);
  const row = rows[0]?.values[0];
  const curType = typeof row?.[0] === 'string' ? (row[0] as string) : 'free';
  // 永久会员无到期概念：送体验天数无意义，且会把 NULL expiry 写成 now+days 反而降级永久档，直接跳过。
  if (curType === 'lifetime') return;
  const curExpiry = typeof row?.[1] === 'number' ? row[1] : null;
  const active = curExpiry != null && curExpiry > now; // 当前付费档是否仍有效
  const base = active ? curExpiry! : now;
  const newExpiry = base + days * DAY_MS;
  // 发的是月度天数：仅在仍有效的付费档上叠加时保留原档位；否则(免费/已过期)一律置 monthly。
  const newType = active && curType !== 'free' ? curType : 'monthly';
  await db.run(
    `UPDATE users SET membership_type = ?, membership_expiry = ? WHERE id = ?`,
    [newType, newExpiry, userId],
  );
  await db.run(
    `INSERT INTO orders (id, user_id, tier, amount, source, note, expiry, operator, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [generateId(), userId, 'monthly', 0, 'invite', t('invite.reward_days', lang, { days }), newExpiry, '', now],
  );
}

// 阶梯结算：合格邀请数达到某档 → 记账（唯一索引防重复）→ free/monthly 立即发放，yearly/lifetime 挂账。
export async function settleInviter(inviterId: string): Promise<void> {
  const cfg = await getCampaignConfig();
  if (!cfg.enabled) return;
  const db = await getDb();
  const now = Date.now();

  const cntRows = await db.exec(
    `SELECT COUNT(*) FROM invitations WHERE inviter_id = ? AND status = 'qualified'`,
    [inviterId],
  );
  const n = Number(cntRows[0]?.values[0]?.[0] ?? 0);

  const sortedTiers = [...cfg.tiers].sort((a, b) => a.count - b.count);
  for (const tier of sortedTiers) {
    if (n < tier.count) continue;

    // 先判档位：lifetime 完全不记账不发奖（到期兑现模型对永久档无意义）
    const curTier = await getUserTier(inviterId);
    if (curTier === 'lifetime') continue;

    // 已累计天数（封顶用）
    const sumRows = await db.exec(
      `SELECT COALESCE(SUM(days_granted), 0) FROM invite_rewards WHERE user_id = ?`,
      [inviterId],
    );
    const alreadyGranted = Number(sumRows[0]?.values[0]?.[0] ?? 0);
    const effectiveDays = Math.max(0, Math.min(tier.days, cfg.cap - alreadyGranted));

    // 记账：唯一索引 (user_id, threshold) 兜底防重复领
    const ins = await db.run(
      `INSERT INTO invite_rewards (id, user_id, threshold, days_granted, reward_type, status, created_at)
       VALUES (?, ?, ?, ?, 'monthly_days', 'pending', ?)
       ON CONFLICT(user_id, threshold) DO NOTHING`,
      [generateId(), inviterId, tier.count, effectiveDays, now],
    );
    if (ins.rowsAffected !== 1 || effectiveDays <= 0) continue;

    // free/monthly 立即发；yearly 保持 pending（等 redeemPendingInviteRewards 到期兑现）。
    // claim-first：先原子标 granted，成功才发天数——失败只少送不多送；发放异常不阻断后续档/结算。
    if (curTier === 'free' || curTier === 'monthly') {
      const claim = await db.run(
        `UPDATE invite_rewards SET status = 'granted', granted_at = ? WHERE user_id = ? AND threshold = ? AND status = 'pending'`,
        [now, inviterId, tier.count],
      );
      if (claim.rowsAffected === 1) {
        try {
          await grantInviteDays(inviterId, effectiveDays);
        } catch (e) {
          console.warn('[invite] settle grant failed', e);
        }
      }
    }
  }
}

// 读时惰性兑现：yearly 挂账的 pending 奖励在会员到期回落 free 后自动发放。
// 只对 free/monthly 兑现——排除 yearly(未到期不动) 和 lifetime(grantInviteDays 会写脏 expiry)。
export async function redeemPendingInviteRewards(userId: string): Promise<void> {
  const db = await getDb();
  const pend = await db.exec(
    `SELECT id, days_granted FROM invite_rewards
     WHERE user_id = ? AND status = 'pending' AND reward_type = 'monthly_days'`,
    [userId],
  );
  const rows = pend[0]?.values ?? [];
  if (rows.length === 0) return;

  const tier = await getUserTier(userId);
  if (tier !== 'free' && tier !== 'monthly') return;

  const now = Date.now();
  for (const r of rows) {
    const id = String(r[0]);
    const days = Number(r[1]);
    // claim-first：先原子翻状态，只有拿到 rowsAffected=1 的那次才发天数（防并发重复送）
    const claim = await db.run(
      `UPDATE invite_rewards SET status = 'granted', granted_at = ? WHERE id = ? AND status = 'pending'`,
      [now, id],
    );
    if (claim.rowsAffected !== 1) continue;
    if (days > 0) await grantInviteDays(userId, days);
  }
}
