import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const PHONE_RE = /^[0-9+\-\s]{6,20}$/;

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });

  const db = await getDb();
  const rows = await db.exec(
    `SELECT threshold, status, tracking_no FROM invite_shipments WHERE user_id = ?`,
    [auth.userId],
  );
  const shipments = (rows[0]?.values ?? []).map((r) => ({
    threshold: Number(r[0]),
    status: r[1] as string,
    trackingNo: (r[2] as string) || '',
  }));
  return NextResponse.json({ shipments }, { headers: NO_STORE });
}

export async function POST(request: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });

  let body: { threshold?: unknown; recipient?: unknown; phone?: unknown; address?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: NO_STORE }); }

  const threshold = Number(body.threshold);
  if (threshold !== 8 && threshold !== 12) return NextResponse.json({ error: '档位无效' }, { status: 400, headers: NO_STORE });

  const recipient = typeof body.recipient === 'string' ? body.recipient.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const address = typeof body.address === 'string' ? body.address.trim() : '';
  if (recipient.length < 1 || recipient.length > 40) return NextResponse.json({ error: '收件人姓名 1-40 字' }, { status: 400, headers: NO_STORE });
  if (!PHONE_RE.test(phone)) return NextResponse.json({ error: '手机号格式有误' }, { status: 400, headers: NO_STORE });
  if (address.length < 5 || address.length > 200) return NextResponse.json({ error: '收货地址 5-200 字' }, { status: 400, headers: NO_STORE });

  const db = await getDb();

  // 自证资格
  if (threshold === 8) {
    const won = await db.exec(
      `SELECT status FROM invite_rewards WHERE user_id = ? AND threshold = 8`,
      [auth.userId],
    );
    if (won[0]?.values[0]?.[0] !== 'won') return NextResponse.json({ error: '无抽奖中奖资格' }, { status: 403, headers: NO_STORE });
  } else {
    const cnt = await db.exec(
      `SELECT COUNT(*) FROM invitations WHERE inviter_id = ? AND status = 'qualified'`,
      [auth.userId],
    );
    if (Number(cnt[0]?.values[0]?.[0] ?? 0) < 12) return NextResponse.json({ error: '未达 12 人档' }, { status: 403, headers: NO_STORE });
    // 登记礼盒资格（幂等）
    await db.run(
      `INSERT INTO invite_rewards (id, user_id, threshold, days_granted, reward_type, status, created_at)
       VALUES (?, ?, 12, 0, 'giftbox', 'won', ?)
       ON CONFLICT(user_id, threshold) DO NOTHING`,
      [generateId(), auth.userId, Date.now()],
    );
  }

  const now = Date.now();
  const ins = await db.run(
    `INSERT INTO invite_shipments (id, user_id, threshold, box_type, status, recipient, phone, address, created_at, updated_at)
     VALUES (?, ?, ?, 'standard', 'pending', ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, threshold) DO NOTHING`,
    [generateId(), auth.userId, threshold, recipient, phone, address, now, now],
  );
  if (ins.rowsAffected === 0) return NextResponse.json({ ok: true, already: true }, { headers: NO_STORE });

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
