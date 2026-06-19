import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDb } from '@/lib/server/db';
import type { DashboardResponse, ActivityFeedItem, RegTrendPoint, RegUser } from '@/types/admin';

function dateKey(ts: number): string {
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function monthKey(ts: number): string {
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

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
  // All date boundaries use UTC+8 (Beijing time)
  const nowUtc8 = Date.now() + 8 * 3600000;
  const d = new Date(nowUtc8);
  d.setUTCHours(0, 0, 0, 0);
  const todayStart = d.getTime() - 8 * 3600000; // back to UTC ms
  const yesterdayStart = todayStart - 86400000;
  const yesterdayEnd = todayStart;

  // ── Users ──
  const [[_totalUsersRow], [todayUsersRow], [yesterdayUsersRow]] = await Promise.all([
    db.exec('SELECT COUNT(*) as c FROM users'),
    db.exec(`SELECT COUNT(*) as c FROM users WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM users WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);
  const todayUsers = safeNum(todayUsersRow?.values?.[0]?.[0]);
  const yesterdayUsers = safeNum(yesterdayUsersRow?.values?.[0]?.[0]);

  // ── Page views ──
  const [[todayPvRow], [_yesterdayPvRow], [todayDistinctRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM page_views WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM page_views WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
    db.exec(`SELECT COUNT(DISTINCT COALESCE(user_id, id)) as c FROM page_views WHERE created_at > ${todayStart}`),
  ]);
  const todayPageViews = safeNum(todayPvRow?.values?.[0]?.[0]);
  const todayVisitors = safeNum(todayDistinctRow?.values?.[0]?.[0]);

  // ── AI usage ──
  const [[todayAiRow], [yesterdayAiRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM ai_usage WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM ai_usage WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);
  const todayAiCalls = safeNum(todayAiRow?.values?.[0]?.[0]);
  const yesterdayAiCalls = safeNum(yesterdayAiRow?.values?.[0]?.[0]);

  // ── Study logs ──
  await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM study_logs WHERE created_at > ${todayStart}`),
    db.exec(`SELECT COUNT(*) as c FROM study_logs WHERE created_at BETWEEN ${yesterdayStart} AND ${yesterdayEnd}`),
  ]);

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
    shadowing: { feature: '影子跟读训练', icon: '🎤' },
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

  // ── User Registration Stats: daily last 30 days ──
  const daily30Start = todayStart - 29 * 86400000;
  const dailyRows = await db.exec(
    `SELECT created_at FROM users WHERE created_at >= ${daily30Start} ORDER BY created_at ASC`
  );
  const dailyMap: Record<string, number> = {};
  if (dailyRows.length > 0) {
    for (const row of dailyRows[0].values) {
      const key = dateKey(safeNum(row[0]));
      dailyMap[key] = (dailyMap[key] || 0) + 1;
    }
  }
  const [[beforeDayRow]] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM users WHERE created_at < ${daily30Start}`),
  ]);
  let cumulative = safeNum(beforeDayRow?.values?.[0]?.[0]);
  const dailyTrend: RegTrendPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const key = dateKey(daily30Start + i * 86400000);
    const count = dailyMap[key] || 0;
    cumulative += count;
    dailyTrend.push({ date: key, count, cumulative });
  }

  // ── User Registration Stats: all-time daily ──
  const allDailyRows = await db.exec(
    `SELECT created_at FROM users ORDER BY created_at ASC`
  );
  const allDailyMap: Record<string, number> = {};
  let allDailyFirstTs = 0;
  if (allDailyRows.length > 0) {
    for (const row of allDailyRows[0].values) {
      const ts = safeNum(row[0]);
      if (!allDailyFirstTs) allDailyFirstTs = ts;
      const key = dateKey(ts);
      allDailyMap[key] = (allDailyMap[key] || 0) + 1;
    }
  }
  const allDailyTrend: RegTrendPoint[] = [];
  if (allDailyFirstTs) {
    // Align first day to UTC+8 midnight
    const firstDayUtc8 = new Date(allDailyFirstTs + 8 * 3600000);
    firstDayUtc8.setUTCHours(0, 0, 0, 0);
    const firstDayTs = firstDayUtc8.getTime() - 8 * 3600000;
    const totalDays = Math.floor((todayStart - firstDayTs) / 86400000) + 1;
    let allCumulative = 0;
    for (let i = 0; i < totalDays; i++) {
      const key = dateKey(firstDayTs + i * 86400000);
      const count = allDailyMap[key] || 0;
      allCumulative += count;
      allDailyTrend.push({ date: key, count, cumulative: allCumulative });
    }
  }

  // ── User Registration Stats: monthly ALL time (reuse allDailyRows data) ──
  const monthlyMap: Record<string, number> = {};
  let firstMonthKey = '';
  if (allDailyRows.length > 0) {
    for (const row of allDailyRows[0].values) {
      const key = monthKey(safeNum(row[0]));
      if (!firstMonthKey) firstMonthKey = key;
      monthlyMap[key] = (monthlyMap[key] || 0) + 1;
    }
  }
  // Fill all months from first to current
  const monthlyTrend: RegTrendPoint[] = [];
  if (firstMonthKey) {
    const [fy, fm] = firstMonthKey.split('-').map(Number);
    const nowUtc8Date = new Date(Date.now() + 8 * 3600000);
    const totalMonths = (nowUtc8Date.getUTCFullYear() - fy) * 12 + (nowUtc8Date.getUTCMonth() + 1 - fm) + 1;
    let monthlyCumulative = 0;
    for (let i = 0; i < totalMonths; i++) {
      const d = new Date(Date.UTC(fy, fm - 1 + i, 1));
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
      const count = monthlyMap[key] || 0;
      monthlyCumulative += count;
      monthlyTrend.push({ date: key, count, cumulative: monthlyCumulative });
    }
  }

  // ── Recent users list (last 100) ──
  const usersListRows = await db.exec(
    "SELECT id, username, created_at FROM users ORDER BY created_at DESC LIMIT 100"
  );
  const recentUsersList: RegUser[] = [];
  if (usersListRows.length > 0) {
    for (const row of usersListRows[0].values) {
      recentUsersList.push({
        id: String(row[0]),
        username: String(row[1]),
        createdAt: safeNum(row[2]),
      });
    }
  }

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
      { feature: '影子跟读训练', icon: '🎤', count: 0, totalPercent: 0 },
      { feature: '听写练习', icon: '🎧', count: 0, totalPercent: 0 },
      { feature: 'AI对话', icon: '🤖', count: 0, totalPercent: 0 },
    ],
    activityFeed,
    userRegStats: {
      daily: dailyTrend,
      allDaily: allDailyTrend,
      monthly: monthlyTrend,
      recentUsers: recentUsersList,
    },
  };

  return NextResponse.json(response, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
