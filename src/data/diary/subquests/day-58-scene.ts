import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 2-4 상황 속으로 · 重走第一天的路 */
export const day58Scene: SceneSubQuestData = {
  day: 28, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '한빛 기숙사 로비 · 浣熊阿姨',

  tasks: [
    { type: 'situation', id: 'd58-sc-s1', scenario: '浣熊阿姨问你今天在做什么。你想说"来回忆的"，最自然的一句？', choices: [{ ko: '기억하러 왔어요.', zh: '来回忆的。', correct: true }, { ko: '기억해서 왔어요.', zh: '因为想起来了才来的。', correct: false }, { ko: '기억하니까 왔어요.', zh: '因为记得所以来了。', correct: false }, { ko: '기억이 없어요.', zh: '没有记忆。', correct: false }], explain: 'Tori 原句 · ~(으)러 오다 目的' },
    { type: 'situation', id: 'd58-sc-s2', scenario: '你想说"重走一遍才明白。同一条路，不同的感觉"，最自然的一句？', choices: [{ ko: '다시 걸어보니까 알겠어요. 같은 길인데 다른 느낌이에요.', zh: '重新走了才明白。同一条路，不同的感觉。', correct: true }, { ko: '다시 걸으니까 알겠어요. 같은 길인데 다른 느낌이에요.', zh: '重新走了才明白。同一条路，不同的感觉。', correct: false }, { ko: '다시 걷보니까 알겠어요. 같은 길인데 다른 느낌이에요.', zh: '重新走了才明白。同一条路，不同的感觉。', correct: false }, { ko: '다시 걸었어서 알겠어요.', zh: '因为重新走了所以明白了。', correct: false }], explain: 'Tori 原句 · ~아/어 보니까 + ~는데' },
    { type: 'situation', id: 'd58-sc-s3', scenario: '你想说"想对 Day 1 的自己说\"没事，会到的\""，最自然的一句？', choices: [{ ko: 'Day 1의 나한테 "괜찮아, 도착해"라고 말하고 싶어요.', zh: '想对 Day 1 的自己说"没事，会到的"。', correct: true }, { ko: 'Day 1의 나한테서 "괜찮아, 도착해"라고 말하고 싶어요.', zh: '想对 Day 1 的自己说"没事，会到的"。', correct: false }, { ko: 'Day 1의 나한테 "괜찮아, 도착해"고 말하고 싶어요.', zh: '想对 Day 1 的自己说"没事，会到的"。', correct: false }, { ko: 'Day 1의 나한테 "괜찮아, 도착해"라도 말했어요.', zh: '对 Day 1 的自己也说了"没事，会到的"。', correct: false }], explain: '~라고 하다 直接引用 + ~고 싶어요' },

    { type: 'dialogue', id: 'd58-sc-d1', lines: [{ speaker: '浣熊阿姨', ko: '아, 토리 학생! 오늘 뭐 하는 날?', zh: '啊，兔莉！今天在做什么呢？' }], blankSpeaker: '토리', choices: [{ ko: '기억하러 왔어요.', zh: '来回忆的。', correct: true }, { ko: '없어요.', zh: '没有。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · ~러 오다' },
    { type: 'dialogue', id: 'd58-sc-d2', lines: [{ speaker: '浣熊阿姨', ko: '많이 컸네, 토리 학생. Day 1에는 진짜 어렸었지.', zh: '长大很多啊，兔莉。Day 1 时真的很稚嫩。' }], blankSpeaker: '토리', choices: [{ ko: '다시 걸어보니까 알겠어요. 같은 길인데 다른 느낌이에요.', zh: '重新走了才明白。同一条路，不同的感觉。', correct: true }, { ko: '아직 안 컸어요.', zh: '还没长大。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · ~아/어 보니까 + ~는데' },
    { type: 'dialogue', id: 'd58-sc-d3', lines: [{ speaker: '浣熊阿姨', ko: '앞으로도 화이팅!', zh: '继续加油！' }], blankSpeaker: '토리', choices: [{ ko: '네, 계속 열심히 할게요. 감사합니다.', zh: '好，会继续努力的。谢谢。', correct: true }, { ko: '아니에요, 저 이제 안 해요.', zh: '不了，我现在不做了。', correct: false }, { ko: '그러세요, 아주머니.', zh: '好的，阿姨。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '承诺 + 感谢' },

    { type: 'context', id: 'd58-sc-c1', ko: '~아/어 보니까 vs ~(으)니까', promptZh: '两者的语义差别，哪句最准确？', choices: [{ zh: '~아/어 보니까 = 试过才知道（经验发现）· ~(으)니까 = 一般原因（因为）· 结果句性质不同', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~아/어 보니까 只用于书面', correct: false }, { zh: '~(으)니까 是命令形', correct: false }], explain: '걸어 보니까 알겠어요 vs 걸으니까 아파요' },
    { type: 'context', id: 'd58-sc-c2', ko: '같은 길인데 다른 느낌', promptZh: '这句话的语法结构，哪句最准确？', choices: [{ zh: '같은 (형용사 관형사) + 길 (名) + 인데 (~는데 铺垫) + 다른 (형용사 관형사) + 느낌 (名) · Day 48 ~는데 深化', correct: true }, { zh: '~인데 是过去时', correct: false }, { zh: '같은 是动词', correct: false }, { zh: '~인데 是命令形', correct: false }], explain: '铺垫 + 感受对比' },
  ],
};
