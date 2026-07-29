import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { grammarPoints } from '@/data/grammar';
import { grammarLibraryMetadata, grammarLibraryJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';
import { ExampleSpeakerButton } from './ExampleSpeakerButton';
import './grammar-library-detail.css';

export const dynamicParams = true;

export function generateStaticParams() {
  return grammarPoints.map((gp) => ({ id: gp.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const gp = grammarPoints.find((g) => g.id === id);
  if (!gp) return { title: '语法点未找到' };
  return grammarLibraryMetadata(gp);
}

const LEVEL_KEY: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'glib.level_beginner',
  intermediate: 'glib.level_intermediate',
  advanced: 'glib.level_advanced',
};

export default async function GrammarLibraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gp = grammarPoints.find((g) => g.id === id);
  if (!gp) notFound();

  const lang = await getServerLang();
  const jsonLd = grammarLibraryJsonLd(gp);
  const related = gp.similarPatterns
    ? grammarPoints.filter((g) => g.id !== gp.id && gp.similarPatterns!.some((sp) => g.pattern.includes(sp) || sp.includes(g.pattern)))
    : [];

  return (
    <div className="gl-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="gl-crumbs" aria-label={t('a11y.breadcrumb', lang)}>
        <Link href="/">{t('glib.crumb_home', lang)}</Link>
        <span>›</span>
        <Link href="/grammar">{t('glib.crumb_grammar', lang)}</Link>
        <span>›</span>
        <Link href="/grammar?tab=library">{t('glib.crumb_library', lang)}</Link>
        <span>›</span>
        <span className="gl-crumb-current">{gp.pattern}</span>
      </nav>

      <header className="gl-header">
        <div className="gl-badges">
          <span className={`gl-badge gl-badge-${gp.level}`}>{t(LEVEL_KEY[gp.level], lang)}</span>
          <span className="gl-badge gl-badge-topik">{gp.topik}</span>
          <span className="gl-badge gl-badge-cat">{gp.category}</span>
        </div>
        <h1 className="gl-title">
          <span className="gl-pattern">{gp.pattern}</span>
          <span className="gl-title-sub">{gp.title}</span>
        </h1>
        <p className="gl-usage">{gp.usage}</p>
      </header>

      <section className="gl-section">
        <h2 className="gl-h2">{t('glib.sec_explanation', lang)}</h2>
        <p className="gl-body">{gp.explanation}</p>
      </section>

      {gp.conjugation && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.sec_conjugation', lang)}</h2>
          <pre className="gl-conjugation">{gp.conjugation}</pre>
        </section>
      )}

      {gp.examples && gp.examples.length > 0 && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.sec_examples', lang, { n: gp.examples.length })}</h2>
          <ul className="gl-list">
            {gp.examples.map((ex, i) => (
              <li key={i} className="gl-example">
                <div className="gl-ko-row">
                  <div className="gl-ko">{ex.ko}</div>
                  <ExampleSpeakerButton text={ex.ko} />
                </div>
                <div className="gl-zh">{ex.zh}</div>
                {ex.note && <div className="gl-note">💡 {ex.note}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {gp.similarPatterns && gp.similarPatterns.length > 0 && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.sec_similar', lang)}</h2>
          <div className="gl-similar-chips">
            {gp.similarPatterns.map((sp, i) => (
              <span key={i} className="gl-chip">{sp}</span>
            ))}
          </div>
          {gp.difference && <p className="gl-diff">{gp.difference}</p>}
        </section>
      )}

      {gp.toriTip && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.sec_tip', lang)}</h2>
          <div className="gl-tori-tip">{gp.toriTip}</div>
        </section>
      )}

      {gp.exercises && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.sec_exercises', lang)}</h2>

          {gp.exercises.mcq && gp.exercises.mcq.length > 0 && (
            <div className="gl-ex-block">
              <h3 className="gl-h3">{t('glib.ex_mcq', lang)}</h3>
              <ol className="gl-ex-list">
                {gp.exercises.mcq.map((q, i) => (
                  <li key={i} className="gl-ex-item">
                    <div className="gl-q">{q.question}</div>
                    <ul className="gl-opts">
                      {q.options.map((opt, oi) => (
                        <li key={oi} className={oi === q.correctIdx ? 'gl-opt gl-opt-correct' : 'gl-opt'}>
                          {String.fromCharCode(65 + oi)}. {opt}
                          {oi === q.correctIdx && <span className="gl-opt-badge">{t('glib.correct', lang)}</span>}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {gp.exercises.fillBlank && gp.exercises.fillBlank.length > 0 && (
            <div className="gl-ex-block">
              <h3 className="gl-h3">{t('glib.ex_fill', lang)}</h3>
              <ol className="gl-ex-list">
                {gp.exercises.fillBlank.map((q, i) => (
                  <li key={i} className="gl-ex-item">
                    <div className="gl-q">{q.sentence}</div>
                    <div className="gl-ex-ans">{t('glib.answer', lang)}<strong>{q.answer}</strong>｜<span className="gl-hint">{q.hint}</span></div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {gp.exercises.sentenceCreate && gp.exercises.sentenceCreate.length > 0 && (
            <div className="gl-ex-block">
              <h3 className="gl-h3">{t('glib.ex_sentence', lang)}</h3>
              <ol className="gl-ex-list">
                {gp.exercises.sentenceCreate.map((q, i) => (
                  <li key={i} className="gl-ex-item">
                    <div className="gl-q">{q.prompt}</div>
                    <div className="gl-hint">💡 {t('glib.reference', lang)}{q.hint}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}

      {related.length > 0 && (
        <section className="gl-section">
          <h2 className="gl-h2">{t('glib.related', lang)}</h2>
          <ul className="gl-related">
            {related.slice(0, 6).map((r) => (
              <li key={r.id}>
                <Link href={`/grammar/library/${r.id}`} className="gl-related-item">
                  <span className="gl-related-pattern">{r.pattern}</span>
                  <span className="gl-related-title">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="gl-section gl-cta">
        <p className="gl-cta-text">{t('glib.cta_text', lang)}</p>
        <Link href="/grammar" className="gl-cta-btn">{t('glib.cta_btn', lang)}</Link>
      </section>
    </div>
  );
}
