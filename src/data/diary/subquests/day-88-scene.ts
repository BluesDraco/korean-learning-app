import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 88 · 3-4 상황 속으로 · 毕业照 */
export const day88Scene: SceneSubQuestData = {
  day: 28, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '한빛대 광장 · 학사복 · 모자 위 당근',

  tasks: [
    { type: 'situation', id: 'd88-sc-s1', scenario: 'Minji 指着你帽子上的胡萝卜问那是什么。你想说"是胡萝卜，就是勇气的意思"，最合适的一句？',                                          choices: [{ ko: '당근이야. 용기라는 뜻이지.',                zh: '是胡萝卜，就是勇气的意思。', correct: true }, { ko: '당근이야. 용기이라는 뜻이지.',            zh: '错——용기无收音用라는。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '无收音 · 용기라는 뜻이지' },
    { type: 'situation', id: 'd88-sc-s2', scenario: '你想跟大家说明"胡萝卜上是妈妈写的字，对我来说是勋章"，最合适的一句？',                                     choices: [{ ko: '엄마가 써 주신 거라서, 나한텐 훈장이라는 뜻이야.',                                        zh: '妈妈写的，对我来说就是勋章。',              correct: true }, { ko: '그냥 장난이야. 아무 뜻 없어.',                zh: '只是开玩笑，没什么意思。（不真诚）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '有收音 · 훈장이라는 뜻이야' },
    { type: 'situation', id: 'd88-sc-s3', scenario: '快门响过后，你想说"这照片是我们四个的一帧，真珍贵"，最合适的一句？',                                                   choices: [{ ko: '이 사진, 우리 넷의 한 프레임이라 진짜 소중해.',                                        zh: '这照片是我们四个的一帧，真珍贵。',              correct: true }, { ko: '다시 찍자. 표정 이상해.',                zh: '再拍。表情怪。（破坏气氛）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '프레임 · 珍惜' },

    { type: 'dialogue', id: 'd88-sc-d1', lines: [{ speaker: 'Minji',   ko: '토리, 모자 위에 뭐야? 당근?',                    zh: '兔莉，帽子上是什么？胡萝卜？' }], blankSpeaker: '토리', choices: [{ ko: '응, 당근. 용기라는 뜻이지.',                     correct: true, zh: '嗯，胡萝卜。就是勇气的意思。' }, { ko: '몰라.',       correct: false, zh: '不知道。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '아무것도 아니야.',           correct: false, zh: '什么都不是。（回避）' }], explain: '라는 뜻이지' },
    { type: 'dialogue', id: 'd88-sc-d2', lines: [{ speaker: 'Haru',   ko: '예쁘다.',                  zh: '好看。' }],  blankSpeaker: '토리', choices: [{ ko: '고마워. 나한텐 세상에서 제일 소중한 거야.',                     correct: true, zh: '谢谢。这是我世界上最珍贵的东西。' }, { ko: '안 예뻐.',        correct: false, zh: '不好看。（否定对方）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '致谢 + 珍惜' },
    { type: 'dialogue', id: 'd88-sc-d3', lines: [{ speaker: '사진기사',   ko: '자, 하나 둘 셋! 웃으세요!',                    zh: '来，一二三！笑！' }], blankSpeaker: '토리', choices: [{ ko: '이 순간, 우리 넷 다 같이 웃자!',    correct: true, zh: '这一刻，我们四个一起笑吧！' }, { ko: '나 안 웃을래.',      correct: false, zh: '我不想笑。（破坏气氛）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '毕业照 · 共同瞬间' },

    { type: 'context', id: 'd88-sc-c1', ko: '용기라는 뜻이지.',   promptZh: '这句在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 88 主题句 · ~(이)라는 뜻이지 = 就是…的意思 · Tori 向朋友解释帽上胡萝卜的含义——妈妈写的「용기」二字',       correct: true }, { zh: '胡萝卜很好吃',          correct: false }, { zh: '不需要勇气',       correct: false }, { zh: '不是胡萝卜',                correct: false }], explain: '解释含义' },
    { type: 'context', id: 'd88-sc-c2', ko: '넷이 한 프레임에 담겼어요.', promptZh: '这句在Day 88的意义，哪句最准确？',                                                             choices: [{ zh: '"四个人装进同一个画框" · Tori、Junho、Minji、Haru 的毕业合影——以后要再进同一个画框不容易了,所以这一帧格外珍贵',       correct: true }, { zh: '拍了四张照片',                correct: false }, { zh: '照片装框卖了',                  correct: false }, { zh: '只有四个字',                correct: false }], explain: '一帧 · 珍贵的合影' },
  ],
};
