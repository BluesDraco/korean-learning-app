'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { SystemResponse } from '@/types/admin';
import { Cpu, HardDrive, Zap, AlertTriangle, Coins } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function SystemPage() {
  const { data, loading } = useAdminData<SystemResponse>('/api/admin/system');

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  const formatTokens = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🐰</span>
        <div>
          <h1 className="text-xl font-bold text-gray-800">系统监控</h1>
          <p className="text-sm text-gray-400">服务器状态和AI使用统计</p>
        </div>
      </div>

      {/* AI Usage summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-400" />
            <span className="text-xs text-gray-400">本月API调用</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{data.aiUsage.totalCallsThisMonth.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">次</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-purple-400" />
            <span className="text-xs text-gray-400">本月Token消耗</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{formatTokens(data.aiUsage.totalTokensThisMonth)}</p>
          <p className="text-xs text-gray-400 mt-1">tokens</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Coins size={16} className="text-amber-500" />
            <span className="text-xs text-gray-400">本月AI费用</span>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">¥{data.aiUsage.totalCostThisMonth.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">DeepSeek API</p>
        </div>
      </div>

      {/* Charts: CPU/Memory 24h + Daily AI calls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CPU & Memory trend */}
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">24小时服务器资源</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.cpuMemoryHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5E6E0" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#999' }} />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} domain={[0, 100]} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F5E6E0', fontSize: 12 }} />
              <Area type="monotone" dataKey="cpuPercent" name="CPU" stroke="#FF8FAB" fill="#FFF0F4" strokeWidth={2} />
              <Area type="monotone" dataKey="memoryPercent" name="内存" stroke="#A78BFA" fill="#F5F3FF" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#FF8FAB] inline-block" /> CPU</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#A78BFA] inline-block" /> 内存</span>
          </div>
        </div>

        {/* Daily AI calls */}
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">本月每日AI调用</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.aiUsage.dailyCalls}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5E6E0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} tickFormatter={(v) => String(v).slice(8)} />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F5E6E0', fontSize: 12 }} />
              <Line type="monotone" dataKey="calls" name="调用次数" stroke="#FF8FAB" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top users + Error logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top users */}
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">高用量用户 TOP 10</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#F5E6E0]">
                  <th className="text-left py-2 text-gray-400 font-medium">#</th>
                  <th className="text-left py-2 text-gray-400 font-medium">用户</th>
                  <th className="text-right py-2 text-gray-400 font-medium">调用次数</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Token</th>
                  <th className="text-right py-2 text-gray-400 font-medium">预估费用</th>
                  <th className="text-right py-2 text-gray-400 font-medium">会员</th>
                </tr>
              </thead>
              <tbody>
                {data.topUsers.map((u, i) => (
                  <tr key={u.userId} className="border-b border-[#F5E6E0]">
                    <td className="py-2.5">
                      <span className={`font-bold ${
                        i < 3 ? 'text-[#FF8FAB]' : 'text-gray-400'
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-700 font-medium">{u.username}</td>
                    <td className="py-2.5 text-right text-gray-600">{u.totalCalls.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-gray-600">{formatTokens(u.totalTokens)}</td>
                    <td className="py-2.5 text-right text-gray-700 font-semibold">¥{u.estimatedCost.toFixed(2)}</td>
                    <td className="py-2.5 text-right">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        u.membershipType === 'yearly' ? 'bg-purple-50 text-purple-500' :
                        u.membershipType === 'monthly' ? 'bg-blue-50 text-blue-500' :
                        'bg-gray-50 text-gray-400'
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
        <div className="bg-white rounded-xl p-5 border border-[#F5E6E0]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">错误日志</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {data.errorLogs.slice(0, 20).map((e) => (
              <div key={e.id} className="flex items-start gap-2.5 text-xs py-1.5 border-b border-[#F5E6E0] last:border-0">
                <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] shrink-0 ${
                  e.level === 'error' ? 'bg-red-50 text-red-500' :
                  e.level === 'warn' ? 'bg-amber-50 text-amber-500' :
                  'bg-blue-50 text-blue-500'
                }`}>
                  {e.level.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600">{e.message}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-400 text-[10px]">{e.source}</span>
                    <span className="text-gray-300 text-[10px]">
                      {new Date(e.timestamp).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
