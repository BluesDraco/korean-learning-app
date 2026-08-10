import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 35 · 2-2 귀 트이기 · 方向 ~(으)로 · ~에서 ~까지 */
export const day35Listen: ListenSubQuestData = {
  day: 5, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '弘爪站站台 · 听清每一个方向',

  meaning: [
    { id: 'd35-l2-m1', audioKo: '2번 출구로 나가세요.',                              choices: [{ text: '请从 2 号出口出去。',    correct: true }, { text: '请去 2 号入口。',       correct: false }, { text: '请等 2 号列车。',      correct: false }, { text: '请上 2 号线。',         correct: false }], explain: '~로 = 往（无收音）· 나가다 = 出去' },
    { id: 'd35-l2-m2', audioKo: '왼쪽으로 쭉 가세요.',                               choices: [{ text: '往左一直走。',            correct: true }, { text: '往右一直走。',          correct: false }, { text: '一直站在左边。',        correct: false }, { text: '左转就到。',            correct: false }], explain: '왼쪽 有收音 → **으로** · 쭉 = 一直' },
    { id: 'd35-l2-m3', audioKo: '5분쯤 걸어요.',                                    choices: [{ text: '走大概 5 分钟。',         correct: true }, { text: '走了 5 分钟。',         correct: false }, { text: '要用 5 分钟。',        correct: false }, { text: '5 分钟内到。',          correct: false }], explain: '쯤 = 大约 · 걷다 → 걸어요（ㄷ 不规则）' },
    { id: 'd35-l2-m4', audioKo: '편의점 옆에 있어요.',                               choices: [{ text: '在便利店旁边。',          correct: true }, { text: '在便利店里面。',        correct: false }, { text: '就是那家便利店。',      correct: false }, { text: '不在便利店。',          correct: false }], explain: '옆에 = 在旁边（位置助词）' },
    { id: 'd35-l2-m5', audioKo: '집에서 학교까지 5분이에요.',                        choices: [{ text: '从家到学校 5 分钟。',     correct: true }, { text: '在家学习 5 分钟。',    correct: false }, { text: '学校离家 5 公里。',    correct: false }, { text: '要在 5 分钟内到学校。', correct: false }], explain: '에서 = 起点 · 까지 = 终点' },
  ],

  cloze: [
    { id: 'd35-l2-c1', audioKo: '왼쪽으로 가세요.',              clozeParts: ['왼쪽', ' 가세요.'],           choices: [{ text: '으로', correct: true }, { text: '로', correct: false }, { text: '에', correct: false }, { text: '에서', correct: false }], explain: '왼쪽 有收音 ㄱ → **으로**' },
    { id: 'd35-l2-c2', audioKo: '2번 출구로 나가세요.',           clozeParts: ['2번 출구', ' 나가세요.'],     choices: [{ text: '로', correct: true }, { text: '으로', correct: false }, { text: '에서', correct: false }, { text: '까지', correct: false }], explain: '출구 无收音 → **로**' },
    { id: 'd35-l2-c3', audioKo: '집에서 학교까지 5분이에요.',      clozeParts: ['집', ' 학교까지 5분이에요.'], choices: [{ text: '에서', correct: true }, { text: '에', correct: false }, { text: '로', correct: false }, { text: '부터', correct: false }], explain: '起点助词 = **에서**（动作起点）' },
    { id: 'd35-l2-c4', audioKo: '지하철역으로 가세요.',            clozeParts: ['지하철역', ' 가세요.'],       choices: [{ text: '으로', correct: true }, { text: '로', correct: false }, { text: '에', correct: false }, { text: '에서', correct: false }], explain: '지하철역 有收音 ㄱ → **으로**（ㄹ收音才用 로）' },
  ],

  reply: [
    { id: 'd35-l2-r1', audioKo: '한빛 어학당 어디예요?',                              promptZh: '海狸大叔问语学堂在哪，你想给完整指路，最标准的一句？',                       choices: [{ text: '2번 출구로 나가서, 왼쪽으로 쭉 가세요.',              correct: true }, { text: '2번 출구에 가세요.',                     correct: false }, { text: '왼쪽에 있어요.',                     correct: false }, { text: '몰라요.',                          correct: false }], explain: '完整方向 · 出口 + 方向 + 距离' },
    { id: 'd35-l2-r2', audioKo: '고마워요, 학생.',                                    promptZh: '海狸大叔道谢并鞠躬。你想礼貌回应"不客气，请慢走"，最自然的一句？',              choices: [{ text: '아니에요. 조심히 가세요.',                             correct: true }, { text: '고마워요, 감사합니다.',                   correct: false }, { text: '얼마예요?',                             correct: false }, { text: '싫어요.',                             correct: false }], explain: '아니에요 = 不客气 + 조심히 가세요 = 请慢走（对陌生长辈标配）' },
    { id: 'd35-l2-r3', audioKo: '지하철역이 어디예요?',                                promptZh: '有人问地铁站在哪，你想说"往右一直走 3 分钟"，最完整的一句？',                     choices: [{ text: '오른쪽으로 쭉 가면 3분쯤 걸어요.',                     correct: true }, { text: '오른쪽에 3분이에요.',                     correct: false }, { text: '오른쪽 가요.',                         correct: false }, { text: '몰라요.',                            correct: false }], explain: '방향 + 으로 + 쭉 가면 + 거리' },
  ],
};
