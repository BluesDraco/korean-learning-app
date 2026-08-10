import type { GrammarCard } from '@/types';

export const grammarCardsP5: GrammarCard[] = [
  {
    id: 'card-p5-l01',
    partNumber: 5,
    lessonNumber: 1,
    title: '-(으)면, -(으)려면',
    whatItDoes: '说"如果……"和"想要……的话"', whatItDoesEn: 'Say "if..." and "if you want to..."',
    whatItDoesBody: '-(으)면 表示"如果……"的条件；\n-(으)려면 表示"想要做……的话"，后句常接建议或要求。\n-(으)면 对应中文"如果……就……"，-(으)려면 对应"想……的话就要……"，是第五章最核心的条件句结构。', whatItDoesBodyEn: '-(으)면 means "if..."; \\n-(으)려면 means "if you want to do..." and is often followed by a suggestion or request. \\n-(으)면 matches Chinese "if...then...", and -(으)려면 matches "if you want to...you should..." — these are the core conditional structures of Chapter 5.',
    structureNote: '两个条件结构共用一套收音规则：\n有收音→으면/으려면，无收音/ㄹ收音→면/려면。\n区别在含义：\n-(으)면 是普通条件，-(으)려면 是"以目标为前提"的条件，后句常配 -야 해요 或 -세요。', structureNoteEn: 'Both conditionals share the same batchim rules: \\nwith batchim→으면/으려면, without batchim or with ㄹ→면/려면. \\nThe difference is in meaning: \\n-(으)면 is a general condition, while -(으)려면 is a condition based on a goal, often paired with -야 해요 or -세요.',
    rulesNote: 'ㄹ 收音直接接 -면（살면/알면），不脱落 ㄹ。\n不规则在此正常触发：\n듣다→들으면，춥다→추우면，어렵다→어려우면。\n-(으)려면 是 -(으)려고 하면 的缩略形，后句适合接命令或义务句。', rulesNoteEn: 'ㄹ batchim attaches directly to -면 (살면/알면) without dropping the ㄹ. \\nIrregulars trigger normally here: \\n듣다→들으면, 춥다→추우면, 어렵다→어려우면. \\n-(으)려면 is a contraction of -(으)려고 하면, and the following clause suits commands or obligations.',
    scenarioNote: '"如果有时间就去""想把韩语学好就要每天练习"条件句是日常对话里最常用的句型之一。\n掌握这节课，你能给出建议、表达计划、描述"如果……"的情况。', scenarioNoteEn: '"If I have time, I\'ll go" and "if you want to get good at Korean, you need to practice daily" — conditionals are among the most common sentence patterns in everyday conversation. \\nMaster this lesson to give advice, express plans, and describe "if..." situations.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-(으)면 · -(으)려면</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说"如果……"和"想要……的话"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">시간이 있으면 카페에 가요.</span> — 如果有时间，就去咖啡店。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 잘하려면 매일 연습해야 해요.</span> — 想把韩语学好，就要每天练习。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">피곤하면 일찍 쉬세요.</span> — 如果累了，请早点休息。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">收音规则（两者相同）</div>
  <div style="margin-bottom:6px">有收音（非ㄹ）→ <b>으면/으려면</b>：먹다→먹으면/먹으려면</div>
  <div style="margin-bottom:6px">无收音 → <b>면/려면</b>：가다→가면/가려면</div>
  <div>ㄹ 收音 → <b>면/려면</b>（不加 으）：살다→살면/살려면</div>
</div>
<div class="reminder-box">-(으)려면 是"以目标为前提"的条件，后句常接 -야 해요 或 -세요。天气等无意志主语不用 -려면。</div>`,
    compareHtml: `<div class="card-title">-(으)면（条件）vs -(으)려면（目标）</div>
<div class="card-body">两者变形规则相同，含义不同：-(으)면 是普通"如果……就……"，-(으)려면 是"以某个目标为前提"，相当于"想……的话就要……"，后句通常是建议或义务。中文"如果"和"想要……的话"在韩语里是两套不同结构。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">普通条件：如果……就……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 있으면 공부해요.</span><span style="font-size:16px;color:#5a4640">如果有时间就学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨가 좋으면 산책해요.</span><span style="font-size:16px;color:#5a4640">如果天气好就散步。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)려면</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">目标条件：想……的话就……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잘하려면 매일 들어야 해요.</span><span style="font-size:16px;color:#5a4640">想做好的话就要每天听。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 가려면 비자가 필요해요.</span><span style="font-size:16px;color:#5a4640">想去韩国的话需要签证。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则（两者相同）</div>
  <div style="font-size:16px;color:#241917">有收音 → <b>-으면 / -으려면</b>：먹다 → 먹으면 / 먹으려면</div>
  <div style="font-size:16px;color:#241917">无收音 / ㄹ收音 → <b>-면 / -려면</b>：가다 → 가면 / 가려면 &nbsp;|&nbsp; 살다 → 살면 / 살려면</div>
</div>
<div class="reminder-box">가면 일찍 일어나야 해요 ✗（想说想去的话）→ 가려면 일찍 일어나야 해요 ✓ — 目标条件用 -려면，不用 -면。-(으)려면 后句常带 -야 해요 或 -세요，这是固定搭配信号。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的条件表达', titleEn: 'Choose the correct conditional expression',
      body: '根据句意选择 -(으)면 或 -(으)려면。', bodyEn: 'Choose -(으)면 or -(으)려면 based on the meaning.',
      questions: [
        {
          pre: '시간이',
          post: '같이 영화 볼까요?',
          options: ["있어서", "있으려면", "있으면"],
          answer: 2,
          explanation: '-(으)면 表示假设条件："如果有时间，一起看电影吧。"', explanationEn: '-(으)면 indicates a hypothetical condition: "If you have time, let\'s watch a movie together."',
        },
        {
          pre: '한국어를 잘하',
          post: '매일 연습해야 해요.',
          options: ['려면', '면', '니까'],
          answer: 0,
          explanation: '-(으)려면 表示"想要……的话"：想把韩语学好，必须每天练习。', explanationEn: '-(으)려면 means "if you want to...": If you want to get good at Korean, you must practice every day.',
        },
        {
          pre: '내일 비가',
          post: '소풍을 취소할 거예요.',
          options: ["와서", "오면", "오려면"],
          answer: 1,
          explanation: '-(으)면 假设条件："如果明天下雨，就取消郊游。"', explanationEn: '-(으)면 hypothetical condition: "If it rains tomorrow, we\'ll cancel the outing."',
        },
        {
          pre: '살을 빼',
          post: '운동하고 식단 조절도 하세요.',
          options: ['려면', '면', '서'],
          answer: 0,
          explanation: '-(으)려면 表示目的/意图条件："要减肥的话，请运动和饮食管理。"', explanationEn: '-(으)려면 indicates a purpose/intention condition: "If you want to lose weight, exercise and watch your diet."',
        },
      ],
    },

    compareLabel: '-(으)면（条件）vs -(으)려면（目标）', compareLabelEn: '-(으)면 (condition) vs -(으)려면 (goal)',
    structures: [
      {
        ko: '동사/형용사 (받침 O) + -으면',
        zh: '有收音词干 + -으면', zhEn: 'Stems with batchim + -으면',
        tokens: [
          { text: '동사/형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으면', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 (받침 X/ㄹ) + -면',
        zh: '无收音或ㄹ收音 + -면', zhEn: 'Stems without batchim or with ㄹ batchim + -면',
        tokens: [
          { text: '동사/형용사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-면', role: 'plain' },
        ],
      },
      {
        ko: '시간이 있으면 카페에 가요.',
        zh: '如果有时间，就去咖啡店。', zhEn: 'If you have time, go to a coffee shop.',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 잘하려면 매일 연습해야 해요.',
        zh: '想把韩语学好，就要每天练习。', zhEn: 'If you want to get good at Korean, you need to practice every day.',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘하려면', role: 'verb' },
          { text: '매일', role: 'time' },
          { text: '연습해야 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音（非ㄹ）→ -으면/-으려면', textEn: 'With batchim (not ㄹ) → -으면/-으려면', examples: '먹다→먹으면/먹으려면 / 읽다→읽으면/읽으려면 / 있다→있으면' },
      { type: 'rule', text: '无收音 → -면/-려면', textEn: 'No batchim → -면/-려면', examples: '가다→가면/가려면 / 보다→보면/보려면 / 공부하다→공부하면/공부하려면' },
      { type: 'rule', text: 'ㄹ 收音直接接 -면/-려면（ㄹ 不脱落）', textEn: 'ㄹ batchim directly attaches -면/-려면 (ㄹ does not drop)', examples: '살다→살면/살려면 / 알다→알면/알려면 / 만들다→만들면/만들려면' },
      { type: 'note', text: '不规则变形照常触发', textEn: 'Irregular conjugations still apply as usual', examples: '듣다→들으면 / 춥다→추우면 / 아프다→아프면 / 어렵다→어려우면' },
      { type: 'usage', text: '-(으)려면 是 -(으)려고 하면 的缩略形，后句接命令句或义务句（어야 해요/하세요）最自然', textEn: '-(으)려면 is a shortened form of -(으)려고 하면; it sounds most natural when the following clause is a command (어야 해요/하세요) or an obligation' },
      { type: 'example', text: '교재 예문：시간이 있으면 여행가고 싶어요 / 피곤하면 일찍 쉬세요 / 졸업하면 일을 하고 싶어요' },
      { type: 'example', text: '-(으)려면 교재 예문：전자사전을 사려면 쇼핑몰에 가야 해요' },
      { type: 'usage', text: '-(으)면 可用于过去形后面', textEn: '-(으)면 can be used after past tense forms', examples: '공부했으면 좋겠어요（如果学过了就好了）', examplesEn: '공부했으면 좋겠어요 (I wish I had studied)' },
      { type: 'note', text: '-(으)려면 后句限制：后句接命令句（-세요/-아/어요）或义务句（-아야/어야 해요）最自然', textEn: '-(으)려면 following clause restriction: it sounds most natural with a command (-세요/-아/어요) or an obligation (-아야/어야 해요)' },
      { type: 'usage', text: '高频块 -(으)면 되다 / -(으)면 안 되다：中文"这样做就行 / 不可以做"要靠 -(으)면 来说，中文母语者常想不到用条件句', textEn: 'High-frequency chunk -(으)면 되다 / -(으)면 안 되다: Chinese "just do this / can\'t do that" is expressed with -(으)면; Chinese speakers often don\'t think to use a conditional', examples: '이렇게 하면 돼요（这样做就行）/ 여기서 사진을 찍으면 안 돼요（这里不能拍照）/ 어떻게 하면 돼요?（怎么做才行?）', examplesEn: '이렇게 하면 돼요 (Just do it this way) / 여기서 사진을 찍으면 안 돼요 (You can\'t take photos here) / 어떻게 하면 돼요? (What should I do?)' },
      { type: 'note', text: '愿望块 -았/었으면 좋겠다："要是……就好了"。即使说的是现在或将来的愿望，也固定用过去形 -았/었-，这和中文直觉相反', textEn: 'Wish chunk -았/었으면 좋겠다: "I wish...". Even for present or future wishes, the past form -았/었- is always used, which is counterintuitive for Chinese speakers', examples: '시험에 합격했으면 좋겠어요（希望能通过考试）/ 비가 안 왔으면 좋겠어요（希望别下雨）', examplesEn: '시험에 합격했으면 좋겠어요 (I hope I pass the exam) / 비가 안 왔으면 좋겠어요 (I hope it doesn\'t rain)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '如果有时间，就去咖啡店。', zhEn: 'If you have time, go to a coffee shop.',
        swapRole: 'verb',
          swapWords: ['있으면', '없으면', '많으면'],
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '좋으면', role: 'verb' },
          { text: '산책해요', role: 'verb' },
        ],
        zh: '如果天气好，就散步。', zhEn: 'If the weather is nice, I\'ll take a walk.',
        swapRole: 'verb',
          swapWords: ['좋으면', '나쁘면', '추우면'],
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '부르려면', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '먼저 봐야 해요', role: 'verb' },
        ],
        zh: '想唱这首歌，就要先看歌词。', zhEn: 'If you want to sing this song, you need to look at the lyrics first.',
        swapWords: ['부르려면', '외우려면', '따라 하려면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '저장하려면', role: 'verb' },
          { text: '이 버튼을', role: 'object' },
          { text: '누르세요', role: 'verb' },
        ],
        zh: '想保存单词，请点这个按钮。', zhEn: 'If you want to save the word, please click this button.',
        swapWords: ['저장하려면', '찾으려면', '복습하려면'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习建议', contextEn: 'Study advice', ko: '한국어를 잘하려면 매일 연습해야 해요.', zh: '想把韩语学好，就要每天练习。', zhEn: 'If you want to get good at Korean, you need to practice every day.' },
      { icon: '🎵', context: 'KPOP 跟唱', contextEn: 'KPOP Sing-Along', ko: '이 노래를 부르려면 가사를 먼저 봐야 해요.', zh: '想唱这首歌，就要先看歌词。', zhEn: 'If you want to sing this song, you need to look at the lyrics first.' },
      { icon: '☕', context: '日常条件', contextEn: 'Everyday conditions', ko: '시간이 있으면 카페에 가요.', zh: '如果有时间，就去咖啡店。', zhEn: 'If you have time, go to a coffee shop.' },
      { icon: '😴', context: '健康提示', contextEn: 'Health tips', ko: '피곤하면 일찍 쉬세요.', zh: '如果累了，请早点休息。', zhEn: 'If you\'re tired, please rest early.' },
      { icon: '📱', context: 'App 引导', contextEn: 'App guide', ko: '단어를 저장하려면 이 버튼을 누르세요.', zh: '想保存单词，请点这个按钮。', zhEn: 'If you want to save the word, please click this button.' },
      { icon: '🎓', context: '目标规划', contextEn: 'Goal planning', ko: '시험에 합격하려면 열심히 공부해야 해요.', zh: '想通过考试，就要努力学习。', zhEn: 'If you want to pass the exam, you need to study hard.' },
    ],
    mistakes: [
      { wrong: '먹면 배불러요.', correct: '먹으면 배불러요.', note: '먹다 有收音，用 -으면，不是 -면', noteEn: '먹다 has a batchim, so use -으면, not -면' },
      { wrong: '가면 일찍 일어나야 해요. (想说想去学校的话)', wrongEn: '가면 일찍 일어나야 해요. (If you mean you want to go to school)', correct: '가려면 일찍 일어나야 해요.', note: '目标条件用 -려면；-면 是普通"如果"', noteEn: 'Use -려면 for goal conditions; -면 is a plain "if"' },
      { wrong: '살으면', correct: '살면', note: 'ㄹ 收音直接接 -면，不需要 으：살다→살면', noteEn: 'ㄹ batchim directly attaches -면, no 으 needed: 살다→살면' },
      { wrong: '들면 (듣다+면)', correct: '들으면', note: 'ㄷ 不规则：듣다→들으면（ㄷ→ㄹ）', noteEn: 'ㄷ irregular: 듣다→들으면 (ㄷ→ㄹ)' },
      { wrong: '여기서 사진을 안 찍으면 돼요. (想说这里不能拍照)', wrongEn: '여기서 사진을 안 찍으면 돼요. (Meaning: You can\'t take photos here)', correct: '여기서 사진을 찍으면 안 돼요.', note: '"不能做"是 -(으)면 안 되다，否定放在 되다 上；안 찍으면 돼요 意思变成"不拍的话就行"，完全跑偏', noteEn: '"Can\'t do" is -(으)면 안 되다, with the negation on 되다; 안 찍으면 돼요 means "it\'s fine if you don\'t take photos," which is completely off.' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-(으)면', '-(으)려면'],
      rows: [
        ['가다 去', '가면 如果去', '가려면 想去的话'],
        ['먹다 吃', '먹으면 如果吃', '먹으려면 想吃的话'],
        ['하다 做', '하면 如果做', '하려면 想做的话'],
        ['듣다 听', '들으면 如果听', '들으려면 想听的话'],
        ['살다 住/活', '살면 如果住', '살려면 想住的话'],
        ['춥다 冷（形）', '추우면 如果冷', '— (形容词无意志，不接 -려면)'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-(으)면 · -(으)려면 완성！</div>
  <div class='ov-sub'>条件句让表达更有逻辑</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)면</span> 如果：시간이 있으면 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-(으)려면</span> 想……的话：잘하려면 연습해야 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>有收音</span> 먹다→먹으면 / 읽다→읽으면</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 살다→살면（不加 으）</div>
</div>`,
    linkedGrammarIds: ['g28'],
  },
  {
    id: 'card-p5-l02',
    partNumber: 5,
    lessonNumber: 2,
    title: '못, -지 못하다, 안, -지 않다',
    whatItDoes: '区分"不做"和"做不到"', whatItDoesEn: 'Distinguish "don\'t do" from "can\'t do"',
    whatItDoesBody: '안/-지 않다 表示主观"不做"；\n못/-지 못하다 表示客观"不能/做不了"，常因能力或条件不允许。\n这个区别在中文里不明显，但韩语必须分清"我不喝咖啡"和"我喝不了咖啡"是完全不同的表达。', whatItDoesBodyEn: '안/-지 않다 means a subjective "don\'t do"; \\n못/-지 못하다 means an objective "can\'t do" — often due to ability or circumstances. \\nThis distinction isn\'t obvious in Chinese, but in Korean, "I don\'t drink coffee" and "I can\'t drink coffee" are completely different expressions.',
    structureNote: '两套否定各有短形和长形：\n안/못（短形，口语常用）和 -지 않다/-지 못하다（长形，更完整）。\n短形直接放动词前，长形接词干后加 지。\n注意 못 不能用于形容词。', structureNoteEn: 'There are two sets of negation, each with a short and long form: \\n안/못 (short, common in speech) and -지 않다/-지 못하다 (long, more complete). \\nThe short form goes directly before the verb; the long form attaches to the stem with 지. \\nNote: 못 cannot be used with adjectives.',
    rulesNote: '하다 动词的否定要把 안/못 插在 하다 前面：\n공부 안 해요，不是 안 공부해요。\n못 不能用于形容词（날씨가 못 좋아요 ✗→안 좋아요 ✓）。\n关键区分：\n自愿不做用 안，条件/能力不允许用 못。', rulesNoteEn: 'To negate 하다 verbs, insert 안/못 before 하다: \\n공부 안 해요, not 안 공부해요. \\n못 cannot be used with adjectives (날씨가 못 좋아요 ✗→안 좋아요 ✓). \\nKey distinction: \\nUse 안 when you choose not to do something; use 못 when circumstances or ability prevent it.',
    scenarioNote: '"我不吃辣""因为过敏所以不能喝""发音太快跟不上"\n안 和 못 的区分是日常对话里非常实用的技能，能让你表达更准确，避免误会。', scenarioNoteEn: '"I don\'t eat spicy food," "I can\'t drink it because of allergies," "The pronunciation is too fast to follow." \\nKnowing the difference between 안 and 못 is a very practical skill in everyday conversation—it makes your expressions more precise and helps avoid misunderstandings.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">안/못 · -지 않다/-지 못하다</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">区分"不做"（主观）和"做不了"（客观）。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 공부 안 해요.</span> — 今天不学习。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 커피를 안 마셔요.</span> — 我不喝咖啡。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">너무 빨라서 따라 하지 못해요.</span> — 太快了，所以跟不上。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两套否定，用法不同</div>
  <div style="margin-bottom:6px">① <b>안 / -지 않다</b> — 主观不做（我选择不做）</div>
  <div style="margin-bottom:6px">② <b>못 / -지 못하다</b> — 客观不能（条件/能力不允许）</div>
  <div style="color:#89756e;font-size:16px">短形（안/못）放动词前；长形（-지 않다/-지 못하다）接词干后</div>
</div>
<div class="reminder-box">하다 动词：안/못 插在 하다 前 → 공부 안 해요 / 공부 못 해요。못 不接形容词：날씨가 못 좋아요 ✗ → 안 좋아요 ✓。</div>`,
    compareHtml: `<div class="card-title">안（不做）vs 못（做不了）</div>
<div class="card-body">中文'不'的语义范围比韩语 안 更宽，有时同一个'不'对应韩语的 안 或 못，因此中文母语者尤其需要注意韩语两者的区别。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">안 / -지 않다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">主观：我选择不做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 커피를 안 마셔요.</span><span style="font-size:16px;color:#5a4640">我不喝咖啡。（个人偏好）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오늘은 안 가요.</span><span style="font-size:16px;color:#5a4640">今天我不去。（主动选择）</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">못 / -지 못하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">客观：条件/能力不允许</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">알레르기가 있어서 못 마셔요.</span><span style="font-size:16px;color:#5a4640">因为过敏所以不能喝。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약속이 있어서 못 가요.</span><span style="font-size:16px;color:#5a4640">因为有约所以去不了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">长形否定（更正式）</div>
  <div style="font-size:16px;color:#241917">안 → <b>-지 않아요</b>：가지 않아요（不去）</div>
  <div style="font-size:16px;color:#241917">못 → <b>-지 못해요</b>：가지 못해요（去不了）</div>
  <div style="font-size:16px;color:#89756e;margin-top:4px">短形口语更常用，长形书面/正式场合使用</div>
</div>
<div class="reminder-box">안 가요（我选择不去）vs 못 가요（我去不了）— 语气差别很大。하다 动词：안 해요 / 못 해요（中间加空格）。形容词只能用 안：안 예뻐요 ✓，못 예뻐요 ✗。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的否定形式', titleEn: 'Choose the correct negative form',
      body: '根据句意选择 못 或 안 相关的否定表达。', bodyEn: 'Choose the negative expression with 못 or 안 based on the context.',
      questions: [
        {
          pre: '어제 숙제를',
          post: '.',
          prompt: '（客观原因：배가 너무 아파서）', promptEn: '(Objective reason: because my stomach hurt a lot)',
          options: ["하지 않았어요", "못 했어요", "안 했어요"],
          answer: 1,
          explanation: '못 表示"不能/没能"（能力不足或客观原因）：昨天肚子太疼没能做作业。안 했어요 是"没做"（主观选择）。', explanationEn: '못 means "can\'t/couldn\'t" (lack of ability or objective reason): Yesterday my stomach hurt so much I couldn\'t do my homework. 안 했어요 means "didn\'t do" (subjective choice).',
        },
        {
          pre: '저는 매운 음식을',
          post: '.',
          prompt: '（客观原因：어릴 때부터 못 먹어요）', promptEn: '(Objective reason: I haven\'t been able to eat it since I was young)',
          options: ["못 먹어요", "안 먹어요", "먹지 않아요"],
          answer: 0,
          explanation: '客观上吃不了（能力/体质原因）用 못 먹어요。안 먹어요 和 먹지 않아요 都是"不吃"（主观选择），与"从小就吃不了"的客观语境不符。', explanationEn: 'For objectively not being able to eat (ability/physical reasons), use 못 먹어요. 안 먹어요 and 먹지 않아요 both mean "don\'t eat" (subjective choice), which doesn\'t fit the objective context of "haven\'t been able to since childhood."',
        },
        {
          pre: '시간이 없어서 영화를',
          post: '.',
          options: ['안 봤어요', '보지 않았어요', '못 봤어요'],
          answer: 2,
          explanation: '时间不够→客观原因→못 봤어요（没能看）。', explanationEn: 'Not enough time → objective reason → 못 봤어요 (couldn\'t watch).',
        },
        {
          pre: '친구가 불렀지만 가기 싫어서',
          post: '.',
          options: ["안 갔어요", "못 갔어요", "가지 못했어요"],
          answer: 0,
          explanation: '"因为不想去"是主观选择→안 갔어요。못 갔어요 / 가지 못했어요 都表示"去不了"（客观受阻），与"不想去"矛盾。', explanationEn: '"Because I don\'t want to go" is a subjective choice → 안 갔어요. 못 갔어요 / 가지 못했어요 both mean "couldn\'t go" (objectively prevented), which contradicts "don\'t want to go."',
        },
      ],
    },

    compareLabel: '안（不做）vs 못（做不了）', compareLabelEn: '안 (don\'t do) vs 못 (can\'t do)',
    structures: [
      {
        ko: '안 + 동사/형용사',
        zh: '안 + 动词/形容词 = 不……', zhEn: '안 + verb/adjective = not...',
        tokens: [
          { text: '안', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '동사/형용사', role: 'verb' },
        ],
      },
      {
        ko: '동사어간 + -지 않아요',
        zh: '动词词干 + -지 않아요 = 不……', zhEn: 'Verb stem + -지 않아요 = not...',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지 않아요', role: 'plain' },
        ],
      },
      {
        ko: '못 + 동사',
        zh: '못 + 动词 = 不能……', zhEn: '못 + verb = can\'t...',
        tokens: [
          { text: '못', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '동사', role: 'verb' },
        ],
      },
      {
        ko: '너무 빨라서 따라 하지 못해요.',
        zh: '太快了，所以跟不上。', zhEn: 'It\'s too fast, so I can\'t keep up.',
        tokens: [
          { text: '너무 빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '안 + 动词/形容词：안 放在动词前', textEn: '안 + verb/adjective: place 안 before the verb', examples: '안 가요 / 안 먹어요 / 안 좋아요' },
      { type: 'note', text: '하다 动词：안/못 插在 하다 前面', textEn: '하다 verbs: insert 안/못 before 하다', examples: '공부 안 해요 / 공부 못 해요（不是 안 공부해요，口语更自然）', examplesEn: '공부 안 해요 / 공부 못 해요 (not 안 공부해요; more natural in speech)' },
      { type: 'rule', text: '-지 않아요：去掉 다 加 지 않아요', textEn: '-지 않아요: drop 다 and add 지 않아요', examples: '가다→가지 않아요 / 먹다→먹지 않아요' },
      { type: 'rule', text: '-지 못해요：去掉 다 加 지 못해요', textEn: '-지 못해요: drop 다 and add 지 못해요', examples: '가다→가지 못해요 / 이해하다→이해하지 못해요' },
      { type: 'example', text: '교재 예문（못）：저는 채식주의자라서 고기를 못 먹어요 / 일이 있어서 못 갔어요 / 알코올에 알레르기가 있어서 술을 못 마셔요' },
      { type: 'example', text: '교재 예문（안）：저는 커피를 안 마셔요 / 오늘 공부 안 해요' },
      { type: 'note', text: '못 不接形容词：날씨가 못 좋아요（✗）→ 날씨가 안 좋아요（✓）', textEn: '못 doesn\'t go with adjectives: 날씨가 못 좋아요 (✗) → 날씨가 안 좋아요 (✓)' },
      { type: 'compare', text: '못 vs 안 总结：自愿不做用 안，条件/能力不允许用 못', textEn: '못 vs 안 summary: use 안 for voluntary not doing, 못 when conditions/ability don\'t allow' },
      { type: 'note', text: '有些词的否定不用 안/못，而是换成专门的反义词：있다→없다、알다→모르다、맛있다→맛없다。中文母语者最爱说错的就是 "안 있어요""못 알아요"', textEn: 'Some words don\'t use 안/못 for negation but switch to a dedicated antonym: 있다→없다, 알다→모르다, 맛있다→맛없다. Chinese speakers most often get "안 있어요" and "못 알아요" wrong.', examples: '시간이 없어요（没时间，不是 안 있어요）/ 저는 몰라요（我不知道，不是 안 알아요）', examplesEn: '시간이 없어요 (no time, not 안 있어요) / 저는 몰라요 (I don\'t know, not 안 알아요)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '공부', role: 'object' },
          { text: '안 해요', role: 'verb' },
        ],
        zh: '今天不学习。', zhEn: 'I\'m not studying today.',
        swapWords: ['안 해요', '안 가요', '안 먹어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '없어서', role: 'verb' },
          { text: '못 가요', role: 'verb' },
        ],
        zh: '因为没时间，所以不能去。', zhEn: 'I can\'t go because I don\'t have time.',
        swapWords: ['못 가요', '못 해요', '가지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
        zh: '因为发音快，所以跟不上。', zhEn: 'Because the pronunciation is fast, I can\'t keep up.',
        swapWords: ['따라 하지 못해요', '이해하지 못해요', '외우지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문장을', role: 'object' },
          { text: '이해하지', role: 'verb' },
          { text: '않아요', role: 'verb' },
        ],
        zh: '不理解这个句子。', zhEn: 'I don\'t understand this sentence.',
        swapWords: ['이해하지 않아요', '외우지 않아요', '읽지 않아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '日程冲突', contextEn: 'Schedule conflict', ko: '오늘은 시간이 없어서 못 가요.', zh: '今天因为没时间，所以不能去。', zhEn: 'I can\'t go today because I don\'t have time.' },
      { icon: '📚', context: '学习困难', contextEn: 'Learning difficulty', ko: '이 문장을 이해하지 못해요.', zh: '不能理解这个句子。', zhEn: 'I can\'t understand this sentence.' },
      { icon: '🎵', context: 'KPOP 跟读', contextEn: 'KPOP Shadowing', ko: '너무 빨라서 따라 하지 못해요.', zh: '太快了，所以跟不上。', zhEn: 'It\'s too fast, so I can\'t keep up.' },
      { icon: '☕', context: '个人喜好', contextEn: 'Personal preference', ko: '저는 커피를 안 마셔요.', zh: '我不喝咖啡。', zhEn: 'I don\'t drink coffee.' },
      { icon: '🥩', context: '饮食限制', contextEn: 'Dietary restriction', ko: '채식주의자라서 고기를 못 먹어요.', zh: '因为是素食者，所以不能吃肉。', zhEn: 'I can\'t eat meat because I\'m a vegetarian.' },
      { icon: '🎤', context: '唱歌挑战', contextEn: 'Singing challenge', ko: '이 노래는 너무 높아서 부르지 못해요.', zh: '这首歌太高了，唱不了。', zhEn: 'This song is too high; I can\'t sing it.' },
    ],
    mistakes: [
      { wrong: '오늘 안 공부해요. (하다동사)', correct: '오늘 공부 안 해요.', note: '하다 动词口语更自然：공부 안 해요（안 插入 하다 前）', noteEn: 'For 하다 verbs, it\'s more natural in speech: 공부 안 해요 (insert 안 before 하다)' },
      { wrong: '날씨가 못 좋아요.', correct: '날씨가 안 좋아요.', note: '못 不接形容词，否定形容词用 안', noteEn: '못 doesn\'t attach to adjectives; use 안 to negate adjectives' },
      { wrong: '가다지 못해요.', correct: '가지 못해요.', note: '-지 못하다 接词干，去掉 다 后加 지 못해요', noteEn: '-지 못하다 attaches to the stem: drop 다 and add 지 못해요' },
      { wrong: '안 가요 / 못 가요 语气相同', wrongEn: '안 가요 / 못 가요 have the same tone', correct: '안 가요（主观不去）/ 못 가요（客观不能去）', correctEn: '안 가요 (subjective: not going) / 못 가요 (objective: can\'t go)', note: '안=主观选择不做；못=条件/能力不允许，语气差别大', noteEn: '안 = subjective choice not to do; 못 = conditions/ability don\'t allow; big difference in nuance' },
      { wrong: '저는 그 사람을 못 알아요.', correct: '저는 그 사람을 몰라요.', note: '알다 的否定不是 못/안 알다，而是专门的词 모르다；"不知道/不认识"要用 모르다', noteEn: 'The negative of 알다 isn\'t 못/안 알다 but the dedicated word 모르다; use 모르다 for \'don\'t know/don\'t recognize\'' },
      { wrong: '지금 시간이 안 있어요.', correct: '지금 시간이 없어요.', note: '있다 的否定不是 안 있다，而是专门的词 없다；"没有"一律用 없다', noteEn: 'The negative of 있다 isn\'t 안 있다 but the dedicated word 없다; always use 없다 for \'don\'t have\'' },
    ],
    quickTable: {
      title: '否定表达表', titleEn: 'Negative expression table',
      headers: ['否定类型', '短形', '长形'],
      rows: [
        ['主观不做', '안 가요 不去', '가지 않아요 不去（长否）'],
        ['客观不能', '못 가요 不能去', '가지 못해요 不能去（长否）'],
        ['하다 型主观否定', '공부 안 해요 不学习', '공부하지 않아요 不学习（长否）'],
        ['하다 型客观否定', '공부 못 해요 不能学习', '공부하지 못해요 不能学习（长否）'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>안 · 못 완성！</div>
  <div class='ov-sub'>否定也有主观和客观之分</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>안/-지 않다</span> 主观不做：안 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>못/-지 못하다</span> 客观不能：못 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다동사</span> 공부 안/못 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 못 不接形容词</div>
</div>`,
    linkedGrammarIds: ['g15'],
  },
  {
    id: 'card-p5-l03',
    partNumber: 5,
    lessonNumber: 3,
    title: '-(으)려고 하다, (아마) -을/ㄹ 것이다',
    whatItDoes: '说打算做什么，大概会怎样', whatItDoesEn: 'Say what you plan to do and what will probably happen',
    whatItDoesBody: '-(으)려고 해요 表示"打算/准备做某事"；\n아마 -을/ㄹ 거예요 表示"大概会……"的推测。\n前者是P1将来时 -을/ㄹ 거예요 的延伸将来时说"会做"，这节课的 -(으)려고 해요 强调"已有计划/意图"。\n中文"打算去"和"会去"都靠独立词区分，韩语用不同词尾直接嵌入动词末尾表达。', whatItDoesBodyEn: '-(으)려고 해요 means "plan/intend to do something"; \\n아마 -을/ㄹ 거예요 expresses a guess of "will probably...". \\nThe former extends the future tense -을/ㄹ 거예요 from P1 to say "will do," while this lesson\'s -(으)려고 해요 emphasizes "having a plan/intention." \\nIn Chinese, "plan to go" and "will go" are distinguished by separate words, but Korean uses different endings attached directly to the verb.',
    structureNote: '两块内容：①-(으)려고 해요（计划/意图）有收音接 으려고，无收音接 려고；\n②아마 -을/ㄹ 거예요（推测）-을/ㄹ 거예요 已学过，加 아마 表示"大概/可能"。', structureNoteEn: 'Two parts: ① -(으)려고 해요 (plan/intention) — attach 으려고 after a final consonant, 려고 without; \\n② 아마 -을/ㄹ 거예요 (guess) — you\'ve learned -을/ㄹ 거예요; adding 아마 means "probably/possibly."',
    rulesNote: '-(으)려고 해요 的主语必须是有意志的人/动物，天气等无意志主语不能用（날씨가 따뜻하려고 해요 ✗）。\n推测的强度：\n갈 거예요（会去）→ 아마 갈 거예요（大概会去）。\nㅂ 不规则触发：\n어렵다→어려울 거예요。', rulesNoteEn: 'The subject of -(으)려고 해요 must be a person or animal with intention; non-volitional subjects like weather can\'t be used (날씨가 따뜻하려고 해요 ✗). \\nStrength of guess: \\n갈 거예요 (will go) → 아마 갈 거예요 (will probably go). \\nㅂ irregular: \\n어렵다→어려울 거예요.',
    scenarioNote: '"今天打算复习单词""打算去演唱会""票大概会很贵"计划和推测是学习日记、聊天、讨论未来时最常用的表达。\n掌握这节课，你能说出自己的计划也能猜测别人的情况。', scenarioNoteEn: '"I plan to review vocabulary today," "I\'m planning to go to the concert," "The tickets will probably be expensive." Plans and guesses are the most common expressions in study diaries, chats, and discussions about the future. \\nMaster this lesson and you can state your own plans and guess others\' situations.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-(으)려고 하다 · 아마 -을/ㄹ 것이다</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说打算做什么，或大概会怎样。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 단어를 복습하려고 해요.</span> — 今天打算复习单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 노래를 따라 하려고 해요.</span> — 打算跟唱这首歌。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">아마 콘서트 티켓이 비쌀 거예요.</span> — 演唱会票大概会很贵。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个结构</div>
  <div style="margin-bottom:6px">① <b>-(으)려고 해요</b> — 打算/计划做（有意志的主语）<br><span style="color:#89756e;font-size:16px">有收音→으려고，无收音→려고</span></div>
  <div>② <b>아마 -을/ㄹ 거예요</b> — 大概会……（推测）<br><span style="color:#89756e;font-size:16px">아마 加强"不确定"语气</span></div>
</div>
<div class="reminder-box">ㅂ 不规则：어렵다→어려울 거예요。무의지 주어（天气等）不能用 -려고 해요，改用 -을/ㄹ 거예요。</div>`,
    compareHtml: `<div class="card-title">-(으)려고 해요（计划）vs 아마 -을/ㄹ 거예요（推测）</div>
<div class="card-body">两者都说"将来"，但意图不同：-(으)려고 해요 是已有计划/意图，主语必须是有意志的人；아마 -을/ㄹ 거예요 是对未来的推测，主语可以是人也可以是天气、事物。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)려고 해요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">个人计划：我打算……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오늘 공부하려고 해요.</span><span style="font-size:16px;color:#5a4640">今天打算学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">내년에 한국에 가려고 해요.</span><span style="font-size:16px;color:#5a4640">明年打算去韩国。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아마 -을/ㄹ 거예요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">未来推测：大概会……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아마 어려울 거예요.</span><span style="font-size:16px;color:#5a4640">大概会难。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아마 내일 비가 올 거예요.</span><span style="font-size:16px;color:#5a4640">明天大概会下雨。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则</div>
  <div style="font-size:16px;color:#241917">-(으)려고：有收音 → <b>-으려고</b>（먹으려고），无收音 → <b>-려고</b>（가려고）</div>
  <div style="font-size:16px;color:#241917">-을/ㄹ 거예요：有收音 → <b>-을 거예요</b>（먹을），无收音 → <b>-ㄹ 거예요</b>（갈）</div>
</div>
<div class="reminder-box">비가 오려고 해요 ✗（天气没有意志）→ 아마 비가 올 거예요 ✓ — 天气/事物无意志，只能用推测句。-(으)려고 해요 和 -(으)ㄹ 거예요 都能说计划，但 -려고 更强调"我有意图"，거예요 更中性。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的意图/推测表达', titleEn: 'Choose the correct intention/guess expression',
      body: '根据句意选择 -(으)려고 하다 或 -(으)ㄹ 것이다。', bodyEn: 'Choose -(으)려고 하다 or -(으)ㄹ 것이다 based on the meaning.',
      questions: [
        {
          pre: '방학에 한국에',
          post: '.',
          prompt: '（비행기표를 알아보고 있어요——意图/计划）', promptEn: '(비행기표를 알아보고 있어요 — intention/plan)',
          options: ['가려고 해요', '갔어요', '갈 거예요'],
          answer: 0,
          explanation: '-(으)려고 하다 表示"打算/计划"：放假打算去韩国。갈 거예요 虽然也表示将来，但这里强调正在实施中的计划意图，려고 更合适。', explanationEn: '-(으)려고 하다 means \'intend/plan\': I plan to go to Korea on vacation. 갈 거예요 also expresses the future, but here it emphasizes an ongoing plan/intention, so 려고 is more appropriate.',
        },
        {
          pre: '아마 내일은',
          post: '.',
          options: ["비가 왔어요", "비가 올 거예요", "비가 오려고 해요"],
          answer: 1,
          explanation: '아마 + -ㄹ 거예요 表示推测："明天大概会下雨。"', explanationEn: '아마 + -ㄹ 거예요 expresses conjecture: \'It will probably rain tomorrow.\'',
        },
        {
          pre: '뭘',
          post: '?',
          prompt: '（주말 계획을 물어볼 때——意图/打算）', promptEn: '(주말 계획을 물어볼 때 — intention/plan)',
          options: ["할 거예요", "하려고 해요", "했어요"],
          answer: 1,
          explanation: '问意图/计划："打算做什么？"用 -(으)려고 하다。할 거예요 虽然语法不错，但这里问的是当下意图而非确定日程。', explanationEn: 'To ask about intention/plans: \'What do you plan to do?\' use -(으)려고 하다. 할 거예요 is grammatically fine, but here it asks about current intention, not a fixed schedule.',
        },
        {
          pre: '저녁에 친구를',
          post: '.',
          options: ['만났어요', '만날 거예요', '만나려고 해요'],
          answer: 2,
          explanation: '-(으)려고 해요 表示计划："晚上打算见朋友。"', explanationEn: '-(으)려고 해요 expresses plans: "I plan to meet a friend in the evening."',
        },
      ],
    },

    compareLabel: '-(으)려고 해요（计划）vs 아마 -을/ㄹ 거예요（推测）', compareLabelEn: '-(으)려고 해요 (plans) vs 아마 -을/ㄹ 거예요 (guesses)',
    structures: [
      {
        ko: '동사 (받침 X) + -려고 해요',
        zh: '无收音词干 + -려고 해요 = 打算……', zhEn: 'Stem without final consonant + -려고 해요 = plan to...',
        tokens: [
          { text: '동사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-려고 해요', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침 O) + -으려고 해요',
        zh: '有收音词干 + -으려고 해요', zhEn: 'Stem with final consonant + -으려고 해요',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으려고 해요', role: 'plain' },
        ],
      },
      {
        ko: '아마 + 동사/형용사 + -을/ㄹ 거예요',
        zh: '아마 + 动词/形容词 + -을/ㄹ 거예요 = 大概会……', zhEn: '아마 + verb/adjective + -을/ㄹ 거예요 = probably will...',
        tokens: [
          { text: '아마', role: 'plain' },
          { text: '동사/형용사', role: 'verb' },
          { text: '-을/ㄹ 거예요', role: 'plain' },
        ],
      },
      {
        ko: '이 노래를 따라 하려고 해요.',
        zh: '打算跟唱这首歌。', zhEn: 'I plan to sing along to this song.',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '따라 하려고 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音 → -려고 해요', textEn: 'No final consonant → -려고 해요', examples: '가다→가려고 해요 / 보다→보려고 해요 / 공부하다→공부하려고 해요' },
      { type: 'rule', text: '有收音 → -으려고 해요', textEn: 'Final consonant → -으려고 해요', examples: '먹다→먹으려고 해요 / 읽다→읽으려고 해요 / 듣다→들으려고 해요' },
      { type: 'rule', text: '-을/ㄹ 거예요（推测）：无收音→-ㄹ 거예요；有收音→-을 거예요', textEn: '-을/ㄹ 거예요 (guessing): no final consonant → -ㄹ 거예요; final consonant → -을 거예요', examples: '가다→갈 거예요 / 먹다→먹을 거예요' },
      { type: 'usage', text: '아마 是推测副词，降低确定性', textEn: '아마 is a guessing adverb that lowers certainty', examples: '아마 갈 거예요（大概会去）vs 갈 거예요（会去）', examplesEn: '아마 갈 거예요 (probably will go) vs 갈 거예요 (will go)' },
      { type: 'note', text: 'ㅂ 不规则', textEn: 'ㅂ irregular', examples: '어렵다→어려울 거예요 / 춥다→추울 거예요 / 쉽다→쉬울 거예요' },
      { type: 'note', text: '-(으)려고 해요 的主语必须是有意志的，天气等无意志主语不可用', textEn: 'The subject of -(으)려고 해요 must have intention; weather and other non-intentional subjects can\'t be used' },
      { type: 'example', text: '교재 예문：오늘 한국어를 공부하려고 해요 / 이 노래를 따라 하려고 해요 / 아마 내일 비가 올 거예요' },
      { type: 'usage', text: '过去推测：-았/었을 거예요', textEn: 'Past guessing: -았/었을 거예요', examples: '갔을 거예요（可能去了）/ 먹었을 거예요（可能吃了）', examplesEn: '갔을 거예요 (probably went) / 먹었을 거예요 (probably ate)' },
      { type: 'example', text: '추가 교재 예문：콘서트가 재미있을 거예요（演唱会应该很有趣）/ 내일도 날씨가 좋을 거예요', textEn: 'Additional textbook examples: 콘서트가 재미있을 거예요 (The concert should be fun) / 내일도 날씨가 좋을 거예요 (The weather will be nice tomorrow too)' },
      { type: 'compare', text: '"打算做"用 -(으)려고 하다；"去做／来做（移动目的）"用 -(으)러 가다/오다。中文都说"去买"，韩语要分家', textEn: '"Plan to do" uses -(으)려고 하다; "go/come to do (purpose of movement)" uses -(으)러 가다/오다. Chinese says "go buy" for both, but Korean distinguishes them', examples: '밥을 먹으려고 해요（打算吃饭）/ 밥을 먹으러 가요（去吃饭）', examplesEn: '밥을 먹으려고 해요 (plan to eat) / 밥을 먹으러 가요 (go to eat)' },
      { type: 'rule', text: '이다 的推测：아마 …일 거예요，用来猜"大概是……"的身份或现状', textEn: 'Guessing with 이다: 아마 …일 거예요, used to guess someone\'s identity or current state', examples: '그 사람은 아마 학생일 거예요（他大概是学生）/ 여기가 아마 입구일 거예요（这里大概是入口）', examplesEn: '그 사람은 아마 학생일 거예요 (He\'s probably a student) / 여기가 아마 입구일 거예요 (This is probably the entrance)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습하려고 해요', role: 'verb' },
        ],
        zh: '今天打算复习单词。', zhEn: 'I plan to review vocabulary today.',
        swapWords: ['복습하려고 해요', '외우려고 해요', '정리하려고 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '따라 하려고 해요', role: 'verb' },
        ],
        zh: '打算跟唱这首歌。', zhEn: 'I plan to sing along to this song.',
        swapWords: ['따라 하려고 해요', '외우려고 해요', '녹음하려고 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아마', role: 'plain' },
          { text: '콘서트 티켓이', role: 'subject' },
          { text: '비쌀 거예요', role: 'verb' },
        ],
        zh: '演唱会票大概会很贵。', zhEn: 'Concert tickets will probably be expensive.',
        swapWords: ['비쌀 거예요', '없을 거예요', '구하기 어려울 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아마', role: 'plain' },
          { text: '이 문법은', role: 'subject' },
          { text: '어려울 거예요', role: 'verb' },
        ],
        zh: '这个语法大概会难。', zhEn: 'This grammar will probably be hard.',
        swapWords: ['어려울 거예요', '재미있을 거예요', '도움이 될 거예요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', contextEn: 'Study plan', ko: '오늘 단어를 복습하려고 해요.', zh: '今天打算复习单词。', zhEn: 'I plan to review vocabulary today.' },
      { icon: '🎵', context: 'KPOP 跟唱', contextEn: 'KPOP Sing-Along', ko: '이 노래를 따라 하려고 해요.', zh: '打算跟唱这首歌。', zhEn: 'I plan to sing along to this song.' },
      { icon: '🌤️', context: '天气预测', contextEn: 'Weather forecast', ko: '아마 내일 날씨가 좋을 거예요.', zh: '明天天气大概会好。', zhEn: 'The weather will probably be nice tomorrow.' },
      { icon: '🌧️', context: '下雨预报', contextEn: 'Rain forecast', ko: '아마 내일 비가 올 거예요.', zh: '明天大概会下雨。', zhEn: 'It will probably rain tomorrow.' },
      { icon: '📖', context: '课程计划', contextEn: 'Lesson Plan', ko: '시험이 있어서 복습하려고 해요.', zh: '因为有考试，所以打算复习。', zhEn: 'I plan to review because there\'s an exam.' },
      { icon: '😅', context: '难度预判', contextEn: 'Difficulty Prediction', ko: '아마 이 문법은 어려울 거예요.', zh: '这个语法大概会难。', zhEn: 'This grammar will probably be hard.' },
    ],
    mistakes: [
      { wrong: '먹려고 해요.', correct: '먹으려고 해요.', note: '먹다 有收音，用 -으려고 해요', noteEn: '먹다 has a final consonant, so use -으려고 해요' },
      { wrong: '비가 오려고 해요. (天气打算下雨)', wrongEn: '비가 오려고 해요. (The weather plans to rain)', correct: '아마 비가 올 거예요.', note: '无意志主语不能用 -려고 해요，天气预测用 -을/ㄹ 거예요', noteEn: 'Inanimate subjects can\'t use -려고 해요; for weather predictions, use -을/ㄹ 거예요' },
      { wrong: '아마 꼭 갈 거예요', correct: '아마 갈 거예요', note: '아마（可能）和 꼭（一定）语义矛盾不能同用。아마 降低确定性，꼭 强调确定性。', noteEn: '아마 (maybe) and 꼭 (definitely) contradict each other and can\'t be used together. 아마 lowers certainty, while 꼭 emphasizes it.' },
      { wrong: '들려고 해요. (듣다+려고)', correct: '들으려고 해요.', note: 'ㄷ 不规则：듣다→들으려고 해요', noteEn: 'ㄷ irregular: 듣다→들으려고 해요' },
      { wrong: '어제 갔으려고 했어요. (想说昨天打算去)', wrongEn: '어제 갔으려고 했어요. (Meaning: I meant to go yesterday)', correct: '어제 가려고 했어요.', note: '过去时加在 하다 上（하려고 했어요），不是加在前面的动词上；前面的动词永远保持 -(으)려고 原形', noteEn: 'The past tense goes on 하다 (하려고 했어요), not on the preceding verb; the preceding verb always stays in the -(으)려고 form.' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-(으)려고 해요', '-을/ㄹ 거예요'],
      rows: [
        ['가다 去', '가려고 해요 打算去', '갈 거예요 要去/大概去'],
        ['먹다 吃', '먹으려고 해요 打算吃', '먹을 거예요 要吃/大概吃'],
        ['공부하다 学习', '공부하려고 해요 打算学习', '공부할 거예요 要学习'],
        ['듣다 听', '들으려고 해요 打算听', '들을 거예요 要听'],
        ['어렵다 难', '—', '어려울 거예요 大概很难'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-(으)려고 · 아마 -을/ㄹ 거예요 완성！</div>
  <div class='ov-sub'>计划和推测，让表达更有前瞻性</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)려고 해요</span> 打算：복습하려고 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>아마 -을/ㄹ 거예요</span> 推测：아마 어려울 거예요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>有收音</span> 먹으려고 / 먹을 거예요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 无意志主语不用 -려고 해요</div>
</div>`,
    linkedGrammarIds: ['g25', 'g48'],
  },
  {
    id: 'card-p5-l04',
    partNumber: 5,
    lessonNumber: 4,
    title: '이/가 아니다, -는 게 아니라',
    whatItDoes: '说"不是……"和"不是A而是B"', whatItDoesEn: 'Say "it\'s not..." and "it\'s not A but B"',
    whatItDoesBody: '이/가 아니에요 表示"不是"；\n이/가 아니라 B예요 表示"不是A而是B"；\n-는 게 아니라 用于纠正动作。\n纠正误解、澄清事实、对比两种说法这节课的三个结构都是用来"说清楚真相"的。\n中文"不是A而是B"靠词序和独立词实现，韩语用 이/가 아니라 + B예요 的专用结构，助词选择还要看有无收音。', whatItDoesBodyEn: '이/가 아니에요 means "is not"; \\n이/가 아니라 B예요 means "it\'s not A but B"; \\n-는 게 아니라 is used to correct an action. \\nCorrecting misunderstandings, clarifying facts, and contrasting two statements—this lesson\'s three structures are all for "setting the record straight." \\nIn Chinese, "not A but B" relies on word order and separate words, but Korean uses the dedicated structure 이/가 아니라 + B예요, and the particle choice depends on whether there\'s a final consonant.',
    structureNote: '三块内容：①이/가 아니에요（单纯否定"不是"）；\n②이/가 아니라 B예요（对比否定"不是A而是B"）；\n③-는 게 아니라（动作层面的"不是做A"）。\n아니라 后面必须跟正确答案，不能单独用。', structureNoteEn: 'Three parts: ① 이/가 아니에요 (simple negation "is not"); \\n② 이/가 아니라 B예요 (contrastive negation "not A but B"); \\n③ -는 게 아니라 (action-level "not doing A"). \\n아니라 must be followed by the correct answer; it can\'t be used alone.',
    rulesNote: '이/가 的收音规则和主格助词相同：\n有收音→이 아니에요，无收音→가 아니에요。\n-는 게 아니라 中的 게 是 것이 的口语缩略。\n注意：\n아니에요 可以单独结束句子，아니라 必须接 B예요 给出正确答案。', rulesNoteEn: 'The final consonant rule for 이/가 is the same as the subject particle: \\nwith a final consonant → 이 아니에요, without → 가 아니에요. \\nIn -는 게 아니라, 게 is the colloquial contraction of 것이. \\nNote: \\n아니에요 can end a sentence alone, but 아니라 must be followed by B예요 to give the correct answer.',
    scenarioNote: '"这不是咖啡而是茶""不是背单词而是要理解""我不是老师，我是学生"纠正误解、澄清身份、说明真相，这类场景在日常对话里非常常见。\n学会这节课，你能更自信地说清楚"不是这样"。', scenarioNoteEn: '"This isn\'t coffee but tea," "It\'s not memorizing words but understanding," "I\'m not a teacher, I\'m a student." Correcting misunderstandings, clarifying identity, and stating the truth—these situations are very common in daily conversation. \\nLearn this lesson and you can confidently say "that\'s not how it is."',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">이/가 아니다 · -는 게 아니라</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说"不是……"和"不是A而是B"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 학생이 아니에요.</span> — 我不是学生。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이건 커피가 아니라 차예요.</span> — 这不是咖啡，而是茶。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">외우는 게 아니라 이해해야 해요.</span> — 不是背，而是要理解。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个否定结构</div>
  <div style="margin-bottom:6px">① <b>이/가 아니에요</b> — 单纯否定"不是"（有收音→이，无收音→가）</div>
  <div style="margin-bottom:6px">② <b>이/가 아니라 B예요</b> — 纠正"不是A而是B"（后必须给出正确答案）</div>
  <div>③ <b>-는 게 아니라</b> — 动作层面纠正（동사 词干 + -는 게 아니라）</div>
</div>
<div class="reminder-box">아니라 和 아니에요 不同：아니에요 单独结束句子；아니라 后面必须跟 B예요 给出正确答案。</div>`,
    compareHtml: `<div class="card-title">이/가 아니에요（单纯否定）vs 이/가 아니라 B예요（对比纠正）</div>
<div class="card-body">两个结构都是否定，但目的不同：이/가 아니에요 只说"不是"，可以单独成句；이/가 아니라 B예요 在否定的同时给出正确答案，语气更完整，适合纠正误解。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">이/가 아니에요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">单纯否定：不是（可独立成句）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 학생이 아니에요.</span><span style="font-size:16px;color:#5a4640">我不是学生。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이건 커피가 아니에요.</span><span style="font-size:16px;color:#5a4640">这个不是咖啡。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">이/가 아니라 B예요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">对比纠正：不是A而是B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피가 아니라 차예요.</span><span style="font-size:16px;color:#5a4640">不是咖啡而是茶。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">선생님이 아니라 학생이에요.</span><span style="font-size:16px;color:#5a4640">不是老师而是学生。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则（两者相同）</div>
  <div style="font-size:16px;color:#241917">有收音名词 → <b>이 아니에요 / 이 아니라</b>：학생이 아니에요 / 학생이 아니라</div>
  <div style="font-size:16px;color:#241917">无收音名词 → <b>가 아니에요 / 가 아니라</b>：가수가 아니에요 / 가수가 아니라</div>
</div>
<div class="reminder-box">커피가 아니에요 차예요 ✗ → 커피가 아니라 차예요 ✓ — 对比纠正不是两个独立句，要用 아니라 连接。아니라 必须后接 B예요/이에요，不能单独结尾。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的否定判断表达', titleEn: 'Choose the correct negative judgment expression',
      body: '根据句意选择 이/가 아니다 或 -는 게 아니라。', bodyEn: 'Choose 이/가 아니다 or -는 게 아니라 based on the meaning.',
      questions: [
        {
          pre: '아니요, 이거는 제',
          post: '.',
          options: ["가방인 게 아니라", "가방이 아니에요", "가방는 게 아니라"],
          answer: 1,
          explanation: '"不，这不是我的包"用 名词 + 이/가 아니에요：가방이 아니에요。아니라 是"不是A而是B"的连接形，不能单独结句；가방는 的助词也错（有收音应 은/인）。', explanationEn: 'For "No, this isn\'t my bag," use noun + 이/가 아니에요: 가방이 아니에요. 아니라 is a connective meaning "not A but B" and can\'t end a sentence; the particle in 가방는 is also wrong (with a final consonant, it should be 은/인).',
        },
        {
          pre: '그건 사과',
          post: '배예요.',
          options: ['이 아니라', '가 아니라', '는 게 아니라'],
          answer: 1,
          explanation: '사과 无收音 → 가 아니라："那不是苹果，是梨。"', explanationEn: '사과 has no final consonant → 가 아니라: "That\'s not an apple, it\'s a pear."',
        },
        {
          pre: '돈이 없어서',
          post: '못 산 거예요.',
          options: ['안 산 게 아니라', '안 산 게 아니면', '못 산 게 아니라'],
          answer: 0,
          explanation: '"不是不买（而是买不起）"用 안 산 게 아니라。아니면 是"如果不是"（假设），接续不对；못 산 게 아니라（不是买不到）语义与"没钱买不了"矛盾。', explanationEn: 'For "It\'s not that I didn\'t buy it (but that I can\'t afford it)," use 안 산 게 아니라. 아니면 means "if not" (hypothetical) and doesn\'t connect here; 못 산 게 아니라 (not that I couldn\'t buy it) contradicts the meaning of "can\'t buy due to no money."',
        },
        {
          pre: '이건 한국',
          post: '일본 노래예요.',
          options: ['노래가 아니라', '노래이 아니라', '노래는 게 아니라'],
          answer: 0,
          explanation: '노래가 아니라 = 不是韩国歌。名词+이/가 아니다。', explanationEn: '노래가 아니라 = It\'s not a Korean song. Noun + 이/가 아니다.',
        },
      ],
    },

    compareLabel: '단순 부정 vs 대조 부정',
    structures: [
      {
        ko: '명사（有받침） + 이 아니에요',
        zh: '有收音名词 + 이 아니에요', zhEn: 'Noun with final consonant + 이 아니에요',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이 아니에요', role: 'plain' },
        ],
      },
      {
        ko: '명사（无받침） + 가 아니에요',
        zh: '无收音名词 + 가 아니에요', zhEn: 'Noun without final consonant + 가 아니에요',
        tokens: [
          { text: '명사(받침X)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '가 아니에요', role: 'plain' },
        ],
      },
      {
        ko: '이건 커피가 아니라 차예요.',
        zh: '这不是咖啡，而是茶。', zhEn: 'This isn\'t coffee, it\'s tea.',
        tokens: [
          { text: '이건', role: 'subject' },
          { text: '커피가 아니라', role: 'plain' },
          { text: '차예요', role: 'verb' },
        ],
      },
      {
        ko: '외우는 게 아니라 이해해야 해요.',
        zh: '不是背，而是要理解。', zhEn: 'It\'s not about memorizing, but understanding.',
        tokens: [
          { text: '외우는 게 아니라', role: 'verb' },
          { text: '이해해야 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → 이 아니에요/이 아니라', textEn: 'With final consonant → 이 아니에요/이 아니라', examples: '학생→학생이 아니에요 / 학생이 아니라' },
      { type: 'rule', text: '无收音 → 가 아니에요/가 아니라', textEn: 'No final consonant → 가 아니에요/가 아니라', examples: '가수→가수가 아니에요 / 커피→커피가 아니라' },
      { type: 'rule', text: '-는 게 아니라：动词词干 + -는 게 아니라', textEn: '-는 게 아니라: verb stem + -는 게 아니라', examples: '외우다→외우는 게 아니라 / 보다→보는 게 아니라 / 듣다→듣는 게 아니라' },
      { type: 'usage', text: 'A가 아니라 B예요 结构：B 必须给出正确答案', textEn: 'A가 아니라 B예요 structure: B must be the correct answer', examples: '커피가 아니라 차예요 / 번역이 아니라 발음 연습이에요' },
      { type: 'compare', text: '이/가 아니라 vs 이/가 아니에요：아니에요 单纯否定；아니라 必须有对比答案', textEn: '이/가 아니라 vs 이/가 아니에요: 아니에요 is simple negation; 아니라 requires a contrasting answer' },
      { type: 'example', text: '교재 예문：이건 커피가 아니라 차예요 / 외우는 게 아니라 이해해야 해요 / 이건 번역이 아니라 발음 연습이에요' },
      { type: 'example', text: '추가 예문：이 음료수는 바나나 우유가 아니에요（这不是香蕉牛奶）/ 여기가 명동이 아니에요', textEn: 'Additional examples: 이 음료수는 바나나 우유가 아니에요 (This isn\'t banana milk) / 여기가 명동이 아니에요' },
      { type: 'note', text: '아니다 前的名词要带 이/가（这里是补格助词，不是主语）。中文"不是学生"里"学生"像宾语，中文母语者很容易误加 을/를', textEn: 'The noun before 아니다 takes 이/가 (complement particle, not subject). In Chinese, "student" in "not a student" feels like an object, so Chinese speakers often mistakenly add 을/를', examples: '저는 학생이 아니에요（○）/ 저는 학생을 아니에요（✗）' },
      { type: 'note', text: '아니다 的过去式是 아니었어요。说"（当时）不是……"要变词尾，中文只靠"不是"没有对应变化，别拿现在的 아니에요 说过去', textEn: 'The past tense of 아니다 is 아니었어요. To say "(then) wasn\'t..." you must change the ending; Chinese just uses "not" with no such change, so don\'t use present 아니에요 for the past', examples: '작년에는 학생이 아니었어요（去年还不是学生）/ 그건 제 잘못이 아니었어요（那不是我的错）', examplesEn: '작년에는 학생이 아니었어요 (I wasn\'t a student last year) / 그건 제 잘못이 아니었어요 (That wasn\'t my fault)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이', role: 'plain' },
          { text: '아니에요', role: 'verb' },
        ],
        zh: '我不是学生。', zhEn: 'I\'m not a student.',
        swapWords: ['학생이 아니에요', '선생님이 아니에요', '가수가 아니에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이건', role: 'subject' },
          { text: '커피가 아니라', role: 'plain' },
          { text: '차예요', role: 'verb' },
        ],
        zh: '这不是咖啡，而是茶。', zhEn: 'This isn\'t coffee, it\'s tea.',
        swapWords: ['커피가 아니라 차예요', '번역이 아니라 발음 연습이에요', '숙제가 아니라 복습이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '외우는 게', role: 'verb' },
          { text: '아니라', role: 'plain' },
          { text: '이해해야 해요', role: 'verb' },
        ],
        zh: '不是背，而是要理解。', zhEn: 'It\'s not about memorizing, but understanding.',
        swapWords: ['외우는 게 아니라', '읽는 게 아니라', '듣는 게 아니라'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이건', role: 'subject' },
          { text: '번역이 아니라', role: 'plain' },
          { text: '발음 연습이에요', role: 'verb' },
        ],
        zh: '这不是翻译，而是发音练习。', zhEn: 'This isn\'t translation, but pronunciation practice.',
        swapRole: 'subject',
          swapWords: ['번역이 아니라', '숙제가 아니라', '시험이 아니라'],
      },
    ],
    scenarios: [
      { icon: '👤', context: '身份说明', contextEn: 'Identity explanation', ko: '저는 선생님이 아니에요.', zh: '我不是老师。', zhEn: 'I\'m not a teacher.' },
      { icon: '☕', context: '物品纠正', contextEn: 'Correcting items', ko: '이건 커피가 아니라 차예요.', zh: '这不是咖啡，而是茶。', zhEn: 'This isn\'t coffee, it\'s tea.' },
      { icon: '📚', context: '学习方法', contextEn: 'Study method', ko: '외우는 게 아니라 이해해야 해요.', zh: '不是背，而是要理解。', zhEn: 'It\'s not about memorizing, but understanding.' },
      { icon: '🎵', context: 'KPOP 练习', contextEn: 'KPOP practice', ko: '이건 번역이 아니라 발음 연습이에요.', zh: '这不是翻译，而是发音练习。', zhEn: 'This isn\'t translation, but pronunciation practice.' },
      { icon: '💬', context: '纠正误解', contextEn: 'Correcting misunderstandings', ko: '그게 아니라 이렇게 하는 거예요.', zh: '不是那样，而是这样做。', zhEn: 'It\'s not that way, but this way.' },
      { icon: '🏫', context: '课程说明', contextEn: 'Course description', ko: '이건 시험이 아니라 연습이에요.', zh: '这不是考试，而是练习。', zhEn: 'This isn\'t a test, but practice.' },
    ],
    mistakes: [
      { wrong: '학생가 아니에요.', correct: '학생이 아니에요.', note: '학생 有收音，用 이 아니에요', noteEn: '학생 has a final consonant, so use 이 아니에요' },
      { wrong: '커피가 아니에요 차예요. (想说不是咖啡而是茶)', wrongEn: '커피가 아니에요 차예요. (meaning to say it\'s not coffee but tea)', correct: '커피가 아니라 차예요.', note: '对比纠正用 아니라，不是两个独立句', noteEn: 'For contrast correction use 아니라, not two separate sentences' },
      { wrong: '보다는 게 아니라', correct: '보는 게 아니라', note: '-는 게 아니라 接词干：보다→보는 게 아니라', noteEn: '-는 게 아니라 attaches to the stem: 보다→보는 게 아니라' },
      { wrong: '커피이 아니에요.', correct: '커피가 아니에요.', note: '커피 无收音，用 가 아니에요', noteEn: '커피 has no final consonant, so use 가 아니에요' },
      { wrong: '저는 가수를 아니에요.', correct: '저는 가수가 아니에요.', note: '아니다 前的名词用 이/가（补格助词），不能因为"是宾语的感觉"就加 을/를', noteEn: 'The noun before 아니다 takes 이/가 (complement particle); don\'t add 을/를 just because it feels like an object' },
      { wrong: '작년에는 학생이 아니에요. (想说去年不是学生)', wrongEn: '작년에는 학생이 아니에요. (meaning to say I wasn\'t a student last year)', correct: '작년에는 학생이 아니었어요.', note: '说过去"（当时）不是……"要用过去式 아니었어요，不能用现在的 아니에요', noteEn: 'To say "(then) wasn\'t..." use the past tense 아니었어요, not present 아니에요' },
    ],
    quickTable: {
      title: '부정 구조표',
      headers: ['用途', '结构', '例子'],
      rows: [
        ['单纯否定', '명사+이/가 아니에요', '학생이 아니에요'],
        ['对比纠正（名词）', '명사+이/가 아니라 B예요', '커피가 아니라 차예요'],
        ['对比纠正（动作）', '동사+-는 게 아니라', '외우는 게 아니라 이해해요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>아니에요 · 아니라 완성！</div>
  <div class='ov-sub'>否定和纠正，让表达更精确</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>이/가 아니에요</span> 不是：학생이 아니에요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>이/가 아니라</span> 不是A而是B：커피가 아니라 차예요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>-는 게 아니라</span> 动作纠正：외우는 게 아니라</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 有收音→이 / 无收音→가</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l05',
    partNumber: 5,
    lessonNumber: 5,
    title: '动词、形容词的冠词形', titleEn: 'Adnominal forms of verbs and adjectives',
    whatItDoes: '用动作和状态来修饰名词', whatItDoesEn: 'Modify nouns with actions and states',
    whatItDoesBody: '动词/形容词加冠词形后置于名词前：\n现在动作用 -는，形容词用 -은/ㄴ，未来/未完成用 -을/ㄹ。\n中文里形容词本来就能直接修饰名词（"难的语法""学习的人"），韩语需要通过变形加上特定词尾才能放到名词前。', whatItDoesBodyEn: 'Verbs/adjectives take an adnominal form and go before the noun: \\npresent action uses -는, adjectives use -은/ㄴ, future/incomplete uses -을/ㄹ. \\nIn Chinese, adjectives can directly modify nouns ("difficult grammar," "a person studying"), but Korean requires a specific ending through conjugation to place them before a noun.',
    structureNote: '三套冠词形：①动词现在→-는（공부하는 사람）；\n②形容词→-은/ㄴ（按收音，어려운 문법）；\n③动词未来/未完成→-을/ㄹ（갈 곳）。\n变形后直接放名词前，结构和中文"……的+名词"一样。', structureNoteEn: 'Three sets of adnominal forms: ① present verb → -는 (공부하는 사람); \\n② adjective → -은/ㄴ (by final consonant, 어려운 문법); \\n③ future/incomplete verb → -을/ㄹ (갈 곳). \\nAfter conjugating, place directly before the noun—the structure is the same as Chinese "...的 + noun."',
    rulesNote: '动词 -는 不看收音，统一接 는。\n形容词 -은/ㄴ 看收音：\n有收音→은，无收音→ㄴ。\n-을/ㄹ 看收音：\n有收音→을，无收音→ㄹ。\n注意 있다/없다 用 -는（있는/없는），和动词一样。\nㅂ 不规则触发：\n어렵다→어려운。', rulesNoteEn: 'For verbs, -는 doesn\'t depend on the final consonant—always attach 는. \\nFor adjectives, -은/ㄴ depends on the final consonant: \\nwith a final consonant → 은, without → ㄴ. \\nFor -을/ㄹ: \\nwith a final consonant → 을, without → ㄹ. \\nNote: 있다/없다 use -는 (있는/없는), like verbs. \\nㅂ irregular: \\n어렵다→어려운.',
    scenarioNote: '"现在听的歌""学习韩语的人""明天要去的地方"冠词形是韩语里使用频率极高的结构，几乎每个较复杂的句子都会用到。\n掌握这节课，你能描述事物、修饰名词，表达大幅丰富。', scenarioNoteEn: '"The song I\'m listening to now," "a person studying Korean," "the place I\'ll go tomorrow." Adnominal forms are extremely frequent in Korean—almost every complex sentence uses them. \\nMaster this lesson and you can describe things, modify nouns, and greatly enrich your expressions.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">动词/形容词的冠词形</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">用动作和状态来修饰名词。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 공부하는 사람이에요.</span> — 是学习韩语的人。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">어려운 문법은 천천히 공부해요.</span> — 难的语法慢慢学。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">내일 갈 곳이 있어요.</span> — 明天有要去的地方。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三套冠词形</div>
  <div style="margin-bottom:6px">① 动词现在 → <b>-는</b>：공부하다→공부하는 사람</div>
  <div style="margin-bottom:6px">② 形容词 → <b>-은/ㄴ</b>（有收音→은，无收音→ㄴ）：어렵다→어려운 문법</div>
  <div>③ 动词未来 → <b>-을/ㄹ</b>（有收音→을，无收音→ㄹ）：가다→갈 곳</div>
</div>
<div class="reminder-box">있다/없다 和动词一样用 -는：있는 / 없는。ㅂ 不规则：어렵다→어려운。形容词不用 -는（좋는 노래 ✗）。</div>`,
    compareHtml: `<div class="card-title">动词 -는（现在）vs 形容词 -은/ㄴ vs 动词未来 -을/ㄹ</div>
<div class="card-body">动词和形容词的冠词形不同：动词现在时用 -는，形容词按有无收音用 -은/-ㄴ，动词未来/未完成用 -을/-ㄹ。三套规则各自独立，混用会直接暴露语法错误。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0">
  <div class="tok-row">
    <div class="tok t-v">动词现在 -는</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">不看收音，统一接 는</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하는 사람</span><span style="font-size:16px;color:#5a4640">学习的人</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹는 음식</span><span style="font-size:16px;color:#5a4640">吃的食物</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">形容词 -은/ㄴ</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音→-은，无收音→-ㄴ</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어려운 문법</span><span style="font-size:16px;color:#5a4640">难的语法</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">좋은 노래</span><span style="font-size:16px;color:#5a4640">好听的歌</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">动词未来 -을/ㄹ</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音→-을，无收音→-ㄹ</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">갈 곳</span><span style="font-size:16px;color:#5a4640">要去的地方</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹을 것</span><span style="font-size:16px;color:#5a4640">要吃的东西</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">있다/없다 特殊规则</div>
  <div style="font-size:16px;color:#241917">있다/없다 虽然是形容词，但冠词形用动词规则 <b>-는</b>：있는 사람 / 없는 것</div>
  <div style="font-size:16px;color:#89756e;margin-top:4px">ㅂ 不规则：어렵다 → 어려운（-다 前 ㅂ→우，再接 -ㄴ）</div>
</div>
<div class="reminder-box">좋는 노래 ✗ → 좋은 노래 ✓ — 形容词有收音用 -은，不用 -는。공부한 사람 ✗（习惯）→ 공부하는 사람 ✓ — 习惯动作用现在冠词形 -는。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的冠词形', titleEn: 'Choose the correct adnominal form',
      body: '根据句意选择动词/形容词的冠词形（-는/-은/-ㄴ/-을）。', bodyEn: 'Choose the adnominal form of the verb/adjective (-는/-은/-ㄴ/-을) based on the sentence meaning.',
      questions: [
        {
          pre: '제가 자주',
          post: '노래예요.',
          options: ["듣는", "들을", "들은"],
          answer: 0,
          explanation: '动词现在时冠词形：듣다 + -는 = 듣는（常听的歌）。', explanationEn: 'Present tense adnominal form of verbs: 듣다 + -는 = 듣는 (a song I often listen to).',
        },
        {
          pre: '어제',
          post: '영화 정말 재미있었어요.',
          options: ["보는", "본", "볼"],
          answer: 1,
          explanation: '动词过去时冠词形：无收音词干直接加 -ㄴ，보다→본（昨天看的电影）。若词干有收音则加 -은（먹다→먹은）。', explanationEn: 'Past adnominal form for verbs: add -ㄴ directly to stems without a final consonant, 보다→본 (the movie watched yesterday). If the stem has a final consonant, add -은 (먹다→먹은).',
        },
        {
          pre: '이건 정말',
          post: '책이에요.',
          options: ["좋은", "좋을", "좋는"],
          answer: 0,
          explanation: '形容词冠词形：좋다→좋은（很好的书）。形容词有收音+은。', explanationEn: 'Adnominal form for adjectives: 좋다→좋은 (a good book). Adjectives with a final consonant take +은.',
        },
        {
          pre: '내일',
          post: '약속이 있어요.',
          options: ["만나는", "만난", "만날"],
          answer: 2,
          explanation: '动词将来冠词形：만나다→만날（明天要见的约会）。无收音直接加 -ㄹ。', explanationEn: 'Future adnominal form for verbs: 만나다→만날 (the appointment to meet tomorrow). Add -ㄹ directly if there\'s no final consonant.',
        },
      ],
    },

    compareLabel: '동사 -는 vs 형용사 -은/ㄴ',
    structures: [
      {
        ko: '동사 + -는 + 명사',
        zh: '动词 + -는 + 名词 = 做……的名词', zhEn: 'Verb + -는 + noun = the noun that does...',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '형용사（有받침） + -은 + 명사',
        zh: '有收音形容词 + -은 + 名词', zhEn: 'Adjective with final consonant + -은 + noun',
        tokens: [
          { text: '형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-은', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '동사 + -을/ㄹ + 명사',
        zh: '动词 + -을/ㄹ + 名词 = 要做……的名词', zhEn: 'Verb + -을/ㄹ + noun = the noun to do...',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을/ㄹ', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '지금 듣는 노래가 좋아요.',
        zh: '现在听的歌很好听。', zhEn: 'The song I\'m listening to now is really good.',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '듣는', role: 'verb' },
          { text: '노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在冠词形 -는：直接接词干', textEn: 'Present adnominal form for verbs -는: attach directly to the stem', examples: '가다→가는 / 먹다→먹는 / 듣다→듣는 / 공부하다→공부하는' },
      { type: 'rule', text: '形容词有收音 -은', textEn: 'Adjective with final consonant -은', examples: '좋다→좋은 / 작다→작은 / 많다→많은' },
      { type: 'rule', text: '形容词无收音 -ㄴ', textEn: 'Adjective without final consonant -ㄴ', examples: '예쁘다→예쁜 / 바쁘다→바쁜 / 크다→큰' },
      { type: 'note', text: 'ㅂ 不规则', textEn: 'ㅂ irregular', examples: '어렵다→어려운 / 가볍다→가벼운' },
      { type: 'note', text: 'ㄹ 脱落：词干末尾是 ㄹ 时，接 -는/-ㄴ 会先掉 ㄹ 再接（不是加 -을）', textEn: 'ㄹ irregular: when the stem ends in ㄹ, drop the ㄹ before adding -는/-ㄴ (not -을)', examples: '살다→사는 사람 / 만들다→만드는 것 / 알다→아는 사람 / 형容词 길다→긴 / 멀다→먼 곳', examplesEn: '살다→사는 사람 / 만들다→만드는 것 / 알다→아는 사람 / adjective 길다→긴 / 멀다→먼 곳' },
      { type: 'note', text: '재미있다·맛있다·멋있다 结尾是 있다，跟 있다/없다 一样用 -는，不用 -은', textEn: '재미있다·맛있다·멋있다 end in 있다, so they use -는 like 있다/없다, not -은', examples: '재미있는 영화 / 맛있는 음식 / 멋있는 사람（재미있은 ✗）' },
      { type: 'rule', text: '动词未来冠词形 -을/ㄹ：有收音→-을；无收音→-ㄹ', textEn: 'Future adnominal form for verbs -을/ㄹ: with final consonant→-을; without→-ㄹ', examples: '먹다→먹을 / 가다→갈 / 보다→볼 / 듣다（ㄷ不规则）→들을', examplesEn: '먹다→먹을 / 가다→갈 / 보다→볼 / 듣다 (ㄷ irregular)→들을' },
      { type: 'note', text: '动词过去冠词形 -은/ㄴ（已完成）：和形容词 -은/ㄴ 同形，靠词性区分', textEn: 'Past adnominal form for verbs -은/ㄴ (completed): same form as adjective -은/ㄴ, distinguished by part of speech', examples: '먹다→먹은 음식（吃过的食物）；가다→간 곳（去过的地方）', examplesEn: '먹다→먹은 음식 (food that was eaten); 가다→간 곳 (a place that was gone to)' },
      { type: 'example', text: '교재 예문：한국어를 공부하는 사람 / 좋은 노래를 들어요 / 내일 갈 곳이 있어요 / 오늘 배울 문법' },
      { type: 'compare', text: '动词过去 vs 形容词现在：먹은（动词过去）vs 작은（形容词现在）— 形态相同，靠词性区分意思', textEn: 'Verb past vs adjective present: 먹은 (verb past) vs 작은 (adjective present) — same form, meaning distinguished by part of speech' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '공부하는', role: 'verb' },
          { text: '사람이에요', role: 'verb' },
        ],
        zh: '是学习韩语的人。', zhEn: 'They are people learning Korean.',
        swapWords: ['공부하는 사람', '좋아하는 사람', '가르치는 사람'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '듣는', role: 'verb' },
          { text: '노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '现在听的歌很好听。', zhEn: 'The song I\'m listening to now is really good.',
        swapRole: 'subject',
          swapWords: ['듣는 노래', '배우는 노래', '외우는 노래'],
      },
      {
        wordBlocks: [
          { text: '어려운', role: 'verb' },
          { text: '문법은', role: 'subject' },
          { text: '천천히 공부해요', role: 'verb' },
        ],
        zh: '难的语法慢慢学。', zhEn: 'Study difficult grammar slowly.',
        swapRole: 'subject',
          swapWords: ['어려운 문법', '재미있는 문법', '중요한 문법'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '갈 곳이', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '明天有要去的地方。', zhEn: 'There\'s a place to go tomorrow.',
        swapWords: ['갈 곳', '볼 곳', '먹을 곳'],
        swapRole: 'place',
      },
    ],
    scenarios: [
      { icon: '👤', context: '描述人物', contextEn: 'Describing people', ko: '한국어를 공부하는 사람이에요.', zh: '是学习韩语的人。', zhEn: 'They are people learning Korean.' },
      { icon: '🎵', context: 'KPOP 歌曲', contextEn: 'KPOP songs', ko: '지금 듣는 노래가 정말 좋아요.', zh: '现在听的歌真的很好听。', zhEn: 'The song I\'m listening to now is really, really good.' },
      { icon: '📚', context: '内容拆解', contextEn: 'Content Breakdown', ko: '오늘 배울 문법이 어렵지 않아요.', zh: '今天要学的语法不难。', zhEn: 'The grammar we\'re learning today isn\'t hard.' },
      { icon: '🗺️', context: '旅行计划', contextEn: 'Travel plans', ko: '내일 갈 곳을 찾고 있어요.', zh: '正在找明天要去的地方。', zhEn: 'I\'m looking for a place to go tomorrow.' },
      { icon: '✏️', context: '学习建议', contextEn: 'Study advice', ko: '어려운 문법은 천천히 공부하세요.', zh: '难的语法请慢慢学。', zhEn: 'Please study difficult grammar slowly.' },
      { icon: '🍜', context: '饮食选择', contextEn: 'Food Choices', ko: '먹을 음식을 골라요.', zh: '选要吃的食物。', zhEn: 'Choose the food you want to eat.' },
    ],
    mistakes: [
      { wrong: '좋는 노래 (형용사+는)', correct: '좋은 노래', note: '形容词不用 -는，有收音用 -은：좋다→좋은', noteEn: 'Adjectives don\'t use -는; with a final consonant, use -은: 좋다→좋은' },
      { wrong: '공부한 사람 (想说学习的人)', wrongEn: '공부한 사람 (meaning \'a person who studied\')', correct: '공부하는 사람', note: '-은/ㄴ 接动词表示已完成（过去），现在/习惯用 -는', noteEn: '-은/ㄴ attaches to verbs to indicate completion (past); use -는 for present/habitual actions' },
      { wrong: '내일 가는 곳 (强调将要去)', wrongEn: '내일 가는 곳 (emphasizing the place you will go)', correct: '내일 갈 곳', note: '未来/未完成用 -을/ㄹ：가다→갈 곳', noteEn: 'For future/incomplete actions, use -을/ㄹ: 가다→갈 곳' },
      { wrong: '어렵는 문법', correct: '어려운 문법', note: 'ㅂ 不规则：어렵다→어려운（ㅂ→우）', noteEn: 'ㅂ irregular: 어렵다→어려운 (ㅂ→우)' },
      { wrong: '살는 사람', correct: '사는 사람', note: 'ㄹ 脱落：词干末尾 ㄹ 接 -는 要先掉 ㄹ，만들다→만드는、알다→아는 同理', noteEn: 'ㄹ deletion: when the stem ends in ㄹ and is followed by -는, drop the ㄹ first; same for 만들다→만드는, 알다→아는' },
    ],
    quickTable: {
      title: '冠词形变形表', titleEn: 'Adnominal form conjugation table',
      headers: ['类型', '接续', '例子'],
      rows: [
        ['动词（现在）', '词干 + -는', '공부하다→공부하는 사람'],
        ['形容词（有收音）', '词干 + -은', '좋다→좋은 노래'],
        ['形容词（无收音）', '词干 + -ㄴ', '예쁘다→예쁜 사진'],
        ['动词（未来，有收音）', '词干 + -을', '먹다→먹을 음식'],
        ['动词（未来，无收音）', '词干 + -ㄹ', '가다→갈 곳'],
        ['ㅂ 不规则', 'ㅂ→우+ㄴ', '어렵다→어려운 문법'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>冠词形完成！</div>
  <div class='ov-sub'>动词形容词都能修饰名词了</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>동사 -는</span> 공부하는 사람</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>형용사 -은/ㄴ</span> 좋은 노래 / 예쁜 사진</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>将来 -을/ㄹ</span> 갈 곳 / 먹을 음식</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 형용사는 -는 쓰지 않음</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l06',
    partNumber: 5,
    lessonNumber: 6,
    title: '-아/어/여 주다, -지요?',
    whatItDoes: '请别人帮忙，或用"对吧"确认', whatItDoesEn: 'Ask for help, or confirm with "right?"',
    whatItDoesBody: '-아/어/여 주세요 表示"请帮我……"；\n-지요? 表示确认语气"……吧？对吧？"，口语常缩成 -죠?。\n-아/어/여 주세요 是韩国人在餐厅、课堂、服务场合最常说的请求方式，也是最礼貌的说法。\n中文"请帮我做"靠独立词"帮/请"，韩语把"帮"嵌入词尾 주세요，不能单独拆出来用。', whatItDoesBodyEn: '-아/어/여 주세요 means "please do... for me"; -지요? is a confirming tone meaning "...right? isn\'t it?", often shortened to -죠? in speech. -아/어/여 주세요 is the most common and polite way Koreans make requests in restaurants, classrooms, and service settings. In Chinese, "please help me do" uses separate words like "help/please," but Korean embeds "help" into the ending 주세요, which cannot be used alone.',
    structureNote: '两块内容：①-아/어/여 주세요（请帮我做）变形和 -아요/어요 一样，加 주세요；\n②-지요?/-죠?（确认语气）直接接词干，不看收音，用于寻求对方同意或确认。', structureNoteEn: 'Two parts: ① -아/어/여 주세요 (please do for me) conjugates like -아요/어요, then add 주세요; ② -지요?/-죠? (confirming tone) attaches directly to the stem regardless of the final consonant, used to seek agreement or confirmation.',
    rulesNote: '-아/어/여 주세요 变形：\n词干末元音 ㅏ/ㅗ→아 주세요，其他→어 주세요，하다→해 주세요。\n-지요? 口语几乎总缩成 -죠?。\n注意：\n주세요 是对对方的请求，주다 用于对第三方（친구한테 선물을 줘요）。', rulesNoteEn: '-아/어/여 주세요 conjugation: if the stem\'s last vowel is ㅏ/ㅗ → 아 주세요, otherwise → 어 주세요, 하다 → 해 주세요. -지요? is almost always shortened to -죠? in speech. Note: 주세요 is a request to the listener, while 주다 is used for a third party (e.g., 친구한테 선물을 줘요).',
    scenarioNote: '"请慢点说""请再说一遍""这首歌很好听吧？"-아/어/여 주세요 在任何需要帮助的场合都用得到，-죠? 在分享感受、确认信息时是最自然的语气。\n这节课学完，你的对话立刻更流畅自然。', scenarioNoteEn: '"Please speak slowly," "Please say it again," "This song is nice, right?" -아/어/여 주세요 is used whenever you need help, and -죠? is the most natural tone for sharing feelings or confirming information. After this lesson, your conversations will immediately become smoother and more natural.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-아/어/여 주다 · -지요?</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">请别人帮忙，或用"吧？"确认。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">다시 말해 주세요.</span> — 请再说一遍。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 단어를 알려 주세요.</span> — 请告诉我这个单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">이 문법은 어렵지요?</span> — 这个语法很难吧？</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两块内容</div>
  <div style="margin-bottom:6px">① <b>-아/어/여 주세요</b> — 请帮我做（礼貌请求）<br><span style="color:#89756e;font-size:16px">变形和 -아요/어요 一样，再加 주세요</span></div>
  <div>② <b>-지요? / -죠?</b> — ……吧？（确认语气）<br><span style="color:#89756e;font-size:16px">直接接词干，口语常缩成 -죠?</span></div>
</div>
<div class="reminder-box">말하다 주세요 ✗ → 말해 주세요 ✓ — 주세요 前先变 아/어/여 形。-지요? 是确认，不是否定（어렵지요? ≠ 어렵지 않아요）。</div>`,
    compareHtml: `<div class="card-title">-아/어/여 주세요（请求）vs -지요?（确认）</div>
<div class="card-body">两者都是常用对话工具：주세요 用于请别人帮忙做某事，-지요? 用于寻求对方同意或确认信息。前者是请求，后者是引导共鸣或确认。中文"请……"和"……吧？"是这两个的最直接对应。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어/여 주세요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">礼貌请求：请帮我做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">기다려 주세요.</span><span style="font-size:16px;color:#5a4640">请等一下。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">천천히 말해 주세요.</span><span style="font-size:16px;color:#5a4640">请说慢一点。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지요? / -죠?</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">确认语气：……吧？对吧？</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있죠?</span><span style="font-size:16px;color:#5a4640">有意思吧？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어 공부하지요?</span><span style="font-size:16px;color:#5a4640">你在学韩语吧？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-아/어/여 주세요 变形规则</div>
  <div style="font-size:16px;color:#241917">阳性元音（아/오）→ <b>아 주세요</b>：봐 주세요 / 도와주세요</div>
  <div style="font-size:16px;color:#241917">其他元音 → <b>어 주세요</b>：읽어 주세요 / 가르쳐 주세요</div>
  <div style="font-size:16px;color:#241917">하다 → <b>해 주세요</b>：설명해 주세요 / 전화해 주세요</div>
</div>
<div class="reminder-box">도움 주세요 ✗ → 도와주세요 ✓ — 帮忙是固定合写形。기다리어 주세요 ✗ → 기다려 주세요 ✓ — ㅣ+어→여 缩合。-지요? 口语缩为 -죠?，意思完全相同。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的请求/确认表达', titleEn: 'Choose the correct request/confirmation expression',
      body: '根据句意选择 -아/어 주다 或 -지요?。', bodyEn: 'Choose -아/어 주다 or -지요? based on the meaning.',
      questions: [
        {
          pre: '문 좀 열',
          post: '.',
          options: ["고 싶어요", "지요", "어 주세요"],
          answer: 2,
          explanation: '-아/어 주세요 表示"请帮我……"：请帮我开一下门。', explanationEn: '-아/어 주세요 means \'please do something for me\': Please open the door for me.',
        },
        {
          pre: '이 노래 정말 좋',
          post: '?',
          options: ["고 싶어요", "아 주세요", "지요"],
          answer: 2,
          explanation: '-지요? 表示确认/征求同意："这首歌真的很好听吧？"', explanationEn: '-지요? indicates confirmation/seeking agreement: \'This song is really nice, isn\'t it?\'',
        },
        {
          pre: '사진 좀 찍',
          post: '.',
          options: ["어 주세요", "었어요", "지요"],
          answer: 0,
          explanation: '찍다 + -어 주세요 = 찍어 주세요（请帮我拍照）。', explanationEn: '찍다 + -어 주세요 = 찍어 주세요 (Please take a picture for me).',
        },
        {
          pre: '오늘 날씨가 춥',
          post: '?',
          options: ["어 주세요", "지요", "고 싶어요"],
          answer: 1,
          explanation: '-지요? 确认："今天天气冷吧？"춥다→춥지요。', explanationEn: '-지요? confirmation: \'It\'s cold today, isn\'t it?\' 춥다→춥지요.',
        },
      ],
    },

    compareLabel: '주세요（请求）vs -지요?（确认）', compareLabelEn: '주세요 (request) vs -지요? (confirmation)',
    structures: [
      {
        ko: '동사 + -아/어/여 주세요',
        zh: '动词 + -아/어/여 주세요 = 请帮我……', zhEn: 'Verb + -아/어/여 주세요 = Please do something for me...',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여 주세요', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 + -지요?',
        zh: '动词/形容词 + -지요? = ……吧？', zhEn: 'Verb/Adjective + -지요? = ...isn\'t it?',
        tokens: [
          { text: '동사/형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지요?', role: 'plain' },
        ],
      },
      {
        ko: '다시 말해 주세요.',
        zh: '请再说一遍。', zhEn: 'Please say that again.',
        tokens: [
          { text: '다시', role: 'plain' },
          { text: '말해 주세요', role: 'verb' },
        ],
      },
      {
        ko: '이 문법은 어렵지요?',
        zh: '这个语法很难吧？', zhEn: 'This grammar is hard, isn\'t it?',
        tokens: [
          { text: '이 문법은', role: 'subject' },
          { text: '어렵지요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여 주세요 变形：词干末元音 ㅏ/ㅗ→아 주세요；其他→어 주세요；하다→해 주세요', textEn: '-아/어/여 주세요 conjugation: if the stem\'s last vowel is ㅏ/ㅗ, use 아 주세요; otherwise, 어 주세요; 하다→해 주세요' },
      { type: 'vocab', text: '常用合成形', textEn: 'Common Combined Forms', examples: '도와주세요（돕다+주다）/ 알려 주세요（알리다+주다）/ 보여 주세요（보이다+주다）' },
      { type: 'usage', text: '-아/어/여 줘요：为对方做某事（非请求）', textEn: '-아/어/여 줘요: doing something for the other person (not a request)', examples: '친구에게 알려 줘요（告诉朋友）', examplesEn: 'Let your friends know' },
      { type: 'note', text: '-지요 可缩略成 -죠', textEn: '-지요 can be shortened to -죠', examples: '어렵죠? / 좋죠? / 재미있죠?（口语常用）', examplesEn: 'Hard, right? / Good, right? / Fun, right? (common in speech)' },
      { type: 'note', text: '-지요? 是确认，不是否定', textEn: '-지요? is for confirmation, not negation', examples: '어렵지요?（很难吧）≠ 어렵지 않아요（不难）', examplesEn: 'It\'s hard, right? ≠ It\'s not hard' },
      { type: 'compare', text: '别把 주세요 当成"更礼貌的 -(으)세요"：주다 强调"替我做、帮我这个忙（恩惠）"，-(으)세요 只是指示/邀请。日常"请坐"是 앉으세요，不是 앉아 주세요', textEn: 'Don\'t treat 주세요 as a \'more polite -(으)세요\': 주다 emphasizes \'do it for me, do me this favor (a kindness)\', while -(으)세요 is just an instruction/invitation. In daily speech, \'please sit\' is 앉으세요, not 앉아 주세요', examples: '사진 좀 찍어 주세요（请帮我拍张照，恩惠）/ 여기 앉으세요（请坐，邀请）', examplesEn: 'Please take a photo for me (a favor) / Please sit here (an invitation)' },
      { type: 'note', text: '-지요? 用在你心里已经这么想、只是求对方点头认同；真正问未知信息要用普通疑问 -아요?/-어요?', textEn: 'Use -지요? when you already think so and just want the other person to nod in agreement; for genuinely unknown information, use the regular question forms -아요?/-어요?', examples: '이거 맞지요?（这个对吧？— 我觉得对，求确认）/ 이거 맞아요?（这个对吗？— 真不知道，在问）', examplesEn: 'This is right, isn\'t it? (I think it\'s right, seeking confirmation) / Is this right? (I really don\'t know, asking)' },
      { type: 'example', text: '교재 예문：다시 말해 주세요 / 이 단어를 알려 주세요 / 천천히 들려 주세요 / 이 문법은 어렵지요?' },
      { type: 'usage', text: '주다 敬语：주세요（请给/请做）→ 드리다（我给长辈）', textEn: 'Honorific of 주다: 주세요 (please give/do) → 드리다 (I give to elders)', examples: '선생님께 드려요（我给老师）', examplesEn: 'I give it to the teacher' },
      { type: 'vocab', text: '드리다 用法', textEn: 'How to use 드리다', examples: '선생님께 말씀드려요 / 부모님께 선물을 드려요（드리다 = 주다 的谦让形）', examplesEn: 'I speak to the teacher / I give a gift to my parents (드리다 = humble form of 주다)' },
      { type: 'example', text: '-지요? 过去形：-았지요?/-었지요?', textEn: 'Past tense of -지요?: -았지요?/-었지요?', examples: '어제 공부했지요?（昨天学习了吧？）/ 맛있었지요?（很好吃吧？）', examplesEn: 'You studied yesterday, right? / It was delicious, right?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '다시', role: 'plain' },
          { text: '말해 주세요', role: 'verb' },
        ],
        zh: '请再说一遍。', zhEn: 'Please say that again.',
        swapWords: ['말해 주세요', '들려 주세요', '설명해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 단어를', role: 'object' },
          { text: '알려 주세요', role: 'verb' },
        ],
        zh: '请告诉我这个单词。', zhEn: 'Please tell me this word.',
        swapWords: ['알려 주세요', '저장해 주세요', '찾아 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '기다려', role: 'verb' },
          { text: '주세요', role: 'verb' },
        ],
        zh: '请等一下。', zhEn: 'Please wait a moment.',
        swapWords: ['기다려 주세요', '도와주세요', '확인해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있지요?', role: 'verb' },
        ],
        zh: '韩语很有意思吧？', zhEn: 'Korean is really interesting, isn\'t it?',
        swapRole: 'verb',
          swapWords: ['재미있지요?', '어렵지요?', '좋지요?'],
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '课堂请求', contextEn: 'Classroom requests', ko: '다시 한번 말해 주세요.', zh: '请再说一遍。', zhEn: 'Please say that again.' },
      { icon: '📱', context: 'App 功能', contextEn: 'App features', ko: '이 단어를 저장해 주세요.', zh: '请保存这个单词。', zhEn: 'Please save this word.' },
      { icon: '🎵', context: 'KPOP 跟唱', contextEn: 'KPOP Sing-Along', ko: '천천히 들려 주세요.', zh: '请慢慢放给我听。', zhEn: 'Please play it slowly for me.' },
      { icon: '💬', context: '学习确认', contextEn: 'Study confirmation', ko: '이 문법은 어렵지요?', zh: '这个语法很难吧？', zhEn: 'This grammar is hard, isn\'t it?' },
      { icon: '🤝', context: '请求帮忙', contextEn: 'Asking for help', ko: '좀 도와주세요.', zh: '请帮帮我。', zhEn: 'Please help me.' },
      { icon: '✅', context: '互动确认', contextEn: 'Interactive confirmation', ko: '재미있죠?', zh: '有意思吧？', zhEn: 'Interesting, right?' },
    ],
    mistakes: [
      { wrong: '말하다 주세요.', correct: '말해 주세요.', note: '주세요 前要先变 아/어/여 形：말하다→말해 주세요', noteEn: 'Before 주세요, you must first change to the 아/어/여 form: 말하다→말해 주세요' },
      { wrong: '어렵지요? / 어렵지 않아요. (混淆)', wrongEn: 'Hard, right? / It\'s not hard. (Confusion)', correct: '어렵지요?（难吧）vs 어렵지 않아요.（不难）', correctEn: '어렵지요? (It\'s hard, right?) vs 어렵지 않아요. (It\'s not hard.)', note: '-지요? 是确认疑问；-지 않아요 是否定陈述', noteEn: '-지요? is a confirmation question; -지 않아요 is a negative statement.' },
      { wrong: '도움 주세요. (想说请帮忙)', wrongEn: 'Please help. (Wanting to say \'please help\')', correct: '도와주세요.', note: '도와주다 是固定合写形，帮忙=도와주세요', noteEn: '도와주다 is a fixed compound; \'help\' = 도와주세요' },
      { wrong: '기다리어 주세요.', correct: '기다려 주세요.', note: '기다리다 词干末元音 ㅣ+어→여：기다려 주세요', noteEn: 'For 기다리다, stem-final vowel ㅣ + 어 → 여: 기다려 주세요' },
      { wrong: '여기 앉아 주세요. (只想说请坐)', wrongEn: 'Please sit here. (Just wanting to say \'please sit\')', correct: '여기 앉으세요.', note: '单纯请人坐用 -(으)세요；-아/어 주세요 是"帮我这个忙"，加了不必要的恩惠语气', noteEn: 'For simply asking someone to sit, use -(으)세요; -아/어 주세요 means \'do me this favor\' and adds an unnecessary tone of obligation.' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['原形', '-아/어/여 주세요', '-지요?'],
      rows: [
        ['가다 去', '가 주세요 请帮我去', '가지요? 去吧？'],
        ['먹다 吃', '먹어 주세요 请帮我吃', '먹지요? 吃吧？'],
        ['하다 做', '해 주세요 请帮我做', '하지요? 做吧？'],
        ['기다리다 等待', '기다려 주세요 请等一下', '기다리지요? 等吧？'],
        ['어렵다 难', '—', '어렵지요? 很难吧？'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>주세요 · -지요? 완성！</div>
  <div class='ov-sub'>请求和确认，互动更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>주세요</span> 请帮：말해 주세요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>줘요</span> 给他人做：알려 줘요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>-지요?</span> 确认：어렵지요? / 어렵죠?</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 주세요 前先进行 아/어/여 变形</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l07',
    partNumber: 5,
    lessonNumber: 7,
    title: '电话号码的读法, 时间助词', titleEn: 'Reading phone numbers, time particles',
    whatItDoes: '读电话号码，说具体时间', whatItDoesEn: 'Read phone numbers and say specific times',
    whatItDoesBody: '电话号码用汉字数词逐个读；\n时间点用 에，时间范围用 부터…까지。\n这节课把P2的时间知识做综合应用数字读法、时间助词 에/부터/까지 全部整合在一起。\n和中文不同：\n中文"在三点"和"从三点到五点"用不同介词，韩语时间点用 에，时间范围用 부터…까지，分工明确。', whatItDoesBodyEn: 'Phone numbers are read digit by digit using Sino-Korean numbers; time points use 에, and time ranges use 부터…까지. This lesson integrates the time knowledge from P2, combining number reading and the time particles 에/부터/까지. Unlike Chinese, where "at three" and "from three to five" use different prepositions, Korean uses 에 for time points and 부터…까지 for ranges, with clear division.',
    structureNote: '三块内容：①电话号码读法（汉字数词逐位读，0读 공）；\n②시간+에（在某个时间点做）；\n③부터…까지（从某时到某时的范围）。\n时间点和时间范围是两种不同表达，不能混用。', structureNoteEn: 'Three parts: ① phone number reading (Sino-Korean numbers digit by digit, 0 as 공); ② 시간+에 (at a specific time); ③ 부터…까지 (from one time to another). Time points and time ranges are different expressions and cannot be mixed.',
    rulesNote: '时间点用 에（세 시에 만나요），时间范围用 부터/까지（세 시부터 다섯 시까지）。\n0 在电话号码里读 공，不读 영。\n시（点）用固有数词，분（分）用汉字数词和P2学的一样，这节课再强化一遍。', rulesNoteEn: 'Time points use 에 (e.g., 세 시에 만나요), time ranges use 부터/까지 (e.g., 세 시부터 다섯 시까지). In phone numbers, 0 is read as 공, not 영. For hours (시), use native Korean numbers; for minutes (분), use Sino-Korean numbers as learned in P2—this lesson reinforces that.',
    scenarioNote: '"下午三点见""课程从十点到十一点""我的电话是010-xxxx-xxxx"约时间、说课程表、留联系方式，这三种场景每天都会碰到。\n掌握这节课，你能在韩国顺畅处理时间相关的对话。', scenarioNoteEn: '"See you at 3 PM," "The class runs from 10 to 11," "My number is 010-xxxx-xxxx"—making plans, talking about schedules, and sharing contact info are daily scenarios. Master this lesson to handle time-related conversations smoothly in Korea.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">전화번호 읽기 · 시간 에/부터/까지</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">读电话号码，说在几点、从几点到几点。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">제 전화번호는 공일공 일이삼사 오육칠팔이에요.</span> — 我的电话是010-1234-5678。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오후 세 시에 만나요.</span> — 下午三点见。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">세 시부터 다섯 시까지 공부해요.</span> — 从三点到五点学习。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三块内容</div>
  <div style="margin-bottom:6px">① <b>电话号码</b> — 用汉字数词逐位读，0读 공<br><span style="color:#89756e;font-size:16px">010-1234-5678 → 공일공 일이삼사 오육칠팔</span></div>
  <div style="margin-bottom:6px">② <b>시간 + 에</b> — 在某个时间点做（세 시에 만나요）</div>
  <div>③ <b>부터…까지</b> — 从某时到某时（세 시부터 다섯 시까지）</div>
</div>
<div class="reminder-box">시（点）用固有数词：한/두/세/네 시；분（分）用汉字数词：십 분/삼십 분。时间点 에 和时间范围 부터…까지 不能混用。</div>`,
    compareHtml: `<div class="card-title">시간 에（时间点）vs 부터…까지（时间范围）</div>
<div class="card-body">两者都表示时间，但用途不同：에 指某个具体时刻（在三点），부터…까지 表示一段时间范围（从三点到五点）。不能互换，用错会让对方不知道你说的是时刻还是时段。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">시간 + 에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">时间点：在……（某一刻）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 시에 만나요.</span><span style="font-size:16px;color:#5a4640">三点见。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아침 여덟 시에 일어나요.</span><span style="font-size:16px;color:#5a4640">早上八点起床。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">부터…까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">时间范围：从……到……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 시부터 다섯 시까지</span><span style="font-size:16px;color:#5a4640">从三点到五点</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">월요일부터 금요일까지 일해요.</span><span style="font-size:16px;color:#5a4640">从周一到周五工作。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">时间数词读法</div>
  <div style="font-size:16px;color:#241917">小时（시）→ 固有数词：한 시 / 두 시 / 세 시 … 열두 시</div>
  <div style="font-size:16px;color:#241917">分钟（분）→ 汉字数词：일 분 / 십오 분 / 삼십 분</div>
  <div style="font-size:16px;color:#89756e;margin-top:4px">3:30 = 세 시 삼십 분 / 口语：세 시 반（半）</div>
</div>
<div class="reminder-box">세 시에부터 ✗ → 세 시부터 ✓ — 부터 直接加在时间词后，不加 에。세 시에 만나요（在三点见）vs 세 시부터 공부해요（从三点开始学）— 一个是时刻，一个是起点。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的数字读法', titleEn: 'Choose the correct number reading',
      body: '根据语境选择汉字数词或固有数词读法。', bodyEn: 'Choose Sino-Korean or native Korean numerals based on context.',
      questions: [
        {
          pre: '전화번호가 뭐예요? 공일공-',
          post: '.',
          options: ['이삼사오-오육칠팔', '하나둘셋넷-다섯여섯일곱여덟', '둘셋넷다섯-여섯일곱여덟'],
          answer: 0,
          explanation: '电话号码用汉字数词逐个读：010-2345-5678 = 공일공-이삼사오-오육칠팔。', explanationEn: 'Read phone numbers digit by digit with Sino-Korean numerals: 010-2345-5678 = 공일공-이삼사오-오육칠팔.',
        },
        {
          pre: '지금은',
          post: '시예요.',
          options: ['셋', '세', '삼'],
          answer: 1,
          explanation: '时间"几点"用固有数词：세 시（三点）。삼 시 是错误读法。', explanationEn: 'For \'what time\' (hours), use native Korean numerals: 세 시 (3 o\'clock). 삼 시 is incorrect.',
        },
        {
          pre: '수업은',
          post: '분에 시작해요.',
          options: ['삼십분', '서른', '삼십'],
          answer: 2,
          explanation: '时间"几分"用汉字数词具体读：삼십 분（三十分）。', explanationEn: 'For \'minutes\', read specifically with Sino-Korean numerals: 삼십 분 (30 minutes).',
        },
        {
          pre: '사과',
          post: '주세요.',
          options: ['세 잔', '세 개', '삼 개'],
          answer: 1,
          explanation: '数苹果用固有数词 + 量词 개：세 개（三个）。잔 是杯子的量词（配饮品），삼 개 用了汉字数词，都不对。', explanationEn: 'Count apples with native Korean numerals + counter 개: 세 개 (three). 잔 is the counter for cups (with drinks), and 삼 개 uses Sino-Korean numerals—both are wrong.',
        },
      ],
    },

    compareLabel: '시간 에（时间点）vs 부터…까지（时间范围）', compareLabelEn: '시간 에 (point in time) vs 부터…까지 (time range)',
    structures: [
      {
        ko: '전화번호：숫자를 하나씩 읽어요',
        zh: '电话号码：用汉字数词逐个读', zhEn: 'Phone numbers: read digit by digit with Sino-Korean numerals',
        tokens: [
          { text: '010', role: 'plain' },
          { text: '→', role: 'plain' },
          { text: '공일공', role: 'plain' },
        ],
      },
      {
        ko: '시간 + 에 + 동사',
        zh: '时间点 + 에 + 动词', zhEn: 'Time point + 에 + verb',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '+', role: 'plain' },
          { text: '에', role: 'plain' },
          { text: '동사', role: 'verb' },
        ],
      },
      {
        ko: '시간 + 부터 + 시간 + 까지',
        zh: '时间 + 부터 + 时间 + 까지', zhEn: 'Time + 부터 + time + 까지',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '부터', role: 'plain' },
          { text: '시간', role: 'time' },
          { text: '까지', role: 'plain' },
        ],
      },
      {
        ko: '수업은 열 시부터 열한 시까지예요.',
        zh: '课程是十点到十一点。', zhEn: 'The class is from 10 to 11.',
        tokens: [
          { text: '수업은', role: 'subject' },
          { text: '열 시부터', role: 'time' },
          { text: '열한 시까지예요', role: 'time' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '电话号码用汉字数词逐个读', textEn: 'Read phone numbers digit by digit with Sino-Korean numerals', examples: '0=공 / 1=일 / 2=이 / 3=삼 / 4=사 / 5=오 / 6=육 / 7=칠 / 8=팔 / 9=구' },
      { type: 'example', text: '전화번호 읽는 법', examples: '010-1234-5678 → 공일공 일이삼사 오육칠팔（分组读，用停顿隔开）', examplesEn: '010-1234-5678 → 공일공 일이삼사 오육칠팔 (read in groups, separated by pauses)' },
      { type: 'rule', text: '时间：시（点）用固有数词，분（分）用汉字数词', textEn: 'Time: 시 (hours) use native Korean numerals, 분 (minutes) use Sino-Korean numerals', examples: '한 시 / 두 시 / 세 시 / 네 시 / 다섯 시…열두 시 / 십 분 / 삼십 분 / 오십오 분' },
      { type: 'rule', text: '时间 + 에：时间点助词', textEn: 'Time + 에: time point particle', examples: '세 시에 만나요 / 오전 열 시에 시작해요' },
      { type: 'usage', text: '부터…까지：시간/장소 범위', examples: '세 시부터 다섯 시까지 / 월요일부터 금요일까지' },
      { type: 'example', text: '교재 예문：전화번호가 뭐예요? / 팬미팅은 오후 두 시에 시작해요 / 수업은 열 시부터 열한 시까지예요' },
      { type: 'vocab', text: '전화번호 형식', examples: '02-1234-5678（지역번호-국번-번호）/ 핸드폰：010-xxxx-xxxx' },
      { type: 'note', text: '분（分）用汉字数词（이 분/삼십 분），시（点）用固有数词（두 시/세 시）——不能混用', textEn: '분 (minutes) use Sino-Korean numerals (이 분/삼십 분), 시 (hours) use native Korean numerals (두 시/세 시)—cannot be mixed.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오후', role: 'time' },
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '下午三点见。', zhEn: 'See you at 3 PM.',
        swapWords: ['세 시에', '두 시에', '네 시에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '세 시부터', role: 'time' },
          { text: '다섯 시까지', role: 'time' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '从三点到五点学习。', zhEn: 'Study from 3 to 5.',
        swapWords: ['세 시부터 다섯 시까지', '한 시부터 두 시까지', '오전 열 시부터 열한 시까지'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '전화번호가', role: 'subject' },
          { text: '뭐예요?', role: 'verb' },
        ],
        zh: '电话号码是多少？', zhEn: 'What\'s the phone number?',
        swapRole: 'subject',
          swapWords: ['전화번호가 뭐예요?', '번호가 어떻게 돼요?', '연락처가 뭐예요?'],
      },
      {
        wordBlocks: [
          { text: '팬미팅은', role: 'subject' },
          { text: '오후 두 시에', role: 'time' },
          { text: '시작해요', role: 'verb' },
        ],
        zh: '粉丝见面会下午两点开始。', zhEn: 'The fan meeting starts at 2 PM.',
        swapWords: ['두 시에', '세 시에', '다섯 시에'],
        swapRole: 'time',
      },
    ],
    scenarios: [
      { icon: '📞', context: '交换联系方式', contextEn: 'Exchange contact info', ko: '전화번호가 뭐예요?', zh: '电话号码是多少？', zhEn: 'What\'s the phone number?' },
      { icon: '🕒', context: '约见时间', contextEn: 'Meeting time', ko: '오후 세 시에 만나요.', zh: '下午三点见。', zhEn: 'See you at 3 PM.' },
      { icon: '📚', context: '学习时间', contextEn: 'study time', ko: '세 시부터 다섯 시까지 공부해요.', zh: '从三点到五点学习。', zhEn: 'Study from 3 to 5.' },
      { icon: '🎵', context: 'KPOP 活动', contextEn: 'KPOP event', ko: '팬미팅은 오후 두 시에 시작해요.', zh: '粉丝见面会下午两点开始。', zhEn: 'The fan meeting starts at 2 PM.' },
      { icon: '🏫', context: '课程安排', contextEn: 'Course schedule', ko: '수업은 열 시부터 열한 시까지예요.', zh: '课程是十点到十一点。', zhEn: 'The class is from 10 to 11.' },
      { icon: '📅', context: '周间安排', contextEn: 'Weekly schedule', ko: '월요일부터 금요일까지 학교에 가요.', zh: '从周一到周五去学校。', zhEn: 'I go to school from Monday to Friday.' },
    ],
    mistakes: [
      { wrong: '전화번호를 하나/둘/셋으로 읽음', correct: '공일공 일이삼사 오육칠팔', note: '电话号码用汉字数词，不用固有数词', noteEn: 'Phone numbers use Sino-Korean numbers, not native Korean numbers.' },
      { wrong: '세 삼 시에 만나요. (混用数词)', wrongEn: '세 삼 시에 만나요. (mixed numerals)', correct: '세 시에 만나요.', note: '小时用固有数词（세），不是汉字数词（삼）', noteEn: 'Hours use native Korean numbers (세), not Sino-Korean numbers (삼).' },
      { wrong: '세 시에부터 공부해요.', correct: '세 시부터 공부해요.', note: '부터 直接接时间词，不在 에 之后再加', noteEn: '부터 attaches directly to time words, not after 에.' },
      { wrong: '시간 에 없음 (忘记时间点加 에)', wrongEn: '시간 에 없음 (forgot to add 에 to the time)', correct: '세 시에 만나요.', note: '时间点后必须加 에：세 시에 / 오전 열 시에', noteEn: 'Time points must take 에: 세 시에 / 오전 열 시에.' },
    ],
    quickTable: {
      title: '시간 표현표',
      headers: ['表达', '助词', '例子'],
      rows: [
        ['时间点', '에', '세 시에 만나요'],
        ['时间范围起点', '부터', '세 시부터'],
        ['时间范围终点', '까지', '다섯 시까지'],
        ['完整范围', '부터…까지', '세 시부터 다섯 시까지'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>전화번호 · 시간 助词 완성！</div>
  <div class='ov-sub'>数字和时间，日常生活都能说</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>전화번호</span> 공일공 일이삼사 오육칠팔</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>시간 + 에</span> 세 시에 만나요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>부터…까지</span> 세 시부터 다섯 시까지</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 시간=固有数词 / 전화번호=汉字数词</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l08',
    partNumber: 5,
    lessonNumber: 8,
    title: '을/를 타다, 타고 가다/오다, (으)로 가다/오다',
    whatItDoes: '说坐什么交通工具去/来', whatItDoesEn: 'Say what transportation you take to go/come',
    whatItDoesBody: '을/를 타다 表示乘坐；\n타고 가다/오다 表示坐着去/来；\n(으)로 가다/오다 表示用某交通方式去/来。\n三种说法意思相近，区别在强调点：\n타고 强调"坐上再走"的动作，(으)로 强调"用这种方式"。\n中文"坐地铁去"是三个独立词，韩语要选择 타고 或 (으)로 两种不同结构，还需判断有无收音来选 으로/로。', whatItDoesBodyEn: '을/를 타다 means to ride; 타고 가다/오다 means to go/come by riding; (으)로 가다/오다 means to go/come using a certain mode of transport. The three are similar but differ in emphasis: 타고 stresses the action of getting on and going, while (으)로 stresses the method. In Chinese, "go by subway" is three separate words, but Korean requires choosing between 타고 or (으)로, and you must check for a final consonant to pick 으로 or 로.',
    structureNote: '三个表达方式：①타요（单独说乘坐）；\n②타고 가요/와요（坐上后去/来，强调动作连续）；\n③(으)로 가요/와요（用某方式去/来，更简洁）。\n日常口语中 타고 和 (으)로 都常用，可互换。', structureNoteEn: 'Three expressions: ① 타요 (just riding); ② 타고 가요/와요 (go/come after riding, emphasizing the sequence); ③ (으)로 가요/와요 (go/come by a method, more concise). In everyday speech, 타고 and (으)로 are both common and interchangeable.',
    rulesNote: '타고 가다 中的 타고 是 타다+-고 的连接形（已学）。\n(으)로 的收音规则：\n有收音→으로，无收音/ㄹ→로（버스로/지하철로）。\n걸어서 가요（走着去）是例外走路不用 타다，用 걸어서。', rulesNoteEn: 'In 타고 가다, 타고 is the connective form of 타다 + -고 (already learned). The rule for (으)로: if there\'s a final consonant → 으로, if no final consonant or ends in ㄹ → 로 (e.g., 버스로/지하철로). 걸어서 가요 (go on foot) is an exception—walking doesn\'t use 타다, but 걸어서.',
    scenarioNote: '"坐地铁去公司""坐飞机去韩国""坐公交去学校"说出行方式是日常对话中最基础的场景之一。\n掌握这节课，你能流畅描述交通出行，在韩国问路和回答都没问题。', scenarioNoteEn: '"Take the subway to work," "fly to Korea," "take the bus to school"—describing transportation is one of the most basic daily conversation topics. Master this lesson to describe travel smoothly and handle directions in Korea.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">을/를 타다 · 타고 가다 · (으)로 가다</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说坐什么交通工具去或来。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">버스를 타고 학교에 가요.</span> — 坐公交去学校。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">지하철로 회사에 가요.</span> — 坐地铁去公司。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">걸어서 집에 와요.</span> — 走着回家。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种表达</div>
  <div style="margin-bottom:6px">① <b>교통수단 + 을/를 타요</b> — 单独说"乘坐"（버스를 타요）</div>
  <div style="margin-bottom:6px">② <b>교통수단 + 을/를 타고 가요</b> — 坐上后去（强调动作连续）</div>
  <div>③ <b>교통수단 + (으)로 가요</b> — 用某方式去（更简洁，日常常用）</div>
</div>
<div class="reminder-box">걸어서 가요（走着去）— 走路不用 타다，用 걸어서。(으)로 的收音规则：有收音→으로（지하철로），无收音/ㄹ收音→로（버스로）。</div>`,
    compareHtml: `<div class="card-title">타고 가다（坐上再去）vs (으)로 가다（用某方式去）</div>
<div class="card-body">两者都表示乘交通工具出行，意思几乎相同，但结构不同：타고 가다 是两个动词连接（坐上+去），(으)로 가다 是方式助词+去。日常口语两者都自然，但走路固定用 걸어서，不能替换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">교통수단을 타고 가다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">坐上后去（动作连接）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스를 타고 가요.</span><span style="font-size:16px;color:#5a4640">坐公交去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철을 타고 왔어요.</span><span style="font-size:16px;color:#5a4640">坐地铁来的。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">교통수단(으)로 가다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">用某方式去（方式助词）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스로 가요.</span><span style="font-size:16px;color:#5a4640">坐公交去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철로 왔어요.</span><span style="font-size:16px;color:#5a4640">坐地铁来的。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">(으)로 收音规则</div>
  <div style="font-size:16px;color:#241917">无收音 / ㄹ收音 → <b>로</b>：버스로 / 택시로 / 지하철로 / 자전거로</div>
  <div style="font-size:16px;color:#241917">有收音（非ㄹ）→ <b>으로</b>（交通工具多为无收音/ㄹ收音，一般用 로）</div>
  <div style="font-size:16px;color:#89756e;margin-top:4px">걸어서 가요（走路去）— 走路固定用 걸어서，不能说 발로 가요</div>
</div>
<div class="reminder-box">버스를 타고 가요 = 버스로 가요 — 两种说法都正确。걸어로 가요 ✗ → 걸어서 가요 ✓ — 走路固定用 걸어서。지하철을 타고 vs 지하철로：타고 更强调动作过程，로 更简洁。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择合适的交通表达', titleEn: 'Choose the correct transportation expression',
      body: '根据句意选择 타다/타고 가다/(으)로 가다。', bodyEn: 'Choose 타다/타고 가다/(으)로 가다 based on the sentence meaning.',
      questions: [
        {
          pre: '학교에 버스를',
          post: '.',
          options: ["갈아타요", "타고 가요", "타요"],
          answer: 1,
          explanation: '타고 가다 表示"乘坐……去"：坐公交车去学校。', explanationEn: '타고 가다 means \'go by riding...\': take the bus to school.',
        },
        {
          pre: '지하철을',
          post: '출근해요.',
          options: ["타러", "갈아타고", "타고"],
          answer: 2,
          explanation: '지하철을 타고 출근해요 = 坐地铁上班。', explanationEn: '지하철을 타고 출근해요 = commute by subway.',
        },
        {
          pre: '버스',
          post: '회사에 가요.',
          options: ["에", "로", "에서"],
          answer: 1,
          explanation: '(으)로 가다 表示交通方式：버스로 가요（坐公交去）。에 表方向/存在、에서 表动作发生地，都不能标交通工具。', explanationEn: '(으)로 가다 indicates the mode of transport: 버스로 가요 (go by bus). 에 marks direction/existence, 에서 marks where an action happens—neither can mark a vehicle.',
        },
        {
          pre: '택시를',
          post: '집에 갈게요.',
          options: ["타고", "갈아타고", "타러"],
          answer: 0,
          explanation: '택시를 타고 가다 = 打车去。', explanationEn: '택시를 타고 가다 = go by taxi.',
        },
      ],
    },

    compareLabel: '타고 가다 vs (으)로 가다',
    structures: [
      {
        ko: '교통수단 + 을/를 타요',
        zh: '交通工具 + 을/를 타요 = 乘坐……', zhEn: 'Vehicle + 을/를 타요 = ride/take...',
        tokens: [
          { text: '교통수단', role: 'object' },
          { text: '을/를', role: 'plain' },
          { text: '타요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + 을/를 타고 + 장소에 가요',
        zh: '交通工具 + 을/를 타고 + 去地点', zhEn: 'Vehicle + 을/를 타고 + go to a place',
        tokens: [
          { text: '교통수단을', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '장소에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + (으)로 + 장소에 가요',
        zh: '交通工具 + (으)로 + 去地点', zhEn: 'Vehicle + (으)로 + go to a place',
        tokens: [
          { text: '교통수단으로/로', role: 'plain' },
          { text: '장소에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '비행기를 타고 한국에 가요.',
        zh: '坐飞机去韩国。', zhEn: 'I go to Korea by plane.',
        tokens: [
          { text: '비행기를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '한국에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '을/를 타다：交通工具 + 目的格助词', textEn: '을/를 타다: vehicle + object particle', examples: '버스를 타요 / 지하철을 타요 / 택시를 타요 / 비행기를 타요' },
      { type: 'rule', text: '타고 가다/오다：坐上后连接移动', textEn: '타고 가다/오다: get on, then connect movement', examples: '버스를 타고 가요 / 택시를 타고 와요' },
      { type: 'rule', text: '(으)로 가다：ㄹ收音/无收音→로；有收音（非ㄹ）→으로', textEn: '(으)로 가다: ㄹ-final/no final consonant → 로; other final consonant → 으로', examples: '지하철로 / 버스로 / 택시로' },
      { type: 'note', text: '지하철 是 ㄹ 收音，用 로', textEn: '지하철 ends in the ㄹ final consonant, so use 로', examples: '지하철로（不是 지하철으로）', examplesEn: '지하철로 (not 지하철으로)' },
      { type: 'compare', text: '两种表达都可以：버스를 타고 가요 ＝ 버스로 가요（语感略有不同，口语都自然）', textEn: 'Both expressions are fine: 버스를 타고 가요 = 버스로 가요 (slightly different nuance, but both sound natural in speech)' },
      { type: 'example', text: '교재 예문：버스를 타고 학교에 가요 / 지하철로 회사에 가요 / 비행기를 타고 한국에 가요 / 택시를 타고 콘서트장에 가요' },
      { type: 'example', text: '추가 교재 대화：어떻게 오셨어요? / 버스로 왔어요 / 지하철로 오는 게 더 빨라요' },
      { type: 'compare', text: '方式助词总结：(으)로（手段/方式）vs 을/를 타고（乘坐）', textEn: 'Summary of method particles: (으)로 (means/method) vs. 을/를 타고 (riding)', examples: '택시를 타고 가요 / 버스로 가요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '버스를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐公交去学校。', zhEn: 'I take the bus to school.',
        swapWords: ['버스를 타고', '지하철을 타고', '택시를 타고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지하철로', role: 'plain' },
          { text: '회사에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐地铁去公司。', zhEn: 'Go to work by subway.',
        swapWords: ['지하철로', '버스로', '택시로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '비행기를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '한국에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐飞机去韩国。', zhEn: 'I go to Korea by plane.',
        swapWords: ['한국에 가요', '일본에 가요', '제주도에 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '택시를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '콘서트장에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐出租车去演唱会场馆。', zhEn: 'Take a taxi to the concert venue.',
        swapWords: ['택시를 타고', '버스를 타고', '지하철을 타고'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌', context: '上学', contextEn: 'go to school', ko: '버스를 타고 학교에 가요.', zh: '坐公交去学校。', zhEn: 'I take the bus to school.' },
      { icon: '🚇', context: '上班', contextEn: 'go to work', ko: '지하철로 회사에 가요.', zh: '坐地铁去公司。', zhEn: 'Go to work by subway.' },
      { icon: '✈️', context: '旅行', contextEn: 'Travel', ko: '비행기를 타고 한국에 가요.', zh: '坐飞机去韩国。', zhEn: 'I go to Korea by plane.' },
      { icon: '🎵', context: 'KPOP 活动', contextEn: 'KPOP event', ko: '택시를 타고 콘서트장에 가요.', zh: '坐出租车去演唱会场馆。', zhEn: 'Take a taxi to the concert venue.' },
      { icon: '🚗', context: '接送', contextEn: 'pick up and drop off', ko: '차로 공항에 가요.', zh: '坐车去机场。', zhEn: 'Go to the airport by car.' },
      { icon: '🚶', context: '步行', contextEn: 'walk', ko: '걸어서 학교에 가요.', zh: '走路去学校。', zhEn: 'Walk to school.' },
    ],
    mistakes: [
      { wrong: '버스에 타요. (想说坐公交)', wrongEn: '버스에 타요. (trying to say \'take the bus\')', correct: '버스를 타요.', note: '타다 的对象用 을/를，基础表达记 버스를 타요', noteEn: 'The object of 타다 takes 을/를; the basic expression to remember is 버스를 타요' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'ㄹ 收音后用 로，不是 으로', noteEn: 'After a ㄹ batchim, use 로, not 으로' },
      { wrong: '버스를 타고로 가요. (混用)', wrongEn: '버스를 타고로 가요. (mixed up)', correct: '버스를 타고 가요. 或 버스로 가요.', correctEn: '버스를 타고 가요. or 버스로 가요.', note: '타고와 로 选一个，不能同时用', noteEn: 'Choose either 타고 or 로—you can\'t use both at once' },
      { wrong: '택시에서 가요. (想说坐出租车去)', wrongEn: '택시에서 가요. (trying to say \'go by taxi\')', correct: '택시로 가요. 或 택시를 타고 가요.', correctEn: '택시로 가요. or 택시를 타고 가요.', note: '乘坐交通工具用 를 타고 或 로，不用 에서', noteEn: 'For riding transportation, use 를 타고 or 로, not 에서' },
    ],
    quickTable: {
      title: '교통 표현표',
      headers: ['交通工具', '을/를 타요', '(으)로 가요'],
      rows: [
        ['버스 公交车', '버스를 타요 乘公交车', '버스로 가요 坐公交去'],
        ['지하철 地铁', '지하철을 타요 乘地铁', '지하철로 가요 坐地铁去'],
        ['택시 出租车', '택시를 타요 乘出租车', '택시로 가요 坐出租去'],
        ['비행기 飞机', '비행기를 타요 乘飞机', '비행기로 가요 坐飞机去'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>타다 · 타고 가다 · (으)로 가다 완성！</div>
  <div class='ov-sub'>交通表达让出行描述更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>을/를 타요</span> 버스를 타요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>타고 가요</span> 버스를 타고 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>(으)로 가요</span> 지하철로 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 지하철로（ㄹ 收音 뒤에 로）</div>
</div>`,
    linkedGrammarIds: ['g9'],
  },
  {
    id: 'card-p5-l09',
    partNumber: 5,
    lessonNumber: 9,
    title: '을/를 갈아타다, (으)로 갈아타다',
    whatItDoes: '说换乘、中途转车', whatItDoesEn: 'Say transferring and changing vehicles',
    whatItDoesBody: '갈아타다 表示换乘；\n을/를 갈아타다 强调换乘对象；\n(으)로 갈아타다 强调换成什么；\nA에서 B로 갈아타다 表示从A换到B。\n갈아타다 是 타다（乘）的扩展갈아 表示"换"，合起来就是"换着乘/转乘"。\n和中文不同：\n中文"换乘地铁"直接搭配，韩语需要用助词区分"换哪条线"（을/를）和"换成什么"（(으)로），表达更精确。', whatItDoesBodyEn: '갈아타다 means to transfer; 을/를 갈아타다 emphasizes what you\'re transferring from; (으)로 갈아타다 emphasizes what you transfer to; A에서 B로 갈아타다 means transferring from A to B. 갈아타다 is an extension of 타다 (to ride), with 갈아 meaning "change," so together it means "change rides/transfer." Unlike Chinese, where "transfer to the subway" is a direct combination, Korean uses particles to distinguish "which line you transfer from" (을/를) and "what you transfer to" ((으)로), making it more precise.',
    structureNote: '这节课是上节课 타다/(으)로 가다 的延伸，核心动词换成 갈아타다。\n三种表达：①을/를 갈아타요（换乘某工具）；\n②(으)로 갈아타요（换成某方向）；\n③A에서 B로 갈아타요（从A换到B，最完整）。', structureNoteEn: 'This lesson extends the previous one on 타다/(으)로 가다, with the core verb changed to 갈아타다. Three expressions: ① 을/를 갈아타요 (transfer from a vehicle); ② (으)로 갈아타요 (transfer to a direction); ③ A에서 B로 갈아타요 (transfer from A to B, the most complete).',
    rulesNote: '갈아타다 的助词选择和 타다 一样：\n宾语位置用 을/를，方向/工具位置用 (으)로。\n起点用 에서（버스에서），终点用 (으)로（지하철로）。\n次数说法：\n두 번 갈아타야 해요（要换两次）。', rulesNoteEn: 'The particle choice for 갈아타다 is the same as for 타다: use 을/를 for the object, and (으)로 for direction/tool. The starting point uses 에서 (e.g., 버스에서), and the destination uses (으)로 (e.g., 지하철로). To express the number of transfers: 두 번 갈아타야 해요 (I need to transfer twice).',
    scenarioNote: '"在这里换乘2号线""从公交换地铁""要换几次"问路和乘车时这类表达必不可少。\n去韩国旅行、坐地铁换乘都会用到。\n这节课配合上节课，出行对话就完整了。', scenarioNoteEn: '"Transfer to Line 2 here," "switch from bus to subway," "how many transfers?"—these expressions are essential for asking directions and riding transit. You\'ll use them when traveling in Korea and transferring on the subway. Combined with the previous lesson, your travel conversations will be complete.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">갈아타다 · A에서 B로 갈아타다</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说中途换乘、转车。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">버스에서 지하철로 갈아타요.</span> — 从公交换乘地铁。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이호선으로 갈아타세요.</span> — 请换乘2号线。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">두 번 갈아타야 해요.</span> — 要换乘两次。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种表达</div>
  <div style="margin-bottom:6px">① <b>교통수단 + 을/를 갈아타요</b> — 换乘某工具</div>
  <div style="margin-bottom:6px">② <b>(으)로 갈아타요</b> — 换成某工具/方向（更常用）</div>
  <div>③ <b>A에서 B로 갈아타요</b> — 从A换到B（最完整，问路用）</div>
</div>
<div class="reminder-box">갈아타다 = 갈아（换）+ 타다（乘坐）。起点用 에서，终点用 (으)로：버스에서 지하철로 갈아타요。次数说法：한 번/두 번 갈아타야 해요。</div>`,
    compareHtml: `<div class="card-title">타다（乘坐）vs 갈아타다（换乘）</div>
<div class="card-body">타다 是最初上车乘坐，갈아타다 是途中换乘另一辆。两个词的助词用法也不同：타다 用目的格 을/를，갈아타다 用方向助词 (으)로，起点用 에서 标出。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 타다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">乘坐（上车，목적어 을/를）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철을 타요.</span><span style="font-size:16px;color:#5a4640">坐地铁。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스를 탔어요.</span><span style="font-size:16px;color:#5a4640">坐了公交。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에서 (으)로 갈아타다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">换乘（起点 에서 + 目标 (으)로）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스에서 지하철로 갈아타요.</span><span style="font-size:16px;color:#5a4640">从公交换地铁。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">2호선에서 3호선으로 갈아타세요.</span><span style="font-size:16px;color:#5a4640">从2号线换3号线。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">换乘次数表达</div>
  <div style="font-size:16px;color:#241917">한 번 갈아타요（换一次乘）/ 두 번 갈아타요（换两次）</div>
  <div style="font-size:16px;color:#241917">환승 없이 가요（不换乘直达）</div>
  <div style="font-size:16px;color:#89756e;margin-top:4px">어디서 갈아타요?（在哪换乘？）— 问路必备句型</div>
</div>
<div class="reminder-box">지하철을 갈아타요（换乘地铁，强调对象）= 지하철로 갈아타요（换乘地铁，强调方向）— 两种说法都正确，口语中 (으)로 갈아타다 更常用。어디서 갈아타요?（在哪换乘？）是问路必备句型。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的换乘表达', titleEn: 'Choose the correct transfer expression',
      body: '根据句意选择 갈아타다 的正确搭配。', bodyEn: 'Choose the correct pairing for 갈아타다 based on the meaning of the sentence.',
      questions: [
        {
          pre: '1호선을 타고 가다가 서울역에서 2호선을',
          post: '.',
          options: ["내리세요", "타세요", "갈아타세요"],
          answer: 2,
          explanation: '已经坐着1号线，在首尔站换成2号线→用 을/를 갈아타다：2호선을 갈아타세요。타세요（乘车）此时不合，因为已经在车上；내리세요 是下车。', explanationEn: 'Already on Line 1, transfer to Line 2 at Seoul Station → use 을/를 갈아타다: 2호선을 갈아타세요. 타세요 (riding) doesn\'t fit here because you\'re already on the train; 내리세요 means to get off.',
        },
        {
          pre: '버스에서 지하철',
          post: '.',
          options: ["로 갈아탔어요", "를 탔어요", "을 갈아탔어요"],
          answer: 0,
          explanation: '(으)로 갈아타다 强调方向："从公交换到了地铁。"', explanationEn: '(으)로 갈아타다 emphasizes direction: "switched from the bus to the subway."',
        },
        {
          pre: '다음 역에서 3호선',
          post: '가능합니다.',
          options: ["에 타기가", "으로 갈아타기가", "에서 갈아타기가"],
          answer: 1,
          explanation: '(으)로 갈아타기 = 换乘到3号线（强调换到哪条线）。에 타기（타다用을/를，不用에）、에서 갈아타기（3호선是目标线路而非地点，不用 에서）都不对。', explanationEn: '(으)로 갈아타기 = transfer to Line 3 (emphasizing which line you switch to). 에 타기 (타다 takes 을/를, not 에) and 에서 갈아타기 (3호선 is the target line, not a place, so 에서 isn\'t used) are both wrong.',
        },
        {
          pre: '지하철을 타고 오다가 여기서 버스로',
          post: '가야 해요.',
          options: ["갈아타고", "내려서", "타고"],
          answer: 0,
          explanation: '坐着地铁过来、在这里换成公交→버스로 갈아타고 가야 해요。내려서（下车）、타고（单纯乘坐）都不含"从一种交通工具换到另一种"的换乘义。', explanationEn: 'Came by subway and need to transfer to the bus here → 버스로 갈아타고 가야 해요. 내려서 (getting off) and 타고 (just riding) don\'t carry the meaning of switching from one mode of transport to another.',
        },
      ],
    },

    compareLabel: '타다（乘坐）vs 갈아타다（换乘）', compareLabelEn: 'Ride (타다) vs Transfer (갈아타다)',
    structures: [
      {
        ko: '교통수단 + 을/를 갈아타요',
        zh: '交通工具 + 을/를 갈아타요 = 换乘……', zhEn: 'Transportation + 을/를 갈아타요 = Transfer to...',
        tokens: [
          { text: '교통수단', role: 'object' },
          { text: '을/를', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + (으)로 갈아타요',
        zh: '换成……（强调方向）', zhEn: 'Transfer to... (emphasizing direction)',
        tokens: [
          { text: '교통수단', role: 'plain' },
          { text: '(으)로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: 'A에서 B로 갈아타요',
        zh: '从A换到B', zhEn: 'Transfer from A to B',
        tokens: [
          { text: 'A에서', role: 'place' },
          { text: 'B로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: '버스에서 지하철로 갈아타요.',
        zh: '从公交换乘地铁。', zhEn: 'Transfer from the bus to the subway.',
        tokens: [
          { text: '버스에서', role: 'place' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '을/를 갈아타다：强调换乘对象（换的是什么）', textEn: '을/를 갈아타다: Emphasizes the object of transfer (what you\'re transferring to)', examples: '지하철을 갈아타요 / 버스를 갈아타요' },
      { type: 'rule', text: '(으)로 갈아타다：强调换乘方向（换成什么方向）', textEn: '(으)로 갈아타다: Emphasizes the direction of transfer (which direction you\'re transferring to)', examples: '지하철로 갈아타요 / 버스로 갈아타요' },
      { type: 'usage', text: 'A에서 B로 갈아타요：从A换到B', textEn: 'A에서 B로 갈아타요: Transfer from A to B', examples: '버스에서 지하철로 갈아타요 / 지하철에서 버스로 갈아타요' },
      { type: 'rule', text: '(으)로 接续：ㄹ收音/无收音→로；有收音（非ㄹ）→으로', textEn: '(으)로 attachment: ㄹ ending/no ending → 로; other consonant ending → 으로', examples: '지하철로 / 버스로 / 택시로' },
      { type: 'vocab', text: '换乘次数表达', textEn: 'Expressing number of transfers', examples: '한 번 갈아타요（换乘一次）/ 두 번 갈아타야 해요（要换乘两次）', examplesEn: '한 번 갈아타요 (transfer once) / 두 번 갈아타야 해요 (need to transfer twice)' },
      { type: 'example', text: '교재 예문：버스에서 지하철로 갈아타요 / 학교에 가려면 지하철로 갈아타야 해요 / 콘서트장에 가려면 두 번 갈아타야 해요' },
      { type: 'example', text: '추가 교재 예문：텐진에서 비행기로 갈아타요（在天津换乘飞机）', textEn: 'Additional textbook example: 텐진에서 비행기로 갈아타요 (Transfer to a plane in Tianjin)' },
      { type: 'compare', text: '中文"换乘"一个词，韩语两种选法看你说不说清"换成哪个"：点名换成什么目标（哪条线/哪种工具）用 (으)로，常跟 에서 一起（버스에서 지하철로）；只泛说换乘某类工具、不点目标时用 을/를（지하철을 갈아타요）。拿不准就用 (으)로，最不会错。', textEn: 'Chinese uses one word for \'transfer,\' but Korean has two options depending on whether you specify the target: use (으)로 when naming the goal (which line/vehicle), often with 에서 (버스에서 지하철로); use 을/를 when just generally transferring to a type of vehicle without specifying (지하철을 갈아타요). When unsure, (으)로 is the safest choice.', examples: '버스에서 지하철로 갈아타요（点名换成地铁）↔ 지하철을 갈아타요（泛说换地铁）', examplesEn: '버스에서 지하철로 갈아타요 (specifying subway) ↔ 지하철을 갈아타요 (general subway transfer)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '버스에서', role: 'place' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '从公交换乘地铁。', zhEn: 'Transfer from the bus to the subway.',
        swapWords: ['지하철로 갈아타요', '버스로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '학교에', role: 'place' },
          { text: '가려면', role: 'verb' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타야 해요', role: 'verb' },
        ],
        zh: '想去学校的话，得换乘地铁。', zhEn: 'To get to school, you need to transfer to the subway.',
        swapWords: ['지하철로 갈아타야 해요', '버스로 갈아타야 해요', '한 번 갈아타야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '두 번', role: 'plain' },
          { text: '갈아타야 해요', role: 'verb' },
        ],
        zh: '要换乘两次。', zhEn: 'You need to transfer twice.',
        swapWords: ['두 번', '한 번', '세 번'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '공항에서', role: 'place' },
          { text: '버스로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '在机场换乘公交。', zhEn: 'Transfer to the bus at the airport.',
        swapWords: ['버스로 갈아타요', '지하철로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌🚇', context: '通勤换乘', contextEn: 'Commute transfer', ko: '버스에서 지하철로 갈아타요.', zh: '从公交换乘地铁。', zhEn: 'Transfer from the bus to the subway.' },
      { icon: '🏫', context: '上学路线', contextEn: 'Route to school', ko: '학교에 가려면 지하철로 갈아타야 해요.', zh: '想去学校得换乘地铁。', zhEn: 'To get to school, you have to transfer to the subway.' },
      { icon: '🎵', context: '演唱会出行', contextEn: 'Concert commute', ko: '콘서트장에 가려면 두 번 갈아타야 해요.', zh: '去演唱会场馆要换乘两次。', zhEn: 'You need to transfer twice to get to the concert venue.' },
      { icon: '✈️', context: '机场到市区', contextEn: 'Airport to city center', ko: '공항에서 지하철로 갈아타요.', zh: '在机场换乘地铁。', zhEn: 'Transfer to the subway at the airport.' },
      { icon: '🗺️', context: '路线说明', contextEn: 'Route explanation', ko: '지하철에서 버스로 갈아타면 돼요.', zh: '从地铁换乘公交就好。', zhEn: 'Just transfer from the subway to the bus.' },
      { icon: '⏱️', context: '问路线', contextEn: 'Ask for directions', ko: '몇 번 갈아타야 해요?', zh: '要换乘几次？', zhEn: 'How many transfers do you need?' },
    ],
    mistakes: [
      { wrong: '버스를 타다 지하철로. (想说换乘)', wrongEn: '버스를 타다 지하철로. (meaning to transfer)', correct: '버스에서 지하철로 갈아타요.', note: '换乘要用 갈아타다，타다 只表示乘坐', noteEn: 'For transferring, use 갈아타다; 타다 only means to ride.' },
      { wrong: '지하철으로 갈아타요.', correct: '지하철로 갈아타요.', note: 'ㄹ 收音后用 로，不是 으로', noteEn: 'After a ㄹ batchim, use 로, not 으로' },
      { wrong: '갈아타다 와 타다 혼용', correct: '버스를 타요（乘坐）vs 지하철로 갈아타요（换乘）', correctEn: '버스를 타요 (ride) vs 지하철로 갈아타요 (transfer)', note: '타다=乘坐；갈아타다=换乘，不能互换', noteEn: '타다 = to ride; 갈아타다 = to transfer; they can\'t be used interchangeably.' },
      { wrong: '버스에 지하철로 갈아타요. (A用 에)', wrongEn: '버스에 지하철로 갈아타요. (A uses 에)', correct: '버스에서 지하철로 갈아타요.', note: '出发地（换乘前）用 에서，不是 에', noteEn: 'Use 에서 for the starting point (before transferring), not 에.' },
    ],
    quickTable: {
      title: '갈아타기 표현표',
      headers: ['表达', '结构', '例子'],
      rows: [
        ['换乘某工具', 'B를 갈아타요', '지하철을 갈아타요'],
        ['换成某工具', 'B로 갈아타요', '지하철로 갈아타요'],
        ['从A换到B', 'A에서 B로 갈아타요', '버스에서 지하철로 갈아타요'],
        ['换乘N次', 'N번 갈아타야 해요', '두 번 갈아타야 해요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>갈아타다 완성！</div>
  <div class='ov-sub'>换乘表达让路线说明更清晰</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>B로 갈아타요</span> 换成地铁：지하철로 갈아타요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>A에서 B로</span> 从公交换地铁</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>N번 갈아타야 해요</span> 换乘N次</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 타다（乘坐）≠ 갈아타다（换乘）</div>
</div>`,
    linkedGrammarIds: ['g9'],
  },
  {
    id: 'card-p5-l10',
    partNumber: 5,
    lessonNumber: 10,
    title: '-다가',
    whatItDoes: '说做着做着发生了变化', whatItDoesEn: 'Say that something changed while doing an action',
    whatItDoesBody: '-다가 表示在做某动作的过程中发生变化、中断或切换，相当于"做着做着……"。\n中文"学着学着睡着了""看着看着哭了"这种"途中发生变化"的表达，韩语就用 -다가。', whatItDoesBodyEn: '-다가 indicates a change, interruption, or switch that happens during an action, equivalent to "while doing..." in Chinese. For expressions like "fell asleep while studying" or "cried while watching," Korean uses -다가.',
    structureNote: '结构非常简单：\n动词词干直接加 -다가，不看收音，后句说发生的变化或结果。\n注意 -다가 和 -고 的区别：\n-고 是"做完A再做B"，-다가 是"做A途中（没做完）就发生了B"。', structureNoteEn: 'The structure is very simple: \\nAdd -다가 directly to the verb stem, regardless of the final consonant. The second clause states the change or result. \\nNote the difference between -다가 and -고: \\n-고 means "do A, then do B," while -다가 means "while doing A (not finished), B happened."',
    rulesNote: '-다가 直接接词干，无变形，不规则也不触发。\n关键是含义前句动作必须是"正在进行中/未完成"的状态，后句是中途发生的变化。\n可以缩略成 -다：\n공부하다 잠들었어요。', rulesNoteEn: '-다가 attaches directly to the verb stem with no changes, and irregular rules don\'t apply.\\nThe key is that the action in the first clause must be "in progress/incomplete," and the second clause describes a change that happens midway.\\nIt can be shortened to -다: \\n공부하다 잠들었어요.',
    scenarioNote: '"追剧追着追着哭了""学习学着学着睡着了""走着走着迷路了"这类"做着做着"的描述在讲故事、聊日常经历时非常自然。\n掌握 -다가，你的韩语叙述能力会明显提升。', scenarioNoteEn: 'Descriptions like "I cried while binge-watching," "I fell asleep while studying," or "I got lost while walking" — these "doing something and then..." phrases are very natural when telling stories or chatting about daily experiences. \\nMastering -다가 will noticeably boost your Korean storytelling skills.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-다가</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说做着做着，中途发生了变化。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">공부하다가 잠들었어요.</span> — 学着学着睡着了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">드라마를 보다가 울었어요.</span> — 看电视剧看着看着哭了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">길을 걷다가 친구를 만났어요.</span> — 走路走着走着遇见了朋友。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">结构与含义</div>
  <div style="margin-bottom:6px"><b>동사 词干 + -다가 + 变化/结果</b></div>
  <div style="margin-bottom:6px">前句动作：正在进行、<b>未完成</b></div>
  <div>后句：途中发生的变化或意外结果</div>
</div>
<div class="reminder-box">-다가 直接接词干，无需看收音，不规则也不触发。可缩略成 -다：공부하다 잠들었어요。和 -고 的区别：-고 是"做完A再做B"，-다가 是"做A途中（没做完）就B了"。</div>`,
    compareHtml: `<div class="card-title">-고（顺接/完成后）vs -다가（中途变化）</div>
<div class="card-body">-고 是做完A再做B（A完成），-다가 是做A途中发生了B（A未完成）。含义差别很大：-고 前句动作已结束，-다가 前句动作被中断或转向，两者不能随意替换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">顺接：A完成后做B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥을 먹고 공부해요.</span><span style="font-size:16px;color:#5a4640">吃完饭然后学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">샤워를 하고 잤어요.</span><span style="font-size:16px;color:#5a4640">洗完澡睡觉了。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-다가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">中途变化：做A途中发生B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하다가 잠들었어요.</span><span style="font-size:16px;color:#5a4640">学着学着睡着了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">걷다가 넘어졌어요.</span><span style="font-size:16px;color:#5a4640">走着走着摔倒了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-다가 的三种用法</div>
  <div style="font-size:16px;color:#241917">① 动作中途中断：공부하다가 전화가 왔어요（学习中接到电话）</div>
  <div style="font-size:16px;color:#241917">② 方向转变：집에 가다가 슈퍼에 들렀어요（回家途中顺路去了超市）</div>
  <div style="font-size:16px;color:#241917">③ 意外发生：서다가 넘어졌어요（站着站着摔倒了）</div>
</div>
<div class="reminder-box">밥을 먹고 잠들었어요（吃完饭睡着了）vs 밥을 먹다가 잠들었어요（吃着吃着睡着了）— 一字之差，含义完全不同。-다가 接续：去掉 다 直接加 다가，所有不规则均不触发（다가 以辅音开头）。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的 -다가 表达', titleEn: 'Choose the correct -다가 expression',
      body: '根据句意完成 -다가 句型。', bodyEn: 'Complete the -다가 pattern based on the meaning.',
      questions: [
        {
          pre: '공부하',
          post: '잠들었어요.',
          options: ['다가', '면서', '고'],
          answer: 0,
          explanation: '-다가 表示"做着做着然后……"：学着学着睡着了。', explanationEn: '-다가 means "while doing... then...": fell asleep while studying.',
        },
        {
          pre: '집에 가',
          post: '친구를 만났어요.',
          options: ['서', '고', '다가'],
          answer: 2,
          explanation: '-다가 表示途中转换："回家路上遇到了朋友。"', explanationEn: '-다가 indicates a change midway: "met a friend on the way home."',
        },
        {
          pre: '밥을 먹',
          post: '전화가 왔어요.',
          options: ["고", "다가", "은 후에"],
          answer: 1,
          explanation: '-다가 表示动作中断："吃饭吃到一半电话来了。"', explanationEn: '-다가 indicates an interrupted action: "the phone rang while eating."',
        },
        {
          pre: '운동하',
          post: '다리를 다쳤어요.',
          options: ["면서", "다가", "고"],
          answer: 1,
          explanation: '-다가 表示进行中发生意外："运动时伤到了腿。"', explanationEn: '-다가 indicates something unexpected happening during an activity: "hurt my leg while exercising."',
        },
      ],
    },

    compareLabel: '-고（顺接）vs -다가（中途变化）', compareLabelEn: '-고 (sequential) vs -다가 (midway change)',
    structures: [
      {
        ko: '동사어간 + -다가 + 변화/결과',
        zh: '动词词干 + -다가 + 变化/结果', zhEn: 'Verb stem + -다가 + change/result',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-다가', role: 'plain' },
          { text: '변화/결과', role: 'verb' },
        ],
      },
      {
        ko: '공부하다가 잠들었어요.',
        zh: '学着学着睡着了。', zhEn: 'Fell asleep while studying.',
        tokens: [
          { text: '공부하다가', role: 'verb' },
          { text: '잠들었어요', role: 'verb' },
        ],
      },
      {
        ko: '길을 걷다가 친구를 만났어요.',
        zh: '走路时遇见了朋友。', zhEn: 'Met a friend while walking.',
        tokens: [
          { text: '길을', role: 'object' },
          { text: '걷다가', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
      },
      {
        ko: '노래를 듣다가 가사를 봤어요.',
        zh: '听歌听着听着看了歌词。', zhEn: 'While listening to a song, I ended up looking at the lyrics.',
        tokens: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-다가 接续：去掉 다 后接 다가', textEn: '-다가 conjugation: drop 다 and add 다가.', examples: '보다→보다가 / 먹다→먹다가 / 공부하다→공부하다가 / 듣다→듣다가' },
      { type: 'note', text: '-다가 接续时不规则基本不触发（辅音 ㄷ 앞）', textEn: 'Irregular conjugations generally don\'t apply with -다가 (before consonant ㄷ).', examples: '듣다→듣다가（不是 들다가）/ 걷다→걷다가 / 쓰다→쓰다가', examplesEn: '듣다→듣다가 (not 들다가) / 걷다→걷다가 / 쓰다→쓰다가' },
      { type: 'usage', text: '-다가 强调途中变化：前句动作未完成时后句发生', textEn: '-다가 emphasizes a change midway: the second action happens while the first is incomplete.', examples: '공부하다가 잠들었어요（学习中途睡着）', examplesEn: '공부하다가 잠들었어요 (fell asleep while studying)' },
      { type: 'vocab', text: '后句常见搭配', textEn: 'Common collocations with the following clause', examples: '잠들다 / 울다 / 웃다 / 만나다 / 보다（中断/切换/意外/发现）', examplesEn: 'fall asleep / cry / laugh / meet / see (interruption/switch/unexpected/discovery)' },
      { type: 'compare', text: '-다가 vs -고：-고 是A完成后B；-다가 是做A途中B发生，前句动作未完成', textEn: '-다가 vs -고: -고 means B happens after A is completed; -다가 means B happens while doing A, so the first action isn\'t finished' },
      { type: 'example', text: '교재 예문：공부하다가 잠들었어요 / 드라마를 보다가 울었어요 / 길을 걷다가 친구를 만났어요 / 노래를 듣다가 가사를 봤어요' },
      { type: 'usage', text: '-다가 方向转换：常与移动动词搭配', textEn: '-다가 for direction change: often used with movement verbs', examples: '먼저 5번 버스를 타고 가다가 명동역에서 내리세요（先坐5路公交，中途在明洞站下车。）', examplesEn: 'First take bus No. 5, then get off at Myeongdong Station along the way.' },
      { type: 'usage', text: '-다가 动作中断', textEn: '-다가 for interrupted actions', examples: '똑바로 가다가 저기 백화점에서 내려 주세요（一直走，在那个百货店下）', examplesEn: 'Go straight, then get off at that department store.' },
      { type: 'note', text: '前后主语一致：-다가 前后主语必须是同一个人/物', textEn: 'Same subject: the subject before and after -다가 must be the same person/thing' },
      { type: 'note', text: '进阶提醒：动词过去式词干 + -다가（即 -았/었다가）意思完全不同——不是"途中"，而是"先做完 A，再转向/回头做 B"。가다가（去的路上、途中）和 갔다가（去了以后又…）只差一个字，意思两样。这节课先掌握"途中变化"的 -다가，완료형 -았/었다가 后面章节详学。', textEn: 'Advanced note: verb past stem + -다가 (i.e., -았/었다가) has a completely different meaning—not "in the middle of," but "finish A first, then switch/return to B." 가다가 (on the way) and 갔다가 (went and then...) differ by just one letter but mean different things. This lesson focuses on the "mid-action change" -다가; the completed form -았/었다가 is covered in detail later.', examples: '가다가 친구를 만났어요（去的路上遇见了朋友）↔ 학교에 갔다가 왔어요（去了学校又回来了）', examplesEn: 'I met a friend on the way ↔ I went to school and came back' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '공부하다가', role: 'verb' },
          { text: '잠들었어요', role: 'verb' },
        ],
        zh: '学着学着睡着了。', zhEn: 'Fell asleep while studying.',
        swapWords: ['공부하다가', '책을 읽다가', '단어를 외우다가'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '드라마를', role: 'object' },
          { text: '보다가', role: 'verb' },
          { text: '울었어요', role: 'verb' },
        ],
        zh: '看电视剧看着看着哭了。', zhEn: 'I was watching a drama and ended up crying.',
        swapWords: ['보다가 울었어요', '보다가 웃었어요', '보다가 잠들었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '听歌听着听着看了歌词。', zhEn: 'While listening to a song, I ended up looking at the lyrics.',
        swapWords: ['듣다가 가사를 봤어요', '듣다가 따라 했어요', '듣다가 저장했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '길을', role: 'object' },
          { text: '걷다가', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
        zh: '走路时遇见了朋友。', zhEn: 'Met a friend while walking.',
        swapWords: ['걷다가 친구를 만났어요', '걷다가 넘어졌어요', '걷다가 쉬었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '学习中断', contextEn: 'Study interrupted', ko: '공부하다가 잠들었어요.', zh: '学着学着睡着了。', zhEn: 'Fell asleep while studying.' },
      { icon: '😢', context: '看剧哭了', contextEn: 'Cried while watching a drama', ko: '드라마를 보다가 울었어요.', zh: '看剧看着看着哭了。', zhEn: 'I was watching a drama and ended up crying.' },
      { icon: '🎵', context: 'KPOP 学习', contextEn: 'Learning KPOP', ko: '노래를 듣다가 가사를 봤어요.', zh: '听歌听着听着看了歌词。', zhEn: 'While listening to a song, I ended up looking at the lyrics.' },
      { icon: '🚶', context: '路上偶遇', contextEn: 'Chance encounter on the way', ko: '길을 걷다가 친구를 만났어요.', zh: '走路时遇见了朋友。', zhEn: 'Met a friend while walking.' },
      { icon: '📖', context: '阅读切换', contextEn: 'Switched from reading', ko: '단어를 외우다가 문장을 읽었어요.', zh: '背单词背着背着去读句子了。', zhEn: 'I was memorizing words and ended up reading sentences.' },
      { icon: '😂', context: '意外发笑', contextEn: 'Unexpected laughter', ko: '공부하다가 웃겼어요.', zh: '学着学着觉得好笑。', zhEn: 'I was studying and found it funny.' },
    ],
    mistakes: [
      { wrong: '공부하다가 밥을 먹어요.', correct: '공부하고 밥을 먹어요.', note: '只想表达"先 A 后 B"的顺序时用 -고。-다가 暗示中途变化（学到一半改去吃饭），两种场景不同。', noteEn: 'Use -고 when you just want to say "A then B." -다가 implies a mid-action change (like studying then switching to eating), so the situations differ.' },
      { wrong: '듣다가 노래를 봤어요.', correct: '듣다가 가사를 봤어요.', note: '听歌时看歌词才合逻辑，보다 对象是 가사（歌词）；본 노래（看歌）语义不通。', noteEn: 'When listening to a song, it makes sense to look at the lyrics; 보다\'s object is 가사 (lyrics), while 본 노래 (watching a song) doesn\'t make sense.' },
      { wrong: '공부하다가 계속 공부했어요', correct: '공부하다가 잠들었어요', note: '-다가 后句应有变化、中断或意外，不能前后完全无关或单调延续。', noteEn: 'The clause after -다가 should involve a change, interruption, or surprise—not something completely unrelated or a monotonous continuation.' },
      { wrong: '먹고 그만뒀어요.', correct: '먹다가 그만뒀어요.', note: '表动作中途转换用 -다가，用 -고 会变成"做完再…"。', noteEn: 'Use -다가 for switching mid-action; -고 would mean "finish it, then..."' },
    ],
    quickTable: {
      title: '-다가 변형표',
      headers: ['词典形', '-다가', '例句'],
      rows: [
        ['보다 看', '보다가 看着看着', '드라마를 보다가 看着剧'],
        ['공부하다 学习', '공부하다가 学着学着', '공부하다가 잠들었어요'],
        ['듣다 听', '듣다가 听着听着', '노래를 듣다가 听着歌'],
        ['걷다 走路', '걷다가 走着走着', '길을 걷다가 走着路'],
        ['쓰다 写', '쓰다가 写着写着', '일기를 쓰다가 写着日记'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-다가 완성！</div>
  <div class='ov-sub'>做着做着发生变化，表达更生动</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-다가</span> 공부하다가 잠들었어요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>변화</span> 中断/切换/意外/情绪</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>不规则不适用</span> 듣다→듣다가</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>-고와 구분</span> -고（顺接完成）vs -다가（中途变化）</div>
</div>`,
    linkedGrammarIds: ['g41'],
  },

  {
    id: 'card-p5-l11',
    partNumber: 5,
    lessonNumber: 11,
    title: '综合练习⑤', titleEn: 'Comprehensive practice ⑤',
    whatItDoes: '第五章综合练习', whatItDoesEn: 'Chapter 5 Comprehensive Practice',
    whatItDoesBody: '综合运用第五章 L01-L10 所学语法：\n条件、否定、计划推测、纠正、冠词形、请求确认、交通出行、换乘、动作转换。', whatItDoesBodyEn: 'Apply everything from Chapter 5, Lessons 1-10: \\nconditions, negation, plans and speculation, corrections, adnominal forms, asking for confirmation, transportation, transfers, and action transitions.',
    isPractice: true,
    structureNote: '这是第五章的总复习。\n第五章的主线是"表达更立体"条件假设、否定辨析、修饰名词、出行交通，让你从说单句升级到说复杂情境。\n做题时想想每个语法点在真实对话里会出现在哪个场景。', structureNoteEn: 'This is the final review for Chapter 5. \\nThe theme is "expressing yourself more fully" — conditions, negation nuances, modifying nouns, and travel. It takes you from single sentences to complex situations. \\nAs you answer, think about where each grammar point would come up in real conversations.',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">第五章综合练习</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">条件、否定、计划、冠词形、交通出行——全部整合在一起。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">这章学了什么：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L01-L03</span> — 条件（-(으)면）、否定（안/못）、计划推测（-(으)려고 하다）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L04-L06</span> — 纠正否定（아니라）、冠词形（-는/은/을）、请求确认（주세요/-지요?）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">L07-L10</span> — 时间助词、交通（타다/(으)로）、换乘（갈아타다）、途中变化（-다가）</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">综合例句</div>
  <div style="margin-bottom:6px">한국어를 잘하려면 매일 공부하는 게 좋아요.</div>
  <div style="color:#89756e;font-size:16px">想把韩语学好，每天学习才好。（L01+L05综合）</div>
</div>
<div class="reminder-box">综合练习会混合本章所有语法点出题。不确定时回到对应课次复习。</div>`,
    compareLabel: '第五章要点速览', compareLabelEn: 'Chapter 5 Key Points Overview',
    structures: [
      {
        ko: '복습 범위：L01-L10 핵심 문법',
        zh: '复习范围：L01-L10 核心语法', zhEn: 'Review scope: L01-L10 core grammar',
        tokens: [
          { text: '복습', role: 'verb' },
          { text: 'L01–L10', role: 'plain' },
        ],
      },
      {
        ko: '한국어를 잘하려면 매일 공부하는 게 좋아요.',
        zh: '想把韩语学好，每天学习才好。', zhEn: 'If you want to get good at Korean, you should study every day.',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘하려면', role: 'verb' },
          { text: '매일', role: 'time' },
          { text: '공부하는 게', role: 'verb' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'L01 -(으)면：如果……；-(으)려면：想要……的话（目标条件）', textEn: 'L01 -(으)면: if...; -(으)려면: if you want to... (goal condition)', examples: '시간이 있으면 가요 / 잘하려면 매일 연습해야 해요' },
      { type: 'rule', text: 'L02 못/-지 못하다：客观做不到；안/-지 않다：主观不想做', textEn: 'L02 못/-지 못하다: can\'t (objective); 안/-지 않다: don\'t want to (subjective)', examples: '피곤해서 못 가요 / 오늘은 안 가요' },
      { type: 'rule', text: 'L03 -(으)려고 해요：打算做；아마 -을/ㄹ 거예요：大概会……', textEn: 'L03 -(으)려고 해요: plan to do; 아마 -을/ㄹ 거예요: probably will...', examples: '한국에 가려고 해요 / 아마 비가 올 거예요' },
      { type: 'rule', text: 'L04 이/가 아니라：不是……（名词纠正）；-는 게 아니라：不是在做……（动词纠正）', textEn: 'L04 이/가 아니라: not... (noun correction); -는 게 아니라: not doing... (verb correction)', examples: '학생이 아니라 선생님이에요 / 노는 게 아니라 공부해요' },
      { type: 'rule', text: 'L05 动词现在冠词形：-는；动词过去：-은/ㄴ；形容词：-은/ㄴ；将来：-을/ㄹ', textEn: 'L05 Verb present modifier: -는; verb past: -은/ㄴ; adjective: -은/ㄴ; future: -을/ㄹ', examples: '먹는 사람 / 먹은 음식 / 예쁜 꽃 / 먹을 것' },
      { type: 'rule', text: 'L06 -아/어/여 주세요：请帮我做；-지요?/-죠?：对吧？（确认）', textEn: 'L06 -아/어/여 주세요: please do for me; -지요?/-죠?: right? (confirmation)', examples: '도와주세요 / 한국 사람이지요?' },
      { type: 'rule', text: 'L07 전화번호：공（0）, 일이삼...으로 읽기；시간：에（时刻）/부터…까지（时段）', textEn: 'L07 Phone numbers: read as 공(0), 일이삼...; Time: 에 (point) /부터…까지 (duration)', examples: '010-1234-5678 / 세 시에 / 두 시부터 네 시까지' },
      { type: 'rule', text: 'L08 을/를 타다：乘坐；타고 가다/오다：坐着去/来；(으)로 가다：用某方式去', textEn: 'L08 을/를 타다: ride; 타고 가다/오다: go/come by riding; (으)로 가다: go by some means', examples: '지하철을 타요 / 버스를 타고 가요 / 택시로 가요' },
      { type: 'rule', text: 'L09 갈아타다：换乘；A에서 B로 갈아타다：从A换到B', textEn: 'L09 갈아타다: transfer; A에서 B로 갈아타다: transfer from A to B', examples: '지하철로 갈아타요 / 버스에서 지하철로 갈아타요' },
      { type: 'rule', text: 'L10 -다가：做A途中发生B（动作未完成就转变）', textEn: 'L10 -다가: B happens while doing A (action changes before completion)', examples: '공부하다가 잠들었어요 / 드라마를 보다가 울었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '노래를', role: 'object' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '如果有时间，就听歌。', zhEn: 'If I have time, I listen to music.',
        swapWords: ['있으면', '없으면', '많으면'],
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
        zh: '因为发音快，跟不上。', zhEn: 'Because the pronunciation is fast, I can\'t keep up.',
        swapWords: ['따라 하지 못해요', '이해하지 못해요', '외우지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '버스를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '坐公交然后换乘地铁。', zhEn: 'Take the bus and then transfer to the subway.',
        swapWords: ['지하철로 갈아타요', '버스로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '听歌听着听着看了歌词。', zhEn: 'While listening to a song, I ended up looking at the lyrics.',
        swapWords: ['듣다가 가사를 봤어요', '듣다가 따라 했어요', '듣다가 잠들었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习条件', contextEn: 'Study conditions', ko: '한국어를 잘하려면 매일 연습해야 해요.', zh: '想把韩语学好，就要每天练习。', zhEn: 'If you want to get good at Korean, you need to practice every day.' },
      { icon: '🎵', context: 'KPOP 跟唱', contextEn: 'KPOP Sing-Along', ko: '노래를 듣다가 가사를 봤어요.', zh: '听歌听着听着看了歌词。', zhEn: 'While listening to a song, I ended up looking at the lyrics.' },
      { icon: '🚇', context: '交通换乘', contextEn: 'Transportation transfers', ko: '버스에서 지하철로 갈아타요.', zh: '从公交换乘地铁。', zhEn: 'Transfer from the bus to the subway.' },
      { icon: '💬', context: '礼貌请求', contextEn: 'Polite request', ko: '다시 말해 주세요.', zh: '请再说一遍。', zhEn: 'Please say that again.' },
      { icon: '📖', context: '冠词修饰', contextEn: 'Modifier forms', ko: '오늘 배울 문법이 재미있어요.', zh: '今天要学的语法很有意思。', zhEn: 'The grammar we\'re learning today is really interesting.' },
      { icon: '🚫', context: '否定纠正', contextEn: 'Negative correction', ko: '외우는 게 아니라 이해해야 해요.', zh: '不是背，而是要理解。', zhEn: 'It\'s not about memorizing, but understanding.' },
    ],
    mistakes: [
      { wrong: '먹면 배불러요.', correct: '먹으면 배불러요.', note: 'L01：有收音用 -으면', noteEn: 'L01: Use -으면 with a final consonant' },
      { wrong: '날씨가 못 좋아요.', correct: '날씨가 안 좋아요.', note: 'L02：못 不接形容词', noteEn: 'L02: 못 doesn\'t go with adjectives' },
      { wrong: '먹려고 해요.', correct: '먹으려고 해요.', note: 'L03：有收音用 -으려고', noteEn: 'L03: Use -으려고 with a final consonant' },
      { wrong: '커피가 아니에요 차예요.', correct: '커피가 아니라 차예요.', note: 'L04：纠正对比用 아니라', noteEn: 'L04: Use 아니라 for correction/comparison' },
      { wrong: '좋는 노래', correct: '좋은 노래', note: 'L05：形容词用 -은/ㄴ，不用 -는', noteEn: 'L05: Adjectives use -은/ㄴ, not -는' },
      { wrong: '말하다 주세요.', correct: '말해 주세요.', note: 'L06：주세요 前先进行 아/어/여 变形', noteEn: 'L06: Conjugate with 아/어/여 before 주세요' },
      { wrong: '세 삼 시에 만나요.', correct: '세 시에 만나요.', note: 'L07：小时用固有数词', noteEn: 'L07: Use native numbers for hours' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'L08/L09：ㄹ 收音后用 로', noteEn: 'L08/L09: Use 로 after a ㄹ final consonant' },
      { wrong: '들다가 가사를 봤어요.', correct: '듣다가 가사를 봤어요.', note: 'L10：-다가 接续 ㄷ 不规则不触发', noteEn: 'L10: -다가 doesn\'t trigger the ㄷ irregular' },
      { wrong: '공부하다가 밥을 먹어요. (순서만)', correct: '공부하고 밥을 먹어요.', note: 'L10：只是顺序用 -고，中途变化才用 -다가', noteEn: 'L10: Use -고 for simple sequences, -다가 for mid-action changes' },
    ],
    compareHtml: `<div class="card-title">第五章核心对比速览</div>
<div class="card-body">第五章的主线是"条件、否定、交通、冠词修饰、请求、中途转变"。这几组最容易混淆，对比清楚就掌握了本章要点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-(으)면 vs -(으)려면</div><div style="font-size:16px;color:#89756e;margin-top:2px">条件 vs 目的条件</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 있으면 가요.</span><span style="font-size:16px;color:#5a4640">如果有时间就去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">잘하려면 연습해야 해요.</span><span style="font-size:16px;color:#5a4640">想做好的话要练习。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">안 vs 못</div><div style="font-size:16px;color:#89756e;margin-top:2px">主观不做 vs 客观不能</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">안 가요. （不想去）</span><span style="font-size:16px;color:#5a4640">主观选择不去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">못 가요. （不能去）</span><span style="font-size:16px;color:#5a4640">客观条件做不到。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">-고 vs -다가</div><div style="font-size:16px;color:#5a4640">-고：顺序完成再做下一个（먹고 가요 = 吃完再去）<br>-다가：做A做到一半，中途转变成B（먹다가 전화가 왔어요 = 正吃着电话来了）<br>区别：-고 前面动作已完成；-다가 前面动作未完成就中断。</div></div>
<div class="reminder-box">타다（乘坐）+ 갈아타다（换乘）：버스를 타고 지하철로 갈아타요。(으)로 表方向/工具，ㄹ收音后用 로（지하철로 ✓，지하철으로 ✗）。</div>`,
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>제5장 종합 연습 완성！</div>
  <div class='ov-sub'>第五章 10 课全部完成</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>조건</span> -(으)면 / -(으)려면</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>부정</span> 안/못 / 아니라</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>교통</span> 타다 / 갈아타다</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>冠词形</span> -는/-은ㄴ/-을ㄹ</div>
  <div class='ov-sec'><span class='badge' style='background:#c89020;color:white'>요청</span> -아/어/여 주세요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>전환</span> -다가</div>
</div>`,
    linkedGrammarIds: [],
  },
];
