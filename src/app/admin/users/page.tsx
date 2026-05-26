'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { AdminUsersResponse } from '@/types/admin';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const statusTabs = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '活跃' },
  { key: 'vip', label: 'VIP' },
  { key: 'banned', label: '已封禁' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status !== 'all') params.set('status', status);
  if (sort !== 'newest') params.set('sort', sort);
  params.set('page', String(page));
  params.set('pageSize', '20');

  const { data, loading } = useAdminData<AdminUsersResponse>(`/api/admin/users?${params.toString()}`);

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

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
          <h1 className="text-xl font-bold text-gray-800">用户管理</h1>
          <p className="text-sm text-gray-400">共 {data.total} 位用户</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-[#F5E6E0] rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜索用户名/昵称/邮箱..."
            className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 flex-1"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          {statusTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setStatus(t.key); setPage(1); }}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                status === t.key ? 'bg-white text-[#FF8FAB] font-semibold shadow-sm' : 'text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="text-xs border border-[#F5E6E0] rounded-lg px-3 py-2 text-gray-500 bg-white outline-none"
        >
          <option value="newest">最新注册</option>
          <option value="oldest">最早注册</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#F5E6E0] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5E6E0] bg-[#FFFDF9]">
                <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">用户</th>
                <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">邮箱</th>
                <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">会员</th>
                <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">学习天数</th>
                <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">经验值</th>
                <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">单词量</th>
                <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">注册时间</th>
                <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id} className="border-b border-[#F5E6E0] hover:bg-[#FFFDF9] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#FFF0F4] flex items-center justify-center text-xs font-semibold text-[#FF8FAB]">
                        {(u.nickname || u.username).charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{u.nickname || u.username}</p>
                        <p className="text-[10px] text-gray-400">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[140px] truncate">{u.email || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      u.membershipType === 'yearly' ? 'bg-purple-50 text-purple-500' :
                      u.membershipType === 'monthly' ? 'bg-blue-50 text-blue-500' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {u.membershipType === 'yearly' ? '年付' : u.membershipType === 'monthly' ? '月付' : '免费'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-600">{u.studyDays}天</td>
                  <td className="px-4 py-3 text-center text-xs font-semibold text-gray-700">{u.totalXp.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-xs text-gray-600">{u.wordsLearned}</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="text-xs text-[#FF8FAB] hover:underline"
                    >
                      详情
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#F5E6E0]">
          <span className="text-xs text-gray-400">共 {data.total} 条</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-xs rounded-lg border border-[#F5E6E0] text-gray-500 disabled:opacity-30 hover:border-[#FF8FAB] transition-colors"
            >
              上一页
            </button>
            <span className="px-3 py-1 text-xs text-gray-500">第 {page} 页</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * 20 >= data.total}
              className="px-3 py-1 text-xs rounded-lg border border-[#F5E6E0] text-gray-500 disabled:opacity-30 hover:border-[#FF8FAB] transition-colors"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
