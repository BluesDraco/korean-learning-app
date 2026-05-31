'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { DashboardResponse, TrendGranularity, ActivityFeedItem, FeatureUsage, UserFunnel, ServerRealtime, RevenueTrendPoint, MetricCard } from '@/types/admin';
import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Server, Cpu, HardDrive, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MetricCardView({ card, prefix = '', suffix = '' }: { card: MetricCard; prefix?: string; suffix?: string }) {
  const isUp = card.change >= 0;
  const isPercent = card.label.includes('率');
  const sfx = suffix || (isPercent ? '%' : '');
  const formatVal = (v: number) => typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(1) : v;
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <p className="text-sm text-[var(--text-muted)] mb-2">{card.label}</p>
      <p className="text-3xl font-extrabold text-[var(--text-primary)]">
        {prefix}{formatVal(card.value)}{sfx}
      </p>
      <div className="flex items-center gap-1 mt-2">
        {isUp ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingDown size={14} className="text-red-400" />
        )}
        <span className={`text-xs font-semibold ${isUp ? 'text-emerald-500' : 'text-red-400'}`}>
          {isUp ? '+' : ''}{card.change}%
        </span>
        <span className="text-xs text-[var(--text-muted)] ml-1">vs 昨日 {formatVal(card.yesterdayValue)}{sfx}</span>
      </div>
    </div>
  );
}

function RevenueTrend({ data, granularity, setGranularity }: { data: RevenueTrendPoint[]; granularity: TrendGranularity; setGranularity: (g: TrendGranularity) => void }) {
  const tabs: { key: TrendGranularity; label: string }[] = [
    { key: 'day', label: '日' },
    { key: 'week', label: '周' },
    { key: 'month', label: '月' },
  ];

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">30天收入趋势</h3>
        <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setGranularity(t.key)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                granularity === t.key ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E6E0" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} tickFormatter={(v) => String(v).slice(5)} />
          <YAxis tick={{ fontSize: 10, fill: '#999' }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #F5E6E0', fontSize: 12 }}
          />
          <Line type="monotone" dataKey="monthlySub" name="月付" stroke="#FF8FAB" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="yearlySub" name="年付" stroke="#A78BFA" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="donation" name="打赏" stroke="#FBBF24" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ServerStatus({ realtime }: { realtime: ServerRealtime }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">实时服务器状态</h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu size={14} className="text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)]">CPU</span>
            <span className="text-xs font-semibold text-[var(--text-primary)] ml-auto">{realtime.cpuPercent}%</span>
          </div>
          <div className="h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${realtime.cpuPercent}%`, background: realtime.cpuPercent > 80 ? '#EF4444' : realtime.cpuPercent > 60 ? '#F59E0B' : '#34D399' }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HardDrive size={14} className="text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)]">内存</span>
            <span className="text-xs font-semibold text-[var(--text-primary)] ml-auto">{realtime.memoryPercent}%</span>
          </div>
          <div className="h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${realtime.memoryPercent}%`, background: realtime.memoryPercent > 80 ? '#EF4444' : realtime.memoryPercent > 60 ? '#F59E0B' : '#34D399' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Server size={14} className="text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)]">今日API请求</span>
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">{realtime.apiRequestsToday.toLocaleString()}</span>
        </div>

        <Link
          href="/admin/content?feedbackStatus=pending"
          className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] hover:bg-[var(--bg-soft)] -mx-2 px-2 py-1 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-xs text-[var(--text-muted)]">待处理纠错</span>
          </div>
          <span className="text-sm font-bold text-amber-500">{realtime.pendingFeedbackCount}</span>
        </Link>
      </div>
    </div>
  );
}

function Funnel({ funnel }: { funnel: UserFunnel }) {
  const stages = [
    { label: '访客', ...funnel.visitors },
    { label: '注册', ...funnel.registered },
    { label: '付费', ...funnel.paid },
    { label: '年付', ...funnel.yearly },
  ];

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">今日用户漏斗</h3>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
              <span className="text-xs font-semibold text-[var(--text-primary)]">{s.total.toLocaleString()}</span>
            </div>
            <div className="h-4 bg-[var(--bg-input)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, s.rate)}%`,
                  background: ['#FF8FAB', '#A78BFA', '#34D399', '#FBBF24'][i],
                  opacity: 0.8,
                }}
              />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.rate}% 转化</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureRanking({ features }: { features: FeatureUsage[] }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">功能使用热度</h3>
      <div className="space-y-3">
        {features.map((f) => (
          <div key={f.feature}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-secondary)]">{f.icon} {f.feature}</span>
              <span className="text-xs text-[var(--text-muted)]">{f.count.toLocaleString()}次</span>
            </div>
            <div className="h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${f.totalPercent}%`, background: 'linear-gradient(90deg, #FF8FAB, #FFB8C9)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed({ activities }: { activities: ActivityFeedItem[] }) {
  const typeConfig: Record<string, { color: string; bg: string }> = {
    register: { color: '#34D399', bg: '#ECFDF5' },
    payment: { color: '#A78BFA', bg: '#F5F3FF' },
    feedback: { color: '#FBBF24', bg: '#FFFBEB' },
    ai_alert: { color: '#F87171', bg: '#FEF2F2' },
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">最近动态</h3>
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {activities.map((a) => {
          const config = typeConfig[a.type];
          return (
            <div key={a.id} className="flex items-start gap-2.5">
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: config.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--text-secondary)]">{a.message}</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  {new Date(a.timestamp).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {a.link && (
                <Link href={a.link} className="text-[10px] text-[var(--pink-primary)] hover:underline shrink-0 mt-0.5">
                  查看
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, loading } = useAdminData<DashboardResponse>('/api/admin/dashboard');
  const [granularity, setGranularity] = useState<TrendGranularity>('day');

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tori header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">仪表盘</h1>
          <p className="text-sm text-[var(--text-muted)]">今天的数据都在这里，토리帮你看着</p>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardView card={data.overview.revenue} prefix="¥" />
        <MetricCardView card={data.overview.newUsers} />
        <MetricCardView card={data.overview.conversionRate} />
        <MetricCardView card={data.overview.aiCalls} />
      </div>

      {/* Middle: Revenue trend + Server status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RevenueTrend data={data.revenueTrend} granularity={granularity} setGranularity={setGranularity} />
        </div>
        <div className="lg:col-span-2">
          <ServerStatus realtime={data.serverRealtime} />
        </div>
      </div>

      {/* Bottom: Funnel + Features + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Funnel funnel={data.userFunnel} />
        <FeatureRanking features={data.featureUsage} />
        <ActivityFeed activities={data.activityFeed} />
      </div>
    </div>
  );
}
