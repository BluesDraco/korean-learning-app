import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：病情三句型——걸리다/나다/아프다
 * 教学梯度：
 *   fix 挑高频错——助词错用、三动词混用
 *   → compose 从单症状到组合句
 *   → rule 抽象规则：过去式使用、아프다 형용사特性、敬语层级
 */
export const day13Grammar: GrammarSubQuestData = {
  day: 13, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '病情描述三句型 · 걸렸어요 / 나요 / 아파요',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd13-g3-f1',
      promptKo: '감기 있어요.',
      promptZh: '"我感冒了"哪句最标准？',
      choices: [
        { text: '감기 있어요.', correct: false },
        { text: '감기 걸렸어요.', correct: true },
        { text: '감기 아파요.', correct: false },
        { text: '감기 나요.', correct: false },
      ],
      explain: '感冒用 걸리다（得病）+ 过去式 걸렸어요。不用 있다（存在）——감기 있어요 ❌',
    },
    {
      id: 'd13-g3-f2',
      promptKo: '열이 아파요.',
      promptZh: '"发烧了"哪句最标准？',
      choices: [
        { text: '열이 아파요.', correct: false },
        { text: '열이 나요.', correct: true },
        { text: '열이 걸렸어요.', correct: false },
        { text: '열이 있어요.', correct: false },
      ],
      explain: '发烧用 나다（出现）→ 열이 나요。不用 아프다 ❌——「열」是症状不是身体部位',
    },
    {
      id: 'd13-g3-f3',
      promptKo: '머리를 아파요.',
      promptZh: '"头痛"哪句最标准？',
      choices: [
        { text: '머리를 아파요.', correct: false },
        { text: '머리가 아파요.', correct: true },
        { text: '머리에 아파요.', correct: false },
        { text: '머리는 아파요.', correct: false },
      ],
      explain: '아프다 前用**主格 이/가**（不是宾格 을/를）。아프다 是形容词/感受词，用主格',
    },
    {
      id: 'd13-g3-f4',
      promptKo: '콧물 나요.',
      promptZh: '"流鼻涕"最标准的说法？',
      choices: [
        { text: '콧물 나요.', correct: false },
        { text: '콧물이 나요.', correct: true },
        { text: '콧물을 나요.', correct: false },
        { text: '콧물에 나요.', correct: false },
      ],
      explain: '症状"出现"用 나다，前必用主格 이/가。콧물 有받침 ㄹ → 이',
    },
    {
      id: 'd13-g3-f5',
      promptKo: '식후에 먹으세요.',
      promptZh: '"请饭后服用"最礼貌的说法？',
      choices: [
        { text: '식후에 먹으세요.', correct: false },
        { text: '식후에 드세요.', correct: true },
        { text: '식후에 먹어요.', correct: false },
        { text: '식후에 잡수세요.', correct: false },
      ],
      explain: '「드세요」是「먹다/마시다」的敬语（对客/病人用）。「먹으세요」也存在但 드세요 更常用、更礼貌',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd13-g3-c1',
      zhHint: '我感冒了。流鼻涕。',
      audioKo: '감기 걸렸어요. 콧물이 나요.',
      answer: ['감기', '걸렸어요.', '콧물이', '나요.'],
      tokens: ['감기', '걸렸어요.', '콧물이', '나요.', '있어요.', '콧물을', '아파요.'],
      explain: '병 + 걸렸어요 (感冒得了) + 症状 + 이/가 + 나요 (症状出现)。药店描述症状黄金公式',
    },
    {
      id: 'd13-g3-c2',
      zhHint: '头痛。嗓子也痛。',
      audioKo: '머리가 아파요. 목도 아파요.',
      answer: ['머리가', '아파요.', '목도', '아파요.'],
      tokens: ['머리가', '아파요.', '목도', '아파요.', '머리를', '목이', '나요.'],
      explain: '身体部位 + 이/가 + 아파요。第二个部位用 도(也) 连接',
    },
    {
      id: 'd13-g3-c3',
      zhHint: '请饭后服用。请多喝热水。',
      audioKo: '식후에 드세요. 따뜻한 물 많이 마셔요.',
      answer: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.'],
      tokens: ['식후에', '드세요.', '따뜻한', '물', '많이', '마셔요.', '식전에', '먹으세요.', '차가운'],
      explain: '식후(饭后) + 에(时间助词) + 드세요(请服用·敬语)。따뜻한 물(热水) + 많이 마셔요(多喝)',
    },
    {
      id: 'd13-g3-c4',
      zhHint: '哪里不舒服？',
      audioKo: '어디가 불편하세요?',
      answer: ['어디가', '불편하세요?'],
      tokens: ['어디가', '불편하세요?', '어디에', '아파요?', '뭐예요?', '있어요?'],
      explain: '어디(哪里) + 가 + 불편하세요?（不舒服吗？·敬语）。医生/药师问诊标准句',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd13-g3-r1',
      promptZh: '关于「걸리다」「나다」「아프다」三个词，哪句描述最准确？',
      choices: [
        { text: '걸리다 = 得病(感冒/流感)；나다 = 症状出现(发烧/流鼻涕)；아프다 = 身体部位痛', correct: true },
        { text: '三个词都是"痛"的意思，可以互换', correct: false },
        { text: '걸리다只用于感冒，其他病用 아프다', correct: false },
        { text: '아프다只用于头痛，其他部位用 나다', correct: false },
      ],
      explain: '三个词各司其职：得病用 걸리다；症状出现用 나다；身体部位痛用 아프다。混用会闹笑话：열이 아파요 ❌',
    },
    {
      id: 'd13-g3-r2',
      promptZh: '"我感冒了"为什么用过去式 걸렸어요 不用现在时 걸려요？',
      choices: [
        { text: '因为已经感染上了——从感染到出现症状有时间差，用过去式强调"结果状态"', correct: true },
        { text: '因为韩语没有现在时', correct: false },
        { text: '因为걸리다只有过去式', correct: false },
        { text: '因为걸려요语法错误', correct: false },
      ],
      explain: '得病用过去式强调"结果状态"，是韩语特有的时态用法。类似 「길을 잃었어요」= 迷路了',
    },
    {
      id: 'd13-g3-r3',
      promptZh: '"머리가 아파요" — 关于 아프다 前的助词，哪句描述最准确？',
      choices: [
        { text: '아프다 是形容词/感受词，前用主格 이/가，不用宾格 을/를', correct: true },
        { text: '아프다 是动词，前用宾格 을/를', correct: false },
        { text: '아프다前不用任何助词', correct: false },
        { text: '아프다前用位置 에', correct: false },
      ],
      explain: '아프다 是**形容词**（感受表达）。跟 있다/없다/필요하다 一样是感受类，前用主格 이/가。머리가 아파요 ✅',
    },
    {
      id: 'd13-g3-r4',
      promptZh: '关于「드세요」和「먹으세요」，哪句描述最准确？',
      choices: [
        { text: '드세요 是「먹다/마시다」的敬语——吃、喝共用一词。饭桌、药店、请客都用', correct: true },
        { text: '两者完全一样，可以互换', correct: false },
        { text: '드세요 是반말，먹으세요 是敬语', correct: false },
        { text: '드세요 用于喝，먹으세요 用于吃', correct: false },
      ],
      explain: '드시다 是 먹다/마시다 的敬语形。对客人、长辈、病人用 드세요。먹으세요 也是敬语但更普通，드세요 层级更高',
    },
  ],
};
