import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 52 · 2-2 귀 트이기 · ~아/어서 因果 · 动作先后 · 急迫感 */
export const day52Listen: ListenSubQuestData = {
  day: 22, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '弘爪街霓虹灯 · 三人狂奔',

  meaning: [
    { id: 'd52-l2-m1', audioKo: '14분 남았어! 뛰어!',                  choices: [{ text: '还剩 14 分钟！跑！',              correct: true }, { text: '还有 40 分钟，走。',                    correct: false }, { text: '再等 14 分钟。',                          correct: false }, { text: '不用跑了。',                          correct: false }], explain: 'Junho 반말命令 · 뛰어!' },
    { id: 'd52-l2-m2', audioKo: '아, 내 목도리! 떨어졌어!',              choices: [{ text: '啊，我的围巾！掉了！',             correct: true }, { text: '啊，围巾在这。',                          correct: false }, { text: '围巾要买。',                              correct: false }, { text: '围巾好丑。',                            correct: false }], explain: '떨어지다 自动 · 围巾自己掉了' },
    { id: 'd52-l2-m3', audioKo: '토리, 이거! 당근 펜 떨어뜨렸어.',      choices: [{ text: '兔莉，这个！你弄掉了胡萝卜笔。', correct: true }, { text: '兔莉，请扔胡萝卜笔。',                    correct: false }, { text: '胡萝卜笔要还我。',                        correct: false }, { text: '这是你的笔吗？',                          correct: false }], explain: '떨어뜨리다 他动 · 你把它弄掉了' },
    { id: 'd52-l2-m4', audioKo: '숨차서 말을 못 하겠어.',                 choices: [{ text: '喘得说不了话。',                    correct: true }, { text: '不喘所以能说话。',                          correct: false }, { text: '话太多了。',                              correct: false }, { text: '呼吸很好。',                          correct: false }], explain: '~아/어서 状态 → 结果' },
    { id: 'd52-l2-m5', audioKo: '이게 청춘이구나.',                       choices: [{ text: '原来这就是青春啊。',                correct: true }, { text: '青春没什么。',                              correct: false }, { text: '青春过了。',                              correct: false }, { text: '要青春吗？',                          correct: false }], explain: 'Tori 心里 · ~구나 감탄' },
  ],

  cloze: [
    { id: 'd52-l2-c1', audioKo: '숨차서 말을 못 하겠어.',        clozeParts: ['숨차', ' 말을 못 하겠어.'],       choices: [{ text: '서',   correct: true }, { text: '고',   correct: false }, { text: '면',   correct: false }, { text: '니까', correct: false }], explain: '状态因果 → ~아/어서' },
    { id: 'd52-l2-c2', audioKo: '펜을 주워서 다시 뛰었어요.',    clozeParts: ['펜을 ', ' 다시 뛰었어요.'],       choices: [{ text: '주워서', correct: true }, { text: '주우고', correct: false }, { text: '주웠어서', correct: false }, { text: '주우면', correct: false }], explain: '动作先后 · 줍다 → 주워' },
    { id: 'd52-l2-c3', audioKo: '뛰어서 늦지 않았어요.',          clozeParts: ['', ' 늦지 않았어요.'],           choices: [{ text: '뛰어서', correct: true }, { text: '뛰었어서', correct: false }, { text: '뛰고서',   correct: false }, { text: '뛰어야',   correct: false }], explain: '前面永远原形 · 时态在句尾' },
    { id: 'd52-l2-c4', audioKo: '비가 오니까 우산 가져가세요.',    clozeParts: ['비가 ', ' 우산 가져가세요.'],   choices: [{ text: '오니까', correct: true }, { text: '와서',   correct: false }, { text: '오면',   correct: false }, { text: '오지만', correct: false }], explain: '后接命令 · ~(으)니까' },
  ],

  reply: [
    { id: 'd52-l2-r1', audioKo: '아, 내 목도리! 떨어졌어!',                 promptZh: 'Junho 围巾掉了但没时间捡。你想说"下次再买就行！跑！"，最自然的一句？', choices: [{ text: '준호야, 다음에 사면 돼! 뛰어!',                     correct: true }, { text: '주우러 가!',                              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라!',                                    correct: false }], explain: 'Tori 原句 · ~면 돼' },
    { id: 'd52-l2-r2', audioKo: '토리, 이거! 당근 펜 떨어뜨렸어.',          promptZh: 'Haru 捡起你的胡萝卜笔。你想边跑边道谢，最自然的一句？',                choices: [{ text: '고마워! 이따 얘기하자! 뛰어!',                       correct: true }, { text: '너 가져.',                                correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: '边跑边简短应答' },
    { id: 'd52-l2-r3', audioKo: '토리, 왜 이렇게 급했어?',                    promptZh: '朋友问你为什么这么急。你想解释"因为要赶签售会"，最自然的一句？',           choices: [{ text: '팬사인회에 늦지 않으려고 뛰어야 했어.',                 correct: true }, { text: '팬사인회에 관심 없어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: '~(으)려고 + ~아/어야 · 目的 + 义务' },
  ],
};
