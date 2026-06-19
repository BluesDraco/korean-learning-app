'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { db } from '@/lib/db';
import { getAllThemes, getLevelWords, getThemeWords } from '@/data/vocabulary';
import type { WordEntry } from '@/types';
import type { DictationItem } from './DictationSession';

type SourceType = 'builtin' | 'vocabulary' | 'wordbook' | 'custom';

interface BuiltinConfig {
  packId: 'beginner' | 'intermediate' | 'advanced';
  mode: 'word' | 'sentence' | 'mixed';
}

interface VocabConfig {
  kind: 'theme' | 'level';
  id: string;
  name: string;
}

interface WordbookConfig {
  id: string;
  name: string;
}

export interface SourceConfig {
  type: SourceType;
  builtin?: BuiltinConfig;
  vocab?: VocabConfig;
  wordbook?: WordbookConfig;
  customText?: string;
}

interface DictationSourcePickerProps {
  config: SourceConfig;
  onChange: (config: SourceConfig) => void;
}

export async function buildItemsFromConfig(config: SourceConfig): Promise<DictationItem[]> {
  if (config.type === 'builtin' && config.builtin) {
    const { dictationWordPacks } = await import('@/data/dictationWords');
    const { dictationSentences } = await import('@/data/dictationSentences');
    const packId = config.builtin.packId;
    const mode = config.builtin.mode;
    const levelMap: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
      beginner: 'beginner', intermediate: 'intermediate', advanced: 'advanced',
    };
    const sentLevel = levelMap[packId];
    const words: DictationItem[] = (dictationWordPacks.find(p => p.id === packId)?.words ?? [])
      .map(w => ({ korean: w.korean, meaning: w.meaning, type: 'word' as const }));
    const sentences: DictationItem[] = dictationSentences
      .filter(s => s.level === sentLevel)
      .map(s => ({ korean: s.korean, meaning: s.chinese, type: 'sentence' as const }));
    if (mode === 'word') return shuffle(words);
    if (mode === 'sentence') return shuffle(sentences);
    return shuffle([...words, ...sentences]);
  }

  if (config.type === 'vocabulary' && config.vocab) {
    const { kind, id } = config.vocab;
    const entries = kind === 'theme'
      ? getThemeWords(id)
      : getLevelWords(parseInt(id));
    return shuffle(
      entries.map((e: WordEntry) => ({ korean: e.korean, meaning: e.meanings[0]?.chinese ?? '', type: 'word' as const }))
    );
  }

  if (config.type === 'wordbook' && config.wordbook) {
    const book = await db.wordBooks.get(config.wordbook.id);
    if (!book) return [];
    const words = await db.words.where('id').anyOf(book.wordIds).toArray();
    return shuffle(
      words.filter(Boolean).map(w => ({ korean: w!.word, meaning: w!.meaning, type: 'word' as const }))
    );
  }

  if (config.type === 'custom' && config.customText) {
    const lines = config.customText.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 20);
    return lines.map(line => {
      const parts = line.split(/\s+/);
      const korean = parts[0];
      const meaning = parts.slice(1).join(' ') || '';
      return { korean, meaning, type: 'word' as const };
    });
  }

  return [];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DictationSourcePicker({ config, onChange }: DictationSourcePickerProps) {
  const [themes, setThemes] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [books, setBooks] = useState<{ id: string; name: string; count: number }[]>([]);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    setThemes(getAllThemes().map(t => ({ id: t.id, name: t.name, emoji: t.emoji })));
    db.wordBooks.toArray().then(bs => {
      setBooks(bs.map(b => ({ id: b.id, name: b.name, count: b.wordIds.length })));
    }).catch(() => {});
  }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Source type tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {([
          { type: 'builtin' as SourceType, label: '内置词库', icon: '📚' },
          { type: 'vocabulary' as SourceType, label: '词汇库', icon: '🗂️' },
          { type: 'wordbook' as SourceType, label: '我的单词本', icon: '📖' },
          { type: 'custom' as SourceType, label: '自定义', icon: '✏️' },
        ]).map(tab => (
          <button
            key={tab.type}
            onClick={() => onChange({ ...config, type: tab.type })}
            style={{
              padding: '10px 4px', borderRadius: 12,
              background: config.type === tab.type ? '#241917' : '#f5ede8',
              color: config.type === tab.type ? '#fff' : '#5a4640',
              border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Builtin config */}
      {config.type === 'builtin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <p style={{ fontSize: 12, color: '#89756e', fontWeight: 700, marginBottom: 6 }}>词包</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {([
                { id: 'beginner', label: '初级日常' },
                { id: 'intermediate', label: '中级生活' },
                { id: 'advanced', label: '高级进阶' },
              ] as const).map(p => (
                <button key={p.id} onClick={() => onChange({ ...config, builtin: { ...config.builtin!, packId: p.id } })}
                  style={{ flex: 1, padding: '8px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: config.builtin?.packId === p.id ? '#ff7fa8' : '#f5ede8',
                    color: config.builtin?.packId === p.id ? '#fff' : '#5a4640',
                  }}>{p.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#89756e', fontWeight: 700, marginBottom: 6 }}>题型</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {([
                { id: 'word', label: '单词' },
                { id: 'sentence', label: '句子' },
                { id: 'mixed', label: '混合' },
              ] as const).map(m => (
                <button key={m.id} onClick={() => onChange({ ...config, builtin: { ...config.builtin!, mode: m.id } })}
                  style={{ flex: 1, padding: '8px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: config.builtin?.mode === m.id ? '#ff7fa8' : '#f5ede8',
                    color: config.builtin?.mode === m.id ? '#fff' : '#5a4640',
                  }}>{m.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vocabulary config */}
      {config.type === 'vocabulary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Themes */}
          <button
            onClick={() => setVocabOpen(v => !v)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: '#f5ede8', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#241917' }}>
              {config.vocab?.kind === 'theme' ? `主题：${config.vocab.name}` : '选择主题词包'}
            </span>
            {vocabOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {vocabOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 200, overflowY: 'auto', borderRadius: 12, border: '1px solid #eee0d8', padding: 8 }}>
              {themes.map(t => (
                <button key={t.id}
                  onClick={() => { onChange({ ...config, vocab: { kind: 'theme', id: t.id, name: t.name } }); setVocabOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 10, background: config.vocab?.id === t.id ? '#fff0f5' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 13, color: '#241917' }}>{t.emoji} {t.name}</span>
                  {config.vocab?.id === t.id && <Check size={13} style={{ color: '#ff7fa8' }} />}
                </button>
              ))}
            </div>
          )}
          {/* TOPIK levels */}
          <div>
            <p style={{ fontSize: 12, color: '#89756e', fontWeight: 700, marginBottom: 6 }}>或按TOPIK等级</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[1,2,3,4,5,6].map(lv => (
                <button key={lv}
                  onClick={() => onChange({ ...config, vocab: { kind: 'level', id: String(lv), name: `TOPIK ${lv}级` } })}
                  style={{ width: 44, height: 36, borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                    background: config.vocab?.kind === 'level' && config.vocab.id === String(lv) ? '#ff7fa8' : '#f5ede8',
                    color: config.vocab?.kind === 'level' && config.vocab.id === String(lv) ? '#fff' : '#5a4640',
                  }}>{lv}级</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wordbook config */}
      {config.type === 'wordbook' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {books.length === 0 ? (
            <p style={{ fontSize: 13, color: '#89756e', textAlign: 'center', padding: '12px 0' }}>暂无单词本，请先在词汇页创建</p>
          ) : books.map(b => (
            <button key={b.id}
              onClick={() => onChange({ ...config, wordbook: { id: b.id, name: b.name } })}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
                background: config.wordbook?.id === b.id ? '#fff0f5' : '#f5ede8', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 13, color: '#241917', fontWeight: 600 }}>{b.name}</span>
              <span style={{ fontSize: 12, color: '#89756e' }}>{b.count} 词</span>
            </button>
          ))}
        </div>
      )}

      {/* Custom input */}
      {config.type === 'custom' && (
        <div>
          <p style={{ fontSize: 12, color: '#89756e', marginBottom: 6 }}>每行一个词，格式：<code>韩文</code> 或 <code>韩文 中文释义</code>，最多20行</p>
          <textarea
            value={config.customText ?? ''}
            onChange={e => onChange({ ...config, customText: e.target.value })}
            rows={6}
            placeholder={'안녕하세요 你好\n감사합니다 谢谢\n사랑해요'}
            style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid #eee0d8', fontSize: 14, color: '#241917', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
