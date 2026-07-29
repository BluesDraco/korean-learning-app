'use client';

import '../../library.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Menu, Sun, Moon } from 'lucide-react';
import { db } from '@/lib/db';
import type { UserArticleProgress } from '@/types';
import type { ArticleLearningData } from '@/data/articleLearning';
import type { KnowledgeArticle } from '@/data/reading-knowledge';
import { KNOWLEDGE_CATS } from '@/data/reading-knowledge';
import { useSmartBack } from '@/lib/useSmartBack';
import LibrarySidebar, { type SidebarArticle } from '../../_components/LibrarySidebar';
import { TOPIC_META } from '../../_components/topics';
import BlockRenderer from '../../_components/knowledge/BlockRenderer';
import ArticleLearningModules from '@/components/ArticleLearningModules';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function KnowledgeReaderClient({
  article, learning, sidebarArticles,
}: {
  article: KnowledgeArticle;
  learning: ArticleLearningData | null;
  sidebarArticles: SidebarArticle[];
}) {
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/reading');

  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [progress, setProgress] = useState<Map<string, UserArticleProgress>>(new Map());
  const [activeSection, setActiveSection] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);

  const cat = KNOWLEDGE_CATS.find((c) => c.key === article.category);

  // 从 blocks 提取目录（取所有 sectionTitle）
  const tocItems = useMemo(() => {
    const items: { emoji: string; title: string; idx: number }[] = [];
    article.blocks.forEach((b, i) => {
      if (b.type === 'sectionTitle') {
        items.push({ emoji: b.emoji, title: b.title, idx: i });
      }
    });
    return items;
  }, [article.blocks]);

  // 提取本篇核心词汇（vocabList 的前 6 个）
  const miniVocab = useMemo(() => {
    for (const b of article.blocks) {
      if (b.type === 'vocabList') {
        return b.items.slice(0, 6);
      }
    }
    return [];
  }, [article.blocks]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await db.userArticleProgress.toArray();
        if (cancelled) return;
        const map = new Map<string, UserArticleProgress>();
        for (const p of all) map.set(p.articleId, p);
        setProgress(map);
      } catch { /* skip */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // TOC 滚动监听
  useEffect(() => {
    const container = mainRef.current;
    if (!container || tocItems.length === 0) return;

    const headingEls: HTMLElement[] = [];
    container.querySelectorAll('.kb-sec-title').forEach((el) => headingEls.push(el as HTMLElement));

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const emoji = (entry.target as HTMLElement).querySelector('.kb-sec-emoji')?.textContent;
            const title = (entry.target as HTMLElement).querySelector('h2')?.textContent;
            if (title) setActiveSection(title);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  const openArticle = useCallback((slug: string) => router.push(`/reading/knowledge/${slug}`), [router]);
  const scrollToSection = useCallback((idx: number) => {
    const container = mainRef.current;
    if (!container) return;
    const headings = container.querySelectorAll('.kb-sec-title');
    if (headings[idx]) {
      headings[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className={`lib-scope lib-reader${dark ? ' lib-dark' : ''}`}>
      <div className={`lib-theme-toggle${drawerOpen ? ' drawer-open' : ''}`}>
        <button className={`lib-theme-btn${!dark ? ' active' : ''}`} onClick={() => setDark(false)}><Sun size={13} /> 밝게</button>
        <button className={`lib-theme-btn${dark ? ' active' : ''}`} onClick={() => setDark(true)}><Moon size={13} /> 어둡게</button>
      </div>

      <div className="lib-shell">
        <LibrarySidebar
          articles={sidebarArticles}
          progress={progress}
          topics={TOPIC_META}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        <div className="home-screen" role="main">
          <div className="main-topbar">
            <div className="breadcrumb">
              <button className="lib-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="목록"><Menu size={17} /></button>
              <button className="lib-back" onClick={smartBack} aria-label="뒤로"><ArrowLeft size={16} /></button>
              <span>동물 도시 도서관</span>
              <span>›</span>
              <button className="kb-crumb-link" onClick={() => router.push('/reading')}>자료실</button>
              <span>›</span>
              <span className="current">{article.title}</span>
            </div>
          </div>

          <div className="main-content">
            <div className="kb-reader-layout" ref={mainRef}>
              <article className="kb-reader-main">
                <header className="kb-reader-hero">
                  <h1 className="kb-reader-title">{article.title}</h1>
                  <p className="kb-reader-sub">{article.subtitle}</p>
                </header>
                <BlockRenderer blocks={article.blocks} sourceTitle={article.title} onOpen={openArticle} />

                {learning && <ArticleLearningModules data={learning} />}
              </article>

              {/* ── 右栏：目录 + 词汇 + 信息 ── */}
              <aside className="kb-reader-rail">
                {tocItems.length > 0 && (
                  <div className="kb-rail-card">
                    <h4 className="kb-rail-card-title">{t('reading.rail_toc', lang)}</h4>
                    <div className="kb-rail-toc">
                      {tocItems.map((item, i) => (
                        <button
                          key={i}
                          className={`kb-rail-toc-item${activeSection === item.title ? ' active' : ''}`}
                          onClick={() => scrollToSection(i)}
                        >
                          <span className="kb-rail-toc-emoji">{item.emoji}</span>
                          <span>{item.title}</span>
                        </button>
                      ))}
                      <button
                        className={`kb-rail-toc-item${activeSection === '📝' ? ' active' : ''}`}
                        onClick={() => {
                          const el = document.querySelector('.alm-keywords');
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        <span className="kb-rail-toc-emoji">📝</span>
                        <span>{t('reading.rail_vocab_quiz', lang)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {miniVocab.length > 0 && (
                  <div className="kb-rail-card">
                    <h4 className="kb-rail-card-title">{t('reading.rail_key_vocab', lang)}</h4>
                    <div className="kb-rail-vocab">
                      {miniVocab.map((v, i) => (
                        <div className="kb-rail-vocab-item" key={i}>
                          <span className="kb-rail-vocab-ko">{v.ko}</span>
                          <span className="kb-rail-vocab-zh">{v.zh}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="kb-rail-card">
                  <h4 className="kb-rail-card-title">{t('reading.rail_info', lang)}</h4>
                  <div className="kb-rail-info">
                    <div className="kb-rail-info-row">
                      <span>⏱️</span>
                      <span>{t('reading.read_minutes', lang, { n: article.readMinutes })}</span>
                    </div>
                    {cat && (
                      <div className="kb-rail-info-row">
                        <span>{cat.emoji}</span>
                        <span>{cat.zh} · {cat.ko}</span>
                      </div>
                    )}
                    <div className="kb-rail-info-row">
                      <span>🐰</span>
                      <span>{t('reading.rail_editor', lang)}</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
