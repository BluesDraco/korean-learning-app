'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import type { LessonCard } from '@/lib/lesson/types';
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
import { BrowseDrawer } from './BrowseDrawer';
import { CompletionView } from './CompletionView';
import type { DailyWord, DailySentence, DailyGrammar, DailyDictation, OutputTask } from '@/data/thirtyDayCourse';

interface Props {
  course: DailyCourse;
  dayNum: number;
}

export default function LessonEngine({ course, dayNum }: Props) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [outputDifficulty, setOutputDifficulty] = useState(2);
  const cards = useMemo(() => buildLessonCards(course, outputDifficulty), [course, outputDifficulty]);

  // Load progressive difficulty on mount
  useEffect(() => {
    getOutputDifficulty().then(setOutputDifficulty);
  }, []);

  const totalCards = cards.length;

  const [currentCard, setCurrentCard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Event log for analytics
  const eventsRef = useRef<{ card: LessonCard; action: string; detail: string }[]>([]);
  // Track which cards have been scored already to avoid double-counting
  const scoredRef = useRef<Set<number>>(new Set());

  const [result, setResult] = useState<{ leveledUp: boolean; newLevel: number; streak: number; xpAwarded: number } | null>(null);

  const card = cards[currentCard];
  const autoPlayingRef = useRef(false);

  // Log a view event when card changes
  const logEvent = useCallback((c: LessonCard, action: string, detail: string) => {
    eventsRef.current.push({ card: c, action, detail });
  }, []);

  // Auto-speak on card change
  useEffect(() => {
    if (!card || card.type === 'output') return;
    const text = card.speakText;
    if (!text) return;

    autoPlayingRef.current = true;
    const t = setTimeout(() => {
      if (!autoPlayingRef.current) return;
      setPlaying(true);
      lessonSpeak(text, 0.75).then(() => setPlaying(false));
    }, 400);

    // Log view event
    logEvent(card, 'view', `查看卡片 ${currentCard + 1}/${totalCards}`);

    return () => {
      clearTimeout(t);
      autoPlayingRef.current = false;
      lessonCancelSpeech();
    };
  }, [currentCard]);

  const speakCard = useCallback(async () => {
    if (playing || !card?.speakText) return;
    setPlaying(true);
    const ok = await lessonSpeak(card.speakText, 0.75);
    if (!ok) setPlaying(false);
  }, [playing, card?.speakText]);

  const goNext = useCallback(() => {
    if (!card) return;

    // Score and update mastery for the current card before advancing
    if (!scoredRef.current.has(currentCard)) {
      scoredRef.current.add(currentCard);

      const answerResult = scoreAnswer(card, selectedOption, revealed, outputText);
      logEvent(card, answerResult.detail.includes('正确') ? 'answer_correct' : answerResult.detail.includes('错误') ? 'answer_wrong' : 'reveal', answerResult.detail);

      // Update mastery in background
      const itemType = card.type.replace('-intro', '').replace('listen-choice', 'dictation');
      const itemIdx = card.masteryKey ? parseInt(card.masteryKey.split('-')[1]) || 0 : 0;
      const source = (card.data as any).korean || (card.data as any).name || (card.data as any).prompt || '';
      updateMastery({ dayNum: course.day, itemType, itemIdx, source, quality: answerResult.quality });
    }

    if (currentCard + 1 >= totalCards) {
      setCompleted(true);
    } else {
      setCurrentCard((p) => p + 1);
      setRevealed(false);
      setSelectedOption(null);
      setPlaying(false);
      lessonCancelSpeech();
    }
  }, [currentCard, totalCards, card, selectedOption, revealed, outputText, course.day, logEvent]);

  const goPrev = useCallback(() => {
    if (currentCard > 0) {
      setCurrentCard((p) => p - 1);
      setRevealed(false);
      setSelectedOption(null);
      setPlaying(false);
      lessonCancelSpeech();
    }
  }, [currentCard]);

  const reveal = useCallback(() => {
    if (!revealed && card) {
      setRevealed(true);
      logEvent(card, 'reveal', '显示答案');
    }
  }, [revealed, card, logEvent]);

  const handleOptionSelect = useCallback((idx: number) => {
    if (selectedOption !== null || !card) return;
    setSelectedOption(idx);
    setRevealed(true);
    logEvent(card, idx === card.correctOption ? 'answer_correct' : 'answer_wrong', `选项${idx + 1}`);
  }, [selectedOption, card, logEvent]);

  const handleComplete = useCallback(async () => {
    if (result) return;
    const r = await recordLessonComplete(course, eventsRef.current);
    setResult(r);
  }, [course, result]);

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
      case 'word-intro': return `单词 · ${currentCard + 1}/${totalCards}`;
      case 'grammar-intro': return `语法 · ${currentCard + 1}/${totalCards}`;
      case 'sentence-intro': return `实用句 · ${currentCard + 1}/${totalCards}`;
      case 'listen-choice': return `听力选择 · ${currentCard + 1}/${totalCards}`;
      case 'output': return `输出练习 · ${currentCard + 1}/${totalCards}`;
    }
  };

  const showSpeaker = card.type !== 'output';
  const canGoNext = card.type === 'listen-choice' ? selectedOption !== null : true;
  const showRevealBtn = !revealed && card.type !== 'listen-choice' && card.type !== 'output';

  return (
    <div className="py-4 mx-auto max-w-lg space-y-4">
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

      <div className="flex justify-center gap-1">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i < currentCard ? 'w-4 bg-[var(--mint-soft)]' :
              i === currentCard ? 'w-4 bg-[var(--pink-primary)]' :
              'w-1.5 bg-[var(--border-color)]'
            }`}
          />
        ))}
      </div>

      <p className="text-center text-[11px] text-[var(--text-muted)] font-medium">{cardLabel()}</p>

      {/* Flashcard */}
      <div
        onClick={card.type === 'listen-choice' || card.type === 'output' ? undefined : reveal}
        className={`relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[340px] flex flex-col items-center justify-center text-center transition-all select-none ${
          card.type !== 'listen-choice' && card.type !== 'output' ? 'cursor-pointer hover:border-[var(--pink-pale)]/50' : ''
        }`}
      >
        {showSpeaker && (
          <button
            onClick={(e) => { e.stopPropagation(); speakCard(); }}
            disabled={playing}
            className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
              playing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
            }`}
          >
            <Volume2 size={playing ? 18 : 20} className={playing ? 'animate-pulse' : ''} />
          </button>
        )}

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
        {card.type === 'output' && (
          <OutputCard
            output={card.data as OutputTask}
            text={outputText} setText={setOutputText}
            showKeyboard={showKeyboard} setShowKeyboard={setShowKeyboard}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentCard === 0}
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
            className="flex items-center gap-1 text-sm px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 transition-colors"
          >
            {currentCard + 1 >= totalCards ? '完成' : '下一张'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
