'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Crown, ArrowLeft, Infinity as InfinityIcon, ShieldCheck, RotateCcw, Smartphone, ArrowRight, X, Gift, Truck, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import {
  CURRENCY_SYMBOL, EDITION, MEMBERSHIP_PAUSED, translateBenefitText,
  type Tier, type BenefitGroup, type BenefitMatrix, type BenefitValue, type TierPricing,
} from '@/lib/membership-benefits';
import { MEMBERSHIP_CSS } from './membership.css';

interface BenefitsResponse {
  groups: BenefitGroup[];
  tiers: Tier[];
  tierLabels: Record<Tier, string>;
  pricing: Record<Tier, TierPricing>;
  promoDeadline: string;
  promoActive: boolean;
  matrix: BenefitMatrix;
}

// '2026-08-31' → '8.31'（横幅展示用，去掉年份和前导零）
function fmtDeadline(iso: string): string {
  const m = /^\d{4}-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${Number(m[1])}.${Number(m[2])}`;
}

const TIER_TAGLINE: Record<Tier, string> = {
  free: 'membership.tagline_free',
  monthly: 'membership.tagline_monthly',
  yearly: 'membership.tagline_yearly',
  lifetime: 'membership.tagline_lifetime',
};

// 档位高低（与后端 checkout 防降级规则一致）：free < 月 < 年 < 永久
const TIER_RANK: Record<Tier, number> = { free: 0, monthly: 1, yearly: 2, lifetime: 3 };

// 某档卡片相对当前档的按钮态
type CardState = 'normal' | 'current' | 'owned' | 'upgrade';

// 每档在卡片上重点展示的卖点（挑关键几条，完整对比看下方表格）
const TIER_HIGHLIGHTS: Record<Tier, string[]> = {
  free: ['membership.hl_free_1', 'membership.hl_free_2', 'membership.hl_free_3'],
  monthly: ['membership.hl_monthly_1', 'membership.hl_monthly_2', 'membership.hl_monthly_3'],
  yearly: ['membership.hl_yearly_1', 'membership.hl_yearly_2', 'membership.hl_yearly_3'],
  lifetime: ['membership.hl_lifetime_1', 'membership.hl_lifetime_2', 'membership.hl_lifetime_3', 'membership.hl_lifetime_4'],
};

// 徽标话术分工：年度=最热门订阅，永久=买断长期最省（真·最超值）
const TIER_BADGE: Partial<Record<Tier, string>> = {
  yearly: 'membership.badge_popular',
  lifetime: 'membership.badge_bestvalue',
};

// 永久档「创始人尊享礼盒」实物清单（内容与 docs/2026-07-22-invite-referral-plan.html 尊享版一致）
const GIFT_ITEMS: { emoji: string; name: string; desc: string }[] = [
  { emoji: '🧸', name: 'membership.gift_1_name', desc: 'membership.gift_1_desc' },
  { emoji: '✉️', name: 'membership.gift_2_name', desc: 'membership.gift_2_desc' },
  { emoji: '🎨', name: 'membership.gift_3_name', desc: 'membership.gift_3_desc' },
  { emoji: '🔑', name: 'membership.gift_4_name', desc: 'membership.gift_4_desc' },
  { emoji: '🎫', name: 'membership.gift_5_name', desc: 'membership.gift_5_desc' },
];
const GIFT_TOTAL = 118;   // 礼盒实物参考价值（元），仅国内
const COBUILD_VALUE = 50; // 产品共建特权折算价值（元），国内
// 国内永久反算：礼盒 + 共创，合计价值（元）
const LIFETIME_PERK_VALUE = GIFT_TOTAL + COBUILD_VALUE;
// 海外永久反算：无实体礼盒，仅共创特权溢价（美元，.99 心理价）
const COBUILD_VALUE_USD = 7.99;

// 金额格式化：整数不带小数($60/¥99)，否则保留必要小数($3.99/¥9.9)
function fmtMoney(cents: number): string {
  const v = cents / 100;
  if (cents % 100 === 0) return v.toFixed(0);
  if (cents % 10 === 0) return v.toFixed(1);
  return v.toFixed(2);
}

function priceMain(p: TierPricing, lang: Lang): { big: string; unit: string } {
  if (p.price == null) return { big: `${CURRENCY_SYMBOL}0`, unit: '' };
  const shown = p.promo ?? p.price;
  const unit = p.originLabel?.includes('/年') ? t('membership.unit_first_year', lang)
    : p.originLabel?.includes('/月') ? t('membership.unit_first_month', lang)
    : '';
  return { big: `${CURRENCY_SYMBOL}${fmtMoney(shown)}`, unit };
}

// 首购折扣百分比（四舍五入整数）：(常规价 - 促销价) / 常规价 * 100
function discountPct(p: TierPricing): number | null {
  if (p.price == null || p.promo == null || p.price <= 0) return null;
  const pct = Math.round((1 - p.promo / p.price) * 100);
  return pct > 0 ? pct : null;
}

// 年度按月折算文案（用促销价优先，回落常规价）
function monthlyEquiv(p: TierPricing, lang: Lang): string | null {
  const yearly = p.promo ?? p.price;
  if (yearly == null || !p.originLabel?.includes('/年')) return null;
  return t('membership.monthly_equiv', lang, { amount: `${CURRENCY_SYMBOL}${fmtMoney(Math.round(yearly / 12))}` });
}


export default function MembershipPricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const [data, setData] = useState<BenefitsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [curTier, setCurTier] = useState<Tier>('free');
  const [curExpiry, setCurExpiry] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/membership/benefits');
        if (res.ok) setData(await res.json());
        else setLoadError(true);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 已登录：拉当前档位，让卡片能区分「续费/已含/升级」
  useEffect(() => {
    if (!user) { setCurTier('free'); return; }
    const controller = new AbortController();
    fetch('/api/membership/me', { signal: controller.signal, cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d?.tier) { setCurTier(d.tier); setCurExpiry(typeof d.expiry === 'number' ? d.expiry : null); } })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  const [choosing, setChoosing] = useState<Tier | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // 该档卡片相对当前档的状态（未登录一律 normal，引导登录购买）
  const cardStateOf = (tier: Tier): CardState => {
    if (!user || tier === 'free') return 'normal';
    if (tier === curTier) return 'current';
    if (TIER_RANK[tier] < TIER_RANK[curTier]) return 'owned';
    return 'upgrade';
  };

  // 试用用户（月付 + 到期 ≤4 天）：当前月付卡仍显示升级引导而非续费
  const isTrial = curTier === 'monthly' && curExpiry != null && curExpiry - Date.now() <= 4 * 24 * 60 * 60 * 1000;

  const handleChoose = async (tier: Tier) => {
    if (tier === 'free') { router.push('/daily'); return; }
    if (!user) { router.push(`/auth/login?redirect=${encodeURIComponent('/membership')}`); return; }
    if (choosing) return;

    const state = cardStateOf(tier);
    // 已拥有更高档 → 不能降级购买，直接进会员中心
    if (state === 'owned') {
      setNotice(t('membership.notice_higher_tier', lang));
      return;
    }
    // 永久档点自己 → 已是最高档，进会员中心查看权益
    if (state === 'current' && tier === 'lifetime') {
      router.push('/mine/membership');
      return;
    }

    setNotice(null);
    setChoosing(tier);
    try {
      const res = await fetch('/api/membership/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      if (res.ok) {
        const { checkoutUrl } = await res.json();
        // Stripe 等外部收银台是绝对 URL，用整页跳转；mock 是站内路由
        if (/^https?:\/\//.test(checkoutUrl)) {
          window.location.href = checkoutUrl;
        } else {
          router.push(checkoutUrl);
        }
      } else {
        // 后端 409/400 等：把原因显示给用户，不再静默
        const msg = await res.json().catch(() => null);
        setNotice(msg?.error ?? t('membership.notice_open_failed', lang));
        setChoosing(null);
      }
    } catch {
      setNotice(t('membership.notice_network_error', lang));
      setChoosing(null);
    }
  };

  // 会员暂停期：普通用户看占位页；管理员绕过，进入真实会员入口测试
  if (MEMBERSHIP_PAUSED && user?.role !== 'admin') {
    return (
      <div className="mb-scope">
        <style dangerouslySetInnerHTML={{ __html: MEMBERSHIP_CSS }} />
        <div className="mb-paused-overlay">
          <div className="mb-paused-card">
            <span className="mb-paused-emoji" aria-hidden>🐰</span>
            <h2 className="mb-paused-title">{t('membership.paused_title', lang)}</h2>
            <p className="mb-paused-desc">{t('membership.paused_desc', lang)}</p>
            <button className="mb-paused-cta" onClick={() => router.push('/daily')}>
              {t('membership.paused_cta', lang)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-scope">
      <style dangerouslySetInnerHTML={{ __html: MEMBERSHIP_CSS }} />

      <header className="mb-topbar">
        <Link href="/daily" className="mb-back"><ArrowLeft size={18} /> {t('membership.back', lang)}</Link>
        <div className="mb-brand"><span className="mb-brand-en">Tori</span><span className="mb-brand-kr">토리네 한국어</span></div>
      </header>

      <section className="mb-hero">
        <span className="mb-eyebrow"><Crown size={15} /> {t('membership.eyebrow', lang)}</span>
        <h1 className="mb-h1">{t('membership.hero_title', lang)}</h1>
        <p className="mb-tagline">{t('membership.hero_line1', lang)}<br />{t('membership.hero_line2', lang)}</p>
        {data?.promoActive && (
          <div className="mb-promo-banner">
            <Sparkles size={15} />
            <span>{t('membership.promo_banner', lang, { date: fmtDeadline(data.promoDeadline) })}</span>
          </div>
        )}
      </section>

      {notice && (
        <div className="mb-notice" role="alert">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} aria-label={t('membership.close', lang)}><X size={15} /></button>
        </div>
      )}

      {loading || !data ? (
        loadError ? (
          <div className="mb-loading" style={{ color: 'var(--au-ink-2)' }}>
            <p>{t('membership.load_error', lang)}</p>
            <button className="mb-cta" style={{ maxWidth: 200, margin: '16px auto' }} onClick={() => { setLoadError(false); setLoading(true); window.location.reload(); }}>
              {t('membership.retry', lang)}
            </button>
          </div>
        ) : (
          <div className="mb-loading">{t('membership.loading', lang)}</div>
        )
      ) : (
        <>
          <section className="mb-cards">
            {data.tiers.map((tier) => {
              const p = data.pricing[tier];
              const { big, unit } = priceMain(p, lang);
              const badge = TIER_BADGE[tier];
              const state = cardStateOf(tier);
              return (
                <article key={tier} className={`mb-card tier-${tier}${badge ? ' is-rec' : ''}${state === 'current' ? ' is-current' : ''}${state === 'owned' ? ' is-owned' : ''}`}>
                  {state === 'current' ? <span className="mb-rec-badge mb-badge-current">{t('membership.badge_current', lang)}</span>
                    : badge ? <span className="mb-rec-badge">{t(badge, lang)}</span> : null}
                  <div className="mb-card-head">
                    <h3 className="mb-card-name">{data.tierLabels[tier]}</h3>
                    <p className="mb-card-tag">{t(TIER_TAGLINE[tier], lang)}</p>
                  </div>
                  <div className="mb-price">
                    <span className="mb-price-big">{big}</span>
                    <span className="mb-price-unit">{unit}</span>
                  </div>
                  {tier === 'lifetime' && data.promoActive && (
                    <div className="mb-price-badge-row">
                      <span className="mb-price-off">{t('membership.lifetime_founder_price', lang)}</span>
                    </div>
                  )}
                  <div className="mb-price-meta">
                    {(() => {
                      const pct = discountPct(p);
                      const equiv = monthlyEquiv(p, lang);
                      return (
                        <>
                          {/* 月/年：划线原价 + 折扣百分比红牌 */}
                          {tier !== 'lifetime' && pct != null && p.price != null && (
                            <span className="mb-price-line">
                              <span className="mb-price-was">{t('membership.origin_price', lang)} {p.originLabel}</span>
                              <span className="mb-price-off">-{pct}%</span>
                            </span>
                          )}
                          {/* 永久：只划线未来恢复价（红牌"限时创始价"已在价格右侧），8.31 后价涨到 ¥348、promoActive 关、此行消失 */}
                          {tier === 'lifetime' && data.promoActive && p.promo != null && (
                            <span className="mb-price-future"
                              dangerouslySetInnerHTML={{ __html: t('membership.lifetime_future_price', lang, { price: p.originLabel ?? '' }) }}
                            />
                          )}
                          {equiv && <span className="mb-price-equiv">{equiv}</span>}
                          {tier === 'lifetime' && (
                            <span className="mb-price-equiv mb-price-equiv-strong">{t('membership.lifetime_forever', lang)}</span>
                          )}
                          {tier === 'lifetime' && EDITION !== 'overseas' && (
                            <span className="mb-price-net"
                              dangerouslySetInnerHTML={{ __html: t('membership.lifetime_gift_extra', lang, { perk: `${CURRENCY_SYMBOL}${LIFETIME_PERK_VALUE}` }) }}
                            />
                          )}
                          {tier === 'lifetime' && EDITION === 'overseas' && (
                            <span className="mb-price-net"
                              dangerouslySetInnerHTML={{ __html: t('membership.lifetime_gift_extra_overseas', lang, { perk: `${CURRENCY_SYMBOL}${COBUILD_VALUE_USD}` }) }}
                            />
                          )}
                          {tier === 'free' && <span className="mb-price-origin">{t('membership.free_forever', lang)}</span>}
                        </>
                      );
                    })()}
                  </div>

                  <button className="mb-cta" onClick={() => handleChoose(tier)} disabled={choosing != null || state === 'owned'}>
                    {choosing === tier ? t('membership.cta_redirecting', lang)
                      : state === 'owned' ? t('membership.cta_included', lang)
                      : state === 'current' && isTrial ? t('membership.cta_open_now', lang)
                      : state === 'current' ? (tier === 'lifetime' ? t('membership.cta_view_benefits', lang) : t('membership.cta_renew', lang))
                      : state === 'upgrade' ? t('membership.cta_upgrade_to', lang, { tier: data.tierLabels[tier] })
                      : tier === 'free' ? t('membership.cta_start_free', lang) : tier === 'lifetime' ? t('membership.cta_own_once', lang) : t('membership.cta_open_now', lang)}
                  </button>

                  <ul className="mb-hl-list">
                    {TIER_HIGHLIGHTS[tier].map((h) => (
                      <li key={h}><Check size={15} className="mb-hl-check" /> {t(h, lang)}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </section>

          <div className="mb-trust">
            <span className="mb-trust-item"><ShieldCheck size={16} /> {t('membership.trust_secure', lang)}</span>
            <span className="mb-trust-item"><RotateCcw size={16} /> {t('membership.trust_progress', lang)}</span>
            <span className="mb-trust-item"><Smartphone size={16} /> {t('membership.trust_sync', lang)}</span>
          </div>

          <section className="mb-invite">
            <div className="mb-invite-ticket">
              <span className="mb-invite-fig">
                <Image src="/images/tori-hero-wave.webp" alt="Tori" width={56} height={56} />
              </span>
              <div className="mb-invite-body">
                <span className="mb-invite-kicker">{t('membership.invite_kicker', lang)}</span>
                <h3 className="mb-invite-h">{t('membership.invite_title', lang)}</h3>
                <p className="mb-invite-sub"
                  dangerouslySetInnerHTML={{ __html: t('membership.invite_sub', lang) }}
                />
              </div>
              <Link href="/invite/activity" className="mb-invite-cta">
                {t('membership.invite_cta', lang)} <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          {EDITION !== 'overseas' && (
          <section className="mb-gift">
            <div className="mb-gift-head">
              <p className="mb-gift-eyebrow"><Gift size={14} /> {t('membership.gift_eyebrow', lang)}</p>
              <h2 className="mb-gift-title">{t('membership.gift_title', lang)}</h2>
              <p className="mb-gift-sub">{t('membership.gift_sub', lang)}</p>
            </div>
            <div className="mb-gift-box">
              <ul className="mb-gift-list">
                {GIFT_ITEMS.map((it) => (
                  <li key={it.name} className="mb-gift-item">
                    <span className="mb-gift-emoji" aria-hidden>{it.emoji}</span>
                    <span className="mb-gift-info">
                      <span className="mb-gift-name">{t(it.name, lang)}</span>
                      <span className="mb-gift-desc">{t(it.desc, lang)}</span>
                    </span>
                    <Check size={16} className="mb-gift-tick" />
                  </li>
                ))}
              </ul>
              <div className="mb-gift-foot">
                <div className="mb-gift-value">
                  <span className="mb-gift-value-label">{t('membership.gift_value_label', lang)}</span>
                  <span className="mb-gift-value-num">{CURRENCY_SYMBOL}{GIFT_TOTAL}</span>
                  {(data.pricing.lifetime.promo ?? data.pricing.lifetime.price) != null && (
                    <span className="mb-gift-value-note">{t('membership.gift_value_note', lang, { price: `${CURRENCY_SYMBOL}${fmtMoney((data.pricing.lifetime.promo ?? data.pricing.lifetime.price)!)}` })}</span>
                  )}
                </div>
                <p className="mb-gift-ship"><Truck size={15} /> {t('membership.gift_ship', lang)}</p>
              </div>
            </div>
          </section>
          )}

          <section className="mb-compare">
            <div className="mb-compare-head">
              <p className="mb-compare-eyebrow">Compare Plans</p>
              <h2 className="mb-compare-title">{t('membership.compare_title', lang)}</h2>
              <p className="mb-compare-sub">{t('membership.compare_sub', lang)}</p>
            </div>
            <p className="mb-table-hint">{t('membership.table_swipe_hint', lang)}</p>
            <div className="mb-table-wrap">
              <table className="mb-table">
                <colgroup>
                  <col className="mb-col-name" />
                  {data.tiers.map((t) => (
                    <col key={t} className={TIER_BADGE[t] ? `mb-col-hl mb-col-${t}` : undefined} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th className="mb-th-name"><span className="mb-th-tier-name">{t('membership.th_benefit', lang)}</span></th>
                    {data.tiers.map((tr) => {
                      const p = data.pricing[tr];
                      const { big, unit } = priceMain(p, lang);
                      return (
                        <th key={tr} className={`tier-${tr}`}>
                          {TIER_BADGE[tr] && <span className="mb-th-star">{t(TIER_BADGE[tr]!, lang)}</span>}
                          <span className="mb-th-tier-name">{data.tierLabels[tr]}</span>
                          <span className="mb-th-tier-price">{tr === 'free' ? t('membership.th_free_forever', lang) : `${big}${unit}`}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.groups.map((group) => (
                    <GroupRows key={group.id} group={group} tiers={data.tiers} matrix={data.matrix} lang={lang} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-faq">
            <div className="mb-faq-head">
              <h2 className="mb-faq-title">{t('membership.faq_title', lang)}</h2>
            </div>
            <dl className="mb-faq-list">
              <div className="mb-faq-item">
                <dt className="mb-faq-q">{t('membership.faq_upgrade_q', lang)}</dt>
                <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_upgrade_a', lang) }} />
              </div>
              <div className="mb-faq-item">
                <dt className="mb-faq-q">{t('membership.faq_lifetime_q', lang)}</dt>
                <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t(EDITION === 'overseas' ? 'membership.faq_lifetime_a_overseas' : 'membership.faq_lifetime_a', lang) }} />
              </div>
              <div className="mb-faq-item">
                <dt className="mb-faq-q">{t('membership.faq_renew_q', lang)}</dt>
                <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_renew_a', lang) }} />
              </div>
              <div className="mb-faq-item">
                <dt className="mb-faq-q">{t('membership.faq_trial_q', lang)}</dt>
                <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_trial_a', lang) }} />
              </div>
              <div className="mb-faq-item">
                <dt className="mb-faq-q">{t('membership.faq_data_q', lang)}</dt>
                <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_data_a', lang) }} />
              </div>
              {EDITION === 'overseas' && (
                <>
                  <div className="mb-faq-item">
                    <dt className="mb-faq-q">{t('membership.faq_refund_q', lang)}</dt>
                    <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_refund_a', lang) }} />
                  </div>
                  <div className="mb-faq-item">
                    <dt className="mb-faq-q">{t('membership.faq_autorenew_q', lang)}</dt>
                    <dd className="mb-faq-a" dangerouslySetInnerHTML={{ __html: t('membership.faq_autorenew_a', lang) }} />
                  </div>
                </>
              )}
            </dl>
          </section>

          <footer className="mb-foot">
            <p>{t('membership.foot_upgrade', lang)}</p>
            <p className="mb-foot-wechat">{t('membership.foot_contact', lang)} <strong>13817498530</strong></p>
          </footer>
        </>
      )}
    </div>
  );
}

function GroupRows({ group, tiers, matrix, lang }: { group: BenefitGroup; tiers: Tier[]; matrix: BenefitMatrix; lang: Lang }) {
  return (
    <>
      <tr className="mb-group-row">
        <td colSpan={tiers.length + 1}>{t(`mine.mem_group_${group.id}`, lang)}</td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.id} className="mb-body-row">
          <td className="mb-td-name">{t(`mine.mem_row_${row.id}`, lang)}</td>
          {tiers.map((tr) => (
            <td key={tr} className={`mb-td-val${tr === 'yearly' ? ' tier-yearly' : ''}`}>
              <CellValue type={row.type} value={matrix[row.id]?.[tr]} lang={lang} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CellValue({ type, value, lang }: { type: BenefitGroup['rows'][number]['type']; value: BenefitValue | undefined; lang: Lang }) {
  if (type === 'bool') {
    return value === true
      ? <Check size={17} className="mb-cell-yes" />
      : <span className="mb-cell-no">—</span>;
  }
  if (type === 'quota') {
    if (value === -1) return <span className="mb-cell-inf"><InfinityIcon size={14} /> {t('membership.unlimited', lang)}</span>;
    if (value === 0) return <span className="mb-cell-no">—</span>;
    return <span className="mb-cell-num">{value}<span className="mb-cell-unit">{t('membership.per_day', lang)}</span></span>;
  }
  // content / text
  const s = typeof value === 'string' ? value : '';
  if (!s || s === '❌') return <span className="mb-cell-no">—</span>;
  return <span className="mb-cell-text">{translateBenefitText(s, lang)}</span>;
}
