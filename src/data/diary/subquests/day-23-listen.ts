import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 23 主流程「弘爪街·생카排队」+ 补充追星语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 진짜 vs 정말 的场景选择
 */
export const day23Listen: ListenSubQuestData = {
  day: 23, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在生日咖啡馆门口，听清 Junho 的每一句尖叫', subtitleEn: 'At the birthday café entrance, catch every word of Junho\'s screams',

  meaning: [
    {
      id: 'd23-l2-m1',
      audioKo: '모찌 오빠 생일카페야!',
      choices: [
        { text: '这是 Mochi 哥的生日咖啡店！', textEn: 'This is Mochi\'s birthday café!', correct: true },
        { text: 'Mochi 哥今天生日。', textEn: 'It\'s Mochi\'s birthday today.', correct: false },
        { text: 'Mochi 哥开了咖啡馆。', textEn: 'Mochi opened a café.', correct: false },
        { text: 'Mochi 哥喜欢喝咖啡。', textEn: 'Mochi likes drinking coffee.', correct: false },
      ],
      explain: '생일카페 = 粉丝为爱豆办的生日应援咖啡馆（缩写 생카）', explainEn: '생일카페 = a birthday support café fans hold for their idol (abbreviated as 생카)',
    },
    {
      id: 'd23-l2-m2',
      audioKo: '음료 한 잔 사면 응원 카드 받을 수 있어!',
      choices: [
        { text: '买一杯饮料就能拿到应援卡！', textEn: 'Buy one drink and you get a support card!', correct: true },
        { text: '应援卡免费送。', textEn: 'Support cards are free.', correct: false },
        { text: '一杯饮料要 30 块。', textEn: 'One drink costs 30 bucks.', correct: false },
        { text: '应援卡可以买饮料。', textEn: 'You can buy a drink with a support card.', correct: false },
      ],
      explain: '「V + 면 받을 수 있어요」= V 就能拿到。생카的规则语言', explainEn: '\'V + 면 받을 수 있어요\' = if you V, you can get it. The language of 생카 rules',
    },
    {
      id: 'd23-l2-m3',
      audioKo: '와, 진짜 사람 많아!',
      choices: [
        { text: '哇，真的好多人！', textEn: 'Wow, there are so many people!', correct: true },
        { text: '哇，真的都是人。', textEn: 'Wow, it\'s really packed.', correct: false },
        { text: '哇，一个人都没有。', textEn: 'Wow, there\'s no one at all.', correct: false },
        { text: '哇，人不算多。', textEn: 'Wow, it\'s not that crowded.', correct: false },
      ],
      explain: '진짜 = 口语"真的"。感叹场合最常用', explainEn: '진짜 = colloquial \'really\'. Most common in exclamations',
    },
    {
      id: 'd23-l2-m4',
      audioKo: '정말 감사합니다.',
      choices: [
        { text: '真的非常感谢。', textEn: 'Thank you so much.', correct: true },
        { text: '真的对不起。', textEn: 'I\'m really sorry.', correct: false },
        { text: '真的没关系。', textEn: 'It\'s really okay.', correct: false },
        { text: '再次感谢。', textEn: 'Thanks again.', correct: false },
      ],
      explain: '正式场合优先用 정말（합쇼체更配 정말）', explainEn: 'Use 정말 in formal settings (it pairs better with 합쇼체)',
    },
    {
      id: 'd23-l2-m5',
      audioKo: '이 노래 진짜 좋아요.',
      choices: [
        { text: '这首歌真好听。', textEn: 'This song is really good.', correct: true },
        { text: '这首歌不好听。', textEn: 'This song isn\'t good.', correct: false },
        { text: '这歌是新的。', textEn: 'This song is new.', correct: false },
        { text: '再放一遍这首歌。', textEn: 'Play this song again.', correct: false },
      ],
      explain: '진짜 + 形容词 = 加强程度"真的很~"', explainEn: '진짜 + adjective = intensifies to \'really ~\'',
    },
  ],

  cloze: [
    {
      id: 'd23-l2-c1',
      audioKo: '진짜 사람 많아!',
      clozeParts: ['', ' 사람 많아!'],
      choices: [
        { text: '진짜', correct: true },
        { text: '정말요', correct: false },
        { text: '진짜예요', correct: false },
        { text: '정말이', correct: false },
      ],
      explain: '朋友间感叹 → 진짜（口语）。반말 场合不用 정말요', explainEn: 'Among friends, use 진짜 (colloquial). In 반말, don\'t use 정말요',
    },
    {
      id: 'd23-l2-c2',
      audioKo: '정말 감사합니다.',
      clozeParts: ['', ' 감사합니다.'],
      choices: [
        { text: '정말', correct: true },
        { text: '진짜', correct: false },
        { text: '정말요', correct: false },
        { text: '진짜요', correct: false },
      ],
      explain: '합쇼체 감사합니다 前配 정말 最得体。진짜 感觉偏幼稚', explainEn: 'Before 합쇼체 감사합니다, 정말 is most appropriate. 진짜 feels childish',
    },
    {
      id: 'd23-l2-c3',
      audioKo: '저도 팬이 됐어요.',
      clozeParts: ['저도 ', ' 됐어요.'],
      choices: [
        { text: '팬이', correct: true },
        { text: '팬가', correct: false },
        { text: '팬을', correct: false },
        { text: '팬도', correct: false },
      ],
      explain: '「N이/가 되다」= 成为 N。팬 有收音 → 이。되다用主格', explainEn: '「N이/가 되다」= to become N. 팬 has a final consonant → 이. 되다 takes the subject particle',
    },
    {
      id: 'd23-l2-c4',
      audioKo: '콘서트에 가고 싶어요.',
      clozeParts: ['콘서트', ' 가고 싶어요.'],
      choices: [
        { text: '에', correct: true },
        { text: '을', correct: false },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '가다用 에（表方向）。콘서트에 가다 = 去演唱会', explainEn: '가다 uses 에 (for direction). 콘서트에 가다 = to go to a concert',
    },
  ],

  reply: [
    {
      id: 'd23-l2-r1',
      audioKo: '토리야, 모찌 오빠 생일카페야!',
      promptZh: 'Junho 兴奋地指着咖啡馆，你也很惊叹，最自然的一句？', promptZhEn: 'Junho excitedly points at the café, and you\'re amazed too. What\'s the most natural thing to say?',
      choices: [
        { text: '와, 진짜 사람 많아!', correct: true },
        { text: '정말 감사합니다.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
      ],
      explain: '朋友间感叹用 진짜 + 반말（많아!）。정말 감사합니다 太正式了', explainEn: 'Among friends, use 진짜 + casual speech (많아!). 정말 감사합니다 is too formal',
    },
    {
      id: 'd23-l2-r2',
      audioKo: '다음 주에 콘서트 있어. 갈래?',
      promptZh: 'Junho 邀你去演唱会，你很想去，最能表达认真的一句？', promptZhEn: 'Junho invites you to a concert and you really want to go. What\'s the most sincere thing to say?',
      choices: [
        { text: '진짜? 정말 가고 싶어요!', correct: true },
        { text: '콘서트가 뭐예요?', correct: false },
        { text: '저는 안 가요.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '진짜?（惊喜反问·口语）+ 정말 가고 싶어요（认真表达·해요体）= 韩国年轻人真实用法', explainEn: '진짜? (surprised follow-up, casual) + 정말 가고 싶어요 (sincere, 해요 style) = how young Koreans actually talk',
    },
    {
      id: 'd23-l2-r3',
      audioKo: '이 굿즈 하나 사 줄게. 사양하지 마.',
      promptZh: 'Junho 说要送你一个周边，最有礼貌的一句？', promptZhEn: 'Junho says he\'ll give you some merch. What\'s the most polite thing to say?',
      choices: [
        { text: '정말요? 진짜 고마워요!', correct: true },
        { text: '싫어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '收到礼物 → 정말요?（惊讶）+ 진짜 고마워요（感谢）。两个"真的"叠用是韩国年轻人特色', explainEn: 'Receiving a gift → 정말요? (surprised) + 진짜 고마워요 (thankful). Stacking two "really"s is a young Korean thing',
    },
  ],
};
