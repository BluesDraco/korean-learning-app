import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 83 · 3-4 상황 속으로 · Haru의 真相 */
export const day83Scene: SceneSubQuestData = {
  day: 23, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '301호 · 유자차 · 조심스러운 대화',

  tasks: [
    { type: 'situation', id: 'd83-sc-s1', scenario: 'Haru 说以后再讲那个朋友的结局，你想温柔地表示愿意等，哪句最合适？',                                                     choices: [{ ko: '괜찮아. 기다릴게. 서두르지 않을게.',                zh: '没事，我等，不催你。', correct: true }, { ko: '지금 당장 다 말해.',            zh: '现在立刻全说。（逼问）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '기다릴게 + 서두르지 않을게' },
    { type: 'situation', id: 'd83-sc-s2', scenario: 'Haru 想说但只能说一部分，你想替她把话收住、说"今天到这里就够了"，哪句最合适？',                                     choices: [{ ko: '오늘은 여기까지면 돼. 나중에 말해 줘.',      zh: '今天到这里就够了。以后再告诉我。',              correct: true }, { ko: '오늘은 여기부터 시작해.',                  zh: '今天从这里开始。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~까지 · 限度 + 나중에 承诺' },
    { type: 'situation', id: 'd83-sc-s3', scenario: '想小心翼翼地问那个朋友现在过得好吗，哪句最合适？',                                                      choices: [{ ko: '조심스럽지만, 그 친구는 잘 지내?',      zh: '虽然有点冒昧，那朋友过得好吗？',              correct: true }, { ko: '그 친구 왜 말 안 해? 빨리 말해.',      zh: '那朋友怎么不说？快说。（逼问）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '조심스럽지만 · 委婉' },

    { type: 'dialogue', id: 'd83-sc-d1', lines: [{ speaker: 'Haru',   ko: '그 친구도 용기라고 쓴 당근을 갖고 있었어.',                zh: '那朋友也带着写着「勇气」的胡萝卜。' }], blankSpeaker: '토리', choices: [{ ko: '그 친구는 지금 어디에 있어?',            correct: true, zh: '那朋友现在在哪？' }, { ko: '당근 나 줘.',       correct: false, zh: '胡萝卜给我。（跑题）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '追问 · 소심한 궁금함' },
    { type: 'dialogue', id: 'd83-sc-d2', lines: [{ speaker: 'Haru',   ko: '나중에 말해 줄게. 오늘은 여기까지야.',              zh: '以后再告诉你。今天到这里。' }],   blankSpeaker: '토리', choices: [{ ko: '괜찮아. 기다릴게.',            correct: true, zh: '没事，我等。' }, { ko: '아니, 지금 말해야 돼.',    correct: false, zh: '不，现在必须说。（逼问）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '尊重对方 · 기다릴게' },
    { type: 'dialogue', id: 'd83-sc-d3', lines: [{ speaker: 'Haru', ko: '더 말 못 해 줘서 미안해. 나 원망해?',                       zh: '不能多告诉你，抱歉。会怪我吗？' }], blankSpeaker: '토리', choices: [{ ko: '아니야. 네가 말하고 싶을 때 말해 줘.',        correct: true, zh: '不会。你想说的时候再告诉我。' }, { ko: '응, 좀 서운해.',      correct: false, zh: '嗯，有点失落。（不体贴）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~아/어 줘 · 体贴' },

    { type: 'context', id: 'd83-sc-c1', ko: '나중에 말해 줄게.',   promptZh: '这句（Haru 说的）在场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 83 关键句 · 나중에 + ~아/어 줄게 · Haru 承诺以后会说，是 Day 34 那句的进一步——信任在慢慢打开',       correct: true }, { zh: '永远不说',          correct: false }, { zh: '现在就说',       correct: false }, { zh: '让 Tori 说',                correct: false }], explain: '나중에 + 承诺' },
    { type: 'context', id: 'd83-sc-c2', ko: '오늘 말할 수 있는 건 여기까지야.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"今天能说的到这里为止" · ~까지 表限度 · Haru 划出今天的界限,Tori 选择尊重、不逼问',       correct: true }, { zh: '今天什么都能说',                correct: false }, { zh: '从这里开始说',                  correct: false }, { zh: '再也不说了',                correct: false }], explain: '~까지 · 限度' },
  ],
};
