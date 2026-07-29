import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { createCode } from '@/lib/server/verification';
import { sendBindEmailCode } from '@/lib/server/email';
import { EMAIL_RE, normalizeEmail } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) {
      return NextResponse.json({ error: '请先登录' }, { status: 401, headers: NO_STORE });
    }

    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const lang = body.lang === 'en' ? 'en' : 'zh';

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400, headers: NO_STORE });
    }

    const ip = getClientIp(request);
    const [byEmail, byIp] = await Promise.all([
      checkRateLimit(`bindcode:${email}`),
      checkRateLimit(`bindcode-ip:${ip}`),
    ]);
    if (!byEmail.allowed || !byIp.allowed) {
      return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    // 检查邮箱是否已被其他人占用
    const db = await getDb();
    const existing = await db.exec('SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1', [email, auth.userId]);
    if (existing[0] && existing[0].values.length > 0) {
      return NextResponse.json({ error: '该邮箱已被其他账号绑定' }, { status: 409, headers: NO_STORE });
    }

    const code = await createCode(email, 'bind');
    await sendBindEmailCode(email, code, lang);

    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Send bind code error:', err);
    return NextResponse.json({ error: '发送失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
