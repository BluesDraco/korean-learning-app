import type { GrammarCard } from '@/types';

export const grammarCardsP21: GrammarCard[] = [
  // ── 第1课：-았/었더라면 ─────────────────────────────────────
  {
    id: 'card-p21-l01',
    partNumber: 21,
    lessonNumber: 1,
    title: '-았/었더라면',
    whatItDoes: '如果当时……的话', whatItDoesEn: 'If it had been... back then',
    whatItDoesBody: '表达对过去已经发生（或未发生）的事情的反向假设。\n和 -(으)면 不同：-(으)면 讲一般条件，-았/었더라면 讲不能改变的过去。\n后半句常配 -았을 텐데 / -았을 것이다，表达遗憾或推测。', whatItDoesBodyEn: 'Expresses a counterfactual assumption about something that already happened (or didn\'t) in the past.\\nUnlike -(으)면: -(으)면 states general conditions, while -았/었더라면 refers to an unchangeable past.\\nThe second clause often pairs with -았을 텐데 / -았을 것이다 to express regret or speculation.',
    structureNote: '结构：过去词干（-았/었-）+ 더라면 + 后句（常用 -았을 텐데）。\n前后两句都是过去时，因为讨论的是无法回到的过去。', structureNoteEn: 'Structure: past stem (-았/었-) + 더라면 + second clause (often -았을 텐데).\\nBoth clauses are in past tense because we\'re discussing an unchangeable past.',
    rulesNote: '判断口诀：一件事已经发生（或没发生），无法改变，只能"想想当时如果……"。\n和 -(으)면 的最大区别就是"能不能改变"。\n和 -았/었으면 좋았을 텐데 意思接近但语气更书面。', rulesNoteEn: 'Quick tip: if something already happened (or didn\'t) and can\'t be changed, you just "think about what if...".\\nThe biggest difference from -(으)면 is "whether it can be changed".\\nIt\'s similar to -았/었으면 좋았을 텐데 but more formal in tone.',
    structures: [
      {
        ko: '조금만 더 일찍 출발했더라면 지각하지 않았을 텐데요',
        zh: '要是当时再早点出发，就不会迟到了。', zhEn: 'If we had left a bit earlier back then, we wouldn\'t have been late.',
        tokens: [
          { text: '조금만 더 일찍', role: 'plain' },
          { text: '출발했더라면', role: 'verb' },
          { text: '지각하지 않았을 텐데요', role: 'verb' },
        ],
      },
      {
        ko: '그때 그 사람을 만나지 않았더라면 지금 어떻게 됐을까요',
        zh: '当时要是没遇到那个人，现在会是什么样呢？', zhEn: 'If I hadn\'t met that person back then, what would things be like now?',
        tokens: [
          { text: '그때', role: 'time' },
          { text: '그 사람을', role: 'object' },
          { text: '만나지 않았더라면', role: 'verb' },
          { text: '지금', role: 'time' },
          { text: '어떻게 됐을까요', role: 'verb' },
        ],
      },
      {
        ko: '어제 우산을 가져갔더라면 비를 안 맞았을 거예요',
        zh: '昨天要是带了伞，就不会淋到雨了。', zhEn: 'If I had brought an umbrella yesterday, I wouldn\'t have gotten soaked in the rain.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '우산을', role: 'object' },
          { text: '가져갔더라면', role: 'verb' },
          { text: '비를 안 맞았을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '제가 부자였더라면 그 집을 샀을 거예요',
        zh: '要是我当时是富人，就把那栋房子买下了。', zhEn: 'If I had been rich back then, I would have bought that house.',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '부자였더라면', role: 'verb' },
          { text: '그 집을', role: 'object' },
          { text: '샀을 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词过去词干 + 더라면', textEn: 'Verb/Adjective past stem + 더라면', examples: '먹다→먹었더라면 / 가다→갔더라면 / 예쁘다→예뻤더라면' },
      { type: 'rule', text: '名词 + 이었더라면 / 였더라면', textEn: 'Noun + 이었더라면 / 였더라면', examples: '학생이었더라면 / 부자였더라면' },
      { type: 'usage', text: '后半句常配 -았/었을 텐데 / -았/었을 것이다', textEn: 'The second clause often pairs with -았/었을 텐데 / -았/었을 것이다', examples: '일찍 갔더라면 만났을 텐데 / 알았더라면 도와줬을 거예요' },
      { type: 'usage', text: '表达无法改变的过去的遗憾或推测', textEn: 'Expresses regret or speculation about an unchangeable past', examples: '이미 벌어진 일에 대한 반사실 가정' },
      { type: 'compare', text: '和 -(으)면 的区别：现在/将来的一般条件 vs 过去的反事实假设', textEn: 'Difference from -(으)면: general condition for present/future vs. counterfactual hypothesis about the past', examples: '비가 오면 안 갈 거예요（可能下雨）/ 비가 왔더라면 안 갔을 거예요（当时下了雨/没下雨都可）', examplesEn: '비가 오면 안 갈 거예요 (it might rain) / 비가 왔더라면 안 갔을 거예요 (whether it rained or not at the time)' },
      { type: 'note', text: '书面语色彩较强，日常口语常换成 -았/었으면', textEn: 'Has a stronger written tone; in everyday speech, often replaced with -았/었으면', examples: '갔더라면（书面）≈ 갔으면（口语）', examplesEn: '갔더라면 (written) ≈ 갔으면 (spoken)' },
      { type: 'note', text: '后半句时态跟着"结果发生在何时"走：结果指过去用 -았을 텐데/거예요；结果指现在则用现在推测形 -을 텐데/거예요，不必都变过去。', textEn: 'The tense of the second clause follows when the result occurs: use -았을 텐데/거예요 for past results, and the present speculation form -을 텐데/거예요 for present results—no need to make everything past tense.', examples: '부자였더라면 그 집을 샀을 텐데요（过去结果）/ 부자였더라면 지금 이 집에 살 텐데요（现在结果）', examplesEn: '부자였더라면 그 집을 샀을 텐데요 (past result) / 부자였더라면 지금 이 집에 살 텐데요 (present result)' },
      { type: 'example', text: '조금만 일찍 왔더라면 만날 수 있었을 텐데요 / 그때 참았더라면 후회하지 않았을 거예요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '조금만', role: 'plain' },
          { text: '일찍', role: 'plain' },
          { text: '출발했더라면', role: 'verb' },
          { text: '지각하지 않았을 텐데요', role: 'verb' },
        ],
        zh: '要是再早点出发，就不会迟到了。', zhEn: 'If I had left a bit earlier, I wouldn\'t have been late.',
        swapWords: ['출발했더라면', '나왔더라면', '움직였더라면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '우산을', role: 'object' },
          { text: '가져갔더라면', role: 'verb' },
          { text: '비를 안 맞았을 거예요', role: 'verb' },
        ],
        zh: '昨天要是带了伞，就不会淋到雨了。', zhEn: 'If I had brought an umbrella yesterday, I wouldn\'t have gotten soaked in the rain.',
        swapWords: ['가져갔더라면', '챙겼더라면', '샀더라면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '일찍 배웠더라면', role: 'verb' },
          { text: '지금 더 잘했을 거예요', role: 'verb' },
        ],
        zh: '要是我早点学韩语，现在就会说得更好。', zhEn: 'If I had started learning Korean earlier, I\'d speak it better now.',
        swapWords: ['한국어를', '영어를', '중국어를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '그때', role: 'time' },
          { text: '용기를 냈더라면', role: 'verb' },
          { text: '지금쯤', role: 'time' },
          { text: '후회 안 했을 텐데요', role: 'verb' },
        ],
        zh: '当时要是鼓起勇气，现在就不会后悔了。', zhEn: 'If I had mustered the courage back then, I wouldn\'t regret it now.',
        swapWords: ['용기를 냈더라면', '고백했더라면', '말했더라면'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '错过约会', contextEn: 'Missed a date', ko: '조금만 더 서둘렀더라면 늦지 않았을 텐데요.', zh: '要是当时再赶紧点，就不会迟到了。', zhEn: 'If I had hurried a bit more then, I wouldn\'t have been late.' },
      { icon: '📚', context: '考试后悔', contextEn: 'Regret about an exam', ko: '어제 공부를 좀 더 했더라면 시험을 잘 봤을 거예요.', zh: '昨天要是多学一会儿，考试就能考好。', zhEn: 'If I had studied a bit more yesterday, I could have done well on the exam.' },
      { icon: '💔', context: '感情遗憾', contextEn: 'Regret in a relationship', ko: '그때 마음을 표현했더라면 지금 후회 안 했을 거예요.', zh: '当时要是表达了心意，现在就不会后悔。', zhEn: 'If I had confessed my feelings then, I wouldn\'t regret it now.' },
      { icon: '🌂', context: '天气未备', contextEn: 'Unprepared for weather', ko: '일기예보를 봤더라면 우산을 가져왔을 텐데요.', zh: '要是看了天气预报，就带伞了。', zhEn: 'If I had checked the weather forecast, I would have brought an umbrella.' },
      { icon: '🎓', context: '选择遗憾', contextEn: 'Regret about a choice', ko: '전공을 다르게 선택했더라면 인생이 달라졌을까요?', zh: '要是选了别的专业，人生会不一样吗？', zhEn: 'If I had chosen a different major, would my life be different?' },
      { icon: '💰', context: '投资未做', contextEn: 'Investment not made', ko: '그때 그 주식을 샀더라면 부자가 됐을 거예요.', zh: '当时要是买了那只股票，就成富翁了。', zhEn: 'If I had bought that stock back then, I would have become a millionaire.' },
    ],
    mistakes: [
      { wrong: '내일 비가 왔더라면 안 갈 거예요', correct: '내일 비가 오면 안 갈 거예요', note: '-았/었더라면 只讲过去的反事实，不能用于未来。未来假设用 -(으)면。', noteEn: '-았/었더라면 only talks about past counterfactuals, not the future. For future hypotheses, use -(으)면.' },
      { wrong: '가더라면 만났을 텐데요', correct: '갔더라면 만났을 텐데요', note: '-더라면 前必须是过去词干 -았/었-，不能用现在词干。表达"如果当时去了"必须是 갔더라면。', noteEn: '-더라면 must be preceded by the past stem -았/었-, not the present stem. To say \'if I had gone then,\' it must be 갔더라면.' },
      { wrong: '조금 일찍 왔더라면 만나요', correct: '조금 일찍 왔더라면 만났을 거예요', note: '后半句必须也用过去推测形（-았을 것이다/-았을 텐데），不能用现在时。前后时态要匹配。', noteEn: 'The second half must also use the past conjectural form (-았을 것이다/-았을 텐데), not the present tense. The tenses must match.' },
      { wrong: '학생더라면 이해했을 거예요', correct: '학생이었더라면 이해했을 거예요', note: '名词 + 이었더라면 / 였더라면。学生有收音 → 학생이었더라면。', noteEn: 'Noun + 이었더라면 / 였더라면. Student has a final consonant → 학생이었더라면.' },
    ],
    quickTable: {
      title: '-았/었더라면 变形速查', titleEn: '-았/었더라면 conjugation quick reference',
      body: '按词干末字/词类查找相应过去形，再加 더라면。', bodyEn: 'Find the corresponding past form based on the stem\'s final letter or word class, then add 더라면.',
      headers: ['原形', '词类', '过去词干', '完整形态'],
      rows: [
        ['가다', '动词无收音', { ko: '갔-', zh: '가+았→갔' }, { ko: '갔더라면', zh: '要是当时去了的话', zhEn: 'If I had gone then' }],
        ['먹다', '动词有收音', { ko: '먹었-', zh: '먹+었' }, { ko: '먹었더라면', zh: '要是当时吃了的话', zhEn: 'If I had eaten then' }],
        ['하다', '하다类', { ko: '했-', zh: '하+였→했' }, { ko: '했더라면', zh: '要是当时做了的话', zhEn: 'If I had done it then' }],
        ['예쁘다', '形容词', { ko: '예뻤-', zh: 'ㅡ脱落+었', zhEn: 'ㅡ drop + 었' }, { ko: '예뻤더라면', zh: '要是当时漂亮的话', zhEn: 'If I had been pretty then' }],
        ['학생이다', '名词+有收音', { ko: '학생이었-', zh: '이었' }, { ko: '학생이었더라면', zh: '要是当时是学生的话', zhEn: 'If I had been a student then' }],
        ['부자이다', '名词+无收音', { ko: '부자였-', zh: '였' }, { ko: '부자였더라면', zh: '要是当时是富人的话', zhEn: 'If I had been rich then' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-았/었더라면 变形练习', titleEn: '-았/었더라면 conjugation practice',
      body: '根据原形和过去反事实假设的语境，选出正确形态。', bodyEn: 'Choose the correct form based on the original and the context of a past counterfactual hypothesis.',
      questions: [
        {
          prompt: '"要是当时早点出发就好了" → 조금 일찍 ___ 지각하지 않았을 텐데요.', promptEn: '\'If only I had left earlier\' → 조금 일찍 ___ 지각하지 않았을 텐데요.',
          options: ['출발더라면', '출발하더라면', '출발했더라면', '출발할더라면'],
          answer: 2,
          explanation: '-더라면 前必须用过去词干 -았/었-。출발하다 → 출발했더라면。', explanationEn: '-더라면 must be preceded by the past stem -았/었-. 출발하다 → 출발했더라면.',
        },
        {
          prompt: '"要是当时是学生的话" → ___ 이해했을 거예요.', promptEn: '\'If I had been a student then\' → ___ 이해했을 거예요.',
          options: ['학생더라면', '학생이었더라면', '학생였더라면', '학생이면'],
          answer: 1,
          explanation: '名词有收音 → 이었더라면。학생 + 이었더라면 = 학생이었더라면。', explanationEn: 'Noun with final consonant → 이었더라면. 학생 + 이었더라면 = 학생이었더라면.',
        },
        {
          prompt: '"要是当时下雨的话" → 어제 ___ 안 갔을 거예요.', promptEn: '\'If it had rained then\' → 어제 ___ 안 갔을 거예요.',
          options: ['비가 오더라면', '비가 왔더라면', '비가 오았더라면', '비가 온더라면'],
          answer: 1,
          explanation: '오다 + 았 → 缩合为 왔 → 왔더라면。', explanationEn: '오다 + 았 → contracts to 왔 → 왔더라면.',
        },
        {
          prompt: '"要是没遇到那个人" → ___ 지금 어떻게 됐을까요?', promptEn: '\'If I hadn\'t met that person\' → ___ 지금 어떻게 됐을까요?',
          options: ['만나지 않더라면', '만나지 않았더라면', '안 만나더라면', '만날 않았더라면'],
          answer: 1,
          explanation: '否定用 -지 않다 的过去形 -지 않았-，再加 더라면：만나지 않았더라면。', explanationEn: 'For negation, use the past form of -지 않다, which is -지 않았-, then add 더라면: 만나지 않았더라면.',
        },
      ],
    },
    linkedGrammarIds: ['card-p5-l01', 'card-p21-l05'],
    step0Html: `<div class="card-title">-았/었더라면</div>
<div class="card-body">"如果当时……"—— 对无法改变的过去做反事实假设。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">现在假设 vs 过去反事实</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-(으)면（一般条件·可实现）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 가면 만날 수 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">早去的话就能见到。（还没去，可选）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-았/었더라면（反事实·不可改变）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 갔더라면 만났을 텐데요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当时要是早去了，就能见到了。（已经没去，只能想想）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-았/었더라면 表达的是<b>已经无法改变的过去</b>。后半句必须也用过去推测形 -았/었을 텐데/거예요。</div>`,
    compareHtml: `<div class="card-title">-(으)면 vs -았/었더라면</div>
<div class="card-body">两个都是"如果……"，但一个讲现实可能性，一个讲已经无法改变的过去。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면 → 一般条件</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去 / 现在 / 未来 都可用</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오면 우산을 써요.</span><span style="font-size:16px;color:#5a4640">下雨就打伞。（一般规律）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">내일 시간 있으면 만나요.</span><span style="font-size:16px;color:#5a4640">明天有时间就见面。（未来可能）</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었더라면 → 反事实假设</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">只能用于过去，且已成定局</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 왔더라면 우산을 썼을 텐데요.</span><span style="font-size:16px;color:#5a4640">当时要是下雨就打伞了。（实际没下）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어제 만났더라면 좋았을 텐데요.</span><span style="font-size:16px;color:#5a4640">昨天要是见了就好了。（没见）</span></div>
  </div>
</div>
<div class="reminder-box">判断口诀：能改变→用 -(으)면；不能改变（回不去的过去）→用 -았/었더라면。且后半句必须也是过去推测形。</div>`,
    compareLabel: '-(으)면 vs -았/었더라면',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 1 课</div>
    <div class="ov-hero-title">-았/었더라면</div>
    <div class="ov-hero-sub">对不可改变的过去做反事实假设</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b style="color:#ff7fa8">过去词干（-았/었-）</b> + 더라면 + <b style="color:#6b7ff0">-았/었을 텐데 / 거예요</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        일찍 갔더라면 만났을 텐데요.（要是早去就见到了）<br>
        용기를 냈더라면 후회 안 했을 거예요.（要是鼓起勇气就不会后悔）<br>
        학생이었더라면 이해했을 거예요.（要是当时是学生就能理解）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가더라면 만났을 텐데요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갔더라면 만났을 텐데요（必须过去词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">일찍 왔더라면 만나요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">일찍 왔더라면 만났을 거예요（后句也要过去推测）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第2课：-을/ㄹ 걸 그랬다 ────────────────────────────────
  {
    id: 'card-p21-l02',
    partNumber: 21,
    lessonNumber: 2,
    title: '-을/ㄹ 걸 그랬다',
    whatItDoes: '早知道就……了（后悔没做）', whatItDoesEn: 'I should have... (regret for not doing)',
    whatItDoesBody: '表达说话人对"当时没做某事"的后悔。\n和 -았/었더라면 不同：这里只对说话人自己的行为遗憾，不是对情况本身。\n口语中常省略 그랬다，只说 -을걸（有拖音），带一种自言自语的懊悔感。', whatItDoesBodyEn: 'Expresses the speaker\'s regret about "not doing something at the time".\\nUnlike -았/었더라면: here the regret is only about the speaker\'s own action, not the situation itself.\\nIn speech, 그랬다 is often omitted, leaving just -을걸 (with a drawn-out sound), giving a self-muttering sense of remorse.',
    structureNote: '结构：动词词干（无收音 + ㄹ 걸；有收音 + 을 걸）+ 그랬다。\n主语通常是说话人自己（第一人称），感慨"当时我要是做了就好了"。', structureNoteEn: 'Structure: verb stem (no final consonant + ㄹ 걸; with final consonant + 을 걸) + 그랬다.\\nThe subject is usually the speaker (first person), lamenting "I wish I had done it then".',
    rulesNote: '两个变体：\n1. 完整形 -을/ㄹ 걸 그랬다：对听话人陈述后悔。\n2. 省略形 -을/ㄹ걸（拖音）：自言自语式的懊悔感叹，句尾语调下降。', rulesNoteEn: 'Two variants:\\n1. Full form -을/ㄹ 걸 그랬다: stating regret to the listener.\\n2. Shortened form -을/ㄹ걸 (drawn-out): self-muttering regret, with falling intonation at the end.',
    structures: [
      {
        ko: '어제 일찍 잘 걸 그랬어요',
        zh: '昨天要是早点睡就好了。', zhEn: 'If only I had gone to bed earlier yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '일찍', role: 'plain' },
          { text: '잘 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '그 옷을 살 걸 그랬어요',
        zh: '当时要是买了那件衣服就好了。', zhEn: 'I should have bought that outfit back then.',
        tokens: [
          { text: '그 옷을', role: 'object' },
          { text: '살 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 좀 더 공부할 걸 그랬어요',
        zh: '当时要是多学点韩语就好了。', zhEn: 'I should have studied more Korean back then.',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '좀 더', role: 'plain' },
          { text: '공부할 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '우산을 챙길걸',
        zh: '哎，要带把伞出来的……（自言自语）', zhEn: 'Ugh, I should\'ve brought an umbrella... (muttering to myself)',
        tokens: [
          { text: '우산을', role: 'object' },
          { text: '챙길걸', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ 걸 그랬다', textEn: 'Stem without final consonant + ㄹ 걸 그랬다', examples: '가다→갈 걸 그랬다 / 사다→살 걸 그랬다 / 하다→할 걸 그랬다' },
      { type: 'rule', text: '有收音词干 + 을 걸 그랬다', textEn: 'Stem with final consonant + 을 걸 그랬다', examples: '먹다→먹을 걸 그랬다 / 읽다→읽을 걸 그랬다 / 앉다→앉을 걸 그랬다' },
      { type: 'rule', text: 'ㄹ 词干：ㄹ 保留，词干直接 + 걸 그랬다', textEn: 'ㄹ stems: keep ㄹ, add 걸 그랬다 directly to stem', examples: '만들다→만들 걸 그랬다 / 살다→살 걸 그랬다' },
      { type: 'usage', text: '主语通常是说话人自己，表达"我当时要是做了……就好了"', textEn: 'Subject is usually the speaker, expressing \'I should have done... back then\'', examples: '나 그때 고백할 걸 그랬어 / 저 그거 살 걸 그랬어요' },
      { type: 'compare', text: '和 -을 걸（省略 그랬다）：完整形对听者说话，省略形自言自语', textEn: 'With -을 걸 (omitting 그랬다): full form for speaking to a listener, shortened form for self-talk', examples: '갈 걸 그랬어요（跟朋友说）/ 갈걸…（一个人叹气）', examplesEn: '갈 걸 그랬어요 (telling a friend) / 갈걸… (sighing alone)' },
      { type: 'note', text: '和 -았/었더라면 的区别：这里是"我没做"，那里是"当时的情况如果……"', textEn: 'Difference from -았/었더라면: here it\'s \'I didn\'t do it,\' there it\'s \'if the situation had been...\'', examples: '살 걸 그랬어（我没买）/ 그때 값이 쌌더라면（当时价格如果便宜）', examplesEn: '살 걸 그랬어 (I didn\'t buy it) / 그때 값이 쌌더라면 (if the price had been cheap then)' },
      { type: 'compare', text: '当心同形 -을걸：本课后悔义讲"过去没做"、语调下降；另有一个推测义 -을걸（"大概……吧"）讲现在/将来猜测、语调上扬，是完全不同的用法（后面章节详学）。', textEn: 'Beware of the homonym -을걸: this lesson\'s regret meaning refers to \'not doing in the past\' with falling intonation; another meaning -을걸 (\'probably...\') is for guessing about present/future with rising intonation—completely different usage (detailed in later chapters).', examples: '그때 살걸…（后悔·下降：当时早该买）/ 지금쯤 비쌀걸?（推测·上扬：现在大概挺贵吧）', examplesEn: '그때 살걸… (regret·falling: should\'ve bought it then) / 지금쯤 비쌀걸? (guess·rising: it\'s probably expensive by now, right?)' },
      { type: 'example', text: '전화할 걸 그랬어요 / 미리 예약할 걸 그랬어요 / 참을걸…' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '일찍', role: 'plain' },
          { text: '잘 걸 그랬어요', role: 'verb' },
        ],
        zh: '昨天要是早点睡就好了。', zhEn: 'If only I had gone to bed earlier yesterday.',
        swapWords: ['잘 걸 그랬어요', '나올 걸 그랬어요', '쉴 걸 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그때', role: 'time' },
          { text: '그 옷을', role: 'object' },
          { text: '살 걸 그랬어요', role: 'verb' },
        ],
        zh: '当时要是买了那件衣服就好了。', zhEn: 'I should have bought that outfit back then.',
        swapWords: ['그 옷을', '그 가방을', '그 신발을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '더', role: 'plain' },
          { text: '공부할 걸 그랬어요', role: 'verb' },
        ],
        zh: '当时要是多学点韩语就好了。', zhEn: 'I should have studied more Korean back then.',
        swapWords: ['공부할 걸 그랬어요', '연습할 걸 그랬어요', '읽을 걸 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아까', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹을 걸 그랬어요', role: 'verb' },
        ],
        zh: '刚才要是吃饭就好了。', zhEn: 'I should have eaten earlier.',
        swapWords: ['먹을 걸 그랬어요', '주문할 걸 그랬어요', '시킬 걸 그랬어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '💤', context: '熬夜后悔', contextEn: 'Regretting staying up late', ko: '어제 일찍 잘 걸 그랬어요. 오늘 너무 피곤해요.', zh: '昨天要是早点睡就好了，今天太累了。', zhEn: 'I should have gone to bed earlier last night; I\'m so tired today.' },
      { icon: '🛍️', context: '错过打折', contextEn: 'Missing a sale', ko: '그 옷 세일할 때 살 걸 그랬어.', zh: '那件衣服打折的时候要是买了就好了。', zhEn: 'I should have bought that outfit when it was on sale.' },
      { icon: '📞', context: '错过联系', contextEn: 'Missing a call', ko: '그때 전화할 걸 그랬어요.', zh: '当时要是打了电话就好了。', zhEn: 'I should have called back then.' },
      { icon: '📚', context: '学习后悔', contextEn: 'Regret about studying', ko: '시험 전에 좀 더 공부할 걸 그랬어요.', zh: '考试前要是多学点就好了。', zhEn: 'I should have studied more before the exam.' },
      { icon: '🌂', context: '出门叹气', contextEn: 'Sighing on the way out', ko: '우산을 챙길걸…', zh: '要带把伞出来的……', zhEn: 'I should\'ve brought an umbrella...' },
      { icon: '🍽️', context: '点单后悔', contextEn: 'Regretting an order', ko: '다른 걸 시킬 걸 그랬어. 이거 별로예요.', zh: '要是点别的就好了，这个一般。', zhEn: 'I should have ordered something else; this is just okay.' },
    ],
    mistakes: [
      { wrong: '그 옷을 사을 걸 그랬어요', correct: '그 옷을 살 걸 그랬어요', note: '사다 无收音 → ㄹ 걸，直接 살 걸。有收音才用 을 걸。', noteEn: 'If the stem ends in a vowel, use ㄹ 걸, so it becomes 살 걸. Use 을 걸 only when there\'s a final consonant.' },
      { wrong: '먹ㄹ 걸 그랬어요', correct: '먹을 걸 그랬어요', note: '먹다 有收音 ㄱ → 을 걸，不能用 ㄹ 걸。', noteEn: '먹다 has the final consonant ㄱ, so use 을 걸, not ㄹ 걸.' },
      { wrong: '친구가 갈 걸 그랬어요', correct: '내가 갈 걸 그랬어요', note: '主语必须是说话人自己。第三人称的后悔用别的表达（-았어야 했는데 等）。', noteEn: 'The subject must be the speaker. For third-person regret, use other expressions like -았어야 했는데.' },
      { wrong: '내일 일찍 일어날 걸 그랬어요', correct: '어제 일찍 일어날 걸 그랬어요', note: '-을 걸 그랬다 是对过去行为的后悔，不能配未来时间词。', noteEn: '-을 걸 그랬다 expresses regret about a past action and can\'t be used with future time words.' },
    ],
    quickTable: {
      title: '-을/ㄹ 걸 그랬다 变形速查', titleEn: '-을/ㄹ 걸 그랬다 conjugation quick reference',
      body: '看词干收音选 을 걸 或 ㄹ 걸。', bodyEn: 'Choose 을 걸 or ㄹ 걸 based on the stem\'s final consonant.',
      headers: ['原形', '词干', '收音', '完整形态'],
      rows: [
        ['가다', '가', { ko: '무받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '갈 걸 그랬다', zh: '当时该去的', zhEn: 'should have gone then' }],
        ['먹다', '먹', { ko: 'ㄱ 있음', zh: '有收音', zhEn: 'Has a final consonant' }, { ko: '먹을 걸 그랬다', zh: '当时该吃的', zhEn: 'should have eaten then' }],
        ['사다', '사', { ko: '무받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '살 걸 그랬다', zh: '当时该买的', zhEn: 'should have bought then' }],
        ['공부하다', '공부하', { ko: '무받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '공부할 걸 그랬다', zh: '当时该学的', zhEn: 'should have studied then' }],
        ['앉다', '앉', { ko: 'ㄵ 있음', zh: '有收音', zhEn: 'Has a final consonant' }, { ko: '앉을 걸 그랬다', zh: '当时该坐下的', zhEn: 'should have sat down then' }],
        ['살다', '살', { ko: 'ㄹ 词干', zh: 'ㄹ 保留', zhEn: 'ㄹ retention' }, { ko: '살 걸 그랬다', zh: '当时该住的', zhEn: 'should have stayed then' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ 걸 그랬다 变形练习', titleEn: '-을/ㄹ 걸 그랬다 conjugation practice',
      body: '根据词干末字选出正确的后悔表达。', bodyEn: 'Choose the correct regret expression based on the stem\'s final letter.',
      questions: [
        {
          prompt: '"当时要是早点睡就好了" → 어제 일찍 ___.', promptEn: '"I wish I had gone to bed earlier" → 어제 일찍 ___.',
          options: ['자을 걸 그랬어요', '잘 걸 그랬어요', '자 걸 그랬어요', '잤 걸 그랬어요'],
          answer: 1,
          explanation: '자다 无收音词干 자 → ㄹ 걸 → 잘 걸 그랬어요。', explanationEn: '자다 has no final consonant, stem 자 → ㄹ 걸 → 잘 걸 그랬어요.',
        },
        {
          prompt: '"当时要是多吃点就好了" → 좀 더 ___.', promptEn: '"I wish I had eaten more" → 좀 더 ___.',
          options: ['먹ㄹ 걸 그랬어요', '먹 걸 그랬어요', '먹을 걸 그랬어요', '먹었을 걸 그랬어요'],
          answer: 2,
          explanation: '먹다 有收音 ㄱ → 을 걸 → 먹을 걸 그랬어요。', explanationEn: '먹다 has final consonant ㄱ → 을 걸 → 먹을 걸 그랬어요.',
        },
        {
          prompt: '"当时要是学韩语就好了" → 한국어를 ___.', promptEn: '"I wish I had studied Korean" → 한국어를 ___.',
          options: ['공부할 걸 그랬어요', '공부하을 걸 그랬어요', '공부한 걸 그랬어요', '공부했을 걸 그랬어요'],
          answer: 0,
          explanation: '공부하다 → 词干 공부하 无收音 → ㄹ 걸 → 공부할 걸 그랬어요。', explanationEn: '공부하다 → stem 공부하 has no final consonant → ㄹ 걸 → 공부할 걸 그랬어요.',
        },
        {
          prompt: '关于 -을/ㄹ 걸 그랬다 的用法，哪句最准确？', promptEn: 'Which sentence best describes the usage of -을/ㄹ 걸 그랬다?',
          options: [
            '主语可以是任何人称，表达任何后悔',
            '主语通常是说话人自己，表达"我没做某事"的后悔',
            '主语必须是第三人称，用于评论别人',
            '用于表达对未来的期待',
          ],
          answer: 1,
          explanation: '-을 걸 그랬다 主语通常是说话人自己，表达对自己"当时没做"的后悔。', explanationEn: '-을 걸 그랬다 usually has the speaker as the subject, expressing regret about something they didn\'t do.',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l01', 'card-p21-l03'],
    step0Html: `<div class="card-title">-을/ㄹ 걸 그랬다</div>
<div class="card-body">"早知道当时……了" —— 对自己没做的事情后悔。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">完整形 vs 省略形</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">完整形（对听话人说）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 잘 걸 그랬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当时要是早点睡就好了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">省略形（自言自语）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 잘걸…</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">哎，要早点睡的……（叹气）</div>
    </div>
  </div>
</div>
<div class="reminder-box">主语几乎只是说话人自己。想说"我当时该……"就用这个。</div>`,
    compareHtml: `<div class="card-title">-을 걸 그랬다 vs -았더라면</div>
<div class="card-body">两个都表达后悔，但视角完全不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을 걸 그랬다 → 自己没做的后悔</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">主语是"我"，聚焦"我当时的选择"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 옷을 살 걸 그랬어요.</span><span style="font-size:16px;color:#5a4640">当时要是买了就好了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었더라면 → 反事实假设</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">对任何过去情况假设，后半句必接结果</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 옷을 샀더라면 좋았을 텐데요.</span><span style="font-size:16px;color:#5a4640">当时要是买了的话就好了。</span></div>
  </div>
</div>
<div class="reminder-box">简单说：-을 걸 그랬다 是懊悔感叹，-았더라면 是完整的假设+结果句。</div>`,
    compareLabel: '-을 걸 그랬다 vs -았더라면',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 2 课</div>
    <div class="ov-hero-title">-을/ㄹ 걸 그랬다</div>
    <div class="ov-hero-sub">"早知道就……了" · 对自己当时没做的后悔</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ 걸 그랬다</b>：갈 걸 · 살 걸 · 할 걸<br>
        有收音 → <b style="color:#2db89b">을 걸 그랬다</b>：먹을 걸 · 읽을 걸<br>
        口语省略 → <b style="color:#6b7ff0">-을걸/ㄹ걸</b>（拖音自叹）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        일찍 잘 걸 그랬어요.（当时该早点睡的）<br>
        그 옷을 살 걸 그랬어요.（当时该买那件的）<br>
        우산을 챙길걸…（要带把伞的……）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사을 걸 그랬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">살 걸 그랬어요（无收音用 ㄹ 걸）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구가 갈 걸 그랬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">내가 갈 걸 그랬어요（主语必须是说话人自己）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第3课：-지 말 걸 그랬다 ────────────────────────────────
  {
    id: 'card-p21-l03',
    partNumber: 21,
    lessonNumber: 3,
    title: '-지 말 걸 그랬다',
    whatItDoes: '早知道就不该……（后悔做了）', whatItDoesEn: 'I shouldn\'t have... (regret for doing)',
    whatItDoesBody: '和上一课的 -을 걸 그랬다 相反，这个表示"我当时不该做的"的后悔。\n结构：动词词干 + 지 말 걸 그랬다，其中 말다 = 不要（禁止/停止）。\n口语常缩略为 -지 말걸，带自责语气。', whatItDoesBodyEn: 'The opposite of -을 걸 그랬다 from the previous lesson; this expresses regret about "something I shouldn\'t have done".\\nStructure: verb stem + 지 말 걸 그랬다, where 말다 = not do (prohibit/stop).\\nIn speech, it\'s often shortened to -지 말걸, with a self-blaming tone.',
    structureNote: '结构：动词词干 + 지 말 걸 그랬다。\n말다 是"停止/不做"的动词，加 -을 걸 → 말 걸。\n可看作 -을 걸 그랬다 的否定版本。', structureNoteEn: 'Structure: verb stem + 지 말 걸 그랬다.\\n말다 is the verb for "stop/not do", plus -을 걸 → 말 걸.\\nIt can be seen as the negative version of -을 걸 그랬다.',
    rulesNote: '"应该做没做" → -을 걸 그랬다\n"做了不该做" → -지 말 걸 그랬다\n两个语法配对使用，成对记忆最快。', rulesNoteEn: '"Should have done but didn\'t" → -을 걸 그랬다\\n"Did something I shouldn\'t have" → -지 말 걸 그랬다\\nThese two grammar points are a pair; memorizing them together is fastest.',
    structures: [
      {
        ko: '어제 그렇게 많이 먹지 말 걸 그랬어요',
        zh: '昨天要是没吃那么多就好了。', zhEn: 'I wish I hadn\'t eaten so much yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '그렇게 많이', role: 'plain' },
          { text: '먹지 말 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람한테 그런 말을 하지 말 걸 그랬어요',
        zh: '当时要是没对那个人说那种话就好了。', zhEn: 'I wish I hadn\'t said that to that person then.',
        tokens: [
          { text: '그 사람한테', role: 'plain' },
          { text: '그런 말을', role: 'object' },
          { text: '하지 말 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '늦게까지 게임하지 말 걸 그랬어요',
        zh: '当时不该玩游戏玩到那么晚的。', zhEn: 'I shouldn\'t have played games so late then.',
        tokens: [
          { text: '늦게까지', role: 'time' },
          { text: '게임하지 말 걸 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '괜히 화내지 말걸…',
        zh: '哎，当时不该发火的……', zhEn: 'Ugh, I shouldn\'t have gotten angry then...',
        tokens: [
          { text: '괜히', role: 'plain' },
          { text: '화내지 말걸', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 지 말 걸 그랬다', textEn: 'Verb stem + 지 말 걸 그랬다', examples: '먹다→먹지 말 걸 그랬다 / 가다→가지 말 걸 그랬다 / 사다→사지 말 걸 그랬다' },
      { type: 'rule', text: '不看收音，所有动词接法一样', textEn: 'Regardless of the final consonant, all verbs conjugate the same way', examples: '하다→하지 말 걸 / 읽다→읽지 말 걸 / 만들다→만들지 말 걸' },
      { type: 'usage', text: '主语通常是说话人自己，后悔自己做了不该做的事', textEn: 'The subject is usually the speaker, regretting something they shouldn\'t have done', examples: '내가 그때 화내지 말 걸 그랬어 / 저 그거 사지 말 걸 그랬어요' },
      { type: 'compare', text: '和 -을 걸 그랬다 成对：应该做没做 vs 做了不该做', textEn: 'Pairs with -을 걸 그랬다: should have done but didn\'t vs. did something you shouldn\'t have', examples: '전화할 걸 그랬어요（应该打没打）/ 전화하지 말 걸 그랬어요（打了不该打）', examplesEn: '전화할 걸 그랬어요 (should have called but didn\'t) / 전화하지 말 걸 그랬어요 (called when you shouldn\'t have)' },
      { type: 'note', text: '常和"괜히、공연히（白白地）"等副词搭配，加强懊悔语气', textEn: 'Often used with adverbs like "괜히, 공연히 (in vain)" to strengthen the regretful tone', examples: '괜히 말하지 말 걸… / 공연히 사지 말 걸…' },
      { type: 'compare', text: '和 -지 말았어야 했는데 意思相近：本课偏个人懊悔、口语；-지 말았어야 했는데 带"本不该·义务责任"语气、更书面（是第4课 -았/었어야 했는데 的否定版，后面章节详学）。', textEn: 'Similar to -지 말았어야 했는데: this lesson focuses on personal regret, colloquial; -지 말았어야 했는데 carries a "shouldn\'t have, obligation" tone, more formal (it\'s the negative version of -았/었어야 했는데 from Lesson 4, covered in detail later).', examples: '그런 말 하지 말 걸 그랬어요（个人后悔）/ 그런 말 하지 말았어야 했는데（本就不该说，责任语气）', examplesEn: '그런 말 하지 말 걸 그랬어요 (personal regret) / 그런 말 하지 말았어야 했는데 (shouldn\'t have said it at all, obligation tone)' },
      { type: 'note', text: '只能接动词，不能接形容词', textEn: 'Can only attach to verbs, not adjectives', examples: '예쁘지 말 걸 그랬어요 ✗（形容词不能用）', examplesEn: '예쁘지 말 걸 그랬어요 ✗ (can\'t use with adjectives)' },
      { type: 'example', text: '먹지 말 걸 그랬어요 / 늦잠 자지 말 걸 그랬어요 / 그런 말 하지 말걸…' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '많이', role: 'plain' },
          { text: '먹지 말 걸 그랬어요', role: 'verb' },
        ],
        zh: '昨天要是没吃那么多就好了。', zhEn: 'I wish I hadn\'t eaten so much yesterday.',
        swapWords: ['먹지 말 걸 그랬어요', '마시지 말 걸 그랬어요', '시키지 말 걸 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그런 말을', role: 'object' },
          { text: '하지 말 걸 그랬어요', role: 'verb' },
        ],
        zh: '当时要是没说那种话就好了。', zhEn: 'I wish I hadn\'t said that back then.',
        swapWords: ['하지 말 걸 그랬어요', '꺼내지 말 걸 그랬어요', '말하지 말 걸 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '괜히', role: 'plain' },
          { text: '그 영화를', role: 'object' },
          { text: '보지 말 걸 그랬어요', role: 'verb' },
        ],
        zh: '白白地看了那部电影，真不该看。', zhEn: 'I watched that movie for nothing—I really shouldn\'t have.',
        swapWords: ['그 영화를', '그 드라마를', '그 뉴스를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '늦게까지', role: 'time' },
          { text: '게임하지 말 걸 그랬어요', role: 'verb' },
        ],
        zh: '当时不该玩游戏玩到那么晚。', zhEn: 'I shouldn\'t have played games that late back then.',
        swapWords: ['게임하지 말 걸 그랬어요', '유튜브 보지 말 걸 그랬어요', '깨어 있지 말 걸 그랬어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🤢', context: '吃撑后悔', contextEn: 'Regretting overeating', ko: '아, 그렇게 많이 먹지 말 걸 그랬어요.', zh: '啊，当时不该吃那么多的。', zhEn: 'Ah, I shouldn\'t have eaten that much.' },
      { icon: '💬', context: '说错话', contextEn: 'Saying the wrong thing', ko: '괜히 그런 말 하지 말걸.', zh: '哎，白说了那种话……', zhEn: 'Ugh, I said that for nothing...' },
      { icon: '📱', context: '沉迷手机', contextEn: 'Being glued to your phone', ko: '어제 새벽까지 폰 보지 말 걸 그랬어요.', zh: '昨天不该看手机看到凌晨的。', zhEn: 'I shouldn\'t have been on my phone until dawn yesterday.' },
      { icon: '💸', context: '冲动消费', contextEn: 'Impulse buying', ko: '괜히 이거 사지 말 걸 그랬어.', zh: '白白买了这个，不该买的。', zhEn: 'I bought this for nothing—I shouldn\'t have.' },
      { icon: '😡', context: '发火后悔', contextEn: 'Regretting losing your temper', ko: '그때 화내지 말 걸 그랬어요. 지금 후회돼요.', zh: '当时不该发火的，现在很后悔。', zhEn: 'I shouldn\'t have lost my temper then; I regret it now.' },
      { icon: '🎬', context: '踩雷电影', contextEn: 'A movie that was a total miss', ko: '이 영화 보지 말 걸 그랬어요. 완전 지루해요.', zh: '这部电影不该看的，太无聊。', zhEn: 'I shouldn\'t have watched this movie—it\'s so boring.' },
    ],
    mistakes: [
      { wrong: '어제 많이 먹을 걸 그랬어요（想表达"不该吃那么多"）', wrongEn: '어제 많이 먹을 걸 그랬어요 (trying to say "shouldn\'t have eaten that much")', correct: '어제 많이 먹지 말 걸 그랬어요', note: '"应该做没做"用 -을 걸 그랬다；"做了不该做"用 -지 말 걸 그랬다。方向完全相反，别搞反。', noteEn: '"Should have done but didn\'t" uses -을 걸 그랬다; "did something you shouldn\'t have" uses -지 말 걸 그랬다. The directions are completely opposite—don\'t mix them up.' },
      { wrong: '어제 많이 안 먹을 걸 그랬어요', correct: '어제 많이 먹지 말 걸 그랬어요', note: '短否定 안 + -을 걸 그랬다 组合不自然。"不该做"必须用 -지 말 걸 그랬다 固定形式，不能拆成 안 + 을 걸。', noteEn: 'The combination of short negation 안 + -을 걸 그랬다 is unnatural. For "shouldn\'t have done," you must use the fixed form -지 말 걸 그랬다; it can\'t be split into 안 + 을 걸.' },
      { wrong: '예쁘지 말 걸 그랬어요', correct: '-지 말 걸 그랬다 不接形容词', correctEn: '-지 말 걸 그랬다 doesn\'t take adjectives.', note: '-지 말 걸 그랬다 只接动词，不能接形容词。形容词表达当时状态用 -았/었더라면。', noteEn: '-지 말 걸 그랬다 only takes verbs, not adjectives. For adjectives describing a past state, use -았/었더라면.' },
      { wrong: '친구가 오지 말 걸 그랬어요（想说朋友不该来）', wrongEn: '친구가 오지 말 걸 그랬어요 (meaning "my friend shouldn\'t have come")', correct: '친구가 안 왔으면 좋았을 텐데요', note: '主语必须是说话人自己。评价别人的行为用 -았/었으면 좋았을 텐데。', noteEn: 'The subject must be the speaker themselves. To evaluate someone else\'s actions, use -았/었으면 좋았을 텐데.' },
    ],
    quickTable: {
      title: '成对记忆：-을 걸 그랬다 vs -지 말 걸 그랬다', titleEn: 'Memorize as a pair: -을 걸 그랬다 vs -지 말 걸 그랬다',
      body: '两个语法方向相反，配对记忆效率最高。', bodyEn: 'These two grammar points are opposite in direction, so memorizing them in pairs is most efficient.',
      headers: ['情况', '结构', '例句', '中文'],
      rows: [
        [{ ko: '应该做没做', zh: '后悔没做', zhEn: 'Regret not doing' }, { ko: '-을/ㄹ 걸 그랬다', zh: '무받침 ㄹ / 받침 을' }, { ko: '전화할 걸 그랬어요', zh: '当时该打的', zhEn: 'Should have called then' }, '当时应该打电话的（没打）'],
        [{ ko: '做了不该做', zh: '后悔做了', zhEn: 'Regret doing' }, { ko: '-지 말 걸 그랬다', zh: '统一接法', zhEn: 'Unified conjugation' }, { ko: '전화하지 말 걸 그랬어요', zh: '当时不该打的', zhEn: 'Shouldn\'t have called then' }, '当时不该打电话的（打了）'],
        [{ ko: '应该说没说', zh: '后悔没说', zhEn: 'Regret not saying' }, { ko: '-을 걸 그랬다', zh: '无收音+ㄹ 걸', zhEn: 'No batchim + ㄹ 걸' }, { ko: '말할 걸 그랬어요', zh: '当时该说的', zhEn: 'Should have said then' }, '当时应该说的（没说）'],
        [{ ko: '不该说说了', zh: '后悔说了', zhEn: 'Regret saying' }, { ko: '-지 말 걸 그랬다', zh: '否定式', zhEn: 'Negative form' }, { ko: '말하지 말 걸 그랬어요', zh: '当时不该说的', zhEn: 'Shouldn\'t have said then' }, '当时不该说的（说了）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을 걸 그랬다 还是 -지 말 걸 그랬다？', titleEn: '-을 걸 그랬다 or -지 말 걸 그랬다?',
      body: '根据后悔的方向选出正确表达。', bodyEn: 'Choose the correct expression based on the direction of regret.',
      questions: [
        {
          prompt: '"哎，昨天吃太多了，不该吃那么多的" → 어제 많이 ___.', promptEn: '"Ugh, I ate too much yesterday, I shouldn\'t have eaten that much" → 어제 많이 ___.',
          options: ['먹을 걸 그랬어요', '먹지 말 걸 그랬어요', '먹었으면 좋겠어요', '먹을 뻔했어요'],
          answer: 1,
          explanation: '"吃了不该吃" → -지 말 걸 그랬다。먹지 말 걸 그랬어요。', explanationEn: '"Ate what shouldn\'t have been eaten" → -지 말 걸 그랬다. 먹지 말 걸 그랬어요.',
        },
        {
          prompt: '"当时要是打电话就好了（我没打）" → 그때 ___.', promptEn: '"I wish I had called then (but I didn\'t)" → 그때 ___.',
          options: ['전화하지 말 걸 그랬어요', '전화한 걸 그랬어요', '전화할 걸 그랬어요', '전화했으면 그랬어요'],
          answer: 2,
          explanation: '"应该做没做" → -을 걸 그랬다。전화하다 → 전화할 걸 그랬어요。', explanationEn: '"Should have done but didn\'t" → -을 걸 그랬다. 전화하다 → 전화할 걸 그랬어요.',
        },
        {
          prompt: '"当时不该说那种话的（我说了）" → 그런 말을 ___.', promptEn: '"I shouldn\'t have said that then (but I did)" → 그런 말을 ___.',
          options: ['할 걸 그랬어요', '한 걸 그랬어요', '하지 말 걸 그랬어요', '했으면 좋겠어요'],
          answer: 2,
          explanation: '"做了不该做" → -지 말 걸 그랬다。하다 → 하지 말 걸 그랬어요。', explanationEn: '"Did something I shouldn\'t have" → -지 말 걸 그랬다. 하다 → 하지 말 걸 그랬어요.',
        },
        {
          prompt: '关于 -지 말 걸 그랬다，哪句最准确？', promptEn: 'Regarding -지 말 걸 그랬다, which is most accurate?',
          options: [
            '可以接动词也可以接形容词',
            '只能接动词，主语通常是说话人自己',
            '主语必须是第三人称',
            '表达对未来行为的规划',
          ],
          answer: 1,
          explanation: '-지 말 걸 그랬다 只能接动词，主语通常是说话人自己，表达"我当时做了不该做的事"的后悔。', explanationEn: '-지 말 걸 그랬다 only attaches to verbs, the subject is usually the speaker, expressing regret over "something I did that I shouldn\'t have."',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l02', 'card-p21-l04'],
    step0Html: `<div class="card-title">-지 말 걸 그랬다</div>
<div class="card-body">"当时不该……的" —— 对自己已经做了的事情后悔。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">成对语法：应该做没做 vs 做了不该做</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">应该做没做（第2课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 잘 걸 그랬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当时该早点睡的（没睡）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">做了不该做（这一课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">늦게까지 게임하지 말 걸 그랬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当时不该玩游戏玩到那么晚（玩了）</div>
    </div>
  </div>
</div>
<div class="reminder-box">这两个语法方向相反。搞错方向意思就完全颠倒了。</div>`,
    compareHtml: `<div class="card-title">-을 걸 그랬다 vs -지 말 걸 그랬다</div>
<div class="card-body">同一件事，站在"该做没做"还是"做了不该做"的角度，用两个语法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 걸 그랬다 → 后悔没做</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">当时应该做，但我没做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 옷을 살 걸 그랬어요.</span><span style="font-size:16px;color:#5a4640">当时该买那件的（我没买）</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지 말 걸 그랬다 → 后悔做了</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">当时不该做，但我做了</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 옷을 사지 말 걸 그랬어요.</span><span style="font-size:16px;color:#5a4640">当时不该买那件的（我买了）</span></div>
  </div>
</div>
<div class="reminder-box">写作/口语中经常成对使用，把两个方向都能表达出来才算掌握。</div>`,
    compareLabel: '-을 걸 그랬다 vs -지 말 걸 그랬다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 3 课</div>
    <div class="ov-hero-title">-지 말 걸 그랬다</div>
    <div class="ov-hero-sub">"当时不该……的" · 对做了的事情后悔</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词词干 + <b style="color:#ff7fa8">지 말 걸 그랬다</b><br>
        不区分收音，所有动词一样接。<br>
        只接动词，不接形容词。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        많이 먹지 말 걸 그랬어요.（不该吃那么多）<br>
        그런 말 하지 말 걸 그랬어요.（不该说那种话）<br>
        늦게까지 게임하지 말 걸 그랬어요.（不该玩游戏玩太晚）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹을 걸 그랬어요（想说"不该吃那么多"）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹지 말 걸 그랬어요（做了不该做）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁘지 말 걸 그랬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">只接动词，形容词不能用</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第4课：-았/었어야 했는데 ────────────────────────────────
  {
    id: 'card-p21-l04',
    partNumber: 21,
    lessonNumber: 4,
    title: '-았/었어야 했는데',
    whatItDoes: '本来应该……的（懊悔+义务感）', whatItDoesEn: 'I should have... (regret + sense of obligation)',
    whatItDoesBody: '表达"本来应当做某事，但实际上没做"的懊悔。\n和 -을 걸 그랬다 类似但语气更强：不仅是后悔，还带有"本来是义务/责任"的语感。\n后半句常省略，或接 -지 못했어요 / 못 했어요 表达实际结果。', whatItDoesBodyEn: 'Expresses regret that something should have been done but wasn\'t. Similar to -을 걸 그랬다 but stronger: not just regret, but a sense of obligation or duty. The second half is often omitted, or followed by -지 못했어요 / 못 했어요 to state the actual outcome.',
    structureNote: '结构：动词过去词干（-았/었-）+ 어야 했는데。\n可看作 -아/어야 하다（必须）的过去+回忆形态。\n主语可以是自己也可以是别人，比 -을 걸 그랬다 灵活。', structureNoteEn: 'Structure: verb past stem (-았/었-) + 어야 했는데. Can be seen as the past + retrospective form of -아/어야 하다 (must). The subject can be oneself or others, making it more flexible than -을 걸 그랬다.',
    rulesNote: '判断口诀：既有"没做"的懊悔，又有"本该是义务"的意味。\n-을 걸 그랬다 偏个人愿望，-았어야 했는데 偏责任义务。\n对别人评价时也用这个：너 그때 갔어야 했는데（你当时该去的）。', rulesNoteEn: 'Quick tip: it combines regret for not doing something with a sense of obligation. -을 걸 그랬다 leans toward personal wish, while -았어야 했는데 leans toward duty. It\'s also used to judge others: 너 그때 갔어야 했는데 (You should have gone then).',
    structures: [
      {
        ko: '어제 일찍 잤어야 했는데 못 잤어요',
        zh: '昨天本来该早睡的，没睡成。', zhEn: 'I should have gone to bed early last night, but I didn\'t.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '일찍', role: 'plain' },
          { text: '잤어야 했는데', role: 'verb' },
          { text: '못 잤어요', role: 'verb' },
        ],
      },
      {
        ko: '너 그때 사과했어야 했는데',
        zh: '你当时本来该道歉的。', zhEn: 'You should have apologized then.',
        tokens: [
          { text: '너', role: 'subject' },
          { text: '그때', role: 'time' },
          { text: '사과했어야 했는데', role: 'verb' },
        ],
      },
      {
        ko: '이 자료를 미리 준비했어야 했는데 시간이 없었어요',
        zh: '本该提前准备好这份资料的，可没时间。', zhEn: 'I should have prepared this document in advance, but I didn\'t have time.',
        tokens: [
          { text: '이 자료를', role: 'object' },
          { text: '미리', role: 'plain' },
          { text: '준비했어야 했는데', role: 'verb' },
          { text: '시간이 없었어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마한테 전화했어야 했는데 깜빡했어요',
        zh: '本来该给妈妈打电话的，忘了。', zhEn: 'I should have called Mom, but I forgot.',
        tokens: [
          { text: '엄마한테', role: 'plain' },
          { text: '전화했어야 했는데', role: 'verb' },
          { text: '깜빡했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词过去词干 + 어야 했는데', textEn: 'Verb past stem + 어야 했는데', examples: '가다→갔어야 했는데 / 먹다→먹었어야 했는데 / 하다→했어야 했는데' },
      { type: 'rule', text: '形容词也可用，表示当时状态本该如此', textEn: 'Adjectives also work, meaning the state should have been so at the time.', examples: '조용했어야 했는데（当时本该安静）/ 친절했어야 했는데（当时本该亲切）', examplesEn: '조용했어야 했는데 (should have been quiet then) / 친절했어야 했는데 (should have been kind then)' },
      { type: 'usage', text: '主语可以是自己也可以是别人，比 -을 걸 그랬다 灵活', textEn: 'The subject can be oneself or others, more flexible than -을 걸 그랬다.', examples: '내가 갔어야 했는데（我该去）/ 너 왔어야 했는데（你该来）', examplesEn: '내가 갔어야 했는데 (I should have gone) / 너 왔어야 했는데 (you should have come)' },
      { type: 'usage', text: '后半句常接 -지 못했다 / 못 -았다 说明实际没做', textEn: 'The second clause often uses -지 못했다 / 못 -았다 to show it wasn\'t actually done.', examples: '전화했어야 했는데 못 했어요 / 갔어야 했는데 시간이 없었어요' },
      { type: 'compare', text: '和 -을 걸 그랬다 的区别：这里有"义务/责任感"，那里是"个人愿望"', textEn: 'Difference from -을 걸 그랬다: this has a sense of duty/responsibility, that is personal wish.', examples: '사과했어야 했는데（本是责任）/ 사과할 걸 그랬어요（我个人后悔没做）', examplesEn: '사과했어야 했는데 (it was my duty) / 사과할 걸 그랬어요 (I personally regret not doing it)' },
      { type: 'note', text: '常独立作为独立句，后半句省略也可', textEn: 'Often stands alone as an independent sentence; the second clause can be omitted.', examples: '아, 그때 도와줬어야 했는데… / 미리 알렸어야 했는데…' },
      { type: 'note', text: '两处都要过去：前半 -았어야（本该）+ 后半 -했는데（过去回想·实际没做），两个"过去"缺一不可。丢掉后一个变 -았어야 하는데（现在时）就没了懊悔味，只剩"现在得做"。', textEn: 'Both parts need past tense: first -았어야 (should have) + second -했는데 (past reflection, didn\'t actually do). Both "pasts" are essential. Dropping the latter to -았어야 하는데 (present) loses the regret and just means "need to do now."', examples: '갔어야 했는데（本该去·没去，懊悔）✓ / 갔어야 하는데（现在还得去）✗语气不对', examplesEn: '갔어야 했는데 (should have gone, didn\'t, regret) ✓ / 갔어야 하는데 (still need to go now) ✗ wrong tone' },
      { type: 'rule', text: '"本不该做却做了"的否定：动词 + 지 말았어야 했는데', textEn: 'Negation for "shouldn\'t have done but did": verb + 지 말았어야 했는데', examples: '그 말을 하지 말았어야 했는데 / 늦게까지 게임하지 말았어야 했는데' },
      { type: 'example', text: '전화했어야 했는데 / 미리 예약했어야 했는데 / 좀 더 참았어야 했는데' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '일찍', role: 'plain' },
          { text: '잤어야 했는데', role: 'verb' },
        ],
        zh: '昨天本来该早睡的。', zhEn: 'I should have gone to bed early last night.',
        swapWords: ['잤어야 했는데', '나왔어야 했는데', '쉬었어야 했는데'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '너', role: 'subject' },
          { text: '그때', role: 'time' },
          { text: '사과했어야 했는데', role: 'verb' },
        ],
        zh: '你当时本来该道歉的。', zhEn: 'You should have apologized then.',
        swapWords: ['사과했어야 했는데', '말했어야 했는데', '설명했어야 했는데'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '엄마한테', role: 'plain' },
          { text: '전화했어야 했는데', role: 'verb' },
          { text: '깜빡했어요', role: 'verb' },
        ],
        zh: '本来该给妈妈打电话的，忘了。', zhEn: 'I should have called Mom, but I forgot.',
        swapWords: ['엄마한테', '아빠한테', '친구한테'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 자료를', role: 'object' },
          { text: '미리', role: 'plain' },
          { text: '준비했어야 했는데', role: 'verb' },
        ],
        zh: '本该提前准备好这份资料的。', zhEn: 'I should have prepared this document in advance.',
        swapWords: ['준비했어야 했는데', '확인했어야 했는데', '검토했어야 했는데'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '💤', context: '缺乏睡眠', contextEn: 'Lack of sleep', ko: '어제 일찍 잤어야 했는데 게임하다가 못 잤어요.', zh: '昨天本该早睡，玩游戏没睡成。', zhEn: 'I should have gone to bed early last night, but I played games instead.' },
      { icon: '🙇', context: '责任反省', contextEn: 'Reflecting on responsibility', ko: '내가 그때 사과했어야 했는데 그러지 못했어요.', zh: '当时本该我道歉，我没做到。', zhEn: 'I should have apologized then, but I didn\'t.' },
      { icon: '📞', context: '忘打电话', contextEn: 'Forgot to call', ko: '엄마한테 전화했어야 했는데 깜빡했어요.', zh: '本该给妈妈打电话，忘了。', zhEn: 'I should have called Mom, but I forgot.' },
      { icon: '📋', context: '工作失误', contextEn: 'Work mistake', ko: '보고서를 미리 확인했어야 했는데 못 했습니다.', zh: '本该提前确认报告，没能做到。', zhEn: 'I should have checked the report in advance, but I didn\'t.' },
      { icon: '⚠️', context: '警告朋友', contextEn: 'Warning a friend', ko: '너 그때 조심했어야 했는데.', zh: '你当时本该小心的。', zhEn: 'You should have been careful then.' },
      { icon: '🎁', context: '错过关心', contextEn: 'Missed care', ko: '친구 생일에 연락했어야 했는데 잊어버렸어요.', zh: '朋友生日本该联系的，忘了。', zhEn: 'I should have contacted my friend on their birthday, but I forgot.' },
    ],
    mistakes: [
      { wrong: '내일 일찍 잤어야 했는데', correct: '내일 일찍 자야 해요', note: '-았어야 했는데 只用于过去反省。未来义务用 -아야 하다 现在时。', noteEn: '-았어야 했는데 is only for past regret. Future obligation uses -아야 하다 in present tense.' },
      { wrong: '가야 했는데', correct: '갔어야 했는데', note: '必须是过去词干 -았/었-。가야 했는데 只是"当时得去"事实陈述，不含懊悔。', noteEn: 'Must use past stem -았/었-. 가야 했는데 is just a factual statement of "had to go," without regret.' },
      { wrong: '전화하야 했는데', correct: '전화했어야 했는데', note: '하다 → 했어야 했는데（缩合 하+였=했）。전화하야 是不存在的形式。', noteEn: '하다 → 했어야 했는데 (contraction 하+였=했). 전화하야 is not a valid form.' },
      { wrong: '했어야 했는데요 그런데 못 했어요', correct: '했어야 했는데 못 했어요', note: '-았어야 했는데 本身就是连接形，后面直接接实际结果，不加"그런데"。', noteEn: '-았어야 했는데 is already a connective form; directly add the actual result without "그런데."' },
    ],
    quickTable: {
      title: '-았/었어야 했는데 变形速查', titleEn: '-았/었어야 했는데 Conjugation Quick Reference',
      body: '按词类和末字选正确过去词干。', bodyEn: 'Choose the correct past stem based on word class and final letter.',
      headers: ['原形', '类型', '过去词干', '完整形态'],
      rows: [
        ['가다', '动词无收音', { ko: '갔-', zh: '가+았→갔' }, { ko: '갔어야 했는데', zh: '本该去的', zhEn: 'Should have gone' }],
        ['먹다', '动词有收音', { ko: '먹었-', zh: '먹+었' }, { ko: '먹었어야 했는데', zh: '本该吃的', zhEn: 'Should have eaten' }],
        ['하다', '하다类', { ko: '했-', zh: '하+였→했' }, { ko: '했어야 했는데', zh: '本该做的', zhEn: 'Should have done' }],
        ['참다', '动词有收音', { ko: '참았-', zh: '참+았' }, { ko: '참았어야 했는데', zh: '本该忍的', zhEn: 'Should have endured' }],
        ['조용하다', '形容词', { ko: '조용했-', zh: '하다类', zhEn: '하다 type' }, { ko: '조용했어야 했는데', zh: '本该安静的', zhEn: 'Should have been quiet' }],
        ['알다', 'ㄹ 词干', { ko: '알았-', zh: 'ㄹ保留+았', zhEn: 'ㄹ retained +았' }, { ko: '알았어야 했는데', zh: '本该知道的', zhEn: 'Should have known' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-았/었어야 했는데 变形练习', titleEn: '-았/었어야 했는데 Conjugation Practice',
      body: '根据语境选出正确形态。', bodyEn: 'Choose the correct form based on context.',
      questions: [
        {
          prompt: '"本来该给妈妈打电话的" → 엄마한테 ___ 깜빡했어요.', promptEn: '"I should have called Mom" → 엄마한테 ___ 깜빡했어요.',
          options: ['전화하야 했는데', '전화했어야 했는데', '전화할 했는데', '전화하고 했는데'],
          answer: 1,
          explanation: '하다 → 했어야 했는데（하+였=했）。전화하다 → 전화했어야 했는데。',
        },
        {
          prompt: '"你当时本该道歉的" → 너 그때 ___.', promptEn: '"You should have apologized then" → 너 그때 ___.',
          options: ['사과할 걸 그랬어', '사과하야 했는데', '사과했어야 했는데', '사과하지 말 걸 그랬어'],
          answer: 2,
          explanation: '对别人表达"本该做"的义务反省用 -았/었어야 했는데。사과하다 → 사과했어야 했는데。', explanationEn: 'Use -았/었어야 했는데 to express regret about an obligation you should have fulfilled. 사과하다 → 사과했어야 했는데.',
        },
        {
          prompt: '"本来该忍住的" → 그때 좀 더 ___.', promptEn: '"I should have held it in" → 그때 좀 더 ___.',
          options: ['참았어야 했는데', '참어야 했는데', '참을 걸 그랬는데', '참하야 했는데'],
          answer: 0,
          explanation: '참다 有收音末元音 ㅏ → 참+았 → 참았어야 했는데。', explanationEn: '참다 has a final consonant and vowel ㅏ → 참+았 → 참았어야 했는데.',
        },
        {
          prompt: '关于 -았어야 했는데 vs -을 걸 그랬다，哪句最准确？', promptEn: 'Regarding -았어야 했는데 vs -을 걸 그랬다, which is most accurate?',
          options: [
            '两者意思完全相同',
            '-았어야 했는데 带义务/责任感；-을 걸 그랬다 偏个人愿望',
            '-았어야 했는데 用于未来；-을 걸 그랬다 用于过去',
            '-았어야 했는데 只用第三人称',
          ],
          answer: 1,
          explanation: '-았어야 했는데 强调"本是义务/责任"，-을 걸 그랬다 更偏"我个人愿望没实现"。前者语气更重。', explanationEn: '-았어야 했는데 emphasizes "it was a duty/responsibility," while -을 걸 그랬다 leans more toward "my personal wish wasn\'t fulfilled." The former carries a stronger tone.',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l02', 'card-p21-l03'],
    step0Html: `<div class="card-title">-았/었어야 했는데</div>
<div class="card-body">"本来应该……的" —— 带义务感的懊悔。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">-을 걸 그랬다 vs -았어야 했는데</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-을 걸 그랬다（个人愿望）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">전화할 걸 그랬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当时该打电话的。（我希望）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-았어야 했는데（义务责任）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">전화했어야 했는데 못 했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">本来该打电话的（这是我的责任），可没打成。</div>
    </div>
  </div>
</div>
<div class="reminder-box">语气重量：-았어야 했는데 &gt; -을 걸 그랬다。前者带责任感，后者只是遗憾。</div>`,
    compareHtml: `<div class="card-title">-을 걸 그랬다 vs -았어야 했는데</div>
<div class="card-body">两者都是"后悔没做"，但语气重量差别大。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 걸 그랬다 → 个人愿望</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">主观愿望，只对自己说</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 옷을 살 걸 그랬어요.</span><span style="font-size:16px;color:#5a4640">当时该买的。（希望没实现）</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었어야 했는데 → 义务责任</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">带"应该/本份"感，可对自己也可评价他人</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사과했어야 했는데.</span><span style="font-size:16px;color:#5a4640">本来该道歉的。（这是义务）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">너 갔어야 했는데.</span><span style="font-size:16px;color:#5a4640">你当时该去的。（评价他人）</span></div>
  </div>
</div>
<div class="reminder-box">写作/正式场合优先用 -았어야 했는데，语气更庄重。</div>`,
    compareLabel: '-을 걸 그랬다 vs -았어야 했는데',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 4 课</div>
    <div class="ov-hero-title">-았/었어야 했는데</div>
    <div class="ov-hero-sub">"本来该……的" · 带义务责任感的懊悔</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词过去词干（-았/었-）+ <b style="color:#ff7fa8">어야 했는데</b><br>
        主语可以是自己也可以是别人。<br>
        后半句常接 못 -았어요 / -지 못했어요 说明实际结果。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        일찍 잤어야 했는데 못 잤어요.（本该早睡没睡）<br>
        사과했어야 했는데 못 했어요.（本该道歉没做）<br>
        너 그때 갔어야 했는데.（你当时该去的）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가야 했는데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갔어야 했는데（必须过去词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내일 갔어야 했는데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">내일 가야 해요（未来用现在时义务）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第5课：-았/었으면 좋았을 텐데 ──────────────────────────
  {
    id: 'card-p21-l05',
    partNumber: 21,
    lessonNumber: 5,
    title: '-았/었으면 좋았을 텐데',
    whatItDoes: '要是……就好了（遗憾感叹）', whatItDoesEn: 'If only... (regretful sigh)',
    whatItDoesBody: '对过去情况的遗憾感叹，比 -았더라면 更口语化。\n"要是……就好了" —— 事实上没那样，只能感慨。\n和 -았더라면 结构相似，但更常用于日常对话；-았더라면 偏书面。', whatItDoesBodyEn: 'A colloquial expression of regret about the past, more casual than -았더라면. "If only..." — it didn\'t happen, so you just lament. Structurally similar to -았더라면, but more common in everyday speech; -았더라면 is more formal.',
    structureNote: '结构：动词/形容词过去词干 + 으면 좋았을 텐데。\n可看作 -았/었으면 좋겠다（希望）的过去回想形态。\n后面常独立成句，或省略后半句。', structureNoteEn: 'Structure: verb/adjective past stem + 으면 좋았을 텐데. Can be seen as the past retrospective form of -았/었으면 좋겠다 (wish). Often stands alone or omits the second half.',
    rulesNote: '和 -았더라면 的选择：\n1. 日常口语：-았으면 좋았을 텐데\n2. 书面/正式：-았더라면 -았을 텐데\n意思几乎相同，可以互换。', rulesNoteEn: 'Choosing between -았더라면: 1. Everyday speech: -았으면 좋았을 텐데 2. Written/formal: -았더라면 -았을 텐데. The meanings are nearly identical and interchangeable.',
    structures: [
      {
        ko: '어제 날씨가 좀 더 따뜻했으면 좋았을 텐데요',
        zh: '昨天天气要是再暖和点就好了。', zhEn: 'I wish the weather had been warmer yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '좀 더', role: 'plain' },
          { text: '따뜻했으면 좋았을 텐데요', role: 'verb' },
        ],
      },
      {
        ko: '시험이 좀 쉬웠으면 좋았을 텐데요',
        zh: '考试要是简单点就好了。', zhEn: 'I wish the exam had been easier.',
        tokens: [
          { text: '시험이', role: 'subject' },
          { text: '좀 쉬웠으면 좋았을 텐데요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 그날 왔으면 좋았을 텐데요',
        zh: '朋友那天要是来了就好了。', zhEn: 'I wish my friend had come that day.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '그날', role: 'time' },
          { text: '왔으면 좋았을 텐데요', role: 'verb' },
        ],
      },
      {
        ko: '조금 더 시간이 있었으면 좋았을 텐데',
        zh: '要是再多点时间就好了。', zhEn: 'I wish I\'d had more time.',
        tokens: [
          { text: '조금 더', role: 'plain' },
          { text: '시간이', role: 'subject' },
          { text: '있었으면 좋았을 텐데', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词过去词干 + 으면 좋았을 텐데', textEn: 'Verb/adjective past stem + 으면 좋았을 텐데', examples: '가다→갔으면 좋았을 텐데 / 예쁘다→예뻤으면 좋았을 텐데 / 하다→했으면 좋았을 텐데' },
      { type: 'rule', text: '名词 + 이었으면 / 였으면 좋았을 텐데', textEn: 'Noun + 이었으면 / 였으면 좋았을 텐데', examples: '학생이었으면 좋았을 텐데 / 부자였으면 좋았을 텐데' },
      { type: 'usage', text: '对过去无法改变的情况感慨"要是……就好了"', textEn: 'Express regret about unchangeable past situations with "if only..."', examples: '어제 비가 안 왔으면 좋았을 텐데 / 그 사람이 있었으면 좋았을 텐데' },
      { type: 'usage', text: '主语可以是自己、别人或情况本身', textEn: 'The subject can be yourself, someone else, or the situation itself.', examples: '내가 갔으면 / 친구가 왔으면 / 날씨가 좋았으면' },
      { type: 'compare', text: '和 -았더라면 差别：口语性 vs 书面性，意思几乎相同', textEn: 'Difference from -았더라면: colloquial vs. written, meaning is nearly identical.', examples: '왔으면 좋았을 텐데（日常）/ 왔더라면 좋았을 텐데（书面）', examplesEn: '왔으면 좋았을 텐데 (everyday) / 왔더라면 좋았을 텐데 (written)' },
      { type: 'note', text: '现在的愿望用 -았/었으면 좋겠다（未来指向）', textEn: 'For present wishes, use -았/었으면 좋겠다 (future-oriented).', examples: '내일 비가 안 왔으면 좋겠다（希望明天不下雨）/ 어제 비가 안 왔으면 좋았을 텐데（昨天要是没下雨就好了）', examplesEn: '내일 비가 안 왔으면 좋겠다 (I hope it doesn\'t rain tomorrow) / 어제 비가 안 왔으면 좋았을 텐데 (I wish it hadn\'t rained yesterday)' },
      { type: 'note', text: '为什么结尾是 텐데 而不是 좋았어요：这件好事其实没发生，韩语要把"（那样的话）本会是好的"标成推测形 좋았을 텐데。中文"就好了"里没有这种"推测"标记，学习者常误写成陈述句 좋았어요', textEn: 'Why the ending is 텐데 instead of 좋았어요: this good thing didn\'t actually happen, so Korean marks "(in that case) it would have been good" as conjectural 좋았을 텐데. Chinese "就好了" lacks this "conjecture" marker, so learners often mistakenly write the declarative 좋았어요.', examples: '왔으면 좋았을 텐데（推测·本会好·遗憾）↔ 왔으면 좋았어요（陈述·实际就是好·用于反事实是错的）', examplesEn: '왔으면 좋았을 텐데 (conjecture·would have been good·regret) ↔ 왔으면 좋았어요 (declarative·actually was good·wrong for counterfactuals)' },
      { type: 'example', text: '따뜻했으면 좋았을 텐데요 / 시간이 있었으면 좋았을 텐데요 / 알았으면 좋았을 텐데요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '따뜻했으면 좋았을 텐데요', role: 'verb' },
        ],
        zh: '昨天天气要是暖和点就好了。', zhEn: 'I wish the weather had been warmer yesterday.',
        swapWords: ['따뜻했으면 좋았을 텐데요', '맑았으면 좋았을 텐데요', '시원했으면 좋았을 텐데요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시험이', role: 'subject' },
          { text: '좀 쉬웠으면 좋았을 텐데요', role: 'verb' },
        ],
        zh: '考试要是简单点就好了。', zhEn: 'I wish the exam had been easier.',
        swapWords: ['쉬웠으면 좋았을 텐데요', '짧았으면 좋았을 텐데요', '없었으면 좋았을 텐데요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '그날', role: 'time' },
          { text: '왔으면 좋았을 텐데요', role: 'verb' },
        ],
        zh: '朋友那天要是来了就好了。', zhEn: 'I wish my friend had come that day.',
        swapWords: ['친구가', '가족이', '동생이'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '더 일찍', role: 'plain' },
          { text: '배웠으면 좋았을 텐데요', role: 'verb' },
        ],
        zh: '要是早点学韩语就好了。', zhEn: 'I wish I\'d started learning Korean earlier.',
        swapWords: ['배웠으면 좋았을 텐데요', '시작했으면 좋았을 텐데요', '알았으면 좋았을 텐데요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌤️', context: '天气感慨', contextEn: 'Weather reflection', ko: '어제 날씨가 좋았으면 좋았을 텐데요.', zh: '昨天天气要是好点就好了。', zhEn: 'I wish the weather had been better yesterday.' },
      { icon: '📝', context: '考试感慨', contextEn: 'Exam reflection', ko: '시험이 조금만 쉬웠으면 좋았을 텐데.', zh: '考试要是稍微简单点就好了。', zhEn: 'It would have been nice if the exam had been a bit easier.' },
      { icon: '⏰', context: '时间不够', contextEn: 'Not enough time', ko: '시간이 좀 더 있었으면 좋았을 텐데요.', zh: '要是再多点时间就好了。', zhEn: 'I wish I\'d had more time.' },
      { icon: '🎂', context: '朋友生日', contextEn: 'A friend\'s birthday', ko: '친구 생일 파티에 갔으면 좋았을 텐데.', zh: '朋友的生日派对要是去了就好了。', zhEn: 'It would have been nice if I had gone to my friend\'s birthday party.' },
      { icon: '💡', context: '当时不知道', contextEn: 'Didn\'t know at the time', ko: '그때 그 사실을 알았으면 좋았을 텐데요.', zh: '当时要是知道这个事就好了。', zhEn: 'It would have been nice if I had known about this at the time.' },
      { icon: '🌸', context: '未看樱花', contextEn: 'Didn\'t see the cherry blossoms', ko: '봄에 벚꽃을 봤으면 좋았을 텐데.', zh: '春天要是看了樱花就好了。', zhEn: 'It would have been nice if I had seen the cherry blossoms in spring.' },
    ],
    mistakes: [
      { wrong: '내일 비가 안 왔으면 좋았을 텐데요', correct: '내일 비가 안 왔으면 좋겠어요', note: '未来愿望用 -았으면 좋겠다。-았으면 좋았을 텐데 只用于对过去的遗憾。', noteEn: 'Use -았으면 좋겠다 for future wishes. -았으면 좋았을 텐데 is only used for regrets about the past.' },
      { wrong: '가면 좋았을 텐데요', correct: '갔으면 좋았을 텐데요', note: '前半句必须是过去 -았/었으면，不能用 -(으)면。', noteEn: 'The first clause must use past tense -았/었으면, not -(으)면.' },
      { wrong: '왔으면 좋아요', correct: '왔으면 좋았을 텐데요', note: '后半句必须也用过去推测 좋았을 텐데，不能用现在时 좋아요。前后时态要匹配。', noteEn: 'The second clause must also use the past conjecture 좋았을 텐데, not the present tense 좋아요. The tenses must match.' },
      { wrong: '학생면 좋았을 텐데요', correct: '학생이었으면 좋았을 텐데요', note: '名词有收音 → 이었으면。학생 + 이었으면。', noteEn: 'Nouns with a final consonant → 이었으면. 학생 + 이었으면.' },
    ],
    quickTable: {
      title: '-았/었으면 좋았을 텐데 变形速查', titleEn: '-았/었으면 좋았을 텐데 Conjugation Quick Reference',
      body: '按词类选择正确过去形态。', bodyEn: 'Choose the correct past form based on the word type.',
      headers: ['原形', '类型', '过去+으면', '完整形态'],
      rows: [
        ['가다', '动词无收音', { ko: '갔으면', zh: '가+았→갔' }, { ko: '갔으면 좋았을 텐데', zh: '要是去了就好了', zhEn: 'It would have been nice if I had gone.' }],
        ['먹다', '动词有收音', { ko: '먹었으면', zh: '먹+었' }, { ko: '먹었으면 좋았을 텐데', zh: '要是吃了就好了', zhEn: 'It would have been nice if I had eaten.' }],
        ['하다', '하다类', { ko: '했으면', zh: '하+였→했' }, { ko: '했으면 좋았을 텐데', zh: '要是做了就好了', zhEn: 'It would have been nice if I had done it.' }],
        ['예쁘다', '形容词', { ko: '예뻤으면', zh: 'ㅡ脱落+었', zhEn: 'ㅡ drop + 었' }, { ko: '예뻤으면 좋았을 텐데', zh: '要是漂亮就好了', zhEn: 'It would have been nice if she were pretty.' }],
        ['쉽다', 'ㅂ 不规则', { ko: '쉬웠으면', zh: 'ㅂ→우+었' }, { ko: '쉬웠으면 좋았을 텐데', zh: '要是简单就好了', zhEn: 'It would have been nice if it were simple.' }],
        ['학생이다', '名词有收音', { ko: '학생이었으면', zh: '이었' }, { ko: '학생이었으면 좋았을 텐데', zh: '要是是学生就好了', zhEn: 'It would have been nice if I had been a student.' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-았/었으면 좋았을 텐데 变形练习', titleEn: '-았/었으면 좋았을 텐데 Conjugation Practice',
      body: '根据语境选出正确形态。', bodyEn: 'Choose the correct form based on context.',
      questions: [
        {
          prompt: '"昨天天气要是暖和点就好了" → 어제 날씨가 좀 더 ___.', promptEn: '"It would have been nice if the weather had been warmer yesterday" → 어제 날씨가 좀 더 ___.',
          options: ['따뜻하면 좋겠어요', '따뜻했으면 좋았을 텐데요', '따뜻하면 좋았을 텐데요', '따뜻했으면 좋겠어요'],
          answer: 1,
          explanation: '过去的遗憾 → 前半 -았/었으면 + 后半 좋았을 텐데。따뜻하다 → 따뜻했으면。', explanationEn: 'Regret about the past → first clause -았/었으면 + second clause 좋았을 텐데. 따뜻하다 → 따뜻했으면.',
        },
        {
          prompt: '"考试要是简单点就好了" → 시험이 좀 ___.', promptEn: '"It would have been nice if the exam had been easier" → 시험이 좀 ___.',
          options: ['쉽었으면 좋았을 텐데요', '쉬웠으면 좋았을 텐데요', '쉬으면 좋았을 텐데요', '쉬웠으면 좋아요'],
          answer: 1,
          explanation: '쉽다 是 ㅂ 不规则 → 쉬웠-（ㅂ→우+었）+ 으면 좋았을 텐데 = 쉬웠으면 좋았을 텐데요。', explanationEn: '쉽다 is a ㅂ irregular → 쉬웠- (ㅂ→우+었) + 으면 좋았을 텐데 = 쉬웠으면 좋았을 텐데요.',
        },
        {
          prompt: '"要是当时是学生就好了" → ___ 좋았을 텐데요.', promptEn: '"It would have been nice if I had been a student then" → ___ 좋았을 텐데요.',
          options: ['학생이면', '학생이었으면', '학생이었더라면', '학생되면'],
          answer: 1,
          explanation: '名词 + 이었으면。学生有收音 → 학생이었으면。', explanationEn: 'Noun + 이었으면. 학생 has a final consonant → 학생이었으면.',
        },
        {
          prompt: '关于 -았으면 좋았을 텐데 和 -았으면 좋겠다 的区别，哪句最准确？', promptEn: 'Regarding the difference between -았으면 좋았을 텐데 and -았으면 좋겠다, which sentence is most accurate?',
          options: [
            '两者意思完全相同',
            '前者对过去遗憾，后者对未来希望',
            '前者对未来希望，后者对过去遗憾',
            '前者用于书面，后者用于口语',
          ],
          answer: 1,
          explanation: '-았/었으면 좋았을 텐데：对过去的遗憾（已成定局）。-았/었으면 좋겠다：对未来的希望（还没实现）。', explanationEn: '-았/었으면 좋았을 텐데: Regret about the past (already decided). -았/었으면 좋겠다: Hope for the future (not yet realized).',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l01', 'card-p10-l02'],
    step0Html: `<div class="card-title">-았/었으면 좋았을 텐데</div>
<div class="card-body">"要是当时……就好了" —— 对过去遗憾的口语感叹。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">对过去 vs 对未来</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-았으면 좋았을 텐데（过去遗憾）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">어제 비가 안 왔으면 좋았을 텐데요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">昨天要是没下雨就好了（但下了）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-았으면 좋겠다（未来希望）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">내일 비가 안 왔으면 좋겠어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">希望明天不下雨（还没发生）</div>
    </div>
  </div>
</div>
<div class="reminder-box">辨别方法：前半句一样是 -았/었으면，看后半句是 좋겠다（希望）还是 좋았을 텐데（遗憾）。</div>`,
    compareHtml: `<div class="card-title">-았더라면 vs -았으면 좋았을 텐데</div>
<div class="card-body">两个都是对过去的反事实假设，语域不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었더라면 → 书面/正式</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">语气庄重，多用于写作/演讲</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그때 알았더라면 도와줬을 텐데요.</span><span style="font-size:16px;color:#5a4640">要是当时知道就帮忙了。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었으면 좋았을 텐데 → 日常口语</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">感慨语气，日常对话高频</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그때 알았으면 좋았을 텐데요.</span><span style="font-size:16px;color:#5a4640">要是当时知道就好了。</span></div>
  </div>
</div>
<div class="reminder-box">日常对话优先用 -았으면 좋았을 텐데。写作、正式场合用 -았더라면。</div>`,
    compareLabel: '-았더라면 vs -았으면 좋았을 텐데',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 5 课</div>
    <div class="ov-hero-title">-았/었으면 좋았을 텐데</div>
    <div class="ov-hero-sub">"要是……就好了" · 对过去的口语感叹</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        过去词干（-았/었-）+ 으면 <b style="color:#ff7fa8">좋았을 텐데</b><br>
        名词 → 이었으면 / 였으면 좋았을 텐데
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        어제 날씨가 좋았으면 좋았을 텐데요.（昨天天气要是好就好了）<br>
        시험이 쉬웠으면 좋았을 텐데요.（考试要是简单就好了）<br>
        시간이 있었으면 좋았을 텐데.（要是有时间就好了）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가면 좋았을 텐데요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갔으면 좋았을 텐데요（必须过去词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내일 왔으면 좋았을 텐데요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">未来用 -았으면 좋겠어요</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第6课：-을/ㄹ 뻔했다 深化 ────────────────────────────
  {
    id: 'card-p21-l06',
    partNumber: 21,
    lessonNumber: 6,
    title: '-을/ㄹ 뻔했다',
    whatItDoes: '差点儿……（没发生但险些发生）', whatItDoesEn: 'Almost... (didn\'t happen but nearly did)',
    whatItDoesBody: '表达"差一点就发生了但幸好没发生"。\n主要功能是庆幸没发生某件（通常不好的）事情。\n结构简单，但要注意：这里的 -을/ㄹ 뻔했다 中的动词永远用未来冠形形态。', whatItDoesBodyEn: 'Expresses that something almost happened but fortunately didn\'t. Its main function is relief that something (usually bad) didn\'t occur. The structure is simple, but note: the verb in -을/ㄹ 뻔했다 always takes the future adnominal form.',
    structureNote: '结构：动词词干（无收音 + ㄹ；有收音 + 을）+ 뻔했다。\n뻔하다 是"差点"的固定动词，永远用过去形 뻔했다。\n虽然是"没发生"，但用未来冠形形态，因为"当时差点就要"发生。', structureNoteEn: 'Structure: verb stem (no batchim + ㄹ; with batchim + 을) + 뻔했다. 뻔하다 is the fixed verb for "almost" and always takes the past form 뻔했다. Even though it didn\'t happen, the future adnominal form is used because it "was about to" happen.',
    rulesNote: '这个语法看似简单，但学习者容易混淆两点：\n1. 结尾必须是过去形 뻔했다，不能是 뻔한다 或 뻔해요。\n2. 前面用未来冠形（-을/ㄹ），不能用过去冠形（-은/ㄴ）。', rulesNoteEn: 'This grammar looks simple, but learners often confuse two points: 1. The ending must be past tense 뻔했다, not 뻔한다 or 뻔해요. 2. The preceding form uses the future adnominal (-을/ㄹ), not the past adnominal (-은/ㄴ).',
    structures: [
      {
        ko: '길에서 넘어질 뻔했어요',
        zh: '在路上差点儿摔倒。', zhEn: 'I almost fell on the way.',
        tokens: [
          { text: '길에서', role: 'place' },
          { text: '넘어질 뻔했어요', role: 'verb' },
        ],
      },
      {
        ko: '지각할 뻔했지만 뛰어서 겨우 도착했어요',
        zh: '差点迟到，跑着好不容易赶到了。', zhEn: 'I almost was late, but I ran and barely made it.',
        tokens: [
          { text: '지각할 뻔했지만', role: 'verb' },
          { text: '뛰어서', role: 'verb' },
          { text: '겨우', role: 'plain' },
          { text: '도착했어요', role: 'verb' },
        ],
      },
      {
        ko: '깜빡하고 지갑을 두고 갈 뻔했어요',
        zh: '一不留神，差点把钱包忘在那儿。', zhEn: 'I almost left my wallet there without noticing.',
        tokens: [
          { text: '깜빡하고', role: 'verb' },
          { text: '지갑을', role: 'object' },
          { text: '두고 갈 뻔했어요', role: 'verb' },
        ],
      },
      {
        ko: '너무 매워서 눈물을 흘릴 뻔했어요',
        zh: '太辣了，差点掉眼泪。', zhEn: 'It was so spicy I almost teared up.',
        tokens: [
          { text: '너무 매워서', role: 'verb' },
          { text: '눈물을', role: 'object' },
          { text: '흘릴 뻔했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ 뻔했다', textEn: 'Stem without batchim + ㄹ 뻔했다', examples: '가다→갈 뻔했다 / 넘어지다→넘어질 뻔했다 / 하다→할 뻔했다' },
      { type: 'rule', text: '有收音词干 + 을 뻔했다', textEn: 'Stem with batchim + 을 뻔했다', examples: '먹다→먹을 뻔했다 / 죽다→죽을 뻔했다 / 잊다→잊을 뻔했다' },
      { type: 'rule', text: 'ㅂ 不规则：ㅂ→우 + ㄹ 뻔했다', textEn: 'ㅂ irregular: ㅂ→우 + ㄹ 뻔했다', examples: '눕다→누울 뻔했다 / 줍다→주울 뻔했다' },
      { type: 'usage', text: '表达"差点儿发生但没发生"，通常庆幸事情没成真', textEn: 'Expresses \'almost happened but didn\'t,\' usually with relief that it didn\'t happen.', examples: '넘어질 뻔했어요（差点摔倒，但没摔）/ 지각할 뻔했어요（差点迟到，但没迟到）', examplesEn: '넘어질 뻔했어요 (almost fell, but didn\'t) / 지각할 뻔했어요 (almost late, but wasn\'t)' },
      { type: 'note', text: '结尾必须是 뻔했다（过去形），不能用现在形 뻔한다 或 뻔해요', textEn: 'The ending must be 뻔했다 (past tense), not the present forms 뻔한다 or 뻔해요.', examples: '지각할 뻔했어요 ✓ / 지각할 뻔해요 ✗' },
      { type: 'compare', text: '和 -았을 것 같다 差别：뻔했다=没成，-았을 것 같다=已成推测', textEn: 'Difference from -았을 것 같다: 뻔했다 = didn\'t happen, -았을 것 같다 = speculation it did happen.', examples: '넘어질 뻔했다（差点摔）/ 넘어졌을 것 같다（好像摔了）', examplesEn: '넘어질 뻔했다 (almost fell) / 넘어졌을 것 같다 (seems like fell)' },
      { type: 'note', text: '别被中文"差点没"骗了：中文"差点没赶上"其实=赶上了（庆幸），"差点摔了"=没摔。-을 뻔했다 只有一个意思——"险些发生但没发生"，永远不带这个"没"。想说"差点没赶上（但赶上了）"要说 겨우 탔어요/거의 못 탈 뻔했다 另想，别直译成 못 탈 뻔했어요', textEn: 'Don\'t be fooled by Chinese \'almost didn\'t\': \'almost didn\'t catch\' actually means caught (relief), \'almost fell\' means didn\'t fall. -을 뻔했다 has only one meaning—\'barely didn\'t happen\'—and never includes that \'didn\'t.\' To say \'almost didn\'t catch (but did),\' use 겨우 탔어요 or think of 거의 못 탈 뻔했다, don\'t literally translate to 못 탈 뻔했어요.', examples: '差点摔了→넘어질 뻔했어요（没摔）/ 差点没赶上（=赶上了）≠ 못 탈 뻔했어요', examplesEn: 'Almost fell → 넘어질 뻔했어요 (didn\'t fall) / Almost didn\'t catch (= caught) ≠ 못 탈 뻔했어요' },
      { type: 'example', text: '넘어질 뻔했어요 / 지각할 뻔했어요 / 잊어버릴 뻔했어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '길에서', role: 'place' },
          { text: '넘어질 뻔했어요', role: 'verb' },
        ],
        zh: '在路上差点儿摔倒。', zhEn: 'I almost fell on the way.',
        swapWords: ['넘어질 뻔했어요', '미끄러질 뻔했어요', '부딪힐 뻔했어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지각할 뻔했지만', role: 'verb' },
          { text: '뛰어서', role: 'verb' },
          { text: '겨우 도착했어요', role: 'verb' },
        ],
        zh: '差点迟到，跑着好不容易赶到了。', zhEn: 'I almost was late, but I ran and barely made it.',
        swapWords: ['지각할 뻔했지만', '늦을 뻔했지만', '놓칠 뻔했지만'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지갑을', role: 'object' },
          { text: '두고 갈 뻔했어요', role: 'verb' },
        ],
        zh: '差点把钱包忘在那儿。', zhEn: 'I almost left my wallet there.',
        swapWords: ['지갑을', '핸드폰을', '가방을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '너무 매워서', role: 'verb' },
          { text: '눈물을', role: 'object' },
          { text: '흘릴 뻔했어요', role: 'verb' },
        ],
        zh: '太辣了差点掉眼泪。', zhEn: 'It was so spicy I almost cried.',
        swapWords: ['흘릴 뻔했어요', '쏟을 뻔했어요', '멈출 뻔했어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏃', context: '差点摔倒', contextEn: 'Almost fell', ko: '아! 방금 미끄러져서 넘어질 뻔했어요.', zh: '啊！刚才滑了一下差点摔倒。', zhEn: 'Ah! I slipped just now and almost fell.' },
      { icon: '⏰', context: '差点迟到', contextEn: 'Almost late', ko: '지하철 놓쳐서 지각할 뻔했어요.', zh: '错过地铁差点迟到。', zhEn: 'I missed the subway and was almost late.' },
      { icon: '💼', context: '差点丢东西', contextEn: 'Almost lost something', ko: '지갑을 카페에 두고 갈 뻔했어요.', zh: '差点把钱包忘在咖啡店。', zhEn: 'I almost left my wallet at the café.' },
      { icon: '📱', context: '差点忘约会', contextEn: 'Almost forgot the appointment', ko: '오늘 약속 있는 거 완전 잊어버릴 뻔했어요.', zh: '差点完全忘了今天有约。', zhEn: 'I almost completely forgot I had plans today.' },
      { icon: '🚗', context: '差点撞上', contextEn: 'almost hit', ko: '차가 갑자기 나와서 부딪힐 뻔했어요.', zh: '车突然出来差点撞上。', zhEn: 'A car suddenly came out and almost hit me.' },
      { icon: '😱', context: '差点吓死', contextEn: 'almost scared to death', ko: '깜짝 놀라서 심장 멎을 뻔했어요.', zh: '吓一跳差点心脏骤停。', zhEn: 'Got such a scare my heart almost stopped.' },
    ],
    mistakes: [
      { wrong: '넘어진 뻔했어요', correct: '넘어질 뻔했어요', note: '뻔하다 前必须是未来冠形（-을/ㄹ），不是过去冠形（-은/ㄴ）。넘어질 뻔했어요。', noteEn: '뻔하다 must be preceded by the future adnominal form (-을/ㄹ), not the past adnominal (-은/ㄴ). 넘어질 뻔했어요.' },
      { wrong: '지각할 뻔해요', correct: '지각할 뻔했어요', note: '뻔하다 结尾永远用过去形 뻔했다，不能是 뻔해요 或 뻔한다。', noteEn: '뻔하다 always ends in the past tense 뻔했다, never 뻔해요 or 뻔한다.' },
      { wrong: '먹ㄹ 뻔했어요', correct: '먹을 뻔했어요', note: '먹다 有收音 → 을 뻔했다。먹을 뻔했어요。', noteEn: '먹다 has a final consonant → 을 뻔했다. 먹을 뻔했어요.' },
      { wrong: '아파 뻔했어요', correct: '아플 뻔했어요', note: '뻔하다 前必须完整接冠形形态 -(을/ㄹ)，不能只有词干。', noteEn: '뻔하다 must be preceded by the full adnominal form -(을/ㄹ), not just the stem.' },
    ],
    quickTable: {
      title: '-을/ㄹ 뻔했다 变形速查', titleEn: '-을/ㄹ 뻔했다 Conjugation Quick Reference',
      body: '看词干收音选正确形态。', bodyEn: 'Choose the correct form based on the stem\'s final consonant.',
      headers: ['原形', '词干', '收音', '完整形态'],
      rows: [
        ['넘어지다', '넘어지', { ko: '무받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '넘어질 뻔했다', zh: '差点摔倒', zhEn: 'Almost fell' }],
        ['먹다', '먹', { ko: 'ㄱ 있음', zh: '有收音', zhEn: 'Has a final consonant' }, { ko: '먹을 뻔했다', zh: '差点吃了', zhEn: 'almost ate' }],
        ['하다', '하', { ko: '무받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '할 뻔했다', zh: '差点做了', zhEn: 'almost did' }],
        ['잊다', '잊', { ko: 'ㅈ 있음', zh: '有收音', zhEn: 'Has a final consonant' }, { ko: '잊을 뻔했다', zh: '差点忘了', zhEn: 'almost forgot' }],
        ['죽다', '죽', { ko: 'ㄱ 있음', zh: '有收音', zhEn: 'Has a final consonant' }, { ko: '죽을 뻔했다', zh: '差点死了', zhEn: 'almost died' }],
        ['눕다', '눕', { ko: 'ㅂ 不规则', zh: 'ㅂ→우' }, { ko: '누울 뻔했다', zh: '差点躺下', zhEn: 'almost lay down' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ 뻔했다 变形练习', titleEn: '-을/ㄹ 뻔했다 Conjugation Practice',
      body: '根据词干选出正确形态。', bodyEn: 'Select the correct form based on the stem.',
      questions: [
        {
          prompt: '"在路上差点摔倒" → 길에서 ___.', promptEn: '"Almost fell on the road" → 길에서 ___.',
          options: ['넘어진 뻔했어요', '넘어질 뻔해요', '넘어질 뻔했어요', '넘어지을 뻔했어요'],
          answer: 2,
          explanation: '넘어지다 无收音 → 넘어질（ㄹ 冠形）+ 뻔했어요（过去形）。', explanationEn: '넘어지다 has no final consonant → 넘어질 (ㄹ adnominal) + 뻔했어요 (past tense).',
        },
        {
          prompt: '"差点忘了" → 완전 ___.', promptEn: '"Almost forgot" → 완전 ___.',
          options: ['잊ㄹ 뻔했어요', '잊을 뻔했어요', '잊은 뻔했어요', '잊을 뻔해요'],
          answer: 1,
          explanation: '잊다 有收音 ㅈ → 을 뻔했다。잊을 뻔했어요。', explanationEn: '잊다 has final consonant ㅈ → 을 뻔했다. 잊을 뻔했어요.',
        },
        {
          prompt: '"差点迟到" → ___.', promptEn: '"Almost late" → ___.',
          options: ['지각한 뻔했어요', '지각할 뻔해요', '지각할 뻔한다', '지각할 뻔했어요'],
          answer: 3,
          explanation: '지각하다 无收音 → 지각할 뻔했다。뻔하다 必须是过去形 뻔했다，前必须是未来冠形。', explanationEn: '지각하다 has no final consonant → 지각할 뻔했다. 뻔하다 must be in past tense 뻔했다, preceded by the future adnominal.',
        },
        {
          prompt: '关于 -을/ㄹ 뻔했다，哪句最准确？', promptEn: 'Which sentence is most accurate about -을/ㄹ 뻔했다?',
          options: [
            '表示已经发生了不好的事',
            '表示差点发生但幸好没发生',
            '表示未来即将发生',
            '表示正在进行',
          ],
          answer: 1,
          explanation: '-을 뻔했다 表达"差点儿要……但幸好没有"。虽然用未来冠形，但结果是没发生。', explanationEn: '-을 뻔했다 expresses "almost did... but fortunately didn\'t." Although it uses the future adnominal, the result is that it didn\'t happen.',
        },
      ],
    },
    linkedGrammarIds: ['card-p8-l03'],
    step0Html: `<div class="card-title">-을/ㄹ 뻔했다</div>
<div class="card-body">"差点儿……" —— 险些发生但幸好没发生。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">两个易错点</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">前必须是未来冠形</div>
      <div style="font-size:16px;font-weight:800;color:#241917">넘어질 뻔했어요 ✓</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不是 넘어진 뻔했어요 ✗</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">结尾必须是过去形</div>
      <div style="font-size:16px;font-weight:800;color:#241917">지각할 뻔했어요 ✓</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不是 지각할 뻔해요 ✗</div>
    </div>
  </div>
</div>
<div class="reminder-box">虽然是"没发生"，但因为"当时差点就要发生"，所以韩语里用未来冠形 -을/ㄹ + 过去形 뻔했다。</div>`,
    compareHtml: `<div class="card-title">-을 뻔했다 vs -았을 것 같다</div>
<div class="card-body">两者都涉及推测过去，但意思差别很大。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 뻔했다 → 差点发生（但没）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">庆幸没发生，事实是没发生</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지각할 뻔했어요.</span><span style="font-size:16px;color:#5a4640">差点迟到（没迟到）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었을 것 같다 → 推测已发生</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">推测某事已经发生了</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지각했을 것 같아요.</span><span style="font-size:16px;color:#5a4640">好像已经迟到了</span></div>
  </div>
</div>
<div class="reminder-box">뻔했다 说"没成"，-았을 것 같다 说"应该成了"。方向相反。</div>`,
    compareLabel: '-을 뻔했다 vs -았을 것 같다',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 6 课</div>
    <div class="ov-hero-title">-을/ㄹ 뻔했다</div>
    <div class="ov-hero-sub">"差点儿……" · 险些发生但没发生</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ 뻔했다</b>：갈 뻔했다 · 넘어질 뻔했다<br>
        有收音 → <b style="color:#2db89b">을 뻔했다</b>：먹을 뻔했다 · 잊을 뻔했다<br>
        结尾永远用过去形 뻔했다。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        길에서 넘어질 뻔했어요.（在路上差点摔倒）<br>
        지갑을 두고 갈 뻔했어요.（差点把钱包忘了）<br>
        지각할 뻔했지만 겨우 도착했어요.（差点迟到，勉强赶到）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">넘어진 뻔했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">넘어질 뻔했어요（未来冠形）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">지각할 뻔해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">지각할 뻔했어요（过去形）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第7课：-지 그랬어요 深化 ─────────────────────────────
  {
    id: 'card-p21-l07',
    partNumber: 21,
    lessonNumber: 7,
    title: '-지 그랬어요',
    whatItDoes: '你怎么不……呢（含责备的建议）', whatItDoesEn: 'Why didn\'t you...? (reproachful suggestion)',
    whatItDoesBody: '对别人过去没做的事表达"当时怎么不这样呢"的责备+建议。\n可以看作 -을 걸 그랬다 的"对人"版本：一个自责，一个说他人。\n结尾必须过去形 그랬어요，说的是"对方过去的行为选择"。', whatItDoesBodyEn: 'Expresses reproach and advice about something someone didn\'t do in the past: "Why didn\'t you do it then?" It\'s the "other-directed" version of -을 걸 그랬다: one is self-blame, the other addresses others. The ending must be past tense 그랬어요, referring to the other person\'s past choice.',
    structureNote: '结构：动词词干 + 지 그랬어요。\n注意：-지 마세요（禁止）和 -지 그랬어요（责备）看起来相似，但意思完全不同。\n只接动词，不接形容词。', structureNoteEn: 'Structure: verb stem + 지 그랬어요. Note: -지 마세요 (prohibition) and -지 그랬어요 (reproach) look similar but mean completely different things. Only attaches to verbs, not adjectives.',
    rulesNote: '和 -을 걸 그랬다 配对：\n1. 自责：-을 걸 그랬다（我该……的）\n2. 责别人：-지 그랬어요（你怎么不……）\n\n和 -지 마세요 完全不同：-지 마세요 = 请不要做；-지 그랬어요 = 你怎么当时没做。', rulesNoteEn: 'Paired with -을 걸 그랬다: 1. Self-blame: -을 걸 그랬다 (I should have...) 2. Blaming others: -지 그랬어요 (Why didn\'t you...). Completely different from -지 마세요: -지 마세요 = please don\'t do; -지 그랬어요 = why didn\'t you do it then.',
    structures: [
      {
        ko: '피곤하면 좀 쉬지 그랬어요',
        zh: '累了怎么不休息一下呢？', zhEn: 'If you\'re tired, why not take a break?',
        tokens: [
          { text: '피곤하면', role: 'verb' },
          { text: '좀', role: 'plain' },
          { text: '쉬지 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '모르면 물어보지 그랬어요',
        zh: '不知道怎么不问一下呢？', zhEn: 'If you don\'t know, why not ask?',
        tokens: [
          { text: '모르면', role: 'verb' },
          { text: '물어보지 그랬어요', role: 'verb' },
        ],
      },
      {
        ko: '아프면 병원에 가지 그랬어',
        zh: '不舒服怎么不去医院呢？', zhEn: 'If you\'re not feeling well, why didn\'t you go to the hospital?',
        tokens: [
          { text: '아프면', role: 'verb' },
          { text: '병원에', role: 'place' },
          { text: '가지 그랬어', role: 'verb' },
        ],
      },
      {
        ko: '먼저 연락하지 그랬어요',
        zh: '怎么不先联系一下呢？', zhEn: 'Why didn\'t you contact me first?',
        tokens: [
          { text: '먼저', role: 'plain' },
          { text: '연락하지 그랬어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 지 그랬어요（对上/中年长）/ 지 그랬어（对下/同辈）', textEn: 'Verb stem + 지 그랬어요 (to superior/elder) / 지 그랬어 (to subordinate/peer)', examples: '가다→가지 그랬어요 / 먹다→먹지 그랬어 / 하다→하지 그랬어요' },
      { type: 'rule', text: '不看收音，所有动词接法一样', textEn: 'Regardless of the final consonant, all verbs conjugate the same way', examples: '읽다→읽지 그랬어요 / 만들다→만들지 그랬어요 / 오다→오지 그랬어요' },
      { type: 'usage', text: '对听话人过去的行为表达轻微责备+建议"你怎么不……"', textEn: 'Expresses mild reproach + suggestion about the listener\'s past action: "Why didn\'t you..."', examples: '아프면 병원에 가지 그랬어? / 힘들면 말하지 그랬어요' },
      { type: 'usage', text: '语气比字面上"看起来温和"更重，带责备意味，慎用于长辈', textEn: 'The tone is heavier than it appears, carrying reproach; use cautiously with elders', examples: '对朋友：피곤하면 쉬지 그랬어 / 对陌生长辈用 -았어야 했는데', examplesEn: 'To a friend: 피곤하면 쉬지 그랬어 / To a stranger or elder, use -았어야 했는데' },
      { type: 'compare', text: '和 -을 걸 그랬다 配对：一个说自己，一个说别人', textEn: 'Pairs with -을 걸 그랬다: one for self, one for others', examples: '내가 갈 걸 그랬어（我该去的）/ 너 가지 그랬어（你怎么没去）', examplesEn: '내가 갈 걸 그랬어 (I should have gone) / 너 가지 그랬어 (Why didn\'t you go?)' },
      { type: 'note', text: '否定形 -지 말지 그랬어요：你当时怎么不别……', textEn: 'Negative form -지 말지 그랬어요: Why didn\'t you not... back then?', examples: '그렇게 화내지 말지 그랬어요（你当时怎么不别发火）', examplesEn: '그렇게 화내지 말지 그랬어요 (Why didn\'t you not get so angry back then?)' },
      { type: 'note', text: '中文"你怎么不休息"能翻成两句韩语，含义不同：왜 안 쉬었어요? 只是纯问原因（想听答案）；쉬지 그랬어요 带"本该休息却没休息"的建议+轻责，不追问原因。学习者常只会用问句 왜 안…，丢了本课的"该做而没做"语气', textEn: 'The Chinese "Why didn\'t you rest?" can be translated into two Korean sentences with different meanings: 왜 안 쉬었어요? is a pure question about the reason (expecting an answer); 쉬지 그랬어요 carries a suggestion + mild reproach of "should have rested but didn\'t," without probing for reasons. Learners often only use the question form 왜 안…, missing this lesson\'s nuance of "should have done but didn\'t."', examples: '왜 안 물어봤어요?（单纯问：为什么没问）/ 물어보지 그랬어요（你当时该问一下的·轻责+建议）', examplesEn: '왜 안 물어봤어요? (Simply asking: why didn\'t you ask?) / 물어보지 그랬어요 (You should have asked back then — mild reproach + suggestion)' },
      { type: 'example', text: '쉬지 그랬어요 / 물어보지 그랬어 / 미리 말하지 그랬어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '피곤하면', role: 'verb' },
          { text: '좀', role: 'plain' },
          { text: '쉬지 그랬어요', role: 'verb' },
        ],
        zh: '累了怎么不休息一下呢？', zhEn: 'If you\'re tired, why not take a break?',
        swapWords: ['쉬지 그랬어요', '자지 그랬어요', '나가지 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '모르면', role: 'verb' },
          { text: '물어보지 그랬어요', role: 'verb' },
        ],
        zh: '不知道怎么不问一下呢？', zhEn: 'If you don\'t know, why not ask?',
        swapWords: ['물어보지 그랬어요', '찾아보지 그랬어요', '전화하지 그랬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아프면', role: 'verb' },
          { text: '병원에', role: 'place' },
          { text: '가지 그랬어', role: 'verb' },
        ],
        zh: '不舒服怎么不去医院呢？', zhEn: 'If you\'re not feeling well, why didn\'t you go to the hospital?',
        swapWords: ['병원에', '약국에', '집에'],
        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '먼저', role: 'plain' },
          { text: '연락하지 그랬어요', role: 'verb' },
        ],
        zh: '怎么不先联系一下呢？', zhEn: 'Why didn\'t you contact me first?',
        swapWords: ['연락하지 그랬어요', '말하지 그랬어요', '알리지 그랬어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '朋友太累', contextEn: 'Friend is too tired', ko: '그렇게 힘들면 좀 쉬지 그랬어.', zh: '那么累怎么不休息一下呢。', zhEn: 'If you\'re that tired, why didn\'t you take a rest?' },
      { icon: '❓', context: '朋友有疑问', contextEn: 'Friend has a question', ko: '모르면 나한테 물어보지 그랬어요.', zh: '不懂怎么不问问我呢。', zhEn: 'If you didn\'t understand, why didn\'t you ask me?' },
      { icon: '🏥', context: '朋友不舒服', contextEn: 'Friend is not feeling well', ko: '어제 그렇게 아팠으면 병원에 가지 그랬어?', zh: '昨天那么不舒服怎么不去医院？', zhEn: 'You were so unwell yesterday, why didn\'t you go to the hospital?' },
      { icon: '📞', context: '朋友没联系', contextEn: 'Friend didn\'t contact', ko: '늦으면 미리 전화하지 그랬어요.', zh: '要晚了怎么不提前打个电话呢。', zhEn: 'If you were going to be late, why didn\'t you call ahead?' },
      { icon: '🍚', context: '朋友饿肚子', contextEn: 'Friend is hungry', ko: '배고프면 뭐 좀 먹지 그랬어.', zh: '饿了怎么不吃点东西呢。', zhEn: 'If you\'re hungry, why didn\'t you eat something?' },
      { icon: '💬', context: '朋友憋着', contextEn: 'Friend is holding it in', ko: '그런 일 있었으면 진작에 말하지 그랬어요.', zh: '有那种事怎么不早说呢。', zhEn: 'If something like that happened, why didn\'t you say it earlier?' },
    ],
    mistakes: [
      { wrong: '가지 마세요（想说"你怎么当时没去"）', wrongEn: '가지 마세요 (when you mean "why didn\'t you go back then")', correct: '가지 그랬어요', note: '-지 마세요 是"请不要去"（禁止）；-지 그랬어요 才是"你怎么没去"（责备）。', noteEn: '-지 마세요 means "please don\'t go" (prohibition); -지 그랬어요 means "why didn\'t you go" (reproach).' },
      { wrong: '내가 가지 그랬어요', correct: '내가 갈 걸 그랬어요', note: '主语是自己时用 -을 걸 그랬다；对别人才用 -지 그랬어요。', noteEn: 'Use -을 걸 그랬다 when the subject is yourself; use -지 그랬어요 only for others.' },
      { wrong: '내일 가지 그랬어요', correct: '가야지 / 가면 좋겠어요', note: '-지 그랬어요 只用于过去。对未来建议用别的表达。', noteEn: '-지 그랬어요 is only used for the past. For future suggestions, use a different expression.' },
      { wrong: '예쁘지 그랬어요', correct: '-지 그랬어요 只接动词', correctEn: '-지 그랬어요 only attaches to verbs.', note: '不能接形容词。形容词表达当时状态用 -았/었으면 좋았을 텐데。', noteEn: 'It can\'t attach to adjectives. For adjectives describing a past state, use -았/었으면 좋았을 텐데.' },
    ],
    quickTable: {
      title: '自责 vs 责别人：语法配对表', titleEn: 'Self-blame vs. Blaming Others: Grammar Pairing Table',
      body: '这两个语法一定要成对记，方向相反。', bodyEn: 'Memorize these two grammar points as a pair—they go in opposite directions.',
      headers: ['谁在后悔', '结构', '例句', '中文'],
      rows: [
        [{ ko: '自己（我）', zh: '第一人称', zhEn: 'first person' }, { ko: '-을 걸 그랬다', zh: '受收音影响', zhEn: 'affected by the final consonant' }, { ko: '내가 갈 걸 그랬어요', zh: '我该去的', zhEn: 'I should have gone' }, '我当时该去的（我没去）'],
        [{ ko: '对方（你）', zh: '第二人称', zhEn: 'second person' }, { ko: '-지 그랬어요', zh: '统一接法', zhEn: 'Unified conjugation' }, { ko: '너 가지 그랬어', zh: '你怎么没去', zhEn: 'why didn\'t you go' }, '你怎么当时没去呢（责备）'],
        [{ ko: '自己（我）', zh: '第一人称', zhEn: 'first person' }, { ko: '-지 말 걸 그랬다', zh: '统一接法', zhEn: 'Unified conjugation' }, { ko: '내가 말하지 말 걸 그랬어', zh: '我不该说的', zhEn: 'I shouldn\'t have said that' }, '我当时不该说的（我说了）'],
        [{ ko: '对方（你）', zh: '第二人称', zhEn: 'second person' }, { ko: '-지 말지 그랬어요', zh: '否定形', zhEn: 'negative form' }, { ko: '너 말하지 말지 그랬어', zh: '你怎么不别说呢', zhEn: 'why didn\'t you not say that' }, '你当时怎么不忍住呢'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-지 그랬어요 用法练习', titleEn: '-지 그랬어요 Usage Practice',
      body: '根据谁在后悔选出正确表达。', bodyEn: 'Choose the correct expression based on who is regretting.',
      questions: [
        {
          prompt: '"你不舒服怎么不去医院呢？"（对朋友说）→ 아프면 병원에 ___.', promptEn: '"Why don\'t you go to the hospital when you\'re sick?" (to a friend) → 아프면 병원에 ___.',
          options: ['갈 걸 그랬어', '가지 마세요', '가지 그랬어', '갔어야 했는데'],
          answer: 2,
          explanation: '对别人过去行为的责备用 -지 그랬어요。가다 → 가지 그랬어。', explanationEn: 'Use -지 그랬어요 to reproach someone for a past action. 가다 → 가지 그랬어.',
        },
        {
          prompt: '"我当时应该去的"（自责）→ 내가 ___.', promptEn: '"I should have gone then" (self-reproach) → 내가 ___.',
          options: ['가지 그랬어요', '갈 걸 그랬어요', '가지 마세요', '가지 말 걸 그랬어요'],
          answer: 1,
          explanation: '第一人称自责用 -을 걸 그랬다。내가 갈 걸 그랬어요。', explanationEn: 'Use -을 걸 그랬다 for first-person self-reproach. 내가 갈 걸 그랬어요.',
        },
        {
          prompt: '"你怎么不早点告诉我呢？" → 미리 ___.', promptEn: '"Why didn\'t you tell me earlier?" → 미리 ___.',
          options: ['말하지 그랬어요', '말할 걸 그랬어요', '말하지 마세요', '말하지 말 걸 그랬어요'],
          answer: 0,
          explanation: '对别人的责备"你怎么不……" → -지 그랬어요。말하다 → 말하지 그랬어요。', explanationEn: 'To reproach someone with "why didn\'t you..." → -지 그랬어요. 말하다 → 말하지 그랬어요.',
        },
        {
          prompt: '关于 -지 그랬어요 和 -지 마세요 的区别，哪句最准确？', promptEn: 'Which statement about the difference between -지 그랬어요 and -지 마세요 is most accurate?',
          options: [
            '两者意思相同',
            '-지 그랬어요 = 你怎么当时没做（过去责备）；-지 마세요 = 请不要做（禁止）',
            '-지 그랬어요 用于未来；-지 마세요 用于过去',
            '-지 그랬어요 是敬语；-지 마세요 是普通语',
          ],
          answer: 1,
          explanation: '-지 그랬어요 责备对方过去没做；-지 마세요 是现在/未来的禁止请求。方向和时态完全不同。', explanationEn: '-지 그랬어요 reproaches the other person for not doing something in the past; -지 마세요 is a prohibition/request for the present or future. The direction and tense are completely different.',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l02', 'card-p21-l04'],
    step0Html: `<div class="card-title">-지 그랬어요</div>
<div class="card-body">"你怎么不……呢" —— 对别人过去没做的事的责备+建议。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">自责 vs 责别人 · 语法配对</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">自己（第2课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">내가 갈 걸 그랬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我当时该去的。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">别人（这一课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">너 가지 그랬어.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">你怎么当时没去呢。</div>
    </div>
  </div>
</div>
<div class="reminder-box">注意：-지 그랬어요 (责备) 和 -지 마세요 (禁止) 长得像，意思完全相反。</div>`,
    compareHtml: `<div class="card-title">-지 그랬어요 vs -지 마세요</div>
<div class="card-body">长得像但方向完全相反的两个语法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지 그랬어요 → 过去责备</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"你怎么当时没做"（对过去）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가지 그랬어요.</span><span style="font-size:16px;color:#5a4640">你怎么当时没去呢？</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지 마세요 → 现在禁止</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"请不要做"（对现在/未来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가지 마세요.</span><span style="font-size:16px;color:#5a4640">请不要去。</span></div>
  </div>
</div>
<div class="reminder-box">看结尾：그랬어요 = 过去；마세요 = 现在禁止。混淆会闹笑话。</div>`,
    compareLabel: '-지 그랬어요 vs -지 마세요',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 7 课</div>
    <div class="ov-hero-title">-지 그랬어요</div>
    <div class="ov-hero-sub">"你怎么不……呢" · 对他人过去行为的责备</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词词干 + <b style="color:#ff7fa8">지 그랬어요</b>（不看收音）<br>
        主语通常是听话人（你）。<br>
        只接动词，不接形容词。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        피곤하면 쉬지 그랬어요.（累了怎么不休息呢）<br>
        모르면 물어보지 그랬어.（不懂怎么不问呢）<br>
        아프면 병원에 가지 그랬어.（不舒服怎么不去医院呢）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가지 마세요（想说"怎么当时没去"）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가지 그랬어요（过去责备）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내가 가지 그랬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">내가 갈 걸 그랬어요（自责用 -을 걸）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第8课：-았/었어도 ─────────────────────────────────────
  {
    id: 'card-p21-l08',
    partNumber: 21,
    lessonNumber: 8,
    title: '-았/었어도',
    whatItDoes: '即使当时……了（反事实让步）', whatItDoesEn: 'Even if... had happened (counterfactual concession)',
    whatItDoesBody: '表达"即使过去做了/是了，结果也不会变"的让步语气。\n和 -아/어도（即使……）是同一结构的过去反事实版本。\n常和 -았을 것이다 / -았을 텐데 搭配，强调"改变过去也没用"。', whatItDoesBodyEn: 'Expresses a concessive tone that "even if it had been done or been the case in the past, the result wouldn\'t change." It\'s the past counterfactual version of -아/어도 (even if...). Often paired with -았을 것이다 / -았을 텐데 to emphasize that "changing the past wouldn\'t help."',
    structureNote: '结构：动词/形容词过去词干（-았/었-）+ 어도。\n跟第一课 -았더라면 结构相似，但意思相反：\n· -았더라면 = "要是当时……的话"（假设改变）\n· -았어도 = "即使当时……了"（改变了也没用）', structureNoteEn: 'Structure: verb/adjective past stem (-았/었-) + 어도.\\nSimilar to Lesson 1\'s -았더라면, but opposite in meaning:\\n· -았더라면 = "If only I had..." (hypothetical change)\\n· -았어도 = "Even if I had..." (change wouldn\'t have helped)',
    rulesNote: '判断口诀：\n· 假设改变过去，好结果会发生 → -았더라면\n· 假设改变过去，结果照样不好 → -았어도\n后半句通常带否定或负面含义。', rulesNoteEn: 'Quick rule:\\n· If changing the past would lead to a good outcome → -았더라면\\n· If changing the past wouldn\'t improve things → -았어도\\nThe second clause usually has a negative or unfavorable meaning.',
    structures: [
      {
        ko: '어제 갔어도 못 만났을 거예요',
        zh: '昨天就算去了也见不到。', zhEn: 'Even if I had gone yesterday, I wouldn\'t have been able to see them.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '갔어도', role: 'verb' },
          { text: '못 만났을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '더 열심히 공부했어도 시험에 떨어졌을 거예요',
        zh: '就算更努力学习，考试也会不及格。', zhEn: 'Even if I studied harder, I would still fail the exam.',
        tokens: [
          { text: '더 열심히', role: 'plain' },
          { text: '공부했어도', role: 'verb' },
          { text: '시험에', role: 'place' },
          { text: '떨어졌을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '그때 알았어도 도와줄 수 없었을 거예요',
        zh: '当时就算知道了也帮不上忙。', zhEn: 'Even if I had known then, I couldn\'t have helped.',
        tokens: [
          { text: '그때', role: 'time' },
          { text: '알았어도', role: 'verb' },
          { text: '도와줄 수 없었을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '부자였어도 그 문제는 해결 못 했을 거예요',
        zh: '就算是有钱人也解决不了那个问题。', zhEn: 'Even a rich person couldn\'t solve that problem.',
        tokens: [
          { text: '부자였어도', role: 'verb' },
          { text: '그 문제는', role: 'object' },
          { text: '해결 못 했을 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词过去词干 + 어도', textEn: 'Verb/Adjective past stem + 어도', examples: '가다→갔어도 / 먹다→먹었어도 / 하다→했어도 / 예쁘다→예뻤어도' },
      { type: 'rule', text: '名词 + 이었어도 / 였어도', textEn: 'Noun + 이었어도 / 였어도', examples: '학생이었어도 / 부자였어도' },
      { type: 'usage', text: '表达"即使过去改变了，结果也不会变"', textEn: 'Expresses that even if the past had changed, the result would remain the same.', examples: '갔어도 못 만났을 거예요（去了也见不到）', examplesEn: '갔어도 못 만났을 거예요 (Even if I went, I wouldn\'t have met them)' },
      { type: 'compare', text: '和 -았더라면 对立：一个假设结果会好，一个假设结果照样不好', textEn: 'Contrasts with -았더라면: one assumes a better result, the other assumes the result stays bad.', examples: '갔더라면 만났을 거예요（去了就能见）/ 갔어도 못 만났을 거예요（去了也见不到）', examplesEn: '갔더라면 만났을 거예요 (If I had gone, I would have met them) / 갔어도 못 만났을 거예요 (Even if I went, I wouldn\'t have met them)' },
      { type: 'compare', text: '和 -아/어도 差别：现在假设 vs 过去反事实', textEn: 'Difference from -아/어도: present hypothetical vs past counterfactual.', examples: '가도 안 만나요（现在去也见不到，一般规律）/ 갔어도 못 만났을 거예요（当时去了也见不到）', examplesEn: '가도 안 만나요 (Even if I go now, I won\'t see them, general rule) / 갔어도 못 만났을 거예요 (Even if I had gone then, I wouldn\'t have met them)' },
      { type: 'note', text: '后半句常配 -았을 것이다 / -았을 텐데 / 못 -았을 것이다', textEn: 'The second clause often pairs with -았을 것이다 / -았을 텐데 / 못 -았을 것이다.', examples: '알았어도 소용없었을 거예요 / 참았어도 결과는 같았을 거예요' },
      { type: 'note', text: '核心是"结果和这个条件无关、照旧"，不是"结果一定坏"。后半句多为负面只是习惯，正面也完全成立', textEn: 'The core is that the result is unaffected by this condition and stays the same, not that the result is necessarily bad. The second clause is often negative out of habit, but positive is perfectly fine.', examples: '비가 왔어도 갔을 거예요（即使下雨也照样会去·正面）/ 갔어도 못 만났을 거예요（去了也见不到·负面）', examplesEn: '비가 왔어도 갔을 거예요 (Even if it rained, I would still go·positive) / 갔어도 못 만났을 거예요 (Even if I went, I wouldn\'t have met them·negative)' },
      { type: 'example', text: '갔어도 못 만났을 거예요 / 알았어도 소용없었을 거예요 / 부자였어도 못 샀을 거예요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '갔어도', role: 'verb' },
          { text: '못 만났을 거예요', role: 'verb' },
        ],
        zh: '昨天就算去了也见不到。', zhEn: 'Even if I had gone yesterday, I wouldn\'t have been able to see them.',
        swapWords: ['갔어도', '왔어도', '기다렸어도'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '더 열심히', role: 'plain' },
          { text: '공부했어도', role: 'verb' },
          { text: '떨어졌을 거예요', role: 'verb' },
        ],
        zh: '就算更努力学习，也会不及格。', zhEn: 'Even if I studied harder, I\'d still fail.',
        swapWords: ['공부했어도', '준비했어도', '연습했어도'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그때', role: 'time' },
          { text: '알았어도', role: 'verb' },
          { text: '도와줄 수 없었을 거예요', role: 'verb' },
        ],
        zh: '当时就算知道了也帮不上忙。', zhEn: 'Even if I had known then, I couldn\'t have helped.',
        swapWords: ['알았어도', '봤어도', '들었어도'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '부자였어도', role: 'verb' },
          { text: '그 문제는', role: 'object' },
          { text: '해결 못 했을 거예요', role: 'verb' },
        ],
        zh: '就算是有钱人也解决不了那个问题。', zhEn: 'Even a rich person couldn\'t solve that problem.',
        swapWords: ['부자였어도', '똑똑했어도', '유명했어도'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📞', context: '朋友没在家', contextEn: 'Friend wasn\'t home.', ko: '전화했어도 못 받았을 거예요. 회의 중이었대요.', zh: '就算打了电话也接不到，他说在开会。', zhEn: 'Even if I called, he wouldn\'t have answered; he said he was in a meeting.' },
      { icon: '🏥', context: '结果不改变', contextEn: 'The result doesn\'t change.', ko: '병원에 갔어도 결과는 같았을 거예요.', zh: '就算去了医院结果也一样。', zhEn: 'Even if I went to the hospital, the result would be the same.' },
      { icon: '📝', context: '考试宿命', contextEn: 'Exam fate.', ko: '아무리 열심히 공부했어도 그 문제는 못 풀었을 거예요.', zh: '再怎么努力学，那道题也解不出来。', zhEn: 'No matter how hard I studied, I couldn\'t solve that problem.' },
      { icon: '⏰', context: '注定错过', contextEn: 'Destined to miss.', ko: '조금 더 일찍 나왔어도 지하철은 놓쳤을 거예요.', zh: '就算再早出来一点，地铁也一样赶不上。', zhEn: 'Even if I left a bit earlier, I still would have missed the subway.' },
      { icon: '💰', context: '钱也没用', contextEn: 'Money wouldn\'t help either.', ko: '돈이 있었어도 못 샀을 거예요. 이미 다 팔렸어요.', zh: '就算有钱也买不了，已经卖光了。', zhEn: 'Even if you had the money, you couldn\'t buy it—it\'s already sold out.' },
      { icon: '🙅', context: '劝阻无效', contextEn: 'Persuasion was ineffective', ko: '말렸어도 결국 그 사람은 그렇게 했을 거예요.', zh: '就算劝了，那个人最终也还是会那样做。', zhEn: 'Even if you tried to persuade them, that person would still end up doing it anyway.' },
    ],
    mistakes: [
      { wrong: '갔어도 만났을 거예요（想表达"就算去了也见不到"）', wrongEn: '갔어도 만났을 거예요 (intending to say "even if I went, I wouldn\'t have seen them")', correct: '갔어도 못 만났을 거예요', note: '想说"见不到"就得加 못。这里错在漏了否定，不是句型错。（갔어도 만났을 거예요 本身是对的句子，意思是"即使去了也照样能见到"。）', noteEn: 'To say "wouldn\'t have seen," you need to add 못. The mistake here is omitting the negation, not the sentence pattern. (갔어도 만났을 거예요 is a correct sentence on its own, meaning "even if I went, I would still have seen them.")' },
      { wrong: '가도 못 만났을 거예요（想表达过去反事实）', wrongEn: '가도 못 만났을 거예요 (intending to express a past counterfactual)', correct: '갔어도 못 만났을 거예요', note: '-아/어도（现在时）表一般规律；过去反事实必须用 -았/었어도。', noteEn: '-아/어도 (present tense) expresses general rules; past counterfactuals must use -았/었어도.' },
      { wrong: '알았어도 도와줄 수 없어요', correct: '알았어도 도와줄 수 없었을 거예요', note: '前后时态一致：前半过去 → 后半也用过去推测形 -았을 것이다。', noteEn: 'Keep tenses consistent: if the first half is past, the second half should also use the past conjecture form -았을 것이다.' },
      { wrong: '학생어도 이해 못 했을 거예요', correct: '학생이었어도 이해 못 했을 거예요', note: '名词有收音 → 이었어도。학생 + 이었어도。', noteEn: 'If the noun ends in a final consonant → 이었어도. 학생 + 이었어도.' },
    ],
    quickTable: {
      title: '-았더라면 vs -았어도 · 反事实两方向', titleEn: '-았더라면 vs -았어도 · Two Directions of Counterfactuals',
      body: '两个语法结构相似，但方向完全相反。', bodyEn: 'The two grammar structures are similar, but their directions are completely opposite.',
      headers: ['结构', '含义', '例句', '中文'],
      rows: [
        [{ ko: '-았더라면', zh: '假设改变', zhEn: 'Hypothetical change' }, { ko: '要是当时……', zh: '结果就会好', zhEn: 'The result would have been better' }, { ko: '일찍 갔더라면 만났을 텐데요', zh: '要是早去就能见了', zhEn: 'If I had gone earlier, I could have seen them' }, '要是早去就能见到（假设成真结果好）'],
        [{ ko: '-았어도', zh: '让步反事实', zhEn: 'Concessive counterfactual' }, { ko: '即使当时……', zh: '结果也一样', zhEn: 'The result would have been the same' }, { ko: '일찍 갔어도 못 만났을 거예요', zh: '早去也见不到', zhEn: 'Even going early, I wouldn\'t have seen them' }, '就算早去也见不到（改变也没用）'],
        [{ ko: '-(으)면', zh: '现在假设', zhEn: 'Present hypothesis' }, { ko: '如果……', zh: '一般条件', zhEn: 'General condition' }, { ko: '일찍 가면 만나요', zh: '早去就能见', zhEn: 'Going early, I could see them' }, '现在早去就能见（一般规律）'],
        [{ ko: '-아/어도', zh: '现在让步', zhEn: 'Present concession' }, { ko: '即使现在……', zh: '一般让步', zhEn: 'General concession' }, { ko: '일찍 가도 못 만나요', zh: '早去也见不到', zhEn: 'Even going early, I wouldn\'t have seen them' }, '现在早去也见不到（一般让步）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-았더라면 还是 -았어도？', titleEn: '-았더라면 or -았어도?',
      body: '根据前后句关系选出正确表达。', bodyEn: 'Choose the correct expression based on the relationship between the clauses.',
      questions: [
        {
          prompt: '"就算当时早去了也见不到" → 일찍 ___ 못 만났을 거예요.', promptEn: '"Even if I had gone early then, I wouldn\'t have met them" → 일찍 ___ 못 만났을 거예요.',
          options: ['갔더라면', '가면', '가도', '갔어도'],
          answer: 3,
          explanation: '后半句是负面结果（못 만났을 거예요）→ 让步反事实 -았어도。갔어도。', explanationEn: 'The second half is a negative result (못 만났을 거예요) → concessive counterfactual -았어도. 갔어도.',
        },
        {
          prompt: '"要是早去了就能见到" → 일찍 ___ 만났을 거예요.', promptEn: '"If I had gone early, I would have met them" → 일찍 ___ 만났을 거예요.',
          options: ['갔어도', '가도', '갔더라면', '가면'],
          answer: 2,
          explanation: '后半句是正面结果（만났을 거예요）→ 假设改变 -았더라면。갔더라면。', explanationEn: 'The second half is a positive result (만났을 거예요) → hypothetical change -았더라면. 갔더라면.',
        },
        {
          prompt: '"当时就算知道也帮不了忙" → 그때 ___ 도와줄 수 없었을 거예요.', promptEn: '"Even if I had known then, I couldn\'t have helped" → 그때 ___ 도와줄 수 없었을 거예요.',
          options: ['알았더라면', '알아도', '알면', '알았어도'],
          answer: 3,
          explanation: '让步反事实：即使知道也没用 → -았어도。알았어도。', explanationEn: 'Concessive counterfactual: even if I knew, it wouldn\'t have helped → -았어도. 알았어도.',
        },
        {
          prompt: '关于 -았어도 的用法，哪句最准确？', promptEn: 'Which sentence is most accurate about the usage of -았어도?',
          options: [
            '表示"要是……就好了"（假设结果会变好）',
            '表示"即使当时……了，结果也不会变"（让步反事实）',
            '表示对未来的假设',
            '表示对现在情况的让步',
          ],
          answer: 1,
          explanation: '-았/었어도 用于过去反事实让步："即使当时改变了这个情况，结果也不会不同"。后半句常带负面结果。', explanationEn: '-았/었어도 is used for past counterfactual concession: "Even if this situation had changed then, the result wouldn\'t have been different." The second half often carries a negative result.',
        },
      ],
    },
    linkedGrammarIds: ['card-p21-l01', 'card-p8-l05'],
    step0Html: `<div class="card-title">-았/었어도</div>
<div class="card-body">"即使当时……也……" —— 过去反事实让步。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">-았더라면 vs -았어도 · 方向对立</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-았더라면（结果会变好）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 갔더라면 만났을 거예요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">早去就能见到。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-았어도（结果照样不好）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 갔어도 못 만났을 거예요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">早去也见不到。</div>
    </div>
  </div>
</div>
<div class="reminder-box">同一件事（早去了），用 -았더라면 表达"就能变好"，用 -았어도 表达"改变也没用"。</div>`,
    compareHtml: `<div class="card-title">-았어도 vs -아/어도</div>
<div class="card-body">同样是让步，时态不同意思差别大。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어도 → 一般让步</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"即使/就算……"，说规律</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 와도 갈 거예요.</span><span style="font-size:16px;color:#5a4640">就算下雨也要去。（未来）</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었어도 → 过去反事实让步</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"即使当时……了也没变"，说过去</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 왔어도 갔을 거예요.</span><span style="font-size:16px;color:#5a4640">即使下雨也会去了。（过去反事实）</span></div>
  </div>
</div>
<div class="reminder-box">现在/未来的让步用 -아/어도；讨论过去的反事实让步用 -았/었어도。</div>`,
    compareLabel: '-았어도 vs -아/어도',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 第 8 课</div>
    <div class="ov-hero-title">-았/었어도</div>
    <div class="ov-hero-sub">"即使当时……也……" · 过去反事实让步</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        过去词干（-았/었-）+ <b style="color:#ff7fa8">어도</b><br>
        名词 → 이었어도 / 였어도<br>
        后半句常配 -았을 것이다 / -았을 텐데。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        갔어도 못 만났을 거예요.（就算去了也见不到）<br>
        공부했어도 떨어졌을 거예요.（就算学习了也会不及格）<br>
        부자였어도 못 샀을 거예요.（就算是富人也买不了）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가도 못 만났을 거예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갔어도 못 만났을 거예요（过去词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갔어도 만났을 거예요（后半正面）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">正面结果用 -았더라면</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p21-l09',
    partNumber: 21,
    lessonNumber: 9,
    title: 'P21 综合练习', titleEn: 'P21 Comprehensive Practice',
    whatItDoes: 'P21 第1～8课 总复习', whatItDoesEn: 'P21 Lessons 1–8 Comprehensive Review',
    whatItDoesBody: '完成这份练习，检验假设与后悔八大语法是否掌握。\n共 10 题，覆盖 -았더라면、-을 걸 그랬다、-지 말 걸 그랬다、-았어야 했는데、-았으면 좋았을 텐데、-을 뻔했다、-지 그랬어요、-았어도。', whatItDoesBodyEn: 'Complete this exercise to test your mastery of the eight grammar points for hypotheses and regret.\\n10 questions covering -았더라면, -을 걸 그랬다, -지 말 걸 그랬다, -았어야 했는데, -았으면 좋았을 텐데, -을 뻔했다, -지 그랬어요, -았어도.',
    isPractice: true,
    structureNote: 'P21 假设与后悔八大语法：\n1. -았더라면（书面反事实）\n2. -을 걸 그랬다（自责该做的没做）\n3. -지 말 걸 그랬다（自责不该做的做了）\n4. -았어야 했는데（义务责任型懊悔）\n5. -았으면 좋았을 텐데（口语过去感叹）\n6. -을 뻔했다（差点儿）\n7. -지 그랬어요（责别人过去没做）\n8. -았어도（过去反事实让步）', structureNoteEn: 'P21 Eight Grammar Points for Hypotheses and Regret:\\n1. -았더라면 (written counterfactual)\\n2. -을 걸 그랬다 (self-blame for not doing what should have been done)\\n3. -지 말 걸 그랬다 (self-blame for doing what shouldn\'t have been done)\\n4. -았어야 했는데 (obligation-type regret)\\n5. -았으면 좋았을 텐데 (colloquial past lament)\\n6. -을 뻔했다 (almost)\\n7. -지 그랬어요 (blaming others for not doing something in the past)\\n8. -았어도 (past counterfactual concession)',
    structures: [
      { ko: '일찍 갔더라면 만났을 텐데요', zh: '要是早去就能见到了。', zhEn: 'If I had gone earlier, I could have seen them.', tokens: [{ text: '일찍', role: 'plain' }, { text: '갔더라면', role: 'verb' }, { text: '만났을 텐데요', role: 'verb' }] },
      { ko: '그 옷을 살 걸 그랬어요', zh: '当时该买那件衣服的。', zhEn: 'I should have bought that outfit back then.', tokens: [{ text: '그 옷을', role: 'object' }, { text: '살 걸 그랬어요', role: 'verb' }] },
      { ko: '많이 먹지 말 걸 그랬어요', zh: '不该吃那么多的。', zhEn: 'I shouldn\'t have eaten so much.', tokens: [{ text: '많이', role: 'plain' }, { text: '먹지 말 걸 그랬어요', role: 'verb' }] },
      { ko: '사과했어야 했는데 못 했어요', zh: '本该道歉的没做到。', zhEn: 'I should have apologized but didn\'t.', tokens: [{ text: '사과했어야 했는데', role: 'verb' }, { text: '못 했어요', role: 'verb' }] },
      { ko: '시험이 쉬웠으면 좋았을 텐데요', zh: '考试要是简单点就好了。', zhEn: 'I wish the exam had been easier.', tokens: [{ text: '시험이', role: 'subject' }, { text: '쉬웠으면 좋았을 텐데요', role: 'verb' }] },
      { ko: '넘어질 뻔했어요', zh: '差点摔倒。', zhEn: 'I almost fell.', tokens: [{ text: '넘어질 뻔했어요', role: 'verb' }] },
      { ko: '아프면 병원에 가지 그랬어요', zh: '不舒服怎么不去医院呢？', zhEn: 'If you\'re not feeling well, why didn\'t you go to the hospital?', tokens: [{ text: '아프면', role: 'verb' }, { text: '병원에', role: 'place' }, { text: '가지 그랬어요', role: 'verb' }] },
      { ko: '갔어도 못 만났을 거예요', zh: '去了也见不到。', zhEn: 'Even if I went, I wouldn\'t have seen them.', tokens: [{ text: '갔어도', role: 'verb' }, { text: '못 만났을 거예요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '书面反事实假设 → -았더라면 + -았을 텐데', textEn: 'Written counterfactual hypothesis → -았더라면 + -았을 텐데', examples: '갔더라면 만났을 텐데요（要是去了的话就能见到了。）', examplesEn: '갔더라면 만났을 텐데요 (If I had gone, I could have met them.)' },
      { type: 'rule', text: '口语过去感叹 → -았으면 좋았을 텐데', textEn: 'Spoken past regret → -았으면 좋았을 텐데', examples: '갔으면 좋았을 텐데요（要是去了就好了。）', examplesEn: '갔으면 좋았을 텐데요 (It would have been nice if I had gone.)' },
      { type: 'rule', text: '自责该做没做 → -을/ㄹ 걸 그랬다', textEn: 'Self-blame for not doing what should have been done → -을/ㄹ 걸 그랬다', examples: '갈 걸 그랬어요（早知道就去了，真该去的。）', examplesEn: '갈 걸 그랬어요 (I should have gone; I really should have.)' },
      { type: 'rule', text: '自责做了不该做 → -지 말 걸 그랬다', textEn: 'Self-blame for doing what shouldn\'t have been done → -지 말 걸 그랬다', examples: '먹지 말 걸 그랬어요（早知道就不吃了。）', examplesEn: '먹지 말 걸 그랬어요 (I shouldn\'t have eaten it.)' },
      { type: 'rule', text: '义务责任懊悔 → -았어야 했는데', textEn: 'Regret over duty or responsibility → -았어야 했는데', examples: '갔어야 했는데 못 갔어요（本该去的，却没能去。）', examplesEn: '갔어야 했는데 못 갔어요 (I should have gone, but I couldn\'t.)' },
      { type: 'rule', text: '差点发生 → -을/ㄹ 뻔했다', textEn: 'Almost happened → -을/ㄹ 뻔했다', examples: '넘어질 뻔했어요（差点摔倒。）', examplesEn: 'I almost fell.' },
      { type: 'rule', text: '责别人过去没做 → -지 그랬어요', textEn: 'Blaming someone for not doing something → -지 그랬어요', examples: '가지 그랬어요（你当时去了就好了，怎么不去呢。）', examplesEn: 'You should have gone then; why didn\'t you?' },
      { type: 'rule', text: '过去反事实让步 → -았/었어도 + -았을 것이다', textEn: 'Past counterfactual concession → -았/었어도 + -았을 것이다', examples: '갔어도 못 만났을 거예요（就算去了也见不到吧。）', examplesEn: 'Even if you went, you wouldn\'t have met them.' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '조금', role: 'plain' }, { text: '일찍', role: 'plain' }, { text: '갔더라면', role: 'verb' }, { text: '만났을 텐데요', role: 'verb' }],
        zh: '要是再早点去就能见到了。', zhEn: 'If I had gone a bit earlier, I could have seen them.',
        swapRole: 'verb',
        swapWords: ['갔더라면', '나왔더라면', '출발했더라면'],
      },
      {
        wordBlocks: [{ text: '한국어를', role: 'object' }, { text: '더 일찍', role: 'plain' }, { text: '배울 걸 그랬어요', role: 'verb' }],
        zh: '当时该早点学韩语的。', zhEn: 'I should have started learning Korean earlier.',
        swapRole: 'verb',
        swapWords: ['배울 걸 그랬어요', '시작할 걸 그랬어요', '공부할 걸 그랬어요'],
      },
      {
        wordBlocks: [{ text: '지갑을', role: 'object' }, { text: '두고 갈 뻔했어요', role: 'verb' }],
        zh: '差点把钱包忘了。', zhEn: 'I almost forgot my wallet.',
        swapRole: 'object',
        swapWords: ['지갑을', '핸드폰을', '가방을'],
      },
    ],
    scenarios: [
      { icon: '🔮', context: '假设反事实', contextEn: 'Counterfactual hypothesis', ko: '일찍 알았더라면 도와줬을 텐데요.', zh: '早知道就帮忙了。', zhEn: 'If I had known, I would have helped.' },
      { icon: '💭', context: '自责', contextEn: 'Self-blame', ko: '진작 사과할 걸 그랬어요.', zh: '早该道歉的。', zhEn: 'I should have apologized earlier.' },
      { icon: '⚠️', context: '责别人', contextEn: 'Blaming others', ko: '피곤하면 좀 쉬지 그랬어요.', zh: '累了怎么不休息呢。', zhEn: 'Why didn\'t you rest when you were tired?' },
      { icon: '😅', context: '差点闯祸', contextEn: 'Almost caused trouble', ko: '큰일 날 뻔했어요.', zh: '差点出大事。', zhEn: 'It almost became a big deal.' },
      { icon: '🚫', context: '让步反事实', contextEn: 'Concessive counterfactual', ko: '전화했어도 못 받았을 거예요.', zh: '打了也接不到。', zhEn: 'Even if you called, they wouldn\'t have answered.' },
      { icon: '📝', context: '义务反省', contextEn: 'Reflecting on duty', ko: '미리 준비했어야 했는데 그러지 못했습니다.', zh: '本该提前准备没做到。', zhEn: 'I should have prepared in advance but didn\'t.' },
    ],
    mistakes: [
      { wrong: '내일 갔더라면 만나요', correct: '내일 가면 만나요', note: 'L01：-았더라면 只用于过去反事实，不能配未来。', noteEn: 'L01: -았더라면 is only for past counterfactuals, not future.' },
      { wrong: '먹을 걸 그랬어요（想说不该吃）', wrongEn: 'I shouldn\'t have eaten (meaning: I regret eating)', correct: '먹지 말 걸 그랬어요', note: 'L02/L03：应该做没做用 -을 걸 그랬다；做了不该做用 -지 말 걸 그랬다。', noteEn: 'L02/L03: Use -을 걸 그랬다 for should-have-done-but-didn\'t; use -지 말 걸 그랬다 for did-but-shouldn\'t-have.' },
      { wrong: '가야 했는데', correct: '갔어야 했는데', note: 'L04：必须过去词干 -았-。', noteEn: 'L04: Must use past stem -았-.' },
      { wrong: '내일 왔으면 좋았을 텐데요', correct: '내일 왔으면 좋겠어요', note: 'L05：未来愿望用 -았으면 좋겠다，过去遗憾才用 -았으면 좋았을 텐데。', noteEn: 'L05: Use -았으면 좋겠다 for future wishes; use -았으면 좋았을 텐데 for past regrets.' },
      { wrong: '넘어진 뻔했어요', correct: '넘어질 뻔했어요', note: 'L06：뻔하다 前必须是未来冠形 -을/ㄹ。', noteEn: 'L06: 뻔하다 must be preceded by future adnominal -을/ㄹ.' },
      { wrong: '내가 가지 그랬어요', correct: '내가 갈 걸 그랬어요', note: 'L07：自己的自责用 -을 걸 그랬다，责别人才用 -지 그랬어요。', noteEn: 'L07: Use -을 걸 그랬다 for self-blame, and -지 그랬어요 when blaming others.' },
      { wrong: '갔어도 만났을 거예요', correct: '갔더라면 만났을 거예요 / 갔어도 못 만났을 거예요', note: 'L08：-았어도 后半句必须是负面结果；正面结果用 -았더라면。', noteEn: 'L08: With -았어도, the second clause must be a negative result; for positive results, use -았더라면.' },
    ],
    linkedGrammarIds: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习 · 假设与后悔八大语法', titleEn: 'Comprehensive Practice · Eight Grammar Points for Hypotheses and Regret',
      body: '根据语境选出最合适的表达。', bodyEn: 'Choose the most appropriate expression based on the context.',
      questions: [
        {
          prompt: '"要是早点出发就不会迟到" → 일찍 ___ 지각하지 않았을 텐데요.', promptEn: '"If I had left earlier, I wouldn\'t have been late" → 일찍 ___ 지각하지 않았을 텐데요.',
          options: ['출발하면', '출발했더라면', '출발하지 그랬어', '출발할 뻔했는데'],
          answer: 1,
          explanation: 'L01 反事实假设：过去反事实 + 后半是好结果 → -았더라면。', explanationEn: 'L01 Counterfactual: past counterfactual + good result → -았더라면.',
        },
        {
          prompt: '"当时该给妈妈打电话的（我没打）" → 엄마한테 ___.', promptEn: '"I should have called Mom then (but I didn\'t)" → 엄마한테 ___.',
          options: ['전화하지 그랬어요', '전화하지 말 걸 그랬어요', '전화할 걸 그랬어요', '전화할 뻔했어요'],
          answer: 2,
          explanation: 'L02 自责该做没做 → -을 걸 그랬다。전화하다 → 전화할 걸 그랬어요。', explanationEn: 'L02 Self-blame for not doing what should have been done → -을 걸 그랬다. 전화하다 → 전화할 걸 그랬어요.',
        },
        {
          prompt: '"当时不该说那种话的（我说了）" → 그런 말을 ___.', promptEn: '"I shouldn\'t have said that then (but I did)" → 그런 말을 ___.',
          options: ['할 걸 그랬어요', '하지 말 걸 그랬어요', '했어야 했는데', '할 뻔했어요'],
          answer: 1,
          explanation: 'L03 自责做了不该做 → -지 말 걸 그랬다。하다 → 하지 말 걸 그랬어요。', explanationEn: 'L03 Self-blame for doing what shouldn\'t have been done → -지 말 걸 그랬다. 하다 → 하지 말 걸 그랬어요.',
        },
        {
          prompt: '"本来该提前准备的（这是责任）" → 미리 ___ 못 했어요.', promptEn: '"I should have prepared in advance (it was my responsibility)" → 미리 ___ 못 했어요.',
          options: ['준비할 걸 그랬는데', '준비했어야 했는데', '준비하지 그랬는데', '준비할 뻔했는데'],
          answer: 1,
          explanation: 'L04 义务责任懊悔 → -았/었어야 했는데。语气比 -을 걸 그랬다 更重。', explanationEn: 'L04 Regret over duty/responsibility → -았/었어야 했는데. Stronger tone than -을 걸 그랬다.',
        },
        {
          prompt: '"昨天天气要是暖和点就好了"（口语感叹）→ 어제 날씨가 ___.', promptEn: '"If only the weather had been warmer yesterday" (casual exclamation) → 어제 날씨가 ___.',
          options: ['따뜻하면 좋았을 텐데요', '따뜻했으면 좋았을 텐데요', '따뜻했더라면요', '따뜻할 뻔했어요'],
          answer: 1,
          explanation: 'L05 口语过去遗憾 → -았/었으면 좋았을 텐데。따뜻하다 → 따뜻했으면 좋았을 텐데。', explanationEn: 'L05 Casual past regret → -았/었으면 좋았을 텐데. 따뜻하다 → 따뜻했으면 좋았을 텐데.',
        },
        {
          prompt: '"差点把钱包忘在咖啡店" → 지갑을 카페에 ___.', promptEn: '"I almost left my wallet at the café" → 지갑을 카페에 ___.',
          options: ['두고 갈 걸 그랬어요', '두고 간 뻔했어요', '두고 갈 뻔했어요', '두고 갔어야 했는데'],
          answer: 2,
          explanation: 'L06 差点发生 → -을/ㄹ 뻔했다。두고 가다（无收音）→ 두고 갈 뻔했어요。', explanationEn: 'L06 Almost happened → -을/ㄹ 뻔했다. 두고 가다 (no final consonant) → 두고 갈 뻔했어요.',
        },
        {
          prompt: '"你不舒服怎么不去医院呢？"（对朋友说）→ 아프면 ___.', promptEn: '"If you\'re not feeling well, why don\'t you go to the hospital?" (to a friend) → 아프면 ___.',
          options: ['병원에 가지 마세요', '병원에 갈 걸 그랬어요', '병원에 가지 그랬어요', '병원에 갈 뻔했어요'],
          answer: 2,
          explanation: 'L07 责别人过去没做 → -지 그랬어요。가다 → 가지 그랬어요。', explanationEn: 'L07 Blaming others for not doing something → -지 그랬어요. 가다 → 가지 그랬어요.',
        },
        {
          prompt: '"就算当时早去了也见不到"（结果不变） → 일찍 ___ 못 만났을 거예요.', promptEn: '"Even if I had gone early then, I wouldn\'t have met them" (result unchanged) → 일찍 ___ 못 만났을 거예요.',
          options: ['갔더라면', '가면', '가도', '갔어도'],
          answer: 3,
          explanation: 'L08 过去反事实让步（结果照样不好）→ -았/었어도。갔어도 못 만났을 거예요。', explanationEn: 'L08 Past counterfactual concession (result still bad) → -았/었어도. 갔어도 못 만났을 거예요.',
        },
        {
          prompt: '"你怎么当时不别发火呢"（责别人做了不该做）→ 그렇게 ___.', promptEn: '"Why did you get so angry then?" (blaming someone for doing something they shouldn\'t) → 그렇게 ___.',
          options: ['화낼 걸 그랬어', '화낸 뻔했어', '화내지 마세요', '화내지 말지 그랬어'],
          answer: 3,
          explanation: 'L07 否定形责备 → -지 말지 그랬어요。화내다 → 화내지 말지 그랬어。', explanationEn: 'L07 Negative blame → -지 말지 그랬어요. 화내다 → 화내지 말지 그랬어.',
        },
        {
          prompt: '关于假设与后悔的语法选择，哪句最准确？', promptEn: 'Regarding grammar choices for hypotheses and regrets, which sentence is most accurate?',
          options: [
            '自责该做没做用 -지 그랬어요',
            '责别人过去没做用 -을 걸 그랬다',
            '自责该做没做用 -을 걸 그랬다；责别人过去没做用 -지 그랬어요',
            '两个语法可以任意互换',
          ],
          answer: 2,
          explanation: '这两个语法方向相反：-을 걸 그랬다 说自己（我该……）；-지 그랬어요 说别人（你怎么没……）。', explanationEn: 'These two grammar points are opposite: -을 걸 그랬다 talks about oneself (I should have...); -지 그랬어요 talks about others (Why didn\'t you...?).',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P21 · 综合练习</div>
    <div class="ov-hero-title">P21 综合练习</div>
    <div class="ov-hero-sub">假设与后悔 · 八大语法总复习</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">语法清单</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L01</span> -았더라면 · 书面反事实假设</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L02</span> -을/ㄹ 걸 그랬다 · 自责该做没做</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L03</span> -지 말 걸 그랬다 · 自责做了不该做</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L04</span> -았어야 했는데 · 义务责任懊悔</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L05</span> -았으면 좋았을 텐데 · 口语过去感叹</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L06</span> -을/ㄹ 뻔했다 · 差点儿</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L07</span> -지 그랬어요 · 责别人过去没做</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L08</span> -았어도 · 过去反事实让步</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">配对记忆</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b>自责 vs 责别人</b>：내가 갈 걸 그랬어요 / 너 가지 그랬어<br>
        <b>该做没做 vs 做了不该做</b>：할 걸 그랬어 / 하지 말 걸 그랬어<br>
        <b>假设结果好 vs 结果不变</b>：갔더라면 만났을 / 갔어도 못 만났을<br>
        <b>过去遗憾 vs 未来希望</b>：왔으면 좋았을 텐데 / 왔으면 좋겠어요
      </div>
    </div>
  </div>
</div>`,
  },

];
