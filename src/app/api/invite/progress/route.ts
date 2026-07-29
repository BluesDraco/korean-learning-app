import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { redeemPendingInviteRewards } from '@/lib/server/invite';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 读时惰性兑现：yearly 到期回落后自动发放挂账奖励
  await redeemPendingInviteRewards(auth.userId);

  const db = await getDb();

  const codeRows = await db.exec('SELECT invite_code FROM users WHERE id = ?', [auth.userId]);
  const code = (codeRows[0]?.values[0]?.[0] as string) || '';

  const cntRows = await db.exec(
    `SELECT COUNT(*) FROM invitations WHERE inviter_id = ? AND status = 'qualified'`,
    [auth.userId],
  );
  const qualifiedCount = Number(cntRows[0]?.values[0]?.[0] ?? 0);

  const rewardRows = await db.exec(
    `SELECT threshold, days_granted, status FROM invite_rewards WHERE user_id = ? ORDER BY threshold ASC`,
    [auth.userId],
  );
  const rewards = (rewardRows[0]?.values ?? []).map((r) => ({
    threshold: Number(r[0]),
    daysGranted: Number(r[1]),
    status: r[2] as string,
  }));
  const totalDays = rewards.reduce((sum, r) => sum + r.daysGranted, 0);
  const pendingDays = rewards.filter((r) => r.status === 'pending').reduce((sum, r) => sum + r.daysGranted, 0);

  // 8 档抽奖结果（won/lost/null）
  const lotteryRow = await db.exec(
    `SELECT status FROM invite_rewards WHERE user_id = ? AND threshold = 8 AND reward_type = 'lottery'`,
    [auth.userId],
  );
  const lottery = (lotteryRow[0]?.values[0]?.[0] as string) || null;

  // 发货状态
  const shipRows = await db.exec(
    `SELECT threshold, status FROM invite_shipments WHERE user_id = ?`,
    [auth.userId],
  );
  const shipments = (shipRows[0]?.values ?? []).map((r) => ({ threshold: Number(r[0]), status: r[1] as string }));

  return NextResponse.json(
    { code, qualifiedCount, totalDays, pendingDays, rewards, lottery, shipments },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
