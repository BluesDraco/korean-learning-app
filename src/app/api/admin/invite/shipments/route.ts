import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底 + 含收货 PII，必须 force-dynamic + no-store
export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

const STATUSES = ['pending', 'approved', 'shipped', 'done', 'rejected'] as const;
type ShipStatus = (typeof STATUSES)[number];
function isStatus(v: unknown): v is ShipStatus {
  return typeof v === 'string' && (STATUSES as readonly string[]).includes(v);
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status') || 'all';

  const db = await getDb();
  const where: string[] = ['1=1'];
  const params: unknown[] = [];
  if (isStatus(statusFilter)) { where.push('s.status = ?'); params.push(statusFilter); }

  const rows = await db.exec(
    `SELECT s.id, s.user_id, u.username, u.nickname, s.threshold, s.box_type, s.status,
            s.recipient, s.phone, s.address, s.tracking_no, s.detail, s.created_at, s.updated_at
     FROM invite_shipments s LEFT JOIN users u ON u.id = s.user_id
     WHERE ${where.join(' AND ')}
     ORDER BY (s.status IN ('done','rejected')) ASC, s.created_at DESC`,
    params,
  );

  const shipments = (rows[0]?.values ?? []).map((r) => ({
    id: r[0] as string,
    userId: r[1] as string,
    username: (r[2] as string) || '(已注销)',
    nickname: (r[3] as string) || '',
    threshold: Number(r[4]),
    boxType: (r[5] as string) || 'standard',
    status: r[6] as string,
    recipient: (r[7] as string) || '',
    phone: (r[8] as string) || '',
    address: (r[9] as string) || '',
    trackingNo: (r[10] as string) || '',
    detail: (r[11] as string) || '',
    createdAt: Number(r[12] ?? 0),
    updatedAt: Number(r[13] ?? 0),
  }));

  return NextResponse.json({ shipments }, { headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: { id?: unknown; status?: unknown; trackingNo?: unknown; detail?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE }); }

  const id = typeof body.id === 'string' ? body.id : '';
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400, headers: NO_STORE });

  const sets: string[] = [];
  const params: unknown[] = [];
  if (isStatus(body.status)) { sets.push('status = ?'); params.push(body.status); }
  if (typeof body.trackingNo === 'string') { sets.push('tracking_no = ?'); params.push(body.trackingNo.slice(0, 60)); }
  if (typeof body.detail === 'string') { sets.push('detail = ?'); params.push(body.detail.slice(0, 1000)); }
  if (sets.length === 0) return NextResponse.json({ error: '无可更新字段' }, { status: 400, headers: NO_STORE });

  sets.push('updated_at = ?');
  params.push(Date.now(), id);

  const db = await getDb();
  const res = await db.run(`UPDATE invite_shipments SET ${sets.join(', ')} WHERE id = ?`, params);
  if (res.rowsAffected === 0) return NextResponse.json({ error: '记录不存在' }, { status: 404, headers: NO_STORE });

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
