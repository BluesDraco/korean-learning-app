import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-4 상황 속으로 · 情景关 · 中级班第一天
 * 3 种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：중급반 첫날 · 새 친구 자기소개 · Junho 悄悄话
 */
export const day31Scene: SceneSubQuestData = {
  day: 1, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '中级班第一天 · 面对新同学的每一句',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd31-sc-s1',
      scenario: 'Junho 拍你肩膀说 "토리도 인사해!"。第一次见 Danielle 自我介绍，最标准的一句？',
      choices: [
        { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', correct: true },
        { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。（对新朋友太随意）', correct: false },
        { ko: '다니엘씨, 한국 사람이에요?', zh: 'Danielle，你是韩国人吗？（跳过自我介绍）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（语境错）', correct: false },
      ],
      explain: '第一次见面 → 姓名 + 만나서 반가워요（해요体礼貌介绍）',
    },
    {
      type: 'situation',
      id: 'd31-sc-s2',
      scenario: '你听到 Danielle 说韩语超级流利，心里很惊讶想夸一句"水平真了不起呢"，最自然的一句？',
      choices: [
        { ko: '실력이 정말 대단하네요.', zh: '水平真了不起呢。', correct: true },
        { ko: '실력이 대단해네요.', zh: '实力真了不起呢。', correct: false },
        { ko: '실력이 대단하다요.', zh: '实力真的很了不起。', correct: false },
        { ko: '실력이 부러워요.', zh: '实力羡慕。(搭配奇怪)', correct: false },
      ],
      explain: '当下感叹 · V/A 词干 + 네요 = 「~了不起呢」',
    },
    {
      type: 'situation',
      id: 'd31-sc-s3',
      scenario: 'Junho 悄悄凑过来说 "와, 발음 진짜 유창하네요"，你想附和又不失礼，最合适的一句？',
      choices: [
        { ko: '그러게요. 진짜 부럽네요.', zh: '就是啊。真羡慕呢。', correct: true },
        { ko: '아니요, 별로예요.', zh: '不是啊，一般般。（当事人在旁边太伤人）', correct: false },
        { ko: '싫어요.', zh: '不要。（语境错）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（语境错）', correct: false },
      ],
      explain: '附和悄悄话 · 그러게요（就是嘛）+ 부럽네요（现场感受）',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd31-sc-d1',
      lines: [
        { speaker: '홍학 선생님', ko: '여러분, 오늘부터 중급반이에요. 새 친구를 소개할게요.', zh: '各位，从今天起是中级班。给你们介绍新朋友。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 잘 부탁드립니다.', zh: '好的，请多关照。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（对老师不合适）', correct: false },
      ],
      explain: '正式宣布 → 네 + 잘 부탁드립니다（合格응답）',
    },
    {
      type: 'dialogue',
      id: 'd31-sc-d2',
      lines: [
        { speaker: '다니엘', ko: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.', zh: '你好，我叫 Danielle。请多关照。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', correct: true },
        { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。（不合适）', correct: false },
        { ko: '한국 사람이세요?', zh: '你是韩国人吗？（跳过自我介绍）', correct: false },
        { ko: '몰라요.', zh: '不知道。', correct: false },
      ],
      explain: '第一次见面对等回应 · 自我介绍 + 만나서 반가워요',
    },
    {
      type: 'dialogue',
      id: 'd31-sc-d3',
      lines: [
        { speaker: '준호', ko: '와, 다니엘씨 발음 진짜 유창하네요.', zh: '哇，Danielle 发音真流利呢。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '그러게요. 실력이 정말 대단하네요.', zh: '就是啊。水平真了不起呢。', correct: true },
        { ko: '아직 저는 부족해요.', zh: '我还差得远。（转移话题）', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（语境错）', correct: false },
      ],
      explain: '附和感叹 · 그러게요 + 대단하네요 · 用 ~네요 保持"现场感受"',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd31-sc-c1',
      ko: '유창하네요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '第一次听对方说韩语，当场感叹发音流利', correct: true },
        { zh: '在字典里查到 유창하다 的意思时', correct: false },
        { zh: '安慰韩语不好的朋友', correct: false },
        { zh: '拒绝对方的邀请', correct: false },
      ],
      explain: '~네요 = 当下发现 / 新信息的感叹。适合"第一次听到"这类情境',
    },
    {
      type: 'context',
      id: 'd31-sc-c2',
      ko: '부럽네요.',
      promptZh: '「부럽네요」和「부러워요」的差别，下列哪句最准确？',
      choices: [
        { zh: '부럽네요 = 当下听到 / 看到后的感叹；부러워요 = 陈述"我羡慕"这件事', correct: true },
        { zh: '两者完全一样，可任意互换', correct: false },
        { zh: '부럽네요 是过去时', correct: false },
        { zh: '부러워요 是敬语，更正式', correct: false },
      ],
      explain: '~네요 前不发生 ㅂ 不规则 → 부럽네요（现场感叹）；해요体依然按不规则 → 부러워요（陈述）',
    },
  ],
};
