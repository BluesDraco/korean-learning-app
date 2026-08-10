import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 2-5 Boss 战 · 📦 妈妈的包裹 */
export const day36Boss: BossSubQuestData = {
  day: 6, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '소포의 관문',
  subtitle: '📦 从中国来的箱子',
  intro: '值班室柜子后面搬出一个箱子。中文四个字："中国→韩国·易碎小心"。你抱回房间打开——火锅底料两袋、干辣椒一大包、花椒、香菜种子、一封手写的三行信。红彤彤的一坨坨堆在地板上。今天要用韩语说清妈妈的每一份心意。',
  outroHook: 'Haru 坐下来，把她的手掌放在辣椒粉袋上，笑了："나 매운 거 잘 먹어. 언제 훠궈 할래?" (我能吃辣。什么时候火锅？) 明天的约定，从今晚的箱子里长出来了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd36-b5-t1', audioKo: '엄마가 소포를 보내주셨어요.',      choices: [{ text: '妈妈给我寄了包裹。',                       correct: true }, { text: '妈妈收到了包裹。',              correct: false }, { text: '妈妈让我寄包裹。',           correct: false }, { text: '妈妈想寄包裹。',              correct: false }], explain: '敬语过去时 ~아/어 주셨어요' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd36-b5-t2', audioKo: '경비실에서 소포를 찾았어요.',      choices: [{ text: '在值班室拿到了包裹。',                     correct: true }, { text: '在值班室弄丢了包裹。',            correct: false }, { text: '值班室送来了包裹。',              correct: false }, { text: '找不到值班室。',                  correct: false }], explain: '에서 动作发生地 · 찾다 领取' } },
    { type: 'choice',  label: '方向判定',     task: { id: 'd36-b5-t3', promptZh: '"我给妈妈寄了包裹"哪句正确？',                                                                                                                          choices: [{ text: '엄마한테 소포를 보내주셨어요.',              correct: false }, { text: '엄마한테 소포를 보내드렸어요.',  correct: true }, { text: '엄마한테 소포를 보내줬어요.',    correct: false }, { text: '엄마가 소포를 보내드렸어요.',       correct: false }], explain: '我给长辈 → **드리다**' } },
    { type: 'choice',  label: '敬语层级',     task: { id: 'd36-b5-t4', promptZh: '"爸爸给我写了卡片（强调"为我"做）"哪句最贴切？',                                                                                                        choices: [{ text: '아빠가 카드를 쓰셨어요.',                     correct: false }, { text: '아빠가 카드를 써주셨어요.',       correct: true }, { text: '아빠가 카드를 썼어요.',            correct: false }, { text: '아빠가 카드를 써드렸어요.',         correct: false }], explain: '~아/어 주셨어요 强调心意' } },
    { type: 'choice',  label: '认词',         task: { id: 'd36-b5-t5', promptKo: '경비실', promptHangul: 'gyeong-bi-sil',                                                                                                                    choices: [{ text: '值班室',                        correct: true }, { text: '教室',                          correct: false }, { text: '洗手间',                          correct: false }, { text: '厨房',                              correct: false }], explain: '警备(경비) + 室(실)' } },
    { type: 'compose', label: '组句',         task: { id: 'd36-b5-t6', zhHint: '妈妈给我寄了包裹。',                                                                                                             audioKo: '엄마가 소포를 보내주셨어요.',     answer: ['엄마가', '소포를', '보내주셨어요.'], tokens: ['엄마가', '소포를', '보내주셨어요.', '보내줬어요.', '보내드렸어요.', '보냈어요.', '엄마한테'], explain: '主语 엄마가 + 宾语 소포를 + 敬语过去 주셨어요' } },
    { type: 'compose', label: '组句',         task: { id: 'd36-b5-t7', zhHint: '在值班室拿到了包裹。',                                                                                                             audioKo: '경비실에서 소포를 찾았어요.',      answer: ['경비실에서', '소포를', '찾았어요.'], tokens: ['경비실에서', '소포를', '찾았어요.', '경비실에', '경비실로', '소포가', '찾으셨어요.'],           explain: '에서 = 动作发生地' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd36-b5-t8', promptZh: 'Haru 敲门问 "토리, 우는 거야?"。你想强撑说没有，最自然的一句？',                                                                choices: [{ text: '아니야, 웃는 거야.',                       correct: true }, { text: '응, 자고 있어.',                    correct: false }, { text: '몰라, 얼마예요?',                    correct: false }, { text: '싫어, 저리 가.',                    correct: false }], explain: 'Tori 原句 · 반말로 강한 감정 담기' } },
  ],
};
