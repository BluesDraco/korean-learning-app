'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FileText, BookOpen, TrendingUp, Target, ChevronRight, Sparkles,
  ArrowRight, GitCompare, Lightbulb, Search, X, AlertCircle,
} from 'lucide-react';
import { sentencePatterns, getTodayPattern, getRecommendedPatterns } from '@/data/grammar-new';
import { grammarPoints, type GrammarPoint as LegacyPoint } from '@/data/grammar';
import { GrammarSession } from '@/components/grammar/GrammarSession';
import { db } from '@/lib/db';
import { speak } from '@/lib/tts';
import type { GrammarPoint } from '@/types';

const levelConfig: Record<string, string> = {
  absolute_beginner: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  beginner: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  elementary: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  intermediate: 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]',
};

// Comparison pairs for 易混语法对比
interface ComparePair {
  id: string;
  title: string;
  a: GrammarPoint;
  b: GrammarPoint;
  difference: string;
  questions: { prompt: string; options: string[]; answer: string; explanation: string }[];
}

function buildComparePairs(): ComparePair[] {
  const find = (id: string) => sentencePatterns.find((g) => g.id === id);
  const makePair = (id: string, title: string, aid: string, bid: string, difference: string, questions: ComparePair['questions']): ComparePair | null => {
    const a = find(aid);
    const b = find(bid);
    if (!a || !b) return null;
    return { id, title, a, b, difference, questions };
  };
  const pairs = [
    makePair('compare-eun-ga', '은/는 vs 이/가', 'gp-19', 'gp-20',
      '은/는 = 主题（"至于…的话"），이/가 = 主语（"谁/什么"）。问 누가/뭐가 → 答 이/가；展开新话题/对比 → 用 은/는。',
      [
        { prompt: '"누가 왔어요?"（谁来了？）— 回答应该用哪个？', options: ['친구는 왔어요.', '친구가 왔어요.'], answer: '친구가 왔어요.', explanation: '回答"谁"的问题用 이/가，因为聚焦在"谁"上。' },
        { prompt: '自我介绍时说"我是学生"，用哪个？', options: ['저는 학생이에요.', '제가 학생이에요.'], answer: '저는 학생이에요.', explanation: '自我介绍是引出话题，用 은/는。저는 = "（至于）我嘛…"。' },
        { prompt: '"오늘___ 날씨가 좋아요"（强调"今天"）', options: ['오늘은', '오늘이'], answer: '오늘은', explanation: '对比/强调"今天"（跟其他日子对比），用 은/는。' },
      ]),
    makePair('compare-e-eseo', '에 vs 에서', 'gp-08', 'gp-09',
      '에 = 位置/方向（있다/가다 用 에），에서 = 动作发生地（动作动词用 에서）。记住：에 있어요（在那里），에서 해요（在那里做）。',
      [
        { prompt: '"在咖啡厅喝咖啡"', options: ['카페에 커피 마셔요.', '카페에서 커피 마셔요.'], answer: '카페에서 커피 마셔요.', explanation: '마시다 是动作动词，动作发生地用 에서。' },
        { prompt: '"在家"（说位置）', options: ['집에 있어요.', '집에서 있어요.'], answer: '집에 있어요.', explanation: '있다 表示存在，永远用 에。' },
        { prompt: '"在学校学习"', options: ['학교에 공부해요.', '학교에서 공부해요.'], answer: '학교에서 공부해요.', explanation: '공부하다 是动作，用 에서。' },
      ]),
    makePair('compare-ieyo-imnida', '이에요/예요 vs 입니다', 'gp-01', 'gp-02',
      '이에요/예요 = 礼貌体（日常用），입니다 = 正式体（面试/演讲/对长辈）。日常对话用 이에요/예요 就够了。',
      [
        { prompt: '面试时自我介绍，用哪个？', options: ['저는 김민수입니다.', '저는 김민수예요.'], answer: '저는 김민수입니다.', explanation: '正式场合用 입니다。' },
        { prompt: '跟朋友说"我是学生"，用哪个？', options: ['저는 학생이에요.', '저는 학생입니다.'], answer: '저는 학생이에요.', explanation: '朋友之间用 이에요/예요 更自然。' },
      ]),
    makePair('compare-an-anieyo', '안 vs 아니에요', 'gp-15', 'gp-16',
      '안 = 否定动作（"不做"），아니에요 = 否定身份（"不是"）。안 가요（不去），학생이 아니에요（不是学生）。',
      [
        { prompt: '"不去学校"', options: ['학교에 안 가요.', '학교가 아니에요.'], answer: '학교에 안 가요.', explanation: '否定动作"去"用 안。' },
        { prompt: '"我不是学生"', options: ['저는 학생 안 해요.', '저는 학생이 아니에요.'], answer: '저는 학생이 아니에요.', explanation: '否定身份用 아니에요。' },
      ]),
    makePair('compare-isseoyo-eopseoyo', '있어요 vs 없어요', 'gp-05', 'gp-18',
      '있어요 = 有/在，없어요 = 没有/不在。一对反义词，口语最高频。',
      [
        { prompt: '"有时间"', options: ['시간 있어요.', '시간 없어요.'], answer: '시간 있어요.', explanation: '있어요 = 有。' },
        { prompt: '"没有钱"', options: ['돈 있어요.', '돈 없어요.'], answer: '돈 없어요.', explanation: '없어요 = 没有。' },
      ]),
  ];
  return pairs.filter((p): p is ComparePair => p !== null);
}

const comparePairsData = buildComparePairs();

function GrammarContent() {
  const [sessionGrammar, setSessionGrammar] = useState<GrammarPoint | null>(null);
  const [reviewQueue, setReviewQueue] = useState<GrammarPoint[]>([]);
  const [viewMode, setViewMode] = useState<'home' | 'library' | 'comparison'>('home');
  const [grammarStates, setGrammarStates] = useState<Record<string, import('@/types').UserGrammarState>>({});
  const [comparePair, setComparePair] = useState<ComparePair | null>(null);
  const [compareQIdx, setCompareQIdx] = useState(0);
  const [compareResult, setCompareResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedCompareOption, setSelectedCompareOption] = useState<string | null>(null);

  // Legacy library state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const patternParam = searchParams.get('pattern');

  // Load user grammar states
  useEffect(() => {
    (async () => {
      try {
        const states = await db.userGrammarStates.toArray();
        const map: Record<string, import('@/types').UserGrammarState> = {};
        for (const s of states) map[s.id] = s;
        setGrammarStates(map);
      } catch (_e) {}
    })();
  }, []);

  // Auto-open grammar session from ?pattern= query param
  useEffect(() => {
    if (patternParam) {
      const pattern = sentencePatterns.find((g) => g.id === patternParam);
      if (pattern) {
        setSessionGrammar(pattern);
      }
    }
  }, [patternParam]);

  const startReview = (patterns: GrammarPoint[]) => {
    if (patterns.length === 0) return;
    setSessionGrammar(patterns[0]);
    setReviewQueue(patterns.slice(1));
  };

  const handleNextReview = (next: GrammarPoint) => {
    setSessionGrammar(next);
    setReviewQueue((q) => q.slice(1));
  };

  const handleCloseSession = () => {
    setSessionGrammar(null);
    setReviewQueue([]);
  };

  if (sessionGrammar) {
    return (
      <GrammarSession
        key={sessionGrammar.id}
        grammar={sessionGrammar}
        onClose={handleCloseSession}
        reviewQueue={reviewQueue}
        onNextReview={reviewQueue.length > 0 ? handleNextReview : undefined}
      />
    );
  }

  const learnedCount = Object.values(grammarStates).filter((s) => s.status === 'mastered' || s.status === 'familiar').length;
  const learningCount = Object.values(grammarStates).filter((s) => s.status === 'learning').length;
  const difficultCount = Object.values(grammarStates).filter((s) => s.status === 'difficult').length;
  const studiedIds = Object.keys(grammarStates);

  const todayPattern = getTodayPattern(studiedIds);
  const now = Date.now();

  // Grammars due for review
  const reviewDue = Object.values(grammarStates).filter((s) =>
    s.status === 'difficult' || (s.nextReviewAt && s.nextReviewAt <= now),
  );
  const reviewPatterns = reviewDue
    .map((s) => sentencePatterns.find((g) => g.id === s.id))
    .filter(Boolean) as GrammarPoint[];

  const recommended = getRecommendedPatterns(studiedIds, 4);

  // Legacy search/filter
  const filtered = (() => {
    let result = grammarPoints;
    if (activeLevel !== 'all') {
      result = result.filter((g) => g.level === activeLevel);
    }
    if (activeCategory !== 'all') {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.pattern.toLowerCase().includes(q) ||
        g.usage.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q),
      );
    }
    return result;
  })();

  const legacyCategories = ['조사', '어미', '연결', '시제', '존대', '문형', '인용', '사동/피동'];

  const legacyLevels: Array<{ value: string; label: string }> = [
    { value: 'all', label: '全部' },
    { value: 'beginner', label: '初级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' },
  ];

  const legacyLevelConfig: Record<string, { label: string; color: string }> = {
    beginner: { label: '初级', color: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' },
    intermediate: { label: '中级', color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' },
    advanced: { label: '高级', color: 'bg-[var(--purple-soft)]/15 text-[var(--purple-soft)]' },
  };

  const legacyCategoryLabels: Record<string, string> = {
    '조사': '조사 (助词)', '어미': '어미 (语尾)', '연결': '연결 (连接)',
    '시제': '시제 (时制)', '존대': '존대 (敬语)', '문형': '문형 (句型)',
    '인용': '인용 (引用)', '사동/피동': '사동/피동',
  };

  // ═══════════════════════════════ HOME ═══════════════════════════════
  if (viewMode === 'home') {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FileText size={22} className="text-[var(--pink-primary)]" />
            句型
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">学会用韩语表达，而不只是看懂语法</p>
        </div>

        {/* Stats */}
        {(learnedCount > 0 || learningCount > 0) && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center justify-around">
            <div className="text-center">
              <p className="text-lg font-extrabold text-[var(--mint-soft)]">{learnedCount}</p>
              <p className="text-[10px] text-[var(--text-muted)]">已掌握</p>
            </div>
            <div className="w-px h-8 bg-[var(--border-color)]" />
            <div className="text-center">
              <p className="text-lg font-extrabold text-[var(--pink-primary)]">{learningCount}</p>
              <p className="text-[10px] text-[var(--text-muted)]">学习中</p>
            </div>
            <div className="w-px h-8 bg-[var(--border-color)]" />
            <div className="text-center">
              <p className="text-lg font-extrabold text-[var(--peach-soft)]">{difficultCount}</p>
              <p className="text-[10px] text-[var(--text-muted)]">易错</p>
            </div>
          </div>
        )}

        {/* Review due */}
        {reviewPatterns.length > 0 && (
          <div className="bg-gradient-to-br from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border-2 border-[var(--peach-soft)]/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--peach-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">需要复习</span>
              <span className="text-[10px] text-[var(--text-muted)]">{reviewPatterns.length} 个句型待巩固</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {reviewPatterns.slice(0, 4).map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => setSessionGrammar(gp)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-medium hover:bg-[var(--pink-primary)]/10 transition-colors"
                >
                  {gp.displayTitle}
                </button>
              ))}
            </div>
            {reviewPatterns.length > 0 && (
              <button
                onClick={() => startReview(reviewPatterns)}
                className="w-full py-2.5 bg-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-xl text-sm font-medium text-[var(--peach-soft)]"
              >
                复习 {reviewPatterns.length} 个句型
              </button>
            )}
          </div>
        )}

        {/* Today's task */}
        <div className="bg-gradient-to-br from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border-2 border-[var(--pink-primary)]/20 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target size={20} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">今日句型</span>
            <span className="text-[10px] text-[var(--text-muted)] ml-auto">~3 分钟</span>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--text-secondary)] mb-1">今天学会：</p>
            <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{todayPattern.displayTitle}</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">{todayPattern.pattern}</p>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">{todayPattern.functionZh}</p>
          <button
            onClick={() => setSessionGrammar(todayPattern)}
            className="w-full py-3.5 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
          >
            开始 3 分钟练习
          </button>
        </div>

        {/* Progress */}
        {studiedIds.length > 0 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--mint-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">我的句型进度</span>
            </div>
            <div className="w-full bg-[var(--border-color)]/40 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] transition-all duration-500"
                style={{ width: `${Math.min((learnedCount / 30) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)]">已学 {studiedIds.length}/30 个高频句型</p>
          </div>
        )}

        {/* Recommended next patterns */}
        {recommended.length > 0 && (
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)] mb-3">继续学习</p>
            <div className="space-y-2">
              {recommended.map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => setSessionGrammar(gp)}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4 hover:border-[var(--pink-primary)]/30 transition-all group text-left"
                >
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${levelConfig[gp.level]}`}>
                    {gp.level === 'absolute_beginner' ? '零基础' : gp.level === 'beginner' ? '初级' : gp.level === 'elementary' ? '初级+' : '中级'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{gp.displayTitle}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{gp.functionZh}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* High-frequency grid */}
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)] mb-3">高频句型</p>
          <div className="grid grid-cols-2 gap-2">
            {sentencePatterns.slice(0, 10).map((gp) => {
              const state = grammarStates[gp.id];
              return (
                <button
                  key={gp.id}
                  onClick={() => setSessionGrammar(gp)}
                  className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-left hover:border-[var(--pink-primary)]/30 transition-all group"
                >
                  <p className="text-sm font-bold text-[var(--text-primary)] truncate">{gp.displayTitle}</p>
                  <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">{gp.pattern}</p>
                  {state && (
                    <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded-full mt-1 ${
                      state.status === 'mastered' ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' :
                      state.status === 'difficult' ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]' :
                      'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                    }`}>
                      {state.status === 'mastered' ? '已掌握' : state.status === 'difficult' ? '易错' : '学习中'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison section */}
        {comparePairsData.length > 0 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <GitCompare size={16} className="text-[var(--purple-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">易混语法对比</span>
            </div>
            <div className="space-y-2">
              {comparePairsData.slice(0, 3).map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => { setComparePair(pair); setCompareQIdx(0); setCompareResult(null); setViewMode('comparison'); }}
                  className="w-full bg-[var(--bg-input)] rounded-xl p-3 text-left flex items-center gap-3 hover:bg-[var(--bg-card)] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{pair.title}</p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">{pair.difference}</p>
                  </div>
                  <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Library entry */}
        <button
          onClick={() => setViewMode('library')}
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4 hover:border-[var(--mint-soft)]/30 transition-all group text-left"
        >
          <div className="p-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--mint-soft)]">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--text-primary)]">全部句型</p>
            <p className="text-xs text-[var(--text-muted)] truncate">83 个语法点，按 TOPIK 分类</p>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Beginner tip */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <p className="text-sm font-bold text-[var(--text-primary)] mb-1">新手建议</p>
          <p className="text-xs text-[var(--text-muted)]">
            不需要一天记住所有语法。每天 3 分钟练一个句型，每个句型能说出 3 句话，比背 100 条规则更有用。
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════ COMPARISON ═══════════════════════════════
  if (viewMode === 'comparison' && comparePair) {
    const q = comparePair.questions[compareQIdx];
    const isLastQ = compareQIdx >= comparePair.questions.length - 1;

    const handleCompareAnswer = (opt: string) => {
      if (compareResult) return;
      setSelectedCompareOption(opt);
      if (opt === q.answer) {
        setCompareResult('correct');
      } else {
        setCompareResult('wrong');
      }
    };

    const handleCompareNext = () => {
      if (isLastQ) {
        setViewMode('home');
        setComparePair(null);
        setCompareQIdx(0);
        setCompareResult(null);
        setSelectedCompareOption(null);
      } else {
        setCompareQIdx(compareQIdx + 1);
        setCompareResult(null);
        setSelectedCompareOption(null);
      }
    };

    return (
      <div className="py-4 space-y-4 max-w-2xl mx-auto md:max-w-3xl">
        <div className="flex items-center gap-2">
          <button onClick={() => { setViewMode('home'); setComparePair(null); setCompareQIdx(0); setCompareResult(null); setSelectedCompareOption(null); }} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowRight size={18} className="rotate-180" />
          </button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{comparePair.title}</h1>
        </div>

        {/* Side-by-side cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <p className="text-[10px] text-[var(--text-muted)] mb-1">语法 A</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">{comparePair.a.displayTitle}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">{comparePair.a.pattern}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">{comparePair.a.shortExplanation}</p>
            {comparePair.a.examples.slice(0, 2).map((ex, i) => (
              <p key={i} className="text-[10px] text-[var(--text-muted)] mt-1">{ex.ko} — {ex.zh}</p>
            ))}
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <p className="text-[10px] text-[var(--text-muted)] mb-1">语法 B</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">{comparePair.b.displayTitle}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">{comparePair.b.pattern}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">{comparePair.b.shortExplanation}</p>
            {comparePair.b.examples.slice(0, 2).map((ex, i) => (
              <p key={i} className="text-[10px] text-[var(--text-muted)] mt-1">{ex.ko} — {ex.zh}</p>
            ))}
          </div>
        </div>

        {/* Key difference */}
        <div className="bg-[var(--purple-soft)]/10 border border-[var(--purple-soft)]/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={14} className="text-[var(--purple-soft)]" />
            <span className="text-xs font-bold text-[var(--text-primary)]">一句话区别</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">{comparePair.difference}</p>
        </div>

        {/* Quiz */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
          <p className="text-xs font-medium text-[var(--text-muted)]">判断题 {compareQIdx + 1}/{comparePair.questions.length}</p>
          <p className="text-sm font-bold text-[var(--text-primary)]">{q.prompt}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              let btnStyle = 'bg-[var(--bg-input)] text-[var(--text-primary)]';
              if (compareResult) {
                if (opt === q.answer) {
                  btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)] text-[var(--mint-soft)]';
                } else if (opt === selectedCompareOption) {
                  btnStyle = 'bg-[var(--color-danger-bg)] border-[var(--color-danger-light)] text-[var(--color-danger)]';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleCompareAnswer(opt)}
                  disabled={compareResult !== null}
                  className={`w-full p-3 rounded-xl border text-sm text-left transition-all ${btnStyle} ${compareResult ? 'border' : 'border-transparent hover:border-[var(--pink-primary)]/30'}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {compareResult && (
            <div className={`rounded-xl p-3 text-left ${
              compareResult === 'correct'
                ? 'bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20'
                : 'bg-[var(--color-danger-bg)] border border-[var(--color-danger-light)]'
            }`}>
              <p className="text-xs font-medium text-[var(--text-primary)]">
                {compareResult === 'correct' ? '正确!' : '再想想'}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{q.explanation}</p>
            </div>
          )}

          {compareResult && (
            <button onClick={handleCompareNext} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              {isLastQ ? '完成' : '下一题'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════ LIBRARY ═══════════════════════════════
  return (
    <div className="py-4 space-y-3 max-w-2xl mx-auto md:max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('home')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowRight size={18} className="rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">全部句型</h1>
        </div>
        <p className="text-[var(--text-secondary)] text-sm mt-1">按 TOPIK 等级和分类学习韩语语法</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索语法..."
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-pale)]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeCategory === 'all' ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
          }`}
        >
          全部
        </button>
        {legacyCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
            }`}
          >
            {legacyCategoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-2">
        {legacyLevels.map((l) => (
          <button
            key={l.value}
            onClick={() => setActiveLevel(l.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeLevel === l.value ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--text-muted)]">{filtered.length} 个语法点</p>

      {/* Grammar list */}
      <div className="space-y-2">
        {filtered.map((gp: LegacyPoint) => {
          const isOpen = expandedId === gp.id;
          const level = legacyLevelConfig[gp.level] || legacyLevelConfig.beginner;

          return (
            <div key={gp.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedId(isOpen ? null : gp.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div className={`px-2 py-1 rounded-lg text-[10px] font-medium shrink-0 ${level.color}`}>
                  {level.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--text-primary)]">{gp.title}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{gp.pattern} · {gp.topik} · {gp.usage}</p>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-[var(--border-color)] pt-4 animate-fade-in">
                  {/* 结构 + 意思 + 场景 */}
                  <div className="bg-[var(--bg-soft)] rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] w-8 shrink-0 pt-0.5">结构</span>
                      <span className="text-sm font-mono font-bold text-[var(--purple-soft)]">{gp.pattern}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] w-8 shrink-0 pt-0.5">意思</span>
                      <span className="text-sm text-[var(--text-primary)]">{gp.explanation}</span>
                    </div>
                    {gp.conjugation && (
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-bold text-[var(--text-muted)] w-8 shrink-0 pt-0.5">接续</span>
                        <span className="text-xs text-[var(--text-secondary)] whitespace-pre-line">{gp.conjugation}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] w-8 shrink-0 pt-0.5">场景</span>
                      <span className="text-xs text-[var(--text-secondary)]">{gp.usage}</span>
                    </div>
                  </div>

                  {/* 例句 */}
                  {gp.examples.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-1">例句</p>
                      {gp.examples.map((ex, i) => (
                        <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-[var(--text-primary)] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>{ex.ko}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.zh}</p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); speak(ex.ko); }}
                            className="p-1.5 rounded-lg text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 替换练习 (toriTip) */}
                  {gp.toriTip && (
                    <div className="bg-[var(--peach-soft)]/8 border border-[var(--peach-soft)]/20 rounded-xl p-4">
                      <p className="text-[10px] font-bold text-[var(--peach-soft)] mb-1.5 flex items-center gap-1.5">
                        <Lightbulb size={11} />替换练习
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">{gp.toriTip}</p>
                    </div>
                  )}

                  {/* 易混辨析 */}
                  {gp.difference && gp.similarPatterns && (
                    <div className="flex items-start gap-2 bg-[var(--purple-soft)]/8 border border-[var(--purple-soft)]/15 rounded-xl p-3">
                      <AlertCircle size={13} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-[var(--purple-soft)] mb-0.5">与 {gp.similarPatterns.join(', ')} 的区别</p>
                        <p className="text-xs text-[var(--text-secondary)]">{gp.difference}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GrammarPage() {
  return (
    <Suspense>
      <GrammarContent />
    </Suspense>
  );
}
