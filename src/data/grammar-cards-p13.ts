import type { GrammarCard } from '@/types';

export const grammarCardsP13: GrammarCard[] = [
  // ── 第1课：(으)로 해서，-는 길에 ──────────────────────────────
  {
    id: 'card-p13-l01',
    partNumber: 13,
    lessonNumber: 1,
    title: '(으)로 해서，-는 길에',
    whatItDoes: '说明原因/手段，或顺路做某事',
    whatItDoesBody: '(으)로 해서 表示原因或手段，相当于"因为……/由于……/通过……"，书面和口语均可用，语气比 -기 때문에 更正式。\n-는 길에 表示在去某地或回来的途中顺便做某事，相当于"在……的路上/顺路……"，只能接移动动词（가다/오다/다니다 等）。',
    structureNote: '(으)로 해서：명사 + (으)로 해서（有收音 + 으로 해서，无收音/ㄹ + 로 해서）\n-는 길에：가는 길에 / 오는 길에 / 퇴근하는 길에 等，动词 관형사형 + 길에',
    rulesNote: '(으)로 해서 의 앞에는 원인이나 수단이 되는 명사가 온다。문어체에서 자주 쓰이며 -로 인해서 와 교체 가능。\n-는 길에 는 이동 동사（가다/오다/다니다）의 관형사형 뒤에만 붙는다。순간적 이동이 아닌 지속적 이동 과정임을 나타낸다。',
    scenarioNote: '(으)로 해서 는 사고 경위 설명、보고서、뉴스 등 격식체에서 자주 등장한다。\n-는 길에 는 일상 대화에서 "오는 길에 뭐 사 왔어？"처럼 자연스럽게 쓰인다。',
    step0Html: `<div class="card-title">因为……顺路……</div>
<div class="card-body">同一段路，两种表达方式。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两个语法点，各有用场</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">(으)로 해서 — 原因/手段</div>
      <div style="font-size:16px;font-weight:800;color:#241917">교통사고로 해서 길이 막혔어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为交通事故，路堵了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 길에 — 顺路</div>
      <div style="font-size:16px;font-weight:800;color:#241917">집에 오는 길에 편의점에 들렀어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">回家路上顺便去了便利店。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 两个表达都很实用，先记形式再练例句</div>
</div>
<div class="reminder-box">(으)로 해서 前接名词，-는 길에 前只接移动动词的관형사형。</div>`,
    compareHtml: `<div class="card-title">(으)로 해서 vs -때문에 vs -는 길에</div>
<div class="card-body">同样表示原因，(으)로 해서 和 -때문에 有什么区别？-는 길에 又是完全不同的用法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">(으)로 해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">명사 뒤，书面语较多，表原因/手段</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">부주의로 해서 사고가 났어요</span><span style="font-size:16px;color:#5a4640">因疏忽发生了事故</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 때문에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动/형 뒤，口语书面均常用，表原因</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오기 때문에 못 나가요</span><span style="font-size:16px;color:#5a4640">因为下雨不能出去</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 길에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">이동동사 관형사형 뒤，表顺路</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가는 길에 전화할게요</span><span style="font-size:16px;color:#5a4640">去的路上给你打电话</span></div>
  </div>
</div>
<div class="reminder-box">-는 길에 不表示原因，只表示"途中顺便"，和前两个用法完全不同。</div>`,
    compareLabel: '(으)로 해서 vs -때문에 vs -는 길에',
    structures: [
      {
        ko: '폭설로 해서 비행기가 결항됐어요',
        zh: '因为大雪，航班取消了。',
        tokens: [
          { text: '폭설로 해서', role: 'plain' },
          { text: '비행기가', role: 'subject' },
          { text: '결항됐어요', role: 'verb' },
        ],
      },
      {
        ko: '인터넷으로 해서 정보를 얻었어요',
        zh: '通过网络获取了信息。',
        tokens: [
          { text: '인터넷으로 해서', role: 'plain' },
          { text: '정보를', role: 'object' },
          { text: '얻었어요', role: 'verb' },
        ],
      },
      {
        ko: '회사에 가는 길에 커피를 샀어요',
        zh: '去公司的路上买了咖啡。',
        tokens: [
          { text: '회사에 가는 길에', role: 'plain' },
          { text: '커피를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '집에 오는 길에 친구를 만났어요',
        zh: '回家的路上遇到了朋友。',
        tokens: [
          { text: '집에 오는 길에', role: 'plain' },
          { text: '친구를', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '(으)로 해서：有收音名词 + 으로 해서，无收音/ㄹ名词 + 로 해서', examples: '사고로 해서 / 부주의로 해서 / 폭설로 해서 / 인터넷으로 해서' },
      { type: 'rule', text: '-는 길에：가다/오다/다니다 등 이동동사의 현재 관형사형 + 길에', examples: '가는 길에 / 오는 길에 / 출근하는 길에 / 퇴근하는 길에 / 학교에 다니는 길에' },
      { type: 'usage', text: '(으)로 해서 는 명사 뒤에만 붙으므로，동사를 쓰려면 -기로 해서 등으로 변환 필요', examples: '그 문제로 해서 회의가 길어졌어요 / 실수로 해서 파일을 지웠어요' },
      { type: 'usage', text: '-는 길에 는 목적지로 이동 중 중간에 다른 행동을 함을 나타냄', examples: '마트에 가는 길에 약국에 들렀어요 / 친구 집에 오는 길에 꽃을 샀어요' },
      { type: 'note', text: '-는 길에 는 가다/오다의 과거형 관형사형은 쓰지 않음（간 길에×，온 길에×）', examples: '가는 길에（✓）/ 간 길에（✗）' },
      { type: 'compare', text: '(으)로 해서 vs (으)로 인해서：두 표현은 거의 같으며 교체 가능，-로 인해서 가 더 공식적', examples: '태풍으로 해서 / 태풍으로 인해서 — 의미 동일' },
      { type: 'example', text: '폭설로 해서 길이 막혔어요 / 가는 길에 편의점에 들러요 / 퇴근하는 길에 전화할게요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '교통 체증으로 해서', role: 'plain' },
          { text: '약속에', role: 'place' },
          { text: '늦었어요', role: 'verb' },
        ],
        zh: '因为堵车，约会迟到了。',
        swapWords: ['교통 체증으로 해서 늦었어요', '사고로 해서 늦었어요', '폭설로 해서 늦었어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '학교에 가는 길에', role: 'plain' },
          { text: '편의점에', role: 'place' },
          { text: '들렀어요', role: 'verb' },
        ],
        zh: '去学校的路上顺便去了便利店。',
        swapWords: ['가는 길에 편의점에 들렀어요', '오는 길에 편의점에 들렀어요', '출근하는 길에 편의점에 들렀어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '부주의로 해서', role: 'plain' },
          { text: '실수를', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '因为不小心犯了错误。',
        swapWords: ['부주의로 해서', '실수로 해서', '착각으로 해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '퇴근하는 길에', role: 'plain' },
          { text: '마트에서', role: 'place' },
          { text: '장을 봤어요', role: 'verb' },
        ],
        zh: '下班路上顺便在超市买了菜。',
        swapWords: ['퇴근하는 길에 장을 봤어요', '퇴근하는 길에 친구를 만났어요', '퇴근하는 길에 약을 샀어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🚗', context: '交通延误', ko: '교통사고로 해서 출근이 늦었어요.', zh: '因为交通事故，上班迟到了。' },
      { icon: '☕', context: '顺路买咖啡', ko: '회사에 오는 길에 커피 한 잔 샀어요.', zh: '来公司路上买了一杯咖啡。' },
      { icon: '📱', context: 'KPOP 消息', ko: '인터넷으로 해서 그 소식을 알게 됐어요.', zh: '通过网络知道了那个消息。' },
      { icon: '🛒', context: '顺路购物', ko: '집에 가는 길에 슈퍼에 들를게요.', zh: '回家路上顺便去一下超市。' },
      { icon: '📞', context: '通话约定', ko: '학원 가는 길에 전화할게요.', zh: '去补习班的路上给你打电话。' },
      { icon: '🌧️', context: '天气原因', ko: '폭우로 해서 행사가 취소됐어요.', zh: '因为暴雨，活动取消了。' },
    ],
    mistakes: [
      { wrong: '비가 오로 해서 못 나가요（动词 + 로 해서）', correct: '비로 해서 못 나가요 또는 비가 오기 때문에 못 나가요', note: '(으)로 해서 앞에는 명사만 올 수 있다。동사를 원인으로 쓰려면 -기 때문에 사용。' },
      { wrong: '집에 간 길에 편의점에 들렀어요（과거 관형사형 + 길에）', correct: '집에 가는 길에 편의점에 들렀어요', note: '-는 길에 는 현재 관형사형（가는/오는）만 가능，과거형 간/온 은 쓸 수 없다。' },
      { wrong: '학교로 해서 친구를 사귀었어요（장소 + 로 해서）', correct: '학교에서 친구를 사귀었어요 또는 학교를 통해서 친구를 사귀었어요', note: '(으)로 해서 는 원인이나 수단을 나타내는 명사 뒤에 써야 자연스럽다。단순 장소에는 어색。' },
      { wrong: '오는 길에 비가 왔어요（이동 주체와 무관한 사건）', correct: '오는 길에 비를 맞았어요', note: '-는 길에 뒤에는 이동 주체가 직접 한 행동이 와야 자연스럽다。자연 현상 서술에는 부적절。' },
    ],
    quickTable: {
      title: '(으)로 해서 接续形式',
      headers: ['名词末音', '形式', '예시', '意思'],
      rows: [
        ['有받침（받침 O）', '으로 해서', '인터넷으로 해서', '通过网络'],
        ['无받침（받침 X）', '로 해서', '사고로 해서', '因为事故'],
        ['ㄹ받침', '로 해서', '불로 해서', '因为火'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 해서 / -는 길에',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '폭설___ 기차가 연착됐어요。（因大雪，火车晚点了。）',
          options: ['로 해서', '으로 해서', '이기 때문에', '에서'],
          answer: 0 as 0|1|2|3,
          explanation: '폭설 末字 설은 ㄹ받침 → ㄹ받침은 로 해서。폭설로 해서 기차가 연착됐어요。',
        },
        {
          prompt: '회사에 ___ 길에 우체국에 들렀어요。（去公司路上顺便去了邮局。）',
          options: ['가는', '간', '가는 것', '가서'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 길에 앞에는 이동동사의 현재 관형사형（가는）이 와야 한다。',
        },
        {
          prompt: '다음 중 (으)로 해서의 올바른 사용은？',
          options: ['사고로 해서 늦었어요', '비가 와로 해서 못 가요', '학교로 해서 만났어요', '가는로 해서 샀어요'],
          answer: 0 as 0|1|2|3,
          explanation: '(으)로 해서 앞에는 원인 명사가 와야 한다。사고（명사）+ 로 해서 가 올바른 형태。',
        },
        {
          prompt: '친구 집에 ___ 길에 꽃을 샀어요。（去朋友家的路上买了花。）',
          options: ['가는', '갔는', '가는 것', '가고'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 길에 앞에는 현재 관형사형 가는 이 온다。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第1课</div>
    <div class="ov-hero-title">(으)로 해서，-는 길에</div>
    <div class="ov-hero-sub">原因/手段 · 途中顺路</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">原因/手段</div>
      <div class="ko">명사 + (으)로 해서</div>
      <div class="zh">因为……/通过……</div>
    </div>
    <div class="ov-block">
      <div class="badge">顺路途中</div>
      <div class="ko">이동동사 관형사형 + -는 길에</div>
      <div class="zh">在……的路上</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">有받침</span> + 으로 해서：인터넷<b style="color:#ff7fa8">으로 해서</b></div>
        <div><span style="font-weight:700">无받침/ㄹ</span> + 로 해서：사고<b style="color:#ff7fa8">로 해서</b> / 불<b style="color:#ff7fa8">로 해서</b></div>
        <div><span style="font-weight:700">이동동사 현재형</span> + 길에：가<b style="color:#ff7fa8">는 길에</b> / 오<b style="color:#ff7fa8">는 길에</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 와로 해서（动词 + 로 해서）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비로 해서 / 비 때문에</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">간 길에（과거형 + 길에）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가는 길에（현재 관형사형）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g9', 'g77'],
  },

  // ── 第2课：-을/를 만큼，-을/를 정도로 ──────────────────────────────
  {
    id: 'card-p13-l02',
    partNumber: 13,
    lessonNumber: 2,
    title: '-을/를 만큼，-을/를 정도로',
    whatItDoes: '表示程度相当或达到某种程度',
    whatItDoesBody: '-을/를 만큼 表示程度相当，相当于"像……那样多/那种程度"，可接名词或动词관형사형。\n-을/를 정도로 表示达到某种程度，相当于"到……的程度"，强调程度之深，常用于夸张或说明极端情况。',
    structureNote: '-을/를 만큼：명사 + 만큼（직접 접속）/ 동사·형용사 관형사형 + 만큼\n-을/를 정도로：명사 + 정도로 / 동사·형용사 관형사형 + 정도로',
    rulesNote: '-만큼 은 비교 기준을 나타낼 때도 쓰이며（키가 나만큼 커요），정도 표현에서는 관형사형 + 만큼 형태가 많이 쓰인다。\n-정도로 는 극단적 정도를 강조할 때 자주 쓰이며，뒤에 오는 서술어가 그 정도에 상응하는 결과를 나타낸다。',
    scenarioNote: '-만큼 은 "그 정도만큼 해줘" 처럼 일상 대화에서 자연스럽게 쓰인다。\n-정도로 는 "죽을 정도로 힘들었어" 처럼 상태의 극단을 강조하는 표현에 자주 등장한다。',
    step0Html: `<div class="card-title">像那样……到那种程度</div>
<div class="card-body">两个表达都说"程度"，侧重点不同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同说程度，各有侧重</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-만큼 — 程度相当</div>
      <div style="font-size:16px;font-weight:800;color:#241917">죽을 만큼 힘들어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">累到像要死一样。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-정도로 — 达到某程度</div>
      <div style="font-size:16px;font-weight:800;color:#241917">눈물이 날 정도로 감동적이었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">感动到要流眼泪的程度。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 两个都表程度，-만큼 更口语，-정도로 更强调极端</div>
</div>
<div class="reminder-box">-만큼 和 -정도로 前都可接名词或관형사형，但语感略有差异。</div>`,
    compareHtml: `<div class="card-title">-만큼 vs -정도로 vs -처럼</div>
<div class="card-body">同样表示程度或比较，三者有何不同？</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-만큼</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">程度相当，可比较也可夸张</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">죽을 만큼 사랑해요</span><span style="font-size:16px;color:#5a4640">爱你爱到要死</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-정도로</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调达到某极端程度</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">쓰러질 정도로 피곤해요</span><span style="font-size:16px;color:#5a4640">累到要倒下的程度</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-처럼</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">像……一样（相似性比较）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">천사처럼 착해요</span><span style="font-size:16px;color:#5a4640">像天使一样善良</span></div>
  </div>
</div>
<div class="reminder-box">-처럼 侧重外表相似，-만큼/-정도로 侧重程度量级，注意区分。</div>`,
    compareLabel: '-만큼 vs -정도로 vs -처럼',
    structures: [
      {
        ko: '배가 터질 만큼 많이 먹었어요',
        zh: '吃了多到肚子要撑破的量。',
        tokens: [
          { text: '배가', role: 'subject' },
          { text: '터질 만큼', role: 'plain' },
          { text: '많이', role: 'plain' },
          { text: '먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람만큼 열심히 공부해요',
        zh: '像那个人那样努力学习。',
        tokens: [
          { text: '그 사람만큼', role: 'plain' },
          { text: '열심히', role: 'plain' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '눈물이 날 정도로 감동적이었어요',
        zh: '感动到要流眼泪的程度。',
        tokens: [
          { text: '눈물이', role: 'subject' },
          { text: '날 정도로', role: 'plain' },
          { text: '감동적이었어요', role: 'verb' },
        ],
      },
      {
        ko: '걸을 수 없을 정도로 다리가 아파요',
        zh: '脚疼到没办法走路的程度。',
        tokens: [
          { text: '걸을 수 없을 정도로', role: 'plain' },
          { text: '다리가', role: 'subject' },
          { text: '아파요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-만큼：명사 + 만큼（나만큼/너만큼），동사·형용사 관형사형 + 만큼（죽을 만큼/힘들 만큼）', examples: '나만큼 / 산만큼 / 죽을 만큼 / 먹을 만큼' },
      { type: 'rule', text: '-정도로：명사 + 정도로（눈물 정도로），관형사형 + 정도로（죽을 정도로/쓰러질 정도로）', examples: '쓰러질 정도로 / 눈물이 날 정도로 / 포기할 정도로' },
      { type: 'usage', text: '-만큼 은 비교 기준（A는 B만큼 크다）과 정도 강조（죽을 만큼 힘들다）두 가지로 모두 쓰인다', examples: '키가 형만큼 커요（比较） / 죽을 만큼 힘들어요（程度强调）' },
      { type: 'usage', text: '-정도로 는 뒤에 결과·상태 서술어가 오며，정도가 심함을 나타냄。부정 맥락에서도 자주 쓰임', examples: '눈물이 날 정도로 감동적이에요 / 쓰러질 정도로 피곤해요' },
      { type: 'note', text: '-만큼 과 -정도로 는 교체 가능한 경우가 많으나，-정도로 는 극단적 상황 강조에 더 적합', examples: '죽을 만큼 힘들다 ↔ 죽을 정도로 힘들다（의미 유사）' },
      { type: 'compare', text: '-처럼 vs -만큼：-처럼 은 외형/성질 유사，-만큼 은 수량/정도 기준', examples: '천사처럼 착해요（性质相似） / 천사만큼 착해요（程度相当）' },
      { type: 'example', text: '배가 터질 만큼 먹었어요 / 걸을 수 없을 정도로 아파요 / 그 사람만큼 노력해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '죽을 만큼', role: 'plain' },
          { text: '힘든', role: 'plain' },
          { text: '하루였어요', role: 'verb' },
        ],
        zh: '是累到要死的一天。',
        swapWords: ['죽을 만큼', '쓰러질 만큼', '포기하고 싶을 만큼'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사람만큼', role: 'plain' },
          { text: '잘', role: 'plain' },
          { text: '할 수 있어요', role: 'verb' },
        ],
        zh: '能做到像那个人那样好。',
        swapWords: ['그 사람만큼', '선생님만큼', '전문가만큼'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '눈물이 날', role: 'plain' },
          { text: '정도로', role: 'plain' },
          { text: '기뻤어요', role: 'verb' },
        ],
        zh: '高兴到要流眼泪的程度。',
        swapWords: ['눈물이 날 정도로', '소리를 지를 정도로', '믿기 어려울 정도로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '쓰러질', role: 'plain' },
          { text: '정도로', role: 'plain' },
          { text: '피곤해요', role: 'verb' },
        ],
        zh: '累到要倒下的程度。',
        swapWords: ['쓰러질 정도로', '움직일 수 없을 정도로', '숨이 막힐 정도로'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😭', context: '考试压力', ko: '시험이 무서울 만큼 어려웠어요.', zh: '考试难到让人害怕的程度。' },
      { icon: '🍔', context: '吃太多', ko: '배가 터질 만큼 먹었어요.', zh: '吃了多到肚子要撑破的量。' },
      { icon: '😢', context: '感动落泪', ko: '눈물이 날 정도로 감동적인 영화였어요.', zh: '是感动到要流眼泪程度的电影。' },
      { icon: '😰', context: '极度疲惫', ko: '쓰러질 정도로 피곤한 하루였어요.', zh: '是累到要倒下程度的一天。' },
      { icon: '🏃', context: '追赶目标', ko: '저 선수만큼 빨리 달리고 싶어요.', zh: '想跑得像那位选手那样快。' },
      { icon: '❤️', context: '表达爱意', ko: '죽을 만큼 보고 싶었어요.', zh: '想你想到要死的程度。' },
    ],
    mistakes: [
      { wrong: '죽을 만큼 힘드는 하루예요（만큼 前接현재진행형）', correct: '죽을 만큼 힘든 하루예요', note: '관형사형 + 만큼 에서 형용사 관형사형은 힘드는이 아니라 힘든이다。형용사는 현재 관형사형이 -은/ㄴ 형태。' },
      { wrong: '그만큼을 노력했어요（만큼 + 을 이중 조사）', correct: '그만큼 노력했어요', note: '-만큼 자체가 조사이므로 뒤에 을/를을 다시 붙이지 않는다。' },
      { wrong: '정도로 힘들어요（앞 성분 없이 단독 사용）', correct: '쓰러질 정도로 힘들어요', note: '-정도로 앞에는 구체적 정도 기준이 되는 관형사형이나 명사가 와야 한다。단독으로 쓰면 비문。' },
      { wrong: '눈물이 날 정도가 감동적이에요（정도로 → 정도가）', correct: '눈물이 날 정도로 감동적이에요', note: '여기서는 정도의 부사어 역할을 위해 정도로（로 조사）가 필요하다。정도가는 주어 역할이 되어 문장이 맞지 않는다。' },
    ],
    quickTable: {
      title: '-만큼 / -정도로 接续形式',
      headers: ['前接成分', '형태', '예시', '意思'],
      rows: [
        ['명사', '명사 + 만큼', '나만큼 / 산만큼', '像我那样 / 像山那样'],
        ['동사/형용사', '관형사형 + 만큼', '죽을 만큼 / 힘들 만큼', '到要死的程度 / 到很累的程度'],
        ['명사', '명사 + 정도로', '눈물 정도로', '到流泪的程度'],
        ['동사/형용사', '관형사형 + 정도로', '쓰러질 정도로', '到要倒下的程度'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-만큼 / -정도로',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '배가 터질 ___ 많이 먹었어요。（吃了多到肚子要撑破的量。）',
          options: ['만큼', '정도가', '처럼', '만큼을'],
          answer: 0 as 0|1|2|3,
          explanation: '관형사형 터질 뒤에 만큼이 접속되어 程度를 나타낸다。만큼을이라고 하면 조사 중복，정도가는 주어 역할이 되어 부적절。',
        },
        {
          prompt: '쓰러질 ___ 피곤한 하루였어요。（是累到要倒下程度的一天。）',
          options: ['정도로', '정도가', '만큼을', '처럼'],
          answer: 0 as 0|1|2|3,
          explanation: '쓰러질 정도로：관형사형 + 정도로，极端程度强调。정도가는 주어 역할이 되어 문장이 성립하지 않는다。',
        },
        {
          prompt: '그 선수___ 빨리 달리고 싶어요。（想跑得像那位选手那样快。）',
          options: ['만큼', '정도로', '처럼이', '만큼을'],
          answer: 0 as 0|1|2|3,
          explanation: '명사 그 선수 뒤에 만큼이 접속하여 비교 기준을 나타낸다。그 선수만큼 빨리 달리다。',
        },
        {
          prompt: '눈물이 날 ___ 감동적이었어요。（感动到要流眼泪的程度。）',
          options: ['정도로', '정도가', '만큼을', '처럼'],
          answer: 0 as 0|1|2|3,
          explanation: '날 정도로：관형사형 + 정도로，강조 표현。정도가는 주어 위치가 되어 부적절，처럼은 외형 유사 표현이라 맥락 불일치。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第2课</div>
    <div class="ov-hero-title">-만큼，-정도로</div>
    <div class="ov-hero-sub">程度相当 · 达到某程度</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">程度相当</div>
      <div class="ko">명사/관형사형 + 만큼</div>
      <div class="zh">像……那样多/那种程度</div>
    </div>
    <div class="ov-block">
      <div class="badge">达到某程度</div>
      <div class="ko">명사/관형사형 + 정도로</div>
      <div class="zh">到……的程度</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">명사</span> + 만큼：나<b style="color:#ff7fa8">만큼</b> / 산<b style="color:#ff7fa8">만큼</b></div>
        <div><span style="font-weight:700">관형사형</span> + 만큼：죽을<b style="color:#ff7fa8"> 만큼</b></div>
        <div><span style="font-weight:700">관형사형</span> + 정도로：쓰러질<b style="color:#ff7fa8"> 정도로</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">그만큼을 노력했어요（조사 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">그만큼 노력했어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">눈물이 날 정도가 감동적이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">눈물이 날 정도로 감동적이에요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g37'],
  },

  // ── 第3课：-도록，-을/를 수 있게，-게 하기 위하여 ──────────────────────────────
  {
    id: 'card-p13-l03',
    partNumber: 13,
    lessonNumber: 3,
    title: '-도록，-을/를 수 있게，-게 하기 위하여',
    whatItDoes: '表示目的或使某事成为可能',
    whatItDoesBody: '-도록 表示目的或程度，相当于"为了……/直到……"，连接前后两个动作，前句是目的/标准，后句是行为。\n-을/를 수 있게 表示"使得能够……"，强调创造条件让某事成为可能。\n-게 하기 위하여 表示"为了……"，比 -도록 更正式，书面语常用。',
    structureNote: '-도록：동사 어간 + 도록（받침 유무 무관）\n-을/를 수 있게：동사 어간 + (을/ㄹ) 수 있게\n-게 하기 위하여：동사 어간 + 게 하기 위하여（위해서도 가능）',
    rulesNote: '-도록 은 목적（~하도록 노력하다）과 정도（밤새도록 공부하다）두 가지 의미로 쓰인다。\n-을/를 수 있게 는 수 있다（능력/가능）에 접속어미 -게 가 붙은 형태로，상대방이나 상황이 가능해지도록 만든다는 뉘앙스가 강하다。\n-게 하기 위하여 는 -도록 보다 격식적이며，목적의 의도성을 강조한다。위해서 로도 교체 가능。',
    scenarioNote: '-도록 은 일상 구어에서 "늦지 않도록 서둘러!"처럼 지시나 권고에 자주 쓰인다。\n-을 수 있게 는 "볼 수 있게 자리를 양보해 줬어요"처럼 배려나 조건 제공 상황에 자주 나온다。\n-게 하기 위하여 는 보고서·공문·뉴스에서 "이해할 수 있게 하기 위하여 예시를 추가했습니다"처럼 사용된다。',
    step0Html: `<div class="card-title">为了……使得能够……</div>
<div class="card-body">三个表达都说目的，语气各不同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">目的表达三兄弟</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-도록 — 口语目的/程度</div>
      <div style="font-size:16px;font-weight:800;color:#241917">늦지 않도록 서둘러요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">为了不迟到，赶快走。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-을/를 수 있게 — 创造条件</div>
      <div style="font-size:16px;font-weight:800;color:#241917">볼 수 있게 자리를 양보했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">为了能看到，让了座位。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-게 하기 위하여 — 书面正式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이해할 수 있게 하기 위하여 예시를 추가했습니다.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">为了能够理解，添加了示例。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 도록 最口语，하기 위하여 最正式</div>
</div>
<div class="reminder-box">-도록 前接动词词干，无需考虑받침。</div>`,
    compareHtml: `<div class="card-title">-도록 vs -기 위해서 vs -을 수 있게</div>
<div class="card-body">同样表示目的，三者语感和用法如何区分？</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-도록</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">목적/정도，口语自然，可跟人称无关的目的</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">건강하도록 운동하세요</span><span style="font-size:16px;color:#5a4640">为了健康，请运动</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 위해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">목적，前后主语相同时自然，书面口语均可</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">합격하기 위해서 공부해요</span><span style="font-size:16px;color:#5a4640">为了合格而学习</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을 수 있게</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">创造条件使能够，强调可能性</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이해할 수 있게 설명했어요</span><span style="font-size:16px;color:#5a4640">说明得让人能理解</span></div>
  </div>
</div>
<div class="reminder-box">前后主语相同用 -기 위해서，创造条件用 -을 수 있게，程度/口语目的用 -도록。</div>`,
    compareLabel: '-도록 vs -기 위해서 vs -을 수 있게',
    structures: [
      {
        ko: '늦지 않도록 일찍 출발했어요',
        zh: '为了不迟到，提早出发了。',
        tokens: [
          { text: '늦지 않도록', role: 'plain' },
          { text: '일찍', role: 'plain' },
          { text: '출발했어요', role: 'verb' },
        ],
      },
      {
        ko: '밤새도록 공부했어요',
        zh: '通宵学习了。',
        tokens: [
          { text: '밤새도록', role: 'plain' },
          { text: '공부했어요', role: 'verb' },
        ],
      },
      {
        ko: '모두가 볼 수 있게 크게 써 주세요',
        zh: '请写大一点，让大家都能看到。',
        tokens: [
          { text: '모두가', role: 'subject' },
          { text: '볼 수 있게', role: 'plain' },
          { text: '크게', role: 'plain' },
          { text: '써 주세요', role: 'verb' },
        ],
      },
      {
        ko: '학생들이 이해할 수 있게 하기 위하여 예시를 추가했습니다',
        zh: '为了让学生们能够理解，添加了示例。',
        tokens: [
          { text: '학생들이', role: 'subject' },
          { text: '이해할 수 있게 하기 위하여', role: 'plain' },
          { text: '예시를', role: 'object' },
          { text: '추가했습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-도록：동사 어간 + 도록（받침 유무 무관）', examples: '늦다→늦도록 / 먹다→먹도록 / 자다→자도록 / 공부하다→공부하도록' },
      { type: 'rule', text: '-을 수 있게：동사 어간 + (을/ㄹ) 수 있게（받침 있으면 을, 없으면/ㄹ이면 ㄹ）', examples: '먹을 수 있게 / 볼 수 있게 / 들을 수 있게 / 이해할 수 있게' },
      { type: 'rule', text: '-게 하기 위하여：동사 어간 + 게 하기 위하여（위해서 로도 교체 가능）', examples: '이해할 수 있게 하기 위하여 / 참여할 수 있게 하기 위해서' },
      { type: 'usage', text: '-도록 의 두 가지 용법：① 목적（늦지 않도록 서둘러요）② 정도（밤새도록 공부해요）', examples: '성공하도록 노력해요（목적） / 목이 쉬도록 노래했어요（정도）' },
      { type: 'note', text: '-도록 앞에 부정형이 오면 "~하지 않도록"：늦지 않도록 / 실수하지 않도록', examples: '실수하지 않도록 조심하세요 / 다치지 않도록 조심하세요' },
      { type: 'compare', text: '-도록 vs -기 위해서：전후 주어가 다를 때는 -도록이 자연스럽고，같을 때는 -기 위해서도 자연스럽다', examples: '제가 볼 수 있도록 비켜 주세요（주어 다름） / 합격하기 위해서 공부해요（주어 같음）' },
      { type: 'example', text: '늦지 않도록 서둘러요 / 볼 수 있게 자리를 양보했어요 / 이해할 수 있게 하기 위하여 설명을 추가했어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '잊지 않도록', role: 'plain' },
          { text: '메모를', role: 'object' },
          { text: '해 뒀어요', role: 'verb' },
        ],
        zh: '为了不忘记，做了备忘。',
        swapWords: ['잊지 않도록', '늦지 않도록', '틀리지 않도록'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '다들', role: 'plain' },
          { text: '들을 수 있게', role: 'plain' },
          { text: '크게 말해 주세요', role: 'verb' },
        ],
        zh: '请说大声一点，让大家都能听到。',
        swapWords: ['들을 수 있게', '볼 수 있게', '이해할 수 있게'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '밤새도록', role: 'plain' },
          { text: '시험을', role: 'object' },
          { text: '준비했어요', role: 'verb' },
        ],
        zh: '通宵准备了考试。',
        swapWords: ['밤새도록', '쉬지 않도록', '열심히 하도록'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '참여할 수 있게', role: 'plain' },
          { text: '하기 위하여', role: 'plain' },
          { text: '안내문을 보냈습니다', role: 'verb' },
        ],
        zh: '为了让人能参与，发送了通知。',
        swapWords: ['참여할 수 있게 하기 위하여', '이해할 수 있게 하기 위하여', '확인할 수 있게 하기 위하여'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '不迟到', ko: '늦지 않도록 서둘러서 나왔어요.', zh: '为了不迟到，匆忙出门了。' },
      { icon: '📚', context: '通宵备考', ko: '시험 때문에 밤새도록 공부했어요.', zh: '因为考试，通宵学习了。' },
      { icon: '🎤', context: '让人听清', ko: '뒤에도 들을 수 있게 마이크를 켰어요.', zh: '为了后面的人也能听到，打开了麦克风。' },
      { icon: '📋', context: '正式通知', ko: '모두가 참여할 수 있게 하기 위하여 공지를 올렸습니다.', zh: '为了让所有人都能参与，发布了公告。' },
      { icon: '🏥', context: '健康叮嘱', ko: '건강을 잃지 않도록 잘 쉬세요.', zh: '为了不失去健康，请好好休息。' },
      { icon: '📖', context: '教学说明', ko: '학생들이 이해할 수 있게 천천히 설명했어요.', zh: '为了学生们能理解，慢慢说明了。' },
    ],
    mistakes: [
      { wrong: '늦으도록 서둘러요（-도록 앞에 으 삽입）', correct: '늦도록 서둘러요 또는 늦지 않도록 서둘러요', note: '-도록 은 동사 어간에 직접 붙으며 으를 삽입하지 않는다。늦다 어간 늦 + 도록 = 늦도록。' },
      { wrong: '볼 수 있게로 설명했어요（수 있게 + 로 조사 중복）', correct: '볼 수 있게 설명했어요', note: '-을 수 있게 자체가 부사절이므로 뒤에 조사를 다시 붙이지 않는다。' },
      { wrong: '공부하기 위하여도록 노력했어요（위하여 + 도록 중복）', correct: '공부하기 위하여 노력했어요 또는 공부하도록 노력했어요', note: '-기 위하여 와 -도록 은 같은 자리에서 쓰이는 목적 표현이므로 동시에 쓰지 않는다。' },
      { wrong: '이해할 수 있게 하기 위하여을 설명했어요（위하여 + 을 조사）', correct: '이해할 수 있게 하기 위하여 설명했어요', note: '-게 하기 위하여 는 부사절로 기능하므로 뒤에 목적격 조사 을/를을 붙이지 않는다。' },
    ],
    quickTable: {
      title: '-도록 / -을 수 있게 / -게 하기 위하여 接续',
      headers: ['표현', '접속 형태', '예시', '뉘앙스'],
      rows: [
        ['-도록', '동사 어간 + 도록', '늦도록 / 먹도록', '목적·정도，口语自然'],
        ['-을 수 있게', '어간 + (을/ㄹ) 수 있게', '볼 수 있게 / 먹을 수 있게', '创造条件使可能'],
        ['-게 하기 위하여', '어간 + 게 하기 위하여', '이해할 수 있게 하기 위하여', '正式书面目的'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-도록 / -을 수 있게 / -게 하기 위하여',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '목이 쉬___ 노래를 불렀어요。（唱歌唱到嗓子哑了。）',
          options: ['도록', '으도록', '기 위하여', '을 수 있게'],
          answer: 0 as 0|1|2|3,
          explanation: '목이 쉬도록：쉬다 어간 쉬（받침 없음）+ 도록 = 쉬도록。-도록 의 정도 용법。으도록은 없는 형태이고，기 위하여/을 수 있게는 목적 표현이라 정도 맥락에 어울리지 않는다。',
        },
        {
          prompt: '다음 중 -을 수 있게 가 올바르게 쓰인 문장은？',
          options: ['들을 수 있게 크게 말해 주세요', '들으수 있게 크게 말해 주세요', '듣을 수 있게 크게 말해 주세요', '듣기 수 있게 크게 말해 주세요'],
          answer: 0 as 0|1|2|3,
          explanation: '듣다는 ㄷ불규칙으로 모음 앞에서 ㄷ→ㄹ 교체：듣→들+을 수 있게=들을 수 있게。들으수/듣을/듣기는 모두 비문。',
        },
        {
          prompt: '학생들이 이해할 수 있게 하기 ___ 예시를 추가했습니다。（为了使学生能理解，添加了示例。）',
          options: ['위하여', '도록', '위해서도', '때문에'],
          answer: 0 as 0|1|2|3,
          explanation: '-게 하기 위하여：이해할 수 있게 + 하기 위하여。正式书面目的 표현。위해서 와도 교체 가능하나 이 빈칸에는 위하여 가 적합。',
        },
        {
          prompt: '밤새___ 연습했어요。（通宵练习了。）',
          options: ['도록', '기 위해서', '을 수 있게', '으도록'],
          answer: 0 as 0|1|2|3,
          explanation: '밤새도록：밤새다 어간 밤새 + 도록。-도록 의 정도 용법으로 "밤새는 동안 내내"를 나타낸다。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第3课</div>
    <div class="ov-hero-title">-도록，-을 수 있게，-게 하기 위하여</div>
    <div class="ov-hero-sub">目的表达 · 使得可能 · 正式书面</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">目的/程度</div>
      <div class="ko">동사 어간 + 도록</div>
      <div class="zh">为了……/直到……</div>
    </div>
    <div class="ov-block">
      <div class="badge">使得可能</div>
      <div class="ko">어간 + (을/ㄹ) 수 있게</div>
      <div class="zh">使得能够……</div>
    </div>
    <div class="ov-block">
      <div class="badge">正式目的</div>
      <div class="ko">어간 + 게 하기 위하여</div>
      <div class="zh">为了（书面语）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">어간</span> + 도록：늦<b style="color:#ff7fa8">도록</b> / 먹<b style="color:#ff7fa8">도록</b></div>
        <div><span style="font-weight:700">어간</span> + 을/ㄹ 수 있게：볼 수 있<b style="color:#ff7fa8">게</b> / 먹을 수 있<b style="color:#ff7fa8">게</b></div>
        <div><span style="font-weight:700">어간</span> + 게 하기 위하여：이해할 수 있<b style="color:#ff7fa8">게 하기 위하여</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늦으도록（으 삽입）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦도록（어간 직접 접속）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">위하여 + 도록 동시 사용</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">둘 중 하나만 사용</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g27'],
  },

  // ── 第4课：-을/를 지경이다，-을/를 수록 ──────────────────────────────
  {
    id: 'card-p13-l04',
    partNumber: 13,
    lessonNumber: 4,
    title: '-을/를 지경이다，-을수록',
    whatItDoes: '表示极端程度或越……越……',
    whatItDoesBody: '-을 지경이다 表示情况已到了某种极端程度，相当于"到了……的地步/程度"，含有负面或夸张语气。\n-(으)면 -(으)ㄹ수록 表示"越……越……"，前后两个동사/형용사形成递进关系，程度随条件加深。',
    structureNote: '-을 지경이다：동사/형용사 관형사형（을/ㄹ）+ 지경이다\n-(으)ㄹ수록：동사/형용사 어간 + (으)ㄹ수록（앞에 -(으)면 과 함께 쓰이는 경우가 많음）',
    rulesNote: '-을 지경이다 앞에는 부정적이거나 극단적인 상태를 나타내는 관형사형이 온다。부정문에서도 자주 쓰임（못 참을 지경이다）。\n-(으)ㄹ수록 은 앞절과 뒷절의 주어가 같아도 다르가도 자연스럽다。-(으)면 을 앞에 붙이면 더 자연스러운 경우가 많다（먹으면 먹을수록）。',
    scenarioNote: '-을 지경이다 는 "너무 힘들어서 쓰러질 지경이에요"처럼 과장되거나 극단적인 상태를 표현할 때 쓴다。\n-(으)ㄹ수록 은 "알면 알수록 더 재미있어요"처럼 점진적 변화를 설명할 때 자연스럽게 쓰인다。',
    step0Html: `<div class="card-title">到了那种地步……越来越……</div>
<div class="card-body">一个说极端，一个说递进。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">极端 vs 递进</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-을 지경이다 — 极端程度</div>
      <div style="font-size:16px;font-weight:800;color:#241917">쓰러질 지경이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">累到快要倒下的地步了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-(으)ㄹ수록 — 越……越……</div>
      <div style="font-size:16px;font-weight:800;color:#241917">알면 알수록 재미있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">越了解越有趣。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 지경이다 常含负面语气，수록 可正可负</div>
</div>
<div class="reminder-box">-을 지경이다 前接관형사형，-(으)ㄹ수록 前接어간。</div>`,
    compareHtml: `<div class="card-title">-을 지경이다 vs -을 만큼이다 vs -(으)ㄹ수록</div>
<div class="card-body">同样表示程度，三者如何区分？</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을 지경이다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">极端程度，多含负面/夸张语气</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">쓰러질 지경이에요</span><span style="font-size:16px;color:#5a4640">累到要倒下的地步</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-을 만큼이다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">程度相当，语气较中性</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">죽을 만큼 힘들어요</span><span style="font-size:16px;color:#5a4640">累到要死的程度</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)ㄹ수록</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">越……越……，表递进变化</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하면 할수록 어려워요</span><span style="font-size:16px;color:#5a4640">越学越难</span></div>
  </div>
</div>
<div class="reminder-box">-지경이다 是状态到达极点，-(으)ㄹ수록 是条件与结果同步递进。</div>`,
    compareLabel: '-을 지경이다 vs -을 만큼이다 vs -(으)ㄹ수록',
    structures: [
      {
        ko: '너무 배가 고파서 쓰러질 지경이에요',
        zh: '太饿了，饿到快要倒下的地步。',
        tokens: [
          { text: '너무', role: 'plain' },
          { text: '배가', role: 'subject' },
          { text: '고파서', role: 'plain' },
          { text: '쓰러질 지경이에요', role: 'verb' },
        ],
      },
      {
        ko: '못 참을 지경이에요',
        zh: '已经到了忍无可忍的地步。',
        tokens: [
          { text: '못 참을', role: 'plain' },
          { text: '지경이에요', role: 'verb' },
        ],
      },
      {
        ko: '알면 알수록 더 재미있어요',
        zh: '越了解越有趣。',
        tokens: [
          { text: '알면', role: 'plain' },
          { text: '알수록', role: 'plain' },
          { text: '더', role: 'plain' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 지날수록 그리워져요',
        zh: '随着时间流逝，越来越想念。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '지날수록', role: 'plain' },
          { text: '그리워져요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을 지경이다：동사/형용사 관형사형（받침 O → 을, 없/ㄹ → ㄹ）+ 지경이다', examples: '쓰러질 지경이다 / 못 참을 지경이다 / 울 지경이다 / 죽을 지경이다' },
      { type: 'rule', text: '-(으)ㄹ수록：어간 받침 있으면 을수록, 없으면/ㄹ이면 ㄹ수록', examples: '먹을수록 / 볼수록 / 갈수록 / 어려울수록 / 좋을수록' },
      { type: 'usage', text: '-(으)면 -(으)ㄹ수록 형태로 앞절에 -(으)면 을 붙이면 더 자연스럽다', examples: '알면 알수록 / 먹으면 먹을수록 / 생각하면 할수록' },
      { type: 'usage', text: '-을 지경이다 는 부정적·극단적 상황에 쓰이며，긍정 상황에는 어색하다', examples: '쓰러질 지경이다（✓） / 행복할 지경이다（△ 어색）' },
      { type: 'note', text: '-지경이다 는 구어체에서 -지경이에요，문어체에서는 -지경에 처했다 등으로도 쓰인다', examples: '이미 포기할 지경에 이르렀어요' },
      { type: 'compare', text: '-을 지경이다 vs -을 뻔했다：지경이다는 아직 상태가 진행 중，뻔했다는 거의 발생할 뻔한 과거', examples: '쓰러질 지경이에요（현재 극한 상태） / 쓰러질 뻔했어요（거의 쓰러질 뻔한 과거）' },
      { type: 'example', text: '너무 힘들어서 울 지경이에요 / 보면 볼수록 좋아요 / 시간이 갈수록 더 그리워져요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '너무 피곤해서', role: 'plain' },
          { text: '쓰러질', role: 'plain' },
          { text: '지경이에요', role: 'verb' },
        ],
        zh: '太累了，累到要倒下的地步。',
        swapWords: ['쓰러질 지경이에요', '울 지경이에요', '포기할 지경이에요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '스트레스가', role: 'subject' },
          { text: '너무 많아서', role: 'plain' },
          { text: '못 참을 지경이에요', role: 'verb' },
        ],
        zh: '压力太大，到了忍无可忍的地步。',
        swapWords: ['못 참을 지경이에요', '쓰러질 지경이에요', '그만두고 싶을 지경이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '들으면', role: 'plain' },
          { text: '들을수록', role: 'plain' },
          { text: '좋아지는 노래예요', role: 'verb' },
        ],
        zh: '是越听越好听的歌。',
        swapWords: ['들을수록', '볼수록', '알수록'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '지날수록', role: 'plain' },
          { text: '더 보고 싶어요', role: 'verb' },
        ],
        zh: '随着时间流逝，越来越想见。',
        swapWords: ['지날수록', '흐를수록', '갈수록'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😫', context: '极度疲惫', ko: '이틀 동안 못 잔더니 쓰러질 지경이에요.', zh: '两天没睡，累到快要倒下了。' },
      { icon: '😤', context: '忍无可忍', ko: '그 사람 때문에 못 참을 지경이에요.', zh: '因为那个人，已经到了忍无可忍的地步。' },
      { icon: '🎵', context: '越听越好', ko: '이 노래는 들으면 들을수록 좋아요.', zh: '这首歌越听越好听。' },
      { icon: '📚', context: '越学越难', ko: '한국어는 공부하면 할수록 어려워요.', zh: '韩语越学越难。' },
      { icon: '💔', context: '越想越难过', ko: '생각하면 할수록 더 슬퍼져요.', zh: '越想越难过。' },
      { icon: '🌧️', context: '天气越来越冷', ko: '날씨가 갈수록 추워지고 있어요.', zh: '天气越来越冷了。' },
    ],
    mistakes: [
      { wrong: '쓰러지을 지경이에요（받침 있는 어간에 을 중복）', correct: '쓰러질 지경이에요', note: '쓰러지다 어간 쓰러지는 받침이 없으므로 ㄹ수록/ㄹ 관형사형：쓰러질 지경이에요。쓰러지을은 없는 형태。' },
      { wrong: '알수록 알수록 재미있어요（수록 중복）', correct: '알면 알수록 재미있어요', note: '-(으)ㄹ수록 앞에 -(으)면 을 한 번만 붙여 쓴다。같은 동사를 두 번 반복할 때는 알면 알수록 형태가 표준。' },
      { wrong: '시간이 지날수록에 더 그리워요（수록 + 에 조사）', correct: '시간이 지날수록 더 그리워요', note: '-(으)ㄹ수록 자체가 부사절 역할을 하므로 뒤에 조사를 붙이지 않는다。' },
      { wrong: '행복할 지경이에요（긍정 상태 + 지경이다）', correct: '너무 행복해요 또는 행복해서 눈물이 날 지경이에요', note: '-을 지경이다 는 부정적이거나 극단적인 상황에 쓰는 것이 자연스럽다。행복하다처럼 긍정적 상태에는 어색하다。' },
    ],
    quickTable: {
      title: '-을 지경이다 / -(으)ㄹ수록 接续',
      headers: ['표현', '받침 O', '받침 X/ㄹ', '예시'],
      rows: [
        ['-을 지경이다', '먹을 지경이다', '쓰러질 지경이다', '못 참을 지경이다'],
        ['-(으)ㄹ수록', '먹을수록', '볼수록 / 갈수록', '알수록 / 좋을수록'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을 지경이다 / -(으)ㄹ수록',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '너무 배가 고파서 쓰러질 ___。（太饿了，饿到快要倒下的地步。）',
          options: ['지경이에요', '만큼이에요', '정도예요', '뻔했어요'],
          answer: 0 as 0|1|2|3,
          explanation: '쓰러질 지경이에요：극단적 부정 상황을 나타내는 -을 지경이다 표현。만큼이에요는 정도 비교，정도예요는 단순 정도，뻔했어요는 과거 위험 회피。',
        },
        {
          prompt: '한국어는 공부하면 할___ 어려워요。（韩语越学越难。）',
          options: ['수록', '수록에', '수록이', '수록을'],
          answer: 0 as 0|1|2|3,
          explanation: '할수록：하다 어간 하（받침 없음）+ ㄹ수록 = 할수록。-(으)ㄹ수록 은 부사절이므로 뒤에 조사 없이 그대로 쓴다。',
        },
        {
          prompt: '다음 중 -을 지경이다가 가장 자연스럽게 쓰인 것은？',
          options: ['울 지경이에요', '행복할 지경이에요', '기분이 좋을 지경이에요', '기쁠 지경이에요'],
          answer: 0 as 0|1|2|3,
          explanation: '-을 지경이다 는 부정적·극단적 상황에 쓰인다。울 지경이에요는 부정적 극한 상태（✓）。행복하다/기분이 좋다/기쁘다는 모두 긍정 감정으로 지경이다와 어울리지 않는다。',
        },
        {
          prompt: '시간이 ___수록 더 보고 싶어요。（随着时间流逝，越来越想见。）',
          options: ['지날', '지나을', '지나의', '지나이'],
          answer: 0 as 0|1|2|3,
          explanation: '지나다 어간 지나（받침 없음）+ ㄹ수록 = 지날수록。받침 없는 어간에는 ㄹ수록을 붙인다。지나을/지나의/지나이는 모두 없는 형태。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第4课</div>
    <div class="ov-hero-title">-을 지경이다，-(으)ㄹ수록</div>
    <div class="ov-hero-sub">极端程度 · 越……越……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">极端程度</div>
      <div class="ko">관형사형（을/ㄹ）+ 지경이다</div>
      <div class="zh">到了……的地步</div>
    </div>
    <div class="ov-block">
      <div class="badge">越……越……</div>
      <div class="ko">어간 + (으)ㄹ수록</div>
      <div class="zh">越……越……</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">받침 O</span>：먹<b style="color:#ff7fa8">을 지경이다</b> / 먹<b style="color:#ff7fa8">을수록</b></div>
        <div><span style="font-weight:700">받침 X/ㄹ</span>：쓰러지<b style="color:#ff7fa8">ㄹ 지경이다</b> → 쓰러질 지경이다 / 볼수록</div>
        <div><span style="font-weight:700">-(으)면 + 수록</span>：알면 알<b style="color:#ff7fa8">수록</b>（자연스러운 형태）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">행복할 지경이에요（긍정 상태）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">너무 행복해요（지경이다는 부정·극단에만）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">지날수록에 더 그리워요（조사 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">지날수록 더 그리워요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g35'],
  },

  // ── 第5课：-테요，-던데요，-더라 ──────────────────────────────
  {
    id: 'card-p13-l05',
    partNumber: 13,
    lessonNumber: 5,
    title: '-테요，-던데요，-더라',
    whatItDoes: '表示推测、回顾或感叹',
    whatItDoesBody: '-테요 表示说话者的推测或意志，相当于"应该……吧/我会……"，含主观判断语气。\n-던데요 表示说话者回忆起过去的亲身经历，带有轻微的感叹或提示语气，相当于"（我记得/之前）……呢"。\n-더라 表示说话者回顾自己的亲身经历后发表感叹，是口语体，多用于描述过去观察到的事实，相当于"……啊/果然……"。',
    structureNote: '-테요：동사/형용사 어간 + 테요（을 테요 / ㄹ 테요）\n-던데요：동사/형용사 어간 + 던데요（과거 경험 회상）\n-더라：동사/형용사 어간 + 더라（구어체 경험 감탄）',
    rulesNote: '-테요 는 -(으)ㄹ 테요 형태로 추측（날씨가 좋을 테니까）이나 의지（제가 할 테요）를 나타낸다。\n-던데요 는 앞 절에서 회상한 사실을 근거로 뒤 절에서 의견을 전달할 때도 쓰인다（어제 봤던데요，제 생각엔…）。\n-더라 는 주어가 1인칭일 때는 의지/발견，3인칭일 때는 관찰 보고 느낌으로 쓰인다。구어에서 -더라고요 형태로도 쓰인다。',
    scenarioNote: '-테요 는 "제가 할 테요" 또는 "힘들 테니까 쉬세요"처럼 상대방에 대한 배려나 추측을 전할 때 자주 쓰인다。\n-던데요 는 "어제 거기 가 봤던데요，정말 맛있더라고요"처럼 경험을 근거로 한 추천이나 의견 전달에 쓰인다。\n-더라 는 "가 봤더니 생각보다 좋더라"처럼 직접 경험 후의 감탄이나 발견을 표현한다。',
    step0Html: `<div class="card-title">推测、回忆、感叹</div>
<div class="card-body">三个表达都带有说话者的主观色彩。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">推测 · 回忆 · 感叹</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-테요 — 推测/意志</div>
      <div style="font-size:16px;font-weight:800;color:#241917">힘들 테니까 좀 쉬세요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">应该很累，请休息一下。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-던데요 — 回忆提示</div>
      <div style="font-size:16px;font-weight:800;color:#241917">거기 음식이 맛있던데요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那里的食物（我记得）很好吃呢。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-더라 — 经历感叹</div>
      <div style="font-size:16px;font-weight:800;color:#241917">가 봤더니 생각보다 좋더라.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">去了一看，比想象中好啊。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 모두 화자의 주관적 판단·경험을 담은 표현</div>
</div>
<div class="reminder-box">-테요 는 추측/의지，-던데요/-더라 는 과거 경험 회상。</div>`,
    compareHtml: `<div class="card-title">-테요 vs -던데요 vs -더라</div>
<div class="card-body">세 표현의 뉘앙스 차이를 비교합니다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-테요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">추측（～일 거야）또는 의지（내가 할게）, 현재/미래 지향</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">제가 할 테요</span><span style="font-size:16px;color:#5a4640">我来做</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-던데요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">과거 직접 경험 회상，청자에게 전달하는 어감</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어제 거기 사람 많던데요</span><span style="font-size:16px;color:#5a4640">昨天那里人很多呢</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-더라</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">과거 직접 경험 후 감탄/발견，구어체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹어 봤더니 진짜 맛있더라</span><span style="font-size:16px;color:#5a4640">吃了一下，真的很好吃啊</span></div>
  </div>
</div>
<div class="reminder-box">-던데요 는 청자 배려，-더라 는 독백/친한 사이 감탄，-테요 는 현재·미래 추측/의지。</div>`,
    compareLabel: '-테요 vs -던데요 vs -더라',
    structures: [
      {
        ko: '많이 피곤할 테니까 일찍 들어가세요',
        zh: '应该很累，请早点回去。',
        tokens: [
          { text: '많이', role: 'plain' },
          { text: '피곤할 테니까', role: 'plain' },
          { text: '일찍 들어가세요', role: 'verb' },
        ],
      },
      {
        ko: '제가 다 준비할 테요',
        zh: '我来全部准备。',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '다', role: 'plain' },
          { text: '준비할 테요', role: 'verb' },
        ],
      },
      {
        ko: '거기 음식이 정말 맛있던데요',
        zh: '那里的食物真的很好吃呢（我去过）。',
        tokens: [
          { text: '거기', role: 'plain' },
          { text: '음식이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '맛있던데요', role: 'verb' },
        ],
      },
      {
        ko: '가 봤더니 생각보다 훨씬 좋더라',
        zh: '去了一看，比想象中好多了啊。',
        tokens: [
          { text: '가 봤더니', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '훨씬', role: 'plain' },
          { text: '좋더라', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-테요：어간 + (을/ㄹ) 테요（받침 O → 을 테요，없/ㄹ → ㄹ 테요）', examples: '먹을 테요 / 갈 테요 / 피곤할 테니까 / 할 테요' },
      { type: 'rule', text: '-던데요：어간 + 던데요（과거 회상，받침 유무 무관）', examples: '맛있던데요 / 많던데요 / 오던데요 / 좋던데요' },
      { type: 'rule', text: '-더라：어간 + 더라（구어체 감탄，받침 유무 무관）', examples: '맛있더라 / 춥더라 / 예쁘더라 / 힘들더라' },
      { type: 'usage', text: '-테요 의 두 가지 용법：① 추측（힘들 테니까 쉬세요）② 의지（제가 할 테요）', examples: '날씨가 추울 테니까 코트 입으세요（추측） / 내가 다 할 테요（의지）' },
      { type: 'note', text: '-더라 는 주어가 1인칭이면 발견/의지，3인칭이면 관찰 보고。-더라고요 형태로 격식 변환 가능', examples: '내가 해 보니까 어렵더라（1인칭 발견） / 그 사람 노래 잘하더라（3인칭 관찰）' },
      { type: 'compare', text: '-던데요 vs -더라：던데요 는 청자에게 전달하는 뉘앙스，더라 는 독백이나 친한 사이 감탄', examples: '거기 맛있던데요，한번 가 봐요（청자 배려） / 거기 맛있더라（독백/친구）' },
      { type: 'example', text: '힘들 테니까 쉬세요 / 어제 거기 사람 많던데요 / 먹어 보니까 진짜 맛있더라' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘 바쁠 테니까', role: 'plain' },
          { text: '내일', role: 'plain' },
          { text: '연락할게요', role: 'verb' },
        ],
        zh: '今天应该很忙，明天再联系吧。',
        swapWords: ['바쁠 테니까', '힘들 테니까', '피곤할 테니까'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '다음에', role: 'plain' },
          { text: '해 볼 테요', role: 'verb' },
        ],
        zh: '我下次来试试。',
        swapWords: ['해 볼 테요', '준비할 테요', '확인할 테요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제 그 카페', role: 'plain' },
          { text: '분위기가', role: 'subject' },
          { text: '정말 좋던데요', role: 'verb' },
        ],
        zh: '昨天那家咖啡馆氛围真的很好呢。',
        swapWords: ['좋던데요', '예쁘던데요', '아늑하던데요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '직접 먹어 봤는데', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '맛있더라', role: 'verb' },
        ],
        zh: '亲自尝了一下，比想象中好吃啊。',
        swapWords: ['맛있더라', '좋더라', '괜찮더라'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '推测对方疲劳', ko: '오늘 많이 힘들었을 테니까 푹 쉬세요.', zh: '今天应该累坏了，好好休息吧。' },
      { icon: '🙋', context: '表示自己来做', ko: '제가 다 할 테니까 걱정하지 마세요.', zh: '我来全部做，不用担心。' },
      { icon: '🍜', context: '推荐餐厅', ko: '거기 국수가 진짜 맛있던데요, 한번 가 보세요.', zh: '那里的面条真的很好吃呢，去试试吧。' },
      { icon: '🎶', context: '回忆演唱会', ko: '공연이 생각보다 훨씬 재미있던데요.', zh: '演出比想象中有趣多了呢。' },
      { icon: '😮', context: '发现令人惊讶', ko: '직접 해 봤는데 생각보다 쉽더라.', zh: '亲自做了一下，比想象中简单啊。' },
      { icon: '🌸', context: '描述所见', ko: '벚꽃이 엄청 예쁘더라, 빨리 와!', zh: '樱花超级漂亮啊，快来！' },
    ],
    mistakes: [
      { wrong: '피곤할 테요니까 쉬세요（테요 + 니까 어순 오류）', correct: '피곤할 테니까 쉬세요', note: '-테니까 는 테 + 니까가 결합한 형태로 하나의 어미처럼 쓰인다。테요 뒤에 니까를 붙이지 않는다。' },
      { wrong: '어제 거기 맛있었던데요（과거 시제 중복）', correct: '어제 거기 맛있던데요', note: '-던데요 자체가 과거 회상 의미를 포함하므로 었/았 과거 시제를 중복하지 않는다。맛있었던데요는 어색하다。' },
      { wrong: '그 영화 재미있더라요（더라 + 요 중복）', correct: '그 영화 재미있더라 또는 재미있더라고요', note: '-더라 는 구어체 종결어미로 뒤에 요를 바로 붙이지 않는다。격식체로는 -더라고요 형태를 쓴다。' },
      { wrong: '내가 할 테요을 준비했어요（테요 + 을 조사）', correct: '내가 할 테요（단독 종결）또는 내가 준비할 테요', note: '-테요 는 종결어미이므로 뒤에 조사를 붙이지 않는다。' },
    ],
    quickTable: {
      title: '-테요 / -던데요 / -더라 用法対比',
      headers: ['표현', '시제', '뉘앙스', '예시'],
      rows: [
        ['-테요（-(으)ㄹ 테요）', '현재/미래', '추측 또는 의지', '피곤할 테니까 / 제가 할 테요'],
        ['-던데요', '과거 회상', '경험 근거 전달', '맛있던데요 / 많던데요'],
        ['-더라', '과거 회상', '직접 경험 감탄（구어）', '좋더라 / 맛있더라'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-테요 / -던데요 / -더라',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '오늘 많이 피곤할 ___ 일찍 들어가세요。（今天应该很累，请早点回去。）',
          options: ['테니까', '던데요', '더라', '테요만'],
          answer: 0 as 0|1|2|3,
          explanation: '-테니까：-(으)ㄹ 테니까 는 추측을 근거로 뒤에 권유나 부탁을 전달할 때 쓴다。피곤할 테니까 일찍 들어가세요 ✓。던데요/더라 는 과거 경험 회상이라 미래 추측 맥락에 맞지 않는다。',
        },
        {
          prompt: '어제 그 식당 음식이 정말 맛있___。（昨天那家餐厅的食物真的很好吃呢。）',
          options: ['던데요', '을 테요', '더라요', '었던데요'],
          answer: 0 as 0|1|2|3,
          explanation: '-던데요：과거 직접 경험을 청자에게 전달하는 표현。었던데요는 과거 시제 중복으로 어색하고，더라요는 없는 형태。',
        },
        {
          prompt: '직접 가 봤는데 경치가 정말 아름다웠___。（亲自去了一趟，风景真的很美啊。）',
          options: ['더라', '던데요', '테요', '더라요'],
          answer: 0 as 0|1|2|3,
          explanation: '-더라：직접 경험 후 감탄을 나타내는 구어체 종결어미。던데요도 가능하지만 直接 감탄을 표현하는 독백체는 더라。더라요는 없는 형태。',
        },
        {
          prompt: '제가 다 ___ 걱정하지 마세요。（我来全部做，不用担心。）',
          options: ['할 테니까', '했던데요', '했더라', '할 테요니까'],
          answer: 0 as 0|1|2|3,
          explanation: '할 테니까：-(으)ㄹ 테니까 는 의지를 근거로 권유/안심을 전달。제가 다 할 테니까 걱정하지 마세요 ✓。할 테요니까는 없는 형태，했던데요/했더라 는 과거 경험 표현이라 의지 맥락에 맞지 않는다。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第5课</div>
    <div class="ov-hero-title">-테요，-던데요，-더라</div>
    <div class="ov-hero-sub">推测/意志 · 回忆提示 · 经历感叹</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">推测/意志</div>
      <div class="ko">어간 + (으)ㄹ 테요／테니까</div>
      <div class="zh">应该……/我来……</div>
    </div>
    <div class="ov-block">
      <div class="badge">回忆提示</div>
      <div class="ko">어간 + 던데요</div>
      <div class="zh">（我记得）……呢</div>
    </div>
    <div class="ov-block">
      <div class="badge">经历感叹</div>
      <div class="ko">어간 + 더라</div>
      <div class="zh">……啊（亲身经历）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">받침 O</span> + 을 테요：먹<b style="color:#ff7fa8">을 테요</b></div>
        <div><span style="font-weight:700">받침 X/ㄹ</span> + ㄹ 테요：할<b style="color:#ff7fa8"> 테요</b> / 갈<b style="color:#ff7fa8"> 테요</b></div>
        <div><span style="font-weight:700">어간</span> + 던데요：맛있<b style="color:#ff7fa8">던데요</b></div>
        <div><span style="font-weight:700">어간</span> + 더라：좋<b style="color:#ff7fa8">더라</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있었던데요（었 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있던데요（던데요 자체가 과거）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">재미있더라요（더라 + 요）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재미있더라 또는 재미있더라고요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g50', 'g52'],
  },

  // ── 第6课：-았/었/였더니，-더니 ──────────────────────────────
  {
    id: 'card-p13-l06',
    partNumber: 13,
    lessonNumber: 6,
    title: '-았/었/였더니，-더니',
    whatItDoes: '表示前后动作的因果或对比关系（基于亲身经历）',
    whatItDoesBody: '-았/었/였더니 表示说话者亲身做了某事之后发现了某种结果，相当于"（我）做了……之后/结果……"，主语通常是1인칭。\n-더니 表示回忆过去观察到的事实，并引出与之相关的结果或对比，相当于"（之前）……，（所以/但是）……"，主语通常是3인칭或自然现象。',
    structureNote: '-았/었/였더니：동사 어간 + 았/었/였더니（아/어/여 어간에 따라）\n-더니：동사/형용사 어간 + 더니（과거 회상，받침 유무 무관）',
    rulesNote: '-았더니 는 주어가 1인칭（나/저）이어야 자연스럽다。3인칭 주어에 쓰면 어색하거나 비문이 될 수 있다。\n-더니 는 주어가 3인칭이거나 자연 현상일 때 자연스럽다。"비가 오더니 개었어요"처럼 앞 절과 뒷 절 사이의 전환을 나타낸다。',
    scenarioNote: '-았더니 는 "먹었더니 배불러요"처럼 직접 경험 후 결과를 말할 때 자주 쓰인다。\n-더니 는 "아이가 울더니 갑자기 웃었어요"처럼 3인칭 행동 변화를 관찰한 후 전달할 때 자주 쓰인다。',
    step0Html: `<div class="card-title">做了之后……之前……结果……</div>
<div class="card-body">亲身经历的前后关系，主语决定选哪个。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">1인칭 vs 3인칭</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-았더니 — 我做了……结果</div>
      <div style="font-size:16px;font-weight:800;color:#241917">운동했더니 몸이 가벼워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">运动了之后，身体变轻了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-더니 — 之前……结果/但是</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 오더니 갑자기 개었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">之前下着雨，突然放晴了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 았더니 앞 주어 = 나/저，더니 앞 주어 = 3인칭/자연현상</div>
</div>
<div class="reminder-box">-았더니 는 1인칭 경험 결과，-더니 는 3인칭 관찰 전환。</div>`,
    compareHtml: `<div class="card-title">-았더니 vs -더니 vs -(으)니까</div>
<div class="card-body">모두 전후 관계를 나타내지만 주어와 뉘앙스가 다릅니다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았더니</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">1인칭 직접 경험 후 결과 발견</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약을 먹었더니 나았어요</span><span style="font-size:16px;color:#5a4640">吃了药之后好了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-더니</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">3인칭 관찰 후 전환/결과</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아이가 울더니 잠들었어요</span><span style="font-size:16px;color:#5a4640">孩子哭着哭着睡着了</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)니까</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">원인/이유（주어 제한 없음）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약을 먹으니까 나았어요</span><span style="font-size:16px;color:#5a4640">因为吃了药所以好了</span></div>
  </div>
</div>
<div class="reminder-box">-았더니 와 -더니 는 주어 인칭이 핵심 구분 기준。</div>`,
    compareLabel: '-았더니 vs -더니 vs -(으)니까',
    structures: [
      {
        ko: '열심히 운동했더니 살이 빠졌어요',
        zh: '努力运动之后，瘦下来了。',
        tokens: [
          { text: '열심히', role: 'plain' },
          { text: '운동했더니', role: 'plain' },
          { text: '살이', role: 'subject' },
          { text: '빠졌어요', role: 'verb' },
        ],
      },
      {
        ko: '약을 먹었더니 금방 나았어요',
        zh: '吃了药之后，很快就好了。',
        tokens: [
          { text: '약을', role: 'object' },
          { text: '먹었더니', role: 'plain' },
          { text: '금방', role: 'plain' },
          { text: '나았어요', role: 'verb' },
        ],
      },
      {
        ko: '아이가 울더니 갑자기 잠들었어요',
        zh: '孩子哭着哭着，突然睡着了。',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: '울더니', role: 'plain' },
          { text: '갑자기', role: 'plain' },
          { text: '잠들었어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 오더니 갑자기 날씨가 맑아졌어요',
        zh: '之前下着雨，突然天气放晴了。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오더니', role: 'plain' },
          { text: '갑자기', role: 'plain' },
          { text: '날씨가', role: 'subject' },
          { text: '맑아졌어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-았/었/였더니：어간 + 았/었/였더니（아 어간→았더니，어/여 어간→었더니/였더니）', examples: '먹었더니 / 운동했더니 / 잤더니 / 공부했더니' },
      { type: 'rule', text: '-더니：어간 + 더니（받침 유무 무관）', examples: '울더니 / 오더니 / 먹더니 / 춥더니' },
      { type: 'usage', text: '-았더니 의 주어는 반드시 1인칭（나/저）이어야 한다。3인칭 주어에 쓰면 어색하다', examples: '내가 먹었더니 배불러요（✓）/ 친구가 먹었더니 배불렀어요（✗ 어색）' },
      { type: 'usage', text: '-더니 의 주어는 3인칭이거나 자연현상일 때 자연스럽다', examples: '그 사람이 공부하더니 합격했어요 / 비가 오더니 개었어요' },
      { type: 'note', text: '-더니 는 앞 절과 뒷 절 사이에 전환（변화）이나 결과 관계를 나타낸다', examples: '어렸을 때 키가 작더니 지금은 크네요（변화）/ 열심히 하더니 결국 해냈어요（결과）' },
      { type: 'compare', text: '-았더니 vs -(으)니까：았더니 는 1인칭 직접 경험 결과，(으)니까 는 원인/이유로 주어 제한 없음', examples: '약을 먹었더니 나았어요（직접 경험 결과）/ 약을 먹으니까 나았어요（원인 설명）' },
      { type: 'example', text: '잠을 잤더니 피로가 풀렸어요 / 그 가수가 노래하더니 관객이 환호했어요 / 날씨가 맑더니 갑자기 비가 왔어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '커피를', role: 'object' },
          { text: '마셨더니', role: 'plain' },
          { text: '잠이 깼어요', role: 'verb' },
        ],
        zh: '喝了咖啡之后，睡意消了。',
        swapWords: ['마셨더니', '먹었더니', '마셨더니 눈이 떠졌어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '스트레칭을', role: 'object' },
          { text: '했더니', role: 'plain' },
          { text: '몸이 가벼워졌어요', role: 'verb' },
        ],
        zh: '做了拉伸之后，身体变轻了。',
        swapWords: ['했더니', '운동했더니', '쉬었더니'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '동생이', role: 'subject' },
          { text: '화를 내더니', role: 'plain' },
          { text: '방으로 들어갔어요', role: 'verb' },
        ],
        zh: '弟弟/妹妹发了火之后，进了房间。',
        swapWords: ['화를 내더니', '울더니', '소리를 지르더니'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '맑더니', role: 'plain' },
          { text: '갑자기 비가 왔어요', role: 'verb' },
        ],
        zh: '之前天气晴朗，突然下起了雨。',
        swapWords: ['맑더니', '따뜻하더니', '좋더니'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '💊', context: '药效见效', ko: '약을 먹었더니 두통이 사라졌어요.', zh: '吃了药之后，头痛消失了。' },
      { icon: '🏃', context: '运动结果', ko: '매일 달렸더니 체력이 좋아졌어요.', zh: '每天跑步之后，体力变好了。' },
      { icon: '😴', context: '睡觉解乏', ko: '푹 잤더니 피로가 풀렸어요.', zh: '好好睡了一觉之后，疲劳消除了。' },
      { icon: '🌧️', context: '天气转变', ko: '비가 오더니 갑자기 개었어요.', zh: '之前在下雨，突然放晴了。' },
      { icon: '👶', context: '孩子变化', ko: '아이가 울더니 조용해졌어요.', zh: '孩子哭了一会儿，安静下来了。' },
      { icon: '📈', context: '努力有结果', ko: '열심히 공부하더니 결국 합격했어요.', zh: '之前努力学习，最终合格了。' },
    ],
    mistakes: [
      { wrong: '친구가 먹었더니 배불렀어요（3인칭 + 았더니）', correct: '친구가 먹더니 배부른 것 같았어요 또는 내가 먹었더니 배불렀어요', note: '-았더니 앞 주어는 1인칭이어야 한다。3인칭 주어에는 -더니 를 쓴다。' },
      { wrong: '비가 왔더니 길이 미끄러워요（자연현상 + 았더니）', correct: '비가 오더니 길이 미끄러워졌어요', note: '자연현상을 주어로 쓸 때는 -더니 가 자연스럽다。-았더니 는 1인칭 직접 경험에만 쓴다。' },
      { wrong: '잠을 자더니 피로가 풀렸어요（1인칭 경험에 더니）', correct: '잠을 잤더니 피로가 풀렸어요', note: '나/저의 직접 경험 후 결과를 말할 때는 -았더니 를 쓴다。1인칭 주어에 -더니 만 쓰면 어색하다。' },
      { wrong: '운동했더니에 살이 빠졌어요（았더니 + 에 조사）', correct: '운동했더니 살이 빠졌어요', note: '-았더니 는 접속어미이므로 뒤에 조사를 붙이지 않는다。' },
    ],
    quickTable: {
      title: '-았더니 vs -더니 핵심 차이',
      headers: ['항목', '-았더니', '-더니'],
      rows: [
        ['주어 인칭', '1인칭（나/저）', '3인칭/자연현상'],
        ['시제', '과거 완료（았/었）', '과거 진행/상태'],
        ['뉘앙스', '직접 경험 후 결과 발견', '관찰한 변화/전환'],
        ['예시', '먹었더니 배불러요', '울더니 잠들었어요'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-았더니 / -더니',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '약을 ___ 금방 나았어요。（吃了药之后，很快好了。）',
          options: ['먹었더니', '먹더니', '먹으니더니', '먹었더니요'],
          answer: 0 as 0|1|2|3,
          explanation: '내가 약을 먹은 직접 경험 후 결과 → -았더니。먹다 어간 먹（받침 ㄱ）+ 었더니 = 먹었더니。먹더니는 3인칭 관찰에 쓰는 형태。',
        },
        {
          prompt: '아이가 ___ 갑자기 잠들었어요。（孩子哭着哭着突然睡着了。）',
          options: ['울더니', '울었더니', '우니더니', '울더니요'],
          answer: 0 as 0|1|2|3,
          explanation: '아이（3인칭）의 행동 변화 관찰 → -더니。울다 어간 울（ㄹ받침）+ 더니 = 울더니。울었더니는 1인칭 경험 결과 표현이라 3인칭 주어에 어색하다。',
        },
        {
          prompt: '다음 중 -았더니 가 올바르게 쓰인 것은？',
          options: ['잠을 잤더니 피로가 풀렸어요', '비가 왔더니 길이 미끄러워요', '아이가 먹었더니 배불렀어요', '날씨가 맑았더니 추워졌어요'],
          answer: 0 as 0|1|2|3,
          explanation: '-았더니 는 1인칭 직접 경험 후 결과 표현。잠을 잤더니 피로가 풀렸어요 — 내가 잔 직접 경험（✓）。나머지는 자연현상이나 3인칭 주어라 더니 가 적절。',
        },
        {
          prompt: '날씨가 맑___ 갑자기 비가 왔어요。（之前天气晴朗，突然下起了雨。）',
          options: ['더니', '았더니', '더니요', '더니를'],
          answer: 0 as 0|1|2|3,
          explanation: '날씨（자연현상）의 변화 관찰 → -더니。맑다 어간 맑（받침 ㄱ）+ 더니 = 맑더니。았더니는 1인칭 경험 표현이라 자연현상 주어에 어색하다。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第6课</div>
    <div class="ov-hero-title">-았더니，-더니</div>
    <div class="ov-hero-sub">1인칭 경험 결과 · 3인칭 관찰 전환</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">1인칭 경험 결과</div>
      <div class="ko">어간 + 았/었더니</div>
      <div class="zh">我做了……之后（结果）</div>
    </div>
    <div class="ov-block">
      <div class="badge">3인칭 관찰 전환</div>
      <div class="ko">어간 + 더니</div>
      <div class="zh">（之前）……（然后/但是）……</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">핵심 구분</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">나/저 + 았더니</span>：약을 먹<b style="color:#ff7fa8">었더니</b> 나았어요</div>
        <div><span style="font-weight:700">3인칭 + 더니</span>：아이가 울<b style="color:#ff7fa8">더니</b> 잠들었어요</div>
        <div><span style="font-weight:700">자연현상 + 더니</span>：비가 오<b style="color:#ff7fa8">더니</b> 개었어요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구가 먹었더니（3인칭 + 았더니）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구가 먹더니（3인칭 + 더니）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 왔더니（자연현상 + 았더니）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비가 오더니（자연현상 + 더니）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: [],
  },

  // ── 第7课：(으)로 인하여，(으)로 인한，-길래 ──────────────────────────────
  {
    id: 'card-p13-l07',
    partNumber: 13,
    lessonNumber: 7,
    title: '(으)로 인하여，(으)로 인한，-길래',
    whatItDoes: '表示原因（正式）或说话者的反应动机',
    whatItDoesBody: '(으)로 인하여 表示原因，相当于"由于……/因为……"，比 때문에 更正式，多用于书面语和新闻报道。\n(으)로 인한 是 (으)로 인하여 的관형사형，修饰后面的名词，相当于"由于……导致的……"。\n-길래 表示说话者因为观察到某种情况而做出相应的行动，相当于"因为（看到/听到）……所以……"，带有直接动机语气。',
    structureNote: '(으)로 인하여：명사 + (으)로 인하여（받침 O → 으로 인하여，없/ㄹ → 로 인하여）\n(으)로 인한：명사 + (으)로 인한 + 명사（관형사형）\n-길래：동사/형용사 어간 + 길래（구어체，받침 유무 무관）',
    rulesNote: '(으)로 인하여 는 -로 인해서 / -로 인해 로도 교체 가능。문어체에서는 (으)로 인하여，구어체에서는 -로 인해 가 더 자연스럽다。\n-길래 는 앞 절의 상황을 직접 관찰하거나 듣고 그에 반응하는 행동을 뒤 절에 쓴다。주어가 1인칭인 경우가 많다。',
    scenarioNote: '(으)로 인하여 는 뉴스，보고서，공문에서 "태풍으로 인하여 항공편이 결항됐습니다"처럼 공식적 원인 표현에 쓰인다。\n-길래 는 "왜 그랬어?"라는 물음에 "배가 고프길래 먹었어"처럼 직접적인 동기를 설명할 때 쓰인다。',
    step0Html: `<div class="card-title">由于……因为看到……所以</div>
<div class="card-body">两种原因表达，一正式一口语。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">正式原因 vs 口语动机</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">(으)로 인하여 — 正式原因</div>
      <div style="font-size:16px;font-weight:800;color:#241917">태풍으로 인하여 항공편이 결항됐습니다.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">由于台风，航班取消了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-길래 — 口语动机</div>
      <div style="font-size:16px;font-weight:800;color:#241917">배가 고프길래 뭔가 사 먹었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为饿了，所以买了点东西吃。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 로 인하여 书面正式，길래 口语直接</div>
</div>
<div class="reminder-box">(으)로 인하여 前接名词，-길래 前接动词/형용사 어간。</div>`,
    compareHtml: `<div class="card-title">(으)로 인하여 vs -때문에 vs -길래</div>
<div class="card-body">모두 원인을 나타내지만 문체와 뉘앙스가 다릅니다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">(으)로 인하여</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">명사 뒤，正式书面，新闻/公文</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사고로 인하여 도로가 통제됐습니다</span><span style="font-size:16px;color:#5a4640">由于事故，道路被封锁</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-때문에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">명사/동사 뒤，口语书面均可</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비 때문에 못 나갔어요</span><span style="font-size:16px;color:#5a4640">因为下雨没能出去</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-길래</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">동사/형용사 뒤，구어체，직접 동기</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있어 보이길래 시켜 봤어요</span><span style="font-size:16px;color:#5a4640">看起来好吃，所以点了一下</span></div>
  </div>
</div>
<div class="reminder-box">-길래 는 1인칭의 반응 행동이 뒤 절에 온다는 점이 특징。</div>`,
    compareLabel: '(으)로 인하여 vs -때문에 vs -길래',
    structures: [
      {
        ko: '태풍으로 인하여 항공편이 결항됐습니다',
        zh: '由于台风，航班取消了。',
        tokens: [
          { text: '태풍으로 인하여', role: 'plain' },
          { text: '항공편이', role: 'subject' },
          { text: '결항됐습니다', role: 'verb' },
        ],
      },
      {
        ko: '부주의로 인한 사고를 예방해야 합니다',
        zh: '必须预防由于疏忽导致的事故。',
        tokens: [
          { text: '부주의로 인한', role: 'plain' },
          { text: '사고를', role: 'object' },
          { text: '예방해야 합니다', role: 'verb' },
        ],
      },
      {
        ko: '불이 켜져 있길래 들어가 봤어요',
        zh: '因为灯亮着，就进去看了看。',
        tokens: [
          { text: '불이', role: 'subject' },
          { text: '켜져 있길래', role: 'plain' },
          { text: '들어가 봤어요', role: 'verb' },
        ],
      },
      {
        ko: '맛있어 보이길래 하나 더 시켰어요',
        zh: '看起来好吃，就又点了一份。',
        tokens: [
          { text: '맛있어 보이길래', role: 'plain' },
          { text: '하나 더', role: 'plain' },
          { text: '시켰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '(으)로 인하여：받침 O → 으로 인하여，받침 X/ㄹ → 로 인하여', examples: '사고로 인하여 / 태풍으로 인하여 / 질병으로 인하여 / 화재로 인하여' },
      { type: 'rule', text: '(으)로 인한：명사 + (으)로 인한 + 명사（관형사형으로 뒤 명사 수식）', examples: '사고로 인한 부상 / 태풍으로 인한 피해 / 스트레스로 인한 두통' },
      { type: 'rule', text: '-길래：동사/형용사 어간 + 길래（받침 유무 무관）', examples: '배고프길래 / 맛있어 보이길래 / 불이 켜져 있길래 / 오길래' },
      { type: 'usage', text: '(으)로 인하여 의 줄임형：로 인해（구어）/ 로 인해서（구어/문어 중간），세 형태는 교체 가능', examples: '태풍으로 인해 결항됐어요 / 사고로 인해서 늦었어요' },
      { type: 'usage', text: '-길래 는 앞 절의 상황을 화자가 직접 인식하고 뒤 절에서 반응 행동을 취하는 구조', examples: '싸길래 많이 샀어요 / 전화가 오길래 받았어요 / 문이 열려 있길래 들어갔어요' },
      { type: 'note', text: '-길래 는 뒤 절 주어가 1인칭이어야 자연스럽다。명령문·청유문과는 함께 쓸 수 없다', examples: '배고프길래 먹었어요（✓）/ 배고프길래 먹어요（✗ 명령 불가）' },
      { type: 'compare', text: '(으)로 인하여 vs (으)로 해서：인하여는 더 격식적이고 문어체，해서는 구어/문어 중간 수준', examples: '태풍으로 인하여（보고서） / 태풍으로 해서（일상대화 가능）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '화재로 인하여', role: 'plain' },
          { text: '건물이', role: 'subject' },
          { text: '전소됐습니다', role: 'verb' },
        ],
        zh: '由于火灾，建筑物被全部烧毁了。',
        swapWords: ['화재로 인하여', '사고로 인하여', '태풍으로 인하여'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '스트레스로 인한', role: 'plain' },
          { text: '두통이', role: 'subject' },
          { text: '심해졌어요', role: 'verb' },
        ],
        zh: '由压力引起的头痛加重了。',
        swapWords: ['스트레스로 인한', '피로로 인한', '사고로 인한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '싸길래', role: 'plain' },
          { text: '두 개', role: 'plain' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '因为便宜，所以买了两个。',
        swapWords: ['싸길래', '맛있어 보이길래', '한정판이길래'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '전화가', role: 'subject' },
          { text: '오길래', role: 'plain' },
          { text: '바로 받았어요', role: 'verb' },
        ],
        zh: '因为电话来了，就立刻接了。',
        swapWords: ['오길래', '울길래', '왔길래'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📰', context: '新闻报道', ko: '폭우로 인하여 도로 일부가 통제됐습니다.', zh: '由于暴雨，部分道路被封锁了。' },
      { icon: '🏥', context: '健康报告', ko: '과로로 인한 면역력 저하가 문제입니다.', zh: '由过劳引起的免疫力下降是个问题。' },
      { icon: '✈️', context: '航班延误', ko: '태풍으로 인하여 비행기가 결항됐습니다.', zh: '由于台风，飞机取消了。' },
      { icon: '🛒', context: '冲动消费', ko: '세일하길래 필요 없는 것도 샀어요.', zh: '因为打折，连不需要的东西也买了。' },
      { icon: '🔦', context: '灯亮进门', ko: '불이 켜져 있길래 노크했어요.', zh: '因为灯亮着，就敲了门。' },
      { icon: '🍽️', context: '点菜理由', ko: '맛있다고 하길래 저도 시켜 봤어요.', zh: '因为听说好吃，我也点了一份试试。' },
    ],
    mistakes: [
      { wrong: '태풍이로 인하여 결항됐습니다（명사 + 이로 인하여）', correct: '태풍으로 인하여 결항됐습니다', note: '태풍의 末字 풍은 받침 ㅇ → 으로 인하여。이로는 없는 형태，(으)로 인하여 앞에 이를 삽입하지 않는다。' },
      { wrong: '배고프길래 먹어라（길래 + 명령문）', correct: '배고프길래 뭔가 먹었어요', note: '-길래 뒤에는 명령문이나 청유문이 올 수 없다。뒤 절은 화자의 반응 행동（과거형/현재형）이어야 한다。' },
      { wrong: '사고로 인한 때문에 도로가 막혔어요（인한 + 때문에 중복）', correct: '사고로 인하여 도로가 막혔어요 또는 사고 때문에 도로가 막혔어요', note: '(으)로 인하여 와 때문에 는 같은 원인 기능이므로 동시에 쓰지 않는다。' },
      { wrong: '맛있어 보이길래서 시켰어요（길래 + 서 중복）', correct: '맛있어 보이길래 시켰어요', note: '-길래 는 접속어미로 뒤에 서를 붙이지 않는다。길래서는 없는 형태。' },
    ],
    quickTable: {
      title: '(으)로 인하여 接续形式',
      headers: ['명사 末음', '형태', '예시', '意味'],
      rows: [
        ['받침 O', '으로 인하여', '태풍으로 인하여', '由于台风'],
        ['받침 X/ㄹ', '로 인하여', '사고로 인하여', '由于事故'],
        ['관형사형', '(으)로 인한 + 명사', '사고로 인한 부상', '由于事故导致的伤害'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 인하여 / -길래',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '태풍___ 인하여 항공편이 결항됐습니다。（由于台风，航班取消了。）',
          options: ['으로', '이로', '으로의', '로의'],
          answer: 0 as 0|1|2|3,
          explanation: '태풍의 末字 풍은 받침 ㅇ → 받침 있음 → 으로 인하여。이로는 없는 형태，으로의/로의도 없는 형태。',
        },
        {
          prompt: '싸___ 두 개 샀어요。（因为便宜，买了两个。）',
          options: ['길래', '길래서', '기 때문에', '길래요'],
          answer: 0 as 0|1|2|3,
          explanation: '싸다 어간 싸（받침X）+ 길래 = 싸길래。-길래 는 구어체 직접 동기 표현。길래서는 없는 형태，기 때문에는 더 격식적 원인 표현。',
        },
        {
          prompt: '다음 중 (으)로 인한이 올바르게 쓰인 것은？',
          options: ['스트레스로 인한 두통', '스트레스로 인하여 두통', '스트레스로 인한 때문에 두통', '스트레스이로 인한 두통'],
          answer: 0 as 0|1|2|3,
          explanation: '(으)로 인한은 명사 수식 관형사형：스트레스로 인한 두통（由压力引起的头痛）。인하여 두통은 뒤에 명사만 올 수 없고，인한 때문에는 중복，이로 인한은 이 삽입 오류。',
        },
        {
          prompt: '불이 켜져 있___ 들어가 봤어요。（因为灯亮着，就进去看了看。）',
          options: ['길래', '길래서', '으므로', '길래요'],
          answer: 0 as 0|1|2|3,
          explanation: '켜져 있다 어간 있（받침 ㅅ, 有받침）이지만 -길래는 받침 유무와 무관하게 어간에 직접 접속：있길래。길래서는 없는 형태，으므로는 격식 문어체。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第7课</div>
    <div class="ov-hero-title">(으)로 인하여，(으)로 인한，-길래</div>
    <div class="ov-hero-sub">正式原因 · 名词修饰 · 口语动机</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">正式原因</div>
      <div class="ko">명사 + (으)로 인하여</div>
      <div class="zh">由于……（书面正式）</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词修饰</div>
      <div class="ko">명사 + (으)로 인한 + 명사</div>
      <div class="zh">由……引起的……</div>
    </div>
    <div class="ov-block">
      <div class="badge">口语动机</div>
      <div class="ko">어간 + 길래</div>
      <div class="zh">因为……所以……（直接动机）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">받침 O</span>：태풍<b style="color:#ff7fa8">으로 인하여</b> / 태풍<b style="color:#ff7fa8">으로 인한</b> 피해</div>
        <div><span style="font-weight:700">받침 X/ㄹ</span>：사고<b style="color:#ff7fa8">로 인하여</b> / 화재<b style="color:#ff7fa8">로 인한</b> 피해</div>
        <div><span style="font-weight:700">어간</span> + 길래：싸<b style="color:#ff7fa8">길래</b> / 오<b style="color:#ff7fa8">길래</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배고프길래 먹어라（길래 + 명령문）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배고프길래 먹었어요（반응 행동）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있어 보이길래서（길래 + 서）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있어 보이길래（길래서 없는 형태）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g36'],
  },

  // ── 第8课：-는/은/ㄴ 듯하다，-는/은/ㄴ/을 모양이다 ──────────────────────────────
  {
    id: 'card-p13-l08',
    partNumber: 13,
    lessonNumber: 8,
    title: '-는/은/ㄴ 듯하다，-는/은/ㄴ/을 모양이다',
    whatItDoes: '表示推测或判断（好像……/看来……）',
    whatItDoesBody: '-는/은/ㄴ 듯하다 表示根据某种迹象做出推测，相当于"好像……/似乎……"，语气较温和，也可用于比喻。\n-는/은/ㄴ/을 모양이다 表示根据观察到的状况推测某种情况，相当于"看来……/好像……"，比 듯하다 更强调外部迹象。',
    structureNote: '-는/은/ㄴ 듯하다：동사 현재형（-는 듯하다）/ 형용사（-은/ㄴ 듯하다）/ 과거（-은/ㄴ 듯하다）\n-는/은/ㄴ/을 모양이다：동사 현재（-는 모양이다）/ 과거（-은/ㄴ 모양이다）/ 미래（-을/ㄹ 모양이다）/ 형용사（-은/ㄴ 모양이다）',
    rulesNote: '-듯하다 는 추측 외에도 "마치 ~인 것처럼" 비유 표현에도 쓰인다（눈이 녹듯 사라졌어요）。\n-모양이다 는 눈에 보이는 상황이나 간접적 증거에 근거한 추측이며，듯하다 보다 추측의 근거가 더 외형적이다。',
    scenarioNote: '-듯하다 는 "피곤한 듯해요"처럼 상대방의 상태를 조심스럽게 추측할 때 쓰인다。\n-모양이다 는 "비가 올 모양이에요"처럼 날씨나 상황을 관찰하고 예측할 때 자주 쓰인다。',
    step0Html: `<div class="card-title">好像……看来……</div>
<div class="card-body">두 표현 모두 추측이지만 근거의 성격이 다릅니다。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">추측 두 가지 방식</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-듯하다 — 好像/似乎</div>
      <div style="font-size:16px;font-weight:800;color:#241917">피곤한 듯해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像很累的样子。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-모양이다 — 看来/好像</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올 모양이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">看来要下雨了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 듯하다 는 비유도 가능，모양이다 는 외부 증거 기반</div>
</div>
<div class="reminder-box">관형사형 접속에 주의：동사 현재는 -는，형용사는 -은/ㄴ。</div>`,
    compareHtml: `<div class="card-title">-듯하다 vs -모양이다 vs -(으)ㄹ 것 같다</div>
<div class="card-body">추측 표현 세 가지를 비교합니다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-듯하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">추측 + 비유 가능，주관적 인상</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">모르는 듯해요</span><span style="font-size:16px;color:#5a4640">好像不知道</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-모양이다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">외부 증거 기반 추측，객관적 관찰</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">늦을 모양이에요</span><span style="font-size:16px;color:#5a4640">看来要迟到了</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)ㄹ 것 같다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">가장 일반적 추측，구어에서 가장 흔함</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 올 것 같아요</span><span style="font-size:16px;color:#5a4640">好像要下雨了</span></div>
  </div>
</div>
<div class="reminder-box">세 표현은 교체 가능한 경우가 많지만，듯하다 는 비유，모양이다 는 외부 관찰에 더 특화。</div>`,
    compareLabel: '-듯하다 vs -모양이다 vs -(으)ㄹ 것 같다',
    structures: [
      {
        ko: '그 사람은 아무것도 모르는 듯해요',
        zh: '那个人好像什么都不知道。',
        tokens: [
          { text: '그 사람은', role: 'subject' },
          { text: '아무것도', role: 'object' },
          { text: '모르는 듯해요', role: 'verb' },
        ],
      },
      {
        ko: '얼굴이 많이 피곤한 듯해요',
        zh: '脸上好像很累的样子。',
        tokens: [
          { text: '얼굴이', role: 'subject' },
          { text: '많이', role: 'plain' },
          { text: '피곤한 듯해요', role: 'verb' },
        ],
      },
      {
        ko: '하늘을 보니 비가 올 모양이에요',
        zh: '看天空的样子，看来要下雨了。',
        tokens: [
          { text: '하늘을 보니', role: 'plain' },
          { text: '비가', role: 'subject' },
          { text: '올 모양이에요', role: 'verb' },
        ],
      },
      {
        ko: '아직 도착을 못 한 모양이에요',
        zh: '看来还没能到达。',
        tokens: [
          { text: '아직', role: 'plain' },
          { text: '도착을', role: 'object' },
          { text: '못 한 모양이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-듯하다 접속：동사 현재 관형사형 + 듯하다（먹는 듯하다），형용사 관형사형 + 듯하다（피곤한 듯하다），과거（먹은 듯하다）', examples: '모르는 듯하다 / 피곤한 듯하다 / 먹은 듯하다 / 떠난 듯하다' },
      { type: 'rule', text: '-모양이다 접속：동사 현재（-는 모양이다）/ 과거（-은/ㄴ 모양이다）/ 미래（-을/ㄹ 모양이다）/ 형용사（-은/ㄴ 모양이다）', examples: '오는 모양이다 / 간 모양이다 / 올 모양이다 / 바쁜 모양이다' },
      { type: 'usage', text: '-듯하다 의 비유 용법："마치 ~인 것처럼"의 의미로 쓰임（눈이 녹듯 사라졌어요）', examples: '꿈을 꾸는 듯한 풍경이에요 / 봄이 온 듯한 날씨네요' },
      { type: 'usage', text: '-모양이다 는 외부에서 관찰 가능한 근거가 있을 때 더 자연스럽다', examples: '구름이 많으니 비가 올 모양이에요 / 불이 꺼진 걸 보니 잔 모양이에요' },
      { type: 'note', text: '-듯하다 와 -모양이다 는 종결형에서 각각 -듯해요，-모양이에요 로 쓰인다', examples: '피곤한 듯해요 / 늦을 모양이에요' },
      { type: 'compare', text: '-듯하다 vs -(으)ㄹ 것 같다：두 표현은 교체 가능한 경우가 많지만，듯하다 는 비유에도 쓰임', examples: '모르는 듯해요 ↔ 모르는 것 같아요（교체 가능）/ 꿈을 꾸는 듯한（비유，것 같은 으로 교체 어색）' },
      { type: 'example', text: '모르는 듯해요 / 피곤한 듯해요 / 비가 올 모양이에요 / 아직 안 온 모양이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '많이', role: 'plain' },
          { text: '지친 듯해요', role: 'verb' },
        ],
        zh: '那个人好像很疲惫。',
        swapWords: ['지친 듯해요', '피곤한 듯해요', '힘든 듯해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭔가를', role: 'object' },
          { text: '숨기는', role: 'plain' },
          { text: '듯해요', role: 'verb' },
        ],
        zh: '好像在隐瞒什么。',
        swapWords: ['숨기는 듯해요', '모르는 듯해요', '피하는 듯해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '연락이 없는 걸 보니', role: 'plain' },
          { text: '바쁜', role: 'plain' },
          { text: '모양이에요', role: 'verb' },
        ],
        zh: '看没有联系的样子，看来是忙着呢。',
        swapWords: ['바쁜 모양이에요', '늦을 모양이에요', '힘든 모양이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '차가 없는 걸 보니', role: 'plain' },
          { text: '이미', role: 'plain' },
          { text: '간 모양이에요', role: 'verb' },
        ],
        zh: '看没有车，看来已经走了。',
        swapWords: ['간 모양이에요', '떠난 모양이에요', '나간 모양이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '看出疲劳', ko: '눈이 빨간 걸 보니 많이 피곤한 듯해요.', zh: '看眼睛红红的，好像很累。' },
      { icon: '🤔', context: '对方不知道', ko: '표정을 보니 잘 모르는 듯해요.', zh: '看表情，好像不太清楚。' },
      { icon: '🌧️', context: '预测下雨', ko: '구름이 많이 끼었으니 비가 올 모양이에요.', zh: '乌云很多，看来要下雨了。' },
      { icon: '📵', context: '对方忙碎', ko: '전화를 안 받는 걸 보니 바쁜 모양이에요.', zh: '看不接电话的样子，看来很忙。' },
      { icon: '🚗', context: '已经离开', ko: '차가 없는 걸 보니 먼저 간 모양이에요.', zh: '看没有车，看来先走了。' },
      { icon: '🌸', context: '春天来了', ko: '날씨가 봄이 온 듯한 느낌이에요.', zh: '天气有种春天来了的感觉。' },
    ],
    mistakes: [
      { wrong: '피곤하는 듯해요（형용사 + 는 듯하다）', correct: '피곤한 듯해요', note: '형용사 관형사형은 -는 이 아니라 -은/ㄴ 이다。피곤하다 → 피곤한 듯해요。동사에만 현재형 -는 을 쓴다。' },
      { wrong: '비가 올 모양이다（단독 종결 어색）', correct: '비가 올 모양이에요（구어 자연스러운 형태）', note: '모양이다 단독 종결은 구어에서 어색하다。구어에서는 모양이에요，격식에서는 모양입니다 가 자연스럽다。' },
      { wrong: '모르은 모양이에요（받침 없는 동사에 받침 있는 관형사형 어미 적용）', correct: '모르는 모양이에요', note: '모르다는 동사이며 현재 관형사형은 -는 이다。받침 유무와 관계없이 동사 현재형에는 -는 을 쓴다。받침 있는 형태인 -은 은 형용사나 동사 과거형에 사용한다。' },
      { wrong: '비가 오는 듯한 것 같아요（듯하다 + 것 같다 중복）', correct: '비가 오는 듯해요 또는 비가 올 것 같아요', note: '-듯하다 와 -것 같다 는 동일 기능의 추측 표현이므로 동시에 쓰지 않는다。' },
    ],
    quickTable: {
      title: '-듯하다 / -모양이다 관형사형 접속',
      headers: ['시제/품사', '듯하다 앞', '모양이다 앞', '예시'],
      rows: [
        ['동사 현재', '-는', '-는', '먹는 듯하다 / 오는 모양이다'],
        ['동사 과거', '-은/ㄴ', '-은/ㄴ', '먹은 듯하다 / 간 모양이다'],
        ['동사 미래', '(-을 듯하다 가능)', '-을/ㄹ', '올 듯하다 / 올 모양이다'],
        ['형용사', '-은/ㄴ', '-은/ㄴ', '피곤한 듯하다 / 바쁜 모양이다'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-듯하다 / -모양이다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '얼굴을 보니 많이 피곤___ 듯해요。（看脸色，好像很累。）',
          options: ['한', '하는', '했는', '하던'],
          answer: 0 as 0|1|2|3,
          explanation: '피곤하다는 형용사 → 관형사형 -은/ㄴ：피곤하+ㄴ = 피곤한 듯해요。형용사에 동사형 -는 을 쓰면 오류。',
        },
        {
          prompt: '전화를 안 받는 걸 보니 바쁜 ___。（看不接电话，看来很忙。）',
          options: ['모양이에요', '듯이에요', '모양해요', '듯모양이에요'],
          answer: 0 as 0|1|2|3,
          explanation: '-모양이다 종결형：모양이에요（구어）。듯이에요/모양해요/듯모양이에요는 없는 형태。',
        },
        {
          prompt: '비가 오___ 듯해요。（好像要下雨。）— 동사 현재 관형사형을 고르세요',
          options: ['오는', '온', '올', '왔는'],
          answer: 0 as 0|1|2|3,
          explanation: '오다（동사）현재 관형사형은 -는 이다：오는 듯해요（✓）。온 은 과거형（온 듯하다），올 은 미래형，왔는 은 비표준형이다。',
        },
        {
          prompt: '다음 중 -듯하다 가 올바르게 쓰인 것은？',
          options: ['모르는 듯해요', '피곤하는 듯해요', '먹를 듯해요', '가는듯이에요'],
          answer: 0 as 0|1|2|3,
          explanation: '모르다（동사）현재 관형사형：모르는 듯해요（✓）。피곤하는은 형용사에 동사형 어미 오류，먹를은 없는 형태，가는듯이에요는 없는 종결형。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第8课</div>
    <div class="ov-hero-title">-듯하다，-모양이다</div>
    <div class="ov-hero-sub">好像……/似乎 · 看来……/看起来</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">好像/似乎</div>
      <div class="ko">관형사형 + 듯하다</div>
      <div class="zh">好像……（추측+비유）</div>
    </div>
    <div class="ov-block">
      <div class="badge">看来</div>
      <div class="ko">관형사형 + 모양이다</div>
      <div class="zh">看来……（외부 관찰 기반）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">관형사형 접속</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">동사 현재</span>：모르<b style="color:#ff7fa8">는</b> 듯하다 / 오<b style="color:#ff7fa8">는</b> 모양이다</div>
        <div><span style="font-weight:700">동사 과거</span>：먹<b style="color:#ff7fa8">은</b> 듯하다 / 간 모양이다</div>
        <div><span style="font-weight:700">형용사</span>：피곤<b style="color:#ff7fa8">한</b> 듯하다 / 바쁜 모양이다</div>
        <div><span style="font-weight:700">미래</span>：비가 올 모양이다</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하는 듯해요（형용사 + 는）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤한 듯해요（형용사 + 은/ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오는 듯한 것 같아요（중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오는 듯해요 또는 올 것 같아요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g45'],
  },

  // ── 第9课：-을/ㄹ 텐데，-는/은/ㄴ/을 더러，보고 ───────────────────
  {
    id: 'card-p13-l09',
    partNumber: 13,
    lessonNumber: 9,
    title: '-을/ㄹ 텐데，더러/보고',
    whatItDoes: '推测前提下的期待/担忧，以及"叫某人/对某人"的表达',
    whatItDoesBody: '-을/ㄹ 텐데 在推测或预料某种状况的前提下，表达说话者的期待、担忧或遗憾，相当于"应该……/想必……（所以……）"。\n-더러/보고 均表示行为的对象，相当于"叫……/对……说"，主要用于命令、请求、传话等句子中。더러 比 보고 语气稍正式。',
    structureNote: '-을/ㄹ 텐데：동사/형용사 어간 + (으)ㄹ 텐데（有收音 + 을 텐데，无收音/ㄹ + ㄹ 텐데）\n더러/보고：명사（사람） + 더러/보고 + 동사（命令/请求句）',
    rulesNote: '-을/ㄹ 텐데 앞 주어는 화자 자신이거나 3인칭 모두 가능。뒤에는 부탁、우려、제안 등이 온다。\n더러/보고 의 앞에는 반드시 사람 명사가 와야 한다。사물이나 추상 명사는 쓸 수 없다。',
    scenarioNote: '-을/ㄹ 텐데 는 "피곤할 텐데 쉬세요"처럼 상대방 배려 표현에 자주 등장한다。\n더러/보고 는 전달 동사（말하다/시키다/부탁하다）와 함께 "누구보고 가라고 했어？"처럼 자주 쓰인다。',
    structures: [
      {
        ko: '동사/형용사 어간 + (으)ㄹ 텐데',
        tokens: [
          { text: '피곤', role: 'plain' },
          { text: '할', role: 'verb' },
          { text: ' 텐데', role: 'plain' },
          { text: ' 좀', role: 'plain' },
          { text: ' 쉬세요', role: 'verb' },
        ],
        zh: '应该很累，请休息一下吧。',
      },
      {
        ko: '을 텐데 (有收音)',
        tokens: [
          { text: '많이', role: 'plain' },
          { text: ' 먹었을', role: 'verb' },
          { text: ' 텐데', role: 'plain' },
          { text: ' 배부르겠다', role: 'verb' },
        ],
        zh: '应该吃了很多，想必很饱。',
      },
      {
        ko: '명사 + 더러',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: ' 나', role: 'object' },
          { text: '더러', role: 'plain' },
          { text: ' 발표하라고', role: 'verb' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '老师叫我去发表。',
      },
      {
        ko: '명사 + 보고',
        tokens: [
          { text: '친구', role: 'object' },
          { text: '보고', role: 'plain' },
          { text: ' 같이', role: 'plain' },
          { text: ' 가자고', role: 'verb' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '叫朋友一起去了。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '동사/형용사 有收音 어간 + 을 텐데', examples: '먹을 텐데，읽을 텐데，좋을 텐데' },
      { type: 'rule', text: '동사/형용사 无收音/ㄹ 어간 + ㄹ 텐데', examples: '가다→갈 텐데，오다→올 텐데，알다→알 텐데' },
      { type: 'note', text: '-을/ㄹ 텐데 뒤에는 부탁、우려、제안 표현이 따른다', examples: '바쁠 텐데 괜찮으세요？/ 힘들 텐데 도와드릴게요' },
      { type: 'compare', text: '-을/ㄹ 텐데 vs -겠지만：텐데는 화자의 추측+배려，겠지만은 양보（비록…하겠지만）' },
      { type: 'rule', text: '사람 명사 + 더러/보고 + 명령/청유 간접인용', examples: '동생더러 오라고 했어요 / 친구보고 기다리라고 했어요' },
      { type: 'compare', text: '더러 vs 보고：의미 동일，더러가 약간 격식체', examples: '어머니더러 말했어요（격식）/ 친구보고 말했어요（구어）' },
      { type: 'note', text: '더러/보고 앞에는 사람 명사만 가능，사물 명사 불가', examples: '책보고 읽으라고 했어요（✗） → 친구보고 읽으라고 했어요（✓）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '늦을', role: 'verb' },
          { text: ' 텐데', role: 'plain' },
          { text: ' 빨리', role: 'plain' },
          { text: ' 출발하세요', role: 'verb' },
        ],
        zh: '应该会晚，请快点出发吧。',
        swapWords: ['준비하세요', '서두르세요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '배가', role: 'subject' },
          { text: ' 고플', role: 'verb' },
          { text: ' 텐데', role: 'plain' },
          { text: ' 뭐라도', role: 'plain' },
          { text: ' 드세요', role: 'verb' },
        ],
        zh: '应该饿了，吃点什么吧。',
        swapWords: ['먹어요', '드시겠어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: ' 나더러', role: 'object' },
          { text: ' 설거지하라고', role: 'verb' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '妈妈叫我洗碗。',
        swapWords: ['청소하라고', '도와달라고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: ' 그 학생보고', role: 'object' },
          { text: ' 나가라고', role: 'verb' },
          { text: ' 하셨어요', role: 'verb' },
        ],
        zh: '老师叫那个学生出去。',
        swapWords: ['앉으라고', '조용히 하라고'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '朋友加班', ko: '많이 피곤할 텐데 오늘은 일찍 쉬어요.', zh: '应该很累，今天早点休息吧。' },
      { icon: '🌧️', context: '天气预报', ko: '비가 올 텐데 우산 챙기세요.', zh: '应该会下雨，带把伞吧。' },
      { icon: '📞', context: '传话', ko: '오빠한테 전화하라고 했는데 나더러 다시 하라고 했어요.', zh: '让哥哥打电话，他叫我再打一次。' },
      { icon: '👩‍🏫', context: '老师指示', ko: '선생님이 저더러 칠판에 쓰라고 하셨어요.', zh: '老师叫我在黑板上写。' },
      { icon: '🍽️', context: '客人来了', ko: '손님이 오실 텐데 음식 준비해야겠어요.', zh: '客人应该会来，得准备食物了。' },
      { icon: '😟', context: '担心朋友', ko: '힘들 텐데 제가 도와드릴게요.', zh: '应该很难，我来帮您吧。' },
    ],
    mistakes: [
      { wrong: '피곤을 텐데（명사 뒤 을 텐데）', correct: '피곤할 텐데', note: '피곤하다는 형용사이므로 어간 피곤하- 에 ㄹ 텐데를 붙인다：피곤할 텐데。명사에는 직접 을 텐데를 붙이지 않는다。' },
      { wrong: '갈 텐데요（단독 종결）', correct: '갈 텐데 조심하세요 등 후속절 필요', note: '-을/ㄹ 텐데 는 보통 단독 종결이 어색하다。뒤에 부탁/우려/제안 절이 이어져야 자연스럽다。' },
      { wrong: '책보고 읽으라고 했어요（사물 명사 + 보고）', correct: '동생보고 읽으라고 했어요', note: '더러/보고 는 사람 명사 뒤에만 쓸 수 있다。책、가방 등 사물에는 쓸 수 없다。' },
      { wrong: '친구더러게 말했어요（더러 + 에게 중복）', correct: '친구더러 말했어요 또는 친구에게 말했어요', note: '더러 와 에게 는 동일 기능의 조사이므로 중복 사용하지 않는다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 텐데，더러/보고',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오늘 많이 ___ 텐데 쉬세요。（今天应该很累，请休息。）',
          options: ['피곤할', '피곤을', '피곤하는', '피곤한'],
          answer: 0 as 0|1|2|3,
          explanation: '피곤하다（형용사）어간 피곤하- + ㄹ 텐데：피곤할 텐데（✓）。피곤을/피곤하는/피곤한 텐데는 모두 비문이다。',
        },
        {
          prompt: '비가 ___ 텐데 우산을 가져가세요。（应该会下雨，带把伞去吧。）',
          options: ['올', '오는', '온', '오을'],
          answer: 0 as 0|1|2|3,
          explanation: '오다（动词）无收音 어간 오- + ㄹ 텐데：올 텐데（✓）。오는 은 현재 관형사형，온 은 과거형，오을 은 없는 형태。',
        },
        {
          prompt: '선생님이 나___ 발표하라고 하셨어요。（老师叫我去发表。）',
          options: ['더러', '에서', '한테서', '로'],
          answer: 0 as 0|1|2|3,
          explanation: '더러 는 "叫某人（做某事）"의 행동 대상 조사。에서는 장소/출발점，한테서는 출발점，로는 방향/수단 조사로 이 문맥에 맞지 않는다。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['동생보고 기다리라고 했어요', '가방보고 들고 가라고 했어요', '날씨보고 좋아지라고 했어요', '책더러 읽으라고 했어요'],
          answer: 0 as 0|1|2|3,
          explanation: '보고/더러 는 사람 명사 뒤에만 쓴다。동생（사람）보고（✓）。가방/날씨/책은 모두 사물이므로 보고/더러 사용 불가。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第9课</div>
    <div class="ov-hero-title">-을/ㄹ 텐데，더러/보고</div>
    <div class="ov-hero-sub">推测+期待 · 叫某人做某事</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">推测+期待</div>
      <div class="ko">(으)ㄹ 텐데</div>
      <div class="zh">应该……/想必……（所以……）</div>
    </div>
    <div class="ov-block">
      <div class="badge">叫某人</div>
      <div class="ko">사람 + 더러/보고</div>
      <div class="zh">叫……/对……说（传话/命令对象）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">접속 형식</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">有收音</span>：먹<b style="color:#ff7fa8">을</b> 텐데，읽<b style="color:#ff7fa8">을</b> 텐데</div>
        <div><span style="font-weight:700">无收音/ㄹ</span>：가<b style="color:#ff7fa8">ㄹ</b> 텐데，알<b style="color:#ff7fa8">（ㄹ）</b> 텐데</div>
        <div><span style="font-weight:700">더러/보고</span>：나더러，친구보고（人名词后）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤을 텐데（명사 直接接）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤할 텐데（형용사 어간+ㄹ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">책보고 읽으라고（사물+보고）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구보고 읽으라고（사람+보고）</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">应该……/叫某人……</div>
<div class="card-body">推测别人的状况，体贴地说出关心；或者转述"叫谁去做什么"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种表达，各有场景</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을/ㄹ 텐데 — 推测+期待</div>
      <div style="font-size:16px;font-weight:800;color:#241917">피곤할 텐데 쉬세요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">应该很累，请休息。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">더러/보고 — 叫某人</div>
      <div style="font-size:16px;font-weight:800;color:#241917">엄마가 나더러 오라고 했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">妈妈叫我来。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 텐데 接형용사/동사 어간，더러/보고 只接人名词</div>
</div>
<div class="reminder-box">-을/ㄹ 텐데 后面要跟请求/担忧/建议句，不能单独结尾。</div>`,
    compareHtml: `<div class="card-title">-을/ㄹ 텐데 vs -겠지만 / 더러 vs 에게</div>
<div class="card-body">形似但用法不同的几组表达。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 텐데</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">推测+关心/期待，后接建议/担忧</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁠 텐데 도와드릴게요</span><span style="font-size:16px;color:#5a4640">应该很忙，我来帮您</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-겠지만</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">让步：虽然……但是……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">힘들겠지만 참으세요</span><span style="font-size:16px;color:#5a4640">虽然很难但请忍一下</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">더러/보고</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">命令/请求 行为对象，只接人</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">동생더러 가라고 했어요</span><span style="font-size:16px;color:#5a4640">叫弟弟去了</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">에게/한테</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">给予/告知 对象，人/动物均可</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구에게 편지를 썼어요</span><span style="font-size:16px;color:#5a4640">给朋友写了信</span></div>
  </div>
</div>`,
    compareLabel: '-을/ㄹ 텐데 vs -겠지만 / 더러 vs 에게',
    quickTable: {
      title: '-을/ㄹ 텐데 접속 / 더러·보고 비교',
      headers: ['구분', '형태', '예시'],
      rows: [
        ['有收音 어간', '+ 을 텐데', '먹을 텐데，읽을 텐데，좋을 텐데'],
        ['无收音/ㄹ 어간', '+ ㄹ 텐데', '갈 텐데，올 텐데，알 텐데'],
        ['더러（약간 격식）', '사람 + 더러', '나더러，학생더러，선생님더러'],
        ['보고（구어）', '사람 + 보고', '친구보고，동생보고，그 사람보고'],
      ],
    },
    linkedGrammarIds: ['g48', 'g8'],
  },

  // ── 第10课：-잖아요，-거든요 ────────────────────────────────────
  {
    id: 'card-p13-l10',
    partNumber: 13,
    lessonNumber: 10,
    title: '-잖아요，-거든요',
    whatItDoes: '确认共识，或补充说明理由',
    whatItDoesBody: '-잖아요 用于确认说话双方都知道的事实，带有"你不是知道吗/你看……不是……嘛"的语气，暗示听话人应该已经了解该信息。\n-거든요 用于补充说话人认为对方不知道的背景信息或理由，相当于"因为……（你可能不知道）/其实……"，语气比 -니까 更温和，有轻微说明/解释感。',
    structureNote: '-잖아요：동사/형용사/이다 어간 + 잖아요（현재），+ 았/었잖아요（과거）\n-거든요：동사/형용사/이다 어간 + 거든요（현재），+ 았/었거든요（과거）',
    rulesNote: '-잖아요 는 화자와 청자가 공유하는 정보에 대해 쓴다。청자가 전혀 모르는 정보에 쓰면 어색하다。\n-거든요 는 화자만 알고 있는 정보를 상대방에게 알려줄 때 쓴다。문장 끝에 단독으로 쓰이거나，이유절에서 쓰인다。',
    scenarioNote: '-잖아요 는 "그 사람 알잖아요！（你认识那个人的嘛！）"처럼 가벼운 항의나 환기에도 쓰인다。\n-거든요 는 "사실 저 한국 사람이거든요（其实我是韩国人）"처럼 새로운 배경 정보를 자연스럽게 도입할 때 자주 등장한다。',
    structures: [
      {
        ko: '동사/형용사 어간 + 잖아요',
        tokens: [
          { text: '그 영화', role: 'subject' },
          { text: ' 재미있잖아요', role: 'verb' },
        ],
        zh: '那部电影很有趣嘛（你知道的）。',
      },
      {
        ko: '과거 + 았/었잖아요',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: ' 말했잖아요', role: 'verb' },
        ],
        zh: '我说过嘛（你知道的）。',
      },
      {
        ko: '동사/형용사 어간 + 거든요',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: ' 좀', role: 'plain' },
          { text: ' 바쁘거든요', role: 'verb' },
        ],
        zh: '因为今天有点忙（你可能不知道）。',
      },
      {
        ko: '과거 + 았/었거든요',
        tokens: [
          { text: '사실', role: 'plain' },
          { text: ' 어제', role: 'time' },
          { text: ' 거기', role: 'place' },
          { text: ' 갔었거든요', role: 'verb' },
        ],
        zh: '其实昨天我去过那里（你不知道吧）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '동사/형용사 어간 + 잖아요（현재）', examples: '알잖아요，바쁘잖아요，좋잖아요' },
      { type: 'rule', text: '동사/형용사 어간 + 았/었잖아요（과거）', examples: '말했잖아요，갔잖아요，먹었잖아요' },
      { type: 'note', text: '-잖아요 는 화자·청자 공유 정보에만 사용，처음 만난 사람에게는 어색', examples: '"그 사람 알잖아요"→아는 사이일 때만 자연스럽다' },
      { type: 'rule', text: '동사/형용사 어간 + 거든요（현재）', examples: '바쁘거든요，한국 사람이거든요' },
      { type: 'rule', text: '동사/형용사 어간 + 았/었거든요（과거）', examples: '먹었거든요，갔었거든요，했거든요' },
      { type: 'compare', text: '-거든요 vs -니까：거든요는 새 정보 도입，니까는 직접적 이유 제시', examples: '늦었거든요（배경설명） vs 늦었으니까 빨리 가요（직접 이유）' },
      { type: 'note', text: '-거든요 단독 종결 시 설명/해명 뉘앙스', examples: '왜 안 왔어요？— 바빴거든요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람', role: 'object' },
          { text: ' 알잖아요', role: 'verb' },
          { text: ' 우리 반', role: 'plain' },
          { text: ' 친구잖아요', role: 'verb' },
        ],
        zh: '你认识那个人嘛，是我们班同学嘛。',
        swapWords: ['같은 회사잖아요', '아는 사이잖아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: ' 먼저', role: 'plain' },
          { text: ' 말했잖아요', role: 'verb' },
        ],
        zh: '我先说过嘛。',
        swapWords: ['알려줬잖아요', '설명했잖아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: ' 좀', role: 'plain' },
          { text: ' 피곤하거든요', role: 'verb' },
          { text: ' 일찍', role: 'plain' },
          { text: ' 자야 해요', role: 'verb' },
        ],
        zh: '今天有点累（你不知道），得早点睡。',
        swapWords: ['바쁘거든요', '아프거든요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '사실', role: 'plain' },
          { text: ' 저', role: 'subject' },
          { text: ' 한국어 공부한 지', role: 'plain' },
          { text: ' 3년이 됐거든요', role: 'verb' },
        ],
        zh: '其实我学韩语已经3年了（你可能不知道）。',
        swapWords: ['5년이 됐거든요', '2년이 됐거든요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😅', context: '提醒对方', ko: '내가 말했잖아요，조심하라고요.', zh: '我说过嘛，让你小心的。' },
      { icon: '🤷', context: '解释缺席', ko: '어제 못 갔거든요，일이 생겼어요.', zh: '昨天没去成，因为临时有事（你不知道）。' },
      { icon: '😤', context: '轻微抗议', ko: '그거 비싸잖아요，왜 또 샀어요？', zh: '那个不是很贵嘛，怎么又买了？' },
      { icon: '💡', context: '补充背景', ko: '사실 저 거기 살았거든요，그래서 잘 알아요.', zh: '其实我在那里住过，所以很熟。' },
      { icon: '🙋', context: '确认共识', ko: '한국어 어렵잖아요，그래도 재미있어요.', zh: '韩语不是挺难的嘛，不过还是有意思。' },
      { icon: '📖', context: '说明理由', ko: '지금 공부 중이거든요，나중에 얘기해요.', zh: '我现在在学习（你不知道），待会儿再聊吧。' },
    ],
    mistakes: [
      { wrong: '처음 만난 사람에게：그 노래 알잖아요（공유 정보 아님）', correct: '그 노래 아세요？', note: '-잖아요 는 청자가 이미 알고 있는 정보에만 쓴다。처음 만난 사람에게는 어색하다。모르는 정보라면 의문문을 쓰는 것이 자연스럽다。' },
      { wrong: '왜 늦었어요？— 바빴잖아요（청자가 모르는 상황）', correct: '바빴거든요', note: '청자가 모르는 이유를 설명할 때는 -거든요 를 쓴다。-잖아요 는 청자도 알고 있는 사실을 환기할 때 쓴다。' },
      { wrong: '피곤하거든요잖아요（거든요 + 잖아요 중복）', correct: '피곤하거든요 또는 피곤하잖아요', note: '-거든요 와 -잖아요 는 동시에 쓸 수 없다。두 어미는 서로 다른 정보 공유 상황에서 쓰인다。' },
      { wrong: '먹었잖아요（내가 먹은 사실을 상대가 모르는 상황）', correct: '먹었거든요', note: '상대방이 모르는 정보를 전달할 때는 -거든요 를 쓴다。-잖아요 는 함께 경험하거나 상대가 이미 알고 있을 때만 쓴다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-잖아요，-거든요',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '（两人都去过那里）거기 좋___ 우리 또 가요！（那里很好嘛，我们再去吧！）',
          options: ['잖아요', '거든요', '았거든요', '겠잖아요'],
          answer: 0 as 0|1|2|3,
          explanation: '두 사람 모두 아는 사실을 환기할 때는 -잖아요 를 쓴다：좋잖아요（✓）。-거든요 는 상대가 모르는 새 정보에 쓴다。',
        },
        {
          prompt: '왜 일찍 왔어요？— 오늘 약속이 있___ 일찍 왔어요。（因为今天有约，所以早来了。）',
          options: ['거든요', '잖아요', '는데요', '았잖아요'],
          answer: 0 as 0|1|2|3,
          explanation: '상대가 모르는 이유를 설명할 때는 -거든요：있거든요（✓）。-잖아요 는 공유 정보에만 쓴다。',
        },
        {
          prompt: '다음 중 -잖아요 를 올바르게 쓴 것은？',
          options: ['우리 같이 봤잖아요，기억 안 나요？', '사실 저 한국 사람잖아요（처음 만남）', '왜 안 왔어요？ — 바빴잖아요（상대가 모름）', '그 영화 좋잖아요（상대가 전혀 모름）'],
          answer: 0 as 0|1|2|3,
          explanation: '같이 봤잖아요：두 사람이 함께 경험한 공유 정보 → -잖아요（✓）。나머지는 모두 상대가 모르는 정보에 -잖아요 를 쓴 오류。',
        },
        {
          prompt: '사실 저 요즘 한국어 배우고 있___ 그래서 잘 알아요。（其实我最近在学韩语，所以很了解。）',
          options: ['거든요', '잖아요', '는데잖아요', '았잖아요'],
          answer: 0 as 0|1|2|3,
          explanation: '상대가 모르는 배경 정보（사실…）를 도입할 때는 -거든요：배우고 있거든요（✓）。-잖아요 는 공유 정보 환기에만 쓴다。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P13 · 第10课</div>
    <div class="ov-hero-title">-잖아요，-거든요</div>
    <div class="ov-hero-sub">你知道的嘛 · 其实是这样（你不知道）</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">你知道的嘛</div>
      <div class="ko">어간 + 잖아요</div>
      <div class="zh">确认共识（双方都知道的事）</div>
    </div>
    <div class="ov-block">
      <div class="badge">其实是这样</div>
      <div class="ko">어간 + 거든요</div>
      <div class="zh">补充说明（对方不知道的背景）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">핵심 구별법</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">잖아요</span>：청자도 이미 아는 정보 → <b style="color:#ff7fa8">공유 정보 환기</b></div>
        <div><span style="font-weight:700">거든요</span>：청자가 모르는 정보 → <b style="color:#ff7fa8">새 정보 도입</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">처음 만난 사람에게：알잖아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아세요？（不能用잖아요）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">이유 설명：바빴잖아요（상대 모름）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">바빴거든요</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">你知道的嘛 / 其实是这样</div>
<div class="card-body">两个结尾都很口语化，但用的场合完全不同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">关键区别：听者知不知道</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-잖아요 — 对方知道</div>
      <div style="font-size:16px;font-weight:800;color:#241917">그 영화 재미있잖아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那部电影很有趣嘛（你知道的）。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-거든요 — 对方不知道</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사실 저 한국 사람이거든요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">其实我是韩国人（你不知道）。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 用错了会让对方觉得奇怪，先记住"对方知不知道"这个判断标准</div>
</div>
<div class="reminder-box">잖아요 = 共享信息确认；거든요 = 新背景信息补充。</div>`,
    compareHtml: `<div class="card-title">-잖아요 vs -거든요 vs -니까</div>
<div class="card-body">三个都能表示原因/说明，用法有区别。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-잖아요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">확인/환기：双方都知道，说话人提醒</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘잖아요，그러니까요</span><span style="font-size:16px;color:#5a4640">不是挺忙的嘛</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-거든요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">설명/도입：对方不知道，说话人说明</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘거든요，그래서 못 가요</span><span style="font-size:16px;color:#5a4640">因为我很忙（你不知道）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-니까</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">직접 이유 제시，명령/청유문에 자주 사용</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘니까 나중에 얘기해요</span><span style="font-size:16px;color:#5a4640">因为忙，之后再说吧</span></div>
  </div>
</div>`,
    compareLabel: '-잖아요 vs -거든요 vs -니까',
    quickTable: {
      title: '-잖아요 / -거든요 비교',
      headers: ['어미', '사용 조건', '뉘앙스', '예시'],
      rows: [
        ['-잖아요', '공유 정보', '확인·환기', '알잖아요，바쁘잖아요'],
        ['-았/었잖아요', '공유 과거 정보', '과거 확인', '말했잖아요，갔잖아요'],
        ['-거든요', '새 정보', '설명·도입', '바쁘거든요，한국 사람이거든요'],
        ['-았/었거든요', '새 과거 정보', '과거 설명', '먹었거든요，갔었거든요'],
      ],
    },
    linkedGrammarIds: ['g18', 'g19'],
  },

  // ── 综合练习① ────────────────────────────────────────────────
  {
    id: 'card-p13-l11',
    isPractice: true,
    partNumber: 13,
    lessonNumber: 11,
    title: 'P13 综合练习①',
    whatItDoes: 'P13 第1～5课 综합练习',
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
    <div class="ov-hero-label">P13 · 综合练习①</div>
    <div class="ov-hero-title">第1～5课 복습</div>
    <div class="ov-hero-sub">(으)로 해서 · -는 길에 · 만큼/정도로 · -도록 · -(으)ㄹ수록 · -테요/-던데요/-더라</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P13 第1～5课 综합',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '교통사고___ 해서 길이 막혔어요。（因为交通事故堵车了。）',
          options: ['로', '으로', '가', '를'],
          answer: 0 as 0|1|2|3,
          explanation: '교통사고（받침X）→ 로 해서（✓）。받침 있는 명사에는 으로 해서，받침 없거나 ㄹ받침이면 로 해서。',
        },
        {
          prompt: '집에 오는 ___ 편의점에 들렀어요。（回家路上顺便去了便利店。）',
          options: ['길에', '때에', '중에', '사이에'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 길에：이동동사 관형사형 + 길에，오는 길에（✓）。때에/중에/사이에는 의미가 다르다。',
        },
        {
          prompt: '열심히 할___ 실력이 늘어요。（越努力，实力越提高。）',
          options: ['수록', '만큼', '정도로', '도록'],
          answer: 0 as 0|1|2|3,
          explanation: '-(으)ㄹ수록：할수록（✓）。만큼/정도로는 비례 정도，도록은 목적/한계，수록이 "越……越……"를 나타낸다。',
        },
        {
          prompt: '목이 아프___ 노래를 불렀어요。（唱歌唱到嗓子痛。）',
          options: ['도록', '만큼', '수록', '길에'],
          answer: 0 as 0|1|2|3,
          explanation: '-도록：한계/정도 표현，목이 아프도록（✓）。만큼은 비례，수록은 "越……越……"，길에는 이동 경로。',
        },
        {
          prompt: '오늘 날씨가 정말 좋___！（今天天气真好呢！—说话人当下感叹）',
          options: ['던데요', '더라', '테요', '았더니'],
          answer: 1 as 0|1|2|3,
          explanation: '-더라：화자의 새로운 감탄/발견（혼잣말 또는 가벼운 감탄）。-던데요는 청자에게 전달，-테요는 추측，-았더니는 과거 행동 후 결과。',
        },
        {
          prompt: '어제 갔더니 문이 ___ 있었어요。（昨天去了，发现门关着。）',
          options: ['닫혀', '닫히는', '닫힌다', '닫힐'],
          answer: 0 as 0|1|2|3,
          explanation: '-았더니 뒤에는 발견한 상황을 서술한다：닫혀 있었어요（✓）。닫히는/닫힌다/닫힐은 이 문맥에 맞지 않는다。',
        },
      ],
    },
  },

  // ── 综合练习② ────────────────────────────────────────────────
  {
    id: 'card-p13-l12',
    isPractice: true,
    partNumber: 13,
    lessonNumber: 12,
    title: 'P13 综合练习②',
    whatItDoes: 'P13 第6～10课 综합练习',
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
    <div class="ov-hero-label">P13 · 综合练习②</div>
    <div class="ov-hero-title">第6～10课 복습</div>
    <div class="ov-hero-sub">-았더니/-더니 · (으)로 인하여/-길래 · -듯하다/-모양이다 · -을/ㄹ 텐데 · -잖아요/-거든요</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P13 第6～10课 综합',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '태풍___ 인하여 행사가 취소됐어요。（因台风，活动取消了。）',
          options: ['으로', '로', '이', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '태풍의 마지막 글자 풍은 받침 ㅇ이 있다（有收音）→ 으로 인하여（✓）。받침 없는 명사나 ㄹ받침이면 로 인하여를 쓴다。',
        },
        {
          prompt: '비가 오___ 우산을 샀어요。（因为下雨，买了雨伞。）',
          options: ['길래', '도록', '더니', '았더니'],
          answer: 0 as 0|1|2|3,
          explanation: '-길래：화자가 관찰한 상황을 이유로 즉각 행동：오길래（✓）。도록은 한계/목적，더니/았더니는 다른 결과/발견 표현。',
        },
        {
          prompt: '얼굴을 보니 많이 피곤___ 듯해요。（看脸色好像很累。）',
          options: ['한', '하는', '했는', '할'],
          answer: 0 as 0|1|2|3,
          explanation: '피곤하다（형용사）관형사형：피곤한 듯해요（✓）。형용사 현재 관형사형은 -은/ㄴ，동사에만 -는 을 쓴다。',
        },
        {
          prompt: '손님이 오실 ___ 음식 준비해야겠어요。（客人应该会来，得准备食物。）',
          options: ['텐데', '거든요', '잖아요', '더니'],
          answer: 0 as 0|1|2|3,
          explanation: '-을/ㄹ 텐데：추측 전제 + 뒤에 제안/우려：오실 텐데（✓）。거든요는 새 정보，잖아요는 공유 정보，더니는 순차/대조。',
        },
        {
          prompt: '그 영화 재미있___ 우리 또 봐요！（那部电影很有趣嘛，我们再看吧！—双方都看过）',
          options: ['잖아요', '거든요', '더라', '았더니'],
          answer: 0 as 0|1|2|3,
          explanation: '-잖아요：두 사람이 함께 본 공유 경험 환기：재미있잖아요（✓）。거든요는 새 정보，더라는 감탄，았더니는 행동 후 결과。',
        },
        {
          prompt: '사실 저 거기 살았___ 그래서 잘 알아요。（其实我在那里住过，所以很熟。）',
          options: ['거든요', '잖아요', '더니', '도록'],
          answer: 0 as 0|1|2|3,
          explanation: '-거든요：상대가 모르는 배경 정보（사실…）도입：살았거든요（✓）。잖아요는 공유 정보，더니/도록은 다른 용법。',
        },
      ],
    },
  },
];
