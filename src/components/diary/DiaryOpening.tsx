'use client';

import type { ToriDay } from '@/types/tori-diary';
import { useEffect, useMemo, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
  day: ToriDay;
  onComplete: () => void;
}

export function DiaryOpening({ day, onComplete }: Props) {
  const { lang } = useLang();
  const envelopeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const completedRef = useRef(false);
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    sfxPop();
    onComplete();
  };

  useEffect(() => {
    // 标题飘入
    const t1 = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.transition = 'opacity .5s ease, transform .5s ease';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
      if (subRef.current) {
        subRef.current.style.transition = 'opacity .5s ease .1s, transform .5s ease .1s';
        subRef.current.style.opacity = '1';
        subRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    // 信封展开
    const t2 = setTimeout(() => {
      if (envelopeRef.current) {
        envelopeRef.current.style.transition = 'opacity .45s ease .15s, transform .55s cubic-bezier(.4,0,.2,1)';
        envelopeRef.current.style.opacity = '1';
        envelopeRef.current.style.transform = 'scaleY(1)';
      }
    }, 400);

    // 文字逐行渗入
    const t3 = setTimeout(() => {
      lineRefs.current.forEach((el, i) => {
        if (el) {
          el.style.transition = `opacity .45s ease ${i * 0.1}s, transform .45s ease ${i * 0.1}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 600);

    // 晨光闪过 → 消失
    const t4 = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity .4s ease, transform .5s ease';
        glowRef.current.style.opacity = '0.7';
        glowRef.current.style.transform = 'scale(1)';
      }
    }, 1100);
    const t5 = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity .7s ease, transform .8s ease';
        glowRef.current.style.opacity = '0';
        glowRef.current.style.transform = 'scale(1.03)';
      }
    }, 1300);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  const toChinese = (s: string) => s
    // 场景/时段词优先（含"요일""월""일"的整词先替换，避免被单字规则截断）
    .replace(/월요일/g, '周一').replace(/화요일/g, '周二').replace(/수요일/g, '周三')
    .replace(/목요일/g, '周四').replace(/금요일/g, '周五').replace(/토요일/g, '周六').replace(/일요일/g, '周日')
    .replace(/출발 전날 밤/g, '出发前夜')
    .replace(/비행기 안/g, '飞机上').replace(/인차공항/g, '仁爪机场')
    .replace(/한빛 기숙사 로비/g, '韩光宿舍大堂').replace(/한빛 기숙사 복도/g, '韩光宿舍走廊')
    .replace(/한빛 어학원 교실/g, '韩光语学院教室')
    .replace(/오전/g, '上午').replace(/오후/g, '下午')
    .replace(/저녁/g, '傍晚').replace(/아침/g, '早上').replace(/점심/g, '中午').replace(/새벽/g, '凌晨').replace(/밤/g, '晚上')
    // 单字兜底放最后
    .replace(/월/g, '月').replace(/일/g, '日');
  const SERIF = `'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', serif`;
  const cnDate = useMemo(() => toChinese(day.opening.date), [day.opening.date]);
  const cnWeather = useMemo(() => toChinese(day.opening.weather || ''), [day.opening.weather]);
  const textLines = useMemo(() => day.opening.diaryText.split('\n').filter(Boolean), [day.opening.diaryText]);

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-gold">{t('diary.open.tag', lang)}</span>
      </div>

      {/* 日期与天气 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Calendar size={16} color="var(--diary-gold-deep)" />
        <span className="diary-display-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', fontFamily: SERIF }}>
          {cnDate}
        </span>
        {cnWeather && (
          <>
            <span style={{ color: 'var(--diary-ink-faint)' }}>·</span>
            <span className="diary-display-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)', fontFamily: SERIF }}>
              {cnWeather}
            </span>
          </>
        )}
      </div>

      {/* 标题 */}
      <h1
        ref={titleRef}
        className="diary-h1 diary-display-zh"
        style={{ marginBottom: 6, opacity: 0, transform: 'translateY(-10px)', fontFamily: SERIF }}
      >
        {day.title}
      </h1>
      <p
        ref={subRef}
        className="diary-display-zh"
        style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24, opacity: 0, transform: 'translateY(-6px)', fontFamily: SERIF }}
      >
        {day.subtitle}
      </p>

      <hr className="diary-hr-dashed" />

      {/* ── 信封 — 折信展开 ── */}
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <div
          ref={envelopeRef}
          style={{
            padding: '20px 18px',
            borderRadius: 14,
            background: 'var(--diary-paper-deep)',
            border: '1px solid var(--diary-line)',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: 'top center',
          }}
        >
          {/* 晨光 */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 14,
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,200,120,.4) 0%, rgba(255,180,100,.1) 60%, transparent 80%)',
              opacity: 0,
              transform: 'scale(.9)',
              pointerEvents: 'none',
            }}
          />

          {/* 正文 — 逐行 */}
          <div
            className="diary-display-zh"
            style={{
              fontSize: 17,
              lineHeight: 2.6,
              color: 'var(--diary-ink)',
              position: 'relative',
              zIndex: 1,
              fontFamily: "'Songti SC', 'SimSun', 'Noto Serif SC', serif",
            }}
          >
            {textLines.map((line, i) => (
              <span
                key={i}
                ref={(el) => { lineRefs.current[i] = el; }}
                style={{
                  display: 'block',
                  minHeight: '1.5em',
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="diary-hr-dashed" style={{ marginTop: 16 }} />

      {/* 元信息 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 24 }}>
        <span style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)' }}>
          {t('diary.open.meta', lang, { words: day.words.length, min: day.estimatedMin })}
        </span>
      </div>

      {/* 开始按钮 */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={safeComplete} className="diary-btn diary-btn-primary">
          {t('diary.open.startBtn', lang)} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
