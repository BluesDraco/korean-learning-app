import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');

  const db = await getDb();

  if (songId) {
    const result = await db.exec(
      'SELECT * FROM kpop_line_calibration WHERE song_id = ? ORDER BY line_index ASC',
      [songId]
    );
    const columns = result[0]?.columns ?? [];
    const rows = (result[0]?.values ?? []).map((r: unknown[]) => rowToLineCal(r, columns));
    return NextResponse.json(rows);
  }

  const result = await db.exec(
    'SELECT * FROM kpop_line_calibration ORDER BY updated_at DESC'
  );
  const columns = result[0]?.columns ?? [];
  const rows = (result[0]?.values ?? []).map((r: unknown[]) => rowToLineCal(r, columns));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { songId, lineIndex, startOffsetMs, endOffsetMs } = body;
  if (!songId || lineIndex === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = await getDb();
  const now = Date.now();

  const existing = await db.exec(
    'SELECT id FROM kpop_line_calibration WHERE song_id = ? AND line_index = ?',
    [songId, lineIndex]
  );

  if (existing[0]?.values?.length > 0) {
    await db.run(
      `UPDATE kpop_line_calibration SET start_offset_ms = ?, end_offset_ms = ?, updated_at = ? WHERE song_id = ? AND line_index = ?`,
      [startOffsetMs ?? 0, endOffsetMs ?? 0, now, songId, lineIndex]
    );
  } else {
    await db.run(
      `INSERT INTO kpop_line_calibration (id, song_id, line_index, start_offset_ms, end_offset_ms, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), songId, lineIndex, startOffsetMs ?? 0, endOffsetMs ?? 0, now]
    );
  }

  return NextResponse.json({ ok: true });
}

function rowToLineCal(row: unknown[], columns: string[]) {
  const col = (name: string) => columns.indexOf(name);
  return {
    songId: row[col('song_id')],
    lineIndex: Number(row[col('line_index')]),
    startOffsetMs: Number(row[col('start_offset_ms')] ?? 0),
    endOffsetMs: Number(row[col('end_offset_ms')] ?? 0),
    updatedAt: Number(row[col('updated_at')] ?? 0),
  };
}
