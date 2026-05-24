'use client';

import { useState, useMemo } from 'react';
import { Search, X, Filter, Flame, Volume2 } from 'lucide-react';
import { idioms, slangs, loanwords, type Idiom, type Slang, type Loanword } from '@/data/expressions';

// ---- Config ----

type Tab = 'idioms' | 'slang' | 'loanword';

const tagConfig: Record<string, { label: string; color: string }> = {
  '身体': { label: '身体', color: 'bg-[var(--color-danger)]/12 text-[var(--color-danger)] border-[var(--color-danger)]/20' },
  '食物': { label: '食物', color: 'bg-[var(--peach-soft)]/12 text-[var(--peach-soft)] border-[var(--peach-soft)]/20' },
  '情感': { label: '情感', color: 'bg-[var(--pink-primary)]/12 text-[var(--pink-primary)] border-[var(--pink-primary)]/20' },
  '动作': { label: '动作', color: 'bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] border-[var(--mint-soft)]/20' },
  '生活': { label: '生活', color: 'bg-[var(--purple-soft)]/12 text-[var(--purple-soft)] border-[var(--purple-soft)]/20' },
  '性格': { label: '性格', color: 'bg-[var(--color-danger)]/12 text-[var(--color-danger)] border-[var(--color-danger)]/20' },
  '社交': { label: '社交', color: 'bg-[var(--peach-soft)]/12 text-[var(--peach-soft)] border-[var(--peach-soft)]/20' },
};

const idiomTags = ['食物', '身体', '情感', '动作', '生活', '性格', '社交'] as const;

const moodConfig: Record<string, { label: string; color: string }> = {
  '调侃': { label: '调侃', color: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)] border-[var(--peach-soft)]/25' },
  '感叹': { label: '感叹', color: 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)] border-[var(--purple-soft)]/25' },
  '撒娇': { label: '撒娇', color: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] border-[var(--pink-primary)]/25' },
  '惊讶': { label: '惊讶', color: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] border-[var(--color-danger)]/25' },
  '吐槽': { label: '吐槽', color: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] border-[var(--mint-soft)]/25' },
  '可爱': { label: '可爱', color: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] border-[var(--pink-primary)]/25' },
};

const moodLabels: string[] = ['调侃', '感叹', '撒娇', '惊讶', '吐槽', '可爱'];

const originConfig: Record<string, { label: string; emoji: string; color: string }> = {
  chinese:    { label: '中文', emoji: '🀄', color: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/20' },
  english:    { label: '英语', emoji: '🇬🇧', color: 'bg-[var(--blue-soft)]/15 text-[var(--blue-soft)] border-[var(--blue-soft)]/25' },
  japanese:   { label: '日语', emoji: '🇯🇵', color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border-[var(--pink-primary)]/20' },
  german:     { label: '德语', emoji: '🇩🇪', color: 'bg-[var(--bg-accent)]/15 text-[var(--text-secondary)] border-[var(--border-color)]' },
  french:     { label: '法语', emoji: '🇫🇷', color: 'bg-[var(--purple-soft)]/12 text-[var(--purple-soft)] border-[var(--purple-soft)]/20' },
  portuguese: { label: '葡萄牙语', emoji: '🇵🇹', color: 'bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] border-[var(--mint-soft)]/20' },
  spanish:    { label: '西班牙语', emoji: '🇪🇸', color: 'bg-[var(--peach-soft)]/12 text-[var(--peach-soft)] border-[var(--peach-soft)]/20' },
  russian:    { label: '俄语', emoji: '🇷🇺', color: 'bg-[var(--bg-accent)]/15 text-[var(--text-secondary)] border-[var(--border-color)]' },
  other:      { label: '其他', emoji: '🌍', color: 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)]' },
};

const originKeys: string[] = ['chinese', 'english', 'japanese', 'german', 'french', 'portuguese', 'spanish', 'russian', 'other'];

const categoryConfig: Record<string, { label: string; color: string }> = {
  '日常': { label: '日常', color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border-[var(--pink-primary)]/20' },
  '饮食': { label: '饮食', color: 'bg-[var(--peach-soft)]/12 text-[var(--peach-soft)] border-[var(--peach-soft)]/20' },
  '科技': { label: '科技', color: 'bg-[var(--blue-soft)]/15 text-[var(--blue-soft)] border-[var(--blue-soft)]/25' },
  '生活': { label: '生活', color: 'bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] border-[var(--mint-soft)]/20' },
  '娱乐': { label: '娱乐', color: 'bg-[var(--purple-soft)]/12 text-[var(--purple-soft)] border-[var(--purple-soft)]/20' },
  '交通': { label: '交通', color: 'bg-[var(--yellow-soft)]/20 text-[var(--text-secondary)] border-[var(--yellow-soft)]/30' },
  '场所': { label: '场所', color: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/20' },
  'SNS':  { label: 'SNS',  color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border-[var(--pink-primary)]/20' },
  '身体': { label: '身体', color: 'bg-[var(--peach-soft)]/12 text-[var(--peach-soft)] border-[var(--peach-soft)]/20' },
  '自然': { label: '自然', color: 'bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] border-[var(--mint-soft)]/20' },
  '抽象': { label: '抽象', color: 'bg-[var(--bg-accent)]/15 text-[var(--text-secondary)] border-[var(--border-color)]' },
  '社交': { label: '社交', color: 'bg-[var(--purple-soft)]/12 text-[var(--purple-soft)] border-[var(--purple-soft)]/20' },
  '美容': { label: '美容', color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border-[var(--pink-primary)]/20' },
  '学习': { label: '学习', color: 'bg-[var(--blue-soft)]/15 text-[var(--blue-soft)] border-[var(--blue-soft)]/25' },
  '工作': { label: '工作', color: 'bg-[var(--bg-accent)]/15 text-[var(--text-secondary)] border-[var(--border-color)]' },
};

// ---- Helpers ----

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.7;
  window.speechSynthesis.speak(utterance);
}

function hotStars(level: number) {
  return Array.from({ length: level }, (_, i) => (
    <Flame key={i} size={12} className="text-[var(--pink-primary)] fill-[var(--pink-primary)]" />
  ));
}

// ---- Component ----

export default function ExpressionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('idioms');
  const [searchQuery, setSearchQuery] = useState('');

  // Idiom filters
  const [activeIdiomTag, setActiveIdiomTag] = useState<string>('all');

  // Slang filters
  const [activeMood, setActiveMood] = useState<string>('all');
  const [activeHotLevel, setActiveHotLevel] = useState<number | 'all'>('all');

  // Loanword filters
  const [activeOrigin, setActiveOrigin] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // ---- Filtering ----

  const filteredIdioms = useMemo(() => {
    let result = idioms;

    if (activeIdiomTag !== 'all') {
      result = result.filter((i) => i.tags.includes(activeIdiomTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.expression.toLowerCase().includes(q) ||
          i.literalMeaning.toLowerCase().includes(q) ||
          i.actualMeaning.toLowerCase().includes(q) ||
          i.chineseEquivalent.toLowerCase().includes(q) ||
          i.example.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeIdiomTag, searchQuery]);

  const filteredSlangs = useMemo(() => {
    let result = slangs;

    if (activeMood !== 'all') {
      result = result.filter((s) => s.mood === moodConfig[activeMood]?.label);
    }

    if (activeHotLevel !== 'all') {
      result = result.filter((s) => s.hotLevel === activeHotLevel);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.expression.toLowerCase().includes(q) ||
          s.meaning.toLowerCase().includes(q) ||
          s.usage.toLowerCase().includes(q) ||
          s.mood.toLowerCase().includes(q) ||
          s.example.toLowerCase().includes(q),
      );
    }

    return result;
  }, [activeMood, activeHotLevel, searchQuery]);

  const filteredLoanwords = useMemo(() => {
    let result = loanwords;

    if (activeOrigin !== 'all') {
      result = result.filter((lw) => lw.origin === activeOrigin);
    }

    if (activeCategory !== 'all') {
      result = result.filter((lw) => lw.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (lw) =>
          lw.expression.toLowerCase().includes(q) ||
          lw.original.toLowerCase().includes(q) ||
          lw.meaning.toLowerCase().includes(q) ||
          lw.category.toLowerCase().includes(q) ||
          lw.example.toLowerCase().includes(q),
      );
    }

    return result;
  }, [activeOrigin, activeCategory, searchQuery]);

  const clearSearch = () => setSearchQuery('');

  // ---- Render ----

  return (
    <div className="min-h-screen py-4 space-y-3">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
          活用表达库
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          掌握惯用语、网络流行语和外来词，让你的韩语更地道、更鲜活
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeTab === 'idioms' ? '搜索惯用语、字面含义、实际意义……' : '搜索网络用语、含义、例句……'}
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]/50 focus:ring-1 focus:ring-[var(--pink-primary)]/25 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="清除搜索"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tab switcher */}
      <div className="flex bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1 gap-1">
        <button
          onClick={() => setActiveTab('idioms')}
          className={`flex-1 text-sm py-2 rounded-lg transition-colors ${
            activeTab === 'idioms'
              ? 'bg-[var(--pink-primary)] text-white font-medium'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          惯用语 (관용어)
        </button>
        <button
          onClick={() => setActiveTab('slang')}
          className={`flex-1 text-sm py-2 rounded-lg transition-colors ${
            activeTab === 'slang'
              ? 'bg-[var(--pink-primary)] text-white font-medium'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          网络用语 (인터넷 용어)
        </button>
        <button
          onClick={() => setActiveTab('loanword')}
          className={`flex-1 text-sm py-2 rounded-lg transition-colors ${
            activeTab === 'loanword'
              ? 'bg-[var(--pink-primary)] text-white font-medium'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          外来词 (외래어)
        </button>
      </div>

      {/* ---- IDIOMS TAB ---- */}
      {activeTab === 'idioms' && (
        <>
          {/* Tag filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveIdiomTag('all')}
              className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                activeIdiomTag === 'all'
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Filter size={14} />
              全部
            </button>
            {idiomTags.map((tag) => {
              const isActive = activeIdiomTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveIdiomTag(tag)}
                  className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
                  }`}
                >
                  {tagConfig[tag]?.label ?? tag}
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="text-xs text-[var(--text-muted)]">
            共 {filteredIdioms.length} 条惯用语
            {activeIdiomTag !== 'all' && ` / 分类: ${tagConfig[activeIdiomTag]?.label}`}
            {searchQuery && ` / 搜索: "${searchQuery}"`}
          </p>

          {/* Idiom cards grid */}
          {filteredIdioms.length === 0 ? (
            <div className="text-center py-16">
              <Filter size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm">没有找到匹配的惯用语</p>
              <p className="text-[var(--text-placeholder)] text-xs mt-1">尝试调整搜索条件或筛选器</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIdioms.map((idiom) => (
                <IdiomCard key={idiom.id} idiom={idiom} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ---- SLANG TAB ---- */}
      {activeTab === 'slang' && (
        <>
          {/* Mood filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveMood('all')}
              className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                activeMood === 'all'
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Filter size={14} />
              全部语气
            </button>
            {moodLabels.map((mood) => {
              const isActive = activeMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => setActiveMood(mood)}
                  className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
                  }`}
                >
                  {moodConfig[mood]?.label ?? mood}
                </button>
              );
            })}
          </div>

          {/* Hot level filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveHotLevel('all')}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                activeHotLevel === 'all'
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              全部热度
            </button>
            <button
              onClick={() => setActiveHotLevel(activeHotLevel === 3 ? 'all' : 3)}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 ${
                activeHotLevel === 3
                  ? 'bg-[var(--pink-primary)] text-white font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Flame size={14} className={activeHotLevel === 3 ? 'fill-white' : 'fill-[var(--pink-primary)] text-[var(--pink-primary)]'} />
              <Flame size={14} className={activeHotLevel === 3 ? 'fill-white' : 'fill-[var(--pink-primary)] text-[var(--pink-primary)]'} />
              <Flame size={14} className={activeHotLevel === 3 ? 'fill-white' : 'fill-[var(--pink-primary)] text-[var(--pink-primary)]'} />
              大火
            </button>
            <button
              onClick={() => setActiveHotLevel(activeHotLevel === 2 ? 'all' : 2)}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 ${
                activeHotLevel === 2
                  ? 'bg-[var(--peach-soft)] text-white font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Flame size={14} className={activeHotLevel === 2 ? 'fill-white' : 'fill-[var(--peach-soft)] text-[var(--peach-soft)]'} />
              <Flame size={14} className={activeHotLevel === 2 ? 'fill-white' : 'fill-[var(--peach-soft)] text-[var(--peach-soft)]'} />
              流行
            </button>
            <button
              onClick={() => setActiveHotLevel(activeHotLevel === 1 ? 'all' : 1)}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 ${
                activeHotLevel === 1
                  ? 'bg-[var(--mint-soft)] text-white font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Flame size={14} className={activeHotLevel === 1 ? 'fill-white' : 'fill-[var(--mint-soft)] text-[var(--mint-soft)]'} />
              一般
            </button>
          </div>

          {/* Result count */}
          <p className="text-xs text-[var(--text-muted)]">
            共 {filteredSlangs.length} 条网络用语
            {activeMood !== 'all' && ` / 语气: ${moodConfig[activeMood]?.label}`}
            {activeHotLevel !== 'all' && ` / ${activeHotLevel}级热度`}
            {searchQuery && ` / 搜索: "${searchQuery}"`}
          </p>

          {/* Slang cards grid */}
          {filteredSlangs.length === 0 ? (
            <div className="text-center py-16">
              <Filter size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm">没有找到匹配的网络用语</p>
              <p className="text-[var(--text-placeholder)] text-xs mt-1">尝试调整搜索条件或筛选器</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSlangs.map((slang) => (
                <SlangCard key={slang.id} slang={slang} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ---- LOANWORD TAB ---- */}
      {activeTab === 'loanword' && (
        <>
          {/* Origin filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveOrigin('all')}
              className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                activeOrigin === 'all'
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Filter size={14} />
              全部来源
            </button>
            {originKeys.map((origin) => {
              const cfg = originConfig[origin];
              const isActive = activeOrigin === origin;
              return (
                <button
                  key={origin}
                  onClick={() => setActiveOrigin(isActive ? 'all' : origin)}
                  className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? `${cfg.color} font-medium ring-1 ring-[var(--pink-pale)]`
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
                  }`}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Category filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              全部分类
            </button>
            {Object.entries(categoryConfig).map(([key, cfg]) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(isActive ? 'all' : key)}
                  className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? `${cfg.color} font-medium`
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="text-xs text-[var(--text-muted)]">
            共 {filteredLoanwords.length} 个外来词
            {activeOrigin !== 'all' && ` / 来源: ${originConfig[activeOrigin]?.label}`}
            {activeCategory !== 'all' && ` / 分类: ${categoryConfig[activeCategory]?.label}`}
            {searchQuery && ` / 搜索: "${searchQuery}"`}
          </p>

          {/* Loanword cards grid */}
          {filteredLoanwords.length === 0 ? (
            <div className="text-center py-16">
              <Filter size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm">没有找到匹配的外来词</p>
              <p className="text-[var(--text-placeholder)] text-xs mt-1">尝试调整搜索条件或筛选器</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLoanwords.map((loanword) => (
                <LoanwordCard key={loanword.id} loanword={loanword} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---- Idiom Card ----

function IdiomCard({ idiom }: { idiom: Idiom }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col gap-3 hover:border-[var(--pink-pale)] transition-colors">
      {/* Expression */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{idiom.expression}</h3>
        <button
          onClick={() => speakKorean(idiom.expression)}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          title="听发音"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Literal -> Actual */}
      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] shrink-0">字面</span>
          <span className="text-sm text-[var(--text-secondary)]">{idiom.literalMeaning}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-[var(--pink-primary)] text-lg leading-none">&darr;</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] shrink-0">实际</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{idiom.actualMeaning}</span>
        </div>
      </div>

      {/* Chinese equivalent */}
      {idiom.chineseEquivalent && (
        <div className="flex items-start gap-2">
          <span className="text-xs text-[var(--purple-soft)] bg-[var(--purple-soft)]/10 px-2 py-0.5 rounded-md font-medium shrink-0">
            对应中文
          </span>
          <span className="text-sm text-[var(--text-primary)]">{idiom.chineseEquivalent}</span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {idiom.tags.map((tag) => {
          const cfg = tagConfig[tag];
          return (
            <span
              key={tag}
              className={`text-[14px] px-2 py-0.5 rounded-full border font-medium ${cfg?.color ?? 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)]'}`}
            >
              {cfg?.label ?? tag}
            </span>
          );
        })}
      </div>

      {/* Example */}
      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2">
        <div className="flex items-start gap-2">
          <p className="text-sm text-[var(--text-primary)] flex-1 leading-relaxed">{idiom.example}</p>
          <button
            onClick={() => speakKorean(idiom.example)}
            className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="听例句发音"
          >
            <Volume2 size={14} />
          </button>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">{idiom.exampleZh}</p>
      </div>
    </div>
  );
}

// ---- Slang Card ----

function SlangCard({ slang }: { slang: Slang }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col gap-3 hover:border-[var(--purple-soft)] transition-colors">
      {/* Header: expression + TTS + hot level */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{slang.expression}</h3>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5">{hotStars(slang.hotLevel)}</span>
          <button
            onClick={() => speakKorean(slang.expression)}
            className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="听发音"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      {/* Meaning + Usage */}
      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2">
        <p className="text-sm text-[var(--text-primary)]">{slang.meaning}</p>
        <p className="text-xs text-[var(--text-secondary)]">{slang.usage}</p>
      </div>

      {/* Mood + Formal warning badges */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Mood badge */}
        <span
          className={`text-[14px] px-2.5 py-1 rounded-full border font-medium ${
            moodConfig[slang.mood]?.color ?? 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)]'
          }`}
        >
          {slang.mood}
        </span>

        {/* Formal warning */}
        {slang.formalWarning && (
          <span className="text-[14px] px-2.5 py-1 rounded-full border font-medium bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/20 flex items-center gap-1">
            <span>&#9888;</span> 正式场合禁用
          </span>
        )}

        {/* Formal alternative */}
        {slang.formalWarning && slang.formalAlternative && (
          <span className="text-[14px] px-2.5 py-1 rounded-full border bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] border-[var(--mint-soft)]/20">
            {slang.formalAlternative}
          </span>
        )}
      </div>

      {/* Example */}
      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2">
        <div className="flex items-start gap-2">
          <p className="text-sm text-[var(--text-primary)] flex-1 leading-relaxed">{slang.example}</p>
          <button
            onClick={() => speakKorean(slang.example)}
            className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="听例句发音"
          >
            <Volume2 size={14} />
          </button>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">{slang.exampleZh}</p>
      </div>
    </div>
  );
}

// ---- Loanword Card ----

function LoanwordCard({ loanword }: { loanword: Loanword }) {
  const originCfg = originConfig[loanword.origin];
  const catCfg = categoryConfig[loanword.category];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col gap-3 hover:border-[var(--blue-soft)] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{loanword.expression}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[13px] px-2 py-0.5 rounded-full border font-medium ${originCfg?.color ?? 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)]'}`}>
              {originCfg?.emoji} {originCfg?.label}
            </span>
            <span className={`text-[13px] px-2 py-0.5 rounded-full border font-medium ${catCfg?.color ?? 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)]'}`}>
              {catCfg?.label ?? loanword.category}
            </span>
          </div>
        </div>
        <button
          onClick={() => speakKorean(loanword.expression)}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          title="听发音"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] shrink-0">原词</span>
          <span className="text-sm text-[var(--text-secondary)]">{loanword.original}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] shrink-0">含义</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{loanword.meaning}</span>
        </div>
      </div>

      <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2">
        <div className="flex items-start gap-2">
          <p className="text-sm text-[var(--text-primary)] flex-1 leading-relaxed">{loanword.example}</p>
          <button
            onClick={() => speakKorean(loanword.example)}
            className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="听例句发音"
          >
            <Volume2 size={14} />
          </button>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">{loanword.exampleZh}</p>
      </div>
    </div>
  );
}
