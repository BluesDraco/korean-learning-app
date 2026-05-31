import type { ComponentType } from 'react';
import { PenLine, Sparkles, BookOpen, History } from 'lucide-react';

export type WritingMode = 'imitation' | 'free' | 'cloze' | 'history';

export interface HistoryRecord {
  id: string;
  date: string;
  mode: string;
  modeLabel: string;
  score: string;
  snippet: string;
  details: any;
}

export interface ImitationPrompt {
  zh: string;
  ko: string;
  hint: string;
  grammarPoint: string;
}

export interface FreeTopic {
  title: string;
  titleKo: string;
  prompt: string;
  keywords: string[];
}

export interface ClozeExercise {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  full: string;
  meaning: string;
}

export interface ModeConfig {
  key: WritingMode;
  label: string;
  icon: ComponentType<{ size?: number }>;
  desc: string;
}

export const MOCK_HISTORY: HistoryRecord[] = [
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

export const modeConfig: ModeConfig[] = [
  { key: 'imitation', label: '仿写', icon: PenLine, desc: '看中文写韩语' },
  { key: 'free', label: '自由写', icon: Sparkles, desc: '话题写作' },
  { key: 'cloze', label: '填空', icon: BookOpen, desc: '补全助词/语尾' },
  { key: 'history', label: '写作历史', icon: History, desc: '查看记录' },
];

export const imitationPrompts: ImitationPrompt[] = [
  { zh: '我是学生。', ko: '저는 학생입니다.', hint: '저는 ~ 입니다 (我是~)', grammarPoint: 'N은/는 N입니다 — 名词谓语句，表示"~是~"' },
  { zh: '今天天气很好。', ko: '오늘 날씨가 좋아요.', hint: '날씨가 좋아요 (天气好)', grammarPoint: 'N이/가 A아요/어요 — 形容词谓语句，描述主语状态' },
  { zh: '我想吃韩国料理。', ko: '한국 요리를 먹고 싶어요.', hint: '~고 싶어요 (想做~)', grammarPoint: 'V고 싶다 — 表示"想做~"，用于表达愿望' },
  { zh: '昨天看了电影。', ko: '어제 영화를 봤어요.', hint: '~았/었어요 (过去时)', grammarPoint: 'V았/었어요 — 过去时制词尾，表示动作已完成' },
  { zh: '请给我一杯咖啡。', ko: '커피 한 잔 주세요.', hint: '~ 주세요 (请给~)', grammarPoint: 'V(으)세요 — 命令句，表示礼貌的请求或命令' },
  { zh: '我在学韩语。', ko: '한국어를 배우고 있어요.', hint: '~고 있어요 (正在做~)', grammarPoint: 'V고 있다 — 进行时，表示动作正在进行中' },
  { zh: '这里可以拍照吗？', ko: '여기서 사진 찍어도 돼요?', hint: '~아/어도 돼요? (可以做~吗?)', grammarPoint: 'V아/어도 되다 — 表示允许，相当于"可以做~"' },
  { zh: '比想象中更难。', ko: '생각보다 더 어려워요.', hint: '~보다 더 (比~更)', grammarPoint: 'N보다 — 比较助词，表示"比~更~"' },
];

export const freeTopics: FreeTopic[] = [
  { title: '自我介绍', titleKo: '자기소개', prompt: '请用韩语写一段自我介绍（3-5句话），包括你的名字、职业/身份、兴趣爱好。', keywords: ['이름', '직업', '취미'] },
  { title: '我的一天', titleKo: '하루 일과', prompt: '描述你的一天。从早上起床到晚上睡觉，你通常会做些什么？', keywords: ['아침', '점심', '저녁', '공부', '운동'] },
  { title: '最喜欢的食物', titleKo: '좋아하는 음식', prompt: '说说你最喜欢的食物。是什么？为什么喜欢？多久吃一次？', keywords: ['음식', '맛있다', '좋아하다', '자주'] },
  { title: '上周末', titleKo: '지난 주말', prompt: '描述你上周末做了什么。去了哪里？见了谁？做了哪些有趣的事？', keywords: ['주말', '친구', '재미있다', '시간'] },
  { title: '未来计划', titleKo: '앞으로의 계획', prompt: '你接下来的计划是什么？想学什么？想去哪里旅行？有什么目标？', keywords: ['계획', '여행', '공부', '목표', '미래'] },
];

export const clozeExercises: ClozeExercise[] = [
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
