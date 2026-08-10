import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin-guard';
import { fetchPeerSite, hasPeerConfigured } from '@/lib/server/internalAuth';
import { generateId } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

function buildQuery(db: Awaited<ReturnType<typeof getDb>>) {
  return db.exec(`
    SELECT u.id, u.username, u.nickname, u.email as user_email, u.phone as user_phone,
      s.wechat, s.email as ship_email, s.recipient, s.phone as ship_phone, s.address,
      s.status as ship_status, s.tracking_no, s.note,
      MIN(o.created_at) as first_purchase
    FROM users u
    JOIN orders o ON o.user_id = u.id AND o.tier = 'lifetime' AND o.status = 'paid'
    LEFT JOIN lifetime_shipments s ON s.user_id = u.id
    WHERE u.membership_type = 'lifetime'
    GROUP BY u.id
    ORDER BY first_purchase ASC
  `);
}

function formatRows(rows: Awaited<ReturnType<typeof buildQuery>>) {
  return (rows[0]?.values ?? []).map((r, i) => ({
    serialNumber: i + 1, userId: r[0] as string, username: r[1] as string,
    nickname: (r[2] as string) || '', userEmail: (r[3] as string) || '',
    userPhone: (r[4] as string) || '', wechat: (r[5] as string) || '',
    shipEmail: (r[6] as string) || '', recipient: (r[7] as string) || '',
    shipPhone: (r[8] as string) || '', address: (r[9] as string) || '',
    shipStatus: (r[10] as string) || 'pending', trackingNo: (r[11] as string) || '',
    note: (r[12] as string) || '', firstPurchase: r[13] as number,
  }));
}

export async function GET(req: NextRequest) {
  await requireAdmin();
  const scope = req.nextUrl.searchParams.get('scope');
  if (scope === 'overseas') {
    if (!hasPeerConfigured()) return NextResponse.json({ members: [], stats: { total: 0, shipped: 0, hasAddress: 0 }, peerError: '海外站未配置' });
    try { return NextResponse.json(await fetchPeerSite<{ members: unknown[]; stats: unknown }>('/api/internal/lifetime-gifts')); }
    catch (e) { return NextResponse.json({ members: [], stats: { total: 0, shipped: 0, hasAddress: 0 }, peerError: e instanceof Error ? e.message : '海外站连接失败' }); }
  }
  const db = await getDb();
  const members = formatRows(await buildQuery(db));
  return NextResponse.json({ members, stats: { total: members.length, shipped: members.filter(m => m.shipStatus === 'shipped').length, hasAddress: members.filter(m => m.recipient && m.address).length } });
}

export async function PATCH(req: Request) {
  await requireAdmin();
  const db = await getDb();
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: '请求格式错误' }, { status: 400 }); }
  const userId = typeof body.userId === 'string' ? body.userId.trim() : '';
  const shipStatus = typeof body.shipStatus === 'string' ? body.shipStatus.trim() : '';
  const trackingNo = typeof body.trackingNo === 'string' ? body.trackingNo.trim() : '';
  const note = typeof body.note === 'string' ? body.note.trim() : '';
  if (!userId) return NextResponse.json({ error: '缺少 userId' }, { status: 400 });

  const VALID_STATUSES = new Set(['pending', 'prepared', 'shipped', 'delivered']);
  if (shipStatus && !VALID_STATUSES.has(shipStatus)) return NextResponse.json({ error: `无效状态: ${shipStatus}` }, { status: 400 });

  const sets: string[] = [];
  const vals: (string | number)[] = [];
  const now = Date.now();
  if (shipStatus) { sets.push('status = ?'); vals.push(shipStatus); }
  if ('trackingNo' in body) { sets.push('tracking_no = ?'); vals.push(trackingNo); }
  if ('note' in body) { sets.push('note = ?'); vals.push(note); }
  if (sets.length === 0) return NextResponse.json({ error: '无更新字段' }, { status: 400 });
  sets.push('updated_at = ?'); vals.push(now); vals.push(userId);

  const result = await db.run(`UPDATE lifetime_shipments SET ${sets.join(', ')} WHERE user_id = ?`, vals);
  if (result.rowsAffected === 0) {
    const id = generateId();
    await db.run(`INSERT INTO lifetime_shipments (id, user_id, status, tracking_no, note, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, userId, shipStatus || 'pending', trackingNo, note, now, now]);
  }
  return NextResponse.json({ ok: true });
}
