import { NextRequest, NextResponse } from 'next/server';
import { levelWordLists, allEntries } from '@/data/vocabulary/vocab-data';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level: levelParam } = await params;
  const level = parseInt(levelParam);
  if (isNaN(level)) {
    return NextResponse.json({ error: 'invalid level' }, { status: 400 });
  }

  const list = levelWordLists.find(l => l.level === level) ?? null;
  const words = allEntries.filter(e => parseInt(e.level) === level);

  return NextResponse.json(
    { level: list ? { ...list, totalCount: words.length } : null, words },
    { headers: { 'Cache-Control': CACHE } }
  );
}
