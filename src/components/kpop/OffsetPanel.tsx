'use client';

interface OffsetPanelProps {
  offsetMs: number;
  onChange: (newOffsetMs: number) => void;
  onClose: () => void;
  C: Record<string, string>;
}

export function OffsetPanel({ offsetMs, onChange, onClose, C }: OffsetPanelProps) {
  const formatOffset = (ms: number) => {
    const sign = ms >= 0 ? '+' : '';
    return `${sign}${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <>
      {/* 蒙层 */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 80,
        }}
      />

      {/* 面板 */}
      <div
        style={{
          position: 'fixed',
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          background: C.card,
          borderRadius: '24px 24px 0 0',
          padding: '20px 20px 24px',
          zIndex: 81,
          boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
        }}
        className="md:left-[108px]"
      >
        {/* 把手 */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 4,
            background: C.line,
            margin: '0 auto 16px',
          }}
        />

        <div
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: C.ink,
            marginBottom: 4,
          }}
        >
          ⏱ 同步校准
        </div>
        <div
          style={{
            fontSize: 12,
            color: C.muted,
            marginBottom: 20,
          }}
        >
          歌词比音乐快？点"早"；慢了点"晚"
        </div>

        {/* 当前偏移显示 */}
        <div
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 900,
            color: offsetMs === 0 ? C.muted : '#ff7fa8',
            marginBottom: 20,
          }}
        >
          {formatOffset(offsetMs)}
        </div>

        {/* 调整按钮 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => onChange(offsetMs - 2000)}
            style={{
              flex: 1,
              background: C.card,
              border: `1.5px solid ${C.line}`,
              borderRadius: 14,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 700,
              color: C.ink,
              cursor: 'pointer',
            }}
          >
            ← 早 2s
          </button>
          <button
            onClick={() => onChange(offsetMs - 500)}
            style={{
              flex: 1,
              background: C.card,
              border: `1.5px solid ${C.line}`,
              borderRadius: 14,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 700,
              color: C.ink,
              cursor: 'pointer',
            }}
          >
            ← 早 0.5s
          </button>
          <button
            onClick={() => onChange(offsetMs + 500)}
            style={{
              flex: 1,
              background: C.card,
              border: `1.5px solid ${C.line}`,
              borderRadius: 14,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 700,
              color: C.ink,
              cursor: 'pointer',
            }}
          >
            晚 0.5s →
          </button>
          <button
            onClick={() => onChange(offsetMs + 2000)}
            style={{
              flex: 1,
              background: C.card,
              border: `1.5px solid ${C.line}`,
              borderRadius: 14,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 700,
              color: C.ink,
              cursor: 'pointer',
            }}
          >
            晚 2s →
          </button>
        </div>

        {/* 重置 */}
        <button
          onClick={() => onChange(0)}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            fontSize: 13,
            color: C.muted,
            cursor: 'pointer',
            padding: '8px 0',
          }}
        >
          重置为 0
        </button>
      </div>
    </>
  );
}
