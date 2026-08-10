import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 25 · 兽江演唱会 · 3000人一起喊
 *
 * 剧情：周三晚上，兽尔江草坪挤了3000人。
 * Junho把应援棒塞进Tori手里。大屏幕亮起。
 * Tori第一次被韩国应援文化击中——3000人同时喊"사랑해"。
 *
 * 学习目标：应援三句（반말命令/感叹）/ 하다类반말变位
 * 语料层级：반말（应援口号 + 朋友间）
 * 韩语自审：korean skill PASS（자연성/문법/반말활용 三关）
 */
export const day25: ToriDay = {
  level: 'beginner',
  day: 25,
  phase: 'expression',
  title: '兽江演唱会 · 3000人一起喊', titleEn: 'Beast River Concert · 3,000 people shouting together',
  subtitle: 'Junho把应援棒塞进我手里', subtitleEn: 'Junho shoved a light stick into my hand',
  heroImageUrl: '/images/diary/day-25-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 25일 · 수요일 저녁',
    weather: '兽尔 · 夜晚·微凉', weatherEn: 'Beast Seoul · Night · Slightly chilly',
    toriPose: 'shy',
    diaryText: `9月25日，周三晚上。

兽尔江（한강）草坪，3000人。
Junho兴奋得尾巴又在抖。

他把一根发光的应援棒塞进我手里：
"토리, 오늘 우리가 가르쳐 줄게."
（今天我们教你。）

大屏幕亮了——
音乐响起的瞬间，3000人同时举起手。

Junho在我耳边喊：
"따라 해! 사랑해! 응원해!"

我张嘴——
周围全是喊声，我的声音淹没在里面。
但是，嘴角在笑。
心脏在跳。

原来这就是应援。`,
  },

  words: [
    {
      id: 'd25-w1',
      korean: '한강',
      hangul: 'han-gang',
      zh: '兽尔江', zhEn: 'Sueul River',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한강에서 콘서트를 했어요.', zh: '在兽尔江开了演唱会。', zhEn: 'Held a concert at Sueul River.' },
      tip: '한강(汉江)= 首尔的母亲河。故事里中文叫「兽尔江」，韩语用真实的 한강', tipEn: 'Han River = Seoul\'s mother river. In the story, it\'s called \'Sueul River\' in Chinese, but the Korean uses the real name, Han River.',
    },
    {
      id: 'd25-w2',
      korean: '응원',
      hangul: 'eung-won',
      zh: '应援', zhEn: 'fan support',
      pos: '名词', posEn: 'Noun',
      example: { ko: '응원 문화가 정말 대단해요.', zh: '应援文化真的很厉害。', zhEn: 'Fan support culture is really impressive.' },
      tip: '응(应) + 원(援)。응원하다 = 应援/支持/加油', tipEn: 'Eung (respond) + won (support). Eungwonhada = to cheer for / support / root for.',
    },
    {
      id: 'd25-w3',
      korean: '사랑해',
      hangul: 'sa-rang-hae',
      zh: '爱你（반말）', zhEn: 'I love you (casual)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '오빠, 사랑해!', zh: '哥哥，爱你！', zhEn: 'Oppa, I love you!' },
      tip: '사랑하다(爱) → 해(반말해요体去요)。演唱会最常喊的一句', tipEn: 'Saranghada (to love) → hae (casual form, dropping \'yo\'). The most shouted phrase at concerts.',
    },
    {
      id: 'd25-w4',
      korean: '따라 해',
      hangul: 'tta-ra hae',
      zh: '跟着做/跟着说', zhEn: 'follow along / repeat after',
      pos: '表达', posEn: 'Expression',
      example: { ko: '따라 해! 사랑해!', zh: '跟着喊！我爱你！', zhEn: 'Shout along! I love you!' },
      tip: '따라하다(跟随做) → 따라 해(반말命令)。舞台上常说"따라 해 주세요"', tipEn: 'Ttarahada (to follow/do along) → ttara hae (casual command). On stage, they often say \'ttara hae juseyo\' (please follow along).',
    },
    {
      id: 'd25-w5',
      korean: '외쳐',
      hangul: 'oe-chyeo',
      zh: '喊', zhEn: 'shout',
      pos: '动词', posEn: 'Verb',
      example: { ko: '크게 외쳐!', zh: '大声喊！', zhEn: 'Shout loudly!' },
      tip: '외치다(喊叫) → 외쳐(반말命令)。ㅣ+어=여 缩合 → 외쳐', tipEn: 'Oechida (to shout) → oechyeo (casual command). The \'i\' + \'eo\' combine to \'yeo\' → oechyeo.',
    },
    {
      id: 'd25-w6',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      zh: '应援棒', zhEn: 'light stick',
      pos: '名词', posEn: 'Noun',
      example: { ko: '응원봉 들어!', zh: '举起应援棒！', zhEn: 'Raise your light stick!' },
      tip: '응원(应援) + 봉(棒)。每个偶像团体有专属应援棒造型', tipEn: 'Eungwon (support) + bong (stick). Every idol group has its own unique light stick design.',
    },
  ],

  dialogue: {
    scene: '兽尔江·3000人演唱会', sceneEn: 'Sueul River · 3,000-person concert',
    setting: {
      time: '周三晚上', timeEn: 'Wednesday evening',
      place: '兽尔江草坪', placeEn: 'Sueul River lawn',
      npc: 'Junho（老虎）/ Minji（水獭）', npcEn: 'Junho (tiger) / Minji (otter)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 응원봉 받아. 오늘 우리가 가르쳐 줄게.',
        hangul: 'to-ri, eung-won-bong ba-da. o-neul u-ri-ga ga-reu-chyeo jul-ge.',
        zh: '兔莉，拿好应援棒。今天我们教你。', zhEn: 'Tori, hold your light stick tight. Today we\'ll teach you.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '세 마디만 따라 해. "사랑해, 응원해, 따라해."',
        hangul: 'se ma-di-man tta-ra hae. "sa-rang-hae, eung-won-hae, tta-ra-hae."',
        zh: '跟着喊三句："我爱你，我支持你，跟着我。"', zhEn: 'Shout these three phrases along: \'I love you, I support you, follow me.\'',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '토리, 그냥 외쳐! 부끄러워하지 마!',
        hangul: 'to-ri, geu-nyang oe-chyeo! bu-kkeu-reo-wo-ha-ji ma!',
        zh: '兔莉，就喊出来！别害羞！', zhEn: 'Tori, just shout it out! Don\'t be shy!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '3000명… 심장이 뛰어…',
        hangul: 'sam-cheon-myeong… sim-jang-i ttwi-eo…',
        zh: '3000人……心跳好快……', zhEn: '3000 people... my heart is racing...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '사랑해! 응원해! 따라해!',
        hangul: 'sa-rang-hae! eung-won-hae! tta-ra-hae!',
        zh: '我爱你！我支持你！跟着我！', zhEn: 'I love you! I support you! Follow me!',
        practice: 'shadow',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '大屏幕上出现"다 같이!"(大家一起！)，3000人要开始喊了。Tori该喊什么？', zhEn: 'The big screen shows "다 같이!" (Everyone together!), and 3000 people are about to shout. What should Tori shout?',
        practice: 'pick',
        choices: [
          { ko: '사랑해! 응원해! 따라해!', zh: '我爱你！我支持你！跟着我！', zhEn: 'I love you! I support you! Follow me!', correct: true },
          { ko: '안녕하세요.', zh: '你好。', zhEn: 'Hello.', correct: false },
          { ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '应援口号：하다类반말', titleEn: 'Cheer slogans: 하다-type 반말',
    pattern: '하다 → **해** (반말)  |  해요 去掉 요 = 반말', patternEn: '하다 → **해** (반말) | Drop 요 from 해요 = 반말',
    whenToUse: '韩国应援/加油时用반말（非敬语）喊口号。사랑하다→사랑해 / 응원하다→응원해 / 따라하다→따라해。演唱会、运动场、朋友间都用这套。', whenToUseEn: 'In Korea, cheer/encouragement slogans use 반말 (informal speech). 사랑하다→사랑해 / 응원하다→응원해 / 따라하다→따라해. This pattern is used at concerts, sports events, and among friends.',
    rules: [
      '**하다 → 해**：所有하다类动词的반말 = 해。사랑하다→사랑해(爱你)；응원하다→응원해(支持你)；따라하다→따라해(跟着做)',
      '**해요 → 해**：해요体去掉 요 就是반말。공부해요→공부해；운동해요→운동해。最简单的반말变换',
      '**非하다类 반말**：해요体去 요。가요→가(去)；먹어요→먹어(吃)；와요→와(来)。但应援口号多用하다类',
      '**~지 마 用法**：V지 마 = 别做___（반말禁止）。부끄러워하지 마(别害羞) / 걱정하지 마(别担心)。마 = 하지 마세요 的반말',
      '**화이팅 用法**：英语 fighting 的韩式变体。不是"打架"而是"加油"。화이팅! = 加油！파이팅 也可以',
      '**응원 口号三连**：사랑해 + 응원해 + 따라해 是韩国演唱会经典三连喊。歌手在台上喊"따라 해 주세요"→粉丝跟着喊',
      '**크게 외쳐 用法**：크게(大声地) + 외치다→외쳐(반말命令)。MC在台上常说"크게 외쳐!"让观众大喊',
    ],
    examples: [
      { ko: '사랑해!', zh: '爱你！', zhEn: 'Love you!', highlight: '해', note: '사랑하다 → 해。演唱会最高频口号。3000人一起喊时震撼', noteEn: '사랑하다 → 해. The most common chant at concerts. Powerful when 3000 people shout it together.' },
      { ko: '응원해!', zh: '支持你！/加油！', zhEn: 'I support you! / Go for it!', highlight: '해', note: '응원하다 → 해。粉丝对偶像表达支持的标准句', noteEn: '응원하다 → 해. The standard phrase fans use to show support for their idols.' },
      { ko: '따라 해!', zh: '跟着做！', zhEn: 'Follow along!', highlight: '해', note: '따라하다 → 따라 해。歌手教粉丝动作/口号时说的', noteEn: '따라하다 → 따라 해. Said when a singer teaches fans moves or chants.' },
      { ko: '부끄러워하지 마!', zh: '别害羞！', zhEn: 'Don\'t be shy!', highlight: '지 마', note: '부끄러워하다(害羞) + 지 마(반말禁止)。朋友鼓励时说', noteEn: '부끄러워하다 (shy) + 지 마 (반말 prohibition). Said when encouraging a friend.' },
      { ko: '화이팅!', zh: '加油！', zhEn: 'Fighting!', highlight: '화이팅', note: '韩式英语。不分场合都能用。考试前/运动时/鼓励时', noteEn: 'Korean-style English. Can be used in any situation. Before exams / during sports / when encouraging.' },
    ],
    pitfall:
      '① 사랑해 是반말！对长辈/不熟的人要说 사랑해요 或 사랑합니다。演唱会喊没问题，日常对老师喊就失礼了。② 화이팅 不是"打架"的意思，很多外国人误解。③ 외쳐 的变位：외치다 词干"외치"+어→외쳐（ㅣ+ㅓ=ㅕ 缩合）。不是 외치어 ❌。',
  },

  output: [
    {
      id: 'd25-o1',
      kind: 'compose',
      zhHint: '我爱你！我支持你！跟着我！', zhHintEn: 'I love you! I support you! Follow me!',
      tokens: ['사랑해', '응원해', '따라해', '감사해', '미안해', '좋아해'],
      composeAnswer: ['사랑해', '응원해', '따라해'],
      successMsg: '사랑해! 응원해! 따라해! — 3000人的声音里，有你的一份。', successMsgEn: '사랑해! 응원해! 따라해! — Among 3000 voices, yours is one of them.',
    },
    {
      id: 'd25-o2',
      kind: 'listen-choice',
      audioKo: '토리, 그냥 외쳐! 부끄러워하지 마!',
      successMsg: '✓ 그냥 외쳐 = 就喊出来；부끄러워하지 마 = 别害羞。Minji的鼓励。', successMsgEn: '✓ 그냥 외쳐 = Just shout it out; 부끄러워하지 마 = Don\'t be shy. Minji\'s encouragement.',
      choices: [
        { zh: '兔莉，就喊出来！别害羞！', zhEn: 'Tori, just shout it out! Don\'t be shy!', correct: true },
        { zh: '兔莉，安静一点！别喊！', zhEn: 'Tori, be quiet! Don\'t shout!', correct: false },
        { zh: '兔莉，快回家！别待了！', zhEn: 'Tori, go home now! Don\'t stay!', correct: false },
        { zh: '兔莉，别哭！', zhEn: 'Tori, don\'t cry!', correct: false },
      ],
    },
    {
      id: 'd25-o3',
      kind: 'zh-to-ko',
      zhPrompt: '别担心！加油！', zhPromptEn: 'Don\'t worry! Fighting!',
      successMsg: '"걱정하지 마! 화이팅!" — 지 마 + 화이팅，鼓励万能组合。', successMsgEn: '"걱정하지 마! 화이팅!" — 지 마 + 화이팅, the ultimate encouragement combo.',
      choices: [
        { ko: '걱정하지 마! 화이팅!', correct: true },
        { ko: '걱정해! 화이팅!', correct: false },
        { ko: '걱정하지 마세요! 파이팅!', correct: false },
        { ko: '걱정 마! 사랑해!', correct: false },
      ],
    },
    {
      id: 'd25-o4',
      kind: 'particle-error',
      zhHint: '爱你！（반말）', zhHintEn: 'Love you! (반말)',
      successMsg: '사랑하다 → 해（하다类반말标准变法）。不是 하여 也不是 해요。', successMsgEn: '사랑하다 → 해 (standard 하다-type 반말 change). Not 하여 and not 해요.',
      choices: [
        { ko: '사랑해!', correct: true },
        { ko: '사랑하여!', correct: false },
        { ko: '사랑해요!', correct: false },
        { ko: '사랑하!', correct: false },
      ],
    },
    {
      id: 'd25-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 25 全对。今晚的兽尔江，Tori永远不会忘。', successMsgEn: '✓ Day 25 all correct. Tonight\'s Ssial River, Tori will never forget.',
      pairs: [
        { ko: '사랑해', zh: '爱你', zhEn: 'Love you' },
        { ko: '응원해', zh: '支持你', zhEn: 'Support you' },
        { ko: '따라해', zh: '跟着做', zhEn: 'Follow along' },
        { ko: '화이팅', zh: '加油', zhEn: 'You got this' },
        { ko: '응원봉', zh: '应援棒', zhEn: 'light stick' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '3000명과 함께 외쳤어요! 토리, 오늘 진짜 멋있었어요!',
    preview: '明天再回다이소——想给自己买一根胡萝卜形状的笔。', previewEn: 'Going back to Daiso tomorrow—I want to buy myself a carrot-shaped pen.',
    stickerId: 'sticker-d25',
    sceneImageUrl: '/images/diary/day-25-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「하다类动词怎么变반말？」「화이팅为什么是加油的意思？」',
};
