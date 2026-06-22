'use client';

import { useState, Suspense, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { Card, Button } from '@/components/ui';

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'var(--color-surface-1)',
  border: '1px solid var(--color-border-2)',
  borderRadius: 'var(--radius-md)',
  padding: '10px 14px',
  fontSize: 14,
  color: 'var(--color-ink-1)',
  outline: 'none',
  transition: 'border-color var(--dur-fast) var(--ease-soft)',
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--color-ink-2)',
  marginBottom: 6,
};

function LoginForm() {
  const searchParams = useSearchParams();
  const STATIC_EXT = /\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot|mp3|mp4|webm)$/i;
  const rawRedirect = searchParams.get('redirect');
  let redirect = '/daily';
  if (rawRedirect) {
    try {
      const pathname = new URL(rawRedirect, 'http://localhost').pathname;
      if (
        pathname.startsWith('/') &&
        !STATIC_EXT.test(pathname) &&
        pathname !== '/auth/login' &&
        pathname !== '/auth/register'
      ) {
        redirect = pathname;
      }
    } catch { /* ignore */ }
  }
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doLogin();
  };

  const doLogin = async () => {
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const result = await login(username, password);
      if (result.error) {
        setError(result.error === 'Invalid credentials' ? '用户名或密码错误' : (result.error || '登录失败，请稍后重试'));
      } else {
        window.location.href = redirect;
      }
    } catch {
      setError('网络错误，请检查网络连接后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 10rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <Link
          href="/daily"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
            marginBottom: 18,
          }}
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>

        <Card variant="default" padding="lg">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Image
              src="/images/tori-poses/tori-pose-02.webp"
              alt="Tori"
              width={64}
              height={64}
              style={{ objectFit: 'contain', margin: '0 auto 8px', display: 'block' }}
            />
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>登录</h1>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
              登录后可以保存你的生词、跟唱记录和学习进度
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                style={inputStyle}
                autoComplete="username"
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-pink-base)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-2)')}
              />
            </div>

            <div>
              <label style={labelStyle}>密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                style={inputStyle}
                autoComplete="current-password"
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-pink-base)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-2)')}
              />
            </div>

            {error && (
              <p style={{
                fontSize: 12,
                color: 'var(--color-status-danger)',
                background: 'var(--color-status-danger-bg)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                margin: 0,
              }}>
                {error}
              </p>
            )}

            <Button
              type="button"
              variant="primary"
              tone="pink"
              size="lg"
              fullWidth
              loading={submitting}
              onClick={doLogin}
            >
              {submitting ? '登录中...' : '登录'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-ink-3)', margin: '20px 0 0' }}>
            还没有账户？{' '}
            <Link
              href="/auth/register"
              style={{ color: 'var(--color-pink-strong)', textDecoration: 'none', fontWeight: 600 }}
            >
              立即注册
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: 'calc(100vh - 10rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
          <Card variant="default" padding="lg" style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0 }}>加载中...</p>
          </Card>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
