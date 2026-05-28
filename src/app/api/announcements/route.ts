import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// GET — list announcements for current user (broadcast + targeted to them)
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const result = await db.exec(
    `SELECT a.id, a.title, a.content, a.type, a.target_user_id, a.created_at
     FROM announcements a
     WHERE a.target_user_id IS NULL OR a.target_user_id = ?
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
  })) ?? [];

  // Get read status
  if (rows.length > 0) {
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
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();

  // Check admin role
  const userResult = await db.exec('SELECT role FROM users WHERE id = ?', [auth.userId]);
  const role = userResult[0]?.values[0]?.[0] as string;
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { title, content, type, targetUserId } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await db.run(
    `INSERT INTO announcements (id, title, content, type, target_user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, title, content, type || 'announcement', targetUserId || null, Date.now()]
  );

  return NextResponse.json({ ok: true, id });
}
