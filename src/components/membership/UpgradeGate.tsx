'use client';

// 内容墙遮罩：锁定内容时盖一层模糊 + 会员引导，点按跳定价页。
// 用法一：包裹（children 被模糊+禁点，上盖 CTA）——用于卡片/区块。
// 用法二：locked=false 时透明直出 children——调用方无需自己判空。

import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { type Tier } from '@/lib/membership-benefits';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  locked: boolean;
  children: React.ReactNode;
  // 达到哪个档位可解锁（决定文案），默认 monthly
  requiredTier?: Tier;
  // 简短说明，如「订阅会员解锁全部 90 天」
  hint?: string;
  // 遮罩最小高度（包裹很矮的内容时用），默认自适应
  minHeight?: number;
}

export function UpgradeGate({ locked, children, requiredTier = 'monthly', hint, minHeight }: Props) {
  const router = useRouter();
  const { lang } = useLang();
  if (!locked) return <>{children}</>;

  return (
    <div style={{ position: 'relative', minHeight }}>
      {/* 被锁内容：模糊 + 禁交互 + 降饱和，仍透出轮廓当预览 */}
      <div
        aria-hidden
        style={{
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.55,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {children}
      </div>

      {/* 遮罩 CTA */}
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 10, padding: '20px 16px', textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(255,251,247,0.35), rgba(255,251,247,0.72))',
          borderRadius: 16,
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-surface-2, #fff)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }}
        >
          <Lock size={20} style={{ color: 'var(--pink-primary, #ff7fa8)' }} />
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1, #241917)' }}>
          {t(`upgate.exclusive.${requiredTier}`, lang)}
        </p>
        {hint && (
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--color-ink-3, #89756e)', lineHeight: 1.5, maxWidth: 260 }}>
            {hint}
          </p>
        )}
        <button
          onClick={() => router.push('/membership')}
          style={{
            marginTop: 4, padding: '9px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(150deg, #ff9dbb, #ff7fa8)',
            boxShadow: '0 5px 15px rgba(255,127,168,0.32)',
          }}
        >
          {t('upgate.unlock', lang)}
        </button>
      </div>
    </div>
  );
}
