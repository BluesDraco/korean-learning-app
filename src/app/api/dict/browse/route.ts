import { NextRequest, NextResponse } from 'next/server';
import { getBucket, getManifest, toListItem, DICT_INDEX } from '@/lib/server/dict';

const CACHE = 'public, max-age=86400, stale-while-revalidate=604800';
const PAGE = 50;

// GET /api/dict/browse?initial=ㄱ&page=0  → { items, total, hasMore, index }
export async function GET(request: NextRequest) {
  const sp = new URL(request.url).searchParams;
  const initial = sp.get('initial') ?? 'ㄱ';
  const page = Math.max(0, parseInt(sp.get('page') ?? '0') || 0);

  if (!DICT_INDEX.includes(initial as never)) {
    return NextResponse.json({ error: 'invalid initial' }, { status: 400 });
  }

  const bucket = getBucket(initial);
  const start = page * PAGE;
  const slice = bucket.slice(start, start + PAGE);
  const manifest = getManifest();

  return NextResponse.json(
    {
      items: slice.map(toListItem),
      total: bucket.length,
      hasMore: start + PAGE < bucket.length,
      index: DICT_INDEX.map(k => ({ key: k, count: manifest.buckets[k]?.count ?? 0 })),
      source: manifest.source,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}
