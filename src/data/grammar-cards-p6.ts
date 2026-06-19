import type { GrammarCard } from '@/types';

export const grammarCardsP6: GrammarCard[] = [
  {
    id: 'card-p6-l01',
    partNumber: 6,
    lessonNumber: 2,
    title: '-을/ㄹ게요, -겠군요, -았/었/였겠군요',
    whatItDoes: '说"我来做"，也表达共情感叹',
    whatItDoesBody: '-을/ㄹ게요 表示说话人的意志或承诺，主语一般是第一人称；\n-겠군요 听到对方说的话后对可能发生的状况或感觉表示推测，常用于口语。\n和中文"我来做"很像，但韩语 -을/ㄹ게요 带有"顾虑对方、主动承担"的语气，比直接说"我做"更礼貌。',
    structureNote: '这节课学两个表达：① -을/ㄹ게요（我来做/我会做，向对方承诺）；\n② -겠군요（原来如此，推测感叹对方的处境）。\n前者强调"我的意志"，后者强调"我对你的共情"。\n两个都是口语常用句尾。',
    rulesNote: '-을/ㄹ게요 的收音规则与 -을/ㄹ 거예요 相同：\n有收音→을게요，无收音或ㄹ收音→ㄹ게요。\n关键限制：\n主语必须是第一人称（저/나），不能说"你会做"或"他会做"。\n-겠군요 直接接词干，过去推测加 -았/었겠군요。',
    scenarioNote: '"我来拿""不用担心我来帮你""你一定很辛苦吧""当时一定很开心吧"这两个表达在朋友间、职场、服务场合都高频出现。\n-을/ㄹ게요 让你主动承担，-겠군요 让你表达共情，都是让对方感到被照顾的礼貌表达。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-을/ㄹ게요 · -겠군요</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"我来做"，或听完后表达共情感叹。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">걱정하지 마세요, 제가 도와줄게요.</span> — 不用担心，我来帮你。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">많이 피곤하겠군요.</span> — 你一定很累吧。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">그때 정말 힘드셨겠군요.</span> — 那时候你一定很辛苦吧。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个表达</div>
  <div style="margin-bottom:6px">① <b>-을/ㄹ게요</b> — 我来做/我会做（向对方承诺，主语必须是"我"）<br><span style="color:#89756e;font-size:.9rem">有收音→을게요，无收音/ㄹ收音→ㄹ게요</span></div>
  <div>② <b>-겠군요</b> — 原来如此啊/一定是……（听对方说完后推测感叹）<br><span style="color:#89756e;font-size:.9rem">过去推测：-았/었겠군요</span></div>
</div>
<div class="reminder-box">-을/ㄹ게요 主语限制：只能说"我来做"，不能说"你会做/他会做"。갈 거예요（计划）vs 갈게요（向你承诺）— 语气不同。</div>`,
    compareHtml: `<div class="card-title">-을/ㄹ게요（承诺）vs -겠군요（感叹推测）</div>
<div class="card-body">两者都有表态的意味，但方向不同：-을/ㄹ게요 是我主动承担（说话人→对方），-겠군요 是我对你的处境表示共情（感叹你的状态）。中文没有这种区分，但韩语用两套完全不同的语尾来区别。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ게요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">我来做/我会做（承诺，主语只能是我）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">제가 먼저 갈게요.</span><span style="font-size:14px;color:#5a4640">我先走。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">제가 연락할게요.</span><span style="font-size:14px;color:#5a4640">我来联系你。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-겠군요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">推测感叹：你一定……（共情对方）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">많이 바쁘겠군요.</span><span style="font-size:14px;color:#5a4640">你一定很忙吧。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">힘드셨겠군요.</span><span style="font-size:14px;color:#5a4640">那时一定很辛苦吧。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-을/ㄹ게요 收音规则 + 主语限制</div>
  <div style="font-size:15px;color:#241917">有收音 → <b>-을게요</b>：먹을게요 / 읽을게요</div>
  <div style="font-size:15px;color:#241917">无收音 / ㄹ收音 → <b>-ㄹ게요</b>：갈게요 / 할게요</div>
  <div style="font-size:15px;color:#e05555;margin-top:4px">⚠️ 主语只能是"我"：당신이 갈게요 ✗ — 不能对别人用</div>
</div>
<div class="reminder-box">갈게요（我来走/我先走，向对方承诺）vs 갈 거예요（我打算去，陈述计划）— 前者顾虑对方感受，后者只是陈述。-겠군요 可加过去时：힘드셨겠군요（那时一定很辛苦）。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 1 课 · 已完成</div>
    <div class="ov-hero-title">-을/ㄹ게요 · -겠군요</div>
    <div class="ov-hero-sub">我来做承诺 · 感叹共情 · 说话人表态</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-을/ㄹ게요</span>：说话人主动承诺"我来做"（我→对方）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-겠군요</span>：对对方状态的感叹/共情推测（我感受到你的处境）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">제가 할게요</span></div><div class="struct-zh">我来做。（承诺）</div></div>
        <div><div class="tok-row"><span class="tok t-v">힘드셨겠군요</span></div><div class="struct-zh">您一定很辛苦吧。（感叹共情）</div></div>
        <div><div class="tok-row"><span class="tok t-v">배고프겠군요</span></div><div class="struct-zh">你一定饿了吧。（推测感叹）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 올게요（推测天气）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비가 오겠군요（겠군요 用于感叹推测）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">제가 할겠군요（我来做）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">제가 할게요（承诺用 ㄹ게요）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-을/ㄹ게요（意志）vs -겠군요（推测感叹）',
    structures: [
      {
        ko: '동사 (받침 O) + -을게요',
        zh: '有收音词干 + -을게요',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을게요', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침 X/ㄹ) + -ㄹ게요',
        zh: '无收音/ㄹ收音词干 + -ㄹ게요',
        tokens: [
          { text: '동사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄹ게요', role: 'plain' },
        ],
      },
      {
        ko: '걱정하지 마세요, 제가 도와줄게요.',
        zh: '不用担心，我来帮你。',
        tokens: [
          { text: '걱정하지 마세요', role: 'verb' },
          { text: '제가', role: 'subject' },
          { text: '도와줄게요', role: 'verb' },
        ],
      },
      {
        ko: '많이 피곤하겠군요.',
        zh: '你一定很累吧。',
        tokens: [
          { text: '많이', role: 'plain' },
          { text: '피곤하겠군요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을게요：有收音词干接续', examples: '먹다→먹을게요 / 읽다→읽을게요 / 앉다→앉을게요' },
      { type: 'rule', text: '-ㄹ게요：无收音词干接续', examples: '가다→갈게요 / 오다→올게요 / 하다→할게요' },
      { type: 'note', text: 'ㄹ 收音词干直接接 -ㄹ게요（ㄹ 不脱落）', examples: '살다→살게요 / 만들다→만들게요' },
      { type: 'usage', text: '-을/ㄹ게요 主语限制：主语必须是第一人称（저/나），不能用于他人' },
      { type: 'rule', text: '-겠군요：动词/形容词词干 + 겠군요', examples: '바쁘다→바쁘겠군요 / 힘들다→힘들겠군요' },
      { type: 'rule', text: '-았/었겠군요：过去推测感叹。词干元音ㅏ/ㅗ→았겠군요；其他→었겠군요；하다→했겠군요' },
      { type: 'compare', text: '-을/ㄹ게요 vs -을/ㄹ 거예요：前者是向对方承诺/告知，带有顾虑对方感受的语气；后者纯粹陈述计划' },
      { type: 'example', text: '교재 예문：먼저 가세요, 제가 이따가 갈게요 / 더 이상 못 마시니까 이거만 마실게요' },
      { type: 'example', text: '-겠군요 교재 예문：많이 힘드셨겠군요 / 정말 맛있었겠군요（过去推测感叹）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '먼저', role: 'plain' },
          { text: '연락할게요', role: 'verb' },
        ],
        zh: '我先联系你。',
        swapWords: ['연락할게요', '확인할게요', '준비할게요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '걱정하지 마세요', role: 'verb' },
          { text: '제가', role: 'subject' },
          { text: '도와드릴게요', role: 'verb' },
        ],
        zh: '不用担心，我来帮你。',
        swapWords: ['도와드릴게요', '설명할게요', '대신 할게요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '많이', role: 'plain' },
          { text: '힘드셨겠군요', role: 'verb' },
        ],
        zh: '您一定很辛苦吧。',
        swapWords: ['힘드셨겠군요', '피곤하셨겠군요', '바쁘셨겠군요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 소식을', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '많이 놀랐겠군요', role: 'verb' },
        ],
        zh: '听到那个消息一定很吃惊吧。',
        swapWords: ['많이 놀랐겠군요', '많이 슬펐겠군요', '많이 기뻤겠군요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🤝', context: '主动承担', ko: '제가 먼저 시작할게요.', zh: '我先开始。' },
      { icon: '📞', context: '约定联系', ko: '도착하면 바로 연락할게요.', zh: '到了马上联系你。' },
      { icon: '😮', context: '感叹推测', ko: '정말 많이 놀랐겠군요.', zh: '你一定很吃惊吧。' },
      { icon: '😢', context: '过去推测', ko: '혼자서 정말 힘드셨겠군요.', zh: '一个人一定很辛苦吧。' },
      { icon: '🎤', context: 'KPOP 跟唱', ko: '이 노래 연습하기 어려웠겠군요.', zh: '这首歌练起来一定很难吧。' },
      { icon: '🍽️', context: '日常承诺', ko: '제가 오늘 저녁 준비할게요.', zh: '今天晚饭我来准备。' },
    ],
    mistakes: [
      { wrong: '손창 씨가 갈게요.', correct: '손창 씨가 갈 거예요.', note: '-을/ㄹ게요 只能用第一人称主语，他人用 -을/ㄹ 거예요' },
      { wrong: '날씨가 좋겠군요. (刚查了天气)', correct: '날씨가 좋겠군요. (听别人说完后感叹)', note: '-겠군요 是听到对方信息后的推测感叹，不是自己查到的事实陈述' },
      { wrong: '먹을게요. (主语是你)', correct: '드세요. / 먹어요.', note: '-을/ㄹ게요 主语只能是说话人自己' },
      { wrong: '어제 갔겠군요. (说话者自己亲历)', correct: '어제 힘드셨겠군요.', note: '-겠군요 用于推测他人情况，不用于叙述自己亲历的事' },
    ],
    linkedGrammarIds: ['gp-18', 'gp-19'],
  },
  {
    id: 'card-p6-l02',
    partNumber: 6,
    lessonNumber: 3,
    title: '-나요?, -은/ㄴ가요?, -ㅂ니다만/습니다만',
    whatItDoes: '比"吗？"更温柔的问法',
    whatItDoesBody: '-나요?/-은/ㄴ가요? 是 -아/어/여요?의 疑问形式，比直接疑问更自然柔和，常用于口语；\n-ㅂ니다만/습니다만 与 -지만 意思相同，"虽然……但是"，用于正式场合或需要讲究礼节的场合。\n中文提问"你吃了吗？"语气是中性的，韩语 -나요? 相当于加了一个轻柔的语气词，让问句听起来更体贴、不强硬。',
    structureNote: '这节课学"更礼貌的问法"和"正式场合的转折"。\n-나요? 适合动词，-은/ㄴ가요? 适合形容词，两者都比直接加？更温和。\n-ㅂ니다만/습니다만 是正式版的"但是"，常见于服务场合的礼貌拒绝或说明。',
    rulesNote: '-나요? 直接接词干，动词和形容词都可用，不看收音。\n-은/ㄴ가요? 只用于形容词：\n有收音→은가요?，无收音→ㄴ가요?。\n-ㅂ니다만：\n有收音词干→습니다만，无收音词干→ㅂ니다만。\n注意 이다→입니다만。',
    scenarioNote: '"请问你吃过韩国料理吗？""您方便现在接听电话吗？""非常抱歉，但现在没有空位"客服、问卷、初次见面的问候都频繁用到这节课的表达。\n学会 -나요? 和 -ㅂ니다만，你的韩语立刻显得有教养。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-나요? · -은/ㄴ가요? · -ㅂ니다만</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">比"吗？"更温柔的问法，以及正式场合的转折。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 공부했나요?</span> — 你学过韩语吗？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">지금 시간이 있으신가요?</span> — 您现在方便吗？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">죄송합니다만 잠깐만 기다려 주세요.</span> — 非常抱歉，请稍等一会儿。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个结构</div>
  <div style="margin-bottom:6px">① <b>-나요?</b> — 动词/形容词都可用，比直接问更柔和</div>
  <div style="margin-bottom:6px">② <b>-은/ㄴ가요?</b> — 专用于形容词（有收音→은가요?，无收音→ㄴ가요?）</div>
  <div>③ <b>-ㅂ니다만/습니다만</b> — 正式场合的"虽然……但是"（有收音→습니다만，无收音→ㅂ니다만）</div>
</div>
<div class="reminder-box">어렵나요? ✗（形容词现在时）→ 어려운가요? ✓。-나요? 比 -아요?/-어요? 语气更温和，有对话背景时更自然。</div>`,
    compareHtml: `<div class="card-title">-나요?（柔和疑问）vs -ㅂ니다만（正式转折）</div>
<div class="card-body">两个都是礼貌韩语的核心表达：-나요? 让提问听起来更温和不强硬；-ㅂ니다만 是正式场合表达"虽然……但是"的标准方式，比直接说 -지만 更有礼貌。两者都常见于职场和正式对话。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-나요?</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">柔和疑问，比 -아요? 更温和</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">경제학을 공부했나요?</span><span style="font-size:14px;color:#5a4640">你学过经济学吗？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지금 바쁘신가요?</span><span style="font-size:14px;color:#5a4640">您现在忙吗？</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-ㅂ니다만</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">正式转折：虽然……但是</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">도와드리고 싶습니다만 시간이 없어요.</span><span style="font-size:14px;color:#5a4640">虽然想帮，但没时间。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">죄송합니다만 다시 말씀해 주세요.</span><span style="font-size:14px;color:#5a4640">抱歉，请再说一遍。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-나요? 变形规则</div>
  <div style="font-size:15px;color:#241917">动词 → 词干 + <b>-나요?</b>：가나요? / 먹나요? / 공부하나요?</div>
  <div style="font-size:15px;color:#241917">形容词现在时 → <b>-은/ㄴ가요?</b>：좋은가요? / 바쁜가요?</div>
  <div style="font-size:15px;color:#241917">过去时 → -았/었 + <b>나요?</b>：갔나요? / 먹었나요?</div>
</div>
<div class="reminder-box">좋나요? ✗ → 좋은가요? ✓ — 形容词现在时用 -은/ㄴ가요?，不用 -나요?。-ㅂ니다만 比 -지만 更正式有礼貌，职场道歉/婉拒时首选。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 2 课 · 已完成</div>
    <div class="ov-hero-title">-나요? · -은/ㄴ가요? · -ㅂ니다만</div>
    <div class="ov-hero-sub">柔和问句 · 形容词疑问 · 转折表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">동사+-나요?</span>：比吗？更柔和的问句（어떻게 하나요?）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">형용사+-은/ㄴ가요?</span>：形容词疑问（좋은가요? / 큰가요?）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">-ㅂ니다만</span>：正式转折（……，但是……）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">어디서 파나요?</span></div><div class="struct-zh">在哪里卖呢？（柔和问）</div></div>
        <div><div class="tok-row"><span class="tok t-v">맛있는가요?</span></div><div class="struct-zh">好吃吗？（形容词疑问）</div></div>
        <div><div class="tok-row"><span class="tok t-v">알겠습니다만 어렵습니다</span></div><div class="struct-zh">我明白，但是很难。（正式转折）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋나요?（形容词）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋은가요?（形容词用 -은/ㄴ가요）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹은가요?（동사）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹나요?（动词用 -나요）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-나요?（柔和疑问）vs -ㅂ니다만（正式转折）',
    structures: [
      {
        ko: '동사/형용사 어간 + -나요?',
        zh: '动词/形容词词干 + -나요?',
        tokens: [
          { text: '동사/형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-나요?', role: 'plain' },
        ],
      },
      {
        ko: '형용사 (받침O) + -은가요? / (받침X) + -ㄴ가요?',
        zh: '形容词有收音 + -은가요? / 无收音 + -ㄴ가요?',
        tokens: [
          { text: '형용사(받침O)', role: 'verb' },
          { text: '-은가요?', role: 'plain' },
          { text: '/', role: 'plain' },
          { text: '형용사(받침X)', role: 'verb' },
          { text: '-ㄴ가요?', role: 'plain' },
        ],
      },
      {
        ko: '한국어를 배운 적이 있나요?',
        zh: '你有学过韩语吗？',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배운 적이', role: 'verb' },
          { text: '있나요', role: 'verb' },
        ],
      },
      {
        ko: '죄송합니다만 잠깐만 기다려 주세요.',
        zh: '非常抱歉，请稍等一会儿。',
        tokens: [
          { text: '죄송합니다만', role: 'verb' },
          { text: '잠깐만', role: 'plain' },
          { text: '기다려 주세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-나요? 现在时：动词词干直接 + 나요?（形容词用 -은/ㄴ가요?）', examples: '가다→가나요? / 먹다→먹나요? / 공부하다→공부하나요?' },
      { type: 'rule', text: '-나요? 过去时：词干元音ㅏ/ㅗ→았나요?；其他→었나요?；하다→했나요?' },
      { type: 'rule', text: '-은가요?/-ㄴ가요? 形容词现在时：有收音→은가요?；无收音→ㄴ가요?', examples: '작다→작은가요? / 예쁘다→예쁜가요?' },
      { type: 'rule', text: '名词 + -인가요?：名词直接接续', examples: '이름이 뭔가요? / 학생인가요?' },
      { type: 'compare', text: '-나요? vs -아/어요?：意思相同，-나요? 更柔和自然，有对话背景时更常用' },
      { type: 'rule', text: '-ㅂ니다만/습니다만：有收音词干 + 습니다만；无收音词干 + ㅂ니다만' },
      { type: 'usage', text: '-ㅂ니다만/습니다만 是正式场合的 -지만，用于需要礼貌或正式的场合' },
      { type: 'example', text: '교재 예문：다들 식사했나요? / 언제인가요? / 만난 적이 있습니다만 상대방의 나이도 몰라요' },
      { type: 'example', text: '교재 예문：설명서를 봤습니다만 아직 어떻게 쓰는지 몰라요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래', role: 'subject' },
          { text: '들어본 적', role: 'verb' },
          { text: '있나요', role: 'verb' },
        ],
        zh: '你听过这首歌吗？',
        swapWords: ['있나요', '없나요', '알고 있나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어', role: 'subject' },
          { text: '공부하기', role: 'verb' },
          { text: '어렵나요', role: 'verb' },
        ],
        zh: '学韩语难吗？',
        swapWords: ['어렵나요', '재미있나요', '힘드나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '죄송합니다만', role: 'verb' },
          { text: '다시 한번', role: 'plain' },
          { text: '말씀해 주세요', role: 'verb' },
        ],
        zh: '非常抱歉，请再说一遍。',
        swapWords: ['말씀해 주세요', '확인해 주세요', '기다려 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도와드리고 싶습니다만', role: 'verb' },
          { text: '오늘은', role: 'time' },
          { text: '시간이 없어요', role: 'verb' },
        ],
        zh: '虽然想帮你，但今天没有时间。',
        swapWords: ['시간이 없어요', '자리가 없어요', '여유가 없어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '💬', context: '柔和询问', ko: '콘서트 티켓 예매했나요?', zh: '你预订演唱会门票了吗？' },
      { icon: '🎵', context: 'KPOP', ko: '이 가수 좋아하나요?', zh: '你喜欢这个歌手吗？' },
      { icon: '📚', context: '学习询问', ko: '이 문법 이해됐나요?', zh: '这个语法理解了吗？' },
      { icon: '🤝', context: '正式道歉', ko: '죄송합니다만 잠깐 자리를 비웠어요.', zh: '非常抱歉，我短暂离开了一下。' },
      { icon: '📋', context: '正式说明', ko: '내용을 봤습니다만 이해가 안 됐어요.', zh: '虽然看了内容，但没有理解。' },
      { icon: '🔍', context: '确认信息', ko: '몇 시에 시작하는지 알고 있나요?', zh: '你知道几点开始吗？' },
    ],
    mistakes: [
      { wrong: '작나요? (형용사 과거)', correct: '작았나요?', note: '形容词过去时用 -았/었나요?，现在时直接接词干' },
      { wrong: '가ㅂ니다만', correct: '갑니다만', note: '无收音词干接 -ㅂ니다만，가+ㅂ니다만=갑니다만' },
      { wrong: '학생ㄴ가요?', correct: '학생인가요?', note: '名词用 -인가요?，不能直接接 -ㄴ가요?' },
      { wrong: '어렵나요? (형용사 현재)', correct: '어려운가요?', note: '形容词现在时用 -은/ㄴ가요?，-나요? 是动词专用' },
    ],
    linkedGrammarIds: ['gp-20'],
  },
  {
    id: 'card-p6-l03',
    partNumber: 6,
    lessonNumber: 1,
    title: '아직, 은요/는요',
    whatItDoes: '说"还没……"，追问"那你呢"',
    whatItDoesBody: '아직 是副词，修饰后面的句子或动词，表示"仍然（没）……，还（没）……"，常与否定表达搭配；\n은요/는요 仅用于口语，询问对方，通常与名词搭配，强调追问此名词。\n中文"还没"和 아직 안/못 几乎一一对应，但 아직도 带有"都这时候了还……"的惊讶语气，比 아직 程度更强。',
    structureNote: '这节课学两个口语必备小词：\n아직（还/仍然）常配否定句，아직 안 했어요 = 还没做；\n은요/는요 接在名词后面反问"那……呢？"，是追问对方的最简洁方式。\n两个都是日常对话里用频极高的表达。',
    rulesNote: '아직 放在否定词前：\n아직 안/못/지 않다。\n아직도 语气更强，带惊讶或不耐烦。\n아직 也可配肯定句表示"仍然在做中"：\n아직 공부해요（还在学呢）。\n은요/는요 的收音规则：\n名词有收音→은요，无收音→는요。',
    scenarioNote: '"你作业交了吗？""还没。\n""那小明呢？"아직 和 은요/는요 是聊进度、问对方情况时最自然的表达。\n追剧时、朋友间问进度、课堂互动里随处可见。\n学会这两个词，对话立刻更流畅自然。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">아직 · 은요/는요</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"还没……"，或追问"那你呢"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">아직 안 끝났어요.</span> — 还没结束。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">아직 여기 있어요.</span> — 还在这里呢。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">저는 못 가요. 손창 씨는요?</span> — 我不能去。那孙畅呢？</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个口语必备小词</div>
  <div style="margin-bottom:6px">① <b>아직</b> — 还/仍然，常配否定句（아직 안/못）= 还没<br><span style="color:#89756e;font-size:.9rem">아직도 语气更强，带"都这时候了还……"的惊讶</span></div>
  <div>② <b>은요/는요</b> — 那……呢？（接名词反问）<br><span style="color:#89756e;font-size:.9rem">有收音→은요，无收音→는요</span></div>
</div>
<div class="reminder-box">아직 也可用于肯定句：아직 공부해요（还在学呢）。은요/는요 只接名词，不能直接接动词词干。</div>`,
    compareHtml: `<div class="card-title">아직（状态副词）vs 은요/는요（追问助词）</div>
<div class="card-body">아직 是副词，修饰整个句子，表示"还没/仍然"；은요/는요 接在名词后追问对方情况，是对话里最简洁的反问方式。两者常常连着用：先用 아직 回答，再用 은요/는요 反问。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아직 + 否定</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">还没……（未完成状态）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아직 도착 안 했어요.</span><span style="font-size:14px;color:#5a4640">还没到。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아직 못 먹었어요.</span><span style="font-size:14px;color:#5a4640">还没吃。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">은요/는요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">那……呢？（追问，只接名词）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 갔어요. 친구는요?</span><span style="font-size:14px;color:#5a4640">我去了。那朋友呢？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오늘은요?</span><span style="font-size:14px;color:#5a4640">那今天呢？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">은요/는요 收音规则</div>
  <div style="font-size:15px;color:#241917">有收音名词 → <b>은요</b>：손창 씨는요? / 형은요?</div>
  <div style="font-size:15px;color:#241917">无收音名词 → <b>는요</b>：오늘은요? / 내일은요? / 저는요?</div>
  <div style="font-size:15px;color:#e05555;margin-top:4px">⚠️ 只能接名词：가는요? ✗ — 动词后不能直接加 은요/는요</div>
</div>
<div class="reminder-box">아직도 안 왔어요（都这时候了还没来，语气更强）vs 아직 안 왔어요（还没来）— 아직도 比 아직 更强调。아직 肯定用法：아직 여기 있어요（还在这里）/ 아직 기다리고 있어요（还在等）。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 3 课 · 已完成</div>
    <div class="ov-hero-title">아직 · 은요/는요</div>
    <div class="ov-hero-sub">还没/还在 · 追问对方 · 对话衔接</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">아직 + 否定</span>：还没……（아직 안 했어요）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">아직 + 肯定</span>：还在……（아직 있어요）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">은요/는요</span>：追问"那……呢？"</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">아직 안 먹었어요</span></div><div class="struct-zh">还没吃。</div></div>
        <div><div class="tok-row"><span class="tok t-v">아직 여기 있어요</span></div><div class="struct-zh">还在这里。</div></div>
        <div><div class="tok-row"><span class="tok t-v">저는요?</span></div><div class="struct-zh">那我呢？（追问）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아직 했어요（还没做）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아직 안 했어요（아직 + 否定 = 还没）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">밥은요 먹었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">밥은요?（은요/는요 独立追问，不加后续）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '아직（状态副词）vs 은요/는요（追问助词）',
    structures: [
      {
        ko: '아직 + 부정문 (안/못/지 않다)',
        zh: '아직 + 否定表达',
        tokens: [
          { text: '아직', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '안/못/지 않다', role: 'verb' },
        ],
      },
      {
        ko: '명사 (받침O) + 은요? / (받침X) + 는요?',
        zh: '名词有收音 + 은요? / 无收音 + 는요?',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '은요?', role: 'plain' },
        ],
      },
      {
        ko: '아직 일어나지 않았어요.',
        zh: '还没起床。',
        tokens: [
          { text: '아직', role: 'plain' },
          { text: '일어나지', role: 'verb' },
          { text: '않았어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 시간이 없어요. 내일은요?',
        zh: '我今天没时间。那明天呢？',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '시간이 없어요', role: 'verb' },
          { text: '내일은요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '아직 + 否定：아직 안 + 动词 / 아직 못 + 动词 / 아직 -지 않아요/못해요', examples: '아직 안 왔어요 / 아직 못 먹었어요' },
      { type: 'usage', text: '아직 肯定用法：也可用于肯定句，表示"仍然"', examples: '아직 여기 있어요（还在这里）/ 아직 기다리고 있어요（还在等）' },
      { type: 'rule', text: '은요：有收音名词 + 은요（追问）', examples: '손창 씨→손창 씨는요? / 형→형은요?' },
      { type: 'rule', text: '는요：无收音名词 + 는요（追问）', examples: '오늘→오늘은요? / 내일→내일은요?' },
      { type: 'note', text: '은요/는요 只能接名词，直接接动词/形容词词干则为错误表达' },
      { type: 'compare', text: '아직 vs 아직도：아직도 比 아직 语气更强调，两者叠用是重复表达' },
      { type: 'example', text: '교재 예문：가: 저는 못 가요. 나: 손창 씨는요? / 가: 오늘 시간이 없어요. 나: 내일은요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '숙제를', role: 'object' },
          { text: '아직', role: 'plain' },
          { text: '안 했어요', role: 'verb' },
        ],
        zh: '作业还没做。',
        swapWords: ['안 했어요', '못 했어요', '다 못 했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가사를', role: 'object' },
          { text: '아직', role: 'plain' },
          { text: '외우지 못했어요', role: 'verb' },
        ],
        zh: '歌词还没背下来。',
        swapWords: ['외우지 못했어요', '다 외우지 못했어요', '이해하지 못했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '연습했어요', role: 'verb' },
          { text: '친구는요', role: 'plain' },
        ],
        zh: '我练习了。那朋友呢？',
        swapWords: ['친구는요', '언니는요', '오빠는요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '시간이 없어요', role: 'verb' },
          { text: '내일은요', role: 'plain' },
        ],
        zh: '今天没时间。那明天呢？',
        swapWords: ['내일은요', '모레는요', '주말은요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习进度', ko: '이 챕터 아직 못 읽었어요.', zh: '这章还没读完。' },
      { icon: '🎵', context: 'KPOP', ko: '이 노래 아직 안 들었어요.', zh: '这首歌还没听。' },
      { icon: '⏰', context: '等待中', ko: '친구가 아직 안 왔어요.', zh: '朋友还没来。' },
      { icon: '💬', context: '追问', ko: '저는 봤어요. 오빠는요?', zh: '我看了。那哥哥呢？' },
      { icon: '📅', context: '时间追问', ko: '오늘은 바빠요. 내일은요?', zh: '今天忙。明天呢？' },
      { icon: '🎤', context: '练习状态', ko: '발음을 아직 완전히 못 외웠어요.', zh: '发音还没完全记住。' },
    ],
    mistakes: [
      { wrong: '아직 갔어요.', correct: '아직 안 갔어요. / 아직 가지 않았어요.', note: '아직 通常与否定搭配，表示"还没"' },
      { wrong: '좋아해은요?', correct: '좋아하는 사람은요?', note: '은요/는요 只接名词，动词词干不能直接接 은요' },
      { wrong: '아직도 아직 몰라요.', correct: '아직 몰라요.', note: '아직도 和 아직 意思相近，不需要叠用' },
      { wrong: '지금도은요?', correct: '지금도요?', note: '은요/는요 接在名词后，助词 도 后直接用 요 即可' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p6-l04',
    partNumber: 6,
    lessonNumber: 4,
    title: '-을/ㄹ 건가요?, -고 나서',
    whatItDoes: '问别人打算，说做完再做',
    whatItDoesBody: '-을/ㄹ 건가요? 仅用于疑问句的口语表达，表示对将来打算的询问；\n-고 나서 表示前一动作完全结束后，再做后一动作，强调顺序和完成。\n-고 나서 和 -고 的区别：\n-고 只表示顺序连接，-고 나서 强调"前面那件事真的做完了"。\n中文"做完再做"靠"再""然后"等独立词表达，韩语用 -고 나서 把"完成"的语气直接嵌入连接词尾。',
    structureNote: '这节课学"问别人计划"和"先做完再做"：\n-을/ㄹ 건가요? 是询问对方将来意图的口语问句；\n-고 나서 强调动作的先后顺序和完成感，相当于"做完……之后"。',
    rulesNote: '-을/ㄹ 건가요? 的收音规则与 -을/ㄹ 거예요 相同：\n有收音→을 건가요?，无收音/ㄹ→ㄹ 건가요?。\n只用于疑问句，不用于陈述。\n-고 나서 直接接动词词干+고，나서 固定不变。\n나서 来自 나다（结束/出来），强调"完成"含义。',
    scenarioNote: '"你今天下班后打算做什么？""等我吃完饭再出发。\n""作业做完再玩。\n"询问计划和描述做事顺序是日常对话的基础。\n学会 -을/ㄹ 건가요? 和 -고 나서，你能流畅安排事情、讨论计划。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-을/ㄹ 건가요? · -고 나서</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">问别人打算做什么，或说做完才做下一件事。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 저녁에 뭘 먹을 건가요?</span> — 今天晚上打算吃什么？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">퇴근 후에 바로 갈 건가요?</span> — 下班后直接去吗？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">숙제를 다 하고 나서 쉬어요.</span> — 作业全做完之后再休息。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个结构</div>
  <div style="margin-bottom:6px">① <b>-을/ㄹ 건가요?</b> — 询问对方将来打算（只用于疑问句）<br><span style="color:#89756e;font-size:.9rem">有收音→을 건가요?，无收音/ㄹ→ㄹ 건가요?</span></div>
  <div>② <b>-고 나서</b> — 做完A之后才做B（强调完成顺序）<br><span style="color:#89756e;font-size:.9rem">直接接词干+고，나서 固定不变</span></div>
</div>
<div class="reminder-box">-을/ㄹ 건가요? 只用于疑问句，陈述计划用 -을/ㄹ 거예요。-고 나서 vs -고：나서 强调"前面那件事真的做完了"，-고 只表示顺序。</div>`,
    compareHtml: `<div class="card-title">-을/ㄹ 건가요?（询问计划）vs -고 나서（完成后）</div>
<div class="card-body">两者都和将来的行动有关，但用途不同：-을/ㄹ 건가요? 是向对方提问计划的疑问句；-고 나서 是连接两个动作，强调前一个动作必须先彻底完成才做下一个。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 건가요?</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">询问对方将来打算（只用于疑问）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">퇴근 후에 바로 갈 건가요?</span><span style="font-size:14px;color:#5a4640">下班后直接去吗？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">콘서트가 끝난 후에 뭘 할 건가요?</span><span style="font-size:14px;color:#5a4640">演唱会结束后打算做什么？</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 나서</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">做完A之后才做B（强调完成）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥을 먹고 나서 산책해요.</span><span style="font-size:14px;color:#5a4640">吃完饭之后散步。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">숙제를 끝내고 나서 놀아요.</span><span style="font-size:14px;color:#5a4640">作业做完之后再玩。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-고 vs -고 나서 区别</div>
  <div style="font-size:15px;color:#241917">밥을 먹고 산책해요 — 吃饭，然后散步（中性顺序）</div>
  <div style="font-size:15px;color:#241917">밥을 먹고 나서 산책해요 — 吃完饭之后再散步（强调先完成）</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">나서 加强"前句完全结束"的语气，比单独 -고 更强调顺序</div>
</div>
<div class="reminder-box">-을/ㄹ 건가요? 只用于疑问句，陈述自己的计划用 -을/ㄹ 거예요：공부할 건가요 ✗（自己）→ 공부할 거예요 ✓。-고 나서 接词干，不接过去时：갔고 나서 ✗ → 가고 나서 ✓。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 4 课 · 已完成</div>
    <div class="ov-hero-title">-을/ㄹ 건가요? · -고 나서</div>
    <div class="ov-hero-sub">询问计划 · 完成后再做 · 强调先后</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-을/ㄹ 건가요?</span>：礼貌询问对方打算（你打算……吗？）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-고 나서</span>：强调前一动作完成后，再做后一动作</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">어디 갈 건가요?</span></div><div class="struct-zh">你打算去哪里？</div></div>
        <div><div class="tok-row"><span class="tok t-v">밥 먹고 나서 갈게요</span></div><div class="struct-zh">吃完饭再走。</div></div>
        <div><div class="tok-row"><span class="tok t-v">숙제하고 나서 놀아요</span></div><div class="struct-zh">做完作业再玩。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹고 갈게요（强调完成）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹고 나서 갈게요（나서 强调完成先后）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹을 건가요 저는</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 먹을 건가요?（주어 前置）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-을/ㄹ 건가요?（询问计划）vs -고 나서（完成后）',
    structures: [
      {
        ko: '동사 (받침O) + -을 건가요?',
        zh: '有收音词干 + -을 건가요?',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을 건가요?', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침X/ㄹ) + -ㄹ 건가요?',
        zh: '无收音/ㄹ收音词干 + -ㄹ 건가요?',
        tokens: [
          { text: '동사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄹ 건가요?', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 + -고 나서',
        zh: '动词词干 + -고 나서',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-고 나서', role: 'plain' },
        ],
      },
      {
        ko: '연습을 다 하고 나서 녹음해요.',
        zh: '把练习全做完之后再录音。',
        tokens: [
          { text: '연습을', role: 'object' },
          { text: '다 하고 나서', role: 'verb' },
          { text: '녹음해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을 건가요?：有收音词干 + -을 건가요?', examples: '먹다→먹을 건가요? / 읽다→읽을 건가요?' },
      { type: 'rule', text: '-ㄹ 건가요?：无收音词干 + -ㄹ 건가요?', examples: '가다→갈 건가요? / 보다→볼 건가요? / 하다→할 건가요?' },
      { type: 'note', text: '-을/ㄹ 건가요? 只用于疑问句，陈述计划用 -을/ㄹ 거예요' },
      { type: 'compare', text: '-을/ㄹ 건가요? vs -나요?：-을/ㄹ 건가요? 专问将来计划；-나요? 是一般疑问（长辈→晚辈常用）' },
      { type: 'rule', text: '-고 나서：动词词干直接接续（不看收音）', examples: '먹다→먹고 나서 / 끝내다→끝내고 나서' },
      { type: 'usage', text: '-고 나서：前一动作完全结束后才执行下一动作，比 -고 更强调完成感' },
      { type: 'compare', text: '-고 나서 vs -고：-고 表示并列/顺序；-고 나서 特别强调前一动作完成后才做下一动作' },
      { type: 'example', text: '교재 예문：손창 씨도 내일 모임에 갈 건가요? / 수업이 끝난 후에 바로 도서관에 갈 건가요?' },
      { type: 'example', text: '교재 예문：퇴근한 후에 술을 마시러 갈 건가요? / 밥을 먹고 나서 커피를 마셔요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '콘서트가', role: 'subject' },
          { text: '끝나고 나서', role: 'verb' },
          { text: '팬미팅에 갈 건가요', role: 'verb' },
        ],
        zh: '演唱会结束后打算去见面会吗？',
        swapWords: ['팬미팅에 갈 건가요', '바로 집에 갈 건가요', '같이 식사할 건가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가사를', role: 'object' },
          { text: '다 외우고 나서', role: 'verb' },
          { text: '노래를 불러요', role: 'verb' },
        ],
        zh: '把歌词全背完之后再唱歌。',
        swapWords: ['노래를 불러요', '녹음해요', '따라 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업이', role: 'subject' },
          { text: '끝나고 나서', role: 'verb' },
          { text: '뭘 할 건가요', role: 'verb' },
        ],
        zh: '课结束之后打算做什么？',
        swapWords: ['뭘 할 건가요', '어디 갈 건가요', '누구 만날 건가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '샤워하고 나서', role: 'verb' },
          { text: '바로', role: 'plain' },
          { text: '잠을 잤어요', role: 'verb' },
        ],
        zh: '洗完澡之后马上睡觉了。',
        swapWords: ['잠을 잤어요', '공부했어요', '음악을 들었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎤', context: '演唱会后', ko: '공연이 끝나고 나서 어디 갈 건가요?', zh: '演出结束后打算去哪里？' },
      { icon: '📚', context: '学习顺序', ko: '단어를 외우고 나서 문장을 만들어요.', zh: '背完单词之后造句。' },
      { icon: '🍜', context: '饭后计划', ko: '밥을 먹고 나서 산책할 건가요?', zh: '吃完饭打算散步吗？' },
      { icon: '🎵', context: 'KPOP', ko: '원곡을 듣고 나서 따라 해 봐요.', zh: '听完原唱之后跟着唱。' },
      { icon: '💼', context: '下班计划', ko: '퇴근하고 나서 뭐 할 건가요?', zh: '下班之后打算做什么？' },
      { icon: '✅', context: '完成后', ko: '이 챕터를 다 읽고 나서 복습할게요.', zh: '这章全读完之后复习。' },
    ],
    mistakes: [
      { wrong: '먹을 건가요. (陈述句)', correct: '먹을 거예요.', note: '-을/ㄹ 건가요? 只用于疑问句，陈述计划用 -을/ㄹ 거예요' },
      { wrong: '갔고 나서 전화했어요.', correct: '가고 나서 전화했어요.', note: '-고 나서 接词干，不接过去时 -았/었' },
      { wrong: '밥을 먹고 나서고 커피를 마셔요.', correct: '밥을 먹고 나서 커피를 마셔요.', note: '-고 나서 后直接接下一动作，不再加 고' },
      { wrong: '공부할 건가요. (自己的计划)', correct: '공부할 거예요.', note: '-을/ㄹ 건가요? 用于询问他人计划，自己的计划用 -을/ㄹ 거예요' },
    ],
    linkedGrammarIds: ['gp-21'],
  },
  {
    id: 'card-p6-l05',
    partNumber: 6,
    lessonNumber: 8,
    title: '-(으)면 큰일이다, -아/어/여 버리다',
    whatItDoes: '说"要是……就麻烦了"，或彻底做完',
    whatItDoesBody: '-(으)면 큰일이다 常用于口语，表示"要是……的话，就麻烦了"；\n-아/어/여 버리다 用于口语，表示行为或动作完全结束，含有"一下子全做完"或"完全丢失/消耗"的语气。\n中文"完了/糟了"对应 큰일이다，但韩语更强调"假设"用 -(으)면 引出那个让人担心的情境。',
    structureNote: '这节课学两种表达强烈情绪的句型：\n-(으)면 큰일이다 表示"一旦发生就麻烦/完蛋了"（担心/警告语气）；\n-아/어/여 버리다 接在动词后面，表示动作彻底完成，有时带轻松，有时带遗憾，取决于语境。',
    rulesNote: '-(으)면 큰일이다 的收音规则同 -(으)면：\n有收音→으면 큰일이다，无收音→면 큰일이다。\n-아/어/여 버리다 的连接规则同 해요体：\n阳性元音(ㅏ/ㅗ)→아 버리다，其余→어 버리다，하다→해 버리다。\n버리다 本身可以变时态：\n버렸어요（彻底完了）。',
    scenarioNote: '"要是错过末班车就麻烦了！""把零食全吃完了""手机电量用完了"这两个表达在表达担忧、懊悔或轻松完成时都很自然。\n聊日常生活、追剧吐槽时经常用到 버리다，让你的韩语更有感情色彩。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-(으)면 큰일이다 · -아/어/여 버리다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"要是这样就麻烦了"，或彻底做完了某件事。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">지각하면 큰일이에요.</span> — 要是迟到就麻烦了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">비행기를 놓쳐 버렸어요.</span> — 把飞机错过了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">과자를 다 먹어 버렸어요.</span> — 把零食全吃完了。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个结构</div>
  <div style="margin-bottom:6px">① <b>-(으)면 큰일이다</b> — 要是……就麻烦了（担心/警告）<br><span style="color:#89756e;font-size:.9rem">有收音→으면 큰일이다，无收音→면 큰일이다</span></div>
  <div>② <b>-아/어/여 버리다</b> — 彻底完成/消耗殆尽<br><span style="color:#89756e;font-size:.9rem">变形同 해요体：阳性元音→아 버리다，其他→어 버리다，하다→해 버리다</span></div>
</div>
<div class="reminder-box">-(으)면 큰일이다 vs -(으)면 안 되다：前者有"大灾难"的强烈感，后者是单纯禁止。-아/어 버리다 可以带遗憾（잊어 버렸어요）也可以带轻松（다 해 버렸어요）。</div>`,
    compareHtml: `<div class="card-title">-(으)면 큰일이다（糟糕假设）vs -아/어/여 버리다（彻底完成）</div>
<div class="card-body">两个表达都带强烈情感：큰일이다 是"预想糟糕结果"的担心/警告；버리다 是动作彻底完成，语气取决于语境——可以是轻松（终于做完了）也可以是遗憾（完蛋了）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면 큰일이다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">假设糟糕后果，担心/警告</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시험을 못 보면 큰일이에요.</span><span style="font-size:14px;color:#5a4640">要是考不好就麻烦了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지각하면 큰일이에요.</span><span style="font-size:14px;color:#5a4640">要是迟到就麻烦了。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어/여 버리다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">彻底完成（语气由语境定）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">숙제를 다 해 버렸어요.</span><span style="font-size:14px;color:#5a4640">作业全做完了。（轻松）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비행기를 놓쳐 버렸어요.</span><span style="font-size:14px;color:#5a4640">把飞机错过了。（遗憾）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-아/어/여 버리다 变形规则</div>
  <div style="font-size:15px;color:#241917">阳性元音（아/오）→ <b>아 버리다</b>：보다→봐 버려요 / 팔다→팔아 버려요</div>
  <div style="font-size:15px;color:#241917">其他元音 → <b>어 버리다</b>：먹다→먹어 버려요 / 잊다→잊어 버려요</div>
  <div style="font-size:15px;color:#241917">하다 → <b>해 버리다</b>：말하다→말해 버려요</div>
</div>
<div class="reminder-box">-(으)면 큰일이다 vs -(으)면 안 되다：큰일이다 有"大灾难"的强烈感，안 되다 是单纯禁止。놓쳐 버렸어요（遗憾）vs 다 해 버렸어요（轻松）— 버리다 的情感色彩由上下文决定。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 5 课 · 已完成</div>
    <div class="ov-hero-title">큰일이다 · 버리다</div>
    <div class="ov-hero-sub">担心糟糕 · 彻底完成 · 情感语气</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-(으)면 큰일이다</span>：假设糟糕情境——"要是……就麻烦了"</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-아/어/여 버리다</span>：动作彻底完成，含轻松或遗憾语气</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">늦으면 큰일이에요</span></div><div class="struct-zh">要是迟到就麻烦了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">다 먹어 버렸어요</span></div><div class="struct-zh">全吃完了。（轻松/遗憾）</div></div>
        <div><div class="tok-row"><span class="tok t-v">잊어 버렸어요</span></div><div class="struct-zh">忘了个精光。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늦었으면 큰일이에요（已发生）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦으면 큰일이에요（假设未来用 면）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">하다 버리다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">해 버리다（하다 → 해）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-(으)면 큰일이다（糟糕假设）vs -아/어 버리다（彻底完成）',
    structures: [
      {
        ko: '동사/형용사 (받침O) + -으면 큰일이다',
        zh: '有收音词干 + -으면 큰일이다',
        tokens: [
          { text: '동사/형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으면 큰일이다', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 (받침X) + -면 큰일이다',
        zh: '无收音词干 + -면 큰일이다',
        tokens: [
          { text: '동사/형용사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-면 큰일이다', role: 'plain' },
        ],
      },
      {
        ko: '한국어능력시험을 못 보면 큰일이에요.',
        zh: '要是不能考韩语能力考试就麻烦了。',
        tokens: [
          { text: '한국어능력시험을', role: 'object' },
          { text: '못 보면', role: 'verb' },
          { text: '큰일이에요', role: 'verb' },
        ],
      },
      {
        ko: '가사를 다 잊어 버렸어요.',
        zh: '歌词全忘掉了。',
        tokens: [
          { text: '가사를', role: 'object' },
          { text: '다', role: 'plain' },
          { text: '잊어 버렸어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)면 큰일이다 有收音词干：有收音 → -으면 큰일이에요', examples: '늦다→늦으면 큰일이에요 / 못 보다→못 보면 큰일이에요' },
      { type: 'rule', text: '-(으)면 큰일이다 无收音词干：无收音 → -면 큰일이에요', examples: '가다→가면 큰일이에요 / 끝나다→끝나면 큰일이에요' },
      { type: 'rule', text: '-아/어/여 버리다 变形：词干元音ㅏ/ㅗ→아 버리다；其他→어 버리다；하다→해 버리다' },
      { type: 'usage', text: '-아/어/여 버리다 语感：遗憾/惋惜（잊어 버렸어요）或轻松完成（다 먹어 버렸어요）两种语气都有' },
      { type: 'note', text: '-아/어/여 버리다 是补助动词，前面只接 -아/어/여，不能用 -아서/어서' },
      { type: 'compare', text: '-(으)면 큰일이다 vs -(으)면 안 되다：前者有"大灾难"的强烈感；后者是单纯禁止' },
      { type: 'example', text: '교재 예문：그렇게 되면 큰일이에요 / 한국어 시험을 못 보면 큰일이에요 / 그 일을 끝내지 않으면 큰일이에요' },
      { type: 'example', text: '교재 예문：나는 비행기를 놓쳐 버렸어요 / 요즘 소화가 잘 안 되니까 밥을 다 토해 버렸어요' },
      { type: 'example', text: '소이 선생님 예문：소이 선생님을 못 만나면 큰일이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '콘서트 티켓을', role: 'object' },
          { text: '잃어버리면', role: 'verb' },
          { text: '큰일이에요', role: 'verb' },
        ],
        zh: '要是把演唱会票丢了就麻烦了。',
        swapWords: ['큰일이에요', '정말 큰일이에요', '큰일 나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오늘 연습을', role: 'object' },
          { text: '못 하면', role: 'verb' },
          { text: '큰일이에요', role: 'verb' },
        ],
        zh: '今天要是没能练习就麻烦了。',
        swapWords: ['못 하면', '안 하면', '빠뜨리면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '외운 가사를', role: 'object' },
          { text: '다', role: 'plain' },
          { text: '잊어 버렸어요', role: 'verb' },
        ],
        zh: '背好的歌词全忘掉了。',
        swapWords: ['잊어 버렸어요', '틀려 버렸어요', '섞어 버렸어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '숙제를', role: 'object' },
          { text: '밤새', role: 'time' },
          { text: '다 해 버렸어요', role: 'verb' },
        ],
        zh: '熬了一夜把作业全做完了。',
        swapWords: ['다 해 버렸어요', '다 읽어 버렸어요', '다 써 버렸어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😱', context: '考试担心', ko: 'TOPIK을 못 보면 큰일이에요.', zh: '要是不能参加TOPIK就麻烦了。' },
      { icon: '✈️', context: '错过航班', ko: '비행기를 놓쳐 버리면 큰일이에요.', zh: '要是错过飞机就麻烦了。' },
      { icon: '🎤', context: 'KPOP', ko: '공연 날 목소리가 나오지 않으면 큰일이에요.', zh: '演出那天要是没声音就麻烦了。' },
      { icon: '📱', context: '手机没电', ko: '배터리가 다 나가 버렸어요.', zh: '电池全没了。' },
      { icon: '📝', context: '完成任务', ko: '리포트를 밤새 써 버렸어요.', zh: '熬夜把报告写完了。' },
      { icon: '🍱', context: '吃完了', ko: '도시락을 벌써 다 먹어 버렸어요.', zh: '便当已经全吃完了。' },
    ],
    mistakes: [
      { wrong: '가면 큰일이에요. (没明确主体)', correct: '거기에 가면 큰일이에요.', note: '큰일이다 前的条件句要明确说明什么情况，语义才清楚' },
      { wrong: '먹아 버렸어요.', correct: '먹어 버렸어요.', note: '먹다 词干末元音是ㅓ，用 -어 버리다，不是 -아 버리다' },
      { wrong: '공부해서 버렸어요.', correct: '공부해 버렸어요.', note: '-아/어/여 버리다 直接接补助动词，不加 서' },
      { wrong: '늦면 큰일이에요.', correct: '늦으면 큰일이에요.', note: '늦다 是有收音词干，接 -으면，不能直接接 -면' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p6-l06',
    partNumber: 6,
    lessonNumber: 6,
    title: '-는/ㄴ다고 생각하다, -다고 생각하다, -(이)라고 생각하다',
    whatItDoes: '说"我觉得……，我认为……"',
    whatItDoesBody: '用于口语中，表示"觉得……，认为……"。\n动词接 -는/ㄴ다고 생각하다，形容词接 -다고 생각하다，名词接 -(이)라고 생각하다。\n可以作为结束语，也可以在中间加连接词尾。\n中文"我觉得/我认为"只有一种说法，但韩语要根据后面接的是动词、形容词还是名词选不同形式这是这节课的核心难点。',
    structureNote: '这节课学"表达观点"的句型框架。\n韩语说"我觉得……"时，中间那个"……"要变形：\n动词→-는/ㄴ다고，形容词→-다고，名词→-(이)라고，最后统一接 생각해요。\n记住三个入口，观点表达就通了。',
    rulesNote: '动词收音规则：\n有收音→-는다고（먹는다고），无收音→-ㄴ다고（가다→간다고）。\n形容词直接接 -다고（예쁘다고，맛있다고）。\n名词：\n有收音→이라고，无收音→라고。\n过去时统一用 -았/었다고 생각해요。',
    scenarioNote: '"我觉得那首歌很好听""你觉得这家店怎么样？""我认为他是个好人"表达个人观点是所有对话的核心能力。\n看综艺、追剧讨论剧情、和韩国朋友聊天时，-다고 생각해요 是你最需要的句型之一。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-다고 생각하다 · -(이)라고 생각하다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"我觉得……，我认为……"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">그 가수가 라이브를 잘할 수 있다고 생각해요.</span> — 我觉得那个歌手能唱好现场。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국 생활이 재미있다고 생각해요.</span> — 我觉得韩国生活很有趣。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">그 남자가 좋은 사람이라고 생각해요.</span> — 我觉得那个男生是个好人。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种入口</div>
  <div style="margin-bottom:6px">① 动词 → <b>-는다고/ㄴ다고 생각해요</b>（有收音→-는다고，无收音→-ㄴ다고）</div>
  <div style="margin-bottom:6px">② 形容词 → <b>-다고 생각해요</b>（词干直接接）</div>
  <div>③ 名词 → <b>-(이)라고 생각해요</b>（有收音→이라고，无收音→라고）</div>
</div>
<div class="reminder-box">形容词不能用 -는다고：좋는다고 ✗ → 좋다고 ✓。动词不能直接用 -다고：먹다고 ✗ → 먹는다고 ✓。</div>`,
    compareHtml: `<div class="card-title">动词 -는/ㄴ다고 vs 形容词 -다고 vs 名词 -(이)라고</div>
<div class="card-body">韩语说"我觉得……"时，根据后面接动词、形容词还是名词，形式各不同。这是这节课的核心难点，记住三个入口就通了。中文只有一种"我觉得"，韩语要看词性分三套。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0">
  <div class="tok-row">
    <div class="tok t-v">动词 -는/ㄴ다고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">有收音→-는다고，无收音→-ㄴ다고</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잘한다고 생각해요.</span><span style="font-size:14px;color:#5a4640">我觉得做得很好。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">간다고 생각해요.</span><span style="font-size:14px;color:#5a4640">我觉得会去。</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">形容词 -다고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">词干直接接 -다고</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있다고 생각해요.</span><span style="font-size:14px;color:#5a4640">我觉得很有意思。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어렵다고 생각해요.</span><span style="font-size:14px;color:#5a4640">我觉得很难。</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">名词 -(이)라고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">有收音→이라고，无收音→라고</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋은 사람이라고 생각해요.</span><span style="font-size:14px;color:#5a4640">我觉得是个好人。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가수라고 생각했어요.</span><span style="font-size:14px;color:#5a4640">我以为是歌手。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">-다고 하다 变形规则</div><div style="font-size:15px;color:#5a4640">动词现在时：-는다고（먹는다고）；形容词/이다：-다고（좋다고/학생이다고）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">过去时统一加 -았/었다고：먹었다고、좋았다고。-라고 생각해요 表示我觉得/认为，是日常表达看法的标准句式。</div></div>
<div class="reminder-box">형용사에 -는다고 쓰면 틀려요：좋는다고 ✗ → 좋다고 ✓。동사에 -다고 바로 쓰면 틀려요：먹다고 ✗ → 먹는다고 ✓。过去时统一用 -았/었다고：잘했다고 생각해요 ✓。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 6 课 · 已完成</div>
    <div class="ov-hero-title">-다고 생각하다</div>
    <div class="ov-hero-sub">表达看法 · 动/形/名三套 · 转述观点</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">동사</span>：-는다고 생각해요（먹는다고）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">형용사</span>：-다고 생각해요（좋다고）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">명사+이다</span>：-(이)라고 생각해요（학생이라고）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">잘한다고 생각해요</span></div><div class="struct-zh">我觉得做得很好。</div></div>
        <div><div class="tok-row"><span class="tok t-v">좋은 사람이라고 생각해요</span></div><div class="struct-zh">我觉得是个好人。</div></div>
        <div><div class="tok-row"><span class="tok t-v">맞다고 생각했어요</span></div><div class="struct-zh">我以为是对的。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋는다고 생각해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋다고 생각해요（形容词用 -다고）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹다고 생각해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹는다고 생각해요（动词现在时用 -는다고）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '동사 -는/ㄴ다고 vs 명사 -(이)라고',
    structures: [
      {
        ko: '동사 (받침O) + -는다고 생각하다',
        zh: '有收音动词词干 + -는다고 생각하다',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는다고 생각하다', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침X) + -ㄴ다고 생각하다',
        zh: '无收音动词词干 + -ㄴ다고 생각하다',
        tokens: [
          { text: '동사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄴ다고 생각하다', role: 'plain' },
        ],
      },
      {
        ko: '형용사 어간 + -다고 생각하다',
        zh: '形容词词干 + -다고 생각하다',
        tokens: [
          { text: '형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-다고 생각하다', role: 'plain' },
        ],
      },
      {
        ko: '저는 이번 앨범이 정말 좋다고 생각해요.',
        zh: '我觉得这张专辑真的很好。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '이번 앨범이', role: 'subject' },
          { text: '정말 좋다고', role: 'verb' },
          { text: '생각해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词有收音 + -는다고 생각하다', examples: '먹다→먹는다고 생각해요 / 읽다→읽는다고 생각해요' },
      { type: 'rule', text: '动词无收音 + -ㄴ다고 생각하다', examples: '가다→간다고 생각해요 / 보다→본다고 생각해요' },
      { type: 'rule', text: '形容词 + -다고 생각하다：词干直接接续', examples: '좋다→좋다고 생각해요 / 어렵다→어렵다고 생각해요' },
      { type: 'rule', text: '名词有收音 + -이라고 생각하다', examples: '학생→학생이라고 생각해요 / 선생님→선생님이라고 생각해요' },
      { type: 'rule', text: '名词无收音 + -라고 생각하다', examples: '가수→가수라고 생각해요 / 친구→친구라고 생각해요' },
      { type: 'rule', text: '하다 动词：하다→한다고 생각해요', examples: '공부하다→공부한다고 생각해요' },
      { type: 'note', text: '形容词不能用 -는다고/-ㄴ다고，必须用 -다고' },
      { type: 'example', text: '교재 예문：손창 씨가 우리 반에서 제일 예쁜 여자라고 생각해요' },
      { type: 'example', text: '교재 예문：소이 선생님이 제일 잘하는 한국어 선생님이라고 생각해요 / 그 남자가 좋은 사람이라고 생각해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '이 가수가', role: 'subject' },
          { text: '정말 잘한다고', role: 'verb' },
          { text: '생각해요', role: 'verb' },
        ],
        zh: '我觉得这个歌手真的很厉害。',
        swapRole: 'verb',
          swapWords: ['정말 잘한다고', '노력한다고', '성장한다고'],
      },
      {
        wordBlocks: [
          { text: '이 노래가', role: 'subject' },
          { text: '제일 어렵다고', role: 'verb' },
          { text: '생각해요', role: 'verb' },
        ],
        zh: '我觉得这首歌最难。',
        swapRole: 'verb',
          swapWords: ['제일 어렵다고', '정말 좋다고', '너무 빠르다고'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '그 사람이', role: 'subject' },
          { text: '좋은 친구라고', role: 'verb' },
          { text: '생각해요', role: 'verb' },
        ],
        zh: '我觉得那个人是个好朋友。',
        swapRole: 'verb',
          swapWords: ['좋은 친구라고', '좋은 사람이라고', '실력 있는 가수라고'],
      },
      {
        wordBlocks: [
          { text: '한국어 공부가', role: 'subject' },
          { text: '재미있다고', role: 'verb' },
          { text: '생각해요', role: 'verb' },
        ],
        zh: '我觉得学韩语很有趣。',
        swapRole: 'verb',
          swapWords: ['재미있다고', '어렵다고', '중요하다고'],
      },
    ],
    scenarios: [
      { icon: '🎤', context: 'KPOP评价', ko: '그 가수가 라이브를 정말 잘한다고 생각해요.', zh: '我觉得那个歌手现场唱得真的很好。' },
      { icon: '🌟', context: '推荐', ko: '이 앨범이 올해 최고라고 생각해요.', zh: '我觉得这张专辑是今年最棒的。' },
      { icon: '📚', context: '学习感想', ko: '한국어 발음이 제일 어렵다고 생각해요.', zh: '我觉得韩语发音最难。' },
      { icon: '🤔', context: '意见表达', ko: '그 방법이 더 좋다고 생각해요.', zh: '我觉得那个方法更好。' },
      { icon: '👥', context: '人物评价', ko: '저는 그 사람이 정말 친절한 사람이라고 생각해요.', zh: '我觉得那个人真的是个亲切的人。' },
      { icon: '🇰🇷', context: '韩国文化', ko: '한국 음식이 정말 맛있다고 생각해요.', zh: '我觉得韩国食物真的很好吃。' },
    ],
    mistakes: [
      { wrong: '좋은다고 생각해요.', correct: '좋다고 생각해요.', note: '形容词直接接 -다고，不加 는/ㄴ' },
      { wrong: '가수다고 생각해요.', correct: '가수라고 생각해요.', note: '无收音名词用 -라고，-다고 是动词/形容词专用' },
      { wrong: '먹다고 생각해요.', correct: '먹는다고 생각해요.', note: '有收音动词用 -는다고，不能直接接 -다고' },
      { wrong: '선생님이다고 생각해요.', correct: '선생님이라고 생각해요.', note: '名词后面引用用 -(이)라고，이다+다고 是错误形式' },
    ],
    linkedGrammarIds: ['gp-22'],
  },
  {
    id: 'card-p6-l07',
    partNumber: 6,
    lessonNumber: 5,
    title: '-는/은/ㄴ 날',
    whatItDoes: '描述特定的日子和时刻',
    whatItDoesBody: '날 是名词，表示"日子、那天"。\n动词和形容词与 날 相连时需要搭配冠词形；\n名词直接用 (의) 날。\n用于描述某个特定时间点或特定性质的日子。\n这是第五章冠词形的延伸应用你已经学过 -는/은/ㄴ 修饰名词，这节课专门把它用在 날 上，感受"描述日子"这一高频场景。\n中文"下雨的日子"直接形容词+名词，韩语要根据动词还是形容词、有无收音分别选 -는/-은/-ㄴ，规则比中文复杂。',
    structureNote: '这节课是冠词形的专项练习：\n动词现在时(-는 날)、动词过去时(-은/ㄴ 날)、形容词(-은/ㄴ 날)三种形式修饰 날。\n核心逻辑和修饰其他名词完全一样，只是 날 这个词在日常对话里特别常用，值得单独练习。',
    rulesNote: '动词现在冠词形：\n直接词干 + -는（不看收音）。\n动词过去冠词形：\n有收音→-은 날，无收音/ㄹ→-ㄴ 날。\n形容词冠词形：\n有收音→-은 날，无收音→-ㄴ 날（形容词现在时也用 -은/ㄴ）。\nㄹ收音动词/形容词：\nㄹ 脱落→-ㄴ 날（살다→사는 날，길다→긴 날）。',
    scenarioNote: '"第一次见面的那天""心情好的日子就出去逛""今天是休息的日子"描述特定日子是写日记、聊感受、回忆往事时的必备表达。\nKPOP 歌词里充满了 날 的用法，学会这节课你能读懂更多歌词。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-는/은/ㄴ 날</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">描述特定的日子——做什么的日子，或心情怎样的日子。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘은 일하는 날이에요.</span> — 今天是工作的日子。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">기분이 좋은 날에 노래를 불러요.</span> — 心情好的日子就唱歌。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">처음 만난 날을 기억해요.</span> — 记得第一次见面的那天。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种冠词形 + 날</div>
  <div style="margin-bottom:6px">① 动词现在 → <b>-는 날</b>：공부하는 날（学习的日子）</div>
  <div style="margin-bottom:6px">② 动词过去 → <b>-은/ㄴ 날</b>：만난 날（见面的那天）</div>
  <div>③ 形容词 → <b>-은/ㄴ 날</b>：좋은 날 / 바쁜 날（心情好/忙碌的日子）</div>
</div>
<div class="reminder-box">形容词不能用 -는 날：바쁘는 날 ✗ → 바쁜 날 ✓。이 用法是第五章冠词形的延伸——规则完全一样，只是固定用 날。</div>`,
    compareHtml: `<div class="card-title">动词现在 -는 날 vs 动词过去 -은/ㄴ 날 vs 形容词 -은/ㄴ 날</div>
<div class="card-body">날 前面的冠词形取决于动词时态和词性：动词现在时用 -는，动词过去时和形容词都用 -은/ㄴ。形容词没有 -는 날 的形式，这是最容易出错的地方。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0">
  <div class="tok-row">
    <div class="tok t-v">动词现在 -는 날</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">习惯做/当前做的日子</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">일하는 날</span><span style="font-size:14px;color:#5a4640">工作的日子</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">운동하는 날</span><span style="font-size:14px;color:#5a4640">运动的日子</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">动词过去 -은/ㄴ 날</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">过去某个特定那天</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">처음 만난 날</span><span style="font-size:14px;color:#5a4640">第一次见面的那天</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">졸업한 날</span><span style="font-size:14px;color:#5a4640">毕业的那天</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">形容词 -은/ㄴ 날</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">某种状态的日子</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">기분이 좋은 날</span><span style="font-size:14px;color:#5a4640">心情好的日子</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바쁜 날</span><span style="font-size:14px;color:#5a4640">忙碌的日子</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">KPOP 歌词里的 날</div>
  <div style="font-size:15px;color:#241917">니가 없는 날（没有你的日子）/ 행복했던 날（曾经幸福的日子）</div>
  <div style="font-size:15px;color:#241917">네가 좋은 날（喜欢你的日子）/ 우리가 처음 만난 날（我们第一次见面的那天）</div>
</div>
<div class="reminder-box">기분이 좋는 날 ✗ → 기분이 좋은 날 ✓ — 形容词 좋다 有收音，用 -은，不用 -는。바쁘는 날 ✗ → 바쁜 날 ✓ — 形容词没有 -는 날 的形式。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 课 · 已完成</div>
    <div class="ov-hero-title">-는/은/ㄴ 날</div>
    <div class="ov-hero-sub">特定日子 · 冠词 형 + 날 · 동/형/명 三套</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">동사 + -는 날</span>：만나는 날（见面那天）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">형용사 + -은/ㄴ 날</span>：더운 날（热的日子）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">명사 + (의) 날</span>：졸업(의) 날（毕业那天）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">처음 만나는 날이었어요</span></div><div class="struct-zh">是第一次见面那天。</div></div>
        <div><div class="tok-row"><span class="tok t-v">비 오는 날엔 커피가 좋아요</span></div><div class="struct-zh">下雨的日子喝咖啡最好。</div></div>
        <div><div class="tok-row"><span class="tok t-v">졸업하는 날을 기다려요</span></div><div class="struct-zh">期待毕业那天。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">졸업 날（名词直接+날）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">졸업하는 날（有动作要加冠词 형）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">더운는 날</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">더운 날（形容词用 -은/ㄴ，不用 -는）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-는 날（现在/习惯）vs -은/ㄴ 날（过去那天）',
    structures: [
      {
        ko: '동사 어간 + -는 날 (현재)',
        zh: '动词词干 + -는 날（现在时）',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는 날', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침O) + -은 날 / (받침X) + -ㄴ 날 (과거)',
        zh: '动词有收音 + -은 날 / 无收音 + -ㄴ 날（过去时）',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '-은 날', role: 'plain' },
          { text: '/', role: 'plain' },
          { text: '동사(받침X)', role: 'verb' },
          { text: '-ㄴ 날', role: 'plain' },
        ],
      },
      {
        ko: '오늘은 일하는 날이고 내일도 일하는 날이에요.',
        zh: '今天是工作的日子，明天也是工作的日子。',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '일하는 날이고', role: 'verb' },
          { text: '내일도', role: 'time' },
          { text: '일하는 날이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 남자를 처음 만난 날에 비가 왔어요.',
        zh: '第一次见到那个男人的那天下雨了。',
        tokens: [
          { text: '그 남자를', role: 'object' },
          { text: '처음 만난 날에', role: 'time' },
          { text: '비가 왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在冠词形 + 날：词干直接 + -는 날', examples: '가다→가는 날 / 먹다→먹는 날 / 공부하다→공부하는 날' },
      { type: 'rule', text: '动词过去冠词形 + 날：有收音→-은 날；无收音→-ㄴ 날', examples: '먹다→먹은 날 / 가다→간 날' },
      { type: 'rule', text: '形容词冠词形 + 날：形容词词干 + -은/ㄴ 날', examples: '좋다→좋은 날 / 바쁘다→바쁜 날 / 춥다→추운 날' },
      { type: 'rule', text: '名词 + (의) 날：名词直接连接', examples: '아버지의 날（父亲节）/ 생일 날（生日那天）' },
      { type: 'usage', text: '날 + 에：表达特定日子发生的事', examples: '가는 날에（去的那天）/ 만난 날에（见面那天）' },
      { type: 'note', text: '形容词不能用 -는 날，必须用 -은/ㄴ 날' },
      { type: 'compare', text: '动词现在 -는 날 vs 过去 -은/ㄴ 날：前者是习惯/当前状态的日子；后者是过去某个特定日子' },
      { type: 'example', text: '교재 예문：등산 가는 날에 비가 오면 큰일이에요 / 오늘은 일하는 날이고 내일도 일하는 날이에요' },
      { type: 'example', text: '교재 예문：그 남자를 만난 날에 비가 온 날이었어요 / 오늘은 기분이 좋은 날이에요' },
      { type: 'example', text: '교재 예문：오늘 같은 한가한 날에 봄놀이를 가고 싶어요 / 내일은 무슨 날이에요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '가사를', role: 'object' },
          { text: '외우는 날이에요', role: 'verb' },
        ],
        zh: '今天是背歌词的日子。',
        swapWords: ['외우는 날이에요', '연습하는 날이에요', '녹음하는 날이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '처음 들은 날을', role: 'time' },
          { text: '기억해요', role: 'verb' },
        ],
        zh: '记得第一次听这首歌的那天。',
        swapWords: ['기억해요', '잊을 수 없어요', '아직도 생각해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '맑은 날에는', role: 'time' },
          { text: '산책해요', role: 'verb' },
        ],
        zh: '天气晴朗的日子就散步。',
        swapWords: ['산책해요', '자전거를 타요', '공원에 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '기분이', role: 'subject' },
          { text: '좋은 날에는', role: 'time' },
          { text: '노래를 많이 들어요', role: 'verb' },
        ],
        zh: '心情好的日子就多听歌。',
        swapWords: ['노래를 많이 들어요', '춤을 춰요', '한국어를 공부해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎤', context: 'KPOP', ko: '이 가수를 처음 본 날을 기억해요.', zh: '记得第一次见到这个歌手的那天。' },
      { icon: '🌸', context: '春天', ko: '날씨가 따뜻한 날에 소풍 가고 싶어요.', zh: '天气暖和的日子想去郊游。' },
      { icon: '📅', context: '特别的日子', ko: '오늘은 아버지의 날이에요.', zh: '今天是父亲节。' },
      { icon: '🎵', context: '学习日', ko: '오늘은 발음을 연습하는 날이에요.', zh: '今天是练习发音的日子。' },
      { icon: '🌧️', context: '下雨天', ko: '비 오는 날에는 집에서 드라마를 봐요.', zh: '下雨天就在家看剧。' },
      { icon: '😴', context: '休息日', ko: '오늘 같은 한가한 날에 푹 쉬고 싶어요.', zh: '像今天这样悠闲的日子想好好休息。' },
    ],
    mistakes: [
      { wrong: '좋는 날', correct: '좋은 날', note: '形容词用 -은/ㄴ 관형사형，不用 -는' },
      { wrong: '먹는 날 (过去那天吃的)', correct: '먹은 날', note: '过去某天用 -은/ㄴ，현재/습관 才用 -는' },
      { wrong: '아버지의 날이 날이에요.', correct: '아버지의 날이에요.', note: '名词 + 의 날 后直接接述语，不重复 날' },
      { wrong: '바쁘는 날', correct: '바쁜 날', note: '바쁘다 是形容词，冠词形是 -ㄴ（바쁜），不是 -는' },
    ],
    linkedGrammarIds: ['gp-23'],
  },
  {
    id: 'card-p6-l08',
    partNumber: 6,
    lessonNumber: 7,
    title: '얼마/누구/어디/언제/무엇(뭐) + -(이)라고 하다, 사정이 있다',
    whatItDoes: '礼貌确认没听清的内容',
    whatItDoesBody: '얼마/누구/어디/언제/무엇(뭐) + -(이)라고 하다 表示说话人没听清对方的话或为了确认时使用，相当于汉语的"您说……来着？"；\n사정이 있다 主要用于口语，相当于"有事情，有说道，有苦衷"。\n中文"来着"这个词就对应 -(이)라고 했지요?用疑问词"定位"没听清的部分，再加 라고 하다 表示转述确认。',
    structureNote: '这节课学"没听清时怎么礼貌确认"。\n用疑问词（얼마/누구/어디/언제/뭐）代替没听清的部分，后面接 라고 했지요? 或 라고 하셨지요? 即可。\n사정이 있다 是独立短语，表示"有事/有苦衷"，常用来婉拒或提前离开时说明原因。',
    rulesNote: '얼마/누구/어디/언제 结尾无收音，直接接 라고 하다。\n무엇 有收音→이라고 하다；\n口语缩略 뭐 无收音→라고 하다（뭐라고 했지요?）。\n礼貌程度：\n하다→했지요?（普通），하셨지요?（尊敬）。\n사정이 있다/사정이 생겼다（有事了/临时有事）都常用。',
    scenarioNote: '"您说价格是多少来着？""刚才说是谁？""不好意思，我有点事先走了"这三种场景在购物、问路、聚会离场时都会遇到。\n사정이 있다 是礼貌退出的万能借口，-라고 했지요? 是确认信息的标准句型，实用性极高。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">얼마/누구 + 라고 했지요? · 사정이 있다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">礼貌确认没听清的内容，或说"我有事先走了"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">수리비가 얼마라고 했지요?</span> — 修理费您说是多少来着？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">방금 뭐라고 하셨지요?</span> — 刚才说什么来着？</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">사정이 있어서 먼저 갈게요.</span> — 我有事，先走了。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两块内容</div>
  <div style="margin-bottom:6px">① <b>疑问词 + -(이)라고 했지요?</b> — 用疑问词代替没听清的部分，礼貌确认<br><span style="color:#89756e;font-size:.9rem">얼마/누구/어디/언제 无收音→라고；무엇 有收音→이라고</span></div>
  <div>② <b>사정이 있다</b> — 有事/有苦衷（礼貌退出的万能短语）</div>
</div>
<div class="reminder-box">얼마이라고 ✗ → 얼마라고 ✓（无收音直接接 라고）。무엇이라고 ✓ / 뭐라고 ✓（两种都正确）。尊敬体：-했지요? → -하셨지요?</div>`,
    compareHtml: `<div class="card-title">얼마/누구/어디/언제 + 라고 vs 무엇/뭐 + (이)라고</div>
<div class="card-body">疑问词末尾有无收音决定接 라고 还是 이라고：얼마/누구/어디/언제 无收音，直接接 라고；무엇 有收音 ㅅ，接 이라고。口语缩略 뭐 无收音，接 라고。规则和名词的 -(이)라고 完全相同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">얼마/누구/어디/언제 + 라고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">无收音疑问词 → 直接接 라고</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">생일이 언제라고 했지요?</span><span style="font-size:14px;color:#5a4640">生日说是什么时候来着？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">수리비가 얼마라고 했지요?</span><span style="font-size:14px;color:#5a4640">修理费说是多少来着？</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">무엇 이라고 / 뭐라고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">무엇 有收音→이라고 / 뭐→라고</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">방금 뭐라고 하셨지요?</span><span style="font-size:14px;color:#5a4640">刚才说什么来着？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이름이 무엇이라고 했지요?</span><span style="font-size:14px;color:#5a4640">名字说是什么来着？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">사정이 있다 — 礼貌退出万能句</div>
  <div style="font-size:15px;color:#241917">사정이 있어서 먼저 갈게요 — 我有事，先走了（礼貌提前离场）</div>
  <div style="font-size:15px;color:#241917">사정이 생겼어요 — 突然有事了（临时有变）</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">사정 = 情况/苦衷，不说具体原因，礼貌又万能</div>
</div>
<div class="reminder-box">얼마이라고 ✗ → 얼마라고 ✓（无收音直接接 라고）。-했지요? 是 -라고 하다 的过去确认形，尊敬体：-했지요? → -하셨지요?。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 课 · 已完成</div>
    <div class="ov-hero-title">-(이)라고 하다 转述</div>
    <div class="ov-hero-sub">礼貌确认 · 没听清 · 转述他人</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">뭐라고 하셨어요?</span>：您说的是什么？（礼貌再次确认）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">어디라고 했어요?</span>：说的是哪里？</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">-(이)라고 하다</span>：转述/引用（他说……）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">뭐라고 하셨어요?</span></div><div class="struct-zh">您刚才说什么了？</div></div>
        <div><div class="tok-row"><span class="tok t-v">몇 시라고 했어요?</span></div><div class="struct-zh">说的几点来着？</div></div>
        <div><div class="tok-row"><span class="tok t-v">학생이라고 했어요</span></div><div class="struct-zh">他说是学生。（转述）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생라고 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이라고 했어요（名词有收音加 이라고）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가다고 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">간다고 했어요（动词转述用 -ㄴ다고）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '얼마/누구/어디/언제 + 라고 vs 무엇/뭐 + 이라고/라고',
    structures: [
      {
        ko: '얼마/누구/어디/언제 + 라고 하다',
        zh: '얼마/누구/어디/언제 + 라고 하다',
        tokens: [
          { text: '얼마/누구/어디/언제', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '라고 하다', role: 'verb' },
        ],
      },
      {
        ko: '무엇 + 이라고 하다 / 뭐 + 라고 하다',
        zh: '무엇 + 이라고 하다 / 뭐 + 라고 하다',
        tokens: [
          { text: '무엇', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '이라고 하다', role: 'verb' },
        ],
      },
      {
        ko: '수리비가 얼마라고 했지요?',
        zh: '修理费说是多少来着？',
        tokens: [
          { text: '수리비가', role: 'subject' },
          { text: '얼마라고', role: 'plain' },
          { text: '했지요', role: 'verb' },
        ],
      },
      {
        ko: '사정이 있어서 오늘은 먼저 갈게요.',
        zh: '有事情，今天先走了。',
        tokens: [
          { text: '사정이 있어서', role: 'verb' },
          { text: '오늘은', role: 'time' },
          { text: '먼저 갈게요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '얼마/누구/어디/언제：无收音疑问词，直接 + 라고 하다', examples: '얼마라고 했지요? / 누구라고 했지요?' },
      { type: 'rule', text: '무엇：有收音疑问词 → 이라고 하다', examples: '무엇이라고 했지요? / 뭐라고 하셨지요?（뭐 无收音→라고）' },
      { type: 'usage', text: '确认疑问中与 -지요? 结合更自然', examples: '얼마라고 했지요? / 언제라고 하셨지요?' },
      { type: 'usage', text: '사정이 있다 固定表达', examples: '사정이 있어요（有事）/ 사정이 생겼어요（有事了）/ 사정이 있어서（因为有事）' },
      { type: 'usage', text: '사정이 있다 语感：比 일이 있어요 更强调"不得已的苦衷"，常用于提前说明或不出席的理由' },
      { type: 'note', text: '-(이)라고 하다 引用时将原话转为间接引用，与直接引用（" "）形式不同' },
      { type: 'example', text: '교재 예문：수리비가 얼마라고 했지요? / 방금 전화 온 사람이 누구라고 했지? / 생일이 언제라고 했지요?' },
      { type: 'example', text: '교재 예문：저는 이미 도착했는데요, 회의 장소가 어디라고 하셨지요?' },
      { type: 'example', text: '교재 예문：저는 사정이 있어서요 / 손창 씨는 사정이 있어서 갑자기 귀국했어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '콘서트가', role: 'subject' },
          { text: '언제라고', role: 'plain' },
          { text: '했지요', role: 'verb' },
        ],
        zh: '演唱会说是什么时候来着？',
        swapWords: ['했지요', '하셨지요', '하셨어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '장소가', role: 'subject' },
          { text: '어디라고', role: 'plain' },
          { text: '하셨지요', role: 'verb' },
        ],
        zh: '地点说是哪里来着？',
        swapWords: ['하셨지요', '했지요', '하셨어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '방금', role: 'time' },
          { text: '뭐라고', role: 'plain' },
          { text: '하셨지요', role: 'verb' },
        ],
        zh: '刚才说什么来着？',
        swapWords: ['하셨지요', '했지요', '하셨어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '사정이 있어서', role: 'verb' },
          { text: '오늘은', role: 'time' },
          { text: '못 갈 것 같아요', role: 'verb' },
        ],
        zh: '有点事情，今天好像不能去了。',
        swapWords: ['못 갈 것 같아요', '먼저 갈게요', '참석이 어려울 것 같아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '❓', context: '没听清', ko: '가격이 얼마라고 하셨지요?', zh: '价格说是多少来着？' },
      { icon: '👤', context: '确认人名', ko: '담당자가 누구라고 했지요?', zh: '负责人说是谁来着？' },
      { icon: '📍', context: '确认地点', ko: '팬미팅 장소가 어디라고 했지요?', zh: '粉丝见面会地点说是哪里来着？' },
      { icon: '📅', context: '确认时间', ko: '앨범 발매일이 언제라고 했지요?', zh: '专辑发行日说是什么时候来着？' },
      { icon: '🙏', context: '提前离开', ko: '사정이 생겨서 먼저 가겠습니다.', zh: '有事情发生，先走了。' },
      { icon: '💬', context: '无法赴约', ko: '사정이 있어서 이번에는 참석이 어려울 것 같아요.', zh: '有点事情，这次好像很难出席。' },
    ],
    mistakes: [
      { wrong: '얼마이라고 했지요?', correct: '얼마라고 했지요?', note: '얼마 无收音，直接接 라고，不加 이' },
      { wrong: '무엇라고 했지요?', correct: '무엇이라고 했지요?', note: '무엇 有收音，接 이라고（뭐라고 也可以）' },
      { wrong: '사정이 있다서 못 가요.', correct: '사정이 있어서 못 가요.', note: '있다 接 -아/어서 时变为 있어서，不是 있다서' },
      { wrong: '어디이라고 하셨지요?', correct: '어디라고 하셨지요?', note: '어디 是无收音疑问词，接 라고，不接 이라고' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p6-l09',
    partNumber: 6,
    lessonNumber: 9,
    title: '-을/ㄹ 수 있을지 걱정이다, -은/ㄴ 지(가) 얼마 안 되다',
    whatItDoes: '说"担心能不能……"和"没多久"',
    whatItDoesBody: '-을/ㄹ 수 있을지 걱정이다 是固定句式，用于口语，表示"担心能不能做某事"；\n-은/ㄴ 지(가) 얼마 안 되다 是固定句式，常用于口语，相当于汉语的"做……没有多久"。\n中文"担心能不能……"只需要直接说，但韩语用 -을지 把那个不确定性"内嵌"进去，是韩语表达间接担忧的固定方式。',
    structureNote: '这节课学两个固定句式。\n第一个：\n-을/ㄹ 수 있을지 걱정이다，把"能力担忧"打包成一句话；\n第二个：\n-은/ㄴ 지 얼마 안 되다，用过去冠词形+지 表示"从做了那件事到现在时间很短"。\n两个都是固定搭配，整块记忆效率最高。',
    rulesNote: '-을/ㄹ 수 있을지：\n有收音→을지，无收音/ㄹ→ㄹ지，规则与 -을/ㄹ 수 있다 相同。\n-은/ㄴ 지 얼마 안 되다：\n动词过去冠词形 + 지（有收音→-은 지，无收音→-ㄴ 지）。\n时间表达：\n얼마 안 됐어요（没多久）/ 이제 막 됐어요（刚刚）。\n지(가) 中的 가 可省略。',
    scenarioNote: '"担心自己韩语够不够好""来韩国没多久还不熟悉""学韩语没多久"初学者自我介绍、解释自己水平时超级实用。\n两个句式都带有谦虚、坦诚的语气，在韩国文化里给人留下好印象。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-을/ㄹ 수 있을지 걱정이다 · -은/ㄴ 지 얼마 안 되다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"担心能不能……"和"做了没多久"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">발표를 잘할 수 있을지 걱정이에요.</span> — 担心能不能把发表做好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어에 적응할 수 있을지 걱정이에요.</span> — 担心能不能适应韩语。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">한국에 온 지 얼마 안 됐어요.</span> — 来韩国没多久。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个固定句式</div>
  <div style="margin-bottom:6px">① <b>-을/ㄹ 수 있을지 걱정이다</b> — 担心能不能做某事（整块记忆）<br><span style="color:#89756e;font-size:.9rem">有收音→을지，无收音/ㄹ→ㄹ지</span></div>
  <div>② <b>-은/ㄴ 지 얼마 안 되다</b> — 做了没多久（动词过去冠词形+지 얼마 안 됐어요）</div>
</div>
<div class="reminder-box">한국에 온 지 얼마 안 됐어요（来韩国没多久）vs 온 지 3개월 됐어요（来了3个月）— 안 됐어요=没多久，됐어요=说明时长。</div>`,
    compareHtml: `<div class="card-title">-을/ㄹ 수 있을지 걱정（担心能否）vs -은/ㄴ 지 얼마 안 되다（没多久）</div>
<div class="card-body">两个都是固定句式，整块记忆效率最高：걱정이다 前固定接 -을/ㄹ 수 있을지；얼마 안 되다 前接动词过去冠词形 -은/ㄴ 지。两者结构相似但含义完全不同，都是日常高频表达。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 수 있을지 걱정이다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">担心能不能做到</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">따라 할 수 있을지 걱정이에요.</span><span style="font-size:14px;color:#5a4640">担心能不能跟上。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">발표를 잘할 수 있을지 걱정이에요.</span><span style="font-size:14px;color:#5a4640">担心能不能把发表做好。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-은/ㄴ 지 얼마 안 되다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">做了没多久（时间短暂）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배운 지 얼마 안 됐어요.</span><span style="font-size:14px;color:#5a4640">学了没多久。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 온 지 얼마 안 됐어요.</span><span style="font-size:14px;color:#5a4640">来韩国没多久。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-은/ㄴ 지 时间表达对比</div>
  <div style="font-size:15px;color:#241917">온 지 얼마 안 됐어요 — 来了没多久（时间短）</div>
  <div style="font-size:15px;color:#241917">온 지 3개월 됐어요 — 来了3个月（说明时长）</div>
  <div style="font-size:15px;color:#241917">온 지 오래됐어요 — 来了很久了（时间长）</div>
</div>
<div class="reminder-box">먹을 지 얼마 안 됐어요 ✗（未来形）→ 먹은 지 얼마 안 됐어요 ✓（过去冠词形）。걱정이에요 固定搭配，不说 걱정해요。-을지 걱정이다 整块记忆，不要拆开理解。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 9 课 · 已完成</div>
    <div class="ov-hero-title">수 있을지 걱정 · 얼마 안 되다</div>
    <div class="ov-hero-sub">担心能否 · 没多久 · 时间表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-을/ㄹ 수 있을지 걱정이다</span>：担心自己能不能做到</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-은/ㄴ 지(가) 얼마 안 되다</span>：做了……没多久</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">잘할 수 있을지 걱정이에요</span></div><div class="struct-zh">我担心能不能做好。</div></div>
        <div><div class="tok-row"><span class="tok t-v">한국에 온 지 얼마 안 됐어요</span></div><div class="struct-zh">来韩国没多久。</div></div>
        <div><div class="tok-row"><span class="tok t-v">배운 지 얼마 안 돼서 어려워요</span></div><div class="struct-zh">学了没多久，所以很难。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갈 수 있지 걱정이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 수 있을지 걱정이에요（用 을지，不是 지）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">온 지 얼마 안 되다（现在）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">온 지 얼마 안 됐어요（用 됐어요）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-을/ㄹ 수 있을지 걱정（担心能否）vs -은/ㄴ 지 얼마 안 되다（没多久）',
    structures: [
      {
        ko: '동사 (받침O) + -을 수 있을지 걱정이다',
        zh: '有收音动词词干 + -을 수 있을지 걱정이다',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을 수 있을지 걱정이다', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침X/ㄹ) + -ㄹ 수 있을지 걱정이다',
        zh: '无收音/ㄹ收音动词词干 + -ㄹ 수 있을지 걱정이다',
        tokens: [
          { text: '동사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄹ 수 있을지 걱정이다', role: 'plain' },
        ],
      },
      {
        ko: '한국 생활에 적응할 수 있을지 걱정이에요.',
        zh: '担心能不能适应韩国生活。',
        tokens: [
          { text: '한국 생활에', role: 'place' },
          { text: '적응할 수 있을지', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배운 지 얼마 안 됐어요.',
        zh: '学韩语没多久。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배운 지', role: 'verb' },
          { text: '얼마 안 됐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을 수 있을지 걱정이다：有收音词干 + -을 수 있을지 걱정이에요', examples: '먹다→먹을 수 있을지 걱정이에요' },
      { type: 'rule', text: '-ㄹ 수 있을지 걱정이다：无收音/ㄹ收音词干 + -ㄹ 수 있을지 걱정이에요', examples: '가다→갈 수 있을지 걱정이에요 / 살다→살 수 있을지 걱정이에요' },
      { type: 'rule', text: '-은/ㄴ 지 얼마 안 되다：动词有收音→-은 지 얼마 안 됐어요；无收音→-ㄴ 지 얼마 안 됐어요' },
      { type: 'example', text: '-은/ㄴ 지 얼마 안 되다 예시：졸업하다→졸업한 지 얼마 안 됐어요 / 오다→온 지 얼마 안 됐어요' },
      { type: 'usage', text: '-은/ㄴ 지 + 시간 표현：온 지 3개월 됐어요（来了3个月）/ 배운 지 6개월 됐어요' },
      { type: 'note', text: '-을지 vs -는지：걱정이다 前固定用 -을지，换成 -는지 意思会变' },
      { type: 'compare', text: '-은/ㄴ 지 안 됐어요 vs 됐어요：否定形(안 됐어요)表示"没多久"；肯定形(됐어요)表示经过了多久' },
      { type: 'example', text: '교재 예문：한국 생활에 적응할 수 있을지 걱정이에요 / 이 프로젝트를 획득할 수 있을지 걱정이에요' },
      { type: 'example', text: '교재 예문：한국에 온 지 얼마 안 됐어요 / 한국어를 배운 지가 얼마 안 됐어요 / 결혼한 지 얼마 안 됐어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '다 외울 수 있을지', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
        zh: '担心能不能把这首歌全背下来。',
        swapWords: ['걱정이에요', '정말 걱정이에요', '많이 걱정돼요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '발음을', role: 'object' },
          { text: '제대로 할 수 있을지', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
        zh: '担心能不能把发音说好。',
        swapWords: ['걱정이에요', '자신이 없어요', '모르겠어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 앱을', role: 'object' },
          { text: '쓴 지', role: 'verb' },
          { text: '얼마 안 됐어요', role: 'verb' },
        ],
        zh: '用这个app没多久。',
        swapWords: ['얼마 안 됐어요', '일주일 됐어요', '한 달 됐어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '공부한 지', role: 'verb' },
          { text: '얼마 안 됐어요', role: 'verb' },
        ],
        zh: '学韩语没多久。',
        swapWords: ['얼마 안 됐어요', '6개월 됐어요', '1년 됐어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😟', context: '考试担心', ko: 'TOPIK 시험을 통과할 수 있을지 걱정이에요.', zh: '担心能不能通过TOPIK考试。' },
      { icon: '🎤', context: 'KPOP', ko: '이 노래를 끝까지 따라 할 수 있을지 걱정이에요.', zh: '担心能不能跟唱到最后。' },
      { icon: '🌏', context: '留学', ko: '한국 생활에 적응할 수 있을지 걱정이에요.', zh: '担心能不能适应韩国生活。' },
      { icon: '🆕', context: '刚开始', ko: '한국어를 배운 지 얼마 안 됐어요.', zh: '学韩语没多久。' },
      { icon: '💍', context: '新婚', ko: '결혼한 지 얼마 안 됐어요.', zh: '结婚没多久。' },
      { icon: '🏢', context: '新工作', ko: '이 회사에 입사한 지 얼마 안 됐어요.', zh: '进这家公司没多久。' },
    ],
    mistakes: [
      { wrong: '갈 수 있는지 걱정이에요.', correct: '갈 수 있을지 걱정이에요.', note: '固定句式用 -을지，不是 -는지' },
      { wrong: '온 지가 얼마 됐어요. (没多久 표현 시)', correct: '온 지 얼마 안 됐어요.', note: '表示没多久必须用否定形 안 됐어요，肯定形 됐어요 表示已经过了多久' },
      { wrong: '먹을 지 얼마 안 됐어요.', correct: '먹은 지 얼마 안 됐어요.', note: '-은/ㄴ 지 얼마 안 되다 用过去冠词形，不能用未来形' },
      { wrong: '-ㄴ 지가 혼자서 쓰임 (시간 없이)', correct: '온 지 얼마 안 됐어요. / 온 지 3개월 됐어요.', note: '-은/ㄴ 지 必须和时间表达或 얼마 一起使用才自然' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p6-l10',
    partNumber: 6,
    lessonNumber: 10,
    title: '-을/ㄹ 생각도 못 하다, 이/가 그립다',
    whatItDoes: '说"连想都不敢想"，也说思念',
    whatItDoesBody: '-을/ㄹ 생각도 못 하다 是口语固定句式，相当于汉语"做……连想都不敢想""连……的想法也没有"；\n이/가 그립다 前面通常接名词，그립다 为形容词，表示"思念……""想念……"。\n中文"连想都不敢想"靠语气和副词表达，韩语用 생각도 못 하다 把"想法"本身变成宾语，加 도（连……也）强调极端程度。',
    structureNote: '这节课学两个情感表达句式：\n-을/ㄹ 생각도 못 하다 表示"连那个念头都没有"（强调不敢或根本没考虑）；\n이/가 그립다 是思念句，名词+이/가+그립다，形容词用法，直接描述思念的对象。\n两个都是情感丰富的表达，日记、聊天时很自然。',
    rulesNote: '-을/ㄹ 생각도 못 하다：\n有收音→을 생각도 못 하다，无收音/ㄹ→ㄹ 생각도 못 하다。\n생각도 못 했어요 是过去式（连想都没想过）。\n그립다 是形容词，变形：\n그리워요（해요体），그리웠어요（过去），그리운 사람（冠词形）。\n이/가 选择：\n思念对象有收音→이，无收音→가。',
    scenarioNote: '"连去韩国都不敢想""想念家乡的食物""思念以前的朋友"这节课的两个表达都带浓烈情感，是留学、旅行、异地生活时最常说的心情描述。\n写韩语日记、给韩国朋友发消息时用上这两句，情感表达立刻更真实。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-을/ㄹ 생각도 못 하다 · 이/가 그립다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"连想都不敢想"，或表达思念之情。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">혼자 여행할 생각도 못 해요.</span> — 连一个人旅行都不敢想。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">기름값이 너무 비싸서 차를 살 생각도 못 해요.</span> — 油价太贵，连买车都不敢想。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">고향 음식이 그리워요.</span> — 想念家乡的食物。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个情感表达</div>
  <div style="margin-bottom:6px">① <b>-을/ㄹ 생각도 못 하다</b> — 连那种念头都没有（极端程度）<br><span style="color:#89756e;font-size:.9rem">有收音→을 생각도 못 해요，无收音/ㄹ→ㄹ 생각도 못 해요</span></div>
  <div>② <b>이/가 그립다</b> — 思念某人某物（情感形容词）<br><span style="color:#89756e;font-size:.9rem">그립다 ㅂ不规则→그리워요；思念对象用 이/가，不用 을/를</span></div>
</div>
<div class="reminder-box">생각도 못 해요 中 도 是必须的，省略变成错误表达。친구를 그립다 ✗ → 친구가 그립다 ✓ — 그립다 是形容词，思念对象用 이/가。</div>`,
    compareHtml: `<div class="card-title">-을/ㄹ 생각도 못 하다（连想都不想）vs 이/가 그립다（思念）</div>
<div class="card-body">两个都是表达强烈情感的高级表达：생각도 못 하다 强调"连那个念头都不敢有"（程度极端）；그립다 是思念形容词，直接说出心里想念的对象。两者都比普通表达语气更重，情感更饱满。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 생각도 못 하다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">连那种想法都没有（极端程度）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사직할 생각도 못 해요.</span><span style="font-size:14px;color:#5a4640">连辞职都不敢想。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">혼자 여행할 생각도 못 해요.</span><span style="font-size:14px;color:#5a4640">连一个人旅行都不敢想。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">이/가 그립다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">思念某人某物（形容词，主语用 이/가）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가족이 그리워요.</span><span style="font-size:14px;color:#5a4640">思念家人。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">고향 음식이 그리워요.</span><span style="font-size:14px;color:#5a4640">想念家乡的食物。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">그립다 vs 그리워하다</div>
  <div style="font-size:15px;color:#241917">그립다 — 我自己思念（主语是说话人）：가족이 그리워요</div>
  <div style="font-size:15px;color:#241917">그리워하다 — 第三者在思念（主语是他人）：그는 고향을 그리워해요</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">그립다 是 ㅂ 不规则：그립다 → 그리워요（ㅂ→우+어=워）</div>
</div>
<div class="reminder-box">생각도 못 해요 中 도 是必须的，省略变成错误表达：생각 못 해요 ✗。친구를 그립다 ✗ → 친구가 그립다 ✓ — 그립다 是形容词，思念对象用 이/가，不用 을/를。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 10 课 · 已完成</div>
    <div class="ov-hero-title">생각도 못 하다 · 그립다</div>
    <div class="ov-hero-sub">连想都没想 · 思念表达 · 情感词汇</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-을/ㄹ 생각도 못 하다</span>：连……都没想到/不敢想</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">이/가 그립다</span>：思念……（형용사，ㅂ 不规则→그리워요）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">그럴 줄은 생각도 못 했어요</span></div><div class="struct-zh">没想到会那样。</div></div>
        <div><div class="tok-row"><span class="tok t-s">가족이</span><span class="tok t-v">그리워요</span></div><div class="struct-zh">想念家人。</div></div>
        <div><div class="tok-row"><span class="tok t-s">고향이</span><span class="tok t-v">그리웠어요</span></div><div class="struct-zh">曾经思念故乡。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">그립어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">그리워요（그립다 是 ㅂ 不规则）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갈 생각을 못 해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 생각도 못 해요（도 强调"连……都"）</span></div></div>
    </div>
  </div>
</div>`,
    compareLabel: '-을/ㄹ 생각도 못 하다（连想都不想）vs 이/가 그립다（思念）',
    structures: [
      {
        ko: '동사 (받침O) + -을 생각도 못 하다',
        zh: '有收音动词词干 + -을 생각도 못 하다',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을 생각도 못 하다', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침X/ㄹ) + -ㄹ 생각도 못 하다',
        zh: '无收音/ㄹ收音动词词干 + -ㄹ 생각도 못 하다',
        tokens: [
          { text: '동사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄹ 생각도 못 하다', role: 'plain' },
        ],
      },
      {
        ko: '기름값이 너무 비싸서 차를 살 생각도 못 해요.',
        zh: '油价太贵了，连买车都不敢想。',
        tokens: [
          { text: '기름값이', role: 'subject' },
          { text: '너무 비싸서', role: 'verb' },
          { text: '차를', role: 'object' },
          { text: '살 생각도 못 해요', role: 'verb' },
        ],
      },
      {
        ko: '매일 가족이 그리워요.',
        zh: '每天都思念家人。',
        tokens: [
          { text: '매일', role: 'time' },
          { text: '가족이', role: 'subject' },
          { text: '그리워요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을 생각도 못 하다：有收音动词词干 + -을 생각도 못 해요', examples: '먹다→먹을 생각도 못 해요 / 읽다→읽을 생각도 못 해요' },
      { type: 'rule', text: '-ㄹ 생각도 못 하다：无收音/ㄹ收音动词词干 + -ㄹ 생각도 못 해요', examples: '가다→갈 생각도 못 해요 / 살다→살 생각도 못 해요' },
      { type: 'rule', text: '이/가 그립다：有收音名词 + 이 그립다；无收音名词 + 가 그립다', examples: '가족이 그립다 / 고향이 그립다 / 친구가 그립다' },
      { type: 'rule', text: '그립다 变形：ㅂ 不规则', examples: '그립다→그리워요（현재）/ 그리웠어요（과거）/ 그리울 거예요（미래）' },
      { type: 'note', text: '-을 생각도 못 하다 中 도 是必须的，省略则变成错误表达' },
      { type: 'compare', text: '그립다 vs 그리워하다：그립다 是说话人自己的感受；그리워하다 用于描述第三者的感受' },
      { type: 'example', text: '교재 예문：기름값이 너무 비싸서 차를 살 생각도 못 해요 / 일이 너무 바빠서 여행할 생각도 못 해요' },
      { type: 'example', text: '교재 예문：요즘 너무 바빠서 영화 볼 생각도 못 해요 / 요즘 일을 구하기 너무 어려워서 사직할 생각도 못 해요' },
      { type: 'example', text: '교재 예문：저는 매일 가족이 그리워요 / 그가 그립습니다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '요즘은', role: 'time' },
          { text: '쉴', role: 'verb' },
          { text: '생각도 못 해요', role: 'verb' },
        ],
        zh: '最近连休息都不敢想。',
        swapWords: ['생각도 못 해요', '여유도 없어요', '시간도 없어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트 티켓이 너무 비싸서', role: 'verb' },
          { text: '살', role: 'verb' },
          { text: '생각도 못 해요', role: 'verb' },
        ],
        zh: '演唱会票太贵了，连买的想法都没有。',
        swapWords: ['생각도 못 해요', '엄두도 못 내요', '꿈도 못 꿔요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국 음식이', role: 'subject' },
          { text: '너무', role: 'plain' },
          { text: '그리워요', role: 'verb' },
        ],
        zh: '太想念韩国食物了。',
        swapWords: ['그리워요', '먹고 싶어요', '생각나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오랜만에', role: 'time' },
          { text: '고향 친구가', role: 'subject' },
          { text: '그리워졌어요', role: 'verb' },
        ],
        zh: '久违地开始想念家乡的朋友了。',
        swapWords: ['그리워졌어요', '보고 싶어졌어요', '생각났어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😔', context: '忙到极点', ko: '요즘 너무 바빠서 쉴 생각도 못 해요.', zh: '最近太忙了，连休息都不敢想。' },
      { icon: '💸', context: '经济压迫', ko: '물가가 너무 올라서 저축할 생각도 못 해요.', zh: '物价太涨了，连存钱都不敢想。' },
      { icon: '🏠', context: '思念家乡', ko: '고향이 너무 그리워요.', zh: '太思念家乡了。' },
      { icon: '👨‍👩‍👧', context: '思念家人', ko: '해외에 나와서 가족이 그리워요.', zh: '出来海外，思念家人。' },
      { icon: '🎵', context: 'KPOP', ko: '좋아하는 가수의 목소리가 그리워요.', zh: '想念喜欢的歌手的声音。' },
      { icon: '📚', context: '学习压力', ko: '시험 기간에는 잠잘 생각도 못 해요.', zh: '考试期间连睡觉都不敢想。' },
    ],
    mistakes: [
      { wrong: '그립어요.', correct: '그리워요.', note: '그립다 是 ㅂ 不规则，变形：그립다→그리워요（不是 그립어요）' },
      { wrong: '가족을 그리워요.', correct: '가족이 그리워요.', note: '그립다 前用主语助词 이/가，不是宾语助词 을/를' },
      { wrong: '갈 생각 못 해요.', correct: '갈 생각도 못 해요.', note: '固定句式必须加 도，강조"连……都"' },
      { wrong: '친구를 그립다.', correct: '친구가 그립다.', note: '그립다 是情感形容词，思念对象用 이/가，不能用 을/를' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p6-l11',
    partNumber: 6,
    lessonNumber: 11,
    title: '综合练习⑥',
    whatItDoes: '第六章综合练习',
    whatItDoesBody: '综合运用第六章 L01-L10 所学语法：\n意志承诺、推测感叹、柔和疑问、还没追问、计划询问、担心糟糕、表达看法、特殊日子、转述确认、担心能否、思念表达。',
    isPractice: true,
    structureNote: '这是第六章的总复习。\n第六章的主线是"表达更有温度"承诺、共情、看法、思念，让你从说事实升级到说感受和态度。\n做题时想想这些表达在和韩国朋友聊天时会出现在哪个时刻。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">第六章综合练习</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">承诺、推测、疑问、完成、感情表达——全部整合在一起。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">这章学了什么：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L01-L04</span> — 承诺（-을/ㄹ게요）、感叹（-겠군요）、柔和疑问（-나요?）、进度追问（아직/은요?）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L05-L07</span> — 担心后果（큰일이다）、彻底完成（버리다）、表达观点（-다고 생각하다）、描述日子（-는/은/ㄴ 날）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">L08-L10</span> — 礼貌确认（얼마라고 했지요?）、担心能否（-을지 걱정）、思念（이/가 그립다）</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">综合例句</div>
  <div style="margin-bottom:6px">걱정하지 마세요, 제가 도와줄게요.</div>
  <div style="color:#89756e;font-size:.9rem">不用担心，我来帮你。（L01 -을/ㄹ게요）</div>
</div>
<div class="reminder-box">综合练习会混合本章所有语法点出题。不确定时回到对应课次复习。</div>`,
    compareHtml: `<div class="card-title">第六章要点速览</div>
<div class="card-body">本章十节课涵盖承诺、感叹、疑问、完成和情感表达五大主题。每个语法点都有细微的使用限制——把这些限制记清楚，就能说出更地道的韩语。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-을/ㄹ게요 vs -겠군요</div><div style="font-size:14px;color:#89756e;margin-top:2px">承诺（我→你）vs 感叹共情（我感受你）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">도와줄게요 / 힘드셨겠군요</span><span style="font-size:14px;color:#5a4640">我来帮你 / 那时一定很辛苦吧</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">이/가 그립다 vs 그리워하다</div><div style="font-size:14px;color:#89756e;margin-top:2px">我思念 vs 第三者思念</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가족이 그리워요 / 그를 그리워해요</span><span style="font-size:14px;color:#5a4640">我想念家人 / 他思念那人</span></div></div>
  <div class="tok-row"><div class="tok t-v">-나요? vs -은/ㄴ가요?</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词柔和疑问 vs 形容词柔和疑问</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가나요? / 좋은가요?</span><span style="font-size:14px;color:#5a4640">要去吗？/ 好吗？</span></div></div>
  <div class="tok-row"><div class="tok t-v">-는/ㄴ다고 vs -다고 vs -(이)라고</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词 vs 形容词 vs 名词的 생각하다 接法</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">간다고 / 좋다고 / 학생이라고</span><span style="font-size:14px;color:#5a4640">三种词性三套形式</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">버리다 vs 고 나서</div><div style="font-size:15px;color:#5a4640">-아/어 버리다（彻底完成，带遗憾/后悔语气）vs -고 나서（完成后再做下一件事）：먹어 버렸어요（吃光了，有些遗憾）/ 먹고 나서 공부해요（吃完之后学习）。中文"吃完了"没有这种语气差别，韩语用词尾表达说话人的情绪。</div></div>
<div class="reminder-box">-을/ㄹ게요 主语只能是"我"；-나요? 接动词，형용사는 -은/ㄴ가요?；생각도 못 해요 中 도 不能省；그립다 思念对象用 이/가 不用 을/를。</div>`,
    compareLabel: '第六章要点速览',
    structures: [
      {
        ko: '-을/ㄹ게요 → -겠군요 → -나요? → 아직 → -고 나서',
        zh: '承诺→推测→疑问→仍然→完成后',
        tokens: [
          { text: '-을/ㄹ게요', role: 'plain' },
          { text: '-겠군요', role: 'plain' },
          { text: '-나요?', role: 'plain' },
        ],
      },
      {
        ko: '-(으)면 큰일이다 → -아/어 버리다 → -다고 생각하다',
        zh: '麻烦了→彻底完成→认为',
        tokens: [
          { text: '-(으)면 큰일이다', role: 'plain' },
          { text: '-아/어 버리다', role: 'plain' },
          { text: '-다고 생각하다', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'L01：-을/ㄹ게요（意志承诺，主语=我）/ -겠군요（推测感叹）/ -았/었겠군요（过去推测）' },
      { type: 'rule', text: 'L02：-나요?/-은/ㄴ가요?（柔和疑问）/ -ㅂ니다만/습니다만（正式转折）' },
      { type: 'rule', text: 'L03：아직 + 부정（还没）/ 은요/는요（那……呢？）' },
      { type: 'rule', text: 'L04：-을/ㄹ 건가요?（询问计划）/ -고 나서（完成后）' },
      { type: 'rule', text: 'L05：-(으)면 큰일이다（麻烦了）/ -아/어/여 버리다（彻底完成/遗憾）' },
      { type: 'rule', text: 'L06：-는/ㄴ다고/-다고/-(이)라고 생각하다（认为……）' },
      { type: 'rule', text: 'L07：-는/은/ㄴ 날（……的日子）' },
      { type: 'rule', text: 'L08：얼마/누구/어디/언제/뭐 + -(이)라고 하다（……来着？）/ 사정이 있다（有事）' },
      { type: 'rule', text: 'L09：-을/ㄹ 수 있을지 걱정이다（担心能否）/ -은/ㄴ 지 얼마 안 되다（没多久）' },
      { type: 'rule', text: 'L10：-을/ㄹ 생각도 못 하다（连想都不敢想）/ 이/가 그립다（思念）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '먼저', role: 'plain' },
          { text: '확인할게요', role: 'verb' },
        ],
        zh: '我先确认一下。',
        swapWords: ['확인할게요', '연락할게요', '준비할게요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시험을', role: 'object' },
          { text: '못 보면', role: 'verb' },
          { text: '큰일이에요', role: 'verb' },
        ],
        zh: '要是考不了试就麻烦了。',
        swapWords: ['큰일이에요', '정말 큰일이에요', '안 되겠어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가족이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '그리워요', role: 'verb' },
        ],
        zh: '真的很想念家人。',
        swapWords: ['그리워요', '보고 싶어요', '생각나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '잘할 수 있을지', role: 'verb' },
          { text: '걱정이에요', role: 'verb' },
        ],
        zh: '担心能不能把韩语学好。',
        swapWords: ['걱정이에요', '자신이 없어요', '모르겠어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🤝', context: '承诺帮忙', ko: '걱정하지 마세요, 제가 도와드릴게요.', zh: '不用担心，我来帮你。' },
      { icon: '😮', context: '推测感叹', ko: '정말 힘드셨겠군요.', zh: '您一定很辛苦吧。' },
      { icon: '📅', context: '特殊日子', ko: '오늘은 처음 한국어를 배운 날이에요.', zh: '今天是第一次学韩语的日子。' },
      { icon: '🏠', context: '思念', ko: '고향 음식이 너무 그리워요.', zh: '太想念家乡食物了。' },
      { icon: '😟', context: '担心', ko: '발표를 잘할 수 있을지 걱정이에요.', zh: '担心能不能把发表做好。' },
      { icon: '💬', context: '表达想法', ko: '이 노래가 정말 좋다고 생각해요.', zh: '我觉得这首歌真的很好。' },
    ],
    mistakes: [
      { wrong: '손창 씨가 갈게요.', correct: '손창 씨가 갈 거예요.', note: 'L01：-을/ㄹ게요 只能第一人称主语' },
      { wrong: '좋은다고 생각해요.', correct: '좋다고 생각해요.', note: 'L06：形容词直接接 -다고，不加 는/ㄴ' },
      { wrong: '그립어요.', correct: '그리워요.', note: 'L10：그립다 是 ㅂ 不规则，→ 그리워요' },
      { wrong: '아직 갔어요.', correct: '아직 안 갔어요.', note: 'L03：아직 通常与否定搭配，表示"还没"' },
    ],
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 6 部分 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑥</div>
    <div class="ov-hero-sub">承诺 · 推测 · 疑问 · 思念 · 完成</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本章核心语法</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-을/ㄹ게요</span> 承诺（我来做）/ <span style="font-weight:700;color:#ff7fa8">-겠군요</span> 推测感叹</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-나요?/-은/ㄴ가요?</span> 柔和疑问 / <span style="font-weight:700;color:#2db89b">아직</span> 还没</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">-다고 생각하다</span> 表达看法 / <span style="font-weight:700;color:#6b7ff0">이/가 그립다</span> 思念</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">제가 도와줄게요</span></div><div class="struct-zh">我来帮你。（承诺）</div></div>
        <div><div class="tok-row"><span class="tok t-v">힘드셨겠군요</span></div><div class="struct-zh">您一定很辛苦吧。（推测感叹）</div></div>
        <div><div class="tok-row"><span class="tok t-s">가족이</span><span class="tok t-v">그리워요</span></div><div class="struct-zh">想念家人。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">손창 씨가 갈게요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 거예요（-을/ㄹ게요 只能第一人称）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">그립어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">그리워요（그립다 是 ㅂ 不规则）</span></div></div>
    </div>
  </div>
</div>`,
  },
];
