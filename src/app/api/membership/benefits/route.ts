import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import {
  BENEFIT_GROUPS, TIERS, TIER_LABELS,
  effectivePricing, isPromoActive, PROMO_DEADLINE,
  mergeMatrix, type BenefitMatrix, type Tier, type TierPricing,
} from '@/lib/membership-benefits';

// 公开只读：定价页展示权益，值随后台配置同步
export const dynamic = 'force-dynamic';

const CONFIG_KEY = 'membership_benefits';

export async function GET() {
  const db = await getDb();
  const rows = await db.exec('SELECT value FROM app_config WHERE key = ?', [CONFIG_KEY]);
  const raw = rows[0]?.values[0]?.[0] as string | undefined;

  let override: Partial<BenefitMatrix> | null = null;
  if (raw) {
    try { override = JSON.parse(raw); } catch { override = null; }
  }

  // 促销窗口过期后 promo 自动回落 null，前端拿到的即常规价 → 折扣标天然消失，前后端一致
  const pricing = Object.fromEntries(
    TIERS.map((tier) => [tier, effectivePricing(tier)]),
  ) as Record<Tier, TierPricing>;

  return NextResponse.json({
    groups: BENEFIT_GROUPS,
    tiers: TIERS,
    tierLabels: TIER_LABELS,
    pricing,
    promoDeadline: PROMO_DEADLINE,
    promoActive: isPromoActive(),
    matrix: mergeMatrix(override),
  });
}
