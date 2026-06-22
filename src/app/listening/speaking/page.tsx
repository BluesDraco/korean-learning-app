'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Zap, ArrowLeft } from 'lucide-react';
import { DictationSourcePicker, buildItemsFromConfig } from '@/components/dictation/DictationSourcePicker';
import { SpeakingSession } from '@/components/speaking/SpeakingSession';
import type { SourceConfig } from '@/components/dictation/DictationSourcePicker';
import type { SpeakingItem } from '@/components/speaking/SpeakingSession';

type PageState = 'config' | 'session';

const DEFAULT_SOURCE: SourceConfig = {
  type: 'builtin',
  builtin: { packId: 'beginner', mode: 'word' },
};

export default function ListeningSpeakingPage() {
  const [pageState, setPageState] = useState<PageState>('config');
  const [sourceConfig, setSourceConfig] = useState<SourceConfig>(DEFAULT_SOURCE);
  const [items, setItems] = useState<SpeakingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleStart() {
    setLoading(true);
    setError('');
    try {
      const result = await buildItemsFromConfig(sourceConfig);
      if (result.length === 0) {
        setError('没有找到可用的题目，请检查来源配置。');
        return;
      }
      setItems(result.slice(0, 30));
      setPageState('session');
    } catch {
      setError('加载题目失败，请重试。');
    } finally {
      setLoading(false);
    }
  }

  async function handleDailyChallenge() {
    setLoading(true);
    setError('');
    try {
      const { dictationWordPacks } = await import('@/data/dictationWords');
      const { dictationSentences } = await import('@/data/dictationSentences');
      const d = new Date();
      const todayKey = `speaking-daily-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      let stored: SpeakingItem[] | null = null;
      try { stored = JSON.parse(localStorage.getItem(todayKey) ?? 'null'); } catch {}
      let dailyItems: SpeakingItem[] = stored ?? [];
      if (dailyItems.length === 0) {
        const shuffleArr = <T,>(arr: T[]) => {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        };
        const allWords = dictationWordPacks.flatMap(p => p.words).map(w => ({ korean: w.korean, meaning: w.meaning, type: 'word' as const }));
        const allSents = dictationSentences.map(s => ({ korean: s.korean, meaning: s.chinese, type: 'sentence' as const }));
        dailyItems = [...shuffleArr(allWords).slice(0, 8), ...shuffleArr(allSents).slice(0, 4)];
        try { localStorage.setItem(todayKey, JSON.stringify(dailyItems)); } catch {}
      }
      if (dailyItems.length === 0) {
        setError('今日挑战加载失败，请重试。');
        return;
      }
      setItems(dailyItems);
      setPageState('session');
    } catch {
      setError('今日挑战加载失败，请重试。');
    } finally {
      setLoading(false);
    }
  }

  if (pageState === 'session') {
    return (
      <div className="py-4 max-w-2xl md:max-w-3xl mx-auto px-1">
        <SpeakingSession
          items={items}
          onExit={() => setPageState('config')}
        />
      </div>
    );
  }

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-5 pb-24 md:max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/listening" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2">
          <ArrowLeft size={16} /> 返回
        </Link>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">听说练习</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">看中文意思，用韩语说出来</p>
      </div>

      {/* Daily challenge */}
      <button
        onClick={handleDailyChallenge}
        disabled={loading}
        style={{
          width: '100%', padding: '14px 18px', borderRadius: 18,
          background: 'linear-gradient(135deg, #aee3d8, #81b5a1)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={20} style={{ color: 'white' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: 'white', margin: 0 }}>今日挑战</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0, marginTop: 2 }}>每日12题 · 词汇+句子混合</p>
        </div>
      </button>

      {/* Source picker */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)]">题目来源</h2>
        <DictationSourcePicker config={sourceConfig} onChange={setSourceConfig} />
      </div>

      {/* Browser notice */}
      <div style={{ background: '#fff6ee', borderRadius: 14, padding: '12px 16px', display: 'flex', gap: 10 }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
        <p style={{ fontSize: 12, color: '#89756e', margin: 0, lineHeight: 1.6 }}>
          听说练习需要麦克风权限。建议使用 Chrome 浏览器以获得最佳语音识别效果。
        </p>
      </div>

      {/* Error */}
      {error && (
        <p style={{ fontSize: 13, color: '#e04a6a', textAlign: 'center' }}>{error}</p>
      )}

      {/* Start button */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 pb-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] md:left-52" style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-2xl md:max-w-3xl mx-auto">
          <button
            onClick={handleStart}
            disabled={loading}
            style={{
              width: '100%', padding: '14px 0', borderRadius: 16,
              background: loading ? '#eee0d8' : '#241917',
              color: loading ? '#89756e' : '#fff',
              fontSize: 15, fontWeight: 800, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Play size={16} />
            {loading ? '加载中...' : '开始听说'}
          </button>
        </div>
      </div>
    </div>
  );
}
