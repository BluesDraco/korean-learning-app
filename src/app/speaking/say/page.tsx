'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import { SpeakingSession } from '@/components/speaking/SpeakingSession';
import type { SpeakingItem } from '@/components/speaking/SpeakingSession';
import { useAuth } from '@/components/AuthProvider';
import { PracticeSessionShell } from '@/components/practice/PracticeSessionShell';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeReadyScreen } from '@/components/practice/PracticeReadyScreen';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { readSpeakingHistory } from '@/lib/practice/aggregate';
import { SourcePicker } from '@/components/practice/SourcePicker';
import { buildItemsFromSource, DEFAULT_SOURCE_CONFIG, type PracticeSourceConfig } from '@/lib/practice/sourceBuilder';

function speakingDailyKey(uid: string): string {
  const d = new Date();
  return `speaking-daily:v2:${uid}:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// smart 源 · 保留每日缓存(同一天题目稳定,可复习);其余源每次现取现练。
async function buildItems(uid: string, config: PracticeSourceConfig, force = false, lang?: Lang): Promise<SpeakingItem[]> {
  const todayKey = speakingDailyKey(uid);
  const useCache = config.kind === 'smart';

  if (useCache && !force) {
    let stored: SpeakingItem[] | null = null;
    try { stored = JSON.parse(localStorage.getItem(todayKey) ?? 'null'); } catch { /* ignore */ }
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  }

  const pool = await buildItemsFromSource(config, lang);
  const items: SpeakingItem[] = pool.map(m => ({
    korean: m.korean, meaning: m.meaning, type: m.type, origin: m.origin, originLabel: m.originLabel,
  }));
  if (useCache) {
    try { localStorage.setItem(todayKey, JSON.stringify(items)); } catch { /* ignore */ }
  }
  return items;
}

type Phase = 'ready' | 'session';

export default function SpeakingSayPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const smartBack = useSmartBack('/speaking');
  const [phase, setPhase] = useState<Phase>('ready');
  const [items, setItems] = useState<SpeakingItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [lastScore, setLastScore] = useState<{ value: string | number; unit: string; hint?: string } | undefined>();
  const [source, setSource] = useState<PracticeSourceConfig>(DEFAULT_SOURCE_CONFIG);

  const regenerate = () => {
    const uid = user?.id ?? 'guest';
    try { localStorage.removeItem(speakingDailyKey(uid)); } catch { /* ignore */ }
    setItems(null);
    setLoadError(false);
    buildItems(uid, source, true, lang)
      .then(list => {
        if (list.length === 0) setLoadError(true);
        else setItems(list);
      })
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

    // 上次表现 · 只显示非今日的历史,避免"今日 83%" 混淆(同一天题目相同)
    const hist = readSpeakingHistory(user?.id);
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const nonToday = hist.find(h => h.timestamp < todayStart.getTime());
    if (nonToday) {
      const pct = nonToday.total ? Math.round((nonToday.correct / nonToday.total) * 100) : 0;
      const diffDays = Math.floor((Date.now() - nonToday.timestamp) / 86400000);
      const hint = diffDays === 1 ? t('sp.last_yesterday', lang) : t('sp.last_days_ago', lang, { n: diffDays });
      setLastScore({ value: pct, unit: '%', hint });
    }
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
        eyebrow="01 · Say Korean"
        kr="한국어로 말하기"
        en="Say Korean"
        intro={t('sp.say_intro', lang)}
        count={items?.length ?? 12}
        lastScore={lastScore}
        onStart={() => {
          if (!items || items.length === 0) return;
          setPhase('session');
        }}
        onBack={smartBack}
        railMode="listening"
        railChip="speak"
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
      <PracticeSessionShell tone="mint" modeName={t('sp.say_mode', lang)} modeKr="말하기" onBack={smartBack} railMode="listening" railChip="speak">
        <div className="pr-ss-card" style={{ textAlign: 'center' }}>
          {loadError ? (
            <>
              <p style={{ fontSize: 15, color: 'var(--hr-ink-2)', margin: '0 0 12px' }}>{t('sp.retry_load', lang)}</p>
              <button
                onClick={() => window.location.reload()}
                style={{ padding: '10px 20px', borderRadius: 12, background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >{t('sp.retry', lang)}</button>
            </>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.today_generating', lang)}</p>
          )}
        </div>
      </PracticeSessionShell>
    );
  }

  return (
    <SpeakingShell items={items} total={items.length} onBack={smartBack} router={router} />
  );
}

function SpeakingShell({ items, total, onBack, router }: { items: SpeakingItem[]; total: number; onBack: () => void; router: ReturnType<typeof useRouter> }) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(1);
  const [finished, setFinished] = useState(false);

  const renderDone = ({ correct, acceptable, total, xp, onRetry }: { correct: number; acceptable: number; total: number; xp: number; onRetry: () => void }) => {
    const pct = Math.round((correct / total) * 100);
    const wrong = total - correct - acceptable;
    return (
      <div className="pr-scope">
        <PracticeResult
          tone="mint"
          score={pct}
          scoreUnit="%"
          caption={t('sp.caption_3way', lang, { a: correct, b: acceptable, c: wrong })}
          stats={[
            { num: correct, label: t('sp.stat_correct', lang) },
            { num: acceptable, label: t('sp.stat_ok', lang) },
            { num: wrong, label: t('sp.stat_wrong', lang) },
          ]}
          xp={xp}
          primaryLabel={t('sp.retry_round', lang)}
          onPrimary={() => { setFinished(false); setCurrent(1); onRetry(); }}
          secondaryLabel={t('sp.back_to_practice_center', lang)}
          onSecondary={() => router.push('/speaking')}
          footer={<PracticeNextHint current="listening" assumeCurrentDone />}
        />
      </div>
    );
  };

  return (
    <PracticeSessionShell
      tone="mint"
      modeName={t('sp.say_mode', lang)}
      modeKr="말하기"
      current={finished ? undefined : current}
      total={finished ? undefined : total}
      onBack={onBack}
      railMode="listening"
      railChip="speak"
    >
      <SpeakingSession
        items={items}
        onProgress={(c) => setCurrent(c)}
        onFinished={() => setFinished(true)}
        renderDone={renderDone}
      />
    </PracticeSessionShell>
  );
}
