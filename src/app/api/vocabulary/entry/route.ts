import { NextRequest, NextResponse } from 'next/server';
import type { WordEntry } from '@/types';
import { allEntries, allEntriesById } from '@/data/vocabulary/vocab-data';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const korean = searchParams.get('korean');
  const ids = searchParams.get('ids');

  if (ids) {
    const idList = ids.split(',').filter(Boolean).slice(0, 200);
    const entries = idList.map(i => allEntriesById.get(i)).filter((e): e is WordEntry => e !== undefined);
    return NextResponse.json({ entries }, { headers: { 'Cache-Control': CACHE } });
  }

  if (id) {
    const entry = allEntriesById.get(id) ?? null;
    return NextResponse.json({ entry }, { headers: { 'Cache-Control': CACHE } });
  }

  if (korean) {
    const entry = allEntries.find(e => e.korean === korean) ?? null;
    return NextResponse.json({ entry }, { headers: { 'Cache-Control': CACHE } });
  }

  return NextResponse.json({ error: 'id, korean, or ids param required' }, { status: 400 });
}
