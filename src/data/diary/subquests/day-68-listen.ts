import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 68 · 3-2 귀 트이기 · ~아/어야 되다 · 直面 */
export const day68Listen: ListenSubQuestData = {
  day: 8, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '곰나라 마트 · 다시',

  meaning: [
    { id: 'd68-l2-m1', audioKo: '안녕하세요. 지난 주말에 왔던 토리예요.',            choices: [{ text: '您好。我是上周末来过的兔莉。',            correct: true }, { text: '您好，我是新来的。',              correct: false }, { text: '再见。',                            correct: false }, { text: '我不认识。',                        correct: false }], explain: 'Tori 自报家门 · 왔던 = 来过' },
    { id: 'd68-l2-m2', audioKo: '드릴 말씀이 있어요.',                                    choices: [{ text: '有件事想跟您说。',                        correct: true }, { text: '您有话要跟我说。',                correct: false }, { text: '不用说话。',                        correct: false }, { text: '再见。',                            correct: false }], explain: '正式开场 · 드리다 敬语连体形' },
    { id: 'd68-l2-m3', audioKo: '저를 무시하지 마세요.',                                 choices: [{ text: '请不要轻视我。',                          correct: true }, { text: '请重视我。',                      correct: false }, { text: '我不用您帮。',                      correct: false }, { text: '不用理我。',                        correct: false }], explain: '~지 마세요 正式请求否定' },
    { id: 'd68-l2-m4', audioKo: '체형은 능력이 아니에요. 능력이 중요해요.',              choices: [{ text: '体型不代表能力，能力才重要。',            correct: true }, { text: '体型和能力一样。',                correct: false }, { text: '能力不重要。',                    correct: false }, { text: '什么都不重要。',                    correct: false }], explain: 'Tori 反击核心' },
    { id: 'd68-l2-m5', audioKo: '미안합니다. 편견이었어요.',                              choices: [{ text: '对不起。是我有偏见。',                    correct: true }, { text: '不用道歉。',                      correct: false }, { text: '你才有偏见。',                    correct: false }, { text: '我没错。',                          correct: false }], explain: '狮子低头认错' },
  ],

  cloze: [
    { id: 'd68-l2-c1', audioKo: '다시 가서 말해야 돼요.',       clozeParts: ['다시 가서 ', ' 돼요.'],           choices: [{ text: '말해야',   correct: true }, { text: '말하야',    correct: false }, { text: '말한',    correct: false }, { text: '말하는', correct: false }], explain: '말하 + 어 → 말해 + 야 돼요' },
    { id: 'd68-l2-c2', audioKo: '이력서를 다시 봐야 돼요.',      clozeParts: ['이력서를 다시 ', ' 돼요.'],       choices: [{ text: '봐야',   correct: true }, { text: '보야',    correct: false }, { text: '봐서',    correct: false }, { text: '본', correct: false }], explain: '보 + 아 → 봐 + 야 돼요' },
    { id: 'd68-l2-c3', audioKo: '체력이 좋아야 돼요.',            clozeParts: ['체력이 ', ' 돼요.'],              choices: [{ text: '좋아야',   correct: true }, { text: '좋야',    correct: false }, { text: '좋기 야',    correct: false }, { text: '좋는 야', correct: false }], explain: '좋 + 아 → 좋아 + 야 돼요' },
    { id: 'd68-l2-c4', audioKo: '용기를 내야 해요.',                clozeParts: ['용기를 ', ' 해요.'],              choices: [{ text: '내야',   correct: true }, { text: '내서',    correct: false }, { text: '낸',    correct: false }, { text: '내기', correct: false }], explain: '내 + 야 하다（书面正式）' },
  ],

  reply: [
    { id: 'd68-l2-r1', audioKo: '무슨 일이세요?',                                                promptZh: '狮子问你有什么事。你想正式开场"有件事想跟您说"，最自然的一句？',        choices: [{ text: '드릴 말씀이 있어요.',                                          correct: true }, { text: '싫어요.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '드릴 말씀 · 正式开场' },
    { id: 'd68-l2-r2', audioKo: '이력서 한 번 다시 봐도 될까요?',                              promptZh: '狮子问是否可以再看简历。你想说"当然，谢谢"，最自然的一句？',            choices: [{ text: '네, 감사합니다. 잘 부탁드립니다.',                              correct: true }, { text: '싫어요, 이제 안 필요해요.',       correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '接受 + 感谢 + 委托' },
    { id: 'd68-l2-r3', audioKo: '미안합니다. 편견이었어요.',                                    promptZh: '狮子低头认错。你想说"没关系，谢谢您再看一次简历"，最自然的一句？',       choices: [{ text: '괜찮아요. 이력서 다시 봐 주셔서 감사합니다.',                    correct: true }, { text: '이제 됐어요, 갈게요.',            correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '接受道歉 + 感谢 · ~아 주셔서' },
  ],
};
