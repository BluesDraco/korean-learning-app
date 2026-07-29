import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { settleInviter } from '@/lib/server/invite';

export const dynamic = 'force-dynamic';

export async function POST() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();

  // 服务端自证：被邀请者必须真的完成 beginner Day1，不信前端
  const done = await db.exec(
    `SELECT id FROM user_tori_progress WHERE user_id = ? AND level = 'beginner' AND day = 1 AND completed_at IS NOT NULL`,
    [auth.userId],
  );
  if (!done[0] || done[0].values.length === 0) return NextResponse.json({ ok: false });

  // 查 pending 邀请关系
  const rows = await db.exec(
    `SELECT inviter_id, status FROM invitations WHERE invitee_id = ?`,
    [auth.userId],
  );
  const row = rows[0]?.values[0];
  if (!row) return NextResponse.json({ ok: true }); // 非被邀请者，正常
  const inviterId = row[0] as string;
  const status = row[1] as string;
  if (status === 'qualified') return NextResponse.json({ ok: true }); // 幂等

  const upd = await db.run(
    `UPDATE invitations SET status = 'qualified', qualified_at = ? WHERE invitee_id = ? AND status = 'pending'`,
    [Date.now(), auth.userId],
  );
  // rowsAffected===1 保证只在 pending→qualified 那一次执行（防并发/重复）
  // 被邀请者不再单独发 3 天：注册时已送 3 天 monthly，避免叠加成 6 天
  if (upd.rowsAffected === 1) {
    await settleInviter(inviterId);
  }
  return NextResponse.json({ ok: true });
}
