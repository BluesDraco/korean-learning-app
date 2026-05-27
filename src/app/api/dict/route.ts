import { NextRequest, NextResponse } from 'next/server';
import { searchDictionary } from '@/lib/server/dict-loader';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const size = Math.min(50, Math.max(5, Number(searchParams.get('size')) || 20));

  if (!q.trim()) {
    return NextResponse.json({ results: [], total: 0, page, size });
  }

  const offset = (page - 1) * size;
  const { results, total } = searchDictionary(q, size, offset);

  return NextResponse.json(
    { results, total, page, size },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  );
}
