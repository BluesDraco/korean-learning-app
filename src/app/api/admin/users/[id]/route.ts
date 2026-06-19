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
    'SELECT id, username, nickname, email, role, membership_type, membership_expiry, banned, admin_note, created_at, last_login_at FROM users WHERE id = ?',
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
    lastLoginAt: row[10] as number,
  };

  try {
    // Query real counts from all user tables
    const tables = ['user_words', 'user_sentences', 'user_recordings', 'user_kpop_progress', 'user_diary'];
    const counts: Record<string, number> = {};
    for (const table of tables) {
      try {
        const r = await db.exec(`SELECT COUNT(*) FROM ${table} WHERE user_id = ?`, [userId]);
        counts[table] = Number(r[0]?.values?.[0]?.[0] ?? 0);
      } catch { counts[table] = 0; }
    }

    // Profile stats
    let profile: { streak: number; longestStreak: number; level: number; xp: number } = { streak: 0, longestStreak: 0, level: 0, xp: 0 };
    try {
      const pRes = await db.exec(
        'SELECT streak, longest_streak, level, xp FROM user_profiles WHERE user_id = ?',
        [userId]
      );
      const pRow = pRes[0]?.values?.[0];
      if (pRow) {
        profile = { streak: Number(pRow[0]), longestStreak: Number(pRow[1]), level: Number(pRow[2]), xp: Number(pRow[3]) };
      }
    } catch { /* no profile */ }

    // Total study days from page_views
    let totalStudyDays = 0;
    try {
      const pvRes = await db.exec(
        `SELECT COUNT(DISTINCT date(created_at/1000, 'unixepoch')) as days FROM page_views WHERE user_id = ?`,
        [userId]
      );
      totalStudyDays = Number(pvRes[0]?.values?.[0]?.[0] ?? 0);
    } catch { /* ignore */ }

    // AI usage count
    let aiCalls = 0;
    try {
      const aiRes = await db.exec(`SELECT COUNT(*) FROM ai_usage WHERE user_id = ?`, [userId]);
      aiCalls = Number(aiRes[0]?.values?.[0]?.[0] ?? 0);
    } catch { /* ignore */ }

    // 7-day study minutes from study_logs
    const dailyStudyMinutes: { date: string; minutes: number }[] = [];
    try {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const logRes = await db.exec(
        `SELECT date(created_at/1000, 'unixepoch') as day, COUNT(*) as cnt FROM study_logs WHERE user_id = ? AND created_at > ? GROUP BY day ORDER BY day`,
        [userId, sevenDaysAgo]
      );
      for (const logRow of logRes[0]?.values ?? []) {
        dailyStudyMinutes.push({ date: logRow[0] as string, minutes: Number(logRow[1]) * 2 }); // estimate 2 min per log
      }
    } catch { /* ignore */ }

    // Activity log
    const activityLog: UserDetail['activityLog'] = [
      { action: '注册账号', timestamp: user.createdAt, detail: `用户名: ${user.username}` },
    ];
    if (user.lastLoginAt) {
      activityLog.push({ action: '最近登录', timestamp: user.lastLoginAt, detail: '' });
    }
    try {
      const logRes = await db.exec(
        `SELECT action, details, xp_earned, created_at FROM study_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 30`,
        [userId]
      );
      for (const logRow of logRes[0]?.values ?? []) {
        activityLog.push({
          action: logRow[0] as string,
          timestamp: logRow[3] as number,
          detail: logRow[1] as string || '',
        });
      }
    } catch { /* study_logs may not exist */ }

    // Feature stats
    const dictationsDone = 0; // table may not exist
    const shadowingDone = 0;

    const featureStats = [
      { feature: '我的词', icon: '📝', count: counts['user_words'] || 0 },
      { feature: '我的句子', icon: '💬', count: counts['user_sentences'] || 0 },
      { feature: '我的录音', icon: '🎙️', count: counts['user_recordings'] || 0 },
      { feature: 'KPOP跟唱', icon: '🎤', count: counts['user_kpop_progress'] || 0 },
      { feature: '我的日记', icon: '📔', count: counts['user_diary'] || 0 },
      { feature: 'AI翻译/查词', icon: '🤖', count: aiCalls },
    ];

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
      currentStreak: profile.streak,
      longestStreak: profile.longestStreak,
      totalXp: profile.xp,
      level: profile.level,
      wordsLearned: counts['user_words'] || 0,
      wordsReviewed: 0,
      dictationsDone,
      shadowingDone,
      totalMinutesStudied: 0,
      dailyStudyMinutes,
      featureStats,
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

  // 禁止管理员修改自己的 role
  if (body.role !== undefined && adminCheck.userId === id) {
    return NextResponse.json({ error: '不能修改自己的角色权限' }, { status: 403 });
  }

  // role 白名单校验
  if (body.role !== undefined && !['user', 'admin'].includes(body.role)) {
    return NextResponse.json({ error: '无效的角色值' }, { status: 400 });
  }

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
  if (body.role !== undefined) { sets.push('role = ?'); vals.push(body.role); }

  if (sets.length === 0) {
    return NextResponse.json({ success: false, message: '没有需要更新的字段' });
  }

  sets.push('updated_at = ?');
  vals.push(Date.now());
  vals.push(id);

  await db.run(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, vals);

  return NextResponse.json({ success: true, applied: body });
}
