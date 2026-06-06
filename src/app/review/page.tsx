'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { speak, speakBrowser } from '@/lib/tts';

// ─── Types ────────────────────────────────────────────────────────────────────

type CardType = 'word' | 'sentence' | 'grammar';
type RatingType = 'forgot' | 'fuzzy' | 'remember';
type FilterType = 'all' | 'words' | 'sentences' | 'grammar' | 'kpop' | 'reading';

interface FlashCard {
  id: string;
  type: CardType;
  typeLabel: string;
  source: string;         // 来自：韩娱热点 / KPOP / 影子跟读 / 内容拆解
  reviewCount: number;    // 第 N 次复习
  front: string;          // 韩文词 / 句子 / 语法点
  sub: string;            // 罗马音 / 简短提示
  meaning: string;        // 中文意思
  note: string;           // 用法说明
  example: string;        // 例句（韩文 + 中文，\n 分隔）
  audioUrl?: string;
  slowAudioUrl?: string;
  sourceUrl?: string;
  // DB metadata
  dbId?: number;
  srsLevel?: number;
  easeFactor?: number;
  interval?: number;
}

// ─── Mock data (used when DB is empty / not logged in) ────────────────────────

const MOCK_CARDS: FlashCard[] = [
  {
    id: 'mock-1',
    type: 'word',
    typeLabel: '单词卡',
    source: '来自：韩娱热点',
    reviewCount: 4,
    front: '기대감',
    sub: 'gi-dae-gam',
    meaning: '期待感',
    note: '韩娱新闻里常见，表示对回归、舞台、作品的期待。',
    example: '컴백 기대감이 높아졌다。\n回归期待感提高了。',
  },
  {
    id: 'mock-2',
    type: 'sentence',
    typeLabel: '句子卡',
    source: '来自：KPOP',
    reviewCount: 2,
    front: '숨 참고 love dive',
    sub: 'sum chamgo love dive',
    meaning: '屏住呼吸，坠入爱里。',
    note: '숨을 참다 表示屏住呼吸，歌词里常被压缩成 숨 참고。',
    example: '숨 참고 시작해 봐。\n屏住呼吸试着开始吧。',
  },
  {
    id: 'mock-3',
    type: 'grammar',
    typeLabel: '语法卡',
    source: '来自：内容拆解',
    reviewCount: 3,
    front: '-고 있다',
    sub: '正在……',
    meaning: '正在进行',
    note: '表示动作或状态正在持续，不要把 있다 单独理解成"有"。',
    example: '한국어를 배우고 있어요。\n我正在学韩语。',
  },
  {
    id: 'mock-4',
    type: 'word',
    typeLabel: '单词卡',
    source: '来自：影子跟读',
    reviewCount: 1,
    front: '기분',
    sub: 'gi-bun',
    meaning: '心情 / 感觉',
    note: '常见搭配：기분이 좋아요、기분이 이상해。',
    example: '오늘은 기분이 좋아요。\n今天心情很好。',
  },
];

// ─── DB → FlashCard mapper ────────────────────────────────────────────────────

function dbWordToCard(w: any): FlashCard {
  const sourceMap: Record<string, string> = {
    kpop: '来自：KPOP',
    reading: '来自：韩娱热点',
    shadowing: '来自：影子跟读',
    analyze: '来自：内容拆解',
  };
  const src = w.source || w.sourceType || '';
  return {
    id: String(w.id),
    type: 'word',
    typeLabel: '单词卡',
    source: sourceMap[src] || '来自：我的词汇',
    reviewCount: (w.srsLevel || 0) + 1,
    front: w.word || w.korean || '',
    sub: w.pronunciation || w.romanization || '',
    meaning: w.meaning || w.chinese || '',
    note: w.usage || w.note || '',
    example: w.examples?.[0]
      ? `${w.examples[0].text}\n${w.examples[0].translation}`
      : '',
    audioUrl: w.audioUrl,
    slowAudioUrl: w.slowAudioUrl,
    dbId: w.id,
    srsLevel: w.srsLevel,
    easeFactor: w.easeFactor,
    interval: w.interval,
  };
}

// ─── Filter chips ─────────────────────────────────────────────────────────────

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'words', label: '我的词' },
  { key: 'sentences', label: '我的句子' },
  { key: 'grammar', label: '语法卡' },
  { key: 'kpop', label: 'KPOP' },
  { key: 'reading', label: '热点阅读' },
];

// ─── Main content ─────────────────────────────────────────────────────────────

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [done, setDone] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<'normal' | 'slow' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ── Load cards from DB ──
  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const now = Date.now();
      let dueWords: any[] = [];

      if (videoId) {
        dueWords = await db.words.where('sourceVideoId').equals(videoId).toArray();
      } else {
        dueWords = await db.words.where('nextReview').belowOrEqual(now).sortBy('nextReview');
        if (dueWords.length === 0) {
          dueWords = await db.words
            .where('mastery')
            .anyOf('new', 'learning', 'reviewing')
            .limit(20)
            .toArray();
        }
      }

      if (dueWords.length > 0) {
        setCards(dueWords.map(dbWordToCard));
      } else {
        setCards([]);
      }
      setDone(0);
      setCurrentIdx(0);
      setRevealed(false);
      setComplete(false);
    } catch {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => { loadCards(); }, [loadCards]);

  // ── Filter cards ──
  const filteredCards = cards.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'words') return c.type === 'word';
    if (filter === 'sentences') return c.type === 'sentence';
    if (filter === 'grammar') return c.type === 'grammar';
    if (filter === 'kpop') return c.source.includes('KPOP');
    if (filter === 'reading') return c.source.includes('韩娱热点');
    return true;
  });

  const total = filteredCards.length;
  const current = filteredCards[currentIdx];
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  // ── Audio ──
  const playAudio = async (slow = false) => {
    if (!current) return;
    const type = slow ? 'slow' : 'normal';
    setPlayingAudio(type);

    try {
      if (slow && current.slowAudioUrl) {
        const a = new Audio(current.slowAudioUrl);
        a.playbackRate = 1;
        audioRef.current = a;
        a.play();
        a.onended = () => setPlayingAudio(null);
      } else if (!slow && current.audioUrl) {
        const a = new Audio(current.audioUrl);
        audioRef.current = a;
        a.play();
        a.onended = () => setPlayingAudio(null);
      } else if (slow) {
        // Slow mode: use browser TTS at 0.75x so playback rate actually applies
        await speakBrowser(current.front, 0.75);
        setPlayingAudio(null);
      } else {
        await speak(current.front, 1);
        setPlayingAudio(null);
      }
    } catch {
      setPlayingAudio(null);
    }
  };

  // ── Rating ──
  const handleRate = async (rate: RatingType) => {
    if (!current) return;

    // SRS update for DB words
    if (current.dbId) {
      const qualityMap: Record<RatingType, number> = { forgot: 0, fuzzy: 2, remember: 5 };
      const q = qualityMap[rate];
      const result = calculateSRS(q, current.srsLevel ?? 0, current.easeFactor ?? 2.5, current.interval ?? 1);
      const newMastery = result.srsLevel >= 5 ? 'mastered' : result.srsLevel >= 3 ? 'reviewing' : 'learning';
      await db.words.update(current.dbId as any, {
        srsLevel: result.srsLevel,
        easeFactor: result.easeFactor,
        interval: result.interval,
        nextReview: result.nextReview,
        lastReviewed: Date.now(),
        mastery: newMastery,
      }).catch(() => {});
    }

    setDone(d => d + 1);

    if (rate === 'forgot') {
      // Re-queue at end
      setCards(prev => {
        const copy = [...prev];
        const item = copy.splice(currentIdx, 1)[0];
        copy.push(item);
        return copy;
      });
      // Stay at same index (next card slides in)
      setTimeout(() => setRevealed(false), 260);
    } else {
      if (currentIdx + 1 >= filteredCards.length) {
        setComplete(true);
      } else {
        setCurrentIdx(i => i + 1);
        setTimeout(() => setRevealed(false), 260);
      }
    }
  };

  const handleSkip = () => {
    if (currentIdx + 1 < filteredCards.length) {
      setCurrentIdx(i => i + 1);
      setRevealed(false);
    }
  };

  const handleReveal = () => setRevealed(true);
  const handleAgain = () => setRevealed(true);

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  // ── Complete ──
  if (complete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="w-20 h-20 rounded-full bg-[#eaf8f5] flex items-center justify-center text-4xl">🎉</div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">复习完成</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">今天的复习全做完了，明天再来吧</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadCards}
            className="px-6 py-2.5 rounded-full bg-[#201815] text-white text-sm font-black"
          >
            再来一轮
          </button>
          <button
            onClick={() => router.push('/daily')}
            className="px-6 py-2.5 rounded-full bg-white border border-[#eee0d8] text-[#5a4640] text-sm font-black"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="text-4xl">📚</div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">还没有复习内容</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">去拆解句子、跟读视频、保存你的第一个词吧</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push('/ai/analyze')}
            className="px-6 py-3 rounded-full bg-[#201815] text-white text-sm font-black">
            去拆解内容
          </button>
          <button onClick={() => router.push('/daily')}
            className="px-6 py-3 rounded-full bg-white border border-[#eee0d8] text-[#5a4640] text-sm font-black">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // ── Example lines ──
  const [exKo, exZh] = current.example.split('\n');

  return (
    <div
      className="flex flex-col pb-[80px]"
      style={{ minHeight: 'calc(100dvh - 60px)' }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 shrink-0 rounded-2xl bg-white border border-[#eee0d8] flex items-center justify-center text-[#4d3933]"
            style={{ boxShadow: '0 8px 20px rgba(78,52,46,.06)' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="text-[17px] font-black text-[var(--text-primary)] leading-tight">闪卡复习</div>
            <div className="text-[12px] font-black text-[var(--text-muted)] mt-0.5">轻量复习</div>
          </div>
        </div>
        <span
          className="h-[30px] inline-flex items-center px-3 rounded-full bg-[#fff0f5] text-[#f0799b] text-[11px] font-black border border-[rgba(255,127,168,.16)] whitespace-nowrap"
        >
          SRS
        </span>
      </div>

      <div className="flex-1 px-4 flex flex-col gap-0">
        {/* ── Filter chips ── */}
        <div className="flex items-end justify-between mb-2 mt-1">
          <h2 className="text-[18px] font-black text-[var(--text-primary)] tracking-tight">复习范围</h2>
          <span className="text-[12px] font-black text-[#f0799b]">来源筛选</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key); setCurrentIdx(0); setRevealed(false); }}
              className="h-9 whitespace-nowrap rounded-full px-3 text-[12px] font-black border transition-all shrink-0"
              style={
                filter === f.key
                  ? { background: '#201815', color: '#fff', border: '1px solid #201815' }
                  : { background: '#fff', color: '#7b665f', border: '1px solid #eee0d8' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Progress ── */}
        <div
          className="rounded-[28px] p-3.5 bg-white border border-[#eee0d8] mb-3"
          style={{ boxShadow: '0 16px 42px rgba(78,52,46,.10)' }}
        >
          <div className="flex justify-between items-center text-[12px] font-black text-[var(--text-muted)] mb-2.5">
            <span>今日进度</span>
            <span>{done} / {total}</span>
          </div>
          <div className="h-[9px] rounded-full bg-[#eadcd5] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #aee3d8, #ff7fa8)',
              }}
            />
          </div>
        </div>

        {/* ── Card section header ── */}
        <div className="flex items-end justify-between mb-2">
          <h2 className="text-[18px] font-black text-[var(--text-primary)] tracking-tight">当前闪卡</h2>
          <span className="text-[12px] font-black text-[#f0799b]">{current.typeLabel}</span>
        </div>

        {/* ── Flashcard ── */}
        <article
          className="rounded-[36px] bg-white border border-[#eee0d8] p-[18px] flex flex-col transition-all duration-300 mb-3"
          style={{
            minHeight: 430,
            boxShadow: '0 28px 72px rgba(78,52,46,.18)',
            background: revealed
              ? 'linear-gradient(180deg,#fff,#fffaf7)'
              : '#fff',
          }}
        >
          {/* Card head */}
          <div className="flex justify-between items-center gap-2.5">
            <span
              className="h-7 inline-flex items-center px-2.5 rounded-full text-[11px] font-black border"
              style={{ background: '#fff0f5', color: '#f0799b', borderColor: 'rgba(255,127,168,.16)' }}
            >
              {current.source}
            </span>
            <span
              className="h-7 inline-flex items-center px-2.5 rounded-full text-[11px] font-black"
              style={{ background: '#eaf8f5', color: '#4e746d' }}
            >
              第 {current.reviewCount} 次复习
            </span>
          </div>

          {/* Front text */}
          <div
            className="text-center"
            style={{ marginTop: revealed ? 34 : 58 }}
          >
            <div
              className="text-[42px] font-black leading-tight tracking-tight"
              style={{ wordBreak: 'keep-all', color: '#241917' }}
            >
              {current.front}
            </div>
            <div className="mt-3 text-[13px] font-black" style={{ color: '#a08f87' }}>
              {current.sub}
            </div>
          </div>

          {/* Audio buttons */}
          <div
            className="grid gap-2 mx-auto w-full mt-[34px]"
            style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 280 }}
          >
            <button
              onClick={() => playAudio(false)}
              disabled={playingAudio === 'normal'}
              className="h-[42px] rounded-full text-[12px] font-black text-white transition-opacity"
              style={{ background: '#201815', boxShadow: '0 10px 22px rgba(32,24,21,.14)' }}
            >
              {playingAudio === 'normal' ? '播放中…' : '播放读音'}
            </button>
            <button
              onClick={() => playAudio(true)}
              disabled={playingAudio === 'slow'}
              className="h-[42px] rounded-full text-[12px] font-black border transition-opacity"
              style={{ background: '#fff0f5', color: '#f0799b', borderColor: 'rgba(255,127,168,.18)' }}
            >
              {playingAudio === 'slow' ? '播放中…' : '慢速跟读'}
            </button>
          </div>

          {/* Answer (revealed) */}
          {revealed && (
            <div className="mt-auto pt-[26px]">
              {/* Meaning */}
              <div
                className="rounded-[26px] p-[15px] border"
                style={{ background: '#fff8f4', borderColor: 'rgba(239,224,217,.92)' }}
              >
                <strong className="block text-[18px] font-black text-[#241917]">{current.meaning}</strong>
                <span className="block mt-1.5 text-[13px] leading-relaxed" style={{ color: '#7e6b64' }}>
                  {current.note}
                </span>
              </div>

              {/* Example */}
              {current.example && (
                <div
                  className="mt-2.5 rounded-[22px] p-[13px] text-[13px] leading-relaxed"
                  style={{ background: '#eaf8f5', color: '#416b63' }}
                >
                  {exKo && <div>{exKo}</div>}
                  {exZh && <div style={{ color: '#6b9e96', marginTop: 2 }}>{exZh}</div>}
                </div>
              )}

              {/* Card actions */}
              <div className="grid gap-2 mt-3.5" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <button
                  className="h-[42px] rounded-full text-[12px] font-black text-white border"
                  style={{ background: '#201815', borderColor: '#201815' }}
                >
                  保存例句
                </button>
                {current.sourceUrl ? (
                  <Link
                    href={current.sourceUrl}
                    className="h-[42px] rounded-full text-[12px] font-black border flex items-center justify-center"
                    style={{ background: '#fff', color: '#5a4640', borderColor: '#eee0d8' }}
                  >
                    查看来源
                  </Link>
                ) : (
                  <button
                    className="h-[42px] rounded-full text-[12px] font-black border"
                    style={{ background: '#fff', color: '#5a4640', borderColor: '#eee0d8' }}
                  >
                    查看来源
                  </button>
                )}
              </div>
            </div>
          )}
        </article>

        {/* ── Reveal button ── */}
        {!revealed && (
          <button
            onClick={handleReveal}
            className="w-full h-12 rounded-full text-white text-[14px] font-black mb-3"
            style={{
              background: '#201815',
              boxShadow: '0 14px 28px rgba(32,24,21,.18)',
              border: 'none',
            }}
          >
            查看答案
          </button>
        )}

        {/* ── Rating buttons ── */}
        {revealed && (
          <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <button
              onClick={() => handleRate('forgot')}
              className="min-h-[58px] rounded-[22px] flex flex-col items-center justify-center gap-1.5 text-[12px] font-black border"
              style={{ background: '#fff0f5', color: '#f0799b', borderColor: 'rgba(255,127,168,.18)' }}
            >
              <b className="text-[15px] font-black">忘了</b>
              <span>马上再见</span>
            </button>
            <button
              onClick={() => handleRate('fuzzy')}
              className="min-h-[58px] rounded-[22px] flex flex-col items-center justify-center gap-1.5 text-[12px] font-black border"
              style={{ background: '#fff8f4', color: '#7d6860', borderColor: '#eee0d8' }}
            >
              <b className="text-[15px] font-black">模糊</b>
              <span>稍后复习</span>
            </button>
            <button
              onClick={() => handleRate('remember')}
              className="min-h-[58px] rounded-[22px] flex flex-col items-center justify-center gap-1.5 text-[12px] font-black border"
              style={{ background: '#eaf8f5', color: '#4e746d', borderColor: 'rgba(174,227,216,.55)' }}
            >
              <b className="text-[15px] font-black">记得</b>
              <span>延后复习</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="fixed left-0 right-0 px-[18px] pb-4 pt-3 md:hidden"
        style={{
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
          height: '80px',
          background: 'rgba(255,255,255,.96)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid #eee0d8',
        }}
      >
        <div className="grid h-full gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <button
            onClick={handleSkip}
            className="rounded-[20px] text-[12px] font-black border"
            style={{ background: '#fff8f4', color: '#6b5851', borderColor: '#eee0d8' }}
          >
            跳过
          </button>
          <button
            onClick={handleAgain}
            className="rounded-[20px] text-[12px] font-black text-white"
            style={{ background: '#201815' }}
          >
            再看答案
          </button>
          <button
            onClick={() => setComplete(true)}
            className="rounded-[20px] text-[12px] font-black border"
            style={{ background: '#fff8f4', color: '#6b5851', borderColor: '#eee0d8' }}
          >
            结束复习
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
