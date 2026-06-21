import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const db = await getDb();

  const result = await db.exec(
    `SELECT id, username, nickname, email, created_at, last_login_at
     FROM users
     ORDER BY created_at DESC`
  );

  const users = (result[0]?.values ?? []).map((row) => ({
    id: row[0] as string,
    username: row[1] as string,
    nickname: (row[2] as string) || '',
    email: (row[3] as string) || '',
    createdAt: row[4] as number,
    lastLoginAt: (row[5] as number | null) ?? null,
  }));

  // 按日期分组统计
  const byDate: Record<string, number> = {};
  for (const u of users) {
    const date = new Date(u.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    byDate[date] = (byDate[date] || 0) + 1;
  }

  const dailyStats = Object.entries(byDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => b.date.localeCompare(a.date));

  return NextResponse.json({ users, dailyStats, total: users.length });
}
