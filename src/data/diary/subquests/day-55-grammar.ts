import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 55 · 2-3 문법 탐험 · ~던 · ~았/었던 · vs ~(으)ㄴ */
export const day55Grammar: GrammarSubQuestData = {
  day: 25, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '曾经___的：~던 / ~았/었던',

  fix: [
    { id: 'd55-g3-f1', promptKo: '안녕하세요도 어려운 나였어요.',              promptZh: '"连"你好"都难说出口的曾经的我"哪句正确？',  choices: [{ text: '안녕하세요도 어려운 나였어요.',              correct: false }, { text: '안녕하세요도 어려웠던 나였어요.',       correct: true }, { text: '안녕하세요도 어려웠는 나였어요.',            correct: false }, { text: '안녕하세요도 어렵는 나였어요.',                 correct: false }], explain: '过去回想 → ~았/었**던** · 어렵다 → 어려웠던' },
    { id: 'd55-g3-f2', promptKo: '자주 간 카페가 문 닫았어요.',                promptZh: '"常去的咖啡馆关门了"（反复经验）哪句最自然？', choices: [{ text: '자주 간 카페가 문 닫았어요.',                  correct: false }, { text: '자주 갔던 카페가 문 닫았어요.',         correct: true }, { text: '자주 가는 카페가 문 닫았어요.',                correct: false }, { text: '자주 갈 카페가 문 닫았어요.',                     correct: false }], explain: '反复过去 → **~던**（不是 ~ㄴ 单纯完成）' },
    { id: 'd55-g3-f3', promptKo: '그때 좋아한 노래를 다시 들었어요.',          promptZh: '"重新听了那时候曾经喜欢的歌"哪句更自然？',   choices: [{ text: '그때 좋아한 노래를 다시 들었어요.',            correct: false }, { text: '그때 좋아했던 노래를 다시 들었어요.',   correct: true }, { text: '그때 좋아하는 노래를 다시 들었어요.',         correct: false }, { text: '그때 좋아할 노래를 다시 들었어요.',              correct: false }], explain: '~았/었던 = 强调完全的过去（已经不喜欢了）' },
    { id: 'd55-g3-f4', promptKo: '한국어를 모르는 때가 있었어요.',              promptZh: '"有过不懂韩语的时候"哪句最准确？',            choices: [{ text: '한국어를 모르는 때가 있었어요.',                correct: false }, { text: '한국어를 몰랐던 때가 있었어요.',        correct: true }, { text: '한국어를 몰랐는 때가 있었어요.',              correct: false }, { text: '한국어를 몰라는 때가 있었어요.',                 correct: false }], explain: '过去反复状态 → ~았/었**던**' },
    { id: 'd55-g3-f5', promptKo: '갔던 곳 vs 간 곳 은 완전히 같은 뜻이에요.',   promptZh: '关于「~던 vs ~(으)ㄴ」的差别，哪句最准确？', choices: [{ text: '두 개는 완전히 같아요.',                          correct: false }, { text: '~던 = 反复 / 持续过去；~(으)ㄴ = 단순 완료', correct: true }, { text: '~던 = 未来时',                                correct: false }, { text: '~(으)ㄴ = 命令形',                              correct: false }], explain: '갔던 곳 = 常去 · 간 곳 = 去过' },
  ],

  compose: [
    { id: 'd55-g3-c1', zhHint: '连"你好"都难说出口的曾经的我。',       audioKo: '안녕하세요도 어려웠던 나였어요.',         answer: ['안녕하세요도', '어려웠던', '나였어요.'],                  tokens: ['안녕하세요도', '어려웠던', '나였어요.', '어려운', '어려운데', '어렵는', '나이에요.'],                    explain: 'Tori 回想 · ~았/었던' },
    { id: 'd55-g3-c2', zhHint: '常去的咖啡馆关门了。',                 audioKo: '자주 갔던 카페가 문 닫았어요.',           answer: ['자주', '갔던', '카페가', '문', '닫았어요.'],              tokens: ['자주', '갔던', '카페가', '문', '닫았어요.', '가는', '간', '갈', '카페에서'],                            explain: '~던 反复经验' },
    { id: 'd55-g3-c3', zhHint: '重新听了那时候曾经喜欢的歌。',         audioKo: '그때 좋아했던 노래를 다시 들었어요.',     answer: ['그때', '좋아했던', '노래를', '다시', '들었어요.'],       tokens: ['그때', '좋아했던', '노래를', '다시', '들었어요.', '좋아하는', '좋아할', '노래가', '듣네'],               explain: '~았/었던 完全过去' },
    { id: 'd55-g3-c4', zhHint: '会继续更努力。',                       audioKo: '계속 더 열심히 할래요.',                    answer: ['계속', '더', '열심히', '할래요.'],                       tokens: ['계속', '더', '열심히', '할래요.', '했어요.', '할 거예요.', '할까요?', '조금'],                          explain: 'Tori 承诺 · ~(으)ㄹ래요' },
  ],

  rule: [
    { id: 'd55-g3-r1', promptZh: '关于「~던」的用法，哪句最准确？',                   choices: [{ text: 'V/A + 던 + N = 反复 / 持续的过去状态 · 回想 / 回顾专用 · 日记 / 自传高频', correct: true }, { text: '~던 是未来时',   correct: false }, { text: '~던 只用于形容词',   correct: false }, { text: '~던 只用于书面语',    correct: false }], explain: '갔던 곳 / 좋아하던 노래' },
    { id: 'd55-g3-r2', promptZh: '关于「~았/었던」的用法，哪句最准确？',                choices: [{ text: '过去时 + 던 = **完全过去**（已经不那样了）· 좋아했던 사람 = 曾经喜欢的（现在不喜欢了）', correct: true }, { text: '~았/었던 是现在时',        correct: false }, { text: '~았/었던 只用于名词',        correct: false }, { text: '~았/었던 是命令形',             correct: false }], explain: '어려웠던 나 = 曾经艰难的（现在不艰难了）' },
    { id: 'd55-g3-r3', promptZh: '关于「~던 vs ~(으)ㄴ」的差别，哪句最准确？',         choices: [{ text: '~던 = 反复 / 持续 / 回想 · ~(으)ㄴ = 단순 완료', correct: true }, { text: '두 개는 완전히 같아요',        correct: false }, { text: '~던 是未来时',        correct: false }, { text: '~(으)ㄴ 是命令形',          correct: false }], explain: '갔던 곳（常去）vs 간 곳（去过）· 语感差' },
    { id: 'd55-g3-r4', promptZh: '关于「~던 vs ~는」的差别，哪句最准确？',            choices: [{ text: '~던 = 过去回想 · ~는 = 现在进行 · 时间轴不同', correct: true }, { text: '两者完全一样',        correct: false }, { text: '~던 是现在时',       correct: false }, { text: '~는 是过去时',       correct: false }], explain: '가던 곳（曾经常去）vs 가는 곳（现在正去 / 常去）' },
  ],
};
