'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doRegister();
  };

  const doRegister = async () => {
    if (submitting) return;
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
        window.location.href = '/daily';
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
              src="/images/tori-poses/tori-pose-03.webp"
              alt="Tori"
              width={56}
              height={56}
              style={{ objectFit: 'contain', margin: '0 auto 8px', display: 'block' }}
            />
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>注册</h1>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
              用户名是你的登录账号，登录后可以保存学习记录
            </p>
            <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: '6px 0 0' }}>
              暂时使用用户名注册，后续会支持绑定邮箱和手机号。
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="2-20 个字符"
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
                placeholder="至少 6 位密码"
                style={inputStyle}
                autoComplete="new-password"
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-pink-base)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-2)')}
              />
            </div>

            <div>
              <label style={labelStyle}>确认密码</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                style={inputStyle}
                autoComplete="new-password"
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
              onClick={doRegister}
            >
              {submitting ? '注册中...' : '注册'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-ink-3)', margin: '20px 0 0' }}>
            已有账户？{' '}
            <Link
              href="/auth/login"
              style={{ color: 'var(--color-pink-strong)', textDecoration: 'none', fontWeight: 600 }}
            >
              立即登录
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
