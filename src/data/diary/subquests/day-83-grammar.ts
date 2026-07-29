import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 83 · 3-3 문법 탐험 · 나중에 ~(으)ㄹ게 + ~까지 · 以后再…/到此为止 */
export const day83Grammar: GrammarSubQuestData = {
  day: 23, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（以后再…/到此为止）：나중에 ~(으)ㄹ게 · N까지',

  fix: [
    { id: 'd83-g3-f1', promptKo: '나중에 말해 주다.',       promptZh: '"以后再告诉你"（对朋友的承诺）哪句最自然？',       choices: [{ text: '나중에 말해 주다.',          correct: false }, { text: '나중에 말해 줄게.',    correct: true }, { text: '나중에 말해 주까.',            correct: false }, { text: '나중에 말해 줬어.',                correct: false }], explain: '主动为对方做的承诺用 **~아/어 줄게**：말해 주다 → 말해 줄게（주까/줬어 不合"以后会"的承诺）' },
    { id: 'd83-g3-f2', promptKo: '오늘 말할 수 있는 건 여기까지다.',       promptZh: '"今天能说的到这里"（对朋友,반말）哪句最自然？',       choices: [{ text: '오늘 말할 수 있는 건 여기까지다.',          correct: false }, { text: '오늘 말할 수 있는 건 여기까지야.',    correct: true }, { text: '오늘 말할 수 있는 건 여기까지를.',            correct: false }, { text: '오늘 말할 수 있는 건 여기까지가.',                correct: false }], explain: '여기까지 + **야**（이다的반말）· 여기까지다 偏书面/生硬,口语用 여기까지야' },
    { id: 'd83-g3-f3', promptKo: '기다릴게. 서두르지 마할게.',         promptZh: '"我会等，不催你"哪句正确？',   choices: [{ text: '기다릴게. 서두르지 마할게.',            correct: false }, { text: '기다릴게. 서두르지 않을게.',    correct: true }, { text: '기다릴게. 서두르지 안할게.',        correct: false }, { text: '기다릴게. 서두르지할게.',              correct: false }], explain: '"不催"的否定承诺用 **서두르지 않을게**（서두르지 마할게 / 안할게 / 서두르지할게 都是错误拼合）' },
    { id: 'd83-g3-f4', promptKo: '당근이 가방에 넣었어.',      promptZh: '"把胡萝卜放进包里"哪句正确？',   choices: [{ text: '당근이 가방에 넣었어.',         correct: false }, { text: '당근을 가방에 넣었어.',      correct: true }, { text: '당근을 가방에서 넣었어.',                correct: false }, { text: '당근에 가방을 넣었어.',                correct: false }], explain: '被放的东西 당근 + **을**；放入地点 가방 + **에**（에서=动作发生地,넣다的目的地用에）' },
    { id: 'd83-g3-f5', promptZh: '关于「~까지」表示"到…为止(限度)"，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**N + 까지 = 到…为止/到此为止(界限)** · 여기까지 = 到这里 · 오늘은 여기까지야 = 今天到这里', correct: true }, { text: 'N + 까지 = 从…开始',            correct: false }, { text: 'N + 까지 = 因为…',        correct: false }, { text: 'N + 까지 = 像…一样',           correct: false }], explain: '~까지 · 到…为止(界限)' },
  ],

  compose: [
    { id: 'd83-g3-c1', zhHint: '以后再告诉你。',                  audioKo: '나중에 말해 줄게.',              answer: ['나중에', '말해', '줄게.'],                     tokens: ['나중에', '말해', '줄게.', '지금', '말해 주까.', '말했어.'],                                  explain: '나중에 + ~아/어 줄게 · 承诺' },
    { id: 'd83-g3-c2', zhHint: '今天能说的到这里。',              audioKo: '오늘 말할 수 있는 건 여기까지야.',          answer: ['오늘', '말할 수 있는 건', '여기까지야.'],                   tokens: ['오늘', '말할 수 있는 건', '여기까지야.', '여기부터야.', '여기까지다.', '여기가.'],                     explain: '~까지 + 야 · 限度' },
    { id: 'd83-g3-c3', zhHint: '没事，我等，不催你。',            audioKo: '괜찮아. 기다릴게. 서두르지 않을게.',        answer: ['괜찮아.', '기다릴게.', '서두르지', '않을게.'],                 tokens: ['괜찮아.', '기다릴게.', '서두르지', '않을게.', '기다려요.', '서두르지 마.', '지금 말해.'],                 explain: '기다릴게 + 서두르지 않을게 · 承诺' },
    { id: 'd83-g3-c4', zhHint: '把胡萝卜放进包里。',              audioKo: '당근을 가방에 넣었어.',            answer: ['당근을', '가방에', '넣었어.'],                  tokens: ['당근을', '가방에', '넣었어.', '당근이', '가방에서', '넣어요.'],                 explain: '내용 을 + 장소 에 + 넣다' },
  ],

  rule: [
    { id: 'd83-g3-r1', promptZh: '关于「나중에 ~(으)ㄹ게(요)」，哪句最准确？',                                choices: [{ text: '**以后我会为你做…的承诺** · 나중에 말해 줄게 = 以后再告诉你', correct: true }, { text: '现在必须做',               correct: false }, { text: '过去已经做了',               correct: false }, { text: '命令别人以后做',                    correct: false }], explain: '나중에 + 承诺' },
    { id: 'd83-g3-r2', promptZh: '关于「~까지(야)」表限度，哪句最准确？',                                  choices: [{ text: '**到…为止/到此为止** · 오늘은 여기까지야 = 今天到这里 · 반말 여기까지야 / 敬语 여기까지예요', correct: true }, { text: '从…开始',    correct: false }, { text: '因为…所以',      correct: false }, { text: '连…也',                    correct: false }], explain: '~까지 · 限度' },
    { id: 'd83-g3-r3', promptZh: '关于「~아/어 줄게 vs ~(으)ㄹ게」，哪句最准确？',                                    choices: [{ text: '**~아/어 줄게 = 我为你做(施惠) · ~(으)ㄹ게 = 我做(单纯承诺)** · 말해 줄게(为你说) vs 기다릴게(我等)', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~줄게 是请求',    correct: false }, { text: '~ㄹ게 是命令',           correct: false }], explain: '施惠 vs 单纯承诺' },
    { id: 'd83-g3-r4', promptZh: '关于「不做…的承诺」，哪句最准确？',                              choices: [{ text: '**~지 않을게 或 안 ~을게** · 서두르지 않을게 = 안 서두를게 = 我不催', correct: true }, { text: '~지 마할게',            correct: false }, { text: '~지 안할게',        correct: false }, { text: '~지 못할게',                      correct: false }], explain: '否定承诺 ~지 않을게 / 안 ~을게' },
  ],
};
