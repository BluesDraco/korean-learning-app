import { NextResponse } from 'next/server';
import { getDb, rowsToObjects } from '@/lib/server/db';
import { signToken, isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { verifyCode } from '@/lib/server/verification';
import { PHONE_RE, normalizePhone, generateId, generateUniqueUsername, randomPasswordHash, trialExpiry } from '@/lib/server/account';

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

// 验证码登录/注册二合一：未注册自动注册，已注册直接登录。
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = await checkRateLimit(`phonelogin:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    const body = await request.json();
    const phone = normalizePhone(String(body.phone || ''));
    const code = String(body.code || '');

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400, headers: NO_STORE });
    }
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: '验证码格式不正确' }, { status: 400, headers: NO_STORE });
    }

    const ok = await verifyCode(phone, code, 'login');
    if (!ok) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 400, headers: NO_STORE });
    }

    const db = await getDb();
    const now = Date.now();
    const existing = rowsToObjects(
      await db.exec('SELECT id, username, role, status FROM users WHERE phone = ? LIMIT 1', [phone])
    );

    let user: { id: string; username: string; role: string };
    const found = existing[0];
    if (found) {
      // 已注册 → 登录
      if (found.status === 'banned') {
        return NextResponse.json({ error: '账号已被封禁，如有疑问请联系客服' }, { status: 403, headers: NO_STORE });
      }
      if (found.status === 'deleted') {
        return NextResponse.json({ error: '账号已注销' }, { status: 403, headers: NO_STORE });
      }
      // 上线预告门控：国内版普通用户暂不可登录，仅管理员放行
      if (isLaunchGateBlocked((found.role as string) || 'user')) {
        return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
      }
      await db.run('UPDATE users SET last_login_at = ?, phone_verified_at = ? WHERE id = ?', [now, now, found.id]);
      user = { id: found.id as string, username: found.username as string, role: (found.role as string) || 'user' };
    } else {
      // 上线预告门控：国内版开放前不允许自动注册新号（新账号必为普通用户）
      if (isLaunchGateBlocked()) {
        return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
      }
      // 未注册 → 自动注册
      const id = generateId();
      const username = await generateUniqueUsername('u' + phone.slice(-6));
      const nickname = '用户' + phone.slice(-4);
      const passwordHash = await randomPasswordHash();
      try {
        await db.run(
          'INSERT INTO users (id, username, password_hash, nickname, phone, phone_verified_at, role, membership_type, membership_expiry, last_login_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [id, username, passwordHash, nickname, phone, now, 'user', 'monthly', trialExpiry(now), now, now, now]
        );
        user = { id, username, role: 'user' };
      } catch (e: unknown) {
        // 并发同号双注册：唯一索引冲突 → 回查已存在用户登录
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes('UNIQUE') || msg.includes('unique')) {
          const retry = rowsToObjects(
            await db.exec('SELECT id, username, role FROM users WHERE phone = ? LIMIT 1', [phone])
          );
          const u = retry[0];
          if (!u) throw e;
          user = { id: u.id as string, username: u.username as string, role: (u.role as string) || 'user' };
        } else {
          throw e;
        }
      }
    }

    const token = await signToken({ userId: user.id, username: user.username, role: user.role });
    const res = NextResponse.json({ success: true, user }, { headers: NO_STORE });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Phone login error:', err);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
