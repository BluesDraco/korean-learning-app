'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ArrowLeft, Clock, Volume2, Check, X, Trophy,
  Sparkles, RotateCcw, ChevronRight, Headphones, BookOpen,
} from 'lucide-react';
import { topikQuestions, topikSections, type TopikQuestion } from '@/data/topik-questions';
import { speak, cancelSpeech } from '@/lib/tts';

type Phase = 'selecting' | 'exam' | 'result';

function speakTopik(text: string): Promise<void> {
  return speak(text, 0.85);
}

export default function TopikPage() {
  const [phase, setPhase] = useState<Phase>('selecting');
  const [section, setSection] = useState('beginner-listening');
  const [questions, setQuestions] = useState<TopikQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sectionInfo = topikSections.find((s) => s.id === section) || topikSections[0];

  // Timer
  useEffect(() => {
    if (phase !== 'exam') return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const finishExam = useCallback(() => {
    setPhase('result');
    if (timerRef.current) clearInterval(timerRef.current);
    cancelSpeech();
  }, []);

  // Auto-submit on time up
  useEffect(() => {
    if (phase === 'exam' && timeLeft === 0 && questions.length > 0) {
      finishExam();
    }
  }, [timeLeft, finishExam, questions.length, phase]);

  const startExam = useCallback((secId: string) => {
    const sec = topikSections.find((s) => s.id === secId);
    if (!sec) return;
    const qs = topikQuestions.filter((q) => q.section === sec.section && q.level === sec.level);
    setSection(secId);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers(new Map());
    setShowAnswer(false);
    setTimeLeft(sec.timeMinutes * 60);
    setPhase('exam');
  }, []);

  const selectAnswer = (optionIdx: number) => {
    if (showAnswer) return;
    const q = questions[currentIdx];
    const newAnswers = new Map(answers);
    newAnswers.set(q.id, optionIdx);
    setAnswers(newAnswers);
    setShowAnswer(true);
  };

  const goNext = () => {
    if (currentIdx + 1 >= questions.length) {
      finishExam();
    } else {
      setCurrentIdx((prev) => prev + 1);
      setShowAnswer(false);
      setPlaying(false);
      cancelSpeech();
    }
  };

  const handlePlayAudio = useCallback(async () => {
    const q = questions[currentIdx];
    if (!q.audioText || playing) return;
    setPlaying(true);
    await speakTopik(q.audioText);
    setPlaying(false);
  }, [questions, currentIdx, playing]);

  // Auto-play audio when moving to a new listening question
  useEffect(() => {
    if (phase === 'exam' && sectionInfo.section === 'listening' && questions.length > 0) {
      const q = questions[currentIdx];
      if (q.audioText && !showAnswer && !playing) {
        const t = setTimeout(() => handlePlayAudio(), 300);
        return () => clearTimeout(t);
      }
    }
  }, [currentIdx, phase, section, questions, showAnswer, playing, handlePlayAudio, sectionInfo.section]);

  const correctCount = Array.from(answers.entries()).reduce((acc, [qid, sel]) => {
    const q = questions.find((x) => x.id === qid);
    return q && sel === q.correctIdx ? acc + 1 : acc;
  }, 0);

  const totalAnswered = answers.size;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = score >= 60;

  const levelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return { text: '初级', emoji: '🌱', color: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' };
      case 'intermediate': return { text: '中级', emoji: '🌿', color: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]' };
      case 'advanced': return { text: '高级', emoji: '🌳', color: 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]' };
      default: return { text: '', emoji: '', color: '' };
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // ─── Select Phase ──────────────────────────────────────────
  if (phase === 'selecting') {
    const levels = ['beginner', 'intermediate', 'advanced'] as const;
    return (
      <div className="py-4 space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">📝</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">TOPIK 模拟练习</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto">
            TOPIK I（初级）~ TOPIK II（中高级）300道模拟题，TOPIK风格题型与计时环境
          </p>
        </div>

        {levels.map((level) => {
          const levelSections = topikSections.filter((s) => s.level === level);
          if (levelSections.length === 0) return null;
          const l = levelLabel(level);
          return (
            <div key={level}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${l.color}`}>{l.emoji} {l.text}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {levelSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => startExam(sec.id)}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 text-left hover:border-[var(--pink-primary)]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--pink-primary)]/10 flex items-center justify-center">
                        {sec.section === 'listening' ? (
                          <Headphones size={20} className="text-[var(--pink-primary)]" />
                        ) : (
                          <BookOpen size={20} className="text-[var(--purple-soft)]" />
                        )}
                      </div>
                      <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform mt-1" />
                    </div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)] mb-0.5">{sec.titleKo} {sec.title}</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] mb-2">{sec.description}</p>
                    <div className="flex items-center gap-3 text-[13px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><Clock size={12} /> {sec.timeMinutes}分钟</span>
                      <span>{sec.questionCount}题</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--peach-soft)]" />
            考试说明
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--mint-soft)] mt-0.5">•</span>
              涵盖初级（1-2급）、中级（3-4급）、高级（5-6급）三个级别
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--mint-soft)] mt-0.5">•</span>
              听力部分会自动播放音频，每题只播放一次
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--mint-soft)] mt-0.5">•</span>
              每部分限时完成，选择答案后显示解析和核心词汇
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--mint-soft)] mt-0.5">•</span>
              60% 以上正确率为通过，完成后可查看详细成绩
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // ─── Exam Phase ────────────────────────────────────────────
  const currentQ = questions[currentIdx];

  return (
    <div className="py-4 space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { finishExam(); }}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="font-bold text-[var(--text-primary)] text-sm">
              {sectionInfo.titleKo} {sectionInfo.title}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${timeLeft <= 60 ? 'text-[var(--color-danger)] animate-pulse' : 'text-[var(--text-primary)]'}`}>
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1.5">
        <div className="flex-1 bg-[var(--bg-input)] rounded-full h-1.5">
          <div
            className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[var(--text-muted)] shrink-0">
          {currentIdx + 1}/{questions.length}
        </span>
        {phase === 'result' && (
          <span className="text-xs text-[var(--mint-soft)] shrink-0 ml-1">
            完成
          </span>
        )}
      </div>

      {/* Question card */}
      {phase === 'exam' && currentQ && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-5">
          {/* Audio button for listening */}
          {sectionInfo.section === 'listening' && currentQ.audioText && (
            <button
              onClick={handlePlayAudio}
              disabled={playing || showAnswer}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                playing
                  ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                  : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
              } disabled:opacity-50`}
            >
              {playing ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[var(--pink-primary)] animate-pulse" />
                  正在播放...
                </>
              ) : (
                <>
                  <Volume2 size={16} />
                  播放录音
                </>
              )}
            </button>
          )}

          {/* Topic tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-bold text-[var(--pink-primary)] bg-[var(--pink-primary)]/8 px-2.5 py-0.5 rounded-full">
              #{currentQ.topic}
            </span>
            <span className="text-[13px] text-[var(--text-muted)]">{levelLabel(currentQ.level).emoji} {levelLabel(currentQ.level).text} · 第{currentQ.number}题</span>
          </div>

          {/* Prompt */}
          <div>
            <p className="text-base font-bold text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
              {currentQ.prompt}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{currentQ.promptZh}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, i) => {
              let btnClass = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--text-primary)]';
              if (showAnswer) {
                if (i === currentQ.correctIdx) {
                  btnClass = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--text-primary)]';
                } else if (i === answers.get(currentQ.id) && i !== currentQ.correctIdx) {
                  btnClass = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--text-primary)]';
                } else {
                  btnClass = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={showAnswer}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-sm transition-all ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ fontFamily: i === currentQ.correctIdx ? "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" : undefined }}>
                      {opt}
                    </span>
                  </div>
                  {showAnswer && i === currentQ.correctIdx && (
                    <Check size={18} className="text-[var(--mint-soft)] shrink-0" />
                  )}
                  {showAnswer && i === answers.get(currentQ.id) && i !== currentQ.correctIdx && (
                    <X size={18} className="text-[var(--color-danger)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation and vocabulary after answer */}
          {showAnswer && (
            <div className="bg-[var(--bg-input)] rounded-xl p-4 animate-fade-in space-y-3">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{currentQ.explanation}</p>
              {currentQ.vocabulary.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] text-[var(--text-muted)]">核心词汇:</span>
                  {currentQ.vocabulary.map((v, vi) => (
                    <span key={vi} className="text-[13px] bg-[var(--bg-card)] border border-[var(--border-color)] px-2 py-0.5 rounded-lg text-[var(--text-primary)]">
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Next button */}
          {showAnswer && (
            <button
              onClick={goNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] text-white rounded-2xl font-medium text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-95 transition-all"
            >
              {currentIdx + 1 >= questions.length ? '查看结果' : '下一题'}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* ─── Result Phase ─────────────────────────────────────── */}
      {phase === 'result' && (
        <div className="space-y-4 animate-fade-in">
          {/* Score circle */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 text-center space-y-4">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4 ${
              passed
                ? 'border-[var(--mint-soft)]/40 bg-[var(--mint-soft)]/10'
                : 'border-[var(--peach-soft)]/40 bg-[var(--peach-soft)]/10'
            }`}>
              {passed ? (
                <Trophy size={40} className="text-[var(--mint-soft)]" />
              ) : (
                <RotateCcw size={40} className="text-[var(--peach-soft)]" />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {passed ? '축하합니다! 恭喜通过！' : '继续加油！'}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {sectionInfo.titleKo} {sectionInfo.title} · 得分 {score}%
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[var(--mint-soft)]/8 rounded-xl p-3">
                <div className="text-xl font-bold text-[var(--mint-soft)]">{correctCount}</div>
                <div className="text-[13px] text-[var(--text-muted)]">正确</div>
              </div>
              <div className="bg-[var(--color-danger)]/8 rounded-xl p-3">
                <div className="text-xl font-bold text-[var(--color-danger)]">{questions.length - correctCount}</div>
                <div className="text-[13px] text-[var(--text-muted)]">错误</div>
              </div>
              <div className="bg-[var(--purple-soft)]/8 rounded-xl p-3">
                <div className="text-xl font-bold text-[var(--purple-soft)]">{totalAnswered}</div>
                <div className="text-[13px] text-[var(--text-muted)]">已答</div>
              </div>
            </div>

            {passed && (
              <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl p-3 flex items-center gap-2 justify-center">
                <Sparkles size={16} className="text-[var(--mint-soft)]" />
                <span className="text-sm text-[var(--text-primary)]">+20 XP</span>
              </div>
            )}
          </div>

          {/* Error analysis */}
          {correctCount < questions.length && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen size={16} className="text-[var(--purple-soft)]" />
                错题分析
              </h3>

              {/* Wrong question list */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {questions.filter(q => {
                  const sel = answers.get(q.id);
                  return sel !== undefined && sel !== q.correctIdx;
                }).map((q) => (
                  <div key={q.id} className="bg-[var(--bg-input)] rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[var(--pink-primary)]">#{q.topic}</span>
                      {q.difficulty && (
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                          q.difficulty === 'easy' ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' :
                          q.difficulty === 'medium' ? 'bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]' :
                          'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
                        }`}>
                          {q.difficulty === 'easy' ? '简单' : q.difficulty === 'medium' ? '中等' : '困难'}
                        </span>
                      )}
                      {q.testPoint && (
                        <span className="text-[11px] text-[var(--text-muted)]">考点: {q.testPoint}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-primary)]">{q.prompt}</p>
                    {q.errorCategory && (
                      <p className="text-xs text-[var(--text-muted)]">
                        错误类型: {q.errorCategory}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{q.explanation}</p>
                    {q.reviewGrammarId && (
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={12} className="text-[var(--purple-soft)]" />
                        <span className="text-xs text-[var(--purple-soft)]">建议复习相关语法</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => startExam(section)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              <RotateCcw size={16} />
              重新练习
            </button>
            <button
              onClick={() => setPhase('selecting')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] text-white rounded-2xl transition-colors text-sm font-medium"
            >
              返回选择
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
