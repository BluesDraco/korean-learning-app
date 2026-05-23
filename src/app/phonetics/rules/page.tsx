'use client';

import { useState, useCallback } from 'react';
import { Volume2, ChevronDown, ChevronUp, ArrowRight, Sparkles, Check, X, BookOpen, Lightbulb } from 'lucide-react';

const ruleCategories = [
  {
    id: 'linking', label: '连读化', icon: '🔗',
    description: '当前音节有终声且后音节以元音开头时，终声移到后音节作初声',
    rules: [
      {
        id: 'r-01', title: '基本连读', titleKo: '연음',
        explanation: '终声(받침)遇到后面以元音开头的音节时，终声会移到下一个音节作为初声发音。这是韩语最基础的连读规则。',
        examples: [
          { original: '한국어', originalRead: '한구거', meaning: '韩国语' },
          { original: '밖에', originalRead: '바께', meaning: '外面' },
          { original: '책을', originalRead: '채글', meaning: '书(宾格)' },
          { original: '옷이', originalRead: '오시', meaning: '衣服(主格)' },
        ],
      },
      {
        id: 'r-02', title: '复合终声连读', titleKo: '겹받침 연음',
        explanation: '双终声(겹받침)中，连读时第一个终声留在原音节，第二个终声移到后音节。但ㄺ, ㄻ, ㄿ等例外情况中第一个终声作为代表音保留。',
        examples: [
          { original: '읽어요', originalRead: '일거요', meaning: '读' },
          { original: '없어요', originalRead: '업서요', meaning: '没有' },
          { original: '밟아요', originalRead: '발바요', meaning: '踩' },
        ],
      },
    ],
  },
  {
    id: 'nasal', label: '鼻音化', icon: '👃',
    description: '终声ㄱㄷㅂ遇到初声ㅁㄴ时，分别变为ㅇㄴㅁ',
    rules: [
      {
        id: 'r-03', title: '鼻音化', titleKo: '비음화',
        explanation: '终声ㄱ(ㄲ,ㅋ), ㄷ(ㅅ,ㅆ,ㅈ,ㅊ,ㅌ), ㅂ(ㅍ)遇到后面初声为ㅁ或ㄴ时，分别变为ㅇ, ㄴ, ㅁ。这是为了让发音更顺畅。',
        examples: [
          { original: '국물', originalRead: '궁물', meaning: '汤' },
          { original: '받는', originalRead: '반는', meaning: '接受(定语)' },
          { original: '앞문', originalRead: '암문', meaning: '前门' },
          { original: '학년', originalRead: '항년', meaning: '学年' },
        ],
      },
    ],
  },
  {
    id: 'liquid', label: '流音化', icon: '👅',
    description: 'ㄴ与ㄹ相遇时互相影响，ㄴ+ㄹ→ㄹ+ㄹ, ㄹ+ㄴ→ㄹ+ㄹ',
    rules: [
      {
        id: 'r-04', title: '流音化', titleKo: '유음화',
        explanation: 'ㄴ和ㄹ相邻时，ㄴ会变成ㄹ。包括两种情况：ㄹ+ㄴ→ㄹ+ㄹ（如 실내→실래），ㄴ+ㄹ→ㄹ+ㄹ（如 신라→실라）。',
        examples: [
          { original: '신라', originalRead: '실라', meaning: '新罗' },
          { original: '실내', originalRead: '실래', meaning: '室内' },
          { original: '한라산', originalRead: '할라산', meaning: '汉拿山' },
          { original: '전라도', originalRead: '절라도', meaning: '全罗道' },
        ],
      },
    ],
  },
  {
    id: 'aspiration', label: '送气化', icon: '💨',
    description: 'ㅎ与ㄱㄷㅂㅈ相遇时互相结合为送气音ㅋㅌㅍㅊ',
    rules: [
      {
        id: 'r-05', title: '送气化', titleKo: '격음화',
        explanation: 'ㅎ与松音(ㄱ,ㄷ,ㅂ,ㅈ)相遇时会结合成对应的送气音(ㅋ,ㅌ,ㅍ,ㅊ)。可以在同一个音节内（如 많→만ㅎ→만ㅌ），也可以跨音节（如 축하→추카）。',
        examples: [
          { original: '축하해요', originalRead: '추카해요', meaning: '祝贺' },
          { original: '많다', originalRead: '만타', meaning: '多' },
          { original: '입학', originalRead: '이팍', meaning: '入学' },
          { original: '잊혀지다', originalRead: '이쳐지다', meaning: '被遗忘' },
        ],
      },
    ],
  },
  {
    id: 'palatalization', label: '腭化', icon: '😊',
    description: '终声ㄷㅌ遇到后缀이时变为ㅈㅊ',
    rules: [
      {
        id: 'r-06', title: '腭化', titleKo: '구개음화',
        explanation: '终声ㄷ,ㅌ遇到后面以이开头的助词或后缀时，变成ㅈ,ㅊ。最常见的例子是"같이"读作"가치"、"굳이"读作"구지"。',
        examples: [
          { original: '같이', originalRead: '가치', meaning: '一起' },
          { original: '굳이', originalRead: '구지', meaning: '非要/偏偏' },
          { original: '해돋이', originalRead: '해도지', meaning: '日出' },
          { original: '붙이다', originalRead: '부치다', meaning: '粘贴' },
        ],
      },
    ],
  },
];

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.7;
  window.speechSynthesis.speak(utterance);
}

// Shuffle utility
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate quiz questions from the rule data
function generateQuizQuestions() {
  const allExamples = ruleCategories.flatMap((cat) =>
    cat.rules.flatMap((rule) =>
      rule.examples.map((ex) => ({
        ...ex,
        ruleTitle: rule.title,
      }))
    )
  );

  const selected = shuffleArray(allExamples).slice(0, 3);

  return selected.map((item) => {
    // Pick 3 incorrect options
    const incorrect = shuffleArray(allExamples.filter((e) => e.originalRead !== item.originalRead)).slice(0, 3);
    const options = shuffleArray([item.originalRead, ...incorrect.map((e) => e.originalRead)]);
    return {
      question: `"${item.original}" 的正确读音是？`,
      correct: options.indexOf(item.originalRead),
      options,
      original: item.original,
      meaning: item.meaning,
      correctRead: item.originalRead,
    };
  });
}

export default function PhoneticsRulesPage() {
  const [activeTab, setActiveTab] = useState(ruleCategories[0].id);
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set(['r-01']));
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizQuestions] = useState(() => generateQuizQuestions());

  const toggleRule = useCallback((ruleId: string) => {
    setExpandedRules((prev) => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      return next;
    });
  }, []);

  const activeCategory = ruleCategories.find((c) => c.id === activeTab) || ruleCategories[0];

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === quizQuestions[quizIdx].correct) {
      setQuizCorrect((prev) => prev + 1);
    }
  };

  const handleQuizNext = () => {
    if (quizIdx + 1 >= quizQuestions.length) {
      setQuizStarted(false);
      // Reset quiz for next time
      setQuizIdx(0);
      setQuizAnswer(null);
      setQuizCorrect(0);
    } else {
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BookOpen size={22} className="text-[var(--pink-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩语连读规则</h1>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          掌握韩语的发音变化规则，让口语更地道自然
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5 overflow-x-auto">
        {ruleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === cat.id
                ? 'bg-[var(--pink-primary)] text-white shadow-md shadow-[var(--pink-primary)]/20'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input)]'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category description */}
      <div className="bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          <span className="font-medium text-[var(--pink-primary)]">{activeCategory.icon} {activeCategory.label}</span>
          {' — '}{activeCategory.description}
        </p>
      </div>

      {/* Rule cards */}
      <div className="space-y-4">
        {activeCategory.rules.map((rule) => {
          const isExpanded = expandedRules.has(rule.id);
          return (
            <div
              key={rule.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all"
            >
              {/* Rule header */}
              <button
                onClick={() => toggleRule(rule.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-primary)] transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{rule.title}</h3>
                  <p className="text-sm text-[var(--pink-primary)] font-medium">{rule.titleKo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--purple-soft)]" />
                  {isExpanded ? (
                    <ChevronUp size={18} className="text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown size={18} className="text-[var(--text-muted)]" />
                  )}
                </div>
              </button>

              {/* Rule content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 animate-fade-in">
                  {/* Explanation */}
                  <div className="bg-[var(--bg-input)] rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb size={16} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">{rule.explanation}</p>
                    </div>
                  </div>

                  {/* Examples table */}
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-medium">
                      发音示例
                    </p>
                    <div className="bg-[var(--bg-primary)] rounded-xl overflow-hidden border border-[var(--border-color)]">
                      {/* Table header */}
                      <div className="grid grid-cols-[1fr_auto_1fr_1fr] gap-2 px-4 py-2.5 bg-[var(--bg-input)] text-xs font-medium text-[var(--text-secondary)]">
                        <span>원형 (原形)</span>
                        <span className="text-center px-2">→</span>
                        <span>실제 발음 (实际发音)</span>
                        <span className="text-right">뜻 (含义)</span>
                      </div>
                      {/* Table rows */}
                      {rule.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-[1fr_auto_1fr_1fr] gap-2 px-4 py-3 border-t border-[var(--pink-pale)] items-center hover:bg-[var(--bg-input)]/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-[var(--text-primary)]">{ex.original}</span>
                          <span className="text-[var(--text-muted)] text-xs">→</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-[var(--pink-primary)]">{ex.originalRead}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakKorean(ex.originalRead);
                              }}
                              className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                              title="听发音"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <span className="text-sm text-[var(--text-secondary)] text-right">{ex.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz section divider */}
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-[var(--pink-pale)]" />
        <span className="text-xs text-[var(--text-muted)] font-medium">测验练习</span>
        <div className="flex-1 h-px bg-[var(--pink-pale)]" />
      </div>

      {/* Quiz section */}
      {!quizStarted ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--pink-primary)]/15 to-[var(--purple-soft)]/15 flex items-center justify-center mx-auto border border-[var(--pink-pale)]">
            <Sparkles size={28} className="text-[var(--pink-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">听发音选正确读音</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              测试你对韩语连读规则的掌握程度，共 3 题
            </p>
          </div>
          <button
            onClick={() => {
              setQuizStarted(true);
              setQuizIdx(0);
              setQuizAnswer(null);
              setQuizCorrect(0);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] hover:from-[var(--purple-soft)] hover:to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all text-sm font-medium mx-auto shadow-lg shadow-[var(--purple-soft)]/15 active:scale-95"
          >
            开始测验
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          {/* Quiz progress */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              第 {quizIdx + 1} 题 / 共 {quizQuestions.length} 题
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              正确: {quizCorrect}/{quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${((quizIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-[var(--text-secondary)]">
                含义: <span className="text-[var(--text-primary)] font-medium">{quizQuestions[quizIdx].meaning}</span>
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  {quizQuestions[quizIdx].original}
                </span>
                <button
                  onClick={() => speakKorean(quizQuestions[quizIdx].original)}
                  className="p-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"
                  title="听单词发音"
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {quizQuestions[quizIdx].question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {quizQuestions[quizIdx].options.map((opt, i) => {
                let btnStyle = 'bg-[var(--bg-input)] border border-[var(--pink-pale)] hover:border-[var(--pink-primary)]/30';
                if (quizAnswer !== null) {
                  if (i === quizQuestions[quizIdx].correct) {
                    btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50';
                  } else if (i === quizAnswer && i !== quizQuestions[quizIdx].correct) {
                    btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50';
                  } else {
                    btnStyle = 'bg-[var(--bg-input)] border-[var(--pink-pale)] opacity-50';
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => quizAnswer === null && handleQuizAnswer(i)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl text-center transition-all ${btnStyle}`}
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)]">{opt}</span>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKorean(opt);
                        }}
                        className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"
                        title="听发音"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    {quizAnswer !== null && i === quizQuestions[quizIdx].correct && (
                      <Check size={16} className="text-[var(--mint-soft)] inline-block mt-1" />
                    )}
                    {quizAnswer !== null && i === quizAnswer && i !== quizQuestions[quizIdx].correct && (
                      <X size={16} className="text-[var(--color-danger)] inline-block mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {quizAnswer !== null && (
              <div
                className={`rounded-xl p-4 text-center animate-fade-in ${
                  quizAnswer === quizQuestions[quizIdx].correct
                    ? 'bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20'
                    : 'bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20'
                }`}
              >
                {quizAnswer === quizQuestions[quizIdx].correct ? (
                  <p className="text-sm text-[var(--mint-soft)] font-medium">
                    ✓ 正确！"{quizQuestions[quizIdx].original}" 读作 "{quizQuestions[quizIdx].correctRead}"
                  </p>
                ) : (
                  <p className="text-sm text-[var(--color-danger)] font-medium">
                    ✗ 不对哦！"{quizQuestions[quizIdx].original}" 的正确读音是 "{quizQuestions[quizIdx].correctRead}"
                  </p>
                )}
              </div>
            )}

            {/* Next button */}
            {quizAnswer !== null && (
              <button
                onClick={handleQuizNext}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
              >
                {quizIdx + 1 >= quizQuestions.length ? '查看结果' : '下一题'}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
