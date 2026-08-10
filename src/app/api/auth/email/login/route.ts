import { NextResponse } from 'next/server';
import { getDb, rowsToObjects } from '@/lib/server/db';
import { verifyPassword, signToken, isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/server/rate-limit';
import { EMAIL_RE, normalizeEmail } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

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
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const password = String(body.password || '');

    if (!EMAIL_RE.test(email) || !password) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401, headers: NO_STORE });
    }
    if (email.length > 254 || password.length > 200) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401, headers: NO_STORE });
    }

    const ip = getClientIp(request);
    const rate = await checkLoginRateLimit(ip, email);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `请求过于频繁，请${rate.retryAfterSeconds}秒后重试` },
        { status: 429, headers: NO_STORE }
      );
    }

    const db = await getDb();
    const rows = rowsToObjects(
      await db.exec('SELECT id, username, password_hash, role, status FROM users WHERE email = ?', [email])
    );
    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401, headers: NO_STORE });
    }

    if (user.status === 'banned') {
      return NextResponse.json({ error: '账号已被封禁，如有疑问请联系客服' }, { status: 403, headers: NO_STORE });
    }
    if (user.status === 'deleted') {
      return NextResponse.json({ error: '账号已注销' }, { status: 403, headers: NO_STORE });
    }

    const passwordHash = String(user.password_hash || '');
    const valid = passwordHash ? await verifyPassword(password, passwordHash) : false;
    if (!valid) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401, headers: NO_STORE });
    }

    // 上线预告门控：国内版普通用户暂不可登录，仅管理员放行
    if (isLaunchGateBlocked((user.role as string) || 'user')) {
      return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
    }

    resetLoginRateLimit(ip, email).catch(() => { /* 清空失败不影响登录 */ });
    db.run('UPDATE users SET last_login_at = ? WHERE id = ?', [Date.now(), user.id]).catch(() => { /* 不影响登录 */ });

    const token = await signToken({ userId: user.id as string, username: user.username as string, role: (user.role as string) || 'user' });
    const res = NextResponse.json({ success: true, user: { id: user.id, username: user.username, role: user.role } }, { headers: NO_STORE });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Email login error:', err);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
