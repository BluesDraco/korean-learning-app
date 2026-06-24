'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, Play, Check, X, ArrowRight, RotateCcw, Trophy, ChevronDown, ChevronUp, Sparkles, Lightbulb, ArrowLeft } from 'lucide-react';
import { vowels, consonants, batchimSounds, type PhoneticLetter } from '@/data/phonetics';
import { speak, speakWord, unlockAudioContext } from '@/lib/tts';
import { getStaticAudio } from '@/lib/audio/audioRegistry';
import { playSuccess, playError } from '@/lib/soundManager';
import ProgressivePhonetics from '@/components/ProgressivePhonetics';
import SyllableComposer from '@/components/SyllableComposer';
import PhoneticsWelcome, { hasSeenWelcome } from '@/components/PhoneticsWelcome';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Tab = 'vowel' | 'consonant' | 'batchim';
type Mode = 'browse' | 'quiz';
type MainTab = 'progressive' | 'alphabet' | 'rules' | 'composer' | 'practice';


function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function getQuizRomanization(l: PhoneticLetter) {
  return l.quizRomanization ?? l.romanization;
}

function getQuizLetter(l: PhoneticLetter) {
  return l.quizLetter ?? l.letter;
}

type QuizType = 'letter-to-roman' | 'roman-to-letter' | 'listen-to-letter';

function generateQuiz(letters: PhoneticLetter[], quizType: QuizType = 'letter-to-roman') {
  const pool = [...letters].sort(() => Math.random() - 0.5).slice(0, 10);
  return pool.map((item) => {
    if (quizType === 'listen-to-letter') {
      const correctAnswer = getQuizLetter(item);
      const wrongOptions: string[] = [];
      const wrongPool = pool.filter((l) => l.id !== item.id).sort(() => Math.random() - 0.5);
      for (const w of wrongPool) {
        if (wrongOptions.length >= 3) break;
        const val = getQuizLetter(w);
        if (val !== correctAnswer && !wrongOptions.includes(val)) wrongOptions.push(val);
      }
      return {
        id: item.id,
        prompt: '听音选字',
        correctAnswer,
        options: shuffleArray([correctAnswer, ...wrongOptions]),
        item,
        isListen: true,
      };
    }
    const isLetterQ = quizType === 'letter-to-roman';
    const correctAnswer = isLetterQ ? getQuizRomanization(item) : getQuizLetter(item);
    const wrongPool = pool.filter((l) => l.id !== item.id).sort(() => Math.random() - 0.5);
    const wrongOptions: string[] = [];
    for (const w of wrongPool) {
      if (wrongOptions.length >= 3) break;
      const val = isLetterQ ? getQuizRomanization(w) : getQuizLetter(w);
      if (val !== correctAnswer && !wrongOptions.includes(val)) wrongOptions.push(val);
    }
    return {
      id: item.id,
      prompt: isLetterQ
        ? `这个字母 "${getQuizLetter(item)}" 的发音是？`
        : `这个发音 "${getQuizRomanization(item)}" 对应哪个字母？`,
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongOptions]),
      item,
      isListen: false,
    };
  });
}

const tabConfig: { key: Tab; label: string }[] = [
  { key: 'vowel', label: 'phonetics.tab_vowel' },
  { key: 'consonant', label: 'phonetics.tab_consonant' },
  { key: 'batchim', label: 'phonetics.tab_batchim' },
];

const subtypeKeys: Record<string, string> = {
  basic: 'phonetics.subtype_basic',
  compound: 'phonetics.subtype_compound',
  double: 'phonetics.subtype_double',
  stop: 'phonetics.subtype_stop',
  nasal: 'phonetics.subtype_nasal',
  liquid: 'phonetics.subtype_liquid',
};

function getSubtypeLabel(subtype: string, tab: Tab, lang: import('@/lib/i18n').Lang): string {
  if (tab === 'vowel') {
    if (subtype === 'basic') return t('phonetics.subtype_label_basic_vowel', lang);
    if (subtype === 'compound') return t('phonetics.subtype_label_compound_vowel', lang);
  }
  if (tab === 'consonant') {
    if (subtype === 'basic') return t('phonetics.subtype_label_basic_consonant', lang);
    if (subtype === 'double') return t('phonetics.subtype_label_double_consonant', lang);
  }
  return t(subtypeKeys[subtype] ?? subtype, lang);
}

const CONSONANT_DEMO: Record<string, string> = {
  'ㄱ': '가', 'ㄴ': '나', 'ㄷ': '다', 'ㄹ': '라', 'ㅁ': '마',
  'ㅂ': '바', 'ㅅ': '사', 'ㅈ': '자', 'ㅊ': '차',
  'ㅋ': '카', 'ㅌ': '타', 'ㅍ': '파', 'ㅎ': '하',
  'ㄲ': '까', 'ㄸ': '따', 'ㅃ': '빠', 'ㅆ': '싸', 'ㅉ': '짜',
  // ㅇ 不在此表，回退到 letter.name（이응）→ audioRegistry c-08.mp3
};

// Batchim demo: keys must match audioRegistry (박/산/옷/말/밤/밥/강 → b-01~b-07.mp3)
const BATCHIM_DEMO: Record<string, string> = {
  'ㄱ': '박', 'ㄴ': '산', 'ㄷ': '옷', 'ㄹ': '말', 'ㅁ': '밤',
  'ㅂ': '밥', 'ㅇ': '강',
};

function playPhoneticAudio(text: string, rate = 1.0) {
  const entry = getStaticAudio(text);
  if (entry) {
    const audio = new Audio(entry.url);
    audio.playbackRate = rate;
    audio.play().catch(() => {});
  } else {
    speakWord(text, rate);
  }
}

async function playBatchimAudio(jamo: string) {
  const word = BATCHIM_DEMO[jamo] ?? jamo;
  try {
    const res = await fetch(`/api/tts/phonetics?text=${encodeURIComponent(word)}`);
    if (!res.ok) throw new Error('fail');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play();
  } catch {
    speakWord(word, 0.7);
  }
}

function getSpeakText(letter: PhoneticLetter): string {
  if (letter.type === 'vowel') return letter.name;
  if (letter.type === 'consonant' || letter.type === 'double') {
    const jamo = letter.letter.split('/')[0];
    return CONSONANT_DEMO[jamo] ?? letter.name;
  }
  if (letter.type === 'batchim') {
    const jamo = letter.letter.split('/')[0];
    return BATCHIM_DEMO[jamo] ?? CONSONANT_DEMO[jamo] ?? letter.name;
  }
  return letter.name;
}

// ── Batchim classification quiz ───────────────────────────────
function generateBatchimQuiz() {
  const questions: { prompt: string; correctAnswer: string; options: string[]; repLetter: string; letter: string }[] = [];
  const repLetters = batchimSounds.map((b) => b.quizLetter ?? b.letter.split('/')[0]);

  batchimSounds.forEach((b) => {
    const letters = b.letter.split('/').map((l) => l.trim());
    const correct = b.quizLetter ?? letters[0];
    letters.forEach((l) => {
      const wrongPool = repLetters.filter((r) => r !== correct);
      const wrongs = shuffleArray(wrongPool).slice(0, 3);
      questions.push({
        prompt: `"${l}" 收音发哪个代表音？`,
        correctAnswer: correct,
        options: shuffleArray([correct, ...wrongs]),
        repLetter: correct,
        letter: l,
      });
    });
  });
  return shuffleArray(questions).slice(0, 10);
}

// ── Rules data (merged from phonetics/rules) ───────────────────

const ruleCategories = [
  {
    id: 'linking', label: '连读化',
    description: '当前音节有终声且后音节以元音开头时，终声移到后音节作初声',
    rules: [
      {
        id: 'r-01', title: '基本连读', titleKo: '연음',
        formulas: [
          { from: ['终声'], plus: '元音初声', to: '移至初声' },
        ],
        explanation: '终声(받침)遇到后面以元音开头的音节时，终声会移到下一个音节作为初声发音。这是韩语最基础的连读规则。',
        examples: [
          { original: '한국어', originalRead: '한구거', meaning: '韩国语' },
          { original: '밖에', originalRead: '바께', meaning: '外面' },
          { original: '책을', originalRead: '채글', meaning: '书(宾格)' },
          { original: '옷이', originalRead: '오시', meaning: '衣服(主格)' },
          { original: '꽃이', originalRead: '꼬치', meaning: '花(主格)' },
          { original: '집에', originalRead: '지베', meaning: '在家' },
        ],
      },
      {
        id: 'r-02', title: '复合终声连读', titleKo: '겹받침 연음',
        formulas: [
          { from: ['ㄺ'], plus: '元音', to: 'ㄱ移位' },
          { from: ['ㄼ'], plus: '元音', to: 'ㅂ移位' },
          { from: ['ㄻ'], plus: '元音', to: 'ㅁ移位' },
          { from: ['ㄵ'], plus: '元音', to: 'ㅈ移位' },
          { from: ['ㅄ'], plus: '元音', to: 'ㅅ移位' },
        ],
        explanation: '双终声(겹받침)中，连读时第二个终声移到后音节作初声，第一个终声的代表音留原位。',
        examples: [
          { original: '읽어요', originalRead: '일거요', meaning: '读' },
          { original: '없어요', originalRead: '업써요', meaning: '没有' },
          { original: '밟아요', originalRead: '발바요', meaning: '踩' },
          { original: '닭이', originalRead: '달기', meaning: '鸡(主格)' },
          { original: '삶을', originalRead: '살믈', meaning: '生活(宾格)' },
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
        formulas: [
          { from: ['ㄱ'], plus: 'ㅁ/ㄴ', to: '→ㅇ' },
          { from: ['ㄷ'], plus: 'ㅁ/ㄴ', to: '→ㄴ' },
          { from: ['ㅂ'], plus: 'ㅁ/ㄴ', to: '→ㅁ' },
        ],
        explanation: '终声ㄱ(ㄲ,ㅋ), ㄷ(ㅅ,ㅆ,ㅈ,ㅊ,ㅌ), ㅂ(ㅍ)遇到后面初声为ㅁ或ㄴ时，分别变为ㅇ, ㄴ, ㅁ。这是为了让发音更顺畅。',
        examples: [
          { original: '국물', originalRead: '궁물', meaning: '汤' },
          { original: '받는', originalRead: '반는', meaning: '接受(定语)' },
          { original: '앞문', originalRead: '암문', meaning: '前门' },
          { original: '학년', originalRead: '항년', meaning: '学年' },
          { original: '입문', originalRead: '임문', meaning: '入门' },
          { original: '있는', originalRead: '인는', meaning: '有(定语)' },
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
        formulas: [
          { from: ['ㄴ'], plus: 'ㄹ', to: '→ㄹ' },
          { from: ['ㄹ'], plus: 'ㄴ', to: '→ㄹ' },
        ],
        explanation: 'ㄴ和ㄹ相邻时，ㄴ会变成ㄹ。包括两种情况：ㄹ+ㄴ→ㄹ+ㄹ（如 실내→실래），ㄴ+ㄹ→ㄹ+ㄹ（如 신라→실라）。',
        examples: [
          { original: '신라', originalRead: '실라', meaning: '新罗' },
          { original: '실내', originalRead: '실래', meaning: '室内' },
          { original: '한라산', originalRead: '할라산', meaning: '汉拿山' },
          { original: '전라도', originalRead: '절라도', meaning: '全罗道' },
          { original: '연락', originalRead: '열락', meaning: '联络' },
          { original: '설날', originalRead: '설랄', meaning: '春节' },
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
        formulas: [
          { from: ['ㅎ'], plus: 'ㄱ', to: '→ㅋ' },
          { from: ['ㅎ'], plus: 'ㄷ', to: '→ㅌ' },
          { from: ['ㅎ'], plus: 'ㅂ', to: '→ㅍ' },
          { from: ['ㅎ'], plus: 'ㅈ', to: '→ㅊ' },
        ],
        explanation: 'ㅎ与松音(ㄱ,ㄷ,ㅂ,ㅈ)相遇时会结合成对应的送气音(ㅋ,ㅌ,ㅍ,ㅊ)。可以在同一个音节内（如 많→만ㅎ→만ㅌ），也可以跨音节（如 축하→추카）。',
        examples: [
          { original: '축하해요', originalRead: '추카해요', meaning: '祝贺' },
          { original: '많다', originalRead: '만타', meaning: '多' },
          { original: '입학', originalRead: '이팍', meaning: '入学' },
          { original: '잊혀지다', originalRead: '이텨지다', meaning: '被遗忘' },
          { original: '좋다', originalRead: '조타', meaning: '好' },
          { original: '넣다', originalRead: '너타', meaning: '放入' },
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
        formulas: [
          { from: ['ㄷ'], plus: '이', to: '→ㅈ' },
          { from: ['ㅌ'], plus: '이', to: '→ㅊ' },
        ],
        explanation: '终声ㄷ,ㅌ遇到后面以이开头的助词或后缀时，变成ㅈ,ㅊ。最常见的例子是"같이"读作"가치"、"굳이"读作"구지"。',
        examples: [
          { original: '같이', originalRead: '가치', meaning: '一起' },
          { original: '굳이', originalRead: '구지', meaning: '非要/偏偏' },
          { original: '해돋이', originalRead: '해도지', meaning: '日出' },
          { original: '붙이다', originalRead: '부치다', meaning: '粘贴' },
          { original: '미닫이', originalRead: '미다지', meaning: '推拉门' },
          { original: '땀받이', originalRead: '땀바지', meaning: '汗垫' },
        ],
      },
    ],
  },
  {
    id: 'tensification', label: '紧音化',
    description: '终声ㄱㄷㅂ后接ㄱㄷㅂㅅㅈ时，后者变为紧音ㄲㄸㅃㅆㅉ',
    rules: [
      {
        id: 'r-07', title: '紧音化', titleKo: '경음화',
        formulas: [
          { from: ['ㄱ/ㄷ/ㅂ'], plus: 'ㄱ', to: '→ㄲ' },
          { from: ['ㄱ/ㄷ/ㅂ'], plus: 'ㄷ', to: '→ㄸ' },
          { from: ['ㄱ/ㄷ/ㅂ'], plus: 'ㅂ', to: '→ㅃ' },
          { from: ['ㄱ/ㄷ/ㅂ'], plus: 'ㅅ', to: '→ㅆ' },
          { from: ['ㄱ/ㄷ/ㅂ'], plus: 'ㅈ', to: '→ㅉ' },
        ],
        explanation: '终声为ㄱ(ㄲ,ㅋ), ㄷ(ㅅ,ㅆ,ㅈ,ㅊ,ㅌ), ㅂ(ㅍ)时，后面的平音ㄱ,ㄷ,ㅂ,ㅅ,ㅈ变为紧音ㄲ,ㄸ,ㅃ,ㅆ,ㅉ。',
        examples: [
          { original: '학교', originalRead: '학꾜', meaning: '学校' },
          { original: '식당', originalRead: '식땅', meaning: '餐厅' },
          { original: '국밥', originalRead: '국빱', meaning: '汤饭' },
          { original: '합격', originalRead: '합껵', meaning: '合格' },
          { original: '작다', originalRead: '작따', meaning: '小' },
          { original: '입장', originalRead: '입짱', meaning: '入场' },
        ],
      },
    ],
  },
];

function generateRulesQuiz(categoryId?: string) {
  const allExamples = ruleCategories.flatMap((cat) =>
    cat.rules.flatMap((rule) =>
      rule.examples.map((ex) => ({
        ...ex,
        ruleTitle: rule.title,
        categoryId: cat.id,
        ruleExplanation: rule.explanation,
      }))
    )
  );

  const pool = categoryId
    ? allExamples.filter((e) => e.categoryId === categoryId)
    : allExamples;

  const selected = shuffleArray(pool).slice(0, Math.min(10, pool.length));

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
      ruleTitle: item.ruleTitle,
      explanation: item.ruleExplanation,
    };
  });
}

export default function PhoneticsPage() {
  const { lang } = useLang();
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeChecked, setWelcomeChecked] = useState(false);
  const [mainTab, setMainTab] = useState<MainTab>('progressive');

  useEffect(() => {
    setShowWelcome(!hasSeenWelcome());
    setWelcomeChecked(true);
  }, []);
  const [tab, setTab] = useState<Tab>('vowel');
  const [mode, setMode] = useState<Mode>('browse');
  const [quizType, setQuizType] = useState<QuizType>('letter-to-roman');
  const [quizState, setQuizState] = useState<{
    questions: ReturnType<typeof generateQuiz>;
    currentIdx: number;
    selectedAnswer: string | null;
    correctCount: number;
  } | null>(null);
  const [batchimQuizState, setBatchimQuizState] = useState<{
    questions: ReturnType<typeof generateBatchimQuiz>;
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
      questions: generateQuiz(currentData, quizType),
      currentIdx: 0,
      selectedAnswer: null,
      correctCount: 0,
    });
  };

  const startBatchimQuiz = () => {
    setBatchimQuizState({
      questions: generateBatchimQuiz(),
      currentIdx: 0,
      selectedAnswer: null,
      correctCount: 0,
    });
  };

  const handleBatchimQuizAnswer = (answer: string) => {
    if (!batchimQuizState || batchimQuizState.selectedAnswer !== null) return;
    const isCorrect = answer === batchimQuizState.questions[batchimQuizState.currentIdx].correctAnswer;
    if (isCorrect) playSuccess(); else playError();
    setBatchimQuizState({ ...batchimQuizState, selectedAnswer: answer, correctCount: batchimQuizState.correctCount + (isCorrect ? 1 : 0) });
  };

  const handleBatchimQuizNext = () => {
    if (!batchimQuizState) return;
    if (batchimQuizState.currentIdx + 1 >= batchimQuizState.questions.length) {
      setBatchimQuizState({ ...batchimQuizState, currentIdx: batchimQuizState.questions.length });
    } else {
      setBatchimQuizState({ ...batchimQuizState, currentIdx: batchimQuizState.currentIdx + 1, selectedAnswer: null });
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (!quizState || quizState.selectedAnswer !== null) return;
    const isCorrect = answer === quizState.questions[quizState.currentIdx].correctAnswer;
    if (isCorrect) playSuccess(); else playError();
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
      <div className="py-4 space-y-3 max-w-3xl mx-auto">
      <div>
        <Link href="/learning" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2">
          <ArrowLeft size={16} /> {t('phonetics.back_button', lang)}
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('phonetics.page_title', lang)}</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          {t('phonetics.page_subtitle', lang)}
        </p>
      </div>

      {/* Top-level tab switcher: 分步学习 | 字母表 | 连读规则 */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5 overflow-x-auto">
        <button
          onClick={() => handleMainTabChange('progressive')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'progressive'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {t('phonetics.main_tab_progressive', lang)}
        </button>
        <button
          onClick={() => handleMainTabChange('alphabet')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'alphabet'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {t('phonetics.main_tab_alphabet', lang)}
        </button>
        <button
          onClick={() => handleMainTabChange('rules')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'rules'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {t('phonetics.main_tab_rules', lang)}
        </button>
        <button
          onClick={() => handleMainTabChange('composer')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'composer'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {t('phonetics.main_tab_composer', lang)}
        </button>
        <button
          onClick={() => handleMainTabChange('practice')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            mainTab === 'practice'
              ? 'bg-[var(--pink-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {t('phonetics.main_tab_practice', lang)}
        </button>
      </div>

      {/* ── 分步学习 tab ── */}
      {mainTab === 'progressive' && <ProgressivePhonetics />}

      {/* ── 字母表 tab ── */}
      {mainTab === 'alphabet' && (
        <>
          {/* Sub-tab switcher */}
          <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5">
            {tabConfig.map((tc) => (
              <button
                key={tc.key}
                onClick={() => { setTab(tc.key); setMode('browse'); setQuizState(null); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === tc.key
                    ? 'bg-[var(--pink-primary)] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {t(tc.label, lang)}
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
                      {getSubtypeLabel(subtype, tab, lang)}
                      <span className="text-[var(--text-placeholder)] font-normal">({letters.length}个)</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {letters.map((letter) => (
                        <button
                          key={letter.id}
                          onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(letter)); }}
                          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center hover:border-[var(--pink-primary)]/30 hover:shadow-md hover:shadow-[var(--pink-primary)]/5 transition-all group"
                        >
                          <span className="text-3xl font-bold text-[var(--text-primary)] block mb-0.5" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                            {letter.letter}
                          </span>
                          <span className="text-xs text-[var(--pink-primary)] font-medium">{letter.romanization}</span>
                          <div className="flex items-center justify-center gap-1 mt-1.5 text-[13px] text-[var(--text-placeholder)]">
                            <Volume2 size={12} />
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
                      onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(letter)); }}
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
                            {t(subtypeKeys[letter.subtype] ?? letter.subtype, lang)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{letter.sound}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{letter.mnemonic}</p>
                    </div>
                    <button
                      onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(letter)); }}
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
                <p className="text-[var(--text-primary)] font-medium mb-1">{t('phonetics.quiz_cta_title', lang)}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{t('phonetics.quiz_cta_subtitle', lang)}</p>
                {/* Quiz type selector */}
                <div className="flex gap-2 mb-4">
                  {([
                    { key: 'letter-to-roman', labelKey: 'phonetics.quiz_type_letter_to_roman' },
                    { key: 'roman-to-letter', labelKey: 'phonetics.quiz_type_roman_to_letter' },
                    { key: 'listen-to-letter', labelKey: 'phonetics.quiz_type_listen_to_letter' },
                  ] as { key: QuizType; labelKey: string }[]).map((qt) => (
                    <button
                      key={qt.key}
                      onClick={() => setQuizType(qt.key)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                        quizType === qt.key
                          ? 'bg-[var(--pink-primary)] text-white'
                          : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'
                      }`}
                    >
                      {t(qt.labelKey, lang)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl font-medium transition-colors active:scale-95"
                >
                  <Play size={16} />
                  {t('phonetics.start_quiz_button', lang)}
                </button>
              </div>

              {/* Batchim classification quiz — only shown in batchim tab */}
              {tab === 'batchim' && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{t('phonetics.batchim_quiz_title', lang)}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">{t('phonetics.batchim_quiz_subtitle', lang)}</p>
                  </div>
                  {!batchimQuizState ? (
                    <button
                      onClick={startBatchimQuiz}
                      className="w-full py-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
                    >
                      {t('phonetics.batchim_quiz_start_button', lang)}
                    </button>
                  ) : batchimQuizState.currentIdx >= batchimQuizState.questions.length ? (
                    <div className="text-center space-y-3">
                      <p className="text-2xl font-bold text-[var(--pink-primary)]">{batchimQuizState.correctCount} / {batchimQuizState.questions.length}</p>
                      <button onClick={() => { setBatchimQuizState(null); }} className="px-5 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">{t('phonetics.quiz_retry_button', lang)}</button>
                    </div>
                  ) : (() => {
                    const bq = batchimQuizState.questions[batchimQuizState.currentIdx];
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                          <span>{t('phonetics.quiz_progress', lang).replace('{n}', String(batchimQuizState.currentIdx + 1)).replace('{total}', String(batchimQuizState.questions.length))}</span>
                          <span>{t('phonetics.quiz_correct_count', lang).replace('{n}', String(batchimQuizState.correctCount))}</span>
                        </div>
                        <div className="text-center py-3">
                          <span className="text-4xl font-bold text-[var(--text-primary)] bg-[var(--bg-input)] px-6 py-3 rounded-xl inline-block" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                            {bq.letter}
                          </span>
                          <button onClick={() => { unlockAudioContext(); playBatchimAudio(bq.letter); }} className="ml-2 p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] transition-colors inline-flex align-middle"><Volume2 size={16} /></button>
                          <p className="text-sm text-[var(--text-secondary)] mt-2">{bq.prompt}</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {bq.options.map((opt, i) => {
                            let cls = 'bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/40';
                            if (batchimQuizState.selectedAnswer !== null) {
                              if (opt === bq.correctAnswer) cls = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                              else if (opt === batchimQuizState.selectedAnswer) cls = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                              else cls = 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-40';
                            }
                            return (
                              <button key={i} onClick={() => handleBatchimQuizAnswer(opt)} disabled={batchimQuizState.selectedAnswer !== null}
                                className={`py-3 rounded-xl text-xl font-bold transition-all border ${cls} flex flex-col items-center gap-1`} style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                                {opt}
                                <Volume2 size={12} className="opacity-50" onClick={e => { e.stopPropagation(); unlockAudioContext(); playBatchimAudio(opt); }} />
                              </button>
                            );
                          })}
                        </div>
                        {batchimQuizState.selectedAnswer !== null && (
                          <div className={`rounded-xl px-3 py-2.5 text-xs ${
                            batchimQuizState.selectedAnswer === bq.correctAnswer
                              ? 'bg-[var(--mint-soft)]/10 text-[var(--text-primary)]'
                              : 'bg-[var(--color-danger)]/10 text-[var(--text-primary)]'
                          }`}>
                            {batchimQuizState.selectedAnswer === bq.correctAnswer
                              ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>「{bq.letter}」{t('phonetics.batchim_correct_explanation', lang).replace('{sound}', bq.correctAnswer)}</>
                              : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>「{bq.letter}」{t('phonetics.batchim_wrong_explanation', lang).replace('{correct}', bq.correctAnswer).replace('{wrong}', batchimQuizState.selectedAnswer)}</>
                            }
                          </div>
                        )}
                        {batchimQuizState.selectedAnswer !== null && (
                          <button onClick={handleBatchimQuizNext} className="w-full py-2.5 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">
                            {batchimQuizState.currentIdx + 1 >= batchimQuizState.questions.length ? t('phonetics.quiz_view_results_button', lang) : t('phonetics.quiz_next_button', lang)}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </>
          )}

          {mode === 'quiz' && quizState && (
            <>
              {/* Quiz header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {t('phonetics.quiz_progress', lang).replace('{n}', String(quizState.currentIdx + 1)).replace('{total}', String(quizState.questions.length))}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {t('phonetics.quiz_correct_label', lang)} <span className="text-[var(--mint-soft)] font-medium">{quizState.correctCount}</span>
                </span>
                <button
                  onClick={resetQuiz}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  {t('phonetics.quiz_exit_button', lang)}
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
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">{t('phonetics.quiz_complete_title', lang)}</h2>
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
                          {t('phonetics.quiz_complete_retry', lang)}
                        </button>
                        <button
                          onClick={resetQuiz}
                          className="px-5 py-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
                        >
                          {t('phonetics.quiz_back_to_browse', lang)}
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
                    {/* Listen question */}
                    {q.isListen && (
                      <div className="text-center space-y-3">
                        <button
                          onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }}
                          className="w-20 h-20 rounded-2xl bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 flex items-center justify-center mx-auto hover:bg-[var(--pink-primary)]/20 transition-colors"
                        >
                          <Volume2 size={32} className="text-[var(--pink-primary)]" />
                        </button>
                        <p className="text-xs text-[var(--text-muted)]">{t('phonetics.quiz_replay_hint', lang)}</p>
                      </div>
                    )}
                    {/* Letter display for sound questions */}
                    {!q.isListen && q.prompt.includes('字母') && (
                      <div className="text-center flex flex-col items-center gap-2">
                        <span className="text-5xl font-bold text-[var(--text-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                          {getQuizLetter(q.item)}
                        </span>
                        <button onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }} className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] transition-colors" title="听发音"><Volume2 size={18} /></button>
                      </div>
                    )}

                    {/* Sound display for romanization questions */}
                    {!q.isListen && q.prompt.includes('发音') && (
                      <div className="text-center">
                        <span className="text-2xl font-bold text-[var(--pink-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4">
                          [{getQuizRomanization(q.item)}]
                        </span>
                        <button
                          onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }}
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
                            className={`p-4 rounded-xl text-center font-medium transition-all ${btnStyle} flex flex-col items-center gap-1`}
                          >
                            <span className={q.prompt.includes('字母') ? 'text-lg' : 'text-2xl'} style={q.prompt.includes('发音') ? { fontFamily: "'system-ui', 'sans-serif'" } : undefined}>
                              {opt}
                            </span>
                            {!q.prompt.includes('字母') && (
                              <Volume2 size={12} className="opacity-50" onClick={e => { e.stopPropagation(); unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }} />
                            )}
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
                      <div className={`rounded-xl px-3 py-2.5 text-xs ${
                        quizState.selectedAnswer === q.correctAnswer
                          ? 'bg-[var(--mint-soft)]/10 text-[var(--text-primary)]'
                          : 'bg-[var(--color-danger)]/10 text-[var(--text-primary)]'
                      }`}>
                        {quizType === 'roman-to-letter' ? (
                          quizState.selectedAnswer === q.correctAnswer
                            ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>[{getQuizRomanization(q.item)}] 对应的字母是「{getQuizLetter(q.item)}」</>
                            : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>[{getQuizRomanization(q.item)}] 对应的字母是「{getQuizLetter(q.item)}」，不是「{quizState.selectedAnswer}」</>
                        ) : (
                          quizState.selectedAnswer === q.correctAnswer
                            ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>「{getQuizLetter(q.item)}」的读音是 [{getQuizRomanization(q.item)}]</>
                            : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>「{getQuizLetter(q.item)}」的读音是 [{getQuizRomanization(q.item)}]，不是 [{quizState.selectedAnswer}]</>
                        )}
                      </div>
                    )}
                    {quizState.selectedAnswer !== null && (
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }}
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] flex items-center gap-1"
                        >
                          <Volume2 size={12} />
                          {t('phonetics.quiz_relisten_button', lang)}
                        </button>
                        <button
                          onClick={handleQuizNext}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium transition-colors"
                        >
                          {t('phonetics.quiz_next_button', lang)}
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

      {/* ── 练习 tab ── */}
      {mainTab === 'practice' && <PracticeTab />}
    </div>
    </>
  );
}

function PracticeTab() {
  const { lang } = useLang();
  const allLetters = [...vowels, ...consonants, ...batchimSounds];

  type PracticeMode = 'letter-to-roman' | 'listen-to-letter' | 'rules' | null;
  const [activeMode, setActiveMode] = useState<PracticeMode>(null);

  // Alphabet quiz state
  const [alphaQ, setAlphaQ] = useState<ReturnType<typeof generateQuiz>>([]);
  const [alphaIdx, setAlphaIdx] = useState(0);
  const [alphaAnswer, setAlphaAnswer] = useState<string | null>(null);
  const [alphaCorrect, setAlphaCorrect] = useState(0);
  const [alphaFinished, setAlphaFinished] = useState(false);

  // Rules quiz state
  const [rulesQ, setRulesQ] = useState<ReturnType<typeof generateRulesQuiz>>([]);
  const [rulesIdx, setRulesIdx] = useState(0);
  const [rulesAnswer, setRulesAnswer] = useState<number | null>(null);
  const [rulesCorrect, setRulesCorrect] = useState(0);
  const [rulesFinished, setRulesFinished] = useState(false);

  const startMode = (mode: PracticeMode) => {
    setActiveMode(mode);
    if (mode === 'letter-to-roman' || mode === 'listen-to-letter') {
      setAlphaQ(generateQuiz(allLetters, mode as QuizType));
      setAlphaIdx(0); setAlphaAnswer(null); setAlphaCorrect(0); setAlphaFinished(false);
    } else if (mode === 'rules') {
      setRulesQ(generateRulesQuiz());
      setRulesIdx(0); setRulesAnswer(null); setRulesCorrect(0); setRulesFinished(false);
    }
  };

  const backToMenu = () => setActiveMode(null);

  const practiceCards = [
    { mode: 'letter-to-roman' as PracticeMode, icon: '👁', titleKey: 'phonetics.practice_card_letter_title', descKey: 'phonetics.practice_card_letter_desc' },
    { mode: 'listen-to-letter' as PracticeMode, icon: '🔊', titleKey: 'phonetics.practice_card_listen_title', descKey: 'phonetics.practice_card_listen_desc' },
    { mode: 'rules' as PracticeMode, icon: '🔗', titleKey: 'phonetics.practice_card_rules_title', descKey: 'phonetics.practice_card_rules_desc' },
  ];

  // ── 选题型界面 ──
  if (activeMode === null) {
    return (
      <div className="space-y-3 pb-24">
        <p className="text-sm text-[var(--text-secondary)]">{t('phonetics.practice_menu_hint', lang)}</p>
        {practiceCards.map((c) => (
          <div key={c.mode as string} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="font-medium text-[var(--text-primary)]">{t(c.titleKey, lang)}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{t(c.descKey, lang)}</p>
              </div>
            </div>
            <button
              onClick={() => startMode(c.mode)}
              className="shrink-0 px-4 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
            >
              {t('phonetics.practice_start_button', lang)}
            </button>
          </div>
        ))}
      </div>
    );
  }

  // ── 字母测验（看字/听音）──
  if (activeMode === 'letter-to-roman' || activeMode === 'listen-to-letter') {
    if (alphaFinished) {
      const acc = Math.round((alphaCorrect / alphaQ.length) * 100);
      return (
        <div className="space-y-4 pb-24">
          <button onClick={backToMenu} className="text-sm text-[var(--text-secondary)] flex items-center gap-1"><ArrowLeft size={14} /> 返回</button>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-3">
            <Trophy size={40} className="text-[var(--peach-soft)] mx-auto" />
            <p className="text-lg font-bold text-[var(--text-primary)]">{t('phonetics.practice_complete_title', lang)}</p>
            <p className="text-3xl font-extrabold text-[var(--pink-primary)]">{acc}%</p>
            <p className="text-sm text-[var(--text-secondary)]">{alphaCorrect} / {alphaQ.length} {t('phonetics.practice_correct_suffix', lang)}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => startMode(activeMode)} className="px-4 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">{t('phonetics.practice_retry_button', lang)}</button>
              <button onClick={backToMenu} className="px-4 py-2 bg-[var(--bg-input)] text-[var(--text-primary)] rounded-xl text-sm font-medium">{t('phonetics.practice_change_type_button', lang)}</button>
            </div>
          </div>
        </div>
      );
    }
    const q = alphaQ[alphaIdx];
    if (!q) return null;
    return (
      <div className="space-y-4 pb-24">
        <div className="flex items-center justify-between">
          <button onClick={backToMenu} className="text-sm text-[var(--text-secondary)] flex items-center gap-1"><ArrowLeft size={14} /> 返回</button>
          <span className="text-sm text-[var(--text-muted)]">{alphaIdx + 1} / {alphaQ.length}</span>
          <span className="text-xs text-[var(--text-muted)]">{t('phonetics.quiz_correct_count', lang).replace('{n}', String(alphaCorrect))}</span>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          {q.isListen ? (
            <div className="text-center space-y-2">
              <button onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }}
                className="w-20 h-20 rounded-2xl bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 flex items-center justify-center mx-auto hover:bg-[var(--pink-primary)]/20 transition-colors">
                <Volume2 size={32} className="text-[var(--pink-primary)]" />
              </button>
              <p className="text-xs text-[var(--text-muted)]">{t('phonetics.practice_click_play_hint', lang)}</p>
            </div>
          ) : q.prompt.includes('字母') ? (
            <div className="text-center flex flex-col items-center gap-2">
              <span className="text-5xl font-bold text-[var(--text-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {getQuizLetter(q.item)}
              </span>
              <button onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }} className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] transition-colors" title="听发音"><Volume2 size={18} /></button>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-2xl font-bold text-[var(--pink-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4">
                [{getQuizRomanization(q.item)}]
              </span>
              <div className="flex justify-center mt-2">
                <button onClick={() => { unlockAudioContext(); playPhoneticAudio(getSpeakText(q.item)); }} className="p-1.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors" title="听发音"><Volume2 size={15} /></button>
              </div>
            </div>
          )}
          <h3 className="text-base font-medium text-[var(--text-primary)] text-center">{q.prompt}</h3>
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              let cls = 'bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)]';
              if (alphaAnswer !== null) {
                if (opt === q.correctAnswer) cls = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                else if (opt === alphaAnswer) cls = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                else cls = 'bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-50';
              }
              return (
                <button key={i} onClick={() => {
                  if (alphaAnswer !== null) return;
                  const correct = opt === q.correctAnswer;
                  if (correct) playSuccess(); else playError();
                  setAlphaAnswer(opt);
                  setAlphaCorrect((p) => p + (correct ? 1 : 0));
                }} disabled={alphaAnswer !== null} className={`p-4 rounded-xl text-center font-medium transition-all ${cls} flex flex-col items-center gap-1`}>
                  <span className={q.isListen || !q.prompt.includes('字母') ? 'text-2xl' : 'text-lg'} style={!q.isListen && q.prompt.includes('字母') ? undefined : { fontFamily: "'system-ui', 'sans-serif'" }}>
                    {opt}
                  </span>
                  {!q.prompt.includes('字母') && (
                    <Volume2 size={12} className="opacity-50" onClick={e => { e.stopPropagation(); unlockAudioContext(); speakWord(opt, 0.7); }} />
                  )}
                </button>
              );
            })}
          </div>
          {alphaAnswer !== null && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              alphaAnswer === q.correctAnswer
                ? 'bg-[var(--mint-soft)]/10 text-[var(--text-primary)]'
                : 'bg-[var(--color-danger)]/10 text-[var(--text-primary)]'
            }`}>
              {q.isListen ? (
                alphaAnswer === q.correctAnswer
                  ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>这个音对应的字母是「{getQuizLetter(q.item)}」[{getQuizRomanization(q.item)}]</>
                  : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>正确字母是「{getQuizLetter(q.item)}」[{getQuizRomanization(q.item)}]，不是「{alphaAnswer}」</>
              ) : (
                alphaAnswer === q.correctAnswer
                  ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>「{getQuizLetter(q.item)}」的读音是 [{getQuizRomanization(q.item)}]</>
                  : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>「{getQuizLetter(q.item)}」的读音是 [{getQuizRomanization(q.item)}]，不是 [{alphaAnswer}]</>
              )}
            </div>
          )}
          {alphaAnswer !== null && (
            <button onClick={() => {
              if (alphaIdx + 1 >= alphaQ.length) { setAlphaFinished(true); }
              else { setAlphaIdx((p) => p + 1); setAlphaAnswer(null); }
            }} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">
              {alphaIdx + 1 >= alphaQ.length ? t('phonetics.practice_view_results', lang) : t('phonetics.practice_next', lang)}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── 连读发音 ──
  if (activeMode === 'rules') {
    if (rulesFinished) {
      const acc = Math.round((rulesCorrect / rulesQ.length) * 100);
      return (
        <div className="space-y-4 pb-24">
          <button onClick={backToMenu} className="text-sm text-[var(--text-secondary)] flex items-center gap-1"><ArrowLeft size={14} /> 返回</button>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-3">
            <Trophy size={40} className="text-[var(--peach-soft)] mx-auto" />
            <p className="text-lg font-bold text-[var(--text-primary)]">{t('phonetics.rules_practice_complete_title', lang)}</p>
            <p className="text-3xl font-extrabold text-[var(--pink-primary)]">{acc}%</p>
            <p className="text-sm text-[var(--text-secondary)]">{rulesCorrect} / {rulesQ.length} {t('phonetics.rules_practice_correct_suffix', lang)}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => startMode('rules')} className="px-4 py-2 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">{t('phonetics.rules_practice_retry', lang)}</button>
              <button onClick={backToMenu} className="px-4 py-2 bg-[var(--bg-input)] text-[var(--text-primary)] rounded-xl text-sm font-medium">{t('phonetics.rules_practice_change_type', lang)}</button>
            </div>
          </div>
        </div>
      );
    }
    const rq = rulesQ[rulesIdx];
    if (!rq) return null;
    return (
      <div className="space-y-4 pb-24">
        <div className="flex items-center justify-between">
          <button onClick={backToMenu} className="text-sm text-[var(--text-secondary)] flex items-center gap-1"><ArrowLeft size={14} /> 返回</button>
          <span className="text-sm text-[var(--text-muted)]">{rulesIdx + 1} / {rulesQ.length}</span>
          <span className="text-xs text-[var(--text-muted)]">{t('phonetics.rules_practice_correct_count', lang).replace('{n}', String(rulesCorrect))}</span>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          <div className="text-center">
            <span className="text-3xl font-bold text-[var(--text-primary)] inline-block bg-[var(--bg-input)] rounded-2xl px-8 py-4" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{rq.original}</span>
            <div className="flex justify-center mt-2">
              <button onClick={() => { unlockAudioContext(); speakWord(rq.original, 0.7); }} className="p-1.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors" title="听发音"><Volume2 size={15} /></button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{rq.meaning}</p>
          </div>
          <h3 className="text-base font-medium text-[var(--text-primary)] text-center">{rq.question}</h3>
          <div className="grid grid-cols-2 gap-3">
            {rq.options.map((opt, i) => {
              let cls = 'bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)]';
              if (rulesAnswer !== null) {
                if (i === rq.correct) cls = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                else if (i === rulesAnswer) cls = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                else cls = 'bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-50';
              }
              return (
                <button key={i} onClick={() => {
                  if (rulesAnswer !== null) return;
                  const correct = i === rq.correct;
                  if (correct) playSuccess(); else playError();
                  setRulesAnswer(i);
                  setRulesCorrect((p) => p + (correct ? 1 : 0));
                }} disabled={rulesAnswer !== null} className={`p-4 rounded-xl text-center font-medium transition-all ${cls}`}>
                  <span className="text-lg" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{opt}</span>
                  <div className="flex justify-center mt-1">
                    <span onClick={(e) => { e.stopPropagation(); unlockAudioContext(); speakWord(opt, 0.7); }} className="p-0.5 rounded bg-white/20 text-current opacity-60 hover:opacity-100 transition-opacity"><Volume2 size={12} /></span>
                  </div>
                </button>
              );
            })}
          </div>
          {rulesAnswer !== null && (
            <div className={`rounded-xl px-4 py-3 text-sm space-y-1.5 ${
              rulesAnswer === rq.correct
                ? 'bg-[var(--mint-soft)]/10 text-[var(--text-primary)]'
                : 'bg-[var(--color-danger)]/10 text-[var(--text-primary)]'
            }`}>
              <p>
                {rulesAnswer === rq.correct
                  ? <><span className="text-[var(--mint-soft)] font-medium">{t('phonetics.feedback_correct', lang)}</span>「{rq.original}」{t('phonetics.rules_quiz_reads_as', lang)}「{rq.correctRead}」</>
                  : <><span className="text-[var(--color-danger)] font-medium">{t('phonetics.feedback_wrong', lang)}</span>「{rq.original}」{t('phonetics.rules_quiz_correct_read_is', lang)}「{rq.correctRead}」</>
                }
              </p>
              {rq.explanation && (
                <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-1.5">
                  <span className="font-medium text-[var(--text-primary)]">{rq.ruleTitle}：</span>{rq.explanation}
                </p>
              )}
            </div>
          )}
          {rulesAnswer !== null && (
            <button onClick={() => {
              if (rulesIdx + 1 >= rulesQ.length) { setRulesFinished(true); }
              else { setRulesIdx((p) => p + 1); setRulesAnswer(null); }
            }} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">
              {rulesIdx + 1 >= rulesQ.length ? t('phonetics.practice_view_results', lang) : t('phonetics.practice_next', lang)}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

function RulesTab() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState(ruleCategories[0].id);
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set([ruleCategories[0].rules[0].id]));
  const [quizScope, setQuizScope] = useState<'current' | 'all'>('current');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(() => generateRulesQuiz(ruleCategories[0].id));

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const cat = ruleCategories.find((c) => c.id === tabId);
    if (cat) {
      setExpandedRules(new Set([cat.rules[0].id]));
      if (!quizStarted) setQuizQuestions(generateRulesQuiz(quizScope === 'current' ? tabId : undefined));
    }
  }, [quizStarted, quizScope]);

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
      playSuccess();
    } else {
      playError();
    }
  };

  const handleQuizNext = () => {
    if (quizIdx + 1 >= quizQuestions.length) {
      setQuizFinished(true);
    } else {
      setQuizIdx((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  const handleQuizRestart = () => {
    setQuizQuestions(generateRulesQuiz(quizScope === 'current' ? activeTab : undefined));
    setQuizFinished(false);
    setQuizStarted(false);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
  };

  const handleScopeChange = (scope: 'current' | 'all') => {
    setQuizScope(scope);
    if (!quizStarted) setQuizQuestions(generateRulesQuiz(scope === 'current' ? activeTab : undefined));
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Rules tab bar */}
      <div className="flex gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5 overflow-x-auto">
        {ruleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTabChange(cat.id)}
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
                  {!isExpanded && (
                    <div className="flex gap-1 mr-1">
                      {rule.examples.slice(0, 2).map((ex, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                          {ex.original}
                        </span>
                      ))}
                    </div>
                  )}
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
                  {/* Formula block */}
                  {rule.formulas && (
                    <div style={{ background: 'var(--color-pink-soft)', border: '1px solid #ff7fa8', borderRadius: 12, padding: '12px 16px' }}>
                      <p style={{ fontSize: 11, color: 'var(--color-pink-base)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {t('phonetics.rules_formula_label', lang)}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {rule.formulas.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            {f.from.map((ch, j) => (
                              <span key={j} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 36, height: 36, padding: '0 6px', background: '#fff', border: '1.5px solid #89756e', borderRadius: 8, fontSize: 16, fontWeight: 700, color: '#241917' }}>
                                {ch}
                              </span>
                            ))}
                            {f.plus && (
                              <>
                                <span style={{ fontSize: 14, color: '#89756e', fontWeight: 600 }}>+</span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 36, height: 36, padding: '0 6px', background: '#fff', border: '1.5px solid #89756e', borderRadius: 8, fontSize: 16, fontWeight: 700, color: '#241917' }}>
                                  {f.plus}
                                </span>
                              </>
                            )}
                            <span style={{ fontSize: 16, color: '#89756e' }}>→</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 36, height: 36, padding: '0 6px', background: 'var(--color-pink-base)', border: '1.5px solid #ff7fa8', borderRadius: 8, fontSize: 16, fontWeight: 700, color: '#fff' }}>
                              {f.to}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                      {t('phonetics.rules_examples_label', lang)}
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
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{ex.original}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakWord(ex.original, 0.7); }}
                              className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                              title="听原词"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <span className="text-[var(--text-muted)] text-xs">→</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-[var(--pink-primary)]">{ex.originalRead}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakWord(ex.originalRead, 0.7);
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
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[var(--text-primary)]">{ex.original}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); speakWord(ex.original, 0.7); }}
                                className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                                title="听原词"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                            <span className="text-xs text-[var(--text-muted)]">→</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[var(--pink-primary)]">{ex.originalRead}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakWord(ex.originalRead, 0.7);
                                }}
                                className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                                title="听发音"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-[var(--text-secondary)]">{t('phonetics.rules_example_meaning_label', lang)} {ex.meaning}</span>
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
        <span className="text-xs text-[var(--text-muted)] font-medium">{t('phonetics.rules_quiz_divider_label', lang)}</span>
        <div className="flex-1 h-px bg-[var(--pink-pale)]" />
      </div>

      {/* Quiz scope switcher */}
      {!quizStarted && (
        <div className="flex gap-2">
          <button
            onClick={() => handleScopeChange('current')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              quizScope === 'current'
                ? 'bg-[var(--pink-primary)] text-white'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {t('phonetics.rules_quiz_scope_current', lang)}
          </button>
          <button
            onClick={() => handleScopeChange('all')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              quizScope === 'all'
                ? 'bg-[var(--pink-primary)] text-white'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {t('phonetics.rules_quiz_scope_all', lang)}
          </button>
        </div>
      )}

      {/* Quiz section */}
      {quizFinished ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--pink-primary)]/15 to-[var(--purple-soft)]/15 flex items-center justify-center mx-auto border border-[var(--pink-pale)]">
            <Trophy size={28} className="text-[var(--pink-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t('phonetics.rules_quiz_complete_title', lang)}</h3>
            <p className="text-3xl font-extrabold text-[var(--pink-primary)] mt-2">{quizCorrect} / {quizQuestions.length}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {quizCorrect === quizQuestions.length ? t('phonetics.rules_quiz_perfect', lang) : quizCorrect >= Math.ceil(quizQuestions.length / 2) ? t('phonetics.rules_quiz_good', lang) : t('phonetics.rules_quiz_keep_trying', lang)}
            </p>
          </div>
          <button
            onClick={handleQuizRestart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-white rounded-2xl transition-all text-sm font-medium mx-auto shadow-lg shadow-[var(--purple-soft)]/15 active:scale-95"
          >
            {t('phonetics.rules_quiz_retry', lang)}
            <ArrowRight size={16} />
          </button>
        </div>
      ) : !quizStarted ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--pink-primary)]/15 to-[var(--purple-soft)]/15 flex items-center justify-center mx-auto border border-[var(--pink-pale)]">
            <Sparkles size={28} className="text-[var(--pink-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t('phonetics.rules_quiz_cta_title', lang)}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {t('phonetics.rules_quiz_cta_subtitle', lang)}
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
            {t('phonetics.rules_quiz_start_button', lang)}
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          {/* Quiz progress */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {t('phonetics.rules_quiz_progress', lang).replace('{n}', String(quizIdx + 1)).replace('{total}', String(quizQuestions.length))}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {t('phonetics.rules_quiz_correct_label', lang)} {quizCorrect}/{quizQuestions.length}
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
                {t('phonetics.rules_quiz_meaning_label', lang)} <span className="text-[var(--text-primary)] font-medium">{quizQuestions[quizIdx].meaning}</span>
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  {quizQuestions[quizIdx].original}
                </span>
                <button
                  onClick={() => speakWord(quizQuestions[quizIdx].original, 0.7)}
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
                          speakWord(opt, 0.7);
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
                  <div className="text-sm text-[var(--text-primary)] font-medium flex flex-wrap items-center justify-center gap-1">
                    <span>{t('phonetics.rules_quiz_correct_msg', lang)}</span>
                    <span style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{quizQuestions[quizIdx].original}</span>
                    <button onClick={() => { unlockAudioContext(); speakWord(quizQuestions[quizIdx].original, 0.7); }} className="p-0.5 rounded text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"><Volume2 size={13} /></button>
                    <span>{t('phonetics.rules_quiz_reads_as', lang)}</span>
                    <span style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{quizQuestions[quizIdx].correctRead}</span>
                    <button onClick={() => { unlockAudioContext(); speakWord(quizQuestions[quizIdx].correctRead, 0.7); }} className="p-0.5 rounded text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"><Volume2 size={13} /></button>
                  </div>
                ) : (
                  <div className="text-sm text-[var(--text-primary)] font-medium flex flex-wrap items-center justify-center gap-1">
                    <span>{t('phonetics.rules_quiz_wrong_msg', lang)}</span>
                    <span style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{quizQuestions[quizIdx].original}</span>
                    <button onClick={() => { unlockAudioContext(); speakWord(quizQuestions[quizIdx].original, 0.7); }} className="p-0.5 rounded text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"><Volume2 size={13} /></button>
                    <span>{t('phonetics.rules_quiz_correct_read_is', lang)}</span>
                    <span style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{quizQuestions[quizIdx].correctRead}</span>
                    <button onClick={() => { unlockAudioContext(); speakWord(quizQuestions[quizIdx].correctRead, 0.7); }} className="p-0.5 rounded text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors"><Volume2 size={13} /></button>
                  </div>
                )}
              </div>
            )}

            {/* Next button */}
            {quizAnswer !== null && (
              <button
                onClick={handleQuizNext}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-2xl transition-colors font-medium active:scale-95"
              >
                {quizIdx + 1 >= quizQuestions.length ? t('phonetics.rules_quiz_view_results', lang) : t('phonetics.rules_quiz_next', lang)}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
