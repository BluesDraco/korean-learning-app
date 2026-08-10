'use client';

import { use, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { CURRENCY_SYMBOL, type Tier } from '@/lib/membership-benefits';

const TIER_LABEL_KEY: Record<Tier, string> = {
  free: 'mine.mem_tier_free',
  monthly: 'mine.mem_tier_monthly',
  yearly: 'mine.mem_tier_yearly',
  lifetime: 'mine.mem_tier_lifetime',
};
import { MEMBERSHIP_CSS } from '../../membership.css';

interface OrderInfo {
  [k: string]: unknown;
  id: string;
  tier: string;
  amount: number;   // 分
  status: string;
  paidAt: number | null;
}

function fmtMoney(cents: number): string {
  return (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
}

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const { lang } = useLang();
  const [order, setOrder] = useState<OrderInfo | null | undefined>(undefined);
  const [paying, setPaying] = useState(false);
  const [err, setErr] = useState('');
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    (async () => {
      try {
        const res = await fetch(`/api/membership/order/${orderId}`, { cache: 'no-store' });
        if (cancelledRef.current) return;
        if (res.ok) {
          const d: OrderInfo = await res.json();
          setOrder(d);
          // 已支付的订单直接进会员中心
          if (d.status === 'paid') router.replace('/mine/membership?paid=1');
        } else {
          setOrder(null);
        }
      } catch {
        if (!cancelledRef.current) setOrder(null);
      }
    })();
    return () => { cancelledRef.current = true; };
  }, [orderId, router]);

  const handlePaid = async () => {
    if (paying) return;
    setPaying(true);
    setErr('');
    try {
      const cb = await fetch('/api/membership/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      if (!cb.ok) { setErr(t('membership.pay_confirm_failed', lang)); setPaying(false); return; }

      // 轮询订单状态直到 paid（最多 4 次 × 700ms）
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => setTimeout(r, 700));
        if (cancelledRef.current) return;
        const res = await fetch(`/api/membership/order/${orderId}`, { cache: 'no-store' });
        if (res.ok) {
          const d: OrderInfo = await res.json();
          if (d.status === 'paid') { router.replace('/mine/membership?paid=1'); return; }
        }
      }
      // 兜底：即便轮询没抓到也进会员中心（回调已成功）
      router.replace('/mine/membership?paid=1');
    } catch {
      if (!cancelledRef.current) { setErr(t('membership.network_error_retry', lang)); setPaying(false); }
    }
  };

  const tierLabel = order && (order.tier in TIER_LABEL_KEY) ? t(TIER_LABEL_KEY[order.tier as Tier], lang) : '';

  return (
    <div className="mb-scope">
      <style dangerouslySetInnerHTML={{ __html: MEMBERSHIP_CSS }} />

      <header className="mb-topbar">
        <Link href="/membership" className="mb-back"><ArrowLeft size={18} /> {t('membership.back', lang)}</Link>
        <div className="mb-brand"><span className="mb-brand-en">Tori</span><span className="mb-brand-kr">토리네 한국어</span></div>
      </header>

      <section style={{ maxWidth: 460, margin: '0 auto', padding: '24px 20px 60px' }}>
        {order === undefined ? (
          <div className="mb-loading">{t('membership.loading', lang)}</div>
        ) : order === null ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--au-ink-3)', marginBottom: 16 }}>{t('membership.order_not_found', lang)}</p>
            <button className="mb-cta" onClick={() => router.push('/membership')}>{t('membership.back_to_plans', lang)}</button>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--au-surface)',
              borderRadius: 24,
              padding: '32px 26px',
              boxShadow: 'var(--elev-2)',
              border: '1px solid var(--au-line)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 14, color: 'var(--au-ink-3)', margin: '0 0 6px' }}>{t('membership.checkout_opening', lang)}</p>
            <h2 style={{ fontFamily: 'var(--au-serif)', fontSize: 26, fontWeight: 700, color: 'var(--au-ink-1)', margin: '0 0 20px' }}>
              {t('membership.checkout_tier_title', lang, { tier: tierLabel })}
            </h2>

            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--au-pink-deep)', marginBottom: 4 }}>
              {CURRENCY_SYMBOL}{fmtMoney(order.amount)}
            </div>
            <p style={{ fontSize: 12, color: 'var(--au-ink-3)', margin: '0 0 24px' }}>{t('membership.amount_due', lang)}</p>

            {/* 占位二维码：真渠道接入后换成网关二维码 */}
            <div
              aria-hidden
              style={{
                width: 200, height: 200, margin: '0 auto 10px',
                borderRadius: 16,
                border: '2px dashed var(--au-line)',
                background: 'repeating-linear-gradient(45deg, var(--au-bg) 0 10px, transparent 10px 20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--au-ink-3)', fontSize: 13, fontWeight: 600, textAlign: 'center', lineHeight: 1.6,
              }}
            >
              {t('membership.mock_cashier_1', lang)}<br />{t('membership.mock_cashier_2', lang)}
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--au-ink-3)', margin: '0 0 24px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={13} /> {t('membership.mock_hint', lang)}
            </p>

            {err && <p style={{ color: 'var(--color-danger, #d9534f)', fontSize: 13, margin: '0 0 12px' }}>{err}</p>}

            <button
              className="mb-cta"
              onClick={handlePaid}
              disabled={paying}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(150deg, #ff9dbb, #ff7fa8)', color: '#fff',
                boxShadow: '0 6px 16px oklch(70% 0.14 10 / 0.32)',
                opacity: paying ? 0.7 : 1,
              }}
            >
              {paying ? <><Loader2 size={16} className="mb-spin" /> {t('membership.opening', lang)}</> : t('membership.i_paid', lang)}
            </button>
            <button
              onClick={() => router.push('/membership')}
              disabled={paying}
              style={{
                width: '100%', marginTop: 10, padding: '10px', background: 'none', border: 'none',
                color: 'var(--au-ink-3)', fontSize: 13, cursor: paying ? 'default' : 'pointer',
              }}
            >
              {t('membership.cancel', lang)}
            </button>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes mb-spin { to { transform: rotate(360deg); } } .mb-spin { animation: mb-spin 0.8s linear infinite; }` }} />
    </div>
  );
}
