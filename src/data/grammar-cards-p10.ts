import type { GrammarCard } from '@/types';

export const grammarCardsP10: GrammarCard[] = [
  {
    id: 'card-p10-l01',
    partNumber: 10,
    lessonNumber: 1,
    title: '-을/ㄹ 뿐, -을/ㄹ 뿐이다',
    whatItDoes: '强调"只不过……而已"，限定动作或状态的范围',
    whatItDoesBody: '-을/ㄹ 뿐 表示"只是/仅仅"，后面通常接否定或说明。\n-을/ㄹ 뿐이다 作为谓语，表达"只是……罢了"，常带有谦虚、无奈或限定的语气。\n口语和书面语都常见，韩剧台词和正式场合都会用到。',
    structures: [
      {
        ko: '저는 그냥 도와주고 싶었을 뿐이에요',
        zh: '我只是想帮帮你而已。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '그냥', role: 'plain' },
          { text: '도와주고 싶었을', role: 'verb' },
          { text: '뿐이에요', role: 'verb' },
        ],
      },
      {
        ko: '할 수 있을 뿐 잘한다고는 할 수 없어요',
        zh: '只是能做而已，不能说做得好。',
        tokens: [
          { text: '할 수 있을 뿐', role: 'verb' },
          { text: '잘한다고는', role: 'verb' },
          { text: '할 수 없어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람은 웃었을 뿐인데 왜 화가 났어요',
        zh: '那个人只是笑了一下，为什么生气了？',
        tokens: [
          { text: '그 사람은', role: 'subject' },
          { text: '웃었을 뿐인데', role: 'verb' },
          { text: '왜 화가 났어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 학생일 뿐이에요',
        zh: '我只不过是个学生而已。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생일 뿐이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词接 뿐：有收音 + 을 뿐，无收音 + ㄹ 뿐', examples: '먹을 뿐 / 갈 뿐 / 좋을 뿐 / 클 뿐' },
      { type: 'rule', text: '名词接 뿐：名词 + 일 뿐（이다的 뿐 形式）', examples: '학생일 뿐 / 친구일 뿐 / 꿈일 뿐' },
      { type: 'usage', text: '-을 뿐 后面常接 아니라（不只是……）形成转折', examples: '공부할 뿐만 아니라 운동도 해요（不只学习，还运动）' },
      { type: 'note', text: '-을 뿐이다 常用于解释或辩解，表示"没有其他意图"', examples: '농담했을 뿐이에요 = 我只是开玩笑而已' },
      { type: 'compare', text: '-을 뿐 vs -만：意思相近，但 뿐 更书面、更有语气', examples: '먹을 뿐 vs 먹기만 해요（两者都"只是吃"，뿐 更强调无其他）' },
      { type: 'example', text: '韩剧常见台词：나는 네가 잘 되기를 바랄 뿐이야', examples: '我只希望你好而已。' },
    ],
    cardExamples: [
      {
        zh: '我只是说了实话而已。',
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '사실을', role: 'object' },
          { text: '말했을 뿐이에요', role: 'verb' },
        ],
        swapWords: ['농담을 했을', '질문을 했을', '충고했을'],
      },
      {
        zh: '我只不过是朋友而已。',
        wordBlocks: [
          { text: '나는', role: 'subject' },
          { text: '그냥', role: 'plain' },
          { text: '친구일 뿐이야', role: 'verb' },
        ],
        swapWords: ['동료일 뿐이야', '학생일 뿐이야'],
      },
      {
        zh: '只是能做而已，并不完美。',
        wordBlocks: [
          { text: '할 수 있을 뿐', role: 'verb' },
          { text: '완벽하지는 않아요', role: 'verb' },
        ],
        swapWords: ['잘하지는 못해요', '전문가는 아니에요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '被误解动机，解释自己', ko: '저는 그냥 도와주려고 했을 뿐이에요. 나쁜 뜻은 없었어요.', zh: '我只是想帮忙而已，没有恶意。', tip: '나쁜 뜻 = 恶意' },
      { icon: '💬', context: '韩剧台词：表白被拒，对方说只是朋友', ko: '미안해. 나한테 넌 그냥 친구일 뿐이야.', zh: '对不起，对我来说你只是朋友而已。', tip: '经典韩剧台词，表示关系界限' },
      { icon: '💬', context: '谦虚介绍自己', ko: '저는 아직 배우는 중일 뿐이에요. 잘 부탁드립니다.', zh: '我还只是在学习中而已，请多关照。', tip: '배우는 중 = 正在学习中' },
      { icon: '💬', context: '强调只做了某事，没有其他', ko: '저는 버튼을 눌렀을 뿐인데 갑자기 꺼져 버렸어요.', zh: '我只是按了一下按钮，结果突然关机了。', tip: '-을 뿐인데 = 只是……却……（表意外）' },
      { icon: '💬', context: '夸人时对方谦虚回应', ko: 'A: 한국어 정말 잘하시네요! B: 아니요, 조금 할 수 있을 뿐이에요.', zh: 'A: 韩语说得真好！B: 不，只是会一点而已。', tip: '谦虚回应常用句型' },
    ],
    mistakes: [
      {
        wrong: '저는 학생뿐이에요',
        correct: '저는 학생일 뿐이에요',
        note: '名词后面需要 일 뿐（이다 的连接形式），不能直接接 뿐',
      },
      {
        wrong: '가뿐이에요',
        correct: '갈 뿐이에요',
        note: '动词接 뿐 时需要先变成冠词形（-을/ㄹ），不能直接接',
      },
      {
        wrong: '말할 뿐만 아니라도',
        correct: '말할 뿐만 아니라',
        note: '뿐만 아니라 是固定搭配，后面不加 도',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第1课</div>
    <div class="ov-hero-title">-을/ㄹ 뿐, -을/ㄹ 뿐이다</div>
    <div class="ov-hero-sub">限定范围——只是……而已</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">限定</div>
      <div class="ko">动词词干 + 을/ㄹ 뿐（이다）</div>
      <div class="zh">只是……而已（无其他意图/情况）</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词</div>
      <div class="ko">名词 + 일 뿐이다</div>
      <div class="zh">只不过是……而已</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">延伸用法</div></div>
    <div class="ov-block">
      <div class="ko">-을 뿐만 아니라</div>
      <div class="zh">不只是……（还……）</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">强调"只不过……而已"，限定动作或状态的范围</div>
<div class="card-body">-을/ㄹ 뿐 表示"只是/仅仅"，后面通常接否定或说明。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">저는 그냥 도와주고 싶었을 뿐이에요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我只是想帮帮你而已。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">할 수 있을 뿐 잘한다고는 할 수 없어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">只是能做而已，不能说做得好。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '뿐 vs 만',
    compareHtml: `
<div class="card-title">뿐 vs 만</div>
<div class="card-body">-을/ㄹ 뿐 表示"只是/仅仅"，后面通常接否定或说明。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">저는 그냥 도와주고 싶었을 뿐이에요</span><span style="font-size:16px;color:#5a4640">我只是想帮帮你而已。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">그 사람은 웃었을 뿐인데 왜 화가 났어요</span><span style="font-size:16px;color:#5a4640">那个人只是笑了一下，为什么生气了？</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">할 수 있을 뿐 잘한다고는 할 수 없어요</span><span style="font-size:16px;color:#5a4640">只是能做而已，不能说做得好。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '-을/ㄹ 뿐 接续形式',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 뿐', zh: '' }, { ko: '먹을 뿐이에요', zh: '' }, { ko: '只是吃而已', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 뿐', zh: '' }, { ko: '갈 뿐이에요', zh: '' }, { ko: '只是去而已', zh: '' }],
        [{ ko: '뿐이다', zh: '强调句式' }, { ko: '동사 + 을/ㄹ 뿐이다', zh: '' }, { ko: '기다릴 뿐이에요', zh: '' }, { ko: '只能等待而已', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 뿐（이다）',
      body: '测试对 뿐 用法的掌握',
      questions: [
        {
          prompt: '我只是说实话而已。→ 저는 사실을 ___',
          options: ['말하기 뿐이에요', '말하는 뿐이에요', '말할 뿐이에요', '말만이에요'],
          answer: 2 as 0|1|2|3,
          explanation: '-을/ㄹ 뿐이다：动词词干 + 을/ㄹ 뿐이다',
        },
        {
          prompt: '只能等待。→ 기다___ 뿐이에요',
          options: ['린', '리기', '리는', '릴'],
          answer: 3 as 0|1|2|3,
          explanation: '기다리다 无收音词干 → 기다릴 뿐이에요',
        },
        {
          prompt: '-을/ㄹ 뿐 与 만 的区别是？',
          options: ['뿐接动词冠词形，만接名词', '意思完全相同', '뿐接名词，만接动词', '两者都接名词'],
          answer: 0 as 0|1|2|3,
          explanation: '뿐 = 动词冠词形 + 뿐；만 = 名词 + 만',
        },
        {
          prompt: '只是笑了笑。→ 그냥 ___',
          options: ['웃만이었어요', '웃을 뿐이었어요', '웃는 뿐이었어요', '웃기 뿐이었어요'],
          answer: 1 as 0|1|2|3,
          explanation: '웃다 有收音 → 웃을 뿐이었어요',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p10-l02',
    partNumber: 10,
    lessonNumber: 2,
    title: '-(으)면 좋겠다, -기(를) 바라다',
    whatItDoes: '表达愿望和期望的两种核心句型',
    whatItDoesBody: '-(으)면 좋겠다 表示"要是……就好了"，用于表达个人希望或遗憾。\n-기(를) 바라다 表示"希望/期望……"，比 좋겠다 更正式，常用于书信、祝福语或正式场合。\n两者都表达期望，但语气和使用场合有明显区别。',
    structures: [
      {
        ko: '빨리 나았으면 좋겠어요',
        zh: '希望你早日康复。',
        tokens: [
          { text: '빨리', role: 'plain' },
          { text: '나았으면', role: 'verb' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
      {
        ko: '내일 날씨가 맑았으면 좋겠다',
        zh: '希望明天天气晴朗。',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '맑았으면 좋겠다', role: 'verb' },
        ],
      },
      {
        ko: '건강하시기를 바랍니다',
        zh: '祝您身体健康。',
        tokens: [
          { text: '건강하시기를', role: 'verb' },
          { text: '바랍니다', role: 'verb' },
        ],
      },
      {
        ko: '시험에 합격하기를 바라요',
        zh: '希望你能考过。',
        tokens: [
          { text: '시험에', role: 'place' },
          { text: '합격하기를', role: 'verb' },
          { text: '바라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)면 좋겠다：有收音 + 으면 좋겠다，无收音 + 면 좋겠다', examples: '먹으면 좋겠다 / 가면 좋겠다 / 크면 좋겠다' },
      { type: 'rule', text: '-기(를) 바라다：动词词干 + 기를 바라다（를 可省略）', examples: '합격하기를 바라다 / 행복하기를 바라다 / 잘 되기를 바라다' },
      { type: 'usage', text: '-(으)면 좋겠다 可用过去式表达对已发生情况的遗憾', examples: '안 갔으면 좋겠다（要是没去就好了）/ 말하지 않았으면 좋겠다' },
      { type: 'note', text: '-기를 바라다 多用于祝福、正式信件、演讲等场合', examples: '여러분의 성공을 바랍니다 / 부디 건강하시기를 바랍니다' },
      { type: 'compare', text: '-(으)면 좋겠다 vs -았/었으면 좋겠다：前者希望将来，后者对现状遗憾', examples: '비가 안 오면 좋겠다（以后）vs 비가 안 왔으면 좋겠다（现在还在下，遗憾）' },
      { type: 'example', text: '행복하게 살았으면 좋겠어', examples: '希望你能幸福地生活。（韩剧祝福台词）' },
    ],
    cardExamples: [
      {
        zh: '希望快点放假就好了。',
        wordBlocks: [
          { text: '빨리', role: 'plain' },
          { text: '방학이 됐으면', role: 'verb' },
          { text: '좋겠어요', role: 'verb' },
        ],
        swapWords: ['주말이 됐으면', '시험이 끝났으면', '봄이 됐으면'],
      },
      {
        zh: '今后也请多关照。',
        wordBlocks: [
          { text: '앞으로도', role: 'time' },
          { text: '잘 부탁드리기를', role: 'verb' },
          { text: '바랍니다', role: 'verb' },
        ],
        swapWords: ['건강하시기를', '행복하시기를'],
      },
      {
        zh: '要是早点知道就好了。',
        wordBlocks: [
          { text: '좀 더 일찍', role: 'plain' },
          { text: '알았으면', role: 'verb' },
          { text: '좋았을 텐데', role: 'verb' },
        ],
        swapWords: ['그때', '예전에', '말했으면', '만났으면'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '生病的朋友，送上祝愿', ko: '많이 힘들죠? 빨리 나았으면 좋겠어요. 푹 쉬세요.', zh: '很难受吧？希望你早日康复，好好休息。', tip: '푹 쉬다 = 好好休息' },
      { icon: '💬', context: '考试前给朋友加油', ko: '내일 시험 잘 보기를 바라요. 잘 할 수 있을 거예요!', zh: '希望你明天考试顺利。你一定可以的！', tip: '-기를 바라다 表达真诚的祝愿' },
      { icon: '💬', context: '韩剧台词：对情感的遗憾', ko: '우리가 좀 더 일찍 만났으면 좋았을 텐데.', zh: '要是我们早点相遇就好了。', tip: '-았으면 좋았을 텐데 = 对过去的遗憾假设' },
      { icon: '💬', context: 'KPOP 应援祝福语', ko: '오빠, 이번 컴백도 대박 나기를 바라요!', zh: '欧巴，希望这次回归也大卖！', tip: '대박 나다 = 大卖/大成功' },
      { icon: '💬', context: '正式信件结尾祝语', ko: '귀하의 건강과 행복을 기원하며, 항상 좋은 일만 있기를 바랍니다.', zh: '祝您健康幸福，愿一切顺利。', tip: '기원하다 = 祈愿；正式书面用语' },
    ],
    mistakes: [
      {
        wrong: '가기를 좋겠다',
        correct: '가면 좋겠다 / 가기를 바란다',
        note: '좋겠다 前面用 -(으)면，바라다 前面用 -기를，两者不能混用',
      },
      {
        wrong: '빨리 나았기를 바라요',
        correct: '빨리 나았으면 좋겠어요 / 빨리 낫기를 바라요',
        note: '-기를 바라다 接动词基本形词干，不加过去时态',
      },
      {
        wrong: '합격했으면 좋겠다（对方已经考完）',
        correct: '합격하기를 바라요 / 합격했으면 좋겠다（说话时还未出结果）',
        note: '-(으)면 좋겠다 的过去式用于现实相反的假设，若结果未定用现在时',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第2课</div>
    <div class="ov-hero-title">-(으)면 좋겠다, -기(를) 바라다</div>
    <div class="ov-hero-sub">愿望与期望的两种表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">愿望</div>
      <div class="ko">动词词干 + (으)면 좋겠다</div>
      <div class="zh">要是……就好了（个人希望/遗憾）</div>
    </div>
    <div class="ov-block">
      <div class="badge">期望</div>
      <div class="ko">动词词干 + 기(를) 바라다</div>
      <div class="zh">希望……（祝愿/正式期望）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">语气对比</div></div>
    <div class="ov-block">
      <div class="ko">-(으)면 좋겠다</div>
      <div class="zh">口语/日常，个人愿望</div>
    </div>
    <div class="ov-block">
      <div class="ko">-기를 바라다</div>
      <div class="zh">正式/书面，对他人的期望</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达愿望和期望的两种核心句型</div>
<div class="card-body">-(으)면 좋겠다 表示"要是……就好了"，用于表达个人希望或遗憾。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">빨리 나았으면 좋겠어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">希望你早日康复。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">내일 날씨가 맑았으면 좋겠다</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">希望明天天气晴朗。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '면 좋겠다 vs 기 바라다',
    compareHtml: `
<div class="card-title">면 좋겠다 vs 기 바라다</div>
<div class="card-body">-(으)면 좋겠다 表示"要是……就好了"，用于表达个人希望或遗憾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">빨리 나았으면 좋겠어요</span><span style="font-size:16px;color:#5a4640">希望你早日康复。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">건강하시기를 바랍니다</span><span style="font-size:16px;color:#5a4640">祝您身体健康。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">내일 날씨가 맑았으면 좋겠다</span><span style="font-size:16px;color:#5a4640">希望明天天气晴朗。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '两种愿望表达对比',
      headers: ['语法', '语感', '场合', '例句'],
      rows: [
        [{ ko: '-(으)면 좋겠다', zh: '' }, { ko: '主观期待', zh: '含遗憾' }, { ko: '日常口语', zh: '' }, { ko: '빨리 낫면 좋겠어요', zh: '快点好起来就好了' }],
        [{ ko: '-기(를) 바라다', zh: '' }, { ko: '祝愿他人', zh: '正式' }, { ko: '书面/正式', zh: '' }, { ko: '성공하기를 바랍니다', zh: '祝您成功' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)면 좋겠다, -기(를) 바라다',
      body: '测试对两个愿望表达的掌握',
      questions: [
        {
          prompt: '要是明天不下雨就好了。→ 내일 비가 안 ___',
          options: ['오지 바랍니다', '왔으면 좋겠어요', '오기를 바라요', '오면 좋겠어요'],
          answer: 3 as 0|1|2|3,
          explanation: '基于当前情况 → 오면 좋겠어요',
        },
        {
          prompt: '祝您万事如意。→ 모든 일이 잘 ___',
          options: ['되기를 바랍니다', '됩니다', '될 뿐이에요', '되면 좋겠어요'],
          answer: 0 as 0|1|2|3,
          explanation: '正式祝福 → -기를 바랍니다',
        },
        {
          prompt: '-(으)면 좋겠다 与 -기(를) 바라다 的语感区别是？',
          options: ['前者正式，后者口语', '前者日常主观，后者正式祝愿', '两者完全相同', '前者书面，后者只用于对话'],
          answer: 1 as 0|1|2|3,
          explanation: '면 좋겠다 = 主观期待；기 바라다 = 正式祝愿',
        },
        {
          prompt: '要是能见到他就好了。→ 그 사람을 만날 수 ___',
          options: ['있을 뿐이에요', '있기는 해요', '있으면 좋겠어요', '있기를 바라요'],
          answer: 2 as 0|1|2|3,
          explanation: '主观期待 → -(으)면 좋겠어요',
        },
      ],
    },
    linkedGrammarIds: ['g28'],
  },

  {
    id: 'card-p10-l03',
    partNumber: 10,
    lessonNumber: 3,
    title: '-을/ㄹ까 생각하다, -을/ㄹ 생각이다',
    whatItDoes: '表达"在考虑是否……"和"打算/有意……"的两种意向句型',
    whatItDoesBody: '-을/ㄹ까 생각하다 表示正在考虑要不要做某事，尚未决定，语气较犹豫。\n-을/ㄹ 생각이다 表示已有某种打算或意图，比 생각하다 更确定。\n两者都比 -겠다 或 -(으)려고 하다 更口语化、更日常。',
    structures: [
      {
        ko: '이번 주말에 등산을 갈까 생각하고 있어요',
        zh: '我在考虑这周末去登山。',
        tokens: [
          { text: '이번 주말에', role: 'time' },
          { text: '등산을', role: 'object' },
          { text: '갈까 생각하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '내년에 한국으로 유학을 갈까 해요',
        zh: '我在考虑明年去韩国留学。',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '한국으로', role: 'place' },
          { text: '유학을 갈까 해요', role: 'verb' },
        ],
      },
      {
        ko: '다음 달에 이사할 생각이에요',
        zh: '我打算下个月搬家。',
        tokens: [
          { text: '다음 달에', role: 'time' },
          { text: '이사할 생각이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 일은 그만둘 생각이 없어요',
        zh: '我没有辞掉那份工作的打算。',
        tokens: [
          { text: '그 일은', role: 'subject' },
          { text: '그만둘 생각이 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을/ㄹ까 생각하다：有收音 + 을까, 无收音 + ㄹ까, 后接 생각하다/생각 중이다', examples: '먹을까 생각해요 / 갈까 생각 중이에요 / 그만둘까 생각하고 있어요' },
      { type: 'rule', text: '-을/ㄹ 생각이다：有收音 + 을 생각이다, 无收音 + ㄹ 생각이다', examples: '먹을 생각이에요 / 갈 생각이에요 / 쉴 생각이에요' },
      { type: 'usage', text: '-을까 하다 是 -을까 생각하다 的口语缩略形式，两者可互换', examples: '갈까 해요 = 갈까 생각해요（正在考虑去）' },
      { type: 'note', text: '-을 생각이 없다 表示没有打算，-을 생각이 있다 表示有打算', examples: '결혼할 생각이 없어요（不打算结婚）/ 이직할 생각이 있어요（有想换工作）' },
      { type: 'compare', text: '-을 생각이다 vs -(으)려고 하다：생각이다 更偏想法，려고 하다 更偏行动准备', examples: '이사할 생각이에요（有这个想法）vs 이사하려고 해요（在准备搬家了）' },
      { type: 'example', text: '요즘 다이어트를 시작할까 생각 중이에요', examples: '最近在考虑开始减肥。' },
    ],
    cardExamples: [
      {
        zh: '我在考虑买新手机。',
        wordBlocks: [
          { text: '새 핸드폰을', role: 'object' },
          { text: '살까', role: 'verb' },
          { text: '생각하고 있어요', role: 'verb' },
        ],
        swapWords: ['노트북을', '자전거를', '카메라를', '바꿀까', '살까 말까'],
      },
      {
        zh: '打算毕业后去读研究生。',
        wordBlocks: [
          { text: '졸업 후에', role: 'time' },
          { text: '대학원에', role: 'place' },
          { text: '갈 생각이에요', role: 'verb' },
        ],
        swapWords: ['해외에', '회사에', '한국에', '갈 생각이 없어요', '가려고 해요'],
      },
      {
        zh: '这个假期在考虑参加韩语考试。',
        wordBlocks: [
          { text: '이번 방학에', role: 'time' },
          { text: '한국어 시험을', role: 'object' },
          { text: '볼까 해요', role: 'verb' },
        ],
        swapWords: ['운전 면허를', 'TOPIK을', '볼 생각이에요', '준비할까 해요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '和朋友商量周末计划', ko: '이번 주말에 캠핑 갈까 생각하고 있는데, 같이 갈래요?', zh: '这周末在考虑去露营，要不要一起去？', tip: '-는데 + 같이 갈래요 = 说明想法后邀请' },
      { icon: '💬', context: '被问到未来计划', ko: 'A: 졸업 후에 뭐 할 거예요? B: 취직할 생각이에요. 아직 구체적으로는 모르겠어요.', zh: 'A: 毕业后打算做什么？B: 打算找工作，但具体还不确定。', tip: '구체적으로 = 具体地' },
      { icon: '💬', context: 'KPOP 粉丝讨论去演唱会', ko: '이번 콘서트 갈까 생각 중인데, 티켓이 너무 비싸서 고민이에요.', zh: '在考虑要不要去这次演唱会，但票太贵了很纠结。', tip: '고민이다 = 很纠结/烦恼' },
      { icon: '💬', context: '韩剧台词：表达放弃的打算', ko: '더 이상 기다릴 생각이 없어. 이제 그만 포기할게.', zh: '我不打算再等了，现在放弃吧。', tip: '더 이상 = 不再/再也不' },
      { icon: '💬', context: '计划换工作，与朋友倾诉', ko: '요즘 이직할까 생각하고 있어요. 지금 회사가 너무 힘들어서요.', zh: '最近在考虑换工作，现在这家公司太累了。', tip: '이직하다 = 跳槽/换工作' },
    ],
    mistakes: [
      {
        wrong: '갈까를 생각해요',
        correct: '갈까 생각해요 / 갈까 생각하고 있어요',
        note: '-을까 생각하다 中间不加 를，直接连接',
      },
      {
        wrong: '먹을 생각 있어요',
        correct: '먹을 생각이 있어요',
        note: '생각이 있다/없다 中间需要 이 (主格助词)',
      },
      {
        wrong: '나는 결혼할까 생각이에요',
        correct: '나는 결혼할까 생각하고 있어요 / 결혼할 생각이에요',
        note: '-을까 생각 接 -이에요 不能这样组合，要选一种句型用到底',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第3课</div>
    <div class="ov-hero-title">-을/ㄹ까 생각하다, -을/ㄹ 생각이다</div>
    <div class="ov-hero-sub">考虑中 vs 打算做——意向的两种程度</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">考虑中</div>
      <div class="ko">动词词干 + 을/ㄹ까 생각하다</div>
      <div class="zh">在考虑是否……（尚未决定）</div>
    </div>
    <div class="ov-block">
      <div class="badge">打算</div>
      <div class="ko">动词词干 + 을/ㄹ 생각이다</div>
      <div class="zh">打算……（有这个想法/意图）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">意向强度对比</div></div>
    <div class="ov-block">
      <div class="ko">-을까 생각하다 → -을 생각이다 → -(으)려고 하다</div>
      <div class="zh">考虑中 → 有打算 → 在准备/即将行动</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达"在考虑是否……"和"打算/有意……"的两种意向句型</div>
<div class="card-body">-을/ㄹ까 생각하다 表示正在考虑要不要做某事，尚未决定，语气较犹豫。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이번 주말에 등산을 갈까 생각하고 있어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我在考虑这周末去登山。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">내년에 한국으로 유학을 갈까 해요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我在考虑明年去韩国留学。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '을까 생각하다 vs 을 생각이다',
    compareHtml: `
<div class="card-title">을까 생각하다 vs 을 생각이다</div>
<div class="card-body">-을/ㄹ까 생각하다 表示正在考虑要不要做某事，尚未决定，语气较犹豫。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">이번 주말에 등산을 갈까 생각하고 있어요</span><span style="font-size:16px;color:#5a4640">我在考虑这周末去登山。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">다음 달에 이사할 생각이에요</span><span style="font-size:16px;color:#5a4640">我打算下个月搬家。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">내년에 한국으로 유학을 갈까 해요</span><span style="font-size:16px;color:#5a4640">我在考虑明年去韩国留学。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '계획/의향 표현 비교',
      headers: ['语法', '确定程度', '语感', '例句'],
      rows: [
        [{ ko: '-을/ㄹ까 생각하다', zh: '' }, { ko: '低', zh: '犹豫中' }, { ko: '正在考虑', zh: '' }, { ko: '이사할까 생각해요', zh: '在考虑要不要搬家' }],
        [{ ko: '-을/ㄹ 생각이다', zh: '' }, { ko: '中', zh: '有意向' }, { ko: '打算', zh: '' }, { ko: '이사할 생각이에요', zh: '打算搬家' }],
        [{ ko: '-을/ㄹ 거예요', zh: '' }, { ko: '高', zh: '已决定' }, { ko: '将要', zh: '' }, { ko: '이사할 거예요', zh: '要搬家了' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ까 생각하다, -을/ㄹ 생각이다',
      body: '测试对两个意向表达的掌握',
      questions: [
        {
          prompt: '我在考虑要不要换工作。→ 직장을 바꿀___ 생각하고 있어요',
          options: ['까', '을', '기', '는'],
          answer: 0 as 0|1|2|3,
          explanation: '-을/ㄹ까 생각하다 表示犹豫中考虑',
        },
        {
          prompt: '打算今年学韩语。→ 올해 한국어를 배울 ___',
          options: ['기 바랍니다', '까 생각해요', '생각이에요', '뿐이에요'],
          answer: 2 as 0|1|2|3,
          explanation: '-을 생각이다 表示已有打算',
        },
        {
          prompt: '-을/ㄹ까 생각하다 表达什么程度的意向？',
          options: ['被迫计划', '还在犹豫，未决定', '强烈愿望', '已经决定'],
          answer: 1 as 0|1|2|3,
          explanation: '을까 = 正在考虑，尚未决定',
        },
        {
          prompt: '아직 정하지 않았지만 유럽에 ___ 생각해요.',
          options: ['갈', '가는', '가기', '갈까'],
          answer: 3 as 0|1|2|3,
          explanation: '还没决定 → 을까 생각하다',
        },
      ],
    },
    linkedGrammarIds: ['g76'],
  },

  {
    id: 'card-p10-l04',
    partNumber: 10,
    lessonNumber: 4,
    title: '-(으)면서, -기 위해서, 을/를 위해서',
    whatItDoes: '表达"同时进行"和"为了……目的"的两类句型',
    whatItDoesBody: '-(으)면서 表示两个动作同时发生，主语相同。\n-기 위해서 表示为了做某事（目的），接动词。\n을/를 위해서 表示为了某人/某物（对象），接名词。\n三个结构都是表达目的和并行动作的核心语法。',
    structures: [
      {
        ko: '음악을 들으면서 공부해요',
        zh: '一边听音乐一边学习。',
        tokens: [
          { text: '음악을', role: 'object' },
          { text: '들으면서', role: 'plain' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '밥을 먹으면서 TV를 보면 안 돼요',
        zh: '不能边吃饭边看电视。',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹으면서', role: 'plain' },
          { text: 'TV를 보면 안 돼요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 잘하기 위해서 매일 공부해요',
        zh: '为了学好韩语，每天都学习。',
        tokens: [
          { text: '한국어를 잘하기', role: 'verb' },
          { text: '위해서', role: 'plain' },
          { text: '매일 공부해요', role: 'verb' },
        ],
      },
      {
        ko: '가족을 위해서 열심히 일해요',
        zh: '为了家人努力工作。',
        tokens: [
          { text: '가족을', role: 'object' },
          { text: '위해서', role: 'plain' },
          { text: '열심히 일해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)면서：有收音词干 + 으면서，无收音词干 + 면서，主语必须相同', examples: '먹으면서 / 가면서 / 웃으면서 / 공부하면서' },
      { type: 'rule', text: '-기 위해서：动词词干 + 기 위해서（위해 可省略 서）', examples: '먹기 위해서 / 가기 위해서 / 합격하기 위해서' },
      { type: 'rule', text: '을/를 위해서：名词 + 을/를 위해서（名词有收音用 을，无收音用 를）', examples: '가족을 위해서 / 나라를 위해서 / 꿈을 위해서' },
      { type: 'note', text: '-(으)면서 前后主语必须相同，不同主语时不能用', examples: '× 내가 공부하면서 친구가 놀았어요 → ○ 내가 공부하는 동안 친구가 놀았어요' },
      { type: 'compare', text: '-기 위해서 vs -(으)려고：两者都表目的，위해서 更正式，려고 更口语', examples: '합격하기 위해서 공부해요 vs 합격하려고 공부해요' },
      { type: 'usage', text: '위해서 中 서 可省略，위해 单独使用也正确', examples: '가족을 위해 일해요 = 가족을 위해서 일해요' },
    ],
    cardExamples: [
      {
        zh: '一边听歌一边运动。',
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '들으면서', role: 'plain' },
          { text: '운동해요', role: 'verb' },
        ],
        swapWords: ['커피를 마시면서', '친구와 이야기하면서', 'TV를 보면서', '공부해요', '밥을 먹어요', '걸어요'],
      },
      {
        zh: '为了健康每天吃蔬菜。',
        wordBlocks: [
          { text: '건강을', role: 'object' },
          { text: '위해서', role: 'plain' },
          { text: '매일 채소를 먹어요', role: 'verb' },
        ],
        swapWords: ['다이어트를', '将来를', '꿈을', '운동해요', '일찍 자요', '공부해요'],
      },
      {
        zh: '为了找工作，正在准备资格证。',
        wordBlocks: [
          { text: '취직하기', role: 'verb' },
          { text: '위해서', role: 'plain' },
          { text: '자격증을 준비하고 있어요', role: 'verb' },
        ],
        swapWords: ['유학가기', '시험에 합격하기', '공부하고 있어요', '연습하고 있어요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '描述自己的日常习惯', ko: '저는 출근하면서 팟캐스트를 들어요. 시간 절약이 돼요.', zh: '我上班途中听播客，这样可以节省时间。', tip: '출근하다 = 上班；팟캐스트 = 播客' },
      { icon: '💬', context: '为某个目标解释行动', ko: 'TOPIK 6급을 따기 위해서 하루에 두 시간씩 공부해요.', zh: '为了拿到TOPIK 6级，每天学习两小时。', tip: '따다 = 取得/拿到（证书）' },
      { icon: '💬', context: 'KPOP 歌词常见句型', ko: '너를 위해서라면 뭐든지 할 수 있어.', zh: '为了你，什么都能做。', tip: '-를 위해서라면 = 如果是为了……的话' },
      { icon: '💬', context: '韩剧台词：边哭边说', ko: '웃으면서 말하려고 했는데, 결국 울어 버렸어.', zh: '本来想笑着说的，结果还是哭了。', tip: '결국 = 最终；-어 버리다 = 做了（带遗憾语气）' },
      { icon: '💬', context: '向朋友解释在做的事', ko: '드라마를 보면서 한국어 공부해요. 재미있고 효과적이에요.', zh: '看韩剧的同时学韩语，既有趣又有效。', tip: '효과적이다 = 有效的' },
    ],
    mistakes: [
      {
        wrong: '내가 잠을 자면서 친구가 왔어요',
        correct: '내가 자는 동안 친구가 왔어요',
        note: '-(으)면서 两个动作的主语必须相同，主语不同要用 -는 동안',
      },
      {
        wrong: '공부를 위해서 열심히 해요',
        correct: '공부하기 위해서 열심히 해요 / 공부를 잘하기 위해서 열심히 해요',
        note: '위해서 前如果是动词行为，要用 -기 위해서，不是 动词宾语 + 위해서',
      },
      {
        wrong: '음악 들으면서 공부하면서 해요',
        correct: '음악을 들으면서 공부해요',
        note: '-(으)면서 不能连续叠加两次，选一个主要并行动作即可',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第4课</div>
    <div class="ov-hero-title">-(으)면서, -기 위해서, 을/를 위해서</div>
    <div class="ov-hero-sub">同时进行 与 目的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">同时</div>
      <div class="ko">动词词干 + (으)면서</div>
      <div class="zh">一边……一边……（主语相同）</div>
    </div>
    <div class="ov-block">
      <div class="badge">目的</div>
      <div class="ko">动词词干 + 기 위해서</div>
      <div class="zh">为了做……</div>
    </div>
    <div class="ov-block">
      <div class="badge">对象</div>
      <div class="ko">名词 + 을/를 위해서</div>
      <div class="zh">为了某人/某物</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达"同时进行"和"为了……目的"的两类句型</div>
<div class="card-body">-(으)면서 表示两个动作同时发生，主语相同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">음악을 들으면서 공부해요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一边听音乐一边学习。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">밥을 먹으면서 TV를 보면 안 돼요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不能边吃饭边看电视。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '으면서 vs 기 위해서',
    compareHtml: `
<div class="card-title">으면서 vs 기 위해서</div>
<div class="card-body">-(으)면서 表示两个动作同时发生，主语相同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">음악을 들으면서 공부해요</span><span style="font-size:16px;color:#5a4640">一边听音乐一边学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어를 잘하기 위해서 매일 공부해요</span><span style="font-size:16px;color:#5a4640">为了学好韩语，每天都学习。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">밥을 먹으면서 TV를 보면 안 돼요</span><span style="font-size:16px;color:#5a4640">不能边吃饭边看电视。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '-기 위해서 vs 을/를 위해서',
      headers: ['接续', '形式', '例句', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '-기 위해서', zh: '' }, { ko: '살기 위해서', zh: '' }, { ko: '为了活下去', zh: '' }],
        [{ ko: '명사', zh: '名词' }, { ko: '을/를 위해서', zh: '' }, { ko: '가족을 위해서', zh: '' }, { ko: '为了家人', zh: '' }],
        [{ ko: '으면서 조건', zh: '同时条件' }, { ko: '주어必须相同', zh: '' }, { ko: '먹으면서 봐요', zh: '' }, { ko: '边吃边看', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)면서, -기 위해서',
      body: '测试对同时动作和目的表达的掌握',
      questions: [
        {
          prompt: '为了减肥，少吃甜食。→ 다이어트를 하___ 단 것을 줄여요',
          options: ['면서', '기 위해서', '기 시작해서', '기 때문에'],
          answer: 1 as 0|1|2|3,
          explanation: '目的 → -기 위해서',
        },
        {
          prompt: '一边唱歌一边跳舞。→ 노래를 하___ 춤을 춰요',
          options: ['자마자', '기 위해서', '기 시작하면서', '면서'],
          answer: 3 as 0|1|2|3,
          explanation: '同时进行 → -(으)면서',
        },
        {
          prompt: '为了朋友，我去了那里。→ 친구___ 위해서 거기 갔어요',
          options: ['기', '가', '를', '에게'],
          answer: 2 as 0|1|2|3,
          explanation: '名词 + 을/를 위해서',
        },
        {
          prompt: '-(으)면서 的前后主语要求是？',
          options: ['必须相同', '没有要求', '前者主语省略', '可以不同'],
          answer: 0 as 0|1|2|3,
          explanation: '-(으)면서 前后主语必须一致',
        },
      ],
    },
    linkedGrammarIds: ['g30'],
  },

  {
    id: 'card-p10-l05',
    partNumber: 10,
    lessonNumber: 5,
    title: '에서, 중에서, 때',
    whatItDoes: '精确表达"从……中"选择、"在……时候"发生的场所与时间助词',
    whatItDoesBody: '에서 在此课中重点学习"在……范围内"的用法（选择范围）。\n중에서 表示"在……当中"，用于从一组中选择。\n때 表示"……的时候"，用于标记某个时间点或时间段。\n三者都是已学过助词的深化用法，需要区分细节。',
    structures: [
      {
        ko: '이 중에서 어떤 게 제일 마음에 들어요',
        zh: '在这些当中，哪个最合你心意？',
        tokens: [
          { text: '이 중에서', role: 'place' },
          { text: '어떤 게', role: 'subject' },
          { text: '제일 마음에 들어요', role: 'verb' },
        ],
      },
      {
        ko: '세 명 중에서 한 명만 합격했어요',
        zh: '三人当中只有一人通过了。',
        tokens: [
          { text: '세 명 중에서', role: 'place' },
          { text: '한 명만', role: 'subject' },
          { text: '합격했어요', role: 'verb' },
        ],
      },
      {
        ko: '어릴 때 피아노를 배웠어요',
        zh: '小时候学过钢琴。',
        tokens: [
          { text: '어릴 때', role: 'time' },
          { text: '피아노를', role: 'object' },
          { text: '배웠어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 올 때는 집에 있는 게 좋아요',
        zh: '下雨的时候待在家里最好。',
        tokens: [
          { text: '비가 올 때는', role: 'time' },
          { text: '집에 있는 게', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '중에서：名词（复数/集合）+ 중에서，表示从一组中选取', examples: '친구들 중에서 / 세 개 중에서 / 여러 나라 중에서' },
      { type: 'rule', text: '때：动词/形容词 冠词形 + 때，动词现在用 -는 때，过去用 -은/ㄴ 때，将来用 -을/ㄹ 때', examples: '갈 때 / 먹을 때 / 어릴 때 / 피곤할 때' },
      { type: 'usage', text: '에서 的"范围选择"用法：N에서 N까지，或 이/그/저 에서（在此处）', examples: '서울에서 부산까지 / 여기에서 가장 가까운 곳' },
      { type: 'note', text: '중에서 与 에서 区别：중에서 强调从集合中选，에서 强调出发点/场所', examples: '친구들 중에서 제일 키가 커요（从朋友里最高）vs 학교에서 왔어요（从学校来）' },
      { type: 'compare', text: '때 vs 동안：때 是时间点/短暂时段，동안 是持续的一段时间', examples: '먹을 때 말하지 마세요（吃饭时别说话）vs 먹는 동안 조용히 해요（吃饭期间安静）' },
      { type: 'example', text: '힘들 때 연락해. 항상 옆에 있을게.', examples: '难受的时候联系我，我会一直在你身边。（韩剧台词）' },
    ],
    cardExamples: [
      {
        zh: '在各国当中，最想去韩国。',
        wordBlocks: [
          { text: '여러 나라 중에서', role: 'place' },
          { text: '한국이', role: 'subject' },
          { text: '제일 가고 싶어요', role: 'verb' },
        ],
        swapWords: ['여러 음식 중에서', '친구들 중에서', '두 개 중에서', '이것이', '저 사람이'],
      },
      {
        zh: '开车的时候不能看手机。',
        wordBlocks: [
          { text: '운전할 때', role: 'time' },
          { text: '핸드폰을', role: 'object' },
          { text: '보면 안 돼요', role: 'verb' },
        ],
        swapWords: ['수업 중일 때', '밥 먹을 때', '자려고 할 때', '졸면 안 돼요', '음악을 들으면 안 돼요'],
      },
      {
        zh: '这些歌里哪首最好听？',
        wordBlocks: [
          { text: '이 노래들 중에서', role: 'place' },
          { text: '어떤 게', role: 'subject' },
          { text: '제일 좋아요', role: 'verb' },
        ],
        swapWords: ['두 가지 중에서', '여러 메뉴 중에서', '제일 마음에 들어요', '가장 좋아요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '餐厅点菜，从菜单中选', ko: '메뉴 중에서 뭐가 제일 맛있어요? 추천해 주세요.', zh: '菜单里哪个最好吃？请推荐一下。', tip: '추천하다 = 推荐' },
      { icon: '💬', context: '描述童年回忆', ko: '어릴 때는 매일 친구들이랑 밖에서 놀았어요.', zh: '小时候每天都和朋友在外面玩。', tip: '어릴 때 = 小时候（形容词 어리다 + 때）' },
      { icon: '💬', context: 'KPOP 歌词/台词选择场景', ko: '많은 사람들 중에서 당신을 선택했어요.', zh: '在众多人中选择了你。', tip: '当中选择 是 중에서 的经典用法' },
      { icon: '💬', context: '提醒朋友注意时机', ko: '기분이 안 좋을 때는 중요한 결정을 내리지 마세요.', zh: '心情不好的时候不要做重要决定。', tip: '결정을 내리다 = 做出决定' },
      { icon: '💬', context: '比较选项，给出建议', ko: '두 가지 중에서 고른다면, 저는 이게 더 좋을 것 같아요.', zh: '如果从两个中选的话，我觉得这个更好。', tip: '고르다 = 选择；-ㄹ 것 같아요 = 我觉得' },
    ],
    mistakes: [
      {
        wrong: '중에 제일 좋아요',
        correct: '중에서 제일 좋아요',
        note: '表示"从……当中"选择时要用 중에서，不是 중에',
      },
      {
        wrong: '밥 먹는 때 말하지 마세요',
        correct: '밥 먹을 때 말하지 마세요',
        note: '때 前面动词用 -을/ㄹ 冠词形，表示"在做某事的时间点/情境下"，不是特指将来，而是习惯性或假设性情境',
      },
      {
        wrong: '학교에서 중에서 제일 키가 커요',
        correct: '학교에서 제일 키가 커요 / 학생들 중에서 제일 키가 커요',
        note: '에서 和 중에서 不能叠加，选一种即可',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第5课</div>
    <div class="ov-hero-title">에서, 중에서, 때</div>
    <div class="ov-hero-sub">范围选择 与 时间标记的精确用法</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">范围</div>
      <div class="ko">집합 名词 + 중에서</div>
      <div class="zh">在……当中（从集合中选取）</div>
    </div>
    <div class="ov-block">
      <div class="badge">时间</div>
      <div class="ko">动词 冠词形 + 때</div>
      <div class="zh">……的时候</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">时间助词对比</div></div>
    <div class="ov-block">
      <div class="ko">때 vs 동안</div>
      <div class="zh">때 = 时间点 / 동안 = 持续时段</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">精确表达"从……中"选择、"在……时候"发生的场所与时间助词</div>
<div class="card-body">에서 在此课中重点学习"在……范围内"的用法（选择范围）。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이 중에서 어떤 게 제일 마음에 들어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">在这些当中，哪个最合你心意？</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">세 명 중에서 한 명만 합격했어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">三人当中只有一人通过了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '에서 vs 중에서 vs 때',
    compareHtml: `
<div class="card-title">에서 vs 중에서 vs 때</div>
<div class="card-body">에서 在此课中重点学习"在……范围内"的用法（选择范围）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">이 중에서 어떤 게 제일 마음에 들어요</span><span style="font-size:16px;color:#5a4640">在这些当中，哪个最合你心意？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어릴 때 피아노를 배웠어요</span><span style="font-size:16px;color:#5a4640">小时候学过钢琴。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">세 명 중에서 한 명만 합격했어요</span><span style="font-size:16px;color:#5a4640">三人当中只有一人通过了。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '에서 / 중에서 / 때 용법 정리',
      headers: ['形式', '功能', '例句', '意思'],
      rows: [
        [{ ko: '명사 + 에서', zh: '' }, { ko: '范围起点', zh: '' }, { ko: '여기에서 고르세요', zh: '' }, { ko: '从这里选', zh: '' }],
        [{ ko: '명사 + 중에서', zh: '' }, { ko: '选择范围', zh: '' }, { ko: '셋 중에서 하나', zh: '' }, { ko: '三个里选一个', zh: '' }],
        [{ ko: '冠词形 + 때', zh: '' }, { ko: '时候', zh: '' }, { ko: '공부할 때', zh: '' }, { ko: '学习的时候', zh: '' }],
        [{ ko: '명사 + 때', zh: '' }, { ko: '时候', zh: '' }, { ko: '방학 때', zh: '' }, { ko: '放假的时候', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '에서, 중에서, 때',
      body: '测试对范围和时间表达的掌握',
      questions: [
        {
          prompt: '三个里面哪个最好？→ 세 개 ___ 어느 게 제일 좋아요?',
          options: ['에게서', '때', '에서', '중에서'],
          answer: 3 as 0|1|2|3,
          explanation: '从中选择 → 중에서',
        },
        {
          prompt: '困的时候喝咖啡。→ 졸릴 ___ 커피를 마셔요',
          options: ['중에서', '때', '에서', '동안'],
          answer: 1 as 0|1|2|3,
          explanation: '时候 → 冠词形 + 때',
        },
        {
          prompt: '에서 和 중에서 的区别是？',
          options: ['중에서 强调从中选一，에서 更泛', '에서 是地点，중에서 是时间', '에서 只用于动词，중에서 只用于名词', '完全相同'],
          answer: 0 as 0|1|2|3,
          explanation: '중에서 = 强调选择范围；에서 = 范围起点，更泛用',
        },
        {
          prompt: '放假的时候想去旅行。→ 방학 ___ 여행 가고 싶어요',
          options: ['중에서', '동안에', '때', '에서'],
          answer: 2 as 0|1|2|3,
          explanation: '名词 + 때 = ……的时候',
        },
      ],
    },
    linkedGrammarIds: ['g5'],
  },

  {
    id: 'card-p10-l06',
    partNumber: 10,
    lessonNumber: 6,
    title: '그래도, 그러나',
    whatItDoes: '表达"尽管如此"和"然而"的两种转折连接词',
    whatItDoesBody: '그래도 表示"即使这样/尽管如此"，前后形成让步转折，口语和书面都常用。\n그러나 表示"然而/但是"，是较正式的书面转折连接词，比 그런데/하지만 更正式。\n两者都用于连接两个句子，但语气和使用场合有所不同。',
    structures: [
      {
        ko: '힘들어요 그래도 포기하지 않을 거예요',
        zh: '很辛苦。但即便如此，我不会放弃的。',
        tokens: [
          { text: '힘들어요', role: 'verb' },
          { text: '그래도', role: 'plain' },
          { text: '포기하지 않을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '비가 왔어요 그래도 경기는 계속됐어요',
        zh: '下雨了。尽管如此，比赛还是继续了。',
        tokens: [
          { text: '비가 왔어요', role: 'verb' },
          { text: '그래도', role: 'plain' },
          { text: '경기는 계속됐어요', role: 'verb' },
        ],
      },
      {
        ko: '가격이 비싸요 그러나 품질이 좋아요',
        zh: '价格贵。然而质量很好。',
        tokens: [
          { text: '가격이 비싸요', role: 'verb' },
          { text: '그러나', role: 'plain' },
          { text: '품질이 좋아요', role: 'verb' },
        ],
      },
      {
        ko: '노력했습니다 그러나 결과는 좋지 않았습니다',
        zh: '努力了。然而结果并不好。',
        tokens: [
          { text: '노력했습니다', role: 'verb' },
          { text: '그러나', role: 'plain' },
          { text: '결과는 좋지 않았습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '그래도：句子 + 그래도 + 句子，表示"即使前面情况成立，后面仍然……"', examples: '피곤해요. 그래도 해야 해요. / 돈이 없어요. 그래도 행복해요.' },
      { type: 'rule', text: '그러나：句子 + 그러나 + 句子，表示"前面与后面形成对比/转折"', examples: '열심히 했다. 그러나 실패했다. / 작은 회사다. 그러나 분위기가 좋다.' },
      { type: 'compare', text: '그래도 vs 그러나：그래도 强调让步（尽管如此仍然），그러나 强调对比转折（但是/然而）', examples: '힘들어도 그래도 할게요（让步）vs 힘들었다. 그러나 해냈다.（对比）' },
      { type: 'compare', text: '그러나 vs 하지만/그런데：正式程度：그러나 > 하지만 > 그런데', examples: '논문/보고서 → 그러나 / 일상 대화 → 하지만, 그런데' },
      { type: 'usage', text: '그래도 可单独作为回应，表示"即便如此"', examples: 'A: 늦었어요. B: 그래도 와 줘서 고마워요.（还是来了，谢谢）' },
      { type: 'note', text: '그러나 主要用于书面语、演讲、新闻，口语中较少单独使用', examples: '신문 기사: 경제가 어렵다. 그러나 희망은 있다.' },
    ],
    cardExamples: [
      {
        zh: '失败了。但即便如此，我还是要再挑战。',
        wordBlocks: [
          { text: '실패했어요', role: 'verb' },
          { text: '그래도', role: 'plain' },
          { text: '다시 도전할 거예요', role: 'verb' },
        ],
        swapWords: ['힘들어요', '두렵지만', '시간이 없어도', '포기하지 않을 거예요', '계속할 거예요'],
      },
      {
        zh: '是旧手机。然而还是运行得很好。',
        wordBlocks: [
          { text: '오래된 폰이에요', role: 'verb' },
          { text: '그러나', role: 'plain' },
          { text: '아직 잘 작동해요', role: 'verb' },
        ],
        swapWords: ['가격이 비싸요', '거리가 멀어요', '품질이 좋아요', '가치가 있어요'],
      },
      {
        zh: '很累。尽管如此，还是坚持下来了。',
        wordBlocks: [
          { text: '힘들었어요', role: 'verb' },
          { text: '그래도', role: 'plain' },
          { text: '버텼어요', role: 'verb' },
        ],
        swapWords: ['포기하지 않았어요', '계속했어요', '해냈어요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '鼓励遭遇挫折的朋友', ko: '이번엔 안 됐네. 그래도 네가 최선을 다했잖아. 다음엔 꼭 될 거야.', zh: '这次没成功。但即便如此，你已经尽力了。下次一定会成的。', tip: '-잖아 = 你看/不是嘛（确认共识）' },
      { icon: '💬', context: '韩剧台词：明知道也还是', ko: '상처받을 걸 알아. 그래도 사랑할 수밖에 없어.', zh: '知道会受伤。但即便如此，还是忍不住爱。', tip: '-을 수밖에 없다 = 没有其他选择，只能……' },
      { icon: '💬', context: '写作文或报告时的转折', ko: '이 정책은 단기적으로는 효과가 있다. 그러나 장기적인 문제를 해결하지는 못한다.', zh: '这项政策短期内有效。然而无法解决长期问题。', tip: '단기적/장기적 = 短期/长期；正式书面用语' },
      { icon: '💬', context: '日常对话：尽管很忙还是来了', ko: 'A: 오늘 많이 바쁘셨죠? B: 네, 그래도 꼭 오고 싶었어요.', zh: 'A: 今天很忙吧？B: 是的，但即便如此，我一定想来。', tip: '꼭 = 一定/务必' },
      { icon: '💬', context: 'KPOP 歌词风格表达', ko: '멀리 있어도 그래도 네 곁에 있을게.', zh: '即使相隔很远，我还是会在你身边。', tip: '곁 = 身边/旁边' },
    ],
    mistakes: [
      {
        wrong: '힘들어요 그래도 그러나 할 거예요',
        correct: '힘들어요. 그래도 할 거예요. / 힘들었다. 그러나 해냈다.',
        note: '그래도와 그러나 不能连用，选一个即可',
      },
      {
        wrong: '그러나 피곤해서 못 갔어요',
        correct: '그래서 피곤해서 못 갔어요 / 그런데 피곤해서 못 갔어요',
        note: '그러나 是转折，不是原因。表示"所以"要用 그래서',
      },
      {
        wrong: '그래도도 안 됩니다',
        correct: '그래도 안 됩니다',
        note: '그래도 后面不再加助词 도',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第6课</div>
    <div class="ov-hero-title">그래도, 그러나</div>
    <div class="ov-hero-sub">让步转折 与 正式对比</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">让步</div>
      <div class="ko">그래도</div>
      <div class="zh">即便如此/尽管如此（让步后仍然……）</div>
    </div>
    <div class="ov-block">
      <div class="badge">转折</div>
      <div class="ko">그러나</div>
      <div class="zh">然而/但是（正式书面转折）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">正式程度</div></div>
    <div class="ov-block">
      <div class="ko">그러나 > 하지만 > 그런데</div>
      <div class="zh">最正式 → 日常口语</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达"尽管如此"和"然而"的两种转折连接词</div>
<div class="card-body">그래도 表示"即使这样/尽管如此"，前后形成让步转折，口语和书面都常用。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">힘들어요 그래도 포기하지 않을 거예요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">很辛苦。但即便如此，我不会放弃的。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">비가 왔어요 그래도 경기는 계속됐어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">下雨了。尽管如此，比赛还是继续了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '그래도 vs 그러나',
    compareHtml: `
<div class="card-title">그래도 vs 그러나</div>
<div class="card-body">그래도 表示"即使这样/尽管如此"，前后形成让步转折，口语和书面都常用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">힘들어요 그래도 포기하지 않을 거예요</span><span style="font-size:16px;color:#5a4640">很辛苦。但即便如此，我不会放弃的。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가격이 비싸요 그러나 품질이 좋아요</span><span style="font-size:16px;color:#5a4640">价格贵。然而质量很好。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">비가 왔어요 그래도 경기는 계속됐어요</span><span style="font-size:16px;color:#5a4640">下雨了。尽管如此，比赛还是继续了。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '역접 접속사 비교',
      headers: ['词', '语感', '场合', '例句'],
      rows: [
        [{ ko: '그래도', zh: '即使如此' }, { ko: '让步，仍坚持', zh: '' }, { ko: '口语', zh: '' }, { ko: '힘들어요. 그래도 해요', zh: '辛苦但还是做' }],
        [{ ko: '그러나', zh: '然而' }, { ko: '对比转折', zh: '' }, { ko: '书面', zh: '' }, { ko: '노력했다. 그러나 실패했다', zh: '努力了但失败了' }],
        [{ ko: '하지만', zh: '但是' }, { ko: '一般转折', zh: '' }, { ko: '口语/书面', zh: '' }, { ko: '좋아요. 하지만 비싸요', zh: '好，但贵' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '그래도, 그러나',
      body: '测试对两个转折词的掌握',
      questions: [
        {
          prompt: '很累，但还是坚持运动了。→ 피곤했어요. ___ 운동했어요',
          options: ['그러나', '그러면', '그래서', '그래도'],
          answer: 3 as 0|1|2|3,
          explanation: '即使如此仍坚持 → 그래도',
        },
        {
          prompt: '努力了，然而结果不好。→ 열심히 했다. ___ 결과가 안 좋았다',
          options: ['그러면', '그러나', '그래도', '그리고'],
          answer: 1 as 0|1|2|3,
          explanation: '书面对比转折 → 그러나',
        },
        {
          prompt: '그래도 和 그러나 的主要区别是？',
          options: ['意思完全相同', '两者都表示原因', '그래도=让步仍坚持，그러나=对比转折', '그래도书面，그러나口语'],
          answer: 2 as 0|1|2|3,
          explanation: '그래도 = 让步；그러나 = 对比，偏书面',
        },
        {
          prompt: '已经很晚了，但还是等了。→ 이미 늦었어요. ___ 기다렸어요',
          options: ['그래도', '그래서', '그러나', '그러면'],
          answer: 0 as 0|1|2|3,
          explanation: '即使已晚仍等待 → 그래도',
        },
      ],
    },
    linkedGrammarIds: ['g22'],
  },

  {
    id: 'card-p10-l07',
    partNumber: 10,
    lessonNumber: 7,
    title: '-아/어/여 있다, -고 있다 深化',
    whatItDoes: '区分"持续状态"和"持续动作"的两种进行体',
    whatItDoesBody: '-고 있다 表示动作正在持续进行（动作进行中）。\n-아/어/여 있다 表示动作完成后的状态持续（结果状态中）。\n两者中文都可译为"正在……"，但韩语区分明确，是中级学习者最容易混淆的语法点之一。',
    structures: [
      {
        ko: '지금 밥을 먹고 있어요',
        zh: '现在正在吃饭。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '친구를 기다리고 있어요',
        zh: '正在等朋友。',
        tokens: [
          { text: '친구를', role: 'object' },
          { text: '기다리고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '의자에 앉아 있어요',
        zh: '坐在椅子上（坐着的状态）。',
        tokens: [
          { text: '의자에', role: 'place' },
          { text: '앉아 있어요', role: 'verb' },
        ],
      },
      {
        ko: '문이 열려 있어요',
        zh: '门开着（开的状态）。',
        tokens: [
          { text: '문이', role: 'subject' },
          { text: '열려 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-고 있다：动词词干 + 고 있다，表示动作正在进行', examples: '먹고 있다 / 자고 있다 / 공부하고 있다 / 달리고 있다' },
      { type: 'rule', text: '-아/어/여 있다：动词词干 + 아/어 있다，表示完成后的状态持续', examples: '앉아 있다 / 서 있다 / 누워 있다 / 열려 있다 / 닫혀 있다' },
      { type: 'note', text: '-아/어 있다 只能接"状态变化动词"，不能接所有动词', examples: '○ 앉아 있다（坐下→坐着）/ × 먹어 있다（吃饭没有持续状态）' },
      { type: 'compare', text: '앉고 있다 vs 앉아 있다：앉다 是瞬间动词，앉고 있다 在实际使用中少见且不自然，推荐用 앉아 있다（坐着）表示状态', examples: '○ 그는 의자에 앉아 있어요（他坐在椅子上）/ △ 앉고 있어요（正在坐下，少见说法）' },
      { type: 'usage', text: '常见 -아/어 있다 动词：앉다、서다、눕다、열리다、닫히다、켜지다、꺼지다、걸리다', examples: '불이 켜져 있어요（灯开着）/ 그림이 걸려 있어요（画挂着）' },
      { type: 'example', text: '벽에 사진이 붙어 있어요', examples: '墙上贴着照片。（붙다 = 贴上 → 贴着的状态）' },
    ],
    cardExamples: [
      {
        zh: '躺在沙发上。',
        wordBlocks: [
          { text: '소파에', role: 'place' },
          { text: '누워 있어요', role: 'verb' },
        ],
        swapWords: ['침대에', '바닥에', '잔디밭에', '앉아 있어요', '서 있어요'],
      },
      {
        zh: '窗户关着。可以打开吗？',
        wordBlocks: [
          { text: '창문이', role: 'subject' },
          { text: '닫혀 있어요', role: 'verb' },
          { text: '열어도 될까요', role: 'verb' },
        ],
        swapWords: ['열려 있어요', '잠겨 있어요'],
      },
      {
        zh: '现在在做什么？可以打电话吗？',
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '뭐 하고 있어요', role: 'verb' },
          { text: '전화해도 돼요', role: 'verb' },
        ],
        swapWords: ['잠깐 얘기해도 돼요', '메시지 보내도 돼요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '描述当前动作（打电话时）', ko: 'A: 지금 뭐 해요? B: 밥 먹고 있어요. 나중에 전화할게요.', zh: 'A: 现在在干嘛？B: 正在吃饭，待会给你打。', tip: '-고 있어요 = 动作正在进行' },
      { icon: '💬', context: '描述场景中的状态', ko: '카페에 들어갔더니 이미 친구가 와서 앉아 있었어요.', zh: '走进咖啡厅，朋友已经来坐着了。', tip: '-아 있었어요 = 那时已经处于那个状态' },
      { icon: '💬', context: 'KPOP 歌词：等待的状态', ko: '난 아직 여기 서 있어. 네가 돌아올 때까지.', zh: '我还站在这里，直到你回来。', tip: '서 있다 = 站着（状态）' },
      { icon: '💬', context: '韩剧台词：描述房间状态', ko: '불이 다 꺼져 있었어요. 아무도 없는 것 같았어요.', zh: '灯全都关着，好像没有人。', tip: '꺼져 있다 = 关着（灯熄灭的状态）' },
      { icon: '💬', context: '告知别人自己在忙', ko: '지금 회의하고 있어요. 30분 후에 연락드릴게요.', zh: '现在正在开会，30分钟后联系您。', tip: '-고 있어요 = 进行中动作' },
    ],
    mistakes: [
      {
        wrong: '밥을 먹어 있어요',
        correct: '밥을 먹고 있어요',
        note: '먹다 是动作动词，不能用 -아/어 있다，要用 -고 있다',
      },
      {
        wrong: '의자에 앉고 있어요（表示坐着的状态）',
        correct: '의자에 앉아 있어요',
        note: '앉다 完成后有持续状态，表示"坐着"要用 -아 있다，-고 있다 表示正在坐下的瞬间',
      },
      {
        wrong: '불이 켜고 있어요',
        correct: '불이 켜져 있어요',
        note: '켜다 是他动词（사람이 불을 켜다），主语应是人；켜지다 是自动/被动词（불이 켜지다），主语是灯。불이 켜고 있어요 把灯当主语用了他动词，双重错误。灯亮着的状态用 불이 켜져 있어요。',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第7课</div>
    <div class="ov-hero-title">-아/어/여 있다, -고 있다 深化</div>
    <div class="ov-hero-sub">状态持续 vs 动作持续——核心区分</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">动作进行</div>
      <div class="ko">动词词干 + 고 있다</div>
      <div class="zh">正在……（动作持续中）</div>
    </div>
    <div class="ov-block">
      <div class="badge">状态持续</div>
      <div class="ko">动词词干 + 아/어 있다</div>
      <div class="zh">……着（完成后状态持续）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">常见状态动词</div></div>
    <div class="ov-block">
      <div class="ko">앉다 / 서다 / 눕다 / 열리다 / 닫히다 / 켜지다 / 꺼지다</div>
      <div class="zh">坐/站/躺/开/关/亮/灭 → 均用 -아/어 있다</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">区分"持续状态"和"持续动作"的两种进行体</div>
<div class="card-body">-고 있다 表示动作正在持续进行（动作进行中）。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">지금 밥을 먹고 있어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">现在正在吃饭。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">친구를 기다리고 있어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">正在等朋友。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '아/어 있다 vs 고 있다',
    compareHtml: `
<div class="card-title">아/어 있다 vs 고 있다</div>
<div class="card-body">-고 있다 表示动作正在持续进行（动作进行中）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">지금 밥을 먹고 있어요</span><span style="font-size:16px;color:#5a4640">现在正在吃饭。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">의자에 앉아 있어요</span><span style="font-size:16px;color:#5a4640">坐在椅子上（坐着的状态）。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">친구를 기다리고 있어요</span><span style="font-size:16px;color:#5a4640">正在等朋友。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '-아/어 있다 vs -고 있다 对比',
      headers: ['语法', '动词类型', '强调', '例句'],
      rows: [
        [{ ko: '-아/어 있다', zh: '' }, { ko: '自动词', zh: '自动词' }, { ko: '完成后状态', zh: '' }, { ko: '열려 있어요', zh: '开着' }],
        [{ ko: '-고 있다①', zh: '' }, { ko: '모든 动词', zh: '所有动词' }, { ko: '动作进行', zh: '' }, { ko: '먹고 있어요', zh: '正在吃' }],
        [{ ko: '-고 있다②', zh: '' }, { ko: '他动词', zh: '他动词' }, { ko: '착용 상태', zh: '' }, { ko: '입고 있어요', zh: '穿着' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어 있다, -고 있다 深化',
      body: '测试对状态与进行的区别的掌握',
      questions: [
        {
          prompt: '那个人坐着。（状态）→ 그 사람이 ___',
          options: ['앉아요', '앉었어요', '앉고 있어요', '앉아 있어요'],
          answer: 3 as 0|1|2|3,
          explanation: '自动词完成状态 → -아/어 있다',
        },
        {
          prompt: '她戴着耳机。（状态）→ 이어폰을 ___',
          options: ['끼고 있어요', '껴 있어요', '끼었어요', '끼어요'],
          answer: 0 as 0|1|2|3,
          explanation: '他动词穿戴状态 → -고 있다',
        },
        {
          prompt: '正在看电视。（进行）→ 텔레비전을 ___',
          options: ['보아 있어요', '봐 있어요', '보고 있어요', '봤어 있어요'],
          answer: 2 as 0|1|2|3,
          explanation: '动作进行 → -고 있다',
        },
        {
          prompt: '-아/어 있다 主要用于哪类动词？',
          options: ['形容词', '自动词', '所有动词', '他动词'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어 있다 = 自动词完成后的状态',
        },
      ],
    },
    linkedGrammarIds: ['g49'],
  },

  {
    id: 'card-p10-l08',
    partNumber: 10,
    lessonNumber: 8,
    title: '-아/어/여 두다, -아/어/여 놓다',
    whatItDoes: '表达"提前做好并保持"的两种结果保持句型',
    whatItDoesBody: '-아/어/여 두다 表示做某事后保持那个状态，强调"留着备用/留着以后用"。\n-아/어/여 놓다 表示做完后把结果放在那里，强调"做完了放那儿"，与 두다 意思相近但侧重略有不同。\n两者在日常对话中经常互换，口语中 놓다 更常见。',
    structures: [
      {
        ko: '미리 예약해 뒀어요',
        zh: '提前预约好了（留着）。',
        tokens: [
          { text: '미리', role: 'plain' },
          { text: '예약해 뒀어요', role: 'verb' },
        ],
      },
      {
        ko: '냉장고에 음식을 넣어 뒀어요',
        zh: '把食物放进冰箱里存着了。',
        tokens: [
          { text: '냉장고에', role: 'place' },
          { text: '음식을', role: 'object' },
          { text: '넣어 뒀어요', role: 'verb' },
        ],
      },
      {
        ko: '문을 열어 놓았어요',
        zh: '把门开着（开了放那儿）。',
        tokens: [
          { text: '문을', role: 'object' },
          { text: '열어 놓았어요', role: 'verb' },
        ],
      },
      {
        ko: '메모해 놓을게요',
        zh: '我记下来（记好放那儿）。',
        tokens: [
          { text: '메모해 놓을게요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여 두다：动词 + 아/어/여 두다，动词连接规则与 -아/어/여요 相同', examples: '사 두다 / 써 두다 / 준비해 두다 / 공부해 두다' },
      { type: 'rule', text: '-아/어/여 놓다：动词 + 아/어/여 놓다，连接规则与 두다 相同', examples: '열어 놓다 / 닫아 놓다 / 켜 놓다 / 써 놓다' },
      { type: 'compare', text: '두다 vs 놓다：두다 强调"留着/备用"，놓다 强调"放那儿/做完了"，口语中常互换', examples: '책을 사 뒀어요（买好留着）≈ 책을 사 놓았어요（买了放那儿）' },
      { type: 'usage', text: '두다 口语缩略：-아/어 두다 → -아/어 둬요（뒀어요）', examples: '써 둬요 / 사 뒀어요 / 예약해 뒀어요' },
      { type: 'note', text: '常与 미리（提前）、벌써（已经）搭配使用，强调提前准备', examples: '미리 만들어 뒀어요 / 벌써 예약해 놨어요' },
      { type: 'example', text: '나중을 위해 저장해 둬', examples: '为以后存好。（日常口语指令）' },
    ],
    cardExamples: [
      {
        zh: '旅行前提前订好了酒店。',
        wordBlocks: [
          { text: '여행 전에', role: 'time' },
          { text: '호텔을', role: 'object' },
          { text: '예약해 뒀어요', role: 'verb' },
        ],
        swapWords: ['티켓을 사 뒀어요', '짐을 싸 뒀어요', '지도를 저장해 뒀어요'],
      },
      {
        zh: '开着空调出来了。',
        wordBlocks: [
          { text: '에어컨을', role: 'object' },
          { text: '켜 놓고', role: 'verb' },
          { text: '나왔어요', role: 'verb' },
        ],
        swapWords: ['문을 열어 놓고', '불을 켜 놓고', '창문을 닫아 놓고'],
      },
      {
        zh: '重要的单词写在笔记本里存着。',
        wordBlocks: [
          { text: '중요한 단어는', role: 'subject' },
          { text: '노트에', role: 'place' },
          { text: '써 둬요', role: 'verb' },
        ],
        swapWords: ['주소는', '비밀번호는', '일정은', '메모해 둬요', '저장해 둬요'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '出发前告知已准备好', ko: '걱정하지 마세요. 다 준비해 뒀어요.', zh: '不用担心，都已经准备好了。', tip: '다 = 全部/都；准备好留着用的语感' },
      { icon: '💬', context: '韩剧台词：为了对方做好准备', ko: '네가 좋아하는 음식 다 만들어 놨어. 빨리 와.', zh: '你喜欢的食物都做好了，快来。', tip: '만들어 놨어 = 만들어 놓았어 의 줄임말' },
      { icon: '💬', context: '旅行规划讨论', ko: 'A: 숙소는 정했어요? B: 네, 미리 예약해 놨어요.', zh: 'A: 住宿定了吗？B: 是的，提前预约好了。', tip: '놨어요 = 놓았어요 口语缩略' },
      { icon: '💬', context: '提醒自己之后要用', ko: '이 기사 나중에 읽으려고 저장해 뒀어요.', zh: '这篇文章打算以后读，先存好了。', tip: '-으려고 = 为了/打算；두다 强调留着备用' },
      { icon: '💬', context: '发现某物被放着', ko: '냉장고에 뭔가 넣어 놨는데 뭐예요?', zh: '冰箱里放着什么东西，是什么？', tip: '놨는데 = 놓았는데；表示做完放在那儿' },
    ],
    mistakes: [
      {
        wrong: '문을 열고 놓았어요',
        correct: '문을 열어 놓았어요',
        note: '-아/어/여 놓다 中间是 아/어，不是 고',
      },
      {
        wrong: '준비해 뒀어요을 내일 쓸 거예요',
        correct: '준비해 뒀으니까 내일 쓸 거예요 / 준비해 뒀어요. 내일 쓸 거예요.',
        note: '两句之间用 -으니까 连接或分开成两句，不能直接拼接',
      },
      {
        wrong: '밥을 먹어 뒀어요',
        correct: '밥을 먹어 놨어요（强调吃完了） / 밥을 미리 만들어 뒀어요（提前做好）',
        note: '먹다 + 두다 表示"提前吃好留着"语义不自然，一般用 놓다 或重新表达',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第8课</div>
    <div class="ov-hero-title">-아/어/여 두다, -아/어/여 놓다</div>
    <div class="ov-hero-sub">做好留着 vs 做完放那——结果保持的两种表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">留着备用</div>
      <div class="ko">动词词干 + 아/어/여 두다</div>
      <div class="zh">做好……留着（为以后准备）</div>
    </div>
    <div class="ov-block">
      <div class="badge">做完放那</div>
      <div class="ko">动词词干 + 아/어/여 놓다</div>
      <div class="zh">做了……放在那里（完成后状态）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">口语缩略</div></div>
    <div class="ov-block">
      <div class="ko">-아/어 두다 → -아/어 둬요 / 뒀어요</div>
      <div class="ko">-아/어 놓다 → -아/어 놔요 / 놨어요</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达"提前做好并保持"的两种结果保持句型</div>
<div class="card-body">-아/어/여 두다 表示做某事后保持那个状态，强调"留着备用/留着以后用"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">미리 예약해 뒀어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">提前预约好了（留着）。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">냉장고에 음식을 넣어 뒀어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">把食物放进冰箱里存着了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '아/어 두다 vs 아/어 놓다',
    compareHtml: `
<div class="card-title">아/어 두다 vs 아/어 놓다</div>
<div class="card-body">-아/어/여 두다 表示做某事后保持那个状态，强调"留着备用/留着以后用"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">미리 예약해 뒀어요</span><span style="font-size:16px;color:#5a4640">提前预约好了（留着）。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">문을 열어 놓았어요</span><span style="font-size:16px;color:#5a4640">把门开着（开了放那儿）。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">냉장고에 음식을 넣어 뒀어요</span><span style="font-size:16px;color:#5a4640">把食物放进冰箱里存着了。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '-아/어 두다 vs -아/어 놓다',
      headers: ['语法', '强调', '语感', '例句'],
      rows: [
        [{ ko: '-아/어 두다', zh: '' }, { ko: '保留备用', zh: '目的性' }, { ko: '为了以后', zh: '' }, { ko: '써 두었어요', zh: '记下来备用' }],
        [{ ko: '-아/어 놓다', zh: '' }, { ko: '处置放置', zh: '完成性' }, { ko: '完成后放那', zh: '' }, { ko: '써 놓았어요', zh: '写好放那了' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어 두다, -아/어 놓다',
      body: '测试对两个补助动词的掌握',
      questions: [
        {
          prompt: '提前买好票备用。→ 미리 표를 사___ 요',
          options: ['아 놓았어', '아 두었어', '아 버렸어', '아 있어'],
          answer: 1 as 0|1|2|3,
          explanation: '为了以后备用 → -아/어 두다',
        },
        {
          prompt: '把行李放在门口了。→ 짐을 문 앞에 ___ 요',
          options: ['놓아 두었어', '두어 놓았어', '놓아 놓았어', '두어 있어'],
          answer: 0 as 0|1|2|3,
          explanation: '放置完毕 → -아/어 놓다 或 두다 均可，놓아 두었어요 更自然',
        },
        {
          prompt: '-아/어 두다 强调的是？',
          options: ['状态正在持续', '动作已彻底完成', '立刻做完', '为了以后保留结果'],
          answer: 3 as 0|1|2|3,
          explanation: '-아/어 두다 = 保留结果，有目的性',
        },
        {
          prompt: '把资料整理好放那了。→ 자료를 정리해 ___',
          options: ['버렸어요', '두었어요', '놓았어요', '있어요'],
          answer: 2 as 0|1|2|3,
          explanation: '整理完放那 → -아/어 놓다',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p10-l09',
    partNumber: 10,
    lessonNumber: 9,
    title: '곳, 데, 군데',
    whatItDoes: '表示"地方/处所"的三种依存名词，各有细微差别',
    whatItDoesBody: '곳 是表示具体地点的依存名词，较正式。\n데 是口语化的"地方/处"，也可表示情况或方面。\n군데 表示"几处/若干地方"，常与数词搭配使用。\n三者含义相近，但使用场合和搭配不同。',
    structures: [
      {
        ko: '제가 자주 가는 곳이에요',
        zh: '这是我经常去的地方。',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '자주 가는', role: 'verb' },
          { text: '곳이에요', role: 'verb' },
        ],
      },
      {
        ko: '앉을 데가 없어요',
        zh: '没有可以坐的地方。',
        tokens: [
          { text: '앉을', role: 'verb' },
          { text: '데가 없어요', role: 'verb' },
        ],
      },
      {
        ko: '여기저기 몇 군데 돌아봤어요',
        zh: '到处转了几个地方。',
        tokens: [
          { text: '여기저기', role: 'plain' },
          { text: '몇 군데', role: 'subject' },
          { text: '돌아봤어요', role: 'verb' },
        ],
      },
      {
        ko: '모르는 데가 있으면 물어보세요',
        zh: '有不懂的地方就问。',
        tokens: [
          { text: '모르는 데가', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '물어보세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '곳：冠词形 + 곳，多用于正式场合或书面语', examples: '예쁜 곳 / 가고 싶은 곳 / 위험한 곳 / 아는 곳' },
      { type: 'rule', text: '데：冠词形 + 데，口语常用，也可表示"情况/方面"', examples: '갈 데 / 앉을 데 / 피할 데 / 힘든 데가 있어요（有难的地方/方面）' },
      { type: 'rule', text: '군데：수사 + 군데，表示若干处，常见搭配：한 군데, 두 군데, 몇 군데', examples: '한 군데 / 두 군데 / 몇 군데 / 여러 군데' },
      { type: 'compare', text: '곳 vs 데：곳 更书面，데 更口语；데 还可以表示"方面/情况"，곳 不行', examples: '가고 싶은 곳（正式）≈ 가고 싶은 데（口语）/ 어디 아픈 데 있어요?（哪里不舒服？）← 只能用 데' },
      { type: 'usage', text: '데 表示"方面/情况"时常用：-는 데 도움이 되다, -는 데 시간이 걸리다', examples: '한국어를 배우는 데 도움이 돼요（有助于学韩语）/ 고치는 데 시간이 걸려요（修理要花时间）' },
      { type: 'note', text: '군데 不能单独用于"某个具体地方"，必须带数量概念', examples: '○ 두 군데 가 봤어요 / × 군데에 갔어요' },
    ],
    cardExamples: [
      {
        zh: '在首尔一定要去的地方是哪里？',
        wordBlocks: [
          { text: '서울에서', role: 'place' },
          { text: '꼭 가 봐야 할', role: 'verb' },
          { text: '곳이 어디예요', role: 'verb' },
        ],
        swapWords: ['부산에서', '제주도에서', '한국에서'],
      },
      {
        zh: '没有可以休息的地方，所以一直走。',
        wordBlocks: [
          { text: '쉴 데가 없어서', role: 'verb' },
          { text: '계속 걸었어요', role: 'verb' },
        ],
        swapWords: ['앉을 데가 없어서', '숨을 데가 없어서'],
      },
      {
        zh: '去了三家医院还是没好。',
        wordBlocks: [
          { text: '병원을', role: 'object' },
          { text: '세 군데나', role: 'plain' },
          { text: '갔는데도 낫지 않았어요', role: 'verb' },
        ],
        swapWords: ['두 군데나', '몇 군데나', '식당을', '가게를'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '向朋友推荐旅行地点', ko: '제가 가 봤던 곳 중에서 거기가 제일 예뻤어요. 꼭 가 보세요.', zh: '在我去过的地方里，那里最漂亮。一定要去看看。', tip: '-던 곳 = 曾经去过的地方' },
      { icon: '💬', context: '询问有没有哪里不舒服', ko: '어디 아픈 데 있어요? 얼굴색이 안 좋아 보여요.', zh: '有哪里不舒服吗？看起来脸色不太好。', tip: '아픈 데 = 疼的地方/不舒服的地方（데 表示方面）' },
      { icon: '💬', context: '旅行后聊去了几个地方', ko: '이번 여행에서 유명한 곳 몇 군데 구경했어요.', zh: '这次旅行参观了几个有名的地方。', tip: '몇 군데 = 几个地方' },
      { icon: '💬', context: '韩剧台词：找不到去处', ko: '갈 데가 없어서 여기 왔어. 있어도 돼?', zh: '没地方可去，所以来了这里。可以待着吗？', tip: '갈 데 = 可以去的地方（데 口语）' },
      { icon: '💬', context: '解释花时间的原因', ko: '이 서류 정리하는 데 두 시간이나 걸렸어요.', zh: '整理这份文件花了整整两个小时。', tip: '-는 데 시간이 걸리다 = 做……花了时间（데 表示"在……方面"）' },
    ],
    mistakes: [
      {
        wrong: '어디 아픈 곳 있어요?',
        correct: '어디 아픈 데 있어요?',
        note: '询问身体不适的"地方/方面"用 데，곳 只表示空间地点',
      },
      {
        wrong: '군데에 갔어요',
        correct: '한 군데에 갔어요 / 몇 군데 가 봤어요',
        note: '군데 必须带数量词，不能单独使用',
      },
      {
        wrong: '가고 싶은 데는 경복궁이에요（书面/正式）',
        correct: '가고 싶은 곳은 경복궁이에요（正式）/ 가고 싶은 데는 경복궁이에요（口语可以）',
        note: '书面语境下 곳 更规范，데 偏口语',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第9课</div>
    <div class="ov-hero-title">곳, 데, 군데</div>
    <div class="ov-hero-sub">表示"地方/处所"的三种依存名词</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">正式</div>
      <div class="ko">冠词形 + 곳</div>
      <div class="zh">……的地方（正式/书面）</div>
    </div>
    <div class="ov-block">
      <div class="badge">口语</div>
      <div class="ko">冠词形 + 데</div>
      <div class="zh">……的地方/处（口语；也表方面/情况）</div>
    </div>
    <div class="ov-block">
      <div class="badge">数量</div>
      <div class="ko">수사 + 군데</div>
      <div class="zh">若干处/几个地方</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"地方/处所"的三种依存名词，各有细微差别</div>
<div class="card-body">곳 是表示具体地点的依存名词，较正式。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">제가 자주 가는 곳이에요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这是我经常去的地方。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">앉을 데가 없어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">没有可以坐的地方。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '곳 vs 데 vs 군데',
    compareHtml: `
<div class="card-title">곳 vs 데 vs 군데</div>
<div class="card-body">곳 是表示具体地点的依存名词，较正式。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">제가 자주 가는 곳이에요</span><span style="font-size:16px;color:#5a4640">这是我经常去的地方。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">여기저기 몇 군데 돌아봤어요</span><span style="font-size:16px;color:#5a4640">到处转了几个地方。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">앉을 데가 없어요</span><span style="font-size:16px;color:#5a4640">没有可以坐的地方。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '곳 / 데 / 군데 용법 비교',
      headers: ['词', '词性', '用法', '例句'],
      rows: [
        [{ ko: '곳', zh: '地方' }, { ko: '独立名词', zh: '' }, { ko: '自由接助词', zh: '' }, { ko: '좋은 곳이에요', zh: '是好地方' }],
        [{ ko: '데', zh: '地方' }, { ko: '依存名词', zh: '' }, { ko: '冠词形 + 데', zh: '' }, { ko: '살 데가 없어요', zh: '没地方住' }],
        [{ ko: '군데', zh: '处/个地方' }, { ko: '量词', zh: '' }, { ko: '数词 + 군데', zh: '' }, { ko: '두 군데 갔어요', zh: '去了两个地方' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '곳, 데, 군데',
      body: '测试对三个地方表达的掌握',
      questions: [
        {
          prompt: '没有可以休息的地方。→ 쉴 ___ 없어요',
          options: ['군데가', '데는', '데가', '곳이'],
          answer: 2 as 0|1|2|3,
          explanation: '冠词形 + 데 = 依存名词用法',
        },
        {
          prompt: '这是个美丽的地方。→ 여기는 아름다운 ___',
          options: ['데예요', '군데예요', '곳예요', '곳이에요'],
          answer: 3 as 0|1|2|3,
          explanation: '独立名词 곳 自然',
        },
        {
          prompt: '去了三个地方。→ 세 ___ 갔다 왔어요',
          options: ['군데', '데', '장소', '곳'],
          answer: 0 as 0|1|2|3,
          explanation: '数词 + 군데 = 量词用法',
        },
        {
          prompt: '데 作为依存名词，前面必须接什么？',
          options: ['动词基本形', '冠词形', '名词', '副词'],
          answer: 1 as 0|1|2|3,
          explanation: '데 是依存名词，前接动词/形容词冠词形',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p10-l10',
    partNumber: 10,
    lessonNumber: 10,
    title: '이, 저, 그 (指示代名词)',
    whatItDoes: '区分"这/那/那"三种指示代词的精确用法',
    whatItDoesBody: '이 指离说话人近的事物或刚提到的内容。\n저 指离说话人和听话人都远的事物。\n그 指离听话人近、或双方都知道的事物，也用于指代前文提到的内容。\n三者是韩语指示系统的核心，日常对话中不可或缺。',
    structures: [
      {
        ko: '이 사람이 제 친구예요',
        zh: '这个人是我朋友。',
        tokens: [
          { text: '이 사람이', role: 'subject' },
          { text: '제 친구예요', role: 'verb' },
        ],
      },
      {
        ko: '저 건물이 뭐예요',
        zh: '那栋楼是什么？',
        tokens: [
          { text: '저 건물이', role: 'subject' },
          { text: '뭐예요', role: 'verb' },
        ],
      },
      {
        ko: '그 영화 봤어요 정말 재미있었어요',
        zh: '那部电影看了吗？真的很有趣。',
        tokens: [
          { text: '그 영화', role: 'object' },
          { text: '봤어요', role: 'verb' },
          { text: '정말 재미있었어요', role: 'verb' },
        ],
      },
      {
        ko: '그때 왜 그런 말을 했어요',
        zh: '那时候为什么说了那种话？',
        tokens: [
          { text: '그때', role: 'time' },
          { text: '왜', role: 'plain' },
          { text: '그런 말을 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '이：近称，说话人附近的事物，或刚刚提到的内容', examples: '이것 / 이곳 / 이 사람 / 이번 / 이때' },
      { type: 'rule', text: '저：远称，离说话人和听话人都远的事物（通常可以看见）', examples: '저것 / 저곳 / 저 사람 / 저기' },
      { type: 'rule', text: '그：中称，离听话人近的事物，或双方都知道/前文提到的内容', examples: '그것 / 그곳 / 그 사람 / 그때 / 그런데 / 그래서' },
      { type: 'usage', text: '이/그/저 + 것/곳/분/때 的常用组合', examples: '이것(이게)/그것(그게)/저것(저게) / 이곳/그곳/저곳 / 이때/그때/저때' },
      { type: 'compare', text: '그 vs 저：그 指双方都知道的/前文提到的，저 指肉眼可见但较远的', examples: '그 영화（我们都看过那部电影）vs 저 영화관（指远处那家影院）' },
      { type: 'note', text: '그런（그런 사람）/ 이런（이런 경우）/ 저런（저런 상황）是 그/이/저 + -(으)ㄴ 的合成形式', examples: '이런 일이 생기면 / 그런 말은 하지 마세요 / 저런 실수를 하면 안 돼요' },
    ],
    cardExamples: [
      {
        zh: '这道菜吃过吗？是我最喜欢的。',
        wordBlocks: [
          { text: '이 음식', role: 'object' },
          { text: '먹어 봤어요', role: 'verb' },
          { text: '제가 제일 좋아하는 거예요', role: 'verb' },
        ],
        swapWords: ['이 노래', '이 책', '이 드라마'],
      },
      {
        zh: '那家咖啡厅看起来氛围不错，要不要去看看？',
        wordBlocks: [
          { text: '저 카페', role: 'subject' },
          { text: '분위기가 좋아 보여요', role: 'verb' },
          { text: '한번 가 볼까요', role: 'verb' },
        ],
        swapWords: ['저 식당', '저 가게', '저 건물'],
      },
      {
        zh: '那个人是什么样的人？是之前说过的那位？',
        wordBlocks: [
          { text: '그 사람', role: 'subject' },
          { text: '어떤 사람이에요', role: 'verb' },
          { text: '전에 얘기했던 분', role: 'subject' },
        ],
        swapWords: ['그 노래', '그 영화', '그 가게'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '指着眼前的东西', ko: '이거 얼마예요? 좀 비싸 보이는데요.', zh: '这个多少钱？看起来有点贵。', tip: '이거 = 이것 의 구어형' },
      { icon: '💬', context: '指着远处的地方', ko: '저기 보여요? 저 산 뒤에 폭포가 있어요.', zh: '看到了吗？那座山后面有瀑布。', tip: '저기 = 那里（远处可见）' },
      { icon: '💬', context: '提起双方都知道的话题', ko: '그 드라마 결말 봤어요? 너무 슬펐어요.', zh: '那部剧的结局看了吗？太悲了。', tip: '그 드라마 = 双方都知道/之前聊过的那部剧' },
      { icon: '💬', context: 'KPOP 粉丝聊爱豆', ko: '어제 그 무대 봤어? 이런 퍼포먼스는 처음 봤어.', zh: '昨天那个舞台看了吗？这样的表演还是第一次见。', tip: '그 무대 = 双方都知道的那个舞台；이런 = 这样的' },
      { icon: '💬', context: '韩剧台词：回忆过去', ko: '그때로 돌아갈 수 있다면 얼마나 좋을까.', zh: '如果能回到那时候该多好。', tip: '그때 = 那时候（双方共同记得的过去时刻）' },
    ],
    mistakes: [
      {
        wrong: '저 사람한테 전화했어요（对方旁边的人）',
        correct: '그 사람한테 전화했어요',
        note: '그 用于指代双方都知道的人/事，저 用于视觉上可见的远处，不能混用',
      },
      {
        wrong: '저 사람 누구예요?（指近处站着的人）',
        correct: '이 사람 누구예요?',
        note: '이 指说话人身边的人/物；저 指双方都能看见但较远的；그 指对话中前文提到的，不能混用',
      },
      {
        wrong: '그것을 어디 있어요?',
        correct: '그게 어디 있어요? / 그것이 어디 있어요?',
        note: '그것을 是宾格，问"在哪里"要用主格 그것이/그게',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 第10课</div>
    <div class="ov-hero-title">이, 저, 그 (指示代名词)</div>
    <div class="ov-hero-sub">这·那·那——三分指示系统</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">近称</div>
      <div class="ko">이 / 이것 / 이곳 / 이때</div>
      <div class="zh">这……（说话人附近 / 刚提到）</div>
    </div>
    <div class="ov-block">
      <div class="badge">远称</div>
      <div class="ko">저 / 저것 / 저곳 / 저기</div>
      <div class="zh">那……（双方都远，视觉可见）</div>
    </div>
    <div class="ov-block">
      <div class="badge">中称</div>
      <div class="ko">그 / 그것 / 그곳 / 그때</div>
      <div class="zh">那……（听话人附近 / 双方已知）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">变形组合</div></div>
    <div class="ov-block">
      <div class="ko">이런 / 그런 / 저런</div>
      <div class="zh">这样的 / 那样的 / 那样的（远）</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">区分"这/那/那"三种指示代词的精确用法</div>
<div class="card-body">이 指离说话人近的事物或刚提到的内容。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이 사람이 제 친구예요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这个人是我朋友。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">저 건물이 뭐예요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那栋楼是什么？</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '이 vs 그 vs 저',
    compareHtml: `
<div class="card-title">이 vs 그 vs 저</div>
<div class="card-body">이 指离说话人近的事物或刚提到的内容。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">이 사람이 제 친구예요</span><span style="font-size:16px;color:#5a4640">这个人是我朋友。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">그 영화 봤어요 정말 재미있었어요</span><span style="font-size:16px;color:#5a4640">那部电影看了吗？真的很有趣。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">저 건물이 뭐예요</span><span style="font-size:16px;color:#5a4640">那栋楼是什么？</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '지시사 체계',
      headers: ['系列', '冠词形', '代词形', '场所'],
      rows: [
        [{ ko: '이-', zh: '近称' }, { ko: '이 + 名词', zh: '' }, { ko: '이것/이거/여기', zh: '' }, { ko: '靠近화자', zh: '' }],
        [{ ko: '그-', zh: '中称' }, { ko: '그 + 名词', zh: '' }, { ko: '그것/그거/거기', zh: '' }, { ko: '靠近청자/已知', zh: '' }],
        [{ ko: '저-', zh: '远称' }, { ko: '저 + 名词', zh: '' }, { ko: '저것/저거/저기', zh: '' }, { ko: '远离双方', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '이, 저, 그 指示代词',
      body: '测试对三组指示词的掌握',
      questions: [
        {
          prompt: '（拿着手边的东西）这个是什么？→ ___ 게 뭐예요?',
          options: ['그', '어느', '저', '이'],
          answer: 3 as 0|1|2|3,
          explanation: '靠近说话人 → 이',
        },
        {
          prompt: '（指远处的建筑）那栋楼真高。→ ___ 건물 정말 높다',
          options: ['어떤', '저', '이', '그'],
          answer: 1 as 0|1|2|3,
          explanation: '远离双方 → 저',
        },
        {
          prompt: '（提起之前聊过的事）那件事我忘了。→ ___ 일 깜빡했어요',
          options: ['그', '이', '어느', '저'],
          answer: 0 as 0|1|2|3,
          explanation: '双方都知道的信息 → 그',
        },
        {
          prompt: '이것 的口语缩略形是？',
          options: ['이기', '이게', '이거', '이걸'],
          answer: 2 as 0|1|2|3,
          explanation: '이것 口语 → 이거',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p10-l11',
    partNumber: 10,
    lessonNumber: 11,
    title: '综合练习⑩',
    isPractice: true,
    whatItDoes: 'P10 全部语法点综合复习',
    whatItDoesBody: '本课汇总 P10（第1–10课）所有语法点，通过情景对话和替换练习巩固掌握。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑩',
      body: '完成 P10 所有课程后，用以下题目检验掌握程度。',
      questions: [
        { prompt: '用 -을 뿐이다 说"我只是个学生而已"', options: ['저는 학생만이에요', '저는 학생일 뿐이에요', '저는 학생뿐이에요', '저는 학생이기만 해요'], answer: 1, explanation: '名词 + 일 뿐이다，학생 + 일 뿐이에요' },
        { prompt: '"要是快点放假就好了"用哪个？', options: ['빨리 방학이 되기를 바라요', '빨리 방학이 됩시다', '빨리 방학이 됐으면 좋겠어요', '빨리 방학이 될 것 같아요'], answer: 2, explanation: '-(으)면 좋겠다 表达个人愿望：됐으면 좋겠어요' },
        { prompt: '希望你能通过考试，用 -기를 바라다', options: ['시험에 합격했으면 좋겠어요', '시험에 합격할게요', '시험에 합격하겠어요', '시험에 합격하기를 바라요'], answer: 3, explanation: '动词词干 + 기를 바라다，更正式的祝愿表达' },
        { prompt: '"打算下个月搬家"用哪个？', options: ['다음 달에 이사할 생각이에요', '다음 달에 이사할까 해요', '다음 달에 이사하려고 했어요', '다음 달에 이사하겠어요'], answer: 0, explanation: '-을 생각이다 表示已有打算：이사하다 + ㄹ 생각이에요' },
        { prompt: '一边听音乐一边学习，用 -(으)면서', options: ['음악을 듣는 동안 공부해요', '음악을 들으면서 공부해요', '음악을 듣고 나서 공부해요', '음악을 듣기 위해서 공부해요'], answer: 1, explanation: 'ㄷ불규칙：듣다 → 들으면서，主语相同时用 -(으)면서' },
        { prompt: '"在这些当中哪个最好？"中的"当中"用哪个？', options: ['이 때 어떤 게 제일 좋아요?', '이 에서 어떤 게 제일 좋아요?', '이 중에 어떤 게 제일 좋아요?', '이 중에서 어떤 게 제일 좋아요?'], answer: 3, explanation: '从集合中选择用 중에서，不是 때 或 에서' },
        { prompt: '"尽管很累，还是继续了"用哪个连接词？', options: ['힘들었어요. 그래서 계속했어요.', '힘들었어요. 그래도 계속했어요.', '힘들었어요. 그런데 계속했어요.', '힘들었어요. 그러나 계속했어요.'], answer: 1, explanation: '그래도 = 即便如此（让步），그러나 是对比转折，语感不同' },
        { prompt: '"坐在椅子上"（状态持续）用哪个？', options: ['의자에 앉고 있어요', '의자에 앉아요', '의자에 앉겠어요', '의자에 앉아 있어요'], answer: 3, explanation: '-아/어 있다 = 完成后状态持续；앉고 있다 = 正在坐下的动作' },
        { prompt: '"为以后备用，把资料存好了"——强调留着以备将来使用，用哪个？', options: ['미리 자료를 저장해 놨어요', '미리 자료를 저장해 뒀어요', '미리 자료를 저장하고 있어요', '미리 자료를 저장했어요'], answer: 1, explanation: '-아/어 두다 强调"做好留着以备将来使用"；-아/어 놓다 强调"做完摆在那里"，此题侧重为将来准备，用 두다 更贴切' },
        { prompt: '"有没有不懂的地方？"中的"地方"用哪个？', options: ['모르는 곳이 있어요?', '모르는 군데가 있어요?', '모르는 데가 있어요?', '모르는 때가 있어요?'], answer: 2, explanation: '데 = 口语化地方/方面，询问身体/理解上的"地方"用 데' },
        { prompt: '说"那部电影"（双方都看过的那部），用哪个指示词？', options: ['이 영화', '저 영화', '그 영화', '어느 영화'], answer: 2, explanation: '그 = 双方共知/前文提到的事物；이 = 说话人附近；저 = 双方都远的可见物' },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P10 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑩</div>
    <div class="ov-hero-sub">不定阶及中级口语表达·下 全部语法点回顾</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">P10 语法清单</div></div>
    <div class="ov-block"><div class="badge">第1课</div><div class="ko">-을/ㄹ 뿐, -을/ㄹ 뿐이다</div><div class="zh">只是……而已</div></div>
    <div class="ov-block"><div class="badge">第2课</div><div class="ko">-(으)면 좋겠다, -기를 바라다</div><div class="zh">愿望与期望</div></div>
    <div class="ov-block"><div class="badge">第3课</div><div class="ko">-을/ㄹ까 생각하다, -을/ㄹ 생각이다</div><div class="zh">考虑中与打算</div></div>
    <div class="ov-block"><div class="badge">第4课</div><div class="ko">-(으)면서, -기 위해서, 을/를 위해서</div><div class="zh">同时进行与目的</div></div>
    <div class="ov-block"><div class="badge">第5课</div><div class="ko">에서, 중에서, 때</div><div class="zh">范围选择与时间标记</div></div>
    <div class="ov-block"><div class="badge">第6课</div><div class="ko">그래도, 그러나</div><div class="zh">让步与正式转折</div></div>
    <div class="ov-block"><div class="badge">第7课</div><div class="ko">-아/어/여 있다, -고 있다 深化</div><div class="zh">状态持续 vs 动作持续</div></div>
    <div class="ov-block"><div class="badge">第8课</div><div class="ko">-아/어/여 두다, -아/어/여 놓다</div><div class="zh">做好留着与做完放那</div></div>
    <div class="ov-block"><div class="badge">第9课</div><div class="ko">곳, 데, 군데</div><div class="zh">三种"地方"依存名词</div></div>
    <div class="ov-block"><div class="badge">第10课</div><div class="ko">이, 저, 그 (指示代名词)</div><div class="zh">近称·远称·中称</div></div>
  </div>
</div>`,
    linkedGrammarIds: [],
  },
];

