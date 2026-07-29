'use client';

import { useState, useEffect, useCallback, useRef, use } from 'react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Mic, Square, Trash2, Bookmark, Check } from 'lucide-react';
import { getStage } from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { recordPhoneticStep } from '@/lib/lesson/recordPhoneticStep';
import { ensurePhoneticSrs } from '@/lib/phonetics/srs';
import { iconBtn, btnPrimary, btnGhost, tipBox } from '@/components/phonetics/step/shared';
import StageErrorFallback from '@/components/phonetics/step/StageErrorFallback';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { romanize } from '@/lib/dictionary';
import { useAuth } from '@/components/AuthProvider';
import { saveRecording } from '@/lib/audio/saveRecording';
import { describeMicError, parseErrorKey, precheckRecordingEnv } from '@/lib/audio/recorder';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Tab = 'pronounce' | 'memory' | 'confuse';

const LETTER_CSS = `
  .ph-ds-letter { max-width: 720px; }
  @media (min-width: 1024px) { .ph-ds-letter { max-width: 960px; } }
  .ph-letter-card { padding: 32px 28px 24px; }
  .ph-letter-card-inner { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; align-items: center; margin-bottom: 18px; }
  .ph-letter-big { font-size: clamp(80px, 14vw, 140px); font-weight: 900; line-height: 1; color: var(--color-ink-1); letter-spacing: -.04em; }
  .ph-letter-info { text-align: left; }
  /* 双栏仅在 ≥1400px 真桌面启用；iPad 横屏(1024~1366)保持单栏，避免右栏内滚吞按钮 */
  @media (min-width: 1400px) {
    .ph-ds-letter { max-width: 1080px; }
    .ph-letter-card { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 0; min-height: 600px; overflow: hidden; }
    .ph-letter-hero { padding: 48px 36px; background: linear-gradient(160deg, var(--color-pink-soft) 0%, var(--color-surface-1) 60%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; position: relative; }
    .ph-letter-hero .ph-letter-big { font-size: clamp(140px, 12vw, 180px); }
    .ph-letter-tabs-area { padding: 36px 32px; display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }
    .ph-letter-card-inner { grid-template-columns: 1fr; gap: 12px; margin-bottom: 0; text-align: center; }
    .ph-letter-info { text-align: center; }
  }
  @keyframes phPulseRing { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.8); opacity: 0; } }
`;

export default function LetterPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const { user } = useAuth();
  const { lang } = useLang();

  const [idx, setIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [tab, setTab] = useState<Tab>('pronounce');
  const recordedRef = useRef(false);

  const letter = stage?.letters[idx];

  const play = useCallback((text: string) => {
    unlockAudioContext();
    playPhoneticAudio(text, rate);
  }, [rate]);

  // 例词强制慢速，便于辨音
  const playExample = useCallback((text: string) => {
    unlockAudioContext();
    playPhoneticAudio(text, 0.7);
  }, []);

  useEffect(() => {
    setTab('pronounce');
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [idx]);

  if (!stage) return <StageErrorFallback msg={t('phonetics.stage_not_found', lang)} />;
  if (!letter) return <StageErrorFallback msg={t('phonetics.stage_not_open', lang)} />;

  const total = stage.letters.length;

  const handleReplayAudio = () => {
    play(letter.syllable);
  };

  const handleMastered = async () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
      return;
    }
    if (!recordedRef.current) {
      recordedRef.current = true;
      try { await recordPhoneticStep(stageId, 'letter', { studyMinutes: 3 }); } catch { /* ignore */ }
      // 把本阶段所有字母 ensure 进 SRS（已在则跳过）
      try {
        await Promise.all(stage.letters.map((l) => ensurePhoneticSrs(l.jamo, stageId, user?.id)));
      } catch { /* ignore */ }
    }
    router.push(`/phonetics/step/${stageId}/write`);
  };

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-ds-letter" style={{ margin: '0 auto', padding: '0 16px 96px' }}>
      <style>{LETTER_CSS}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: 12 }}>
        <button onClick={smartBack} aria-label={t('phonetics.letter_back_overview', lang)} style={iconBtn}><ArrowLeft size={18} /></button>
        <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: total }).map((_, i) => {
            const cls = i < idx ? 'done' : i === idx ? 'current' : 'locked';
            const bg = cls === 'done' ? 'var(--color-mint-base)' : cls === 'current' ? 'var(--color-pink-base)' : 'transparent';
            const border = cls === 'locked' ? '1.5px solid var(--color-border-3)' : 'none';
            const scale = cls === 'current' ? 'scale(1.4)' : 'scale(1)';
            const shadow = cls === 'current' ? '0 0 0 4px rgba(255,127,168,.15)' : 'none';
            const label = cls === 'done' ? t('phonetics.letter_dot_done', lang) : cls === 'current' ? t('phonetics.letter_dot_current', lang) : t('phonetics.letter_dot_locked', lang);
            return <span key={i} role="img" aria-label={t('phonetics.letter_dot_aria', lang, { n: i + 1, label })} style={{ width: 10, height: 10, borderRadius: '50%', background: bg, border, transform: scale, boxShadow: shadow, transition: 'all .3s' }} />;
          })}
        </div>
        {/* X 按钮移除 — 学习页不是模态框，一个返回按钮就够了 */}
        <div style={{ width: 44 }} />
      </div>

      <div className="ph-letter-card" style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 20px rgba(58,46,41,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base))' }} />
        <div className="ph-letter-hero">
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-pink-strong)', textAlign: 'center', marginBottom: 6 }}>
          ◆ Stage {stageId} · {t('phonetics.letter_counter', lang, { n: idx + 1, total })}
        </div>

        <div className="ph-letter-card-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="ph-letter-big">
              {letter.jamo}
            </div>
          </div>
          <div className="ph-letter-info">
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600, fontSize: 30, color: 'var(--color-pink-strong)', lineHeight: 1 }}>{letter.romanization}</div>
            <div style={{ fontWeight: 500, fontSize: 18, color: 'var(--color-ink-2)', marginTop: 12 }}>{lang === 'en' ? letter.cnApproxEn ?? letter.cnApprox : letter.cnApprox}</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 2 }}>{t('phonetics.letter_approx_pronunciation', lang)}</div>
            <div style={{ height: 1, background: 'var(--color-border-1)', margin: '14px 0' }} />
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--color-ink-3)' }}>
              {t('phonetics.letter_stroke_count_prefix', lang)}<b style={{ color: 'var(--color-pink-strong)', fontFamily: 'serif', fontSize: 16 }}>{letter.strokes.length}</b>{t('phonetics.letter_stroke_count_suffix', lang)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--color-surface-3)', borderRadius: 12, marginTop: 10 }}>
              <svg width={40} height={32} viewBox="0 0 40 32" style={{ flexShrink: 0 }}>
                <ellipse cx={20} cy={16} rx={14} ry={10} fill="none" stroke="var(--color-pink-strong)" strokeWidth={2} />
                <circle cx={20} cy={16} r={5} fill="var(--color-pink-base)" opacity={0.3} />
              </svg>
              <div style={{ fontSize: 12, color: 'var(--color-ink-2)', lineHeight: 1.4 }}>
                <b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.letter_mouth_shape', lang)}</b>{t('phonetics.letter_colon', lang)}{lang === 'en' ? letter.mouthHintEn ?? letter.mouthHint : letter.mouthHint}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <button onClick={() => play(letter.syllable)} aria-label={t('phonetics.letter_play_pronunciation', lang)} style={playBtn}>
              <Play size={24} fill="#fff" />
            </button>
            <span aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--color-pink-base)', pointerEvents: 'none', animation: 'phPulseRing 2s cubic-bezier(.16,1,.3,1) infinite' }} />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setRate(1)} style={{ ...speedBtn, ...(rate === 1 ? speedBtnActive : {}) }}>{t('phonetics.letter_speed_normal', lang)}</button>
            <button onClick={() => setRate(0.6)} style={{ ...speedBtn, ...(rate === 0.6 ? speedBtnActive : {}) }}>{t('phonetics.letter_speed_slow', lang)}</button>
          </div>
        </div>
        </div>{/* /ph-letter-hero */}

        <div className="ph-letter-tabs-area">

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16, padding: 4, background: 'var(--color-surface-1)', borderRadius: 12, border: '1px solid var(--color-border-1)' }}>
          {([
            ['pronounce', `🗣 ${t('phonetics.letter_tab_pronounce', lang)}`],
            ['memory', `🧠 ${t('phonetics.letter_tab_memory', lang)}`],
            ['confuse', `⚖ ${t('phonetics.letter_tab_confuse', lang)}`],
          ] as const).map(([k, name]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: '8px 4px', textAlign: 'center',
                fontSize: 12.5, fontWeight: tab === k ? 700 : 500,
                background: tab === k ? 'var(--color-pink-base)' : 'transparent',
                color: tab === k ? '#fff' : 'var(--color-ink-3)',
                border: 'none', borderRadius: 8,
                boxShadow: tab === k ? '0 2px 6px rgba(255,127,168,.3)' : 'none',
                cursor: 'pointer', transition: 'all .2s',
              }}
            >{name}</button>
          ))}
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-ink-2)', minHeight: 90 }}>
          {tab === 'pronounce' && (
            <>
              <div><b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.letter_mouth_shape', lang)}</b>{t('phonetics.letter_colon', lang)}{lang === 'en' ? letter.mouthHintEn ?? letter.mouthHint : letter.mouthHint}</div>
              <div style={tipBox}>💡 <b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.letter_key_point', lang)}</b>{t('phonetics.letter_colon', lang)}{t('phonetics.letter_key_point_body', lang)}{letter.confused.jamo}{t('phonetics.letter_distinguish_from', lang)}{lang === 'en' ? letter.confused.tipEn ?? letter.confused.tip : letter.confused.tip}</div>
              <RecorderCompare key={letter.jamo} korean={letter.jamo} onPlayOriginal={() => play(letter.syllable)} />
            </>
          )}
          {tab === 'memory' && (
            <>
              <div style={{ fontSize: 15, lineHeight: 1.7, padding: '12px 14px', background: 'var(--color-surface-1)', border: '1px solid var(--color-border-1)', borderRadius: 10 }}>
                {lang === 'en' ? letter.mnemonicEn ?? letter.mnemonic : letter.mnemonic}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-ink-3)', marginTop: 14, marginBottom: 8 }}>
                {t('phonetics.letter_common_words_prefix', lang)}{letter.jamo}{t('phonetics.letter_common_words_suffix', lang)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                {letter.combos.map((c) => {
                  const roman = c.romanization || romanize(c.syllable);
                  return (
                    <button key={c.syllable} onClick={() => playExample(c.syllable)} style={exampleCard}>
                      <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-ink-1)' }}>{c.syllable}</div>
                      {roman && (
                        <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 12, color: 'var(--color-pink-strong)', marginTop: 2 }}>{roman}</div>
                      )}
                      {c.meaning && <div style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 2 }}>{lang === 'en' ? c.meaningEn ?? c.meaning : c.meaning}</div>}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {tab === 'confuse' && (
            <>
              {letter.jamo}{t('phonetics.letter_confuse_and', lang)}{letter.confused.jamo}{t('phonetics.letter_confuse_intro', lang)}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, marginTop: 10, alignItems: 'center' }}>
                <button onClick={() => play(letter.syllable)} style={confuseCol}>
                  <div style={{ fontWeight: 700, fontSize: 36, color: 'var(--color-ink-1)' }}>{letter.jamo}</div>
                  <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 16, color: 'var(--color-pink-strong)', marginTop: 4 }}>{letter.romanization}</div>
                </button>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: 'var(--color-ink-4)', fontSize: 14 }}>vs</span>
                <button onClick={() => play(letter.confused.syllable)} style={confuseCol}>
                  <div style={{ fontWeight: 700, fontSize: 36, color: 'var(--color-ink-1)' }}>{letter.confused.jamo}</div>
                  <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 16, color: 'var(--color-pink-strong)', marginTop: 4 }}>{letter.confused.syllable}</div>
                </button>
              </div>
              <div style={{ ...tipBox, marginTop: 10 }}>{lang === 'en' ? letter.confused.tipEn ?? letter.confused.tip : letter.confused.tip}</div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
          {idx > 0 && (
            <button onClick={() => setIdx(idx - 1)} style={btnGhost}>{t('phonetics.letter_prev_card', lang)}</button>
          )}
          <button onClick={handleReplayAudio} style={btnGhost}>{t('phonetics.quiz_relisten_button', lang)}</button>
          <button onClick={handleMastered} style={btnPrimary}>
            {idx < total - 1 ? t('phonetics.letter_got_it', lang) : t('phonetics.letter_finish_to_write', lang)}
          </button>
        </div>

        </div>{/* /ph-letter-tabs-area */}
      </div>
    </div>
    </div>
    <StepRail stageId={stageId} current="letter" letterIdx={idx} onPickLetter={setIdx} />
    </div>
  );
}

const playBtn: React.CSSProperties = {
  width: 64, height: 64, borderRadius: '50%', border: 'none',
  background: 'linear-gradient(135deg, var(--color-pink-base), var(--color-pink-strong))',
  color: '#fff', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 4px 14px rgba(255,127,168,.35)',
  position: 'relative',
};
const speedBtn: React.CSSProperties = {
  padding: '12px 16px', minHeight: 44, border: '1px solid var(--color-border-2)',
  borderRadius: 999, background: 'var(--color-surface-2)',
  fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--color-ink-3)',
  cursor: 'pointer',
};
const speedBtnActive: React.CSSProperties = {
  background: 'var(--color-pink-soft)', borderColor: 'var(--color-pink-base)',
  color: 'var(--color-pink-strong)', fontWeight: 700,
};
const exampleCard: React.CSSProperties = {
  padding: '10px 12px',
  background: 'var(--color-surface-1)',
  border: '1px solid var(--color-border-1)',
  borderRadius: 10, cursor: 'pointer', textAlign: 'left',
};
const confuseCol: React.CSSProperties = {
  textAlign: 'center', padding: '14px 8px',
  border: '1px solid var(--color-border-1)',
  borderRadius: 12,
  background: 'var(--color-surface-1)',
  cursor: 'pointer',
};

const MAX_REC_MS = 3000;

function RecorderCompare({ onPlayOriginal, korean }: { onPlayOriginal: () => void; korean: string }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const durRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!navigator.mediaDevices || typeof window.MediaRecorder === 'undefined') {
      setSupported(false);
    }
  }, []);

  // unmount 一次性清理；不依赖 url，避免每次 setUrl 都 revoke 当前 URL
  useEffect(() => () => {
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
    if (recRef.current && recRef.current.state !== 'inactive') {
      try { recRef.current.stop(); } catch { /* ignore */ }
      recRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const stop = useCallback(() => {
    if (stopTimerRef.current) { clearTimeout(stopTimerRef.current); stopTimerRef.current = null; }
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
    const rec = recRef.current;
    if (rec && rec.state !== 'inactive') {
      // stop 前 flush 尾片：timeslice(250ms) 下松手太快会丢最后不满一片的尾音
      try { rec.requestData(); } catch { /* ignore */ }
      try { rec.stop(); } catch { /* ignore */ }
    }
    setRecording(false);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    const pre = precheckRecordingEnv();
    if (pre) { setError(t(pre, lang)); return; }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
      setUrl(null);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        blobRef.current = blob;
        durRef.current = Date.now() - startedAt;
        const u = URL.createObjectURL(blob);
        urlRef.current = u;
        setUrl(u);
        stream.getTracks().forEach((t) => t.stop());
      };
      // 传 timeslice：iOS Safari 无参 start() 有时 stop() flush 出空 blob，每 250ms emit 一次稳
      rec.start(250);
      setRecording(true);
      setSaved(false);
      setElapsed(0);
      const startedAt = Date.now();
      tickRef.current = setInterval(() => setElapsed(Date.now() - startedAt), 100);
      stopTimerRef.current = setTimeout(stop, MAX_REC_MS);
    } catch (e) {
      const { key, params } = parseErrorKey(describeMicError(e));
      setError(t(key, lang, params));
      setRecording(false);
    }
  }, [stop, lang]);

  const playMine = useCallback(() => {
    if (!url) return;
    if (!audioRef.current || audioRef.current.error) audioRef.current = new Audio();
    audioRef.current.src = url;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.error('[phonetics] recording playback failed:', e));
  }, [url]);

  const clear = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setUrl(null);
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!blobRef.current) return;
    const id = await saveRecording({
      blob: blobRef.current,
      durationMs: durRef.current,
      type: 'pronunciation',
      sourceType: 'phonetics',
      korean,
      userId: user?.id,
    });
    if (id) setSaved(true);
  }, [korean, user?.id]);

  if (!supported) {
    return (
      <div style={{ marginTop: 14, padding: 12, border: '1px dashed var(--color-border-2)', borderRadius: 10, fontSize: 12, color: 'var(--color-ink-3)' }}>
        {t('phonetics.letter_rec_unsupported', lang)}
      </div>
    );
  }

  const progress = recording ? Math.min(100, (elapsed / MAX_REC_MS) * 100) : 0;

  return (
    <div style={{
      marginTop: 14, padding: 14,
      background: 'var(--color-surface-1)',
      border: '1px solid var(--color-border-1)',
      borderRadius: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
          {t('phonetics.letter_rec_compare', lang)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{t('phonetics.letter_rec_max_3s', lang)}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: url || recording ? 10 : 0 }}>
        {!recording ? (
          <button onClick={start} style={recBtn} aria-label={t('phonetics.letter_rec_start', lang)}>
            <Mic size={16} /> {url ? t('phonetics.letter_rec_again', lang) : t('phonetics.letter_rec_my_voice', lang)}
          </button>
        ) : (
          <button onClick={stop} style={{ ...recBtn, background: 'var(--color-status-danger)', color: '#fff', border: 'none' }} aria-label={t('phonetics.letter_rec_stop_aria', lang)}>
            <Square size={14} fill="#fff" /> {t('phonetics.letter_rec_stop', lang)} · {(elapsed / 1000).toFixed(1)}s
          </button>
        )}
        {url && !recording && (
          <button onClick={clear} style={recBtnGhost} aria-label={t('phonetics.letter_rec_delete', lang)}>
            <Trash2 size={14} /> {t('phonetics.letter_rec_clear', lang)}
          </button>
        )}
        {url && !recording && user && (
          <button onClick={handleSave} disabled={saved} style={{ ...recBtnGhost, cursor: saved ? 'default' : 'pointer', color: saved ? 'var(--color-ink-4)' : 'var(--color-mint-strong)', borderColor: saved ? 'var(--color-border-2)' : 'var(--color-mint-base)' }} aria-label={t('mine.recordings_save', lang)}>
            {saved ? <Check size={14} /> : <Bookmark size={14} />} {saved ? t('mine.recordings_saved', lang) : t('mine.recordings_save', lang)}
          </button>
        )}
      </div>

      {recording && (
        <div style={{ height: 4, background: 'var(--color-surface-4)', borderRadius: 2, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-status-danger)', transition: 'width .1s linear' }} />
        </div>
      )}

      {url && !recording && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button onClick={onPlayOriginal} style={compareBtn}>
            <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-pink-strong)' }}>{t('phonetics.letter_rec_original', lang)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Play size={12} fill="var(--color-pink-strong)" color="var(--color-pink-strong)" /> Tori</span>
          </button>
          <button onClick={playMine} style={{ ...compareBtn, borderColor: 'var(--color-mint-base)' }}>
            <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-mint-strong)' }}>{t('phonetics.letter_rec_mine', lang)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-mint-strong)' }}><Play size={12} fill="var(--color-mint-strong)" color="var(--color-mint-strong)" /> {t('phonetics.letter_rec_hear_self', lang)}</span>
          </button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-status-danger)' }}>{error}</div>
      )}
    </div>
  );
}

const recBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  padding: '12px 16px', minHeight: 44, borderRadius: 999,
  background: 'var(--color-surface-2)', border: '1px solid var(--color-pink-base)',
  color: 'var(--color-pink-strong)', fontSize: 12.5, fontWeight: 600,
  cursor: 'pointer',
};
const recBtnGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  padding: '12px 14px', minHeight: 44, borderRadius: 999,
  background: 'transparent', border: '1px solid var(--color-border-2)',
  color: 'var(--color-ink-3)', fontSize: 12, cursor: 'pointer',
};
const compareBtn: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 4,
  padding: '10px 12px', borderRadius: 10,
  background: 'var(--color-surface-2)', border: '1px solid var(--color-pink-base)',
  color: 'var(--color-ink-1)', fontSize: 13, fontWeight: 500,
  cursor: 'pointer', textAlign: 'left',
};
