import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：弘爪街生日咖啡 · 追星现场 + 진짜/정말 语感区分
 */
export const day23Scene: SceneSubQuestData = {
  day: 23, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在生日咖啡门口，用对每一个"真的"', subtitleEn: 'At the entrance of the birthday café, use every "really" correctly',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd23-sc-s1',
      scenario: 'Junho 兴奋地跳起来喊「모찌 오빠 생카야!」，你也很吃惊。반말朋友之间最自然的一句？', scenarioEn: 'Junho jumps up excitedly shouting "모찌 오빠 생카야!" and you\'re shocked too. What\'s the most natural casual thing to say between friends?',
      choices: [
        { ko: '와, 진짜? 사람 진짜 많아!', zh: '哇，真的？真的好多人！', zhEn: 'Wow, really? There are so many people!', correct: true },
        { ko: '정말요? 정말 사람이 많습니다.', zh: '真的吗？真的人很多。', zhEn: 'Really? There really are a lot of people.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
      ],
      explain: '朋友间 → 반말 + 진짜。正式敬语在这里反而奇怪', explainEn: 'Between friends → casual speech + 진짜. Formal honorifics would sound weird here',
    },
    {
      type: 'situation',
      id: 'd23-sc-s2',
      scenario: '老师帮你改完作业还写了鼓励的话，你想真心感谢，最得体的一句？', scenarioEn: 'Your teacher corrected your homework and wrote words of encouragement. You want to thank them sincerely. What\'s the most appropriate thing to say?',
      choices: [
        { ko: '선생님, 정말 감사합니다.', zh: '老师，真的非常感谢。', zhEn: 'Teacher, thank you so much.', correct: true },
        { ko: '선생님, 진짜 감사합니다.', zh: '老师，真的非常感谢。', zhEn: 'Teacher, thank you so much.', correct: false },
        { ko: '선생님, 대박!', zh: '老师，牛！', zhEn: 'Teacher, you\'re awesome!', correct: false },
        { ko: '선생님, 진짜 고마워.', zh: '老师，真谢了。', zhEn: 'Teacher, thanks a lot.', correct: false },
      ],
      explain: '对长辈 → 정말 + 합쇼체。진짜 语感偏幼稚，대박 更是반말', explainEn: 'To elders → 정말 + 합쇼 style. 진짜 sounds childish, and 대박 is even more casual',
    },
    {
      type: 'situation',
      id: 'd23-sc-s3',
      scenario: 'Junho 送你一张 Mochi 的 포토카드，你惊喜又想认真道谢，最韩国年轻人的一句？', scenarioEn: 'Junho gives you a Mochi photocard. You\'re surprised and want to thank him sincerely. What\'s the most natural Korean young person\'s response?',
      choices: [
        { ko: '정말요? 진짜 고마워요!', zh: '真的吗？真的太谢谢了！', zhEn: 'Really? Thank you so much!', correct: true },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '팬가 뭐예요?', zh: '粉丝是什么？', zhEn: 'What is a fan?', correct: false },
      ],
      explain: '朋友送礼 → 정말요?（惊喜反问）+ 진짜 고마워요（感谢加强）。两个都用是特色', explainEn: 'Friend gives a gift → 정말요? (surprised) + 진짜 고마워요 (emphatic thanks). Using both is a signature move',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd23-sc-d1',
      lines: [
        { speaker: '준호', ko: '토리야, 모찌 오빠 생일카페야!', zh: '兔莉，这是 Mochi 哥的生日咖啡店！', zhEn: 'Tori, this is Mochi oppa\'s birthday café!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '와, 진짜 사람 많아!', zh: '哇，真的好多人！', zhEn: 'Wow, there are so many people!', correct: true },
        { ko: '정말 감사합니다.', zh: '真的非常感谢。', zhEn: 'Thank you so much.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
      ],
      explain: '朋友对朋友 → 진짜 + 반말（많아）。정말 합쇼체在这里错语境', explainEn: 'Friend to friend → 진짜 + casual speech (많아). 정말 합쇼 style is the wrong register here',
    },
    {
      type: 'dialogue',
      id: 'd23-sc-d2',
      lines: [
        { speaker: '준호', ko: '음료 사면 응원 카드 받을 수 있어. 우리도 사자!', zh: '买饮料就能拿到应援卡。我们也买吧！', zhEn: 'Buy a drink and you get a support card. Let\'s get one too!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '나도 팬이 돼도 돼?', zh: '我也可以当粉丝吗？', zhEn: 'Can I be a fan too?', correct: true },
        { ko: '팬가 뭐예요?', zh: '粉丝是什么？', zhEn: 'What is a fan?', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '「N이/가 되다」= 成为 N。반말 场合用 나 + 팬이 돼도 돼?（我也能当吗？）', explainEn: '「N이/가 되다」= to become N. In casual settings, use 나 + 팬이 돼도 돼? (Can I be a fan too?)',
    },
    {
      type: 'dialogue',
      id: 'd23-sc-d3',
      lines: [
        { speaker: '준호', ko: '다음 주에 콘서트 있어. 갈래?', zh: '下周有演唱会。要去吗？', zhEn: 'There\'s a concert next week. Want to go?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '진짜? 정말 가고 싶어요!', zh: '真的吗？真的好想去！', zhEn: 'Really? I really want to go!', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '콘서트가 뭐예요?', zh: '演唱会是什么？', zhEn: 'What\'s a concert?', correct: false },
      ],
      explain: '进阶用法：진짜?（口语惊喜）→ 정말 + 해요体（认真愿望）。年轻人真实语料', explainEn: 'Advanced usage: 진짜? (casual surprise) → 정말 + 해요 form (sincere wish). Real language from young people.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd23-sc-c1',
      ko: '이 가방 진짜예요?',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '朋友买了名牌包，你想问是不是正品', zhEn: 'Your friend bought a designer bag and you want to ask if it\'s authentic.', correct: true },
        { zh: '朋友告诉你一个消息，你确认信息真伪', zhEn: 'A friend tells you something and you confirm whether it\'s true.', correct: false },
        { zh: '在餐厅问菜品新鲜度', zhEn: 'Asking about the freshness of a dish at a restaurant.', correct: false },
        { zh: '第一次见面打招呼', zhEn: 'Greeting someone for the first time', correct: false },
      ],
      explain: '진짜 当名词 = 真品。정말이에요? 是"是真的吗"（问信息真伪），语境不同', explainEn: '진짜 as a noun = genuine item. 정말이에요? means "Is it true?" (asking if info is real) — different contexts.',
    },
    {
      type: 'context',
      id: 'd23-sc-c2',
      ko: '정말 감사합니다.',
      promptZh: '这句话最可能是谁说的？', promptZhEn: 'Who is most likely to say this?',
      choices: [
        { zh: '学生对老师、下属对上级、正式场合的感谢', zhEn: 'Thanks from a student to a teacher, subordinate to superior, or in formal settings.', correct: true },
        { zh: '朋友间随意的谢意', zhEn: 'Casual thanks between friends.', correct: false },
        { zh: '同龄人聊天时的感叹', zhEn: 'Exclamations when chatting with peers.', correct: false },
        { zh: '生气时表达讽刺', zhEn: 'Expressing sarcasm when angry.', correct: false },
      ],
      explain: '합쇼체 감사합니다 + 정말 = 最高级礼貌。同龄人间会说 진짜 고마워 반말', explainEn: '합쇼체 감사합니다 + 정말 = highest level of politeness. Between peers, you\'d say 진짜 고마워 in 반말.',
    },
  ],
};
