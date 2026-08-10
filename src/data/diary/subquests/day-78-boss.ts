import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 78 · 3-5 Boss 战 · 🎒 제주도·矮马和橘子 · ~지만 */
export const day78Boss: BossSubQuestData = {
  day: 18, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '제주도의 관문',
  subtitle: '🎒 제주 목장 · 조랑말과 귤 · 자기 은유',

  intro: '周五下午。济州岛挟才海边的小牧场，黑色火山石墙围着。一匹济州矮马跑起来——这么小，跑得这么快。你想起 Day 70 辩论赛说过的"작지만 강하다"，此刻活生生成立了。小卖部买了一袋橘子，剥开香气四散，Haru 递来一颗说"이 귤 너 같아"。今天要用 ~지만 说出这些对比：작지만 빨라요 → 작지만 향이 진해요 → 좁지만 다양해요。',
  outroHook: '你剥了颗橘子递给 Haru，想不出该怎么回她。矮马和橘子——今天你遇见了两个和自己相似的存在。明天，在济州岛你会不会又迷路呢？如果迷路了，这次的你会怎么做？（Day 79 · 제주 미로）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd78-b5-t1', audioKo: '조랑말은 작지만 빨라요.',                                            choices: [{ text: '矮马虽小但快。',                    correct: true }, { text: '矮马又大又慢。',                  correct: false }, { text: '矮马很慢。',              correct: false }, { text: '矮马不跑。',              correct: false }], explain: 'Day 78 · 작지만 + 빨라요' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd78-b5-t2', audioKo: '이 귤은 작지만 향이 진해요.',                                        choices: [{ text: '这橘子虽小但香浓。',                    correct: true }, { text: '这橘子又大又淡。',                  correct: false }, { text: '这橘子没味道。',                    correct: false }, { text: '这橘子很酸。',                  correct: false }], explain: '작지만 + 향이 진하다' } },
    { type: 'choice',  label: '~지만',        task: { id: 'd78-b5-t3', promptZh: '"（矮马）虽小但快"哪句正确？',                                                                                                                                    choices: [{ text: '작아지만 빨라요.',                     correct: false }, { text: '작지만 빨라요.',        correct: true }, { text: '작을지만 빨라요.',              correct: false }, { text: '작는지만 빨라요.',                 correct: false }], explain: '词干直接 + 지만 · 작지만' } },
    { type: 'choice',  label: '~고 병렬',      task: { id: 'd78-b5-t4', promptZh: '"小、香浓、又甜"（并列）哪句正确？',                                                                                                                                    choices: [{ text: '작고 향 진한고 달아.',                          correct: false }, { text: '작고 향 진하고 달아.',    correct: true }, { text: '작아고 향 진하고 달아.',                    correct: false }, { text: '작지만 향 진하고 달아.',                    correct: false }], explain: '并列 ~고 · 진하다 → 진하고' } },
    { type: 'choice',  label: '认词',         task: { id: 'd78-b5-t5', promptKo: '조랑말',    promptHangul: 'jo-rang-mal',                                                                                                                             choices: [{ text: '矮马 / 小马',                    correct: true }, { text: '骆驼',                            correct: false }, { text: '斑马',                            correct: false }, { text: '驴',                              correct: false }], explain: '제주도 대표 동물' } },
    { type: 'compose', label: '组句',         task: { id: 'd78-b5-t6', zhHint: '虽小但快。',                                                                                                                                            audioKo: '작지만 빨라요.',                            answer: ['작지만', '빨라요.'],   tokens: ['작지만', '빨라요.', '작아서', '느려요.', '작고', '빠를까요?'],         explain: 'A + 지만 · 对比' } },
    { type: 'compose', label: '组句',         task: { id: 'd78-b5-t7', zhHint: '这橘子虽小但香浓。',                                                                                                                                            audioKo: '이 귤은 작지만 향이 진해요.',                          answer: ['이 귤은', '작지만', '향이', '진해요.'],                              tokens: ['이 귤은', '작지만', '향이', '진해요.', '작아서', '향을', '진한다.'],           explain: '작지만 + 향이 진하다' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd78-b5-t8', promptZh: 'Haru 说这橘子像你（小、香浓、甜）。你想温柔回一句，最自然的一句？',                                                                                            choices: [{ text: '고마워. 넌 이 귤보다 훨씬 달아.',       correct: true }, { text: '나 귤 싫어해.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                correct: false }], explain: '~보다 + 温柔回应' } },
  ],
};
