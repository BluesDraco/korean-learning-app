import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 59 · 2-3 문법 탐험 · ~(으)ㄹ 수 있어 决心 · vs ~ㄹ 수 있을 거예요 · 마음에 안 들다 */
export const day59Grammar: GrammarSubQuestData = {
  day: 29, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '能做到：~(으)ㄹ 수 있어 (决心+复习)',

  fix: [
    { id: 'd59-g3-f1', promptKo: '할수 있어. 화이팅.',                          promptZh: '"能做到。加油"哪句正确？',                    choices: [{ text: '할수 있어. 화이팅.',                          correct: false }, { text: '할 수 있어. 화이팅.',                correct: true }, { text: '하ㄹ 수 있어. 화이팅.',                    correct: false }, { text: '할 수 없어. 화이팅.',                          correct: false }], explain: '수 前**空格** · 반말 결심' },
    { id: 'd59-g3-f2', promptKo: '아직 마음에 못 들어.',                        promptZh: '"还不满意"哪句正确？',                        choices: [{ text: '아직 마음에 못 들어.',                        correct: false }, { text: '아직 마음에 안 들어.',              correct: true }, { text: '아직 마음이 있어.',                       correct: false }, { text: '아직 마음 없어.',                          correct: false }], explain: '마음에 **안** 들다 = 不满意（惯用）· 不能用 못' },
    { id: 'd59-g3-f3', promptKo: '내일 잘할 수 있어.',                          promptZh: '"明天会能做好的"（未来预测）哪句更贴切？',   choices: [{ text: '내일 잘할 수 있어.',                          correct: false }, { text: '내일 잘할 수 있을 거예요.',        correct: true }, { text: '내일 잘할 수 없어.',                       correct: false }, { text: '내일 잘할 거예요.',                       correct: false }], explain: '~ㄹ 수 있을 거예요 = 未来预测（会能做到）' },
    { id: 'd59-g3-f4', promptKo: '이제 정말 여기서 사네요.',                    promptZh: '"现在真的住在这里"哪句更自然？',              choices: [{ text: '이제 정말 여기서 사네요.',                    correct: false }, { text: '이제 정말 여기서 살아요.',           correct: true }, { text: '이제 정말 여기서 삽니다.',                   correct: false }, { text: '이제 정말 여기서 삶.',                       correct: false }], explain: '살다 → **살아요**（해요体，日常自然）' },
    { id: 'd59-g3-f5', promptKo: '~ㄹ 수 있어 vs ~ㄹ 수 있을 거예요 는?',        promptZh: '两者差别，哪句最准确？',                    choices: [{ text: '완전히 같아요.',                              correct: false }, { text: '~ㄹ 수 있어 = 决心 / 现在能力 · ~ㄹ 수 있을 거예요 = 未来预测（会能做到）', correct: true }, { text: '~ㄹ 수 있어 是过去时',                        correct: false }, { text: '~ㄹ 수 있을 거예요 是命令形',                      correct: false }], explain: '决心 vs 预测' },
  ],

  compose: [
    { id: 'd59-g3-c1', zhHint: '能做到。加油。',                              audioKo: '할 수 있어. 화이팅.',                          answer: ['할 수 있어.', '화이팅.'],                                tokens: ['할 수 있어.', '화이팅.', '할 수 없어.', '할수 있어.', '못 해.', '몰라.'],                              explain: 'Tori 决心' },
    { id: 'd59-g3-c2', zhHint: '我是兔莉。现在真的住在这里了。',              audioKo: '저는 토리예요. 이제 정말 여기서 살아요.',      answer: ['저는', '토리예요.', '이제', '정말', '여기서', '살아요.'], tokens: ['저는', '토리예요.', '이제', '정말', '여기서', '살아요.', '살네요.', '삽니다.', '사네요.', '여기에'], explain: '해요体 · 살다 → 살아요' },
    { id: 'd59-g3-c3', zhHint: '现在第八遍……还不满意。',                    audioKo: '이제 여덟 번… 아직 마음에 안 들어.',           answer: ['이제', '여덟', '번…', '아직', '마음에', '안', '들어.'],  tokens: ['이제', '여덟', '번…', '아직', '마음에', '안', '들어.', '들어요.', '못', '마음이'],                     explain: '마음에 안 들다 = 不满意' },
    { id: 'd59-g3-c4', zhHint: '明天会能做好的。',                            audioKo: '내일 잘할 수 있을 거예요.',                    answer: ['내일', '잘할 수 있을', '거예요.'],                       tokens: ['내일', '잘할 수 있을', '거예요.', '잘할 수 있어.', '잘할 수 없을', '잘할 수 있는'],                   explain: '~ㄹ 수 있을 거예요 未来预测' },
  ],

  rule: [
    { id: 'd59-g3-r1', promptZh: '关于「~(으)ㄹ 수 있어」的深化用法，哪句最准确？', choices: [{ text: '반말 决心 / 现在能力 · 给自己 / 朋友鼓劲 · 韩国日常加油核心组合', correct: true }, { text: '~ㄹ 수 있어 是过去时',   correct: false }, { text: '~ㄹ 수 있어 是命令形',   correct: false }, { text: '~ㄹ 수 있어 只用于书面语', correct: false }], explain: 'Day 38 → Day 51 → Day 59 深化' },
    { id: 'd59-g3-r2', promptZh: '关于「~ㄹ 수 있어 vs ~ㄹ 수 있을 거예요」，哪句最准确？', choices: [{ text: '~ㄹ 수 있어 = 现在能力 / 决心（확언）· ~ㄹ 수 있을 거예요 = 未来预测（推测）', correct: true }, { text: '两者完全一样',      correct: false }, { text: '~ㄹ 수 있어 是敬语',   correct: false }, { text: '~ㄹ 수 있을 거예요 只用于形容词', correct: false }], explain: '"能做到" vs "会能做到"' },
    { id: 'd59-g3-r3', promptZh: '关于「마음에 안 들다」惯用，哪句最准确？',           choices: [{ text: '否定 = **안 들다** · 不能用 못 · 惯用固定表达 = 不满意', correct: true }, { text: '否定用 못',       correct: false }, { text: '否定用 마음이 없다',  correct: false }, { text: '否定用 마음이 아니다',      correct: false }], explain: '마음에 안 들다 = 不合心意 / 不满意' },
    { id: 'd59-g3-r4', promptZh: '关于 살다 (ㄹ 词干) 해요体，哪句最准确？',            choices: [{ text: '살다 → **살아요** · ㄹ 词干日常用 해요体不脱落 · 습니다体才 삽니다', correct: true }, { text: '살다 → 사네요',       correct: false }, { text: '살다 → 삽니다 只有',    correct: false }, { text: '살다 → 삶',                   correct: false }], explain: 'Day 51 · 이제 정말 여기서 살아요' },
  ],
};
