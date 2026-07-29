import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 81 · 3-4 상황 속으로 · Minji와 싸움·冷战三天 */
export const day81Scene: SceneSubQuestData = {
  day: 21, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '냉전 · 자존심과 우정 · 먼저 손 내밀기',

  tasks: [
    { type: 'situation', id: 'd81-sc-s1', scenario: 'Junho 劝你"是真朋友的话就先低头"，你想附和这个道理，哪句最合适？',                                                     choices: [{ ko: '맞아, 진짜 친구면 내가 먼저 가야지.',                zh: '对，真朋友的话我该先去。', correct: true }, { ko: '맞아, 진짜 친구이면 내가 먼저 가야지.',            zh: '错——친구无收音应用 친구면。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: 'N(无收音) + 면' },
    { type: 'situation', id: 'd81-sc-s2', scenario: '想跟自己说"友情比自尊大"来下决心，哪句最合适？',                                     choices: [{ ko: '자존심보다 우정이 더 커.',      zh: '友情比自尊更大。',              correct: true }, { ko: '우정보다 자존심이 더 커.',                  zh: '自尊比友情大。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~보다 · 比较' },
    { type: 'situation', id: 'd81-sc-s3', scenario: '想给 Minji 发消息约在兽尔江大桥见，打破冷战，哪句最合适？',                                                      choices: [{ ko: '민지야, 오늘 끝나고 한강 다리에서 잠깐 볼래?',      zh: '民智，今天结束后去兽尔江大桥见一面好吗？',              correct: true }, { ko: '민지야, 니가 먼저 와.',      zh: '民智，你先来。（不像和好）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~(으)ㄹ래? · 提议见面' },

    { type: 'dialogue', id: 'd81-sc-d1', lines: [{ speaker: 'Junho',   ko: '먼저 사과하기 싫지?',                zh: '不想先道歉吧？' }], blankSpeaker: '토리', choices: [{ ko: '자존심 상하지만, 진짜 친구면 내가 먼저 가야지.',            correct: true, zh: '虽然伤自尊，但真朋友的话我该先去。' }, { ko: '응, 죽어도 안 가.',       correct: false, zh: '嗯，死也不去。（跑题）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '~지만 + N(이)면' },
    { type: 'dialogue', id: 'd81-sc-d2', lines: [{ speaker: 'Junho',   ko: '진짜 친구면 먼저 가.',              zh: '真朋友的话先去。' }],   blankSpeaker: '토리', choices: [{ ko: '알았어. 이번엔 내가 먼저 가는 게 맞아.',            correct: true, zh: '知道了。这次我先去是对的。' }, { ko: '싫어, 민지가 먼저 와야 돼.',    correct: false, zh: '不，Minji得先来。（跑题）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '接受劝告 · 下决心' },
    { type: 'dialogue', id: 'd81-sc-d3', lines: [{ speaker: 'Haru', ko: '토리, 마음 어때?',                       zh: '兔莉，心里怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '화나면서도 그리워. 오해면 풀면 되잖아.',        correct: true, zh: '生气又想她。是误会的话解开就好嘛。' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: 'N면 + V(으)면' },

    { type: 'context', id: 'd81-sc-c1', ko: '진짜 친구면 먼저 가.',   promptZh: '这句在冷战场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 81 关键句 · N(이)면 身份条件 · Junho 点醒 Tori："如果是真朋友，就该放下自尊先低头"',       correct: true }, { zh: '劝 Tori 别理 Minji',          correct: false }, { zh: '说 Minji 不是朋友',       correct: false }, { zh: '让 Tori 先走开',                correct: false }], explain: 'N(이)면 · 身份条件' },
    { type: 'context', id: 'd81-sc-c2', ko: '자존심보다 우정이 커요.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"友情比自尊大" · ~보다 比较 · Tori 放下自尊、决定先和好的心理转折',       correct: true }, { zh: '自尊最重要',                correct: false }, { zh: '不在乎友情',                  correct: false }, { zh: '两个都不要',                correct: false }], explain: '~보다 · 心理转折' },
  ],
};
