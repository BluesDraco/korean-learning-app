import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import path from 'path';

const RECORDINGS_DIR = path.join(process.cwd(), 'data', 'recordings');

async function ensureDir(dir: string) {
  try { await mkdir(dir, { recursive: true }); } catch { /* exists */ }
}

export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get('songId');
  const lineIndex = searchParams.get('lineIndex');
  const download = searchParams.get('download');

  const db = await getDb();

  if (songId && lineIndex !== null) {
    const result = await db.exec(
      'SELECT * FROM user_recordings WHERE user_id = ? AND source_id = ? AND line_id = ? ORDER BY created_at DESC LIMIT 1',
      [auth.userId, songId, lineIndex]
    );
    const row = result[0]?.values?.[0];
    if (!row) return NextResponse.json(null);

    const cols = result[0].columns;
    const recording = rowToObj(row, cols) as Record<string, unknown>;

    // Serve audio file if requested
    if (download && recording.audioUrl) {
      try {
        const filePath = path.join(RECORDINGS_DIR, recording.audioUrl as string);
        const data = await readFile(filePath);
        return new NextResponse(data, {
          headers: { 'Content-Type': 'audio/webm', 'Cache-Control': 'private, max-age=3600' },
        });
      } catch {
        return NextResponse.json({ error: 'Audio file not found' }, { status: 404 });
      }
    }

    return NextResponse.json(recording);
  }

  // List all recordings for user
  const result = await db.exec(
    'SELECT * FROM user_recordings WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [auth.userId]
  );
  const rows = result[0]?.values?.map((r) => rowToObj(r, result[0].columns)) ?? [];
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contentType = req.headers.get('content-type') || '';

  // Multipart file upload
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const songId = formData.get('songId') as string | null;
    const lineIndex = formData.get('lineIndex') as string | null;
    const durationMs = parseInt(formData.get('durationMs') as string || '0', 10);

    if (!audioFile || !songId || lineIndex === null) {
      return NextResponse.json({ error: 'Missing audio, songId, or lineIndex' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(songId)) {
      return NextResponse.json({ error: 'Invalid songId' }, { status: 400 });
    }
    const lineIdx = parseInt(lineIndex, 10);
    if (isNaN(lineIdx) || lineIdx < 0 || lineIdx > 9999) {
      return NextResponse.json({ error: 'Invalid lineIndex' }, { status: 400 });
    }
    if (audioFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Audio file too large (max 5MB)' }, { status: 400 });
    }
    const allowedTypes = ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/wav'];
    if (!allowedTypes.includes(audioFile.type)) {
      return NextResponse.json({ error: 'Unsupported audio format' }, { status: 400 });
    }

    const userDir = path.join(RECORDINGS_DIR, auth.userId, songId);
    await ensureDir(userDir);

    const ext = 'webm';
    const fileName = `${lineIdx}.${ext}`;
    const filePath = path.join(userDir, fileName);
    const relativePath = `${auth.userId}/${songId}/${fileName}`;

    const buffer = Buffer.from(await audioFile.arrayBuffer());
    await writeFile(filePath, buffer);

    // Save metadata to user_recordings table
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = Date.now();

    // Delete old recording for same song+line
    await db.run(
      'DELETE FROM user_recordings WHERE user_id = ? AND source_id = ? AND line_id = ?',
      [auth.userId, songId, lineIndex]
    );

    await db.run(
      `INSERT INTO user_recordings (id, user_id, type, source_id, line_id, audio_url, duration_ms, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, auth.userId, 'kpop_line', songId, lineIndex, relativePath, durationMs, now]
    );

    return NextResponse.json({ ok: true, id, audioUrl: `/api/kpop/recording?download=1&songId=${songId}&lineIndex=${lineIndex}` });
  }

  // JSON body — store metadata only
  const body = await req.json();
  const { songId, lineIndex, audioUrl, durationMs } = body;

  if (!songId && !body.id) {
    return NextResponse.json({ error: 'Missing songId or id' }, { status: 400 });
  }

  const db = await getDb();
  const now = Date.now();

  if (body.id) {
    // Update existing
    await db.run(
      'UPDATE user_recordings SET audio_url = ?, duration_ms = ?, updated_at = ? WHERE id = ? AND user_id = ?',
      [audioUrl, durationMs ?? 0, now, body.id, auth.userId]
    );
    return NextResponse.json({ ok: true });
  }

  // Insert new metadata record
  const id = crypto.randomUUID();
  await db.run(
    `INSERT INTO user_recordings (id, user_id, type, source_id, line_id, audio_url, duration_ms, created_at)
    VALUES (?, ?, 'kpop_line', ?, ?, ?, ?, ?)`,
    [id, auth.userId, songId, String(lineIndex), audioUrl || '', durationMs ?? 0, now]
  );

  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const songId = searchParams.get('songId');
  const lineIndex = searchParams.get('lineIndex');

  const db = await getDb();

  if (id) {
    // Get recording to delete file
    const res = await db.exec('SELECT audio_url FROM user_recordings WHERE id = ? AND user_id = ?', [id, auth.userId]);
    const audioUrl = res[0]?.values?.[0]?.[0] as string | undefined;
    if (audioUrl) {
      try { await unlink(path.join(RECORDINGS_DIR, audioUrl)); } catch { /* already gone */ }
    }
    await db.run('DELETE FROM user_recordings WHERE id = ? AND user_id = ?', [id, auth.userId]);
    return NextResponse.json({ ok: true });
  }

  if (songId && lineIndex !== null) {
    const res = await db.exec(
      'SELECT id, audio_url FROM user_recordings WHERE user_id = ? AND source_id = ? AND line_id = ?',
      [auth.userId, songId, lineIndex]
    );
    for (const row of res[0]?.values ?? []) {
      const recId = row[0] as string;
      const audioUrl = row[1] as string | undefined;
      if (audioUrl) {
        try { await unlink(path.join(RECORDINGS_DIR, audioUrl)); } catch { /* gone */ }
      }
      await db.run('DELETE FROM user_recordings WHERE id = ?', [recId]);
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Missing id, songId, or lineIndex' }, { status: 400 });
}

function rowToObj(row: unknown[], columns: string[]) {
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    const key = col.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    obj[key] = row[i];
  });
  return obj;
}
