import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 84 · 3-3 문법 탐험 · N이/가 아니에요, N이에요/예요 · A不是B,是C */
export const day84Grammar: GrammarSubQuestData = {
  day: 24, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（A不是B，是C）：N이/가 아니에요, N이에요/예요',

  fix: [
    { id: 'd84-g3-f1', promptKo: '실패는 끝은 아니에요.',       promptZh: '"失败不是终点"哪句正确？',       choices: [{ text: '실패는 끝은 아니에요.',          correct: false }, { text: '실패는 끝이 아니에요.',    correct: true }, { text: '실패는 끝을 아니에요.',            correct: false }, { text: '실패는 끝가 아니에요.',                correct: false }], explain: '否定对象用 **이/가 아니에요**：끝(有收音)+ 이 → 끝이 아니에요（끝은/끝을/끝가 都错）' },
    { id: 'd84-g3-f2', promptKo: '중요한 건 언어이 아니에요.',       promptZh: '"重要的不是语言"哪句正确？',       choices: [{ text: '중요한 건 언어이 아니에요.',          correct: false }, { text: '중요한 건 언어가 아니에요.',    correct: true }, { text: '중요한 건 언어은 아니에요.',            correct: false }, { text: '중요한 건 언어를 아니에요.',                correct: false }], explain: '언어(无收音)+ 가 → 언어가 아니에요（无받침用 가,不是 이/은/를）' },
    { id: 'd84-g3-f3', promptKo: '용기는 큰 게 아니에요. 작은 것예요.',         promptZh: '"勇气不是大的，是小的"哪句正确？',   choices: [{ text: '용기는 큰 게 아니에요. 작은 것예요.',            correct: false }, { text: '용기는 큰 게 아니에요. 작은 거예요.',    correct: true }, { text: '용기는 큰 게 아니에요. 작은 거이에요.',        correct: false }, { text: '용기는 큰 게 아니에요. 작은 게예요.',              correct: false }], explain: '것 → 거(口语)+ 예요 → **작은 거예요**（것예요/거이에요/게예요 都错）' },
    { id: 'd84-g3-f4', promptKo: '이건 사자의 크기가 아니에요. 토끼의 크기가예요.',      promptZh: '"这不是狮子的大小，是兔子的大小"哪句正确？',   choices: [{ text: '이건 사자의 크기가 아니에요. 토끼의 크기가예요.',         correct: false }, { text: '이건 사자의 크기가 아니에요. 토끼의 크기예요.',      correct: true }, { text: '이건 사자의 크기이 아니에요. 토끼의 크기예요.',                correct: false }, { text: '이건 사자의 크기를 아니에요. 토끼의 크기예요.',                correct: false }], explain: '否定用 크기가 아니에요；确认用 크기(无收音)+ 예요 → 크기예요（크기가예요 多了 가,错）' },
    { id: 'd84-g3-f5', promptZh: '关于「A不是B，是C」句型的助词，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**否定：N + 이/가 아니에요（否定对象用 이/가）· 确认：N + 이에요/예요（有收音 이에요/无收音 예요）** · 끝이 아니에요, 시작이에요', correct: true }, { text: '否定用 은/는 아니에요',            correct: false }, { text: '否定用 을/를 아니에요',        correct: false }, { text: '确认都用 이에요',           correct: false }], explain: '否定 이/가 아니에요 + 确认 이에요/예요' },
  ],

  compose: [
    { id: 'd84-g3-c1', zhHint: '勇气不是大的，是小的。',                  audioKo: '용기는 큰 게 아니에요. 작은 거예요.',              answer: ['용기는', '큰 게', '아니에요.', '작은', '거예요.'],                     tokens: ['용기는', '큰 게', '아니에요.', '작은', '거예요.', '용기가', '큰 것예요.', '작은 게'],                                  explain: 'N 이/가 아니에요 + N 거예요' },
    { id: 'd84-g3-c2', zhHint: '失败不是终点，是起点。',                  audioKo: '실패는 끝이 아니에요. 시작이에요.',          answer: ['실패는', '끝이', '아니에요.', '시작이에요.'],                   tokens: ['실패는', '끝이', '아니에요.', '시작이에요.', '끝은', '끝가', '시작예요.'],                     explain: '끝이 아니에요 + 시작이에요(有收音)' },
    { id: 'd84-g3-c3', zhHint: '重要的不是语言，是心。',                  audioKo: '중요한 건 언어가 아니에요. 마음이에요.',        answer: ['중요한 건', '언어가', '아니에요.', '마음이에요.'],                 tokens: ['중요한 건', '언어가', '아니에요.', '마음이에요.', '언어이', '언어는', '마음예요.'],                 explain: '언어가 아니에요 + 마음이에요' },
    { id: 'd84-g3-c4', zhHint: '这不是狮子的大小，是兔子的大小。',              audioKo: '사자의 크기가 아니에요. 토끼의 크기예요.',            answer: ['사자의', '크기가', '아니에요.', '토끼의', '크기예요.'],                  tokens: ['사자의', '크기가', '아니에요.', '토끼의', '크기예요.', '크기이', '크기가예요.', '크기은'],                 explain: '크기가 아니에요 + 크기예요(无收音)' },
  ],

  rule: [
    { id: 'd84-g3-r1', promptZh: '关于「A不是B，是C」句型，哪句最准确？',                                choices: [{ text: '**否定B用 이/가 아니에요,确认C用 이에요/예요** · 용기는 큰 게 아니에요, 작은 거예요', correct: true }, { text: '否定和确认都用 이에요',               correct: false }, { text: '否定用 은/는 아니에요',               correct: false }, { text: '这是并列句型',                    correct: false }], explain: '否定 + 确认对比' },
    { id: 'd84-g3-r2', promptZh: '关于「N이/가 아니에요」的收音规则，哪句最准确？',                                  choices: [{ text: '**否定对象:有收音 + 이 아니에요(끝이)· 无收音 + 가 아니에요(언어가)**', correct: true }, { text: '有收音用 가,无收音用 이',    correct: false }, { text: '都用 은/는',      correct: false }, { text: '都用 을/를',                    correct: false }], explain: '有收音 이 / 无收音 가' },
    { id: 'd84-g3-r3', promptZh: '关于「N이에요/예요」的收音规则，哪句最准确？',                                    choices: [{ text: '**确认:有收音 + 이에요(시작이에요)· 无收音 + 예요(크기예요)** · Day 1 学过的基础', correct: true }, { text: '有收音用 예요',            correct: false }, { text: '都用 이에요',    correct: false }, { text: '都用 예요',           correct: false }], explain: '有收音 이에요 / 无收音 예요' },
    { id: 'd84-g3-r4', promptZh: '关于「것 → 거」的口语缩略，哪句最准确？',                              choices: [{ text: '**것 + 예요 → 거예요(口语)** · 작은 거예요 = 是小的(것예요/거이에요 都错)', correct: true }, { text: '것 + 예요 → 것예요',            correct: false }, { text: '것 + 예요 → 거이에요',        correct: false }, { text: '것 + 예요 → 게예요',                      correct: false }], explain: '것 → 거 + 예요' },
  ],
};
