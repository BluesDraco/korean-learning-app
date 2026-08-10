import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 32 · 2-4 상황 속으로 · 一个人的中秋节 */
export const day32Scene: SceneSubQuestData = {
  day: 2, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '一个人的中秋 · Haru 敲门的那一刻',

  tasks: [
    {
      type: 'situation',
      id: 'd32-sc-s1',
      scenario: '中秋夜 Haru 递来松片糕说 "연휴라서 혼자 있으면 안 돼요"。你想道谢并解释想家的心情，最自然的一句？',
      choices: [
        { ko: '고마워요. 고향이 너무 보고 싶어서요.', zh: '谢谢。太想家了……', correct: true },
        { ko: '아니요, 저는 안 먹어요.', zh: '不了，我不吃。（拒绝好意）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（语境错）', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
      ],
      explain: '고마워요 + 보고 싶어서요（省略后半句，用因果句表达情感）',
    },
    {
      type: 'situation',
      id: 'd32-sc-s2',
      scenario: '你想给妈妈发消息解释"因为是连休学校放假了"，最标准的一句？',
      choices: [
        { ko: '연휴라서 학교가 쉬어요.', zh: '因为放假，学校休息。', correct: true },
        { ko: '연휴어서 학교가 쉬어요.', zh: '因为放假，学校休息。', correct: false },
        { ko: '연휴이라서 학교가 쉬어요.', zh: '因为是放假，学校休息。', correct: false },
        { ko: '연휴 학교가 쉬어요.', zh: '放假学校休息。', correct: false },
      ],
      explain: '연휴 无收音 → **라서**',
    },
    {
      type: 'situation',
      id: 'd32-sc-s3',
      scenario: '中秋外面下雨了，你想提醒 Haru "因为下雨，请带伞回去"，最合适的一句？',
      choices: [
        { ko: '비가 오니까 우산 가져가세요.', zh: '下雨了，请带伞。', correct: true },
        { ko: '비가 와서 우산 가져가세요.', zh: '因为下雨，请带伞。', correct: false },
        { ko: '비가 오면 우산 가져가세요.', zh: '如果下雨请带伞。（意思偏移）', correct: false },
        { ko: '비가 오지만 우산 가져가세요.', zh: '虽然下雨请带伞。（逻辑错）', correct: false },
      ],
      explain: '后半句是命令 → 必须用 ~(으)니까，不能用 ~아/어서',
    },

    {
      type: 'dialogue',
      id: 'd32-sc-d1',
      lines: [
        { speaker: '하루', ko: '토리, 연휴라서 혼자 있으면 안 돼요.', zh: '兔莉，放假嘛，一个人可不行。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '고마워요. 고향이 너무 보고 싶어서요.', zh: '谢谢。太想家了……', correct: true },
        { ko: '아니요, 필요 없어요.', zh: '不用了。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（语境错）', correct: false },
      ],
      explain: '收下好意 + 用 ~아/어서 说出情感原因',
    },
    {
      type: 'dialogue',
      id: 'd32-sc-d2',
      lines: [
        { speaker: '하루', ko: '엄마가 만든 송편이에요. 같이 먹어요.', zh: '妈妈做的松片糕。一起吃吧。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '와, 감사합니다. 잘 먹을게요.', zh: '哇，谢谢。我要开动了。', correct: true },
        { ko: '아니요, 안 먹어요.', zh: '不吃。', correct: false },
        { ko: '몰라요.', zh: '不知道。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '收到食物的标准礼貌回应 · 잘 먹을게요',
    },
    {
      type: 'dialogue',
      id: 'd32-sc-d3',
      lines: [
        { speaker: '하루', ko: '많이 힘들었죠?', zh: '很难过吧？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 조금요. 엄마가 보고 싶어요.', zh: '嗯，一点点。想妈妈。', correct: true },
        { ko: '아니요, 안 힘들어요.', zh: '没有，不难过。（强撑不真诚）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '네 + 조금요（诚实但克制）+ 说出真心话',
    },

    {
      type: 'context',
      id: 'd32-sc-c1',
      ko: '연휴라서 혼자예요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '解释"因为放假身边没人所以一个人"的当下情形', correct: true },
        { zh: '拒绝对方邀请', correct: false },
        { zh: '道歉自己迟到', correct: false },
        { zh: '感叹节日气氛好', correct: false },
      ],
      explain: '名词句因果 · 陈述现状的固定用法',
    },
    {
      type: 'context',
      id: 'd32-sc-c2',
      ko: '비가 와서 우산 가져가세요.',
      promptZh: '这句话在语法上有什么问题？',
      choices: [
        { zh: '后半句是命令句，因果连接必须换成 ~(으)니까 → 비가 오니까 우산 가져가세요', correct: true },
        { zh: '句子完全正确', correct: false },
        { zh: '요 应该改成 니다', correct: false },
        { zh: '와서 应改为 왔어서', correct: false },
      ],
      explain: '~아/어서 后半句只能接陈述 / 感叹 / 情感，不能接命令 / 建议',
    },
  ],
};
