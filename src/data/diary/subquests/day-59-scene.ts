import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 59 · 2-4 상황 속으로 · 中级毕业典礼预演 */
export const day59Scene: SceneSubQuestData = {
  day: 29, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '八遍稿子 · 卫生间镜子前 · 할 수 있어',

  tasks: [
    { type: 'situation', id: 'd59-sc-s1', scenario: 'Haru 问你稿子改了几遍。你想诚实说"第八遍还不满意"（반말），最自然的一句？', choices: [{ ko: '이제 여덟 번… 아직 마음에 안 들어.', zh: '现在第八遍……还不满意。', correct: true }, { ko: '이제 여덟 번… 아직 마음에 못 들어.', zh: '现在第八遍……还不满意。', correct: false }, { ko: '이제 여덟 번… 마음에 있어.', zh: '现在第八遍……在心上。', correct: false }, { ko: '아직 안 고쳤어.', zh: '还没改。', correct: false }], explain: 'Tori 原句 · 마음에 안 들다 = 不满意' },
    { type: 'situation', id: 'd59-sc-s2', scenario: '你对着镜子练自我介绍"我是兔莉。现在真的住在这里了"，最自然的一句？', choices: [{ ko: '저는 토리예요. 이제 정말 여기서 살아요.', zh: '我是兔莉。现在真的住在这里了。', correct: true }, { ko: '저는 토리예요. 이제 정말 여기서 살네요.', zh: '我是兔莉。现在真的住在这里呢。', correct: false }, { ko: '저는 토리예요. 이제 정말 여기서 삽니다.', zh: '我是兔莉。现在真的住在这里。', correct: false }, { ko: '저는 토리예요. 이제 정말 여기서 사네요.', zh: '我是兔莉。现在真的住在这里呢。', correct: false }], explain: 'Tori 原句 · 해요体 · 살다 → 살아요' },
    { type: 'situation', id: 'd59-sc-s3', scenario: '想给自己鼓劲"能做到。加油"（반말），最自然的一句？', choices: [{ ko: '할 수 있어. 화이팅.', zh: '能做到。加油。', correct: true }, { ko: '이제 그만할래.', zh: '我不做了。', correct: false }, { ko: '내일 결석해야겠어.', zh: '明天得请假。', correct: false }, { ko: '할 수 없어.', zh: '做不到。', correct: false }], explain: 'Tori 自我鼓励' },

    { type: 'dialogue', id: 'd59-sc-d1', lines: [{ speaker: '하루', ko: '토리, 원고 몇 번 고쳤어?', zh: '兔莉，稿子改了几遍？' }], blankSpeaker: '토리', choices: [{ ko: '이제 여덟 번… 아직 마음에 안 들어.', zh: '第八遍……还不满意。', correct: true }, { ko: '한 번도 안 고쳤어.', zh: '一次也没改。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句' },
    { type: 'dialogue', id: 'd59-sc-d2', lines: [{ speaker: '하루', ko: 'Day 30에도 이거 다 했잖아. 넌 이미 할 수 있어.', zh: 'Day 30 也做过啊。你已经能做到了。' }], blankSpeaker: '토리 (내면)', choices: [{ ko: '맞아, 그때도 손 떨렸는데 다 했어.', zh: '对，那时也手抖但都做到了。', correct: true }, { ko: '아니, Day 30 는 다른 사람이 했어.', zh: '不，Day 30 是别人做的。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 内心 · ~는데 铺垫' },
    { type: 'dialogue', id: 'd59-sc-d3', lines: [{ speaker: '하루', ko: '그럼 오늘 원고 다시 안 봐도 돼. 넌 이미 할 수 있어.', zh: '那今天不用再看稿了。你已经能做到了。' }], blankSpeaker: '토리', choices: [{ ko: '고마워, 하루야. 나도 그렇게 믿어볼게.', zh: '谢谢 Haru。我也要这样相信。', correct: true }, { ko: '아니야, 안 될 것 같아.', zh: '不，好像不行。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: 'Tori 接受鼓励 · ~아/어 볼게' },

    { type: 'context', id: 'd59-sc-c1', ko: '할 수 있어. 화이팅.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '**给自己 / 朋友鼓劲** · 发表 / 面试 / 挑战前 · 韩国最日常的加油组合', correct: true }, { zh: '拒绝对方', correct: false }, { zh: '道歉自己没准备', correct: false }, { zh: '感叹意外', correct: false }], explain: 'Day 38 复习 · Tori 决心' },
    { type: 'context', id: 'd59-sc-c2', ko: '~ㄹ 수 있어 vs ~ㄹ 수 있을 거예요', promptZh: '两者的差别，哪句最准确？', choices: [{ zh: '~ㄹ 수 있어 = 当下能力 / 决心 · ~ㄹ 수 있을 거예요 = 未来预测（会能做到）', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~ㄹ 수 있어 是过去', correct: false }, { zh: '~ㄹ 수 있을 거예요 是命令形', correct: false }], explain: '决心 vs 预测' },
  ],
};
