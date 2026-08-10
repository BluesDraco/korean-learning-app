'use client';

import { useMemo } from 'react';
import { BookOpen, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { getDay } from '@/data/diary';
import { hasSubQuest } from '@/data/diary/subquests';
import type { ToriLevel } from '@/types/tori-diary';

const LEVELS: ToriLevel[] = ['beginner', 'intermediate', 'advanced'];
const SUBQUEST_LABELS = ['词汇', '听力', '语法', '情景', 'Boss'];
const TOTAL_DAYS = 30;

/** 单日数据完整度检查结果 */
interface DayHealth {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  mainDayExists: boolean;
  wordCount: number;
  grammarPoints: number;
  outputCount: number;
  subquests: boolean[]; // 5 个子关卡是否存在
  missing: string[]; // 缺失字段
}

function analyzeDay(level: ToriLevel, day: number): DayHealth {
  const d = getDay(level, day);
  const missing: string[] = [];
  if (!d) {
    return {
      day, level,
      mainDayExists: false,
      wordCount: 0, grammarPoints: 0, outputCount: 0,
      subquests: [false, false, false, false, false],
      missing: ['整个主 Day'],
    };
  }
  if (!d.opening) missing.push('opening');
  if (!d.words?.length) missing.push('words');
  if (!d.dialogue?.lines?.length) missing.push('dialogue');
  if (!d.grammar?.rules?.length) missing.push('grammar');
  if (!d.output?.length) missing.push('output');
  if (!d.recap) missing.push('recap');

  return {
    day, level,
    mainDayExists: true,
    wordCount: d.words?.length ?? 0,
    grammarPoints: d.grammar?.rules?.length ?? 0,
    outputCount: d.output?.length ?? 0,
    subquests: [1, 2, 3, 4, 5].map((idx) => hasSubQuest(level, day, idx as 1 | 2 | 3 | 4 | 5)),
    missing,
  };
}

export default function DiaryHealthPage() {
  const rows = useMemo(() => {
    const out: DayHealth[] = [];
    for (const level of LEVELS) {
      for (let d = 1; d <= TOTAL_DAYS; d++) {
        out.push(analyzeDay(level, d));
      }
    }
    return out;
  }, []);

  const beginner = rows.filter((r) => r.level === 'beginner');

  const stats = useMemo(() => {
    const mainDayDone = beginner.filter((r) => r.mainDayExists && r.missing.length === 0).length;
    const subquestDone = beginner.reduce((acc, r) => acc + r.subquests.filter(Boolean).length, 0);
    const totalSubquests = beginner.length * 5;
    // 全三级主 Day 真实存在数(替代写死的 3×30=90)
    const allMainDayExists = rows.filter((r) => r.mainDayExists).length;
    return { mainDayDone, subquestDone, totalSubquests, allMainDayExists };
  }, [beginner, rows]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <BookOpen size={20} className="text-[var(--pink-primary)]" />
          日记数据健康
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">三级各 30 天（共 90 天）日记的主 Day 和子关卡完成度总览</p>
      </div>

      {/* 汇总卡 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Beginner 主 Day 完整" value={`${stats.mainDayDone} / ${TOTAL_DAYS}`}
          color={stats.mainDayDone === TOTAL_DAYS ? 'green' : 'yellow'} />
        <Stat label="Beginner 子关卡覆盖" value={`${stats.subquestDone} / ${stats.totalSubquests}`}
          color={stats.subquestDone === stats.totalSubquests ? 'green' : 'yellow'} />
        <Stat label="全三级主 Day 存在" value={`${stats.allMainDayExists} / ${LEVELS.length * TOTAL_DAYS}`}
          color={stats.allMainDayExists === LEVELS.length * TOTAL_DAYS ? 'green' : 'yellow'} />
      </div>

      {/* 三级完整表格 */}
      <Section title="Beginner · 初级" rows={beginner} />
      <Section title="Intermediate · 中级" rows={rows.filter((r) => r.level === 'intermediate')} />
      <Section title="Advanced · 高级" rows={rows.filter((r) => r.level === 'advanced')} />

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          <b>说明</b>：这里只检查数据结构是否存在，不校验韩语内容质量。跑 <code className="px-1 rounded bg-[var(--bg-soft)]">npm run lint:diary</code> 可做子关卡内容一致性检查（汉韩混排、重复句、缺 explain 等）。
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: 'green' | 'yellow' | 'red' | 'gray' }) {
  const colorMap = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
    gray: 'text-[var(--text-primary)]',
  };
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorMap[color]}`}>{value}</p>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: DayHealth[] }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-primary)]">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--bg-soft)] text-[var(--text-muted)]">
              <th className="text-left px-3 py-2">Day</th>
              <th className="text-left px-3 py-2">主 Day</th>
              <th className="text-right px-2 py-2" title="词汇数">词</th>
              <th className="text-right px-2 py-2" title="语法点数">语</th>
              <th className="text-right px-2 py-2" title="output 题数">输</th>
              {SUBQUEST_LABELS.map((l) => (
                <th key={l} className="text-center px-2 py-2">{l}</th>
              ))}
              <th className="text-left px-3 py-2">缺失</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.day} className="border-t border-[var(--border-color)]">
                <td className="px-3 py-2 font-mono text-[var(--text-primary)]">D{r.day}</td>
                <td className="px-3 py-2">
                  {r.mainDayExists && r.missing.length === 0 ? (
                    <CheckCircle2 size={14} className="text-green-500" />
                  ) : r.mainDayExists ? (
                    <AlertTriangle size={14} className="text-yellow-500" />
                  ) : (
                    <XCircle size={14} className="text-red-500" />
                  )}
                </td>
                <td className="px-2 py-2 text-right text-[var(--text-secondary)]">{r.wordCount || '-'}</td>
                <td className="px-2 py-2 text-right text-[var(--text-secondary)]">{r.grammarPoints || '-'}</td>
                <td className="px-2 py-2 text-right text-[var(--text-secondary)]">{r.outputCount || '-'}</td>
                {r.subquests.map((ok, i) => (
                  <td key={i} className="px-2 py-2 text-center">
                    {ok ? <CheckCircle2 size={13} className="text-green-500 mx-auto" /> : <span className="text-[var(--text-muted)]">·</span>}
                  </td>
                ))}
                <td className="px-3 py-2 text-[var(--text-muted)]">
                  {r.missing.length === 0 ? '—' : r.missing.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

