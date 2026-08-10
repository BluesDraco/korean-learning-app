'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { useAuth } from '@/components/AuthProvider';
import { DictationSession } from '@/components/dictation/DictationSession';
import type { DictationItem } from '@/components/dictation/DictationSession';
import { PracticeSessionShell } from '@/components/practice/PracticeSessionShell';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeReadyScreen } from '@/components/practice/PracticeReadyScreen';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { SourcePicker } from '@/components/practice/SourcePicker';
import {
  buildItemsFromSource, DEFAULT_SOURCE_CONFIG, COUNT_ALL,
  type PracticeSourceConfig, type ContentFilter,
} from '@/lib/practice/sourceBuilder';

interface DictationSubShellProps {
  [k: string]: unknown;
  submodeKey: string; // "word" / "sentence" / "mistakes"
  eyebrow: string;    // "01 · Word"
  kr: string;         // "단어 받아쓰기"
  en: string;         // "Word"
  intro: string;
  emptyMessage?: string; // 无题时提示(如错题为空)
  buildItems: (uid: string, force?: boolean, count?: number) => Promise<DictationItem[]>;
  parentPath?: string; // 返回上级路径,默认 /dictation
  /** true 时 PracticeReadyScreen 显示"换一批"按钮 · 用于每日缓存类子模式 */
  regenerable?: boolean;
  /** true 时 ready 屏显示通用选源器(word/sentence 用),mistakes 不传 */
  sourceable?: boolean;
  /** 选源器默认内容筛选 · word 传 'word' / sentence 传 'sentence' */
  defaultContentFilter?: ContentFilter;
}

function poolToDictationItems(pool: Awaited<ReturnType<typeof buildItemsFromSource>>): DictationItem[] {
  return pool.map(m => ({
    korean: m.korean, meaning: m.meaning, type: m.type,
    tricky: m.tricky, grammarPoint: m.grammarPoint, origin: m.origin, originLabel: m.originLabel,
  }));
}

type Phase = 'ready' | 'session';

/** 默写子模式统一外壳 · 复用 Ready + Shell + Result + NextHint */
export function DictationSubShell({
  submodeKey,
  eyebrow,
  kr,
  en,
  intro,
  emptyMessage,
  buildItems,
  parentPath = '/dictation',
  regenerable = false,
  sourceable = false,
  defaultContentFilter = 'both',
}: DictationSubShellProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const smartBack = useSmartBack(parentPath);
  const [phase, setPhase] = useState<Phase>('ready');
  const [items, setItems] = useState<DictationItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  // 初始数量对齐数量选项首档(10),让四个数量按钮初次进来就有一个高亮
  const [source, setSource] = useState<PracticeSourceConfig>({ ...DEFAULT_SOURCE_CONFIG, contentFilter: defaultContentFilter, count: 10 });
  // 取题请求序号 · 快速连点数量/换源时只接受最后一次结果,防竞态覆盖
  const loadSeqRef = useRef(0);

  // smart 源走页面自带 buildItems(含每日缓存+tricky映射);其他源走通用 buildItemsFromSource。
  // 两条路径都吃 cfg.count(数量选择),smart 传给 buildMixedPool、其他走 slice。
  const loadFor = (cfg: PracticeSourceConfig, uid: string, force: boolean) =>
    (!sourceable || cfg.kind === 'smart')
      ? buildItems(uid, force, cfg.count)
      : buildItemsFromSource(cfg, lang).then(poolToDictationItems);

  // 只在首次挂载 + uid 真正变化时构建。挂载即定,避免登录状态切换时清空已生成 items
  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    const uid = user?.id ?? 'guest';
    const seq = ++loadSeqRef.current;
    loadFor(source, uid, false)
      .then(list => {
        if (cancelled || seq !== loadSeqRef.current) return;
        setItems(list);
      })
      .catch(() => { if (!cancelled && seq === loadSeqRef.current) setLoadError(true); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const regenerate = () => {
    if (regenerating) return;
    const uid = user?.id ?? 'guest';
    setItems(null);
    setLoadError(false);
    setRegenerating(true);
    const seq = ++loadSeqRef.current;
    loadFor(source, uid, true)
      .then(list => { if (seq === loadSeqRef.current) { setItems(list); setRegenerating(false); } })
      .catch(() => { if (seq === loadSeqRef.current) { setLoadError(true); setRegenerating(false); } });
  };

  const changeSource = (next: PracticeSourceConfig) => {
    setSource(next);
    setItems(null);
    setLoadError(false);
    const uid = user?.id ?? 'guest';
    const seq = ++loadSeqRef.current;
    loadFor(next, uid, next.kind !== 'smart')
      .then(list => { if (seq === loadSeqRef.current) setItems(list); })
      .catch(() => { if (seq === loadSeqRef.current) setLoadError(true); });
  };

  if (phase === 'ready') {
    // 空态文案:可选源子模式引导换源;固定源(错题)用 emptyMessage
    const hasError = loadError && !items;
    const empty = !!items && items.length === 0;
    let cta = t('dict.cta_start', lang);
    let ctaAction: (() => void) | undefined;
    if (!items && !loadError) cta = t('dict.cta_preparing', lang);
    else if (hasError) { cta = t('dict.cta_retry', lang); ctaAction = regenerate; }
    else if (empty) cta = sourceable ? t('dict.cta_change_source', lang) : (emptyMessage ? t('dict.cta_back_up', lang) : t('dict.cta_start', lang));

    const emptyHint = empty && !sourceable && emptyMessage ? (
      <div style={{ maxWidth: 420, textAlign: 'center', padding: '0 20px', fontSize: 12, color: 'var(--hr-ink-3)', lineHeight: 1.6 }}>
        {emptyMessage}
      </div>
    ) : null;

    const COUNT_OPTIONS: { label: string; value: number }[] = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: t('dict.count_all', lang), value: COUNT_ALL },
    ];

    const extra = (sourceable || emptyHint) ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        {sourceable && <SourcePicker config={source} onChange={changeSource} tone="peach" />}
        {sourceable && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 420 }}>
            <span style={{ fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.1em', textTransform: 'uppercase', paddingLeft: 2 }}>
              {t('dict.count_label', lang)}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {COUNT_OPTIONS.map(opt => {
                const active = source.count === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => { if (source.count !== opt.value) changeSource({ ...source, count: opt.value }); }}
                    style={{
                      flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 13.5, fontWeight: 700,
                      border: `1.5px solid ${active ? 'var(--hr-peach-strong)' : 'var(--hr-border-2)'}`,
                      background: active ? 'var(--hr-peach-strong)' : 'var(--hr-surface-2)',
                      color: active ? '#fff' : 'var(--hr-ink-2)', cursor: 'pointer',
                    }}
                  >{opt.label}</button>
                );
              })}
            </div>
          </div>
        )}
        {sourceable && empty && (
          <p style={{ fontSize: 12, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>
            {t('sp.source_empty', lang)}
          </p>
        )}
        {emptyHint}
      </div>
    ) : null;

    // 从 items origin 统计题源分布
    let poolPreview: { mistake: number; myStuff: number; system: number } | undefined;
    if (items && items.length > 0) {
      const mistake = items.filter(i => i.origin === 'mistake').length;
      const myStuff = items.filter(i => i.origin && ['my-sentence', 'my-word', 'reading', 'ai-chat', 'diary'].includes(i.origin)).length;
      const system = items.filter(i => !i.origin || i.origin === 'system').length;
      poolPreview = { mistake, myStuff, system };
    }
    return (
      <PracticeReadyScreen
        tone="peach"
        eyebrow={eyebrow}
        kr={kr}
        en={en}
        intro={intro}
        count={items?.length ?? 12}
        onStart={() => {
          if (hasError && ctaAction) { ctaAction(); return; }
          if (empty && !sourceable) { smartBack(); return; }
          if (!items || items.length === 0) return;
          setPhase('session');
        }}
        onBack={smartBack}
        ctaLabel={cta}
        ctaDisabled={!items && !loadError}
        extra={extra}
        hint={<PracticeNextHint current="dictation" />}
        poolPreview={poolPreview}
        onRegenerate={regenerable && items && !regenerating ? regenerate : undefined}
      />
    );
  }

  if (!items || items.length === 0) {
    return (
      <PracticeSessionShell tone="peach" modeName={t('dict.mode_name', lang)} modeKr="받아쓰기" onBack={smartBack}>
        <div className="pr-ss-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-3)', margin: 0 }}>{t('dict.loading', lang)}</p>
        </div>
      </PracticeSessionShell>
    );
  }

  return <DictationInner items={items} onBack={smartBack} submodeKey={submodeKey} router={router} />;
}

function DictationInner({ items, onBack, submodeKey, router }: { items: DictationItem[]; onBack: () => void; submodeKey: string; router: ReturnType<typeof useRouter> }) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(1);
  const [finished, setFinished] = useState(false);

  return (
    <PracticeSessionShell
      tone="peach"
      modeName={t('dict.mode_name', lang)}
      modeKr="받아쓰기"
      current={finished ? undefined : current}
      total={finished ? undefined : items.length}
      onBack={onBack}
    >
      <DictationSession
        items={items}
        onExit={onBack}
        exitLabel={t('dict.exit_to_hub', lang)}
        hideTopProgress
        submodeKey={submodeKey}
        onProgress={(c) => setCurrent(c)}
        onFinished={() => setFinished(true)}
        renderDone={({ correct, total, xp, onRetry }) => {
          const pct = Math.round((correct / total) * 100);
          const wrong = total - correct;
          return (
            <div className="pr-scope">
              <PracticeResult
                tone="peach"
                score={pct}
                scoreUnit="%"
                caption={t('dict.correct_of_total', lang, { a: correct, b: total })}
                stats={[
                  { num: correct, label: t('sp.stat_correct', lang) },
                  { num: wrong, label: t('sp.stat_wrong', lang) },
                  { num: `+${xp}`, label: 'XP' },
                ]}
                xp={xp}
                primaryLabel={t('dict.retry_round', lang)}
                onPrimary={() => { setFinished(false); setCurrent(1); onRetry(); }}
                secondaryLabel={t('dict.exit_to_hub', lang)}
                onSecondary={() => router.push('/dictation')}
                footer={<PracticeNextHint current="dictation" assumeCurrentDone />}
              />
            </div>
          );
        }}
      />
    </PracticeSessionShell>
  );
}
