import type { GrammarCard } from '@/types';

export const grammarCardsP22: GrammarCard[] = [
  // ── 第1课：-을/ㄹ까 봐 ─────────────────────────────────────
  {
    id: 'card-p22-l01',
    partNumber: 22,
    lessonNumber: 1,
    title: '-을/ㄹ까 봐',
    whatItDoes: '担心/怕会……', whatItDoesEn: 'Worried that... / Afraid that...',
    whatItDoesBody: '表达对某种（不希望发生的）情况的担心。\n后半句通常是为避免这个担心而采取的行动。\n口语和写作里都极高频，是韩语最重要的"担心表达"。', whatItDoesBodyEn: 'Expresses worry about an (undesired) situation.\\nThe second clause usually describes an action taken to avoid that worry.\\nExtremely common in both speech and writing—it\'s Korean\'s most important expression for worry.',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 까 봐。\n可看作 -을까?（是否会）+ 봐（担心） 的融合，直译"看会不会……"。\n后半句常有 걱정하다、안 하다、챙기다、준비하다 等避免担心的动作。', structureNoteEn: 'Structure: verb/adjective stem (no batchim + ㄹ; with batchim + 을) + 까 봐.\\nCan be seen as a blend of -을까? (whether) + 봐 (worry), literally "watching whether..."\\nThe second clause often has actions like 걱정하다, 안 하다, 챙기다, 준비하다 to avoid the worry.',
    rulesNote: '常见搭配套路：\n1. -을까 봐 걱정이에요（担心……）\n2. -을까 봐 [动作]（怕……所以做了……）\n3. -을까 봐서（连接形，加서 强调原因）\n过去时用 -았/었을까 봐（怕当时……了）。', rulesNoteEn: 'Common patterns:\\n1. -을까 봐 걱정이에요 (worried that...)\\n2. -을까 봐 [action] (did... because afraid that...)\\n3. -을까 봐서 (connective form, adding 서 to emphasize the reason)\\nPast tense uses -았/었을까 봐 (afraid that... at the time).',
    structures: [
      {
        ko: '비가 올까 봐 우산을 챙겼어요',
        zh: '怕下雨，带了伞。', zhEn: 'Afraid it might rain, so I brought an umbrella.',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '올까 봐', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
      },
      {
        ko: '늦을까 봐 택시를 탔어요',
        zh: '怕迟到，打了出租车。', zhEn: 'Afraid of being late, so I took a taxi.',
        tokens: [
          { text: '늦을까 봐', role: 'verb' },
          { text: '택시를', role: 'object' },
          { text: '탔어요', role: 'verb' },
        ],
      },
      {
        ko: '시험에 떨어질까 봐 걱정이에요',
        zh: '担心考试不及格。', zhEn: 'Worried about failing the exam.',
        tokens: [
          { text: '시험에', role: 'place' },
          { text: '떨어질까 봐', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 아셨을까 봐 조마조마했어요',
        zh: '怕妈妈已经知道了，忐忑不安。', zhEn: 'Worried that mom might already know, feeling anxious.',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아셨을까 봐', role: 'verb' },
          { text: '조마조마했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ까 봐', textEn: 'Stem without batchim + ㄹ까 봐', examples: '가다→갈까 봐 / 오다→올까 봐 / 하다→할까 봐' },
      { type: 'rule', text: '有收音词干 + 을까 봐', textEn: 'Stem with batchim + 을까 봐', examples: '먹다→먹을까 봐 / 늦다→늦을까 봐 / 앉다→앉을까 봐' },
      { type: 'rule', text: '过去担心用 -았/었을까 봐', textEn: 'Past worry uses -았/었을까 봐', examples: '갔을까 봐 / 잊었을까 봐 / 아셨을까 봐' },
      { type: 'usage', text: '后半句常接避免担心的动作或 걱정이에요', textEn: 'The second clause often takes an action to avoid the worry or 걱정이에요', examples: '비가 올까 봐 우산을 챙겼어요 / 떨어질까 봐 걱정이에요' },
      { type: 'compare', text: '和 -을 것 같아서 差别：-을까 봐 强调担心，-을 것 같아서 强调推测', textEn: 'Difference from -을 것 같아서: -을까 봐 emphasizes worry, -을 것 같아서 emphasizes speculation', examples: '비가 올까 봐 우산을 챙겼어요（担心）/ 비가 올 것 같아서 우산을 챙겼어요（推测）', examplesEn: '비가 올까 봐 우산을 챙겼어요 (worry) / 비가 올 것 같아서 우산을 챙겼어요 (speculation)' },
      { type: 'note', text: '常和 걱정하다、두렵다、조마조마하다 等心情词搭配', textEn: 'Often pairs with emotion words like 걱정하다, 두렵다, 조마조마하다', examples: '떨어질까 봐 걱정돼요 / 늦을까 봐 두려워요' },
      { type: 'note', text: '后半句只能是"已经采取的行动"或 걱정이에요 这类陈述，不能接命令或提议。想说"怕迟到快走吧"得换 -(으)면 안 되니까', textEn: 'The second clause can only be an action already taken or a statement like 걱정이에요, not a command or suggestion. To say \'Let\'s hurry in case we\'re late,\' use -(으)면 안 되니까 instead', examples: '✗늦을까 봐 서두르세요 → ○늦으면 안 되니까 서두르세요' },
      { type: 'note', text: '中文"怕不/怕没……"的否定要放进 -을까 봐 从句里（못/안 + 动词 + 을까 봐），别挪到后半句', textEn: 'In Chinese, the negation in \'afraid not/afraid didn\'t\' goes inside the -을까 봐 clause (못/안 + verb + 을까 봐), not in the second clause', examples: '怕来不了 → 못 올까 봐 / 怕考不好 → 시험 못 볼까 봐', examplesEn: 'Afraid can\'t come → 못 올까 봐 / Afraid won\'t do well on test → 시험 못 볼까 봐' },
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
        zh: '怕下雨，带了伞。', zhEn: 'Afraid it might rain, so I brought an umbrella.',
        swapWords: ['올까 봐', '쏟아질까 봐', '내릴까 봐'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '늦을까 봐', role: 'verb' },
          { text: '택시를', role: 'object' },
          { text: '탔어요', role: 'verb' },
        ],
        zh: '怕迟到，打了出租车。', zhEn: 'Afraid of being late, so I took a taxi.',
        swapWords: ['택시를', '지하철을', '버스를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '시험에', role: 'place' },
          { text: '떨어질까 봐', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
        zh: '担心考试不及格。', zhEn: 'Worried about failing the exam.',
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
        zh: '怕孩子醒，悄悄进来了。', zhEn: 'Came in quietly, afraid the child might wake up.',
        swapWords: ['깰까 봐', '울까 봐', '놀랄까 봐'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☔', context: '出门备伞', contextEn: 'Bringing an umbrella when going out', ko: '비가 올까 봐 우산 챙겼어요.', zh: '怕下雨带了伞。', zhEn: 'Brought an umbrella in case it rains.' },
      { icon: '⏰', context: '打车赶时间', contextEn: 'Taking a taxi to save time', ko: '늦을까 봐 택시 탔어요.', zh: '怕迟到打了车。', zhEn: 'Took a taxi, afraid of being late.' },
      { icon: '📝', context: '考试担心', contextEn: 'Worried about the exam', ko: '시험에 떨어질까 봐 잠을 못 잤어요.', zh: '担心考试不及格，没睡好。', zhEn: 'Worried about failing the exam, didn\'t sleep well.' },
      { icon: '👶', context: '怕吵孩子', contextEn: 'Afraid of disturbing the child', ko: '아기가 깰까 봐 조심히 걸었어요.', zh: '怕吵醒孩子，走路很小心。', zhEn: 'Walked carefully, afraid of waking the child.' },
      { icon: '💔', context: '怕对方生气', contextEn: 'Afraid the other person might get angry', ko: '친구가 화낼까 봐 미리 사과했어요.', zh: '怕朋友生气，提前道歉了。', zhEn: 'Apologized in advance, afraid my friend might get angry.' },
      { icon: '🍜', context: '怕辣', contextEn: 'Afraid of spicy food', ko: '너무 매울까 봐 물을 먼저 시켰어요.', zh: '怕太辣，先点了水。', zhEn: 'Ordered water first, afraid it might be too spicy.' },
    ],
    mistakes: [
      { wrong: '가을까 봐 걱정이에요', correct: '갈까 봐 걱정이에요', note: '가다 无收音 → ㄹ까 봐，不能加 을。갈까 봐 才是正确形态。', noteEn: '가다 has no batchim → ㄹ까 봐, can\'t add 을. 갈까 봐 is the correct form.' },
      { wrong: '먹ㄹ까 봐 걱정이에요', correct: '먹을까 봐 걱정이에요', note: '먹다 有收音 ㄱ → 을까 봐。먹을까 봐。', noteEn: '먹다 has a final consonant ㄱ → 을까 봐. 먹을까 봐.' },
      { wrong: '내일 비가 왔을까 봐 우산을 챙겼어요', correct: '내일 비가 올까 봐 우산을 챙길게요', note: '"내일"是未来 → 用现在形 올까 봐。过去 왔을까 봐 只用于对已发生事情的担心。', noteEn: '"내일" is future → use present form 올까 봐. Past 왔을까 봐 is only for worrying about something that already happened.' },
      { wrong: '비가 올까 봤어요', correct: '비가 올까 봐 우산을 챙겼어요', note: '-을까 봐 是连接形，后面必须接主句动词。올까 봤어요 是不存在的形式。', noteEn: '-을까 봐 is a connective form; it must be followed by a main clause verb. 올까 봤어요 is not a valid form.' },
    ],
    quickTable: {
      title: '-을/ㄹ까 봐 变形速查', titleEn: '-을/ㄹ까 봐 Conjugation Quick Reference',
      body: '按词干收音和时态选正确形态。', bodyEn: 'Choose the correct form based on the stem\'s final consonant and tense.',
      headers: ['原形', '词干', '现在担心', '过去担心'],
      rows: [
        ['가다', '가（무받침）', { ko: '갈까 봐', zh: '怕去/会去', zhEn: 'afraid of going' }, { ko: '갔을까 봐', zh: '怕已经去了', zhEn: 'afraid (he) already went' }],
        ['먹다', '먹（有ㄱ）', { ko: '먹을까 봐', zh: '怕吃/会吃', zhEn: 'afraid of eating' }, { ko: '먹었을까 봐', zh: '怕已经吃了', zhEn: 'afraid (he) already ate' }],
        ['하다', '하（무받침）', { ko: '할까 봐', zh: '怕做', zhEn: 'afraid of doing' }, { ko: '했을까 봐', zh: '怕已经做了', zhEn: 'afraid (he) already did' }],
        ['늦다', '늦（有ㅈ）', { ko: '늦을까 봐', zh: '怕迟到', zhEn: 'afraid of being late' }, { ko: '늦었을까 봐', zh: '怕已经迟了', zhEn: 'afraid (he) is already late' }],
        ['알다', '알（ㄹ词干）', { ko: '알까 봐', zh: '怕（他）知道', zhEn: 'afraid (he) will find out' }, { ko: '알았을까 봐', zh: '怕（他）已经知道了', zhEn: 'afraid (he) already knows' }],
        ['잊다', '잊（有ㅈ）', { ko: '잊을까 봐', zh: '怕忘', zhEn: 'afraid of forgetting' }, { ko: '잊었을까 봐', zh: '怕忘了', zhEn: 'afraid (he) forgot' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ까 봐 变形练习', titleEn: '-을/ㄹ까 봐 Conjugation Practice',
      body: '根据词干和语境选出正确形态。', bodyEn: 'Choose the correct form based on the stem and context.',
      questions: [
        {
          prompt: '"怕下雨，带了伞" → 비가 ___ 우산을 챙겼어요.', promptEn: '"Afraid it would rain, I brought an umbrella" → 비가 ___ 우산을 챙겼어요.',
          options: ['오을까 봐', '올까 봐', '왔을까 봐', '오까 봐'],
          answer: 1,
          explanation: '오다 无收音 → ㄹ까 봐。올까 봐（未来担心）。왔을까 봐 是过去担心，不符合语境。', explanationEn: '오다 has no final consonant → ㄹ까 봐. 올까 봐 (future worry). 왔을까 봐 is past worry, doesn\'t fit the context.',
        },
        {
          prompt: '"怕迟到，打车了" → ___ 택시를 탔어요.', promptEn: '"Afraid of being late, I took a taxi" → ___ 택시를 탔어요.',
          options: ['늦ㄹ까 봐', '늦을까 봐', '늦면', '늦어서'],
          answer: 1,
          explanation: '늦다 有收音 ㅈ → 을까 봐。늦을까 봐。', explanationEn: '늦다 has a final consonant ㅈ → 을까 봐. 늦을까 봐.',
        },
        {
          prompt: '"怕妈妈已经知道了" → 엄마가 ___ 조마조마했어요.', promptEn: '"Afraid mom already knows" → 엄마가 ___ 조마조마했어요.',
          options: ['아셨을까 봐', '아실까 봐', '아신다고', '아시니까'],
          answer: 0,
          explanation: '"已经知道了"是过去 → 过去担心用 -았/었을까 봐。아시다 → 아셨을까 봐。', explanationEn: '"Already knows" is past → past worry uses -았/었을까 봐. 아시다 → 아셨을까 봐.',
        },
        {
          prompt: '关于 -을까 봐 和 -을 것 같아서 的区别，哪句最准确？', promptEn: 'Regarding the difference between -을까 봐 and -을 것 같아서, which statement is most accurate?',
          options: [
            '两者意思完全相同',
            '-을까 봐 强调"担心不希望发生"；-을 것 같아서 强调"推测可能发生"',
            '前者用于过去，后者用于未来',
            '前者只用于口语',
          ],
          answer: 1,
          explanation: '-을까 봐 带担心/害怕的情感色彩；-을 것 같아서 只是客观推测。虽然后半句都可接同样动作，但情感语气不同。', explanationEn: '-을까 봐 carries a nuance of worry/fear; -을 것 같아서 is just an objective guess. Although both can be followed by the same action, the emotional tone differs.',
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
    whatItDoes: '说不定/可能……', whatItDoesEn: 'Might... / Could be...',
    whatItDoesBody: '表达低概率的推测，"说不定会……"、"没准儿……"。\n比 -을 것 같다（好像）更弱、更不确定，只是提出一种可能性。\n"我不确定，但也许会"的语气，中级韩语里的高频表达。', whatItDoesBodyEn: 'Expresses a low-probability guess: "might..." or "could be..."\\nWeaker and more uncertain than -을 것 같다 (seems like); just offers a possibility.\\nCarries a "I\'m not sure, but maybe" tone—a high-frequency expression in intermediate Korean.',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 지도 모르다。\n直译"连（是否）……也不知道"，引申为"说不定"。\n结尾常用 몰라요 / 모르겠어요，比较委婉。', structureNoteEn: 'Structure: verb/adjective stem (no batchim + ㄹ; with batchim + 을) + 지도 모르다.\\nLiterally "don\'t even know (whether)..." extended to mean "might."\\nOften ends with 몰라요 / 모르겠어요 for a softer tone.',
    rulesNote: '推测的确定性梯度（从低到高）：\n1. -을지도 모르다（说不定）— 最不确定\n2. -을 수도 있다（也可能）— 客观可能\n3. -을 것 같다（好像）— 有点感觉\n4. -을 것이다（应该会）— 较肯定\n5. -을 게 틀림없다（肯定）— 最确定', rulesNoteEn: 'Certainty gradient for speculation (low to high):\\n1. -을지도 모르다 (might) — least certain\\n2. -을 수도 있다 (could) — objective possibility\\n3. -을 것 같다 (seems like) — a hunch\\n4. -을 것이다 (probably will) — fairly sure\\n5. -을 게 틀림없다 (definitely) — most certain',
    structures: [
      {
        ko: '내일 비가 올지도 몰라요',
        zh: '明天说不定会下雨。', zhEn: 'It might rain tomorrow.',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 벌써 갔을지도 몰라요',
        zh: '那个人说不定已经走了。', zhEn: 'He might have already left.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '문제가 생각보다 어려울지도 몰라요',
        zh: '题目说不定比想的难。', zhEn: 'The questions might be harder than expected.',
        tokens: [
          { text: '문제가', role: 'subject' },
          { text: '생각보다', role: 'plain' },
          { text: '어려울지도 몰라요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 시간이 안 될지도 모르겠어요',
        zh: '周末说不定没时间。', zhEn: 'I might not have time on the weekend.',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '시간이', role: 'subject' },
          { text: '안 될지도 모르겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ지도 모르다', textEn: 'Stem without final consonant + -ㄹ지도 모르다', examples: '가다→갈지도 모르다 / 오다→올지도 모르다' },
      { type: 'rule', text: '有收音词干 + 을지도 모르다', textEn: 'Stem with final consonant + -을지도 모르다', examples: '먹다→먹을지도 모르다 / 늦다→늦을지도 모르다' },
      { type: 'rule', text: '过去推测 → -았/었을지도 모르다', textEn: 'Past speculation → -았/었을지도 모르다', examples: '갔을지도 몰라요 / 몰랐을지도 모르다' },
      { type: 'rule', text: '名词 + 일지도 모르다', textEn: 'Noun + -일지도 모르다', examples: '학생일지도 몰라요 / 사실일지도 몰라요' },
      { type: 'usage', text: '推测确定性最低，接近"没准儿"、"或许"', textEn: 'Lowest certainty, close to \'maybe\' or \'perhaps\'', examples: '올지도 몰라요（说不定会来）< 올 것 같아요（好像会来）< 올 거예요（会来吧）', examplesEn: '올지도 몰라요 (might come) < 올 것 같아요 (seems like will come) < 올 거예요 (will come)' },
      { type: 'compare', text: '和 -을 수도 있다 差别：前者主观猜测，后者客观可能性', textEn: 'Difference from -을 수도 있다: the former is subjective guess, the latter is objective possibility', examples: '올지도 몰라요（我猜）/ 올 수도 있어요（有这种可能）', examplesEn: '올지도 몰라요 (I guess) / 올 수도 있어요 (there\'s a chance)' },
      { type: 'note', text: '结尾的 모르다 是 르 不规则：说成 몰라요 / 몰랐어요 / 모르겠어요，绝不是 모르어요 / 모르었어요', textEn: 'The final 모르다 is a 르-irregular: say 몰라요 / 몰랐어요 / 모르겠어요, never 모르어요 / 모르었어요', examples: '갈지도 몰라요 / 갔을지도 몰랐어요' },
      { type: 'note', text: '中文"说不定"能提到句首单独用，韩语 -을지도 모르다 必须整句作谓语放句末。想在句首点出不确定，加副词 아마 / 어쩌면', textEn: 'In Chinese, \'maybe\' can stand alone at the start, but Korean -을지도 모르다 must be the predicate at the end. To express uncertainty at the start, add adverbs like 아마 / 어쩌면', examples: '说不定他会来 → 어쩌면 그 사람이 올지도 몰라요', examplesEn: 'He might come → 어쩌면 그 사람이 올지도 몰라요' },
      { type: 'example', text: '비가 올지도 몰라요 / 어려울지도 모르겠어요 / 학생일지도 몰라요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올지도 몰라요', role: 'verb' },
        ],
        zh: '明天说不定会下雨。', zhEn: 'It might rain tomorrow.',
        swapWords: ['올지도 몰라요', '내릴지도 몰라요', '쏟아질지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을지도 몰라요', role: 'verb' },
        ],
        zh: '那个人说不定已经走了。', zhEn: 'He might have already left.',
        swapWords: ['갔을지도 몰라요', '왔을지도 몰라요', '떠났을지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울지도 몰라요', role: 'verb' },
        ],
        zh: '这道题说不定难。', zhEn: 'This question might be hard.',
        swapWords: ['어려울지도 몰라요', '쉬울지도 몰라요', '이상할지도 몰라요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그건', role: 'subject' },
          { text: '사실일지도', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '那可能是真的。', zhEn: 'That might be true.',
        swapWords: ['사실일지도', '거짓말일지도', '오해일지도'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '☁️', context: '天气不定', contextEn: 'Weather is uncertain', ko: '오늘 비가 올지도 몰라요. 우산 챙기세요.', zh: '今天说不定会下雨，带把伞。', zhEn: 'It might rain today, bring an umbrella.' },
      { icon: '🚶', context: '朋友已走', contextEn: 'Friend has already left', ko: '지금 가면 벌써 집에 갔을지도 몰라요.', zh: '现在去说不定已经回家了。', zhEn: 'If you go now, they might have already gone home.' },
      { icon: '📝', context: '考题预判', contextEn: 'Predicting exam questions', ko: '이번 시험은 어려울지도 몰라요.', zh: '这次考试说不定会难。', zhEn: 'This exam might be hard.' },
      { icon: '📅', context: '日程不定', contextEn: 'Schedule is uncertain', ko: '주말에 약속이 있을지도 몰라요.', zh: '周末说不定有约。', zhEn: 'I might have plans on the weekend.' },
      { icon: '💭', context: '身份猜测', contextEn: 'Identity guess', ko: '저 사람 유명인일지도 몰라요.', zh: '那个人说不定是名人。', zhEn: 'That person might be a celebrity.' },
      { icon: '🚗', context: '交通堵塞', contextEn: 'Traffic jam', ko: '지금 출발해도 길이 막힐지도 몰라요.', zh: '现在出发说不定也会堵。', zhEn: 'Even if we leave now, there might still be traffic.' },
    ],
    mistakes: [
      { wrong: '갈지도 알아요', correct: '갈지도 몰라요', note: '固定搭配是 -을지도 모르다（不知道/说不定），不能用 알다（知道）。语义与结构固定。', noteEn: 'The fixed expression is -을지도 모르다 (don\'t know/might), and 알다 (know) cannot be used. The meaning and structure are fixed.' },
      { wrong: '먹ㄹ지도 몰라요', correct: '먹을지도 몰라요', note: '먹다 有收音 → 을지도 몰라요。먹을지도 몰라요。', noteEn: '먹다 has a final consonant → 을지도 몰라요. 먹을지도 몰라요.' },
      { wrong: '학생지도 몰라요', correct: '학생일지도 몰라요', note: '名词 + 이다 变形 + 을지도 모르다 → 名词 + 일지도 모르다。', noteEn: 'Noun + 이다 conjugation + 을지도 모르다 → Noun + 일지도 모르다.' },
      { wrong: '어제 갈지도 몰라요（想说昨天可能去了）', wrongEn: '어제 갈지도 몰라요 (meaning to say might have gone yesterday)', correct: '어제 갔을지도 몰라요', note: '对已发生事情的推测用过去 -았을지도 모르다。', noteEn: 'For speculating about past events, use the past tense -았을지도 모르다.' },
    ],
    quickTable: {
      title: '推测确定性梯度', titleEn: 'Certainty Gradient for Speculation',
      body: '同样是"可能"，语气有从弱到强的层级。', bodyEn: 'Even though they all mean \'might,\' the tone ranges from weak to strong.',
      headers: ['结构', '中文', '确定性', '例句'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '说不定/或许', zhEn: 'might/maybe' }, { ko: '低（不确定）', zh: '猜测', zhEn: 'guess' }, { ko: '★', zh: '20%' }, { ko: '올지도 몰라요', zh: '说不定会来', zhEn: 'might come' }],
        [{ ko: '-을 수도 있다', zh: '也可能', zhEn: 'could also' }, { ko: '中低（客观可能）', zh: '可能性', zhEn: 'possibility' }, { ko: '★★', zh: '40%' }, { ko: '올 수도 있어요', zh: '也可能会来', zhEn: 'might also come' }],
        [{ ko: '-을 것 같다', zh: '好像/感觉', zhEn: 'seems/feels like' }, { ko: '中（主观感觉）', zh: '感觉', zhEn: 'feeling' }, { ko: '★★★', zh: '60%' }, { ko: '올 것 같아요', zh: '好像会来', zhEn: 'seems like it will come' }],
        [{ ko: '-을 것이다', zh: '应该会/将', zhEn: 'should/will' }, { ko: '中高（较肯定）', zh: '预期', zhEn: 'expectation' }, { ko: '★★★★', zh: '80%' }, { ko: '올 거예요', zh: '会来的', zhEn: 'will come' }],
        [{ ko: '-을 게 틀림없다', zh: '肯定会', zhEn: 'definitely will' }, { ko: '高（几乎确定）', zh: '断定', zhEn: 'conclude' }, { ko: '★★★★★', zh: '95%' }, { ko: '올 게 틀림없어요', zh: '肯定会来', zhEn: 'will definitely come' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ지도 모르다 变形练习', titleEn: '-을/ㄹ지도 모르다 Conjugation Practice',
      body: '根据词性和时态选出正确形态。', bodyEn: 'Choose the correct form based on part of speech and tense.',
      questions: [
        {
          prompt: '"这题说不定难" → 이 문제가 ___.', promptEn: '"This problem might be hard" → 이 문제가 ___.',
          options: ['어려을지도 몰라요', '어려울지도 몰라요', '어렵ㄹ지도 몰라요', '어려지도 몰라요'],
          answer: 1,
          explanation: '어렵다 是 ㅂ 不规则 → 어려우- + ㄹ지도 몰라요 = 어려울지도 몰라요。', explanationEn: '어렵다 is a ㅂ irregular → 어려우- + ㄹ지도 몰라요 = 어려울지도 몰라요.',
        },
        {
          prompt: '"那个人可能是学生" → 저 사람이 ___.', promptEn: '"That person might be a student" → 저 사람이 ___.',
          options: ['학생지도 몰라요', '학생일지도 몰라요', '학생을지도 몰라요', '학생인지도 몰라요'],
          answer: 1,
          explanation: '名词 + 이다 + 을지도 모르다 = 名词 + 일지도 모르다。학생일지도 몰라요。', explanationEn: 'Noun + 이다 + 을지도 모르다 = Noun + 일지도 모르다. 학생일지도 몰라요.',
        },
        {
          prompt: '"那个人可能已经走了" → 그 사람이 벌써 ___.', promptEn: '"That person might have already left" → 그 사람이 벌써 ___.',
          options: ['갈지도 몰라요', '갔을지도 몰라요', '가지도 몰라요', '갔지도 몰라요'],
          answer: 1,
          explanation: '过去推测 → -았/었을지도 모르다。가다 → 갔을지도 몰라요。', explanationEn: 'Past speculation → -았/었을지도 모르다. 가다 → 갔을지도 몰라요.',
        },
        {
          prompt: '关于推测确定性梯度，哪句最准确？', promptEn: 'Regarding the certainty gradient of speculation, which sentence is most accurate?',
          options: [
            '-을지도 모르다 比 -을 것 같다 更肯定',
            '-을지도 모르다 是最不确定的推测，"说不定"',
            '-을지도 모르다 表示已经发生',
            '-을지도 모르다 只用于书面语',
          ],
          answer: 1,
          explanation: '-을지도 모르다 是韩语推测确定性最低的表达，接近中文"说不定/或许"。', explanationEn: '-을지도 모르다 is the expression with the lowest certainty in Korean speculation, close to Chinese "说不定/或许" (maybe/perhaps).',
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
    whatItDoes: '不可能……（强烈否定推测）', whatItDoesEn: 'No way... / Impossible (strong negative speculation)',
    whatItDoesBody: '强烈否定某种可能性："那怎么可能"、"不可能"。\n和 -을 리가 있어요? （疑问反问）是一对，都表达"完全不信"的语气。\n对话里常回应对方的假设，表达"不至于/绝不可能"。', whatItDoesBodyEn: 'Strongly denies a possibility: "how could that be" / "impossible."\\nPairs with -을 리가 있어요? (rhetorical question); both convey total disbelief.\\nOften used in conversation to respond to someone\'s assumption, meaning "no way / absolutely not."',
    structureNote: '结构：动词/形容词词干（无收音+ㄹ；有收音+을）+ 리가 없다。\n리 = 道理/理由（依存名词），"没有这个道理" → "不可能"。\n过去推测用 -았/었을 리가 없다。', structureNoteEn: 'Structure: verb/adjective stem (no batchim + ㄹ; with batchim + 을) + 리가 없다.\\n리 = reason/logic (dependent noun), "no such logic" → "impossible."\\nPast speculation uses -았/었을 리가 없다.',
    rulesNote: '和 -지 않을 것이다（不会）差别：\n· -을 리가 없다：语气强烈，几乎断言"绝不可能"\n· 지 않을 것이다：普通否定推测，"应该不会"\n\n口语常用 -을 리가 있어요?（反问：怎么可能？），意思等同 -을 리가 없다。', rulesNoteEn: 'Difference from -지 않을 것이다 (won\'t):\\n· -을 리가 없다: strong, almost asserting "absolutely impossible"\\n· -지 않을 것이다: ordinary negative speculation, "probably won\'t"\\n\\nIn speech, -을 리가 있어요? (rhetorical: how could it?) is common and means the same as -을 리가 없다.',
    structures: [
      {
        ko: '그 사람이 거짓말을 할 리가 없어요',
        zh: '那个人不可能说谎。', zhEn: 'That person can\'t be lying.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '거짓말을', role: 'object' },
          { text: '할 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨가 벌써 갔을 리가 없어요',
        zh: '敏秀不可能已经走了。', zhEn: 'Min-su can\'t have already left.',
        tokens: [
          { text: '민수 씨가', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '이 문제가 어려울 리가 없어요',
        zh: '这道题不可能难。', zhEn: 'This problem can\'t be hard.',
        tokens: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울 리가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '그게 사실일 리가 있어요?',
        zh: '那怎么可能是真的？', zhEn: 'How could that possibly be true?',
        tokens: [
          { text: '그게', role: 'subject' },
          { text: '사실일 리가 있어요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ 리가 없다', textEn: 'Stem without final consonant + ㄹ 리가 없다', examples: '가다→갈 리가 없다 / 하다→할 리가 없다' },
      { type: 'rule', text: '有收音词干 + 을 리가 없다', textEn: 'Stem with final consonant + 을 리가 없다', examples: '먹다→먹을 리가 없다 / 잊다→잊을 리가 없다' },
      { type: 'rule', text: '过去推测 → -았/었을 리가 없다', textEn: 'Past speculation → -았/었을 리가 없다', examples: '갔을 리가 없다 / 잊었을 리가 없다' },
      { type: 'rule', text: '名词 + 일 리가 없다', textEn: 'Noun + 일 리가 없다', examples: '학생일 리가 없다 / 사실일 리가 없다' },
      { type: 'usage', text: '强烈否定推测，语气比 안 -을 것이다 更强', textEn: 'Strongly negates speculation, stronger in tone than 안 -을 것이다', examples: '거짓말을 할 리가 없어요（绝不可能说谎）', examplesEn: '거짓말을 할 리가 없어요 (absolutely can\'t be lying)' },
      { type: 'usage', text: '反问形 -을 리가 있어요? 意思等同 -을 리가 없어요', textEn: 'Rhetorical form -을 리가 있어요? has the same meaning as -을 리가 없어요', examples: '그게 사실일 리가 있어요?（那怎么可能是真的？）', examplesEn: '그게 사실일 리가 있어요? (How could that possibly be true?)' },
      { type: 'compare', text: '和 -을지도 모르다 完全相反：一个断言不可能，一个说说不定', textEn: 'Completely opposite of -을지도 모르다: one asserts impossibility, the other says \'maybe\'', examples: '갈 리가 없어요（不可能去）↔ 갈지도 몰라요（说不定去）', examplesEn: '갈 리가 없어요 (can\'t possibly go) ↔ 갈지도 몰라요 (might go)' },
      { type: 'note', text: '中文"不可能"有两义，别混：-을 리가 없다 是"按道理断定不会（推测）"；能力上"做不到"要用 못 하다 / -을 수 없다', textEn: 'Chinese \'impossible\' has two meanings, don\'t mix them: -을 리가 없다 means \'logically conclude it won\'t happen (inference)\'; for \'can\'t do\' due to ability, use 못 하다 / -을 수 없다', examples: '그가 거짓말할 리가 없어요（断定不会）↔ 저는 그거 못 해요（我做不到）', examplesEn: '그가 거짓말할 리가 없어요 (certain he won\'t) ↔ 저는 그거 못 해요 (I can\'t do it)' },
      { type: 'note', text: '独立成句回应对方说法是高频用法：그럴 리가 없어요 / 그럴 리가!，相当于"不至于吧/怎么可能"', textEn: 'Using it standalone to respond to someone\'s claim is a high-frequency usage: 그럴 리가 없어요 / 그럴 리!, meaning \'no way / how could that be\'', examples: '— 민수가 시험에 떨어졌대. — 그럴 리가 없어요!' },
      { type: 'example', text: '그럴 리가 없어요 / 몰랐을 리가 없어요 / 사실일 리가 있어요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '거짓말을', role: 'object' },
          { text: '할 리가 없어요', role: 'verb' },
        ],
        zh: '那个人不可能说谎。', zhEn: 'That person can\'t be lying.',
        swapWords: ['거짓말을', '실수를', '그런 말을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '민수 씨가', role: 'subject' },
          { text: '벌써', role: 'time' },
          { text: '갔을 리가 없어요', role: 'verb' },
        ],
        zh: '敏秀不可能已经走了。', zhEn: 'Min-su can\'t have already left.',
        swapWords: ['갔을 리가 없어요', '왔을 리가 없어요', '떠났을 리가 없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려울 리가 없어요', role: 'verb' },
        ],
        zh: '这道题不可能难。', zhEn: 'This problem can\'t be hard.',
        swapWords: ['어려울 리가 없어요', '쉬울 리가 없어요', '이상할 리가 없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그게', role: 'subject' },
          { text: '사실일 리가 있어요?', role: 'verb' },
        ],
        zh: '那怎么可能是真的？', zhEn: 'How could that possibly be true?',
        swapWords: ['사실일 리가 있어요?', '진짜일 리가 있어요?', '정답일 리가 있어요?'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🤔', context: '不信谎言', contextEn: 'Disbelieving a lie', ko: '그 사람이 거짓말할 리가 없어요.', zh: '那个人不可能说谎。', zhEn: 'That person can\'t be lying.' },
      { icon: '⏰', context: '不信迟到', contextEn: 'Disbelieving lateness', ko: '민수 씨가 지각할 리가 없어요. 항상 일찍 오는 사람이에요.', zh: '敏秀不可能迟到，他总是早到。', zhEn: 'Min-su can\'t possibly be late; he\'s always early.' },
      { icon: '😤', context: '强烈质疑', contextEn: 'Strong doubt', ko: '그게 사실일 리가 있어요? 말도 안 돼요.', zh: '那怎么可能是真的？岂有此理。', zhEn: 'How could that possibly be true? That\'s absurd.' },
      { icon: '📞', context: '不接电话', contextEn: 'Not answering the phone', ko: '자기가 안 받았을 리가 없는데 이상하네요.', zh: '不可能是他没接，奇怪。', zhEn: 'It can\'t be that he didn\'t answer; that\'s strange.' },
      { icon: '💰', context: '价格质疑', contextEn: 'Questioning the price', ko: '이게 만 원일 리가 없어요. 너무 싸잖아요.', zh: '这不可能是一万韩元，也太便宜了吧。', zhEn: 'This can\'t possibly be 10,000 won; it\'s way too cheap.' },
      { icon: '📚', context: '不信不知', contextEn: 'Disbelieving ignorance', ko: '민수 씨가 그걸 모를 리가 없어요.', zh: '敏秀不可能不知道那个。', zhEn: 'Min-su can\'t possibly not know that.' },
    ],
    mistakes: [
      { wrong: '갈 리 없어요', correct: '갈 리가 없어요', note: '리 后面必须加主格助词 가：갈 리가 없어요。省略 가 不自然。', noteEn: '리 must be followed by the subject particle 가: 갈 리가 없어요. Omitting 가 sounds unnatural.' },
      { wrong: '먹ㄹ 리가 없어요', correct: '먹을 리가 없어요', note: '먹다 有收音 → 을 리가 없다。먹을 리가 없어요。', noteEn: '먹다 has a final consonant → 을 리가 없다. 먹을 리가 없어요.' },
      { wrong: '학생 리가 없어요', correct: '학생일 리가 없어요', note: '名词 + 이다 + 을 리가 없다 → 名词 + 일 리가 없다。', noteEn: 'Noun + 이다 + 을 리가 없다 → Noun + 일 리가 없다.' },
      { wrong: '어제 왔을 리가 있어요（想说确实来了）', wrongEn: '어제 왔을 리가 있어요 (meaning to say he really came)', correct: '어제 왔을 거예요 / 어제 왔어요', note: '-을 리가 있다 是反问句 "怎么可能"，意思其实是否定。想肯定用 -을 것이다 或直接过去时。', noteEn: '-을 리가 있다 is a rhetorical question \'how could it be\', actually meaning negation. For affirmation, use -을 것이다 or just past tense.' },
    ],
    quickTable: {
      title: '推测两极：说不定 vs 不可能', titleEn: 'Two Extremes of Speculation: Might vs. Impossible',
      body: '同样是推测语法，语气可以完全相反。', bodyEn: 'Same grammar for speculation, but the tone can be completely opposite.',
      headers: ['结构', '含义', '例句', '中文'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '说不定', zhEn: 'Maybe' }, { ko: '低确定性猜测', zh: '20%' }, { ko: '갈지도 몰라요', zh: '说不定会去', zhEn: 'Might go' }, '说不定他会去（可能）'],
        [{ ko: '-을 것 같다', zh: '好像/感觉', zhEn: 'seems/feels like' }, { ko: '中等推测', zh: '60%' }, { ko: '갈 것 같아요', zh: '好像会去', zhEn: 'Seems like (he/she) will go' }, '感觉他会去'],
        [{ ko: '-을 것이다', zh: '会/应该', zhEn: 'Will / should' }, { ko: '较肯定预期', zh: '80%' }, { ko: '갈 거예요', zh: '会去的', zhEn: '(He/She) will go' }, '他会去的'],
        [{ ko: '-을 리가 없다', zh: '不可能', zhEn: 'Impossible' }, { ko: '强烈否定', zh: '0%' }, { ko: '갈 리가 없어요', zh: '不可能去', zhEn: 'Can\'t possibly go' }, '他不可能去（绝不）'],
        [{ ko: '-을 리가 있다?', zh: '怎么可能', zhEn: 'How could that be' }, { ko: '反问=否定', zh: '0%' }, { ko: '갈 리가 있어요?', zh: '怎么可能去？', zhEn: 'How could (he/she) possibly go?' }, '他怎么可能去（不可能）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 리가 없다 用法练习', titleEn: '-을/ㄹ 리가 없다 Usage Practice',
      body: '根据语境选出正确表达。', bodyEn: 'Choose the correct expression based on the context.',
      questions: [
        {
          prompt: '"那个人不可能说谎" → 그 사람이 거짓말을 ___.', promptEn: '"That person can\'t possibly lie" → 그 사람이 거짓말을 ___.',
          options: ['할 리가 있어요', '할지도 몰라요', '할 리가 없어요', '할 것 같아요'],
          answer: 2,
          explanation: '"不可能" → -을 리가 없어요。하다 无收音 → 할 리가 없어요。', explanationEn: '"Impossible" → -을 리가 없어요. 하다 has no final consonant → 할 리가 없어요.',
        },
        {
          prompt: '"敏秀不可能已经走了" → 민수 씨가 벌써 ___.', promptEn: '"Minsu can\'t have already left" → 민수 씨가 벌써 ___.',
          options: ['갈 리가 없어요', '갔을 리가 없어요', '갈지도 몰라요', '갔을 것 같아요'],
          answer: 1,
          explanation: '"已经走了"是过去 → 过去推测的否定 -았/었을 리가 없다。갔을 리가 없어요。', explanationEn: '"Already left" is past → negative past speculation -았/었을 리가 없다. 갔을 리가 없어요.',
        },
        {
          prompt: '"那怎么可能是真的？" → 그게 ___?', promptEn: '"How could that possibly be true?" → 그게 ___?',
          options: ['사실일 리가 없어요', '사실인 것 같아요', '사실일 리가 있어요', '사실일지도 몰라요'],
          answer: 2,
          explanation: '反问形 -을 리가 있어요? 意思等同 -을 리가 없어요，表达强烈质疑。名词 + 일 리가 있어요?。', explanationEn: 'Rhetorical form -을 리가 있어요? means the same as -을 리가 없어요, expressing strong doubt. Noun + 일 리가 있어요?.',
        },
        {
          prompt: '关于 -을 리가 없다 和 -을지도 모르다 的区别，哪句最准确？', promptEn: 'Regarding the difference between -을 리가 없다 and -을지도 모르다, which statement is most accurate?',
          options: [
            '两者都表示低概率',
            '前者是断言不可能，后者是说不定可能',
            '前者用书面，后者用口语',
            '前者用于过去，后者用于未来',
          ],
          answer: 1,
          explanation: '两个语法方向完全相反。-을 리가 없다 = 强烈否定"不可能"；-을지도 모르다 = 猜测"说不定"。', explanationEn: 'The two grammar points are completely opposite in direction. -을 리가 없다 = strong negation "impossible"; -을지도 모르다 = speculation "maybe".',
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
    whatItDoes: '本来就会……（自然规律）', whatItDoesEn: 'It\'s only natural that... (natural law)',
    whatItDoesBody: '表达"某种情况自然而然会发生"的规律性判断。\n带有"这是天经地义"的语感，常用于陈述普遍真理、生活规律。\n-기 마련이다 和 -게 마련이다 意思完全相同，都可以用。', whatItDoesBodyEn: 'Expresses a judgment that something happens naturally and inevitably.\\nCarries the nuance of "it\'s only natural," often used for universal truths and life patterns.\\n-기 마련이다 and -게 마련이다 are identical in meaning; either can be used.',
    structureNote: '结构：动词/形容词词干 + 기 마련이다（或 -게 마련이다）。\n마련이다 直译"是准备好的" → 引申为"自然就是这样"。\n不看收音，直接接词干。', structureNoteEn: 'Structure: Verb/Adjective stem + 기 마련이다 (or -게 마련이다).\\n마련이다 literally means "is prepared" → extended to "it\'s naturally so."\\nAttach directly to the stem regardless of the final consonant.',
    rulesNote: '两个变体：\n1. -기 마련이다：TOPIK 高频，日常也用\n2. -게 마련이다：口语稍多，语感略更强\n意思完全一样，选哪个都对。\n\n配套用法：常和 누구나（谁都）、다들（大家）等词一起，加强普遍性。', rulesNoteEn: 'Two variants:\\n1. -기 마련이다: High-frequency in TOPIK, also used daily\\n2. -게 마련이다: Slightly more colloquial, with a stronger nuance\\nMeaning is identical; either is correct.\\n\\nCommon usage: Often paired with 누구나 (anyone), 다들 (everyone) to emphasize universality.',
    structures: [
      {
        ko: '사람은 누구나 실수하기 마련이에요',
        zh: '人嘛，谁都会犯错。', zhEn: 'Well, everyone makes mistakes.',
        tokens: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '나이가 들면 몸이 약해지기 마련이에요',
        zh: '上了年纪身体自然会变弱。', zhEn: 'As you get older, your body naturally weakens.',
        tokens: [
          { text: '나이가', role: 'subject' },
          { text: '들면', role: 'verb' },
          { text: '몸이', role: 'subject' },
          { text: '약해지기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '자주 만나면 정이 들게 마련이에요',
        zh: '经常见面自然就会有感情。', zhEn: 'Meeting often naturally leads to feelings.',
        tokens: [
          { text: '자주 만나면', role: 'verb' },
          { text: '정이', role: 'subject' },
          { text: '들게 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '노력하면 좋은 결과가 나오기 마련입니다',
        zh: '努力了自然会有好结果。', zhEn: 'If you work hard, good results naturally follow.',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '좋은 결과가', role: 'subject' },
          { text: '나오기 마련입니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 기 마련이다', textEn: 'Verb/adjective stem + 기 마련이다', examples: '실수하다→실수하기 마련이다 / 늙다→늙기 마련이다 / 힘들다→힘들기 마련이다' },
      { type: 'rule', text: '也可用 -게 마련이다，意思相同', textEn: '-게 마련이다 can also be used with the same meaning', examples: '실수하게 마련이다 / 늙게 마련이다 / 힘들게 마련이다' },
      { type: 'rule', text: '不看收音，直接接词干', textEn: 'Attach directly to the stem, regardless of the final consonant', examples: '所有动词、形容词都是同一接法', examplesEn: 'All verbs and adjectives follow the same conjugation' },
      { type: 'usage', text: '陈述自然规律或普遍真理，不用于个别偶然事件', textEn: 'States natural laws or universal truths; not used for individual or incidental events', examples: '사람은 실수하기 마련이에요（普遍）/ 오늘 지각하기 마련이에요 ✗（个别）', examplesEn: 'People are bound to make mistakes (universal) / I\'m bound to be late today ✗ (individual)' },
      { type: 'usage', text: '常和 누구나、다들、항상 等强调普遍性的词搭配', textEn: 'Often used with words like 누구나, 다들, 항상 that emphasize universality', examples: '누구나 실수하기 마련이에요 / 다들 힘들기 마련이에요' },
      { type: 'compare', text: '和 -는 법이다 差别：-기 마련이다 偏"自然规律"，-는 법이다 偏"社会道理"', textEn: 'Difference from -는 법이다: -기 마련이다 leans toward "natural laws," while -는 법이다 leans toward "social norms"', examples: '늙기 마련이에요（生理规律）/ 잘못하면 벌 받는 법이에요（道理规律）', examplesEn: 'People are bound to age (physiological law) / If you do wrong, you\'re bound to be punished (moral law)' },
      { type: 'compare', text: '别和 -게 되다 混：-기 마련이다 是"本来必然如此"的通则；-게 되다 是"（因某原因）变成这样"的结果变化', textEn: 'Don\'t confuse with -게 되다: -기 마련이다 is a general rule of "inherent inevitability"; -게 되다 is a result change of "becoming so (due to some reason)"', examples: '노력하면 성공하게 마련이에요（必然规律）/ 열심히 하다 보니 성공하게 됐어요（结果变化）', examplesEn: 'If you work hard, you\'re bound to succeed (inevitable law) / After working hard, I ended up succeeding (result change)' },
      { type: 'note', text: '主语必须是泛指（사람은 / 누구나），不能拿它讲某一个人的习惯。想说"我总迟到"用普通现在时，别套 마련이다', textEn: 'The subject must be generic (사람은 / 누구나); you can\'t use it for one person\'s habit. To say "I\'m always late," use the regular present tense, not 마련이다', examples: '누구나 실수하기 마련이에요 ○ / 저는 지각하기 마련이에요 ✗ → 저는 자주 지각해요' },
      { type: 'example', text: '누구나 실수하기 마련이에요 / 나이 들면 늙기 마련이에요 / 노력하면 성공하게 마련이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기 마련이에요', role: 'verb' },
        ],
        zh: '人嘛，谁都会犯错。', zhEn: 'Well, everyone makes mistakes.',
        swapWords: ['실수하기 마련이에요', '틀리기 마련이에요', '늙기 마련이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '나이가 들면', role: 'verb' },
          { text: '몸이', role: 'subject' },
          { text: '약해지기 마련이에요', role: 'verb' },
        ],
        zh: '上了年纪身体自然会变弱。', zhEn: 'As you get older, your body naturally weakens.',
        swapWords: ['약해지기 마련이에요', '아프기 마련이에요', '느려지기 마련이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '자주 만나면', role: 'verb' },
          { text: '정이', role: 'subject' },
          { text: '들게 마련이에요', role: 'verb' },
        ],
        zh: '经常见面自然就会有感情。', zhEn: 'Meeting often naturally leads to feelings.',
        swapWords: ['정이', '친밀감이', '애정이'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '좋은 결과가', role: 'subject' },
          { text: '나오기 마련이에요', role: 'verb' },
        ],
        zh: '努力了自然会有好结果。', zhEn: 'If you work hard, good results naturally follow.',
        swapWords: ['나오기 마련이에요', '있기 마련이에요', '따르기 마련이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '👴', context: '年老规律', contextEn: 'The law of aging', ko: '사람은 누구나 늙기 마련이에요.', zh: '人嘛谁都会老。', zhEn: 'Everyone gets old, it\'s just how it is.' },
      { icon: '❌', context: '犯错正常', contextEn: 'Making mistakes is normal', ko: '실수는 누구나 하기 마련이에요. 너무 자책하지 마세요.', zh: '谁都会犯错，别太自责。', zhEn: 'Everyone makes mistakes, don\'t be too hard on yourself.' },
      { icon: '💔', context: '感情自然', contextEn: 'Feelings come naturally', ko: '자주 보면 정이 들게 마련이에요.', zh: '经常见就会有感情。', zhEn: 'You grow attached when you see each other often.' },
      { icon: '🎯', context: '努力有报', contextEn: 'Effort pays off', ko: '노력하면 성공하기 마련이에요.', zh: '努力自然会成功。', zhEn: 'If you work hard, success will naturally follow.' },
      { icon: '🌱', context: '成长规律', contextEn: 'The law of growing up', ko: '아이들은 자라기 마련이에요.', zh: '孩子总会长大的。', zhEn: 'Kids are bound to grow up.' },
      { icon: '⏱️', context: '时间流逝', contextEn: 'The passage of time', ko: '시간이 지나면 잊혀지기 마련이에요.', zh: '时间过了自然会淡忘。', zhEn: 'As time passes, you\'ll naturally forget.' },
    ],
    mistakes: [
      { wrong: '오늘 지각하기 마련이에요', correct: '오늘 지각할 것 같아요 / 항상 지각하기 마련이에요', note: '-기 마련이다 陈述"普遍规律"，不能用于个别偶然事件。个别事件用 -을 것 같다。', noteEn: '-기 마련이다 states a "universal law" and can\'t be used for individual, incidental events. For individual events, use -을 것 같다.' },
      { wrong: '실수하는 마련이에요', correct: '실수하기 마련이에요', note: '必须用 -기 名词化形，不能用 -는 冠形。', noteEn: 'Must use the -기 nominalized form, not the -는 adnominal form.' },
      { wrong: '누구나 실수해 마련이에요', correct: '누구나 실수하기 마련이에요', note: '不能用 해요体 直接接 마련이에요。必须词干 + 기 마련이다。', noteEn: 'You can\'t attach 마련이에요 directly to the 해요 form. It must be stem + 기 마련이다.' },
      { wrong: '내일 늙기 마련이에요', correct: '나이 들면 늙기 마련이에요', note: '-기 마련이다 陈述规律，前面通常是条件（-면）而不是特定时间点。', noteEn: '-기 마련이다 states a general rule; it\'s usually preceded by a condition (-면) rather than a specific point in time.' },
    ],
    quickTable: {
      title: '-기 마련이다 变形速查', titleEn: '-기 마련이다 Conjugation Quick Reference',
      body: '不看收音，所有词类同一接法。', bodyEn: 'Regardless of the final consonant, all word types take the same attachment.',
      headers: ['原形', '词类', '-기 마련이다', '中文'],
      rows: [
        ['실수하다', '动词', { ko: '실수하기 마련이다', zh: '自然会犯错', zhEn: 'Naturally make mistakes' }, '难免犯错'],
        ['늙다', '动词', { ko: '늙기 마련이다', zh: '自然会老', zhEn: 'Naturally age' }, '难免会老'],
        ['힘들다', '形容词', { ko: '힘들기 마련이다', zh: '自然会累', zhEn: 'Naturally get tired' }, '难免会累'],
        ['잊다', '动词', { ko: '잊기 마련이다', zh: '自然会忘', zhEn: 'Naturally forget' }, '难免会忘'],
        ['후회하다', '动词', { ko: '후회하기 마련이다', zh: '自然会后悔', zhEn: 'Naturally regret' }, '难免会后悔'],
        ['아프다', '形容词', { ko: '아프기 마련이다', zh: '自然会不适', zhEn: 'Naturally feel unwell' }, '难免会不适' ],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기 마련이다 用法练习', titleEn: '-기 마련이다 Usage Practice',
      body: '根据语境选出正确形态或语法搭配。', bodyEn: 'Choose the correct form or grammatical combination based on the context.',
      questions: [
        {
          prompt: '"人嘛谁都会犯错" → 사람은 누구나 ___.', promptEn: '"Everyone makes mistakes" → 사람은 누구나 ___.',
          options: ['실수하는 마련이에요', '실수하기 마련이에요', '실수해 마련이에요', '실수한 마련이에요'],
          answer: 1,
          explanation: '必须是词干 + 기 마련이다。실수하다 → 실수하기 마련이에요。', explanationEn: 'It must be stem + 기 마련이다. 실수하다 → 실수하기 마련이에요.',
        },
        {
          prompt: '"老了自然会痛" → 나이가 들면 ___ 마련이에요.', promptEn: '"When you get old, it naturally hurts" → 나이가 들면 ___ 마련이에요.',
          options: ['아프기', '아파', '아픈', '아프는'],
          answer: 0,
          explanation: '词干 + 기 마련이다。아프다 → 아프기 마련이다。', explanationEn: 'Stem + 기 마련이다. 아프다 → 아프기 마련이다.',
        },
        {
          prompt: '哪个句子最适合用 -기 마련이다？', promptEn: 'Which sentence best fits -기 마련이다?',
          options: [
            '오늘 시험에서 지각하기 마련이에요',
            '내일 비가 오기 마련이에요',
            '사람은 누구나 실수하기 마련이에요',
            '어제 회의가 있기 마련이었어요',
          ],
          answer: 2,
          explanation: '-기 마련이다 陈述普遍规律，最典型的场景是 사람은 누구나 + -기 마련이에요。其他选项都是个别事件。', explanationEn: '-기 마련이다 states a universal rule; the most typical pattern is 사람은 누구나 + -기 마련이에요. The other options are individual events.',
        },
        {
          prompt: '关于 -기 마련이다 和 -게 마련이다，哪句最准确？', promptEn: 'Regarding -기 마련이다 and -게 마련이다, which statement is most accurate?',
          options: [
            '前者是过去，后者是现在',
            '前者用于动词，后者用于形容词',
            '两者意思几乎相同，可以互换',
            '前者用于书面，后者只能用口语',
          ],
          answer: 2,
          explanation: '-기 마련이다 和 -게 마련이다 意思相同，都表达"自然会……"，可以互换使用。', explanationEn: '-기 마련이다 and -게 마련이다 have the same meaning, both expressing "naturally...", and can be used interchangeably.',
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
    whatItDoes: '十有八九会……（多为负面）', whatItDoesEn: 'Nine times out of ten... (usually negative)',
    whatItDoesBody: '表达"某种情况很容易发生"，通常指不好的结果。\n和 -기 마련이다 结构相似，但语气更强、更偏负面。\n常出现在警告、劝告、担忧的语境里。', whatItDoesBodyEn: 'Expresses that something is very likely to happen, usually a bad outcome.\\nSimilar in structure to -기 마련이다, but stronger and more negative.\\nOften appears in warnings, advice, and worry contexts.',
    structureNote: '结构：动词词干 + 기 십상이다。\n십상 是汉字词"十上"，"十次里有十次" → "十有八九"。\n多接动词，主要用于负面结果的高概率发生。', structureNoteEn: 'Structure: Verb stem + 기 십상이다.\\n십상 is a Sino-Korean word meaning "ten out of ten" → "nine times out of ten."\\nMostly attaches to verbs, used for high-probability negative outcomes.',
    rulesNote: '语感差别：\n· -기 마련이다：中性，指普遍规律\n· -기 십상이다：偏负面，指容易出错\n\n例：\n· 늙기 마련이다（会老）— 客观规律\n· 넘어지기 십상이다（容易摔倒）— 警告', rulesNoteEn: 'Nuance difference:\\n· -기 마련이다: Neutral, refers to universal patterns\\n· -기 십상이다: Negative, refers to easy mistakes\\n\\nExamples:\\n· 늙기 마련이다 (one gets old) — objective law\\n· 넘어지기 십상이다 (easy to trip) — warning',
    structures: [
      {
        ko: '길이 미끄러우니까 넘어지기 십상이에요',
        zh: '路很滑，很容易摔倒。', zhEn: 'The road is slippery, so it\'s easy to fall.',
        tokens: [
          { text: '길이', role: 'subject' },
          { text: '미끄러우니까', role: 'verb' },
          { text: '넘어지기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '급하게 먹으면 체하기 십상이에요',
        zh: '吃太急很容易吃坏肚子。', zhEn: 'Eating too fast easily upsets your stomach.',
        tokens: [
          { text: '급하게', role: 'plain' },
          { text: '먹으면', role: 'verb' },
          { text: '체하기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '준비 없이 여행하면 후회하기 십상이에요',
        zh: '没准备就旅行很容易后悔。', zhEn: 'Traveling without preparation easily leads to regret.',
        tokens: [
          { text: '준비 없이', role: 'plain' },
          { text: '여행하면', role: 'verb' },
          { text: '후회하기 십상이에요', role: 'verb' },
        ],
      },
      {
        ko: '이렇게 늦게 자면 지각하기 십상입니다',
        zh: '这么晚睡很容易迟到。', zhEn: 'Sleeping this late makes it easy to be late.',
        tokens: [
          { text: '이렇게 늦게', role: 'time' },
          { text: '자면', role: 'verb' },
          { text: '지각하기 십상입니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 기 십상이다', textEn: 'Verb stem + 기 십상이다', examples: '넘어지다→넘어지기 십상이다 / 체하다→체하기 십상이다' },
      { type: 'rule', text: '不看收音，直接接词干', textEn: 'Attach directly to the stem, regardless of the final consonant', examples: '所有动词接法一样', examplesEn: 'All verbs take the same attachment' },
      { type: 'usage', text: '主要用于负面结果的高概率发生，含警告/劝告语气', textEn: 'Mainly used for high-probability negative outcomes, with a warning/advisory tone', examples: '급하게 먹으면 체하기 십상이에요（劝告）', examplesEn: 'Eating too fast is likely to give you indigestion (advice)' },
      { type: 'usage', text: '前半句常是条件（-면、-으니까 等）', textEn: 'The first clause is often a condition (-면, -으니까, etc.)', examples: '늦게 자면 지각하기 십상이에요 / 미끄러우니까 넘어지기 십상이에요' },
      { type: 'compare', text: '和 -기 마련이다 差别：中性规律 vs 负面警告', textEn: 'Difference from -기 마련이다: neutral pattern vs. negative warning', examples: '늙기 마련이에요（自然规律）/ 넘어지기 십상이에요（容易摔倒）', examplesEn: 'People are bound to age (natural pattern) / You\'re likely to fall (easy to trip)' },
      { type: 'compare', text: '别拿中文"容易"硬套成 -기 쉽다：쉽다 只是中性"容易做到"，십상이다 强调"负面结果十有八九会发生"且带警告语气', textEn: 'Don\'t force Chinese \'easy\' onto -기 쉽다: 쉽다 is just neutral \'easy to do,\' while 십상이다 emphasizes \'negative outcome will almost certainly happen\' with a warning tone', examples: '실수하기 쉬워요（中性：容易出错）/ 실수하기 십상이에요（警告：一不小心准出错）', examplesEn: 'Easy to make mistakes (neutral) / Bound to make mistakes if you\'re not careful (warning)' },
      { type: 'note', text: '不接形容词，只接动词', textEn: 'Only takes verbs, not adjectives', examples: '피곤하기 십상이에요 ✗ → 피곤해지기 십상이에요 ✓' },
      { type: 'example', text: '넘어지기 십상이에요 / 체하기 십상이에요 / 후회하기 십상이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '길이', role: 'subject' },
          { text: '미끄러우니까', role: 'verb' },
          { text: '넘어지기 십상이에요', role: 'verb' },
        ],
        zh: '路很滑，很容易摔倒。', zhEn: 'The road is slippery, so it\'s easy to fall.',
        swapWords: ['넘어지기 십상이에요', '미끄러지기 십상이에요', '다치기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '급하게', role: 'plain' },
          { text: '먹으면', role: 'verb' },
          { text: '체하기 십상이에요', role: 'verb' },
        ],
        zh: '吃太急很容易吃坏肚子。', zhEn: 'Eating too fast easily upsets your stomach.',
        swapWords: ['체하기 십상이에요', '탈나기 십상이에요', '배탈나기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '준비 없이', role: 'plain' },
          { text: '여행하면', role: 'verb' },
          { text: '후회하기 십상이에요', role: 'verb' },
        ],
        zh: '没准备就旅行很容易后悔。', zhEn: 'Traveling without preparation easily leads to regret.',
        swapWords: ['후회하기 십상이에요', '고생하기 십상이에요', '실수하기 십상이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '늦게', role: 'time' },
          { text: '자면', role: 'verb' },
          { text: '지각하기 십상이에요', role: 'verb' },
        ],
        zh: '睡晚了很容易迟到。', zhEn: 'If you sleep late, you\'ll easily be late.',
        swapWords: ['지각하기 십상이에요', '피곤해지기 십상이에요', '늦잠자기 십상이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⚠️', context: '路面警告', contextEn: 'Road warning', ko: '눈길에서 뛰면 넘어지기 십상이에요.', zh: '雪地里跑很容易摔倒。', zhEn: 'Running in the snow is likely to make you slip.' },
      { icon: '🍽️', context: '吃饭警告', contextEn: 'Eating warning', ko: '급하게 먹으면 체하기 십상이에요.', zh: '吃太急很容易吃坏肚子。', zhEn: 'Eating too fast easily upsets your stomach.' },
      { icon: '💤', context: '睡眠劝告', contextEn: 'Sleep advice', ko: '늦게 자면 다음 날 지각하기 십상이에요.', zh: '睡晚了第二天很容易迟到。', zhEn: 'If you sleep late, you\'ll easily be late the next day.' },
      { icon: '💸', context: '花钱警告', contextEn: 'Spending warning', ko: '충동적으로 쇼핑하면 후회하기 십상이에요.', zh: '冲动购物很容易后悔。', zhEn: 'Impulse buying is likely to lead to regret.' },
      { icon: '📱', context: '手机上瘾', contextEn: 'Phone addiction', ko: '스마트폰만 보면 눈이 피곤해지기 십상이에요.', zh: '一直看手机眼睛很容易累。', zhEn: 'Staring at your phone all the time will easily tire your eyes.' },
      { icon: '🚫', context: '规则违反', contextEn: 'Rule violation', ko: '규칙을 무시하면 사고 나기 십상이에요.', zh: '无视规则很容易出事。', zhEn: 'Ignoring the rules is likely to cause trouble.' },
    ],
    mistakes: [
      { wrong: '실수하는 십상이에요', correct: '실수하기 십상이에요', note: '必须用 -기 名词化，不能用 -는 冠形。', noteEn: 'Must use -기 nominalization, not the -는 adnominal form.' },
      { wrong: '피곤하기 십상이에요', correct: '피곤해지기 십상이에요', note: '-기 십상이다 只接动词。形容词要通过 -아/어지다 变成动词。', noteEn: '-기 십상이다 only takes verbs. Adjectives must become verbs via -아/어지다.' },
      { wrong: '늙기 십상이에요', correct: '늙기 마련이에요', note: '늙다 是自然规律不是"容易出错"。中性规律用 -기 마련이다。', noteEn: '늙다 is a natural pattern, not \'easy to make mistakes.\' Use -기 마련이다 for neutral patterns.' },
      { wrong: '노력하면 성공하기 십상이에요', correct: '노력하면 성공하기 마련이에요', note: '십상이다 用于负面结果。正面结果用 -기 마련이다。', noteEn: '십상이다 is for negative outcomes. Use -기 마련이다 for positive ones.' },
    ],
    quickTable: {
      title: '-기 마련이다 vs -기 십상이다',
      body: '两个语法结构相似，但语气正负不同。', bodyEn: 'The two structures are similar, but their tones differ in positivity/negativity.',
      headers: ['结构', '语气', '内容', '例句'],
      rows: [
        [{ ko: '-기 마련이다', zh: '中性', zhEn: 'Neutral' }, { ko: '自然规律', zh: '天经地义', zhEn: 'perfectly natural' }, { ko: '生理/自然/普遍', zh: '늙기 마련' }, { ko: '사람은 늙기 마련이에요', zh: '人自然会老', zhEn: 'People naturally age.' }],
        [{ ko: '-기 십상이다', zh: '偏负面', zhEn: 'somewhat negative' }, { ko: '警告/担忧', zh: '容易出错', zhEn: 'prone to mistakes' }, { ko: '不好的高概率', zh: '넘어지기 십상' }, { ko: '급하게 먹으면 체하기 십상이에요', zh: '吃急易积食', zhEn: 'Eating too fast easily causes indigestion.' }],
        [{ ko: '-는 법이다', zh: '中性', zhEn: 'Neutral' }, { ko: '道理规律', zh: '应然', zhEn: 'what should be' }, { ko: '社会/道德/习惯', zh: '벌 받는 법' }, { ko: '잘못하면 벌 받는 법이에요', zh: '犯错要受罚', zhEn: 'Mistakes must be punished.' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기 십상이다 用法练习', titleEn: '-기 십상이다 Usage Practice',
      body: '根据语境判断该用哪个语法。', bodyEn: 'Decide which grammar to use based on context.',
      questions: [
        {
          prompt: '"吃太急容易吃坏肚子" → 급하게 먹으면 ___.', promptEn: '"Eating too fast easily upsets your stomach" → 급하게 먹으면 ___.',
          options: ['체하는 십상이에요', '체하기 십상이에요', '체하는 마련이에요', '체하기 마련이에요'],
          answer: 1,
          explanation: '负面警告 → -기 십상이다。체하다 → 체하기 십상이에요。', explanationEn: 'Negative warning → -기 십상이다. 체하다 → 체하기 십상이에요.',
        },
        {
          prompt: '"人自然会老" → 사람은 ___.', promptEn: '"People naturally age" → 사람은 ___.',
          options: ['늙기 십상이에요', '늙기 마련이에요', '늙는 십상이에요', '늙어 십상이에요'],
          answer: 1,
          explanation: '늙다 是中性自然规律，不是"容易出错" → -기 마련이다。', explanationEn: '늙다 is a neutral natural law, not "prone to mistakes" → -기 마련이다.',
        },
        {
          prompt: '"没准备就旅行容易后悔" → 준비 없이 여행하면 ___.', promptEn: '"Traveling without preparation easily leads to regret" → 준비 없이 여행하면 ___.',
          options: ['후회하는 십상이에요', '후회하기 십상이에요', '후회할 리가 없어요', '후회하지 마세요'],
          answer: 1,
          explanation: '负面警告的高概率 → -기 십상이다。후회하다 → 후회하기 십상이에요。', explanationEn: 'High probability of a negative warning → -기 십상이다. 후회하다 → 후회하기 십상이에요.',
        },
        {
          prompt: '关于 -기 마련이다 和 -기 십상이다 的选择，哪句最准确？', promptEn: 'Regarding choosing between -기 마련이다 and -기 십상이다, which sentence is most accurate?',
          options: [
            '两者完全可以互换',
            '-기 마련이다 是中性规律；-기 십상이다 偏负面警告',
            '-기 마련이다 只用书面，-기 십상이다 只用口语',
            '-기 마련이다 只接动词，-기 십상이다 只接形容词',
          ],
          answer: 1,
          explanation: '-기 마련이다 陈述中性普遍规律；-기 십상이다 警告"容易发生不好的事"。语义不同不能任意互换。', explanationEn: '-기 마련이다 states a neutral universal law; -기 십상이다 warns "something bad easily happens." The meanings differ and cannot be freely swapped.',
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
    whatItDoes: '本来就……（道理规律）/ 从不……', whatItDoesEn: 'It\'s the way things are (principle/rule) / Never...',
    whatItDoesBody: '-는 법이다 表达"按道理/情理就是这样"的规律。\n-는 법이 없다 相反，表达"从来不这样"的固定否定。\n侧重"应然"或"惯例"，比 -기 마련이다 更偏道德/社会规律。', whatItDoesBodyEn: '-는 법이다 expresses a rule that things are so by logic or common sense.\\n-는 법이 없다 is the opposite, expressing a fixed negation of "never like this."\\nFocuses on "how it should be" or convention, more moral/social than -기 마련이다.',
    structureNote: '结构：\n· 动词词干 + 는 법이다（现在规律）\n· 形容词词干（无收音+ㄴ；有收音+은）+ 법이다\n· 名词 + 인 법이다\n否定：-는 법이 없다（从来不）', structureNoteEn: 'Structure:\\n· Verb stem + 는 법이다 (present rule)\\n· Adjective stem (no final consonant + ㄴ; with final consonant + 은) + 법이다\\n· Noun + 인 법이다\\nNegative: -는 법이 없다 (never)',
    rulesNote: '和 -기 마련이다 的选择：\n· -기 마련이다：偏自然/生理规律\n· -는 법이다：偏社会/道理规律\n· 两者意思接近、可互换的场景多，微妙差别只在"侧重生理"还是"侧重道理"。', rulesNoteEn: 'Choosing between -기 마련이다 and -는 법이다:\\n· -기 마련이다: Natural/physiological patterns\\n· -는 법이다: Social/logical rules\\n· They\'re often interchangeable; the subtle difference is "physiological" vs. "logical" emphasis.',
    structures: [
      {
        ko: '잘못하면 벌을 받는 법이에요',
        zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.',
        tokens: [
          { text: '잘못하면', role: 'verb' },
          { text: '벌을', role: 'object' },
          { text: '받는 법이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람은 절대 화를 내는 법이 없어요',
        zh: '那个人从不发火。', zhEn: 'That person never gets angry.',
        tokens: [
          { text: '그 사람은', role: 'subject' },
          { text: '절대', role: 'plain' },
          { text: '화를', role: 'object' },
          { text: '내는 법이 없어요', role: 'verb' },
        ],
      },
      {
        ko: '노력한 만큼 결과가 따르는 법입니다',
        zh: '努力多少，结果就跟多少。', zhEn: 'The results match how much effort you put in.',
        tokens: [
          { text: '노력한 만큼', role: 'plain' },
          { text: '결과가', role: 'subject' },
          { text: '따르는 법입니다', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 약속을 어기는 법이 없어요',
        zh: '敏秀从不违约。', zhEn: 'Min-su never breaks a promise.',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '약속을', role: 'object' },
          { text: '어기는 법이 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는 법이다', textEn: 'Verb stem + 는 법이다', examples: '받다→받는 법이다 / 하다→하는 법이다' },
      { type: 'rule', text: '形容词有收音 + 은 법이다 / 无收音 + ㄴ 법이다', textEn: 'Adjectives with final consonant + 은 법이다 / without + ㄴ 법이다', examples: '좋다→좋은 법이다 / 나쁘다→나쁜 법이다' },
      { type: 'rule', text: '否定：-는 법이 없다（从来不……）', textEn: 'Negative: -는 법이 없다 (never...)', examples: '화내는 법이 없다 / 웃는 법이 없다' },
      { type: 'rule', text: '名词 + 인 법이다', textEn: 'Noun + 인 법이다', examples: '사실인 법이다 / 규칙인 법이다' },
      { type: 'usage', text: '陈述道理/惯例/社会规律，偏"应然"', textEn: 'States a principle, custom, or social rule—focusing on how things should be.', examples: '잘못하면 벌 받는 법이에요（道理）/ 성실하면 성공하는 법이에요（惯例）', examplesEn: 'If you do wrong, you get punished (principle) / If you\'re diligent, you succeed (custom)' },
      { type: 'compare', text: '和 -기 마련이다 差别：道理规律 vs 自然规律', textEn: 'Difference from -기 마련이다: principle/social rule vs. natural law', examples: '벌 받는 법이에요（社会道理）/ 늙기 마련이에요（生理规律）', examplesEn: 'You get punished (social rule) / You get old (natural law)' },
      { type: 'note', text: '别把这里的 법 当成"方法"！你先学过 법 = 方法（做法 하는 법），但 -는 법이다 里的 법是"道理、规律"。所以 어기는 법이 없어요 不是"没有违约的方法"，而是"从不违约"', textEn: 'Don\'t mistake 법 here for \'method\'! You learned 법 = method (as in 하는 법), but in -는 법이다, 법 means \'principle\' or \'rule.\' So 어기는 법이 없어요 isn\'t \'no way to break a promise\' but \'never breaks a promise.\'', examples: '한국어 하는 법（方法：怎么说韩语）/ 약속을 어기는 법이 없어요（规律：他从不违约）', examplesEn: 'How to speak Korean (method) / He never breaks promises (rule)' },
      { type: 'example', text: '벌 받는 법이에요 / 웃는 법이 없어요 / 좋은 사람은 좋은 결과가 따르는 법이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '잘못하면', role: 'verb' },
          { text: '벌을', role: 'object' },
          { text: '받는 법이에요', role: 'verb' },
        ],
        zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.',
        swapWords: ['받는 법이에요', '치르는 법이에요', '지는 법이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '화를', role: 'object' },
          { text: '내는 법이 없어요', role: 'verb' },
        ],
        zh: '那个人从不发火。', zhEn: 'That person never gets angry.',
        swapWords: ['화를', '짜증을', '큰소리를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '노력한 만큼', role: 'plain' },
          { text: '결과가', role: 'subject' },
          { text: '따르는 법입니다', role: 'verb' },
        ],
        zh: '努力多少，结果就跟多少。', zhEn: 'The results match how much effort you put in.',
        swapWords: ['따르는 법입니다', '나오는 법입니다', '보상되는 법입니다'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '약속을', role: 'object' },
          { text: '어기는 법이 없어요', role: 'verb' },
        ],
        zh: '敏秀从不违约。', zhEn: 'Min-su never breaks a promise.',
        swapWords: ['어기는 법이 없어요', '늦는 법이 없어요', '까먹는 법이 없어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⚖️', context: '道理规律', contextEn: 'principle/rule', ko: '잘못하면 벌을 받는 법이에요.', zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.' },
      { icon: '😇', context: '性情温和', contextEn: 'Gentle-natured', ko: '그 사람은 화내는 법이 없어요.', zh: '那个人从不发火。', zhEn: 'That person never gets angry.' },
      { icon: '💪', context: '努力有报', contextEn: 'Effort pays off', ko: '성실하면 성공하는 법이에요.', zh: '踏实做事自然会成功。', zhEn: 'If you work steadily, success comes naturally.' },
      { icon: '⏰', context: '守时', contextEn: 'Punctual', ko: '민수 씨는 지각하는 법이 없어요.', zh: '敏秀从不迟到。', zhEn: 'Min-su is never late.' },
      { icon: '💔', context: '感情规律', contextEn: 'Rule of emotions', ko: '만나면 헤어지는 법이에요.', zh: '有相遇就有别离。', zhEn: 'Where there\'s meeting, there\'s parting.' },
      { icon: '🎁', context: '善有善报', contextEn: 'Good deeds bring good rewards', ko: '착한 사람은 복 받는 법이에요.', zh: '善良的人自会得福。', zhEn: 'Kind people naturally receive blessings.' },
    ],
    mistakes: [
      { wrong: '벌 받기 법이에요', correct: '벌 받는 법이에요', note: '动词必须用 -는 冠形接 법이다，不用 -기。', noteEn: 'Verbs must use the -는 adnominal form with 법이다, not -기.' },
      { wrong: '화 내지 않는 법이 있어요（想表达从不发火）', wrongEn: '화 내지 않는 법이 있어요 (trying to say \'never gets angry\')', correct: '화 내는 법이 없어요', note: '"从不……"固定用 -는 법이 없다，不用双重否定。', noteEn: 'For \'never...\' always use -는 법이 없다, not double negatives.' },
      { wrong: '늙는 법이에요', correct: '늙기 마련이에요', note: '生理/自然规律优先 -기 마련이다；-는 법이다 偏道理/社会规律。', noteEn: 'For physical/natural laws, prefer -기 마련이다; -는 법이다 leans toward principles/social rules.' },
      { wrong: '학생 법이에요', correct: '학생인 법이에요', note: '名词 + 인 법이다。', noteEn: 'Noun + 인 법이다.' },
    ],
    quickTable: {
      title: '"自然会/规律"三大表达对照', titleEn: 'Three Expressions for "Naturally/As a Rule" Compared',
      body: '选择合适的语法最能显示韩语功底。', bodyEn: 'Choosing the right grammar really shows off your Korean skills.',
      headers: ['结构', '侧重', '语气', '例句'],
      rows: [
        [{ ko: '-기 마련이다', zh: '自然规律', zhEn: 'natural law' }, { ko: '生理/自然', zh: '中性', zhEn: 'Neutral' }, { ko: '늙기 마련', zh: '会老', zhEn: 'Ages' }, { ko: '누구나 늙기 마련이에요', zh: '人自然会老', zhEn: 'People naturally age.' }],
        [{ ko: '-기 십상이다', zh: '否定的高概率', zhEn: 'High probability of negation' }, { ko: '不好的容易发生', zh: '警告', zhEn: 'Warning' }, { ko: '넘어지기 십상', zh: '容易摔', zhEn: 'Easy to fall' }, { ko: '급하면 넘어지기 십상이에요', zh: '急了容易摔', zhEn: 'Easy to fall when in a hurry' }],
        [{ ko: '-는 법이다', zh: '道理/事理', zhEn: 'Reason/logic' }, { ko: '社会/道理', zh: '中性偏严', zhEn: 'Neutral, slightly strict' }, { ko: '벌 받는 법', zh: '应受罚', zhEn: 'Deserves punishment' }, { ko: '잘못하면 벌 받는 법이에요', zh: '错了自然受罚', zhEn: 'Naturally punished when wrong' }],
        [{ ko: '-는 법이 없다', zh: '否定固定', zhEn: 'Fixed negation' }, { ko: '从不……', zh: '习惯性', zhEn: 'Habitual' }, { ko: '화내는 법이 없다', zh: '从不发火', zhEn: 'Never gets angry' }, { ko: '민수 씨는 화내는 법이 없어요', zh: '敏秀从不发火', zhEn: 'Minsu never gets angry' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는 법이다 / -는 법이 없다 用法练习', titleEn: '-는 법이다 / -는 법이 없다 Usage Practice',
      body: '根据语境选出正确表达。', bodyEn: 'Choose the correct expression based on the context.',
      questions: [
        {
          prompt: '"做错了自然要受罚"（道理规律）→ 잘못하면 ___.', promptEn: '"If you do wrong, you naturally get punished" (logical rule) → 잘못하면 ___.',
          options: ['벌 받기 법이에요', '벌 받는 법이에요', '벌 받기 마련이에요', '벌 받는 법이 없어요'],
          answer: 1,
          explanation: '道理/社会规律 → -는 법이다。받다 → 받는 법이에요。', explanationEn: 'Logical/social rule → -는 법이다. 받다 → 받는 법이에요.',
        },
        {
          prompt: '"那个人从不发火" → 그 사람은 ___.', promptEn: '"That person never gets angry" → 그 사람은 ___.',
          options: ['화내는 법이에요', '화내는 법이 없어요', '화내지 않는 법이에요', '화내기 마련이에요'],
          answer: 1,
          explanation: '"从不……"固定用 -는 법이 없다。내다 → 내는 법이 없어요。', explanationEn: '"Never..." uses the fixed form -는 법이 없다. 내다 → 내는 법이 없어요.',
        },
        {
          prompt: '"人自然会老" 用什么最合适？', promptEn: 'What\'s the most appropriate for "People naturally age"?',
          options: [
            '사람은 늙는 법이에요',
            '사람은 늙기 십상이에요',
            '사람은 늙기 마련이에요',
            '사람은 늙는 법이 없어요',
          ],
          answer: 2,
          explanation: '生理/自然规律优先 -기 마련이다。-는 법이다 更偏道理，-기 십상이다 是负面警告。', explanationEn: 'Physiological/natural rules take priority with -기 마련이다. -는 법이다 leans more toward logic, and -기 십상이다 is a negative warning.',
        },
        {
          prompt: '关于 -는 법이다 / -는 법이 없다，哪句最准确？', promptEn: 'Regarding -는 법이다 / -는 법이 없다, which statement is most accurate?',
          options: [
            '-는 법이 없다 是"没有规律"的意思',
            '-는 법이 없다 表达"从来不……"',
            '两个结构意思完全一样',
            '-는 법이 없다 用于将来推测',
          ],
          answer: 1,
          explanation: '-는 법이 없다 是固定表达，意思是"从不……"，描述某人固定的行为习惯。', explanationEn: '-는 법이 없다 is a fixed expression meaning "never...", describing someone\'s habitual behavior.',
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
    compareLabel: '规律三兄弟对比', compareLabelEn: 'Comparing the Three Rule Brothers',
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
    whatItDoes: '显然是……（心里有数）', whatItDoesEn: 'Obviously... (you know it)',
    whatItDoesBody: '表达"根据情况判断，事情显然会是这样"的强推测。\n뻔하다 就是"明摆着、显而易见"的意思。\n带主观判断色彩，说话人对结论很有把握。', whatItDoesBodyEn: 'Expresses a strong guess that something is obviously the case based on the situation.\\n뻔하다 means "plain to see, obvious."\\nCarries subjective judgment; the speaker is very confident in the conclusion.',
    structureNote: '结构：\n· 动词 + 는 게 뻔하다（现在/将来）\n· 动词 + 은/ㄴ 게 뻔하다（过去）\n· 形容词 + 은/ㄴ 게 뻔하다\n· 名词 + 인 게 뻔하다\n\n뻔하다 本身是形容词"显而易见"。', structureNoteEn: 'Structure:\\n· Verb + 는 게 뻔하다 (present/future)\\n· Verb + 은/ㄴ 게 뻔하다 (past)\\n· Adjective + 은/ㄴ 게 뻔하다\\n· Noun + 인 게 뻔하다\\n\\n뻔하다 itself is an adjective meaning "obvious."',
    rulesNote: '和 -을 리가 없다 相反：\n· -을 리가 없다 = 断言"不可能"\n· -는 게 뻔하다 = 断言"显然会"\n\n和 -을 게 틀림없다（下一课）差别微妙：\n· -는 게 뻔하다 = 从眼前情况推断\n· -을 게 틀림없다 = 从证据/规律推断', rulesNoteEn: 'Opposite of -을 리가 없다:\\n· -을 리가 없다 = asserts "impossible"\\n· -는 게 뻔하다 = asserts "obviously will"\\n\\nSubtle difference from -을 게 틀림없다 (next lesson):\\n· -는 게 뻔하다 = inferred from the immediate situation\\n· -을 게 틀림없다 = inferred from evidence/rules',
    structures: [
      {
        ko: '민수 씨는 또 늦게 올 게 뻔해요',
        zh: '敏秀显然又会晚到。', zhEn: 'Min-su will obviously be late again.',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '또', role: 'plain' },
          { text: '늦게 올 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '저 표정 보니까 화가 난 게 뻔해요',
        zh: '看那表情，显然是生气了。', zhEn: 'Looking at that expression, he\'s clearly angry.',
        tokens: [
          { text: '저 표정 보니까', role: 'verb' },
          { text: '화가', role: 'subject' },
          { text: '난 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '이 문제 답을 안 보고 푸는 게 뻔해요',
        zh: '这题他显然是没看答案就做的。', zhEn: 'He obviously did this problem without looking at the answer.',
        tokens: [
          { text: '이 문제', role: 'object' },
          { text: '답을 안 보고', role: 'plain' },
          { text: '푸는 게 뻔해요', role: 'verb' },
        ],
      },
      {
        ko: '가격이 저렇게 싼 걸 보니까 짝퉁인 게 뻔해요',
        zh: '看价格那么便宜，显然是假货。', zhEn: 'Given how cheap the price is, it\'s obviously a fake.',
        tokens: [
          { text: '가격이 저렇게 싼 걸 보니까', role: 'verb' },
          { text: '짝퉁인 게 뻔해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在/将来 + 는 게 뻔하다', textEn: 'Verb present/future + 는 게 뻔하다', examples: '오다→오는 게 뻔하다 / 하다→하는 게 뻔하다' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 게 뻔하다', textEn: 'Verb past + 은/ㄴ 게 뻔하다', examples: '가다→간 게 뻔하다 / 먹다→먹은 게 뻔하다' },
      { type: 'rule', text: '动词将来 + 을/ㄹ 게 뻔하다', textEn: 'Verb future + 을/ㄹ 게 뻔하다', examples: '늦다→늦을 게 뻔하다 / 오다→올 게 뻔하다' },
      { type: 'rule', text: '形容词 + 은/ㄴ 게 뻔하다', textEn: 'Adjective + 은/ㄴ 게 뻔하다', examples: '어렵다→어려운 게 뻔하다 / 좋다→좋은 게 뻔하다' },
      { type: 'rule', text: '名词 + 인 게 뻔하다', textEn: 'Noun + 인 게 뻔하다', examples: '거짓말인 게 뻔하다 / 짝퉁인 게 뻔하다' },
      { type: 'usage', text: '根据眼前情况做强推测，带"心知肚明"的语感', textEn: 'Make a strong guess based on the situation at hand, with a sense of "knowing full well."', examples: '표정 보니까 화난 게 뻔해요（看表情就知道生气了）', examplesEn: '표정 보니까 화난 게 뻔해요 (You can tell from the expression that he\'s angry.)' },
      { type: 'compare', text: '和 -을 리가 없다 相反：断言"显然会" vs 断言"绝不可能"', textEn: 'Opposite of -을 리가 없다: asserting "obviously will" vs asserting "absolutely won\'t."', examples: '올 게 뻔해요（显然会来）↔ 올 리가 없어요（不可能来）', examplesEn: '올 게 뻔해요 (Obviously will come) ↔ 올 리가 없어요 (Can\'t possibly come)' },
      { type: 'compare', text: '最容易混：뻔하다 有两副面孔！有没有 게（=것이）意思完全相反。-을 뻔하다=差点儿…（结果没发生）；-을 게 뻔하다=显然会…（判断一定会）', textEn: 'Easiest to confuse: 뻔하다 has two faces! With or without 게 (=것이), the meaning is completely opposite. -을 뻔하다 = almost... (didn\'t happen); -을 게 뻔하다 = obviously will... (certain judgment)', examples: '늦을 뻔했어요（差点儿迟到，其实没迟）/ 늦을 게 뻔해요（显然会迟到）', examplesEn: '늦을 뻔했어요 (Almost late, but wasn\'t) / 늦을 게 뻔해요 (Obviously will be late)' },
      { type: 'example', text: '늦을 게 뻔해요 / 화난 게 뻔해요 / 짝퉁인 게 뻔해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '또', role: 'plain' },
          { text: '늦게 올 게 뻔해요', role: 'verb' },
        ],
        zh: '敏秀显然又会晚到。', zhEn: 'Min-su will obviously be late again.',
        swapWords: ['늦게 올 게 뻔해요', '지각할 게 뻔해요', '못 올 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저 표정 보니까', role: 'verb' },
          { text: '화가', role: 'subject' },
          { text: '난 게 뻔해요', role: 'verb' },
        ],
        zh: '看那表情，显然是生气了。', zhEn: 'Looking at that expression, he\'s clearly angry.',
        swapWords: ['화가 난 게 뻔해요', '기분 나쁜 게 뻔해요', '삐친 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제', role: 'object' },
          { text: '답을 안 보고', role: 'plain' },
          { text: '푸는 게 뻔해요', role: 'verb' },
        ],
        zh: '这题他显然是没看答案就做的。', zhEn: 'He obviously did this problem without looking at the answer.',
        swapWords: ['푸는 게 뻔해요', '베끼는 게 뻔해요', '외운 게 뻔해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가격이 저렇게 싼 걸 보니까', role: 'verb' },
          { text: '짝퉁인 게 뻔해요', role: 'verb' },
        ],
        zh: '看价格那么便宜，显然是假货。', zhEn: 'Given how cheap the price is, it\'s obviously a fake.',
        swapWords: ['짝퉁인 게 뻔해요', '가짜인 게 뻔해요', '불량품인 게 뻔해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '朋友总是迟到', contextEn: 'A friend who\'s always late', ko: '민수 씨는 오늘도 늦을 게 뻔해요.', zh: '敏秀今天显然又会晚到。', zhEn: 'Min-su will obviously be late again today.' },
      { icon: '😠', context: '看出生气', contextEn: 'Seeing the anger', ko: '저 표정, 화난 게 뻔해요.', zh: '那表情，显然是生气了。', zhEn: 'That expression clearly shows he\'s angry.' },
      { icon: '🎭', context: '识破谎言', contextEn: 'Seeing through a lie', ko: '거짓말인 게 뻔한데 자꾸 우기네요.', zh: '明显是撒谎还一个劲儿嘴硬。', zhEn: 'He\'s obviously lying but keeps insisting stubbornly.' },
      { icon: '💸', context: '假货识别', contextEn: 'Spotting a fake', ko: '이 가방, 짝퉁인 게 뻔해요.', zh: '这个包，显然是假货。', zhEn: 'This bag is obviously a fake.' },
      { icon: '📝', context: '预判失败', contextEn: 'Failed prediction', ko: '준비 안 하고 갔으니까 떨어진 게 뻔해요.', zh: '没准备就去了，显然是落选了。', zhEn: 'I went without preparing, so obviously I failed.' },
      { icon: '🎯', context: '推断真相', contextEn: 'Inferring the truth', ko: '핑계인 게 뻔해요. 진짜 이유가 뭐예요?', zh: '显然是借口。真的原因是什么？', zhEn: 'That\'s obviously an excuse. What\'s the real reason?' },
    ],
    mistakes: [
      { wrong: '늦기 뻔해요', correct: '늦을 게 뻔해요', note: '必须是 冠形 + 게 뻔하다，不能用 -기 뻔하다。', noteEn: 'It must be adnominal + 게 뻔하다, not -기 뻔하다.' },
      { wrong: '가는 게 뻔해요（想说过去去了）', wrongEn: '가는 게 뻔해요 (meaning \'went in the past\')', correct: '간 게 뻔해요', note: '过去动作用过去冠形 -은/ㄴ。간 게 뻔해요。', noteEn: 'For past actions, use the past adnominal -은/ㄴ. 간 게 뻔해요.' },
      { wrong: '짝퉁 뻔해요', correct: '짝퉁인 게 뻔해요', note: '名词 + 인 게 뻔하다。짝퉁 + 인 게 뻔해요。', noteEn: 'Noun + 인 게 뻔하다. 짝퉁 + 인 게 뻔해요.' },
      { wrong: '어렵는 게 뻔해요', correct: '어려운 게 뻔해요', note: '形容词用 -은/ㄴ 冠形。어렵다 → 어려운 게 뻔해요。', noteEn: 'For adjectives, use the -은/ㄴ adnominal. 어렵다 → 어려운 게 뻔해요.' },
    ],
    quickTable: {
      title: '-는/은/ㄴ/을 게 뻔하다 · 冠形选择', titleEn: '-는/은/ㄴ/을 게 뻔하다 · Determiner Selection',
      body: '按词性和时态选择正确冠形。', bodyEn: 'Choose the correct adnominal based on part of speech and tense.',
      headers: ['词性', '时态', '冠形', '例句'],
      rows: [
        [{ ko: '动词', zh: '现在', zhEn: 'Now' }, { ko: '-는', zh: '进行/习惯', zhEn: 'Progressive/Habitual' }, { ko: '오는 게 뻔하다', zh: '显然要来', zhEn: 'Obviously coming' }, { ko: '지금 오는 게 뻔해요', zh: '肯定正来着', zhEn: 'Definitely coming right now' }],
        [{ ko: '动词', zh: '过去', zhEn: 'Past' }, { ko: '-은/ㄴ', zh: '已完成', zhEn: 'Completed' }, { ko: '간 게 뻔하다', zh: '显然去了', zhEn: 'Obviously went' }, { ko: '벌써 간 게 뻔해요', zh: '肯定已经走了', zhEn: 'Definitely already left' }],
        [{ ko: '动词', zh: '将来', zhEn: 'Future' }, { ko: '-을/ㄹ', zh: '还未发生', zhEn: 'Not yet happened' }, { ko: '올 게 뻔하다', zh: '显然会来', zhEn: 'Obviously will come' }, { ko: '내일 올 게 뻔해요', zh: '明天肯定来', zhEn: 'Definitely coming tomorrow' }],
        [{ ko: '形容词', zh: '现在', zhEn: 'Now' }, { ko: '-은/ㄴ', zh: '状态', zhEn: 'State' }, { ko: '어려운 게 뻔하다', zh: '显然难', zhEn: 'Obviously difficult' }, { ko: '이 문제 어려운 게 뻔해요', zh: '这题肯定难', zhEn: 'This problem is definitely hard' }],
        [{ ko: '名词+이다', zh: '现在', zhEn: 'Now' }, { ko: '인', zh: '身份', zhEn: 'Identity' }, { ko: '거짓말인 게 뻔하다', zh: '显然是谎话', zhEn: 'Obviously a lie' }, { ko: '거짓말인 게 뻔해요', zh: '肯定是撒谎', zhEn: 'Definitely lying' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ/을 게 뻔하다 用法练习', titleEn: '-는/은/ㄴ/을 게 뻔하다 Usage Practice',
      body: '根据词性和时态选出正确冠形。', bodyEn: 'Choose the correct adnominal form based on part of speech and tense.',
      questions: [
        {
          prompt: '"敏秀今天显然又会晚到" → 민수 씨는 오늘도 ___.', promptEn: '"Min-su will obviously be late again today" → 민수 씨는 오늘도 ___.',
          options: ['늦는 게 뻔해요', '늦을 게 뻔해요', '늦은 게 뻔해요', '늦기 뻔해요'],
          answer: 1,
          explanation: '"还没发生的未来动作" → 未来冠形 -을/ㄹ。늦다 有收音 → 늦을 게 뻔해요。', explanationEn: '"Future action that hasn\'t happened yet" → Future adnominal -을/ㄹ. 늦다 has a final consonant → 늦을 게 뻔해요.',
        },
        {
          prompt: '"看表情显然是生气了" → 저 표정 보니까 ___.', promptEn: '"Judging by the expression, (he\'s) clearly angry" → 저 표정 보니까 ___.',
          options: ['화나는 게 뻔해요', '화날 게 뻔해요', '화난 게 뻔해요', '화나기 뻔해요'],
          answer: 2,
          explanation: '"生气"是已经完成的状态 → 过去冠形 -은/ㄴ。나다 → 난 게 뻔해요。', explanationEn: '"Angry" is a completed state → Past adnominal -은/ㄴ. 나다 → 난 게 뻔해요.',
        },
        {
          prompt: '"这个显然是假货" → 이거 ___.', promptEn: '"This is obviously a fake" → 이거 ___.',
          options: ['짝퉁 뻔해요', '짝퉁인 게 뻔해요', '짝퉁의 게 뻔해요', '짝퉁이는 게 뻔해요'],
          answer: 1,
          explanation: '名词 + 이다 + 은/ㄴ 冠形 → 名词 + 인 게 뻔하다。짝퉁인 게 뻔해요。', explanationEn: 'Noun + 이다 + 은/ㄴ adnominal → Noun + 인 게 뻔하다. 짝퉁인 게 뻔해요.',
        },
        {
          prompt: '关于 -는 게 뻔하다 和 -을 리가 없다，哪句最准确？', promptEn: 'Regarding -는 게 뻔하다 and -을 리가 없다, which statement is most accurate?',
          options: [
            '两者意思相同',
            '前者断言"显然会"，后者断言"不可能"，方向相反',
            '前者用未来，后者用过去',
            '前者只用动词，后者只用形容词',
          ],
          answer: 1,
          explanation: '-는 게 뻔하다 = 强肯定推测"显然是"；-을 리가 없다 = 强否定推测"不可能"。方向完全相反。', explanationEn: '-는 게 뻔하다 = strong positive speculation "obviously"; -을 리가 없다 = strong negative speculation "impossible". They\'re completely opposite in direction.',
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
    whatItDoes: '肯定会……（无疑）', whatItDoesEn: 'Definitely will... (no doubt)',
    whatItDoesBody: '表达"根据证据/规律，一定会……"的最高确定性推测。\n틀림없다 直译"没有错误"→"确信无疑"。\n和 -을 리가 없다 是同一光谱的两端：一个断言"肯定"，一个断言"不可能"。', whatItDoesBodyEn: 'Expresses the highest certainty of speculation, "based on evidence/rules, it must be..." \\n틀림없다 literally means "no mistake" → "without a doubt." \\nIt and -을 리가 없다 are two ends of the same spectrum: one asserts "certainly," the other "impossible."',
    structureNote: '结构：\n· 动词/形容词 + 을/ㄹ 게 틀림없다（未来推测）\n· 动词过去 + 은/ㄴ 게 틀림없다（过去推测）\n· 名词 + 인 게 틀림없다\n\n틀림없다 也可单独使用，等于 "그렇다"。', structureNoteEn: 'Structure: \\n· Verb/Adjective + 을/ㄹ 게 틀림없다 (future speculation) \\n· Verb past + 은/ㄴ 게 틀림없다 (past speculation) \\n· Noun + 인 게 틀림없다 \\n\\n틀림없다 can also be used alone, meaning "그렇다."',
    rulesNote: '推测确定性最高级：\n· -을지도 모르다（20%）\n· -을 것 같다（60%）\n· -을 것이다（80%）\n· -을 게 틀림없다（95%）— 这一课\n\n和 -는 게 뻔하다 意思接近但语感不同：\n· 뻔하다：主观判断"看着就知道"\n· 틀림없다：客观证据"根据规律"', rulesNoteEn: 'Highest level of speculative certainty: \\n· -을지도 모르다 (20%) \\n· -을 것 같다 (60%) \\n· -을 것이다 (80%) \\n· -을 게 틀림없다 (95%) — this lesson \\n\\nSimilar to -는 게 뻔하다 but different in nuance: \\n· 뻔하다: subjective judgment "obvious at a glance" \\n· 틀림없다: objective evidence "based on rules"',
    structures: [
      {
        ko: '이 시간에 오는 사람은 민수 씨일 게 틀림없어요',
        zh: '这个点来的人肯定是敏秀。', zhEn: 'The person coming at this hour is definitely Min-su.',
        tokens: [
          { text: '이 시간에', role: 'time' },
          { text: '오는 사람은', role: 'subject' },
          { text: '민수 씨일 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '노력하니까 성공할 게 틀림없어요',
        zh: '这么努力肯定会成功。', zhEn: 'Working this hard, (you\'ll) definitely succeed.',
        tokens: [
          { text: '노력하니까', role: 'verb' },
          { text: '성공할 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '전화를 안 받는 걸 보니 자고 있는 게 틀림없어요',
        zh: '不接电话，肯定是在睡觉。', zhEn: 'Not answering the phone, (he\'s) definitely sleeping.',
        tokens: [
          { text: '전화를 안 받는 걸 보니', role: 'verb' },
          { text: '자고 있는 게 틀림없어요', role: 'verb' },
        ],
      },
      {
        ko: '이 냄새는 김치찌개인 게 틀림없어요',
        zh: '这味道肯定是泡菜锅。', zhEn: 'This smell is definitely kimchi stew.',
        tokens: [
          { text: '이 냄새는', role: 'subject' },
          { text: '김치찌개인 게 틀림없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词无收音 + ㄹ 게 틀림없다', textEn: 'Verb/Adjective without final consonant + ㄹ 게 틀림없다', examples: '가다→갈 게 틀림없다 / 크다→클 게 틀림없다' },
      { type: 'rule', text: '动词/形容词有收音 + 을 게 틀림없다', textEn: 'Verb/Adjective with final consonant + 을 게 틀림없다', examples: '먹다→먹을 게 틀림없다 / 좋다→좋을 게 틀림없다' },
      { type: 'rule', text: '动词现在进行 + 는 게 틀림없다', textEn: 'Verb present progressive + 는 게 틀림없다', examples: '자는 게 틀림없다 / 하는 게 틀림없다' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 게 틀림없다', textEn: 'Verb past + 은/ㄴ 게 틀림없다', examples: '간 게 틀림없다 / 먹은 게 틀림없다' },
      { type: 'rule', text: '名词 + 인 게 틀림없다', textEn: 'Noun + 인 게 틀림없다', examples: '민수 씨인 게 틀림없다 / 사실인 게 틀림없다' },
      { type: 'usage', text: '推测确定性最高，接近"确信"', textEn: 'Highest certainty in speculation, close to "conviction"', examples: '노력하니까 성공할 게 틀림없어요（几乎肯定）', examplesEn: '노력하니까 성공할 게 틀림없어요 (almost certain)' },
      { type: 'compare', text: '和 -는 게 뻔하다 差别：客观证据 vs 主观判断', textEn: 'Difference from -는 게 뻔하다: objective evidence vs subjective judgment', examples: '통계상 그럴 게 틀림없어요（客观）/ 보니까 뻔해요（主观）', examplesEn: '통계상 그럴 게 틀림없어요 (objective) / 보니까 뻔해요 (subjective)' },
      { type: 'note', text: '别被结尾的 없다 骗了！它不是否定。틀림없다 是一个整体词（틀림=错误，없다=没有→"没有错、确信无疑"），所以 성공할 게 틀림없어요 是"肯定会成功"，绝不是"不会成功"', textEn: 'Don\'t be fooled by the ending 없다! It\'s not a negation. 틀림없다 is a single word (틀림=error, 없다=none → "no mistake, certain"), so 성공할 게 틀림없어요 means "will definitely succeed," not "won\'t succeed."', examples: '성공할 게 틀림없어요 = 肯定会成功（✓ 强肯定，不是否定）', examplesEn: '성공할 게 틀림없어요 = It\'s certain to succeed (✓ strong affirmation, not negation)' },
      { type: 'example', text: '갈 게 틀림없다 / 자고 있는 게 틀림없다 / 사실인 게 틀림없다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 시간에', role: 'time' },
          { text: '오는 사람은', role: 'subject' },
          { text: '민수 씨일 게 틀림없어요', role: 'verb' },
        ],
        zh: '这个点来的人肯定是敏秀。', zhEn: 'The person coming at this hour is definitely Min-su.',
        swapWords: ['민수 씨일', '언니일', '엄마일'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '노력하니까', role: 'verb' },
          { text: '성공할 게 틀림없어요', role: 'verb' },
        ],
        zh: '这么努力肯定会成功。', zhEn: 'Working this hard, (you\'ll) definitely succeed.',
        swapWords: ['성공할 게 틀림없어요', '합격할 게 틀림없어요', '잘 될 게 틀림없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '전화를 안 받는 걸 보니', role: 'verb' },
          { text: '자고 있는 게 틀림없어요', role: 'verb' },
        ],
        zh: '不接电话，肯定是在睡觉。', zhEn: 'Not answering the phone, (he\'s) definitely sleeping.',
        swapWords: ['자고 있는 게 틀림없어요', '나간 게 틀림없어요', '바쁜 게 틀림없어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 냄새는', role: 'subject' },
          { text: '김치찌개인 게 틀림없어요', role: 'verb' },
        ],
        zh: '这味道肯定是泡菜锅。', zhEn: 'This smell is definitely kimchi stew.',
        swapWords: ['김치찌개인', '된장찌개인', '순두부찌개인'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🔍', context: '推理判断', contextEn: 'Deductive reasoning', ko: '지문이 남아 있어요. 범인인 게 틀림없어요.', zh: '留下了指纹，肯定是嫌犯。', zhEn: 'Fingerprints were left, so it\'s definitely the suspect.' },
      { icon: '💡', context: '合乎逻辑', contextEn: 'Logical', ko: '이렇게 열심히 하니까 잘 될 게 틀림없어요.', zh: '这么用心肯定会顺利的。', zhEn: 'With this much effort, it\'s bound to go well.' },
      { icon: '📱', context: '推测状态', contextEn: 'Inferring a state', ko: '전화를 안 받는 걸 보니 회의 중일 게 틀림없어요.', zh: '不接电话，肯定在开会。', zhEn: 'Not answering the phone, so they\'re definitely in a meeting.' },
      { icon: '👃', context: '味觉识别', contextEn: 'Taste recognition', ko: '이 냄새는 삼겹살인 게 틀림없어요.', zh: '这味道肯定是烤五花肉。', zhEn: 'This smell is definitely grilled pork belly.' },
      { icon: '📊', context: '数据说话', contextEn: 'Data speaks', ko: '데이터가 이렇게 나왔으니까 결과가 좋을 게 틀림없어요.', zh: '数据是这样，结果肯定不错。', zhEn: 'The data shows this, so the results are bound to be good.' },
      { icon: '🎯', context: '结果预判', contextEn: 'Predicting outcomes', ko: '이 팀은 이번에 우승할 게 틀림없어요.', zh: '这支队伍这次肯定会夺冠。', zhEn: 'This team is certain to win the championship this time.' },
    ],
    mistakes: [
      { wrong: '갈 것 틀림없어요', correct: '갈 게 틀림없어요', note: '固定形是 -을/ㄹ 게 틀림없다，中间 것 与后续之间没有助词。것 → 게（缩合）。', noteEn: 'The fixed form is -을/ㄹ 게 틀림없다, with no particle between 것 and what follows. 것 → 게 (contraction).' },
      { wrong: '학생 게 틀림없어요', correct: '학생인 게 틀림없어요', note: '名词 + 인 게 틀림없다。학생 + 인 게 틀림없어요。', noteEn: 'Noun + 인 게 틀림없다. 학생 + 인 게 틀림없어요.' },
      { wrong: '어제 갔을 게 틀림없어요', correct: '어제 간 게 틀림없어요', note: '过去动作用过去冠形 -은/ㄴ。갔을 是错误的形态。', noteEn: 'For past actions, use the past adnominal form -은/ㄴ. 갔을 is incorrect.' },
      { wrong: '노력하니까 성공할 리가 없어요（想说肯定成功）', wrongEn: '노력하니까 성공할 리가 없어요 (meaning to say \'certain to succeed\')', correct: '노력하니까 성공할 게 틀림없어요', note: '-을 리가 없다 是"不可能"（负面否定），"肯定"必须用 -을 게 틀림없다。', noteEn: '-을 리가 없다 means \'impossible\' (negative negation); for \'certainty,\' you must use -을 게 틀림없다.' },
    ],
    quickTable: {
      title: '推测确定性总梯度', titleEn: 'The full spectrum of speculative certainty',
      body: '整个 P22 学过的推测语法全对比。', bodyEn: 'Full comparison of all the inferential grammar learned in P22.',
      headers: ['结构', '确定性', '语感', '例句'],
      rows: [
        [{ ko: '-을지도 모르다', zh: '★ 说不定', zhEn: '★ Maybe' }, { ko: '20%', zh: '很不确定', zhEn: 'Very uncertain' }, { ko: '猜测', zh: '主观', zhEn: 'Subjective' }, { ko: '갈지도 몰라요', zh: '说不定去', zhEn: 'Might go' }],
        [{ ko: '-을 수도 있다', zh: '★★ 可能', zhEn: '★★ Possible' }, { ko: '40%', zh: '客观可能性', zhEn: 'Objective possibility' }, { ko: '可能性', zh: '가능성' }, { ko: '갈 수도 있어요', zh: '也可能去', zhEn: 'Might also go' }],
        [{ ko: '-을 것 같다', zh: '★★★ 好像', zhEn: '★★★ Seems like' }, { ko: '60%', zh: '有点感觉', zhEn: 'A bit of a feeling' }, { ko: '주관 감각', zh: '感觉', zhEn: 'feeling' }, { ko: '갈 것 같아요', zh: '好像会去', zhEn: 'Seems like (he/she) will go' }],
        [{ ko: '-을 것이다', zh: '★★★★ 会', zhEn: '★★★★ Will' }, { ko: '80%', zh: '较肯定', zhEn: 'Fairly certain' }, { ko: '一般预期', zh: '기대' }, { ko: '갈 거예요', zh: '会去的', zhEn: '(He/She) will go' }],
        [{ ko: '-는 게 뻔하다', zh: '★★★★★ 显然', zhEn: '★★★★★ Obviously' }, { ko: '95%', zh: '主观确信', zhEn: 'Subjective certainty' }, { ko: '心知肚明', zh: '주관' }, { ko: '갈 게 뻔해요', zh: '显然会去', zhEn: 'Obviously will go' }],
        [{ ko: '-을 게 틀림없다', zh: '★★★★★ 肯定', zhEn: '★★★★★ Definitely' }, { ko: '95%', zh: '客观确信', zhEn: 'Objective certainty' }, { ko: '证据充足', zh: '客观', zhEn: 'Objective' }, { ko: '갈 게 틀림없어요', zh: '肯定会去', zhEn: 'Definitely will go' }],
        [{ ko: '-을 리가 없다', zh: '✗ 不可能', zhEn: '✗ Impossible' }, { ko: '0%', zh: '断言否定', zhEn: 'Assertive negation' }, { ko: '绝对不可能', zh: '否定确信', zhEn: 'Certainty of negation' }, { ko: '갈 리가 없어요', zh: '不可能去', zhEn: 'Can\'t possibly go' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 게 틀림없다 用法练习', titleEn: 'Practice with -을/ㄹ 게 틀림없다',
      body: '根据词性、时态和语境选出正确形态。', bodyEn: 'Choose the correct form based on part of speech, tense, and context.',
      questions: [
        {
          prompt: '"这么努力肯定会成功" → 노력하니까 ___.', promptEn: '"Working this hard, you\'ll definitely succeed" → 노력하니까 ___.',
          options: ['성공하는 게 틀림없어요', '성공할 게 틀림없어요', '성공한 게 틀림없어요', '성공하기 틀림없어요'],
          answer: 1,
          explanation: '未来事件 → 未来冠形 -을/ㄹ。성공하다 无收音 → 성공할 게 틀림없어요。', explanationEn: 'Future event → future adnominal -을/ㄹ. 성공하다 has no final consonant → 성공할 게 틀림없어요.',
        },
        {
          prompt: '"这味道肯定是泡菜锅" → 이 냄새는 ___.', promptEn: '"This smell is definitely kimchi stew" → 이 냄새는 ___.',
          options: ['김치찌개 게 틀림없어요', '김치찌개인 게 틀림없어요', '김치찌개일 게 틀림없어요', '김치찌개는 게 틀림없어요'],
          answer: 1,
          explanation: '名词 + 이다 现在时冠形 → 名词 + 인 게 틀림없다。김치찌개인 게 틀림없어요。', explanationEn: 'Noun + 이다 present adnominal → noun + 인 게 틀림없다. 김치찌개인 게 틀림없어요.',
        },
        {
          prompt: '"不接电话肯定在睡觉" → 전화를 안 받는 걸 보니 ___.', promptEn: '"Not answering the phone, definitely sleeping" → 전화를 안 받는 걸 보니 ___.',
          options: ['자는 게 틀림없어요', '잘 게 틀림없어요', '잔 게 틀림없어요', '자기 틀림없어요'],
          answer: 0,
          explanation: '"正在睡觉"是现在进行 → -는 게 틀림없다。자다 → 자는 게 틀림없어요。', explanationEn: '"Sleeping" is present progressive → -는 게 틀림없다. 자다 → 자는 게 틀림없어요.',
        },
        {
          prompt: '关于 -을 게 틀림없다 和 -는 게 뻔하다，哪句最准确？', promptEn: 'Regarding -을 게 틀림없다 and -는 게 뻔하다, which is most accurate?',
          options: [
            '两者意思完全不同',
            '两者接近，前者更客观依据，后者更主观判断',
            '前者只用未来，后者只用过去',
            '前者是否定，后者是肯定',
          ],
          answer: 1,
          explanation: '两个都是强肯定推测，差别在推测依据：틀림없다 更客观（"根据证据"），뻔하다 更主观（"我看着就知道"）。可互换的场景很多。', explanationEn: 'Both are strong affirmative guesses, the difference is in the basis: 틀림없다 is more objective ("based on evidence"), 뻔하다 is more subjective ("I can tell at a glance"). They are interchangeable in many situations.',
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
    title: 'P22 综合练习', titleEn: 'P22 Comprehensive Practice',
    whatItDoes: 'P22 第1～8课 总复习', whatItDoesEn: 'P22 Lessons 1–8 Comprehensive Review',
    whatItDoesBody: '完成这份练习，检验担忧、推测与规律八大语法。\n覆盖：-을까 봐、-을지도 모르다、-을 리가 없다、-기 마련이다、-기 십상이다、-는 법이다、-는 게 뻔하다、-을 게 틀림없다。\n重点掌握推测确定性梯度与规律语法的选择。', whatItDoesBodyEn: 'Complete this exercise to test the eight grammar points on worry, speculation, and rules. \\nCovers: -을까 봐, -을지도 모르다, -을 리가 없다, -기 마련이다, -기 십상이다, -는 법이다, -는 게 뻔하다, -을 게 틀림없다. \\nFocus on mastering the speculative certainty scale and choosing the right rule-based grammar.',
    isPractice: true,
    structureNote: 'P22 八大语法分组：\n【担忧】L01 -을까 봐\n【推测】L02 -을지도 모르다（说不定）· L03 -을 리가 없다（不可能）· L07 -는 게 뻔하다（显然是）· L08 -을 게 틀림없다（肯定）\n【规律】L04 -기 마련이다（自然规律）· L05 -기 십상이다（负面警告）· L06 -는 법이다（道理规律）', structureNoteEn: 'P22 Eight grammar points grouped: \\n[Worry] L01 -을까 봐 \\n[Speculation] L02 -을지도 모르다 (might) · L03 -을 리가 없다 (impossible) · L07 -는 게 뻔하다 (obviously) · L08 -을 게 틀림없다 (certainly) \\n[Rules] L04 -기 마련이다 (natural rule) · L05 -기 십상이다 (negative warning) · L06 -는 법이다 (logical rule)',
    structures: [
      { ko: '비가 올까 봐 우산을 챙겼어요', zh: '怕下雨带了伞。', zhEn: 'Brought an umbrella in case it rains.', tokens: [{ text: '비가', role: 'subject' }, { text: '올까 봐', role: 'verb' }, { text: '우산을', role: 'object' }, { text: '챙겼어요', role: 'verb' }] },
      { ko: '내일 비가 올지도 몰라요', zh: '明天说不定下雨。', zhEn: 'It might rain tomorrow.', tokens: [{ text: '내일', role: 'time' }, { text: '비가', role: 'subject' }, { text: '올지도 몰라요', role: 'verb' }] },
      { ko: '그럴 리가 없어요', zh: '不可能这样。', zhEn: 'It can\'t be like this.', tokens: [{ text: '그럴 리가 없어요', role: 'verb' }] },
      { ko: '사람은 실수하기 마련이에요', zh: '人嘛谁都会犯错。', zhEn: 'Everyone makes mistakes.', tokens: [{ text: '사람은', role: 'subject' }, { text: '실수하기 마련이에요', role: 'verb' }] },
      { ko: '급하면 넘어지기 십상이에요', zh: '急了容易摔倒。', zhEn: 'If you\'re in a hurry, you\'re likely to fall.', tokens: [{ text: '급하면', role: 'verb' }, { text: '넘어지기 십상이에요', role: 'verb' }] },
      { ko: '잘못하면 벌 받는 법이에요', zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.', tokens: [{ text: '잘못하면', role: 'verb' }, { text: '벌', role: 'object' }, { text: '받는 법이에요', role: 'verb' }] },
      { ko: '늦을 게 뻔해요', zh: '显然要迟到了。', zhEn: 'It\'s obvious we\'re going to be late.', tokens: [{ text: '늦을 게 뻔해요', role: 'verb' }] },
      { ko: '노력하니까 성공할 게 틀림없어요', zh: '这么努力肯定会成功。', zhEn: 'Working this hard, (you\'ll) definitely succeed.', tokens: [{ text: '노력하니까', role: 'verb' }, { text: '성공할 게 틀림없어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '担心 → -을까 봐 + 主句', textEn: 'Worry → -을까 봐 + main clause', examples: '늦을까 봐 뛰었어요（怕迟到所以跑了。）', examplesEn: '늦을까 봐 뛰었어요 (I ran because I was afraid of being late.)' },
      { type: 'rule', text: '低概率推测（说不定）→ -을지도 모르다', textEn: 'Low probability guess (maybe) → -을지도 모르다', examples: '올지도 몰라요（说不定会来。）', examplesEn: '올지도 몰라요 (He might come.)' },
      { type: 'rule', text: '绝对否定推测 → -을 리가 없다', textEn: 'Absolute negative guess → -을 리가 없다', examples: '올 리가 없어요（不可能来。）', examplesEn: '올 리가 없어요 (There\'s no way he\'ll come.)' },
      { type: 'rule', text: '自然规律 → -기 마련이다', textEn: 'Natural law → -기 마련이다', examples: '누구나 늙기 마련이에요（谁都难免会老。）', examplesEn: '누구나 늙기 마련이에요 (Everyone inevitably grows old.)' },
      { type: 'rule', text: '负面警告（容易发生坏事）→ -기 십상이다', textEn: 'Negative warning (bad things easily happen) → -기 십상이다', examples: '급하면 넘어지기 십상이에요（一急就容易摔倒。）', examplesEn: '급하면 넘어지기 십상이에요 (If you\'re in a hurry, you\'re likely to fall.)' },
      { type: 'rule', text: '道理规律 → -는 법이다 / 从不 → -는 법이 없다', textEn: 'Principle/rule → -는 법이다 / never → -는 법이 없다', examples: '벌 받는 법이에요 / 화내는 법이 없어요' },
      { type: 'rule', text: '主观强推测 → -는 게 뻔하다', textEn: 'Subjective strong guess → -는 게 뻔하다', examples: '올 게 뻔해요（肯定会来，来是明摆着的。）', examplesEn: '올 게 뻔해요 (He\'s sure to come; it\'s obvious.)' },
      { type: 'rule', text: '客观强推测 → -을 게 틀림없다', textEn: 'Objective strong guess → -을 게 틀림없다', examples: '올 게 틀림없어요（一定会来，毫无疑问。）', examplesEn: '올 게 틀림없어요 (He\'ll definitely come, no doubt.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '늦을까 봐', role: 'verb' }, { text: '택시를', role: 'object' }, { text: '탔어요', role: 'verb' }],
        zh: '怕迟到打了车。', zhEn: 'Took a taxi, afraid of being late.',
        swapRole: 'verb',
        swapWords: ['늦을까 봐', '지각할까 봐', '못 갈까 봐'],
      },
      {
        wordBlocks: [{ text: '사람은', role: 'subject' }, { text: '누구나', role: 'plain' }, { text: '실수하기 마련이에요', role: 'verb' }],
        zh: '人嘛谁都会犯错。', zhEn: 'Everyone makes mistakes.',
        swapRole: 'verb',
        swapWords: ['실수하기 마련이에요', '틀리기 마련이에요', '후회하기 마련이에요'],
      },
      {
        wordBlocks: [{ text: '노력하니까', role: 'verb' }, { text: '성공할 게 틀림없어요', role: 'verb' }],
        zh: '这么努力肯定会成功。', zhEn: 'Working this hard, (you\'ll) definitely succeed.',
        swapRole: 'verb',
        swapWords: ['성공할 게 틀림없어요', '잘 될 게 틀림없어요', '합격할 게 틀림없어요'],
      },
    ],
    scenarios: [
      { icon: '☔', context: 'L01 担心', contextEn: 'L01 Worry', ko: '비가 올까 봐 우산 챙겼어요.', zh: '怕下雨带了伞。', zhEn: 'Brought an umbrella in case it rains.' },
      { icon: '❓', context: 'L02 说不定', contextEn: 'L02 Maybe', ko: '주말에 시간이 안 될지도 몰라요.', zh: '周末说不定没时间。', zhEn: 'I might not have time on the weekend.' },
      { icon: '🚫', context: 'L03 不可能', contextEn: 'L03 Impossible', ko: '거짓말할 리가 없어요.', zh: '不可能说谎。', zhEn: 'There\'s no way (he/she) would lie.' },
      { icon: '⚖️', context: 'L04 自然规律', contextEn: 'L04 Natural Laws', ko: '사람은 누구나 늙기 마련이에요.', zh: '人自然会老。', zhEn: 'People naturally age.' },
      { icon: '⚠️', context: 'L05 负面警告', contextEn: 'L05 Negative Warnings', ko: '급하면 실수하기 십상이에요.', zh: '急了容易出错。', zhEn: 'Rushing leads to mistakes.' },
      { icon: '📜', context: 'L06 道理规律', contextEn: 'L06 Principles and Patterns', ko: '잘못하면 벌 받는 법이에요.', zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.' },
      { icon: '👁️', context: 'L07 显然是', contextEn: 'L07 Obviously', ko: '표정 보니 화난 게 뻔해요.', zh: '看表情显然生气了。', zhEn: 'You can tell from the expression (he/she) is clearly angry.' },
      { icon: '🎯', context: 'L08 肯定', contextEn: 'L08 Certainly', ko: '이 팀이 우승할 게 틀림없어요.', zh: '这队肯定夺冠。', zhEn: 'This team will definitely win the championship.' },
    ],
    mistakes: [
      { wrong: '가을까 봐', correct: '갈까 봐', note: 'L01：가다 无收音 → ㄹ까 봐。', noteEn: 'L01: 가다 (no batchim) → ㄹ까 봐.' },
      { wrong: '갈지도 알아요', correct: '갈지도 몰라요', note: 'L02：固定搭配是 모르다，不能用 알다。', noteEn: 'L02: The fixed pairing is 모르다, not 알다.' },
      { wrong: '갈 리 없어요', correct: '갈 리가 없어요', note: 'L03：리 后面必须加 가。', noteEn: 'L03: 리 must be followed by 가.' },
      { wrong: '실수하는 마련이에요', correct: '실수하기 마련이에요', note: 'L04：必须用 -기 名词化。', noteEn: 'L04: Must use -기 nominalization.' },
      { wrong: '피곤하기 십상이에요', correct: '피곤해지기 십상이에요', note: 'L05：只接动词，形容词要 -아/어지다。', noteEn: 'L05: Only attaches to verbs; adjectives need -아/어지다.' },
      { wrong: '늦기 뻔해요', correct: '늦을 게 뻔해요', note: 'L07：必须冠形 + 게 뻔하다。', noteEn: 'L07: Must use adnominal + 게 뻔하다.' },
      { wrong: '학생 게 틀림없어요', correct: '학생인 게 틀림없어요', note: 'L08：名词 + 인 게 틀림없다。', noteEn: 'L08: Noun + 인 게 틀림없다.' },
      { wrong: '늙기 십상이에요', correct: '늙기 마련이에요', note: 'L04/L05：自然规律用 마련이다，负面警告才用 십상이다。', noteEn: 'L04/L05: Use 마련이다 for natural laws, and 십상이다 only for negative warnings.' },
    ],
    linkedGrammarIds: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习 · 担忧、推测与规律', titleEn: 'Comprehensive Practice · Worry, Speculation & Rules',
      body: '根据语境选出最合适的表达。', bodyEn: 'Choose the most appropriate expression based on the context.',
      questions: [
        {
          prompt: '"怕迟到打了出租车" → ___ 택시를 탔어요.', promptEn: '"Took a taxi because (I) was afraid of being late" → ___ 택시를 탔어요.',
          options: ['늦기 마련이라서', '늦을까 봐', '늦을지도 몰라서', '늦을 게 틀림없어서'],
          answer: 1,
          explanation: 'L01 担心 + 采取行动 → -을까 봐。늦다 有收音 → 늦을까 봐。', explanationEn: 'L01 Worry + taking action → -을까 봐. 늦다 has a batchim → 늦을까 봐.',
        },
        {
          prompt: '"明天说不定会下雨"（低概率推测）→ 내일 비가 ___.', promptEn: '"It might rain tomorrow" (low-probability guess) → 내일 비가 ___.',
          options: ['올 게 뻔해요', '올 리가 없어요', '올지도 몰라요', '올 게 틀림없어요'],
          answer: 2,
          explanation: 'L02 低概率推测（说不定）→ -을지도 모르다。올지도 몰라요。', explanationEn: 'L02 Low-probability guess (might) → -을지도 모르다. 올지도 몰라요.',
        },
        {
          prompt: '"那个人不可能说谎"（强烈否定）→ 그 사람이 거짓말 ___.', promptEn: '"That person can\'t possibly lie" (strong negation) → 그 사람이 거짓말 ___.',
          options: ['할지도 몰라요', '할 리가 없어요', '할 게 뻔해요', '할 게 틀림없어요'],
          answer: 1,
          explanation: 'L03 强烈否定推测 → -을 리가 없다。할 리가 없어요。', explanationEn: 'L03 Strong negative guess → -을 리가 없다. 할 리가 없어요.',
        },
        {
          prompt: '"人嘛谁都会犯错"（自然规律）→ 사람은 누구나 ___.', promptEn: '"Everyone makes mistakes" (natural law) → 사람은 누구나 ___.',
          options: ['실수하기 십상이에요', '실수하는 법이 없어요', '실수할 리가 없어요', '실수하기 마련이에요'],
          answer: 3,
          explanation: 'L04 中性自然规律 → -기 마련이다。사람은 누구나 실수하기 마련이에요。', explanationEn: 'L04 Neutral natural law → -기 마련이다. People are bound to make mistakes.',
        },
        {
          prompt: '"吃太急容易积食"（负面警告）→ 급하게 먹으면 ___.', promptEn: '"Eating too fast easily causes indigestion" (negative warning) → 급하게 먹으면 ___.',
          options: ['체하기 마련이에요', '체하기 십상이에요', '체할 리가 없어요', '체하는 법이에요'],
          answer: 1,
          explanation: 'L05 负面警告（容易发生坏事）→ -기 십상이다。체하기 십상이에요。', explanationEn: 'L05 Negative warning (bad things easily happen) → -기 십상이다. You\'re likely to get indigestion.',
        },
        {
          prompt: '"做错了自然要受罚"（道理规律）→ 잘못하면 ___.', promptEn: '"If you do wrong, you naturally get punished" (logical rule) → 잘못하면 ___.',
          options: ['벌 받기 십상이에요', '벌 받기 마련이에요', '벌 받는 법이에요', '벌 받을 리가 없어요'],
          answer: 2,
          explanation: 'L06 道理/社会规律 → -는 법이다。벌 받는 법이에요。（-기 마련이다 也可但 -는 법이다 更贴道理）', explanationEn: 'L06 Principle/social rule → -는 법이다. You\'re bound to be punished. (-기 마련이다 also works, but -는 법이다 fits principles better)',
        },
        {
          prompt: '"看表情显然生气了"（主观强推测）→ 저 표정 보니까 ___.', promptEn: '"Looking at the expression, clearly angry" (strong subjective inference) → 저 표정 보니까 ___.',
          options: ['화날 리가 없어요', '화나는 법이에요', '화난 게 뻔해요', '화날지도 몰라요'],
          answer: 2,
          explanation: 'L07 主观强推测（看着就知道）→ -은/ㄴ 게 뻔하다（过去状态）。화난 게 뻔해요。', explanationEn: 'L07 Strong subjective inference (obvious at a glance) → -은/ㄴ 게 뻔하다 (past state). It\'s obvious he\'s angry.',
        },
        {
          prompt: '"这么努力肯定会成功"（客观强推测）→ 노력하니까 ___.', promptEn: '"With this much effort, success is certain" (strong objective inference) → 노력하니까 ___.',
          options: ['성공할지도 몰라요', '성공할 게 뻔해요', '성공할 리가 없어요', '성공할 게 틀림없어요'],
          answer: 3,
          explanation: 'L08 客观证据强推测（几乎确信）→ -을 게 틀림없다。성공할 게 틀림없어요。', explanationEn: 'L08 Strong objective inference (almost certain) → -을 게 틀림없다. He\'s bound to succeed.',
        },
        {
          prompt: '"敏秀从不发火" → 민수 씨는 ___.', promptEn: '"Minsu never gets angry" → 민수 씨는 ___.',
          options: ['화내는 법이에요', '화내는 법이 없어요', '화낼 리가 없어요', '화내기 십상이에요'],
          answer: 1,
          explanation: 'L06 固定否定"从不……" → -는 법이 없다。화내는 법이 없어요。', explanationEn: 'L06 Fixed negation "never..." → -는 법이 없다. He never gets angry.',
        },
        {
          prompt: '关于推测确定性梯度，哪句最准确？', promptEn: 'Regarding the certainty gradient of speculation, which sentence is most accurate?',
          options: [
            '-을지도 모르다 比 -을 게 틀림없다 更肯定',
            '-을 리가 없다 是最不确定的推测',
            '-을 게 틀림없다 是最强肯定，-을 리가 없다 是最强否定',
            '所有推测语法确定性相同',
          ],
          answer: 2,
          explanation: 'P22 推测光谱：说不定（-을지도 모르다）< 好像（-을 것 같다）< 会（-을 것이다）< 肯定（-을 게 틀림없다）↔ 不可能（-을 리가 없다）。', explanationEn: 'P22 Speculation spectrum: might (-을지도 모르다) < seems (-을 것 같다) < will (-을 것이다) < certain (-을 게 틀림없다) ↔ impossible (-을 리가 없다).',
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
