'use client';

import { useEffect } from 'react';
import { Edit3, Keyboard } from 'lucide-react';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';

interface Props {
  course: DailyCourse;
  dayNum: number;
  outputText: string;
  setOutputText: (v: string) => void;
  showKeyboard: boolean;
  setShowKeyboard: (v: boolean) => void;
  isMobile: boolean;
  result: { leveledUp: boolean; newLevel: number; streak: number; xpAwarded: number } | null;
  onComplete: () => void;
  goPrevDay: () => void;
  goNextDay: () => void;
}

export function CompletionView({
  course, dayNum, outputText, setOutputText, showKeyboard, setShowKeyboard, isMobile,
  result, onComplete, goPrevDay, goNextDay,
}: Props) {
  useEffect(() => { onComplete(); }, []);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-5">
      <div className="text-6xl">{course.emoji}</div>
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Day {course.day} 完成!</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{course.title} · {course.titleKo}</p>
      </div>

      {result && (
        <div className="flex items-center justify-center gap-4">
          <div className="bg-[var(--pink-primary)]/10 rounded-2xl px-5 py-3">
            <p className="text-2xl font-extrabold text-[var(--pink-primary)]">+{result.xpAwarded}</p>
            <p className="text-[10px] text-[var(--text-muted)]">经验值</p>
          </div>
          <div className="bg-[var(--purple-soft)]/10 rounded-2xl px-5 py-3">
            <p className="text-2xl font-extrabold text-[var(--purple-soft)]">{result.streak}天</p>
            <p className="text-[10px] text-[var(--text-muted)]">连续学习</p>
          </div>
          {result.leveledUp && (
            <div className="bg-[var(--mint-soft)]/10 rounded-2xl px-5 py-3">
              <p className="text-2xl font-extrabold text-[var(--mint-soft)]">Lv.{result.newLevel}</p>
              <p className="text-[10px] text-[var(--text-muted)]">升级!</p>
            </div>
          )}
        </div>
      )}

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
        <KoreanKeyboard value={outputText} onChange={setOutputText} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
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
  );
}
