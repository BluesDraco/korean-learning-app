import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 2-4 상황 속으로 · 调解冷战 */
export const day49Scene: SceneSubQuestData = {
  day: 19, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '教室后排 · 说出真心话',

  tasks: [
    { type: 'situation', id: 'd49-sc-s1', scenario: '你想劝 Minji 和 Junho"既然是朋友就应该互相道歉"，最自然的一句？', choices: [{ ko: '친구니까 서로 사과해야 돼.', zh: '既然是朋友就应该互相道歉。', correct: true }, { ko: '친구니까 서로 사과하야 돼.', zh: '既然是朋友就应该互相道歉。', correct: false }, { ko: '친구니까 서로 사과하고 돼.', zh: '既然是朋友就互相道歉了。', correct: false }, { ko: '친구니까 서로 사과했어야 돼.', zh: '既然是朋友就应该已经互相道歉。', correct: false }], explain: 'Tori 原句 · ~아/어야 돼' },
    { type: 'situation', id: 'd49-sc-s2', scenario: '想说"现在该睡了。明天有考试"，最自然的一句？', choices: [{ ko: '지금 자야 돼요. 내일 시험이에요.', zh: '现在该睡了。明天有考试。', correct: true }, { ko: '지금 자아야 돼요. 내일 시험이에요.', zh: '现在该睡了。明天有考试。', correct: false }, { ko: '지금 자야 되요. 내일 시험이에요.', zh: '现在该睡了。明天有考试。', correct: false }, { ko: '지금 자면 안 돼요. 내일 시험이에요.', zh: '现在不能睡。明天有考试。', correct: false }], explain: '자다 → 자야 돼요' },
    { type: 'situation', id: 'd49-sc-s3', scenario: '想说"不应该吵架"（否定形），最自然的一句？', choices: [{ ko: '싸우면 안 돼.', zh: '不能吵架。', correct: true }, { ko: '싸우지 않아야 돼.', zh: '不应该吵架。', correct: false }, { ko: '싸우고 안 돼.', zh: '吵架不行。', correct: false }, { ko: '싸우기 안 돼.', zh: '吵架不行。', correct: false }], explain: '否定 · ~(으)면 안 돼요' },

    { type: 'dialogue', id: 'd49-sc-d1', lines: [{ speaker: '민지', ko: '나 준호랑 진짜 못 봐. 이제 안 볼 거야.', zh: '我真的没法见 Junho 了。' }], blankSpeaker: '토리', choices: [{ ko: '둘 다 나 도와줬잖아. 근데 지금 싸우는 거 나는 너무 슬퍼.', zh: '你们俩都帮过我。现在这样吵我真的很难过。', correct: true }, { ko: '그럼 절교해.', zh: '那就绝交吧。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · 情感调解' },
    { type: 'dialogue', id: 'd49-sc-d2', lines: [{ speaker: '민지', ko: '나도 잘못했어. 미안해, 준호야.', zh: '我也有错。对不起。' }], blankSpeaker: '준호', choices: [{ ko: '아니야, 내가 먼저 미안해.', zh: '不，我先说对不起。', correct: true }, { ko: '됐어, 니 잘못이야.', zh: '算了，是你的错。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Junho 原句 · 主动承担' },
    { type: 'dialogue', id: 'd49-sc-d3', lines: [{ speaker: '민지 · 준호', ko: '토리 덕분에 화해했어.', zh: '多亏兔莉我们和好了。' }], blankSpeaker: '토리', choices: [{ ko: '너희 둘이 진짜 자랑스러워.', zh: '你们俩真让我骄傲。', correct: true }, { ko: '아직 다 끝난 게 아니야.', zh: '还没完全结束。', correct: false }, { ko: '이제 나가.', zh: '现在出去。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 真心夸奖' },

    { type: 'context', id: 'd49-sc-c1', ko: '서로 사과해야 돼.', promptZh: '这句话的语气特征，哪句最准确？', choices: [{ zh: '**~아/어야 돼** = 应该 / 必须 · 반말义务表达 · 说话人认为对方应该这么做', correct: true }, { zh: '过去时', correct: false }, { zh: '~돼요 是命令形', correct: false }, { zh: '只用于第一人称', correct: false }], explain: '~아/어야 돼' },
    { type: 'context', id: 'd49-sc-c2', ko: '~아/어야 돼요 vs ~(으)면 안 돼요', promptZh: '两者的关系，哪句最准确？', choices: [{ zh: '~아/어야 돼요 = 应该做（正面义务）· ~(으)면 안 돼요 = 不能做（负面禁止）· 语义相对', correct: true }, { zh: '两者一样', correct: false }, { zh: '~아/어야 돼요 是过去', correct: false }, { zh: '~(으)면 안 돼요 是敬语', correct: false }], explain: '사과해야 돼 vs 싸우면 안 돼' },
  ],
};
