import { NextRequest, NextResponse } from 'next/server';
import type { WordEntry } from '@/types';
import { themePacks, allEntriesById } from '@/data/vocabulary/vocab-data';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const theme = themePacks.find(t => t.id === id) ?? null;
  if (!theme) {
    return NextResponse.json({ theme: null, words: [] }, { headers: { 'Cache-Control': CACHE } });
  }

  const words = theme.wordIds.map(wid => allEntriesById.get(wid)).filter((w): w is WordEntry => w !== undefined);
  return NextResponse.json({ theme, words }, { headers: { 'Cache-Control': CACHE } });
}
