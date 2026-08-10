import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 2-3 문법 탐험 · ~(으)ㄹ 수 있어요 · 못 */
export const day38Grammar: GrammarSubQuestData = {
  day: 8, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '能力表达 · ~(으)ㄹ 수 있어요 / 못',

  fix: [
    { id: 'd38-g3-f1', promptKo: '김치를 먹ㄹ 수 있어요.',            promptZh: '"能吃泡菜"哪句正确？',                    choices: [{ text: '김치를 먹ㄹ 수 있어요.',           correct: false }, { text: '김치를 먹을 수 있어요.',       correct: true }, { text: '김치를 먹수 있어요.',              correct: false }, { text: '김치를 먹을수 있어요.',                correct: false }], explain: '먹다 有收音 ㄱ → **을 수 있어요** · 수 前有空格' },
    { id: 'd38-g3-f2', promptKo: '한국어로 편지 쓰을 수 있어요.',      promptZh: '"能用韩语写信"哪句正确？',                  choices: [{ text: '한국어로 편지 쓰을 수 있어요.',   correct: false }, { text: '한국어로 편지 쓸 수 있어요.',   correct: true }, { text: '한국어로 편지 쓸수 있어요.',       correct: false }, { text: '한국어로 편지 쓸 수 없어요.',       correct: false }], explain: '쓰다 无收音 → **ㄹ 수 있어요**' },
    { id: 'd38-g3-f3', promptKo: '김치볶음밥 만들ㄹ 수 있어요.',        promptZh: '"能做泡菜炒饭"哪句正确？',                  choices: [{ text: '김치볶음밥 만들ㄹ 수 있어요.',     correct: false }, { text: '김치볶음밥 만들 수 있어요.',    correct: true }, { text: '김치볶음밥 만들을 수 있어요.',     correct: false }, { text: '김치볶음밥 만드ㄹ 수 있어요.',        correct: false }], explain: '만들다 词干末 ㄹ 与 ~(으)ㄹ 수 的 ㄹ 合并 · 写作 **만들 수**（不加을，也不写成 만들ㄹ）' },
    { id: 'd38-g3-f4', promptKo: '매운 거 안 먹을 수 있어요.',           promptZh: '"我不能吃辣"（能力）哪句最自然？',           choices: [{ text: '매운 거 안 먹을 수 있어요.',       correct: false }, { text: '매운 거 못 먹어요.',              correct: true }, { text: '매운 거 안 먹어요.',                correct: false }, { text: '매운 거 못 먹을 수 있어요.',           correct: false }], explain: '口语版能力否定 · **못 + 동사**（比 ~ㄹ 수 없어요 更常用）' },
    { id: 'd38-g3-f5', promptKo: '나 요리하 수 있어요.',                promptZh: '"我会做饭"哪句正确？',                     choices: [{ text: '나 요리하 수 있어요.',             correct: false }, { text: '나 요리할 수 있어요.',          correct: true }, { text: '나 요리하수 있어요.',                correct: false }, { text: '나 요리하는 수 있어요.',                correct: false }], explain: '요리하다 无收音 → **ㄹ 수 있어요** · 하다 + ㄹ 수 있어요' },
  ],

  compose: [
    { id: 'd38-g3-c1', zhHint: '妈妈，我会做饭了！',            audioKo: '엄마, 나 요리할 수 있어요!',              answer: ['엄마,', '나', '요리할 수 있어요!'],                      tokens: ['엄마,', '나', '요리할 수 있어요!', '요리해요!', '요리했어요!', '못 해요!', '요리하다요!'],           explain: 'Tori 给妈妈发的原句' },
    { id: 'd38-g3-c2', zhHint: '能用韩语写信。',                audioKo: '한국어로 편지 쓸 수 있어요.',              answer: ['한국어로', '편지', '쓸 수 있어요.'],                    tokens: ['한국어로', '편지', '쓸 수 있어요.', '쓰을 수 있어요.', '쓸수 있어요.', '쓸 수 없어요.', '한국어에서'], explain: '~로 用工具 · 쓰다 无收音' },
    { id: 'd38-g3-c3', zhHint: '能吃泡菜。',                    audioKo: '김치를 먹을 수 있어요.',                    answer: ['김치를', '먹을 수 있어요.'],                             tokens: ['김치를', '먹을 수 있어요.', '먹ㄹ 수 있어요.', '먹수 있어요.', '먹을수 있어요.', '못 먹어요.'],       explain: '먹다 有收音 → **을 수 있어요**' },
    { id: 'd38-g3-c4', zhHint: '我不太能吃辣。',                audioKo: '매운 거는 잘 못 먹어요.',                  answer: ['매운 거는', '잘', '못', '먹어요.'],                     tokens: ['매운 거는', '잘', '못', '먹어요.', '안', '못 먹을 수 있어요.', '먹었어요.', '먹을 수 없어요.'],       explain: '못 = 口语能力否定 · 잘 못 = 不太能' },
  ],

  rule: [
    { id: 'd38-g3-r1', promptZh: '关于「~(으)ㄹ 수 있어요」的用法，哪句最准确？', choices: [{ text: 'V + (으)ㄹ 수 있어요 = 能___（能力/可能性）· 收音判定 ㄹ / 을', correct: true }, { text: '只用于过去时',                     correct: false }, { text: '只用于形容词',                     correct: false }, { text: '~수 前不能有空格',                  correct: false }], explain: '수 是名词，前后要留空格 · 있다/없다 表能否' },
    { id: 'd38-g3-r2', promptZh: '关于收音判定，哪句最准确？',                    choices: [{ text: '无收音 → ㄹ 수 있어요；有收音 → 을 수 있어요；ㄹ 收音特殊直接 + ㄹ 수 있어요（不重复）', correct: true }, { text: '所有词一律 + ㄹ',                  correct: false }, { text: '所有词一律 + 을',                  correct: false }, { text: '有收音 → ㄹ；无收音 → 을',         correct: false }], explain: '가다 → 갈 수 / 먹다 → 먹을 수 / 만들다 → 만들 수' },
    { id: 'd38-g3-r3', promptZh: '关于「못 vs ~(으)ㄹ 수 없다」的差别，哪句最准确？', choices: [{ text: '못 是口语更常用；~(으)ㄹ 수 없다 更书面/正式 · 两者都对', correct: true }, { text: '~(으)ㄹ 수 없다 只用于过去', correct: false }, { text: '못 是敬语',                       correct: false }, { text: '两者意思相反',                     correct: false }], explain: '매운 거 못 먹어요 = 매운 거 먹을 수 없어요' },
    { id: 'd38-g3-r4', promptZh: '关于「못 vs 안」的差别，哪句最准确？',            choices: [{ text: '못 = 客观能力/条件不能；안 = 主观选择不做（不想 / 不愿）', correct: true }, { text: '两者完全一样',                     correct: false }, { text: '못 是过去时',                     correct: false }, { text: '안 是敬语',                        correct: false }], explain: '매운 거 못 먹어요（能力不行）· 매운 거 안 먹어요（不愿吃）' },
  ],
};
