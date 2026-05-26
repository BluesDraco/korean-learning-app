import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { RevenueResponse } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));
  const type = searchParams.get('type') || 'all';

  const summary = {
    today: randAround(380, 30),
    thisWeek: randAround(2400, 20),
    thisMonth: randAround(9800, 15),
    total: randAround(156000, 10),
  };

  const types = ['monthly', 'yearly', 'donation'] as const;
  const users = ['학습왕', '韩语喵', '小星星', '바다', '樱花兔', '열공모드', '初雪', '별빛', '바람', '꽃길만'];
  const allOrders = Array.from({ length: 67 }, (_, i) => ({
    id: `order-${i + 1}`,
    userId: `user-${randAround(50, 80)}`,
    username: users[Math.floor(Math.random() * users.length)],
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.random() > 0.7 ? 299 : Math.random() > 0.5 ? 99 : randAround(15, 50),
    createdAt: Date.now() - randAround(30 * 24 * 3600000, 90),
    status: (Math.random() > 0.9 ? 'refunded' : 'paid') as 'paid' | 'refunded',
  })).sort((a, b) => b.createdAt - a.createdAt);

  const filtered = type === 'all' ? allOrders : allOrders.filter((o) => o.type === type);
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const orders = filtered.slice(start, start + pageSize);

  const response: RevenueResponse = { summary, orders, total, page, pageSize };
  return NextResponse.json(response);
}
