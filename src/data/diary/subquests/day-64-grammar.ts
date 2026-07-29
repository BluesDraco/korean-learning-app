import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 64 · 3-3 문법 탐험 · ~게 되다 · 变得会……了（结果变化） */
export const day64Grammar: GrammarSubQuestData = {
  day: 4, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '变得……了：~게 되다',

  fix: [
    { id: 'd64-g3-f1', promptKo: '주문을 다 듣게 됐어요.',            promptZh: '"变得能一次听完订单了"哪句正确？',              choices: [{ text: '주문을 다 듣게 됐어요.',              correct: true }, { text: '주문을 다 듣기 됐어요.',        correct: false }, { text: '주문을 다 듣아 됐어요.',                correct: false }, { text: '주문을 다 듣고 됐어요.',                    correct: false }], explain: 'V 词干 + **게** + 되다 · 듣다 → 듣게' },
    { id: 'd64-g3-f2', promptKo: '한국어를 자연스럽게 말하게 됐어요.', promptZh: '"变得能自然地说韩语了"哪句正确？',            choices: [{ text: '한국어를 자연스럽게 말하게 됐어요.',   correct: true }, { text: '한국어를 자연스럽게 말하기 됐어요.', correct: false }, { text: '한국어를 자연스럽게 말한 됐어요.',    correct: false }, { text: '한국어를 자연스럽게 말해 됐어요.',           correct: false }], explain: '말하다 → 말하 + 게 + 되다' },
    { id: 'd64-g3-f3', promptKo: '알바가 재미있어게 됐어요.',           promptZh: '"打工变得有趣了"哪句正确？',                  choices: [{ text: '알바가 재미있어게 됐어요.',           correct: false }, { text: '알바가 재미있게 됐어요.',       correct: true }, { text: '알바가 재미있기 됐어요.',             correct: false }, { text: '알바가 재미있는 됐어요.',                  correct: false }], explain: '形容词 재미있다 → 재미있 + 게 + 되다' },
    { id: 'd64-g3-f4', promptKo: '2주 만에 익숙해게 됐어요.',           promptZh: '"两周就变熟练了"哪句正确？',                  choices: [{ text: '2주 만에 익숙해게 됐어요.',           correct: false }, { text: '2주 만에 익숙해졌어요.',        correct: true }, { text: '2주 만에 익숙하게 됐어요.',          correct: false }, { text: '2주 만에 익숙하기 됐어요.',                 correct: false }], explain: '익숙하다 → **익숙해지다** 常用（形容词 하다 → ~해지다 更自然）' },
    { id: 'd64-g3-f5', promptZh: '关于「~게 되다 vs ~아/어지다」的差别，哪句最准确？',      choices: [{ text: '~게 되다 = 外部原因导致的结果变化（被动 / 无奈感）· ~아/어지다 = 状态自然变化（形容词多）', correct: true }, { text: '完全一样',     correct: false }, { text: '~게 되다 只用于名词',     correct: false }, { text: '~아/어지다 是命令形',        correct: false }], explain: '外因结果 vs 自然变化' },
  ],

  compose: [
    { id: 'd64-g3-c1', zhHint: '变得能一次听完订单了。',       audioKo: '주문을 다 듣게 됐어요.',             answer: ['주문을', '다', '듣게 됐어요.'],           tokens: ['주문을', '다', '듣게 됐어요.', '듣기', '듣아', '듣고', '듣어요.'],                                  explain: '듣다 → 듣게 됐어요' },
    { id: 'd64-g3-c2', zhHint: '变得能自然地说韩语了。',        audioKo: '한국어를 자연스럽게 말하게 됐어요.', answer: ['한국어를', '자연스럽게', '말하게 됐어요.'], tokens: ['한국어를', '자연스럽게', '말하게 됐어요.', '말하기', '말한', '말해', '말했어요.'],                    explain: '말하 + 게 + 되다 · 表能力变化' },
    { id: 'd64-g3-c3', zhHint: '打工变得有趣了。',              audioKo: '알바가 재미있게 됐어요.',            answer: ['알바가', '재미있게 됐어요.'],              tokens: ['알바가', '재미있게 됐어요.', '재미있어게', '재미있기', '재미있는', '재미있어요.'],                    explain: '재미있 + 게 + 되다' },
    { id: 'd64-g3-c4', zhHint: '两周就变熟练了。',              audioKo: '2주 만에 익숙해졌어요.',              answer: ['2주 만에', '익숙해졌어요.'],                tokens: ['2주 만에', '익숙해졌어요.', '익숙해게 됐어요.', '익숙해요.', '2주만', '어색해졌어요.'],              explain: '익숙하다 → 익숙해지다（形容词 하다 更常用 ~해지다）' },
  ],

  rule: [
    { id: 'd64-g3-r1', promptZh: '关于「~게 되다」的基本用法，哪句最准确？',                choices: [{ text: 'V/A 词干 + **게** + 되다 · 表"变得 X" · 强调外部原因导致的结果', correct: true }, { text: 'V + **기** 되다',        correct: false }, { text: 'V + **아** 되다',          correct: false }, { text: 'V + **은** 되다',              correct: false }], explain: '基本形态 · ~게 되다' },
    { id: 'd64-g3-r2', promptZh: '关于「~게 되다」的语感，哪句最准确？',                     choices: [{ text: '本来不能 / 不是 → 现在变得能 / 是 · 有"随着时间 / 外力"的**结果变化**感 · 打工进步类叙事高频',    correct: true }, { text: '强调 100% 完美',        correct: false }, { text: '只用于负面变化',          correct: false }, { text: '只用于命令',                 correct: false }], explain: '结果变化 · 无控制感' },
    { id: 'd64-g3-r3', promptZh: '关于「~게 되다 vs ~아/어지다」，哪句最准确？',           choices: [{ text: '~게 되다 多用于**动词能力 / 情况变化** · ~아/어지다 多用于**形容词状态变化**（익숙해지다 / 예뻐지다）',   correct: true }, { text: '两者完全一样',            correct: false }, { text: '~아/어지다 只用于过去',       correct: false }, { text: '~게 되다 只用于形容词',       correct: false }], explain: '词性倾向差' },
    { id: 'd64-g3-r4', promptZh: '关于「过去时态」，哪句最准确？',                             choices: [{ text: '~게 되**었**어요 / 됐어요 · 表"已经变成了" · Day 64 打工两周主题',              correct: true }, { text: '~게 되어요 只有现在',       correct: false }, { text: '过去用 ~게 됐다',           correct: false }, { text: '过去用 ~게 되겠다',            correct: false }], explain: '되다 过去 → 됐다 / 되었다' },
  ],
};
