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

  // Real DB data only — no simulated stats yet
  const detail: UserDetail = {
    ...user,
    membershipType: 'free' as const,
    membershipExpiry: null,
    banned: false,
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
    adminNote: '',
    activityLog: [
      { action: '注册账号', timestamp: user.createdAt, detail: `用户名: ${user.username}` },
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

  const check = await db.exec('SELECT id FROM users WHERE id = ?', [id]);
  if (check.length === 0 || check[0].values.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  // Real persistence needs schema migration for membership/banned columns
  const updated = {
    success: true,
    applied: body,
    message: '会员/封禁字段需要在数据库中添加对应列后持久化。',
  };

  return NextResponse.json(updated);
}
