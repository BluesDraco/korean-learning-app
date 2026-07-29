import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 40 · 2-4 상황 속으로 · Minji家的饭桌 */
export const day40Scene: SceneSubQuestData = {
  day: 10, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '第一次进韩国朋友的家',

  tasks: [
    { type: 'situation', id: 'd40-sc-s1', scenario: 'Minji 妈妈在门口欢迎你。你想礼貌道谢，最标准的一句？', choices: [{ ko: '안녕하세요. 초대해 주셔서 감사합니다.', zh: '您好。谢谢您邀请我。', correct: true }, { ko: '안녕. 초대해 줘서 고마워.', zh: '你好，谢谢邀请我。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 原句 · 敬语致谢' },
    { type: 'situation', id: 'd40-sc-s2', scenario: '饭前 Minji 爸爸给你盛饭说"多吃点"。你想说"我要开动了"，最标准的一句？', choices: [{ ko: '네, 잘 먹겠습니다.', zh: '好，我要开动了。', correct: true }, { ko: '네, 잘 먹었습니다.', zh: '好，我吃好了。', correct: false }, { ko: '아니요, 안 먹어요.', zh: '不了，我不吃。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '饭前 잘 먹겠습니다 vs 饭后 잘 먹었습니다' },
    { type: 'situation', id: 'd40-sc-s3', scenario: '饭吃完了，你想向 Minji 一家道谢并夸饭菜好吃，最合适的一句？', choices: [{ ko: '잘 먹었습니다. 정말 맛있었어요.', zh: '吃好了。真的很好吃。', correct: true }, { ko: '많이 먹었어요.', zh: '吃得很多。', correct: false }, { ko: '집에 갈게요.', zh: '我要回家了。', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '饭后 잘 먹었습니다 = 敬语致谢' },

    { type: 'dialogue', id: 'd40-sc-d1', lines: [{ speaker: '민지 할머니', ko: '아, 우리 민지가 좋아하는 친구구나.', zh: '啊，原来是민지喜欢的朋友啊。' }], blankSpeaker: '토리', choices: [{ ko: '안녕하세요, 할머니. 토리라고 해요.', zh: '您好，奶奶。我叫兔莉。', correct: true }, { ko: '안녕, 나 토리야.', zh: '你好，我是兔莉。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '~라고 해요 = 叫做～ + 敬语' },
    { type: 'dialogue', id: 'd40-sc-d2', lines: [{ speaker: '민지 아버지', ko: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.', zh: '多吃点。学生要吃得好才能学得好。' }], blankSpeaker: '토리', choices: [{ ko: '네, 잘 먹겠습니다.', zh: '好，我要开动了。', correct: true }, { ko: '아니요, 배 안 고파요.', zh: '不了，我不饿。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '饭前 잘 먹겠습니다' },
    { type: 'dialogue', id: 'd40-sc-d3', lines: [{ speaker: '민지 어머니', ko: '토리씨, 한국어 어때요?', zh: '兔莉，韩语怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '어려워요. 하지만 재미있어요.', zh: '难。但是有意思。', correct: true }, { ko: '한국어를 만들었어요.', zh: '创造了韩语。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어요.', zh: '不要。', correct: false }], explain: '诚实又积极的回应 · 하지만 转折' },

    { type: 'context', id: 'd40-sc-c1', ko: '우리 민지가 좋아하는 친구구나.', promptZh: '这句话的语气特征，哪句最准确？', choices: [{ zh: '**长辈对晚辈**的반말감탄 · 温柔发现感 · 隐含"我们家人一样"的接纳', correct: true }, { zh: '晚辈对长辈用', correct: false }, { zh: '陌生人之间用', correct: false }, { zh: '书面正式表达', correct: false }], explain: '~구나 长辈亲和的반말감탄' },
    { type: 'context', id: 'd40-sc-c2', ko: '~구나 vs ~네요', promptZh: '这两种感叹句尾的差别，哪句最准确？', choices: [{ zh: '~구나 = **반말** · 长辈对晚辈 / 朋友之间 / 自言自语；~네요 = **敬语** · 通用', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~구나 是过去时', correct: false }, { zh: '~네요 是命令形', correct: false }], explain: '安全款用 ~네요（对所有人都可以）' },
  ],
};
