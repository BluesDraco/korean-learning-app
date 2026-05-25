'use client';

import { useState } from 'react';
import { PenLine, Check, X, Lightbulb, RefreshCw, Sparkles, BookOpen, Clock, ChevronDown, ChevronUp, Star, History, Trophy } from 'lucide-react';

type WritingMode = 'imitation' | 'free' | 'cloze' | 'history';

interface HistoryRecord {
  id: string;
  date: string;
  mode: string;
  modeLabel: string;
  score: string;
  snippet: string;
  details: any;
}

const MOCK_HISTORY: HistoryRecord[] = [
  {
    id: 'h1',
    date: '2026-05-22 15:30',
    mode: 'imitation',
    modeLabel: '仿写',
    score: '5/8 正确',
    snippet: '저는 학생입니다.',
    details: { type: 'imitation', prompt: '我是学生。', userAnswer: '저는 학생입니다.', modelAnswer: '저는 학생입니다.', correct: true, grammarPoint: 'N은/는 N입니다 — 名词谓语句' },
  },
  {
    id: 'h2',
    date: '2026-05-21 10:15',
    mode: 'free',
    modeLabel: '自由写',
    score: '78分',
    snippet: '안녕하세요. 저는 20살입니다. 취미는 운동입니다. 한국어를 열심히 공부하고 있습니다.',
    details: { type: 'free', topic: '自我介绍', text: '안녕하세요. 저는 20살입니다. 취미는 운동입니다. 한국어를 열심히 공부하고 있습니다.', scores: { vocabulary: 75, grammar: 80, naturalness: 78, overall: 78 } },
  },
  {
    id: 'h3',
    date: '2026-05-20 18:45',
    mode: 'cloze',
    modeLabel: '填空',
    score: '6/8 正确',
    snippet: '저는 학생입니다, 책을 읽어요, 학교에 가요...',
    details: { type: 'cloze', total: 8, correct: 6, percentage: 75 },
  },
  {
    id: 'h4',
    date: '2026-05-19 09:00',
    mode: 'imitation',
    modeLabel: '仿写',
    score: '3/8 正确',
    snippet: '오늘 날씨가 좋아요.',
    details: { type: 'imitation', prompt: '今天天气很好。', userAnswer: '오늘 날씨가 조아요.', modelAnswer: '오늘 날씨가 좋아요.', correct: false, grammarPoint: 'N이/가 A아요/어요 — 形容词谓语句' },
  },
  {
    id: 'h5',
    date: '2026-05-17 14:20',
    mode: 'free',
    modeLabel: '自由写',
    score: '88分',
    snippet: '지난 주말에 친구랑 같이 영화를 봤어요. 영화가 아주 재미있었어요...',
    details: { type: 'free', topic: '上周末', text: '지난 주말에 친구랑 같이 영화를 봤어요. 영화가 아주 재미있었어요. 그리고 맛있는 저녁도 먹었어요.', scores: { vocabulary: 85, grammar: 90, naturalness: 88, overall: 88 } },
  },
];

const modeConfig: { key: WritingMode; label: string; icon: React.ComponentType<{ size?: number }>; desc: string }[] = [
  { key: 'imitation', label: '仿写', icon: PenLine, desc: '看中文写韩语' },
  { key: 'free', label: '自由写', icon: Sparkles, desc: '话题写作' },
  { key: 'cloze', label: '填空', icon: BookOpen, desc: '补全助词/语尾' },
  { key: 'history', label: '写作历史', icon: History, desc: '查看记录' },
];

// Imitation writing prompts
const imitationPrompts = [
  { zh: '我是学生。', ko: '저는 학생입니다.', hint: '저는 ~ 입니다 (我是~)', grammarPoint: 'N은/는 N입니다 — 名词谓语句，表示"~是~"' },
  { zh: '今天天气很好。', ko: '오늘 날씨가 좋아요.', hint: '날씨가 좋아요 (天气好)', grammarPoint: 'N이/가 A아요/어요 — 形容词谓语句，描述主语状态' },
  { zh: '我想吃韩国料理。', ko: '한국 요리를 먹고 싶어요.', hint: '~고 싶어요 (想做~)', grammarPoint: 'V고 싶다 — 表示"想做~"，用于表达愿望' },
  { zh: '昨天看了电影。', ko: '어제 영화를 봤어요.', hint: '~았/었어요 (过去时)', grammarPoint: 'V았/었어요 — 过去时制词尾，表示动作已完成' },
  { zh: '请给我一杯咖啡。', ko: '커피 한 잔 주세요.', hint: '~ 주세요 (请给~)', grammarPoint: 'V(으)세요 — 命令句，表示礼貌的请求或命令' },
  { zh: '我在学韩语。', ko: '한국어를 배우고 있어요.', hint: '~고 있어요 (正在做~)', grammarPoint: 'V고 있다 — 进行时，表示动作正在进行中' },
  { zh: '这里可以拍照吗？', ko: '여기서 사진 찍어도 돼요?', hint: '~아/어도 돼요? (可以做~吗?)', grammarPoint: 'V아/어도 되다 — 表示允许，相当于"可以做~"' },
  { zh: '比想象中更难。', ko: '생각보다 더 어려워요.', hint: '~보다 더 (比~更)', grammarPoint: 'N보다 — 比较助词，表示"比~更~"' },
];

// Free writing topics
const freeTopics = [
  { title: '自我介绍', titleKo: '자기소개', prompt: '请用韩语写一段自我介绍（3-5句话），包括你的名字、职业/身份、兴趣爱好。', keywords: ['이름', '직업', '취미'] },
  { title: '我的一天', titleKo: '하루 일과', prompt: '描述你的一天。从早上起床到晚上睡觉，你通常会做些什么？', keywords: ['아침', '점심', '저녁', '공부', '운동'] },
  { title: '最喜欢的食物', titleKo: '좋아하는 음식', prompt: '说说你最喜欢的食物。是什么？为什么喜欢？多久吃一次？', keywords: ['음식', '맛있다', '좋아하다', '자주'] },
  { title: '上周末', titleKo: '지난 주말', prompt: '描述你上周末做了什么。去了哪里？见了谁？做了哪些有趣的事？', keywords: ['주말', '친구', '재미있다', '시간'] },
  { title: '未来计划', titleKo: '앞으로의 계획', prompt: '你接下来的计划是什么？想学什么？想去哪里旅行？有什么目标？', keywords: ['계획', '여행', '공부', '목표', '미래'] },
];

// Cloze (fill-in-the-blank) exercises
const clozeExercises = [
  {
    sentence: '저___ 학생입니다.',
    options: ['는', '가', '를', '도'],
    correct: 0,
    explanation: '主语"저"后面需要用主格助词"는"（은/는表示主题）。',
    full: '저는 학생입니다.',
    meaning: '我是学生。',
  },
  {
    sentence: '책___ 읽어요.',
    options: ['을', '이', '에', '와'],
    correct: 0,
    explanation: '"책"是宾语，需要用宾格助词"을/를"。',
    full: '책을 읽어요.',
    meaning: '读书。',
  },
  {
    sentence: '학교___ 가요.',
    options: ['에', '을', '는', '도'],
    correct: 0,
    explanation: '表示目的地时用助词"에"。',
    full: '학교에 가요.',
    meaning: '去学校。',
  },
  {
    sentence: '친구___ 같이 먹었어요.',
    options: ['와', '을', '에', '보다'],
    correct: 0,
    explanation: '表示"和...一起"用"와/과"。',
    full: '친구와 같이 먹었어요.',
    meaning: '和朋友一起吃了。',
  },
  {
    sentence: '날씨___ 좋아요.',
    options: ['가', '는', '을', '에'],
    correct: 0,
    explanation: '"날씨"是主语，需要用主格助词"이/가"。',
    full: '날씨가 좋아요.',
    meaning: '天气好。',
  },
  {
    sentence: '도서관___ 공부해요.',
    options: ['에서', '에', '을', '와'],
    correct: 0,
    explanation: '表示动作进行的场所用"에서"。',
    full: '도서관에서 공부해요.',
    meaning: '在图书馆学习。',
  },
  {
    sentence: '저___ 선생님입니다.',
    options: ['도', '만', '의', '보다'],
    correct: 0,
    explanation: '"도"表示"也"。句意为"我也是老师"。',
    full: '저도 선생님입니다.',
    meaning: '我也是老师。',
  },
  {
    sentence: '언니___ 예뻐요.',
    options: ['보다', '가', '만', '도'],
    correct: 0,
    explanation: '"보다"用于比较，表示"比..."。',
    full: '언니보다 예뻐요.',
    meaning: '比姐姐漂亮。',
  },
];

// Character diff helper
function getCharDiff(user: string, answer: string) {
  const result: { char: string; status: 'correct' | 'incorrect' | 'extra' | 'missing' }[] = [];
  const maxLen = Math.max(user.length, answer.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < user.length && i < answer.length) {
      result.push({ char: user[i] || ' ', status: user[i] === answer[i] ? 'correct' : 'incorrect' });
    } else if (i < user.length) {
      result.push({ char: user[i], status: 'extra' });
    } else {
      result.push({ char: answer[i], status: 'missing' });
    }
  }
  return result;
}

// Generate mock scores for free writing
function generateMockScores() {
  const vocabulary = Math.floor(Math.random() * 41) + 60; // 60-100
  const grammar = Math.floor(Math.random() * 41) + 60;
  const naturalness = Math.floor(Math.random() * 41) + 60;
  const overall = Math.round((vocabulary + grammar + naturalness) / 3);
  return { vocabulary, grammar, naturalness, overall };
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-[var(--mint-soft)]';
  if (score >= 60) return 'text-[var(--peach-soft)]';
  return 'text-[var(--color-danger)]';
}

function getScoreBgColor(score: number) {
  if (score >= 80) return 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/20';
  if (score >= 60) return 'bg-[var(--peach-soft)]/10 border-[var(--peach-soft)]/20';
  return 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/20';
}

export default function WritingPage() {
  const [mode, setMode] = useState<WritingMode>('imitation');
  const [history, setHistory] = useState<HistoryRecord[]>(MOCK_HISTORY);

  const addRecord = (record: Omit<HistoryRecord, 'id' | 'date'>) => {
    const newRecord: HistoryRecord = {
      ...record,
      id: `h${Date.now()}`,
      date: new Date().toLocaleString('zh-CN', { hour12: false }),
    };
    setHistory(prev => [newRecord, ...prev]);
  };

  return (
    <div className="py-4 space-y-3">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">写作练习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">三种模式，从仿写到自由表达，逐步提升韩语写作能力</p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5 overflow-x-auto">
        {modeConfig.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                mode === m.key
                  ? 'bg-[var(--pink-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <Icon size={15} />
              {m.label}
            </button>
          );
        })}
      </div>

      {mode === 'imitation' && <ImitationMode onAddRecord={addRecord} />}
      {mode === 'free' && <FreeWritingMode onAddRecord={addRecord} />}
      {mode === 'cloze' && <ClozeMode onAddRecord={addRecord} />}
      {mode === 'history' && <HistoryMode records={history} />}
    </div>
  );
}

function ImitationMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const prompt = imitationPrompts[currentIdx];
  const userClean = userInput.trim().replace(/\s/g, '');
  const answerClean = prompt.ko.replace(/\s/g, '');
  const isCorrect = userClean === answerClean;
  const charDiff = submitted ? getCharDiff(userInput.trim(), prompt.ko) : null;

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    setSubmitted(true);
    const correct = userClean === answerClean;
    if (correct) setScore((s) => s + 1);

    onAddRecord({
      mode: 'imitation',
      modeLabel: '仿写',
      score: correct ? '✓ 正确' : '✗ 错误',
      snippet: userInput.trim().slice(0, 50),
      details: {
        type: 'imitation',
        prompt: prompt.zh,
        userAnswer: userInput.trim(),
        modelAnswer: prompt.ko,
        correct,
        grammarPoint: prompt.grammarPoint,
      },
    });
  };

  const handleNext = () => {
    if (currentIdx + 1 >= imitationPrompts.length) {
      setCurrentIdx(0);
      setScore(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
    setUserInput('');
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">第 {currentIdx + 1} / {imitationPrompts.length} 题</span>
        <span className="text-[var(--text-muted)]">正确: <span className="text-[var(--mint-soft)] font-medium">{score}</span></span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
        {/* Chinese prompt */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] mb-2">请将以下中文翻译为韩语</p>
          <p className="text-xl font-bold text-[var(--text-primary)]">{prompt.zh}</p>
        </div>

        {/* Hint */}
        <div className="flex items-start gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3">
          <Lightbulb size={16} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-[var(--purple-soft)] font-medium">提示</p>
            <p className="text-sm text-[var(--text-secondary)]">{prompt.hint}</p>
          </div>
        </div>

        {/* Input */}
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={submitted}
          placeholder="在这里输入韩语..."
          rows={2}
          className="w-full bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] text-base text-center resize-none focus:outline-none focus:border-[var(--pink-primary)]/50"
          style={{ fontFamily: "'system-ui', 'sans-serif'" }}
        />

        {/* Action button */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl font-medium transition-colors"
          >
            提交
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            下一题
            <RefreshCw size={14} />
          </button>
        )}

        {/* 批改反馈 */}
        {submitted && (
          <div className="space-y-4 animate-fade-in border-t border-[var(--border-color)] pt-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Check size={16} className="text-[var(--pink-primary)]" />
              批改反馈
            </h3>

            {/* 你的答案 */}
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1.5">你的答案</p>
              <p className="text-base text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {userInput.trim() || '(未作答)'}
              </p>
            </div>

            {/* 标准答案 */}
            <div className="bg-[var(--mint-soft)]/5 border border-[var(--mint-soft)]/15 rounded-xl p-4">
              <p className="text-xs text-[var(--mint-soft)] mb-1.5 font-medium">标准答案</p>
              <p className="text-base text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {prompt.ko}
              </p>
            </div>

            {/* 错误标注 */}
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-2 font-medium">错误标注</p>
              {isCorrect ? (
                <p className="text-sm text-[var(--mint-soft)]">完全没有错误，非常好！</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {charDiff?.map((d, i) => (
                      <span
                        key={i}
                        className={`inline-block px-1 py-0.5 rounded text-sm font-medium ${
                          d.status === 'correct'
                            ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]'
                            : d.status === 'incorrect'
                            ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] line-through'
                            : d.status === 'extra'
                            ? 'bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]'
                            : 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
                        }`}
                        style={{ fontFamily: "'system-ui', 'sans-serif'" }}
                        title={
                          d.status === 'correct' ? '正确' :
                          d.status === 'incorrect' ? '错误字符' :
                          d.status === 'extra' ? '多余字符' : '缺失字符'
                        }
                      >
                        {d.char}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--mint-soft)]/40" /> 正确
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--color-danger)]/40" /> 错误
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--peach-soft)]/40" /> 多余
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--purple-soft)]/40" /> 缺失
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 语法说明 */}
            <div className="flex items-start gap-2 bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-4">
              <BookOpen size={16} className="text-[var(--pink-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[var(--pink-primary)] font-medium mb-1">语法说明</p>
                <p className="text-sm text-[var(--text-secondary)]">{prompt.grammarPoint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FreeWritingMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);
  const [scored, setScored] = useState(false);
  const [scores, setScores] = useState<{ vocabulary: number; grammar: number; naturalness: number; overall: number } | null>(null);

  const topic = freeTopics[selectedTopic];

  const updateStats = (value: string) => {
    setText(value);
    const words = value.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setUniqueWords(new Set(words.map((w) => w.replace(/[.,!?~]$/, ''))).size);
  };

  const handleTopicChange = (idx: number) => {
    setSelectedTopic(idx);
    setText('');
    setWordCount(0);
    setUniqueWords(0);
    setScored(false);
    setScores(null);
  };

  const handleScore = () => {
    const mockScores = generateMockScores();
    setScores(mockScores);
    setScored(true);

    onAddRecord({
      mode: 'free',
      modeLabel: '自由写',
      score: `${mockScores.overall}分`,
      snippet: text.trim().slice(0, 50),
      details: {
        type: 'free',
        topic: topic.title,
        text: text.trim(),
        scores: mockScores,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Topic selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {freeTopics.map((t, i) => (
          <button
            key={i}
            onClick={() => handleTopicChange(i)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
              i === selectedTopic
                ? 'bg-[var(--pink-primary)] text-white font-medium'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Topic card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{topic.titleKo}</span>
          <span className="text-[var(--text-primary)] font-medium">{topic.title}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{topic.prompt}</p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-[var(--text-muted)]">关键词：</span>
          {topic.keywords.map((kw) => (
            <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--pink-primary)]">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Writing area */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <textarea
          value={text}
          onChange={(e) => updateStats(e.target.value)}
          placeholder="在这里自由书写韩语..."
          rows={8}
          className="w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] text-sm resize-none focus:outline-none"
          style={{ fontFamily: "'system-ui', 'sans-serif'" }}
        />
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
          <span>字数: {wordCount}</span>
          <span>不重复词: {uniqueWords}</span>
          <span>韩语水平: {wordCount === 0 ? '-' : uniqueWords >= 20 ? '丰富' : uniqueWords >= 10 ? '良好' : '基础'}</span>
        </div>
      </div>

      {/* Scoring section */}
      <div className="space-y-3">
        {!scored ? (
          <button
            onClick={handleScore}
            disabled={!text.trim()}
            className="w-full py-3 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] hover:from-[var(--pink-primary)] hover:to-[var(--purple-soft)] disabled:from-[var(--bg-accent)] disabled:to-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            提交评分
          </button>
        ) : scores && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Star size={16} className="text-[var(--peach-soft)]" />
              写作评分
            </h3>

            {/* Score bars */}
            <div className="space-y-3">
              {[
                { label: '词汇多样性', key: 'vocabulary' as const },
                { label: '语法正确性', key: 'grammar' as const },
                { label: '表达自然度', key: 'naturalness' as const },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                    <span className={`text-sm font-bold ${getScoreColor(scores[item.key])}`}>
                      {scores[item.key]}/100
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${scores[item.key]}%`,
                        backgroundColor: scores[item.key] >= 80 ? 'var(--mint-soft)' : scores[item.key] >= 60 ? 'var(--peach-soft)' : 'var(--color-danger)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Overall score */}
            <div className={`rounded-xl p-4 border ${getScoreBgColor(scores.overall)}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-secondary)]">综合评分</span>
                <span className={`text-2xl font-bold ${getScoreColor(scores.overall)}`}>
                  {scores.overall}/100
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {scores.overall >= 80 ? '写得很好！继续保持！' :
                 scores.overall >= 60 ? '还有提升空间，加油！' : '需要多加练习，别灰心！'}
              </p>
            </div>

            {/* XP reward notice */}
            {scores.overall >= 80 && (
              <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                <Trophy size={24} className="text-[var(--peach-soft)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--peach-soft)]">已获得XP</p>
                  <p className="text-xs text-[var(--text-secondary)]">写作评分达到80分以上，经验值 +50</p>
                </div>
                <span className="ml-auto text-lg font-bold text-[var(--peach-soft)]">+50 XP</span>
              </div>
            )}

            {/* Re-score button */}
            <button
              onClick={handleScore}
              className="w-full py-2.5 bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--purple-soft)]/30 text-[var(--text-secondary)] rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              重新评分
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-2xl p-4">
        <h4 className="text-sm font-medium text-[var(--purple-soft)] mb-2 flex items-center gap-1.5">
          <Lightbulb size={14} />
          写作小贴士
        </h4>
        <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
          <li>· 先用简单句写出大意，再逐步丰富</li>
          <li>· 不确定的单词可以先用中文标注，写完再查</li>
          <li>· 写完大声朗读一遍，检查流畅度</li>
          <li>· 尝试使用最近学到的语法点和单词</li>
        </ul>
      </div>
    </div>
  );
}

function ClozeMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const exercise = clozeExercises[currentIdx];
  const isLastQuestion = currentIdx + 1 >= clozeExercises.length;
  const percentage = clozeExercises.length > 0 ? Math.round((score / clozeExercises.length) * 100) : 0;
  const xpQualified = percentage >= 80;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === exercise.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Add record and show completion
      const finalScore = score + (selectedAnswer === exercise.correct && !answered ? 0 : 0);
      // We already incremented score in handleSelect
      const finalPercentage = Math.round((score / clozeExercises.length) * 100);

      onAddRecord({
        mode: 'cloze',
        modeLabel: '填空',
        score: `${score}/${clozeExercises.length} 正确`,
        snippet: clozeExercises.map(e => e.full).join(', ').slice(0, 50),
        details: {
          type: 'cloze',
          total: clozeExercises.length,
          correct: score,
          percentage: finalPercentage,
        },
      });

      if (xpQualified) {
        setAllDone(true);
      } else {
        // Reset for retry
        setCurrentIdx(0);
        setScore(0);
        setSelectedAnswer(null);
        setAnswered(false);
      }
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const resetAll = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAllDone(false);
  };

  // XP completion screen
  if (allDone) {
    return (
      <div className="space-y-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
          <Trophy size={56} className="text-[var(--peach-soft)] mx-auto" />
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">全部完成！</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              正确 {score} / {clozeExercises.length} ({percentage}%)
            </p>
          </div>

          {/* XP reward */}
          {xpQualified && (
            <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--peach-soft)]/20 rounded-2xl p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={24} className="text-[var(--peach-soft)]" />
                <span className="text-lg font-bold text-[var(--peach-soft)]">已获得XP</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                正确率达到 {percentage}%，表现优秀！经验值已到账
              </p>
              <span className="inline-block text-3xl font-bold text-[var(--peach-soft)]">+50 XP</span>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetAll}
              className="px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium transition-colors"
            >
              再来一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">第 {currentIdx + 1} / {clozeExercises.length} 题</span>
        <span className="text-[var(--text-muted)]">正确: <span className="text-[var(--mint-soft)] font-medium">{score}</span></span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
        {/* Sentence with blank */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] mb-3">选择正确的助词/语尾填入空格</p>
          <p className="text-2xl text-[var(--text-primary)] font-medium" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
            {exercise.sentence.split('___').map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <span className={`inline-block min-w-[3rem] mx-1 border-b-2 ${
                    answered
                      ? selectedAnswer === exercise.correct
                        ? 'border-[var(--mint-soft)] text-[var(--mint-soft)]'
                        : 'border-[var(--color-danger)] text-[var(--color-danger)]'
                      : 'border-[var(--pink-primary)]'
                  }`}>
                    {answered ? exercise.options[selectedAnswer!] : '　'}
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {exercise.options.map((opt, i) => {
            let btnStyle = 'bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-primary)]';
            if (answered) {
              if (i === exercise.correct) {
                btnStyle = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
              } else if (i === selectedAnswer) {
                btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
              } else {
                btnStyle = 'bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-50';
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`p-4 rounded-xl text-center text-xl font-bold transition-all ${btnStyle}`}
                style={{ fontFamily: "'system-ui', 'sans-serif'" }}
              >
                {opt}
                {answered && i === exercise.correct && <Check size={16} className="inline ml-1 text-[var(--mint-soft)]" />}
                {answered && i === selectedAnswer && i !== exercise.correct && <X size={16} className="inline ml-1 text-[var(--color-danger)]" />}
              </button>
            );
          })}
        </div>

        {/* Explanation after answering */}
        {answered && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-[var(--bg-card-hover)] rounded-xl p-4">
              <p className="text-sm text-[var(--text-primary)] font-medium" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {exercise.full}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{exercise.meaning}</p>
            </div>
            <div className="flex items-start gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3">
              <Lightbulb size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)]">{exercise.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLastQuestion ? '完成' : '下一题'}
              <RefreshCw size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryMode({ records }: { records: HistoryRecord[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getModeBadgeColor = (mode: string) => {
    switch (mode) {
      case 'imitation': return 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]';
      case 'free': return 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]';
      case 'cloze': return 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]';
      default: return 'bg-[var(--bg-accent)] text-[var(--text-secondary)]';
    }
  };

  const renderDetails = (record: HistoryRecord) => {
    const d = record.details;
    if (!d) return <p className="text-sm text-[var(--text-muted)]">无详细信息</p>;

    switch (d.type) {
      case 'imitation':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">中文提示</p>
              <p className="text-sm text-[var(--text-primary)]">{d.prompt}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">你的答案</p>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.userAnswer}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">标准答案</p>
              <p className="text-sm text-[var(--mint-soft)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.modelAnswer}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${d.correct ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
                {d.correct ? '正确' : '错误'}
              </span>
            </div>
            {d.grammarPoint && (
              <div className="bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-3">
                <p className="text-xs text-[var(--pink-primary)] font-medium mb-1">相关语法</p>
                <p className="text-xs text-[var(--text-secondary)]">{d.grammarPoint}</p>
              </div>
            )}
          </div>
        );
      case 'free':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">写作话题</p>
              <p className="text-sm text-[var(--text-primary)] font-medium">{d.topic}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">写作内容</p>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.text}
              </p>
            </div>
            {d.scores && (
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-2">评分详情</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '词汇多样性', value: d.scores.vocabulary },
                    { label: '语法正确性', value: d.scores.grammar },
                    { label: '表达自然度', value: d.scores.naturalness },
                  ].map((s) => (
                    <div key={s.label} className="bg-[var(--bg-input)] rounded-lg p-2 text-center">
                      <p className="text-[13px] text-[var(--text-muted)]">{s.label}</p>
                      <p className={`text-sm font-bold ${getScoreColor(s.value)}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between bg-[var(--bg-input)] rounded-lg p-3">
                  <span className="text-sm text-[var(--text-secondary)]">综合评分</span>
                  <span className={`text-lg font-bold ${getScoreColor(d.scores.overall)}`}>
                    {d.scores.overall}/100
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      case 'cloze':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">完成情况</p>
              <p className="text-sm text-[var(--text-primary)]">
                共 {d.total} 题，正确 {d.correct} 题
              </p>
            </div>
            <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: `${d.percentage || 0}%`,
                  backgroundColor: (d.percentage || 0) >= 80 ? 'var(--mint-soft)' : (d.percentage || 0) >= 60 ? 'var(--peach-soft)' : 'var(--color-danger)',
                }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              正确率: <span className={getScoreColor(d.percentage || 0)}>{d.percentage || 0}%</span>
            </p>
            {(d.percentage || 0) >= 80 && (
              <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-3 flex items-center gap-2">
                <Trophy size={18} className="text-[var(--peach-soft)]" />
                <span className="text-sm font-bold text-[var(--peach-soft)]">已获得 +50 XP</span>
              </div>
            )}
          </div>
        );
      default:
        return <p className="text-sm text-[var(--text-muted)]">无详细信息</p>;
    }
  };

  return (
    <div className="space-y-4">
      {records.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
          <p className="text-sm text-[var(--text-secondary)]">暂无写作记录</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">完成写作练习后，记录将显示在这里</p>
        </div>
      ) : (
        records.map((record) => (
          <div
            key={record.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all"
          >
            {/* Card header */}
            <button
              onClick={() => toggleExpand(record.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                record.mode === 'imitation' ? 'bg-[var(--pink-primary)]/10' :
                record.mode === 'free' ? 'bg-[var(--purple-soft)]/10' : 'bg-[var(--mint-soft)]/10'
              }`}>
                {record.mode === 'imitation' ? <PenLine size={18} className="text-[var(--pink-primary)]" /> :
                 record.mode === 'free' ? <Sparkles size={18} className="text-[var(--purple-soft)]" /> :
                 <BookOpen size={18} className="text-[var(--mint-soft)]" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[13px] px-1.5 py-0.5 rounded-full font-medium ${getModeBadgeColor(record.mode)}`}>
                    {record.modeLabel}
                  </span>
                  <span className="text-[13px] text-[var(--text-muted)]">{record.date}</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] truncate">{record.snippet}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-sm font-bold text-[var(--text-primary)]">{record.score}</span>
              </div>
              {expandedId === record.id ? (
                <ChevronUp size={18} className="text-[var(--text-muted)]" />
              ) : (
                <ChevronDown size={18} className="text-[var(--text-muted)]" />
              )}
            </button>

            {/* Expanded details */}
            {expandedId === record.id && (
              <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-4 animate-fade-in">
                {renderDetails(record)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
