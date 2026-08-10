import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-4 상황 속으로 · 兽尔江大桥·和好 */
export const day82Scene: SceneSubQuestData = {
  day: 22, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '한강 다리 · 화해 · 시적 대비',

  tasks: [
    { type: 'situation', id: 'd82-sc-s1', scenario: '在桥上先向 Minji 道歉，想说"那天对不起，我说话太重了，虽然是误会"，哪句最合适？',                                                     choices: [{ ko: '그때 미안. 내가 세게 말했어. 오해였는데도.',                zh: '那天对不起。我话太重了。虽然是误会。', correct: true }, { ko: '네가 먼저 사과해.',            zh: '你先道歉。（不像和好）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '主动道歉' },
    { type: 'situation', id: 'd82-sc-s2', scenario: '桥上风大，想诗意地说"风大但拥抱温暖"，哪句最合适？',                                     choices: [{ ko: '바람은 세지만 안은 따뜻해.',      zh: '风大但拥抱温暖。',              correct: true }, { ko: '바람이 세지만 안이 따뜻해.',                  zh: '错——对比主题应用 은/는。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '双主题 은/는 + ~지만' },
    { type: 'situation', id: 'd82-sc-s3', scenario: 'Minji 说你变了，你想说"在韩国学会了鼓起勇气"，哪句最合适？',                                                      choices: [{ ko: '한국에서 용기 내는 법을 배웠어.',      zh: '在韩国学会了鼓起勇气。',              correct: true }, { ko: '한국에 용기 내는 법을 배웠어.',      zh: '错——动作地点用 에서。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~에서 + 용기 내는 법을 배우다' },

    { type: 'dialogue', id: 'd82-sc-d1', lines: [{ speaker: 'Minji',   ko: '근데 토리… 너 변했어. 예전엔 안 먼저 왔잖아.',                zh: '不过兔莉……你变了。以前不会先来。' }], blankSpeaker: '토리', choices: [{ ko: '한국에서 용기 내는 법을 배웠어. 자존심보다 우정이 크잖아.',            correct: true, zh: '在韩国学会了鼓起勇气。友情比自尊大嘛。' }, { ko: '아니, 하나도 안 변했어.',       correct: false, zh: '不，一点没变。（语义反）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '용기 내는 법 + ~잖아' },
    { type: 'dialogue', id: 'd82-sc-d2', lines: [{ speaker: 'Minji',   ko: '다리 위에 바람 진짜 세다. 안 추워?',              zh: '桥上风真大。不冷吗？' }],   blankSpeaker: '토리', choices: [{ ko: '바람은 세지만 안은 따뜻해.',            correct: true, zh: '风大但拥抱温暖。' }, { ko: '응, 얼어 죽겠어. 갈래.',    correct: false, zh: '嗯，冻死了，走了。（破坏气氛）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '双主题 은/는 + ~지만' },
    { type: 'dialogue', id: 'd82-sc-d3', lines: [{ speaker: 'Minji', ko: '토리, 진짜 컸다.',                       zh: '兔莉，真长大了。' }], blankSpeaker: '토리', choices: [{ ko: '앞으로 이런 걸로 냉전하지 말자. 서로 먼저 가자.',        correct: true, zh: '以后别再为这种事冷战。互相先低头。' }, { ko: '이번엔 내가 컸어. 다음엔 네 차례.',      correct: false, zh: '这次我长大。下次是你。（计较）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~지 말자 + ~자 · 约定' },

    { type: 'context', id: 'd82-sc-c1', ko: '바람은 세지만 안은 따뜻해.',   promptZh: '这句在和好场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 82 诗意名句 · 双主题 은/는 + ~지만 · 用"风冷/怀抱暖"的对照写出和好时刻的温度',       correct: true }, { zh: '抱怨风太大',          correct: false }, { zh: '说拥抱很冷',       correct: false }, { zh: '想快点回家',                correct: false }], explain: '双主题诗意对比' },
    { type: 'context', id: 'd82-sc-c2', ko: '한국에서 용기 내는 법을 배웠어.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"在韩国学会了鼓起勇气" · 呼应 Day 1 妈妈胡萝卜上的"용기"·82天后 Tori 真正理解并做到了先低头',       correct: true }, { zh: '在韩国忘了勇气',                correct: false }, { zh: '不需要勇气',                  correct: false }, { zh: '勇气没用',                correct: false }], explain: '呼应 Day 1 용기' },
  ],
};
