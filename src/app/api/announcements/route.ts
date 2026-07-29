import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

// GET — list announcements for current user (broadcast + targeted to them)
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const result = await db.exec(
    `SELECT a.id, a.title, a.content, a.type, a.target_user_id, a.created_at, a.is_active
     FROM announcements a
     WHERE (a.target_user_id IS NULL OR a.target_user_id = ?)
       AND (a.is_active IS NULL OR a.is_active = 1)
     ORDER BY a.created_at DESC`,
    [auth.userId]
  );

  const rows = result[0]?.values.map((r: unknown[]) => ({
    id: r[0] as string,
    title: r[1] as string,
    content: r[2] as string,
    type: r[3] as string,
    targetUserId: (r[4] as string) ?? null,
    createdAt: r[5] as number,
    isActive: (r[6] as number ?? 1) === 1,
  })) ?? [];

  // Get read status
  if (rows.length > 0) {
    // 插值仅生成 ?,?,? 占位符，实际值走 params，无注入风险
    // eslint-disable-next-line no-restricted-syntax
    const readResult = await db.exec(
      `SELECT announcement_id FROM announcement_reads WHERE user_id = ? AND announcement_id IN (${rows.map(() => '?').join(',')})`,
      [auth.userId, ...rows.map((r) => r.id)]
    );
    const readIds = new Set(readResult[0]?.values.map((r: unknown[]) => r[0] as string) ?? []);
    for (const row of rows) {
      (row as any).read = readIds.has(row.id);
    }
  } else {
    for (const row of rows) {
      (row as any).read = false;
    }
  }

  return NextResponse.json(rows);
}

// POST — admin sends a new announcement
export async function POST(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const db = await getDb();

  const { title, content, type, targetUserId } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }

  const VALID_TYPES = ['announcement', 'update_log', 'private_message', 'popup'];
  const finalType = VALID_TYPES.includes(type) ? type : 'announcement';

  // 新的全站 popup 上线时，自动撤回所有旧的全站 popup —— 用户只应看到最新一条
  if (finalType === 'popup' && !targetUserId) {
    await db.run(
      `UPDATE announcements SET is_active = 0 WHERE type = 'popup' AND target_user_id IS NULL AND is_active = 1`
    );
  }

  const id = crypto.randomUUID();
  await db.run(
    `INSERT INTO announcements (id, title, content, type, target_user_id, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)`,
    [id, title, content, finalType, targetUserId || null, Date.now()]
  );

  return NextResponse.json({ ok: true, id });
}
