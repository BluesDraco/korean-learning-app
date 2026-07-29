import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 50 · 2-4 상황 속으로 · 첫눈 · 许愿 */
export const day50Scene: SceneSubQuestData = {
  day: 20, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '广场初雪 · 一大一小的脚印',

  tasks: [
    { type: 'situation', id: 'd50-sc-s1', scenario: 'Haru 告诉你韩国传说，你想说"那我也许一个"（반말），最自然的一句？', choices: [{ ko: '진짜? 그럼 나도 하나 빌게.', zh: '真的？那我也许一个。', correct: true }, { ko: '진짜? 나 소원 없어.', zh: '真的？我没有愿望。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: 'Tori 原句 · ~ㄹ게 承诺' },
    { type: 'situation', id: 'd50-sc-s2', scenario: 'Haru 问你许了什么愿。你不想说，最自然的一句？', choices: [{ ko: '비밀이야. 말하면 안 이뤄진대.', zh: '是秘密。说了就不灵了。', correct: true }, { ko: '나도 몰라.', zh: '我也不知道。', correct: false }, { ko: '너 먼저 말해.', zh: '你先说。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 借传说挡回' },
    { type: 'situation', id: 'd50-sc-s3', scenario: '想温柔说"要是能说好韩语就好了"（愿望），最自然的一句？', choices: [{ ko: '한국어를 잘하면 좋겠어요.', zh: '要是能说好韩语就好了。', correct: true }, { ko: '한국어를 잘하는 좋겠어요.', zh: '要是能说好韩语就好了。', correct: false }, { ko: '한국어가 잘하면 좋겠어요.', zh: '要是能说好韩语就好了。', correct: false }, { ko: '한국어를 잘하면 좋았어요.', zh: '说好韩语的话就好了。', correct: false }], explain: '~(으)면 좋겠어요 愿望 · Day 44 复习' },

    { type: 'dialogue', id: 'd50-sc-d1', lines: [{ speaker: '하루', ko: '토리! 첫눈이야!!', zh: '兔莉！是初雪！' }], blankSpeaker: '토리', choices: [{ ko: '나 한국에서 첫눈 처음이야.', zh: '我在韩国第一次看到雪。', correct: true }, { ko: '눈은 없어.', zh: '没有雪。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: 'Tori 内心 OS 转外话' },
    { type: 'dialogue', id: 'd50-sc-d2', lines: [{ speaker: '하루', ko: '한국에서는 첫눈이 오면 소원을 빌면 이뤄진대.', zh: '韩国说初雪时许愿会成真。' }], blankSpeaker: '토리', choices: [{ ko: '진짜? 그럼 나도 하나 빌게.', zh: '真的？那我也许一个。', correct: true }, { ko: '싫어. 안 빌래.', zh: '不要，我不许愿。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · ~ㄹ게' },
    { type: 'dialogue', id: 'd50-sc-d3', lines: [{ speaker: '하루', ko: '뭐 빌었어?', zh: '许了什么？' }], blankSpeaker: '토리', choices: [{ ko: '비밀이야. 말하면 안 이뤄진대.', zh: '是秘密。说了就不灵了。', correct: true }, { ko: '나도 몰라.', zh: '我也不知道。', correct: false }, { ko: '너 먼저 말해.', zh: '你先说。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句' },

    { type: 'context', id: 'd50-sc-c1', ko: '첫눈이 오면 소원을 빌면 이뤄진대.', promptZh: '这句话中的双 (으)면 结构，哪句最准确？', choices: [{ zh: 'A(으)면 B(으)면 C = 假设 A 且 B 会导致 C · 韩国传说 / 民俗最典型的表达', correct: true }, { zh: '两个 (으)면 意思相反', correct: false }, { zh: '第二个 (으)면 是敬语', correct: false }, { zh: '~대 是命令形', correct: false }], explain: '双假设链 · 民俗表达' },
    { type: 'context', id: 'd50-sc-c2', ko: '~(으)면 vs ~아/어서 vs ~아/어야 돼요', promptZh: '三者的语义分工，哪句最准确？', choices: [{ zh: '~(으)면 = 假设条件；~아/어서 = 已发生原因；~아/어야 돼요 = 义务 / 应该 · 三者语义完全不同', correct: true }, { zh: '三者完全一样', correct: false }, { zh: '~(으)면 是过去时', correct: false }, { zh: '~아/어야 돼요 是敬语', correct: false }], explain: '고급 표현의 정리' },
  ],
};
