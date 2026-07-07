import type { GrammarCard } from '@/types';

export const grammarCardsP25: GrammarCard[] = [
  // ── 第1课：-는다고/-ㄴ다고/-다고/이라고 하다（间接陈述） ─────────
  {
    id: 'card-p25-l01',
    partNumber: 25,
    lessonNumber: 1,
    title: '-는다고/-ㄴ다고/-다고/이라고 하다',
    whatItDoes: '"（某人）说……"',
    whatItDoesBody: '把别人的原话转述给第三者，就是"间接引用"。\n韩语间接引用比中文更严格：动词、形容词、名词各有自己的形态。\n这一课把陈述句的间接引用四种基本形态一次讲清。',
    structureNote: '陈述句间接引用结构：\n动词现在（有받침）→ -는다고 하다\n动词现在（无받침）→ -ㄴ다고 하다\n动词过去 → -았/었다고 하다\n形容词 → -다고 하다\n名词 → -(이)라고 하다',
    rulesNote: '核心规则：\n1. 直接引语的敬语级要"脱下"再"重穿" → 하다 层级决定\n2. 时态在动词/形容词上标，而不是在 하다 上\n3. 名词用 -(이)라고，不用 -다고\n4. 하다 可以变 → 그러다 / 그랬다 / 물어보다 等',
    structures: [
      {
        ko: '민수가 학교에 간다고 해요.',
        zh: '民秀说他去学校。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '간다고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '언니가 밥을 먹는다고 했어요.',
        zh: '姐姐说要吃饭。',
        tokens: [
          { text: '언니가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹는다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨가 춥다고 해요.',
        zh: '（有人）说今天天气冷。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '춥다고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '저 사람이 한국 사람이라고 했어요.',
        zh: '那个人说他是韩国人。',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '한국 사람이라고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在时有收音 → -는다고 하다', examples: '먹다 → 먹는다고 / 읽다 → 읽는다고' },
      { type: 'rule', text: '动词现在时无收音 → -ㄴ다고 하다', examples: '가다 → 간다고 / 오다 → 온다고' },
      { type: 'rule', text: '动词过去时 → -았/었다고 하다', examples: '먹었다고 / 갔다고 / 만났다고' },
      { type: 'rule', text: '形容词 → -다고 하다（不加 ㄴ/는）', examples: '춥다 → 춥다고 / 예쁘다 → 예쁘다고' },
      { type: 'rule', text: '名词 + (이)라고 하다', examples: '학생이라고 / 의사라고 / 회사원이라고' },
      { type: 'note', text: '하다 是主动词，可以按敬语和时态自由变化', examples: '한다 / 해요 / 했어요 / 하셨어요' },
      { type: 'compare', text: '和 直接引用 差别：直接引语保留原话敬语；间接引语把敬语脱下', examples: '"가요" 하고 말했어요 → 간다고 했어요' },
      { type: 'usage', text: '常用简写形态：-대（-다고 해 → -대）· -는대 · -래', examples: '간대 / 먹는대 / 학생이래' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '온다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '民秀说明天来。',
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
        zh: '姐姐说喜欢韩国菜。',
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
        zh: '听说这家咖啡馆很有名。',
        swapRole: 'verb',
        swapWords: ['유명하다고', '맛있다고', '분위기가 좋다고'],
      },
    ],
    scenarios: [
      { icon: '📞', context: '转达消息', ko: '어머니가 곧 도착한다고 하셨어요.', zh: '妈妈说马上就到。' },
      { icon: '📢', context: '新闻', ko: '뉴스에서 내일 비가 온다고 해요.', zh: '新闻说明天下雨。' },
      { icon: '💬', context: '别人评价', ko: '친구가 그 영화가 재미있다고 했어요.', zh: '朋友说那部电影有意思。' },
      { icon: '🏫', context: '身份介绍', ko: '저 사람이 새로 온 선생님이라고 해요.', zh: '（有人）说那位是新来的老师。' },
      { icon: '🌡️', context: '天气转述', ko: '뉴스에서 다음 주부터 춥다고 했어요.', zh: '新闻说下周开始变冷。' },
      { icon: '🍰', context: '过去经历', ko: '언니는 어제 케이크를 만들었다고 했어요.', zh: '姐姐说昨天做了蛋糕。' },
    ],
    mistakes: [
      { wrong: '민수가 학교에 가다고 해요.', correct: '민수가 학교에 간다고 해요.', note: '动词现在时无收音 → -ㄴ다고，不能直接 -다고。' },
      { wrong: '언니가 밥을 먹다고 했어요.', correct: '언니가 밥을 먹는다고 했어요.', note: '动词现在时有收音 → -는다고，不能直接 -다고。' },
      { wrong: '오늘 날씨가 춥는다고 해요.', correct: '오늘 날씨가 춥다고 해요.', note: '形容词不加 -는/-ㄴ，直接 -다고。' },
      { wrong: '저 사람이 학생다고 해요.', correct: '저 사람이 학생이라고 해요.', note: '名词用 -(이)라고 하다，不用 -다고。' },
    ],
    quickTable: {
      title: '陈述句间接引用总表',
      body: '按词类和时态选择正确形态。',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '현재·받침○', zh: '现在有收音' }, '-는다고 하다', '먹는다고 해요'],
        [{ ko: '동사', zh: '动词' }, { ko: '현재·받침×', zh: '现在无收音' }, '-ㄴ다고 하다', '간다고 해요'],
        [{ ko: '동사', zh: '动词' }, { ko: '과거', zh: '过去' }, '-았/었다고 하다', '갔다고 해요'],
        [{ ko: '형용사', zh: '形容词' }, { ko: '현재', zh: '现在' }, '-다고 하다', '춥다고 해요'],
        [{ ko: '명사', zh: '名词' }, { ko: '현재', zh: '现在' }, '-(이)라고 하다', '학생이라고 해요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '陈述句间接引用变形',
      body: '把直接引语改成间接引用。',
      questions: [
        {
          prompt: '"저는 한국에 가요." → 민수가 한국에 ___ 했어요.',
          options: ['가다고', '간다고', '가는다고', '갔다고'],
          answer: 1,
          explanation: '动词 가다 现在时无收音 → -ㄴ다고 → 간다고。',
        },
        {
          prompt: '"저는 밥을 먹어요." → 언니가 밥을 ___ 했어요.',
          options: ['먹다고', '먹는다고', '먹은다고', '먹었다고'],
          answer: 1,
          explanation: '动词 먹다 现在时有收音 → -는다고 → 먹는다고。',
        },
        {
          prompt: '"이 옷은 예뻐요." → 친구가 이 옷이 ___ 했어요.',
          options: ['예쁘는다고', '예쁘ㄴ다고', '예쁘다고', '예쁜다고'],
          answer: 2,
          explanation: '形容词直接 -다고 → 예쁘다고。形容词不加 -는/-ㄴ。',
        },
        {
          prompt: '"저는 학생입니다." → 저 분이 ___ 했어요.',
          options: ['학생이다고', '학생다고', '학생이라고', '학생인다고'],
          answer: 2,
          explanation: '名词用 -(이)라고 하다 → 有收音 학생이라고。',
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
    compareLabel: '直接引用 vs 间接引用',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第 1 课</div>
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
    whatItDoes: '"（某人）问……"',
    whatItDoesBody: '把别人的问句转述给第三者，用 -냐고 하다 / -느냐고 하다。\n"你要不要来？" → 그가 오냐고 물었어요.\n口语中动词和形容词都可直接用 -냐고，书面偏正规则再区分。',
    structureNote: '结构（口语通用）：\n动词/形容词现在 → -냐고 하다\n动词/形容词过去 → -았/었냐고 하다\n名词 → -(이)냐고 하다\n\n书面规则版：动词 -느냐고，形容词 -(으)냐고。',
    rulesNote: '要点：\n1. 하다 可以换 물어보다 / 궁금해하다 表"问/好奇"\n2. 疑问词（뭐, 언제, 어디, 왜）可以夹在中间\n3. 简写：-냬（-냐고 해 → -냬）\n4. 名词后必须加 -(이)냐고，不用 -냐고',
    structures: [
      {
        ko: '민수가 어디에 가냐고 물었어요.',
        zh: '民秀问（我）去哪里。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '어디에', role: 'place' },
          { text: '가냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '언니가 밥을 먹었냐고 해요.',
        zh: '姐姐问（我）吃饭没。',
        tokens: [
          { text: '언니가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹었냐고', role: 'verb' },
          { text: '해요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 오늘 날씨가 어떠냐고 했어요.',
        zh: '朋友问今天天气怎么样。',
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
        zh: '（有人）问那位是不是学生。',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '학생이냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '口语通用：动词/形容词现在 → -냐고 하다', examples: '가냐고 / 먹냐고 / 예쁘냐고' },
      { type: 'rule', text: '过去时 → -았/었냐고 하다', examples: '갔냐고 / 먹었냐고 / 예뻤냐고' },
      { type: 'rule', text: '名词 → -(이)냐고 하다', examples: '학생이냐고 / 의사냐고' },
      { type: 'usage', text: '常配合疑问词：뭐/언제/어디/왜/누구/어떻게', examples: '언제 가냐고 / 왜 안 오냐고' },
      { type: 'usage', text: '하다 可换 물어보다 / 궁금해하다', examples: '어디 가냐고 물어봤어요 / 궁금해했어요' },
      { type: 'note', text: '书面正规版：动词 -느냐고，形容词 -(으)냐고', examples: '먹느냐고 / 예쁘냐고 / 좋으냐고' },
      { type: 'compare', text: '-냐고 vs -다고：-냐고 是问句，-다고 是陈述句', examples: '오냐고 물었어요（问） / 온다고 했어요（陈述）' },
      { type: 'example', text: '简写 -냬：언제 오냬? / 왜 안 먹었냬?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '언제', role: 'time' },
          { text: '오냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '民秀问什么时候来。',
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
        zh: '妈妈问吃饭了没。',
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
        zh: '朋友问为什么迟到。',
        swapRole: 'verb',
        swapWords: ['늦었냐고', '안 왔냐고', '못 갔냐고'],
      },
    ],
    scenarios: [
      { icon: '❓', context: '问计划', ko: '민수가 이번 주말에 뭐 하냐고 물었어요.', zh: '民秀问这周末做什么。' },
      { icon: '🍚', context: '问饭', ko: '엄마가 밥 먹었냐고 하셨어요.', zh: '妈妈问吃饭了没。' },
      { icon: '🌤️', context: '问天气', ko: '친구가 오늘 날씨가 어떠냐고 했어요.', zh: '朋友问今天天气怎么样。' },
      { icon: '💼', context: '问工作', ko: '동료가 새로운 프로젝트가 힘드냐고 물었어요.', zh: '同事问新项目累不累。' },
      { icon: '🏥', context: '问健康', ko: '의사 선생님이 어디가 아프냐고 물으셨어요.', zh: '医生问哪里不舒服。' },
      { icon: '📱', context: '简写口语', ko: '뭐 하냬? 답장 좀 해.', zh: '（他）问你在干嘛，快回信。' },
    ],
    mistakes: [
      { wrong: '민수가 어디에 가다고 물었어요.', correct: '민수가 어디에 가냐고 물었어요.', note: '疑问句用 -냐고，不能用 -다고 (那是陈述)。' },
      { wrong: '엄마가 밥 먹었다고 물었어요.', correct: '엄마가 밥 먹었냐고 물었어요.', note: '"问……了没" 是疑问 → -았/었냐고。' },
      { wrong: '저 사람이 학생냐고 해요.', correct: '저 사람이 학생이냐고 해요.', note: '名词有收音时用 -이냐고。' },
      { wrong: '민수가 오는다고 물었어요.', correct: '민수가 오냐고 물었어요.', note: '疑问句直接用 -냐고，不加 -는/-ㄴ。' },
    ],
    quickTable: {
      title: '疑问句间接引用总表',
      body: '口语通用版，学习者优先记这一列。',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '현재', zh: '现在' }, '-냐고 하다', '가냐고 / 먹냐고'],
        [{ ko: '형용사', zh: '形容词' }, { ko: '현재', zh: '现在' }, '-냐고 하다', '예쁘냐고 / 좋냐고'],
        [{ ko: '동사·형용사', zh: '动/形' }, { ko: '과거', zh: '过去' }, '-았/었냐고 하다', '갔냐고 / 예뻤냐고'],
        [{ ko: '명사', zh: '名词' }, { ko: '현재', zh: '现在' }, '-(이)냐고 하다', '학생이냐고 / 의사냐고'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '疑问句间接引用变形',
      body: '把直接问句改成间接疑问。',
      questions: [
        {
          prompt: '"언제 오세요?" → 민수가 언제 ___ 물었어요.',
          options: ['온다고', '오는다고', '오냐고', '오라고'],
          answer: 2,
          explanation: '"什么时候来?" 是疑问句 → -냐고 → 오냐고。',
        },
        {
          prompt: '"밥 먹었어?" → 엄마가 밥 ___ 하셨어요.',
          options: ['먹는다고', '먹었냐고', '먹었다고', '먹으라고'],
          answer: 1,
          explanation: '"吃饭没?" 是过去疑问 → -았/었냐고 → 먹었냐고。',
        },
        {
          prompt: '"학생입니까?" → 저 분이 ___ 물어봤어요.',
          options: ['학생이다고', '학생다고', '학생이냐고', '학생이라고'],
          answer: 2,
          explanation: '名词疑问 → -이냐고 → 학생이냐고。학생이라고 是陈述"（说）是学生"。',
        },
        {
          prompt: '"오늘 날씨가 어때요?" → 친구가 오늘 날씨가 ___ 했어요.',
          options: ['어떻다고', '어떠냐고', '어떠다고', '어떻는다고'],
          answer: 1,
          explanation: '"怎么样?" 是形容词疑问 → 어떠냐고。',
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
    <div class="ov-hero-label">P19 · 第 2 课</div>
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
    whatItDoes: '"（某人）提议一起……"',
    whatItDoesBody: '把别人的"我们一起……吧"这种共动/建议句转述给第三者，用 -자고 하다。\n"같이 밥 먹자." → 친구가 같이 밥 먹자고 했어요.\n只接动词，不接形容词或名词。',
    structureNote: '结构：\n动词现在 → -자고 하다\n否定 → -지 말자고 하다\n名词 × / 形容词 × （不能用）\n\n하다 可换 제안하다 / 권하다。',
    rulesNote: '要点：\n1. 只接动词，且必须是共同动作（一起做的动作）\n2. 说话人和听话人都可以是执行者\n3. 否定用 -지 말자고 하다（"我们不要……吧"）\n4. 简写：-쟤（-자고 해 → -쟤）',
    structures: [
      {
        ko: '친구가 같이 영화 보자고 했어요.',
        zh: '朋友说一起看电影吧。',
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
        zh: '弟弟说今天不要出门了。',
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
        zh: '民秀提议周末去玩。',
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
      { type: 'rule', text: '动词 + 자고 하다 → "（某人提议）一起……"', examples: '가자고 / 먹자고 / 만나자고' },
      { type: 'rule', text: '否定：-지 말자고 하다', examples: '가지 말자고 / 먹지 말자고' },
      { type: 'rule', text: '只接动词，不能接形容词/名词', examples: '× 예쁘자고 / × 학생자고' },
      { type: 'usage', text: '前后主语通常是"我们"（我和听话人）', examples: '같이 가자고 / 우리 만나자고' },
      { type: 'usage', text: '하다 可换 제안하다 / 권하다 / 얘기하다', examples: '가자고 제안했어요 / 만나자고 얘기했어요' },
      { type: 'note', text: '简写 -쟤：같이 가쟤! / 놀러 가쟤!', examples: '민수가 같이 밥 먹쟤' },
      { type: 'compare', text: '-자고 vs -(으)라고：-자고 是共动"一起"；-(으)라고 是命令"你去做"', examples: '같이 가자고（一起）vs 가라고（你去）' },
      { type: 'example', text: '친구가 같이 커피 마시자고 했어요 / 오늘은 놀지 말자고 해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '주말에', role: 'time' },
          { text: '만나자고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友说周末见面吧。',
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
        zh: '民秀说今天别出门了。',
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
        zh: '姐姐提议一起学韩语。',
        swapRole: 'verb',
        swapWords: ['배우자고', '공부하자고', '연습하자고'],
      },
    ],
    scenarios: [
      { icon: '🎬', context: '约看电影', ko: '친구가 이번 주말에 영화 보자고 했어요.', zh: '朋友说这周末看电影吧。' },
      { icon: '☕', context: '约喝咖啡', ko: '민수가 카페에서 만나자고 해요.', zh: '民秀说在咖啡馆见面吧。' },
      { icon: '🚫', context: '否定提议', ko: '엄마가 오늘은 외식하지 말자고 하셨어요.', zh: '妈妈说今天别在外面吃了。' },
      { icon: '📚', context: '共同学习', ko: '언니가 같이 도서관 가자고 제안했어요.', zh: '姐姐提议一起去图书馆。' },
      { icon: '🏃', context: '一起运动', ko: '동료가 점심시간에 걷자고 해요.', zh: '同事说午休时间一起走走吧。' },
      { icon: '💬', context: '口语简写', ko: '민수가 밥 먹쟤!', zh: '民秀说一起吃饭！' },
    ],
    mistakes: [
      { wrong: '친구가 영화 봐자고 했어요.', correct: '친구가 영화 보자고 했어요.', note: '直接接动词词干 + -자고，不用 -어자고。' },
      { wrong: '민수가 예쁘자고 했어요.', correct: '민수가 예쁘다고 했어요.', note: '-자고 只接动词，不接形容词。若表"说漂亮"用 -다고。' },
      { wrong: '오늘은 안 가자고 해요.', correct: '오늘은 가지 말자고 해요.', note: '共动的否定用 -지 말자고，不是 안 -자고。' },
      { wrong: '민수가 학생자고 했어요.', correct: '민수가 학생이라고 했어요.', note: '-자고 不接名词。名词陈述用 -(이)라고。' },
    ],
    quickTable: {
      title: '共动/建议句间接引用',
      body: '只接动词。',
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
      title: '共动句间接引用变形',
      body: '把提议句改成间接引用。',
      questions: [
        {
          prompt: '"같이 밥 먹자." → 친구가 같이 밥 ___ 했어요.',
          options: ['먹다고', '먹는다고', '먹자고', '먹으라고'],
          answer: 2,
          explanation: '"我们一起吃饭吧" 是共动 → -자고。먹다 → 먹자고。',
        },
        {
          prompt: '"오늘은 나가지 말자." → 엄마가 오늘은 ___ 하셨어요.',
          options: ['나가지 말자고', '안 나가자고', '나가지 말라고', '나가지 않자고'],
          answer: 0,
          explanation: '共动否定用 -지 말자고 → 나가지 말자고。',
        },
        {
          prompt: '哪句语法错？',
          options: [
            '친구가 같이 가자고 했어요.',
            '민수가 놀러 가자고 제안했어요.',
            '엄마가 예쁘자고 하셨어요.',
            '언니가 만나자고 해요.',
          ],
          answer: 2,
          explanation: '-자고 只接动词，"예쁘다" 是形容词 → 错。',
        },
        {
          prompt: '"우리 공부하자." → 언니가 같이 ___ 해요.',
          options: ['공부한다고', '공부하냐고', '공부하자고', '공부하라고'],
          answer: 2,
          explanation: '"我们一起学吧" 共动 → -자고 → 공부하자고。',
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
    <div class="ov-hero-label">P19 · 第 3 课</div>
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
    whatItDoes: '"（某人）叫别人做……"',
    whatItDoesBody: '把命令句"你去做！"转述给第三者，用 -(으)라고 하다。\n"빨리 와!" → 엄마가 빨리 오라고 하셨어요.\n只接动词，且执行者是听话人（不是说话人自己）。',
    structureNote: '结构：\n动词有收音 → -으라고 하다\n动词无收音 → -라고 하다\n否定 → -지 말라고 하다\n\n名词 × / 形容词 × （命令不接名词、形容词）',
    rulesNote: '要点：\n1. 只接动词，执行者是听话人\n2. 有收音加 -으라고，无收音加 -라고\n3. 否定 -지 말라고 하다 ("别做")\n4. 特殊动词 주다 → 달라고 하다（要求给自己）/ 주라고 하다（要求给别人）',
    structures: [
      {
        ko: '엄마가 빨리 오라고 하셨어요.',
        zh: '妈妈叫（我）快点回来。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리', role: 'plain' },
          { text: '오라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 숙제를 하라고 하셨어요.',
        zh: '老师叫（我们）做作业。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '숙제를', role: 'object' },
          { text: '하라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '의사 선생님이 매일 운동하라고 했어요.',
        zh: '医生叫（我）每天运动。',
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
        zh: '妈妈叫（我）别剩饭。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '남기지 말라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词无收音 → -라고 하다', examples: '가다 → 가라고 / 오다 → 오라고' },
      { type: 'rule', text: '动词有收音 → -으라고 하다', examples: '먹다 → 먹으라고 / 읽다 → 읽으라고' },
      { type: 'rule', text: '否定 → -지 말라고 하다', examples: '가지 말라고 / 먹지 말라고 / 남기지 말라고' },
      { type: 'rule', text: '不接形容词/名词（命令句语义限制）', examples: '× 예쁘라고 / × 학생이라고 하다（这个是陈述）' },
      { type: 'usage', text: '주다 特殊变形：向自己讨用 달라고 / 向他人讨用 주라고', examples: '내게 달라고 했어요 / 민수한테 주라고 했어요' },
      { type: 'note', text: '简写：-래 (-라고 해 → -래)', examples: '빨리 오래! / 숙제 하래!' },
      { type: 'compare', text: '-(으)라고 vs -자고：命令(听话人做) vs 共动(一起做)', examples: '가라고（你去）vs 가자고（一起去）' },
      { type: 'example', text: '엄마가 빨리 오라고 하셨어요 / 조용히 하라고 했어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리', role: 'plain' },
          { text: '자라고', role: 'verb' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈叫（我）快去睡。',
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
        zh: '老师叫（我们）读书。',
        swapRole: 'verb',
        swapWords: ['읽으라고', '풀으라고', '외우라고'],
      },
      {
        wordBlocks: [
          { text: '의사가', role: 'subject' },
          { text: '술을', role: 'object' },
          { text: '마시지 말라고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '医生叫（我）别喝酒。',
        swapRole: 'verb',
        swapWords: ['마시지 말라고', '먹지 말라고', '피우지 말라고'],
      },
    ],
    scenarios: [
      { icon: '⏰', context: '妈妈催促', ko: '엄마가 빨리 일어나라고 하셨어요.', zh: '妈妈叫快点起床。' },
      { icon: '📖', context: '老师布置', ko: '선생님이 책을 미리 읽으라고 하셨어요.', zh: '老师让（我们）提前读书。' },
      { icon: '🏥', context: '医嘱', ko: '의사 선생님이 술을 마시지 말라고 했어요.', zh: '医生叫我戒酒。' },
      { icon: '🚫', context: '禁止', ko: '아빠가 늦게 자지 말라고 하셨어요.', zh: '爸爸叫我别晚睡。' },
      { icon: '💬', context: '简写', ko: '엄마가 밥 먹으래!', zh: '妈妈叫吃饭啦！' },
      { icon: '🎁', context: '要东西', ko: '동생이 새 옷을 사 달라고 했어요.', zh: '弟弟让（我）买件新衣服（给他自己）。' },
    ],
    mistakes: [
      { wrong: '엄마가 빨리 오다고 하셨어요.', correct: '엄마가 빨리 오라고 하셨어요.', note: '命令句用 -(으)라고，오다 无收音 → 오라고。-다고 是陈述。' },
      { wrong: '선생님이 책을 읽라고 하셨어요.', correct: '선생님이 책을 읽으라고 하셨어요.', note: '읽다 有收音 → -으라고 → 읽으라고。' },
      { wrong: '엄마가 밥을 안 남기라고 하셨어요.', correct: '엄마가 밥을 남기지 말라고 하셨어요.', note: '命令否定用 -지 말라고 하다。' },
      { wrong: '민수가 볼펜을 주라고 했어요.', correct: '민수가 볼펜을 달라고 했어요.', note: '"要给自己"用 달라고 하다；"要给他人"才用 주라고 하다。' },
    ],
    quickTable: {
      title: '命令句间接引用',
      body: '只接动词，执行者是听话人。',
      headers: ['前项', '形式', '否定', '例'],
      rows: [
        [{ ko: '동사·받침×', zh: '动词无收音' }, '-라고 하다', '-지 말라고 하다', '오라고 / 오지 말라고'],
        [{ ko: '동사·받침○', zh: '动词有收音' }, '-으라고 하다', '-지 말라고 하다', '읽으라고 / 읽지 말라고'],
        [{ ko: '주다·자기', zh: '要给自己' }, '달라고 하다', '주지 말라고', '나한테 달라고'],
        [{ ko: '주다·타인', zh: '要给他人' }, '주라고 하다', '주지 말라고', '민수한테 주라고'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '命令句间接引用变形',
      body: '把命令句改成间接引用。',
      questions: [
        {
          prompt: '"빨리 와!" → 엄마가 빨리 ___ 하셨어요.',
          options: ['온다고', '오냐고', '오라고', '오자고'],
          answer: 2,
          explanation: '命令句 → -(으)라고 하다。오다 无收音 → 오라고。',
        },
        {
          prompt: '"책을 읽어라." → 선생님이 책을 ___ 하셨어요.',
          options: ['읽는다고', '읽으라고', '읽라고', '읽자고'],
          answer: 1,
          explanation: '읽다 有收音 → -으라고 → 읽으라고。',
        },
        {
          prompt: '"술 마시지 마." → 의사가 술을 ___ 했어요.',
          options: ['안 마시라고', '마시지 마라고', '마시지 말라고', '마시지 못하라고'],
          answer: 2,
          explanation: '命令否定用 -지 말라고 하다 → 마시지 말라고。',
        },
        {
          prompt: '"저한테 그거 좀 주세요." → 민수가 나에게 그것을 ___ 했어요.',
          options: ['주라고', '달라고', '드리라고', '가지라고'],
          answer: 1,
          explanation: '"要给自己（说话人）"用 달라고 하다，不用 주라고。',
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
    <div class="ov-hero-label">P19 · 第 4 课</div>
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
    whatItDoes: '"听说……所以……"',
    whatItDoesBody: '别人说的话成为"我做某事"的依据，用 -다고 해서 或 -는다길래。\n"听说那家咖啡有名，所以我去了"。\n-다고 해서 中性通用，-는다길래 口语生动。',
    structureNote: '结构：\n动词现在 → -는다고 해서 / -는다길래（无收音 -ㄴ다길래）\n动词过去 → -았/었다고 해서 / -았/었다길래\n形容词 → -다고 해서 / -다길래\n名词 → -(이)라고 해서 / -(이)라길래',
    rulesNote: '要点：\n1. 前项是"听/得知"的内容，后项是自己的反应\n2. -다고 해서：书面·中性；-는다길래：口语·带感情\n3. -는다길래 前后主语必须不同（听说的和做的不是同一人）\n4. 后半常表意外/理由/反应',
    structures: [
      {
        ko: '민수가 온다고 해서 기다렸어요.',
        zh: '听说民秀要来，我就等了。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '온다고 해서', role: 'verb' },
          { text: '기다렸어요', role: 'verb' },
        ],
      },
      {
        ko: '그 카페가 유명하다길래 가 봤어요.',
        zh: '听说那家咖啡馆有名，就去看了看。',
        tokens: [
          { text: '그 카페가', role: 'subject' },
          { text: '유명하다길래', role: 'verb' },
          { text: '가 봤어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 비 온다길래 우산을 챙겼어요.',
        zh: '听说今天下雨，就带了伞。',
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
      { type: 'rule', text: '陈述内容 + 해서/길래 表"听说……所以……"', examples: '온다고 해서 / 온다길래' },
      { type: 'rule', text: '动词现在 → -는다고/ㄴ다고 해서 / -는다길래/ㄴ다길래', examples: '먹는다고 해서 / 간다길래' },
      { type: 'rule', text: '形容词 → -다고 해서 / -다길래', examples: '유명하다고 해서 / 춥다길래' },
      { type: 'rule', text: '名词 → -(이)라고 해서 / -(이)라길래', examples: '학생이라고 해서 / 의사라길래' },
      { type: 'usage', text: '-는다길래 是口语，带一丝"我因为听了才做"的私人感', examples: '맛있다길래 사 봤어요' },
      { type: 'note', text: '-는다길래 前后主语要不同', examples: '민수가 온다길래 (내가) 기다렸어요 ✓ / (내가) 간다길래 갔어요 ✗' },
      { type: 'compare', text: '-다고 해서 vs -기 때문에：前者是"因听说"，后者是"直接原因"', examples: '온다고 해서 기다렸어요 / 왔기 때문에 기다렸어요' },
      { type: 'example', text: '뉴스에서 비 온다고 해서 우산 챙겼어요 / 맛있다길래 시켰어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '온다고 해서', role: 'verb' },
          { text: '기다렸어요', role: 'verb' },
        ],
        zh: '听说民秀要来，就等了。',
        swapRole: 'verb',
        swapWords: ['온다고 해서', '온다길래', '오신다고 해서'],
      },
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '예쁘다길래', role: 'verb' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '听说这件衣服漂亮，就买了。',
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
        zh: '新闻说要下雨，就带了伞。',
        swapRole: 'verb',
        swapWords: ['온다고 해서', '내린다고 해서', '쏟아진다고 해서'],
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气预报', ko: '뉴스에서 비 온다고 해서 우산 챙겼어요.', zh: '新闻说下雨，就带了伞。' },
      { icon: '☕', context: '朋友推荐', ko: '그 카페가 유명하다길래 가 봤어요.', zh: '听说那家咖啡有名就去看了。' },
      { icon: '📱', context: '网评好评', ko: '이 이어폰이 좋다고 해서 샀어요.', zh: '听说这耳机好，就买了。' },
      { icon: '🚫', context: '为避坑', ko: '길이 막힌다길래 지하철로 왔어요.', zh: '听说堵车，就坐地铁来了。' },
      { icon: '🎬', context: '看电影原因', ko: '재미있다고 해서 봤는데 별로였어요.', zh: '听说好看去看了但一般。' },
      { icon: '📞', context: '得知消息', ko: '민수가 아프다길래 병문안 갔어요.', zh: '听说民秀生病了就去探病。' },
    ],
    mistakes: [
      { wrong: '민수가 온다고 해서 왔어요.', correct: '민수가 온다고 해서 기다렸어요.', note: '"听说民秀来我就来了"逻辑颠倒。민수来是前项，"我"的反应应是接他/等他。' },
      { wrong: '내가 온다길래 갔어요.', correct: '민수가 온다길래 (내가) 갔어요.', note: '-길래 前后主语要不同。' },
      { wrong: '유명한다고 해서 갔어요.', correct: '유명하다고 해서 갔어요.', note: '形容词不加 -ㄴ다고，直接 -다고。' },
      { wrong: '학생다고 해서 할인을 받았어요.', correct: '학생이라고 해서 할인을 받았어요.', note: '名词用 -(이)라고 해서。' },
    ],
    quickTable: {
      title: '"听说……所以……"两种表达',
      body: '中性 vs 口语。',
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
      title: '"听说……所以……" 选择',
      body: '选择自然的说法。',
      questions: [
        {
          prompt: '"听说那家餐厅有名就去了"最自然：',
          options: [
            '그 식당이 유명한다고 해서 갔어요.',
            '그 식당이 유명하다고 해서 갔어요.',
            '그 식당이 유명자고 해서 갔어요.',
            '그 식당이 유명이라고 해서 갔어요.',
          ],
          answer: 1,
          explanation: '形容词 유명하다 → -다고 해서 → 유명하다고 해서。',
        },
        {
          prompt: '哪句语法/语义正确？',
          options: [
            '(내가) 온다길래 (내가) 갔어요.',
            '민수가 온다길래 내가 기다렸어요.',
            '민수가 온다고 해서 민수가 왔어요.',
            '내가 간다고 해서 내가 갔어요.',
          ],
          answer: 1,
          explanation: '-길래 前后主语要不同；A、C、D 主语相同或语义矛盾。',
        },
        {
          prompt: '"听说是学生就打折了"应该填：___ 할인해 줬어요.',
          options: ['학생이라고 해서', '학생다고 해서', '학생이자고 해서', '학생인다고 해서'],
          answer: 0,
          explanation: '名词 → -(이)라고 해서 → 학생이라고 해서。',
        },
        {
          prompt: '"新闻说下雨就带了伞"最自然：',
          options: [
            '뉴스에서 비 오라고 해서 우산 챙겼어요.',
            '뉴스에서 비 오냐고 해서 우산 챙겼어요.',
            '뉴스에서 비 온다고 해서 우산 챙겼어요.',
            '뉴스에서 비 오자고 해서 우산 챙겼어요.',
          ],
          answer: 2,
          explanation: '陈述内容 → -는다/ㄴ다고 해서，오다 无收音 → 온다고 해서。',
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
    <div class="ov-hero-label">P19 · 第 5 课</div>
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
    whatItDoes: '"听说是……对吗？"',
    whatItDoesBody: '把听到的传闻拿去向本人或他人求证，用 -다면서? / -다면서요?。\n"听说你考上了大学？" → 대학교 합격했다면서요?\n带有惊讶/兴奋/确认的语气。',
    structureNote: '结构（问句·带 ? 号）：\n动词现在 → -는다면서?/ㄴ다면서?\n动词过去 → -았/었다면서?\n形容词 → -다면서?\n名词 → -(이)라면서?\n\n敬语加 -요：-다면서요?',
    rulesNote: '要点：\n1. 语气：既有"确认"又有"惊喜/意外"\n2. 只用于问句（有 ? 号）\n3. 一般用 -다면서요? 而不是 -다면서? （尊敬对方时）\n4. 对话中简写 -다며? / -다며요?',
    structures: [
      {
        ko: '민수 씨, 결혼한다면서요?',
        zh: '民秀，听说你要结婚了？',
        tokens: [
          { text: '민수 씨,', role: 'subject' },
          { text: '결혼한다면서요?', role: 'verb' },
        ],
      },
      {
        ko: '어제 부산에 갔다면서요?',
        zh: '听说你昨天去釜山了？',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '부산에', role: 'place' },
          { text: '갔다면서요?', role: 'verb' },
        ],
      },
      {
        ko: '이 옷이 요즘 유행이라면서요?',
        zh: '听说这件衣服最近很流行？',
        tokens: [
          { text: '이 옷이', role: 'subject' },
          { text: '요즘', role: 'time' },
          { text: '유행이라면서요?', role: 'plain' },
        ],
      },
      {
        ko: '그 식당이 그렇게 맛있다면서?',
        zh: '听说那家餐厅那么好吃？',
        tokens: [
          { text: '그 식당이', role: 'subject' },
          { text: '그렇게', role: 'plain' },
          { text: '맛있다면서?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 → -는다면서? / -ㄴ다면서?', examples: '먹는다면서? / 간다면서?' },
      { type: 'rule', text: '动词过去 → -았/었다면서?', examples: '갔다면서? / 먹었다면서?' },
      { type: 'rule', text: '形容词 → -다면서?', examples: '예쁘다면서? / 좋다면서?' },
      { type: 'rule', text: '名词 → -(이)라면서?', examples: '학생이라면서? / 의사라면서?' },
      { type: 'usage', text: '敬语加 -요：-다면서요?', examples: '결혼한다면서요? / 예쁘다면서요?' },
      { type: 'usage', text: '带确认+惊喜/意外的复合语气', examples: '合격했다면서요? / 다음 주에 이사한다면서요?' },
      { type: 'note', text: '简写：-다며? / -다며요?', examples: '민수 결혼한다며? / 예쁘다며?' },
      { type: 'compare', text: '-다면서? vs -잖아요：前者求证；后者提醒对方已知信息', examples: '결혼한다면서요?（问） / 결혼하잖아요（提醒）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수 씨,', role: 'subject' },
          { text: '다음 달에', role: 'time' },
          { text: '결혼한다면서요?', role: 'verb' },
        ],
        zh: '民秀，听说你下个月结婚？',
        swapRole: 'verb',
        swapWords: ['결혼한다면서요?', '이사한다면서요?', '유학 간다면서요?'],
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '민수가', role: 'subject' },
          { text: '왔다면서?', role: 'verb' },
        ],
        zh: '听说民秀昨天来了？',
        swapRole: 'verb',
        swapWords: ['왔다면서?', '만났다면서?', '전화했다면서?'],
      },
      {
        wordBlocks: [
          { text: '그 식당이', role: 'subject' },
          { text: '진짜', role: 'plain' },
          { text: '맛있다면서요?', role: 'verb' },
        ],
        zh: '听说那家餐厅真的好吃？',
        swapRole: 'verb',
        swapWords: ['맛있다면서요?', '유명하다면서요?', '분위기가 좋다면서요?'],
      },
    ],
    scenarios: [
      { icon: '💍', context: '喜事求证', ko: '민수 씨, 결혼한다면서요? 축하해요!', zh: '民秀，听说你要结婚？恭喜！' },
      { icon: '🎓', context: '好消息', ko: '대학교 합격했다면서요? 진짜 축하해요!', zh: '听说考上大学了？真恭喜！' },
      { icon: '🏠', context: '搬家消息', ko: '다음 달에 이사한다면서요?', zh: '听说你下个月要搬家？' },
      { icon: '🍜', context: '好评求证', ko: '그 라면집이 그렇게 맛있다면서?', zh: '听说那家拉面店那么好吃？' },
      { icon: '🏋️', context: '习惯求证', ko: '요즘 매일 운동한다면서요?', zh: '听说你最近每天运动？' },
      { icon: '💬', context: '简写', ko: '민수 결혼한다며?', zh: '民秀要结婚了？' },
    ],
    mistakes: [
      { wrong: '민수 결혼한다면서요.', correct: '민수 결혼한다면서요?', note: '-다면서? 是问句，必须加问号，语调也是升调。' },
      { wrong: '민수가 결혼하다면서요?', correct: '민수가 결혼한다면서요?', note: '动词现在无收音 → -ㄴ다면서? → 결혼한다면서요?' },
      { wrong: '이 옷이 유행다면서요?', correct: '이 옷이 유행이라면서요?', note: '名词用 -(이)라면서?，不是 -다면서?。' },
      { wrong: '어제 갔는다면서요?', correct: '어제 갔다면서요?', note: '过去 -았/었다면서?，不加 -는。' },
    ],
    quickTable: {
      title: '-다면서? 一览',
      body: '求证 + 惊喜的问句。',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '현재', zh: '现在' }, '-는/ㄴ다면서?', '먹는다면서? / 간다면서?'],
        [{ ko: '동사', zh: '动词' }, { ko: '과거', zh: '过去' }, '-았/었다면서?', '갔다면서?'],
        [{ ko: '형용사', zh: '形容词' }, { ko: '현재', zh: '现在' }, '-다면서?', '예쁘다면서?'],
        [{ ko: '명사', zh: '名词' }, { ko: '현재', zh: '现在' }, '-(이)라면서?', '학생이라면서?'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-다면서? 变形',
      body: '选择正确形式。',
      questions: [
        {
          prompt: '"听说你要结婚？" → 민수 씨, ___',
          options: ['결혼한다면서요?', '결혼하다면서요?', '결혼하는다면서요?', '결혼자면서요?'],
          answer: 0,
          explanation: '动词 결혼하다 现在无收音 → -ㄴ다면서? → 결혼한다면서요?',
        },
        {
          prompt: '"听说昨天见了朋友？" → 어제 친구 ___',
          options: ['만난다면서요?', '만났다면서요?', '만나는다면서요?', '만나면서요?'],
          answer: 1,
          explanation: '过去时 → -았/었다면서? → 만났다면서요?',
        },
        {
          prompt: '"听说这件衣服流行？" → 이 옷이 ___',
          options: ['유행한다면서요?', '유행다면서요?', '유행이라면서요?', '유행자면서요?'],
          answer: 2,
          explanation: '유행 是名词 → -(이)라면서? → 유행이라면서요?',
        },
        {
          prompt: '"听说很好吃？" → 그 식당이 ___',
          options: ['맛있다면서요?', '맛있는다면서요?', '맛있자면서요?', '맛있이라면서요?'],
          answer: 0,
          explanation: '形容词 → -다면서? → 맛있다면서요?',
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
    <div class="ov-hero-label">P19 · 第 6 课</div>
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
    whatItDoes: '表达惊讶',
    whatItDoesBody: '「-다니 / -다니요」用于对听到的事实表示惊讶、感叹、意外或不敢相信，中文常译为"居然……""竟然……""怎么会……"。是间接引用 -다고 하다 的省略变形。',
    structureNote: '动词现在 -는/ㄴ다니 · 动词过去 -았/었다니 · 形容词 -다니 · 名词 -(이)라니。加"요"变敬语：-다니요',
    rulesNote: '动词现在（有받침）→ -는다니；动词现在（无받침）→ -ㄴ다니；动词过去 → -았/었다니；形容词 → -다니；名词（有받침）→ -이라니，（无받침）→ -라니',
    structures: [
      {
        ko: '그렇게 비싸다니 놀랐어요.',
        zh: '居然那么贵，我吃惊了。',
        tokens: [
          { text: '그렇게', role: 'plain' },
          { text: '비싸다니', role: 'verb' },
          { text: '놀랐어요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 벌써 갔다니요?',
        zh: '民秀居然已经走了？',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '갔다니요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 의사라니 믿을 수 없어요.',
        zh: '他居然是医生，真难以置信。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '의사라니', role: 'plain' },
          { text: '믿을 수 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：有받침 → -는다니 / 无받침 → -ㄴ다니', examples: '먹다 → 먹는다니 / 가다 → 간다니' },
      { type: 'rule', text: '动词过去：-았/었다니', examples: '갔다니, 먹었다니, 봤다니' },
      { type: 'rule', text: '形容词：-다니', examples: '예쁘다니, 크다니, 좋다니' },
      { type: 'rule', text: '名词：有받침 → -이라니 / 无받침 → -라니', examples: '학생이라니, 의사라니, 친구라니' },
      { type: 'usage', text: '语气核心是「惊讶/感叹/不敢相信」，不是转述', examples: '벌써 여름이라니! → 居然已经夏天了！' },
      { type: 'usage', text: '-다니요 是敬语形式，用于对长辈或对方表达惊讶', examples: '어머, 결혼하신다니요?' },
      { type: 'note', text: '句末可接感叹词或形容词表达情绪：놀랐어요 / 믿을 수 없어요 / 대단해요', examples: '이렇게 잘하다니 대단해요.' },
      { type: 'compare', text: '-다니 vs -다고요? → -다니 表惊讶，-다고요? 表反问/再确认', examples: '갔다니? 惊讶 / 갔다고요? 你说他走了？' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이렇게', role: 'plain' },
          { text: '늦게', role: 'plain' },
          { text: '오다니', role: 'verb' },
        ],
        zh: '居然这么晚才来。',
        swapWords: ['일찍', '빨리', '늦게', '이제야'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '그렇게', role: 'plain' },
          { text: '잘한다니요', role: 'verb' },
        ],
        zh: '民秀居然韩语说得那么好？',
        swapWords: ['잘한다니요', '못한다니요', '유창하다니요', '어렵다니요'],
      },
      {
        wordBlocks: [
          { text: '벌써', role: 'plain' },
          { text: '겨울이라니', role: 'plain' },
          { text: '시간이', role: 'subject' },
          { text: '빠르네요', role: 'verb' },
        ],
        zh: '居然已经冬天了，时间过得真快。',
        swapWords: ['겨울', '봄', '가을', '연말'],
      },
    ],
    scenarios: [
      { icon: '😲', context: '意外', ko: '그렇게 비싸다니 놀랐어요.', zh: '居然那么贵，我吃惊了。' },
      { icon: '🤯', context: '不敢相信', ko: '그 사람이 의사라니 믿을 수 없어요.', zh: '他居然是医生，真难以置信。' },
      { icon: '👏', context: '感叹', ko: '이렇게 잘하다니 대단해요.', zh: '居然做得这么好，太厉害了。' },
      { icon: '⏰', context: '时间流逝', ko: '벌써 겨울이라니, 시간이 빠르네요.', zh: '居然已经冬天了，时间过得真快。' },
      { icon: '💔', context: '失望', ko: '이렇게 실수를 하다니 부끄러워요.', zh: '居然犯了这样的错，好惭愧。' },
      { icon: '❓', context: '反问', ko: '민수가 벌써 갔다니요?', zh: '民秀居然已经走了？' },
    ],
    mistakes: [
      { wrong: '가다니', correct: '간다니', note: '动词现在无받침加 -ㄴ다니' },
      { wrong: '먹다니', correct: '먹는다니', note: '动词现在有받침加 -는다니' },
      { wrong: '의사다니', correct: '의사라니', note: '名词无받침用 -라니' },
      { wrong: '학생다니', correct: '학생이라니', note: '名词有받침用 -이라니' },
    ],
    quickTable: {
      title: '-다니 形态一览',
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
      title: '选正确的 -다니 形式',
      body: '根据词类和받침选择正确形式',
      questions: [
        {
          prompt: '민수가 벌써 (가다) 놀랐어요.',
          options: ['가다니', '간다니', '갔다니', '가는다니'],
          answer: 2,
          explanation: '"已经走了"是过去，动词过去用 -았/었다니 → 갔다니。',
        },
        {
          prompt: '그 사람이 (의사) 믿을 수 없어요.',
          options: ['의사다니', '의사이다니', '의사라니', '의사는다니'],
          answer: 2,
          explanation: '名词 의사 无받침，用 -라니 → 의사라니。',
        },
        {
          prompt: '이렇게 잘 (먹다) 대단해요.',
          options: ['먹다니', '먹는다니', '먹은다니', '먹라니'],
          answer: 1,
          explanation: '动词现在有받침，用 -는다니 → 먹는다니。',
        },
        {
          prompt: '그렇게 (예쁘다) 부러워요.',
          options: ['예쁘는다니', '예쁜다니', '예쁘다니', '예쁘라니'],
          answer: 2,
          explanation: '形容词直接用 -다니 → 예쁘다니，不加 -는/ㄴ。',
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
    whatItDoes: '"说……的" 冠形',
    whatItDoesBody: '「-다는 / -는다는 / -ㄴ다는 / -(이)라는」是间接引用 -다고 하다 的冠形形态，把"说……"变成修饰名词的定语，中文对应"说……的（消息/传闻/事实）"。是新闻、书面语高频结构。',
    structureNote: '动词现在（有받침）-는다는 / 动词现在（无받침）-ㄴ다는 / 动词过去 -았/었다는 / 形容词 -다는 / 名词 -(이)라는',
    rulesNote: '这是 -다고 하는 的省略。核心公式：现在 -는/ㄴ다는 · 过去 -았/었다는 · 形容词 -다는 · 名词 -(이)라는。后面接名词如 소식/이야기/사실/소문/생각',
    structures: [
      {
        ko: '그가 결혼한다는 소식을 들었어요.',
        zh: '听说他要结婚了。',
        tokens: [
          { text: '그가', role: 'subject' },
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
      },
      {
        ko: '한국이 좋다는 이야기를 자주 들어요.',
        zh: '经常听到说韩国很好的话。',
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
        zh: '有传闻说民秀是医生。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '의사라는', role: 'plain' },
          { text: '소문이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：有받침 → -는다는 / 无받침 → -ㄴ다는', examples: '먹다 → 먹는다는 / 가다 → 간다는' },
      { type: 'rule', text: '动词过去：-았/었다는', examples: '갔다는 소식, 결혼했다는 이야기' },
      { type: 'rule', text: '形容词：-다는', examples: '좋다는 소문, 예쁘다는 이야기' },
      { type: 'rule', text: '名词：有받침 → -이라는 / 无받침 → -라는', examples: '학생이라는 사실, 의사라는 소문' },
      { type: 'usage', text: '本质是 -다고 하는 的省略，用来把间接引用变成定语', examples: '결혼한다고 하는 소식 = 결혼한다는 소식' },
      { type: 'usage', text: '后接名词高频：소식/이야기/사실/소문/생각/말/뜻/의미', examples: '한국어가 어렵다는 생각이 들었어요.' },
      { type: 'note', text: '否定形式：-지 않는다는 / -지 않다는', examples: '먹지 않는다는 소문, 좋지 않다는 이야기' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그가', role: 'subject' },
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '听说他要结婚了。',
        swapWords: ['소식', '이야기', '소문', '말'],
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '어렵다는', role: 'plain' },
          { text: '생각이', role: 'subject' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '产生了韩语很难的想法。',
        swapWords: ['어렵다', '쉽다', '재미있다', '중요하다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '의사라는', role: 'plain' },
          { text: '소문이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '有传闻说民秀是医生。',
        swapWords: ['의사', '학생', '선생님', '가수'],
      },
    ],
    scenarios: [
      { icon: '📰', context: '新闻', ko: '경제가 나빠진다는 뉴스를 봤어요.', zh: '看到说经济会变糟的新闻。' },
      { icon: '💌', context: '消息', ko: '그가 결혼한다는 소식을 들었어요.', zh: '听说他要结婚了。' },
      { icon: '🗣️', context: '传闻', ko: '민수가 의사라는 소문이 있어요.', zh: '有传闻说民秀是医生。' },
      { icon: '💭', context: '想法', ko: '한국어가 어렵다는 생각이 들었어요.', zh: '产生了韩语很难的想法。' },
      { icon: '📖', context: '事实', ko: '지구가 둥글다는 사실은 누구나 알아요.', zh: '地球是圆的这一事实谁都知道。' },
      { icon: '📢', context: '公告', ko: '내일 시험이 없다는 공지를 받았어요.', zh: '收到明天没有考试的通知。' },
    ],
    mistakes: [
      { wrong: '결혼하다는 소식', correct: '결혼한다는 소식', note: '动词现在无받침加 -ㄴ다는' },
      { wrong: '먹다는 이야기', correct: '먹는다는 이야기', note: '动词现在有받침加 -는다는' },
      { wrong: '의사다는 소문', correct: '의사라는 소문', note: '名词无받침用 -라는' },
      { wrong: '좋는다는 이야기', correct: '좋다는 이야기', note: '形容词直接用 -다는，不加 -는/ㄴ' },
    ],
    quickTable: {
      title: '-다는 冠形形态',
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
      title: '选正确的 -다는 冠形',
      body: '根据词类和받침选择',
      questions: [
        {
          prompt: '그가 곧 (결혼하다) 소식을 들었어요.',
          options: ['결혼하다는', '결혼한다는', '결혼했다는', '결혼하라는'],
          answer: 1,
          explanation: '"要结婚"是现在的引用，动词无받침加 -ㄴ다는 → 결혼한다는。',
        },
        {
          prompt: '한국어가 (어렵다) 생각이 들었어요.',
          options: ['어렵는다는', '어려운다는', '어렵다는', '어렵라는'],
          answer: 2,
          explanation: '어렵다 是形容词，直接用 -다는 → 어렵다는。',
        },
        {
          prompt: '민수가 (의사) 소문이 있어요.',
          options: ['의사다는', '의사이는', '의사라는', '의사는다는'],
          answer: 2,
          explanation: '名词 의사 无받침，用 -라는 → 의사라는。',
        },
        {
          prompt: '민수가 어제 부산에 (가다) 이야기를 들었어요.',
          options: ['간다는', '가는다는', '갔다는', '가라는'],
          answer: 2,
          explanation: '"昨天去了"是过去引用，用 -았/었다는 → 갔다는。',
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
    compareLabel: '完整形 vs 省略形',
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
    title: '综合练习⑲',
    whatItDoes: 'P19综合复习',
    whatItDoesBody: '本练习综合复习 P19 高级引用与转述章节的 8 个语法点，帮助巩固间接引用的完整体系。',
    structureNote: '综合本 Part 所有语法',
    rulesNote: '重点在识别不同引用形式的使用场景',
    isPractice: true,
    structures: [
      {
        ko: '민수가 온다고 했어요.',
        zh: '民秀说要来。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '온다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '어디에 가느냐고 물었어요.',
        zh: '问了要去哪里。',
        tokens: [
          { text: '어디에', role: 'place' },
          { text: '가느냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '같이 가자고 했어요.',
        zh: '(他)说一起去吧。',
        tokens: [
          { text: '같이', role: 'plain' },
          { text: '가자고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '陈述句：动词现在 -는/ㄴ다고 · 过去 -았/었다고 · 形容词 -다고 · 名词 -(이)라고 하다' },
      { type: 'rule', text: '疑问句：-냐고 하다 / 물어보다' },
      { type: 'rule', text: '共动句（建议）：-자고 하다' },
      { type: 'rule', text: '命令句：-(으)라고 하다' },
      { type: 'usage', text: '-다고 해서 / -다길래 → 听说……所以……' },
      { type: 'usage', text: '-다면서? → 听说是……对吗？（再确认）' },
      { type: 'usage', text: '-다니 → 表达惊讶，"居然……"' },
      { type: 'usage', text: '-다는 N → "说……的" 冠形，接名词' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '한국어가', role: 'subject' },
          { text: '어렵다고', role: 'verb' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '民秀说韩语很难。',
        swapWords: ['어렵다', '쉽다', '재미있다', '중요하다'],
      },
      {
        wordBlocks: [
          { text: '어디에', role: 'place' },
          { text: '사느냐고', role: 'verb' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '问了住在哪里。',
        swapWords: ['어디', '언제', '무엇', '누구'],
      },
      {
        wordBlocks: [
          { text: '결혼한다는', role: 'plain' },
          { text: '소식을', role: 'object' },
          { text: '들어서', role: 'verb' },
          { text: '놀랐어요', role: 'verb' },
        ],
        zh: '听到要结婚的消息，吃了一惊。',
        swapWords: ['소식', '이야기', '소문', '말'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '转述', ko: '민수가 온다고 했어요.', zh: '民秀说要来。' },
      { icon: '❓', context: '间接问', ko: '어디에 가느냐고 물었어요.', zh: '问了要去哪里。' },
      { icon: '🤝', context: '间接建议', ko: '같이 가자고 했어요.', zh: '说一起去吧。' },
      { icon: '📢', context: '间接命令', ko: '빨리 오라고 했어요.', zh: '让快点来。' },
      { icon: '😲', context: '惊讶', ko: '그렇게 잘한다니 놀랐어요.', zh: '居然做得这么好，吃惊了。' },
      { icon: '📰', context: '冠形', ko: '결혼한다는 소식을 들었어요.', zh: '听说要结婚了。' },
    ],
    mistakes: [
      { wrong: '민수가 온다고 물었어요', correct: '민수가 오냐고 물었어요', note: '疑问句用 -냐고，不用 -다고' },
      { wrong: '같이 간다고 했어요', correct: '같이 가자고 했어요', note: '共动/建议用 -자고，不用 -다고' },
      { wrong: '빨리 온다고 했어요', correct: '빨리 오라고 했어요', note: '命令用 -(으)라고，不用 -다고' },
    ],
    linkedGrammarIds: ['card-p25-l01', 'card-p25-l02', 'card-p25-l03', 'card-p25-l04', 'card-p25-l05', 'card-p25-l06', 'card-p25-l07', 'card-p25-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P19 综合练习',
      body: '选择正确的间接引用形式',
      questions: [
        {
          prompt: '민수가 "학교에 가요"라고 말했어요. → 民秀说……',
          options: ['학교에 간다고 했어요', '학교에 가느냐고 했어요', '학교에 가자고 했어요', '학교에 가라고 했어요'],
          answer: 0,
          explanation: '陈述句转述用 -는/ㄴ다고 하다，动词无받침 → 간다고 했어요。',
        },
        {
          prompt: '민수가 "어디에 살아요?"라고 물었어요. → 民秀问……',
          options: ['어디에 산다고 물었어요', '어디에 사느냐고 물었어요', '어디에 살자고 물었어요', '어디에 살라고 물었어요'],
          answer: 1,
          explanation: '疑问句转述用 -냐고 하다/물어보다 → 사느냐고 물었어요。',
        },
        {
          prompt: '민수가 "같이 갑시다"라고 했어요. → 民秀说……',
          options: ['같이 간다고 했어요', '같이 가느냐고 했어요', '같이 가자고 했어요', '같이 가라고 했어요'],
          answer: 2,
          explanation: '共动/建议句转述用 -자고 하다 → 가자고 했어요。',
        },
        {
          prompt: '그가 벌써 (가다) 놀랐어요. 表达惊讶',
          options: ['간다니', '가느니', '가자니', '갔다니'],
          answer: 3,
          explanation: '"已经走了"是过去，惊讶用 -았/었다니 → 갔다니。',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P19 总结：高级引用与转述</div>
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
