import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 2-4 상황 속으로 · 妈妈的一句韩语 */
export const day47Scene: SceneSubQuestData = {
  day: 17, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '深夜视频 · 屏幕两端',

  tasks: [
    { type: 'situation', id: 'd47-sc-s1', scenario: '你想转述"Haru 说记忆会留下"，最自然的一句？', choices: [{ ko: '하루가 기억은 남는다고 했어요.', zh: 'Haru 说记忆会留下。', correct: true }, { ko: '하루가 기억이 없다고 했어요.', zh: 'Haru 说没有记忆。', correct: false }, { ko: '하루가 기억을 잊었어요.', zh: 'Haru 忘记了记忆。', correct: false }, { ko: '하루가 기억은 남다고 했어요.', zh: 'Haru 说记忆会留下。', correct: false }], explain: '动词间接引用 · ~는다고' },
    { type: 'situation', id: 'd47-sc-s2', scenario: '你想转述"妈妈说要有勇气"（命令引用），最自然的一句？', choices: [{ ko: '엄마가 용기 내라고 하셨어요.', zh: '妈妈说要有勇气。', correct: true }, { ko: '엄마가 용기 낸다고 하셨어요.', zh: '妈妈说会拿出勇气。', correct: false }, { ko: '엄마가 용기 내다고 하셨어요.', zh: '妈妈说要有勇气。', correct: false }, { ko: '엄마가 용기 내고 하셨어요.', zh: '妈妈拿出勇气说了。', correct: false }], explain: '命令引用 · ~(으)라고 하다' },
    { type: 'situation', id: 'd47-sc-s3', scenario: '你想转述"Junho 说发音好"（形容词），最自然的一句？', choices: [{ ko: '준호가 발음이 좋다고 했어요.', zh: 'Junho 说发音好。', correct: true }, { ko: '준호가 발음이 좋는다고 했어요.', zh: 'Junho 说发音好。', correct: false }, { ko: '준호가 발음이 좋았다고 하다.', zh: 'Junho 说发音好过。', correct: false }, { ko: '준호가 발음을 좋다고 했어요.', zh: 'Junho 说发音好。', correct: false }], explain: '형용사 → 다고 하다' },

    { type: 'dialogue', id: 'd47-sc-d1', lines: [{ speaker: '엄마', ko: '용기 내.', zh: '要有勇气。' }], blankSpeaker: '토리', choices: [{ ko: '엄마가 발음도 잘하시네요. 언제 배웠어요?', zh: '妈妈发音也不错呢。什么时候学的？', correct: true }, { ko: '엄마, 한국 사람이에요?', zh: '妈妈，您是韩国人吗？', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '~시네요 敬语感叹' },
    { type: 'dialogue', id: 'd47-sc-d2', lines: [{ speaker: '엄마', ko: '한국에서 친구들이 잘해줘?', zh: '在韩国朋友对你好吗？' }], blankSpeaker: '토리', choices: [{ ko: '네, 준호가 제 발음이 좋다고 했어요.', zh: '嗯，Junho 说我发音好。', correct: true }, { ko: '네, 준호가 제 발음을 좋다고 하다.', zh: '嗯，Junho 说我发音好。', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '~다고 했어요 转述夸奖' },
    { type: 'dialogue', id: 'd47-sc-d3', lines: [{ speaker: '엄마', ko: '엄마도 한국어 배워야겠다.', zh: '妈妈也得学韩语了。' }], blankSpeaker: '토리', choices: [{ ko: '제가 매주 한 마디씩 가르쳐 드릴게요.', zh: '我每周教您一句吧。', correct: true }, { ko: '엄마가 저를 가르쳐 주세요.', zh: '妈妈，请教我。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어요.', zh: '不要。', correct: false }], explain: '施惠 · 我教长辈 → 가르쳐 드리다' },

    { type: 'context', id: 'd47-sc-c1', ko: '하루가 기억은 남는다고 했어요.', promptZh: '这句话的结构，哪句最准确？', choices: [{ zh: '**间接引用** · 主语 (说话人) 이/가 + 引用内容 + ~ㄴ/는다고 하다 · 转述别人说过的话', correct: true }, { zh: '直接引用', correct: false }, { zh: '第一人称陈述', correct: false }, { zh: '命令句', correct: false }], explain: '~다고 하다 = 간접인용' },
    { type: 'context', id: 'd47-sc-c2', ko: '엄마가 용기 내라고 하셨어요 vs 낸다고', promptZh: '两者的差别，哪句最准确？', choices: [{ zh: '~(으)라고 하다 = 命令 / 建议引用；~ㄴ/는다고 하다 = 陈述引用 · 意思完全不同', correct: true }, { zh: '两者一样', correct: false }, { zh: '~라고 只用于书面', correct: false }, { zh: '~ㄴ/는다고 只用于过去', correct: false }], explain: '엄마가 오라고 했어요（让来）vs 엄마가 온다고 했어요（说会来）' },
  ],
};
