import Link from 'next/link';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';

export default function CoursePage() {
  const weeks = [
    { label: '第一周', sub: '日常问候与自我介绍', days: [1, 2, 3, 4, 5, 6, 7], color: '#FF8FAB' },
    { label: '第二周', sub: '日常生活', days: [8, 9, 10, 11, 12, 13, 14], color: '#A8D8D0' },
    { label: '第三周', sub: '社交与表达', days: [15, 16, 17, 18, 19, 20, 21], color: '#C9B8E8' },
    { label: '第四周', sub: '进阶日常 + 总测试', days: [22, 23, 24, 25, 26, 27, 28, 29, 30], color: '#FFE4A0' },
  ];

  return (
    <div className="py-4 mx-auto max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
          🎯 30天韩语入门课程
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          每天15分钟 · 8个单词 · 1个语法 · 3句口语 · 5个听写 · 1个输出任务
        </p>
      </div>

      {/* Progress overview */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--pink-primary)]">240</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">单词</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--purple-soft)]">30</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">语法点</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--mint-soft)]">90</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">实用句</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--amber-soft)]">30</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">输出任务</div>
          </div>
        </div>
      </div>

      {/* Course timeline */}
      <div className="space-y-6">
        {weeks.map((week) => (
          <div key={week.label}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: week.color }} />
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{week.label}</h2>
              <span className="text-[11px] text-[var(--text-muted)]">· {week.sub}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {week.days.map((dayNum) => {
                const day = thirtyDayCourse[dayNum - 1];
                return (
                  <Link
                    key={dayNum}
                    href={`/course/${dayNum}`}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 hover:border-[var(--pink-pale)] hover:shadow-sm transition-all text-center group"
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{day.emoji}</div>
                    <div className="text-[11px] font-bold text-[var(--text-primary)]">Day {dayNum}</div>
                    <div className="text-[10px] text-[var(--text-muted)] truncate">{day.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/course/1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
        >
          🚀 从第一天开始
        </Link>
      </div>
    </div>
  );
}
