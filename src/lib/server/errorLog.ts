import { getDb } from '@/lib/server/db';
import { generateId } from '@/lib/server/auth';

export type ErrorLevel = 'error' | 'warn' | 'critical';

// 运营告警落库：支付回调失败、关键 DB 写失败等。绝不抛错（记录失败不能影响主流程）。
// 同时保留 console.error 便于 pm2 日志排查。
export async function logError(
  source: string,
  message: string,
  opts?: { level?: ErrorLevel; detail?: unknown; userId?: string },
): Promise<void> {
  const level = opts?.level ?? 'error';
  console.error(`[${level}][${source}] ${message}`, opts?.detail ?? '');
  try {
    const db = await getDb();
    let detail = '';
    if (opts?.detail !== undefined) {
      detail = typeof opts.detail === 'string' ? opts.detail : JSON.stringify(opts.detail);
      if (detail.length > 4000) detail = detail.slice(0, 4000);
    }
    await db.run(
      `INSERT INTO error_logs (id, level, source, message, detail, user_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [generateId(), level, source.slice(0, 100), message.slice(0, 500), detail, opts?.userId ?? '', Date.now()],
    );
  } catch {
    // 记录失败静默——已有 console.error 兜底
  }
}
