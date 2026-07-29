import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

// DELETE — admin soft-deletes (withdraw) an announcement
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const db = await getDb();
  await db.run('UPDATE announcements SET is_active = 0 WHERE id = ?', [id]);
  return NextResponse.json({ ok: true });
}
