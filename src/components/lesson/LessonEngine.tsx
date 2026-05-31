'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Volume2, AlertTriangle } from 'lucide-react';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import type { LessonCard, GoalData, AbilitySummary } from '@/lib/lesson/types';
import { buildLessonCards } from '@/lib/lesson/buildLessonCards';
import { recordLessonComplete } from '@/lib/lesson/recordLesson';
import { scoreAnswer } from '@/lib/lesson/scoreAnswer';
import { updateMastery, getOutputDifficulty } from '@/lib/lesson/updateMastery';
import { lessonSpeak, lessonCancelSpeech } from '@/lib/lesson/audio';
import { useIsMobile } from '@/lib/useIsMobile';
import { WordIntroCard } from './cards/WordIntroCard';
import { SentenceIntroCard } from './cards/SentenceIntroCard';
import { GrammarIntroCard } from './cards/GrammarIntroCard';
import { ListenChoiceCard } from './cards/ListenChoiceCard';
import { OutputCard } from './cards/OutputCard';
import { GoalCard } from './cards/GoalCard';
import { SpeakRepeatCard } from './cards/SpeakRepeatCard';
import { MatchPairsCard } from './cards/MatchPairsCard';
import { SummaryCard } from './cards/SummaryCard';
import { BrowseDrawer } from './BrowseDrawer';
import { CompletionView } from './CompletionView';
import { LessonProgressDots } from './LessonProgressDots';
import { MicroFeedbackToast, getMicroFeedback } from './MicroFeedback';
import type { MicroFeedback } from '@/lib/lesson/types';
import type { DailyWord, DailySentence, DailyGrammar, DailyDictation, OutputTask } from '@/data/thirtyDayCourse';

interface Props {
  course: DailyCourse;
  dayNum: number;
}

const CARD_TRANSITION_MS = 200;

export default function LessonEngine({ course, dayNum }: Props) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [outputDifficulty, setOutputDifficulty] = useState(2);
  const [cards, setCards] = useState<LessonCard[]>(() => buildLessonCards(course, outputDifficulty));

  useEffect(() => {
    getOutputDifficulty().then((d) => {
      if (d !== 2) {
        setOutputDifficulty(d);
        setCards(buildLessonCards(course, d));
      }
    });
  }, [course]);

  const cardsRef = useRef(cards);
  cardsRef.current = cards;
  const totalCards = cards.length;
  const [currentCard, setCurrentCard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [autoPlayFailed, setAutoPlayFailed] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  // Request sequence counter to reject stale audio
  const speakSeqRef = useRef(0);

  // Micro-feedback
  const [feedback, setFeedback] = useState<MicroFeedback | null>(null);

  const eventsRef = useRef<{ card: LessonCard; action: string; detail: string }[]>([]);
  const scoredRef = useRef<Set<number>>(new Set());
  const [result, setResult] = useState<{ leveledUp: boolean; newLevel: number; streak: number; xpAwarded: number } | null>(null);

  const card = cards[currentCard];
  const autoPlayingRef = useRef(false);

  const logEvent = useCallback((c: LessonCard, action: string, detail: string) => {
    eventsRef.current.push({ card: c, action, detail });
  }, []);

  // ── Auto-speak on card change ──
  useEffect(() => {
    if (!card || card.type === 'output' || card.type === 'goal' || card.type === 'summary' || card.type === 'match-pairs') return;
    const text = card.speakText;
    if (!text) return;

    const seq = ++speakSeqRef.current;
    autoPlayingRef.current = true;
    setAutoPlayFailed(false);

    const t = setTimeout(async () => {
      if (!autoPlayingRef.current || seq !== speakSeqRef.current) return;
      setPlaying(true);
      setLoadingAudio(true);
      const ok = await lessonSpeak(text, 0.75);
      if (seq === speakSeqRef.current) {
        setPlaying(false);
        setLoadingAudio(false);
        if (!ok) setAutoPlayFailed(true);
      }
    }, 200);

    logEvent(card, 'view', `查看卡片 ${currentCard + 1}/${totalCards}`);

    return () => {
      clearTimeout(t);
      autoPlayingRef.current = false;
      lessonCancelSpeech();
    };
  }, [currentCard]);

  const speakCard = useCallback(async () => {
    if (playing || !card?.speakText) return;
    const seq = ++speakSeqRef.current;
    setPlaying(true);
    setLoadingAudio(true);
    const ok = await lessonSpeak(card.speakText, 0.75);
    if (seq === speakSeqRef.current) {
      setPlaying(false);
      setLoadingAudio(false);
      if (ok) setAutoPlayFailed(false);
      else setAutoPlayFailed(true);
    }
  }, [playing, card?.speakText]);

  // ── Navigation ──
  const goNext = useCallback(() => {
    if (transitioning || !card) return;

    if (!scoredRef.current.has(currentCard)) {
      scoredRef.current.add(currentCard);
      const answerResult = scoreAnswer(card, selectedOption, revealed, outputText);
      const isCorrect = answerResult.correct;
      logEvent(card, isCorrect ? 'answer_correct' : answerResult.detail.includes('错误') ? 'answer_wrong' : 'reveal', answerResult.detail);

      // Update mastery
      const itemType = card.type.replace('-intro', '').replace('listen-choice', 'dictation').replace('speak-repeat', 'sentence').replace('sentence-build', 'sentence').replace('match-pairs', 'sentence');
      const itemIdx = card.masteryKey ? parseInt(card.masteryKey.split('-')[1]) || 0 : 0;
      const source = (card.data as any).korean || (card.data as any).name || (card.data as any).prompt || '';
      updateMastery({ dayNum: course.day, itemType, itemIdx, source, quality: answerResult.quality });

      // Show micro-feedback
      if (card.type === 'listen-choice' || card.type === 'match-pairs') {
        setFeedback(getMicroFeedback(isCorrect ? 'correct' : 'wrong'));
      } else if (card.type === 'output') {
        if (isCorrect) setFeedback(getMicroFeedback('correct'));
      } else {
        setFeedback(getMicroFeedback('reveal'));
      }

      // Retry insertion: on wrong answer, insert a duplicate card 5 positions ahead
      if (!isCorrect && (card.type === 'listen-choice' || card.type === 'match-pairs')) {
        const currentRetries = card.retryCount || 0;
        const maxRetries = card.maxRetries ?? 0;
        if (currentRetries < maxRetries) {
          const insertPos = Math.min(currentCard + 5, cardsRef.current.length);
          const retryCard: LessonCard = {
            ...card,
            retryCount: currentRetries + 1,
            originalIndex: card.originalIndex ?? currentCard,
            masteryKey: card.masteryKey ? `${card.masteryKey}-retry${currentRetries + 1}` : undefined,
          };
          setCards((prev) => {
            const next = [...prev];
            next.splice(insertPos, 0, retryCard);
            return next;
          });
        }
      }
    }

    setTransitioning(true);
    setTimeout(() => {
      if (currentCard + 1 >= cardsRef.current.length) {
        setCompleted(true);
      } else {
        setCurrentCard((p) => p + 1);
        setRevealed(false);
        setSelectedOption(null);
        setPlaying(false);
        setAutoPlayFailed(false);
        lessonCancelSpeech();
      }
      setTransitioning(false);
    }, CARD_TRANSITION_MS);
  }, [transitioning, currentCard, totalCards, card, selectedOption, revealed, outputText, course.day, logEvent]);

  const goPrev = useCallback(() => {
    if (transitioning || currentCard === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentCard((p) => p - 1);
      setRevealed(false);
      setSelectedOption(null);
      setPlaying(false);
      setAutoPlayFailed(false);
      lessonCancelSpeech();
      setTransitioning(false);
    }, CARD_TRANSITION_MS);
  }, [transitioning, currentCard]);

  const reveal = useCallback(() => {
    if (!revealed && card) {
      setRevealed(true);
      logEvent(card, 'reveal', '显示答案');
      if (card.type === 'speak-repeat') {
        setFeedback(getMicroFeedback('correct'));
      }
    }
  }, [revealed, card, logEvent]);

  const handleOptionSelect = useCallback((idx: number) => {
    if (selectedOption !== null || !card) return;
    setSelectedOption(idx);
    setRevealed(true);
    const isCorrect = idx === card.correctOption;
    logEvent(card, isCorrect ? 'answer_correct' : 'answer_wrong', `选项${idx + 1}`);
    setFeedback(getMicroFeedback(isCorrect ? 'correct' : 'wrong'));
  }, [selectedOption, card, logEvent]);

  const handleMatchPairsCorrect = useCallback(() => {
    setRevealed(true);
    setFeedback(getMicroFeedback('correct'));
    if (card) logEvent(card, 'answer_correct', '配对正确');
  }, [card, logEvent]);

  const handleMatchPairsWrong = useCallback(() => {
    setFeedback(getMicroFeedback('wrong'));
    if (card) logEvent(card, 'answer_wrong', '配对错误');
  }, [card, logEvent]);

  const handleSpeakScore = useCallback((score: number, transcript: string) => {
    if (card) logEvent(card, 'speak', `发音评分 ${score}分: ${transcript}`);
  }, [card, logEvent]);

  const handleComplete = useCallback(async () => {
    if (result) return;
    if (card && !scoredRef.current.has(currentCard)) {
      scoredRef.current.add(currentCard);
      const answerResult = scoreAnswer(card, selectedOption, revealed, outputText);
      const itemType = card.type.replace('-intro', '');
      const itemIdx = card.masteryKey ? parseInt(card.masteryKey.split('-')[1]) || 0 : 0;
      const source = (card.data as any).korean || '';
      updateMastery({ dayNum: course.day, itemType, itemIdx, source, quality: answerResult.quality });
    }
    const r = await recordLessonComplete(course, eventsRef.current);
    setResult(r);
  }, [result, card, currentCard, course, selectedOption, revealed, outputText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { lessonCancelSpeech(); };
  }, []);

  const goNextDay = () => { if (dayNum < 30) router.push(`/course/${dayNum + 1}`); };
  const goPrevDay = () => { if (dayNum > 1) router.push(`/course/${dayNum - 1}`); };

  if (showBrowse) {
    return <BrowseDrawer course={course} dayNum={dayNum} onClose={() => setShowBrowse(false)} goNextDay={goNextDay} goPrevDay={goPrevDay} />;
  }

  if (completed) {
    return (
      <div className="py-4 mx-auto max-w-lg space-y-6">
        <CompletionView
          course={course} dayNum={dayNum}
          outputText={outputText} setOutputText={setOutputText}
          showKeyboard={showKeyboard} setShowKeyboard={setShowKeyboard}
          isMobile={isMobile} result={result} onComplete={handleComplete}
          goPrevDay={goPrevDay} goNextDay={goNextDay}
        />
      </div>
    );
  }

  const cardLabel = () => {
    switch (card.type) {
      case 'goal': return `今日目标`;
      case 'word-intro': return `单词 · ${currentCard + 1}/${totalCards}`;
      case 'grammar-intro': return `语法 · ${currentCard + 1}/${totalCards}`;
      case 'sentence-intro': return `实用句 · ${currentCard + 1}/${totalCards}`;
      case 'listen-choice': return `听力选择 · ${currentCard + 1}/${totalCards}`;
      case 'speak-repeat': return `影子跟读 · ${currentCard + 1}/${totalCards}`;
      case 'match-pairs': return `词组配对 · ${currentCard + 1}/${totalCards}`;
      case 'output': return `输出练习 · ${currentCard + 1}/${totalCards}`;
      case 'summary': return `学习总结`;
    }
  };

  const showSpeaker = card.type !== 'output' && card.type !== 'goal' && card.type !== 'summary' && card.type !== 'match-pairs';
  const isPassiveCard = card.type === 'goal' || card.type === 'summary';
  const isInteractive = card.type === 'listen-choice' || card.type === 'match-pairs' || card.type === 'speak-repeat' || card.type === 'output';
  const showRevealBtn = !revealed && !isInteractive && !isPassiveCard;
  const canGoNext = card.type === 'listen-choice' ? selectedOption !== null : true;

  return (
    <div className="py-4 mx-auto max-w-lg space-y-4">
      {/* Micro-feedback toast */}
      <MicroFeedbackToast feedback={feedback} onDone={() => setFeedback(null)} />

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link href="/course" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="text-center">
          <span className="text-xs font-bold text-[var(--text-primary)]">Day {course.day}</span>
          <span className="text-[11px] text-[var(--text-muted)] ml-1">{course.title}</span>
        </div>
        <button onClick={() => setShowBrowse(true)} className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
          本课内容
        </button>
      </div>

      {/* Stage progress */}
      <LessonProgressDots cards={cards} currentCard={currentCard} />

      {/* Card label */}
      <p className="text-center text-[11px] text-[var(--text-muted)] font-medium">{cardLabel()}</p>

      {/* Flashcard */}
      <div
        onClick={!isInteractive && !isPassiveCard ? reveal : undefined}
        className={`relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[340px] flex flex-col items-center justify-center text-center transition-all select-none ${
          !isInteractive && !isPassiveCard ? 'cursor-pointer hover:border-[var(--pink-pale)]/50' : ''
        }`}
      >
        {/* Speaker button */}
        {showSpeaker && (
          <button
            onClick={(e) => { e.stopPropagation(); speakCard(); }}
            disabled={playing}
            className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
              loadingAudio ? 'bg-amber-500/10 text-amber-500 animate-pulse' :
              playing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' :
              'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
            }`}
            title={loadingAudio ? '加载中...' : playing ? '播放中' : '点击播放'}
          >
            <Volume2 size={playing ? 18 : 20} className={playing || loadingAudio ? 'animate-pulse' : ''} />
          </button>
        )}

        {/* Auto-play failure indicator */}
        {autoPlayFailed && showSpeaker && (
          <div className="absolute top-16 right-4 flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 rounded-lg px-2 py-1">
            <AlertTriangle size={12} />
            点击喇叭收听
          </div>
        )}

        {card.type === 'goal' && <GoalCard goal={card.data as GoalData} />}
        {card.type === 'word-intro' && <WordIntroCard word={card.data as DailyWord} revealed={revealed} />}
        {card.type === 'grammar-intro' && <GrammarIntroCard grammar={card.data as DailyGrammar} revealed={revealed} />}
        {card.type === 'sentence-intro' && <SentenceIntroCard sentence={card.data as DailySentence} revealed={revealed} />}
        {card.type === 'listen-choice' && (
          <ListenChoiceCard
            dictation={card.data as DailyDictation}
            options={card.options!}
            correctOption={card.correctOption!}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
            onSpeak={speakCard}
            playing={playing}
          />
        )}
        {card.type === 'speak-repeat' && (
          <SpeakRepeatCard
            korean={(card.data as DailySentence).korean}
            pronunciation={(card.data as DailySentence).pronunciation}
            chinese={(card.data as DailySentence).chinese}
            playing={playing}
            onSpeak={speakCard}
            onScore={handleSpeakScore}
          />
        )}
        {card.type === 'match-pairs' && (
          <MatchPairsCard
            direction={card.matchDirection!}
            promptText={card.matchDirection === 'zh-to-ko' ? (card.data as DailySentence).chinese : (card.data as DailySentence).korean}
            chunks={card.matchChunks!}
            correctOrder={card.matchCorrectOrder!}
            onCorrect={handleMatchPairsCorrect}
            onWrong={handleMatchPairsWrong}
          />
        )}
        {card.type === 'output' && (
          <OutputCard
            output={card.data as OutputTask}
            text={outputText} setText={setOutputText}
            showKeyboard={showKeyboard} setShowKeyboard={setShowKeyboard}
            isMobile={isMobile}
          />
        )}
        {card.type === 'summary' && <SummaryCard summary={card.data as AbilitySummary} />}
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentCard === 0 || transitioning}
          className="flex items-center gap-1 text-sm px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ArrowLeft size={16} />
          上一张
        </button>

        <span className="text-xs text-[var(--text-muted)] tabular-nums">
          {currentCard + 1} / {totalCards}
        </span>

        {showRevealBtn ? (
          <button
            onClick={reveal}
            className="flex items-center gap-1 text-sm px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 transition-colors"
          >
            显示答案
          </button>
        ) : !canGoNext ? (
          <span className="text-xs text-[var(--text-muted)]">请选择一个选项</span>
        ) : (
          <button
            onClick={goNext}
            disabled={transitioning}
            className="flex items-center gap-1 text-sm px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 transition-colors disabled:opacity-50"
          >
            {currentCard + 1 >= totalCards ? '完成' : '下一张'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
