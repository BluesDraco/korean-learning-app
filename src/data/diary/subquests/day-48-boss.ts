import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 48 · 2-5 Boss 战 · 🎬 韩国电影 */
export const day48Boss: BossSubQuestData = {
  day: 18, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '영화의 관문',
  subtitle: '🎬 CGV · 心比韩语快',
  intro: 'CGV 5 호관，最后一排。屏幕上鹿妈妈在雨里跑，你听不懂台词，但眼泪已经掉下来。散场后麦当劳里 Junho 兴奋讲剧情，Haru 只是笑："나도 처음엔 그랬어. 한국어보다 마음이 빨라." 你想 —— 韩语我还有一半听不懂，但心，全都听懂了。今晚要用 ~지만 和 ~는데 把"一半"和"全部"说清楚。',
  outroHook: '走出麦当劳，兽尔的秋夜风把电影海报吹得沙沙响。你想 —— 心比韩语快。这句话你要记住。总有一天，韩语也会追上心。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd48-b5-t1', audioKo: '반은 이해 못 했지만 감동은 다 느꼈어.', choices: [{ text: '虽然一半没懂，但感动全懂了。',     correct: true }, { text: '一半都懂，但没感动。',              correct: false }, { text: '一半没懂，感动也没懂。',              correct: false }, { text: '全懂了，没感动。',                    correct: false }], explain: 'Tori 原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd48-b5-t2', audioKo: '한국어보다 마음이 빨라.',               choices: [{ text: '心比韩语快。',                     correct: true }, { text: '韩语说得快。',                      correct: false }, { text: '韩语比心慢。',                        correct: false }, { text: '心不快。',                            correct: false }], explain: 'Haru 诗意 · ~보다 比较' } },
    { type: 'choice',  label: '词性接法',     task: { id: 'd48-b5-t3', promptZh: '"电影有意思，可惜没字幕"哪句正确？',                                                                                                    choices: [{ text: '영화가 재미있은데 자막이 없어요.',    correct: false }, { text: '영화가 재미있는데 자막이 없어요.',   correct: true }, { text: '영화가 재미있다는데 자막이 없어요.',    correct: false }, { text: '영화가 재미있지만 자막을 없어요.',        correct: false }], explain: '동사 재미있다 → 재미있는데' } },
    { type: 'choice',  label: '词性接法',     task: { id: 'd48-b5-t4', promptZh: '"有字幕就好了"哪句正确？',                                                                                                              choices: [{ text: '자막이 있으면 좋는데.',                correct: false }, { text: '자막이 있으면 좋은데.',              correct: true }, { text: '자막이 있으면 좋다는데.',                correct: false }, { text: '자막이 있어서 좋은데.',                    correct: false }], explain: '형용사 좋다 → 좋은데' } },
    { type: 'choice',  label: '认词',         task: { id: 'd48-b5-t5', promptKo: '감동', promptHangul: 'gam-dong',                                                                                                     choices: [{ text: '感动',              correct: true }, { text: '感谢',              correct: false }, { text: '感情',              correct: false }, { text: '感冒',                     correct: false }], explain: '感(감) + 动(동)' } },
    { type: 'compose', label: '组句',         task: { id: 'd48-b5-t6', zhHint: '虽然一半没懂，但感动全懂了。',                                                                                                          audioKo: '반은 이해 못 했지만 감동은 다 느꼈어.',      answer: ['반은', '이해 못 했지만', '감동은', '다 느꼈어.'],        tokens: ['반은', '이해 못 했지만', '감동은', '다 느꼈어.', '이해했지만', '못 느꼈어.', '이해', '감동을'], explain: '~지만 明确对比' } },
    { type: 'compose', label: '组句',         task: { id: 'd48-b5-t7', zhHint: '电影有意思，可惜没字幕。',                                                                                                              audioKo: '영화가 재미있는데 자막이 없어요.',            answer: ['영화가', '재미있는데', '자막이', '없어요.'],             tokens: ['영화가', '재미있는데', '자막이', '없어요.', '재미있은데', '재미있지만', '있어요.', '재미있다는데'], explain: '~는데 铺垫' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd48-b5-t8', promptZh: 'Junho 问 "다음엔 자막 없는 걸로 도전할래?"。你想说"下次看有字幕的吧"，最自然的一句？',                                                choices: [{ text: '다음엔 자막 있는 걸로 보자.',                    correct: true }, { text: '자막 없는 게 재밌어.',                    correct: false }, { text: '다시는 영화 안 봐.',                    correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~자 邀约' } },
  ],
};
