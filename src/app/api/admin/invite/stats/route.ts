import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

function dateKey(ts: number): string {
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}
function safeNum(v: unknown): number { return Number(v) || 0; }

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  const [totalRows, qualRows, inviterRows, reach8Rows, reach12Rows, trendRows] = await Promise.all([
    db.exec(`SELECT COUNT(*) FROM invitations`),
    db.exec(`SELECT COUNT(*) FROM invitations WHERE status = 'qualified'`),
    db.exec(`SELECT COUNT(DISTINCT inviter_id) FROM invitations`),
    db.exec(`SELECT COUNT(*) FROM (SELECT inviter_id FROM invitations WHERE status='qualified' GROUP BY inviter_id HAVING COUNT(*) >= 8)`),
    db.exec(`SELECT COUNT(*) FROM (SELECT inviter_id FROM invitations WHERE status='qualified' GROUP BY inviter_id HAVING COUNT(*) >= 12)`),
    db.exec(`SELECT qualified_at FROM invitations WHERE status='qualified' AND qualified_at IS NOT NULL ORDER BY qualified_at ASC`),
  ]);

  const totalInvites = safeNum(totalRows[0]?.values[0]?.[0]);
  const qualified = safeNum(qualRows[0]?.values[0]?.[0]);
  const inviters = safeNum(inviterRows[0]?.values[0]?.[0]);
  const reached8 = safeNum(reach8Rows[0]?.values[0]?.[0]);
  const reached12 = safeNum(reach12Rows[0]?.values[0]?.[0]);

  const kFactor = inviters > 0 ? Math.round((qualified / inviters) * 100) / 100 : 0;
  const convRate = totalInvites > 0 ? Math.round((qualified / totalInvites) * 100) : 0;

  // 近 30 天每日合格趋势
  const buckets = new Map<string, number>();
  for (const row of trendRows[0]?.values ?? []) {
    const k = dateKey(Number(row[0]));
    buckets.set(k, (buckets.get(k) ?? 0) + 1);
  }
  const dailyTrend: { date: string; qualified: number }[] = [];
  const today = new Date(Date.now() + 8 * 3600000);
  today.setUTCHours(0, 0, 0, 0);
  for (let i = 29; i >= 0; i--) {
    const ts = today.getTime() - 8 * 3600000 - i * 86400000;
    const k = dateKey(ts);
    dailyTrend.push({ date: k.slice(5), qualified: buckets.get(k) ?? 0 });
  }

  const funnel = {
    invited: { total: totalInvites, rate: 100 },
    qualified: { total: qualified, rate: convRate },
    tier8: { total: reached8, rate: qualified > 0 ? Math.round((reached8 / inviters || 0) * 100) : 0 },
    tier12: { total: reached12, rate: qualified > 0 ? Math.round((reached12 / inviters || 0) * 100) : 0 },
  };

  return NextResponse.json({
    metrics: { totalInvites, qualified, convRate, kFactor, inviters, reached8, reached12 },
    funnel,
    dailyTrend,
  }, { headers: NO_STORE });
}
