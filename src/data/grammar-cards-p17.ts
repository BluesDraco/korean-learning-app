import type { GrammarCard } from '@/types';

export const grammarCardsP17: GrammarCard[] = [
  {
    id: 'card-p17-l01',
    partNumber: 17,
    lessonNumber: 1,
    title: '(으)로 해서，-는 길에',
    whatItDoes: '说明原因/手段，或顺路做某事',
    whatItDoesBody: '(으)로 해서 表示原因或手段，相当于"因为……/由于……/通过……"，书面和口语均可用，语气比 -기 때문에 更正式。\n-는 길에 表示在去某地或回来的途中顺便做某事，相当于"在……的路上/顺路……"，只能接移动动词（가다/오다/다니다 等）。',
    structureNote: '(으)로 해서：名词 + (으)로 해서（有收音 + 으로 해서，无收音/ㄹ + 로 해서）\n-는 길에：가는 길에 / 오는 길에 / 퇴근하는 길에 等，动词 冠词形 + 길에',
    rulesNote: '(으)로 해서 의 前面는 원인이나 수단이 되는 名词가 온다。书面体에서 经常 使用且 -로 인해서 와 可替换。\n-는 길에 는 移动 动词（가다/오다/다니다）의 冠词形 后面만 붙는다。瞬间적 이동이 아닌 持续的 移动 과정임을 나타낸다。',
    scenarioNote: '(으)로 해서 는 常出现在事故经过说明、报告书、新闻等正式场合。\n-는 길에 는 在日常对话中如"오는 길에 뭐 사 왔어？"般，自然使用。',
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
<div class="reminder-box">(으)로 해서 前接名词，-는 길에 前只接移动动词的冠词形。</div>`,
    compareHtml: `<div class="card-title">(으)로 해서 vs -때문에 vs -는 길에</div>
<div class="card-body">同样表示原因，(으)로 해서 和 -때문에 有什么区别？-는 길에 又是完全不同的用法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">(으)로 해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 뒤，书面语较多，表原因/手段</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">부주의로 해서 사고가 났어요</span><span style="font-size:16px;color:#5a4640">因疏忽发生了事故</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 때문에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动/형 뒤，口语书面均常用，表原因</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오기 때문에 못 나가요</span><span style="font-size:16px;color:#5a4640">因为下雨不能出去</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 길에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">移动动词 冠词形 뒤，表顺路</div>
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
      { type: 'rule', text: '-는 길에：가다/오다/다니다 등 移动动词的现在冠词形 + 길에', examples: '가는 길에 / 오는 길에 / 출근하는 길에 / 퇴근하는 길에 / 학교에 다니는 길에' },
      { type: 'usage', text: '(으)로 해서 는 名词 后面만 붙으므로，동사를 쓰려면 -기로 해서 등으로 변환 필요', examples: '그 문제로 해서 회의가 길어졌어요 / 실수로 해서 파일을 지웠어요' },
      { type: 'usage', text: '-는 길에 는 目的지로 移动 중 중간에 不同的 행동을 함을 나타냄', examples: '마트에 가는 길에 약국에 들렀어요 / 친구 집에 오는 길에 꽃을 샀어요' },
      { type: 'note', text: '-는 길에 는 가다/오다의 过去형 冠词形은 쓰지 않음（간 길에×，온 길에×）', examples: '가는 길에（✓）/ 간 길에（✗）' },
      { type: 'compare', text: '(으)로 해서 vs (으)로 인해서：두 表达은 几乎 같으며 可替换，-로 인해서 가 더 正式적', examples: '태풍으로 해서 / 태풍으로 인해서 — 含义 동일' },
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
      { wrong: '비가 오로 해서 못 나가요（动词 + 로 해서）', correct: '비로 해서 못 나가요 또는 비가 오기 때문에 못 나가요', note: '(으)로 해서 前面는 명사만 올 수 있다。동사를 原因으로 쓰려면 -기 때문에 使用。' },
      { wrong: '집에 간 길에 편의점에 들렀어요（过去 冠词形 + 길에）', correct: '집에 가는 길에 편의점에 들렀어요', note: '-는 길에 는 现在 冠词形（가는/오는）만 可能，过去형 간/온 은 쓸 수 없다。' },
      { wrong: '학교로 해서 친구를 사귀었어요（地点 + 로 해서）', correct: '학교에서 친구를 사귀었어요 또는 학교를 통해서 친구를 사귀었어요', note: '(으)로 해서 는 원인이나 수단을 나타내는 名词 后面 써야 자연。단순 地点에는 부자연스럽다。' },
      { wrong: '오는 길에 비가 왔어요（移动 주체와 무관한 사건）', correct: '오는 길에 비를 맞았어요', note: '-는 길에 后面는 移动 주체가 直接 한 행동이 와야 自然。自然 现象 서술에는 부적절。' },
    ],
    quickTable: {
      title: '(으)로 해서 接续形式',
      headers: ['名词末音', '形式', '例句', '意思'],
      rows: [
        ['有收音（收音 O）', '으로 해서', '인터넷으로 해서', '通过网络'],
        ['无收音（收音 X）', '로 해서', '사고로 해서', '因为事故'],
        ['ㄹ收音', '로 해서', '불로 해서', '因为火'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 해서 / -는 길에',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '폭설___ 기차가 연착됐어요。（因大雪，火车晚点了。）',
          options: ['로 해서', '에서', '이기 때문에', '으로 해서'],
          answer: 0 as 0|1|2|3,
          explanation: '폭설 末字 설은 ㄹ收音 → ㄹ收音은 로 해서。폭설로 해서 기차가 연착됐어요。',
        },
        {
          prompt: '회사에 ___ 길에 우체국에 들렀어요。（去公司路上顺便去了邮局。）',
          options: ['가서', '간', '가는', '가는 것'],
          answer: 2 as 0|1|2|3,
          explanation: '-는 길에 前面는 移动动词的现在冠词形（가는）이 와야 한다。',
        },
        {
          prompt: '다음 중 (으)로 해서의 올바른 使用은？',
          options: ['학교로 해서 만났어요', '사고로 해서 늦었어요', '가는로 해서 샀어요', '비가 와로 해서 못 가요'],
          answer: 1 as 0|1|2|3,
          explanation: '(으)로 해서 前面는 原因 名词가 와야 한다。사고（名词）+ 로 해서 가 올바른 形式。',
        },
        {
          prompt: '친구 집에 ___ 길에 꽃을 샀어요。（去朋友家的路上买了花。）',
          options: ['가고', '가는 것', '갔는', '가는'],
          answer: 3 as 0|1|2|3,
          explanation: '-는 길에 前面는 现在 冠词形 가는 이 온다。',
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
      <div class="ko">名词 + (으)로 해서</div>
      <div class="zh">因为……/通过……</div>
    </div>
    <div class="ov-block">
      <div class="badge">顺路途中</div>
      <div class="ko">移动动词 冠词形 + -는 길에</div>
      <div class="zh">在……的路上</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">有收音</span> + 으로 해서：인터넷<b style="color:#ff7fa8">으로 해서</b></div>
        <div><span style="font-weight:700">无收音/ㄹ</span> + 로 해서：사고<b style="color:#ff7fa8">로 해서</b> / 불<b style="color:#ff7fa8">로 해서</b></div>
        <div><span style="font-weight:700">移动动词 现在형</span> + 길에：가<b style="color:#ff7fa8">는 길에</b> / 오<b style="color:#ff7fa8">는 길에</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 와로 해서（动词 + 로 해서）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비로 해서 / 비 때문에</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">간 길에（过去형 + 길에）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가는 길에（现在 冠词形）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g9', 'g77'],
  },

  {
    id: 'card-p17-l02',
    partNumber: 17,
    lessonNumber: 2,
    title: '-을/를 만큼，-을/를 정도로',
    whatItDoes: '表示程度相当或达到某种程度',
    whatItDoesBody: '-을/를 만큼 表示程度相当，相当于"像……那样多/那种程度"，可接名词或动词冠词形。\n-을/를 정도로 表示达到某种程度，相当于"到……的程度"，强调程度之深，常用于夸张或说明极端情况。',
    structureNote: '-을/를 만큼：名词 + 만큼（直接 接续）/ 动词·形容词 冠词形 + 만큼\n-을/를 정도로：名词 + 정도로 / 动词·形容词 冠词形 + 정도로',
    rulesNote: '-만큼 은 비교 기준을 나타낼 때도 使用且（키가 나만큼 커요），表达程度时 冠词形 + 만큼 形式被广泛使用。\n-정도로 는 常用于强调极端程度，后面的谓语表示与该程度相应的结果。',
    scenarioNote: '-만큼 은 "그 정도만큼 해줘" 般，在日常对话中自然使用。\n-정도로 는 "죽을 정도로 힘들었어" 般，表达极端状态时常出现。',
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
<div class="reminder-box">-만큼 和 -정도로 前都可接名词或冠词形，但语气略有差异。</div>`,
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
      { type: 'rule', text: '-만큼：名词 + 만큼（나만큼/너만큼），动词·形容词 冠词形 + 만큼（죽을 만큼/힘들 만큼）', examples: '나만큼 / 산만큼 / 죽을 만큼 / 먹을 만큼' },
      { type: 'rule', text: '-정도로：名词 + 정도로（눈물 정도로），冠词形 + 정도로（죽을 정도로/쓰러질 정도로）', examples: '쓰러질 정도로 / 눈물이 날 정도로 / 포기할 정도로' },
      { type: 'usage', text: '-만큼 은 비교 기준（A는 B만큼 크다）과 정도 强调（죽을 만큼 힘들다）这两种用法都使用', examples: '키가 형만큼 커요（比较） / 죽을 만큼 힘들어요（程度强调）' },
      { type: 'usage', text: '-정도로 는 后面 结果·상태 谓语가 오며，정도가 심함을 나타냄。否定 맥락에서도 经常 用法', examples: '눈물이 날 정도로 감동적이에요 / 쓰러질 정도로 피곤해요' },
      { type: 'note', text: '-만큼 과 -정도로 는 可替换한 경우가 많으나，-정도로 는 极端 情境 强调에 더 적합', examples: '죽을 만큼 힘들다 ↔ 죽을 정도로 힘들다（含义 유사）' },
      { type: 'compare', text: '-처럼 vs -만큼：-처럼 表示外形/性质相似，-만큼 表示数量/程度基准', examples: '천사처럼 착해요（性质相似） / 천사만큼 착해요（程度相当）' },
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
      { wrong: '죽을 만큼 힘드는 하루예요（만큼 前接现在进行형）', correct: '죽을 만큼 힘든 하루예요', note: '冠词形 + 만큼 에서 形容词 冠词形은 힘드는이 아니라 힘든이다。형용사는 现在 冠词形이 -은/ㄴ 形式。' },
      { wrong: '그만큼을 노력했어요（만큼 + 을 이중 조사）', correct: '그만큼 노력했어요', note: '-만큼 자체가 조关系므로 后面 을/를을 다시 붙이지 않는다。' },
      { wrong: '정도로 힘들어요（앞 성분 없이 단독 使用）', correct: '쓰러질 정도로 힘들어요', note: '-정도로 前面는 구체적 정도 기준이 되는 冠词形이나 名词가 와야 한다。단독으로 쓰면 病句。' },
      { wrong: '눈물이 날 정도가 감동적이에요（정도로 → 정도가）', correct: '눈물이 날 정도로 감동적이에요', note: '여기서는 정도의 부사어 역할을 위해 정도로（로 조사）가 필요하다。정도가는 主语 역할이 되어 句子이 맞지 않는다。' },
    ],
    quickTable: {
      title: '-만큼 / -정도로 接续形式',
      headers: ['前接成分', '形式', '例句', '意思'],
      rows: [
        ['名词', '名词 + 만큼', '나만큼 / 산만큼', '像我那样 / 像山那样'],
        ['动词/形容词', '冠词形 + 만큼', '죽을 만큼 / 힘들 만큼', '到要死的程度 / 到很累的程度'],
        ['名词', '名词 + 정도로', '눈물 정도로', '到流泪的程度'],
        ['动词/形容词', '冠词形 + 정도로', '쓰러질 정도로', '到要倒下的程度'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-만큼 / -정도로',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '배가 터질 ___ 많이 먹었어요。（吃了多到肚子要撑破的量。）',
          options: ['처럼', '만큼', '만큼을', '정도가'],
          answer: 1 as 0|1|2|3,
          explanation: '冠词形 터질 后面 만큼이 接续되어 程度를 나타낸다。만큼을이라고 하면 조사 중복，정도가는 主语 역할이 되어 부적절。',
        },
        {
          prompt: '쓰러질 ___ 피곤한 하루였어요。（是累到要倒下程度的一天。）',
          options: ['정도가', '처럼', '만큼을', '정도로'],
          answer: 3 as 0|1|2|3,
          explanation: '쓰러질 정도로：冠词形 + 정도로，极端程度强调。정도가는 主语 역할이 되어 句子이 성립하지 않는다。',
        },
        {
          prompt: '그 선수___ 빨리 달리고 싶어요。（想跑得像那位选手那样快。）',
          options: ['만큼을', '처럼이', '만큼', '정도로'],
          answer: 2 as 0|1|2|3,
          explanation: '名词 그 선수 后面 만큼이 接续하여 비교 기준을 나타낸다。그 선수만큼 빨리 不同다。',
        },
        {
          prompt: '눈물이 날 ___ 감동적이었어요。（感动到要流眼泪的程度。）',
          options: ['정도로', '정도가', '처럼', '만큼을'],
          answer: 0 as 0|1|2|3,
          explanation: '날 정도로：冠词形 + 정도로，强调 表达。정도가 处于主语位置不合适，"처럼"是外形相似的表达，语境不一致。',
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
      <div class="ko">名词/冠词形 + 만큼</div>
      <div class="zh">像……那样多/那种程度</div>
    </div>
    <div class="ov-block">
      <div class="badge">达到某程度</div>
      <div class="ko">名词/冠词形 + 정도로</div>
      <div class="zh">到……的程度</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">名词</span> + 만큼：나<b style="color:#ff7fa8">만큼</b> / 산<b style="color:#ff7fa8">만큼</b></div>
        <div><span style="font-weight:700">冠词形</span> + 만큼：죽을<b style="color:#ff7fa8"> 만큼</b></div>
        <div><span style="font-weight:700">冠词形</span> + 정도로：쓰러질<b style="color:#ff7fa8"> 정도로</b></div>
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

  {
    id: 'card-p17-l03',
    partNumber: 17,
    lessonNumber: 3,
    title: '-도록，-을/를 수 있게，-게 하기 위하여',
    whatItDoes: '表示目的或使某事成为可能',
    whatItDoesBody: '-도록 表示目的或程度，相当于"为了……/直到……"，连接前后两个动作，前句是目的/标准，后句是行为。\n-을/를 수 있게 表示"使得能够……"，强调创造条件让某事成为可能。\n-게 하기 위하여 表示"为了……"，比 -도록 更正式，书面语常用。',
    structureNote: '-도록：动词 词干 + 도록（收音 유무 무관）\n-을/를 수 있게：动词 词干 + (을/ㄹ) 수 있게\n-게 하기 위하여：动词 词干 + 게 하기 위하여（위해서도 可能）',
    rulesNote: '-도록 은 目的（~하도록 노력하다）과 정도（밤새도록 공부하다）有两种意思使用。\n-을/를 수 있게 는 수 있다（能力/可能）에 接接续词尾 -게 的形式，表示让对方或情境变得可能的语气较强。\n-게 하기 위하여 는 -도록 보다 正式이며，目的的意图性。也可换用 위해서。',
    scenarioNote: '-도록 은 在日常口语中 "늦지 않도록 서둘러!"처럼，常用于指示或劝告。\n-을 수 있게 는 "볼 수 있게 자리를 양보해 줬어요"처럼，常出现在体谅或提供条件的情境中。\n-게 하기 위하여 는 在报告·公文·新闻中 "이해할 수 있게 하기 위하여 예시를 추가했습니다"처럼使用。',
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
<div class="reminder-box">-도록 前接动词词干，无需考虑收音。</div>`,
    compareHtml: `<div class="card-title">-도록 vs -기 위해서 vs -을 수 있게</div>
<div class="card-body">同样表示目的，三者语气和用法如何区分？</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-도록</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">目的/정도，口语自然，可跟人称无关的目的</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">건강하도록 운동하세요</span><span style="font-size:16px;color:#5a4640">为了健康，请运动</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 위해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">目的，前后主语相同时自然，书面口语均可</div>
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
      { type: 'rule', text: '-도록：动词 词干 + 도록（收音 유무 무관）', examples: '늦다→늦도록 / 먹다→먹도록 / 자다→자도록 / 공부하다→공부하도록' },
      { type: 'rule', text: '-을 수 있게：动词 词干 + (을/ㄹ) 수 있게（收音 있으면 을, 없으면/ㄹ이면 ㄹ）', examples: '먹을 수 있게 / 볼 수 있게 / 들을 수 있게 / 이해할 수 있게' },
      { type: 'rule', text: '-게 하기 위하여：动词 词干 + 게 하기 위하여（위해서 로도 可替换）', examples: '이해할 수 있게 하기 위하여 / 참여할 수 있게 하기 위해서' },
      { type: 'usage', text: '-도록 의 두 가지 용법：① 目的（늦지 않도록 서둘러요）② 정도（밤새도록 공부해요）', examples: '성공하도록 노력해요（目的） / 목이 쉬도록 노래했어요（정도）' },
      { type: 'note', text: '-도록 前面 否定형이 오면 "~하지 않도록"：늦지 않도록 / 실수하지 않도록', examples: '실수하지 않도록 조심하세요 / 다치지 않도록 조심하세요' },
      { type: 'compare', text: '-도록 vs -기 위해서：전후 主语가 다를 때는 -도록이 自然스럽고，같을 때는 -기 위해서도 自然', examples: '제가 볼 수 있도록 비켜 주세요（主语 다름） / 합격하기 위해서 공부해요（主语 같음）' },
      { type: 'example', text: '늦지 않도록 서둘러요 / 볼 수 있게 자리를 양보했어요 / 이해할 수 있게 하기 위하여 설명을 追加했어요' },
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
      { icon: '🎤', context: '让人听清', ko: '뒤에 있는 사람도 들을 수 있게 마이크를 켰어요.', zh: '为了后面的人也能听到，打开了麦克风。' },
      { icon: '📋', context: '正式通知', ko: '모두가 참여할 수 있게 하기 위하여 공지를 올렸습니다.', zh: '为了让所有人都能参与，发布了公告。' },
      { icon: '🏥', context: '健康叮嘱', ko: '건강을 잃지 않도록 잘 쉬세요.', zh: '为了不失去健康，请好好休息。' },
      { icon: '📖', context: '教学说明', ko: '학생들이 이해할 수 있게 천천히 설명했어요.', zh: '为了学生们能理解，慢慢说明了。' },
    ],
    mistakes: [
      { wrong: '늦으도록 서둘러요（-도록 前面 으 삽입）', correct: '늦도록 서둘러요 또는 늦지 않도록 서둘러요', note: '-도록 은 动词 词干에 直接 붙으며 으를 삽입하지 않는다。늦다 词干 늦 + 도록 = 늦도록。' },
      { wrong: '볼 수 있게로 설명했어요（수 있게 + 로 조사 중복）', correct: '볼 수 있게 설명했어요', note: '-을 수 있게 자체가 부사절이므로 后面 조사를 다시 붙이지 않는다。' },
      { wrong: '공부하기 위하여도록 노력했어요（위하여 + 도록 중복）', correct: '공부하기 위하여 노력했어요 또는 공부하도록 노력했어요', note: '-기 위하여 와 -도록 은 相同的 자리에서 使用的 目的 表达이므로 同时 쓰지 않는다。' },
      { wrong: '이해할 수 있게 하기 위하여을 설명했어요（위하여 + 을 조사）', correct: '이해할 수 있게 하기 위하여 설명했어요', note: '-게 하기 위하여 는 부사절로 기능하므로 后面 目的격 조사 을/를을 붙이지 않는다。' },
    ],
    quickTable: {
      title: '-도록 / -을 수 있게 / -게 하기 위하여 接续',
      headers: ['表达', '接续 形式', '例句', '语气'],
      rows: [
        ['-도록', '动词 词干 + 도록', '늦도록 / 먹도록', '目的·정도，口语自然'],
        ['-을 수 있게', '词干 + (을/ㄹ) 수 있게', '볼 수 있게 / 먹을 수 있게', '创造条件使可能'],
        ['-게 하기 위하여', '词干 + 게 하기 위하여', '이해할 수 있게 하기 위하여', '正式书面目的'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-도록 / -을 수 있게 / -게 하기 위하여',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '목이 쉬___ 노래를 불렀어요。（唱歌唱到嗓子哑了。）',
          options: ['기 위하여', '으도록', '도록', '을 수 있게'],
          answer: 2 as 0|1|2|3,
          explanation: '목이 쉬도록：쉬다 词干 쉬（收音 없음）+ 도록 = 쉬도록。-도록 의 정도 용법。으도록은 不存在的形式이고，기 위하여/을 수 있게는 目的 表达이라 정도 맥락에 어울리지 않는다。',
        },
        {
          prompt: '다음 중 -을 수 있게 가 올바르게 쓰인 句子은？',
          options: ['듣기 수 있게 크게 말해 주세요', '들을 수 있게 크게 말해 주세요', '들으수 있게 크게 말해 주세요', '듣을 수 있게 크게 말해 주세요'],
          answer: 1 as 0|1|2|3,
          explanation: '듣다는 ㄷ不规则으로 元音 前面 ㄷ→ㄹ 교체：듣→들+을 수 있게=들을 수 있게。들으수/듣을/듣기는 모두 病句。',
        },
        {
          prompt: '학생들이 이해할 수 있게 하기 ___ 예시를 추가했습니다.（为了使学生能理解，添加了示例。）',
          options: ['위하여', '때문에', '도록', '위해서도'],
          answer: 0 as 0|1|2|3,
          explanation: '-게 하기 위하여：이해할 수 있게 + 하기 위하여。正式书面目的 表达。위해서 와도 可替换하나 이 빈칸에는 위하여 가 적합。',
        },
        {
          prompt: '밤새___ 연습했어요。（通宵练习了。）',
          options: ['을 수 있게', '기 위해서', '으도록', '도록'],
          answer: 3 as 0|1|2|3,
          explanation: '밤새도록：밤새다 词干 밤새 + 도록。-도록 의 정도 용법으로 "밤새는 동안 내내"를 나타낸다。',
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
      <div class="ko">动词 词干 + 도록</div>
      <div class="zh">为了……/直到……</div>
    </div>
    <div class="ov-block">
      <div class="badge">使得可能</div>
      <div class="ko">词干 + (을/ㄹ) 수 있게</div>
      <div class="zh">使得能够……</div>
    </div>
    <div class="ov-block">
      <div class="badge">正式目的</div>
      <div class="ko">词干 + 게 하기 위하여</div>
      <div class="zh">为了（书面语）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">词干</span> + 도록：늦<b style="color:#ff7fa8">도록</b> / 먹<b style="color:#ff7fa8">도록</b></div>
        <div><span style="font-weight:700">词干</span> + 을/ㄹ 수 있게：볼 수 있<b style="color:#ff7fa8">게</b> / 먹을 수 있<b style="color:#ff7fa8">게</b></div>
        <div><span style="font-weight:700">词干</span> + 게 하기 위하여：이해할 수 있<b style="color:#ff7fa8">게 하기 위하여</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늦으도록（으 삽입）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦도록（词干 直接 接续）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">위하여 + 도록 동시 使用</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">둘 중 하나만 使用</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g27'],
  },

  {
    id: 'card-p17-l04',
    partNumber: 17,
    lessonNumber: 4,
    title: '-(으)ㄹ 지경이다，-을수록',
    whatItDoes: '表示极端程度或越……越……',
    whatItDoesBody: '-을 지경이다 表示情况已到了某种极端程度，相当于"到了……的地步/程度"，含有负面或夸张语气。\n-(으)면 -(으)ㄹ수록 表示"越……越……"，前后两个动词/形容词形成递进关系，程度随条件加深。',
    structureNote: '-을 지경이다：动词/形容词 冠词形（을/ㄹ）+ 지경이다\n-(으)ㄹ수록：动词/形容词 词干 + (으)ㄹ수록（前面常配 -(으)면 一起使用）',
    rulesNote: '-을 지경이다 前面是表达消极或极端状态的冠词形。否定句中也常用（못 참을 지경이다）。\n-(으)ㄹ수록 的前后句主语相同或不同都自然。前面加 -(으)면 时更自然（먹으면 먹을수록）。',
    scenarioNote: '-을 지경이다 般，如"너무 힘들어서 쓰러질 지경이에요"，用于表达夸张或极端状态。\n-(으)ㄹ수록 般，如"알면 알수록 더 재미있어요"，用于说明渐进变化。',
    step0Html: `<div class="card-title">到了那种地步……越来越……</div>
<div class="card-body">一个说极端，一个说递进。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">极端 vs 递进</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-을 지경이다 — 极端程度</div>
      <div style="font-size:16px;font-weight:800;color:#241917">너무 힘들어서 쓰러질 지경이에요.</div>
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
<div class="reminder-box">-을 지경이다 前接冠词形，-(으)ㄹ수록 前接词干。</div>`,
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
        ko: '알면 알수록 更有趣',
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
      { type: 'rule', text: '-을 지경이다：动词/形容词 冠词形（收音 O → 을, 없/ㄹ → ㄹ）+ 지경이다', examples: '쓰러질 지경이다 / 못 참을 지경이다 / 울 지경이다 / 죽을 지경이다' },
      { type: 'rule', text: '-(으)ㄹ수록：词干 收音 있으면 을수록, 없으면/ㄹ이면 ㄹ수록', examples: '먹을수록 / 볼수록 / 갈수록 / 어려울수록 / 좋을수록' },
      { type: 'usage', text: '-(으)면 -(으)ㄹ수록 形式 앞절에 -(으)면 을 붙이면 더 自然', examples: '알면 알수록 / 먹으면 먹을수록 / 생각하면 할수록' },
      { type: 'usage', text: '-을 지경이다 는 消极的·极端 情境에 使用且，肯定 情境에는 부자연스럽다', examples: '쓰러질 지경이다（✓） / 행복할 지경이다（△ 부자연스럽다）' },
      { type: 'note', text: '-지경이다 는 口语体用 -지경이에요，书面体也用 -지경에 陷入', examples: '이미 포기할 지경에 到了' },
      { type: 'compare', text: '-을 지경이다 vs -을 뻔했다：지경이다는 还 상태가 进行中，뻔했다는 几乎 발생할 뻔한 过去', examples: '쓰러질 지경이에요（现在 극한 상태） / 쓰러질 뻔했어요（几乎 쓰러질 뻔한 过去）' },
      { type: 'example', text: '太累 울 지경이에요 / 보면 볼수록 좋아요 / 시간이 갈수록 더 그리워져요' },
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
      { icon: '😫', context: '极度疲惫', ko: '이틀 동안 못 잤더니 쓰러질 지경이에요.', zh: '太累了，累到快要倒下的地步。' },
      { icon: '😤', context: '忍无可忍', ko: '그 사람 때문에 못 참을 지경이에요.', zh: '因为那个人，已经到了忍无可忍的地步。' },
      { icon: '🎵', context: '越听越好', ko: '이 노래는 들으면 들을수록 좋아요.', zh: '这首歌越听越好听。' },
      { icon: '📚', context: '越学越难', ko: '한국어는 공부하면 할수록 어려워요.', zh: '韩语越学越难。' },
      { icon: '💔', context: '越想越难过', ko: '생각하면 할수록 더 슬퍼져요.', zh: '越想越难过。' },
      { icon: '🌧️', context: '天气越来越冷', ko: '날씨가 갈수록 추워지고 있어요.', zh: '天气越来越冷了。' },
    ],
    mistakes: [
      { wrong: '쓰러지을 지경이에요（收音 있는 词干에 을 중복）', correct: '쓰러질 지경이에요', note: '쓰러지다 词干 쓰러지는 收音이 없으므로 ㄹ수록/ㄹ 冠词形：쓰러질 지경이에요。쓰러지을은 不存在的形式。' },
      { wrong: '알수록 알수록 재미있어요（수록 중복）', correct: '알면 알수록 재미있어요', note: '-(으)ㄹ수록 前面 -(으)면 을 한 번만 붙여 쓴다。相同的 동사를 두 번 反复할 때는 알면 알수록 形式가 표준。' },
      { wrong: '시간이 지날수록에 더 그리워요（수록 + 에 조사）', correct: '시간이 지날수록 더 그리워요', note: '-(으)ㄹ수록 자체가 부사절 역할을 하므로 后面 조사를 붙이지 않는다。' },
      { wrong: '행복할 지경이에요（积极状态 + 지경이다）', correct: '너무 행복해요 / 행복해서 눈물이 날 지경이에요', note: '-을 지경이다 用于消极或极端情境较自然。像 행복하다 这种积极状态使用时부자연스럽다。' },
    ],
    quickTable: {
      title: '-을 지경이다 / -(으)ㄹ수록 接续',
      headers: ['表达', '收音 O', '收音 X/ㄹ', '例句'],
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
          options: ['만큼이에요', '뻔했어요', '지경이에요', '정도예요'],
          answer: 2 as 0|1|2|3,
          explanation: '쓰러질 지경이에요：极端 否定 情境을 나타내는 -을 지경이다 表达。만큼이에요는 정도 비교，정도예요는 단순 정도，뻔했어요는 过去 위험 회피。',
        },
        {
          prompt: '한국어는 공부하면 할___ 어려워요。（韩语越学越难。）',
          options: ['수록을', '수록', '수록에', '수록이'],
          answer: 1 as 0|1|2|3,
          explanation: '할수록：하다 词干 하（收音 없음）+ ㄹ수록 = 할수록。-(으)ㄹ수록 은 부사절이므로 后面 조사 없이 不变 쓴다。',
        },
        {
          prompt: '다음 중 -을 지경이다가 가장 自然地 쓰인 것은？',
          options: ['울 지경이에요', '기쁠 지경이에요', '행복할 지경이에요', '기분이 좋을 지경이에요'],
          answer: 0 as 0|1|2|3,
          explanation: '-을 지경이다 는 用于消极·极端情境。울 지경이에요는 消极极限状态（✓）。행복하다/기분이 좋다/기쁘다는 모두 积极情感으로 지경이다搭配부자연스럽다。',
        },
        {
          prompt: '시간이 ___수록 더 보고 싶어요。（随着时间流逝，越来越想见。）',
          options: ['지나이', '지나을', '지나의', '지날'],
          answer: 3 as 0|1|2|3,
          explanation: '지나다 词干 지나（收音 없음）+ ㄹ수록 = 지날수록。收音 없는 词干에는 ㄹ수록을 붙인다。지나을/지나의/지나이는 모두 不存在的形式。',
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
      <div class="ko">冠词形（을/ㄹ）+ 지경이다</div>
      <div class="zh">到了……的地步</div>
    </div>
    <div class="ov-block">
      <div class="badge">越……越……</div>
      <div class="ko">词干 + (으)ㄹ수록</div>
      <div class="zh">越……越……</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">收音 O</span>：먹<b style="color:#ff7fa8">을 지경이다</b> / 먹<b style="color:#ff7fa8">을수록</b></div>
        <div><span style="font-weight:700">收音 X/ㄹ</span>：쓰러지<b style="color:#ff7fa8">ㄹ 지경이다</b> → 쓰러질 지경이다 / 볼수록</div>
        <div><span style="font-weight:700">-(으)면 + 수록</span>：알면 알<b style="color:#ff7fa8">수록</b>（自然스러운 形式）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">행복할 지경이에요（肯定 상태）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">너무 행복해요（지경이다는 否定·극단에만）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">지날수록에 더 그리워요（조사 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">지날수록 더 그리워요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g35'],
  },

  {
    id: 'card-p17-l05',
    isPractice: true,
    partNumber: 17,
    lessonNumber: 5,
    title: 'P13 综合练习',
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
      title: 'P13 综合练习',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '교통사고___ 해서 길이 막혔어요。（因为交通事故堵车了。）',
          options: ['로', '를', '으로', '가'],
          answer: 0 as 0|1|2|3,
          explanation: '교통사고（收音X）→ 로 해서（✓）。收音 있는 명사에는 으로 해서，收音 없거나 ㄹ收音이면 로 해서。',
        },
        {
          prompt: '집에 오는 ___ 편의점에 들렀어요。（回家路上顺便去了便利店。）',
          options: ['길에', '중에', '关系에', '때에'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 길에：移动动词 冠词形 + 길에，오는 길에（✓）。때에/중에/关系에는 意思不同。',
        },
        {
          prompt: '열심히 할___ 실력이 늘어요。（越努力，实力越提高。）',
          options: ['정도로', '만큼', '도록', '수록'],
          answer: 3 as 0|1|2|3,
          explanation: '-(으)ㄹ수록：할수록（✓）。만큼/정도로는 비례 정도，도록은 目的/限度，수록이 "越……越……"를 나타낸다。',
        },
        {
          prompt: '목이 아프___ 노래를 불렀어요。（唱歌唱到嗓子痛。）',
          options: ['길에', '만큼', '도록', '수록'],
          answer: 2 as 0|1|2|3,
          explanation: '-도록：限度/정도 表达，목이 아프도록（✓）。만큼은 비례，수록은 "越……越……"，길에는 移动 경로。',
        },
        {
          prompt: '오늘 날씨가 정말 좋___！（今天天气真好呢！—说话人当下感叹）',
          options: ['던데요', '더라', '테요', '았더니'],
          answer: 1 as 0|1|2|3,
          explanation: '-더라：说话人的新感叹/发现（自言自语或轻微感叹）。-던데요는 向听话人传达，-테요는 推测，-았더니는 过去 행동 후 结果。',
        },
        {
          prompt: '어제 갔더니 문이 ___ 있었어요。（昨天去了，发现门关着。）',
          options: ['닫히는', '닫힌다', '닫힐', '닫혀'],
          answer: 3 as 0|1|2|3,
          explanation: '-았더니 后面는 发现한 情境을 서술한다：닫혀 있었어요（✓）。닫히는/닫힌다/닫힐은 이 문맥에 맞지 않는다。',
        },
      ],
    },
  },

];
