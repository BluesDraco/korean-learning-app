import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { DashboardResponse } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

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

  // Simulated: revenue data (no payments table yet)
  const todayRevenue = randAround(380, 30);
  const yesterdayRevenue = randAround(320, 30);
  const revenueChange = yesterdayRevenue > 0 ? Math.round(((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100) : 0;

  // Simulated: conversion rate
  const todayConversion = randAround(12, 20) / 100;
  const yesterdayConversion = randAround(11, 20) / 100;
  const convChange = yesterdayConversion > 0 ? Math.round(((todayConversion - yesterdayConversion) / yesterdayConversion) * 100) : 0;

  // Simulated: AI calls
  const todayAiCalls = randAround(2840, 25);
  const yesterdayAiCalls = randAround(2500, 25);
  const aiChange = yesterdayAiCalls > 0 ? Math.round(((todayAiCalls - yesterdayAiCalls) / yesterdayAiCalls) * 100) : 0;

  // Simulated: revenue trend (30 days)
  const revenueTrend = Array.from({ length: 30 }, (_, i) => ({
    date: daysAgo(29 - i),
    monthlySub: randAround(120, 40),
    yearlySub: randAround(80, 50),
    donation: randAround(30, 60),
  }));

  // Simulated: funnel
  const visitors = totalUsers * 8;
  const funnel = {
    visitors: { total: visitors, rate: 100 },
    registered: { total: totalUsers, rate: Math.round((totalUsers / Math.max(visitors, 1)) * 100) },
    paid: { total: randAround(120, 20), rate: randAround(15, 10) },
    yearly: { total: randAround(45, 20), rate: randAround(38, 10) },
  };

  // Simulated: feature usage
  const features = [
    { feature: '单词复习', icon: '📝', count: randAround(3200, 20), totalPercent: 0 },
    { feature: '跟读训练', icon: '🎤', count: randAround(2100, 20), totalPercent: 0 },
    { feature: '听写练习', icon: '🎧', count: randAround(1800, 20), totalPercent: 0 },
    { feature: 'AI对话', icon: '🤖', count: randAround(1500, 20), totalPercent: 0 },
    { feature: '闪卡学习', icon: '🃏', count: randAround(1200, 20), totalPercent: 0 },
    { feature: '主题词包', icon: '📦', count: randAround(900, 20), totalPercent: 0 },
    { feature: '视频学习', icon: '🎬', count: randAround(800, 20), totalPercent: 0 },
    { feature: '分级词表', icon: '📊', count: randAround(650, 20), totalPercent: 0 },
    { feature: '情景词典', icon: '🔍', count: randAround(500, 20), totalPercent: 0 },
    { feature: '成就系统', icon: '🏆', count: randAround(400, 20), totalPercent: 0 },
  ];
  const totalFeatureCount = features.reduce((sum, f) => sum + f.count, 0);
  features.forEach((f) => { f.totalPercent = Math.round((f.count / totalFeatureCount) * 100); });

  // Simulated: activity feed
  const sampleUsers = ['학습왕', '韩语喵', '小星星', '바다', '樱花兔', '열공모드', '初雪', '별빛'];
  const activities = Array.from({ length: 20 }, (_, i) => {
    const types = ['register', 'payment', 'feedback', 'ai_alert'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    const messages: Record<string, string> = {
      register: `用户 ${user} 刚刚注册了账号`,
      payment: `${user} 开通了${Math.random() > 0.5 ? '月付' : '年付'}会员`,
      feedback: `${user} 提交了一条纠错反馈`,
      ai_alert: `AI调用量异常波动，${randAround(500, 30)}次/分钟`,
    };
    return {
      id: `activity-${i}`,
      type,
      message: messages[type],
      timestamp: Date.now() - i * randAround(1800000, 80),
      ...(type === 'feedback' ? { link: '/admin/content' } : {}),
    };
  });

  const response: DashboardResponse = {
    overview: {
      revenue: { value: todayRevenue, change: revenueChange, yesterdayValue: yesterdayRevenue, label: '今日收入' },
      newUsers: { value: todayUsers, change: yesterdayUsers > 0 ? Math.round(((todayUsers - yesterdayUsers) / yesterdayUsers) * 100) : 100, yesterdayValue: yesterdayUsers, label: '新增用户' },
      conversionRate: { value: Math.round(todayConversion * 100 * 10) / 10, change: convChange, yesterdayValue: Math.round(yesterdayConversion * 100 * 10) / 10, label: '付费转化率' },
      aiCalls: { value: todayAiCalls, change: aiChange, yesterdayValue: yesterdayAiCalls, label: 'AI调用量' },
    },
    revenueTrend,
    serverRealtime: {
      cpuPercent: randAround(45, 30),
      memoryPercent: randAround(62, 20),
      apiRequestsToday: randAround(12800, 15),
      pendingFeedbackCount: randAround(7, 50),
    },
    userFunnel: funnel,
    featureUsage: features,
    activityFeed: activities,
  };

  return NextResponse.json(response);
}
