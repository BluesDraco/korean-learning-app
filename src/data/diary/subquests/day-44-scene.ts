import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 44 · 2-4 상황 속으로 · 한강 소풍 */
export const day44Scene: SceneSubQuestData = {
  day: 14, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '한강 잔디밭 · 四人的毯子',

  tasks: [
    { type: 'situation', id: 'd44-sc-s1', scenario: '你躺在毯子上想说"这一天要是能永远持续就好了"（반말），最自然的一句？', choices: [{ ko: '이 하루가 영원히 계속됐으면 좋겠어.', zh: '这一天要是能永远持续就好了。', correct: true }, { ko: '이 하루가 영원히 계속되면 좋겠어.', zh: '这一天要是能永远持续就好了。', correct: false }, { ko: '이 하루가 영원히 계속돼서 좋겠어.', zh: '因为这一天永远持续所以真好。', correct: false }, { ko: '이 하루가 영원히 계속되고 좋겠어.', zh: '这一天永远持续也真好。', correct: false }], explain: 'Tori 原句 · ~았/었으면 좋겠어' },
    { type: 'situation', id: 'd44-sc-s2', scenario: '有人问你在韩国最想做到什么。你想说"要是能说好韩语就好了"，最自然的一句？', choices: [{ ko: '한국어를 잘했으면 좋겠어요.', zh: '要是能说好韩语就好了。', correct: true }, { ko: '한국어를 잘하면 됐어요.', zh: '韩语说好了就行了。', correct: false }, { ko: '한국어가 어려워요.', zh: '韩语很难。', correct: false }, { ko: '한국어를 잘한 좋겠어요.', zh: '要是能说好韩语就好了。', correct: false }], explain: '留学生愿望固定表达' },
    { type: 'situation', id: 'd44-sc-s3', scenario: '明天有活动但天气预报说下雨。你想温柔地说"要是不下就好了"，最自然的一句？', choices: [{ ko: '내일 비가 안 왔으면 좋겠어요.', zh: '要是明天不下雨就好了。', correct: true }, { ko: '내일 비가 안 오면 됐어요.', zh: '明天不下雨就行了。', correct: false }, { ko: '내일 비가 안 오았으면 좋겠어요.', zh: '要是明天不下雨就好了。', correct: false }, { ko: '내일 비를 안 왔으면 좋겠어요.', zh: '要是明天不下雨就好了。', correct: false }], explain: '否定 안 + 왔으면' },

    { type: 'dialogue', id: 'd44-sc-d1', lines: [{ speaker: '민지', ko: '하늘 진짜 예쁘다. 오늘 잘 왔다.', zh: '天空真美。今天来对了。' }], blankSpeaker: '토리', choices: [{ ko: '응, 이런 날이 자주 있었으면 좋겠어.', zh: '嗯，希望这样的日子多一些。', correct: true }, { ko: '싫어, 집에 가고 싶어.', zh: '不要，我想回家。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '~았/었으면 좋겠어 温柔应答' },
    { type: 'dialogue', id: 'd44-sc-d2', lines: [{ speaker: '하루', ko: '불가능하지만, 기억은 남아요.', zh: '虽然不可能，但记忆会留下。' }], blankSpeaker: '토리', choices: [{ ko: '그럼 잘 기억할게요.', zh: '那我会好好记住的。', correct: true }, { ko: '그럼 잊어버릴게요.', zh: '那我会忘记的。', correct: false }, { ko: '기억은 필요 없어요.', zh: '不需要记忆。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 承诺形' },
    { type: 'dialogue', id: 'd44-sc-d3', lines: [{ speaker: '준호', ko: '내년에도 같이 올 수 있을까?', zh: '明年也能一起来吗？' }], blankSpeaker: '토리', choices: [{ ko: '내년에도 같이 왔으면 좋겠어.', zh: '希望明年也一起来。', correct: true }, { ko: '내년에도 같이 왔어요.', zh: '明年也一起来过。', correct: false }, { ko: '싫어, 내년엔 안 와.', zh: '不要，明年我不来。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '未来愿望用 ~았/었으면' },

    { type: 'context', id: 'd44-sc-c1', ko: '이 하루가 계속됐으면 좋겠어.', promptZh: '这句话的形态和意义关系，哪句最准确？', choices: [{ zh: '**形态过去（됐），意义是现在 / 未来的愿望** · 韩语温柔希望的核心结构', correct: true }, { zh: '表过去发生了什么', correct: false }, { zh: '~됐 是被动形', correct: false }, { zh: '~좋겠어 是命令形', correct: false }], explain: '"如果过去成立就好了"的假设式愿望' },
    { type: 'context', id: 'd44-sc-c2', ko: '~았/었으면 좋겠어요 vs ~(으)면 좋겠어요', promptZh: '两者的差别，哪句最准确？', choices: [{ zh: '~았/었으면 좋겠어요 更温柔 / 强烈 · 母语者九成用这个；~(으)면 좋겠어요 更中性', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~았/었으면 是过去愿望', correct: false }, { zh: '~(으)면 是命令形', correct: false }], explain: '自然度 = 过去形胜出' },
  ],
};
