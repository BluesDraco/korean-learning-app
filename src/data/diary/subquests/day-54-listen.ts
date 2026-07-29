import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 54 · 2-2 귀 트이기 · ~아/어 주세요 · 봐주다 · 讨价 */
export const day54Listen: ListenSubQuestData = {
  day: 24, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '동물문 시장 · 讨价还价',

  meaning: [
    { id: 'd54-l2-m1', audioKo: '조금만 깎아주세요. 학생이에요.',        choices: [{ text: '便宜一点吧。我是学生。',        correct: true }, { text: '不要砍价。',                          correct: false }, { text: '学生不能买。',                        correct: false }, { text: '价格已经很便宜。',                    correct: false }], explain: 'Tori 讨价 · 조금만 + 깎아주세요' },
    { id: 'd54-l2-m2', audioKo: '25,000원이에요.',                       choices: [{ text: '25,000 元。',                       correct: true }, { text: '2,500 元。',                          correct: false }, { text: '2500 円。',                          correct: false }, { text: '没标价。',                            correct: false }], explain: '獾店主报价' },
    { id: 'd54-l2-m3', audioKo: '20,000원 딱 있어요. 진짜 좀만 봐주세요.', choices: [{ text: '就 20,000 元。真的照顾一下。',    correct: true }, { text: '20,000 元不够。',                      correct: false }, { text: '20,000 元太多了。',                    correct: false }, { text: '不带现金。',                          correct: false }], explain: 'Tori 求情 · 봐주다' },
    { id: 'd54-l2-m4', audioKo: '얼마 가지고 있어?',                      choices: [{ text: '你带了多少？',                       correct: true }, { text: '你买多少？',                          correct: false }, { text: '你要吗？',                            correct: false }, { text: '你有几件？',                          correct: false }], explain: '獾店主反问 · 가지고 있다' },
    { id: 'd54-l2-m5', audioKo: '에휴, 학생 성공.',                       choices: [{ text: '哎，学生赢了。',                    correct: true }, { text: '哎，学生输了。',                      correct: false }, { text: '哎，太贵了。',                        correct: false }, { text: '哎，快走吧。',                        correct: false }], explain: '獾店主让步 · 성공 = 成功' },
  ],

  cloze: [
    { id: 'd54-l2-c1', audioKo: '조금만 깎아주세요.',           clozeParts: ['조금만 ', '.'],                  choices: [{ text: '깎아주세요', correct: true }, { text: '깎아 드리세요', correct: false }, { text: '깎으세요',   correct: false }, { text: '깎아 있어요', correct: false }], explain: '请对方做 → 주세요（不是 드리세요）' },
    { id: 'd54-l2-c2', audioKo: '진짜 좀만 봐주세요.',           clozeParts: ['진짜 좀만 ', '.'],              choices: [{ text: '봐주세요',   correct: true }, { text: '봐 드리세요',   correct: false }, { text: '봐요',       correct: false }, { text: '봐 있어요',   correct: false }], explain: '봐주다 = 照顾 · ~아/어 주세요' },
    { id: 'd54-l2-c3', audioKo: '20,000원 딱 있어요.',           clozeParts: ['20,000원 ', ' 있어요.'],        choices: [{ text: '딱',         correct: true }, { text: '만',           correct: false }, { text: '가지고',       correct: false }, { text: '아직',         correct: false }], explain: '딱 = 刚好（强调数量正好）' },
    { id: 'd54-l2-c4', audioKo: '현금으로 낼게요.',              clozeParts: ['현금', ' 낼게요.'],              choices: [{ text: '으로',       correct: true }, { text: '에서',         correct: false }, { text: '을',           correct: false }, { text: '까지',         correct: false }], explain: '手段助词 · 현금 有收音 → 으로' },
  ],

  reply: [
    { id: 'd54-l2-r1', audioKo: '25,000원이에요.',                     promptZh: '獾店主报价 25000。你想开始讨价，最自然的一句？',                       choices: [{ text: '조금만 깎아주세요. 학생이에요.',                     correct: true }, { text: '살게요.',                              correct: false }, { text: '얼마예요?',                            correct: false }, { text: '몰라요.',                              correct: false }], explain: 'Tori 原句 · 讨价起手式' },
    { id: 'd54-l2-r2', audioKo: '얼마 가지고 있어?',                    promptZh: '獾店主问你带了多少。你想说"就 20000，请照顾"，最自然的一句？',       choices: [{ text: '20,000원 딱 있어요. 진짜 좀만 봐주세요.',              correct: true }, { text: '많이 있어요.',                          correct: false }, { text: '없어요.',                              correct: false }, { text: '몰라요.',                              correct: false }], explain: 'Tori 原句 · 딱 + 봐주세요' },
    { id: 'd54-l2-r3', audioKo: '에휴, 학생 성공.',                      promptZh: '獾店主答应了。你想道谢并承诺"会好好穿"，最自然的一句？',                choices: [{ text: '감사합니다! 잘 입을게요.',                             correct: true }, { text: '아, 안 살래요.',                          correct: false }, { text: '더 깎아주세요.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: '道谢 + ~(으)ㄹ게요 承诺' },
  ],
};
