import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { assertInternalCaller } from '@/lib/server/internalAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!assertInternalCaller(req)) return NextResponse.json({ error: '未授权' }, { status: 403 });
  const db = await getDb();
  const rows = await db.exec(`
    SELECT u.id, u.username, u.nickname, u.email as user_email, u.phone as user_phone,
      s.wechat, s.email as ship_email, s.recipient, s.phone as ship_phone, s.address,
      s.status as ship_status, s.tracking_no, s.note,
      MIN(o.created_at) as first_purchase
    FROM users u
    JOIN orders o ON o.user_id = u.id AND o.tier = 'lifetime' AND o.status = 'paid'
    LEFT JOIN lifetime_shipments s ON s.user_id = u.id
    WHERE u.membership_type = 'lifetime'
    GROUP BY u.id ORDER BY first_purchase ASC
  `);
  const members = (rows[0]?.values ?? []).map((r, i) => ({
    serialNumber: i + 1, userId: r[0] as string, username: r[1] as string,
    nickname: (r[2] as string) || '', userEmail: (r[3] as string) || '',
    userPhone: (r[4] as string) || '', wechat: (r[5] as string) || '',
    shipEmail: (r[6] as string) || '', recipient: (r[7] as string) || '',
    shipPhone: (r[8] as string) || '', address: (r[9] as string) || '',
    shipStatus: (r[10] as string) || 'pending', trackingNo: (r[11] as string) || '',
    note: (r[12] as string) || '', firstPurchase: r[13] as number,
  }));
  return NextResponse.json({ members, stats: { total: members.length, shipped: members.filter(m => m.shipStatus === 'shipped').length, hasAddress: members.filter(m => m.recipient && m.address).length } });
}
