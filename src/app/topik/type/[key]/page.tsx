import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topikQuestionTypes } from '@/data/topikQuestionTypes';
import { topikTypeMetadata, topikTypeJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t as ti } from '@/lib/i18n';
import './topik-type-detail.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return topikQuestionTypes.map((t) => ({ key: t.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const { key } = await params;
  const t = topikQuestionTypes.find((x) => x.key === key);
  if (!t) return { title: 'TOPIK 题型未找到' };
  return topikTypeMetadata(t);
}

const SECTION_KEY = { listening: 'ttype.sec_listening', reading: 'ttype.sec_reading' } as const;
const LEVEL_KEY = { beginner: 'ttype.level_beginner', intermediate: 'ttype.level_intermediate', advanced: 'ttype.level_advanced' } as const;
const LEVEL_BAND = { beginner: 'I', intermediate: 'II', advanced: 'II' } as const;

export default async function TopikTypeDetailPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const t = topikQuestionTypes.find((x) => x.key === key);
  if (!t) notFound();

  const lang = await getServerLang();
  const jsonLd = topikTypeJsonLd(t);
  const band = LEVEL_BAND[t.level];
  const sec = ti(SECTION_KEY[t.section], lang);
  const levelLabel = ti(LEVEL_KEY[t.level], lang);
  // 数据自带英文字段：en 时取 xEn，缺失回退中文
  const label = lang === 'en' ? (t.labelZhEn ?? t.labelZh) : t.labelZh;
  const officialNo = lang === 'en' ? (t.officialNoEn ?? t.officialNo) : t.officialNo;
  const desc = lang === 'en' ? (t.descEn ?? t.desc) : t.desc;
  const tip = lang === 'en' ? (t.tipEn ?? t.tip) : t.tip;

  // 相关题型：同 section 同 level 的其他题型
  const related = topikQuestionTypes.filter((x) => x.key !== t.key && x.section === t.section && x.level === t.level).slice(0, 6);

  return (
    <div className="tt-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="tt-crumbs" aria-label={ti('a11y.breadcrumb', lang)}>
        <Link href="/">{ti('ttype.crumb_home', lang)}</Link>
        <span>›</span>
        <Link href="/topik">{ti('ttype.crumb_topik', lang)}</Link>
        <span>›</span>
        <span className="tt-crumb-current">{`TOPIK ${band} · ${sec}`}</span>
        <span>›</span>
        <span className="tt-crumb-current">{label}</span>
      </nav>

      <header className="tt-header">
        <div className="tt-badges">
          <span className={`tt-badge tt-badge-${t.level}`}>{levelLabel}</span>
          <span className="tt-badge tt-badge-sec">{sec}</span>
          <span className="tt-badge">{officialNo}</span>
        </div>
        <h1 className="tt-title">
          <span className="tt-title-zh">{label}</span>
          <span className="tt-title-ko">{t.labelKo}</span>
        </h1>
      </header>

      <section className="tt-section">
        <h2 className="tt-h2">{ti('ttype.sec_what', lang)}</h2>
        <p className="tt-body">{desc}</p>
      </section>

      <section className="tt-section">
        <h2 className="tt-h2">{ti('ttype.sec_tips', lang)}</h2>
        <div className="tt-tip">💡 {tip}</div>
      </section>

      <section className="tt-section">
        <h2 className="tt-h2">{ti('ttype.sec_range', lang)}</h2>
        <ul className="tt-facts">
          <li><strong>{ti('ttype.fact_exam', lang)}</strong>TOPIK {band}（{levelLabel}）</li>
          <li><strong>{ti('ttype.fact_section', lang)}</strong>{sec}</li>
          <li><strong>{ti('ttype.fact_no', lang)}</strong>{officialNo}</li>
          <li><strong>{ti('ttype.fact_ko', lang)}</strong>{t.labelKo}</li>
        </ul>
      </section>

      {related.length > 0 && (
        <section className="tt-section">
          <h2 className="tt-h2">{ti('ttype.sec_related', lang)}</h2>
          <ul className="tt-related">
            {related.map((r) => (
              <li key={r.key}>
                <Link href={`/topik/type/${r.key}`} className="tt-related-item">
                  <span className="tt-related-name">{lang === 'en' ? (r.labelZhEn ?? r.labelZh) : r.labelZh}</span>
                  <span className="tt-related-no">{lang === 'en' ? (r.officialNoEn ?? r.officialNo) : r.officialNo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="tt-section tt-cta">
        <p className="tt-cta-text">{ti('ttype.cta_text', lang)}</p>
        <Link href={`/topik/practice/${t.key}`} className="tt-cta-btn">{ti('ttype.cta_btn', lang)}</Link>
      </section>
    </div>
  );
}
