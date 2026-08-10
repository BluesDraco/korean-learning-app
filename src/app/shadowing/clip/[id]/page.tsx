'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { speak } from '@/lib/tts';
import { useShadowingPlayer } from '@/hooks/useShadowingPlayer';
import YouTubePlayer from '@/components/shadowing/YouTubePlayer';
import type { ShadowingClip, ShadowingToken } from '@/types/shadowing';

function msToTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export default function ShadowingClipPage() {
  const { theme } = useTheme();
  const LIGHT_C = {
    ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8',
    pinkSoft: '#fff0f5', bg: '#fffbf7', mint: '#aee3d8', mintBg: '#eaf8f5',
    cream: '#fff8f4', black: '#201815', mintText: '#4e746d', card: '#fff',
    shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)',
    navBg: 'rgba(255,251,247,0.96)', gold: '#C9A84C', goldBg: 'rgba(201,168,76,0.12)',
  };
  const DARK_C = {
    ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8',
    pinkSoft: '#2D2848', bg: '#1E1B2E', mint: '#4A6058', mintBg: '#1E3530',
    cream: '#232040', black: '#3A3060', mintText: '#5ecfb8', card: '#282440',
    shadow: '0 16px 42px rgba(0,0,0,.30)', strong: '0 28px 72px rgba(0,0,0,.45)',
    navBg: 'rgba(30,27,46,0.96)', gold: '#C9A84C', goldBg: 'rgba(201,168,76,0.12)',
  };
  const C = theme === 'dark' ? DARK_C : LIGHT_C;

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [clip, setClip] = useState<ShadowingClip | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [wordLookup, setWordLookup] = useState<Record<string, { meaning: string; pos: string; usage: string; example: string }>>({});
  const [lookingUp, setLookingUp] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const segments = clip?.segments ?? [];
  const player = useShadowingPlayer({ segments, clipId: id ?? '' });

  useEffect(() => {
    if (!id) return;
    fetch('/api/shadowing/clips/' + id)
      .then(r => r.json())
      .then(data => { setClip(data.clip); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  // Restore saved state from IndexedDB on load
  useEffect(() => {
    if (!segments.length) return;
    const segIds = new Set(segments.map(s => s.id));
    db.sentences.toArray().then(rows => {
      const saved = new Set(rows.filter(r => r.source_id === (clip?.id ?? '')).map(r => {
        const match = segments.find(s => s.korean === r.korean && s.startMs === r.start_time);
        return match?.id ?? '';
      }).filter(Boolean));
      if (saved.size > 0) setSavedSentences(saved);
    }).catch(() => {});
    db.words.toArray().then(rows => {
      const surfaces = new Set(rows.map(r => r.word));
      const savedW = new Set(segments.flatMap(s => s.tokens ?? []).map(t => t.surface).filter(s => surfaces.has(s)));
      if (savedW.size > 0) setSavedWords(savedW);
    }).catch(() => {});
  }, [segments, clip?.id]);

  const { user } = useAuth();
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced Turso sync for logged-in users
  const syncProgress = useCallback(() => {
    if (!user || !id || segments.length === 0) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      try {
        const saved = localStorage.getItem('shadowing_progress_' + id);
        if (!saved) return;
        const p = JSON.parse(saved);
        fetch('/api/shadowing/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clipId: id,
            completedSegs: p.completedSegs ?? [],
            lastSegIndex: p.lastSegIndex ?? 0,
            status: p.status ?? 'in_progress',
            recordedCount: p.recordedCount ?? 0,
            savedWordCount: p.savedWordCount ?? 0,
          }),
        }).catch(() => {});
      } catch {}
    }, 2000);
  }, [user, id, segments.length]);

  useEffect(() => {
    syncProgress();
  }, [player.activeIdx, syncProgress]);

  useEffect(() => {
    return () => { if (syncTimerRef.current) clearTimeout(syncTimerRef.current); };
  }, []);

  useEffect(() => {
    const el = cardRefs.current[player.activeIdx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [player.activeIdx]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2200); }

  async function handleSaveSentence() {
    const seg = segments[player.activeIdx];
    if (!seg) return;
    if (savedSentences.has(seg.id)) { showToast('已保存到我的句子'); return; }
    try {
      await db.sentences.add({
        korean: seg.korean, chinese: seg.chinese,
        source_type: 'shadowing', source_id: clip?.id ?? '',
        source_title: clip?.title ?? '',
        start_time: seg.startMs, end_time: seg.endMs,
        created_at: new Date().toISOString(),
      });
      setSavedSentences(prev => new Set([...prev, seg.id]));
      showToast('已保存到我的句子');
    } catch { showToast('保存失败，请重试'); }
  }

  async function handleSaveWord(token: ShadowingToken) {
    if (savedWords.has(token.surface)) { showToast('已保存'); return; }
    try {
      const existing = await db.words.where('word').equals(token.surface).first();
      if (!existing) {
        await db.words.add({
          id: 'shadowing-' + token.surface + '-' + Date.now(),
          word: token.surface, pronunciation: token.pronunciation ?? '',
          meaning: token.meaning, partOfSpeech: token.partOfSpeech ?? '',
          examples: token.example ? [{ text: token.example, translation: '', source: 'manual' as const }] : [],
          mastery: 'new' as const, srsLevel: 0, nextReview: Date.now(),
          easeFactor: 2.5, interval: 1, createdAt: Date.now(), lastReviewed: null,
        });
      }
      setSavedWords(prev => new Set([...prev, token.surface]));
      showToast('已保存到词库');
      player.closeToken();
    } catch { showToast('保存失败，请重试'); }
  }

  async function lookupToken(token: ShadowingToken) {
    player.openToken(token);
    if (wordLookup[token.surface]) return;
    setLookingUp(token.surface);
    try {
      const res = await fetch('/api/ai/word-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: token.surface }),
      });
      const data = await res.json();
      if (data.result) setWordLookup(prev => ({ ...prev, [token.surface]: data.result }));
    } catch {} finally { setLookingUp(null); }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: C.muted, fontSize: 14 }}>
      加载中...
    </div>
  );
  if (!clip) return <div style={{ padding: 24, color: C.ink }}>片段不存在</div>;

  const activeSeg = segments[player.activeIdx];
  const totalSegs = segments.length;
  const progressPct = totalSegs > 0 ? ((player.activeIdx + 1) / totalSegs) * 100 : 0;

  return (
    <div style={{ position: 'relative', background: C.bg, minHeight: '100vh', paddingBottom: 'calc(160px + env(safe-area-inset-bottom, 0px))' }}>

      {toast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: C.black, color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 300, whiteSpace: 'nowrap', boxShadow: C.strong }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 8px', background: C.bg }}>
        <button onClick={() => router.push('/shadowing')} style={{ width: 36, height: 36, borderRadius: 14, background: C.card, border: '1px solid ' + C.line, fontSize: 18, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{clip.title}</div>
          {clip.speaker && <div style={{ fontSize: 12, color: '#f0799b', fontWeight: 700, marginTop: 1 }}>{clip.speaker}</div>}
        </div>
        <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: C.goldBg, border: '1px solid rgba(201,168,76,0.25)', color: C.gold, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', flexShrink: 0 }}>✦ PRO</div>
      </div>

      {/* YouTube Player */}
      <YouTubePlayer
        videoId={clip.youtubeId}
        playerId={player.PLAYER_ID}
        onTimeUpdate={player.handleTimeUpdate}
        onStateChange={player.handleStateChange}
      />

      {/* Progress */}
      <div style={{ padding: '10px 16px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>第 {player.activeIdx + 1} 句 / 共 {totalSegs} 句</span>
          <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>
            {activeSeg ? msToTime(activeSeg.startMs) + ' – ' + msToTime(activeSeg.endMs) : ''}
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 999, background: C.line, overflow: 'hidden' }}>
          <div style={{ width: progressPct + '%', height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,' + C.mint + ',' + C.pink + ')', transition: 'width .3s ease' }} />
        </div>
      </div>

      {/* Speed + mode */}
      <div style={{ display: 'flex', gap: 8, padding: '4px 16px 10px' }}>
        <button onClick={player.cycleSpeed} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: C.card, border: '1px solid ' + C.line, fontSize: 11, fontWeight: 800, color: C.muted, cursor: 'pointer' }}>
          {player.speed}x
        </button>
        <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: C.card, border: '1px solid ' + C.line, fontSize: 11, fontWeight: 700, color: C.muted, display: 'flex', alignItems: 'center' }}>
          {player.playMode === 'free' ? '▶ 播放中' : player.playMode === 'listen' ? '👂 精听' : player.playMode === 'record' ? '🎙️ 录音中' : '🔍 查词'}
        </div>
      </div>

      {/* Segment cards */}
      <div style={{ padding: '0 14px' }}>
        {segments.map((seg, i) => {
          const isActive = i === player.activeIdx;
          return (
            <div
              key={seg.id}
              ref={el => { cardRefs.current[i] = el; }}
              onClick={() => player.selectSegment(i)}
              style={{
                borderRadius: isActive ? 28 : 20,
                background: isActive ? 'linear-gradient(145deg,#201815,#3d2820)' : C.card,
                border: isActive ? '1.5px solid rgba(255,127,168,0.35)' : '1px solid ' + C.line,
                boxShadow: isActive ? '0 20px 52px rgba(32,24,21,0.28)' : C.shadow,
                marginBottom: 10, overflow: 'hidden', cursor: 'pointer',
                opacity: isActive ? 1 : 0.85, transition: 'all .25s ease',
              }}
            >
              <div style={{ padding: isActive ? '16px 16px 14px' : '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isActive ? 10 : 6 }}>
                  <div style={{ height: 22, padding: '0 9px', borderRadius: 999, background: isActive ? 'rgba(255,255,255,0.15)' : C.black, color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>
                    {i + 1}/{totalSegs}
                  </div>
                  <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.45)' : C.muted, fontWeight: 700 }}>
                    {msToTime(seg.startMs)} – {msToTime(seg.endMs)}
                  </div>
                </div>

                <div style={{ fontSize: isActive ? 21 : 16, fontWeight: 800, lineHeight: 1.5, wordBreak: 'keep-all', color: isActive ? '#fff' : C.ink, marginBottom: isActive ? 8 : 0 }}>
                  {isActive && seg.tokens && seg.tokens.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {seg.tokens.map((token, ti) => (
                        <span key={ti} onClick={e => { e.stopPropagation(); lookupToken(token); }} style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontSize: 20, fontWeight: 800 }}>
                          {token.surface}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span>{seg.korean}</span>
                  )}
                </div>

                {isActive && seg.chinese && (
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 10 }}>{seg.chinese}</div>
                )}
                {isActive && seg.shadowingTip && (
                  <div style={{ fontSize: 12, color: 'rgba(174,227,216,0.85)', fontWeight: 700, marginBottom: 10 }}>💡 {seg.shadowingTip}</div>
                )}
                {isActive && seg.vocabPills && seg.vocabPills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                    {seg.vocabPills.map(p => (
                      <span key={p} style={{ height: 24, padding: '0 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>{p}</span>
                    ))}
                  </div>
                )}

                {isActive && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7, marginTop: 4 }}>
                    <button onClick={e => { e.stopPropagation(); player.playOriginal(false); }} style={{ height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>▶ 原声</button>
                    <button onClick={e => { e.stopPropagation(); player.playOriginal(true); }} style={{ height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>🐢 慢速</button>
                    <button onClick={e => { e.stopPropagation(); player.handleRecord(); }} style={{ height: 38, borderRadius: 999, border: 'none', background: player.recordState === 'recording' ? '#e47a94' : 'linear-gradient(135deg,#ff7fa8,#ffabc3)', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                      {player.recordState === 'recording' ? '⏹ 停止' : '🎤 跟读'}
                    </button>
                    <button onClick={e => { e.stopPropagation(); handleSaveSentence(); }} style={{ height: 38, borderRadius: 999, border: 'none', background: savedSentences.has(seg.id) ? 'rgba(174,227,216,0.2)' : 'rgba(255,255,255,0.08)', color: savedSentences.has(seg.id) ? '#aee3d8' : 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                      {savedSentences.has(seg.id) ? '✓ 已存' : '💾 保存'}
                    </button>
                  </div>
                )}

                {isActive && player.recordState === 'recorded' && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 7 }}>
                    <button onClick={e => { e.stopPropagation(); player.playRecording(); }} style={{ flex: 1, height: 36, borderRadius: 999, border: 'none', background: player.isPlayingRecording ? 'rgba(255,127,168,0.25)' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                      {player.isPlayingRecording ? '⏸ 暂停' : '▶ 我的录音'}
                    </button>
                    <button onClick={e => { e.stopPropagation(); player.handleRecord(); }} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>重录</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="md:left-[108px] md:!bottom-0" style={{ position: 'fixed', left: 0, right: 0, bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', height: 72, padding: '10px 14px', background: C.navBg, backdropFilter: 'blur(16px)', borderTop: '1px solid ' + C.line, zIndex: 60 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 8, height: '100%', maxWidth: 640, margin: '0 auto' }}>
          {player.playMode === 'free' ? (
            // free mode: prev | play/pause | next
            <>
              <button onClick={player.prevSentence} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>‹ 上一句</button>
              <button onClick={player.toggleFreePlay} style={{ borderRadius: 18, fontSize: 13, fontWeight: 800, background: C.black, color: '#fff', border: 'none', cursor: 'pointer' }}>
                {player.isPlaying ? '⏸ 暂停' : '▶ 播放'}
              </button>
              <button onClick={player.nextSentence} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>下一句 ›</button>
            </>
          ) : player.playMode === 'record' ? (
            // record mode: stop recording first before any navigation
            <>
              <button onClick={() => { player.stopRecord(); player.prevSentence(); }} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>‹ 上一句</button>
              <button onClick={() => player.stopRecord()} style={{ borderRadius: 18, fontSize: 13, fontWeight: 800, background: '#e47a94', color: '#fff', border: 'none', cursor: 'pointer' }}>⏹ 停止录音</button>
              <button onClick={() => player.stopRecord(() => player.playOriginal(false))} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>▶ 原声</button>
            </>
          ) : (
            // listen / analyze mode: slow | loop | normal speed
            <>
              <button onClick={() => player.playOriginal(true)} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>🐢 慢速</button>
              <button onClick={player.toggleLoop} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: player.isLooping ? C.pink : C.black, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: player.isLooping ? '0 0 0 2px ' + C.pink : 'none' }}>
                {player.isLooping ? '⏹ 停止循环' : '🔁 循环'}
              </button>
              <button onClick={() => player.playOriginal(false)} style={{ borderRadius: 18, fontSize: 12, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>▶ 原速</button>
            </>
          )}
        </div>
      </div>

      {/* Word drawer */}
      {player.playMode === 'analyze' && player.selectedToken && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={player.closeToken}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto', borderRadius: '32px 32px 0 0', padding: '20px 20px calc(32px + env(safe-area-inset-bottom, 0px))', background: theme === 'dark' ? '#282440' : '#fff', boxShadow: '0 -8px 40px rgba(32,24,21,0.12)', zIndex: 10 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: C.line, margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.ink }}>{player.selectedToken.surface}</div>
                {lookingUp === player.selectedToken.surface ? (
                  <div style={{ height: 16, width: 120, borderRadius: 8, background: C.line, marginTop: 8 }} />
                ) : wordLookup[player.selectedToken.surface] ? (
                  <>
                    <div style={{ fontSize: 18, color: '#f0799b', fontWeight: 800, marginTop: 4 }}>{wordLookup[player.selectedToken.surface].meaning}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{wordLookup[player.selectedToken.surface].pos}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 18, color: '#f0799b', fontWeight: 800, marginTop: 4 }}>{player.selectedToken.meaning}</div>
                    {player.selectedToken.partOfSpeech && <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{player.selectedToken.partOfSpeech}</div>}
                  </>
                )}
              </div>
              <button onClick={player.closeToken} style={{ width: 32, height: 32, borderRadius: 999, background: C.cream, border: 'none', cursor: 'pointer', fontSize: 14, color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            {(wordLookup[player.selectedToken.surface]?.usage || player.selectedToken.usageNote) && (
              <div style={{ padding: '10px 12px', background: C.cream, borderRadius: 14, marginBottom: 12, fontSize: 13, color: C.ink, lineHeight: 1.65 }}>
                {wordLookup[player.selectedToken.surface]?.usage || player.selectedToken.usageNote}
              </div>
            )}
            {(wordLookup[player.selectedToken.surface]?.example || player.selectedToken.example) && (
              <div style={{ padding: '10px 12px', background: C.mintBg, borderRadius: 14, marginBottom: 14, fontSize: 13, color: C.mintText, lineHeight: 1.65 }}>
                {wordLookup[player.selectedToken.surface]?.example || player.selectedToken.example}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button onClick={() => handleSaveWord(player.selectedToken!)} style={{ height: 44, borderRadius: 999, fontSize: 13, fontWeight: 800, background: savedWords.has(player.selectedToken.surface) ? C.mintBg : C.black, color: savedWords.has(player.selectedToken.surface) ? C.mintText : '#fff', border: 'none', cursor: 'pointer' }}>
                {savedWords.has(player.selectedToken.surface) ? '✓ 已保存' : '➕ 保存到词库'}
              </button>
              <button onClick={() => speak(player.selectedToken!.surface)} style={{ height: 44, borderRadius: 999, fontSize: 13, fontWeight: 800, background: C.cream, color: C.ink, border: '1px solid ' + C.line, cursor: 'pointer' }}>🔊 朗读</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }`}</style>
    </div>
  );
}
