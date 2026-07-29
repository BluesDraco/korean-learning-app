// ===== 三视图 scope（国内/海外/综合）=====
// 只上海站有此能力：domestic=本地库；overseas=调香港内部接口；combined=两站并列。
export type AdminScope = 'domestic' | 'overseas' | 'combined';

// ===== Admin Dashboard Types =====

// ── Metric Cards ──
export interface MetricCard {
  value: number;
  change: number;          // percentage, positive = up
  yesterdayValue: number;
  label: string;
}

export interface DashboardOverview {
  revenue: MetricCard;
  newUsers: MetricCard;
  conversionRate: MetricCard;
  aiCalls: MetricCard;
}

// ── Revenue Trend ──
export type TrendGranularity = 'day' | 'week' | 'month';

export interface RevenueTrendPoint {
  date: string;
  monthlySub: number;
  yearlySub: number;
  donation: number;
}

// ── Server Realtime ──
export interface ServerRealtime {
  cpuPercent: number;
  memoryPercent: number;
  apiRequestsToday: number;
  pendingFeedbackCount: number;
}

// ── User Funnel ──
export interface FunnelStage {
  total: number;
  rate: number;            // percent of previous stage
}

export interface UserFunnel {
  visitors: FunnelStage;
  registered: FunnelStage;
  paid: FunnelStage;
  yearly: FunnelStage;
}

// ── Feature Usage ──
export interface FeatureUsage {
  feature: string;
  icon: string;
  count: number;
  totalPercent: number;
}

// ── Activity Feed ──
export type ActivityType = 'register' | 'payment' | 'feedback' | 'ai_alert';

export interface ActivityFeedItem {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: number;
  link?: string;
}

// ── User Registration Stats ──
export interface RegTrendPoint {
  date: string;
  count: number;
  cumulative: number;
}

export interface RegUser {
  id: string;
  username: string;
  createdAt: number;
}

// 注册分析页：用户明细（比 RegUser 多字段）
export interface RegUserDetail {
  id: string;
  username: string;
  nickname: string;
  email: string;
  createdAt: number;
  lastLoginAt: number | null;
  source?: 'domestic' | 'overseas'; // combined 模式下标记来源；单站模式由 API 层按 scope 填入
}

export interface DailyStat {
  date: string; // YYYY-MM-DD (UTC+8)
  count: number;
}

export interface RegistrationsResponse {
  users: RegUserDetail[];
  dailyStats: DailyStat[];
  total: number;
  limit: number;
  offset: number;
}

export interface ScopedRegistrationsResponse {
  scope: AdminScope;
  self: RegistrationsResponse;
  peer: RegistrationsResponse | null;
  peerError?: string;
}

// 每日登录去重人数（含新增+老用户），来自 page_views 中 user_id 非空的去重
export interface DailyCountPoint {
  date: string;
  count: number;
}

export interface UserRegStats {
  daily: RegTrendPoint[];
  allDaily: RegTrendPoint[];
  monthly: RegTrendPoint[];
  recentUsers: RegUser[];
  dailyLogins: DailyCountPoint[]; // 近30天每日登录用户数
  todayLogins: number;
  yesterdayLogins: number;
}

// ── Dashboard Response ──
export interface DashboardResponse {
  overview: DashboardOverview;
  revenueTrend: RevenueTrendPoint[];
  serverRealtime: ServerRealtime;
  userFunnel: UserFunnel;
  featureUsage: FeatureUsage[];
  activityFeed: ActivityFeedItem[];
  userRegStats: UserRegStats;
  currency: 'CNY' | 'USD'; // 该份数据来自哪个部署（收入相关的币种）
}

// scope 包装：domestic/overseas 时只有 self；combined 时带对方分段 + 可能的降级提示。
export interface ScopedDashboardResponse {
  scope: AdminScope;
  self: DashboardResponse;
  peer: DashboardResponse | null; // combined 时的对方站；overseas/domestic 为 null
  peerError?: string;             // 对方站不可达时的降级提示
}

// ===== Revenue =====

export interface RevenueSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
}

export interface OrderRecord {
  id: string;
  userId: string;
  username: string;
  type: 'monthly' | 'yearly' | 'donation';
  tier: 'monthly' | 'yearly' | 'lifetime'; // 原始档位（补单开会员用）
  amount: number;
  currency: 'CNY' | 'USD'; // 该笔订单币种（按订单显示符号，不靠全局环境变量）
  createdAt: number;
  status: 'paid' | 'refunded' | 'pending';
}

// 各档位收入构成（amount 单位=分）
export interface TierRevenue {
  tier: 'monthly' | 'yearly' | 'lifetime';
  label: string;
  payingUsers: number;   // 当前有效付费人数
  orderCount: number;    // 累计已付订单数
  revenue: number;       // 累计收入（分）
  revenuePercent: number; // 收入占比（%）
}

// 经营指标 + 掉单/退款监控
export interface RevenueInsights {
  payingUsers: number;      // 当前有效付费用户总数
  totalPaidOrders: number;  // 累计已付订单数
  arpu: number;             // 客单价（分）= 累计收入 / 已付订单数
  refundedCount: number;    // 退款订单数
  refundedAmount: number;   // 退款总额（分）
  refundRate: number;       // 退款率（%）= 退款数 /（已付+退款）
  pendingCount: number;     // 待支付（掉单嫌疑）订单数
  successRate: number;      // 支付成功率（%）= 已付 /（已付+待支付+退款）
  tierBreakdown: TierRevenue[];
}

export interface RevenueResponse {
  summary: RevenueSummary;
  summaryCurrency: 'CNY' | 'USD'; // 汇总/趋势/客单价的币种（本部署币种；跨币种不相加）
  insights: RevenueInsights;
  trend: RevenueTrendPoint[]; // 近 30 天收入（元），复用 dashboard 的点结构
  orders: OrderRecord[];
  total: number;
  page: number;
  pageSize: number;
}

// scope 包装：domestic/overseas 时只有 self；combined 时带对方分段（¥/$ 分开列，绝不相加）。
export interface ScopedRevenueResponse {
  scope: AdminScope;
  self: RevenueResponse;
  peer: RevenueResponse | null;
  peerError?: string;
}

// 收入中心订单操作：退款 / 补单
export interface OrderActionBody {
  orderId: string;
  action: 'refund' | 'mark_paid';
}

// ===== Users =====

export interface AdminUser {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: string;
  membershipType: 'free' | 'monthly' | 'yearly' | 'lifetime';
  membershipExpiry: number | null;
  studyDays: number;
  totalXp: number;
  wordsLearned: number;
  sentencesCount: number;
  recordingsCount: number;
  kpopCount: number;
  diaryCount: number;
  createdAt: number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
}

// ===== User Detail =====

export interface UserDetail {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  status: 'active' | 'banned' | 'deleted';
  role: string;
  createdAt: number;
  membershipType: 'free' | 'monthly' | 'yearly' | 'lifetime';
  membershipExpiry: number | null;
  totalStudyDays: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  wordsLearned: number;
  featureStats: { feature: string; icon: string; count: number }[];
  activityLog: { action: string; timestamp: number; detail: string }[];
  subscription?: { status: string; cancelAtPeriodEnd: boolean; currentPeriodEnd: number | null } | null;
}

export interface UpdateUserBody {
  membershipType?: 'free' | 'monthly' | 'yearly' | 'lifetime';
  membershipExpiry?: number | null;
  role?: 'user' | 'admin';
  status?: 'active' | 'banned';
  newPassword?: string;
  email?: string;
  phone?: string;
}

// ===== Content =====

export interface ContentModuleStats {
  module: string;
  icon: string;
  totalItems: number;
}

export interface FeedbackItem {
  id: string;
  userId: string;
  username: string;
  type: 'content_error' | 'bug' | 'suggestion' | 'word_error' | 'translation_error' | 'audio_error' | 'other';
  content: string;
  path: string;
  status: 'pending' | 'resolved' | 'ignored';
  createdAt: number;
}

export interface ContentResponse {
  moduleStats: ContentModuleStats[];
  feedbacks: FeedbackItem[];
  total: number;
}

export interface ResolveFeedbackBody {
  status: 'resolved' | 'ignored';
  note?: string;
}

// ===== Ambassadors =====

export interface AmbassadorEntry {
  userId: string;
  username: string;
  nickname: string;
  level: number;
  xp: number;
  longestStreak: number;
  ambassadorSince: number | null;
  ambassadorReason: string;
}

export interface AmbassadorCandidate {
  userId: string;
  username: string;
  nickname: string;
  level: number;
  xp: number;
  longestStreak: number;
}

export interface AmbassadorsResponse {
  ambassadors: AmbassadorEntry[];
  candidates: AmbassadorCandidate[];
}

export interface AmbassadorActionBody {
  userId: string;
  action: 'grant' | 'revoke';
}

// ===== System =====

export interface AiUsageStats {
  totalCallsThisMonth: number;
  dailyCalls: { date: string; calls: number }[];
}

export interface HighUsageUser {
  userId: string;
  username: string;
  totalCalls: number;
  membershipType: 'free' | 'monthly' | 'yearly' | 'lifetime';
}

export interface SystemResponse {
  aiUsage: AiUsageStats;
  topUsers: HighUsageUser[];
}

// ===== Error Logs =====

export interface ErrorLogItem {
  id: string;
  level: 'error' | 'warn' | 'critical';
  source: string;
  message: string;
  detail: string;
  userId: string;
  createdAt: number;
}

export interface ErrorLogsResponse {
  logs: ErrorLogItem[];
  total: number;
  page: number;
  pageSize: number;
  last24h: Record<string, number>;
}

// ===== Invite Campaign Config =====

export interface CampaignTierCfg { count: number; days: number }
export interface CampaignConfigDTO { enabled: boolean; tiers: CampaignTierCfg[]; cap: number }

// ===== Invite Fraud Monitor =====

export interface FraudIpGroup {
  ip: string;
  count: number;       // 该 IP 下邀请条数
  inviters: number;    // 涉及的不同邀请人数
  qualified: number;   // 其中已合格数
}

export interface InviteFraudResponse {
  threshold: number;
  groups: FraudIpGroup[];
}
