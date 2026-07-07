import type { GrammarCard } from '@/types';

export const grammarCardsP29: GrammarCard[] = [
  // ── 第1课：-(으)ㄴ/는 것으로 알려지다/전해지다 ──────────────────────────────────────
  {
    id: 'card-p29-l01',
    partNumber: 29,
    lessonNumber: 1,
    title: '-(으)ㄴ/는 것으로 알려지다/전해지다',
    whatItDoes: '据悉/据传',
    whatItDoesBody: '「-(으)ㄴ/는 것으로 알려지다/전해지다」是新闻报道最常用的引述句式，表示"据悉""据报道""据传"。将某消息作为"已知事实"传达出去，不指明信息源。알려지다 侧重"广为人知"，전해지다 侧重"消息传来"。',
    structureNote: '动词现在 -는 + 것으로 + 알려지다/전해지다｜形容词/过去 -(으)ㄴ + 것으로',
    rulesNote: '알려지다=被知晓；전해지다=被传告；名词 -인 것으로；否定 -지 않은 것으로',
    structures: [
      {
        ko: '이번 사고는 운전자의 부주의로 발생한 것으로 알려졌다.',
        zh: '据悉本次事故是因驾驶员疏忽而发生的。',
        tokens: [
          { text: '이번 사고는', role: 'subject' },
          { text: '운전자의 부주의로', role: 'plain' },
          { text: '발생한 것으로', role: 'plain' },
          { text: '알려졌다', role: 'verb' },
        ],
      },
      {
        ko: '해당 업체는 이미 파산 신청을 한 것으로 전해졌다.',
        zh: '据传该公司已经申请了破产。',
        tokens: [
          { text: '해당 업체는', role: 'subject' },
          { text: '이미', role: 'time' },
          { text: '파산 신청을 한 것으로', role: 'plain' },
          { text: '전해졌다', role: 'verb' },
        ],
      },
      {
        ko: '두 회사는 협력 관계를 유지하고 있는 것으로 알려졌다.',
        zh: '据悉两家公司仍保持合作关系。',
        tokens: [
          { text: '두 회사는', role: 'subject' },
          { text: '협력 관계를', role: 'object' },
          { text: '유지하고 있는 것으로', role: 'plain' },
          { text: '알려졌다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 것으로 알려지다', examples: '유지하다 → 유지하고 있는 것으로 알려졌다' },
      { type: 'rule', text: '动词过去：-(으)ㄴ 것으로 알려지다', examples: '발생하다 → 발생한 것으로 알려졌다' },
      { type: 'rule', text: '形容词：-(으)ㄴ 것으로 알려지다', examples: '심각하다 → 심각한 것으로 알려졌다' },
      { type: 'rule', text: '名词：N인 것으로 알려지다', examples: '주범 → 주범인 것으로 알려졌다' },
      { type: 'usage', text: '알려지다 vs 전해지다：前者"已被广知/被查明"，后者"消息传来/据传"', examples: '조사에서 드러났다 → 알려졌다 / 관계자에 따르면 → 전해졌다' },
      { type: 'usage', text: '新闻语气：句尾常用 -았/었다 过去式，客观陈述', examples: '알려졌다 / 전해졌다' },
      { type: 'compare', text: '-(으)ㄴ 것으로 알려지다 vs -다고 하다 → 前者书面新闻体，后者日常口语', examples: '(新闻) 발생한 것으로 알려졌다 / (口语) 발생했다고 해요' },
      { type: 'note', text: '不指明信息源时更客观；指明用 "관계자에 따르면 / 소식통에 따르면"', examples: '관계자에 따르면, 두 회사는 협상 중인 것으로 전해졌다.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이번 사고는', role: 'subject' },
          { text: '부주의로', role: 'plain' },
          { text: '발생한 것으로', role: 'plain' },
          { text: '알려졌다', role: 'verb' },
        ],
        zh: '据悉此事故因疏忽发生。',
        swapWords: ['발생하다', '일어나다', '벌어지다', '터지다'],
      },
      {
        wordBlocks: [
          { text: '해당 업체는', role: 'subject' },
          { text: '파산 신청을', role: 'object' },
          { text: '한 것으로', role: 'plain' },
          { text: '전해졌다', role: 'verb' },
        ],
        zh: '据传该公司已申请破产。',
        swapWords: ['파산', '해체', '합병', '재편'],
      },
      {
        wordBlocks: [
          { text: '두 회사는', role: 'subject' },
          { text: '협력 관계를', role: 'object' },
          { text: '유지하고 있는 것으로', role: 'plain' },
          { text: '알려졌다', role: 'verb' },
        ],
        zh: '据悉两家公司仍在合作。',
        swapWords: ['유지하다', '이어가다', '지속하다', '강화하다'],
      },
    ],
    scenarios: [
      { icon: '📰', context: '事故报道', ko: '이번 사고는 부주의로 발생한 것으로 알려졌다.', zh: '据悉事故因疏忽发生。' },
      { icon: '🏢', context: '企业新闻', ko: '해당 업체는 파산 신청을 한 것으로 전해졌다.', zh: '据传该公司已申请破产。' },
      { icon: '🤝', context: '合作动向', ko: '두 회사는 협력 관계를 유지하고 있는 것으로 알려졌다.', zh: '据悉两家公司仍保持合作。' },
      { icon: '🎬', context: '娱乐消息', ko: '배우 A씨는 이번 작품에 출연할 것으로 전해졌다.', zh: '据传演员 A 将出演本剧。' },
      { icon: '⚖️', context: '司法消息', ko: '피고인은 혐의를 부인하고 있는 것으로 알려졌다.', zh: '据悉被告否认指控。' },
      { icon: '🌐', context: '国际新闻', ko: '양국은 조만간 회담을 재개할 것으로 전해졌다.', zh: '据传两国将很快重启会谈。' },
    ],
    mistakes: [
      { wrong: '발생하는 것으로 알려졌다', correct: '발생한 것으로 알려졌다', note: '事故已发生 → 用过去 -(으)ㄴ' },
      { wrong: '해당 업체는 파산 신청 한다고 알려졌다', correct: '해당 업체는 파산 신청을 한 것으로 전해졌다', note: '新闻体固定用 "-(으)ㄴ/는 것으로 알려지다/전해지다"，不用 "-다고 알려지다"' },
      { wrong: '두 회사는 협력하는 알려졌다', correct: '두 회사는 협력하고 있는 것으로 알려졌다', note: '缺 "것으로"，句式必须完整' },
    ],
    quickTable: {
      title: '"것으로 알려지다/전해지다" 冠形规则',
      headers: ['词类/时态', '结构', '例子'],
      rows: [
        ['动词现在', '-는 것으로', '유지하고 있는 것으로'],
        ['动词过去', '-(으)ㄴ 것으로', '발생한 것으로'],
        ['形容词', '-(으)ㄴ 것으로', '심각한 것으로'],
        ['名词', '-인 것으로', '주범인 것으로'],
        ['将来/推测', '-(으)ㄹ 것으로', '출연할 것으로'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"것으로 알려지다/전해지다" 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '이번 사고는 부주의로 (발생하다) 것으로 알려졌다.',
          options: ['발생하는', '발생할', '발생한', '발생하고'],
          answer: 2,
          explanation: '事故已经发生了，是过去动作 → -(으)ㄴ 것으로 → 발생한 것으로。',
        },
        {
          prompt: '두 회사는 협력 관계를 (유지하고 있다) 것으로 알려졌다.',
          options: ['유지하는', '유지하고 있는', '유지한', '유지할'],
          answer: 1,
          explanation: '进行中状态 → -고 있는 것으로 → 유지하고 있는 것으로。',
        },
        {
          prompt: '피고인은 혐의를 (부인하다) 것으로 알려졌다.',
          options: ['부인한', '부인하는', '부인하고 있는', '부인할'],
          answer: 2,
          explanation: '"目前正在否认"，进行体 → 부인하고 있는 것으로。也可接受 부인하는，但 진행 상태 표현用 -고 있는 更贴新闻风。',
        },
        {
          prompt: '「-(으)ㄴ/는 것으로 알려지다」通常用于哪种语境？',
          options: ['朋友间闲聊', '新闻/报道客观转述', '亲密关系倾诉', '广告宣传口号'],
          answer: 1,
          explanation: '该结构是新闻报道的标志性句式，客观转述"据悉"，不用于口语闲聊。',
        },
      ],
    },
    linkedGrammarIds: ['card-p11-l01', 'card-p25-l01'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">打开韩语新闻常见 "…한 것으로 알려졌다" "…할 것으로 전해졌다" —— 这是新闻体的"据悉/据传"，客观又不指名信息源。<br>掌握它，看懂韩国报纸就打开了第一扇门。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>알려지다 vs 전해지다</b><br>
    ・알려지다 → 已被广知/查明后公开<br>
    <span style="color:#89756e">조사에서 발생 원인이 밝혀진 것으로 알려졌다.</span><br>
    ・전해지다 → 消息传来/据传<br>
    <span style="color:#89756e">관계자에 따르면 협상 중인 것으로 전해졌다.</span>
  </div>
</div>`,
    compareLabel: '알려지다 vs 전해지다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-(으)ㄴ/는 것으로 알려지다/전해지다</div>
  <div style="font-size:14px;color:#89756e">新闻报道的"据悉/据传"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는 것으로</b>：유지하고 있는 것으로<br>
      动词过去 → <b>-(으)ㄴ 것으로</b>：발생한 것으로<br>
      形容词 → <b>-(으)ㄴ 것으로</b>：심각한 것으로<br>
      名词 → <b>-인 것으로</b>：주범인 것으로<br>
      推测 → <b>-(으)ㄹ 것으로</b>：출연할 것으로
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">新闻高频例</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      이번 사고는 부주의로 발생한 것으로 알려졌다.<br>
      해당 업체는 파산 신청을 한 것으로 전해졌다.<br>
      양국은 회담을 재개할 것으로 전해졌다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">발생하는 것으로 알려졌다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">발생한 것으로 알려졌다（过去动作）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">-다고 알려지다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">-(으)ㄴ/는 것으로 알려지다（新闻体固定）</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-(으)ㄴ/는 것으로 나타나다/드러나다 ──────────────────────────────────────
  {
    id: 'card-p29-l02',
    partNumber: 29,
    lessonNumber: 2,
    title: '-(으)ㄴ/는 것으로 나타나다/드러나다',
    whatItDoes: '数据/调查显示',
    whatItDoesBody: '「-(으)ㄴ/는 것으로 나타나다/드러나다」表示"（据调查/数据）显示""结果表明"。나타나다 侧重"显示/呈现"（中性数据），드러나다 侧重"暴露/揭露"（隐藏事实被查出）。报社、政府报告、白皮书高频结构。',
    structureNote: '동사/형용사 -(으)ㄴ/는 것으로 + 나타나다 / 드러나다',
    rulesNote: '나타나다=（结果）显示｜드러나다=（隐藏的）被揭露｜句尾用过去 -았/었다',
    structures: [
      {
        ko: '설문 조사 결과 응답자의 70%가 반대하는 것으로 나타났다.',
        zh: '问卷调查显示 70% 的受访者反对。',
        tokens: [
          { text: '설문 조사 결과', role: 'plain' },
          { text: '응답자의 70%가', role: 'subject' },
          { text: '반대하는 것으로', role: 'plain' },
          { text: '나타났다', role: 'verb' },
        ],
      },
      {
        ko: '조사 결과 청소년의 흡연율이 크게 증가한 것으로 드러났다.',
        zh: '调查结果显示青少年吸烟率大幅上升。',
        tokens: [
          { text: '조사 결과', role: 'plain' },
          { text: '청소년의 흡연율이', role: 'subject' },
          { text: '크게', role: 'plain' },
          { text: '증가한 것으로', role: 'plain' },
          { text: '드러났다', role: 'verb' },
        ],
      },
      {
        ko: '이번 통계에서 서울의 물가가 가장 높은 것으로 나타났다.',
        zh: '本次统计显示首尔物价最高。',
        tokens: [
          { text: '이번 통계에서', role: 'plain' },
          { text: '서울의 물가가', role: 'subject' },
          { text: '가장', role: 'plain' },
          { text: '높은 것으로', role: 'plain' },
          { text: '나타났다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 -는 것으로 / 过去 -(으)ㄴ 것으로', examples: '반대하다 → 반대하는 것으로 나타났다 / 증가하다 → 증가한 것으로 드러났다' },
      { type: 'rule', text: '形容词 -(으)ㄴ 것으로', examples: '높다 → 높은 것으로 나타났다' },
      { type: 'rule', text: '名词 -인 것으로', examples: '주요 원인인 것으로 드러났다' },
      { type: 'usage', text: '나타나다：客观数据/调查显示结果', examples: '설문조사 결과 …로 나타났다' },
      { type: 'usage', text: '드러나다：原本隐藏/未知的事实被查出、被揭露', examples: '조사 결과 부정행위가 있었던 것으로 드러났다' },
      { type: 'compare', text: '나타나다 vs 알려지다 → 前者强调"结果显示"，后者强调"已被知晓"', examples: '조사에서 나타났다 (数据) / 이미 알려졌다 (广知)' },
      { type: 'note', text: '常与"…에 따르면 / …결과"搭配开头', examples: '설문조사에 따르면 / 조사 결과' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '설문 조사 결과', role: 'plain' },
          { text: '응답자의 70%가', role: 'subject' },
          { text: '반대하는 것으로', role: 'plain' },
          { text: '나타났다', role: 'verb' },
        ],
        zh: '调查显示 70% 反对。',
        swapWords: ['반대하다', '찬성하다', '지지하다', '거부하다'],
      },
      {
        wordBlocks: [
          { text: '조사 결과', role: 'plain' },
          { text: '흡연율이', role: 'subject' },
          { text: '증가한 것으로', role: 'plain' },
          { text: '드러났다', role: 'verb' },
        ],
        zh: '调查显示吸烟率上升。',
        swapWords: ['증가하다', '감소하다', '급증하다', '급감하다'],
      },
      {
        wordBlocks: [
          { text: '통계에서', role: 'plain' },
          { text: '서울의 물가가', role: 'subject' },
          { text: '높은 것으로', role: 'plain' },
          { text: '나타났다', role: 'verb' },
        ],
        zh: '统计显示首尔物价最高。',
        swapWords: ['높다', '낮다', '비싸다', '저렴하다'],
      },
    ],
    scenarios: [
      { icon: '📊', context: '民调结果', ko: '응답자의 70%가 반대하는 것으로 나타났다.', zh: '调查显示 70% 反对。' },
      { icon: '🚬', context: '社会调查', ko: '흡연율이 크게 증가한 것으로 드러났다.', zh: '调查显示吸烟率上升。' },
      { icon: '💵', context: '物价统计', ko: '서울의 물가가 가장 높은 것으로 나타났다.', zh: '统计显示首尔物价最高。' },
      { icon: '🏫', context: '教育报告', ko: '학생들의 독서 시간이 감소한 것으로 나타났다.', zh: '报告显示学生阅读时间减少。' },
      { icon: '⚖️', context: '内部审计', ko: '회사 내부에 부정행위가 있었던 것으로 드러났다.', zh: '经调查公司内部存在违规行为。' },
      { icon: '🩺', context: '健康调查', ko: '한국인의 평균 수면 시간이 짧은 것으로 나타났다.', zh: '调查显示韩国人平均睡眠时间偏短。' },
    ],
    mistakes: [
      { wrong: '응답자의 70%가 반대하다 것으로 나타났다', correct: '응답자의 70%가 반대하는 것으로 나타났다', note: '动词现在需 -는，不能直接接词干' },
      { wrong: '흡연율이 증가하는 것으로 드러났다', correct: '흡연율이 증가한 것으로 드러났다', note: '调查结果反映的是"已发生"的事实 → 用 -(으)ㄴ' },
      { wrong: '서울의 물가가 높다는 것으로 나타났다', correct: '서울의 물가가 높은 것으로 나타났다', note: '这里用冠形式 -(으)ㄴ，不用引用 -다는' },
    ],
    quickTable: {
      title: '나타나다 vs 드러나다',
      headers: ['动词', '侧重', '典型语境'],
      rows: [
        ['나타나다', '结果显示/统计呈现', '설문조사 / 통계 / 지표'],
        ['드러나다', '隐藏事实被查出', '조사 결과 / 감사 / 폭로'],
        ['알려지다', '消息已广为人知', '언론 / 보도 / 확인'],
        ['전해지다', '消息传来', '관계자 / 소식통'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"나타나다/드러나다" 练习',
      body: '选择正确形式或用词',
      questions: [
        {
          prompt: '설문 조사 결과 70%가 (반대하다) 것으로 나타났다.',
          options: ['반대한', '반대하는', '반대할', '반대해'],
          answer: 1,
          explanation: '"目前的意见"是现在状态 → 动词现在 -는 것으로 → 반대하는 것으로。',
        },
        {
          prompt: '조사에서 흡연율이 (증가하다) 것으로 드러났다.',
          options: ['증가하는', '증가한', '증가할', '증가하고'],
          answer: 1,
          explanation: '调查揭露的是已经完成的变化（吸烟率已上升） → -(으)ㄴ 것으로 → 증가한 것으로。',
        },
        {
          prompt: '이번 통계에서 서울의 물가가 (높다) 것으로 나타났다.',
          options: ['높는', '높은', '높을', '높다는'],
          answer: 1,
          explanation: '形容词冠形 → -(으)ㄴ → 높은 것으로 나타났다。',
        },
        {
          prompt: '"（原本隐藏的违规）经审计被查出" 韩语最合适的动词是？',
          options: ['나타났다', '알려졌다', '드러났다', '전해졌다'],
          answer: 2,
          explanation: '"隐藏事实被查出/揭露"用 드러났다；나타나다偏中性数据显示。',
        },
      ],
    },
    linkedGrammarIds: ['card-p29-l01'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"调查显示……" "统计表明……" —— 韩语新闻和政府报告用 <b>-(으)ㄴ/는 것으로 나타나다/드러나다</b>。<br>数据类用 나타나다；被查出的隐藏事实用 드러나다。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>나타나다 vs 드러나다</b><br>
    ・나타나다 → 客观结果显示（中性）<br>
    <span style="color:#89756e">설문조사 결과 70%가 찬성하는 것으로 나타났다.</span><br>
    ・드러나다 → 隐藏的事实被查出（含揭露感）<br>
    <span style="color:#89756e">감사 결과 부정행위가 있었던 것으로 드러났다.</span>
  </div>
</div>`,
    compareLabel: '나타나다 vs 드러나다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-(으)ㄴ/는 것으로 나타나다/드러나다</div>
  <div style="font-size:14px;color:#89756e">数据 · 调查 · 报告</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">选用规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      나타나다 → 数据显示（中性）<br>
      드러나다 → 隐藏被查出（揭露）<br>
      设问 → …에 따르면 / 조사 결과<br>
      句尾 → 过去式 -았/었다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      설문 조사 결과 70%가 반대하는 것으로 나타났다.<br>
      조사 결과 흡연율이 증가한 것으로 드러났다.<br>
      서울의 물가가 가장 높은 것으로 나타났다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">높다는 것으로 나타났다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">높은 것으로 나타났다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">증가하는 것으로 드러났다（已发生的变化）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">증가한 것으로 드러났다</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보이다 ──────────────────────────────────────
  {
    id: 'card-p29-l03',
    partNumber: 29,
    lessonNumber: 3,
    title: '-(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보이다',
    whatItDoes: '预计/预测',
    whatItDoesBody: '「-(으)ㄹ 전망이다」和「-(으)ㄹ 것으로 보이다/예상되다」都是新闻体"预计/预测"的固定表达。前者语气更断定（"有……的前景"），后者更委婉（"看起来……"）。表示对未来趋势、经济走势、政策走向的客观预测。',
    structureNote: '动词/形容词词干 + -(으)ㄹ + 전망이다｜-(으)ㄹ + 것으로 + 보이다 / 예상되다',
    rulesNote: '有받침 -을，无받침 -ㄹ；名词 -일 전망이다；否定 -지 않을 전망이다',
    structures: [
      {
        ko: '올해 경제 성장률은 3%대에 머무를 전망이다.',
        zh: '预计今年经济增长率将维持在 3% 左右。',
        tokens: [
          { text: '올해', role: 'time' },
          { text: '경제 성장률은', role: 'subject' },
          { text: '3%대에', role: 'place' },
          { text: '머무를 전망이다', role: 'verb' },
        ],
      },
      {
        ko: '다음 주부터 기온이 크게 떨어질 것으로 보인다.',
        zh: '预计从下周开始气温将大幅下降。',
        tokens: [
          { text: '다음 주부터', role: 'time' },
          { text: '기온이', role: 'subject' },
          { text: '크게', role: 'plain' },
          { text: '떨어질 것으로', role: 'plain' },
          { text: '보인다', role: 'verb' },
        ],
      },
      {
        ko: '정부는 새로운 정책을 발표할 것으로 예상된다.',
        zh: '预计政府将发布新政策。',
        tokens: [
          { text: '정부는', role: 'subject' },
          { text: '새로운 정책을', role: 'object' },
          { text: '발표할 것으로', role: 'plain' },
          { text: '예상된다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词有받침 → -을 전망이다', examples: '머무르다 → 머무를 전망이다（받침×，但 르→ㄹ）' },
      { type: 'rule', text: '动词/形容词无받침 → -ㄹ 전망이다', examples: '가다 → 갈 전망이다 / 늘어나다 → 늘어날 전망이다' },
      { type: 'rule', text: '名词 → N일 전망이다', examples: '큰 변화 → 큰 변화일 전망이다' },
      { type: 'usage', text: '전망이다：语气略断定，多用于经济/政策预测', examples: '수출이 증가할 전망이다.' },
      { type: 'usage', text: '것으로 보이다/예상된다：语气委婉，多用于天气/走势/民意', examples: '기온이 떨어질 것으로 보인다.' },
      { type: 'compare', text: '전망이다 vs -(으)ㄹ 것 같다 → 前者书面新闻体，后者口语推测', examples: '(新闻) 증가할 전망이다 / (口语) 증가할 것 같아요' },
      { type: 'note', text: '预测多用于将来时；句尾用现在 -이다 / -보인다', examples: '句尾不加 -았/었다（预测本身是"当下的判断"）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '올해', role: 'time' },
          { text: '경제 성장률은', role: 'subject' },
          { text: '3%대에', role: 'place' },
          { text: '머무를 전망이다', role: 'verb' },
        ],
        zh: '预计今年增长率维持 3%。',
        swapWords: ['머무르다', '유지되다', '떨어지다', '반등하다'],
      },
      {
        wordBlocks: [
          { text: '다음 주부터', role: 'time' },
          { text: '기온이', role: 'subject' },
          { text: '떨어질 것으로', role: 'plain' },
          { text: '보인다', role: 'verb' },
        ],
        zh: '预计下周气温下降。',
        swapWords: ['떨어지다', '오르다', '급등하다', '급락하다'],
      },
      {
        wordBlocks: [
          { text: '정부는', role: 'subject' },
          { text: '새로운 정책을', role: 'object' },
          { text: '발표할 것으로', role: 'plain' },
          { text: '예상된다', role: 'verb' },
        ],
        zh: '预计政府将发布新政策。',
        swapWords: ['발표하다', '시행하다', '검토하다', '연기하다'],
      },
    ],
    scenarios: [
      { icon: '📈', context: '经济预测', ko: '올해 경제 성장률은 3%대에 머무를 전망이다.', zh: '预计增长率 3%。' },
      { icon: '🌡️', context: '天气预报', ko: '다음 주부터 기온이 크게 떨어질 것으로 보인다.', zh: '预计下周气温下降。' },
      { icon: '🏛️', context: '政策展望', ko: '정부는 새로운 정책을 발표할 것으로 예상된다.', zh: '预计政府发布新政策。' },
      { icon: '💹', context: '股市预测', ko: '주가는 당분간 상승세를 이어갈 전망이다.', zh: '预计股价短期内继续上涨。' },
      { icon: '🚗', context: '交通预测', ko: '연휴 기간 교통량이 크게 늘어날 전망이다.', zh: '预计假期期间交通量将大幅增加。' },
      { icon: '🌏', context: '国际动向', ko: '양국의 협상이 조만간 재개될 것으로 보인다.', zh: '预计两国将很快重启协商。' },
    ],
    mistakes: [
      { wrong: '경제 성장률은 3%대에 머무른 전망이다', correct: '경제 성장률은 3%대에 머무를 전망이다', note: '预测用将来 -(으)ㄹ，不用 -(으)ㄴ' },
      { wrong: '기온이 떨어질 것을 보인다', correct: '기온이 떨어질 것으로 보인다', note: '固定搭配是 -(으)ㄹ 것으로 보이다，用 -으로 不用 -을' },
      { wrong: '정부는 정책을 발표할 것으로 예상됐다', correct: '정부는 정책을 발표할 것으로 예상된다', note: '预测句尾用现在 -된다 / -이다，不用 -었다' },
    ],
    quickTable: {
      title: '预测句式对照',
      headers: ['句式', '语气', '典型语境'],
      rows: [
        ['-(으)ㄹ 전망이다', '断定', '经济 / 政策 / 走势'],
        ['-(으)ㄹ 것으로 보이다', '委婉', '天气 / 民意 / 趋势'],
        ['-(으)ㄹ 것으로 예상된다', '客观', '数据推算 / 官方展望'],
        ['-(으)ㄹ 것 같다', '口语', '日常聊天推测'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"전망이다 / 것으로 보이다" 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '올해 경제 성장률은 3%대에 (머무르다) 전망이다.',
          options: ['머무른', '머무르는', '머무를', '머무르고'],
          answer: 2,
          explanation: '预测是将来 → -(으)ㄹ → 머무를 전망이다。（르 词干无脱落）',
        },
        {
          prompt: '기온이 크게 (떨어지다) 것으로 보인다.',
          options: ['떨어지는', '떨어진', '떨어질', '떨어지고'],
          answer: 2,
          explanation: '预测未来变化 → -(으)ㄹ 것으로 → 떨어질 것으로 보인다。',
        },
        {
          prompt: '기온이 떨어질 (   ) 보인다.',
          options: ['것을', '것으로', '것에', '것이'],
          answer: 1,
          explanation: '固定搭配是 -(으)ㄹ 것으로 보이다，助词用 (으)로。',
        },
        {
          prompt: '语气最委婉的预测句式是？',
          options: ['-(으)ㄹ 전망이다', '-(으)ㄹ 것으로 보이다', '-(으)ㄹ 것이다', '-(으)ㄹ 것 같다'],
          answer: 1,
          explanation: '전망이다断定，것이다决心/确信，것 같다口语；것으로 보이다客观委婉，最适合新闻体。',
        },
      ],
    },
    linkedGrammarIds: ['card-p29-l01', 'card-p29-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"预计经济增长 3%""预计明日转晴" —— 韩语新闻用 <b>-(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보이다</b>。<br>前者语气断定，后者语气委婉。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>전망이다 vs 것으로 보이다</b><br>
    ・전망이다 → 语气略断定<br>
    <span style="color:#89756e">수출이 증가할 전망이다.（经济类）</span><br>
    ・것으로 보이다 → 语气委婉<br>
    <span style="color:#89756e">기온이 떨어질 것으로 보인다.（天气/走势）</span>
  </div>
</div>`,
    compareLabel: '断定 vs 委婉',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-(으)ㄹ 전망이다 / 것으로 보이다</div>
  <div style="font-size:14px;color:#89756e">新闻体的"预计/预测"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">句式对照</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -(으)ㄹ 전망이다 → 断定<br>
      -(으)ㄹ 것으로 보이다 → 委婉<br>
      -(으)ㄹ 것으로 예상된다 → 客观<br>
      -(으)ㄹ 것 같다 → 口语
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      경제 성장률은 3%대에 머무를 전망이다.<br>
      기온이 크게 떨어질 것으로 보인다.<br>
      정부는 새로운 정책을 발표할 것으로 예상된다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">머무른 전망이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">머무를 전망이다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">떨어질 것을 보인다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">떨어질 것으로 보인다</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-기에 앞서 / -에 앞서 ──────────────────────────────────────
  {
    id: 'card-p29-l04',
    partNumber: 29,
    lessonNumber: 4,
    title: '-기에 앞서 / -에 앞서',
    whatItDoes: '在……之前',
    whatItDoesBody: '「-기에 앞서 / -에 앞서」是"在……之前"的书面表达，比口语的 -기 전에 更正式。多用于新闻、致辞、报告开头，表示某项正式动作/仪式前需先做的事。动词接 -기에 앞서，名词接 -에 앞서。',
    structureNote: '动词词干 + -기에 앞서｜名词 + -에 앞서',
    rulesNote: '书面正式；后文常接告知/说明/致谢；不用于日常口语',
    structures: [
      {
        ko: '회의를 시작하기에 앞서 참석자 여러분께 감사의 말씀을 드립니다.',
        zh: '会议开始之前，向各位与会者致以谢意。',
        tokens: [
          { text: '회의를', role: 'object' },
          { text: '시작하기에 앞서', role: 'plain' },
          { text: '참석자 여러분께', role: 'plain' },
          { text: '감사의 말씀을', role: 'object' },
          { text: '드립니다', role: 'verb' },
        ],
      },
      {
        ko: '본격적인 논의에 앞서 배경을 간단히 설명드리겠습니다.',
        zh: '正式讨论之前，先简单说明一下背景。',
        tokens: [
          { text: '본격적인 논의에 앞서', role: 'plain' },
          { text: '배경을', role: 'object' },
          { text: '간단히', role: 'plain' },
          { text: '설명드리겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '결정을 내리기에 앞서 신중히 검토해야 한다.',
        zh: '在做出决定之前应慎重审查。',
        tokens: [
          { text: '결정을', role: 'object' },
          { text: '내리기에 앞서', role: 'plain' },
          { text: '신중히', role: 'plain' },
          { text: '검토해야 한다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 → -기에 앞서', examples: '시작하다 → 시작하기에 앞서 / 내리다 → 내리기에 앞서' },
      { type: 'rule', text: '名词 → -에 앞서', examples: '논의 → 논의에 앞서 / 회의 → 회의에 앞서' },
      { type: 'usage', text: '语体：书面/正式；多用于致辞、报告、公文', examples: '시작하기에 앞서 감사의 말씀을 드립니다.' },
      { type: 'usage', text: '常配主语"먼저 / 우선 / 우선적으로"强调"先做"', examples: '결정에 앞서 우선 정보를 수집해야 한다.' },
      { type: 'compare', text: '-기에 앞서 vs -기 전에 → 前者书面正式，后者中性/口语', examples: '(正式) 회의에 앞서 / (日常) 회의 전에' },
      { type: 'note', text: '不能替换为 -자마자、-고 나서（意义不同）', examples: '误：회의를 시작하자마자 인사를 드립니다.（这是"一开会就……"）' },
      { type: 'note', text: '名词后必须用 -에 앞서，不写 -기에 앞서', examples: '误：논의기에 앞서 → 正：논의에 앞서' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '회의를', role: 'object' },
          { text: '시작하기에 앞서', role: 'plain' },
          { text: '감사의 말씀을', role: 'object' },
          { text: '드립니다', role: 'verb' },
        ],
        zh: '会议开始前致谢。',
        swapWords: ['시작하다', '개최하다', '진행하다', '주최하다'],
      },
      {
        wordBlocks: [
          { text: '본격적인 논의에 앞서', role: 'plain' },
          { text: '배경을', role: 'object' },
          { text: '설명드리겠습니다', role: 'verb' },
        ],
        zh: '正式讨论前说明背景。',
        swapWords: ['논의', '토론', '심의', '발표'],
      },
      {
        wordBlocks: [
          { text: '결정을', role: 'object' },
          { text: '내리기에 앞서', role: 'plain' },
          { text: '검토해야 한다', role: 'verb' },
        ],
        zh: '做决定前应审查。',
        swapWords: ['결정', '판단', '선택', '결론'],
      },
    ],
    scenarios: [
      { icon: '🎤', context: '致辞', ko: '회의를 시작하기에 앞서 감사의 말씀을 드립니다.', zh: '会议开始前致谢。' },
      { icon: '📋', context: '正式发言', ko: '본격적인 논의에 앞서 배경을 설명드리겠습니다.', zh: '正式讨论前说明背景。' },
      { icon: '⚖️', context: '重要决定', ko: '결정을 내리기에 앞서 신중히 검토해야 한다.', zh: '做决定前需慎重审查。' },
      { icon: '🏛️', context: '政策发布', ko: '정책 발표에 앞서 여론 수렴이 필요하다.', zh: '发布政策前需收集民意。' },
      { icon: '💼', context: '契约签订', ko: '계약 체결에 앞서 조건을 다시 확인해 주십시오.', zh: '签约前请再次确认条件。' },
      { icon: '🌐', context: '国际会谈', ko: '정상회담에 앞서 실무 협의가 진행됐다.', zh: '首脑会谈前进行了工作层磋商。' },
    ],
    mistakes: [
      { wrong: '회의를 시작하기 앞서', correct: '회의를 시작하기에 앞서', note: '固定搭配是 -기에 앞서，助词 -에 不可省略' },
      { wrong: '논의기에 앞서', correct: '논의에 앞서', note: '名词直接接 -에 앞서，不接 -기에' },
      { wrong: '결정을 내렸기에 앞서 검토해야 한다', correct: '결정을 내리기에 앞서 검토해야 한다', note: '词干直接接 -기에 앞서，不要变形' },
    ],
    quickTable: {
      title: '-기에 앞서 vs -기 전에',
      headers: ['形式', '语体', '典型语境'],
      rows: [
        ['V-기에 앞서', '书面/正式', '致辞 / 报告 / 公文'],
        ['N-에 앞서', '书面/正式', '仪式 / 政策 / 会议'],
        ['V-기 전에', '中性/口语', '日常表达'],
        ['N 전에', '中性/口语', '日常/时间点'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"-기에 앞서 / -에 앞서" 练习',
      body: '选正确形式',
      questions: [
        {
          prompt: '회의를 (시작하다) 앞서 감사의 말씀을 드립니다.',
          options: ['시작하기 전', '시작하기에', '시작해서', '시작한'],
          answer: 1,
          explanation: '动词接 -기에 앞서 → 시작하기에 앞서（正式场合致辞用语）。',
        },
        {
          prompt: '본격적인 (논의) 앞서 배경을 설명드리겠습니다.',
          options: ['논의기에', '논의에', '논의로', '논의를'],
          answer: 1,
          explanation: '名词直接接 -에 앞서 → 논의에 앞서。',
        },
        {
          prompt: '「-기에 앞서」的语体特征是……',
          options: ['亲密口语', '正式书面', '网络流行', '儿童用语'],
          answer: 1,
          explanation: '-기에 앞서 用于正式场合（致辞/公文/报告），口语一般用 -기 전에。',
        },
        {
          prompt: '「결정을 내리기에 앞서」的含义是？',
          options: ['决定作出的同时', '在作决定之前', '因为要作决定', '就算作决定'],
          answer: 1,
          explanation: '-기에 앞서 = 在……之前（正式）。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"会议开始之前……" "决定作出之前……" —— 韩语正式场合、报告、致辞里"在……之前"用 <b>-기에 앞서 / -에 앞서</b>，比 -기 전에 更正式。<br>动词接 -기에 앞서，名词接 -에 앞서。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기에 앞서 vs -기 전에</b><br>
    ・-기에 앞서 → 正式书面<br>
    <span style="color:#89756e">회의를 시작하기에 앞서 감사의 말씀을 드립니다.</span><br>
    ・-기 전에 → 日常/口语<br>
    <span style="color:#89756e">회의를 시작하기 전에 커피 한잔 마셔요.</span>
  </div>
</div>`,
    compareLabel: '书面 vs 日常',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기에 앞서 / -에 앞서</div>
  <div style="font-size:14px;color:#89756e">正式书面的"在……之前"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">连接规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词 → <b>-기에 앞서</b>：시작하기에 앞서<br>
      名词 → <b>-에 앞서</b>：논의에 앞서<br>
      常配副词 → 우선 / 먼저<br>
      后文 → 致辞 / 说明 / 呼吁
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      회의를 시작하기에 앞서 감사의 말씀을 드립니다.<br>
      본격적인 논의에 앞서 배경을 설명드리겠습니다.<br>
      결정을 내리기에 앞서 신중히 검토해야 한다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">시작하기 앞서</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">시작하기에 앞서</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">논의기에 앞서</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">논의에 앞서</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：-기(를) 요구하다 / 촉구하다 / 당부하다 ──────────────────────────────────────
  {
    id: 'card-p29-l05',
    partNumber: 29,
    lessonNumber: 5,
    title: '-기(를) 요구하다 / 촉구하다 / 당부하다',
    whatItDoes: '要求/敦促/呼吁',
    whatItDoesBody: '「-기(를) 요구하다/촉구하다/당부하다」是新闻/公文报道公众诉求或官员发言的正式句式。요구하다=要求（强）；촉구하다=催促、敦促（正式/媒体）；당부하다=郑重叮嘱、呼吁（客气/上级对下）。',
    structureNote: '动词词干 + -기(를) + 요구하다 / 촉구하다 / 당부하다',
    rulesNote: '助词 -를 常可省；主语多为 团体/官方；否定用 -지 않기(를)',
    structures: [
      {
        ko: '시민들은 정부에 정책 재검토를 요구했다.',
        zh: '市民们要求政府重新审视政策。',
        tokens: [
          { text: '시민들은', role: 'subject' },
          { text: '정부에', role: 'plain' },
          { text: '정책 재검토를', role: 'object' },
          { text: '요구했다', role: 'verb' },
        ],
      },
      {
        ko: '야당은 총리의 사퇴를 강력히 촉구했다.',
        zh: '在野党强烈敦促总理辞职。',
        tokens: [
          { text: '야당은', role: 'subject' },
          { text: '총리의 사퇴를', role: 'object' },
          { text: '강력히', role: 'plain' },
          { text: '촉구했다', role: 'verb' },
        ],
      },
      {
        ko: '대통령은 국민들에게 방역 수칙을 잘 지켜 주기를 당부했다.',
        zh: '总统呼吁国民认真遵守防疫规定。',
        tokens: [
          { text: '대통령은', role: 'subject' },
          { text: '국민들에게', role: 'plain' },
          { text: '방역 수칙을 잘 지켜 주기를', role: 'object' },
          { text: '당부했다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + -기(를) + 요구하다', examples: '재검토하다 → 재검토하기를 요구하다' },
      { type: 'rule', text: '动词 + -기(를) + 촉구하다', examples: '사퇴하다 → 사퇴할 것을 촉구하다 / 사퇴하기를 촉구하다' },
      { type: 'rule', text: '动词 + -기(를) + 당부하다', examples: '지키다 → 잘 지켜 주기를 당부하다' },
      { type: 'usage', text: '요구하다 → 语气最强，含强烈诉求', examples: '시민들은 사과를 요구했다.' },
      { type: 'usage', text: '촉구하다 → 敦促、催促（正式媒体常用）', examples: '야당은 사퇴를 촉구했다.' },
      { type: 'usage', text: '당부하다 → 郑重叮嘱、呼吁（上级/长辈/官方对民众）', examples: '대통령이 방역 협조를 당부했다.' },
      { type: 'compare', text: '要求 vs 呼吁 → 요구强，촉구敦促，당부柔和劝导', examples: '요구하다 > 촉구하다 > 당부하다' },
      { type: 'note', text: '也可用名词化短语：재검토를 요구하다 / 사퇴를 촉구하다', examples: '要求/敦促的对象是"某行为"，用 명사 -를 或 -기(를)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시민들은', role: 'subject' },
          { text: '정부에', role: 'plain' },
          { text: '재검토를', role: 'object' },
          { text: '요구했다', role: 'verb' },
        ],
        zh: '市民要求重新审查。',
        swapWords: ['요구하다', '주장하다', '항의하다', '제기하다'],
      },
      {
        wordBlocks: [
          { text: '야당은', role: 'subject' },
          { text: '총리의 사퇴를', role: 'object' },
          { text: '촉구했다', role: 'verb' },
        ],
        zh: '在野党敦促总理辞职。',
        swapWords: ['촉구하다', '요구하다', '압박하다', '경고하다'],
      },
      {
        wordBlocks: [
          { text: '대통령은', role: 'subject' },
          { text: '방역 수칙을', role: 'object' },
          { text: '잘 지켜 주기를', role: 'plain' },
          { text: '당부했다', role: 'verb' },
        ],
        zh: '总统呼吁遵守防疫。',
        swapWords: ['당부하다', '호소하다', '요청하다', '부탁하다'],
      },
    ],
    scenarios: [
      { icon: '📢', context: '市民诉求', ko: '시민들은 정부에 정책 재검토를 요구했다.', zh: '市民要求重新审议。' },
      { icon: '🏛️', context: '政治敦促', ko: '야당은 총리의 사퇴를 강력히 촉구했다.', zh: '在野党敦促总理辞职。' },
      { icon: '🎙️', context: '总统呼吁', ko: '대통령은 국민들에게 방역 협조를 당부했다.', zh: '总统呼吁国民配合防疫。' },
      { icon: '🚌', context: '安全叮嘱', ko: '경찰은 시민들에게 안전 운전을 당부했다.', zh: '警方叮嘱市民注意安全驾驶。' },
      { icon: '🌐', context: '国际敦促', ko: '국제 사회는 인권 상황 개선을 촉구했다.', zh: '国际社会敦促改善人权状况。' },
      { icon: '📝', context: '劳工诉求', ko: '노조는 임금 인상을 요구했다.', zh: '工会要求上调工资。' },
    ],
    mistakes: [
      { wrong: '시민들은 정책 재검토가 요구했다', correct: '시민들은 정책 재검토를 요구했다', note: '要求的对象用 -를，不用 -가' },
      { wrong: '대통령이 방역 수칙을 지켜 주기가 당부했다', correct: '대통령이 방역 수칙을 지켜 주기를 당부했다', note: '-기 后接 -를，不接 -가' },
      { wrong: '총리의 사퇴가 촉구했다', correct: '총리의 사퇴를 촉구했다', note: '촉구하다 的对象用 -를' },
    ],
    quickTable: {
      title: '要求/敦促/呼吁 强弱对照',
      headers: ['动词', '语气', '常见主语'],
      rows: [
        ['요구하다', '强 · 诉求', '市民 / 工会 / 政党'],
        ['촉구하다', '正式 · 敦促', '媒体 / 政党 / 国际社会'],
        ['당부하다', '柔和 · 郑重叮嘱', '总统 / 官员 / 上级'],
        ['호소하다', '呼吁 · 感性', '民间团体 / 领导人'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"요구/촉구/당부" 练习',
      body: '选合适的动词或形式',
      questions: [
        {
          prompt: '"总统呼吁国民配合防疫" 最合适的动词是？',
          options: ['요구했다', '촉구했다', '당부했다', '항의했다'],
          answer: 2,
          explanation: '총리/대통령对国民郑重叮嘱、呼吁用 당부하다。요구/촉구语气偏强。',
        },
        {
          prompt: '"在野党强烈敦促总理辞职" 最合适的动词是？',
          options: ['요구했다', '촉구했다', '당부했다', '요청했다'],
          answer: 1,
          explanation: '在野党对政治人物公开敦促、施压 → 촉구하다（正式媒体用语）。',
        },
        {
          prompt: '방역 수칙을 잘 지켜 (   ) 당부했다.',
          options: ['주기가', '주기를', '주기에', '주기에서'],
          answer: 1,
          explanation: '-기(를) 당부하다 是固定结构，助词是 -를。',
        },
        {
          prompt: '「요구하다 / 촉구하다 / 당부하다」的语气强弱正确排列？',
          options: ['당부 > 촉구 > 요구', '요구 > 촉구 > 당부', '촉구 > 요구 > 당부', '요구 = 촉구 = 당부'],
          answer: 1,
          explanation: '요구하다最强（诉求）→ 촉구하다中（敦促）→ 당부하다柔和（叮嘱）。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"市民要求政府……" "总统呼吁国民……" —— 新闻里这三个动词经常出现：<b>요구하다（要求） / 촉구하다（敦促） / 당부하다（呼吁）</b>。<br>用错就会把上级的"叮嘱"变成"强硬要求"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>요구 vs 촉구 vs 당부</b><br>
    ・요구하다 → 强诉求<br>
    <span style="color:#89756e">시민들이 사과를 요구했다.</span><br>
    ・촉구하다 → 正式敦促<br>
    <span style="color:#89756e">야당은 사퇴를 촉구했다.</span><br>
    ・당부하다 → 柔和叮嘱<br>
    <span style="color:#89756e">대통령이 협조를 당부했다.</span>
  </div>
</div>`,
    compareLabel: '要求/敦促/呼吁',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기(를) 요구/촉구/당부하다</div>
  <div style="font-size:14px;color:#89756e">新闻中的诉求 · 敦促 · 呼吁</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">语气对照</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      요구하다 → 强 · 诉求（市民/工会）<br>
      촉구하다 → 正式敦促（政党/媒体）<br>
      당부하다 → 柔和叮嘱（官方/上级）<br>
      호소하다 → 感性呼吁（团体/领袖）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      시민들은 정책 재검토를 요구했다.<br>
      야당은 총리의 사퇴를 촉구했다.<br>
      대통령은 방역 협조를 당부했다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">지켜 주기가 당부했다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">지켜 주기를 당부했다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사퇴가 촉구했다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사퇴를 촉구했다</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：-는 데 그치다 / -에 그치다 ──────────────────────────────────────
  {
    id: 'card-p29-l06',
    partNumber: 29,
    lessonNumber: 6,
    title: '-는 데 그치다 / -에 그치다',
    whatItDoes: '仅限于/停留在',
    whatItDoesBody: '「-는 데 그치다 / -에 그치다」表示"仅仅停留在……""只做到……为止"，暗含"未能进一步/未达预期"的批评或惋惜。是新闻分析、评论最常见的评价句式。动词接 -는 데 그치다，名词接 -에 그치다。',
    structureNote: '动词词干 + -는 데 그치다｜名词 + -에 그치다',
    rulesNote: '句尾常用 -았/었다 表示结果；含消极评价（"未达预期"）',
    structures: [
      {
        ko: '이번 회의는 원론적인 논의를 하는 데 그쳤다.',
        zh: '本次会议仅停留在原则性讨论上。',
        tokens: [
          { text: '이번 회의는', role: 'subject' },
          { text: '원론적인 논의를', role: 'object' },
          { text: '하는 데 그쳤다', role: 'verb' },
        ],
      },
      {
        ko: '올해 매출 증가율은 2%에 그쳤다.',
        zh: '今年销售额增长率仅为 2%。',
        tokens: [
          { text: '올해', role: 'time' },
          { text: '매출 증가율은', role: 'subject' },
          { text: '2%에 그쳤다', role: 'verb' },
        ],
      },
      {
        ko: '정부의 대책은 임시적 조치에 그쳤다.',
        zh: '政府对策仅停留在临时措施上。',
        tokens: [
          { text: '정부의 대책은', role: 'subject' },
          { text: '임시적 조치에 그쳤다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + -는 데 그치다', examples: '하다 → 하는 데 그치다 / 나타내다 → 나타내는 데 그치다' },
      { type: 'rule', text: '名词 + -에 그치다', examples: '2% → 2%에 그치다 / 임시 조치 → 임시 조치에 그치다' },
      { type: 'usage', text: '含"未达预期"的消极评价，暗批"不够/不深入"', examples: '원론적 논의에 그치다 → 只是空谈' },
      { type: 'usage', text: '常用主语：结果 / 措施 / 数据 / 讨论', examples: '증가율은 …에 그쳤다 / 대책은 …에 그쳤다' },
      { type: 'compare', text: '-에 그치다 vs -에 이르다 → 前者"只到"（不足），后者"达到"（进展）', examples: '2%에 그쳤다 (只到2%) / 5%에 이르렀다 (达到5%)' },
      { type: 'note', text: '书面/新闻专用，日常口语不用', examples: '- 논의에 그쳤다 (报纸) / - 얘기만 했어요 (口语)' },
      { type: 'note', text: '句尾多用过去时 -았/었다 陈述事实', examples: '그쳤다 / 그친 것으로 나타났다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이번 회의는', role: 'subject' },
          { text: '원론적인 논의를', role: 'object' },
          { text: '하는 데 그쳤다', role: 'verb' },
        ],
        zh: '会议仅停留在原则性讨论。',
        swapWords: ['논의', '토론', '설명', '검토'],
      },
      {
        wordBlocks: [
          { text: '올해', role: 'time' },
          { text: '매출 증가율은', role: 'subject' },
          { text: '2%에 그쳤다', role: 'verb' },
        ],
        zh: '销售增长率仅 2%。',
        swapWords: ['매출', '수출', '수입', '판매량'],
      },
      {
        wordBlocks: [
          { text: '정부의 대책은', role: 'subject' },
          { text: '임시적 조치에 그쳤다', role: 'verb' },
        ],
        zh: '政府对策仅停留在临时措施。',
        swapWords: ['임시', '단기', '표면적', '형식적'],
      },
    ],
    scenarios: [
      { icon: '📉', context: '经济分析', ko: '올해 매출 증가율은 2%에 그쳤다.', zh: '销售增长率仅 2%。' },
      { icon: '💬', context: '会议评价', ko: '이번 회의는 원론적인 논의를 하는 데 그쳤다.', zh: '会议仅停留在原则讨论。' },
      { icon: '🏛️', context: '政策批评', ko: '정부의 대책은 임시적 조치에 그쳤다.', zh: '政府对策仅是临时措施。' },
      { icon: '🎯', context: '成果不足', ko: '이번 개혁은 형식적 변화에 그쳤다는 평가를 받고 있다.', zh: '本次改革被评价为仅是形式变化。' },
      { icon: '📊', context: '数据低于预期', ko: '수출 증가폭은 예상보다 낮은 1.5%에 그쳤다.', zh: '出口增幅仅 1.5%，低于预期。' },
      { icon: '🗣️', context: '声明未做实事', ko: '양측은 유감 표명에 그쳤다.', zh: '双方仅止于表达遗憾。' },
    ],
    mistakes: [
      { wrong: '이번 회의는 원론적 논의하는 데 그쳤다', correct: '이번 회의는 원론적인 논의를 하는 데 그쳤다', note: '논의 是名词，必须加冠形 -는，宾语加 -를' },
      { wrong: '올해 매출 증가율은 2%를 그쳤다', correct: '올해 매출 증가율은 2%에 그쳤다', note: '固定搭配是 -에 그치다，助词用 -에' },
      { wrong: '대책은 임시 조치가 그쳤다', correct: '대책은 임시 조치에 그쳤다', note: '"停留在"用 -에 그치다，不是 -가 그치다' },
    ],
    quickTable: {
      title: '"…에/데 그치다" 用法',
      headers: ['形式', '含义', '例子'],
      rows: [
        ['V + -는 데 그치다', '只做到……', '논의하는 데 그쳤다'],
        ['N + -에 그치다', '仅停留在……', '2%에 그쳤다'],
        ['V + -는 데 그치지 않다', '不止于…, 还……', '논의에 그치지 않고 조치까지'],
        ['-에 이르다', '达到（进展）', '5%에 이르렀다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"-에 그치다 / -는 데 그치다" 练习',
      body: '选正确形式',
      questions: [
        {
          prompt: '올해 매출 증가율은 2% (   ) 그쳤다.',
          options: ['을', '에', '가', '로'],
          answer: 1,
          explanation: '固定搭配是 -에 그치다，助词用 -에。',
        },
        {
          prompt: '이번 회의는 원론적 (논의하다) 데 그쳤다.',
          options: ['논의한', '논의하는', '논의할', '논의하고'],
          answer: 1,
          explanation: '动词接 -는 데 그치다 → 논의하는 데 그쳤다。',
        },
        {
          prompt: '-에 그치다 通常带有什么语气？',
          options: ['积极称赞', '中性描述', '消极评价（未达预期）', '强烈感叹'],
          answer: 2,
          explanation: '-에 그치다 含"不够/未达预期"的消极评价，是新闻评论用语。',
        },
        {
          prompt: '「양측은 유감 표명에 그쳤다」的含义是？',
          options: ['双方达成协议', '双方仅止于表达遗憾（未行动）', '双方停止表态', '双方拒绝表态'],
          answer: 1,
          explanation: '-에 그치다 = 仅止于……，未进一步行动，带消极评价。',
        },
      ],
    },
    linkedGrammarIds: ['card-p29-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"仅停留在讨论""增长率仅 2%" —— 新闻分析类"未达预期"的评价用 <b>-는 데 그치다 / -에 그치다</b>。<br>动词接 -는 데 그치다，名词接 -에 그치다，含消极意味。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-에 그치다 vs -에 이르다</b><br>
    ・-에 그치다 → 仅到（不足）<br>
    <span style="color:#89756e">2%에 그쳤다.（只到 2%，含批评）</span><br>
    ・-에 이르다 → 达到（进展）<br>
    <span style="color:#89756e">5%에 이르렀다.（达到 5%，含积极）</span>
  </div>
</div>`,
    compareLabel: '仅到 vs 达到',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 데 그치다 / -에 그치다</div>
  <div style="font-size:14px;color:#89756e">"未达预期"的评价句式</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">连接规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词 → <b>-는 데 그치다</b>：논의하는 데 그쳤다<br>
      名词 → <b>-에 그치다</b>：2%에 그쳤다<br>
      语气 → 消极 · 未达预期<br>
      对照 → -에 이르다（积极）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      회의는 원론적인 논의를 하는 데 그쳤다.<br>
      매출 증가율은 2%에 그쳤다.<br>
      정부의 대책은 임시적 조치에 그쳤다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">2%를 그쳤다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">2%에 그쳤다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">임시 조치가 그쳤다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">임시 조치에 그쳤다</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：-자 (书面语一……就……) ──────────────────────────────────────
  {
    id: 'card-p29-l07',
    partNumber: 29,
    lessonNumber: 7,
    title: '-자',
    whatItDoes: '一……就……',
    whatItDoesBody: '「-자」是"一……就……"的书面语连接词尾，语义与 -자마자 相近但更简洁、正式，专用于书面/新闻/文学。前后动作紧接发生，多用于客观陈述过去事件。不能用命令/请求句尾。',
    structureNote: '动词词干 + -자 + 后续动作',
    rulesNote: '仅接动词；主语可不同也可相同；不能与命令/请求/劝诱形式搭配；不含"预期外"语气',
    structures: [
      {
        ko: '문이 열리자 사람들이 우르르 몰려 나왔다.',
        zh: '门一开，人们蜂拥而出。',
        tokens: [
          { text: '문이', role: 'subject' },
          { text: '열리자', role: 'verb' },
          { text: '사람들이', role: 'subject' },
          { text: '우르르', role: 'plain' },
          { text: '몰려 나왔다', role: 'verb' },
        ],
      },
      {
        ko: '비가 그치자 하늘이 맑아졌다.',
        zh: '雨一停天就晴了。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '그치자', role: 'verb' },
          { text: '하늘이', role: 'subject' },
          { text: '맑아졌다', role: 'verb' },
        ],
      },
      {
        ko: '뉴스가 발표되자 시장이 큰 폭으로 반응했다.',
        zh: '消息一发布，市场就大幅反应。',
        tokens: [
          { text: '뉴스가', role: 'subject' },
          { text: '발표되자', role: 'verb' },
          { text: '시장이', role: 'subject' },
          { text: '큰 폭으로', role: 'plain' },
          { text: '반응했다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -자（不分有无받침）', examples: '열리다 → 열리자 / 그치다 → 그치자 / 발표되다 → 발표되자' },
      { type: 'rule', text: '不接形容词、名词（不用 이자）', examples: '误：예쁘자 / 误：학생이자（除非表并列身份则另外语义）' },
      { type: 'usage', text: '前后动作紧接（一……就……）', examples: '문이 열리자 사람들이 몰려 나왔다.' },
      { type: 'usage', text: '主语可不同也可相同', examples: '(不同) 비가 그치자 아이들이 나갔다 / (相同) 그는 도착하자 인사를 했다' },
      { type: 'compare', text: '-자 vs -자마자 → 前者书面/正式，后者中性/口语', examples: '(书面) 문이 열리자 / (口语) 문이 열리자마자' },
      { type: 'note', text: '不能与命令 -(으)세요 / 请求 -아/어 주세요 / 劝诱 -(으)ㅂ시다 搭配', examples: '误：집에 오자 밥 먹읍시다.（意义混乱）' },
      { type: 'note', text: '句尾多用过去 -았/었다，客观陈述已发生事件', examples: '뉴스가 발표되자 시장이 반응했다.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '문이', role: 'subject' },
          { text: '열리자', role: 'verb' },
          { text: '사람들이', role: 'subject' },
          { text: '몰려 나왔다', role: 'verb' },
        ],
        zh: '门一开人们涌出。',
        swapWords: ['열리다', '닫히다', '부서지다', '흔들리다'],
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '그치자', role: 'verb' },
          { text: '하늘이', role: 'subject' },
          { text: '맑아졌다', role: 'verb' },
        ],
        zh: '雨一停天晴。',
        swapWords: ['그치다', '내리다', '멎다', '멈추다'],
      },
      {
        wordBlocks: [
          { text: '뉴스가', role: 'subject' },
          { text: '발표되자', role: 'verb' },
          { text: '시장이', role: 'subject' },
          { text: '반응했다', role: 'verb' },
        ],
        zh: '消息一出市场反应。',
        swapWords: ['발표되다', '공개되다', '전해지다', '알려지다'],
      },
    ],
    scenarios: [
      { icon: '🚪', context: '开门瞬间', ko: '문이 열리자 사람들이 우르르 몰려 나왔다.', zh: '门一开人们涌出。' },
      { icon: '🌧️', context: '天气变化', ko: '비가 그치자 하늘이 맑아졌다.', zh: '雨一停天就晴。' },
      { icon: '📰', context: '消息公布', ko: '뉴스가 발표되자 시장이 큰 폭으로 반응했다.', zh: '消息一出市场反应。' },
      { icon: '🚨', context: '警报响起', ko: '경보가 울리자 사람들이 대피하기 시작했다.', zh: '警报一响人们开始疏散。' },
      { icon: '🎬', context: '演出开始', ko: '막이 오르자 관객들이 박수를 쳤다.', zh: '幕一升起观众鼓掌。' },
      { icon: '📈', context: '公告影响', ko: '금리 인상이 발표되자 주가가 하락했다.', zh: '加息一公布股价下跌。' },
    ],
    mistakes: [
      { wrong: '집에 오자 밥 먹읍시다', correct: '집에 오면 밥 먹읍시다', note: '-자 不能接劝诱 -읍시다；用 -(으)면 或 -고 나서' },
      { wrong: '날씨가 춥자 감기에 걸렸다', correct: '날씨가 추워지자 감기에 걸렸다', note: '-자 只接动词；形容词需先转为动词化 -아/어지다' },
      { wrong: '문을 열자 사람들이 왔다', correct: '문이 열리자 사람들이 왔다', note: '-자 前的主语要与"自然发生的动作"呼应；这里用被动 열리다 更自然' },
    ],
    quickTable: {
      title: '-자 vs -자마자',
      headers: ['形式', '语体', '备注'],
      rows: [
        ['V-자', '书面/正式', '文学/新闻，简洁'],
        ['V-자마자', '中性/口语', '通用，语气无正式感'],
        ['V-고 나서', '中性', '强调"做完后"'],
        ['V-(으)면', '条件', '假设/时间条件'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"-자" 练习',
      body: '选择正确用法',
      questions: [
        {
          prompt: '문이 (열리다) 사람들이 몰려 나왔다.',
          options: ['열리면', '열리자', '열려서', '열리고'],
          answer: 1,
          explanation: '"门一开人们就……"用 -자（一……就……）→ 열리자。',
        },
        {
          prompt: '「-자」的语体特征？',
          options: ['亲密口语', '书面/正式（新闻/文学）', '网络用语', '幼儿用语'],
          answer: 1,
          explanation: '-자 是"-자마자"的书面对应形式，用于新闻/文学。',
        },
        {
          prompt: '下列句子哪一个用法错误？',
          options: [
            '비가 그치자 하늘이 맑아졌다.',
            '뉴스가 발표되자 시장이 반응했다.',
            '집에 오자 밥 먹읍시다.',
            '경보가 울리자 사람들이 대피했다.',
          ],
          answer: 2,
          explanation: '-자 不能接劝诱 -읍시다。应改为 -(으)면 或 -고 나서。',
        },
        {
          prompt: '날씨가 (추워지다) 감기에 걸렸다.',
          options: ['춥자', '추워지자', '추울자', '춥면'],
          answer: 1,
          explanation: '-자 只接动词；形容词 춥다 需转动词化 → 추워지자。',
        },
      ],
    },
    linkedGrammarIds: ['card-p9-l08'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"门一开，人们涌出""消息一出，市场反应" —— 新闻/文学里"一……就……"用 <b>-자</b>，比 -자마자 更简洁书面。<br>只接动词、不能接劝诱/命令，是书面语标志。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-자 vs -자마자</b><br>
    ・-자 → 书面/正式<br>
    <span style="color:#89756e">뉴스가 발표되자 시장이 반응했다.</span><br>
    ・-자마자 → 中性/口语<br>
    <span style="color:#89756e">뉴스가 발표되자마자 시장이 반응했어요.</span>
  </div>
</div>`,
    compareLabel: '书面 vs 口语',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-자：一……就……（书面）</div>
  <div style="font-size:14px;color:#89756e">新闻 / 文学专用连接</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">使用规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      只接动词（不接形容词/名词）<br>
      主语可同可异<br>
      不能接命令/请求/劝诱<br>
      句尾多用过去 -았/었다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      문이 열리자 사람들이 몰려 나왔다.<br>
      비가 그치자 하늘이 맑아졌다.<br>
      뉴스가 발표되자 시장이 반응했다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">집에 오자 밥 먹읍시다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">집에 오면 밥 먹읍시다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">춥자 감기에 걸렸다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">추워지자 감기에 걸렸다</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：이래(로) / -(으)ㄴ 이래 ──────────────────────────────────────
  {
    id: 'card-p29-l08',
    partNumber: 29,
    lessonNumber: 8,
    title: '이래(로) / -(으)ㄴ 이래',
    whatItDoes: '自从……以来',
    whatItDoesBody: '「이래(로) / -(으)ㄴ 이래」表示"自从……以来（一直……）"，比 -(으)ㄴ 후로 / -고 나서 语气更正式、书面。名词后接 이래(로)，动词过去分词后接 -(으)ㄴ 이래。多见于报道回顾、历史陈述。',
    structureNote: '名词 + 이래(로)｜动词 -(으)ㄴ + 이래',
    rulesNote: '이래(로) 中的 -로 可省；后文常接"最……""持续……""从未……"表述长期状态',
    structures: [
      {
        ko: '창사 이래 최대 실적을 기록했다.',
        zh: '创下自建社以来的最高业绩。',
        tokens: [
          { text: '창사 이래', role: 'time' },
          { text: '최대 실적을', role: 'object' },
          { text: '기록했다', role: 'verb' },
        ],
      },
      {
        ko: '한국에 온 이래 매일 한국어 공부를 이어왔다.',
        zh: '自从来到韩国以来一直坚持学韩语。',
        tokens: [
          { text: '한국에 온 이래', role: 'time' },
          { text: '매일', role: 'time' },
          { text: '한국어 공부를', role: 'object' },
          { text: '이어왔다', role: 'verb' },
        ],
      },
      {
        ko: '10년 만의 폭염으로 관측 이래로 가장 더운 여름이 됐다.',
        zh: '因十年一遇的酷暑，成为观测以来最热的夏天。',
        tokens: [
          { text: '10년 만의 폭염으로', role: 'plain' },
          { text: '관측 이래로', role: 'time' },
          { text: '가장 더운 여름이', role: 'subject' },
          { text: '됐다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 이래(로)', examples: '창사 → 창사 이래 / 관측 → 관측 이래로' },
      { type: 'rule', text: '动词 -(으)ㄴ + 이래', examples: '오다 → 온 이래 / 시작하다 → 시작한 이래' },
      { type: 'usage', text: '后文常接"最……""持续……""从未……"', examples: '창사 이래 최대 / 온 이래 매일 이어왔다' },
      { type: 'usage', text: '含"从起点持续至今"的时间跨度', examples: '2000년 이래 처음 있는 일이다.' },
      { type: 'compare', text: '이래(로) vs -(으)ㄴ 후로 → 前者书面/正式，后者中性', examples: '(书面) 창사 이래 / (日常) 회사 세운 후로' },
      { type: 'note', text: '通常与"가장 / 처음 / 계속 / 매일"等副词呼应', examples: '창사 이래 가장 큰 성장을 이뤘다.' },
      { type: 'note', text: '-로 可省，"이래" 单用也可', examples: '창사 이래 = 창사 이래로' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '창사 이래', role: 'time' },
          { text: '최대 실적을', role: 'object' },
          { text: '기록했다', role: 'verb' },
        ],
        zh: '创下建社以来最高业绩。',
        swapWords: ['창사', '창립', '설립', '개국'],
      },
      {
        wordBlocks: [
          { text: '한국에 온 이래', role: 'time' },
          { text: '매일', role: 'time' },
          { text: '한국어 공부를', role: 'object' },
          { text: '이어왔다', role: 'verb' },
        ],
        zh: '来韩后一直学韩语。',
        swapWords: ['오다', '이주하다', '들어오다', '입국하다'],
      },
      {
        wordBlocks: [
          { text: '관측 이래로', role: 'time' },
          { text: '가장 더운 여름이', role: 'subject' },
          { text: '됐다', role: 'verb' },
        ],
        zh: '观测以来最热夏天。',
        swapWords: ['관측', '기록', '통계', '조사'],
      },
    ],
    scenarios: [
      { icon: '🏢', context: '企业业绩', ko: '창사 이래 최대 실적을 기록했다.', zh: '创下建社以来最高业绩。' },
      { icon: '📚', context: '学习坚持', ko: '한국에 온 이래 매일 한국어 공부를 이어왔다.', zh: '来韩以来每日坚持学韩语。' },
      { icon: '🌡️', context: '气候记录', ko: '관측 이래로 가장 더운 여름이 됐다.', zh: '观测以来最热夏天。' },
      { icon: '🏛️', context: '政治历史', ko: '건국 이래 유례가 없는 사건이다.', zh: '建国以来前所未有的事件。' },
      { icon: '⚽', context: '体育记录', ko: '창단 이래 최고 성적을 거뒀다.', zh: '建队以来最佳战绩。' },
      { icon: '💻', context: '技术里程', ko: '2000년 이래 IT 산업이 급성장했다.', zh: '自 2000 年以来 IT 产业迅猛增长。' },
    ],
    mistakes: [
      { wrong: '한국에 오는 이래', correct: '한국에 온 이래', note: '动词接过去 -(으)ㄴ 이래，表已发生的起点' },
      { wrong: '창사한 이래', correct: '창사 이래', note: '"창사"本身是名词（创立公司），后直接接 이래，不用 -(으)ㄴ' },
      { wrong: '관측을 이래로', correct: '관측 이래로', note: '이래(로) 前不加 -을/를，名词直接接' },
    ],
    quickTable: {
      title: '"이래 / -(으)ㄴ 이래" 用法',
      headers: ['形式', '用于', '例子'],
      rows: [
        ['N + 이래(로)', '名词起点', '창사 이래 / 관측 이래로'],
        ['V-(으)ㄴ + 이래', '动词过去起点', '온 이래 / 시작한 이래'],
        ['-(으)ㄴ 후로', '中性口语替换', '한국에 온 후로'],
        ['-고 나서', '时间连接', '식사 후'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"이래 / -(으)ㄴ 이래" 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '(창사) 이래 최대 실적을 기록했다.',
          options: ['창사한', '창사', '창사를', '창사에'],
          answer: 1,
          explanation: '창사 是名词，直接接 이래 → 창사 이래。',
        },
        {
          prompt: '한국에 (오다) 이래 매일 한국어 공부를 이어왔다.',
          options: ['오는', '온', '올', '와서'],
          answer: 1,
          explanation: '动词接过去 -(으)ㄴ 이래，表示已经发生的起点 → 온 이래。',
        },
        {
          prompt: '「관측 이래로」的意思是？',
          options: ['预计观测', '自观测以来（持续至今）', '为了观测', '刚开始观测'],
          answer: 1,
          explanation: '이래(로) = 从……起持续至今，含长时间跨度。',
        },
        {
          prompt: '「이래(로)」的语体特征？',
          options: ['亲密口语', '书面/正式（回顾/报告）', '网络流行', '祈使语气'],
          answer: 1,
          explanation: '이래(로) 用于书面/正式回顾，日常口语常用 -(으)ㄴ 후로。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"创下建社以来最高业绩""来韩以来一直……" —— 韩语回顾长时间跨度用 <b>이래(로) / -(으)ㄴ 이래</b>。<br>名词直接接 이래，动词用 -(으)ㄴ 이래，比 -(으)ㄴ 후로 更正式书面。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>이래(로) vs -(으)ㄴ 후로</b><br>
    ・이래(로) → 书面/正式<br>
    <span style="color:#89756e">창사 이래 최대 실적을 기록했다.</span><br>
    ・-(으)ㄴ 후로 → 中性/口语<br>
    <span style="color:#89756e">회사 세운 후로 매일 바빠요.</span>
  </div>
</div>`,
    compareLabel: '书面 vs 口语',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">이래(로) / -(으)ㄴ 이래</div>
  <div style="font-size:14px;color:#89756e">书面回顾"自……以来"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">连接规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      名词 → <b>이래(로)</b>：창사 이래 / 관측 이래로<br>
      动词 → <b>-(으)ㄴ 이래</b>：온 이래 / 시작한 이래<br>
      呼应副词 → 가장 / 처음 / 계속 / 매일
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      창사 이래 최대 실적을 기록했다.<br>
      한국에 온 이래 매일 공부를 이어왔다.<br>
      관측 이래로 가장 더운 여름이 됐다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">한국에 오는 이래</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">한국에 온 이래</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">관측을 이래로</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">관측 이래로</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P25 综合练习 ──────────────────────────────────────
  {
    id: 'card-p29-l09',
    partNumber: 29,
    lessonNumber: 9,
    title: 'P25 综合练习',
    isPractice: true,
    whatItDoes: '书面/新闻体综合',
    whatItDoesBody: '本课综合 P25 全部 8 个书面/新闻体语法点：것으로 알려지다/전해지다、것으로 나타나다/드러나다、-(으)ㄹ 전망이다、-기에 앞서、-기를 촉구/당부하다、-에 그치다、-자、이래(로)。测试书面语敏感度。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P25 综合练习',
      body: '综合本章所有语法点',
      questions: [
        {
          prompt: '이번 사고는 부주의로 (발생하다) 것으로 알려졌다.',
          options: ['발생한', '발생하는', '발생할', '발생하고'],
          answer: 0,
          explanation: '事故已经发生，用过去冠形 -(으)ㄴ → 발생한 것으로 알려졌다。',
        },
        {
          prompt: '조사에서 흡연율이 (증가하다) 것으로 드러났다.',
          options: ['증가하는', '증가한', '증가할', '증가해서'],
          answer: 1,
          explanation: '调查揭露已发生的上升 → 증가한 것으로 드러났다。',
        },
        {
          prompt: '올해 경제 성장률은 3%대에 (머무르다) 전망이다.',
          options: ['머무른', '머무르는', '머무를', '머무르고'],
          answer: 2,
          explanation: '预测未来 → -(으)ㄹ 전망이다 → 머무를 전망이다。',
        },
        {
          prompt: '(회의를 시작하다) 앞서 감사의 말씀을 드립니다.',
          options: ['시작하고', '시작하기에', '시작하기', '시작한'],
          answer: 1,
          explanation: '动词接 -기에 앞서 → 시작하기에 앞서（正式致辞用）。',
        },
        {
          prompt: '"总统郑重呼吁国民配合防疫" 用哪个动词最贴切？',
          options: ['요구했다', '촉구했다', '당부했다', '항의했다'],
          answer: 2,
          explanation: '大统领对国民郑重叮嘱、呼吁 → 당부하다。요구/촉구语气偏强。',
        },
        {
          prompt: '올해 매출 증가율은 2% (   ) 그쳤다.',
          options: ['에', '를', '가', '로'],
          answer: 0,
          explanation: '固定搭配 -에 그치다，助词是 -에。',
        },
        {
          prompt: '문이 (열리다) 사람들이 몰려 나왔다.',
          options: ['열리면', '열리자', '열려서', '열리고'],
          answer: 1,
          explanation: '"一开门就……"用书面 -자 → 열리자 사람들이 몰려 나왔다。',
        },
        {
          prompt: '한국에 (오다) 이래 매일 한국어를 공부해 왔다.',
          options: ['오는', '온', '올', '와서'],
          answer: 1,
          explanation: '动词接 -(으)ㄴ 이래，表已发生的起点 → 온 이래。',
        },
        {
          prompt: '下面哪句符合新闻书面语体？',
          options: [
            '그 회사가 파산했다고 해요.',
            '해당 업체는 파산 신청을 한 것으로 전해졌다.',
            '회사 망했다는데?',
            '파산 신청했대요.',
          ],
          answer: 1,
          explanation: '「-(으)ㄴ 것으로 전해졌다」是新闻体固定句式；其他都是口语转述。',
        },
        {
          prompt: '下面哪个句子的语气"最委婉客观"？',
          options: [
            '수출이 증가할 것이다.',
            '수출이 증가할 전망이다.',
            '수출이 증가할 것으로 보인다.',
            '수출이 증가할 것 같아요.',
          ],
          answer: 2,
          explanation: '것으로 보이다 → 客观委婉；전망이다略断定；것이다决心；것 같다口语。',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p29-l01',
      'card-p29-l02',
      'card-p29-l03',
      'card-p29-l04',
      'card-p29-l05',
      'card-p29-l06',
      'card-p29-l07',
      'card-p29-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P25 书面/新闻体总结</div>
  <div style="font-size:14px;color:#89756e">八大新闻语句式一览</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">引述类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -(으)ㄴ/는 것으로 알려지다 → 据悉<br>
      -(으)ㄴ/는 것으로 전해지다 → 据传<br>
      -(으)ㄴ/는 것으로 나타나다 → 数据显示<br>
      -(으)ㄴ/는 것으로 드러나다 → 揭露显示
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">预测/评价类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -(으)ㄹ 전망이다 → 预计（断定）<br>
      -(으)ㄹ 것으로 보이다 → 预计（委婉）<br>
      -에/는 데 그치다 → 仅止于（消极）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">话语/回顾类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -기에 앞서 / -에 앞서 → 正式在……前<br>
      -기를 요구/촉구/당부하다 → 要求/敦促/呼吁<br>
      -자 → 书面"一……就……"<br>
      이래(로) / -(으)ㄴ 이래 → 自从……以来
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">语体注意</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 新闻体多用过去 -았/었다 客观陈述<br>
      2. 引述句式不指明信息源以求客观<br>
      3. 예측 표현按语气强弱选：전망이다 > 것으로 보이다<br>
      4. 요구/촉구/당부 按主体和场合选用<br>
      5. -자、이래 等只用于书面，不进日常对话
    </div>
  </div>
</div>`,
  },
];
