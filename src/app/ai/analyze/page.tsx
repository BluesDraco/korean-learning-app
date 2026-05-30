'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Volume2, ExternalLink, Lightbulb, Sparkles, Languages, BookOpen, Clock, Trash2, Plus, Pencil, Check, LogIn, X } from 'lucide-react';
import Link from 'next/link';
import { knowledgeCategories } from '@/data/knowledge';
import { grammarPoints } from '@/data/grammar';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useAuth } from '@/components/AuthProvider';
import { speak } from '@/lib/tts';

interface AnalyzedWord {
  text: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  emoji: string;
}

interface AnalyzedGrammar {
  pattern: string;
  title: string;
  usage: string;
  explanation: string;
  level: string;
  conjugation: string;
  examples: { ko: string; zh: string }[];
}

interface AnalysisResult {
  original: string;
  fullTranslation: string;
  words: AnalyzedWord[];
  grammar: AnalyzedGrammar[];
  particles: { text: string; explanation: string }[];
}

interface HistoryEntry {
  id: string;
  timestamp: string;
  snippet: string;
  wordCount: number;
  grammarCount: number;
  result: AnalysisResult;
}

const HISTORY_KEY = 'analyze-history';
const MAX_HISTORY = 20;

function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
  } catch { /* quota exceeded, ignore */ }
}

// ── Build dictionary ─────────────────────────────────────────
function buildDictionary() {
  const map = new Map<string, { pronunciation: string; meaning: string; partOfSpeech: string; emoji: string }>();
  for (const cat of knowledgeCategories) {
    for (const w of cat.words) {
      map.set(w.word, {
        pronunciation: w.pronunciation,
        meaning: w.meaning,
        partOfSpeech: w.partOfSpeech,
        emoji: w.emoji,
      });
    }
  }
  return map;
}

// ── Common phrase translations ────────────────────────────────
const phraseTranslations: Record<string, string> = {
  '안녕하세요': '你好',
  '감사합니다': '谢谢',
  '고맙습니다': '谢谢',
  '죄송합니다': '对不起',
  '미안합니다': '对不起',
  '사랑해요': '我爱你',
  '좋아해요': '我喜欢你',
  '반갑습니다': '很高兴见到你',
  '잘 부탁드립니다': '请多关照',
  '수고하셨습니다': '辛苦了',
  '맛있게 드세요': '请慢用',
  '잘 먹겠습니다': '我会好好吃的',
  '잘 먹었습니다': '我吃好了',
  '다녀오겠습니다': '我出门了',
  '다녀왔습니다': '我回来了',
  '안녕히 가세요': '再见（对离开的人）',
  '안녕히 계세요': '再见（对留下的人）',
  '생일 축하합니다': '生日快乐',
  '새해 복 많이 받으세요': '新年快乐',
  '건강하세요': '祝您健康',
  '괜찮아요': '没关系/还可以',
  '알겠습니다': '我知道了',
  '모르겠습니다': '我不知道',
  '도와주세요': '请帮帮我',
  '잠시만요': '等一下',
  '실례합니다': '失礼了/打扰一下',
  '축하합니다': '祝贺你',
  '좋은 아침입니다': '早上好',
  '안녕히 주무세요': '晚安',
  '또 만나요': '再见/下次见',
  '어서 오세요': '欢迎光临',
  '화이팅': '加油',
  '힘내세요': '加油/振作起来',
  '걱정하지 마세요': '别担心',
  '천천히 말씀해 주세요': '请说慢一点',
  '한국어를 공부하고 있어요': '我正在学韩语',
  '한국어를 배우고 있어요': '我正在学韩语',
};

// ── Particle explanations ────────────────────────────────────
const particleExplanations: Record<string, string> = {
  '은': '主题助词（用于辅音后），表示句子的主题，相当于"~是/关于~"',
  '는': '主题助词（用于元音后），表示句子的主题，相当于"~是/关于~"',
  '이': '主格助词（用于辅音后），表示主语',
  '가': '主格助词（用于元音后），表示主语',
  '을': '宾格助词（用于辅音后），表示动作的宾语',
  '를': '宾格助词（用于元音后），表示动作的宾语',
  '에': '地点/时间助词，表示"在/到/于"',
  '에서': '场所助词，表示动作进行的场所"在~"',
  '로': '方向/工具助词，表示"向~/用~"',
  '에게': '给予助词，表示"给~（人/动物）"',
  '와': '连接助词"和/与"（用于元音后）',
  '과': '连接助词"和/与"（用于辅音后）',
  '도': '助词"也"',
  '만': '助词"只/仅"',
  '의': '所属助词"的"',
  '보다': '比较助词"比~"',
  '부터': '助词"从~开始"',
  '까지': '助词"到~为止"',
};

// ── Analyze ──────────────────────────────────────────────────
function analyzeFull(text: string): AnalysisResult {
  const dictionary = buildDictionary();
  const trimmed = text.trim();
  const result: AnalysisResult = {
    original: trimmed,
    fullTranslation: '',
    words: [],
    grammar: [],
    particles: [],
  };

  if (!trimmed) return result;

  // Try full phrase translation first
  if (phraseTranslations[trimmed]) {
    result.fullTranslation = phraseTranslations[trimmed];
  }

  // Tokenize
  const tokens = trimmed.split(/[\s]+/).filter(Boolean);
  const allParticles = Object.keys(particleExplanations);

  for (const token of tokens) {
    const clean = token.replace(/[.,!?~]+$/, '');

    // Exact dictionary match
    const dictEntry = dictionary.get(clean);
    if (dictEntry) {
      result.words.push({
        text: clean,
        pronunciation: dictEntry.pronunciation,
        meaning: dictEntry.meaning,
        partOfSpeech: dictEntry.partOfSpeech,
        emoji: dictEntry.emoji,
      });
      continue;
    }

    // Check for attached particles
    let found = false;
    for (const particle of allParticles.sort((a, b) => b.length - a.length)) {
      if (clean.endsWith(particle) && clean.length > particle.length) {
        const stem = clean.slice(0, -particle.length);
        // Try stem in dictionary
        const stemEntry = dictionary.get(stem) || dictionary.get(stem + '다');
        if (stemEntry) {
          result.words.push({
            text: clean,
            pronunciation: stemEntry.pronunciation,
            meaning: stemEntry.meaning,
            partOfSpeech: stemEntry.partOfSpeech,
            emoji: stemEntry.emoji,
          });
          result.particles.push({
            text: particle,
            explanation: particleExplanations[particle] || `${particle} - 韩语助词`,
          });
          found = true;
          break;
        }
        // Also try without particle specifically for common words
        if (stem.length >= 1) {
          result.words.push({
            text: clean,
            pronunciation: '',
            meaning: `"${stem}" + 助词${particle}`,
            partOfSpeech: '未知+助词',
            emoji: '🔤',
          });
          result.particles.push({
            text: particle,
            explanation: particleExplanations[particle] || `${particle} - 韩语助词`,
          });
          found = true;
          break;
        }
      }
    }
    if (found) continue;

    // Verb ending detection
    const verbEndings = ['습니다', 'ㅂ니다', '아요', '어요', '해요', '세요', '으세요', '았어요', '었어요', '했어요', '겠습니다', 'ㄹ게요', '을게요', '네요', '고요', '니까', '면서', '지만', '는데', '거나'];
    for (const ending of verbEndings.sort((a, b) => b.length - a.length)) {
      if (clean.endsWith(ending) && clean.length > ending.length) {
        const stem = clean.slice(0, -ending.length);
        const stemEntry = dictionary.get(stem) || dictionary.get(stem + '다');
        if (stemEntry) {
          result.words.push({
            text: clean,
            pronunciation: stemEntry.pronunciation,
            meaning: `${stemEntry.meaning}（${ending} 语尾变化）`,
            partOfSpeech: '动词/形容词',
            emoji: stemEntry.emoji,
          });
          found = true;
          break;
        }
      }
    }
    if (found) continue;

    // Unknown word
    result.words.push({
      text: clean,
      pronunciation: '',
      meaning: '词典未收录',
      partOfSpeech: '未知',
      emoji: '❓',
    });
  }

  // Match grammar patterns
  const matchedGrammarIds = new Set<string>();
  for (const gp of grammarPoints) {
    if (matchedGrammarIds.has(gp.id)) continue;
    const patternStripped = gp.pattern.replace(/~/g, '').replace(/\s/g, '');
    if (trimmed.replace(/\s/g, '').includes(patternStripped) && patternStripped.length >= 1) {
      result.grammar.push({
        pattern: gp.pattern,
        title: gp.title,
        usage: gp.usage,
        explanation: gp.explanation,
        level: gp.level,
        conjugation: gp.conjugation,
        examples: gp.examples.slice(0, 2),
      });
      matchedGrammarIds.add(gp.id);
    }
  }

  // Build full translation if not matched by phrase
  if (!result.fullTranslation && result.words.length > 0) {
    const parts = result.words.map((w) => w.meaning.split('（')[0].split('(')[0]);
    result.fullTranslation = parts.join(' ') + '（逐词直译）';
  }

  return result;
}

function formatTimestamp(ts: string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleString('zh-CN', { hour12: false });
  } catch {
    return ts;
  }
}

export default function AIAnalyzePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'analyze' | 'history'>('analyze');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="py-4 space-y-3">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">对话拆解</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          输入韩语句子，获得整句翻译、逐词拆解和语法分析
        </p>
      </div>

      {/* AI enhancement banner for unauthenticated users */}
      {!user && !bannerDismissed && (
        <div className="bg-gradient-to-r from-[var(--purple-soft)]/8 to-[var(--pink-primary)]/8 border border-[var(--purple-soft)]/15 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--purple-soft)] shrink-0" />
            <span className="text-xs text-[var(--text-secondary)]">
              当前使用离线词典分析，<span className="font-medium text-[var(--text-primary)]">登录后可使用DeepSeek AI增强分析</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/auth/login?redirect=/ai/analyze"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--pink-primary)] text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <LogIn size={12} />
              登录
            </Link>
            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5">
        <button
          onClick={() => setTab('analyze')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === 'analyze'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <Search size={15} />
          分析
        </button>
        <button
          onClick={() => setTab('history')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === 'history'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <Clock size={15} />
          历史记录
        </button>
      </div>

      {tab === 'analyze' && <AnalyzerForm />}
      {tab === 'history' && <HistoryTab />}
    </div>
  );
}

function AnalyzerForm() {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Word bank state
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set());
  // Custom meanings for unknown words
  const [customMeanings, setCustomMeanings] = useState<Record<string, string>>({});
  // Editing state for inline forms
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setAnalyzing(true);

    let r: AnalysisResult;
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: input.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        r = {
          original: input.trim(),
          fullTranslation: data.fullTranslation || '',
          words: data.words || [],
          grammar: data.grammar || [],
          particles: data.particles || [],
        };
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Fallback to local analysis
      await new Promise((r2) => setTimeout(r2, 300));
      r = analyzeFull(input);
    }
    setResult(r);

    // Save to history
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      snippet: input.trim().slice(0, 50),
      wordCount: r.words.length,
      grammarCount: r.grammar.length,
      result: r,
    };
    const history = loadHistory();
    history.unshift(entry);
    saveHistory(history);

    setAnalyzing(false);
    setAddedWords(new Set());
    setCustomMeanings({});
    setEditingWord(null);
  };

  const handleAddToWordBank = (wordText: string) => {
    setAddedWords(prev => {
      const next = new Set(prev);
      next.add(wordText);
      return next;
    });
  };

  const handleStartEdit = (wordText: string) => {
    setEditingWord(wordText);
    setEditValue(customMeanings[wordText] || '');
  };

  const handleSaveMeaning = (wordText: string) => {
    if (editValue.trim()) {
      setCustomMeanings(prev => ({ ...prev, [wordText]: editValue.trim() }));
    }
    setEditingWord(null);
    setEditValue('');
  };

  const isUnknownWord = (w: AnalyzedWord) =>
    w.meaning === '词典未收录' || w.partOfSpeech === '未知' || w.partOfSpeech === '未知+助词';

  return (
    <>
      {/* Input area */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3 card-sticker corner-decoration">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) handleAnalyze();
            }}
            onFocus={() => setShowKeyboard(true)}
            placeholder="粘贴整段韩语对话或句子...&#10;例如: 안녕하세요, 저는 학생입니다&#10;例如: 한국어를 공부하고 있어요&#10;Ctrl+Enter 分析"
            rows={4}
            className="flex-1 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] text-sm resize-none focus:outline-none focus:border-[var(--pink-primary)]/50 focus:ring-1 focus:ring-[var(--pink-primary)]/25"
          />
          <button
            type="button"
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`self-start px-3 py-3 rounded-xl transition-colors text-sm font-medium ${
              showKeyboard
                ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
                : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/20'
            }`}
            title="韩文键盘"
          >
            한
          </button>
        </div>
        <KoreanKeyboard
          value={input}
          onChange={setInput}
          visible={showKeyboard}
          onClose={() => setShowKeyboard(false)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            {input.length} 字 · 离线词典+语法库分析
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!input.trim() || analyzing}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl text-sm font-medium transition-colors"
          >
            {analyzing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}
            分析
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* 1. Overall Translation */}
          <div className="bg-[var(--bg-card)] border border-[var(--pink-primary)]/20 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <Languages size={15} className="text-[var(--pink-primary)]" />
              整句翻译
            </h3>
            <div className="flex items-start gap-3">
              <p className="text-lg text-[var(--text-primary)] flex-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                {result.original}
              </p>
              <button
                onClick={() => speak(result.original, 0.75)}
                className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                title="听整句发音"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <div className="mt-3 bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-4">
              <p className="text-base text-[var(--text-primary)] font-medium">
                {result.fullTranslation || '（无法生成翻译，请参考下方逐词拆解）'}
              </p>
            </div>
          </div>

          {/* 2. Word-by-word breakdown */}
          {result.words.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
                <Sparkles size={15} className="text-[var(--pink-primary)]" />
                逐词拆解 ({result.words.length} 个词)
              </h3>
              <div className="space-y-2">
                {result.words.map((w, i) => {
                  const isUnknown = isUnknownWord(w);
                  const isAdded = addedWords.has(w.text);
                  const customMeaning = customMeanings[w.text];
                  const isEditing = editingWord === w.text;

                  return (
                    <div
                      key={i}
                      className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 flex items-start gap-3 group"
                    >
                      <span className="text-xl shrink-0">{w.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-[var(--text-primary)] text-lg">
                            {w.text}
                          </span>
                          {w.pronunciation && (
                            <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded font-medium">
                              [{w.pronunciation}]
                            </span>
                          )}
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                            {w.partOfSpeech}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                          → {customMeaning || w.meaning}
                          {customMeaning && (
                            <span className="text-[13px] text-[var(--text-muted)] ml-1">(自定义)</span>
                          )}
                        </p>

                        {/* Inline edit form for unknown words */}
                        {isEditing && (
                          <div className="mt-2 flex gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="输入释义..."
                              className="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveMeaning(w.text);
                                if (e.key === 'Escape') setEditingWord(null);
                              }}
                            />
                            <button
                              onClick={() => handleSaveMeaning(w.text)}
                              className="px-3 py-1.5 bg-[var(--pink-primary)] text-white rounded-lg text-xs font-medium hover:bg-[var(--pink-primary)] transition-colors"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => setEditingWord(null)}
                              className="px-3 py-1.5 bg-[var(--bg-card-hover)] text-[var(--text-secondary)] rounded-lg text-xs hover:text-[var(--text-primary)] transition-colors"
                            >
                              取消
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => speak(w.text, 0.75)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                          title="听发音"
                        >
                          <Volume2 size={14} />
                        </button>
                        {/* Add to word bank */}
                        <button
                          onClick={() => handleAddToWordBank(w.text)}
                          disabled={isAdded}
                          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            isAdded
                              ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]'
                              : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--mint-soft)]'
                          }`}
                          title={isAdded ? '已加入单词库' : '加入单词库'}
                        >
                          {isAdded ? <Check size={14} /> : <Plus size={14} />}
                        </button>
                        {/* Add custom meaning for unknown words */}
                        {isUnknown && (
                          <button
                            onClick={() => handleStartEdit(w.text)}
                            className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                              customMeaning
                                ? 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
                                : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--purple-soft)]'
                            }`}
                            title={customMeaning ? '已添加释义' : '添加释义'}
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Particles explanation */}
          {result.particles.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
                <BookOpen size={15} className="text-[var(--purple-soft)]" />
                助词分析
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.particles.map((p, i) => (
                  <div
                    key={i}
                    className="bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3 max-w-full"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-[var(--purple-soft)] text-sm bg-[var(--purple-soft)]/10 px-2 py-0.5 rounded">
                        {p.text}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{p.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Grammar */}
          {result.grammar.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
                <Lightbulb size={15} className="text-[var(--purple-soft)]" />
                语法分析 ({result.grammar.length} 个语法点)
              </h3>
              <div className="space-y-3">
                {result.grammar.map((g, i) => (
                  <div
                    key={i}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">
                        {g.pattern}
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">{g.title}</span>
                      <span className={`text-[13px] px-1.5 py-0.5 rounded-full ${
                        g.level === 'beginner' ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' :
                        g.level === 'intermediate' ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' :
                        'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
                      }`}>
                        {g.level === 'beginner' ? '初级' : g.level === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{g.usage}</p>
                    <div className="bg-[var(--bg-input)] rounded-xl p-3">
                      <p className="text-xs text-[var(--text-muted)] mb-1">接续方式</p>
                      <p className="text-sm text-[var(--text-primary)]">{g.conjugation}</p>
                    </div>
                    <div className="bg-[var(--bg-input)] rounded-xl p-3">
                      <p className="text-xs text-[var(--text-muted)] mb-1">详细解释</p>
                      <p className="text-sm text-[var(--text-primary)]">{g.explanation}</p>
                    </div>
                    {g.examples.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-[var(--text-muted)]">例句</p>
                        {g.examples.map((ex, j) => (
                          <div key={j} className="bg-[var(--bg-input)] rounded-xl p-3 flex items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-[var(--text-primary)]">{ex.ko}</p>
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.zh}</p>
                            </div>
                            <button
                              onClick={() => speak(ex.ko, 0.75)}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link
                      href="/grammar"
                      className="inline-flex items-center gap-1 text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
                    >
                      查看完整语法库
                      <ExternalLink size={10} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.words.length === 0 && result.grammar.length === 0 && (
            <div className="text-center py-8">
              <Lightbulb size={32} className="text-[var(--text-placeholder)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">未能识别到词汇或语法</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">请尝试输入完整的韩语句子</p>
            </div>
          )}
        </div>
      )}

      {!result && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm text-[var(--text-secondary)]">输入韩语句子开始分析</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            支持识别词典词汇、助词语法和句型模式
          </p>
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {['안녕하세요', '한국어를 공부하고 있어요', '감사합니다'].map((example) => (
              <button
                key={example}
                onClick={() => { setInput(example); }}
                className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30 hover:text-[var(--pink-primary)] transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function HistoryTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loadedResult, setLoadedResult] = useState<AnalysisResult | null>(null);
  const [, setLoadedInput] = useState('');

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleClear = () => {
    setHistory([]);
    saveHistory([]);
    setLoadedResult(null);
    setLoadedInput('');
  };

  const handleLoadRecord = (entry: HistoryEntry) => {
    setLoadedResult(entry.result);
    setLoadedInput(entry.result.original);
    // Also save updated history (move to top)
    const updated = [entry, ...history.filter(h => h.id !== entry.id)];
    setHistory(updated);
    saveHistory(updated);
  };

  return (
    <div className="space-y-4">
      {history.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
          <p className="text-sm text-[var(--text-secondary)]">暂无分析记录</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">完成句子分析后，记录将显示在这里</p>
        </div>
      ) : (
        <>
          {/* Clear button */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">共 {history.length} 条记录（最多{MAX_HISTORY}条）</span>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-colors"
            >
              <Trash2 size={13} />
              清除历史
            </button>
          </div>

          {/* History list */}
          <div className="space-y-2">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleLoadRecord(entry)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-left hover:border-[var(--pink-primary)]/30 hover:bg-[var(--bg-card-hover)] transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                  <span className="text-[13px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    点击重新分析
                  </span>
                </div>
                <p className="text-sm text-[var(--text-primary)] font-medium truncate mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {entry.snippet}
                </p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} />
                    {entry.wordCount} 个词
                  </span>
                  <span className="flex items-center gap-1">
                    <Lightbulb size={11} />
                    {entry.grammarCount} 语法点
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Loaded result display */}
      {loadedResult && (
        <div className="border-t border-[var(--border-color)] pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--text-primary)]">已加载的分析结果</h3>
            <button
              onClick={() => { setLoadedResult(null); setLoadedInput(''); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              收起
            </button>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--pink-primary)]/20 rounded-2xl p-5">
            <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <Languages size={15} className="text-[var(--pink-primary)]" />
              整句翻译
            </h4>
            <div className="flex items-start gap-3">
              <p className="text-lg text-[var(--text-primary)] flex-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                {loadedResult.original}
              </p>
              <button
                onClick={() => speak(loadedResult.original, 0.75)}
                className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <div className="mt-3 bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-4">
              <p className="text-base text-[var(--text-primary)] font-medium">
                {loadedResult.fullTranslation || '（无法生成翻译）'}
              </p>
            </div>
          </div>

          {/* Words */}
          {loadedResult.words.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 mt-3">
              <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
                <Sparkles size={15} className="text-[var(--pink-primary)]" />
                逐词拆解 ({loadedResult.words.length} 个词)
              </h4>
              <div className="space-y-2">
                {loadedResult.words.map((w, i) => (
                  <div key={i} className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 flex items-start gap-3">
                    <span className="text-xl shrink-0">{w.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-[var(--text-primary)] text-lg">{w.text}</span>
                        {w.pronunciation && (
                          <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded font-medium">
                            [{w.pronunciation}]
                          </span>
                        )}
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                          {w.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">→ {w.meaning}</p>
                    </div>
                    <button
                      onClick={() => speak(w.text, 0.75)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
