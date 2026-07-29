import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { ErrorLogsResponse, ErrorLogItem } from '@/types/admin';

// 6-26 事故兜底：含鉴权数据的 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

const LEVELS = ['error', 'warn', 'critical'] as const;

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level') || 'all';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 30));

  const levelFilter = (LEVELS as readonly string[]).includes(level) ? level : null;
  const where = levelFilter ? 'WHERE level = ?' : '';
  const whereParams = levelFilter ? [levelFilter] : [];

  const db = await getDb();

  const totalRow = await db.exec(`SELECT COUNT(*) FROM error_logs ${where}`, whereParams);
  const total = Number(totalRow[0]?.values[0]?.[0] ?? 0);

  // 最近 24h 各级计数（概览）
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const countRows = await db.exec(
    `SELECT level, COUNT(*) FROM error_logs WHERE created_at >= ? GROUP BY level`,
    [dayAgo],
  );
  const last24h: Record<string, number> = { error: 0, warn: 0, critical: 0 };
  for (const r of countRows[0]?.values ?? []) {
    const lv = String(r[0]);
    if (lv in last24h) last24h[lv] = Number(r[1] ?? 0);
  }

  const rows = await db.exec(
    `SELECT id, level, source, message, detail, user_id, created_at
     FROM error_logs ${where}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...whereParams, pageSize, (page - 1) * pageSize],
  );

  const logs: ErrorLogItem[] = (rows[0]?.values ?? []).map((r) => ({
    id: r[0] as string,
    level: String(r[1]) as ErrorLogItem['level'],
    source: (r[2] as string) || '',
    message: (r[3] as string) || '',
    detail: (r[4] as string) || '',
    userId: (r[5] as string) || '',
    createdAt: Number(r[6] ?? 0),
  }));

  const response: ErrorLogsResponse = { logs, total, page, pageSize, last24h };
  return NextResponse.json(response, { headers: { 'Cache-Control': 'private, no-store' } });
}
