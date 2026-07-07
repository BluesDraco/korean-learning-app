import type { GrammarCard } from '@/types';

export const grammarCardsP24: GrammarCard[] = [
  // ── 第1课：-는 바람에 ─────────────────────────────────────
  {
    id: 'card-p24-l01',
    partNumber: 24,
    lessonNumber: 1,
    title: '-는 바람에',
    whatItDoes: '因为（意外原因）导致……',
    whatItDoesBody: '表达"因为某个意外/突发情况，结果出了岔子"的原因连接词。\n后半句通常是负面/意外的结果。\n和一般的 -아/어서 或 -기 때문에 不同：바람에 强调"预料之外的原因导致预料之外的结果"。',
    structureNote: '结构：动词词干 + 는 바람에。\n只接动词，不接形容词、不接名词。\n결과（后半句）必须是过去时。\n바람 是名词"风/势头"，引申为"（突发的）势头"。',
    rulesNote: '关键限制：\n1. 前半句只能是动词，不能是形容词\n2. 后半句必须是过去时（-았/었어요）\n3. 后半句通常是负面/意外结果\n4. 前后主语可以不同\n\n和 -기 때문에 差别：客观原因 vs 意外突发。',
    structures: [
      {
        ko: '갑자기 비가 오는 바람에 옷이 다 젖었어요',
        zh: '因为突然下雨，衣服全湿了。',
        tokens: [
          { text: '갑자기', role: 'plain' },
          { text: '비가', role: 'subject' },
          { text: '오는 바람에', role: 'verb' },
          { text: '옷이', role: 'subject' },
          { text: '다 젖었어요', role: 'verb' },
        ],
      },
      {
        ko: '지하철이 고장 나는 바람에 늦었어요',
        zh: '地铁出故障，所以迟到了。',
        tokens: [
          { text: '지하철이', role: 'subject' },
          { text: '고장 나는 바람에', role: 'verb' },
          { text: '늦었어요', role: 'verb' },
        ],
      },
      {
        ko: '핸드폰을 떨어뜨리는 바람에 화면이 깨졌어요',
        zh: '手机掉在地上，屏幕碎了。',
        tokens: [
          { text: '핸드폰을', role: 'object' },
          { text: '떨어뜨리는 바람에', role: 'verb' },
          { text: '화면이', role: 'subject' },
          { text: '깨졌어요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 갑자기 오는 바람에 약속을 못 지켰어요',
        zh: '朋友突然来，所以约会没赴成。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '갑자기', role: 'plain' },
          { text: '오는 바람에', role: 'verb' },
          { text: '약속을', role: 'object' },
          { text: '못 지켰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는 바람에', examples: '오다→오는 바람에 / 나다→나는 바람에 / 하다→하는 바람에' },
      { type: 'rule', text: '不接形容词，不接名词', examples: '피곤한 바람에 ✗ / 학생 바람에 ✗' },
      { type: 'rule', text: '后半句必须是过去时', examples: '늦었어요 / 젖었어요 / 못 지켰어요' },
      { type: 'usage', text: '前后主语可以不同（这是 -는 바람에 的特点）', examples: '지하철이 고장 나는 바람에 (내가) 늦었어요' },
      { type: 'usage', text: '后半句通常是负面/意外结果', examples: '옷이 젖었어요 / 다쳤어요 / 놓쳤어요 / 약속을 못 지켰어요' },
      { type: 'compare', text: '和 -기 때문에 差别：客观原因 vs 意外突发', examples: '비 때문에 늦었어요（一般）/ 비가 오는 바람에 늦었어요（意外突发）' },
      { type: 'note', text: '常和 갑자기（突然）搭配，强调意外性', examples: '갑자기 비가 오는 바람에 / 갑자기 전화가 오는 바람에' },
      { type: 'example', text: '갑자기 비가 오는 바람에 옷이 젖었어요 / 지하철 고장 나는 바람에 늦었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '갑자기', role: 'plain' },
          { text: '비가', role: 'subject' },
          { text: '오는 바람에', role: 'verb' },
          { text: '옷이', role: 'subject' },
          { text: '다 젖었어요', role: 'verb' },
        ],
        zh: '突然下雨，衣服全湿了。',
        swapWords: ['오는 바람에', '내리는 바람에', '쏟아지는 바람에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지하철이', role: 'subject' },
          { text: '고장 나는 바람에', role: 'verb' },
          { text: '늦었어요', role: 'verb' },
        ],
        zh: '地铁故障所以迟到。',
        swapWords: ['고장 나는 바람에', '멈추는 바람에', '지연되는 바람에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '핸드폰을', role: 'object' },
          { text: '떨어뜨리는 바람에', role: 'verb' },
          { text: '화면이', role: 'subject' },
          { text: '깨졌어요', role: 'verb' },
        ],
        zh: '手机掉了屏幕碎了。',
        swapWords: ['떨어뜨리는 바람에', '떨어지는 바람에', '부딪히는 바람에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '갑자기', role: 'plain' },
          { text: '오는 바람에', role: 'verb' },
          { text: '약속을', role: 'object' },
          { text: '못 지켰어요', role: 'verb' },
        ],
        zh: '朋友突然来所以没赴约。',
        swapWords: ['오는 바람에', '찾아오는 바람에', '방문하는 바람에'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '突然下雨', ko: '갑자기 비가 오는 바람에 옷이 다 젖었어요.', zh: '突然下雨衣服全湿。' },
      { icon: '🚇', context: '地铁故障', ko: '지하철이 고장 나는 바람에 지각했어요.', zh: '地铁故障所以迟到。' },
      { icon: '📱', context: '手机摔坏', ko: '핸드폰 떨어뜨리는 바람에 화면이 깨졌어요.', zh: '手机摔了屏幕碎。' },
      { icon: '💥', context: '意外冲突', ko: '친구가 갑자기 오는 바람에 약속 못 지켰어요.', zh: '朋友突然来所以没赴约。' },
      { icon: '🚗', context: '车祸事故', ko: '차가 갑자기 서는 바람에 부딪힐 뻔했어요.', zh: '车突然停差点撞上。' },
      { icon: '📵', context: '手机没电', ko: '핸드폰 배터리가 나가는 바람에 연락 못 했어요.', zh: '手机没电所以没联系上。' },
    ],
    mistakes: [
      { wrong: '피곤한 바람에 잤어요', correct: '피곤해서 잤어요', note: '-는 바람에 只接动词，不接形容词。原因是"感到累"用 -아/어서。' },
      { wrong: '비가 오는 바람에 옷이 젖어요', correct: '비가 오는 바람에 옷이 젖었어요', note: '后半句必须是过去时。-는 바람에 描述已发生的意外结果。' },
      { wrong: '오는 바람에 좋은 일이 생겼어요', correct: '오는 바람에 안 좋은 일이 생겼어요', note: '-는 바람에 后半句通常是负面结果。正面结果用 -는 덕분에。' },
      { wrong: '학생이는 바람에', correct: '학생이라서 / 학생이기 때문에', note: '-는 바람에 只接动词。名词用 이다 类的原因表达。' },
    ],
    quickTable: {
      title: '-는 바람에 用法要点',
      body: '几个关键限制条件。',
      headers: ['要点', '正确', '错误', '说明'],
      rows: [
        [{ ko: '词性', zh: '限制' }, { ko: '动词', zh: '오다→오는 바람에' }, { ko: '形容词', zh: '피곤한 바람에 ✗' }, '只接动词'],
        [{ ko: '时态', zh: '后半句' }, { ko: '过去时', zh: '늦었어요 ✓' }, { ko: '现在时', zh: '늦어요 ✗' }, '后半必须过去'],
        [{ ko: '倾向', zh: '后半句' }, { ko: '负面/意外', zh: '옷이 젖었어요' }, { ko: '正面/预期', zh: '기분이 좋아졌어요 ✗' }, '通常是负面'],
        [{ ko: '主语', zh: '前后' }, { ko: '可以不同', zh: '지하철이…내가…' }, { ko: '必须相同', zh: '不是' }, '主语灵活'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는 바람에 用法练习',
      body: '根据语境选出正确用法。',
      questions: [
        {
          prompt: '"因为突然下雨衣服湿了" → 갑자기 비가 ___ 옷이 다 젖었어요.',
          options: ['오기 때문에', '와서', '오는 바람에', '오길래'],
          answer: 2,
          explanation: '"意外突发原因导致意外结果" → -는 바람에。오다 → 오는 바람에。',
        },
        {
          prompt: '哪个句子使用 -는 바람에 是正确的？',
          options: [
            '피곤한 바람에 일찍 잤어요',
            '지하철 고장 나는 바람에 늦었어요',
            '오는 바람에 기분이 좋아졌어요',
            '학생이는 바람에 힘들어요',
          ],
          answer: 1,
          explanation: '-는 바람에 只接动词，后半句必须是过去时且通常负面。地铁故障→迟到 完全符合。',
        },
        {
          prompt: '"手机摔了屏幕碎了" → 핸드폰을 ___ 화면이 깨졌어요.',
          options: ['떨어뜨려서', '떨어뜨리는 바람에', '떨어뜨리기 때문에', '떨어뜨렸으니까'],
          answer: 1,
          explanation: '意外突发的原因导致意外结果 → -는 바람에。떨어뜨리다 → 떨어뜨리는 바람에。',
        },
        {
          prompt: '关于 -는 바람에 的用法特征，哪句最准确？',
          options: [
            '前后主语必须相同',
            '只能接动词，后半必须过去且通常负面',
            '前面可以接形容词表原因',
            '意思等同 -기 때문에',
          ],
          answer: 1,
          explanation: '-는 바람에 关键三个限制：只接动词、后半过去时、后半通常负面。这是它区别于 -기 때문에 的核心。',
        },
      ],
    },
    linkedGrammarIds: ['card-p7-l08', 'card-p24-l02'],
    step0Html: `<div class="card-title">-는 바람에</div>
<div class="card-body">"因为（意外）……所以……" —— 突发原因导致意外结果。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">一般原因 vs 意外原因</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-기 때문에（一般原因）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비 때문에 늦었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为下雨迟到了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 바람에（意外原因）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">갑자기 비가 오는 바람에 옷이 다 젖었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">突然下雨衣服全湿了。（意外+突发）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-는 바람에 三大限制：只接动词、后半过去时、后半通常负面。</div>`,
    compareHtml: `<div class="card-title">-는 바람에 vs -기 때문에</div>
<div class="card-body">两者都表原因，但语感、限制、结果倾向都不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기 때문에 → 一般原因</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">客观陈述原因（口语书面都用）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">일이 많기 때문에 야근했어요.</span><span style="font-size:16px;color:#5a4640">因为工作多加班了。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 바람에 → 意外突发原因</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">意外事件导致意外结果</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철 고장 나는 바람에 늦었어요.</span><span style="font-size:16px;color:#5a4640">地铁故障所以迟到。</span></div>
  </div>
</div>
<div class="reminder-box">一般原因用 -기 때문에；突发意外用 -는 바람에。搞错场合会显得不自然。</div>`,
    compareLabel: '-는 바람에 vs -기 때문에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 1 课</div>
    <div class="ov-hero-title">-는 바람에</div>
    <div class="ov-hero-sub">"因为（意外）……" · 突发原因+意外结果</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词词干 + <b style="color:#ff7fa8">는 바람에</b><br>
        限制：<b style="color:#2db89b">只接动词</b>，<b style="color:#2db89b">后半必须过去时</b>，<b style="color:#2db89b">后半通常负面</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        갑자기 비가 오는 바람에 옷이 다 젖었어요.<br>
        지하철이 고장 나는 바람에 늦었어요.<br>
        핸드폰을 떨어뜨리는 바람에 화면이 깨졌어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤한 바람에 잤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤해서 잤어요（形容词不能用）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오는 바람에 좋은 일이 생겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">正面结果用 -는 덕분에</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第2课：-는 통에 ──────────────────────────────────────
  {
    id: 'card-p24-l02',
    partNumber: 24,
    lessonNumber: 2,
    title: '-는 통에',
    whatItDoes: '因为（乱糟糟的）……',
    whatItDoesBody: '和 -는 바람에 相似，但 -는 통에 语气更强，强调"因为混乱/干扰的场面"导致后果。\n"通"字暗示"闹哄哄、乱七八糟"的场景。\n常用于人多、噪声大、事件复杂等场合。',
    structureNote: '结构：动词词干 + 는 통에。\n和 바람에 一样只接动词、后半通常过去时、负面结果。\n差别：바람에 强调"突发"，통에 强调"混乱/干扰"。',
    rulesNote: '典型场景：\n1. 人多闹哄哄（사람이 많은 통에）\n2. 打闹分心（싸우는 통에）\n3. 事件干扰（전화 오는 통에）\n\n和 -는 바람에 可以互换的场景很多，但 통에 语气更强，多用于负面吐槽。',
    structures: [
      {
        ko: '아이들이 소리 지르는 통에 정신이 없어요',
        zh: '孩子们大叫，让我头都晕了。',
        tokens: [
          { text: '아이들이', role: 'subject' },
          { text: '소리 지르는 통에', role: 'verb' },
          { text: '정신이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
      },
      {
        ko: '사람이 너무 많은 통에 친구를 못 찾았어요',
        zh: '人太多了，没找到朋友。',
        tokens: [
          { text: '사람이', role: 'subject' },
          { text: '너무', role: 'plain' },
          { text: '많은 통에', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '못 찾았어요', role: 'verb' },
        ],
      },
      {
        ko: '전화가 계속 오는 통에 일을 못 했어요',
        zh: '电话一直响个不停，工作没做成。',
        tokens: [
          { text: '전화가', role: 'subject' },
          { text: '계속', role: 'plain' },
          { text: '오는 통에', role: 'verb' },
          { text: '일을', role: 'object' },
          { text: '못 했어요', role: 'verb' },
        ],
      },
      {
        ko: '옆에서 떠드는 통에 잠을 못 잤어요',
        zh: '旁边一直吵闹，觉都没睡好。',
        tokens: [
          { text: '옆에서', role: 'place' },
          { text: '떠드는 통에', role: 'verb' },
          { text: '잠을', role: 'object' },
          { text: '못 잤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는 통에', examples: '오다→오는 통에 / 떠들다→떠드는 통에 / 지르다→지르는 통에' },
      { type: 'rule', text: '也接部分形容词（如 많다）+ 은 통에', examples: '많다→많은 통에 / 시끄럽다→시끄러운 통에' },
      { type: 'rule', text: '后半句必须是过去时或状态描述', examples: '못 잤어요 / 정신이 없어요' },
      { type: 'usage', text: '强调"混乱/干扰"的场景，比 바람에 语气更强', examples: '아이들이 소리 지르는 통에 / 사람이 많은 통에' },
      { type: 'compare', text: '和 -는 바람에 差别：突发 vs 混乱', examples: '지하철 고장 나는 바람에（突发）/ 사람 많은 통에（混乱）' },
      { type: 'note', text: '后半句常配 정신이 없다、못 -았다 等表达', examples: '떠드는 통에 정신이 없다 / 계속 오는 통에 못 했어요' },
      { type: 'note', text: '多用于负面吐槽的口语场合', examples: '떠드는 통에 짜증나요 / 사람 많은 통에 힘들었어요' },
      { type: 'example', text: '떠드는 통에 잠 못 잤어요 / 사람 많은 통에 친구 못 찾았어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아이들이', role: 'subject' },
          { text: '소리 지르는 통에', role: 'verb' },
          { text: '정신이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '孩子们大叫头都晕了。',
        swapWords: ['소리 지르는 통에', '떠드는 통에', '싸우는 통에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '사람이', role: 'subject' },
          { text: '너무', role: 'plain' },
          { text: '많은 통에', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '못 찾았어요', role: 'verb' },
        ],
        zh: '人太多没找到朋友。',
        swapWords: ['많은 통에', '몰리는 통에', '북적이는 통에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '전화가', role: 'subject' },
          { text: '계속', role: 'plain' },
          { text: '오는 통에', role: 'verb' },
          { text: '일을', role: 'object' },
          { text: '못 했어요', role: 'verb' },
        ],
        zh: '电话一直响没能工作。',
        swapWords: ['오는 통에', '울리는 통에', '걸려오는 통에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '옆에서', role: 'place' },
          { text: '떠드는 통에', role: 'verb' },
          { text: '잠을', role: 'object' },
          { text: '못 잤어요', role: 'verb' },
        ],
        zh: '旁边吵闹没睡好。',
        swapWords: ['떠드는 통에', '시끄럽게 하는 통에', '소음이 나는 통에'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📢', context: '孩子吵闹', ko: '아이들이 소리 지르는 통에 아무것도 못 했어요.', zh: '孩子大叫什么都没做成。' },
      { icon: '👥', context: '人多混乱', ko: '사람이 많은 통에 친구를 놓쳤어요.', zh: '人太多把朋友弄丢了。' },
      { icon: '📞', context: '电话不断', ko: '전화가 계속 오는 통에 회의에 집중 못 했어요.', zh: '电话一直响开会不专心。' },
      { icon: '😴', context: '睡眠打扰', ko: '이웃이 시끄럽게 하는 통에 잠을 못 잤어요.', zh: '邻居吵闹觉没睡好。' },
      { icon: '💥', context: '打架事件', ko: '옆 테이블에서 싸우는 통에 밥을 못 먹었어요.', zh: '邻桌打架饭都没吃完。' },
      { icon: '🚨', context: '警报混乱', ko: '경보가 울리는 통에 다들 뛰어나갔어요.', zh: '警报响起大家都冲出去了。' },
    ],
    mistakes: [
      { wrong: '피곤한 통에', correct: '피곤해서 / 피곤한 나머지', note: '피곤 是形容词表达状态，不表混乱场景。用 -아/어서 或 -는 나머지（下一课）。' },
      { wrong: '떠드는 통에 좋은 일이 생겼어요', correct: '떠드는 통에 잠 못 잤어요', note: '通에 后半句必须是负面/干扰结果，不能是正面结果。' },
      { wrong: '학생 통에', correct: '학생 때문에', note: '통에 不接名词（"많은 통에"是特例形容词化）。名词表原因用 -기 때문에 或 때문에。' },
      { wrong: '떠들 통에', correct: '떠드는 통에', note: '前必须是 -는 冠形形（现在时），不用未来 -을。' },
    ],
    quickTable: {
      title: '-는 통에 vs -는 바람에',
      body: '两者都是意外原因，选择靠场景语感。',
      headers: ['结构', '语感', '典型场景', '例句'],
      rows: [
        [{ ko: '-는 바람에', zh: '突发/意外' }, { ko: '客观突发', zh: '事故性' }, { ko: '天气/机械/意外', zh: '突发' }, { ko: '비가 오는 바람에 늦었어요', zh: '突然下雨迟到' }],
        [{ ko: '-는 통에', zh: '混乱/干扰' }, { ko: '主观吐槽', zh: '烦躁' }, { ko: '人群/噪声/打扰', zh: '混乱' }, { ko: '사람 많은 통에 못 찾았어요', zh: '人多找不到' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는 통에 用法练习',
      body: '根据语境选出正确用法。',
      questions: [
        {
          prompt: '"孩子们大叫头都晕了" → 아이들이 ___ 정신이 없어요.',
          options: ['소리 지르기 때문에', '소리 지르는 바람에', '소리 지르는 통에', '소리 질러서'],
          answer: 2,
          explanation: '"混乱/干扰"的场景 → -는 통에。바람에 强调突发，통에 强调混乱。',
        },
        {
          prompt: '"人太多没找到朋友" → 사람이 너무 ___ 친구를 못 찾았어요.',
          options: ['많기 때문에', '많은 통에', '많으니까', '많아서'],
          answer: 1,
          explanation: '人多混乱的场景 → 형容词 + 은 통에。많은 통에。',
        },
        {
          prompt: '哪个句子使用 -는 통에 最合适？',
          options: [
            '피곤한 통에 잤어요',
            '기분이 좋은 통에 노래를 불렀어요',
            '전화가 계속 오는 통에 일을 못 했어요',
            '학생 통에 힘들어요',
          ],
          answer: 2,
          explanation: '通에 用于混乱/干扰导致的负面结果。电话不断→工作没做 完全符合。',
        },
        {
          prompt: '关于 -는 통에 和 -는 바람에 的区别，哪句最准确？',
          options: [
            '两者完全相同',
            '통에 强调混乱/干扰，바람에 强调突发/意外',
            '통에 用未来，바람에 用过去',
            '통에 只用于书面语',
          ],
          answer: 1,
          explanation: '两者都是意外原因，但 통에 更强调"混乱、闹哄哄"的场景，语气比 바람에 更强、更主观。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l01', 'card-p24-l05'],
    step0Html: `<div class="card-title">-는 통에</div>
<div class="card-body">"因为（乱糟糟的）……" —— 混乱场景导致的负面结果。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">突发 vs 混乱</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 바람에（突发/意外）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">지하철 고장 나는 바람에 늦었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">地铁故障所以迟到。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 통에（混乱/干扰）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아이들이 떠드는 통에 잠을 못 잤어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">孩子吵闹觉没睡好。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-는 통에 语气更强，带主观吐槽。多用于人多、噪声、干扰的场景。</div>`,
    compareHtml: `<div class="card-title">-는 통에 vs -는 바람에</div>
<div class="card-body">两个"意外原因"表达的差别在"场景类型"和"语气强度"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 바람에 → 突发/事故性</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"事出突然"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오는 바람에 젖었어요.</span><span style="font-size:16px;color:#5a4640">突然下雨湿了。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 통에 → 混乱/干扰</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"闹哄哄让人烦"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사람이 많은 통에 놓쳤어요.</span><span style="font-size:16px;color:#5a4640">人太多没找到。</span></div>
  </div>
</div>
<div class="reminder-box">两者常可互换，但 통에 场景感更强、更带情绪。TOPIK 阅读题里辨析常见。</div>`,
    compareLabel: '-는 통에 vs -는 바람에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 2 课</div>
    <div class="ov-hero-title">-는 통에</div>
    <div class="ov-hero-sub">"因为（乱糟糟的）……" · 混乱场景导致负面</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词词干 + <b style="color:#ff7fa8">는 통에</b>：떠드는 통에<br>
        部分形容词 + <b style="color:#2db89b">은/ㄴ 통에</b>：많은 통에<br>
        后半必须是负面/干扰结果
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        아이들이 떠드는 통에 잠을 못 잤어요.<br>
        사람이 많은 통에 친구를 놓쳤어요.<br>
        전화가 계속 오는 통에 일을 못 했어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤한 통에</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">通常只接动词或场景形容词</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">떠드는 통에 좋은 일이 생겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">后半必须是负面/干扰结果</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第3课：-는 탓에 / -은 탓에 ──────────────────────────
  {
    id: 'card-p24-l03',
    partNumber: 24,
    lessonNumber: 3,
    title: '-는/은/ㄴ 탓에',
    whatItDoes: '因为……的错（归咎负面）',
    whatItDoesBody: '带"归咎/责怪"意味的原因表达。\n"都怪 A，才 B"，语气是把不好的结果归罪于 A。\n和 -는 덕분에（多亏）方向完全相反。',
    structureNote: '结构：\n· 动词现在 + 는 탓에\n· 动词过去/形容词 + 은/ㄴ 탓에\n· 名词 + 탓에（直接接）\n\n탓 本身是名词"责任、过失"。',
    rulesNote: '关键差别：\n· -는 바람에：意外突发（不带责怪）\n· -는 통에：混乱干扰（吐槽）\n· -는 탓에：明确归咎（"都怪……"）\n\n和 -는 덕분에 是对立的一对：\n· 좋은 결과 → 덕분에（多亏）\n· 나쁜 결과 → 탓에（都怪）',
    structures: [
      {
        ko: '늦게 잔 탓에 오늘 하루 종일 피곤해요',
        zh: '都怪昨晚睡晚了，今天一整天都很累。',
        tokens: [
          { text: '늦게', role: 'time' },
          { text: '잔 탓에', role: 'verb' },
          { text: '오늘 하루 종일', role: 'time' },
          { text: '피곤해요', role: 'verb' },
        ],
      },
      {
        ko: '길이 막히는 탓에 지각했어요',
        zh: '都怪堵车，迟到了。',
        tokens: [
          { text: '길이', role: 'subject' },
          { text: '막히는 탓에', role: 'verb' },
          { text: '지각했어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 온 탓에 소풍이 취소되었어요',
        zh: '因为下雨，郊游被取消了。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '온 탓에', role: 'verb' },
          { text: '소풍이', role: 'subject' },
          { text: '취소되었어요', role: 'verb' },
        ],
      },
      {
        ko: '내 실수 탓에 팀 전체가 손해를 봤어요',
        zh: '都怪我的失误，整个团队都吃了亏。',
        tokens: [
          { text: '내 실수 탓에', role: 'plain' },
          { text: '팀 전체가', role: 'subject' },
          { text: '손해를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 + 는 탓에', examples: '막히다→막히는 탓에 / 하다→하는 탓에' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 탓에', examples: '자다→잔 탓에 / 오다→온 탓에' },
      { type: 'rule', text: '形容词 + 은/ㄴ 탓에', examples: '피곤하다→피곤한 탓에 / 어렵다→어려운 탓에' },
      { type: 'rule', text: '名词 + 탓에（直接接）', examples: '비 탓에 / 실수 탓에 / 날씨 탓에' },
      { type: 'usage', text: '后半句必须是负面结果，带"归咎"语气', examples: '늦게 잔 탓에 피곤해요 / 실수 탓에 손해 봤어요' },
      { type: 'compare', text: '和 -는 덕분에 完全相反：都怪 vs 多亏', examples: '늦잠 잔 탓에 지각했어요 / 알람 덕분에 안 늦었어요' },
      { type: 'note', text: '"내 탓 / 네 탓 / 남의 탓" 是常用固定短语', examples: '내 탓이에요（都怪我）/ 네 탓 하지 마（别怪别人）' },
      { type: 'example', text: '늦게 잔 탓에 피곤해요 / 비 탓에 소풍 취소됐어요 / 실수 탓에 손해 봤어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '늦게', role: 'time' },
          { text: '잔 탓에', role: 'verb' },
          { text: '오늘', role: 'time' },
          { text: '피곤해요', role: 'verb' },
        ],
        zh: '都怪睡晚了今天累。',
        swapWords: ['잔 탓에', '늦잠 잔 탓에', '늦게 잔 탓에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '길이', role: 'subject' },
          { text: '막히는 탓에', role: 'verb' },
          { text: '지각했어요', role: 'verb' },
        ],
        zh: '都怪堵车迟到了。',
        swapWords: ['막히는 탓에', '복잡한 탓에', '혼잡한 탓에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '온 탓에', role: 'verb' },
          { text: '소풍이', role: 'subject' },
          { text: '취소되었어요', role: 'verb' },
        ],
        zh: '下雨郊游取消了。',
        swapWords: ['온 탓에', '내린 탓에', '쏟아진 탓에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '내 실수 탓에', role: 'plain' },
          { text: '팀 전체가', role: 'subject' },
          { text: '손해를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '都怪我的失误团队吃亏。',
        swapWords: ['내 실수 탓에', '내 잘못 탓에', '나 때문에'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😴', context: '睡晚累', ko: '늦잠 잔 탓에 하루 종일 피곤해요.', zh: '都怪睡晚了一天都累。' },
      { icon: '🚗', context: '堵车迟到', ko: '길이 막히는 탓에 지각했어요.', zh: '堵车迟到了。' },
      { icon: '🌧️', context: '雨天取消', ko: '비가 온 탓에 소풍이 취소됐어요.', zh: '下雨郊游被取消。' },
      { icon: '😔', context: '自责', ko: '내 실수 탓에 팀이 손해를 봤어요.', zh: '都怪我失误团队受损。' },
      { icon: '📚', context: '考不好', ko: '준비 부족 탓에 시험을 망쳤어요.', zh: '准备不足考砸了。' },
      { icon: '🥶', context: '感冒归因', ko: '어제 옷을 얇게 입은 탓에 감기에 걸렸어요.', zh: '昨天穿得薄感冒了。' },
    ],
    mistakes: [
      { wrong: '알람 탓에 안 늦었어요（正面结果）', correct: '알람 덕분에 안 늦었어요', note: '탓에 只用于负面结果的归咎。正面结果用 -는 덕분에。' },
      { wrong: '자는 탓에 피곤해요（想说睡晚了）', correct: '늦게 잔 탓에 피곤해요', note: '"睡晚了"是过去动作 → -은/ㄴ 탓에。자는 탓에 表示"现在在睡"，语义不对。' },
      { wrong: '학생인 탓에 힘들어요', correct: '학생인 탓에 힘들어요（也可）/ 학생이라서 힘들어요', note: '语法上可以，但名词直接 + 탓에 更自然：학생 신분 탓에。' },
      { wrong: '내 탓이야（正确）却在正面结果中用', correct: '正面结果用 덕분에', note: '탓 / 덕분 是对立方向，选错方向就是逻辑错误。' },
    ],
    quickTable: {
      title: '탓 vs 덕분：归咎与感激',
      body: '两个方向对立的表达。',
      headers: ['结构', '方向', '语感', '例句'],
      rows: [
        [{ ko: '-는 탓에', zh: '负面归咎' }, { ko: '都怪……', zh: '责怪' }, { ko: '负向', zh: '归罪' }, { ko: '늦게 잔 탓에 피곤해요', zh: '都怪睡晚了才累' }],
        [{ ko: '-는 덕분에', zh: '正面感激' }, { ko: '多亏……', zh: '感谢' }, { ko: '正向', zh: '感恩' }, { ko: '친구 덕분에 성공했어요', zh: '多亏朋友我成功了' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 탓에 用法练习',
      body: '根据词性、时态、方向选出正确表达。',
      questions: [
        {
          prompt: '"都怪睡晚了今天累" → 늦게 ___ 오늘 피곤해요.',
          options: ['자는 탓에', '잘 탓에', '잔 탓에', '자기 탓에'],
          answer: 2,
          explanation: '"睡晚了"是过去动作 → 过去冠形 -은/ㄴ 탓에。자다 → 잔 탓에。',
        },
        {
          prompt: '"都怪堵车迟到了" → 길이 ___ 지각했어요.',
          options: ['막히는 탓에', '막힌 탓에', '막힐 탓에', '막히기 탓에'],
          answer: 0,
          explanation: '"堵车"是持续状态 → 现在冠形 -는 탓에。막히다 → 막히는 탓에。',
        },
        {
          prompt: '哪个句子使用 탓에 是正确的？',
          options: [
            '알람 탓에 안 늦었어요',
            '친구 도움 탓에 성공했어요',
            '늦잠 잔 탓에 지각했어요',
            '좋은 날씨 탓에 기분이 좋아요',
          ],
          answer: 2,
          explanation: '탓에 只用于负面结果的归咎。睡晚了→迟到 是标准搭配。正面结果都要用 덕분에。',
        },
        {
          prompt: '关于 -는 탓에 和 -는 덕분에，哪句最准确？',
          options: [
            '两者意思相同',
            '탓에 用于负面归咎，덕분에 用于正面感激，方向对立',
            '탓에 只接名词',
            '덕분에 只用于书面语',
          ],
          answer: 1,
          explanation: '탓 vs 덕분 是韩语中最经典的对立方向。탓에 = 都怪 A 才 B（负面）；덕분에 = 多亏 A 才 B（正面）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p18-l05', 'card-p24-l04'],
    step0Html: `<div class="card-title">-는/은/ㄴ 탓에</div>
<div class="card-body">"都怪……才……" —— 负面归咎的原因表达。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">탓 vs 덕분 · 方向对立</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 탓에（都怪·负面）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">늦잠 잔 탓에 지각했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">都怪睡懒觉迟到了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 덕분에（多亏·正面）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">알람 덕분에 안 늦었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">多亏闹钟没迟到。</div>
    </div>
  </div>
</div>
<div class="reminder-box">탓 = 归咎；덕분 = 感激。选错方向就是逻辑颠倒。</div>`,
    compareHtml: `<div class="card-title">-는 탓에 vs -는 바람에</div>
<div class="card-body">两个都是负面原因，但语气侧重不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 바람에 → 意外突发</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">客观陈述"意外事件"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오는 바람에 젖었어요.</span><span style="font-size:16px;color:#5a4640">突然下雨湿了。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 탓에 → 明确归咎</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"都怪……才……"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 온 탓에 소풍이 취소됐어요.</span><span style="font-size:16px;color:#5a4640">因为下雨郊游被取消。（归咎）</span></div>
  </div>
</div>
<div class="reminder-box">-는 바람에 中性叙述意外；-는 탓에 带主观责怪。</div>`,
    compareLabel: '-는 탓에 vs -는 바람에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 3 课</div>
    <div class="ov-hero-title">-는/은/ㄴ 탓에</div>
    <div class="ov-hero-sub">"都怪……才……" · 负面归咎</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 탓에</b>：막히는 탓에<br>
        动词过去/形容词 → <b style="color:#2db89b">-은/ㄴ 탓에</b>：잔 탓에 / 피곤한 탓에<br>
        名词 → <b style="color:#6b7ff0">탓에</b>：비 탓에 / 실수 탓에<br>
        后半必须负面结果
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        늦게 잔 탓에 피곤해요.（都怪睡晚了才累）<br>
        비가 온 탓에 소풍이 취소됐어요.（下雨郊游取消）<br>
        내 실수 탓에 팀이 손해 봤어요.（都怪我失误团队受损）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">알람 탓에 안 늦었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">알람 덕분에（正面用 덕분에）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">자는 탓에 피곤해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦게 잔 탓에（过去动作用 -은/ㄴ）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第4课：-는 덕분에 vs -는 탓에 ─────────────────────────
  {
    id: 'card-p24-l04',
    partNumber: 24,
    lessonNumber: 4,
    title: '-는 덕분에 vs -는 탓에',
    whatItDoes: '多亏 vs 都怪',
    whatItDoesBody: '这一课把两个"归因型"连接词彻底分开。\n덕분에：多亏 · 感恩 · 后半句必须是正面结果。\n탓에：都怪 · 责怪 · 后半句必须是负面结果。\n韩国人口语里两个词区分很严格，用错会显得没礼貌或语义颠倒。',
    structureNote: '덕分에 结构：\n动词现在 → -는 덕분에\n动词过去/形容词 → -은/ㄴ 덕분에\n名词 → (이)ㄴ 덕분에 / 명사 덕분에\n\n탓에 结构对称，只是后半句必须负面。',
    rulesNote: '判断口诀：\n1. 结果好 → 덕분에（好事归功）\n2. 结果坏 → 탓에（坏事归咎）\n3. 客观陈述用 -기 때문에\n4. 意外突发用 -는 바람에\n\n덕분에 也可以单独作副词："덕분에 잘 지내요"（多亏问候语）。',
    structures: [
      {
        ko: '선생님 덕분에 시험에 합격했어요.',
        zh: '多亏老师，我通过了考试。',
        tokens: [
          { text: '선생님', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '시험에', role: 'object' },
          { text: '합격했어요', role: 'verb' },
        ],
      },
      {
        ko: '늦잠을 잔 탓에 회의에 늦었어요.',
        zh: '都怪睡懒觉，我开会迟到了。',
        tokens: [
          { text: '늦잠을', role: 'object' },
          { text: '잔', role: 'time' },
          { text: '탓에', role: 'plain' },
          { text: '회의에', role: 'object' },
          { text: '늦었어요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 도와준 덕분에 이사가 빨리 끝났어요.',
        zh: '多亏朋友帮忙，搬家很快就结束了。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '도와준', role: 'time' },
          { text: '덕분에', role: 'plain' },
          { text: '이사가', role: 'subject' },
          { text: '빨리', role: 'time' },
          { text: '끝났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '덕분에 后必须接正面结果，탓에 后必须接负面结果。', examples: '엄마 덕분에 살았어요 / 엄마 탓에 늦었어요' },
      { type: 'rule', text: '两者接续规则相同：动词现在 -는, 动词过去/形容词 -은/ㄴ, 名词 직접连接。', examples: '오는 덕분에 / 온 덕분에 / 비 덕분에' },
      { type: 'usage', text: '덕분에 常用于客套感谢，如 "덕분에 잘 지내요"（多亏您问候，我过得挺好）。', examples: '오랜만이에요, 덕분에 잘 지내요' },
      { type: 'usage', text: '탓에 语气重，含责怪意味；如果只想说客观原因，用 -기 때문에。', examples: '비 탓에（都怪雨）vs 비가 오기 때문에（因为下雨）' },
      { type: 'compare', text: '덕분에 vs 때문에：덕분에 只用于好事；때문에 中性可正可负。', examples: '너 덕분에 성공했어 vs 너 때문에 성공/실패했어' },
      { type: 'note', text: '"내 덕분에" 说自己的功劳会显得自大，通常说 "제 덕에" 或让别人夸自己。', examples: '× 내 덕분에 잘됐어요 → 격식 낮음' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '부모님', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '유학을', role: 'object' },
          { text: '갈', role: 'time' },
          { text: '수', role: 'time' },
          { text: '있었어요', role: 'verb' },
        ],
        zh: '多亏父母，我才能去留学。',
        swapWords: ['선생님', '친구', '언니', '여행', '어학연수', '취업'],
      },
      {
        wordBlocks: [
          { text: '길이', role: 'subject' },
          { text: '막힌', role: 'time' },
          { text: '탓에', role: 'plain' },
          { text: '약속에', role: 'object' },
          { text: '늦었어요', role: 'verb' },
        ],
        zh: '都怪路堵车，我约会迟到了。',
        swapWords: ['버스', '지하철', '차', '수업', '회의', '데이트'],
      },
      {
        wordBlocks: [
          { text: '네가', role: 'subject' },
          { text: '알려준', role: 'time' },
          { text: '덕분에', role: 'plain' },
          { text: '실수를', role: 'object' },
          { text: '피했어', role: 'verb' },
        ],
        zh: '多亏你提醒我，我避开了失误。',
        swapWords: ['사고', '지각', '오해'],
      },
    ],
    scenarios: [
      { icon: '🎓', context: '毕业感谢', ko: '교수님 덕분에 무사히 졸업했어요.', zh: '多亏教授，我顺利毕业了。' },
      { icon: '🚗', context: '责怪堵车', ko: '차가 막힌 탓에 비행기를 놓쳤어요.', zh: '都怪堵车，我错过了飞机。' },
      { icon: '💊', context: '感谢药效', ko: '이 약 덕분에 감기가 빨리 나았어요.', zh: '多亏这药，感冒好得快。' },
      { icon: '☔', context: '责怪下雨', ko: '비 탓에 소풍이 취소됐어요.', zh: '都怪下雨，郊游取消了。' },
      { icon: '📞', context: '客套问候', ko: '덕분에 잘 지내고 있어요.', zh: '托您的福，我过得挺好。' },
      { icon: '😔', context: '自责', ko: '제 실수 탓에 팀에 피해를 줬어요.', zh: '都怪我失误，给团队造成了损失。' },
    ],
    mistakes: [
      { wrong: '비 덕분에 소풍이 취소됐어요.', correct: '비 탓에 소풍이 취소됐어요.', note: '结果是负面（郊游取消）必须用 탓에，不能用 덕분에。' },
      { wrong: '너 탓에 시험에 합격했어.', correct: '너 덕분에 시험에 합격했어.', note: '结果是正面（合格）必须用 덕분에，탓에 会显得讽刺或错乱。' },
      { wrong: '내 덕분에 성공했어요.', correct: '제 노력 덕분에 성공했어요.', note: '直接说"多亏我"显得自夸，一般说"多亏我的努力/大家"。' },
      { wrong: '자는 덕분에 피곤이 풀렸어요.', correct: '푹 잔 덕분에 피곤이 풀렸어요.', note: '덕분에 前动词强调完成，用 -은/ㄴ 形式。' },
    ],
    quickTable: {
      title: '덕분에 vs 탓에 vs 때문에',
      headers: ['连接词', '结果色彩', '语气', '例句'],
      rows: [
        ['덕분에', '正面 ✓', '感恩', '너 덕분에 살았어'],
        ['탓에', '负面 ✗', '责怪', '너 탓에 늦었어'],
        ['때문에', '中性', '客观', '너 때문에 왔어'],
        ['바람에', '意外负面', '突发', '차가 고장 나는 바람에'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '덕분에 or 탓에？',
      body: '根据后半句选择正确连接词。',
      questions: [
        {
          prompt: '"多亏朋友，我找到了工作"应该填：친구 ___ 취직했어요.',
          options: ['덕분에', '탓에', '바람에', '때문에'],
          answer: 0,
          explanation: '结果是"找到工作"正面 → 덕분에。',
        },
        {
          prompt: '"都怪堵车迟到了"应该填：길이 막힌 ___ 늦었어요.',
          options: ['덕분에', '탓에', '덕에', '김에'],
          answer: 1,
          explanation: '结果是"迟到"负面 → 탓에。',
        },
        {
          prompt: '哪句自然？',
          options: [
            '엄마 탓에 요리를 잘해요.',
            '엄마 덕분에 요리를 잘해요.',
            '엄마 바람에 요리를 잘해요.',
            '엄마 나머지 요리를 잘해요.',
          ],
          answer: 1,
          explanation: '"擅长做菜"是正面结果 → 덕분에。',
        },
        {
          prompt: '哪句语法错误？',
          options: [
            '늦잠을 잔 탓에 지각했어요.',
            '선생님 덕분에 합격했어요.',
            '자는 탓에 피곤해요.',
            '비 탓에 취소됐어요.',
          ],
          answer: 2,
          explanation: '"자는 탓에" 时态错误，应用过去 -은/ㄴ → "늦게 잔 탓에"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l03'],
    step0Html: `<div class="hook-box">
  两个"因为"，一个是<b style="color:#2db89b">感恩</b>，一个是<b style="color:#e05555">责怪</b>。<br>
  说错了，好话变讽刺，谢意变埋怨。<br>
  这一课把 <b>덕분에</b> 和 <b>탓에</b> 彻底分开。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div style="background:#eaf8f5;padding:12px;border-radius:12px">
      <div style="color:#2db89b;font-weight:700">덕분에 · 多亏</div>
      <div style="font-size:14px;color:#241917;margin-top:6px">后半必须正面<br>너 덕분에 살았어</div>
    </div>
    <div style="background:#fdecec;padding:12px;border-radius:12px">
      <div style="color:#e05555;font-weight:700">탓에 · 都怪</div>
      <div style="font-size:14px;color:#241917;margin-top:6px">后半必须负面<br>너 탓에 늦었어</div>
    </div>
  </div>
</div>`,
    compareLabel: '덕분에 vs 탓에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 4 课</div>
    <div class="ov-hero-title">-는 덕분에 vs -는 탓에</div>
    <div class="ov-hero-sub">感恩用 덕분에，责怪用 탓에</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心区别</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b style="color:#2db89b">덕분에</b>：后半必须<b>正面</b>结果<br>
        <b style="color:#e05555">탓에</b>：后半必须<b>负面</b>结果<br>
        中性因果 → <b style="color:#6b7ff0">-기 때문에</b><br>
        意外突发 → <b>-는 바람에</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        선생님 덕분에 시험에 합격했어요.<br>
        늦잠을 잔 탓에 지각했어요.<br>
        덕분에 잘 지내요.（客套问候）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비 덕분에 취소됐어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비 탓에（负面用 탓에）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내 덕분에 성공했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">제 노력 덕분에（不自夸）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第5课：-는 나머지 ─────────────────────────────────────
  {
    id: 'card-p24-l05',
    partNumber: 24,
    lessonNumber: 5,
    title: '-는 나머지',
    whatItDoes: '过于……以至于',
    whatItDoesBody: '表达"因为极端的情绪/状态，做出了通常不会做的事"。\n"나머지"本意"剩下的部分"，语法化后表达"情绪满到溢出，剩下的部分导致了后果"。\n用于书面语、小说、新闻，口语很少用。',
    structureNote: '结构：\n动词/形容词现在 → -는 나머지\n动词过去 → -은/ㄴ 나머지\n形容词过去 → -았/었던 나머지\n后半句必须是过去时（表达实际结果）。',
    rulesNote: '关键点：\n1. 前半通常是强烈的情绪或状态（긴장, 놀라, 화가 나, 기쁘, 슬프）\n2. 后半是"极端反应"（쓰러지다, 소리를 지르다, 말을 못 하다）\n3. 书面感强，口语用 -어서 或 너무 -아서\n4. 不能与将来时或命令句配合',
    structures: [
      {
        ko: '너무 긴장한 나머지 말을 잊어버렸어요.',
        zh: '因为太紧张，把话都忘了。',
        tokens: [
          { text: '너무', role: 'time' },
          { text: '긴장한', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '말을', role: 'object' },
          { text: '잊어버렸어요', role: 'verb' },
        ],
      },
      {
        ko: '놀란 나머지 자리에서 벌떡 일어났어요.',
        zh: '吃惊得从座位上腾地站了起来。',
        tokens: [
          { text: '놀란', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '자리에서', role: 'object' },
          { text: '벌떡', role: 'time' },
          { text: '일어났어요', role: 'verb' },
        ],
      },
      {
        ko: '기쁜 나머지 눈물이 났어요.',
        zh: '高兴得眼泪都流出来了。',
        tokens: [
          { text: '기쁜', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '눈물이', role: 'subject' },
          { text: '났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词过去用 -은/ㄴ 나머지，动词现在用 -는 나머지。', examples: '놀란 나머지 / 걱정하는 나머지' },
      { type: 'rule', text: '形容词现在用 -(으)ㄴ 나머지，如 기쁘다 → 기쁜 나머지。', examples: '기쁜 나머지 / 슬픈 나머지' },
      { type: 'usage', text: '前半通常是"极端心理/生理状态"：긴장, 놀라, 화나, 기쁘, 슬프, 무서워。', examples: '무서운 나머지 소리를 질렀어요' },
      { type: 'usage', text: '后半必须是过去时，且是"通常不做的极端反应"。', examples: '화가 난 나머지 물건을 던졌다' },
      { type: 'note', text: '口语中很少用，多在小说、新闻、正式书面语出现。', examples: '书: 그는 놀란 나머지 / 口: 너무 놀라서' },
      { type: 'compare', text: '和 -아서 比：-아서 通用；나머지 强调"情绪太满以至于失控"，书面色彩。', examples: '놀라서 소리쳤다 / 놀란 나머지 소리쳤다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '너무', role: 'time' },
          { text: '놀란', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '소리를', role: 'object' },
          { text: '질렀어요', role: 'verb' },
        ],
        zh: '因为太吃惊，我大叫了一声。',
        swapWords: ['화난', '무서운', '기쁜', '비명', '박수', '한숨'],
      },
      {
        wordBlocks: [
          { text: '슬픈', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '며칠', role: 'time' },
          { text: '동안', role: 'plain' },
          { text: '아무', role: 'time' },
          { text: '말도', role: 'object' },
          { text: '안', role: 'time' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '因为太伤心，几天都没说话。',
        swapWords: ['우울한', '실망한', '허탈한'],
      },
      {
        wordBlocks: [
          { text: '긴장한', role: 'time' },
          { text: '나머지', role: 'plain' },
          { text: '이름을', role: 'object' },
          { text: '잘못', role: 'time' },
          { text: '말했어요', role: 'verb' },
        ],
        zh: '因为太紧张，把名字都说错了。',
        swapWords: ['답', '주소', '전화번호'],
      },
    ],
    scenarios: [
      { icon: '😱', context: '受惊过度', ko: '놀란 나머지 컵을 떨어뜨렸어요.', zh: '吃惊得把杯子掉了。' },
      { icon: '😭', context: '过度悲伤', ko: '슬픈 나머지 밤새 울었어요.', zh: '伤心得哭了一整夜。' },
      { icon: '😤', context: '气到失控', ko: '화가 난 나머지 문을 세게 닫았어요.', zh: '气得把门用力关上了。' },
      { icon: '🎉', context: '喜极而泣', ko: '기쁜 나머지 눈물을 흘렸어요.', zh: '高兴得流下了眼泪。' },
      { icon: '😰', context: '过度紧张', ko: '너무 긴장한 나머지 손이 떨렸어요.', zh: '紧张得手都在抖。' },
      { icon: '📖', context: '书面报道', ko: '피해자는 충격을 받은 나머지 실신했다.', zh: '受害者受到冲击，昏了过去。' },
    ],
    mistakes: [
      { wrong: '기쁠 나머지 눈물이 났어요.', correct: '기쁜 나머지 눈물이 났어요.', note: '形容词现在时需用 -(으)ㄴ，不是 -(으)ㄹ。' },
      { wrong: '놀란 나머지 소리를 지를 거예요.', correct: '놀란 나머지 소리를 질렀어요.', note: '后半必须过去时，不能用将来时。' },
      { wrong: '피곤한 나머지 잠깐 쉬었어요.', correct: '너무 피곤한 나머지 쓰러졌어요.', note: '"잠깐 쉬다"是普通反应，나머지 需极端结果。' },
      { wrong: '배고픈 나머지 밥 먹었어요.', correct: '너무 배고픈 나머지 세 그릇이나 먹었어요.', note: '普通吃饭不适合 나머지，需夸张结果。' },
    ],
    quickTable: {
      title: '나머지 前项形态',
      headers: ['词类', '时态', '形式', '例'],
      rows: [
        ['动词', '现在', '-는 나머지', '걱정하는 나머지'],
        ['动词', '过去', '-은/ㄴ 나머지', '놀란 나머지'],
        ['形容词', '现在', '-(으)ㄴ 나머지', '기쁜 나머지'],
        ['名词', '×', '不接名词', '需用 (이)ㄴ 나머지 慎用'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '나머지 变形练习',
      body: '选择正确的 -나머지 形式。',
      questions: [
        {
          prompt: '너무 기쁘다 + 나머지 = ？',
          options: ['기쁘는 나머지', '기쁜 나머지', '기쁠 나머지', '기뻐서 나머지'],
          answer: 1,
          explanation: '形容词现在时 → -(으)ㄴ 나머지，기쁘다 → 기쁜 나머지。',
        },
        {
          prompt: '놀라다（过去）+ 나머지 = ？',
          options: ['놀라는 나머지', '놀란 나머지', '놀랐는 나머지', '놀랄 나머지'],
          answer: 1,
          explanation: '动词过去时 → -은/ㄴ 나머지，놀라다 → 놀란 나머지。',
        },
        {
          prompt: '哪句最自然？',
          options: [
            '배고픈 나머지 밥 먹었어요.',
            '슬픈 나머지 밤새 울었어요.',
            '기쁘는 나머지 웃었어요.',
            '화가 나는 나머지 화냈어요.',
          ],
          answer: 1,
          explanation: '나머지 需"极端反应"，选项 B 符合。A 结果太普通，C 时态错，D 后半重复表意。',
        },
        {
          prompt: '哪句时态错误？',
          options: [
            '놀란 나머지 소리를 질렀어요.',
            '기쁜 나머지 눈물이 났어요.',
            '긴장한 나머지 말을 못 할 거예요.',
            '슬픈 나머지 며칠을 울었어요.',
          ],
          answer: 2,
          explanation: '나머지 后半必须过去时，选项 C 用了将来时错。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l01', 'card-p24-l02'],
    step0Html: `<div class="hook-box">
  情绪像水，装满就会溢出——溢出后<b style="color:#ff7fa8">做出了平时不会做的事</b>。<br>
  这就是<b>-는/은 나머지</b>：过于……以至于。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">-아서 vs 나머지</div>
    <div style="font-size:14px;color:#241917">
      기뻐서 웃었어요.（普通因果）<br>
      기쁜 나머지 눈물이 났어요.（<b>情绪满溢导致意外反应</b>·书面）
    </div>
  </div>
</div>`,
    compareLabel: '-아서 vs 나머지',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 5 课</div>
    <div class="ov-hero-title">-는/은 나머지</div>
    <div class="ov-hero-sub">"情绪太满以至于……" · 书面语</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-는 나머지</b><br>
        动词过去 → <b>-은/ㄴ 나머지</b><br>
        形容词现在 → <b>-(으)ㄴ 나머지</b><br>
        后半必须过去时 + 极端反应
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        놀란 나머지 소리를 질렀어요.<br>
        긴장한 나머지 말을 잊어버렸어요.<br>
        기쁜 나머지 눈물이 났어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">기쁠 나머지 눈물이 났어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">기쁜 나머지（形容词用 -ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">놀란 나머지 소리를 지를 거예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">질렀어요（后半必须过去时）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第6课：-는 관계로 ─────────────────────────────────────
  {
    id: 'card-p24-l06',
    partNumber: 24,
    lessonNumber: 6,
    title: '-는 관계로',
    whatItDoes: '由于……（书面/公告）',
    whatItDoesBody: '"관계로"是原因连接词的公文体、书面体。\n意思等同于 -기 때문에，但语气更正式、客观。\n常出现在通告、公告、新闻、说明文中，用于陈述客观、无法改变的原因。',
    structureNote: '结构：\n动词现在 → -는 관계로\n动词过去/形容词 → -은/ㄴ 관계로\n名词 → -인 관계로 / 명사 관계로\n\n"관계"本意"关系"，语法化后表"由于……关系"。',
    rulesNote: '使用要点：\n1. 只用于书面/正式场合（公告、通知、公文、演讲）\n2. 口语中说 -기 때문에 或 -아/어서\n3. 后半通常是客观决定或结果（휴무, 취소, 연기, 종료）\n4. 不带感情色彩，很客观',
    structures: [
      {
        ko: '내부 공사 관계로 오늘 휴무입니다.',
        zh: '由于内部装修，今日停业。',
        tokens: [
          { text: '내부', role: 'time' },
          { text: '공사', role: 'subject' },
          { text: '관계로', role: 'plain' },
          { text: '오늘', role: 'time' },
          { text: '휴무입니다', role: 'verb' },
        ],
      },
      {
        ko: '개인 사정이 있는 관계로 회의에 참석하지 못합니다.',
        zh: '由于个人原因，我无法出席会议。',
        tokens: [
          { text: '개인', role: 'time' },
          { text: '사정이', role: 'subject' },
          { text: '있는', role: 'time' },
          { text: '관계로', role: 'plain' },
          { text: '회의에', role: 'object' },
          { text: '참석하지', role: 'verb' },
          { text: '못합니다', role: 'verb' },
        ],
      },
      {
        ko: '태풍이 오는 관계로 행사가 취소됐습니다.',
        zh: '由于台风来袭，活动取消。',
        tokens: [
          { text: '태풍이', role: 'subject' },
          { text: '오는', role: 'time' },
          { text: '관계로', role: 'plain' },
          { text: '행사가', role: 'subject' },
          { text: '취소됐습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在用 -는 관계로，动词过去/形容词用 -은/ㄴ 관계로。', examples: '오는 관계로 / 온 관계로 / 바쁜 관계로' },
      { type: 'rule', text: '名词用 -인 관계로 或 명사 관계로（第二种直接跟）。', examples: '공사 관계로 / 학생인 관계로' },
      { type: 'usage', text: '公告、通知常用格式："(원인) 관계로 (결과)"。', examples: '점검 관계로 서비스가 중단됩니다' },
      { type: 'usage', text: '口语几乎不用，同义口语表达是 -기 때문에 / -아서。', examples: '书: 공사 관계로 휴무 / 口: 공사 때문에 문 닫아요' },
      { type: 'note', text: '不用于个人情感原因；不说 "슬픈 관계로 못 갔어요"。', examples: '× 슬픈 관계로 → ○ 슬퍼서 / 개인 사정 관계로' },
      { type: 'compare', text: '관계로 vs 때문에：관계로 更客观、公文化；때문에 中性通用。', examples: '공사 관계로 휴무 vs 공사 때문에 쉬어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시설', role: 'time' },
          { text: '점검', role: 'subject' },
          { text: '관계로', role: 'plain' },
          { text: '내일', role: 'time' },
          { text: '지하철', role: 'subject' },
          { text: '운행이', role: 'subject' },
          { text: '지연됩니다', role: 'verb' },
        ],
        zh: '由于设施检修，明日地铁运行将延迟。',
        swapWords: ['버스', '기차', '엘리베이터', '공사', '수리', '정비'],
      },
      {
        wordBlocks: [
          { text: '갑작스러운', role: 'time' },
          { text: '사정이', role: 'subject' },
          { text: '생긴', role: 'time' },
          { text: '관계로', role: 'plain' },
          { text: '오늘', role: 'time' },
          { text: '수업은', role: 'object' },
          { text: '취소하겠습니다', role: 'verb' },
        ],
        zh: '由于突发情况，今天的课取消。',
        swapWords: ['회의', '행사', '모임'],
      },
      {
        wordBlocks: [
          { text: '연말인', role: 'time' },
          { text: '관계로', role: 'plain' },
          { text: '배송이', role: 'subject' },
          { text: '늦어질', role: 'time' },
          { text: '수', role: 'time' },
          { text: '있습니다', role: 'verb' },
        ],
        zh: '由于年底，配送可能延迟。',
        swapWords: ['처리', '답변', '환불'],
      },
    ],
    scenarios: [
      { icon: '🏢', context: '店铺公告', ko: '내부 공사 관계로 임시 휴업합니다.', zh: '由于内部装修，暂停营业。' },
      { icon: '🚇', context: '地铁广播', ko: '고장 관계로 운행이 중단됩니다.', zh: '由于故障，暂停运行。' },
      { icon: '📅', context: '会议延期', ko: '일정 조정 관계로 회의가 연기됩니다.', zh: '由于日程调整，会议延期。' },
      { icon: '🌪️', context: '天气取消', ko: '태풍 관계로 행사가 취소됐습니다.', zh: '由于台风，活动取消。' },
      { icon: '📚', context: '正式请假', ko: '개인 사정 관계로 결근하겠습니다.', zh: '由于个人原因，请假。' },
      { icon: '💻', context: '系统维护', ko: '시스템 점검 관계로 서비스가 일시 중단됩니다.', zh: '由于系统维护，服务暂停。' },
    ],
    mistakes: [
      { wrong: '너 관계로 슬퍼요.', correct: '너 때문에 슬퍼요.', note: '个人情感原因不用 관계로，用 때문에。' },
      { wrong: '공사 관계로 쉬어요.', correct: '공사 관계로 휴무입니다.', note: '관계로 是书面公告体，后半应用格式体 -ㅂ니다。' },
      { wrong: '피곤한 관계로 잤어요.', correct: '피곤한 관계로 조퇴했습니다.', note: '"睡觉"日常口语，与书面 관계로 不搭；正式场合应说"早退"。' },
      { wrong: '사정 있는 관계로 못 가.', correct: '사정이 있는 관계로 참석하지 못합니다.', note: '관계로 需正式敬语（-ㅂ니다），且主语需 이/가。' },
    ],
    quickTable: {
      title: '관계로 前项接续',
      headers: ['词类', '形式', '例'],
      rows: [
        ['动词现在', '-는 관계로', '오는 관계로'],
        ['动词过去', '-은/ㄴ 관계로', '온 관계로'],
        ['形容词', '-(으)ㄴ 관계로', '바쁜 관계로'],
        ['名词', '명사 관계로 / -인 관계로', '공사 관계로 / 학생인 관계로'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '관계로 用法判断',
      body: '选择正确或最自然的一句。',
      questions: [
        {
          prompt: '公告板："由于设施检修暂停营业"，正确说法：',
          options: [
            '시설 점검 관계로 영업을 중단합니다.',
            '시설 점검 관계로 영업 안 해요.',
            '시설 점검 나머지 문 닫아요.',
            '시설 점검 바람에 영업 중단.',
          ],
          answer: 0,
          explanation: '관계로 需搭配 -ㅂ니다 格式体，选项 A 最规范。',
        },
        {
          prompt: '哪句错？',
          options: [
            '태풍 관계로 취소됐습니다.',
            '개인 사정 관계로 결근합니다.',
            '너 관계로 슬퍼요.',
            '공사 관계로 임시 휴업합니다.',
          ],
          answer: 2,
          explanation: '관계로 不用于个人情感，"너 관계로" 错，应用 "너 때문에"。',
        },
        {
          prompt: '"由于年底"最自然：',
          options: ['연말 관계로', '연말이는 관계로', '연말인 관계로', '연말을 관계로'],
          answer: 2,
          explanation: '名词接 -인 관계로 更自然（也可直接 연말 관계로，但两选项时选 인 版本）。',
        },
        {
          prompt: '"由于台风来袭活动取消"哪句符合公告体？',
          options: [
            '태풍이 오는 관계로 행사가 취소됐습니다.',
            '태풍이 온 관계로 행사가 취소됐어.',
            '태풍이 왔는 관계로 행사가 취소됐어요.',
            '태풍이 오는 나머지 행사가 취소됐어요.',
          ],
          answer: 0,
          explanation: '관계로 需 -ㅂ니다 结尾；"태풍이 오는" 是当前正在发生的原因。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l01', 'card-p24-l04'],
    step0Html: `<div class="hook-box">
  地铁广播、店铺公告、公司通知——你会经常听到这四个字：<b style="color:#ff7fa8">관계로</b>。<br>
  这是韩语公文体最爱的"原因"连接词。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#eaf8f5;padding:12px;border-radius:12px">
    <div style="color:#2db89b;font-weight:700;margin-bottom:6px">口语 vs 公告</div>
    <div style="font-size:14px;color:#241917">
      口语：공사 때문에 문 닫아요.<br>
      公告：<b>공사 관계로 임시 휴업합니다.</b>
    </div>
  </div>
</div>`,
    compareLabel: '때문에 vs 관계로',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 6 课</div>
    <div class="ov-hero-title">-는 관계로</div>
    <div class="ov-hero-sub">"由于……" · 公告/公文书面体</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-는 관계로</b>：오는 관계로<br>
        动词过去/形容词 → <b>-은/ㄴ 관계로</b>：온 관계로 / 바쁜 관계로<br>
        名词 → <b>명사 관계로 / -인 관계로</b><br>
        后半用 -ㅂ니다 格式体
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        내부 공사 관계로 오늘 휴무입니다.<br>
        태풍이 오는 관계로 행사가 취소됐습니다.<br>
        개인 사정 관계로 결근하겠습니다.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">너 관계로 슬퍼요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">너 때문에 슬퍼요（个人情感用 때문에）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">공사 관계로 쉬어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">공사 관계로 휴무입니다（公告用 -ㅂ니다）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第7课：-는 김에 ───────────────────────────────────────
  {
    id: 'card-p24-l07',
    partNumber: 24,
    lessonNumber: 7,
    title: '-는 김에',
    whatItDoes: '趁着·借机顺便',
    whatItDoesBody: '"김"字面意为"势头/正在做的事的势头"。\n表达"既然正在做某事（或做过），趁这个机会顺便做另一件事"。\n后半通常是"顺便完成、附加的动作"。',
    structureNote: '结构：\n动词现在 → -는 김에\n动词过去 → -은/ㄴ 김에\n只接动词，不接形容词、名词。\n后半没有时态限制。',
    rulesNote: '要点：\n1. 前半必须是动作（动词），主语与后半通常一致\n2. 前后两个动作应有关联（不能毫无关系）\n3. 常与"오다/가다/하다/사다/만나다"配合\n4. 语义"借机做另一件与之相关的事"',
    structures: [
      {
        ko: '시장에 가는 김에 우유도 사 왔어요.',
        zh: '趁着去市场，顺便买了牛奶回来。',
        tokens: [
          { text: '시장에', role: 'object' },
          { text: '가는', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '우유도', role: 'object' },
          { text: '사', role: 'verb' },
          { text: '왔어요', role: 'verb' },
        ],
      },
      {
        ko: '말이 나온 김에 저녁 약속을 정합시다.',
        zh: '既然提起来了，那就顺便定下晚饭约会吧。',
        tokens: [
          { text: '말이', role: 'subject' },
          { text: '나온', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '저녁', role: 'time' },
          { text: '약속을', role: 'object' },
          { text: '정합시다', role: 'verb' },
        ],
      },
      {
        ko: '청소하는 김에 창문도 닦았어요.',
        zh: '趁着打扫，把窗户也擦了。',
        tokens: [
          { text: '청소하는', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '창문도', role: 'object' },
          { text: '닦았어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在用 -는 김에，动词过去用 -은/ㄴ 김에。', examples: '가는 김에 / 온 김에' },
      { type: 'rule', text: '只接动词，不接形容词、名词。', examples: '× 예쁜 김에 / × 학생 김에' },
      { type: 'usage', text: '前后动作应"顺便相关"：出门→买东西、见面→聊事、打扫→擦窗。', examples: '외출하는 김에 편지도 부쳤어요' },
      { type: 'usage', text: '常和 "도"（也）搭配，强调"顺便还……"。', examples: '가는 김에 우유도, 빵도 샀어요' },
      { type: 'compare', text: '김에 vs 겸：김에 强调"顺便"；-(으)ㄹ 겸 强调"兼有两个目的"。', examples: '가는 김에 사 왔어요 / 운동할 겸 걸어요' },
      { type: 'note', text: '"이왕 …는 김에" 语气更强，"既然都做了那就……"。', examples: '이왕 온 김에 커피 한잔해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '서울에', role: 'object' },
          { text: '온', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '친구도', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
        zh: '趁来首尔，也见了朋友。',
        swapWords: ['부산', '제주', '인천', '가족', '선배', '동생'],
      },
      {
        wordBlocks: [
          { text: '요리하는', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '도시락도', role: 'object' },
          { text: '쌌어요', role: 'verb' },
        ],
        zh: '趁着做饭，还打包了便当。',
        swapWords: ['간식', '반찬', '샌드위치'],
      },
      {
        wordBlocks: [
          { text: '말이', role: 'subject' },
          { text: '나온', role: 'time' },
          { text: '김에', role: 'plain' },
          { text: '하나', role: 'time' },
          { text: '더', role: 'time' },
          { text: '물어봐도', role: 'verb' },
          { text: '돼요?', role: 'verb' },
        ],
        zh: '既然说到这，我能再问一个问题吗？',
        swapWords: ['한 가지', '한 개'],
      },
    ],
    scenarios: [
      { icon: '🛒', context: '买菜顺便', ko: '슈퍼에 가는 김에 계란 좀 사다 줄래?', zh: '你去超市顺便买点鸡蛋好吗？' },
      { icon: '🧹', context: '打扫顺便', ko: '청소하는 김에 빨래도 돌렸어요.', zh: '趁着打扫，把衣服也洗了。' },
      { icon: '☕', context: '来了顺便', ko: '이왕 온 김에 커피 한잔해요.', zh: '既然都来了，喝杯咖啡吧。' },
      { icon: '📞', context: '话题引申', ko: '말이 나온 김에 다음 주 계획도 이야기하자.', zh: '既然说起来了，下周计划也聊一下吧。' },
      { icon: '✈️', context: '出差顺便', ko: '출장 가는 김에 관광도 하려고요.', zh: '趁着出差，也想顺便观光。' },
      { icon: '🍳', context: '做饭顺便', ko: '밥하는 김에 국도 끓였어요.', zh: '趁着做饭，也熬了汤。' },
    ],
    mistakes: [
      { wrong: '예쁜 김에 사진 찍어요.', correct: '온 김에 사진 찍어요.', note: '김에 只接动词，不接形容词。' },
      { wrong: '학생 김에 열심히 공부해요.', correct: '학생일 때 열심히 공부하세요.', note: '김에 不接名词；表"当……的时候"应用 -(으)ㄹ 때。' },
      { wrong: '가 김에 우유 사 왔어요.', correct: '가는 김에 우유 사 왔어요.', note: '前面动词必须加冠形词形 -는/-(으)ㄴ。' },
      { wrong: '먹는 김에 잤어요.', correct: '먹는 김에 물도 마셨어요.', note: '前后动作须相关；"吃饭"和"睡觉"无逻辑联系，김에 不合适。' },
    ],
    quickTable: {
      title: '김에 前项形态',
      headers: ['时态', '形式', '例', '含义'],
      rows: [
        ['现在', '-는 김에', '가는 김에', '正在去…趁便'],
        ['过去', '-은/ㄴ 김에', '온 김에', '既然来了…借机'],
        ['既然', '이왕 -는/은 김에', '이왕 온 김에', '语气加强'],
        ['×名词', '不可', '× 학생 김에', '需用 -(으)ㄹ 때'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '김에 用法练习',
      body: '选择正确形式。',
      questions: [
        {
          prompt: '"趁着去邮局，把税金也交了"应该填：우체국에 ___ 세금도 냈어요.',
          options: ['가는 김에', '갔는 김에', '갈 김에', '가서 김에'],
          answer: 0,
          explanation: '现在正在去的动作 → -는 김에。',
        },
        {
          prompt: '"既然来了，坐会儿再走"应该填：이왕 ___ 좀 앉았다 가세요.',
          options: ['오는 김에', '온 김에', '올 김에', '와서 김에'],
          answer: 1,
          explanation: '"来了（已完成）"用过去冠形词 -(으)ㄴ → 온 김에。',
        },
        {
          prompt: '哪句错？',
          options: [
            '가는 김에 편지 부쳤어요.',
            '온 김에 사진 찍어요.',
            '예쁜 김에 사진 찍어요.',
            '말이 나온 김에 얘기해요.',
          ],
          answer: 2,
          explanation: '김에 只接动词，"예쁘다" 是形容词错。',
        },
        {
          prompt: '哪句最自然？',
          options: [
            '자는 김에 텔레비전을 봤어요.',
            '먹는 김에 잤어요.',
            '요리하는 김에 도시락도 쌌어요.',
            '노래하는 김에 시험을 봤어요.',
          ],
          answer: 2,
          explanation: '김에 需前后动作相关；C 项"做饭+打包便当"是自然的顺便动作。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l04'],
    step0Html: `<div class="hook-box">
  <b>"趁着现在……顺便……"</b> —— 韩国人日常口语高频句型。<br>
  出门顺便买菜、打扫顺便晾衣服、来了顺便喝杯咖啡……都是它。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="background:#fff0f5;padding:12px;border-radius:12px">
    <div style="color:#ff7fa8;font-weight:700;margin-bottom:6px">김에 vs 겸</div>
    <div style="font-size:14px;color:#241917">
      가는 김에 우유 사 왔어요.（<b>顺便</b>去了就买了）<br>
      운동할 겸 걸어요.（<b>兼有两个目的</b>：一边运动一边散步）
    </div>
  </div>
</div>`,
    compareLabel: '김에 vs 겸',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 7 课</div>
    <div class="ov-hero-title">-는 김에</div>
    <div class="ov-hero-sub">"趁着 · 顺便" · 高频口语</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b>-는 김에</b>：가는 김에<br>
        动词过去 → <b>-은/ㄴ 김에</b>：온 김에<br>
        只接动词，前后动作需相关<br>
        常和 "도"（也）配合
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        시장에 가는 김에 우유도 사 왔어요.<br>
        이왕 온 김에 커피 한잔해요.<br>
        말이 나온 김에 얘기합시다.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁜 김에 사진 찍어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">김에 只接动词</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹는 김에 잤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">前后动作需相关</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第8课：-기 때문에 vs -는 바람에 总辨析 ────────────────
  {
    id: 'card-p24-l08',
    partNumber: 24,
    lessonNumber: 8,
    title: '原因连接词总辨析',
    whatItDoes: '4大原因连接词的选择',
    whatItDoesBody: '这一课把 P18 学到的所有"原因"型连接词汇总起来做区分。\n共 5 个高频候选：-기 때문에 / -아서 / -는 바람에 / -는 통에 / -는 탓에。\n通过语义、色彩、后半句限制三个维度选择正确的一个。',
    structureNote: '五连接词接续总览：\n-기 때문에：动词+기 / 形容词+기 / 名词+이기\n-아/어서：动词形容词根据 ㅏㅗ/其他\n-는 바람에：只接动词现在冠形\n-는 통에：只接动词现在冠形\n-는/은 탓에：动词现在 -는 / 动词过去·形容词 -은/ㄴ / 名词 탓에',
    rulesNote: '选择判断树：\n1. 是不是客观陈述？→ -기 때문에 / -아서\n2. 结果是不是意外/突发？→ -는 바람에\n3. 是不是混乱嘈杂让主人公受苦？→ -는 통에\n4. 是不是负面 + 归咎？→ -는 탓에\n5. 是不是正面感恩？→ -는 덕분에',
    structures: [
      {
        ko: '비가 오기 때문에 우산을 가져왔어요.',
        zh: '因为下雨，我带了伞。（客观）',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오기', role: 'time' },
          { text: '때문에', role: 'plain' },
          { text: '우산을', role: 'object' },
          { text: '가져왔어요', role: 'verb' },
        ],
      },
      {
        ko: '지하철이 멈춘 바람에 지각했어요.',
        zh: '地铁停了，结果迟到了。（意外突发）',
        tokens: [
          { text: '지하철이', role: 'subject' },
          { text: '멈춘', role: 'time' },
          { text: '바람에', role: 'plain' },
          { text: '지각했어요', role: 'verb' },
        ],
      },
      {
        ko: '아이들이 뛰는 통에 잠을 못 잤어요.',
        zh: '孩子们又跑又闹，我根本没睡着。（混乱嘈杂）',
        tokens: [
          { text: '아이들이', role: 'subject' },
          { text: '뛰는', role: 'time' },
          { text: '통에', role: 'plain' },
          { text: '잠을', role: 'object' },
          { text: '못', role: 'time' },
          { text: '잤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '-기 때문에：客观陈述型，任何词类都可接，正负结果都行。', examples: '더워서 / 더웠기 때문에' },
      { type: 'compare', text: '-아서：口语通用型，客观 + 语气轻。', examples: '비가 와서 못 갔어요' },
      { type: 'compare', text: '-는 바람에：意外 + 突发原因导致意外结果，后半必过去。', examples: '차가 고장 나는 바람에' },
      { type: 'compare', text: '-는 통에：混乱嘈杂状况，主人公受苦或做不了事。', examples: '공사하는 통에 시끄러웠어요' },
      { type: 'compare', text: '-는/은 탓에：负面归咎，后半必负面。正面用 덕분에。', examples: '늦잠을 잔 탓에' },
      { type: 'note', text: '选择技巧：客观陈述 → 때문에；意外突发 → 바람에；混乱嘈杂 → 통에；归咎负面 → 탓에；感恩正面 → 덕분에。', examples: '5 种搭配需按语义配对' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '눈이', role: 'subject' },
          { text: '많이', role: 'time' },
          { text: '온', role: 'time' },
          { text: '탓에', role: 'plain' },
          { text: '도로가', role: 'subject' },
          { text: '미끄러웠어요', role: 'verb' },
        ],
        zh: '都怪雪下得太多，路面很滑。',
        swapWords: ['비', '얼음'],
      },
      {
        wordBlocks: [
          { text: '알람이', role: 'subject' },
          { text: '안', role: 'time' },
          { text: '울린', role: 'time' },
          { text: '바람에', role: 'plain' },
          { text: '늦잠을', role: 'object' },
          { text: '잤어요', role: 'verb' },
        ],
        zh: '闹钟没响，结果睡过头了。',
        swapWords: ['핸드폰', '시계'],
      },
      {
        wordBlocks: [
          { text: '옆집이', role: 'subject' },
          { text: '시끄러운', role: 'time' },
          { text: '통에', role: 'plain' },
          { text: '집중이', role: 'subject' },
          { text: '안', role: 'time' },
          { text: '됐어요', role: 'verb' },
        ],
        zh: '隔壁太吵，我根本无法集中。',
        swapWords: ['옆방', '위층'],
      },
    ],
    scenarios: [
      { icon: '📖', context: '客观-书面', ko: '시험 기간이기 때문에 도서관이 붐빕니다.', zh: '因为考试期间，图书馆很拥挤。' },
      { icon: '🚗', context: '意外-바람에', ko: '갑자기 차가 고장 나는 바람에 약속에 늦었어요.', zh: '车突然坏了，结果约会迟到。' },
      { icon: '🔊', context: '嘈杂-통에', ko: '위층에서 공사하는 통에 하루 종일 시끄러웠어요.', zh: '楼上装修，一整天很吵。' },
      { icon: '😤', context: '归咎-탓에', ko: '내 실수 탓에 팀이 손해를 봤어요.', zh: '都怪我失误，团队受了损失。' },
      { icon: '💐', context: '感恩-덕분에', ko: '선생님 덕분에 시험에 합격했어요.', zh: '多亏老师，我通过了考试。' },
      { icon: '😴', context: '综合决策', ko: '어제 밤에 잠을 못 잔 탓에 오늘 회의에서 졸았어요.', zh: '都怪昨晚没睡好，今天开会打瞌睡了。' },
    ],
    mistakes: [
      { wrong: '비가 오는 바람에 우산을 챙겼어요.', correct: '비가 와서 우산을 챙겼어요.', note: '"带伞"是主动应对，不是意外结果，用 -아서 或 때문에。' },
      { wrong: '너 덕분에 시험에 떨어졌어.', correct: '너 탓에 시험에 떨어졌어.', note: '결과 부정（考砸）→ 탓에，用 덕분에 是讽刺或语义反。' },
      { wrong: '아이가 우는 탓에 시끄러워요.', correct: '아이가 우는 통에 시끄러워요.', note: '"吵闹让我受苦"是 통에 的典型场景，탓에 语气过重。' },
      { wrong: '공사하는 관계로 시끄러워 죽겠어요.', correct: '공사하는 통에 시끄러워 죽겠어요.', note: '관계로 是公文体，日常抱怨口语用 통에。' },
    ],
    quickTable: {
      title: '五大原因连接词一览',
      headers: ['连接词', '语气', '后半', '典型语境'],
      rows: [
        ['-기 때문에', '客观', '任意', '书面陈述'],
        ['-아서', '口语', '任意', '通用因果'],
        ['-는 바람에', '意外', '过去负面', '突发意外'],
        ['-는 통에', '受苦', '过去负面', '混乱嘈杂'],
        ['-는/은 탓에', '归咎', '负面', '追究责任'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '哪个原因连接词最合适？',
      body: '根据语境选择最贴切的连接词。',
      questions: [
        {
          prompt: '"孩子哭闹让我一夜没睡"最自然：',
          options: [
            '아이가 우는 덕분에 잠을 못 잤어요.',
            '아이가 우는 통에 잠을 못 잤어요.',
            '아이가 우는 관계로 잠을 못 잤어요.',
            '아이가 우는 김에 잠을 못 잤어요.',
          ],
          answer: 1,
          explanation: '"孩子哭闹让我受苦"是 통에 的典型场景。',
        },
        {
          prompt: '"多亏医生，我很快康复了"：',
          options: [
            '의사 선생님 탓에 빨리 나았어요.',
            '의사 선생님 바람에 빨리 나았어요.',
            '의사 선생님 덕분에 빨리 나았어요.',
            '의사 선생님 통에 빨리 나았어요.',
          ],
          answer: 2,
          explanation: '"快康复"正面结果 → 덕분에。',
        },
        {
          prompt: '"地铁突然停了导致迟到"：',
          options: [
            '지하철이 멈춘 바람에 지각했어요.',
            '지하철이 멈추기 때문에 지각했어요.',
            '지하철이 멈춘 김에 지각했어요.',
            '지하철이 멈춘 덕분에 지각했어요.',
          ],
          answer: 0,
          explanation: '意外突发 + 负面结果 → 바람에。B 项时态搭配也怪，应为过去 멈췄기 때문에。',
        },
        {
          prompt: '"因为考试期间图书馆拥挤"（公告体）：',
          options: [
            '시험 기간이기 때문에 도서관이 붐빕니다.',
            '시험 기간인 바람에 도서관이 붐빕니다.',
            '시험 기간인 통에 도서관이 붐빕니다.',
            '시험 기간인 탓에 도서관이 붐빕니다.',
          ],
          answer: 0,
          explanation: '客观陈述 + 公告体 → -기 때문에 最中性合适。',
        },
      ],
    },
    linkedGrammarIds: ['card-p24-l01', 'card-p24-l02', 'card-p24-l03', 'card-p24-l04'],
    step0Html: `<div class="hook-box">
  五个"因为"，各有各的性格：<br>
  <b>때문에</b>=客观 · <b>바람에</b>=意外 · <b>통에</b>=嘈杂 · <b>탓에</b>=归咎 · <b>덕분에</b>=感恩<br>
  选错，语气就翻车。
</div>`,
    compareHtml: `<div class="cmp-block">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div style="background:#eaf8f5;padding:10px;border-radius:10px"><b style="color:#2db89b">덕분에</b><br><span style="font-size:13px">正面感恩</span></div>
    <div style="background:#fdecec;padding:10px;border-radius:10px"><b style="color:#e05555">탓에</b><br><span style="font-size:13px">负面归咎</span></div>
    <div style="background:#fff0f5;padding:10px;border-radius:10px"><b style="color:#ff7fa8">바람에</b><br><span style="font-size:13px">意外突发</span></div>
    <div style="background:#f3ecff;padding:10px;border-radius:10px"><b style="color:#b49ccf">통에</b><br><span style="font-size:13px">混乱受苦</span></div>
  </div>
</div>`,
    compareLabel: '五大原因连接词对比',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 8 课</div>
    <div class="ov-hero-title">原因连接词总辨析</div>
    <div class="ov-hero-sub">5 大 "因为" 的场景分工</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">判断口诀</div></div>
    <div class="ov-block">
      <div style="font-size:15px;color:#241917;line-height:2">
        客观陈述 → <b>-기 때문에</b><br>
        通用口语 → <b>-아서</b><br>
        意外突发 → <b>-는 바람에</b><br>
        嘈杂受苦 → <b>-는 통에</b><br>
        归咎负面 → <b>-는/은 탓에</b><br>
        感恩正面 → <b>-는 덕분에</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">经典例句</div></div>
    <div class="ov-block">
      <div style="font-size:15px;color:#241917;line-height:1.9">
        시험 기간이기 때문에 도서관이 붐빕니다.<br>
        지하철이 멈춘 바람에 지각했어요.<br>
        아이가 우는 통에 잠을 못 잤어요.<br>
        내 실수 탓에 팀이 손해 봤어요.<br>
        선생님 덕분에 합격했어요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 오는 바람에 우산을 챙겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">主动应对不是意外结果，用 -아서</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">너 덕분에 시험에 떨어졌어</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">负面结果用 탓에</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第9课：-길래 ─────────────────────────────────────────
  {
    id: 'card-p24-l10',
    partNumber: 24,
    lessonNumber: 9,
    title: '-길래',
    whatItDoes: '因为看到/听说，所以……',
    whatItDoesBody: '「-길래」表示"因为观察到某情境（或听到某消息），所以做了某事"。主语常是"我"（第一人称）；前句是直接观察/所闻的情境，后句是"我"的反应。语气偏口语，与书面的 -기에 不同层次。',
    structureNote: '动词/形容词词干 + -길래｜前句：观察/所闻｜后句：说话人的反应',
    rulesNote: '不看받침（词干直接加）｜主语常为第一人称｜前句多为直接看到/听到；书面用 -기에',
    structures: [
      {
        ko: '친구가 배고파 보이길래 뭐 좀 사 줬어요.',
        zh: '看朋友饿了，就买了点吃的给他。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '배고파 보이길래', role: 'verb' },
          { text: '뭐 좀', role: 'plain' },
          { text: '사 줬어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 오길래 우산을 챙겼어요.',
        zh: '看下雨了，就带上了伞。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오길래', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
      },
      {
        ko: '카페가 조용하길래 공부하러 갔어요.',
        zh: '听说咖啡厅安静，就去学习了。',
        tokens: [
          { text: '카페가', role: 'subject' },
          { text: '조용하길래', role: 'verb' },
          { text: '공부하러', role: 'verb' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -길래（不看받침）', examples: '보이다 → 보이길래 / 오다 → 오길래 / 조용하다 → 조용하길래' },
      { type: 'rule', text: '过去时 + 길래：-았/었길래', examples: '왔길래 / 좋았길래' },
      { type: 'rule', text: '名词 + (이)길래', examples: '학생이길래 / 친구길래' },
      { type: 'usage', text: '主语常为"我 저/나"，前句是我看到/听到的情境', examples: '(我看到) 배고파 보이길래 → (我做) 사 줬어요' },
      { type: 'compare', text: '-길래 vs -기에 → 前者口语，后者书面/正式', examples: '(口语) 오길래 / (书面) 오기에' },
      { type: 'compare', text: '-길래 vs -아/어서 → 前者"我做出反应的动机"，后者"客观因果"', examples: '비가 와서 길이 미끄러워요.（客观） / 비가 오길래 우산을 챙겼어요.（我的反应）' },
      { type: 'note', text: '后句主语必须是说话人自己，不能是他人', examples: '误：비가 오길래 친구가 우산을 챙겼어요.（他人反应）→ 用 비가 와서' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '배고파 보이길래', role: 'verb' },
          { text: '사 줬어요', role: 'verb' },
        ],
        zh: '看朋友饿就买给他。',
        swapWords: ['배고프다', '피곤하다', '심심하다', '아프다'],
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '오길래', role: 'verb' },
          { text: '우산을 챙겼어요', role: 'verb' },
        ],
        zh: '下雨就拿伞。',
        swapWords: ['비가 오다', '눈이 오다', '바람이 불다', '햇빛이 나다'],
      },
      {
        wordBlocks: [
          { text: '카페가', role: 'subject' },
          { text: '조용하길래', role: 'verb' },
          { text: '공부하러 갔어요', role: 'verb' },
        ],
        zh: '咖啡厅安静就去学习。',
        swapWords: ['조용하다', '한산하다', '분위기 좋다', '넓다'],
      },
    ],
    scenarios: [
      { icon: '🍔', context: '看到饿', ko: '친구가 배고파 보이길래 뭐 좀 사 줬어요.', zh: '看朋友饿就买。' },
      { icon: '🌧️', context: '看到下雨', ko: '비가 오길래 우산을 챙겼어요.', zh: '下雨拿伞。' },
      { icon: '☕', context: '听说安静', ko: '카페가 조용하길래 공부하러 갔어요.', zh: '咖啡厅静就去学。' },
      { icon: '💰', context: '看到便宜', ko: '싸길래 두 개나 샀어요.', zh: '便宜就买了两个。' },
      { icon: '📞', context: '听说迟到', ko: '늦는다길래 먼저 시작했어요.', zh: '听说迟到就先开始了。' },
      { icon: '🚗', context: '看到车少', ko: '길이 한산하길래 빨리 왔어요.', zh: '路空就快点开来。' },
    ],
    mistakes: [
      { wrong: '비가 오길래 친구가 우산을 챙겼어요', correct: '비가 오길래 (제가) 우산을 챙겼어요', note: '-길래 后句主语必须是说话人自己，不能是他人' },
      { wrong: '비가 왔길래 우산을 챙겼어요', correct: '비가 오길래 우산을 챙겼어요', note: '当"看到就做"是同时反应时，用现在时词干 + -길래' },
      { wrong: '학생길래 도와줬어요', correct: '학생이길래 도와줬어요', note: '名词后需加系词 이 → 이길래' },
      { wrong: '(书面) 비가 오길래 취소되었습니다', correct: '비가 오기에 취소되었습니다', note: '书面/正式场合用 -기에；-길래 只用于口语' },
    ],
    quickTable: {
      title: '-길래 vs -기에 vs -아/어서',
      headers: ['形式', '语体', '主语'],
      rows: [
        ['-길래', '口语', '后句：说话人自己'],
        ['-기에', '书面/正式', '后句可为任何人'],
        ['-아/어서', '通用', '客观因果，任何主语'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-길래 用法练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '"看下雨了就带伞" 最合适？',
          options: ['비가 와서 우산을 챙겼어요', '비가 오길래 우산을 챙겼어요', '비가 오면 우산을 챙겼어요', '비가 오니까 우산을 챙겼어요'],
          answer: 1,
          explanation: '"看到情境后我做反应"用 -길래，主语是"我"。',
        },
        {
          prompt: '"카페가 (조용하다) 공부하러 갔어요."',
          options: ['조용하니까', '조용해서', '조용하길래', '조용하려고'],
          answer: 2,
          explanation: '"听说/看到情境后自己做出反应"用 -길래 → 조용하길래。',
        },
        {
          prompt: '"학생 (이다) 도와줬어요."',
          options: ['이길래', '길래', '이니까', '라서'],
          answer: 0,
          explanation: '名词接 -길래 时需加系词 이 → 이길래。',
        },
        {
          prompt: '-길래 与 -기에 的核心区别？',
          options: ['完全相同', '-길래 口语；-기에 书面/正式', '-길래 只接动词，-기에 只接形容词', '-길래 表将来，-기에 表过去'],
          answer: 1,
          explanation: '语体差异：-길래 口语，-기에 书面。语义相同。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"看下雨了就带伞""看朋友饿了就买东西" —— 韩语这种"我看到情境后自己做反应"用 <b>-길래</b>。<br>后句主语必须是"我"，语气偏口语。书面用 -기에。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-길래 vs -아/어서</b><br>
    ・-길래 → 我的反应<br>
    <span style="color:#89756e">비가 오길래 우산을 챙겼어요.（我拿伞）</span><br>
    ・-아/어서 → 客观因果<br>
    <span style="color:#89756e">비가 와서 길이 미끄러워요.（路滑）</span>
  </div>
</div>`,
    compareLabel: '我做反应 vs 客观因果',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-길래：看到情境的反应</div>
  <div style="font-size:14px;color:#89756e">口语专用 · 后句主语=我</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:var(--color-pink-base)"></div><div class="ov-section-title" style="color:var(--color-pink-base)">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句：观察/所闻的情境<br>
      后句：说话人的反应（主语=我）<br>
      名词 → -(이)길래<br>
      书面对应：-기에
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:var(--color-status-danger)"></div><div class="ov-section-title" style="color:var(--color-status-danger)">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 오길래 친구가 우산을 챙겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비가 오길래 (제가) 우산을 챙겼어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생길래</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이길래</span></div></div>
  </div>
</div>`,
  },

  // ── 第10课：综合练习 ─────────────────────────────────────────
  {
    id: 'card-p24-l09',
    partNumber: 24,
    lessonNumber: 10,
    title: '综合练习⑱',
    whatItDoes: '第 18 部分总复习',
    whatItDoesBody: '完成这份练习，检验高级原因表达八大语法。\n覆盖：-는 바람에、-는 통에、-는 탓에、-는 덕분에、-는 나머지、-는 관계로、-는 김에、原因连接词总辨析。\n重点掌握"意外/嘈杂/归咎/感恩/极端/公告/顺便"六种因果关系。',
    isPractice: true,
    structureNote: 'P18 语法分组：\n【意外突发】L01 -는 바람에\n【混乱受苦】L02 -는 통에\n【归咎负面】L03 -는/은 탓에\n【感恩正面】L04 -는 덕분에\n【情绪极端】L05 -는/은 나머지\n【公告文体】L06 -는 관계로\n【顺便借机】L07 -는 김에\n【总辨析】L08 五大原因连接词对比',
    structures: [
      { ko: '지하철이 고장 나는 바람에 지각했어요', zh: '地铁故障导致迟到。', tokens: [{ text: '지하철이', role: 'subject' }, { text: '고장 나는 바람에', role: 'verb' }, { text: '지각했어요', role: 'verb' }] },
      { ko: '아이들이 뛰는 통에 잠을 못 잤어요', zh: '孩子们跑来跑去害我没睡着。', tokens: [{ text: '아이들이', role: 'subject' }, { text: '뛰는 통에', role: 'verb' }, { text: '잠을', role: 'object' }, { text: '못 잤어요', role: 'verb' }] },
      { ko: '늦잠을 잔 탓에 회의에 늦었어요', zh: '都怪睡懒觉开会迟到。', tokens: [{ text: '늦잠을', role: 'object' }, { text: '잔 탓에', role: 'verb' }, { text: '회의에', role: 'place' }, { text: '늦었어요', role: 'verb' }] },
      { ko: '선생님 덕분에 시험에 합격했어요', zh: '多亏老师通过了考试。', tokens: [{ text: '선생님', role: 'subject' }, { text: '덕분에', role: 'plain' }, { text: '시험에', role: 'object' }, { text: '합격했어요', role: 'verb' }] },
      { ko: '너무 놀란 나머지 소리를 질렀어요', zh: '因为太吃惊大叫了一声。', tokens: [{ text: '너무', role: 'plain' }, { text: '놀란 나머지', role: 'verb' }, { text: '소리를', role: 'object' }, { text: '질렀어요', role: 'verb' }] },
      { ko: '내부 공사 관계로 오늘 휴무입니다', zh: '由于内部装修今日停业。', tokens: [{ text: '내부 공사', role: 'subject' }, { text: '관계로', role: 'plain' }, { text: '오늘', role: 'time' }, { text: '휴무입니다', role: 'verb' }] },
      { ko: '시장에 가는 김에 우유도 사 왔어요', zh: '趁着去市场顺便买了牛奶。', tokens: [{ text: '시장에', role: 'place' }, { text: '가는 김에', role: 'verb' }, { text: '우유도', role: 'object' }, { text: '사 왔어요', role: 'verb' }] },
      { ko: '옆집이 시끄러운 통에 집중이 안 됐어요', zh: '隔壁太吵没法集中。', tokens: [{ text: '옆집이', role: 'subject' }, { text: '시끄러운 통에', role: 'verb' }, { text: '집중이', role: 'subject' }, { text: '안 됐어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '意外突发 → -는 바람에（后半过去+负面）', examples: '차가 고장 나는 바람에 늦었어요' },
      { type: 'rule', text: '混乱嘈杂受苦 → -는 통에', examples: '아이가 우는 통에 못 잤어요' },
      { type: 'rule', text: '归咎负面 → -는/은 탓에', examples: '늦잠을 잔 탓에 지각했어요' },
      { type: 'rule', text: '感恩正面 → -는 덕분에', examples: '선생님 덕분에 합격했어요' },
      { type: 'rule', text: '情绪极端书面 → -는/은 나머지', examples: '기쁜 나머지 눈물이 났어요' },
      { type: 'rule', text: '公告公文 → -는 관계로 + -ㅂ니다', examples: '공사 관계로 임시 휴업합니다' },
      { type: 'rule', text: '顺便借机 → -는 김에（只接动词，前后动作相关）', examples: '가는 김에 우유도 사 왔어요' },
      { type: 'compare', text: '语气梯度：客观(때문에/아서) → 意外(바람에) → 受苦(통에) → 归咎(탓에) → 感恩(덕분에) → 公告(관계로)', examples: '同一件事按语气不同选词' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '지하철이', role: 'subject' }, { text: '고장 나는 바람에', role: 'verb' }, { text: '지각했어요', role: 'verb' }],
        zh: '地铁故障所以迟到。',
        swapRole: 'verb',
        swapWords: ['고장 나는 바람에', '멈추는 바람에', '지연되는 바람에'],
      },
      {
        wordBlocks: [{ text: '선생님', role: 'subject' }, { text: '덕분에', role: 'plain' }, { text: '합격했어요', role: 'verb' }],
        zh: '多亏老师通过了考试。',
        swapRole: 'plain',
        swapWords: ['덕분에', '덕에'],
      },
      {
        wordBlocks: [{ text: '시장에', role: 'place' }, { text: '가는 김에', role: 'verb' }, { text: '우유도', role: 'object' }, { text: '사 왔어요', role: 'verb' }],
        zh: '趁着去市场顺便买了牛奶。',
        swapRole: 'verb',
        swapWords: ['가는 김에', '나가는 김에', '들르는 김에'],
      },
    ],
    scenarios: [
      { icon: '🚗', context: 'L01 意外', ko: '차가 갑자기 고장 나는 바람에 늦었어요.', zh: '车突然坏了所以迟到。' },
      { icon: '🔊', context: 'L02 嘈杂', ko: '옆집이 공사하는 통에 하루 종일 시끄러웠어요.', zh: '隔壁装修一天都很吵。' },
      { icon: '😤', context: 'L03 归咎', ko: '내 실수 탓에 팀이 손해 봤어요.', zh: '都怪我失误团队受损。' },
      { icon: '💐', context: 'L04 感恩', ko: '부모님 덕분에 유학을 갈 수 있었어요.', zh: '多亏父母才能去留学。' },
      { icon: '😭', context: 'L05 情绪极端', ko: '너무 슬픈 나머지 밤새 울었어요.', zh: '因为太伤心哭了一整夜。' },
      { icon: '🏢', context: 'L06 公告', ko: '시설 점검 관계로 서비스가 일시 중단됩니다.', zh: '由于设施检修服务暂停。' },
      { icon: '🛒', context: 'L07 顺便', ko: '슈퍼에 가는 김에 계란도 사 왔어요.', zh: '趁着去超市也买了鸡蛋。' },
      { icon: '⚖️', context: 'L08 综合选择', ko: '눈이 많이 온 탓에 도로가 미끄러웠어요.', zh: '都怪雪太多路面很滑。' },
    ],
    mistakes: [
      { wrong: '피곤한 바람에 잤어요', correct: '피곤해서 잤어요', note: 'L01：-는 바람에 只接动词，形容词用 -아/어서。' },
      { wrong: '아이가 우는 탓에 시끄러워요', correct: '아이가 우는 통에 시끄러워요', note: 'L02/L03：嘈杂受苦用 통에；탓에 是归咎语气过重。' },
      { wrong: '자는 탓에 피곤해요', correct: '늦게 잔 탓에 피곤해요', note: 'L03：过去动作用 -은/ㄴ 탓에。' },
      { wrong: '너 탓에 시험에 합격했어', correct: '너 덕분에 시험에 합격했어', note: 'L04：正面结果用 덕분에，탓에 只用于负面。' },
      { wrong: '기쁠 나머지 눈물이 났어요', correct: '기쁜 나머지 눈물이 났어요', note: 'L05：形容词用 -(으)ㄴ 나머지，不能用 -(으)ㄹ。' },
      { wrong: '너 관계로 슬퍼요', correct: '너 때문에 슬퍼요', note: 'L06：관계로 只用于公告体，个人情感用 때문에。' },
      { wrong: '예쁜 김에 사진 찍어요', correct: '온 김에 사진 찍어요', note: 'L07：김에 只接动词，不接形容词。' },
      { wrong: '비가 오는 바람에 우산을 챙겼어요', correct: '비가 와서 우산을 챙겼어요', note: 'L08：主动应对不是意外结果，用 -아서 或 때문에。' },
    ],
    linkedGrammarIds: [],
    specialQuiz: {
      type: 'judge',
      title: '高级原因表达 · 综合测验',
      body: '本课综合 P18 全部语法：-는 바람에 / -는 통에 / -는 탓에 / -는 덕분에 / -는 나머지 / -는 관계로 / -는 김에。',
      questions: [
        {
          prompt: '"车突然坏了导致迟到"最自然：',
          options: [
            '차가 갑자기 고장 나기 때문에 지각했어요.',
            '차가 갑자기 고장 나는 바람에 지각했어요.',
            '차가 갑자기 고장 나는 김에 지각했어요.',
            '차가 갑자기 고장 나는 덕분에 지각했어요.',
          ],
          answer: 1,
          explanation: '突发意外 + 负面结果 → -는 바람에。',
        },
        {
          prompt: '"孩子们又哭又闹，我根本没睡好"：',
          options: [
            '아이들이 우는 관계로 못 잤어요.',
            '아이들이 우는 통에 못 잤어요.',
            '아이들이 우는 덕분에 못 잤어요.',
            '아이들이 우는 나머지 못 잤어요.',
          ],
          answer: 1,
          explanation: '嘈杂受苦场景 → -는 통에。',
        },
        {
          prompt: '"由于设施检修，服务暂时中断"（公告体）：',
          options: [
            '시설 점검 관계로 서비스가 일시 중단됩니다.',
            '시설 점검 탓에 서비스가 안 돼요.',
            '시설 점검 바람에 서비스가 안 됩니다.',
            '시설 점검 나머지 서비스가 중단됐어요.',
          ],
          answer: 0,
          explanation: '公告/公文体 → 관계로 + -ㅂ니다。',
        },
        {
          prompt: '"多亏朋友帮忙，搬家很快就结束了"：',
          options: [
            '친구가 도와준 탓에 이사가 빨리 끝났어요.',
            '친구가 도와준 통에 이사가 빨리 끝났어요.',
            '친구가 도와준 덕분에 이사가 빨리 끝났어요.',
            '친구가 도와준 바람에 이사가 빨리 끝났어요.',
          ],
          answer: 2,
          explanation: '正面结果 → 덕분에。',
        },
        {
          prompt: '"因太紧张连名字都说错了"（书面）：',
          options: [
            '너무 긴장한 김에 이름을 잘못 말했어요.',
            '너무 긴장한 나머지 이름을 잘못 말했어요.',
            '너무 긴장한 통에 이름을 잘못 말했어요.',
            '너무 긴장한 관계로 이름을 잘못 말했어요.',
          ],
          answer: 1,
          explanation: '"情绪极端→意外反应" → -(으)ㄴ 나머지。',
        },
        {
          prompt: '"趁着去超市，也买了牛奶回来"：',
          options: [
            '슈퍼에 가는 김에 우유도 사 왔어요.',
            '슈퍼에 가는 바람에 우유도 사 왔어요.',
            '슈퍼에 가는 통에 우유도 사 왔어요.',
            '슈퍼에 가는 탓에 우유도 사 왔어요.',
          ],
          answer: 0,
          explanation: '"顺便做另一件相关事" → -는 김에。',
        },
        {
          prompt: '"都怪睡懒觉，开会迟到了"：',
          options: [
            '늦잠을 잔 덕분에 회의에 늦었어요.',
            '늦잠을 잔 탓에 회의에 늦었어요.',
            '늦잠을 잔 관계로 회의에 늦었어요.',
            '늦잠을 잔 김에 회의에 늦었어요.',
          ],
          answer: 1,
          explanation: '"归咎负面" → -은/ㄴ 탓에。',
        },
        {
          prompt: '哪句语法或语义错误？',
          options: [
            '비 탓에 소풍이 취소됐어요.',
            '자는 탓에 피곤해요.',
            '차가 막힌 바람에 늦었어요.',
            '옆집이 공사하는 통에 시끄러웠어요.',
          ],
          answer: 1,
          explanation: '탓에 前动词过去动作应用 -은/ㄴ → "늦게 잔 탓에"，"자는 탓에" 时态错。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第 9 课</div>
    <div class="ov-hero-title">高级原因表达 · 综合练习</div>
    <div class="ov-hero-sub">本 Part 全部 8 个语法点回顾</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">Part 18 学过的语法</div></div>
    <div class="ov-block">
      <div style="font-size:15px;color:#241917;line-height:2">
        1. <b>-는 바람에</b>：意外突发 · 后半负面<br>
        2. <b>-는 통에</b>：混乱嘈杂 · 受苦叙述<br>
        3. <b>-는/은 탓에</b>：归咎 · 负面结果<br>
        4. <b>-는 덕분에</b>：感恩 · 正面结果<br>
        5. <b>-는/은 나머지</b>：情绪极端 · 书面语<br>
        6. <b>-는 관계로</b>：公告/公文体<br>
        7. <b>-는 김에</b>：趁着 · 顺便<br>
        8. 五大原因连接词总辨析
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">语感判断</div></div>
    <div class="ov-block">
      <div style="font-size:15px;color:#241917;line-height:2">
        选原因连接词时先问三件事：<br>
        1. 是不是<b>意外突发</b>？→ 바람에<br>
        2. 结果是<b>正 or 负</b>？→ 덕분에 / 탓에<br>
        3. 是不是<b>公告体</b>？→ 관계로
      </div>
    </div>
  </div>
</div>`,
  },

];
