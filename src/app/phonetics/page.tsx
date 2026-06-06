'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Volume2, Play, Check, X, ArrowRight, RotateCcw, Trophy, ChevronDown, ChevronUp, Sparkles, Lightbulb } from 'lucide-react';
import { vowels, consonants, batchimSounds, type PhoneticLetter } from '@/data/phonetics';
import { speak } from '@/lib/tts';
import ProgressivePhonetics from '@/components/ProgressivePhonetics';
import SyllableComposer from '@/components/SyllableComposer';
import PhoneticsWelcome, { hasSeenWelcome } from '@/components/PhoneticsWelcome';

type Tab = 'vowel' | 'consonant' | 'batchim';
type Mode = 'browse' | 'quiz';
type MainTab = 'progressive' | 'alphabet' | 'rules' | 'composer';


function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function generateQuiz(letters: PhoneticLetter[]) {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, 10);
  return pool.map((item) => {
    const isLetterQ = Math.random() > 0.5;
    const wrongOptions = pool
      .filter((l) => l.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      id: item.id,
      prompt: isLetterQ
        ? `这个字母 "${item.letter}" 的发音是？`
        : `这个发音 "${item.romanization}" 对应哪个字母？`,
      correctAnswer: isLetterQ ? item.romanization : item.letter,
      options: shuffleArray([
        isLetterQ ? item.romanization : item.letter,
        ...wrongOptions.map((w) => (isLetterQ ? w.romanization : w.letter)),
      ]),
      item,
    };
  });
}

const tabConfig: { key: Tab; label: string }[] = [
  { key: 'vowel', label: '元音' },
  { key: 'consonant', label: '辅音' },
  { key: 'batchim', label: '收音' },
];

const subtypeLabels: Record<string, string> = {
  basic: '基础',
  compound: '复合',
  double: '紧音',
  stop: '塞音',
  nasal: '鼻音',
  liquid: '流音',
};

function getSubtypeLabel(subtype: string, tab: Tab): string {
  if (tab === 'vowel') {
    if (subtype === 'basic') return '基础元音';
    if (subtype === 'compound') return '复合元音';
  }
  if (tab === 'consonant') {
    if (subtype === 'basic') return '基础辅音';
    if (subtype === 'double') return '紧音';
  }
  return subtypeLabels[subtype] || subtype;
}

function getSpeakText(letter: PhoneticLetter): string {
  if (letter.type === 'vowel') return letter.name;
  if (letter.type === 'batchim') return letter.name;
  // consonant: speak letter name for reliable TTS
  return letter.name;
}

// ── Rules data (merged from phonetics/rules) ──────────────────

const ruleCategories = [
  {
    id: 'linking', label: '连读化',
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
    id: 'nasal', label: '鼻音化',
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
    id: 'liquid', label: '流音化',
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
    id: 'aspiration', label: '送气化',
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
    id: 'palatalization', label: '腭化',
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

function generateRulesQuiz() {
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

export default function PhoneticsPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeChecked, setWelcomeChecked] = useState(false);
  const [mainTab, setMainTab] = useState<MainTab>('progressive');

  useEffect(() => {
    setShowWelcome(!hasSeenWelcome());
    setWelcomeChecked(true);
  }, []);
  const [tab, setTab] = useState<Tab>('vowel');
  const [mode, setMode] = useState<Mode>('browse');
  const [quizState, setQuizState] = useState<{
    questions: ReturnType<typeof generateQuiz>;
    currentIdx: number;
    selectedAnswer: string | null;
    correctCount: number;
  } | null>(null);

  const dataMap: Record<Tab, PhoneticLetter[]> = {
    vowel: vowels,
    consonant: consonants,
    batchim: batchimSounds,
  };

  const currentData = dataMap[tab];

  const subtypes = useMemo(() => {
    const seen = new Set<string>();
    return currentData
      .map((l) => l.subtype)
      .filter((s) => {
        if (seen.has(s)) return false;
        seen.add(s);
        return true;
      });
  }, [currentData]);

  const startQuiz = () => {
    setMode('quiz');
    setQuizState({
      questions: generateQuiz(currentData),
      currentIdx: 0,
      selectedAnswer: null,
      correctCount: 0,
    });
  };

  const handleQuizAnswer = (answer: string) => {
    if (!quizState || quizState.selectedAnswer !== null) return;
    const isCorrect = answer === quizState.questions[quizState.currentIdx].correctAnswer;
    setQuizState({
      ...quizState,
      selectedAnswer: answer,
      correctCount: quizState.correctCount + (isCorrect ? 1 : 0),
    });
  };

  const handleQuizNext = () => {
    if (!quizState) return;
    if (quizState.currentIdx + 1 >= quizState.questions.length) {
      return;
    }
    setQuizState({
      ...quizState,
      currentIdx: quizState.currentIdx + 1,
      selectedAnswer: null,
    });
  };

  const resetQuiz = () => {
    setMode('browse');
    setQuizState(null);
  };

  const handleMainTabChange = (newTab: MainTab) => {
    setMainTab(newTab);
    if (newTab === 'alphabet') {
      // Reset alphabet state
      setMode('browse');
      setQuizState(null);
    }
  };

  if (!welcomeChecked) return null;

  return (
    <>
      {showWelcome && <PhoneticsWelcome onDone={() => setShowWelcome(false)} />}
      <div className="py-4 space-y-3">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩语40音</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          21个元音 + 19个辅音，科学分步学习。15分钟看懂所有韩文 — 这是你韩语学习的地基模块
        </p>
      </div>

      {/* Top-level tab switcher: 分步学习 | 字母表 | 连读规则 */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5">
        <button
          onClick={() => handleMainTabChange('progressive')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'progressive'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          分步学习
        </button>
        <button
          onClick={() => handleMainTabChange('alphabet')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'alphabet'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          字母表
        </button>
        <button
          onClick={() => handleMainTabChange('rules')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'rules'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          连读规则
        </button>
        <button
          onClick={() => handleMainTabChange('composer')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'composer'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          音节拼装
        </button>
      </div>

      {/* ── 分步学习 tab ── */}
      {mainTab === 'progressive' && <ProgressivePhonetics />}

      {/* ── 字母表 tab ── */}
      {mainTab === 'alphabet' && (
        <>
          {/* Sub-tab switcher */}
          <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5">
            {tabConfig.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setMode('browse'); setQuizState(null); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t.key
                    ? 'bg-[var(--pink-primary)] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {mode === 'browse' && (
            <>
              {/* Letters grid */}
              {subtypes.map((subtype) => {
                const letters = currentData.filter((l) => l.subtype === subtype);
                return (
                  <div key={subtype}>
                    <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)]" />
                      {getSubtypeLabel(subtype, tab)}
                      <span className="text-[var(--text-placeholder)] font-normal">({letters.length}个)</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {letters.map((letter) => (
                        <button
                          key={letter.id}
                          onClick={() => speak(getSpeakText(letter), 0.7)}
                          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center hover:border-[var(--pink-primary)]/30 hover:shadow-md hover:shadow-[var(--pink-primary)]/5 transition-all group"
                        >
                          <span className="text-3xl font-bold text-[var(--text-primary)] block mb-0.5" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                            {letter.letter}
                          </span>
                          <span className="text-xs text-[var(--pink-primary)] font-medium">{letter.romanization}</span>
                          <div className="flex items-center justify-center gap-1 mt-1.5 text-[13px] text-[var(--text-placeholder)] opacity-0 group-hover:opacity-100 transition-opacity">
                            <Volume2 size={10} />
                            点击发音
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Detail cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple-soft)]" />
                  详细说明
                </h3>
                {currentData.map((letter) => (
                  <div
                    key={letter.id}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-start gap-4"
                  >
                    <button
                      onClick={() => speak(getSpeakText(letter), 0.7)}
                      className="shrink-0 w-16 h-16 rounded-xl bg-[var(--bg-input)] flex items-center justify-center hover:bg-[var(--bg-accent)] transition-colors"
                    >
                      <span className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                        {letter.letter}
                      </span>
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-[var(--text-primary)]">{letter.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                          {letter.romanization}
                        </span>
                        {letter.type === 'batchim' && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">
                            {subtypeLabels[letter.subtype]}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{letter.sound}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{letter.mnemonic}</p>
                    </div>
                    <button
                      onClick={() => speak(getSpeakText(letter), 0.7)}
                      className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      title="听发音"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quiz CTA */}
              <div className="bg-gradient-to-r from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border border-[var(--pink-primary)]/20 rounded-2xl p-6 text-center">
                <p className="text-[var(--text-primary)] font-medium mb-1">准备测试一下吗？</p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">听音选字 / 看字选音，检验你的掌握程度</p>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl font-medium transition-colors active:scale-95"
                >
                  <Play size={16} />
                  开始测验
                </button>
              </div>
            </>
          )}

          {mode === 'quiz' && quizState && (
            <>
              {/* Quiz header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  第 {quizState.currentIdx + 1} / {quizState.questions.length} 题
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  正确: <span className="text-[var(--mint-soft)] font-medium">{quizState.correctCount}</span>
                </span>
                <button
                  onClick={resetQuiz}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  退出
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
                <div
                  className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
                  style={{ width: `${((quizState.currentIdx + 1) / quizState.questions.length) * 100}%` }}
                />
              </div>

              {/* Question card */}
              {(() => {
                const q = quizState.questions[quizState.currentIdx];
                const isComplete = quizState.currentIdx + 1 >= quizState.questions.length && quizState.selectedAnswer !== null;

                if (isComplete) {
                  const accuracy = Math.round((quizState.correctCount / quizState.questions.length) * 100);
                  return (
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
                      <Trophy size={48} className="text-[var(--peach-soft)] mx-auto" />
                      <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">测验完成！</h2>
                        <p className="text-[var(--text-secondary)] mt-1">
                          正确 {quizState.correctCount} / {quizState.questions.length}
                        </p>
                        <p className={`text-lg font-bold mt-1 ${accuracy >= 80 ? 'text-[var(--mint-soft)]' : accuracy >= 60 ? 'text-[var(--peach-soft)]' : 'text-[var(--color-danger)]'}`}>
                          {accuracy}%
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={startQuiz}
                          className="px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium transition-colors"
                        >
                          再来一次
                        </button>
                        <button
                          onClick={resetQuiz}
                          className="px-5 py-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
                        >
                          返回浏览
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
                    {/* Letter display for sound questions */}
                    {q.prompt.includes('字母') && (
                      <div className="text-center">
                        <span className="text-5xl font-bold text-[var(--text-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                          {q.item.letter}
                        </span>
                      </div>
                    )}

                    {/* Sound display for romanization questions */}
                    {q.prompt.includes('发音') && (
                      <div className="text-center">
                        <span className="text-2xl font-bold text-[var(--pink-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4">
                          [{q.item.romanization}]
                        </span>
                        <button
                          onClick={() => speak(getSpeakText(q.item), 0.7)}
                          className="ml-2 p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] transition-colors inline-flex align-middle"
                          title="听发音"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    )}

                    <h3 className="text-lg font-medium text-[var(--text-primary)] text-center">{q.prompt}</h3>

                    <div className="grid grid-cols-2 gap-3">
                      {q.options.map((opt, i) => {
                        let btnStyle = 'bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-primary)]';
                        if (quizState.selectedAnswer !== null) {
                          if (opt === q.correctAnswer) {
                            btnStyle = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                          } else if (opt === quizState.selectedAnswer) {
                            btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                          } else {
                            btnStyle = 'bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-50';
                          }
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(opt)}
                            disabled={quizState.selectedAnswer !== null}
                            className={`p-4 rounded-xl text-center font-medium transition-all ${btnStyle}`}
                          >
                            <span className={q.prompt.includes('字母') ? 'text-lg' : 'text-2xl'} style={q.prompt.includes('发音') ? { fontFamily: "'system-ui', 'sans-serif'" } : undefined}>
                              {opt}
                            </span>
                            {quizState.selectedAnswer !== null && opt === q.correctAnswer && (
                              <Check size={16} className="inline ml-1 text-[var(--mint-soft)]" />
                            )}
                            {quizState.selectedAnswer !== null && opt === quizState.selectedAnswer && opt !== q.correctAnswer && (
                              <X size={16} className="inline ml-1 text-[var(--color-danger)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizState.selectedAnswer !== null && (
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => speak(getSpeakText(q.item), 0.7)}
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] flex items-center gap-1"
                        >
                          <Volume2 size={12} />
                          再听一次
                        </button>
                        <button
                          onClick={handleQuizNext}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium transition-colors"
                        >
                          下一题
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </>
      )}

      {/* ── 连读规则 tab ── */}
      {mainTab === 'rules' && <RulesTab />}

      {/* ── 音节拼装 tab ── */}
      {mainTab === 'composer' && <SyllableComposer />}
    </div>
    </>
  );
}

function RulesTab() {
  const [activeTab, setActiveTab] = useState(ruleCategories[0].id);
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set(['r-01']));
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizQuestions] = useState(() => generateRulesQuiz());

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
      setQuizIdx(0);
      setQuizAnswer(null);
      setQuizCorrect(0);
    } else {
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Rules tab bar */}
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
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category description */}
      <div className="bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          <span className="font-medium text-[var(--pink-primary)]">{activeCategory.label}</span>
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
                      <div className="hidden sm:grid grid-cols-[1fr_auto_1fr_1fr] gap-2 px-4 py-2.5 bg-[var(--bg-input)] text-xs font-medium text-[var(--text-secondary)]">
                        <span>원형 (原形)</span>
                        <span className="text-center px-2">→</span>
                        <span>실제 발음 (实际发音)</span>
                        <span className="text-right">뜻 (含义)</span>
                      </div>
                      {/* Table rows — desktop */}
                      {rule.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="hidden sm:grid grid-cols-[1fr_auto_1fr_1fr] gap-2 px-4 py-3 border-t border-[var(--pink-pale)] items-center hover:bg-[var(--bg-input)]/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-[var(--text-primary)]">{ex.original}</span>
                          <span className="text-[var(--text-muted)] text-xs">→</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-[var(--pink-primary)]">{ex.originalRead}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(ex.originalRead, 0.7);
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
                      {/* Table rows — mobile stacked cards */}
                      {rule.examples.map((ex, idx) => (
                        <div
                          key={`m-${idx}`}
                          className="sm:hidden flex flex-col gap-1.5 px-4 py-3 border-t border-[var(--pink-pale)]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{ex.original}</span>
                            <span className="text-xs text-[var(--text-muted)]">→</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[var(--pink-primary)]">{ex.originalRead}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speak(ex.originalRead, 0.7);
                                }}
                                className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                                title="听发音"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-[var(--text-secondary)]">含义: {ex.meaning}</span>
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] hover:from-[var(--purple-soft)] hover:to-[var(--pink-primary)] text-white rounded-2xl transition-all text-sm font-medium mx-auto shadow-lg shadow-[var(--purple-soft)]/15 active:scale-95"
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
                  onClick={() => speak(quizQuestions[quizIdx].original, 0.7)}
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
                          speak(opt, 0.7);
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
                  <p className="text-sm text-[var(--text-primary)] font-medium">
                    正确！"{quizQuestions[quizIdx].original}" 读作 "{quizQuestions[quizIdx].correctRead}"
                  </p>
                ) : (
                  <p className="text-sm text-[var(--text-primary)] font-medium">
                    不对哦！"{quizQuestions[quizIdx].original}" 的正确读音是 "{quizQuestions[quizIdx].correctRead}"
                  </p>
                )}
              </div>
            )}

            {/* Next button */}
            {quizAnswer !== null && (
              <button
                onClick={handleQuizNext}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-2xl transition-colors font-medium active:scale-95"
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
