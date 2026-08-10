import type { GrammarCard } from '@/types';

export const grammarCardsP22: GrammarCard[] = [
  // ── 第1课：-을/ㄹ까 봐 ─────────────────────────────────────
  {
    id: 'card-p22-l01',
    partNumber: 22,
    lessonNumber: 1,
    title: '-을/ㄹ까 봐',
    whatItDoes: '担心/怕会……',
    whatItDoesBody: '表达对某种（不希望发生的）情况的担心。\n后半句通常是为避免这个担心而采取的行动。\n口语和写作里都极高频，是韩语最重要的"担心表达"。',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 까 봐。\n可看作 -을까?（是否会）+ 봐（担心） 的融合，直译"看会不会……"。\n后半句常有 걱정하다、안 하다、챙기다、준비하다 等避免担心的动作。',
    rulesNote: '常见搭配套路：\n1. -을까 봐 걱정이에요（担心……）\n2. -을까 봐 [动作]（怕……所以做了……）\n3. -을까 봐서（连接形，加서 强调原因）\n过去时用 -았/었을까 봐（怕当时……了）。',
    structures: [
      {
        ko: '비가 올까 봐 우산을 챙겼어요',
        zh: '怕下雨，带了伞。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '올까 봐', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
      },
      {
        ko: '늦을까 봐 택시를 탔어요',
        zh: '怕迟到，打了出租车。',
        tokens: [
          { text: '늦을까 봐', role: 'verb' },
          { text: '택시를', role: 'object' },
          { text: '탔어요', role: 'verb' },
        ],
      },
      {
        ko: '시험에 떨어질까 봐 걱정이에요',
        zh: '担心考试不及格。',
        tokens: [
          { text: '시험에', role: 'place' },
          { text: '떨어질까 봐', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 아셨을까 봐 조마조마했어요',
        zh: '怕妈妈已经知道了，忐忑不安。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아셨을까 봐', role: 'verb' },
          { text: '조마조마했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ까 봐', examples: '가다→갈까 봐 / 오다→올까 봐 / 하다→할까 봐' },
      { type: 'rule', text: '有收音词干 + 을까 봐', examples: '먹다→먹을까 봐 / 늦다→늦을까 봐 / 앉다→앉을까 봐' },
      { type: 'rule', text: '过去担心用 -았/었을까 봐', examples: '갔을까 봐 / 잊었을까 봐 / 아셨을까 봐' },
      { type: 'usage', text: '后半句常接避免担心的动作或 걱정이에요', examples: '비가 올까 봐 우산을 챙겼어요 / 떨어질까 봐 걱정이에요' },
      { type: 'compare', text: '和 -을 것 같아서 差别：-을까 봐 强调担心，-을 것 같아서 强调推测', examples: '비가 올까 봐 우산을 챙겼어요（担心）/ 비가 올 것 같아서 우산을 챙겼어요（推测）' },
      { type: 'note', text: '常和 걱정하다、두렵다、조마조마하다 等心情词搭配', examples: '떨어질까 봐 걱정돼요 / 늦을까 봐 두려워요' },
      { type: 'note', text: '后半句只能是"已经采取的行动"或 걱정이에요 这类陈述，不能接命令或提议。想说"怕迟到快走吧"得换 -(으)면 안 되니까', examples: '✗늦을까 봐 서두르세요 → ○늦으면 안 되니까 서두르세요' },
      { type: 'note', text: '中文"怕不/怕没……"的否定要放进 -을까 봐 从句里（못/안 + 动词 + 을까 봐），别挪到后半句', examples: '怕来不了 → 못 올까 봐 / 怕考不好 → 시험 못 볼까 봐' },
      { type: 'example', text: '비가 올까 봐 / 늦을까 봐 / 시험에 떨어질까 봐' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '올까 봐', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
        zh: '怕下雨，带了伞。',
        swapWords: ['올까 봐', '쏟아질까 봐', '내릴까 봐'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '늦을까 봐', role: 'verb' },
          { text: '택시를', role: 'object' },
          { text: '탔어요', role: 'verb' },
        ],
        zh: '怕迟到，打了出租车。',
        swapWords: ['택시를', '지하철을', '버스를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '시험에', role: 'place' },
          { text: '떨어질까 봐', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
        zh: '担心考试不及格。',
        swapWords: ['떨어질까 봐', '못 볼까 봐', '실수할까 봐'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: '깰까 봐', role: 'verb' },
          { text: '조용히', role: 'plain' },
          { text: '들어왔어요', role: 'verb' },
        ],
        zh: '怕孩子醒，悄悄进来了。',
        swapWords: ['깰까 봐', '울까 봐', '놀랄까 봐'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☔', context: '出门备伞', ko: '비가 올까 봐 우산 챙겼어요.', zh: '怕下雨带了伞。' },
      { icon: '⏰', context: '打车赶时间', ko: '늦을까 봐 택시 탔어요.', zh: '怕迟到打了车。' },
      { icon: '📝', context: '考试担心', ko: '시험에 떨어질까 봐 잠을 못 잤어요.', zh: '担心考试不及格，没睡好。' },
      { icon: '👶', context: '怕吵孩子', ko: '아기가 깰까 봐 조심히 걸었어요.', zh: '怕吵醒孩子，走路很小心。' },
      { icon: '💔', context: '怕对方生气', ko: '친구가 화낼까 봐 미리 사과했어요.', zh: '怕朋友生气，提前道歉了。' },
      { icon: '🍜', context: '怕辣', ko: '너무 매울까 봐 물을 먼저 시켰어요.', zh: '怕太辣，先点了水。' },
    ],
    mistakes: [
      { wrong: '가을까 봐 걱정이에요', correct: '갈까 봐 걱정이에요', note: '가다 无收音 → ㄹ까 봐，不能加 을。갈까 봐 才是正确形态。' },
      { wrong: '먹ㄹ까 봐 걱정이에요', correct: '먹을까 봐 걱정이에요', note: '먹다 有收音 ㄱ → 을까 봐。먹을까 봐。' },
      { wrong: '내일 비가 왔을까 봐 우산을 챙겼어요', correct: '내일 비가 올까 봐 우산을 챙길게요', note: '"내일"是未来 → 用现在形 올까 봐。过去 왔을까 봐 只用于对已发生事情的担心。' },
      { wrong: '비가 올까 봤어요', correct: '비가 올까 봐 우산을 챙겼어요', note: '-을까 봐 是连接形，后面必须接主句动词。올까 봤어요 是不存在的形式。' },
    ],
    quickTable: {
      title: '-을/ㄹ까 봐 变形速查',
      body: '按词干收音和时态选正确形态。',
      headers: ['原形', '词干', '现在担心', '过去担心'],
      rows: [
        ['가다', '가（무받침）', { ko: '갈까 봐', zh: '怕去/会去' }, { ko: '갔을까 봐', zh: '怕已经去了' }],
        ['먹다', '먹（有ㄱ）', { ko: '먹을까 봐', zh: '怕吃/会吃' }, { ko: '먹었을까 봐', zh: '怕已经吃了' }],
        ['하다', '하（무받침）', { ko: '할까 봐', zh: '怕做' }, { ko: '했을까 봐', zh: '怕已经做了' }],
        ['늦다', '늦（有ㅈ）', { ko: '늦을까 봐', zh: '怕迟到' }, { ko: '늦었을까 봐', zh: '怕已经迟了' }],
        ['알다', '알（ㄹ词干）', { ko: '알까 봐', zh: '怕（他）知道' }, { ko: '알았을까 봐', zh: '怕（他）已经知道了' }],
        ['잊다', '잊（有ㅈ）', { ko: '잊을까 봐', zh: '怕忘' }, { ko: '잊었을까 봐', zh: '怕忘了' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ까 봐 变形练习',
      body: '根据词干和语境选出正确形态。',
      questions: [
        {
          prompt: '"怕下雨，带了伞" → 비가 ___ 우산을 챙겼어요.',
          options: ['오을까 봐', '올까 봐', '왔을까 봐', '오까 봐'],
          answer: 1,
          explanation: '오다 无收音 → ㄹ까 봐。올까 봐（未来担心）。왔을까 봐 是过去担心，不符合语境。',
        },
        {
          prompt: '"怕迟到，打车了" → ___ 택시를 탔어요.',
          options: ['늦ㄹ까 봐', '늦을까 봐', '늦면', '늦어서'],
          answer: 1,
          explanation: '늦다 有收音 ㅈ → 을까 봐。늦을까 봐。',
        },
        {
          prompt: '"怕妈妈已经知道了" → 엄마가 ___ 조마조마했어요.',
          options: ['아셨을까 봐', '아실까 봐', '아신다고', '아시니까'],
          answer: 0,
          explanation: '"已经知道了"是过去 → 过去担心用 -았/었을까 봐。아시다 → 아셨을까 봐。',
        },
        {
          prompt: '关于 -을까 봐 和 -을 것 같아서 的区别，哪句最准确？',
          options: [
            '两者意思完全相同',
            '-을까 봐 强调"担心不希望发生"；-을 것 같아서 强调"推测可能发生"',
            '前者用于过去，后者用于未来',
            '前者只用于口语',
          ],
          answer: 1,
          explanation: '-을까 봐 带担心/害怕的情感色彩；-을 것 같아서 只是客观推测。虽然后半句都可接同样动作，但情感语气不同。',
        },
      ],
    },
    linkedGrammarIds: ['card-p9-l01'],
    step0Html: `<div class="card-title">-을/ㄹ까 봐</div>
<div class="card-body">"怕会……" —— 表达担心并采取行动。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">担心 vs 推测</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을까 봐（带担心情感）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올까 봐 우산을 챙겼어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">怕下雨，带了伞。（不希望下雨）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-을 것 같아서（客观推测）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올 것 같아서 우산을 챙겼어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像要下雨，带了伞。（客观判断）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-을까 봐 后面常接 걱정이에요、챙기다、준비하다 等避免担心的动作。</div>`,
    compareHtml: `<div class="card-title">-을까 봐 vs -을까 하다</div>
<div class="card-body">前一课学过 -을까 하다（打算），这次学 -을까 봐（担心），两个语法看起来像但功能完全不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ까 봐 → 担心怕</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">连接形，后接主句</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">늦을까 봐 뛰었어요.</span><span style="font-size:16px;color:#5a4640">怕迟到跑了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ까 하다 → 打算</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">终结形，说自己的意图</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">일찍 갈까 해요.</span><span style="font-size:16px;color:#5a4640">打算早点走。</span></div>
  </div>
</div>
<div class="reminder-box">看结尾：봐（担心）vs 하다（打算）。中间的 -을까 一样，但后面接的动词决定了语法功能。</div>`,
    compareLabel: '-을까 봐 vs -을까 하다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 1 课</div>
    <div class="ov-hero-title">-을/ㄹ까 봐</div>
    <div class="ov-hero-sub">"怕会……" · 担心+采取行动</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ까 봐</b>：갈까 봐 · 올까 봐<br>
        有收音 → <b style="color:#2db89b">을까 봐</b>：먹을까 봐 · 늦을까 봐<br>
        过去担心 → <b style="color:#6b7ff0">-았/었을까 봐</b>：갔을까 봐 · 잊었을까 봐
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        비가 올까 봐 우산을 챙겼어요.（怕下雨带了伞）<br>
        늦을까 봐 택시를 탔어요.（怕迟到打了车）<br>
        떨어질까 봐 걱정이에요.（担心不及格）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을까 봐</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈까 봐（无收音 → ㄹ까 봐）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 올까 봤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">-을까 봐 是连接形，后必接主句动词</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第2课：-을/ㄹ지도 모르다 ──────────────────────────────
  {
    id: 'card-p22-l02',
    partNumber: 22,
    lessonNumber: 2,
    title: '-을/ㄹ지도 모르다',
    whatItDoes: '说不定/可能……',
    whatItDoesBody: '表达低概率的推测，"说不定会……"、"没准儿……"。\n比 -을 것 같다（好像）更弱、更不确定，只是提出一种可能性。\n"我不确定，但也许会"的语气，中级韩语里的高频表达。',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 지도 모르다。\n直译"连（是否）……也不知道"，引申为"说不定"。\n结尾常用 몰라요 / 모르겠어요，比较委婉。',
    rulesNote: '推测的确定性梯度（从低到高）：\n1. -을지도 모르다（说不定）— 最不确定\n2. -을 수도 있다（也可能）— 客观可能\n3. -을 것 같다（好像）— 有点感觉\n4. -을 것이다（应该会）— 较肯定\n5. -을 게 틀림없다（肯定）— 最确定',
    structures: [
      {
        ko: '내일 비가 올지도 몰라요',
        zh: '明天说不定会下雨。',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 벌써 갔을지도 몰라요',
        zh: '那个人说不定已经走了。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '문제가 생각보다 어려울지도 몰라요',
        zh: '题目说不定比想的难。',
        tokens: [
          { text: '문제가', role: 'subject' },
          { text: '생각보다', role: 'plain' },
          { text: '어려울지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 시간이 안 될지도 모르겠어요',
        zh: '周末说不定没时间。',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '시간이', role: 'subject' },
          { text: '안 될지도 모르겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ지도 모르다', examples: '가다→갈지도 모르다 / 오다→올지도 모르다' },
      { type: 'rule', text: '有收音词干 + 을지도 모르다', examples: '먹다→먹을지도 모르다 / 늦다→늦을지도 모르다' },
      { type: 'rule', text: '过去推测 → -았/었을지도 모르다', examples: '갔을지도 몰라요 / 몰랐을지도 모르다' },
      { type: 'rule', text: '名词 + 일지도 모르다', examples: '학생일지도 몰라요 / 사실일지도 몰라요' },
      { type: 'usage', text: '推测确定性最低，接近"没准儿"、"或许"', examples: '올지도 몰라요（说不定会来）< 올 것 같아요（好像会来）< 올 거예요（会来吧）' },
      { type: 'compare', text: '和 -을 수도 있다 差别：前者主观猜测，后者客观可能性', examples: '올지도 몰라요（我猜）/ 올 수도 있어요（有这种可能）' },
      { type: 'note', text: '结尾的 모르다 是 르 不规则：说成 몰라요 / 몰랐어요 / 모르겠어요，绝不是 모르어요 / 모르었어요', examples: '갈지도 몰라요 / 갔을지도 몰랐어요' },
      { type: 'note', text: '中文"说不定"能提到句首单独用，韩语 -을지도 모르다 必须整句作谓语放句末。想在句首点出不确定，加副词 아마 / 어쩌면', examples: '说不定他会来 → 어쩌면 그 사람이 올지도 몰라요' },
      { type: 'example', text: '비가 올지도 몰라요 / 어려울지도 모르겠어요 / 학생일지도 몰라요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올지도 몰라요', role: 'verb' },
        ],
        zh: '明天说不定会下雨。',
        swapWords: ['올지도 몰라요', '내릴지도 몰라요', '쏟아질지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을지도 몰라요', role: 'verb' },
        ],
        zh: '那个人说不定已经走了。',
        swapWords: ['갔을지도 몰라요', '왔을지도 몰라요', '떠났을지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울지도 몰라요', role: 'verb' },
        ],
        zh: '这道题说不定难。',
        swapWords: ['어려울지도 몰라요', '쉬울지도 몰라요', '이상할지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그건', role: 'subject' },
          { text: '사실일지도', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '那可能是真的。',
        swapWords: ['사실일지도', '거짓말일지도', '오해일지도'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '☁️', context: '天气不定', ko: '오늘 비가 올지도 몰라요. 우산 챙기세요.', zh: '今天说不定会下雨，带把伞。' },
      { icon: '🚶', context: '朋友已走', ko: '지금 가면 벌써 집에 갔을지도 몰라요.', zh: '现在去说不定已经回家了。' },
      { icon: '📝', context: '考题预判', ko: '이번 시험은 어려울지도 몰라요.', zh: '这次考试说不定会难。' },
      { icon: '📅', context: '日程不定', ko: '주말에 약속이 있을지도 몰라요.', zh: '周末说不定有约。' },
      { icon: '💭', context: '身份猜测', ko: '저 사람 유명인일지도 몰라요.', zh: '那个人说不定是名人。' },
      { icon: '🚗', context: '交通堵塞', ko: '지금 출발해도 길이 막힐지도 몰라요.', zh: '现在出发说不定也会堵。' },
    ],
    mistakes: [
      { wrong: '갈지도 알아요', correct: '갈지도 몰라요', note: '固定搭配是 -을지도 모르다（不知道/说不定），不能用 알다（知道）。语义与结构固定。' },
      { wrong: '먹ㄹ지도 몰라요', correct: '먹을지도 몰라요', note: '먹다 有收音 → 을지도 몰라요。먹을지도 몰라요。' },
      { wrong: '학생지도 몰라요', correct: '학생일지도 몰라요', note: '名词 + 이다 变形 + 을지도 모르다 → 名词 + 일지도 모르다。' },
      { wrong: '어제 갈지도 몰라요（想说昨天可能去了）', correct: '어제 갔을지도 몰라요', note: '对已发生事情的推测用过去 -았을지도 모르다。' },
    ],
    quickTable: {
      title: '推测确定性梯度',
      body: '同样是"可能"，语气有从弱到强的层级。',
      headers: ['结构', '中文', '确定性', '例句'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '说不定/或许' }, { ko: '低（不确定）', zh: '猜测' }, { ko: '★', zh: '20%' }, { ko: '올지도 몰라요', zh: '说不定会来' }],
        [{ ko: '-을 수도 있다', zh: '也可能' }, { ko: '中低（客观可能）', zh: '可能性' }, { ko: '★★', zh: '40%' }, { ko: '올 수도 있어요', zh: '也可能会来' }],
        [{ ko: '-을 것 같다', zh: '好像/感觉' }, { ko: '中（主观感觉）', zh: '感觉' }, { ko: '★★★', zh: '60%' }, { ko: '올 것 같아요', zh: '好像会来' }],
        [{ ko: '-을 것이다', zh: '应该会/将' }, { ko: '中高（较肯定）', zh: '预期' }, { ko: '★★★★', zh: '80%' }, { ko: '올 거예요', zh: '会来的' }],
        [{ ko: '-을 게 틀림없다', zh: '肯定会' }, { ko: '高（几乎确定）', zh: '断定' }, { ko: '★★★★★', zh: '95%' }, { ko: '올 게 틀림없어요', zh: '肯定会来' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ지도 모르다 变形练习',
      body: '根据词性和时态选出正确形态。',
      questions: [
        {
          prompt: '"这题说不定难" → 이 문제가 ___.',
          options: ['어려을지도 몰라요', '어려울지도 몰라요', '어렵ㄹ지도 몰라요', '어려지도 몰라요'],
          answer: 1,
          explanation: '어렵다 是 ㅂ 不规则 → 어려우- + ㄹ지도 몰라요 = 어려울지도 몰라요。',
        },
        {
          prompt: '"那个人可能是学生" → 저 사람이 ___.',
          options: ['학생지도 몰라요', '학생일지도 몰라요', '학생을지도 몰라요', '학생인지도 몰라요'],
          answer: 1,
          explanation: '名词 + 이다 + 을지도 모르다 = 名词 + 일지도 모르다。학생일지도 몰라요。',
        },
        {
          prompt: '"那个人可能已经走了" → 그 사람이 벌써 ___.',
          options: ['갈지도 몰라요', '갔을지도 몰라요', '가지도 몰라요', '갔지도 몰라요'],
          answer: 1,
          explanation: '过去推测 → -았/었을지도 모르다。가다 → 갔을지도 몰라요。',
        },
        {
          prompt: '关于推测确定性梯度，哪句最准确？',
          options: [
            '-을지도 모르다 比 -을 것 같다 更肯定',
            '-을지도 모르다 是最不确定的推测，"说不定"',
            '-을지도 모르다 表示已经发生',
            '-을지도 모르다 只用于书面语',
          ],
          answer: 1,
          explanation: '-을지도 모르다 是韩语推测确定性最低的表达，接近中文"说不定/或许"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p9-l03', 'card-p22-l08'],
    step0Html: `<div class="card-title">-을/ㄹ지도 모르다</div>
<div class="card-body">"说不定/或许……" —— 韩语最不确定的推测表达。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">推测确定性梯度</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">★ 最不确定 · 这一课</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올지도 몰라요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">说不定会下雨。（20%）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">★★★ 较有感觉 · 已学</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像会下雨。（60%）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-을지도 몰라요 是韩语最委婉的推测，"我不确定，但也许会"。</div>`,
    compareHtml: `<div class="card-title">-을지도 모르다 vs -을 수도 있다</div>
<div class="card-body">两者都是"可能"，但语感差别不小。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ지도 모르다 → 主观猜测</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">带"我猜"的语感</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 올지도 몰라요.</span><span style="font-size:16px;color:#5a4640">说不定会下雨。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 수도 있다 → 客观可能</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">陈述客观存在的可能性</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 올 수도 있어요.</span><span style="font-size:16px;color:#5a4640">也有可能会下雨。</span></div>
  </div>
</div>
<div class="reminder-box">主观猜测优先 -을지도 모르다；客观说可能性用 -을 수도 있다。</div>`,
    compareLabel: '-을지도 모르다 vs -을 수도 있다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 2 课</div>
    <div class="ov-hero-title">-을/ㄹ지도 모르다</div>
    <div class="ov-hero-sub">"说不定……" · 最不确定的推测</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ지도 모르다</b>：갈지도 몰라요<br>
        有收音 → <b style="color:#2db89b">을지도 모르다</b>：먹을지도 몰라요<br>
        过去 → <b style="color:#6b7ff0">-았/었을지도 모르다</b>：갔을지도 몰라요<br>
        名词 → <b style="color:#c89020">-일지도 모르다</b>：학생일지도 몰라요
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        비가 올지도 몰라요.（说不定会下雨）<br>
        어려울지도 몰라요.（说不定难）<br>
        학생일지도 몰라요.（说不定是学生）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갈지도 알아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈지도 몰라요（固定搭配 모르다）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생지도 몰라요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일지도 몰라요（名词+이+ㄹ지도）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第3课：-을/ㄹ 리가 없다 ──────────────────────────────
  {
    id: 'card-p22-l03',
    partNumber: 22,
    lessonNumber: 3,
    title: '-을/ㄹ 리가 없다',
    whatItDoes: '不可能……（强烈否定推测）',
    whatItDoesBody: '强烈否定某种可能性："那怎么可能"、"不可能"。\n和 -을 리가 있어요? （疑问反问）是一对，都表达"完全不信"的语气。\n对话里常回应对方的假设，表达"不至于/绝不可能"。',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 리가 없다。\n리 = 道理/理由（依存名词），"没有这个道理" → "不可能"。\n过去推测用 -았/었을 리가 없다。',
    rulesNote: '和 -지 않을 것이다（不会）差别：\n· -을 리가 없다：语气强烈，几乎断言"绝不可能"\n· 지 않을 것이다：普通否定推测，"应该不会"\n\n口语常用 -을 리가 있어요?（反问：怎么可能？），意思等同 -을 리가 없다。',
    structures: [
      {
        ko: '그 사람이 거짓말을 할 리가 없어요',
        zh: '那个人不可能说谎。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '거짓말을', role: 'object' },
          { text: '할 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨가 벌써 갔을 리가 없어요',
        zh: '敏秀不可能已经走了。',
        tokens: [
          { text: '민수 씨가', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '이 문제가 어려울 리가 없어요',
        zh: '这道题不可能难。',
        tokens: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '그게 사실일 리가 있어요?',
        zh: '那怎么可能是真的？',
        tokens: [
          { text: '그게', role: 'subject' },
          { text: '사실일 리가 있어요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ 리가 없다', examples: '가다→갈 리가 없다 / 하다→할 리가 없다' },
      { type: 'rule', text: '有收音词干 + 을 리가 없다', examples: '먹다→먹을 리가 없다 / 잊다→잊을 리가 없다' },
      { type: 'rule', text: '过去推测 → -았/었을 리가 없다', examples: '갔을 리가 없다 / 잊었을 리가 없다' },
      { type: 'rule', text: '名词 + 일 리가 없다', examples: '학생일 리가 없다 / 사실일 리가 없다' },
      { type: 'usage', text: '强烈否定推测，语气比 안 -을 것이다 更强', examples: '거짓말을 할 리가 없어요（绝不可能说谎）' },
      { type: 'usage', text: '反问形 -을 리가 있어요? 意思等同 -을 리가 없어요', examples: '그게 사실일 리가 있어요?（那怎么可能是真的？）' },
      { type: 'compare', text: '和 -을지도 모르다 完全相反：一个断言不可能，一个说说不定', examples: '갈 리가 없어요（不可能去）↔ 갈지도 몰라요（说不定去）' },
      { type: 'note', text: '中文"不可能"有两义，别混：-을 리가 없다 是"按道理断定不会（推测）"；能力上"做不到"要用 못 하다 / -을 수 없다', examples: '그가 거짓말할 리가 없어요（断定不会）↔ 저는 그거 못 해요（我做不到）' },
      { type: 'note', text: '独立成句回应对方说法是高频用法：그럴 리가 없어요 / 그럴 리가!，相当于"不至于吧/怎么可能"', examples: '— 민수가 시험에 떨어졌대. — 그럴 리가 없어요!' },
      { type: 'example', text: '그럴 리가 없어요 / 몰랐을 리가 없어요 / 사실일 리가 있어요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '거짓말을', role: 'object' },
          { text: '할 리가 없어요', role: 'verb' },
        ],
        zh: '那个人不可能说谎。',
        swapWords: ['거짓말을', '실수를', '그런 말을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '민수 씨가', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을 리가 없어요', role: 'verb' },
        ],
        zh: '敏秀不可能已经走了。',
        swapWords: ['갔을 리가 없어요', '왔을 리가 없어요', '떠났을 리가 없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울 리가 없어요', role: 'verb' },
        ],
        zh: '这道题不可能难。',
        swapWords: ['어려울 리가 없어요', '쉬울 리가 없어요', '이상할 리가 없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그게', role: 'subject' },
          { text: '사실일 리가 있어요?', role: 'verb' },
        ],
        zh: '那怎么可能是真的？',
        swapWords: ['사실일 리가 있어요?', '진짜일 리가 있어요?', '정답일 리가 있어요?'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🤔', context: '不信谎言', ko: '그 사람이 거짓말할 리가 없어요.', zh: '那个人不可能说谎。' },
      { icon: '⏰', context: '不信迟到', ko: '민수 씨가 지각할 리가 없어요. 항상 일찍 오는 사람이에요.', zh: '敏秀不可能迟到，他总是早到。' },
      { icon: '😤', context: '强烈质疑', ko: '그게 사실일 리가 있어요? 말도 안 돼요.', zh: '那怎么可能是真的？岂有此理。' },
      { icon: '📞', context: '不接电话', ko: '자기가 안 받았을 리가 없는데 이상하네요.', zh: '不可能是他没接，奇怪。' },
      { icon: '💰', context: '价格质疑', ko: '이게 만 원일 리가 없어요. 너무 싸잖아요.', zh: '这不可能是一万韩元，也太便宜了吧。' },
      { icon: '📚', context: '不信不知', ko: '민수 씨가 그걸 모를 리가 없어요.', zh: '敏秀不可能不知道那个。' },
    ],
    mistakes: [
      { wrong: '갈 리 없어요', correct: '갈 리가 없어요', note: '리 后面必须加主格助词 가：갈 리가 없어요。省略 가 不自然。' },
      { wrong: '먹ㄹ 리가 없어요', correct: '먹을 리가 없어요', note: '먹다 有收音 → 을 리가 없다。먹을 리가 없어요。' },
      { wrong: '학생 리가 없어요', correct: '학생일 리가 없어요', note: '名词 + 이다 + 을 리가 없다 → 名词 + 일 리가 없다。' },
      { wrong: '어제 왔을 리가 있어요（想说确实来了）', correct: '어제 왔을 거예요 / 어제 왔어요', note: '-을 리가 있다 是反问句 "怎么可能"，意思其实是否定。想肯定用 -을 것이다 或直接过去时。' },
    ],
    quickTable: {
      title: '推测两极：说不定 vs 不可能',
      body: '同样是推测语法，语气可以完全相反。',
      headers: ['结构', '含义', '例句', '中文'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '说不定' }, { ko: '低确定性猜测', zh: '20%' }, { ko: '갈지도 몰라요', zh: '说不定会去' }, '说不定他会去（可能）'],
        [{ ko: '-을 것 같다', zh: '好像/感觉' }, { ko: '中等推测', zh: '60%' }, { ko: '갈 것 같아요', zh: '好像会去' }, '感觉他会去'],
        [{ ko: '-을 것이다', zh: '会/应该' }, { ko: '较肯定预期', zh: '80%' }, { ko: '갈 거예요', zh: '会去的' }, '他会去的'],
        [{ ko: '-을 리가 없다', zh: '不可能' }, { ko: '强烈否定', zh: '0%' }, { ko: '갈 리가 없어요', zh: '不可能去' }, '他不可能去（绝不）'],
        [{ ko: '-을 리가 있다?', zh: '怎么可能' }, { ko: '反问=否定', zh: '0%' }, { ko: '갈 리가 있어요?', zh: '怎么可能去？' }, '他怎么可能去（不可能）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 리가 없다 用法练习',
      body: '根据语境选出正确表达。',
      questions: [
        {
          prompt: '"那个人不可能说谎" → 그 사람이 거짓말을 ___.',
          options: ['할 리가 있어요', '할지도 몰라요', '할 리가 없어요', '할 것 같아요'],
          answer: 2,
          explanation: '"不可能" → -을 리가 없어요。하다 无收音 → 할 리가 없어요。',
        },
        {
          prompt: '"敏秀不可能已经走了" → 민수 씨가 벌써 ___.',
          options: ['갈 리가 없어요', '갔을 리가 없어요', '갈지도 몰라요', '갔을 것 같아요'],
          answer: 1,
          explanation: '"已经走了"是过去 → 过去推测的否定 -았/었을 리가 없다。갔을 리가 없어요。',
        },
        {
          prompt: '"那怎么可能是真的？" → 그게 ___?',
          options: ['사실일 리가 없어요', '사실인 것 같아요', '사실일 리가 있어요', '사실일지도 몰라요'],
          answer: 2,
          explanation: '反问形 -을 리가 있어요? 意思等同 -을 리가 없어요，表达强烈质疑。名词 + 일 리가 있어요?。',
        },
        {
          prompt: '关于 -을 리가 없다 和 -을지도 모르다 的区别，哪句最准确？',
          options: [
            '两者都表示低概率',
            '前者是断言不可能，后者是说不定可能',
            '前者用书面，后者用口语',
            '前者用于过去，后者用于未来',
          ],
          answer: 1,
          explanation: '两个语法方向完全相反。-을 리가 없다 = 强烈否定"不可能"；-을지도 모르다 = 猜测"说不定"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l02', 'card-p22-l07'],
    step0Html: `<div class="card-title">-을/ㄹ 리가 없다</div>
<div class="card-body">"不可能……" —— 强烈否定某种推测。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">推测两极对比</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-을지도 모르다（说不定 · 上一课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">갈지도 몰라요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">说不定会去（20%）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을 리가 없다（不可能 · 这一课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">갈 리가 없어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">绝不可能去（0%）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-을 리가 있어요? 反问式，意思等同 -을 리가 없어요，表达"怎么可能"。</div>`,
    compareHtml: `<div class="card-title">-을 리가 없다 vs 안 -을 것이다</div>
<div class="card-body">两个都表示否定推测，但语气重量差别大。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 리가 없다 → 绝对否定</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"绝无可能"，语气强烈</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">거짓말할 리가 없어요.</span><span style="font-size:16px;color:#5a4640">不可能说谎。（绝对不）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">안 -을 것이다 → 一般否定</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"应该不会"，语气普通</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">거짓말 안 할 거예요.</span><span style="font-size:16px;color:#5a4640">应该不会说谎。（推测）</span></div>
  </div>
</div>
<div class="reminder-box">断言"绝对不"用 -을 리가 없다；普通推测"应该不会"用 안 -을 것이다。</div>`,
    compareLabel: '-을 리가 없다 vs 안 -을 것이다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 3 课</div>
    <div class="ov-hero-title">-을/ㄹ 리가 없다</div>
    <div class="ov-hero-sub">"不可能……" · 强烈否定推测</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ 리가 없다</b>：갈 리가 없다<br>
        有收音 → <b style="color:#2db89b">을 리가 없다</b>：먹을 리가 없다<br>
        过去 → <b style="color:#6b7ff0">-았/었을 리가 없다</b>：갔을 리가 없다<br>
        名词 → <b style="color:#c89020">일 리가 없다</b>：학생일 리가 없다<br>
        反问式 → -을 리가 있어요?（怎么可能）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        거짓말할 리가 없어요.（不可能说谎）<br>
        벌써 갔을 리가 없어요.（不可能已经走了）<br>
        사실일 리가 있어요?（怎么可能是真的？）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갈 리 없어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 리가 없어요（必须加 가）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 리가 없어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일 리가 없어요（名词+일）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第4课：-기 마련이다 ─────────────────────────────────
  {
    id: 'card-p22-l04',
    partNumber: 22,
    lessonNumber: 4,
    title: '-기 마련이다 / -게 마련이다',
    whatItDoes: '本来就会……（自然规律）',
    whatItDoesBody: '表达"某种情况自然而然会发生"的规律性判断。\n带有"这是天经地义"的语感，常用于陈述普遍真理、生活规律。\n-기 마련이다 和 -게 마련이다 意思完全相同，都可以用。',
    structureNote: '结构：动词/形容词词干 + 기 마련이다（或 -게 마련이다）。\n마련이다 直译"是准备好的" → 引申为"自然就是这样"。\n不看收音，直接接词干。',
    rulesNote: '两个变体：\n1. -기 마련이다：TOPIK 高频，日常也用\n2. -게 마련이다：口语稍多，语感略更强\n意思完全一样，选哪个都对。\n\n配套用法：常和 누구나（谁都）、다들（大家）等词一起，加强普遍性。',
    structures: [
      {
        ko: '사람은 누구나 실수하기 마련이에요',
        zh: '人嘛，谁都会犯错。',
        tokens: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '나이가 들면 몸이 약해지기 마련이에요',
        zh: '上了年纪身体自然会变弱。',
        tokens: [
          { text: '나이가', role: 'subject' },
          { text: '들면', role: 'verb' },
          { text: '몸이', role: 'subject' },
          { text: '약해지기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '자주 만나면 정이 들게 마련이에요',
        zh: '经常见面自然就会有感情。',
        tokens: [
          { text: '자주 만나면', role: 'verb' },
          { text: '정이', role: 'subject' },
          { text: '들게 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '노력하면 좋은 결과가 나오기 마련입니다',
        zh: '努力了自然会有好结果。',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '좋은 결과가', role: 'subject' },
          { text: '나오기 마련입니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 기 마련이다', examples: '실수하다→실수하기 마련이다 / 늙다→늙기 마련이다 / 힘들다→힘들기 마련이다' },
      { type: 'rule', text: '也可用 -게 마련이다，意思相同', examples: '실수하게 마련이다 / 늙게 마련이다 / 힘들게 마련이다' },
      { type: 'rule', text: '不看收音，直接接词干', examples: '所有动词、形容词都是同一接法' },
      { type: 'usage', text: '陈述自然规律或普遍真理，不用于个别偶然事件', examples: '사람은 실수하기 마련이에요（普遍）/ 오늘 지각하기 마련이에요 ✗（个别）' },
      { type: 'usage', text: '常和 누구나、다들、항상 等强调普遍性的词搭配', examples: '누구나 실수하기 마련이에요 / 다들 힘들기 마련이에요' },
      { type: 'compare', text: '和 -는 법이다 差别：-기 마련이다 偏"自然规律"，-는 법이다 偏"社会道理"', examples: '늙기 마련이에요（生理规律）/ 잘못하면 벌 받는 법이에요（道理规律）' },
      { type: 'compare', text: '别和 -게 되다 混：-기 마련이다 是"本来必然如此"的通则；-게 되다 是"（因某原因）变成这样"的结果变化', examples: '노력하면 성공하게 마련이에요（必然规律）/ 열심히 하다 보니 성공하게 됐어요（结果变化）' },
      { type: 'note', text: '主语必须是泛指（사람은 / 누구나），不能拿它讲某一个人的习惯。想说"我总迟到"用普通现在时，别套 마련이다', examples: '누구나 실수하기 마련이에요 ○ / 저는 지각하기 마련이에요 ✗ → 저는 자주 지각해요' },
      { type: 'example', text: '누구나 실수하기 마련이에요 / 나이 들면 늙기 마련이에요 / 노력하면 성공하게 마련이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기 마련이에요', role: 'verb' },
        ],
        zh: '人嘛，谁都会犯错。',
        swapWords: ['실수하기 마련이에요', '틀리기 마련이에요', '늙기 마련이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '나이가 들면', role: 'verb' },
          { text: '몸이', role: 'subject' },
          { text: '약해지기 마련이에요', role: 'verb' },
        ],
        zh: '上了年纪身体自然会变弱。',
        swapWords: ['약해지기 마련이에요', '아프기 마련이에요', '느려지기 마련이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '자주 만나면', role: 'verb' },
          { text: '정이', role: 'subject' },
          { text: '들게 마련이에요', role: 'verb' },
        ],
        zh: '经常见面自然就会有感情。',
        swapWords: ['정이', '친밀감이', '애정이'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '좋은 결과가', role: 'subject' },
          { text: '나오기 마련이에요', role: 'verb' },
        ],
        zh: '努力了自然会有好结果。',
        swapWords: ['나오기 마련이에요', '있기 마련이에요', '따르기 마련이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '👴', context: '年老规律', ko: '사람은 누구나 늙기 마련이에요.', zh: '人嘛谁都会老。' },
      { icon: '❌', context: '犯错正常', ko: '실수는 누구나 하기 마련이에요. 너무 자책하지 마세요.', zh: '谁都会犯错，别太自责。' },
      { icon: '💔', context: '感情自然', ko: '자주 보면 정이 들게 마련이에요.', zh: '经常见就会有感情。' },
      { icon: '🎯', context: '努力有报', ko: '노력하면 성공하기 마련이에요.', zh: '努力自然会成功。' },
      { icon: '🌱', context: '成长规律', ko: '아이들은 자라기 마련이에요.', zh: '孩子总会长大的。' },
      { icon: '⏱️', context: '时间流逝', ko: '시간이 지나면 잊혀지기 마련이에요.', zh: '时间过了自然会淡忘。' },
    ],
    mistakes: [
      { wrong: '오늘 지각하기 마련이에요', correct: '오늘 지각할 것 같아요 / 항상 지각하기 마련이에요', note: '-기 마련이다 陈述"普遍规律"，不能用于个别偶然事件。个别事件用 -을 것 같다。' },
      { wrong: '실수하는 마련이에요', correct: '실수하기 마련이에요', note: '必须用 -기 名词化形，不能用 -는 冠形。' },
      { wrong: '누구나 실수해 마련이에요', correct: '누구나 실수하기 마련이에요', note: '不能用 해요体 直接接 마련이에요。必须词干 + 기 마련이다。' },
      { wrong: '내일 늙기 마련이에요', correct: '나이 들면 늙기 마련이에요', note: '-기 마련이다 陈述规律，前面通常是条件（-면）而不是特定时间点。' },
    ],
    quickTable: {
      title: '-기 마련이다 变形速查',
      body: '不看收音，所有词类同一接法。',
      headers: ['原形', '词类', '-기 마련이다', '中文'],
      rows: [
        ['실수하다', '动词', { ko: '실수하기 마련이다', zh: '自然会犯错' }, '难免犯错'],
        ['늙다', '动词', { ko: '늙기 마련이다', zh: '自然会老' }, '难免会老'],
        ['힘들다', '形容词', { ko: '힘들기 마련이다', zh: '自然会累' }, '难免会累'],
        ['잊다', '动词', { ko: '잊기 마련이다', zh: '自然会忘' }, '难免会忘'],
        ['후회하다', '动词', { ko: '후회하기 마련이다', zh: '自然会后悔' }, '难免会后悔'],
        ['아프다', '形容词', { ko: '아프기 마련이다', zh: '自然会不适' }, '难免会不适' ],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기 마련이다 用法练习',
      body: '根据语境选出正确形态或语法搭配。',
      questions: [
        {
          prompt: '"人嘛谁都会犯错" → 사람은 누구나 ___.',
          options: ['실수하는 마련이에요', '실수하기 마련이에요', '실수해 마련이에요', '실수한 마련이에요'],
          answer: 1,
          explanation: '必须是词干 + 기 마련이다。실수하다 → 실수하기 마련이에요。',
        },
        {
          prompt: '"老了自然会痛" → 나이가 들면 ___ 마련이에요.',
          options: ['아프기', '아파', '아픈', '아프는'],
          answer: 0,
          explanation: '词干 + 기 마련이다。아프다 → 아프기 마련이다。',
        },
        {
          prompt: '哪个句子最适合用 -기 마련이다？',
          options: [
            '오늘 시험에서 지각하기 마련이에요',
            '내일 비가 오기 마련이에요',
            '사람은 누구나 실수하기 마련이에요',
            '어제 회의가 있기 마련이었어요',
          ],
          answer: 2,
          explanation: '-기 마련이다 陈述普遍规律，最典型的场景是 사람은 누구나 + -기 마련이에요。其他选项都是个别事件。',
        },
        {
          prompt: '关于 -기 마련이다 和 -게 마련이다，哪句最准确？',
          options: [
            '前者是过去，后者是现在',
            '前者用于动词，后者用于形容词',
            '两者意思几乎相同，可以互换',
            '前者用于书面，后者只能用口语',
          ],
          answer: 2,
          explanation: '-기 마련이다 和 -게 마련이다 意思相同，都表达"自然会……"，可以互换使用。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l06'],
    step0Html: `<div class="card-title">-기 마련이다</div>
<div class="card-body">"自然会……" —— 陈述普遍规律或天经地义的事。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">规律 vs 个别事件</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">✓ 普遍规律</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사람은 누구나 실수하기 마련이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">人嘛谁都会犯错。（普遍真理）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">✗ 个别事件</div>
      <div style="font-size:16px;font-weight:800;color:#241917">오늘 지각하기 마련이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">"今天难免迟到"—— 语义不对，用 -을 것 같다。</div>
    </div>
  </div>
</div>
<div class="reminder-box">常和 누구나、다들、항상 等词搭配，加强"这是普遍规律"的语感。</div>`,
    compareHtml: `<div class="card-title">-기 마련이다 vs -는 법이다</div>
<div class="card-body">两者都表达"自然会……"，但侧重点不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 마련이다 → 自然规律</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">偏"生理/自然"的必然</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사람은 늙기 마련이에요.</span><span style="font-size:16px;color:#5a4640">人自然会老。（生理规律）</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 법이다 → 社会/道理规律</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">偏"应当如此"的道理</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잘못하면 벌을 받는 법이에요.</span><span style="font-size:16px;color:#5a4640">做错了自然要受罚。（道理）</span></div>
  </div>
</div>
<div class="reminder-box">两者接近但侧重不同：生理/自然规律用 마련이다；道理/事理 用 법이다。</div>`,
    compareLabel: '-기 마련이다 vs -는 법이다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 4 课</div>
    <div class="ov-hero-title">-기 마련이다</div>
    <div class="ov-hero-sub">"自然会……" · 陈述普遍规律</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词词干 + <b style="color:#ff7fa8">기 마련이다</b><br>
        变体：<b style="color:#2db89b">-게 마련이다</b>（意思相同）<br>
        不看收音，所有词类同一接法。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        누구나 실수하기 마련이에요.（谁都会犯错）<br>
        나이 들면 늙기 마련이에요.（上年纪自然会老）<br>
        자주 보면 정이 들게 마련이에요.（经常见就会有感情）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오늘 지각하기 마련이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">陈述"普遍规律"，不用于个别事件</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">실수하는 마련이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">必须词干 + 기 마련이다</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第5课：-기 십상이다 ────────────────────────────────
  {
    id: 'card-p22-l05',
    partNumber: 22,
    lessonNumber: 5,
    title: '-기 십상이다',
    whatItDoes: '十有八九会……（多为负面）',
    whatItDoesBody: '表达"某种情况很容易发生"，通常指不好的结果。\n和 -기 마련이다 结构相似，但语气更强、更偏负面。\n常出现在警告、劝告、担忧的语境里。',
    structureNote: '结构：动词词干 + 기 십상이다。\n십상 是汉字词"十上"，"十次里有十次" → "十有八九"。\n多接动词，主要用于负面结果的高概率发生。',
    rulesNote: '语感差别：\n· -기 마련이다：中性，指普遍规律\n· -기 십상이다：偏负面，指容易出错\n\n例：\n· 늙기 마련이다（会老）— 客观规律\n· 넘어지기 십상이다（容易摔倒）— 警告',
    structures: [
      {
        ko: '길이 미끄러우니까 넘어지기 십상이에요',
        zh: '路很滑，很容易摔倒。',
        tokens: [
          { text: '길이', role: 'subject' },
          { text: '미끄러우니까', role: 'verb' },
          { text: '넘어지기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '급하게 먹으면 체하기 십상이에요',
        zh: '吃太急很容易吃坏肚子。',
        tokens: [
          { text: '급하게', role: 'plain' },
          { text: '먹으면', role: 'verb' },
          { text: '체하기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '준비 없이 여행하면 후회하기 십상이에요',
        zh: '没准备就旅行很容易后悔。',
        tokens: [
          { text: '준비 없이', role: 'plain' },
          { text: '여행하면', role: 'verb' },
          { text: '후회하기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '이렇게 늦게 자면 지각하기 십상입니다',
        zh: '这么晚睡很容易迟到。',
        tokens: [
          { text: '이렇게 늦게', role: 'time' },
          { text: '자면', role: 'verb' },
          { text: '지각하기 십상입니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 기 십상이다', examples: '넘어지다→넘어지기 십상이다 / 체하다→체하기 십상이다' },
      { type: 'rule', text: '不看收音，直接接词干', examples: '所有动词接法一样' },
      { type: 'usage', text: '主要用于负面结果的高概率发生，含警告/劝告语气', examples: '급하게 먹으면 체하기 십상이에요（劝告）' },
      { type: 'usage', text: '前半句常是条件（-면、-으니까 等）', examples: '늦게 자면 지각하기 십상이에요 / 미끄러우니까 넘어지기 십상이에요' },
      { type: 'compare', text: '和 -기 마련이다 差别：中性规律 vs 负面警告', examples: '늙기 마련이에요（自然规律）/ 넘어지기 십상이에요（容易摔倒）' },
      { type: 'compare', text: '别拿中文"容易"硬套成 -기 쉽다：쉽다 只是中性"容易做到"，십상이다 强调"负面结果十有八九会发生"且带警告语气', examples: '실수하기 쉬워요（中性：容易出错）/ 실수하기 십상이에요（警告：一不小心准出错）' },
      { type: 'note', text: '不接形容词，只接动词', examples: '피곤하기 십상이에요 ✗ → 피곤해지기 십상이에요 ✓' },
      { type: 'example', text: '넘어지기 십상이에요 / 체하기 십상이에요 / 후회하기 십상이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '길이', role: 'subject' },
          { text: '미끄러우니까', role: 'verb' },
          { text: '넘어지기 십상이에요', role: 'verb' },
        ],
        zh: '路很滑，很容易摔倒。',
        swapWords: ['넘어지기 십상이에요', '미끄러지기 십상이에요', '다치기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '급하게', role: 'plain' },
          { text: '먹으면', role: 'verb' },
          { text: '체하기 십상이에요', role: 'verb' },
        ],
        zh: '吃太急很容易吃坏肚子。',
        swapWords: ['체하기 십상이에요', '탈나기 십상이에요', '배탈나기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '준비 없이', role: 'plain' },
          { text: '여행하면', role: 'verb' },
          { text: '후회하기 십상이에요', role: 'verb' },
        ],
        zh: '没准备就旅行很容易后悔。',
        swapWords: ['후회하기 십상이에요', '고생하기 십상이에요', '실수하기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '늦게', role: 'time' },
          { text: '자면', role: 'verb' },
          { text: '지각하기 십상이에요', role: 'verb' },
        ],
        zh: '睡晚了很容易迟到。',
        swapWords: ['지각하기 십상이에요', '피곤해지기 십상이에요', '늦잠자기 십상이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⚠️', context: '路面警告', ko: '눈길에서 뛰면 넘어지기 십상이에요.', zh: '雪地里跑很容易摔倒。' },
      { icon: '🍽️', context: '吃饭警告', ko: '급하게 먹으면 체하기 십상이에요.', zh: '吃太急很容易吃坏肚子。' },
      { icon: '💤', context: '睡眠劝告', ko: '늦게 자면 다음 날 지각하기 십상이에요.', zh: '睡晚了第二天很容易迟到。' },
      { icon: '💸', context: '花钱警告', ko: '충동적으로 쇼핑하면 후회하기 십상이에요.', zh: '冲动购物很容易后悔。' },
      { icon: '📱', context: '手机上瘾', ko: '스마트폰만 보면 눈이 피곤해지기 십상이에요.', zh: '一直看手机眼睛很容易累。' },
      { icon: '🚫', context: '规则违反', ko: '규칙을 무시하면 사고 나기 십상이에요.', zh: '无视规则很容易出事。' },
    ],
    mistakes: [
      { wrong: '실수하는 십상이에요', correct: '실수하기 십상이에요', note: '必须用 -기 名词化，不能用 -는 冠形。' },
      { wrong: '피곤하기 십상이에요', correct: '피곤해지기 십상이에요', note: '-기 십상이다 只接动词。形容词要通过 -아/어지다 变成动词。' },
      { wrong: '늙기 십상이에요', correct: '늙기 마련이에요', note: '늙다 是自然规律不是"容易出错"。中性规律用 -기 마련이다。' },
      { wrong: '노력하면 성공하기 십상이에요', correct: '노력하면 성공하기 마련이에요', note: '십상이다 用于负面结果。正面结果用 -기 마련이다。' },
    ],
    quickTable: {
      title: '-기 마련이다 vs -기 십상이다',
      body: '两个语法结构相似，但语气正负不同。',
      headers: ['结构', '语气', '内容', '例句'],
      rows: [
        [{ ko: '-기 마련이다', zh: '中性' }, { ko: '自然规律', zh: '天经地义' }, { ko: '生理/自然/普遍', zh: '늙기 마련' }, { ko: '사람은 늙기 마련이에요', zh: '人自然会老' }],
        [{ ko: '-기 십상이다', zh: '偏负面' }, { ko: '警告/担忧', zh: '容易出错' }, { ko: '不好的高概率', zh: '넘어지기 십상' }, { ko: '급하게 먹으면 체하기 십상이에요', zh: '吃急易积食' }],
        [{ ko: '-는 법이다', zh: '中性' }, { ko: '道理规律', zh: '应然' }, { ko: '社会/道德/习惯', zh: '벌 받는 법' }, { ko: '잘못하면 벌 받는 법이에요', zh: '犯错要受罚' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기 십상이다 用法练习',
      body: '根据语境判断该用哪个语法。',
      questions: [
        {
          prompt: '"吃太急容易吃坏肚子" → 급하게 먹으면 ___.',
          options: ['체하는 십상이에요', '체하기 십상이에요', '체하는 마련이에요', '체하기 마련이에요'],
          answer: 1,
          explanation: '负面警告 → -기 십상이다。체하다 → 체하기 십상이에요。',
        },
        {
          prompt: '"人自然会老" → 사람은 ___.',
          options: ['늙기 십상이에요', '늙기 마련이에요', '늙는 십상이에요', '늙어 십상이에요'],
          answer: 1,
          explanation: '늙다 是中性自然规律，不是"容易出错" → -기 마련이다。',
        },
        {
          prompt: '"没准备就旅行容易后悔" → 준비 없이 여행하면 ___.',
          options: ['후회하는 십상이에요', '후회하기 십상이에요', '후회할 리가 없어요', '후회하지 마세요'],
          answer: 1,
          explanation: '负面警告的高概率 → -기 십상이다。후회하다 → 후회하기 십상이에요。',
        },
        {
          prompt: '关于 -기 마련이다 和 -기 십상이다 的选择，哪句最准确？',
          options: [
            '两者完全可以互换',
            '-기 마련이다 是中性规律；-기 십상이다 偏负面警告',
            '-기 마련이다 只用书面，-기 십상이다 只用口语',
            '-기 마련이다 只接动词，-기 십상이다 只接形容词',
          ],
          answer: 1,
          explanation: '-기 마련이다 陈述中性普遍规律；-기 십상이다 警告"容易发生不好的事"。语义不同不能任意互换。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l04'],
    step0Html: `<div class="card-title">-기 십상이다</div>
<div class="card-body">"十有八九会……" —— 高概率发生（多为负面）。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">中性规律 vs 负面警告</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-기 마련이다（中性）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사람은 늙기 마련이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">人自然会老。（自然规律）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-기 십상이다（负面警告）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">급하게 먹으면 체하기 십상이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">吃太急容易吃坏肚子。（警告）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-기 십상이다 只接动词，且多用于警告、劝告的场合。</div>`,
    compareHtml: `<div class="card-title">-기 마련이다 vs -기 십상이다</div>
<div class="card-body">结构相似但语气不同，选错会显得奇怪。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 마련이다 → 中性自然规律</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"这本来就是这样"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노력하면 성공하기 마련이에요.</span><span style="font-size:16px;color:#5a4640">努力自然会成功。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 십상이다 → 负面警告</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"很容易出坏事"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">준비 없이 하면 실패하기 십상이에요.</span><span style="font-size:16px;color:#5a4640">没准备很容易失败。</span></div>
  </div>
</div>
<div class="reminder-box">正面结果用 -기 마련이다；负面警告用 -기 십상이다。</div>`,
    compareLabel: '-기 마련이다 vs -기 십상이다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 5 课</div>
    <div class="ov-hero-title">-기 십상이다</div>
    <div class="ov-hero-sub">"十有八九会……" · 负面高概率警告</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词词干 + <b style="color:#ff7fa8">기 십상이다</b><br>
        只接动词，不接形容词（要形容词要先 -아/어지다）。<br>
        多用于警告、劝告的语境。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        길이 미끄러우니까 넘어지기 십상이에요.<br>
        급하게 먹으면 체하기 십상이에요.<br>
        준비 없이 하면 실수하기 십상이에요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하기 십상이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤해지기 십상이에요（形容词 → 动词化）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늙기 십상이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늙기 마련이에요（中性规律）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第6课：-는 법이다 / -는 법이 없다 ────────────────────
  {
    id: 'card-p22-l06',
    partNumber: 22,
    lessonNumber: 6,
    title: '-는 법이다 / -는 법이 없다',
    whatItDoes: '本来就……（道理规律）/ 从不……',
    whatItDoesBody: '-는 법이다 表达"按道理/情理就是这样"的规律。\n-는 법이 없다 相反，表达"从来不这样"的固定否定。\n侧重"应然"或"惯例"，比 -기 마련이다 更偏道德/社会规律。',
    structureNote: '结构：\n· 动词词干 + 는 법이다（现在规律）\n· 形容词词干（无收音+ㄴ；有收音+은）+ 법이다\n· 名词 + 인 법이다\n否定：-는 법이 없다（从来不）',
    rulesNote: '和 -기 마련이다 的选择：\n· -기 마련이다：偏自然/生理规律\n· -는 법이다：偏社会/道理规律\n· 两者意思接近、可互换的场景多，微妙差别只在"侧重生理"还是"侧重道理"。',
    structures: [
      {
        ko: '잘못하면 벌을 받는 법이에요',
        zh: '做错了自然要受罚。',
        tokens: [
          { text: '잘못하면', role: 'verb' },
          { text: '벌을', role: 'object' },
          { text: '받는 법이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람은 절대 화를 내는 법이 없어요',
        zh: '那个人从不发火。',
        tokens: [
          { text: '그 사람은', role: 'subject' },
          { text: '절대', role: 'plain' },
          { text: '화를', role: 'object' },
          { text: '내는 법이 없어요', role: 'verb' },
        ],
      },
      {
        ko: '노력한 만큼 결과가 따르는 법입니다',
        zh: '努力多少，结果就跟多少。',
        tokens: [
          { text: '노력한 만큼', role: 'plain' },
          { text: '결과가', role: 'subject' },
          { text: '따르는 법입니다', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 약속을 어기는 법이 없어요',
        zh: '敏秀从不违约。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '약속을', role: 'object' },
          { text: '어기는 법이 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는 법이다', examples: '받다→받는 법이다 / 하다→하는 법이다' },
      { type: 'rule', text: '形容词有收音 + 은 법이다 / 无收音 + ㄴ 법이다', examples: '좋다→좋은 법이다 / 나쁘다→나쁜 법이다' },
      { type: 'rule', text: '否定：-는 법이 없다（从来不……）', examples: '화내는 법이 없다 / 웃는 법이 없다' },
      { type: 'rule', text: '名词 + 인 법이다', examples: '사실인 법이다 / 규칙인 법이다' },
      { type: 'usage', text: '陈述道理/惯例/社会规律，偏"应然"', examples: '잘못하면 벌 받는 법이에요（道理）/ 성실하면 성공하는 법이에요（惯例）' },
      { type: 'compare', text: '和 -기 마련이다 差别：道理规律 vs 自然规律', examples: '벌 받는 법이에요（社会道理）/ 늙기 마련이에요（生理规律）' },
      { type: 'note', text: '别把这里的 법 当成"方法"！你先学过 법 = 方法（做法 하는 법），但 -는 법이다 里的 법是"道理、规律"。所以 어기는 법이 없어요 不是"没有违约的方法"，而是"从不违约"', examples: '한국어 하는 법（方法：怎么说韩语）/ 약속을 어기는 법이 없어요（规律：他从不违约）' },
      { type: 'example', text: '벌 받는 법이에요 / 웃는 법이 없어요 / 좋은 사람은 좋은 결과가 따르는 법이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '잘못하면', role: 'verb' },
          { text: '벌을', role: 'object' },
          { text: '받는 법이에요', role: 'verb' },
        ],
        zh: '做错了自然要受罚。',
        swapWords: ['받는 법이에요', '치르는 법이에요', '지는 법이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '화를', role: 'object' },
          { text: '내는 법이 없어요', role: 'verb' },
        ],
        zh: '那个人从不发火。',
        swapWords: ['화를', '짜증을', '큰소리를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '노력한 만큼', role: 'plain' },
          { text: '결과가', role: 'subject' },
          { text: '따르는 법입니다', role: 'verb' },
        ],
        zh: '努力多少，结果就跟多少。',
        swapWords: ['따르는 법입니다', '나오는 법입니다', '보상되는 법입니다'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '약속을', role: 'object' },
          { text: '어기는 법이 없어요', role: 'verb' },
        ],
        zh: '敏秀从不违约。',
        swapWords: ['어기는 법이 없어요', '늦는 법이 없어요', '까먹는 법이 없어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⚖️', context: '道理规律', ko: '잘못하면 벌을 받는 법이에요.', zh: '做错了自然要受罚。' },
      { icon: '😇', context: '性情温和', ko: '그 사람은 화내는 법이 없어요.', zh: '那个人从不发火。' },
      { icon: '💪', context: '努力有报', ko: '성실하면 성공하는 법이에요.', zh: '踏实做事自然会成功。' },
      { icon: '⏰', context: '守时', ko: '민수 씨는 지각하는 법이 없어요.', zh: '敏秀从不迟到。' },
      { icon: '💔', context: '感情规律', ko: '만나면 헤어지는 법이에요.', zh: '有相遇就有别离。' },
      { icon: '🎁', context: '善有善报', ko: '착한 사람은 복 받는 법이에요.', zh: '善良的人自会得福。' },
    ],
    mistakes: [
      { wrong: '벌 받기 법이에요', correct: '벌 받는 법이에요', note: '动词必须用 -는 冠形接 법이다，不用 -기。' },
      { wrong: '화 내지 않는 법이 있어요（想表达从不发火）', correct: '화 내는 법이 없어요', note: '"从不……"固定用 -는 법이 없다，不用双重否定。' },
      { wrong: '늙는 법이에요', correct: '늙기 마련이에요', note: '生理/自然规律优先 -기 마련이다；-는 법이다 偏道理/社会规律。' },
      { wrong: '학생 법이에요', correct: '학생인 법이에요', note: '名词 + 인 법이다。' },
    ],
    quickTable: {
      title: '"自然会/规律"三大表达对照',
      body: '选择合适的语法最能显示韩语功底。',
      headers: ['结构', '侧重', '语气', '例句'],
      rows: [
        [{ ko: '-기 마련이다', zh: '自然规律' }, { ko: '生理/自然', zh: '中性' }, { ko: '늙기 마련', zh: '会老' }, { ko: '누구나 늙기 마련이에요', zh: '人自然会老' }],
        [{ ko: '-기 십상이다', zh: '否定的高概率' }, { ko: '不好的容易发生', zh: '警告' }, { ko: '넘어지기 십상', zh: '容易摔' }, { ko: '급하면 넘어지기 십상이에요', zh: '急了容易摔' }],
        [{ ko: '-는 법이다', zh: '道理/事理' }, { ko: '社会/道理', zh: '中性偏严' }, { ko: '벌 받는 법', zh: '应受罚' }, { ko: '잘못하면 벌 받는 법이에요', zh: '错了自然受罚' }],
        [{ ko: '-는 법이 없다', zh: '否定固定' }, { ko: '从不……', zh: '习惯性' }, { ko: '화내는 법이 없다', zh: '从不发火' }, { ko: '민수 씨는 화내는 법이 없어요', zh: '敏秀从不发火' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는 법이다 / -는 법이 없다 用法练习',
      body: '根据语境选出正确表达。',
      questions: [
        {
          prompt: '"做错了自然要受罚"（道理规律）→ 잘못하면 ___.',
          options: ['벌 받기 법이에요', '벌 받는 법이에요', '벌 받기 마련이에요', '벌 받는 법이 없어요'],
          answer: 1,
          explanation: '道理/社会规律 → -는 법이다。받다 → 받는 법이에요。',
        },
        {
          prompt: '"那个人从不发火" → 그 사람은 ___.',
          options: ['화내는 법이에요', '화내는 법이 없어요', '화내지 않는 법이에요', '화내기 마련이에요'],
          answer: 1,
          explanation: '"从不……"固定用 -는 법이 없다。내다 → 내는 법이 없어요。',
        },
        {
          prompt: '"人自然会老" 用什么最合适？',
          options: [
            '사람은 늙는 법이에요',
            '사람은 늙기 십상이에요',
            '사람은 늙기 마련이에요',
            '사람은 늙는 법이 없어요',
          ],
          answer: 2,
          explanation: '生理/自然规律优先 -기 마련이다。-는 법이다 更偏道理，-기 십상이다 是负面警告。',
        },
        {
          prompt: '关于 -는 법이다 / -는 법이 없다，哪句最准确？',
          options: [
            '-는 법이 없다 是"没有规律"的意思',
            '-는 법이 없다 表达"从来不……"',
            '两个结构意思完全一样',
            '-는 법이 없다 用于将来推测',
          ],
          answer: 1,
          explanation: '-는 법이 없다 是固定表达，意思是"从不……"，描述某人固定的行为习惯。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l04', 'card-p22-l05'],
    step0Html: `<div class="card-title">-는 법이다 / -는 법이 없다</div>
<div class="card-body">"本来就……/从不……" —— 陈述道理规律和固定习惯。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">肯定 vs 否定</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 법이다（自然规律）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">잘못하면 벌 받는 법이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">做错了自然要受罚。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 법이 없다（从不）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">그 사람은 화내는 법이 없어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那个人从不发火。</div>
    </div>
  </div>
</div>
<div class="reminder-box">법이다 侧重"应然/道理"，比 -기 마련이다 更偏社会规律或个人习惯。</div>`,
    compareHtml: `<div class="card-title">规律三兄弟 · 用法对比</div>
<div class="card-body">-기 마련이다、-기 십상이다、-는 법이다 · 都表达"自然会"，但选哪个各有讲究。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 마련이다 → 中性自然规律</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">사람은 늙기 마련이에요（生理）</div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 십상이다 → 负面警告</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">급하게 먹으면 체하기 십상이에요（劝告）</div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 법이다 → 道理规律</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">잘못하면 벌 받는 법이에요（应然）</div>
  </div>
</div>
<div class="reminder-box">生理规律用 마련이다，警告用 십상이다，道理用 법이다。</div>`,
    compareLabel: '规律三兄弟对比',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 6 课</div>
    <div class="ov-hero-title">-는 법이다 / -는 법이 없다</div>
    <div class="ov-hero-sub">"本来就……" · 道理规律与固定习惯</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词 + <b style="color:#ff7fa8">는 법이다</b>：받는 법이에요<br>
        形容词 + <b style="color:#2db89b">은/ㄴ 법이다</b>：좋은 법이에요<br>
        名词 + <b style="color:#6b7ff0">인 법이다</b>：규칙인 법이에요<br>
        否定：<b style="color:#c89020">-는 법이 없다</b>：화내는 법이 없어요
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        잘못하면 벌 받는 법이에요.（做错要受罚）<br>
        노력한 만큼 결과가 따르는 법입니다.（努力有报）<br>
        그 사람은 화내는 법이 없어요.（那人从不发火）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">벌 받기 법이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">벌 받는 법이에요（动词用 -는）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">화내지 않는 법이 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">화내는 법이 없어요（固定否定）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第7课：-는 게 뻔하다 ────────────────────────────────
  {
    id: 'card-p22-l07',
    partNumber: 22,
    lessonNumber: 7,
    title: '-는/은/ㄴ 게 뻔하다',
    whatItDoes: '显然是……（心里有数）',
    whatItDoesBody: '表达"根据情况判断，事情显然会是这样"的强推测。\n뻔하다 就是"明摆着、显而易见"的意思。\n带主观判断色彩，说话人对结论很有把握。',
    structureNote: '结构：\n· 动词 + 는 게 뻔하다（现在/将来）\n· 动词 + 은/ㄴ 게 뻔하다（过去）\n· 形容词 + 은/ㄴ 게 뻔하다\n· 名词 + 인 게 뻔하다\n\n뻔하다 本身是形容词"显而易见"。',
    rulesNote: '和 -을 리가 없다 相反：\n· -을 리가 없다 = 断言"不可能"\n· -는 게 뻔하다 = 断言"显然会"\n\n和 -을 게 틀림없다（下一课）差别微妙：\n· -는 게 뻔하다 = 从眼前情况推断\n· -을 게 틀림없다 = 从证据/规律推断',
    structures: [
      {
        ko: '민수 씨는 또 늦게 올 게 뻔해요',
        zh: '敏秀显然又会晚到。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '또', role: 'plain' },
          { text: '늦게 올 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '저 표정 보니까 화가 난 게 뻔해요',
        zh: '看那表情，显然是生气了。',
        tokens: [
          { text: '저 표정 보니까', role: 'verb' },
          { text: '화가', role: 'subject' },
          { text: '난 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '이 문제 답을 안 보고 푸는 게 뻔해요',
        zh: '这题他显然是没看答案就做的。',
        tokens: [
          { text: '이 문제', role: 'object' },
          { text: '답을 안 보고', role: 'plain' },
          { text: '푸는 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '가격이 저렇게 싼 걸 보니까 짝퉁인 게 뻔해요',
        zh: '看价格那么便宜，显然是假货。',
        tokens: [
          { text: '가격이 저렇게 싼 걸 보니까', role: 'verb' },
          { text: '짝퉁인 게 뻔해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在/将来 + 는 게 뻔하다', examples: '오다→오는 게 뻔하다 / 하다→하는 게 뻔하다' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 게 뻔하다', examples: '가다→간 게 뻔하다 / 먹다→먹은 게 뻔하다' },
      { type: 'rule', text: '动词将来 + 을/ㄹ 게 뻔하다', examples: '늦다→늦을 게 뻔하다 / 오다→올 게 뻔하다' },
      { type: 'rule', text: '形容词 + 은/ㄴ 게 뻔하다', examples: '어렵다→어려운 게 뻔하다 / 좋다→좋은 게 뻔하다' },
      { type: 'rule', text: '名词 + 인 게 뻔하다', examples: '거짓말인 게 뻔하다 / 짝퉁인 게 뻔하다' },
      { type: 'usage', text: '根据眼前情况做强推测，带"心知肚明"的语感', examples: '표정 보니까 화난 게 뻔해요（看表情就知道生气了）' },
      { type: 'compare', text: '和 -을 리가 없다 相反：断言"显然会" vs 断言"绝不可能"', examples: '올 게 뻔해요（显然会来）↔ 올 리가 없어요（不可能来）' },
      { type: 'compare', text: '最容易混：뻔하다 有两副面孔！有没有 게（=것이）意思完全相反。-을 뻔하다=差点儿…（结果没发生）；-을 게 뻔하다=显然会…（判断一定会）', examples: '늦을 뻔했어요（差点儿迟到，其实没迟）/ 늦을 게 뻔해요（显然会迟到）' },
      { type: 'example', text: '늦을 게 뻔해요 / 화난 게 뻔해요 / 짝퉁인 게 뻔해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '또', role: 'plain' },
          { text: '늦게 올 게 뻔해요', role: 'verb' },
        ],
        zh: '敏秀显然又会晚到。',
        swapWords: ['늦게 올 게 뻔해요', '지각할 게 뻔해요', '못 올 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저 표정 보니까', role: 'verb' },
          { text: '화가', role: 'subject' },
          { text: '난 게 뻔해요', role: 'verb' },
        ],
        zh: '看那表情，显然是生气了。',
        swapWords: ['화가 난 게 뻔해요', '기분 나쁜 게 뻔해요', '삐친 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제', role: 'object' },
          { text: '답을 안 보고', role: 'plain' },
          { text: '푸는 게 뻔해요', role: 'verb' },
        ],
        zh: '这题他显然是没看答案就做的。',
        swapWords: ['푸는 게 뻔해요', '베끼는 게 뻔해요', '외운 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가격이 저렇게 싼 걸 보니까', role: 'verb' },
          { text: '짝퉁인 게 뻔해요', role: 'verb' },
        ],
        zh: '看价格那么便宜，显然是假货。',
        swapWords: ['짝퉁인 게 뻔해요', '가짜인 게 뻔해요', '불량품인 게 뻔해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '朋友总是迟到', ko: '민수 씨는 오늘도 늦을 게 뻔해요.', zh: '敏秀今天显然又会晚到。' },
      { icon: '😠', context: '看出生气', ko: '저 표정, 화난 게 뻔해요.', zh: '那表情，显然是生气了。' },
      { icon: '🎭', context: '识破谎言', ko: '거짓말인 게 뻔한데 자꾸 우기네요.', zh: '明显是撒谎还一个劲儿嘴硬。' },
      { icon: '💸', context: '假货识别', ko: '이 가방, 짝퉁인 게 뻔해요.', zh: '这个包，显然是假货。' },
      { icon: '📝', context: '预判失败', ko: '준비 안 하고 갔으니까 떨어진 게 뻔해요.', zh: '没准备就去了，显然是落选了。' },
      { icon: '🎯', context: '推断真相', ko: '핑계인 게 뻔해요. 진짜 이유가 뭐예요?', zh: '显然是借口。真的原因是什么？' },
    ],
    mistakes: [
      { wrong: '늦기 뻔해요', correct: '늦을 게 뻔해요', note: '必须是 冠形 + 게 뻔하다，不能用 -기 뻔하다。' },
      { wrong: '가는 게 뻔해요（想说过去去了）', correct: '간 게 뻔해요', note: '过去动作用过去冠形 -은/ㄴ。간 게 뻔해요。' },
      { wrong: '짝퉁 뻔해요', correct: '짝퉁인 게 뻔해요', note: '名词 + 인 게 뻔하다。짝퉁 + 인 게 뻔해요。' },
      { wrong: '어렵는 게 뻔해요', correct: '어려운 게 뻔해요', note: '形容词用 -은/ㄴ 冠形。어렵다 → 어려운 게 뻔해요。' },
    ],
    quickTable: {
      title: '-는/은/ㄴ/을 게 뻔하다 · 冠形选择',
      body: '按词性和时态选择正确冠形。',
      headers: ['词性', '时态', '冠形', '例句'],
      rows: [
        [{ ko: '动词', zh: '现在' }, { ko: '-는', zh: '进行/习惯' }, { ko: '오는 게 뻔하다', zh: '显然要来' }, { ko: '지금 오는 게 뻔해요', zh: '肯定正来着' }],
        [{ ko: '动词', zh: '过去' }, { ko: '-은/ㄴ', zh: '已完成' }, { ko: '간 게 뻔하다', zh: '显然去了' }, { ko: '벌써 간 게 뻔해요', zh: '肯定已经走了' }],
        [{ ko: '动词', zh: '将来' }, { ko: '-을/ㄹ', zh: '还未发生' }, { ko: '올 게 뻔하다', zh: '显然会来' }, { ko: '내일 올 게 뻔해요', zh: '明天肯定来' }],
        [{ ko: '形容词', zh: '现在' }, { ko: '-은/ㄴ', zh: '状态' }, { ko: '어려운 게 뻔하다', zh: '显然难' }, { ko: '이 문제 어려운 게 뻔해요', zh: '这题肯定难' }],
        [{ ko: '名词+이다', zh: '现在' }, { ko: '인', zh: '身份' }, { ko: '거짓말인 게 뻔하다', zh: '显然是谎话' }, { ko: '거짓말인 게 뻔해요', zh: '肯定是撒谎' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ/을 게 뻔하다 用法练习',
      body: '根据词性和时态选出正确冠形。',
      questions: [
        {
          prompt: '"敏秀今天显然又会晚到" → 민수 씨는 오늘도 ___.',
          options: ['늦는 게 뻔해요', '늦을 게 뻔해요', '늦은 게 뻔해요', '늦기 뻔해요'],
          answer: 1,
          explanation: '"还没发生的未来动作" → 未来冠形 -을/ㄹ。늦다 有收音 → 늦을 게 뻔해요。',
        },
        {
          prompt: '"看表情显然是生气了" → 저 표정 보니까 ___.',
          options: ['화나는 게 뻔해요', '화날 게 뻔해요', '화난 게 뻔해요', '화나기 뻔해요'],
          answer: 2,
          explanation: '"生气"是已经完成的状态 → 过去冠形 -은/ㄴ。나다 → 난 게 뻔해요。',
        },
        {
          prompt: '"这个显然是假货" → 이거 ___.',
          options: ['짝퉁 뻔해요', '짝퉁인 게 뻔해요', '짝퉁의 게 뻔해요', '짝퉁이는 게 뻔해요'],
          answer: 1,
          explanation: '名词 + 이다 + 은/ㄴ 冠形 → 名词 + 인 게 뻔하다。짝퉁인 게 뻔해요。',
        },
        {
          prompt: '关于 -는 게 뻔하다 和 -을 리가 없다，哪句最准确？',
          options: [
            '两者意思相同',
            '前者断言"显然会"，后者断言"不可能"，方向相反',
            '前者用未来，后者用过去',
            '前者只用动词，后者只用形容词',
          ],
          answer: 1,
          explanation: '-는 게 뻔하다 = 强肯定推测"显然是"；-을 리가 없다 = 强否定推测"不可能"。方向完全相反。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l03', 'card-p22-l08'],
    step0Html: `<div class="card-title">-는/은/ㄴ 게 뻔하다</div>
<div class="card-body">"显然是……" —— 根据情况做出的强推测。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">强推测两极</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 게 뻔하다（显然会）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">늦을 게 뻔해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">肯定会迟到。（95%）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을 리가 없다（不可能）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">늦을 리가 없어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不可能迟到。（0%）</div>
    </div>
  </div>
</div>
<div class="reminder-box">뻔하다 = "显而易见"。带"心知肚明"的主观判断色彩。</div>`,
    compareHtml: `<div class="card-title">-는 게 뻔하다 vs -을 게 틀림없다</div>
<div class="card-body">两者都是强肯定推测，微妙差别在推测的依据。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 게 뻔하다 → 从眼前情况判断</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"看着就知道"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">표정 보니까 화난 게 뻔해요.</span><span style="font-size:16px;color:#5a4640">看表情就知道生气了。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을 게 틀림없다 → 从证据/规律判断</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"根据规律推断"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">항상 지각하니까 오늘도 늦을 게 틀림없어요.</span><span style="font-size:16px;color:#5a4640">总迟到肯定今天也会晚。</span></div>
  </div>
</div>
<div class="reminder-box">뻔하다 更主观，틀림없다 更基于证据。两者可以互换的场景很多。</div>`,
    compareLabel: '-는 게 뻔하다 vs -을 게 틀림없다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 7 课</div>
    <div class="ov-hero-title">-는/은/ㄴ 게 뻔하다</div>
    <div class="ov-hero-sub">"显然是……" · 强推测（心知肚明）</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 게 뻔하다</b>：하는 게 뻔해요<br>
        动词过去 → <b style="color:#2db89b">-은/ㄴ 게 뻔하다</b>：간 게 뻔해요<br>
        动词将来 → <b style="color:#6b7ff0">-을/ㄹ 게 뻔하다</b>：올 게 뻔해요<br>
        形容词 → <b style="color:#c89020">-은/ㄴ 게 뻔하다</b>：어려운 게 뻔해요<br>
        名词 → <b style="color:#e05555">인 게 뻔하다</b>：거짓말인 게 뻔해요
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        오늘도 늦을 게 뻔해요.（今天肯定会晚到）<br>
        표정 보니까 화난 게 뻔해요.（一看表情就知道生气了）<br>
        가격이 싼 걸 보니까 짝퉁인 게 뻔해요.（价格便宜显然是假货）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늦기 뻔해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦을 게 뻔해요（冠形+게 뻔하다）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">짝퉁 뻔해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">짝퉁인 게 뻔해요（名词+인）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第8课：-을/ㄹ 게 틀림없다 ────────────────────────────
  {
    id: 'card-p22-l08',
    partNumber: 22,
    lessonNumber: 8,
    title: '-을/ㄹ 게 틀림없다',
    whatItDoes: '肯定会……（无疑）',
    whatItDoesBody: '表达"根据证据/规律，一定会……"的最高确定性推测。\n틀림없다 直译"没有错误"→"确信无疑"。\n和 -을 리가 없다 是同一光谱的两端：一个断言"肯定"，一个断言"不可能"。',
    structureNote: '结构：\n· 动词/形容词 + 을/ㄹ 게 틀림없다（未来推测）\n· 动词过去 + 은/ㄴ 게 틀림없다（过去推测）\n· 名词 + 인 게 틀림없다\n\n틀림없다 也可单独使用，等于 "그렇다"。',
    rulesNote: '推测确定性最高级：\n· -을지도 모르다（20%）\n· -을 것 같다（60%）\n· -을 것이다（80%）\n· -을 게 틀림없다（95%）— 这一课\n\n和 -는 게 뻔하다 意思接近但语感不同：\n· 뻔하다：主观判断"看着就知道"\n· 틀림없다：客观证据"根据规律"',
    structures: [
      {
        ko: '이 시간에 오는 사람은 민수 씨일 게 틀림없어요',
        zh: '这个点来的人肯定是敏秀。',
        tokens: [
          { text: '이 시간에', role: 'time' },
          { text: '오는 사람은', role: 'subject' },
          { text: '민수 씨일 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '노력하니까 성공할 게 틀림없어요',
        zh: '这么努力肯定会成功。',
        tokens: [
          { text: '노력하니까', role: 'verb' },
          { text: '성공할 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '전화를 안 받는 걸 보니 자고 있는 게 틀림없어요',
        zh: '不接电话，肯定是在睡觉。',
        tokens: [
          { text: '전화를 안 받는 걸 보니', role: 'verb' },
          { text: '자고 있는 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '이 냄새는 김치찌개인 게 틀림없어요',
        zh: '这味道肯定是泡菜锅。',
        tokens: [
          { text: '이 냄새는', role: 'subject' },
          { text: '김치찌개인 게 틀림없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词无收音 + ㄹ 게 틀림없다', examples: '가다→갈 게 틀림없다 / 크다→클 게 틀림없다' },
      { type: 'rule', text: '动词/形容词有收音 + 을 게 틀림없다', examples: '먹다→먹을 게 틀림없다 / 좋다→좋을 게 틀림없다' },
      { type: 'rule', text: '动词现在进行 + 는 게 틀림없다', examples: '자는 게 틀림없다 / 하는 게 틀림없다' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 게 틀림없다', examples: '간 게 틀림없다 / 먹은 게 틀림없다' },
      { type: 'rule', text: '名词 + 인 게 틀림없다', examples: '민수 씨인 게 틀림없다 / 사실인 게 틀림없다' },
      { type: 'usage', text: '推测确定性最高，接近"确信"', examples: '노력하니까 성공할 게 틀림없어요（几乎肯定）' },
      { type: 'compare', text: '和 -는 게 뻔하다 差别：客观证据 vs 主观判断', examples: '통계상 그럴 게 틀림없어요（客观）/ 보니까 뻔해요（主观）' },
      { type: 'note', text: '别被结尾的 없다 骗了！它不是否定。틀림없다 是一个整体词（틀림=错误，없다=没有→"没有错、确信无疑"），所以 성공할 게 틀림없어요 是"肯定会成功"，绝不是"不会成功"', examples: '성공할 게 틀림없어요 = 肯定会成功（✓ 强肯定，不是否定）' },
      { type: 'example', text: '갈 게 틀림없다 / 자고 있는 게 틀림없다 / 사실인 게 틀림없다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 시간에', role: 'time' },
          { text: '오는 사람은', role: 'subject' },
          { text: '민수 씨일 게 틀림없어요', role: 'verb' },
        ],
        zh: '这个点来的人肯定是敏秀。',
        swapWords: ['민수 씨일', '언니일', '엄마일'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '노력하니까', role: 'verb' },
          { text: '성공할 게 틀림없어요', role: 'verb' },
        ],
        zh: '这么努力肯定会成功。',
        swapWords: ['성공할 게 틀림없어요', '합격할 게 틀림없어요', '잘 될 게 틀림없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '전화를 안 받는 걸 보니', role: 'verb' },
          { text: '자고 있는 게 틀림없어요', role: 'verb' },
        ],
        zh: '不接电话，肯定是在睡觉。',
        swapWords: ['자고 있는 게 틀림없어요', '나간 게 틀림없어요', '바쁜 게 틀림없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 냄새는', role: 'subject' },
          { text: '김치찌개인 게 틀림없어요', role: 'verb' },
        ],
        zh: '这味道肯定是泡菜锅。',
        swapWords: ['김치찌개인', '된장찌개인', '순두부찌개인'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🔍', context: '推理判断', ko: '지문이 남아 있어요. 범인인 게 틀림없어요.', zh: '留下了指纹，肯定是嫌犯。' },
      { icon: '💡', context: '合乎逻辑', ko: '이렇게 열심히 하니까 잘 될 게 틀림없어요.', zh: '这么用心肯定会顺利的。' },
      { icon: '📱', context: '推测状态', ko: '전화를 안 받는 걸 보니 회의 중일 게 틀림없어요.', zh: '不接电话，肯定在开会。' },
      { icon: '👃', context: '味觉识别', ko: '이 냄새는 삼겹살인 게 틀림없어요.', zh: '这味道肯定是烤五花肉。' },
      { icon: '📊', context: '数据说话', ko: '데이터가 이렇게 나왔으니까 결과가 좋을 게 틀림없어요.', zh: '数据是这样，结果肯定不错。' },
      { icon: '🎯', context: '结果预判', ko: '이 팀은 이번에 우승할 게 틀림없어요.', zh: '这支队伍这次肯定会夺冠。' },
    ],
    mistakes: [
      { wrong: '갈 것 틀림없어요', correct: '갈 게 틀림없어요', note: '固定形是 -을/ㄹ 게 틀림없다，中间 것 与后续之间没有助词。것 → 게（缩合）。' },
      { wrong: '학생 게 틀림없어요', correct: '학생인 게 틀림없어요', note: '名词 + 인 게 틀림없다。학생 + 인 게 틀림없어요。' },
      { wrong: '어제 갔을 게 틀림없어요', correct: '어제 간 게 틀림없어요', note: '过去动作用过去冠形 -은/ㄴ。갔을 是错误的形态。' },
      { wrong: '노력하니까 성공할 리가 없어요（想说肯定成功）', correct: '노력하니까 성공할 게 틀림없어요', note: '-을 리가 없다 是"不可能"（负面否定），"肯定"必须用 -을 게 틀림없다。' },
    ],
    quickTable: {
      title: '推测确定性总梯度',
      body: '整个 P22 学过的推测语法全对比。',
      headers: ['结构', '确定性', '语感', '例句'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '★ 说不定' }, { ko: '20%', zh: '很不确定' }, { ko: '猜测', zh: '主观' }, { ko: '갈지도 몰라요', zh: '说不定去' }],
        [{ ko: '-을 수도 있다', zh: '★★ 可能' }, { ko: '40%', zh: '客观可能性' }, { ko: '可能性', zh: '가능성' }, { ko: '갈 수도 있어요', zh: '也可能去' }],
        [{ ko: '-을 것 같다', zh: '★★★ 好像' }, { ko: '60%', zh: '有点感觉' }, { ko: '주관 감각', zh: '感觉' }, { ko: '갈 것 같아요', zh: '好像会去' }],
        [{ ko: '-을 것이다', zh: '★★★★ 会' }, { ko: '80%', zh: '较肯定' }, { ko: '一般预期', zh: '기대' }, { ko: '갈 거예요', zh: '会去的' }],
        [{ ko: '-는 게 뻔하다', zh: '★★★★★ 显然' }, { ko: '95%', zh: '主观确信' }, { ko: '心知肚明', zh: '주관' }, { ko: '갈 게 뻔해요', zh: '显然会去' }],
        [{ ko: '-을 게 틀림없다', zh: '★★★★★ 肯定' }, { ko: '95%', zh: '客观确信' }, { ko: '证据充足', zh: '客观' }, { ko: '갈 게 틀림없어요', zh: '肯定会去' }],
        [{ ko: '-을 리가 없다', zh: '✗ 不可能' }, { ko: '0%', zh: '断言否定' }, { ko: '绝对不可能', zh: '否定确信' }, { ko: '갈 리가 없어요', zh: '不可能去' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 게 틀림없다 用法练习',
      body: '根据词性、时态和语境选出正确形态。',
      questions: [
        {
          prompt: '"这么努力肯定会成功" → 노력하니까 ___.',
          options: ['성공하는 게 틀림없어요', '성공할 게 틀림없어요', '성공한 게 틀림없어요', '성공하기 틀림없어요'],
          answer: 1,
          explanation: '未来事件 → 未来冠形 -을/ㄹ。성공하다 无收音 → 성공할 게 틀림없어요。',
        },
        {
          prompt: '"这味道肯定是泡菜锅" → 이 냄새는 ___.',
          options: ['김치찌개 게 틀림없어요', '김치찌개인 게 틀림없어요', '김치찌개일 게 틀림없어요', '김치찌개는 게 틀림없어요'],
          answer: 1,
          explanation: '名词 + 이다 现在时冠形 → 名词 + 인 게 틀림없다。김치찌개인 게 틀림없어요。',
        },
        {
          prompt: '"不接电话肯定在睡觉" → 전화를 안 받는 걸 보니 ___.',
          options: ['자는 게 틀림없어요', '잘 게 틀림없어요', '잔 게 틀림없어요', '자기 틀림없어요'],
          answer: 0,
          explanation: '"正在睡觉"是现在进行 → -는 게 틀림없다。자다 → 자는 게 틀림없어요。',
        },
        {
          prompt: '关于 -을 게 틀림없다 和 -는 게 뻔하다，哪句最准确？',
          options: [
            '两者意思完全不同',
            '两者接近，前者更客观依据，后者更主观判断',
            '前者只用未来，后者只用过去',
            '前者是否定，后者是肯定',
          ],
          answer: 1,
          explanation: '两个都是强肯定推测，差别在推测依据：틀림없다 更客观（"根据证据"），뻔하다 更主观（"我看着就知道"）。可互换的场景很多。',
        },
      ],
    },
    linkedGrammarIds: ['card-p22-l02', 'card-p22-l03', 'card-p22-l07'],
    step0Html: `<div class="card-title">-을/ㄹ 게 틀림없다</div>
<div class="card-body">"肯定会……" —— 韩语推测确定性最高的表达。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">推测确定性巅峰</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-을 것 같다（60%）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">올 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像会来。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을 게 틀림없다（95%）· 这一课</div>
      <div style="font-size:16px;font-weight:800;color:#241917">올 게 틀림없어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">肯定会来。（几乎确信）</div>
    </div>
  </div>
</div>
<div class="reminder-box">틀림없다 = "没有错误" → "确信无疑"。带客观证据的强推测。</div>`,
    compareHtml: `<div class="card-title">-을 게 틀림없다 vs -을 리가 없다</div>
<div class="card-body">推测光谱的两端 —— 断言肯定 vs 断言不可能。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 게 틀림없다 → 肯定会</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">最强肯定推测（95%）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">올 게 틀림없어요.</span><span style="font-size:16px;color:#5a4640">肯定会来。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 리가 없다 → 不可能</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">最强否定推测（0%）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">올 리가 없어요.</span><span style="font-size:16px;color:#5a4640">不可能来。</span></div>
  </div>
</div>
<div class="reminder-box">两个语法结构相似（-을 게 vs -을 리가）但意思完全相反。区分靠 틀림없다（肯定）vs 없다（没有可能）。</div>`,
    compareLabel: '-을 게 틀림없다 vs -을 리가 없다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 第 8 课</div>
    <div class="ov-hero-title">-을/ㄹ 게 틀림없다</div>
    <div class="ov-hero-sub">"肯定会……" · 最高确定性推测</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 게 틀림없다</b>：자는 게 틀림없다<br>
        动词过去 → <b style="color:#2db89b">-은/ㄴ 게 틀림없다</b>：간 게 틀림없다<br>
        动词/形容词将来 → <b style="color:#6b7ff0">-을/ㄹ 게 틀림없다</b>：올 게 틀림없다<br>
        名词 → <b style="color:#c89020">인 게 틀림없다</b>：학생인 게 틀림없다
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        노력하니까 성공할 게 틀림없어요.（努力肯定会成功）<br>
        자고 있는 게 틀림없어요.（肯定在睡觉）<br>
        김치찌개인 게 틀림없어요.（肯定是泡菜锅）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갈 것 틀림없어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 게 틀림없어요（것→게 缩合）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 게 틀림없어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생인 게 틀림없어요（名词+인）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ─────────────────────────────────────
  {
    id: 'card-p22-l09',
    partNumber: 22,
    lessonNumber: 9,
    title: 'P22 综合练习',
    whatItDoes: 'P22 第1～8课 总复习',
    whatItDoesBody: '完成这份练习，检验担忧、推测与规律八大语法。\n覆盖：-을까 봐、-을지도 모르다、-을 리가 없다、-기 마련이다、-기 십상이다、-는 법이다、-는 게 뻔하다、-을 게 틀림없다。\n重点掌握推测确定性梯度与规律语法的选择。',
    isPractice: true,
    structureNote: 'P22 八大语法分组：\n【担忧】L01 -을까 봐\n【推测】L02 -을지도 모르다（说不定）· L03 -을 리가 없다（不可能）· L07 -는 게 뻔하다（显然是）· L08 -을 게 틀림없다（肯定）\n【规律】L04 -기 마련이다（自然规律）· L05 -기 십상이다（负面警告）· L06 -는 법이다（道理规律）',
    structures: [
      { ko: '비가 올까 봐 우산을 챙겼어요', zh: '怕下雨带了伞。', tokens: [{ text: '비가', role: 'subject' }, { text: '올까 봐', role: 'verb' }, { text: '우산을', role: 'object' }, { text: '챙겼어요', role: 'verb' }] },
      { ko: '내일 비가 올지도 몰라요', zh: '明天说不定下雨。', tokens: [{ text: '내일', role: 'time' }, { text: '비가', role: 'subject' }, { text: '올지도 몰라요', role: 'verb' }] },
      { ko: '그럴 리가 없어요', zh: '不可能这样。', tokens: [{ text: '그럴 리가 없어요', role: 'verb' }] },
      { ko: '사람은 실수하기 마련이에요', zh: '人嘛谁都会犯错。', tokens: [{ text: '사람은', role: 'subject' }, { text: '실수하기 마련이에요', role: 'verb' }] },
      { ko: '급하면 넘어지기 십상이에요', zh: '急了容易摔倒。', tokens: [{ text: '급하면', role: 'verb' }, { text: '넘어지기 십상이에요', role: 'verb' }] },
      { ko: '잘못하면 벌 받는 법이에요', zh: '做错了自然要受罚。', tokens: [{ text: '잘못하면', role: 'verb' }, { text: '벌', role: 'object' }, { text: '받는 법이에요', role: 'verb' }] },
      { ko: '늦을 게 뻔해요', zh: '显然要迟到了。', tokens: [{ text: '늦을 게 뻔해요', role: 'verb' }] },
      { ko: '노력하니까 성공할 게 틀림없어요', zh: '这么努力肯定会成功。', tokens: [{ text: '노력하니까', role: 'verb' }, { text: '성공할 게 틀림없어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '担心 → -을까 봐 + 主句', examples: '늦을까 봐 뛰었어요（怕迟到所以跑了。）' },
      { type: 'rule', text: '低概率推测（说不定）→ -을지도 모르다', examples: '올지도 몰라요（说不定会来。）' },
      { type: 'rule', text: '绝对否定推测 → -을 리가 없다', examples: '올 리가 없어요（不可能来。）' },
      { type: 'rule', text: '自然规律 → -기 마련이다', examples: '누구나 늙기 마련이에요（谁都难免会老。）' },
      { type: 'rule', text: '负面警告（容易发生坏事）→ -기 십상이다', examples: '급하면 넘어지기 십상이에요（一急就容易摔倒。）' },
      { type: 'rule', text: '道理规律 → -는 법이다 / 从不 → -는 법이 없다', examples: '벌 받는 법이에요 / 화내는 법이 없어요' },
      { type: 'rule', text: '主观强推测 → -는 게 뻔하다', examples: '올 게 뻔해요（肯定会来，来是明摆着的。）' },
      { type: 'rule', text: '客观强推测 → -을 게 틀림없다', examples: '올 게 틀림없어요（一定会来，毫无疑问。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '늦을까 봐', role: 'verb' }, { text: '택시를', role: 'object' }, { text: '탔어요', role: 'verb' }],
        zh: '怕迟到打了车。',
        swapRole: 'verb',
        swapWords: ['늦을까 봐', '지각할까 봐', '못 갈까 봐'],
      },
      {
        wordBlocks: [{ text: '사람은', role: 'subject' }, { text: '누구나', role: 'plain' }, { text: '실수하기 마련이에요', role: 'verb' }],
        zh: '人嘛谁都会犯错。',
        swapRole: 'verb',
        swapWords: ['실수하기 마련이에요', '틀리기 마련이에요', '후회하기 마련이에요'],
      },
      {
        wordBlocks: [{ text: '노력하니까', role: 'verb' }, { text: '성공할 게 틀림없어요', role: 'verb' }],
        zh: '这么努力肯定会成功。',
        swapRole: 'verb',
        swapWords: ['성공할 게 틀림없어요', '잘 될 게 틀림없어요', '합격할 게 틀림없어요'],
      },
    ],
    scenarios: [
      { icon: '☔', context: 'L01 担心', ko: '비가 올까 봐 우산 챙겼어요.', zh: '怕下雨带了伞。' },
      { icon: '❓', context: 'L02 说不定', ko: '주말에 시간이 안 될지도 몰라요.', zh: '周末说不定没时间。' },
      { icon: '🚫', context: 'L03 不可能', ko: '거짓말할 리가 없어요.', zh: '不可能说谎。' },
      { icon: '⚖️', context: 'L04 自然规律', ko: '사람은 누구나 늙기 마련이에요.', zh: '人自然会老。' },
      { icon: '⚠️', context: 'L05 负面警告', ko: '급하면 실수하기 십상이에요.', zh: '急了容易出错。' },
      { icon: '📜', context: 'L06 道理规律', ko: '잘못하면 벌 받는 법이에요.', zh: '做错了自然要受罚。' },
      { icon: '👁️', context: 'L07 显然是', ko: '표정 보니 화난 게 뻔해요.', zh: '看表情显然生气了。' },
      { icon: '🎯', context: 'L08 肯定', ko: '이 팀이 우승할 게 틀림없어요.', zh: '这队肯定夺冠。' },
    ],
    mistakes: [
      { wrong: '가을까 봐', correct: '갈까 봐', note: 'L01：가다 无收音 → ㄹ까 봐。' },
      { wrong: '갈지도 알아요', correct: '갈지도 몰라요', note: 'L02：固定搭配是 모르다，不能用 알다。' },
      { wrong: '갈 리 없어요', correct: '갈 리가 없어요', note: 'L03：리 后面必须加 가。' },
      { wrong: '실수하는 마련이에요', correct: '실수하기 마련이에요', note: 'L04：必须用 -기 名词化。' },
      { wrong: '피곤하기 십상이에요', correct: '피곤해지기 십상이에요', note: 'L05：只接动词，形容词要 -아/어지다。' },
      { wrong: '늦기 뻔해요', correct: '늦을 게 뻔해요', note: 'L07：必须冠形 + 게 뻔하다。' },
      { wrong: '학생 게 틀림없어요', correct: '학생인 게 틀림없어요', note: 'L08：名词 + 인 게 틀림없다。' },
      { wrong: '늙기 십상이에요', correct: '늙기 마련이에요', note: 'L04/L05：自然规律用 마련이다，负面警告才用 십상이다。' },
    ],
    linkedGrammarIds: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习 · 担忧、推测与规律',
      body: '根据语境选出最合适的表达。',
      questions: [
        {
          prompt: '"怕迟到打了出租车" → ___ 택시를 탔어요.',
          options: ['늦기 마련이라서', '늦을까 봐', '늦을지도 몰라서', '늦을 게 틀림없어서'],
          answer: 1,
          explanation: 'L01 担心 + 采取行动 → -을까 봐。늦다 有收音 → 늦을까 봐。',
        },
        {
          prompt: '"明天说不定会下雨"（低概率推测）→ 내일 비가 ___.',
          options: ['올 게 뻔해요', '올 리가 없어요', '올지도 몰라요', '올 게 틀림없어요'],
          answer: 2,
          explanation: 'L02 低概率推测（说不定）→ -을지도 모르다。올지도 몰라요。',
        },
        {
          prompt: '"那个人不可能说谎"（强烈否定）→ 그 사람이 거짓말 ___.',
          options: ['할지도 몰라요', '할 리가 없어요', '할 게 뻔해요', '할 게 틀림없어요'],
          answer: 1,
          explanation: 'L03 强烈否定推测 → -을 리가 없다。할 리가 없어요。',
        },
        {
          prompt: '"人嘛谁都会犯错"（自然规律）→ 사람은 누구나 ___.',
          options: ['실수하기 십상이에요', '실수하는 법이 없어요', '실수할 리가 없어요', '실수하기 마련이에요'],
          answer: 3,
          explanation: 'L04 中性自然规律 → -기 마련이다。사람은 누구나 실수하기 마련이에요。',
        },
        {
          prompt: '"吃太急容易积食"（负面警告）→ 급하게 먹으면 ___.',
          options: ['체하기 마련이에요', '체하기 십상이에요', '체할 리가 없어요', '체하는 법이에요'],
          answer: 1,
          explanation: 'L05 负面警告（容易发生坏事）→ -기 십상이다。체하기 십상이에요。',
        },
        {
          prompt: '"做错了自然要受罚"（道理规律）→ 잘못하면 ___.',
          options: ['벌 받기 십상이에요', '벌 받기 마련이에요', '벌 받는 법이에요', '벌 받을 리가 없어요'],
          answer: 2,
          explanation: 'L06 道理/社会规律 → -는 법이다。벌 받는 법이에요。（-기 마련이다 也可但 -는 법이다 更贴道理）',
        },
        {
          prompt: '"看表情显然生气了"（主观强推测）→ 저 표정 보니까 ___.',
          options: ['화날 리가 없어요', '화나는 법이에요', '화난 게 뻔해요', '화날지도 몰라요'],
          answer: 2,
          explanation: 'L07 主观强推测（看着就知道）→ -은/ㄴ 게 뻔하다（过去状态）。화난 게 뻔해요。',
        },
        {
          prompt: '"这么努力肯定会成功"（客观强推测）→ 노력하니까 ___.',
          options: ['성공할지도 몰라요', '성공할 게 뻔해요', '성공할 리가 없어요', '성공할 게 틀림없어요'],
          answer: 3,
          explanation: 'L08 客观证据强推测（几乎确信）→ -을 게 틀림없다。성공할 게 틀림없어요。',
        },
        {
          prompt: '"敏秀从不发火" → 민수 씨는 ___.',
          options: ['화내는 법이에요', '화내는 법이 없어요', '화낼 리가 없어요', '화내기 십상이에요'],
          answer: 1,
          explanation: 'L06 固定否定"从不……" → -는 법이 없다。화내는 법이 없어요。',
        },
        {
          prompt: '关于推测确定性梯度，哪句最准确？',
          options: [
            '-을지도 모르다 比 -을 게 틀림없다 更肯定',
            '-을 리가 없다 是最不确定的推测',
            '-을 게 틀림없다 是最强肯定，-을 리가 없다 是最强否定',
            '所有推测语法确定性相同',
          ],
          answer: 2,
          explanation: 'P22 推测光谱：说不定（-을지도 모르다）< 好像（-을 것 같다）< 会（-을 것이다）< 肯定（-을 게 틀림없다）↔ 不可能（-을 리가 없다）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P22 · 综合练习</div>
    <div class="ov-hero-title">P22 综合练习</div>
    <div class="ov-hero-sub">担忧、推测与规律 · 八大语法总复习</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">语法清单</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L01</span> -을까 봐 · 担心+采取行动</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L02</span> -을지도 모르다 · 说不定（低概率）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L03</span> -을 리가 없다 · 不可能（强烈否定）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L04</span> -기 마련이다 · 自然规律（中性）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L05</span> -기 십상이다 · 十有八九（负面警告）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L06</span> -는 법이다 · 道理规律 / -는 법이 없다 · 从不</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L07</span> -는 게 뻔하다 · 显然（主观强推测）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L08</span> -을 게 틀림없다 · 肯定（客观强推测）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">推测确定性梯度</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b>0%</b> -을 리가 없다（不可能）<br>
        <b>20%</b> -을지도 모르다（说不定）<br>
        <b>60%</b> -을 것 같다（好像）· 之前学过<br>
        <b>80%</b> -을 것이다（会）· 之前学过<br>
        <b>95%</b> -는 게 뻔하다（显然·主观）<br>
        <b>95%</b> -을 게 틀림없다（肯定·客观）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">规律三兄弟</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b>生理/自然</b> → -기 마련이다（늙기 마련）<br>
        <b>负面警告</b> → -기 십상이다（넘어지기 십상）<br>
        <b>道理/社会</b> → -는 법이다（벌 받는 법）
      </div>
    </div>
  </div>
</div>`,
  },

];
