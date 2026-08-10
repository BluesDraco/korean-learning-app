import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import { hashPassword } from '@/lib/server/auth';
import { TIERS } from '@/lib/membership-benefits';
import type { UpdateUserBody, UserDetail } from '@/types/admin';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const db = await getDb();

  const result = await db.exec(
    'SELECT id, username, nickname, email, role, membership_type, membership_expiry, created_at, last_login_at, status, phone FROM users WHERE id = ?',
    [id]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const row = result[0].values[0];
  const userId = row[0] as string;
  const rawTier = (row[5] as string) || 'free';
  const rawExpiry = row[6] as number | null;
  // 过期回落（与 getUserTier 一致）
  const effectiveTier = (rawTier !== 'free' && rawTier !== 'lifetime' && rawExpiry != null && rawExpiry < Date.now()) ? 'free' : rawTier;
  const user = {
    id: userId,
    username: row[1] as string,
    nickname: row[2] as string,
    email: row[3] as string,
    role: row[4] as string,
    membershipType: effectiveTier,
    membershipExpiry: effectiveTier === 'free' ? null : rawExpiry,
    createdAt: row[7] as number,
    lastLoginAt: row[8] as number,
    status: (row[9] as string) || 'active',
    phone: (row[10] as string) || '',
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
    const featureStats = [
      { feature: '我的词', icon: '📝', count: counts['user_words'] || 0 },
      { feature: '我的句子', icon: '💬', count: counts['user_sentences'] || 0 },
      { feature: '我的录音', icon: '🎙️', count: counts['user_recordings'] || 0 },
      { feature: 'KPOP跟唱', icon: '🎤', count: counts['user_kpop_progress'] || 0 },
      { feature: '我的日记', icon: '📔', count: counts['user_diary'] || 0 },
      { feature: 'AI翻译/查词', icon: '🤖', count: aiCalls },
    ];

    // 订阅状态（海外站）
    let subscription: { status: string; cancelAtPeriodEnd: boolean; currentPeriodEnd: number | null } | null = null;
    try {
      const subRows = await db.exec(
        `SELECT status, cancel_at_period_end, current_period_end FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
        [userId],
      );
      const subRow = subRows[0]?.values[0];
      if (subRow) subscription = { status: subRow[0] as string, cancelAtPeriodEnd: (subRow[1] as number) === 1, currentPeriodEnd: subRow[2] as number | null };
    } catch { /* 表可能不存在 */ }

    const detail: UserDetail = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      status: user.status as UserDetail['status'],
      role: user.role,
      createdAt: user.createdAt,
      membershipType: user.membershipType as UserDetail['membershipType'],
      membershipExpiry: user.membershipExpiry,
      totalStudyDays,
      currentStreak: profile.streak,
      longestStreak: profile.longestStreak,
      totalXp: profile.xp,
      level: profile.level,
      wordsLearned: counts['user_words'] || 0,
      featureStats,
      activityLog,
      subscription,
    };

    return NextResponse.json(detail);
  } catch {
    // Fallback with basic info
    const detail: UserDetail = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      status: user.status as UserDetail['status'],
      role: user.role,
      createdAt: user.createdAt,
      membershipType: user.membershipType as UserDetail['membershipType'],
      membershipExpiry: user.membershipExpiry,
      totalStudyDays: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXp: 0,
      level: 0,
      wordsLearned: 0,
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
  const isSelf = adminCheck.userId === id;

  // 禁止管理员修改自己的 role / status（防自我降权、自我封禁）
  if (body.role !== undefined && isSelf) {
    return NextResponse.json({ error: '不能修改自己的角色权限' }, { status: 403 });
  }
  if (body.status !== undefined && isSelf) {
    return NextResponse.json({ error: '不能封禁自己' }, { status: 403 });
  }

  // 白名单校验
  if (body.role !== undefined && !['user', 'admin'].includes(body.role)) {
    return NextResponse.json({ error: '无效的角色值' }, { status: 400 });
  }
  if (body.status !== undefined && !['active', 'banned'].includes(body.status)) {
    return NextResponse.json({ error: '无效的状态值' }, { status: 400 });
  }
  if (body.membershipType !== undefined && !(TIERS as readonly string[]).includes(body.membershipType)) {
    return NextResponse.json({ error: '无效的会员档位' }, { status: 400 });
  }
  if (body.newPassword !== undefined && (typeof body.newPassword !== 'string' || body.newPassword.length < 6 || body.newPassword.length > 200)) {
    return NextResponse.json({ error: '密码需 6-200 位' }, { status: 400 });
  }
  const emailStr = body.email !== undefined ? String(body.email).trim() : undefined;
  if (emailStr !== undefined && emailStr !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return NextResponse.json({ error: '邮箱格式错误' }, { status: 400 });
  }
  const phoneStr = body.phone !== undefined ? String(body.phone).trim() : undefined;

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

  // 邮箱唯一性校验（排除自身）
  if (emailStr) {
    const dup = await db.exec('SELECT id FROM users WHERE email = ? AND id != ?', [emailStr, id]);
    if (dup[0]?.values[0]) return NextResponse.json({ error: '该邮箱已被其他账号使用' }, { status: 409 });
  }
  if (phoneStr) {
    const dup = await db.exec('SELECT id FROM users WHERE phone = ? AND id != ?', [phoneStr, id]);
    if (dup[0]?.values[0]) return NextResponse.json({ error: '该手机号已被其他账号使用' }, { status: 409 });
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

  // 设为永久时补建 lifetime_perks 履约行（若尚未有）
  if (body.membershipType === 'lifetime') {
    const now = Date.now();
    for (const perkType of ['merch', 'devservice'] as const) {
      try {
        const exists = await db.exec(
          `SELECT id FROM lifetime_perks WHERE user_id = ? AND perk_type = ? LIMIT 1`,
          [id, perkType],
        );
        if (!exists[0]?.values[0]) {
          const { generateId } = await import('@/lib/server/auth');
          await db.run(
            `INSERT INTO lifetime_perks (id, user_id, perk_type, status, detail, created_at, updated_at)
             VALUES (?, ?, ?, 'pending', '', ?, ?)`,
            [generateId(), id, perkType, now, now],
          );
        }
      } catch { /* 表可能不存在 */ }
    }
  }

  // 不回显密码
  const { newPassword: _pw, ...safeApplied } = body;
  return NextResponse.json({ success: true, applied: safeApplied });
}
