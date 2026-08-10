import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { cookies, headers } from 'next/headers';

const COOKIE_NAME = 'token';
const DEV_JWT_SECRET = 'dev-only-korean-learning-app-secret-change-me';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (secret) return new TextEncoder().encode(secret);

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
  }

  return new TextEncoder().encode(DEV_JWT_SECRET);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { userId: string; username: string; role: string }): Promise<string> {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<{ userId: string; username: string; role: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());
    return payload as { userId: string; username: string; role: string };
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ⚠️ 上线预告门控：国内版(domestic)备案后开放前，普通用户不可登录/注册，仅管理员可登录测试。
// 海外版(overseas)不受影响，正常登录。上线时把 LAUNCH_GATE 改为 false 即可全量放开。
// 单点控制：所有签发 token 的登录/注册接口都调用 isLaunchGateBlocked(role)。
export const LAUNCH_GATE = false;
export const LAUNCH_GATE_MESSAGE = '网站即将开放，具体开放时间请见群聊。如需咨询请加微信 13817498530';

// 国内版且非管理员 → 拦截。注册接口传 undefined（新账号必为普通用户）即视为拦截。
export function isLaunchGateBlocked(role?: string | null): boolean {
  if (!LAUNCH_GATE) return false;
  if (process.env.NEXT_PUBLIC_EDITION === 'overseas') return false;
  return role !== 'admin';
}

// ⚠️⚠️⚠️ 测试用开关：ICP 备案审核期间无法注册/登录，临时放开全站登录门控。
// 开启后，未登录访问一律视为库里第一个真实账号（testBetaUser），前端不跳登录、所有 API 放行。
// 【上线前必须改回 false】否则任何访客都会以该账号身份操作，严重安全问题。
const BETA_NO_LOGIN = false;

// 缓存 BETA_NO_LOGIN 兜底用的真实账号，避免每次调用都查库
let betaUserCache: { userId: string; username: string; role: string } | null | undefined;

async function getBetaFallbackUser(): Promise<{ userId: string; username: string; role: string } | null> {
  if (betaUserCache !== undefined) return betaUserCache;
  try {
    const { getDb, rowsToObjects } = await import('./db');
    const db = await getDb();
    const rows = rowsToObjects(
      await db.exec('SELECT id, username, role FROM users ORDER BY created_at ASC LIMIT 1')
    );
    const row = rows[0];
    betaUserCache = row
      ? { userId: row.id as string, username: row.username as string, role: (row.role as string) || 'user' }
      : null;
  } catch {
    betaUserCache = null;
  }
  return betaUserCache;
}

export async function getAuthFromCookie(): Promise<{ userId: string; username: string; role: string } | null> {
  if (BETA_NO_LOGIN && process.env.NODE_ENV === 'production') {
    throw new Error('BETA_NO_LOGIN 禁止在生产环境开启（会导致全站访客串号）');
  }
  // 移动端 App 走 Authorization: Bearer；网页版走 httpOnly Cookie。先认 Bearer 再回落 Cookie。
  const authHeader = (await headers()).get('authorization');
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (bearer) return verifyToken(bearer);

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    if (BETA_NO_LOGIN) return getBetaFallbackUser();
    return null;
  }
  return verifyToken(token);
}

export function generateId(): string {
  return crypto.randomUUID();
}

// 关键写接口用：校验用户账号仍处于 active（未被封禁/注销）。
// 不放进 getAuthFromCookie 以避免给每个鉴权请求加查库开销；
// 只在 UGC 发帖/评论、AI 对话、支付等写操作入口显式调用（封禁后下次写操作即失效）。
export async function assertActiveUser(userId: string): Promise<boolean> {
  try {
    const { getDb } = await import('./db');
    const db = await getDb();
    const rows = await db.exec('SELECT status FROM users WHERE id = ?', [userId]);
    const status = rows[0]?.values[0]?.[0];
    // status 为空/active 均放行；仅 banned/deleted 拦截（兼容老库无 status 列时返回空）
    return status !== 'banned' && status !== 'deleted';
  } catch {
    return true; // 查库异常不误伤正常用户
  }
}
