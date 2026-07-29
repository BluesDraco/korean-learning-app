import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

// 按 token 全局查邀请（绕过 user-data 的 user_id scope，接受方才能看到邀请人的邀请）
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { token } = await params;
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  const db = await getDb();
  const invResult = await db.exec(
    'SELECT user_id, learning_goal, level, daily_minutes, intro, expires_at FROM buddy_invites WHERE invite_token = ?',
    [token],
  );
  if (invResult.length === 0 || invResult[0].values.length === 0) {
    return NextResponse.json({ error: '邀请不存在或已失效' }, { status: 404 });
  }

  const row = invResult[0].values[0];
  const inviterId = row[0] as string;
  const learningGoal = row[1] as string;
  const level = row[2] as string;
  const dailyMinutes = row[3] == null ? '' : String(row[3]);
  const intro = row[4] as string;
  const expiresAt = row[5] as number | null;

  if (expiresAt && Date.now() > expiresAt) {
    return NextResponse.json({ error: '邀请已过期' }, { status: 410 });
  }

  // 邀请人昵称
  const profResult = await db.exec(
    'SELECT nickname FROM user_profiles WHERE user_id = ?',
    [inviterId],
  );
  const inviterName =
    profResult.length > 0 && profResult[0].values.length > 0
      ? (profResult[0].values[0][0] as string) || '학습자'
      : '학습자';

  return NextResponse.json({
    inviterId,
    inviterName,
    learningGoal,
    level,
    dailyMinutes,
    intro,
    isSelf: inviterId === auth.userId,
  });
}
