'use client';

import { useAdminData } from '@/lib/useAdminData';
import type { UserDetail, UpdateUserBody } from '@/types/admin';
import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '@/components/AuthProvider';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading, refetch } = useAdminData<UserDetail>(`/api/admin/users/${id}`);
  const { user: currentAdmin } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [membershipType, setMembershipType] = useState<string>('');
  const [banned, setBanned] = useState<boolean | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [role, setRole] = useState<string>('');

  const isSelf = currentAdmin?.id === id;

  const handleSave = async () => {
    if (role && role !== (data?.role || 'user')) {
      const action = role === 'admin' ? '设为管理员' : '降为普通用户';
      if (!confirm(`确认将 ${data?.username} ${action}？此操作会立即生效。`)) return;
    }
    setSaving(true);
    const body: UpdateUserBody = {};
    if (membershipType) body.membershipType = membershipType as UpdateUserBody['membershipType'];
    if (banned !== null) body.banned = banned;
    if (adminNote) body.adminNote = adminNote;
    if (role) body.role = role as UpdateUserBody['role'];

  // 通用 PATCH：供封禁/改密码/改联系方式等独立操作复用
  const patchUser = async (body: UpdateUserBody, confirmMsg?: string): Promise<boolean> => {
    if (confirmMsg && !confirm(confirmMsg)) return false;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`操作失败：${err.error || res.status}`);
        return false;
      }
      refetch();
      return true;
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    if (role && role !== (data?.role || 'user')) {
      const action = role === 'admin' ? '设为管理员' : '降为普通用户';
      if (!confirm(`确认将 ${data?.username} ${action}？此操作会立即生效。`)) return;
    }
    setSaving(true);
    const body: UpdateUserBody = {};
    if (membershipType) body.membershipType = membershipType as UpdateUserBody['membershipType'];
    if (role) body.role = role as UpdateUserBody['role'];

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`保存失败：${err.error || res.status}`);
        return;
      }
      refetch();
      setMembershipType('');
      setBanned(null);
      setAdminNote('');
      setRole('');
    } finally {
      setSaving(false);
    }
  };

  const toggleBan = async () => {
    if (!data) return;
    const banning = data.status !== 'banned';
    const ok = await patchUser(
      { status: banning ? 'banned' : 'active' },
      banning
        ? `确认封禁 ${data.username}？封禁后该用户无法登录，已登录状态下发帖/评论/AI 对话也会被拦截。`
        : `确认解封 ${data.username}？`,
    );
    if (ok && banning) alert('已封禁');
  };

  const resetPassword = async () => {
    if (newPassword.length < 6) { alert('密码至少 6 位'); return; }
    const ok = await patchUser({ newPassword }, `确认重置 ${data?.username} 的密码？请把新密码转告用户。`);
    if (ok) { setNewPassword(''); alert('密码已重置'); }
  };

  const saveContact = async () => {
    const body: UpdateUserBody = {};
    if (email !== '') body.email = email.trim();
    if (phone !== '') body.phone = phone.trim();
    if (Object.keys(body).length === 0) { alert('请填写要修改的邮箱或手机'); return; }
    const ok = await patchUser(body);
    if (ok) { setEmail(''); setPhone(''); alert('已更新联系方式'); }
  };

  const deactivate = async () => {
    if (!data) return;
    const input = prompt(`危险操作：注销账号将清空该用户的用户名、邮箱、手机等个人信息（学习数据保留），且无法登录。\n\n请输入用户名 “${data.username}” 以确认：`);
    if (input === null) return;
    if (input !== data.username) { alert('用户名不匹配，已取消'); return; }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${id}/deactivate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`注销失败：${err.error || res.status}`);
        return;
      }
      refetch();
      alert('账号已注销');
    } finally {
      setBusy(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  const memberLabel =
    data.membershipType === 'lifetime' ? '买断会员' :
    data.membershipType === 'yearly' ? '年付会员' :
    data.membershipType === 'monthly' ? '月付会员' : '免费用户';

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
                data.membershipType === 'lifetime' ? 'bg-amber-50 text-amber-600' :
                data.membershipType === 'yearly' ? 'bg-purple-50 text-purple-500' :
                data.membershipType === 'monthly' ? 'bg-blue-50 text-blue-500' :
                'bg-[var(--bg-input)] text-[var(--text-muted)]'
              }`}>
                {memberLabel}
                {data.membershipExpiry ? ` 到期 ${new Date(data.membershipExpiry).toLocaleDateString('zh-CN')}` : ''}
              </span>
              {data.status === 'banned' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">已封禁</span>
              )}
              {data.status === 'deleted' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)] font-medium">已注销</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Study stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: '学习天数', value: data.totalStudyDays, unit: '天' },
          { label: '当前连续', value: data.currentStreak, unit: '天' },
          { label: '最长连续', value: data.longestStreak, unit: '天' },
          { label: '等级', value: data.level, unit: '级' },
          { label: '总经验', value: data.totalXp.toLocaleString(), unit: 'XP' },
          { label: '已学单词', value: data.wordsLearned, unit: '个' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] rounded-xl p-4 text-center border border-[var(--border-color)]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label} ({s.unit})</p>
          </div>
        ))}
      </div>

      {/* Feature stats */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">功能使用统计</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {data.featureStats.map((f) => (
            <div key={f.feature} className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">{f.icon} {f.feature}</span>
              <span className="text-xs font-semibold text-[var(--text-primary)]">{f.count}次</span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin actions */}
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--pink-primary)]" />
          管理操作
        </h3>
        <div className={`grid grid-cols-1 gap-4 ${isSelf ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
          {/* Role — 不允许修改自己的权限 */}
          {!isSelf && (
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">修改角色权限</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            >
              <option value="">不修改（当前: {data.role || 'user'}）</option>
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          )}

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
              <option value="lifetime">买断会员</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || (!membershipType && banned === null && !adminNote && !role)}
          className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-colors"
          style={{ background: 'linear-gradient(135deg, #FF8FAB, #FFB8C9)' }}
        >
          {saving ? '保存中...' : '保存修改'}
        </button>
      </div>

      {/* Account support — 封禁 / 改密码 / 改联系方式 */}
      {!isSelf && (
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <KeyRound size={16} className="text-[var(--pink-primary)]" />
          账号支持
        </h3>

        {/* 联系方式 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">邮箱（当前：{data.email || '无'}）</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="新邮箱"
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">手机（当前：{data.phone || '无'}）</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="新手机号"
              className="w-full text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            />
          </div>
        </div>
        <button
          onClick={saveContact}
          disabled={busy || (!email && !phone)}
          className="text-xs px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#FF8FAB] disabled:opacity-40 transition-colors"
        >
          更新联系方式
        </button>

        {/* 重置密码 */}
        <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
          <label className="text-xs text-[var(--text-muted)] mb-1 block">重置密码（≥6 位，改后请转告用户）</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="输入新密码"
              className="flex-1 text-xs border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] bg-[var(--bg-card)] outline-none"
            />
            <button
              onClick={resetPassword}
              disabled={busy || newPassword.length < 6}
              className="text-xs px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#FF8FAB] disabled:opacity-40 transition-colors whitespace-nowrap"
            >
              重置密码
            </button>
          </div>
        </div>

        {/* 封禁 / 解封 */}
        <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-medium text-[var(--text-primary)] flex items-center gap-1">
                <ShieldOff size={13} className={data.status === 'banned' ? 'text-emerald-500' : 'text-red-500'} />
                {data.status === 'banned' ? '解除封禁' : '封禁账号'}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {data.status === 'banned' ? '恢复该用户登录与发帖权限' : '禁止登录，已登录状态下发帖/评论/AI 对话也会被拦截'}
              </p>
            </div>
            <button
              onClick={toggleBan}
              disabled={busy || data.status === 'deleted'}
              className={`text-xs px-4 py-2 rounded-lg font-medium border disabled:opacity-40 transition-colors ${
                data.status === 'banned'
                  ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                  : 'border-red-300 text-red-500 hover:bg-red-50'
              }`}
            >
              {data.status === 'banned' ? '解封' : '封禁'}
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Danger zone — 注销账号 */}
      {!isSelf && data.status !== 'deleted' && (
      <div className="rounded-xl p-5 border border-red-200 bg-red-50/40">
        <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
          <Trash2 size={16} />
          危险操作
        </h3>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-medium text-[var(--text-primary)]">注销此账号</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              清空用户名/邮箱/手机等个人信息并禁止登录，学习数据保留。需输入用户名确认。
            </p>
          </div>
          <button
            onClick={deactivate}
            disabled={busy}
            className="text-xs px-4 py-2 rounded-lg font-medium border border-red-300 text-red-500 bg-white hover:bg-red-100 disabled:opacity-40 transition-colors whitespace-nowrap"
          >
            注销账号
          </button>
        </div>
      </div>
      )}

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
}}
