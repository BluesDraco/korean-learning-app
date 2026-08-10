import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 56 · 새 학기 · 成为别人的光
 *
 * 剧情：开学季，한빛来了一批新生。Tori在走廊看到一只新来的兔子，拖着超重行李箱说韩语。
 * 行李箱爆开，东西散落一地。Tori跑过去帮她捡。新生说"제 집이 너무 무거워요…"——
 * Tori笑着说："그건 집이 아니라 짐이에요. 괜찮아요. 나도 처음에 그랬어요."
 * 现在她成了别人的Haru。
 *
 * 学习目标：경험 ~아/어 봤어요 (Day 43 深化) / 짐-집 회귀
 * 语料层级：해요体
 * 韩语自审：korean skill PASS
 */
export const day56: ToriDay = {
  level: 'intermediate',
  day: 26,
  phase: 'expansion',
  title: '新生짐/집 · 成为别人的光', titleEn: 'New student\'s luggage/home · Becoming someone else\'s light',
  subtitle: '现在，我是别人的Haru了', subtitleEn: 'Now, I\'m someone else\'s Haru',
  heroImageUrl: '/images/diary/day-56-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 28일 · 월요일 오후',
    weather: '兽尔 · 秋阳', weatherEn: 'Seoul · Autumn sun',
    toriPose: 'proud',
    diaryText: `10月28日，周一下午。

开学季。
한빛宿舍来了新生——
走廊里全是陌生的行李箱和陌生的语言。

我正好从超市回来。
走到3楼拐角，
一只穿粉色卫衣的兔子——
比我还小的样子——
一个人拖着一个粉色行李箱。

嘴里念念有词："집이 무거워… 집이 진짜 무거워…"

——我愣了半秒。

然后行李箱"啪"地爆开。
衣服、教科书、拖鞋、一个粉色小熊玩偶，
全散在走廊。

小兔子当场蹲下，快哭了。

我三步跑过去，一起蹲下。
"괜찮아요, 같이 정리해요."（没事，一起收拾。）

一边捡衣服，我一边小声说：

"저기, 아까 말한 그거… '집'이 아니라 '짐'이에요.
집은 house, 짐은 luggage.
받침이 하나 다를 뿐이에요."

（那个，你刚才说的……不是"家"是"行李"。
집 = 家，짐 = 行李。
只是收音一个字母的差别。）

小兔子红着眼睛点头。

"괜찮아요. 나도 처음에 그랬어요. 진짜 똑같았어요."
（没事。我一开始也这样。真的一模一样。）

我笑起来的时候，
突然想起——
Day 3 的仁爪机场，
Minji走过来帮我抬箱子的那一秒。
Day 7 的地铁站，
Haru的手伸进画面捡起胡萝卜的那一刻。

——이제 내가 그 사람이 됐구나.
（原来现在我成了那个人啊。）

我一边把最后一件衣服叠好，
心里默默说了这一句，
用韩语。`,
  },

  words: [
    {
      id: 'd56-w1',
      korean: '신입생',
      hangul: 'sin-ip-saeng',
      zh: '新生', zhEn: 'new student',
      pos: '名词', posEn: 'Noun',
      example: { ko: '새 학기라서 신입생이 왔어요.', zh: '因为开学季来了新生。', zhEn: 'Because new students came for the start of the school season.' },
      tip: '新(신) + 入(입) + 生(생). 신입 짧게도 씀', tipEn: '新(신) + 入(입) + 生(생). Also shortened to 신입.',
    },
    {
      id: 'd56-w2',
      korean: '터지다',
      hangul: 'teo-ji-da',
      zh: '爆开/破', zhEn: 'burst/open',
      pos: '动词', posEn: 'Verb',
      example: { ko: '가방이 터졌어요.', zh: '包爆开了。', zhEn: 'The bag burst open.' },
      tip: '자동. 캐리어 터지다 = 行李箱爆开', tipEn: 'Auto. Carrier burst = suitcase burst open',
    },
    {
      id: 'd56-w3',
      korean: '정리하다',
      hangul: 'jeong-ni-ha-da',
      zh: '整理/收拾', zhEn: 'tidy up / organize',
      pos: '动词', posEn: 'Verb',
      example: { ko: '같이 정리해요.', zh: '一起收拾。', zhEn: 'Let\'s tidy up together.' },
      tip: '整(정) + 理(리) + 하다. 방을 정리하다 / 짐을 정리하다', tipEn: '整(jeong) + 理(ri) + hada. Clean the room / organize luggage',
    },
    {
      id: 'd56-w4',
      korean: '똑같다',
      hangul: 'ttok-gat-da',
      zh: '一模一样', zhEn: 'exactly the same',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '진짜 똑같았어요.', zh: '真的一模一样。', zhEn: 'They\'re really exactly the same.' },
      tip: '똑(完全) + 같다(相同). 强化的"같다"', tipEn: 'ttok (completely) + gatda (same). Emphasized \'gatda\'',
    },
    {
      id: 'd56-w5',
      korean: '받침',
      hangul: 'bat-chim',
      zh: '收音', zhEn: 'final consonant',
      pos: '名词', posEn: 'Noun',
      example: { ko: '받침이 하나 다를 뿐이에요.', zh: '只是收音差一个字母。', zhEn: 'It\'s just one final consonant different.' },
      tip: '韩语字母的下部. 짐/집 = 받침 ㅁ vs ㅂ',
    },
    {
      id: 'd56-w6',
      korean: '차이',
      hangul: 'cha-i',
      zh: '差别/差异', zhEn: 'difference',
      pos: '名词', posEn: 'Noun',
      example: { ko: '작은 차이지만 뜻이 완전히 달라요.', zh: '虽小差别但意思完全不同。', zhEn: 'Though the difference is small, the meaning is completely different.' },
      tip: '差(차) + 异(이). 작은 차이 = 微小差别', tipEn: 'Cha (difference) + i (difference). Small difference = minor difference',
    },
  ],

  dialogue: {
    scene: '한빛 기숙사 3층 복도·신입생 캐리어',
    setting: {
      time: '周一 15:00', timeEn: 'Monday 15:00',
      place: '한빛宿舍3楼走廊', placeEn: 'Hanbit dormitory 3rd floor hallway',
      npc: '신입생 (兔子)', npcEn: 'New student (rabbit)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '신입생',
        ko: '집이 진짜 너무 무거워요…',
        hangul: 'ji-bi jin-jja neo-mu mu-geo-wo-yo…',
        zh: '"家"太重了……', zhEn: '\'Home\' is too heavy...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '괜찮아요, 같이 정리해요.',
        hangul: 'gwaen-cha-na-yo, ga-chi jeong-ni-hae-yo',
        zh: '没事，一起收拾。', zhEn: 'It\'s okay, let\'s tidy up together.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '저기요, "집"이 아니라 "짐"이에요.',
        hangul: 'jeo-gi-yo, "jip"-i a-ni-ra "jim"-i-e-yo',
        zh: '那个，不是"家"是"行李"。', zhEn: 'That\'s not \'home\', it\'s \'luggage\'.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '집은 house, 짐은 luggage. 받침 하나 차이예요.',
        hangul: 'ji-beun house, ji-meun luggage. bat-chim ha-na cha-i-ye-yo',
        zh: '집 = 家，짐 = 行李。只是收音差一个字母。', zhEn: 'Jip = home, jim = luggage. Just one final consonant different.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '괜찮아요. 나도 처음에 똑같이 실수해 봤어요.',
        hangul: 'gwaen-cha-na-yo. na-do cheo-eu-me ttok-ga-chi sil-su-hae bwa-sseo-yo',
        zh: '没事。我一开始也一模一样犯过这个错。', zhEn: 'It\'s fine. I made the exact same mistake at first.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '小兔子红着眼道谢。Tori想让她放心"以后有困难可以找自己"。合适的一句？', zhEn: 'The little rabbit thanks with red eyes. Tori wants to reassure her \'you can come to me if you have trouble in the future\'. Which is the right line?',
        practice: 'pick',
        choices: [
          { ko: '어려운 일 있으면 언제든 얘기해요.', zh: '有困难随时告诉我。', zhEn: 'Tell me anytime if you have trouble.', correct: true },
          { ko: '이제 안 도와줄 거예요.', zh: '以后不帮你了。', zhEn: 'I won\'t help you anymore.', correct: false },
          { ko: '학교는 어차피 힘들어요.', zh: '学校反正很累。', zhEn: 'School is tiring anyway.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '经历过___：~아/어 봤어요（Day 43 深化）', titleEn: 'Experienced ___ : ~아/어 봤어요 (Day 43 Deep Dive)',
    pattern: 'V + **아/어 봤어요**',
    whenToUse: 'Day 43 学过 ~아/어 보다 = 尝试。**~아/어 봤어요** = 尝试过 = **有过经验**。Tori 说 「나도 처음에 똑같이 실수해 **봤어요**」= 我一开始也犯过一模一样的错。Day 56 主题是"我有过和你一样的经验"——~아/어 봤어요 是承担别人痛苦的一句话。', whenToUseEn: 'Day 43 taught ~아/어 보다 = to try. **~아/어 봤어요** = tried = **had the experience**. Tori says 「나도 처음에 똑같이 실수해 **봤어요**」= I made the exact same mistake at first too. Day 56\'s theme is "I\'ve had the same experience as you" — ~아/어 봤어요 is a phrase that shares someone\'s pain.',
    rules: [
      '**기본**：V + 아/어 봤어요 = "曾经做过/试过"。먹어 봤어요 (吃过) / 가 봤어요 (去过)',
      '**~아/어 봤다 = 경험 / ~았/었다 = 단순 과거**：김치찌개 먹었어요 (吃了泡菜汤) vs 김치찌개 먹어 봤어요 (吃过泡菜汤，作为经验)',
      '**부정 → ~아/어 본 적이 없어요**：김치찌개 먹어 본 적이 없어요 = 没吃过泡菜汤',
      '**~아/어 봤어요 + 감정 서술**：실수해 봤어요 (犯过错). 실패해 봤어요 (失败过). 承担他人痛苦的语用'
    ],
    examples: [
      { ko: '나도 처음에 똑같이 실수해 봤어요.', zh: '我一开始也犯过一模一样的错。', zhEn: 'I made the exact same mistake at first too.', highlight: '실수해 봤어요', note: '실수하다 → 실수해 봤어요. Tori对新生说的关键句', noteEn: '실수하다 → 실수해 봤어요. The key phrase Tori says to the new student.' },
      { ko: '한국 음식을 다 먹어 봤어요.', zh: '韩国料理都尝过。', zhEn: 'I\'ve tried all Korean dishes.', highlight: '먹어 봤어요', note: '먹다 → 먹어 봤어요. 경험 강조' },
      { ko: '동물문 시장에 가 봤어요?', zh: '你去过동물문市场吗？', zhEn: 'Have you been to the Dongmulmun Market?', highlight: '가 봤어요', note: '가다 → 가 봤어요. 경험 질문' },
      { ko: '한국어로 발표해 봤어요.', zh: '用韩语发表过。', zhEn: 'I\'ve presented in Korean.', highlight: '발표해 봤어요', note: '발표하다 → 발표해 봤어요. Day 42 회고' },
    ],
    pitfall:
      '① **~아/어 봤어요 vs ~았/었어요**：둘 다 과거지만 语感不同. ~아/어 봤어요 는 "**경험/시도**", ~았/었어요 는 **단순 사실**. "먹었어요" = 吃了; "먹어 봤어요" = 尝过。② 부정은 **~아/어 본 적이 없다**：❌ 안 먹어 봤어요 (자연스럽지 않음) → ✅ 먹어 본 적이 없어요. ③ 존재/상태 동사(있다/살다)와는 자주 쓰지 않음. 있어 봤어요 (X) → 있어 본 적 있어요 (경험 강조).',
  },

  output: [
    {
      id: 'd56-o1',
      kind: 'compose',
      zhHint: '我一开始也犯过一模一样的错。', zhHintEn: 'I made the exact same mistake at first too.',
      tokens: ['나도', '처음에', '똑같이', '실수해', '봤어요', '실수했어요', '실수해요'],
      composeAnswer: ['나도', '처음에', '똑같이', '실수해', '봤어요'],
      successMsg: '~아/어 봤어요 = 有过经验. Tori成为Haru的一刻.', successMsgEn: '~아/어 봤어요 = had the experience. The moment Tori becomes Haru.',
    },
    {
      id: 'd56-o2',
      kind: 'listen-choice',
      audioKo: '집은 house, 짐은 luggage. 받침 하나 차이예요.',
      successMsg: '✓ Day 3 → Day 56 의 回声. 짐/집 差别就是ㅂ 和ㅁ.', successMsgEn: '✓ Day 3 → Day 56 echo. The difference between 짐/집 is just ㅂ and ㅁ.',
      choices: [
        { zh: '집 = 家、짐 = 行李。只是收音差一个字母。', zhEn: '집 = home, 짐 = luggage. Just one letter different in the final consonant.', correct: true },
        { zh: '집 和 짐 完全一样。', zhEn: '집 and 짐 are exactly the same.', correct: false },
        { zh: '집 是英语。', zhEn: '집 is English.', correct: false },
        { zh: '差异很大。', zhEn: 'The difference is big.', correct: false },
      ],
    },
    {
      id: 'd56-o3',
      kind: 'zh-to-ko',
      zhPrompt: '你去过동물문市场吗？', zhPromptEn: 'Have you been to the Dongmulmun Market?',
      successMsg: '"동물문 시장에 가 봤어요?" — 가다 → 가 봤어요? (경험 질문).',
      choices: [
        { ko: '동물문 시장에 가 봤어요?', correct: true },
        { ko: '동물문 시장에 갔어요?', correct: false },
        { ko: '동물문 시장을 가 봤어요?', correct: false },
        { ko: '동물문 시장에 갔던 적이 있어요?', correct: false },
      ],
    },
    {
      id: 'd56-o4',
      kind: 'particle-error',
      zhHint: '没吃过泡菜汤。（부정 경험）', zhHintEn: 'I\'ve never had kimchi stew. (negative experience)',
      successMsg: '否定要用 **~아/어 본 적이 없어요**. 不用 안 + ~아/어 봤어요.', successMsgEn: 'For negatives, use **~아/어 본 적이 없어요**. Not 안 + ~아/어 봤어요.',
      choices: [
        { ko: '김치찌개 먹어 본 적이 없어요.', correct: true },
        { ko: '김치찌개 안 먹어 봤어요.', correct: false },
        { ko: '김치찌개 못 먹어 봤어요.', correct: false },
        { ko: '김치찌개를 못 먹어 본 적이 없어요.', correct: false },
      ],
    },
    {
      id: 'd56-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 56 全对。이제 내가 그 사람이 됐어요.', successMsgEn: '✓ Day 56 all correct. Now I\'ve become that person.',
      pairs: [
        { ko: '신입생', zh: '新生', zhEn: 'new student' },
        { ko: '터지다', zh: '爆开', zhEn: 'burst open' },
        { ko: '정리하다', zh: '收拾', zhEn: 'tidy up' },
        { ko: '똑같다', zh: '一模一样', zhEn: 'exactly the same' },
        { ko: '차이', zh: '差别', zhEn: 'difference' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: 'Day 3 → Day 56. 도움받던 사람이 오늘 도움을 준 사람.',
    preview: '明天Tori给三个朋友各写一封韩语信。', previewEn: 'Tomorrow Tori writes a Korean letter to each of three friends.',
    stickerId: 'sticker-d56',
    sceneImageUrl: '/images/diary/day-56-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어 봤어요 和 ~았/었어요 什么时候用？」「집/짐 还有哪些容易混的받침?」',
};
