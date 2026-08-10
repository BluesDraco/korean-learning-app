import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 45 · 2-4 상황 속으로 · 中级月考 */
export const day45Scene: SceneSubQuestData = {
  day: 15, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '305 号教室 · 期中考后的自我对话',

  tasks: [
    { type: 'situation', id: 'd45-sc-s1', scenario: '你想告诉自己"我比 30 天前韩语更好"，最标准的一句？', choices: [{ ko: '저는 30일 전보다 한국어를 더 잘해요.', zh: '我比 30 天前韩语更好。', correct: true }, { ko: '저보다 30일 전이 한국어를 더 잘해요.', zh: '30 天前的我比现在韩语更好。', correct: false }, { ko: '저는 30일 전에서 한국어를 더 잘해요.', zh: '我比 30 天前韩语更好。', correct: false }, { ko: '저는 30일 전을 한국어를 더 잘해요.', zh: '我比 30 天前韩语更好。', correct: false }], explain: '主语 이/가 + 比较对象 보다' },
    { type: 'situation', id: 'd45-sc-s2', scenario: '你想说"今天比昨天更冷"，最标准的一句？', choices: [{ ko: '오늘이 어제보다 더 추워요.', zh: '今天比昨天更冷。', correct: true }, { ko: '오늘보다 어제가 더 추워요.', zh: '昨天比今天更冷。', correct: false }, { ko: '오늘이 어제보다 더 춥어요.', zh: '今天比昨天更冷。', correct: false }, { ko: '오늘은 어제에 더 추워요.', zh: '今天比昨天更冷。', correct: false }], explain: 'ㅂ 不规则 · 춥다 → 추워요' },
    { type: 'situation', id: 'd45-sc-s3', scenario: '想说"比起咖啡，更喜欢茶"，最自然的一句？', choices: [{ ko: '커피보다 차가 더 좋아요.', zh: '比起咖啡，更喜欢茶。', correct: true }, { ko: '커피가 차보다 더 좋아요.', zh: '咖啡比茶更好。', correct: false }, { ko: '커피에서 차가 더 좋아요.', zh: '从咖啡看茶更好。', correct: false }, { ko: '커피는 차가 더 좋아요.', zh: '咖啡的话茶更好。', correct: false }], explain: '보다 前面是被比较的对象' },

    { type: 'dialogue', id: 'd45-sc-d1', lines: [{ speaker: '홍학 선생님', ko: '자, 시험 시작합니다. 2시간 있습니다.', zh: '好，考试开始。有 2 小时。' }], blankSpeaker: '토리 (내면)', choices: [{ ko: '어? 이거 다 아는 건데?', zh: '咦？这些我都会啊？', correct: true }, { ko: '아, 하나도 몰라.', zh: '啊，一个也不会。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 内心 OS · 意外发现自己会' },
    { type: 'dialogue', id: 'd45-sc-d2', lines: [{ speaker: '홍학 선생님', ko: '토리, 진짜 많이 늘었네요. 축하해요.', zh: '兔莉，真的进步很多呢。恭喜。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다. 계속 열심히 할게요.', zh: '谢谢。我会继续努力的。', correct: true }, { ko: '아니에요, 별로 안 늘었어요.', zh: '没有，没进步多少。', correct: false }, { ko: '저 원래 잘해요.', zh: '我本来就学得好。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 谦虚 + 承诺' },
    { type: 'dialogue', id: 'd45-sc-d3', lines: [{ speaker: '준호', ko: '시험 어땠어?', zh: '考试怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '생각보다 익숙했어. 30일 전보다 많이 늘었어.', zh: '比想象中熟悉。比 30 天前进步了很多。', correct: true }, { ko: '몰라. 얼마예요?', zh: '不知道，多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }, { ko: '시험이 없어.', zh: '没有考试。', correct: false }], explain: '~보다 双使用' },

    { type: 'context', id: 'd45-sc-c1', ko: '30일 전보다 더 잘해요.', promptZh: '这句话的助词结构，哪句最准确？', choices: [{ zh: '**主语 이/가 (或 은/는) + 比较对象 + 보다 + (더) + A/V** · 主语和比较对象位置不能反', correct: true }, { zh: '主语必须用 보다', correct: false }, { zh: '~보다 只用于名词后过去时', correct: false }, { zh: '~보다 是敬语', correct: false }], explain: '저는 (주어) + 30일 전보다 (비교) + 더 잘해요' },
    { type: 'context', id: 'd45-sc-c2', ko: '~보다 vs ~에 비해서', promptZh: '两者的差别，哪句最准确？', choices: [{ zh: '~보다 = 口语常用；~에 비해서 = 书面 / 正式 · 意思等同', correct: true }, { zh: '两者完全不同', correct: false }, { zh: '~보다 是过去时', correct: false }, { zh: '~에 비해서 是命令形', correct: false }], explain: '语域差 · 意思对等' },
  ],
};
