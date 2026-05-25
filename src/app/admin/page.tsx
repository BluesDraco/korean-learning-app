'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface UserRow {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: string;
  createdAt: number;
  updatedAt: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/auth/login?redirect=/admin');
      return;
    }
    if (user.role !== 'admin') {
      setError('无权限访问');
      setLoading(false);
      return;
    }
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setUsers(data.users);
          setTotal(data.total);
        }
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 space-y-4">
        <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
          <span className="text-sm">返回</span>
        </Link>
        <div className="text-center py-20">
          <Shield size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">管理后台</h1>
          <p className="text-xs text-[var(--text-muted)]">用户管理</p>
        </div>
      </div>

      {/* Stats card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--pink-primary)]/10 flex items-center justify-center">
          <Users size={24} className="text-[var(--pink-primary)]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{total}</p>
          <p className="text-xs text-[var(--text-muted)]">注册用户总数</p>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)]">用户名</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)]">昵称</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)]">邮箱</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)]">角色</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] hidden sm:table-cell">注册时间</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-input)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-primary)] font-medium">{u.username}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{u.nickname || '-'}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{u.email || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      u.role === 'admin'
                        ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                        : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                    }`}>
                      {u.role === 'admin' ? '管理员' : '用户'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)] hidden sm:table-cell">
                    {new Date(u.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-[var(--text-muted)]">
                    还没有注册用户
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
