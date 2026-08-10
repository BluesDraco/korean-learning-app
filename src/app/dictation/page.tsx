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
  num: string;
  en: string;
  name: string;
  kr: string;
  desc: string;
}

const SUBS: SubMode[] = [
  { num: '01', en: 'Word',      name: 'dict.word_name', kr: '단어 받아쓰기', desc: 'dict.word_desc' },
  { num: '02', en: 'Sentence',  name: 'dict.sentence_name', kr: '문장 받아쓰기', desc: 'dict.sentence_desc' },
  { num: '03', en: 'Mistakes',  name: 'dict.mistakes_name', kr: '오답 노트',     desc: 'dict.mistakes_desc' },
];

const HREF_MAP: Record<string, string> = {
  '01': '/dictation/word',
  '02': '/dictation/sentence',
  '03': '/dictation/mistakes',
};

export default function DictationIndexPage() {
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
            <div className="hr-brand-kr">받아쓰기</div>
            <div className="hr-brand-sub">{t('dict.hub_kr_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('dict.hub_tagline', lang)}</div>
        </header>

        <div className="pr-hub-layout">
          <div className="pr-hub-col">
            <div className="pr-sub-list" role="list" aria-label={t('dict.hub_list_aria', lang)}>
              {SUBS.map(s => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => handleClick(s.num)}
                  className="pr-sub-card peach"
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
          <PracticeSubRail mode="dictation" chipLabel="peach" />
        </div>
      </div>
    </div>
  );
}
