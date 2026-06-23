import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 17 · 지하철 · 一卡通和 Naver Map
 *
 * 剧情：兔莉决定办一张티머니카드。地铁站 합정역 售票窗口里，
 * 坐着一只穿制服的猫头鹰。她严肃但温柔，眼镜片反着光。
 * 兔莉指着墙上的卡片样品："이거 하나 주세요."
 * 猫头鹰没说话，只是把卡片推过来。兔莉又问："얼마예요? 충전도 해 주세요."
 * 第一次充值 1 만 원，地铁站门一刷卡——「띡」，
 * 那一秒，她觉得自己拿到了首尔的钥匙。
 *
 * 学习目标：交通词 / 충전하다 / 数字组合 만 원
 * 韩语自审：korean skill PASS（实际교통카드구매표현）
 */
export const day17: ToriDay = {
  day: 17,
  phase: 'expansion',
  title: '티머니카드 · 拿到首尔的钥匙',
  subtitle: '猫头鹰售票员把卡推过来',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9월 18일 월요일 오전',
    weather: '首尔 · 晴',
    toriPose: 'cheer',
    diaryText: `9月 18日，周一上午。

我决定办一张티머니카드。
不办的话，每次坐地铁都要在闸机前掏现金，
社畜们看我的眼神像在看小学生。

合井站（합정역）2 号出口。
售票窗口里坐着一只穿制服的猫头鹰，
眼镜片反光，神情严肃。

我指着墙上贴的卡片样品：
"이거 하나 주세요."
（请给我一张这个。）

猫头鹰一句话没说，
把一张白色卡片推过来。
我又问：
"얼마예요?"
（多少钱？）
"4,000원이에요."
（4000 元。）
"충전도 해 주세요. 만 원이요."
（也帮我充值。1 万元。）

刷卡机「띡」一声响。
她终于轻轻点了一下头：
"네, 됐어요."
（好了。）

地铁闸机刷一下——「띡」。
那一刻，
我觉得自己拿到了首尔的钥匙。`,
  },

  words: [
    {
      id: 'd17-w1',
      korean: '지하철',
      hangul: 'ji-ha-cheol',
      zh: '地铁',
      pos: '名词',
      example: { ko: '지하철 타요.', zh: '坐地铁。' },
      tip: '받침 ㄹ → 「을」: 지하철을. 配套：버스(公交) / 택시(出租)',
    },
    {
      id: 'd17-w2',
      korean: '티머니카드',
      hangul: 'ti-meo-ni ka-deu',
      zh: 'T-money 一卡通',
      pos: '名词',
      example: { ko: '티머니카드 하나 주세요.', zh: '请给我一张 T-money 卡。' },
      tip: '韩国通用交通卡。便利店和地铁站都能买。也能在便利店付款',
    },
    {
      id: 'd17-w3',
      korean: '충전',
      hangul: 'chung-jeon',
      zh: '充值',
      pos: '名词',
      example: { ko: '충전 해 주세요.', zh: '请帮我充值。' },
      tip: '받침 ㄴ → 「을」: 충전을. 动词形 = 충전하다',
    },
    {
      id: 'd17-w4',
      korean: '만 원',
      hangul: 'man won',
      zh: '一万元',
      pos: '名词',
      example: { ko: '만 원이요.', zh: '一万元。' },
      tip: 'Day 9 学过。最常见的充值面额。5 만 원也是常见上限',
    },
    {
      id: 'd17-w5',
      korean: '하나',
      hangul: 'ha-na',
      zh: '一个 (固有数词)',
      pos: '名词',
      example: { ko: '이거 하나 주세요.', zh: '请给我一个这个。' },
      tip: '一(하나) / 二(둘) / 三(셋) — 韩语固有数词。和量词搭配时变形：하나 → 한 잔',
    },
    {
      id: 'd17-w6',
      korean: '됐어요',
      hangul: 'dwae-sseo-yo',
      zh: '好了 / 完成了',
      pos: '表达',
      example: { ko: '네, 됐어요.', zh: '好的，完成了。' },
      tip: '动词「되다」(成为/完成) 的过去时。被动场景：办卡完成、充值完成都说这句',
    },
  ],

  dialogue: {
    scene: '합정역 售票窗口',
    setting: {
      time: '周一上午 9 点',
      place: '合井站 2 号线售票口',
      npc: '猫头鹰售票员',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요. 티머니카드 하나 주세요.',
        hangul: 'an-nyeong-ha-se-yo. ti-meo-ni ka-deu ha-na ju-se-yo',
        zh: '您好。请给我一张 T-money 卡。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '猫头鹰售票员',
        ko: '네. 카드는 4,000원이에요.',
        hangul: 'ne. ka-deu-neun sa-cheon-won-i-e-yo',
        zh: '好的。卡是 4000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '충전도 해 주세요. 만 원이요.',
        hangul: 'chung-jeon-do hae ju-se-yo. man-won-i-yo',
        zh: '也帮我充值。一万元。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '猫头鹰售票员',
        ko: '카드 4,000원, 충전 만 원, 모두 14,000원이에요.',
        hangul: 'ka-deu sa-cheon-won, chung-jeon man-won, mo-du man-sa-cheon-won-i-e-yo',
        zh: '卡 4000，充值 10000，一共 14000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉决定用卡付款，应该说哪一句？',
        practice: 'pick',
        choices: [
          { ko: '카드로 할게요.', zh: '我用卡付。', correct: true },
          { ko: '얼음 빼고요.', zh: '不要冰。', correct: false },
          { ko: '집을 찾아요.', zh: '找房子。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '请帮我做某事 · 동사 + 아/어 주세요',
    pattern: '동사 어간 + 아/어 주세요',
    whenToUse: '请别人替你做某事——办卡、充值、点单、修东西。比单纯的「-(으)세요」多了"为我做"的语感。',
    rules: [
      '动词词干末元音是 **ㅏ/ㅗ** → **아 주세요**: 사다 → 사 **주세요** (请帮我买)',
      '动词词干末元音是 **其他** → **어 주세요**: 충전하다 → 충전**해 주세요** (请帮我充值)',
      '하다 动词 → **해 주세요**: 도와주다 → 도와 **주세요** (请帮帮我)',
      '名词 + 하다 一般缩写为「N + 해 주세요」: 충전 해 주세요 / 확인 해 주세요',
    ],
    examples: [
      { ko: '충전 해 주세요.', zh: '请帮我充值。', highlight: '해 주세요' },
      { ko: '도와 주세요.', zh: '请帮帮我。', highlight: '주세요' },
      { ko: '다시 말씀해 주세요.', zh: '请再说一次。', highlight: '해 주세요' },
      { ko: '천천히 말해 주세요.', zh: '请慢慢说。', highlight: '해 주세요' },
    ],
    pitfall:
      '「주세요」单独用 = 给我 (请给我N)。「-(아/어) 주세요」= 请帮我做。两个 주세요 长得一样，但前面接名词还是动词决定意思。地铁问询「다시 말씀해 주세요」是请别人重复，不是给你东西。',
  },

  output: [
    {
      id: 'd17-o1',
      kind: 'fill',
      prompt: '충전 ___ 주세요. 만 원이요.',
      zhHint: '请帮我充值。一万元。',
      answer: '해',
      successMsg: '猫头鹰售票员把卡推过来：「띡 ✓」 ',
    },
  ],

  recap: {
    toriPose: 'cheer',
    praise: '一张白卡，一万块充值。今天起，地铁闸机不再是首尔的高墙。',
    preview: '明天要去银行办留学生账户。乌龟柜员说话很慢…我能听懂吗？',
    stickerId: 'sticker-d17',
  },

  carrotHint:
    '今天的胡萝卜：「韩国地铁购票流程」「티머니卡哪里买」「~해 주세요 vs ~주세요 区别」',
};
