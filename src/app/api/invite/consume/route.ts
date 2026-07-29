import { NextResponse } from 'next/server';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function POST(request: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { code?: string; deviceHash?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
  const deviceHash = typeof body.deviceHash === 'string' ? body.deviceHash : '';
  const ip = getClientIp(request);
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const db = await getDb();

  // 幂等：被邀请者只能被归因一次
  const already = await db.exec('SELECT id FROM invitations WHERE invitee_id = ?', [auth.userId]);
  if (already[0] && already[0].values.length > 0) return NextResponse.json({ ok: true });

  // 查邀请人
  const inv = await db.exec('SELECT id FROM users WHERE invite_code = ?', [code]);
  const inviterId = inv[0]?.values[0]?.[0];
  if (typeof inviterId !== 'string' || !inviterId) return NextResponse.json({ error: '邀请码无效' }, { status: 404 });

  // 防自邀
  if (inviterId === auth.userId) return NextResponse.json({ ok: true });

  // 防刷去重：同 inviter 下同设备指纹已存在 → 拒绝计入（IP 仅打标，不据此拒绝，避免同 WiFi 误伤）
  if (deviceHash) {
    const dup = await db.exec(
      `SELECT id FROM invitations WHERE inviter_id = ? AND device_hash = ? AND device_hash != ''`,
      [inviterId, deviceHash],
    );
    if (dup[0] && dup[0].values.length > 0) return NextResponse.json({ ok: true, deduped: true });
  }

  await db.run(
    `INSERT INTO invitations (id, inviter_id, invitee_id, code, status, device_hash, ip, created_at)
     VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)
     ON CONFLICT(invitee_id) DO NOTHING`,
    [generateId(), inviterId, auth.userId, code, deviceHash, ip, Date.now()],
  );
  return NextResponse.json({ ok: true });
}
