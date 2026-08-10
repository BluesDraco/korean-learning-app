import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { hashPassword, signToken, isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { verifyCode } from '@/lib/server/verification';
import { EMAIL_RE, normalizeEmail, generateId, generateUniqueUsername, trialExpiry } from '@/lib/server/account';

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
    const rate = await checkRateLimit(`register:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json({ error: '注册请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const password = String(body.password || '');
    const code = String(body.code || '');

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400, headers: NO_STORE });
    }
    if (password.length < 6 || password.length > 200) {
      return NextResponse.json({ error: '密码长度必须在 6-200 之间' }, { status: 400, headers: NO_STORE });
    }
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: '验证码格式不正确' }, { status: 400, headers: NO_STORE });
    }

    // 先查邮箱占用，再校验码：避免邮箱已注册时白白消费掉用户的验证码
    const db = await getDb();
    const existing = await db.exec('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing[0] && existing[0].values.length > 0) {
      return NextResponse.json({ error: '该邮箱已注册，请直接登录' }, { status: 409, headers: NO_STORE });
    }

    const ok = await verifyCode(email, code, 'register');
    if (!ok) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 400, headers: NO_STORE });
    }

    const id = generateId();
    const username = await generateUniqueUsername(email.split('@')[0]);
    const nickname = email.split('@')[0].slice(0, 20) || username;
    const passwordHash = await hashPassword(password);
    const now = Date.now();

    await db.run(
      'INSERT INTO users (id, username, password_hash, nickname, email, role, membership_type, membership_expiry, email_verified_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, username, passwordHash, nickname, email, 'user', 'monthly', trialExpiry(now), now, now, now]
    );

    const token = await signToken({ userId: id, username, role: 'user' });
    const res = NextResponse.json({ success: true, token, user: { id, username, role: 'user' } }, { headers: NO_STORE });
    setTokenCookie(res, token);
    return res;
  } catch (err: unknown) {
    console.error('Email register error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return NextResponse.json({ error: '该邮箱已注册，请直接登录' }, { status: 409, headers: NO_STORE });
    }
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
