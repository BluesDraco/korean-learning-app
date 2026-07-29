import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { InviteFraudResponse, FraudIpGroup } from '@/types/admin';

// 含鉴权/PII(IP)，禁止缓存
export const dynamic = 'force-dynamic';

// 邀请防刷监控：找出同一 IP 下产生多条邀请归因的可疑聚合。
// consume 已按 device_hash 去重，IP 仅打标不拒绝（避免同 WiFi 误伤），
// 故这里把「同 IP ≥ 阈值」的聚合暴露给管理员人工研判。
const IP_THRESHOLD = 3;

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  // 按 IP 聚合：该 IP 下的邀请条数、涉及的不同邀请人数、合格数
  const rows = await db.exec(
    `SELECT ip,
            COUNT(*) AS cnt,
            COUNT(DISTINCT inviter_id) AS inviters,
            SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END) AS qualified
     FROM invitations
     WHERE ip != '' AND ip != '127.0.0.1'
     GROUP BY ip
     HAVING cnt >= ?
     ORDER BY cnt DESC
     LIMIT 100`,
    [IP_THRESHOLD],
  );

  const groups: FraudIpGroup[] = (rows[0]?.values ?? []).map((r) => ({
    ip: r[0] as string,
    count: Number(r[1] ?? 0),
    inviters: Number(r[2] ?? 0),
    qualified: Number(r[3] ?? 0),
  }));

  return NextResponse.json(
    { threshold: IP_THRESHOLD, groups } satisfies InviteFraudResponse,
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
