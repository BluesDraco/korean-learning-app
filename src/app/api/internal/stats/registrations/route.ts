import { NextRequest, NextResponse } from 'next/server';
import { assertInternalCaller } from '@/lib/server/internalAuth';
import { computeRegistrations } from '@/lib/server/adminStats';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!assertInternalCaller(request)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const url = new URL(request.url);
  const limit = Math.max(1, Math.min(5000, Number(url.searchParams.get('limit')) || 50));
  const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);
  const search = (url.searchParams.get('search') || '').trim();
  const data = await computeRegistrations({ limit, offset, search });
  return NextResponse.json(data, { headers: { 'Cache-Control': 'private, no-store' } });
}
