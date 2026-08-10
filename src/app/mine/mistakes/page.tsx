'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Trash2, PenLine, AlertCircle, RotateCcw, Check, AlertTriangle } from 'lucide-react';
import { db } from '@/lib/db';
import type { DictationRecord, SpellingMistake, AiChatMistake } from '@/types';
import { DictationSession } from '@/components/dictation/DictationSession';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { useAuth } from '@/components/AuthProvider';
import { t } from '@/lib/i18n';
import { fmtShortDate, timeAgo } from '@/lib/datetime';
import '../mine-home.css';

type TabKey = 'dictation' | 'vocab' | 'ai';

interface DictGroup {
  [k: string]: unknown;
  korean: string;
  meaning: string;
  wrongCount: number;
  lastWrongAt: number;
  type: 'word' | 'sentence';
}

function MistakesInner() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();

  const initialTab = ((): TabKey => {
    const q = searchParams.get('tab');
    return q === 'vocab' || q === 'ai' ? q : 'dictation';
  })();
  const [tab, setTab] = useState<TabKey>(initialTab);

  // ── 默写错题 ──
  const [dictGroups, setDictGroups] = useState<DictGroup[]>([]);
  const [dictLoading, setDictLoading] = useState(true);
  const [dictError, setDictError] = useState(false);
  const [practicing, setPracticing] = useState(false);

  const loadDict = useCallback(async () => {
    setDictLoading(true);
    setDictError(false);
    try {
      const uid = user?.id ?? 'guest';
      const cutoff = Date.now() - 90 * 86400_000;
      const wrong = await db.dictationRecords.filter(r => !r.correct && r.userId === uid && r.date >= cutoff);
      const grouped: Record<string, DictGroup> = {};
      for (const r of wrong) {
        if (!grouped[r.wordId]) {
          grouped[r.wordId] = { korean: r.wordId, meaning: r.meaning || '', wrongCount: 0, lastWrongAt: 0, type: (r.type as 'word' | 'sentence') || 'word' };
        }
        grouped[r.wordId].wrongCount++;
        if (r.date > grouped[r.wordId].lastWrongAt) {
          grouped[r.wordId].lastWrongAt = r.date;
          if (r.type) grouped[r.wordId].type = r.type as 'word' | 'sentence';
        }
      }
      setDictGroups(Object.values(grouped).sort((a, b) => b.wrongCount - a.wrongCount));
    } catch {
      setDictError(true);
    } finally {
      setDictLoading(false);
    }
  }, [user?.id]);

  const dictMastered = async (korean: string) => {
    if (!confirm(t('mine.dict_mastered_confirm', lang, { word: korean }))) return;
    const uid = user?.id ?? 'guest';
    const records = await db.dictationRecords.filter(r => r.wordId === korean && r.userId === uid);
    const results = await Promise.allSettled(records.map((r: DictationRecord) => db.dictationRecords.delete(r.id)));
    const failed = results.filter(r => r.status === 'rejected').length;
    if (failed > 0) alert(t('mine.dict_delete_partial_failed', lang, { n: failed }));
    setDictGroups(prev => prev.filter(m => m.korean !== korean));
  };

  // ── 词汇错题 ──
  const [vocab, setVocab] = useState<SpellingMistake[]>([]);
  const [vocabLoading, setVocabLoading] = useState(true);
  const [vocabFilter, setVocabFilter] = useState<'all' | 'spelling' | 'sentence'>('all');

  const loadVocab = useCallback(async () => {
    setVocabLoading(true);
    try {
      const all = await db.spellingMistakes.toArray();
      all.sort((a, b) => b.createdAt - a.createdAt);
      setVocab(all);
    } catch {
      setVocab([]);
    } finally {
      setVocabLoading(false);
    }
  }, []);

  const vocabDelete = async (id: string) => {
    try {
      await db.spellingMistakes.delete(id);
    } catch (err) {
      alert(t('mine.vocab_delete_failed', lang) + (err instanceof Error ? err.message : t('mine.vocab_please_retry', lang)));
      return;
    }
    setVocab(prev => prev.filter(m => m.id !== id));
  };

  const vocabFiltered = vocabFilter === 'all' ? vocab : vocab.filter(m => m.mistakeType === vocabFilter);

  const vocabClear = async () => {
    if (vocabFiltered.length === 0) return;
    if (!confirm(t('mine.vocab_clear_confirm', lang, { n: vocabFiltered.length }))) return;
    const results = await Promise.allSettled(vocabFiltered.map(m => db.spellingMistakes.delete(m.id)));
    const failed = results.filter(r => r.status === 'rejected').length;
    if (failed > 0) alert(t('mine.vocab_clear_partial_failed', lang, { n: failed }));
    if (vocabFilter === 'all') setVocab([]);
    else setVocab(prev => prev.filter(m => m.mistakeType !== vocabFilter));
  };

  const vocabRetry = () => {
    const wordIds = [...new Set(vocabFiltered.map(m => m.wordId).filter(Boolean))];
    if (wordIds.length === 0) return;
    router.push(`/review?wordIds=${wordIds.join(',')}`);
  };

  // ── AI 对话错题 ──
  const [ai, setAi] = useState<AiChatMistake[]>([]);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiFilter, setAiFilter] = useState<'all' | 'unreviewed' | 'reviewed'>('all');

  const loadAi = useCallback(async () => {
    setAiLoading(true);
    try {
      const all = await db.aiChatMistakes.toArray();
      all.sort((a, b) => b.createdAt - a.createdAt);
      setAi(all);
    } catch {
      setAi([]);
    } finally {
      setAiLoading(false);
    }
  }, []);

  const aiDelete = async (id: string) => {
    try {
      await db.aiChatMistakes.delete(id);
    } catch (err) {
      alert(t('mine.ai_delete_failed', lang) + (err instanceof Error ? err.message : t('mine.ai_please_retry', lang)));
      return;
    }
    setAi(prev => prev.filter(m => m.id !== id));
  };

  const aiToggle = async (m: AiChatMistake) => {
    const next = m.reviewed ? 0 : 1;
    try {
      await db.aiChatMistakes.update(m.id, { reviewed: next });
    } catch (err) {
      alert(t('mine.ai_mark_failed', lang) + (err instanceof Error ? err.message : t('mine.ai_please_retry', lang)));
      return;
    }
    setAi(prev => prev.map(x => (x.id === m.id ? { ...x, reviewed: next } : x)));
  };

  const aiFiltered =
    aiFilter === 'all' ? ai :
    aiFilter === 'unreviewed' ? ai.filter(m => !m.reviewed) :
    ai.filter(m => m.reviewed);

  useEffect(() => { loadDict(); loadVocab(); loadAi(); }, [loadDict, loadVocab, loadAi]);

  // 默写重练全屏接管
  if (practicing) {
    return (
      <DictationSession
        items={dictGroups.map(m => ({ korean: m.korean, meaning: m.meaning, type: m.type }))}
        onExit={() => { setPracticing(false); loadDict(); }}
        exitLabel={t('mine.dict_exit_label', lang)}
      />
    );
  }

  const containerCls = 'mine-stage';

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'dictation', label: t('mine.mistakes_tab_dictation', lang), count: dictGroups.length },
    { key: 'vocab', label: t('mine.mistakes_tab_vocab', lang), count: vocab.length },
    { key: 'ai', label: t('mine.mistakes_tab_ai', lang), count: ai.length },
  ];

  const loadingCard = (
    <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0 }}>{t('mine.common_loading', lang)}</p>
    </Card>
  );

  const emptyCard = (title: string, desc: string, cta?: { label: string; href?: string; onClick?: () => void }) => (
    <Card variant="hero" tone="mint" padding="lg">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{title}</p>
        <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 18px' }}>{desc}</p>
        {cta && (cta.href ? (
          <Link href={cta.href} style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 'var(--radius-md)', background: 'var(--color-pink-strong)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            {cta.label}
          </Link>
        ) : (
          <Button variant="primary" tone="pink" onClick={cta.onClick}>{cta.label}</Button>
        ))}
      </div>
    </Card>
  );

  const bottomBarPad = isDesktop ? 40 : 'calc(56px + env(safe-area-inset-bottom, 0px))';

  return (
    <div className="mine-scope mine-bg">
    <div className={containerCls} style={{ paddingBottom: tab === 'vocab' && vocabFiltered.length > 0 ? (isDesktop ? 96 : 'calc(112px + env(safe-area-inset-bottom, 0px))') : bottomBarPad }}>
      <button
        onClick={() => router.push('/mine')}
        className="mine-back"
      >
        <ArrowLeft size={14} />
        {t('mine.back', lang)}
      </button>

      <PageHeader
        eyebrow="MISTAKE BOOK"
        title={t('mine.mistakes_title', lang)}
        subtitle={t('mine.mistakes_subtitle', lang)}
        tone="pink"
        flat
      />

      {/* 顶部主 Tab */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {tabs.map(tb => {
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              style={{
                padding: '8px 18px', borderRadius: 'var(--radius-pill)',
                fontSize: 13, fontWeight: 700,
                background: active ? 'var(--color-ink-1)' : 'var(--color-surface-2)',
                color: active ? '#fff' : 'var(--color-ink-3)',
                border: active ? 'none' : '1px solid var(--color-border-2)',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-soft)',
              }}
            >
              {tb.label} {tb.count > 0 && <span style={{ opacity: 0.7 }}>({tb.count})</span>}
            </button>
          );
        })}
      </div>

      {/* ── 默写 Tab ── */}
      {tab === 'dictation' && (
        dictLoading ? loadingCard
        : dictError ? (
          <Card variant="hero" tone="pink" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 12 }}>{t('mine.common_load_error', lang)}</p>
              <Button variant="primary" tone="pink" onClick={loadDict}>{t('mine.common_retry', lang)}</Button>
            </div>
          </Card>
        ) : dictGroups.length === 0 ? emptyCard(t('mine.dict_empty_title', lang), t('mine.dict_empty_desc', lang), { label: t('mine.dict_empty_cta', lang), href: '/dictation' })
        : (
          <Section spacing="normal">
            <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
              {dictGroups.map(m => (
                <Card key={m.korean} variant="default" padding="md">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--color-ink-1)' }}>{m.korean}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-pink-strong)', background: 'var(--color-pink-soft)', borderRadius: 6, padding: '2px 8px' }}>
                          ×{m.wrongCount}
                        </span>
                      </div>
                      {m.meaning && <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{m.meaning}</p>}
                      <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: '2px 0 0' }}>
                        {t('mine.dict_last_wrong', lang, { date: fmtShortDate(m.lastWrongAt, lang) })}
                      </p>
                    </div>
                    <button
                      onClick={() => dictMastered(m.korean)}
                      title={t('mine.dict_mastered_title', lang)}
                      aria-label={t('mine.dict_mastered_aria', lang)}
                      style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-2)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: 'var(--color-ink-3)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Button variant="primary" tone="black" size="lg" fullWidth icon={<PenLine size={16} />} onClick={() => setPracticing(true)}>
                {t('mine.dict_retry_practice', lang)}
              </Button>
            </div>
          </Section>
        )
      )}

      {/* ── 词汇 Tab ── */}
      {tab === 'vocab' && (
        vocabLoading ? loadingCard
        : vocab.length === 0 ? emptyCard(t('mine.vocab_empty_title', lang), t('mine.vocab_empty_desc', lang))
        : (
          <Section spacing="normal">
            {/* 二级过滤 */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {([
                { key: 'all' as const, label: t('mine.vocab_tab_all', lang), count: vocab.length },
                { key: 'spelling' as const, label: t('mine.vocab_tab_spelling', lang), count: vocab.filter(m => m.mistakeType === 'spelling').length },
                { key: 'sentence' as const, label: t('mine.vocab_tab_sentence', lang), count: vocab.filter(m => m.mistakeType === 'sentence').length },
              ]).map(f => {
                const active = vocabFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setVocabFilter(f.key)}
                    style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: '1px solid', borderColor: active ? 'var(--color-pink-strong)' : 'var(--color-border-2)', background: active ? 'var(--color-pink-strong)' : 'var(--color-surface-2)', color: active ? '#fff' : 'var(--color-ink-2)', cursor: 'pointer' }}
                  >
                    {f.label} {f.count > 0 && <span style={{ opacity: 0.7 }}>({f.count})</span>}
                  </button>
                );
              })}
            </div>
            {vocabFiltered.length === 0 ? (
              <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0 }}>{t('mine.ai_filter_empty', lang)}</p>
              </Card>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
                {vocabFiltered.map(m => (
                  <Card key={m.id} variant="default" padding="md">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <AlertCircle size={16} color="var(--color-pink-strong)" />
                          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1)' }}>{m.word}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: m.mistakeType === 'spelling' ? 'var(--color-pink-soft)' : 'var(--color-mint-soft)', color: m.mistakeType === 'spelling' ? 'var(--color-pink-strong)' : 'var(--color-mint-strong)' }}>
                            {m.mistakeType === 'spelling' ? t('mine.vocab_badge_spelling', lang) : t('mine.vocab_badge_sentence', lang)}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 8px' }}>{m.meaning}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ fontSize: 13 }}>
                            <span style={{ color: 'var(--color-ink-3)' }}>{t('mine.vocab_mine_label', lang)}</span>
                            <span style={{ textDecoration: 'line-through', color: 'var(--color-pink-strong)' }}>{m.userInput || t('mine.vocab_not_filled', lang)}</span>
                          </div>
                          <div style={{ fontSize: 13 }}>
                            <span style={{ color: 'var(--color-ink-3)' }}>{t('mine.vocab_correct_label', lang)}</span>
                            <span style={{ color: 'var(--color-mint-strong)', fontWeight: 700 }}>{m.correctAnswer}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => vocabDelete(m.id)}
                          title={t('mine.vocab_delete', lang)}
                          aria-label={t('mine.vocab_delete_aria', lang)}
                          style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={13} />
                        </button>
                        <span style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>{timeAgo(m.createdAt, lang)}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>
        )
      )}

      {/* 词汇 Tab 固定底栏 */}
      {tab === 'vocab' && vocabFiltered.length > 0 && (
        <div style={{ position: 'fixed', bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', left: 0, right: 0, background: 'var(--color-surface-1)', borderTop: '1px solid var(--color-border-1)', zIndex: 60, padding: '12px 16px' }}>
          <div style={{ display: 'flex', gap: 8, maxWidth: isDesktop ? 720 : '100%', margin: '0 auto' }}>
            <Button variant="secondary" fullWidth icon={<Trash2 size={14} />} onClick={vocabClear}>
              {t('mine.vocab_clear_prefix', lang)}
            </Button>
            <Button variant="primary" tone="black" fullWidth icon={<RotateCcw size={14} />} onClick={vocabRetry}>
              {t('mine.vocab_retry', lang)}
            </Button>
          </div>
        </div>
      )}

      {/* ── AI Tab ── */}
      {tab === 'ai' && (
        aiLoading ? loadingCard
        : ai.length === 0 ? emptyCard(t('mine.ai_empty_title', lang), t('mine.ai_empty_desc', lang), { label: t('mine.ai_empty_cta', lang), href: '/animal-city.html' })
        : (
          <Section spacing="normal">
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {([
                { key: 'all' as const, label: t('mine.ai_tab_all', lang), count: ai.length },
                { key: 'unreviewed' as const, label: t('mine.ai_tab_unreviewed', lang), count: ai.filter(m => !m.reviewed).length },
                { key: 'reviewed' as const, label: t('mine.ai_tab_reviewed', lang), count: ai.filter(m => m.reviewed).length },
              ]).map(f => {
                const active = aiFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setAiFilter(f.key)}
                    style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: '1px solid', borderColor: active ? 'var(--color-pink-strong)' : 'var(--color-border-2)', background: active ? 'var(--color-pink-strong)' : 'var(--color-surface-2)', color: active ? '#fff' : 'var(--color-ink-2)', cursor: 'pointer' }}
                  >
                    {f.label} {f.count > 0 && <span style={{ opacity: 0.7 }}>({f.count})</span>}
                  </button>
                );
              })}
            </div>
            {aiFiltered.length === 0 ? (
              <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0 }}>{t('mine.ai_filter_empty', lang)}</p>
              </Card>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {aiFiltered.map(m => (
                  <Card key={m.id} variant="default" padding="md">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-pink-strong)', background: 'var(--color-pink-soft)', borderRadius: 6, padding: '2px 8px' }}>
                            {m.scenarioName}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>{timeAgo(m.createdAt, lang)}</span>
                          {m.reviewed ? (
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-mint-strong, #2e8b7d)', background: 'var(--color-mint-soft, #eaf8f5)', borderRadius: 6, padding: '2px 6px' }}>{t('mine.ai_reviewed_badge', lang)}</span>
                          ) : null}
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 6px', lineHeight: 1.5 }}>
                          {t('mine.ai_original', lang)}{m.userInput}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, textDecoration: 'line-through', color: 'var(--color-ink-4)' }}>{m.wrongPart}</span>
                          <span style={{ fontSize: 13, color: 'var(--color-ink-4)' }}>→</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-mint-strong, #2e8b7d)' }}>{m.correctPart}</span>
                        </div>
                        {m.grammarError && (
                          <p style={{ fontSize: 12, color: 'var(--color-ink-2)', margin: 0, lineHeight: 1.55, background: 'var(--color-surface-2)', borderRadius: 8, padding: '6px 10px' }}>
                            <AlertTriangle size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: '-1px' }} />
                            {m.grammarError}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                        <button
                          onClick={() => aiToggle(m)}
                          title={m.reviewed ? t('mine.ai_unmark_reviewed', lang) : t('mine.ai_mark_reviewed', lang)}
                          aria-label={m.reviewed ? t('mine.ai_unmark_reviewed', lang) : t('mine.ai_mark_reviewed', lang)}
                          style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-2)', background: m.reviewed ? 'var(--color-mint-soft, #eaf8f5)' : 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: m.reviewed ? 'var(--color-mint-strong, #2e8b7d)' : 'var(--color-ink-3)' }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => aiDelete(m.id)}
                          title={t('mine.ai_delete', lang)}
                          aria-label={t('mine.ai_delete_aria', lang)}
                          style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-2)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-ink-3)' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>
        )
      )}
    </div>
    </div>
  );
}

export default function MistakesPage() {
  return (
    <Suspense fallback={null}>
      <MistakesInner />
    </Suspense>
  );
}
