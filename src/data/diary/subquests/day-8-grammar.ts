import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * Chapter 2 起头核心：동사 + 고 싶어요（想做）
 * 教学梯度：
 *   fix 挑常见错误——주격/보격错用、고 싶어요 第三人称漏 ~해요
 *   → compose 从想家想吃到想学习，从단수到组合句
 *   → rule 抽象规则：싶다 形容词、第三人称、否定形态
 */
export const day8Grammar: GrammarSubQuestData = {
  day: 8, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~고 싶어요 · 想做某事的万能句型',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd08-g3-f1',
      promptKo: '엄마를 보고 싶어요.',
      promptZh: '"我想妈妈"哪句最标准？',
      choices: [
        { text: '엄마가 보고 싶어요.', correct: true },
        { text: '엄마를 보고 싶어요.', correct: false },
        { text: '엄마는 보고 싶어요.', correct: false },
        { text: '엄마에 보고 싶어요.', correct: false },
      ],
      explain: '「보고 싶다」的思念对象**更标准用主格 이/가**，엄마 무받침 → 가。「엄마를 보고 싶어요」母语者也常说、能听懂，但 이/가 是教科书首选',
    },
    {
      id: 'd08-g3-f2',
      promptKo: '토리가 한국에 가고 싶어요.',
      promptZh: '第三人称"兔莉想去韩国"最自然的说法？',
      choices: [
        { text: '토리가 한국에 가고 싶어요.', correct: false },
        { text: '토리가 한국에 가고 싶어해요.', correct: true },
        { text: '토리는 한국에 가요.', correct: false },
        { text: '토리가 한국에 가고 싶다.', correct: false },
      ],
      explain: '고 싶어요 只能用于第一人称（我）和第二人称疑问（你想吗？）。第三人称必须加 하다 → 고 싶어해요。这是韩语特有的心理动词规则',
    },
    {
      id: 'd08-g3-f3',
      promptKo: '먹고 싶지 않아.',
      promptZh: '"不想吃"（对朋友的반말）最自然的说法？',
      choices: [
        { text: '먹고 싶지 않아.', correct: true },
        { text: '먹고 안 싶어.', correct: false },
        { text: '안 먹고 싶다.', correct: false },
        { text: '먹으고 싶지 않아.', correct: false },
      ],
      explain: '长否定 「~고 싶지 않다」是母语者更自然的选择。「안 ~고 싶다」母语者少用；「먹기 싫어」也常见但用了名词形',
    },
    {
      id: 'd08-g3-f4',
      promptKo: '어제 집에 가고 싶어요.',
      promptZh: '"昨天想回家"用过去时怎么说？',
      choices: [
        { text: '어제 집에 가고 싶어요.', correct: false },
        { text: '어제 집에 가고 싶었어요.', correct: true },
        { text: '어제 집에 갔고 싶어요.', correct: false },
        { text: '어제 집에 가고 싶었어.', correct: false },
      ],
      explain: '싶다 是形容词，过去式 → 싶었어요。过去时标记 「었」 加在 싶 上，不是加在动词上（不是 갔고 싶어요）',
    },
    {
      id: 'd08-g3-f5',
      promptKo: '엄마 싶어요.',
      promptZh: '想妈妈时最自然的一整句？',
      choices: [
        { text: '엄마 싶어요.', correct: false },
        { text: '엄마가 보고 싶어요.', correct: true },
        { text: '엄마 있어요.', correct: false },
        { text: '엄마를 좋아요.', correct: false },
      ],
      explain: '韩语没有直接"想念"动词——要用 「보고 싶다」(想见 → 想念)。不能只说 엄마 싶어요 ❌，必须加动词 보다',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd08-g3-c1',
      zhHint: '我想妈妈。',
      audioKo: '엄마가 보고 싶어요.',
      answer: ['엄마가', '보고', '싶어요.'],
      tokens: ['엄마가', '보고', '싶어요.', '엄마를', '보아요.', '만나요.'],
      explain: '엄마(妈妈) + 가(主格·思念对象用主格) + 보고 싶어요(想见)。「엄마를 보고 싶어요」也听得懂，但主格更标准',
    },
    {
      id: 'd08-g3-c2',
      zhHint: '我想回家。',
      audioKo: '집에 가고 싶어요.',
      answer: ['집에', '가고', '싶어요.'],
      tokens: ['집에', '가고', '싶어요.', '집을', '가서', '싶었어요.'],
      explain: '집(家) + 에(方向助词·去哪儿) + 가다 词干 가 + 고 싶어요。「~에 가다」是固定搭配——去哪儿用 에',
    },
    {
      id: 'd08-g3-c3',
      zhHint: '我想吃泡菜。',
      audioKo: '김치 먹고 싶어요.',
      answer: ['김치', '먹고', '싶어요.'],
      tokens: ['김치', '먹고', '싶어요.', '김치를', '먹어요.', '싶어해요.'],
      explain: '먹다(吃) 词干 먹 + 고 싶어요 = 想吃。宾语 김치 后可省略 을——口语常省略',
    },
    {
      id: 'd08-g3-c4',
      zhHint: '我不想睡觉。（반말回应朋友）',
      audioKo: '자기 싫어.',
      answer: ['자기', '싫어.'],
      tokens: ['자기', '싫어.', '자고', '싶어.', '안 자고 싶어요.', '자요.'],
      explain: '반말"不想"的最自然说法：动词词干 자 + 名词化词尾 ~기 → 자기(睡·名词形) + 싫어(讨厌·반말)。반말版的"不想睡"',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd08-g3-r1',
      promptZh: '关于 「~고 싶어요」 使用范围，哪句最准确？',
      choices: [
        { text: '所有人称都可以用（我/你/他 都行）', correct: false },
        { text: '只能第一人称"我" 和第二人称疑问"你想吗？"用，第三人称要加 「해요」', correct: true },
        { text: '只能第三人称用（描述别人的想法）', correct: false },
        { text: '只能疑问句用，陈述句不能用', correct: false },
      ],
      explain: '心理感受在韩语里被视为个人内部体验——第一人称直觉知道自己想什么；第三人称"看起来他想__" 要加 「~어/아 하다」→ 고 싶어해요',
    },
    {
      id: 'd08-g3-r2',
      promptZh: '想念妈妈用什么助词？',
      choices: [
        { text: '엄마를 보고 싶어요.', correct: false },
        { text: '엄마가 보고 싶어요.', correct: true },
        { text: '엄마에 보고 싶어요.', correct: false },
        { text: '엄마 보고 싶어요.', correct: false },
      ],
      explain: '「보고 싶다」的思念对象用**主格 이/가**——这是韩语特有的心理句式（对象好像成了"存在感的主语"）。엄마 무받침 → 가',
    },
    {
      id: 'd08-g3-r3',
      promptZh: '关于 「싶다」 的词性，哪句是对的？',
      choices: [
        { text: '「싶다」是动词，跟 「가다」一样按动词变形', correct: false },
        { text: '「싶다」是形容词，过去式是 「싶었어요」', correct: true },
        { text: '「싶다」是助词，不能单独用', correct: false },
        { text: '「싶다」是名词，不能变形', correct: false },
      ],
      explain: '싶다 词典标记 [형용사]——所以过去式 싶었어요，不是 싶았어요 或 갔고 싶어요。理解这点后所有 ~고 싶어요 的变形就明白了',
    },
    {
      id: 'd08-g3-r4',
      promptZh: '"想学韩语"最自然的说法？',
      choices: [
        { text: '한국어를 공부하고 싶어요.', correct: true },
        { text: '한국어를 배웠고 싶어요.', correct: false },
        { text: '한국어를 공부싶어요.', correct: false },
        { text: '한국어에 공부하고 싶어요.', correct: false },
      ],
      explain: '공부하다(学习) 是 名词 + 하다 类动词。词干 공부하 + 고 싶어요 = 想学。宾语 한국어 用 을/를',
    },
  ],
};
