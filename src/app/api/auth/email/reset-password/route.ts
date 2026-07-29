import { NextResponse } from 'next/server';
import { getDb, rowsToObjects } from '@/lib/server/db';
import { hashPassword } from '@/lib/server/auth';
import { verifyCode } from '@/lib/server/verification';
import { EMAIL_RE, normalizeEmail } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const code = String(body.code || '');
    const newPassword = String(body.password || '');

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400, headers: NO_STORE });
    }
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: '验证码格式不正确' }, { status: 400, headers: NO_STORE });
    }
    if (newPassword.length < 6 || newPassword.length > 200) {
      return NextResponse.json({ error: '密码长度必须在 6-200 之间' }, { status: 400, headers: NO_STORE });
    }

    // 先验码（不泄露邮箱是否存在）
    const ok = await verifyCode(email, code, 'reset');
    if (!ok) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 400, headers: NO_STORE });
    }

    // 码对但邮箱不存在/已封禁 → 不透露，统一报错
    const db = await getDb();
    const rows = rowsToObjects(
      await db.exec('SELECT id, status FROM users WHERE email = ? LIMIT 1', [email])
    );
    const user = rows[0];
    if (!user || user.status === 'banned' || user.status === 'deleted') {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 400, headers: NO_STORE });
    }

    const passwordHash = await hashPassword(newPassword);
    await db.run('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?', [
      passwordHash,
      Date.now(),
      user.id,
    ]);

    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Reset password error:', err);
    return NextResponse.json({ error: '重置失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
