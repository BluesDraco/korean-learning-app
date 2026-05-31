'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { UserDetail, UpdateUserBody } from '@/types/admin';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading, refetch } = useAdminData<UserDetail>(`/api/admin/users/${id}`);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [membershipType, setMembershipType] = useState<string>('');
  const [banned, setBanned] = useState<boolean | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const handleSave = async () => {
    setSaving(true);
    const body: UpdateUserBody = {};
    if (membershipType) body.membershipType = membershipType as UpdateUserBody['membershipType'];
    if (banned !== null) body.banned = banned;
    if (adminNote) body.adminNote = adminNote;

    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      refetch();
      setMembershipType('');
      setBanned(null);
      setAdminNote('');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  const memberLabel = data.membershipType === 'yearly' ? '年付会员' : data.membershipType === 'monthly' ? '月付会员' : '免费用户';

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/admin/users" className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
        <ArrowLeft size={14} />
        返回用户列表
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--bg-soft)] flex items-center justify-center text-2xl font-bold text-[var(--pink-primary)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {(data.nickname || data.username).charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{data.nickname || data.username}</h1>
            <p className="text-sm text-[var(--text-muted)]">@{data.username} · {data.email || '无邮箱'} · 注册于 {new Date(data.createdAt).toLocaleDateString('zh-CN')}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                data.membershipType === 'yearly' ? 'bg-purple-50 text-purple-500' :
                data.membershipType === 'monthly' ? 'bg-blue-50 text-blue-500' :
                'bg-[var(--bg-input)] text-[var(--text-muted)]'
              }`}>
                {memberLabel}
                {data.membershipExpiry ? ` 到期 ${new Date(data.membershipExpiry).toLocaleDateString('zh-CN')}` : ''}
              </span>
              {data.banned && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-400">已封禁</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push('/admin/users')}
          className="text-xs px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
        >
          返回列表
        </button>
      </div>

      {/* Study stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: '学习天数', value: data.totalStudyDays, unit: '天' },
          { label: '当前连续', value: data.currentStreak, unit: '天' },
          { label: '最长连续', value: data.longestStreak, unit: '天' },
          { label: '等级', value: data.level, unit: '级' },
          { label: '总经验', value: data.totalXp.toLocaleString(), unit: 'XP' },
          { label: '已学单词', value: data.wordsLearned, unit: '个' },
          { label: '复习次数', value: data.wordsReviewed, unit: '次' },
          { label: '学习时长', value: Math.round(data.totalMinutesStudied / 60), unit: '小时' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] rounded-xl p-4 text-center border border-[var(--border-color)]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label} ({s.unit})</p>
          </div>
        ))}
      </div>

      {/* Charts + Feature stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 7-day study minutes chart */}
        <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">最近7天学习时长</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.dailyStudyMinutes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5E6E0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} tickFormatter={(v) => String(v).slice(5)} />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} unit="min" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F5E6E0', fontSize: 12 }} />
              <Bar dataKey="minutes" name="分钟" fill="#FF8FAB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feature usage */}
        <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">功能使用统计</h3>
          <div className="space-y-3">
            {data.featureStats.map((f) => (
              <div key={f.feature} className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">{f.icon} {f.feature}</span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">{f.count}次</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
            <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2">其他数据</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
              <span>听写完成: {data.dictationsDone}次</span>
              <span>跟读完成: {data.shadowingDone}次</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin actions */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--pink-primary)]" />
          管理操作
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Membership */}
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">修改会员状态</label>
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            >
              <option value="">不修改</option>
              <option value="free">免费用户</option>
              <option value="monthly">月付会员</option>
              <option value="yearly">年付会员</option>
            </select>
          </div>

          {/* Ban */}
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">封禁状态</label>
            <select
              value={banned === null ? '' : String(banned)}
              onChange={(e) => setBanned(e.target.value === '' ? null : e.target.value === 'true')}
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            >
              <option value="">不修改</option>
              <option value="false">正常</option>
              <option value="true">封禁</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">管理员备注</label>
            <input
              type="text"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="添加备注..."
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none placeholder-gray-300"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || (!membershipType && banned === null && !adminNote)}
          className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-colors"
          style={{ background: 'linear-gradient(135deg, #FF8FAB, #FFB8C9)' }}
        >
          {saving ? '保存中...' : '保存修改'}
        </button>
      </div>

      {/* Activity log */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">活动日志</h3>
        <div className="space-y-2">
          {data.activityLog.map((a, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="text-[var(--text-placeholder)] w-16 shrink-0">
                {new Date(a.timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-[var(--text-secondary)]">{a.action}</span>
              <span className="text-[var(--text-muted)]">{a.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
