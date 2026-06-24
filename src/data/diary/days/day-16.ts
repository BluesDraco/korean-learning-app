import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 16 · 问路 · 鬱陶한 골목 + 海狸路人
 *
 * 剧情：兔莉拿着昨天中介给的地址出门看房。Naver 地图说还有 200 米，
 * 但她已经在同一个十字路口绕了三圈——首尔的小巷子像迷宫，
 * 招牌全是韩文。她终于停下，对一只刚遛狗回来的海狸大叔鞠躬：
 * "저, 죄송한데… 길 좀 여쭤볼게요."
 * 海狸大叔放下狗绳，认真地比划："쭉 가서 오른쪽으로 도세요."
 * 兔莉记下来。3 分钟后，她真的找到了房子。
 *
 * 学习目标：问路开场 / 方向词 / ~(으)로 (往...)
 * 韩语自审：korean skill PASS（실제 길안내 표현 + 정중함）
 */
export const day16: ToriDay = {
  level: 'beginner',
  day: 16,
  phase: 'expansion',
  title: '迷路在小巷子 · 第一次开口问路',
  subtitle: '海狸大叔放下狗绳，认真给我比划',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9월 17일 일요일 오전',
    weather: '首尔 · 多云',
    toriPose: 'shy',
    diaryText: `9月 17日，周日上午 10 点。

我拿着中介给的地址出门。
Naver 地图说还有 200 米。

但是——
我已经在同一个十字路口绕了三圈。

首尔的小巷子像迷宫。
招牌全是韩文。
连便利店的位置都写着「상수**점**」「합정**점**」，
分不清哪个是哪个。

我深呼吸。
一只大叔海狸刚遛完狗回来，
柴犬蹭着他的腿。

我鞠躬：
"저, 죄송한데… 길 좀 여쭤볼게요."
（不好意思，能问个路吗？）

大叔放下狗绳，认真比划：
"이 길로 쭉 가서—"
（沿这条路一直走——）
"오른쪽으로 도세요."
（右转。）
"편의점 보이면 다 왔어요."
（看到便利店就到了。）

我连说了三声"감사합니다"。
3 分钟后，我真的找到了那栋楼。
站在门口的时候——
我突然觉得，
"问路"这件事，没那么可怕了。`,
  },

  words: [
    {
      id: 'd16-w1',
      korean: '길',
      hangul: 'gil',
      zh: '路',
      pos: '名词',
      example: { ko: '이 길로 가요.', zh: '沿这条路走。' },
      tip: '받침 ㄹ → 「을/로」: 길을 (找路) / 길로 (沿着路)',
    },
    {
      id: 'd16-w2',
      korean: '쭉',
      hangul: 'jjuk',
      zh: '一直 / 直走',
      pos: '副词',
      example: { ko: '쭉 가세요.', zh: '一直走。' },
      tip: '问路最高频副词。和「가다」搭配：쭉 가요 / 쭉 가세요',
    },
    {
      id: 'd16-w3',
      korean: '오른쪽',
      hangul: 'o-reun-jjok',
      zh: '右边',
      pos: '名词',
      example: { ko: '오른쪽으로 가세요.', zh: '请往右走。' },
      tip: '左边 = 왼쪽 / 前面 = 앞쪽 / 后面 = 뒤쪽',
    },
    {
      id: 'd16-w4',
      korean: '왼쪽',
      hangul: 'oen-jjok',
      zh: '左边',
      pos: '名词',
      example: { ko: '왼쪽에 있어요.', zh: '在左边。' },
      tip: '오른(右) / 왼(左) — 一对反义词',
    },
    {
      id: 'd16-w5',
      korean: '도세요',
      hangul: 'do-se-yo',
      zh: '请转 (拐弯)',
      pos: '动词',
      example: { ko: '오른쪽으로 도세요.', zh: '请右转。' },
      tip: '动词「돌다」(转) + 「-(으)세요」 礼貌请求。配套「(으)로」表方向',
    },
    {
      id: 'd16-w6',
      korean: '여쭤볼게요',
      hangul: 'yeo-jjwo-bol-ge-yo',
      zh: '请问一下 (敬语)',
      pos: '表达',
      example: { ko: '길 좀 여쭤볼게요.', zh: '请问一下路。' },
      tip: '「묻다」(问) 的尊敬形 + 试探性「-아/어 볼게요」。比「물어볼게요」礼貌很多。对陌生人开场必备',
    },
  ],

  dialogue: {
    scene: '十字路口 · 海狸大叔的柴犬',
    setting: {
      time: '周日上午 10 点',
      place: '弘大附近小巷子',
      npc: '海狸大叔',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저, 죄송한데… 길 좀 여쭤볼게요.',
        hangul: 'jeo, joe-song-han-de… gil jom yeo-jjwo-bol-ge-yo',
        zh: '不好意思，请问一下路。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海狸大叔',
        ko: '네, 어디 가세요?',
        hangul: 'ne, eo-di ga-se-yo',
        zh: '好的，您去哪里？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이 주소 어디예요?',
        hangul: 'i ju-so eo-di-ye-yo',
        zh: '这个地址在哪里？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海狸大叔',
        ko: '아, 여기? 이 길로 쭉 가서 오른쪽으로 도세요. 편의점 보이면 다 왔어요.',
        hangul: 'a, yeo-gi? i gil-lo jjuk ga-seo o-reun-jjok-eu-ro do-se-yo. pyeon-ui-jeom bo-i-myeon da wa-sseo-yo',
        zh: '啊，这里？沿这条路一直走，然后右转。看到便利店就到了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉听明白了，应该如何礼貌道谢？',
        practice: 'pick',
        choices: [
          { ko: '아, 감사합니다. 도와주셔서 감사합니다.', zh: '啊，谢谢您。感谢您帮忙。', correct: true },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '往哪里走 · 명사 + (으)로',
    pattern: '명사 + (으)로 + 가다 / 도세요',
    whenToUse: '表达"往某个方向" "用某种方式"。问路、坐车、转弯都用得上。',
    rules: [
      '前字有받침 (ㄹ除外) → **으로**: 오른쪽 → 오른쪽**으로** (받침 ㄱ)',
      '前字无받침 → **로**: 학교 → 학교**로** (无받침)',
      '前字받침是ㄹ → **로**: 길 → 길**로** (특별 규칙)',
      '常搭配：**(으)로 가세요** (往...走) / **(으)로 도세요** (往...转)',
    ],
    examples: [
      { ko: '오른쪽으로 도세요.', zh: '请右转。', highlight: '으로' },
      { ko: '왼쪽으로 가세요.', zh: '往左走。', highlight: '으로' },
      { ko: '학교로 가요.', zh: '去学校。', highlight: '로' },
      { ko: '이 길로 쭉 가요.', zh: '沿这条路一直走。', highlight: '로' },
    ],
    pitfall:
      '「길」(받침 ㄹ) 接「로」不接「으로」——「길로」对，「길으로」错。这是 ㄹ 받침的特殊规则，韩语里 ㄹ 经常和无받침归一类。',
  },

  output: [
    {
      id: 'd16-o1',
      kind: 'compose',
      zhHint: '请往右转。',
      tokens: ['오른쪽으로', '도세요', '왼쪽으로', '오른쪽이', '가세요', '쭉'],
      composeAnswer: ['오른쪽으로', '도세요'],
      successMsg: '海狸大叔的柴犬摇了摇尾巴，像在说「잘 가요」 ✓',
    },
    {
      id: 'd16-o2',
      kind: 'listen-choice',
      audioKo: '이 길로 쭉 가세요.',
      successMsg: '✓ 「沿这条路一直走」。「길」是 ㄹ 받침 → 接「로」不接「으로」。',
      choices: [
        { zh: '沿这条路一直走。', correct: true },
        { zh: '往这边右转。', correct: false },
        { zh: '往左走。', correct: false },
        { zh: '走到便利店就到了。', correct: false },
      ],
    },
    {
      id: 'd16-o3',
      kind: 'zh-to-ko',
      zhPrompt: '不好意思，请问一下路。',
      successMsg: '"여쭤볼게요" 是「물어보다」的尊敬形，对陌生人开场最礼貌的句子。',
      choices: [
        { ko: '저, 죄송한데… 길 좀 여쭤볼게요.', correct: true },
        { ko: '저, 죄송한데… 길 좀 물어요.', correct: false },
        { ko: '저, 안녕하세요… 길 좀 여쭤볼게요.', correct: false },
        { ko: '저, 죄송해요… 길을 가르쳐요.', correct: false },
      ],
    },
    {
      id: 'd16-o4',
      kind: 'particle-error',
      zhHint: '去学校。',
      successMsg: '학교 (无받침) → 「로」(不是「으로」)。这是方向助词的基本规则。',
      choices: [
        { ko: '학교로 가요.', correct: true },
        { ko: '학교으로 가요.', correct: false },
        { ko: '학교에서 가요.', correct: false },
        { ko: '학교를 가요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '第一次主动开口问路。陌生人没那么可怕，韩语没那么遥远。',
    preview: '明天要去办留学生一卡通。地铁站售票窗口里坐着一只猫头鹰…',
    stickerId: 'sticker-d16',
  },

  carrotHint:
    '今天的胡萝卜：「韩国问路开场白」「방향 표현 정리」「(으)로 vs 에 가다」',
};
