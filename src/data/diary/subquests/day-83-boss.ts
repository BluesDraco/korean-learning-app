import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 83 · 3-5 Boss 战 · 🎒 Haru의 真相 · 나중에 ~ㄹ게 + ~까지 */
export const day83Boss: BossSubQuestData = {
  day: 23, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '조심스러운 대화의 관문',
  subtitle: '🎒 301호 · 유자차 · 기다림',

  intro: '周六晚上。Haru 端着两杯温热的柚子茶敲门,说"토리, 얘기 좀 해도 돼?"。窗外飘着第一场雪。她讲起五年前一个留学生朋友——那朋友也在包里装着一根写着"용기"的胡萝卜,和你书桌上那根一模一样。但结局,她说以后再讲。今天要用 나중에 ~ㄹ게 和 ~까지 接住这份信任:나중에 말해 줄게 → 오늘은 여기까지야 → 기다릴게, 서두르지 않을게。',
  outroHook: '你没有追问。"괜찮아. 기다릴게." Haru 像 Day 57 那封信里那样轻轻笑了。第一场雪贴在窗上,房间里满是柚子茶香。故事背后还有更大的谜,但今天到这里就够了。明天,是学校的公开演讲比赛——你最后一次上台。（Day 84 · 공개 연설）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd83-b5-t1', audioKo: '나중에 말해 줄게.',                                            choices: [{ text: '以后再告诉你。',                    correct: true }, { text: '现在就告诉你。',                  correct: false }, { text: '不告诉你。',              correct: false }, { text: '你先说。',              correct: false }], explain: 'Day 83 · 나중에 + ~아/어 줄게' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd83-b5-t2', audioKo: '오늘 말할 수 있는 건 여기까지야.',                                        choices: [{ text: '今天能说的到这里为止。',                    correct: true }, { text: '今天什么都能说。',                  correct: false }, { text: '今天不想说。',                    correct: false }, { text: '从这里开始说。',                  correct: false }], explain: '~까지 · 限度' } },
    { type: 'choice',  label: '나중에 ~ㄹ게', task: { id: 'd83-b5-t3', promptZh: '"以后再告诉你"（对朋友承诺）哪句最自然？',                                                                                                                                    choices: [{ text: '나중에 말해 주다.',                     correct: false }, { text: '나중에 말해 줄게.',        correct: true }, { text: '나중에 말해 주까.',              correct: false }, { text: '나중에 말해 줬어.',                 correct: false }], explain: '나중에 + ~아/어 줄게 · 承诺' } },
    { type: 'choice',  label: '~까지',        task: { id: 'd83-b5-t4', promptZh: '"今天到这里"（对朋友,반말）哪句最自然？',                                                                                                                                    choices: [{ text: '오늘은 여기부터야.',                          correct: false }, { text: '오늘은 여기까지야.',    correct: true }, { text: '오늘은 여기까지를.',                    correct: false }, { text: '오늘은 여기까지가.',                    correct: false }], explain: '~까지 + 야 · 到此为止' } },
    { type: 'choice',  label: '认词',         task: { id: 'd83-b5-t5', promptKo: '유학생',    promptHangul: 'yu-hak-saeng',                                                                                                                             choices: [{ text: '留学生',                    correct: true }, { text: '实习生',                            correct: false }, { text: '毕业生',                            correct: false }, { text: '新生',                              correct: false }], explain: '留(유) + 学(학) + 生(생)' } },
    { type: 'compose', label: '组句',         task: { id: 'd83-b5-t6', zhHint: '以后再告诉你。',                                                                                                                                            audioKo: '나중에 말해 줄게.',                            answer: ['나중에', '말해', '줄게.'],   tokens: ['나중에', '말해', '줄게.', '지금', '말해 주까.', '말했어.'],         explain: '나중에 + ~아/어 줄게' } },
    { type: 'compose', label: '组句',         task: { id: 'd83-b5-t7', zhHint: '没事，我等，不催你。',                                                                                                                                            audioKo: '괜찮아. 기다릴게. 서두르지 않을게.',                          answer: ['괜찮아.', '기다릴게.', '서두르지', '않을게.'],                              tokens: ['괜찮아.', '기다릴게.', '서두르지', '않을게.', '기다려요.', '서두르지 마.', '지금 말해.'],           explain: '기다릴게 + 서두르지 않을게' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd83-b5-t8', promptZh: 'Haru 说今天只能说到这里。你想让她安心、表示愿意等，最自然的一句？',                                                                                            choices: [{ text: '괜찮아, 기다릴게. 서두르지 않을게.',       correct: true }, { text: '지금 말해. 궁금해.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '그럼 됐어. 안 듣고 싶어.',                                correct: false }], explain: '기다릴게 · 尊重与耐心' } },
  ],
};
