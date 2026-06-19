'use client';

import type { LocalLyricLine } from '@/types/kpop';

interface LyricLineProps {
  line: LocalLyricLine;
  index: number;
  isActive: boolean;
  isPast: boolean;
  showRomanization: boolean;
  showChinese: boolean;
  C: Record<string, string>;
  onABLoop: (index: number) => void;
  onTTS: (korean: string) => void;
  onWordTap: (word: string) => void;
  onJump: (index: number) => void;
}

export function LyricLine({
  line,
  index,
  isActive,
  isPast,
  showRomanization,
  showChinese,
  C,
  onABLoop,
  onTTS,
  onWordTap,
  onJump,
}: LyricLineProps) {
  const words = line.korean.split(/(\s+)/).filter(Boolean);

  return (
    <div
      onClick={() => onJump(index)}
      style={{
        background: isActive
          ? `linear-gradient(90deg, rgba(255,127,168,0.10), rgba(255,127,168,0.02))`
          : C.card,
        borderRadius: 18,
        padding: isActive ? '14px 14px' : '12px 14px',
        borderLeft: `3px solid ${isActive ? '#ff7fa8' : 'transparent'}`,
        boxShadow: isActive ? '0 4px 16px rgba(255,127,168,0.10)' : '0 1px 4px rgba(78,52,46,0.05)',
        opacity: isPast ? 0.45 : 1,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {/* 韩文行 + TTS 按钮 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
        <div
          style={{
            flex: 1,
            fontSize: isActive ? 18 : 15,
            fontWeight: 900,
            color: C.ink,
            lineHeight: 1.5,
            transition: 'font-size 0.2s',
          }}
        >
          {words.map((w, i) =>
            /\s+/.test(w) ? (
              <span key={i}>{w}</span>
            ) : (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onWordTap(w);
                }}
                style={{
                  borderRadius: 4,
                  padding: '0 2px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(255,127,168,0.18)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'transparent')
                }
              >
                {w}
              </span>
            )
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTTS(line.korean);
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            background: C.pinkSoft || 'rgba(255,127,168,0.1)',
            border: 'none',
            fontSize: 14,
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="TTS 发音"
        >
          🔊
        </button>
      </div>

      {/* 罗马音 */}
      {showRomanization && line.romanization && (
        <div
          style={{
            fontSize: 12,
            color: C.muted,
            fontStyle: 'italic',
            marginBottom: 3,
            lineHeight: 1.5,
          }}
        >
          {line.romanization}
        </div>
      )}

      {/* 中文翻译 */}
      {showChinese && line.chinese && (
        <div
          style={{
            fontSize: 13,
            color: C.muted,
            marginBottom: isActive ? 10 : 0,
            lineHeight: 1.5,
          }}
        >
          {line.chinese}
        </div>
      )}

      {/* 当前行：关键词 + 操作按钮 */}
      {isActive && (
        <>
          {line.keywords.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                marginBottom: 10,
              }}
            >
              {line.keywords.map((kw, i) => (
                <span
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onWordTap(kw.korean);
                  }}
                  style={{
                    background: C.pinkSoft || 'rgba(255,127,168,0.1)',
                    color: '#ff7fa8',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 20,
                    border: '1px solid rgba(255,127,168,0.2)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {kw.korean} · {kw.meaning}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onABLoop(index);
              }}
              style={{
                flex: 1,
                background: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: '7px 0',
                fontSize: 12,
                fontWeight: 700,
                color: C.ink,
                cursor: 'pointer',
              }}
            >
              🔁 单句循环
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTTS(line.korean);
              }}
              style={{
                flex: 1,
                background: C.pinkSoft || 'rgba(255,127,168,0.1)',
                border: '1px solid rgba(255,127,168,0.2)',
                borderRadius: 10,
                padding: '7px 0',
                fontSize: 12,
                fontWeight: 700,
                color: '#ff7fa8',
                cursor: 'pointer',
              }}
            >
              🎤 跟唱这句
            </button>
          </div>
        </>
      )}
    </div>
  );
}
