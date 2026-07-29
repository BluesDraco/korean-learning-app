import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { getPaymentProvider } from '@/lib/server/payments';
import { defaultAmount, getUserTier, DEPLOY_CURRENCY } from '@/lib/server/membership';
import { TIERS, TIER_LABELS, EDITION, type Tier } from '@/lib/membership-benefits';

// 含鉴权/用户数据，禁缓存
export const dynamic = 'force-dynamic';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

// 档位高低（用于防降级购买覆盖）：free < monthly < yearly < lifetime
const TIER_RANK: Record<Tier, number> = { free: 0, monthly: 1, yearly: 2, lifetime: 3 };

const PENDING_REUSE_MS = 15 * 60 * 1000; // 15 分钟内同档 pending 订单复用，避免堆积

// POST /api/membership/checkout { tier } → 建 pending 订单 + 返回收银台地址
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  let body: { tier?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: '请求格式错误' }, { status: 400 }); }

  const tier = body.tier;
  if (!isTier(tier) || tier === 'free') {
    return NextResponse.json({ error: '非法档位' }, { status: 400 });
  }

  // 防误降级：已是永久档不必再买；不允许买比当前更低的档覆盖（同档=续费，放行）
  const currentTier = await getUserTier(auth.userId);
  if (currentTier === 'lifetime') {
    return NextResponse.json({ error: '您已是永久会员，无需再购买' }, { status: 409 });
  }
  if (TIER_RANK[tier] < TIER_RANK[currentTier]) {
    return NextResponse.json({ error: '当前会员档位更高，如需变更请联系客服' }, { status: 409 });
  }

  const db = await getDb();
  const provider = getPaymentProvider();
  const now = Date.now();
  const amount = defaultAmount(tier);

  // 复用近 15 分钟内的同档 pending 订单（防重复点击堆单）
  let orderId = '';
  let outTradeNo = '';
  try {
    const rows = await db.exec(
      `SELECT id, out_trade_no FROM orders
       WHERE user_id = ? AND tier = ? AND status = 'pending' AND channel = ? AND created_at > ?
       ORDER BY created_at DESC LIMIT 1`,
      [auth.userId, tier, provider.channel, now - PENDING_REUSE_MS],
    );
    const row = rows[0]?.values[0];
    if (row) { orderId = row[0] as string; outTradeNo = (row[1] as string) || ''; }
  } catch { /* 无 pending 或列缺失，走新建 */ }

  if (!orderId) {
    orderId = generateId();
    outTradeNo = generateId();
    await db.run(
      `INSERT INTO orders (id, user_id, tier, amount, source, note, expiry, operator, created_at, status, channel, out_trade_no, paid_at, currency)
       VALUES (?, ?, ?, ?, ?, '', NULL, '', ?, 'pending', ?, ?, NULL, ?)`,
      [orderId, auth.userId, tier, amount, provider.channel, now, provider.channel, outTradeNo, DEPLOY_CURRENCY],
    );
  }

  try {
    const charge = await provider.createCharge({
      orderId,
      outTradeNo,
      tier,
      amount,
      userId: auth.userId,
      subject: `兔莉${TIER_LABELS[tier]}会员`,
      ...(EDITION === 'overseas' && (tier === 'monthly' || tier === 'yearly') ? { recurring: { interval: tier === 'monthly' ? 'month' as const : 'year' as const } } : {}),
    });
    return NextResponse.json({ orderId, checkoutUrl: charge.checkoutUrl, qrData: charge.qrData ?? null });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: '支付服务暂时不可用，请稍后重试' }, { status: 502 });
  }
}
