import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 53 · 2-2 귀 트이기 · ~(으)ㄹ게요 承诺深化 · vs ~(으)ㄹ 거예요 */
export const day53Listen: ListenSubQuestData = {
  day: 23, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: 'BBQ 치킨店 · 从被请到请人',

  meaning: [
    { id: 'd53-l2-m1', audioKo: '이모, 반반 한 마리랑 감튀 하나, 콜라 두 잔 주세요.', choices: [{ text: '阿姨，半半炸鸡一份、薯条一份、可乐两杯。', correct: true }, { text: '阿姨，可乐一份、薯条两杯。',           correct: false }, { text: '阿姨，请再等 5 分钟。',                    correct: false }, { text: '阿姨，我不吃了。',                        correct: false }], explain: 'Tori 独立点单 · 3 品混合' },
    { id: 'd53-l2-m2', audioKo: '오늘은 내가 낼게. Day 27에 민지가 사줬으니까.',       choices: [{ text: '今天我请。Day 27 Minji 请过。',           correct: true }, { text: '今天 Minji 请。',                       correct: false }, { text: '今天没人请客。',                          correct: false }, { text: 'Day 27 我请了 Minji。',                    correct: false }], explain: 'Tori 承诺请客 · ~(으)ㄹ게' },
    { id: 'd53-l2-m3', audioKo: '토리, 진짜 성장했다.',                                 choices: [{ text: '兔莉，真的成长了。',                       correct: true }, { text: '兔莉，还没成长。',                        correct: false }, { text: '兔莉，长大点。',                          correct: false }, { text: '兔莉，没变。',                            correct: false }], explain: 'Minji 感叹 · 성장하다 过去' },
    { id: 'd53-l2-m4', audioKo: '와, 이제 프로다. 완전 자연스러워.',                    choices: [{ text: '哇，现在专业了。完全自然。',                correct: true }, { text: '哇，还是初学者。',                        correct: false }, { text: '哇，太紧张了。',                          correct: false }, { text: '哇，说不出话。',                          correct: false }], explain: 'Junho 夸赞 · 프로 = 专业' },
    { id: 'd53-l2-m5', audioKo: '카드로 결제할게요.',                                    choices: [{ text: '我刷卡结账。',                              correct: true }, { text: '现金结账。',                              correct: false }, { text: '不结账了。',                              correct: false }, { text: '请给我卡。',                              correct: false }], explain: '~로 手段 + ~ㄹ게요 承诺' },
  ],

  cloze: [
    { id: 'd53-l2-c1', audioKo: '오늘은 내가 살게.',              clozeParts: ['오늘은 내가 ', '.'],              choices: [{ text: '살게',   correct: true }, { text: '살 거야', correct: false }, { text: '샀어', correct: false }, { text: '살까', correct: false }], explain: '承诺 → ~(으)ㄹ게 · 사다 无收音 → 살게' },
    { id: 'd53-l2-c2', audioKo: '이건 내가 도와줄게.',              clozeParts: ['이건 내가 ', '.'],                choices: [{ text: '도와줄게', correct: true }, { text: '도와줄까?', correct: false }, { text: '도와줬어', correct: false }, { text: '도와요',   correct: false }], explain: '반말 承诺 · 도와주다 → 도와줄게' },
    { id: 'd53-l2-c3', audioKo: '내일 꼭 갈게요.',                    clozeParts: ['내일 꼭 ', '.'],                    choices: [{ text: '갈게요',   correct: true }, { text: '갔어요', correct: false }, { text: '갈 거예요', correct: false }, { text: '갈까요?', correct: false }], explain: '承诺赴约 · ~(으)ㄹ게요' },
    { id: 'd53-l2-c4', audioKo: '만들다 → 만들게요.',                clozeParts: ['만들다 →', '요.'],                 choices: [{ text: '만들게', correct: true }, { text: '만들ㄹ게', correct: false }, { text: '만들을게', correct: false }, { text: '만드게',   correct: false }], explain: 'ㄹ 收音特殊 · 不重复' },
  ],

  reply: [
    { id: 'd53-l2-r1', audioKo: '이번엔 내가 살까?',                          promptZh: 'Junho 说他来请。你想说"不，今天我请"（承诺）最自然的一句？',                choices: [{ text: '아니, 오늘은 내가 낼게.',                              correct: true }, { text: '아니, 다음에 안 만나.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: 'Tori 承诺 · ~(으)ㄹ게' },
    { id: 'd53-l2-r2', audioKo: '토리, 진짜 성장했다.',                        promptZh: 'Minji 说你真的成长了。你想温柔承诺"下次真的换你们请"，最自然的一句？',      choices: [{ text: '응, 다음엔 진짜 너희들이 사.',                        correct: true }, { text: '내가 계속 살게.',                          correct: false }, { text: '아니, 아직 성장 안 했어.',                  correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 반말命令让对方请' },
    { id: 'd53-l2-r3', audioKo: '얼마 나왔어요?',                              promptZh: '阿姨报了价。你想说"刷卡结账"最自然的一句？',                                choices: [{ text: '카드로 결제할게요.',                                    correct: true }, { text: '현금 없어요.',                            correct: false }, { text: '싫어요.',                                  correct: false }, { text: '몰라요.',                                  correct: false }], explain: '~로 + ~ㄹ게요' },
  ],
};
