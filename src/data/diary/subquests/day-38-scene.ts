import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 2-4 상황 속으로 · 김치볶음밥 */
export const day38Scene: SceneSubQuestData = {
  day: 8, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '第一次自己做饭 · 每一步都要说清楚',

  tasks: [
    { type: 'situation', id: 'd38-sc-s1', scenario: '你成功做出了泡菜炒饭，想给妈妈发消息"我会做饭了"，最标准的一句？', choices: [{ ko: '엄마, 나 요리할 수 있어요!', zh: '妈妈，我会做饭了！', correct: true }, { ko: '엄마, 나 요리할 수 있다요!', zh: '妈妈，我会做饭了！', correct: false }, { ko: '엄마, 나 요리해요!', zh: '妈妈，我在做饭！', correct: false }, { ko: '엄마, 나 요리하다요!', zh: '妈妈，我做饭！', correct: false }], explain: 'Tori 原句 · ~ㄹ 수 있어요 表能力' },
    { type: 'situation', id: 'd38-sc-s2', scenario: '朋友请你吃辣的，你想诚实说"我不太能吃辣"，最自然的一句？', choices: [{ ko: '매운 거는 잘 못 먹어요.', zh: '我不太能吃辣。', correct: true }, { ko: '매운 거는 안 먹어요.', zh: '辣的我不吃。', correct: false }, { ko: '매운 거를 잘 못해요.', zh: '辣的我做不好。', correct: false }, { ko: '매운 거는 잘 못 먹을 수 있어요.', zh: '辣的可能吃不太好。', correct: false }], explain: '못 + 动词 = 能力否定 · 잘 못 = 不太能' },
    { type: 'situation', id: 'd38-sc-s3', scenario: '想告诉朋友"能用韩语写信了"，最标准的一句？', choices: [{ ko: '한국어로 편지 쓸 수 있어요.', zh: '能用韩语写信了。', correct: true }, { ko: '한국어로 편지 쓰을 수 있어요.', zh: '能用韩语写信。', correct: false }, { ko: '한국어에서 편지 쓸 수 있어요.', zh: '在韩语里能写信。', correct: false }, { ko: '한국어로 편지 쓸 수 없어요.', zh: '不能用韩语写信。', correct: false }], explain: '쓰다 无收音 → ㄹ 수 있어요' },

    { type: 'dialogue', id: 'd38-sc-d1', lines: [{ speaker: '하루', ko: '오늘은 김치볶음밥 만들어 볼래?', zh: '今天要不要试试做泡菜炒饭？' }], blankSpeaker: '토리', choices: [{ ko: '음… 나 할 수 있을까?', zh: '嗯……我做得来吗？', correct: true }, { ko: '싫어, 안 할래.', zh: '不要，我不做。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '~ㄹ 수 있을까? 犹豫询问' },
    { type: 'dialogue', id: 'd38-sc-d2', lines: [{ speaker: '토리', ko: '나 할 수 있을까?', zh: '我做得来吗？' }], blankSpeaker: '하루', choices: [{ ko: '당연히 할 수 있어. 재료 다 있어.', zh: '当然能。食材都齐了。', correct: true }, { ko: '음, 잘 모르겠어.', zh: '嗯，不太清楚。', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Haru 原句 · 당연히 = 当然' },
    { type: 'dialogue', id: 'd38-sc-d3', lines: [{ speaker: '하루', ko: '이 정도면 진짜 잘한 거야.', zh: '这个水准算做得不错了。' }], blankSpeaker: '토리', choices: [{ ko: '다음엔 내가 해줄게.', zh: '下次我做给你吃。', correct: true }, { ko: '다음엔 네가 해줘.', zh: '下次你做给我吃。', correct: false }, { ko: '내일 또 먹을래?', zh: '明天还想再吃吗？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: '承诺形 ~해줄게 = 为你做' },

    { type: 'context', id: 'd38-sc-c1', ko: '요리할 수 있어요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '表达自己拥有做饭这个能力（第一次成功 / 自我肯定）', correct: true }, { zh: '要求对方做饭', correct: false }, { zh: '解释自己没做饭', correct: false }, { zh: '拒绝对方邀约', correct: false }], explain: '~ㄹ 수 있어요 = 能力表达' },
    { type: 'context', id: 'd38-sc-c2', ko: '매운 거 못 먹어요.', promptZh: '「못 먹어요」和「안 먹어요」的差别，哪句最准确？', choices: [{ zh: '못 = 能力/条件不能；안 = 主观选择不吃（想吃却做不到 vs 不想吃）', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '못 是过去时', correct: false }, { zh: '안 是敬语', correct: false }], explain: '못 = 客观不能 · 안 = 主观不做' },
  ],
};
