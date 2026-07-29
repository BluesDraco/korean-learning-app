'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { AchievementWall } from '@/components/achievement/AchievementWall';
import '../mine/mine-home.css';

export default function AchievementPage() {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { lang } = useLang();
  return (
    <div className="mine-scope mine-bg">
    <div className="py-4 mx-auto" style={{ maxWidth: isDesktop ? 1200 : undefined, width: '100%', paddingLeft: 'clamp(16px,4vw,40px)', paddingRight: 'clamp(16px,4vw,40px)' }}>
      <button
        onClick={() => router.push('/mine')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--au-ink-2)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: 6 }}
      >
        <ArrowLeft size={15} /> {t('mine.back', lang)}
      </button>
      <AchievementWall layout={isDesktop ? 'desktop' : 'mobile'} />
    </div>
    </div>
  );
}
