import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { SystemResponse, HighUsageUser } from '@/types/admin';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  const now = Date.now();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthStartMs = monthStart.getTime();

  let totalCallsThisMonth = 0;
  let totalCostThisMonth = 0;
  const dailyCalls: { date: string; calls: number; tokens: number }[] = [];
  const topUsers: HighUsageUser[] = [];

  try {
    const totals = await db.exec(
      `SELECT COUNT(*) as calls, COALESCE(SUM(cost), 0) as cost
       FROM ai_usage WHERE created_at >= ?`,
      [monthStartMs]
    );
    if (totals[0]?.values?.[0]) {
      totalCallsThisMonth = Number(totals[0].values[0][0] ?? 0);
      totalCostThisMonth = Number(totals[0].values[0][1] ?? 0);
    }

    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const daily = await db.exec(
      `SELECT
         strftime('%Y-%m-%d', datetime(created_at / 1000, 'unixepoch')) as day,
         COUNT(*) as calls
       FROM ai_usage
       WHERE created_at >= ?
       GROUP BY day
       ORDER BY day ASC`,
      [thirtyDaysAgo]
    );
    for (const row of daily[0]?.values ?? []) {
      dailyCalls.push({ date: row[0] as string, calls: Number(row[1]), tokens: 0 });
    }
  } catch (e) {
    console.error('[admin/system] ai_usage query failed', e);
  }

  try {
    const topRes = await db.exec(
      `SELECT u.username, a.user_id, COUNT(*) as calls
       FROM ai_usage a
       LEFT JOIN users u ON u.id = a.user_id
       WHERE a.created_at >= ?
       GROUP BY a.user_id
       ORDER BY calls DESC
       LIMIT 10`,
      [monthStartMs]
    );
    for (const row of topRes[0]?.values ?? []) {
      topUsers.push({
        userId: row[1] as string,
        username: (row[0] as string) || 'unknown',
        totalCalls: Number(row[2]),
        totalTokens: 0,
        estimatedCost: 0,
        membershipType: 'free',
      });
    }
  } catch (e) {
    console.error('[admin/system] top users query failed', e);
  }

  const response: SystemResponse = {
    cpuMemoryHistory: [],
    errorLogs: [],
    aiUsage: {
      totalCallsThisMonth,
      totalTokensThisMonth: 0,
      totalCostThisMonth,
      dailyCalls,
    },
    topUsers,
  };

  return NextResponse.json(response);
}
