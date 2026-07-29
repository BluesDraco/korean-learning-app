import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 55 · 2-4 상황 속으로 · 日记回顾 */
export const day55Scene: SceneSubQuestData = {
  day: 25, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '书桌前 · 55 天前的我 vs 现在的我',

  tasks: [
    { type: 'situation', id: 'd55-sc-s1', scenario: '你想说"55 天前连"你好"都难说出口的我"，最自然的一句？', choices: [{ ko: '55일 전에는 안녕하세요도 어려웠던 나였어요.', zh: '55 天前连"你好"都难说出口的我。', correct: true }, { ko: '55일 전에는 안녕하세요도 어려운 나였어요.', zh: '55 天前连"你好"都难说出口的我。', correct: false }, { ko: '55일 전에는 안녕하세요도 어려운데 나였어요.', zh: '55 天前"你好"也难，是我。', correct: false }, { ko: '55일 후에는 안녕하세요도 어려웠던 나였어요.', zh: '55 天后连"你好"都难说出口的我。', correct: false }], explain: 'Tori 原句 · ~았/었던' },
    { type: 'situation', id: 'd55-sc-s2', scenario: '你想说"现在是能讲价、能调解朋友吵架的人"，最自然的一句？', choices: [{ ko: '지금은 흥정도 하고, 친구 싸움도 말리는 사람이에요.', zh: '现在是能讲价、能调解朋友吵架的人。', correct: true }, { ko: '지금은 흥정도 안 하고, 친구 싸움도 안 말리는 사람이에요.', zh: '现在是不讲价、不调解朋友吵架的人。', correct: false }, { ko: '지금은 흥정도 하지만, 친구 싸움을 말릴 수 없어요.', zh: '现在也讲价，但没法调解朋友吵架。', correct: false }, { ko: '지금은 흥정만 잘해요.', zh: '现在只擅长讲价。', correct: false }], explain: 'Tori 原句 · ~고 并列' },
    { type: 'situation', id: 'd55-sc-s3', scenario: '你想说"常去的咖啡馆关门了"，最自然的一句？', choices: [{ ko: '자주 갔던 카페가 문 닫았어요.', zh: '常去的咖啡馆关门了。', correct: true }, { ko: '자주 가는 카페가 문 닫았어요.', zh: '常去的咖啡馆关门了。', correct: false }, { ko: '자주 간 카페가 문 닫았어요.', zh: '常去过的咖啡馆关门了。', correct: false }, { ko: '자주 갈 카페가 문 닫았어요.', zh: '要常去的咖啡馆关门了。', correct: false }], explain: '~던 反复经验' },

    { type: 'dialogue', id: 'd55-sc-d1', lines: [{ speaker: '토리 (내면)', ko: 'Day 1 일기… 이때는 진짜 다 떨렸구나.', zh: 'Day 1 的日记……那时真是什么都紧张呢。' }], blankSpeaker: '토리', choices: [{ ko: '지금은 흥정도 하고, 친구 싸움도 말리는 사람이에요.', zh: '现在是能讲价、能调解朋友吵架的人。', correct: true }, { ko: '지금도 다 떨려요.', zh: '现在什么都紧张。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '内心 OS 转外话' },
    { type: 'dialogue', id: 'd55-sc-d2', lines: [{ speaker: '토리', ko: '근데 아직 배울 게 많아요.', zh: '但还有很多要学。' }], blankSpeaker: '하루', choices: [{ ko: '많이 배웠고, 앞으로도 많이 배울 거야. 그게 성장이야.', zh: '学了很多，以后也会学很多。这就是成长。', correct: true }, { ko: '그럼 그만해.', zh: '那就别学了。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Haru 原句 · 温柔鼓励' },
    { type: 'dialogue', id: 'd55-sc-d3', lines: [{ speaker: '하루', ko: '많이 배웠고, 앞으로도 많이 배울 거야.', zh: '学了很多，以后也会学很多。' }], blankSpeaker: '토리', choices: [{ ko: '응, 계속 더 열심히 할래.', zh: '嗯，会继续更努力。', correct: true }, { ko: '이제 그만할래.', zh: '我现在不做了。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 决心 · ~(으)ㄹ래' },

    { type: 'context', id: 'd55-sc-c1', ko: '어려웠던 나', promptZh: '这句话的语感特征，哪句最准确？', choices: [{ zh: '**过去回望** · 我曾经是那样 · 现在不那样了 · 自传 / 日记高频', correct: true }, { zh: '现在还在这样', correct: false }, { zh: '未来会那样', correct: false }, { zh: '陈述事实', correct: false }], explain: '~았/었던 = 完全过去 + 修饰后接名词' },
    { type: 'context', id: 'd55-sc-c2', ko: '갔던 vs 간', promptZh: '两者的语感差，哪句最准确？', choices: [{ zh: '갔던 = 反复去过（曾经经常去）· 간 = 单纯完成（去过）', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '갔던 是未来时', correct: false }, { zh: '간 是命令形', correct: false }], explain: '语感频次 · 常去 vs 去过' },
  ],
};
