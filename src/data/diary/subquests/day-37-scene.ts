import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 37 · 2-4 상황 속으로 · 火锅派对 */
export const day37Scene: SceneSubQuestData = {
  day: 7, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '301 号房 · 四个人一锅红油',

  tasks: [
    { type: 'situation', id: 'd37-sc-s1', scenario: '你想邀请朋友今晚来家里吃火锅（반말），最自然的一句？', choices: [{ ko: '오늘 밤에 우리 집에서 훠궈 먹을래?', zh: '今晚要来我家吃火锅吗？', correct: true }, { ko: '오늘 밤에 우리 집에서 훠궈 먹까?', zh: '今晚在我家吃火锅吗？', correct: false }, { ko: '오늘 밤에 우리 집에서 훠궈 먹을까?', zh: '今晚要不要一起在我家吃火锅？', correct: false }, { ko: '오늘 밤에 훠궈 먹었어?', zh: '今晚吃过火锅了吗？', correct: false }], explain: '~을래 询问对方意愿 · 邀约标配' },
    { type: 'situation', id: 'd37-sc-s2', scenario: '你想和朋友商量"几点去"（반말），最自然的一句？', choices: [{ ko: '몇 시에 갈까?', zh: '几点去啊？', correct: true }, { ko: '몇 시에 갈래?', zh: '你几点想去？', correct: false }, { ko: '몇 시에 가을까?', zh: '几点去啊？', correct: false }, { ko: '몇 시에 가까?', zh: '几点去啊？', correct: false }], explain: '~ㄹ까 商量共同时间' },
    { type: 'situation', id: 'd37-sc-s3', scenario: '你想问客人"想喝什么"（해요体），最合适的一句？', choices: [{ ko: '뭐 마실래요?', zh: '想喝什么？', correct: true }, { ko: '뭐 마실까요?', zh: '我们喝什么好呢？', correct: false }, { ko: '뭐 마셨어요?', zh: '喝了什么？', correct: false }, { ko: '뭐 마시나요?', zh: '在喝什么呢？', correct: false }], explain: '~ㄹ래요 询问对方偏好' },

    { type: 'dialogue', id: 'd37-sc-d1', lines: [{ speaker: '토리', ko: '오늘 밤에 우리 집에서 훠궈 먹을래?', zh: '今晚要来我家吃火锅吗？' }], blankSpeaker: '준호', choices: [{ ko: '진짜? 나 훠궈 처음 먹어! 몇 시에 갈까?', zh: '真的？我第一次吃火锅！几点去啊？', correct: true }, { ko: '싫어, 안 갈래.', zh: '不要，我不去。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '接受邀请 + 问时间' },
    { type: 'dialogue', id: 'd37-sc-d2', lines: [{ speaker: '토리', ko: '7시 반쯤 올래?', zh: '7 点半来吧？' }], blankSpeaker: '민지', choices: [{ ko: '좋아! 뭐 가져갈까?', zh: '好！我带什么去？', correct: true }, { ko: '싫어, 안 갈래.', zh: '不要，我不去。', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '좋아 + ~ㄹ까 提议共同贡献' },
    { type: 'dialogue', id: 'd37-sc-d3', lines: [{ speaker: '준호', ko: '매워… 물… 우유 있어?', zh: '辣……水……有牛奶吗？' }], blankSpeaker: '토리', choices: [{ ko: '밥이랑 같이 먹으면 괜찮아.', zh: '和米饭一起吃就好了。', correct: true }, { ko: '밥 먹지 마.', zh: '不要吃饭。', correct: false }, { ko: '우유 마시지 마.', zh: '不要喝牛奶。', correct: false }, { ko: '싫어, 물 없어.', zh: '不要，没有水。', correct: false }], explain: '~(으)면 假设 · 帮朋友解辣' },

    { type: 'context', id: 'd37-sc-c1', ko: '훠궈 먹을래?', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '邀请对方一起 / 问对方要不要 · 询问意愿', correct: true }, { zh: '陈述自己在吃火锅', correct: false }, { zh: '拒绝对方的火锅邀请', correct: false }, { zh: '问过去有没有吃过', correct: false }], explain: '~(으)ㄹ래? 询问对方意愿' },
    { type: 'context', id: 'd37-sc-c2', ko: '같이 산책할까요?', promptZh: '这句话和 "산책하실래요?" 的差别，哪句最准确？', choices: [{ zh: '~ㄹ까요 = "我们要不要一起(散步)"；~실래요 = "您要不要(散步)"', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~ㄹ까요 是过去时', correct: false }, { zh: '~실래요 是命令形', correct: false }], explain: '共同提议 vs 询问对方 · 主语侧重不同' },
  ],
};
