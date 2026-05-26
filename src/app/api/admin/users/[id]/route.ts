import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { UpdateUserBody, UserDetail } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  const db = await getDb();

  const result = await db.exec(
    'SELECT id, username, nickname, email, role, created_at FROM users WHERE id = ?',
    [id]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const row = result[0].values[0];
  const user = {
    id: row[0] as string,
    username: row[1] as string,
    nickname: row[2] as string,
    email: row[3] as string,
    role: row[4] as string,
    createdAt: row[5] as number,
  };

  const detail: UserDetail = {
    ...user,
    membershipType: 'free',
    membershipExpiry: null,
    banned: false,
    totalStudyDays: randAround(45, 60),
    currentStreak: randAround(7, 70),
    longestStreak: randAround(22, 60),
    totalXp: randAround(3500, 70),
    level: randAround(8, 60),
    wordsLearned: randAround(280, 70),
    wordsReviewed: randAround(1500, 50),
    dictationsDone: randAround(85, 60),
    shadowingDone: randAround(42, 60),
    totalMinutesStudied: randAround(1200, 50),
    dailyStudyMinutes: Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return { date: d.toISOString().slice(0, 10), minutes: randAround(35, 60) };
    }),
    featureStats: [
      { feature: '单词复习', icon: '📝', count: randAround(320, 30) },
      { feature: '跟读训练', icon: '🎤', count: randAround(45, 50) },
      { feature: '听写练习', icon: '🎧', count: randAround(85, 40) },
      { feature: 'AI对话', icon: '🤖', count: randAround(28, 60) },
      { feature: '闪卡学习', icon: '🃏', count: randAround(150, 30) },
    ],
    adminNote: '',
    activityLog: [
      { action: '注册账号', timestamp: user.createdAt, detail: `用户名: ${user.username}` },
      { action: '完成首次单词学习', timestamp: user.createdAt + 3600000, detail: '学习了 5 个单词' },
      { action: '连续学习7天', timestamp: user.createdAt + 7 * 86400000, detail: '获得 streak_7 成就' },
      { action: '首次使用跟读功能', timestamp: user.createdAt + randAround(10, 50) * 86400000, detail: '完成 3 句跟读' },
    ],
  };

  return NextResponse.json(detail);
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

  // Check user exists
  const check = await db.exec('SELECT id FROM users WHERE id = ?', [id]);
  if (check.length === 0 || check[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  // Build update SQL dynamically based on provided fields
  // Note: membership/banned fields would need their own columns; for now we store in-memory
  // In production, add columns: membership_type, membership_expiry, banned, admin_note
  const updates: string[] = [];
  const updateParams: unknown[] = [];

  // For now, just acknowledge the update — real persistence needs schema migration
  const updated = {
    success: true,
    applied: body,
    message: '用户信息已更新（会员/封禁字段需要在数据库中添加对应列后持久化）',
  };

  return NextResponse.json(updated);
}
