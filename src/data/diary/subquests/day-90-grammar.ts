import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 90 · 3-3 문법 탐험 · ~았/었지만 지금은 · 虽然当初…但现在… */
export const day90Grammar: GrammarSubQuestData = {
  day: 30, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（虽然当初…但现在…）：~았/었지만 지금은',

  fix: [
    { id: 'd90-g3-f1', promptKo: '짐을 가지고 왔지만 지금은 집이 있어요.', promptZh: '"虽然带了行李来，但现在有了家"哪句最自然？',      choices: [{ text: '짐을 가지고 오지만 지금은 집이 있어요.',    correct: false }, { text: '짐을 가지고 왔지만 지금은 집이 있어요.',       correct: true }, { text: '짐을 가지고 올지만 지금은 집이 있어요.',                correct: false }, { text: '짐을 가지고 왔는지만 지금은 집이 있어요.',                  correct: false }], explain: '过去事实 + 转折 → **~았/었지만**（왔 + 지만）· 오 → 왔' },
    { id: 'd90-g3-f2', promptKo: '한국어를 몰라지만 지금은 말할 수 있어요.', promptZh: '"虽然当初不懂韩语，但现在能说了"哪句最自然？',            choices: [{ text: '한국어를 몰라지만 지금은 말할 수 있어요.',    correct: false }, { text: '한국어를 몰랐지만 지금은 말할 수 있어요.',    correct: true }, { text: '한국어를 모르지만 지금은 말할 수 있어요.',                correct: false }, { text: '한국어를 몰르지만 지금은 말할 수 있어요.',                  correct: false }], explain: '모르 → 몰랐 → **몰랐지만**（过去 + 지만）' },
    { id: 'd90-g3-f3', promptKo: '90일 전엔 두려웠지만 지금은 안 두려워요.', promptZh: '"90天前害怕，但现在不怕了"哪句最自然？',        choices: [{ text: '90일 전엔 두려웠지만 지금은 안 두려워요.',   correct: true }, { text: '90일 전엔 두렵지만 지금은 안 두려워요.', correct: false }, { text: '90일 전엔 두려울지만 지금은 안 두려워요.',            correct: false }, { text: '90일 전엔 두려운지만 지금은 안 두려워요.',            correct: false }], explain: '두렵다 → 두려웠 → 두려웠지만（ㅂ 불규칙 过去）' },
    { id: 'd90-g3-f4', promptKo: '외국인이었지만 지금은 이 도시가 집이에요.', promptZh: '"曾是外国人，但现在这城是我的家"哪句最自然？',   choices: [{ text: '외국인이었지만 지금은 이 도시가 집이에요.', correct: true }, { text: '외국인지만 지금은 이 도시가 집이에요.',              correct: false }, { text: '외국인이지만 지금은 이 도시가 집이에요.',           correct: false }, { text: '외국인일지만 지금은 이 도시가 집이에요.',           correct: false }], explain: '名词 过去 + 转折 → **이었지만**（외국인 + 이었지만）' },
    { id: 'd90-g3-f5', promptZh: '关于「~았/었지만 지금은」框架的核心，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**前半 ~았/었지만 = 陈述过去的事实 + 转折，后半 지금은 = 与现在对比** · 짐을 가지고 왔지만 지금은 집이 있어요 = 虽然带着行李来，但现在有了家 · 时间对比表成长', correct: true }, { text: '两件事都发生在过去',            correct: false }, { text: '表示未来假设',        correct: false }, { text: '表示命令',           correct: false }], explain: '过去→现在 · 成长对比' },
  ],

  compose: [
    { id: 'd90-g3-c1', zhHint: '虽然带了行李来，但现在有了家。',                    audioKo: '짐을 가지고 왔지만, 지금은 집이 있어요.',        answer: ['짐을 가지고', '왔지만,', '지금은', '집이 있어요.'],                     tokens: ['짐을 가지고', '왔지만,', '지금은', '집이 있어요.', '오지만,', '짐이 있어요.', '집을 가지고'],                          explain: 'Day 90 最终명제 · 全 시리즈 핵심句' },
    { id: 'd90-g3-c2', zhHint: '当初不懂韩语，但现在能说了。',                    audioKo: '한국어를 몰랐지만, 지금은 말할 수 있어요.',      answer: ['한국어를', '몰랐지만,', '지금은', '말할 수 있어요.'],                     tokens: ['한국어를', '몰랐지만,', '지금은', '말할 수 있어요.', '모르지만,', '몰라지만,', '말 못 해요.'],                          explain: '몰랐 + 지만' },
    { id: 'd90-g3-c3', zhHint: '90天前害怕，但现在不怕了。',                  audioKo: '90일 전엔 두려웠지만, 지금은 안 두려워요.',      answer: ['90일 전엔', '두려웠지만,', '지금은', '안 두려워요.'],                     tokens: ['90일 전엔', '두려웠지만,', '지금은', '안 두려워요.', '두렵지만,', '두려울지만,', '더 두려워요.'],                          explain: '두려웠 + 지만' },
    { id: 'd90-g3-c4', zhHint: '曾是外国人，但现在这城是我的家。',                  audioKo: '외국인이었지만, 지금은 이 도시가 집이에요.',    answer: ['외국인이었지만,', '지금은', '이 도시가', '집이에요.'],             tokens: ['외국인이었지만,', '지금은', '이 도시가', '집이에요.', '외국인이지만,', '외국인지만,', '집이 아니에요.'],                          explain: '名词 + 이었지만' },
  ],

  rule: [
    { id: 'd90-g3-r1', promptZh: '关于「~았/었지만 지금은」的用法，哪句最准确？',                                choices: [{ text: '**陈述过去的事实并转折,再与现在对比,表达成长/变化** · 짐을 가지고 왔지만 지금은 집이 있어요', correct: true }, { text: '表示两件同时的事',            correct: false }, { text: '表示未来推测',                   correct: false }, { text: '命令语气',                    correct: false }], explain: '过去→现在 · 成长' },
    { id: 'd90-g3-r2', promptZh: '关于「~았/었지만 的形态」，哪句最准确？',                                  choices: [{ text: '**动词/形容词过去词干 + 지만** · 오 → 왔지만 · 모르 → 몰랐지만 · 名词 → 이었/였지만', correct: true }, { text: 'V + 을지만',           correct: false }, { text: 'V + 는지만',            correct: false }, { text: 'V 现在词干 + 지만',                  correct: false }], explain: '过去词干 + 지만' },
    { id: 'd90-g3-r3', promptZh: '关于「짐 与 집」的象征，哪句最准确？',                                    choices: [{ text: '**짐(行李) → 집(家) 只差一个收音,却是 Tori 90天的全部旅程** · Day 3 说反(把집说成짐),Day 90 用这一字之差说出成长', correct: true }, { text: '짐和집意思相同',            correct: false }, { text: '짐是家,집是行李',    correct: false }, { text: '两个都指行李',           correct: false }], explain: '一字之差 · 象征成长' },
    { id: 'd90-g3-r4', promptZh: '关于「~았/었지만 vs ~았/었는데」的差别，哪句最准确？',                              choices: [{ text: '**~았/었지만 = 明确转折(前后对立)** · **~았/었는데 = 铺垫/背景(不一定对立)** · 왔지만 집이 있어요(转折) vs 왔는데 좋았어요(铺垫)', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~지만 表铺垫',        correct: false }, { text: '~는데 表强转折',                      correct: false }], explain: '转折 vs 铺垫' },
  ],
};
