import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 65 · 3-3 문법 탐험 · ~는/은/ㄴ 것 같다 · 推测 "好像……" */
export const day65Grammar: GrammarSubQuestData = {
  day: 5, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '好像……：~는/(으)ㄴ 것 같다',

  fix: [
    { id: 'd65-g3-f1', promptKo: '여기 위험하는 것 같아요.',        promptZh: '"这里好像危险"哪句正确？',                     choices: [{ text: '여기 위험하는 것 같아요.',           correct: false }, { text: '여기 위험한 것 같아요.',           correct: true }, { text: '여기 위험하기 것 같아요.',              correct: false }, { text: '여기 위험할 것 같아요.',                    correct: false }], explain: '**形容词**用 ~ㄴ/은 것 같다 · 위험하다 → 위험한' },
    { id: 'd65-g3-f2', promptKo: '누가 오은 것 같아요.',              promptZh: '"好像有人来"哪句正确？',                        choices: [{ text: '누가 오은 것 같아요.',                correct: false }, { text: '누가 오는 것 같아요.',              correct: true }, { text: '누가 온 것 같아요.',                     correct: false }, { text: '누가 오게 것 같아요.',                     correct: false }], explain: '**动词现在**用 ~는 것 같다 · 오다 → 오는' },
    { id: 'd65-g3-f3', promptKo: '이미 갔는 것 같아요.',              promptZh: '"好像已经走了"（动词过去）哪句正确？',          choices: [{ text: '이미 갔는 것 같아요.',                correct: false }, { text: '이미 간 것 같아요.',                correct: true }, { text: '이미 가는 것 같아요.',                  correct: false }, { text: '이미 갈 것 같아요.',                       correct: false }], explain: '**动词过去**用 ~(으)ㄴ 것 같다 · 가다 → 간 것' },
    { id: 'd65-g3-f4', promptKo: '내일 비올 것 같은 것 같아요.',       promptZh: '"明天好像会下雨"（未来推测）哪句正确？',       choices: [{ text: '내일 비올 것 같은 것 같아요.',        correct: false }, { text: '내일 비 올 것 같아요.',            correct: true }, { text: '내일 비 오는 것 같아요.',                 correct: false }, { text: '내일 비 온 것 같아요.',                     correct: false }], explain: '**未来推测**用 ~(으)ㄹ 것 같다 · 오다 → 올 것 같다' },
    { id: 'd65-g3-f5', promptZh: '关于「~는/(으)ㄴ/(으)ㄹ 것 같다」时态区分，哪句最准确？',              choices: [{ text: '现在（V 는 / A ㄴ/은）· 过去（V ㄴ/은）· 未来（V/A ㄹ/을）· 三时态形态不同', correct: true }, { text: '全部一样',           correct: false }, { text: '只有过去时',            correct: false }, { text: '只用于名词',                 correct: false }], explain: '~것 같다 时态形三分' },
  ],

  compose: [
    { id: 'd65-g3-c1', zhHint: '这里好像危险。',                     audioKo: '여기 위험한 것 같아요.',              answer: ['여기', '위험한 것 같아요.'],             tokens: ['여기', '위험한 것 같아요.', '위험하는', '위험할', '위험해서', '안전한'],                                explain: 'A + ㄴ 것 같다' },
    { id: 'd65-g3-c2', zhHint: '好像有人来。',                       audioKo: '누가 오는 것 같아요.',                answer: ['누가', '오는 것 같아요.'],                tokens: ['누가', '오는 것 같아요.', '오은', '온', '올', '왔어요.'],                                              explain: 'V 现在 + 는 것 같다' },
    { id: 'd65-g3-c3', zhHint: '好像已经走了。',                     audioKo: '이미 간 것 같아요.',                  answer: ['이미', '간 것 같아요.'],                  tokens: ['이미', '간 것 같아요.', '갔는', '가는', '갈', '갔어요.'],                                              explain: 'V 过去 + (으)ㄴ 것 같다' },
    { id: 'd65-g3-c4', zhHint: '明天好像会下雨。',                    audioKo: '내일 비 올 것 같아요.',              answer: ['내일', '비', '올 것 같아요.'],           tokens: ['내일', '비', '올 것 같아요.', '오는', '온', '왔', '왔어요.'],                                          explain: 'V 未来 + (으)ㄹ 것 같다' },
  ],

  rule: [
    { id: 'd65-g3-r1', promptZh: '关于「~는 것 같다」，哪句最准确？',                            choices: [{ text: '**动词现在**用 ~**는** 것 같다 · 오다 → 오는 것 같다', correct: true }, { text: '动词现在用 ~는은',   correct: false }, { text: '动词现在用 ~을',    correct: false }, { text: '动词现在用 ~기',       correct: false }], explain: '动词现在推测' },
    { id: 'd65-g3-r2', promptZh: '关于「~(으)ㄴ 것 같다」（动词过去），哪句最准确？',            choices: [{ text: '**动词过去**用 ~**(으)ㄴ** 것 같다 · 가다 → 간 것 같다 / 먹다 → 먹은 것 같다', correct: true }, { text: '过去用 ~는',      correct: false }, { text: '过去用 ~을',     correct: false }, { text: '过去用 ~기',           correct: false }], explain: '동사 과거 → ~(으)ㄴ 것 같다' },
    { id: 'd65-g3-r3', promptZh: '关于「~(으)ㄹ 것 같다」（未来推测），哪句最准确？',            choices: [{ text: '**未来 / 意愿**用 ~**(으)ㄹ** 것 같다 · 비 오다 → 비 올 것 같다', correct: true }, { text: '未来用 ~는',      correct: false }, { text: '未来用 ~은',     correct: false }, { text: '未来用 ~고',           correct: false }], explain: '미래 추측 → ~(으)ㄹ 것 같다' },
    { id: 'd65-g3-r4', promptZh: '关于「形容词 + ~ㄴ/은 것 같다」，哪句最准确？',                choices: [{ text: '**形容词**现在推测用 ~**ㄴ/은** 것 같다 · 无받침 ㄴ / 有받침 은 · 위험하다 → 위험한 것 같다', correct: true }, { text: '形容词用 ~는',       correct: false }, { text: '形容词用 ~기',        correct: false }, { text: '形容词用 ~아',           correct: false }], explain: '形容词现在 → ~ㄴ/은 것 같다' },
  ],
};
