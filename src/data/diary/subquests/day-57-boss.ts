import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 57 · 2-5 Boss 战 · 💌 三封信 · 三个回信 */
export const day57Boss: BossSubQuestData = {
  day: 27, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '편지의 관문',
  subtitle: '💌 手机屏幕两端 · 三种温度',
  intro: '你花一整个傍晚写了三封信 —— 给 Minji、Junho、Haru 各一封韩文。深夜 9 点手机响。Minji 哭着回、Junho 3 页写不完、Haru 两个字："고마워. 나도." 三个人的字数不一样，但都收下了。用韩语说完开头、反事实、承诺、温柔调侃。',
  outroHook: '你把 Haru 的两个字截图存进相册。Minji 说 "우리 진짜 오래 됐다"、Junho 塞了 3 页信纸进邮箱、Haru 说 "나도"。今晚的手机屏幕里，装满了三种温度。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd57-b5-t1', audioKo: '고마워. 나도.',                                        choices: [{ text: '谢谢。我也是。',                    correct: true }, { text: '谢谢。不用。',                            correct: false }, { text: '谢什么。别客气。',                        correct: false }, { text: '现在没事。',                              correct: false }], explain: 'Haru 回信' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd57-b5-t2', audioKo: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.',           choices: [{ text: '没有你我还坐在教室后面。',        correct: true }, { text: '有你我坐在后面。',                        correct: false }, { text: '你还坐在后面。',                          correct: false }, { text: '你和我一起坐后面。',                        correct: false }], explain: '反事实假设' } },
    { type: 'choice',  label: '收件人',        task: { id: 'd57-b5-t3', promptZh: '"给 Minji 写了信"（朋友）哪句正确？',                                                                                                    choices: [{ text: '민지께 편지를 썼어요.',                     correct: false }, { text: '민지에게 편지를 썼어요.',            correct: true }, { text: '민지한테서 편지를 썼어요.',            correct: false }, { text: '민지에서 편지를 썼어요.',                correct: false }], explain: '平辈 → ~에게' } },
    { type: 'choice',  label: '反事实',        task: { id: 'd57-b5-t4', promptZh: '"没有你我还坐在后面"（反事实）哪句最贴切？',                                                                                          choices: [{ text: '너 없으면 나 아직 뒤에서 앉아 있어.',      correct: false }, { text: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', correct: true }, { text: '너 없어서 나 아직 뒤에서 앉아 있어.',        correct: false }, { text: '너 없이 나 아직 뒤에서 앉아 있을 거야.',           correct: false }], explain: '~았/었으면 + ~았/었을 거야' } },
    { type: 'choice',  label: '认词',         task: { id: 'd57-b5-t5', promptKo: '답장', promptHangul: 'dap-jang',                                                                                                       choices: [{ text: '回信',              correct: true }, { text: '寄信',              correct: false }, { text: '写信',              correct: false }, { text: '收信',                     correct: false }], explain: '答(답) + 状(장)' } },
    { type: 'compose', label: '组句',         task: { id: 'd57-b5-t6', zhHint: '没有你我还坐在教室后面。',                                                                                                                audioKo: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', answer: ['너', '없었으면', '나', '아직', '뒤에서', '앉아', '있었을 거야.'], tokens: ['너', '없었으면', '나', '아직', '뒤에서', '앉아', '있었을 거야.', '없으면', '있어', '앞에서'], explain: '反事实假设' } },
    { type: 'compose', label: '组句',         task: { id: 'd57-b5-t7', zhHint: '不催你。什么时候都行。',                                                                                                                  audioKo: '서두르지 않을게. 언제든 괜찮아.',              answer: ['서두르지', '않을게.', '언제든', '괜찮아.'],              tokens: ['서두르지', '않을게.', '언제든', '괜찮아.', '안 할게.', '못 할게.', '언제나', '괜찮은'],                explain: 'Tori 承诺 · ~지 않을게' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd57-b5-t8', promptZh: 'Junho 说 "답장 3장 썼어"。你想温柔调侃"Junho 一说 KPOP 就停不下来"，最自然的一句？',                                                    choices: [{ text: '3장이나?! 준호는 KPOP 얘기하면 멈출 줄 몰라 진짜.',                    correct: true }, { text: '읽지 마.',                              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '멈출 줄 모르다' } },
  ],
};
