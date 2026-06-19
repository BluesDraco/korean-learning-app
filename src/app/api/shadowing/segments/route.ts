import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (auth.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const { clipId, segments } = body;

    if (!clipId || !Array.isArray(segments) || segments.length === 0) {
      return NextResponse.json({ error: 'clipId and segments array required' }, { status: 400 });
    }

    const db = await getDb();

    // verify clip exists
    const clipCheck = await db.exec(`SELECT id FROM shadowing_clips WHERE id = ?`, [clipId]);
    if ((clipCheck[0]?.values ?? []).length === 0) {
      return NextResponse.json({ error: 'Clip not found' }, { status: 404 });
    }

    // delete existing segments for this clip
    await db.run(`DELETE FROM shadowing_segments WHERE clip_id = ?`, [clipId]);

    // insert new segments
    const now = Date.now();
    const statements = segments.map((seg: {
      segIndex: number;
      startMs: number;
      endMs: number;
      korean: string;
      chinese?: string;
      tokens?: unknown[];
      shadowingTip?: string;
      vocabPills?: string[];
    }) => ({
      sql: `INSERT INTO shadowing_segments (id, clip_id, seg_index, start_ms, end_ms, korean, chinese, tokens, shadowing_tip, vocab_pills, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        crypto.randomUUID(),
        clipId,
        seg.segIndex,
        seg.startMs,
        seg.endMs,
        seg.korean ?? '',
        seg.chinese ?? '',
        JSON.stringify(seg.tokens ?? []),
        seg.shadowingTip ?? '',
        JSON.stringify(seg.vocabPills ?? []),
        now,
      ],
    }));

    await db.batch(statements);

    return NextResponse.json({ ok: true, count: segments.length });
  } catch (e) {
    console.error('[shadowing/segments POST]', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
