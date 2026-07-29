'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { Loader2, ArrowLeft, Volume2, PenLine, ChevronRight, Shuffle, Eye, EyeOff, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { speak, speakBrowser, cancelSpeech, speakWord } from '@/lib/tts';
import { getTodayLog, updateTodayLog, awardXp } from '@/lib/gamification';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';

// 复习奖励常量（改动这里同时反映到 UI 累计 + 实际入账）
const XP_REMEMBER = 5;
const XP_FUZZY = 2;
const XP_SPELLING = 3;
import { DiffFeedback } from '@/components/dictation/DiffFeedback';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import { TracePad } from '@/components/vocabulary/TracePad';
import { TappableText } from '@/components/TappableText';
import { getEntry, getEntryByKorean } from '@/data/vocabulary/index';
import { useLang } from '@/components/LangProvider';
import { useIsDesktop } from '@/lib/useIsMobile';
import { t } from '@/lib/i18n';
import { saveProgress, loadProgress, clearProgress, TTL_EXAM } from '@/lib/progress-storage';
import { normalizeKorean } from '@/lib/koreanDiff';
import { displayRoman } from '@/lib/dictionary';
import { playCorrectSound, playWrongSound, playComplete } from '@/lib/audio/sfx';

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
    meaning,
    partOfSpeech: w.partOfSpeech || '',
    note: w.usage || w.note || '',
    example,
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
  const router = useRouter();
  const smartBackDaily = useSmartBack('/daily');
  const smartBackVocab = useSmartBack('/vocabulary');
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');
  const wordIdsParam = searchParams.get('wordIds');
  const { lang } = useLang();
  const { user } = useAuth();

  const getSourceLabel = (src: string) => {
    const key = `review.source_${src}`;
    const mapped = t(key, lang);
    return mapped !== key ? mapped : t('review.source_default', lang);
  };

  const getTypeLabel = (type: CardType) => {
    if (type === 'word') return t('review.card_type_word', lang);
    if (type === 'sentence') return t('review.card_type_sentence', lang);
    return t('review.card_type_grammar', lang);
  };

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
  const [streak, setStreak] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [xpEarnedThisRound, setXpEarnedThisRound] = useState(0);
  const { showToast } = useToast();
  // 复习结果落库失败收口：断网/500 时逐卡写入会失败，整轮只弹一次提示，避免每卡刷屏。
  const saveFailedNotifiedRef = useRef(false);
  const notifySaveFailed = useCallback(() => {
    if (saveFailedNotifiedRef.current) return;
    saveFailedNotifiedRef.current = true;
    showToast(t('review.save_failed', lang), 'error');
  }, [showToast, lang]);
  const newlyMasteredRef = useRef<{ word: string; meaning: string }[]>([]);
  const [filterMode, setFilterMode] = useState<'due' | 'yesterday'>('due');
  // 缺例句时 AI 兜底生成的加载态（key = card.id）
  const [exampleGenState, setExampleGenState] = useState<Record<string, 'loading' | 'empty'>>({});
  // 已尝试生成但 AI 判定无法造句的词 —— 持久化到 localStorage，避免同一词反复点击反复请求
  // （成功的词已回写 db.words.examples，本身不会再触发）
  const exampleTriedRef = useRef<Set<string>>(new Set());
  // v2：兜底 API 从 meaning-examples 换成 word-lookup，旧的失败标记作废重试一次
  const exampleTriedKey = `review-example-tried-v2:${user?.id ?? 'anon'}`;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(exampleTriedKey);
      if (raw) exampleTriedRef.current = new Set(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [exampleTriedKey]);

  // spelling phase
  const [showSpellingPrompt, setShowSpellingPrompt] = useState(false);
  const [spellingPhase, setSpellingPhase] = useState(false);
  const [spellingWords, setSpellingWords] = useState<FlashCard[]>([]);
  const [spellingIdx, setSpellingIdx] = useState(0);
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingMode, setSpellingMode] = useState<'type' | 'hand'>('type');
  const [spellingSubmitted, setSpellingSubmitted] = useState(false);
  const [spellingCorrectCount, setSpellingCorrectCount] = useState(0);
  const [spellingJudging, setSpellingJudging] = useState(false);
  const [spellingVerdict, setSpellingVerdict] = useState<null | 'correct' | 'acceptable' | 'wrong'>(null);
  const [spellingAiUnavailable, setSpellingAiUnavailable] = useState(false);
  const spellingInputRef = useRef<HTMLInputElement>(null);

  // sentence phase
  const [sentencePhase, setSentencePhase] = useState(false);
  const [sentenceWords, setSentenceWords] = useState<FlashCard[]>([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [sentenceBlocks, setSentenceBlocks] = useState<string[]>([]);
  // 存 blocks 的 index 而不是 string，避免重复词块（如两个 '는'）导致 indexOf 定位错误
  const [sentenceAnswers, setSentenceAnswers] = useState<number[]>([]);
  const [sentenceUsed, setSentenceUsed] = useState<Set<number>>(new Set());
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [sentenceResult, setSentenceResult] = useState<{ isCorrect: boolean; score: number; wrongPart: string; correctPart: string; explanation: string; betterWay: string; userTranslation: string; betterTranslation: string; improvement: string } | null>(null);
  const [sentenceJudging, setSentenceJudging] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [sentenceGenError, setSentenceGenError] = useState(false);
  const [showHint, setShowHint] = useState(true);



  const hintKey = `review-hint-enabled:${user?.id ?? 'anon'}`;
  const progressKey = `review-progress:${user?.id ?? 'anon'}`;

  useEffect(() => {
    try { setShowHint(localStorage.getItem(hintKey) !== 'false'); } catch { /* ignore */ }
  }, [hintKey]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<FlashCard | null>(null);
  const playAudioRef = useRef<(() => void) | null>(null);
  const currentIdxRef = useRef(0);
  const todayReviewedRef = useRef(0);
  const consecutiveCorrectRef = useRef<Record<string, number>>({});
  const correctWordIdsRef = useRef<string[]>([]);
  // 保存每张卡评分前的快照，用于"上一个词"回退
  type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';
  interface RatingSnapshot {
    dbId: string | undefined;
    prevSrsLevel: number;
    prevEase: number;
    prevInterval: number;
    prevMastery: MasteryLevel;
    prevConsecutive: number;
    prevXpEarned: number;
    prevTodayReviewed: number;
    wasNewlyMastered: boolean;
    wasCorrect: boolean;
    cardId: string;
  }
  const historyRef = useRef<RatingSnapshot[]>([]);
  const ratingLockRef = useRef(false);

  // ── Load cards from DB ──
  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const [profile, todayLog] = await Promise.all([
        db.userProfiles.get('main'),
        getTodayLog(),
      ]);
      const goal = profile?.dailyGoalWords ?? 10;
      // 批次直接等于每日目标 —— 一个字段说了算，用户不用理解 batchSize 是啥
      const batchSize = goal;
      const reviewed = todayLog?.wordsReviewed ?? 0;
      setDailyGoal(goal);
      setTodayReviewed(reviewed);
      todayReviewedRef.current = reviewed;
      setStreak(profile?.streak ?? 0);
      setTotalXp(profile?.xp ?? 0);
      setXpEarnedThisRound(0);
      newlyMasteredRef.current = [];

      const now = Date.now();
      let dueWords: any[] = [];

      if (wordIdsParam) {
        const ids = wordIdsParam.split(',').filter(Boolean);
        if (ids.length > 0) {
          dueWords = await db.words.where('id').anyOf(...ids).toArray();
        }
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
            .toArray();
          dueWords = fallback
            .filter(w => !w.lastReviewed || w.lastReviewed < startTs)
            .sort((a, b) => (a.lastReviewed ?? 0) - (b.lastReviewed ?? 0))
            .slice(0, batchSize);
        }
      }

      // Limit to batch size (skip for yesterday mode to show all)
      if (!videoId && filterMode !== 'yesterday' && dueWords.length > batchSize) {
        dueWords = dueWords.slice(0, batchSize);
      }

      const cardList = dueWords.length > 0 ? await Promise.all(dueWords.map(dbWordToCard)) : [];
      saveFailedNotifiedRef.current = false; // 新一轮重置，保存失败提示每轮独立弹一次
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
      historyRef.current = [];
      setCanUndo(false);
      for (const w of dueWords) {
        consecutiveCorrectRef.current[String(w.id)] = w.consecutiveCorrect ?? 0;
      }
      const saved = loadProgress<{
        idx: number;
        cardIds: string[];
        spellingPhase?: boolean;
        spellingIdx?: number;
        spellingWordIds?: string[];
        spellingCorrectCount?: number;
        sentencePhase?: boolean;
        sentenceIdx?: number;
        sentenceWordIds?: string[];
      }>(progressKey);
      if (saved) {
        const { idx, cardIds } = saved;
        const sameSet = cardIds.length === cardList.length && cardIds.every((id, i) => id === cardList[i].id);
        if (sameSet && idx > 0 && idx < cardList.length) {
          setCurrentIdx(idx);
        } else if (sameSet && saved.spellingPhase && saved.spellingWordIds?.length) {
          // 默写阶段续存：卡片顺序一致，进入默写继续
          const spellingList = saved.spellingWordIds
            .map(id => cardList.find(c => c.id === id))
            .filter((c): c is FlashCard => !!c);
          if (spellingList.length > 0 && (saved.spellingIdx ?? 0) < spellingList.length) {
            setSpellingWords(spellingList);
            setSpellingIdx(saved.spellingIdx ?? 0);
            setSpellingCorrectCount(saved.spellingCorrectCount ?? 0);
            setSpellingPhase(true);
            setCurrentIdx(cardList.length - 1);
            correctWordIdsRef.current = spellingList.map(c => c.id);
          } else {
            setCurrentIdx(0);
            clearProgress(progressKey);
          }
        } else if (sameSet && saved.sentencePhase && saved.sentenceWordIds?.length) {
          const sentenceList = saved.sentenceWordIds
            .map(id => cardList.find(c => c.id === id))
            .filter((c): c is FlashCard => !!c);
          if (sentenceList.length > 0 && (saved.sentenceIdx ?? 0) < sentenceList.length) {
            // 造句 blocks 需重新向 AI 请求（未持久化） —— 后续 useEffect 触发
            setSentenceWords(sentenceList);
            setSentenceIdx(saved.sentenceIdx ?? 0);
            setSentenceBlocks([]);
            setSentenceLoading(true);
            setSentencePhase(true);
            setCurrentIdx(cardList.length - 1);
            correctWordIdsRef.current = sentenceList.map(c => c.id);
          } else {
            setCurrentIdx(0);
            clearProgress(progressKey);
          }
        } else {
          setCurrentIdx(0);
          clearProgress(progressKey);
        }
      } else {
        setCurrentIdx(0);
      }
    } catch (err) {
      console.error('[review] loadCards failed, falling back to demo cards:', err);
      setCards(MOCK_CARDS);
      setDbError(true);
    } finally {
      setLoading(false);
    }
  }, [videoId, filterMode, wordIdsParam, progressKey]);

  useEffect(() => { loadCards(); }, [loadCards]);

  // persist progress —— 涵盖主评分阶段 + 默写/造句阶段，用户中断后回来能续
  useEffect(() => {
    if (cards.length === 0 || complete) return;
    saveProgress(progressKey, {
      idx: currentIdx,
      cardIds: cards.map(c => c.id),
      spellingPhase,
      spellingIdx,
      spellingWordIds: spellingWords.map(w => w.id),
      spellingCorrectCount,
      sentencePhase,
      sentenceIdx,
      sentenceWordIds: sentenceWords.map(w => w.id),
    }, TTL_EXAM);
  }, [currentIdx, cards, complete, progressKey, spellingPhase, spellingIdx, spellingWords, spellingCorrectCount, sentencePhase, sentenceIdx, sentenceWords]);

  // clear on complete
  useEffect(() => {
    if (complete) clearProgress(progressKey);
  }, [complete, progressKey]);

  // ── Filter cards ──
  const filteredCards = cards;

  const total = filteredCards.length;
  const current = filteredCards[currentIdx];
  currentRef.current = current ?? null;
  currentIdxRef.current = currentIdx;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  // ── Auto-play audio when card changes ──
  // 之前用了 300ms setTimeout 导致 iOS 手势栈已断，audio.play() 被拒。
  // 改为 requestAnimationFrame：让浏览器完成本轮 render，但延迟最小化。
  // 注意：playAudio 是稳定 useCallback，故意不写进 deps 以免 hoist 报错。
  useEffect(() => {
    if (loading || !current) return;
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => playAudioRef.current?.());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, loading, current]);

  // 中断恢复到造句阶段：blocks 未持久化，需重新向 AI 拉取
  useEffect(() => {
    if (!sentencePhase) return;
    if (sentenceBlocks.length > 0) return;
    if (sentenceGenError) return;
    const sw = sentenceWords[sentenceIdx];
    if (!sw) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/ai/sentence-judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate', word: sw.front, meaning: sw.meaning }),
        });
        if (cancelled) return;
        if (!res.ok) throw new Error('gen failed');
        const data = await res.json();
        const blocks = Array.isArray(data.blocks) ? data.blocks : [];
        if (blocks.length < 2) {
          setSentenceGenError(true);
        } else {
          setSentenceBlocks(shuffleBlocks(blocks));
        }
      } catch {
        if (!cancelled) setSentenceGenError(true);
      } finally {
        if (!cancelled) setSentenceLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sentencePhase, sentenceIdx, sentenceWords, sentenceBlocks.length, sentenceGenError]);

  // 卸载时停掉一切声音：iOS 上退出页面音频会继续在后台播
  useEffect(() => {
    return () => {
      try { audioRef.current?.pause(); } catch { /* ignore */ }
      audioRef.current = null;
      cancelSpeech();
    };
  }, []);

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
      speak(cur.front).then(() => setPlayingAudio(false)).catch(() => setPlayingAudio(false));
    }
  }, []);
  playAudioRef.current = playAudio;

  // ── Rating ──
  // 进入完成页时先关中间 phase + setComplete（同批次），再异步重读 profile 更新 streak/xp
  const finishRound = useCallback(() => {
    playComplete();
    setSpellingPhase(false);
    setSentencePhase(false);
    setShowSpellingPrompt(false);
    setComplete(true);
    db.userProfiles.get('main').then(p => {
      if (p) { setStreak(p.streak ?? 0); setTotalXp(p.xp ?? 0); }
    }).catch(() => {});
  }, []);

  const handleRate = useCallback((rate: RatingType) => {
    if (ratingLockRef.current) return;
    ratingLockRef.current = true;
    const cur = currentRef.current;
    const idx = currentIdxRef.current;
    if (!cur) { ratingLockRef.current = false; return; }

    // 保存评分前的快照，供"上一个词"回退
    const snapshot: RatingSnapshot = {
      dbId: cur.dbId,
      prevSrsLevel: cur.srsLevel ?? 0,
      prevEase: cur.easeFactor ?? 2.5,
      prevInterval: cur.interval ?? 1,
      prevMastery: cur.mastery ?? 'new',
      prevConsecutive: consecutiveCorrectRef.current[String(cur.dbId ?? '')] ?? 0,
      prevXpEarned: xpEarnedThisRound,
      prevTodayReviewed: todayReviewedRef.current,
      wasNewlyMastered: false,
      wasCorrect: rate !== 'forgot',
      cardId: cur.id,
    };

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

      db.words.update(cur.dbId!, {
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

    setDone(d => d + 1);

    // 每张卡本轮只见一次：forgot 也直接推进，不再回插循环。
    // SRS 引擎会在下一轮以更短 interval 把 forgot 的卡重新排回来。
    // 默写队列只收 remember/fuzzy 的卡（forgot 不算记住）。
    if (rate !== 'forgot' && cur.dbId) {
      correctWordIdsRef.current.push(cur.id);
    }
    if (idx + 1 >= cards.length) {
      const toSpell = cards.filter(c => correctWordIdsRef.current.includes(c.id));
      if (toSpell.length > 0) {
        setSpellingWords(toSpell);
        setShowSpellingPrompt(true);
      } else {
        finishRound();
      }
    } else {
      setCurrentIdx(idx + 1);
      setRevealed(false);
    }
    ratingLockRef.current = false;
  }, [cards.length]);

  const handleReveal = () => { setRevealed(true); };

  // 缺例句兜底：揭晓后若该词无例句，调 word-lookup 生成例句并回写 DB（按韩文词去重，成功后不再触发）
  useEffect(() => {
    if (!revealed || !current || !current.dbId) return;
    if (current.example.trim()) return;
    const cardId = current.id;
    const word = current.front;
    const meaning = current.meaning;
    // 用韩文词做去重 key：同一词跨来源/跨会话即便 card.id 不同也只试一次
    if (!word || exampleTriedRef.current.has(word)) return;
    if (!meaning) return;
    exampleTriedRef.current.add(word);
    const markTried = () => {
      try { localStorage.setItem(exampleTriedKey, JSON.stringify([...exampleTriedRef.current])); } catch { /* ignore */ }
    };
    let cancelled = false;
    // 只保留当前卡的状态（切卡后旧项自然丢弃，不累积）
    setExampleGenState({ [cardId]: 'loading' });
    (async () => {
      try {
        // word-lookup 直接给 2 句自然例句（无多义消歧严卡），适合外来词/碎片词兜底
        const res = await fetch('/api/ai/word-lookup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: word }),
        });
        if (cancelled) return;
        const data = await res.json();
        const list = Array.isArray(data.examples) ? data.examples : [];
        const valid = list.filter((ex: { korean?: string; chinese?: string }) => ex?.korean && ex?.chinese);
        if (!res.ok || valid.length === 0) {
          setExampleGenState({ [cardId]: 'empty' });
          markTried();
          return;
        }
        const newExamples = valid.slice(0, 2).map((ex: { korean: string; chinese: string }) => ({ text: ex.korean, translation: ex.chinese, source: 'manual' as const }));
        db.words.update(current.dbId!, { examples: newExamples }).catch(() => {});
        const exampleStr = newExamples.map((e: { text: string; translation: string }) => `${e.text}\n${e.translation}`).join('\n\n');
        setCards(prev => prev.map(c => c.id === cardId ? { ...c, example: exampleStr } : c));
        setExampleGenState({});
      } catch {
        if (!cancelled) setExampleGenState({ [cardId]: 'empty' });
      }
    })();
    return () => { cancelled = true; };
  }, [revealed, current]);

  const handleUndo = useCallback(() => {
    if (ratingLockRef.current) return;
    ratingLockRef.current = true;
    // 守卫：在 spelling/sentence/complete 阶段禁止 undo（会破坏流程）
    if (spellingPhase || sentencePhase || complete || showSpellingPrompt) { ratingLockRef.current = false; return; }
    const snap = historyRef.current.pop();
    if (!snap) { setCanUndo(false); ratingLockRef.current = false; return; }
    setCanUndo(historyRef.current.length > 0);
    // 回滚 DB：srs/ease/interval/mastery 还原；nextReview 设为"立即可复习"
    if (snap.dbId) {
      const wordKey = String(snap.dbId);
      consecutiveCorrectRef.current[wordKey] = snap.prevConsecutive;
      db.words.update(String(snap.dbId), {
        srsLevel: snap.prevSrsLevel,
        easeFactor: snap.prevEase,
        interval: snap.prevInterval,
        nextReview: Date.now(),
        mastery: snap.prevMastery,
      }).catch(() => {});
    }
    // 回滚 newlyMastered
    if (snap.wasNewlyMastered) {
      newlyMasteredRef.current = newlyMasteredRef.current.slice(0, -1);
    }
    // 回滚 correctWordIds
    if (snap.wasCorrect) {
      correctWordIdsRef.current = correctWordIdsRef.current.filter(id => id !== snap.cardId);
      setTodayReviewed(snap.prevTodayReviewed);
      todayReviewedRef.current = snap.prevTodayReviewed;
      updateTodayLog({ wordsReviewed: snap.prevTodayReviewed }).catch(() => {});
    }
    // 回滚 XP（只回 UI 累计；awardXp 已经写进 profile.xp，就不回滚了）
    setXpEarnedThisRound(snap.prevXpEarned);
    // 回退索引
    setDone(d => Math.max(0, d - 1));
    setCurrentIdx(i => Math.max(0, i - 1));
    setRevealed(true);
    ratingLockRef.current = false;
  }, [spellingPhase, sentencePhase, complete, showSpellingPrompt]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  // ── Empty state：无待复习词 ──
  if (!complete && !spellingPhase && !sentencePhase && !showSpellingPrompt && cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-4 max-w-md mx-auto text-center">
        <div className="text-5xl">🌱</div>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">{t('review.empty_no_due_title', lang)}</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {t('review.empty_no_due_desc', lang)}
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => router.push('/vocabulary')}
            className="px-5 py-3 rounded-full bg-[var(--text-primary)] text-white text-sm font-bold"
            style={{ minHeight: 44 }}
          >
            {t('review.empty_go_vocab', lang)}
          </button>
          <button
            onClick={smartBackDaily}
            className="px-5 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm font-medium"
            style={{ minHeight: 44 }}
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
          <h2 className="text-xl font-black text-[var(--text-primary)]">{t(isYesterday ? 'review.empty_yesterday_title' : 'review.empty_title', lang)}</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs leading-relaxed">
            {t(isYesterday ? 'review.empty_yesterday_subtitle' : 'review.empty_subtitle', lang)}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={smartBackVocab}
            className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-white text-sm font-black">
            {t('review.empty_view_vocab_button', lang)}
          </button>
          <button onClick={smartBackDaily}
            className="px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-black">
            {t('review.empty_back_button', lang)}
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
    <div className={`flex flex-col px-4 pt-4 mx-auto w-full ${isDesktop ? 'max-w-3xl pb-[100px]' : 'max-w-xl pb-[calc(56px+96px+env(safe-area-inset-bottom,0px))]'}`} style={{ minHeight: 'calc(100dvh - 60px)' }}>
      {/* DB error banner — shown when IndexedDB failed, using demo cards */}
      {dbError && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', marginBottom: 12, borderRadius: 'var(--radius-md)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-2)', fontSize: 13, color: 'var(--color-ink-2)' }}>
          <span>{t('review.db_error', lang)}</span>
          <button onClick={() => { setDbError(false); loadCards(); }} style={{ color: 'var(--color-pink-strong)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>{t('review.retry', lang)}</button>
        </div>
      )}
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/vocabulary"
            className="w-9 h-9 shrink-0 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-primary)]"
            style={{ boxShadow: '0 8px 20px rgba(78,52,46,.06)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="text-[17px] font-black text-[var(--text-primary)]">{t('review.flashcard_title', lang)}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            aria-label={t('review.prev_word', lang)}
            title={t('review.prev_word', lang)}
            className="flex items-center gap-1 rounded-full text-[12px] font-bold text-[var(--text-muted)] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--text-primary)] transition-colors"
            style={{ minWidth: 44, minHeight: 44, justifyContent: 'center' }}
          >
            <Undo2 size={16} />
          </button>
          <span className="text-[11px] font-black text-[var(--text-muted)]">{done} / {total}</span>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      {!videoId && (
        <div className="flex gap-1.5 mb-4">
          {(['due', 'yesterday'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-black transition-all ${
                filterMode === m
                  ? 'bg-[var(--pink-primary)] text-white'
                  : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {t(m === 'due' ? 'review.filter_due' : 'review.filter_yesterday', lang)}
            </button>
          ))}
        </div>
      )}

      {/* ── Progress bar ── */}
      <div className="h-[6px] rounded-full bg-[var(--border-default)] overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'var(--color-pink-base)' }}
        />
      </div>

      {/* ── Daily goal progress ── */}
      {!videoId && filterMode === 'due' && (() => {
        const goalPct = Math.min(Math.round((todayReviewed / dailyGoal) * 100), 100);
        return (
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex-1 h-[4px] rounded-full bg-[var(--border-default)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${goalPct}%`, background: 'var(--color-pink-base)' }}
              />
            </div>
            <span className="text-[11px] font-black shrink-0" style={{ color: goalPct >= 100 ? 'var(--color-mint-strong)' : 'var(--color-ink-3)' }}>
              {t('review.today_prefix', lang)} {todayReviewed}/{dailyGoal} · {goalPct}%
            </span>
          </div>
        );
      })()}

      {/* ── Flashcard ── */}
      <article
        className="flashcard-scale rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-default)] p-5 flex flex-col mb-3 flex-1"
        style={{ boxShadow: '0 20px 60px rgba(78,52,46,.14)', background: revealed ? 'linear-gradient(180deg, var(--bg-card), var(--bg-muted))' : 'var(--bg-card)' }}
      >
        {/* Front */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1" />
          <button
            onClick={playAudio}
            disabled={playingAudio}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-primary)] transition-colors shrink-0"
          >
            <Volume2 size={15} />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          <div className="text-[44px] font-black leading-tight tracking-tight" style={{ wordBreak: 'keep-all', color: 'var(--text-primary)', fontFamily: "'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif" }}>
            {current.front}
          </div>
          <div className="mt-3 text-[13px] font-black" style={{ color: 'var(--color-ink-3)' }}>
            {displayRoman(current.sub, current.front)}
          </div>
        </div>

        {/* Answer */}
        {revealed && (
          <div className="border-t border-[var(--border-default)] pt-4 mt-2">
            {/* 释义 —— 直接展示，不套容器 */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {current.partOfSpeech && (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}>{current.partOfSpeech}</span>
              )}
              <strong className="text-[18px] font-black text-[var(--text-primary)]">{current.meaning}</strong>
            </div>
            {current.note ? (
              <p className="mt-1 text-[13px] leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>{current.note}</p>
            ) : null}

            {/* 例句 —— 无外框，仅顶部一根细线 + 小标签 */}
            {current.example && examplePairs.length > 0 && (
              <div className="mt-5 pt-3" style={{ borderTop: '1px solid var(--border-default)' }}>
                <div className="mb-2.5 text-[10px] font-bold" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('review.example_section_label', lang)}
                </div>
                <div className="space-y-4">
                  {examplePairs.map((pair, idx) => (
                    <div key={idx}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 text-[14px] leading-relaxed">
                          <TappableText
                            text={pair.ko}
                            className="ko-text"
                            highlightWord={current.front}
                            source="闪卡复习"
                            style={{ color: 'var(--text-primary)' }}
                          />
                          {pair.zh && <div className="text-[12.5px] mt-1" style={{ color: 'var(--text-muted)' }}>{pair.zh}</div>}
                        </div>
                        <button
                          onClick={() => speak(pair.ko).catch(() => {})}
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'transparent', border: '1px solid var(--border-default)' }}
                        >
                          <Volume2 size={13} style={{ color: 'var(--color-pink-base)' }} />
                        </button>
                      </div>
                      <GrammarExplainBubble sentence={pair.ko} translation={pair.zh || undefined} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 缺例句兜底：生成中 / 生成失败提示 */}
            {examplePairs.length === 0 && exampleGenState[current.id] === 'loading' && (
              <div className="mt-5 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid var(--border-default)' }}>
                <Loader2 size={14} className="animate-spin" style={{ color: 'var(--color-pink-base)' }} />
                <span className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>{t('review.gen_example_loading', lang)}</span>
              </div>
            )}

            {current.type === 'word' && current.front && (
              <div className="mt-5 pt-3" style={{ borderTop: '1px solid var(--border-default)' }}>
                <TracePad word={current.front} />
              </div>
            )}
          </div>
        )}
      </article>

      {/* ── Reveal button ── */}
      {!revealed && (
        <div
          className="flex gap-2 desktop-fixed-rail"
          style={{
            position: 'fixed',
            left: 12,
            right: 12,
            bottom: isDesktop ? 16 : 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)',
            zIndex: 40,
            maxWidth: isDesktop ? 768 : 576,
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'var(--bg-base)',
            padding: '10px 12px',
            borderRadius: 999,
            boxShadow: '0 -8px 24px rgba(32,24,21,.10)',
          }}
        >
          <button
            onClick={handleReveal}
            className="flex-1 h-12 rounded-full text-white text-[14px] font-black"
            style={{ background: 'var(--text-primary)', boxShadow: '0 14px 28px rgba(32,24,21,.18)' }}
          >
            {t('review.reveal_button', lang)}
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="h-12 px-5 rounded-full text-[14px] font-black border"
            style={{ background: 'var(--bg-muted)', color: 'var(--color-mint-strong)', borderColor: 'rgba(174,227,216,.55)', whiteSpace: 'nowrap' }}
          >
            {t('review.skip_next_button', lang)}
          </button>
        </div>
      )}

      {/* ── Rating buttons ── */}
      {revealed && (
        <div
          className="grid gap-2 desktop-fixed-rail"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            position: 'fixed',
            left: 12,
            right: 12,
            bottom: isDesktop ? 16 : 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)',
            zIndex: 40,
            maxWidth: isDesktop ? 768 : 576,
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'var(--bg-base)',
            padding: '10px 12px',
            borderRadius: 24,
            boxShadow: '0 -8px 24px rgba(32,24,21,.10)',
          }}>
          <button
            onClick={() => handleRate('forgot')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-soft)', color: 'var(--color-pink-strong)', borderColor: 'rgba(255,127,168,.18)' }}
          >
            <b className="text-[15px]">{t('review.rating_forgot', lang)}</b>
            <span>{t('review.rating_forgot_sub', lang)}</span>
          </button>
          <button
            onClick={() => handleRate('fuzzy')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}
          >
            <b className="text-[15px]">{t('review.rating_fuzzy', lang)}</b>
            <span>{t('review.rating_fuzzy_sub', lang)}</span>
          </button>
          <button
            onClick={() => handleRate('remember')}
            className="min-h-[56px] rounded-[20px] flex flex-col items-center justify-center gap-1 text-[12px] font-black border"
            style={{ background: 'var(--bg-muted)', color: 'var(--color-mint-strong)', borderColor: 'rgba(174,227,216,.55)' }}
          >
            <b className="text-[15px]">{t('review.rating_remember', lang)}</b>
            <span>{t('review.rating_remember_sub', lang)}</span>
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
