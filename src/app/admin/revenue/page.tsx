'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { ScopedRevenueResponse, RevenueResponse, OrderRecord, AdminScope } from '@/types/admin';
import { useState } from 'react';
import { Download, Users, TrendingUp, AlertCircle, RotateCcw } from 'lucide-react';
import { formatAmount } from '@/lib/membership-benefits';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScopeSwitcher, PeerErrorBanner } from '@/components/admin/ScopeSwitcher';

const TIER_COLOR: Record<string, string> = { monthly: '#60a5fa', yearly: '#a78bfa', lifetime: '#fbbf24' };

// 按订单/汇总币种取符号（不再用全局 CURRENCY_SYMBOL——混币种时每笔各显各的）
function symbolOf(currency: 'CNY' | 'USD'): string {
  return currency === 'USD' ? '$' : '¥';
}

const typeLabels: Record<string, string> = { all: '全部', monthly: '月付', yearly: '年付', donation: '买断' };
const statusLabels: Record<string, string> = { paid: '已支付', pending: '待支付', refunded: '已退款', all: '全部' };

export default function RevenuePage() {
  const [scope, setScope] = useState<AdminScope>('domestic');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('paid');
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [acting, setActing] = useState<string | null>(null);
  const { data: scoped, loading, refetch } = useAdminData<ScopedRevenueResponse>(`/api/admin/revenue?scope=${scope}&type=${type}&status=${status}&page=${page}&pageSize=15`);
  const data = scoped?.self ?? null;
  const peer = scoped?.peer ?? null;
  const combined = scope === 'combined';
  // combined 时订单表合并两站（每笔自带 currency，天然混显），按时间倒序
  // 用 Set 标记哪些订单来自海外，渲染时打站点来源标签
  const peerOrderIds = new Set((combined && peer ? peer.orders : []).map((o) => o.id));
  const displayOrders: OrderRecord[] = combined && peer
    ? [...(data?.orders ?? []), ...peer.orders].sort((a, b) => b.createdAt - a.createdAt)
    : (data?.orders ?? []);
  // combined 时两站各自独立分页（同一 page 号各取自己那页），合计 total 用于计数，
  // 翻页只要任一站还有下一页就允许（取两站 total 最大值判断）
  const displayTotal = combined && peer ? data!.total + peer.total : (data?.total ?? 0);
  const maxTotal = combined && peer ? Math.max(data!.total, peer.total) : (data?.total ?? 0);

  const orderAction = async (order: OrderRecord, action: 'refund' | 'mark_paid') => {
    const verb = action === 'refund' ? '退款' : '补单';
    const extra = action === 'refund'
      ? '将把订单标记为已退款并撤销该用户会员。实际退款请另在支付平台操作。'
      : '将把订单标记为已支付并为该用户开通会员。';
    if (!confirm(`确认对 ${order.username} 的订单执行${verb}？\n${extra}`)) return;
    setActing(order.id);
    try {
      const res = await fetch('/api/admin/revenue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, action }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`${verb}失败：${err.error || res.status}`);
        return;
      }
      refetch();
    } finally {
      setActing(null);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  const exportCSV = async () => {
    setExporting(true);
    try {
      // 拉全量（按当前 type 过滤），不受分页限制
      const res = await fetch(`/api/admin/revenue?scope=${scope}&type=${type}&export=1`);
      if (!res.ok) { alert('导出失败，请重试'); return; }
      const fullScoped: ScopedRevenueResponse = await res.json();
      const full: RevenueResponse = fullScoped.self;
      const exportRows: OrderRecord[] = combined && fullScoped.peer
        ? [...full.orders, ...fullScoped.peer.orders].sort((a, b) => b.createdAt - a.createdAt)
        : full.orders;
      const header = '订单ID,用户ID,用户名,类型,金额,时间,状态\n';
      const rows = exportRows.map((o) =>
        `"${o.id}","${o.userId}","${o.username}","${typeLabels[o.type]}","${symbolOf(o.currency)}${formatAmount(o.amount)}","${new Date(o.createdAt).toLocaleString('zh-CN')}","${o.status === 'paid' ? '已支付' : '已退款'}"`
      ).join('\n');
      const blob = new Blob(['﻿' + header + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `收入明细_${type}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🐰</span>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">收入中心</h1>
            <p className="text-sm text-[var(--text-muted)]">收入概览和订单明细</p>
          </div>
        </div>
        <ScopeSwitcher scope={scope} onChange={(s) => { setScope(s); setPage(1); }} />
      </div>

      {scoped?.peerError && <PeerErrorBanner message={scoped.peerError} />}

      {/* Summary cards（combined 时双币种并列，¥/$ 绝不相加）*/}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          { label: '今日收入', k: 'today' as const },
          { label: '本周收入', k: 'thisWeek' as const },
          { label: '本月收入', k: 'thisMonth' as const },
          { label: '累计收入', k: 'total' as const },
        ]).map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p className="text-sm text-[var(--text-muted)] mb-1">{s.label}</p>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{symbolOf(data.summaryCurrency)}{formatAmount(data.summary[s.k])}</p>
            {combined && peer && (
              <p className="text-lg font-bold text-[var(--text-secondary)] mt-0.5">{symbolOf(peer.summaryCurrency)}{formatAmount(peer.summary[s.k])}</p>
            )}
          </div>
        ))}
      </div>

      {/* 经营指标 */}
      {combined && <p className="text-xs text-[var(--text-muted)] -mb-2">经营指标为国内口径；海外收入见上方汇总卡第二行（{peer ? symbolOf(peer.summaryCurrency) : '$'}）。</p>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<Users size={16} className="text-blue-400" />} label="付费用户" value={combined && peer ? `${data.insights.payingUsers + peer.insights.payingUsers}` : String(data.insights.payingUsers)} sub={combined ? '两站合计' : '当前有效'} />
        <MetricCard icon={<TrendingUp size={16} className="text-emerald-400" />} label={`客单价${combined ? '（仅国内）' : ''}`} value={`${symbolOf(data.summaryCurrency)}${formatAmount(data.insights.arpu)}`} sub={`共 ${data.insights.totalPaidOrders} 单`} />
        <MetricCard icon={<AlertCircle size={16} className="text-amber-400" />} label={`支付成功率${combined ? '（仅国内）' : ''}`} value={`${data.insights.successRate}%`} sub={`待支付 ${data.insights.pendingCount} 单`} subAlert={data.insights.pendingCount > 0} />
        <MetricCard icon={<RotateCcw size={16} className="text-red-400" />} label={`退款率${combined ? '（仅国内）' : ''}`} value={`${data.insights.refundRate}%`} sub={`${data.insights.refundedCount} 单 / ${symbolOf(data.summaryCurrency)}${formatAmount(data.insights.refundedAmount)}`} subAlert={data.insights.refundedCount > 0} />
      </div>

      {/* 档位收入构成 */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">档位收入构成（累计{combined ? '·仅国内' : ''}）</h3>
        <div className="space-y-3">
          {data.insights.tierBreakdown.map((t) => (
            <div key={t.tier}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)] font-medium">
                  <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: TIER_COLOR[t.tier] }} />
                  {t.label}
                  <span className="text-[var(--text-muted)] ml-2">{t.payingUsers} 人有效 · {t.orderCount} 单</span>
                </span>
                <span className="text-[var(--text-primary)] font-semibold">{symbolOf(data.summaryCurrency)}{formatAmount(t.revenue)}（{t.revenuePercent}%）</span>
              </div>
              <div className="bg-[var(--bg-input)] rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.max(t.revenuePercent, 1)}%`, background: TIER_COLOR[t.tier] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 近30天收入趋势 */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">近 30 天收入趋势（{symbolOf(data.summaryCurrency)}{combined ? '·仅国内' : ''}）</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickFormatter={(v) => String(v).slice(5)} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border-color)', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="monthlySub" name="月付" stackId="1" stroke={TIER_COLOR.monthly} fill={TIER_COLOR.monthly} fillOpacity={0.5} />
            <Area type="monotone" dataKey="yearlySub" name="年付" stackId="1" stroke={TIER_COLOR.yearly} fill={TIER_COLOR.yearly} fillOpacity={0.5} />
            <Area type="monotone" dataKey="donation" name="买断" stackId="1" stroke={TIER_COLOR.lifetime} fill={TIER_COLOR.lifetime} fillOpacity={0.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders table */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">订单明细</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status filter */}
            <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
              {['paid', 'pending', 'refunded', 'all'].map((k) => (
                <button
                  key={k}
                  onClick={() => { setStatus(k); setPage(1); }}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    status === k ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {statusLabels[k]}
                </button>
              ))}
            </div>
            {/* Type filter */}
            <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
              {Object.entries(typeLabels).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => { setType(k); setPage(1); }}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    type === k ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={exportCSV}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[#FF8FAB] transition-colors disabled:opacity-40"
            >
              <Download size={14} />
              {exporting ? '导出中...' : '导出全部'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-soft)]">
                {combined && <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">站点</th>}
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">订单ID</th>
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">用户</th>
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">类型</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">金额</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">时间</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">状态</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.map((o) => {
                const isPeer = peerOrderIds.has(o.id);
                return (
                <tr key={`${isPeer ? 'os' : 'cn'}-${o.id}`} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                  {combined && (
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isPeer ? 'bg-indigo-50 text-indigo-500' : 'bg-rose-50 text-rose-500'}`}>
                        {isPeer ? '🌏 海外' : '🇨🇳 国内'}
                      </span>
                    </td>
                  )}
                  <td className="px-5 py-3 text-xs text-[var(--text-muted)] font-mono">{o.id}</td>
                  <td className="px-5 py-3 text-xs text-[var(--text-primary)]">{o.username}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      o.type === 'monthly' ? 'bg-blue-50 text-blue-500' :
                      o.type === 'yearly' ? 'bg-purple-50 text-purple-500' :
                      'bg-amber-50 text-amber-500'
                    }`}>
                      {typeLabels[o.type]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-primary)]">{symbolOf(o.currency)}{formatAmount(o.amount)}</td>
                  <td className="px-5 py-3 text-right text-xs text-[var(--text-muted)]">
                    {new Date(o.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      o.status === 'paid' ? 'bg-emerald-50 text-emerald-500' :
                      o.status === 'pending' ? 'bg-amber-50 text-amber-500' :
                      'bg-red-50 text-red-400'
                    }`}>
                      {statusLabels[o.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {combined ? (
                      <span className="text-xs text-[var(--text-placeholder)]" title="综合视图不支持跨站操作，请切到对应站点单独视图">切单站操作</span>
                    ) : (
                      <>
                        {o.status === 'paid' && (
                          <button
                            onClick={() => orderAction(o, 'refund')}
                            disabled={acting === o.id}
                            className="text-xs px-2.5 py-1 rounded-md border border-[var(--border-color)] text-red-500 hover:bg-red-50 disabled:opacity-40 transition-colors"
                          >
                            {acting === o.id ? '处理中...' : '退款'}
                          </button>
                        )}
                        {o.status === 'pending' && (
                          <button
                            onClick={() => orderAction(o, 'mark_paid')}
                            disabled={acting === o.id}
                            className="text-xs px-2.5 py-1 rounded-md border border-[var(--border-color)] text-emerald-600 hover:bg-emerald-50 disabled:opacity-40 transition-colors"
                          >
                            {acting === o.id ? '处理中...' : '标记已付·补单'}
                          </button>
                        )}
                        {o.status === 'refunded' && <span className="text-xs text-[var(--text-placeholder)]">—</span>}
                      </>
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-color)]">
          <span className="text-xs text-[var(--text-muted)]">共 {displayTotal} 条{combined && peer ? `（国内 ${data.total} · 海外 ${peer.total}）` : ''}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[#FF8FAB] transition-colors"
            >
              上一页
            </button>
            <span className="px-3 py-1 text-xs text-[var(--text-muted)]">第 {page} 页</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * 15 >= maxTotal}
              className="px-3 py-1 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[#FF8FAB] transition-colors"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub, subAlert }: { icon: React.ReactNode; label: string; value: string; sub: string; subAlert?: boolean }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-[var(--text-primary)]">{value}</p>
      <p className={`text-xs mt-1 ${subAlert ? 'text-red-400' : 'text-[var(--text-muted)]'}`}>{sub}</p>
    </div>
  );
}
