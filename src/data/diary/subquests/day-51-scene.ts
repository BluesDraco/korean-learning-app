import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 51 · 2-4 상황 속으로 · 一个人追星 */
export const day51Scene: SceneSubQuestData = {
  day: 21, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '달빛카페 · 从点单到拿卡都靠自己',

  tasks: [
    { type: 'situation', id: 'd51-sc-s1', scenario: '你独自到달빛카페点单。最自然的开场句？', choices: [{ ko: '안녕하세요. 오늘 시그니처 음료 하나 주세요.', zh: '你好。来一杯今天的招牌饮品。', correct: true }, { ko: '시그니처 음료 하나?', zh: '招牌饮品来一杯？', correct: false }, { ko: '뭐 있어요?', zh: '有什么？', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '打招呼 + 具体点单 · Tori 原句' },
    { type: 'situation', id: 'd51-sc-s2', scenario: '想说"我刷卡结账"，最自然的一句？', choices: [{ ko: '카드로 결제할게요.', zh: '我刷卡结账。', correct: true }, { ko: '카드에 결제할게요.', zh: '我在卡上结账。', correct: false }, { ko: '카드까지 결제할게요.', zh: '连卡也结账。', correct: false }, { ko: '카드에서 결제할게요.', zh: '从卡上结账。', correct: false }], explain: '手段助词 ~로' },
    { type: 'situation', id: 'd51-sc-s3', scenario: '朋友问你今天生咖去得如何。你想说"一个人全搞定了"（반말），最自然的一句？', choices: [{ ko: '나 혼자서 다 할 수 있었어.', zh: '一个人全搞定了。', correct: true }, { ko: '나 혼자 다 할수 있었어.', zh: '我一个人全搞定了。', correct: false }, { ko: '나 혼자서 다 할 수 없었어.', zh: '我一个人没法全搞定。', correct: false }, { ko: '나 혼자로 다 했어.', zh: '我一个人全做了。', correct: false }], explain: '혼자서 + ~ㄹ 수 있었어' },

    { type: 'dialogue', id: 'd51-sc-d1', lines: [{ speaker: '考拉店员', ko: '오늘 시그니처 음료 뭐 드릴까요?', zh: '今天招牌饮品要什么？' }], blankSpeaker: '토리', choices: [{ ko: '오늘 시그니처 음료 하나 주세요.', zh: '来一杯今天的招牌饮品。', correct: true }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 原句 · 独立点单' },
    { type: 'dialogue', id: 'd51-sc-d2', lines: [{ speaker: '考拉店员', ko: '9,500원이에요.', zh: '9,500 元。' }], blankSpeaker: '토리', choices: [{ ko: '카드로 결제할게요.', zh: '我刷卡结账。', correct: true }, { ko: '없어요.', zh: '没有。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어요.', zh: '不要。', correct: false }], explain: '~로 + ~ㄹ게요' },
    { type: 'dialogue', id: 'd51-sc-d3', lines: [{ speaker: '준호', ko: '토리, 오늘 카페 어땠어?', zh: '兔莉，今天咖啡馆怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '나 혼자서 다 할 수 있었어. 심지어 모찌 정면 뽑았어!', zh: '一个人全搞定了。而且抽到 Mochi 正面卡！', correct: true }, { ko: '아무것도 못 했어.', zh: '什么都没做成。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '자립 + 兴奋分享' },

    { type: 'context', id: 'd51-sc-c1', ko: '나 혼자서 다 할 수 있어.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '**自我肯定** · 独立完成过 / 能独立完成一件事 · 표현的是"我行"', correct: true }, { zh: '拒绝对方帮助（生硬）', correct: false }, { zh: '道歉自己一个人吃饭', correct: false }, { zh: '感叹被冷落', correct: false }], explain: '자립 표현 · 성장 감정' },
    { type: 'context', id: 'd51-sc-c2', ko: 'Day 23 vs Day 51 성장 대조', promptZh: '两天场景的对比，哪句最准确？', choices: [{ zh: 'Day 23 Junho 帮 Tori 点单；Day 51 Tori 一个人全搞定 · 语法从 ~해줬어 到 ~할 수 있었어 的成长', correct: true }, { zh: '两天完全一样', correct: false }, { zh: 'Day 51 学了新词', correct: false }, { zh: 'Day 23 更难', correct: false }], explain: '~(으)ㄹ 수 있어요 承载成长' },
  ],
};
