import type { GrammarCard } from '@/types';

export const grammarCardsP18: GrammarCard[] = [
  {
    id: 'card-p18-l01',
    partNumber: 18,
    lessonNumber: 1,
    title: '-테요，-던데요，-더라',
    whatItDoes: '表示推测、回顾或感叹',
    whatItDoesBody: '-테요 表示说话者的推测或意志，相当于"应该……吧/我会……"，含主观判断语气。\n-던데요 表示说话者回忆起过去的亲身经历，带有轻微的感叹或提示语气，相当于"（我记得/之前）……呢"。\n-더라 表示说话者回顾自己的亲身经历后发表感叹，是口语体，多用于描述过去观察到的事实，相当于"……啊/果然……"。',
    structureNote: '-테요：动词/形容词 词干 + 테요（을 테요 / ㄹ 테요）\n-던데요：动词/形容词 词干 + 던데요（过去经验回想）\n-더라：动词/形容词 词干 + 더라（口语体经验感叹）',
    rulesNote: '-테요 以 -(으)ㄹ 테요 形式表示推测（날씨가 좋을 테니까）或意志（제가 할 테요）。\n-던데요 也用于根据前句中回想的事实，在后句传达意见时（어제 봤던데요，제 생각엔…）。\n-더라 主语是第一人称时表意志/发现，第三人称时表观察报告。口语中也用 -더라고요 的形式。',
    scenarioNote: '-테요 常用在 "제가 할 테요" 或 "힘들 테니까 쉬세요" 这样的句子中，表达对对方的体谅或推测。\n-던데요 常用在 "어제 거기 가 봤던데요，정말 맛있더라고요" 这样的句子中，基于经验进行推荐或传达意见。\n-더라 常用在 "가 봤더니 생각보다 좋더라" 这样的句子中，表达直接经验后的感叹或发现。',
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 都是包含说话人主观判断和经验的表达</div>
</div>
<div class="reminder-box">-테요 表示推测/意志，-던데요/-더라 表示过去经验回想。</div>`,
    compareHtml: `<div class="card-title">-테요 vs -던데요 vs -더라</div>
<div class="card-body">比较三种表达的语气差异。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-테요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">推测（～일 거야）或意志（내가 할게），现在/将来指向</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">제가 할 테요</span><span style="font-size:16px;color:#5a4640">我来做</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-던데요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去直接经验回想，向听话人传达的语气</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어제 거기 사람 많던데요</span><span style="font-size:16px;color:#5a4640">昨天那里人很多呢</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-더라</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去直接经验后的感叹/发现，口语体</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹어 봤더니 진짜 맛있더라</span><span style="font-size:16px;color:#5a4640">吃了一下，真的很好吃啊</span></div>
  </div>
</div>
<div class="reminder-box">-던데요 体谅听话人，-더라 用于独白/亲近关系的感叹，-테요 表示现在·将来的推测/意志。</div>`,
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
      { type: 'rule', text: '-테요：词干 + (을/ㄹ) 테요（有收音 → 을 테요，无/ㄹ → ㄹ 테요）', examples: '먹을 테요 / 갈 테요 / 피곤할 테니까 / 할 테요' },
      { type: 'rule', text: '-던데요：词干 + 던데요（过去 回想，与收音有无无关）', examples: '맛있던데요 / 많던데요 / 오던데요 / 좋던데요' },
      { type: 'rule', text: '-더라：词干 + 더라（口语体 感叹，与收音有无无关）', examples: '맛있더라 / 춥더라 / 예쁘더라 / 힘들더라' },
      { type: 'usage', text: '-테요 的两种用法：① 推测（힘들 테니까 쉬세요）② 意志（제가 할 테요）', examples: '날씨가 추울 테니까 코트 입으세요（推测） / 내가 다 할 테요（意志）' },
      { type: 'note', text: '-더라：主语是第一人称时表发现/意志，第三人称时表观察报告。可转为格式体 -더라고요', examples: '내가 해 보니까 어렵더라（第一人称 发现） / 그 사람 노래 잘하더라（第三人称 观察）' },
      { type: 'compare', text: '-던데요 vs -더라：던데요 是向听话人传达的语气，더라 用于独白或亲近关系的感叹', examples: '거기 맛있던데요，한번 가 봐요（体谅听话人） / 거기 맛있더라（독백/친구）' },
      { type: 'note', text: '中文没有"回想体"：-던데요 / -더라 里的 -더- 表示"这是我过去亲眼看到、亲身经历过的"。中文只能用"（我记得）""当时""原来"之类补出来，不是普通的过去时。漏掉这层"亲历"语气，是中文母语者最常犯的理解错误。', examples: '거기 음식이 정말 맛있던데요（我亲自尝过才这么说） / 가 봤더니 생각보다 훨씬 좋더라（去了才发现）' },
      { type: 'note', text: '正因为 -더- 是"亲眼观察 / 才发现"的视角，不能拿 -더라 来叙述自己的普通过去动作。想说"我昨天看了电影"要用普通过去时（봤어），不是 봤더라；第一人称只在"连自己都没料到的发现"时才用 -더라。', examples: '내가 해 보니까 어렵더라（自己才发现，可以） / 어제 영화 봤어（普通叙述，不用 봤더라）' },
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
      { wrong: '피곤할 테요니까 쉬세요（테요 + 니까 语序错误）', correct: '피곤할 테니까 쉬세요', note: '-테니까 是由 테 + 니까 结合的形式，作为一个词尾使用。테요 后面不能再加 니까。' },
      { wrong: '어제 거기 맛있었던데요（过去时态重复）', correct: '어제 거기 맛있던데요', note: '-던데요 本身就包含过去回想的意思，所以不再重复 었/았 过去时态。맛있었던데요 不自然。' },
      { wrong: '그 영화 재미있더라요（더라 + 요 重复）', correct: '그 영화 재미있더라 또는 재미있더라고요', note: '-더라 是口语体终结词尾，后面不直接加 요。要用格式体时用 -더라고요 的形式。' },
      { wrong: '내가 할 테요을 준비했어요（테요 + 을 助词）', correct: '내가 할 테요（单独结句）또는 내가 준비할 테요', note: '-테요 是终结词尾，后面不加助词。' },
    ],
    quickTable: {
      title: '-테요 / -던데요 / -더라 用法对比',
      headers: ['表达', '时态', '语气', '例句'],
      rows: [
        ['-테요（-(으)ㄹ 테요）', '现在/将来', '推测或意志', '피곤할 테니까 / 제가 할 테요'],
        ['-던데요', '过去 回想', '根据经验传达', '맛있던데요 / 많던데요'],
        ['-더라', '过去 回想', '直接经验感叹（口语）', '좋더라 / 맛있더라'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-테요 / -던데요 / -더라',
      body: '选择正确的形式填入括号',
      questions: [
        {
          prompt: '오늘 많이 피곤할 ___ 일찍 들어가세요。（今天应该很累，请早点回去。）',
          options: ['더라', '던데요', '테요만', '테니까'],
          answer: 3 as 0|1|2|3,
          explanation: '-테니까：-(으)ㄹ 테니까 用于在推测的基础上传达劝说或请求。피곤할 테니까 일찍 들어가세요 ✓。던데요/더라 表示过去经验回想，不符合将来推测的语境。',
        },
        {
          prompt: '어제 그 식당 음식이 정말 맛있___。（昨天那家餐厅的食物真的很好吃呢。）',
          options: ['을 테요', '었던데요', '던데요', '더라요'],
          answer: 2 as 0|1|2|3,
          explanation: '-던데요：把过去直接经验向听话人传达的表达。었던데요 因过去时态重复而不自然，더라요 是不存在的形式。',
        },
        {
          prompt: '直接 가 봤는데 경치가 정말 아름다웠___。（亲自去了一趟，风景真的很美啊。）',
          options: ['테요', '더라', '던데요', '더라요'],
          answer: 1 as 0|1|2|3,
          explanation: '-더라：表示直接经验后感叹的口语体终结词尾。던데요 也可以，但表达直接感叹的独白体是 더라。더라요 是不存在的形式。',
        },
        {
          prompt: '제가 다 ___ 걱정하지 마세요。（我来全部做，不用担心。）',
          options: ['할 테니까', '했던데요', '했더라', '할 테요니까'],
          answer: 0 as 0|1|2|3,
          explanation: '할 테니까：-(으)ㄹ 테니까 基于意志传达劝告/安抚。제가 다 할 테니까 걱정하지 마세요 ✓。할 테요니까 是错误形式，했던데요/했더라 是过去经验表达，不适合意志语境。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第1课</div>
    <div class="ov-hero-title">-테요，-던데요，-더라</div>
    <div class="ov-hero-sub">推测/意志 · 回忆提示 · 经历感叹</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">推测/意志</div>
      <div class="ko">词干 + (으)ㄹ 테요／테니까</div>
      <div class="zh">应该……/我来……</div>
    </div>
    <div class="ov-block">
      <div class="badge">回忆提示</div>
      <div class="ko">词干 + 던데요</div>
      <div class="zh">（我记得）……呢</div>
    </div>
    <div class="ov-block">
      <div class="badge">经历感叹</div>
      <div class="ko">词干 + 더라</div>
      <div class="zh">……啊（亲身经历）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">收音 O</span> + 을 테요：먹<b style="color:#ff7fa8">을 테요</b></div>
        <div><span style="font-weight:700">收音 X/ㄹ</span> + ㄹ 테요：할<b style="color:#ff7fa8"> 테요</b> / 갈<b style="color:#ff7fa8"> 테요</b></div>
        <div><span style="font-weight:700">词干</span> + 던데요：맛있<b style="color:#ff7fa8">던데요</b></div>
        <div><span style="font-weight:700">词干</span> + 더라：좋<b style="color:#ff7fa8">더라</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있었던데요（었 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있던데요（던데요 자체가 过去）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">재미있더라요（더라 + 요）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재미있더라 또는 재미있더라고요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g50', 'g52'],
  },

  {
    id: 'card-p18-l02',
    partNumber: 18,
    lessonNumber: 2,
    title: '-았/었/였더니，-더니',
    whatItDoes: '表示前后动作的因果或对比关系（基于亲身经历）',
    whatItDoesBody: '-았/었/였더니 表示说话者亲身做了某事之后发现了某种结果，相当于"（我）做了……之后/结果……"，主语通常是第一人称。\n-더니 表示回忆过去观察到的事实，并引出与之相关的结果或对比，相当于"（之前）……，（所以/但是）……"，主语通常是第三人称或自然现象。',
    structureNote: '-았/었/였더니：动词 词干 + 았/었/였더니（依据 아/어/여 词干变化）\n-더니：动词/形容词 词干 + 더니（过去回想，与收音有无无关）',
    rulesNote: '-았더니 主语必须是第一人称（나/저）才自然。用于第三人称主语时不自然或可能成为病句。\n-더니 主语为第三人称或自然现象时较自然。如 "비가 오더니 개었어요"，表示前句与后句关系的转换。',
    scenarioNote: '-았더니 常用在 "먹었더니 배불러요" 这样的句子中，陈述直接经验后的结果。\n-더니 常用在 "아이가 울더니 갑자기 웃었어요" 这样的句子中，观察第三人称行为变化后传达。',
    step0Html: `<div class="card-title">做了之后……之前……结果……</div>
<div class="card-body">亲身经历的前后关系，主语决定选哪个。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">第一人称 vs 第三人称</div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 았더니 前的主语 = 나/저，더니 前的主语 = 第三人称/自然现象</div>
</div>
<div class="reminder-box">-았더니 表示第一人称经验的结果，-더니 表示第三人称观察到的转换。</div>`,
    compareHtml: `<div class="card-title">-았더니 vs -더니 vs -(으)니까</div>
<div class="card-body">都表示前后关系，但主语和语气不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았더니</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">第一人称直接经验后发现结果</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약을 먹었더니 나았어요</span><span style="font-size:16px;color:#5a4640">吃了药之后好了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-더니</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">第三人称观察后的转换/结果</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아이가 울더니 잠들었어요</span><span style="font-size:16px;color:#5a4640">孩子哭着哭着睡着了</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)니까</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">原因/理由（主语无限制）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약을 먹으니까 나았어요</span><span style="font-size:16px;color:#5a4640">因为吃了药所以好了</span></div>
  </div>
</div>
<div class="reminder-box">-았더니 和 -더니 的核心区分标准是主语的人称。</div>`,
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
      { type: 'rule', text: '-았/었/였더니：词干 + 았/었/였더니（아 词干→았더니，어/여 词干→었더니/였더니）', examples: '먹었더니 / 운동했더니 / 잤더니 / 공부했더니' },
      { type: 'rule', text: '-더니：词干 + 더니（与收音有无无关）', examples: '울더니 / 오더니 / 먹더니 / 춥더니' },
      { type: 'usage', text: '-았더니 的主语必须是第一人称（나/저）。用于第三人称主语时不自然', examples: '내가 먹었더니 배불러요（✓）/ 친구가 먹었더니 배불렀어요（✗ 不自然）' },
      { type: 'usage', text: '-더니 的主语是第三人称或自然现象时较自然', examples: '그 사람이 공부하더니 합격했어요 / 비가 오더니 개었어요' },
      { type: 'note', text: '-더니 表示前句与后句之间的转换（变化）或结果关系', examples: '어렸을 때 키가 작더니 지금은 크네요（变化）/ 열심히 하더니 결국 해냈어요（结果）' },
      { type: 'compare', text: '-았더니 vs -(으)니까：았더니 表示第一人称直接经验的结果，(으)니까 表示原因/理由，主语无限制', examples: '약을 먹었더니 나았어요（直接经验结果）/ 약을 먹으니까 나았어요（原因说明）' },
      { type: 'note', text: '-았더니 和 -더니 都含"回想体"-더-，中文没有对应：前一小句必须是说话人亲身经历（았더니）或亲眼观察到（더니）的事，不能用于只是听说、自己没亲历的事。这层"亲历"语气是中文母语者最容易忽略的。', examples: '내가 먹었더니 배불러요（亲身经历）/ 그 사람이 공부하더니 합격했어요（亲眼观察）' },
      { type: 'note', text: '-았더니 后一小句要的是"因前面动作而出现的结果/发现"，不能是说话人自己接着又做的新动作。想说"我吃了饭然后学习"这种连续动作，要用 -고 나서 / -고，别用 -았더니。', examples: '약을 먹었더니 금방 나았어요（自然出现的结果，✓）/ 밥을 먹고 나서 공부했어요（自己接着做的动作，用 -고 나서）' },
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
      { wrong: '친구가 먹었더니 배불렀어요（第三人称 + 았더니）', correct: '친구가 먹더니 배부른 것 같았어요 또는 내가 먹었더니 배불렀어요', note: '-았더니 前的主语必须是第一人称。第三人称主语要用 -더니。' },
      { wrong: '비가 왔더니 길이 미끄러워요（自然现象 + 았더니）', correct: '비가 오더니 길이 미끄러워졌어요', note: '自然现象作主语时用 -더니 较自然。-았더니 只用于第一人称直接经验。' },
      { wrong: '잠을 자더니 피로가 풀렸어요（第一人称 经验用 더니）', correct: '잠을 잤더니 피로가 풀렸어요', note: '要说 나/저 的直接经验后的结果时用 -았더니。第一人称主语只用 -더니 会不自然。' },
      { wrong: '운동했더니에 살이 빠졌어요（았더니 + 에 助词）', correct: '운동했더니 살이 빠졌어요', note: '-았더니 是接续词尾，后面不加助词。' },
    ],
    quickTable: {
      title: '-았더니 vs -더니 核心差异',
      headers: ['항목', '-았더니', '-더니'],
      rows: [
        ['主语人称', '第一人称（나/저）', '第三人称/自然现象'],
        ['时态', '过去完成（았/었）', '过去进行/状态'],
        ['语气', '直接经验后发现结果', '观察到的变化/转换'],
        ['例句', '먹었더니 배불러요', '울더니 잠들었어요'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-았더니 / -더니',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '약을 ___ 금방 나았어요。（吃了药之后，很快好了。）',
          options: ['먹었더니요', '먹으니더니', '먹더니', '먹었더니'],
          answer: 3 as 0|1|2|3,
          explanation: '我亲自吃药的直接经验后的结果 → -았더니。먹다 词干 먹（收音 ㄱ）+ 었더니 = 먹었더니。먹더니 是用于第三人称观察的形式。',
        },
        {
          prompt: '아이가 ___ 갑자기 잠들었어요。（孩子哭着哭着突然睡着了。）',
          options: ['울더니', '울더니요', '우니더니', '울었더니'],
          answer: 0 as 0|1|2|3,
          explanation: '观察 아이（第三人称）的行为变化 → -더니。울다 词干 울（ㄹ收音）+ 더니 = 울더니。울었더니 是第一人称经验结果的表达，用于第三人称主语时不自然。',
        },
        {
          prompt: '다음 중 -았더니 가 올바르게 쓰인 것은？',
          options: ['날씨가 맑았더니 추워졌어요', '잠을 잤더니 피로가 풀렸어요', '비가 왔더니 길이 미끄러워요', '아이가 먹었더니 배불렀어요'],
          answer: 1 as 0|1|2|3,
          explanation: '-았더니 表示第一人称直接经验后的结果。잠을 잤더니 피로가 풀렸어요 — 我亲自睡的直接经验（✓）。其余是自然现象或第三人称主语，应用 더니。',
        },
        {
          prompt: '날씨가 맑___ 갑자기 비가 왔어요。（之前天气晴朗，突然下起了雨。）',
          options: ['더니를', '았더니', '더니', '더니요'],
          answer: 2 as 0|1|2|3,
          explanation: '观察 날씨（自然现象）的变化 → -더니。맑다 词干 맑（收音 ㄱ）+ 더니 = 맑더니。았더니 是第一人称经验的表达，用于自然现象主语时不自然。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第2课</div>
    <div class="ov-hero-title">-았더니，-더니</div>
    <div class="ov-hero-sub">第一人称经验结果 · 第三人称观察转换</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">第一人称经验结果</div>
      <div class="ko">词干 + 았/었더니</div>
      <div class="zh">我做了……之后（结果）</div>
    </div>
    <div class="ov-block">
      <div class="badge">第三人称观察转换</div>
      <div class="ko">词干 + 더니</div>
      <div class="zh">（之前）……（然后/但是）……</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心区分</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">나/저 + 았더니</span>：약을 먹<b style="color:#ff7fa8">었더니</b> 나았어요</div>
        <div><span style="font-weight:700">第三人称 + 더니</span>：아이가 울<b style="color:#ff7fa8">더니</b> 잠들었어요</div>
        <div><span style="font-weight:700">自然现象 + 더니</span>：비가 오<b style="color:#ff7fa8">더니</b> 개었어요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구가 먹었더니（第三人称 + 았더니）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구가 먹더니（第三人称 + 더니）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 왔더니（自然现象 + 았더니）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비가 오더니（自然现象 + 더니）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: [],
  },

  {
    id: 'card-p18-l03',
    partNumber: 18,
    lessonNumber: 3,
    title: '(으)로 인하여，(으)로 인한，-길래',
    whatItDoes: '表示原因（正式）或说话者的反应动机',
    whatItDoesBody: '(으)로 인하여 表示原因，相当于"由于……/因为……"，比 때문에 更正式，多用于书面语和新闻报道。\n(으)로 인한 是 (으)로 인하여 的冠词形，修饰后面的名词，相当于"由于……导致的……"。\n-길래 表示说话者因为观察到某种情况而做出相应的行动，相当于"因为（看到/听到）……所以……"，带有直接动机语气。',
    structureNote: '(으)로 인하여：名词 + (으)로 인하여（有收音 → 으로 인하여，无/ㄹ → 로 인하여）\n(으)로 인한：名词 + (으)로 인한 + 名词（冠词形）\n-길래：动词/形容词 词干 + 길래（口语体，与收音有无无关）',
    rulesNote: '(으)로 인하여 也可替换为 -로 인해서 / -로 인해。书面体用 (으)로 인하여，口语体用 -로 인해 更自然。\n-길래 是说话人直接观察或听到前句的情境后，在后句写出相应的反应行动。主语多为第一人称。',
    scenarioNote: '(으)로 인하여 用在新闻、报告书、公文中，如 "태풍으로 인하여 항공편이 결항됐습니다"，表达正式原因。\n-길래 用在回答 "왜 그랬어?" 时，如 "배가 고프길래 먹었어"，用于说明直接动机。',
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
<div class="reminder-box">(으)로 인하여 前接名词，-길래 前接动词/形容词 词干。</div>`,
    compareHtml: `<div class="card-title">(으)로 인하여 vs -때문에 vs -길래</div>
<div class="card-body">都表示原因，但文体和语气不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">(으)로 인하여</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词后，正式书面，新闻/公文</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사고로 인하여 도로가 통제됐습니다</span><span style="font-size:16px;color:#5a4640">由于事故，道路被封锁</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-때문에</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词/动词后，口语书面均可</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비 때문에 못 나갔어요</span><span style="font-size:16px;color:#5a4640">因为下雨没能出去</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-길래</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词后，口语体，直接动机</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있어 보이길래 시켜 봤어요</span><span style="font-size:16px;color:#5a4640">看起来好吃，所以点了一下</span></div>
  </div>
</div>
<div class="reminder-box">-길래 的特点是后句为第一人称的反应行动。</div>`,
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
      { type: 'rule', text: '(으)로 인하여：收音 O → 으로 인하여，收音 X/ㄹ → 로 인하여', examples: '사고로 인하여 / 태풍으로 인하여 / 질병으로 인하여 / 화재로 인하여' },
      { type: 'rule', text: '(으)로 인한：名词 + (으)로 인한 + 名词（用冠词形修饰后面的名词）', examples: '사고로 인한 부상 / 태풍으로 인한 피해 / 스트레스로 인한 두통' },
      { type: 'rule', text: '-길래：动词/形容词 词干 + 길래（与收音有无无关）', examples: '배고프길래 / 맛있어 보이길래 / 불이 켜져 있길래 / 오길래' },
      { type: 'usage', text: '(으)로 인하여 的缩略形：로 인해（口语）/ 로 인해서（口语与书面语之间），三种形式可替换', examples: '태풍으로 인해 결항됐어요 / 사고로 인해서 늦었어요' },
      { type: 'usage', text: '-길래 前句的情境由说话人直接感知，后句采取反应行动', examples: '싸길래 많이 샀어요 / 전화가 오길래 받았어요 / 문이 열려 있길래 들어갔어요' },
      { type: 'note', text: '-길래 的后句主语必须是第一人称才自然。不能与命令句·共动句一起使用', examples: '배고프길래 먹었어요（✓）/ 배고프길래 먹어요（✗ 不能用于命令）' },
      { type: 'compare', text: '(으)로 인하여 vs (으)로 해서：인하여 更正式、更书面，해서 处于口语与书面语之间', examples: '태풍으로 인하여（报告书） / 태풍으로 해서（日常对话可用）' },
      { type: 'note', text: '负迁移陷阱：中文"由于"可以直接领起一整句（"由于下雨"），但 (으)로 인하여 前面只能接名词。要先把动作名词化再接，或干脆改用接词干的 -아서/때문에。', examples: '비로 인하여 항공편이 결항됐습니다（名词，✓）/ 비가 오로 인하여（✗，动词干不能接）→ 비가 와서 / 비 때문에' },
      { type: 'compare', text: '-길래 vs -아서/-(으)니까：길래 强调"因(刚)观察·感觉到的情况→我随即做出反应"，后句多为过去、且不能接命令/劝诱；아서/니까 是一般因果，主语不限，后句可命令/劝诱', examples: '싸길래 많이 샀어요（我的临时反应，✓）/ 싸니까 많이 사세요（一般理由+劝诱，用 니까）' },
      { type: 'note', text: '-길래 的后句必须是"我"针对刚感知到的情况所做出的主观反应或行动，不能是与我无关的客观结果。中文"所以"两种都能带，别照搬。', examples: '전화가 오길래 받았어요（我的反应，✓）/ 客观结果"雨下所以路滑"要用 비가 와서 길이 미끄러워요，不用 길래' },
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
      { wrong: '태풍이로 인하여 결항됐습니다（名词 + 이로 인하여）', correct: '태풍으로 인하여 결항됐습니다', note: '태풍 的末字 풍收音为 ㅇ → 으로 인하여。이로 是不存在的形式，(으)로 인하여 前面不插入 이。' },
      { wrong: '배고프길래 먹어라（길래 + 命令句）', correct: '배고프길래 뭔가 먹었어요', note: '-길래 后面不能接命令句或共动句。后句必须是说话人的反应行动（过去时/现在时）。' },
      { wrong: '사고로 인한 때문에 도로가 막혔어요（인한 + 때문에 重复）', correct: '사고로 인하여 도로가 막혔어요 또는 사고 때문에 도로가 막혔어요', note: '(으)로 인하여 和 때문에 都是相同的表原因功能，所以不同时使用。' },
      { wrong: '맛있어 보이길래서 시켰어요（길래 + 서 重复）', correct: '맛있어 보이길래 시켰어요', note: '-길래 是接续词尾，后面不加 서。길래서 是不存在的形式。' },
    ],
    quickTable: {
      title: '(으)로 인하여 接续形式',
      headers: ['名词末音', '形式', '例句', '意思'],
      rows: [
        ['收音 O', '으로 인하여', '태풍으로 인하여', '由于台风'],
        ['收音 X/ㄹ', '로 인하여', '사고로 인하여', '由于事故'],
        ['冠词形', '(으)로 인한 + 名词', '사고로 인한 부상', '由于事故导致的伤害'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 인하여 / -길래',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '태풍___ 인하여 항공편이 결항됐습니다。（由于台风，航班取消了。）',
          options: ['로의', '으로', '이로', '으로의'],
          answer: 1 as 0|1|2|3,
          explanation: '태풍 的末字 풍收音为 ㅇ → 有收音 → 으로 인하여。이로 是不存在的形式，으로의/로의 也是不存在的形式。',
        },
        {
          prompt: '싸___ 두 개 샀어요。（因为便宜，买了两个。）',
          options: ['길래요', '기 때문에', '길래', '길래서'],
          answer: 2 as 0|1|2|3,
          explanation: '싸다 词干 싸（无收音）+ 길래 = 싸길래。-길래 是口语体表直接动机的表达。길래서 是不存在的形式，기 때문에 是更正式的表原因表达。',
        },
        {
          prompt: '다음 중 (으)로 인한이 올바르게 쓰인 것은？',
          options: ['스트레스로 인한 두통', '스트레스로 인하여 두통', '스트레스이로 인한 두통', '스트레스로 인한 때문에 두통'],
          answer: 0 as 0|1|2|3,
          explanation: '(으)로 인한 是修饰名词的冠词形：스트레스로 인한 두통（由压力引起的头痛）。인하여 后面不能只接名词，인한 때문에 是重复，이로 인한 是错误插入 이。',
        },
        {
          prompt: '불이 켜져 있___ 들어가 봤어요。（因为灯亮着，就进去看了看。）',
          options: ['길래요', '으므로', '길래서', '길래'],
          answer: 3 as 0|1|2|3,
          explanation: '켜져 있다 词干 있（收音 ㅅ，有收音），但 -길래 与收音有无无关，直接接在词干后：있길래。길래서 是不存在的形式，으므로 是正式书面体。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第3课</div>
    <div class="ov-hero-title">(으)로 인하여，(으)로 인한，-길래</div>
    <div class="ov-hero-sub">正式原因 · 名词修饰 · 口语动机</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">正式原因</div>
      <div class="ko">名词 + (으)로 인하여</div>
      <div class="zh">由于……（书面正式）</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词修饰</div>
      <div class="ko">名词 + (으)로 인한 + 名词</div>
      <div class="zh">由……引起的……</div>
    </div>
    <div class="ov-block">
      <div class="badge">口语动机</div>
      <div class="ko">词干 + 길래</div>
      <div class="zh">因为……所以……（直接动机）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">收音 O</span>：태풍<b style="color:#ff7fa8">으로 인하여</b> / 태풍<b style="color:#ff7fa8">으로 인한</b> 피해</div>
        <div><span style="font-weight:700">收音 X/ㄹ</span>：사고<b style="color:#ff7fa8">로 인하여</b> / 화재<b style="color:#ff7fa8">로 인한</b> 피해</div>
        <div><span style="font-weight:700">词干</span> + 길래：싸<b style="color:#ff7fa8">길래</b> / 오<b style="color:#ff7fa8">길래</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배고프길래 먹어라（길래 + 命令句）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배고프길래 먹었어요（反应行动）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">맛있어 보이길래서（길래 + 서）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">맛있어 보이길래（길래서 不存在的形式）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g36'],
  },

  {
    id: 'card-p18-l04',
    partNumber: 18,
    lessonNumber: 4,
    title: '-는/은/ㄴ 듯하다，-는/은/ㄴ/을 모양이다',
    whatItDoes: '表示推测或判断（好像……/看来……）',
    whatItDoesBody: '-는/은/ㄴ 듯하다 表示根据某种迹象做出推测，相当于"好像……/似乎……"，语气较温和，也可用于比喻。\n-는/은/ㄴ/을 모양이다 表示根据观察到的状况推测某种情况，相当于"看来……/好像……"，比 듯하다 更强调外部迹象。',
    structureNote: '-는/은/ㄴ 듯하다：动词现在（-는 듯하다）/ 形容词（-은/ㄴ 듯하다）/ 过去（-은/ㄴ 듯하다）\n-는/은/ㄴ/을 모양이다：动词现在（-는 모양이다）/ 过去（-은/ㄴ 모양이다）/ 将来（-을/ㄹ 모양이다）/ 形容词（-은/ㄴ 모양이다）',
    rulesNote: '-듯하다 除推测外，也用于"마치 ~인 것처럼"的比喻表达（눈이 녹듯 사라졌어요）。\n-모양이다 是基于眼前情境或间接证据的推测，比 듯하다 的推测根据更偏外在迹象。',
    scenarioNote: '-듯하다 用在 "피곤한 듯해요" 这样的句子中，用于谨慎推测对方状态。\n-모양이다 用在 "비가 올 모양이에요" 这样的句子中，常用于观察天气或情境后进行预测。',
    step0Html: `<div class="card-title">好像……看来……</div>
<div class="card-body">两种表达都是推测，但推测依据的性质不同。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">推测 두 가지 방식</div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 듯하다 也能用于比喻，모양이다 基于外部证据</div>
</div>
<div class="reminder-box">注意冠词形接续：动词现在用 -는，形容词用 -은/ㄴ。</div>`,
    compareHtml: `<div class="card-title">-듯하다 vs -모양이다 vs -(으)ㄹ 것 같다</div>
<div class="card-body">比较三种推测表达。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-듯하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">推测 + 可用于比喻，主观印象</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">모르는 듯해요</span><span style="font-size:16px;color:#5a4640">好像不知道</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-모양이다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">基于外部证据的推测，客观观察</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">늦을 모양이에요</span><span style="font-size:16px;color:#5a4640">看来要迟到了</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)ㄹ 것 같다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">最常见的推测，口语中最常用</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 올 것 같아요</span><span style="font-size:16px;color:#5a4640">好像要下雨了</span></div>
  </div>
</div>
<div class="reminder-box">三种表达很多时候可以替换，但 듯하다 偏比喻，모양이다 更专用于外部观察。</div>`,
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
      { type: 'rule', text: '-듯하다 接续：动词现在冠词形 + 듯하다（먹는 듯하다），形容词冠词形 + 듯하다（피곤한 듯하다），过去（먹은 듯하다）', examples: '모르는 듯하다 / 피곤한 듯하다 / 먹은 듯하다 / 떠난 듯하다' },
      { type: 'rule', text: '-모양이다 接续：动词现在（-는 모양이다）/ 过去（-은/ㄴ 모양이다）/ 将来（-을/ㄹ 모양이다）/ 形容词（-은/ㄴ 모양이다）', examples: '오는 모양이다 / 간 모양이다 / 올 모양이다 / 바쁜 모양이다' },
      { type: 'usage', text: '-듯하다 的比喻用法："마치 ~인 것처럼"（好像……一样）的意思（눈이 녹듯 사라졌어요）', examples: '꿈을 꾸는 듯한 풍경이에요 / 봄이 온 듯한 날씨네요' },
      { type: 'usage', text: '-모양이다 在有外部可观察到的依据时更自然', examples: '구름이 많으니 비가 올 모양이에요 / 불이 꺼진 걸 보니 잔 모양이에요' },
      { type: 'note', text: '-듯하다 与 -모양이다 的句末形分别为 -듯해요，-모양이에요', examples: '피곤한 듯해요 / 늦을 모양이에요' },
      { type: 'compare', text: '-듯하다 vs -(으)ㄹ 것 같다：两者很多时候可以替换，但 듯하다 还可用于比喻', examples: '모르는 듯해요 ↔ 모르는 것 같아요（可替换）/ 꿈을 꾸는 듯한（比喻，换成 것 같다 不自然）' },
      { type: 'note', text: '-모양이다 是"根据外部迹象推测别人或情况"，不能用来说自己的主观感觉。想说"我好像感冒了"这类关于自己身体/心情的推测，要用 -것 같다，不能用 -모양이다', examples: '감기에 걸린 것 같아요（我好像感冒了，✓）/ 感觉别人感冒了可说 감기에 걸린 모양이에요' },
      { type: 'example', text: '모르는 듯해요 / 피곤한 듯해요 / 비가 올 모양이에요 / 이미 온 모양이에요' },
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
      { icon: '📵', context: '对方很忙', ko: '전화를 안 받는 걸 보니 바쁜 모양이에요.', zh: '看不接电话的样子，看来很忙。' },
      { icon: '🚗', context: '已经离开', ko: '차가 없는 걸 보니 먼저 간 모양이에요.', zh: '看没有车，看来先走了。' },
      { icon: '🌸', context: '春天来了', ko: '날씨가 봄이 온 듯한 느낌이에요.', zh: '天气有种春天来了的感觉。' },
    ],
    mistakes: [
      { wrong: '피곤하는 듯해요（形容词 + 는 듯하다）', correct: '피곤한 듯해요', note: '形容词的冠词形不是 -는 而是 -은/ㄴ。피곤하다 → 피곤한 듯해요。只有动词才用现在形 -는。' },
      { wrong: '비가 올 모양이다（单独结句不自然）', correct: '비가 올 모양이에요（口语自然形式）', note: '모양이다 单独结句在口语中不自然。口语中用 모양이에요，正式场合用 모양입니다 更自然。' },
      { wrong: '모르은 모양이에요（给无收音动词用有收音的冠词形词尾）', correct: '모르는 모양이에요', note: '모르다 是动词，现在冠词形是 -는。无论收音有无，动词现在形都用 -는。有收音的形式 -은 用于形容词或动词过去形。' },
      { wrong: '비가 오는 듯한 것 같아요（듯하다 + 것 같다 重复）', correct: '비가 오는 듯해요 또는 비가 올 것 같아요', note: '-듯하다 和 -것 같다 是相同功能的推测表达，所以不同时使用。' },
    ],
    quickTable: {
      title: '-듯하다 / -모양이다 冠词形 接续',
      headers: ['时态/词性', '듯하다 前', '모양이다 前', '例句'],
      rows: [
        ['动词现在', '-는', '-는', '먹는 듯하다 / 오는 모양이다'],
        ['动词过去', '-은/ㄴ', '-은/ㄴ', '먹은 듯하다 / 간 모양이다'],
        ['动词将来', '(-을 듯하다 可用)', '-을/ㄹ', '올 듯하다 / 올 모양이다'],
        ['形容词', '-은/ㄴ', '-은/ㄴ', '피곤한 듯하다 / 바쁜 모양이다'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-듯하다 / -모양이다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '얼굴을 보니 많이 피곤___ 듯해요。（看脸色，好像很累。）',
          options: ['했는', '하던', '하는', '한'],
          answer: 3 as 0|1|2|3,
          explanation: '피곤하다 是形容词 → 冠词形 -은/ㄴ：피곤하+ㄴ = 피곤한 듯해요。给形容词用动词形 -는 是错误的。',
        },
        {
          prompt: '전화를 안 받는 걸 보니 바쁜 ___。（看不接电话，看来很忙。）',
          options: ['모양이에요', '모양해요', '듯이에요', '듯모양이에요'],
          answer: 0 as 0|1|2|3,
          explanation: '-모양이다 的终结形：모양이에요（口语）。듯이에요/모양해요/듯모양이에요 都是不存在的形式。',
        },
        {
          prompt: '비가 오___ 듯해요。（好像要下雨。）— 请选出动词现在冠词形',
          options: ['왔는', '온', '오는', '올'],
          answer: 2 as 0|1|2|3,
          explanation: '오다（动词）的现在冠词形是 -는：오는 듯해요（✓）。온 是过去形（온 듯하다），올 是将来形，왔는 是非标准形式。',
        },
        {
          prompt: '다음 중 -듯하다 가 올바르게 쓰인 것은？',
          options: ['가는듯이에요', '모르는 듯해요', '피곤하는 듯해요', '먹를 듯해요'],
          answer: 1 as 0|1|2|3,
          explanation: '모르다（动词）现在冠词形：모르는 듯해요（✓）。피곤하는 是给形容词用动词形词尾的错误，먹를 是不存在的形式，가는듯이에요 是不存在的终结形。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第4课</div>
    <div class="ov-hero-title">-듯하다，-모양이다</div>
    <div class="ov-hero-sub">好像……/似乎 · 看来……/看起来</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">好像/似乎</div>
      <div class="ko">冠词形 + 듯하다</div>
      <div class="zh">好像……（推测+比喻）</div>
    </div>
    <div class="ov-block">
      <div class="badge">看来</div>
      <div class="ko">冠词形 + 모양이다</div>
      <div class="zh">看来……（基于外部观察）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠词形 接续</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">动词 现在</span>：모르<b style="color:#ff7fa8">는</b> 듯하다 / 오<b style="color:#ff7fa8">는</b> 모양이다</div>
        <div><span style="font-weight:700">动词 过去</span>：먹<b style="color:#ff7fa8">은</b> 듯하다 / 간 모양이다</div>
        <div><span style="font-weight:700">形容词</span>：피곤<b style="color:#ff7fa8">한</b> 듯하다 / 바쁜 모양이다</div>
        <div><span style="font-weight:700">将来</span>：비가 올 모양이다</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하는 듯해요（形容词 + 는）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤한 듯해요（形容词 + 은/ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오는 듯한 것 같아요（중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오는 듯해요 또는 올 것 같아요</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g45'],
  },

  {
    id: 'card-p18-l05',
    partNumber: 18,
    lessonNumber: 5,
    title: '-을/ㄹ 텐데，더러/보고',
    whatItDoes: '推测前提下的期待/担忧，以及"叫某人/对某人"的表达',
    whatItDoesBody: '-을/ㄹ 텐데 在推测或预料某种状况的前提下，表达说话者的期待、担忧或遗憾，相当于"应该……/想必……（所以……）"。\n-더러/보고 均表示行为的对象，相当于"叫……/对……说"，主要用于命令、请求、传话等句子中。더러 比 보고 语气稍正式。',
    structureNote: '-을/ㄹ 텐데：动词/形容词 词干 + (으)ㄹ 텐데（有收音 + 을 텐데，无收音/ㄹ + ㄹ 텐데）\n더러/보고：名词（사람） + 더러/보고 + 动词（命令/请求句）',
    rulesNote: '-을/ㄹ 텐데 前句主语可以是说话人自己或第三人称。后面接请求、担忧、建议等。\n더러/보고 的前面必须是人物名词，不能用事物或抽象名词。',
    scenarioNote: '-을/ㄹ 텐데 常用于体谅对方，如 "피곤할 텐데 쉬세요"。\n더러/보고 常与传话动词（말하다/시키다/부탁하다）连用，如 "누구보고 가라고 했어？"。',
    structures: [
      {
        ko: '动词/形容词 词干 + (으)ㄹ 텐데',
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
        ko: '名词 + 더러',
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
        ko: '名词 + 보고',
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
      { type: 'rule', text: '动词/形容词 有收音 词干 + 을 텐데', examples: '먹을 텐데，읽을 텐데，좋을 텐데' },
      { type: 'rule', text: '动词/形容词 无收音/ㄹ 词干 + ㄹ 텐데', examples: '가다→갈 텐데，오다→올 텐데，알다→알 텐데' },
      { type: 'note', text: '-을/ㄹ 텐데 后面跟随请求、担忧、建议等表达', examples: '바쁠 텐데 괜찮으세요？/ 힘들 텐데 도와드릴게요' },
      { type: 'compare', text: '-을/ㄹ 텐데 vs -겠지만：텐데 表示说话人的推测+体谅，겠지만 表示让步（虽然…但）' },
      { type: 'rule', text: '人物名词 + 더러/보고 + 命令/共动 간접인용', examples: '동생더러 오라고 했어요 / 친구보고 기다리라고 했어요' },
      { type: 'compare', text: '더러 vs 보고：含义相同，더러 稍正式', examples: '어머니더러 말했어요（正式）/ 친구보고 말했어요（口语）' },
      { type: 'note', text: '더러/보고 前面只能接人物名词，不能用事物名词', examples: '책보고 읽으라고 했어요（✗） → 친구보고 읽으라고 했어요（✓）' },
      { type: 'note', text: '更关键的限制：더러/보고 后面只能跟命令/请求/共动的间接引语（-라고/-자고/-달라고），不能跟陈述句（-다고）。想说"对某人说（某件事）"这种陈述内容，要用 에게/한테，不能用 보고/더러', examples: '친구보고 오라고 했어요（✓，命令）/ 친구보고 예쁘다고 했어요（✗，陈述）→ 친구한테 예쁘다고 했어요（✓）' },
      { type: 'usage', text: '-았/었을 텐데 表示对过去的反事实推测，相当于"本来会……（可惜没做到）"，常带遗憾语气', examples: '일찍 출발했으면 안 늦었을 텐데（要是早点出发就不会迟到了，可惜迟到了）' },
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
      { wrong: '피곤을 텐데（名词后接 을 텐데）', correct: '피곤할 텐데', note: '피곤하다 是形容词，所以在词干 피곤하- 后加 ㄹ 텐데：피곤할 텐데。名词后不直接加 을 텐데。' },
      { wrong: '갈 텐데요（单独结句）', correct: '갈 텐데 조심하세요 等需要后半句', note: '-을/ㄹ 텐데 通常单独结句不自然。后面需要接请求/担忧/建议的从句才自然。' },
      { wrong: '책보고 읽으라고 했어요（事物名词 + 보고）', correct: '동생보고 읽으라고 했어요', note: '더러/보고 只能用在人物名词后面。책、가방 等事物不能用。' },
      { wrong: '친구더러게 말했어요（더러 + 에게 重复）', correct: '친구더러 말했어요 또는 친구에게 말했어요', note: '더러 和 에게 是相同功能的助词，所以不重复使用。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 텐데，더러/보고',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '오늘 많이 ___ 텐데 쉬세요。（今天应该很累，请休息。）',
          options: ['피곤하는', '피곤한', '피곤을', '피곤할'],
          answer: 3 as 0|1|2|3,
          explanation: '피곤하다（形容词）词干 피곤하- + ㄹ 텐데：피곤할 텐데（✓）。피곤을/피곤하는/피곤한 텐데 都是病句。',
        },
        {
          prompt: '비가 ___ 텐데 우산을 가져가세요。（应该会下雨，带把伞去吧。）',
          options: ['올', '오을', '온', '오는'],
          answer: 0 as 0|1|2|3,
          explanation: '오다（动词）无收音词干 오- + ㄹ 텐데：올 텐데（✓）。오는 是现在冠词形，온 是过去形，오을 是不存在的形式。',
        },
        {
          prompt: '선생님이 나___ 발표하라고 하셨어요。（老师叫我去发表。）',
          options: ['로', '더러', '한테서', '에서'],
          answer: 1 as 0|1|2|3,
          explanation: '더러 是表示 "叫某人（做某事）" 的行为对象助词。에서 是地点/出发点，한테서 是出发点，로 是方向/手段助词，都不符合此语境。',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['책더러 읽으라고 했어요', '날씨보고 좋아지라고 했어요', '동생보고 기다리라고 했어요', '가방보고 들고 가라고 했어요'],
          answer: 2 as 0|1|2|3,
          explanation: '보고/더러 只能用在人物名词后面。동생（人）보고（✓）。가방/날씨/책 都是事物，不能用 보고/더러。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第5课</div>
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
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">接续形式</div></div>
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
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤을 텐데（名词 直接接）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤할 텐데（形容词 词干+ㄹ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">책보고 읽으라고（事物+보고）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구보고 읽으라고（사람+보고）</span></div></div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 텐데 接形容词/动词 词干，더러/보고 只接人名词</div>
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
      title: '-을/ㄹ 텐데 接续 / 더러·보고 비교',
      headers: ['区分', '形式', '例句'],
      rows: [
        ['有收音 词干', '+ 을 텐데', '먹을 텐데，읽을 텐데，좋을 텐데'],
        ['无收音/ㄹ 词干', '+ ㄹ 텐데', '갈 텐데，올 텐데，알 텐데'],
        ['더러（稍正式）', '사람 + 더러', '나더러，학생더러，선생님더러'],
        ['보고（口语）', '사람 + 보고', '친구보고，동생보고，그 사람보고'],
      ],
    },
    linkedGrammarIds: ['g48', 'g8'],
  },

  {
    id: 'card-p18-l06',
    partNumber: 18,
    lessonNumber: 6,
    title: '-잖아요，-거든요',
    whatItDoes: '确认共识，或补充说明理由',
    whatItDoesBody: '-잖아요 用于确认说话双方都知道的事实，带有"你不是知道吗/你看……不是……嘛"的语气，暗示听话人应该已经了解该信息。\n-거든요 用于补充说话人认为对方不知道的背景信息或理由，相当于"因为……（你可能不知道）/其实……"，语气比 -니까 更温和，有轻微说明/解释感。',
    structureNote: '-잖아요：动词/形容词/이다 词干 + 잖아요（现在），+ 았/었잖아요（过去）\n-거든요：动词/形容词/이다 词干 + 거든요（现在），+ 았/었거든요（过去）',
    rulesNote: '-잖아요 用于说话人和听话人共享的信息。用于听话人完全不知道的信息时不自然。\n-거든요 用于将只有说话人知道的信息告诉对方。可单独用于句末，也可用于原因从句。',
    scenarioNote: '-잖아요 用在 "그 사람 알잖아요！（你认识那个人的嘛！）" 这样的句子中，也用于轻微的抗议或唤起注意。\n-거든요 用在 "사실 저 한국 사람이거든요（其实我是韩国人）" 这样的句子中，常用于自然引入新的背景信息。',
    structures: [
      {
        ko: '动词/形容词 词干 + 잖아요',
        tokens: [
          { text: '그 영화', role: 'subject' },
          { text: ' 재미있잖아요', role: 'verb' },
        ],
        zh: '那部电影很有趣嘛（你知道的）。',
      },
      {
        ko: '过去 + 았/었잖아요',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: ' 말했잖아요', role: 'verb' },
        ],
        zh: '我说过嘛（你知道的）。',
      },
      {
        ko: '动词/形容词 词干 + 거든요',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: ' 좀', role: 'plain' },
          { text: ' 바쁘거든요', role: 'verb' },
        ],
        zh: '因为今天有点忙（你可能不知道）。',
      },
      {
        ko: '过去 + 았/었거든요',
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
      { type: 'rule', text: '动词/形容词 词干 + 잖아요（现在）', examples: '알잖아요，바쁘잖아요，좋잖아요' },
      { type: 'rule', text: '动词/形容词 词干 + 았/었잖아요（过去）', examples: '말했잖아요，갔잖아요，먹었잖아요' },
      { type: 'note', text: '-잖아요 只用于说话人和听话人共享的信息，对初次见面的人使用不自然', examples: '"그 사람 알잖아요"→仅在熟识时才自然' },
      { type: 'rule', text: '动词/形容词 词干 + 거든요（现在）', examples: '바쁘거든요，한국 사람이거든요（因为忙嘛、因为是韩国人嘛）' },
      { type: 'rule', text: '动词/形容词 词干 + 았/었거든요（过去）', examples: '먹었거든요，갔었거든요，했거든요' },
      { type: 'compare', text: '-거든요 vs -니까：거든요 引入新信息，니까 直接提出理由', examples: '늦었거든요（背景说明） vs 늦었으니까 빨리 가요（直接理由）' },
      { type: 'note', text: '-거든요 单独结句时带有说明/解释的语气', examples: '왜 왔어요？— 바빴거든요（为什么来了？——因为之前忙嘛。）' },
      { type: 'note', text: '语气提醒：-잖아요 不是中文那种中性的"……嘛"。它暗含"你早就该知道"，对长辈或上级使用容易显得责怪、教训。对长辈请改用陈述句或敬语说明，别用 -잖아요 来提醒对方', examples: '（对朋友）아까 말했잖아요（✓）/（对上司）아까 말씀드렸잖아요 会显得在责怪 → 改说 아까 말씀드렸는데요' },
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
        swapWords: ['같은 회사잖아요', '잘 아는 사이잖아요'],
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
      { icon: '💡', context: '补充背景', ko: '사실 저 거기 살았거든요, 그래서 잘 알아요.', zh: '其实我在那里住过，所以很熟。' },
      { icon: '🙋', context: '确认共识', ko: '한국어 어렵잖아요, 그래도 재미있어요.', zh: '韩语不是挺难的嘛，不过还是有意思。' },
      { icon: '📖', context: '说明理由', ko: '지금 공부 중이거든요，나중에 얘기해요.', zh: '我现在在学习（你不知道），待会儿再聊吧。' },
    ],
    mistakes: [
      { wrong: '对初次见面的人：그 노래 알잖아요（并非共享信息）', correct: '그 노래 아세요？', note: '-잖아요 只用于听话人已经知道的信息。对初次见面的人使用不自然。如果是对方不知道的信息，用疑问句更自然。' },
      { wrong: '왜 늦었어요？— 바빴잖아요（听话人不知道的情境）', correct: '바빴거든요', note: '表达对方不知道的理由用 -거든요。-잖아요 用于唤起听话人已知的事实。' },
      { wrong: '피곤하거든요잖아요（거든요 + 잖아요 重复）', correct: '피곤하거든요 또는 피곤하잖아요', note: '-거든요 和 -잖아요 不能同时使用。两个词尾用于不同的信息共享情境。' },
      { wrong: '먹었잖아요（我吃了这一事实对方不知道的情境）', correct: '먹었거든요', note: '传达对方不知道的信息时用 -거든요。-잖아요 只在共同经历过或对方已经知道时使用。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-잖아요，-거든요',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '（两人都去过那里）거기 좋___ 우리 또 가요！（那里很好嘛，我们再去吧！）',
          options: ['았거든요', '잖아요', '거든요', '겠잖아요'],
          answer: 1 as 0|1|2|3,
          explanation: '唤起两人都知道的事实时用 -잖아요：좋잖아요（✓）。-거든요 用于对方不知道的新信息。',
        },
        {
          prompt: '왜 일찍 왔어요？— 오늘 약속이 있___ 일찍 왔어요。（因为今天有约，所以早来了。）',
          options: ['거든요', '잖아요', '았잖아요', '는데요'],
          answer: 0 as 0|1|2|3,
          explanation: '说明对方不知道的理由时用 -거든요：있거든요（✓）。-잖아요 只用于共享信息。',
        },
        {
          prompt: '다음 중 -잖아요 를 올바르게 쓴 것은？',
          options: ['그 영화 좋잖아요（상대가 전혀 모름）', '왜 왔어요？ — 바빴잖아요（상대가 모름）', '우리 같이 봤잖아요，기억 안 나요？', '사실 저 한국 사람잖아요（처음 만남）'],
          answer: 2 as 0|1|2|3,
          explanation: '같이 봤잖아요：两人共同经历的共享信息 → -잖아요（✓）。其余都是对对方不知道的信息误用 -잖아요。',
        },
        {
          prompt: '사실 저 요즘 한국어 배우고 있___ 그래서 잘 알아요。（其实我最近在学韩语，所以很了解。）',
          options: ['았잖아요', '는데잖아요', '잖아요', '거든요'],
          answer: 3 as 0|1|2|3,
          explanation: '对方不知道的背景信息（如 사실）用 -거든요 引入：배우고 있거든요（✓）。-잖아요 仅用于共享信息·唤起注意。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P18 · 第6课</div>
    <div class="ov-hero-title">-잖아요，-거든요</div>
    <div class="ov-hero-sub">你知道的嘛 · 其实是这样（你不知道）</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">你知道的嘛</div>
      <div class="ko">词干 + 잖아요</div>
      <div class="zh">确认共识（双方都知道的事）</div>
    </div>
    <div class="ov-block">
      <div class="badge">其实是这样</div>
      <div class="ko">词干 + 거든요</div>
      <div class="zh">补充说明（对方不知道的背景）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心辨析</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">잖아요</span>：听话人已知信息 → <b style="color:#ff7fa8">共享信息·唤起注意</b></div>
        <div><span style="font-weight:700">거든요</span>：听话人不知道的信息 → <b style="color:#ff7fa8">引入新信息</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">对初次见面的人：알잖아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아세요？（不能用 잖아요）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">说明理由：바빴잖아요（对方不知道）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">바빴거든요</span></div></div>
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
    <div style="font-size:16px;color:#89756e;margin-top:2px">确认/唤起注意：双方都知道，说话人提醒</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘잖아요，그러니까요</span><span style="font-size:16px;color:#5a4640">不是挺忙的嘛</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-거든요</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">说明/引入：对方不知道，说话人说明</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘거든요, 그래서 못 가요</span><span style="font-size:16px;color:#5a4640">因为我很忙（你不知道）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-니까</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">直接提出理由，常用于命令/共动句</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바쁘니까 나중에 얘기해요</span><span style="font-size:16px;color:#5a4640">因为忙，之后再说吧</span></div>
  </div>
</div>`,
    compareLabel: '-잖아요 vs -거든요 vs -니까',
    quickTable: {
      title: '-잖아요 / -거든요 비교',
      headers: ['词尾', '使用条件', '语气', '例句'],
      rows: [
        ['-잖아요', '共享信息', '确认·唤起注意', '알잖아요，바쁘잖아요'],
        ['-았/었잖아요', '共享过去信息', '过去确认', '말했잖아요，갔잖아요'],
        ['-거든요', '新信息', '说明·引入', '바쁘거든요，한국 사람이거든요'],
        ['-았/었거든요', '新的过去信息', '过去说明', '먹었거든요，갔었거든요'],
      ],
    },
    linkedGrammarIds: ['g18', 'g19'],
  },

  {
    id: 'card-p18-l07',
    isPractice: true,
    partNumber: 18,
    lessonNumber: 7,
    title: 'P18 综合练习',
    whatItDoes: 'P18 第1～6课 综合练习',
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
    <div class="ov-hero-label">P18 · 综合练习</div>
    <div class="ov-hero-title">第1～6课 복습</div>
    <div class="ov-hero-sub">-테요/-던데요/-더라 · -았더니/-더니 · (으)로 인하여/-길래 · -듯하다/-모양이다 · -을/ㄹ 텐데 · -잖아요/-거든요</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P18 综合练习',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '태풍___ 인하여 행사가 취소됐어요。（因台风，活动取消了。）',
          options: ['이', '로', '을', '으로'],
          answer: 3 as 0|1|2|3,
          explanation: '태풍 的最后一个字 풍带有收音 ㅇ（有收音）→ 으로 인하여（✓）。无收音的名词或 ㄹ 收音则用 로 인하여。',
        },
        {
          prompt: '비가 오___ 우산을 샀어요。（因为下雨，买了雨伞。）',
          options: ['더니', '았더니', '도록', '길래'],
          answer: 3 as 0|1|2|3,
          explanation: '-길래：把说话人观察到的情境作为理由立即行动：오길래（✓）。도록 表示限度/目的，더니/았더니 表达不同的结果/发现。',
        },
        {
          prompt: '얼굴을 보니 많이 피곤___ 듯해요。（看脸色好像很累。）',
          options: ['했는', '한', '하는', '할'],
          answer: 1 as 0|1|2|3,
          explanation: '피곤하다（形容词）冠词形：피곤한 듯해요（✓）。形容词现在冠词形是 -은/ㄴ，只有动词才用 -는。',
        },
        {
          prompt: '손님이 오실 ___ 음식 준비해야겠어요。（客人应该会来，得准备食物。）',
          options: ['거든요', '잖아요', '텐데', '더니'],
          answer: 2 as 0|1|2|3,
          explanation: '-을/ㄹ 텐데：推测前提 + 后面接建议/担忧：오실 텐데（✓）。거든요 是新信息，잖아요 是共享信息，더니 表示顺承/对比。',
        },
        {
          prompt: '그 영화 재미있___ 우리 또 봐요！（那部电影很有趣嘛，我们再看吧！—双方都看过）',
          options: ['거든요', '더라', '잖아요', '았더니'],
          answer: 2 as 0|1|2|3,
          explanation: '-잖아요：唤起两人共同看过的共享经验：재미있잖아요（✓）。거든요 是新信息，더라 表示感叹，았더니 表示行动后的结果。',
        },
        {
          prompt: '사실 저 거기 살았___ 그래서 잘 알아요。（其实我在那里住过，所以很熟。）',
          options: ['거든요', '도록', '더니', '잖아요'],
          answer: 0 as 0|1|2|3,
          explanation: '-거든요：引入对方不知道的背景信息（사실…）：살았거든요（✓）。잖아요 是共享信息，더니/도록 是不同的用法。',
        },
      ],
    },
  },

];
