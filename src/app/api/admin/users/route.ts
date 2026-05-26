import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { AdminUser, AdminUsersResponse } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));

  const db = await getDb();

  // Build query
  let sql = 'SELECT id, username, nickname, email, role, created_at FROM users WHERE 1=1';
  const params: unknown[] = [];

  if (search) {
    sql += ' AND (username LIKE ? OR nickname LIKE ? OR email LIKE ?)';
    const q = `%${search}%`;
    params.push(q, q, q);
  }

  if (sort === 'newest') sql += ' ORDER BY created_at DESC';
  else if (sort === 'oldest') sql += ' ORDER BY created_at ASC';

  const result = await db.exec(sql, params);
  const rawUsers: { id: string; username: string; nickname: string; email: string; role: string; createdAt: number }[] =
    result.length > 0
      ? result[0].values.map((row) => ({
          id: row[0] as string,
          username: row[1] as string,
          nickname: row[2] as string,
          email: row[3] as string,
          role: row[4] as string,
          createdAt: row[5] as number,
        }))
      : [];

  // Enrich with simulated membership / study data
  const memberships = ['free', 'free', 'free', 'monthly', 'yearly'] as const;
  const allUsers: AdminUser[] = rawUsers.map((u) => ({
    ...u,
    membershipType: u.role === 'admin' ? 'yearly' : memberships[Math.floor(Math.random() * memberships.length)],
    membershipExpiry: Math.random() > 0.6 ? Date.now() + randAround(180, 50) * 86400000 : null,
    studyDays: randAround(45, 60),
    totalXp: randAround(3500, 70),
    wordsLearned: randAround(280, 70),
    banned: false,
  }));

  // Filter by status
  let filtered = allUsers;
  if (status === 'active') filtered = allUsers.filter((u) => !u.banned);
  else if (status === 'vip') filtered = allUsers.filter((u) => u.membershipType !== 'free');
  else if (status === 'banned') filtered = allUsers.filter((u) => u.banned);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const response: AdminUsersResponse = { users: paged, total, page, pageSize };
  return NextResponse.json(response);
}
