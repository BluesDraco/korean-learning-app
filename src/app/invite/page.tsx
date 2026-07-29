'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../auth/auth.css';

export default function InviteLandingPage() {
  return (
    <Suspense fallback={null}>
      <InviteLandingContent />
    </Suspense>
  );
}

function InviteLandingContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { lang } = useLang();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = searchParams.get('code');
    const code = raw ? raw.trim().toUpperCase() : '';
    if (!/^[0-9A-Z]{4,16}$/.test(code)) return;
    try {
      localStorage.setItem('invite_code', code);
      document.cookie = `invite_code=${code}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
      setSaved(true);
    } catch { /* ignore */ }
  }, [searchParams]);

  // 已登录直接进 Day1；未登录先注册（注册后 AuthProvider 会自动回填邀请码）
  const ctaHref = user ? '/diary/beginner/1' : '/auth/register?redirect=/diary/beginner/1';

  return (
    <div className="auth-scope">
      <div style={{
        width: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 22, boxSizing: 'border-box',
        background: 'var(--au-bg)', color: 'var(--au-ink-1)', padding: '40px 22px', textAlign: 'center',
      }}>
        <div style={{ position: 'relative', width: 150, height: 150 }}>
          <Image src="/images/tori-hero-wave.webp" alt={t('invite.land_hero_alt', lang)} fill sizes="150px" priority style={{ objectFit: 'contain' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--au-serif)', fontSize: 27, lineHeight: 1.3, margin: 0 }}>
          {t('invite.land_title_1', lang)}<br />{t('invite.land_title_2', lang)}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--au-ink-2)', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
          {t('invite.land_sub', lang)}
          {saved && <><br /><span style={{ color: 'var(--au-pink-deep)', fontWeight: 700 }}>{t('invite.land_saved_bonus', lang)}</span></>}
        </p>

        <Link href={ctaHref} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--au-pink)', color: '#fff', fontWeight: 700, fontSize: 16,
          padding: '14px 40px', borderRadius: 999, textDecoration: 'none',
          boxShadow: '0 8px 22px rgba(255,127,168,.35)', marginTop: 4,
        }}>
          {t('invite.land_cta', lang)}
        </Link>

        <p style={{ fontSize: 13, color: 'var(--au-ink-3)', margin: 0 }}>
          {t('invite.land_have_account', lang)}<Link href="/auth/login" style={{ color: 'var(--au-pink-deep)', fontWeight: 600 }}>{t('invite.land_login', lang)}</Link>
        </p>
      </div>
    </div>
  );
}
