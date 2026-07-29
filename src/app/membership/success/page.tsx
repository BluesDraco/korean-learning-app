'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { MEMBERSHIP_CSS } from '../membership.css';

// Stripe 付款成功回跳页。Stripe 先跳这里，会员由 webhook 异步开通，
// 所以进页面时可能还没开通——轮询订单状态，paid 后进会员中心。
function SuccessInner() {
  const router = useRouter();
  const { lang } = useLang();
  const params = useSearchParams();
  const orderId = params.get('order') || '';
  const [state, setState] = useState<'checking' | 'paid' | 'pending'>('checking');
  const [retrying, setRetrying] = useState(false);
  const cancelledRef = useRef(false);

  const poll = async (orderId: string) => {
    for (let i = 0; i < 15; i++) {
      if (cancelledRef.current) return;
      try {
        const res = await fetch(`/api/membership/order/${orderId}`, { cache: 'no-store' });
        if (res.ok) {
          const d: { status?: string } = await res.json();
          if (d.status === 'paid') {
            setState('paid');
            router.replace('/mine/membership?paid=1');
            return;
          }
        }
      } catch { /* 单次失败继续轮询 */ }
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (!cancelledRef.current) setState('pending');
  };

  useEffect(() => {
    cancelledRef.current = false;
    if (!orderId) { setState('pending'); return; }
    setRetrying(false);
    poll(orderId);
    return () => { cancelledRef.current = true; };
  }, [orderId, router]);

  const handleRetry = () => {
    if (!orderId || retrying) return;
    setRetrying(true);
    setState('checking');
    poll(orderId);
  };

  return (
    <div className="mb-scope">
      <style dangerouslySetInnerHTML={{ __html: MEMBERSHIP_CSS }} />
      <style dangerouslySetInnerHTML={{ __html: '@keyframes mb-spin{to{transform:rotate(360deg)}}.mb-spin{animation:mb-spin 0.9s linear infinite}' }} />

      <header className="mb-topbar">
        <Link href="/mine/membership" className="mb-back"><ArrowLeft size={18} /> {t('membership.center', lang)}</Link>
        <div className="mb-brand"><span className="mb-brand-en">Tori</span><span className="mb-brand-kr">토리네 한국어</span></div>
      </header>

      <section style={{ maxWidth: 460, margin: '0 auto', padding: '48px 20px 60px', textAlign: 'center' }}>
        {state === 'checking' ? (
          <>
            <Loader2 size={40} className="mb-spin" style={{ color: 'var(--au-pink-deep)', margin: '0 auto 18px' }} />
            <h2 style={{ fontFamily: 'var(--au-serif)', fontSize: 24, fontWeight: 700, color: 'var(--au-ink-1)', margin: '0 0 8px' }}>
              {t('membership.success_checking_title', lang)}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--au-ink-3)' }}>{t('membership.success_checking_sub', lang)}</p>
          </>
        ) : state === 'paid' ? (
          <>
            <CheckCircle2 size={44} style={{ color: 'var(--au-pink-deep)', margin: '0 auto 18px' }} />
            <h2 style={{ fontFamily: 'var(--au-serif)', fontSize: 24, fontWeight: 700, color: 'var(--au-ink-1)' }}>
              {t('membership.success_paid_title', lang)}
            </h2>
          </>
        ) : (
          <>
            <CheckCircle2 size={44} style={{ color: 'var(--au-pink-deep)', margin: '0 auto 18px' }} />
            <h2 style={{ fontFamily: 'var(--au-serif)', fontSize: 24, fontWeight: 700, color: 'var(--au-ink-1)', margin: '0 0 8px' }}>
              {t('membership.success_pending_title', lang)}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--au-ink-3)', margin: '0 0 22px', lineHeight: 1.7 }}>
              {t('membership.success_pending_line1', lang)}<br />{t('membership.success_pending_line2', lang)}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <button className="mb-cta" onClick={() => router.push('/mine/membership?paid=1')}>{t('membership.goto_center', lang)}</button>
              <button className="mb-cta" style={{ background: 'transparent', border: '1px solid var(--au-line)', color: 'var(--au-ink-2)' }} onClick={handleRetry} disabled={retrying}>
                {retrying ? <Loader2 size={14} className="mb-spin" /> : t('membership.retry_check', lang)}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default function MembershipSuccessPage() {
  const { lang } = useLang();
  return (
    <Suspense fallback={<div className="mb-scope"><div className="mb-loading">{t('mine.mem_loading', lang)}</div></div>}>
      <SuccessInner />
    </Suspense>
  );
}
