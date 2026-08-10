import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 76 · 3-5 Boss 战 · 🎒 여행 归来·旅行的意义 · ~았/었지만 + 부사 */
export const day76Boss: BossSubQuestData = {
  day: 16, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '여행의 의미의 관문',
  subtitle: '🎒 KTX 창가 · 여행 후기 · 성장 정리',

  intro: '晚上。回首尔的 KTX 上，窗外天渐黑，玻璃映出四个人的脸。Junho 打着呼睡着，Minji 戴着耳机，Haru 转过头问你"이번 여행 어땠어?"。你把两天的海、方言、独自问路在心里整理成一句句话。今天要用 ~았/었지만 + 程度副词说出旅行的密度：짧았지만 진하게 배웠어 → 힘들었지만 즐겁게 걸었어 → 더 큰 자신을 데려왔어。',
  outroHook: '首尔站到站广播响起，Junho 揉着眼睛醒来："벌써 도착? KTX 진짜 빠르네." 你笑了——快的不只是 KTX。明天学校要做旅行计划发表，这次你想设计一条제주도的路线。（Day 77 · 여행 계획 발표）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd76-b5-t1', audioKo: '짧았지만 진하게 배웠어요.',                                            choices: [{ text: '虽短但学得浓。',                    correct: true }, { text: '又短又没学到。',                  correct: false }, { text: '很长学得多。',              correct: false }, { text: '没时间学。',              correct: false }], explain: 'Day 76 旅行后记句 · ~았지만 + 부사' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd76-b5-t2', audioKo: '더 큰 자신을 데려왔어요.',                                        choices: [{ text: '带回了更大的自己。',                    correct: true }, { text: '带了朋友来。',                  correct: false }, { text: '把自己留下了。',                    correct: false }, { text: '忘了自己。',                  correct: false }], explain: '더 큰 자신 + 데려오다' } },
    { type: 'choice',  label: '~았/었지만',   task: { id: 'd76-b5-t3', promptZh: '"（当时）虽累但走得快乐"哪句正确？',                                                                                                                                    choices: [{ text: '힘들지만 즐거워서 걸었어요.',                     correct: false }, { text: '힘들었지만 즐겁게 걸었어요.',        correct: true }, { text: '힘들었지만 즐겁하게 걸었어요.',              correct: false }, { text: '힘들어서 즐겁게 걸었어요.',                 correct: false }], explain: '过去转折 힘들었지만 + 副词 즐겁게' } },
    { type: 'choice',  label: '~았/었지만',   task: { id: 'd76-b5-t4', promptZh: '"（当时）虽怕但勇敢站出来了"哪句正确？',                                                                                                                                    choices: [{ text: '무섭지만 용감하게 나섰어요.',                          correct: false }, { text: '무서웠지만 용감하게 나섰어요.',    correct: true }, { text: '무서웠지만 용감으로 나섰어요.',                    correct: false }, { text: '무서었지만 용감하게 나섰어요.',                    correct: false }], explain: 'ㅂ불규칙 무서웠지만 + 용감하게' } },
    { type: 'choice',  label: '认词',         task: { id: 'd76-b5-t5', promptKo: '기념품',    promptHangul: 'gi-nyeom-pum',                                                                                                                             choices: [{ text: '纪念品',                    correct: true }, { text: '化妆品',                            correct: false }, { text: '食品',                            correct: false }, { text: '样品',                              correct: false }], explain: '纪(기) + 念(념) + 品(품)' } },
    { type: 'compose', label: '组句',         task: { id: 'd76-b5-t6', zhHint: '虽短但学得浓。',                                                                                                                                            audioKo: '짧았지만 진하게 배웠어요.',                            answer: ['짧았지만', '진하게', '배웠어요.'],   tokens: ['짧았지만', '진하게', '배웠어요.', '짧아서', '진하지만', '배울 거예요.'],         explain: 'Day 76 旅行后记句' } },
    { type: 'compose', label: '组句',         task: { id: 'd76-b5-t7', zhHint: '虽小但取得了大成功。',                                                                                                                                            audioKo: '작았지만 크게 성공했어요.',                          answer: ['작았지만', '크게', '성공했어요.'],                              tokens: ['작았지만', '크게', '성공했어요.', '작아서', '크지만', '성공할 거예요.'],           explain: '작았지만 + 크게' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd76-b5-t8', promptZh: 'Haru 夸你"많이 컸다"，你想说这也有 Haru 的功劳，最自然的一句？',                                                                                            choices: [{ text: '하루가 옆에 있어줘서 그래.',       correct: true }, { text: '내가 원래 큰 사람이야.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                correct: false }], explain: '~아 줘서 그래 · 感谢对方' } },
  ],
};
