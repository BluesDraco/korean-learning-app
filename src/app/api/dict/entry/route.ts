import { NextRequest, NextResponse } from 'next/server';
import { getEntryById } from '@/lib/server/dict';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

// GET /api/dict/entry?id=27733  → { entry }
export async function GET(request: NextRequest) {
  const id = new URL(request.url).searchParams.get('id') ?? '';
  if (!id) return NextResponse.json({ entry: null }, { status: 400 });

  const entry = getEntryById(id);
  return NextResponse.json({ entry }, { headers: { 'Cache-Control': CACHE } });
}
