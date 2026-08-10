'use client';
// 书架卡片：统一故事集和禁书的 book 渲染，消除 page.tsx 中三处重复
import { Clock, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { levelLabel } from '@/data/reading-meta';
import type { Article, UserArticleProgress } from '@/types';
import { storyCoverUrl } from './storyCover';
import { useLang } from '@/components/LangProvider';
import { t, enVal } from '@/lib/i18n';
import { saveReturnUrl } from '@/lib/membership-upgrade';

function tierLabel(level: Article['level']): string {
  if (level === 'A1' || level === 'A2') return 'beginner';
  if (level === 'B1' || level === 'B2') return 'intermediate';
  return 'advanced';
}

export default function BookCard({
  article,
  status,
  coverTint,
  variant = 'story',
  seqTag,
  locked = false,
  onOpen,
}: {
  article: Article;
  status?: UserArticleProgress['status'];
  coverTint: string;
  variant?: 'story' | 'forbidden';
  seqTag?: string;
  locked?: boolean;
  onOpen: (id: string) => void;
}) {
  const { lang } = useLang();
  const isForbidden = variant === 'forbidden';
  const router = useRouter();
  const handleClick = () => {
    if (locked) { saveReturnUrl(); router.push('/membership'); return; }
    onOpen(article.id);
  };
  return (
    <div className="book" onClick={handleClick}>
      <div className={`cover ${coverTint}${isForbidden ? ' cover-forbidden' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={storyCoverUrl(article.id)} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <span className="cover-series">{seqTag ?? '동물 도시 이야기'}</span>
        <span className="cover-title">{article.titleKo}</span>
        {locked && <span className="cover-badge locked"><Lock size={10} /> {t('reading.member_only', lang)}</span>}
        {!locked && status === 'completed' && <span className="cover-badge done">✓</span>}
        {!locked && status === 'reading' && <span className="cover-badge reading">읽는 중</span>}
      </div>
      <div className="book-meta">
        <span className={`book-diff ${tierLabel(article.level)}`}>{levelLabel[article.level]}</span>
        <div className="book-title">{enVal(article, 'title', lang)}</div>
        <div className="book-kr">{article.titleKo}</div>
        <div className="book-foot"><Clock size={11} />{article.estimatedMinutes}분</div>
      </div>
    </div>
  );
}
