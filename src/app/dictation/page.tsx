'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Zap, ArrowLeft } from 'lucide-react';
import { DictationSourcePicker, buildItemsFromConfig } from '@/components/dictation/DictationSourcePicker';
import { DictationSession } from '@/components/dictation/DictationSession';
import type { SourceConfig } from '@/components/dictation/DictationSourcePicker';
import type { DictationItem } from '@/components/dictation/DictationSession';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';
type PageState = 'config' | 'session';

const DIFFICULTY_LABELS: Record<Difficulty, { label: string; desc: string; color: string }> = {
  beginner:     { label: '初级', desc: '慢速·可重复3次·显示释义', color: '#81b5a1' },
  intermediate: { label: '中级', desc: '中速·可重复2次·无提示',   color: '#e8a87c' },
  advanced:     { label: '高级', desc: '快速·仅播放1次·无提示',   color: '#e04a6a' },
};

const DEFAULT_SOURCE: SourceConfig = {
  type: 'builtin',
  builtin: { packId: 'beginner', mode: 'word' },
};

export default function DictationPage() {
  const [pageState, setPageState] = useState<PageState>('config');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [sourceConfig, setSourceConfig] = useState<SourceConfig>(DEFAULT_SOURCE);
  const [items, setItems] = useState<DictationItem[]>([]);
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
      const todayKey = `dictation-daily-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      let stored: DictationItem[] | null = null;
      try { stored = JSON.parse(localStorage.getItem(todayKey) ?? 'null'); } catch {}
      let dailyItems: DictationItem[] = stored ?? [];
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
        dailyItems = [...shuffleArr(allWords).slice(0, 10), ...shuffleArr(allSents).slice(0, 2)];
        try { localStorage.setItem(todayKey, JSON.stringify(dailyItems)); } catch {}
      }
      setItems(dailyItems);
      setDifficulty('intermediate');
      setPageState('session');
    } catch {
      setError('今日挑战加载失败，请重试。');
    } finally {
      setLoading(false);
    }
  }

  if (pageState === 'session') {
    return (
      <div className="py-4 max-w-2xl mx-auto px-1">
        <DictationSession
          items={items}
          difficulty={difficulty}
          onExit={() => setPageState('config')}
        />
      </div>
    );
  }

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div>
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2">
          <ArrowLeft size={16} /> 返回
        </Link>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">听写练习</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">听音输入韩语，精准训练拼写能力</p>
      </div>

      {/* Daily challenge shortcut */}
      <button
        onClick={handleDailyChallenge}
        disabled={loading}
        style={{
          width: '100%', padding: '14px 18px', borderRadius: 18,
          background: 'linear-gradient(135deg, #ff7fa8, #b49ccf)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={20} style={{ color: 'white' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: 'white', margin: 0 }}>今日挑战</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0, marginTop: 2 }}>每日12题 · 词汇+句子混合</p>
        </div>
      </button>

      {/* Difficulty */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)]">难度</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(Object.entries(DIFFICULTY_LABELS) as [Difficulty, typeof DIFFICULTY_LABELS[Difficulty]][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 12,
                background: difficulty === key ? `${val.color}18` : 'transparent',
                border: `1.5px solid ${difficulty === key ? val.color : '#eee0d8'}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: val.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#241917' }}>{val.label}</span>
              </div>
              <span style={{ fontSize: 12, color: '#89756e' }}>{val.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Source picker */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)]">题目来源</h2>
        <DictationSourcePicker config={sourceConfig} onChange={setSourceConfig} />
      </div>

      {/* Error */}
      {error && (
        <p style={{ fontSize: 13, color: '#e04a6a', textAlign: 'center' }}>{error}</p>
      )}

      {/* Start button */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 pb-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] md:left-[108px]" style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-2xl mx-auto">
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
            {loading ? '加载中...' : '开始听写'}
          </button>
        </div>
      </div>
    </div>
  );
}
