import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { createCode } from '@/lib/server/verification';
import { sendVerificationCodeEmail } from '@/lib/server/email';
import { EMAIL_RE, normalizeEmail } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const lang = body.lang === 'en' ? 'en' : 'zh';

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400, headers: NO_STORE });
    }

    // 双层限流：按邮箱（防单邮箱刷）+ 按 IP（防轮换邮箱轰炸）
    const ip = getClientIp(request);
    const [byEmail, byIp] = await Promise.all([
      checkRateLimit(`emailcode:${email}`),
      checkRateLimit(`emailcode-ip:${ip}`),
    ]);
    if (!byEmail.allowed || !byIp.allowed) {
      return NextResponse.json({ error: '验证码请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    // 邮箱注册验证码：已注册直接拦（登录走密码，不发码）
    const db = await getDb();
    const existing = await db.exec('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing[0] && existing[0].values.length > 0) {
      return NextResponse.json({ error: '该邮箱已注册，请直接登录' }, { status: 409, headers: NO_STORE });
    }

    const code = await createCode(email, 'register');
    await sendVerificationCodeEmail(email, code, lang);

    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Send code error:', err);
    return NextResponse.json({ error: '验证码发送失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
