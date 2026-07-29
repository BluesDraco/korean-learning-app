import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 78 · 3-4 상황 속으로 · 제주도·矮马和橘子 */
export const day78Scene: SceneSubQuestData = {
  day: 18, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '제주 목장 · 조랑말과 귤 · 자기 은유',

  tasks: [
    { type: 'situation', id: 'd78-sc-s1', scenario: '看到矮马跑起来，想说"虽小但真快"，哪句最合适？',                                                     choices: [{ ko: '작지만 진짜 빨라요.',                zh: '虽小但真快。', correct: true }, { ko: '작아서 빨라요.',            zh: '因为小所以快。（因果，语义偏）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '对比 ~지만' },
    { type: 'situation', id: 'd78-sc-s2', scenario: '想跟朋友说"这橘子虽小但香浓"，哪句最合适？',                                     choices: [{ ko: '이 귤은 작지만 향이 진해요.',      zh: '这橘子虽小但香浓。',              correct: true }, { ko: '이 귤은 작지만 향을 진해요.',                  zh: '错——향用主格 이/가。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '작지만 + 향이 진하다' },
    { type: 'situation', id: 'd78-sc-s3', scenario: '想用一句概括矮马"这就是『虽小但强』的活证据"，哪句最合适？',                                                      choices: [{ ko: '이 조랑말이 "작지만 강하다"의 살아있는 증거예요.',      zh: '这矮马就是"虽小但强"的活证据。',              correct: true }, { ko: '이 조랑말이 증거를 살아있어요.',      zh: '错——助词/语序乱。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '살아있는 증거 · 呼应 Day 70' },

    { type: 'dialogue', id: 'd78-sc-d1', lines: [{ speaker: '준호',   ko: '토리, 저 말 봐. 작지만 진짜 빠르지?',                zh: '兔莉，看那匹马。虽小但真快吧？' }], blankSpeaker: '토리', choices: [{ ko: '응, "작지만 강하다"의 증거 같아.',            correct: true, zh: '嗯，像是"虽小但强"的证据。' }, { ko: '아니, 말 안 보여.',       correct: false, zh: '不，看不到马。（语义反）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '呼应 Day 70 命题' },
    { type: 'dialogue', id: 'd78-sc-d2', lines: [{ speaker: '하루',   ko: '토리, 이 귤 너 같아. 작고 향 진하고 달아.',              zh: '兔莉，这橘子像你。小、香浓、甜。' }],   blankSpeaker: '토리', choices: [{ ko: '고마워. 넌 이 귤보다 훨씬 달아.',            correct: true, zh: '谢谢。你比这橘子还甜。' }, { ko: '나 귤 싫어해.',    correct: false, zh: '我讨厌橘子。（跑题）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '~보다 + 温柔回应' },
    { type: 'dialogue', id: 'd78-sc-d3', lines: [{ speaker: '다니엘', ko: '제주도 어때요?',                       zh: '济州岛怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '작지만 볼 게 정말 많더라고요.',        correct: true, zh: '虽小但真的很多可看的。' }, { ko: '싫어요, 저리 가요.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '작지만 + 见闻' },

    { type: 'context', id: 'd78-sc-c1', ko: '작지만 빠르다.',   promptZh: '这句在济州牧场场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 78 自我隐喻 · ~지만 对比 · 矮马"虽小但快"活出了 Day 70"작지만 강하다"的命题，Tori 觉得自己也像它',       correct: true }, { zh: '嫌矮马太慢',          correct: false }, { zh: '命令矮马跑',       correct: false }, { zh: '矮马又大又快',                correct: false }], explain: '~지만 · 自我隐喻' },
    { type: 'context', id: 'd78-sc-c2', ko: '작고 향 진하고 달아.', promptZh: '这句（Haru 形容橘子/Tori）的意义，哪句最准确？',                                                                     choices: [{ zh: '"小、香浓、甜" · ~고 并列三个特性 · Haru 用橘子比喻 Tori，温柔的认可',       correct: true }, { zh: '说橘子很难吃',                correct: false }, { zh: '嫌 Tori 太小',                  correct: false }, { zh: '橘子又大又淡',                correct: false }], explain: '~고 并列 · 比喻' },
  ],
};
