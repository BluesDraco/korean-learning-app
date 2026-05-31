'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Volume2, CheckCircle,
  Lightbulb, Edit3, Keyboard,
} from 'lucide-react';
import { thirtyDayCourse, type DailyCourse } from '@/data/thirtyDayCourse';
import { speak, cancelSpeech } from '@/lib/tts';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useIsMobile } from '@/lib/useIsMobile';

interface Card {
  type: 'word' | 'grammar' | 'sentence' | 'dictation';
  idx: number;
}

export default function DailyCoursePage() {
  const { day } = useParams<{ day: string }>();
  const router = useRouter();
  const dayNum = parseInt(day, 10);
  const course = useMemo(() => thirtyDayCourse[dayNum - 1], [dayNum]);

  const [currentCard, setCurrentCard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [showBrowse, setShowBrowse] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isMobile = useIsMobile();

  if (!course) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[var(--text-muted)]">未找到该课程</p>
      </div>
    );
  }

  // Build card deck
  const cards = useMemo(() => {
    const deck: Card[] = [];
    course.words.forEach((_, i) => deck.push({ type: 'word', idx: i }));
    deck.push({ type: 'grammar', idx: 0 });
    course.sentences.forEach((_, i) => deck.push({ type: 'sentence', idx: i }));
    course.dictations.forEach((_, i) => deck.push({ type: 'dictation', idx: i }));
    return deck;
  }, [course]);

  const totalCards = cards.length;
  const card = cards[currentCard];

  const goNext = () => {
    if (currentCard + 1 >= totalCards) {
      setCompleted(true);
    } else {
      setCurrentCard((prev) => prev + 1);
      setRevealed(false);
      setPlaying(false);
      cancelSpeech();
    }
  };

  const goPrev = () => {
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
      setRevealed(false);
      setPlaying(false);
      cancelSpeech();
    }
  };

  const reveal = () => {
    if (!revealed) setRevealed(true);
  };

  // Auto-speak for word/sentence cards
  useEffect(() => {
    if (card && !revealed && !playing) {
      let text = '';
      if (card.type === 'word') text = course.words[card.idx].korean;
      else if (card.type === 'sentence') text = course.sentences[card.idx].korean;
      if (text) {
        const t = setTimeout(() => {
          setPlaying(true);
          speak(text, 0.75).then(() => setPlaying(false));
        }, 400);
        return () => clearTimeout(t);
      }
    }
  }, [currentCard, card?.type, card?.idx]);

  const speakCard = async () => {
    if (playing) return;
    let text = '';
    if (card.type === 'word') text = course.words[card.idx].korean;
    else if (card.type === 'sentence') text = course.sentences[card.idx].korean;
    else if (card.type === 'grammar') text = course.grammar.example;
    else if (card.type === 'dictation') text = course.dictations[card.idx].korean;
    if (!text) return;
    setPlaying(true);
    await speak(text, 0.75);
    setPlaying(false);
  };

  const goNextDay = () => {
    if (dayNum < 30) router.push(`/course/${dayNum + 1}`);
  };

  const goPrevDay = () => {
    if (dayNum > 1) router.push(`/course/${dayNum - 1}`);
  };

  // ── Browse Mode (original list view) ──
  if (showBrowse) {
    return <BrowseMode course={course} dayNum={dayNum} onBack={() => setShowBrowse(false)} goNextDay={goNextDay} goPrevDay={goPrevDay} />;
  }

  // ── Completed View ──
  if (completed) {
    return (
      <div className="py-4 mx-auto max-w-lg space-y-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-5">
          <div className="text-6xl">{course.emoji}</div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Day {course.day} 完成!</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">{course.title} · {course.titleKo}</p>
          </div>

          {/* Output task */}
          <div className="bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 rounded-2xl p-5 border border-[var(--border-color)] text-left">
            <div className="flex items-center gap-2 mb-3">
              <Edit3 size={16} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">输出练习</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] mb-2">{course.output.prompt}</p>
            <p className="text-[11px] text-[var(--text-muted)] mb-3">提示：{course.output.hint}</p>
            <div className="relative">
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                onFocus={() => isMobile && setShowKeyboard(true)}
                placeholder="写下你的韩语句子..."
                rows={3}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)]"
              />
              {isMobile && (
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-colors ${showKeyboard ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)]'}`}
                >
                  <Keyboard size={16} />
                </button>
              )}
            </div>
            <KoreanKeyboard
              value={outputText}
              onChange={setOutputText}
              visible={showKeyboard}
              onClose={() => setShowKeyboard(false)}
            />
            {outputText && (
              <div className="mt-3 p-3 bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl">
                <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句</p>
                <p className="text-sm text-[var(--text-primary)]">{course.output.exampleAnswer}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={goPrevDay}
              disabled={dayNum <= 1}
              className="flex-1 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] font-medium text-sm disabled:opacity-30"
            >
              上一课
            </button>
            <button
              onClick={goNextDay}
              disabled={dayNum >= 30}
              className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm disabled:opacity-30"
            >
              下一课
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Flashcard View ──
  const cardTypeLabel = () => {
    switch (card.type) {
      case 'word': return `单词 · ${currentCard + 1}/${totalCards}`;
      case 'grammar': return `语法 · ${currentCard + 1}/${totalCards}`;
      case 'sentence': return `实用句 · ${currentCard + 1}/${totalCards}`;
      case 'dictation': return `听写 · ${currentCard + 1}/${totalCards}`;
    }
  };

  return (
    <div className="py-4 mx-auto max-w-lg space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link href="/course" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="text-center">
          <span className="text-xs font-bold text-[var(--text-primary)]">Day {course.day}</span>
          <span className="text-[11px] text-[var(--text-muted)] ml-1">{course.title}</span>
        </div>
        <button
          onClick={() => setShowBrowse(true)}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
        >
          浏览
        </button>
      </div>

      {/* Progress dots */}
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

      {/* Card label */}
      <p className="text-center text-[11px] text-[var(--text-muted)] font-medium">{cardTypeLabel()}</p>

      {/* Flashcard */}
      <div
        onClick={reveal}
        className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[320px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--pink-pale)]/50 transition-all select-none"
      >
        {/* Speaker button */}
        <button
          onClick={(e) => { e.stopPropagation(); speakCard(); }}
          disabled={playing}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
            playing
              ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          <Volume2 size={playing ? 18 : 20} className={playing ? 'animate-pulse' : ''} />
        </button>

        {/* WORD CARD */}
        {card.type === 'word' && (() => {
          const w = course.words[card.idx];
          return (
            <>
              <div className="text-5xl mb-4">{w.emoji}</div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{w.korean}</h2>
              {!revealed ? (
                <p className="text-sm text-[var(--text-muted)]">点击显示含义</p>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-lg font-medium text-[var(--pink-primary)]">{w.chinese}</p>
                  <p className="text-sm text-[var(--text-muted)] font-mono">{w.pronunciation}</p>
                  <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)]">{w.partOfSpeech}</span>
                </div>
              )}
            </>
          );
        })()}

        {/* GRAMMAR CARD */}
        {card.type === 'grammar' && (() => {
          const g = course.grammar;
          return (
            <>
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{g.name}</h2>
              <p className="text-sm text-[var(--text-muted)] font-mono mb-1">{g.pattern}</p>
              <p className="text-base font-medium text-[var(--text-primary)] mt-3 mb-3">{g.example}</p>
              {!revealed ? (
                <p className="text-sm text-[var(--text-muted)]">点击显示解释</p>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{g.explanation}</p>
                  <p className="text-sm text-[var(--text-muted)]">{g.exampleZh}</p>
                </div>
              )}
            </>
          );
        })()}

        {/* SENTENCE CARD */}
        {card.type === 'sentence' && (() => {
          const s = course.sentences[card.idx];
          return (
            <>
              <span className="text-[11px] text-[var(--text-muted)] bg-[var(--bg-input)] px-2 py-0.5 rounded-full mb-4">{s.scene}</span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 leading-relaxed">{s.korean}</h2>
              {!revealed ? (
                <p className="text-sm text-[var(--text-muted)]">点击显示翻译</p>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-lg font-medium text-[var(--pink-primary)]">{s.chinese}</p>
                  <p className="text-sm text-[var(--text-muted)] font-mono">{s.pronunciation}</p>
                </div>
              )}
            </>
          );
        })()}

        {/* DICTATION CARD */}
        {card.type === 'dictation' && (() => {
          const d = course.dictations[card.idx];
          return (
            <>
              <div className="text-5xl mb-4">🎧</div>
              <p className="text-sm text-[var(--text-muted)] mb-2">听发音，写出韩文</p>
              <button
                onClick={(e) => { e.stopPropagation(); speakCard(); }}
                className={`px-5 py-3 rounded-2xl text-sm font-medium mb-4 transition-all ${
                  playing
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                    : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
                }`}
              >
                {playing ? '▶ 播放中...' : '🔊 点击播放'}
              </button>
              <p className="text-sm text-[var(--text-secondary)] mb-2">提示：{d.chinese}</p>
              {!revealed ? (
                <p className="text-xs text-[var(--text-muted)]">点击显示答案</p>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{d.korean}</p>
                  <p className="text-sm text-[var(--text-muted)] font-mono">{d.pronunciation}</p>
                </div>
              )}
            </>
          );
        })()}
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

        {!revealed ? (
          <button
            onClick={reveal}
            className="flex items-center gap-1 text-sm px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 transition-colors"
          >
            显示答案
          </button>
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

// ── Browse Mode (fallback list view) ──────────────────────────

function BrowseMode({
  course, dayNum, onBack, goNextDay, goPrevDay,
}: {
  course: DailyCourse; dayNum: number; onBack: () => void;
  goNextDay: () => void; goPrevDay: () => void;
}) {
  const [showWordMeaning, setShowWordMeaning] = useState<Record<number, boolean>>({});
  const [showSentenceTranslation, setShowSentenceTranslation] = useState<Record<number, boolean>>({});
  const [showDictationAnswer, setShowDictationAnswer] = useState<Record<number, boolean>>({});
  const [outputText, setOutputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="py-4 mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm font-bold text-[var(--text-primary)]">Day {course.day} · {course.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={goPrevDay} disabled={dayNum <= 1} className="text-xs px-2 py-1 text-[var(--text-muted)] disabled:opacity-30">上一课</button>
          <button onClick={goNextDay} disabled={dayNum >= 30} className="text-xs px-2 py-1 text-[var(--text-muted)] disabled:opacity-30">下一课</button>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{course.emoji}</div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">{course.title} <span className="text-sm text-[var(--text-muted)]">{course.titleKo}</span></h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{course.description}</p>
      </div>

      {/* Words */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">📚 单词 ({course.words.length}个)</h3>
        <div className="grid grid-cols-2 gap-2">
          {course.words.map((w, i) => (
            <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3 cursor-pointer hover:bg-[var(--pink-primary)]/6 transition-colors"
              onClick={() => { speak(w.korean, 0.75); setShowWordMeaning((p) => ({ ...p, [i]: !p[i] })); }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span>{w.emoji}</span>
                <span className="text-sm font-bold text-[var(--text-primary)]">{w.korean}</span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">{w.pronunciation}</div>
              {showWordMeaning[i] && (
                <div className="mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">
                  <span className="text-xs text-[var(--text-secondary)]">{w.chinese}</span>
                  <span className="text-[10px] text-[var(--text-placeholder)] ml-1">({w.partOfSpeech})</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grammar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">📖 语法 · {course.grammar.name}</h3>
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">{course.grammar.pattern}</span>
        <p className="text-sm text-[var(--text-secondary)] mt-2">{course.grammar.explanation}</p>
        <div className="bg-[var(--bg-input)]/60 rounded-xl p-3 mt-3">
          <p className="text-sm font-bold text-[var(--text-primary)]">{course.grammar.example}</p>
          <p className="text-xs text-[var(--text-muted)]">{course.grammar.exampleZh}</p>
        </div>
      </div>

      {/* Sentences */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">💬 实用句 ({course.sentences.length}句)</h3>
        <div className="space-y-2">
          {course.sentences.map((s, i) => (
            <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3 cursor-pointer hover:bg-[var(--bg-card-hover)]"
              onClick={() => { speak(s.korean, 0.75); setShowSentenceTranslation((p) => ({ ...p, [i]: !p[i] })); }}>
              <span className="text-[10px] text-[var(--text-placeholder)]">{s.scene}</span>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{s.korean}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{s.pronunciation}</p>
              {showSentenceTranslation[i] && (
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">{s.chinese}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dictations */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">🎧 听写 ({course.dictations.length}个)</h3>
        <div className="space-y-2">
          {course.dictations.map((d, i) => (
            <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[var(--text-muted)]">#{i + 1} · {d.chinese}</span>
                <button onClick={() => speak(d.korean, 0.75)} className="p-1 hover:bg-[var(--pink-primary)]/10 rounded-lg text-[var(--text-muted)]">
                  <Volume2 size={14} />
                </button>
              </div>
              <button onClick={() => setShowDictationAnswer((p) => ({ ...p, [i]: !p[i] }))}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)]">
                {showDictationAnswer[i] ? d.korean : '点击显示答案'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">✍️ 输出练习</h3>
        <p className="text-sm text-[var(--text-primary)] mb-2">{course.output.prompt}</p>
        <p className="text-[11px] text-[var(--text-muted)] mb-3">提示：{course.output.hint}</p>
        <div className="relative">
          <textarea value={outputText} onChange={(e) => setOutputText(e.target.value)}
            onFocus={() => isMobile && setShowKeyboard(true)}
            placeholder="写下你的韩语句子..."
            rows={3}
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)]" />
          {isMobile && (
            <button onClick={() => setShowKeyboard(!showKeyboard)}
              className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-colors ${showKeyboard ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)]'}`}>
              <Keyboard size={16} />
            </button>
          )}
        </div>
        <KoreanKeyboard value={outputText} onChange={setOutputText} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
        {outputText && (
          <div className="mt-3 p-3 bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl">
            <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句</p>
            <p className="text-sm text-[var(--text-primary)]">{course.output.exampleAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
