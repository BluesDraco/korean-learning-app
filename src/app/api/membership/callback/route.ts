import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { getPaymentProvider } from '@/lib/server/payments';
import { activateMembership, getUserByStripeCustomerId } from '@/lib/server/membership';
import { logError } from '@/lib/server/errorLog';
import { TIERS, type Tier } from '@/lib/membership-benefits';

// 支付回调：含订单开通 + 订阅生命周期，禁缓存
export const dynamic = 'force-dynamic';

function isTier(v: unknown): v is Tier {
  return typeof v === 'string' && (TIERS as readonly string[]).includes(v);
}

// POST /api/membership/callback
export async function POST(req: Request) {
  const provider = getPaymentProvider();
  const verify = await provider.verifyCallback(req.clone());
  if (!verify.ok) {
    await logError('payment.callback', '回调校验失败', { level: 'critical', detail: { eventType: verify.eventType } });
    return NextResponse.json({ error: '回调校验失败' }, { status: 400 });
  }

  const db = await getDb();

  // ── invoice.paid：订阅续费 ──
  if (verify.eventType === 'invoice.paid' && verify.stripeCustomerId) {
    const sub = await getUserByStripeCustomerId(verify.stripeCustomerId);
    if (!sub) {
      await logError('payment.callback', '续费回调找不到对应用户', { level: 'critical', detail: { customerId: verify.stripeCustomerId } });
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }
    try {
      // 直接延期用户 membership_expiry，不建订单（避免幽灵 amount=0 订单）。
      // currentPeriodEnd 已是 Stripe 给的「新周期结束时间」，直接用作到期日；
      // 不能再 +30/365 天（那会在新周期末又叠加一整个周期 = 每次续费多送时长，资损）。
      // 基于绝对时间戳，重复 webhook 幂等。取不到 currentPeriodEnd 时按当前档周期兜底延期。
      const expiry = verify.currentPeriodEnd && verify.currentPeriodEnd > Date.now()
        ? verify.currentPeriodEnd
        : Date.now() + (sub.tier === 'monthly' ? 30 : 365) * 86400000;
      await db.run(
        `UPDATE users SET membership_type = ?, membership_expiry = ?, updated_at = ? WHERE id = ?`,
        [sub.tier, expiry, Date.now(), sub.userId],
      );
      if (verify.subscriptionId) {
        await db.run(
          `UPDATE subscriptions SET current_period_end = ?, updated_at = ? WHERE stripe_subscription_id = ?`,
          [verify.currentPeriodEnd ?? expiry, Date.now(), verify.subscriptionId],
        );
      }
    } catch (err) {
      await logError('payment.callback', '订阅续费开通失败', { level: 'critical', detail: { customerId: verify.stripeCustomerId, err: String(err) } });
      return NextResponse.json({ error: '开通失败' }, { status: 500 });
    }
    return provider.successResponse();
  }

  // ── customer.subscription.deleted：订阅取消 ──
  if (verify.eventType === 'customer.subscription.deleted' && verify.subscriptionId) {
    await db.run(
      `UPDATE subscriptions SET status = 'canceled', cancel_at_period_end = 0, updated_at = ? WHERE stripe_subscription_id = ?`,
      [Date.now(), verify.subscriptionId],
    ).catch(() => {});
    return provider.successResponse();
  }

  // ── invoice.payment_failed：续费扣款失败 ──
  if (verify.eventType === 'invoice.payment_failed') {
    await logError('payment.callback', '订阅续费扣款失败', { level: 'warn', detail: { raw: verify.rawPayload.slice(0, 500) } });
    return provider.successResponse();
  }

  // ── checkout.session.completed：首次购买（payment 或 subscription 首次）──
  // 按 orderId（mock）或 out_trade_no（真渠道）反查订单
  let rows;
  if (verify.orderId) {
    rows = await db.exec(
      `SELECT id, user_id, tier, amount, source, channel, status, out_trade_no FROM orders WHERE id = ?`,
      [verify.orderId],
    );
  } else {
    rows = await db.exec(
      `SELECT id, user_id, tier, amount, source, channel, status, out_trade_no FROM orders WHERE out_trade_no = ?`,
      [verify.outTradeNo],
    );
  }
  const row = rows[0]?.values[0];
  if (!row) {
    await logError('payment.callback', '回调对应订单不存在', { level: 'critical', detail: { orderId: verify.orderId, outTradeNo: verify.outTradeNo } });
    return NextResponse.json({ error: '订单不存在' }, { status: 404 });
  }

  const order = {
    id: row[0] as string,
    userId: row[1] as string,
    tier: row[2],
    amount: Number(row[3] ?? 0),
    source: (row[4] as string) || provider.channel,
    channel: (row[5] as string) || provider.channel,
    status: row[6] as string,
    outTradeNo: (row[7] as string) || null,
  };

  // mock 渠道：必须是登录买家本人
  if (provider.channel === 'mock') {
    const auth = await getAuthFromCookie();
    if (!auth || auth.userId !== order.userId) {
      return NextResponse.json({ error: '无权操作此订单' }, { status: 403 });
    }
  }

  // 幂等：已支付直接 ACK
  if (order.status === 'paid') return provider.successResponse();

  if (!isTier(order.tier) || order.tier === 'free') {
    return NextResponse.json({ error: '订单档位异常' }, { status: 400 });
  }

  if (verify.amount != null && verify.amount !== order.amount) {
    await logError('payment.callback', '回调金额与订单不符', {
      level: 'critical',
      detail: { orderId: order.id, expected: order.amount, actual: verify.amount },
      userId: order.userId,
    });
    return NextResponse.json({ error: '金额不符' }, { status: 400 });
  }

  try {
    await activateMembership(order.userId, order.tier, {
      source: order.source,
      channel: order.channel,
      amount: order.amount,
      orderId: order.id,
      outTradeNo: order.outTradeNo,
      rawCallback: verify.rawPayload,
      extendFromCurrent: true,
    });

    // 订阅模式：记录 subscriptions 行（INSERT OR IGNORE 幂等，避免 webhook 重试时丢失）
    if (verify.subscriptionId && verify.stripeCustomerId && isTier(order.tier) && order.tier !== 'lifetime') {
      const subId = generateId();
      const now = Date.now();
      await db.run(
        `INSERT OR IGNORE INTO subscriptions (id, user_id, stripe_subscription_id, stripe_customer_id, tier, status, current_period_end, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'active', ?, ?, ?)`,
        [subId, order.userId, verify.subscriptionId, verify.stripeCustomerId, order.tier, verify.currentPeriodEnd ?? null, now, now],
      );
    }
  } catch (err) {
    await logError('payment.callback', '支付成功但会员开通失败', {
      level: 'critical',
      detail: { orderId: order.id, tier: order.tier, err: String(err) },
      userId: order.userId,
    });
    return NextResponse.json({ error: '开通失败' }, { status: 500 });
  }

  return provider.successResponse();
}
