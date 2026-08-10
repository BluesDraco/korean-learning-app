import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 2-4 상황 속으로 · 한글날 특별 수업 */
export const day39Scene: SceneSubQuestData = {
  day: 9, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '教室里 · 世宗大王和 24 个字母',

  tasks: [
    { type: 'situation', id: 'd39-sc-s1', scenario: '火鹤老师讲完韩文字母的来源，你想柔和地说"韩文好像很科学"，最自然的一句？', choices: [{ ko: '한글이 진짜 과학적인 것 같아요.', zh: '韩文真的好像很科学呢。', correct: true }, { ko: '한글이 진짜 과학적 것 같아요.', zh: '韩文真的好像很科学。', correct: false }, { ko: '한글이 진짜 과학적는 것 같아요.', zh: '韩文真的好像很科学。', correct: false }, { ko: '한글이 진짜 과학적이에요네요.', zh: '韩文真的很科学呢。', correct: false }], explain: 'Tori 原句 · 명사/이다 → 인 것 같아요' },
    { type: 'situation', id: 'd39-sc-s2', scenario: '你窗外看天，柔和地说"好像在下雨"，最自然的一句？', choices: [{ ko: '비가 오는 것 같아요.', zh: '好像在下雨。', correct: true }, { ko: '비가 온 것 같아요.', zh: '好像下过雨了。', correct: false }, { ko: '비가 오다요.', zh: '在下雨。', correct: false }, { ko: '비가 왔어요.', zh: '下雨了。', correct: false }], explain: '动词现在 → 는 것 같아요' },
    { type: 'situation', id: 'd39-sc-s3', scenario: '你尝了泡菜想说"好像很辣"，最自然的一句？', choices: [{ ko: '이 김치가 매운 것 같아요.', zh: '这个泡菜好像很辣。', correct: true }, { ko: '이 김치가 맵는 것 같아요.', zh: '这个泡菜好像很辣。', correct: false }, { ko: '이 김치가 매워 것 같아요.', zh: '这个泡菜好像很辣。', correct: false }, { ko: '이 김치가 매웠어요.', zh: '这个泡菜辣过了。', correct: false }], explain: '형용사 맵다 ㅂ 不规则 → 매운' },

    { type: 'dialogue', id: 'd39-sc-d1', lines: [{ speaker: '홍학 선생님', ko: 'ㄱ은 혀가 목구멍을 막는 모양이에요.', zh: 'ㄱ 是舌头堵住喉咙的样子。' }], blankSpeaker: '토리', choices: [{ ko: '어? 진짜 입 모양이랑 비슷해요.', zh: '咦？真的和嘴型很像。', correct: true }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 内心 OS · 자연스러운 발견' },
    { type: 'dialogue', id: 'd39-sc-d2', lines: [{ speaker: '홍학 선생님', ko: '한글, 어때요?', zh: '韩文怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '생각보다 더 아름다운 것 같아요.', zh: '感觉比想象中更美。', correct: true }, { ko: '한글은 이상해요.', zh: '韩文很奇怪。', correct: false }, { ko: '한글을 만들었어요.', zh: '创造了韩文。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '~ㄴ 것 같아요 表柔和 · 아름다운' },
    { type: 'dialogue', id: 'd39-sc-d3', lines: [{ speaker: '홍학 선생님', ko: '그래서 세계에서 유일하게 생일이 있는 글자예요.', zh: '所以是世界上唯一有生日的文字。' }], blankSpeaker: '토리', choices: [{ ko: '와, 진짜 특별한 것 같아요.', zh: '哇，真的好像很特别呢。', correct: true }, { ko: '와, 별로예요.', zh: '哇，一般般。', correct: false }, { ko: '와, 얼마예요?', zh: '哇，多少钱？', correct: false }, { ko: '와, 몰라요.', zh: '哇，不知道。', correct: false }], explain: '특별하다 → 특별한 것 같아요' },

    { type: 'context', id: 'd39-sc-c1', ko: '한글이 과학적인 것 같아요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '表达自己对某事物的看法 / 推测 · 不武断有礼貌', correct: true }, { zh: '断言这是科学事实', correct: false }, { zh: '拒绝对方观点', correct: false }, { zh: '感谢对方教你', correct: false }], explain: '~ㄴ 것 같아요 = 柔和表达观点' },
    { type: 'context', id: 'd39-sc-c2', ko: '~는 것 같아요 vs ~아/어요', promptZh: '这两种表达的差别，哪句最准确？', choices: [{ zh: '~는 것 같아요 = 推测 / 观点（柔和）；~아/어요 = 确信陈述 / 事实', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~는 것 같아요 是过去时', correct: false }, { zh: '~아/어요 是敬语', correct: false }], explain: '表达自己的观点用柔和的 ~ㄴ 것 같아요 显得有礼貌' },
  ],
};
