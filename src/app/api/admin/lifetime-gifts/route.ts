import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin-guard';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  await requireAdmin();
  const db = await getDb();
  const rows = await db.exec(`SELECT u.id, u.username, u.nickname, s.wechat, s.email as ship_email, s.recipient, s.phone, s.address, s.status, s.tracking_no, s.note, MIN(o.created_at) as first_purchase FROM users u JOIN orders o ON o.user_id = u.id AND o.tier='lifetime' AND o.status='paid' LEFT JOIN lifetime_shipments s ON s.user_id = u.id WHERE u.membership_type='lifetime' GROUP BY u.id ORDER BY first_purchase ASC`);
  const members = (rows[0]?.values ?? []).map((r: any, i: number) => ({ serialNumber: i + 1, userId: r[0], username: r[1], nickname: r[2] || '', wechat: r[3] || '', shipEmail: r[4] || '', recipient: r[5] || '', phone: r[6] || '', address: r[7] || '', shipStatus: r[8] || 'pending', trackingNo: r[9] || '', note: r[10] || '', firstPurchase: r[11] }));
  return NextResponse.json({ members, stats: { total: members.length, shipped: members.filter((m: any) => m.shipStatus === 'shipped').length, hasAddress: members.filter((m: any) => m.recipient && m.address).length } });
}
