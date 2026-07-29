'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Crown, Check, ArrowRight, User, PartyPopper, Clock, Infinity as InfinityIcon, Truck, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import {
  BENEFIT_GROUPS, EDITION, translateBenefitText, type Tier, type BenefitMatrix, type BenefitValue,
} from '@/lib/membership-benefits';
import { shouldRemind, daysUntil } from '@/lib/membership-reminder';
import { MEMBER_CENTER_CSS } from './membercenter.css';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import { fmtDate } from '@/lib/datetime';

const TIER_KICKER_KEY: Record<Tier, string> = {
  free: 'mine.mem_kicker_free',
  monthly: 'mine.mem_kicker_monthly',
  yearly: 'mine.mem_kicker_yearly',
  lifetime: 'mine.mem_kicker_lifetime',
};
const TIER_LABEL_KEY: Record<Tier, string> = {
  free: 'mine.mem_tier_free',
  monthly: 'mine.mem_tier_monthly',
  yearly: 'mine.mem_tier_yearly',
  lifetime: 'mine.mem_tier_lifetime',
};

// 会员卡权益要点（结构化，每条一行；比一段长描述更有节奏和尊贵感）
const TIER_POINT_KEYS: Record<Tier, string[]> = {
  free: ['mine.mem_pt_free_1', 'mine.mem_pt_free_2', 'mine.mem_pt_free_3'],
  monthly: ['mine.mem_pt_monthly_1', 'mine.mem_pt_monthly_2', 'mine.mem_pt_monthly_3'],
  yearly: ['mine.mem_pt_yearly_1', 'mine.mem_pt_yearly_2', 'mine.mem_pt_yearly_3'],
  // 境外无实体周边：末条去掉"定制周边"，只留产品共建
  lifetime: ['mine.mem_pt_lifetime_1', 'mine.mem_pt_lifetime_2', EDITION === 'overseas' ? 'mine.mem_pt_lifetime_3_overseas' : 'mine.mem_pt_lifetime_3'],
};

// 当前档位下，把矩阵值渲染成一句人话
function BenefitVal({ value, lang }: { value: BenefitValue | undefined; lang: Lang }) {
  if (value === true) return <span className="mc-ben-val yes"><Check size={15} /></span>;
  if (value === false || value === '' || value === '❌' || value == null)
    return <span className="mc-ben-val lock">—</span>;
  if (value === -1) return <span className="mc-ben-val inf"><InfinityIcon size={14} /> {t('mine.mem_infinite', lang)}</span>;
  if (typeof value === 'number') return <span className="mc-ben-val">{value}<span style={{ fontSize: 11, fontWeight: 400, opacity: 0.6 }}>{t('mine.mem_per_day', lang)}</span></span>;
  return <span className="mc-ben-val">{translateBenefitText(value, lang)}</span>;
}

export default function MemberCenterPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const justPaid = searchParams.get('paid') === '1';
  const [tier, setTier] = useState<Tier | null>(null);
  const [expiry, setExpiry] = useState<number | null>(null);
  const [matrix, setMatrix] = useState<BenefitMatrix | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [subscription, setSubscription] = useState<{ status: string; cancelAtPeriodEnd: boolean; currentPeriodEnd: number | null } | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/membership/me', { signal: controller.signal, cache: 'no-store' });
        if (res.ok) {
          const d = await res.json();
          setTier(d.tier);
          setExpiry(d.expiry);
          setMatrix(d.matrix ?? null);
          setSubscription(d.subscription ?? null);
        } else {
          setLoadError(true);
        }
      } catch { setLoadError(true); } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [user]);

  if (!user) {
    return (
      <div className="mc-scope py-4">
        <style dangerouslySetInnerHTML={{ __html: MEMBER_CENTER_CSS }} />
        <div className="mc-stage">
          <p className="mc-eyebrow"><Crown size={13} /> 멤버십</p>
          <h1 className="mc-title">{t('mine.mem_title', lang)}</h1>
          <div className="mc-guest">
            <User size={34} className="mc-guest-icon" />
            <h3 className="mc-guest-title">{t('mine.mem_guest_title', lang)}</h3>
            <p className="mc-guest-sub">{t('mine.mem_guest_sub', lang)}</p>
            <button className="mc-cta" style={{ maxWidth: 220, margin: '0 auto' }}
              onClick={() => router.push('/auth/login?redirect=/mine/membership')}>
              {t('mine.mem_guest_login', lang)} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const curTier = tier ?? 'free';
  const isFree = curTier === 'free';
  const isLifetime = curTier === 'lifetime';
  const showSubscription = EDITION === 'overseas' && !isFree && !isLifetime && subscription;

  const handleCancel = async () => {
    if (canceling) return;
    setCanceling(true);
    setCancelError(null);
    try {
      const res = await fetch('/api/membership/subscription/cancel', { method: 'POST' });
      if (res.ok) {
        const d = await res.json();
        setSubscription((s) => s ? { ...s, cancelAtPeriodEnd: true, currentPeriodEnd: d.currentPeriodEnd ?? s.currentPeriodEnd } : s);
      } else {
        const err = await res.json().catch(() => null);
        setCancelError(err?.error || t('mine.mem_sub_cancel_err', lang));
      }
    } catch {
      setCancelError(t('mine.mem_sub_cancel_err', lang));
    }
    setCanceling(false);
  };

  return (
    <div className="mc-scope py-4">
      <style dangerouslySetInnerHTML={{ __html: MEMBER_CENTER_CSS }} />

      {loading ? (
        <div className="mc-stage" style={{ textAlign: 'center', color: 'var(--au-ink-3)', padding: '60px 0' }}>{t('mine.mem_loading', lang)}</div>
      ) : loadError ? (
        <div className="mc-stage" style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ color: 'var(--au-ink-2)', margin: '0 0 16px' }}>{t('mine.mem_load_error', lang)}</p>
          <button className="mc-cta" style={{ maxWidth: 200, margin: '0 auto' }} onClick={() => { setLoadError(false); setLoading(true); window.location.reload(); }}>
            {t('mine.mem_retry', lang)}
          </button>
        </div>
      ) : (
        <div className="mc-stage">
          <p className="mc-eyebrow"><Crown size={13} /> 멤버십</p>
          <h1 className="mc-title">{t('mine.mem_title', lang)}</h1>

          {/* 状态提示 */}
          {justPaid && (
            <div className="mc-alert ok">
              <PartyPopper size={20} className="mc-alert-icon" />
              <div>
                <p className="mc-alert-title">{t('mine.mem_paid_title', lang)}</p>
                <p className="mc-alert-sub">{t('mine.mem_paid_sub', lang)}</p>
              </div>
            </div>
          )}
          {!justPaid && shouldRemind(curTier, expiry) && (
            <div className="mc-alert warn">
              <Clock size={20} className="mc-alert-icon" />
              <div>
                <p className="mc-alert-title">{t('mine.mem_expire_soon', lang, { n: Math.max(0, daysUntil(expiry) ?? 0) })}</p>
                <p className="mc-alert-sub">{t('mine.mem_renew_sub', lang)}</p>
              </div>
              <button className="mc-alert-cta" onClick={() => router.push('/membership')}>{t('mine.mem_renew', lang)}</button>
            </div>
          )}

          {/* 主网格：会员卡 + 操作 */}
          <div className="mc-grid">
            <div className={`mc-pass ${curTier}`}>
              <Crown size={132} className="mc-pass-watermark" strokeWidth={1.25} />
              <div className="mc-pass-head">
                <p className="mc-pass-kicker">{t(TIER_KICKER_KEY[curTier], lang)}</p>
                <p className="mc-pass-name">{t(TIER_LABEL_KEY[curTier], lang)}{t('mine.mem_name_suffix', lang)}</p>
              </div>
              <ul className="mc-pass-points">
                {TIER_POINT_KEYS[curTier].map((key) => (
                  <li key={key}><Check size={15} className="mc-pass-point-check" /> {t(key, lang)}</li>
                ))}
              </ul>
              <span className="mc-pass-meta">
                {isLifetime ? <><InfinityIcon size={14} /> {t('mine.mem_perpetual', lang)}</>
                  : expiry != null ? <><Clock size={14} /> {t('mine.mem_valid_until', lang, { date: fmtDate(expiry, lang) })}</>
                  : <><Crown size={14} /> {t('mine.mem_free_trial', lang)}</>}
              </span>
            </div>

            <div className="mc-side">
              <div className="mc-side-card">
                <h3 className="mc-side-title">{isFree ? t('mine.mem_upgrade_title', lang) : t('mine.mem_extend_title', lang)}</h3>
                <p className="mc-side-sub">
                  {isFree ? t('mine.mem_upgrade_sub', lang) : t('mine.mem_extend_sub', lang)}
                </p>
                <button className={`mc-cta${curTier === 'yearly' || isLifetime ? ' gold' : ''}`} onClick={() => router.push('/membership')}>
                  {isFree ? t('mine.mem_cta_view_plans', lang) : isLifetime ? t('mine.mem_cta_manage', lang) : t('mine.mem_cta_upgrade', lang)} <ArrowRight size={17} />
                </button>

                {showSubscription && (
                  <div className="mc-sub-box">
                    {subscription.cancelAtPeriodEnd ? (
                      <>
                        <AlertTriangle size={15} className="mc-sub-icon warn" />
                        <p className="mc-sub-msg">{t('mine.mem_sub_canceled', lang)}</p>
                        {subscription.currentPeriodEnd && (
                          <p className="mc-sub-date">{t('mine.mem_valid_until', lang, { date: fmtDate(subscription.currentPeriodEnd, lang) })}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <Check size={15} className="mc-sub-icon ok" />
                        <p className="mc-sub-msg">{t('mine.mem_sub_active', lang)}</p>
                        {subscription.currentPeriodEnd && (
                          <p className="mc-sub-date">{t('mine.mem_sub_next', lang, { date: fmtDate(subscription.currentPeriodEnd, lang) })}</p>
                        )}
                        <button className="mc-sub-cancel" onClick={handleCancel} disabled={canceling}>
                          {canceling ? <Loader2 size={13} className="animate-spin" /> : t('mine.mem_sub_cancel_btn', lang)}
                        </button>
                        {cancelError && <p className="mc-sub-err">{cancelError}</p>}
                      </>
                    )}
                  </div>
                )}
              </div>

              {isLifetime && (
                <div className="mc-side-card">
                  {/* 境外无实体礼盒：只显数字特权（共创+VIP）；境内显完整礼盒清单+发货 */}
                  {EDITION !== 'overseas' && (
                    <>
                      <h3 className="mc-side-title">{t('mine.mem_gift_title', lang)}</h3>
                      {['🧸','✉️','🎨','🔑','🎫'].map((emo, i) => (
                        <div key={i} className="mc-perk"><span className="mc-perk-emoji" aria-hidden>{emo}</span> {t(`mine.mem_gift_${i + 1}`, lang)}</div>
                      ))}
                      <p className="mc-perk-ship"><Truck size={14} /> {t('mine.mem_gift_ship', lang)}</p>
                      <div className="mc-perk-divider" />
                    </>
                  )}
                  {EDITION === 'overseas' && (
                    <h3 className="mc-side-title">{t('mine.mem_perpetual_perks', lang)}</h3>
                  )}
                  {[t('mine.mem_perk_devservice', lang), t('mine.mem_perk_vip', lang)].map((x) => (
                    <div key={x} className="mc-perk"><Check size={15} className="mc-perk-check" /> {x}</div>
                  ))}
                  <p className="mc-perk-note">{t('mine.mem_perk_note', lang)}</p>
                </div>
              )}
            </div>
          </div>

          {/* 我的权益（当前档位一览，来自权益矩阵） */}
          {matrix && (
            <div className="mc-benefits">
              <div className="mc-benefits-head">
                <h2 className="mc-benefits-title">{t('mine.mem_benefits_title', lang)}</h2>
                <span className="mc-benefits-hint">{t('mine.mem_benefits_hint', lang, { tier: t(TIER_LABEL_KEY[curTier], lang) })}</span>
              </div>
              <div className="mc-ben-groups">
                {BENEFIT_GROUPS.map((group) => (
                  <div key={group.id} className="mc-ben-group">
                    <p className="mc-ben-group-label">{t(`mine.mem_group_${group.id}`, lang)}</p>
                    {group.rows.map((row) => (
                      <div key={row.id} className="mc-ben-row">
                        <span className="mc-ben-name">{t(`mine.mem_row_${row.id}`, lang)}</span>
                        <BenefitVal value={matrix[row.id]?.[curTier]} lang={lang} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
