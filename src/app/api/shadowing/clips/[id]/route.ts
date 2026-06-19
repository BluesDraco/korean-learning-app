import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

function msLabel(ms: number): string {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDb();

    // check admin access for unpublished clips
    const { searchParams } = new URL(_req.url);
    const isAdmin = searchParams.get('_admin') === '1';
    if (isAdmin) {
      const { getAuthFromCookie } = await import('@/lib/server/auth');
      const auth = await getAuthFromCookie();
      if (!auth || auth.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const clipResult = await db.exec(
      `SELECT * FROM shadowing_clips WHERE id = ?${isAdmin ? '' : ' AND is_published = 1'}`,
      [id]
    );
    const rows = clipResult[0]?.values ?? [];
    const columns = clipResult[0]?.columns ?? [];
    if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const col = (name: string) => columns.indexOf(name);
    const r = rows[0];
    const clip = {
      id: r[col('id')],
      title: r[col('title')],
      speaker: r[col('speaker')],
      description: r[col('description')],
      sourceType: r[col('source_type')],
      youtubeId: r[col('youtube_id')],
      coverUrl: r[col('cover_url')] || `https://i.ytimg.com/vi/${r[col('youtube_id')]}/hqdefault.jpg`,
      durationMs: r[col('duration_ms')],
      durationLabel: msLabel(r[col('duration_ms')] as number),
      difficulty: r[col('difficulty')],
      tags: JSON.parse((r[col('tags')] as string) || '[]'),
      isPremium: r[col('is_premium')] === 1,
      isPublished: r[col('is_published')] === 1,
      sortOrder: r[col('sort_order')],
      createdAt: r[col('created_at')],
      updatedAt: r[col('updated_at')],
    };

    const segResult = await db.exec(
      `SELECT * FROM shadowing_segments WHERE clip_id = ? ORDER BY seg_index ASC`,
      [id]
    );
    const segRows = segResult[0]?.values ?? [];
    const segCols = segResult[0]?.columns ?? [];
    const sc = (name: string) => segCols.indexOf(name);

    const segments = segRows.map(row => ({
      id: row[sc('id')],
      clipId: row[sc('clip_id')],
      segIndex: row[sc('seg_index')],
      startMs: row[sc('start_ms')],
      endMs: row[sc('end_ms')],
      korean: row[sc('korean')],
      chinese: row[sc('chinese')],
      tokens: JSON.parse((row[sc('tokens')] as string) || '[]'),
      shadowingTip: row[sc('shadowing_tip')] || '',
      vocabPills: JSON.parse((row[sc('vocab_pills')] as string) || '[]'),
    }));

    return NextResponse.json({ clip: { ...clip, segments } });
  } catch (e) {
    console.error('[shadowing/clips/[id] GET]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { getAuthFromCookie } = await import('@/lib/server/auth');
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (auth.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const db = await getDb();
    const now = Date.now();

    const allowed = ['title','speaker','description','source_type','youtube_id','cover_url','duration_ms','difficulty','tags','is_premium','is_published','sort_order'];
    const sets: string[] = [];
    const vals: unknown[] = [];

    for (const [k, v] of Object.entries(body)) {
      const dbKey = k.replace(/([A-Z])/g, '_$1').toLowerCase();
      if (allowed.includes(dbKey)) {
        sets.push(`${dbKey} = ?`);
        vals.push(typeof v === 'object' ? JSON.stringify(v) : v);
      }
    }
    if (sets.length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    sets.push('updated_at = ?');
    vals.push(now);
    vals.push(id);

    await db.run(`UPDATE shadowing_clips SET ${sets.join(', ')} WHERE id = ?`, vals);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[shadowing/clips/[id] PATCH]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
