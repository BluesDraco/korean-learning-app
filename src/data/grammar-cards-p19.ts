import type { GrammarCard } from '@/types';

export const grammarCardsP19: GrammarCard[] = [
  {
    id: 'card-p19-l01',
    partNumber: 19,
    lessonNumber: 1,
    title: '-아/어/여다 주다/하다/드리다',
    whatItDoes: '表示把某动作的结果转移或提供给他人',
    whatItDoesBody: '-아/어/여다 주다 表示做完某动作后把结果给对方，相当于"……给……/帮……做……"，比 -아/어/여 주다 多一层"把结果带来/带去"的移动感。\n-아/어/여다 드리다 是敬语形式，用于对长辈或地位高的人。\n-아/어다 하다 表示（不必要地）做某事，带有轻微责备语气。',
    structureNote: '-아/어/여다 주다：动词 词干 + 아/어/여다 주다\n词干 元音이 ㅏ/ㅗ → 아다，그 외 → 어다，하다 动词 → 여다（해다）\n-아/어/여다 드리다：주다 자리에 드리다（尊敬）',
    rulesNote: '-아/어/여다 주다 vs -아/어 주다：前者带有把结果送过去的移动语气，后者只是单纯帮忙/服务。\n-아/어다 하다 带有否定语感，如"왜 그걸 사다 해？（买那个干嘛？）"般使用。',
    scenarioNote: '-아/어/여다 주다 般，常与"사다 주다（买来给）""가져다 주다（拿来给）""데려다 주다（送去）"等移动性动词搭配。',
    structures: [
      {
        ko: '동사 词干 + 아다/어다 주다',
        tokens: [
          { text: '물', role: 'object' },
          { text: ' 한 잔', role: 'plain' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 주세요', role: 'verb' },
        ],
        zh: '请给我拿一杯水来。',
      },
      {
        ko: 'ㅏ/ㅗ 词干 + 아다 주다',
        tokens: [
          { text: '편의점에서', role: 'place' },
          { text: ' 빵', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '从便利店买了面包来给（我）。',
      },
      {
        ko: '드리다（尊敬）',
        tokens: [
          { text: '할머니께', role: 'object' },
          { text: ' 약', role: 'object' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 드렸어요', role: 'verb' },
        ],
        zh: '把药拿去给奶奶了。',
      },
      {
        ko: '-아/어다 하다（感叹/责备）',
        tokens: [
          { text: '왜', role: 'plain' },
          { text: ' 이런 걸', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 해요？', role: 'verb' },
        ],
        zh: '买这种东西干嘛？',
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 元音 词干 + 아다 주다', examples: '사다 주다，놓아다 주다' },
      { type: 'rule', text: '그 외 元音 词干 + 어다 주다', examples: '가져다 주다，데려다 주다，만들어다 주다' },
      { type: 'rule', text: '하다 动词 → 해다 주다', examples: '준비해다 주다，청소해다 주다' },
      { type: 'compare', text: '-아/어다 주다 vs -아/어 주다：移动 语感 유무', examples: '사다 주다（买来给，有移动）vs 사 주다（买给，纯帮助）' },
      { type: 'note', text: '드리다：주다의 敬语，윗사람에게 줄 때', examples: '선생님께 가져다 드렸어요，부모님께 사다 드려요' },
      { type: 'note', text: '-아/어다 하다：对不必要行为的轻微责备/感叹', examples: '왜 사다 해요？/ 또 만들어다 해？' },
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
        zh: '弟弟/妹妹在学校画了画带来给我。',
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
        zh: '父亲从市场买了水果来给（我）。',
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
        zh: '把药拿去给奶奶了。',
        swapWords: ['사다 드렸어요', '만들어다 드렸어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '왜', role: 'plain' },
          { text: ' 이렇게 많이', role: 'plain' },
          { text: ' 사다', role: 'verb' },
          { text: ' 해요？', role: 'verb' },
        ],
        zh: '买这么多干嘛？',
        swapWords: ['가져다 해요？', '만들어다 해요？'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🛒', context: '托人买东西', ko: '오는 길에 우유 좀 사다 줘요.', zh: '来的路上帮我买点牛奶来。' },
      { icon: '👵', context: '孝敬长辈', ko: '어머니께 따뜻한 차를 끓여다 드렸어요.', zh: '给母亲泡了热茶端去了。' },
      { icon: '📦', context: '取快递', ko: '택배가 왔길래 가져다 줬어요.', zh: '快递来了，所以帮你拿来了。' },
      { icon: '😅', context: '责备过度', ko: '왜 그걸 또 사다 해요？', zh: '那个又买来干嘛？' },
      { icon: '🍱', context: '带饭', ko: '점심에 도시락을 만들어다 줬어요.', zh: '午餐做了便当带来给了。' },
      { icon: '🚗', context: '送人回家', ko: '친구를 집에 데려다 줬어요.', zh: '送朋友回家了。' },
    ],
    mistakes: [
      { wrong: '사줬어요（单纯帮助，没有移动语气）', correct: '사다 줬어요（把结果送过去）', note: '-아/어다 주다 表示把结果送过去的移动语气。단순히 사 주다 只强调没有移动的帮助行为。需根据上下文区分。' },
      { wrong: '할머니께 가져다 줬어요（윗사람에게 주다）', correct: '할머니께 가져다 드렸어요', note: '윗사람에게는 주다 대신 드리다를 써야 한다：가져다 드렸어요（✓）。께 와 주다 조합은 敬语이 안 된다。' },
      { wrong: '가져다 줬드려요（주다 + 드리다 중복）', correct: '가져다 드렸어요', note: '주다와 드리다를 同时 쓸 수 없다。윗사람이면 드리다，동등/아랫사람이면 주다 하나만 쓴다。' },
      { wrong: '사어다 줬어요（词干结合 오류）', correct: '사다 줬어요', note: '사다 는 사（ㅏ元音）+ 아다 → 사아다 → 缩约为 사다。사어다 不存在的形式。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 주다/드리다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 커피 ___ 줘요。（来的路上帮我拿咖啡来。）',
          options: ['사어다', '사면', '사고', '사다'],
          answer: 3 as 0|1|2|3,
          explanation: '사다（사+아다 缩约）주다：사다 줘요（✓）。사어다는 不存在的形式，사고/사면은 作为连接词尾不能与 주다 结合。',
        },
        {
          prompt: '선생님께 자료를 가져다 ___。（把资料带给老师了。）',
          options: ['드렸어요', '주셨어요', '드렸습니다요', '줬어요'],
          answer: 0 as 0|1|2|3,
          explanation: '선생님（윗사람）께 → 드리다：가져다 드렸어요（✓）。줬어요는 윗사람에게 부적절，주셨어요는 主语가 선생님일 때，드렸습니다요는 不存在的形式。',
        },
        {
          prompt: '왜 이런 걸 또 ___ 해요？（又买这种东西干嘛？）',
          options: ['샀다', '사다', '사고', '사어'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어다 하다：对不必要行为的责备，사다 해요（✓）。사어/사고/샀다는 이 表达에 맞지 않는다。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['할머니께 가져다 줬어요（尊敬）', '사줬드려요', '친구 집에 데려다 줬어요', '가져어다 줬어요'],
          answer: 2 as 0|1|2|3,
          explanation: '데려다 줬어요：동등한 관계에서 데려다 주다（✓）。할머니께는 드렸어요가 맞음，사줬드려요는 이중 敬语，가져어다는 不存在的形式。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第11课</div>
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
<div class="reminder-box">윗사람에게는 必须 드리다：가져다 드렸어요。</div>`,
    compareHtml: `<div class="card-title">-아/어다 주다 vs -아/어 주다 vs 드리다</div>
<div class="card-body">三种 形式의 차이점。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">결과를 移动하여 전달，移动 语感 강함</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 줬어요</span><span style="font-size:16px;color:#5a4640">买来给了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">单纯服务/帮助，移动 없음</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사 줬어요</span><span style="font-size:16px;color:#5a4640">买给了（帮买）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 드리다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">윗사람에게 移动하여 전달（敬语）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가져다 드렸어요</span><span style="font-size:16px;color:#5a4640">拿来给了（尊敬）</span></div>
  </div>
</div>`,
    compareLabel: '-아/어다 주다 vs -아/어 주다 vs 드리다',
    quickTable: {
      title: '-아/어다 주다 词干结合',
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
    whatItDoes: '表示做完某动作后来/回来，或连续动作',
    whatItDoesBody: '-아/어다 오다 表示做完某事后来（到说话现场），相当于"做了……来了/带来了"，强调结果在此处。\n-아/어다 주다 在本课重点复习"拿来给"的移动方向区别：오다 强调向说话人方向移动，가다 强调离开说话人方向移动。\n두 表达은 移动 方向이 핵심 변수다：사다 오다（买来），사다 가다（买去）。',
    structureNote: '动词 词干 + 아/어다 오다/가다\n词干 元音 ㅏ/ㅗ → 아다，그 외 → 어다\n方向：오다（向说话人）vs 가다（离开说话人）',
    rulesNote: '-아/어다 오다 与 -아/어다 가다 的区别在于移动方向。以说话人位置为基准，判断结果物是过来还是过去。\n주다/드리다 与之结合时为 오다 系列：把结果带到说话人一方。',
    scenarioNote: '"밥을 해다 오다（做了饭来）"，"빨래를 해다 가다（洗了衣服去）"처럼 가사 동작에 经常 등장한다。',
    structures: [
      {
        ko: '동사 词干 + 아/어다 오다',
        tokens: [
          { text: '마트에서', role: 'place' },
          { text: ' 고기', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '从超市买了肉来了。',
      },
      {
        ko: '동사 词干 + 아/어다 가다',
        tokens: [
          { text: '도시락을', role: 'object' },
          { text: ' 만들어다', role: 'verb' },
          { text: ' 갔어요', role: 'verb' },
        ],
        zh: '做了便当去了（带去了）。',
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
        zh: '借了书来了 / 借了书去了。',
      },
      {
        ko: '결과 이동 + 주다',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: ' 꽃을', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 줬어요', role: 'verb' },
        ],
        zh: '朋友买了花来给了（我）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '词干 + 아/어다 오다：结果带向说话人一侧', examples: '사다 오다、만들어다 오다、빌려다 오다' },
      { type: 'rule', text: '词干 + 아/어다 가다：结果带向说话人相反方向', examples: '사다 가다、만들어다 가다、가져다 가다' },
      { type: 'compare', text: '오다 vs 가다：说话人 위치 기준 方向이 핵심', examples: '빵을 사다 왔어요（买来了）vs 빵을 사다 갔어요（买去了）' },
      { type: 'note', text: '-아/어다 주다：오다方向，把结果传达给对方', examples: '사다 줬어요，给过去（说话人→对方）' },
      { type: 'note', text: '하다 动词 词干 + 해다 오다/가다', examples: '준비해다 왔어요，청소해다 갔어요' },
      { type: 'compare', text: '-아/어다 오다 vs -아/어 오다：전자는 结果 移动，후자는 持续 변화', examples: '사다 왔어요（买了来）vs 먹어 왔어요（一直在吃）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '편의점에서', role: 'place' },
          { text: ' 커피를', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '从便利店买了咖啡来了。',
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
        zh: '做了饭带来了。',
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
        zh: '朋友买了礼物来给了（我）。',
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
        zh: '从图书馆借了书去了。',
        swapWords: ['빌려다 왔어요', '사다 갔어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🛍️', context: '购物回来', ko: '시장에서 채소를 사다 왔어요.', zh: '从市场买了蔬菜来了。' },
      { icon: '🍱', context: '带便当去公司', ko: '아침에 도시락을 만들어다 갔어요.', zh: '早上做了便当带去了（公司）。' },
      { icon: '🎁', context: '朋友送礼', ko: '친구가 케이크를 만들어다 줬어요.', zh: '朋友做了蛋糕带来给了（我）。' },
      { icon: '📚', context: '借书来看', ko: '도서관에서 책을 빌려다 읽었어요.', zh: '从图书馆借了书来读了。' },
      { icon: '💊', context: '取药', ko: '약국에서 약을 사다 왔어요.', zh: '从药店买了药来了。' },
      { icon: '🚌', context: '方向区分', ko: '밥을 사다 오면 같이 먹어요.', zh: '买了饭来的话一起吃吧。' },
    ],
    mistakes: [
      { wrong: '마트에서 고기 사와요（사+아→사와，缩约后未结合 오다）', correct: '마트에서 고기 사다 와요', note: '-아/어다 오다 必须保持形式：사다 와요（✓）。사와요是其他表达（사오다）的缩约形，意思相近但与本句型不同。' },
      { wrong: '빵을 사다 갔다 왔어요（갔다 오다와 혼동）', correct: '빵을 사다 왔어요', note: '갔다 오다는 "去了回来"，사다 왔어요는 "买了来"。두 表达의 구조와 意思不同。사다 왔어요가 结果 移动 表达이다。' },
      { wrong: '사다가 왔어요（어다 뒤에 가 불需要）', correct: '사다 왔어요', note: '-아/어다 오다 에서 다 뒤에 助词 가 를 쓰지 않는다。사다 왔어요가 올바른 形式이다。' },
      { wrong: '친구한테 사다 드렸어요（친구는 동등/아랫 관계）', correct: '친구한테 사다 줬어요', note: '드리다는 윗사람에게만 쓴다。친구처럼 동등한 관계에는 주다使用：사다 줬어요（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 오다/가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '마트에서 우유를 사다 ___。（从超市买了牛奶来了。—结果在说话人处）',
          options: ['갔어요', '줬어요', '왔어요', '드렸어요'],
          answer: 2 as 0|1|2|3,
          explanation: '结果带向说话人一侧 → 오다：사다 왔어요（✓）。갔어요 是相反方向，줬어요는 전달，드렸어요는 敬语 전달。',
        },
        {
          prompt: '도시락을 만들어다 ___。（做了便当带去了。—带去别处）',
          options: ['왔어요', '줬어요', '드렸어요', '갔어요'],
          answer: 3 as 0|1|2|3,
          explanation: '结果带向说话人相反方向 → 가다：만들어다 갔어요（✓）。왔어요는 说话人 方向。',
        },
        {
          prompt: '친구가 꽃을 사다 ___。（朋友买了花来给了我。—给说话人）',
          options: ['줬어요', '왔어요', '갔어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '결과를 상대방（说话人）에게 전달 → 주다：사다 줬어요（✓）。왔어요는 单纯移动，갔어요는 반대 方向，드렸어요는 윗사람에게。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['친구한테 사다 드렸어요（동등 관계）', '약국에서 약을 사다 왔어요', '마트에서 고기 사다가 왔어요', '밥을 해다가 갔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '사다 왔어요：结果带向说话人一侧（✓）。사다가 왔어요 是助词 가 错误，친구에게 드렸어요 不是对长辈，해다가 갔어요 다 后接 가 错误。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第12课</div>
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
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">方向 구별</div></div>
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
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사다가 왔어요（다 뒤에 가 불需要）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사다 왔어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구한테 사다 드렸어요（동등 관계）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사다 줬어요</span></div></div>
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
<div class="reminder-box">-아/어다 뒤에 助词 가 는 쓰지 않는다：사다 왔어요（✓）사다가 왔어요（✗）。</div>`,
    compareHtml: `<div class="card-title">-아/어다 오다 vs -아/어 오다 vs 갔다 오다</div>
<div class="card-body">비슷해 보이지만 含义가 다른 세 表达。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">결과를 带来（买了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了来了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">持续 변화（一直……来）</div>
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
      title: '-아/어다 + 移动动词 方向 정리',
      headers: ['形式', '方向', '含义', '例句'],
      rows: [
        ['-아/어다 오다', '说话人 쪽으로', '해서 带来', '사다 왔어요，만들어다 왔어요'],
        ['-아/어다 가다', '说话人 반대로', '해서 가져감', '사다 갔어요，만들어다 갔어요'],
        ['-아/어다 주다', '상대방에게', '해서 전달', '사다 줬어요，가져다 줬어요'],
        ['-아/어다 드리다', '윗사람에게', '해서 전달（敬语）', '사다 드렸어요，가져다 드렸어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l03',
    partNumber: 19,
    lessonNumber: 3,
    title: '-다니요，-고 말고요',
    whatItDoes: '表示惊讶/反问，或强调"当然是/那还用说"',
    whatItDoesBody: '-다니요 用于对听到的内容表示惊讶、意外或质疑，相当于"竟然……？/……这是什么意思？"，是对前句信息的反应性追问。\n-고 말고요 用于强烈肯定对方的提议或疑问，相当于"当然……/那还用说……"，语气坚定积极。',
    structureNote: '-다니요：动词/形容词 基本形（終止形）+ 다니요，이다 → 이라니요，있다/없다 → 있다니요/없다니요\n-고 말고요：动词/形容词 词干 + 고 말고요（무条件 肯定）',
    rulesNote: '-다니요 는 상대방의 발화를 不变 反复하거나 인용하면서 惊讶을 나타낸다。直接 인용에 가깝다。\n-고 말고요 는 질문에 대한 강한 肯定으로，"물론이죠"보다 情感이 더 실린다。단독으로 쓰이거나 절에 붙을 수 있다。',
    scenarioNote: '-다니요 般，如"그게 사실이라니요！（那竟是真的？！）"，常用于震惊或难以置信的情境。\n-고 말고요 般，如"같이 가고 말고요！（当然一起去！）"，用于热情同意对方的建议。',
    structures: [
      {
        ko: '동사 基本形 + 다니요',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: ' 떠났다니요？', role: 'verb' },
        ],
        zh: '那个人竟然走了？（表示惊讶）',
      },
      {
        ko: '이다 → 이라니요',
        tokens: [
          { text: '그게', role: 'subject' },
          { text: ' 사실이라니요？', role: 'verb' },
        ],
        zh: '那竟然是真的？！',
      },
      {
        ko: '词干 + 고 말고요',
        tokens: [
          { text: '같이', role: 'plain' },
          { text: ' 가고 말고요！', role: 'verb' },
        ],
        zh: '当然一起去！',
      },
      {
        ko: '형용사 词干 + 고 말고요',
        tokens: [
          { text: '맛있고 말고요', role: 'verb' },
          { text: ' 정말', role: 'plain' },
          { text: ' 최고예요！', role: 'verb' },
        ],
        zh: '当然好吃，真的是最棒的！',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词 基本形 + 다니요（惊讶/반문）', examples: '떠났다니요，좋다니요，먹었다니요' },
      { type: 'rule', text: '이다 → 이라니요，아니다 → 아니라니요', examples: '학생이라니요，사실이라니요，선생님이라니요' },
      { type: 'note', text: '-다니요 는 상대 발화 인용형：들은 내용을 不变 反复하며 惊讶 表达', examples: 'A：그 사람 떠났대요。 B：떠났다니요？' },
      { type: 'rule', text: '动词/形容词 词干 + 고 말고요（강한 肯定）', examples: '가고 말고요，좋고 말고요，먹고 말고요' },
      { type: 'compare', text: '-고 말고요 vs 물론이죠：고 말고요가 더 口语적이고 情感이 강함', examples: '물론이죠（정중한 肯定）vs 가고 말고요（열정적 同意）' },
      { type: 'note', text: '-고 말고요 단독 可以使用（당연하다는 含义）', examples: 'A：이거 맛있어요？ B：맛있고 말고요！' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '회사를', role: 'object' },
          { text: ' 그만뒀다니요？', role: 'verb' },
          { text: ' 믿을 수가 없어요', role: 'plain' },
        ],
        zh: '竟然辞职了？难以置信。',
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
        zh: '那竟然是谎言？我以为是真的。',
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
        zh: '当然帮您，随时联系我。',
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
        zh: '当然有趣，要再看一遍。',
        swapWords: ['맛있고 말고요', '좋고 말고요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😱', context: '听到意外消息', ko: '그 사람이 결혼했다니요？ 정말요？', zh: '那个人竟然结婚了？真的吗？' },
      { icon: '🤔', context: '质疑信息', ko: '그게 사실이라니요？ 믿기 어렵네요.', zh: '那竟然是真的？很难相信啊。' },
      { icon: '👍', context: '热情赞同', ko: 'A：같이 가요？ B：가고 말고요！', zh: 'A：一起去吗？ B：当然去！' },
      { icon: '😋', context: '力推美食', ko: '맛있고 말고요, 꼭 먹어 봐요!', zh: '当然好吃，一定要尝尝！' },
      { icon: '😤', context: '对价格惊讶', ko: '이게 10만 원이라니요？ 너무 비싸요！', zh: '这竟然要10万韩元？太贵了！' },
      { icon: '🤝', context: '爽快答应', ko: '도와드리고 말고요，제가 할게요！', zh: '当然帮您，我来做！' },
    ],
    mistakes: [
      { wrong: '그게 사실이다니요？（이다 + 다니요 직결）', correct: '그게 사실이라니요？', note: '이다 与 다니요 的结合形是 이라니요。이다니요是病句。이다 词干后加 라니요：이라니요（✓）。' },
      { wrong: '이다니요（이다 + 다니요 직결）', correct: '이라니요', note: '이다 与 다니요 的结合形是 이라니요。이다니요是病句。이다 词干后加 라니요。' },
      { wrong: '가고말고요（띄어쓰기 없음）', correct: '가고 말고요（고 말고요 앞에 띄어쓰기）', note: '-고 말고요 는 앞 词干과 띄어 쓴다：가고 말고요（✓）。붙여 쓰면 틀린 形式 보인다。' },
      { wrong: 'A：맛있어요？ B：맛있다니요（강한 肯定에 다니요 使用）', correct: '맛있고 말고요', note: '-다니요 는 惊讶/반문에 쓴다。강한 肯定에는 -고 말고요 를 써야 한다。맛있다니요는 "竟然好吃？"의 뜻으로 의아한 반응이 된다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-다니요，-고 말고요',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람이 회사를 그만___요？（那个人竟然辞职了？—表惊讶）',
          options: ['뒀고 말고', '뒀다니', '뒀잖아', '뒀거든'],
          answer: 1 as 0|1|2|3,
          explanation: '-다니요：惊讶/반문：그만뒀다니요（✓）。고 말고요는 강한 肯定，거든요는 背景 说明，잖아요는 共享 정보 唤起注意。',
        },
        {
          prompt: '그게 거짓말___요？ 저는 진짜인 줄 알았어요。（那竟然是谎言？）',
          options: ['이다니', '이고 말고', '이라니', '이거든'],
          answer: 2 as 0|1|2|3,
          explanation: '이다（名词+이다）+ 다니요 → 이라니요（✓）。이다니요是病句，이고 말고요는 강한 肯定，이거든요는 说明。',
        },
        {
          prompt: 'A：같이 영화 볼래요？ B：보___ 말고요！（当然看！）',
          options: ['고', '잖아', '거든', '다니'],
          answer: 0 as 0|1|2|3,
          explanation: '-고 말고요：강한 肯定/同意：보고 말고요（✓）。다니요는 惊讶，거든요는 说明，잖아요는 唤起注意。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['가고말고요', '그게 사실이다니요？', '도와드리다니요！（강한 肯定）', '그게 사실이라니요？'],
          answer: 3 as 0|1|2|3,
          explanation: '이다 + 다니요 → 이라니요：사실이라니요（✓）。이다니요 是病句，强烈肯定用 고 말고요，고 말고요 前需要空格。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第13课</div>
    <div class="ov-hero-title">-다니요，-고 말고요</div>
    <div class="ov-hero-sub">竟然……？ · 当然……！</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">竟然？</div>
      <div class="ko">基本形/过去형 + 다니요</div>
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
        <div><span style="font-weight:700">이다</span> + 다니요 → <b style="color:#ff7fa8">이라니요</b>（不是이다니요）</div>
        <div><span style="font-weight:700">-고 말고요</span> 앞에 <b style="color:#ff7fa8">띄어쓰기</b> 必需</div>
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
<div class="card-body">비슷한 기능의 다른 表达과 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-다니요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">惊讶/반문，상대 발화 反复</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀다니요？</span><span style="font-size:16px;color:#5a4640">竟然辞职了？</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-잖아요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">共享 정보 唤起注意（惊讶 없음）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀잖아요</span><span style="font-size:16px;color:#5a4640">不是辞职了嘛（你知道的）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 말고요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">강한 口语적 肯定</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가고 말고요！</span><span style="font-size:16px;color:#5a4640">当然去！（热情）</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">물론이죠</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">정중한 肯定，格式体</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">물론이죠，가겠습니다</span><span style="font-size:16px;color:#5a4640">当然，我去（正式）</span></div>
  </div>
</div>`,
    compareLabel: '-다니요 vs -잖아요 / -고 말고요 vs 물론이죠',
    quickTable: {
      title: '-다니요 / -고 말고요 정리',
      headers: ['词尾', '기능', '接续', '例句'],
      rows: [
        ['-다니요', '惊讶/반문', '基本形/过去형 뒤', '떠났다니요，좋다니요'],
        ['이라니요', '이다 뒤 特殊형', '이다 → 이라니요', '사실이라니요，학생이라니요'],
        ['-고 말고요', '강한 肯定', '词干 + 고 말고요', '가고 말고요，맛있고 말고요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l04',
    partNumber: 19,
    lessonNumber: 4,
    title: '-아/어 오다，-아/어 가다',
    whatItDoes: '表示状态/动作从过去持续到现在，或向未来延续',
    whatItDoesBody: '-아/어 오다 表示某状态或动作从过去持续到现在，相当于"一直……到现在/……起来了"，强调变化的到达点是当下。\n-아/어 가다 表示某状态或动作从现在向未来延续，相当于"越来越……/逐渐……下去"，强调变化的方向是未来。\n두 表达은 시간의 方向이 핵심：오다（过去→现在），가다（现在→未来）。',
    structureNote: '动词/形容词 词干 + 아/어 오다（过去→现在）\n动词/形容词 词干 + 아/어 가다（现在→未来）\n词干 元音 ㅏ/ㅗ → 아，그 외 → 어，하다 → 해',
    rulesNote: '-아/어 오다 는 主要 "지금까지" 와 함께 使用且 过去의 持续을 나타낸다。\n-아/어 가다 는 "점점"，"서서히" 등과 함께 使用且 将来 方向의 변화를 나타낸다。',
    scenarioNote: '"한국어를 배워 오다（一直在学韩语）" vs "한국어 실력이 늘어 가다（韩语水平在提高）"처럼 같은 주제라도 时间 方向이 다르다。',
    structures: [
      {
        ko: '词干 + 아/어 오다（过去→现在）',
        tokens: [
          { text: '10년 동안', role: 'time' },
          { text: ' 이 일을', role: 'object' },
          { text: ' 해', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '10年来一直做这个工作。',
      },
      {
        ko: '词干 + 아/어 가다（现在→未来）',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 추워', role: 'verb' },
          { text: ' 가요', role: 'verb' },
        ],
        zh: '天气越来越冷了。',
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
        zh: '韩语水平提高了很多（到现在）。',
      },
      {
        ko: '변화 가다（상태 변화 进行）',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 커', role: 'verb' },
          { text: ' 가고 있어요', role: 'verb' },
        ],
        zh: '孩子正在渐渐长大。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 词干 + 아 오다/가다', examples: '살아 오다，알아 오다，좋아 가다' },
      { type: 'rule', text: '그 외 词干 + 어 오다/가다', examples: '배워 오다，늘어 오다，커 가다，줄어 가다' },
      { type: 'compare', text: '-아/어 오다 vs -아/어 가다：时间 方向이 반대', examples: '살아 왔어요（一直生活到现在）vs 살아 갈 거예요（以后继续生活）' },
      { type: 'note', text: '-아/어 오다 는 "지금까지" 와 호응，过去→现在 持续', examples: '지금까지 참아 왔어요，10년간 해 왔어요' },
      { type: 'note', text: '-아/어 가다 는 "점점/서서히" 와 호응，现在→将来 변화', examples: '점점 좋아 가요，서서히 나아 가고 있어요' },
      { type: 'compare', text: '-아/어 오다 vs -아/어다 오다：전자는 持续，후자는 结果 移动', examples: '배워 왔어요（一直在学）vs 사다 왔어요（买了来）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금까지', role: 'time' },
          { text: ' 열심히', role: 'plain' },
          { text: ' 공부해', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '到现在一直努力学习。',
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
        zh: '天气正在渐渐变暖。',
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
        zh: '韩语水平提高了很多（到现在）。',
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
        zh: '孩子正在渐渐长大。',
        swapWords: ['자라 가고 있어요', '변해 가고 있어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '坚持学习', ko: '3년간 한국어를 배워 왔어요.', zh: '3年来一直在学韩语。' },
      { icon: '🌡️', context: '气候变化', ko: '지구가 점점 더워져 가고 있어요.', zh: '地球正在越来越变暖。' },
      { icon: '💪', context: '健康改善', ko: '꾸준히 운동해서 건강해져 왔어요.', zh: '坚持运动，健康起来了。' },
      { icon: '🌱', context: '成长', ko: '그 회사가 서서히 커 가고 있어요.', zh: '那家公司正在慢慢壮大。' },
      { icon: '❤️', context: '感情深厚', ko: '오래 알아 오면서 더 친해졌어요.', zh: '长时间认识下来变得更亲密了。' },
      { icon: '🌅', context: '未来期待', ko: '앞으로도 열심히 해 갈 거예요.', zh: '今后也会继续努力下去。' },
    ],
    mistakes: [
      { wrong: '공부해 갔어요（过去 持续에 가다 使用）', correct: '공부해 왔어요', note: '过去부터 现在까지의 持续은 -아/어 오다 使用。-아/어 가다 는 现在에서 将来 的方向：지금까지 공부해 왔어요（✓）。' },
      { wrong: '날씨가 추워 왔어요（将来 변화에 오다 使用）', correct: '날씨가 추워 가요', note: '现在 进行中인 将来 方向 변화는 -아/어 가다 使用：추워 가요（✓）。추워 왔어요는 过去부터 지금까지 추워진 결과를 나타낸다。' },
      { wrong: '사다 와요（-아/어다 오다 와 혼동）', correct: '사다 왔어요（结果 移动）vs 사 왔어요（持续 사다 없음）', note: '-아/어 오다（持续）와 -아/어다 오다（结果 移动）는 구조가 다르다。持续 表达에는 어 오다，结果 이동에는 어다 오다使用。' },
      { wrong: '점점 좋아 왔어요（现在 进行 변화에 오다）', correct: '점점 좋아 가고 있어요', note: '"점점"과 함께 现在 进行中인 변화는 -아/어 가다 가 자연스럽다：좋아 가고 있어요（✓）。좋아 왔어요는 过去 누적 结果。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어 오다，-아/어 가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '10년간 이 회사에서 일해 ___。（10年来一直在这家公司工作。）',
          options: ['갔어요', '왔어요', '가고 왔어요', '왔다 갔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '过去부터 现在까지 持续 → -아/어 오다：일해 왔어요（✓）。갔어요는 将来 方向，왔다 갔어요/가고 왔어요는 不存在的形式。',
        },
        {
          prompt: '날씨가 점점 따뜻해 ___。（天气越来越暖了。—现在进行中）',
          options: ['와요', '왔어요', '가요', '갔어요'],
          answer: 2 as 0|1|2|3,
          explanation: '现在 进行中인 将来 方向 변화 → -아/어 가다：따뜻해 가요（✓）。와요는 过去→现在，왔어요는 过去 结果，갔어요는 完成。',
        },
        {
          prompt: '-아/어 오다 와 -아/어 가다 의 차이는？',
          options: ['오다는 形容词，가다는 动词', '오다는 移动，가다는 持续', '오다는 肯定，가다는 否定', '时间 方向（오다：过去→现在，가다：现在→将来）'],
          answer: 3 as 0|1|2|3,
          explanation: '핵심 차이는 时间 方向：오다는 过去→现在 持续，가다는 现在→将来 변화。移动/긍否定/품사와는 무관하다。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['지금까지 열심히 살아 왔어요', '3년간 배워 갔어요（过去 持续）', '점점 좋아 왔어요（现在 进行）', '날씨가 추워 왔어요（점점 변화）'],
          answer: 0 as 0|1|2|3,
          explanation: '살아 왔어요：过去→现在 持续（✓）。추워 왔어요는 점점 변화에 가다 需要，배워 갔어요는 过去 持续에 오다 需要，좋아 왔어요는 现在 进行에 가다 需要。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第14课</div>
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
<div class="reminder-box">-아/어다 오다（结果移动）와 -아/어 오다（持续）는 形式가 다르다。</div>`,
    compareHtml: `<div class="card-title">-아/어 오다 vs -아/어 가다 vs -아/어다 오다</div>
<div class="card-body">세 表达을 혼동하지 않도록 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去→现在 持续/累積</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배워 왔어요</span><span style="font-size:16px;color:#5a4640">一直学到现在</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 가다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">现在→将来 변화/延续</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋아 가요</span><span style="font-size:16px;color:#5a4640">越来越好</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">结果물 移动（做了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了带来了</span></div>
  </div>
</div>`,
    compareLabel: '-아/어 오다 vs -아/어 가다 vs -아/어다 오다',
    quickTable: {
      title: '-아/어 오다 / -아/어 가다 정리',
      headers: ['形式', '时间 方向', '호응 부사', '例句'],
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
    whatItDoes: '表示假装做某动作或处于某状态',
    whatItDoesBody: '-는/은/ㄴ 체하다 和 -는/은/ㄴ 척하다 意思完全相同，均表示"假装……/装作……"，说明实际并非如此，只是表面上做出那种样子。\n척하다 는 口语에서 더 经常 쓰이고，체하다 는 약간 书面语적이다。두 表达은 자유롭게 可替换하다。',
    structureNote: '动词 现在 冠词形（-는）+ 체하다/척하다\n形容词/动词 过去 冠词形（-은/ㄴ）+ 체하다/척하다\n动词/形容词 将来 冠词形（-을/ㄹ）+ 체하다/척하다',
    rulesNote: '冠词形 词尾 선택：动词 现在 -는，动词/形容词 过去 -은/ㄴ，形容词 现在 -은/ㄴ\n체하다/척하다 는 단독으로는 소화 안 된다는 뜻의 체하다 와 혼동하지 말 것（체하다 = 食积，척하다 = 假装）。',
    scenarioNote: '"자는 척하다（假装睡觉）"，"모르는 체하다（假装不知道）"처럼 日常에서 经常 使用的 表达이다。',
    structures: [
      {
        ko: '동사 -는 체하다/척하다（现在）',
        tokens: [
          { text: '자는', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装在睡觉了。',
      },
      {
        ko: '동사 -은/ㄴ 체하다（过去）',
        tokens: [
          { text: '모른', role: 'verb' },
          { text: ' 체했어요', role: 'verb' },
        ],
        zh: '假装不知道了。',
      },
      {
        ko: '형용사 -은/ㄴ 척하다',
        tokens: [
          { text: '바쁜', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装很忙了。',
      },
      {
        ko: '동사 -을/ㄹ 체하다（将来/推测）',
        tokens: [
          { text: '갈', role: 'verb' },
          { text: ' 것처럼', role: 'plain' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装要去的样子。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 现在형 + 는 체하다/척하다', examples: '자는 척하다，먹는 체하다，보는 척하다' },
      { type: 'rule', text: '动词 过去형 + 은/ㄴ 체하다/척하다', examples: '먹은 척하다，간 척하다，모른 체하다（모르다→모른）' },
      { type: 'rule', text: '形容词 + 은/ㄴ 체하다/척하다', examples: '바쁜 척하다，좋은 체하다，아픈 척하다' },
      { type: 'compare', text: '체하다 vs 척하다：含义 동일，척하다가 더 口语적', examples: '자는 척해요（口语）= 자는 체해요（약간 书面语）' },
      { type: 'note', text: 'ㄹ不规则：모르다→모른 척（过去），아는 척（现在）/안 척（过去）', examples: '모르는 척（现在）/ 모른 척（过去），아는 척（现在）/ 안 척（过去）' },
      { type: 'note', text: '체하다（食积）와 -는/은 체하다（假装）는 完全 다른 单词', examples: '밥을 먹고 체했어요（食积了）vs 밥 먹는 체해요（假装在吃饭）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: ' 나를 보고도', role: 'plain' },
          { text: ' 모르는 체했어요', role: 'verb' },
        ],
        zh: '那个人明明看到我，却假装不认识。',
        swapWords: ['모르는 척했어요', '못 본 체했어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '피곤하지 않은 척했지만', role: 'verb' },
          { text: '사실', role: 'plain' },
          { text: '많이 힘들었어요', role: 'plain' },
        ],
        zh: '假装不累，但其实很难熬。',
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
        zh: '孩子假装在睡觉，其实是醒着的。',
        swapWords: ['자는 체했지만', '모르는 척했지만'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '바쁜 척하면서', role: 'verb' },
          { text: ' 전화를', role: 'object' },
          { text: ' 안 받았어요', role: 'verb' },
        ],
        zh: '假装很忙，没接电话。',
        swapWords: ['바쁜 체하면서', '아픈 척하면서'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '假装睡觉', ko: '동생이 자는 척했어요.', zh: '弟弟/妹妹假装在睡觉。' },
      { icon: '🙈', context: '假装不知道', ko: '알면서도 모르는 체해요.', zh: '明明知道却假装不知道。' },
      { icon: '😐', context: '假装没事', ko: '괜찮은 척했지만 사실 많이 힘들었어요.', zh: '假装没事，但其实很难熬。' },
      { icon: '📵', context: '假装没看到', ko: '문자를 못 본 척했어요.', zh: '假装没看到短信。' },
      { icon: '💪', context: '假装有力气', ko: '힘든 척 안 하고 웃었어요.', zh: '没有假装很累，而是笑了。' },
      { icon: '😤', context: '装忙逃避', ko: '바쁜 척하면서 회의를 피했어요.', zh: '假装忙，逃避了会议。' },
    ],
    mistakes: [
      { wrong: '자는은 척해요（는 + 은 중복）', correct: '자는 척해요（动词 现在 -는）', note: '动词 现在 冠词形은 -는 이다。자다→자는 척해요（✓）。-는은 처럼 는 과 은 을 同时 쓰지 않는다。' },
      { wrong: '바쁘는 척해요（형용사에 -는）', correct: '바쁜 척해요（形容词 -은/ㄴ）', note: '形容词 冠词形은 -은/ㄴ 이다。바쁘다→바쁜 척해요（✓）。형용사에 动词형 -는 을 쓰면 틀린다。' },
      { wrong: '모르은 척했어요（모르다 过去 冠词形 오류）', correct: '모른 척했어요', note: '모르다는 ㄹ不规则。过去 冠词形：모르+ㄴ=모른 척했어요（✓）。모르은은 不存在的形式이다。现在형은 모르는 척해요。' },
      { wrong: '체했어요（식적으로 소화 안 됨과 혼동）', correct: '체하다（食积）≠ 는/은 체하다（假装）：문맥으로 구분', note: '체하다 단독은 "食积（소화불량）"이고，冠词形 + 체하다 는 "假装"이다。밥 먹고 체했어요（食积）vs 밥 먹는 체해요（假装吃饭）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 체하다，척하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람은 나를 보고도 모르___ 체했어요。（那个人明明看到我，却假装不认识。—现在）',
          options: ['는', '은', 'ㄴ', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（动词）现在 冠词形：모르는 체했어요（✓）。过去라면 모른 체했어요。은/ㄴ은 形容词나 动词 过去형에，을은 将来형에 쓴다。',
        },
        {
          prompt: '피곤하지 않___ 척했지만 事实 힘들었어요。（假装不累，其实很难熬。）',
          options: ['는', '은', '던', '을'],
          answer: 1 as 0|1|2|3,
          explanation: '피곤하다（形容词）否定형 피곤하지 않다의 冠词形：않은 척했어요（✓）。는 은 动词 现在형，을 은 将来형，던 은 回想형。',
        },
        {
          prompt: '아이가 ___ 척했지만 事实 깨어 있었어요。（孩子假装在睡觉。）',
          options: ['잔', '자', '자는', '잘'],
          answer: 2 as 0|1|2|3,
          explanation: '자다（动词）现在 冠词形：자는 척했어요（✓）。잔 은 过去형，잘 은 将来형，자 는 词干 단독으로 체하다/척하다 앞에 쓰지 않는다。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['바쁘는 척하면서（形容词+는）', '자는은 척해요（는+은 중복）', '모르은 척해요（모르다+은）', '바쁜 척하면서 전화를 안 받았어요'],
          answer: 3 as 0|1|2|3,
          explanation: '바쁘다（形容词）→ 바쁜 척하면서（✓）。바쁘는는 형용사에 动词형 오류，자는은은 이중 词尾，모르은은 ㄹ脱落 오류（모른 척해요가 맞음）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第19课</div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 形容词에는 -는 이 아니라 -은/ㄴ</div>
</div>
<div class="reminder-box">체하다 단독（食积）≠ 冠词形+체하다（假装）。</div>`,
    compareHtml: `<div class="card-title">체하다 vs 척하다 / 动词 vs 形容词 冠词形</div>
<div class="card-body">핵심 구별 포인트 비교。</div>
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
    compareLabel: '动词 现在/过去 vs 形容词 冠词形 + 척하다',
    quickTable: {
      title: '-는/은/ㄴ 체하다/척하다 冠词形',
      headers: ['품사/时态', '冠词形', '例句'],
      rows: [
        ['动词 现在', '-는', '자는 척，먹는 체，보는 척'],
        ['动词 过去', '-은/ㄴ', '잔 척，먹은 체，간 척'],
        ['形容词', '-은/ㄴ', '바쁜 척，좋은 체，아픈 척'],
        ['모르다（ㄹ脱落）', '-는（现在）/-ㄴ（过去）', '모르는 척（现在）/모른 척（过去）'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p19-l06',
    isPractice: true,
    partNumber: 19,
    lessonNumber: 6,
    title: 'P15 综合练习',
    whatItDoes: 'P14 第11～15课 综합练习',
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
    <div class="ov-hero-label">P14 · 综合练习①</div>
    <div class="ov-hero-title">第11～15课 복습</div>
    <div class="ov-hero-sub">-아/어다 주다 · -아/어다 오다/가다 · -다니요/-고 말고요 · -아/어 오다/가다 · 에 대해/에 관한</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P15 综合练习',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 우유 좀 사다 ___。（来的路上帮我买点牛奶来。）',
          options: ['드려요', '줘요', '갔어요', '왔어요'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어다 주다：把结果传达给对方，사다 줘요（✓）。드려요 用于长辈，왔어요/갔어요 表示方向移动。',
        },
        {
          prompt: '마트에서 고기를 사다 ___。（从超市买了肉来了。—结果在说话人处）',
          options: ['왔어요', '갔어요', '드렸어요', '줬어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어다 오다：结果带向说话人一侧：사다 왔어요（✓）。갔어요 是相反方向，줬어요 表示传达，드렸어요 用于长辈。',
        },
        {
          prompt: '그 사람이 결혼했___요？ 믿을 수가 없어요。（那个人竟然结婚了？）',
          options: ['고 말고', '거든', '잖아', '다니'],
          answer: 3 as 0|1|2|3,
          explanation: '-다니요：惊讶/반문：결혼했다니요（✓）。고 말고요는 강한 肯定，거든요는 背景 说明，잖아요는 共享 정보。',
        },
        {
          prompt: '10년간 이 일을 해 ___。（10年来一直做这个工作。）',
          options: ['왔어요', '갔어요', '오다 왔어요', '다 왔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어 오다：过去→现在 持续：해 왔어요（✓）。갔어요는 将来 方向，다 왔어요/오다 왔어요는 不存在的形式。',
        },
        {
          prompt: '한국 역사___ 관한 책을 읽었어요。（读了关于韩国历史的书。）',
          options: ['에', '에서', '이', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '에 관한：名词 + 에 관한 + 名词：역사에 관한 책（✓）。에서는 地点，이/을은 주격/目的격 助词。',
        },
        {
          prompt: 'A：같이 갈 수 있어요？ B：가___ 말고요！（当然去！）',
          options: ['기도', '는가', '고', '다니'],
          answer: 2 as 0|1|2|3,
          explanation: '-고 말고요：강한 肯定：가고 말고요（✓）。다니요는 惊讶，기도는 나열，는가는 대조。',
        },
      ],
    },
  },

];
