import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 71 · 3-3 문법 탐험 · N + 만에 · 时隔 */
export const day71Grammar: GrammarSubQuestData = {
  day: 11, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '时隔……：N + 만에',

  fix: [
    { id: 'd71-g3-f1', promptKo: '60일 동안에 서울을 떠나요.',       promptZh: '"时隔 60 天离开首尔"哪句正确？',              choices: [{ text: '60일 동안에 서울을 떠나요.',            correct: false }, { text: '60일 만에 서울을 떠나요.',           correct: true }, { text: '60일 부터에 서울을 떠나요.',         correct: false }, { text: '60일 까지에 서울을 떠나요.',              correct: false }], explain: 'N + **만에** = 时隔 · 동안 = 持续期间（意义不同）' },
    { id: 'd71-g3-f2', promptKo: '2시간에 부산에 도착해요.',           promptZh: '"2 小时后到达釜山"哪句正确？',                 choices: [{ text: '2시간에 부산에 도착해요.',              correct: false }, { text: '2시간 만에 부산에 도착해요.',        correct: true }, { text: '2시간 동안 부산에 도착해요.',          correct: false }, { text: '2시간 이내 부산에 도착해요.',              correct: false }], explain: 'N + 만에 · 用时到达' },
    { id: 'd71-g3-f3', promptKo: '기차를 탄 지 60일 만에 여행 가요.',   promptZh: '"距上次坐火车 60 天后去旅行"哪句正确？',      choices: [{ text: '기차를 탄 지 60일 만에 여행 가요.',       correct: true }, { text: '기차를 타는 지 60일 만에 여행 가요.', correct: false }, { text: '기차를 탈 지 60일 만에 여행 가요.',       correct: false }, { text: '기차를 타고 지 60일 만에 여행 가요.',       correct: false }], explain: '~(으)ㄴ 지 + N 만에 · 距上次……时隔' },
    { id: 'd71-g3-f4', promptKo: '이 KTX는 부산 행이에요.',              promptZh: '"这趟 KTX 是釜山方向"哪句正确？',                choices: [{ text: '이 KTX는 부산 행이에요.',                correct: false }, { text: '이 KTX는 부산행이에요.',              correct: true }, { text: '이 KTX는 부산행 예요.',                  correct: false }, { text: '이 KTX는 부산으로 행이에요.',                    correct: false }], explain: '地名 + 행 是**紧贴一词**（부산행 = 釜山方向）' },
    { id: 'd71-g3-f5', promptZh: '关于「N + 만에 vs N + 동안」的差别，哪句最准确？',                                                                                                                                                          choices: [{ text: 'N + 만에 = **时隔**（一段空白后终于……）· N + 동안 = **持续期间**（整段时间在做……）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '만에 只用于过去',        correct: false }, { text: '동안 是敬语',              correct: false }], explain: '语感差 · 60일 만에（终于） vs 60일 동안（这 60 天里）' },
  ],

  compose: [
    { id: 'd71-g3-c1', zhHint: '时隔 60 天离开首尔。',                    audioKo: '60일 만에 서울을 떠나요.',                answer: ['60일 만에', '서울을', '떠나요.'],                    tokens: ['60일 만에', '서울을', '떠나요.', '60일 동안', '60일에', '떠났어요.'],                                  explain: 'N + 만에' },
    { id: 'd71-g3-c2', zhHint: '2 小时后到达釜山。',                      audioKo: '2시간 만에 부산에 도착해요.',              answer: ['2시간 만에', '부산에', '도착해요.'],                  tokens: ['2시간 만에', '부산에', '도착해요.', '2시간 동안', '2시간에', '출발해요.', '도착했어요.'],                     explain: 'KTX 用时 · 만에' },
    { id: 'd71-g3-c3', zhHint: '距上次坐火车 60 天后去旅行。',             audioKo: '기차를 탄 지 60일 만에 여행 가요.',      answer: ['기차를', '탄 지', '60일 만에', '여행 가요.'],           tokens: ['기차를', '탄 지', '60일 만에', '여행 가요.', '타는 지', '탈 지', '60일 동안', '갔어요.'],                     explain: '~ㄴ 지 + N 만에' },
    { id: 'd71-g3-c4', zhHint: '这趟 KTX 是釜山方向，9 点出发。',         audioKo: '이 KTX는 부산행이에요. 9시에 출발해요.', answer: ['이 KTX는', '부산행이에요.', '9시에', '출발해요.'],   tokens: ['이 KTX는', '부산행이에요.', '9시에', '출발해요.', '부산 행이에요.', '부산행 예요.', '도착해요.'],           explain: '부산행 + 이에요' },
  ],

  rule: [
    { id: 'd71-g3-r1', promptZh: '关于「N + 만에」的形态，哪句最准确？',                                choices: [{ text: '**时间名词 + 만에** · 60일 만에 = 时隔 60 天 · 常配 도착 / 만나다 / 오다', correct: true }, { text: 'V + 만에',               correct: false }, { text: 'N + 을 만에',            correct: false }, { text: 'N + 이 만에',                    correct: false }], explain: 'N（时间）直接 + 만에' },
    { id: 'd71-g3-r2', promptZh: '关于「~(으)ㄴ 지 + N 만에」，哪句最准确？',                          choices: [{ text: '**动词 (으)ㄴ 지 + N 만에** = 距上次 V 后过了 N · 탄 지 60일 만에', correct: true }, { text: 'V + 는 지 + N 만에',      correct: false }, { text: 'V + 을 지 + N 만에',      correct: false }, { text: 'V + 만에',                        correct: false }], explain: '~ㄴ 지 高频组合' },
    { id: 'd71-g3-r3', promptZh: '关于「N + 만에 vs N + 동안」的差别，哪句最准确？',                    choices: [{ text: '**만에 = 时隔（空白后终于）**· **동안 = 持续期间（整段时间里）** · 60일 만에 vs 60일 동안', correct: true }, { text: '两者完全一样',            correct: false }, { text: '만에 只用于将来',        correct: false }, { text: '동안 是敬语',              correct: false }], explain: '语感差 · Day 71 用 만에' },
    { id: 'd71-g3-r4', promptZh: '关于「地名 + 행」，哪句最准确？',                                     choices: [{ text: '**地名紧贴 + 행**（부산행 / 서울행）= "去 XX 方向" · 电车 / KTX 常用', correct: true }, { text: '地名 + 으로 + 행',      correct: false }, { text: '地名 + 에서 + 행',       correct: false }, { text: '地名 + 을 + 행',                  correct: false }], explain: '부산행 / 대구행 / 서울행' },
  ],
};
