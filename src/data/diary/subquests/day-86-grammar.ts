import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 86 · 3-3 문법 탐험 · ~은/는 그대로, ~만 달라졌다 · 路照旧，人变了 */
export const day86Grammar: GrammarSubQuestData = {
  day: 26, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（照旧…只有…变了）：N은/는 그대로, N만 달라졌다',

  fix: [
    { id: 'd86-g3-f1', promptKo: '길이 그대로, 사람만 달라졌어요.', promptZh: '"路照旧，只有人变了"哪句最自然？',           choices: [{ text: '길이 그대로, 사람만 달라졌어요.',           correct: false }, { text: '길은 그대로, 사람만 달라졌어요.',            correct: true }, { text: '길을 그대로, 사람만 달라졌어요.',                correct: false }, { text: '길에 그대로, 사람만 달라졌어요.',                  correct: false }], explain: '对比主题用 **은/는**：길**은** 그대로（有收音 + 은）' },
    { id: 'd86-g3-f2', promptKo: '풍경은 그대로, 마음이 달라졌어요.', promptZh: '"风景照旧，只有心变了"哪句最强调"只有心"？',            choices: [{ text: '풍경은 그대로, 마음이 달라졌어요.', correct: false }, { text: '풍경은 그대로, 마음만 달라졌어요.', correct: true }, { text: '풍경은 그대로, 마음도 달라졌어요.',            correct: false }, { text: '풍경은 그대로, 마음은 달라졌어요.',            correct: false }], explain: '**~만 = 唯独 / 只有** · 마음**만** 달라졌다 = 只有心变了' },
    { id: 'd86-g3-f3', promptKo: '노래는 같은데 감정만 달라졌어요.', promptZh: '"歌一样，只有感情变了"哪句最自然？',           choices: [{ text: '노래는 같은데 감정만 달라졌어요.',     correct: true }, { text: '노래는 같은데 감정만 달라어요.',  correct: false }, { text: '노래는 같은데 감정만 다라졌어요.',            correct: false }, { text: '노래는 같은데 감정만 달랐어졌어요.',            correct: false }], explain: '다르다 + ~아/어지다 → **달라지다** → 달라졌어요' },
    { id: 'd86-g3-f4', promptKo: '얼굴이 그대로인데 눈빛만 달라졌어.', promptZh: '"脸没变，只是眼神变了"—— 表示"脸这个话题维持原样"，哪句最自然？',   choices: [{ text: '얼굴만 그대로인데 눈빛만 달라졌어.',    correct: false }, { text: '얼굴은 그대로인데 눈빛만 달라졌어.',    correct: true }, { text: '얼굴이 그대로인데 눈빛만 달라졌어.',                    correct: false }, { text: '얼굴에 그대로인데 눈빛만 달라졌어.',                  correct: false }], explain: '**그대로 前的主题也用 은/는**（얼굴은），~만 只跟在"变化的那个"后面' },
    { id: 'd86-g3-f5', promptZh: '关于「N은/는 그대로, N만 달라졌다」框架的核心，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**前半 은/는 그대로 = 某物维持原样，后半 ~만 달라졌다 = 唯独另一物变了** · 길은 그대로, 사람만 달라졌다 = 路照旧，只有人变了 · 变与不变的对比', correct: true }, { text: '两样东西都变了',            correct: false }, { text: '两样东西都没变',        correct: false }, { text: '表示未来会变',           correct: false }], explain: '不变 vs 变 · 对比框架' },
  ],

  compose: [
    { id: 'd86-g3-c1', zhHint: '路照旧，只有人变了。',                    audioKo: '길은 그대로, 사람만 달라졌어요.',       answer: ['길은', '그대로,', '사람만', '달라졌어요.'],           tokens: ['길은', '그대로,', '사람만', '달라졌어요.', '길이', '사람이', '달라져요.'],                          explain: 'Day 86 명제' },
    { id: 'd86-g3-c2', zhHint: '风景照旧，只有心变了。',                  audioKo: '풍경은 그대로, 마음만 달라졌어요.',     answer: ['풍경은', '그대로,', '마음만', '달라졌어요.'],         tokens: ['풍경은', '그대로,', '마음만', '달라졌어요.', '풍경이', '마음이', '마음도'],                          explain: '은/는 그대로 + ~만' },
    { id: 'd86-g3-c3', zhHint: '歌一样，只有感情变了。',                  audioKo: '노래는 같은데 감정만 달라졌어요.',      answer: ['노래는', '같은데', '감정만', '달라졌어요.'],           tokens: ['노래는', '같은데', '감정만', '달라졌어요.', '노래가', '감정이', '감정도'],                          explain: '~는데 대비 + ~만' },
    { id: 'd86-g3-c4', zhHint: '站台照旧，只有我变了。',                  audioKo: '승강장은 그대로, 나만 달라졌어요.',     answer: ['승강장은', '그대로,', '나만', '달라졌어요.'],           tokens: ['승강장은', '그대로,', '나만', '달라졌어요.', '승강장이', '내가', '나도'],                          explain: '은/는 그대로 + 나만' },
  ],

  rule: [
    { id: 'd86-g3-r1', promptZh: '关于「~은/는 그대로」的意思，哪句最准确？',                                choices: [{ text: '**N + 은/는 + 그대로 = 某物维持原样、没有变化** · 길은 그대로 = 路照旧', correct: true }, { text: '某物消失了',            correct: false }, { text: '某物变了',                   correct: false }, { text: '命令别动',                    correct: false }], explain: '不变 · 维持原样' },
    { id: 'd86-g3-r2', promptZh: '关于「~만」的意思，哪句最准确？',                                  choices: [{ text: '**~만 = 唯独 / 只有** · 사람만 = 只有人 · 排除其他、突出唯一', correct: true }, { text: '~만 = 也',           correct: false }, { text: '~만 = 全部',            correct: false }, { text: '~만 = 或者',                  correct: false }], explain: '唯一 · 排他' },
    { id: 'd86-g3-r3', promptZh: '「그대로 前的名词」为什么要用 은/는？',                                    choices: [{ text: '**因为它是"维持不变"的对比主题** · 与后半"变了的东西"形成对比，主题助词用 은/는', correct: true }, { text: '因为一定要用 이/가',            correct: false }, { text: '因为要用 을/를',    correct: false }, { text: '因为要用 에',           correct: false }], explain: '对比主题 · 은/는' },
    { id: 'd86-g3-r4', promptZh: '关于「그대로 vs 안 변했다」的语感差别，哪句最准确？',                              choices: [{ text: '**그대로 = 诗意 / 命题感的"照旧" · 안 변했다 = 客观陈述"没变"** · 抒情场合用 그대로', correct: true }, { text: '两者完全一样',            correct: false }, { text: '그대로 表未来',        correct: false }, { text: '안 변했다 更诗意',                      correct: false }], explain: '语感差别 · 诗意 vs 陈述' },
  ],
};
