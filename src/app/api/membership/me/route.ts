import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { TIERS, EDITION, mergeMatrix, type Tier, type BenefitMatrix } from '@/lib/membership-benefits';

// 含用户身份，禁止缓存
export const dynamic = 'force-dynamic';

const CONFIG_KEY = 'membership_benefits';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const db = await getDb();

  let tier: Tier = 'free';
  let expiry: number | null = null;
  try {
    const rows = await db.exec(
      'SELECT membership_type, membership_expiry FROM users WHERE id = ?',
      [auth.userId],
    );
    const row = rows[0]?.values[0];
    if (row) {
      if (isTier(row[0])) tier = row[0];
      expiry = typeof row[1] === 'number' ? row[1] : null;
    }
  } catch { /* 列不存在 */ }

  if (tier !== 'free' && tier !== 'lifetime' && expiry != null && expiry < Date.now()) {
    tier = 'free';
    expiry = null;
  }

  let override: Partial<BenefitMatrix> | null = null;
  try {
    const rows = await db.exec('SELECT value FROM app_config WHERE key = ?', [CONFIG_KEY]);
    const raw = rows[0]?.values[0]?.[0];
    if (typeof raw === 'string') override = JSON.parse(raw);
  } catch { /* 回落纯默认 */ }

  // 海外站：查询订阅状态
  let subscription: { status: string; cancelAtPeriodEnd: boolean; currentPeriodEnd: number | null } | null = null;
  if (EDITION === 'overseas' && tier !== 'free' && tier !== 'lifetime') {
    try {
      const subRows = await db.exec(
        `SELECT status, cancel_at_period_end, current_period_end FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
        [auth.userId],
      );
      const subRow = subRows[0]?.values[0];
      if (subRow) {
        subscription = {
          status: subRow[0] as string,
          cancelAtPeriodEnd: (subRow[1] as number) === 1,
          currentPeriodEnd: subRow[2] as number | null,
        };
      }
    } catch { /* 表可能不存在 */ }
  }

  return NextResponse.json({ tier, expiry, matrix: mergeMatrix(override), subscription });
}
