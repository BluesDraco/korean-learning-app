import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');

  const db = await getDb();

  if (songId) {
    const result = await db.exec(
      'SELECT * FROM user_kpop_progress WHERE user_id = ? AND song_id = ?',
      [auth.userId, songId]
    );
    const row = result[0]?.values?.[0];
    if (!row) return NextResponse.json(null);
    return NextResponse.json(rowToProgress(row, result[0].columns));
  }

  const result = await db.exec(
    'SELECT * FROM user_kpop_progress WHERE user_id = ? ORDER BY last_practiced_at DESC',
    [auth.userId]
  );
  const rows = result[0]?.values?.map((r) => rowToProgress(r, result[0].columns)) ?? [];
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { songId, totalLines, practicedLines, completedLineIndices, currentLineIndex, totalRecordings, totalPracticeSeconds, status } = body;

  if (!songId) return NextResponse.json({ error: 'Missing songId' }, { status: 400 });

  const db = await getDb();
  const now = Date.now();

  // Check existing
  const existing = await db.exec(
    'SELECT id FROM user_kpop_progress WHERE user_id = ? AND song_id = ?',
    [auth.userId, songId]
  );

  if (existing[0]?.values?.length > 0) {
    const id = existing[0].values[0][0] as string;
    await db.run(
      `UPDATE user_kpop_progress SET
        total_lines = ?, practiced_lines = ?, completed_lines = ?,
        current_line_index = ?, total_recordings = ?, total_practice_seconds = ?,
        last_practiced_at = ?, status = ?, updated_at = ?
      WHERE id = ?`,
      [
        totalLines ?? 0,
        practicedLines ?? 0,
        JSON.stringify(completedLineIndices ?? []),
        currentLineIndex ?? 0,
        totalRecordings ?? 0,
        totalPracticeSeconds ?? 0,
        now,
        status ?? 'in_progress',
        now,
        id,
      ]
    );
    return NextResponse.json({ ok: true, id });
  }

  const id = crypto.randomUUID();
  await db.run(
    `INSERT INTO user_kpop_progress (id, user_id, song_id, current_line_index, practiced_lines, completed_lines, total_recordings, total_practice_seconds, last_practiced_at, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      auth.userId,
      songId,
      currentLineIndex ?? 0,
      practicedLines ?? 0,
      JSON.stringify(completedLineIndices ?? []),
      totalRecordings ?? 0,
      totalPracticeSeconds ?? 0,
      now,
      status ?? 'in_progress',
      now,
      now,
    ]
  );

  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');
  if (!songId) return NextResponse.json({ error: 'Missing songId' }, { status: 400 });

  const db = await getDb();
  await db.run(
    'DELETE FROM user_kpop_progress WHERE user_id = ? AND song_id = ?',
    [auth.userId, songId]
  );

  return NextResponse.json({ ok: true });
}

function rowToProgress(row: unknown[], columns: string[]) {
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    const key = col.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    const val = row[i];

    if (key === 'completedLines') {
      try { obj.completedLineIndices = JSON.parse(val as string); } catch { obj.completedLineIndices = []; }
    } else if (key === 'practicedLines' || key === 'totalLines' || key === 'currentLineIndex' || key === 'totalRecordings' || key === 'totalPracticeSeconds') {
      obj[key] = Number(val ?? 0);
    } else {
      obj[key] = val;
    }
  });
  return obj;
}
