import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.exec('SELECT id, username, password_hash, role FROM users WHERE username = ?', [username]);

    if (result.length === 0 || result[0].values.length === 0) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    const [id, uname, passwordHash, role] = result[0].values[0] as [string, string, string, string];

    const valid = await verifyPassword(password, passwordHash);
    if (!valid) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    const token = await signToken({ userId: id, username: uname, role });
    await setAuthCookie(token);

    return NextResponse.json({ success: true, user: { id, username: uname, role } });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 });
  }
}
