import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 48 · 2-4 상황 속으로 · 韩国电影 */
export const day48Scene: SceneSubQuestData = {
  day: 18, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: 'CGV 散场 · 心比韩语快',

  tasks: [
    { type: 'situation', id: 'd48-sc-s1', scenario: 'Junho 问电影怎么样。你想说"一半没懂但感动全懂了"（반말），最自然的一句？', choices: [{ ko: '반은 이해 못 했지만 감동은 다 느꼈어.', zh: '虽然一半没懂但感动全懂。', correct: true }, { ko: '반은 이해 못 했지만 감동은 못 느꼈어.', zh: '一半没懂，感动也没感受到。', correct: false }, { ko: '반은 이해 못 했는데 감동은 못 느꼈어.', zh: '一半没懂，感动也没感受到。', correct: false }, { ko: '반은 이해했지만 감동은 못 느꼈어.', zh: '一半懂了，但感动没感受到。', correct: false }], explain: 'Tori 原句 · ~지만' },
    { type: 'situation', id: 'd48-sc-s2', scenario: '你想说"电影有意思，可惜没字幕"，最自然的一句？', choices: [{ ko: '영화가 재미있는데 자막이 없어요.', zh: '电影有意思，可惜没字幕。', correct: true }, { ko: '영화가 재미있은데 자막이 없어요.', zh: '电影有意思，可惜没字幕。', correct: false }, { ko: '영화가 재미있는데 자막이 있어요.', zh: '电影有意思，还有字幕。', correct: false }, { ko: '영화가 재미있지만 자막을 없어요.', zh: '电影有意思，可惜没字幕。', correct: false }], explain: '재미있다 (V) → 재미있는데' },
    { type: 'situation', id: 'd48-sc-s3', scenario: '想温柔感叹"有字幕就好了（可惜没有）"，最自然的一句？', choices: [{ ko: '자막이 있으면 좋은데.', zh: '有字幕就好了。', correct: true }, { ko: '자막이 있으면 좋는데.', zh: '有字幕就好了。', correct: false }, { ko: '자막이 있어서 좋은데.', zh: '因为有字幕真好。', correct: false }, { ko: '자막이 있으면 좋다.', zh: '有字幕就好。', correct: false }], explain: '좋다 (형용사) → 좋은데' },

    { type: 'dialogue', id: 'd48-sc-d1', lines: [{ speaker: '준호', ko: '어때, 재밌었어?', zh: '怎么样，好看吗？' }], blankSpeaker: '토리', choices: [{ ko: '반은 이해 못 했지만 감동은 다 느꼈어.', zh: '一半没懂但感动全懂了。', correct: true }, { ko: '전혀 재미없었어.', zh: '一点也不好看。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 原句' },
    { type: 'dialogue', id: 'd48-sc-d2', lines: [{ speaker: '하루', ko: '나도 처음엔 그랬어. 한국어보다 마음이 빨라.', zh: '我一开始也这样。心比韩语快。' }], blankSpeaker: '토리', choices: [{ ko: '그 말이 진짜 위로가 됐어.', zh: '那句话真的安慰到我了。', correct: true }, { ko: '무슨 말이야?', zh: '什么意思？', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: '위로 · 温柔应答' },
    { type: 'dialogue', id: 'd48-sc-d3', lines: [{ speaker: '준호', ko: '다음엔 자막 없는 걸로 도전해 볼까?', zh: '下次挑战没字幕的？' }], blankSpeaker: '토리', choices: [{ ko: '다음엔 자막 있는 걸로 보자.', zh: '下次看有字幕的吧。', correct: true }, { ko: '자막 없는 게 재밌어.', zh: '没字幕的更有意思。', correct: false }, { ko: '다시는 영화 안 봐.', zh: '再也不看电影了。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '~자 邀约 · 有字幕的' },

    { type: 'context', id: 'd48-sc-c1', ko: '~지만 vs ~는데', promptZh: '两者的用法差别，哪句最准确？', choices: [{ zh: '~지만 = 明确对立 / 正式；~는데 = 铺垫 / 柔软日常 · 母语者聊天多用 ~는데', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~는데 是过去时', correct: false }, { zh: '~지만 只用于名词', correct: false }], explain: '语感差 · 场景不同' },
    { type: 'context', id: 'd48-sc-c2', ko: '오늘 김치찌개 시켰는데 진짜 맛있어요.', promptZh: '这句话中 ~는데 的功能，哪句最准确？', choices: [{ zh: '**铺垫功能** · 前面讲事情，后面接感受 / 评价 · 不一定是转折', correct: true }, { zh: '明确转折', correct: false }, { zh: '原因表达', correct: false }, { zh: '假设条件', correct: false }], explain: '母语者高频用法' },
  ],
};
