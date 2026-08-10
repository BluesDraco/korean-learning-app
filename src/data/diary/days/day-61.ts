import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 61 · 고급반 첫날 · Danielle 完美得不真实
 *
 * 剧情：Tori升入高级班。Danielle也在——韩语完美到让Tori自卑。发音、语法、词汇像母语者。
 * 同样是外国人，差距怎么这么大？（Danielle 伏笔继续埋 — Day 31 → 70 → 揭晓待定）
 *
 * 学习目标：비교 ~처럼 (像...一样) / 自卑 감정 어휘
 * 语料层级：해요体
 */
export const day61: ToriDay = {
  level: 'advanced',
  day: 1,
  phase: 'mastery',
  title: '高级班第一天 · Danielle完美得不真实', titleEn: 'First day of advanced class · Danielle is unrealistically perfect',
  subtitle: '同样是外国人，为什么她像母语者？', subtitleEn: 'She\'s a foreigner too, so why does she sound like a native speaker?',
  heroImageUrl: '/images/diary/day-61-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 4일 · 월요일 오전',
    weather: '兽尔 · 初冬晴', weatherEn: 'Sueol · Clear early winter',
    toriPose: 'shy',
    diaryText: `11月4日，周一上午。初冬晴。

高级班第一天。教室从 305 号搬到大讲堂 401——阶梯座位，一排能坐五个人。
二十个新面孔里，只有 Danielle 我认识。她坐第一排。

火鹤老师放了一段三分钟的听力。播完，她抬眼扫了一圈：
"누가 답할래요?"（谁来答？）

Danielle 的手先举起来。发音像母语者，语法一处不错，用的词是新闻主播级别的。
我脑子还在把第一句话翻成中文，她已经答完第三题。

同样是外国人。差距怎么这么大。

下课我一个人站在洗手间水池前，看着镜子里的自己：

토리，넌 왜 아직도 이만큼밖에 못 해?
（兔莉，你怎么还只能做到这么一点点？）`,
  },

  words: [
    {
      id: 'd61-w1',
      korean: '고급반',
      hangul: 'go-geup-ban',
      zh: '高级班', zhEn: 'Advanced class',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘부터 고급반이에요.', zh: '从今天起是高级班。', zhEn: 'Starting today, it\'s the advanced class.' },
      tip: '고(高) + 급(级) + 반(班). 중급반의 다음 단계', tipEn: 'High + level + class. The next step after intermediate class.',
    },
    {
      id: 'd61-w2',
      korean: '원어민',
      hangul: 'won-eo-min',
      zh: '母语者', zhEn: 'native speaker',
      pos: '名词', posEn: 'Noun',
      example: { ko: '원어민처럼 말해요.', zh: '像母语者一样说话。', zhEn: 'Speak like a native speaker.' },
      tip: '원(原) + 어(语) + 민(民). 韩语原语言使用者', tipEn: 'Original + language + people. Native Korean speakers.',
    },
    {
      id: 'd61-w3',
      korean: '자신감',
      hangul: 'ja-sin-gam',
      zh: '自信', zhEn: 'confidence',
      pos: '名词', posEn: 'Noun',
      example: { ko: '자신감이 없어요.', zh: '没自信。', zhEn: 'I lack confidence.' },
      tip: 'Day 45 学过. 이 날은 반대: 자신감이 떨어지다', tipEn: 'Learned on Day 45. This day is the opposite: 자신감이 떨어지다',
    },
    {
      id: 'd61-w4',
      korean: '차이',
      hangul: 'cha-i',
      zh: '差别/差距', zhEn: 'difference/gap',
      pos: '名词', posEn: 'Noun',
      example: { ko: '차이가 너무 커요.', zh: '差距太大了。', zhEn: 'The gap is too big.' },
      tip: 'Day 56 学过. 이 날은 실력 차이', tipEn: 'Learned on Day 56. This day is about skill gap',
    },
    {
      id: 'd61-w5',
      korean: '틀리다',
      hangul: 'teul-li-da',
      zh: '错/答错', zhEn: 'Wrong / Incorrect',
      pos: '动词', posEn: 'Verb',
      example: { ko: '문법 하나도 안 틀렸어요.', zh: '语法一处都没错。', zhEn: 'Not a single grammar mistake.' },
      tip: '반의: 맞다(对). 시험/답변 상황 자주 씀', tipEn: 'Antonym: 맞다 (correct). Often used in test/answer situations.',
    },
    {
      id: 'd61-w6',
      korean: '실력',
      hangul: 'sil-lyeok',
      zh: '实力', zhEn: 'skill',
      pos: '名词', posEn: 'Noun',
      example: { ko: '실력 차이가 커요.', zh: '实力差距很大。', zhEn: 'The skill gap is huge.' },
      tip: 'Day 31·43 学过. 이 날은 자신을 낮게 봄', tipEn: 'Learned on Day 31·43. On this day, she sees herself as low.',
    },
  ],

  dialogue: {
    scene: '고급반 교실 · 청해 시간',
    setting: {
      time: '周一 09:30', timeEn: 'Monday 09:30',
      place: '한빛어학당 · 고급반',
      npc: '火鹤老师 / Danielle', npcEn: 'Teacher Flamingo / Danielle',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '3분짜리 음성 하나 들어봅시다. 누가 답할래요?',
        hangul: 'sam-bun-jja-ri eum-seong ha-na deu-reo-bop-si-da. nu-ga da-pal-lae-yo?',
        zh: '来听一段3分钟音频。谁来答？', zhEn: 'Listen to a 3-minute audio clip. Who wants to answer?',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Danielle',
        ko: '제가 할게요. 정답은 세 번째 선택지입니다.',
        hangul: 'je-ga hal-ge-yo. jeong-da-beun se beon-jjae seon-taek-ji-im-ni-da',
        zh: '我来答。答案是第三个选项。', zhEn: 'I\'ll answer. The answer is the third option.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '와… 원어민처럼 말해. 나랑 차이가 너무 커.',
        hangul: 'wa… won-eo-min-cheo-reom mal-hae. na-rang cha-i-ga neo-mu keo',
        zh: '哇……像母语者一样。跟我差距太大。', zhEn: 'Wow... like a native speaker. The gap between us is too big.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '다니엘 씨는 원어민처럼 발음해요.',
        hangul: 'da-ni-el-ssi-neun won-eo-min-cheo-reom ba-reu-mae-yo',
        zh: 'Danielle发音像母语者。', zhEn: 'Danielle\'s pronunciation sounds like a native speaker.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '토리 씨도 60일 전보다 정말 많이 늘었어요. 각자 속도가 있어요.',
        hangul: 'to-ri-ssi-do 60il jeon-bo-da jeong-mal ma-ni neu-reo-sseo-yo. gak-ja sok-do-ga i-sseo-yo',
        zh: '兔莉也比60天前进步很多。每个人有自己的节奏。', zhEn: 'Tori has improved a lot compared to 60 days ago too. Everyone has their own pace.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '火鹤老师安慰完，Tori想说"我会更努力"。合适的一句？', zhEn: 'After Teacher Flamingo comforts her, Tori wants to say "I\'ll work harder." Which is the right sentence?',
        practice: 'pick',
        choices: [
          { ko: '네, 저도 계속 노력할게요.', zh: '好的，我会继续努力。', zhEn: 'Okay, I\'ll keep working hard.', correct: true },
          { ko: '저는 이제 안 할래요.', zh: '我不想学了。', zhEn: 'I don\'t want to study anymore.', correct: false },
          { ko: '다니엘 씨가 최고예요.', zh: 'Danielle最厉害。', zhEn: 'Danielle is the best.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '像___一样：~처럼', titleEn: 'Like ___ : ~처럼',
    pattern: 'N + **처럼** + V/A',
    whenToUse: '「像___一样」的比喻/比较句尾。Tori 说 「원어민**처럼** 발음해요」= 像母语者一样发音。~처럼 直接接名词，是韩语最刚需的比喻——夸人像明星、抱怨像小孩、羡慕像本地人都用它。', whenToUseEn: 'The simile/comparison ending for "like ___". Tori says "원어민**처럼** 발음해요" = pronounce like a native speaker. ~처럼 attaches directly to nouns and is Korean\'s most essential simile—used to praise someone like a star, complain like a child, or envy locals.',
    rules: [
      '**기본**：N + 처럼 = 像N一样。별처럼 = 像星星一样 / 아이처럼 = 像小孩一样',
      '**~같이 = 유사어**：원어민같이 말해요 = 像母语者一样说。처럼 (뒤) / 같이 (같은 뜻, 앞뒤 자유)',
      '**~같다 (形容词) 관련**：원어민 같다 = 像母语者 (형용사 서술형)',
      '**부정 비유 → ~처럼 못하다**：원어민처럼 못해요 = 达不到母语者水平'
    ],
    examples: [
      { ko: '다니엘 씨는 원어민처럼 발음해요.', zh: 'Danielle发音像母语者。', zhEn: 'Danielle\'s pronunciation sounds like a native speaker.', highlight: '원어민처럼', note: 'N + 처럼 = 像N一样. Day 61 主题句', noteEn: 'N + 처럼 = like N. Day 61 key sentence.' },
      { ko: '눈이 별처럼 빛나요.', zh: '眼睛像星星一样闪。', zhEn: 'Eyes sparkle like stars.', highlight: '별처럼', note: '별(星) + 처럼 + 빛나다(闪光). 감성 표현', noteEn: '별 (star) + 처럼 + 빛나다 (shine). Emotional expression.' },
      { ko: '아이처럼 웃었어요.', zh: '像小孩一样笑了。', zhEn: 'Laughed like a child.', highlight: '아이처럼', note: '아이(小孩) + 처럼 + 웃다. 관용 비유', noteEn: '아이 (child) + 처럼 + 웃다 (laugh). Idiomatic simile.' },
      { ko: '한국 사람같이 자연스러워요.', zh: '像韩国人一样自然。', zhEn: 'Natural like a Korean.', highlight: '한국 사람같이', note: '같이(N 뒤) = 처럼과 같은 뜻. 실사용에서 흔함' },
    ],
    pitfall:
      '① **처럼** vs **같이** — 뜻은 같으나 미묘 차: 처럼 = 更强调"比喻", 같이 = 更强调"同样". ② 명사만 접함, 동사/형용사엔 안 접함. 예쁘처럼 (X) → 예쁜 것처럼 (O). ③ **~같다 (형용사)** = 像/似乎, 상태를 서술. 원어민 같다 (像母语者/似乎是母语者). ④ **~처럼 못하다** = 达不到. 원어민처럼 못해요 는 자연스럽지만 초급자 자주 어순 실수: ❌ 못 원어민처럼 해요.',
  },

  output: [
    {
      id: 'd61-o1',
      kind: 'compose',
      zhHint: 'Danielle 像母语者一样发音。', zhHintEn: 'Danielle pronounces like a native speaker.',
      tokens: ['다니엘 씨는', '원어민처럼', '발음해요', '원어민이', '발음이에요', '원어민을'],
      composeAnswer: ['다니엘 씨는', '원어민처럼', '발음해요'],
      successMsg: '~처럼 = 像...一样. 비교/비유의 정석.', successMsgEn: '~처럼 = like... The standard for comparison/analogy.',
    },
    {
      id: 'd61-o2',
      kind: 'listen-choice',
      audioKo: '각자 속도가 있어요.',
      successMsg: '✓ 火鹤老师的一句. 각자 = 各自.', successMsgEn: '✓ Teacher Huohe\'s line. 각자 = each one.',
      choices: [
        { zh: '各自有自己的节奏。', zhEn: 'Everyone has their own pace.', correct: true },
        { zh: '所有人都一样。', zhEn: 'Everyone is the same.', correct: false },
        { zh: '速度都一样。', zhEn: 'The speed is the same for everyone.', correct: false },
        { zh: '没有速度。', zhEn: 'There\'s no speed.', correct: false },
      ],
    },
    {
      id: 'd61-o3',
      kind: 'zh-to-ko',
      zhPrompt: '眼睛像星星一样闪。', zhPromptEn: 'Eyes sparkle like stars.',
      successMsg: '"눈이 별처럼 빛나요." — N + 처럼 + V.',
      choices: [
        { ko: '눈이 별처럼 빛나요.', correct: true },
        { ko: '눈에 별처럼 빛나요.', correct: false },
        { ko: '눈이 별처럼 빛나는 것 같아요.', correct: false },
        { ko: '눈은 별처럼 빛나다.', correct: false },
      ],
    },
    {
      id: 'd61-o4',
      kind: 'particle-error',
      zhHint: '像韩国人一样自然。', zhHintEn: 'Natural like a Korean.',
      successMsg: '한국 사람 + **같이** = 像韩国人一样 (같이 = 처럼 같은 뜻).', successMsgEn: 'Korean person + **같이** = like a Korean (같이 = same meaning as 처럼).',
      choices: [
        { ko: '한국 사람같이 자연스러워요.', correct: true },
        { ko: '한국 사람에게 자연스러워요.', correct: false },
        { ko: '한국 사람을 자연스러워요.', correct: false },
        { ko: '한국 사람은 자연스러워요.', correct: false },
      ],
    },
    {
      id: 'd61-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 61 全对. 각자 속도가 있어요.', successMsgEn: '✓ Day 61 all correct. 각자 속도가 있어요.',
      pairs: [
        { ko: '고급반', zh: '高级班', zhEn: 'Advanced class' },
        { ko: '원어민', zh: '母语者', zhEn: 'native speaker' },
        { ko: '차이', zh: '差距', zhEn: 'gap' },
        { ko: '틀리다', zh: '错', zhEn: 'wrong' },
        { ko: '실력', zh: '实力', zhEn: 'skill' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '고급반 첫날. 자신감 낮아졌지만, 걷는 방향은 맞아요.',
    preview: '明天 Tori 去咖啡馆面试打工——熊店长会怎么问？', previewEn: 'Tomorrow Tori goes to the café for a part-time job interview—what will Bear Manager ask?',
    stickerId: 'sticker-d61',
    sceneImageUrl: '/images/diary/day-61-scene.jpg',
  },

  carrotHint: '今天的胡萝卜：「~처럼 和 ~같이 有什么区别？」「원어민처럼 怎么练？」', carrotHintEn: 'Today\'s carrot: "What\'s the difference between ~처럼 and ~같이?" "How do I practice 원어민처럼?"',
};
