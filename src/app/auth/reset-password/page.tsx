'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../auth.css';

export default function ResetPasswordPage() {
  const { lang } = useLang();

  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const startCountdown = () => {
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

  const sendCode = async () => {
    if (countdown > 0) return;
    setError('');
    try {
      const res = await fetch('/api/auth/email/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || t('auth.err_network', lang)); return; }
      setSent(true);
      startCountdown();
      setStep('code');
    } catch {
      setError(t('auth.err_network', lang));
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    if (!email) { setError(t('auth.err_email_format', lang)); return; }
    if (!code) { setError(t('auth.err_code_empty', lang)); return; }
    if (password.length < 6) { setError(t('auth.err_password_short', lang)); return; }
    if (password.length > 200) { setError(t('auth.err_password_long', lang)); return; }
    if (password !== confirmPassword) { setError(t('auth.err_password_mismatch', lang)); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/email/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || t('auth.err_reset_fail', lang)); setSubmitting(false); return; }
      window.location.href = '/auth/login';
    } catch {
      setError(t('auth.err_network', lang));
      setSubmitting(false);
    }
  };

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
              <Image src="/images/tori-hero-wave.webp" alt="Tori" fill sizes="164px" className="auth-aside-fig" priority />
            </div>
            <h1 className="auth-aside-title" style={{ whiteSpace: 'pre-line' }}>{t('auth.reset_title', lang)}</h1>
            <p className="auth-aside-sub">{t('auth.reset_sub', lang)}</p>
          </div>
        </aside>

        <div className="auth-form-wrap">
          <div className="auth-form">
            <Link href="/auth/login" className="auth-back">
              <ArrowLeft size={15} /> {t('auth.back_to_login', lang)}
            </Link>
            <h2 className="auth-title">{t('auth.reset_heading', lang)}</h2>
            <p className="auth-lead">{step === 'email' ? t('auth.reset_lead_email', lang) : t('auth.reset_lead_code', lang, { email })}</p>

            <form onSubmit={handleReset} className="auth-fields">
              <div className="auth-field">
                <label htmlFor="rp-email">{t('auth.email', lang)}</label>
                <div className="auth-input-wrap">
                  <input
                    id="rp-email"
                    className="auth-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.email_ph', lang)}
                    autoComplete="email"
                    disabled={step === 'code'}
                  />
                </div>
              </div>

              {step === 'code' && (
                <>
                  <div className="auth-field">
                    <label htmlFor="rp-code">{t('auth.code', lang)}</label>
                    <div className="auth-code-row">
                      <div className="auth-input-wrap">
                        <input
                          id="rp-code"
                          className="auth-input"
                          type="text"
                          inputMode="numeric"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder={t('auth.code_ph', lang)}
                          autoComplete="one-time-code"
                        />
                      </div>
                      <button type="button" className="auth-code-btn" onClick={sendCode} disabled={countdown > 0}>
                        {countdown > 0 ? t('auth.code_resend', lang, { n: String(countdown) }) : t('auth.code_send', lang)}
                      </button>
                    </div>
                    <p className="auth-code-hint">{t('auth.code_spam_hint', lang)}</p>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="rp-pw">{t('auth.new_password', lang)}</label>
                    <div className="auth-input-wrap">
                      <input
                        id="rp-pw"
                        className="auth-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('auth.register_password_ph', lang)}
                        autoComplete="new-password"
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

                  <div className="auth-field">
                    <label htmlFor="rp-confirm">{t('auth.confirm', lang)}</label>
                    <div className="auth-input-wrap">
                      <input
                        id="rp-confirm"
                        className="auth-input"
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t('auth.register_confirm_ph', lang)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-eye"
                        onClick={() => setShowConfirm(v => !v)}
                        aria-label={showConfirm ? t('auth.hide_password', lang) : t('auth.show_password', lang)}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {error && <p className="auth-error">{error}</p>}

              {step === 'email' ? (
                <button type="button" className="auth-submit" onClick={sendCode} disabled={!email}>
                  {sent ? t('auth.code_sent', lang) : t('auth.code_send', lang)}
                </button>
              ) : (
                <button type="submit" className="auth-submit" disabled={submitting}>
                  {submitting ? t('auth.reset_submitting', lang) : t('auth.reset_submit', lang)}
                </button>
              )}
            </form>

            <p className="auth-switch">
              <Link href="/auth/login">{t('auth.back_to_login', lang)}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
