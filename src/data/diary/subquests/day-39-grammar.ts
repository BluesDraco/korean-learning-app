import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 2-3 문법 탐험 · ~는 것 같아요 · 动/形/名 分别接法 */
export const day39Grammar: GrammarSubQuestData = {
  day: 9, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '好像___：~는 / ~(으)ㄴ / ~인 것 같아요',

  fix: [
    { id: 'd39-g3-f1', promptKo: '비가 온 것 같아요.',            promptZh: '"好像在下雨"（现在推测）哪句正确？',              choices: [{ text: '비가 온 것 같아요.',            correct: false }, { text: '비가 오는 것 같아요.',       correct: true }, { text: '비가 오은 것 같아요.',        correct: false }, { text: '비가 온다는 것 같아요.',            correct: false }], explain: '动词**现在** → **~는 것 같아요** · 온 = 过去（好像下过了）' },
    { id: 'd39-g3-f2', promptKo: '이 김치가 맵는 것 같아요.',       promptZh: '"这个泡菜好像很辣"哪句正确？',                    choices: [{ text: '이 김치가 맵는 것 같아요.',     correct: false }, { text: '이 김치가 매운 것 같아요.',   correct: true }, { text: '이 김치가 매워 것 같아요.',       correct: false }, { text: '이 김치가 맵다 것 같아요.',          correct: false }], explain: '形容词 맵다 → **매운** 것 같아요（ㅂ 不规则）· 不用 맵는' },
    { id: 'd39-g3-f3', promptKo: '준호는 팬 것 같아요.',            promptZh: '"Junho 好像是 KPOP 粉丝"哪句正确？',              choices: [{ text: '준호는 팬 것 같아요.',           correct: false }, { text: '준호는 팬인 것 같아요.',      correct: true }, { text: '준호는 팬는 것 같아요.',           correct: false }, { text: '준호는 팬이 것 같아요.',              correct: false }], explain: '名词 팬 → **인 것 같아요**（이다 + ㄴ）' },
    { id: 'd39-g3-f4', promptKo: '벌써 밥을 먹는 것 같아요.',       promptZh: '"好像已经吃过饭了"（过去推测）哪句正确？',         choices: [{ text: '벌써 밥을 먹는 것 같아요.',      correct: false }, { text: '벌써 밥을 먹은 것 같아요.',    correct: true }, { text: '벌써 밥을 먹었 것 같아요.',        correct: false }, { text: '벌써 밥을 먹어 것 같아요.',            correct: false }], explain: '动词过去 → **~(으)ㄴ 것 같아요**（먹은）' },
    { id: 'd39-g3-f5', promptKo: '한글이 진짜 과학적 것 같아요.',   promptZh: '"韩文好像很科学"哪句正确？',                      choices: [{ text: '한글이 진짜 과학적 것 같아요.',    correct: false }, { text: '한글이 진짜 과학적인 것 같아요.', correct: true }, { text: '한글이 진짜 과학적는 것 같아요.',    correct: false }, { text: '한글이 진짜 과학적이 것 같아요.',       correct: false }], explain: '과학적 = 이다 结尾 → **인 것 같아요**' },
  ],

  compose: [
    { id: 'd39-g3-c1', zhHint: '韩文好像很科学。',              audioKo: '한글이 진짜 과학적인 것 같아요.',       answer: ['한글이', '진짜', '과학적인', '것 같아요.'],           tokens: ['한글이', '진짜', '과학적인', '것 같아요.', '과학적', '것 있어요.', '과학적이', '과학적는'],  explain: 'Tori 原句 · 명사/이다 결미 → 인 것 같아요' },
    { id: 'd39-g3-c2', zhHint: '好像在下雨。',                  audioKo: '비가 오는 것 같아요.',                    answer: ['비가', '오는', '것 같아요.'],                        tokens: ['비가', '오는', '것 같아요.', '온', '왔어', '오은', '온다는'],                              explain: '动词现在 → 는 것 같아요' },
    { id: 'd39-g3-c3', zhHint: '这个泡菜好像很辣。',            audioKo: '이 김치가 매운 것 같아요.',              answer: ['이 김치가', '매운', '것 같아요.'],                  tokens: ['이 김치가', '매운', '것 같아요.', '맵는', '맵다', '매워', '매워요'],                       explain: '形容词 맵다 → **매운** 것 같아요' },
    { id: 'd39-g3-c4', zhHint: 'Junho 好像是 KPOP 粉丝。',       audioKo: '준호는 KPOP 팬인 것 같아요.',            answer: ['준호는', 'KPOP', '팬인', '것 같아요.'],              tokens: ['준호는', 'KPOP', '팬인', '것 같아요.', '팬', '팬는', '팬이', '팬가'],                     explain: '名词 팬 → **인 것 같아요**' },
  ],

  rule: [
    { id: 'd39-g3-r1', promptZh: '关于「~는/은/인 것 같아요」的用法，哪句最准确？',      choices: [{ text: '推测句尾"好像___" · 动词现在 는 / 形容词 (으)ㄴ / 名词(이다) 인', correct: true }, { text: '所有词一律 + 는 것 같아요',        correct: false }, { text: '所有词一律 + 인 것 같아요',    correct: false }, { text: '只用于过去时',                     correct: false }], explain: '词性不同接法不同 · 混用是学习者最常犯的错' },
    { id: 'd39-g3-r2', promptZh: '关于动词过去的接法，哪句最准确？',                        choices: [{ text: '动词过去 → **~(으)ㄴ 것 같아요**（먹었어요 → 먹은 것 같아요）', correct: true }, { text: '动词过去 → **~었 것 같아요**',      correct: false }, { text: '动词过去 → **~는 것 같아요**',      correct: false }, { text: '动词过去 → **~을 것 같아요**',      correct: false }], explain: '온 것 같아요 = 好像来过了' },
    { id: 'd39-g3-r3', promptZh: '关于名词接法，哪句最准确？',                              choices: [{ text: '名词 + **인 것 같아요**（이다 + ㄴ）· 用于身份/性质推测', correct: true }, { text: '名词 + **는 것 같아요**',            correct: false }, { text: '名词 + **을 것 같아요**',           correct: false }, { text: '名词不能用 것 같아요',              correct: false }], explain: '학생인 것 같아요 = 好像是学生 · 팬인 것 같아요 = 好像是粉丝' },
    { id: 'd39-g3-r4', promptZh: '关于「~는 것 같아요 vs ~아/어요」的差别，哪句最准确？',   choices: [{ text: '~는 것 같아요 = 推测 / 观点（柔和）；~아/어요 = 确信陈述', correct: true }, { text: '两者完全一样',                     correct: false }, { text: '~는 것 같아요 是过去时',           correct: false }, { text: '~아/어요 是敬语',                  correct: false }], explain: '맛있어요（确信）· 맛있는 것 같아요（柔和推测）' },
  ],
};
