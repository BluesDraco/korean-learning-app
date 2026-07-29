import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { scopedRegistrations } from '@/lib/server/adminStats';
import type { AdminScope } from '@/types/admin';

export const dynamic = 'force-dynamic';

function parseScope(v: string | null): AdminScope {
  return v === 'overseas' || v === 'combined' ? v : 'domestic';
}

export async function GET(request: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const url = new URL(request.url);
  const scope = parseScope(url.searchParams.get('scope'));
  const limit = Math.max(1, Math.min(5000, Number(url.searchParams.get('limit')) || 50));
  const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);
  const search = (url.searchParams.get('search') || '').trim();

  const response = await scopedRegistrations(scope, { limit, offset, search });
  return NextResponse.json(response, { headers: { 'Cache-Control': 'private, no-store' } });
}
