'use client';

import { useState } from 'react';
import type { ToriDay, ToriGrammar } from '@/types/tori-diary';
import { ChevronRight, ChevronDown, Lightbulb } from 'lucide-react';
import { TappableText } from '@/components/TappableText';
import { DiaryLineActions } from './DiaryLineActions';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

/**
 * Day Grammar — 语法小卡
 * 例句默认折叠，展开后看罗马音 + 中文 + 语法解释 + 操作栏
 */
export function DiaryGrammar({ day, onComplete }: Props) {
  const g = day.grammar;
  const source = `tori-diary-day-${day.day}`;

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

      {/* 例句（折叠/展开） */}
      <div style={{ marginBottom: 22 }}>
        <h3 className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 10, fontWeight: 700 }}>
          💡 例句 <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--diary-ink-faint)' }}>· 点击展开看读音和解释</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.examples.map((ex, i) => (
            <ExampleRow key={i} ex={ex} grammar={g} source={source} />
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

interface ExampleRowProps {
  ex: { ko: string; zh: string; highlight?: string };
  grammar: ToriGrammar;
  source: string;
}

function ExampleRow({ ex, grammar, source }: ExampleRowProps) {
  const [expanded, setExpanded] = useState(false);

  // 韩文带 highlight 的渲染
  const koNode = ex.highlight
    ? (
        <span>
          {ex.ko.split(ex.highlight).reduce<React.ReactNode[]>((acc, part, idx, arr) => {
            if (part) acc.push(<TappableText key={`p-${idx}`} text={part} source={source} />);
            if (idx < arr.length - 1) {
              acc.push(
                <span key={`h-${idx}`} style={{ color: 'var(--diary-stamp-red)', fontWeight: 800 }}>
                  <TappableText text={ex.highlight!} source={source} />
                </span>
              );
            }
            return acc;
          }, [])}
        </span>
      )
    : <TappableText text={ex.ko} source={source} />;

  return (
    <div
      style={{
        padding: '10px 14px',
        background: 'var(--diary-paper-deep)',
        borderLeft: '3px solid var(--diary-gold)',
        borderRadius: 'var(--diary-r-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', lineHeight: 1.6 }}>
            {koNode}
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? '收起' : '展开'}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 4,
            color: 'var(--diary-gold-deep)',
            display: 'inline-flex',
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {expanded && (
        <div
          className="diary-anim-fade-up"
          style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--diary-line)' }}
        >
          <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)', marginBottom: 8 }}>
            {ex.zh}
          </div>
          <div
            className="diary-handwriting-zh"
            style={{
              fontSize: 'var(--diary-text-xs)',
              color: 'var(--diary-ink-faint)',
              lineHeight: 1.6,
              marginBottom: 10,
              paddingLeft: 8,
              borderLeft: '2px solid var(--diary-line)',
            }}
          >
            <strong style={{ color: 'var(--diary-gold-deep)' }}>语法点：</strong>
            {grammar.whenToUse}
            {grammar.pitfall && <><br /><strong style={{ color: 'var(--diary-stamp-red)' }}>注意：</strong>{grammar.pitfall}</>}
          </div>
          <DiaryLineActions ko={ex.ko} zh={ex.zh} source={source} />
        </div>
      )}
    </div>
  );
}
