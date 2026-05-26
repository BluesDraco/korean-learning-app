import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { SystemResponse } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  // CPU/Memory history — 24 hours, hourly
  const cpuMemoryHistory = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    // Simulate diurnal pattern: lower at night, higher during day
    const baseCpu = hour >= 2 && hour < 8 ? 15 : hour >= 14 && hour < 18 ? 55 : 35;
    const baseMem = hour >= 2 && hour < 8 ? 40 : hour >= 14 && hour < 18 ? 70 : 55;
    return {
      time: `${String(hour).padStart(2, '0')}:00`,
      cpuPercent: Math.min(100, Math.max(0, randAround(baseCpu, 30))),
      memoryPercent: Math.min(100, Math.max(0, randAround(baseMem, 15))),
    };
  });

  // Error logs
  const errorTemplates = [
    { level: 'error' as const, source: 'api' as const, message: 'GET /api/ai/chat 500 Internal Server Error — DeepSeek timeout', stack: 'Error: ESOCKETTIMEDOUT\n    at TLSSocket.onConnectTimeout (...)' },
    { level: 'error' as const, source: 'ai' as const, message: 'DeepSeek API returned 429 Too Many Requests', stack: 'RateLimitError: Too Many Requests\n    at handleResponse (...)' },
    { level: 'warn' as const, source: 'db' as const, message: 'Slow query detected: SELECT * FROM study_logs WHERE user_id=? took 2.3s', stack: undefined },
    { level: 'warn' as const, source: 'auth' as const, message: 'Multiple failed login attempts from IP 192.168.1.x for user admin', stack: undefined },
    { level: 'error' as const, source: 'api' as const, message: 'POST /api/auth/register 422 Validation Error — email already exists', stack: undefined },
    { level: 'info' as const, source: 'db' as const, message: 'Database backup completed successfully (32MB)', stack: undefined },
    { level: 'warn' as const, source: 'ai' as const, message: 'AI response token count exceeded limit (16384 > 8192)', stack: undefined },
    { level: 'error' as const, source: 'db' as const, message: 'Connection pool exhausted, retrying in 5s', stack: 'PoolSizeError: Max 20 connections reached' },
    { level: 'info' as const, source: 'auth' as const, message: 'User password changed successfully', stack: undefined },
    { level: 'warn' as const, source: 'api' as const, message: 'Request rate limit approaching: 950/1000 rpm', stack: undefined },
  ];

  const errorLogs = Array.from({ length: 30 }, (_, i) => {
    const template = errorTemplates[Math.floor(Math.random() * errorTemplates.length)];
    return {
      id: `error-${i + 1}`,
      ...template,
      timestamp: Date.now() - randAround(48, 90) * 3600000,
    };
  }).sort((a, b) => b.timestamp - a.timestamp);

  // AI usage this month
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  let totalCalls = 0;
  let totalTokens = 0;

  const dailyCalls = Array.from({ length: currentDay }, (_, i) => {
    const calls = randAround(280, 40);
    const tokens = calls * randAround(1200, 30);
    totalCalls += calls;
    totalTokens += tokens;
    return {
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      calls,
      tokens,
    };
  });

  const totalCostThisMonth = Math.round((totalTokens / 1000000) * 1.5 * 100) / 100; // ~1.5 CNY per 1M tokens

  // Top users
  const topUserNames = ['학습왕', '韩语喵', '小星星', '바다', '樱花兔', '열공모드', 'AI狂魔', '初雪', '별빛', '데일리'];
  const topUsers = topUserNames.map((name, i) => ({
    userId: `user-${i + 1}`,
    username: name,
    totalCalls: randAround(2000 - i * 150, 20),
    totalTokens: randAround(2400000 - i * 180000, 20),
    estimatedCost: Math.round(randAround(200 - i * 15, 20) * 100) / 100,
    membershipType: (i < 3 ? 'yearly' : i < 6 ? 'monthly' : 'free') as 'free' | 'monthly' | 'yearly',
  }));

  const response: SystemResponse = {
    cpuMemoryHistory,
    errorLogs,
    aiUsage: {
      totalCallsThisMonth: totalCalls,
      totalTokensThisMonth: totalTokens,
      totalCostThisMonth,
      dailyCalls,
    },
    topUsers,
  };

  return NextResponse.json(response);
}
