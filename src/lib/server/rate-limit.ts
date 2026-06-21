// ─── Login brute-force rate limit (DB-backed, cross-instance safe) ───

import { getDb } from '@/lib/server/db';
import { generateId } from '@/lib/server/auth';

const MAX_ATTEMPTS = 10;
const WINDOW_MIN = 5;   // 5 minutes
const BLOCK_MIN = 15;   // 15 minutes

async function checkRateLimitByKey(key: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const db = await getDb();

  // Clean up attempts older than the block window
  await db.run(`DELETE FROM login_attempts WHERE ip = ? AND attempted_at < datetime('now', '-${BLOCK_MIN} minutes')`, [key]);

  // Count attempts in the sliding window
  const countResult = await db.exec(
    `SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at > datetime('now', '-${WINDOW_MIN} minutes')`,
    [key],
  );
  const count = (countResult[0]?.values[0]?.[0] ?? 0) as number;

  if (count >= MAX_ATTEMPTS) {
    const blockResult = await db.exec(
      `SELECT attempted_at FROM login_attempts WHERE ip = ? ORDER BY attempted_at DESC LIMIT 1 OFFSET ?`,
      [key, MAX_ATTEMPTS - 1],
    );
    const triggerAt = blockResult[0]?.values[0]?.[0] as string | undefined;
    if (triggerAt) {
      const blockUntil = new Date(triggerAt + 'Z').getTime() + BLOCK_MIN * 60 * 1000;
      const remaining = Math.ceil((blockUntil - Date.now()) / 1000);
      if (remaining > 0) {
        return { allowed: false, retryAfterSeconds: remaining };
      }
    }
  }

  // Record this attempt
  await db.run(
    `INSERT INTO login_attempts (id, ip, attempted_at) VALUES (?, ?, datetime('now'))`,
    [generateId(), key],
  );

  const newCount = count + 1;
  if (newCount >= MAX_ATTEMPTS) {
    const blockUntil = Date.now() + BLOCK_MIN * 60 * 1000;
    const remaining = Math.ceil((blockUntil - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds: remaining };
  }

  return { allowed: true };
}

// Check both IP and username dimensions; record attempt only if not already blocked
export async function checkRateLimit(key: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  // key format: "login:{ip}" (legacy) or checked directly
  const normalized = key.startsWith('login:') ? key.slice(6) : key;
  return checkRateLimitByKey(normalized);
}

// Check login by both IP and username — serial to avoid double-recording on blocked requests
export async function checkLoginRateLimit(
  ip: string,
  username: string,
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const ipResult = await checkRateLimitByKey(`ip:${ip}`);
  if (!ipResult.allowed) return ipResult;
  const userResult = await checkRateLimitByKey(`user:${username.toLowerCase()}`);
  if (!userResult.allowed) return userResult;
  return { allowed: true };
}

export async function resetRateLimit(key: string): Promise<void> {
  const db = await getDb();
  const normalized = key.startsWith('login:') ? key.slice(6) : key;
  await db.run(`DELETE FROM login_attempts WHERE ip = ?`, [normalized]);
}

export async function resetLoginRateLimit(ip: string, username: string): Promise<void> {
  const db = await getDb();
  await Promise.all([
    db.run(`DELETE FROM login_attempts WHERE ip = ?`, [`ip:${ip}`]),
    db.run(`DELETE FROM login_attempts WHERE ip = ?`, [`user:${username.toLowerCase()}`]),
  ]);
}

// ─── AI daily rate limit (per-user, per-endpoint, 30/day) ───

const AI_DAILY_LIMIT = 30;

export interface AiRateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
}

export async function checkAiRateLimit(
  userId: string,
  endpoint: string,
  customLimit?: number,
): Promise<AiRateLimitResult> {
  const db = await getDb();
  const effectiveLimit = customLimit ?? AI_DAILY_LIMIT;

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const dayStartTs = dayStart.getTime();

  const result = await db.exec(
    `SELECT COUNT(*) FROM ai_usage WHERE user_id = ? AND endpoint = ? AND created_at >= ?`,
    [userId, endpoint, dayStartTs],
  );
  const count = (result[0]?.values[0]?.[0] ?? 0) as number;

  if (count >= effectiveLimit) {
    return { allowed: false, remaining: 0, limit: effectiveLimit };
  }

  return { allowed: true, remaining: effectiveLimit - count, limit: effectiveLimit };
}

export async function recordAiUsage(
  userId: string,
  endpoint: string,
  model: string = 'deepseek-chat',
): Promise<void> {
  const db = await getDb();
  await db.run(
    `INSERT INTO ai_usage (id, user_id, model, endpoint, prompt_tokens, completion_tokens, created_at) VALUES (?, ?, ?, ?, 0, 0, ?)`,
    [generateId(), userId, model, endpoint, Date.now()],
  );
}

export function aiRateLimitHeaders(result: AiRateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
  };
}

const GUEST_AI_DAILY_LIMIT = 10;

// DB-backed guest rate limit — survives pm2 restarts unlike in-memory maps
export async function checkGuestAiRateLimit(
  ip: string,
  endpoint: string,
): Promise<{ allowed: boolean; remaining: number }> {
  const db = await getDb();
  const today = new Date().toISOString().slice(0, 10);
  const key = `guest-ai:${endpoint}:${ip}:${today}`;

  // Clean up old entries (older than 2 days)
  await db.run(
    `DELETE FROM login_attempts WHERE ip LIKE 'guest-ai:%' AND attempted_at < datetime('now', '-2 days')`,
  );

  const result = await db.exec(
    `SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at >= datetime('now', 'start of day')`,
    [key],
  );
  const count = (result[0]?.values[0]?.[0] ?? 0) as number;

  if (count >= GUEST_AI_DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  await db.run(
    `INSERT INTO login_attempts (id, ip, attempted_at) VALUES (?, ?, datetime('now'))`,
    [generateId(), key],
  );

  return { allowed: true, remaining: GUEST_AI_DAILY_LIMIT - count - 1 };
}
