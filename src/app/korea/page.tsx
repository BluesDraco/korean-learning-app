'use client';

import { Film } from 'lucide-react';
import { PageHeader, Section, EntryCard } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { useSmartBack } from '@/lib/useSmartBack';
import { t } from '@/lib/i18n';

const KOREA_ENTRIES = [
  { Icon: Film,      label: 'korea.entry_drama_label',   desc: 'korea.entry_drama_desc',   href: '/korea/drama',   tone: 'purple' as const },
];

export default function KoreaHubPage() {
  const { lang } = useLang();
  const smartBack = useSmartBack('/explore');
  return (
    <div className="py-4 max-w-2xl md:max-w-none mx-auto">
      <PageHeader
        eyebrow="한국"
        title={t('korea.title', lang)}
        subtitle={t('korea.subtitle', lang)}
        tone="peach"
        onBack={smartBack}
      />

      <Section title={t('korea.section_by_topic', lang)} spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
          {KOREA_ENTRIES.map(({ Icon, label, desc, href, tone }) => (
            <EntryCard
              key={href}
              href={href}
              icon={<Icon size={20} strokeWidth={1.75} />}
              label={t(label, lang)}
              detail={t(desc, lang)}
              tone={tone}
              layout="block"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
