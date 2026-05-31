'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { RevenueResponse } from '@/types/admin';
import { useState } from 'react';
import { Download } from 'lucide-react';

const typeLabels: Record<string, string> = { all: '全部', monthly: '月付', yearly: '年付', donation: '打赏' };

export default function RevenuePage() {
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const { data, loading } = useAdminData<RevenueResponse>(`/api/admin/revenue?type=${type}&page=${page}&pageSize=15`);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  const exportCSV = () => {
    const header = '订单ID,用户ID,用户名,类型,金额,时间,状态\n';
    const rows = data.orders.map((o) =>
      `"${o.id}","${o.userId}","${o.username}","${typeLabels[o.type]}","¥${o.amount}","${new Date(o.createdAt).toLocaleString('zh-CN')}","${o.status === 'paid' ? '已支付' : '已退款'}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `收入明细_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">收入中心</h1>
          <p className="text-sm text-[var(--text-muted)]">收入概览和订单明细</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '今日收入', value: data.summary.today },
          { label: '本周收入', value: data.summary.thisWeek },
          { label: '本月收入', value: data.summary.thisMonth },
          { label: '累计收入', value: data.summary.total },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p className="text-sm text-[var(--text-muted)] mb-1">{s.label}</p>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">¥{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">订单明细</h3>
          <div className="flex items-center gap-3">
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[#FF8FAB] transition-colors"
            >
              <Download size={14} />
              导出CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-soft)]">
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">订单ID</th>
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">用户</th>
                <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">类型</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">金额</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">时间</th>
                <th className="text-right px-5 py-3 text-xs text-[var(--text-muted)] font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((o) => (
                <tr key={o.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
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
                  <td className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-primary)]">¥{o.amount}</td>
                  <td className="px-5 py-3 text-right text-xs text-[var(--text-muted)]">
                    {new Date(o.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      o.status === 'paid' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'
                    }`}>
                      {o.status === 'paid' ? '已支付' : '已退款'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-color)]">
          <span className="text-xs text-[var(--text-muted)]">共 {data.total} 条</span>
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
              disabled={page * 15 >= data.total}
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
