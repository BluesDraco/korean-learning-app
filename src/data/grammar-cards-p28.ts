import type { GrammarCard } from '@/types';

export const grammarCardsP28: GrammarCard[] = [
  // ── 第1课：-기(가) N하다 ──────────────────────────────────────
  {
    id: 'card-p28-l01',
    partNumber: 28,
    lessonNumber: 1,
    title: '-기(가) N하다',
    whatItDoes: '做……真是', english: 'Doing something is really...',
    whatItDoesBody: '「-기(가) + 形容词/名词하다」表示"做……是……的""……起来……"。把动词转成主语，后接形容词评价难易、感受。核心表达：어렵다/쉽다/힘들다/편하다/좋다 等。', english: '「-기(가) + adjective/noun하다」 means "doing something is..." or "it is... to do." It turns a verb into a subject and is followed by an adjective that evaluates difficulty or feeling. Core expressions include: 어렵다/쉽다/힘들다/편하다/좋다, etc.',
    structureNote: '动词词干 + -기(가) + 形容词/名词하다', english: 'Verb stem + -기(가) + adjective/noun하다',
    rulesNote: '常用搭配：-기 어렵다/쉽다/힘들다/편하다/좋다/싫다；助词 -가 可省略', english: 'Common combinations: -기 어렵다/쉽다/힘들다/편하다/좋다/싫다; the particle -가 can be omitted',
    structures: [
      {
        ko: '한국어는 배우기가 어려워요.',
        zh: '韩语学起来很难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '이 책은 읽기 쉬워요.',
        zh: '这本书读起来很容易。',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '읽기', role: 'verb' },
          { text: '쉬워요', role: 'verb' },
        ],
      },
      {
        ko: '혼자 살기가 편해요.',
        zh: '一个人住很方便。',
        tokens: [
          { text: '혼자', role: 'plain' },
          { text: '살기가', role: 'verb' },
          { text: '편해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기(가) + 形容词하다', examples: '배우다 → 배우기가 어렵다 / 읽다 → 읽기가 쉽다' },
      { type: 'rule', text: '助词 -가 常省略：-기 쉽다 / -기 어렵다', examples: '읽기 쉬워요（读起来容易）= 읽기가 쉬워요（读起来容易，가 可省略）' },
      { type: 'usage', text: '常用搭配：-기 어렵다/쉽다/힘들다/편하다/좋다/싫다/불편하다', examples: '이 문제는 풀기 어려워요.（这道题很难解。）' },
      { type: 'usage', text: '感受类：-기 좋다/싫다/재미있다/재미없다', examples: '이 노래는 듣기 좋아요.（这首歌很好听。）' },
      { type: 'usage', text: '客观评价类：-기 쉽다/어렵다/편하다/불편하다', examples: '이 신발은 신기 편해요.（这双鞋穿着舒服。）' },
      { type: 'compare', text: '-기(가) N하다 vs -기 위해서 → 前者是评价，后者是目的', examples: '배우기 쉬워요.(易学) / 배우기 위해 왔어요.(为学而来)' },
      { type: 'note', text: '主语通常用 은/는 标记，评价对象', examples: '한국어는 배우기가 어려워요.（韩语学起来难。）' },
      { type: 'compare', text: '中文"喜欢"别硬套：듣기 좋다＝好听/听着舒服，不是"喜欢听"（喜欢听＝듣기를 좋아하다）；하기 싫다＝不想做/讨厌做', examples: '이 노래는 듣기 좋아요.（这歌好听。）/ 이 노래를 좋아해요.（喜欢这首歌。）' },
      { type: 'note', text: '-기 把动词变成名词当主语（中文没有这种变形）：难易的主语是"做这件事"本身，人用 은/는 当话题', examples: '저는 한국어 배우기가 어려워요.（我觉得学韩语难。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语学起来难。',
        swapWords: ['배우다', '읽다', '쓰다', '말하다'],
      },
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '읽기', role: 'verb' },
          { text: '쉬워요', role: 'verb' },
        ],
        zh: '这本书读起来容易。',
        swapWords: ['쉽다', '어렵다', '재미있다', '지루하다'],
      },
      {
        wordBlocks: [
          { text: '혼자', role: 'plain' },
          { text: '살기가', role: 'verb' },
          { text: '편해요', role: 'verb' },
        ],
        zh: '一个人住方便。',
        swapWords: ['살다', '지내다', '먹다', '자다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习', ko: '한국어는 배우기가 어려워요.', zh: '韩语学起来难。' },
      { icon: '📖', context: '阅读', ko: '이 책은 읽기 쉬워요.', zh: '这本书读起来容易。' },
      { icon: '🏠', context: '生活', ko: '혼자 살기가 편해요.', zh: '一个人住方便。' },
      { icon: '👟', context: '穿着', ko: '이 신발은 신기 편해요.', zh: '这双鞋穿着舒服。' },
      { icon: '🎵', context: '欣赏', ko: '이 노래는 듣기 좋아요.', zh: '这首歌听起来好。' },
      { icon: '💼', context: '工作', ko: '지금 일은 하기 힘들어요.', zh: '现在这工作做起来累。' },
    ],
    mistakes: [
      { wrong: '한국어는 배워기가 어려워요', correct: '한국어는 배우기가 어려워요', note: '词干直接接 -기，不要变形' },
      { wrong: '읽는 것이 쉬워요', correct: '읽기(가) 쉬워요', note: '-기 쉽다 是更惯用的固定搭配。-는 것이 쉬워요 语法正确但不自然，TOPIK/口语优先用 -기 形。' },
      { wrong: '이 신발은 신기가 편이에요', correct: '이 신발은 신기가 편해요', note: '편하다 是形容词 → 편해요' },
    ],
    quickTable: {
      title: '-기(가) N하다 常用搭配', english: '-기(가) N하다 Common Combinations',
      headers: ['结构', '含义', '例子'],
      rows: [
        ['-기 어렵다/쉽다', '难/容易', '배우기 어려워요'],
        ['-기 힘들다/편하다', '累/舒适', '신기 편해요'],
        ['-기 좋다/싫다', '好（做）/不想做', '듣기 좋아요（好听）'],
        ['-기 재미있다/지루하다', '有趣/无聊', '읽기 재미있어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기(가) N하다 练习', english: '-기(가) N하다 Practice',
      body: '选择正确形式',
      questions: [
        {
          prompt: '한국어는 (배우다) 어려워요.',
          options: ['배워기가', '배우기가', '배운기가', '배울기가'],
          answer: 1,
          explanation: '词干 배우 直接接 -기 → 배우기가 어려워요。',
        },
        {
          prompt: '이 책은 (읽다) 쉬워요.',
          options: ['읽는 것이', '읽기', '읽으면', '읽어서'],
          answer: 1,
          explanation: '固定搭配 -기 쉽다 → 읽기 쉬워요。',
        },
        {
          prompt: '이 신발은 (신다) 편해요.',
          options: ['신는', '신기가', '신어서', '신어야'],
          answer: 1,
          explanation: '"穿着舒服"用 -기(가) 편하다 → 신기가 편해요。',
        },
        {
          prompt: '-기 어렵다 的语义是……',
          options: ['为了……难', '……起来难', '做……的时候难', '因为难所以……'],
          answer: 1,
          explanation: '-기 어렵다 表示"……起来难/做……难"，把动词转主语后接评价。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"韩语学起来难""这鞋穿着舒服" —— 韩语这种"做……起来+形容词"的评价用 <b>-기(가) + 形容词하다</b>。<br>把动词转成主语，就能自由评价难易/舒适/喜好。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기 어렵다 vs -기 위해서</b><br>
    ・-기 + 形容词 → 评价<br>
    <span style="color:#89756e">배우기 어려워요.（学起来难）</span><br>
    ・-기 위해서 → 目的<br>
    <span style="color:#89756e">배우기 위해서 왔어요.（为学而来）</span>
  </div>
</div>`,
    compareLabel: '评价 vs 目的',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기(가) N하다：做……起来</div>
  <div style="font-size:14px;color:#89756e">难易/舒适/喜好评价</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -기 어렵다 / 쉽다<br>
      -기 힘들다 / 편하다<br>
      -기 좋다 / 싫다<br>
      -기 재미있다 / 지루하다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      한국어는 배우기가 어려워요.<br>
      이 노래는 듣기 좋아요.<br>
      혼자 살기가 편해요.<br>
      이 신발은 신기 편해요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배워기가</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배우기가（词干+기）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">신기가 편이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">신기가 편해요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：얼마나 -는지/은지 모르다 ──────────────────────────────────────
  {
    id: 'card-p28-l02',
    partNumber: 28,
    lessonNumber: 2,
    title: '얼마나 -는지/은지 모르다',
    whatItDoes: '不知有多……', english: 'You have no idea how much...',
    whatItDoesBody: '「얼마나 + -는지/은지 + 모르다」表示"不知有多……""……得不得了"。用于强烈感叹某种程度之深，虽然字面是"不知道"，实际是强调"非常/极其"。', english: '「얼마나 + -는지/은지 + 모르다」 means "you have no idea how..." or "so... that it\'s beyond words." It is used to strongly exclaim about the depth of a degree. Although it literally means "don\'t know," it actually emphasizes "very" or "extremely."',
    structureNote: '얼마나 + 动词现在 -는지 / 形容词有收音 -은지 / 无收音 -ㄴ지 + 모르다', english: '얼마나 + verb present -는지 / adjective with final consonant -은지 / without final consonant -ㄴ지 + 모르다',
    rulesNote: '动词现在 -는지；形容词 -은/ㄴ지；过去 -았/었는지；名词 -인지', english: 'Verb present: -는지; adjective: -은/ㄴ지; past: -았/었는지; noun: -인지',
    structures: [
      {
        ko: '한국어가 얼마나 어려운지 몰라요.',
        zh: '韩语不知有多难。',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 얼마나 열심히 공부하는지 몰라요.',
        zh: '民秀不知有多用功学习。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '열심히', role: 'plain' },
          { text: '공부하는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '어제 얼마나 웃었는지 몰라요.',
        zh: '昨天不知笑得有多厉害。',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '얼마나', role: 'plain' },
          { text: '웃었는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：얼마나 -는지 모르다', examples: '공부하다 → 얼마나 공부하는지 몰라요' },
      { type: 'rule', text: '形容词：有收音 -은지 / 无收音 -ㄴ지', examples: '어렵다 → 얼마나 어려운지 / 예쁘다 → 얼마나 예쁜지' },
      { type: 'rule', text: '过去：-았/었는지 모르다', examples: '얼마나 웃었는지 몰라요（笑得不知道有多厉害）' },
      { type: 'rule', text: '名词：얼마나 -인지 모르다', examples: '얼마나 좋은 사람인지 몰라요（真不知道是多好的人）' },
      { type: 'usage', text: '字面"不知有多……"，实际是强烈感叹', examples: '얼마나 좋은지 몰라요! = 好得不得了!' },
      { type: 'compare', text: '얼마나 -는지 모르다 vs -는지 모르다 → 前者感叹强调，后者是真的不知道', examples: '가는지 몰라요.(不知去否) / 얼마나 가는지 몰라요.(不知去了多少)' },
      { type: 'note', text: '常用来夸奖/抱怨/感叹强度', examples: '얼마나 힘든지 몰라요.（真不知道有多累。）' },
      { type: 'note', text: '这是固定感叹惯用型：모르다 不能换成 알다/알아요，也不能真去回答"到底多少"。整句＝中文"多……啊"', examples: '얼마나 예쁜지 몰라요.（真不知道有多漂亮＝漂亮得不得了。）' },
      { type: 'compare', text: '同一个 얼마나：疑问句里是"多久/多少/多么"（真提问）；这里是感叹（不提问）', examples: '얼마나 걸려요?（要多久？疑问）/ 얼마나 먼지 몰라요.（不知道有多远＝远得很，感叹）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '韩语不知有多难。',
        swapWords: ['어렵다', '재미있다', '유용하다', '복잡하다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '공부하는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '民秀不知多用功。',
        swapWords: ['공부하다', '일하다', '연습하다', '노력하다'],
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '얼마나', role: 'plain' },
          { text: '웃었는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '昨天笑得不知有多厉害。',
        swapWords: ['웃다', '울다', '놀라다', '기뻐하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '难度', ko: '한국어가 얼마나 어려운지 몰라요.', zh: '韩语不知有多难。' },
      { icon: '💪', context: '用功', ko: '민수가 얼마나 열심히 공부하는지 몰라요.', zh: '民秀不知多用功。' },
      { icon: '😂', context: '大笑', ko: '어제 얼마나 웃었는지 몰라요.', zh: '昨天不知笑得多厉害。' },
      { icon: '😢', context: '伤心', ko: '얼마나 슬픈지 몰라요.', zh: '不知有多伤心。' },
      { icon: '💰', context: '贵', ko: '이 시계가 얼마나 비싼지 몰라요.', zh: '这表不知有多贵。' },
      { icon: '🌟', context: '好', ko: '민수는 얼마나 좋은 사람인지 몰라요.', zh: '民秀是个多好的人啊。' },
    ],
    mistakes: [
      { wrong: '어렵는지', correct: '어려운지', note: '形容词冠形 -은/ㄴ，不用 -는' },
      { wrong: '얼마나 공부한지', correct: '얼마나 공부하는지', note: '动词现在用 -는지，不用 -은/ㄴ지' },
      { wrong: '얼마나 웃었지 몰라요', correct: '얼마나 웃었는지 몰라요', note: '固定为 -는/은지 모르다，不能省 -는' },
    ],
    quickTable: {
      title: '얼마나 -는지/은지 冠形', english: '얼마나 -는지/은지 Adnominal',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在', '얼마나 -는지', '얼마나 공부하는지'],
        ['形容词有收音', '얼마나 -은지', '얼마나 어려운지'],
        ['形容词无收音', '얼마나 -ㄴ지', '얼마나 예쁜지'],
        ['过去', '얼마나 -았/었는지', '얼마나 웃었는지'],
        ['名词', '얼마나 -인지', '얼마나 좋은 사람인지'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '얼마나 -는지/은지 综合', english: '얼마나 -는지/은지 Comprehensive',
      body: '选正确形式',
      questions: [
        {
          prompt: '한국어가 얼마나 (어렵다) 몰라요.',
          options: ['어렵는지', '어려운지', '어려울지', '어렵기지'],
          answer: 1,
          explanation: '어렵다 形容词有收音，用 -은지 → 어려운지。',
        },
        {
          prompt: '민수가 얼마나 (공부하다) 몰라요.',
          options: ['공부한지', '공부하는지', '공부할지', '공부하기지'],
          answer: 1,
          explanation: '공부하다 动词现在，用 -는지 → 공부하는지。',
        },
        {
          prompt: '어제 얼마나 (웃다) 몰라요.',
          options: ['웃는지', '웃은지', '웃었는지', '웃을지'],
          answer: 2,
          explanation: '"昨天笑"是过去，用 -았/었는지 → 웃었는지。',
        },
        {
          prompt: '얼마나 -는지 모르다 的语义是……',
          options: ['真的不知道', '不知有多……(强烈感叹)', '不确定要不要', '推测可能性'],
          answer: 1,
          explanation: '얼마나 -는지 모르다 是强烈感叹"……得不得了"，不是真的不知道。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"韩语不知有多难""笑得不知多厉害" —— 韩语强烈感叹用 <b>얼마나 -는지/은지 모르다</b>。<br>字面是"不知道"，实际就是"非常/极其……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>字面 vs 实际</b><br>
    字面翻译："不知有多……"<br>
    实际语气：强烈感叹"极其/非常"<br>
    <span style="color:#89756e">얼마나 좋은지 몰라요! = 好得不得了!</span><br>
    <span style="color:#89756e">얼마나 힘든지 몰라요. = 累得不行。</span>
  </div>
</div>`,
    compareLabel: '不知道 = 极其',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">얼마나 -는지 모르다：不知有多</div>
  <div style="font-size:14px;color:#89756e">强烈感叹表达</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는지</b>：공부하는지<br>
      形容词 → <b>-은/ㄴ지</b>：어려운지<br>
      过去 → <b>-았/었는지</b>：웃었는지<br>
      名词 → <b>-인지</b>：좋은 사람인지
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      夸奖：얼마나 좋은 사람인지 몰라요.<br>
      抱怨：얼마나 힘든지 몰라요.<br>
      惊叹：얼마나 비싼지 몰라요.<br>
      感激：얼마나 감사한지 몰라요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">어렵는지</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어려운지（形容词用 -은/ㄴ지）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">얼마나 웃었지 몰라요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">얼마나 웃었는지 몰라요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-다 못해 ──────────────────────────────────────
  {
    id: 'card-p28-l03',
    partNumber: 28,
    lessonNumber: 3,
    title: '-다 못해',
    whatItDoes: '甚至……到', english: 'To the point of... / Even to the extent of...',
    whatItDoesBody: '「-다 못해」表示"……到甚至……的地步""……以致于……"。前项达到某种程度后，导致更极端的后项。核心是"程度递进+超出常规"的强调。', english: '\'-다 못해\' means \'to the point of...\' or \'so much that...\'. The preceding clause reaches a certain degree, leading to a more extreme following clause. The core emphasis is on \'degree progression + exceeding the norm\'.',
    structureNote: '形容词/动词词干 + -다 못해', english: 'Adjective/Verb stem + -다 못해',
    rulesNote: '直接接词干，不看收音；后接更极端的状态/结果', english: 'Attach directly to the stem regardless of final consonant; followed by a more extreme state/result',
    structures: [
      {
        ko: '하늘이 파랗다 못해 눈이 부실 정도예요.',
        zh: '天蓝到刺眼的程度。',
        tokens: [
          { text: '하늘이', role: 'subject' },
          { text: '파랗다 못해', role: 'plain' },
          { text: '눈이 부실 정도예요', role: 'verb' },
        ],
      },
      {
        ko: '기다리다 못해 먼저 갔어요.',
        zh: '等不及了，先走了。',
        tokens: [
          { text: '기다리다 못해', role: 'verb' },
          { text: '먼저', role: 'plain' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '화가 나다 못해 눈물이 났어요.',
        zh: '气到掉眼泪。',
        tokens: [
          { text: '화가', role: 'subject' },
          { text: '나다 못해', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '形容词/动词词干 + -다 못해，不看收音', examples: '파랗다 → 파랗다 못해 / 기다리다 → 기다리다 못해' },
      { type: 'usage', text: '语义1（形容词）：达到程度后引出更极端评价', examples: '하늘이 파랗다 못해 눈부셔요.（天蓝得刺眼。）' },
      { type: 'usage', text: '语义2（动词）：受不了以致于采取行动', examples: '기다리다 못해 먼저 갔어요.（等不下去才先走）' },
      { type: 'usage', text: '语义3：情绪极致导致的反应', examples: '화가 나다 못해 눈물이 났어요.（气得都哭了。）' },
      { type: 'compare', text: '-다 못해 vs -다가 → 前者程度递进，后者动作转变', examples: '먹다 못해 토했다(吃到吐) / 먹다가 토했다(吃着吃着吐了)' },
      { type: 'note', text: '常与"눈물이 나다/포기하다/쓰러지다"等极端反应搭配', examples: '아프다 못해 쓰러졌어요.（疼得都倒下了。）' },
      { type: 'note', text: '前后主语可以是同一物/同一人的不同状态', examples: '슬프다 못해 웃음이 나요.（伤心到笑）' },
      { type: 'compare', text: '别被 못 骗了：这里的 -다 못해 不是"不能/做不到"（那是 못하다）。它表"到极致以致于"，是程度递进不是否定', examples: '기다리다 못해 갔어요.（等到受不了才走＝去了，不是"不能等"）' },
      { type: 'note', text: '偏书面/文艺的强调表达，日常口语更常说 너무……해서 或 -을 정도로', examples: '너무 파래서 눈이 부셔요.（口语：蓝得刺眼。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '하늘이', role: 'subject' },
          { text: '파랗다', role: 'plain' },
          { text: '못해', role: 'verb' },
          { text: '눈부셔요', role: 'verb' },
        ],
        zh: '天蓝到刺眼。',
        swapWords: ['파랗다', '푸르다', '맑다', '깨끗하다'],
      },
      {
        wordBlocks: [
          { text: '기다리다', role: 'verb' },
          { text: '못해', role: 'verb' },
          { text: '먼저', role: 'plain' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '等不及了先走了。',
        swapWords: ['기다리다', '참다', '견디다', '버티다'],
      },
      {
        wordBlocks: [
          { text: '화가', role: 'subject' },
          { text: '나다', role: 'verb' },
          { text: '못해', role: 'verb' },
          { text: '눈물이 났어요', role: 'verb' },
        ],
        zh: '气到掉眼泪。',
        swapWords: ['화가 나다', '슬프다', '괴롭다', '답답하다'],
      },
    ],
    scenarios: [
      { icon: '💙', context: '天空', ko: '하늘이 파랗다 못해 눈이 부실 정도예요.', zh: '天蓝到刺眼。' },
      { icon: '⏰', context: '等待', ko: '기다리다 못해 먼저 갔어요.', zh: '等不及了先走。' },
      { icon: '😤', context: '气愤', ko: '화가 나다 못해 눈물이 났어요.', zh: '气到掉眼泪。' },
      { icon: '😴', context: '疲惫', ko: '피곤하다 못해 쓰러졌어요.', zh: '累到瘫倒。' },
      { icon: '🍬', context: '味道', ko: '달다 못해 쓴맛이 나요.', zh: '甜到发苦。' },
      { icon: '❄️', context: '寒冷', ko: '춥다 못해 몸이 떨려요.', zh: '冷到发抖。' },
    ],
    mistakes: [
      { wrong: '파랗아 못해', correct: '파랗다 못해', note: '固定用 -다 못해，不做 -아/어 变形' },
      { wrong: '기다려 못해', correct: '기다리다 못해', note: '直接接词干原形 -다 못해' },
      { wrong: '슬프다 못하고', correct: '슬프다 못해', note: '固定是 -다 못해，不用 -다 못하고' },
    ],
    quickTable: {
      title: '-다 못해 用法', english: '-다 못해 Usage',
      headers: ['类型', '语义', '例子'],
      rows: [
        ['形容词', '程度极致导致新状态', '파랗다 못해 눈부시다'],
        ['动词', '受不了以致于采取行动', '기다리다 못해 먼저 갔다'],
        ['情绪', '情绪极致引发反应', '화가 나다 못해 눈물이 났다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-다 못해 综合练习', english: '-다 못해 Comprehensive Practice',
      body: '选择正确表达',
      questions: [
        {
          prompt: '하늘이 (파랗다) 눈이 부실 정도예요.',
          options: ['파래 못해', '파랗다 못해', '파란다 못해', '파랗아 못해'],
          answer: 1,
          explanation: '固定接词干原形 → 파랗다 못해。',
        },
        {
          prompt: '(기다리다) 먼저 갔어요.',
          options: ['기다리 못해', '기다려 못해', '기다리다 못해', '기다린 못해'],
          answer: 2,
          explanation: '-다 못해 直接接词干原形 → 기다리다 못해。',
        },
        {
          prompt: '화가 (나다) 눈물이 났어요.',
          options: ['난 못해', '나 못해', '나다 못해', '나서 못해'],
          answer: 2,
          explanation: '-다 못해 → 나다 못해，表"气到极致引发眼泪"。',
        },
        {
          prompt: '-다 못해 表达的核心是……',
          options: ['否定不能做', '程度递进到极端', '结果满意', '让步条件'],
          answer: 1,
          explanation: '-다 못해 = 达到某程度后引出更极端的状态或反应。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"天蓝到刺眼""气到掉眼泪""等不及了先走" —— 韩语这种"程度极致引出更极端结果"用 <b>-다 못해</b>。<br>核心是"到了……的地步以致于……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-다 못해 vs -다가</b><br>
    ・-다 못해 → 程度递进"甚至到……"<br>
    <span style="color:#89756e">먹다 못해 토했다.（吃到吐）</span><br>
    ・-다가 → 动作转变"……着……"<br>
    <span style="color:#89756e">먹다가 토했다.（吃着吃着吐了）</span>
  </div>
</div>`,
    compareLabel: '-다 못해 vs -다가',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-다 못해：甚至……到</div>
  <div style="font-size:14px;color:#89756e">程度极致 · 引发更极端反应</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      形容词/动词词干 + <b>-다 못해</b><br>
      形容词：程度极致→新状态<br>
      动词：受不了→采取行动
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      파랗다 못해 눈부시다<br>
      기다리다 못해 먼저 가다<br>
      화가 나다 못해 눈물이 나다<br>
      피곤하다 못해 쓰러지다<br>
      달다 못해 쓰다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">파랗아 못해</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">파랗다 못해（直接词干+다）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">기다려 못해</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">기다리다 못해</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-을/ㄹ수록 ──────────────────────────────────────
  {
    id: 'card-p28-l04',
    partNumber: 28,
    lessonNumber: 4,
    title: '-을/ㄹ수록',
    whatItDoes: '越……越……', english: 'The more..., the more...',
    whatItDoesBody: '「-을/ㄹ수록」表示"越……越……"，随着前项程度增加，后项程度也相应变化。常与"-으면 -을수록"搭配加强语气。', english: '\'-을/ㄹ수록\' means \'the more..., the more...\'. As the degree of the preceding clause increases, the degree of the following clause changes accordingly. It is often used with \'-으면 -을수록\' to strengthen the emphasis.',
    structureNote: '词干：有收音 -을수록 / 无收音 -ㄹ수록 · 名词 -(이)ㄹ수록', english: 'Stem: with final consonant -을수록 / without final consonant -ㄹ수록 · Noun -(이)ㄹ수록',
    rulesNote: '常见强调形："-으면 -을수록"（越……越……）；前后主语通常一致', english: 'Common emphatic form: "-으면 -을수록" (the more..., the more...); the subject before and after is usually the same.',
    structures: [
      {
        ko: '한국어는 공부할수록 재미있어요.',
        zh: '韩语越学越有趣。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '공부할수록', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
      {
        ko: '보면 볼수록 예쁘네요.',
        zh: '越看越漂亮。',
        tokens: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
      },
      {
        ko: '나이가 들수록 시간이 빨라져요.',
        zh: '年纪越大，时间过得越快。',
        tokens: [
          { text: '나이가', role: 'subject' },
          { text: '들수록', role: 'verb' },
          { text: '시간이', role: 'subject' },
          { text: '빨라져요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → -을수록', examples: '먹다 → 먹을수록 / 좋다 → 좋을수록' },
      { type: 'rule', text: '无收音 → -ㄹ수록', examples: '가다 → 갈수록 / 보다 → 볼수록' },
      { type: 'rule', text: '名词：-(이)ㄹ수록', examples: '학생일수록 / 부자일수록' },
      { type: 'usage', text: '强调形："-으면 -을수록" = 越……越……', examples: '보면 볼수록 예뻐요.（越看越美。）' },
      { type: 'usage', text: '前后动作/程度成正比或反比', examples: '나이가 들수록 시간이 빨라져요.（越上年纪越觉得时间快。）' },
      { type: 'compare', text: '-을수록 vs -으면 → 后者是条件"如果"，前者是程度递进', examples: '먹으면 좋아요.(吃了就好) / 먹을수록 좋아요.(越吃越好)' },
      { type: 'note', text: '常搭配"점점 더/갈수록"加强递进', examples: '갈수록 어려워져요.（越来越难。）' },
      { type: 'compare', text: '负迁移：中文"越A越B"有两个"越"，韩语只在前句用 -을수록，后句不再加标记（想加就用 더/점점）', examples: '공부할수록 재미있어요.（越学越有趣，后句无"越"）/ 공부할수록 점점 더 재미있어요.' },
      { type: 'note', text: '强调形 -으면 -을수록 必须重复同一个动词/形容词，不能换词', examples: '보면 볼수록（越看越）/ 알면 알수록（越了解越）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '공부할수록', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '韩语越学越有趣。',
        swapWords: ['공부하다', '연습하다', '배우다', '읽다'],
      },
      {
        wordBlocks: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
        zh: '越看越漂亮。',
        swapWords: ['예쁘다', '멋있다', '귀엽다', '좋다'],
      },
      {
        wordBlocks: [
          { text: '나이가', role: 'subject' },
          { text: '들수록', role: 'verb' },
          { text: '시간이', role: 'subject' },
          { text: '빨라져요', role: 'verb' },
        ],
        zh: '年纪越大时间过得越快。',
        swapWords: ['빨라지다', '짧아지다', '느려지다', '길어지다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习', ko: '한국어는 공부할수록 재미있어요.', zh: '越学越有趣。' },
      { icon: '👀', context: '外观', ko: '보면 볼수록 예쁘네요.', zh: '越看越漂亮。' },
      { icon: '⏰', context: '时间感', ko: '나이가 들수록 시간이 빨라져요.', zh: '年纪越大时间过得越快。' },
      { icon: '🍜', context: '味道', ko: '먹을수록 맛있어요.', zh: '越吃越好吃。' },
      { icon: '📈', context: '进步', ko: '연습할수록 실력이 늘어요.', zh: '越练实力越强。' },
      { icon: '❤️', context: '感情', ko: '만날수록 정이 들어요.', zh: '见面越多越有感情。' },
    ],
    mistakes: [
      { wrong: '가을수록', correct: '갈수록', note: '가다 无收音，用 -ㄹ수록' },
      { wrong: '먹ㄹ수록', correct: '먹을수록', note: '먹다 有收音，用 -을수록' },
      { wrong: '학생수록', correct: '학생일수록', note: '名词需加系词 이 变形' },
    ],
    quickTable: {
      title: '-을/ㄹ수록 一览', english: '-을/ㄹ수록 Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有收音', '-을수록', '먹을수록, 좋을수록'],
        ['无收音', '-ㄹ수록', '갈수록, 볼수록'],
        ['名词', '-(이)ㄹ수록', '학생일수록'],
        ['强调形', '-으면 -을수록', '보면 볼수록'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ수록 变形', english: '-을/ㄹ수록 Conjugation',
      body: '选正确形式',
      questions: [
        {
          prompt: '한국어는 (공부하다) 재미있어요.',
          options: ['공부할수록', '공부하을수록', '공부했수록', '공부는수록'],
          answer: 0,
          explanation: '공부하다 词干 공부하 无收音，用 -ㄹ수록 → 공부할수록。',
        },
        {
          prompt: '(먹다) 맛있어요.',
          options: ['먹수록', '먹ㄹ수록', '먹을수록', '먹었수록'],
          answer: 2,
          explanation: '먹다 有收音，用 -을수록 → 먹을수록。',
        },
        {
          prompt: '(보다) 볼수록 예뻐요.',
          options: ['보', '보면', '봐서', '보니까'],
          answer: 1,
          explanation: '强调形是"-으면 -을수록" → 보면 볼수록。',
        },
        {
          prompt: '(학생) 열심히 공부해야 해요.',
          options: ['학생수록', '학생을수록', '학생일수록', '학생이수록'],
          answer: 2,
          explanation: '名词加 이 变形 → 학생이 + ㄹ수록 = 학생일수록。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"越学越有趣""越看越漂亮" —— 韩语用 <b>-을/ㄹ수록</b>。<br>常用强调形 "-으면 -을수록" 加倍表达程度递进。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을수록 vs -으면</b><br>
    ・-을/ㄹ수록 → 程度递进"越……越……"<br>
    <span style="color:#89756e">먹을수록 맛있어요.（越吃越好吃）</span><br>
    ・-으면 → 条件"如果"<br>
    <span style="color:#89756e">먹으면 좋아요.（吃了就好）</span>
  </div>
</div>`,
    compareLabel: '程度递进 vs 条件',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ수록：越……越……</div>
  <div style="font-size:14px;color:#89756e">程度递进</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有收音 → <b>-을수록</b>：먹을수록<br>
      无收音 → <b>-ㄹ수록</b>：갈수록<br>
      名词 → <b>-(이)ㄹ수록</b>：학생일수록<br>
      强调形 → <b>-으면 -을수록</b>：보면 볼수록
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      공부할수록 재미있어요.<br>
      보면 볼수록 예뻐요.<br>
      나이가 들수록 시간이 빨라져요.<br>
      만날수록 정이 들어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을수록</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈수록（无收音 -ㄹ수록）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생수록</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일수록</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：오죽 -으면 ──────────────────────────────────────
  {
    id: 'card-p28-l05',
    partNumber: 28,
    lessonNumber: 5,
    title: '오죽 -으면',
    whatItDoes: '该多……', english: 'How much...!',
    whatItDoesBody: '「오죽 -으면」是一种感叹反问："该多……啊""得多么……才……"。常与后句"-겠어요/-겠니"配合，表达对某程度深切的推想/共情。', english: '「오죽 -으면」 is an exclamatory rhetorical question: "How much...!" or "To what extent...!" It is often paired with the following clause "-겠어요/-겠니" to express a deep inference or empathy about a certain degree.',
    structureNote: '오죽 + 动词/形容词 + -으면 + ...겠다', english: '오죽 + Verb/Adjective + -으면 + ...겠다',
    rulesNote: '"오죽" 本身是"多么/该多"的意思；结构 "오죽 -으면 -겠어요" 是固定感叹表达', english: '"오죽" itself means "how much" or "to what extent"; the structure "오죽 -으면 -겠어요" is a fixed exclamatory expression.',
    structures: [
      {
        ko: '오죽 힘들면 그런 말을 했겠어요.',
        zh: '得多累啊才说出那种话。',
        tokens: [
          { text: '오죽', role: 'plain' },
          { text: '힘들면', role: 'verb' },
          { text: '그런 말을', role: 'object' },
          { text: '했겠어요', role: 'verb' },
        ],
      },
      {
        ko: '오죽 배고팠으면 그렇게 많이 먹었을까요.',
        zh: '得多饿啊才吃那么多。',
        tokens: [
          { text: '오죽', role: 'plain' },
          { text: '배고팠으면', role: 'verb' },
          { text: '그렇게 많이', role: 'plain' },
          { text: '먹었을까요', role: 'verb' },
        ],
      },
      {
        ko: '오죽하면 눈물이 났겠어요?',
        zh: '得多难过才会掉眼泪呢？',
        tokens: [
          { text: '오죽하면', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '오죽 + 动词/形容词 + -(으)면', examples: '힘들다 → 오죽 힘들면 / 아프다 → 오죽 아프면' },
      { type: 'rule', text: '后接 -겠다/-겠어요/-을까 表推想感叹', examples: '오죽 힘들면 그랬겠어요.（要多难才会那样啊。）' },
      { type: 'rule', text: '过去式：-았/었으면 + -았겠어요/-었을까요', examples: '오죽 배고팠으면 그렇게 먹었을까요.（得多饿才那样吃啊。）' },
      { type: 'usage', text: '"오죽하면" 是常见凝缩形，直接表达"何等程度……才会"', examples: '오죽하면 그러겠어요?' },
      { type: 'usage', text: '带同情/理解/感叹的语气，不是简单陈述', examples: '오죽 답답하면 그렇게 소리쳤겠어요.（得多憋屈才那样喊啊。）' },
      { type: 'note', text: '通常反问形，翻译"该多……啊"或"得多么……才……"', examples: '오죽 좋으면 하루종일 웃었겠어요?' },
      { type: 'note', text: '别把这里的 -(으)면 理解成"如果"。中文母语者常把"오죽 힘들면"读成"如果很累"，其实它是对既成事实的推想感叹："得多累才……"。', examples: '오죽 힘들면 그랬겠어요.（得多累才那样呢，不是"如果累"）' },
      { type: 'compare', text: '오죽 vs 얼마나：얼마나 是中性的"多么/多少"，可以单纯提问；오죽 一定带同情/感叹，而且必须搭 -겠/-을까 推想，不能像 얼마나 那样单独发问。', examples: '얼마나 힘들었어요?（单纯问：有多累？）↔ 오죽 힘들면 그랬겠어요.（感叹：得多累才那样）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오죽', role: 'plain' },
          { text: '힘들면', role: 'verb' },
          { text: '그런 말을', role: 'object' },
          { text: '했겠어요', role: 'verb' },
        ],
        zh: '得多累才说出那种话。',
        swapWords: ['힘들다', '답답하다', '억울하다', '지치다'],
      },
      {
        wordBlocks: [
          { text: '오죽', role: 'plain' },
          { text: '배고팠으면', role: 'verb' },
          { text: '많이', role: 'plain' },
          { text: '먹었을까요', role: 'verb' },
        ],
        zh: '得多饿才吃那么多。',
        swapWords: ['배고프다', '피곤하다', '지치다', '목마르다'],
      },
      {
        wordBlocks: [
          { text: '오죽하면', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났겠어요', role: 'verb' },
        ],
        zh: '得多难过才掉眼泪呢？',
        swapWords: ['눈물이 나다', '울다', '슬프다', '괴롭다'],
      },
    ],
    scenarios: [
      { icon: '💔', context: '共情', ko: '오죽 힘들면 그런 말을 했겠어요.', zh: '得多累才说那种话。' },
      { icon: '🍚', context: '推想', ko: '오죽 배고팠으면 그렇게 많이 먹었을까요.', zh: '得多饿才吃那么多。' },
      { icon: '😢', context: '感叹', ko: '오죽하면 눈물이 났겠어요?', zh: '得多难过才掉泪呢？' },
      { icon: '😤', context: '气愤', ko: '오죽 답답하면 그렇게 소리쳤겠어요.', zh: '得多憋屈才那么喊。' },
      { icon: '🤝', context: '理解', ko: '오죽하면 그랬겠어요, 이해해요.', zh: '也是没办法才那样吧，我理解。' },
      { icon: '😊', context: '好', ko: '오죽 좋으면 하루종일 웃었겠어요?', zh: '得多开心才笑一整天呢？' },
    ],
    mistakes: [
      { wrong: '오죽 힘들어면', correct: '오죽 힘들면', note: '词干 힘들 有收音，加 -으면 → 힘들면（ㄹ 已在词干中）' },
      { wrong: '오죽 힘들면 그래요', correct: '오죽 힘들면 그러겠어요', note: '后句必须用推想感叹 -겠어요/-을까요' },
      { wrong: '오죽하다면', correct: '오죽하면', note: '오죽하면 是固定凝缩形，不用 -다면' },
    ],
    quickTable: {
      title: '오죽 -으면 结构', english: '오죽 -으면 Structure',
      headers: ['要点', '规则', '例子'],
      rows: [
        ['前句', '오죽 + 词干 + -(으)면', '오죽 힘들면'],
        ['后句', '-겠어요/-을까요', '그랬겠어요'],
        ['过去', '-았/었으면 + -았겠어요', '배고팠으면 먹었을까요'],
        ['凝缩', '오죽하면', '오죽하면 그러겠어요?'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '오죽 -으면 综合练习', english: '오죽 -으면 Comprehensive Practice',
      body: '选择正确形式',
      questions: [
        {
          prompt: '오죽 (힘들다) 그런 말을 했겠어요.',
          options: ['힘든면', '힘들면', '힘드면', '힘들으면'],
          answer: 1,
          explanation: '힘들다 词干 힘들，加 -면 → 힘들면。',
        },
        {
          prompt: '오죽 배고팠으면 그렇게 많이 (먹다) 까요.',
          options: ['먹', '먹었을', '먹으', '먹을'],
          answer: 1,
          explanation: '过去推想用 -았/었을까요 → 먹었을까요。',
        },
        {
          prompt: '(오죽) 눈물이 났겠어요?',
          options: ['오죽하다면', '오죽하면', '오죽으면', '오죽이면'],
          answer: 1,
          explanation: '固定凝缩形是 오죽하면。',
        },
        {
          prompt: '오죽 -으면 后句应该用……',
          options: ['-어요（陈述）', '-겠어요/-을까요（推想感叹）', '-으세요（命令）', '-읍시다（建议）'],
          answer: 1,
          explanation: '오죽 -으면 是感叹反问，后句必须是推想感叹 -겠어요/-을까요。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"得多累才说那种话""得多饿才吃那么多" —— 韩语这种带共情/推想的感叹反问用 <b>오죽 -으면 -겠어요</b>。<br>凝缩形 "오죽하면" 也超常用。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>오죽 -으면 结构</b><br>
    前句：오죽 + 形容词/动词 + -(으)면<br>
    后句：-겠어요 / -을까요（推想感叹）<br>
    <span style="color:#89756e">오죽 힘들면 그랬겠어요.（得多累才那样呢）</span><br>
    凝缩：오죽하면 -겠어요?
  </div>
</div>`,
    compareLabel: '感叹反问结构',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">오죽 -으면：该多……啊</div>
  <div style="font-size:14px;color:#89756e">感叹 · 共情 · 推想反问</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心结构</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句 → 오죽 + 词干 + <b>-(으)면</b><br>
      后句 → <b>-겠어요 / -을까요</b>（推想感叹）<br>
      凝缩 → <b>오죽하면</b> = "该多……才会"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型语气</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      共情：오죽하면 그랬겠어요, 이해해요.<br>
      推想：오죽 배고팠으면 그렇게 먹었을까요.<br>
      感叹：오죽 좋으면 하루종일 웃었겠어요?
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오죽 힘들면 그래요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오죽 힘들면 그러겠어요（后句必须推想）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오죽하다면</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오죽하면（固定凝缩形）</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：-기(는) 하다 深化 ──────────────────────────────────────
  {
    id: 'card-p28-l06',
    partNumber: 28,
    lessonNumber: 6,
    title: '-기(는) 하다 深化', english: '-기(는) 하다 Deep Dive',
    whatItDoes: '虽然……但', english: 'Although... but',
    whatItDoesBody: '「-기(는) 하다」表示"虽然……但""……倒是……"。前项承认某事实，后接转折或补充。是让步语气，常与 -지만/-는데 搭配。', english: '「-기(는) 하다」 expresses "although... but" or "...indeed...". The first part acknowledges a fact, followed by a contrast or additional comment. It conveys a concessive tone and is often used with -지만/-는데.',
    structureNote: '动词/形容词词干 + -기(는) 하다 · 名词 + 이기(는) 하다', english: 'Verb/Adjective stem + -기(는) 하다 · Noun + 이기(는) 하다',
    rulesNote: '常用形式：-기는 하다 / -기는 하지만 / -기는 한데；作让步转折', english: 'Common forms: -기는 하다 / -기는 하지만 / -기는 한데; used for concession or contrast',
    structures: [
      {
        ko: '먹기는 하는데 맛이 없어요.',
        zh: '吃倒是吃，但不好吃。',
        tokens: [
          { text: '먹기는 하는데', role: 'verb' },
          { text: '맛이 없어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어가 재미있기는 한데 어려워요.',
        zh: '韩语有趣是有趣，但难。',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있기는 한데', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 오기는 하지만 늦을 거예요.',
        zh: '民秀虽然会来，但会晚。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '오기는 하지만', role: 'verb' },
          { text: '늦을 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -기(는) 하다', examples: '먹다 → 먹기는 하다 / 좋다 → 좋기는 하다' },
      { type: 'rule', text: '名词 + 이기(는) 하다', examples: '학생이기는 하다（是学生倒是学生。）' },
      { type: 'rule', text: '-기는 하는데 / -기는 하지만 → 常见让步转折', examples: '가기는 하지만 늦게 갈 거예요.（去是去，但会晚到。）' },
      { type: 'usage', text: '前句承认事实，后句加保留、限制、转折', examples: '재미있기는 한데 어려워요.（有意思是有意思，但难。）' },
      { type: 'usage', text: '语气比 -지만 更强调"承认" + "但是"', examples: '오기는 하는데 시간이 오래 걸려요.（来是来，但要花很久。）' },
      { type: 'compare', text: '-기는 하다 vs -지만 → 前者带承认让步语气，后者纯转折', examples: '오지만 늦어요(转折) / 오기는 하는데 늦어요(承认+但)' },
      { type: 'note', text: '"-기는요" 是缩略形，常用于回答表委婉否认', examples: '"잘하시네요." - "잘하기는요."（哪里/也谈不上）' },
      { type: 'note', text: '时态、否定都挂在后面的 하다 上，前面的 -기 不变形。中文母语者常把"了"往前塞成 먹었기는 —— 错。过去要说 먹기는 했다。', examples: '가기는 했는데 늦었어요.（去是去了，但迟到了）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '먹기는', role: 'verb' },
          { text: '하는데', role: 'verb' },
          { text: '맛이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '吃倒是吃但不好吃。',
        swapWords: ['먹다', '마시다', '읽다', '보다'],
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있기는', role: 'plain' },
          { text: '한데', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '有趣是有趣但难。',
        swapWords: ['재미있다', '유용하다', '흥미롭다', '좋다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '오기는', role: 'verb' },
          { text: '하지만', role: 'verb' },
          { text: '늦을 거예요', role: 'verb' },
        ],
        zh: '民秀会来但会晚。',
        swapWords: ['오다', '가다', '나가다', '들르다'],
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '味道', ko: '먹기는 하는데 맛이 없어요.', zh: '吃倒吃但不好吃。' },
      { icon: '📚', context: '学习', ko: '한국어가 재미있기는 한데 어려워요.', zh: '有趣是有趣但难。' },
      { icon: '⏰', context: '延迟', ko: '민수가 오기는 하지만 늦을 거예요.', zh: '来是会来但会晚。' },
      { icon: '👍', context: '委婉否认', ko: '잘하기는요, 아직 부족해요.', zh: '哪里啊，还差得远。' },
      { icon: '💰', context: '价格', ko: '싸기는 한데 품질이 별로예요.', zh: '便宜是便宜但质量一般。' },
      { icon: '🎨', context: '外观', ko: '예쁘기는 하지만 너무 화려해요.', zh: '漂亮是漂亮但太花哨。' },
    ],
    mistakes: [
      { wrong: '먹는 하는데', correct: '먹기는 하는데', note: '固定为 -기(는) 하다，不用 -는' },
      { wrong: '먹기 한데', correct: '먹기는 한데', note: '让步语气需带助词 -는' },
      { wrong: '한국어가 재미있기는 해서 어려워요', correct: '한국어가 재미있기는 한데 어려워요', note: '让步转折用 -기는 한데/하지만，不用 -해서' },
      { wrong: '먹었기는 하는데', correct: '먹기는 했는데', note: '过去式加在 하다 上（했-），不加在前面的 -기 上' },
    ],
    quickTable: {
      title: '-기(는) 하다 变体', english: '-기(는) 하다 Variations',
      headers: ['形式', '用法', '例子'],
      rows: [
        ['-기는 하다', '基本承认', '먹기는 해요'],
        ['-기는 하지만', '让步转折', '오기는 하지만 늦어요'],
        ['-기는 한데', '柔和转折', '재미있기는 한데'],
        ['-기는요', '委婉否认', '"잘하시네" - "잘하기는요"'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기(는) 하다 综合', english: '-기(는) 하다 Comprehensive',
      body: '选择正确形式',
      questions: [
        {
          prompt: '먹 (하는데) 맛이 없어요.',
          options: ['먹기', '먹기는', '먹으면', '먹어서'],
          answer: 1,
          explanation: '让步语气用 -기는 → 먹기는 하는데。',
        },
        {
          prompt: '한국어가 재미있기는 (한데/하다) 어려워요.',
          options: ['한다', '해서', '한데', '해요'],
          answer: 2,
          explanation: '柔和转折用 -기는 한데 → 재미있기는 한데 어려워요。',
        },
        {
          prompt: '"잘하시네요." → "(委婉否认)"',
          options: ['잘해요', '잘하기는요', '잘하기 해요', '잘하겠어요'],
          answer: 1,
          explanation: '委婉否认/自谦用 -기는요 → 잘하기는요。',
        },
        {
          prompt: '-기는 하지만 的核心语气是……',
          options: ['纯转折', '承认事实+转折保留', '完全否定', '委婉命令'],
          answer: 1,
          explanation: '-기는 하지만 是"承认事实但……"，比 -지만 多了让步承认语气。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"吃倒是吃但不好吃""来是会来但会晚" —— 韩语这种"承认+让步转折"用 <b>-기(는) 하다</b>。<br>比 -지만 多了一层"我承认……"的语气。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기(는) 하다 vs -지만</b><br>
    ・-지만 → 单纯转折"但是"<br>
    <span style="color:#89756e">오지만 늦어요.（来但晚）</span><br>
    ・-기는 하다 → 承认+转折"确实……但"<br>
    <span style="color:#89756e">오기는 하는데 늦어요.（来是会来但晚）</span>
  </div>
</div>`,
    compareLabel: '纯转折 vs 承认让步',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기(는) 하다：虽然……但</div>
  <div style="font-size:14px;color:#89756e">承认让步 + 转折</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四大变体</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-기는 하다</b>：基本承认 → 먹기는 해요<br>
      <b>-기는 하지만</b>：让步转折 → 오기는 하지만<br>
      <b>-기는 한데</b>：柔和转折 → 재미있기는 한데<br>
      <b>-기는요</b>：委婉否认 → "잘하기는요"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      먹기는 하는데 맛이 없어요.<br>
      싸기는 한데 품질이 별로예요.<br>
      예쁘기는 하지만 너무 화려해요.<br>
      "잘하시네" - "잘하기는요."
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹는 하는데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹기는 하는데（-기는，不是 -는）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">재미있기는 해서</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재미있기는 한데（让步转折）</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：-고말고요 ──────────────────────────────────────
  {
    id: 'card-p28-l07',
    partNumber: 28,
    lessonNumber: 7,
    title: '-고말고요',
    whatItDoes: '当然……了', english: 'Of course...!',
    whatItDoesBody: '「-고말고요 / -고말고」表示"当然……了""那还用说""……不用说"。用于强烈肯定/赞同对方的话，语气热情、直接、口语化。相当于中文的"当然啊""必须的"。', english: '「-고말고요 / -고말고」 means "of course...!" "that goes without saying" "needless to say...". It is used to strongly affirm or agree with what someone said, with a warm, direct, and colloquial tone. It\'s equivalent to "of course!" or "absolutely!" in Chinese.',
    structureNote: '动词/形容词词干 + -고말고요', english: 'Verb/Adjective stem + -고말고요',
    rulesNote: '直接接词干，不看收音；只用于口语回应；名词用 -이고말고요', english: 'Attach directly to the stem regardless of final consonant; used only in spoken responses; for nouns, use -이고말고요',
    structures: [
      {
        ko: '"영화 재미있었어요?" "재미있고말고요."',
        zh: '"电影有趣吗？" "当然有趣啦。"',
        tokens: [
          { text: '재미있고말고요', role: 'verb' },
        ],
      },
      {
        ko: '"내일 오실 거예요?" "가고말고요."',
        zh: '"明天会来吗？" "当然去啊。"',
        tokens: [
          { text: '가고말고요', role: 'verb' },
        ],
      },
      {
        ko: '"김치 좋아하세요?" "좋아하고말고요."',
        zh: '"喜欢泡菜吗？" "当然喜欢了。"',
        tokens: [
          { text: '좋아하고말고요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -고말고요', examples: '가다 → 가고말고요 / 좋다 → 좋고말고요' },
      { type: 'rule', text: '过去 → -았/었고말고요', examples: '먹었고말고요 / 좋았고말고요' },
      { type: 'rule', text: '名词 → -이고말고요', examples: '학생이고말고요' },
      { type: 'usage', text: '仅用于口语，作强烈肯定回答', examples: '"맛있어요?" - "맛있고말고요."' },
      { type: 'usage', text: '非敬语用 -고말고', examples: '"밥 먹었어?" - "먹었고말고."' },
      { type: 'compare', text: '-고말고요 vs 그럼요 → 语义相同，都表"当然"', examples: '"가실 거예요?" - "가고말고요." = "그럼요, 가요."' },
      { type: 'note', text: '不用于陈述句，只作应答', examples: '(✗) 저는 가고말고요 시장에.（错误说法：고말고요 只作应答，不能这样接宾语作陈述句）' },
      { type: 'compare', text: '这里的 -고 跟你学过的连接词尾 -고（"……而且……"）没关系，是一个整体固定词尾 -고말고요，不能拆开理解。别看到 -고 就以为要接下一个动作。', examples: '먹고 자요（先吃再睡，连接）↔ 먹고말고요（当然吃啦，应答，整体一个词）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '영화가', role: 'subject' },
          { text: '재미있고말고요', role: 'verb' },
        ],
        zh: '电影当然有趣啦。',
        swapWords: ['재미있다', '좋다', '멋있다', '유익하다'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '가고말고요', role: 'verb' },
        ],
        zh: '明天当然去啊。',
        swapWords: ['가다', '오다', '만나다', '참석하다'],
      },
      {
        wordBlocks: [
          { text: '김치를', role: 'object' },
          { text: '좋아하고말고요', role: 'verb' },
        ],
        zh: '当然喜欢泡菜了。',
        swapWords: ['좋아하다', '먹다', '즐기다', '사랑하다'],
      },
    ],
    scenarios: [
      { icon: '🎬', context: '肯定', ko: '"재미있어요?" "재미있고말고요."', zh: '当然有趣啦。' },
      { icon: '📅', context: '答应', ko: '"오실 거예요?" "가고말고요."', zh: '当然去啊。' },
      { icon: '🥬', context: '喜好', ko: '"김치 좋아하세요?" "좋아하고말고요."', zh: '当然喜欢了。' },
      { icon: '👨‍🎓', context: '身份', ko: '"학생이에요?" "학생이고말고요."', zh: '当然是学生啦。' },
      { icon: '💪', context: '能力', ko: '"할 수 있어요?" "할 수 있고말고요."', zh: '当然能做到。' },
      { icon: '🤝', context: '同意', ko: '"동의하세요?" "동의하고말고요."', zh: '当然同意了。' },
    ],
    mistakes: [
      { wrong: '가는고말고요', correct: '가고말고요', note: '直接接词干 -고말고요，不用 -는' },
      { wrong: '가고말고요, 시장에 가요', correct: '가고말고요.', note: '-고말고요 只作应答，不接补足语句' },
      { wrong: '학생고말고요', correct: '학생이고말고요', note: '名词需加系词 이' },
    ],
    quickTable: {
      title: '-고말고요 用法', english: '-고말고요 Usage',
      headers: ['结构', '用法', '例子'],
      rows: [
        ['-고말고요', '敬语回答', '가고말고요'],
        ['-고말고', '半语/非敬语', '먹었고말고'],
        ['-이고말고요', '名词回答', '학생이고말고요'],
        ['过去', '-았/었고말고요', '먹었고말고요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-고말고요 综合', english: '-고말고요 Comprehensive',
      body: '选择正确形式',
      questions: [
        {
          prompt: '"영화 재미있었어요?" → "재미있(고말고요)."',
          options: ['재미있는고말고요', '재미있고말고요', '재미있는 고말고요', '재미있으고말고요'],
          answer: 1,
          explanation: '直接接词干 -고말고요 → 재미있고말고요。',
        },
        {
          prompt: '"학생이에요?" → "(학생) 고말고요."',
          options: ['학생', '학생은', '학생이', '학생을'],
          answer: 2,
          explanation: '名词加系词 이 + 고말고요 → 학생이고말고요。',
        },
        {
          prompt: '"어제 밥 먹었어?" → "(먹다) 고말고."（半语）',
          options: ['먹', '먹었', '먹고', '먹으'],
          answer: 1,
          explanation: '过去时用 -았/었고말고 → 먹었고말고。',
        },
        {
          prompt: '-고말고요 的语义是……',
          options: ['也许可以', '也不错', '当然/那还用说', '不一定'],
          answer: 2,
          explanation: '-고말고요 表强烈肯定"当然""那还用说"，只作口语应答。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"当然啦！""那还用说！" —— 韩语强烈肯定的口语应答用 <b>-고말고요</b>。<br>它只作应答，不能陈述使用；名词版加 이 → -이고말고요。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-고말고요 vs 그럼요</b><br>
    语义相同："当然/那还用说"<br>
    ・-고말고요 → 强调具体动作/状态<br>
    <span style="color:#89756e">"가실 거죠?" "가고말고요."</span><br>
    ・그럼요 → 简短肯定<br>
    <span style="color:#89756e">"가실 거죠?" "그럼요."</span>
  </div>
</div>`,
    compareLabel: '-고말고요 vs 그럼요',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-고말고요：当然……</div>
  <div style="font-size:14px;color:#89756e">口语强烈肯定应答</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词/形容词 → 词干 + <b>-고말고요</b><br>
      过去 → <b>-았/었고말고요</b><br>
      名词 → <b>-이고말고요</b><br>
      半语 → <b>-고말고</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型对话</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      "가실 거예요?" → "가고말고요."<br>
      "재미있어요?" → "재미있고말고요."<br>
      "학생이에요?" → "학생이고말고요."<br>
      "할 수 있어요?" → "할 수 있고말고요."
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가는고말고요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가고말고요（直接词干+고말고요）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생고말고요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이고말고요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：-을/ㄹ 따름이다 ──────────────────────────────────────
  {
    id: 'card-p28-l08',
    partNumber: 28,
    lessonNumber: 8,
    title: '-을/ㄹ 따름이다',
    whatItDoes: '只是……而已', english: 'Just... that\'s all',
    whatItDoesBody: '「-을/ㄹ 따름이다」表示"只是……而已""不过是……"。用于强调"没有其他，仅此而已"的心情。语感书面正式，常用于自谦、遗憾、无奈、感激的表达。', english: '「-을/ㄹ 따름이다」 means "just... that\'s all" or "merely...". It is used to emphasize the feeling of "there is nothing else, only this." The tone is formal and literary, often used in expressions of humility, regret, helplessness, or gratitude.',
    structureNote: '动词/形容词词干：有收音 -을 따름이다 / 无收音 -ㄹ 따름이다', english: 'Verb/Adjective stem: with final consonant -을 따름이다 / without final consonant -ㄹ 따름이다',
    rulesNote: '"따름" 意为"仅仅/只是"；-을/ㄹ 따름이다 是固定搭配；名词 -(이)ㄹ 따름이다', english: '"따름" means "merely/just"; -을/ㄹ 따름이다 is a fixed expression; for nouns, use -(이)ㄹ 따름이다',
    structures: [
      {
        ko: '그저 감사할 따름이에요.',
        zh: '只是感激而已。',
        tokens: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
      },
      {
        ko: '제 할 일을 했을 따름이에요.',
        zh: '只是做了本分而已。',
        tokens: [
          { text: '제 할 일을', role: 'object' },
          { text: '했을', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
      },
      {
        ko: '그저 부끄러울 따름입니다.',
        zh: '只是感到惭愧而已。',
        tokens: [
          { text: '그저', role: 'plain' },
          { text: '부끄러울', role: 'plain' },
          { text: '따름입니다', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → -을 따름이다', examples: '먹다 → 먹을 따름이다 / 좋다 → 좋을 따름이다' },
      { type: 'rule', text: '无收音 → -ㄹ 따름이다', examples: '가다 → 갈 따름이다 / 하다 → 할 따름이다' },
      { type: 'rule', text: '过去 → -았/었을 따름이다', examples: '갔을 따름이다 / 했을 따름이다' },
      { type: 'rule', text: '名词 → -(이)ㄹ 따름이다', examples: '학생일 따름이다（只不过是个学生罢了。）' },
      { type: 'usage', text: '强调"没别的，只有这个"，语气委婉正式', examples: '감사할 따름이에요.（只是心怀感激）' },
      { type: 'usage', text: '常用情感表达：감사할 / 부끄러울 / 안타까울 / 죄송할', examples: '죄송할 따름입니다.（只有满心歉意。）' },
      { type: 'compare', text: '-을 따름이다 vs -을 뿐이다 → 语义几乎相同，前者更正式书面', examples: '감사할 따름 = 감사할 뿐（更书面 vs 更口语）' },
      { type: 'note', text: '主要用于自谦、道歉、感激、遗憾的正式场合', examples: '노력했을 따름이에요.（只是尽力了而已。）' },
      { type: 'note', text: '中文的"只"能表数量（只有一千块），但 따름이다 不表数量限定。它是"心情/行为仅此而已，别无其他"。数量上的"只有"要用 밖에/뿐。', examples: '(表数量) 천 원밖에 없어요.（只有一千块）↔ (表心情) 그저 감사할 따름이에요.（只是感激）' },
      { type: 'compare', text: '따름 只能出现在 따름이다 里，是个"专属搭档"。别拿它套 뿐 的扩展说法：뿐 有 뿐만 아니라，따름 没有 따름만 아니라。', examples: '(✓) 감사할 따름이에요. / (✓) 도움뿐만 아니라… (✗) 도움 따름만 아니라' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是感激而已。',
        swapWords: ['감사하다', '고맙다', '기쁘다', '뿌듯하다'],
      },
      {
        wordBlocks: [
          { text: '제', role: 'plain' },
          { text: '할 일을', role: 'object' },
          { text: '했을', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是做了本分。',
        swapWords: ['하다', '완수하다', '해내다', '이행하다'],
      },
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '부끄러울', role: 'plain' },
          { text: '따름입니다', role: 'plain' },
        ],
        zh: '只是感到惭愧。',
        swapWords: ['부끄럽다', '민망하다', '창피하다', '죄송하다'],
      },
    ],
    scenarios: [
      { icon: '🙏', context: '感激', ko: '그저 감사할 따름이에요.', zh: '只是感激而已。' },
      { icon: '💼', context: '自谦', ko: '제 할 일을 했을 따름이에요.', zh: '只是做了本分。' },
      { icon: '😳', context: '惭愧', ko: '그저 부끄러울 따름입니다.', zh: '只是感到惭愧。' },
      { icon: '💔', context: '遗憾', ko: '안타까울 따름이에요.', zh: '只是觉得可惜。' },
      { icon: '🙇', context: '道歉', ko: '죄송할 따름입니다.', zh: '只有满心歉意。' },
      { icon: '🌟', context: '努力', ko: '최선을 다했을 따름입니다.', zh: '只是尽了最大努力。' },
    ],
    mistakes: [
      { wrong: '감사하는 따름이다', correct: '감사할 따름이다', note: '固定为 -을/ㄹ 따름이다，不用 -는' },
      { wrong: '가을 따름이다', correct: '갈 따름이다', note: '가다 无收音，用 -ㄹ 따름이다' },
      { wrong: '학생 따름이다', correct: '학생일 따름이다', note: '名词需加系词 이 变形' },
    ],
    quickTable: {
      title: '-을/ㄹ 따름이다 一览', english: '-을/ㄹ 따름이다 Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有收音', '-을 따름이다', '먹을 따름이다'],
        ['无收音', '-ㄹ 따름이다', '할 따름이다'],
        ['过去', '-았/었을 따름이다', '했을 따름이다'],
        ['名词', '-(이)ㄹ 따름이다', '학생일 따름이다'],
        ['同义', '-을/ㄹ 뿐이다', '更口语版本'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ 따름이다 变形', english: '-을/ㄹ 따름이다 Conjugation',
      body: '选择正确形式',
      questions: [
        {
          prompt: '그저 (감사하다) 따름이에요.',
          options: ['감사한', '감사할', '감사하는', '감사해서'],
          answer: 1,
          explanation: '감사하다 词干 감사하 无收音，用 -ㄹ 따름이다 → 감사할 따름이에요。',
        },
        {
          prompt: '제 할 일을 (하다) 따름이에요.',
          options: ['한', '할', '했을', '하는'],
          answer: 2,
          explanation: '"只是做了"是过去，用 -았/었을 따름이다 → 했을 따름이에요。',
        },
        {
          prompt: '그저 (부끄럽다) 따름입니다.',
          options: ['부끄러운', '부끄러울', '부끄러웠을', '부끄러운는'],
          answer: 1,
          explanation: '부끄럽다 词干 부끄러워 → 부끄러울 따름입니다（ㅂ不规则）。',
        },
        {
          prompt: '-을/ㄹ 따름이다 的语气是……',
          options: ['轻松口语', '书面正式（自谦/感激/遗憾）', '强硬命令', '随便闲聊'],
          answer: 1,
          explanation: '-을/ㄹ 따름이다 是书面正式表达，多用于自谦、感激、道歉、遗憾。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"只是感激而已""只是做了本分" —— 韩语书面版"仅仅、只是"用 <b>-을/ㄹ 따름이다</b>。<br>它是 -을/ㄹ 뿐이다 的正式版，多用于自谦、道歉、感激。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을 따름이다 vs -을 뿐이다</b><br>
    语义相同："只是……而已"<br>
    ・-을 따름이다 → 书面/正式/演讲<br>
    <span style="color:#89756e">감사할 따름입니다.</span><br>
    ・-을 뿐이다 → 日常口语<br>
    <span style="color:#89756e">감사할 뿐이에요.</span>
  </div>
</div>`,
    compareLabel: '-을 따름 vs -을 뿐',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ 따름이다：只是……而已</div>
  <div style="font-size:14px;color:#89756e">书面正式版"仅此而已"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有收音 → <b>-을 따름이다</b>：먹을 따름<br>
      无收音 → <b>-ㄹ 따름이다</b>：할 따름<br>
      过去 → <b>-았/었을 따름이다</b>：했을 따름<br>
      名词 → <b>-(이)ㄹ 따름이다</b>：학생일 따름
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      感激：감사할 따름이에요.<br>
      自谦：할 일을 했을 따름이에요.<br>
      道歉：죄송할 따름입니다.<br>
      遗憾：안타까울 따름이에요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">감사하는 따름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">감사할 따름이다（-을/ㄹ 따름）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을 따름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 따름이다</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p28-l09',
    partNumber: 28,
    lessonNumber: 9,
    title: 'P28 综合练习', english: 'P28 Comprehensive Practice',
    whatItDoes: 'P28 综合复习', english: 'P28 Comprehensive Review',
    whatItDoesBody: '本练习综合复习 P28 强调与感叹深化章节的 8 个语法点：-기(가) N하다 / 얼마나 -는지 모르다 / -다 못해 / -을수록 / 오죽 -으면 / -기(는) 하다 / -고말고요 / -을 따름이다。', english: 'This exercise comprehensively reviews the 8 grammar points from the P28 chapter on emphasis and exclamation: -기(가) N하다 / 얼마나 -는지 모르다 / -다 못해 / -을수록 / 오죽 -으면 / -기(는) 하다 / -고말고요 / -을 따름이다.',
    structureNote: '综合本 Part 所有语法', english: 'Comprehensive review of all grammar points in this Part',
    rulesNote: '重点辨析：感叹强度阶梯 및 让步转折与限定表达', english: 'Key distinctions: the intensity scale of exclamations and expressions of concession/concession-contrast and limitation',
    isPractice: true,
    structures: [
      {
        ko: '한국어는 배우기가 어려워요.',
        zh: '韩语学起来难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '한국어가 얼마나 어려운지 몰라요.',
        zh: '韩语不知有多难。',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '보면 볼수록 예쁘네요.',
        zh: '越看越漂亮。',
        tokens: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기(가) N하다 → 做……起来（评价难易/舒适）' },
      { type: 'rule', text: '얼마나 -는지 모르다 → 不知有多……（强烈感叹）' },
      { type: 'rule', text: '-다 못해 → 甚至……到（程度递进）' },
      { type: 'rule', text: '-을/ㄹ수록 → 越……越……（程度递增）' },
      { type: 'rule', text: '오죽 -으면 -겠어요 → 该多……啊（共情推想）' },
      { type: 'rule', text: '-기(는) 하다 → 承认+让步转折' },
      { type: 'usage', text: '-고말고요 → 当然……啦（口语强烈肯定）' },
      { type: 'usage', text: '-을/ㄹ 따름이다 → 只是……而已（书面正式）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语学起来难。',
        swapWords: ['어렵다', '쉽다', '재미있다', '유용하다'],
      },
      {
        wordBlocks: [
          { text: '먹기는', role: 'verb' },
          { text: '하는데', role: 'verb' },
          { text: '맛이 없어요', role: 'verb' },
        ],
        zh: '吃倒是吃但不好吃。',
        swapWords: ['먹다', '읽다', '보다', '듣다'],
      },
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是感激而已。',
        swapWords: ['감사하다', '고맙다', '기쁘다', '뿌듯하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '评价', ko: '한국어는 배우기가 어려워요.', zh: '韩语学起来难。' },
      { icon: '😲', context: '感叹', ko: '한국어가 얼마나 어려운지 몰라요.', zh: '韩语不知多难。' },
      { icon: '😴', context: '极致', ko: '피곤하다 못해 쓰러졌어요.', zh: '累到瘫倒。' },
      { icon: '📈', context: '递进', ko: '공부할수록 재미있어요.', zh: '越学越有趣。' },
      { icon: '💔', context: '共情', ko: '오죽 힘들면 그랬겠어요.', zh: '得多累才那样。' },
      { icon: '🙏', context: '感激', ko: '그저 감사할 따름이에요.', zh: '只是感激而已。' },
    ],
    mistakes: [
      { wrong: '한국어가 얼마나 어렵는지 몰라요', correct: '한국어가 얼마나 어려운지 몰라요', note: '形容词用 -은/ㄴ지，不用 -는지' },
      { wrong: '먹는 하는데 맛이 없어요', correct: '먹기는 하는데 맛이 없어요', note: '让步用 -기(는) 하다' },
      { wrong: '감사하는 따름이다', correct: '감사할 따름이다', note: '固定为 -을/ㄹ 따름이다' },
    ],
    linkedGrammarIds: ['card-p28-l01', 'card-p28-l02', 'card-p28-l03', 'card-p28-l04', 'card-p28-l05', 'card-p28-l06', 'card-p28-l07', 'card-p28-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P28 综合练习', english: 'P28 Comprehensive Practice',
      body: '选择正确的表达',
      questions: [
        {
          prompt: '"这书读起来容易" 用……',
          options: ['이 책은 읽으면 쉬워요', '이 책은 읽기 쉬워요', '이 책은 읽는 것이 쉬워요', '이 책은 읽어서 쉬워요'],
          answer: 1,
          explanation: '"做……起来"评价用 -기(가) N하다 → 읽기 쉬워요。',
        },
        {
          prompt: '"韩语不知有多难"（强烈感叹）',
          options: ['한국어가 어려워요', '한국어가 얼마나 어려운지 몰라요', '한국어가 얼마나 어렵는지 몰라요', '한국어가 얼마나 어려울지 몰라요'],
          answer: 1,
          explanation: '强烈感叹用 얼마나 -은/ㄴ지 몰라요（形容词用 -은지）→ 어려운지 몰라요。',
        },
        {
          prompt: '"越学越有趣"',
          options: ['공부하면 재미있어요', '공부할수록 재미있어요', '공부해서 재미있어요', '공부하니까 재미있어요'],
          answer: 1,
          explanation: '"越……越……"用 -을/ㄹ수록 → 공부할수록 재미있어요。',
        },
        {
          prompt: '"当然去啊！"（口语强烈肯定）',
          options: ['갈 거예요', '가고말고요', '가면요', '가야죠'],
          answer: 1,
          explanation: '口语强烈肯定应答用 -고말고요 → 가고말고요。',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P28 总结：强调与感叹深化</div>
  <div style="font-size:14px;color:#89756e">评价 / 感叹 / 递进 / 承认 / 肯定</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">八大表达</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-기(가) N하다</b> → 做……起来（评价难易）<br>
      <b>얼마나 -는지 모르다</b> → 不知有多……（强感叹）<br>
      <b>-다 못해</b> → 甚至……到（程度极致）<br>
      <b>-을/ㄹ수록</b> → 越……越……（程度递增）<br>
      <b>오죽 -으면 -겠어요</b> → 该多……啊<br>
      <b>-기(는) 하다</b> → 承认+让步转折<br>
      <b>-고말고요</b> → 当然！（口语肯定）<br>
      <b>-을/ㄹ 따름이다</b> → 只是……而已（正式）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">语气分组</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      评价 → -기 N하다<br>
      感叹 → 얼마나 -는지 모르다 / -다 못해 / 오죽 -으면<br>
      递进 → -을/ㄹ수록<br>
      让步 → -기(는) 하다<br>
      肯定 → -고말고요<br>
      限定 → -을/ㄹ 따름이다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">核心易错</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 形容词冠形用 -은/ㄴ，不用 -는（어렵는지 ✗）<br>
      2. 词干直接接 -기，不做 -아/어 变形<br>
      3. -고말고요 只作应答，不能陈述<br>
      4. -을/ㄹ 따름 vs -을/ㄹ 뿐 → 正式 vs 口语
    </div>
  </div>
</div>`,
  },

];
