import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 52 · 2-5 Boss 战 · 🏃 弘爪街狂奔 */
export const day52Boss: BossSubQuestData = {
  day: 22, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '청춘의 관문',
  subtitle: '🏃 三人狂奔 · 围巾飞了',
  intro: '弘爪站 4 号出口。Junho 看表跳起来："14 분 남았어! 뛰어!" 你们三个人冲进霓虹灯里。Junho 围巾飞了，你胡萝卜笔掉了，Haru 边跑边笑。人潮往两边让 —— 这一段狂奔要用韩语说完 5 句话：状态因果、动作先后、命令回应、边跑边道谢。',
  outroHook: '会场门口三个人气喘吁吁地弯着腰笑。Junho 抱住膝盖："와 살아 있네 우리." 你抬头看看头顶的霓虹招牌 —— 이게 청춘이구나. 心里冒出这一句，用的是韩语。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd52-b5-t1', audioKo: '14분 남았어! 뛰어!',                choices: [{ text: '还剩 14 分钟！跑！',              correct: true }, { text: '还有 40 分钟，走。',              correct: false }, { text: '再等 14 分钟。',                    correct: false }, { text: '不用跑了。',                          correct: false }], explain: 'Junho 반말命令' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd52-b5-t2', audioKo: '숨차서 말을 못 하겠어.',            choices: [{ text: '喘得说不了话。',                    correct: true }, { text: '不喘所以能说话。',                    correct: false }, { text: '话太多了。',                          correct: false }, { text: '呼吸很好。',                          correct: false }], explain: '~아/어서 因果' } },
    { type: 'choice',  label: '动作先后',     task: { id: 'd52-b5-t3', promptZh: '"捡起笔然后又跑了起来"最自然的一句？',                                                                                                    choices: [{ text: '펜을 주우고 다시 뛰었어요.',           correct: false }, { text: '펜을 주워서 다시 뛰었어요.',    correct: true }, { text: '펜을 주웠어서 다시 뛰었어요.',        correct: false }, { text: '펜을 줍으니까 다시 뛰었어요.',           correct: false }], explain: '~아/어서 · 줍다 → 주워' } },
    { type: 'choice',  label: '命令连接',     task: { id: 'd52-b5-t4', promptZh: '"下雨了请带伞"哪句正确？',                                                                                                            choices: [{ text: '비가 와서 우산 가져가세요.',           correct: false }, { text: '비가 오니까 우산 가져가세요.', correct: true }, { text: '비가 오면 우산 가져가세요.',          correct: false }, { text: '비가 오지만 우산 가져가세요.',          correct: false }], explain: '后接命令 → ~(으)니까' } },
    { type: 'choice',  label: '认词',         task: { id: 'd52-b5-t5', promptKo: '떨어뜨리다', promptHangul: 'tteo-reo-tteu-ri-da',                                                                                    choices: [{ text: '弄掉（他动）',              correct: true }, { text: '掉（自动）',              correct: false }, { text: '扔',              correct: false }, { text: '藏',                     correct: false }], explain: '~뜨리다 是他动词后缀 · 自动 vs 他动' } },
    { type: 'compose', label: '组句',         task: { id: 'd52-b5-t6', zhHint: '喘得说不了话。',                                                                                                                    audioKo: '숨차서 말을 못 하겠어.',                       answer: ['숨차서', '말을', '못', '하겠어.'],                      tokens: ['숨차서', '말을', '못', '하겠어.', '숨차니까', '말이', '하고', '하겠어요.'],                            explain: '~아/어서 因果' } },
    { type: 'compose', label: '组句',         task: { id: 'd52-b5-t7', zhHint: '捡起笔然后又跑了起来。',                                                                                                              audioKo: '펜을 주워서 다시 뛰었어요.',                    answer: ['펜을', '주워서', '다시', '뛰었어요.'],                  tokens: ['펜을', '주워서', '다시', '뛰었어요.', '주우고', '주웠어서', '뛰어서', '펜이'],                          explain: '~아/어서 动作先后' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd52-b5-t8', promptZh: '三人狂奔到会场门口气喘吁吁。你想说"原来这就是青春啊"，最自然的一句？',                                                              choices: [{ text: '이게 청춘이구나.',                          correct: true }, { text: '이거 왜 이래.',                          correct: false }, { text: '이제 집에 가자.',                        correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 内心 · ~구나 감탄' } },
  ],
};
