'use client';

import './library.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Clock, Sun, Moon, X, Menu, Lock } from 'lucide-react';
import { levelLabel } from '@/data/reading-meta';
import { db } from '@/lib/db';
import { useMembership } from '@/lib/useMembership';
import { readingLockState, freeStoryIds, storyLockState } from '@/lib/membership-benefits';
import { useAuth } from '@/components/AuthProvider';
import type { Article, UserArticleProgress } from '@/types';
import LibrarySidebar from './_components/LibrarySidebar';
import { TOPIC_META } from './_components/topics';
import { topicImage } from './_components/topicImage';
import BookCard from './_components/BookCard';
import { storyCoverUrl } from './_components/storyCover';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { knowledgeArticles, KNOWLEDGE_CATS } from '@/data/reading-knowledge';
import { pictureBooks, type PictureBook } from '@/data/pictureBooks';
import { getAllProgress, type PBProgress } from '@/lib/pictureBookProgress';

type Tier = 'beginner' | 'intermediate' | 'advanced';
const levelOrder: Article['level'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const STORY_TOPIC = '이야기';
const FORBIDDEN_TOPIC = '금서';
const FORBIDDEN_UNLOCK_COUNT = 10;
const FORBIDDEN_SEEN_KEY = 'tori-forbidden-unlocked-seen';

function tierOf(level: Article['level']): Tier {
  if (level === 'A1' || level === 'A2') return 'beginner';
  if (level === 'B1' || level === 'B2') return 'intermediate';
  return 'advanced';
}

const QUOTE = { text: '하루 한 편, 진짜 한국어를 읽어요.', trans: '每天一篇，读真实的韩语。', from: '동물 도시 도서관' };

const COVER_TINTS = ['c-squirrel', 'c-bear', 'c-fox', 'c-bunny', 'c-mint', 'c-plum'] as const;
function coverTint(id: string): string {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return COVER_TINTS[h % COVER_TINTS.length];
}

export default function ReadingPage() {
  const router = useRouter();
  const { lang } = useLang();
  const { tier: memberTier, loading: memLoading } = useMembership();
  const { user } = useAuth();

  const [dark, setDark] = useState(false);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [today, setToday] = useState<Article | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [progress, setProgress] = useState<Map<string, UserArticleProgress>>(new Map());
  const [filterLevel, setFilterLevel] = useState<Article['level'] | 'all'>('all');
  const [filterTopic, setFilterTopic] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [introSignal, setIntroSignal] = useState(0);
  const [forbiddenShake, setForbiddenShake] = useState(false);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [forbiddenToast, setForbiddenToast] = useState(false);
  const [view, setView] = useState<'library' | 'articles' | 'story' | 'knowledge' | 'picbooks'>('library');
  const [kCat, setKCat] = useState<'all' | 'culture' | 'food' | 'travel'>('all');
  const [pbProgress, setPbProgress] = useState<Record<string, PBProgress>>({});

  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    import('@/data/reading-new').then((m) => {
      if (cancelled) return;
      setArticles(m.readingArticles);
      setToday(m.getTodayArticle() ?? null);
    }).catch(() => { if (!cancelled) setLoadError(true); });
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

  useEffect(() => { setPbProgress(getAllProgress()); }, []);

  const open = useCallback((id: string) => router.push(`/reading/${id}`), [router]);

  const filtered = useMemo(() => {
    if (!articles) return [];
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (a.hidden) return false;
      if (filterLevel !== 'all' && a.level !== filterLevel) return false;
      if (filterTopic && a.topic !== filterTopic) return false;
      if (q) {
        const hay = `${a.title} ${a.titleKo} ${a.topic}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [articles, filterLevel, filterTopic, query]);

  const isFiltering = filterLevel !== 'all' || !!filterTopic || query.trim() !== '';
  const visibleArticles = useMemo(() => (articles ?? []).filter((a) => !a.hidden && a.topic !== FORBIDDEN_TOPIC), [articles]);
  const storyItems = useMemo(() => filtered.filter((a) => a.topic === STORY_TOPIC), [filtered]);
  // 免费故事 id 集合：从全部非隐藏故事算（不受筛选影响），按难度档各放前 N 篇
  const freeStorySet = useMemo(
    () => freeStoryIds((articles ?? []).filter((a) => a.topic === STORY_TOPIC && !a.hidden)),
    [articles],
  );
  const forbiddenItems = useMemo(() => {
    const seq = (a: Article) => { const tag = (a.tags ?? []).find((x) => /禁书\s*·\s*\d/.test(x)); return tag ? parseInt(tag.replace(/\D/g, ''), 10) : 99; };
    return (articles ?? []).filter((a) => a.topic === FORBIDDEN_TOPIC && !a.hidden).sort((x, y) => seq(x) - seq(y));
  }, [articles]);

  const sections = useMemo(() => {
    return TOPIC_META.filter((tp) => tp.key !== STORY_TOPIC).map((tp) => ({ ...tp, items: filtered.filter((a) => a.topic === tp.key) })).filter((s) => s.items.length > 0);
  }, [filtered]);

  const stats = useMemo(() => {
    const list = visibleArticles;
    const done = [...progress.values()].filter((p) => p.status === 'completed').length;
    const savedWords = [...progress.values()].reduce((s, p) => s + (p.savedWordIds?.length ?? 0), 0);
    const savedSent = [...progress.values()].reduce((s, p) => s + (p.savedSentenceIds?.length ?? 0), 0);
    return { total: list.length, done, savedWords, savedSent };
  }, [visibleArticles, progress]);

  const forbiddenUnlocked = stats.done >= FORBIDDEN_UNLOCK_COUNT;
  useEffect(() => {
    if (!forbiddenUnlocked || forbiddenItems.length === 0) return;
    try { if (!localStorage.getItem(FORBIDDEN_SEEN_KEY)) { localStorage.setItem(FORBIDDEN_SEEN_KEY, '1'); setForbiddenToast(true); } } catch { /* skip */ }
  }, [forbiddenUnlocked, forbiddenItems.length]);

  // clear timers on unmount
  useEffect(() => () => {
    if (shakeTimerRef.current) { clearTimeout(shakeTimerRef.current); shakeTimerRef.current = null; }
    if (toastTimerRef.current) { clearTimeout(toastTimerRef.current); toastTimerRef.current = null; }
  }, []);

  const shakeForbidden = useCallback(() => { setForbiddenShake(true); if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current); shakeTimerRef.current = setTimeout(() => setForbiddenShake(false), 450); }, []);

  const continueList = useMemo(() => {
    if (!articles) return [];
    const reading = [...progress.values()].filter((p) => p.status === 'reading').sort((a, b) => (b.lastReadAt ?? 0) - (a.lastReadAt ?? 0));
    return reading.map((p) => articles.find((a) => a.id === p.articleId)).filter((a): a is Article => Boolean(a)).slice(0, 6);
  }, [articles, progress]);

  const statusOf = (id: string): UserArticleProgress['status'] | undefined => progress.get(id)?.status;

  if (loadError) {
    return (<div className="lib-scope"><div className="lib-empty-full"><p className="lib-empty-title">{t('reading.load_failed', lang)}</p><button className="lib-retry" onClick={() => window.location.reload()}>{t('reading.retry', lang)}</button></div></div>);
  }
  if (!articles) {
    return (<div className="lib-scope"><div className="lib-empty-full"><div className="lib-spinner" /></div></div>);
  }

  const Card = ({ a, wide }: { a: Article; wide?: boolean }) => {
    const tier = tierOf(a.level);
    const st = statusOf(a.id);
    const img = wide ? topicImage(a.topic) : undefined;
    const showBanner = !!wide;
    const locked = !memLoading && readingLockState(memberTier, a.level, user?.role === 'admin').locked;
    return (
      <div className={`article-card ${tier}${wide ? ' wide' : ''}${showBanner ? '' : ' no-banner'}`} onClick={() => open(a.id)}>
        {showBanner && (<div className={`article-card-banner tier-${tier}`}>{img && <img src={img} alt={a.topic} loading="lazy" />}<span className="article-card-banner-topic">{a.emoji} {a.topic}</span></div>)}
        <div className="article-card-body">
          <div className="article-card-meta">
            {!showBanner && <span className="article-card-topic-tag">{a.emoji} {a.topic}</span>}
            <span className="article-card-diff">{levelLabel[a.level]}</span>
            {locked && <span className="article-card-lock"><Lock size={10} /> {t('reading.member_only', lang)}</span>}
            {st === 'completed' && <span className="article-card-done">{t('reading.done', lang)}</span>}
            {st === 'reading' && <span className="article-card-reading">{t('reading.reading', lang)}</span>}
            <span className="article-card-time"><Clock size={11} />{a.estimatedMinutes}분</span>
          </div>
          <div className="article-card-title">{a.title}</div>
          <div className="article-card-kr">{a.titleKo}</div>
          <div className="article-card-desc">{a.learningGoals.slice(0, 2).join(' · ')}</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={scopeRef} className={`lib-scope${dark ? ' lib-dark' : ''}`}>
      <PlaceIntro place="library" dark={dark} reopenSignal={introSignal} />
      <div className={`lib-theme-toggle${drawerOpen ? ' drawer-open' : ''}`}>
        <button className={`lib-theme-btn${!dark ? ' active' : ''}`} onClick={() => { setDark(false); document.documentElement.setAttribute('data-theme', 'light'); }}><Sun size={13} /> 밝게</button>
        <button className={`lib-theme-btn${dark ? ' active' : ''}`} onClick={() => { setDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }}><Moon size={13} /> 어둡게</button>
      </div>
      <div className="lib-shell">
        <LibrarySidebar
          articles={articles} progress={progress} topics={TOPIC_META}
          query={query} onQuery={setQuery} activeTopic={filterTopic} activeLevel={filterLevel}
          onTopic={(t) => { setFilterTopic((cur) => (cur === t ? null : t)); setFilterLevel('all'); setQuery(''); }}
          onLevel={(l) => { setFilterLevel(l); setFilterTopic(null); }}
          open={drawerOpen} onClose={() => setDrawerOpen(false)}
          onReopenIntro={() => { setDrawerOpen(false); setIntroSignal((v) => v + 1); }}
          onGotoLibrary={() => { setDrawerOpen(false); setView('library'); }}
          onGotoArticles={() => { setDrawerOpen(false); setView('articles'); setFilterTopic(null); setFilterLevel('all'); setQuery(''); }}
          onGotoStory={() => { setDrawerOpen(false); setView('story'); }}
          onGotoKnowledge={() => { setDrawerOpen(false); setView('knowledge'); }}
          onGotoPicBooks={() => { setDrawerOpen(false); setPbProgress(getAllProgress()); setView('picbooks'); }}
        />
        <div className="home-screen" role="main">
          <div className="main-topbar">
            <div className="breadcrumb">
              <button className="lib-menu-btn" onClick={() => setDrawerOpen(true)} aria-label={t('reading.menu', lang)}><Menu size={17} /></button>
              <button className="lib-back" onClick={() => router.push('/learning')} aria-label={t('reading.back', lang)}><ArrowLeft size={16} /></button>
              <span>동물 도시 도서관</span>
              {(view !== 'library' || filterTopic || filterLevel !== 'all') && (
                <><span>›</span><span className="current">{view === 'articles' ? '자료 읽기' : view === 'story' ? '이야기' : view === 'knowledge' ? `자료실 · ${t('reading.tab_knowledge', lang)}` : view === 'picbooks' ? `그림책관 · ${t('reading.tab_picbooks', lang)}` : filterTopic ? filterTopic : levelLabel[filterLevel as Article['level']]}</span></>
              )}
            </div>
          </div>
          {/* 移动端四区 tab */}
          <div className="lib-mobile-tabs">
            {(['articles','story','knowledge','picbooks'] as const).map((v) => (
              <button key={v} className={`lib-mobile-tab${view === v ? ' active' : ''}`}
                onClick={() => { setView(v); if (v === 'articles') { setFilterTopic(null); setFilterLevel('all'); setQuery(''); } if (v === 'picbooks') setPbProgress(getAllProgress()); }}
              >
                {v === 'articles' ? t('reading.tab_articles', lang) : v === 'story' ? t('reading.tab_story', lang) : v === 'knowledge' ? t('reading.tab_knowledge', lang) : t('reading.tab_picbooks', lang)}
              </button>
            ))}
          </div>
          <div className="main-content">
            {view === 'articles' ? (
              /* ── 纪实文章完整视图 ── */
              <>
                <div className="lib-controls">
                  <div className="lib-search">
                    <Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`글 제목, 주제 검색 · ${t('reading.search_placeholder_zh', lang)}`} />
                    {query && <button className="lib-search-clear" onClick={() => setQuery('')}><X size={14} /></button>}
                  </div>
                  <div className="lib-chips">
                    <button className={`lib-chip${filterLevel === 'all' ? ' active' : ''}`} onClick={() => setFilterLevel('all')}>전체</button>
                    {levelOrder.map((lv) => { const n = visibleArticles.filter((a) => a.topic !== STORY_TOPIC && a.level === lv).length; if (n === 0) return null; return <button key={lv} className={`lib-chip${filterLevel === lv ? ' active' : ''}`} onClick={() => setFilterLevel(filterLevel === lv ? 'all' : lv)}>{levelLabel[lv]} <span className="lib-chip-n">{n}</span></button>; })}
                  </div>
                </div>
                {isFiltering ? (
                  <div className="content-section">
                    <div className="section-header"><h2>{t('reading.result_count', lang, { n: filtered.filter((a) => a.topic !== STORY_TOPIC).length })}</h2><span className="more" onClick={() => { setFilterLevel('all'); setFilterTopic(null); setQuery(''); }}>{t('reading.clear_filter', lang)}</span></div>
                    <div className="author-grid flat">{filtered.filter((a) => a.topic !== STORY_TOPIC).map((a) => <Card key={a.id} a={a} />)}</div>
                  </div>
                ) : (
                  sections.filter((s) => s.key !== STORY_TOPIC).map((s) => (
                    <div className="content-section" key={s.key}>
                      <div className="section-header"><h2>{s.emoji} {s.key} <span className="section-kr">{s.kr}</span></h2></div>
                      <div className="author-grid">{s.items.map((a, i) => <Card key={a.id} a={a} wide={i === 0 && s.items.length > 2} />)}</div>
                    </div>
                  ))
                )}
              </>
            ) : view === 'story' ? (
              /* ── 故事集 + 禁书 ── */
              <>
                <div className="story-shelf-intro">
                  <div className="story-shelf-mark">📖</div>
                  <div className="story-shelf-txt"><h2>동물 도시 이야기</h2><p className="story-shelf-kr">{t('reading.story_shelf_title', lang)}</p><p className="story-shelf-sub">{t('reading.story_shelf_sub', lang)}</p></div>
                </div>
                <div className="story-shelf">{storyItems.map((a) => <BookCard key={a.id} article={a} status={statusOf(a.id)} coverTint={coverTint(a.id)} locked={!memLoading && storyLockState(memberTier, freeStorySet.has(a.id), user?.role === 'admin').locked} onOpen={open} />)}</div>
                {forbiddenItems.length > 0 && (
                  <div className="content-section forbidden-section" style={{ marginTop: 40 }}>
                    {forbiddenUnlocked ? (<>
                      <div className="forbidden-intro unlocked"><div className="forbidden-mark">🕯️</div><div className="forbidden-txt"><h2>금서 · {t('reading.forbidden_zh', lang)}</h2><p className="forbidden-sub">동물 도시가 숨긴 이야기 · {t('reading.forbidden_sub_zh', lang)}</p></div></div>
                      <div className="story-shelf forbidden-shelf">{forbiddenItems.map((a) => { const seqTag = (a.tags ?? []).find((x) => /禁书\s*·\s*\d/.test(x)); return <BookCard key={a.id} article={a} status={statusOf(a.id)} coverTint={coverTint(a.id)} variant="forbidden" seqTag={seqTag} onOpen={open} />; })}</div>
                    </>) : (<>
                      <div className="forbidden-intro locked"><div className="forbidden-mark">🔒</div><div className="forbidden-txt"><h2>금서 · {t('reading.forbidden_zh', lang)}</h2><p className="forbidden-sub">읽은 책 {stats.done} / {FORBIDDEN_UNLOCK_COUNT} · {t('reading.forbidden_unlock_hint', lang, { n: FORBIDDEN_UNLOCK_COUNT })}</p></div></div>
                      <div className={`story-shelf forbidden-lock-grid${forbiddenShake ? ' shake' : ''}`} onClick={shakeForbidden} role="button">{forbiddenItems.map((a) => { const seqTag = (a.tags ?? []).find((x) => /禁书\s*·\s*\d/.test(x)); return (<div className="flock-card" key={a.id}><img className="flock-bg" src={storyCoverUrl(a.id)} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><div className="flock-veil" /><span className="flock-paw">🐾</span><span className="flock-seq">{seqTag ?? '금서'}</span><span className="flock-sealed">봉인됨</span></div>); })}</div>
                      <p className="forbidden-lock-hint">동물 도시에는 아무도 말하지 않는 이야기가 있다…</p>
                    </>)}
                  </div>
                )}
              </>
            ) : view === 'knowledge' ? (
              /* ── 韩国小知识完整视图 ── */
              (() => {
                const klist = kCat === 'all' ? knowledgeArticles : knowledgeArticles.filter((a) => a.category === kCat);
                const [kfeat, ...krest] = klist;
                const kcards = krest.slice(0, 2);
                const ktexts = krest.slice(2, 4);
                const kreg = krest.slice(4);
                const ksplit = (s: string) => { const i = s.indexOf('—'); return i < 0 ? { ko: '', desc: s } : { ko: s.slice(0, i).trim(), desc: s.slice(i + 1).trim() }; };
                const openK = (slug: string) => router.push(`/reading/knowledge/${slug}`);
                const KCard = ({ a, v }: { a: typeof knowledgeArticles[number]; v: string }) => { const { ko, desc } = ksplit(a.subtitle); const cm = KNOWLEDGE_CATS.find((x) => x.key === a.category); const cls = v === 'featured' ? 'kb-mag-featured' : v === 'card' ? 'kb-mag-card' : 'kb-mag-text'; return (<div className={cls} onClick={() => openK(a.slug)}>{v !== 'text' && <div className="kb-mag-img">{a.bannerImage && <img src={a.bannerImage} alt={a.title} loading={v === 'featured' ? 'eager' : 'lazy'} />}{v === 'featured' && <span className="kb-mag-badge">FEATURED</span>}</div>}<div className="kb-mag-body">{cm && <span className="kb-mag-cat">{cm.emoji} {cm.zh}</span>}{ko && <div className="kb-mag-ko">{ko}</div>}<div className="kb-mag-title">{a.title}</div>{v !== 'card' && <div className="kb-mag-excerpt">{desc}</div>}<div className="kb-mag-meta"><span>🐰 토리</span><span className="dot" /><span><Clock size={11} style={{ verticalAlign: '-1px', marginRight: 3 }} />{t('reading.read_minutes', lang, { n: a.readMinutes })}</span></div></div></div>); };
                return (<><div className="lib-controls"><div className="lib-chips">{([['all','reading.kcat_all'],['culture','reading.kcat_culture'],['food','reading.kcat_food'],['travel','reading.kcat_travel']] as const).map(([k, lk]) => <button key={k} className={`lib-chip${kCat === k ? ' active' : ''}`} onClick={() => setKCat(k)}>{t(lk, lang)}</button>)}</div></div><div className="kb-mag-grid" key={kCat}>{kfeat && <KCard a={kfeat} v="featured" />}{kcards.map((a) => <KCard key={a.slug} a={a} v="card" />)}{ktexts.map((a) => <KCard key={a.slug} a={a} v="text" />)}</div>{kreg.length > 0 && <><div className="kb-fulllist-head"><span>{t('reading.all_articles', lang)}</span><span className="line" /></div><div className="kb-fulllist">{kreg.map((a) => <KCard key={a.slug} a={a} v="text" />)}</div></>}</>);
              })()
            ) : view === 'picbooks' ? (
              /* ── 绘本馆完整视图 ── */
              (() => {
                const openPB = (id: string) => router.push(`/reading/picture-books/${id}`);
                const beg = pictureBooks.filter((b) => b.level === 'beginner');
                const adv = pictureBooks.filter((b) => b.level === 'intermediate');
                const PBCard = ({ book }: { book: PictureBook }) => { const p = pbProgress[book.id]; const readPage = p?.page ?? 0; const tp = book.pages.length; const done = p?.completed ?? false; return (<div className="pb-book-card" onClick={() => openPB(book.id)}><div className="pb-book-cover">{book.coverImage ? <img src={book.coverImage} alt={book.title} loading="lazy" /> : <div style={{ width:'100%',height:'100%',display:'grid',placeItems:'center',fontSize:48,background:'var(--amber-soft)' }}>{book.emoji}</div>}<div className="pb-cover-tint" />{book.level === 'beginner' ? <span className="pb-cover-badge">{t('reading.pb_beginner', lang)}</span> : <span className="pb-cover-badge">{t('reading.pb_intermediate', lang)}</span>}</div><div className="pb-book-body"><div className="pb-book-emoji">{book.emoji}</div><div className="pb-book-title">{book.title}</div><div className="pb-book-title-ko">{book.titleKo}</div><div className="pb-book-desc">{book.description}</div><div className="pb-book-meta"><span>📖 {t('reading.pb_pages', lang, { n: tp })}</span>{readPage > 0 && !done && <div className="pb-book-progress"><span>{t('reading.pb_read_to', lang, { cur: readPage, total: tp })}</span><div className="bar"><div className="fill" style={{ width: `${(readPage / tp) * 100}%` }} /></div></div>}{done && <span className="pb-book-done">{t('reading.pb_done', lang)}</span>}</div></div></div>); };
                return (<>{beg.length > 0 && <div className="pb-shelf"><div className="pb-shelf-head"><span className="pb-shelf-head-icon">🌱</span><div><h3>{t('reading.pb_shelf_beginner', lang)}</h3><div className="sub">{t('reading.pb_shelf_beginner_sub', lang)}</div></div></div><div className="pb-book-grid">{beg.map((b) => <PBCard key={b.id} book={b} />)}</div></div>}{adv.length > 0 && <div className="pb-shelf"><div className="pb-shelf-head"><span className="pb-shelf-head-icon">🌿</span><div><h3>{t('reading.pb_shelf_intermediate', lang)}</h3><div className="sub">{t('reading.pb_shelf_intermediate_sub', lang)}</div></div></div><div className="pb-book-grid">{adv.map((b) => <PBCard key={b.id} book={b} />)}</div></div>}</>);
              })()
            ) : (
              /* ── 主馆：四区纵览 ── */
              <>
                {today && (
                  <div className="hero-section">
                    <div className="hero-feature" onClick={() => open(today.id)}>
                      <div className={`hero-feature-img tier-${tierOf(today.level)}`}>
                        {topicImage(today.topic) && <img src={topicImage(today.topic)} alt={today.topic} loading="eager" />}
                        <div className="hero-feature-badge">오늘의 추천 · {t('reading.today_pick_zh', lang)}</div>
                      </div>
                      <div className="hero-feature-body">
                        <div className="hero-feature-meta"><div className="hero-feature-author"><div className="hero-feature-author-avatar">{today.emoji}</div><span>{today.topic}</span></div><div className="hero-feature-diff">{levelLabel[today.level]}</div><div className="hero-feature-time">{today.estimatedMinutes}분</div></div>
                        <h2 className="hero-feature-title">{today.title}</h2><p className="hero-feature-kr">{today.titleKo}</p><p className="hero-feature-desc">{today.learningGoals.slice(0, 2).join(' · ')}</p>
                      </div>
                    </div>
                    <div className="hero-side"><div className="quote-card"><div className="quote-text">{QUOTE.text}</div><div className="quote-trans">{QUOTE.trans}</div><div className="quote-author"><div className="quote-author-avatar">📚</div><span>{QUOTE.from}</span></div></div></div>
                  </div>
                )}
                <div className="stats-strip">
                  <div className="stat-card"><div className="stat-label">{t('reading.stat_total', lang)}</div><div className="stat-value">{stats.total}<span className="stat-suffix">편</span></div></div>
                  <div className="stat-card"><div className="stat-label">{t('reading.stat_done', lang)}</div><div className="stat-value">{stats.done}<span className="stat-suffix">편</span></div></div>
                  <div className="stat-card"><div className="stat-label">{t('reading.stat_saved_words', lang)}</div><div className="stat-value">{stats.savedWords}<span className="stat-suffix">개</span></div></div>
                  <div className="stat-card"><div className="stat-label">{t('reading.stat_saved_sentences', lang)}</div><div className="stat-value">{stats.savedSent}<span className="stat-suffix">문장</span></div></div>
                </div>
                {continueList.length > 0 && (
                  <div className="content-section">
                    <div className="section-header"><h2>📖 {t('reading.continue', lang)} <span className="section-kr">이어 읽기</span></h2></div>
                    <div className="author-grid">{continueList.map((a) => <Card key={a.id} a={a} />)}</div>
                  </div>
                )}
                {/* 纪实文章 */}
                {sections.filter((s) => s.key !== STORY_TOPIC).map((s) => (
                  <div className="content-section" key={s.key}>
                    <div className="section-header"><h2>{s.emoji} {s.key} <span className="section-kr">{s.kr}</span></h2></div>
                    <div className="author-grid">{s.items.map((a, i) => <Card key={a.id} a={a} wide={i === 0 && s.items.length > 2} />)}</div>
                  </div>
                ))}
                {/* 故事集 */}
                {storyItems.length > 0 && (
                  <div className="content-section story-section">
                    <div className="story-shelf-intro"><div className="story-shelf-mark">📖</div><div className="story-shelf-txt"><h2>동물 도시 이야기</h2><p className="story-shelf-kr">{t('reading.story_shelf_title', lang)}</p><p className="story-shelf-sub">{t('reading.story_shelf_sub', lang)}</p></div></div>
                    <div className="story-shelf">{storyItems.map((a) => <BookCard key={a.id} article={a} status={statusOf(a.id)} coverTint={coverTint(a.id)} locked={!memLoading && storyLockState(memberTier, freeStorySet.has(a.id), user?.role === 'admin').locked} onOpen={open} />)}</div>
                  </div>
                )}
                {/* 韩国小知识预览 */}
                {(() => {
                  const items = knowledgeArticles.slice(0, 4);
                  if (items.length === 0) return null;
                  const ksplit = (s: string) => { const i = s.indexOf('—'); return i < 0 ? { ko: '', desc: s } : { ko: s.slice(0, i).trim(), desc: s.slice(i + 1).trim() }; };
                  return (<div className="content-section"><div className="section-header"><h2>💡 자료실 · {t('reading.tab_knowledge', lang)} <span className="section-kr">한국 상식</span></h2></div><div className="author-grid">{items.map((a, i) => { const { ko, desc } = ksplit(a.subtitle); const cm = KNOWLEDGE_CATS.find((x) => x.key === a.category); const withImg = i === 0; return (<div key={a.slug} className={withImg ? 'kb-mag-card' : 'kb-mag-text'} onClick={() => router.push(`/reading/knowledge/${a.slug}`)}>{withImg && <div className="kb-mag-img">{a.bannerImage && <img src={a.bannerImage} alt={a.title} loading="lazy" />}</div>}<div className="kb-mag-body">{cm && <span className="kb-mag-cat">{cm.emoji} {cm.zh}</span>}{ko && <div className="kb-mag-ko">{ko}</div>}<div className="kb-mag-title">{a.title}</div>{!withImg && <div className="kb-mag-excerpt">{desc}</div>}<div className="kb-mag-meta"><span>🐰 토리</span><span className="dot" /><span>{t('reading.read_minutes', lang, { n: a.readMinutes })}</span></div></div></div>); })}</div></div>);
                })()}
                {/* 绘本馆预览 */}
                {(() => {
                  const items = pictureBooks.slice(0, 4);
                  if (items.length === 0) return null;
                  return (<div className="content-section"><div className="section-header"><h2>📚 그림책관 · {t('reading.tab_picbooks', lang)} <span className="section-kr">동화책</span></h2></div><div className="pb-book-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>{items.map((b) => { const p = pbProgress[b.id]; const rp = p?.page ?? 0; const tp = b.pages.length; const done = p?.completed ?? false; return (<div key={b.id} className="pb-book-card" onClick={() => router.push(`/reading/picture-books/${b.id}`)}><div className="pb-book-cover">{b.coverImage ? <img src={b.coverImage} alt={b.title} loading="lazy" /> : <div style={{ width:'100%',height:'100%',display:'grid',placeItems:'center',fontSize:40,background:'var(--amber-soft)' }}>{b.emoji}</div>}<div className="pb-cover-tint" />{b.level === 'beginner' ? <span className="pb-cover-badge">{t('reading.pb_beginner', lang)}</span> : <span className="pb-cover-badge">{t('reading.pb_intermediate', lang)}</span>}</div><div className="pb-book-body"><div className="pb-book-title">{b.title}</div><div className="pb-book-meta"><span>📖 {t('reading.pb_pages', lang, { n: tp })}</span>{rp > 0 && !done && <span className="pb-book-progress"><span>{t('reading.pb_read_to', lang, { cur: rp, total: tp })}</span></span>}{done && <span className="pb-book-done">{t('reading.pb_done', lang)}</span>}</div></div></div>); })}</div></div>);
                })()}
              </>
            )}
          </div>
        </div>
      </div>
      {forbiddenToast && (
        <div className="forbidden-toast" onClick={() => setForbiddenToast(false)}>
          <div className="forbidden-toast-card">
            <div className="forbidden-toast-icon">🕯️</div>
            <div className="forbidden-toast-title">금서가 열렸습니다 · {t('reading.forbidden_opened_zh', lang)}</div>
            <div className="forbidden-toast-sub">{t('reading.forbidden_opened_body', lang, { n: FORBIDDEN_UNLOCK_COUNT })}</div>
            <button className="forbidden-toast-btn" onClick={() => { setForbiddenToast(false); if (toastTimerRef.current) clearTimeout(toastTimerRef.current); toastTimerRef.current = setTimeout(() => { const el = document.querySelector('.forbidden-section'); if (el) { setView('story'); toastTimerRef.current = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); } }, 300); }}>들어가기 · {t('reading.enter_zh', lang)}</button>
          </div>
        </div>
      )}
    </div>
  );
}
