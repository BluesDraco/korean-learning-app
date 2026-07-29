import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 88 · 3-2 귀 트이기 · ~(이)라는 뜻이지 · 毕业照 */
export const day88Listen: ListenSubQuestData = {
  day: 28, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '졸업 사진 · 용기라는 뜻이지 · 예쁘다',

  meaning: [
    { id: 'd88-l2-m1', audioKo: '용기라는 뜻이지.',                                               choices: [{ text: '就是勇气的意思。',                  correct: true }, { text: '不是勇气。',                          correct: false }, { text: '勇气很重要。',                        correct: false }, { text: '需要勇气。',                          correct: false }], explain: 'N + 라는 뜻이지 · 반말' },
    { id: 'd88-l2-m2', audioKo: '모자 위에 뭐야? 당근?',                                          choices: [{ text: '帽子上是什么？胡萝卜？',            correct: true }, { text: '帽子在哪？',                          correct: false }, { text: '这是谁的帽子？',                      correct: false }, { text: '帽子多少钱？',                        correct: false }], explain: 'Minji 的问句' },
    { id: 'd88-l2-m3', audioKo: '엄마가 여기 두 글자 쓰신 거야.',                                 choices: [{ text: '是妈妈写的两个字。',                correct: true }, { text: '是我写的字。',                        correct: false }, { text: '写错了两个字。',                      correct: false }, { text: '没有字。',                            correct: false }], explain: '妈妈写的两个字 · 用기' },
    { id: 'd88-l2-m4', audioKo: '진짜 특별한 학사모야.',                                          choices: [{ text: '真是特别的学士帽。',                correct: true }, { text: '普通的学士帽。',                      correct: false }, { text: '帽子破了。',                          correct: false }, { text: '不是学士帽。',                        correct: false }], explain: 'Junho 的评价' },
    { id: 'd88-l2-m5', audioKo: '넷이 한 프레임에 담겼어요.',                                     choices: [{ text: '四个人装进同一个画框。',            correct: true }, { text: '四张不同的照片。',                    correct: false }, { text: '只有一个人。',                        correct: false }, { text: '照片模糊了。',                        correct: false }], explain: '프레임 · 一帧' },
  ],

  cloze: [
    { id: 'd88-l2-c1', audioKo: '용기라는 뜻이지.',            clozeParts: ['용기', ' 뜻이지.'],               choices: [{ text: '라는',      correct: true }, { text: '이라는',    correct: false }, { text: '란는',      correct: false }, { text: '라은',      correct: false }], explain: '无收音 · 용기라는' },
    { id: 'd88-l2-c2', audioKo: 'Danielle이라는 이름이에요.',  clozeParts: ['Danielle', ' 이름이에요.'],       choices: [{ text: '이라는',    correct: true }, { text: '라는',      correct: false }, { text: '은라는',    correct: false }, { text: '의라는',    correct: false }], explain: '有收音 · Danielle이라는' },
    { id: 'd88-l2-c3', audioKo: '모자에 당근을 꽂았어요.',      clozeParts: ['모자에 당근을 ', '.'],             choices: [{ text: '꽂았어요',  correct: true }, { text: '꽂아요',    correct: false }, { text: '꽂을래요',  correct: false }, { text: '꽂겠어요',  correct: false }], explain: '꽂다 · 过去' },
    { id: 'd88-l2-c4', audioKo: '그런 뜻이 아니에요.',         clozeParts: ['그런 뜻', ' 아니에요.'],           choices: [{ text: '이',        correct: true }, { text: '라는',      correct: false }, { text: '을',        correct: false }, { text: '는',        correct: false }], explain: '否定 · 뜻이 아니에요' },
  ],

  reply: [
    { id: 'd88-l2-r1', audioKo: '토리, 모자 위에 뭐야? 당근?',                                     promptZh: 'Minji 问你帽子上是不是胡萝卜。你想说"嗯，是胡萝卜，就是勇气的意思"，最自然的一句？',                choices: [{ text: '응, 당근. 용기라는 뜻이지.',                                              correct: true }, { text: '아니야, 당근 아니야.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '라는 뜻이지 · 解释' },
    { id: 'd88-l2-r2', audioKo: '그거 왜 모자에 꽂았어?',                                          promptZh: 'Haru 问你为什么把它插在帽子上。你想说"这是妈妈写的，对我来说就是勋章"，最自然的一句？',            choices: [{ text: '엄마가 써 주신 거라서, 나한텐 훈장이라는 뜻이야.',                          correct: true }, { text: '그냥 심심해서.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~라는 뜻이야 · 情感' },
    { id: 'd88-l2-r3', audioKo: '자, 하나 둘 셋! 웃으세요!',                                       promptZh: '摄影师喊拍照。快门响过后你想说"这照片是我们四个的一帧，真珍贵"，最自然的一句？',              choices: [{ text: '이 사진, 우리 넷의 한 프레임이라 진짜 소중해.',                            correct: true }, { text: '다시 찍자. 표정 이상해.',                 correct: false }, { text: '얼마예요?',                              correct: false }, { text: '사진 필요 없어.',                        correct: false }], explain: '프레임 · 珍惜' },
  ],
};
