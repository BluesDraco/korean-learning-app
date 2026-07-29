import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 78 · 3-2 귀 트이기 · ~지만 · 제주도 조랑말과 귤 */
export const day78Listen: ListenSubQuestData = {
  day: 18, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '제주 목장 · 작지만 빨라요',

  meaning: [
    { id: 'd78-l2-m1', audioKo: '조랑말은 작지만 빨라요.',                                      choices: [{ text: '矮马虽小但快。',                          correct: true }, { text: '矮马又大又慢。',                    correct: false }, { text: '矮马很慢。',                        correct: false }, { text: '矮马不跑。',                        correct: false }], explain: '작지만 + 빨라요 · 对比' },
    { id: 'd78-l2-m2', audioKo: '이 귤은 작지만 향이 진해요.',                                    choices: [{ text: '这橘子虽小但香浓。',                      correct: true }, { text: '这橘子又大又淡。',                  correct: false }, { text: '这橘子没味道。',                    correct: false }, { text: '这橘子很酸。',                      correct: false }], explain: '작지만 + 향이 진하다' },
    { id: 'd78-l2-m3', audioKo: '이 귤 너 같아. 작고 향 진하고 달아.',                            choices: [{ text: '这橘子像你。小、香浓、甜。',              correct: true }, { text: '这橘子不像你。',                    correct: false }, { text: '你比橘子大。',                      correct: false }, { text: '橘子不甜。',                        correct: false }], explain: 'Haru 的比喻 · ~고 并列' },
    { id: 'd78-l2-m4', audioKo: '이 조랑말이 살아있는 증거예요.',                                  choices: [{ text: '这矮马是活的证据。',                      correct: true }, { text: '这矮马死了。',                      correct: false }, { text: '这是照片。',                        correct: false }, { text: '没有证据。',                        correct: false }], explain: '살아있는 + 증거' },
    { id: 'd78-l2-m5', audioKo: '한국은 좁지만 다양해요.',                                        choices: [{ text: '韩国虽窄但多样。',                        correct: true }, { text: '韩国又大又单调。',                  correct: false }, { text: '韩国很大。',                        correct: false }, { text: '韩国不多样。',                      correct: false }], explain: '좁지만 + 다양하다' },
  ],

  cloze: [
    { id: 'd78-l2-c1', audioKo: '조랑말은 작지만 빨라요.',    clozeParts: ['조랑말은 ', ' 빨라요.'],   choices: [{ text: '작지만', correct: true }, { text: '작아서',    correct: false }, { text: '작고',      correct: false }, { text: '작으면', correct: false }], explain: '对比 ~지만' },
    { id: 'd78-l2-c2', audioKo: '이 귤은 작지만 향이 진해요.',  clozeParts: ['이 귤은 작지만 향', ' 진해요.'], choices: [{ text: '이', correct: true }, { text: '을',  correct: false }, { text: '에',    correct: false }, { text: '으로',  correct: false }], explain: '향이 진하다 · 主格 이' },
    { id: 'd78-l2-c3', audioKo: '작고 향 진하고 달아요.',      clozeParts: ['작고 향 ', ' 달아요.'], choices: [{ text: '진하고',     correct: true }, { text: '진한고',      correct: false }, { text: '진해서',      correct: false }, { text: '진하지만',    correct: false }], explain: '并列 ~고 · 진하다 → 진하고' },
    { id: 'd78-l2-c4', audioKo: '귤 껍질을 벗겼어요.',          clozeParts: ['귤 껍질', ' 벗겼어요.'],             choices: [{ text: '을', correct: true }, { text: '이', correct: false }, { text: '에', correct: false }, { text: '은', correct: false }], explain: '껍질 + 宾格 을' },
  ],

  reply: [
    { id: 'd78-l2-r1', audioKo: '저 조랑말 어때?',                                              promptZh: 'Junho 问那匹矮马怎么样。你想说"虽小但真快"，最自然的一句？',                choices: [{ text: '작지만 진짜 빠르다.',                                          correct: true }, { text: '몰라.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '반말 + 작지만 빠르다' },
    { id: 'd78-l2-r2', audioKo: '이 귤 어때?',                                                  promptZh: '朋友问橘子怎么样。你想说"虽小但香浓又甜"，最自然的一句？',                    choices: [{ text: '작지만 향이 진하고 달아.',                                          correct: true }, { text: '맛이 하나도 없어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '작지만 + ~고 병렬' },
    { id: 'd78-l2-r3', audioKo: '이 귤 너 같아.',                                              promptZh: 'Haru 说这橘子像你。你想温柔回一句"谢谢，你比这橘子还甜"，最自然的一句？',                        choices: [{ text: '고마워. 넌 이 귤보다 훨씬 달아.',                                  correct: true }, { text: '나 귤 싫어해.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~보다 + 달다 · 温柔回应' },
  ],
};
