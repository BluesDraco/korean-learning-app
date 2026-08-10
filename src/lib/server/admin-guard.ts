import { NextResponse } from 'next/server';
import { getAuthFromCookie } from './auth';
import { getDb } from './db';

export async function requireAdmin() {
  const auth = await getAuthFromCookie();
  const forbidden = { authorized: false as const, response: NextResponse.json({ error: '无权限访问', errorEn: 'No Access Permission' }, { status: 403 }) };
  if (!auth) return forbidden;

  // 实时查库校验 role，不信任 JWT 里的 role 声明：
  // token 有效期 365 天，管理员被降权后旧 token 仍会带 role:'admin'，只查 JWT 会放行越权。
  const db = await getDb();
  const result = await db.exec('SELECT role FROM users WHERE id = ?', [auth.userId]);
  const role = result[0]?.values[0]?.[0] as string | undefined;
  if (role !== 'admin') return forbidden;

  return { authorized: true as const, userId: auth.userId, username: auth.username };
}
