'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, Calendar, Search } from 'lucide-react';

interface RegUser {
  id: string;
  username: string;
  nickname: string;
  email: string;
  createdAt: number;
  lastLoginAt: number | null;
}

interface DailyStat {
  date: string;
  count: number;
}

interface RegData {
  users: RegUser[];
  dailyStats: DailyStat[];
  total: number;
}

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
}

export default function RegistrationsPage() {
  const [data, setData] = useState<RegData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'daily'>('table');

  useEffect(() => {
    fetch('/api/admin/registrations')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--pink-primary)] border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return <div className="py-20 text-center text-sm text-[var(--text-muted)]">加载失败，请刷新重试</div>;
  }

  const filtered = search.trim()
    ? data.users.filter((u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.nickname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
    : data.users;

  // 最近7天新增
  const now = Date.now();
  const last7 = data.users.filter((u) => now - u.createdAt < 7 * 86400000).length;
  const last30 = data.users.filter((u) => now - u.createdAt < 30 * 86400000).length;
  const maxDailyCount = Math.max(...data.dailyStats.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">注册分析</h1>
          <p className="text-sm text-[var(--text-muted)]">所有用户的完整注册记录</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: '总注册用户', value: data.total, icon: Users, color: 'var(--pink-primary)' },
          { label: '近7天新增', value: last7, icon: TrendingUp, color: 'var(--mint-soft)' },
          { label: '近30天新增', value: last30, icon: Calendar, color: 'var(--purple-soft)' },
          { label: '今日新增', value: data.dailyStats[0]?.count ?? 0, icon: TrendingUp, color: 'var(--peach-soft)' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} style={{ color: s.color }} />
              <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${view === 'table' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'}`}
          >
            用户列表
          </button>
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${view === 'daily' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'}`}
          >
            按日统计
          </button>
        </div>
        {view === 'table' && (
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-2 flex-1 max-w-xs">
            <Search size={13} className="text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索用户名 / 昵称 / 邮箱..."
              className="bg-transparent text-xs outline-none text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] flex-1"
            />
          </div>
        )}
        {view === 'table' && (
          <span className="text-xs text-[var(--text-muted)]">
            {search ? `${filtered.length} / ${data.total}` : `共 ${data.total} 条`}
          </span>
        )}
      </div>

      {/* Table view */}
      {view === 'table' && (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-soft)]">
                  <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium w-8">#</th>
                  <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">用户</th>
                  <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">邮箱</th>
                  <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">注册时间</th>
                  <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">最后登录</th>
                  <th className="text-right px-4 py-3 text-xs text-[var(--text-muted)] font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, idx) => (
                  <tr key={u.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] tabular-nums">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[var(--bg-soft)] flex items-center justify-center text-xs font-bold text-[var(--pink-primary)] shrink-0">
                          {(u.nickname || u.username).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">{u.nickname || u.username}</p>
                          <p className="text-[10px] text-[var(--text-muted)]">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] max-w-[160px] truncate">{u.email || '—'}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-secondary)] tabular-nums whitespace-nowrap">{fmt(u.createdAt)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] tabular-nums whitespace-nowrap">
                      {u.lastLoginAt ? fmt(u.lastLoginAt) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/users/${u.id}`} className="text-xs text-[var(--pink-primary)] hover:underline">
                        详情
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-[var(--text-muted)]">没有匹配的用户</div>
          )}
        </div>
      )}

      {/* Daily stats view */}
      {view === 'daily' && (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4 border-b border-[var(--border-color)]">
            <p className="text-sm font-bold text-[var(--text-primary)]">每日注册人数</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">共 {data.dailyStats.length} 个有注册记录的日期</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-soft)]">
                  <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">日期</th>
                  <th className="text-left px-5 py-3 text-xs text-[var(--text-muted)] font-medium">新增用户</th>
                  <th className="px-5 py-3 text-xs text-[var(--text-muted)] font-medium text-left">趋势</th>
                </tr>
              </thead>
              <tbody>
                {data.dailyStats.map((d) => (
                  <tr key={d.date} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-5 py-3 text-xs text-[var(--text-secondary)] tabular-nums whitespace-nowrap">{d.date}</td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-bold" style={{ color: 'var(--pink-primary)' }}>{d.count}</span>
                      <span className="text-xs text-[var(--text-muted)] ml-1">人</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[200px] bg-[var(--bg-input)] rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(d.count / maxDailyCount) * 100}%`,
                              background: 'var(--pink-primary)',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] tabular-nums w-8 text-right">
                          {Math.round((d.count / data.total) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
