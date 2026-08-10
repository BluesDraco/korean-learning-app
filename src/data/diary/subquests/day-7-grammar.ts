import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 7 · 1-3 语法关 · 紧急求助三句 + Chapter 1 综合
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 揪 도와주세요 类求助句真实翻车（助词/敬语层级）
 *   → compose 从留学生保命三句到综合应用（Chapter 1 收官）
 *   → rule 抽象반말 vs 해요体切换 / 敬语层级 / 求助场景选择
 *
 * Chapter 1 收官：把 Day 1-6 学的 조사/敬语/收音判断全部综合考察
 * 首次考察반말 vs 해요体 切换（Haru 场景）
 */
export const day7Grammar: GrammarSubQuestData = {
  day: 7, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '紧急求助三句 + Chapter 1 综合应用', subtitleEn: 'Three emergency phrases + Chapter 1 comprehensive practice',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd07-g3-f1',
      promptKo: '길이 잃었어요.',
      promptZh: '"我迷路了"哪句正确？', promptZhEn: 'Which sentence is correct for "I\'m lost"?',
      choices: [
        { text: '길이 잃었어요.', correct: false },
        { text: '길을 잃었어요.', correct: true },
        { text: '길은 잃었어요.', correct: false },
        { text: '길가 잃었어요.', correct: false },
      ],
      explain: '잃다（丢失）是及物动词，前面用**宾格 을/를**。길 有收音 ㄹ → 을。「길을 잃다」= 迷路（固定搭配）', explainEn: '잃다 (to lose) is a transitive verb, so it takes the object particle 을/를. 길 ends in ㄹ → 을. 길을 잃다 = to get lost (fixed expression)',
    },
    {
      id: 'd07-g3-f2',
      promptKo: '도와요.',
      promptZh: '想请陌生人帮忙，最标准的说法是？', promptZhEn: 'What\'s the most standard way to ask a stranger for help?',
      choices: [
        { text: '도와요.', correct: false },
        { text: '도우세요.', correct: false },
        { text: '도와주세요.', correct: true },
        { text: '돕아 주세요.', correct: false },
      ],
      explain: '돕다 → 도와（ㅂ 不规则变形）+ 주세요（Day 2 万能句式）= 도와주세요。「도와요」是陈述"我在帮忙"，不是请求', explainEn: '돕다 → 도와 (ㅂ irregular) + 주세요 (Day 2 all-purpose pattern) = 도와주세요. "도와요" states "I\'m helping," not a request.',
    },
    {
      id: 'd07-g3-f3',
      promptKo: '토리, 괜찮아요?',
      promptZh: 'Haru 对朋友兔莉说"没事吧？"最自然的반말是？', promptZhEn: 'What\'s the most natural 반말 for Haru to say "Are you okay?" to friend Tori?',
      choices: [
        { text: '토리, 괜찮아요?', correct: false },
        { text: '토리, 괜찮아?', correct: true },
        { text: '토리, 괜찮습니까?', correct: false },
        { text: '토리, 괜찮으세요?', correct: false },
      ],
      explain: '해요体 괜찮아요 → 반말 괜찮아（去掉 요）。同龄朋友之间用반말显得亲近，加 요 反而生分', explainEn: '해요체 괜찮아요 → 반말 괜찮아 (drop 요). Using 반말 with same-age friends feels close; adding 요 feels distant.',
    },
    {
      id: 'd07-g3-f4',
      promptKo: '핸드폰가 없어요.',
      promptZh: '"没有手机"哪句正确？', promptZhEn: 'Which sentence is correct for "I don\'t have a phone"?',
      choices: [
        { text: '핸드폰가 없어요.', correct: false },
        { text: '핸드폰이 없어요.', correct: true },
        { text: '핸드폰을 없어요.', correct: false },
        { text: '핸드폰는 없어요.', correct: false },
      ],
      explain: '있다/없다 前用主格 이/가。핸드폰 有收音 ㄴ → 이。「없어요」是形容/存在词，不用宾格', explainEn: '있다/없다 take subject particles 이/가. 핸드폰 ends in ㄴ → 이. "없어요" is an adjective/existential, no object particle.',
    },
    {
      id: 'd07-g3-f5',
      promptKo: '같이 가.',
      promptZh: '想邀请陌生大叔"一起走"（用礼貌해요体），应该？', promptZhEn: 'Want to invite a stranger (an older man) to "walk together" (polite 해요체), what should you say?',
      choices: [
        { text: '같이 가.', correct: false },
        { text: '같이 갑니다.', correct: false },
        { text: '같이 가요.', correct: true },
        { text: '같이 가자.', correct: false },
      ],
      explain: '해요体 邀请 = 같이 가요。「같이 가」/「같이 가자」是반말（只对朋友用）；「같이 갑니다」是합쇼체陈述句，对陌生人太生硬也不像邀请', explainEn: '해요체 invitation = 같이 가요. "같이 가"/"같이 가자" are 반말 (friends only); "같이 갑니다" is 합쇼체 statement, too stiff for a stranger and not an invitation.',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd07-g3-c1',
      zhHint: '请帮帮我！我迷路了。', zhHintEn: 'Please help me! I\'m lost.',
      audioKo: '도와주세요! 길을 잃었어요.',
      answer: ['도와주세요!', '길을', '잃었어요.'],
      tokens: ['도와주세요!', '길을', '잃었어요.', '길이', '길은', '도와요.'],
      explain: '「길을 잃다」= 迷路（固定搭配，宾格 을）。도와주세요 是 Day 2 주세요 句式的经典应用', explainEn: '"길을 잃다" = to get lost (fixed phrase, object particle 을). 도와주세요 is a classic use of Day 2\'s 주세요 pattern.',
    },
    {
      id: 'd07-g3-c2',
      zhHint: '等一下，请帮帮我。', zhHintEn: 'Wait a moment, please help me.',
      audioKo: '잠깐만요, 도와주세요.',
      answer: ['잠깐만요,', '도와주세요.'],
      tokens: ['잠깐만요,', '도와주세요.', '괜찮아요.', '고마워요.', '만나서 반가워요.'],
      explain: '拦人 + 求助的黄金组合：잠깐만요（叫停）+ 도와주세요（请求）', explainEn: 'Golden combo: 잠깐만요 (stop someone) + 도와주세요 (ask for help).',
    },
    {
      id: 'd07-g3-c3',
      zhHint: '谢了，Haru。（对朋友的반말）', zhHintEn: 'Thanks, Haru. (반말 to a friend)',
      audioKo: '고마워, 하루야.',
      answer: ['고마워,', '하루야.'],
      tokens: ['고마워,', '하루야.', '감사합니다.', '하루예요.', '하루입니다.', '고마워요,'],
      explain: '반말组合：고마워（谢了）+ 名字+야（呼语·无收音 → 야；有收音 → 아）。对朋友最亲近的说法', explainEn: '반말 combo: 고마워 (thanks) + name+야 (vocative: no final consonant → 야; with final → 아). The closest way to say it to a friend.',
    },
    {
      id: 'd07-g3-c4',
      zhHint: '一起走吧！我好害怕。', zhHintEn: 'Let\'s walk together! I\'m so scared.',
      audioKo: '같이 가요! 무서워요.',
      answer: ['같이', '가요!', '무서워요.'],
      tokens: ['같이', '가요!', '무서워요.', '가자.', '무서워.', '혼자'],
      explain: '해요体版本：같이 가요 + 무서워요。반말版是「같이 가자, 무서워」——对陌生人/长辈都用해요体版', explainEn: '해요체 version: 같이 가요 + 무서워요. 반말 version is "같이 가자, 무서워" — use 해요체 with strangers/elders.',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd07-g3-r1',
      promptZh: '关于반말（해체）和해요体的区别，哪句是对的？', promptZhEn: 'Which statement about the difference between 반말 (해체) and 해요체 is correct?',
      choices: [
        { text: '完全一样，随便用。', textEn: 'They\'re exactly the same, just use either.', correct: false },
        { text: '해요体加 요 结尾（对陌生人/长辈），반말去掉 요（对同龄朋友）。', textEn: '해요체 ends with 요 (for strangers/elders), 반말 drops 요 (for same-age friends).', correct: true },
        { text: '해요体只用于问句，반말只用于陈述句。', textEn: '해요체 is only for questions, 반말 only for statements.', correct: false },
        { text: '반말比해요体更礼貌。', textEn: '반말 is more polite than 해요체.', correct: false },
      ],
      explain: '敬语层级：합쇼체(입니다) > 해요체(예요) > 반말(야/아)。对朋友用반말显亲近，对陌生人用반말失礼', explainEn: 'Honorific levels: 합쇼체 (입니다) > 해요체 (예요) > 반말 (야/아). Use 반말 with friends to show closeness; using it with strangers is rude.',
    },
    {
      id: 'd07-g3-r2',
      promptZh: '"迷路了"用什么助词？', promptZhEn: 'What particle do you use for "got lost"?',
      choices: [
        { text: '길이 잃었어요.', correct: false },
        { text: '길을 잃었어요.', correct: true },
        { text: '길에 잃었어요.', correct: false },
        { text: '길는 잃었어요.', correct: false },
      ],
      explain: '잃다 是及物动词 → 宾格 을/를。길 有收音 → 을。「길을 잃다」是固定搭配，要背下来', explainEn: '잃다 is transitive → object particle 을/를. 길 has a final consonant → 을. "길을 잃다" is a fixed phrase—memorize it.',
    },
    {
      id: 'd07-g3-r3',
      promptZh: '想跟朋友说"谢了"，最亲近的说法是？', promptZhEn: 'What\'s the closest way to say "thanks" to a friend?',
      choices: [
        { text: '감사합니다.', correct: false },
        { text: '고마워요.', correct: false },
        { text: '고마워.', correct: true },
        { text: '고맙습니다.', correct: false },
      ],
      explain: '道谢阶梯：합쇼체 감사합니다/고맙습니다（最正式）> 해요体 고마워요/감사해요（日常）> 반말 고마워（朋友）', explainEn: 'Thank-you ladder: 합쇼체 감사합니다/고맙습니다 (most formal) > 해요체 고마워요/감사해요 (everyday) > 반말 고마워 (friends).',
    },
    {
      id: 'd07-g3-r4',
      promptZh: '关于「도와주세요」和「같이 가요」，哪个描述最准确？', promptZhEn: 'Which description of "도와주세요" and "같이 가요" is most accurate?',
      choices: [
        { text: '两个意思一样。', textEn: 'They mean the same thing.', correct: false },
        { text: '도와주세요 = 主动请求帮助；같이 가요 = 邀请对方同行。', textEn: '도와주세요 = asking for help; 같이 가요 = inviting someone to go together.', correct: true },
        { text: '도와주세요 只对朋友用；같이 가요 只对陌生人用。', textEn: '도와주세요 is only used with friends; 같이 가요 is only used with strangers.', correct: false },
        { text: '도와주세요 是过去式；같이 가요 是现在式。', textEn: '도와주세요 is past tense; 같이 가요 is present tense.', correct: false },
      ],
      explain: '两句都是해요体礼貌句，功能不同：求助 vs 邀请。Chapter 1 收官三句：도와주세요/잠깐만요/같이 가요', explainEn: 'Both are polite 해요-form sentences with different functions: asking for help vs. inviting. Chapter 1\'s final three phrases: 도와주세요/잠깐만요/같이 가요',
    },
  ],
};
