import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import Stripe from 'stripe';
import { EDITION } from '@/lib/membership-benefits';

export const dynamic = 'force-dynamic';

// POST /api/membership/subscription/cancel — 取消自动续费（仅海外站 Stripe）
export async function POST() {
  if (EDITION !== 'overseas') {
    return NextResponse.json({ error: '仅海外站支持' }, { status: 400 });
  }

  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe 未配置' }, { status: 500 });

  const db = await getDb();
  const rows = await db.exec(
    `SELECT stripe_subscription_id, status FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
    [auth.userId],
  );
  const row = rows[0]?.values[0];
  if (!row) return NextResponse.json({ error: '未找到活跃订阅' }, { status: 404 });

  const subId = row[0] as string;

  try {
    const stripe = new Stripe(key);
    const updated = await stripe.subscriptions.update(subId, { cancel_at_period_end: true });
    const periodEnd = (updated as any).current_period_end ? (updated as any).current_period_end * 1000 : null;

    await db.run(
      `UPDATE subscriptions SET cancel_at_period_end = 1, status = CASE WHEN status = 'active' THEN 'active' ELSE status END, updated_at = ? WHERE stripe_subscription_id = ?`,
      [Date.now(), subId],
    );

    return NextResponse.json({ ok: true, currentPeriodEnd: periodEnd });
  } catch (err) {
    return NextResponse.json({ error: '取消失败，请稍后重试' }, { status: 500 });
  }
}
