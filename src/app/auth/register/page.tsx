'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { useSearchParams } from 'next/navigation';
import { EDITION } from '@/lib/membership-benefits';
import '../auth.css';

type Method = 'phone' | 'email' | 'username';
const IS_OVERSEAS = EDITION === 'overseas';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const { lang } = useLang();
  const { register, sendEmailCode, registerWithEmail, sendPhoneCode, loginWithPhone } = useAuth();
  const searchParams = useSearchParams();
  const STATIC_EXT = /\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot|mp3|mp4|webm)$/i;
  const rawRedirect = searchParams.get('redirect');
  let redirectTo = '/daily';
  if (rawRedirect) {
    try {
      const pathname = new URL(rawRedirect, 'http://localhost').pathname;
      if (pathname.startsWith('/') && !STATIC_EXT.test(pathname) && pathname !== '/auth/login' && pathname !== '/auth/register') {
        redirectTo = pathname;
      }
    } catch { /* ignore */ }
  }

  // 海外站默认邮箱 tab；国内手机/邮箱暂未上线，默认用户名 tab
  const [method, setMethod] = useState<Method>(IS_OVERSEAS ? 'email' : 'username');

  // 用户名注册（现有真实逻辑）
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 手机 / 邮箱字段（UI，备案后接后端）
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  // 验证码倒计时
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // 国内站手机/邮箱注册尚未上线，仅用户名可用
  const soonMethod = (m: Method) => !IS_OVERSEAS && m !== 'username';

  const switchMethod = (m: Method) => {
    if (soonMethod(m)) return;
    setMethod(m);
    setError('');
  };

  const sendCode = async () => {
    if (countdown > 0) return;
    setError('');
    if (method === 'phone') {
      const result = await sendPhoneCode(phone);
      if (result.error) { setError(result.error); return; }
    } else if (method === 'email') {
      // 邮箱验证码（海外 Resend / 国内腾讯云 SES，后端已分流）
      const result = await sendEmailCode(email);
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
    await doRegister();
  };

  const doRegister = async () => {
    if (submitting) return;
    setError('');

    const USERNAME_RE = /^[a-zA-Z0-9一-龥_-]{2,20}$/;
    if (!username) {
      setError(t('auth.err_username_empty', lang));
      return;
    }
    if (!USERNAME_RE.test(username)) {
      setError(t('auth.err_username_format', lang));
      return;
    }
    if (password.length < 6) {
      setError(t('auth.err_password_short', lang));
      return;
    }
    if (password.length > 200) {
      setError(t('auth.err_password_long', lang));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.err_password_mismatch', lang));
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
      setError(t('auth.err_network', lang));
    } finally {
      setSubmitting(false);
    }
  };

  const loginHref = `/auth/login${redirectTo !== '/daily' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`;

  const TABS: { id: Method; label: string }[] = IS_OVERSEAS
    ? [
        { id: 'email', label: t('auth.tab_email', lang) },
        { id: 'username', label: t('auth.tab_username', lang) },
      ]
    : [
        { id: 'phone', label: t('auth.tab_phone', lang) },
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
              alt={t('auth.aside_alt_register', lang)}
              fill
              sizes="164px"
              className="auth-aside-fig"
              priority
            />
          </div>
          <h1 className="auth-aside-title" style={{ whiteSpace: 'pre-line' }}>{t('auth.aside_title_register', lang)}</h1>
          <p className="auth-aside-sub">{t('auth.aside_sub_register', lang)}</p>
        </div>
        <div className="auth-aside-foot">
          <span>{t('auth.aside_foot_diary', lang)}</span>
          <span>{t('auth.aside_foot_skills', lang)}</span>
        </div>
      </aside>

      <div className="auth-form-wrap">
        <div className="auth-form au-stagger">
          <Link href="/" className="auth-back" style={{ ['--i' as string]: 0 }}>
            <ArrowLeft size={15} /> {t('auth.back', lang)}
          </Link>
          <h2 className="auth-title" style={{ ['--i' as string]: 1 }}>{t('auth.register_title', lang)}</h2>
          <p className="auth-lead" style={{ ['--i' as string]: 2 }}>
            {t('auth.register_lead', lang)}
          </p>

          <div className="auth-tabs" style={{ ['--i' as string]: 3 }}>
            {TABS.map(tab => {
              const soon = soonMethod(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={'auth-tab' + (method === tab.id ? ' active' : '') + (soon ? ' soon' : '')}
                  onClick={() => switchMethod(tab.id)}
                  disabled={soon}
                  aria-disabled={soon}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {!IS_OVERSEAS && (
            <p className="auth-notice" style={{ ['--i' as string]: 3 }}>{t('auth.register_notice_soon', lang)}</p>
          )}

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

            <ToriPrimaryButton
              type="button"
              onClick={doRegister}
              loading={submitting}
              loadingText="注册中..."
            >
              {submitting ? t('auth.register_submitting', lang) : t('auth.register_submit', lang)}
            </button>
          </form>

          <p className="auth-switch" style={{ ['--i' as string]: 5 }}>
            {t('auth.register_switch', lang)}<Link href={loginHref}>{t('auth.register_switch_link', lang)}</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
