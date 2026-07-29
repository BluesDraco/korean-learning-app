import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 57 · 2-3 문법 탐험 · 편지 문체 · ~에게/~께 · 반사실적 가정 */
export const day57Grammar: GrammarSubQuestData = {
  day: 27, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '书面感情句：편지 문체 · 반사실적 가정',

  fix: [
    { id: 'd57-g3-f1', promptKo: '민지께 편지를 썼어요.',                     promptZh: '"给 Minji 写了信"（平辈朋友）哪句正确？',    choices: [{ text: '민지께 편지를 썼어요.',                     correct: false }, { text: '민지에게 편지를 썼어요.',            correct: true }, { text: '민지한테서 편지를 썼어요.',            correct: false }, { text: '민지에서 편지를 썼어요.',                correct: false }], explain: '平辈 → ~에게 · ~께 是长辈用（Minji 是朋友，用에게）' },
    { id: 'd57-g3-f2', promptKo: '너 없으면 나 아직 뒤에서 앉아 있어.',        promptZh: '"没有你我还坐在教室后面"（反事实）哪句最贴切？', choices: [{ text: '너 없으면 나 아직 뒤에서 앉아 있어.',        correct: false }, { text: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', correct: true }, { text: '너 없어서 나 아직 뒤에서 앉아 있어.',        correct: false }, { text: '너 없이 나 아직 뒤에서 앉아 있을 거야.',           correct: false }], explain: '반사실적 · ~았/었으면 + ~았/었을 거야' },
    { id: 'd57-g3-f3', promptKo: '서두르지 안할게.',                          promptZh: '"不催你"哪句正确？',                          choices: [{ text: '서두르지 안할게.',                          correct: false }, { text: '서두르지 않을게.',                    correct: true }, { text: '서두르 안 할게.',                        correct: false }, { text: '서두르지 못할게.',                          correct: false }], explain: '否定 · ~지 **않**을게（不是 안할게 / 못할게）' },
    { id: 'd57-g3-f4', promptKo: '준호는 KPOP 얘기하면 멈출 알아요.',           promptZh: '"Junho 一说 KPOP 就停不下来"哪句正确？',    choices: [{ text: '준호는 KPOP 얘기하면 멈출 알아요.',           correct: false }, { text: '준호는 KPOP 얘기하면 멈출 줄 몰라요.', correct: true }, { text: '준호는 KPOP 얘기하면 멈추지 못해요.',       correct: false }, { text: '준호는 KPOP 얘기하면 멈추면 돼요.',              correct: false }], explain: '~ㄹ 줄 모르다 = 不会 / 不懂' },
    { id: 'd57-g3-f5', promptKo: '편지 서명 위치는?',                          promptZh: '关于韩式书信落款，哪句最准确？',              choices: [{ text: '서명은 편지 처음에 씁니다.',                  correct: false }, { text: '서명 = 이름 + "올림/드림/가" · 편지 **최하단**에 씀', correct: true }, { text: '서명은 봉투에만 씁니다.',                              correct: false }, { text: '서명은 필요 없습니다.',                                correct: false }], explain: '韩式书信 · 落款在最下方' },
  ],

  compose: [
    { id: 'd57-g3-c1', zhHint: '给 Minji，真的谢谢。',                    audioKo: '민지에게, 진짜 고마워요.',                   answer: ['민지에게,', '진짜', '고마워요.'],                        tokens: ['민지에게,', '진짜', '고마워요.', '민지께,', '민지에서,', '고마워', '고맙습니다.'],                    explain: '书信开头 · ~에게' },
    { id: 'd57-g3-c2', zhHint: '没有你我还坐在教室后面。',                audioKo: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', answer: ['너', '없었으면', '나', '아직', '뒤에서', '앉아', '있었을 거야.'], tokens: ['너', '없었으면', '나', '아직', '뒤에서', '앉아', '있었을 거야.', '없으면', '있어', '앞에서'], explain: '반사실적 가정' },
    { id: 'd57-g3-c3', zhHint: '不催你。什么时候都行。',                  audioKo: '서두르지 않을게. 언제든 괜찮아.',            answer: ['서두르지', '않을게.', '언제든', '괜찮아.'],              tokens: ['서두르지', '않을게.', '언제든', '괜찮아.', '안 할게.', '못 할게.', '언제나', '괜찮은'],                explain: 'Tori 承诺' },
    { id: 'd57-g3-c4', zhHint: 'Haru 的回答总是短又深。',                  audioKo: '하루의 답은 늘 짧고 깊어요.',                answer: ['하루의', '답은', '늘', '짧고', '깊어요.'],              tokens: ['하루의', '답은', '늘', '짧고', '깊어요.', '항상', '길고', '얕고', '없어요.'],                          explain: '~고 并列 · 感性描述' },
  ],

  rule: [
    { id: 'd57-g3-r1', promptZh: '关于「~에게 vs ~께」的用法，哪句最准确？', choices: [{ text: '~에게 = 平辈 / 晚辈 · ~께 = 长辈 · 书信开头 / 收件人对象都遵此规则', correct: true }, { text: '两者完全一样',   correct: false }, { text: '~께 是过去时',    correct: false }, { text: '~에게 是敬语',      correct: false }], explain: '민지에게 vs 선생님께' },
    { id: 'd57-g3-r2', promptZh: '关于「反事实假设」的时态结构，哪句最准确？', choices: [{ text: '~았/었으면 ... ~았/었을 거야 = 过去反事实 · "如果过去 A 就会 B（但没这样）"', correct: true }, { text: '~았/었으면 = 现在假设',        correct: false }, { text: '~았/었을 거야 是命令形',   correct: false }, { text: '两者组合是过去陈述', correct: false }], explain: '感性书信最常用 · 珍惜表达' },
    { id: 'd57-g3-r3', promptZh: '关于「~ㄹ 줄 모르다」的用法，哪句最准确？',    choices: [{ text: '~ㄹ 줄 모르다 = 不会 / 不懂 · 与 ~ㄹ 줄 알다 对立 · 惯用表达', correct: true }, { text: '~ㄹ 줄 모르다 是过去时',          correct: false }, { text: '~ㄹ 줄 모르다 = 忘了',    correct: false }, { text: '~ㄹ 줄 모르다 = 敬语',       correct: false }], explain: '멈출 줄 모르다 = 不知道停 = 停不下来' },
    { id: 'd57-g3-r4', promptZh: '关于书信落款位置，哪句最准确？',                 choices: [{ text: '이름 + 올림/드림/가 · 位置在**最下方** · 韩式格式', correct: true }, { text: '落款写在开头',       correct: false }, { text: '落款可以省略',    correct: false }, { text: '落款只用敬语',       correct: false }], explain: 'Day 33 复习 · 书信礼仪' },
  ],
};
