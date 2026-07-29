import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 74 · 3-3 문법 탐험 · N + 마다 · 每 */
export const day74Grammar: GrammarSubQuestData = {
  day: 14, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '每一……：N + 마다',

  fix: [
    { id: 'd74-g3-f1', promptKo: '지역에 사투리가 있어요.',           promptZh: '"每个地区都有方言"哪句正确？',                    choices: [{ text: '지역에 사투리가 있어요.',           correct: false }, { text: '지역마다 사투리가 있어요.',        correct: true }, { text: '지역에서 사투리가 있어요.',        correct: false }, { text: '지역 동안 사투리가 있어요.',                correct: false }], explain: '"每" = N + **마다**（不是 에 / 에서 / 동안）' },
    { id: 'd74-g3-f2', promptKo: '사람이 발음이 달라요.',              promptZh: '"每个人发音不同"哪句正确？',                        choices: [{ text: '사람이 발음이 달라요.',              correct: false }, { text: '사람마다 발음이 달라요.',            correct: true }, { text: '사람은 발음이 달라요.',              correct: false }, { text: '사람을 발음이 달라요.',                        correct: false }], explain: '사람마다 · 每人' },
    { id: 'd74-g3-f3', promptKo: '주말에마다 여행 가요.',              promptZh: '"每个周末去旅行"哪句正确？',                        choices: [{ text: '주말에마다 여행 가요.',              correct: false }, { text: '주말마다 여행 가요.',                correct: true }, { text: '주말이 마다 여행 가요.',                correct: false }, { text: '주말 동안 마다 여행 가요.',                    correct: false }], explain: 'N + 마다 · 名词直接 + 마다（不加 에）' },
    { id: 'd74-g3-f4', promptKo: '아침 마다 커피를 마셔요.',           promptZh: '"每天早上喝咖啡"哪句正确？',                        choices: [{ text: '아침 마다 커피를 마셔요.',           correct: false }, { text: '아침마다 커피를 마셔요.',            correct: true }, { text: '아침은 마다 커피를 마셔요.',            correct: false }, { text: '아침을 마다 커피를 마셔요.',                    correct: false }], explain: 'N + 마다 · 之间**不加空格**' },
    { id: 'd74-g3-f5', promptZh: '关于「N + 마다 vs N + 매」的差别，哪句最准确？',                                                                                                                                                          choices: [{ text: 'N + 마다 = **每一 N** · 매(每) 是**接头词**（매일 / 매주 / 매년，紧贴时间名词）· 意义相近但形态不同', correct: true }, { text: '两者完全一样',            correct: false }, { text: '마다 只用于过去',        correct: false }, { text: '매 是敬语',              correct: false }], explain: '매일 = 하루마다 语感' },
  ],

  compose: [
    { id: 'd74-g3-c1', zhHint: '每个地区都有方言。',                  audioKo: '지역마다 사투리가 있어요.',                answer: ['지역마다', '사투리가', '있어요.'],                       tokens: ['지역마다', '사투리가', '있어요.', '지역에', '지역에서', '없어요.', '있었어요.'],                                  explain: 'N + 마다' },
    { id: 'd74-g3-c2', zhHint: '每个人发音都稍稍不同。',              audioKo: '사람마다 발음이 조금씩 달라요.',            answer: ['사람마다', '발음이', '조금씩', '달라요.'],                tokens: ['사람마다', '발음이', '조금씩', '달라요.', '사람이', '똑같아요.', '달랐어요.', '사람은'],                     explain: '사람마다' },
    { id: 'd74-g3-c3', zhHint: '每个周末去旅行。',                     audioKo: '주말마다 여행 가요.',                        answer: ['주말마다', '여행', '가요.'],                              tokens: ['주말마다', '여행', '가요.', '주말에마다', '주말 동안', '주말을', '갔어요.'],                     explain: '주말마다 · 无 에' },
    { id: 'd74-g3-c4', zhHint: '每天早上喝咖啡。',                     audioKo: '아침마다 커피를 마셔요.',                   answer: ['아침마다', '커피를', '마셔요.'],                          tokens: ['아침마다', '커피를', '마셔요.', '아침에마다', '아침 동안', '마셨어요.', '커피가'],                     explain: '아침마다 · 每天早上' },
  ],

  rule: [
    { id: 'd74-g3-r1', promptZh: '关于「N + 마다」的形态，哪句最准确？',                                choices: [{ text: '**名词紧贴 + 마다**（无空格 / 无 에）· 지역마다 · 사람마다 · 아침마다 = 每一 N', correct: true }, { text: 'N + 에 마다',               correct: false }, { text: 'N + 는 마다',               correct: false }, { text: 'N + 을 마다',                    correct: false }], explain: 'N 直接 + 마다' },
    { id: 'd74-g3-r2', promptZh: '关于「~마다 vs ~에」，哪句最准确？',                                  choices: [{ text: '**~마다 = 每一（分布式）** · **~에 = 单个时间点** · 매주(에)마다 여행 = 每周去旅行', correct: true }, { text: '两者完全一样',           correct: false }, { text: '~마다 只用于过去',      correct: false }, { text: '~에 只用于将来',                    correct: false }], explain: '语义差' },
    { id: 'd74-g3-r3', promptZh: '关于「N + 마다 vs 매 + N」，哪句最准确？',                            choices: [{ text: '**마다 = N 后接** · **매 = 接头词，紧贴时间 N**（매일 / 매주 / 매년）· 两者意近', correct: true }, { text: '两者完全一样',            correct: false }, { text: '매 是敬语',    correct: false }, { text: 'N + 마다 = 매 + N（形态相同）',           correct: false }], explain: '매일 = 하루마다' },
    { id: 'd74-g3-r4', promptZh: '关于「~마다 다르다 组合」，哪句最准确？',                              choices: [{ text: 'N + 마다 + 다르다 是**高频组合** · 사람마다 다르다 · 지역마다 다르다 · Day 74 主题句式', correct: true }, { text: '不能和 다르다 搭配',            correct: false }, { text: '다르다 是命令',        correct: false }, { text: '不能用现在时',                      correct: false }], explain: '经典组合' },
  ],
};
