import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 68 · 讨公道 · 사자 마트 재방문
 *
 * 剧情：Tori回到猎食者街区，这次不是打工，而是找狮子店长理论。她用韩语说了一段
 * 让狮子沉默的话——"不要无视我。体型不重要，能力重要。我也能做到。"
 * 狮子沉默很久，说了句对不起。Tori走出那扇过高的门时，腿没抖。
 *
 * 学习目标：주장 표현 ~지 마세요 (Day 65·67 심화) / ~아/어 주세요 (Day 46·54 재활용) / 논박
 * 语料层级：해요体 · 대립 정중체
 */
export const day68: ToriDay = {
  level: 'advanced',
  day: 8,
  phase: 'mastery',
  title: '被无视 → 讨公道', titleEn: 'Being ignored → seeking justice',
  subtitle: '"체형은 중요하지 않아요. 능력이 중요해요."',
  heroImageUrl: '/images/diary/day-68-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 25일 · 월요일 오전',
    weather: '兽尔 · 맑음', weatherEn: 'Sua · Clear',
    toriPose: 'proud',
    diaryText: `11月25日，周一上午。

整个周末我都在想同一件事。

Day 66 那只狮子说"太小了"的时候，我什么都没说就走了。前晚在巷子里迷路的时候，我只知道害怕。

——所以今天，我要做点不一样的事。

我又去了一趟곰나라 마트。同一个柜台，同一头狮子。

这次我没踮脚，直接用力把门推开了。门太高就太高，硬推也能推。

"안녕하세요. 지난 주말에 왔던 토리예요."
（您好。我是上周末来过的兔莉。）

狮子抬头看我。他上次那种眼神——今天我不害怕了。

"드릴 말씀이 있어요."（有件事想跟您说。）

我深吸一口气，开始说：

"저를 무시하지 마세요. 이력서를 안 보시고 그냥 '작아서 안 된다'고 하셨어요. 체형은 중요하지 않아요. 능력이 중요해요. 저도 할 수 있어요."
（请不要轻视我。您连简历都没看，就说"太小了不行"。体型不重要，能力才重要。我也做得到。）

狮子沉默了。沉默了很久。

然后他开口了：

"...미안합니다. 편견이었어요."
（……对不起。是我有偏见。）

话很短，但我知道是真心的。

"이력서 한 번 다시 봐도 될까요?"（我可以再看一次您的简历吗？）

他这次真的把简历从头到尾读完了。

我推门出去。门还是那么高——但今天，我的腿不抖了。`,
  },

  words: [
    {
      id: 'd68-w1',
      korean: '드릴 말씀',
      hangul: 'deu-ril mal-sseum',
      zh: '有话要说（敬语）', zhEn: 'I have something to say (formal)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '드릴 말씀이 있어요.', zh: '有话跟您说。', zhEn: 'I have something to tell you.' },
      tip: '드리다(敬语给) + 말씀(敬语话). 정중 개시', tipEn: '드리다 (formal give) + 말씀 (formal words). Polite opening',
    },
    {
      id: 'd68-w2',
      korean: '편견',
      hangul: 'pyeon-gyeon',
      zh: '偏见', zhEn: 'prejudice',
      pos: '名词', posEn: 'Noun',
      example: { ko: '편견이었어요.', zh: '是偏见。', zhEn: 'It\'s prejudice.' },
      tip: '偏(편) + 见(견). 편견을 갖다 = 有偏见', tipEn: '偏(편) + 见(견). 편견을 갖다 = to have prejudice',
    },
    {
      id: 'd68-w3',
      korean: '능력',
      hangul: 'neung-nyeok',
      zh: '能力', zhEn: 'ability',
      pos: '名词', posEn: 'Noun',
      example: { ko: '능력이 중요해요.', zh: '能力重要。', zhEn: 'Ability matters.' },
      tip: '能(능) + 力(력). 실력(实力) vs 능력(能力) 미묘 차', tipEn: '能(능) + 力(력). 실력 (skill) vs 능력 (ability) subtle difference',
    },
    {
      id: 'd68-w4',
      korean: '중요하다',
      hangul: 'jung-yo-ha-da',
      zh: '重要', zhEn: 'important',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '체형은 중요하지 않아요.', zh: '体型不重要。', zhEn: 'Body size doesn\'t matter.' },
      tip: '重(중) + 要(요) + 하다. 반의: 중요하지 않다', tipEn: '重(중) + 要(요) + 하다. Antonym: 중요하지 않다',
    },
    {
      id: 'd68-w5',
      korean: '진심',
      hangul: 'jin-sim',
      zh: '真心', zhEn: 'Sincere heart',
      pos: '名词', posEn: 'Noun',
      example: { ko: '진심이었어요.', zh: '是真心的。', zhEn: 'It\'s sincere.' },
      tip: 'Day 49 学过. 이 날은 사자의 사과가 진심', tipEn: 'Learned on Day 49. That day, the lion\'s apology was sincere.',
    },
    {
      id: 'd68-w6',
      korean: '주장하다',
      hangul: 'ju-jang-ha-da',
      zh: '主张', zhEn: 'assert',
      pos: '动词', posEn: 'Verb',
      example: { ko: '자기 권리를 주장해요.', zh: '主张自己的权利。', zhEn: 'Assert your rights.' },
      tip: '主(주) + 张(장) + 하다. 논쟁 필수', tipEn: '主(주) + 张(장) + 하다. Essential for arguments.',
    },
  ],

  dialogue: {
    scene: '곰나라 마트·논박',
    setting: {
      time: '周一 10:30', timeEn: 'Monday 10:30',
      place: '북구 곰나라 마트',
      npc: '狮子 사장', npcEn: 'Lion boss',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요. 지난 주말에 왔던 토리예요. 드릴 말씀이 있어요.',
        hangul: 'an-nyeong-ha-se-yo. ji-nan ju-ma-re wat-deon to-ri-ye-yo. deu-ril mal-sseu-mi i-sseo-yo',
        zh: '你好。上周末来过的兔莉。有话要跟您说。', zhEn: 'Hello. I\'m Tori, who came last weekend. I have something to tell you.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '저를 무시하지 마세요. 이력서를 안 보셨잖아요.',
        hangul: 'jeo-reul mu-si-ha-ji ma-se-yo. i-ryeok-seo-reul an bo-syeot-ja-na-yo',
        zh: '不要无视我。您根本没看简历。', zhEn: 'Don\'t ignore me. You didn\'t even look at my resume.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '체형은 중요하지 않아요. 능력이 중요해요.',
        hangul: 'che-hyeong-eun jung-yo-ha-ji a-na-yo. neung-nyeo-gi jung-yo-hae-yo',
        zh: '体型不重要。能力才重要。', zhEn: 'Body size doesn\'t matter. Ability is what matters.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '저도 할 수 있어요. 기회 한 번만 주세요.',
        hangul: 'jeo-do hal su i-sseo-yo. gi-hoe han beon-man ju-se-yo',
        zh: '我也能做到。请给我一次机会。', zhEn: 'I can do it too. Please give me a chance.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '狮子 사장', npcNameEn: 'Lion boss',
        ko: '...미안합니다. 편견이었어요. 이력서 한 번 다시 봐도 될까요?',
        hangul: 'mi-an-ham-ni-da. pyeon-gyeo-ni-eo-sseo-yo. i-ryeok-seo han beon da-si bwa-do doel-kka-yo?',
        zh: '……对不起。是我偏见了。可以再看一遍简历吗？', zhEn: '...I\'m sorry. I was biased. Can I look at your resume again?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '狮子承认偏见并要重新看简历。Tori想礼貌回应"当然可以"。合适的一句？', zhEn: 'The lion admits his bias and wants to review the resume. Tori wants to politely say "Of course." Which is appropriate?',
        practice: 'pick',
        choices: [
          { ko: '네, 잘 부탁드립니다.', zh: '好的，请多关照。', zhEn: 'Okay, please take care of me.', correct: true },
          { ko: '이제 안 필요해요.', zh: '不需要了。', zhEn: 'No need.', correct: false },
          { ko: '늦었어요, 저 갈게요.', zh: '晚了，我走了。', zhEn: 'It\'s late, I\'m leaving.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '不要___：~지 마세요 (Day 65 심화 · 주장 상황)', titleEn: 'Don\'t ___ : ~지 마세요 (Day 65 advanced · assertion context)',
    pattern: 'V + **지 마세요** + N + **~은/는 ... 지 않아요**',
    whenToUse: 'Day 65 学过 ~지 마세요 (禁止). Day 68 = **주장/논박 상황**의 정중한 사용. Tori 说 「저를 무시하**지 마세요**」= 不要无视我。~지 마세요 + 이유 + ~지 않아요 대비 = 韩语 논박의 정통 구조. 讨公道/据理力争 필수.', whenToUseEn: 'Learned ~지 마세요 (prohibition) on Day 65. Day 68 = polite use in **assertion/refutation contexts**. Tori says 「저를 무시하**지 마세요**」= Don\'t ignore me. ~지 마세요 + reason + contrast with ~지 않아요 = the standard structure for refutation in Korean. Essential for standing up for yourself.',
    rules: [
      '**정중한 명령/금지 → ~지 마세요**: 무시하지 마세요 / 판단하지 마세요',
      '**대립 부정 → ~은/는 ... 지 않아요**: 체형은 중요하지 않아요 = 体型不重要',
      '**요청 재보내기 → ~아/어 주세요 (Day 46·54)**: 기회 한 번만 주세요',
      '**주장 문장 완성형**: ~지 마세요 + 이유 + 반대 명제 + 요청. 4단 구조'
    ],
    examples: [
      { ko: '저를 무시하지 마세요.', zh: '不要无视我。', zhEn: 'Don\'t ignore me.', highlight: '무시하지 마세요', note: '무시하다 → 무시하지 마세요. Day 68 주제 문장' },
      { ko: '체형은 중요하지 않아요. 능력이 중요해요.', zh: '体型不重要。能力才重要。', zhEn: 'Body size doesn\'t matter. Ability is what matters.', highlight: '중요하지 않아요 ... 중요해요', note: '대립 구조 = 주장 강조' },
      { ko: '기회 한 번만 주세요.', zh: '请给我一次机会。', zhEn: 'Please give me a chance.', highlight: '기회 ... 주세요', note: '~아/어 주세요 요청. Day 54 재활용' },
      { ko: '판단하지 말고 이력서를 봐 주세요.', zh: '别下判断，请看简历。', zhEn: 'Don\'t judge, look at the resume.', highlight: '판단하지 말고', note: '~지 말고 (Day 65) + ~아/어 주세요. 대안 제시' },
    ],
    pitfall:
      '① Day 65 는 경고/조언, Day 68 은 **주장/논박** — 같은 ~지 마세요 지만 톤 완전 다름. Tori 오늘은 화가 났지만 정중하게 표현. ② ~지 마세요 뒤엔 반드시 **이유/대안** 붙임. 그냥 "하지 마세요" 는 무례. ③ **주장 4단 구조**: 인사 + 요청/금지 + 이유 + 대안. Day 68 대화는 이 프레임 완벽 예시. ④ 감정적일 수록 언어는 정중해야 강력해짐 — 한국어 논박의 근본 원리.',
  },

  output: [
    {
      id: 'd68-o1',
      kind: 'compose',
      zhHint: '不要无视我。', zhHintEn: 'Don\'t ignore me.',
      tokens: ['저를', '무시하지 마세요', '무시하지 말아', '무시해', '저는', '무시하지 않아요'],
      composeAnswer: ['저를', '무시하지 마세요'],
      successMsg: 'Tori의 첫 논박. 정중한 강함.',
    },
    {
      id: 'd68-o2',
      kind: 'listen-choice',
      audioKo: '체형은 중요하지 않아요. 능력이 중요해요.',
      successMsg: '✓ Tori 주장의 핵심. 대립 구조 = 강조.',
      choices: [
        { zh: '体型不重要。能力才重要。', zhEn: 'Body size doesn\'t matter. Ability is what matters.', correct: true },
        { zh: '体型也重要，能力也重要。', zhEn: 'Body size matters, and ability matters too.', correct: false },
        { zh: '能力不重要，体型才重要。', zhEn: 'Ability doesn\'t matter, body size is what matters.', correct: false },
        { zh: '两个都不重要。', zhEn: 'Neither one matters.', correct: false },
      ],
    },
    {
      id: 'd68-o3',
      kind: 'zh-to-ko',
      zhPrompt: '别下判断，请看简历。', zhPromptEn: 'Don\'t judge, look at the resume.',
      successMsg: '"판단하지 말고 이력서를 봐 주세요." — ~지 말고 + ~아/어 주세요.',
      choices: [
        { ko: '판단하지 말고 이력서를 봐 주세요.', correct: true },
        { ko: '판단하지 않고 이력서를 봐 주세요.', correct: false },
        { ko: '판단하지 마세요 이력서를 봐 주세요.', correct: false },
        { ko: '판단하지 마고 이력서를 봐 주세요.', correct: false },
      ],
    },
    {
      id: 'd68-o4',
      kind: 'particle-error',
      zhHint: '请给我一次机会。', zhHintEn: 'Please give me a chance.',
      successMsg: '"기회 한 번만 주세요." — 조사 를은 회화에서 생략 자연.',
      choices: [
        { ko: '기회 한 번만 주세요.', correct: true },
        { ko: '기회 한 번을 주세요.', correct: false },
        { ko: '기회에 한 번 주세요.', correct: false },
        { ko: '기회가 한 번만 주세요.', correct: false },
      ],
    },
    {
      id: 'd68-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 68 全对. 문 나올 때 다리 안 떨렸어요.', successMsgEn: '✓ Day 68 all correct. My legs didn\'t shake when the door came out.',
      pairs: [
        { ko: '편견', zh: '偏见', zhEn: 'prejudice' },
        { ko: '능력', zh: '能力', zhEn: 'ability' },
        { ko: '중요하다', zh: '重要', zhEn: 'important' },
        { ko: '진심', zh: '真心', zhEn: 'Sincere heart' },
        { ko: '주장하다', zh: '主张', zhEn: 'assert' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '"체형은 중요하지 않아요. 능력이 중요해요." — 침묵을 깬 첫 문장.',
    preview: '明天 학교 반차별 논단에서 이 경험을 나눈다. "토끼도 할 수 있어요."', previewEn: 'Tomorrow I\'ll share this experience at the school\'s anti-discrimination forum. "A rabbit can do it too."',
    stickerId: 'sticker-d68',
    sceneImageUrl: '/images/diary/day-68-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「주장할 때 어떻게 정중하게?」「편견 어떻게 반박?」', carrotHintEn: 'Today\'s carrots: "How to be polite when making a point?" "How to refute prejudice?"',
};
