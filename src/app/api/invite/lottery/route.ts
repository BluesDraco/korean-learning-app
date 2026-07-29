import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const WIN_RATE = 0.02;

export async function POST() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });

  const db = await getDb();

  // 自证：合格邀请达 8 人
  const cnt = await db.exec(
    `SELECT COUNT(*) FROM invitations WHERE inviter_id = ? AND status = 'qualified'`,
    [auth.userId],
  );
  if (Number(cnt[0]?.values[0]?.[0] ?? 0) < 8) {
    return NextResponse.json({ error: '未达抽奖资格' }, { status: 403, headers: NO_STORE });
  }

  // 已抽过 → 回读结果不重抽
  const existing = await db.exec(
    `SELECT status FROM invite_rewards WHERE user_id = ? AND threshold = 8`,
    [auth.userId],
  );
  const prev = existing[0]?.values[0]?.[0];
  if (typeof prev === 'string') {
    return NextResponse.json({ ok: true, alreadyDrawn: true, result: prev }, { headers: NO_STORE });
  }

  const won = Math.random() < WIN_RATE;
  const now = Date.now();
  const ins = await db.run(
    `INSERT INTO invite_rewards (id, user_id, threshold, days_granted, reward_type, status, created_at, granted_at)
     VALUES (?, ?, 8, 0, 'lottery', ?, ?, ?)
     ON CONFLICT(user_id, threshold) DO NOTHING`,
    [generateId(), auth.userId, won ? 'won' : 'lost', now, won ? null : now],
  );

  // 并发被抢先 → 回读真实结果
  if (ins.rowsAffected === 0) {
    const race = await db.exec(
      `SELECT status FROM invite_rewards WHERE user_id = ? AND threshold = 8`,
      [auth.userId],
    );
    const r = race[0]?.values[0]?.[0];
    return NextResponse.json({ ok: true, alreadyDrawn: true, result: typeof r === 'string' ? r : 'lost' }, { headers: NO_STORE });
  }

  return NextResponse.json({ ok: true, result: won ? 'won' : 'lost' }, { headers: NO_STORE });
}
