import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { levelWordLists, allEntriesById } from '@/data/vocabulary/vocab-data';
import { vocabularyLevelMetadata, vocabularyLevelJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return levelWordLists.map((l) => ({ level: String(l.level) }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const n = parseInt(level);
  const l = levelWordLists.find((x) => x.level === n);
  if (!l) return { title: 'TOPIK 词表未找到' };
  return vocabularyLevelMetadata(l);
}

function SeoShell({ level, lang }: { level: number; lang: 'zh' | 'en' }) {
  const l = levelWordLists.find((x) => x.level === level);
  if (!l) return null;
  const words = l.wordIds.map((wid) => allEntriesById.get(wid)).filter(Boolean);
  const jsonLd = vocabularyLevelJsonLd(l);
  const band = level <= 2 ? 'I' : 'II';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only" aria-hidden="true">
        <nav aria-label={t('a11y.breadcrumb', lang)}>
          <Link href="/">首页</Link> ›{' '}
          <Link href="/vocabulary">韩语词汇</Link> ›{' '}
          <Link href="/vocabulary/library?tab=levels">TOPIK 词表</Link> ›{' '}
          <span>TOPIK {level}级</span>
        </nav>
        <h1>TOPIK {level}级韩语词汇表 · TOPIK {band} · 核心 {l.totalCount} 词</h1>
        <p>本表覆盖 TOPIK {band} {level}级考试常考核心词汇 {l.totalCount} 个，收录发音、词性、例句与场景标签，适合备考与日常拓展词汇量。</p>

        <h2>词汇列表（{words.length}词）</h2>
        <ul>
          {words.map((w) => w && (
            <li key={w.id}>
              <strong className="ko-text">{w.korean}</strong>
              <span>[{w.romanization}]</span>
              <span>{w.partOfSpeech}</span>
              <span>{w.meanings.map((m) => m.chinese).join('；')}</span>
              {w.examples[0] && (
                <span>例：{w.examples[0].korean} — {w.examples[0].chinese}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default async function LevelLayout({ children, params }: { children: React.ReactNode; params: Promise<{ level: string }> }) {
  const { level } = await params;
  const n = parseInt(level);
  if (isNaN(n) || !levelWordLists.find((x) => x.level === n)) notFound();
  const lang = await getServerLang();
  return (
    <>
      <SeoShell level={n} lang={lang} />
      {children}
    </>
  );
}
