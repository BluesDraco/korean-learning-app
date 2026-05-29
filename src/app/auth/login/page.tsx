'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await login(username, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-8">
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6">
          <ArrowLeft size={16} />
          返回首页
        </Link>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          <div className="text-center">
            <img src="/images/tori-poses/tori-pose-02.png" alt="Tori" className="w-16 h-16 object-contain mx-auto mb-2" />
            <h1 className="text-xl font-bold text-[var(--text-primary)]">登录</h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">登录你的学习账户</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-[var(--color-danger)] bg-[var(--color-danger-bg)] rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              登录
            </button>
          </form>

          <p className="text-center text-xs text-[var(--text-muted)]">
            还没有账户？{' '}
            <Link href="/auth/register" className="text-[var(--pink-primary)] hover:underline font-medium">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-8">
        <div className="w-full max-w-sm space-y-3">
          <p className="text-center text-sm text-[var(--text-muted)]">加载中...</p>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5 animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-input)]" />
              <div className="h-6 w-16 bg-[var(--bg-input)] rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-12 bg-[var(--bg-input)] rounded" />
              <div className="h-10 w-full bg-[var(--bg-input)] rounded-xl" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-12 bg-[var(--bg-input)] rounded" />
              <div className="h-10 w-full bg-[var(--bg-input)] rounded-xl" />
            </div>
            <div className="h-10 w-full bg-[var(--bg-input)] rounded-xl" />
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
