import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { genInviteCode } from '@/lib/server/invite';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  const rows = await db.exec('SELECT invite_code FROM users WHERE id = ?', [auth.userId]);
  const existing = rows[0]?.values[0]?.[0];
  if (typeof existing === 'string' && existing) {
    return NextResponse.json({ code: existing });
  }

  // 生成唯一短码（查重循环，极低碰撞）
  let code = '';
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate = genInviteCode();
    const dup = await db.exec('SELECT id FROM users WHERE invite_code = ?', [candidate]);
    if (!dup[0] || dup[0].values.length === 0) { code = candidate; break; }
  }
  if (!code) return NextResponse.json({ error: '生成邀请码失败，请重试' }, { status: 500 });

  await db.run('UPDATE users SET invite_code = ? WHERE id = ?', [code, auth.userId]);
  return NextResponse.json({ code });
}
