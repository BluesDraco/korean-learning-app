'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { Loader2, ArrowLeft, Volume2, PenLine, ChevronRight, Shuffle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { speak, speakBrowser, cancelSpeech, speakWord } from '@/lib/tts';
import { getTodayLog, updateTodayLog } from '@/lib/gamification';
import { DiffFeedback } from '@/components/dictation/DiffFeedback';
import { getEntry, getEntryByKorean } from '@/data/vocabulary/index';

function normalizeKorean(s: string) {
  return s.normalize('NFC').replace(/[。？！，,.?!、…\s]+/g, '').trim();
}

// ─── Types ────────────────────────────────────────────────────────────────────

type CardType = 'word' | 'sentence' | 'grammar';
type RatingType = 'forgot' | 'fuzzy' | 'remember';

interface FlashCard {
  id: string;
  type: CardType;
  typeLabel: string;
  source: string;         // 来自：韩娱热点 / KPOP / 影子跟读 / 内容拆解
  reviewCount: number;    // 第 N 次复习
  front: string;          // 韩文词 / 句子 / 语法点
  sub: string;            // 罗马音 / 简短提示
  meaning: string;        // 中文意思
  partOfSpeech?: string;
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
    partOfSpeech: w.partOfSpeech || '',
    note: w.usage || w.note || '',
    example: (() => {
      const validEx = (w.examples ?? []).find((ex: any) => ex.text && ex.text !== '[object Object]' && ex.text.trim());
      if (validEx) return `${validEx.text}\n${validEx.translation ?? ''}`;
      const entry = w.sourceEntryId ? getEntry(w.sourceEntryId) : getEntryByKorean(w.word || w.korean || '');
      const staticEx = entry?.examples?.[0];
      if (staticEx) return `${staticEx.korean}\n${staticEx.chinese}`;
      return '';
    })(),
    audioUrl: w.audioUrl,
    slowAudioUrl: w.slowAudioUrl,
    dbId: w.id,
    srsLevel: w.srsLevel,
    easeFactor: w.easeFactor,
    interval: w.interval,
  };
}

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
  const [done, setDone] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [todayReviewed, setTodayReviewed] = useState(0);

  // spelling phase
  const [showSpellingPrompt, setShowSpellingPrompt] = useState(false);
  const [spellingPhase, setSpellingPhase] = useState(false);
  const [spellingWords, setSpellingWords] = useState<FlashCard[]>([]);
  const [spellingIdx, setSpellingIdx] = useState(0);
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingSubmitted, setSpellingSubmitted] = useState(false);
  const [spellingCorrectCount, setSpellingCorrectCount] = useState(0);
  const spellingInputRef = useRef<HTMLInputElement>(null);

  // sentence phase
  const [sentencePhase, setSentencePhase] = useState(false);
  const [sentenceWords, setSentenceWords] = useState<FlashCard[]>([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [sentenceBlocks, setSentenceBlocks] = useState<string[]>([]);
  const [sentenceAnswers, setSentenceAnswers] = useState<string[]>([]);
  const [sentenceUsed, setSentenceUsed] = useState<Set<number>>(new Set());
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [sentenceResult, setSentenceResult] = useState<{ isCorrect: boolean; score: number; wrongPart: string; correctPart: string; explanation: string; betterWay: string } | null>(null);
  const [sentenceJudging, setSentenceJudging] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [exampleExpanded, setExampleExpanded] = useState(false);

  useEffect(() => {
    try { setShowHint(localStorage.getItem('review-hint-enabled') !== 'false'); } catch { /* ignore */ }
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<FlashCard | null>(null);
  const currentIdxRef = useRef(0);
  const consecutiveCorrectRef = useRef<Record<string, number>>({});
  const correctWordIdsRef = useRef<string[]>([]);

  // ── Load cards from DB ──
  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const [profile, todayLog] = await Promise.all([
        db.userProfiles.get('main'),
        getTodayLog(),
      ]);
      const goal = profile?.dailyGoalWords ?? 20;
      const batchSize = profile?.reviewBatchSize ?? 10;
      const reviewed = todayLog?.wordsReviewed ?? 0;
      setDailyGoal(goal);
      setTodayReviewed(reviewed);

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
            .limit(batchSize)
            .toArray();
        }
      }

      // Limit to batch size
      if (!videoId && dueWords.length > batchSize) {
        dueWords = dueWords.slice(0, batchSize);
      }

      const cardList = dueWords.length > 0 ? dueWords.map(dbWordToCard) : MOCK_CARDS;
      setCards(cardList);
      setDone(0);
      setRevealed(false);
      setComplete(false);
      setSpellingPhase(false);
      setShowSpellingPrompt(false);
      setSpellingWords([]);
      setSpellingIdx(0);
      setSpellingInput('');
      setSpellingSubmitted(false);
      setSpellingCorrectCount(0);
      setSentencePhase(false);
      setSentenceWords([]);
      setSentenceIdx(0);
      setSentenceBlocks([]);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceChecked(false);
      setSentenceResult(null);
      correctWordIdsRef.current = [];
      try {
        const saved = sessionStorage.getItem('review-progress');
        if (saved) {
          const { idx, cardIds } = JSON.parse(saved) as { idx: number; cardIds: string[] };
          const sameSet = cardIds.length === cardList.length && cardIds.every((id, i) => id === cardList[i].id);
          if (sameSet && idx > 0 && idx < cardList.length) {
            setCurrentIdx(idx);
          } else {
            setCurrentIdx(0);
            sessionStorage.removeItem('review-progress');
          }
        } else {
          setCurrentIdx(0);
        }
      } catch {
        setCurrentIdx(0);
      }
    } catch {
      setCards(MOCK_CARDS);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => { loadCards(); }, [loadCards]);

  // persist progress
  useEffect(() => {
    if (cards.length === 0 || complete) return;
    try {
      sessionStorage.setItem('review-progress', JSON.stringify({ idx: currentIdx, cardIds: cards.map(c => c.id) }));
    } catch { /* ignore */ }
  }, [currentIdx, cards, complete]);

  // clear on complete
  useEffect(() => {
    if (complete) { try { sessionStorage.removeItem('review-progress'); } catch { /* ignore */ } }
  }, [complete]);

  // ── Filter cards ──
  const filteredCards = cards;

  const total = filteredCards.length;
  const current = filteredCards[currentIdx];
  currentRef.current = current ?? null;
  currentIdxRef.current = currentIdx;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  // ── Auto-play audio when card changes ──
  useEffect(() => {
    if (!loading && current) {
      const timer = setTimeout(() => playAudio(), 300);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, loading]);

  // ── Audio ──
  const playAudio = useCallback(() => {
    const cur = currentRef.current;
    if (!cur) return;
    cancelSpeech();
    setPlayingAudio(true);
    if (cur.audioUrl) {
      const a = new Audio(cur.audioUrl);
      audioRef.current = a;
      a.onended = () => setPlayingAudio(false);
      a.onerror = () => setPlayingAudio(false);
      a.play().catch(() => setPlayingAudio(false));
    } else {
      speak(cur.front, 0.9).then(() => setPlayingAudio(false)).catch(() => setPlayingAudio(false));
    }
  }, []);

  // ── Rating ──
  const handleRate = useCallback((rate: RatingType) => {
    const cur = currentRef.current;
    const idx = currentIdxRef.current;
    if (!cur) return;

    if (cur.dbId) {
      const qualityMap: Record<RatingType, number> = { forgot: 0, fuzzy: 2, remember: 5 };
      const q = qualityMap[rate];
      const result = calculateSRS(q, cur.srsLevel ?? 0, cur.easeFactor ?? 2.5, cur.interval ?? 1);

      // Track consecutive correct answers per word
      const wordKey = String(cur.dbId);
      if (rate === 'remember') {
        consecutiveCorrectRef.current[wordKey] = (consecutiveCorrectRef.current[wordKey] ?? 0) + 1;
      } else {
        consecutiveCorrectRef.current[wordKey] = 0;
      }
      const autoMastered = consecutiveCorrectRef.current[wordKey] >= 3;
      const newMastery = autoMastered ? 'mastered' : (result.srsLevel >= 5 ? 'mastered' : result.srsLevel >= 3 ? 'reviewing' : 'learning');

      db.words.update(cur.dbId as any, {
        srsLevel: result.srsLevel,
        easeFactor: result.easeFactor,
        interval: result.interval,
        nextReview: result.nextReview,
        lastReviewed: Date.now(),
        mastery: newMastery,
      }).catch(() => {});
    }

    // Record progress in daily log (only for non-mock cards)
    if (cur.dbId && rate !== 'forgot') {
      getTodayLog().then(log => {
        const next = log.wordsReviewed + 1;
        updateTodayLog({ wordsReviewed: next }).catch(() => {});
        setTodayReviewed(next);
      }).catch(() => {});
    }

    setDone(d => d + 1);

    if (rate === 'forgot') {
      // Move current card to end, advance to next card
      const copy = [...cards];
      copy.splice(idx, 1);
      copy.push(cur);
      // copy.length === cards.length (splice -1, push +1)
      // If idx was the last position, copy[idx] is the card we just moved — wrap to 0
      const nextIdx = idx < cards.length - 1 ? idx : 0;
      setCards(copy);
      setRevealed(false);
      if (nextIdx !== currentIdxRef.current) setCurrentIdx(nextIdx);
      const nextCard = copy[nextIdx];
      if (nextCard) setTimeout(() => speak(nextCard.front, 0.9).catch(() => {}), 300);
    } else {
      // collect correctly-answered cards for spelling phase
      if (cur.dbId) correctWordIdsRef.current.push(cur.id);
      if (idx + 1 >= cards.length) {
        const toSpell = cards.filter(c => correctWordIdsRef.current.includes(c.id));
        if (toSpell.length > 0) {
          setSpellingWords(toSpell);
          setShowSpellingPrompt(true);
        } else {
          setComplete(true);
        }
      } else {
        setCurrentIdx(idx + 1);
        setRevealed(false);
      }
    }
  }, [cards.length]);

  const handleReveal = () => { setRevealed(true); setExampleExpanded(false); };

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  // ── Spelling prompt modal ──
  if (showSpellingPrompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-soft)] flex items-center justify-center">
          <PenLine size={36} style={{ color: '#ff7fa8' }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">要进行练习吗？</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">本轮答对 {spellingWords.length} 个词</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">选择一种练习方式加深记忆</p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <button
            onClick={() => { setShowSpellingPrompt(false); setSpellingPhase(true); setTimeout(() => spellingInputRef.current?.focus(), 100); }}
            className="w-full py-3 rounded-full bg-[var(--text-primary)] text-white text-sm font-black"
          >
            默写练习
          </button>
          <button
            onClick={async () => {
              setShowSpellingPrompt(false);
              setSentenceWords(spellingWords);
              setSentenceIdx(0);
              setSentenceChecked(false);
              setSentenceResult(null);
              setSentenceAnswers([]);
              setSentenceUsed(new Set());
              setSentenceLoading(true);
              setSentencePhase(true);
              try {
                const res = await fetch('/api/ai/sentence-judge', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'generate', word: spellingWords[0].front, meaning: spellingWords[0].meaning }),
                });
                const data = await res.json();
                setSentenceBlocks(data.blocks ?? []);
              } catch {
                setSentenceBlocks([spellingWords[0].front]);
              } finally {
                setSentenceLoading(false);
              }
            }}
            className="w-full py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-black"
          >
            造句练习
          </button>
          <button
            onClick={() => { setShowSpellingPrompt(false); setComplete(true); }}
            className="w-full py-3 rounded-full bg-transparent text-[var(--text-muted)] text-sm font-black"
          >
            跳过看结果
          </button>
        </div>
      </div>
    );
  }

  // ── Spelling phase ──
  if (spellingPhase) {
    const sw = spellingWords[spellingIdx];
    const isCorrect = spellingSubmitted && normalizeKorean(spellingInput) === normalizeKorean(sw.front);
    const isWrong = spellingSubmitted && !isCorrect;

    const handleSpellingSubmit = () => {
      if (!spellingInput.trim() || spellingSubmitted) return;
      setSpellingSubmitted(true);
      if (normalizeKorean(spellingInput) === normalizeKorean(sw.front)) {
        setSpellingCorrectCount(c => c + 1);
        setTimeout(() => goNextSpelling(), 800);
      } else {
        // record wrong spelling
        db.spellingMistakes.add({
          id: crypto.randomUUID(),
          wordId: sw.dbId ? String(sw.dbId) : undefined,
          word: sw.front,
          meaning: sw.meaning,
          userInput: spellingInput,
          correctAnswer: sw.front,
          mistakeType: 'spelling',
          createdAt: Date.now(),
        }).catch(() => {});
      }
    };

    const goNextSpelling = () => {
      if (spellingIdx + 1 >= spellingWords.length) {
        setSpellingPhase(false);
        setComplete(true);
      } else {
        setSpellingIdx(i => i + 1);
        setSpellingInput('');
        setSpellingSubmitted(false);
        setTimeout(() => spellingInputRef.current?.focus(), 100);
      }
    };

    const handleSkip = async () => {
      if (sw.id) {
        await db.words.update(sw.id as any, { nextReview: Date.now() }).catch(() => {});
      }
      // record spelling mistake
      db.spellingMistakes.add({
        id: crypto.randomUUID(),
        wordId: sw.dbId ? String(sw.dbId) : undefined,
        word: sw.front,
        meaning: sw.meaning,
        userInput: spellingInput,
        correctAnswer: sw.front,
        mistakeType: 'spelling',
        createdAt: Date.now(),
      }).catch(() => {});
      goNextSpelling();
    };

    return (
      <div className="flex flex-col px-4 pt-4 pb-8 gap-4 max-w-xl mx-auto w-full" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine size={18} style={{ color: '#ff7fa8' }} />
            <span className="text-[17px] font-black text-[var(--text-primary)]">默写练习</span>
          </div>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{spellingIdx + 1} / {spellingWords.length}</span>
        </div>
        {/* Progress */}
        <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((spellingIdx) / spellingWords.length) * 100}%`, background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)' }}
          />
        </div>
        {/* Card */}
        <div className="rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-6 flex flex-col items-center gap-4 flex-1"
          style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>
          <div className="rounded-[16px] px-4 py-2" style={{ background: 'var(--bg-soft)' }}>
            <span className="text-sm font-bold" style={{ color: '#ff7fa8' }}>{sw.meaning}</span>
          </div>
          <button
            onClick={() => speakWord(sw.front, 0.8)}
            className="w-16 h-16 rounded-full flex items-center justify-center border-none"
            style={{ background: '#ff7fa8' }}
          >
            <Volume2 size={28} style={{ color: 'white' }} />
          </button>
          <p className="text-xs text-[var(--text-muted)]">听音默写韩文</p>
          {!spellingSubmitted ? (
            <div className="w-full flex flex-col gap-3">
              <input
                ref={spellingInputRef}
                value={spellingInput}
                onChange={e => setSpellingInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSpellingSubmit(); }}
                placeholder="输入你听到的韩语..."
                className="w-full"
                style={{
                  padding: '14px 16px', borderRadius: 14,
                  border: '2px solid var(--border-default)', fontSize: 18, color: 'var(--text-primary)',
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const,
                  background: 'var(--bg-card)',
                }}
              />
              <button
                onClick={handleSpellingSubmit}
                disabled={!spellingInput.trim()}
                className="w-full py-3 rounded-full text-sm font-black"
                style={{
                  background: spellingInput.trim() ? 'var(--text-primary)' : 'var(--border-default)',
                  color: spellingInput.trim() ? '#fff' : '#89756e',
                  border: 'none', cursor: spellingInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                提交
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3">
              <DiffFeedback userInput={normalizeKorean(spellingInput)} correct={normalizeKorean(sw.front)} />
              {isWrong && (
                <button
                  onClick={() => { speakWord(sw.front, 0.8); }}
                  className="w-full py-2.5 rounded-full text-sm font-bold border"
                  style={{ background: 'transparent', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}
                >
                  再听一遍
                </button>
              )}
              {isWrong ? (
                <button
                  onClick={handleSkip}
                  className="w-full py-3 rounded-full text-sm font-black flex items-center justify-center gap-2"
                  style={{ background: 'var(--bg-soft)', color: '#f0799b', border: 'none' }}
                >
                  跳过 <ChevronRight size={16} />
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Sentence phase ──
  if (sentencePhase) {
    const sw = sentenceWords[sentenceIdx];
    if (!sw) return null;

    const goNextSentence = async () => {
      const next = sentenceIdx + 1;
      if (next >= sentenceWords.length) {
        setSentencePhase(false);
        setComplete(true);
        return;
      }
      setSentenceIdx(next);
      setSentenceChecked(false);
      setSentenceResult(null);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceLoading(true);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: sentenceWords[next].front, meaning: sentenceWords[next].meaning }),
        });
        const data = await res.json();
        setSentenceBlocks(data.blocks ?? []);
      } catch {
        setSentenceBlocks([sentenceWords[next].front]);
      } finally {
        setSentenceLoading(false);
      }
    };

    const handleJudge = async () => {
      if (sentenceAnswers.length === 0) return;
      const sentence = sentenceAnswers.join('');
      setSentenceJudging(true);
      setSentenceChecked(true);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'judge', word: sw.front, meaning: sw.meaning, sentence }),
        });
        const data = await res.json();
        setSentenceResult(data);
        if (!data.isCorrect) {
          db.spellingMistakes.add({
            id: crypto.randomUUID(),
            wordId: sw.dbId ? String(sw.dbId) : undefined,
            word: sw.front,
            meaning: sw.meaning,
            userInput: sentence,
            correctAnswer: data.betterWay || sw.front,
            mistakeType: 'sentence',
            createdAt: Date.now(),
          }).catch(() => {});
        }
      } catch {
        setSentenceResult({ isCorrect: false, score: 0, wrongPart: '', correctPart: '', explanation: 'AI判断失败，请重试', betterWay: '' });
      } finally {
        setSentenceJudging(false);
      }
    };

    return (
      <div className="flex flex-col px-4 pt-4 pb-8 gap-4" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shuffle size={18} style={{ color: '#ff7fa8' }} />
            <span className="text-[17px] font-black text-[var(--text-primary)]">造句练习</span>
          </div>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{sentenceIdx + 1} / {sentenceWords.length}</span>
        </div>

        <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(sentenceIdx / sentenceWords.length) * 100}%`, background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)' }} />
        </div>

        <div className="rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-6 flex flex-col gap-4 flex-1"
          style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-[16px] px-4 py-2" style={{ background: 'var(--bg-soft)' }}>
                <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{sw.front}</span>
              </div>
              <div className="rounded-[16px] px-3 py-1" style={{ background: '#f5f0ff' }}>
                <span className="text-sm font-bold" style={{ color: '#8b5cf6' }}>{sw.meaning}</span>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !showHint;
                setShowHint(next);
                try { localStorage.setItem('review-hint-enabled', next ? 'true' : 'false'); } catch { /* ignore */ }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: showHint ? 'var(--bg-muted)' : 'var(--bg-muted)', border: 'none' }}
              title={showHint ? '隐藏提示' : '显示提示'}
            >
              {showHint ? <Eye size={15} style={{ color: '#3aafa9' }} /> : <EyeOff size={15} style={{ color: '#c9b8b0' }} />}
            </button>
          </div>

          {showHint && sw.example && (() => {
            const [hintKo] = sw.example.split('\n');
            return hintKo ? (
              <div className="rounded-[14px] px-3 py-2 text-[12px]" style={{ background: '#f8fffe', border: '1px dashed #aee3d8', color: '#5a9e97' }}>
                참고: {hintKo}
              </div>
            ) : null;
          })()}

          {sentenceLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin" style={{ color: '#ff7fa8' }} />
              <span className="ml-2 text-sm text-[var(--text-muted)]">正在生成词块...</span>
            </div>
          ) : (
            <>
              {/* Answer track */}
              <div className="min-h-[48px] rounded-2xl border-2 border-dashed px-3 py-2 flex flex-wrap gap-2 items-center"
                style={{ borderColor: sentenceChecked ? (sentenceResult?.isCorrect ? '#aee3d8' : '#f0799b') : 'var(--border-default)' }}>
                {sentenceAnswers.length === 0 ? (
                  <span className="text-[13px]" style={{ color: '#c9b8b0' }}>点击词块组成句子...</span>
                ) : (
                  sentenceAnswers.map((b, i) => (
                    <button key={i} onClick={() => {
                      if (sentenceChecked) return;
                      const blockIdx = sentenceBlocks.indexOf(b);
                      setSentenceAnswers(prev => prev.filter((_, pi) => pi !== i));
                      if (blockIdx >= 0) setSentenceUsed(prev => { const n = new Set(prev); n.delete(blockIdx); return n; });
                    }}
                      className="px-3 py-1 rounded-full text-sm font-bold transition-all"
                      style={{ background: 'var(--text-primary)', color: '#fff', border: 'none', cursor: sentenceChecked ? 'default' : 'pointer' }}>
                      {b}
                    </button>
                  ))
                )}
              </div>

              {/* Word blocks */}
              <div className="flex flex-wrap gap-2">
                {sentenceBlocks.map((b, i) => (
                  <button key={i} onClick={() => {
                    if (sentenceChecked || sentenceUsed.has(i)) return;
                    setSentenceAnswers(prev => [...prev, b]);
                    setSentenceUsed(prev => { const n = new Set(prev); n.add(i); return n; });
                  }}
                    className="px-3 py-2 rounded-full text-sm font-bold transition-all"
                    style={{
                      background: sentenceUsed.has(i) ? 'var(--bg-muted)' : 'var(--bg-soft)',
                      color: sentenceUsed.has(i) ? '#c9b8b0' : '#f0799b',
                      border: `1px solid ${sentenceUsed.has(i) ? 'var(--border-default)' : '#ffd0e0'}`,
                      cursor: sentenceUsed.has(i) ? 'default' : 'pointer',
                      opacity: sentenceUsed.has(i) ? 0.4 : 1,
                    }}>
                    {b}
                  </button>
                ))}
              </div>

              {/* Result */}
              {sentenceChecked && sentenceResult && (
                <div className="rounded-2xl p-4 space-y-2"
                  style={{ background: sentenceResult.isCorrect ? 'var(--bg-muted)' : 'var(--bg-soft)', border: `1px solid ${sentenceResult.isCorrect ? '#aee3d8' : '#ffd0e0'}` }}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{sentenceResult.isCorrect ? '✅' : '❌'}</span>
                    <span className="text-sm font-black" style={{ color: sentenceResult.isCorrect ? '#3aafa9' : '#f0799b' }}>
                      {sentenceResult.isCorrect ? '造句正确！' : '还需改进'}
                    </span>
                    <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>{sentenceResult.score}/5分</span>
                  </div>
                  {sentenceResult.explanation && (
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sentenceResult.explanation}</p>
                  )}
                  {sentenceResult.betterWay && (
                    <p className="text-xs font-bold" style={{ color: '#3aafa9' }}>更地道：{sentenceResult.betterWay}</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                {!sentenceChecked ? (
                  <>
                    <button onClick={() => { setSentenceAnswers([]); setSentenceUsed(new Set()); }}
                      className="flex-1 py-3 rounded-full text-sm font-black border"
                      style={{ background: 'transparent', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}>
                      重置
                    </button>
                    <button onClick={handleJudge} disabled={sentenceAnswers.length === 0 || sentenceJudging}
                      className="flex-1 py-3 rounded-full text-sm font-black"
                      style={{ background: sentenceAnswers.length > 0 ? 'var(--text-primary)' : 'var(--border-default)', color: sentenceAnswers.length > 0 ? '#fff' : 'var(--text-muted)', border: 'none' }}>
                      {sentenceJudging ? '判断中...' : '提交AI判断'}
                    </button>
                  </>
                ) : (
                  <button onClick={goNextSentence}
                    className="w-full py-3 rounded-full text-sm font-black"
                    style={{ background: 'var(--text-primary)', color: '#fff', border: 'none' }}>
                    {sentenceIdx + 1 >= sentenceWords.length ? '完成' : '下一个'} <ChevronRight size={16} className="inline" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Complete ──
  if (complete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-4xl">🎉</div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">复习完成</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">今天的复习全做完了，明天再来吧</p>
          {spellingWords.length > 0 && (
            <p className="text-sm mt-2 font-bold" style={{ color: spellingCorrectCount === spellingWords.length ? '#3aafa9' : '#89756e' }}>
              默写 {spellingCorrectCount} / {spellingWords.length} 词正确
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadCards}
            className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-white text-sm font-black"
          >
            再来一轮
          </button>
          <button
            onClick={() => router.push('/daily')}
            className="px-6 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-black"
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
          <h2 className="text-xl font-black text-[var(--text-primary)]">今日暂无待复习内容</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs leading-relaxed">
            SRS 系统会根据记忆曲线自动安排复习时间，到期的词才会出现在这里。已加入的单词会在合适的时间提醒你复习。
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => router.push('/vocabulary')}
            className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-white text-sm font-black">
            查看全部单词
          </button>
          <button onClick={() => router.push('/daily')}
            className="px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-black">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // ── Example lines ──
  const [exKo, exZh] = current.example.split('\n');

  return (
    <div className="flex flex-col px-4 pt-4 pb-[calc(100px+env(safe-area-inset-bottom,0px))] max-w-xl mx-auto w-full" style={{ minHeight: 'calc(100dvh - 60px)' }}>
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/vocabulary"
            className="w-9 h-9 shrink-0 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center text-[#4d3933]"
            style={{ boxShadow: '0 8px 20px rgba(78,52,46,.06)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="text-[17px] font-black text-[var(--text-primary)]">闪卡复习</div>
        </div>
        <span className="text-[11px] font-black text-[var(--text-muted)]">{done} / {total}</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #aee3d8, #ff7fa8)' }}
        />
      </div>

      {/* ── Daily goal progress ── */}
      {!videoId && (() => {
        const goalPct = Math.min(Math.round((todayReviewed / dailyGoal) * 100), 100);
        return (
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex-1 h-[4px] rounded-full bg-[var(--border-default)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${goalPct}%`, background: '#ff7fa8' }}
              />
            </div>
            <span className="text-[11px] font-black shrink-0" style={{ color: goalPct >= 100 ? '#4e746d' : '#a08f87' }}>
              今日 {todayReviewed}/{dailyGoal} · {goalPct}%
            </span>
          </div>
        );
      })()}

      {/* ── Flashcard ── */}
      <article
        className="rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-5 flex flex-col mb-3 flex-1"
        style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)', background: revealed ? 'linear-gradient(180deg, var(--bg-card), var(--bg-muted))' : 'var(--bg-card)' }}
      >
        {/* Front */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1" />
          <button
            onClick={playAudio}
            disabled={playingAudio}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[#ff7fa8] hover:border-[#ff7fa8] transition-colors shrink-0"
          >
            <Volume2 size={15} />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          <div className="text-[44px] font-black leading-tight tracking-tight" style={{ wordBreak: 'keep-all', color: 'var(--text-primary)' }}>
            {current.front}
          </div>
          <div className="mt-3 text-[13px] font-black" style={{ color: '#a08f87' }}>
            {current.sub}
          </div>
        </div>

        {/* Answer */}
        {revealed && (
          <div className="border-t border-[var(--border-default)] pt-4 space-y-2.5 mt-2">
            <div className="rounded-[20px] p-4 border" style={{ background: 'var(--bg-muted)', borderColor: 'rgba(239,224,217,.92)' }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                {current.partOfSpeech && (
                  <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: '#f5ede8', color: 'var(--text-muted)' }}>{current.partOfSpeech}</span>
                )}
                <strong className="text-[18px] font-black text-[var(--text-primary)]">{current.meaning}</strong>
              </div>
              {current.note ? (
                <span className="block mt-1 text-[13px] leading-relaxed" style={{ color: '#7e6b64' }}>{current.note}</span>
              ) : null}
            </div>
            {current.example && (
              <div className="rounded-[18px] overflow-hidden" style={{ border: '1px solid #d4ede9' }}>
                <button
                  onClick={() => setExampleExpanded(e => !e)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left"
                  style={{ background: 'var(--bg-muted)', color: '#3aafa9' }}
                >
                  <span className="text-[12px] font-black">例句</span>
                  <ChevronRight size={14} style={{ transform: exampleExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>
                {exampleExpanded && (
                  <div className="px-4 py-3 flex items-start gap-3" style={{ background: 'var(--bg-muted)' }}>
                    <div className="flex-1 text-[13px] leading-relaxed">
                      {exKo && <div style={{ color: '#416b63' }}>{exKo}</div>}
                      {exZh && <div style={{ color: '#6b9e96', marginTop: 2 }}>{exZh}</div>}
                    </div>
                    {exKo && (
                      <button
                        onClick={() => speak(exKo, 0.85).catch(() => {})}
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: '#aee3d8', border: 'none' }}
                      >
                        <Volume2 size={13} style={{ color: '#2d7a74' }} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </article>

      {/* ── Reveal button ── */}
      {!revealed && (
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleReveal}
            className="flex-1 h-12 rounded-full text-white text-[14px] font-black"
            style={{ background: 'var(--text-primary)', boxShadow: '0 14px 28px rgba(32,24,21,.18)' }}
          >
            查看答案
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="h-12 px-5 rounded-full text-[14px] font-black border"
            style={{ background: 'var(--bg-muted)', color: '#4e746d', borderColor: 'rgba(174,227,216,.55)', whiteSpace: 'nowrap' }}
          >
            下一个 →
          </button>
        </div>
      )}

      {/* ── Rating buttons ── */}
      {revealed && (
        <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <button
            onClick={() => handleRate('forgot')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-soft)', color: '#f0799b', borderColor: 'rgba(255,127,168,.18)' }}
          >
            <b className="text-[15px]">忘了</b>
            <span>再见一次</span>
          </button>
          <button
            onClick={() => handleRate('fuzzy')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}
          >
            <b className="text-[15px]">模糊</b>
            <span>稍后复习</span>
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-muted)', color: '#4e746d', borderColor: 'rgba(174,227,216,.55)' }}
          >
            <b className="text-[15px]">记得</b>
            <span>延后复习</span>
          </button>
        </div>
      )}

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
