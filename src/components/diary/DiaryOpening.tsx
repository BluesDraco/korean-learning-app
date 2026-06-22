'use client';

import type { ToriDay } from '@/types/tori-diary';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

/**
 * Day Opening — 日记第一页
 * 显示日期、天气、日记文案、开始按钮
 */
export function DiaryOpening({ day, onComplete }: Props) {
  return (
    <div className="diary-anim-fade-up">
      {/* 日期与天气 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Calendar size={16} color="var(--diary-gold-deep)" />
        <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)' }}>
          {day.opening.date}
        </span>
        {day.opening.weather && (
          <>
            <span style={{ color: 'var(--diary-ink-faint)' }}>·</span>
            <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)' }}>
              {day.opening.weather}
            </span>
          </>
        )}
      </div>

      {/* 标题 */}
      <h1 className="diary-h1 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {day.title}
      </h1>
      <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
        {day.subtitle}
      </p>

      <hr className="diary-dashed" />

      {/* 日记正文 */}
      <div
        className="diary-handwriting-zh"
        style={{
          fontSize: 'var(--diary-text-md)',
          lineHeight: 2.1,
          color: 'var(--diary-ink)',
          whiteSpace: 'pre-line',
          marginTop: 12,
          marginBottom: 28,
        }}
      >
        {day.opening.diaryText}
      </div>

      <hr className="diary-dashed" />

      {/* 元信息 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 24 }}>
        <span style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)' }}>
          📚 今天 {day.words.length} 个词 · ⏱ 约 {day.estimatedMin} 分钟
        </span>
      </div>

      {/* 开始按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={onComplete} className="diary-btn diary-btn-primary">
          开始今天 <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
