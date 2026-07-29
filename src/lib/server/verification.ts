import crypto from 'crypto';
import { getDb } from './db';
import { generateId } from './auth';

const CODE_TTL_MS = 10 * 60 * 1000; // 10 分钟
const MAX_ATTEMPTS = 5; // 单个码最多试错 5 次，超过即失效（防 6 位码暴力破解）

export type CodePurpose = 'register' | 'reset' | 'bind' | 'login';

// 生成 6 位数字验证码，删掉该 email+purpose 的旧码，写入新码，返回明文码（供发信）。
export async function createCode(email: string, purpose: CodePurpose): Promise<string> {
  const db = await getDb();
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  const now = Date.now();
  await db.batch([
    { sql: 'DELETE FROM verification_codes WHERE email = ? AND purpose = ?', args: [email, purpose] },
    {
      sql: 'INSERT INTO verification_codes (id, email, code, purpose, expires_at, consumed, attempts, created_at) VALUES (?, ?, ?, ?, ?, 0, 0, ?)',
      args: [generateId(), email, code, purpose, now + CODE_TTL_MS, now],
    },
  ]);
  return code;
}

// 校验验证码。命中未过期未消费的码：标记 consumed（原子更新）返回 true。
// 未命中：对该 email+purpose 的当前有效码 attempts+1，超过上限即删除该码（防暴力破解）。
export async function verifyCode(email: string, code: string, purpose: CodePurpose): Promise<boolean> {
  const db = await getDb();
  const now = Date.now();

  // 原子消费：WHERE 带全部条件，靠 rowsAffected 判定命中，避免并发重放
  const consumed = await db.run(
    'UPDATE verification_codes SET consumed = 1 WHERE email = ? AND purpose = ? AND code = ? AND consumed = 0 AND expires_at > ?',
    [email, purpose, code, now]
  );
  if (consumed.rowsAffected === 1) return true;

  // 未命中：累加当前有效码的试错次数，超限即销毁（让攻击者必须重新触发发码）
  await db.run(
    'UPDATE verification_codes SET attempts = attempts + 1 WHERE email = ? AND purpose = ? AND consumed = 0 AND expires_at > ?',
    [email, purpose, now]
  );
  await db.run(
    'DELETE FROM verification_codes WHERE email = ? AND purpose = ? AND attempts >= ?',
    [email, purpose, MAX_ATTEMPTS]
  );
  return false;
}
