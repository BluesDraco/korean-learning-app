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

// ── Dashboard Response ──
export interface DashboardResponse {
  overview: DashboardOverview;
  revenueTrend: RevenueTrendPoint[];
  serverRealtime: ServerRealtime;
  userFunnel: UserFunnel;
  featureUsage: FeatureUsage[];
  activityFeed: ActivityFeedItem[];
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
  amount: number;
  createdAt: number;
  status: 'paid' | 'refunded' | 'pending';
}

export interface RevenueResponse {
  summary: RevenueSummary;
  orders: OrderRecord[];
  total: number;
  page: number;
  pageSize: number;
}

// ===== Users =====

export interface AdminUser {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: string;
  membershipType: 'free' | 'monthly' | 'yearly';
  membershipExpiry: number | null;
  studyDays: number;
  totalXp: number;
  wordsLearned: number;
  sentencesCount: number;
  recordingsCount: number;
  kpopCount: number;
  diaryCount: number;
  createdAt: number;
  banned: boolean;
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
  role: string;
  createdAt: number;
  membershipType: 'free' | 'monthly' | 'yearly';
  membershipExpiry: number | null;
  banned: boolean;
  totalStudyDays: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  wordsLearned: number;
  wordsReviewed: number;
  dictationsDone: number;
  shadowingDone: number;
  totalMinutesStudied: number;
  dailyStudyMinutes: { date: string; minutes: number }[];
  featureStats: { feature: string; icon: string; count: number }[];
  adminNote: string;
  activityLog: { action: string; timestamp: number; detail: string }[];
}

export interface UpdateUserBody {
  membershipType?: 'free' | 'monthly' | 'yearly';
  membershipExpiry?: number | null;
  banned?: boolean;
  adminNote?: string;
}

// ===== Content =====

export interface ContentModuleStats {
  module: string;
  icon: string;
  totalItems: number;
  lastUpdated: number;
}

export interface FeedbackItem {
  id: string;
  userId: string;
  username: string;
  type: 'word_error' | 'translation_error' | 'audio_error' | 'other';
  content: string;
  targetEntryId?: string;
  targetEntryName?: string;
  status: 'pending' | 'resolved' | 'ignored';
  createdAt: number;
  resolvedAt?: number;
  resolvedBy?: string;
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

// ===== System =====

export interface CpuMemoryPoint {
  time: string;
  cpuPercent: number;
  memoryPercent: number;
}

export interface ErrorLogEntry {
  id: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  source: 'api' | 'ai' | 'db' | 'auth';
  timestamp: number;
  stack?: string;
}

export interface AiUsageStats {
  totalCallsThisMonth: number;
  totalTokensThisMonth: number;
  totalCostThisMonth: number;
  dailyCalls: { date: string; calls: number; tokens: number }[];
}

export interface HighUsageUser {
  userId: string;
  username: string;
  totalCalls: number;
  totalTokens: number;
  estimatedCost: number;
  membershipType: 'free' | 'monthly' | 'yearly';
}

export interface SystemResponse {
  cpuMemoryHistory: CpuMemoryPoint[];
  errorLogs: ErrorLogEntry[];
  aiUsage: AiUsageStats;
  topUsers: HighUsageUser[];
}
