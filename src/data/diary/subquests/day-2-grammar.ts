import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-3 语法关 · N + (을/를) + 주세요
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 * 教学梯度：
 *   fix 逐条揪 콜라은/콜라이 之类真实翻车 → compose 从口语 주세요 到加宾格助词
 *   → rule 抽象出 有收音 을 / 无收音 를 / 口语可省略 三条规则
 */
export const day2Grammar: GrammarSubQuestData = {
  day: 2, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握「주세요」点单和 을/를 宾格助词',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd02-g3-f1',
      promptKo: '콜라은 주세요.',
      promptZh: '下列哪个句子是正确的？',
      choices: [
        { text: '콜라은 주세요.', correct: false },
        { text: '콜라는 주세요.', correct: false },
        { text: '콜라를 주세요.', correct: true },
        { text: '콜라이 주세요.', correct: false },
      ],
      explain: '点单时用宾格助词 을/를，不用主题助词 은/는。콜라 无收音 → 를。口语常直接说 「콜라 주세요」把 를 省略',
    },
    {
      id: 'd02-g3-f2',
      promptKo: '물를 주세요.',
      promptZh: '哪句正确？',
      choices: [
        { text: '물를 주세요.', correct: false },
        { text: '물을 주세요.', correct: true },
        { text: '물은 주세요.', correct: false },
        { text: '물이 주세요.', correct: false },
      ],
      explain: '물 末字有收音 ㄹ → 宾格助词用 을。无收音才用 를',
    },
    {
      id: 'd02-g3-f3',
      promptKo: '커피이 부탁드립니다.',
      promptZh: '想麻烦店员给一杯咖啡，最得体的说法是？',
      choices: [
        { text: '커피 안 주세요.', correct: false },
        { text: '커피 주세요, 아니요.', correct: false },
        { text: '커피를 부탁드립니다.', correct: true },
        { text: '커피이 부탁드립니다.', correct: false },
      ],
      explain: '부탁드립니다 是 주세요 的敬语升级。커피 无收音 → 를（加了更标准，口语可省略）。「안 주세요 ❌」不是韩语说法',
    },
    {
      id: 'd02-g3-f4',
      promptKo: '아니요, 얼음 안 주세요.',
      promptZh: '空乘问要不要冰，你不想要，正确说法是？',
      choices: [
        { text: '아니요, 얼음 안 주세요.', correct: false },
        { text: '얼음 주세요, 안 돼요.', correct: false },
        { text: '아니요, 괜찮아요.', correct: true },
        { text: '얼음 아니요.', correct: false },
      ],
      explain: '주세요 没有直接否定形式。婉拒统一用 아니요, 괜찮아요',
    },
    {
      id: 'd02-g3-f5',
      promptKo: '콜라 한잔을 주세요.',
      promptZh: '"请给我一杯可乐"最自然的写法是？',
      choices: [
        { text: '콜라 한잔을 주세요.', correct: false },
        { text: '콜라 한 잔 주세요.', correct: true },
        { text: '콜라 잔 한 주세요.', correct: false },
        { text: '한 잔 콜라 주세요.', correct: false },
      ],
      explain: '数词+量词写作「한 잔」（中间空格）。语序：名词 + 数量 + 주세요。「한잔을」既拼错又赘',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd02-g3-c1',
      zhHint: '请给我一杯可乐。',
      audioKo: '콜라 한 잔 주세요.',
      answer: ['콜라', '한', '잔', '주세요.'],
      tokens: ['콜라', '한', '잔', '주세요.', '두', '커피'],
      explain: '语序：名词 콜라 + 数量 한 잔 + 주세요',
    },
    {
      id: 'd02-g3-c2',
      zhHint: '请给我水。（加宾格助词，更标准）',
      audioKo: '물을 주세요.',
      answer: ['물을', '주세요.'],
      tokens: ['물을', '주세요.', '물를', '물이', '부탁', '얼음'],
      explain: '물 有收音 ㄹ → 을。是干扰项：물를 ❌、물이 是主格不是宾格',
    },
    {
      id: 'd02-g3-c3',
      zhHint: '不用了，没关系。',
      audioKo: '아니요, 괜찮아요.',
      answer: ['아니요,', '괜찮아요.'],
      tokens: ['아니요,', '괜찮아요.', '네,', '주세요.', '감사합니다.'],
      explain: '婉拒的黄金句：先 아니요 表态度，再 괜찮아요 缓语气',
    },
    {
      id: 'd02-g3-c4',
      zhHint: '麻烦给我菜单。（最礼貌）',
      audioKo: '메뉴 부탁드립니다.',
      answer: ['메뉴', '부탁드립니다.'],
      tokens: ['메뉴', '부탁드립니다.', '주세요.', '커피', '감사합니다.'],
      explain: '부탁드립니다 比 주세요 更正式，适合对店员/长辈用',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd02-g3-r1',
      promptZh: '"콜라"（末字无收音），加宾格助词点单时应该是？',
      choices: [
        { text: '콜라를 주세요.', correct: true },
        { text: '콜라을 주세요.', correct: false },
        { text: '콜라은 주세요.', correct: false },
        { text: '콜라는 주세요.', correct: false },
      ],
      explain: '宾格助词：无收音 → 를，有收音 → 을。은/는 是主题助词，不用于「주세요」点单',
    },
    {
      id: 'd02-g3-r2',
      promptZh: '"물"（末字有收音 ㄹ），加宾格助词应该是？',
      choices: [
        { text: '물를', correct: false },
        { text: '물을', correct: true },
        { text: '물은', correct: false },
        { text: '물이', correct: false },
      ],
      explain: '有收音 → 을。물를 是最常见的初学者错误',
    },
    {
      id: 'd02-g3-r3',
      promptZh: '关于「주세요」的用法，下面哪一句是对的？',
      choices: [
        { text: '주세요 前面必须加 을/를，不能省略。', correct: false },
        { text: '주세요 只能对朋友用，不能对店员用。', correct: false },
        { text: '口语中「콜라 주세요」是可以的，을/를 常省略。', correct: true },
        { text: '拒绝时应该说「안 주세요」。', correct: false },
      ],
      explain: '口语中 을/를 常省略；주세요 是标准礼貌用语；否定不用「안 주세요」，用 아니요, 괜찮아요',
    },
    {
      id: 'd02-g3-r4',
      promptZh: '想对店员非常礼貌地说"请给我菜单"，哪句最得体？',
      choices: [
        { text: '메뉴 줘요.', correct: false },
        { text: '메뉴 주세요.', correct: false },
        { text: '메뉴 부탁드립니다.', correct: true },
        { text: '메뉴 안 줘요.', correct: false },
      ],
      explain: '敬语阶梯：줘요（口语，对朋友）< 주세요（标准礼貌）< 부탁드립니다（正式敬语，对长辈/店员）',
    },
  ],
};
