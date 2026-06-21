'use client';

import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C, DARK_C } from '@/lib/theme';

export default function SyncKaraokePage() {
  const { theme } = useTheme();
  const C = theme === "dark" ? DARK_C : LIGHT_C;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
      <div style={{ fontSize: 56 }}>🎙</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>智能识别跟唱</div>
      <div style={{ fontSize: 14, color: C.muted, textAlign: "center", maxWidth: 280, lineHeight: 1.6 }}>
        播放歌曲，AI 自动识别并实时同步歌词。此功能正在开发中，敬请期待。
      </div>
      <div style={{ background: "rgba(180,140,255,0.12)", border: "1px solid rgba(180,140,255,0.3)", borderRadius: 99, padding: "10px 24px", fontSize: 13, fontWeight: 900, color: "#a090d0" }}>
        即将上线
      </div>
      <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", marginTop: 8 }}>
        ← 返回
      </button>
    </div>
  );
}
