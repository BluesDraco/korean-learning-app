'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, AlertCircle, RotateCcw } from 'lucide-react';
import { db } from '@/lib/db';
import type { SpellingMistake } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, mintText: '#4e746d' };
const DARK_C  = { ..._DARK_C, mintText: '#5ecfb8' };

type TabType = 'all' | 'spelling' | 'sentence';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  return `${days}天前`;
}

export default function VocabularyMistakesPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;

  const router = useRouter();
  const [mistakes, setMistakes] = useState<SpellingMistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>('all');

  const loadMistakes = useCallback(async () => {
    setLoading(true);
    try {
      const all = await db.spellingMistakes.toArray();
      all.sort((a, b) => b.createdAt - a.createdAt);
      setMistakes(all);
    } catch {
      setMistakes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMistakes(); }, [loadMistakes]);

  const deleteMistake = async (id: string) => {
    await db.spellingMistakes.delete(id).catch(() => {});
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const clearAll = async () => {
    const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
    await Promise.all(filtered.map(m => db.spellingMistakes.delete(m.id).catch(() => {})));
    if (tab === 'all') {
      setMistakes([]);
    } else {
      setMistakes(prev => prev.filter(m => m.mistakeType !== tab));
    }
  };

  const retryMistakes = () => {
    const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
    const wordIds = [...new Set(filtered.map(m => m.wordId).filter(Boolean))];
    if (wordIds.length === 0) return;
    router.push(`/review?wordIds=${wordIds.join(',')}`);
  };

  const filtered = tab === 'all' ? mistakes : mistakes.filter(m => m.mistakeType === tab);
  const spellingCount = mistakes.filter(m => m.mistakeType === 'spelling').length;
  const sentenceCount = mistakes.filter(m => m.mistakeType === 'sentence').length;

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: mistakes.length },
    { key: 'spelling', label: '默写', count: spellingCount },
    { key: 'sentence', label: '造句', count: sentenceCount },
  ];

  return (
    <div className="flex flex-col px-4 pt-4 pb-[calc(80px+env(safe-area-inset-bottom,0px))]" style={{ minHeight: 'calc(100dvh - 60px)', background: C.bg }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink, boxShadow: '0 4px 12px rgba(78,52,46,.06)' }}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <AlertCircle size={20} style={{ color: '#f0799b' }} />
          <span className="text-[22px] font-black" style={{ color: C.ink }}>我的错题</span>
          {mistakes.length > 0 && (
            <span className="text-[12px] font-black px-2 py-0.5 rounded-full" style={{ background: C.pinkSoft, color: C.pink }}>
              {mistakes.length}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-full text-[13px] font-black transition-colors"
            style={{
              background: tab === t.key ? C.black : C.card,
              color: tab === t.key ? '#fff' : C.muted,
              border: `1px solid ${tab === t.key ? 'transparent' : C.line}`,
            }}
          >
            {t.label} {t.count > 0 && <span style={{ opacity: 0.7 }}>({t.count})</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: C.pink }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="text-4xl">🎉</div>
          <p className="text-[16px] font-black" style={{ color: C.ink }}>暂无错题</p>
          <p className="text-[13px]" style={{ color: C.muted }}>继续保持，做练习时的错误会记录在这里</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(m => (
            <div
              key={m.id}
              className="rounded-[20px] p-4"
              style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: '0 4px 16px rgba(78,52,46,.06)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[20px] font-black" style={{ color: C.ink }}>{m.word}</span>
                    <span className="text-[12px] px-2 py-0.5 rounded-full font-bold" style={{ background: m.mistakeType === 'spelling' ? C.pinkSoft : C.mintBg, color: m.mistakeType === 'spelling' ? C.pink : C.mintText }}>
                      {m.mistakeType === 'spelling' ? '默写' : '造句'}
                    </span>
                  </div>
                  <div className="text-[13px] mb-2" style={{ color: C.muted }}>{m.meaning}</div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[13px]">
                      <span style={{ color: C.muted }}>我的：</span>
                      <span style={{ textDecoration: 'line-through', color: '#f0799b' }}>{m.userInput || '（未填写）'}</span>
                    </div>
                    <div className="text-[13px]">
                      <span style={{ color: C.muted }}>正确：</span>
                      <span style={{ color: '#3aafa9', fontWeight: 700 }}>{m.correctAnswer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => deleteMistake(m.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: C.pinkSoft, border: 'none', color: C.pink }}
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="text-[11px]" style={{ color: C.muted }}>{timeAgo(m.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom actions */}
      {filtered.length > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 px-4 py-3 flex gap-2"
          style={{ background: C.bg, borderTop: `1px solid ${C.line}`, zIndex: 60 }}>
          <button
            onClick={clearAll}
            className="flex-1 py-3 rounded-full text-[13px] font-black flex items-center justify-center gap-1.5"
            style={{ background: C.card, border: `1px solid ${C.line}`, color: C.muted }}
          >
            <Trash2 size={14} />清空{tab !== 'all' ? `${tabs.find(t => t.key === tab)?.label}` : '全部'}
          </button>
          <button
            onClick={retryMistakes}
            className="flex-1 py-3 rounded-full text-[13px] font-black flex items-center justify-center gap-1.5"
            style={{ background: C.black, color: '#fff', border: 'none' }}
          >
            <RotateCcw size={14} />重练错题
          </button>
        </div>
      )}
    </div>
  );
}
