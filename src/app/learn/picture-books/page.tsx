'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { pictureBooks, type PictureBook } from '@/data/pictureBooks';
import { getAllProgress, type PBProgress } from '@/lib/pictureBookProgress';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './picbook.css';

const LEVELS: { key: PictureBook['level']; badgeClass: string; lvlClass: string; titleKey: string; badgeKey: string }[] = [
  { key: 'beginner', badgeClass: 'pb-badge-beg', lvlClass: 'pb-lvl-beg', titleKey: 'pb.shelf_beg', badgeKey: 'pb.shelf_beg_badge' },
  { key: 'intermediate', badgeClass: 'pb-badge-int', lvlClass: 'pb-lvl-int', titleKey: 'pb.shelf_int', badgeKey: 'pb.shelf_int_badge' },
];

export default function PictureBooksPage() {
  const { lang } = useLang();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, PBProgress>>({});
  useEffect(() => { setProgress(getAllProgress()); }, []);

  return (
    <div className="pb-scope">
      <PlaceIntro place="picbooks" />
      <div className="pb-wrap">

        {/* HERO */}
        <div className="pb-hero">
          <button className="pb-hero-back" onClick={() => router.push('/explore')}>
            <ArrowLeft size={15} />
            {t('pb.back_list', lang)}
          </button>
          <div className="pb-hero-mark" aria-hidden>📖</div>
          <div className="pb-hero-txt">
            <span className="pb-hero-kicker">동물 도시 그림책관</span>
            <h1 className="pb-hero-title">{t('pb.hall_title', lang)}</h1>
            <p className="pb-hero-sub">{t('pb.hall_sub', lang)}</p>
          </div>
        </div>

        {/* 按分级分书架 */}
        {LEVELS.map((lv) => {
          const books = pictureBooks.filter((b) => b.level === lv.key);
          if (books.length === 0) return null;
          return (
            <section className="pb-section" key={lv.key}>
              <div className="pb-section-head">
                <span className="pb-section-title">{t(lv.titleKey, lang)}</span>
                <span className={`pb-section-badge ${lv.badgeClass}`}>{t(lv.badgeKey, lang)}</span>
                <span className="pb-section-count">{t('pb.shelf_count', lang, { n: books.length })}</span>
              </div>
              <div className="pb-shelf">
                {books.map((book) => {
                  const prog = progress[book.id];
                  const done = prog?.completed;
                  const resuming = !done && prog && prog.page > 0;
                  const go = () => router.push(`/learn/picture-books/${book.id}`);
                  return (
                    <div className="pb-book" key={book.id}>
                      <div className="pb-cover" onClick={go} role="button" tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }}>
                        {book.coverImage ? (
                          <Image src={book.coverImage} alt={book.title} fill sizes="(max-width:620px) 50vw, (max-width:900px) 33vw, 25vw"
                            className="object-cover" />
                        ) : (
                          <div className="pb-cover-fallback">{book.emoji}</div>
                        )}
                        {done && <span className="pb-stamp">✓ {t('pb.read_done', lang)}</span>}
                        {resuming && (
                          <div className="pb-progress">
                            <div className="pb-progress-fill" style={{ width: `${Math.round(((prog.page + 1) / book.pages.length) * 100)}%` }} />
                          </div>
                        )}
                        <div className="pb-cta">
                          <span className="pb-cta-btn">
                            {done ? t('pb.read_again', lang) : resuming ? t('pb.continue_reading', lang) : t('pb.start_reading', lang)}
                          </span>
                        </div>
                      </div>
                      <div className="pb-info">
                        <div className="pb-title-row">
                          <span className="pb-title">{book.title}</span>
                          <span className={`pb-lvl ${lv.lvlClass}`}>
                            {book.level === 'beginner' ? t('pb.level_beginner', lang) : t('pb.level_intermediate', lang)}
                          </span>
                        </div>
                        <p className="pb-desc">{book.description}</p>
                        <div className="pb-meta">
                          <span className="pb-pages">
                            {resuming ? t('pb.reading_page', lang, { cur: prog.page + 1, total: book.pages.length }) : t('pb.total_pages', lang, { n: book.pages.length })}
                          </span>
                          <span className="pb-resume" onClick={go} role="button" tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }}>
                            {done ? t('pb.read_again', lang) : resuming ? t('pb.continue', lang) : t('pb.start_reading', lang)} →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <p className="pb-colophon">{t('pb.more_coming', lang)}</p>
      </div>
    </div>
  );
}
