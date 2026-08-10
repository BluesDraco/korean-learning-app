'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { Loader2, ArrowLeft, Volume2, PenLine, ChevronRight, ChevronDown, RotateCcw, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { speak, speakBrowser, cancelSpeech, speakWord } from '@/lib/tts';
import { getTodayLog, updateTodayLog } from '@/lib/gamification';
import { DiffFeedback } from '@/components/dictation/DiffFeedback';
import { getEntry, getEntryByKorean } from '@/data/vocabulary/index';
import { useTheme } from '@/components/ThemeProvider';

interface SentenceJudgeResult {
  isCorrect: boolean;
  score: number;
  wrongPart: string;
  correctPart: string;
  explanation: string;
  betterWay: string;
}

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
  dbId?: string;
  srsLevel?: number;
  easeFactor?: number;
  interval?: number;
  consecutiveCorrect?: number;
  mastery?: 'new' | 'learning' | 'reviewing' | 'mastered';
}

// ─── Mock data (used when DB is empty / not logged in) ────────────────────────

// Fisher-Yates 洗牌：AI 返回的 blocks 经常按自然语序排列，用户一眼能看出答案。
// 洗牌后若与原序完全一致则再洗一次（长度≤1 时直接跳过，避免死循环）。
function shuffleBlocks<T>(blocks: T[]): T[] {
  if (blocks.length <= 1) return blocks.slice();
  const shuffle = (arr: T[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  let out = shuffle(blocks);
  for (let attempt = 0; attempt < 5 && out.every((v, i) => v === blocks[i]); attempt++) {
    out = shuffle(blocks);
  }
  return out;
}

const MOCK_CARDS: FlashCard[] = [
  {
    id: 'mock-1',
    type: 'word',
    typeLabel: '单词卡',
    source: 'reading',
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
    source: 'analyze',
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
    source: 'analyze',
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
    source: 'shadowing',
    reviewCount: 1,
    front: '기분',
    sub: 'gi-bun',
    meaning: '心情 / 感觉',
    note: '常见搭配：기분이 좋아요、기분이 이상해。',
    example: '오늘은 기분이 좋아요。\n今天心情很好。',
  },
];

// ─── DB → FlashCard mapper ────────────────────────────────────────────────────

async function dbWordToCard(w: any): Promise<FlashCard> {
  const src = w.source || w.sourceType || '';
  let meaning = w.meaning || w.chinese || '';
  const normExample = (s: string) => s.replace(/[.。?？!！]+\s*$/g, '').trim();
  const validExamples = (w.examples ?? []).filter((ex: any) => ex.text && ex.text !== '[object Object]' && ex.text.trim());
  const collected: { ko: string; zh: string }[] = [];
  const seen = new Set<string>();
  for (const ex of validExamples.slice(0, 2)) {
    const ko = String(ex.text);
    const k = normExample(ko);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    collected.push({ ko, zh: String(ex.translation ?? '') });
  }
  if (collected.length < 2) {
    // 若原词命中不到,剥掉尾部助词再试一次:을/를/이/가/은/는/에/에서/의/도/만/과/와/랑/이랑/부터/까지/보다/처럼
    const raw = w.word || w.korean || '';
    const stripParticle = (s: string) => s.replace(/(이랑|에서|부터|까지|보다|처럼|을|를|이|가|은|는|에|의|도|만|과|와|랑)$/, '');
    let entry = w.sourceEntryId ? await getEntry(w.sourceEntryId) : await getEntryByKorean(raw);
    if (!entry && raw) {
      const stripped = stripParticle(raw);
      if (stripped && stripped !== raw) entry = await getEntryByKorean(stripped);
    }
    for (const ex of entry?.examples ?? []) {
      if (collected.length >= 2) break;
      if (!ex?.korean) continue;
      const k = normExample(ex.korean);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      collected.push({ ko: ex.korean, zh: ex.chinese ?? '' });
    }
    if (!meaning) meaning = entry?.meanings?.[0]?.chinese || '';
  }
  const example = collected.map((c) => `${c.ko}\n${c.zh}`).join('\n\n');
  return {
    id: String(w.id),
    type: 'word',
    typeLabel: '单词卡',
    source: src || 'default',
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
    consecutiveCorrect: w.consecutiveCorrect ?? 0,
    mastery: w.mastery ?? 'new',
  };
}

// ─── Main content ─────────────────────────────────────────────────────────────

function ReviewContent() {
  const { theme } = useTheme();
  const LIGHT_C = { ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8', pinkSoft: '#fff0f5', bg: '#fffbf7', mint: '#aee3d8', mintBg: '#eaf8f5', mintText: '#4e746d', card: '#fff', black: '#201815' };
  const DARK_C  = { ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8', pinkSoft: '#2D2848', bg: '#1E1B2E', mint: '#4A6058', mintBg: '#1E3530', mintText: '#5ecfb8', card: '#282440', black: '#3A3060' };
  const C = theme === 'dark' ? DARK_C : LIGHT_C;

  const router = useRouter();
  const smartBackDaily = useSmartBack('/daily');
  const smartBackVocab = useSmartBack('/vocabulary');
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');
  const wordIdsParam = searchParams.get('wordIds');

  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
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

  // sentence (造句) phase
  const [sentencePhase, setSentencePhase] = useState(false);
  const [sentenceWords, setSentenceWords] = useState<FlashCard[]>([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [sentenceBlocks, setSentenceBlocks] = useState<string[]>([]);
  const [sentenceAnswers, setSentenceAnswers] = useState<{ block: string; origIdx: number }[]>([]);
  const [sentenceUsed, setSentenceUsed] = useState<Set<number>>(new Set());
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [sentenceResult, setSentenceResult] = useState<SentenceJudgeResult | null>(null);
  const [sentenceJudging, setSentenceJudging] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [showHint, setShowHint] = useState<boolean>(() => {
    try { return localStorage.getItem('review-hint-enabled') !== 'false'; } catch { return true; }
  });

  // example expand
  const [exampleExpanded, setExampleExpanded] = useState(false);

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

      if (wordIdsParam) {
        const ids = wordIdsParam.split(',').filter(Boolean);
        const all = await db.words.toArray();
        dueWords = all.filter((w: any) => ids.includes(String(w.id)));
      } else if (videoId) {
        dueWords = await db.words.where('sourceVideoId').equals(videoId).toArray();
      } else if (filterMode === 'yesterday') {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const startOfYesterday = startOfToday.getTime() - 86400000;
        const recentlyReviewed = await db.words.where('lastReviewed').above(startOfYesterday).toArray();
        dueWords = recentlyReviewed.filter(w => w.lastReviewed && w.lastReviewed < startOfToday.getTime());
      } else {
        // 主流：now 之前 due 的词。**排除今天已复习过的**，避免 SRS 短间隔（1 分钟）导致同一批词循环。
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const startTs = startOfToday.getTime();
        const rawDue = await db.words.where('nextReview').belowOrEqual(now).sortBy('nextReview');
        dueWords = rawDue.filter(w => !w.lastReviewed || w.lastReviewed < startTs);
        if (dueWords.length === 0) {
          // 补齐：从未掌握的词里挑今天没复习过的，按最久没复习的排前面
          const fallback = await db.words
            .where('mastery')
            .anyOf('new', 'learning', 'reviewing')
            .limit(batchSize)
            .toArray();
          dueWords = fallback
            .filter(w => !w.lastReviewed || w.lastReviewed < startTs)
            .sort((a, b) => (a.lastReviewed ?? 0) - (b.lastReviewed ?? 0))
            .slice(0, batchSize);
        }
      }

      // Limit to batch size (not for wordIds or videoId mode)
      if (!videoId && !wordIdsParam && dueWords.length > batchSize) {
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
      setExampleExpanded(false);
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
  }, [videoId, wordIdsParam]);

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
      }).catch(notifySaveFailed);

      // 新升级到 mastered 的词：完成页仪表盘要展示
      if (newMastery === 'mastered' && cur.mastery !== 'mastered') {
        newlyMasteredRef.current.push({ word: cur.front, meaning: cur.meaning });
        snapshot.wasNewlyMastered = true;
      }
      // 本轮 XP：UI 累计同时写入 profile.xp
      const xpGained = rate === 'remember' ? XP_REMEMBER : rate === 'fuzzy' ? XP_FUZZY : 0;
      if (xpGained > 0) {
        setXpEarnedThisRound(x => x + xpGained);
        awardXp(xpGained).catch(notifySaveFailed);
      }
    }

    historyRef.current.push(snapshot);
    setCanUndo(true);

    // Record progress in daily log (only for non-mock cards)
    // 直接基于最新的 state 递增，避免 getTodayLog→updateTodayLog 之间的读写竞争
    if (cur.dbId && rate !== 'forgot') {
      setTodayReviewed(prev => {
        const next = prev + 1;
        todayReviewedRef.current = next;
        updateTodayLog({ wordsReviewed: next }).catch(notifySaveFailed);
        return next;
      });
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
      setExampleExpanded(false);
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
        setExampleExpanded(false);
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
    const startSentencePhase = async () => {
      setShowSpellingPrompt(false);
      setSentenceLoading(true);
      setSentencePhase(true);
      setSentenceWords(spellingWords);
      setSentenceIdx(0);
      setSentenceBlocks([]);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceChecked(false);
      setSentenceResult(null);
      const firstWord = spellingWords[0];
      if (firstWord) {
        try {
          const res = await fetch('/api/ai/sentence-judge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'generate', word: firstWord.front, meaning: firstWord.meaning }),
          });
          if (res.ok) {
            const data = await res.json();
            setSentenceBlocks(data.blocks ?? []);
          }
        } catch { /* use empty blocks */ }
      }
      setSentenceLoading(false);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: C.pinkSoft }}>
          <PenLine size={36} style={{ color: C.pink }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">要进行练习吗？</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">本轮答对 {spellingWords.length} 个词</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">练习可以加深记忆</p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => { setShowSpellingPrompt(false); setSpellingPhase(true); setTimeout(() => spellingInputRef.current?.focus(), 100); }}
            className="w-full py-3 rounded-full text-sm font-black"
            style={{ background: C.black, color: '#fff', border: 'none' }}
          >
            默写练习
          </button>
          <button
            onClick={startSentencePhase}
            className="w-full py-3 rounded-full text-sm font-black"
            style={{ background: C.pinkSoft, color: C.pink, border: `1px solid ${C.pink}` }}
          >
            造句练习（词块排列）
          </button>
          <button
            onClick={() => { setShowSpellingPrompt(false); setComplete(true); }}
            className="w-full py-3 rounded-full text-sm font-black"
            style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}
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
      if (sw.dbId) {
        db.spellingMistakes.add({
          id: crypto.randomUUID(),
          wordId: String(sw.dbId),
          word: sw.front,
          meaning: sw.meaning,
          userInput: spellingInput,
          correctAnswer: sw.front,
          mistakeType: 'spelling',
          createdAt: Date.now(),
        }).catch(() => {});
        await db.words.update(sw.id as any, { nextReview: Date.now() }).catch(() => {});
      }
      goNextSpelling();
    };

    return (
      <div className="flex flex-col px-4 pt-4 pb-8 gap-4" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine size={18} style={{ color: C.pink }} />
            <span className="text-[17px] font-black text-[var(--text-primary)]">默写练习</span>
          </div>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{spellingIdx + 1} / {spellingWords.length}</span>
        </div>
        {/* Progress */}
        <div className="h-[6px] rounded-full overflow-hidden" style={{ background: C.line }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((spellingIdx) / spellingWords.length) * 100}%`, background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)' }}
          />
        </div>
        {/* Card */}
        <div className="rounded-[32px] p-6 flex flex-col items-center gap-4 flex-1"
          style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>
          <div className="rounded-[16px] px-4 py-2" style={{ background: C.pinkSoft }}>
            <span className="text-sm font-bold" style={{ color: C.pink }}>{sw.meaning}</span>
          </div>
          <button
            onClick={() => speakWord(sw.front, 0.8)}
            className="w-16 h-16 rounded-full flex items-center justify-center border-none"
            style={{ background: C.pink }}
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
                  border: `2px solid ${C.line}`, fontSize: 18, color: C.ink,
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const,
                  background: C.card,
                }}
              />
              <button
                onClick={handleSpellingSubmit}
                disabled={!spellingInput.trim()}
                className="w-full py-3 rounded-full text-sm font-black"
                style={{
                  background: spellingInput.trim() ? C.black : C.line,
                  color: spellingInput.trim() ? '#fff' : C.muted,
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
                  style={{ background: 'transparent', color: C.muted, borderColor: C.line }}
                >
                  再听一遍
                </button>
              )}
              {isWrong ? (
                <button
                  onClick={handleSkip}
                  className="w-full py-3 rounded-full text-sm font-black flex items-center justify-center gap-2"
                  style={{ background: C.pinkSoft, color: '#f0799b', border: 'none' }}
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

  // ── Sentence (造句) phase ──
  if (sentencePhase) {
    const sw = sentenceWords[sentenceIdx];
    if (!sw) return null;
    const [swExKo] = (sw.example || '').split('\n');

    const pickBlock = (block: string, idx: number) => {
      if (sentenceUsed.has(idx) || sentenceChecked) return;
      setSentenceAnswers(prev => [...prev, block]);
      setSentenceUsed(prev => new Set(prev).add(idx));
    };

    const removeAnswer = (answerIdx: number) => {
      if (sentenceChecked) return;
      const removedBlock = sentenceAnswers[answerIdx];
      // find first matching unused-by-removal index in sentenceBlocks
      let removedOrigIdx = -1;
      const usedCopy = new Set(sentenceUsed);
      for (let i = 0; i < sentenceBlocks.length; i++) {
        if (sentenceBlocks[i] === removedBlock && usedCopy.has(i)) {
          removedOrigIdx = i;
          break;
        }
      }
      setSentenceAnswers(prev => prev.filter((_, i) => i !== answerIdx));
      if (removedOrigIdx >= 0) {
        setSentenceUsed(prev => {
          const next = new Set(prev);
          next.delete(removedOrigIdx);
          return next;
        });
      }
    };

    const resetSentence = () => {
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceChecked(false);
      setSentenceResult(null);
    };

    const judgeSentence = async () => {
      if (sentenceAnswers.length === 0 || sentenceJudging) return;
      const sentence = sentenceAnswers.join('');
      setSentenceJudging(true);
      setSentenceChecked(true);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'judge', word: sw.front, meaning: sw.meaning, sentence }),
        });
        if (res.ok) {
          const result: SentenceJudgeResult = await res.json();
          setSentenceResult(result);
          if (!result.isCorrect && sw.dbId) {
            db.spellingMistakes.add({
              id: crypto.randomUUID(),
              wordId: String(sw.dbId),
              word: sw.front,
              meaning: sw.meaning,
              userInput: sentence,
              correctAnswer: result.betterWay || sw.front,
              mistakeType: 'sentence',
              createdAt: Date.now(),
            }).catch(() => {});
          }
        }
      } catch {
        // AI failed — reset checked so user can retry
        setSentenceChecked(false);
      }
      setSentenceJudging(false);
    };

    const goNextSentence = async () => {
      if (sentenceIdx + 1 >= sentenceWords.length) {
        setSentencePhase(false);
        setComplete(true);
        return;
      }
      const nextIdx = sentenceIdx + 1;
      setSentenceIdx(nextIdx);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceChecked(false);
      setSentenceResult(null);
      setSentenceLoading(true);
      const nextWord = sentenceWords[nextIdx];
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: nextWord.front, meaning: nextWord.meaning }),
        });
        if (res.ok) {
          const data = await res.json();
          setSentenceBlocks(data.blocks ?? []);
        }
      } catch { /* empty blocks */ }
      setSentenceLoading(false);
    };

    const resultColor = sentenceResult ? (sentenceResult.isCorrect ? '#3aafa9' : '#f0799b') : C.line;

    return (
      <div className="flex flex-col px-4 pt-4 pb-8 gap-4" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-black text-[var(--text-primary)]">造句练习</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !showHint;
                setShowHint(next);
                try { localStorage.setItem('review-hint-enabled', String(next)); } catch { /* ignore */ }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}
            >
              {showHint ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <span className="text-[11px] font-black text-[var(--text-muted)]">{sentenceIdx + 1} / {sentenceWords.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-[6px] rounded-full overflow-hidden" style={{ background: C.line }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(sentenceIdx / sentenceWords.length) * 100}%`, background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)' }} />
        </div>

        {/* Card */}
        <div className="rounded-[32px] p-6 flex flex-col gap-4 flex-1"
          style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>

          {/* Word + meaning */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[28px] font-black" style={{ color: C.ink }}>{sw.front}</div>
              <div className="text-[15px] mt-1" style={{ color: C.muted }}>{sw.meaning}</div>
            </div>
            <button onClick={() => speakWord(sw.front, 0.85)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: C.pinkSoft, border: 'none' }}>
              <Volume2 size={18} style={{ color: C.pink }} />
            </button>
          </div>

          {/* Hint */}
          {showHint && swExKo && (
            <div className="rounded-[14px] px-4 py-2.5 text-[13px]" style={{ background: C.mintBg, color: C.mintText }}>
              参考格式：{swExKo}
            </div>
          )}

          {/* Answer track */}
          <div className="min-h-[52px] rounded-[16px] px-3 py-2 flex flex-wrap gap-2 items-center"
            style={{ border: `2px dashed ${sentenceResult ? resultColor : C.line}`, background: sentenceResult ? (sentenceResult.isCorrect ? '#eaf8f5' : '#fff0f5') : C.bg, transition: 'all 0.3s' }}>
            {sentenceAnswers.length === 0 ? (
              <span className="text-[13px]" style={{ color: C.muted }}>点击词块组成句子...</span>
            ) : sentenceAnswers.map((block, i) => (
              <button key={i} onClick={() => removeAnswer(i)}
                className="px-3 py-1.5 rounded-[10px] text-[15px] font-bold"
                style={{ background: C.pinkSoft, color: C.pink, border: `1px solid ${C.pink}`, whiteSpace: 'nowrap' }}>
                {block}
              </button>
            ))}
          </div>

          {/* Blocks */}
          {sentenceLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 size={20} className="animate-spin" style={{ color: C.muted }} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sentenceBlocks.map((block, i) => (
                <button key={i} onClick={() => pickBlock(block, i)}
                  className="px-3 py-1.5 rounded-[10px] text-[15px] font-bold transition-opacity"
                  style={{
                    background: C.card, color: C.ink, border: `1px solid ${C.line}`,
                    opacity: sentenceUsed.has(i) ? 0.3 : 1, whiteSpace: 'nowrap',
                    cursor: sentenceUsed.has(i) ? 'default' : 'pointer',
                  }}>
                  {block}
                </button>
              ))}
            </div>
          )}

          {/* Result */}
          {sentenceResult && (
            <div className="rounded-[16px] p-4 flex flex-col gap-2"
              style={{ background: sentenceResult.isCorrect ? '#eaf8f5' : '#fff0f5', border: `1px solid ${resultColor}` }}>
              <div className="text-[15px] font-black" style={{ color: resultColor }}>
                {sentenceResult.isCorrect ? '✓ 很好！' : '✗ 需要改进'}
              </div>
              {!sentenceResult.isCorrect && sentenceResult.wrongPart && (
                <div className="text-[14px]" style={{ color: C.ink }}>
                  <span style={{ textDecoration: 'line-through', color: '#f0799b' }}>{sentenceResult.wrongPart}</span>
                  {' → '}
                  <span style={{ color: '#3aafa9', fontWeight: 700 }}>{sentenceResult.correctPart}</span>
                </div>
              )}
              {sentenceResult.explanation && (
                <div className="text-[14px]" style={{ color: C.ink }}>{sentenceResult.explanation}</div>
              )}
              {sentenceResult.betterWay && (
                <div className="text-[13px] rounded-[10px] px-3 py-2 mt-1" style={{ background: C.card, color: C.muted }}>
                  更地道：{sentenceResult.betterWay}
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            {!sentenceChecked ? (
              <>
                <button onClick={resetSentence}
                  className="h-11 px-4 rounded-full flex items-center gap-1 text-[13px] font-black"
                  style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}>
                  <RotateCcw size={14} />重置
                </button>
                <button onClick={judgeSentence}
                  disabled={sentenceAnswers.length === 0 || sentenceJudging}
                  className="flex-1 h-11 rounded-full text-[14px] font-black"
                  style={{
                    background: sentenceAnswers.length > 0 && !sentenceJudging ? C.black : C.line,
                    color: sentenceAnswers.length > 0 && !sentenceJudging ? '#fff' : C.muted, border: 'none',
                  }}>
                  {sentenceJudging ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'AI 判断'}
                </button>
              </>
            ) : (
              <button onClick={goNextSentence}
                className="flex-1 h-11 rounded-full text-[14px] font-black flex items-center justify-center gap-1"
                style={{ background: C.black, color: '#fff', border: 'none' }}>
                {sentenceIdx + 1 >= sentenceWords.length ? '完成' : '下一个'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Complete ──
  if (complete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: C.mintBg }}>🎉</div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">复习完成</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">今天的复习全做完了，明天再来吧</p>
          {spellingWords.length > 0 && (
            <p className="text-sm mt-2 font-bold" style={{ color: spellingCorrectCount === spellingWords.length ? '#3aafa9' : C.muted }}>
              默写 {spellingCorrectCount} / {spellingWords.length} 词正确
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadCards}
            className="px-6 py-2.5 rounded-full text-white text-sm font-black"
            style={{ background: C.black }}
          >
            {t('review.empty_go_vocab', lang)}
          </button>
          <button
            onClick={() => router.push('/daily')}
            className="px-6 py-2.5 rounded-full text-sm font-black"
            style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}
          >
            {t('review.empty_back_daily', lang)}
          </button>
        </div>
      </div>
    );
  }

  // ── Spelling prompt modal ──
  if (showSpellingPrompt) {
    const startSpelling = () => {
      setShowSpellingPrompt(false);
      setSpellingPhase(true);
      setTimeout(() => spellingInputRef.current?.focus(), 100);
    };
    const startSentence = async () => {
      setShowSpellingPrompt(false);
      setSentenceWords(spellingWords);
      setSentenceIdx(0);
      setSentenceChecked(false);
      setSentenceResult(null);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceLoading(true);
      setSentencePhase(true);
      const sentenceController = new AbortController();
      const sentenceTimeout = setTimeout(() => sentenceController.abort(), 15000);
      setSentenceGenError(false);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: spellingWords[0].front, meaning: spellingWords[0].meaning }),
          signal: sentenceController.signal,
        });
        if (!res.ok) throw new Error('generate failed');
        const data = await res.json();
        const blocks = data.blocks;
        if (!Array.isArray(blocks) || blocks.length < 2) setSentenceGenError(true);
        else setSentenceBlocks(shuffleBlocks(blocks));
      } catch {
        setSentenceGenError(true);
      } finally {
        clearTimeout(sentenceTimeout);
        setSentenceLoading(false);
      }
    };

    const practiceModes = [
      { key: 'spell', kr: '받아쓰기', title: t('review.practice_spelling_button', lang), desc: lang === 'en' ? 'Recall & write from memory' : '听发音，凭记忆写出这个词', icon: '✍️', onClick: startSpelling },
      { key: 'sentence', kr: '문장 만들기', title: t('review.practice_sentence_button', lang), desc: lang === 'en' ? 'Build a sentence with the word' : '用这个词拼一个句子', icon: '🧩', onClick: startSentence },
    ];

    return (
      <div className="prompt-scope" style={{ display: 'flex', justifyContent: 'center', padding: '24px 16px', minHeight: 'calc(100dvh - 60px)' }}>
        <div className="prompt-card">
          {/* Header */}
          <div className="prompt-head">
            <span className="prompt-eyebrow">PRACTICE</span>
            <h2 className="prompt-title">{t('review.practice_prompt_title', lang)}</h2>
            <p className="prompt-lead">
              {lang === 'en'
                ? <>You got <b>{spellingWords.length}</b> words this round — lock them in.</>
                : <>本轮答对 <b>{spellingWords.length}</b> 个词，挑一种方式加深记忆。</>}
            </p>
          </div>

          {/* Mode cards */}
          <div className="prompt-modes">
            {practiceModes.map((m) => (
              <button key={m.key} onClick={m.onClick} className="prompt-mode">
                <span className="prompt-mode-icon">{m.icon}</span>
                <span className="prompt-mode-body">
                  <span className="prompt-mode-kr">{m.kr}</span>
                  <span className="prompt-mode-title">{m.title}</span>
                  <span className="prompt-mode-desc">{m.desc}</span>
                </span>
                <ChevronRight size={18} className="prompt-mode-arrow" />
              </button>
            ))}
          </div>

          {/* Skip */}
          <button onClick={() => { setShowSpellingPrompt(false); finishRound(); }} className="prompt-skip">
            {t('review.practice_skip_button', lang)}
          </button>
        </div>

        <style>{`
          .prompt-scope {
            --p-ink: #241917; --p-ink-2: #5c4a42; --p-muted: #89756e;
            --p-bg: #fffbf7; --p-card: #fff; --p-soft: #fff0f5; --p-line: #efe1da;
            --p-pink: #ff7fa8; --p-pink-strong: #e55a87;
            --p-serif: 'Fraunces', Georgia, serif;
            --p-mono: 'JetBrains Mono', ui-monospace, monospace;
            --p-hangul: 'Noto Sans KR', sans-serif;
            --p-ease: cubic-bezier(.22,1,.36,1);
          }
          [data-theme='dark'] .prompt-scope {
            --p-ink: #F0E8FF; --p-ink-2: #cdbff0; --p-muted: #9a8fbf;
            --p-bg: #1E1B2E; --p-card: #282440; --p-soft: #322C4E; --p-line: #3A3060;
            --p-pink: #ff9dc0; --p-pink-strong: #ffb2ce;
          }
          .prompt-card {
            width: 100%; max-width: 560px; background: var(--p-card);
            border: 1px solid var(--p-line); border-radius: 28px;
            padding: clamp(24px, 5vw, 40px);
            box-shadow: 0 1px 2px rgba(78,52,46,.04), 0 12px 28px rgba(78,52,46,.06), 0 32px 64px rgba(78,52,46,.07);
            animation: promptRise .5s var(--p-ease) both;
          }
          .prompt-head { margin-bottom: clamp(20px, 4vw, 28px); }
          .prompt-eyebrow {
            font-family: var(--p-mono); font-size: 11px; font-weight: 500;
            letter-spacing: .22em; text-transform: uppercase; color: var(--p-pink-strong);
          }
          .prompt-title {
            font-family: var(--p-serif); font-optical-sizing: auto;
            font-size: clamp(26px, 5vw, 34px); font-weight: 600; line-height: 1.15;
            color: var(--p-ink); margin: 8px 0 0;
          }
          .prompt-lead { font-size: 14.5px; line-height: 1.6; color: var(--p-ink-2); margin: 10px 0 0; }
          .prompt-lead b { font-family: var(--p-serif); font-size: 19px; font-weight: 600; color: var(--p-pink-strong); font-style: italic; }

          .prompt-modes { display: grid; gap: 12px; grid-template-columns: 1fr; }
          @media (min-width: 640px) { .prompt-modes { grid-template-columns: 1fr 1fr; } }
          .prompt-mode {
            display: flex; align-items: center; gap: 14px; text-align: left;
            padding: 18px; border-radius: 20px; cursor: pointer;
            background: var(--p-bg); border: 1.5px solid var(--p-line);
            transition: transform .25s var(--p-ease), border-color .25s var(--p-ease), box-shadow .25s var(--p-ease);
          }
          @media (min-width: 640px) { .prompt-mode { flex-direction: column; align-items: flex-start; gap: 10px; } }
          .prompt-mode:hover { transform: translateY(-3px); border-color: var(--p-pink); box-shadow: 0 12px 28px rgba(255,127,168,.16); }
          .prompt-mode:active { transform: translateY(-1px); }
          .prompt-mode-icon {
            font-size: 24px; width: 48px; height: 48px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            background: var(--p-soft); border-radius: 14px;
          }
          .prompt-mode-body { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
          .prompt-mode-kr { font-family: var(--p-hangul); font-size: 12px; font-weight: 700; color: var(--p-pink-strong); }
          .prompt-mode-title { font-size: 16px; font-weight: 800; color: var(--p-ink); }
          .prompt-mode-desc { font-size: 12.5px; line-height: 1.45; color: var(--p-muted); }
          .prompt-mode-arrow { color: var(--p-pink); flex-shrink: 0; }
          @media (min-width: 640px) { .prompt-mode-arrow { align-self: flex-end; margin-top: -22px; } }

          .prompt-skip {
            display: block; width: 100%; margin-top: 22px; padding: 16px 12px 4px;
            background: transparent; border: none; border-top: 1px dashed var(--p-line); cursor: pointer;
            font-size: 13.5px; font-weight: 700; color: var(--p-muted);
            transition: color .2s var(--p-ease);
          }
          .prompt-skip:hover { color: var(--p-ink); }

          @keyframes promptRise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .prompt-card { animation: none; } .prompt-mode { transition: none; } }
        `}</style>
      </div>
    );
  }

  // ── Spelling phase ──
  if (spellingPhase) {
    const sw = spellingWords[spellingIdx];
    const isCorrect = spellingSubmitted && (spellingVerdict === 'correct' || spellingVerdict === 'acceptable');
    const isWrong = spellingSubmitted && spellingVerdict === 'wrong';

    const handleSpellingSubmit = async () => {
      if (!spellingInput.trim() || spellingSubmitted || spellingJudging) return;

      const markCorrect = () => {
        playCorrectSound();
        setSpellingCorrectCount(c => c + 1);
        setXpEarnedThisRound(x => x + XP_SPELLING);
        awardXp(XP_SPELLING).catch(notifySaveFailed);
        setTimeout(() => goNextSpelling(), 800);
      };

      // 标准判定：normalizeKorean 后比对（忽略标点空格）
      const normOk = normalizeKorean(spellingInput) === normalizeKorean(sw.front);
      setSpellingSubmitted(true);
      setSpellingVerdict(normOk ? 'correct' : 'wrong');
      if (normOk) markCorrect();
      else recordSpellingMistake();
    };

    const recordSpellingMistake = () => {
      playWrongSound();
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
    };

    const goNextSpelling = () => {
      if (spellingIdx + 1 >= spellingWords.length) {
        setSpellingPhase(false);
        finishRound();
      } else {
        setSpellingIdx(i => i + 1);
        setSpellingInput('');
        setSpellingSubmitted(false);
        setSpellingVerdict(null);
        setSpellingAiUnavailable(false);
        setTimeout(() => spellingInputRef.current?.focus(), 100);
      }
    };

    const handleSkip = async () => {
      if (sw.id) {
        await db.words.update(sw.id as any, { nextReview: Date.now() + 4 * 3600 * 1000 }).catch(() => {});
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
      <div className="flex flex-col px-4 pt-4 pb-[calc(32px+env(safe-area-inset-bottom,0px))] gap-4 max-w-xl mx-auto w-full" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine size={18} style={{ color: 'var(--color-pink-base)' }} />
            <span className="text-[17px] font-black text-[var(--text-primary)]">{t('review.spelling_phase_title', lang)}</span>
          </div>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{spellingIdx + 1} / {spellingWords.length}</span>
        </div>
        {/* Progress */}
        <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((spellingIdx) / spellingWords.length) * 100}%`, background: 'var(--color-pink-base)' }}
          />
        </div>
        {/* Card */}
        {(() => {
          // Cloze 例句：三级 fallback —— 原词 → 去 -다 → 去"하다"（공부하다 → 공부，匹配 공부해요/공부합니다）
          const pairs = sw.example.split('\n\n').map(p => {
            const [ko, zh] = p.split('\n');
            return { ko: ko?.trim() ?? '', zh: zh?.trim() ?? '' };
          });
          const candidates: string[] = [sw.front];
          if (/[가-힣]+다$/.test(sw.front)) {
            const stem1 = sw.front.slice(0, -1);
            candidates.push(stem1);
            if (stem1.endsWith('하') && stem1.length >= 2) {
              candidates.push(stem1.slice(0, -1));
            }
          }
          let hit: { ko: string; zh: string } | undefined;
          let match = '';
          for (const c of candidates) {
            hit = pairs.find(p => p.ko && p.ko.includes(c));
            if (hit) { match = c; break; }
          }
          const cloze = hit ? hit.ko.replace(match, ' _____ ') : '';

          return (
            <div className="rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-6 flex flex-col gap-5 flex-1"
              style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>

              {/* 任务说明 */}
              <div>
                <div className="text-[10px] font-bold mb-1.5" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('review.spelling_task_label', lang)}
                </div>
                <div className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t('review.spelling_task_desc', lang)}
                </div>
              </div>

              {/* 中文含义 + 播放按钮 */}
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="text-[10px] font-bold" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('review.spelling_meaning_label', lang)}
                </div>
                <div className="text-[26px] font-black text-center" style={{ color: 'var(--text-primary)' }}>
                  {sw.meaning}
                </div>
                <button
                  onClick={() => speakWord(sw.front)}
                  className="w-14 h-14 rounded-full flex items-center justify-center border-none transition-transform active:scale-95"
                  style={{ background: 'var(--color-pink-base)', boxShadow: '0 8px 24px rgba(255,127,168,.35)' }}
                  aria-label={t('a11y.play_audio', lang)}
                >
                  <Volume2 size={22} style={{ color: 'white' }} />
                </button>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{t('review.spelling_listen_hint', lang)}</p>
              </div>

              {/* Cloze 例句（提示） */}
              {cloze && (
                <div className="rounded-[14px] p-3" style={{ background: 'var(--bg-muted)', border: '1px dashed var(--border-default)' }}>
                  <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {t('review.cloze_section', lang)}
                  </div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>{cloze}</p>
                  {hit?.zh && <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{hit.zh}</p>}
                </div>
              )}

              {/* 输入 / 提交前 */}
              {!spellingSubmitted && (
                <div className="w-full flex flex-col gap-3 mt-auto">
                  <div style={{ display: 'flex', gap: 4, background: 'var(--bg-muted)', borderRadius: 999, padding: 4 }}>
                    {(['type', 'hand'] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSpellingMode(m)}
                        style={{
                          flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
                          fontSize: 13.5, fontWeight: 700,
                          background: spellingMode === m ? 'var(--bg-card)' : 'transparent',
                          color: spellingMode === m ? 'var(--color-pink-strong)' : 'var(--text-muted)',
                          boxShadow: spellingMode === m ? '0 2px 8px rgba(58,46,41,.08)' : 'none',
                          transition: 'all .2s',
                        }}
                      >
                        {m === 'type' ? `⌨️ ${t('review.mode_type', lang)}` : `✍️ ${t('review.mode_hand', lang)}`}
                      </button>
                    ))}
                  </div>
                  {spellingMode === 'hand' ? (
                    isDesktop ? (
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.6, padding: '16px 12px', margin: 0 }}>
                        {t('prac.hw_guide_desktop', lang)}
                      </p>
                    ) : (
                      <div style={{ padding: '8px 2px' }}>
                        <KeyboardHint text={t('prac.hw_guide_mobile', lang)} />
                      </div>
                    )
                  ) : (
                  <input
                    ref={spellingInputRef}
                    value={spellingInput}
                    onChange={e => setSpellingInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSpellingSubmit(); }}
                    placeholder={t('review.spelling_input_placeholder', lang)}
                    className="w-full"
                    style={{
                      padding: '14px 16px', borderRadius: 14,
                      border: '2px solid var(--border-default)', fontSize: 18, color: 'var(--text-primary)',
                      outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const,
                      background: 'var(--bg-card)',
                    }}
                  />
                  )}
                  <button
                    onClick={handleSpellingSubmit}
                    disabled={!spellingInput.trim() || spellingJudging}
                    className="w-full py-3 rounded-full text-sm font-black flex items-center justify-center gap-2"
                    style={{
                      background: spellingInput.trim() && !spellingJudging ? 'var(--text-primary)' : 'var(--border-default)',
                      color: spellingInput.trim() && !spellingJudging ? '#fff' : 'var(--color-ink-3)',
                      border: 'none', cursor: spellingInput.trim() && !spellingJudging ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {spellingJudging ? <><Loader2 size={14} className="animate-spin" /> {t('review.ai_judging', lang)}</> : t('review.spelling_submit_button', lang)}
                  </button>
                </div>
              )}

              {/* 提交后：统一"正确答案"卡 + Diff */}
              {spellingSubmitted && (
                <div className="w-full flex flex-col gap-3 mt-auto">
                  {/* 状态行 */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{isCorrect ? '✅' : '❌'}</span>
                    <span className="text-sm font-black" style={{ color: isCorrect ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)' }}>
                      {isCorrect ? (spellingVerdict === 'acceptable' ? t('review.spelling_verdict_acceptable', lang) : t('review.spelling_verdict_correct', lang)) : t('review.spelling_verdict_wrong', lang)}
                    </span>
                  </div>

                  {spellingAiUnavailable && (
                    <div className="rounded-[12px] px-3 py-2 text-xs" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                      ⚠️ {t('review.ai_unavailable', lang)}
                    </div>
                  )}

                  {/* 正确答案卡 —— 韩语+中文+播放按钮，永远展示 */}
                  <div className="rounded-2xl p-4 space-y-3"
                    style={{ background: isCorrect ? 'var(--bg-muted)' : 'var(--bg-soft)', border: `1px solid ${isCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-soft)'}` }}>
                    <div>
                      <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('review.correct_answer_label', lang)}</div>
                      <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
                        <div className="min-w-0">
                          <div className="text-[22px] font-black leading-tight break-words" style={{ color: 'var(--text-primary)' }}>{sw.front}</div>
                          <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{displayRoman(sw.sub, sw.front)}</div>
                          <div className="text-[13px] mt-1 font-bold" style={{ color: 'var(--color-pink-base)' }}>{sw.meaning}</div>
                        </div>
                        <button
                          onClick={() => speakWord(sw.front)}
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-pink-base)' }}
                          aria-label={t('review.replay', lang)}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* 完整例句 —— 把 _____ 换回来，让用户看到在句子里怎么用 */}
                    {hit && (
                      <div className="pt-3" style={{ borderTop: '1px dashed var(--border-default)' }}>
                        <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('review.cloze_section', lang)}</div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
                          <div className="min-w-0">
                            <div className="text-[13.5px] leading-relaxed break-words" style={{ color: 'var(--text-primary)' }}>
                              {(() => {
                                const parts = hit.ko.split(match);
                                return parts.map((p, i) => (
                                  <span key={i}>
                                    {p}
                                    {i < parts.length - 1 && (
                                      <span style={{ color: 'var(--color-pink-base)', fontWeight: 900 }}>{match}</span>
                                    )}
                                  </span>
                                ));
                              })()}
                            </div>
                            {hit.zh && <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{hit.zh}</div>}
                          </div>
                          <button
                            onClick={() => speak(hit.ko).catch(() => {})}
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-pink-base)' }}
                            aria-label={t('review.read_example', lang)}
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 用户输入 diff —— 只在答错时展示，让 correct 状态更简洁 */}
                  {isWrong && (
                    <div className="rounded-[14px] p-3" style={{ background: 'var(--bg-muted)', border: '1px dashed var(--border-default)' }}>
                      <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('review.your_input_label', lang)}</div>
                      <DiffFeedback userInput={normalizeKorean(spellingInput)} correct={normalizeKorean(sw.front)} />
                    </div>
                  )}

                  {isWrong && (
                    <button
                      onClick={handleSkip}
                      className="w-full py-3 rounded-full text-sm font-black flex items-center justify-center gap-2"
                      style={{ background: 'var(--text-primary)', color: '#fff', border: 'none' }}
                    >
                      {t('review.spelling_skip_button', lang)} <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })()}
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
        finishRound();
        return;
      }
      setSentenceIdx(next);
      setSentenceChecked(false);
      setSentenceResult(null);
      setSentenceAnswers([]);
      setSentenceUsed(new Set());
      setSentenceBlocks([]);
      setSentenceGenError(false);
      setSentenceLoading(true);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: sentenceWords[next].front, meaning: sentenceWords[next].meaning }),
        });
        if (!res.ok) throw new Error('gen failed');
        const data = await res.json();
        const blocks = Array.isArray(data.blocks) ? data.blocks : [];
        if (blocks.length < 2) {
          setSentenceGenError(true);
        } else {
          setSentenceBlocks(shuffleBlocks(blocks));
        }
      } catch {
        setSentenceGenError(true);
      } finally {
        setSentenceLoading(false);
      }
    };

    const retrySentenceGen = async () => {
      setSentenceGenError(false);
      setSentenceLoading(true);
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: sw.front, meaning: sw.meaning }),
        });
        if (!res.ok) throw new Error('gen failed');
        const data = await res.json();
        const blocks = Array.isArray(data.blocks) ? data.blocks : [];
        if (blocks.length < 2) {
          setSentenceGenError(true);
        } else {
          setSentenceBlocks(shuffleBlocks(blocks));
        }
      } catch {
        setSentenceGenError(true);
      } finally {
        setSentenceLoading(false);
      }
    };

    const skipSentence = () => {
      setSentenceGenError(false);
      goNextSentence();
    };

    const handleJudge = async () => {
      if (sentenceAnswers.length === 0) return;
      // 韩语词块之间用空格连接（避免 AI 判"缺空格"但用户无法手动加空格）
      const sentence = sentenceAnswers.map(idx => sentenceBlocks[idx]).join(' ');
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
        if (data.isCorrect) {
          playCorrectSound();
        } else {
          playWrongSound();
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
        setSentenceResult({ isCorrect: false, score: 0, wrongPart: '', correctPart: '', explanation: t('review.sentence_ai_error', lang), betterWay: '', userTranslation: '', betterTranslation: '', improvement: '' });
      } finally {
        setSentenceJudging(false);
      }
    };

    return (
      <div className="flex flex-col px-4 pt-4 pb-[calc(32px+env(safe-area-inset-bottom,0px))] gap-4" style={{ minHeight: 'calc(100dvh - 60px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shuffle size={18} style={{ color: 'var(--color-pink-base)' }} />
            <span className="text-[17px] font-black text-[var(--text-primary)]">{t('review.sentence_phase_title', lang)}</span>
          </div>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{sentenceIdx + 1} / {sentenceWords.length}</span>
        </div>

        <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(sentenceIdx / sentenceWords.length) * 100}%`, background: 'var(--color-pink-base)' }} />
        </div>

        <div className="rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-6 flex flex-col gap-4 flex-1"
          style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)' }}>
          {/* 任务说明 */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold mb-1.5" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {t('review.spelling_task_label', lang)}
              </div>
              <div className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('review.sentence_task_desc', lang)}
              </div>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-[24px] font-black" style={{ color: 'var(--text-primary)' }}>{sw.front}</span>
                <span className="text-[14px] font-bold" style={{ color: 'var(--color-pink-base)' }}>{sw.meaning}</span>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !showHint;
                setShowHint(next);
                try { localStorage.setItem(hintKey, next ? 'true' : 'false'); } catch { /* ignore */ }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--bg-muted)', border: 'none' }}
              title={showHint ? t('review.sentence_hide_hint_title', lang) : t('review.sentence_show_hint_title', lang)}
            >
              {showHint ? <Eye size={15} style={{ color: 'var(--color-pink-base)' }} /> : <EyeOff size={15} style={{ color: 'var(--color-ink-4)' }} />}
            </button>
          </div>

          {/* 参考例句 —— 明确标签 + 中韩双语 */}
          {showHint && sw.example && (() => {
            const [hintKo, hintZh] = sw.example.split('\n');
            return hintKo ? (
              <div className="rounded-[14px] p-3" style={{ background: 'var(--bg-muted)', border: '1px dashed var(--border-default)' }}>
                <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('review.ref_example_label', lang)}
                </div>
                <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>{hintKo}</div>
                {hintZh && <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{hintZh}</div>}
              </div>
            ) : null;
          })()}

          {sentenceLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-pink-base)' }} />
              <span className="ml-2 text-sm text-[var(--text-muted)]">{t('review.sentence_generating_blocks', lang)}</span>
            </div>
          ) : sentenceGenError ? (
            <div className="rounded-2xl p-4 flex flex-col items-center gap-3" style={{ background: 'var(--bg-soft)', border: '1px solid var(--color-pink-soft)' }}>
              <span className="text-2xl">⚠️</span>
              <div className="text-center">
                <p className="text-sm font-bold" style={{ color: 'var(--color-pink-strong)' }}>{t('review.gen_fail_title', lang)}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{t('review.gen_fail_desc', lang)}</p>
              </div>
              <div className="flex gap-2 w-full mt-1">
                <button
                  onClick={skipSentence}
                  className="flex-1 py-2.5 rounded-full text-sm font-black"
                  style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}
                >
                  {t('review.skip_this', lang)}
                </button>
                <button
                  onClick={retrySentenceGen}
                  className="flex-1 py-2.5 rounded-full text-sm font-black"
                  style={{ background: 'var(--text-primary)', color: '#fff', border: 'none' }}
                >
                  {t('review.retry', lang)}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Answer track */}
              <div className="min-h-[48px] rounded-2xl border-2 border-dashed px-3 py-2 flex flex-wrap gap-2 items-center"
                style={{ borderColor: sentenceChecked ? (sentenceResult?.isCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-strong)') : 'var(--border-default)' }}>
                {sentenceAnswers.length === 0 ? (
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-4)' }}>{t('review.sentence_blocks_placeholder', lang)}</span>
                ) : (
                  sentenceAnswers.map((blockIdx, i) => (
                    <button key={blockIdx} onClick={() => {
                      if (sentenceChecked) return;
                      setSentenceAnswers(prev => prev.filter((_, pi) => pi !== i));
                      setSentenceUsed(prev => { const n = new Set(prev); n.delete(blockIdx); return n; });
                    }}
                      className="px-4 rounded-full text-sm font-bold transition-all"
                      style={{ minHeight: 40, background: 'var(--text-primary)', color: '#fff', border: 'none', cursor: sentenceChecked ? 'default' : 'pointer' }}>
                      {sentenceBlocks[blockIdx]}
                    </button>
                  ))
                )}
              </div>

              {/* Word blocks */}
              <div className="flex flex-wrap gap-2">
                {sentenceBlocks.map((b, i) => (
                  <button key={i} onClick={() => {
                    if (sentenceChecked || sentenceUsed.has(i)) return;
                    setSentenceAnswers(prev => [...prev, i]);
                    setSentenceUsed(prev => { const n = new Set(prev); n.add(i); return n; });
                  }}
                    className="px-4 rounded-full text-sm font-bold transition-all"
                    style={{
                      minHeight: 44,
                      background: sentenceUsed.has(i) ? 'var(--bg-muted)' : 'var(--bg-soft)',
                      color: sentenceUsed.has(i) ? 'var(--color-ink-4)' : 'var(--color-pink-strong)',
                      border: `1px solid ${sentenceUsed.has(i) ? 'var(--border-default)' : 'var(--color-pink-soft)'}`,
                      cursor: sentenceUsed.has(i) ? 'default' : 'pointer',
                      opacity: sentenceUsed.has(i) ? 0.4 : 1,
                    }}>
                    {b}
                  </button>
                ))}
              </div>

              {/* Result */}
              {sentenceChecked && sentenceResult && (() => {
                const userSentence = sentenceAnswers.map(idx => sentenceBlocks[idx]).join(' ');
                const same = sentenceResult.betterWay && sentenceResult.betterWay.replace(/\s/g, '') === userSentence.replace(/\s/g, '');
                return (
                  <div className="rounded-2xl p-4 space-y-3.5"
                    style={{ background: sentenceResult.isCorrect ? 'var(--bg-muted)' : 'var(--bg-soft)', border: `1px solid ${sentenceResult.isCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-soft)'}` }}>
                    {/* 状态行 */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{sentenceResult.isCorrect ? '✅' : '❌'}</span>
                      <span className="text-sm font-black" style={{ color: sentenceResult.isCorrect ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)' }}>
                        {sentenceResult.isCorrect ? t('review.sentence_correct_label', lang) : t('review.sentence_needs_improvement_label', lang)}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>{t('review.sentence_score', lang, { n: String(sentenceResult.score) })}</span>
                    </div>

                    {/* 你的句子 */}
                    <div>
                      <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('review.your_sentence_label', lang)}</div>
                      <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-bold leading-relaxed break-words" style={{ color: 'var(--text-primary)' }}>{userSentence}</div>
                          {sentenceResult.userTranslation && (
                            <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sentenceResult.userTranslation}</div>
                          )}
                        </div>
                        <button
                          onClick={() => speak(userSentence)}
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-pink-base)' }}
                          title={t('review.read_your_sentence', lang)}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* 更地道 —— 与你的句子不同才显示 */}
                    {sentenceResult.betterWay && !same && (
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-bold" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-mint-strong)' }}>{t('review.better_way_label', lang)}</span>
                          {sentenceResult.improvement && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(174,227,216,.25)', color: 'var(--color-mint-strong)' }}>
                              {sentenceResult.improvement}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-bold leading-relaxed break-words" style={{ color: 'var(--color-mint-strong)' }}>{sentenceResult.betterWay}</div>
                            {sentenceResult.betterTranslation && (
                              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sentenceResult.betterTranslation}</div>
                            )}
                          </div>
                          <button
                            onClick={() => speak(sentenceResult.betterWay)}
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-mint-strong)' }}
                            title={t('review.read_better_way', lang)}
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 解析 */}
                    {sentenceResult.explanation && (
                      <p className="text-[12.5px] leading-relaxed pt-2" style={{ color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-default)' }}>
                        💡 {sentenceResult.explanation}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                {!sentenceChecked ? (
                  <>
                    <button onClick={() => { setSentenceAnswers([]); setSentenceUsed(new Set()); }}
                      className="flex-1 py-3 rounded-full text-sm font-black border"
                      style={{ background: 'transparent', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}>
                      {t('review.sentence_reset_button', lang)}
                    </button>
                    <button onClick={handleJudge} disabled={sentenceAnswers.length === 0 || sentenceJudging}
                      className="flex-1 py-3 rounded-full text-sm font-black"
                      style={{ background: sentenceAnswers.length > 0 ? 'var(--text-primary)' : 'var(--border-default)', color: sentenceAnswers.length > 0 ? '#fff' : 'var(--text-muted)', border: 'none' }}>
                      {sentenceJudging ? t('review.sentence_judging', lang) : t('review.sentence_submit_ai_button', lang)}
                    </button>
                  </>
                ) : (
                  <button onClick={goNextSentence}
                    className="w-full py-3 rounded-full text-sm font-black"
                    style={{ background: 'var(--text-primary)', color: '#fff', border: 'none' }}>
                    {sentenceIdx + 1 >= sentenceWords.length ? t('review.sentence_done_button', lang) : t('review.sentence_next_button', lang)} <ChevronRight size={16} className="inline" />
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
    const roundXp = xpEarnedThisRound;
    const goalPct = Math.min(Math.round((todayReviewed / dailyGoal) * 100), 100);
    const goalMet = todayReviewed >= dailyGoal;
    const rememberedCount = correctWordIdsRef.current.length;
    const newlyMastered = newlyMasteredRef.current;

    return (
      <div className="flex flex-col items-center min-h-[60vh] px-4 py-6 gap-5 max-w-md mx-auto w-full">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-soft)] flex items-center justify-center text-3xl mt-2">🎉</div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{t('review.complete_title', lang)}</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">{t('review.complete_subtitle', lang)}</p>
        </div>

        {/* 2x2 数据卡 */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="rounded-2xl p-4 flex flex-col items-start gap-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🔥</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{t('review.complete_streak_label', lang)}</span>
            </div>
            <div className="text-2xl font-black text-[var(--text-primary)]">{streak}</div>
            <div className="text-[11px] text-[var(--text-muted)]">{streak > 0 ? t('review.complete_streak_keep', lang) : t('review.complete_streak_start', lang)}</div>
          </div>
          <div className="rounded-2xl p-4 flex flex-col items-start gap-1" style={{ background: goalMet ? 'rgba(174,227,216,0.2)' : 'var(--bg-card)', border: `1px solid ${goalMet ? 'var(--color-mint-strong)' : 'var(--border-default)'}` }}>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🎯</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{t('review.complete_goal_label', lang)}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: goalMet ? 'var(--color-mint-strong)' : 'var(--text-primary)' }}>{todayReviewed}/{dailyGoal}</div>
            <div className="text-[11px] text-[var(--text-muted)]">{goalMet ? t('review.complete_goal_met', lang) : `${goalPct}%`}</div>
          </div>
          <div className="rounded-2xl p-4 flex flex-col items-start gap-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">📖</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{t('review.complete_round_label', lang)}</span>
            </div>
            <div className="text-2xl font-black text-[var(--text-primary)]">{done}</div>
            <div className="text-[11px] text-[var(--text-muted)]">{t('review.complete_round_remember', lang, { n: String(rememberedCount) })}{spellingWords.length > 0 ? t('review.complete_round_spelling', lang, { correct: String(spellingCorrectCount), total: String(spellingWords.length) }) : ''}</div>
          </div>
          <div className="rounded-2xl p-4 flex flex-col items-start gap-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⭐</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{t('review.complete_xp_label', lang)}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: 'var(--color-pink-base)' }}>+{roundXp}</div>
            <div className="text-[11px] text-[var(--text-muted)]">{t('review.complete_xp_total', lang, { n: String(totalXp) })}</div>
          </div>
        </div>

        {/* 新掌握的词 */}
        {newlyMastered.length > 0 && (
          <div className="w-full rounded-2xl p-4" style={{ background: 'var(--color-pink-soft)', border: '1px solid var(--color-pink-soft)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌱</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{t('review.newly_mastered_count', lang, { n: String(newlyMastered.length) })}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {newlyMastered.slice(0, 6).map((w, i) => (
                <div key={i} className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }}>
                  {w.word} <span className="text-[var(--text-muted)] font-normal">· {w.meaning}</span>
                </div>
              ))}
              {newlyMastered.length > 6 && (
                <div className="text-xs text-[var(--text-muted)] px-2 py-1">{t('review.newly_mastered_more', lang, { n: String(newlyMastered.length - 6) })}</div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <button
            onClick={loadCards}
            className="flex-1 px-6 py-3 rounded-full bg-[var(--text-primary)] text-white text-sm font-black"
          >
            {t('review.complete_retry_button', lang)}
          </button>
          <button
            onClick={smartBackDaily}
            className="flex-1 px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-black"
          >
            {t('review.complete_back_button', lang)}
          </button>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (!current) {
    const isYesterday = filterMode === 'yesterday';
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-5">
        <div className="text-4xl">{isYesterday ? '📅' : '📚'}</div>
        <div className="text-center">
          <h2 className="text-xl font-black text-[var(--text-primary)]">今日暂无待复习内容</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs leading-relaxed">
            SRS 系统会根据记忆曲线自动安排复习时间，到期的词才会出现在这里。已加入的单词会在合适的时间提醒你复习。
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => router.push('/vocabulary')}
            className="px-6 py-3 rounded-full text-white text-sm font-black"
            style={{ background: C.black }}>
            查看全部单词
          </button>
          <button onClick={() => router.push('/daily')}
            className="px-6 py-3 rounded-full text-sm font-black"
            style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}>
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // ── Example lines (多段，\n\n 分隔；每段 韩\n中) ──
  const examplePairs: { ko: string; zh: string }[] = current.example
    .split(/\n\s*\n/)
    .map((block) => {
      const [ko, zh] = block.split('\n');
      return { ko: (ko ?? '').trim(), zh: (zh ?? '').trim() };
    })
    .filter((p) => p.ko);

  return (
    <div className="flex flex-col px-4 pt-4 pb-[calc(100px+env(safe-area-inset-bottom,0px))]" style={{ minHeight: 'calc(100dvh - 60px)' }}>
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/vocabulary"
            className="w-9 h-9 shrink-0 rounded-2xl flex items-center justify-center"
            style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink, boxShadow: '0 8px 20px rgba(78,52,46,.06)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="text-[17px] font-black text-[var(--text-primary)]">闪卡复习</div>
        </div>
        <span className="text-[11px] font-black text-[var(--text-muted)]">{done} / {total}</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-[6px] rounded-full overflow-hidden mb-3" style={{ background: C.line }}>
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
            <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: C.line }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${goalPct}%`, background: C.pink }}
              />
            </div>
            <span className="text-[11px] font-black shrink-0" style={{ color: goalPct >= 100 ? C.mintText : C.muted }}>
              今日 {todayReviewed}/{dailyGoal} · {goalPct}%
            </span>
          </div>
        );
      })()}

      {/* ── Flashcard ── */}
      <article
        className="rounded-[32px] p-5 flex flex-col mb-3 flex-1"
        style={{ border: `1px solid ${C.line}`, boxShadow: '0 20px 60px rgba(78,52,46,.14)', background: revealed ? `linear-gradient(180deg,${C.card},${C.bg})` : C.card }}
      >
        {/* Front */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1" />
          <button
            onClick={playAudio}
            disabled={playingAudio}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
            style={{ border: `1px solid ${C.line}`, color: C.muted, background: 'transparent' }}
          >
            <Volume2 size={15} />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          <div className="text-[44px] font-black leading-tight tracking-tight" style={{ wordBreak: 'keep-all', color: C.ink }}>
            {current.front}
          </div>
          <div className="mt-3 text-[13px] font-black" style={{ color: C.muted }}>
            {current.sub}
          </div>
        </div>

        {/* Answer */}
        {revealed && (
          <div className="pt-4 space-y-2.5 mt-2" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="rounded-[20px] p-4 border" style={{ background: C.bg, borderColor: C.line }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                {current.partOfSpeech && (
                  <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: C.line, color: C.muted }}>{current.partOfSpeech}</span>
                )}
                <strong className="text-[18px] font-black" style={{ color: C.ink }}>{current.meaning}</strong>
              </div>
              {current.note ? (
                <span className="block mt-1 text-[13px] leading-relaxed" style={{ color: C.muted }}>{current.note}</span>
              ) : null}
            </div>
            {current.example && (
              <div className="rounded-[18px] overflow-hidden" style={{ background: C.mintBg }}>
                <button
                  onClick={() => setExampleExpanded(e => !e)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold"
                  style={{ color: C.mintText, background: 'transparent', border: 'none' }}
                >
                  <span>{exKo}</span>
                  <ChevronDown size={14} style={{ transform: exampleExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {exampleExpanded && (
                  <div className="px-4 pb-3 flex flex-col gap-2" style={{ borderTop: `1px solid ${C.mint}20` }}>
                    {exZh && <div className="text-[13px]" style={{ color: C.mintText, opacity: 0.8 }}>{exZh}</div>}
                    <button onClick={() => speak(exKo, 0.85)}
                      className="self-start flex items-center gap-1.5 text-[12px] font-bold px-3 py-1 rounded-full"
                      style={{ background: C.card, color: C.mintText, border: `1px solid ${C.mint}40` }}>
                      <Volume2 size={12} />播放例句
                    </button>
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
            style={{ background: C.black, boxShadow: '0 14px 28px rgba(32,24,21,.18)' }}
          >
            查看答案
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="h-12 px-5 rounded-full text-[14px] font-black"
            style={{ background: C.mintBg, color: C.mintText, border: `1px solid rgba(174,227,216,.55)`, whiteSpace: 'nowrap' }}
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
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black"
            style={{ background: C.pinkSoft, color: '#f0799b', border: `1px solid rgba(255,127,168,.18)` }}
          >
            <b className="text-[15px]">忘了</b>
            <span>再见一次</span>
          </button>
          <button
            onClick={() => handleRate('fuzzy')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black"
            style={{ background: C.bg, color: C.muted, border: `1px solid ${C.line}` }}
          >
            <b className="text-[15px]">模糊</b>
            <span>稍后复习</span>
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black"
            style={{ background: C.mintBg, color: C.mintText, border: `1px solid rgba(174,227,216,.55)` }}
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
