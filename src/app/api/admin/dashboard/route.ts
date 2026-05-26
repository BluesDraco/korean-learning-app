import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { DashboardResponse } from '@/types/admin';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();

  // Real: count users
  const userCountResult = await db.exec('SELECT COUNT(*) FROM users');
  const totalUsers = userCountResult.length > 0 ? Number(userCountResult[0].values[0][0]) : 0;

  const todayUsersResult = await db.exec(
    `SELECT COUNT(*) FROM users WHERE created_at > ${Date.now() - 86400000}`
  );
  const todayUsers = todayUsersResult.length > 0 ? Number(todayUsersResult[0].values[0][0]) : 0;

  const yesterdayUsersResult = await db.exec(
    `SELECT COUNT(*) FROM users WHERE created_at BETWEEN ${Date.now() - 172800000} AND ${Date.now() - 86400000}`
  );
  const yesterdayUsers = yesterdayUsersResult.length > 0 ? Number(yesterdayUsersResult[0].values[0][0]) : 0;

  // No payment system yet — all zero
  const todayRevenue = 0;
  const yesterdayRevenue = 0;
  const revenueChange = 0;
  const todayConversion = 0;
  const yesterdayConversion = 0;
  const convChange = 0;

  // No AI tracking yet — zero
  const todayAiCalls = 0;
  const yesterdayAiCalls = 0;
  const aiChange = 0;

  // Revenue trend: empty (no data)
  const revenueTrend: { date: string; monthlySub: number; yearlySub: number; donation: number }[] = [];

  // Funnel: real user counts only, rest zero
  const funnel = {
    visitors: { total: totalUsers, rate: 100 },
    registered: { total: totalUsers, rate: totalUsers > 0 ? 100 : 0 },
    paid: { total: 0, rate: 0 },
    yearly: { total: 0, rate: 0 },
  };

  // Feature usage: zero until tracking is implemented
  const features = [
    { feature: '单词复习', icon: '📝', count: 0, totalPercent: 0 },
    { feature: '跟读训练', icon: '🎤', count: 0, totalPercent: 0 },
    { feature: '听写练习', icon: '🎧', count: 0, totalPercent: 0 },
    { feature: 'AI对话', icon: '🤖', count: 0, totalPercent: 0 },
    { feature: '闪卡学习', icon: '🃏', count: 0, totalPercent: 0 },
    { feature: '主题词包', icon: '📦', count: 0, totalPercent: 0 },
    { feature: '视频学习', icon: '🎬', count: 0, totalPercent: 0 },
    { feature: '分级词表', icon: '📊', count: 0, totalPercent: 0 },
    { feature: '情景词典', icon: '🔍', count: 0, totalPercent: 0 },
    { feature: '成就系统', icon: '🏆', count: 0, totalPercent: 0 },
  ];

  // Activity feed: empty — no activity tracking yet
  const activities: DashboardResponse['activityFeed'] = [];

  // Server status: real defaults (not simulated)
  const serverRealtime = {
    cpuPercent: 0,
    memoryPercent: 0,
    apiRequestsToday: 0,
    pendingFeedbackCount: 0,
  };

  const response: DashboardResponse = {
    overview: {
      revenue: { value: todayRevenue, change: revenueChange, yesterdayValue: yesterdayRevenue, label: '今日收入' },
      newUsers: { value: todayUsers, change: yesterdayUsers > 0 ? Math.round(((todayUsers - yesterdayUsers) / yesterdayUsers) * 100) : 100, yesterdayValue: yesterdayUsers, label: '新增用户' },
      conversionRate: { value: Math.round(todayConversion * 100 * 10) / 10, change: convChange, yesterdayValue: Math.round(yesterdayConversion * 100 * 10) / 10, label: '付费转化率' },
      aiCalls: { value: todayAiCalls, change: aiChange, yesterdayValue: yesterdayAiCalls, label: 'AI调用量' },
    },
    revenueTrend,
    serverRealtime,
    userFunnel: funnel,
    featureUsage: features,
    activityFeed: activities,
  };

  return NextResponse.json(response);
}
