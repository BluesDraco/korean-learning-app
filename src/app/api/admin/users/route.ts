import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { AdminUser, AdminUsersResponse } from '@/types/admin';

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

  // Build WHERE clause
  let whereClause = 'WHERE 1=1';
  const params: unknown[] = [];

  if (search) {
    whereClause += ' AND (username LIKE ? OR nickname LIKE ? OR email LIKE ?)';
    const q = `%${search}%`;
    params.push(q, q, q);
  }

  // COUNT query for pagination total
  const countResult = await db.exec(`SELECT COUNT(*) as total FROM users ${whereClause}`, params);
  const totalCount = countResult.length > 0 ? Number(countResult[0].values[0]?.[0] ?? 0) : 0;

  // Main query with SQL-level pagination
  let sql = `SELECT id, username, nickname, email, role, membership_type, membership_expiry, banned, created_at FROM users ${whereClause}`;
  if (sort === 'newest') sql += ' ORDER BY created_at DESC';
  else if (sort === 'oldest') sql += ' ORDER BY created_at ASC';

  const offset = (page - 1) * pageSize;
  sql += ' LIMIT ? OFFSET ?';
  const queryParams = [...params, pageSize, offset];

  const result = await db.exec(sql, queryParams);
  const rawUsers: { id: string; username: string; nickname: string; email: string; role: string; membershipType: string; membershipExpiry: number | null; banned: number; createdAt: number }[] =
    result.length > 0
      ? result[0].values.map((row) => ({
          id: row[0] as string,
          username: row[1] as string,
          nickname: row[2] as string,
          email: row[3] as string,
          role: row[4] as string,
          membershipType: (row[5] as string) || 'free',
          membershipExpiry: row[6] as number | null,
          banned: row[7] as number,
          createdAt: row[8] as number,
        }))
      : [];

  const users: AdminUser[] = rawUsers.map((u) => ({
    ...u,
    membershipType: u.membershipType as AdminUser['membershipType'],
    membershipExpiry: u.membershipExpiry ?? null,
    banned: u.banned === 1,
    studyDays: 0,
    totalXp: 0,
    wordsLearned: 0,
  }));

  // Status filtering in JS
  let filtered = users;
  if (status === 'banned') filtered = users.filter((u) => u.banned);
  else if (status === 'vip') filtered = users.filter((u) => u.membershipType !== 'free');

  // Use COUNT total for "all", page-size estimate for filtered views
  const total = status === 'all' ? totalCount : totalCount;

  const response: AdminUsersResponse = { users: filtered, total, page, pageSize };
  return NextResponse.json(response);
}
