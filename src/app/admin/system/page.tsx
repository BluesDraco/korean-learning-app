'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { SystemResponse, ErrorLogsResponse } from '@/types/admin';
import { Zap, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SystemPage() {
  const { data, loading } = useAdminData<SystemResponse>('/api/admin/system');

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">系统监控</h1>
          <p className="text-sm text-[var(--text-muted)]">服务器状态和AI使用统计</p>
        </div>
      </div>

      {/* AI Usage summary card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-400" />
            <span className="text-xs text-[var(--text-muted)]">本月API调用</span>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">{data.aiUsage.totalCallsThisMonth.toLocaleString()}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">次</p>
        </div>
      </div>

      {/* Daily AI calls */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">本月每日AI调用</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.aiUsage.dailyCalls}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickFormatter={(v) => String(v).slice(8)} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border-color)', fontSize: 12 }} />
            <Line type="monotone" dataKey="calls" name="调用次数" stroke="#FF8FAB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top users */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">高用量用户 TOP 10</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 text-[var(--text-muted)] font-medium">#</th>
                <th className="text-left py-2 text-[var(--text-muted)] font-medium">用户</th>
                <th className="text-right py-2 text-[var(--text-muted)] font-medium">调用次数</th>
                <th className="text-right py-2 text-[var(--text-muted)] font-medium">会员</th>
              </tr>
            </thead>
            <tbody>
              {data.topUsers.map((u, i) => (
                <tr key={u.userId} className="border-b border-[var(--border-color)]">
                  <td className="py-2.5">
                    <span className={`font-bold ${
                      i < 3 ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
                    }`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-2.5 text-[var(--text-primary)] font-medium">{u.username}</td>
                  <td className="py-2.5 text-right text-[var(--text-secondary)]">{u.totalCalls.toLocaleString()}</td>
                  <td className="py-2.5 text-right">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      u.membershipType === 'yearly' ? 'bg-purple-50 text-purple-500' :
                      u.membershipType === 'monthly' ? 'bg-blue-50 text-blue-500' :
                      'bg-[var(--bg-input)] text-[var(--text-muted)]'
                    }`}>
                      {u.membershipType === 'yearly' ? '年付' : u.membershipType === 'monthly' ? '月付' : '免费'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error logs */}
      <ErrorLogs />
    </div>
  );
}

const levelStyle: Record<string, string> = {
  critical: 'bg-red-100 text-red-600',
  error: 'bg-red-50 text-red-500',
  warn: 'bg-amber-50 text-amber-600',
};
const levelLabel: Record<string, string> = { critical: '严重', error: '错误', warn: '警告', all: '全部' };

function ErrorLogs() {
  const [level, setLevel] = useState('all');
  const { data, loading } = useAdminData<ErrorLogsResponse>(`/api/admin/error-logs?level=${level}&pageSize=30`);

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" />
          错误日志
          {data && (
            <span className="text-xs font-normal text-[var(--text-muted)]">
              近 24h：严重 {data.last24h.critical ?? 0} · 错误 {data.last24h.error ?? 0} · 警告 {data.last24h.warn ?? 0}
            </span>
          )}
        </h3>
        <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
          {['all', 'critical', 'error', 'warn'].map((k) => (
            <button
              key={k}
              onClick={() => setLevel(k)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                level === k ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
              }`}
            >
              {levelLabel[k]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-[var(--text-muted)]">加载中...</div>
      ) : !data || data.logs.length === 0 ? (
        <div className="py-8 text-center text-xs text-[var(--text-muted)]">暂无错误日志 🎉</div>
      ) : (
        <div className="space-y-2">
          {data.logs.map((log) => (
            <div key={log.id} className="text-xs border border-[var(--border-color)] rounded-lg p-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-1.5 py-0.5 rounded-full font-medium ${levelStyle[log.level] || levelStyle.error}`}>
                  {levelLabel[log.level] || log.level}
                </span>
                <span className="font-mono text-[var(--text-muted)]">{log.source}</span>
                <span className="text-[var(--text-placeholder)] ml-auto">{new Date(log.createdAt).toLocaleString('zh-CN')}</span>
              </div>
              <p className="text-[var(--text-primary)] mt-1.5">{log.message}</p>
              {log.detail && (
                <pre className="text-[var(--text-muted)] mt-1 whitespace-pre-wrap break-all bg-[var(--bg-soft)] rounded p-1.5 text-[11px]">{log.detail}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
