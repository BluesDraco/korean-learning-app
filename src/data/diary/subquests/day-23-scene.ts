import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：弘爪街生日咖啡 · 追星现场 + 진짜/정말 语感区分
 */
export const day23Scene: SceneSubQuestData = {
  day: 23, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在生日咖啡门口，用对每一个"真的"',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd23-sc-s1',
      scenario: 'Junho 兴奋地跳起来喊「모찌 오빠 생카야!」，你也很吃惊。반말朋友之间最自然的一句？',
      choices: [
        { ko: '와, 진짜? 사람 진짜 많아!', zh: '哇，真的？真的好多人！', correct: true },
        { ko: '정말요? 정말 사람이 많습니다.', zh: '真的吗？真的人很多。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
      ],
      explain: '朋友间 → 반말 + 진짜。正式敬语在这里反而奇怪',
    },
    {
      type: 'situation',
      id: 'd23-sc-s2',
      scenario: '老师帮你改完作业还写了鼓励的话，你想真心感谢，最得体的一句？',
      choices: [
        { ko: '선생님, 정말 감사합니다.', zh: '老师，真的非常感谢。', correct: true },
        { ko: '선생님, 진짜 감사합니다.', zh: '老师，真的非常感谢。', correct: false },
        { ko: '선생님, 대박!', zh: '老师，牛！', correct: false },
        { ko: '선생님, 진짜 고마워.', zh: '老师，真谢了。', correct: false },
      ],
      explain: '对长辈 → 정말 + 합쇼체。진짜 语感偏幼稚，대박 更是반말',
    },
    {
      type: 'situation',
      id: 'd23-sc-s3',
      scenario: 'Junho 送你一张 Mochi 的 포토카드，你惊喜又想认真道谢，最韩国年轻人的一句？',
      choices: [
        { ko: '정말요? 진짜 고마워요!', zh: '真的吗？真的太谢谢了！', correct: true },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '팬가 뭐예요?', zh: '粉丝是什么？', correct: false },
      ],
      explain: '朋友送礼 → 정말요?（惊喜反问）+ 진짜 고마워요（感谢加强）。两个都用是特色',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd23-sc-d1',
      lines: [
        { speaker: '준호', ko: '토리야, 모찌 오빠 생일카페야!', zh: '兔莉，这是 Mochi 哥的生日咖啡店！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '와, 진짜 사람 많아!', zh: '哇，真的好多人！', correct: true },
        { ko: '정말 감사합니다.', zh: '真的非常感谢。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
      ],
      explain: '朋友对朋友 → 진짜 + 반말（많아）。정말 합쇼체在这里错语境',
    },
    {
      type: 'dialogue',
      id: 'd23-sc-d2',
      lines: [
        { speaker: '준호', ko: '음료 사면 응원 카드 받을 수 있어. 우리도 사자!', zh: '买饮料就能拿到应援卡。我们也买吧！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '나도 팬이 돼도 돼?', zh: '我也可以当粉丝吗？', correct: true },
        { ko: '팬가 뭐예요?', zh: '粉丝是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '「N이/가 되다」= 成为 N。반말 场合用 나 + 팬이 돼도 돼?（我也能当吗？）',
    },
    {
      type: 'dialogue',
      id: 'd23-sc-d3',
      lines: [
        { speaker: '준호', ko: '다음 주에 콘서트 있어. 갈래?', zh: '下周有演唱会。要去吗？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '진짜? 정말 가고 싶어요!', zh: '真的吗？真的好想去！', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '콘서트가 뭐예요?', zh: '演唱会是什么？', correct: false },
      ],
      explain: '进阶用法：진짜?（口语惊喜）→ 정말 + 해요体（认真愿望）。年轻人真实语料',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd23-sc-c1',
      ko: '이 가방 진짜예요?',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '朋友买了名牌包，你想问是不是正品', correct: true },
        { zh: '朋友告诉你一个消息，你确认信息真伪', correct: false },
        { zh: '在餐厅问菜品新鲜度', correct: false },
        { zh: '第一次见面打招呼', correct: false },
      ],
      explain: '진짜 当名词 = 真品。정말이에요? 是"是真的吗"（问信息真伪），语境不同',
    },
    {
      type: 'context',
      id: 'd23-sc-c2',
      ko: '정말 감사합니다.',
      promptZh: '这句话最可能是谁说的？',
      choices: [
        { zh: '学生对老师、下属对上级、正式场合的感谢', correct: true },
        { zh: '朋友间随意的谢意', correct: false },
        { zh: '同龄人聊天时的感叹', correct: false },
        { zh: '生气时表达讽刺', correct: false },
      ],
      explain: '합쇼체 감사합니다 + 정말 = 最高级礼貌。同龄人间会说 진짜 고마워 반말',
    },
  ],
};
