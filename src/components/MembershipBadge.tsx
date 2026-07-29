'use client';

// 会员档位徽标：付费档显示彩色档位标（点击进会员中心），免费档显示"升级"钩子（点击进定价页）。
// 数据由调用方传入 tier（各页已 fetch /api/membership/me），本组件不自己请求。

import { useRouter } from 'next/navigation';
import { Crown, Sparkles } from 'lucide-react';
import { type Tier } from '@/lib/membership-benefits';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 各付费档配色（明暗通用，用半透明底 + 强调色字）
const TIER_STYLE: Record<Exclude<Tier, 'free'>, { bg: string; fg: string }> = {
  monthly:  { bg: 'color-mix(in oklch, var(--color-pink-strong) 16%, transparent)',   fg: 'var(--color-pink-strong)' },
  yearly:   { bg: 'color-mix(in oklch, var(--color-gold-strong) 20%, transparent)',   fg: 'var(--color-gold-strong)' },
  lifetime: { bg: 'color-mix(in oklch, var(--color-purple-strong) 18%, transparent)', fg: 'var(--color-purple-strong)' },
};

export default function MembershipBadge({ tier, size = 'md' }: { tier: Tier; size?: 'sm' | 'md' }) {
  const router = useRouter();
  const { lang } = useLang();
  const sm = size === 'sm';
  const pad = sm ? '3px 9px' : '5px 13px';
  const fs = sm ? 11.5 : 13.5;
  const icon = sm ? 12 : 15;

  if (tier === 'free') {
    return (
      <button
        type="button"
        onClick={() => router.push('/membership')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
          padding: pad, borderRadius: 999,
          background: 'color-mix(in oklch, var(--color-pink-strong) 12%, transparent)',
          color: 'var(--color-pink-strong)',
          border: '1px solid color-mix(in oklch, var(--color-pink-strong) 30%, transparent)',
          fontSize: fs, fontWeight: 700, cursor: 'pointer', lineHeight: 1.35,
        }}
      >
        <Sparkles size={icon} /> {t('mbadge.upgrade', lang)}
      </button>
    );
  }

  const s = TIER_STYLE[tier];
  return (
    <button
      type="button"
      onClick={() => router.push('/mine/membership')}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
        padding: pad, borderRadius: 999,
        background: s.bg, color: s.fg, border: 'none',
        fontSize: fs, fontWeight: 800, cursor: 'pointer', lineHeight: 1.35,
      }}
    >
      <Crown size={icon} /> {t(`mbadge.tier.${tier}`, lang)}
    </button>
  );
}
