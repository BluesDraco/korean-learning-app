'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScopeSwitcher, PeerErrorBanner } from '@/components/admin/ScopeSwitcher';
import type { AdminScope, ScopedRegistrationsResponse, RegUserDetail, DailyStat } from '@/types/admin';

const PAGE_SIZE = 50;
const COMBINED_FETCH_LIMIT = 2000;

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function todayKeyBJ(): string {
  const bj = new Date(Date.now() + 8 * 3600000);
  return `${bj.getUTCFullYear()}-${String(bj.getUTCMonth() + 1).padStart(2, '0')}-${String(bj.getUTCDate()).padStart(2, '0')}`;
}

function daysAgoKeyBJ(days: number): string {
  const bj = new Date(Date.now() + 8 * 3600000 - days * 86400000);
  return `${bj.getUTCFullYear()}-${String(bj.getUTCMonth() + 1).padStart(2, '0')}-${String(bj.getUTCDate()).padStart(2, '0')}`;
}

function mergeDailyStats(a: DailyStat[], b: DailyStat[]): DailyStat[] {
  const map = new Map<string, number>();
  for (const d of a) map.set(d.date, (map.get(d.date) || 0) + d.count);
  for (const d of b) map.set(d.date, (map.get(d.date) || 0) + d.count);
  return Array.from(map, ([date, count]) => ({ date, count })).sort((a, b) => b.date.localeCompare(a.date));
}

function mergeUserLists(a: RegUserDetail[], b: RegUserDetail[]): RegUserDetail[] {
  return [
    ...a.map(u => ({ ...u, source: 'domestic' as const })),
    ...b.map(u => ({ ...u, source: 'overseas' as const })),
  ].sort((x, y) => y.createdAt - x.createdAt);
}

export default function RegistrationsPage() {
  const [scope, setScope] = useState<AdminScope>('domestic');
  const [data, setData] = useState<ScopedRegistrationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'table' | 'daily'>('table');

  const isCombined = scope === 'combined';

  // In combined mode, page changes don't trigger re-fetch (client-side pagination over merged result)
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      scope,
      limit: String(isCombined ? COMBINED_FETCH_LIMIT : PAGE_SIZE),
      offset: String(isCombined ? 0 : page * PAGE_SIZE),
    });
    if (searchQuery) params.set('search', searchQuery);
    fetch(`/api/admin/registrations?${params.toString()}&_t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [scope, isCombined ? 0 : page, searchQuery]);

  function submitSearch() {
    setPage(0);
    setSearchQuery(searchInput.trim());
  }

  function handleScopeChange(s: AdminScope) {
    setScope(s);
    setPage(0);
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--pink-primary)] border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return <div className="py-20 text-center text-sm text-[var(--text-muted)]">加载失败，请刷新重试</div>;
  }

  const self = data.self;
  const peer = data.peer;
  const mergedDailyStats = isCombined && peer ? mergeDailyStats(self.dailyStats, peer.dailyStats) : self.dailyStats;
  const mergedUsers = isCombined && peer ? mergeUserLists(self.users, peer.users) : null;

  // Overseas tab but peer unreachable
  if (scope === 'overseas' && !data.peer && data.peerError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"><ArrowLeft size={18} /></Link>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">注册分析</h1>
            <p className="text-sm text-[var(--text-muted)]">所有用户的完整注册记录</p>
          </div>
          <div className="ml-auto"><ScopeSwitcher scope={scope} onChange={handleScopeChange} /></div>
        </div>
        <PeerErrorBanner message={data.peerError} />
      </div>
    );
  }

  const todayKey = todayKeyBJ();
  const key7 = daysAgoKeyBJ(6);
  const key30 = daysAgoKeyBJ(29);
  const todayCount = mergedDailyStats.find((d) => d.date === todayKey)?.count ?? 0;
  const last7 = mergedDailyStats.filter((d) => d.date >= key7).reduce((s, d) => s + d.count, 0);
  const last30 = mergedDailyStats.filter((d) => d.date >= key30).reduce((s, d) => s + d.count, 0);
  const totalAllTime = mergedDailyStats.reduce((s, d) => s + d.count, 0);
  const maxDailyCount = Math.max(...mergedDailyStats.map((d) => d.count), 1);

  const displayUsers = isCombined && mergedUsers
    ? mergedUsers.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    : self.users;

  const totalUsers = isCombined && peer ? self.total + peer.total : self.total;
  const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));
  const mergedCapped = isCombined && mergedUsers && mergedUsers.length < totalUsers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"><ArrowLeft size={18} /></Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">注册分析</h1>
          <p className="text-sm text-[var(--text-muted)]">所有用户的完整注册记录</p>
        </div>
        <div className="ml-auto"><ScopeSwitcher scope={scope} onChange={handleScopeChange} /></div>
      </div>

      {data.peerError && <PeerErrorBanner message={data.peerError} />}

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: '总注册用户', value: totalAllTime, icon: Users, color: 'var(--pink-primary)' },
          { label: '近7天新增', value: last7, icon: TrendingUp, color: 'var(--mint-soft)' },
          { label: '近30天新增', value: last30, icon: Calendar, color: 'var(--purple-soft)' },
          { label: '今日新增', value: todayCount, icon: TrendingUp, color: 'var(--peach-soft)' },
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
          <button onClick={() => setView('table')} className={`px-3 py-1.5 text-xs rounded-md transition-colors ${view === 'table' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'}`}>用户列表</button>
          <button onClick={() => setView('daily')} className={`px-3 py-1.5 text-xs rounded-md transition-colors ${view === 'daily' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'}`}>按日统计</button>
        </div>
        {view === 'table' && (
          <>
            <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-2 flex-1 max-w-xs">
              <Search size={13} className="text-[var(--text-muted)]" />
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }} placeholder="搜索用户名 / 昵称 / 邮箱 (回车)" className="bg-transparent text-xs outline-none text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] flex-1" />
              <button onClick={submitSearch} className="text-xs text-[var(--pink-primary)] hover:underline">搜索</button>
            </div>
            {searchQuery && (
              <button onClick={() => { setSearchInput(''); setSearchQuery(''); setPage(0); }} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">清除搜索</button>
            )}
            <span className="text-xs text-[var(--text-muted)]">
              {searchQuery ? `匹配 ${totalUsers} 条` : `共 ${totalUsers} 条`}
              {isCombined && <span className="ml-1 text-[var(--pink-primary)]">（国内+海外合并）</span>}
            </span>
          </>
        )}
      </div>

      {/* Table view */}
      {view === 'table' && (
        <>
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-soft)]">
                    <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium w-8">#</th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">用户</th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">邮箱</th>
                    {isCombined && <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">来源</th>}
                    <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">注册时间</th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium">最后登录</th>
                    <th className="text-right px-4 py-3 text-xs text-[var(--text-muted)] font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((u, idx) => (
                    <tr key={`${(u as any).source || 'local'}-${u.id}`} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                      <td className="px-4 py-3 text-xs text-[var(--text-muted)] tabular-nums">{page * PAGE_SIZE + idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[var(--bg-soft)] flex items-center justify-center text-xs font-bold text-[var(--pink-primary)] shrink-0">{(u.nickname || u.username).charAt(0).toUpperCase()}</div>
                          <div>
                            <p className="text-xs font-semibold text-[var(--text-primary)]">{u.nickname || u.username}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">@{u.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--text-muted)] max-w-[160px] truncate">{u.email || '—'}</td>
                      {isCombined && (
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${(u as any).source === 'overseas' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                            {(u as any).source === 'overseas' ? '🌏 海外' : '🇨🇳 国内'}
                          </span>
                        </td>
                      )}
                      <td className="px-4 py-3 text-xs text-[var(--text-secondary)] tabular-nums whitespace-nowrap">{fmt(u.createdAt)}</td>
                      <td className="px-4 py-3 text-xs text-[var(--text-muted)] tabular-nums whitespace-nowrap">{u.lastLoginAt ? fmt(u.lastLoginAt) : '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/users/${u.id}`} className="text-xs text-[var(--pink-primary)] hover:underline">详情</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {displayUsers.length === 0 && <div className="py-12 text-center text-sm text-[var(--text-muted)]">没有匹配的用户</div>}
          </div>

          {/* Pagination */}
          {totalUsers > PAGE_SIZE && (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-[var(--text-muted)] tabular-nums">
                第 {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, totalUsers)} / 共 {totalUsers} 条
                {mergedCapped && <span className="ml-1 text-amber-500">（合并模式下最多展示前 {COMBINED_FETCH_LIMIT.toLocaleString()} 条可排页结果）</span>}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(0)} disabled={page === 0} className="px-2 py-1 text-xs rounded border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-soft)]">首页</button>
                <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="px-2 py-1 text-xs rounded border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-soft)] flex items-center gap-1"><ChevronLeft size={12} /> 上一页</button>
                <span className="text-xs text-[var(--text-primary)] tabular-nums px-2">{page + 1} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-2 py-1 text-xs rounded border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-soft)] flex items-center gap-1">下一页 <ChevronRight size={12} /></button>
                <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} className="px-2 py-1 text-xs rounded border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-soft)]">末页</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Daily stats view */}
      {view === 'daily' && (
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="px-5 py-4 border-b border-[var(--border-color)]">
            <p className="text-sm font-bold text-[var(--text-primary)]">每日注册人数</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">共 {mergedDailyStats.length} 个有注册记录的日期{isCombined && '（国内 + 海外合并）'}</p>
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
                {mergedDailyStats.map((d) => (
                  <tr key={d.date} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-5 py-3 text-xs text-[var(--text-secondary)] tabular-nums whitespace-nowrap">{d.date}</td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-bold" style={{ color: 'var(--pink-primary)' }}>{d.count}</span>
                      <span className="text-xs text-[var(--text-muted)] ml-1">人</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[200px] bg-[var(--bg-input)] rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${(d.count / maxDailyCount) * 100}%`, background: 'var(--pink-primary)' }} />
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] tabular-nums w-8 text-right">{totalAllTime > 0 ? Math.round((d.count / totalAllTime) * 100) : 0}%</span>
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
