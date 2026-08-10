'use client';

import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Bookmark, GraduationCap, BookMarked, Library, Newspaper, BookImage } from 'lucide-react';
import { levelLabel } from '@/data/reading-meta';
import type { Article, UserArticleProgress } from '@/types';
import type { TopicMeta } from './topics';
import { knowledgeArticles } from '@/data/reading-knowledge';
import { pictureBooks } from '@/data/pictureBooks';
import { useLang } from '@/components/LangProvider';
import { t, enVal } from '@/lib/i18n';

const LEVEL_ORDER: Article['level'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const KNOWLEDGE_COUNT = knowledgeArticles.length;
const PICBOOK_COUNT = pictureBooks.length;
const STORY_TOPIC = '이야기';
const FORBIDDEN_TOPIC = '금서';

function tierDot(level: Article['level']): string {
  if (level === 'A1' || level === 'A2') return 'dot-beginner';
  if (level === 'B1' || level === 'B2') return 'dot-intermediate';
  return 'dot-advanced';
}

// 侧栏只需这几个字段做计数/分类/难度分布，不需要全文。
// 用 Pick 让详情页能只传精简数组，避免把 27k 行文章全库打进 client bundle。
export type SidebarArticle = Pick<Article, 'id' | 'title' | 'level' | 'topic' | 'hidden'>;

type Props = {
  articles: SidebarArticle[];
  progress: Map<string, UserArticleProgress>;
  topics: TopicMeta[];
  /** 首页筛选态（详情页传 undefined 即可） */
  query?: string;
  onQuery?: (q: string) => void;
  activeTopic?: string | null;
  activeLevel?: Article['level'] | 'all';
  onTopic?: (t: string) => void;
  onLevel?: (l: Article['level'] | 'all') => void;
  /** 详情页高亮当前文章 */
  currentArticleId?: string;
  /** 移动抽屉 */
  open: boolean;
  onClose: () => void;
  /** 首页传入 → 底部显示「再看一次介绍」；详情页省略则不显示 */
  onReopenIntro?: () => void;
  /** 馆区入口：首页滚到对应区；详情页省略则跳 /reading */
  onGotoStory?: () => void;
  onGotoArticles?: () => void;
  /** 자료실·韩国小知识：省略则跳 /reading/knowledge */
  onGotoKnowledge?: () => void;
  /** 그림책관·绘本馆：省略则跳 /reading/picture-books */
  onGotoPicBooks?: () => void;
  /** 동물 도시 도서관·主馆：省略则跳 /reading */
  onGotoLibrary?: () => void;
};

export default function LibrarySidebar({
  articles, progress, topics,
  query, onQuery, activeTopic, activeLevel, onTopic, onLevel,
  currentArticleId, open, onClose, onReopenIntro, onGotoStory, onGotoArticles, onGotoKnowledge, onGotoPicBooks, onGotoLibrary,
}: Props) {
  const router = useRouter();
  const { lang } = useLang();

  // 计数基准：排除 hidden/금서，与列表页展示口径一致
  const visible = articles.filter((a) => !a.hidden && a.topic !== FORBIDDEN_TOPIC);
  const storyCount = visible.filter((a) => a.topic === STORY_TOPIC).length;
  const articleCount = visible.length - storyCount;

  // 馆区入口：首页有回调 → 滚动；详情页无回调 → 跳 /reading
  const gotoStory = () => { onClose(); if (onGotoStory) onGotoStory(); else router.push('/reading'); };
  const gotoArticles = () => { onClose(); if (onGotoArticles) onGotoArticles(); else router.push('/reading'); };
  const gotoKnowledge = () => { onClose(); if (onGotoKnowledge) onGotoKnowledge(); else router.push('/reading/knowledge'); };
  const gotoPicBooks = () => { onClose(); if (onGotoPicBooks) onGotoPicBooks(); else router.push('/reading/picture-books'); };
  const gotoLibrary = () => { onClose(); if (onGotoLibrary) onGotoLibrary(); else router.push('/reading'); };

  const reading = [...progress.values()]
    .filter((p) => p.status === 'reading')
    .sort((a, b) => (b.lastReadAt ?? 0) - (a.lastReadAt ?? 0))
    .map((p) => articles.find((a) => a.id === p.articleId))
    .filter((a): a is SidebarArticle => Boolean(a))
    .slice(0, 4);

  const doneCount = [...progress.values()].filter((p) => p.status === 'completed').length;
  const savedWords = [...progress.values()].reduce((s, p) => s + (p.savedWordIds?.length ?? 0), 0);

  // 首页有筛选回调 → 点分类走筛选；详情页无回调 → 点分类跳首页带 hash 无意义，直接 push /reading
  const goTopic = (topicKey: string) => {
    onClose();
    if (onTopic) onTopic(topicKey);
    else router.push('/reading');
  };
  const goLevel = (l: Article['level'] | 'all') => {
    onClose();
    if (onLevel) onLevel(l);
    else router.push('/reading');
  };
  const goArticle = (id: string) => { onClose(); router.push(`/reading/${id}`); };

  return (
    <>
      {open && <div className="lib-sidebar-scrim" onClick={onClose} />}
      <aside className={`lib-sidebar${open ? ' open' : ''}`} role="navigation">
        <div className="sidebar-brand">
          <button className="sidebar-brand-link" onClick={() => { onClose(); router.push('/reading'); }}>
            <div className="brand-title">동물 도시 도서관</div>
            <div className="brand-sub">Animal City Library</div>
          </button>
          <button className="sidebar-close" onClick={onClose} aria-label={t('reading.close', lang)} type="button"><X size={18} /></button>
        </div>

        {onQuery && (
          <div className="sidebar-search">
            <Search size={14} />
            <input
              value={query ?? ''}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={`글 검색 · ${t('reading.search_zh', lang)}`}
            />
          </div>
        )}

        <nav className="sidebar-scroll">
          <div className="sidebar-section">
            <div className="sidebar-label">주요 · {t('reading.zone_main', lang)}</div>
            <button className="nav-zone" onClick={gotoLibrary}>
              <span className="nav-zone-icon zone-library"><Library size={16} /></span>
              <span className="nav-zone-txt">
                <span className="nav-zone-title">동물 도시 도서관</span>
                <span className="nav-zone-sub">Animal City Library</span>
              </span>
            </button>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">서가 · {t('reading.zone_label_zh', lang)}</div>
            <button className="nav-zone" onClick={gotoArticles}>
              <span className="nav-zone-icon zone-article"><Newspaper size={16} /></span>
              <span className="nav-zone-txt">
                <span className="nav-zone-title">자료 읽기 · {t('reading.nonfiction', lang)}</span>
                <span className="nav-zone-sub">주제별 실용 읽기</span>
              </span>
              <span className="count">{articleCount}</span>
            </button>
            <button className="nav-zone" onClick={gotoStory}>
              <span className="nav-zone-icon zone-story"><BookMarked size={16} /></span>
              <span className="nav-zone-txt">
                <span className="nav-zone-title">이야기 · {t('reading.story_collection', lang)}</span>
                <span className="nav-zone-sub">동물 도시 짧은 이야기</span>
              </span>
              <span className="count">{storyCount}</span>
            </button>
            <button className="nav-zone" onClick={gotoKnowledge}>
              <span className="nav-zone-icon zone-knowledge"><Newspaper size={16} /></span>
              <span className="nav-zone-txt">
                <span className="nav-zone-title">자료실 · {t('reading.tab_knowledge', lang)}</span>
                <span className="nav-zone-sub">한국 상식 · {t('reading.zone_life_culture', lang)}</span>
              </span>
              <span className="count">{KNOWLEDGE_COUNT}</span>
            </button>
            <button className="nav-zone" onClick={gotoPicBooks}>
              <span className="nav-zone-icon zone-picbook"><BookImage size={16} /></span>
              <span className="nav-zone-txt">
                <span className="nav-zone-title">그림책관 · {t('reading.tab_picbooks', lang)}</span>
                <span className="nav-zone-sub">동화책 · {t('reading.zone_picbook_sub', lang)}</span>
              </span>
              <span className="count">{PICBOOK_COUNT}</span>
            </button>
          </div>

          {reading.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-label">읽는 중 · {t('reading.reading', lang)}</div>
              {reading.map((a) => (
                <button
                  key={a.id}
                  className={`nav-item${currentArticleId === a.id ? ' active' : ''}`}
                  onClick={() => goArticle(a.id)}
                >
                  <span className={`nav-item-dot ${tierDot(a.level)}`} />
                  <span className="nav-item-label">{enVal(a, 'title', lang)}</span>
                </button>
              ))}
            </div>
          )}

          <div className="sidebar-section">
            <div className="sidebar-label">주제 · {t('reading.topic_zh', lang)}</div>
            {topics.filter((tp) => tp.key !== STORY_TOPIC).map((tp) => {
              const n = visible.filter((a) => a.topic === tp.key).length;
              if (n === 0) return null;
              return (
                <button
                  key={tp.key}
                  className={`nav-item${activeTopic === tp.key ? ' active' : ''}`}
                  onClick={() => goTopic(tp.key)}
                >
                  <span className="nav-item-emoji">{tp.emoji}</span>
                  <span className="nav-item-label">{tp.key}</span>
                  <span className="count">{n}</span>
                </button>
              );
            })}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">난이도 · {t('reading.difficulty_zh', lang)}</div>
            <button
              className={`nav-item${activeLevel === 'all' || activeLevel === undefined ? ' active' : ''}`}
              onClick={() => goLevel('all')}
            >
              <span className="nav-item-emoji"><GraduationCap size={15} /></span>
              <span className="nav-item-label">전체 · {t('reading.all_zh', lang)}</span>
            </button>
            {LEVEL_ORDER.map((lv) => {
              const n = visible.filter((a) => a.level === lv).length;
              if (n === 0) return null;
              return (
                <button
                  key={lv}
                  className={`nav-item${activeLevel === lv ? ' active' : ''}`}
                  onClick={() => goLevel(lv)}
                >
                  <span className={`nav-item-dot ${tierDot(lv)}`} />
                  <span className="nav-item-label">{levelLabel[lv]}</span>
                  <span className="count">{n}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {onReopenIntro && (
          <button className="sidebar-reopen" onClick={onReopenIntro}>
            📖 도서관 소개 다시 보기 · {t('reading.reopen_intro_zh', lang)}
          </button>
        )}

        <div className="sidebar-foot">
          <div className="sidebar-stat"><BookOpen size={13} /> {t('reading.finished', lang)} <b>{doneCount}</b></div>
          <div className="sidebar-stat"><Bookmark size={13} /> {t('reading.new_words', lang)} <b>{savedWords}</b></div>
        </div>
      </aside>
    </>
  );
}
