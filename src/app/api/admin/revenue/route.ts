import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { RevenueResponse } from '@/types/admin';

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));

  // No payment system yet — all zero
  const response: RevenueResponse = {
    summary: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
    orders: [],
    total: 0,
    page,
    pageSize,
  };
  return NextResponse.json(response);
}
