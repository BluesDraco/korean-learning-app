import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

function msLabel(ms: number): string {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sourceType = searchParams.get('source_type');
    const difficulty = searchParams.get('difficulty');
    const isAdmin = searchParams.get('_admin') === '1';

    if (isAdmin) {
      const { getAuthFromCookie } = await import('@/lib/server/auth');
      const auth = await getAuthFromCookie();
      if (!auth || auth.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const db = await getDb();

    const conditions: string[] = [];
    const params: unknown[] = [];

    if (!isAdmin) conditions.push('is_published = 1');
    if (sourceType && sourceType !== 'all') { conditions.push('source_type = ?'); params.push(sourceType); }
    if (difficulty && difficulty !== 'all') { conditions.push('difficulty = ?'); params.push(difficulty); }

    const where = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
    let sql = `SELECT id, title, speaker, description, source_type, youtube_id, cover_url, duration_ms, difficulty, tags, is_premium, is_published, sort_order, created_at, updated_at FROM shadowing_clips${where}`;

    sql += ` ORDER BY sort_order ASC, created_at DESC`;

    const result = await db.exec(sql, params);
    const rows = result[0]?.values ?? [];
    const columns = result[0]?.columns ?? [];
    const col = (name: string) => columns.indexOf(name);

    const clips = rows.map(row => ({
      id: row[col('id')],
      title: row[col('title')],
      speaker: row[col('speaker')],
      description: row[col('description')],
      sourceType: row[col('source_type')],
      youtubeId: row[col('youtube_id')],
      coverUrl: row[col('cover_url')] || `https://i.ytimg.com/vi/${row[col('youtube_id')]}/hqdefault.jpg`,
      durationMs: row[col('duration_ms')],
      durationLabel: msLabel(row[col('duration_ms')] as number),
      difficulty: row[col('difficulty')],
      tags: JSON.parse((row[col('tags')] as string) || '[]'),
      isPremium: row[col('is_premium')] === 1,
      isPublished: row[col('is_published')] === 1,
      sortOrder: row[col('sort_order')],
      createdAt: row[col('created_at')],
      updatedAt: row[col('updated_at')],
    }));

    // attach segment counts
    for (const clip of clips) {
      const cntResult = await db.exec(
        `SELECT COUNT(*) as cnt FROM shadowing_segments WHERE clip_id = ?`,
        [clip.id]
      );
      const cntRows = cntResult[0]?.values ?? [];
      const cntCols = cntResult[0]?.columns ?? [];
      (clip as any).segmentCount = (cntRows[0]?.[cntCols.indexOf('cnt')] as number) ?? 0;
    }

    return NextResponse.json({ clips });
  } catch (e) {
    console.error('[shadowing/clips GET]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { getAuthFromCookie } = await import('@/lib/server/auth');
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (auth.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const { title, speaker, description, sourceType, youtubeId, coverUrl, durationMs, difficulty, tags, isPremium, isPublished, sortOrder } = body;

    if (!title || !sourceType || !youtubeId) {
      return NextResponse.json({ error: 'title, sourceType, youtubeId required' }, { status: 400 });
    }

    const db = await getDb();
    const id = `clip-${youtubeId}-${Date.now()}`;
    const now = Date.now();

    await db.run(
      `INSERT INTO shadowing_clips (id, title, speaker, description, source_type, youtube_id, cover_url, duration_ms, difficulty, tags, is_premium, is_published, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, title, speaker || '', description || '', sourceType, youtubeId, coverUrl || '', durationMs || 0, difficulty || 'A2', JSON.stringify(tags || []), isPremium ? 1 : 0, isPublished ? 1 : 0, sortOrder || 0, now, now]
    );

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error('[shadowing/clips POST]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
