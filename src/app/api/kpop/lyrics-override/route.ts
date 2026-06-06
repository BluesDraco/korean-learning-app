import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');

  const db = await getDb();

  if (songId) {
    const result = await db.exec(
      'SELECT * FROM kpop_lyrics_override WHERE song_id = ? ORDER BY line_index ASC',
      [songId]
    );
    const columns = result[0]?.columns ?? [];
    const rows = (result[0]?.values ?? []).map((r: unknown[]) => rowToOverride(r, columns));
    return NextResponse.json(rows);
  }

  const result = await db.exec('SELECT * FROM kpop_lyrics_override ORDER BY song_id, line_index ASC');
  const columns = result[0]?.columns ?? [];
  const rows = (result[0]?.values ?? []).map((r: unknown[]) => rowToOverride(r, columns));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { songId, lineIndex, korean, chinese } = body;
  if (!songId || lineIndex === undefined || !korean) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = await getDb();
  const now = Date.now();

  await db.run(
    `INSERT INTO kpop_lyrics_override (song_id, line_index, korean, chinese, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(song_id, line_index) DO UPDATE SET korean = excluded.korean, chinese = excluded.chinese, updated_at = excluded.updated_at`,
    [songId, lineIndex, korean, chinese ?? '', now]
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');
  const lineIndex = searchParams.get('lineIndex');

  if (!songId || lineIndex === null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = await getDb();
  await db.run(
    'DELETE FROM kpop_lyrics_override WHERE song_id = ? AND line_index = ?',
    [songId, Number(lineIndex)]
  );

  return NextResponse.json({ ok: true });
}

function rowToOverride(row: unknown[], columns: string[]) {
  const col = (name: string) => columns.indexOf(name);
  return {
    songId: row[col('song_id')],
    lineIndex: Number(row[col('line_index')]),
    korean: row[col('korean')] as string,
    chinese: row[col('chinese')] as string,
    updatedAt: Number(row[col('updated_at')] ?? 0),
  };
}
