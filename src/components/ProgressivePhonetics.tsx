'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Check, X, ArrowRight, RotateCcw, Trophy, Sparkles, Lock, Volume2, Ear } from 'lucide-react';
import { progressiveSteps } from '@/data/phonetics-steps';
import type { PhoneticLetter } from '@/data/phonetics';
import { speak, speakWord, unlockAudioContext } from '@/lib/tts';
import { emitXpFlyout } from '@/components/XpOverlay';
import ReadingPractice from '@/components/ReadingPractice';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function getQuizRomanization(l: PhoneticLetter) {
  return (l as PhoneticLetter & { quizRomanization?: string }).quizRomanization ?? l.romanization;
}

function getQuizLetter(l: PhoneticLetter) {
  return (l as PhoneticLetter & { quizLetter?: string }).quizLetter ?? l.letter;
}

const CONSONANT_DEMO: Record<string, string> = {
  'ㄱ': '가', 'ㄴ': '나', 'ㄷ': '다', 'ㄹ': '라', 'ㅁ': '마',
  'ㅂ': '바', 'ㅅ': '사', 'ㅇ': '아', 'ㅈ': '자', 'ㅊ': '차',
  'ㅋ': '카', 'ㅌ': '타', 'ㅍ': '파', 'ㅎ': '하',
  'ㄲ': '까', 'ㄸ': '따', 'ㅃ': '빠', 'ㅆ': '싸', 'ㅉ': '짜',
};

const BATCHIM_DEMO: Record<string, string> = {
  'ㄱ': '악', 'ㄴ': '안', 'ㄷ': '앋', 'ㄹ': '알', 'ㅁ': '암',
  'ㅂ': '압', 'ㅇ': '앙',
};

function getSpeakText(l: PhoneticLetter): string {
  if (l.type === 'vowel') return l.name;
  if (l.type === 'consonant' || l.type === 'double') {
    const jamo = l.letter.split('/')[0];
    return CONSONANT_DEMO[jamo] ?? l.name;
  }
  if (l.type === 'batchim') {
    const jamo = l.letter.split('/')[0];
    return BATCHIM_DEMO[jamo] ?? CONSONANT_DEMO[jamo] ?? l.name;
  }
  return l.name;
}

function generateStepQuiz(letters: PhoneticLetter[]) {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, Math.min(6, letters.length));
  return pool.map((item) => {
    const isLetterQ = Math.random() > 0.5;
    const correctAnswer = isLetterQ ? getQuizRomanization(item) : getQuizLetter(item);
    const wrongPool = pool.filter((l) => l.id !== item.id).sort(() => Math.random() - 0.5);
    const wrongOptions: string[] = [];
    for (const w of wrongPool) {
      if (wrongOptions.length >= 3) break;
      const val = isLetterQ ? getQuizRomanization(w) : getQuizLetter(w);
      if (val !== correctAnswer && !wrongOptions.includes(val)) wrongOptions.push(val);
    }
    return {
      id: item.id,
      prompt: isLetterQ
        ? `"${getQuizLetter(item)}" 的发音是？`
        : `发音 "${getQuizRomanization(item)}" 对应哪个字母？`,
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongOptions]),
      item,
    };
  });
}

function generateListenQuiz(letters: PhoneticLetter[]) {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, Math.min(6, letters.length));
  return pool.map((item) => {
    const correctAnswer = getQuizLetter(item);
    const wrongPool = pool.filter((l) => l.id !== item.id).sort(() => Math.random() - 0.5);
    const wrongOptions: string[] = [];
    for (const w of wrongPool) {
      if (wrongOptions.length >= 3) break;
      const val = getQuizLetter(w);
      if (val !== correctAnswer && !wrongOptions.includes(val)) wrongOptions.push(val);
    }
    return {
      id: item.id,
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongOptions]),
      item,
    };
  });
}

type Mode = 'browse' | 'quiz' | 'listen';

export default function ProgressivePhonetics() {
  const { lang } = useLang();
  const enText = (zh: string, en?: string) => (lang === 'en' ? en ?? zh : zh);
  const { user } = useAuth();
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<Mode>('browse');
  const [quizQuestions, setQuizQuestions] = useState<ReturnType<typeof generateStepQuiz>>([]);
  const [listenQuestions, setListenQuestions] = useState<ReturnType<typeof generateListenQuiz>>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    if (!user?.id) { setCompletedSteps(new Set()); return; }
    let cancelled = false;
    db.phoneticSteps.toArray()
      .then(rows => { if (!cancelled) setCompletedSteps(new Set(rows.map(r => r.id))); })
      .catch(e => console.error('[phonetics] failed to load phonetic steps:', e));
    return () => { cancelled = true; };
  }, [user?.id]);

  const activeStep = progressiveSteps[activeStepIdx];
  const allDone = progressiveSteps.every((s) => completedSteps.has(s.id));
  const doneCount = progressiveSteps.filter((s) => completedSteps.has(s.id)).length;

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const startQuiz = useCallback(() => {
    const questions = generateStepQuiz(activeStep.letters, lang);
    setQuizQuestions(questions);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
    setQuizComplete(false);
    setMode('quiz');
  }, [activeStep, lang]);

  const startListen = useCallback(() => {
    const questions = generateListenQuiz(activeStep.letters);
    setListenQuestions(questions);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
    setQuizComplete(false);
    audioPlayedRef.current = false;
    setMode('listen');
  }, [activeStep]);

  // Auto-play audio for listen mode
  useEffect(() => {
    if (mode === 'listen' && listenQuestions.length > 0 && !audioPlayedRef.current && quizAnswer === null && !quizComplete) {
      audioPlayedRef.current = true;
      const item = listenQuestions[quizIdx];
      speakWord(getSpeakText(item.item), 0.7);
    }
  }, [mode, listenQuestions, quizIdx, quizComplete]); // quizAnswer intentionally excluded — resetting it must not retrigger playback

  const handleQuizAnswer = (opt: string) => {
    setQuizAnswer(opt);
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (opt === questions[quizIdx].correctAnswer) {
      setQuizCorrect((prev) => prev + 1);
    }
  };

  const handleQuizNext = () => {
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (quizIdx + 1 >= questions.length) {
      setQuizComplete(true);
      if (quizCorrect >= Math.ceil(questions.length * 0.6)) {
        const stepId = activeStep.id;
        if (!completedSteps.has(stepId)) {
          const newCompleted = new Set(completedSteps);
          newCompleted.add(stepId);
          setCompletedSteps(newCompleted);
          db.phoneticSteps.put({ id: stepId, completedAt: Date.now() }).catch(() => {});
        }
        emitXpFlyout(15);
      }
    } else {
      audioPlayedRef.current = false; // reset before state updates so the effect sees it false on next render
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  const replayAudio = () => {
    const questions = mode === 'listen' ? listenQuestions : quizQuestions;
    if (questions[quizIdx]) {
      unlockAudioContext();
      speakWord(getSpeakText(questions[quizIdx].item), 0.7);
    }
  };

  const goToStep = (idx: number) => {
    setActiveStepIdx(idx);
    setMode('browse');
    setQuizAnswer(null);
    setQuizIdx(0);
    setQuizComplete(false);
  };

  const questions = mode === 'listen' ? listenQuestions : quizQuestions;

  return (
    <div className="py-4 space-y-6">
      {/* Step progress bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {progressiveSteps.map((step, i) => {
          const isCurrent = i === activeStepIdx;
          const isDone = completedSteps.has(step.id);
          const isLocked = false;
          return (
            <button
              key={step.id}
              onClick={() => goToStep(i)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-[var(--pink-primary)] text-[var(--text-primary)] shadow-lg shadow-[var(--pink-primary)]/30'
                  : isDone
                    ? 'bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] border border-[var(--mint-soft)]/40'
                    : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border-color)]'
              }`}
            >
              {isDone ? <Check size={12} /> : <span>{i + 1}</span>}
              {enText(step.title, step.titleEn)}
              {i < progressiveSteps.length - 1 && (
                <span className="text-[var(--text-muted)] ml-0.5">›</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress summary */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[var(--text-secondary)]">{t('phonetics.prog_learning_progress', lang)}</span>
            <span className="text-xs font-bold text-[var(--text-primary)]">{doneCount}/{progressiveSteps.length}</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${(doneCount / progressiveSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="bg-gradient-to-r from-[var(--mint-soft)]/15 to-[var(--purple-soft)]/15 border border-[var(--mint-soft)]/30 rounded-2xl p-5 text-center animate-fade-in space-y-3">
          <div className="text-3xl">🏆</div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">축하합니다! {t('phonetics.prog_all_done_title', lang)}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t('phonetics.prog_all_done_desc', lang)}
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <Link
              href="/phonetics"
              onClick={() => {
                setActiveStepIdx(0);
                setMode('browse');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-xs font-bold transition-colors hover:shadow-lg hover:shadow-[var(--pink-primary)]/25"
            >
              {t('phonetics.prog_go_composer', lang)} <Sparkles size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Step header */}
      {/* Reading step browse */}
      {mode === 'browse' && activeStep.isReadingStep && (
        <ReadingPractice words={activeStep.readingWords || []} step={activeStep} />
      )}

      {/* Normal step browse */}
      {mode === 'browse' && !activeStep.isReadingStep && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {enText(activeStep.title, activeStep.titleEn)} <span className="text-[var(--text-muted)] text-base font-normal">({activeStep.titleKo})</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto">
              {enText(activeStep.description, activeStep.descriptionEn)}
            </p>
            <div className="text-xs text-[var(--text-muted)] mt-2">
              {t('phonetics.prog_letter_count', lang, { n: activeStep.letters.length })}
            </div>
          </div>

          {/* Letter cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activeStep.letters.map((letter) => {
              if (letter.type === 'batchim') {
                const subLetters = letter.letter.split('/');
                const repJamo = (letter as PhoneticLetter & { quizLetter?: string }).quizLetter ?? subLetters[0];
                const demoWord = BATCHIM_DEMO[repJamo] ?? '';
                const ipa = BATCHIM_IPA[repJamo] ?? '';
                const typeLabelKey = BATCHIM_TYPE_LABEL_KEY[letter.subtype];
                const typeLabel = typeLabelKey ? t(typeLabelKey, lang) : '';
                return (
                  <div key={letter.id} className="col-span-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--pink-primary)] bg-[var(--pink-primary)]/10 px-2 py-0.5 rounded-full">{typeLabel}</span>
                      <span className="text-xs text-[var(--text-muted)]">{ipa}</span>
                    </div>
                    <button
                      onClick={() => playPhoneticAudio(demoWord, 0.7)}
                      className="w-full flex items-center gap-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] rounded-xl p-3 transition-colors text-left"
                    >
                      <span className="text-4xl font-extrabold text-[var(--text-primary)]" style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>{demoWord}</span>
                      <span className="flex-1 text-xs text-[var(--text-secondary)]">
                        <span className="block text-[var(--text-primary)] font-medium">[{letter.romanization}]</span>
                        <span className="text-[var(--text-muted)]">{enText(letter.mnemonic, letter.mnemonicEn)}</span>
                      </span>
                      <Volume2 size={16} className="text-[var(--pink-primary)] shrink-0" />
                    </button>
                    <div className="space-y-1.5">
                      <div className="text-xs text-[var(--text-muted)]">{t('phonetics.prog_batchim_same_sound', lang)}</div>
                      <div className="flex flex-wrap gap-2">
                        {subLetters.map((jamo) => (
                          <div
                            key={jamo}
                            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-2"
                            style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                          >
                            <span className="text-xl font-bold text-[var(--text-primary)]">{jamo}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] text-[var(--text-placeholder)] mt-1">{t('phonetics.prog_batchim_demo_hint_before', lang)} <b>{demoWord}</b> {t('phonetics.prog_batchim_demo_hint_after', lang)}</div>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">{enText(letter.sound, letter.soundEn)}</div>
                  </div>
                );
              }
              const isExpanded = expandedCards.has(letter.id);
              return (
                <div
                  key={letter.id}
                  className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 transition-all ${
                    isExpanded ? 'ring-2 ring-[var(--pink-primary)]/30 shadow-lg' : 'hover:border-[var(--border-hover)]'
                  }`}
                >
                  <button
                    onClick={() => { unlockAudioContext(); speakWord(getSpeakText(letter), 0.7); }}
                    className="w-full text-3xl font-extrabold text-[var(--text-primary)] mb-1 text-center block hover:text-[var(--pink-primary)] transition-colors"
                    style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                    title={t('phonetics.prog_tap_to_hear', lang)}
                  >
                    {letter.letter}
                  </button>
                  <div className="text-sm text-[var(--text-secondary)] text-center mb-1">
                    {letter.name} <span className="text-[var(--text-muted)]">[{letter.romanization}]</span>
                  </div>
                  <button
                    onClick={() => { unlockAudioContext(); speakWord(getSpeakText(letter), 0.7); }}
                    className="flex items-center justify-center gap-1 w-full py-1 rounded-lg text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 transition-colors text-xs mb-1"
                  >
                    <Volume2 size={12} />
                    听发音
                  </button>
                  <button
                    onClick={() => toggleCard(letter.id)}
                    className="w-full flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-1"
                  >
                    {isExpanded ? t('phonetics.prog_collapse', lang) : t('phonetics.prog_detail', lang)}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-[var(--border-color)] space-y-2 animate-fade-in">
                      <div className="text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)]">{t('phonetics.prog_label_sound', lang)}</span>{enText(letter.sound, letter.soundEn)}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)]">{t('phonetics.prog_label_mnemonic', lang)}</span>{enText(letter.mnemonic, letter.mnemonicEn)}
                      </div>
                      {letter.strokeOrder && letter.strokeOrder.length > 0 && (
                        <div className="text-xs">
                          <span className="text-[var(--text-muted)]">{t('phonetics.prog_label_stroke', lang)}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(lang === 'en' ? letter.strokeOrderEn ?? letter.strokeOrder : letter.strokeOrder).map((s, i) => (
                              <span key={i} className="bg-[var(--bg-input)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] text-[11px]">
                                {i + 1}. {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confused pairs section */}
          {activeStep.confusedPairs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span>⚠️</span> {t('phonetics.prog_confused_pairs_title', lang)}
              </h3>
              <div className="space-y-4">
                {activeStep.confusedPairs.map((pair) => (
                  <div key={pair.id}>
                    <div className="text-xs text-[var(--text-muted)] mb-2 px-1">{pair.tip}</div>
                    <div className="flex flex-wrap gap-2">
                      {pair.letters.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => { unlockAudioContext(); speakWord(getSpeakText(l), 0.7); }}
                          className="flex flex-col items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--peach-soft)]/30 hover:border-[var(--pink-primary)]/50 hover:bg-[var(--bg-accent)] active:scale-95 rounded-2xl px-5 py-4 transition-all min-w-[80px] shadow-sm"
                          title="点击听发音"
                        >
                          <span className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>
                            {l.letter}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">{l.name}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">[{l.romanization}]</span>
                          <Volume2 size={12} className="text-[var(--pink-primary)]" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors transition-opacity transition-shadow font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
            >
              {t('phonetics.prog_cta_letter_quiz', lang)}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={startListen}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--peach-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors transition-opacity transition-shadow font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
            >
              <Ear size={18} />
              {t('phonetics.prog_cta_listen_quiz', lang)}
            </button>
          </div>
        </>
      )}

      {/* Quiz / Listen mode (shared) */}
      {(mode === 'quiz' || mode === 'listen') && !quizComplete && questions.length > 0 && (
        <div className="py-2 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setMode('browse'); setQuizAnswer(null); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← {t('phonetics.quiz_back_to_browse', lang)}
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {mode === 'listen' ? t('phonetics.prog_mode_listen', lang) : t('phonetics.prog_mode_quiz', lang)} {quizIdx + 1}/{questions.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{t('phonetics.quiz_correct_label', lang)} {quizCorrect}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${((quizIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
            {/* Listen mode: show speaker button + prompt */}
            {mode === 'listen' && (
              <div className="text-center space-y-3">
                <p className="text-sm text-[var(--text-secondary)]">{t('phonetics.prog_listen_prompt', lang)}</p>
                <button
                  onClick={replayAudio}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 rounded-3xl hover:bg-[var(--pink-primary)]/20 transition-colors"
                >
                  <Volume2 size={28} className="text-[var(--pink-primary)]" />
                  <span className="text-sm font-bold text-[var(--pink-primary)]">{t('phonetics.prog_tap_play_audio', lang)}</span>
                </button>
              </div>
            )}

            {/* Quiz mode: show text prompt */}
            {mode === 'quiz' && (
              <h2 className="text-lg font-bold text-[var(--text-primary)] text-center">
                {quizQuestions[quizIdx].prompt}
              </h2>
            )}

            <div className={`${mode === 'listen' ? 'flex flex-wrap gap-3 justify-center' : 'space-y-3'}`}>
              {questions[quizIdx].options.map((opt, i) => {
                const isCorrect = opt === questions[quizIdx].correctAnswer;
                const isSelected = opt === quizAnswer;
                let btnClass = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
                if (quizAnswer !== null) {
                  if (isCorrect) {
                    btnClass = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                  } else if (isSelected && !isCorrect) {
                    btnClass = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                  } else {
                    btnClass = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                  }
                }
                const isKoreanChar = mode === 'listen' || (mode === 'quiz' && quizQuestions[quizIdx].prompt.includes('发音'));
                if (mode === 'listen') {
                  return (
                    <button
                      key={i}
                      onClick={() => quizAnswer === null && handleQuizAnswer(opt)}
                      disabled={quizAnswer !== null}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl px-5 py-4 transition-all active:scale-95 min-w-[80px] ${btnClass} font-bold`}
                      style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                    >
                      <span className="text-3xl">{opt}</span>
                      {quizAnswer !== null && isCorrect && <Check size={16} className="text-[var(--mint-soft)]" />}
                      {quizAnswer !== null && isSelected && !isCorrect && <X size={16} className="text-[var(--color-danger)]" />}
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => quizAnswer === null && handleQuizAnswer(opt)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all ${btnClass} font-bold`}
                    style={{ fontFamily: isKoreanChar ? "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" : undefined }}
                  >
                    <span className={isKoreanChar ? 'text-2xl' : ''}>{opt}</span>
                    {quizAnswer !== null && isCorrect && (
                      <Check size={16} className="text-[var(--mint-soft)] inline ml-2" />
                    )}
                    {quizAnswer !== null && isSelected && !isCorrect && (
                      <X size={16} className="text-[var(--color-danger)] inline ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
                {mode === 'listen' && (
                  <button
                    onClick={replayAudio}
                    className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={14} />
                    {t('phonetics.quiz_relisten_button', lang)}
                  </button>
                )}
                <button
                  onClick={handleQuizNext}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
                >
                  {quizIdx + 1 >= questions.length ? t('phonetics.quiz_view_results_button', lang) : t('phonetics.quiz_next_button', lang)}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz / Listen complete */}
      {(mode === 'quiz' || mode === 'listen') && quizComplete && (
        <div className="py-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30">
            {quizCorrect >= Math.ceil(questions.length * 0.6) ? (
              <Trophy size={36} className="text-[var(--peach-soft)]" />
            ) : (
              <RotateCcw size={36} className="text-[var(--text-muted)]" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {quizCorrect >= Math.ceil(questions.length * 0.6)
                ? t('phonetics.prog_step_complete', lang, { title: enText(activeStep.title, activeStep.titleEn) })
                : t('phonetics.prog_try_again', lang)}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {t('phonetics.prog_result_score', lang, { correct: quizCorrect, total: questions.length, pct: Math.round((quizCorrect / questions.length) * 100) })}
            </p>
          </div>

          {quizCorrect >= Math.ceil(questions.length * 0.6) && (
            <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles size={16} className="text-[var(--mint-soft)]" />
                <span className="text-sm text-[var(--text-primary)]">+15 XP</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={mode === 'listen' ? startListen : startQuiz}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              <RotateCcw size={16} />
              {t('phonetics.prog_retry_quiz', lang)}
            </button>
            {activeStepIdx < progressiveSteps.length - 1 && quizCorrect >= Math.ceil(questions.length * 0.6) && (
              <button
                onClick={() => goToStep(activeStepIdx + 1)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
              >
                {t('phonetics.prog_next_step', lang, { title: enText(progressiveSteps[activeStepIdx + 1].title, progressiveSteps[activeStepIdx + 1].titleEn) })}
                <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => setMode('browse')}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              {t('phonetics.quiz_back_to_browse', lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
