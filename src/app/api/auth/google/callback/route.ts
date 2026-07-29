import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { getDb, rowsToObjects } from '@/lib/server/db';
import { signToken, isLaunchGateBlocked } from '@/lib/server/auth';
import { normalizeEmail, generateId, generateUniqueUsername, randomPasswordHash, trialExpiry } from '@/lib/server/account';

export const dynamic = 'force-dynamic';

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

const GOOGLE_JWKS = jose.createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

function fail(): NextResponse {
  const res = NextResponse.redirect(`${siteUrl()}/auth/login?error=google`);
  res.cookies.delete('g_state');
  return res;
}

// 上线预告门控命中：跳回登录页并提示（前端识别 error=gate）
function gated(): NextResponse {
  const res = NextResponse.redirect(`${siteUrl()}/auth/login?error=gate`);
  res.cookies.delete('g_state');
  return res;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const cookieState = request.headers.get('cookie')?.match(/(?:^|;\s*)g_state=([^;]+)/)?.[1];

    if (!code || !state || !cookieState || state !== cookieState) {
      return fail();
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return fail();

    // 用 code 换 token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${siteUrl()}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) return fail();
    const tokenData = await tokenRes.json();
    const idToken = tokenData.id_token as string | undefined;
    if (!idToken) return fail();

    // 验 id_token（签名 + issuer + audience）
    const { payload } = await jose.jwtVerify(idToken, GOOGLE_JWKS, {
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
      audience: clientId,
    });

    const email = normalizeEmail(String(payload.email || ''));
    const emailVerified = payload.email_verified === true || payload.email_verified === 'true';
    if (!email || !emailVerified) return fail();

    const name = String(payload.name || '').slice(0, 40);
    const picture = String(payload.picture || '');

    const db = await getDb();
    const now = Date.now();

    // 按 email 找账号：存在→登录，不存在→建号
    const rows = rowsToObjects(
      await db.exec('SELECT id, username, role, status FROM users WHERE email = ?', [email])
    );
    let user = rows[0];

    if (user) {
      if (user.status === 'banned' || user.status === 'deleted') {
        return fail();
      }
      // 上线预告门控：国内版普通用户暂不可登录，仅管理员放行
      if (isLaunchGateBlocked((user.role as string) || 'user')) {
        return gated();
      }
      db.run('UPDATE users SET last_login_at = ? WHERE id = ?', [now, user.id]).catch(() => {});
    } else {
      // 国内版开放前不允许 Google 新建号（新账号必为普通用户）
      if (isLaunchGateBlocked()) {
        return gated();
      }
      const id = generateId();
      const username = await generateUniqueUsername(email.split('@')[0]);
      const nickname = name || email.split('@')[0].slice(0, 20) || username;
      const passwordHash = await randomPasswordHash();
      await db.run(
        'INSERT INTO users (id, username, password_hash, nickname, email, avatar_url, role, membership_type, membership_expiry, email_verified_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, username, passwordHash, nickname, email, picture, 'user', 'monthly', trialExpiry(now), now, now, now]
      );
      user = { id, username, role: 'user' };
    }

    const token = await signToken({ userId: user.id as string, username: user.username as string, role: (user.role as string) || 'user' });
    const res = NextResponse.redirect(`${siteUrl()}/daily`);
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.delete('g_state');
    return res;
  } catch (err) {
    console.error('Google callback error:', err);
    return fail();
  }
}
