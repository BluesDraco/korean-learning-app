import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 81 · 3-5 Boss 战 · 🎒 Minji와 싸움·冷战三天 · N(이)면 */
export const day81Boss: BossSubQuestData = {
  day: 21, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '냉전의 관문',
  subtitle: '🎒 자존심과 우정 · 먼저 손 내밀기',

  intro: '周四晚上。和 Minji 冷战第三天,起因是自习咖啡馆一个座位的小误会,谁都没先开口,整个班的气氛都僵了。你既生气又想她。深夜打给 Junho,他说"진짜 친구면 먼저 가"。你攥着胡萝卜笔上的"용기"想:自尊心哪有友情大。今天要用 N(이)면 想清楚:진짜 친구면 먼저 가 → 오해면 풀면 돼 → 자존심보다 우정이 커。',
  outroHook: '你决定明天先开口,约 Minji 在兽尔江大桥见。打破三天沉默的第一句话已经想好了。明天,桥上,风很大——但真心不会被风吹走。（Day 82 · 민지와 화해）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd81-b5-t1', audioKo: '진짜 친구면 먼저 가.',                                            choices: [{ text: '真朋友的话就先去（低头）。',                    correct: true }, { text: '不是朋友就别去。',                  correct: false }, { text: '朋友先走了。',              correct: false }, { text: '和朋友一起去。',              correct: false }], explain: 'Day 81 · N(이)면 身份条件' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd81-b5-t2', audioKo: '자존심보다 우정이 커요.',                                        choices: [{ text: '友情比自尊大。',                    correct: true }, { text: '自尊比友情大。',                  correct: false }, { text: '两个一样。',                    correct: false }, { text: '都不重要。',                  correct: false }], explain: '~보다 · 比较' } },
    { type: 'choice',  label: 'N(이)면',      task: { id: 'd81-b5-t3', promptZh: '"是学生的话就该学习"哪句正确？',                                                                                                                                    choices: [{ text: '학생면 공부해야 돼.',                     correct: false }, { text: '학생이면 공부해야 돼.',        correct: true }, { text: '학생으면 공부해야 돼.',              correct: false }, { text: '학생라면 공부해야 돼.',                 correct: false }], explain: '학생(有收音) + 이면' } },
    { type: 'choice',  label: 'N(이)면',      task: { id: 'd81-b5-t4', promptZh: '"是误会的话解开就好"哪句正确？',                                                                                                                                    choices: [{ text: '오해으면 풀면 돼.',                          correct: false }, { text: '오해면 풀면 돼.',    correct: true }, { text: '오해이면 풀으면 돼.',                    correct: false }, { text: '오해서 풀면 돼.',                    correct: false }], explain: '오해(无收音) + 면 · 풀다 → 풀면' } },
    { type: 'choice',  label: '认词',         task: { id: 'd81-b5-t5', promptKo: '자존심',    promptHangul: 'ja-jon-sim',                                                                                                                             choices: [{ text: '自尊心',                    correct: true }, { text: '好奇心',                            correct: false }, { text: '责任心',                            correct: false }, { text: '同情心',                              correct: false }], explain: '自(자) + 尊(존) + 心(심)' } },
    { type: 'compose', label: '组句',         task: { id: 'd81-b5-t6', zhHint: '真朋友的话先去。',                                                                                                                                            audioKo: '진짜 친구면 먼저 가.',                            answer: ['진짜', '친구면', '먼저', '가.'],   tokens: ['진짜', '친구면', '먼저', '가.', '친구이면', '친구라서', '가세요.'],         explain: 'N(无收音) + 면' } },
    { type: 'compose', label: '组句',         task: { id: 'd81-b5-t7', zhHint: '友情比自尊大的话就先去。',                                                                                                                                            audioKo: '우정이 자존심보다 크면 먼저 가.',                          answer: ['우정이', '자존심보다', '크면', '먼저', '가.'],                              tokens: ['우정이', '자존심보다', '크면', '먼저', '가.', '크서', '큰면', '가겠어.'],           explain: '~보다 + A(으)면' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd81-b5-t8', promptZh: 'Junho 劝你先低头。你想坚定地说"这次我先去是对的"，最自然的一句？',                                                                                            choices: [{ text: '괜찮아, 이번엔 내가 먼저 가는 게 맞아.',       correct: true }, { text: '민지가 먼저 오면 될 것 같아.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '냉전 계속 갈 거야.',                                correct: false }], explain: '~는 게 맞아 · 下决心' } },
  ],
};
