import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { songId, timingOffsetMs, timingVerified } = body;
  if (!songId) return NextResponse.json({ error: 'Missing songId' }, { status: 400 });

  const db = await getDb();
  const now = Date.now();

  // Upsert into kpop_track_calibration
  const existing = await db.exec(
    'SELECT id FROM kpop_track_calibration WHERE song_id = ?',
    [songId]
  );

  if (existing[0]?.values?.length > 0) {
    await db.run(
      `UPDATE kpop_track_calibration SET timing_offset_ms = ?, timing_verified = ?, updated_at = ? WHERE song_id = ?`,
      [timingOffsetMs ?? 0, timingVerified ? 1 : 0, now, songId]
    );
  } else {
    await db.run(
      `INSERT INTO kpop_track_calibration (id, song_id, timing_offset_ms, timing_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), songId, timingOffsetMs ?? 0, timingVerified ? 1 : 0, now, now]
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');

  const db = await getDb();

  if (songId) {
    const result = await db.exec(
      'SELECT * FROM kpop_track_calibration WHERE song_id = ?',
      [songId]
    );
    const row = result[0]?.values?.[0];
    if (!row) return NextResponse.json(null);
    return NextResponse.json({
      songId: row[result[0].columns.indexOf('song_id')],
      timingOffsetMs: row[result[0].columns.indexOf('timing_offset_ms')],
      timingVerified: !!row[result[0].columns.indexOf('timing_verified')],
      timingSource: row[result[0].columns.indexOf('timing_source')] || 'manual',
    });
  }

  const result = await db.exec('SELECT * FROM kpop_track_calibration ORDER BY updated_at DESC');
  const rows = (result[0]?.values ?? []).map((r) => ({
    songId: r[result[0].columns.indexOf('song_id')],
    timingOffsetMs: r[result[0].columns.indexOf('timing_offset_ms')],
    timingVerified: !!r[result[0].columns.indexOf('timing_verified')],
    timingSource: r[result[0].columns.indexOf('timing_source')] || 'manual',
  }));
  return NextResponse.json(rows);
}
