import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 85 · 3-3 문법 탐험 · ~(으)ㄹ 때마다 · 每当…的时候 */
export const day85Grammar: GrammarSubQuestData = {
  day: 25, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（每当…时）：V + (으)ㄹ 때마다',

  fix: [
    { id: 'd85-g3-f1', promptKo: '너를 보 때마다 웃음이 나요.',       promptZh: '"每次看到你都会笑"哪句正确？',       choices: [{ text: '너를 보 때마다 웃음이 나요.', correct: false }, { text: '너를 볼 때마다 웃음이 나요.',    correct: true }, { text: '너를 보을 때마다 웃음이 나요.',            correct: false }, { text: '너를 봄 때마다 웃음이 나요.',                correct: false }], explain: '보다(无收音)→ **볼 때마다**（ㄹ词尾;보/보을/봄 都错）' },
    { id: 'd85-g3-f2', promptKo: '한국에 가 때마다 뭔가 배워요.',       promptZh: '"每次去韩国都学到东西"哪句正确？',       choices: [{ text: '한국에 가 때마다 뭔가 배워요.',          correct: false }, { text: '한국에 갈 때마다 뭔가 배워요.',    correct: true }, { text: '한국에 갈 때에 뭔가 배워요.',            correct: false }, { text: '한국에 가을 때마다 뭔가 배워요.',                correct: false }], explain: '가다 → **갈 때마다**（가 때마다缺ㄹ;갈 때에少了마다;가을 错）' },
    { id: 'd85-g3-f3', promptKo: '이 노래를 듣을 때마다 그날이 생각나요.',         promptZh: '"每次听这歌都想起那天"哪句正确？',   choices: [{ text: '이 노래를 듣을 때마다 그날이 생각나요.',            correct: false }, { text: '이 노래를 들을 때마다 그날이 생각나요.',    correct: true }, { text: '이 노래를 들 때마다 그날이 생각나요.',        correct: false }, { text: '이 노래를 듣를 때마다 그날이 생각나요.',              correct: false }], explain: '듣다 ㄷ불규칙 → **들을 때마다**（듣을/들/듣를 都错）' },
    { id: 'd85-g3-f4', promptKo: '매일마다 일기를 써요.',      promptZh: '"每天写日记"哪句正确？',   choices: [{ text: '매일마다 일기를 써요.',         correct: false }, { text: '매일 일기를 써요.',      correct: true }, { text: '매일에 일기를 써요.',                correct: false }, { text: '매일를 일기를 써요.',                correct: false }], explain: '매일 本身已含"每",不再加 마다（매일마다 冗余;하루마다/시간마다 才对）' },
    { id: 'd85-g3-f5', promptZh: '关于「~(으)ㄹ 때마다」的核心，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**V + (으)ㄹ 때 + 마다 = 每当V的时候(反复/规律)** · 볼 때마다 / 갈 때마다 / 들을 때마다(ㄷ불규칙)', correct: true }, { text: '表一次性的动作',            correct: false }, { text: '表将来计划',        correct: false }, { text: '表因果关系',           correct: false }], explain: '~(으)ㄹ 때마다 · 每当(反复)' },
  ],

  compose: [
    { id: 'd85-g3-c1', zhHint: '每次看到你都会笑。',                  audioKo: '너를 볼 때마다 웃음이 나요.',              answer: ['너를', '볼 때마다', '웃음이', '나요.'],                     tokens: ['너를', '볼 때마다', '웃음이', '나요.', '볼 때', '봄 때마다', '웃어요.'],                                  explain: '보다 → 볼 때마다' },
    { id: 'd85-g3-c2', zhHint: '每次去韩国都学到东西。',              audioKo: '한국에 갈 때마다 뭔가 배워요.',          answer: ['한국에', '갈 때마다', '뭔가', '배워요.'],                   tokens: ['한국에', '갈 때마다', '뭔가', '배워요.', '가 때마다', '갈 때에', '배울래요.'],                     explain: '가다 → 갈 때마다' },
    { id: 'd85-g3-c3', zhHint: '每次听这歌都想起那天。',              audioKo: '이 노래를 들을 때마다 그날이 생각나요.',        answer: ['이 노래를', '들을 때마다', '그날이', '생각나요.'],                 tokens: ['이 노래를', '들을 때마다', '그날이', '생각나요.', '듣을 때마다', '들 때마다', '생각나겠어요.'],                 explain: '듣다 ㄷ불규칙 → 들을 때마다' },
    { id: 'd85-g3-c4', zhHint: '每撕一张纸，一起的时间也少一张。',              audioKo: '종이를 뜯을 때마다 시간이 줄어요.',            answer: ['종이를', '뜯을 때마다', '시간이', '줄어요.'],                  tokens: ['종이를', '뜯을 때마다', '시간이', '줄어요.', '뜯 때마다', '뜯를 때마다', '늘어요.'],                 explain: '뜯다 → 뜯을 때마다' },
  ],

  rule: [
    { id: 'd85-g3-r1', promptZh: '关于「~(으)ㄹ 때마다」的用法，哪句最准确？',                                choices: [{ text: '**每当V的时候(反复/规律发生)** · 너를 볼 때마다 웃음이 나요 = 每次看到你都笑', correct: true }, { text: '表一次性动作',               correct: false }, { text: '表将来计划',               correct: false }, { text: '表命令',                    correct: false }], explain: '每当(反复)' },
    { id: 'd85-g3-r2', promptZh: '关于「~(으)ㄹ 때마다 的形态」，哪句最准确？',                                  choices: [{ text: '**词干无收音 + ㄹ 때마다(볼)· 有收音 + 을 때마다(뜯을)· ㄷ불규칙듣다 → 들을 때마다**', correct: true }, { text: '都用 을 때마다',    correct: false }, { text: '都用 는 때마다',      correct: false }, { text: '词干直接 + 때마다',                    correct: false }], explain: '(으)ㄹ 때마다 · 按收音' },
    { id: 'd85-g3-r3', promptZh: '关于「名词 + 마다」vs「V + (으)ㄹ 때마다」，哪句最准确？',                                    choices: [{ text: '**名词直接 + 마다(하루마다=每天)· 动词用 (으)ㄹ 때마다(갈 때마다=每次去)**', correct: true }, { text: '两者可互换',            correct: false }, { text: '名词也用 때마다',    correct: false }, { text: '动词直接 + 마다',           correct: false }], explain: 'N마다 vs V(으)ㄹ 때마다' },
    { id: 'd85-g3-r4', promptZh: '关于「매일마다」为什么错，哪句最准确？',                              choices: [{ text: '**매일 本身已含"每"的意思,再加 마다 就重复了** · 매일(O) / 매일마다(X) / 하루마다(O)', correct: true }, { text: '매일마다 完全正确',            correct: false }, { text: '매일 后必须加 마다',        correct: false }, { text: '매일 是动词',                      correct: false }], explain: '매일 已含"每" · 不叠加 마다' },
  ],
};
