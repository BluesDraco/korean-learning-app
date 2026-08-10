'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { EDITION } from '@/lib/membership-benefits';
import '../auth.css';

type Method = 'phone' | 'email' | 'username';
const IS_OVERSEAS = EDITION === 'overseas';

function LoginForm() {
  const { lang } = useLang();
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
  const { login, loginWithEmail, sendPhoneCode, loginWithPhone } = useAuth();

  // 海外站默认邮箱 tab；国内手机/邮箱暂未上线，默认用户名 tab
  const [method, setMethod] = useState<Method>('username');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 手机 / 邮箱字段（UI，备案后接后端）
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);


  const switchMethod = (m: Method) => {
    
    setMethod(m);
    setError('');
  };

  const sendCode = async () => {
    if (countdown > 0) return;
    setError('');
    if (method === 'phone') {
      const result = await sendPhoneCode(phone);
      if (result.error) { setError(result.error); return; }
    }
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'username') {
      await doLogin();
    } else if (method === 'email') {
      await doEmailLogin();
    } else if (method === 'phone') {
      await doPhoneLogin();
    }
  };

  const doPhoneLogin = async () => {
    if (submitting) return;
    setError('');
    if (!/^1[3-9]\d{9}$/.test(phone)) { setError(t('auth.err_phone_format', lang)); return; }
    if (!/^\d{6}$/.test(code)) { setError(t('auth.err_code_empty', lang)); return; }
    setSubmitting(true);
    try {
      const result = await loginWithPhone(phone, code);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.href = redirect;
      }
    } catch {
      setError(t('auth.err_network', lang));
    } finally {
      setSubmitting(false);
    }
  };

  const doLogin = async () => {
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const result = await login(username, password);
      if (result.error) {
        setError(result.error === 'Invalid credentials' ? t('auth.err_credentials', lang) : (result.error || t('auth.err_login_fail', lang)));
      } else {
        window.location.href = redirect;
      }
    } catch {
      setError(t('auth.err_network', lang));
    } finally {
      setSubmitting(false);
    }
  };

  const doEmailLogin = async () => {
    if (submitting) return;
    setError('');
    if (!email) { setError(t('auth.err_email_format', lang)); return; }
    if (!password) { setError(t('auth.err_password_short', lang)); return; }
    setSubmitting(true);
    try {
      const result = await loginWithEmail(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.href = redirect;
      }
    } catch {
      setError(t('auth.err_network', lang));
    } finally {
      setSubmitting(false);
    }
  };

  const registerHref = `/auth/register${redirect !== '/daily' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`;

  // 国内站：邮箱+用户名
  const TABS: { id: Method; label: string }[] = [
    { id: 'email', label: t('auth.tab_email', lang) },
    { id: 'username', label: t('auth.tab_username', lang) },
  ];

  return (
    <div className="auth-scope">
      <div className="auth-shell">
      <aside className="auth-aside">
        <div className="auth-aside-brand">
          <span className="en">Tori</span>
          <span className="kr">토리네 한국어</span>
        </div>
        <div className="auth-aside-hero">
          <div className="auth-fig-frame">
            <Image
              src="/images/tori-hero-wave.webp"
              alt={t('auth.aside_alt_login', lang)}
              fill
              sizes="164px"
              className="auth-aside-fig"
              priority
            />
          </div>
          <h1 className="auth-aside-title" style={{ whiteSpace: 'pre-line' }}>{t('auth.aside_title_login', lang)}</h1>
          <p className="auth-aside-sub">{t('auth.aside_sub_login', lang)}</p>
        </div>
        <div className="auth-aside-foot">
          <span>{t('auth.aside_foot_read', lang)}</span>
          <span>{t('auth.aside_foot_learn', lang)}</span>
          <span>{t('auth.aside_foot_radio', lang)}</span>
        </div>
      </aside>

      <div className="auth-form-wrap">
        <div className="auth-form au-stagger">
          <Link href="/" className="auth-back" style={{ ['--i' as string]: 0 }}>
            <ArrowLeft size={15} /> {t('auth.back', lang)}
          </Link>
          <h2 className="auth-title" style={{ ['--i' as string]: 1 }}>{t('auth.login_title', lang)}</h2>
          <p className="auth-lead" style={{ ['--i' as string]: 2 }}>
            {t('auth.login_lead', lang)}
          </p>

          <div className="auth-tabs" style={{ ['--i' as string]: 3 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={'auth-tab' + (method === tab.id ? ' active' : '')}
                onClick={() => switchMethod(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="auth-fields" style={{ ['--i' as string]: 4 }}>
            {method === 'phone' && (
              <>
                <div className="auth-field">
                  <label htmlFor="au-phone">{t('auth.phone', lang)}</label>
                  <div className="auth-phone-row">
                    <span className="auth-cc">+86</span>
                    <div className="auth-input-wrap">
                      <input
                        id="au-phone"
                        className="auth-input"
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t('auth.phone_ph', lang)}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>
                <div className="auth-field">
                  <label htmlFor="au-code">{t('auth.code', lang)}</label>
                  <div className="auth-code-row">
                    <div className="auth-input-wrap">
                      <input
                        id="au-code"
                        className="auth-input"
                        type="text"
                        inputMode="numeric"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={t('auth.code_ph', lang)}
                        autoComplete="one-time-code"
                      />
                    </div>
                    <button
                      type="button"
                      className="auth-code-btn"
                      onClick={sendCode}
                      disabled={countdown > 0 || !phone}
                    >
                      {countdown > 0 ? t('auth.code_resend', lang, { n: String(countdown) }) : t('auth.code_send', lang)}
                    </button>
                  </div>
                </div>
              </>
            )}

            {method === 'email' && (
              <>
                <div className="auth-field">
                  <label htmlFor="au-email">{t('auth.email', lang)}</label>
                  <div className="auth-input-wrap">
                    <input
                      id="au-email"
                      className="auth-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('auth.email_ph', lang)}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label htmlFor="au-email-pw">{t('auth.password', lang)}</label>
                  <div className="auth-input-wrap">
                    <input
                      id="au-email-pw"
                      className="auth-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.login_password_ph', lang)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? t('auth.hide_password', lang) : t('auth.show_password', lang)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {IS_OVERSEAS && (
                  <p style={{ textAlign: 'right', margin: '2px 0 0' }}>
                    <Link href="/auth/reset-password" style={{ fontSize: 12.5, color: 'var(--au-ink-3)', textDecoration: 'none' }}>
                      {t('auth.forgot_password', lang)}
                    </Link>
                  </p>
                )}
              </>
            )}

            {method === 'username' && (
              <>
                <div className="auth-field">
                  <label htmlFor="au-username">{t('auth.username', lang)}</label>
                  <div className="auth-input-wrap">
                    <input
                      id="au-username"
                      className="auth-input"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t('auth.login_username_ph', lang)}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label htmlFor="au-password">{t('auth.password', lang)}</label>
                  <div className="auth-input-wrap">
                    <input
                      id="au-password"
                      className="auth-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.login_password_ph', lang)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? t('auth.hide_password', lang) : t('auth.show_password', lang)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="auth-submit"
              disabled={submitting}
            >
              {submitting ? t('auth.login_submitting', lang) : t('auth.login_submit', lang)}
            </button>
          </form>

          <p className="auth-switch" style={{ ['--i' as string]: 5 }}>
            {t('auth.login_switch', lang)}<Link href={registerHref}>{t('auth.login_switch_link', lang)}</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
