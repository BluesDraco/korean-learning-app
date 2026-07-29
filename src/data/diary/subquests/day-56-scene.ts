import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 56 · 2-4 상황 속으로 · 新生 · 짐/집 回归 */
export const day56Scene: SceneSubQuestData = {
  day: 26, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '宿舍 3 楼走廊 · Tori 成了别人的 Haru',

  tasks: [
    { type: 'situation', id: 'd56-sc-s1', scenario: '新生说"집이 진짜 너무 무거워요"。你想温柔纠错并说"一起收拾吧"，最自然的一句？', choices: [{ ko: '괜찮아요, 같이 정리해요. "집"이 아니라 "짐"이에요.', zh: '没事，一起收拾。不是"家"是"行李"。', correct: true }, { ko: '틀렸어. 다시 말해.', zh: '错了，重新说。', correct: false }, { ko: '집이 무겁죠? 이해해요.', zh: '家很重吧？我理解。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 温柔纠错 + 陪伴' },
    { type: 'situation', id: 'd56-sc-s2', scenario: '想温柔告诉新生"我一开始也犯过一样的错"（安慰经验），最自然的一句？', choices: [{ ko: '나도 처음에 똑같이 실수해 봤어요.', zh: '我一开始也一样犯过错。', correct: true }, { ko: '나도 처음에 실수했어요.', zh: '我一开始也犯过错。', correct: false }, { ko: '나도 처음에 실수하고 있어요.', zh: '我一开始也正在犯错。', correct: false }, { ko: '나도 처음에 실수할 거예요.', zh: '我一开始也会犯错的。', correct: false }], explain: '~아/어 봤어요 强调经验安慰' },
    { type: 'situation', id: 'd56-sc-s3', scenario: '想说"只是差一个收音"，最自然的一句？', choices: [{ ko: '받침 하나 차이예요.', zh: '只是差一个收音。', correct: true }, { ko: '받침 하나 다르지만 있어요.', zh: '虽然差一个收音但有。', correct: false }, { ko: '받침 하나만 있어요.', zh: '只有一个收音。', correct: false }, { ko: '받침 없어요.', zh: '没有收音。', correct: false }], explain: 'Tori 教语法的一句' },

    { type: 'dialogue', id: 'd56-sc-d1', lines: [{ speaker: '신입생', ko: '집이 진짜 너무 무거워요…', zh: '"家"太重了……' }], blankSpeaker: '토리', choices: [{ ko: '괜찮아요, 같이 정리해요.', zh: '没事，一起收拾。', correct: true }, { ko: '무슨 소리예요?', zh: '什么话？', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: 'Tori 温柔应答' },
    { type: 'dialogue', id: 'd56-sc-d2', lines: [{ speaker: '토리', ko: '"집"이 아니라 "짐"이에요.', zh: '不是"家"是"行李"。' }], blankSpeaker: '토리 (续)', choices: [{ ko: '집은 house, 짐은 luggage. 받침 하나 차이예요.', zh: '집 = 家，짐 = 行李。只是收音差一个字母。', correct: true }, { ko: '틀리면 안 돼요.', zh: '不能错。', correct: false }, { ko: '몰라도 돼요.', zh: '不知道也没关系。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 教学 · 完整解释' },
    { type: 'dialogue', id: 'd56-sc-d3', lines: [{ speaker: '토리', ko: '괜찮아요. 나도 처음에 똑같이 실수해 봤어요.', zh: '没事。我一开始也一样犯过错。' }], blankSpeaker: '신입생', choices: [{ ko: '진짜요? 감사해요, 언니.', zh: '真的吗？谢谢，姐姐。', correct: true }, { ko: '아니에요, 실수 안 했어요.', zh: '不，我没犯错。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: '新生真诚回应 · 感谢' },

    { type: 'context', id: 'd56-sc-c1', ko: '나도 처음에 똑같이 실수해 봤어요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '**安慰对方"我也经历过 / 犯过一样的错"** · ~아/어 봤어요 强调经验', correct: true }, { zh: '批评对方犯错', correct: false }, { zh: '道歉自己出错', correct: false }, { zh: '拒绝对方要求', correct: false }], explain: '~아/어 봤어요 = 经验安慰' },
    { type: 'context', id: 'd56-sc-c2', ko: 'Day 3 짐/집 vs Day 56', promptZh: '两天场景的对比意义，哪句最准确？', choices: [{ zh: 'Day 3 Tori 犯错说"집이 무거워요"· Day 56 Tori 教新生辨析 · 角色反转 = 成长', correct: true }, { zh: '两天完全一样', correct: false }, { zh: 'Day 56 才是初学者', correct: false }, { zh: 'Day 3 更难', correct: false }], explain: '故事线首尾呼应 · 从学习者到传授者' },
  ],
};
