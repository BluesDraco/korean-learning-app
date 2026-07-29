import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie } from '@/lib/server/auth';
import { verifyCode } from '@/lib/server/verification';
import { EMAIL_RE, normalizeEmail } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) {
      return NextResponse.json({ error: '请先登录' }, { status: 401, headers: NO_STORE });
    }

    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const code = String(body.code || '');

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400, headers: NO_STORE });
    }
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: '验证码格式不正确' }, { status: 400, headers: NO_STORE });
    }

    const ok = await verifyCode(email, code, 'bind');
    if (!ok) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 400, headers: NO_STORE });
    }

    // 验码成功后再次检查邮箱未被占用
    const db = await getDb();
    const existing = await db.exec('SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1', [email, auth.userId]);
    if (existing[0] && existing[0].values.length > 0) {
      return NextResponse.json({ error: '该邮箱已被其他账号绑定' }, { status: 409, headers: NO_STORE });
    }

    const now = Date.now();
    await db.run('UPDATE users SET email = ?, email_verified_at = ?, updated_at = ? WHERE id = ?', [
      email,
      now,
      now,
      auth.userId,
    ]);

    return NextResponse.json({ success: true, email }, { headers: NO_STORE });
  } catch (err) {
    console.error('Bind email error:', err);
    return NextResponse.json({ error: '绑定失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
