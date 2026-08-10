'use client';

import '../../practice/practice-redesign.css';
import '../../practice/practice-flow.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, Mic, MicOff, Check, Circle, Bookmark } from 'lucide-react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { useAuth } from '@/components/AuthProvider';
import { PracticeSessionShell } from '@/components/practice/PracticeSessionShell';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeReadyScreen } from '@/components/practice/PracticeReadyScreen';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { useMicRecorder } from '@/lib/audio/useMicRecorder';
import { saveRecording } from '@/lib/audio/saveRecording';
import { playCorrectSound, playWrongSound } from '@/lib/audio/sfx';
import { speak, speakWord } from '@/lib/tts';
import { awardXp, updateStreak } from '@/lib/gamification';
import { pushSpeakingHistory } from '@/lib/practice/aggregate';
import { loadRetellPassages, type RetellPassage, type RetellSource } from '@/data/retellPassages';

const READING_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
const PASSAGES_PER_SESSION = 5;

interface RetellVerdict {
  [k: string]: unknown;
  score: number;
  coverage: number;
  coveredPoints: string[];
  missedPoints: string[];
  naturalness: string | null;
  suggestion: string | null;
  verdict: 'correct' | 'acceptable' | 'wrong';
}

// 本地兜底 · 关键词包含匹配算覆盖率
function localJudge(spoken: string, keyPoints: string[]): RetellVerdict {
  const covered: string[] = [];
  const missed: string[] = [];
  const norm = spoken.replace(/\s/g, '');
  for (const p of keyPoints) {
    const head = p.replace(/…$/, '').slice(0, 4);
    if (head && norm.includes(head)) covered.push(p);
    else missed.push(p);
  }
  const coverage = keyPoints.length ? Math.round((covered.length / keyPoints.length) * 100) : 0;
  return {
    score: coverage, coverage, coveredPoints: covered, missedPoints: missed,
    naturalness: null, suggestion: null,
    verdict: coverage >= 80 ? 'correct' : coverage >= 50 ? 'acceptable' : 'wrong',
  };
}

type Phase = 'ready' | 'session';

export default function SpeakingRetellPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const smartBack = useSmartBack('/speaking');
  const [phase, setPhase] = useState<Phase>('ready');
  const [source, setSource] = useState<RetellSource>('dialogue');
  const [level, setLevel] = useState<string>('A2');
  const [passages, setPassages] = useState<RetellPassage[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback((src: RetellSource, lv: string) => {
    setPassages(null);
    setLoadError(false);
    loadRetellPassages({ source: src, level: src === 'reading' ? lv : undefined })
      .then(list => {
        if (list.length === 0) setLoadError(true);
        else setPassages(list.slice(0, PASSAGES_PER_SESSION));
      })
      .catch(() => setLoadError(true));
  }, []);

  useEffect(() => {
    load(source, level);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'ready') {
    return (
      <PracticeReadyScreen
        tone="mint"
        eyebrow="03 · Retell"
        kr="요약 말하기"
        en="Retell"
        intro={t('sp.retell_intro', lang)}
        count={passages?.length ?? PASSAGES_PER_SESSION}
        onStart={() => {
          if (!passages || passages.length === 0) return;
          setPhase('session');
        }}
        onBack={smartBack}
        ctaLabel={passages && passages.length > 0 ? t('sp.start', lang) : (loadError ? t('sp.change_source', lang) : t('sp.preparing', lang))}
        ctaDisabled={(!passages || passages.length === 0) && !loadError}
        extra={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', maxWidth: 420 }}>
            <div style={{ display: 'flex', gap: 8, width: '100%' }}>
              {(['dialogue', 'reading'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setSource(s); load(s, level); }}
                  style={{
                    flex: 1, padding: '11px 0', borderRadius: 12, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                    background: source === s ? 'var(--hr-mint-strong)' : 'var(--hr-surface-3)',
                    color: source === s ? '#fff' : 'var(--hr-ink-2)',
                  }}
                >{t(s === 'dialogue' ? 'sp.retell_scene' : 'sp.retell_article', lang)}</button>
              ))}
            </div>
            {source === 'reading' && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {READING_LEVELS.map(lv => (
                  <button
                    key={lv}
                    onClick={() => { setLevel(lv); load('reading', lv); }}
                    style={{
                      padding: '7px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: 'none', cursor: 'pointer',
                      background: level === lv ? 'var(--hr-mint-base)' : 'var(--hr-surface-3)',
                      color: level === lv ? '#fff' : 'var(--hr-ink-2)',
                    }}
                  >{lv}</button>
                ))}
              </div>
            )}
            {loadError && (
              <p style={{ fontSize: 12, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>
                {t('sp.retell_source_empty', lang)}
              </p>
            )}
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--hr-ink-3)', lineHeight: 1.55 }}>
              {t('sp.retell_mic_hint', lang)}
            </div>
          </div>
        }
        hint={<PracticeNextHint current="listening" />}
      />
    );
  }

  if (!passages) {
    return (
      <PracticeSessionShell tone="mint" modeName={t('sp.retell_mode', lang)} modeKr="요약 말하기" onBack={smartBack}>
        <div className="pr-ss-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.loading', lang)}</p>
        </div>
      </PracticeSessionShell>
    );
  }

  return <RetellShell passages={passages} onBack={smartBack} router={router} uid={user?.id ?? 'guest'} />;
}

function RetellShell({ passages, onBack, router, uid }: { passages: RetellPassage[]; onBack: () => void; router: ReturnType<typeof useRouter>; uid: string }) {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState<'prompt' | 'recording' | 'recognizing' | 'judging' | 'result'>('prompt');
  const [spokenText, setSpokenText] = useState('');
  const [result, setResult] = useState<RetellVerdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [acceptableCount, setAcceptableCount] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [saved, setSaved] = useState(false);
  const scoredRef = useRef<Set<number>>(new Set());
  const autoPlayedRef = useRef<Set<number>>(new Set());
  const indexRef = useRef(0);
  const blobRef = useRef<Blob | null>(null);
  const durRef = useRef(0);

  const current = passages[index];
  indexRef.current = index;

  // 进入新段自动播一次
  useEffect(() => {
    if (phase !== 'prompt') return;
    if (autoPlayedRef.current.has(index)) return;
    autoPlayedRef.current.add(index);
    const timer = setTimeout(() => speak(current.fullKo), 400);
    return () => clearTimeout(timer);
  }, [index, phase, current.fullKo]);

  const judge = useCallback(async (spoken: string) => {
    const p = passages[indexRef.current];
    setSpokenText(spoken);
    setPhase('judging');
    let jr: RetellVerdict;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch('/api/ai/retell-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken, reference: p.fullKo, keyPoints: p.keyPoints, meaning: p.sentences.map(s => s.zh).join(' ') }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(String(res.status));
      jr = await res.json();
    } catch {
      jr = localJudge(spoken, p.keyPoints);
    }
    setResult(jr);
    setPhase('result');
    if (jr.verdict === 'wrong') playWrongSound(); else playCorrectSound();

    const idx = indexRef.current;
    if (!scoredRef.current.has(idx)) {
      if (jr.verdict === 'correct') {
        setCorrectCount(c => c + 1); awardXp(12).catch(e => console.error('[speaking-retell] awardXp correct failed', e)); setXpTotal(x => x + 12); scoredRef.current.add(idx);
      } else if (jr.verdict === 'acceptable') {
        setAcceptableCount(c => c + 1); awardXp(6).catch(e => console.error('[speaking-retell] awardXp acceptable failed', e)); setXpTotal(x => x + 6); scoredRef.current.add(idx);
      }
    }
  }, [passages]);

  const mic = useMicRecorder({
    onResult: (text, meta) => { if (meta) { blobRef.current = meta.wav; durRef.current = meta.durationMs; } judge(text); },
    onError: (msg) => { setPhase('prompt'); setError(msg); },
    maxMs: 30000,
  });

  async function handleSaveRec() {
    if (!blobRef.current || uid === 'guest') return;
    try {
      const id = await saveRecording({
        blob: blobRef.current,
        durationMs: durRef.current,
        type: 'retell',
        sourceType: 'speaking-retell',
        korean: current.title,
        userId: uid,
      });
      if (id) setSaved(true);
    } catch (e) { console.error('[retell] saveRecording failed', e); }
  }

  const startRec = () => { setError(null); setSpokenText(''); setResult(null); setSaved(false); blobRef.current = null; setPhase('recording'); mic.start(); };
  const stopRec = () => { setPhase('recognizing'); mic.stop(); };

  function handleNext() {
    if (index + 1 >= passages.length) {
      pushSpeakingHistory(uid, correctCount + acceptableCount, passages.length);
      updateStreak().catch(e => console.error('[speaking-retell] updateStreak failed', e));
      setFinished(true);
    } else {
      mic.cancel();
      setIndex(i => i + 1);
      setPhase('prompt'); setSpokenText(''); setResult(null); setError(null); setShowText(false);
    }
  }

  function handleSkip() {
    mic.cancel();
    setResult(localJudge('', current.keyPoints));
    setSpokenText(t('sp.skipped', lang));
    setPhase('result');
  }

  function handleRestart() {
    mic.cancel();
    scoredRef.current.clear();
    autoPlayedRef.current.clear();
    setIndex(0); setCorrectCount(0); setAcceptableCount(0); setXpTotal(0);
    setFinished(false); setPhase('prompt'); setSpokenText(''); setResult(null); setError(null); setShowText(false);
  }

  if (finished) {
    const total = passages.length;
    const pct = Math.round((correctCount / total) * 100);
    const wrong = total - correctCount - acceptableCount;
    return (
      <div className="pr-scope">
        <PracticeResult
          tone="mint"
          score={pct}
          scoreUnit="%"
          caption={t('sp.retell_caption', lang, { a: correctCount, b: acceptableCount, c: wrong })}
          stats={[
            { num: correctCount, label: t('sp.stat_complete', lang) },
            { num: acceptableCount, label: t('sp.stat_basic', lang) },
            { num: wrong, label: t('sp.stat_weak', lang) },
          ]}
          xp={xpTotal}
          primaryLabel={t('sp.retry_round', lang)}
          onPrimary={handleRestart}
          secondaryLabel={t('sp.say_exit', lang)}
          onSecondary={() => router.push('/speaking')}
          footer={<>
            {uid === 'guest' && <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--hr-ink-3)', margin: '0 0 8px' }}>{t('sp.login_to_save', lang)}</p>}
            <PracticeNextHint current="listening" assumeCurrentDone />
          </>}
        />
      </div>
    );
  }

  return (
    <PracticeSessionShell
      tone="mint"
      modeName={t('sp.retell_mode', lang)}
      modeKr="요약 말하기"
      current={finished ? undefined : index + 1}
      total={finished ? undefined : passages.length}
      onBack={onBack}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
        {/* 听 · 段落卡 */}
        <div style={{
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          borderRadius: 16, padding: '28px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          boxShadow: 'var(--hr-shadow-sm)',
        }}>
          <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>{t('sp.retell_label', lang)}</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center' }}>{current.title}</p>
          <button
            onClick={() => speak(current.fullKo)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 999,
              border: '1.5px solid var(--hr-mint-base)', background: 'var(--hr-mint-strong)', color: '#fff',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', minHeight: 44,
            }}
          >
            <Volume2 size={16} /> {t('sp.retell_listen', lang)}
          </button>
          <button
            onClick={() => setShowText(v => !v)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--hr-ink-3)', fontSize: 12, textDecoration: 'underline', textDecorationStyle: 'dashed', textUnderlineOffset: 3 }}
          >{showText ? t('sp.retell_hide_text', lang) : t('sp.retell_show_text', lang)}</button>
          {showText && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              {current.sentences.map((s, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--hr-mint-base)', paddingLeft: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 15, color: 'var(--hr-ink-1)', margin: 0, flex: 1, minWidth: 0 }}>{s.ko}</p>
                    <button
                      onClick={() => speakWord(s.ko)}
                      aria-label={t('a11y.play_audio', lang)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--hr-mint-strong)', padding: 2, flexShrink: 0, display: 'flex' }}
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--hr-ink-3)', margin: '2px 0 0' }}>{s.zh}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 要点提示 */}
        <div style={{ background: 'var(--hr-mint-soft)', border: '1.5px solid var(--hr-mint-base)', borderRadius: 14, padding: '14px 16px' }}>
          <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-mint-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 700 }}>
            {t('sp.retell_say_points', lang)}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {current.keyPoints.map((p, i) => {
              const hit = result?.coveredPoints?.includes(p);
              const miss = phase === 'result' && !hit;
              return (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: miss ? 'var(--hr-pink-strong)' : 'var(--hr-ink-2)' }}>
                  {phase === 'result'
                    ? (hit ? <Check size={14} style={{ color: 'var(--hr-mint-strong)', flexShrink: 0 }} /> : <Circle size={13} style={{ color: 'var(--hr-pink-strong)', flexShrink: 0 }} />)
                    : <Circle size={7} style={{ color: 'var(--hr-mint-strong)', flexShrink: 0, fill: 'currentColor' }} />}
                  {p}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 交互区 */}
        {phase === 'result' && result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)', borderRadius: 16, padding: '18px 20px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 34, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{result.coverage}%</span>
                <span style={{ fontSize: 13, color: 'var(--hr-ink-3)' }}>{t('sp.retell_point_cover', lang, { a: result.coveredPoints.length, b: current.keyPoints.length })}</span>
              </div>
              <div style={{ height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${result.coverage}%`, background: 'var(--hr-mint-base)', borderRadius: 999 }} />
              </div>
              {spokenText && spokenText !== t('sp.skipped', lang) && (
                <div>
                  <p style={{ fontSize: 11, color: 'var(--hr-ink-3)', margin: '0 0 2px' }}>{t('sp.retell_your_words', lang)}</p>
                  <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 14, color: 'var(--hr-ink-1)', margin: 0 }}>{spokenText}</p>
                </div>
              )}
              {result.naturalness && (
                <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: 0, lineHeight: 1.5 }}>💬 {result.naturalness}</p>
              )}
              {result.suggestion && (
                <div style={{ background: 'var(--hr-surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ fontSize: 11, color: 'var(--hr-ink-3)', margin: '0 0 3px' }}>{t('sp.retell_better', lang)}</p>
                  <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 14, color: 'var(--hr-ink-1)', margin: 0, lineHeight: 1.5 }}>{result.suggestion}</p>
                </div>
              )}
            </div>
            {blobRef.current && uid !== 'guest' && (
              <button
                onClick={handleSaveRec}
                disabled={saved}
                style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 999, border: '1px solid var(--hr-border-2)', background: saved ? 'transparent' : 'var(--hr-surface-2)', color: saved ? 'var(--hr-ink-4)' : 'var(--hr-ink-2)', fontSize: 13, fontWeight: 600, cursor: saved ? 'default' : 'pointer' }}
              >
                {saved ? <Check size={14} /> : <Bookmark size={14} />} {saved ? t('mine.recordings_saved', lang) : t('mine.recordings_save', lang)}
              </button>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={startRec} style={{ padding: '13px 20px', borderRadius: 14, background: 'transparent', border: '1.5px solid var(--hr-border-2)', color: 'var(--hr-ink-2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{t('sp.say_again', lang)}</button>
              <button onClick={handleNext} style={{ flex: 1, padding: '13px 0', borderRadius: 14, background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                {index + 1 >= passages.length ? t('sp.view_result', lang) : t('sp.next_passage', lang)}
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)', borderRadius: 16, padding: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, boxShadow: 'var(--hr-shadow-sm)',
          }}>
            {phase === 'prompt' && (
              <>
                {error && <p style={{ fontSize: 13, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>{error}</p>}
                <button onClick={startRec} style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--hr-mint-base)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(125,198,179,.35)' }}>
                  <Mic size={34} style={{ color: '#fff' }} />
                </button>
                <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.retell_tap_mic', lang)}</p>
                <button onClick={handleSkip} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--hr-ink-3)', fontSize: 12, textDecoration: 'underline', textDecorationStyle: 'dashed', textUnderlineOffset: 3, padding: '4px 8px' }}>{t('sp.retell_skip', lang)}</button>
              </>
            )}
            {phase === 'recording' && (
              <>
                <button onClick={stopRec} style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--hr-pink-strong)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'retell-pulse 1.2s infinite', boxShadow: '0 8px 24px rgba(229,90,135,.35)' }}>
                  <MicOff size={34} style={{ color: '#fff' }} />
                </button>
                <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.recording_stop', lang)}</p>
              </>
            )}
            {(phase === 'recognizing' || phase === 'judging') && (
              <>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--hr-mint-soft)', borderTopColor: 'var(--hr-mint-strong)', animation: 'retell-spin 0.8s linear infinite' }} />
                <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{phase === 'recognizing' ? t('sp.recognizing', lang) : t('sp.retell_ai_review', lang)}</p>
              </>
            )}
          </div>
        )}
      </div>
    </PracticeSessionShell>
  );
}
