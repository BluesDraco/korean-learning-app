import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  const result = await db.exec(
    'SELECT * FROM kpop_import_jobs WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
    [auth.userId]
  );
  const rows = result[0]?.values?.map((r: unknown[]) => rowToJob(r, result[0].columns)) ?? [];
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { url } = body;

  if (!url || typeof url !== 'string' || !url.trim()) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  const trimmed = url.trim();
  if (trimmed.length > 2048) {
    return NextResponse.json({ error: 'URL too long' }, { status: 400 });
  }

  const db = await getDb();
  const id = crypto.randomUUID();
  const now = Date.now();

  await db.run(
    `INSERT INTO kpop_import_jobs (id, user_id, url, status, created_at, updated_at)
     VALUES (?, ?, ?, 'queued', ?, ?)`,
    [id, auth.userId, trimmed, now, now]
  );

  return NextResponse.json({ ok: true, id, status: 'queued' });
}

function rowToJob(row: unknown[], columns: string[]) {
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    const key = col.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    obj[key] = row[i];
  });
  return obj;
}
