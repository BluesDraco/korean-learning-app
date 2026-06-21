import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { verifyPassword, signToken } from '@/lib/server/auth';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/server/rate-limit';

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

function setTokenCookie(res: NextResponse, token: string) {
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    const ip = getClientIp(request);
    const rateCheck = await checkLoginRateLimit(ip, username);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `请求过于频繁，请${rateCheck.retryAfterSeconds}秒后重试` },
        { status: 429 }
      );
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

    await resetLoginRateLimit(ip, username);

    try { await db.run('UPDATE users SET last_login_at = ? WHERE id = ?', [Date.now(), id]); } catch { /* column may not exist */ }

    const token = await signToken({ userId: id, username: uname, role });
    const res = NextResponse.json({ success: true, user: { id, username: uname, role } });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 });
  }
}
