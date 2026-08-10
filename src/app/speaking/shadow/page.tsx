'use client';

import '../../practice/practice-redesign.css';
import '../../practice/practice-flow.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import { useAuth } from '@/components/AuthProvider';
import { PracticeSessionShell } from '@/components/practice/PracticeSessionShell';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeReadyScreen } from '@/components/practice/PracticeReadyScreen';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { PracticeFeedbackCard } from '@/components/practice/PracticeFeedbackCard';
import { OriginBadge } from '@/components/practice/OriginBadge';
import type { OriginKind } from '@/components/practice/OriginBadge';
import { useMicRecorder } from '@/lib/audio/useMicRecorder';
import { saveRecording } from '@/lib/audio/saveRecording';
import { scorePronunciation } from '@/lib/audio/pronunciationScore';
import { getAlignedDiff } from '@/lib/koreanDiff';
import { playCorrectSound, playWrongSound } from '@/lib/audio/sfx';
import { speak } from '@/lib/tts';
import { awardXp, updateStreak } from '@/lib/gamification';
import { pushSpeakingHistory } from '@/lib/practice/aggregate';
import { Volume2, Mic, MicOff, Bookmark, Check } from 'lucide-react';
import { SourcePicker } from '@/components/practice/SourcePicker';
import { buildItemsFromSource, DEFAULT_SOURCE_CONFIG, type PracticeSourceConfig } from '@/lib/practice/sourceBuilder';
import { saveProgress, loadProgress, clearProgress, TTL_FLASHCARD } from '@/lib/progress-storage';

function shadowPosKey(uid: string, items: { korean: string }[]): string {
  let h = 0;
  const s = items.map(i => i.korean).join('|');
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return `speaking-shadow-pos:${uid}:${items.length}:${h.toString(36)}`;
}

interface ShadowItem {
  [k: string]: unknown;
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
  origin?: OriginKind;
  originLabel?: string;
}

function shadowDailyKey(uid: string): string {
  const d = new Date();
  return `shadow-daily:v2:${uid}:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// smart 源保留每日缓存,其余源现取现练。
async function buildItems(uid: string, config: PracticeSourceConfig, force = false, lang?: Lang): Promise<ShadowItem[]> {
  const key = shadowDailyKey(uid);
  const useCache = config.kind === 'smart';

  if (useCache && !force) {
    let stored: ShadowItem[] | null = null;
    try { stored = JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { /* ignore */ }
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  }

  const pool = await buildItemsFromSource(config, lang);
  const items: ShadowItem[] = pool.map(m => ({
    korean: m.korean, meaning: m.meaning, type: m.type, origin: m.origin, originLabel: m.originLabel,
  }));
  if (useCache) {
    try { localStorage.setItem(key, JSON.stringify(items)); } catch { /* ignore */ }
  }
  return items;
}

type Phase = 'ready' | 'session';

export default function SpeakingShadowPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const smartBack = useSmartBack('/speaking');
  const [phase, setPhase] = useState<Phase>('ready');
  const [items, setItems] = useState<ShadowItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [source, setSource] = useState<PracticeSourceConfig>(DEFAULT_SOURCE_CONFIG);

  const regenerate = () => {
    const uid = user?.id ?? 'guest';
    try { localStorage.removeItem(shadowDailyKey(uid)); } catch { /* ignore */ }
    setItems(null);
    setLoadError(false);
    buildItems(uid, source, true, lang)
      .then(list => { list.length === 0 ? setLoadError(true) : setItems(list); })
      .catch(() => setLoadError(true));
  };

  const changeSource = (next: PracticeSourceConfig) => {
    setSource(next);
    setItems(null);
    setLoadError(false);
    const uid = user?.id ?? 'guest';
    buildItems(uid, next, next.kind !== 'smart', lang)
      .then(list => { list.length === 0 ? setLoadError(true) : setItems(list); })
      .catch(() => setLoadError(true));
  };

  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    const uid = user?.id ?? 'guest';
    buildItems(uid, source, false, lang)
      .then(list => {
        if (cancelled) return;
        if (list.length === 0) setLoadError(true);
        else setItems(list);
      })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (phase === 'ready') {
    let poolPreview: { mistake: number; myStuff: number; system: number } | undefined;
    if (items && items.length > 0) {
      const mistake = items.filter(i => i.origin === 'mistake').length;
      const myStuff = items.filter(i => i.origin && ['my-sentence', 'my-word', 'reading', 'ai-chat', 'diary'].includes(i.origin)).length;
      const system = items.filter(i => !i.origin || i.origin === 'system').length;
      poolPreview = { mistake, myStuff, system };
    }
    return (
      <PracticeReadyScreen
        tone="mint"
        eyebrow="02 · Shadow"
        kr="섀도잉"
        en="Shadow"
        intro={t('sp.shadow_intro', lang)}
        count={items?.length ?? 10}
        onStart={() => {
          if (!items || items.length === 0) return;
          setPhase('session');
        }}
        onBack={smartBack}
        ctaLabel={items && items.length > 0 ? t('sp.start', lang) : (loadError ? t('sp.change_source', lang) : t('sp.preparing', lang))}
        ctaDisabled={(!items || items.length === 0) && !loadError}
        extra={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
            <SourcePicker config={source} onChange={changeSource} tone="mint" />
            {loadError && (
              <p style={{ fontSize: 12, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>
                {t('sp.source_empty', lang)}
              </p>
            )}
            <div style={{ maxWidth: 420, textAlign: 'center', padding: '0 20px', fontSize: 12, color: 'var(--hr-ink-3)', lineHeight: 1.55 }}>
              {t('sp.mic_permission', lang)}
            </div>
          </div>
        }
        hint={<PracticeNextHint current="listening" />}
        poolPreview={poolPreview}
        onRegenerate={items ? regenerate : undefined}
      />
    );
  }

  if (!items) {
    return (
      <PracticeSessionShell tone="mint" modeName={t('sp.shadow_name', lang)} modeKr="섀도잉" onBack={smartBack}>
        <div className="pr-ss-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.loading', lang)}</p>
        </div>
      </PracticeSessionShell>
    );
  }

  return <ShadowShell items={items} onBack={smartBack} router={router} uid={user?.id ?? 'guest'} />;
}

function ShadowShell({ items, onBack, router, uid }: { items: ShadowItem[]; onBack: () => void; router: ReturnType<typeof useRouter>; uid: string }) {
  const { lang } = useLang();
  const posKey = shadowPosKey(uid, items);
  const [index, setIndex] = useState(() => {
    const saved = loadProgress<{ idx: number; total: number }>(posKey);
    if (saved && saved.total === items.length && saved.idx > 0 && saved.idx < items.length) return saved.idx;
    return 0;
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) { clearProgress(posKey); return; }
    saveProgress(posKey, { idx: index, total: items.length }, TTL_FLASHCARD);
  }, [index, finished, posKey, items.length]);
  const [phase, setPhase] = useState<'prompt' | 'recording' | 'recognizing' | 'result'>('prompt');
  const [finalText, setFinalText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<'correct' | 'acceptable' | 'wrong'>('wrong');
  const [phonemeNotes, setPhonemeNotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [acceptableCount, setAcceptableCount] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [saved, setSaved] = useState(false);
  const scoredIndicesRef = useRef<Set<number>>(new Set());
  const autoPlayedRef = useRef<Set<number>>(new Set());
  const indexRef = useRef(0);
  const blobRef = useRef<Blob | null>(null);
  const durRef = useRef(0);

  const current = items[index];
  indexRef.current = index;

  // 进入新题自动播 TTS
  useEffect(() => {
    if (phase !== 'prompt') return;
    if (autoPlayedRef.current.has(index)) return;
    autoPlayedRef.current.add(index);
    const t = setTimeout(() => speak(current.korean), 400);
    return () => clearTimeout(t);
  }, [index, phase, current.korean]);

  function judge(spoken: string) {
    const idx = indexRef.current;
    const { score: s, verdict: v } = scorePronunciation(spoken, items[idx].korean);
    setFinalText(spoken);
    setScore(s);
    setVerdict(v);
    setPhonemeNotes(v === 'correct' ? [] : getAlignedDiff(spoken, items[idx].korean).notes);
    setPhase('result');
    if (v === 'wrong') playWrongSound(); else playCorrectSound();
    if (!scoredIndicesRef.current.has(idx)) {
      if (v === 'correct') {
        setCorrectCount(c => c + 1);
        awardXp(8).catch(e => console.error('[speaking-shadow] awardXp correct failed', e));
        setXpTotal(x => x + 8);
        scoredIndicesRef.current.add(idx);
      } else if (v === 'acceptable') {
        setAcceptableCount(c => c + 1);
        awardXp(3).catch(e => console.error('[speaking-shadow] awardXp acceptable failed', e));
        setXpTotal(x => x + 3);
        scoredIndicesRef.current.add(idx);
      }
    }
  }

  const mic = useMicRecorder({
    onResult: (text, meta) => { if (meta) { blobRef.current = meta.wav; durRef.current = meta.durationMs; } judge(text); },
    onError: (msg) => { setPhase('prompt'); setError(msg); },
  });

  async function handleSaveRec() {
    if (!blobRef.current || uid === 'guest') return;
    try {
      const id = await saveRecording({
        blob: blobRef.current,
        durationMs: durRef.current,
        type: 'shadowing',
        sourceType: 'speaking-shadow',
        korean: current.korean,
        userId: uid,
      });
      if (id) setSaved(true);
    } catch (e) { console.error('[shadow] saveRecording failed', e); }
  }

  function startListening() {
    setError(null);
    setFinalText('');
    setScore(null);
    setSaved(false);
    blobRef.current = null;
    setPhase('recording');
    mic.start();
  }

  function stopListening() {
    setPhase('recognizing');
    mic.stop();
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      pushSpeakingHistory(uid, correctCount + acceptableCount, items.length);
      updateStreak().catch(e => console.error('[speaking-shadow] updateStreak failed', e));
      setFinished(true);
    } else {
      mic.cancel();
      setIndex(i => i + 1);
      setPhase('prompt');
      setFinalText(''); setScore(null); setError(null); setPhonemeNotes([]);
    }
  }

  function handleRetry() {
    setFinalText(''); setScore(null); setPhonemeNotes([]);
    startListening();
  }

  function handleSkip() {
    mic.cancel();
    setFinalText(t('sp.skipped', lang));
    setScore(0);
    setVerdict('wrong');
    setPhonemeNotes([]);
    setPhase('result');
  }

  function handleRestart() {
    mic.cancel();
    scoredIndicesRef.current.clear();
    autoPlayedRef.current.clear();
    setIndex(0); setCorrectCount(0); setAcceptableCount(0); setXpTotal(0);
    setFinished(false); setPhase('prompt');
    setFinalText(''); setScore(null); setError(null); setPhonemeNotes([]);
  }

  if (finished) {
    const total = items.length;
    const pct = Math.round((correctCount / total) * 100);
    const wrong = total - correctCount - acceptableCount;
    return (
      <div className="pr-scope">
        <PracticeResult
          tone="mint"
          score={pct}
          scoreUnit="%"
          caption={t('sp.caption_3way', lang, { a: correctCount, b: acceptableCount, c: wrong })}
          stats={[
            { num: correctCount, label: t('sp.stat_correct', lang) },
            { num: acceptableCount, label: t('sp.stat_ok', lang) },
            { num: wrong, label: t('sp.stat_wrong', lang) },
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

  const resultCard = phase === 'result' && (
    <div>
      <PracticeFeedbackCard
        verdict={verdict}
        score={score ?? 0}
        yourValue={finalText}
        yourLabel={t('sp.shadow_your_label', lang)}
        target={current.korean}
        phonemeNotes={phonemeNotes}
        showCharDiff
        reason={verdict === 'wrong' ? t('sp.shadow_wrong_reason', lang) : null}
        tip={verdict === 'acceptable' && finalText !== t('sp.skipped', lang) ? t('sp.shadow_ok_tip', lang) : null}
        grammar={null}
        onNext={handleNext}
        nextLabel={index + 1 >= items.length ? t('sp.view_result', lang) : t('sp.next_q', lang)}
        onRetry={handleRetry}
        retryLabel={t('sp.say_again', lang)}
        ttsEnabled
      />
      {blobRef.current && uid !== 'guest' && (
        <button
          onClick={handleSaveRec}
          disabled={saved}
          style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 999, border: '1px solid var(--hr-border-2)', background: saved ? 'transparent' : 'var(--hr-surface-2)', color: saved ? 'var(--hr-ink-4)' : 'var(--hr-mint-strong, var(--hr-ink-2))', fontSize: 13, fontWeight: 600, cursor: saved ? 'default' : 'pointer' }}
        >
          {saved ? <Check size={14} /> : <Bookmark size={14} />} {saved ? t('mine.recordings_saved', lang) : t('mine.recordings_save', lang)}
        </button>
      )}
    </div>
  );

  const micArea = (
    <div style={{
      background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
      borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 14, boxShadow: 'var(--hr-shadow-sm)',
    }}>
      <button
        onClick={() => speak(current.korean)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 999,
          background: 'var(--hr-mint-soft)', border: '1.5px solid var(--hr-mint-base)',
          color: 'var(--hr-mint-strong)', cursor: 'pointer',
          fontSize: 13, fontWeight: 700,
        }}
      >
        <Volume2 size={15} /> {t('sp.shadow_replay', lang)}
      </button>
      {phase === 'prompt' && (
        <>
          {error && <p style={{ fontSize: 13, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>{error}</p>}
          <button
            onClick={startListening}
            style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'var(--hr-mint-base)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(125,198,179,.35)',
            }}
          >
            <Mic size={34} style={{ color: '#fff' }} />
          </button>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.shadow_tap_mic', lang)}</p>
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--hr-ink-3)', fontSize: 12, textDecoration: 'underline',
              textDecorationStyle: 'dashed', textUnderlineOffset: 3, padding: '4px 8px',
            }}
          >
            {t('sp.shadow_skip', lang)}
          </button>
        </>
      )}
      {phase === 'recording' && (
        <>
          <button
            onClick={stopListening}
            style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'var(--hr-pink-strong)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'shadow-pulse 1.2s infinite',
              boxShadow: '0 8px 24px rgba(229,90,135,.35)',
            }}
          >
            <MicOff size={34} style={{ color: '#fff' }} />
          </button>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.recording_stop', lang)}</p>
        </>
      )}
      {phase === 'recognizing' && (
        <>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--hr-mint-soft)', borderTopColor: 'var(--hr-mint-strong)', animation: 'shadow-spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.recognizing', lang)}</p>
        </>
      )}
    </div>
  );

  return (
    <PracticeSessionShell
      tone="mint"
      modeName={t('sp.shadow_name', lang)}
      modeKr="섀도잉"
      current={finished ? undefined : index + 1}
      total={finished ? undefined : items.length}
      onBack={onBack}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
        <div style={{
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          borderRadius: 16, padding: '36px 24px 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          boxShadow: 'var(--hr-shadow-sm)',
          position: 'relative',
        }}>
          <OriginBadge origin={current.origin} label={current.originLabel} />
          <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>{t('sp.shadow_label', lang)}</p>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', margin: 0 }}>{current.meaning}</p>
          <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 26, fontWeight: 800, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center', lineHeight: 1.35, letterSpacing: '-.01em' }}>
            {current.korean}
          </p>
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 99, padding: '3px 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            {current.type === 'word' ? 'Word' : 'Sentence'}
          </span>
        </div>

        {phase === 'result' ? resultCard : micArea}
      </div>
    </PracticeSessionShell>
  );
}
