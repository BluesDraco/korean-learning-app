import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import {
  BENEFIT_GROUPS, TIERS, TIER_LABELS,
  effectivePricing, mergeMatrix, type BenefitMatrix, type Tier, type TierPricing,
} from '@/lib/membership-benefits';

// 含鉴权数据，禁止缓存
export const dynamic = 'force-dynamic';

const CONFIG_KEY = 'membership_benefits';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const db = await getDb();
  const rows = await db.exec('SELECT value FROM app_config WHERE key = ?', [CONFIG_KEY]);
  const raw = rows[0]?.values[0]?.[0] as string | undefined;

  let override: Partial<BenefitMatrix> | null = null;
  if (raw) {
    try { override = JSON.parse(raw); } catch { override = null; }
  }

  // 走 effectivePricing，与公开 benefits API 对齐：8.31 后 promo 失效，后台不再误显创始价
  const pricing = Object.fromEntries(
    TIERS.map((tier) => [tier, effectivePricing(tier)]),
  ) as Record<Tier, TierPricing>;

  return NextResponse.json({
    groups: BENEFIT_GROUPS,
    tiers: TIERS,
    tierLabels: TIER_LABELS,
    pricing,
    matrix: mergeMatrix(override),
  });
}

export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  let body: { matrix?: BenefitMatrix };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
  if (!body.matrix || typeof body.matrix !== 'object') {
    return NextResponse.json({ error: '缺少 matrix' }, { status: 400 });
  }

  // 只存合法结构内的值，防脏数据；合并后落库
  const clean = mergeMatrix(body.matrix);
  const db = await getDb();
  await db.run(
    `INSERT INTO app_config (key, value, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [CONFIG_KEY, JSON.stringify(clean), Date.now()],
  );

  return NextResponse.json({ ok: true, matrix: clean });
}
