import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 66 · 체형 차별 · "너무 작아서"
 *
 * 剧情：Tori在猎食者街区看到招聘进去试。狮子店长看她一眼说"너무 작아서 안 될 것 같아요".
 * 第一次因体型被歧视。她强忍怒气离开，手在发抖——不是害怕，是愤怒。
 *
 * 学习目标：완곡 거절 ~(으)ㄹ 것 같아요 (Day 39 深化) / 차별 표현 / 분노 감정
 * 语料层级：해요体
 */
export const day66: ToriDay = {
  level: 'advanced',
  day: 6,
  phase: 'mastery',
  title: '体型歧视 · "너무 작아서"', titleEn: 'Body shaming · "because you\'re too small"',
  subtitle: '"太小了做不了" — 手在抖，是愤怒', subtitleEn: '"Too small to do it" — hands trembling, it\'s anger',
  heroImageUrl: '/images/diary/day-66-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 23일 · 토요일 오후',
    weather: '兽尔 · 바람', weatherEn: 'Soo-ah · Baram',
    toriPose: 'shy',
    diaryText: `11月23日，周六下午。

곰다방周六休息。昨天那只兔子留下的一句"조심해"（小心）在我心里绕了一整晚——不过白天总会好一点吧？

我又去了一趟北区。白天的食肉动物区确实和昨晚不一样，但陌生感没散。

我停在一家贴着"알바 구함"（招兼职）的店门口。招牌上写着"곰나라 마트"，一家很大的超市。门把手比我的视线还高——我踮起脚才推开了门。

柜台后面坐着一头狮子。鬃毛蓬松，眼神锐利。

"저기요, 아르바이트 지원하러 왔어요."（不好意思，我来应聘兼职。）

狮子看着我。从头到脚扫了一遍。然后，眼神里的什么东西微妙地变了。

"...너무 작아서 안 될 것 같아요."
（……你太小了，可能不行。）

——"太小"？——"可能不行"？

不是因为我能力不够，也不是因为我没经验，就是——因为"太小"。

我一瞬间喘不过气。

"체력이 필요한 일이라서."（这份工作需要体力。）他继续说着，眼睛却没看我的简历一眼。

我刚想开口，他已经把视线移到了下一位应聘者身上。

我推门走了出去。门把手依旧那么高。

走到街上，我发现手在抖——不是害怕，是愤怒。`,
  },

  words: [
    {
      id: 'd66-w1',
      korean: '차별',
      hangul: 'cha-byeol',
      zh: '歧视', zhEn: 'Discrimination',
      pos: '名词', posEn: 'Noun',
      example: { ko: '체형 차별이에요.', zh: '是体型歧视。', zhEn: 'It\'s body-type discrimination.' },
      tip: '差(차) + 别(별). 인종/성/체형 차별', tipEn: 'Difference (차) + distinction (별). Discrimination based on race/gender/body type',
    },
    {
      id: 'd66-w2',
      korean: '체형',
      hangul: 'che-hyeong',
      zh: '体型', zhEn: 'Body type',
      pos: '名词', posEn: 'Noun',
      example: { ko: '체형이 작아서 못 뽑는대요.', zh: '说因为体型小所以不能招。', zhEn: 'Saying they can\'t hire because of small body size.' },
      tip: '体(체) + 型(형). 체력(体力)과 다름', tipEn: 'Body (체) + type (형). Different from physical strength (体力)',
    },
    {
      id: 'd66-w3',
      korean: '체력',
      hangul: 'che-ryeok',
      zh: '体力', zhEn: 'Physical strength',
      pos: '名词', posEn: 'Noun',
      example: { ko: '체력이 필요한 일이에요.', zh: '需要体力的工作。', zhEn: 'A job that requires physical strength.' },
      tip: '体(체) + 力(력). 面试被拒时常用', tipEn: 'Body (체) + strength (력). Commonly used when rejected in interviews',
    },
    {
      id: 'd66-w4',
      korean: '화가 나다',
      hangul: 'hwa-ga na-da',
      zh: '生气', zhEn: 'Angry',
      pos: '表达', posEn: 'Expression',
      example: { ko: '진짜 화가 났어요.', zh: '真的生气了。', zhEn: 'Really angry.' },
      tip: '화(火) + 가 + 나다(出). "怒气冒出"的比喻', tipEn: 'Fire (화) + comes out (나다). Metaphor for "anger rising"',
    },
    {
      id: 'd66-w5',
      korean: '무시하다',
      hangul: 'mu-si-ha-da',
      zh: '无视', zhEn: 'Ignore',
      pos: '动词', posEn: 'Verb',
      example: { ko: '이력서도 안 보고 무시했어요.', zh: '简历都不看就无视了。', zhEn: 'Ignored without even looking at the resume.' },
      tip: '无(무) + 视(시) + 하다。轻视对方、把人看轻', tipEn: 'Ignore (무) + see (시) + 하다. Look down on someone, belittle them',
    },
    {
      id: 'd66-w6',
      korean: '실력이 부족하다',
      hangul: 'sil-lyeo-gi bu-jo-ka-da',
      zh: '实力不足', zhEn: 'Lack of ability',
      pos: '表达', posEn: 'Expression',
      example: { ko: '실력이 부족한 것도 아닌데요.', zh: '也不是实力不足。', zhEn: 'It\'s not a lack of ability either.' },
      tip: '실력(实力) + 이 + 부족하다(不足). Day 63 复习', tipEn: 'Skill (실력) + is + insufficient (부족하다). Day 63 review',
    },
  ],

  dialogue: {
    scene: '곰나라 마트·면접 실패',
    setting: {
      time: '周六 14:30', timeEn: 'Saturday 14:30',
      place: '북구 곰나라 마트',
      npc: '狮子 사장', npcEn: 'Lion boss',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 아르바이트 지원하러 왔어요.',
        hangul: 'jeo-gi-yo, a-reu-ba-i-teu ji-won-ha-reo wa-sseo-yo',
        zh: '你好，我来应聘兼职的。', zhEn: 'Hello, I\'m here to apply for the part-time job.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '狮子 사장', npcNameEn: 'Lion boss',
        ko: '음… 너무 작아서 안 될 것 같아요.',
        hangul: 'eum… neo-mu ja-ga-seo an doel geot ga-ta-yo',
        zh: '嗯……太小了，可能不行。', zhEn: 'Hmm... too small, might not work.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '狮子 사장', npcNameEn: 'Lion boss',
        ko: '체력이 필요한 일이라서.',
        hangul: 'che-ryeo-gi pi-ryo-han i-ri-ra-seo',
        zh: '因为是需要体力的工作。', zhEn: 'Because it\'s a job that requires physical strength.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '이력서도 안 봤잖아. 그냥 무시한 거잖아.',
        hangul: 'i-ryeok-seo-do an bwat-ja-na. geu-nyang mu-si-han geo-ja-na',
        zh: '简历都没看嘛。就是无视我嘛。', zhEn: 'Didn\'t even look at my resume. Just ignoring me.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '실력이 부족한 것도 아닌데, 체형만으로 판단하시네요.',
        hangul: 'sil-lyeo-gi bu-jo-kan geot-do a-nin-de, che-hyeong-ma-neu-ro pan-dan-ha-si-ne-yo',
        zh: '也不是实力不足，只用体型判断呢。', zhEn: 'It\'s not like I lack skills—they\'re judging me purely by size.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '狮子没回应，转头看下一个人。Tori想守住尊严再说一句"这是歧视"。合适的一句？', zhEn: 'The lion didn\'t respond and turned to the next person. Tori wants to keep dignity and say one more thing: "This is discrimination." Which is the right line?',
        practice: 'pick',
        choices: [
          { ko: '이건 명백한 체형 차별이에요.', zh: '这明显是体型歧视。', zhEn: 'This is clearly size discrimination.', correct: true },
          { ko: '아, 죄송해요. 그럼 그냥 갈게요.', zh: '啊，抱歉。那我就走了。', zhEn: 'Oh, sorry. I\'ll be going then.', correct: false },
          { ko: '체력 좀 키우고 다시 올게요.', zh: '锻炼下体力再来。', zhEn: 'Build up your strength and come back.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '委婉拒绝：~(으)ㄹ 것 같아요', titleEn: 'Polite refusal: ~(으)ㄹ 것 같아요',
    pattern: 'V/A + **(으)ㄹ 것 같아요**',
    whenToUse: 'Day 39 学过 ~는 것 같아요 (现在推测). Day 66 = **~(으)ㄹ 것 같아요** = 「(未来/可能性) 大概不行」的委婉表达。狮子说 「안 **될 것 같아요**」= 大概不行。韩国人拒绝人时最常用的柔和句——但柔和不代表不歧视。', whenToUseEn: 'Day 39 covered ~는 것 같아요 (present speculation). Day 66 = **~(으)ㄹ 것 같아요** = a polite way to say "(future/possibility) probably won\'t work." The lion says "안 **될 것 같아요**" = probably not. It\'s the softest phrase Koreans use to refuse—but softness doesn\'t mean no prejudice.',
    rules: [
      '**미래·추측 → ~(으)ㄹ 것 같아요**：내일 비가 올 것 같아요 = 明天可能下雨. 안 될 것 같아요 = 可能不行',
      '**과거 추측 → ~았/었을 것 같아요**：그 사람 갔을 것 같아요 = 那人可能走了',
      '**Day 39 ~는 것 같아요 (现在) vs Day 66 ~(으)ㄹ 것 같아요 (미래/추측)**: 뉘앙스 차이',
      '**부드러운 거절 상용**：할 수 없어요 (직접) → 안 될 것 같아요 (부드러움)'
    ],
    examples: [
      { ko: '너무 작아서 안 될 것 같아요.', zh: '太小了，可能不行。', zhEn: 'It\'s too small, so probably not.', highlight: '안 될 것 같아요', note: '되다 → 될 것 같아요. 사자 원문. 부드러운 거절.' },
      { ko: '내일 비가 올 것 같아요.', zh: '明天可能下雨。', zhEn: 'It might rain tomorrow.', highlight: '올 것 같아요', note: '오다 → 올 것 같아요. 날씨 추측' },
      { ko: '다음 주에 시간이 없을 것 같아요.', zh: '下周可能没时间。', zhEn: 'I might not have time next week.', highlight: '없을 것 같아요', note: '없다 → 없을 것 같아요. 약속 완곡 거절' },
      { ko: '그 사람 벌써 갔을 것 같아요.', zh: '那人可能已经走了。', zhEn: 'That person might have already left.', highlight: '갔을 것 같아요', note: '가다 → 갔을 것 같아요 (과거 추측)' },
    ],
    pitfall:
      '① Day 39 **~는 것 같아요** vs **~(으)ㄹ 것 같아요**: 前者 = 现在推测 (지금 오는 것 같아요 = 好像在下雨), 后者 = 미래/推测 (내일 올 것 같아요 = 明天可能下). ② 韩国人 거절 시 直接 못 해요 대신 안 될 것 같아요 — 부드러움. 하지만 오늘 사자는 부드러움 뒤에 편견이 있음. 언어의 형식과 내용은 다름. ③ 과거 추측 → ~았/었을 것 같아요. 과거 사실은 ~았/었어요.',
  },

  output: [
    {
      id: 'd66-o1',
      kind: 'compose',
      zhHint: '也不是实力不足，只用体型判断呢。', zhHintEn: 'It\'s not like I lack skills—they\'re judging me purely by size.',
      tokens: ['실력이', '부족한 것도 아닌데', '체형만으로', '판단하시네요', '실력이 있어', '체력만으로'],
      composeAnswer: ['실력이', '부족한 것도 아닌데', '체형만으로', '판단하시네요'],
      successMsg: 'Tori의 첫 반박. 자기 존엄 지키기.',
    },
    {
      id: 'd66-o2',
      kind: 'listen-choice',
      audioKo: '너무 작아서 안 될 것 같아요.',
      successMsg: '✓ 狮子 사장의 거절. 부드러움 뒤의 편견.', successMsgEn: '✓ The lion boss\'s refusal. Prejudice behind the softness.',
      choices: [
        { zh: '太小了，可能不行。', zhEn: 'It\'s too small, so probably not.', correct: true },
        { zh: '太小所以不能来。', zhEn: 'Too small, so you can\'t come.', correct: false },
        { zh: '你不够高，别来。', zhEn: 'You\'re not tall enough—don\'t come.', correct: false },
        { zh: '太小了很好。', zhEn: 'Being too small is great.', correct: false },
      ],
    },
    {
      id: 'd66-o3',
      kind: 'zh-to-ko',
      zhPrompt: '下周可能没时间。', zhPromptEn: 'I might not have time next week.',
      successMsg: '"다음 주에 시간이 없을 것 같아요." — 없다 → 없을 것 같아요.',
      choices: [
        { ko: '다음 주에 시간이 없을 것 같아요.', correct: true },
        { ko: '다음 주에 시간이 없는 것 같아요.', correct: false },
        { ko: '다음 주에 시간이 없어요 것 같아요.', correct: false },
        { ko: '다음 주에 시간을 없을 것 같아요.', correct: false },
      ],
    },
    {
      id: 'd66-o4',
      kind: 'particle-error',
      zhHint: '这明显是体型歧视。', zhHintEn: 'This is clearly size discrimination.',
      successMsg: '이건 = 이것은. 명백한 (형용사 관형형) + 차별 (명사) + 이에요.',
      choices: [
        { ko: '이건 명백한 체형 차별이에요.', correct: true },
        { ko: '이건 명백해 체형 차별이에요.', correct: false },
        { ko: '이건 명백한 체형 차별해요.', correct: false },
        { ko: '이건 명백하게 체형 차별이에요.', correct: false },
      ],
    },
    {
      id: 'd66-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 66 全对. 손 떨렸지만 목소리는 안 떨렸어요.', successMsgEn: '✓ Day 66 all correct. Hands were shaking, but the voice wasn\'t.',
      pairs: [
        { ko: '차별', zh: '歧视', zhEn: 'Discrimination' },
        { ko: '체형', zh: '体型', zhEn: 'Body type' },
        { ko: '체력', zh: '体力', zhEn: 'Physical strength' },
        { ko: '화가 나다', zh: '生气', zhEn: 'Angry' },
        { ko: '무시하다', zh: '无视', zhEn: 'Ignore' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '체형으로 무시당했지만, 침묵하지 않았어요. 목소리 냈어요.',
    preview: '明天 Tori 迷路了猎食者街区，天黑，路灯暗——第一次真的害怕。', previewEn: 'Tomorrow Tori gets lost in the predator district—dark, dim streetlights—the first time truly scared.',
    stickerId: 'sticker-d66',
    sceneImageUrl: '/images/diary/day-66-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~(으)ㄹ 것 같아요 和 ~는 것 같아요 有什么区别？」「面对歧视怎么用韩语说不？」', carrotHintEn: 'Today\'s carrots: "What\'s the difference between ~(으)ㄹ 것 같아요 and ~는 것 같아요?" "How to say no to discrimination in Korean?"',
};
