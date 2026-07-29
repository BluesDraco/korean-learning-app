import { NextRequest, NextResponse } from 'next/server';
import { allEntries } from '@/data/vocabulary/vocab-data';

export async function GET(request: NextRequest) {
  const q = (new URL(request.url).searchParams.get('q') ?? '').toLowerCase().trim();
  if (!q || q.length > 100) return NextResponse.json({ results: [] });

  const results = allEntries.filter(e =>
    e.korean.toLowerCase().includes(q) ||
    e.romanization.toLowerCase().includes(q) ||
    e.meanings.some(m => m.chinese.includes(q))
  ).slice(0, 50);

  return NextResponse.json(
    { results },
    { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600' } }
  );
}
