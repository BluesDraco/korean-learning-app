import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 53 · 2-4 상황 속으로 · Tori 请客 */
export const day53Scene: SceneSubQuestData = {
  day: 23, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: 'BBQ 치킨点 · 26 天后的偿还',

  tasks: [
    { type: 'situation', id: 'd53-sc-s1', scenario: '你想独立点单"半半炸鸡一份、薯条一份、可乐两杯"，最自然的一句？', choices: [{ ko: '이모, 반반 한 마리랑 감튀 하나, 콜라 두 잔 주세요.', zh: '阿姨，半半炸鸡一份、薯条一份、可乐两杯。', correct: true }, { ko: '이모, 반반 하나 있어요?', zh: '阿姨，有半半炸鸡一份吗？', correct: false }, { ko: '반반 있어요?', zh: '有半半炸鸡吗？', correct: false }, { ko: '치킨 몰라요.', zh: '炸鸡不知道。', correct: false }], explain: 'Tori 独立点单' },
    { type: 'situation', id: 'd53-sc-s2', scenario: '你想承诺"今天我请"（반말），最自然的一句？', choices: [{ ko: '오늘은 내가 낼게.', zh: '今天我请。', correct: true }, { ko: '오늘은 내가 낼 거야.', zh: '今天我付。', correct: false }, { ko: '오늘은 내가 낼까?', zh: '今天我来付？', correct: false }, { ko: '오늘은 너희가 사.', zh: '今天你们请。', correct: false }], explain: 'Tori 承诺 · ~(으)ㄹ게' },
    { type: 'situation', id: 'd53-sc-s3', scenario: '想说"我刷卡结账"，最自然的一句？', choices: [{ ko: '카드로 결제할게요.', zh: '我刷卡结账。', correct: true }, { ko: '카드에 결제할게요.', zh: '我在卡上结账。', correct: false }, { ko: '카드로 결제할 거예요.', zh: '我要刷卡结账。', correct: false }, { ko: '카드로 결제할까요?', zh: '要刷卡结账吗？', correct: false }], explain: '~로 + ~ㄹ게요' },

    { type: 'dialogue', id: 'd53-sc-d1', lines: [{ speaker: '大鹦鹉阿姨', ko: '예, 반반 한 마리, 감튀, 콜라 두 잔이요.', zh: '好，半半炸鸡一份、薯条、可乐两杯。' }], blankSpeaker: '토리', choices: [{ ko: '네, 감사합니다.', zh: '好，谢谢。', correct: true }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어요.', zh: '不要。', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: '简短确认 + 感谢' },
    { type: 'dialogue', id: 'd53-sc-d2', lines: [{ speaker: '준호', ko: '이번엔 내가 살까?', zh: '这次我请？' }], blankSpeaker: '토리', choices: [{ ko: '아니, 오늘은 내가 낼게. Day 27에 민지가 사줬으니까.', zh: '不，今天我请。Day 27 Minji 请过。', correct: true }, { ko: '응, 니가 사.', zh: '嗯，你请吧。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · ~(으)ㄹ게 承诺 + ~(으)니까 원인' },
    { type: 'dialogue', id: 'd53-sc-d3', lines: [{ speaker: '민지', ko: '토리, 진짜 성장했다.', zh: '兔莉，真的成长了。' }], blankSpeaker: '토리', choices: [{ ko: '응, 다음엔 진짜 너희들이 사.', zh: '嗯，下次真的换你们请。', correct: true }, { ko: '아니, 아직 성장 안 했어.', zh: '不，还没长大。', correct: false }, { ko: '내가 계속 살게.', zh: '我会一直请。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 温柔承诺让下次换朋友请' },

    { type: 'context', id: 'd53-sc-c1', ko: '오늘은 내가 살게.', promptZh: '这句话的核心特征，哪句最准确？', choices: [{ zh: '**承诺形** · 主语必须"我" · 对听众发出的"我来做"的承诺', correct: true }, { zh: '客观计划', correct: false }, { zh: '试探询问', correct: false }, { zh: '过去陈述', correct: false }], explain: '~(으)ㄹ게 承诺' },
    { type: 'context', id: 'd53-sc-c2', ko: '~(으)ㄹ게요 vs ~(으)ㄹ 거예요', promptZh: '两者的语用差别，哪句最准确？', choices: [{ zh: '~(으)ㄹ게요 = 对听众承诺 · ~(으)ㄹ 거예요 = 客观声明计划 · 主语规则不同', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~(으)ㄹ게요 是过去时', correct: false }, { zh: '~(으)ㄹ 거예요 是命令形', correct: false }], explain: '语用维度差别' },
  ],
};
