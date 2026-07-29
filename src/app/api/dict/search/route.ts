import { NextRequest, NextResponse } from 'next/server';
import { searchDict } from '@/lib/server/dict';

const CACHE = 'public, max-age=300, stale-while-revalidate=3600';

// GET /api/dict/search?q=价格  → { results }
export async function GET(request: NextRequest) {
  const q = new URL(request.url).searchParams.get('q') ?? '';
  if (!q.trim() || q.length > 100) return NextResponse.json({ results: [] });

  const results = searchDict(q);
  return NextResponse.json({ results }, { headers: { 'Cache-Control': CACHE } });
}
