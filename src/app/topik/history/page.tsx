'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { topikSections } from '@/data/topik-questions';
import type { TopikSession } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, tagBg: '#f0ece8' };
const DARK_C  = { ..._DARK_C, tagBg: '#252040' };

export default function TopikHistoryPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const [sessions, setSessions] = useState<TopikSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.topikSessions.toArray()
      .then(all => {
        const sorted = [...all].sort((a, b) => b.completedAt - a.completedAt);
        setSessions(sorted);
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  function sectionLabel(sectionId: string) {
    return topikSections.find(s => s.id === sectionId)?.title || sectionId;
  }

  function modeLabel(mode: string) {
    switch (mode) {
      case 'exam': return '真题';
      case 'practice': return '模拟';
      case 'mistakes': return '错题';
      default: return '专项';
    }
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  function formatDuration(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}分${s.toString().padStart(2, '0')}秒`;
  }

  // Group by section for mini trend
  const bySection: Record<string, TopikSession[]> = {};
  for (const s of sessions) {
    if (!bySection[s.section]) bySection[s.section] = [];
    bySection[s.section].push(s);
  }
  const trendSection = Object.entries(bySection).sort((a, b) => b[1].length - a[1].length)[0];
  const trendData = trendSection ? trendSection[1].slice(0, 6).reverse() : [];

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16 }}>
          <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color={C.muted} />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>成绩历史</h1>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>共 {sessions.length} 次练习记录</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Trend chart */}
        {trendData.length >= 2 && (
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.line}`, padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 12px' }}>
              近{trendData.length}次得分趋势 · {sectionLabel(trendSection![0])}
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 52 }}>
              {trendData.map((s, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: s.score >= 60 ? C.mint : C.pink, height: `${Math.max(s.score * 0.52, 4)}px`, transition: 'height 0.3s' }} />
                  <span style={{ fontSize: 9, color: C.muted }}>{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Session list */}
        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: 40, color: C.muted, fontSize: 14 }}>加载中...</div>
        ) : sessions.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>还没有练习记录</p>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>完成一次练习后，记录将显示在这里</p>
            <button onClick={() => router.push('/topik')} style={{ marginTop: 16, padding: '12px 28px', borderRadius: 14, background: C.pink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              去练习
            </button>
          </div>
        ) : (
          sessions.map(s => (
            <div key={s.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.score >= 60 ? C.mintBg : C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: s.score >= 60 ? 'var(--color-mint-strong)' : C.pink, flexShrink: 0 }}>
                {s.score}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: 0 }}>{sectionLabel(s.section)}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 6, background: C.tagBg, color: C.muted }}>{modeLabel(s.mode)}</span>
                </div>
                <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>
                  {formatDate(s.completedAt)} · {s.correctCount}/{s.totalCount} · {formatDuration(s.durationSec)}
                </p>
              </div>
              {s.score >= 60 ? <Trophy size={16} color={C.mint} /> : <AlertCircle size={16} color={C.pink} />}
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
