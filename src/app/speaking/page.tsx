'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { PracticeSubRail } from '../practice/PracticeSubRail';
import '../practice/practice-redesign.css';
import '../practice/practice-flow.css';

interface SubMode {
  [k: string]: unknown;
  num: string;
  en: string;
  name: string;
  kr: string;
  desc: string;
}

const SUBS: SubMode[] = [
  {
    num: '01',
    en: 'Say Korean',
    name: 'sp.say_name',
    kr: '한국어로 말하기',
    desc: 'sp.say_desc',
  },
  {
    num: '02',
    en: 'Shadow',
    name: 'sp.shadow_name',
    kr: '섀도잉',
    desc: 'sp.shadow_desc',
  },
  {
    num: '03',
    en: 'Retell',
    name: 'sp.retell_name',
    kr: '요약 말하기',
    desc: 'sp.retell_desc',
  },
];

const HREF_MAP: Record<string, string> = {
  '01': '/speaking/say',
  '02': '/speaking/shadow',
  '03': '/speaking/retell',
};

export default function SpeakingIndexPage() {
  const smartBack = useSmartBack('/practice');
  const router = useRouter();
  const { lang } = useLang();

  const handleClick = (num: string) => {
    const href = HREF_MAP[num];
    if (href) router.push(href);
  };

  return (
    <div className="pr-scope">
      <div className="hr-stage" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="hr-mobile-back" style={{ display: 'block' }}>
          <button
            className="hr-mobile-back-btn"
            onClick={smartBack}
            aria-label={t('sp.back_to_practice', lang)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowLeft size={14} /> {t('sp.back_to_practice', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">말하기</div>
            <div className="hr-brand-sub">{t('sp.hub_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('sp.hub_tagline', lang)}</div>
        </header>

        <div className="pr-hub-layout">
          <div className="pr-hub-col">
            <div className="pr-sub-list" role="list" aria-label={t('sp.hub_list_aria', lang)}>
              {SUBS.map(s => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => handleClick(s.num)}
                  className="pr-sub-card mint"
                  role="listitem"
                  aria-label={t('sp.hub_enter', lang, { name: t(s.name, lang) })}
                  style={{ font: 'inherit', textAlign: 'left', cursor: 'pointer' }}
                >
                  <div className="pr-sub-num" aria-hidden>{s.num}</div>
                  <div className="pr-sub-body">
                    <span className="pr-sub-en">{s.en}</span>
                    <span className="pr-sub-name">{t(s.name, lang)}</span>
                    <span className="pr-sub-kr">{s.kr}</span>
                    <p className="pr-sub-desc">{t(s.desc, lang)}</p>
                  </div>
                  <ChevronRight size={20} className="pr-sub-arrow" aria-hidden />
                </button>
              ))}
            </div>
          </div>
          <PracticeSubRail mode="listening" chipLabel="mint" />
        </div>
      </div>
    </div>
  );
}
