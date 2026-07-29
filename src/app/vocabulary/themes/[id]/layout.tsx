import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { themePacks, allEntriesById } from '@/data/vocabulary/vocab-data';
import { vocabularyThemeMetadata, vocabularyThemeJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return themePacks.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const theme = themePacks.find((t) => t.id === id);
  if (!theme) return { title: '主题词包未找到' };
  return vocabularyThemeMetadata(theme);
}

function SeoShell({ id, lang }: { id: string; lang: 'zh' | 'en' }) {
  const theme = themePacks.find((t) => t.id === id);
  if (!theme) return null;
  const words = theme.wordIds.map((wid) => allEntriesById.get(wid)).filter(Boolean);
  const jsonLd = vocabularyThemeJsonLd(theme);

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
          <Link href="/vocabulary/library?tab=themes">主题词包</Link> ›{' '}
          <span>{theme.name}</span>
        </nav>
        <h1>{theme.name} · 韩语{theme.category}主题词包</h1>
        {theme.description && <p>{theme.description}</p>}

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

        {theme.dialogues && theme.dialogues.length > 0 && (
          <>
            <h2>实景对话（{theme.dialogues.length}段）</h2>
            {theme.dialogues.map((d, di) => (
              <section key={di}>
                <h3>{d.title}</h3>
                {d.scene && <p>{d.scene}</p>}
                <ul>
                  {d.turns.map((t, ti) => (
                    <li key={ti}>
                      <strong>{t.speaker === 'me' ? '我' : '对方'}：</strong>
                      <span>{t.korean}</span>
                      <span>{t.chinese}</span>
                      {t.note && <em>{t.note}</em>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}

        {theme.pitfalls && theme.pitfalls.length > 0 && (
          <>
            <h2>使用雷区（{theme.pitfalls.length}个）</h2>
            <ul>
              {theme.pitfalls.map((p, i) => (
                <li key={i}>
                  <strong>{p.title}</strong>
                  {p.wrong && <span>别这么说：{p.wrong}</span>}
                  {p.right && <span>应该这么说：{p.right}</span>}
                  <p>{p.detail}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {theme.sentences.length > 0 && (
          <>
            <h2>场景句型（{theme.sentences.length}个）</h2>
            <ul>
              {theme.sentences.map((s, i) => (
                <li key={i}>
                  <strong>{s.korean}</strong>
                  <span>{s.chinese}</span>
                  {s.situation && <em>{s.situation}</em>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default async function ThemeLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const theme = themePacks.find((t) => t.id === id);
  if (!theme) notFound();
  const lang = await getServerLang();
  return (
    <>
      <SeoShell id={id} lang={lang} />
      {children}
    </>
  );
}
