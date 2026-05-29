// ─── Login brute-force rate limit (DB-backed, cross-instance safe) ───

import { getDb } from '@/lib/server/db';
import { generateId } from '@/lib/server/auth';

const MAX_ATTEMPTS = 10;
const WINDOW_MIN = 5;   // 5 minutes
const BLOCK_MIN = 15;   // 15 minutes

export async function checkRateLimit(key: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const db = await getDb();
  const ip = key.startsWith('login:') ? key.slice(6) : key;

  // Clean up attempts older than the block window
  await db.run(`DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-${BLOCK_MIN} minutes')`);

  // Count attempts in the sliding window
  const countResult = await db.exec(
    `SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at > datetime('now', '-${WINDOW_MIN} minutes')`,
    [ip],
  );
  const count = (countResult[0]?.values[0]?.[0] ?? 0) as number;

  if (count >= MAX_ATTEMPTS) {
    // Check if the 10th attempt (the one that triggered the block) is within the block period
    const blockResult = await db.exec(
      `SELECT attempted_at FROM login_attempts WHERE ip = ? ORDER BY attempted_at DESC LIMIT 1 OFFSET ?`,
      [ip, MAX_ATTEMPTS - 1],
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
    [generateId(), ip],
  );

  // Re-count after insert
  const newCount = count + 1;
  if (newCount >= MAX_ATTEMPTS) {
    const blockUntil = Date.now() + BLOCK_MIN * 60 * 1000;
    const remaining = Math.ceil((blockUntil - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds: remaining };
  }

  return { allowed: true };
}

export async function resetRateLimit(key: string): Promise<void> {
  const db = await getDb();
  const ip = key.startsWith('login:') ? key.slice(6) : key;
  await db.run(`DELETE FROM login_attempts WHERE ip = ?`, [ip]);
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
  model: string = 'deepseek-v4-flash',
): Promise<AiRateLimitResult> {
  const db = await getDb();

  const result = await db.exec(
    `SELECT COUNT(*) FROM ai_usage WHERE user_id = ? AND endpoint = ? AND date(created_at) = date('now')`,
    [userId, endpoint],
  );
  const count = (result[0]?.values[0]?.[0] ?? 0) as number;

  if (count >= AI_DAILY_LIMIT) {
    return { allowed: false, remaining: 0, limit: AI_DAILY_LIMIT };
  }

  await db.run(
    `INSERT INTO ai_usage (id, user_id, model, endpoint, prompt_tokens, completion_tokens, created_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
    [generateId(), userId, model, endpoint, 0, 0],
  );

  return { allowed: true, remaining: AI_DAILY_LIMIT - count - 1, limit: AI_DAILY_LIMIT };
}

export function aiRateLimitHeaders(result: AiRateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
  };
}
