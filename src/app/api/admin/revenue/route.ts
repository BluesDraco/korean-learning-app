import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import { refundOrder, activateMembership, defaultAmount } from '@/lib/server/membership';
import { scopedRevenue } from '@/lib/server/adminStats';
import type { OrderActionBody, AdminScope } from '@/types/admin';
import { TIERS, type Tier } from '@/lib/membership-benefits';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

function parseScope(v: string | null): AdminScope {
  return v === 'overseas' || v === 'combined' ? v : 'domestic';
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));
  const type = searchParams.get('type') || 'all';
  const statusParam = searchParams.get('status') || 'paid'; // 默认只看已支付（收入口径不变）
  const exportAll = searchParams.get('export') === '1';
  const scope = parseScope(searchParams.get('scope'));

  const response = await scopedRevenue(scope, { page, pageSize, type, statusParam, exportAll });
  return NextResponse.json(response);
}

// ── 订单操作：退款 / 补单 ──
export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: OrderActionBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  const orderId = typeof body.orderId === 'string' ? body.orderId : '';
  if (!orderId) return NextResponse.json({ error: '缺少 orderId' }, { status: 400 });
  const operator = typeof admin.username === 'string' ? admin.username : 'admin';

  // ── 退款 ──
  if (body.action === 'refund') {
    const res = await refundOrder(orderId, operator);
    if (!res.ok) {
      const msg = res.reason === 'not_found' ? '订单不存在' : '仅已支付订单可退款';
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  }

  // ── 补单（pending → paid + 开会员）──
  if (body.action === 'mark_paid') {
    const db = await getDb();
    const rows = await db.exec('SELECT user_id, tier, amount, status FROM orders WHERE id = ?', [orderId]);
    const row = rows[0]?.values[0];
    if (!row) return NextResponse.json({ error: '订单不存在' }, { status: 400 });
    if (row[3] === 'paid') return NextResponse.json({ error: '订单已是已支付状态' }, { status: 400 });
    const userId = row[0] as string;
    const tier = String(row[1]);
    if (!isTier(tier) || tier === 'free') return NextResponse.json({ error: '订单档位非法' }, { status: 400 });
    const amount = typeof row[2] === 'number' && row[2] > 0 ? row[2] : defaultAmount(tier);

    // 复用 activateMembership 的 orderId 路径：抢占式翻单 + 开会员，天然幂等
    await activateMembership(userId, tier, {
      source: 'manual-fix',
      amount,
      note: `补单 by ${operator}`,
      operator,
      orderId,
      extendFromCurrent: false,
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: '未知操作' }, { status: 400 });
}
