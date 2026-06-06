'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { shadowingClips, ShadowingToken } from '@/data/shadowingClips';

const C = {
  ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8',
  pinkSoft: '#fff0f5', mint: '#aee3d8', cream: '#fff8f4', black: '#201815',
  mintBg: '#eaf8f5', mintText: '#4e746d', rowLabel: '#a08f87', zhText: '#7e6b64',
  roman: '#6a5750', shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)',
};

function msToTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export default function ShadowingClipPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const clip = shadowingClips.find(c => c.id === id) ?? shadowingClips[0];
  const subtitles = clip.subtitles;
  const totalSubs = subtitles.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [looping, setLooping] = useState(false);
  const [speed, setSpeed] = useState<'1.0x' | '0.75x' | '1.25x'>('1.0x');
  const [wordModal, setWordModal] = useState<ShadowingToken | null>(null);
  const [recordState, setRecordState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopingRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeSub = subtitles[activeIdx];

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
    return () => { if (stopTimerRef.current) clearInterval(stopTimerRef.current); };
  }, [clip.videoUrl]);

  // auto-scroll active card into view
  useEffect(() => {
    const el = cardRefs.current[activeIdx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeIdx]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2200); }

  function cycleSpeed() {
    const next = speed === '1.0x' ? '0.75x' : speed === '0.75x' ? '1.25x' : '1.0x';
    setSpeed(next);
    if (videoRef.current) videoRef.current.playbackRate = next === '0.75x' ? 0.75 : next === '1.25x' ? 1.25 : 1.0;
  }

  function playSegment(sub: typeof activeSub, slow = false) {
    const video = videoRef.current;
    if (!video) { showToast('视频加载中，请稍候'); return; }
    const rate = slow ? 0.75 : speed === '0.75x' ? 0.75 : speed === '1.25x' ? 1.25 : 1.0;
    video.playbackRate = rate;
    video.currentTime = sub.startMs / 1000;
    setIsPlaying(true);
    video.play();
    if (stopTimerRef.current) clearInterval(stopTimerRef.current);
    stopTimerRef.current = setInterval(() => {
      if (video.currentTime * 1000 >= sub.endMs) {
        if (loopingRef.current) {
          video.currentTime = sub.startMs / 1000;
          video.play();
        } else {
          video.pause();
          setIsPlaying(false);
          if (stopTimerRef.current) clearInterval(stopTimerRef.current);
        }
      }
    }, 50);
  }

  function toggleLoop() {
    const next = !looping;
    loopingRef.current = next;
    setLooping(next);
    if (next) playSegment(activeSub);
    else {
      videoRef.current?.pause();
      setIsPlaying(false);
      if (stopTimerRef.current) clearInterval(stopTimerRef.current);
    }
  }

  async function handleRecord() {
    if (recordState === 'recording') { mediaRecorderRef.current?.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedUrl(URL.createObjectURL(blob));
        setRecordState('recorded');
        try {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            await db.recordings.add({
              type: 'shadowing', source_id: activeSub.id, source_type: 'shadowing',
              line_id: activeSub.id, audio_data: reader.result as string,
              duration_ms: blob.size, korean: activeSub.korean,
              created_at: new Date().toISOString()
            });
          };
        } catch {}
      };
      mr.start();
      setRecordState('recording');
    } catch { showToast('请允许麦克风权限后重试'); }
  }

  function playRecording() {
    if (!recordedUrl) return;
    if (isPlayingRecording) { recordingAudioRef.current?.pause(); setIsPlayingRecording(false); return; }
    const audio = new Audio(recordedUrl);
    recordingAudioRef.current = audio;
    audio.onended = () => setIsPlayingRecording(false);
    audio.play(); setIsPlayingRecording(true);
  }

  async function handleSaveSentence(sub: typeof activeSub) {
    if (savedSentences.has(sub.id)) { showToast('已保存'); return; }
    try {
      await db.sentences.add({
        korean: sub.korean, chinese: sub.chinese, source_type: 'shadowing',
        source_id: clip.id, source_title: clip.title,
        start_time: sub.startMs, end_time: sub.endMs,
        created_at: new Date().toISOString()
      });
      setSavedSentences(prev => new Set([...prev, sub.id]));
      showToast('已保存到我的句子');
    } catch { showToast('保存失败，请先登录'); }
  }

  async function handleSaveWord(token: ShadowingToken) {
    if (savedWords.has(token.surface)) { showToast('已保存'); return; }
    try {
      await db.words.add({
        id: 'shadowing-' + token.surface + '-' + Date.now(),
        word: token.surface, pronunciation: '', meaning: token.meaning,
        partOfSpeech: token.partOfSpeech,
        examples: token.note ? [{ text: token.note, translation: '', source: 'manual' as const }] : [],
        mastery: 'new' as const, srsLevel: 0, nextReview: Date.now(),
        easeFactor: 2.5, interval: 1, createdAt: Date.now(), lastReviewed: null
      });
      setSavedWords(prev => new Set([...prev, token.surface]));
      showToast('已保存到我的词库'); setWordModal(null);
    } catch { showToast('保存失败，请先登录'); }
  }

  return (
    <div style={{ position: 'relative', paddingBottom: 152 }}>
      {toast && (
        <div style={{
          position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
          background: C.black, color: '#fff', borderRadius: 999,
          padding: '9px 20px', fontSize: 13, fontWeight: 700,
          zIndex: 300, whiteSpace: 'nowrap', boxShadow: C.strong
        }}>{toast}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button onClick={() => router.push('/shadowing')} style={{
          width: 38, height: 38, borderRadius: 16, background: '#fff',
          border: '1px solid ' + C.line, fontSize: 20, color: '#4d3933',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0
        }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{clip.title}</div>
          {'speaker' in clip && clip.speaker && <div style={{ fontSize: 13, color: '#f0799b', fontWeight: 700, marginTop: 1 }}>{clip.speaker}</div>}
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 2 }}>
            {clip.durationLabel} · {clip.difficulty} · {totalSubs} 句
          </div>
        </div>
      </div>

      {/* Video player — local mp4 for picture, same file for segment control */}
      <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 14, background: '#000', position: 'relative' }}>
        <video
          ref={videoRef}
          src={clip.videoUrl}
          controls
          playsInline
          preload="auto"
          style={{ width: '100%', display: 'block', maxHeight: 360 }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      <div style={{
        borderRadius: 24, padding: 14, background: C.cream,
        border: '1px solid rgba(239,224,217,.9)', marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => { if (isPlaying) { videoRef.current?.pause(); setIsPlaying(false); } else playSegment(activeSub); }} style={{
            width: 44, height: 44, borderRadius: '50%', background: C.black,
            color: '#fff', fontSize: 16, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{isPlaying ? '⏸' : '▶'}</button>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 14, display: 'block', color: C.ink }}>
              {msToTime(activeSub.startMs)} – {msToTime(activeSub.endMs)}
            </strong>
            <span style={{ marginTop: 4, color: C.muted, fontSize: 11, fontWeight: 700, display: 'block' }}>
              第 {activeIdx + 1} 句 / 共 {totalSubs} 句
            </span>
          </div>
          <button onClick={cycleSpeed} style={{
            height: 34, borderRadius: 999, padding: '0 11px', background: '#fff',
            color: '#5a4640', border: '1px solid ' + C.line, fontSize: 12,
            fontWeight: 800, cursor: 'pointer'
          }}>{speed}</button>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: '#eadcd5', marginTop: 12, overflow: 'hidden' }}>
          <div style={{
            width: ((activeIdx + 1) / totalSubs * 100) + '%', height: '100%',
            borderRadius: 999, background: 'linear-gradient(90deg, ' + C.mint + ', ' + C.pink + ')',
            transition: 'width .3s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '4px 2px 12px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink }}>{'字幕跟读卡'}</h2>
        <span style={{ fontSize: 12, color: '#f0799b', fontWeight: 700 }}>{totalSubs} {'句'}</span>
      </div>

      {subtitles.map((sub, i) => {
        const isActive = i === activeIdx;
        return (
          <div key={sub.id} ref={el => { cardRefs.current[i] = el; }} onClick={() => setActiveIdx(i)} style={{
            borderRadius: 30, background: '#fff',
            border: '1px solid ' + (isActive ? 'rgba(255,127,168,.40)' : C.line),
            boxShadow: isActive ? '0 18px 48px rgba(255,127,168,.16)' : C.shadow,
            marginBottom: 12, overflow: 'hidden', cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '13px 15px 0' }}>
              <div style={{ height: 26, padding: '0 10px', borderRadius: 999, background: C.black, color: '#fff', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>{i + 1} / {totalSubs}</div>
              <div style={{ height: 26, padding: '0 10px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>{msToTime(sub.startMs)} – {msToTime(sub.endMs)}</div>
            </div>
            <div style={{ padding: '14px 15px 15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start', paddingBottom: 12, borderBottom: '1px solid rgba(239,224,217,.76)' }}>
                <div>
                  <div style={{ color: C.rowLabel, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{'韩文原声'}</div>
                  <div style={{ fontSize: 20, lineHeight: 1.45, fontWeight: 800, letterSpacing: '-.35px', wordBreak: 'keep-all' }}>
                    {sub.tokens ? sub.tokens.map((token, ti) => (
                      <span key={ti} onClick={e => { e.stopPropagation(); setWordModal(token); }} style={{ display: 'inline-flex', margin: '2px 2px', padding: '2px 6px', borderRadius: 8, background: C.pinkSoft, color: '#5a423b', border: '1px solid rgba(255,127,168,.18)', cursor: 'pointer' }}>{token.surface}</span>
                    )) : <span style={{ color: C.ink }}>{sub.korean}</span>}
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); playSegment(sub, false); }} style={{ height: 36, minWidth: 58, borderRadius: 999, fontSize: 12, fontWeight: 800, background: C.black, color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', whiteSpace: 'nowrap' }}>{'▶'} {'原声'}</button>
              </div>
{sub.chinese ? <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start', padding: '12px 0', borderBottom: '1px solid rgba(239,224,217,.76)' }}>
                    <div>
                      <div style={{ color: C.rowLabel, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{'中文意思'}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.58, color: C.zhText }}>{sub.chinese}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); playSegment(sub, true); }} style={{ height: 36, minWidth: 58, borderRadius: 999, fontSize: 12, fontWeight: 800, background: C.pinkSoft, color: '#f0799b', border: '1px solid rgba(255,127,168,.18)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', whiteSpace: 'nowrap' }}>{'🐢'} {'慢速'}</button>
                  </div>
                </> : <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start', padding: '12px 0', borderBottom: '1px solid rgba(239,224,217,.76)' }}>
                    <div />
                    <button onClick={e => { e.stopPropagation(); playSegment(sub, true); }} style={{ height: 36, minWidth: 58, borderRadius: 999, fontSize: 12, fontWeight: 800, background: C.pinkSoft, color: '#f0799b', border: '1px solid rgba(255,127,168,.18)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', whiteSpace: 'nowrap' }}>{'🐢'} {'慢速'}</button>
                  </div>}
{sub.shadowingTip ? <div style={{ padding: '12px 0 0' }}>
                <div style={{ color: C.rowLabel, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{'跟读提示'}</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: C.roman, fontWeight: 700 }}>{sub.shadowingTip}</div>
              </div> : null}
{sub.vocabPills ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {sub.vocabPills.map(p => (
                  <span key={p} style={{ height: 26, padding: '0 9px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: '#7a665f', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{p}</span>
                ))}
              </div> : null}
              {isActive && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 13 }}>
                  <button onClick={e => { e.stopPropagation(); if (sub.tokens?.[0]) setWordModal(sub.tokens[0]); else showToast('词汇解析仅限精选片段'); }} style={{ height: 40, borderRadius: 999, border: '1px solid ' + C.line, background: '#fff', fontSize: 12, fontWeight: 800, color: '#5a4640', cursor: 'pointer' }}>{'🔑'} {'关键词'}</button>
                  <button onClick={e => { e.stopPropagation(); handleRecord(); }} style={{ height: 40, borderRadius: 999, border: 'none', background: recordState === 'recording' ? '#e47a94' : C.black, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{recordState === 'recording' ? '⏹ 停止' : '🎤 录音'}</button>
                  <button onClick={e => { e.stopPropagation(); handleSaveSentence(sub); }} style={{ height: 40, borderRadius: 999, border: '1px solid ' + C.line, background: savedSentences.has(sub.id) ? C.mintBg : '#fff', fontSize: 12, fontWeight: 800, color: savedSentences.has(sub.id) ? C.mintText : '#5a4640', cursor: 'pointer' }}>{savedSentences.has(sub.id) ? '✓ 已保存' : '💾 保存句'}</button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div style={{ borderRadius: 32, padding: 18, background: C.black, color: '#fff', marginTop: 4 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{'跟读录音'}</h3>
        <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>
          {'先听原声，再录自己的声音，方便反复对比。'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <button onClick={handleRecord} style={{ height: 44, borderRadius: 999, fontSize: 12, fontWeight: 800, border: 'none', cursor: 'pointer', background: recordState === 'recording' ? '#e47a94' : 'linear-gradient(135deg, #ff7fa8, #ffabc3)', color: '#fff' }}>
            {recordState === 'recording' ? '⏹ 停止录音' : recordState === 'recorded' ? '🔄 重新录音' : '🎤 开始录音'}
          </button>
          <button onClick={playRecording} disabled={!recordedUrl} style={{ height: 44, borderRadius: 999, fontSize: 12, fontWeight: 800, border: 'none', cursor: recordedUrl ? 'pointer' : 'not-allowed', background: 'rgba(255,255,255,.12)', color: '#fff', opacity: recordedUrl ? 1 : 0.5 }}>
            {isPlayingRecording ? '⏸ 暂停' : '▶ 播放我的录音'}
          </button>
        </div>
      </div>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', height: 72, padding: '10px 18px', background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid ' + C.line, zIndex: 100 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, height: '100%', maxWidth: 640, margin: '0 auto' }}>
          <button onClick={() => { loopingRef.current = false; setLooping(false); setActiveIdx(i => Math.max(i - 1, 0)); }} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: 'pointer' }}>{'‹'} {'上一句'}</button>
          <button onClick={toggleLoop} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: looping ? C.pink : C.black, color: '#fff', border: 'none', cursor: 'pointer' }}>{looping ? '⏹ 停止循环' : '🔁 循环当前句'}</button>
          <button onClick={() => { loopingRef.current = false; setLooping(false); setActiveIdx(i => Math.min(i + 1, totalSubs - 1)); }} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: 'pointer' }}>{'下一句'} {'›'}</button>
        </div>
      </div>

      {wordModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setWordModal(null)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, borderRadius: '32px 32px 0 0', padding: '22px 22px 36px', background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(20px)', boxShadow: '0 24px 72px rgba(32,24,21,.24)', zIndex: 10 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, borderRadius: 999, background: C.line, margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: C.ink, margin: 0 }}>{wordModal.surface}</h2>
                <div style={{ marginTop: 6, fontSize: 16, fontWeight: 800, color: '#f0799b' }}>{wordModal.meaning}</div>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.58, marginTop: 6 }}>
                  {'원형'}: {wordModal.baseForm} &middot; {wordModal.partOfSpeech}
                </p>
                {wordModal.note && (
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.58, marginTop: 4 }}>{'搭配'}: {wordModal.note}</p>
                )}
              </div>
              <button onClick={() => setWordModal(null)} style={{ width: 32, height: 32, borderRadius: 999, background: C.cream, border: 'none', cursor: 'pointer', fontSize: 16, color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'✕'}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 18 }}>
              <button onClick={() => handleSaveWord(wordModal)} style={{ height: 44, borderRadius: 999, fontSize: 13, fontWeight: 800, background: savedWords.has(wordModal.surface) ? C.mintBg : C.black, color: savedWords.has(wordModal.surface) ? C.mintText : '#fff', border: 'none', cursor: 'pointer' }}>
                {savedWords.has(wordModal.surface) ? '✓ 已保存' : '➕ 保存到我的词'}
              </button>
              <button onClick={() => setWordModal(null)} style={{ height: 44, borderRadius: 999, fontSize: 13, fontWeight: 800, background: C.cream, color: '#5a4640', border: '1px solid ' + C.line, cursor: 'pointer' }}>{'关闭'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
