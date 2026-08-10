import type { GrammarCard } from '@/types';

export const grammarCardsP13: GrammarCard[] = [
  // ── 第1课：-이/히/리/기 短形被动（1）──────────────────────────────────────
  {
    id: 'card-p13-l01',
    partNumber: 13,
    lessonNumber: 1,
    title: '-이/히/리/기 短形被动（1）',
    whatItDoes: '短形被动',
    whatItDoesBody: '韩语被动的核心方式之一：在动词词干后加入被动接尾 -이-/-히-/-리-/-기-。本课先掌握 -이- 和 -히- 两组：보다→보이다、잡다→잡히다。学习"看见/被抓到/被听到"这类高频短形被动动词。',
    structureNote: '动词词干 + -이/히- + 语尾｜特定动词各自属于哪个接尾需记忆',
    rulesNote: '-이- 类：보다→보이다、쓰다→쓰이다、바꾸다→바뀌다｜-히- 类：잡다→잡히다、먹다→먹히다、읽다→읽히다',
    structures: [
      {
        ko: '멀리서 산이 보여요.',
        zh: '从远处能看到山。',
        tokens: [
          { text: '멀리서', role: 'place' },
          { text: '산이', role: 'subject' },
          { text: '보여요', role: 'verb' },
        ],
      },
      {
        ko: '도둑이 경찰에게 잡혔어요.',
        zh: '小偷被警察抓到了。',
        tokens: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
      },
      {
        ko: '이 책은 많은 사람에게 읽혀요.',
        zh: '这本书被很多人阅读。',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '많은 사람에게', role: 'plain' },
          { text: '읽혀요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-이- 类：보다→보이다 / 쓰다→쓰이다 / 바꾸다→바뀌다', examples: '멀리서 산이 보여요. / 이 표현이 많이 쓰여요.' },
      { type: 'rule', text: '-히- 类：잡다→잡히다 / 먹다→먹히다 / 읽다→읽히다 / 닫다→닫히다', examples: '도둑이 잡혔어요. / 문이 닫혔어요.' },
      { type: 'rule', text: '句子改写：主动 A가 B를 V → 被动 B가 A에게 V-이/히-', examples: '경찰이 도둑을 잡았다 → 도둑이 경찰에게 잡혔다' },
      { type: 'usage', text: '被动句主语用 이/가，动作发出者用 에게 / 에 의해', examples: '창문이 바람에 닫혔다. / 소식이 친구에게 알려졌다.' },
      { type: 'usage', text: '动作已经完成的自然结果：보이다=能看到/呈现出', examples: '눈물이 보였다. / 얼굴이 창백해 보였다.' },
      { type: 'compare', text: '短形被动 vs -아/어지다 → 前者靠接尾变形（固定动词），后者靠 -아/어지다 附加（任意动词）', examples: '잡히다（固定被动）/ 만들어지다（-아/어지다 被动化）' },
      { type: 'note', text: '哪个动词接哪个接尾要记忆，不能自造', examples: '보다→보이다 ✓ / 보다→보히다 ✗' },
      { type: 'note', text: '보이다/들리다 多是"自发·能"（映入眼帘/传入耳中），不是中文的"被人看/被人听"：主动去看用 보다，看得见用 보이다，别用中文"被"硬套', examples: '산이 보여요＝山看得见（自发）/ 소리가 들려요＝声音听得见（自发）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '멀리서', role: 'place' },
          { text: '산이', role: 'subject' },
          { text: '보여요', role: 'verb' },
        ],
        zh: '远处能看到山。',
        swapWords: ['산', '바다', '건물', '별'],
      },
      {
        wordBlocks: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
        zh: '小偷被警察抓了。',
        swapWords: ['잡히다', '붙잡히다', '체포되다', '들키다'],
      },
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '많은 사람에게', role: 'plain' },
          { text: '읽혀요', role: 'verb' },
        ],
        zh: '这本书被很多人读。',
        swapWords: ['읽히다', '팔리다', '알려지다', '전해지다'],
      },
    ],
    scenarios: [
      { icon: '👀', context: '视觉', ko: '멀리서 산이 보여요.', zh: '远处能看见山。' },
      { icon: '👮', context: '抓捕', ko: '도둑이 경찰에게 잡혔어요.', zh: '小偷被警察抓了。' },
      { icon: '📖', context: '阅读', ko: '이 책은 많은 사람에게 읽혀요.', zh: '这本书被很多人读。' },
      { icon: '🚪', context: '关门', ko: '문이 바람에 닫혔어요.', zh: '门被风关上了。' },
      { icon: '🐟', context: '被吃', ko: '작은 물고기가 큰 물고기에게 먹혔어요.', zh: '小鱼被大鱼吃了。' },
      { icon: '📢', context: '被听到', ko: '옆방에서 목소리가 들려요.', zh: '从隔壁房间听到声音。' },
    ],
    mistakes: [
      { wrong: '경찰이 도둑에게 잡혔어요', correct: '도둑이 경찰에게 잡혔어요', note: '被动句：受动者是主语（用 이/가），施动者用 에게' },
      { wrong: '멀리서 산을 보여요', correct: '멀리서 산이 보여요', note: '보이다 是自动词/被动，用 이/가 而不是 을/를' },
      { wrong: '문이 바람에 닫아졌어요', correct: '문이 바람에 닫혔어요', note: '닫다 的被动是 닫히다（短形），不用 -아지다' },
    ],
    quickTable: {
      title: '-이/히- 短形被动速查',
      headers: ['接尾', '主动 → 被动', '含义'],
      rows: [
        ['-이-', '보다 → 보이다', '看 → 能看见'],
        ['-이-', '쓰다 → 쓰이다', '写/用 → 被写/被使用'],
        ['-이-', '바꾸다 → 바뀌다', '换 → 被换'],
        ['-히-', '잡다 → 잡히다', '抓 → 被抓'],
        ['-히-', '읽다 → 읽히다', '读 → 被读'],
        ['-히-', '먹다 → 먹히다', '吃 → 被吃'],
        ['-히-', '닫다 → 닫히다', '关 → 被关'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '短形被动（1）练习',
      body: '选择正确的被动形式',
      questions: [
        {
          prompt: '멀리서 산이 (보다) 어요.',
          options: ['봐요', '보아요', '보여요', '보이여요'],
          answer: 2,
          explanation: '보다 的被动是 보이다 → 现在时 보여요。',
        },
        {
          prompt: '도둑이 경찰에게 (잡다) 았어요.',
          options: ['잡았어요', '잡혔어요', '잡혀졌어요', '잡아졌어요'],
          answer: 1,
          explanation: '잡다 的被动是 잡히다 → 过去 잡혔어요。',
        },
        {
          prompt: '被动句中，动作的接受者（受动者）用哪个助词？',
          options: ['을/를', '이/가', '에게', '에서'],
          answer: 1,
          explanation: '被动句中受动者是主语，用 이/가；施动者用 에게 或 에 의해。',
        },
        {
          prompt: '下面哪个不是"-이/히- 短形被动"？',
          options: ['보이다', '잡히다', '만들어지다', '읽히다'],
          answer: 2,
          explanation: '만들어지다 是 -아/어지다 被动化；其他三个都是短形被动。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l02', 'card-p13-l03'],
    step0Html: `<div class="hook-box"><div style="line-height:1.8">"能看见山""小偷被抓" —— 韩语最基础的被动方式：在词干里加 <b>-이/히-</b>。这不是规则可套，而是"一动词对一接尾"的固定组合。</div></div>
<div class="block">
  <div class="h2">先看三个例子</div>
  <div style="margin-bottom:10px"><div class="ko">멀리서 산이 보여요.</div><div class="zh">从远处能看到山。（보다 → 보이다）</div></div>
  <div style="margin-bottom:10px"><div class="ko">도둑이 경찰에게 잡혔어요.</div><div class="zh">小偷被警察抓到了。（잡다 → 잡히다）</div></div>
  <div><div class="ko">이 책은 많은 사람에게 읽혀요.</div><div class="zh">这本书被很多人阅读。（읽다 → 읽히다）</div></div>
</div>
<div class="block">
  <div class="h2">本课两组接尾</div>
  <div style="line-height:1.9"><b>-이- 类</b>：보다→보이다 / 쓰다→쓰이다 / 바꾸다→바뀌다<br><b>-히- 类</b>：잡다→잡히다 / 먹다→먹히다 / 읽다→읽히다 / 닫다→닫히다</div>
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>主动 vs 被动</b><br>
    ・主动：경찰이 도둑을 잡았다.<br>
    <span style="color:#89756e">(A가 B를 V - 施动者A + 受动者B)</span><br>
    ・被动：도둑이 경찰에게 잡혔다.<br>
    <span style="color:#89756e">(B가 A에게 V-히- - 受动者做主语)</span>
  </div>
</div>`,
    compareLabel: '主动 vs 被动',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-이/히- 短形被动</div>
  <div style="font-size:14px;color:#89756e">보이다 · 잡히다 · 읽히다</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-이- 类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      보다 → 보이다（能看见）<br>
      쓰다 → 쓰이다（被写/被用）<br>
      바꾸다 → 바뀌다（被换）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-히- 类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      잡다 → 잡히다（被抓）<br>
      먹다 → 먹히다（被吃）<br>
      읽다 → 읽히다（被读）<br>
      닫다 → 닫히다（被关）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">경찰이 도둑에게 잡혔다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">도둑이 경찰에게 잡혔다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">문이 바람에 닫아졌어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">문이 바람에 닫혔어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-이/히/리/기 短形被动（2）──────────────────────────────────────
  {
    id: 'card-p13-l02',
    partNumber: 13,
    lessonNumber: 2,
    title: '-리/기 短形被动（2）',
    whatItDoes: '短形被动 续',
    whatItDoesBody: '短形被动的另外两组：-리- 和 -기-。-리- 类：듣다→들리다、팔다→팔리다、열다→열리다；-기- 类：안다→안기다、쫓다→쫓기다、빼앗다→빼앗기다。哪个动词属哪一组，需按记忆表掌握。',
    structureNote: '词干 + -리/기- + 语尾｜属于哪个接尾按动词固定',
    rulesNote: '-리-类：듣→들리다、팔→팔리다、열→열리다、풀→풀리다｜-기-类：안→안기다、쫓→쫓기다、빼앗→빼앗기다、씻→씻기다',
    structures: [
      {
        ko: '옆방에서 노래가 들려요.',
        zh: '从隔壁房间听到歌声。',
        tokens: [
          { text: '옆방에서', role: 'place' },
          { text: '노래가', role: 'subject' },
          { text: '들려요', role: 'verb' },
        ],
      },
      {
        ko: '이 책은 서점에서 잘 팔려요.',
        zh: '这本书在书店卖得很好。',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '서점에서', role: 'place' },
          { text: '잘', role: 'plain' },
          { text: '팔려요', role: 'verb' },
        ],
      },
      {
        ko: '아기가 엄마 품에 안겼어요.',
        zh: '婴儿被妈妈抱在怀里。',
        tokens: [
          { text: '아기가', role: 'subject' },
          { text: '엄마 품에', role: 'place' },
          { text: '안겼어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-리- 类：듣다→들리다 / 팔다→팔리다 / 열다→열리다 / 풀다→풀리다', examples: '노래가 들려요. / 문이 열려요. / 문제가 풀려요.' },
      { type: 'rule', text: '-기- 类：안다→안기다 / 쫓다→쫓기다 / 빼앗다→빼앗기다 / 씻다→씻기다', examples: '아기가 안겼어요. / 도둑이 쫓기고 있어요.' },
      { type: 'rule', text: '主动改被动：A가 B를 V → B가 A에게 V-리/기-', examples: '엄마가 아기를 안았다 → 아기가 엄마에게 안겼다' },
      { type: 'usage', text: '主语受动者用 이/가；施动者用 에게（人）/ 에（自然力）', examples: '나뭇잎이 바람에 날려요. / 편지가 친구에게 전해졌어요.' },
      { type: 'usage', text: '一部分动词有"能……得了"的可能语义', examples: '문이 안 열려요.（门打不开）/ 이 문제가 안 풀려요.（解不出来）' },
      { type: 'compare', text: '短形被动 -리/기- vs 使动 -리/기- → 后接助词不同，且语义相反', examples: '(被动) 아기가 엄마에게 안겼다.(婴儿被妈妈抱)｜(使动) 엄마가 아기를 친구에게 안겼다.(妈妈把婴儿递给朋友抱) - 안기다 被动/使动同形，全靠助词区分' },
      { type: 'note', text: '哪个动词属哪一组不能自造，必须逐个记', examples: '듣다→들리다 ✓ / 듣다→듣이다 ✗' },
      { type: 'note', text: '빼앗기다/쫓기다 这类"吃亏被动"：受害者才是主语（이/가·은/는），被夺走的东西仍保留 을/를，别照搬第1课"受动者一律变 이/가"', examples: '나는 소매치기에게 지갑을 빼앗겼어요.（我被扒手抢走了钱包）— 지갑 用 을，不用 이' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '옆방에서', role: 'place' },
          { text: '노래가', role: 'subject' },
          { text: '들려요', role: 'verb' },
        ],
        zh: '隔壁传来歌声。',
        swapWords: ['노래', '소리', '음악', '목소리'],
      },
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '서점에서', role: 'place' },
          { text: '잘', role: 'plain' },
          { text: '팔려요', role: 'verb' },
        ],
        zh: '这本书畅销。',
        swapWords: ['팔리다', '읽히다', '알려지다', '유명하다'],
      },
      {
        wordBlocks: [
          { text: '아기가', role: 'subject' },
          { text: '엄마 품에', role: 'place' },
          { text: '안겼어요', role: 'verb' },
        ],
        zh: '婴儿被妈妈抱着。',
        swapWords: ['안기다', '업히다', '들리다', '쫓기다'],
      },
    ],
    scenarios: [
      { icon: '🎵', context: '声音', ko: '옆방에서 노래가 들려요.', zh: '隔壁传来歌声。' },
      { icon: '🛒', context: '畅销', ko: '이 책은 서점에서 잘 팔려요.', zh: '这本书畅销。' },
      { icon: '👶', context: '怀抱', ko: '아기가 엄마 품에 안겼어요.', zh: '婴儿被抱在怀里。' },
      { icon: '🚪', context: '开门', ko: '문이 자동으로 열려요.', zh: '门自动打开。' },
      { icon: '🐕', context: '追逐', ko: '고양이가 개에게 쫓겨요.', zh: '猫被狗追赶。' },
      { icon: '🧩', context: '解题', ko: '이 문제가 잘 안 풀려요.', zh: '这题解不出来。' },
    ],
    mistakes: [
      { wrong: '옆방에서 노래를 들려요', correct: '옆방에서 노래가 들려요', note: '들리다 是自动词/被动，用 이/가' },
      { wrong: '아기가 엄마를 안겼어요', correct: '아기가 엄마 품에 안겼어요', note: '被动句中施动方向应用 -에게 或 -에；被抱靠 -에' },
      { wrong: '이 책은 잘 팔았어요', correct: '이 책은 잘 팔려요', note: '强调"畅销"是被动语态 팔리다' },
    ],
    quickTable: {
      title: '-리/기- 短形被动速查',
      headers: ['接尾', '主动 → 被动', '含义'],
      rows: [
        ['-리-', '듣다 → 들리다', '听 → 能听到'],
        ['-리-', '팔다 → 팔리다', '卖 → 被卖/畅销'],
        ['-리-', '열다 → 열리다', '开 → 被打开'],
        ['-리-', '풀다 → 풀리다', '解开 → 被解开'],
        ['-기-', '안다 → 안기다', '抱 → 被抱'],
        ['-기-', '쫓다 → 쫓기다', '追 → 被追'],
        ['-기-', '씻다 → 씻기다', '洗 → 被洗'],
        ['-기-', '빼앗다 → 빼앗기다', '夺 → 被夺'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '短形被动（2）练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '옆방에서 노래가 (듣다) 어요.',
          options: ['들어요', '듣혀요', '들려요', '들어져요'],
          answer: 2,
          explanation: '듣다 的被动是 들리다 → 现在时 들려요。',
        },
        {
          prompt: '아기가 엄마 품에 (안다) 았어요.',
          options: ['안았어요', '안겼어요', '안혔어요', '안리었어요'],
          answer: 1,
          explanation: '안다 的被动是 안기다 → 过去时 안겼어요。',
        },
        {
          prompt: '이 책은 서점에서 잘 (팔다) 요.',
          options: ['팔아요', '팔려요', '팔혀요', '팔이요'],
          answer: 1,
          explanation: '팔다 的被动是 팔리다 → 팔려요，表"畅销"。',
        },
        {
          prompt: '"猫被狗追" 韩语最合适的表达是？',
          options: ['고양이가 개를 쫓아요', '고양이가 개에게 쫓겨요', '고양이를 개가 쫓혀요', '고양이가 개에서 쫓겨요'],
          answer: 1,
          explanation: '被动：受动者 고양이가 + 施动者 개에게 + 쫓기다 → 쫓겨요。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l01', 'card-p13-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"听到歌""被抱着" —— 短形被动的另外两组接尾 <b>-리- / -기-</b>。<br>듣→들리다，안→안기다，팔→팔리다。跟 -이/히- 一样是"一对一"记忆组。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-리- vs -기-</b><br>
    ・-리- 常见：听/卖/开/解<br>
    <span style="color:#89756e">듣다→들리다 / 팔다→팔리다 / 열다→열리다</span><br>
    ・-기- 常见：抱/追/洗/夺<br>
    <span style="color:#89756e">안다→안기다 / 쫓다→쫓기다 / 씻다→씻기다</span>
  </div>
</div>`,
    compareLabel: '-리- vs -기-',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-리/기- 短形被动</div>
  <div style="font-size:14px;color:#89756e">들리다 · 안기다 · 팔리다</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-리- 类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      듣다 → 들리다（能听到）<br>
      팔다 → 팔리다（畅销）<br>
      열다 → 열리다（被打开）<br>
      풀다 → 풀리다（被解开）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-기- 类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      안다 → 안기다（被抱）<br>
      쫓다 → 쫓기다（被追）<br>
      씻다 → 씻기다（被洗）<br>
      빼앗다 → 빼앗기다（被夺）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">노래를 들려요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">노래가 들려요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아기가 엄마를 안겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아기가 엄마 품에 안겼어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-아/어지다 被动化 ──────────────────────────────────────
  {
    id: 'card-p13-l03',
    partNumber: 13,
    lessonNumber: 3,
    title: '-아/어지다 被动化',
    whatItDoes: '任意动词被动化',
    whatItDoesBody: '「-아/어지다」是另一种韩语被动化方式：贴在任意及物动词或形容词后。相比 -이/히/리/기（一动词对一固定接尾），-아/어지다 语法上更通用。侧重"变化产生的结果""不由自主发生"。',
    structureNote: '动词/形容词词干 + -아/어지다｜阳性 -아지다, 阴性 -어지다, 하다 → 해지다',
    rulesNote: '-이/히/리/기 是被动接尾（固定动词），-아/어지다 是被动化后缀（任意动词/形容词）',
    structures: [
      {
        ko: '이 소설은 여러 언어로 번역되었어요.',
        zh: '这部小说被翻译成了多国语言。',
        tokens: [
          { text: '이 소설은', role: 'subject' },
          { text: '여러 언어로', role: 'plain' },
          { text: '번역되었어요', role: 'verb' },
        ],
      },
      {
        ko: '방이 예쁘게 꾸며졌어요.',
        zh: '房间被装饰得很漂亮。',
        tokens: [
          { text: '방이', role: 'subject' },
          { text: '예쁘게', role: 'plain' },
          { text: '꾸며졌어요', role: 'verb' },
        ],
      },
      {
        ko: '날씨가 점점 추워져요.',
        zh: '天气渐渐变冷。',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: '점점', role: 'plain' },
          { text: '추워져요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '阳性词干（ㅏ/ㅗ） → -아지다', examples: '작다 → 작아지다 / 좋다 → 좋아지다' },
      { type: 'rule', text: '阴性词干（其他） → -어지다', examples: '만들다 → 만들어지다 / 예쁘다 → 예뻐지다' },
      { type: 'rule', text: '하다 结尾 → -해지다', examples: '깨끗하다 → 깨끗해지다 / 편하다 → 편해지다' },
      { type: 'usage', text: '动词被动化：만들다 → 만들어지다（被制造）', examples: '이 음식은 여기서 만들어져요.（这道菜是在这里做的。）' },
      { type: 'usage', text: '形容词接 -아/어지다 表变化："变……了"', examples: '얼굴이 창백해졌어요. / 날씨가 추워졌어요.' },
      { type: 'compare', text: '-이/히/리/기 vs -아/어지다 → 前者固定组，后者通用后缀', examples: '잡다→잡히다（固定被动）｜만들다→만들어지다（-어지다 化）' },
      { type: 'note', text: '双重被动 -이/히지다 少见但存在：보이다→보여지다（口语避免用）', examples: '避免："그렇게 보여지다"，用 "그렇게 보이다"' },
      { type: 'note', text: '하다 动词的被动多用 -되다（번역되다/해결되다），别按"하다→해지다"套：-해지다 主要接形容词表"变……"（깨끗해지다=变干净）', examples: '번역되었어요（被翻译）✓ / 번역해졌어요 ✗｜깨끗해졌어요（变干净）✓' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 소설은', role: 'subject' },
          { text: '여러 언어로', role: 'plain' },
          { text: '번역되었어요', role: 'verb' },
        ],
        zh: '此小说被译成多语。',
        swapWords: ['번역되다', '출판되다', '재발행되다', '개정되다'],
      },
      {
        wordBlocks: [
          { text: '방이', role: 'subject' },
          { text: '예쁘게', role: 'plain' },
          { text: '꾸며졌어요', role: 'verb' },
        ],
        zh: '房间被装饰漂亮。',
        swapWords: ['꾸미다', '장식하다', '치우다', '청소하다'],
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '점점', role: 'plain' },
          { text: '추워져요', role: 'verb' },
        ],
        zh: '天气渐冷。',
        swapWords: ['춥다', '덥다', '따뜻하다', '쌀쌀하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '翻译', ko: '이 소설은 여러 언어로 번역되었어요.', zh: '这小说被译成多语。' },
      { icon: '🏠', context: '装饰', ko: '방이 예쁘게 꾸며졌어요.', zh: '房间被装饰漂亮。' },
      { icon: '🌡️', context: '气候', ko: '날씨가 점점 추워져요.', zh: '天气渐冷。' },
      { icon: '🌸', context: '变美', ko: '얼굴이 예뻐졌어요.', zh: '脸变漂亮了。' },
      { icon: '🍳', context: '料理', ko: '이 음식은 정성스럽게 만들어졌어요.', zh: '这道菜被精心制作。' },
      { icon: '💡', context: '变通', ko: '문제가 해결되었어요.', zh: '问题被解决了。' },
    ],
    mistakes: [
      { wrong: '방이 예쁘게 꾸며요', correct: '방이 예쁘게 꾸며졌어요', note: '被动化必须加 -아/어지다，不能光用词干' },
      { wrong: '날씨가 점점 춥어져요', correct: '날씨가 점점 추워져요', note: '춥다 是 ㅂ 不规则 → 추워지다' },
      { wrong: '얼굴이 예뻐어졌어요', correct: '얼굴이 예뻐졌어요', note: '예쁘다 → 예뻐지다（ㅡ脱落）→ 예뻐졌어요' },
    ],
    quickTable: {
      title: '-아/어지다 类型对照',
      headers: ['原型', '类别', '被动化'],
      rows: [
        ['작다', '形容词 ㅏ', '작아지다（变小）'],
        ['좋다', '形容词 ㅗ', '좋아지다（变好）'],
        ['예쁘다', '形容词 ㅡ', '예뻐지다（变漂亮）'],
        ['만들다', '动词', '만들어지다（被制造）'],
        ['꾸미다', '动词', '꾸며지다（被装饰）'],
        ['깨끗하다', '하다类', '깨끗해지다（变干净）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-아/어지다 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '날씨가 점점 (춥다) 어요.',
          options: ['춥어요', '추워져요', '추워요', '춥지어요'],
          answer: 1,
          explanation: '춥다（ㅂ不规则）→ 추워지다 → 추워져요，表"变冷"。',
        },
        {
          prompt: '이 소설은 여러 언어로 (번역되다) 었어요.',
          options: ['번역되었어요', '번역졌어요', '번역해요', '번역되어요'],
          answer: 0,
          explanation: '번역되다 本身已含被动语义 → 过去 번역되었어요。',
        },
        {
          prompt: '얼굴이 (예쁘다) 어졌어요.',
          options: ['예뻐', '예쁘', '예쁘어', '예쁘아'],
          answer: 0,
          explanation: '예쁘다（ㅡ脱落）→ 예뻐지다 → 예뻐졌어요。',
        },
        {
          prompt: '-아/어지다 与 -이/히/리/기 短形被动的区别是？',
          options: [
            '意义完全相同',
            '-아/어지다 是通用后缀，可接任意动词/形容词；-이/히- 是固定接尾，只对特定动词',
            '-아/어지다 只用于形容词，-이/히- 只用于动词',
            '两者可完全互换',
          ],
          answer: 1,
          explanation: '-아/어지다 是通用后缀，-이/히- 是固定组；前者更灵活，后者要记词。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l01', 'card-p13-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"天气渐冷""房间装饰漂亮" —— 除了 -이/히/리/기，韩语还有更通用的被动化后缀 <b>-아/어지다</b>。<br>动词接 = 被动化；形容词接 = 表"变……"。灵活好用。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-이/히/리/기 vs -아/어지다</b><br>
    ・-이/히/리/기 → 固定组、必记<br>
    <span style="color:#89756e">잡다→잡히다 / 듣다→들리다</span><br>
    ・-아/어지다 → 通用后缀<br>
    <span style="color:#89756e">만들다→만들어지다 / 예쁘다→예뻐지다</span>
  </div>
</div>`,
    compareLabel: '固定组 vs 通用后缀',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-아/어지다 被动化</div>
  <div style="font-size:14px;color:#89756e">通用被动 / 表变化</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">变形规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      ㅏ/ㅗ 词干 → <b>-아지다</b>：작아지다<br>
      其他词干 → <b>-어지다</b>：만들어지다<br>
      하다 类 → <b>-해지다</b>：깨끗해지다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例子</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      만들어지다（被制造）<br>
      꾸며지다（被装饰）<br>
      예뻐지다（变漂亮）<br>
      추워지다（变冷）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">춥어져요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">추워져요（ㅂ不规则）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁘어졌어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">예뻐졌어요（ㅡ脱落）</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-게 되다（自然变化） ──────────────────────────────────────
  {
    id: 'card-p13-l04',
    partNumber: 13,
    lessonNumber: 4,
    title: '-게 되다',
    whatItDoes: '自然变化 / 无意愿',
    whatItDoesBody: '「-게 되다」表示"因某种外因/自然发展变成了……的状态""不是自愿地……"。虽属被动语态章节，实际语义偏"自然/被迫地进入某状态"，是韩语委婉表达"决定/变化"的重要方式。',
    structureNote: '动词/形容词词干 + -게 되다',
    rulesNote: '不看받침；表述"外因导致""不由自主"的变化；常与 决定/邂逅/结局 类语境搭配',
    structures: [
      {
        ko: '갑자기 한국에 가게 되었어요.',
        zh: '突然要去韩国了。',
        tokens: [
          { text: '갑자기', role: 'plain' },
          { text: '한국에', role: 'place' },
          { text: '가게 되었어요', role: 'verb' },
        ],
      },
      {
        ko: '이 회사에서 3년을 일하게 되었어요.',
        zh: '结果在这家公司工作了三年。',
        tokens: [
          { text: '이 회사에서', role: 'place' },
          { text: '3년을', role: 'object' },
          { text: '일하게 되었어요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 한국어에 관심을 가지게 되었어요.',
        zh: '最近对韩语产生了兴趣。',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '한국어에', role: 'plain' },
          { text: '관심을', role: 'object' },
          { text: '가지게 되었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -게 되다（不看받침）', examples: '가다 → 가게 되다 / 좋다 → 좋게 되다' },
      { type: 'rule', text: '常用过去时 -게 되었어요 表结果', examples: '한국에 가게 되었어요.（结果要去韩国了。）' },
      { type: 'usage', text: '语义 1：非自愿的变化 / 外因造成', examples: '갑자기 회사를 옮기게 되었어요.（突然被安排换公司）' },
      { type: 'usage', text: '语义 2：自然发展的结果', examples: '오래 지내다 보니 친해지게 되었어요.（相处久了自然亲近起来）' },
      { type: 'usage', text: '语义 3：谦逊表达自己的"决定"', examples: '한국어를 배우게 되었어요.（我开始学韩语了 - 谦逊）' },
      { type: 'compare', text: '-게 되다 vs -아/어지다 → 前者"进入某状态/事态"，后者"变成某状态/属性"', examples: '알게 되었어요.（"知道了"）/ 좋아졌어요.（"变好了"）' },
      { type: 'note', text: '经常被中文思路误译成"要……了"，实为"结果……了"', examples: '한국에 가게 되었다 = 结果去韩国了 / 决定去韩国' },
      { type: 'compare', text: '想强调"是我自己拿主意决定的"别用 -게 되다（它弱化本人意志、显得顺其自然或谦逊），要用 -기로 하다（主动决定，后面章节详学）', examples: '유학 가기로 했어요.（我决定去留学·主动）/ 유학 가게 되었어요.（结果去留学了·外因或谦逊）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '갑자기', role: 'plain' },
          { text: '한국에', role: 'place' },
          { text: '가게 되었어요', role: 'verb' },
        ],
        zh: '突然要去韩国。',
        swapWords: ['가다', '오다', '이사하다', '유학하다'],
      },
      {
        wordBlocks: [
          { text: '이 회사에서', role: 'place' },
          { text: '3년을', role: 'object' },
          { text: '일하게 되었어요', role: 'verb' },
        ],
        zh: '在这家公司工作了三年。',
        swapWords: ['일하다', '지내다', '머무르다', '근무하다'],
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '한국어에', role: 'plain' },
          { text: '관심을', role: 'object' },
          { text: '가지게 되었어요', role: 'verb' },
        ],
        zh: '最近对韩语感兴趣。',
        swapWords: ['가지다', '느끼다', '알다', '이해하다'],
      },
    ],
    scenarios: [
      { icon: '✈️', context: '出行', ko: '갑자기 한국에 가게 되었어요.', zh: '突然要去韩国。' },
      { icon: '💼', context: '工作', ko: '이 회사에서 3년을 일하게 되었어요.', zh: '结果在这里工作三年。' },
      { icon: '📚', context: '兴趣', ko: '한국어에 관심을 가지게 되었어요.', zh: '对韩语产生兴趣。' },
      { icon: '👫', context: '缘分', ko: '우연히 옛 친구를 만나게 되었어요.', zh: '偶然遇到老朋友。' },
      { icon: '🤝', context: '决定', ko: '이번 프로젝트를 맡게 되었어요.', zh: '决定接下这个项目。' },
      { icon: '💡', context: '领悟', ko: '이제야 그 사람의 마음을 알게 되었어요.', zh: '现在才明白他的心。' },
    ],
    mistakes: [
      { wrong: '한국에 가는 되었어요', correct: '한국에 가게 되었어요', note: '固定为 -게 되다，动词后接 -게 不是 -는' },
      { wrong: '한국어를 배우게 되았다', correct: '한국어를 배우게 되었다', note: '되다 的过去式是 되었다/됐다，不是 되았다' },
      { wrong: '갑자기 아프게 되었어요', correct: '갑자기 아파졌어요', note: '表状态变化更自然用 아파지다（-아/어지다）；-게 되다 更适合"事态发展"' },
    ],
    quickTable: {
      title: '-게 되다 三大语义',
      headers: ['语义', '语境', '例子'],
      rows: [
        ['非自愿变化', '被外因推动', '갑자기 이사하게 되었어요.'],
        ['自然发展结果', '时间/关系累积', '오래 지내다 보니 친해지게 되었어요.'],
        ['委婉表达决定', '谦逊说自己的选择', '한국어를 배우게 되었어요.'],
        ['进入某状态', '认知/情感变化', '이제야 알게 되었어요.'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-게 되다 练习',
      body: '选择正确形式或用法',
      questions: [
        {
          prompt: '갑자기 한국에 (가다) 되었어요.',
          options: ['가는', '가게', '가서', '가고'],
          answer: 1,
          explanation: '固定为 -게 되다 → 가게 되었어요。',
        },
        {
          prompt: '한국어를 배우게 되었어요. 最贴切的中文翻译是？',
          options: ['要去学韩语', '结果开始学起了韩语（谦逊）', '一定要学韩语', '曾经学过韩语'],
          answer: 1,
          explanation: '-게 되었어요 是"结果……"或谦逊表达自己的决定；不是"要"或"一定"。',
        },
        {
          prompt: '下列哪句用 -게 되다 最不自然？',
          options: [
            '갑자기 회사를 옮기게 되었어요.',
            '이제야 그 사람의 마음을 알게 되었어요.',
            '어제 갑자기 다치게 되었어요.',
            '오래 지내다 보니 친해지게 되었어요.',
          ],
          answer: 2,
          explanation: '"突然受伤"是瞬发身体状态，用 다쳤어요 更自然；-게 되다 侧重事态发展/长期结果。',
        },
        {
          prompt: '-게 되다 与 -아/어지다 最核心的区别是？',
          options: [
            '意思完全相同',
            '-게 되다 = 事态/局面变化；-아/어지다 = 属性/状态变化',
            '-게 되다 只用于动词，-아/어지다 只用于形容词',
            '-게 되다 表将来，-아/어지다 表过去',
          ],
          answer: 1,
          explanation: '-게 되다 表"进入某事态"（去、留、决定、认识……）；-아/어지다 表"属性/状态改变"（冷、漂亮、有趣）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"突然要去韩国""结果学了韩语" —— 韩语最委婉、最有味道的"变化"表达是 <b>-게 되다</b>。<br>不是"要"、不是"想"，而是"结果……了"。特别适合谦逊说自己的决定。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-게 되다 vs -아/어지다</b><br>
    ・-게 되다 → 事态/局面进入某状态<br>
    <span style="color:#89756e">한국에 가게 되었어요.（结果去韩国了）</span><br>
    ・-아/어지다 → 属性/状态发生改变<br>
    <span style="color:#89756e">얼굴이 예뻐졌어요.（脸变漂亮了）</span>
  </div>
</div>`,
    compareLabel: '-게 되다 vs -아/어지다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-게 되다</div>
  <div style="font-size:14px;color:#89756e">自然/被迫变化 · 谦逊表达</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">三大语义</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 非自愿的变化（갑자기 …게 되었어요）<br>
      2. 自然发展的结果<br>
      3. 委婉表达自己的决定（-게 되었어요）<br>
      4. 认知/情感变化（알게 되었어요）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      갑자기 한국에 가게 되었어요.<br>
      이 회사에서 3년을 일하게 되었어요.<br>
      한국어에 관심을 가지게 되었어요.<br>
      이제야 그 사람의 마음을 알게 되었어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">한국에 가는 되었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">한국에 가게 되었어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갑자기 다치게 되었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갑자기 다쳤어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：되다 被动（하다类）──────────────────────────────────────
  {
    id: 'card-p13-l05',
    partNumber: 13,
    lessonNumber: 5,
    title: '되다 被动',
    whatItDoes: '하다类被动',
    whatItDoesBody: '「하다」结尾的动词无法直接加 -이/히/리/기 变被动。它们靠 하다 → 되다 变被动：공부하다 → 공부되다、결정하다 → 결정되다、발견하다 → 발견되다。这是韩语中量最大的被动组。',
    structureNote: '汉字词/N + 하다 → 汉字词/N + 되다',
    rulesNote: '하다 类动词 → 直接把 하다 换成 되다｜其他动词需用 -이/히- 或 -아/어지다',
    structures: [
      {
        ko: '중요한 결정이 내려졌어요.',
        zh: '重要的决定已经作出。',
        tokens: [
          { text: '중요한 결정이', role: 'subject' },
          { text: '내려졌어요', role: 'verb' },
        ],
      },
      {
        ko: '새로운 방법이 발견되었어요.',
        zh: '发现了新方法。',
        tokens: [
          { text: '새로운 방법이', role: 'subject' },
          { text: '발견되었어요', role: 'verb' },
        ],
      },
      {
        ko: '회의 시간이 갑자기 변경되었어요.',
        zh: '会议时间突然变更了。',
        tokens: [
          { text: '회의 시간이', role: 'subject' },
          { text: '갑자기', role: 'plain' },
          { text: '변경되었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '하다 → 되다：공부하다 → 공부되다', examples: '결정하다 → 결정되다 / 시작하다 → 시작되다' },
      { type: 'rule', text: '汉字词名词 + 되다 → 表被动语义', examples: '발견 → 발견되다 / 해결 → 해결되다 / 발표 → 발표되다' },
      { type: 'rule', text: '句式：A가 B를 (하다) → B가 (되다)', examples: '위원회가 결정했다 → 결정이 되었다' },
      { type: 'usage', text: '句尾多用过去 -되었다 / -됐다 客观陈述', examples: '결정이 되었다. / 문제가 해결됐다.' },
      { type: 'usage', text: '常用于新闻、公文、通知等书面语', examples: '규정이 개정되었습니다. / 정책이 시행되었다.' },
      { type: 'compare', text: '하다 类被动只能用 되다，不能用 -이/히-', examples: '误：공부하다→공부히다 / 正：공부하다→공부되다' },
      { type: 'note', text: '되어졌다 (되다+어지다) 是双重被动，正式书面语避免使用', examples: '避免：결정되어졌다 → 用：결정되었다' },
      { type: 'note', text: '并非所有 하다 动词都能变 되다：感情/关系类的 사랑하다·존경하다·좋아하다 不能说 사랑되다·존경되다', examples: '误：그 가수는 사랑돼요 / 正：그 가수는 사랑받아요' },
      { type: 'note', text: '这类感情/受害类动词改用 받다 或 당하다 表被动（第6课详解）', examples: '사랑하다→사랑받다 / 존경하다→존경받다 / 무시하다→무시당하다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '중요한', role: 'plain' },
          { text: '결정이', role: 'subject' },
          { text: '내려졌어요', role: 'verb' },
        ],
        zh: '重要决定已作出。',
        swapWords: ['결정', '판단', '방침', '지시'],
      },
      {
        wordBlocks: [
          { text: '새로운', role: 'plain' },
          { text: '방법이', role: 'subject' },
          { text: '발견되었어요', role: 'verb' },
        ],
        zh: '发现新方法。',
        swapWords: ['발견되다', '개발되다', '제안되다', '도입되다'],
      },
      {
        wordBlocks: [
          { text: '회의 시간이', role: 'subject' },
          { text: '갑자기', role: 'plain' },
          { text: '변경되었어요', role: 'verb' },
        ],
        zh: '会议时间被变更。',
        swapWords: ['변경되다', '취소되다', '연기되다', '조정되다'],
      },
    ],
    scenarios: [
      { icon: '📋', context: '决策', ko: '중요한 결정이 내려졌어요.', zh: '作出重要决定。' },
      { icon: '🔬', context: '发现', ko: '새로운 방법이 발견되었어요.', zh: '发现新方法。' },
      { icon: '📅', context: '变更', ko: '회의 시간이 변경되었어요.', zh: '会议时间被变更。' },
      { icon: '📢', context: '发布', ko: '새 정책이 발표되었어요.', zh: '发布了新政策。' },
      { icon: '✅', context: '完成', ko: '문제가 해결되었어요.', zh: '问题被解决。' },
      { icon: '🏗️', context: '建造', ko: '이 다리는 2020년에 완공되었어요.', zh: '此桥于 2020 年建成。' },
    ],
    mistakes: [
      { wrong: '문제가 해결하다', correct: '문제가 해결되었다', note: '主动是 문제를 해결하다；被动改用 되다 → 해결되다' },
      { wrong: '새 정책이 발표되어졌다', correct: '새 정책이 발표되었다', note: '되다已含被动，再加 -어지다 是双重被动，规范书面语避免' },
      { wrong: '회의 시간이 변경히었어요', correct: '회의 시간이 변경되었어요', note: '하다 类动词不用 -이/히-，只能用 되다' },
      { wrong: '그 배우는 사람들에게 사랑돼요', correct: '그 배우는 사람들에게 사랑받아요', note: '感情类 사랑하다 不能变 되다，要用 받다（第6课）' },
    ],
    quickTable: {
      title: '常用"하다 → 되다"被动一览',
      headers: ['主动 하다', '被动 되다', '含义'],
      rows: [
        ['결정하다', '결정되다', '作出决定 → 被决定'],
        ['발견하다', '발견되다', '发现 → 被发现'],
        ['변경하다', '변경되다', '变更 → 被变更'],
        ['해결하다', '해결되다', '解决 → 被解决'],
        ['발표하다', '발표되다', '发表 → 被发表'],
        ['시행하다', '시행되다', '施行 → 被施行'],
        ['취소하다', '취소되다', '取消 → 被取消'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '되다 被动 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '중요한 결정이 (하다) 었어요.',
          options: ['했어요', '되었어요', '히었어요', '어졌어요'],
          answer: 1,
          explanation: '하다 类被动是 되다 → 결정되었어요 / 결정이 되었어요。',
        },
        {
          prompt: '회의 시간이 갑자기 (변경하다) 었어요.',
          options: ['변경했어요', '변경되었어요', '변경히었어요', '변경어졌어요'],
          answer: 1,
          explanation: '하다类改为 되다 → 변경되었어요。',
        },
        {
          prompt: '下列表述哪一个是"双重被动"（规范书面语应避免）？',
          options: ['해결되었다', '해결되어졌다', '해결됐다', '해결이 되었다'],
          answer: 1,
          explanation: '되다 已含被动，再加 -어지다 变成 되어졌다 就是双重被动，正式书面语避免。',
        },
        {
          prompt: '"하다"结尾的动词，如何变被动？',
          options: [
            '接 -이/히/리/기',
            '接 -아/어지다',
            '把 하다 换成 되다',
            '不能变被动',
          ],
          answer: 2,
          explanation: '하다 类只能靠 하다→되다 变被动，不用 -이/히-。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"决定作出""政策发布""问题解决" —— 韩语汉字词 + 하다 动词的被动统统靠一招：<b>하다 → 되다</b>。<br>공부하다→공부되다，결정하다→결정되다，是新闻公文的主力被动结构。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>하다 → 되다 vs -이/히-</b><br>
    ・하다 类 → 只能用 <b>되다</b><br>
    <span style="color:#89756e">결정하다 → 결정되다 ✓ / 결정히다 ✗</span><br>
    ・固有动词 → 用 <b>-이/히/리/기</b><br>
    <span style="color:#89756e">잡다 → 잡히다 / 듣다 → 들리다</span>
  </div>
</div>`,
    compareLabel: '하다 vs 固有动词',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">되다 被动（하다类）</div>
  <div style="font-size:14px;color:#89756e">最大的被动组：新闻公文主力</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      하다 → <b>되다</b>：공부하다 → 공부되다<br>
      汉字词 + 하다 → 汉字词 + 되다<br>
      主语用 이/가，宾语消失<br>
      避免 -되어지다（双重被动）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      결정이 내려졌어요.<br>
      새 방법이 발견되었어요.<br>
      회의 시간이 변경되었어요.<br>
      문제가 해결되었어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">변경히었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">변경되었어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">해결되어졌다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">해결되었다</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：당하다 / 받다（受害/受益被动）──────────────────────────────────────
  {
    id: 'card-p13-l06',
    partNumber: 13,
    lessonNumber: 6,
    title: '당하다 / 받다',
    whatItDoes: '受害/受益被动',
    whatItDoesBody: '「당하다」表示"遭受（不好的事）"，「받다」表示"接受（中性或好的事）"。这是韩语中带情感色彩的被动方式：语义上受动，语法上是主动结构。侧重"人受影响"的语用。',
    structureNote: '汉字词 + 당하다（负面）/ 汉字词 + 받다（中性/正面）',
    rulesNote: '당하다=遭受（受害）；받다=接受（中性/受益）；两者语法都是主动动词形式',
    structures: [
      {
        ko: '민수는 사기를 당했어요.',
        zh: '民秀被骗了。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '사기를', role: 'object' },
          { text: '당했어요', role: 'verb' },
        ],
      },
      {
        ko: '어제 상사에게 야단을 맞았어요.',
        zh: '昨天被上司训了。',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '상사에게', role: 'plain' },
          { text: '야단을', role: 'object' },
          { text: '맞았어요', role: 'verb' },
        ],
      },
      {
        ko: '아이가 부모에게 사랑을 많이 받았어요.',
        zh: '孩子从父母那里得到很多爱。',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: '부모에게', role: 'plain' },
          { text: '사랑을', role: 'object' },
          { text: '많이', role: 'plain' },
          { text: '받았어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '汉字词 + 당하다 → 遭受（不好的事）', examples: '사기 → 사기당하다 / 무시 → 무시당하다 / 배신 → 배신당하다' },
      { type: 'rule', text: '汉字词 + 받다 → 接受（中性/正面）', examples: '사랑 → 사랑받다 / 존경 → 존경받다 / 초대 → 초대받다' },
      { type: 'rule', text: '固定动词 맞다 → 挨（打/骂/雨/雪）', examples: '매를 맞다（挨打）/ 야단을 맞다（挨训）/ 비를 맞다（淋雨）' },
      { type: 'usage', text: '句式：受害者 + 施动者에게 + 名词을/를 + 당/받/맞다', examples: '민수가 친구에게 배신을 당했다. / 학생이 선생님께 칭찬을 받았다.' },
      { type: 'compare', text: '당하다 vs 되다 → 前者含情感 (受害/负面)，后者中性', examples: '(负面) 무시당하다 = 被无视（受伤）｜(中性) 무시되다 = 被无视（客观陈述）' },
      { type: 'compare', text: '받다 vs 되다 → 前者含"人接受"，后者中性事态', examples: '(受益) 사랑을 받다 = 得到爱｜(中性) 결정이 되다 = 决定作出' },
      { type: 'note', text: '당하다 只跟负面词搭配，正面/中性事件不用 당하다', examples: '误：칭찬을 당하다 / 正：칭찬을 받다' },
      { type: 'note', text: '당/받/맞 语法上是主动动词：受害者当主语(은/는·이/가)，受害名词仍带 을/를，别套上一课 되다 的"主语用 이/가、宾语消失"', examples: '误：민수는 사기가 당했어요 / 正：민수는 사기를 당했어요' },
      { type: 'note', text: '这里的 맞다 是"挨(打/骂/雨)"，跟你先学的 맞다=对/正确 是同形异义词', examples: '답이 맞다(答案对) ↔ 매를 맞다(挨打) ↔ 비를 맞다(淋雨)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '사기를', role: 'object' },
          { text: '당했어요', role: 'verb' },
        ],
        zh: '民秀被骗了。',
        swapWords: ['사기', '배신', '무시', '거절'],
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '상사에게', role: 'plain' },
          { text: '야단을', role: 'object' },
          { text: '맞았어요', role: 'verb' },
        ],
        zh: '昨天被上司训。',
        swapWords: ['야단', '꾸중', '지적', '경고'],
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: '부모에게', role: 'plain' },
          { text: '사랑을', role: 'object' },
          { text: '받았어요', role: 'verb' },
        ],
        zh: '孩子受父母疼爱。',
        swapWords: ['사랑', '존경', '칭찬', '인정'],
      },
    ],
    scenarios: [
      { icon: '💔', context: '被欺骗', ko: '민수는 사기를 당했어요.', zh: '民秀被骗。' },
      { icon: '😤', context: '被训', ko: '어제 상사에게 야단을 맞았어요.', zh: '昨天被上司训。' },
      { icon: '❤️', context: '受爱', ko: '아이가 부모에게 사랑을 받았어요.', zh: '孩子受父母爱。' },
      { icon: '👏', context: '被表扬', ko: '학생이 선생님께 칭찬을 받았어요.', zh: '学生被老师表扬。' },
      { icon: '🚫', context: '被拒绝', ko: '취업 면접에서 거절을 당했어요.', zh: '求职面试被拒。' },
      { icon: '🎁', context: '被邀请', ko: '친구 결혼식에 초대를 받았어요.', zh: '被邀请参加朋友婚礼。' },
    ],
    mistakes: [
      { wrong: '칭찬을 당했어요', correct: '칭찬을 받았어요', note: '당하다 只跟负面搭配；表扬是正面 → 받다' },
      { wrong: '사기를 받았어요', correct: '사기를 당했어요', note: '受骗是负面 → 당하다' },
      { wrong: '민수가 친구를 배신을 당했다', correct: '민수가 친구에게 배신을 당했다', note: '施动者用 에게，不用 을/를' },
      { wrong: '민수는 사기가 당했어요', correct: '민수는 사기를 당했어요', note: '당하다 是主动动词，受害名词仍是宾语 을/를，不像 되다 用 이/가' },
    ],
    quickTable: {
      title: '당/받/맞 一览',
      headers: ['动词', '语义色彩', '常见搭配'],
      rows: [
        ['당하다', '负面 · 受害', '사기, 배신, 무시, 거절, 폭행'],
        ['받다', '中性/正面 · 接受', '사랑, 존경, 칭찬, 초대, 인정'],
        ['맞다', '身体/挨', '매, 야단, 꾸중, 비, 눈'],
        ['되다', '客观 · 变化', '결정, 발견, 해결, 시행'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '당/받/맞 用词练习',
      body: '选择最合适的搭配',
      questions: [
        {
          prompt: '민수는 친구에게 배신을 (?).',
          options: ['받았어요', '당했어요', '되었어요', '했어요'],
          answer: 1,
          explanation: '"被背叛"是负面 → 당하다 → 당했어요。',
        },
        {
          prompt: '학생이 선생님께 칭찬을 (?).',
          options: ['당했어요', '받았어요', '되었어요', '맞았어요'],
          answer: 1,
          explanation: '"被表扬"是正面 → 받다 → 받았어요。',
        },
        {
          prompt: '어제 상사에게 야단을 (?).',
          options: ['맞았어요', '받았어요', '당했어요', '됐어요'],
          answer: 0,
          explanation: '"挨训"用 맞다（야단을 맞다 是固定搭配）。',
        },
        {
          prompt: '"당하다" 只用于哪一类语境？',
          options: [
            '正面/受益',
            '中性/客观',
            '负面/受害',
            '所有语境通用',
          ],
          answer: 2,
          explanation: '당하다 专用于负面/受害语境；正面用 받다，中性用 되다。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"被骗""被表扬""被打骂" —— 韩语里"人受到影响"的被动，用带情感色彩的动词：<br><b>당하다</b>（受害负面）· <b>받다</b>（受益/中性）· <b>맞다</b>（挨/身体）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>당하다 / 받다 / 맞다</b><br>
    ・당하다 → 负面（사기/배신/무시）<br>
    <span style="color:#89756e">사기를 당했어요.</span><br>
    ・받다 → 中性/正面（사랑/칭찬/초대）<br>
    <span style="color:#89756e">칭찬을 받았어요.</span><br>
    ・맞다 → 身体挨（매/야단/비）<br>
    <span style="color:#89756e">야단을 맞았어요.</span>
  </div>
</div>`,
    compareLabel: '当/받/맞',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">당하다 / 받다 / 맞다</div>
  <div style="font-size:14px;color:#89756e">情感色彩被动 · 人受影响</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">选用规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      당하다 → 负面（사기, 배신, 무시, 거절）<br>
      받다 → 中性/正面（사랑, 칭찬, 초대）<br>
      맞다 → 身体挨（매, 야단, 비）<br>
      되다 → 客观事态（决定, 发现）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      민수는 사기를 당했어요.<br>
      학생이 선생님께 칭찬을 받았어요.<br>
      어제 상사에게 야단을 맞았어요.<br>
      친구 결혼식에 초대를 받았어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">칭찬을 당했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">칭찬을 받았어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사기를 받았어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사기를 당했어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：被动句主语与助词 이/가 · 에게 · 에 의해 ──────────────────────────────────────
  {
    id: 'card-p13-l07',
    partNumber: 13,
    lessonNumber: 7,
    title: '被动句助词 이/가 · 에게 · 에 의해',
    whatItDoes: '受动/施动 助词',
    whatItDoesBody: '被动句的核心不在动词，而在助词。受动者做主语用 이/가；施动者根据身份用 에게（人/动物）/ 에（物/自然力）/ 에 의해（正式书面）。本课系统整理被动句的助词选择。',
    structureNote: '受动者 + 이/가 + 施动者 + 에게/에/에 의해 + 被动动词',
    rulesNote: '人/动物施动 → 에게；物/自然力 → 에；正式书面 → 에 의해',
    structures: [
      {
        ko: '도둑이 경찰에게 잡혔어요.',
        zh: '小偷被警察抓了。',
        tokens: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
      },
      {
        ko: '나뭇잎이 바람에 날렸어요.',
        zh: '树叶被风吹走了。',
        tokens: [
          { text: '나뭇잎이', role: 'subject' },
          { text: '바람에', role: 'plain' },
          { text: '날렸어요', role: 'verb' },
        ],
      },
      {
        ko: '이 정책은 정부에 의해 시행되었어요.',
        zh: '此政策由政府施行。',
        tokens: [
          { text: '이 정책은', role: 'subject' },
          { text: '정부에 의해', role: 'plain' },
          { text: '시행되었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '受动者做主语，助词用 이/가（是主语标记）', examples: '도둑이 잡혔어요. / 문이 열렸어요.' },
      { type: 'rule', text: '施动者是人/动物 → 에게', examples: '경찰에게 잡혔다 / 개에게 물렸다' },
      { type: 'rule', text: '施动者是物/自然力 → 에', examples: '바람에 날렸다 / 눈에 파묻혔다' },
      { type: 'rule', text: '正式书面 → 에 의해', examples: '정부에 의해 시행되었다 / 사장에 의해 결정되었다' },
      { type: 'usage', text: '한테 是 에게 的口语替代形式', examples: '친구한테 소식이 전해졌어요.（消息传到了朋友那儿。）' },
      { type: 'compare', text: '에게 vs 에 의해 → 前者口语中性，后者书面正式', examples: '(口语) 경찰에게 잡혔다 / (书面) 경찰에 의해 잡혔다' },
      { type: 'note', text: '主动句的宾语 를 → 被动句变成主语 이/가', examples: '도둑을 잡았다 → 도둑이 잡혔다' },
      { type: 'note', text: '这里 에게 标的是「施动者(动作发出方)」，跟你先学的 에게=给某人(接受方) 方向正好相反，别搞混谁做动作', examples: '도둑이 경찰에게 잡혔어요 → 경찰是"抓"的一方（施动者）' },
      { type: 'usage', text: '别把中文「被/由」硬翻成 에 의해：它偏正式书面，日常人/动物施动更自然的是 에게/한테', examples: '(生硬) 친구에 의해 소식이 전해졌어요 / (自然) 친구한테 소식이 전해졌어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
        zh: '小偷被警察抓。',
        swapWords: ['경찰', '형사', '보안관', '수사관'],
      },
      {
        wordBlocks: [
          { text: '나뭇잎이', role: 'subject' },
          { text: '바람에', role: 'plain' },
          { text: '날렸어요', role: 'verb' },
        ],
        zh: '树叶被风吹。',
        swapWords: ['바람', '태풍', '눈보라', '비'],
      },
      {
        wordBlocks: [
          { text: '이 정책은', role: 'subject' },
          { text: '정부에 의해', role: 'plain' },
          { text: '시행되었어요', role: 'verb' },
        ],
        zh: '政策由政府施行。',
        swapWords: ['정부', '국회', '위원회', '대통령'],
      },
    ],
    scenarios: [
      { icon: '👮', context: '人施动', ko: '도둑이 경찰에게 잡혔어요.', zh: '小偷被警察抓。' },
      { icon: '🍂', context: '自然施动', ko: '나뭇잎이 바람에 날렸어요.', zh: '树叶被风吹。' },
      { icon: '🏛️', context: '书面正式', ko: '이 정책은 정부에 의해 시행되었어요.', zh: '政策由政府施行。' },
      { icon: '🐕', context: '动物施动', ko: '어린이가 개에게 물렸어요.', zh: '小孩被狗咬。' },
      { icon: '❄️', context: '天气', ko: '길이 눈에 파묻혔어요.', zh: '路被雪掩埋。' },
      { icon: '📋', context: '委员会决定', ko: '결정은 위원회에 의해 내려졌어요.', zh: '决定由委员会作出。' },
    ],
    mistakes: [
      { wrong: '도둑을 경찰에게 잡혔어요', correct: '도둑이 경찰에게 잡혔어요', note: '被动句受动者做主语 → 이/가，不是 을/를' },
      { wrong: '나뭇잎이 바람에게 날렸어요', correct: '나뭇잎이 바람에 날렸어요', note: '自然力/物 用 에，不用 에게（에게 只用于人/动物）' },
      { wrong: '이 정책은 정부에게 시행되었다', correct: '이 정책은 정부에 의해 시행되었다', note: '正式书面/机构施动用 에 의해' },
    ],
    quickTable: {
      title: '被动助词速查',
      headers: ['角色', '助词', '例子'],
      rows: [
        ['受动者（主语）', '이/가', '도둑이 잡혔다'],
        ['人/动物 施动', '에게', '경찰에게 잡혔다'],
        ['人 施动（口语）', '한테', '친구한테 전해졌다'],
        ['物/自然力', '에', '바람에 날렸다'],
        ['正式书面', '에 의해', '정부에 의해 시행되었다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '被动助词练习',
      body: '选择正确的助词',
      questions: [
        {
          prompt: '도둑(   ) 경찰(   ) 잡혔어요.',
          options: ['을 / 에', '이 / 에게', '이 / 에서', '을 / 에게'],
          answer: 1,
          explanation: '受动者도둑做主语 → 이；施动者경찰是人 → 에게。',
        },
        {
          prompt: '나뭇잎이 바람(   ) 날렸어요.',
          options: ['에게', '에', '한테', '에서'],
          answer: 1,
          explanation: '바람 是自然力（非人/动物） → 用 에，不用 에게。',
        },
        {
          prompt: '이 정책은 정부(   ) 시행되었어요.',
          options: ['에게', '한테', '에 의해', '에서'],
          answer: 2,
          explanation: '正式书面/机构施动 → 에 의해。',
        },
        {
          prompt: '一句被动句里，施动者是"人"时最标准的助词是？',
          options: ['을/를', '에서', '에게 / 에 의해', '이/가'],
          answer: 2,
          explanation: '人施动：口语 에게 / 书面 에 의해。을/를 是宾语标记，被动句里被换掉。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l01', 'card-p13-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">被动的秘密其实不在动词，而在<b>助词</b>：受动者 이/가，施动者根据是人还是自然力，用 에게 / 에 / 에 의해。<br>选错助词，整个句子的施动方向就反了。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>에게 vs 에 vs 에 의해</b><br>
    ・에게 → 人/动物 (口语中性)<br>
    <span style="color:#89756e">경찰에게 잡혔다</span><br>
    ・에 → 物/自然力<br>
    <span style="color:#89756e">바람에 날렸다</span><br>
    ・에 의해 → 正式书面<br>
    <span style="color:#89756e">정부에 의해 시행되었다</span>
  </div>
</div>`,
    compareLabel: '에게/에/에 의해',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">被动句助词</div>
  <div style="font-size:14px;color:#89756e">受动者 이/가 · 施动者 에게/에/에 의해</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">助词选用</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      受动者 → 이/가（主语）<br>
      人/动物 → 에게<br>
      物/自然力 → 에<br>
      正式书面 → 에 의해<br>
      口语 → 한테（=에게）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      도둑이 경찰에게 잡혔어요.<br>
      나뭇잎이 바람에 날렸어요.<br>
      이 정책은 정부에 의해 시행되었어요.<br>
      아이가 개에게 물렸어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">도둑을 경찰에게 잡혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">도둑이 경찰에게 잡혔어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">바람에게 날렸다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">바람에 날렸다</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：双重被动辨析 ──────────────────────────────────────
  {
    id: 'card-p13-l08',
    partNumber: 13,
    lessonNumber: 8,
    title: '双重被动辨析',
    whatItDoes: '避免叠加被动',
    whatItDoesBody: '"双重被动"是韩语学习者常犯的错误：把已经含被动语义的词再叠加 -아/어지다。如 되어지다、보여지다、잊혀지다。规范书面语要求单层被动即可；但 잊혀지다 已被认可为固化例外。',
    structureNote: '短形被动 + -어지다 = 双重被动（多数不规范）',
    rulesNote: '되다 + 어지다 = 되어지다 → 避免；보이다 + 어지다 = 보여지다 → 避免；잊히다 + 어지다 = 잊혀지다 → 惯用可用',
    structures: [
      {
        ko: '이 문제는 이미 해결되었어요.',
        zh: '这个问题已经解决了。',
        tokens: [
          { text: '이 문제는', role: 'subject' },
          { text: '이미', role: 'time' },
          { text: '해결되었어요', role: 'verb' },
        ],
      },
      {
        ko: '그의 이름은 오랫동안 잊혀지지 않았어요.',
        zh: '他的名字很久都没被遗忘。',
        tokens: [
          { text: '그의 이름은', role: 'subject' },
          { text: '오랫동안', role: 'time' },
          { text: '잊혀지지 않았어요', role: 'verb' },
        ],
      },
      {
        ko: '멀리서 산이 보여요.',
        zh: '远处看得见山。',
        tokens: [
          { text: '멀리서', role: 'place' },
          { text: '산이', role: 'subject' },
          { text: '보여요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '해결되다 + 어지다 = 해결되어지다 → 双重被动，避免', examples: '正：해결되었다 / 错：해결되어졌다' },
      { type: 'rule', text: '보이다 + 어지다 = 보여지다 → 现代规范不建议', examples: '正：산이 보인다 / 惯用（不严谨）：산이 보여진다' },
      { type: 'rule', text: '잊히다 + 어지다 = 잊혀지다 → 惯用固化，被认可', examples: '잊혀지다 = 被遗忘（正式亦承认）' },
      { type: 'usage', text: '判断双重被动：短形被动词干（-이/히/리/기）+ -아/어지다', examples: '잡히다 + 어지다 = 잡혀지다（避免用）' },
      { type: 'usage', text: '汉字词 + 되다 + 어지다 常见错误', examples: '해결되어지다 / 발견되어지다 → 避免' },
      { type: 'compare', text: '规范书面语原则：一层被动足矣', examples: '한 번의 피동으로 충분 → 이중 피동 회피' },
      { type: 'note', text: '잊혀지다 属固化例外；其他双重被动均视为错误', examples: '잊혀지다 允许；잡혀지다/해결되어지다 不允许' },
      { type: 'note', text: '别因怕双重被动就躲开所有 -어지다：形容词变化的 좋아지다·예뻐지다、普通动词的 만들어지다 都是对的；只有叠在"已含被动"的词(되/이/히/리/기)上才算双重', examples: '正：집이 만들어졌어요(被建成)/ 날씨가 좋아졌어요(变好) / 错：해결되어졌어요' },
      { type: 'note', text: '보여지다·불려지다·쓰여지다 在口语和大量真实文章里很常见，但规则上仍算双重被动；考试和正式写作用单层(보이다·불리다·쓰이다)最稳', examples: '常见但不规范：산이 보여진다 / 更标准：산이 보인다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 문제는', role: 'subject' },
          { text: '이미', role: 'time' },
          { text: '해결되었어요', role: 'verb' },
        ],
        zh: '此问题已解决。',
        swapWords: ['해결되다', '처리되다', '완료되다', '정리되다'],
      },
      {
        wordBlocks: [
          { text: '그의 이름은', role: 'subject' },
          { text: '오랫동안', role: 'time' },
          { text: '잊혀지지 않았어요', role: 'verb' },
        ],
        zh: '他的名字久未被忘。',
        swapWords: ['이름', '얼굴', '목소리', '눈빛'],
      },
      {
        wordBlocks: [
          { text: '멀리서', role: 'place' },
          { text: '산이', role: 'subject' },
          { text: '보여요', role: 'verb' },
        ],
        zh: '远处看得见山。',
        swapWords: ['산', '바다', '건물', '탑'],
      },
    ],
    scenarios: [
      { icon: '✅', context: '规范', ko: '이 문제는 이미 해결되었어요.', zh: '此问题已解决。' },
      { icon: '💭', context: '固化允许', ko: '그 사건은 아직 잊혀지지 않았어요.', zh: '那件事仍未被忘。' },
      { icon: '👀', context: '避免叠加', ko: '멀리서 산이 보여요.', zh: '远处看见山。' },
      { icon: '📢', context: '公告', ko: '새 규정이 발표되었어요.', zh: '发布了新规。' },
      { icon: '🔍', context: '发现', ko: '실수가 발견되었어요.', zh: '发现了失误。' },
      { icon: '🕰️', context: '遗忘', ko: '옛 노래는 쉽게 잊혀지지 않아요.', zh: '老歌不易被遗忘。' },
    ],
    mistakes: [
      { wrong: '이 문제는 해결되어졌어요', correct: '이 문제는 해결되었어요', note: '되다已含被动，再加 -어지다 是双重被动' },
      { wrong: '산이 멀리서 보여져요', correct: '산이 멀리서 보여요', note: '보이다已是被动，不再加 -어지다' },
      { wrong: '도둑이 잡혀졌어요', correct: '도둑이 잡혔어요', note: '잡히다 已是短形被动，不再加 -어지다' },
    ],
    quickTable: {
      title: '双重被动 · 规范 vs 错误',
      headers: ['避免', '规范形式', '备注'],
      rows: [
        ['해결되어지다', '해결되다', '되다 + 어지다 双重'],
        ['잡혀지다', '잡히다', '短形被动 + 어지다'],
        ['보여지다', '보이다', '短形被动 + 어지다'],
        ['들려지다', '들리다', '短形被动 + 어지다'],
        ['잊혀지다', '잊히다 / 잊혀지다', '惯用固化，两者都可'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '双重被动判断',
      body: '判断以下句子是否规范',
      questions: [
        {
          prompt: '"이 문제는 해결되어졌어요." 是否规范？',
          options: ['规范', '不规范（双重被动）', '取决于语境', '仅限口语用'],
          answer: 1,
          explanation: '되다已含被动，再加 -어지다 是双重被动，规范书面语避免。',
        },
        {
          prompt: '"그 사건은 아직 잊혀지지 않았어요." 是否规范？',
          options: ['不规范', '规范（잊혀지다 是固化惯用例外）', '取决于场合', '仅口语用'],
          answer: 1,
          explanation: '잊혀지다 虽是双重被动结构，但已被承认为固化形态，可与 잊히다 并用。',
        },
        {
          prompt: '哪个是"双重被动"的错误？',
          options: [
            '해결되었다',
            '잡혔다',
            '보여진다',
            '들린다',
          ],
          answer: 2,
          explanation: '보여지다 = 보이다（短形被动）+ 어지다 = 双重被动，规范应用 보이다。',
        },
        {
          prompt: '判断双重被动最简单的方法是？',
          options: [
            '看词长',
            '看有没有 -어지다 叠加在已含被动语义的词上',
            '看主语是否是人',
            '看是否是过去时',
          ],
          answer: 1,
          explanation: '双重被动 = 已含被动语义的词（되다/-이/히/리/기）+ -어지다。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l03', 'card-p13-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"해결되어졌다""잡혀졌다" —— 学习者最常犯的错误：<b>双重被动</b>。<br>动词已经是被动了，就别再叠 -어지다。规范书面语原则：一层被动即可。<br>唯一例外：<b>잊혀지다</b> 已被承认为固化惯用形式。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>单层 vs 双重</b><br>
    ・单层被动（规范）<br>
    <span style="color:#89756e">해결되었다 ✓ / 잡혔다 ✓ / 보였다 ✓</span><br>
    ・双重被动（避免）<br>
    <span style="color:#89756e">해결되어졌다 ✗ / 잡혀졌다 ✗ / 보여졌다 ✗</span><br>
    ・固化例外<br>
    <span style="color:#89756e">잊혀지다（可与 잊히다 并用）</span>
  </div>
</div>`,
    compareLabel: '单层 vs 双重',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">双重被动辨析</div>
  <div style="font-size:14px;color:#89756e">一层足矣 · 잊혀지다 例外</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">判断方法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 词干里已有 -이/히/리/기 → 别再加 -어지다<br>
      2. 하다类 되다 → 别再加 -어지다<br>
      3. 잊혀지다 例外可用<br>
      4. 其他双重被动均视为错误
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频规范</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      이 문제는 해결되었어요.<br>
      멀리서 산이 보여요.<br>
      도둑이 잡혔어요.<br>
      그 사건은 잊혀지지 않았어요.（例外）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">해결되어졌어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">해결되었어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">보여져요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">보여요</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P13 综合练习 ──────────────────────────────────────
  {
    id: 'card-p13-l09',
    partNumber: 13,
    lessonNumber: 9,
    title: 'P13 综合练习',
    isPractice: true,
    whatItDoes: '被动语态综合',
    whatItDoesBody: '本课综合 P13 全部 8 个被动语法点：短形被动（-이/히/리/기）、-아/어지다、-게 되다、되다、당하다/받다/맞다、助词选用、双重被动辨析。测试整体被动敏感度。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P13 综合练习',
      body: '综合本章所有被动语法',
      questions: [
        {
          prompt: '멀리서 산이 (보다) 어요.',
          options: ['봐요', '보여요', '보아요', '보이여요'],
          answer: 1,
          explanation: '보다 的被动是 보이다 → 现在时 보여요。',
        },
        {
          prompt: '아기가 엄마 품에 (안다) 았어요.',
          options: ['안았어요', '안겼어요', '안혔어요', '안리었어요'],
          answer: 1,
          explanation: '안다 的短形被动是 안기다 → 안겼어요。',
        },
        {
          prompt: '이 소설은 여러 언어로 (번역하다) 었어요.',
          options: ['번역했어요', '번역되었어요', '번역히었어요', '번역어졌어요'],
          answer: 1,
          explanation: '하다 类被动是 되다 → 번역되었어요。',
        },
        {
          prompt: '갑자기 한국에 (가다) 되었어요.',
          options: ['가는', '가게', '가서', '가고'],
          answer: 1,
          explanation: '固定为 -게 되다 → 가게 되었어요（结果去韩国）。',
        },
        {
          prompt: '민수는 친구에게 배신을 (?).',
          options: ['받았어요', '당했어요', '되었어요', '했어요'],
          answer: 1,
          explanation: '"被背叛"是负面语义 → 당하다 → 당했어요。',
        },
        {
          prompt: '학생이 선생님께 칭찬을 (?).',
          options: ['당했어요', '받았어요', '되었어요', '맞았어요'],
          answer: 1,
          explanation: '"被表扬"是正面语义 → 받다 → 받았어요。',
        },
        {
          prompt: '도둑(   ) 경찰(   ) 잡혔어요.',
          options: ['을 / 에', '이 / 에게', '이 / 에서', '을 / 에게'],
          answer: 1,
          explanation: '受动者做主语 → 이；施动者是人 → 에게。',
        },
        {
          prompt: '나뭇잎이 바람(   ) 날렸어요.',
          options: ['에게', '에', '한테', '에서'],
          answer: 1,
          explanation: '施动者是自然力 → 에，不用 에게。',
        },
        {
          prompt: '"이 문제는 해결되어졌어요." 是否规范？',
          options: ['规范', '不规范（双重被动）', '取决于语境', '仅限口语'],
          answer: 1,
          explanation: '되다已含被动 + -어지다 是双重被动，规范书面语避免。',
        },
        {
          prompt: '날씨가 점점 (춥다) 어요.',
          options: ['춥어요', '추워져요', '춥지어요', '춥히어요'],
          answer: 1,
          explanation: '춥다（ㅂ不规则）→ -아/어지다 = 추워지다 → 추워져요，表"变冷"。',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p13-l01',
      'card-p13-l02',
      'card-p13-l03',
      'card-p13-l04',
      'card-p13-l05',
      'card-p13-l06',
      'card-p13-l07',
      'card-p13-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P13 被动语态总结</div>
  <div style="font-size:14px;color:#89756e">五种被动 · 一套助词 · 一个陷阱</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">五种被动方式</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. -이/히/리/기 → 短形被动（固有动词）<br>
      2. -아/어지다 → 通用被动化<br>
      3. -게 되다 → 事态变化（被迫/自然）<br>
      4. 되다 → 하다类被动<br>
      5. 당하다/받다/맞다 → 情感色彩被动
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">助词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      受动者 → 이/가（主语）<br>
      人/动物 → 에게<br>
      物/自然力 → 에<br>
      正式书面 → 에 의해
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 双重被动 해결되어졌다 → 用 해결되었다<br>
      2. 短形被动接尾一动词对一固定组，不能自造<br>
      3. 하다 类只能用 되다，不用 -이/히-<br>
      4. 당하다 只搭负面词；正面用 받다<br>
      5. 受动者用 이/가，不用 을/를
    </div>
  </div>
</div>`,
  },
];
