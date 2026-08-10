import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 57 · 편지 세 통 · 三封回信
 *
 * 剧情：Tori给三个朋友各写一封韩文信。Minji收到哭了，Junho回了一封超长的，
 * Haru回了一句话："고마워. 나도." 两个字的回信，Tori看了很久。
 *
 * 学习目标：문어체 편지 표현 / 감사 · 회고
 * 语料层级：해요体 · 편지 문체
 * 韩语自审：korean skill PASS
 */
export const day57: ToriDay = {
  level: 'intermediate',
  day: 27,
  phase: 'expansion',
  title: '给朋友写信 · 三封回信', titleEn: 'Writing to friends · Three replies',
  subtitle: 'Haru的回信只有两个字："고마워. 나도."', subtitleEn: 'Haru\'s reply is just two words: "고마워. 나도."',
  heroImageUrl: '/images/diary/day-57-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 29일 · 화요일 저녁',
    weather: '兽尔 · 秋雨', weatherEn: 'Seoul · Autumn rain',
    toriPose: 'shy',
    diaryText: `10月29日，周二晚上。

昨晚看完自己的日记本，
我决定给三个朋友各写一封信——
用韩语。

**민지에게**
Day 3 인천공항에서 처음 만났어요.
"짐"을 "집"이라고 말한 나를,
민지는 웃지 않고 캐리어를 대신 들어줬어요.
그날부터 지금까지, 진짜 고마워요.

**준호에게**
너 KPOP 얘기 시작하면 진짜 멈출 줄 몰라 (웃음).
근데 반장으로서 매일 나를 챙겨줬어.
너 없었으면 나 아직 교실 뒤에서 조용히 앉아 있었을 거야.

**하루에게**
지하철에서 당근을 주워준 그날부터,
너는 늘 그 자리에 있어줬어.
"나중에 알려줄게"라고 한 그 말도,
언젠간 기다릴게. 서두르지 않을게.

세 편지를 봉투에 넣어 각자 우편함에 넣었다.

한 시간 후——

**민지**: 카톡에 눈물 이모지 20개.
**준호**: 답장 편지 3장. 편의점에서 자기가 대신 사준 삼각김밥 목록까지 다 적어옴.
**하루**: 딱 두 글자. "고마워. 나도."

두 글자.
근데 저 두 글자를 나는 오래도록 봤다.
"나도" — 나도 편지 쓰고 싶었다는 뜻인가?
"나도" — 나도 늘 그 자리에 있어줄게라는 뜻인가?

Haru의 답은 늘 짧고 깊다.`,
  },

  words: [
    {
      id: 'd57-w1',
      korean: '봉투',
      hangul: 'bong-tu',
      zh: '信封', zhEn: 'envelope',
      pos: '名词', posEn: 'Noun',
      example: { ko: '편지를 봉투에 넣었어요.', zh: '把信放进信封。', zhEn: 'Put the letter in the envelope.' },
      tip: '封(봉) + 套(투)。편지 봉투 = 信封',
    },
    {
      id: 'd57-w2',
      korean: '답장',
      hangul: 'dap-jang',
      zh: '回信', zhEn: 'reply',
      pos: '名词', posEn: 'Noun',
      example: { ko: '답장 세 통이 왔어요.', zh: '收到了三封回信。', zhEn: 'Received three replies.' },
      tip: '答(답) + 状(장)。답장하다 = 回信', tipEn: '答(dap) + 状(jang). 답장하다 = to reply',
    },
    {
      id: 'd57-w3',
      korean: '멈추다',
      hangul: 'meom-chu-da',
      zh: '停止', zhEn: 'stop',
      pos: '动词', posEn: 'Verb',
      example: { ko: '준호는 KPOP 얘기를 시작하면 멈출 줄 몰라요.', zh: 'Junho一开始说KPOP就停不下来。', zhEn: 'Once Junho starts talking about K-POP, he can\'t stop.' },
      tip: '멈추다 → 멈춰요. 멈출 줄 모르다 = 停不下来', tipEn: '멈추다 → 멈춰요. 멈출 줄 모르다 = can\'t stop',
    },
    {
      id: 'd57-w4',
      korean: '늘',
      hangul: 'neul',
      zh: '总是/一直', zhEn: 'always / continuously',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '늘 그 자리에 있어줬어.', zh: '总是在那儿。', zhEn: 'Always there.' },
      tip: '항상 = 늘 = 언제나. 감성 표현시 늘 더 부드러움',
    },
    {
      id: 'd57-w5',
      korean: '기다리다',
      hangul: 'gi-da-ri-da',
      zh: '等', zhEn: 'wait',
      pos: '动词', posEn: 'Verb',
      example: { ko: '언젠간 기다릴게.', zh: '总有一天我会等的。', zhEn: 'I\'ll wait for you someday.' },
      tip: '기다리다 → 기다려요 / 기다릴게 (承诺)', tipEn: '기다리다 → 기다려요 / 기다릴게 (promise)',
    },
    {
      id: 'd57-w6',
      korean: '서두르다',
      hangul: 'seo-du-reu-da',
      zh: '着急/催', zhEn: 'hurry / rush',
      pos: '动词', posEn: 'Verb',
      example: { ko: '서두르지 않을게.', zh: '不催你。', zhEn: 'I won\'t rush you.' },
      tip: '르 不规则: 서두르다 → 서둘러요', tipEn: '르 irregular: 서두르다 → 서둘러요',
    },
  ],

  dialogue: {
    scene: '카톡 · 세 명의 답장',
    setting: {
      time: '周二 21:00', timeEn: 'Tuesday 21:00',
      place: 'Tori 手机', placeEn: 'Tori\'s phone',
      npc: 'Minji / Junho / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '토리… 우리 진짜 오래 됐다. 나도 고마워.',
        hangul: 'to-ri… u-ri jin-jja o-rae dwaet-da. na-do go-ma-wo',
        zh: '兔莉……我们真的认识很久了。我也谢谢你。', zhEn: 'Tori... we\'ve really known each other for a long time. Thank you too.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '편지 잘 읽었어! 답장 3장 썼어. 우체통에 넣어놨어.',
        hangul: 'pyeon-ji jal il-geo-sseo! dap-jang se-jang sseo-sseo. u-che-tong-e neo-eo-no-a-sseo',
        zh: '信读了！我回了3页！放邮箱了。', zhEn: 'Read your letter! I replied with 3 pages! Put it in the mailbox.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '고마워. 나도.',
        hangul: 'go-ma-wo. na-do',
        zh: '谢谢。我也是。', zhEn: 'Thanks. Me too.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '두 글자… 근데 왜 이렇게 마음이 꽉 차지?',
        hangul: 'du geul-ja… geun-de wae i-reo-ke ma-eu-mi kkwak cha-ji?',
        zh: '两个字……为什么心里满得这么厉害？', zhEn: 'Just two words... why does my heart feel so full?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '하루의 답은 늘 짧고 깊어요.',
        hangul: 'ha-ru-ui da-beun neul jjal-kko gi-peo-yo',
        zh: 'Haru的回答总是短又深。', zhEn: 'Haru\'s answers are always short but deep.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Tori 想给Haru回一句"什么时候都不催你"。合适的一句？', zhEn: 'Tori wants to reply to Haru, "I won\'t rush you, anytime." Which is the right one?',
        practice: 'pick',
        choices: [
          { ko: '서두르지 않을게. 언제든 괜찮아.', zh: '不催你。什么时候都行。', zhEn: 'I won\'t rush you. Anytime is fine.', correct: true },
          { ko: '내일까지 다 말해줘.', zh: '明天之前全说清楚。', zhEn: 'Get everything clear by tomorrow.', correct: false },
          { ko: '이제 그만 얘기해.', zh: '不用说了。', zhEn: 'No need to say more.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '书面/亲密体：편지 문체와 표현', titleEn: 'Written/Intimate style: letter style and expressions',
    pattern: '~에게 / ~께 (수신인) + 편지 본문(해요体 or 반말) + 서명', patternEn: '~에게 / ~께 (recipient) + letter body (해요 style or casual) + signature',
    whenToUse: 'Day 33 学过给妈妈写信。Day 57 深化——**朋友之间的信**。给平辈用 **~에게**（하루에게 / 준호에게），给长辈用 **~께**（선생님께）。信内可以自由切换해요体/반말，看对方是谁。发朋友圈/写卡片/长文告白都用这些格式。', whenToUseEn: 'Day 33 covered writing to Mom. Day 57 deepens it—**letters between friends**. Use **~에게** for peers (하루에게 / 준호에게), **~께** for elders (선생님께). You can freely switch between 해요 style and casual within the letter, depending on who you\'re writing to. Use these formats for social posts, cards, or long confessions.',
    rules: [
      '**수신인**：~에게 (平辈/晚辈), ~께 (长辈). 이름 + 에게 = "给___"',
      '**서명**：평등하게 = 이름 + "가/올림"（올림 = 敬语给上）. 하루에게 → 토리가 / 선생님께 → 토리 올림',
      '**본문 시제**：과거 회상 = ~았/었어요. 감정 = ~네요 / ~아/어요. 약속/미래 = ~(으)ㄹ게(요)',
      '**~던 (Day 55) + ~아/어 봤어요 (Day 56) 편지에서 자주**：회고 + 경험 = 편지 감정 서사의 두 축'
    ],
    examples: [
      { ko: '민지에게, 진짜 고마워요.', zh: '给Minji，真的谢谢。', zhEn: 'To Minji, thank you so much.', highlight: '민지에게', note: '평등 수신인 = ~에게。편지 시작 정석' },
      { ko: '서두르지 않을게. 언제든 괜찮아.', zh: '不催你。什么时候都行。', zhEn: 'I won\'t rush you. Anytime is fine.', highlight: '서두르지 않을게', note: '서두르다 → 서둘러 (르 불규칙) → 서두르지 않을게 (承诺/반말)', noteEn: '서두르다 → 서둘러 (르 irregular) → 서두르지 않을게 (promise/casual)' },
      { ko: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', zh: '没有你我还坐在教室后面。', zhEn: 'Without you, I\'d still be sitting in the back of the classroom.', highlight: '없었으면 ... 있었을 거야', note: '~았/었으면 ... ~았/었을 거야 = 반사실적 가정. 편지 감성 표현' },
      { ko: '하루의 답은 늘 짧고 깊어요.', zh: 'Haru的回答总是又短又深。', zhEn: 'Haru\'s answers are always short but deep.', highlight: '짧고 깊어요', note: '짧다 + 고 + 깊다 (병렬). 감성 서술' },
    ],
    pitfall:
      '① **~에게 (平辈/晚辈) vs ~께 (长辈)**：混用即失礼. 부모님께 (O) / 부모님에게 (口语 O，书面 X). ② **서명 위치**：韩式信封/纸信最后写 "이름 + 올림/드림/가" — 位置**最下方**。 ③ 편지 내부 반말/해요体 混用: 편지 前段 반말, 마지막 서명 부분 해요体 (다시 존댓말) 도 흔함. ④ 카톡 짧은 답은 편지가 아니라 답장 — 하루의 "고마워. 나도." 는 편지 답장의 축약형.',
  },

  output: [
    {
      id: 'd57-o1',
      kind: 'compose',
      zhHint: '不催你。什么时候都行。', zhHintEn: 'I won\'t rush you. Anytime is fine.',
      tokens: ['서두르지', '않을게', '언제든', '괜찮아', '언제나', '괜찮은'],
      composeAnswer: ['서두르지', '않을게', '언제든', '괜찮아'],
      successMsg: '~지 않을게 承诺 + 언제든. Tori给Haru的一句。', successMsgEn: '~지 않을게 promise + 언제든. A line from Tori to Haru.',
    },
    {
      id: 'd57-o2',
      kind: 'listen-choice',
      audioKo: '고마워. 나도.',
      successMsg: '✓ Haru的两个字回信。看似简单实则藏很多。', successMsgEn: '✓ Haru\'s two-word reply. Simple on the surface, but packed with meaning.',
      choices: [
        { zh: '谢谢。我也是。', zhEn: 'Thanks. Me too.', correct: true },
        { zh: '谢谢。不用。', zhEn: 'Thanks. No need.', correct: false },
        { zh: '谢什么。别客气。', zhEn: 'What\'s there to thank? Don\'t mention it.', correct: false },
        { zh: '现在没事。', zhEn: 'It\'s fine now.', correct: false },
      ],
    },
    {
      id: 'd57-o3',
      kind: 'zh-to-ko',
      zhPrompt: '没有你我还坐在教室后面。', zhPromptEn: 'Without you, I\'d still be sitting in the back of the classroom.',
      successMsg: '"너 없었으면 나 아직 뒤에서 앉아 있었을 거야." — 반사실적 가정.',
      choices: [
        { ko: '너 없었으면 나 아직 뒤에서 앉아 있었을 거야.', correct: true },
        { ko: '너 없으면 나 아직 뒤에서 앉아 있어.', correct: false },
        { ko: '너 없어서 나 아직 뒤에서 앉아 있어.', correct: false },
        { ko: '너 없이 나 아직 뒤에서 앉아 있을 거야.', correct: false },
      ],
    },
    {
      id: 'd57-o4',
      kind: 'particle-error',
      zhHint: '给Minji的信。', zhHintEn: 'A letter to Minji.',
      successMsg: '민지 (친구) → **에게**. 长辈 = 께.', successMsgEn: '민지 (friend) → **에게**. Elders = 께.',
      choices: [
        { ko: '민지에게', correct: true },
        { ko: '민지께', correct: false },
        { ko: '민지에서', correct: false },
        { ko: '민지한테서', correct: false },
      ],
    },
    {
      id: 'd57-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 57 全对。세 통의 편지, 세 개의 답장.', successMsgEn: '✓ Day 57 all correct. Three letters, three replies.',
      pairs: [
        { ko: '봉투', zh: '信封', zhEn: 'envelope' },
        { ko: '답장', zh: '回信', zhEn: 'reply' },
        { ko: '멈추다', zh: '停止', zhEn: 'stop' },
        { ko: '기다리다', zh: '等', zhEn: 'wait' },
        { ko: '서두르다', zh: '着急', zhEn: 'to be in a hurry' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '세 통의 편지, 세 개의 답장. "고마워. 나도." — 이 두 글자만으로도 충분.',
    preview: '明天，Tori想重走一遍 Day 1-7 的路。', previewEn: 'Tomorrow, Tori wants to retrace the path from Day 1-7.',
    stickerId: 'sticker-d57',
    sceneImageUrl: '/images/diary/day-57-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~에게 和 ~께 有什么区别？」「한국 편지 마무리 어떻게 써?」',
};
