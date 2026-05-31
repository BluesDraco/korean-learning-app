'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Volume2, ChevronDown,
  CheckCircle, Lightbulb, Edit3, BookOpen,
} from 'lucide-react';
import { thirtyDayCourse, type DailyCourse } from '@/data/thirtyDayCourse';
import { speak } from '@/lib/tts';

export default function DailyCoursePage() {
  const { day } = useParams<{ day: string }>();
  const router = useRouter();
  const dayNum = parseInt(day, 10);
  const course = useMemo(() => thirtyDayCourse[dayNum - 1], [dayNum]);

  const [showWordMeaning, setShowWordMeaning] = useState<Record<number, boolean>>({});
  const [showSentenceTranslation, setShowSentenceTranslation] = useState<Record<number, boolean>>({});
  const [showDictationAnswer, setShowDictationAnswer] = useState<Record<number, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    words: true,
    grammar: true,
    sentences: true,
    dictations: true,
    output: true,
  });
  const [outputText, setOutputText] = useState('');
  const [completionCelebrated, setCompletionCelebrated] = useState(false);

  if (!course) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[var(--text-muted)]">未找到该课程</p>
      </div>
    );
  }

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goNext = () => {
    if (dayNum < 30) router.push(`/course/${dayNum + 1}`);
  };

  const goPrev = () => {
    if (dayNum > 1) router.push(`/course/${dayNum - 1}`);
  };

  const allChecked = !completionCelebrated;

  return (
    <div className="py-4 mx-auto max-w-2xl space-y-4">
      {/* Top nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/course"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={16} />
          30天课程
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={dayNum <= 1}
            className="text-xs px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
          >
            上一课
          </button>
          <span className="text-xs font-medium text-[var(--text-muted)] tabular-nums">{dayNum}/30</span>
          <button
            onClick={goNext}
            disabled={dayNum >= 30}
            className="text-xs px-3 py-1.5 rounded-xl bg-[var(--pink-primary)] text-white hover:opacity-90 disabled:opacity-30 transition-colors"
          >
            下一课
          </button>
        </div>
      </div>

      {/* Day header */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 text-center">
        <div className="text-4xl mb-2">{course.emoji}</div>
        <div className="text-[11px] text-[var(--text-muted)] font-bold tracking-wider mb-1">DAY {course.day}</div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
          {course.title}
          <span className="text-sm font-normal text-[var(--text-muted)] ml-2">{course.titleKo}</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{course.description}</p>
      </div>

      {/* ── Section: Words ── */}
      <SectionCard
        title="📚 单词"
        subtitle={`${course.words.length}个新词`}
        expanded={expandedSections.words}
        onToggle={() => toggleSection('words')}
      >
        <div className="grid grid-cols-2 gap-2">
          {course.words.map((w, i) => (
            <div
              key={i}
              className="bg-[var(--bg-input)]/60 rounded-xl p-3 group cursor-pointer hover:bg-[var(--pink-primary)]/6 transition-colors"
              onClick={() => {
                speak(w.korean, 0.75);
                setShowWordMeaning((prev) => ({ ...prev, [i]: !prev[i] }));
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{w.emoji}</span>
                <span className="text-sm font-bold text-[var(--text-primary)]">{w.korean}</span>
                <Volume2 size={11} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[10px] text-[var(--text-muted)] leading-tight">{w.pronunciation}</div>
              {showWordMeaning[i] && (
                <div className="mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">
                  <span className="text-xs text-[var(--text-secondary)]">{w.chinese}</span>
                  <span className="text-[10px] text-[var(--text-placeholder)] ml-1">({w.partOfSpeech})</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Section: Grammar ── */}
      <SectionCard
        title="📖 语法"
        subtitle={course.grammar.name}
        expanded={expandedSections.grammar}
        onToggle={() => toggleSection('grammar')}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
              {course.grammar.name}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">{course.grammar.pattern}</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{course.grammar.explanation}</p>
          <div className="bg-[var(--bg-input)]/60 rounded-xl p-3 border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[var(--text-primary)]">{course.grammar.example}</span>
              <button onClick={() => speak(course.grammar.example, 0.75)} className="text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
                <Volume2 size={13} />
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">{course.grammar.exampleZh}</p>
          </div>
        </div>
      </SectionCard>

      {/* ── Section: Sentences ── */}
      <SectionCard
        title="💬 实用句"
        subtitle={`${course.sentences.length}句`}
        expanded={expandedSections.sentences}
        onToggle={() => toggleSection('sentences')}
      >
        <div className="space-y-2">
          {course.sentences.map((s, i) => (
            <div
              key={i}
              className="bg-[var(--bg-input)]/60 rounded-xl p-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
              onClick={() => {
                speak(s.korean, 0.75);
                setShowSentenceTranslation((prev) => ({ ...prev, [i]: !prev[i] }));
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[var(--text-placeholder)]">{s.scene}</span>
                <Volume2 size={12} className="text-[var(--text-muted)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{s.korean}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{s.pronunciation}</p>
              {showSentenceTranslation[i] && (
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]/50">{s.chinese}</p>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Section: Dictation ── */}
      <SectionCard
        title="🎧 听写"
        subtitle={`${course.dictations.length}个`}
        expanded={expandedSections.dictations}
        onToggle={() => toggleSection('dictations')}
      >
        <div className="space-y-2">
          {course.dictations.map((d, i) => (
            <div key={i} className="bg-[var(--bg-input)]/60 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[var(--text-muted)]">#{i + 1} · {d.chinese}</span>
                <button
                  onClick={() => speak(d.korean, 0.75)}
                  className="p-1 hover:bg-[var(--pink-primary)]/10 rounded-lg text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <button
                onClick={() => setShowDictationAnswer((prev) => ({ ...prev, [i]: !prev[i] }))}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center gap-1"
              >
                <Lightbulb size={11} />
                {showDictationAnswer[i] ? d.korean : '点击显示答案'}
              </button>
              {showDictationAnswer[i] && (
                <p className="text-[11px] text-[var(--text-muted)] mt-1">{d.pronunciation}</p>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Section: Output ── */}
      <SectionCard
        title="✍️ 输出练习"
        subtitle="用今天学的表达造句"
        expanded={expandedSections.output}
        onToggle={() => toggleSection('output')}
      >
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 rounded-xl p-4 border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 size={14} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-medium text-[var(--text-primary)]">{course.output.prompt}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={12} className="text-[var(--text-muted)]" />
              <span className="text-[11px] text-[var(--text-muted)]">提示：{course.output.hint}</span>
            </div>
            <textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder="在这里写下你的韩语句子..."
              rows={3}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)] transition-colors"
            />
            {outputText && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-800/30 rounded-xl">
                <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句：</p>
                <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">{course.output.exampleAnswer}</p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Completion button + bottom nav */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <button
          onClick={goPrev}
          disabled={dayNum <= 1}
          className="text-xs px-4 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          上一课
        </button>

        <button
          onClick={() => setCompletionCelebrated(true)}
          className={`text-xs px-5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
            completionCelebrated
              ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
              : 'bg-[var(--pink-primary)] text-white hover:opacity-90'
          }`}
        >
          {completionCelebrated ? <><CheckCircle size={14} /> 已完成</> : '✅ 标记完成'}
        </button>

        <button
          onClick={goNext}
          disabled={dayNum >= 30}
          className="text-xs px-4 py-2 rounded-xl bg-[var(--pink-primary)] text-white hover:opacity-90 disabled:opacity-30 transition-colors flex items-center gap-1"
        >
          下一课
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-500 rounded-full"
          style={{ width: `${(dayNum / 30) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ── Collapsible section ────────────────────────────────────

function SectionCard({
  title,
  subtitle,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-5 py-3.5 hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        <span className="text-[11px] text-[var(--text-muted)]">{subtitle}</span>
        <ChevronDown
          size={16}
          className={`ml-auto text-[var(--text-muted)] transition-transform ${expanded ? '' : '-rotate-90'}`}
        />
      </button>
      {expanded && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}
