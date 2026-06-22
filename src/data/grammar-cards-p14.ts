import type { GrammarCard } from '@/types';

export const grammarCardsP14: GrammarCard[] = [
  // ── 第11课：-아/어/여다 주다/하다/드리다 ──────────────────────────
  {
    id: 'card-p14-l01',
    partNumber: 14,
    lessonNumber: 1,
    title: '-아/어/여다 주다/하다/드리다',
    whatItDoes: '表示把某动作的结果转移或提供给他人',
    whatItDoesBody: '-아/어/여다 주다 表示做完某动作后把结果给对方，相当于"……给……/帮……做……"，比 -아/어/여 주다 多一层"把结果带来/带去"的移动感。\n-아/어/여다 드리다 是敬语形式，用于对长辈或地位高的人。\n-아/어/여다 하다 则表示"反复做/一直做"或"（不必要地）做某事"，带有轻微责备或感叹语气。',
    structureNote: '-아/어/여다 주다：동사 어간 + 아/어/여다 주다\n어간 모음이 ㅏ/ㅗ → 아다，그 외 → 어다，하다 동사 → 여다（해다）\n-아/어/여다 드리다：주다 자리에 드리다（尊敬）',
    rulesNote: '-아/어/여다 주다 vs -아/어 주다：전자는 결과를 가져다주는 이동 뉘앙스가 강하다。후자는 단순 봉사/도움。\n-아/어/여다 하다 는 부정적 뉘앙스로 "왜 그걸 사다 해？（买那个干嘛？）"처럼 쓰인다。',
    scenarioNote: '-아/어/여다 주다 는 "사다 주다（买来给）"，"가져다 주다（拿来给）"，"데려다 주다（送去）"처럼 이동성 동사와 자주 쓰인다。',
    structures: [
      {
        ko: '동사 어간 + 아다/어다 주다',
        tokens: [
          { text: '물', role: 'object' },
          { text: ' 한 잔', role: 'plain' },
          { text: ' 가져다', role: 'verb' },
          { text: ' 주세요', role: 'verb' },
        ],
        zh: '请给我拿一杯水来。',
      },
      {
        ko: 'ㅏ/ㅗ 어간 + 아다 주다',
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
      { type: 'rule', text: 'ㅏ/ㅗ 모음 어간 + 아다 주다', examples: '사다 주다，놓아다 주다' },
      { type: 'rule', text: '그 외 모음 어간 + 어다 주다', examples: '가져다 주다，데려다 주다，만들어다 주다' },
      { type: 'rule', text: '하다 동사 → 해다 주다', examples: '준비해다 주다，청소해다 주다' },
      { type: 'compare', text: '-아/어다 주다 vs -아/어 주다：이동 뉘앙스 유무', examples: '사다 주다（买来给，有移动）vs 사 주다（买给，纯帮助）' },
      { type: 'note', text: '드리다：주다의 존댓말，윗사람에게 줄 때', examples: '선생님께 가져다 드렸어요，부모님께 사다 드려요' },
      { type: 'note', text: '-아/어다 하다：불필요한 행동에 대한 가벼운 책망/감탄', examples: '왜 사다 해요？/ 또 만들어다 해？' },
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
      { icon: '👵', context: '孝敬长辈', ko: '어머니께 따뜻한 차를 끓여다 드렸어요.', zh: '给母亲泡了热茶送过去了。' },
      { icon: '📦', context: '取快递', ko: '택배가 왔길래 가져다 줬어요.', zh: '快递来了，所以帮你拿来了。' },
      { icon: '😅', context: '责备过度', ko: '왜 그걸 또 사다 해요？', zh: '那个又买来干嘛？' },
      { icon: '🍱', context: '带饭', ko: '점심에 도시락을 만들어다 줬어요.', zh: '午餐做了便当带来给了。' },
      { icon: '🚗', context: '送人回家', ko: '친구를 집에 데려다 줬어요.', zh: '送朋友回家了。' },
    ],
    mistakes: [
      { wrong: '사줬어요', correct: '사다 줬어요', note: '-아/어다 주다 는 결과물을 가져다주는 이동 뉘앙스가 있다。단순히 사 주다 는 이동 없이 도와주는 행위만 강조한다。문맥에 맞게 구분해야 한다。' },
      { wrong: '할머니께 가져다 줬어요', correct: '할머니께 가져다 드렸어요', note: '윗사람에게는 주다 대신 드리다를 써야 한다：가져다 드렸어요（✓）。께 와 주다 조합은 존댓말이 안 된다。' },
      { wrong: '가져다 줬드려요', correct: '가져다 드렸어요', note: '주다와 드리다를 동시에 쓸 수 없다。윗사람이면 드리다，동등/아랫사람이면 주다 하나만 쓴다。' },
      { wrong: '사어다 줬어요', correct: '사다 줬어요', note: '사다 는 사（ㅏ모음）+ 아다 → 사아다 → 축약되어 사다。사어다 는 없는 형태이다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 주다/드리다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 커피 ___ 줘요。（来的路上帮我拿咖啡来。）',
          options: ['사다', '사어다', '사고', '사면'],
          answer: 0 as 0|1|2|3,
          explanation: '사다（사+아다 축약）주다：사다 줘요（✓）。사어다는 없는 형태，사고/사면은 연결어미로 주다와 결합하지 않는다。',
        },
        {
          prompt: '선생님께 자료를 가져다 ___。（把资料带给老师了。）',
          options: ['드렸어요', '줬어요', '주셨어요', '드렸습니다요'],
          answer: 0 as 0|1|2|3,
          explanation: '선생님（윗사람）께 → 드리다：가져다 드렸어요（✓）。줬어요는 윗사람에게 부적절，주셨어요는 주어가 선생님일 때，드렸습니다요는 없는 형태。',
        },
        {
          prompt: '왜 이런 걸 또 ___ 해요？（又买这种东西干嘛？）',
          options: ['사다', '사어', '사고', '샀다'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어다 하다：불필요한 행동에 대한 책망，사다 해요（✓）。사어/사고/샀다는 이 표현에 맞지 않는다。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['친구 집에 데려다 줬어요', '할머니께 가져다 줬어요（尊敬）', '사줬드려요', '가져어다 줬어요'],
          answer: 0 as 0|1|2|3,
          explanation: '데려다 줬어요：동등한 관계에서 데려다 주다（✓）。할머니께는 드렸어요가 맞음，사줬드려요는 이중 존댓말，가져어다는 없는 형태。',
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
      <div class="ko">동사 어간 + 아/어다 주다</div>
      <div class="zh">做完带来/带去给对方（有移动感）</div>
    </div>
    <div class="ov-block">
      <div class="badge">尊敬</div>
      <div class="ko">동사 어간 + 아/어다 드리다</div>
      <div class="zh">对长辈/上级使用 드리다</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">어간 결합</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">ㅏ/ㅗ 모음</span>：사다 주다，놓아다 주다</div>
        <div><span style="font-weight:700">그 외 모음</span>：가져다 주다，만들어다 주다</div>
        <div><span style="font-weight:700">하다 동사</span>：준비해다 주다，청소해다 주다</div>
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
<div class="reminder-box">윗사람에게는 반드시 드리다：가져다 드렸어요。</div>`,
    compareHtml: `<div class="card-title">-아/어다 주다 vs -아/어 주다 vs 드리다</div>
<div class="card-body">세 가지 형태의 차이점。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">결과를 이동하여 전달，이동 뉘앙스 강함</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 줬어요</span><span style="font-size:16px;color:#5a4640">买来给了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 주다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">단순 봉사/도움，이동 없음</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사 줬어요</span><span style="font-size:16px;color:#5a4640">买给了（帮买）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 드리다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">윗사람에게 이동하여 전달（존댓말）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가져다 드렸어요</span><span style="font-size:16px;color:#5a4640">拿来给了（尊敬）</span></div>
  </div>
</div>`,
    compareLabel: '-아/어다 주다 vs -아/어 주다 vs 드리다',
    quickTable: {
      title: '-아/어다 주다 어간 결합',
      headers: ['모음 유형', '결합형', '예시'],
      rows: [
        ['ㅏ/ㅗ 모음', '+ 아다 주다', '사다 주다，놓아다 주다'],
        ['그 외 모음', '+ 어다 주다', '가져다 주다，만들어다 주다'],
        ['하다 동사', '+ 해다 주다', '준비해다 주다，청소해다 주다'],
        ['윗사람（尊敬）', '주다 → 드리다', '사다 드리다，가져다 드리다'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第12课：-아/어/여다 오다，주다 ──────────────────────────────
  {
    id: 'card-p14-l02',
    partNumber: 14,
    lessonNumber: 2,
    title: '-아/어다 오다，주다（연속 동작）',
    whatItDoes: '表示做完某动作后来/回来，或连续动作',
    whatItDoesBody: '-아/어다 오다 表示做完某事后来（到说话现场），相当于"做了……来了/带来了"，强调结果在此处。\n-아/어다 주다 在本课重点复习"拿来给"的移动方向区别：오다 强调向说话人方向移动，가다 强调离开说话人方向移动。\n두 표현은 이동 방향이 핵심 변수다：사다 오다（买来），사다 가다（买去）。',
    structureNote: '동사 어간 + 아/어다 오다/가다\n어간 모음 ㅏ/ㅗ → 아다，그 외 → 어다\n방향：오다（向说话人）vs 가다（离开说话人）',
    rulesNote: '-아/어다 오다 와 -아/어다 가다 의 차이는 이동 방향이다。화자 위치 기준으로 결과물이 오는지 가는지 판단한다。\n주다/드리다 와 결합시 오다 계열：결과를 화자 측으로 가져옴。',
    scenarioNote: '"밥을 해다 오다（做了饭来）"，"빨래를 해다 가다（洗了衣服去）"처럼 가사 동작에 자주 등장한다。',
    structures: [
      {
        ko: '동사 어간 + 아/어다 오다',
        tokens: [
          { text: '마트에서', role: 'place' },
          { text: ' 고기', role: 'object' },
          { text: ' 사다', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '从超市买了肉来了。',
      },
      {
        ko: '동사 어간 + 아/어다 가다',
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
      { type: 'rule', text: '어간 + 아/어다 오다：결과를 화자 쪽으로 가져옴', examples: '사다 오다，만들어다 오다，빌려다 오다' },
      { type: 'rule', text: '어간 + 아/어다 가다：결과를 화자 반대 방향으로 가져감', examples: '사다 가다，만들어다 가다，가져다 가다' },
      { type: 'compare', text: '오다 vs 가다：화자 위치 기준 방향이 핵심', examples: '빵을 사다 왔어요（买来了）vs 빵을 사다 갔어요（买去了）' },
      { type: 'note', text: '-아/어다 주다：오다 방향，결과를 상대에게 전달', examples: '사다 줬어요，가져다 줬어요（화자→ 상대방）' },
      { type: 'note', text: '하다 동사 어간 + 해다 오다/가다', examples: '준비해다 왔어요，청소해다 갔어요' },
      { type: 'compare', text: '-아/어다 오다 vs -아/어 오다：전자는 결과 이동，후자는 지속 변화', examples: '사다 왔어요（买了来）vs 먹어 왔어요（一直在吃）' },
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
      { wrong: '마트에서 고기 사와요', correct: '마트에서 고기 사다 와요', note: '-아/어다 오다 형식을 유지해야 한다：사다 와요（✓）。사와요는 다른 표현（사오다）의 축약형으로 의미는 비슷하지만 본 문형과 다르다。' },
      { wrong: '빵을 사다 갔다 왔어요', correct: '빵을 사다 왔어요', note: '갔다 오다는 "去了回来"，사다 왔어요는 "买了来"。두 표현의 구조와 의미가 다르다。사다 왔어요가 결과 이동 표현이다。' },
      { wrong: '사다가 왔어요', correct: '사다 왔어요', note: '-아/어다 오다 에서 다 뒤에 조사 가 를 쓰지 않는다。사다 왔어요가 올바른 형태이다。' },
      { wrong: '친구한테 사다 드렸어요', correct: '친구한테 사다 줬어요', note: '드리다는 윗사람에게만 쓴다。친구처럼 동등한 관계에는 주다를 쓴다：사다 줬어요（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어다 오다/가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '마트에서 우유를 사다 ___。（从超市买了牛奶来了。—结果在说话人处）',
          options: ['왔어요', '갔어요', '줬어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '결과를 화자 쪽으로 가져옴 → 오다：사다 왔어요（✓）。갔어요는 반대 방향，줬어요는 전달，드렸어요는 존댓말 전달。',
        },
        {
          prompt: '도시락을 만들어다 ___。（做了便当带去了。—带去别处）',
          options: ['갔어요', '왔어요', '줬어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '결과를 화자 반대 방향으로 가져감 → 가다：만들어다 갔어요（✓）。왔어요는 화자 방향。',
        },
        {
          prompt: '친구가 꽃을 사다 ___。（朋友买了花来给了我。—给说话人）',
          options: ['줬어요', '왔어요', '갔어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '결과를 상대방（화자）에게 전달 → 주다：사다 줬어요（✓）。왔어요는 단순 이동，갔어요는 반대 방향，드렸어요는 윗사람에게。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['약국에서 약을 사다 왔어요', '마트에서 고기 사다가 왔어요', '친구한테 사다 드렸어요（동등 관계）', '밥을 해다가 갔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '사다 왔어요：결과를 화자 쪽으로 가져옴（✓）。사다가 왔어요는 조사 가 오류，친구에게 드렸어요는 윗사람 아님，해다가 갔어요는 다 뒤에 가 오류。',
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
      <div class="ko">어간 + 아/어다 오다</div>
      <div class="zh">做了带来（结果到说话人处）</div>
    </div>
    <div class="ov-block">
      <div class="badge">买去</div>
      <div class="ko">어간 + 아/어다 가다</div>
      <div class="zh">做了带去（结果离开说话人）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">방향 구별</div></div>
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
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사다가 왔어요（다 뒤에 가 불필요）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사다 왔어요</span></div></div>
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
<div class="reminder-box">-아/어다 뒤에 조사 가 는 쓰지 않는다：사다 왔어요（✓）사다가 왔어요（✗）。</div>`,
    compareHtml: `<div class="card-title">-아/어다 오다 vs -아/어 오다 vs 갔다 오다</div>
<div class="card-body">비슷해 보이지만 의미가 다른 세 표현。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">결과를 가져옴（买了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了来了</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">지속 변화（一直……来）</div>
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
      title: '-아/어다 + 이동동사 방향 정리',
      headers: ['형태', '방향', '의미', '예시'],
      rows: [
        ['-아/어다 오다', '화자 쪽으로', '해서 가져옴', '사다 왔어요，만들어다 왔어요'],
        ['-아/어다 가다', '화자 반대로', '해서 가져감', '사다 갔어요，만들어다 갔어요'],
        ['-아/어다 주다', '상대방에게', '해서 전달', '사다 줬어요，가져다 줬어요'],
        ['-아/어다 드리다', '윗사람에게', '해서 전달（존댓말）', '사다 드렸어요，가져다 드렸어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第13课：-다니요，-고 말고요 ──────────────────────────────────
  {
    id: 'card-p14-l03',
    partNumber: 14,
    lessonNumber: 3,
    title: '-다니요，-고 말고요',
    whatItDoes: '表示惊讶/反问，或强调"当然是/那还用说"',
    whatItDoesBody: '-다니요 用于对听到的内容表示惊讶、意外或质疑，相当于"竟然……？/……这是什么意思？"，是对前句信息的反应性追问。\n-고 말고요 用于强烈肯定对方的提议或疑问，相当于"当然……/那还用说……"，语气坚定积极。',
    structureNote: '-다니요：动词/形容词 기본형（終止形）+ 다니요，이다 → 이라니요，있다/없다 → 있다니요/없다니요\n-고 말고요：동사/형용사 어간 + 고 말고요（무조건 肯定）',
    rulesNote: '-다니요 는 상대방의 발화를 그대로 반복하거나 인용하면서 놀라움을 나타낸다。직접 인용에 가깝다。\n-고 말고요 는 질문에 대한 강한 긍정으로，"물론이죠"보다 감정이 더 실린다。단독으로 쓰이거나 절에 붙을 수 있다。',
    scenarioNote: '-다니요 는 "그게 사실이라니요！（那竟是真的？！）"처럼 충격이나 믿기 어려운 상황에 자주 쓰인다。\n-고 말고요 는 "같이 가고 말고요！（当然一起去！）"처럼 상대 제안에 열정적으로 동의할 때 쓰인다。',
    structures: [
      {
        ko: '동사 기본형 + 다니요',
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
        ko: '어간 + 고 말고요',
        tokens: [
          { text: '같이', role: 'plain' },
          { text: ' 가고 말고요！', role: 'verb' },
        ],
        zh: '当然一起去！',
      },
      {
        ko: '형용사 어간 + 고 말고요',
        tokens: [
          { text: '맛있고 말고요', role: 'verb' },
          { text: ' 정말', role: 'plain' },
          { text: ' 최고예요！', role: 'verb' },
        ],
        zh: '当然好吃，真的是最棒的！',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '동사/형용사 기본형 + 다니요（놀라움/반문）', examples: '떠났다니요，좋다니요，먹었다니요' },
      { type: 'rule', text: '이다 → 이라니요，아니다 → 아니라니요', examples: '학생이라니요，사실이라니요，선생님이라니요' },
      { type: 'note', text: '-다니요 는 상대 발화 인용형：들은 내용을 그대로 반복하며 놀라움 표현', examples: 'A：그 사람 떠났대요。 B：떠났다니요？' },
      { type: 'rule', text: '동사/형용사 어간 + 고 말고요（강한 긍정）', examples: '가고 말고요，좋고 말고요，먹고 말고요' },
      { type: 'compare', text: '-고 말고요 vs 물론이죠：고 말고요가 더 구어적이고 감정이 강함', examples: '물론이죠（정중한 긍정）vs 가고 말고요（열정적 동의）' },
      { type: 'note', text: '-고 말고요 단독 사용 가능（당연하다는 의미）', examples: 'A：이거 맛있어요？ B：맛있고 말고요！' },
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
      { icon: '😋', context: '力推美食', ko: '맛있고 말고요，꼭 먹어 봐요！', zh: '当然好吃，一定要尝尝！' },
      { icon: '😤', context: '对价格惊讶', ko: '이게 10만 원이라니요？ 너무 비싸요！', zh: '这竟然要10万韩元？太贵了！' },
      { icon: '🤝', context: '爽快答应', ko: '도와드리고 말고요，제가 할게요！', zh: '当然帮您，我来做！' },
    ],
    mistakes: [
      { wrong: '그게 사실이다니요？', correct: '그게 사실이라니요？', note: '이다 의 다니요 결합형은 이라니요이다。이다니요는 비문이다。이다 어간에는 라니요를 붙인다：이라니요（✓）。' },
      { wrong: '이다니요', correct: '이라니요', note: '이다 의 다니요 결합형은 이라니요이다。이다니요는 비문이다。이다 어간에는 라니요를 붙인다。' },
      { wrong: '가고말고요', correct: '가고 말고요', note: '-고 말고요 는 앞 어간과 띄어 쓴다：가고 말고요（✓）。붙여 쓰면 틀린 형태로 보인다。' },
      { wrong: 'A：맛있어요？ B：맛있다니요', correct: '맛있고 말고요', note: '-다니요 는 놀라움/반문에 쓴다。강한 긍정에는 -고 말고요 를 써야 한다。맛있다니요는 "竟然好吃？"의 뜻으로 의아한 반응이 된다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-다니요，-고 말고요',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람이 회사를 그만___요？（那个人竟然辞职了？—表惊讶）',
          options: ['뒀다니', '뒀고 말고', '뒀거든', '뒀잖아'],
          answer: 0 as 0|1|2|3,
          explanation: '-다니요：놀라움/반문：그만뒀다니요（✓）。고 말고요는 강한 긍정，거든요는 배경 설명，잖아요는 공유 정보 환기。',
        },
        {
          prompt: '그게 거짓말___요？ 저는 진짜인 줄 알았어요。（那竟然是谎言？）',
          options: ['이라니', '이다니', '이고 말고', '이거든'],
          answer: 0 as 0|1|2|3,
          explanation: '이다（名词+이다）+ 다니요 → 이라니요（✓）。이다니요는 비문，이고 말고요는 강한 긍정，이거든요는 설명。',
        },
        {
          prompt: 'A：같이 영화 볼래요？ B：보___ 말고요！（当然看！）',
          options: ['고', '다니', '거든', '잖아'],
          answer: 0 as 0|1|2|3,
          explanation: '-고 말고요：강한 긍정/동의：보고 말고요（✓）。다니요는 놀라움，거든요는 설명，잖아요는 환기。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['그게 사실이라니요？', '그게 사실이다니요？', '도와드리다니요！（강한 긍정）', '가고말고요'],
          answer: 0 as 0|1|2|3,
          explanation: '이다 + 다니요 → 이라니요：사실이라니요（✓）。이다니요는 비문，강한 긍정에는 고 말고요，고 말고요 앞에 띄어쓰기 필요。',
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
      <div class="ko">기본형/과거형 + 다니요</div>
      <div class="zh">表惊讶/反问（对听到的内容）</div>
    </div>
    <div class="ov-block">
      <div class="badge">当然！</div>
      <div class="ko">어간 + 고 말고요</div>
      <div class="zh">强烈肯定（那还用说）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">주의</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">이다</span> + 다니요 → <b style="color:#ff7fa8">이라니요</b>（不是이다니요）</div>
        <div><span style="font-weight:700">-고 말고요</span> 앞에 <b style="color:#ff7fa8">띄어쓰기</b> 필수</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사실이다니요？</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사실이라니요？</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있다니요！（강한 긍정）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있고 말고요！</span></div></div>
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
<div class="card-body">비슷한 기능의 다른 표현과 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-다니요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">놀라움/반문，상대 발화 반복</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀다니요？</span><span style="font-size:16px;color:#5a4640">竟然辞职了？</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-잖아요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">공유 정보 환기（惊讶 없음）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그만뒀잖아요</span><span style="font-size:16px;color:#5a4640">不是辞职了嘛（你知道的）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 말고요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">강한 구어적 긍정</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가고 말고요！</span><span style="font-size:16px;color:#5a4640">当然去！（热情）</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">물론이죠</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">정중한 긍정，격식체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">물론이죠，가겠습니다</span><span style="font-size:16px;color:#5a4640">当然，我去（正式）</span></div>
  </div>
</div>`,
    compareLabel: '-다니요 vs -잖아요 / -고 말고요 vs 물론이죠',
    quickTable: {
      title: '-다니요 / -고 말고요 정리',
      headers: ['어미', '기능', '접속', '예시'],
      rows: [
        ['-다니요', '놀라움/반문', '기본형/과거형 뒤', '떠났다니요，좋다니요'],
        ['이라니요', '이다 뒤 특수형', '이다 → 이라니요', '사실이라니요，학생이라니요'],
        ['-고 말고요', '강한 긍정', '어간 + 고 말고요', '가고 말고요，맛있고 말고요'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第14课：-아/어/여 오다，-아/어/여 가다 ────────────────────────
  {
    id: 'card-p14-l04',
    partNumber: 14,
    lessonNumber: 4,
    title: '-아/어 오다，-아/어 가다',
    whatItDoes: '表示状态/动作从过去持续到现在，或向未来延续',
    whatItDoesBody: '-아/어 오다 表示某状态或动作从过去持续到现在，相当于"一直……到现在/……起来了"，强调变化的到达点是当下。\n-아/어 가다 表示某状态或动作从现在向未来延续，相当于"越来越……/逐渐……下去"，强调变化的方向是未来。\n두 표현은 시간의 방향이 핵심：오다（过去→现在），가다（现在→未来）。',
    structureNote: '동사/형용사 어간 + 아/어 오다（过去→现在）\n동사/형용사 어간 + 아/어 가다（现在→未来）\n어간 모음 ㅏ/ㅗ → 아，그 외 → 어，하다 → 해',
    rulesNote: '-아/어 오다 는 주로 "지금까지" 와 함께 쓰이며 과거의 지속을 나타낸다。\n-아/어 가다 는 "점점"，"서서히" 등과 함께 쓰이며 미래 방향의 변화를 나타낸다。',
    scenarioNote: '"한국어를 배워 오다（一直在学韩语）" vs "한국어 실력이 늘어 가다（韩语水平在提高）"처럼 같은 주제라도 시간 방향이 다르다。',
    structures: [
      {
        ko: '어간 + 아/어 오다（过去→现在）',
        tokens: [
          { text: '10년 동안', role: 'time' },
          { text: ' 이 일을', role: 'object' },
          { text: ' 해', role: 'verb' },
          { text: ' 왔어요', role: 'verb' },
        ],
        zh: '10年来一直做这个工作。',
      },
      {
        ko: '어간 + 아/어 가다（现在→未来）',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: ' 점점', role: 'plain' },
          { text: ' 추워', role: 'verb' },
          { text: ' 가요', role: 'verb' },
        ],
        zh: '天气越来越冷了。',
      },
      {
        ko: '변화 오다（상태 변화 도달）',
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
        ko: '변화 가다（상태 변화 진행）',
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
      { type: 'rule', text: 'ㅏ/ㅗ 어간 + 아 오다/가다', examples: '살아 오다，알아 오다，좋아 가다' },
      { type: 'rule', text: '그 외 어간 + 어 오다/가다', examples: '배워 오다，늘어 오다，커 가다，줄어 가다' },
      { type: 'compare', text: '-아/어 오다 vs -아/어 가다：시간 방향이 반대', examples: '살아 왔어요（一直生活到现在）vs 살아 갈 거예요（以后继续生活）' },
      { type: 'note', text: '-아/어 오다 는 "지금까지" 와 호응，과거→현재 지속', examples: '지금까지 참아 왔어요，10년간 해 왔어요' },
      { type: 'note', text: '-아/어 가다 는 "점점/서서히" 와 호응，현재→미래 변화', examples: '점점 좋아 가요，서서히 나아 가고 있어요' },
      { type: 'compare', text: '-아/어 오다 vs -아/어다 오다：전자는 지속，후자는 결과 이동', examples: '배워 왔어요（一直在学）vs 사다 왔어요（买了来）' },
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
      { wrong: '공부해 갔어요', correct: '공부해 왔어요', note: '과거부터 현재까지의 지속은 -아/어 오다 를 쓴다。-아/어 가다 는 현재에서 미래 방향이다：지금까지 공부해 왔어요（✓）。' },
      { wrong: '날씨가 추워 왔어요', correct: '날씨가 추워 가요', note: '현재 진행 중인 미래 방향 변화는 -아/어 가다 를 쓴다：추워 가요（✓）。추워 왔어요는 과거부터 지금까지 추워진 결과를 나타낸다。' },
      { wrong: '사다 와요', correct: '사다 왔어요 또는 사 왔어요', note: '-아/어 오다（지속）와 -아/어다 오다（결과 이동）는 구조가 다르다。지속 표현에는 어 오다，결과 이동에는 어다 오다를 쓴다。' },
      { wrong: '점점 좋아 왔어요', correct: '점점 좋아 가고 있어요', note: '"점점"과 함께 현재 진행 중인 변화는 -아/어 가다 가 자연스럽다：좋아 가고 있어요（✓）。좋아 왔어요는 과거 누적 결과。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-아/어 오다，-아/어 가다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '10년간 이 회사에서 일해 ___。（10年来一直在这家公司工作。）',
          options: ['왔어요', '갔어요', '왔다 갔어요', '가고 왔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '과거부터 현재까지 지속 → -아/어 오다：일해 왔어요（✓）。갔어요는 미래 방향，왔다 갔어요/가고 왔어요는 없는 형태。',
        },
        {
          prompt: '날씨가 점점 따뜻해 ___。（天气越来越暖了。—现在进行中）',
          options: ['가요', '와요', '왔어요', '갔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '현재 진행 중인 미래 방향 변화 → -아/어 가다：따뜻해 가요（✓）。와요는 과거→현재，왔어요는 과거 결과，갔어요는 완료。',
        },
        {
          prompt: '-아/어 오다 와 -아/어 가다 의 차이는？',
          options: ['시간 방향（오다：과거→현재，가다：현재→미래）', '오다는 이동，가다는 지속', '오다는 긍정，가다는 부정', '오다는 형용사，가다는 동사'],
          answer: 0 as 0|1|2|3,
          explanation: '핵심 차이는 시간 방향：오다는 과거→현재 지속，가다는 현재→미래 변화。이동/긍부정/품사와는 무관하다。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['지금까지 열심히 살아 왔어요', '날씨가 추워 왔어요（점점 변화）', '3년간 배워 갔어요（과거 지속）', '점점 좋아 왔어요（현재 진행）'],
          answer: 0 as 0|1|2|3,
          explanation: '살아 왔어요：과거→현재 지속（✓）。추워 왔어요는 점점 변화에 가다 필요，배워 갔어요는 과거 지속에 오다 필요，좋아 왔어요는 현재 진행에 가다 필요。',
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
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">본课语法点</div></div>
    <div class="ov-block">
      <div class="badge">到现在</div>
      <div class="ko">어간 + 아/어 오다</div>
      <div class="zh">过去→现在 持续/累积</div>
    </div>
    <div class="ov-block">
      <div class="badge">向未来</div>
      <div class="ko">어간 + 아/어 가다</div>
      <div class="zh">现在→未来 变化/延续</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">시간 방향 구별</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>살아 <b style="color:#ff7fa8">왔어요</b>：过去一直生活到现在</div>
        <div>살아 <b style="color:#ff7fa8">갈 거예요</b>：今后也要继续生活</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">별踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">점점 추워 왔어요（현재 변화）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">점점 추워 가요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">10년간 배워 갔어요（과거 지속）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">10년간 배워 왔어요</span></div></div>
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
<div class="reminder-box">-아/어다 오다（结果移动）와 -아/어 오다（持续）는 형태가 다르다。</div>`,
    compareHtml: `<div class="card-title">-아/어 오다 vs -아/어 가다 vs -아/어다 오다</div>
<div class="card-body">세 표현을 혼동하지 않도록 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">과거→현재 지속/累積</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배워 왔어요</span><span style="font-size:16px;color:#5a4640">一直学到现在</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 가다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">현재→미래 변화/延续</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋아 가요</span><span style="font-size:16px;color:#5a4640">越来越好</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어다 오다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">결과물 이동（做了带来）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사다 왔어요</span><span style="font-size:16px;color:#5a4640">买了带来了</span></div>
  </div>
</div>`,
    compareLabel: '-아/어 오다 vs -아/어 가다 vs -아/어다 오다',
    quickTable: {
      title: '-아/어 오다 / -아/어 가다 정리',
      headers: ['형태', '시간 방향', '호응 부사', '예시'],
      rows: [
        ['-아/어 오다', '과거→현재', '지금까지，그동안', '배워 왔어요，해 왔어요'],
        ['-아/어 가다', '현재→미래', '점점，서서히', '좋아 가요，커 가고 있어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第15课：에 대해(서)，에 관해서，에 관한 ────────────────────────
  {
    id: 'card-p14-l05',
    partNumber: 14,
    lessonNumber: 5,
    title: '에 대해(서)，에 관해서，에 관한',
    whatItDoes: '表示"关于……/有关……"的话题指示',
    whatItDoesBody: '에 대해(서) 和 에 관해(서) 均表示"关于……"，用于指示谈论、研究、思考的对象，意思非常接近，可以互换。\n에 관한/에 대한 是관형사형（定语形），用于修饰后面的名词，相当于"关于……的（名词）"。\n에 대해서 较口语，에 관해서 较书面/正式。',
    structureNote: '명사 + 에 대해（서）：动词前，"关于……"\n명사 + 에 관해（서）：动词前，"关于……"（较正式）\n명사 + 에 관한/에 대한 + 명사：定语，"关于……的（명사）"',
    rulesNote: '에 대해 와 에 관해 는 의미가 거의 같지만，에 관해 는 학술/보고서 등 격식체에서 더 자연스럽다。\n에 관한/에 대한 은 뒤에 명사가 반드시 온다（관형사형이므로）。동사 앞에는 에 대해/에 관해 를 쓴다。',
    scenarioNote: '"환경에 대해 이야기하다"，"역사에 관한 책"처럼 발표, 논문, 뉴스, 대화에서 폭넓게 쓰인다。',
    structures: [
      {
        ko: '명사 + 에 대해（서）+ 동사',
        tokens: [
          { text: '이 문제', role: 'plain' },
          { text: '에 대해서', role: 'plain' },
          { text: ' 어떻게 생각해요？', role: 'verb' },
        ],
        zh: '关于这个问题，你怎么看？',
      },
      {
        ko: '명사 + 에 관해（서）+ 동사',
        tokens: [
          { text: '환경', role: 'plain' },
          { text: '에 관해서', role: 'plain' },
          { text: ' 발표했어요', role: 'verb' },
        ],
        zh: '就环境问题做了发表。',
      },
      {
        ko: '명사 + 에 관한/에 대한 + 명사',
        tokens: [
          { text: '한국 역사', role: 'plain' },
          { text: '에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 읽었어요', role: 'verb' },
        ],
        zh: '读了关于韩国历史的书。',
      },
      {
        ko: '에 대한 + 명사（구어）',
        tokens: [
          { text: '그 사건', role: 'plain' },
          { text: '에 대한', role: 'plain' },
          { text: ' 뉴스를', role: 'object' },
          { text: ' 봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '명사 + 에 대해（서）+ 동사：구어/문어 모두 사용', examples: '이것에 대해 말씀드릴게요，음식에 대해서 이야기해요' },
      { type: 'rule', text: '명사 + 에 관해（서）+ 동사：격식/학술 문체에 더 자연스러움', examples: '환경에 관해 연구했어요，역사에 관해서 발표했어요' },
      { type: 'rule', text: '명사 + 에 대한/에 관한 + 명사：관형사형，뒤에 명사 필수', examples: '환경에 관한 책，그 문제에 대한 해결책' },
      { type: 'compare', text: '에 대해 vs 에 관해：의미 동일，에 관해가 더 격식체', examples: '내 꿈에 대해 말했어요（구어）vs 기후에 관해 연구했어요（격식）' },
      { type: 'note', text: '에 대해/에 관해 뒤에 바로 명사 불가，에 대한/에 관한 사용', examples: '환경에 대해 책（✗）→ 환경에 대한 책（✓）' },
      { type: 'note', text: '서 생략 가능：에 대해서 = 에 대해，에 관해서 = 에 관해', examples: '이것에 대해 얘기해요 = 이것에 대해서 얘기해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '건강에 대해서', role: 'plain' },
          { text: ' 이야기해 봐요', role: 'verb' },
        ],
        zh: '来聊聊关于健康的话题吧。',
        swapWords: ['음식에 대해서', '여행에 대해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '기후 변화에 관해서', role: 'plain' },
          { text: ' 보고서를', role: 'object' },
          { text: ' 썼어요', role: 'verb' },
        ],
        zh: '写了关于气候变化的报告。',
        swapWords: ['환경에 관해서', '역사에 관해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한국 문화에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 추천해 줘요', role: 'verb' },
        ],
        zh: '推荐一本关于韩国文化的书给我吧。',
        swapWords: ['역사에 관한', '음식에 대한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사건에 대한', role: 'plain' },
          { text: ' 뉴스를', role: 'object' },
          { text: ' 봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。',
        swapWords: ['그 문제에 대한', '그 영화에 대한'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📝', context: '写报告', ko: '환경에 관해서 보고서를 써야 해요.', zh: '得写一篇关于环境的报告。' },
      { icon: '💬', context: '日常对话', ko: '요즘 건강에 대해 관심이 많아요.', zh: '最近对健康很感兴趣。' },
      { icon: '📚', context: '推荐书籍', ko: '역사에 관한 책을 많이 읽었어요.', zh: '读了很多关于历史的书。' },
      { icon: '🎤', context: '发表', ko: '이 주제에 대해서 발표하겠습니다.', zh: '我将就这个主题进行发表。' },
      { icon: '🤔', context: '征求意见', ko: '이 문제에 대해 어떻게 생각해요？', zh: '关于这个问题你怎么看？' },
      { icon: '📰', context: '新闻报道', ko: '그 사건에 대한 기사를 읽었어요.', zh: '读了关于那件事的报道。' },
    ],
    mistakes: [
      { wrong: '환경에 대해 책을 읽었어요', correct: '환경에 대한 책을 읽었어요', note: '명사를 수식할 때는 에 대한/에 관한（관형사형）을 써야 한다。에 대해/에 관해 뒤에는 동사가 온다：에 대해 이야기하다（✓）。' },
      { wrong: '에 관해한 책', correct: '에 관한 책', note: '관형사형은 에 관한 이다。에 관해한은 없는 형태이다。에 관해 + 동사，에 관한 + 명사로 구분한다。' },
      { wrong: '이것에 대하여 이야기해요', correct: '이것에 대해서 이야기해요', note: '에 대하여 는 문어/격식체 형태。구어에서는 에 대해서 또는 에 대해 가 더 자연스럽다。' },
      { wrong: '에 관해와 에 대해를 완전히 다른 표현으로 혼동', correct: '에 관해서 ≈ 에 대해서（의미 동일，격식도 차이）', note: '에 관해서 와 에 대해서 는 의미가 같다。에 관해서 가 학술/격식체에 더 어울리고，에 대해서 는 구어에서도 자연스럽다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '에 대해(서)，에 관해서，에 관한',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '한국 역사___ 책을 읽었어요。（读了关于韩国历史的书。）',
          options: ['에 관한', '에 관해', '에 대해', '에 대해서'],
          answer: 0 as 0|1|2|3,
          explanation: '명사（책）를 수식하므로 관형사형 에 관한（✓）。에 관해/에 대해/에 대해서 는 동사 앞에 쓰며 명사 직접 수식 불가。',
        },
        {
          prompt: '기후 변화___ 발표했어요。（就气候变化做了发表。）',
          options: ['에 관해서', '에 관한', '에 대한', '에 대하여서'],
          answer: 0 as 0|1|2|3,
          explanation: '동사（발표하다）앞에는 에 관해서（✓）。에 관한/에 대한 은 관형사형으로 명사 앞에만，에 대하여서 는 없는 형태。',
        },
        {
          prompt: '이 문제___ 어떻게 생각해요？（关于这个问题，你怎么看？）',
          options: ['에 대해서', '에 대한', '에 관한', '에 관하여서'],
          answer: 0 as 0|1|2|3,
          explanation: '동사（생각하다）앞 → 에 대해서（✓）。에 대한/에 관한 은 관형사형，에 관하여서 는 없는 형태。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['그 사건에 대한 뉴스를 봤어요', '환경에 대해 책을 읽었어요', '역사에 관해한 보고서', '음식에 에 대해 이야기해요'],
          answer: 0 as 0|1|2|3,
          explanation: '에 대한 + 명사（뉴스）：올바른 관형사형（✓）。에 대해 + 명사 직접 수식 불가，에 관해한은 없는 형태，에 에 대해 는 조사 중복。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第15课</div>
    <div class="ov-hero-title">에 대해，에 관해，에 관한</div>
    <div class="ov-hero-sub">关于…… · 有关……的</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">关于……（动词前）</div>
      <div class="ko">명사 + 에 대해（서）/ 에 관해（서）</div>
      <div class="zh">话题指示，后接动词</div>
    </div>
    <div class="ov-block">
      <div class="badge">……的（名词前）</div>
      <div class="ko">명사 + 에 대한 / 에 관한 + 명사</div>
      <div class="zh">定语形，后接名词</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">격식도 차이</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">에 대해（서）</span>：구어/문어 모두 OK</div>
        <div><span style="font-weight:700">에 관해（서）</span>：학술/격식체에 더 자연스러움</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">환경에 대해 책（+명사 직접）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">환경에 대한 책</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">에 관해한（없는 형태）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">에 관한</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">关于……</div>
<div class="card-body">话题前置的表达，说什么之前先说"关于"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">动词前 vs 名词前</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">+ 동사 → 에 대해/에 관해</div>
      <div style="font-size:16px;font-weight:800;color:#241917">환경에 대해 이야기해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">聊聊关于环境的话题。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">+ 명사 → 에 대한/에 관한</div>
      <div style="font-size:16px;font-weight:800;color:#241917">환경에 관한 책이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">是关于环境的书。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 뒤에 동사 → 에 대해，뒤에 명사 → 에 대한</div>
</div>
<div class="reminder-box">에 관해서 = 에 대해서（意思相同，관해서 更书面）。</div>`,
    compareHtml: `<div class="card-title">에 대해 vs 에 관해 vs 에 대한 vs 에 관한</div>
<div class="card-body">네 가지 형태의 정확한 쓰임。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">동사 앞，구어/문어</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">건강에 대해 이야기해요</span><span style="font-size:16px;color:#5a4640">聊关于健康的话题</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">동사 앞，격식/학술체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">환경에 관해 연구해요</span><span style="font-size:16px;color:#5a4640">研究关于环境的问题</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">명사 앞，구어/문어</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 사건에 대한 뉴스</span><span style="font-size:16px;color:#5a4640">关于那件事的新闻</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">명사 앞，격식/학술체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">역사에 관한 책</span><span style="font-size:16px;color:#5a4640">关于历史的书</span></div>
  </div>
</div>`,
    compareLabel: '에 대해 vs 에 관해 vs 에 대한 vs 에 관한',
    quickTable: {
      title: '에 대해/에 관해 사용 정리',
      headers: ['형태', '뒤에 오는 것', '격식도', '예시'],
      rows: [
        ['에 대해（서）', '동사', '구어/문어', '건강에 대해 이야기해요'],
        ['에 관해（서）', '동사', '격식/학술', '환경에 관해 연구해요'],
        ['에 대한', '명사', '구어/문어', '그 문제에 대한 해결책'],
        ['에 관한', '명사', '격식/학술', '역사에 관한 책'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第16课：을/를 비롯한，을/를 비롯해서，(까지)만 해도 ──────────
  {
    id: 'card-p14-l06',
    partNumber: 14,
    lessonNumber: 6,
    title: '을/를 비롯한，비롯해서，만 해도',
    whatItDoes: '举例列举，或以某事为基准说"光是……就……"',
    whatItDoesBody: '을/를 비롯한 和 을/를 비롯해서 均表示"以……为首/包括……在内"，用于列举，说明某事物是其中代表性的例子。\n비롯한 是관형사형（定语），修饰后面的名词；비롯해서 是连用形，后接动词。\n(까지)만 해도 表示"光是……就……/即便只说……也……"，以某一具体事例强调整体程度，常带有"更不用说其他"的含义。',
    structureNote: '명사 + 을/를 비롯한 + 명사（以……为首的……）\n명사 + 을/를 비롯해서 + 동사（包括……在内，……）\n명사 + 만 해도 / 명사 + 까지만 해도（光是……就……）',
    rulesNote: '비롯한/비롯해서 앞 명사는 전체 중 대표적인 예시가 온다。\n만 해도 는 극단적 사례 하나를 들어 전체를 강조한다。까지 는 "극단"을 더 강조하는 보조사。',
    scenarioNote: '"BTS를 비롯한 K-POP 그룹들"처럼 대표 사례를 먼저 제시하는 설명/발표에 자주 쓰인다。\n"이것만 해도 너무 많아요"처럼 일상 대화에서 과장/강조에 쓰인다。',
    structures: [
      {
        ko: '을/를 비롯한 + 명사',
        tokens: [
          { text: 'BTS', role: 'plain' },
          { text: '를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们很受欢迎。',
      },
      {
        ko: '을/를 비롯해서 + 동사',
        tokens: [
          { text: '서울', role: 'plain' },
          { text: '을 비롯해서', role: 'plain' },
          { text: ' 전국에서', role: 'place' },
          { text: ' 참가했어요', role: 'verb' },
        ],
        zh: '包括首尔在内，全国各地都参加了。',
      },
      {
        ko: '명사 + 만 해도',
        tokens: [
          { text: '이것', role: 'plain' },
          { text: '만 해도', role: 'plain' },
          { text: ' 너무 많아요', role: 'verb' },
        ],
        zh: '光是这个就已经太多了。',
      },
      {
        ko: '명사 + 까지만 해도',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '까지만 해도', role: 'plain' },
          { text: ' 괜찮았어요', role: 'verb' },
        ],
        zh: '就连昨天还好好的（更不用说之前）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '받침O 명사 + 을 비롯한/비롯해서，받침X 명사 + 를 비롯한/비롯해서', examples: '음악을 비롯한（받침ㄱ），BTS를 비롯해서（받침X）' },
      { type: 'rule', text: '비롯한 + 명사（관형사형），비롯해서 + 동사（연결형）', examples: 'BTS를 비롯한 그룹들（명사 수식）vs 서울을 비롯해서 전국이（동사 앞）' },
      { type: 'note', text: '비롯한/비롯해서 앞 명사는 뒤에 나열될 전체의 대표 사례', examples: 'BTS를 비롯한 K-POP 그룹들（BTS가 대표 사례）' },
      { type: 'rule', text: '명사 + 만 해도：극단 사례로 전체 강조', examples: '이것만 해도，서울만 해도，하루만 해도' },
      { type: 'rule', text: '명사 + 까지만 해도：까지 첨가로 극단성 강조', examples: '어제까지만 해도，그것까지만 해도' },
      { type: 'compare', text: '만 해도 vs 까지만 해도：의미 유사，까지만 해도가 더 극단적', examples: '이것만 해도 많아요 vs 이것까지만 해도 이미 너무 많아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: 'BTS를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 세계적으로', role: 'plain' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们在全球很受欢迎。',
        swapWords: ['블랙핑크를 비롯한', '한국을 비롯한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울을 비롯해서', role: 'plain' },
          { text: ' 전국에서', role: 'place' },
          { text: ' 많은 사람들이', role: 'subject' },
          { text: ' 모였어요', role: 'verb' },
        ],
        zh: '包括首尔在内，全国各地聚集了很多人。',
        swapWords: ['한국을 비롯해서', '음식을 비롯해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '교통비만 해도', role: 'plain' },
          { text: ' 한 달에', role: 'time' },
          { text: ' 10만 원이', role: 'subject' },
          { text: ' 넘어요', role: 'verb' },
        ],
        zh: '光是交通费一个月就超过10万韩元。',
        swapWords: ['식비만 해도', '이것만 해도'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '어제까지만 해도', role: 'plain' },
          { text: ' 건강했는데', role: 'verb' },
          { text: ' 갑자기', role: 'plain' },
          { text: ' 아파요', role: 'verb' },
        ],
        zh: '就连昨天还好好的，突然就不舒服了。',
        swapWords: ['아까까지만 해도', '지난주까지만 해도'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'K-POP介绍', ko: 'BTS를 비롯한 K-POP 가수들이 유명해요.', zh: '以BTS为首的K-POP歌手们都很有名。' },
      { icon: '🌏', context: '国际会议', ko: '한국을 비롯해서 20개국이 참가했어요.', zh: '包括韩国在内，共20个国家参加了。' },
      { icon: '💸', context: '生活费贵', ko: '집세만 해도 너무 비싸요.', zh: '光是房租就太贵了。' },
      { icon: '😮', context: '突然变化', ko: '아까까지만 해도 괜찮았는데요.', zh: '刚才还好好的呢。' },
      { icon: '📊', context: '数据列举', ko: '서울을 비롯한 대도시의 집값이 올랐어요.', zh: '以首尔为首的大城市房价上涨了。' },
      { icon: '😫', context: '任务繁重', ko: '이것까지만 해도 이미 너무 많아요.', zh: '光是这些就已经太多了。' },
    ],
    mistakes: [
      { wrong: 'BTS를 비롯해서 그룹들이', correct: 'BTS를 비롯한 그룹들이', note: '명사를 수식할 때는 관형사형 비롯한 을 쓴다。비롯해서 는 연결형으로 동사 앞에 쓴다：비롯해서 모였어요（✓）。' },
      { wrong: 'BTS를 비롯하는 그룹', correct: 'BTS를 비롯한 그룹', note: '비롯한 은 비롯하다의 관형사형이다。비롯하는 은 현재형 관형사형으로 이 표현에 쓰이지 않는다。관형사형은 비롯한 이다。' },
      { wrong: '교통비도 해도 비싸요', correct: '교통비만 해도 비싸요', note: '만 해도 는 조사 만 + 해도 의 결합이다。도 해도 는 없는 표현이다。광（光是）의 뉘앙스를 내려면 만 해도 를 쓴다。' },
      { wrong: '음악를 비롯한', correct: '음악을 비롯한', note: '음악（받침ㄱ 있음）→ 을 비롯한（✓）。받침 있는 명사 뒤에는 을，받침 없는 명사 뒤에는 를 쓴다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '을/를 비롯한，비롯해서，만 해도',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）',
          options: ['를', '을', '이', '가'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（받침X）→ 를 비롯한（✓）。받침 있는 명사면 을 비롯한。이/가는 주격 조사로 비롯한 앞에 쓰지 않는다。',
        },
        {
          prompt: '서울을 비롯해서 전국___ 참가했어요。（包括首尔在内，全国各地参加了。）',
          options: ['에서', '에', '이', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '전국에서：장소+에서（행동 발생 장소）：전국에서 참가했어요（✓）。에는 목적지，이는 주격，을은 목적격으로 이 문맥에 맞지 않는다。',
        },
        {
          prompt: '집세___ 해도 너무 비싸요。（光是房租就太贵了。）',
          options: ['만', '도', '까지', '는'],
          answer: 0 as 0|1|2|3,
          explanation: '만 해도：광（光是）강조：집세만 해도（✓）。도 해도는 없는 표현，까지만 해도도 가능하나 만 해도가 기본형，는 해도는 다른 의미。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['한국을 비롯한 아시아 국가들이 참가했어요', 'BTS를 비롯해서 그룹들이 유명해요（수식）', '음악를 비롯한 예술（받침O）', '이것도 해도 많아요'],
          answer: 0 as 0|1|2|3,
          explanation: '한국을 비롯한 + 명사（✓）：관형사형으로 명사 수식。비롯해서는 동사 앞，음악는→을 비롯한，이것도 해도→이것만 해도。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第16课</div>
    <div class="ov-hero-title">비롯한，비롯해서，만 해도</div>
    <div class="ov-hero-sub">以……为首 · 光是……就……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">以……为首</div>
      <div class="ko">을/를 비롯한（명사 앞）/ 비롯해서（동사 앞）</div>
      <div class="zh">列举代表性事例</div>
    </div>
    <div class="ov-block">
      <div class="badge">光是……就</div>
      <div class="ko">명사 + 만 해도 / 까지만 해도</div>
      <div class="zh">用极端事例强调整体程度</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">비롯한 vs 비롯해서</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">비롯한</span> + 명사：BTS를 비롯한 <b style="color:#ff7fa8">그룹들</b></div>
        <div><span style="font-weight:700">비롯해서</span> + 동사：서울을 비롯해서 <b style="color:#ff7fa8">전국이 참가했어요</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">BTS를 비롯해서 그룹들이（명사 수식）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">BTS를 비롯한 그룹들이</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">음악를 비롯한（받침O）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">음악을 비롯한</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">以……为首 / 光是……就</div>
<div class="card-body">列举时以代表为先，强调时以极端为证。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种列举强调方式</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">비롯한/비롯해서 — 以……为首</div>
      <div style="font-size:16px;font-weight:800;color:#241917">BTS를 비롯한 그룹들</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">以BTS为首的团体们</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">만 해도 — 光是……就</div>
      <div style="font-size:16px;font-weight:800;color:#241917">집세만 해도 너무 비싸요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">光是房租就太贵了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 비롯한(명사 수식) vs 비롯해서(동사 앞) 구분 중요</div>
</div>
<div class="reminder-box">받침O → 을 비롯한，받침X → 를 비롯한。</div>`,
    compareHtml: `<div class="card-title">비롯한 vs 비롯해서 / 만 해도 vs 까지만 해도</div>
<div class="card-body">형태가 비슷한 쌍 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">관형사형，뒤에 명사</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">BTS를 비롯한 그룹들</span><span style="font-size:16px;color:#5a4640">以BTS为首的团体们</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">연결형，뒤에 동사절</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">서울을 비롯해서 전국이 참가했어요</span><span style="font-size:16px;color:#5a4640">包括首尔在内全国参加了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 사례 강조（光是）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">집세만 해도 비싸요</span><span style="font-size:16px;color:#5a4640">光是房租就贵</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">까지만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">더 강한 극단 강조</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어제까지만 해도 괜찮았어요</span><span style="font-size:16px;color:#5a4640">就连昨天还好好的</span></div>
  </div>
</div>`,
    compareLabel: '비롯한 vs 비롯해서 / 만 해도 vs 까지만 해도',
    quickTable: {
      title: '비롯한/비롯해서/만 해도 정리',
      headers: ['형태', '뒤에 오는 것', '기능', '예시'],
      rows: [
        ['을/를 비롯한', '명사', '관형사형', 'BTS를 비롯한 그룹들'],
        ['을/를 비롯해서', '동사', '연결형', '서울을 비롯해서 참가했어요'],
        ['만 해도', '동사（술어）', '극단 강조', '집세만 해도 비싸요'],
        ['까지만 해도', '동사（술어）', '더 강한 극단', '어제까지만 해도 괜찮았어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第17课：개나，까지 ────────────────────────────────────────
  {
    id: 'card-p14-l07',
    partNumber: 14,
    lessonNumber: 7,
    title: '개나，까지（강조 보조사）',
    whatItDoes: '表示数量之多令人意外，或"连……都/甚至……"',
    whatItDoesBody: '개나（도）用在数量词后，表示说话人觉得该数量多得出乎意料，相当于"竟然……个/多达……"，带有轻微惊讶或夸张语气。\n까지 作为强调助词，表示"连……都/甚至……"，强调到了意想不到的极端，可以是正面惊喜也可以是负面意外。',
    structureNote: '수량 + 개나（도）：数量 + 개/명/권 + 나（도）（竟然……个）\n명사/부사 + 까지：名词/副词 + 까지（连……都/甚至……）',
    rulesNote: '개나 의 나 는 "예상보다 많음"을 나타내는 보조사이다。개나도 처럼 도 를 더해 더 강조할 수 있다。\n까지 는 "극단에 도달함"을 나타낸다。예상 밖의 사태，극단적 사례에 쓰인다。앞 명사에 받침이 있어도 없어도 까지 형태 변화 없다。',
    scenarioNote: '"이게 벌써 세 개나 됐어？（竟然已经三个了？）"，"친구까지 나를 의심해（连朋友都怀疑我）"처럼 놀라움 표현에 자주 쓰인다。',
    structures: [
      {
        ko: '수량 + 개나（의외의 많음）',
        tokens: [
          { text: '사과를', role: 'object' },
          { text: ' 다섯', role: 'plain' },
          { text: ' 개나', role: 'plain' },
          { text: ' 먹었어요', role: 'verb' },
        ],
        zh: '苹果竟然吃了五个。',
      },
      {
        ko: '수량 + 이나도（강조）',
        tokens: [
          { text: '실수를', role: 'object' },
          { text: ' 열 번', role: 'plain' },
          { text: '이나도', role: 'plain' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '竟然犯了十次错误。',
      },
      {
        ko: '명사 + 까지（극단 도달）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '까지', role: 'plain' },
          { text: ' 나를', role: 'object' },
          { text: ' 의심해요', role: 'verb' },
        ],
        zh: '连朋友都怀疑我。',
      },
      {
        ko: '부사 + 까지（정도 강조）',
        tokens: [
          { text: '이렇게', role: 'plain' },
          { text: '까지', role: 'plain' },
          { text: ' 할 필요는', role: 'verb' },
          { text: ' 없어요', role: 'verb' },
        ],
        zh: '没必要做到这种程度。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '수량사 + 나：예상보다 많음을 나타냄', examples: '다섯 개나，열 명이나，세 권이나，두 시간이나' },
      { type: 'note', text: '나（이나）선택：앞 수량사 末자 받침 있으면 이나，없으면 나', examples: '다섯 개나（받침X），열 명이나（받침O），세 번이나（받침O）' },
      { type: 'note', text: '나도：나 + 도를 더해 더 강한 놀라움 표현', examples: '열 개나도 먹었어요，세 번이나도 실수했어요' },
      { type: 'rule', text: '명사 + 까지：극단적 사례 강조（甚至……）', examples: '친구까지，선생님까지，그것까지，이렇게까지' },
      { type: 'compare', text: '까지 vs 도：까지는 극단 도달，도는 포함/첨가', examples: '친구까지 왔어요（连朋友都来了）vs 친구도 왔어요（朋友也来了）' },
      { type: 'note', text: '까지 앞 명사는 받침 유무와 관계없이 까지 형태 변화 없음', examples: '친구까지，학교까지，선생님까지 모두 동일' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: ' 커피를', role: 'object' },
          { text: ' 세 잔이나', role: 'plain' },
          { text: ' 마셨어요', role: 'verb' },
        ],
        zh: '今天竟然喝了三杯咖啡。',
        swapWords: ['다섯 잔이나', '두 잔이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '숙제를', role: 'object' },
          { text: ' 두 번이나', role: 'plain' },
          { text: ' 잊어버렸어요', role: 'verb' },
        ],
        zh: '作业竟然忘了两次。',
        swapWords: ['세 번이나', '네 번이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구까지', role: 'subject' },
          { text: ' 나를', role: 'object' },
          { text: ' 믿지 않아요', role: 'verb' },
        ],
        zh: '连朋友都不相信我。',
        swapWords: ['가족까지', '선생님까지'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '이렇게까지', role: 'plain' },
          { text: ' 해 줄', role: 'verb' },
          { text: ' 필요는 없었는데요', role: 'plain' },
        ],
        zh: '没必要做到这种程度的。',
        swapWords: ['여기까지', '이것까지'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😮', context: '吃太多', ko: '피자를 네 조각이나 먹었어요.', zh: '竟然吃了四片披萨。' },
      { icon: '😢', context: '连朋友都', ko: '친구까지 연락을 안 해요.', zh: '连朋友都不联系了。' },
      { icon: '😅', context: '犯了很多错', ko: '오늘 실수를 다섯 번이나 했어요.', zh: '今天竟然犯了五次错。' },
      { icon: '🥺', context: '感动', ko: '선생님까지 와 주셨어요.', zh: '连老师都来了。' },
      { icon: '😤', context: '等了好久', ko: '두 시간이나 기다렸어요.', zh: '竟然等了两个小时。' },
      { icon: '😨', context: '过分了', ko: '이렇게까지 할 줄은 몰랐어요.', zh: '没想到会做到这种程度。' },
    ],
    mistakes: [
      { wrong: '다섯 개나이', correct: '다섯 개나', note: '개는 받침이 없으므로 나 를 쓴다：다섯 개나（✓）。이나는 받침 있는 수량사 뒤에 쓴다：세 번이나（번 받침O）。' },
      { wrong: '친구도까지 왔어요', correct: '친구까지 왔어요 또는 친구도 왔어요', note: '까지 와 도 는 같은 위치의 보조사로 동시에 쓸 수 없다。까지 는 극단，도 는 포함。문맥에 맞게 하나만 선택한다。' },
      { wrong: '열 명나', correct: '열 명이나', note: '명（받침ㅇ 있음）→ 이나：열 명이나（✓）。받침 없는 수량사에만 나 를 쓴다。' },
      { wrong: '까지도 친구가 안 왔어요', correct: '친구까지도 안 왔어요', note: '까지（도）는 강조하는 명사 바로 뒤에 붙는다：친구까지도（✓）。까지도를 문장 앞에 독립적으로 쓰는 것은 어색하다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '개나，까지',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '커피를 세 잔___ 마셨어요。（竟然喝了三杯咖啡。）',
          options: ['이나', '나', '까지', '도'],
          answer: 0 as 0|1|2|3,
          explanation: '잔（받침ㄴ 있음）→ 이나：세 잔이나（✓）。받침 없는 수량사면 나，까지는 极端강조，도는 포함。',
        },
        {
          prompt: '사과를 다섯 개___ 먹었어요。（竟然吃了五个苹果。）',
          options: ['나', '이나', '까지', '도'],
          answer: 0 as 0|1|2|3,
          explanation: '개（받침X）→ 나：다섯 개나（✓）。받침 있는 수량사면 이나，까지/도는 다른 용법。',
        },
        {
          prompt: '가족___ 나를 이해 못 해요。（连家人都不理解我。）',
          options: ['까지', '나', '이나', '도'],
          answer: 0 as 0|1|2|3,
          explanation: '극단 사례 강조（连……都）→ 까지：가족까지（✓）。나/이나는 수량사 뒤，도는 포함（家人也）으로 극단 강조 뉘앙스가 약하다。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['두 시간이나 기다렸어요', '세 개나이 먹었어요', '친구도까지 왔어요', '열 명나 모였어요'],
          answer: 0 as 0|1|2|3,
          explanation: '시간（받침ㄴ）→ 이나：두 시간이나（✓）。세 개나이→세 개나，친구도까지→친구까지（조사 중복），열 명나→열 명이나（받침O）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第17课</div>
    <div class="ov-hero-title">개나，까지</div>
    <div class="ov-hero-sub">竟然……个 · 连……都/甚至</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">竟然……个</div>
      <div class="ko">수량 + 나/이나（개나）</div>
      <div class="zh">数量超出预期，表惊讶</div>
    </div>
    <div class="ov-block">
      <div class="badge">连……都</div>
      <div class="ko">명사 + 까지</div>
      <div class="zh">极端事例强调（甚至……）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">나/이나 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>받침X → <b style="color:#ff7fa8">나</b>：다섯 개나，세 시간이나 아님→세 시간이나（시간 받침X…）</div>
        <div>받침O → <b style="color:#ff7fa8">이나</b>：세 잔이나，두 번이나，열 명이나</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">열 명나（받침O에 나）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">열 명이나</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구도까지（보조사 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구까지</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">竟然这么多 / 连……都</div>
<div class="card-body">数量超出预期用 나/이나，极端举例用 까지。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">두 보조사의 차이</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">나/이나 — 数量惊讶</div>
      <div style="font-size:16px;font-weight:800;color:#241917">커피를 세 잔이나 마셨어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">竟然喝了三杯咖啡。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">까지 — 极端事例</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친구까지 안 믿어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">连朋友都不相信了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 받침O → 이나，받침X → 나（까지는 변화 없음）</div>
</div>
<div class="reminder-box">까지 와 도 는 동시에 쓰지 않는다（도까지 X）。</div>`,
    compareHtml: `<div class="card-title">나/이나 vs 도 vs 까지</div>
<div class="card-body">세 보조사 의미 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">나/이나</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">수량 예상 초과（惊讶）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 잔이나 마셨어요</span><span style="font-size:16px;color:#5a4640">竟然喝了三杯</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">포함/첨가（也）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구도 왔어요</span><span style="font-size:16px;color:#5a4640">朋友也来了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 도달（连……都/甚至）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了</span></div>
  </div>
</div>`,
    compareLabel: '나/이나 vs 도 vs 까지',
    quickTable: {
      title: '나/이나 받침 선택 / 까지 정리',
      headers: ['조사', '앞 명사 조건', '기능', '예시'],
      rows: [
        ['나', '받침X 수량사', '수량 초과 놀라움', '다섯 개나，두 시간나→두 시간이나（간：받침ㄴ→이나）'],
        ['이나', '받침O 수량사', '수량 초과 놀라움', '세 잔이나，두 번이나，열 명이나'],
        ['까지', '받침 무관', '극단 사례 강조', '친구까지，가족까지，이렇게까지'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  // ── 第18课：(이)라든가，(이)라든지，마저 ──────────────────────────
  {
    id: 'card-p14-l08',
    partNumber: 14,
    lessonNumber: 8,
    title: '(이)라든가，(이)라든지，마저',
    whatItDoes: '举例列举，或表示"连最后的……都"',
    whatItDoesBody: '(이)라든가 和 (이)라든지 均用于列举若干例子，表示"……啊/……之类的"，说明不限于某一个，是其中的若干例子之一。两者意思相同，라든지 略比 라든가 更书面。\n마저 表示"连最后一个也/连剩下的也"，强调到了最后的、本不应该如此的也发生了，带有绝望或遗憾的语气，相当于"连……都……（最后的希望/剩下的也）"。',
    structureNote: '받침O 명사 + 이라든가/이라든지\n받침X 명사 + 라든가/라든지\n명사 + 마저（连最后一个也……）',
    rulesNote: '(이)라든가/(이)라든지 뒤에는 보통 동사나 추가 열거가 이어진다。두 개 이상의 항목을 나열할 때 각 항목 뒤에 붙인다。\n마저 는 이미 나쁜 상황에서 마지막 남은 것마저 그렇게 됐다는 절망감을 표현한다。까지 보다 부정적 뉘앙스가 강하다。',
    scenarioNote: '"영화라든가 음악이라든가（电影啊音乐之类的）"처럼 취미를 열거할 때，\n"희망마저 사라졌어요（连希望都消失了）"처럼 절망 상황을 표현할 때 쓰인다。',
    structures: [
      {
        ko: '받침X 명사 + 라든가',
        tokens: [
          { text: '영화', role: 'plain' },
          { text: '라든가', role: 'plain' },
          { text: ' 음악', role: 'plain' },
          { text: '이라든가', role: 'plain' },
          { text: ' 좋아해요', role: 'verb' },
        ],
        zh: '喜欢电影啊音乐之类的。',
      },
      {
        ko: '받침O 명사 + 이라든지',
        tokens: [
          { text: '책', role: 'plain' },
          { text: '이라든지', role: 'plain' },
          { text: ' 잡지', role: 'plain' },
          { text: '라든지', role: 'plain' },
          { text: ' 읽어요', role: 'verb' },
        ],
        zh: '读书啊杂志之类的。',
      },
      {
        ko: '명사 + 마저（절망/안타까움）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 떠났어요', role: 'verb' },
        ],
        zh: '连朋友也离开了（连最后的朋友都走了）。',
      },
      {
        ko: '마저 강조（남은 것마저）',
        tokens: [
          { text: '돈', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '连钱也没了（连最后的钱都没了）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '받침X 명사 + 라든가/라든지，받침O 명사 + 이라든가/이라든지', examples: '영화라든가（받침X），음악이라든가（받침ㄱ），책이라든지（받침ㄱ）' },
      { type: 'note', text: '(이)라든가/(이)라든지 는 보통 두 개 이상 항목 열거', examples: 'A라든가 B라든가，A이라든지 B라든지 형태로 나열' },
      { type: 'compare', text: '라든가 vs 라든지：의미 동일，라든지가 약간 격식체', examples: '영화라든가（구어）vs 영화라든지（문어/격식）' },
      { type: 'rule', text: '명사 + 마저：마지막 남은 것마저 그렇게 됨（절망/안타까움）', examples: '친구마저，희망마저，돈마저，건강마저' },
      { type: 'compare', text: '마저 vs 까지：마저는 마지막 것으로 절망 강조，까지는 극단 열거', examples: '친구까지 왔어요（中性）vs 친구마저 떠났어요（绝望）' },
      { type: 'note', text: '마저 앞에는 "마지막 남은 것"이라는 맥락이 전제', examples: '모두 포기했고，희망마저 없어졌어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '취미로', role: 'plain' },
          { text: ' 영화라든가', role: 'plain' },
          { text: ' 독서라든가', role: 'plain' },
          { text: ' 해요', role: 'verb' },
        ],
        zh: '兴趣爱好是看电影啊读书之类的。',
        swapWords: ['음악이라든가 그림이라든가', '여행이라든가 요리라든가'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '주말에는', role: 'time' },
          { text: ' 책이라든지', role: 'plain' },
          { text: ' 잡지라든지', role: 'plain' },
          { text: ' 읽어요', role: 'verb' },
        ],
        zh: '周末读书啊杂志之类的。',
        swapWords: ['신문이라든지 잡지라든지', '소설이라든지 만화라든지'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '모두 포기하고', role: 'plain' },
          { text: ' 희망마저', role: 'subject' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '全部放弃了，连希望都消失了。',
        swapWords: ['의욕마저', '돈마저'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '건강마저', role: 'subject' },
          { text: ' 나빠져서', role: 'verb' },
          { text: ' 정말 힘들어요', role: 'plain' },
        ],
        zh: '连健康都变差了，真的很难熬。',
        swapWords: ['일마저', '자신감마저'],
        swapRole: 'subject',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '列举兴趣', ko: '취미가 영화라든가 음악이라든가 있어요.', zh: '兴趣有看电影啊听音乐之类的。' },
      { icon: '📚', context: '书面列举', ko: '시라든지 소설이라든지 즐겨 읽어요.', zh: '喜欢读诗啊小说之类的。' },
      { icon: '😞', context: '绝望', ko: '친구마저 연락을 끊었어요.', zh: '连朋友都断联了。' },
      { icon: '💔', context: '失去一切', ko: '일도 잃고 돈마저 없어졌어요.', zh: '工作也丢了，连钱也没了。' },
      { icon: '🤔', context: '举例建议', ko: '여행이라든가 새로운 취미라든가 시도해 봐요.', zh: '试试旅行啊新兴趣之类的吧。' },
      { icon: '😔', context: '最后的希望', ko: '마지막 기회마저 놓쳤어요.', zh: '连最后的机会都错过了。' },
    ],
    mistakes: [
      { wrong: '음악라든가', correct: '음악이라든가', note: '음악（받침ㄱ 있음）→ 이라든가（✓）。받침 없는 명사에만 라든가 를 쓴다：영화라든가（영화 받침X）。' },
      { wrong: '영화이라든가', correct: '영화라든가', note: '영화（받침X）→ 라든가（✓）。받침 없는 명사에 이라든가 를 붙이면 틀린다。' },
      { wrong: '친구마저도', correct: '친구마저', note: '마저 뒤에 도 를 덧붙이는 것은 어색하다。마저 자체에 이미 강조의 의미가 있으므로 단독으로 쓴다。' },
      { wrong: '선물마저 받았어요', correct: '선물까지 받았어요', note: '마저 는 부정적/절망적 맥락에만 쓴다。긍정적 맥락의 "连……都"는 까지 를 써야 한다：선물까지 받았어요（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '(이)라든가，(이)라든지，마저',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '취미로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）',
          options: ['라든가', '이라든가', '마저', '까지'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（받침X）→ 라든가（✓）。이라든가는 받침O 명사에，마저/까지는 열거가 아니라 강조 조사。',
        },
        {
          prompt: '주말에는 책___ 잡지라든지 읽어요。（周末读书啊杂志之类的。）',
          options: ['이라든지', '라든지', '마저', '까지'],
          answer: 0 as 0|1|2|3,
          explanation: '책（받침ㄱ 있음）→ 이라든지（✓）。라든지는 받침X，마저/까지는 열거 조사가 아니다。',
        },
        {
          prompt: '모두 잃고 희망___ 사라졌어요。（全失去了，连希望都消失了。—绝望）',
          options: ['마저', '까지', '이나', '라든가'],
          answer: 0 as 0|1|2|3,
          explanation: '마저：마지막 남은 것마저 그렇게 됨（절망）：희망마저（✓）。까지는 중성/긍정 극단，이나는 수량，라든가는 열거。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['음악이라든가 영화라든가 좋아해요', '음악라든가 좋아해요（받침O）', '선물마저 받았어요（긍정）', '친구마저도 왔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '음악이라든가（받침ㄱ→이라든가）영화라든가（받침X→라든가）（✓）。음악라든가→이라든가，마저는 부정 맥락만，마저도는 중복。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第18课</div>
    <div class="ov-hero-title">(이)라든가，(이)라든지，마저</div>
    <div class="ov-hero-sub">……之类的 · 连最后的……都</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">之类的</div>
      <div class="ko">(이)라든가 / (이)라든지</div>
      <div class="zh">列举若干例子（……啊……之类）</div>
    </div>
    <div class="ov-block">
      <div class="badge">连最后的……都</div>
      <div class="ko">명사 + 마저</div>
      <div class="zh">绝望/遗憾（最后剩下的也……）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">이라든가/라든가 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>받침X → <b style="color:#ff7fa8">라든가/라든지</b>：영화라든가，잡지라든지</div>
        <div>받침O → <b style="color:#ff7fa8">이라든가/이라든지</b>：음악이라든가，책이라든지</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">음악라든가（받침O에 라든가）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">음악이라든가</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선물마저 받았어요（긍정）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선물까지 받았어요</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">……之类的 / 连最后的……都</div>
<div class="card-body">列举用라든가，绝望用마저。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">두 가지 강조 방식</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">(이)라든가/(이)라든지 — 열거</div>
      <div style="font-size:16px;font-weight:800;color:#241917">영화라든가 음악이라든가 좋아해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">喜欢电影啊音乐之类的。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">마저 — 절망</div>
      <div style="font-size:16px;font-weight:800;color:#241917">희망마저 없어졌어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">连希望都消失了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 마저 는 반드시 부정적 맥락에서만 쓴다</div>
</div>
<div class="reminder-box">받침O → 이라든가/이라든지，받침X → 라든가/라든지。</div>`,
    compareHtml: `<div class="card-title">마저 vs 까지 / 라든가 vs 라든지</div>
<div class="card-body">비슷한 쌍 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">마저</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">절망/부정 맥락，마지막 것마저</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구마저 떠났어요</span><span style="font-size:16px;color:#5a4640">连朋友都走了（绝望）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 강조，긍/부정 모두 가능</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了（惊喜）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">구어적 열거</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">영화라든가 음악이라든가</span><span style="font-size:16px;color:#5a4640">电影啊音乐之类</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">약간 격식체 열거</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">책이라든지 잡지라든지</span><span style="font-size:16px;color:#5a4640">书啊杂志之类</span></div>
  </div>
</div>`,
    compareLabel: '마저 vs 까지 / 라든가 vs 라든지',
    quickTable: {
      title: '(이)라든가/(이)라든지/마저 정리',
      headers: ['조사', '받침 조건', '기능', '예시'],
      rows: [
        ['라든가/라든지', '받침X 명사', '열거（구어/격식）', '영화라든가，잡지라든지'],
        ['이라든가/이라든지', '받침O 명사', '열거（구어/격식）', '음악이라든가，책이라든지'],
        ['마저', '받침 무관', '절망 극단（부정）', '친구마저，희망마저，돈마저'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  // ── 第19课：-는/은/ㄴ 체하다，-는/은/ㄴ 척하다 ──────────────────
  {
    id: 'card-p14-l09',
    partNumber: 14,
    lessonNumber: 9,
    title: '-는/은/ㄴ 체하다，-는/은/ㄴ 척하다',
    whatItDoes: '表示假装做某动作或处于某状态',
    whatItDoesBody: '-는/은/ㄴ 체하다 和 -는/은/ㄴ 척하다 意思完全相同，均表示"假装……/装作……"，说明实际并非如此，只是表面上做出那种样子。\n척하다 는 구어에서 더 자주 쓰이고，체하다 는 약간 문어적이다。두 표현은 자유롭게 교체 가능하다。',
    structureNote: '동사 현재 관형사형（-는）+ 체하다/척하다\n형용사/동사 과거 관형사형（-은/ㄴ）+ 체하다/척하다\n동사/형용사 미래 관형사형（-을/ㄹ）+ 체하다/척하다',
    rulesNote: '관형사형 어미 선택：동사 현재 -는，동사/형용사 과거 -은/ㄴ，형용사 현재 -은/ㄴ\n체하다/척하다 는 단독으로는 소화 안 된다는 뜻의 체하다 와 혼동하지 말 것（체하다 = 食积，척하다 = 假装）。',
    scenarioNote: '"자는 척하다（假装睡觉）"，"모르는 체하다（假装不知道）"처럼 일상에서 자주 쓰이는 표현이다。',
    structures: [
      {
        ko: '동사 -는 체하다/척하다（현재）',
        tokens: [
          { text: '자는', role: 'verb' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装在睡觉了。',
      },
      {
        ko: '동사 -은/ㄴ 체하다（과거）',
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
        ko: '동사 -을/ㄹ 체하다（미래/추측）',
        tokens: [
          { text: '갈', role: 'verb' },
          { text: ' 것처럼', role: 'plain' },
          { text: ' 척했어요', role: 'verb' },
        ],
        zh: '假装要去的样子。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '동사 현재형 + 는 체하다/척하다', examples: '자는 척하다，먹는 체하다，보는 척하다' },
      { type: 'rule', text: '동사 과거형 + 은/ㄴ 체하다/척하다', examples: '먹은 척하다，간 척하다，모른 체하다（모르다→모른）' },
      { type: 'rule', text: '형용사 + 은/ㄴ 체하다/척하다', examples: '바쁜 척하다，좋은 체하다，아픈 척하다' },
      { type: 'compare', text: '체하다 vs 척하다：의미 동일，척하다가 더 구어적', examples: '자는 척해요（구어）= 자는 체해요（약간 문어）' },
      { type: 'note', text: 'ㄹ불규칙：모르다→모른 척（과거），아는 척（현재）/안 척（과거）', examples: '모르는 척（현재）/ 모른 척（과거），아는 척（현재）/ 안 척（과거）' },
      { type: 'note', text: '체하다（食积）와 -는/은 체하다（假装）는 완전히 다른 단어', examples: '밥을 먹고 체했어요（食积了）vs 밥 먹는 체해요（假装在吃饭）' },
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
          { text: ' 사실', role: 'plain' },
          { text: ' 많이 힘들었어요', role: 'plain' },
        ],
        zh: '假装不累，但其实很难熬。',
        swapWords: ['괜찮은 척했지만', '아프지 않은 척했지만'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: ' 자는 척했지만', role: 'verb' },
          { text: ' 사실', role: 'plain' },
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
      { wrong: '자는은 척해요', correct: '자는 척해요', note: '동사 현재 관형사형은 -는 이다。자다→자는 척해요（✓）。-는은 처럼 는 과 은 을 동시에 쓰지 않는다。' },
      { wrong: '바쁘는 척해요', correct: '바쁜 척해요', note: '형용사 관형사형은 -은/ㄴ 이다。바쁘다→바쁜 척해요（✓）。형용사에 동사형 -는 을 쓰면 틀린다。' },
      { wrong: '모르은 척했어요', correct: '모른 척했어요', note: '모르다는 ㄹ불규칙。과거 관형사형：모르+ㄴ=모른 척했어요（✓）。모르은은 없는 형태이다。현재형은 모르는 척해요。' },
      { wrong: '체했어요', correct: '밥 먹는 척했어요', note: '체하다 단독은 "食积（소화불량）"。"假装吃饭"은 관형사형 + 척하다/체하다：밥 먹는 척했어요（✓）。체했어요 만으로는 "食积了"라는 뜻이 된다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 체하다，척하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '그 사람은 나를 보고도 모르___ 체했어요。（那个人明明看到我，却假装不认识。—현재）',
          options: ['는', '은', 'ㄴ', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（동사）현재 관형사형：모르는 체했어요（✓）。과거라면 모른 체했어요。은/ㄴ은 형용사나 동사 과거형에，을은 미래형에 쓴다。',
        },
        {
          prompt: '피곤하지 않___ 척했지만 사실 힘들었어요。（假装不累，其实很难熬。）',
          options: ['은', '는', '을', '던'],
          answer: 0 as 0|1|2|3,
          explanation: '피곤하다（형용사）부정형 피곤하지 않다의 관형사형：않은 척했어요（✓）。는 은 동사 현재형，을 은 미래형，던 은 회상형。',
        },
        {
          prompt: '아이가 ___ 척했지만 사실 깨어 있었어요。（孩子假装在睡觉。）',
          options: ['자는', '잔', '잘', '자'],
          answer: 0 as 0|1|2|3,
          explanation: '자다（동사）현재 관형사형：자는 척했어요（✓）。잔 은 과거형，잘 은 미래형，자 는 어간 단독으로 체하다/척하다 앞에 쓰지 않는다。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['바쁜 척하면서 전화를 안 받았어요', '바쁘는 척하면서（형용사+는）', '자는은 척해요（는+은 중복）', '모르은 척해요（모르다+은）'],
          answer: 0 as 0|1|2|3,
          explanation: '바쁘다（형용사）→ 바쁜 척하면서（✓）。바쁘는는 형용사에 동사형 오류，자는은은 이중 어미，모르은은 ㄹ탈락 오류（모른 척해요가 맞음）。',
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
      <div class="ko">관형사형 + 체하다/척하다</div>
      <div class="zh">假装……（实际并非如此）</div>
    </div>
    <div class="ov-block">
      <div class="badge">区别</div>
      <div class="ko">척하다（구어） vs 체하다（문어）</div>
      <div class="zh">意思完全相同，可以互换</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">관형사형 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">동사 현재</span>：자<b style="color:#ff7fa8">는</b> 척해요</div>
        <div><span style="font-weight:700">동사 과거</span>：자<b style="color:#ff7fa8">ㄴ</b> 척해요（잔 척해요）</div>
        <div><span style="font-weight:700">형용사</span>：바쁘<b style="color:#ff7fa8">ㄴ</b> 척해요（바쁜 척해요）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">바쁘는 척해요（형용사+는）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">바쁜 척해요（형용사+은/ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">체했어요（食积）와 혼동</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">관형사형+체하다 = 假装</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">假装……</div>
<div class="card-body">实际上不是那样，只是表面上装出那个样子。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">척하다 = 체하다（意思相同）</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">동사 현재 -는</div>
      <div style="font-size:16px;font-weight:800;color:#241917">자는 척해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">假装在睡觉。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">형용사 -은/ㄴ</div>
      <div style="font-size:16px;font-weight:800;color:#241917">바쁜 척해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">假装很忙。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 형용사에는 -는 이 아니라 -은/ㄴ</div>
</div>
<div class="reminder-box">체하다 단독（食积）≠ 관형사형+체하다（假装）。</div>`,
    compareHtml: `<div class="card-title">체하다 vs 척하다 / 동사 vs 형용사 관형사형</div>
<div class="card-body">핵심 구별 포인트 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">동사 현재 + 는 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">자는 척，먹는 척，보는 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">자는 척해요</span><span style="font-size:16px;color:#5a4640">假装在睡觉</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">동사 과거 + 은/ㄴ 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">잔 척，먹은 척，간 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잔 척했어요</span><span style="font-size:16px;color:#5a4640">假装睡过了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">형용사 + 은/ㄴ 척</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">바쁜 척，좋은 척，아픈 척</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁜 척해요</span><span style="font-size:16px;color:#5a4640">假装很忙</span></div>
  </div>
</div>`,
    compareLabel: '동사 현재/과거 vs 형용사 관형사형 + 척하다',
    quickTable: {
      title: '-는/은/ㄴ 체하다/척하다 관형사형',
      headers: ['품사/시제', '관형사형', '예시'],
      rows: [
        ['동사 현재', '-는', '자는 척，먹는 체，보는 척'],
        ['동사 과거', '-은/ㄴ', '잔 척，먹은 체，간 척'],
        ['형용사', '-은/ㄴ', '바쁜 척，좋은 체，아픈 척'],
        ['모르다（ㄹ탈락）', '-는（현재）/-ㄴ（과거）', '모르는 척（현재）/모른 척（과거）'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 第20课：-는/은/ㄴ가 하면，-기도 하다 ──────────────────────────
  {
    id: 'card-p14-l10',
    partNumber: 14,
    lessonNumber: 10,
    title: '-는가 하면，-기도 하다',
    whatItDoes: '表示一面……一面……，或"也会/也有"',
    whatItDoesBody: '-는/은/ㄴ가 하면 表示两种对比或并列的情况同时存在，相当于"一方面……另一方面……/有时……有时……"，常用于描述事物的两面性。\n-기도 하다 表示在某行为或状态之外也有其他情况，相当于"也会/也有时/也是"，语气比较平和，常与 때로는、가끔 等副词搭配。',
    structureNote: '-는/은/ㄴ가 하면：동사/형용사 관형사형 + 가 하면\n-기도 하다：동사/형용사 어간 + 기도 하다',
    rulesNote: '-는가 하면 의 앞뒤 절은 대조되는 내용이 온다。앞 절이 한 상황，뒤 절이 반대이거나 다른 상황이다。\n-기도 하다 는 단독으로 "～하기도 해요"처럼 쓰이거나，나열 구조에서 "-기도 하고 -기도 하다"처럼 쓰인다。',
    scenarioNote: '"가격이 싼가 하면 품질이 안 좋아요（一方面价格便宜，另一方面质量不好）"，\n"슬프기도 하고 기쁘기도 해요（既有些难过，也有些高兴）"처럼 복잡한 감정이나 상황 묘사에 쓰인다。',
    structures: [
      {
        ko: '동사 -는가 하면',
        tokens: [
          { text: '웃는가', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 또 울어요', role: 'verb' },
        ],
        zh: '一会儿笑，一会儿又哭。',
      },
      {
        ko: '형용사 -은/ㄴ가 하면',
        tokens: [
          { text: '가격이', role: 'subject' },
          { text: ' 싼가', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 품질이 나빠요', role: 'verb' },
        ],
        zh: '价格便宜，但质量不好。',
      },
      {
        ko: '어간 + 기도 하다（단독）',
        tokens: [
          { text: '가끔', role: 'plain' },
          { text: ' 슬프기도 해요', role: 'verb' },
        ],
        zh: '有时也会感到悲伤。',
      },
      {
        ko: '-기도 하고 -기도 하다（나열）',
        tokens: [
          { text: '재미있기도 하고', role: 'verb' },
          { text: ' 어렵기도 해요', role: 'verb' },
        ],
        zh: '既有趣，也有些难。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '동사 + 는가 하면，형용사/동사 과거 + 은/ㄴ가 하면', examples: '웃는가 하면，싼가 하면，먹은가 하면' },
      { type: 'note', text: '-는가 하면 앞뒤 절은 대조 내용：A인가 하면 B（A와 B가 상반/병렬）', examples: '빠른가 하면 느리기도 해요，웃는가 하면 울기도 해요' },
      { type: 'rule', text: '동사/형용사 어간 + 기도 하다', examples: '슬프기도 해요，먹기도 해요，웃기도 해요' },
      { type: 'note', text: '-기도 하고 -기도 하다：두 가지 상태나 행동을 나열', examples: '재미있기도 하고 어렵기도 해요，웃기도 하고 울기도 해요' },
      { type: 'compare', text: '-는가 하면 vs -기도 하다：는가 하면은 대조，기도 하다는 병렬/추가', examples: '비싼가 하면 품질이 좋아요（대조）vs 비싸기도 하고 품질이 좋기도 해요（병렬）' },
      { type: 'note', text: '-기도 하다 는 때로는，가끔 등 빈도 부사와 자주 호응', examples: '때로는 슬프기도 해요，가끔 실수하기도 해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: ' 친절한가 하면', role: 'verb' },
          { text: ' 가끔', role: 'plain' },
          { text: ' 차갑기도 해요', role: 'verb' },
        ],
        zh: '那个人一方面很亲切，有时也会冷漠。',
        swapWords: ['착한가 하면', '조용한가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 영화는', role: 'subject' },
          { text: ' 슬프기도 하고', role: 'verb' },
          { text: ' 재미있기도 해요', role: 'verb' },
        ],
        zh: '这部电影既有些悲伤，也很有趣。',
        swapWords: ['무섭기도 하고 감동적이기도 해요', '웃기기도 하고 감동적이기도 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: ' 어려운가 하면', role: 'verb' },
          { text: ' 재미있기도 해요', role: 'verb' },
        ],
        zh: '韩语一方面很难，另一方面也很有趣。',
        swapWords: ['복잡한가 하면', '쉬운가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가끔', role: 'plain' },
          { text: ' 지치기도 하지만', role: 'verb' },
          { text: ' 계속', role: 'plain' },
          { text: ' 하고 싶어요', role: 'verb' },
        ],
        zh: '有时也会疲惫，但还是想继续。',
        swapWords: ['힘들기도 하지만', '포기하고 싶기도 하지만'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😄😢', context: '复杂心情', ko: '기쁘기도 하고 슬프기도 해요.', zh: '既高兴又有些难过。' },
      { icon: '🌤️', context: '天气变化', ko: '맑은가 하면 비가 오기도 해요.', zh: '有时晴，有时也会下雨。' },
      { icon: '📚', context: '学习感受', ko: '한국어가 재미있는가 하면 어렵기도 해요.', zh: '韩语一方面有趣，另一方面也难。' },
      { icon: '🤷', context: '两面性', ko: '그 사람은 친절한가 하면 무서운 면도 있어요.', zh: '那个人亲切的一面，也有让人害怕的一面。' },
      { icon: '💪', context: '坚持', ko: '힘들기도 하지만 보람 있어요.', zh: '有时也辛苦，但很有成就感。' },
      { icon: '🍽️', context: '食物两面', ko: '맵기도 하고 맛있기도 해요.', zh: '既辣，也好吃。' },
    ],
    mistakes: [
      { wrong: '웃은가 하면', correct: '웃는가 하면', note: '동사 현재 관형사형은 -는：웃는가 하면（✓）。-은가 는 형용사나 동사 과거형에 쓴다。' },
      { wrong: '비싸는가 하면', correct: '비싼가 하면', note: '형용사 관형사형은 -은/ㄴ：비싸다→비싼가 하면（✓）。형용사에 동사형 -는가 를 쓰면 틀린다。' },
      { wrong: '먹기도하다', correct: '먹기도 하다', note: '-기도 하다 는 기도 와 하다 사이를 띄어 쓴다：먹기도 해요（✓）。붙여 쓰면 틀린 형태로 보인다。' },
      { wrong: '슬프기도하고 기쁘기도해요', correct: '슬프기도 하고 기쁘기도 해요', note: '-기도 하고 구조에서 기도 뒤와 하고 앞에 반드시 띄어쓰기가 필요하다。슬프기도 하고（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는가 하면，-기도 하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '날씨가 맑___ 하면 갑자기 비가 오기도 해요。（有时晴，有时突然下雨。）',
          options: ['은가', '는가', '던가', '을가'],
          answer: 0 as 0|1|2|3,
          explanation: '맑다（형용사）관형사형：맑은가 하면（✓）。는가는 동사 현재형，던가는 회상，을가는 없는 형태。',
        },
        {
          prompt: '한국어가 재미있___ 하면 어렵기도 해요。（韩语一方面有趣，另一方面也难。）',
          options: ['는가', '은가', '던가', '을가'],
          answer: 0 as 0|1|2|3,
          explanation: '재미있다（있다 계열 형용사）는 관형사형에서 예외적으로 -는 을 씁니다：재미있는가 하면（✓）。일반 형용사는 -은/ㄴ가를 쓰지만，있다/없다는 -는가 형태를 씁니다。은가/던가/을가는 이 문맥에 맞지 않습니다。',
        },
        {
          prompt: '이 음식은 맵___ 하고 짜기도 해요。（这道食物既辣又咸。）',
          options: ['기도', '는가', '은가', '기만'],
          answer: 0 as 0|1|2|3,
          explanation: '-기도 하고 -기도 하다：맵기도 하고 짜기도 해요（✓）。는가/은가는 대조 구조，기만은 없는 형태。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['슬프기도 하고 기쁘기도 해요', '웃은가 하면 또 울어요（동사 현재）', '비싸는가 하면（형용사+는가）', '먹기도하다（띄어쓰기）'],
          answer: 0 as 0|1|2|3,
          explanation: '슬프기도 하고 기쁘기도 해요：올바른 나열 구조（✓）。웃은가→웃는가（동사 현재），비싸는가→비싼가（형용사），먹기도하다→먹기도 하다（띄어쓰기）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第20课</div>
    <div class="ov-hero-title">-는가 하면，-기도 하다</div>
    <div class="ov-hero-sub">一面……一面…… · 也会……/也是……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">两面对比</div>
      <div class="ko">관형사형 + 가 하면</div>
      <div class="zh">一方面……另一方面……（对比/并列）</div>
    </div>
    <div class="ov-block">
      <div class="badge">也会/有时</div>
      <div class="ko">어간 + 기도 하다</div>
      <div class="zh">也会……/有时也……（补充）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">관형사형 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">동사 현재</span>：웃<b style="color:#ff7fa8">는가</b> 하면</div>
        <div><span style="font-weight:700">형용사</span>：비싸<b style="color:#ff7fa8">ㄴ가</b> 하면（비싼가 하면）</div>
        <div><span style="font-weight:700">있다/없다</span>：재미있<b style="color:#ff7fa8">는가</b> 하면（형용사이나 -는 사용）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비싸는가 하면（형용사+는가）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비싼가 하면</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹기도하다（띄어쓰기）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹기도 하다</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">一面……一面…… / 也会……</div>
<div class="card-body">同一个人/事物有两面，或者有时还有另一种情况。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">두 가지 표현 방식</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는/은/ㄴ가 하면 — 대조</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친절한가 하면 차갑기도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一方面亲切，有时也会冷漠。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-기도 하다 — 병렬/추가</div>
      <div style="font-size:16px;font-weight:800;color:#241917">슬프기도 하고 기쁘기도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">既悲伤，也高兴。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 형용사 + 가 하면 → 은/ㄴ가（비싼가，어려운가）</div>
</div>
<div class="reminder-box">-기도 하다 의 기도 와 하다 사이는 반드시 띄어 쓴다。</div>`,
    compareHtml: `<div class="card-title">-는가 하면 vs -기도 하다 / 있다 주의</div>
<div class="card-body">유사한 구조의 차이와 있다/없다 특수 처리。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는가 하면</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">앞뒤 대조，양면 묘사</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비싼가 하면 품질이 좋아요</span><span style="font-size:16px;color:#5a4640">贵是贵，但质量好</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기도 하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">추가/나열，여러 상태 병렬</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맵기도 하고 달기도 해요</span><span style="font-size:16px;color:#5a4640">既辣又甜</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">있다/없다 + 는가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">있다/없다는 형용사이나 -는가 사용</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있는가 하면</span><span style="font-size:16px;color:#5a4640">一方面有趣</span></div>
  </div>
</div>`,
    compareLabel: '-는가 하면 vs -기도 하다',
    quickTable: {
      title: '-는/은/ㄴ가 하면 관형사형 선택',
      headers: ['품사', '관형사형', '예시'],
      rows: [
        ['동사 현재', '-는가', '웃는가 하면，먹는가 하면'],
        ['형용사', '-은/ㄴ가', '비싼가 하면，어려운가 하면，좋은가 하면'],
        ['있다/없다', '-는가', '재미있는가 하면，없는가 하면'],
        ['-기도 하다', '어간 + 기도', '먹기도 해요，슬프기도 해요'],
      ],
    },
    linkedGrammarIds: [],
  },

  // ── 综合练习① ────────────────────────────────────────────────
  {
    id: 'card-p14-l11',
    isPractice: true,
    partNumber: 14,
    lessonNumber: 11,
    title: 'P14 综合练习①',
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
    quickTable: { title: '', headers: [], rows: [] },
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
      title: 'P14 第11～15课 综합',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오는 길에 우유 좀 사다 ___。（来的路上帮我买点牛奶来。）',
          options: ['줘요', '드려요', '왔어요', '갔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어다 주다：결과를 상대방에게 전달，사다 줘요（✓）。드려요는 윗사람에게，왔어요/갔어요는 방향 이동。',
        },
        {
          prompt: '마트에서 고기를 사다 ___。（从超市买了肉来了。—结果在说话人处）',
          options: ['왔어요', '갔어요', '줬어요', '드렸어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어다 오다：결과를 화자 쪽으로：사다 왔어요（✓）。갔어요는 반대 방향，줬어요는 전달，드렸어요는 윗사람。',
        },
        {
          prompt: '그 사람이 결혼했___요？ 믿을 수가 없어요。（那个人竟然结婚了？）',
          options: ['다니', '고 말고', '거든', '잖아'],
          answer: 0 as 0|1|2|3,
          explanation: '-다니요：놀라움/반문：결혼했다니요（✓）。고 말고요는 강한 긍정，거든요는 배경 설명，잖아요는 공유 정보。',
        },
        {
          prompt: '10년간 이 일을 해 ___。（10年来一直做这个工作。）',
          options: ['왔어요', '갔어요', '다 왔어요', '오다 왔어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어 오다：과거→현재 지속：해 왔어요（✓）。갔어요는 미래 방향，다 왔어요/오다 왔어요는 없는 형태。',
        },
        {
          prompt: '한국 역사___ 관한 책을 읽었어요。（读了关于韩国历史的书。）',
          options: ['에', '에서', '이', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '에 관한：명사 + 에 관한 + 명사：역사에 관한 책（✓）。에서는 장소，이/을은 주격/목적격 조사。',
        },
        {
          prompt: 'A：같이 갈 수 있어요？ B：가___ 말고요！（当然去！）',
          options: ['고', '다니', '기도', '는가'],
          answer: 0 as 0|1|2|3,
          explanation: '-고 말고요：강한 긍정：가고 말고요（✓）。다니요는 놀라움，기도는 나열，는가는 대조。',
        },
      ],
    },
  },

  // ── 综合练习② ────────────────────────────────────────────────
  {
    id: 'card-p14-l12',
    isPractice: true,
    partNumber: 14,
    lessonNumber: 12,
    title: 'P14 综合练习②',
    whatItDoes: 'P14 第16～20课 综합练习',
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
    quickTable: { title: '', headers: [], rows: [] },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 综合练习②</div>
    <div class="ov-hero-title">第16～20课 복습</div>
    <div class="ov-hero-sub">비롯한/비롯해서/만 해도 · 개나/까지 · (이)라든가/마저 · 체하다/척하다 · -는가 하면/-기도 하다</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P14 第16～20课 综합',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）',
          options: ['를', '을', '이', '가'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（받침X）→ 를 비롯한（✓）。받침O면 을 비롯한。이/가는 주격 조사。',
        },
        {
          prompt: '오늘 커피를 세 잔___ 마셨어요。（今天竟然喝了三杯咖啡。）',
          options: ['이나', '나', '까지', '마저'],
          answer: 0 as 0|1|2|3,
          explanation: '잔（받침ㄴ 있음）→ 이나：세 잔이나（✓）。받침X면 나，까지는 극단，마저는 절망。',
        },
        {
          prompt: '모두 잃고 희망___ 사라졌어요。（连希望都消失了。—绝望）',
          options: ['마저', '까지', '이나', '라든가'],
          answer: 0 as 0|1|2|3,
          explanation: '마저：절망적 맥락에서 마지막 것마저：희망마저（✓）。까지는 중성/긍정，이나는 수량，라든가는 열거。',
        },
        {
          prompt: '그 사람은 나를 보고도 모르___ 척했어요。（那个人明明看到我，却假装不认识。—현재）',
          options: ['는', '은', 'ㄴ', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（동사）현재 관형사형：모르는 척했어요（✓）。과거라면 모른 척，은/ㄴ은 형용사나 과거형，을은 미래형。',
        },
        {
          prompt: '한국어는 어려운가 하면 재미있___ 해요。（韩语一方面难，另一方面也有趣。）',
          options: ['기도', '는가', '기만', '기가'],
          answer: 0 as 0|1|2|3,
          explanation: '-기도 하다：추가/나열：재미있기도 해요（✓）。는가는 대조 구조 앞，기만/기가는 없는 형태。',
        },
        {
          prompt: '취미로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）',
          options: ['라든가', '이라든가', '마저', '까지'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（받침X）→ 라든가（✓）。이라든가는 받침O 명사에，마저는 절망，까지는 극단。',
        },
      ],
    },
  },
];
