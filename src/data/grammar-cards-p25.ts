import type { GrammarCard } from '@/types';

export const grammarCardsP25: GrammarCard[] = [
  // ── 第1课：-는다고/-ㄴ다고/-다고/이라고 하다（间接陈述） ─────────
  {
    id: 'card-p25-l01',
    partNumber: 25,
    lessonNumber: 1,
    title: '-는다고/-ㄴ다고/-다고/이라고 하다',
    whatItDoes: '"（某人）说……"', whatItDoesEn: '"(Someone) said..."',
    whatItDoesBody: '把别人的原话转述给第三者，就是"间接引用"。\n韩语间接引用比中文更严格：动词、形容词、名词各有自己的形态。\n这一课把陈述句的间接引用四种基本形态一次讲清。', whatItDoesBodyEn: 'Relaying someone\'s original words to a third party is "indirect quotation."\\nKorean indirect quotation is stricter than Chinese: verbs, adjectives, and nouns each have their own forms.\\nThis lesson explains the four basic forms of indirect quotation for declarative sentences at once.',
    structureNote: '陈述句间接引用结构：\n动词现在（有받침）→ -는다고 하다\n动词现在（无받침）→ -ㄴ다고 하다\n动词过去 → -았/었다고 하다\n形容词 → -다고 하다\n名词 → -(이)라고 하다', structureNoteEn: 'Declarative indirect quotation structure:\\nVerb present (with batchim) → -는다고 하다\\nVerb present (no batchim) → -ㄴ다고 하다\\nVerb past → -았/었다고 하다\\nAdjective → -다고 하다\\nNoun → -(이)라고 하다',
    rulesNote: '核心规则：\n1. 直接引语的敬语级要"脱下"再"重穿" → 하다 层级决定\n2. 时态在动词/形容词上标，而不是在 하다 上\n3. 名词用 -(이)라고，不用 -다고\n4. 하다 可以变 → 그러다 / 그랬다 / 물어보다 等', rulesNoteEn: 'Core rules:\\n1. The honorific level of the direct quote must be "taken off" and "put back on" → determined by the 하다 level\\n2. Tense is marked on the verb/adjective, not on 하다\\n3. Nouns use -(이)라고, not -다고\\n4. 하다 can change → 그러다 / 그랬다 / 물어보다, etc.',
    structures: [
      {
        ko: '민수가 학교에 간다고 해요.',
        zh: '民秀说他去学校。', zhEn: 'Minsu said he goes to school.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '간다고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '언니가 밥을 먹는다고 했어요.',
        zh: '姐姐说要吃饭。', zhEn: 'My sister said she\'s going to eat.',
        tokens: [
          { text: '언니가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹는다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨가 춥다고 해요.',
        zh: '（有人）说今天天气冷。', zhEn: '(Someone) said it\'s cold today.',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '춥다고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '저 사람이 한국 사람이라고 했어요.',
        zh: '那个人说他是韩国人。', zhEn: 'That person said he is Korean.',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '한국 사람이라고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在时有收音 → -는다고 하다', textEn: 'Verb present tense with final consonant → -는다고 하다', examples: '먹다 → 먹는다고 / 읽다 → 읽는다고' },
      { type: 'rule', text: '动词现在时无收音 → -ㄴ다고 하다', textEn: 'Verb present tense without final consonant → -ㄴ다고 하다', examples: '가다 → 간다고 / 오다 → 온다고' },
      { type: 'rule', text: '动词过去时 → -았/었다고 하다', textEn: 'Verb past tense → -았/었다고 하다', examples: '먹었다고 / 갔다고 / 만났다고' },
      { type: 'rule', text: '形容词 → -다고 하다（不加 ㄴ/는）', textEn: 'Adjective → -다고 하다 (no ㄴ/는 added)', examples: '춥다 → 춥다고 / 예쁘다 → 예쁘다고' },
      { type: 'rule', text: '名词 + (이)라고 하다', textEn: 'Noun + (이)라고 하다', examples: '학생이라고 / 의사라고 / 회사원이라고' },
      { type: 'note', text: '하다 是主动词，可以按敬语和时态自由变化', textEn: '하다 is the main verb and can change freely for politeness and tense', examples: '한다 / 해요 / 했어요 / 하셨어요' },
      { type: 'compare', text: '和 直接引用 差别：直接引语保留原话敬语；间接引语把敬语脱下', textEn: 'Difference from direct quotation: direct speech keeps the original politeness; indirect speech strips it off', examples: '"가요" 하고 말했어요 → 간다고 했어요' },
      { type: 'usage', text: '常用简写形态：-대（-다고 해 → -대）· -는대 · -래', textEn: 'Common shortened forms: -대 (-다고 해 → -대) · -는대 · -래', examples: '간대 / 먹는대 / 학생이래' },
      { type: 'note', text: '中文没有的关键动作："脱敬语"。原话不管多客气（가요 / 갑니다 / 가십니다），转述时动词一律回到平语 한다체（간다고），礼貌只体现在句尾的 하다 上。中文"他说\'我去\'"原样保留，韩语必须先脱掉再重穿。', textEn: 'A key move that Chinese lacks: "stripping politeness." No matter how polite the original was (가요 / 갑니다 / 가십니다), when reporting, the verb always returns to the plain form 한다체 (간다고), and politeness is only shown in the final 하다. In Chinese, "he said \'I\'m going\'" stays as is, but Korean must strip it off first and then put it back on.', examples: '가요 → 간다고 해요 / 갑니다 → 간다고 하셨어요' },
      { type: 'note', text: '例外：있다 / 없다 归形容词类接续，用 -다고，不加 -는。这是陈述现在时最常踩的例外。', textEn: 'Exception: 있다 / 없다 conjugate like adjectives, using -다고 without -는. This is the most common exception in present-tense statements.', examples: '재미있다 → 재미있다고 / 재미없다 → 재미없다고 / 맛있다 → 맛있다고' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '온다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '民秀说明天来。', zhEn: 'Minsu said he\'ll come tomorrow.',
        swapRole: 'verb',
        swapWords: ['온다고', '간다고', '떠난다고'],
      },
      {
        wordBlocks: [
          { text: '언니가', role: 'subject' },
          { text: '한국 음식을', role: 'object' },
          { text: '좋아한다고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
        zh: '姐姐说喜欢韩国菜。', zhEn: 'My sister said she likes Korean food.',
        swapRole: 'verb',
        swapWords: ['좋아한다고', '즐긴다고', '자주 먹는다고'],
      },
      {
        wordBlocks: [
          { text: '이 카페가', role: 'subject' },
          { text: '아주', role: 'plain' },
          { text: '유명하다고', role: 'verb' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '听说这家咖啡馆很有名。', zhEn: 'I heard this café is famous.',
        swapRole: 'verb',
        swapWords: ['유명하다고', '맛있다고', '분위기가 좋다고'],
      },
    ],
    scenarios: [
      { icon: '📞', context: '转达消息', contextEn: 'Relaying a message', ko: '어머니가 곧 도착한다고 하셨어요.', zh: '妈妈说马上就到。', zhEn: 'Mom said she\'ll be there soon.' },
      { icon: '📢', context: '新闻', contextEn: 'news', ko: '뉴스에서 내일 비가 온다고 해요.', zh: '新闻说明天下雨。', zhEn: 'The news said it will rain tomorrow.' },
      { icon: '💬', context: '别人评价', contextEn: 'Others\' evaluation', ko: '친구가 그 영화가 재미있다고 했어요.', zh: '朋友说那部电影有意思。', zhEn: 'My friend said that movie is interesting.' },
      { icon: '🏫', context: '身份介绍', contextEn: 'Introducing Someone', ko: '저 사람이 새로 온 선생님이라고 해요.', zh: '（有人）说那位是新来的老师。', zhEn: 'They say that person is the new teacher.' },
      { icon: '🌡️', context: '天气转述', contextEn: 'Reporting the Weather', ko: '뉴스에서 다음 주부터 춥다고 했어요.', zh: '新闻说下周开始变冷。', zhEn: 'The news says it\'ll get cold starting next week.' },
      { icon: '🍰', context: '过去经历', contextEn: 'Past Experiences', ko: '언니는 어제 케이크를 만들었다고 했어요.', zh: '姐姐说昨天做了蛋糕。', zhEn: 'My sister said she made a cake yesterday.' },
    ],
    mistakes: [
      { wrong: '민수가 학교에 가다고 해요.', correct: '민수가 학교에 간다고 해요.', note: '动词现在时无收音 → -ㄴ다고，不能直接 -다고。', noteEn: 'For verbs in present tense with no final consonant → use -ㄴ다고, not -다고 directly.' },
      { wrong: '언니가 밥을 먹다고 했어요.', correct: '언니가 밥을 먹는다고 했어요.', note: '动词现在时有收音 → -는다고，不能直接 -다고。', noteEn: 'For verbs in present tense with a final consonant → use -는다고, not -다고 directly.' },
      { wrong: '오늘 날씨가 춥는다고 해요.', correct: '오늘 날씨가 춥다고 해요.', note: '形容词不加 -는/-ㄴ，直接 -다고。', noteEn: 'Adjectives don\'t take -는/-ㄴ; use -다고 directly.' },
      { wrong: '저 사람이 학생다고 해요.', correct: '저 사람이 학생이라고 해요.', note: '名词用 -(이)라고 하다，不用 -다고。', noteEn: 'For nouns, use -(이)라고 하다, not -다고.' },
      { wrong: '민수가 학교에 가요고 했어요.', correct: '민수가 학교에 간다고 했어요.', note: '不能把原话的敬语 -요 塞进引用。转述时要先脱敬语回到平语 → 간다고。', noteEn: 'Don\'t include the polite -요 from the original quote. Drop it to plain form first → 간다고.' },
      { wrong: '언니가 케이크를 만들었는다고 했어요.', correct: '언니가 케이크를 만들었다고 했어요.', note: '过去时 -았/었 后直接 -다고，不再加 -는。', noteEn: 'After past tense -았/었, use -다고 directly, no -는.' },
    ],
    quickTable: {
      title: '陈述句间接引用总表', titleEn: 'Declarative Indirect Quotation Master Table',
      body: '按词类和时态选择正确形态。', bodyEn: 'Choose the correct form based on word type and tense.',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '현재·받침○', zh: '现在有收音', zhEn: 'Present with final consonant' }, '-는다고 하다', '먹는다고 해요'],
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '현재·받침×', zh: '现在无收音', zhEn: 'Present without final consonant' }, '-ㄴ다고 하다', '간다고 해요'],
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '과거', zh: '过去', zhEn: 'Past' }, '-았/었다고 하다', '갔다고 해요'],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-다고 하다', '춥다고 해요'],
        [{ ko: '명사', zh: '名词', zhEn: 'Noun' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-(이)라고 하다', '학생이라고 해요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '陈述句间接引用变形', titleEn: 'Declarative Indirect Quotation Transformations',
      body: '把直接引语改成间接引用。', bodyEn: 'Change direct speech to indirect speech.',
      questions: [
        {
          prompt: '"저는 한국에 가요." → 민수가 한국에 ___ 했어요.',
          options: ['가다고', '간다고', '가는다고', '갔다고'],
          answer: 1,
          explanation: '动词 가다 现在时无收音 → -ㄴ다고 → 간다고。', explanationEn: 'Verb 가다, present tense, no final consonant → -ㄴ다고 → 간다고.',
        },
        {
          prompt: '"저는 밥을 먹어요." → 언니가 밥을 ___ 했어요.',
          options: ['먹다고', '먹는다고', '먹은다고', '먹었다고'],
          answer: 1,
          explanation: '动词 먹다 现在时有收音 → -는다고 → 먹는다고。', explanationEn: 'Verb 먹다, present tense, with final consonant → -는다고 → 먹는다고.',
        },
        {
          prompt: '"이 옷은 예뻐요." → 친구가 이 옷이 ___ 했어요.',
          options: ['예쁘는다고', '예쁘ㄴ다고', '예쁘다고', '예쁜다고'],
          answer: 2,
          explanation: '形容词直接 -다고 → 예쁘다고。形容词不加 -는/-ㄴ。', explanationEn: 'Adjectives take -다고 directly → 예쁘다고. No -는/-ㄴ for adjectives.',
        },
        {
          prompt: '"저는 학생입니다." → 저 분이 ___ 했어요.',
          options: ['학생이다고', '학생다고', '학생이라고', '학생인다고'],
          answer: 2,
          explanation: '名词用 -(이)라고 하다 → 有收音 학생이라고。', explanationEn: 'Nouns use -(이)라고 하다 → with final consonant: 학생이라고.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l02', 'card-p25-l03', 'card-p25-l04'],
    step0Html: `<div class="hook-box">
  别人说过的话，我要转述给第三者——这就是<b style="color:#ff7fa8">间接引用</b>。<br>
  韩语的间接引用比中文严格：<b>动词/形容词/名词</b>各有自己的形态。<br>
  这一课先把陈述句的四种基本形态一次讲清。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div style="background:#fff0f5;padding:12px;border-radius:12px">
      <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">直接引用</div>
      <div style="font-size:14px;color:#241917">
        민수가 "학교에 가요." 하고 말했어요.<br>
        保留原话敬语级
      </div>
    </div>
    <div style="background:#eaf8f5;padding:12px;border-radius:12px">
      <div style="color:#2db89b;font-weight:700;margin-bottom:6px">间接引用</div>
      <div style="font-size:14px;color:#241917">
        민수가 학교에 <b>간다고</b> 했어요.<br>
        剥离敬语，动词加 -ㄴ다고
      </div>
    </div>
  </div>
</div>`,
    compareLabel: '直接引用 vs 间接引用', compareLabelEn: 'Direct vs Indirect Speech',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 1 课</div>
    <div class="ov-hero-title">陈述句间接引用</div>
    <div class="ov-hero-sub">"（某人）说……" 的四种基本形态</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在受音 → <b>-는다고 하다</b>：먹는다고<br>
        动词现在无收音 → <b>-ㄴ다고 하다</b>：간다고<br>
        动词过去 → <b>-았/었다고 하다</b>：갔다고<br>
        形容词 → <b>-다고 하다</b>：춥다고<br>
        名词 → <b>-(이)라고 하다</b>：학생이라고
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        민수가 학교에 간다고 해요.<br>
        언니가 한국 음식을 좋아한다고 해요.<br>
        저 사람이 한국 사람이라고 했어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가다고 / 먹다고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">간다고 / 먹는다고（动词加 ㄴ/는）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생다고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이라고（名词用 이라고）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第2课：-냐고 하다（间接疑问） ────────────────────────
  {
    id: 'card-p25-l02',
    partNumber: 25,
    lessonNumber: 2,
    title: '-냐고 하다',
    whatItDoes: '"（某人）问……"', whatItDoesEn: '"(Someone) asked..."',
    whatItDoesBody: '把别人的问句转述给第三者，用 -냐고 하다 / -느냐고 하다。\n"你要不要来？" → 그가 오냐고 물었어요.\n口语中动词和形容词都可直接用 -냐고，书面偏正规则再区分。', whatItDoesBodyEn: 'To relay someone\'s question to a third party, use -냐고 하다 / -느냐고 하다.\\n"Do you want to come?" → 그가 오냐고 물었어요.\\nIn speech, both verbs and adjectives can directly use -냐고; in writing, the formal rules distinguish further.',
    structureNote: '结构（口语通用）：\n动词/形容词现在 → -냐고 하다\n动词/形容词过去 → -았/었냐고 하다\n名词 → -(이)냐고 하다\n\n书面规则版：动词 -느냐고，形容词 -(으)냐고。', structureNoteEn: 'Structure (general spoken):\\nVerb/adjective present → -냐고 하다\\nVerb/adjective past → -았/었냐고 하다\\nNoun → -(이)냐고 하다\\n\\nFormal written version: verb -느냐고, adjective -(으)냐고.',
    rulesNote: '要点：\n1. 하다 可以换 물어보다 / 궁금해하다 表"问/好奇"\n2. 疑问词（뭐, 언제, 어디, 왜）可以夹在中间\n3. 简写：-냬（-냐고 해 → -냬）\n4. 名词后必须加 -(이)냐고，不用 -냐고', rulesNoteEn: 'Key points:\\n1. 하다 can be replaced with 물어보다 / 궁금해하다 to mean "ask/be curious"\\n2. Question words (뭐, 언제, 어디, 왜) can be inserted in between\\n3. Contraction: -냬 (-냐고 해 → -냬)\\n4. After nouns, you must add -(이)냐고, not -냐고',
    structures: [
      {
        ko: '민수가 어디에 가냐고 물었어요.',
        zh: '民秀问（我）去哪里。', zhEn: 'Minsu asked where I was going.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '어디에', role: 'place' },
          { text: '가냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '언니가 밥을 먹었냐고 해요.',
        zh: '姐姐问（我）吃饭没。', zhEn: 'My sister asked if I had eaten.',
        tokens: [
          { text: '언니가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹었냐고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 오늘 날씨가 어떠냐고 했어요.',
        zh: '朋友问今天天气怎么样。', zhEn: 'A friend asked how the weather is today.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '오늘', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '어떠냐고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '저 사람이 학생이냐고 물었어요.',
        zh: '（有人）问那位是不是学生。', zhEn: '(Someone) asked if that person is a student.',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '학생이냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '口语通用：动词/形容词现在 → -냐고 하다', textEn: 'Common in speech: verb/adjective present → -냐고 하다', examples: '가냐고 / 먹냐고 / 예쁘냐고' },
      { type: 'rule', text: '过去时 → -았/었냐고 하다', textEn: 'Past tense → -았/었냐고 하다', examples: '갔냐고 / 먹었냐고 / 예뻤냐고' },
      { type: 'rule', text: '名词 → -(이)냐고 하다', textEn: 'Noun → -(이)냐고 하다', examples: '학생이냐고 / 의사냐고' },
      { type: 'usage', text: '常配合疑问词：뭐/언제/어디/왜/누구/어떻게', textEn: 'Often used with question words: 뭐/언제/어디/왜/누구/어떻게', examples: '언제 가냐고 / 왜 안 오냐고' },
      { type: 'usage', text: '하다 可换 물어보다 / 궁금해하다', textEn: '하다 can be replaced with 물어보다 / 궁금해하다', examples: '어디 가냐고 물어봤어요 / 궁금해했어요' },
      { type: 'note', text: '书面正规版：动词 -느냐고，形容词 -(으)냐고', textEn: 'Formal written: verbs -느냐고, adjectives -(으)냐고', examples: '먹느냐고 / 예쁘냐고 / 좋으냐고' },
      { type: 'compare', text: '-냐고 vs -다고：-냐고 是问句，-다고 是陈述句', textEn: '-냐고 vs -다고: -냐고 is for questions, -다고 is for statements', examples: '오냐고 물었어요（问） / 온다고 했어요（陈述）', examplesEn: '오냐고 물었어요 (asking) / 온다고 했어요 (stating)' },
      { type: 'example', text: '简写 -냬：언제 오냬? / 왜 안 먹었냬?', textEn: 'Shortened form -냬: 언제 오냬? / 왜 안 먹었냬?' },
      { type: 'note', text: '中文没有的坑：转述问题时，中文的"吗/呢"在韩语里彻底消失。是非问（去不去）和特指问（去哪儿）都只靠 -냐고 这个结尾承担疑问语气，句中不再有任何"吗"的对应词。', textEn: 'A trap not in Chinese: when reporting questions, the Chinese "吗/呢" completely disappears in Korean. Both yes/no questions (whether to go) and wh-questions (where to go) rely solely on the -냐고 ending for the interrogative tone; there\'s no equivalent of "吗" in the sentence.', examples: '가냐고 물었어요（问去不去）/ 어디 가냐고 물었어요（问去哪儿）', examplesEn: '가냐고 물었어요 (asked whether to go) / 어디 가냐고 물었어요 (asked where to go)' },
      { type: 'compare', text: '别和 -는지 混：-냐고 하다 是"转述某人问了这个问题"；-는지 알다/모르다 是"（不）知道某事如何"（后面章节详学）。', textEn: 'Don\'t confuse with -는지: -냐고 하다 means "reporting that someone asked this question"; -는지 알다/모르다 means "(not) knowing how something is" (detailed in later chapters).', examples: '뭐 하냐고 물었어요（他问你在干嘛）/ 뭐 하는지 몰라요（不知道他在干嘛）', examplesEn: '뭐 하냐고 물었어요 (he asked what you\'re doing) / 뭐 하는지 몰라요 (don\'t know what he\'s doing)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '언제', role: 'time' },
          { text: '오냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '民秀问什么时候来。', zhEn: 'Minsu asked when (someone) is coming.',
        swapRole: 'verb',
        swapWords: ['오냐고', '가냐고', '만나냐고'],
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '밥', role: 'object' },
          { text: '먹었냐고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈问吃饭了没。', zhEn: 'Mom asked if (someone) had eaten.',
        swapRole: 'verb',
        swapWords: ['먹었냐고', '했냐고', '봤냐고'],
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '왜', role: 'plain' },
          { text: '늦었냐고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友问为什么迟到。', zhEn: 'A friend asked why (someone) was late.',
        swapRole: 'verb',
        swapWords: ['늦었냐고', '안 왔냐고', '못 갔냐고'],
      },
    ],
    scenarios: [
      { icon: '❓', context: '问计划', contextEn: 'Asking about plans', ko: '민수가 이번 주말에 뭐 하냐고 물었어요.', zh: '民秀问这周末做什么。', zhEn: 'Minsu asked what (someone) is doing this weekend.' },
      { icon: '🍚', context: '问饭', contextEn: 'Asking about meals', ko: '엄마가 밥 먹었냐고 하셨어요.', zh: '妈妈问吃饭了没。', zhEn: 'Mom asked if (someone) had eaten.' },
      { icon: '🌤️', context: '问天气', contextEn: 'Asking about weather', ko: '친구가 오늘 날씨가 어떠냐고 했어요.', zh: '朋友问今天天气怎么样。', zhEn: 'A friend asked how the weather is today.' },
      { icon: '💼', context: '问工作', contextEn: 'Asking about work', ko: '동료가 새로운 프로젝트가 힘드냐고 물었어요.', zh: '同事问新项目累不累。', zhEn: 'A coworker asked if the new project is tiring.' },
      { icon: '🏥', context: '问健康', contextEn: 'Asking about health', ko: '의사 선생님이 어디가 아프냐고 물으셨어요.', zh: '医生问哪里不舒服。', zhEn: 'The doctor asked where it hurt.' },
      { icon: '📱', context: '简写口语', contextEn: 'Abbreviated speech', ko: '뭐 하냬? 답장 좀 해.', zh: '（他）问你在干嘛，快回信。', zhEn: 'He\'s asking what you\'re doing—hurry and reply.' },
    ],
    mistakes: [
      { wrong: '민수가 어디에 가다고 물었어요.', correct: '민수가 어디에 가냐고 물었어요.', note: '疑问句用 -냐고，不能用 -다고 (那是陈述)。', noteEn: 'Use -냐고 for questions, not -다고 (that\'s for statements).' },
      { wrong: '엄마가 밥 먹었다고 물었어요.', correct: '엄마가 밥 먹었냐고 물었어요.', note: '"问……了没" 是疑问 → -았/었냐고。', noteEn: '"Asked if..." is a question → -았/었냐고.' },
      { wrong: '저 사람이 학생냐고 해요.', correct: '저 사람이 학생이냐고 해요.', note: '名词有收音时用 -이냐고。', noteEn: 'Use -이냐고 when the noun ends in a consonant.' },
      { wrong: '민수가 오는다고 물었어요.', correct: '민수가 오냐고 물었어요.', note: '疑问句直接用 -냐고，不加 -는/-ㄴ。', noteEn: 'For questions, use -냐고 directly without adding -는/-ㄴ.' },
    ],
    quickTable: {
      title: '疑问句间接引用总表', titleEn: 'Indirect Quotation Master Table for Questions',
      body: '口语通用版，学习者优先记这一列。', bodyEn: 'Common spoken form—learners should prioritize this column.',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-냐고 하다', '가냐고 / 먹냐고'],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-냐고 하다', '예쁘냐고 / 좋냐고'],
        [{ ko: '동사·형용사', zh: '动/形', zhEn: 'Verb/Adjective' }, { ko: '과거', zh: '过去', zhEn: 'Past' }, '-았/었냐고 하다', '갔냐고 / 예뻤냐고'],
        [{ ko: '명사', zh: '名词', zhEn: 'Noun' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-(이)냐고 하다', '학생이냐고 / 의사냐고'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '疑问句间接引用变形', titleEn: 'Indirect Quotation Transformations for Questions',
      body: '把直接问句改成间接疑问。', bodyEn: 'Change direct questions into indirect questions.',
      questions: [
        {
          prompt: '"언제 오세요?" → 민수가 언제 ___ 물었어요.',
          options: ['온다고', '오는다고', '오냐고', '오라고'],
          answer: 2,
          explanation: '"什么时候来?" 是疑问句 → -냐고 → 오냐고。', explanationEn: '"When are you coming?" is a question → -냐고 → 오냐고.',
        },
        {
          prompt: '"밥 먹었어?" → 엄마가 밥 ___ 하셨어요.',
          options: ['먹는다고', '먹었냐고', '먹었다고', '먹으라고'],
          answer: 1,
          explanation: '"吃饭没?" 是过去疑问 → -았/었냐고 → 먹었냐고。', explanationEn: '"Did you eat?" is a past question → -았/었냐고 → 먹었냐고.',
        },
        {
          prompt: '"학생입니까?" → 저 분이 ___ 물어봤어요.',
          options: ['학생이다고', '학생다고', '학생이냐고', '학생이라고'],
          answer: 2,
          explanation: '名词疑问 → -이냐고 → 학생이냐고。학생이라고 是陈述"（说）是学生"。', explanationEn: 'Noun question → -이냐고 → 학생이냐고. 학생이라고 is the statement "(says) is a student."',
        },
        {
          prompt: '"오늘 날씨가 어때요?" → 친구가 오늘 날씨가 ___ 했어요.',
          options: ['어떻다고', '어떠냐고', '어떠다고', '어떻는다고'],
          answer: 1,
          explanation: '"怎么样?" 是形容词疑问 → 어떠냐고。', explanationEn: '"How is it?" is an adjective question → 어떠냐고.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l03', 'card-p25-l04'],
    step0Html: `<div class="hook-box">
  别人问过的话要传给第三者？<br>
  用 <b style="color:#ff7fa8">-냐고 하다</b>：<br>
  "언제 와?" → 그가 언제 <b>오냐고</b> 물었어요.
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-다고 vs -냐고</div>
    <div style="font-size:14px;color:#241917">
      민수가 온다고 했어요.（<b>陈述</b>："民秀说会来"）<br>
      민수가 오냐고 물었어요.（<b>疑问</b>："民秀问要不要来"）
    </div>
  </div>
</div>`,
    compareLabel: '-다고 vs -냐고',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 2 课</div>
    <div class="ov-hero-title">-냐고 하다</div>
    <div class="ov-hero-sub">"（某人）问……" · 疑问句间接引用</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词现在 → <b>-냐고 하다</b>：가냐고 / 예쁘냐고<br>
        过去 → <b>-았/었냐고 하다</b>：갔냐고 / 예뻤냐고<br>
        名词 → <b>-(이)냐고 하다</b>：학생이냐고<br>
        하다 可换 물어보다 / 궁금해하다
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        민수가 어디에 가냐고 물었어요.<br>
        엄마가 밥 먹었냐고 하셨어요.<br>
        저 사람이 학생이냐고 물었어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가다고 물었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가냐고 물었어요（疑问用 냐고）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생냐고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이냐고（名词加 이냐고）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第3课：-자고 하다（间接建议） ─────────────────────────
  {
    id: 'card-p25-l03',
    partNumber: 25,
    lessonNumber: 3,
    title: '-자고 하다',
    whatItDoes: '"（某人）提议一起……"', whatItDoesEn: '"(Someone) suggests doing something together..."',
    whatItDoesBody: '把别人的"我们一起……吧"这种共动/建议句转述给第三者，用 -자고 하다。\n"같이 밥 먹자." → 친구가 같이 밥 먹자고 했어요.\n只接动词，不接形容词或名词。', whatItDoesBodyEn: 'To relay someone\'s suggestion like "Let\'s..." to a third party, use -자고 하다.\\n"같이 밥 먹자." → 친구가 같이 밥 먹자고 했어요.\\nOnly attaches to verbs, not adjectives or nouns.',
    structureNote: '结构：\n动词现在 → -자고 하다\n否定 → -지 말자고 하다\n名词 × / 形容词 × （不能用）\n\n하다 可换 제안하다 / 권하다。', structureNoteEn: 'Structure:\\nVerb present → -자고 하다\\nNegative → -지 말자고 하다\\nNouns × / Adjectives × (not used)\\n\\n하다 can be replaced with 제안하다 / 권하다.',
    rulesNote: '要点：\n1. 只接动词，且必须是共同动作（一起做的动作）\n2. 说话人和听话人都可以是执行者\n3. 否定用 -지 말자고 하다（"我们不要……吧"）\n4. 简写：-쟤（-자고 해 → -쟤）', rulesNoteEn: 'Key points:\\n1. Only attaches to verbs, and the action must be shared (done together)\\n2. Both the speaker and listener can be the doers\\n3. Negative uses -지 말자고 하다 ("let\'s not...")\\n4. Shortened form: -쟤 (-자고 해 → -쟤)',
    structures: [
      {
        ko: '친구가 같이 영화 보자고 했어요.',
        zh: '朋友说一起看电影吧。', zhEn: 'A friend suggested watching a movie together.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '영화', role: 'object' },
          { text: '보자고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '동생이 오늘은 밖에 나가지 말자고 해요.',
        zh: '弟弟说今天不要出门了。', zhEn: 'My younger brother said not to go out today.',
        tokens: [
          { text: '동생이', role: 'subject' },
          { text: '오늘은', role: 'time' },
          { text: '밖에', role: 'place' },
          { text: '나가지 말자고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 주말에 놀러 가자고 제안했어요.',
        zh: '民秀提议周末去玩。', zhEn: 'Min-su suggested going out this weekend.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '주말에', role: 'time' },
          { text: '놀러', role: 'plain' },
          { text: '가자고', role: 'verb' },
          { text: '제안했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + 자고 하다 → "（某人提议）一起……"', textEn: 'Verb + 자고 하다 → "(someone) suggests doing... together"', examples: '가자고 / 먹자고 / 만나자고' },
      { type: 'rule', text: '否定：-지 말자고 하다', textEn: 'Negative: -지 말자고 하다', examples: '가지 말자고 / 먹지 말자고' },
      { type: 'rule', text: '只接动词，不能接形容词/名词', textEn: 'Only attaches to verbs, not adjectives or nouns', examples: '× 예쁘자고 / × 학생자고' },
      { type: 'usage', text: '前后主语通常是"我们"（我和听话人）', textEn: 'The subject is usually "we" (the speaker and listener)', examples: '같이 가자고 / 우리 만나자고' },
      { type: 'usage', text: '하다 可换 제안하다 / 권하다 / 얘기하다', textEn: '하다 can be replaced with 제안하다 / 권하다 / 얘기하다', examples: '가자고 제안했어요 / 만나자고 얘기했어요' },
      { type: 'note', text: '简写 -쟤：같이 가쟤! / 놀러 가쟤!', textEn: 'Abbreviated -쟤: 같이 가쟤! / 놀러 가쟤!', examples: '민수가 같이 밥 먹쟤' },
      { type: 'compare', text: '-자고 vs -(으)라고：-자고 是共动"一起"；-(으)라고 是命令"你去做"', textEn: '-자고 vs -(으)라고: -자고 is suggestive "let\'s do together"; -(으)라고 is a command "you go do it"', examples: '같이 가자고（一起）vs 가라고（你去）', examplesEn: '같이 가자고 (together) vs 가라고 (you go)' },
      { type: 'example', text: '친구가 같이 커피 마시자고 했어요 / 오늘은 놀지 말자고 해요' },
      { type: 'note', text: '原话不管用哪种"提议"说法，转述时全部收拢成 -자고。像 하자 / 할까요? / 합시다 / 할래요? 这些不同的原句，间接引用都变同一个 -자고，学习者不用记原句是哪种。', textEn: 'No matter which "suggestion" form the original speech uses, it all condenses into -자고 when reported. Different originals like 하자 / 할까요? / 합시다 / 할래요? all become the same -자고 in indirect speech, so learners don\'t need to remember which form the original was.', examples: '갈까요? → 가자고 / 갑시다 → 가자고 / 갈래요? → 가자고' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '주말에', role: 'time' },
          { text: '만나자고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友说周末见面吧。', zhEn: 'A friend said let\'s meet on the weekend.',
        swapRole: 'verb',
        swapWords: ['만나자고', '놀자고', '가자고'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '오늘', role: 'time' },
          { text: '나가지 말자고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
        zh: '民秀说今天别出门了。', zhEn: 'Minsu said don\'t go out today.',
        swapRole: 'verb',
        swapWords: ['나가지 말자고', '놀지 말자고', '가지 말자고'],
      },
      {
        wordBlocks: [
          { text: '언니가', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배우자고', role: 'verb' },
          { text: '제안했어요', role: 'verb' },
        ],
        zh: '姐姐提议一起学韩语。', zhEn: 'My sister suggested studying Korean together.',
        swapRole: 'verb',
        swapWords: ['배우자고', '공부하자고', '연습하자고'],
      },
    ],
    scenarios: [
      { icon: '🎬', context: '约看电影', contextEn: 'Suggest watching a movie', ko: '친구가 이번 주말에 영화 보자고 했어요.', zh: '朋友说这周末看电影吧。', zhEn: 'A friend said let\'s watch a movie this weekend.' },
      { icon: '☕', context: '约喝咖啡', contextEn: 'Suggest getting coffee', ko: '민수가 카페에서 만나자고 해요.', zh: '民秀说在咖啡馆见面吧。', zhEn: 'Minsu said let\'s meet at the café.' },
      { icon: '🚫', context: '否定提议', contextEn: 'Negative suggestion', ko: '엄마가 오늘은 외식하지 말자고 하셨어요.', zh: '妈妈说今天别在外面吃了。', zhEn: 'Mom said don\'t eat out today.' },
      { icon: '📚', context: '共同学习', contextEn: 'Studying together', ko: '언니가 같이 도서관 가자고 제안했어요.', zh: '姐姐提议一起去图书馆。', zhEn: 'My sister suggested going to the library together.' },
      { icon: '🏃', context: '一起运动', contextEn: 'Exercising together', ko: '동료가 점심시간에 걷자고 해요.', zh: '同事说午休时间一起走走吧。', zhEn: 'A coworker said let\'s take a walk during lunch break.' },
      { icon: '💬', context: '口语简写', contextEn: 'Spoken abbreviation', ko: '민수가 밥 먹쟤!', zh: '民秀说一起吃饭！', zhEn: 'Minsu said let\'s eat together!' },
    ],
    mistakes: [
      { wrong: '친구가 영화 봐자고 했어요.', correct: '친구가 영화 보자고 했어요.', note: '直接接动词词干 + -자고，不用 -어자고。', noteEn: 'Attach -자고 directly to the verb stem, not -어자고.' },
      { wrong: '민수가 예쁘자고 했어요.', correct: '민수가 예쁘다고 했어요.', note: '-자고 只接动词，不接形容词。若表"说漂亮"用 -다고。', noteEn: '-자고 only attaches to verbs, not adjectives. To say "said (something) is pretty," use -다고.' },
      { wrong: '오늘은 안 가자고 해요.', correct: '오늘은 가지 말자고 해요.', note: '共动的否定用 -지 말자고，不是 안 -자고。', noteEn: 'The negative of a suggestion uses -지 말자고, not 안 -자고.' },
      { wrong: '민수가 학생자고 했어요.', correct: '민수가 학생이라고 했어요.', note: '-자고 不接名词。名词陈述用 -(이)라고。', noteEn: '-자고 doesn\'t attach to nouns. For noun statements, use -(이)라고.' },
    ],
    quickTable: {
      title: '共动/建议句间接引用', titleEn: 'Indirect Quotation for Suggestive Sentences',
      body: '只接动词。', bodyEn: 'Only attaches to verbs.',
      headers: ['形式', '否定', '例', '说明'],
      rows: [
        ['-자고 하다', '-지 말자고 하다', '가자고 / 가지 말자고', '共动·一起'],
        ['×形容词', '×', '× 예쁘자고', '不接形容词'],
        ['×名词', '×', '× 학생자고', '不接名词'],
        ['하다 可换', '', '제안하다 / 권하다 / 얘기하다', '语气自由'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '共动句间接引用变形', titleEn: 'Indirect Quotation Transformations for Suggestive Sentences',
      body: '把提议句改成间接引用。', bodyEn: 'Change the suggestion into indirect speech.',
      questions: [
        {
          prompt: '"같이 밥 먹자." → 친구가 같이 밥 ___ 했어요.',
          options: ['먹다고', '먹는다고', '먹자고', '먹으라고'],
          answer: 2,
          explanation: '"我们一起吃饭吧" 是共动 → -자고。먹다 → 먹자고。', explanationEn: '"Let\'s eat together" is a suggestion → -자고. 먹다 → 먹자고.',
        },
        {
          prompt: '"오늘은 나가지 말자." → 엄마가 오늘은 ___ 하셨어요.',
          options: ['나가지 말자고', '안 나가자고', '나가지 말라고', '나가지 않자고'],
          answer: 0,
          explanation: '共动否定用 -지 말자고 → 나가지 말자고。', explanationEn: 'The negative of a suggestion uses -지 말자고 → 나가지 말자고.',
        },
        {
          prompt: '哪句语法错？', promptEn: 'Which sentence has a grammar error?',
          options: [
            '친구가 같이 가자고 했어요.',
            '민수가 놀러 가자고 제안했어요.',
            '엄마가 예쁘자고 하셨어요.',
            '언니가 만나자고 해요.',
          ],
          answer: 2,
          explanation: '-자고 只接动词，"예쁘다" 是形容词 → 错。', explanationEn: '-자고 only attaches to verbs; "예쁘다" is an adjective → incorrect.',
        },
        {
          prompt: '"우리 공부하자." → 언니가 같이 ___ 해요.',
          options: ['공부한다고', '공부하냐고', '공부하자고', '공부하라고'],
          answer: 2,
          explanation: '"我们一起学吧" 共动 → -자고 → 공부하자고。', explanationEn: '"Let\'s study together" suggestion → -자고 → 공부하자고.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l02', 'card-p25-l04'],
    step0Html: `<div class="hook-box">
  "우리 같이 밥 먹자!" —— 别人的提议要转达？<br>
  用 <b style="color:#ff7fa8">-자고 하다</b>：<br>
  친구가 같이 밥 <b>먹자고</b> 했어요.
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-자고 vs -(으)라고</div>
    <div style="font-size:14px;color:#241917">
      민수가 같이 <b>가자고</b> 했어요.（<b>一起去</b>·共动）<br>
      민수가 나한테 <b>가라고</b> 했어요.（<b>你去</b>·命令）
    </div>
  </div>
</div>`,
    compareLabel: '-자고 vs -(으)라고',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 3 课</div>
    <div class="ov-hero-title">-자고 하다</div>
    <div class="ov-hero-sub">"（某人）提议一起……" · 共动句</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-자고 하다</b>：가자고 / 먹자고<br>
        否定 → <b>-지 말자고 하다</b>：가지 말자고<br>
        不接形容词、不接名词<br>
        하다 可换 제안하다 / 권하다
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        친구가 같이 영화 보자고 했어요.<br>
        엄마가 오늘은 나가지 말자고 하셨어요.<br>
        민수가 놀러 가자고 제안했어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁘자고 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">-자고 只接动词</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">안 가자고 해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가지 말자고（共动否定专用）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第4课：-(으)라고 하다（间接命令） ─────────────────────
  {
    id: 'card-p25-l04',
    partNumber: 25,
    lessonNumber: 4,
    title: '-(으)라고 하다',
    whatItDoes: '"（某人）叫别人做……"', whatItDoesEn: '"(Someone) tells someone to do..."',
    whatItDoesBody: '把命令句"你去做！"转述给第三者，用 -(으)라고 하다。\n"빨리 와!" → 엄마가 빨리 오라고 하셨어요.\n只接动词，且执行者是听话人（不是说话人自己）。', whatItDoesBodyEn: 'To relay a command like "Do it!" to a third party, use -(으)라고 하다.\\n"빨리 와!" → 엄마가 빨리 오라고 하셨어요.\\nOnly attaches to verbs, and the doer is the listener (not the speaker).',
    structureNote: '结构：\n动词有收音 → -으라고 하다\n动词无收音 → -라고 하다\n否定 → -지 말라고 하다\n\n名词 × / 形容词 × （命令不接名词、形容词）', structureNoteEn: 'Structure:\\nVerb with final consonant → -으라고 하다\\nVerb without final consonant → -라고 하다\\nNegative → -지 말라고 하다\\n\\nNouns × / Adjectives × (commands don\'t take nouns or adjectives)',
    rulesNote: '要点：\n1. 只接动词，执行者是听话人\n2. 有收音加 -으라고，无收音加 -라고\n3. 否定 -지 말라고 하다 ("别做")\n4. 特殊动词 주다 → 달라고 하다（要求给自己）/ 주라고 하다（要求给别人）', rulesNoteEn: 'Key points:\\n1. Only attaches to verbs, and the doer is the listener\\n2. Add -으라고 with final consonant, -라고 without\\n3. Negative -지 말라고 하다 ("don\'t do")\\n4. Special verb 주다 → 달라고 하다 (asking for oneself) / 주라고 하다 (asking for someone else)',
    structures: [
      {
        ko: '엄마가 빨리 오라고 하셨어요.',
        zh: '妈妈叫（我）快点回来。', zhEn: 'Mom told (me) to come back quickly.',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리', role: 'plain' },
          { text: '오라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 숙제를 하라고 하셨어요.',
        zh: '老师叫（我们）做作业。', zhEn: 'The teacher told (us) to do homework.',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '숙제를', role: 'object' },
          { text: '하라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '의사 선생님이 매일 운동하라고 했어요.',
        zh: '医生叫（我）每天运动。', zhEn: 'The doctor told (me) to exercise every day.',
        tokens: [
          { text: '의사', role: 'subject' },
          { text: '선생님이', role: 'subject' },
          { text: '매일', role: 'time' },
          { text: '운동하라고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 밥을 남기지 말라고 하셨어요.',
        zh: '妈妈叫（我）别剩饭。', zhEn: 'Mom told (me) not to leave food.',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '남기지 말라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词无收音 → -라고 하다', textEn: 'Verb without batchim → -라고 하다', examples: '가다 → 가라고 / 오다 → 오라고' },
      { type: 'rule', text: '动词有收音 → -으라고 하다', textEn: 'Verb with batchim → -으라고 하다', examples: '먹다 → 먹으라고 / 읽다 → 읽으라고' },
      { type: 'rule', text: '否定 → -지 말라고 하다', textEn: 'Negative → -지 말라고 하다', examples: '가지 말라고 / 먹지 말라고 / 남기지 말라고' },
      { type: 'rule', text: '不接形容词/名词（命令句语义限制）', textEn: 'Not used with adjectives/nouns (command sentence semantic restriction)', examples: '× 예쁘라고 / × 학생이라고 하다（这个是陈述）', examplesEn: '× 예쁘라고 / × 학생이라고 하다 (this is a statement)' },
      { type: 'usage', text: '주다 特殊变形：向自己讨用 달라고 / 向他人讨用 주라고', textEn: '주다 special form: ask for oneself 달라고 / ask for others 주라고', examples: '내게 달라고 했어요 / 민수한테 주라고 했어요' },
      { type: 'note', text: '简写：-래 (-라고 해 → -래)', textEn: 'Abbreviation: -래 (-라고 해 → -래)', examples: '빨리 오래! / 숙제 하래!' },
      { type: 'compare', text: '-(으)라고 vs -자고：命令(听话人做) vs 共动(一起做)', textEn: '-(으)라고 vs -자고: command (listener does) vs suggestion (do together)', examples: '가라고（你去）vs 가자고（一起去）', examplesEn: '가라고 (you go) vs 가자고 (let\'s go together)' },
      { type: 'example', text: '엄마가 빨리 오라고 하셨어요 / 조용히 하라고 했어요' },
      { type: 'note', text: '负迁移警告：中文的"让/叫"有两种意思，只有"吩咐某人做某动作"这一种对应 -(으)라고。表"使／致使"（这首歌让我开心）的"让"不能用 -(으)라고，那要用 -게 하다／-게 만들다（后面章节详学）。', textEn: 'Negative transfer warning: Chinese "让/叫" has two meanings, only "instructing someone to do an action" corresponds to -(으)라고. The "让" meaning "cause/make" (this song makes me happy) cannot use -(으)라고, use -게 하다／-게 만들다 instead (detailed in later chapters).', examples: '엄마가 청소하라고 했어요（吩咐→라고）/ 이 노래가 나를 기쁘게 해요（致使→게 하다）', examplesEn: '엄마가 청소하라고 했어요 (instruct →라고) / 이 노래가 나를 기쁘게 해요 (cause →게 하다)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리', role: 'plain' },
          { text: '자라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈叫（我）快去睡。', zhEn: 'Mom told (me) to go to sleep quickly.',
        swapRole: 'verb',
        swapWords: ['자라고', '오라고', '가라고'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '책을', role: 'object' },
          { text: '읽으라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '老师叫（我们）读书。', zhEn: 'The teacher told (us) to read.',
        swapRole: 'verb',
        swapWords: ['읽으라고', '배우라고', '외우라고'],
      },
      {
        wordBlocks: [
          { text: '의사가', role: 'subject' },
          { text: '술을', role: 'object' },
          { text: '마시지 말라고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '医生叫（我）别喝酒。', zhEn: 'The doctor told (me) not to drink alcohol.',
        swapRole: 'verb',
        swapWords: ['마시지 말라고', '먹지 말라고', '피우지 말라고'],
      },
    ],
    scenarios: [
      { icon: '⏰', context: '妈妈催促', contextEn: 'Mom urging', ko: '엄마가 빨리 일어나라고 하셨어요.', zh: '妈妈叫快点起床。', zhEn: 'Mom told (me) to get up quickly.' },
      { icon: '📖', context: '老师布置', contextEn: 'Teacher assigning', ko: '선생님이 책을 미리 읽으라고 하셨어요.', zh: '老师让（我们）提前读书。', zhEn: 'The teacher told (us) to read in advance.' },
      { icon: '🏥', context: '医嘱', contextEn: 'Doctor\'s orders', ko: '의사 선생님이 술을 마시지 말라고 했어요.', zh: '医生叫我戒酒。', zhEn: 'The doctor told me to quit drinking.' },
      { icon: '🚫', context: '禁止', contextEn: 'Prohibition', ko: '아빠가 늦게 자지 말라고 하셨어요.', zh: '爸爸叫我别晚睡。', zhEn: 'Dad told me not to stay up late.' },
      { icon: '💬', context: '简写', contextEn: 'Abbreviation', ko: '엄마가 밥 먹으래!', zh: '妈妈叫吃饭啦！', zhEn: 'Mom says it\'s time to eat!' },
      { icon: '🎁', context: '要东西', contextEn: 'Asking for something', ko: '동생이 새 옷을 사 달라고 했어요.', zh: '弟弟让（我）买件新衣服（给他自己）。', zhEn: 'My younger brother asked me to buy him new clothes.' },
    ],
    mistakes: [
      { wrong: '엄마가 빨리 오다고 하셨어요.', correct: '엄마가 빨리 오라고 하셨어요.', note: '命令句用 -(으)라고，오다 无收音 → 오라고。-다고 是陈述。', noteEn: 'For commands, use -(으)라고. 오다 has no batchim → 오라고. -다고 is for statements.' },
      { wrong: '선생님이 책을 읽라고 하셨어요.', correct: '선생님이 책을 읽으라고 하셨어요.', note: '읽다 有收音 → -으라고 → 읽으라고。', noteEn: '읽다 has a batchim → -으라고 → 읽으라고.' },
      { wrong: '엄마가 밥을 안 남기라고 하셨어요.', correct: '엄마가 밥을 남기지 말라고 하셨어요.', note: '命令否定用 -지 말라고 하다。', noteEn: 'For negative commands, use -지 말라고 하다.' },
      { wrong: '민수가 볼펜을 주라고 했어요.', correct: '민수가 볼펜을 달라고 했어요.', note: '"要给自己"用 달라고 하다；"要给他人"才用 주라고 하다。', noteEn: 'Use 달라고 하다 when asking for oneself; use 주라고 하다 when asking for someone else.' },
    ],
    quickTable: {
      title: '命令句间接引用', titleEn: 'Indirect Quotation for Imperative Sentences',
      body: '只接动词，执行者是听话人。', bodyEn: 'Only attaches to verbs; the doer is the listener.',
      headers: ['前项', '形式', '否定', '例'],
      rows: [
        [{ ko: '동사·받침×', zh: '动词无收音', zhEn: 'Verb without batchim' }, '-라고 하다', '-지 말라고 하다', '오라고 / 오지 말라고'],
        [{ ko: '동사·받침○', zh: '动词有收音', zhEn: 'Verb with batchim' }, '-으라고 하다', '-지 말라고 하다', '읽으라고 / 읽지 말라고'],
        [{ ko: '주다·자기', zh: '要给自己', zhEn: 'Asking for oneself' }, '달라고 하다', '주지 말라고', '나한테 달라고'],
        [{ ko: '주다·타인', zh: '要给他人', zhEn: 'Asking for someone else' }, '주라고 하다', '주지 말라고', '민수한테 주라고'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '命令句间接引用变形', titleEn: 'Indirect Quotation Transformations for Imperative Sentences',
      body: '把命令句改成间接引用。', bodyEn: 'Change the command into indirect speech.',
      questions: [
        {
          prompt: '"빨리 와!" → 엄마가 빨리 ___ 하셨어요.',
          options: ['온다고', '오냐고', '오라고', '오자고'],
          answer: 2,
          explanation: '命令句 → -(으)라고 하다。오다 无收音 → 오라고。', explanationEn: 'Commands → -(으)라고 하다. 오다 has no batchim → 오라고.',
        },
        {
          prompt: '"책을 읽어라." → 선생님이 책을 ___ 하셨어요.',
          options: ['읽는다고', '읽으라고', '읽라고', '읽자고'],
          answer: 1,
          explanation: '읽다 有收音 → -으라고 → 읽으라고。', explanationEn: '읽다 has a batchim → -으라고 → 읽으라고.',
        },
        {
          prompt: '"술 마시지 마." → 의사가 술을 ___ 했어요.',
          options: ['안 마시라고', '마시지 마라고', '마시지 말라고', '마시지 못하라고'],
          answer: 2,
          explanation: '命令否定用 -지 말라고 하다 → 마시지 말라고。', explanationEn: 'For negative commands, use -지 말라고 하다 → 마시지 말라고.',
        },
        {
          prompt: '"저한테 그거 좀 주세요." → 민수가 나에게 그것을 ___ 했어요.',
          options: ['주라고', '달라고', '드리라고', '가지라고'],
          answer: 1,
          explanation: '"要给自己（说话人）"用 달라고 하다，不用 주라고。', explanationEn: 'Use 달라고 하다 when asking for oneself (the speaker), not 주라고.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l02', 'card-p25-l03'],
    step0Html: `<div class="hook-box">
  "빨리 와!" —— 别人的命令要转达？<br>
  用 <b style="color:#ff7fa8">-(으)라고 하다</b>：<br>
  엄마가 빨리 <b>오라고</b> 하셨어요.
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-(으)라고 vs -자고</div>
    <div style="font-size:14px;color:#241917">
      엄마가 <b>오라고</b> 했어요.（<b>叫你来</b>·命令）<br>
      친구가 같이 <b>가자고</b> 했어요.（<b>一起去</b>·共动）
    </div>
  </div>
</div>`,
    compareLabel: '-(으)라고 vs -자고',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 4 课</div>
    <div class="ov-hero-title">-(으)라고 하다</div>
    <div class="ov-hero-sub">"（某人）叫别人做……" · 命令句</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词无收音 → <b>-라고 하다</b>：오라고<br>
        动词有收音 → <b>-으라고 하다</b>：읽으라고<br>
        否定 → <b>-지 말라고 하다</b>：가지 말라고<br>
        向自己讨用 <b>달라고 하다</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        엄마가 빨리 오라고 하셨어요.<br>
        선생님이 책을 읽으라고 하셨어요.<br>
        의사가 술을 마시지 말라고 했어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">읽라고 / 안 오라고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">읽으라고 / 오지 말라고</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">나한테 주라고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">나한테 달라고（给自己用 달라고）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第5课：-다고 해서 / -는다길래 ────────────────────────
  {
    id: 'card-p25-l05',
    partNumber: 25,
    lessonNumber: 5,
    title: '-다고 해서 / -는다길래',
    whatItDoes: '"听说……所以……"', whatItDoesEn: '"Heard that... so..."',
    whatItDoesBody: '别人说的话成为"我做某事"的依据，用 -다고 해서 或 -는다길래。\n"听说那家咖啡有名，所以我去了"。\n-다고 해서 中性通用，-는다길래 口语生动。', whatItDoesBodyEn: 'When someone\'s words become the reason for "my action," use -다고 해서 or -는다길래.\\n"Heard that cafe is famous, so I went."\\n-다고 해서 is neutral and general; -는다길래 is vivid and colloquial.',
    structureNote: '结构：\n动词现在 → -는다고 해서 / -는다길래（无收音 -ㄴ다길래）\n动词过去 → -았/었다고 해서 / -았/었다길래\n形容词 → -다고 해서 / -다길래\n名词 → -(이)라고 해서 / -(이)라길래', structureNoteEn: 'Structure:\\nVerb present → -는다고 해서 / -는다길래 (without final consonant -ㄴ다길래)\\nVerb past → -았/었다고 해서 / -았/었다길래\\nAdjective → -다고 해서 / -다길래\\nNoun → -(이)라고 해서 / -(이)라길래',
    rulesNote: '要点：\n1. 前项是"听/得知"的内容，后项是自己的反应\n2. -다고 해서：书面·中性；-는다길래：口语·带感情\n3. -는다길래 前后主语必须不同（听说的和做的不是同一人）\n4. 后半常表意外/理由/反应', rulesNoteEn: 'Key points:\\n1. The first part is what was "heard/learned," the second is your reaction\\n2. -다고 해서: written, neutral; -는다길래: colloquial, emotional\\n3. With -는다길래, the subjects before and after must differ (the one who heard and the one who acts are not the same)\\n4. The second part often expresses surprise/reason/reaction',
    structures: [
      {
        ko: '민수가 온다고 해서 기다렸어요.',
        zh: '听说民秀要来，我就等了。', zhEn: 'I heard Minsu was coming, so I waited.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '온다고 해서', role: 'verb' },
          { text: '기다렸어요', role: 'verb' },
        ],
      },
      {
        ko: '그 카페가 유명하다길래 가 봤어요.',
        zh: '听说那家咖啡馆有名，就去看了看。', zhEn: 'I heard that café is famous, so I went to check it out.',
        tokens: [
          { text: '그 카페가', role: 'subject' },
          { text: '유명하다길래', role: 'verb' },
          { text: '가 봤어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 비 온다길래 우산을 챙겼어요.',
        zh: '听说今天下雨，就带了伞。', zhEn: 'I heard it would rain today, so I brought an umbrella.',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '비', role: 'subject' },
          { text: '온다길래', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '陈述内容 + 해서/길래 表"听说……所以……"', textEn: 'Statement + 해서/길래 to mean "heard that... so..."', examples: '온다고 해서 / 온다길래' },
      { type: 'rule', text: '动词现在 → -는다고/ㄴ다고 해서 / -는다길래/ㄴ다길래', textEn: 'Present tense verbs → -는다고/ㄴ다고 해서 / -는다길래/ㄴ다길래', examples: '먹는다고 해서 / 간다길래' },
      { type: 'rule', text: '形容词 → -다고 해서 / -다길래', textEn: 'Adjectives → -다고 해서 / -다길래', examples: '유명하다고 해서 / 춥다길래' },
      { type: 'rule', text: '名词 → -(이)라고 해서 / -(이)라길래', textEn: 'Nouns → -(이)라고 해서 / -(이)라길래', examples: '학생이라고 해서 / 의사라길래' },
      { type: 'usage', text: '-는다길래 是口语，带一丝"我因为听了才做"的私人感', textEn: '-는다길래 is colloquial, with a hint of "I did it because I heard" personal nuance.', examples: '맛있다길래 사 봤어요（听说好吃就买来尝了尝。）', examplesEn: '맛있다길래 사 봤어요 (Heard it was tasty, so I bought and tried it.)' },
      { type: 'note', text: '-는다길래 前后主语要不同', textEn: 'The subject before and after -는다길래 must be different.', examples: '민수가 온다길래 (내가) 기다렸어요 ✓ / (내가) 간다길래 갔어요 ✗' },
      { type: 'compare', text: '-다고 해서 vs -기 때문에：前者是"因听说"，后者是"直接原因"', textEn: '-다고 해서 vs -기 때문에: the former means "because I heard," the latter is a direct cause.', examples: '온다고 해서 기다렸어요 / 왔기 때문에 기다렸어요' },
      { type: 'example', text: '뉴스에서 비 온다고 해서 우산 챙겼어요 / 맛있다길래 시켰어요' },
      { type: 'compare', text: '-길래 是口语；同义的 -기에 是书面/正式说法，意思一样', textEn: '-길래 is colloquial; the synonymous -기에 is written/formal, same meaning.', examples: '비가 온다길래 우산을 챙겼어요（口语）/ 비가 온다기에 우산을 챙겼다（书面）', examplesEn: '비가 온다길래 우산을 챙겼어요 (colloquial) / 비가 온다기에 우산을 챙겼다 (written)' },
      { type: 'note', text: '-다고 (해서) 还有一个高频用法：否定「只凭这个理由」，译作"并不是……就……"，不是转述', textEn: '-다고 (해서) also has a common usage: negating "just because of this reason," translated as "not necessarily... just because," not a quote.', examples: '비싸다고 다 좋은 것은 아니에요.（并不是贵就都好。）', examplesEn: '비싸다고 다 좋은 것은 아니에요. (Just because it\'s expensive doesn\'t mean it\'s all good.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '온다고 해서', role: 'verb' },
          { text: '기다렸어요', role: 'verb' },
        ],
        zh: '听说民秀要来，就等了。', zhEn: 'Heard Min-su was coming, so I waited.',
        swapRole: 'verb',
        swapWords: ['온다고 해서', '온다길래', '오신다고 해서'],
      },
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '예쁘다길래', role: 'verb' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '听说这件衣服漂亮，就买了。', zhEn: 'Heard this outfit was pretty, so I bought it.',
        swapRole: 'verb',
        swapWords: ['예쁘다길래', '싸다길래', '유행이라길래'],
      },
      {
        wordBlocks: [
          { text: '뉴스에서', role: 'place' },
          { text: '비가', role: 'subject' },
          { text: '온다고 해서', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '가져왔어요', role: 'verb' },
        ],
        zh: '新闻说要下雨，就带了伞。', zhEn: 'The news said it would rain, so I brought an umbrella.',
        swapRole: 'verb',
        swapWords: ['온다고 해서', '내린다고 해서', '쏟아진다고 해서'],
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气预报', contextEn: 'Weather forecast', ko: '뉴스에서 비 온다고 해서 우산 챙겼어요.', zh: '新闻说下雨，就带了伞。', zhEn: 'The news said it was raining, so I brought an umbrella.' },
      { icon: '☕', context: '朋友推荐', contextEn: 'Friend\'s recommendation', ko: '그 카페가 유명하다길래 가 봤어요.', zh: '听说那家咖啡有名就去看了。', zhEn: 'Heard that café was famous, so I went to check it out.' },
      { icon: '📱', context: '网评好评', contextEn: 'Good online reviews', ko: '이 이어폰이 좋다고 해서 샀어요.', zh: '听说这耳机好，就买了。', zhEn: 'Heard these earphones were good, so I bought them.' },
      { icon: '🚫', context: '为避坑', contextEn: 'To avoid pitfalls', ko: '길이 막힌다길래 지하철로 왔어요.', zh: '听说堵车，就坐地铁来了。', zhEn: 'Heard there was traffic, so I took the subway.' },
      { icon: '🎬', context: '看电影原因', contextEn: 'Reason for watching a movie', ko: '재미있다고 해서 봤는데 별로였어요.', zh: '听说好看去看了但一般。', zhEn: 'Heard it was good, went to see it, but it was just okay.' },
      { icon: '📞', context: '得知消息', contextEn: 'Getting the news', ko: '민수가 아프다길래 병문안 갔어요.', zh: '听说民秀生病了就去探病。', zhEn: 'Heard Min-su was sick, so I went to visit him.' },
    ],
    mistakes: [
      { wrong: '민수가 온다고 해서 왔어요.', correct: '민수가 온다고 해서 기다렸어요.', note: '"听说民秀来我就来了"逻辑颠倒。민수来是前项，"我"的反应应是接他/等他。', noteEn: '"Heard Min-su came, so I came" is logically reversed. Min-su\'s coming is the first event; my reaction should be to receive/wait for him.' },
      { wrong: '내가 온다길래 갔어요.', correct: '민수가 온다길래 (내가) 갔어요.', note: '-길래 前后主语要不同。', noteEn: 'With -길래, the subject before and after must be different.' },
      { wrong: '유명한다고 해서 갔어요.', correct: '유명하다고 해서 갔어요.', note: '形容词不加 -ㄴ다고，直接 -다고。', noteEn: 'Adjectives don\'t take -ㄴ다고; use -다고 directly.' },
      { wrong: '학생다고 해서 할인을 받았어요.', correct: '학생이라고 해서 할인을 받았어요.', note: '名词用 -(이)라고 해서。', noteEn: 'For nouns, use -(이)라고 해서.' },
    ],
    quickTable: {
      title: '"听说……所以……"两种表达', titleEn: 'Two Expressions for "Heard that... so..."',
      body: '中性 vs 口语。', bodyEn: 'Neutral vs. colloquial.',
      headers: ['连接词', '语气', '前后主语', '例'],
      rows: [
        ['-다고 해서', '中性·书面', '可同可异', '온다고 해서 갔어요'],
        ['-는다길래', '口语·个人', '必须不同', '온다길래 갔어요'],
        ['-(이)라고 해서', '名词版', '同上', '학생이라고 해서'],
        ['-았/었다길래', '过去', '同上', '갔다길래 나도 갔어요'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '"听说……所以……" 选择', titleEn: 'Choosing Between "Heard that... so..." Expressions',
      body: '选择自然的说法。', bodyEn: 'Choose the natural expression.',
      questions: [
        {
          prompt: '"听说那家餐厅有名就去了"最自然：', promptEn: 'The most natural: "I heard that restaurant was famous, so I went."',
          options: [
            '그 식당이 유명한다고 해서 갔어요.',
            '그 식당이 유명하다고 해서 갔어요.',
            '그 식당이 유명자고 해서 갔어요.',
            '그 식당이 유명이라고 해서 갔어요.',
          ],
          answer: 1,
          explanation: '形容词 유명하다 → -다고 해서 → 유명하다고 해서。', explanationEn: 'Adjective 유명하다 → -다고 해서 → 유명하다고 해서.',
        },
        {
          prompt: '哪句语法/语义正确？', promptEn: 'Which sentence is grammatically/semantically correct?',
          options: [
            '(내가) 온다길래 (내가) 갔어요.',
            '민수가 온다길래 내가 기다렸어요.',
            '민수가 온다고 해서 민수가 왔어요.',
            '내가 간다고 해서 내가 갔어요.',
          ],
          answer: 1,
          explanation: '-길래 前后主语要不同；A、C、D 主语相同或语义矛盾。', explanationEn: 'With -길래, the subjects before and after must differ; A, C, and D have the same subject or a semantic contradiction.',
        },
        {
          prompt: '"听说是学生就打折了"应该填：___ 할인해 줬어요.', promptEn: 'For "I heard they\'re a student, so I gave a discount," fill in: ___ 할인해 줬어요.',
          options: ['학생이라고 해서', '학생다고 해서', '학생이자고 해서', '학생인다고 해서'],
          answer: 0,
          explanation: '名词 → -(이)라고 해서 → 학생이라고 해서。', explanationEn: 'Noun → -(이)라고 해서 → 학생이라고 해서.',
        },
        {
          prompt: '"新闻说下雨就带了伞"最自然：', promptEn: 'The most natural for "The news said it would rain, so I brought an umbrella":',
          options: [
            '뉴스에서 비 오라고 해서 우산 챙겼어요.',
            '뉴스에서 비 오냐고 해서 우산 챙겼어요.',
            '뉴스에서 비 온다고 해서 우산 챙겼어요.',
            '뉴스에서 비 오자고 해서 우산 챙겼어요.',
          ],
          answer: 2,
          explanation: '陈述内容 → -는다/ㄴ다고 해서，오다 无收音 → 온다고 해서。', explanationEn: 'For statements → -는다/ㄴ다고 해서; 오다 has no batchim → 온다고 해서.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01'],
    step0Html: `<div class="hook-box">
  "听说……所以……" —— 听来的话变成"我做某事"的理由。<br>
  用 <b style="color:#ff7fa8">-다고 해서</b>（中性）或 <b style="color:#2db89b">-는다길래</b>（口语）：<br>
  민수가 <b>온다길래</b> 기다렸어요.
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-다고 해서 vs -는다길래</div>
    <div style="font-size:14px;color:#241917">
      온다고 해서 기다렸어요.（<b>中性·书面通用</b>）<br>
      온다길래 기다렸어요.（<b>口语·个人反应</b>，主语必不同）
    </div>
  </div>
</div>`,
    compareLabel: '-다고 해서 vs -는다길래',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 5 课</div>
    <div class="ov-hero-title">-다고 해서 / -는다길래</div>
    <div class="ov-hero-sub">"听说……所以……"</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-는다고/ㄴ다고 해서</b> / <b>-는다길래/ㄴ다길래</b><br>
        形容词 → <b>-다고 해서</b> / <b>-다길래</b><br>
        名词 → <b>-(이)라고 해서</b><br>
        -길래 前后主语必须不同
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        민수가 온다고 해서 기다렸어요.<br>
        유명하다길래 가 봤어요.<br>
        비 온다고 해서 우산 챙겼어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">(내가) 온다길래 (내가) 갔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">-길래 前后主语必须不同</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">유명한다고 해서</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">유명하다고 해서（形容词不加 -ㄴ다）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第6课：-다면서? / -다면서요? ─────────────────────────
  {
    id: 'card-p25-l06',
    partNumber: 25,
    lessonNumber: 6,
    title: '-다면서? / -다면서요?',
    whatItDoes: '"听说是……对吗？"', whatItDoesEn: '"I heard it\'s... right?"',
    whatItDoesBody: '把听到的传闻拿去向本人或他人求证，用 -다면서? / -다면서요?。\n"听说你考上了大学？" → 대학교 합격했다면서요?\n带有惊讶/兴奋/确认的语气。', whatItDoesBodyEn: 'To confirm a rumor you heard with the person or someone else, use -다면서? / -다면서요?.\\n"I heard you got into college?" → 대학교 합격했다면서요?\\nCarries a tone of surprise/excitement/confirmation.',
    structureNote: '结构（问句·带 ? 号）：\n动词现在 → -는다면서?/ㄴ다면서?\n动词过去 → -았/었다면서?\n形容词 → -다면서?\n名词 → -(이)라면서?\n\n敬语加 -요：-다면서요?', structureNoteEn: 'Structure (questions with ?):\\nVerb present → -는다면서?/ㄴ다면서?\\nVerb past → -았/었다면서?\\nAdjective → -다면서?\\nNoun → -(이)라면서?\\n\\nAdd -요 for politeness: -다면서요?',
    rulesNote: '要点：\n1. 语气：既有"确认"又有"惊喜/意外"\n2. 只用于问句（有 ? 号）\n3. 一般用 -다면서요? 而不是 -다면서? （尊敬对方时）\n4. 对话中简写 -다며? / -다며요?', rulesNoteEn: 'Key points:\\n1. Tone: both "confirmation" and "surprise/unexpectedness"\\n2. Only used in questions (with ?)\\n3. Usually use -다면서요? rather than -다면서? (when showing respect)\\n4. Shortened in conversation to -다며? / -다며요?',
    structures: [
      {
        ko: '민수 씨, 결혼한다면서요?',
        zh: '民秀，听说你要结婚了？', zhEn: 'Minsu, I heard you\'re getting married?',
        tokens: [
          { text: '민수 씨,', role: 'subject' },
          { text: '결혼한다면서요?', role: 'verb' },
        ],
      },
      {
        ko: '어제 부산에 갔다면서요?',
        zh: '听说你昨天去釜山了？', zhEn: 'I heard you went to Busan yesterday?',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '부산에', role: 'place' },
          { text: '갔다면서요?', role: 'verb' },
        ],
      },
      {
        ko: '이 옷이 요즘 유행이라면서요?',
        zh: '听说这件衣服最近很流行？', zhEn: 'I heard this outfit is trendy these days?',
        tokens: [
          { text: '이 옷이', role: 'subject' },
          { text: '요즘', role: 'time' },
          { text: '유행이라면서요?', role: 'plain' },
        ],
      },
      {
        ko: '그 식당이 그렇게 맛있다면서?',
        zh: '听说那家餐厅那么好吃？', zhEn: 'I heard that restaurant is that good?',
        tokens: [
          { text: '그 식당이', role: 'subject' },
          { text: '그렇게', role: 'plain' },
          { text: '맛있다면서?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 → -는다면서? / -ㄴ다면서?', textEn: 'Present tense verbs → -는다면서? / -ㄴ다면서?', examples: '먹는다면서? / 간다면서?' },
      { type: 'rule', text: '动词过去 → -았/었다면서?', textEn: 'Past tense verbs → -았/었다면서?', examples: '갔다면서? / 먹었다면서?' },
      { type: 'rule', text: '形容词 → -다면서?', textEn: 'Adjectives → -다면서?', examples: '예쁘다면서? / 좋다면서?' },
      { type: 'rule', text: '名词 → -(이)라면서?', textEn: 'Nouns → -(이)라면서?', examples: '학생이라면서? / 의사라면서?' },
      { type: 'usage', text: '敬语加 -요：-다면서요?', textEn: 'Add polite -요: -다면서요?', examples: '결혼한다면서요? / 예쁘다면서요?' },
      { type: 'usage', text: '带确认+惊喜/意外的复合语气', textEn: 'A combined tone of confirmation + surprise/unexpectedness.', examples: '합격했다면서요? / 다음 주에 이사한다면서요?' },
      { type: 'note', text: '简写：-다며? / -다며요?', textEn: 'Abbreviated: -다며? / -다며요?', examples: '민수 결혼한다며? / 예쁘다며?' },
      { type: 'compare', text: '-다면서? vs -잖아요：前者求证；后者提醒对方已知信息', textEn: '-다면서? vs -잖아요: the former seeks confirmation; the latter reminds the listener of known information.', examples: '결혼한다면서요?（问） / 결혼하잖아요（提醒）', examplesEn: 'Getting married, I hear? (asking) / You\'re getting married, right? (reminding)' },
      { type: 'usage', text: '不只用于喜讯：常带"责备/埋怨"语气，追问对方言行不一，译作"你不是说……吗？"', textEn: 'Not just for good news: often carries a tone of reproach/complaint, pressing someone for inconsistency between words and actions — translate as "Didn\'t you say...?"', examples: '온다면서 왜 안 왔어요?（你不是说来吗，怎么没来？）/ 다이어트한다면서 그걸 먹어요?', examplesEn: 'You said you were coming—why didn\'t you? / You\'re on a diet, and you\'re eating that?' },
      { type: 'compare', text: '-다면서? 是直接向"当事人本人"当面求证；单纯转述别人的话用 -다고 들었어요（我听说）', textEn: '-다면서? is used to confirm directly with the person in question; to simply relay what someone else said, use -다고 들었어요 (I heard that...).', examples: '결혼한다면서요?（当面问本人） / 결혼한다고 들었어요（我听说他要结婚，非当面）', examplesEn: 'Getting married, I hear? (asking the person directly) / I heard he\'s getting married (not in person)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수 씨,', role: 'subject' },
          { text: '다음 달에', role: 'time' },
          { text: '결혼한다면서요?', role: 'verb' },
        ],
        zh: '民秀，听说你下个月结婚？', zhEn: 'Min-su, I heard you\'re getting married next month?',
        swapRole: 'verb',
        swapWords: ['결혼한다면서요?', '이사한다면서요?', '유학 간다면서요?'],
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '민수가', role: 'subject' },
          { text: '왔다면서?', role: 'verb' },
        ],
        zh: '听说民秀昨天来了？', zhEn: 'I heard Min-su came yesterday?',
        swapRole: 'verb',
        swapWords: ['왔다면서?', '만났다면서?', '전화했다면서?'],
      },
      {
        wordBlocks: [
          { text: '그 식당이', role: 'subject' },
          { text: '진짜', role: 'plain' },
          { text: '맛있다면서요?', role: 'verb' },
        ],
        zh: '听说那家餐厅真的好吃？', zhEn: 'I heard that restaurant is really good?',
        swapRole: 'verb',
        swapWords: ['맛있다면서요?', '유명하다면서요?', '분위기가 좋다면서요?'],
      },
    ],
    scenarios: [
      { icon: '💍', context: '喜事求证', contextEn: 'Confirming good news', ko: '민수 씨, 결혼한다면서요? 축하해요!', zh: '民秀，听说你要结婚？恭喜！', zhEn: 'Min-su, I heard you\'re getting married? Congratulations!' },
      { icon: '🎓', context: '好消息', contextEn: 'Good news', ko: '대학교 합격했다면서요? 진짜 축하해요!', zh: '听说考上大学了？真恭喜！', zhEn: 'I heard you got into college? Congrats!' },
      { icon: '🏠', context: '搬家消息', contextEn: 'Moving news', ko: '다음 달에 이사한다면서요?', zh: '听说你下个月要搬家？', zhEn: 'I heard you\'re moving next month?' },
      { icon: '🍜', context: '好评求证', contextEn: 'Confirming a good review', ko: '그 라면집이 그렇게 맛있다면서?', zh: '听说那家拉面店那么好吃？', zhEn: 'I heard that ramen place is that good?' },
      { icon: '🏋️', context: '习惯求证', contextEn: 'Confirming a habit', ko: '요즘 매일 운동한다면서요?', zh: '听说你最近每天运动？', zhEn: 'I heard you\'ve been exercising every day lately?' },
      { icon: '💬', context: '简写', contextEn: 'Abbreviation', ko: '민수 결혼한다며?', zh: '民秀要结婚了？', zhEn: 'Min-su is getting married?' },
    ],
    mistakes: [
      { wrong: '민수 결혼한다면서요.', correct: '민수 결혼한다면서요?', note: '-다면서? 是问句，必须加问号，语调也是升调。', noteEn: '-다면서? is a question—it must end with a question mark, and the intonation rises.' },
      { wrong: '민수가 결혼하다면서요?', correct: '민수가 결혼한다면서요?', note: '动词现在无收音 → -ㄴ다면서? → 결혼한다면서요?', noteEn: 'Verb present tense without final consonant → -ㄴ다면서? → 결혼한다면서요?' },
      { wrong: '이 옷이 유행다면서요?', correct: '이 옷이 유행이라면서요?', note: '名词用 -(이)라면서?，不是 -다면서?。', noteEn: 'For nouns, use -(이)라면서?, not -다면서?.' },
      { wrong: '어제 갔는다면서요?', correct: '어제 갔다면서요?', note: '过去 -았/었다면서?，不加 -는。', noteEn: 'For past tense, use -았/었다면서?, without adding -는.' },
    ],
    quickTable: {
      title: '-다면서? 一览', titleEn: '-다면서? Overview',
      body: '求证 + 惊喜的问句。', bodyEn: 'A question that confirms and expresses surprise.',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-는/ㄴ다면서?', '먹는다면서? / 간다면서?'],
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '과거', zh: '过去', zhEn: 'Past' }, '-았/었다면서?', '갔다면서?'],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-다면서?', '예쁘다면서?'],
        [{ ko: '명사', zh: '名词', zhEn: 'Noun' }, { ko: '현재', zh: '现在', zhEn: 'Now' }, '-(이)라면서?', '학생이라면서?'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-다면서? 变形', titleEn: '-다면서? Conjugation',
      body: '选择正确形式。', bodyEn: 'Choose the correct form.',
      questions: [
        {
          prompt: '"听说你要结婚？" → 민수 씨, ___', promptEn: '"I heard you\'re getting married?" → Min-su, ___',
          options: ['결혼한다면서요?', '결혼하다면서요?', '결혼하는다면서요?', '결혼자면서요?'],
          answer: 0,
          explanation: '动词 결혼하다 现在无收音 → -ㄴ다면서? → 결혼한다면서요?', explanationEn: 'Verb 결혼하다, no final consonant in present tense → -ㄴ다면서? → 결혼한다면서요?',
        },
        {
          prompt: '"听说昨天见了朋友？" → 어제 친구 ___', promptEn: '"I heard you met a friend yesterday?" → 어제 친구 ___',
          options: ['만난다면서요?', '만났다면서요?', '만나는다면서요?', '만나면서요?'],
          answer: 1,
          explanation: '过去时 → -았/었다면서? → 만났다면서요?', explanationEn: 'Past tense → -았/었다면서? → 만났다면서요?',
        },
        {
          prompt: '"听说这件衣服流行？" → 이 옷이 ___', promptEn: '"I heard this outfit is trendy?" → 이 옷이 ___',
          options: ['유행한다면서요?', '유행다면서요?', '유행이라면서요?', '유행자면서요?'],
          answer: 2,
          explanation: '유행 是名词 → -(이)라면서? → 유행이라면서요?', explanationEn: '유행 is a noun → -(이)라면서? → 유행이라면서요?',
        },
        {
          prompt: '"听说很好吃？" → 그 식당이 ___', promptEn: '"I heard it\'s delicious?" → 그 식당이 ___',
          options: ['맛있다면서요?', '맛있는다면서요?', '맛있자면서요?', '맛있이라면서요?'],
          answer: 0,
          explanation: '形容词 → -다면서? → 맛있다면서요?', explanationEn: 'Adjective → -다면서? → 맛있다면서요?',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01'],
    step0Html: `<div class="hook-box">
  听到别人的消息，你想向本人求证："真的吗？"<br>
  用 <b style="color:#ff7fa8">-다면서요?</b> —— 确认 + 惊喜<br>
  민수 씨, 결혼<b>한다면서요?</b>
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-다면서? vs -잖아요</div>
    <div style="font-size:14px;color:#241917">
      결혼한다면서요?（<b>问</b>："听说要结婚了？"）<br>
      결혼하잖아요.（<b>提醒</b>："他不是要结婚了嘛，你忘啦？"）
    </div>
  </div>
</div>`,
    compareLabel: '-다면서? vs -잖아요',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P25 · 第 6 课</div>
    <div class="ov-hero-title">-다면서? / -다면서요?</div>
    <div class="ov-hero-sub">"听说是……对吗？" · 求证型问句</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-는/ㄴ다면서?</b>：먹는다면서? / 간다면서?<br>
        动词过去 → <b>-았/었다면서?</b>：갔다면서?<br>
        形容词 → <b>-다면서?</b>：예쁘다면서?<br>
        名词 → <b>-(이)라면서?</b>：학생이라면서?
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        민수 씨, 결혼한다면서요?<br>
        어제 부산에 갔다면서요?<br>
        그 식당이 그렇게 맛있다면서?
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">결혼하다면서요?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">결혼한다면서요?（动词加 -ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">유행다면서요?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">유행이라면서요?（名词用 이라면서）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第7课：-다니 / -다니요 ──────────────────────────────────────
  {
    id: 'card-p25-l07',
    partNumber: 25,
    lessonNumber: 7,
    title: '-다니 / -다니요',
    whatItDoes: '表达惊讶', whatItDoesEn: 'Expressing surprise',
    whatItDoesBody: '「-다니 / -다니요」用于对听到的事实表示惊讶、感叹、意外或不敢相信，中文常译为"居然……""竟然……""怎么会……"。是间接引用 -다고 하다 的省略变形。', whatItDoesBodyEn: '\'-다니 / -다니요\' is used to express surprise, amazement, shock, or disbelief at something you\'ve heard. It\'s often translated as \'to think that...\' or \'how could...\'. It\'s a shortened form of the indirect quotation -다고 하다.',
    structureNote: '动词现在 -는/ㄴ다니 · 动词过去 -았/었다니 · 形容词 -다니 · 名词 -(이)라니。加"요"变敬语：-다니요', structureNoteEn: 'Present tense verbs: -는/ㄴ다니 · Past tense verbs: -았/었다니 · Adjectives: -다니 · Nouns: -(이)라니. Add \'요\' for polite form: -다니요',
    rulesNote: '动词现在（有받침）→ -는다니；动词现在（无받침）→ -ㄴ다니；动词过去 → -았/었다니；形容词 → -다니；名词（有받침）→ -이라니，（无받침）→ -라니', rulesNoteEn: 'Present verbs (with batchim) → -는다니; Present verbs (no batchim) → -ㄴ다니; Past verbs → -았/었다니; Adjectives → -다니; Nouns (with batchim) → -이라니, (no batchim) → -라니',
    structures: [
      {
        ko: '그렇게 비싸다니 놀랐어요.',
        zh: '居然那么贵，我吃惊了。', zhEn: 'It\'s so expensive, I\'m shocked.',
        tokens: [
          { text: '그렇게', role: 'plain' },
          { text: '비싸다니', role: 'verb' },
          { text: '놀랐어요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 벌써 갔다니요?',
        zh: '民秀居然已经走了？', zhEn: 'Minsu already left?',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '갔다니요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 의사라니 믿을 수 없어요.',
        zh: '他居然是医生，真难以置信。', zhEn: 'He\'s actually a doctor, I can\'t believe it.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '의사라니', role: 'plain' },
          { text: '믿을 수 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：有받침 → -는다니 / 无받침 → -ㄴ다니', textEn: 'Present verbs: with batchim → -는다니 / no batchim → -ㄴ다니', examples: '먹다 → 먹는다니 / 가다 → 간다니' },
      { type: 'rule', text: '动词过去：-았/었다니', textEn: 'Past tense verbs: -았/었다니', examples: '갔다니, 먹었다니, 봤다니' },
      { type: 'rule', text: '形容词：-다니', textEn: 'Adjectives: -다니', examples: '예쁘다니, 크다니, 좋다니' },
      { type: 'rule', text: '名词：有받침 → -이라니 / 无받침 → -라니', textEn: 'Nouns: with batchim → -이라니 / no batchim → -라니', examples: '학생이라니, 의사라니, 친구라니' },
      { type: 'usage', text: '语气核心是「惊讶/感叹/不敢相信」，不是转述', textEn: 'The core nuance is surprise/exclamation/disbelief, not reporting.', examples: '벌써 여름이라니! → 居然已经夏天了！', examplesEn: '벌써 여름이라니! → It\'s already summer!' },
      { type: 'usage', text: '-다니요 是敬语形式，用于对长辈或对方表达惊讶', textEn: '-다니요 is the polite form, used to express surprise to elders or the listener.', examples: '어머, 결혼하신다니요?' },
      { type: 'note', text: '句末可接感叹词或形容词表达情绪：놀랐어요 / 믿을 수 없어요 / 대단해요', textEn: 'You can add exclamations or adjectives at the end to express emotion: 놀랐어요 / 믿을 수 없어요 / 대단해요', examples: '이렇게 잘하다니 대단해요.（竟然这么厉害，真了不起。）', examplesEn: '이렇게 잘하다니 대단해요. (To be this good, amazing.)' },
      { type: 'compare', text: '-다니 vs -다고요? → -다니 表惊讶，-다고요? 表反问/再确认', textEn: '-다니 vs -다고요? → -다니 expresses surprise, -다고요? asks for confirmation/retort.', examples: '갔다니? 惊讶 / 갔다고요? 你说他走了？', examplesEn: '갔다니? Surprised / 갔다고요? You\'re saying he left?' },
      { type: 'compare', text: '易混警报：-다니（惊讶）和 -다니까（重申"我都说了……"）只差一个 까，意思完全不同', textEn: 'Confusion alert: -다니 (surprise) and -다니까 (reiterating "I told you...") differ by just 까, but mean totally different things.', examples: '벌써 갔다니!（居然已经走了！惊讶）/ 벌써 갔다니까!（我都说了他已经走了！不耐烦地重申）', examplesEn: '벌써 갔다니! (Already left! Surprised) / 벌써 갔다니까! (I told you he already left! Impatiently reiterating)' },
      { type: 'note', text: '-다니 可单独成句当感叹，后面不用接 하다 或其他动词', textEn: '-다니 can stand alone as an exclamation without needing 하다 or other verbs after it.', examples: '벌써 여름이라니!（居然已经夏天了！）— 句子到此结束也成立', examplesEn: '벌써 여름이라니! (It\'s already summer!) — The sentence works even if it ends here.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이렇게', role: 'plain' },
          { text: '늦게', role: 'plain' },
          { text: '오다니', role: 'verb' },
        ],
        zh: '居然这么晚才来。', zhEn: 'You came this late?',
        swapWords: ['일찍', '빨리', '늦게', '이제야'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '그렇게', role: 'plain' },
          { text: '잘한다니요', role: 'verb' },
        ],
        zh: '民秀居然韩语说得那么好？', zhEn: 'Min-su speaks Korean that well?',
        swapWords: ['잘한다니요', '못한다니요', '유창하다니요', '어렵다니요'],
      },
      {
        wordBlocks: [
          { text: '벌써', role: 'plain' },
          { text: '겨울이라니', role: 'plain' },
          { text: '시간이', role: 'subject' },
          { text: '빠르네요', role: 'verb' },
        ],
        zh: '居然已经冬天了，时间过得真快。', zhEn: 'It\'s already winter? Time flies.',
        swapWords: ['겨울', '봄', '가을', '연말'],
      },
    ],
    scenarios: [
      { icon: '😲', context: '意外', contextEn: 'Unexpected', ko: '그렇게 비싸다니 놀랐어요.', zh: '居然那么贵，我吃惊了。', zhEn: 'It\'s so expensive, I\'m shocked.' },
      { icon: '🤯', context: '不敢相信', contextEn: 'Unbelievable', ko: '그 사람이 의사라니 믿을 수 없어요.', zh: '他居然是医生，真难以置信。', zhEn: 'He\'s actually a doctor, I can\'t believe it.' },
      { icon: '👏', context: '感叹', contextEn: 'Exclamation', ko: '이렇게 잘하다니 대단해요.', zh: '居然做得这么好，太厉害了。', zhEn: 'You did that well? Amazing.' },
      { icon: '⏰', context: '时间流逝', contextEn: 'The passage of time', ko: '벌써 겨울이라니, 시간이 빠르네요.', zh: '居然已经冬天了，时间过得真快。', zhEn: 'It\'s already winter? Time flies.' },
      { icon: '💔', context: '失望', contextEn: 'Disappointed', ko: '이렇게 실수를 하다니 부끄러워요.', zh: '居然犯了这样的错，好惭愧。', zhEn: 'I made such a mistake? I\'m so ashamed.' },
      { icon: '❓', context: '反问', contextEn: 'Rhetorical question', ko: '민수가 벌써 갔다니요?', zh: '民秀居然已经走了？', zhEn: 'Minsu already left?' },
    ],
    mistakes: [
      { wrong: '가다니', correct: '간다니', note: '动词现在无받침加 -ㄴ다니', noteEn: 'Present verbs without batchim take -ㄴ다니' },
      { wrong: '먹다니', correct: '먹는다니', note: '动词现在有받침加 -는다니', noteEn: 'Present verbs with batchim take -는다니' },
      { wrong: '의사다니', correct: '의사라니', note: '名词无받침用 -라니', noteEn: 'Nouns without batchim use -라니' },
      { wrong: '학생다니', correct: '학생이라니', note: '名词有받침用 -이라니', noteEn: 'Nouns with batchim use -이라니' },
    ],
    quickTable: {
      title: '-다니 形态一览', titleEn: '-다니 Form Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在（有받침）', '-는다니', '먹는다니'],
        ['动词现在（无받침）', '-ㄴ다니', '간다니'],
        ['动词过去', '-았/었다니', '갔다니'],
        ['形容词', '-다니', '예쁘다니'],
        ['名词（有받침）', '-이라니', '학생이라니'],
        ['名词（无받침）', '-라니', '의사라니'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选正确的 -다니 形式', titleEn: 'Choose the correct -다니 form',
      body: '根据词类和받침选择正确形式', bodyEn: 'Choose the correct form based on word type and batchim',
      questions: [
        {
          prompt: '민수가 벌써 (가다) 놀랐어요.',
          options: ['가다니', '간다니', '갔다니', '가는다니'],
          answer: 2,
          explanation: '"已经走了"是过去，动词过去用 -았/었다니 → 갔다니。', explanationEn: '"Already left" is past; for past verbs use -았/었다니 → 갔다니.',
        },
        {
          prompt: '그 사람이 (의사) 믿을 수 없어요.',
          options: ['의사다니', '의사이다니', '의사라니', '의사는다니'],
          answer: 2,
          explanation: '名词 의사 无받침，用 -라니 → 의사라니。', explanationEn: 'The noun 의사 has no batchim, so use -라니 → 의사라니.',
        },
        {
          prompt: '이렇게 잘 (먹다) 대단해요.',
          options: ['먹다니', '먹는다니', '먹은다니', '먹라니'],
          answer: 1,
          explanation: '动词现在有받침，用 -는다니 → 먹는다니。', explanationEn: 'Present verb with batchim, use -는다니 → 먹는다니.',
        },
        {
          prompt: '그렇게 (예쁘다) 부러워요.',
          options: ['예쁘는다니', '예쁜다니', '예쁘다니', '예쁘라니'],
          answer: 2,
          explanation: '形容词直接用 -다니 → 예쁘다니，不加 -는/ㄴ。', explanationEn: 'Adjectives use -다니 directly → 예쁘다니, without -는/ㄴ.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">听说朋友月薪一万，你惊得张大嘴——「居然一万？」<br>韩语里，这种"居然……" 用 <b>-다니 / -다니요</b>。<br>它本质是 -다고 하다 的省略，专门表达惊讶、感叹、难以置信。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-다니? vs -다고요?</b><br>
    ・-다니? → 表达惊讶/不敢相信<br>
    <span style="color:#89756e">갔다니? = 居然走了？（惊讶）</span><br>
    ・-다고요? → 反问/再确认<br>
    <span style="color:#89756e">갔다고요? = 你说他走了？（再确认）</span>
  </div>
</div>`,
    compareLabel: '-다니 vs -다고요?',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-다니 / -다니요：表达惊讶</div>
  <div style="font-size:14px;color:#89756e">对听到的事实表示"居然……""竟然……"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在（有받침）→ <b>-는다니</b>：먹는다니<br>
      动词现在（无받침）→ <b>-ㄴ다니</b>：간다니<br>
      动词过去 → <b>-았/었다니</b>：갔다니<br>
      形容词 → <b>-다니</b>：예쁘다니<br>
      名词 → <b>-(이)라니</b>：학생이라니 / 의사라니
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      그렇게 비싸다니 놀랐어요.<br>
      벌써 겨울이라니, 시간이 빠르네요.<br>
      이렇게 잘하다니 대단해요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가다니</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">간다니（动词无받침加 -ㄴ）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">의사다니</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">의사라니（名词无받침用 -라니）</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：-다는 N / -는다는 N ──────────────────────────────────────
  {
    id: 'card-p25-l08',
    partNumber: 25,
    lessonNumber: 8,
    title: '-다는 N / -는다는 N',
    whatItDoes: '"说……的" 冠形', whatItDoesEn: 'Adnominal form for \'saying that...\'',
    whatItDoesBody: '「-다는 / -는다는 / -ㄴ다는 / -(이)라는」是间接引用 -다고 하다 的冠形形态，把"说……"变成修饰名词的定语，中文对应"说……的（消息/传闻/事实）"。是新闻、书面语高频结构。', whatItDoesBodyEn: '\'-다는 / -는다는 / -ㄴ다는 / -(이)라는\' are the adnominal forms of the indirect quotation -다고 하다, turning \'saying that...\' into a modifier for nouns. In English, it corresponds to \'the (news/rumor/fact) that...\'. It\'s a high-frequency structure in news and written language.',
    structureNote: '动词现在（有받침）-는다는 / 动词现在（无받침）-ㄴ다는 / 动词过去 -았/었다는 / 形容词 -다는 / 名词 -(이)라는', structureNoteEn: 'Present verbs (with batchim) -는다는 / Present verbs (no batchim) -ㄴ다는 / Past verbs -았/었다는 / Adjectives -다는 / Nouns -(이)라는',
    rulesNote: '这是 -다고 하는 的省略。核心公式：现在 -는/ㄴ다는 · 过去 -았/었다는 · 形容词 -다는 · 名词 -(이)라는。后面接名词如 소식/이야기/사실/소문/생각', rulesNoteEn: 'This is a shortened form of -다고 하는. Core formula: Present -는/ㄴ다는 · Past -았/었다는 · Adjectives -다는 · Nouns -(이)라는. Followed by nouns like 소식/이야기/사실/소문/생각',
    structures: [
      {
        ko: '그가 결혼한다는 소식을 들었어요.',
        zh: '听说他要结婚了。', zhEn: 'I heard he\'s getting married.',
        tokens: [
          { text: '그가', role: 'subject' },
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
      },
      {
        ko: '한국이 좋다는 이야기를 자주 들어요.',
        zh: '经常听到说韩国很好的话。', zhEn: 'I often hear that Korea is great.',
        tokens: [
          { text: '한국이', role: 'subject' },
          { text: '좋다는', role: 'plain' },
          { text: '이야기를', role: 'object' },
          { text: '자주', role: 'plain' },
          { text: '들어요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 의사라는 소문이 있어요.',
        zh: '有传闻说民秀是医生。', zhEn: 'There\'s a rumor that Min-su is a doctor.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '의사라는', role: 'plain' },
          { text: '소문이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：有받침 → -는다는 / 无받침 → -ㄴ다는', textEn: 'Present verbs: with batchim → -는다는 / no batchim → -ㄴ다는', examples: '먹다 → 먹는다는 / 가다 → 간다는' },
      { type: 'rule', text: '动词过去：-았/었다는', textEn: 'Verb past: -았/었다는', examples: '갔다는 소식, 결혼했다는 이야기' },
      { type: 'rule', text: '形容词：-다는', textEn: 'Adjective: -다는', examples: '좋다는 소문, 예쁘다는 이야기' },
      { type: 'rule', text: '名词：有받침 → -이라는 / 无받침 → -라는', textEn: 'Nouns: with batchim → -이라는 / no batchim → -라는', examples: '학생이라는 사실, 의사라는 소문' },
      { type: 'usage', text: '本质是 -다고 하는 的省略，用来把间接引用变成定语', textEn: 'It\'s essentially a shortened form of -다고 하는, used to turn indirect quotes into modifiers', examples: '결혼한다고 하는 소식 = 결혼한다는 소식' },
      { type: 'usage', text: '后接名词高频：소식/이야기/사실/소문/생각/말/뜻/의미', textEn: 'Common nouns that follow: news/story/fact/rumor/thought/word/meaning', examples: '한국어가 어렵다는 생각이 들었어요.（我觉得韩语很难。）', examplesEn: 'I felt that Korean is difficult.' },
      { type: 'note', text: '否定形式：-지 않는다는 / -지 않다는', textEn: 'Negative forms: -지 않는다는 / -지 않다는', examples: '먹지 않는다는 소문, 좋지 않다는 이야기' },
      { type: 'compare', text: '别拿中文"的"硬套成普通定语 -는：修饰"消息/传闻/事实"这类"话的内容"名词时，必须用引用型 -다는', textEn: 'Don\'t force Chinese \'的\' onto the regular modifier -는: when modifying nouns like \'news/rumor/fact\' that refer to the content of speech, you must use the quotative -다는', examples: '결혼한다는 소식 ✓（要结婚的消息）/ 결혼하는 소식 ✗（错，결혼하는 只能修饰人或场合）', examplesEn: 'The news that (someone) is getting married ✓ / The news of getting married ✗ (wrong, 결혼하는 can only modify people or occasions)' },
      { type: 'note', text: '口语里 -다는 常缩略成 -단', textEn: 'In spoken language, -다는 often shortens to -단', examples: '결혼한다는 소식 → 결혼한단 소식 / 좋다는 얘기 → 좋단 얘기（后面章节详学缩略）', examplesEn: '결혼한다는 소식 → 결혼한단 소식 / 좋다는 얘기 → 좋단 얘기 (we\'ll learn more about contractions in later chapters)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그가', role: 'subject' },
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '听说他要结婚了。', zhEn: 'I heard he\'s getting married.',
        swapWords: ['소식', '이야기', '소문', '말'],
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '어렵다는', role: 'plain' },
          { text: '생각이', role: 'subject' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '产生了韩语很难的想法。', zhEn: 'I had the thought that Korean is difficult.',
        swapWords: ['어렵다', '쉽다', '재미있다', '중요하다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '의사라는', role: 'plain' },
          { text: '소문이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '有传闻说民秀是医生。', zhEn: 'There\'s a rumor that Min-su is a doctor.',
        swapWords: ['의사', '학생', '선생님', '가수'],
      },
    ],
    scenarios: [
      { icon: '📰', context: '新闻', contextEn: 'news', ko: '경제가 나빠진다는 뉴스를 봤어요.', zh: '看到说经济会变糟的新闻。', zhEn: 'I saw news saying the economy will get worse.' },
      { icon: '💌', context: '消息', contextEn: 'news', ko: '그가 결혼한다는 소식을 들었어요.', zh: '听说他要结婚了。', zhEn: 'I heard he\'s getting married.' },
      { icon: '🗣️', context: '传闻', contextEn: 'rumor', ko: '민수가 의사라는 소문이 있어요.', zh: '有传闻说民秀是医生。', zhEn: 'There\'s a rumor that Min-su is a doctor.' },
      { icon: '💭', context: '想法', contextEn: 'thought', ko: '한국어가 어렵다는 생각이 들었어요.', zh: '产生了韩语很难的想法。', zhEn: 'I had the thought that Korean is difficult.' },
      { icon: '📖', context: '事实', contextEn: 'fact', ko: '지구가 둥글다는 사실은 누구나 알아요.', zh: '地球是圆的这一事实谁都知道。', zhEn: 'Everyone knows the fact that the Earth is round.' },
      { icon: '📢', context: '公告', contextEn: 'Announcement', ko: '내일 시험이 없다는 공지를 받았어요.', zh: '收到明天没有考试的通知。', zhEn: 'I received notice that there\'s no exam tomorrow.' },
    ],
    mistakes: [
      { wrong: '결혼하다는 소식', correct: '결혼한다는 소식', note: '动词现在无받침加 -ㄴ다는', noteEn: 'Present verbs without batchim take -ㄴ다는' },
      { wrong: '먹다는 이야기', correct: '먹는다는 이야기', note: '动词现在有받침加 -는다는', noteEn: 'Present verbs with batchim take -는다는' },
      { wrong: '의사다는 소문', correct: '의사라는 소문', note: '名词无받침用 -라는', noteEn: 'Nouns without batchim use -라는' },
      { wrong: '좋는다는 이야기', correct: '좋다는 이야기', note: '形容词直接用 -다는，不加 -는/ㄴ', noteEn: 'For adjectives, use -다는 directly, without adding -는/ㄴ' },
    ],
    quickTable: {
      title: '-다는 冠形形态', titleEn: '-다는 adnominal form',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在（有받침）', '-는다는', '먹는다는 이야기'],
        ['动词现在（无받침）', '-ㄴ다는', '간다는 소식'],
        ['动词过去', '-았/었다는', '갔다는 소문'],
        ['形容词', '-다는', '좋다는 이야기'],
        ['名词（有받침）', '-이라는', '학생이라는 사실'],
        ['名词（无받침）', '-라는', '의사라는 소문'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选正确的 -다는 冠形', titleEn: 'Choose the correct -다는 adnominal',
      body: '根据词类和받침选择', bodyEn: 'Choose based on word class and 받침',
      questions: [
        {
          prompt: '그가 곧 (결혼하다) 소식을 들었어요.',
          options: ['결혼하다는', '결혼한다는', '결혼했다는', '결혼하라는'],
          answer: 1,
          explanation: '"要结婚"是现在的引用，动词无받침加 -ㄴ다는 → 결혼한다는。', explanationEn: '"To marry" is a present quote; the verb has no 받침, so add -ㄴ다는 → 결혼한다는.',
        },
        {
          prompt: '한국어가 (어렵다) 생각이 들었어요.',
          options: ['어렵는다는', '어려운다는', '어렵다는', '어렵라는'],
          answer: 2,
          explanation: '어렵다 是形容词，直接用 -다는 → 어렵다는。', explanationEn: '어렵다 is an adjective, so use -다는 directly → 어렵다는.',
        },
        {
          prompt: '민수가 (의사) 소문이 있어요.',
          options: ['의사다는', '의사이는', '의사라는', '의사는다는'],
          answer: 2,
          explanation: '名词 의사 无받침，用 -라는 → 의사라는。', explanationEn: 'The noun 의사 has no 받침, so use -라는 → 의사라는.',
        },
        {
          prompt: '민수가 어제 부산에 (가다) 이야기를 들었어요.',
          options: ['간다는', '가는다는', '갔다는', '가라는'],
          answer: 2,
          explanation: '"昨天去了"是过去引用，用 -았/었다는 → 갔다는。', explanationEn: '\'Went yesterday\' is a past quote, so use -았/었다는 → 갔다는.',
        },
      ],
    },
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"听说他要结婚了" 韩语要说成 <b>결혼한다는 소식</b>。<br>核心是把 -다고 하는 省略成 <b>-다는</b>，再接名词。<br>这是新闻、公告、日常传闻的高频结构。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-다고 하는 소식 vs -다는 소식</b><br>
    完全等价，后者是前者的省略。<br>
    ・결혼한다고 하는 소식 = 결혼한다는 소식<br>
    ・의사라고 하는 소문 = 의사라는 소문<br>
    日常和书面语更常用省略形。
  </div>
</div>`,
    compareLabel: '完整形 vs 省略形', compareLabelEn: 'Full form vs. abbreviated form',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-다는 N：说……的（冠形）</div>
  <div style="font-size:14px;color:#89756e">间接引用变定语</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在（有받침）→ <b>-는다는</b>：먹는다는 이야기<br>
      动词现在（无받침）→ <b>-ㄴ다는</b>：간다는 소식<br>
      动词过去 → <b>-았/었다는</b>：갔다는 소문<br>
      形容词 → <b>-다는</b>：좋다는 이야기<br>
      名词 → <b>-(이)라는</b>：학생이라는 사실
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频搭配名词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      소식（消息）· 이야기（话）· 사실（事实）<br>
      소문（传闻）· 생각（想法）· 뉴스（新闻）<br>
      공지（通知）· 말（话）· 의미（含义）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">결혼하다는 소식</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">결혼한다는 소식</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋는다는 이야기</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋다는 이야기（形容词不加 -는）</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p25-l09',
    partNumber: 25,
    lessonNumber: 9,
    title: 'P25 综合练习', titleEn: 'P25 Comprehensive Practice',
    whatItDoes: 'P25 综合复习', whatItDoesEn: 'P25 Comprehensive Review',
    whatItDoesBody: '本练习综合复习 P25 高级引用与转述章节的 8 个语法点，帮助巩固间接引用的完整体系。', whatItDoesBodyEn: 'This exercise comprehensively reviews the 8 grammar points from the P25 Advanced Quoting and Reporting chapter, helping solidify the complete system of indirect speech.',
    structureNote: '综合本 Part 所有语法', structureNoteEn: 'Comprehensive review of all grammar in this part',
    rulesNote: '重点在识别不同引用形式的使用场景', rulesNoteEn: 'Focus on identifying usage contexts for different quoting forms',
    isPractice: true,
    structures: [
      {
        ko: '민수가 온다고 했어요.',
        zh: '民秀说要来。', zhEn: 'Minsu said he would come.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '온다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '어디에 가냐고 물었어요.',
        zh: '问了要去哪里。', zhEn: '(He) asked where (we) were going.',
        tokens: [
          { text: '어디에', role: 'place' },
          { text: '가냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '같이 가자고 했어요.',
        zh: '(他)说一起去吧。', zhEn: '(He) said let\'s go together.',
        tokens: [
          { text: '같이', role: 'plain' },
          { text: '가자고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '陈述句：动词现在 -는/ㄴ다고 · 过去 -았/었다고 · 形容词 -다고 · 名词 -(이)라고 하다', textEn: 'Declarative: Verb present -는/ㄴ다고 · past -았/었다고 · Adjective -다고 · Noun -(이)라고 하다' },
      { type: 'rule', text: '疑问句：-냐고 하다 / 물어보다', textEn: 'Interrogative: -냐고 하다 / 물어보다' },
      { type: 'rule', text: '共动句（建议）：-자고 하다', textEn: 'Suggestive (proposal): -자고 하다' },
      { type: 'rule', text: '命令句：-(으)라고 하다', textEn: 'Imperative: -(으)라고 하다' },
      { type: 'usage', text: '-다고 해서 / -다길래 → 听说……所以……', textEn: '-다고 해서 / -다길래 → Heard that... so...' },
      { type: 'usage', text: '-다면서? → 听说是……对吗？（再确认）', textEn: '-다면서? → Heard it\'s... right? (confirming)' },
      { type: 'usage', text: '-다니 → 表达惊讶，"居然……"', textEn: '-다니 → Expressing surprise, "To think that..."' },
      { type: 'usage', text: '-다는 N → "说……的" 冠形，接名词', textEn: '-다는 N → "Saying that..." modifier, attaches to nouns' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '한국어가', role: 'subject' },
          { text: '어렵다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '民秀说韩语很难。', zhEn: 'Minsu said Korean is hard.',
        swapWords: ['어렵다', '쉽다', '재미있다', '중요하다'],
      },
      {
        wordBlocks: [
          { text: '어디에', role: 'place' },
          { text: '사냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '问了住在哪里。', zhEn: '(He) asked where (I) live.',
        swapWords: ['어디', '언제', '무엇', '누구'],
      },
      {
        wordBlocks: [
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들어서', role: 'verb' },
          { text: '놀랐어요', role: 'verb' },
        ],
        zh: '听到要结婚的消息，吃了一惊。', zhEn: 'I was surprised to hear the news that (they) are getting married.',
        swapWords: ['소식', '이야기', '소문', '말'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '转述', contextEn: 'Reported speech', ko: '민수가 온다고 했어요.', zh: '民秀说要来。', zhEn: 'Minsu said he would come.' },
      { icon: '❓', context: '间接问', contextEn: 'Indirect question', ko: '어디에 가냐고 물었어요.', zh: '问了要去哪里。', zhEn: '(He) asked where (we) were going.' },
      { icon: '🤝', context: '间接建议', contextEn: 'Indirect suggestion', ko: '같이 가자고 했어요.', zh: '说一起去吧。', zhEn: '(He) said let\'s go together.' },
      { icon: '📢', context: '间接命令', contextEn: 'Indirect command', ko: '빨리 오라고 했어요.', zh: '让快点来。', zhEn: '(He) told (me) to come quickly.' },
      { icon: '😲', context: '惊讶', contextEn: 'Surprised', ko: '그렇게 잘한다니 놀랐어요.', zh: '居然做得这么好，吃惊了。', zhEn: 'I\'m surprised (he) did it so well.' },
      { icon: '📰', context: '冠形', contextEn: 'Adnominal (modifier)', ko: '결혼한다는 소식을 들었어요.', zh: '听说要结婚了。', zhEn: 'I heard (they) are getting married.' },
    ],
    mistakes: [
      { wrong: '민수가 온다고 물었어요', correct: '민수가 오냐고 물었어요', note: '疑问句用 -냐고，不用 -다고', noteEn: 'Use -냐고 for questions, not -다고' },
      { wrong: '같이 간다고 했어요', correct: '같이 가자고 했어요', note: '共动/建议用 -자고，不用 -다고', noteEn: 'Use -자고 for suggestions, not -다고' },
      { wrong: '빨리 온다고 했어요', correct: '빨리 오라고 했어요', note: '命令用 -(으)라고，不用 -다고', noteEn: 'Use -(으)라고 for commands, not -다고' },
    ],
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l02', 'card-p25-l03', 'card-p25-l04', 'card-p25-l05', 'card-p25-l06', 'card-p25-l07', 'card-p25-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P25 综合练习', titleEn: 'P25 Comprehensive Practice',
      body: '选择正确的间接引用形式', bodyEn: 'Choose the correct indirect quotation form',
      questions: [
        {
          prompt: '민수가 "학교에 가요"라고 말했어요. → 民秀说……', promptEn: 'Minsu said, "I go to school." → Minsu said...',
          options: ['학교에 간다고 했어요', '학교에 가느냐고 했어요', '학교에 가자고 했어요', '학교에 가라고 했어요'],
          answer: 0,
          explanation: '陈述句转述用 -는/ㄴ다고 하다，动词无받침 → 간다고 했어요。', explanationEn: 'For reporting statements, use -는/ㄴ다고 하다; verb with no 받침 → 간다고 했어요.',
        },
        {
          prompt: '민수가 "어디에 살아요?"라고 물었어요. → 民秀问……', promptEn: 'Minsu asked, "Where do you live?" → Minsu asked...',
          options: ['어디에 산다고 물었어요', '어디에 사냐고 물었어요', '어디에 살자고 물었어요', '어디에 살라고 물었어요'],
          answer: 1,
          explanation: '疑问句转述用 -냐고 하다/물어보다 → 사냐고 물었어요。', explanationEn: 'For questions, use -냐고 하다/물어보다 → 사냐고 물었어요.',
        },
        {
          prompt: '민수가 "같이 갑시다"라고 했어요. → 民秀说……', promptEn: 'Minsu said, "Let\'s go together." → Minsu said...',
          options: ['같이 간다고 했어요', '같이 가느냐고 했어요', '같이 가자고 했어요', '같이 가라고 했어요'],
          answer: 2,
          explanation: '共动/建议句转述用 -자고 하다 → 가자고 했어요。', explanationEn: 'For suggestions, use -자고 하다 → 가자고 했어요.',
        },
        {
          prompt: '그가 벌써 (가다) 놀랐어요. 表达惊讶', promptEn: 'He was surprised that (someone) already (go). Expressing surprise',
          options: ['간다니', '가느니', '가자니', '갔다니'],
          answer: 3,
          explanation: '"已经走了"是过去，惊讶用 -았/었다니 → 갔다니。', explanationEn: '"Already left" is past; for surprise, use -았/었다니 → 갔다니.',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P25 总结：高级引用与转述</div>
  <div style="font-size:14px;color:#89756e">完整间接引用系统</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四大基本引用</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      陈述 → <b>-는/ㄴ다고/-다고/-(이)라고 하다</b><br>
      疑问 → <b>-냐고 하다</b><br>
      共动 → <b>-자고 하다</b><br>
      命令 → <b>-(으)라고 하다</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">派生用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-다고 해서 / -다길래</b> → 听说……所以……<br>
      <b>-다면서? / -다면서요?</b> → 听说是……对吗？<br>
      <b>-다니 / -다니요</b> → 居然……（表达惊讶）<br>
      <b>-다는 N</b> → 说……的（冠形）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">核心易错</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 疑问用 -냐고，不用 -다고<br>
      2. 建议用 -자고，不用 -다고<br>
      3. 命令用 -(으)라고，不用 -다고<br>
      4. 名词无받침用 -라고 / -라니 / -라는
    </div>
  </div>
</div>`,
  },

];
