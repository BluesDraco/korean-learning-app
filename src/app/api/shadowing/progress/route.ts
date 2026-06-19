import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const clipId = searchParams.get('clip_id');

    const db = await getDb();
    let sql = `SELECT * FROM shadowing_progress WHERE user_id = ?`;
    const params: unknown[] = [auth.userId];
    if (clipId) { sql += ` AND clip_id = ?`; params.push(clipId); }

    const result = await db.exec(sql, params);
    const rows = result[0]?.values ?? [];
    const columns = result[0]?.columns ?? [];
    const col = (name: string) => columns.indexOf(name);

    const progress = rows.map(row => ({
      clipId: row[col('clip_id')],
      completedSegs: JSON.parse((row[col('completed_segs')] as string) || '[]'),
      lastSegIndex: row[col('last_seg_index')],
      status: row[col('status')],
      recordedCount: row[col('recorded_count')],
      savedWordCount: row[col('saved_word_count')],
      completedAt: row[col('completed_at')],
      lastStudiedAt: row[col('last_studied_at')],
    }));

    return NextResponse.json({ progress: clipId ? (progress[0] ?? null) : progress });
  } catch (e) {
    console.error('[shadowing/progress GET]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { clipId, completedSegs, lastSegIndex, status, recordedCount, savedWordCount, completedAt } = body;
    if (!clipId) return NextResponse.json({ error: 'clipId required' }, { status: 400 });

    const db = await getDb();
    const now = Date.now();

    const existing = await db.exec(
      `SELECT id FROM shadowing_progress WHERE user_id = ? AND clip_id = ?`,
      [auth.userId, clipId]
    );
    const exists = (existing[0]?.values ?? []).length > 0;

    if (exists) {
      await db.run(
        `UPDATE shadowing_progress SET completed_segs=?, last_seg_index=?, status=?, recorded_count=?, saved_word_count=?, completed_at=?, last_studied_at=?, updated_at=? WHERE user_id=? AND clip_id=?`,
        [JSON.stringify(completedSegs || []), lastSegIndex ?? 0, status || 'in_progress', recordedCount ?? 0, savedWordCount ?? 0, completedAt ?? null, now, now, auth.userId, clipId]
      );
    } else {
      await db.run(
        `INSERT INTO shadowing_progress (id, user_id, clip_id, completed_segs, last_seg_index, status, recorded_count, saved_word_count, completed_at, last_studied_at, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [crypto.randomUUID(), auth.userId, clipId, JSON.stringify(completedSegs || []), lastSegIndex ?? 0, status || 'in_progress', recordedCount ?? 0, savedWordCount ?? 0, completedAt ?? null, now, now, now]
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[shadowing/progress POST]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
