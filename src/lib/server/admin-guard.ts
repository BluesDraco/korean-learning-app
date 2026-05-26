import { NextResponse } from 'next/server';
import { getAuthFromCookie } from './auth';

export async function requireAdmin() {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return { authorized: false, response: NextResponse.json({ error: '无权限访问' }, { status: 403 }) };
  }
  return { authorized: true, userId: auth.userId, username: auth.username };
}
