import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { SystemResponse } from '@/types/admin';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  // No monitoring / AI tracking yet — all empty
  const response: SystemResponse = {
    cpuMemoryHistory: [],
    errorLogs: [],
    aiUsage: {
      totalCallsThisMonth: 0,
      totalTokensThisMonth: 0,
      totalCostThisMonth: 0,
      dailyCalls: [],
    },
    topUsers: [],
  };

  return NextResponse.json(response);
}
