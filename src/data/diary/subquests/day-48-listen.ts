import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 48 · 2-2 귀 트이기 · ~지만 · ~는데 · 词性接法 */
export const day48Listen: ListenSubQuestData = {
  day: 18, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: 'CGV 5 호관 · 一半听不懂',

  meaning: [
    { id: 'd48-l2-m1', audioKo: '반은 이해 못 했지만 감동은 다 느꼈어.',    choices: [{ text: '虽然一半没懂，但感动全懂了。',     correct: true }, { text: '一半都懂，但没感动。',                    correct: false }, { text: '一半没懂，感动也没懂。',                    correct: false }, { text: '全懂了，没感动。',                          correct: false }], explain: 'Tori 原句 · ~지만 对立' },
    { id: 'd48-l2-m2', audioKo: '한국어보다 마음이 빨라.',                    choices: [{ text: '心比韩语快。',                     correct: true }, { text: '韩语说得快。',                            correct: false }, { text: '韩语比心慢。',                              correct: false }, { text: '心不快。',                                  correct: false }], explain: 'Haru 诗意 · ~보다 比较（Day 45 复习）' },
    { id: 'd48-l2-m3', audioKo: '자막이 있으면 좋은데, 없어서 힘들었어.',   choices: [{ text: '有字幕就好了，可惜没有。',        correct: true }, { text: '因为有字幕所以难。',                      correct: false }, { text: '有字幕的电影很累。',                        correct: false }, { text: '字幕全都看不清。',                        correct: false }], explain: 'Tori 原句 · ~(으)ㄴ데 铺垫' },
    { id: 'd48-l2-m4', audioKo: '나도 처음엔 그랬어. 한국어보다 마음이 빨라.', choices: [{ text: '我一开始也这样。心比韩语快。',   correct: true }, { text: '我一开始不同。',                          correct: false }, { text: '我最快。',                                correct: false }, { text: '你先学韩语再走。',                          correct: false }], explain: 'Haru 温柔应答' },
    { id: 'd48-l2-m5', audioKo: '어때, 재밌었어?',                           choices: [{ text: '怎么样，好看吗？',                correct: true }, { text: '难吗？',                                    correct: false }, { text: '你在哪？',                                  correct: false }, { text: '你饿吗？',                                  correct: false }], explain: 'Junho 问 · ~ㅆ어 반말过去' },
  ],

  cloze: [
    { id: 'd48-l2-c1', audioKo: '반은 이해 못 했지만 다 느꼈어.',    clozeParts: ['반은 이해 못 했', ' 다 느꼈어.'],  choices: [{ text: '지만',   correct: true }, { text: '는데',   correct: false }, { text: '아서',   correct: false }, { text: '고',     correct: false }], explain: '~지만 = 明确对立' },
    { id: 'd48-l2-c2', audioKo: '자막이 있으면 좋은데.',              clozeParts: ['자막이 있으면 ', '.'],           choices: [{ text: '좋은데', correct: true }, { text: '좋는데', correct: false }, { text: '좋다는데', correct: false }, { text: '좋고',     correct: false }], explain: '형용사 좋다 → **좋은데**' },
    { id: 'd48-l2-c3', audioKo: '영화가 재미있는데 자막이 없어요.',    clozeParts: ['영화가 ', ' 자막이 없어요.'],       choices: [{ text: '재미있는데', correct: true }, { text: '재미있은데', correct: false }, { text: '재미있다는데', correct: false }, { text: '재미있지만서도', correct: false }], explain: '재미있다(V) → **재미있는데**' },
    { id: 'd48-l2-c4', audioKo: '맵지만 맛있어요.',                    clozeParts: ['', ' 맛있어요.'],                   choices: [{ text: '맵지만', correct: true }, { text: '매워지만', correct: false }, { text: '매운지만', correct: false }, { text: '매웠지만', correct: false }], explain: '~지만 前接词干 · 맵 + 지만' },
  ],

  reply: [
    { id: 'd48-l2-r1', audioKo: '어때, 재밌었어?',                     promptZh: 'Junho 问电影怎么样。你想说"一半没懂但感动全懂"，最自然的一句？', choices: [{ text: '반은 이해 못 했지만 감동은 다 느꼈어.',           correct: true }, { text: '전혀 재미없었어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 原句 · ~지만' },
    { id: 'd48-l2-r2', audioKo: '다음에 자막 없는 영화 도전할래?',    promptZh: 'Junho 问下次要不要看没字幕的挑战片。你想说"下次看有字幕的吧"，最自然的一句？', choices: [{ text: '다음엔 자막 있는 걸로 보자.',                    correct: true }, { text: '자막 없는 게 재밌어.',                    correct: false }, { text: '다시는 영화 안 봐.',                    correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~자 邀约 · 자막 있는 걸로' },
    { id: 'd48-l2-r3', audioKo: '한국 영화 좋아해?',                    promptZh: '有人问你喜欢韩国电影吗。你想温柔说"喜欢，但一半台词还听不懂"，最自然的一句？', choices: [{ text: '좋아하는데 대사 반은 아직 못 알아들어.',        correct: true }, { text: '싫어. 자막 없어서 못 봐.',                    correct: false }, { text: '한국 영화가 없어.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~는데 铺垫 · 좋아하는데 + 부연' },
  ],
};
