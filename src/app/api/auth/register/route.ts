import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { hashPassword, signToken, generateId, isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { filterContent } from '@/lib/contentFilter';

// 6-26 事故兜底：鉴权路由必须 force-dynamic
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
    // 上线预告门控：国内版开放前禁止注册（新账号必为普通用户），海外版不受影响
    if (isLaunchGateBlocked()) {
      return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
    }

    const ip = getClientIp(request);
    const rateCheck = await checkRateLimit(`register:${ip}`);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: '注册请求过于频繁，请稍后再试' },
        { status: 429, headers: NO_STORE },
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400, headers: NO_STORE });
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400, headers: NO_STORE });
    }

    const USERNAME_RE = /^[a-zA-Z0-9一-龥_-]{2,20}$/;
    if (!USERNAME_RE.test(username)) {
      return NextResponse.json({ error: '用户名只能包含字母、数字、中文、下划线和横线' }, { status: 400, headers: NO_STORE });
    }

    const usernameCheck = filterContent(username, 'username');
    if (!usernameCheck.ok) {
      return NextResponse.json({ error: usernameCheck.reason }, { status: 400, headers: NO_STORE });
    }

    if (password.length < 6 || password.length > 200) {
      return NextResponse.json({ error: '密码长度必须在 6-200 之间' }, { status: 400, headers: NO_STORE });
    }

    const db = await getDb();

    const existing = await db.exec('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return NextResponse.json({ error: '用户名已被注册' }, { status: 409, headers: NO_STORE });
    }

    const id = generateId();
    const passwordHash = await hashPassword(password);
    const now = Date.now();

    // 内测期：新注册用户自动获得 3 天免费月度会员
    const trialExpiry = now + 3 * 24 * 60 * 60 * 1000;

    await db.run(
      'INSERT INTO users (id, username, password_hash, nickname, email, role, membership_type, membership_expiry, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, username, passwordHash, username, '', 'user', 'monthly', trialExpiry, now, now]
    );

    const token = await signToken({ userId: id, username, role: 'user' });
    const res = NextResponse.json({ success: true, token, user: { id, username, role: 'user' } }, { headers: NO_STORE });
    setTokenCookie(res, token);
    return res;
  } catch (err: unknown) {
    console.error('Register error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return NextResponse.json({ error: '用户名已被注册' }, { status: 409, headers: NO_STORE });
    }
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
