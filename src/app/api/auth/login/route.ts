import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { verifyPassword, signToken, isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/server/rate-limit';

// 6-26 事故兜底：鉴权路由必须 force-dynamic，禁止 CDN/Next 缓存
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
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400, headers: NO_STORE });
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400, headers: NO_STORE });
    }
    if (username.length > 100 || password.length > 200) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401, headers: NO_STORE });
    }

    const ip = getClientIp(request);
    const rateCheck = await checkLoginRateLimit(ip, username);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `请求过于频繁，请${rateCheck.retryAfterSeconds}秒后重试` },
        { status: 429, headers: NO_STORE }
      );
    }

    const db = await getDb();
    const result = await db.exec('SELECT id, username, password_hash, role, status FROM users WHERE username = ?', [username]);

    if (result.length === 0 || result[0].values.length === 0) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401, headers: NO_STORE });
    }

    const [id, uname, passwordHash, role, status] = result[0].values[0] as [string, string, string, string, string | null];

    // 封禁 / 已注销账号拒绝登录（放在密码校验前：注销账号 password_hash 已清空，
    // 否则会先在「密码错误」拦下，命中不到 deleted 分支，提示也不准；banned 也省一次 bcrypt）
    if (status === 'banned') {
      return NextResponse.json({ error: '账号已被封禁，如有疑问请联系客服' }, { status: 403, headers: NO_STORE });
    }
    if (status === 'deleted') {
      return NextResponse.json({ error: '账号已注销' }, { status: 403, headers: NO_STORE });
    }

    const valid = await verifyPassword(password, passwordHash);
    if (!valid) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401, headers: NO_STORE });
    }

    // 上线预告门控：国内版普通用户暂不可登录，仅管理员放行
    if (isLaunchGateBlocked(role)) {
      return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
    }

    // 异步清空 rate-limit 计数器——不阻塞响应
    resetLoginRateLimit(ip, username).catch(() => { /* 清空失败不影响登录 */ });

    // 异步更新最后登录时间——不阻塞响应
    db.run('UPDATE users SET last_login_at = ? WHERE id = ?', [Date.now(), id]).catch(() => { /* 列可能不存在或写失败，不影响登录 */ });

    const token = await signToken({ userId: id, username: uname, role });
    const res = NextResponse.json({ success: true, user: { id, username: uname, role } }, { headers: NO_STORE });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
