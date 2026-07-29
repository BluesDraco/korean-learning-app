import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { AdminUser, AdminUsersResponse } from '@/types/admin';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

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
  const now = Date.now();

  // Build WHERE clause
  let whereClause = 'WHERE 1=1';
  const params: unknown[] = [];

  if (search) {
    whereClause += ' AND (username LIKE ? OR nickname LIKE ? OR email LIKE ?)';
    const q = `%${search}%`;
    params.push(q, q, q);
  }

  // VIP filter at SQL level (with expiry fallback) so pagination/total stay correct
  if (status === 'vip') {
    whereClause += " AND membership_type != 'free' AND (membership_type = 'lifetime' OR membership_expiry IS NULL OR membership_expiry >= ?)";
    params.push(now);
  }

  // COUNT query for pagination total
  const countResult = await db.exec(`SELECT COUNT(*) as total FROM users ${whereClause}`, params);
  const totalCount = countResult.length > 0 ? Number(countResult[0].values[0]?.[0] ?? 0) : 0;

  // Main query with SQL-level pagination
  let sql = `SELECT id, username, nickname, email, role, created_at, membership_type, membership_expiry FROM users ${whereClause}`;
  if (sort === 'newest') sql += ' ORDER BY created_at DESC';
  else if (sort === 'oldest') sql += ' ORDER BY created_at ASC';

  const offset = (page - 1) * pageSize;
  sql += ' LIMIT ? OFFSET ?';
  const queryParams = [...params, pageSize, offset];

  const result = await db.exec(sql, queryParams);
  const rawUsers: { id: string; username: string; nickname: string; email: string; role: string; createdAt: number; membershipType: AdminUser['membershipType'] }[] =
    result.length > 0
      ? result[0].values.map((row) => {
          const rawTier = row[6] as string | null;
          const expiry = typeof row[7] === 'number' ? row[7] : null;
          const validTiers: AdminUser['membershipType'][] = ['free', 'monthly', 'yearly', 'lifetime'];
          let tier: AdminUser['membershipType'] = validTiers.includes(rawTier as AdminUser['membershipType'])
            ? (rawTier as AdminUser['membershipType']) : 'free';
          if (tier !== 'free' && tier !== 'lifetime' && expiry != null && expiry < now) tier = 'free';
          return {
            id: row[0] as string,
            username: row[1] as string,
            nickname: row[2] as string,
            email: row[3] as string,
            role: row[4] as string,
            createdAt: row[5] as number,
            membershipType: tier,
          };
        })
      : [];

  // Batch-query real stats
  const userIds = rawUsers.map((u) => u.id);
  const statsMap: Record<string, { words: number; sentences: number; recordings: number; kpop: number; diary: number; studyDays: number; xp: number }> = {};

  if (userIds.length > 0) {
    try {
      const idsPlaceholders = userIds.map(() => '?').join(',');

      const batchStats = async (table: string) => {
        const r = await db.exec(
          `SELECT user_id, COUNT(*) as cnt FROM ${table} WHERE user_id IN (${idsPlaceholders}) GROUP BY user_id`,
          userIds
        );
        const map: Record<string, number> = {};
        for (const row of r[0]?.values ?? []) {
          map[row[0] as string] = Number(row[1]);
        }
        return map;
      };

      const [wordsMap, sentencesMap, recordingsMap, kpopMap, diaryMap] = await Promise.all([
        batchStats('user_words'),
        batchStats('user_sentences'),
        batchStats('user_recordings'),
        batchStats('user_kpop_progress'),
        batchStats('user_diary'),
      ]);

      const profileMap: Record<string, { studyDays: number; xp: number }> = {};
      try {
        const pRes = await db.exec(
          `SELECT user_id, streak, xp FROM user_profiles WHERE user_id IN (${idsPlaceholders})`,
          userIds
        );
        for (const row of pRes[0]?.values ?? []) {
          profileMap[row[0] as string] = { studyDays: Number(row[1]), xp: Number(row[2]) };
        }
      } catch { /* profiles may not exist */ }

      for (const id of userIds) {
        statsMap[id] = {
          words: wordsMap[id] || 0,
          sentences: sentencesMap[id] || 0,
          recordings: recordingsMap[id] || 0,
          kpop: kpopMap[id] || 0,
          diary: diaryMap[id] || 0,
          studyDays: profileMap[id]?.studyDays || 0,
          xp: profileMap[id]?.xp || 0,
        };
      }
    } catch { /* best effort */ }
  }

  const users: AdminUser[] = rawUsers.map((u) => ({
    ...u,
    membershipExpiry: null,
    studyDays: statsMap[u.id]?.studyDays ?? 0,
    totalXp: statsMap[u.id]?.xp ?? 0,
    wordsLearned: statsMap[u.id]?.words ?? 0,
    sentencesCount: statsMap[u.id]?.sentences ?? 0,
    recordingsCount: statsMap[u.id]?.recordings ?? 0,
    kpopCount: statsMap[u.id]?.kpop ?? 0,
    diaryCount: statsMap[u.id]?.diary ?? 0,
  } as AdminUser));

  const response: AdminUsersResponse = { users, total: totalCount, page, pageSize };
  return NextResponse.json(response);
}
