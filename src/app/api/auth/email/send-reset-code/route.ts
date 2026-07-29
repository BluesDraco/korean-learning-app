import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { createCode } from '@/lib/server/verification';
import { sendPasswordResetEmail } from '@/lib/server/email';
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

    const ip = getClientIp(request);
    const [byEmail, byIp] = await Promise.all([
      checkRateLimit(`resetcode:${email}`),
      checkRateLimit(`resetcode-ip:${ip}`),
    ]);
    if (!byEmail.allowed || !byIp.allowed) {
      return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    // 不暴露邮箱是否存在：有注册且状态正常（非 banned/deleted）才发码
    const db = await getDb();
    const rows = await db.exec(
      'SELECT id, status FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    const user = rows[0]?.values[0];
    if (user) {
      const id = user[0] as string;
      const status = user[1] as string;
      if (status !== 'banned' && status !== 'deleted') {
        const code = await createCode(email, 'reset');
        await sendPasswordResetEmail(email, code, lang);
      }
    }

    // 无论发没发码，统一返回 success（防枚举）
    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Send reset code error:', err);
    return NextResponse.json({ error: '发送失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
