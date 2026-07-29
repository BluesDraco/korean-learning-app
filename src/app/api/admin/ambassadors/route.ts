import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { AmbassadorsResponse, AmbassadorActionBody, AmbassadorEntry, AmbassadorCandidate } from '@/types/admin';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

const STREAK_THRESHOLD = 30;

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  // 已授予的大使
  const ambRes = await db.exec(
    `SELECT p.user_id, u.username, p.nickname, p.level, p.xp, p.longest_streak, p.ambassador_since, p.ambassador_reason
     FROM user_profiles p JOIN users u ON u.id = p.user_id
     WHERE p.is_ambassador = 1
     ORDER BY p.ambassador_since DESC`
  );
  const ambassadors: AmbassadorEntry[] = (ambRes[0]?.values ?? []).map((row) => ({
    userId: row[0] as string,
    username: (row[1] as string) || 'unknown',
    nickname: (row[2] as string) || (row[1] as string) || 'unknown',
    level: Number(row[3]) || 0,
    xp: Number(row[4]) || 0,
    longestStreak: Number(row[5]) || 0,
    ambassadorSince: row[6] ? Number(row[6]) : null,
    ambassadorReason: (row[7] as string) || '',
  }));

  // 候选：连续打卡 >= 30 天但未授予
  const candRes = await db.exec(
    `SELECT p.user_id, u.username, p.nickname, p.level, p.xp, p.longest_streak
     FROM user_profiles p JOIN users u ON u.id = p.user_id
     WHERE p.longest_streak >= ? AND (p.is_ambassador IS NULL OR p.is_ambassador = 0)
     ORDER BY p.longest_streak DESC
     LIMIT 100`,
    [STREAK_THRESHOLD]
  );
  const candidates: AmbassadorCandidate[] = (candRes[0]?.values ?? []).map((row) => ({
    userId: row[0] as string,
    username: (row[1] as string) || 'unknown',
    nickname: (row[2] as string) || (row[1] as string) || 'unknown',
    level: Number(row[3]) || 0,
    xp: Number(row[4]) || 0,
    longestStreak: Number(row[5]) || 0,
  }));

  const response: AmbassadorsResponse = { ambassadors, candidates };
  return NextResponse.json(response, { headers: { 'Cache-Control': 'private, no-store' } });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const body: AmbassadorActionBody = await request.json();
  if (!body.userId || (body.action !== 'grant' && body.action !== 'revoke')) {
    return NextResponse.json({ error: '参数无效' }, { status: 400 });
  }

  const db = await getDb();

  // 确认 profile 存在
  const check = await db.exec('SELECT longest_streak FROM user_profiles WHERE user_id = ?', [body.userId]);
  if (!check[0]?.values?.[0]) {
    return NextResponse.json({ error: '用户档案不存在' }, { status: 404 });
  }

  if (body.action === 'grant') {
    const longestStreak = Number(check[0].values[0][0]) || 0;
    if (longestStreak < STREAK_THRESHOLD) {
      return NextResponse.json({ error: `未达授予条件（连续打卡需 ≥${STREAK_THRESHOLD} 天）` }, { status: 400 });
    }
    await db.run(
      'UPDATE user_profiles SET is_ambassador = 1, ambassador_since = ?, ambassador_reason = ? WHERE user_id = ?',
      [Date.now(), `连续打卡 ${longestStreak} 天`, body.userId]
    );
  } else {
    await db.run(
      "UPDATE user_profiles SET is_ambassador = 0, ambassador_since = 0, ambassador_reason = '' WHERE user_id = ?",
      [body.userId]
    );
  }

  return NextResponse.json({ success: true });
}
