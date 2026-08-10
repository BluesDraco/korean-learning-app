// 后台统计查询纯函数：dashboard / revenue 的核心查询逻辑。
// 从 route 抽出，供两处复用：
//   1) /api/admin/*      → requireAdmin 鉴权（本站登录管理员）
//   2) /api/internal/*   → assertInternalCaller 鉴权（兄弟站服务间调用）
// 币种一律用本部署的 DEPLOY_CURRENCY（香港站调用时天然返回 USD 数据）。

import os from 'os';
import { getDb } from '@/lib/server/db';
import { DEPLOY_CURRENCY } from '@/lib/server/membership';
import { TIER_LABELS } from '@/lib/membership-benefits';
import { fetchPeerSite, hasPeerConfigured } from '@/lib/server/internalAuth';
import type { RevenueResponse, OrderRecord, TierRevenue, RevenueInsights, RevenueTrendPoint, DashboardResponse, ActivityFeedItem, RegTrendPoint, RegUser, RegUserDetail, DailyStat, RegistrationsResponse, AdminScope, ScopedDashboardResponse, ScopedRevenueResponse, ScopedRegistrationsResponse } from '@/types/admin';

const ORDER_STATUSES = ['paid', 'pending', 'refunded'] as const;
function isOrderStatus(v: string): v is OrderRecord['status'] {
  return (ORDER_STATUSES as readonly string[]).includes(v);
}
function isTierStr(v: string): boolean {
  return v === 'monthly' || v === 'yearly' || v === 'lifetime';
}
function toOrderType(tier: string): OrderRecord['type'] | null {
  if (tier === 'monthly' || tier === 'yearly') return tier;
  if (tier === 'lifetime') return 'donation';
  return null;
}
function dateKey(ts: number): string {
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export interface RevenueParams {
  [k: string]: unknown;
  page: number;
  pageSize: number;
  type: string;
  statusParam: string;
  exportAll: boolean;
}

export async function computeRevenue(params: RevenueParams): Promise<RevenueResponse> {
  const { page, pageSize, type, statusParam, exportAll } = params;

  const statusFilter = statusParam === 'all' ? null : (isOrderStatus(statusParam) ? statusParam : 'paid');
  const statusWhere = statusFilter ? ` AND o.status = ?` : '';
  const statusParams = statusFilter ? [statusFilter] : [];

  const typeToTiers: Record<string, string[]> = {
    monthly: ['monthly'], yearly: ['yearly'], donation: ['lifetime'],
  };
  const tierFilter = typeToTiers[type];
  const tierWhere = tierFilter ? ` AND o.tier IN (${tierFilter.map(() => '?').join(',')})` : '';

  const db = await getDb();
  const now = Date.now();
  const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0);
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);

  // 汇总（付费 amount>0，限本部署币种——¥ 和 $ 不能相加）
  const sumRow = await db.exec(
    `SELECT
       COALESCE(SUM(CASE WHEN created_at >= ? THEN amount ELSE 0 END), 0),
       COALESCE(SUM(CASE WHEN created_at >= ? THEN amount ELSE 0 END), 0),
       COALESCE(SUM(CASE WHEN created_at >= ? THEN amount ELSE 0 END), 0),
       COALESCE(SUM(amount), 0)
     FROM orders WHERE amount > 0 AND status = 'paid' AND currency = ?`,
    [dayStart.getTime(), weekAgo, monthStart.getTime(), DEPLOY_CURRENCY],
  );
  const s = sumRow[0]?.values[0] ?? [0, 0, 0, 0];
  const summary = {
    today: Number(s[0] ?? 0), thisWeek: Number(s[1] ?? 0),
    thisMonth: Number(s[2] ?? 0), total: Number(s[3] ?? 0),
  };

  const listWhere = `WHERE o.amount > 0${statusWhere}${tierWhere}`;
  const listParams = [...statusParams, ...(tierFilter ?? [])];

  const totalRow = await db.exec(`SELECT COUNT(*) FROM orders o ${listWhere}`, listParams);
  const total = Number(totalRow[0]?.values[0]?.[0] ?? 0);

  const baseSql =
    `SELECT o.id, o.user_id, u.username, o.tier, o.amount, o.created_at, o.status, o.currency
     FROM orders o LEFT JOIN users u ON u.id = o.user_id
     ${listWhere}
     ORDER BY o.created_at DESC`;
  const rows = exportAll
    ? await db.exec(baseSql, listParams)
    : await db.exec(`${baseSql} LIMIT ? OFFSET ?`, [...listParams, pageSize, (page - 1) * pageSize]);

  const orders: OrderRecord[] = (rows[0]?.values ?? []).flatMap((r) => {
    const tierStr = String(r[3]);
    const type2 = toOrderType(tierStr);
    if (!type2 || !isTierStr(tierStr)) return [];
    const st = String(r[6]);
    const cur = String(r[7]) === 'USD' ? 'USD' : 'CNY';
    return [{
      id: r[0] as string,
      userId: r[1] as string,
      username: (r[2] as string) || '(已注销)',
      type: type2,
      tier: tierStr as OrderRecord['tier'],
      amount: Number(r[4] ?? 0),
      currency: cur as OrderRecord['currency'],
      createdAt: Number(r[5] ?? 0),
      status: isOrderStatus(st) ? st : 'paid',
    }];
  });

  // 经营指标 + 档位构成
  const PAID_TIERS: Array<TierRevenue['tier']> = ['monthly', 'yearly', 'lifetime'];
  const tierAggRes = await db.exec(
    `SELECT tier, COUNT(*), COALESCE(SUM(amount),0)
     FROM orders WHERE status='paid' AND amount>0 AND currency=? GROUP BY tier`,
    [DEPLOY_CURRENCY],
  );
  const tierAgg: Record<string, { orderCount: number; revenue: number }> = {};
  for (const r of tierAggRes[0]?.values ?? []) {
    tierAgg[String(r[0])] = { orderCount: Number(r[1] ?? 0), revenue: Number(r[2] ?? 0) };
  }

  const memberRes = await db.exec(
    `SELECT membership_type, COUNT(*)
     FROM users
     WHERE membership_type IN ('monthly','yearly','lifetime')
       AND (membership_type='lifetime' OR (membership_expiry IS NOT NULL AND membership_expiry > ?))
     GROUP BY membership_type`,
    [now],
  );
  const activeByTier: Record<string, number> = {};
  for (const r of memberRes[0]?.values ?? []) activeByTier[String(r[0])] = Number(r[1] ?? 0);

  const totalRevenueCents = PAID_TIERS.reduce((sum, t) => sum + (tierAgg[t]?.revenue ?? 0), 0);
  const totalPaidOrders = PAID_TIERS.reduce((sum, t) => sum + (tierAgg[t]?.orderCount ?? 0), 0);
  const payingUsers = PAID_TIERS.reduce((sum, t) => sum + (activeByTier[t] ?? 0), 0);

  const tierBreakdown: TierRevenue[] = PAID_TIERS.map((t) => {
    const revenue = tierAgg[t]?.revenue ?? 0;
    return {
      tier: t, label: TIER_LABELS[t],
      payingUsers: activeByTier[t] ?? 0,
      orderCount: tierAgg[t]?.orderCount ?? 0,
      revenue,
      revenuePercent: totalRevenueCents > 0 ? Math.round((revenue / totalRevenueCents) * 1000) / 10 : 0,
    };
  });

  const statusAggRes = await db.exec(
    `SELECT status, COUNT(*), COALESCE(SUM(amount),0)
     FROM orders WHERE amount>0 AND currency=? GROUP BY status`,
    [DEPLOY_CURRENCY],
  );
  let refundedCount = 0, refundedAmount = 0, pendingCount = 0;
  for (const r of statusAggRes[0]?.values ?? []) {
    const st = String(r[0]);
    if (st === 'refunded') { refundedCount = Number(r[1] ?? 0); refundedAmount = Number(r[2] ?? 0); }
    else if (st === 'pending') { pendingCount = Number(r[1] ?? 0); }
  }

  const paidPlusRefunded = totalPaidOrders + refundedCount;
  const allOrders = totalPaidOrders + refundedCount + pendingCount;
  const insights: RevenueInsights = {
    payingUsers, totalPaidOrders,
    arpu: totalPaidOrders > 0 ? Math.round(totalRevenueCents / totalPaidOrders) : 0,
    refundedCount, refundedAmount,
    refundRate: paidPlusRefunded > 0 ? Math.round((refundedCount / paidPlusRefunded) * 1000) / 10 : 0,
    pendingCount,
    successRate: allOrders > 0 ? Math.round((totalPaidOrders / allOrders) * 1000) / 10 : 100,
    tierBreakdown,
  };

  const todayStart = dayStart.getTime();
  const trendRows = await db.exec(
    `SELECT tier, amount, created_at FROM orders WHERE status='paid' AND amount>0 AND currency=? AND created_at >= ?`,
    [DEPLOY_CURRENCY, todayStart - 29 * 86400000],
  );
  const trendMap: Record<string, { monthlySub: number; yearlySub: number; donation: number }> = {};
  for (const r of trendRows[0]?.values ?? []) {
    const key = dateKey(Number(r[2] ?? 0));
    const yuan = Number(r[1] ?? 0) / 100;
    const slot = (trendMap[key] ??= { monthlySub: 0, yearlySub: 0, donation: 0 });
    const t = String(r[0]);
    if (t === 'monthly') slot.monthlySub += yuan;
    else if (t === 'yearly') slot.yearlySub += yuan;
    else if (t === 'lifetime') slot.donation += yuan;
  }
  const trend: RevenueTrendPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const key = dateKey(todayStart - (29 - i) * 86400000);
    trend.push({ date: key, ...(trendMap[key] ?? { monthlySub: 0, yearlySub: 0, donation: 0 }) });
  }

  return { summary, summaryCurrency: DEPLOY_CURRENCY, insights, trend, orders, total, page, pageSize };
}

// ── Dashboard 纯函数 ──

function monthKey(ts: number): string {
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}
function safeNum(val: unknown): number { return Number(val) || 0; }
function pctChange(today: number, yesterday: number): number {
  if (yesterday === 0) return today > 0 ? 100 : 0;
  return Math.round(((today - yesterday) / yesterday) * 100);
}

export async function computeDashboard(): Promise<DashboardResponse> {
  const db = await getDb();
  const nowUtc8 = Date.now() + 8 * 3600000;
  const d = new Date(nowUtc8);
  d.setUTCHours(0, 0, 0, 0);
  const todayStart = d.getTime() - 8 * 3600000;
  const yesterdayStart = todayStart - 86400000;
  const yesterdayEnd = todayStart;

  const [[_tu], [todayUsersRow], [yesterdayUsersRow]] = await Promise.all([
    db.exec('SELECT COUNT(*) as c FROM users'),
    db.exec('SELECT COUNT(*) as c FROM users WHERE created_at > ?', [todayStart]),
    db.exec('SELECT COUNT(*) as c FROM users WHERE created_at BETWEEN ? AND ?', [yesterdayStart, yesterdayEnd]),
  ]);
  const todayUsers = safeNum(todayUsersRow?.values?.[0]?.[0]);
  const yesterdayUsers = safeNum(yesterdayUsersRow?.values?.[0]?.[0]);

  const [[todayPvRow], [_ypv], [todayDistinctRow]] = await Promise.all([
    db.exec('SELECT COUNT(*) as c FROM page_views WHERE created_at > ?', [todayStart]),
    db.exec('SELECT COUNT(*) as c FROM page_views WHERE created_at BETWEEN ? AND ?', [yesterdayStart, yesterdayEnd]),
    db.exec('SELECT COUNT(DISTINCT COALESCE(user_id, id)) as c FROM page_views WHERE created_at > ?', [todayStart]),
  ]);
  const todayPageViews = safeNum(todayPvRow?.values?.[0]?.[0]);
  const todayVisitors = safeNum(todayDistinctRow?.values?.[0]?.[0]);

  const [[todayAiRow], [yesterdayAiRow]] = await Promise.all([
    db.exec('SELECT COUNT(*) as c FROM ai_usage WHERE created_at > ?', [todayStart]),
    db.exec('SELECT COUNT(*) as c FROM ai_usage WHERE created_at BETWEEN ? AND ?', [yesterdayStart, yesterdayEnd]),
  ]);
  const todayAiCalls = safeNum(todayAiRow?.values?.[0]?.[0]);
  const yesterdayAiCalls = safeNum(yesterdayAiRow?.values?.[0]?.[0]);

  const pvFeatureRes = await db.exec(
    'SELECT path, COUNT(*) as c FROM page_views WHERE created_at > ? GROUP BY path',
    [todayStart - 7 * 86400000],
  );
  const sectionRules: { prefix: string; feature: string; icon: string }[] = [
    { prefix: '/dictation', feature: '听写练习', featureEn: 'Dictation Practice', icon: '🎧' },
    { prefix: '/diary', feature: '日记', featureEn: 'Diary', icon: '📔' },
    { prefix: '/grammar', feature: '语法', featureEn: 'Grammar', icon: '📐' },
    { prefix: '/vocabulary', feature: '词汇', featureEn: 'Vocabulary', icon: '📖' },
    { prefix: '/reading', feature: '阅读', featureEn: 'reading', icon: '📄' },
    { prefix: '/radio', feature: '电台', featureEn: 'Radio', icon: '📻' },
    { prefix: '/blog', feature: '动物城', featureEn: 'Animal Town', icon: '🐰' },
    { prefix: '/practice', feature: 'AI练习', featureEn: 'AI Practice', icon: '🤖' },
    { prefix: '/phonetics', feature: '发音', featureEn: 'pronunciation', icon: '🔤' },
    { prefix: '/review', feature: '复习', featureEn: 'review', icon: '🔁' },
    { prefix: '/map', feature: '地图', featureEn: 'map', icon: '🗺️' },
    { prefix: '/explore', feature: '探索', featureEn: 'Explore', icon: '🧭' },
    { prefix: '/learning', feature: '学习中心', featureEn: 'Learning Center', icon: '📚' },
    { prefix: '/daily', feature: '今日任务', featureEn: 'Today\'s Tasks', icon: '☀️' },
  ];
  const sectionCounts: Record<string, number> = {};
  let totalSectionViews = 0;
  if (pvFeatureRes.length > 0) {
    for (const row of pvFeatureRes[0].values) {
      const path = String(row[0] || '');
      const count = safeNum(row[1]);
      const rule = sectionRules.find((r) => path === r.prefix || path.startsWith(r.prefix + '/'));
      if (!rule) continue;
      sectionCounts[rule.feature] = (sectionCounts[rule.feature] || 0) + count;
      totalSectionViews += count;
    }
  }
  const seenFeature = new Set<string>();
  const features = sectionRules
    .filter((r) => { if (seenFeature.has(r.feature)) return false; seenFeature.add(r.feature); return true; })
    .map((r) => {
      const count = sectionCounts[r.feature] || 0;
      return { feature: r.feature, icon: r.icon, count, totalPercent: totalSectionViews > 0 ? Math.round((count / totalSectionViews) * 100) : 0 };
    })
    .filter((f) => f.count > 0)
    .sort((a, b) => b.count - a.count);

  const [[feedbackRow]] = await Promise.all([
    db.exec("SELECT COUNT(*) as c FROM feedbacks WHERE status = 'pending'"),
  ]);
  const pendingFeedback = safeNum(feedbackRow?.values?.[0]?.[0]);

  const activities: ActivityFeedItem[] = [];
  const recentFeedbacks = await db.exec("SELECT id, user_id, message, created_at FROM feedbacks ORDER BY created_at DESC LIMIT 5");
  if (recentFeedbacks.length > 0) {
    for (const row of recentFeedbacks[0].values) {
      activities.push({ id: String(row[0]), type: 'feedback', message: `反馈: ${String(row[2] || '').slice(0, 60)}`, timestamp: safeNum(row[3]) });
    }
  }
  const recentUsers = await db.exec("SELECT id, username, created_at FROM users ORDER BY created_at DESC LIMIT 5");
  if (recentUsers.length > 0) {
    for (const row of recentUsers[0].values) {
      activities.push({ id: `reg-${row[0]}`, type: 'register', message: `${String(row[1])} 注册了账号`, timestamp: safeNum(row[2]) });
    }
  }
  activities.sort((a, b) => b.timestamp - a.timestamp);
  const activityFeed = activities.slice(0, 10);

  const [[todayRevRow], [yestRevRow], [todayPaidRow], [todayYearlyRow]] = await Promise.all([
    db.exec("SELECT COALESCE(SUM(amount),0) FROM orders WHERE status='paid' AND amount>0 AND created_at > ?", [todayStart]),
    db.exec("SELECT COALESCE(SUM(amount),0) FROM orders WHERE status='paid' AND amount>0 AND created_at BETWEEN ? AND ?", [yesterdayStart, yesterdayEnd]),
    db.exec("SELECT COUNT(DISTINCT user_id) FROM orders WHERE status='paid' AND amount>0 AND created_at > ?", [todayStart]),
    db.exec("SELECT COUNT(DISTINCT user_id) FROM orders WHERE status='paid' AND amount>0 AND tier='yearly' AND created_at > ?", [todayStart]),
  ]);
  const todayRevenue = safeNum(todayRevRow?.values?.[0]?.[0]);
  const yesterdayRevenue = safeNum(yestRevRow?.values?.[0]?.[0]);
  const todayPaidUsers = safeNum(todayPaidRow?.values?.[0]?.[0]);
  const todayYearlyUsers = safeNum(todayYearlyRow?.values?.[0]?.[0]);
  const todayConversion = todayUsers > 0 ? Math.round((todayPaidUsers / todayUsers) * 1000) / 10 : 0;

  const funnel = {
    visitors: { total: todayVisitors, rate: 100 },
    registered: { total: todayUsers, rate: todayVisitors > 0 ? Math.round((todayUsers / todayVisitors) * 100) : 0 },
    paid: { total: todayPaidUsers, rate: todayUsers > 0 ? Math.round((todayPaidUsers / todayUsers) * 100) : 0 },
    yearly: { total: todayYearlyUsers, rate: todayPaidUsers > 0 ? Math.round((todayYearlyUsers / todayPaidUsers) * 100) : 0 },
  };

  const revTrendRows = await db.exec(
    "SELECT tier, amount, created_at FROM orders WHERE status='paid' AND amount>0 AND created_at >= ?",
    [todayStart - 29 * 86400000],
  );
  const revTrendMap: Record<string, { monthlySub: number; yearlySub: number; donation: number }> = {};
  if (revTrendRows.length > 0) {
    for (const row of revTrendRows[0].values) {
      const key = dateKey(safeNum(row[2]));
      const yuan = safeNum(row[1]) / 100;
      const slot = (revTrendMap[key] ??= { monthlySub: 0, yearlySub: 0, donation: 0 });
      const tier = String(row[0]);
      if (tier === 'monthly') slot.monthlySub += yuan;
      else if (tier === 'yearly') slot.yearlySub += yuan;
      else if (tier === 'lifetime') slot.donation += yuan;
    }
  }
  const revenueTrend: RevenueTrendPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const key = dateKey(todayStart - (29 - i) * 86400000);
    const slot = revTrendMap[key] ?? { monthlySub: 0, yearlySub: 0, donation: 0 };
    revenueTrend.push({ date: key, ...slot });
  }

  const cpuCount = os.cpus().length || 1;
  const load1 = os.loadavg()[0];
  const cpuPercent = Math.min(100, Math.round((load1 / cpuCount) * 100));
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memoryPercent = totalMem > 0 ? Math.round(((totalMem - freeMem) / totalMem) * 100) : 0;

  const daily30Start = todayStart - 29 * 86400000;
  const dailyRows = await db.exec('SELECT created_at FROM users WHERE created_at >= ? ORDER BY created_at ASC', [daily30Start]);
  const dailyMap: Record<string, number> = {};
  if (dailyRows.length > 0) {
    for (const row of dailyRows[0].values) { const key = dateKey(safeNum(row[0])); dailyMap[key] = (dailyMap[key] || 0) + 1; }
  }
  const [[beforeDayRow]] = await Promise.all([db.exec('SELECT COUNT(*) as c FROM users WHERE created_at < ?', [daily30Start])]);
  let cumulative = safeNum(beforeDayRow?.values?.[0]?.[0]);
  const dailyTrend: RegTrendPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const key = dateKey(daily30Start + i * 86400000);
    const count = dailyMap[key] || 0;
    cumulative += count;
    dailyTrend.push({ date: key, count, cumulative });
  }

  const allDailyRows = await db.exec(`SELECT created_at FROM users ORDER BY created_at ASC`);
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

  const monthlyMap: Record<string, number> = {};
  let firstMonthKey = '';
  if (allDailyRows.length > 0) {
    for (const row of allDailyRows[0].values) {
      const key = monthKey(safeNum(row[0]));
      if (!firstMonthKey) firstMonthKey = key;
      monthlyMap[key] = (monthlyMap[key] || 0) + 1;
    }
  }
  const monthlyTrend: RegTrendPoint[] = [];
  if (firstMonthKey) {
    const [fy, fm] = firstMonthKey.split('-').map(Number);
    const nowUtc8Date = new Date(Date.now() + 8 * 3600000);
    const totalMonths = (nowUtc8Date.getUTCFullYear() - fy) * 12 + (nowUtc8Date.getUTCMonth() + 1 - fm) + 1;
    let monthlyCumulative = 0;
    for (let i = 0; i < totalMonths; i++) {
      const dd = new Date(Date.UTC(fy, fm - 1 + i, 1));
      const key = `${dd.getUTCFullYear()}-${String(dd.getUTCMonth() + 1).padStart(2, '0')}`;
      const count = monthlyMap[key] || 0;
      monthlyCumulative += count;
      monthlyTrend.push({ date: key, count, cumulative: monthlyCumulative });
    }
  }

  // 每日登录用户（新+老）：page_views 中 user_id 非空的去重人数。
  // 按 UTC+8 日界在 SQL 侧聚合（created_at 为毫秒；/1000 取秒 +28800 秒偏移），只返回≤30行。
  const loginRows = await db.exec(
    `SELECT date((created_at/1000)+28800, 'unixepoch') AS day, COUNT(DISTINCT user_id) AS c
     FROM page_views WHERE user_id IS NOT NULL AND created_at >= ?
     GROUP BY day`,
    [daily30Start],
  );
  const loginByDay: Record<string, number> = {};
  for (const row of loginRows[0]?.values ?? []) {
    loginByDay[String(row[0])] = safeNum(row[1]);
  }
  const dailyLogins: { date: string; count: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const key = dateKey(daily30Start + i * 86400000);
    dailyLogins.push({ date: key, count: loginByDay[key] ?? 0 });
  }
  const todayLogins = loginByDay[dateKey(todayStart)] ?? 0;
  const yesterdayLogins = loginByDay[dateKey(yesterdayStart)] ?? 0;

  const usersListRows = await db.exec("SELECT id, username, created_at FROM users ORDER BY created_at DESC LIMIT 100");
  const recentUsersList: RegUser[] = [];
  if (usersListRows.length > 0) {
    for (const row of usersListRows[0].values) {
      recentUsersList.push({ id: String(row[0]), username: String(row[1]), createdAt: safeNum(row[2]) });
    }
  }

  return {
    overview: {
      revenue: { value: todayRevenue / 100, change: pctChange(todayRevenue, yesterdayRevenue), yesterdayValue: yesterdayRevenue / 100, label: '今日收入', labelEn: 'Today\'s Revenue' },
      newUsers: { value: todayUsers, change: pctChange(todayUsers, yesterdayUsers), yesterdayValue: yesterdayUsers, label: '新增用户', labelEn: 'New Users' },
      conversionRate: { value: todayConversion, change: 0, yesterdayValue: 0, label: '付费转化率', labelEn: 'Paid Conversion Rate' },
      aiCalls: { value: todayAiCalls, change: pctChange(todayAiCalls, yesterdayAiCalls), yesterdayValue: yesterdayAiCalls, label: 'AI调用量', labelEn: 'AI Calls' },
    },
    revenueTrend,
    serverRealtime: { cpuPercent, memoryPercent, apiRequestsToday: todayPageViews, pendingFeedbackCount: pendingFeedback },
    userFunnel: funnel,
    featureUsage: features,
    activityFeed,
    userRegStats: { daily: dailyTrend, allDaily: allDailyTrend, monthly: monthlyTrend, recentUsers: recentUsersList, dailyLogins, todayLogins, yesterdayLogins },
    currency: DEPLOY_CURRENCY,
  };
}

// ── scope 聚合（只上海站用）──
// domestic：只本地；overseas：只调香港；combined：本地 + 香港并列。
// 香港不可达时降级：combined 退回只本地 + peerError；overseas 直接 peerError（peer=null）。

export async function scopedDashboard(scope: AdminScope): Promise<ScopedDashboardResponse> {
  if (scope === 'domestic') {
    return { scope, self: await computeDashboard(), peer: null };
  }
  if (!hasPeerConfigured()) {
    return { scope, self: await computeDashboard(), peer: null, peerError: '海外站未配置（PEER_SITE_URL / INTERNAL_API_SECRET）', peerErrorEn: 'Overseas site not configured (PEER_SITE_URL / INTERNAL_API_SECRET)' };
  }
  // 本地查询与跨站请求无依赖，并行以省一个往返延迟
  const [self, peerResult] = await Promise.all([
    computeDashboard(),
    fetchPeerSite<DashboardResponse>('/api/internal/stats/dashboard').then(
      (peer) => ({ ok: true as const, peer }),
      () => ({ ok: false as const, peer: null }),
    ),
  ]);
  return peerResult.ok
    ? { scope, self, peer: peerResult.peer }
    : { scope, self, peer: null, peerError: '海外站数据获取失败', peerErrorEn: 'Failed to fetch data from overseas site' };
}

export async function scopedRevenue(scope: AdminScope, params: RevenueParams): Promise<ScopedRevenueResponse> {
  if (scope === 'domestic') {
    return { scope, self: await computeRevenue(params), peer: null };
  }
  if (!hasPeerConfigured()) {
    return { scope, self: await computeRevenue(params), peer: null, peerError: '海外站未配置（PEER_SITE_URL / INTERNAL_API_SECRET）', peerErrorEn: 'Overseas site not configured (PEER_SITE_URL / INTERNAL_API_SECRET)' };
  }
  const qs = `?page=${params.page}&pageSize=${params.pageSize}&type=${encodeURIComponent(params.type)}&status=${encodeURIComponent(params.statusParam)}${params.exportAll ? '&export=1' : ''}`;
  const [self, peerResult] = await Promise.all([
    computeRevenue(params),
    fetchPeerSite<RevenueResponse>(`/api/internal/stats/revenue${qs}`).then(
      (peer) => ({ ok: true as const, peer }),
      () => ({ ok: false as const, peer: null }),
    ),
  ]);
  return peerResult.ok
    ? { scope, self, peer: peerResult.peer }
    : { scope, self, peer: null, peerError: '海外站数据获取失败', peerErrorEn: 'Failed to fetch data from overseas site' };
}

// ── Registration analysis ──

export interface RegParams {
  [k: string]: unknown;
  limit: number;
  offset: number;
  search: string;
}

export async function computeRegistrations(params: RegParams): Promise<RegistrationsResponse> {
  const { limit, offset, search } = params;
  const db = await getDb();

  const whereSql = search ? 'WHERE username LIKE ? OR nickname LIKE ? OR email LIKE ?' : '';
  const whereArgs = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

  const [countRes, usersRes, dailyRes] = await Promise.all([
    db.exec(`SELECT COUNT(*) as c FROM users ${whereSql}`, whereArgs),
    db.exec(
      `SELECT id, username, nickname, email, created_at, last_login_at
       FROM users ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...whereArgs, limit, offset],
    ),
    db.exec(
      `SELECT DATE((created_at/1000) + 28800, 'unixepoch') as d, COUNT(*) as c
       FROM users GROUP BY d ORDER BY d DESC`,
    ),
  ]);

  const total = Number(countRes[0]?.values?.[0]?.[0] ?? 0);

  const users: RegUserDetail[] = (usersRes[0]?.values ?? []).map((row) => ({
    id: row[0] as string,
    username: row[1] as string,
    nickname: (row[2] as string) || '',
    email: (row[3] as string) || '',
    createdAt: row[4] as number,
    lastLoginAt: (row[5] as number | null) ?? null,
  }));

  const dailyStats: DailyStat[] = (dailyRes[0]?.values ?? []).map((row) => ({
    date: String(row[0]),
    count: Number(row[1]),
  }));

  return { users, dailyStats, total, limit, offset };
}

export async function scopedRegistrations(scope: AdminScope, params: RegParams): Promise<ScopedRegistrationsResponse> {
  if (scope === 'domestic') {
    return { scope, self: await computeRegistrations(params), peer: null };
  }
  if (!hasPeerConfigured()) {
    return { scope, self: await computeRegistrations(params), peer: null, peerError: '海外站未配置（PEER_SITE_URL / INTERNAL_API_SECRET）', peerErrorEn: 'Overseas site not configured (PEER_SITE_URL / INTERNAL_API_SECRET)' };
  }
  const qs = `?limit=${params.limit}&offset=${params.offset}&search=${encodeURIComponent(params.search)}`;
  const [self, peerResult] = await Promise.all([
    computeRegistrations(params),
    fetchPeerSite<RegistrationsResponse>(`/api/internal/stats/registrations${qs}`).then(
      (peer) => ({ ok: true as const, peer }),
      () => ({ ok: false as const, peer: null }),
    ),
  ]);
  return peerResult.ok
    ? { scope, self, peer: peerResult.peer }
    : { scope, self, peer: null, peerError: '海外站数据获取失败', peerErrorEn: 'Failed to fetch data from overseas site' };
}
