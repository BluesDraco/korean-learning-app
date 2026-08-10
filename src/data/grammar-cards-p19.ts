import type { GrammarCard } from '@/types';

export const grammarCardsP19: GrammarCard[] = [
  {
    id: 'card-p19-l01',
    partNumber: 19,
    lessonNumber: 1,
    title: '-아/어/여다 주다/드리다',
    whatItDoes: '表示把某动作的结果转移或提供给他人', whatItDoesEn: 'Indicates transferring or providing the result of an action to someone',
    whatItDoesBody: '-아/어/여다 주다 表示做完某动作后把结果给对方，相当于"……给……/帮……做……"，比 -아/어/여 주다 多一层"把结果带来/带去"的移动感。\n-아/어/여다 드리다 是敬语形式，用于对长辈或地位高的人。\n常与"사다 주다（买来给）""가져다 주다（拿来给）""데려다 주다（送到）"等移动性动词搭配。', whatItDoesBodyEn: '-아/어/여다 주다 indicates doing an action and then giving the result to someone, equivalent to "...for.../do... for...", adding a sense of movement (bringing/taking the result) compared to -아/어/여 주다.\\n-아/어/여다 드리다 is the honorific form, used for elders or superiors.\\nOften used with verbs of movement like "사다 주다 (buy and give)", "가져다 주다 (bring and give)", "데려다 주다 (take someone)".',
    structureNote: '-아/어/여다 주다：动词词干 + 아/어/여다 주다\n词干元音为 ㅏ/ㅗ → 아다，其他 → 어다，하다 动词 → 여다（해다）\n-아/어/여다 드리다：주다 换成 드리다（尊敬）', structureNoteEn: '-아/어/여다 주다: verb stem + 아/어/여다 주다\\nIf stem vowel is ㅏ/ㅗ → 아다, otherwise → 어다, 하다 verbs → 여다 (해다)\\n-아/어/여다 드리다: replace 주다 with 드리다 (honorific)',
    rulesNote: '-아/어/여다 주다 vs -아/어 주다：前者带有把结果送过去的移动语气，后者只是单纯帮忙/服务。\n给长辈时把 주다 换成敬语 드리다：가져다 드리다，사다 드리다。', rulesNoteEn: '-아/어/여다 주다 vs -아/어 주다: the former has a nuance of sending the result over, the latter is just helping/serving.\\nFor elders, replace 주다 with honorific 드리다: 가져다 드리다, 사다 드리다.',
    scenarioNote: '-아/어/여다 주다 常与"사다 주다（买来给）""가져다 주다（拿来给）""데려다 주다（送去）"等移动性动词搭配。', scenarioNoteEn: '-아/어/여다 주다 is often used with verbs of movement like "사다 주다 (buy and give)", "가져다 주다 (bring and give)", "데려다 주다 (take someone)".',
    structures: [
      {
        ko: '동사 词干 + 아다/어다 주다',
        tokens: [
          { text: '물', role: 'object' },
          { text: ' 한 잔', role: 'plain' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 주세요', role: 'verb' },
        ],
        zh: '请给我拿一杯水来。', zhEn: 'Please bring me a glass of water.',
      },
      {
        ko: 'ㅏ/ㅗ 词干 + 아다 주다',
        tokens: [
          { text: '편의점에서', role: 'place' },
          { text: ' 빵', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '从便利店买了面包来给（我）。', zhEn: 'Bought bread from the convenience store and brought it (to me).',
      },
      {
        ko: '드리다（尊敬）',
        tokens: [
          { text: '할머니께', role: 'object' },
          { text: ' 약', role: 'object' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 드렸어요', role: 'verb' },
        ],
        zh: '把药拿去给奶奶了。', zhEn: 'I took the medicine to Grandma.',
      },
      {
        ko: '데려다 주다（送到）',
        tokens: [
          { text: '친구를', role: 'object' },
          { text: ' 집에', role: 'place' },
          { text: ' 데려다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '把朋友送到家了。', zhEn: 'I took my friend home.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 元音 词干 + 아다 주다', textEn: 'ㅏ/ㅗ vowel stem + 아다 주다', examples: '사다 주다（买来给），놓아다 주다（放好给）', examplesEn: '사다 주다 (to buy and give), 놓아다 주다 (to put away for)' },
      { type: 'rule', text: '그 외 元音 词干 + 어다 주다', textEn: 'Other vowel stems + 어다 주다', examples: '가져다 주다（拿来给），데려다 주다（带〔人〕过去），만들어다 주다（做好给）', examplesEn: '가져다 주다 (bring and give), 데려다 주다 (take someone there), 만들어다 주다 (make and give)' },
      { type: 'rule', text: '하다 动词 → 해다 주다', textEn: '하다 verbs → 해다 주다', examples: '준비해다 주다（准备好给），청소해다 주다（打扫好给）', examplesEn: '준비해다 주다 (to prepare and give), 청소해다 주다 (to clean up for)' },
      { type: 'compare', text: '-아/어다 주다 vs -아/어 주다：有无移动语感', textEn: '-아/어다 주다 vs -아/어 주다: with or without a sense of movement', examples: '사다 주다（买来给，有移动）vs 사 주다（买给，纯帮助）', examplesEn: '사다 주다 (buy and bring, with movement) vs 사 주다 (buy for, pure help)' },
      { type: 'note', text: '드리다：주다 的敬语，用于给长辈时', textEn: '드리다: honorific of 주다, used when giving to elders', examples: '선생님께 가져다 드렸어요（给老师拿去了），부모님께 사다 드려요（给父母买去）', examplesEn: '선생님께 가져다 드렸어요 (took it to the teacher), 부모님께 사다 드려요 (buy it for parents)' },
      { type: 'note', text: '데려다 주다：把人送到某处（移动性动词的常见搭配）', textEn: '데려다 주다: take someone to a place (common collocation with verbs of movement)', examples: '친구를 집에 데려다 줬어요（把朋友送到家），아이를 학교에 데려다 줘요（把孩子送到学校）', examplesEn: '친구를 집에 데려다 줬어요 (took my friend home), 아이를 학교에 데려다 줘요 (take the child to school)' },
      { type: 'compare', text: '中文"带"不分人和物，韩语必须分：送人用 데리다，拿物用 가지다，不能混用', textEn: 'In Chinese, \'bring/take\' doesn\'t distinguish people from things, but Korean must: use 데리다 for people, 가지다 for things—they can\'t be mixed.', examples: '친구를 데려다 줬어요（送朋友，人✓）vs 책을 가져다 줬어요（拿书来给，物✓）；사람에 가져다 주다 ✗、물건을 데려다 주다 ✗', examplesEn: 'Took a friend (person ✓) vs brought a book (thing ✓); 가져다 주다 with a person ✗, 데려다 주다 with a thing ✗' },
      { type: 'note', text: '注意被送的人是 데리다 的宾语，用 를；而 사다 주다 的收受者才用 한테/께', textEn: 'Note: the person being taken is the object of 데리다, marked with 를; only the recipient of 사다 주다 takes 한테/께.', examples: '친구를 데려다 줬어요（把朋友送到，친구+를）vs 친구한테 책을 사다 줬어요（给朋友买书，친구+한테）', examplesEn: '친구를 데려다 줬어요 (took my friend, 친구+를) vs 친구한테 책을 사다 줬어요 (bought a book for my friend, 친구+한테)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '동생이', role: 'subject' },
          { text: ' 학교에서', role: 'place' },
          { text: ' 그림을', role: 'object' },
          { text: ' 그려다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '弟弟/妹妹在学校画了画带来给我。', zhEn: 'My younger sibling drew a picture at school and brought it to me.',
        swapWords: ['가져다 줬어요', '만들어다 줬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아버지께서', role: 'subject' },
          { text: ' 시장에서', role: 'place' },
          { text: ' 과일을', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 주셨어요', role: 'verb' },
        ],
        zh: '父亲从市场买了水果来给（我）。', zhEn: 'My father bought fruit from the market and gave it to me.',
        swapWords: ['가져다 주셨어요', '사다 드렸어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '할머니께', role: 'object' },
          { text: ' 약을', role: 'object' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 드렸어요', role: 'verb' },
        ],
        zh: '把药拿去给奶奶了。', zhEn: 'I took the medicine to Grandma.',
        swapWords: ['사다 드렸어요', '만들어다 드렸어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아이를', role: 'object' },
          { text: ' 유치원에', role: 'place' },
          { text: ' 데려다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '把孩子送到幼儿园了。', zhEn: 'I took the child to kindergarten.',
        swapWords: ['데려다 드렸어요', '데려다 줄게요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🛒', context: '托人买东西', contextEn: 'Ask someone to buy something', ko: '오는 길에 우유 좀 사다 줘요.', zh: '来的路上帮我买点牛奶来。', zhEn: 'Buy me some milk on your way here.' },
      { icon: '👵', context: '孝敬长辈', contextEn: 'Respect and care for elders', ko: '어머니께 따뜻한 차를 끓여다 드렸어요.', zh: '给母亲泡了热茶端去了。', zhEn: 'I made hot tea for my mother and brought it to her.' },
      { icon: '📦', context: '取快递', contextEn: 'Pick up a package', ko: '택배가 왔길래 가져다 줬어요.', zh: '快递来了，所以帮你拿来了。', zhEn: 'The package arrived, so I brought it for you.' },
      { icon: '🏫', context: '送孩子', contextEn: 'Take the kids', ko: '아이를 학교에 데려다 줬어요.', zh: '把孩子送到学校了。', zhEn: 'I took the kids to school.' },
      { icon: '🍱', context: '带饭', contextEn: 'Pack a meal', ko: '점심에 도시락을 만들어다 줬어요.', zh: '午餐做了便当带来给了。', zhEn: 'I made a lunchbox and brought it for you.' },
      { icon: '🚗', context: '送人回家', contextEn: 'Walk someone home', ko: '친구를 집에 데려다 줬어요.', zh: '送朋友回家了。', zhEn: 'I walked my friend home.' },
    ],
    mistakes: [
      { wrong: '할머니께 사줬어요（给长辈用 주다）', wrongEn: '할머니께 사줬어요 (using 주다 for elders)', correct: '할머니께 사다 드렸어요', note: '给长辈要把 주다 换成敬语 드리다：사다 드렸어요（✓）。께 与 주다 搭配无法构成敬语。', noteEn: 'For elders, replace 주다 with the honorific 드리다: 사다 드렸어요 (✓). Using 께 with 주다 doesn\'t make it honorific.' },
      { wrong: '할머니께 가져다 줬어요（给长辈用 주다）', wrongEn: '할머니께 가져다 줬어요 (using 주다 for elders)', correct: '할머니께 가져다 드렸어요', note: '给长辈要用 드리다 代替 주다：가져다 드렸어요（✓）。께 与 주다 搭配无法构成敬语。', noteEn: 'For elders, use 드리다 instead of 주다: 가져다 드렸어요 (✓). Using 께 with 주다 doesn\'t make it honorific.' },
      { wrong: '가져다 줬드려요（주다 + 드리다 重复）', wrongEn: '가져다 줬드려요 (redundant 주다 + 드리다)', correct: '가져다 드렸어요', note: '주다 和 드리다 不能同时用。对长辈用 드리다，对平辈/晚辈只用 주다 一个。', noteEn: '주다 and 드리다 can\'t be used together. Use 드리다 for elders, and only 주다 for peers or those younger.' },
      { wrong: '사어다 줬어요（词干结合错误）', wrongEn: '사어다 줬어요 (incorrect stem combination)', correct: '사다 줬어요', note: '사다 是 사（ㅏ元音）+ 아다 → 사아다 → 缩约为 사다。사어다 是不存在的形式。', noteEn: '사다 is 사 (ㅏ vowel) + 아다 → 사아다 → contracted to 사다. 사어다 doesn\'t exist.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 주다/드리다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 커피 ___ 줘요。（来的路上帮我拿咖啡来。）', promptEn: '오는 길에 커피 ___ 줘요. (Bring me coffee on your way here.)',
          options: ['사어다', '사면', '사고', '사다'],
          answer: 3 as 0|1|2|3,
          explanation: '사다（사+아다 缩约）주다：사다 줘요（✓）。사어다 是不存在的形式，사고/사면 作为连接词尾不能与 주다 结合。', explanationEn: '사다 (contracted 사+아다) 주다: 사다 줘요 (✓). 사어다 doesn\'t exist, and 사고/사면 as connective endings can\'t combine with 주다.',
        },
        {
          prompt: '선생님께 자료를 가져다 ___。（把资料带给老师了。）', promptEn: '선생님께 자료를 가져다 ___. (I brought the materials to the teacher.)',
          options: ['드렸어요', '주셨어요', '드렸습니다요', '줬어요'],
          answer: 0 as 0|1|2|3,
          explanation: '선생님（长辈）께 → 드리다：가져다 드렸어요（✓）。줬어요 对长辈不合适，주셨어요 用于主语是老师时，드렸습니다요 是不存在的形式。', explanationEn: '선생님 (elder) 께 → 드리다: 가져다 드렸어요 (✓). 줬어요 is inappropriate for elders, 주셨어요 is used when the teacher is the subject, and 드렸습니다요 doesn\'t exist.',
        },
        {
          prompt: '물을 가져___ 주세요。（请给我拿点水来。）', promptEn: '물을 가져___ 주세요. (Please bring me some water.)',
          options: ['어다', '다', '고', '서'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어다 주다：가져（가지+어）+ 다 → 가져다 주세요（✓）。어다 会重复成 가져어다，고/서 作为连接词尾不能与 주다 结合成这个句型。', explanationEn: '-아/어다 주다: 가져 (가지+어) + 다 → 가져다 주세요 (✓). 어다 would repeat into 가져어다, and 고/서 as connective endings can\'t form this pattern with 주다.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['할머니께 가져다 줬어요（尊敬）', '사줬드려요', '친구 집에 데려다 줬어요', '가져어다 줬어요'],
          answer: 2 as 0|1|2|3,
          explanation: '데려다 줬어요：平辈关系用 데려다 주다（✓）。할머니께 要用 드렸어요，사줬드려요 是双重敬语，가져어다 是不存在的形式。', explanationEn: '데려다 줬어요: Use 데려다 주다 for peers (✓). For 할머니, use 드렸어요; 사줬드려요 is double honorific, 가져어다 is a non-existent form.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第1课</div>
    <div class="ov-hero-title">-아/어다 주다/드리다</div>
    <div class="ov-hero-sub">把……带来给/带去给 · 帮某人做并送达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">带来给</div>
      <div class="ko">动词 词干 + 아/어다 주다</div>
      <div class="zh">做完带来/带去给对方（有移动感）</div>
    </div>
    <div class="ov-block">
      <div class="badge">尊敬</div>
      <div class="ko">动词 词干 + 아/어다 드리다</div>
      <div class="zh">对长辈/上级使用 드리다</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">词干结合</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">ㅏ/ㅗ 元音</span>：사다 주다，놓아다 주다</div>
        <div><span style="font-weight:700">그 외 元音</span>：가져다 주다，만들어다 주다</div>
        <div><span style="font-weight:700">하다 动词</span>：준비해다 주다，청소해다 주다</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할머니께 가져다 줬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할머니께 가져다 드렸어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사어다 줬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사다 줬어요（사+아→사）</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">带来给……/带去给……</div>
<div class="card-body">不只是"帮忙做"，而是"做了之后带过来/过去"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">与 -아/어 주다 的区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아/어다 주다 — 有移动</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사다 줬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">买来给了（买了带来）。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-아/어 주다 — 纯帮助</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사 줬어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">买给了（帮买，无移动感）。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 사다/가져다/데려다 等常见组合先记住</div>
</div>
<div class="reminder-box">给长辈必须用 드리다：가져다 드렸어요。</div>`,
    compareHtml: `<div class="card-title">-아/어다 주다 vs -아/어 주다 vs 드리다</div>
<div class="card-body">三种形式的区别。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">把结果移动过去传达，移动语感强</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 줬어요</span><span style="font-size:16px;color:#5a4640">买来给了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">单纯服务/帮助，没有移动</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사 줬어요</span><span style="font-size:16px;color:#5a4640">买给了（帮买）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 드리다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">给长辈移动过去传达（敬语）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가져다 드렸어요</span><span style="font-size:16px;color:#5a4640">拿来给了（尊敬）</span></div>
  </div>
</div>`,
    compareLabel: '-아/어다 주다 vs -아/어 주다 vs 드리다',
    quickTable: {
      title: '-아/어다 주다 词干结合', titleEn: '-아/어다 주다 stem combination',
      headers: ['元音类型', '结合形', '例句'],
      rows: [
        ['ㅏ/ㅗ 元音', '+ 아다 주다', '사다 주다，놓아다 주다'],
        ['그 외 元音', '+ 어다 주다', '가져다 주다，만들어다 주다'],
        ['하다 动词', '+ 해다 주다', '준비해다 주다，청소해다 주다'],
        ['윗사람（尊敬）', '주다 → 드리다', '사다 드리다，가져다 드리다'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l02',
    partNumber: 19,
    lessonNumber: 2,
    title: '-아/어다 오다，주다（연속 동작）',
    whatItDoes: '表示做完某动作后来/回来，或连续动作', whatItDoesEn: 'Indicates coming/returning after doing an action, or a continuous action',
    whatItDoesBody: '-아/어다 오다 表示做完某事后来（到说话现场），相当于"做了……来了/带来了"，强调结果在此处。\n-아/어다 주다 在本课重点复习"拿来给"的移动方向区别：오다 强调向说话人方向移动，가다 强调离开说话人方向移动。\n两种表达的核心变量是移动方向：사다 오다（买来），사다 가다（买去）。', whatItDoesBodyEn: '-아/어다 오다 means coming (to the speaker\'s location) after doing something, like "did... and came/brought," emphasizing the result is here. \\n-아/어다 주다 in this lesson focuses on the direction difference in "bring to give": 오다 emphasizes movement toward the speaker, 가다 emphasizes movement away from the speaker. \\nThe core variable in both is direction: 사다 오다 (buy and come), 사다 가다 (buy and go).',
    structureNote: '动词 词干 + 아/어다 오다/가다\n词干 元音 ㅏ/ㅗ → 아다，그 외 → 어다\n方向：오다（向说话人）vs 가다（离开说话人）', structureNoteEn: 'Verb stem + 아/어다 오다/가다\\nStem vowel ㅏ/ㅗ → 아다, otherwise → 어다\\nDirection: 오다 (toward speaker) vs 가다 (away from speaker)',
    rulesNote: '-아/어다 오다 与 -아/어다 가다 的区别在于移动方向。以说话人位置为基准，判断结果物是过来还是过去。\n주다/드리다 与之结合时为 오다 系列：把结果带到说话人一方。', rulesNoteEn: 'The difference between -아/어다 오다 and -아/어다 가다 is the direction of movement. Based on the speaker\'s position, determine whether the result comes or goes. \\nWhen combined with 주다/드리다, it\'s the 오다 series: bringing the result to the speaker\'s side.',
    scenarioNote: '像"밥을 해다 오다（做了饭来）""빨래를 해다 가다（洗了衣服去）"这样，常出现在家务动作中。', scenarioNoteEn: 'Like "밥을 해다 오다 (cook and come)" or "빨래를 해다 가다 (do laundry and go)," these often appear in household actions.',
    structures: [
      {
        ko: '동사 词干 + 아/어다 오다',
        tokens: [
          { text: '마트에서', role: 'place' },
          { text: ' 고기', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '从超市买了肉来了。', zhEn: 'I bought meat from the supermarket and brought it here.',
      },
      {
        ko: '동사 词干 + 아/어다 가다',
        tokens: [
          { text: '도시락을', role: 'object' },
          { text: ' 만들어다', role: 'verb' },
          { text: ' 갔어요', role: 'verb' },
        ],
        zh: '做了便当去了（带去了）。', zhEn: 'I made a lunchbox and took it (with me).',
      },
      {
        ko: '아/어다 오다 vs 아/어다 가다 비교',
        tokens: [
          { text: '책을', role: 'object' },
          { text: ' 빌려다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
          { text: ' /', role: 'plain' },
          { text: ' 빌려다', role: 'verb' },
          { text: ' 갔어요', role: 'verb' },
        ],
        zh: '借了书来了 / 借了书去了。', zhEn: 'I borrowed a book and brought it here / took it there.',
      },
      {
        ko: '결과 이동 + 주다',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: ' 꽃을', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '朋友买了花来给了（我）。', zhEn: 'My friend bought flowers and gave them to me.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '词干 + 아/어다 오다：结果带向说话人一侧', textEn: 'Stem + 아/어다 오다: the result is brought toward the speaker\'s side', examples: '사다 오다（买了回来）、만들어다 오다（做了回来）、빌려다 오다（借了回来）', examplesEn: '사다 오다 (bought and came back), 만들어다 오다 (made and came back), 빌려다 오다 (borrowed and came back)' },
      { type: 'rule', text: '词干 + 아/어다 가다：结果带向说话人相反方向', textEn: 'Stem + 아/어다 가다: the result is taken away from the speaker\'s side', examples: '사다 가다（买了带去）、만들어다 가다（做了带去）、가져다 가다（拿了带去）', examplesEn: '사다 가다 (bought and took), 만들어다 가다 (made and took), 가져다 가다 (took and brought along)' },
      { type: 'compare', text: '오다 vs 가다：以说话人位置为基准的方向是关键', textEn: '오다 vs 가다: direction based on the speaker\'s position is key', examples: '빵을 사다 왔어요（买来了）vs 빵을 사다 갔어요（买去了）', examplesEn: '빵을 사다 왔어요 (bought bread and came) vs 빵을 사다 갔어요 (bought bread and went)' },
      { type: 'note', text: '-아/어다 주다：오다 方向，把结果传达给对方', textEn: '-아/어다 주다: in the 오다 direction, conveying the result to the other person', examples: '사다 줬어요，给过去（说话人→对方）', examplesEn: '사다 줬어요, gave (speaker → other person)' },
      { type: 'note', text: '하다 动词词干 + 해다 오다/가다', textEn: '하다 verb stem + 해다 오다/가다', examples: '준비해다 왔어요（准备好过来了），청소해다 갔어요（打扫好过去了）', examplesEn: '준비해다 왔어요 (prepared and came), 청소해다 갔어요 (cleaned and went)' },
      { type: 'compare', text: '-아/어다 오다 vs -아/어 오다：前者是"做完再移动"（结果被带来），后者是"一直……过来"的持续状态（第4课详解）', textEn: '-아/어다 오다 vs -아/어 오다: the former means \'do and then move\' (the result is brought), the latter means a continuous state of \'doing all along\' (detailed in Lesson 4)', examples: '사다 왔어요（买了带来）vs 먹어 왔어요（一直吃到现在）', examplesEn: '사다 왔어요 (bought and brought) vs 먹어 왔어요 (have been eating until now)' },
      { type: 'note', text: 'ㅏ/ㅗ 词干缩约后和原型长得一样，别看错：사다（原型"买"）和 사다（사+아다"买了…"）拼写相同，靠后面的 오다/가다/주다 才看得出是本课句型', textEn: 'After contraction, ㅏ/ㅗ stems look the same as the dictionary form—don\'t be fooled: 사다 (dictionary \'to buy\') and 사다 (사+아다 \'bought and...\') are spelled the same; only the following 오다/가다/주다 reveals this lesson\'s pattern.', examples: '사다（买）→ 사 + 아다 → 사다；만나다（见）→ 만나 + 아다 → 만나다', examplesEn: '사다 (to buy) → 사 + 아다 → 사다; 만나다 (to meet) → 만나 + 아다 → 만나다' },
      { type: 'note', text: '前一个动词固定为 아/어다，不随时态变化；时态只标在后面的 오다/가다', textEn: 'The first verb is fixed as 아/어다 and doesn\'t change with tense; tense is only marked on the following 오다/가다', examples: '사다 왔어요 ✓（不是 샀다 왔어요 ✗）；빌려다 갈 거예요 ✓', examplesEn: '사다 왔어요 ✓ (not 샀다 왔어요 ✗); 빌려다 갈 거예요 ✓' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '편의점에서', role: 'place' },
          { text: ' 커피를', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '从便利店买了咖啡来了。', zhEn: 'I bought coffee from the convenience store and brought it here.',
        swapWords: ['갔어요', '줬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '밥을', role: 'object' },
          { text: ' 해다', role: 'verb' },
          { text: ' 가지고', role: 'plain' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '做了饭带来了。', zhEn: 'I cooked and brought the food.',
        swapWords: ['만들어다 왔어요', '사다 왔어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: ' 선물을', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '朋友买了礼物来给了（我）。', zhEn: 'My friend bought a gift and gave it to me.',
        swapWords: ['가져다 줬어요', '만들어다 줬어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도서관에서', role: 'place' },
          { text: ' 책을', role: 'object' },
          { text: ' 빌려다', role: 'verb' },
          { text: ' 갔어요', role: 'verb' },
        ],
        zh: '从图书馆借了书去了。', zhEn: 'I borrowed a book from the library and took it there.',
        swapWords: ['빌려다 왔어요', '사다 갔어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🛍️', context: '购物回来', contextEn: 'Shopping and coming back', ko: '시장에서 채소를 사다 왔어요.', zh: '从市场买了蔬菜来了。', zhEn: 'Bought vegetables from the market and came.' },
      { icon: '🍱', context: '带便当去公司', contextEn: 'Bringing a lunchbox to work', ko: '아침에 도시락을 만들어다 갔어요.', zh: '早上做了便当带去了（公司）。', zhEn: 'Made a lunchbox in the morning and brought it to work.' },
      { icon: '🎁', context: '朋友送礼', contextEn: 'Friend giving a gift', ko: '친구가 케이크를 만들어다 줬어요.', zh: '朋友做了蛋糕带来给了（我）。', zhEn: 'A friend made a cake and brought it to me.' },
      { icon: '📚', context: '借书来看', contextEn: 'Borrowing a book to read', ko: '도서관에서 책을 빌려다 읽었어요.', zh: '从图书馆借了书来读了。', zhEn: 'Borrowed a book from the library and read it.' },
      { icon: '💊', context: '取药', contextEn: 'Pick up medication', ko: '약국에서 약을 사다 왔어요.', zh: '从药店买了药来了。', zhEn: 'Bought medicine from the pharmacy and came.' },
      { icon: '🚌', context: '方向区分', contextEn: 'Direction distinction', ko: '밥을 사다 오면 같이 먹어요.', zh: '买了饭来的话一起吃吧。', zhEn: 'If you buy food and come, let\'s eat together.' },
    ],
    mistakes: [
      { wrong: '마트에서 고기 사와요（사+아→사와，缩约后未接 오다）', wrongEn: 'At the mart, buying meat and coming (사+아→사와, contracted without 오다)', correct: '마트에서 고기 사다 와요', note: '-아/어다 오다 必须保持形式：사다 와요（✓）。사와요 是其他表达（사오다）的缩约形，意思相近但与本句型不同。', noteEn: '-아/어다 오다 must keep its form: 사다 와요 (✓). 사와요 is a contraction of another expression (사오다), similar in meaning but different from this pattern.' },
      { wrong: '빵을 사다 갔다 왔어요（与 갔다 오다 混淆）', wrongEn: 'Bought bread and went and came (confused with 갔다 오다)', correct: '빵을 사다 왔어요', note: '갔다 오다 是"去了回来"，사다 왔어요 是"买了来"。两种表达的结构和意思都不同。사다 왔어요 才是结果移动的表达。', noteEn: '갔다 오다 means \'went and came back,\' while 사다 왔어요 means \'bought and came.\' The structures and meanings are different. 사다 왔어요 is the expression for result movement.' },
      { wrong: '밥을 하다 왔어요（하다 动词直接用 하다）', wrongEn: 'Cooked rice and came (using 하다 directly with 하다 verb)', correct: '밥을 해다 왔어요', note: '하다 动词的 -아/어다 形式是 해다：해다 왔어요（✓）。直接用词干 하다 接 오다 是错误形式。', noteEn: 'The -아/어다 form of 하다 verbs is 해다: 해다 왔어요 (✓). Using the stem 하다 directly with 오다 is incorrect.' },
      { wrong: '친구한테 사다 드렸어요（朋友是平辈/晚辈关系）', wrongEn: 'Bought and gave to a friend (friend is peer/junior)', correct: '친구한테 사다 줬어요', note: '드리다 只用于长辈。像朋友这样的平辈关系用 주다：사다 줬어요（✓）。', noteEn: '드리다 is only for elders. For peers like friends, use 주다: 사다 줬어요 (✓).' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 오다/가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '마트에서 우유를 사다 ___。（从超市买了牛奶来了。—结果在说话人处）', promptEn: 'Bought milk at the mart and ___ (bought milk from the mart and came—result is at the speaker\'s location)',
          options: ['갔어요', '줬어요', '왔어요', '드렸어요'],
          answer: 2 as 0|1|2|3,
          explanation: '结果带向说话人一侧 → 오다：사다 왔어요（✓）。갔어요 是相反方向，줬어요 是传达，드렸어요 是敬语传达。', explanationEn: 'Result brought toward the speaker → 오다: 사다 왔어요 (✓). 갔어요 is the opposite direction, 줬어요 is giving, 드렸어요 is polite giving.',
        },
        {
          prompt: '도시락을 만들어다 ___。（做了便当带去了。—带去别处）', promptEn: 'Made a lunchbox and ___ (made a lunchbox and took it—took it elsewhere)',
          options: ['왔어요', '줬어요', '드렸어요', '갔어요'],
          answer: 3 as 0|1|2|3,
          explanation: '结果带向说话人相反方向 → 가다：만들어다 갔어요（✓）。왔어요 是说话人方向。', explanationEn: 'Result taken away from the speaker → 가다: 만들어다 갔어요 (✓). 왔어요 is toward the speaker.',
        },
        {
          prompt: '친구가 꽃을 사다 ___。（朋友买了花来给了我。—给说话人）', promptEn: 'A friend bought flowers and ___ (a friend bought flowers and gave them to me—to the speaker)',
          options: ['줬어요', '왔어요', '갔어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '把结果传达给对方（说话人）→ 주다：사다 줬어요（✓）。왔어요 是单纯移动，갔어요 是相反方向，드렸어요 用于长辈。', explanationEn: 'Giving the result to the other person (speaker) → 주다: 사다 줬어요 (✓). 왔어요 is simple movement, 갔어요 is the opposite direction, 드렸어요 is for elders.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['친구한테 사다 드렸어요（동등 관계）', '약국에서 약을 사다 왔어요', '마트에서 고기 사가다 왔어요', '밥을 하다 갔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '사다 왔어요：结果带向说话人一侧（✓）。사가다 왔어요 是不存在的形式，친구한테 드렸어요 不是对长辈，하다 갔어요 应为 해다 갔어요。', explanationEn: '사다 왔어요: Result brought toward the speaker (✓). 사가다 왔어요 is not a real form, 친구한테 드렸어요 is not for elders, 하다 갔어요 should be 해다 갔어요.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第2课</div>
    <div class="ov-hero-title">-아/어다 오다/가다</div>
    <div class="ov-hero-sub">买了来 vs 买了去 · 方向是关键</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课核心</div></div>
    <div class="ov-block">
      <div class="badge">买来</div>
      <div class="ko">词干 + 아/어다 오다</div>
      <div class="zh">做了带来（结果到说话人处）</div>
    </div>
    <div class="ov-block">
      <div class="badge">买去</div>
      <div class="ko">词干 + 아/어다 가다</div>
      <div class="zh">做了带去（结果离开说话人）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">方向区别</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>사다 <b style="color:#ff7fa8">왔어요</b>：从外面买了带来（在我这里）</div>
        <div>사다 <b style="color:#ff7fa8">갔어요</b>：买了带走（不在我这里）</div>
        <div>사다 <b style="color:#ff7fa8">줬어요</b>：买了给对方（传达）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">밥을 하다 왔어요（하다 直接接）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">밥을 해다 왔어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구한테 사다 드렸어요（平辈关系）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사다 줬어요</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">买了来 / 买了去</div>
<div class="card-body">方向决定用 오다 还是 가다。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">以说话人位置为基准</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">오다 — 结果来到我处</div>
      <div style="font-size:16px;font-weight:800;color:#241917">마트에서 고기 사다 왔어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">从超市买了肉来了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">가다 — 结果带去别处</div>
      <div style="font-size:16px;font-weight:800;color:#241917">도시락 만들어다 갔어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">做了便当带去了（公司）。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 오다 = 到我这里，가다 = 离开我这里</div>
</div>
<div class="reminder-box">하다 动词要用 해다：해다 왔어요（✓）하다 왔어요（✗）。</div>`,
    compareHtml: `<div class="card-title">-아/어다 오다 vs -아/어 오다 vs 갔다 오다</div>
<div class="card-body">看起来相似但含义不同的三个表达。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">把结果带来（买了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了来了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">持续变化（一直……来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부해 왔어요</span><span style="font-size:16px;color:#5a4640">一直学习到现在</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">갔다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">去了再回来（去了一趟）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">마트 갔다 왔어요</span><span style="font-size:16px;color:#5a4640">去超市转了一圈回来了</span></div>
  </div>
</div>`,
    compareLabel: '-아/어다 오다 vs -아/어 오다 vs 갔다 오다',
    quickTable: {
      title: '-아/어다 + 移动动词 方向 정리', titleEn: '-아/어다 + movement verb direction summary',
      headers: ['形式', '方向', '含义', '例句'],
      rows: [
        ['-아/어다 오다', '朝说话人一侧', '做完带来', '사다 왔어요，만들어다 왔어요'],
        ['-아/어다 가다', '朝说话人反向', '做完带走', '사다 갔어요，만들어다 갔어요'],
        ['-아/어다 주다', '给对方', '做完传达', '사다 줬어요，가져다 줬어요'],
        ['-아/어다 드리다', '给长辈', '做完传达（敬语）', '사다 드렸어요，가져다 드렸어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l03',
    partNumber: 19,
    lessonNumber: 3,
    title: '-다니요，-고 말고요',
    whatItDoes: '表示惊讶/反问，或强调"当然是/那还用说"', whatItDoesEn: 'Indicates surprise/rhetorical question, or emphasizes "of course/needless to say"',
    whatItDoesBody: '-다니요 用于对听到的内容表示惊讶、意外或质疑，相当于"竟然……？/……这是什么意思？"，是对前句信息的反应性追问。\n-고 말고요 用于强烈肯定对方的提议或疑问，相当于"当然……/那还用说……"，语气坚定积极。', whatItDoesBodyEn: '-다니요 is used to express surprise, shock, or doubt about what you heard, like "really...?/what do you mean...?", a reactive follow-up to previous info. \\n-고 말고요 strongly affirms the other\'s suggestion or question, like "of course.../needless to say...", firm and positive.',
    structureNote: '-다니요：动词/形容词基本形（终止形）+ 다니요，이다 → 이라니요，있다/없다 → 있다니요/없다니요\n-고 말고요：动词/形容词词干 + 고 말고요（无条件肯定）', structureNoteEn: '-다니요: verb/adjective base form (final) + 다니요, 이다 → 이라니요, 있다/없다 → 있다니요/없다니요\\n-고 말고요: verb/adjective stem + 고 말고요 (unconditional affirmation)',
    rulesNote: '-다니요 原样重复或引用对方的话语来表示惊讶，接近直接引用。\n-고 말고요 是对提问的强烈肯定，比"물론이죠"更带感情。可以单独使用，也可以接在句子后面。', rulesNoteEn: '-다니요 repeats or quotes the other\'s words as-is to show surprise, close to direct quotation. \\n-고 말고요 is a strong affirmation to a question, more emotional than "물론이죠". It can stand alone or follow a sentence.',
    scenarioNote: '-다니요 如"그게 사실이라니요！（那竟是真的？！）"，常用于震惊或难以置信的情境。\n-고 말고요 如"같이 가고 말고요！（当然一起去！）"，用于热情同意对方的建议。', scenarioNoteEn: '-다니요 like "그게 사실이라니요! (That\'s really true?!)", often used in shocking or unbelievable situations. \\n-고 말고요 like "같이 가고 말고요! (Of course I\'ll go!)", used to enthusiastically agree.',
    structures: [
      {
        ko: '동사 基本形 + 다니요',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: ' 떠났다니요？', role: 'verb' },
        ],
        zh: '那个人竟然走了？（表示惊讶）', zhEn: 'That person actually left? (expressing surprise)',
      },
      {
        ko: '이다 → 이라니요',
        tokens: [
          { text: '그게', role: 'subject' },
          { text: ' 사실이라니요？', role: 'verb' },
        ],
        zh: '那竟然是真的？！', zhEn: 'That was actually true?!',
      },
      {
        ko: '词干 + 고 말고요',
        tokens: [
          { text: '같이', role: 'plain' },
          { text: ' 가고 말고요！', role: 'verb' },
        ],
        zh: '当然一起去！', zhEn: 'Of course I\'ll go with you!',
      },
      {
        ko: '형용사 词干 + 고 말고요',
        tokens: [
          { text: '맛있고 말고요', role: 'verb' },
          { text: ' 정말', role: 'plain' },
          { text: ' 최고예요！', role: 'verb' },
        ],
        zh: '当然好吃，真的是最棒的！', zhEn: 'Of course it\'s delicious, it\'s really the best!',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词基本形 + 다니요（惊讶/反问）', textEn: 'Verb/adjective basic form + 다니요 (surprise/rhetorical question)', examples: '떠났다니요，좋다니요，먹었다니요' },
      { type: 'rule', text: '이다 → 이라니요，아니다 → 아니라니요', examples: '학생이라니요，사실이라니요，선생님이라니요' },
      { type: 'note', text: '-다니요 是引用对方话语的形式：原样重复听到的内容并表示惊讶', textEn: '-다니요 is a form that quotes the other person\'s words: repeating what you heard as-is and expressing surprise', examples: 'A：그 사람 떠났대요。 B：떠났다니요？' },
      { type: 'rule', text: '关键陷阱：现在时动词不能用原型直接加 다니요，要先变成"한다体"陈述形（-ㄴ/는다）再加 니요', textEn: 'Key trap: Present-tense verbs can\'t take 다니요 directly from the base form; first change to the "한다-style" declarative form (-ㄴ/는다) then add 니요', examples: '가다 → 간다니요（竟然去？），먹다 → 먹는다니요（竟然吃？）；가다니요 ✗', examplesEn: '가다 → 간다니요 (actually going?), 먹다 → 먹는다니요 (actually eating?); 가다니요 ✗' },
      { type: 'note', text: '按四种情况分别接：现在动词 -ㄴ/는다니요、形容词 -다니요、过去 -았/었다니요、名词+이다 -(이)라니요。这套变形和"间接引用"陈述形一致（后面章节详学）', textEn: 'Attach according to four cases: present verbs -ㄴ/는다니요, adjectives -다니요, past -았/었다니요, nouns+이다 -(이)라니요. This set of conjugations matches the "indirect quotation" declarative form (covered in detail in later chapters)', examples: '간다니요 / 좋다니요 / 떠났다니요 / 학생이라니요' },
      { type: 'rule', text: '动词/形容词词干 + 고 말고요（强烈肯定）', textEn: 'Verb/adjective stem + 고 말고요 (strong affirmation)', examples: '가고 말고요（当然去），좋고 말고요（当然好），먹고 말고요（当然吃）', examplesEn: '가고 말고요 (of course go), 좋고 말고요 (of course good), 먹고 말고요 (of course eat)' },
      { type: 'compare', text: '-고 말고요 vs 물론이죠：고 말고요 更口语化、感情更强', textEn: '-고 말고요 vs 물론이죠: 고 말고요 is more colloquial and emotionally stronger', examples: '물론이죠（礼貌肯定）vs 가고 말고요（热情同意）', examplesEn: '물론이죠 (polite affirmation) vs 가고 말고요 (enthusiastic agreement)' },
      { type: 'note', text: '-고 말고요 可以单独使用（表示理所当然的意思）', textEn: '-고 말고요 can be used alone (meaning "of course")', examples: 'A：이거 맛있어요？ B：맛있고 말고요！' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '회사를', role: 'object' },
          { text: ' 그만뒀다니요？', role: 'verb' },
          { text: ' 믿을 수가 없어요', role: 'plain' },
        ],
        zh: '竟然辞职了？难以置信。', zhEn: 'He actually quit? Unbelievable.',
        swapWords: ['떠났다니요？', '결혼했다니요？'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그게', role: 'subject' },
          { text: ' 거짓말이라니요？', role: 'verb' },
          { text: ' 저는', role: 'subject' },
          { text: ' 진짜인 줄 알았어요', role: 'plain' },
        ],
        zh: '那竟然是谎言？我以为是真的。', zhEn: 'That was actually a lie? I thought it was true.',
        swapWords: ['사실이라니요？', '농담이라니요？'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도와드리고', role: 'verb' },
          { text: ' 말고요', role: 'plain' },
          { text: ' 언제든지', role: 'plain' },
          { text: ' 연락하세요', role: 'verb' },
        ],
        zh: '当然帮您，随时联系我。', zhEn: 'Of course I\'ll help you, contact me anytime.',
        swapWords: ['가고 말고요', '먹고 말고요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '재미있고', role: 'verb' },
          { text: ' 말고요', role: 'plain' },
          { text: ' 한번 더', role: 'plain' },
          { text: ' 볼 거예요', role: 'verb' },
        ],
        zh: '当然有趣，要再看一遍。', zhEn: 'Of course it was fun, I want to watch it again.',
        swapWords: ['맛있고 말고요', '좋고 말고요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😱', context: '听到意外消息', contextEn: 'Hearing unexpected news', ko: '그 사람이 결혼했다니요？ 정말요？', zh: '那个人竟然结婚了？真的吗？', zhEn: 'That person actually got married? Really?' },
      { icon: '🤔', context: '质疑信息', contextEn: 'Questioning information', ko: '그게 사실이라니요？ 믿기 어렵네요.', zh: '那竟然是真的？很难相信啊。', zhEn: 'That\'s actually true? Hard to believe.' },
      { icon: '👍', context: '热情赞同', contextEn: 'Enthusiastic agreement', ko: 'A：같이 가요？ B：가고 말고요！', zh: 'A：一起去吗？ B：当然去！', zhEn: 'A: Want to go together? B: Of course!' },
      { icon: '😋', context: '力推美食', contextEn: 'Food recommendation', ko: '맛있고 말고요, 꼭 먹어 봐요!', zh: '当然好吃，一定要尝尝！', zhEn: 'Of course it\'s delicious, you have to try it!' },
      { icon: '😤', context: '对价格惊讶', contextEn: 'Surprised by the price', ko: '이게 10만 원이라니요？ 너무 비싸요！', zh: '这竟然要10万韩元？太贵了！', zhEn: 'This costs 100,000 won? Too expensive!' },
      { icon: '🤝', context: '爽快答应', contextEn: 'Agree readily', ko: '도와드리고 말고요，제가 할게요！', zh: '当然帮您，我来做！', zhEn: 'Of course I\'ll help, I\'ll do it!' },
    ],
    mistakes: [
      { wrong: '그게 사실이다니요？（이다 + 다니요 直接相连）', wrongEn: 'That\'s actually true? (이다 + 다니요 directly connected)', correct: '그게 사실이라니요？', note: '이다 与 다니요 的结合形是 이라니요。이다니요 是病句。이다 词干后加 라니요：이라니요（✓）。', noteEn: 'The combined form of 이다 and 다니요 is 이라니요. 이다니요 is incorrect. Add 라니요 to the 이다 stem: 이라니요 (✓).' },
      { wrong: '이다니요（이다 + 다니요 直接相连）', wrongEn: '이다니요 (이다 + 다니요 directly connected)', correct: '이라니요', note: '이다 与 다니요 的结合形是 이라니요。이다니요 是病句。이다 词干后加 라니요。', noteEn: 'The combined form of 이다 and 다니요 is 이라니요. 이다니요 is incorrect. Add 라니요 to the 이다 stem.' },
      { wrong: '학생고 말고요（名词后漏了 이）', wrongEn: '학생고 말고요 (missing 이 after the noun)', correct: '학생이고 말고요', note: '名词 + 이다 → 이고 말고요：학생이고 말고요（当然是学生）（✓）。名词后不能省略 이 直接接 고 말고요。', noteEn: 'Noun + 이다 → 이고 말고요: 학생이고 말고요 (Of course he\'s a student) (✓). You can\'t omit 이 after a noun and directly attach 고 말고요.' },
      { wrong: 'A：맛있어요？ B：맛있다니요（强烈肯定时用了 다니요）', wrongEn: 'A: Is it delicious? B: 맛있다니요 (used 다니요 for strong affirmation)', correct: '맛있고 말고요', note: '-다니요 用于惊讶/反问。强烈肯定要用 -고 말고요。맛있다니요 是"竟然好吃？"的意思，会变成疑惑的反应。', noteEn: '-다니요 is used for surprise/rhetorical questions. For strong affirmation, use -고 말고요. 맛있다니요 means "It\'s delicious?" and becomes a doubtful reaction.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-다니요，-고 말고요',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람이 회사를 그만___요？（那个人竟然辞职了？—表惊讶）', promptEn: '그 사람이 회사를 그만___요? (That person quit the company? — expressing surprise)',
          options: ['뒀고 말고', '뒀다니', '뒀잖아', '뒀거든'],
          answer: 1 as 0|1|2|3,
          explanation: '-다니요：惊讶/反问：그만뒀다니요（✓）。고 말고요 是强烈肯定，거든요 是背景说明，잖아요 是唤起共享信息的注意。', explanationEn: '-다니요: surprise/rhetorical: 그만뒀다니요 (✓). 고 말고요 is strong affirmation, 거든요 is background explanation, 잖아요 is drawing attention to shared information.',
        },
        {
          prompt: '그게 거짓말___요？ 저는 진짜인 줄 알았어요。（那竟然是谎言？）', promptEn: '그게 거짓말___요? 저는 진짜인 줄 알았어요. (That was a lie? I thought it was real.)',
          options: ['이다니', '이고 말고', '이라니', '이거든'],
          answer: 2 as 0|1|2|3,
          explanation: '이다（名词+이다）+ 다니요 → 이라니요（✓）。이다니요 是病句，이고 말고요 是强烈肯定，이거든요 是说明。', explanationEn: '이다 (noun+이다) + 다니요 → 이라니요 (✓). 이다니요 is incorrect, 이고 말고요 is strong affirmation, 이거든요 is explanation.',
        },
        {
          prompt: 'A：같이 영화 볼래요？ B：보___ 말고요！（当然看！）', promptEn: 'A: 같이 영화 볼래요? B: 보___ 말고요! (Of course I\'ll watch!)',
          options: ['고', '잖아', '거든', '다니'],
          answer: 0 as 0|1|2|3,
          explanation: '-고 말고요：强烈肯定/同意：보고 말고요（✓）。다니요 是惊讶，거든요 是说明，잖아요 是唤起注意。', explanationEn: '-고 말고요: strong affirmation/agreement: 보고 말고요 (✓). 다니요 is surprise, 거든요 is explanation, 잖아요 is drawing attention.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['학생고 말고요', '그게 사실이다니요？', '도와드리다니요！（强烈肯定）', '그게 사실이라니요？'],
          answer: 3 as 0|1|2|3,
          explanation: '이다 + 다니요 → 이라니요：사실이라니요（✓）。이다니요 是病句，强烈肯定要用 고 말고요，名词后须加 이（학생이고 말고요），도와드리다 强烈肯定应为 도와드리고 말고요。', explanationEn: '이다 + 다니요 → 이라니요: 사실이라니요 (✓). 이다니요 is incorrect, use 고 말고요 for strong affirmation, add 이 after nouns (학생이고 말고요), and the strong affirmation of 도와드리다 should be 도와드리고 말고요.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第3课</div>
    <div class="ov-hero-title">-다니요，-고 말고요</div>
    <div class="ov-hero-sub">竟然……？ · 当然……！</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">竟然？</div>
      <div class="ko">基本形/过去形 + 다니요</div>
      <div class="zh">表惊讶/反问（对听到的内容）</div>
    </div>
    <div class="ov-block">
      <div class="badge">当然！</div>
      <div class="ko">词干 + 고 말고요</div>
      <div class="zh">强烈肯定（那还用说）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">注意</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">이다</span> + 다니요 → <b style="color:#ff7fa8">이라니요</b>（不是 이다니요）</div>
        <div><span style="font-weight:700">名词</span> + 이고 말고요：학생<b style="color:#ff7fa8">이</b>고 말고요（이 不能省）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사실이다니요？</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사실이라니요？</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있다니요！（강한 肯定）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있고 말고요！</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">竟然？ / 当然！</div>
<div class="card-body">一个表示惊讶追问，一个表示热情肯定，语气完全相反。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">感情色彩完全不同</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-다니요 — 惊讶/反问</div>
      <div style="font-size:16px;font-weight:800;color:#241917">결혼했다니요？</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">竟然结婚了？</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-고 말고요 — 强烈肯定</div>
      <div style="font-size:16px;font-weight:800;color:#241917">가고 말고요！</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">当然去！</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 이다 뒤에는 이라니요（이다니요 X）</div>
</div>
<div class="reminder-box">다니요 = 惊讶追问，고 말고요 = 强烈肯定，不能混用。</div>`,
    compareHtml: `<div class="card-title">-다니요 vs -잖아요 / -고 말고요 vs 물론이죠</div>
<div class="card-body">与功能相似的其他表达对比。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-다니요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">惊讶/反问，重复对方话语</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀다니요？</span><span style="font-size:16px;color:#5a4640">竟然辞职了？</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-잖아요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">唤起共享信息的注意（没有惊讶）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀잖아요</span><span style="font-size:16px;color:#5a4640">不是辞职了嘛（你知道的）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 말고요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强烈的口语化肯定</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가고 말고요！</span><span style="font-size:16px;color:#5a4640">当然去！（热情）</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">물론이죠</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">礼貌的肯定，正式文体</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">물론이죠，가겠습니다</span><span style="font-size:16px;color:#5a4640">当然，我去（正式）</span></div>
  </div>
</div>`,
    compareLabel: '-다니요 vs -잖아요 / -고 말고요 vs 물론이죠',
    quickTable: {
      title: '-다니요 / -고 말고요 정리',
      headers: ['词尾', '功能', '接续', '例句'],
      rows: [
        ['-다니요', '惊讶/反问', '接基本形/过去形后', '떠났다니요，좋다니요'],
        ['이라니요', '이다 后的特殊形', '이다 → 이라니요', '사실이라니요，학생이라니요'],
        ['-고 말고요', '强烈肯定', '词干 + 고 말고요', '가고 말고요，맛있고 말고요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l04',
    partNumber: 19,
    lessonNumber: 4,
    title: '-아/어 오다，-아/어 가다',
    whatItDoes: '表示状态/动作从过去持续到现在，或向未来延续', whatItDoesEn: 'Indicates a state/action continuing from the past to now, or extending into the future',
    whatItDoesBody: '-아/어 오다 表示某状态或动作从过去持续到现在，相当于"一直……到现在/……起来了"，强调变化的到达点是当下。\n-아/어 가다 表示某状态或动作从现在向未来延续，相当于"越来越……/逐渐……下去"，强调变化的方向是未来。\n两种表达的核心是时间方向：오다（过去→现在），가다（现在→未来）。', whatItDoesBodyEn: '-아/어 오다 means a state or action has continued from the past to now, like "have been... until now/...has come about," emphasizing the arrival point is the present. \\n-아/어 가다 means a state or action continues from now into the future, like "increasingly.../gradually... on," emphasizing the direction is the future. \\nThe core of both is time direction: 오다 (past→present), 가다 (present→future).',
    structureNote: '动词/形容词词干 + 아/어 오다（过去→现在）\n动词/形容词词干 + 아/어 가다（现在→未来）\n词干元音 ㅏ/ㅗ → 아，其他 → 어，하다 → 해', structureNoteEn: 'Verb/adjective stem + 아/어 오다 (past→present)\\nVerb/adjective stem + 아/어 가다 (present→future)\\nStem vowel ㅏ/ㅗ → 아, otherwise → 어, 하다 → 해',
    rulesNote: '-아/어 오다 主要与"지금까지"搭配，表示过去的持续。\n-아/어 가다 与"점점""서서히"等搭配，表示朝未来方向的变化。', rulesNoteEn: '-아/어 오다 mainly pairs with "지금까지," indicating past continuation. \\n-아/어 가다 pairs with "점점" or "서서히," indicating change toward the future.',
    scenarioNote: '像"한국어를 배워 오다（一直在学韩语）" vs "한국어 실력이 늘어 가다（韩语水平在提高）"，即使是同一主题，时间方向也不同。', scenarioNoteEn: 'Like "한국어를 배워 오다 (have been learning Korean)" vs "한국어 실력이 늘어 가다 (Korean skills are improving)," even with the same topic, the time direction differs.',
    structures: [
      {
        ko: '词干 + 아/어 오다（过去→现在）',
        tokens: [
          { text: '10년 동안', role: 'time' },
          { text: ' 이 일을', role: 'object' },
          { text: ' 해', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '10年来一直做这个工作。', zhEn: 'I\'ve been doing this job for 10 years.',
      },
      {
        ko: '词干 + 아/어 가다（现在→未来）',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 추워', role: 'verb' },
          { text: ' 가요', role: 'verb' },
        ],
        zh: '天气越来越冷了。', zhEn: 'The weather is getting colder and colder.',
      },
      {
        ko: '변화 오다（상태 변화 到达）',
        tokens: [
          { text: '한국어', role: 'plain' },
          { text: ' 실력이', role: 'subject' },
          { text: ' 많이', role: 'plain' },
          { text: ' 늘어', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '韩语水平提高了很多（到现在）。', zhEn: 'My Korean has improved a lot (up to now).',
      },
      {
        ko: '변화 가다（상태 변화 进行）',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 커', role: 'verb' },
          { text: ' 가고 있어요', role: 'verb' },
        ],
        zh: '孩子正在渐渐长大。', zhEn: 'The child is gradually growing up.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 词干 + 아 오다/가다', textEn: 'ㅏ/ㅗ stem + 아 오다/가다', examples: '살아 오다（一直活到现在），알아 오다（一直了解至今），좋아 가다（渐渐变好）', examplesEn: '살아 오다 (have lived up to now), 알아 오다 (have known up to now), 좋아 가다 (gradually getting better)' },
      { type: 'rule', text: '그 외 词干 + 어 오다/가다', textEn: 'Other stems + 어 오다/가다', examples: '배워 오다（一直学到现在），늘어 오다（一直增长至今），커 가다（渐渐长大），줄어 가다（渐渐减少）', examplesEn: '배워 오다 (have been learning up to now), 늘어 오다 (has been increasing up to now), 커 가다 (gradually growing), 줄어 가다 (gradually decreasing)' },
      { type: 'compare', text: '-아/어 오다 vs -아/어 가다：时间方向相反', textEn: '-아/어 오다 vs -아/어 가다: opposite time directions', examples: '살아 왔어요（一直生活到现在）vs 살아 갈 거예요（以后继续生活）', examplesEn: '살아 왔어요 (have lived up to now) vs 살아 갈 거예요 (will continue to live)' },
      { type: 'note', text: '-아/어 오다 与"지금까지"呼应，表示过去→现在的持续', textEn: '-아/어 오다 pairs with "지금까지" to show continuation from past to present', examples: '지금까지 참아 왔어요（一直忍到现在），10년간 해 왔어요（做了十年了）', examplesEn: '지금까지 참아 왔어요 (have endured up to now), 10년간 해 왔어요 (have done it for 10 years)' },
      { type: 'note', text: '-아/어 가다 与"점점/서서히"呼应，表示现在→将来的变化', textEn: '-아/어 가다 pairs with "점점/서서히" to show change from present to future', examples: '점점 좋아 가요（渐渐好起来），서서히 나아 가고 있어요（慢慢在康复）', examplesEn: '점점 좋아 가요 (gradually getting better), 서서히 나아 가고 있어요 (slowly recovering)' },
      { type: 'compare', text: '-아/어 오다 vs -아/어다 오다：前者是持续，后者是结果移动', textEn: '-아/어 오다 vs -아/어다 오다: the former is continuation, the latter is result movement', examples: '배워 왔어요（一直在学）vs 사다 왔어요（买了来）', examplesEn: '배워 왔어요 (have been learning) vs 사다 왔어요 (bought and came)' },
      { type: 'note', text: '这里的 오다/가다 是"过程沿时间轴的方向"，不是物理的"来/去"，别硬翻：오다≈一直……到现在，가다≈越来越……/……下去', textEn: 'Here 오다/가다 indicates direction along the time axis, not physical coming/going. Don\'t translate literally: 오다 ≈ have been ... up to now, 가다 ≈ gradually ... / keep ...ing', examples: '견뎌 왔어요（一路撑到现在，不是"撑来了"），나빠져 가요（越来越糟下去，不是"坏去了"）', examplesEn: '견뎌 왔어요 (have endured all the way to now, not "endured here"), 나빠져 가요 (getting worse and worse, not "went bad")' },
      { type: 'note', text: '时态搭配陷阱：오다 惯用过去/完成形（强调累积到现在），가다 惯用现在/进行形（强调正朝将来推进）', textEn: 'Tense pairing trap: 오다 is commonly used with past/perfect forms (emphasizing accumulation up to now), 가다 with present/progressive forms (emphasizing progression toward the future)', examples: '지금까지 해 왔어요 ✓（很少说 해 와요）；점점 좋아 가요 / 좋아 가고 있어요 ✓', examplesEn: '지금까지 해 왔어요 ✓ (rarely 해 와요); 점점 좋아 가요 / 좋아 가고 있어요 ✓' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금까지', role: 'time' },
          { text: ' 열심히', role: 'plain' },
          { text: ' 공부해', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '到现在一直努力学习。', zhEn: 'I\'ve been studying hard up to now.',
        swapWords: ['해 왔어요', '노력해 왔어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 따뜻해', role: 'verb' },
          { text: ' 가고 있어요', role: 'verb' },
        ],
        zh: '天气正在渐渐变暖。', zhEn: 'The weather is gradually getting warmer.',
        swapWords: ['추워 가고 있어요', '좋아 가고 있어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어 실력이', role: 'subject' },
          { text: ' 많이', role: 'plain' },
          { text: ' 늘어', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '韩语水平提高了很多（到现在）。', zhEn: 'My Korean has improved a lot (up to now).',
        swapWords: ['좋아져 왔어요', '발전해 왔어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 커', role: 'verb' },
          { text: ' 가고 있어요', role: 'verb' },
        ],
        zh: '孩子正在渐渐长大。', zhEn: 'The child is gradually growing up.',
        swapWords: ['자라 가고 있어요', '변해 가고 있어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '坚持学习', contextEn: 'Keep studying', ko: '3년간 한국어를 배워 왔어요.', zh: '3年来一直在学韩语。', zhEn: 'I\'ve been learning Korean for 3 years.' },
      { icon: '🌡️', context: '气候变化', contextEn: 'Climate change', ko: '지구가 점점 더워져 가고 있어요.', zh: '地球正在越来越变暖。', zhEn: 'The Earth is getting warmer and warmer.' },
      { icon: '💪', context: '健康改善', contextEn: 'Health improvement', ko: '꾸준히 운동해서 건강해져 왔어요.', zh: '坚持运动，健康起来了。', zhEn: 'I kept exercising and got healthier.' },
      { icon: '🌱', context: '成长', contextEn: 'growth', ko: '그 회사가 서서히 커 가고 있어요.', zh: '那家公司正在慢慢壮大。', zhEn: 'That company is slowly growing.' },
      { icon: '❤️', context: '感情深厚', contextEn: 'Deep bond', ko: '오래 알아 오면서 더 친해졌어요.', zh: '长时间认识下来变得更亲密了。', zhEn: 'We\'ve known each other for a long time and become closer.' },
      { icon: '🌅', context: '未来期待', contextEn: 'Looking forward to the future', ko: '앞으로도 열심히 해 갈 거예요.', zh: '今后也会继续努力下去。', zhEn: 'I\'ll keep working hard from now on.' },
    ],
    mistakes: [
      { wrong: '공부해 갔어요（过去持续用了 가다）', wrongEn: '공부해 갔어요 (used 가다 for past continuation)', correct: '공부해 왔어요', note: '从过去到现在的持续用 -아/어 오다。-아/어 가다 是从现在朝将来的方向：지금까지 공부해 왔어요（✓）。', noteEn: 'Continuation from past to present uses -아/어 오다. -아/어 가다 is directed from present toward future: 지금까지 공부해 왔어요 (✓).' },
      { wrong: '날씨가 추워 왔어요（将来变化用了 오다）', wrongEn: '날씨가 추워 왔어요 (used 오다 for future change)', correct: '날씨가 추워 가요', note: '现在正在进行的朝将来方向的变化用 -아/어 가다：추워 가요（✓）。추워 왔어요 表示从过去到现在变冷的结果。', noteEn: 'Changes happening now toward the future use -아/어 가다: 추워 가요 (✓). 추워 왔어요 indicates the result of getting colder from past to present.' },
      { wrong: '사다 와요（与 -아/어다 오다 混淆）', wrongEn: '사다 와요 (confused with -아/어다 오다)', correct: '사다 왔어요（结果移动）vs 사 왔어요（无持续含义）', correctEn: '사다 왔어요 (resultative movement) vs 사 왔어요 (no continuation meaning)', note: '-아/어 오다（持续）与 -아/어다 오다（结果移动）结构不同。持续表达用 어 오다，结果移动用 어다 오다。', noteEn: '-아/어 오다 (continuation) and -아/어다 오다 (resultative movement) have different structures. Use 어 오다 for continuation, 어다 오다 for resultative movement.' },
      { wrong: '점점 좋아 왔어요（现在进行的变化用了 오다）', wrongEn: '점점 좋아 왔어요 (used 오다 for ongoing change)', correct: '점점 좋아 가고 있어요', note: '与"점점"搭配、现在正在进行的变化，用 -아/어 가다 更自然：좋아 가고 있어요（✓）。좋아 왔어요 是过去累积的结果。', noteEn: 'With "점점" and an ongoing change, -아/어 가다 is more natural: 좋아 가고 있어요 (✓). 좋아 왔어요 is the accumulated result of the past.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어 오다，-아/어 가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '10년간 이 회사에서 일해 ___。（10年来一直在这家公司工作。）', promptEn: '10년간 이 회사에서 일해 ___. (I\'ve been working at this company for 10 years.)',
          options: ['갔어요', '왔어요', '가고 왔어요', '왔다 갔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '从过去到现在的持续 → -아/어 오다：일해 왔어요（✓）。갔어요 是将来方向，왔다 갔어요/가고 왔어요 是不存在的形式。', explanationEn: 'Continuation from past to present → -아/어 오다: 일해 왔어요 (✓). 갔어요 is future direction; 왔다 갔어요/가고 왔어요 are non-existent forms.',
        },
        {
          prompt: '날씨가 점점 따뜻해 ___。（天气越来越暖了。—现在进行中）', promptEn: '날씨가 점점 따뜻해 ___. (The weather is getting warmer. — ongoing)',
          options: ['와요', '왔어요', '가요', '갔어요'],
          answer: 2 as 0|1|2|3,
          explanation: '现在正在进行的朝将来方向的变化 → -아/어 가다：따뜻해 가요（✓）。와요 是过去→现在，왔어요 是过去结果，갔어요 是完成。', explanationEn: 'Ongoing change toward the future → -아/어 가다: 따뜻해 가요 (✓). 와요 is past→present, 왔어요 is past result, 갔어요 is completion.',
        },
        {
          prompt: '-아/어 오다 와 -아/어 가다 의 차이는？',
          options: ['오다 是形容词，가다 是动词', '오다 是移动，가다 是持续', '오다 是肯定，가다 是否定', '时间方向（오다：过去→现在，가다：现在→将来）'],
          answer: 3 as 0|1|2|3,
          explanation: '核心区别是时间方向：오다 是过去→现在的持续，가다 是现在→将来的变化。与移动/肯定否定/词性无关。', explanationEn: 'The core difference is time direction: 오다 is past→present continuation, 가다 is present→future change. It\'s unrelated to movement, affirmation/negation, or part of speech.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['지금까지 열심히 살아 왔어요', '3년간 배워 갔어요（过去持续）', '점점 좋아 왔어요（现在进行）', '날씨가 추워 왔어요（점점 변화）'],
          answer: 0 as 0|1|2|3,
          explanation: '살아 왔어요：过去→现在的持续（✓）。추워 왔어요 表示点点变化应用 가다，배워 갔어요 表示过去持续应用 오다，좋아 왔어요 表示现在进行应用 가다。', explanationEn: '살아 왔어요: past→present continuation (✓). 추워 왔어요 indicates gradual change, so use 가다; 배워 갔어요 indicates past continuation, so use 오다; 좋아 왔어요 indicates ongoing action, so use 가다.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第4课</div>
    <div class="ov-hero-title">-아/어 오다，-아/어 가다</div>
    <div class="ov-hero-sub">一直……到现在 · 越来越……下去</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">到现在</div>
      <div class="ko">词干 + 아/어 오다</div>
      <div class="zh">过去→现在 持续/累积</div>
    </div>
    <div class="ov-block">
      <div class="badge">向未来</div>
      <div class="ko">词干 + 아/어 가다</div>
      <div class="zh">现在→未来 变化/延续</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">时间 方向 구별</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>살아 <b style="color:#ff7fa8">왔어요</b>：过去一直生活到现在</div>
        <div>살아 <b style="color:#ff7fa8">갈 거예요</b>：今后也要继续生活</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">점점 추워 왔어요（现在 변화）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">점점 추워 가요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">10년간 배워 갔어요（过去 持续）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">10년간 배워 왔어요</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">到现在 / 向未来</div>
<div class="card-body">同样是"持续"，方向不同，选择不同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">时间箭头是关键</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아/어 오다 — 过去→现在</div>
      <div style="font-size:16px;font-weight:800;color:#241917">10년간 공부해 왔어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">10年来一直在学习（到现在）。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-아/어 가다 — 现在→未来</div>
      <div style="font-size:16px;font-weight:800;color:#241917">점점 좋아 가고 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">正在越来越好（向未来）。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 "지금까지" → 오다，"점점/서서히" → 가다</div>
</div>
<div class="reminder-box">-아/어다 오다（结果移动）与 -아/어 오다（持续）形式不同。</div>`,
    compareHtml: `<div class="card-title">-아/어 오다 vs -아/어 가다 vs -아/어다 오다</div>
<div class="card-body">对比三个表达以免混淆。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去→现在 持续/累积</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배워 왔어요</span><span style="font-size:16px;color:#5a4640">一直学到现在</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 가다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">现在→将来 变化/延续</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋아 가요</span><span style="font-size:16px;color:#5a4640">越来越好</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">结果物移动（做了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了带来了</span></div>
  </div>
</div>`,
    compareLabel: '-아/어 오다 vs -아/어 가다 vs -아/어다 오다',
    quickTable: {
      title: '-아/어 오다 / -아/어 가다 정리',
      headers: ['形式', '时间方向', '呼应副词', '例句'],
      rows: [
        ['-아/어 오다', '过去→现在', '지금까지，그동안', '배워 왔어요，해 왔어요'],
        ['-아/어 가다', '现在→将来', '점점，서서히', '좋아 가요，커 가고 있어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l05',
    partNumber: 19,
    lessonNumber: 5,
    title: '-는/은/ㄴ 체하다，-는/은/ㄴ 척하다',
    whatItDoes: '表示假装做某动作或处于某状态', whatItDoesEn: 'Indicates pretending to do an action or be in a state',
    whatItDoesBody: '-는/은/ㄴ 체하다 和 -는/은/ㄴ 척하다 意思完全相同，均表示"假装……/装作……"，说明实际并非如此，只是表面上做出那种样子。\n척하다 在口语中更常用，체하다 略偏书面语。两种表达可以自由替换。', whatItDoesBodyEn: '-는/은/ㄴ 체하다 and -는/은/ㄴ 척하다 have exactly the same meaning, both meaning "pretend to.../act as if...", indicating it\'s not actually so, just putting on that appearance. \\n척하다 is more common in speech, 체하다 is slightly more formal. They can be freely swapped.',
    structureNote: '动词现在冠词形（-는）+ 체하다/척하다\n形容词/动词过去冠词形（-은/ㄴ）+ 체하다/척하다\n动词/形容词将来冠词形（-을/ㄹ）+ 체하다/척하다', structureNoteEn: 'Verb present adnominal (-는) + 체하다/척하다\\nAdjective/verb past adnominal (-은/ㄴ) + 체하다/척하다\\nVerb/adjective future adnominal (-을/ㄹ) + 체하다/척하다',
    rulesNote: '冠词形词尾选择：动词现在用 -는，动词/形容词过去用 -은/ㄴ，形容词现在用 -은/ㄴ\n注意别把 체하다/척하다 与表示"消化不良"的 체하다 混淆（체하다 = 食积，척하다 = 假装）。', rulesNoteEn: 'Adnominal ending choice: verbs present use -는, verbs/adjectives past use -은/ㄴ, adjectives present use -은/ㄴ\\nDon\'t confuse 체하다/척하다 with 체하다 meaning "indigestion" (체하다 = food stagnation, 척하다 = pretend).',
    scenarioNote: '像"자는 척하다（假装睡觉）""모르는 체하다（假装不知道）"，是日常中常用的表达。', scenarioNoteEn: 'Like "자는 척하다 (pretend to sleep)" or "모르는 체하다 (pretend not to know)," these are common daily expressions.',
    structures: [
      {
        ko: '동사 -는 체하다/척하다（现在）',
        tokens: [
          { text: '자는', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装在睡觉了。', zhEn: 'Pretended to be sleeping.',
      },
      {
        ko: '동사 -은/ㄴ 체하다（过去）',
        tokens: [
          { text: '모른', role: 'verb' },
          { text: ' 체했어요', role: 'verb' },
        ],
        zh: '假装不知道了。', zhEn: 'Pretended not to know.',
      },
      {
        ko: '형용사 -은/ㄴ 척하다',
        tokens: [
          { text: '바쁜', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装很忙了。', zhEn: 'Pretended to be busy.',
      },
      {
        ko: '동사 -는 척하다（现在）',
        tokens: [
          { text: '가는', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装要走。', zhEn: 'Pretended to leave.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在形 + 는 체하다/척하다', textEn: 'Verb present form + 는 체하다/척하다', examples: '자는 척하다（装睡），먹는 체하다（装吃），보는 척하다（装看）', examplesEn: '자는 척하다 (pretend to sleep), 먹는 체하다 (pretend to eat), 보는 척하다 (pretend to look)' },
      { type: 'rule', text: '动词过去形 + 은/ㄴ 체하다/척하다', textEn: 'Verb past form + 은/ㄴ 체하다/척하다', examples: '먹은 척하다，간 척하다，모른 체하다（모르다→모른）' },
      { type: 'rule', text: '形容词 + 은/ㄴ 체하다/척하다', textEn: 'Adjective + 은/ㄴ 체하다/척하다', examples: '바쁜 척하다（装忙），좋은 체하다（装喜欢），아픈 척하다（装病）', examplesEn: '바쁜 척하다 (pretend to be busy), 좋은 체하다 (pretend to like), 아픈 척하다 (pretend to be sick)' },
      { type: 'compare', text: '체하다 vs 척하다：含义相同，척하다 更口语', textEn: '체하다 vs 척하다: same meaning, 척하다 is more colloquial', examples: '자는 척해요（口语）= 자는 체해요（略书面语）', examplesEn: '자는 척해요 (colloquial) = 자는 체해요 (slightly formal)' },
      { type: 'note', text: '르 不规则：모르다 → 现在 모르는 척，过去 모른 척（모르+ㄴ）', textEn: '르 irregular: 모르다 → present 모르는 척, past 모른 척 (모르+ㄴ)', examples: '모르는 척해요（现在）/ 모른 척했어요（过去）', examplesEn: '모르는 척해요 (present) / 모른 척했어요 (past)' },
      { type: 'note', text: '체하다（食积）与 -는/은 체하다（假装）是完全不同的词', textEn: '체하다 (indigestion) and -는/은 체하다 (pretend) are completely different words', examples: '밥을 먹고 체했어요（食积了）vs 밥 먹는 체해요（假装在吃饭）', examplesEn: '밥을 먹고 체했어요 (got indigestion from eating) vs 밥 먹는 체해요 (pretend to be eating)' },
      { type: 'compare', text: '否定的位置决定意思：否定词放冠词形里=装作"不……"，放 척하다 上="不装"，两者意思相反', textEn: 'The position of negation determines meaning: negation in the adnominal form = pretend "not to...", negation on 척하다 = "not pretending", the two are opposite', examples: '안 가는 척해요（假装不去）/ 못 본 척했어요（假装没看到）vs 가는 척 안 해요（没有装作要去）', examplesEn: '안 가는 척해요 (pretend not to go) / 못 본 척했어요 (pretend not to see) vs 가는 척 안 해요 (don\'t pretend to go)' },
      { type: 'compare', text: '척하다 vs -는/은 것 같다：척하다 是"事实并非如此、故意装"，것 같다 是说话人推测"好像"', textEn: '척하다 vs -는/은 것 같다: 척하다 means "it\'s not true, deliberately pretending", 것 같다 is the speaker\'s guess "seems like"', examples: '바쁜 척해요（其实不忙，装忙）vs 바쁜 것 같아요（看起来好像很忙，只是猜测）', examplesEn: '바쁜 척해요 (actually not busy, pretending to be busy) vs 바쁜 것 같아요 (looks busy, just a guess)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: ' 나를 보고도', role: 'plain' },
          { text: ' 모르는 체했어요', role: 'verb' },
        ],
        zh: '那个人明明看到我，却假装不认识。', zhEn: 'That person clearly saw me but pretended not to know me.',
        swapWords: ['모르는 척했어요', '못 본 체했어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '피곤하지 않은 척했지만', role: 'verb' },
          { text: '사실', role: 'plain' },
          { text: '많이 힘들었어요', role: 'plain' },
        ],
        zh: '假装不累，但其实很难熬。', zhEn: 'Pretended not to be tired, but it was really hard.',
        swapWords: ['괜찮은 척했지만', '아프지 않은 척했지만'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: '자는 척했지만', role: 'verb' },
          { text: '사실', role: 'plain' },
          { text: ' 깨어 있었어요', role: 'plain' },
        ],
        zh: '孩子假装在睡觉，其实是醒着的。', zhEn: 'The child pretended to be sleeping, but was actually awake.',
        swapWords: ['자는 체했지만', '모르는 척했지만'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '바쁜 척하면서', role: 'verb' },
          { text: ' 전화를', role: 'object' },
          { text: ' 안 받았어요', role: 'verb' },
        ],
        zh: '假装很忙，没接电话。', zhEn: 'Pretended to be busy and didn\'t answer the phone.',
        swapWords: ['바쁜 체하면서', '아픈 척하면서'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '假装睡觉', contextEn: 'pretend to sleep', ko: '동생이 자는 척했어요.', zh: '弟弟/妹妹假装在睡觉。', zhEn: 'My younger sibling is pretending to sleep.' },
      { icon: '🙈', context: '假装不知道', contextEn: 'pretend not to know', ko: '알면서도 모르는 체해요.', zh: '明明知道却假装不知道。', zhEn: 'He knows perfectly well but pretends not to.' },
      { icon: '😐', context: '假装没事', contextEn: 'pretend to be fine', ko: '괜찮은 척했지만 사실 많이 힘들었어요.', zh: '假装没事，但其实很难熬。', zhEn: 'Pretending to be fine, but it\'s really hard.' },
      { icon: '📵', context: '假装没看到', contextEn: 'pretend not to see', ko: '문자를 못 본 척했어요.', zh: '假装没看到短信。', zhEn: 'I pretended not to see the text message.' },
      { icon: '💪', context: '假装有力气', contextEn: 'pretend to have energy', ko: '힘든 척 안 하고 웃었어요.', zh: '没有假装很累，而是笑了。', zhEn: 'Instead of pretending to be tired, she smiled.' },
      { icon: '😤', context: '装忙逃避', contextEn: 'pretend to be busy to avoid', ko: '바쁜 척하면서 회의를 피했어요.', zh: '假装忙，逃避了会议。', zhEn: 'He pretended to be busy and skipped the meeting.' },
    ],
    mistakes: [
      { wrong: '자는은 척해요（는 + 은 重复）', wrongEn: '자는은 척해요 (redundant 는 + 은)', correct: '자는 척해요（动词现在 -는）', correctEn: '자는 척해요 (verb present -는)', note: '动词现在冠词形是 -는。자다→자는 척해요（✓）。不能像 -는은 那样把 는 和 은 同时用。', noteEn: 'The present adnominal form for verbs is -는. 자다→자는 척해요 (✓). You can\'t use both 는 and 은 together like -는은.' },
      { wrong: '바쁘는 척해요（形容词用了 -는）', wrongEn: '바쁘는 척해요 (adjective with -는)', correct: '바쁜 척해요（形容词 -은/ㄴ）', correctEn: '바쁜 척해요 (adjective -은/ㄴ)', note: '形容词冠词形是 -은/ㄴ。바쁘다→바쁜 척해요（✓）。形容词用动词的 -는 就错了。', noteEn: 'The adnominal form for adjectives is -은/ㄴ. 바쁘다→바쁜 척해요 (✓). Using the verb form -는 with adjectives is wrong.' },
      { wrong: '모르은 척했어요（모르다 过去冠词形错误）', wrongEn: '모르은 척했어요 (wrong past adnominal for 모르다)', correct: '모른 척했어요', note: '모르다 是 르 不规则。过去冠词形：모르+ㄴ=모른 척했어요（✓）。모르은 是不存在的形式。现在形是 모르는 척해요。', noteEn: '모르다 is a 르-irregular verb. Past adnominal: 모르+ㄴ=모른 척했어요 (✓). 모르은 doesn\'t exist. The present form is 모르는 척해요.' },
      { wrong: '체했어요（与消化不良的 체하다 混淆）', wrongEn: '체했어요 (confused with 체하다 meaning indigestion)', correct: '체하다（食积）≠ 는/은 체하다（假装）：靠上下文区分', correctEn: '체하다 (indigestion) ≠ 는/은 체하다 (pretending): distinguish by context', note: '체하다 单独是"食积（消化不良）"，冠词形 + 체하다 是"假装"。밥 먹고 체했어요（食积）vs 밥 먹는 체해요（假装吃饭）。', noteEn: '체하다 alone means "indigestion," while adnominal + 체하다 means "pretend." 밥 먹고 체했어요 (indigestion) vs 밥 먹는 체해요 (pretending to eat).' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 체하다，척하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람은 나를 보고도 모르___ 체했어요。（那个人明明看到我，却假装不认识。—现在）', promptEn: '그 사람은 나를 보고도 모르___ 체했어요. (He saw me but pretended not to know me. —present)',
          options: ['는', '은', 'ㄴ', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（动词）现在冠词形：모르는 체했어요（✓）。若是过去则 모른 체했어요。은/ㄴ 用于形容词或动词过去形，을 用于将来形。', explanationEn: 'For 모르다 (verb), the present adnominal is: 모르는 체했어요 (✓). For past, it\'s 모른 체했어요. 은/ㄴ is used for adjectives or past verb forms, 을 for future.',
        },
        {
          prompt: '피곤하지 않___ 척했지만 사실 힘들었어요。（假装不累，其实很难熬。）', promptEn: 'I pretended not to be tired, but it was actually really hard.',
          options: ['는', '은', '던', '을'],
          answer: 1 as 0|1|2|3,
          explanation: '피곤하다（形容词）否定形 피곤하지 않다 的冠词形：않은 척했어요（✓）。는 是动词现在形，을 是将来形，던 是回想形。', explanationEn: 'The adnominal form of the negative 피곤하지 않다 is 않은 척했어요 (✓). 는 is the present verb form, 을 is future, 던 is retrospective.',
        },
        {
          prompt: '아이가 ___ 척했지만 사실 깨어 있었어요。（孩子假装在睡觉。）', promptEn: 'The child pretended to be sleeping, but was actually awake.',
          options: ['잔', '자', '자는', '잘'],
          answer: 2 as 0|1|2|3,
          explanation: '자다（动词）现在冠词形：자는 척했어요（✓）。잔 是过去形，잘 是将来形，자 是词干，不能单独用在 체하다/척하다 前。', explanationEn: 'The present adnominal form of 자다 is 자는 척했어요 (✓). 잔 is past, 잘 is future, 자 is the stem and can\'t be used alone before 체하다/척하다.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['바쁘는 척하면서（形容词+는）', '자는은 척해요（는+은 중복）', '모르은 척해요（모르다+은）', '바쁜 척하면서 전화를 안 받았어요'],
          answer: 3 as 0|1|2|3,
          explanation: '바쁘다（形容词）→ 바쁜 척하면서（✓）。바쁘는 是形容词误用动词形，자는은 是双重词尾，모르은 是错误形式（现在 모르는 척해요，过去 모른 척했어요）。', explanationEn: '바쁘다 (adjective) → 바쁜 척하면서 (✓). 바쁘는 wrongly treats the adjective as a verb, 자는은 is a double ending, 모르은 is incorrect (present: 모르는 척해요, past: 모른 척했어요).',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 第5课</div>
    <div class="ov-hero-title">-는/은/ㄴ 체하다，척하다</div>
    <div class="ov-hero-sub">假装……/装作……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">假装</div>
      <div class="ko">冠词形 + 체하다/척하다</div>
      <div class="zh">假装……（实际并非如此）</div>
    </div>
    <div class="ov-block">
      <div class="badge">区别</div>
      <div class="ko">척하다（口语） vs 체하다（书面语）</div>
      <div class="zh">意思完全相同，可以互换</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠词形 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">动词 现在</span>：자<b style="color:#ff7fa8">는</b> 척해요</div>
        <div><span style="font-weight:700">动词 过去</span>：자<b style="color:#ff7fa8">ㄴ</b> 척해요（잔 척해요）</div>
        <div><span style="font-weight:700">形容词</span>：바쁘<b style="color:#ff7fa8">ㄴ</b> 척해요（바쁜 척해요）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">바쁘는 척해요（形容词+는）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">바쁜 척해요（形容词+은/ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">체했어요（食积）와 혼동</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">冠词形+체하다 = 假装</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">假装……</div>
<div class="card-body">实际上不是那样，只是表面上装出那个样子。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">척하다 = 체하다（意思相同）</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">动词 现在 -는</div>
      <div style="font-size:16px;font-weight:800;color:#241917">자는 척해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">假装在睡觉。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">形容词 -은/ㄴ</div>
      <div style="font-size:16px;font-weight:800;color:#241917">바쁜 척해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">假装很忙。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 形容词不是用 -는，而是用 -은/ㄴ</div>
</div>
<div class="reminder-box">单独的 체하다（食积）≠ 冠词形+체하다（假装）。</div>`,
    compareHtml: `<div class="card-title">체하다 vs 척하다 / 动词 vs 形容词 冠词形</div>
<div class="card-body">核心区别要点对比。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">动词 现在 + 는 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">자는 척，먹는 척，보는 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">자는 척해요</span><span style="font-size:16px;color:#5a4640">假装在睡觉</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">动词 过去 + 은/ㄴ 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">잔 척，먹은 척，간 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잔 척했어요</span><span style="font-size:16px;color:#5a4640">假装睡过了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">形容词 + 은/ㄴ 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">바쁜 척，좋은 척，아픈 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁜 척해요</span><span style="font-size:16px;color:#5a4640">假装很忙</span></div>
  </div>
</div>`,
    compareLabel: '动词 现在/过去 vs 形容词 冠词形 + 척하다', compareLabelEn: 'Verb present/past vs adjective adnominal form + 척하다',
    quickTable: {
      title: '-는/은/ㄴ 체하다/척하다 冠词形', titleEn: '-는/은/ㄴ 체하다/척하다 adnominal forms',
      headers: ['词性/时态', '冠词形', '例句'],
      rows: [
        ['动词现在', '-는', '자는 척，먹는 체，보는 척'],
        ['动词过去', '-은/ㄴ', '잔 척，먹은 체，간 척'],
        ['形容词', '-은/ㄴ', '바쁜 척，좋은 체，아픈 척'],
        ['모르다（르 不规则）', '-는（现在）/-ㄴ（过去）', '모르는 척（现在）/모른 척（过去）'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l06',
    isPractice: true,
    partNumber: 19,
    lessonNumber: 6,
    title: 'P19 综合练习', titleEn: 'P19 Comprehensive Practice',
    whatItDoes: 'P19 第1～5课 综合练习', whatItDoesEn: 'P19 Lessons 1–5 Comprehensive Review',
    whatItDoesBody: '',
    structureNote: '',
    rulesNote: '',
    scenarioNote: '',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    step0Html: '',
    compareHtml: '',
    compareLabel: '',
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P19 · 综合练习</div>
    <div class="ov-hero-title">第1～5课 复习</div>
    <div class="ov-hero-sub">-아/어다 주다/드리다 · -아/어다 오다/가다 · -다니요/-고 말고요 · -아/어 오다/가다 · -는/은/ㄴ 체하다/척하다</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P19 综合练习', titleEn: 'P19 Comprehensive Practice',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 우유 좀 사다 ___。（来的路上帮我买点牛奶来。）', promptEn: 'On your way here, buy some milk and bring it.',
          options: ['드려요', '줘요', '갔어요', '왔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어다 주다：把结果传达给对方，사다 줘요（✓）。드려요 用于长辈，왔어요/갔어요 表示方向移动。', explanationEn: '-아/어다 주다: conveys the result to the other person, so 사다 줘요 (✓). 드려요 is for elders, 왔어요/갔어요 indicate directional movement.',
        },
        {
          prompt: '마트에서 고기를 사다 ___。（从超市买了肉来了。—结果在说话人处）', promptEn: 'Bought meat from the supermarket and brought it here.',
          options: ['왔어요', '갔어요', '드렸어요', '줬어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어다 오다：结果带向说话人一侧：사다 왔어요（✓）。갔어요 是相反方向，줬어요 表示传达，드렸어요 用于长辈。', explanationEn: '-아/어다 오다: brings the result toward the speaker: 사다 왔어요 (✓). 갔어요 is the opposite direction, 줬어요 means to convey, 드렸어요 is for elders.',
        },
        {
          prompt: '그 사람이 결혼했___요？ 믿을 수가 없어요。（那个人竟然结婚了？）', promptEn: 'That person got married? I can\'t believe it.',
          options: ['고 말고', '거든', '잖아', '다니'],
          answer: 3 as 0|1|2|3,
          explanation: '-다니요：惊讶/反问：결혼했다니요（✓）。고 말고요 是强烈肯定，거든요 是背景说明，잖아요 是共享信息。', explanationEn: '-다니요: surprise/rhetorical question: 결혼했다니요 (✓). 고 말고요 is strong affirmation, 거든요 gives background, 잖아요 is shared info.',
        },
        {
          prompt: '10년간 이 일을 해 ___。（10年来一直做这个工作。）', promptEn: 'I\'ve been doing this work for 10 years.',
          options: ['왔어요', '갔어요', '오다 왔어요', '다 왔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어 오다：过去→现在的持续：해 왔어요（✓）。갔어요 是将来方向，다 왔어요/오다 왔어요 是不存在的形式。', explanationEn: '-아/어 오다: continuation from past to present: 해 왔어요 (✓). 갔어요 is future direction, 다 왔어요/오다 왔어요 don\'t exist.',
        },
        {
          prompt: '그 사람은 나를 보고도 모르___ 척했어요。（那个人明明看到我，却假装不认识。—现在）', promptEn: 'That person saw me but pretended not to know me.',
          options: ['는', '은', '을', '던'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（动词）现在冠词形 + 척하다：모르는 척했어요（✓）。若过去则 모른 척했어요。은/을/던 不符合动词现在冠词形。', explanationEn: '모르다 (verb) present adnominal + 척하다: 모르는 척했어요 (✓). For past, it\'s 모른 척했어요. 은/을/던 don\'t fit the present adnominal form.',
        },
        {
          prompt: 'A：같이 갈 수 있어요？ B：가___ 말고요！（当然去！）', promptEn: 'A: Can we go together? B: Of course we\'ll go!',
          options: ['기도', '는가', '고', '다니'],
          answer: 2 as 0|1|2|3,
          explanation: '-고 말고요：强烈肯定：가고 말고요（✓）。다니요 是惊讶，기도 是罗列，는가 是对照。', explanationEn: '-고 말고요: strong affirmation: 가고 말고요 (✓). 다니요 is surprise, 기도 is listing, 는가 is contrast.',
        },
      ],
    },
  },

];
