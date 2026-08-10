'use client';

import { useEffect, useState } from 'react';
import { Edit3, Trophy, Target, Mic, FileText, ArrowRight } from 'lucide-react';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import { generateAbilities } from '@/lib/lesson/buildLessonCards';
import { COURSE_GRAMMAR_MAP } from '@/lib/lesson/recordLesson';
import { sentencePatterns } from '@/data/grammar-new';
import { playComplete } from '@/lib/soundManager';
import Link from 'next/link';

interface Props {
  course: DailyCourse;
  dayNum: number;
  outputText: string;
  setOutputText: (v: string) => void;
  result: { leveledUp: boolean; newLevel: number; streak: number; xpAwarded: number } | null;
  onComplete: () => void;
  goPrevDay: () => void;
  goNextDay: () => void;
  source?: 'daily' | 'course';
}

function StatCard({ value, label, color, delay, icon }: { value: string; label: string; color: string; delay: number; icon: React.ReactNode }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`rounded-2xl px-5 py-3 text-center transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
      }`}
      style={{ backgroundColor: `${color}10`, transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
      <p className="text-[10px] text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

export function CompletionView({
  course, dayNum, outputText, setOutputText,
  result, onComplete, goPrevDay, goNextDay, source,
}: Props) {
  const abilities = generateAbilities(course);
  const [showAbilities, setShowAbilities] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    onComplete();
    playComplete();
    // Staggered reveal
    const t1 = setTimeout(() => setShowAbilities(true), 400);
    const t2 = setTimeout(() => setShowOutput(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-5">
      {/* Header */}
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <div className="text-6xl">{course.emoji}</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-2">Day {course.day} 完成!</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{course.title} · {course.titleKo}</p>
      </div>

      {/* XP / Streak / Level */}
      {result && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <StatCard
            value={`+${result.xpAwarded}`}
            label="经验值"
            color="var(--pink-primary)"
            delay={100}
            icon={<Trophy size={18} color="var(--pink-primary)" />}
          />
          <StatCard
            value={`${result.streak}天`}
            label="连续学习"
            color="var(--purple-soft)"
            delay={250}
            icon={<Target size={18} color="var(--purple-soft)" />}
          />
          {result.leveledUp && (
            <StatCard
              value={`Lv.${result.newLevel}`}
              label="升级!"
              color="var(--mint-soft)"
              delay={400}
              icon={<span className="text-lg">🎉</span>}
            />
          )}
        </div>
      )}

      {/* Abilities summary */}
      <div
        className={`bg-[var(--bg-input)] rounded-2xl p-5 border border-[var(--border-color)] text-left transition-all duration-500 ${
          showAbilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-sm font-bold text-[var(--text-primary)] mb-3">今日收获</p>
        <ul className="space-y-2">
          {abilities.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--mint-soft)] mt-0.5">✓</span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Output exercise */}
      <div
        className={`bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 rounded-2xl p-5 border border-[var(--border-color)] text-left transition-all duration-500 ${
          showOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
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
            onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)}
            placeholder="写下你的韩语句子..."
            rows={3}
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)]"
          />
        </div>
        {outputText && (
          <div className="mt-3 p-3 bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl">
            <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句</p>
            <p className="text-sm text-[var(--text-primary)]">{course.output.exampleAnswer}</p>
          </div>
        )}
      </div>

      {/* Pronunciation practice */}
      <div className="bg-gradient-to-r from-[var(--mint-soft)]/5 to-[var(--pink-primary)]/5 rounded-2xl p-5 border border-[var(--border-color)] text-left">
        <div className="flex items-center gap-2 mb-2">
          <Mic size={16} className="text-[var(--mint-soft)]" />
          <span className="text-sm font-bold text-[var(--text-primary)]">发音练习</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-3">
          练一练今天学的 {course.words.length} 个单词的发音，听标准音、录音、对比
        </p>
        <Link
          href={`/pronunciation?day=${course.day}`}
          className="block w-full py-2.5 rounded-xl bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 text-sm font-medium text-[var(--mint-soft)] text-center hover:bg-[var(--mint-soft)]/20 transition-colors"
        >
          练发音
        </Link>
      </div>

      {/* Grammar practice */}
      {(() => {
        const grammarId = COURSE_GRAMMAR_MAP[course.day];
        const pattern = grammarId ? sentencePatterns.find((g) => g.id === grammarId) : null;
        return (
          <div className="bg-gradient-to-r from-[var(--purple-soft)]/5 to-[var(--pink-primary)]/5 rounded-2xl p-5 border border-[var(--border-color)] text-left">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-[var(--purple-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">句型练习</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-1">
              今天学的句型：{course.grammar.name}
            </p>
            {pattern && (
              <p className="text-xs text-[var(--purple-soft)] mb-3">
                对应句型卡：{pattern.displayTitle} — {pattern.shortExplanation}
              </p>
            )}
            <Link
              href={grammarId ? `/grammar?pattern=${grammarId}` : '/grammar'}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[var(--purple-soft)]/10 border border-[var(--purple-soft)]/20 text-sm font-medium text-[var(--purple-soft)] text-center hover:bg-[var(--purple-soft)]/20 transition-colors"
            >
              {pattern ? `练「${pattern.displayTitle}」` : '练句型'}
              <ArrowRight size={14} />
            </Link>
          </div>
        );
      })()}

      {/* Navigation */}
      <div className="space-y-3">
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
        {dayNum >= 30 && (
          <p className="text-xs text-center text-[var(--text-muted)]">已完成全部 30 天课程，继续用词汇和复习功能巩固吧</p>
        )}
        <Link
          href={source === 'daily' ? '/daily' : '/course'}
          className="block w-full py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] font-medium text-sm text-center hover:bg-[var(--bg-accent)] transition-colors"
        >
          {source === 'daily' ? '返回今日学习' : '返回课程地图'}
        </Link>
      </div>
    </div>
  );
}
