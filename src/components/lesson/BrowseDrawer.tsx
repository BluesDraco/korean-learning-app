'use client';

import { useState } from 'react';
import { X, Volume2, Keyboard } from 'lucide-react';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import { speak } from '@/lib/tts';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useIsMobile } from '@/lib/useIsMobile';

interface Props {
  course: DailyCourse;
  dayNum: number;
  onClose: () => void;
  goNextDay: () => void;
  goPrevDay: () => void;
}

export function BrowseDrawer({ course, dayNum, onClose, goNextDay, goPrevDay }: Props) {
  const [showWord, setShowWord] = useState<Record<number, boolean>>({});
  const [showSentence, setShowSentence] = useState<Record<number, boolean>>({});
  const [showDict, setShowDict] = useState<Record<number, boolean>>({});
  const [outputText, setOutputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-primary)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <button onClick={onClose} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <X size={20} />
        </button>
        <span className="text-sm font-bold text-[var(--text-primary)]">Day {course.day} · {course.title}</span>
        <span className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-4 mx-auto max-w-2xl px-4 space-y-4">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{course.emoji}</div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{course.title} <span className="text-sm text-[var(--text-muted)]">{course.titleKo}</span></h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">{course.description}</p>
          </div>

          {/* Words */}
          <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">📚 单词 ({course.words.length}个)</h3>
            <div className="grid grid-cols-2 gap-2">
              {course.words.map((w, i) => (
                <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3 cursor-pointer hover:bg-[var(--pink-primary)]/6 transition-colors"
                  onClick={() => { speak(w.korean, 0.75); setShowWord((p) => ({ ...p, [i]: !p[i] })); }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span>{w.emoji}</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{w.korean}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">{w.pronunciation}</div>
                  {showWord[i] && (
                    <div className="mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">
                      <span className="text-xs text-[var(--text-secondary)]">{w.chinese}</span>
                      <span className="text-[10px] text-[var(--text-placeholder)] ml-1">({w.partOfSpeech})</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Grammar */}
          <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">📖 语法 · {course.grammar.name}</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">{course.grammar.pattern}</span>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{course.grammar.explanation}</p>
            <div className="bg-[var(--bg-input)]/60 rounded-xl p-3 mt-3">
              <p className="text-sm font-bold text-[var(--text-primary)]">{course.grammar.example}</p>
              <p className="text-xs text-[var(--text-muted)]">{course.grammar.exampleZh}</p>
            </div>
          </section>

          {/* Sentences */}
          <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">💬 实用句 ({course.sentences.length}句)</h3>
            <div className="space-y-2">
              {course.sentences.map((s, i) => (
                <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3 cursor-pointer hover:bg-[var(--bg-card-hover)]"
                  onClick={() => { speak(s.korean, 0.75); setShowSentence((p) => ({ ...p, [i]: !p[i] })); }}>
                  <span className="text-[10px] text-[var(--text-placeholder)]">{s.scene}</span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{s.korean}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{s.pronunciation}</p>
                  {showSentence[i] && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">{s.chinese}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Dictations */}
          <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
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
                  <button onClick={() => setShowDict((p) => ({ ...p, [i]: !p[i] }))}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)]">
                    {showDict[i] ? d.korean : '点击显示答案'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Output */}
          <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
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
          </section>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-[var(--border-color)]">
        <button onClick={goPrevDay} disabled={dayNum <= 1} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-medium disabled:opacity-30">上一课</button>
        <button onClick={goNextDay} disabled={dayNum >= 30} className="flex-1 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium disabled:opacity-30">下一课</button>
      </div>
    </div>
  );
}
