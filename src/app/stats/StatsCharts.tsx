'use client';

// recharts 是最重的库之一（含 d3 依赖）。此文件集中所有图表，
// 由 stats/page.tsx 用 next/dynamic({ ssr:false }) 懒加载，
// 把 recharts 移出普通用户访问 /stats 的首屏 bundle。
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Area, AreaChart,
} from 'recharts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { RetentionBucket } from '@/lib/forgetting-curve';

const COLORS = ['var(--text-muted)', 'var(--color-highlight)', 'var(--pink-primary)', 'var(--mint-soft)'];
const tooltipStyle = { background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)' };

export function WeekReviewChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
        <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" fill="var(--pink-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MasteryPieChart({ data }: { data: { name: string; value: number }[] }) {
  const { lang } = useLang();
  return (
    <>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
            {t(item.name, lang)} ({item.value})
          </div>
        ))}
      </div>
    </>
  );
}

export function SrsBinsChart({ data }: { data: { level: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
        <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis dataKey="level" type="category" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" fill="var(--purple-soft)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SkillsRadarChart({ data }: { data: { skill: string; score: number; fullMark: number }[] }) {
  const { lang } = useLang();
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="var(--border-color)" strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="skill"
          tickFormatter={(v: string) => t(v, lang)}
          tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name={t('stats.radar_name', lang)}
          dataKey="score"
          stroke="var(--pink-primary)"
          fill="var(--pink-primary)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function RetentionBucketsChart({ data }: { data: RetentionBucket[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
        <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis dataKey="label" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((b, i) => (
            <Cell key={i} fill={b.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ForgettingCurveChart({ data }: { data: { day: number; retention: number }[] }) {
  const { lang } = useLang();
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--pink-primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--pink-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
        <XAxis
          dataKey="day"
          label={{ value: t('stats.curve_x', lang), position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 11 }}
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          label={{ value: t('stats.curve_y', lang), angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`${v}%`, t('stats.curve_tooltip', lang)]}
        />
        <Area
          type="monotone"
          dataKey="retention"
          stroke="var(--pink-primary)"
          strokeWidth={2}
          fill="url(#retentionGradient)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--pink-primary)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
