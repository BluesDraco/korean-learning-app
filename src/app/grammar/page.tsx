'use client';

import { useState, useMemo } from 'react';
import { Search, X, FileText, ChevronDown, ChevronUp, AlertCircle, Volume2, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { grammarPoints, type GrammarPoint } from '@/data/grammar';
import { beginnerGrammar, type GrammarEntry } from '@/data/grammar-beginner';

const levelConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: '初级', color: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' },
  intermediate: { label: '中级', color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' },
  advanced: { label: '高级', color: 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]' },
};

const categoryLabels: Record<string, string> = {
  '조사': '조사 (助词)',
  '어미': '어미 (语尾)',
  '연결': '연결 (连接)',
  '시제': '시제 (时制)',
  '존대': '존대 (敬语)',
  '문형': '문형 (句型)',
  '인용': '인용 (引用)',
  '사동/피동': '사동/피동',
};

const categories = ['조사', '어미', '연결', '시제', '존대', '문형', '인용', '사동/피동'] as const;

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

const levels: Array<{ value: GrammarPoint['level'] | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

export default function GrammarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<GrammarPoint['level'] | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [beginnerExpandedId, setBeginnerExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'beginner' | 'all'>('beginner');

  const filtered = useMemo(() => {
    let result = grammarPoints;

    // Filter by level
    if (activeLevel !== 'all') {
      result = result.filter((g) => g.level === activeLevel);
    }

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((g) => g.category === activeCategory);
    }

    // Filter by search query (case-insensitive across title, pattern, usage, explanation)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.pattern.toLowerCase().includes(q) ||
          g.usage.toLowerCase().includes(q) ||
          g.explanation.toLowerCase().includes(q),
      );
    }

    return result;
  }, [activeLevel, activeCategory, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-4 space-y-3">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">语法库</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          按 TOPIK 等级和分类学习韩语语法，理解用法和对比
        </p>
      </div>

      {/* View mode toggle */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5">
        <button
          onClick={() => setViewMode('beginner')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            viewMode === 'beginner'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <Sparkles size={14} />
          初级必备30条
        </button>
        <button
          onClick={() => setViewMode('all')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            viewMode === 'all'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <FileText size={14} />
          全部语法库
        </button>
      </div>

      {/* ── Beginner Grammar 30 ── */}
      {viewMode === 'beginner' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {['助词', '终结', '时态', '连接', '否定', '意愿', '能力', '命令', '建议', '名词化', '修饰', '比较', '引用', '义务', '进行', '经验', '尝试', '原因', '计划'].map((cat) => {
              const count = beginnerGrammar.filter((g) => g.category === cat).length;
              return (
                <span key={cat} className="text-xs bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-1 rounded-full">
                  {cat} ({count})
                </span>
              );
            })}
          </div>
          {beginnerGrammar.map((entry) => (
            <div key={entry.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
              <button
                onClick={() => setBeginnerExpandedId(beginnerExpandedId === entry.id ? null : entry.id)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--pink-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[var(--pink-primary)]" style={{ fontFamily: "'Nanum Gothic', sans-serif" }}>
                    {entry.title[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[var(--text-primary)]">{entry.title}</span>
                    <span className="text-xs text-[var(--text-muted)]">{entry.titleKo}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]">{entry.category}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{entry.meaning}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-[var(--text-muted)] shrink-0 transition-transform ${beginnerExpandedId === entry.id ? 'rotate-180' : ''}`}
                />
              </button>
              {beginnerExpandedId === entry.id && (
                <div className="border-t border-[var(--border-color)] px-4 py-4 space-y-4 animate-fade-in">
                  {/* Conjugation */}
                  <div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">接续法</span>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 bg-[var(--bg-input)] rounded-xl px-3 py-2">{entry.conjugation}</p>
                  </div>
                  {/* Description */}
                  <div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">详解</span>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{entry.description}</p>
                  </div>
                  {/* Examples */}
                  <div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">例句</span>
                    <div className="mt-1 space-y-2">
                      {entry.examples.map((ex, i) => (
                        <div key={i} className="bg-[var(--bg-input)] rounded-xl px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--text-primary)] font-medium">{ex.korean}</span>
                            <button onClick={() => speakKorean(ex.korean)} className="text-[var(--pink-primary)] hover:text-[var(--pink-primary)]">
                              <Volume2 size={13} />
                            </button>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.romanization}</p>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Confused with */}
                  {entry.confusedWith && (
                    <div className="flex items-start gap-2 bg-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-3">
                      <AlertCircle size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-medium text-[var(--peach-soft)]">易混淆：{entry.confusedWith.grammar}</span>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{entry.confusedWith.difference}</p>
                      </div>
                    </div>
                  )}
                  {/* Tip */}
                  {entry.tips && (
                    <div className="flex items-start gap-2 bg-[var(--purple-soft)]/10 border border-[var(--purple-soft)]/20 rounded-xl p-3">
                      <Lightbulb size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
                      <p className="text-xs text-[var(--text-secondary)]">{entry.tips}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── All Grammar (existing) ── */}
      {viewMode === 'all' && (
        <>

      {/* Honorifics Comparison Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <button
          onClick={() => {
            const el = document.getElementById('honorifics-table');
            if (el) el.classList.toggle('hidden');
          }}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">👑</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">敬语完整对照表</span>
            <span className="text-[13px] px-1.5 py-0.5 rounded bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]">존댓말</span>
          </div>
          <ChevronDown size={16} className="text-[var(--text-muted)]" />
        </button>
        <div id="honorifics-table" className="hidden border-t border-[var(--border-color)]">
          <div className="p-4 space-y-4">
            {/* Honorific Nouns */}
            <div>
              <h3 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">敬语名词</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[13px] text-[var(--text-muted)] uppercase">
                      <th className="text-left py-2 pr-3">分类</th>
                      <th className="text-left py-2 px-3">普通用语</th>
                      <th className="text-left py-2 px-3">敬语</th>
                      <th className="text-left py-2 pl-3">说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {[
                      ['人/位', '사람', '분', '尊称他人'],
                      ['家', '집', '댁', '尊称对方家'],
                      ['年龄', '나이', '연세', '问长辈年龄'],
                      ['名字', '이름', '성함', '尊称对方姓名'],
                      ['话', '말', '말씀', '尊称对方言语'],
                      ['饭', '밥', '진지', '请长辈吃饭'],
                    ].map(([cat, normal, honorific, note]) => (
                      <tr key={cat} className="text-xs">
                        <td className="py-2.5 pr-3 text-[var(--text-muted)]">{cat}</td>
                        <td className="py-2.5 px-3 text-[var(--text-secondary)]">{normal}</td>
                        <td className="py-2.5 px-3 text-[var(--purple-soft)] font-medium">{honorific}</td>
                        <td className="py-2.5 pl-3 text-[var(--text-muted)]">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Honorific Verbs */}
            <div>
              <h3 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">敬语动词</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[13px] text-[var(--text-muted)] uppercase">
                      <th className="text-left py-2 pr-3">动作</th>
                      <th className="text-left py-2 px-3">普通用语</th>
                      <th className="text-left py-2 px-3">敬语</th>
                      <th className="text-left py-2 pl-3">例句</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {[
                      ['吃/喝', '먹다/마시다', '드시다', '진지 드세요 (请用餐)'],
                      ['睡觉', '자다', '주무시다', '안녕히 주무세요 (晚安)'],
                      ['在', '있다', '계시다', '아버지께서 계세요 (父亲在)'],
                      ['说', '말하다', '말씀하시다', '말씀하세요 (请说)'],
                      ['给', '주다', '드리다', '선물을 드려요 (送礼物)'],
                      ['问', '묻다', '여쭤보다', '여쭤봐도 돼요? (可以问吗)'],
                      ['见', '보다', '뵙다', '처음 뵙겠습니다 (初次见面)'],
                    ].map(([action, normal, honorific, example]) => (
                      <tr key={action} className="text-xs">
                        <td className="py-2.5 pr-3 text-[var(--text-muted)]">{action}</td>
                        <td className="py-2.5 px-3 text-[var(--text-secondary)]">{normal}</td>
                        <td className="py-2.5 px-3 text-[var(--mint-soft)] font-medium">{honorific}</td>
                        <td className="py-2.5 pl-3 text-[var(--text-secondary)]">{example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Honorific Particles */}
            <div>
              <h3 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">敬语助词</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[13px] text-[var(--text-muted)] uppercase">
                      <th className="text-left py-2 pr-3">助词类型</th>
                      <th className="text-left py-2 px-3">普通形式</th>
                      <th className="text-left py-2 px-3">敬语形式</th>
                      <th className="text-left py-2 pl-3">例句</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {[
                      ['主格', '이/가', '께서', '선생님께서 오셨어요'],
                      ['主题', '은/는', '께서는', '사장님께서는 회의 중이세요'],
                      ['与格', '에게/한테', '께', '할머니께 전화 드렸어요'],
                    ].map(([type, normal, honorific, example]) => (
                      <tr key={type} className="text-xs">
                        <td className="py-2.5 pr-3 text-[var(--text-muted)]">{type}</td>
                        <td className="py-2.5 px-3 text-[var(--text-secondary)]">{normal}</td>
                        <td className="py-2.5 px-3 text-[var(--peach-soft)] font-medium">{honorific}</td>
                        <td className="py-2.5 pl-3 text-[var(--text-secondary)]">{example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Honorific Suffix */}
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">敬语后缀</h3>
              <p className="text-sm text-[var(--text-primary)]">
                <span className="text-[var(--pink-primary)] font-mono font-medium">-(으)시</span>
                <span className="text-[var(--text-secondary)]"> — 韩语最基础的敬语后缀。当主语是需要尊敬的人时，在动词/形容词词干后添加。</span>
              </p>
              <div className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
                <p>• 가다 → 가<span className="text-[var(--pink-primary)]">시</span>다 → 가세요</p>
                <p>• 읽다 → 읽<span className="text-[var(--pink-primary)]">으시</span>다 → 읽으세요</p>
                <p>• 하다 → 하<span className="text-[var(--pink-primary)]">시</span>다 → 하세요</p>
              </div>
            </div>
          </div>
        </div>
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
          placeholder="搜索语法点、句型、用法……"
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

      {/* Category filter tabs - horizontally scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setActiveCategory('all');
            setExpandedId(null);
          }}
          className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
            activeCategory === 'all'
              ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
              : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
          }`}
        >
          <FileText size={14} />
          全部
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          );
        })}
      </div>

      {/* Level filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {levels.map((lv) => (
          <button
            key={lv.value}
            onClick={() => {
              setActiveLevel(lv.value);
              setExpandedId(null);
            }}
            className={`text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeLevel === lv.value
                ? 'bg-[var(--pink-primary)] text-[var(--text-primary)] font-medium'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {lv.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-xs text-[var(--text-muted)]">
        共 {filtered.length} 个语法点
        {activeCategory !== 'all' && ` / 分类: ${categoryLabels[activeCategory]}`}
        {activeLevel !== 'all' && ` / ${levelConfig[activeLevel].label}`}
        {searchQuery && ` / 搜索: "${searchQuery}"`}
      </p>

      {/* Grammar list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
          <p className="text-[var(--text-secondary)] text-sm">没有找到匹配的语法点</p>
          <p className="text-[var(--text-placeholder)] text-xs mt-1">尝试调整搜索条件或筛选器</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((grammar) => {
            const isExpanded = expandedId === grammar.id;
            const lv = levelConfig[grammar.level];

            return (
              <div
                key={grammar.id}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--pink-pale)]"
              >
                {/* Card header - clickable */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : grammar.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Pattern badge */}
                  <div className="bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border border-[var(--pink-primary)]/20 rounded-lg px-3 py-2 font-mono text-sm font-semibold whitespace-nowrap shrink-0">
                    {grammar.pattern}
                  </div>

                  {/* Title & brief */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[var(--text-primary)] font-medium text-sm">{grammar.title}</span>
                      <span
                        className={`text-[14px] px-1.5 py-0.5 rounded font-medium ${
                          grammar.level === 'beginner'
                            ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]'
                            : grammar.level === 'intermediate'
                              ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                              : 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]'
                        }`}
                      >
                        {grammar.topik}
                      </span>
                      <span className="text-[14px] px-1.5 py-0.5 rounded font-medium bg-[var(--bg-input)] text-[var(--text-secondary)]">
                        {grammar.category}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5 line-clamp-1">{grammar.usage}</p>
                  </div>

                  {/* Expand/collapse icon */}
                  <span className="text-[var(--text-placeholder)] shrink-0">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3">
                    {/* Explanation */}
                    <div className="bg-[var(--bg-input)] rounded-lg p-3">
                      <p className="text-[14px] text-[var(--text-muted)] uppercase tracking-wide mb-1.5 font-medium">
                        详细解释
                      </p>
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">{grammar.explanation}</p>
                    </div>

                    {/* Conjugation */}
                    <div className="bg-[var(--bg-input)] rounded-lg p-3">
                      <p className="text-[14px] text-[var(--text-muted)] uppercase tracking-wide mb-1.5 font-medium">
                        接续方式
                      </p>
                      <p className="text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
                        {grammar.conjugation}
                      </p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-2">
                      <p className="text-[14px] text-[var(--text-muted)] uppercase tracking-wide font-medium">
                        例句
                      </p>
                      {grammar.examples.map((ex, i) => (
                        <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <p className="text-sm text-[var(--text-primary)]">{ex.ko}</p>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakKorean(ex.ko); }}
                              className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                              title="听例句发音"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-1">{ex.zh}</p>
                        </div>
                      ))}
                    </div>

                    {/* Similar patterns */}
                    {grammar.similarPatterns && grammar.similarPatterns.length > 0 && (
                      <div className="flex items-start gap-2 bg-[var(--color-highlight)]/10 border border-[var(--color-highlight)]/15 rounded-lg p-3">
                        <AlertCircle size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--peach-soft)] font-medium mb-1">
                            易混淆：{grammar.similarPatterns.join(' / ')}
                          </p>
                          {grammar.difference && (
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {grammar.difference}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
        </>
      )}
    </div>
  );
}
