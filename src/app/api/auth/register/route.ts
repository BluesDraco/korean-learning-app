import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { hashPassword, signToken, setAuthCookie, generateId } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    if (username.length < 2 || username.length > 20) {
      return NextResponse.json({ error: '用户名长度需在2-20个字符之间' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码长度不能少于6位' }, { status: 400 });
    }

    const db = await getDb();

    const existing = await db.exec('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return NextResponse.json({ error: '用户名已被注册' }, { status: 409 });
    }

    const id = generateId();
    const passwordHash = await hashPassword(password);
    const now = Date.now();

    await db.run(
      'INSERT INTO users (id, username, password_hash, nickname, email, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, username, passwordHash, username, '', 'user', now, now]
    );

    const token = await signToken({ userId: id, username, role: 'user' });
    await setAuthCookie(token);

    return NextResponse.json({ success: true, user: { id, username, role: 'user' } });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500 });
  }
}
