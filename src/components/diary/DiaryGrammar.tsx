'use client';

import type { ToriDay } from '@/types/tori-diary';
import { ChevronRight, Lightbulb } from 'lucide-react';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

/**
 * Day Grammar — 语法小卡
 * 一句话讲清，例句配对，明确易错点。"我懂了"按钮通过
 */
export function DiaryGrammar({ day, onComplete }: Props) {
  const g = day.grammar;

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-pink">GRAMMAR · 语法</span>
      </div>

      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {g.title}
      </h2>

      {/* 句式 pattern */}
      <div
        className="diary-card-paper"
        style={{
          background: 'var(--diary-paper-deep)',
          border: '2px dashed var(--diary-gold)',
          padding: '14px 18px',
          marginTop: 12,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        <span className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-xl)', color: 'var(--diary-ink)', fontWeight: 700 }}>
          {g.pattern}
        </span>
      </div>

      {/* 用法说明 */}
      <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', lineHeight: 1.85, marginBottom: 18 }}>
        🔍 <strong style={{ color: 'var(--diary-ink)' }}>什么时候用：</strong>{g.whenToUse}
      </p>

      {/* 规则 */}
      <div style={{ marginBottom: 22 }}>
        <h3 className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 10, fontWeight: 700 }}>
          📐 规则
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.rules.map((rule, i) => (
            <li
              key={i}
              className="diary-handwriting-zh"
              style={{
                fontSize: 'var(--diary-text-sm)',
                color: 'var(--diary-ink-soft)',
                lineHeight: 1.7,
                paddingLeft: 16,
                position: 'relative',
              }}
              dangerouslySetInnerHTML={{
                __html:
                  '<span style="position:absolute;left:0;color:var(--diary-gold-deep);font-weight:700;">·</span>' +
                  rule.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--diary-stamp-red);">$1</strong>'),
              }}
            />
          ))}
        </ul>
      </div>

      {/* 例句 */}
      <div style={{ marginBottom: 22 }}>
        <h3 className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 10, fontWeight: 700 }}>
          💡 例句
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.examples.map((ex, i) => (
            <div
              key={i}
              style={{
                padding: '10px 14px',
                background: 'var(--diary-paper-deep)',
                borderLeft: '3px solid var(--diary-gold)',
                borderRadius: 'var(--diary-r-sm)',
              }}
            >
              <div className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 2 }}>
                {ex.highlight
                  ? ex.ko.split(ex.highlight).reduce<React.ReactNode[]>((acc, part, idx, arr) => {
                      acc.push(part);
                      if (idx < arr.length - 1) {
                        acc.push(
                          <span key={idx} style={{ color: 'var(--diary-stamp-red)', fontWeight: 800 }}>
                            {ex.highlight}
                          </span>
                        );
                      }
                      return acc;
                    }, [])
                  : ex.ko}
              </div>
              <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)' }}>
                {ex.zh}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 易错点 */}
      {g.pitfall && (
        <div
          style={{
            padding: '12px 16px',
            background: '#fdf4e3',
            border: '1.5px solid var(--diary-gold)',
            borderRadius: 'var(--diary-r-md)',
            marginBottom: 28,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <Lightbulb size={18} color="var(--diary-gold-deep)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-gold-deep)' }}>
              小心：
            </strong>
            <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink)', lineHeight: 1.7, marginLeft: 4 }}>
              {g.pitfall}
            </span>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button onClick={onComplete} className="diary-btn diary-btn-primary">
          我懂了 · 下一步 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
