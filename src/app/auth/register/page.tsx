'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setSubmitting(true);
    try {
      const result = await register(username, password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch {
      setError('网络错误，请检查网络连接后重试');
    } finally {
      setSubmitting(false);
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
            <Image src="/images/tori-poses/tori-pose-03.webp" alt="Tori" width={56} height={56} className="object-contain mx-auto mb-2" />
            <h1 className="text-xl font-bold text-[var(--text-primary)]">注册</h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">创建你的学习账户</p>
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
                placeholder="2-20个字符"
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
                placeholder="至少6位密码"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                确认密码
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                autoComplete="new-password"
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
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              注册
            </button>
          </form>

          <p className="text-center text-xs text-[var(--text-muted)]">
            已有账户？{' '}
            <Link href="/auth/login" className="text-[var(--pink-primary)] hover:underline font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
