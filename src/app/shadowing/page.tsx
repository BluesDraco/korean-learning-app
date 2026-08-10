'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import type { ShadowingClip } from '@/types/shadowing';

const SOURCE_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'drama', label: '韩剧' },
  { key: 'variety', label: '综艺' },
  { key: 'vlog', label: 'Vlog' },
  { key: 'kpop', label: 'KPOP' },
  { key: 'tedx', label: 'TEDx' },
  { key: 'youtube', label: 'YouTube' },
];

const DIFF_FILTERS = [
  { key: 'all', label: '全部难度' },
  { key: 'A1', label: 'A1 入门' },
  { key: 'A2', label: 'A2 初级' },
  { key: 'B1', label: 'B1 中级' },
  { key: 'B2', label: 'B2 高级' },
];

function msToLabel(ms: number) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export default function ShadowingListPage() {
  const { theme } = useTheme();
  const LIGHT_C = {
    ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8',
    pinkSoft: '#fff0f5', bg: '#fffbf7', mint: '#aee3d8', mintBg: '#eaf8f5',
    cream: '#fff8f4', black: '#201815', mintText: '#4e746d', card: '#fff',
    shadow: '0 10px 26px rgba(78,52,46,.07)', strong: '0 28px 72px rgba(78,52,46,.18)',
    gold: '#C9A84C', goldBg: 'rgba(201,168,76,0.12)',
  };
  const DARK_C = {
    ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8',
    pinkSoft: '#2D2848', bg: '#1E1B2E', mint: '#4A6058', mintBg: '#1E3530',
    cream: '#232040', black: '#3A3060', mintText: '#5ecfb8', card: '#282440',
    shadow: '0 10px 26px rgba(0,0,0,.20)', strong: '0 28px 72px rgba(0,0,0,.45)',
    gold: '#C9A84C', goldBg: 'rgba(201,168,76,0.12)',
  };
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // gate: non-admin sees coming-soon screen
  if (user !== undefined && !isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 8 }}>影子跟读即将开放</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, maxWidth: 260 }}>功能正在完善中，开放后第一时间通知你</div>
      </div>
    );
  }

  const [clips, setClips] = useState<(ShadowingClip & { segmentCount?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [showMemberGate, setShowMemberGate] = useState(false);

  // extract state
  const [extractUrl, setExtractUrl] = useState('');
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const extractMountedRef = useRef(true);
  useEffect(() => { extractMountedRef.current = true; return () => { extractMountedRef.current = false; }; }, []);

  async function handleExtract() {
    if (!extractUrl.trim() || extractLoading) return;
    setExtractLoading(true);
    setExtractError(null);
    try {
      const res = await fetch('/api/shadowing/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractUrl.trim() }),
      });
      const data = await res.json();
      if (!extractMountedRef.current) return;
      if (data.clipId) {
        setExtractLoading(false);
        router.push('/shadowing/clip/' + data.clipId);
      } else {
        setExtractError(data.error ?? '提取失败，请重试');
        setExtractLoading(false);
      }
    } catch {
      if (!extractMountedRef.current) return;
      setExtractError('网络错误，请重试');
      setExtractLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (sourceFilter !== 'all') params.set('source_type', sourceFilter);
    if (diffFilter !== 'all') params.set('difficulty', diffFilter);
    setLoading(true);
    fetch('/api/shadowing/clips?' + params.toString())
      .then(r => r.json())
      .then(data => { setClips(data.clips ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [sourceFilter, diffFilter]);

  function getProgress(clipId: string) {
    try {
      const saved = localStorage.getItem('shadowing_progress_' + clipId);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch { return null; }
  }

  function handleCardClick(clip: ShadowingClip) {
    if (clip.isPremium) { setShowMemberGate(true); return; }
    router.push('/shadowing/clip/' + clip.id);
  }

  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', background: C.bg, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 16px 8px' }}>
        <Link href="/explore" style={{ width: 38, height: 38, borderRadius: 16, background: C.card, border: '1px solid ' + C.line, fontSize: 20, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, textDecoration: 'none' }}>‹</Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>影子跟读</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 1 }}>韩剧 / 综艺 / YouTube 精选</div>
        </div>
        <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: C.goldBg, border: '1px solid rgba(201,168,76,0.25)', color: C.gold, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center' }}>✦ 会员专属</div>
      </div>

      {/* Hero */}
      <div style={{ margin: '0 14px 16px', borderRadius: 32, padding: 20, background: 'radial-gradient(circle at 88% 78%,rgba(255,255,255,.08),transparent 28%), linear-gradient(135deg,#201815,#4d3934 46%,#ff8daf 132%)', color: '#fff', boxShadow: C.strong, border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', position: 'relative', minHeight: 190 }}>
        <div style={{ height: 30, padding: '0 12px', borderRadius: 999, background: C.goldBg, border: '1px solid rgba(201,168,76,0.3)', color: C.gold, fontWeight: 800, fontSize: 11, display: 'inline-flex', alignItems: 'center', marginBottom: 14 }}>✦ 会员专属 · 影子跟读</div>
        <h1 style={{ margin: '0 0 8px', maxWidth: 240, fontSize: 26, lineHeight: 1.15, letterSpacing: '-.7px', fontWeight: 900 }}>边看视频，边模仿真实韩语语调</h1>
        <p style={{ margin: 0, maxWidth: 240, fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,.68)' }}>字幕自动同步，单句循环，录音对比，一次完成听说读。</p>
        <div style={{ position: 'absolute', right: -36, bottom: -52, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 22, bottom: 14, display: 'flex', gap: 6 }}>
          {['🎙️', '🔁', '📚'].map(e => <div key={e} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e}</div>)}
        </div>
      </div>

      {/* YouTube URL extract box */}
      <div style={{ margin: '0 14px 16px', borderRadius: 24, padding: '16px 16px 14px', background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginBottom: 10 }}>粘贴 YouTube 链接开始练习</div>
        {user ? (
          <>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={extractUrl}
                onChange={e => setExtractUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleExtract()}
                placeholder="youtube.com/watch?v=..."
                disabled={extractLoading}
                style={{ flex: 1, height: 40, borderRadius: 12, border: '1px solid ' + C.line, background: C.bg, color: C.ink, fontSize: 13, padding: '0 12px', outline: 'none', opacity: extractLoading ? 0.6 : 1 }}
              />
              <button
                onClick={handleExtract}
                disabled={extractLoading || !extractUrl.trim()}
                style={{ height: 40, padding: '0 16px', borderRadius: 12, background: extractLoading || !extractUrl.trim() ? C.line : C.black, color: extractLoading || !extractUrl.trim() ? C.muted : '#fff', fontSize: 13, fontWeight: 800, border: 'none', cursor: extractLoading || !extractUrl.trim() ? 'default' : 'pointer', flexShrink: 0, transition: 'background .15s' }}
              >
                {extractLoading ? '处理中…' : '▶'}
              </button>
            </div>
            {extractLoading && (
              <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontWeight: 700 }}>正在提取字幕并翻译，约需 30-60 秒…</div>
            )}
            {extractError && (
              <div style={{ fontSize: 12, color: '#e05c5c', marginTop: 8, fontWeight: 700 }}>{extractError}</div>
            )}
          </>
        ) : (
          <div style={{ fontSize: 13, color: C.muted, fontWeight: 700 }}>登录后即可粘贴链接自动提取字幕</div>
        )}
      </div>

      {/* Source filter pills */}
      <div style={{ display: 'flex', gap: 7, padding: '0 14px 4px', overflowX: 'auto', scrollbarWidth: 'none' as const }}>
        {SOURCE_FILTERS.map(f => (
          <button key={f.key} onClick={() => setSourceFilter(f.key)} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: sourceFilter === f.key ? C.black : C.card, color: sourceFilter === f.key ? '#fff' : C.muted, border: sourceFilter === f.key ? 'none' : '1px solid ' + C.line, fontSize: 12, fontWeight: 800, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' as const }}>
            {f.label}
          </button>
        ))}
        <div style={{ height: 32, width: 1, background: C.line, flexShrink: 0, margin: '0 2px' }} />
        {DIFF_FILTERS.slice(1).map(f => (
          <button key={f.key} onClick={() => setDiffFilter(diffFilter === f.key ? 'all' : f.key)} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: diffFilter === f.key ? C.pink : C.card, color: diffFilter === f.key ? '#fff' : C.muted, border: diffFilter === f.key ? 'none' : '1px solid ' + C.line, fontSize: 12, fontWeight: 800, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' as const }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Section title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>精选片段</h2>
        <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>{loading ? '...' : clips.length + ' 个'}</span>
      </div>

      {/* Clips list */}
      <div style={{ padding: '0 14px', display: 'grid', gap: 10 }}>
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} style={{ height: 110, borderRadius: 28, background: C.card, border: '1px solid ' + C.line, animation: 'pulse 1.5s ease infinite' }} />
          ))
        ) : clips.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' as const, color: C.muted, fontSize: 14 }}>暂无内容，管理员正在上传中</div>
        ) : clips.map(clip => {
          const progress = getProgress(clip.id);
          const completed = progress?.completedSegs?.length ?? 0;
          const total = clip.segmentCount ?? 0;
          const pct = total > 0 ? (completed / total) * 100 : 0;
          const isLocked = clip.isPremium;

          return (
            <div key={clip.id} onClick={() => handleCardClick(clip)} style={{ display: 'flex', gap: 12, alignItems: 'center', borderRadius: 28, padding: 14, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, cursor: 'pointer', opacity: isLocked ? 0.78 : 1, transition: 'opacity .15s' }}>
              {/* Cover */}
              <div style={{ width: 96, height: 96, borderRadius: 22, flexShrink: 0, position: 'relative', background: 'linear-gradient(135deg,#201815,#ff8daf)', overflow: 'hidden' }}>
                <img src={clip.coverUrl || 'https://i.ytimg.com/vi/' + clip.youtubeId + '/hqdefault.jpg'} alt={clip.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                {isLocked && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(32,24,21,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, borderRadius: 22 }}>🔒</div>
                )}
                {pct > 0 && !isLocked && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: '0 0 22px 22px' }}>
                    <div style={{ width: pct + '%', height: '100%', background: 'linear-gradient(90deg,#aee3d8,#ff7fa8)' }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{clip.title}</div>
                {clip.speaker && <div style={{ fontSize: 12, color: '#f0799b', fontWeight: 700, marginBottom: 4 }}>{clip.speaker}</div>}
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{clip.description}</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const }}>
                  {[msToLabel(clip.durationMs), clip.difficulty, total > 0 ? total + ' 句' : ''].filter(Boolean).map(tag => (
                    <span key={tag} style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: C.muted, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{tag}</span>
                  ))}
                  {progress && completed > 0 && (
                    <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>已学 {completed}/{total}</span>
                  )}
                  {isLocked && (
                    <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.goldBg, color: C.gold, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.2)' }}>✦ 会员</span>
                  )}
                </div>
              </div>

              {/* Arrow / lock */}
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isLocked ? C.cream : C.black, color: isLocked ? C.muted : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isLocked ? 14 : 14, flexShrink: 0 }}>
                {isLocked ? '🔒' : '▶'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Member gate drawer */}
      {showMemberGate && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowMemberGate(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto', borderRadius: '32px 32px 0 0', padding: '24px 24px calc(36px + env(safe-area-inset-bottom, 0px))', background: theme === 'dark' ? '#282440' : '#fff', boxShadow: '0 -8px 40px rgba(32,24,21,0.15)', zIndex: 10 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: C.line, margin: '0 auto 20px' }} />
            <div style={{ textAlign: 'center' as const, marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✦</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.ink, marginBottom: 6 }}>开启完整影子跟读</div>
              <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>影子跟读是会员专属核心功能</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 20 }}>
              {['全部精选片段无限学习', '单句循环 + 录音对比', '词语点击查词 + 保存词库', '学习进度云端同步'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: C.ink }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.mintBg, color: C.mintText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>
            <button onClick={() => setShowMemberGate(false)} style={{ width: '100%', height: 50, borderRadius: 999, background: C.black, color: '#fff', fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer', marginBottom: 10 }}>了解会员权益</button>
            <button onClick={() => setShowMemberGate(false)} style={{ width: '100%', height: 44, borderRadius: 999, background: 'transparent', color: C.muted, fontSize: 13, fontWeight: 700, border: '1px solid ' + C.line, cursor: 'pointer' }}>暂不开通</button>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }`}</style>
    </div>
  );
}
