import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { UpdateUserBody, UserDetail } from '@/types/admin';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const db = await getDb();

  const result = await db.exec(
    'SELECT id, username, nickname, email, role, membership_type, membership_expiry, banned, admin_note, created_at FROM users WHERE id = ?',
    [id]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const row = result[0].values[0];
  const userId = row[0] as string;
  const user = {
    id: userId,
    username: row[1] as string,
    nickname: row[2] as string,
    email: row[3] as string,
    role: row[4] as string,
    membershipType: (row[5] as string) || 'free',
    membershipExpiry: row[6] as number | null,
    banned: (row[7] as number) === 1,
    adminNote: (row[8] as string) || '',
    createdAt: row[9] as number,
  };

  // Query real stats from server-side tables
  let totalStudyDays = 0;
  let wordsLearned = 0;
  let wordsReviewed = 0;
  let totalMinutesStudied = 0;
  try {
    const pageViewResult = await db.exec(
      `SELECT COUNT(DISTINCT date(created_at/1000, 'unixepoch')) as days FROM page_views WHERE user_id = ?`,
      [userId]
    );
    if (pageViewResult.length > 0 && pageViewResult[0].values.length > 0) {
      totalStudyDays = Number(pageViewResult[0].values[0]?.[0] ?? 0);
    }

    const aiUsageResult = await db.exec(
      `SELECT COUNT(*) as calls FROM ai_usage WHERE user_id = ?`,
      [userId]
    );
    const aiCalls = aiUsageResult.length > 0 ? Number(aiUsageResult[0].values[0]?.[0] ?? 0) : 0;

    const activityLog: UserDetail['activityLog'] = [
      { action: '注册账号', timestamp: user.createdAt, detail: `用户名: ${user.username}` },
    ];
    try {
      const studyLogsResult = await db.exec(
        `SELECT action, details, xp_earned, created_at FROM study_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 30`,
        [userId]
      );
      if (studyLogsResult.length > 0) {
        for (const logRow of studyLogsResult[0].values) {
          activityLog.push({
            action: logRow[0] as string,
            timestamp: logRow[3] as number,
            detail: logRow[1] as string || '',
          });
        }
      }
    } catch { /* study_logs may not exist */ }

    const detail: UserDetail = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      membershipType: user.membershipType as UserDetail['membershipType'],
      membershipExpiry: user.membershipExpiry,
      banned: user.banned,
      adminNote: user.adminNote,
      totalStudyDays,
      currentStreak: 0,
      longestStreak: 0,
      totalXp: 0,
      level: 0,
      wordsLearned,
      wordsReviewed,
      dictationsDone: 0,
      shadowingDone: 0,
      totalMinutesStudied,
      dailyStudyMinutes: [],
      featureStats: [
        { feature: 'AI翻译/查词', icon: '🤖', count: aiCalls },
      ],
      activityLog,
    };

    return NextResponse.json(detail);
  } catch {
    // Fallback with basic info
    const detail: UserDetail = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      membershipType: user.membershipType as UserDetail['membershipType'],
      membershipExpiry: user.membershipExpiry,
      banned: user.banned,
      adminNote: user.adminNote,
      totalStudyDays: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXp: 0,
      level: 0,
      wordsLearned: 0,
      wordsReviewed: 0,
      dictationsDone: 0,
      shadowingDone: 0,
      totalMinutesStudied: 0,
      dailyStudyMinutes: [],
      featureStats: [],
      activityLog: [
        { action: '注册账号', timestamp: user.createdAt, detail: `用户名: ${user.username}` },
      ],
    };
    return NextResponse.json(detail);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const body: UpdateUserBody = await request.json();

  const db = await getDb();

  const check = await db.exec('SELECT id FROM users WHERE id = ?', [id]);
  if (check.length === 0 || check[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const sets: string[] = [];
  const vals: unknown[] = [];

  if (body.membershipType !== undefined) { sets.push('membership_type = ?'); vals.push(body.membershipType); }
  if (body.membershipExpiry !== undefined) { sets.push('membership_expiry = ?'); vals.push(body.membershipExpiry); }
  if (body.banned !== undefined) { sets.push('banned = ?'); vals.push(body.banned ? 1 : 0); }
  if (body.adminNote !== undefined) { sets.push('admin_note = ?'); vals.push(body.adminNote); }

  if (sets.length === 0) {
    return NextResponse.json({ success: false, message: '没有需要更新的字段' });
  }

  sets.push('updated_at = ?');
  vals.push(Date.now());
  vals.push(id);

  await db.run(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, vals);

  return NextResponse.json({ success: true, applied: body });
}
