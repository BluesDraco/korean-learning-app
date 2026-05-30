import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { hashPassword, signToken, setAuthCookie, generateId } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = await checkRateLimit(`register:${ip}`);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: '注册请求过于频繁，请稍后再试' },
        { status: 429 },
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    const USERNAME_RE = /^[a-zA-Z0-9一-龥_-]{2,20}$/;
    if (!USERNAME_RE.test(username)) {
      return NextResponse.json({ error: '用户名只能包含字母、数字、中文、下划线和横线' }, { status: 400 });
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
