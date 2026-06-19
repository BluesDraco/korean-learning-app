'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, X, BookmarkPlus, Check } from 'lucide-react';
import { getHotPostById, getHotPosts } from '@/data/koreanHotPosts';
import type { KoreanReadingToken, KoreanGrammarNote, KoreanReadingSentence } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { speak, speakWord } from '@/lib/tts';
import { useTheme } from '@/components/ThemeProvider';

// ── Design tokens (matches Tori_HotReading_Detail_UI_Demo.html) ──
const LIGHT_C = {
  bg: '#fff7f4', paper: '#ffffff', ink: '#241917', muted: '#89756e', line: '#eee0d8',
  pink: '#ff7fa8', pinkSoft: '#fff0f5', mint: '#aee3d8', mintSoft: '#e9f8f4',
  cream: '#fff8f4', black: '#201815', levelBg: '#fff0f5', levelText: '#e0607a',
};
const DARK_C = {
  bg: '#1E1B2E', paper: '#282440', ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060',
  pink: '#ff7fa8', pinkSoft: '#2D2848', mint: '#4A6058', mintSoft: '#1E3530',
  cream: '#252040', black: '#3A3060', levelBg: '#2D2848', levelText: '#ff7fa8',
};

// ── Word Modal ────────────────────────────────────────────────────

function WordModal({ token, onClose, onSave, saved, C }: {
  token: KoreanReadingToken;
  onClose: () => void;
  onSave: () => void;
  saved: boolean;
  C: typeof LIGHT_C;
}) {
  // Close on backdrop click
  const handleBackdrop = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(36,25,23,0.38)',
        display: 'flex', alignItems: 'flex-end',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 480, margin: '0 auto',
        background: C.paper, borderRadius: '24px 24px 0 0',
        padding: '24px 20px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: C.ink, letterSpacing: -0.3 }}>
              {token.surface}
            </h2>
            <button
              onClick={() => speakWord(token.surface, 0.75)}
              style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${C.line}`, background: C.cream, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}
            >
              🔊
            </button>
          </div>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 999, border: 'none', background: '#f0e8e4', cursor: 'pointer', display: 'flex' }}>
            <X size={16} color={C.muted} />
          </button>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.pink, marginBottom: 14 }}>
          {token.meaning}
        </div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>
          {token.baseForm && token.baseForm !== token.surface && (
            <><strong style={{ color: C.ink }}>原形：</strong>{token.baseForm}<br /></>
          )}
          {token.partOfSpeech && (
            <><strong style={{ color: C.ink }}>词性：</strong>{token.partOfSpeech}<br /></>
          )}
          {token.note && (
            <span style={{ color: C.muted }}>{token.note}</span>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <button
            onClick={onSave}
            disabled={saved}
            style={{
              height: 42, borderRadius: 999, border: 'none', cursor: saved ? 'default' : 'pointer',
              fontWeight: 900, fontSize: 13,
              background: saved ? C.mintSoft : C.black,
              color: saved ? C.mint : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
          >
            {saved ? <><Check size={14} />已保存</> : '保存到我的词'}
          </button>
          <button
            onClick={onClose}
            style={{
              height: 42, borderRadius: 999, border: `1px solid ${C.line}`, cursor: 'pointer',
              fontWeight: 900, fontSize: 13,
              background: C.cream, color: '#5a4640',
            }}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sentence Card ─────────────────────────────────────────────────

function SentenceCard({ sentence, index, postId, sourceName, titleKo, onTokenClick, onSaveAllTokens, savedTokens, C }: {
  sentence: KoreanReadingSentence;
  index: number;
  postId: string;
  sourceName: string;
  titleKo: string;
  onTokenClick: (token: KoreanReadingToken) => void;
  onSaveAllTokens: (tokens: KoreanReadingToken[]) => void;
  savedTokens: Set<string>;
  C: typeof LIGHT_C;
}) {
  const { user } = useAuth();
  const [sentenceSaved, setSentenceSaved] = useState(false);

  const handleSaveSentence = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || sentenceSaved) return;
    try {
      await db.sentences.put({
        id: `hotread-${postId}-${sentence.id}`,
        userId: user.id,
        korean: sentence.korean,
        chinese: sentence.chinese,
        sourceType: 'news_reading',
        sourceId: postId,
        sourceTitle: `${sourceName} · ${titleKo}`,
        note: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setSentenceSaved(true);
    } catch { /* ignore */ }
  }, [user, sentenceSaved, postId, sentence, sourceName, titleKo]);

  const visibleTokens = sentence.tokens.filter(t => t.meaning && t.meaning.trim());
  const levelLabel: string | null = null; // type field not in current data schema

  return (
    <article style={{
      background: C.paper, borderRadius: 20,
      border: `1px solid ${C.line}`,
      padding: '18px 18px 14px',
      boxShadow: '0 2px 10px rgba(36,25,23,0.04)',
    }}>
      {/* Head row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          height: 24, padding: '0 10px', borderRadius: 999,
          background: C.ink, color: '#fff',
          fontSize: 11, fontWeight: 900,
          display: 'inline-flex', alignItems: 'center',
        }}>
          第 {index + 1} 句
        </span>
        {levelLabel && (
          <span style={{
            height: 24, padding: '0 10px', borderRadius: 999,
            background: C.levelBg, color: C.levelText,
            fontSize: 11, fontWeight: 900,
            display: 'inline-flex', alignItems: 'center',
          }}>
            {levelLabel}
          </span>
        )}
        <button
          onClick={() => speak(sentence.korean, 0.8)}
          style={{ marginLeft: 'auto', height: 28, padding: '0 10px', borderRadius: 999, border: `1px solid ${C.line}`, background: C.cream, cursor: 'pointer', fontSize: 12, fontWeight: 800, color: C.muted, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          🔊 朗读
        </button>
      </div>

      {/* Korean tokens */}
      <p style={{ fontSize: 16, fontWeight: 800, color: C.ink, lineHeight: 1.9, marginBottom: 8, wordBreak: 'break-word' }}>
        {visibleTokens.length > 0
          ? visibleTokens.map((t, i) => (
            <span
              key={i}
              onClick={() => onTokenClick(t)}
              style={{
                display: 'inline-block', cursor: 'pointer',
                padding: '1px 4px', margin: '1px 2px',
                borderRadius: 6,
                background: savedTokens.has(t.surface) ? `${C.mint}30` : `${C.pink}12`,
                border: `1px solid ${savedTokens.has(t.surface) ? C.mint : C.pink}22`,
                transition: 'background 0.15s',
              }}
            >
              {t.surface}
            </span>
          ))
          : <span style={{ color: C.ink }}>{sentence.korean}</span>
        }
      </p>

      {/* Chinese */}
      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        {sentence.chinese}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: C.line, marginBottom: 14 }} />

      {/* Key words */}
      {visibleTokens.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 900, color: `${C.muted}99`, marginBottom: 8, letterSpacing: 0.5 }}>
            关键词
          </div>
          <div style={{ marginBottom: 14 }}>
            {visibleTokens.slice(0, 5).map((t, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 0',
                borderBottom: i < Math.min(visibleTokens.length, 5) - 1 ? `1px solid ${C.line}50` : 'none',
              }}>
                <strong style={{ fontSize: 13, color: C.ink }}>{t.baseForm || t.surface}</strong>
                <span style={{ fontSize: 13, color: C.muted }}>{t.meaning}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Grammar notes */}
      {sentence.grammarNotes.length > 0 && sentence.grammarNotes.map((gn: KoreanGrammarNote, gi: number) => (
        <div key={gi} style={{
          background: C.mintSoft, borderRadius: 12,
          padding: '10px 14px', marginBottom: 8,
          fontSize: 13, lineHeight: 1.7, color: '#3d6b64',
        }}>
          <strong style={{ color: '#2d8a7c' }}>{gn.pattern}：</strong>
          {gn.explanation || gn.meaning}
        </div>
      ))}

      {/* Save row */}
      {user && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <button
            onClick={handleSaveSentence}
            disabled={sentenceSaved}
            style={{
              height: 38, borderRadius: 999, border: 'none', cursor: sentenceSaved ? 'default' : 'pointer',
              fontWeight: 900, fontSize: 12,
              background: sentenceSaved ? `${C.mint}30` : C.black,
              color: sentenceSaved ? C.mint : '#fff',
              transition: 'all 0.15s',
            }}
          >
            {sentenceSaved ? '已保存' : '保存句子'}
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              onSaveAllTokens(visibleTokens.slice(0, 5));
            }}
            style={{
              height: 38, borderRadius: 999,
              border: `1px solid ${C.line}`,
              background: C.cream, color: '#5a4640',
              fontWeight: 900, fontSize: 12, cursor: 'pointer',
            }}
          >
            保存单词
          </button>
        </div>
      )}
    </article>
  );
}

// ── Main Page ─────────────────────────────────────────────────────

export default function HotPostDetailPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const post = useMemo(() => getHotPostById(id), [id]);
  const { user } = useAuth();

  // Adjacent posts for prev/next navigation
  const { prevId, nextId } = useMemo(() => {
    const all = getHotPosts();
    const idx = all.findIndex(p => p.id === id);
    return {
      prevId: idx < all.length - 1 ? all[idx + 1].id : null,
      nextId: idx > 0 ? all[idx - 1].id : null,
    };
  }, [id]);

  // Word modal state
  const [activeToken, setActiveToken] = useState<KoreanReadingToken | null>(null);
  const [savedTokens, setSavedTokens] = useState<Set<string>>(new Set());
  const [markedRead, setMarkedRead] = useState(false);

  // Record reading progress
  useEffect(() => {
    if (!user || !post) return;
    db.readingProgress.put({
      id: `read-${user.id}-${post.id}`,
      userId: user.id,
      postId: post.id,
      readAt: Date.now(),
    }).catch(() => {});
  }, [user, post]);

  const handleSaveToken = useCallback(async (token: KoreanReadingToken) => {
    if (!user || !post || savedTokens.has(token.surface)) return;
    try {
      await db.words.put({
        id: `hotread-${post.id}-${token.surface}`,
        word: token.surface,
        pronunciation: '',
        meaning: token.meaning,
        partOfSpeech: token.partOfSpeech || '',
        examples: [],
        mastery: 'new',
        srsLevel: 0,
        nextReview: Date.now(),
        easeFactor: 2.5,
        interval: 0,
        createdAt: Date.now(),
        lastReviewed: null,
        source: 'news_reading',
        sourceDetail: `${post.sourceName} · ${post.originalTitleKo}`,
      });
      setSavedTokens(prev => new Set(prev).add(token.surface));
    } catch { /* ignore */ }
  }, [user, post, savedTokens]);

  const handleMarkRead = useCallback(() => {
    setMarkedRead(true);
    if (!user || !post) return;
    db.readingProgress.put({
      id: `read-${user.id}-${post.id}`,
      userId: user.id,
      postId: post.id,
      readAt: Date.now(),
    }).catch(() => {});
  }, [user, post]);

  if (!post) {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center' }}>
        <p style={{ color: C.muted, fontSize: 14, fontWeight: 700 }}>未找到该文章</p>
        <Link href="/korea/kpop/news" style={{ color: C.pink, fontSize: 13, fontWeight: 700, marginTop: 8, display: 'inline-block' }}>
          返回韩娱热点阅读
        </Link>
      </div>
    );
  }

  const allSentences = post.paragraphs?.flatMap(p => p.sentences) ?? [];
  const totalSentences = post.totalSentences ?? allSentences.length;
  const totalTokens = post.totalTokens ?? 0;
  const totalGrammar = post.totalGrammar ?? 0;

  const dateStr = post.originalPublishedAt
    ? new Date(post.originalPublishedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
    : '';

  // "这条在讲什么" — use bodyZh first 80 chars as core content
  const coreSummary = post.bodyZh
    ? (post.bodyZh.length > 90 ? post.bodyZh.slice(0, 88) + '…' : post.bodyZh)
    : null;

  // Difficulty label
  const difficultyLabel = (() => {
    const d = (post as { difficulty?: string }).difficulty;
    if (d === 'easy') return '初级阅读';
    if (d === 'hard') return '高级阅读';
    return '中级阅读';
  })();

  return (
    <div style={{ background: C.bg, minHeight: '100dvh', paddingBottom: 100 }}>

      {/* ── Back bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px 10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/korea/kpop/news" style={{
            width: 34, height: 34, borderRadius: 999,
            background: C.paper, border: `1px solid ${C.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: C.ink, textDecoration: 'none',
          }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: C.ink }}>热点阅读</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>正文阅读 + 逐句精读</div>
          </div>
        </div>
        {post.readingStatus?.readingReady && (
          <span style={{
            height: 26, padding: '0 12px', borderRadius: 999,
            background: C.mintSoft, color: '#2d8a7c',
            fontSize: 11, fontWeight: 900,
            display: 'inline-flex', alignItems: 'center',
          }}>
            已准备好
          </span>
        )}
      </div>

      {/* ── Article header card ── */}
      <div style={{ padding: '0 14px' }}>
        <div style={{
          background: C.paper, borderRadius: 20,
          border: `1px solid ${C.line}`,
          padding: '18px 18px 16px',
          marginBottom: 14,
        }}>
          {/* Source row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 11, color: C.muted, fontWeight: 700 }}>
            <span>{post.sourceName}</span>
            {dateStr && <><span style={{ opacity: 0.4 }}>·</span><span>{dateStr}</span></>}
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{
              background: C.pinkSoft, color: C.pink,
              padding: '2px 8px', borderRadius: 999, fontWeight: 900, fontSize: 10,
            }}>{difficultyLabel}</span>
          </div>

          {/* Korean title */}
          <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, lineHeight: 1.45, letterSpacing: -0.3, marginBottom: 8 }}>
            {post.originalTitleKo}
          </h1>

          {/* Chinese title */}
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>
            {post.titleZh}
          </div>

          {/* Keywords */}
          {post.keywords.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {post.keywords.slice(0, 6).map(kw => (
                <span key={kw} style={{
                  height: 26, padding: '0 10px', borderRadius: 999,
                  background: C.pinkSoft, color: C.pink,
                  fontSize: 11, fontWeight: 900,
                  display: 'inline-flex', alignItems: 'center',
                }}>
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Hero image ── */}
        {post.imageUrl && (
          <div style={{
            position: 'relative', width: '100%', borderRadius: 18,
            overflow: 'hidden', marginBottom: 14,
            aspectRatio: '16/9', background: `${C.pink}18`,
          }}>
            <Image src={post.imageUrl} alt={post.titleZh || post.originalTitleKo} fill className="object-cover" sizes="100vw" />
          </div>
        )}

        {/* ── Read stats ── */}
        <div style={{
          background: C.paper, borderRadius: 18,
          border: `1px solid ${C.line}`,
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          marginBottom: 20, overflow: 'hidden',
        }}>
          {[
            { value: totalSentences, label: '原文句' },
            { value: totalTokens, label: '可点词' },
            { value: totalGrammar, label: '语法点' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '14px 0', textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${C.line}` : 'none',
            }}>
              <b style={{ fontSize: 20, fontWeight: 900, color: C.ink, display: 'block' }}>{stat.value}</b>
              <small style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{stat.label}</small>
            </div>
          ))}
        </div>

        {/* ── 这条在讲什么 ── */}
        {coreSummary && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h2 style={{ fontSize: 15, fontWeight: 900, color: C.ink }}>这条在讲什么</h2>
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>中文背景</span>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{
                background: C.paper, borderRadius: 16,
                border: `1px solid ${C.line}`,
                padding: '14px 16px', marginBottom: 8,
              }}>
                <strong style={{ fontSize: 12, color: C.ink, display: 'block', marginBottom: 6 }}>核心内容</strong>
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{coreSummary}</span>
              </div>
            </div>
          </>
        )}

        {/* ── 正文 ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h2 style={{ fontSize: 15, fontWeight: 900, color: C.ink }}>正文</h2>
          <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>先完整阅读</span>
        </div>
        <div style={{
          background: C.paper, borderRadius: 18,
          border: `1px solid ${C.line}`,
          padding: '16px 18px', marginBottom: 20,
        }}>
          {post.paragraphs.map((pg, pi) => (
            <div key={pg.id || pi} style={pi > 0 ? { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.line}50` } : {}}>
              <p style={{ fontSize: 15, color: C.ink, lineHeight: 1.9, wordBreak: 'break-word' }}>
                {pg.korean}
              </p>
            </div>
          ))}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
            <strong style={{ fontSize: 12, color: C.ink }}>全文中文：</strong>
            <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{post.bodyZh}</span>
          </div>
        </div>

        {/* ── 逐句精读 ── */}
        {allSentences.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h2 style={{ fontSize: 15, fontWeight: 900, color: C.ink }}>逐句精读与拆解</h2>
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>点词可查看</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {allSentences.map((s, si) => (
                <SentenceCard
                  key={s.id || si}
                  sentence={s}
                  index={si}
                  postId={post.id}
                  sourceName={post.sourceName}
                  titleKo={post.originalTitleKo}
                  onTokenClick={setActiveToken}
                  onSaveAllTokens={(tokens) => tokens.forEach(t => handleSaveToken(t))}
                  savedTokens={savedTokens}
                  C={C}
                />
              ))}
            </div>
          </>
        )}

        {/* ── 阅读完成 ── */}
        <div style={{
          background: C.black, borderRadius: 20,
          padding: '22px 20px', marginBottom: 8,
          color: '#fff',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 8 }}>阅读完成</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 18 }}>
            保存的词汇和句子会进入你的词库，后续可以复习。
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'rgba(255,255,255,0.08)', borderRadius: 14,
            overflow: 'hidden',
          }}>
            {[
              { value: totalSentences, label: '核心句' },
              { value: savedTokens.size, label: '已保存词' },
              { value: totalGrammar, label: '语法点' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '12px 0', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}>
                <b style={{ fontSize: 18, fontWeight: 900, display: 'block' }}>{stat.value}</b>
                <small style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom fixed bar ── */}
      <div className="md:left-[108px] md:!bottom-0" style={{
        position: 'fixed', bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', left: 0, right: 0,
        zIndex: 100,
        background: C.paper,
        borderTop: `1px solid ${C.line}`,
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 8, maxWidth: 480, margin: '0 auto' }}>
          <button
            onClick={() => prevId && router.push(`/korea/kpop/news/${prevId}`)}
            disabled={!prevId}
            style={{
              height: 44, borderRadius: 999,
              border: `1px solid ${C.line}`,
              background: prevId ? C.cream : `${C.line}50`,
              color: prevId ? '#5a4640' : C.muted,
              fontWeight: 900, fontSize: 13, cursor: prevId ? 'pointer' : 'default',
            }}
          >
            上一篇
          </button>
          <button
            onClick={handleMarkRead}
            style={{
              height: 44, borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 900, fontSize: 13,
              background: markedRead ? C.mintSoft : C.black,
              color: markedRead ? C.mint : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
          >
            {markedRead ? <><Check size={14} />已标记</> : <><BookmarkPlus size={14} />标记已读</>}
          </button>
          <button
            onClick={() => nextId && router.push(`/korea/kpop/news/${nextId}`)}
            disabled={!nextId}
            style={{
              height: 44, borderRadius: 999,
              border: `1px solid ${C.line}`,
              background: nextId ? C.cream : `${C.line}50`,
              color: nextId ? '#5a4640' : C.muted,
              fontWeight: 900, fontSize: 13, cursor: nextId ? 'pointer' : 'default',
            }}
          >
            下一篇
          </button>
        </div>
      </div>

      {/* ── Word Modal ── */}
      {activeToken && (
        <WordModal
          token={activeToken}
          onClose={() => setActiveToken(null)}
          onSave={() => {
            handleSaveToken(activeToken);
            setActiveToken(null);
          }}
          saved={savedTokens.has(activeToken.surface)}
          C={C}
        />
      )}
    </div>
  );
}
