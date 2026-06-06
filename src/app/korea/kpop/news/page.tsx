'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Sparkles, Check, Clock, Hash } from 'lucide-react';
import { getHotPosts } from '@/data/koreanHotPosts';
import type { KoreanHotReading } from '@/types';
import { ToriCardMascot } from '@/components/mobile/ToriCardMascot';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { DesktopNewsPage } from '@/components/desktop/DesktopNewsPage';

function PostCard({ post, isRead }: { post: KoreanHotReading; isRead: boolean }) {
  const totalSentences = post.paragraphs?.reduce(
    (sum, p) => sum + p.sentences.length, 0
  ) ?? 0;
  const totalTokens = post.paragraphs?.reduce(
    (sum, p) => sum + p.sentences.reduce((s, sen) => s + sen.tokens.length, 0), 0
  ) ?? 0;
  const totalGrammar = post.paragraphs?.reduce(
    (sum, p) => sum + p.sentences.reduce((s, sen) => s + sen.grammarNotes.length, 0), 0
  ) ?? 0;

  const dateStr = post.originalPublishedAt
    ? new Date(post.originalPublishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    : '';

  return (
    <Link
      href={`/korea/kpop/news/${post.id}`}
      className="block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] overflow-hidden active:scale-[0.98] transition-all shadow-[0_8px_30px_rgba(78,52,46,0.07)] hover:shadow-[0_16px_42px_rgba(78,52,46,0.10)]"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#ffdde9]/30 to-[#eefaf6]/50" style={{ aspectRatio: '2/1' }}>
        {post.imageUrl ? (
          <Image src={post.imageUrl} alt={post.titleZh || ''} fill className="object-cover" sizes="(max-width: 640px) 100vw, 400px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-black text-[#d3869f]/60">HOT ISSUE</span>
          </div>
        )}
        {/* Hot badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="h-[28px] flex items-center px-3 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-black text-[var(--pink-primary)] tracking-wide">
            HOT
          </span>
          {isRead && (
            <span className="h-[28px] flex items-center gap-1 px-3 rounded-full bg-[var(--mint-soft)]/90 text-white text-[11px] font-black">
              <Check size={10} /> 已读
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Korean title */}
        <h3 className="text-[19px] font-black text-[var(--text-primary)] leading-tight tracking-[-0.3px] line-clamp-2 break-words">
          {post.originalTitleKo}
        </h3>

        {/* Chinese title */}
        {post.titleZh && (
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2 line-clamp-1 break-words">
            {post.titleZh}
          </p>
        )}

        {/* Source & date */}
        <div className="flex items-center gap-2 mt-3 text-[11px] text-[var(--text-muted)] font-bold">
          <span>{post.sourceName}</span>
          {dateStr && (
            <>
              <span className="text-[var(--text-muted)]/30">·</span>
              <span className="flex items-center gap-1"><Clock size={10} />{dateStr}</span>
            </>
          )}
        </div>

        {/* Keywords */}
        {post.keywords && post.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="h-[26px] flex items-center px-2.5 rounded-full bg-[var(--pink-primary)]/8 text-[11px] font-black text-[var(--pink-primary)] border border-[var(--pink-primary)]/10">
                <Hash size={9} className="mr-0.5 opacity-50" />{kw}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)]/50 py-2.5 text-center">
            <div className="text-base font-black text-[var(--text-primary)]">{totalSentences}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">原文句</div>
          </div>
          <div className="rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)]/50 py-2.5 text-center">
            <div className="text-base font-black text-[var(--pink-primary)]">{totalTokens}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">可点词</div>
          </div>
          <div className="rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)]/50 py-2.5 text-center">
            <div className="text-base font-black text-[var(--mint-soft)]">{totalGrammar}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">语法点</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function KpopNewsPage() {
  const { user } = useAuth();
  const posts = getHotPosts();
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    db.readingProgress.where('userId').equals(user.id).toArray().then((rows: any[]) => {
      setReadIds(new Set(rows.map(r => r.postId)));
    }).catch(() => {});
  }, [user]);

  const totalSentences = posts.reduce(
    (acc, p) => acc + (p.paragraphs?.reduce((s, pg) => s + pg.sentences.length, 0) ?? 0), 0
  );
  const totalTokens = posts.reduce(
    (acc, p) => acc + (p.paragraphs?.reduce((s, pg) => s + pg.sentences.reduce((t, sen) => t + sen.tokens.length, 0), 0) ?? 0), 0
  );

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopNewsPage />;

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link
          href="/korea/kpop"
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          KPOP 歌词跟唱
        </Link>
        <span className="text-[var(--text-muted)]/50">/</span>
        <span className="text-[var(--text-secondary)] font-bold">韩娱热点阅读</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[var(--pink-primary)]/8 via-white to-[var(--mint-soft)]/10 p-5 pr-28 border border-[var(--border-color)] shadow-[0_20px_50px_rgba(78,52,46,0.08)]">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 h-[34px] px-3.5 rounded-full bg-white/80 border border-[var(--pink-primary)]/15 text-[12px] font-black text-[var(--pink-primary)]">
            <span className="w-2 h-2 rounded-full bg-current" />
            韩娱热点阅读
          </span>
          <h1 className="text-[27px] font-black text-[var(--text-primary)] leading-[1.15] tracking-[-0.5px] mt-3 max-w-[240px]">
            读真实热点<br/>点词看懂韩语
          </h1>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2.5 max-w-[240px]">
            Naver News 韩文原文 + AI 翻译 + 逐词拆解 + 语法解析
          </p>
        </div>
        <ToriCardMascot pose="hot" size="md" />
      </div>

      {/* Stats bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[26px] p-4 flex items-center justify-between shadow-[0_6px_20px_rgba(78,52,46,0.05)]">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-black text-[var(--text-primary)]">{posts.length}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">篇文章</div>
          </div>
          <div className="w-px h-8 bg-[var(--border-color)]" />
          <div className="text-center">
            <div className="text-lg font-black text-[var(--pink-primary)]">{totalSentences}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">原文句子</div>
          </div>
          <div className="w-px h-8 bg-[var(--border-color)]" />
          <div className="text-center">
            <div className="text-lg font-black text-[var(--mint-soft)]">{totalTokens}</div>
            <div className="text-[10px] font-black text-[var(--text-muted)] mt-0.5">拆解词汇</div>
          </div>
        </div>
        <div className="text-[10px] font-black text-[var(--text-muted)]/50">
          Naver News
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-end justify-between">
        <h2 className="text-[18px] font-black text-[var(--text-primary)]">今日热点阅读</h2>
        <span className="text-[12px] font-black text-[var(--pink-primary)]">可学习</span>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] p-12 text-center shadow-[0_6px_20px_rgba(78,52,46,0.05)]">
          <p className="text-[14px] font-bold text-[var(--text-muted)]">暂无韩娱热点文章</p>
          <p className="text-[12px] text-[var(--text-muted)]/60 mt-1">内容正在准备中，请稍后再来</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isRead={readIds.has(post.id)} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-[12px] font-bold text-[var(--text-muted)]/50">
          内容来自 Naver News，AI 提供翻译、逐词拆解和语法解析
        </p>
      </div>
    </div>
  );
}
