import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { ContentResponse } from '@/types/admin';

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  // No content feedback system yet — all empty
  const response: ContentResponse = {
    moduleStats: [],
    feedbacks: [],
    total: 0,
  };

  return NextResponse.json(response);
}
