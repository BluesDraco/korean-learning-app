import { NextResponse } from 'next/server';
import { themePacks } from '@/data/vocabulary/vocab-data';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';

export async function GET() {
  const categories = [...new Set(themePacks.map(t => t.category))];
  return NextResponse.json(
    { themes: themePacks, categories },
    { headers: { 'Cache-Control': CACHE } }
  );
}
