import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { DashboardResponse, ActivityFeedItem } from '@/types/admin';

function safeNum(val: unknown): number {
  return Number(val) || 0;
}

function pctChange(today: number, yesterday: number): number {
  if (yesterday === 0) return today > 0 ? 100 : 0;
  return Math.round(((today - yesterday) / yesterday) * 100);
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const db = await getDb();
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const yesterdayStart = todayStart - 86400000;
  const yesterdayEnd = todayStart;

  // ── Users ──
  const [[totalUsersRow], [todayUsersRow], [yesterdayUsersRow]] = await Promise.all([
    db.exec('SELECT COUNT(*) as c FROM users'),
    db.exec(`SELECT COUNT(*) as c FROM users WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM users WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);
  const totalUsers = safeNum(totalUsersRow?.values?.[0]?.[0]);
  const todayUsers = safeNum(todayUsersRow?.values?.[0]?.[0]);
  const yesterdayUsers = safeNum(yesterdayUsersRow?.values?.[0]?.[0]);

  // ── Page views ──
  const [[todayPvRow], [yesterdayPvRow], [todayDistinctRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM page_views WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM page_views WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
    db.exec(`SELECT COUNT(DISTINCT COALESCE(user_id, id)) as c FROM page_views WHERE created_at > ${todayStart}`),
  ]);
  const todayPageViews = safeNum(todayPvRow?.values?.[0]?.[0]);
  const yesterdayPageViews = safeNum(yesterdayPvRow?.values?.[0]?.[0]);
  const todayVisitors = safeNum(todayDistinctRow?.values?.[0]?.[0]);

  // ── AI usage ──
  const [[todayAiRow], [yesterdayAiRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM ai_usage WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM ai_usage WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);
  const todayAiCalls = safeNum(todayAiRow?.values?.[0]?.[0]);
  const yesterdayAiCalls = safeNum(yesterdayAiRow?.values?.[0]?.[0]);

  // ── Study logs ──
  const [[todayStudyRow], [yesterdayStudyRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM study_logs WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM study_logs WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);
  const todayStudyCount = safeNum(todayStudyRow?.values?.[0]?.[0]);

  // ── Feature usage from study_logs ──
  const featureResults = await db.exec(
    `SELECT action, COUNT(*) as c FROM study_logs WHERE created_at > ${todayStart - 7 * 86400000} GROUP BY action ORDER BY c DESC`
  );
  const featureMap: Record<string, number> = {};
  let totalActions = 0;
  if (featureResults.length > 0) {
    for (const row of featureResults[0].values) {
      const action = String(row[0]);
      const count = safeNum(row[1]);
      featureMap[action] = count;
      totalActions += count;
    }
  }

  const actionToFeature: Record<string, { feature: string; icon: string }> = {
    srs_review: { feature: '单词复习', icon: '📝' },
    shadowing: { feature: '跟读训练', icon: '🎤' },
    dictation: { feature: '听写练习', icon: '🎧' },
    ai_chat: { feature: 'AI对话', icon: '🤖' },
    flashcard: { feature: '闪卡学习', icon: '🃏' },
    theme_study: { feature: '主题词包', icon: '📦' },
    video_study: { feature: '视频学习', icon: '🎬' },
    level_study: { feature: '分级词表', icon: '📊' },
    dict_lookup: { feature: '情景词典', icon: '🔍' },
    achievement: { feature: '成就系统', icon: '🏆' },
    learn_word: { feature: '学习新词', icon: '📖' },
    grammar: { feature: '语法学习', icon: '📐' },
  };

  const features = Object.entries(actionToFeature).map(([action, meta]) => {
    const count = featureMap[action] || 0;
    return {
      feature: meta.feature,
      icon: meta.icon,
      count,
      totalPercent: totalActions > 0 ? Math.round((count / totalActions) * 100) : 0,
    };
  }).sort((a, b) => b.count - a.count);

  // ── Feedback pending ──
  const [[feedbackRow]] = await Promise.all([
    db.exec("SELECT COUNT(*) as c FROM feedbacks WHERE status = 'pending'"),
  ]);
  const pendingFeedback = safeNum(feedbackRow?.values?.[0]?.[0]);

  // ── Activity feed ──
  const activities: ActivityFeedItem[] = [];

  const recentFeedbacks = await db.exec(
    "SELECT id, user_id, message, created_at FROM feedbacks ORDER BY created_at DESC LIMIT 5"
  );
  if (recentFeedbacks.length > 0) {
    for (const row of recentFeedbacks[0].values) {
      activities.push({
        id: String(row[0]),
        type: 'feedback',
        message: `反馈: ${String(row[2] || '').slice(0, 60)}`,
        timestamp: safeNum(row[3]),
      });
    }
  }

  const recentUsers = await db.exec(
    "SELECT id, username, created_at FROM users ORDER BY created_at DESC LIMIT 5"
  );
  if (recentUsers.length > 0) {
    for (const row of recentUsers[0].values) {
      activities.push({
        id: `reg-${row[0]}`,
        type: 'register',
        message: `${String(row[1])} 注册了账号`,
        timestamp: safeNum(row[2]),
      });
    }
  }

  // Sort activity feed by time desc, limit to 10
  activities.sort((a, b) => b.timestamp - a.timestamp);
  const activityFeed = activities.slice(0, 10);

  // ── Revenue: no payment system ──
  const todayRevenue = 0;
  const yesterdayRevenue = 0;

  // ── Funnel ──
  const funnel = {
    visitors: { total: todayVisitors, rate: 100 },
    registered: { total: todayUsers, rate: todayVisitors > 0 ? Math.round((todayUsers / todayVisitors) * 100) : 0 },
    paid: { total: 0, rate: 0 },
    yearly: { total: 0, rate: 0 },
  };

  const response: DashboardResponse = {
    overview: {
      revenue: { value: todayRevenue, change: 0, yesterdayValue: yesterdayRevenue, label: '今日收入' },
      newUsers: { value: todayUsers, change: pctChange(todayUsers, yesterdayUsers), yesterdayValue: yesterdayUsers, label: '新增用户' },
      conversionRate: { value: 0, change: 0, yesterdayValue: 0, label: '付费转化率' },
      aiCalls: { value: todayAiCalls, change: pctChange(todayAiCalls, yesterdayAiCalls), yesterdayValue: yesterdayAiCalls, label: 'AI调用量' },
    },
    revenueTrend: [],
    serverRealtime: {
      cpuPercent: 0,
      memoryPercent: 0,
      apiRequestsToday: todayPageViews,
      pendingFeedbackCount: pendingFeedback,
    },
    userFunnel: funnel,
    featureUsage: features.length > 0 ? features : [
      { feature: '单词复习', icon: '📝', count: 0, totalPercent: 0 },
      { feature: '跟读训练', icon: '🎤', count: 0, totalPercent: 0 },
      { feature: '听写练习', icon: '🎧', count: 0, totalPercent: 0 },
      { feature: 'AI对话', icon: '🤖', count: 0, totalPercent: 0 },
    ],
    activityFeed,
  };

  return NextResponse.json(response, {
    headers: { 'Cache-Control': 'public, max-age=30' },
  });
}
