import type { GrammarCard } from '@/types';

export const grammarCardsP2: GrammarCard[] = [
  {
    id: 'card-p2-l01',
    partNumber: 2,
    lessonNumber: 1,
    title: '에 가다, 와/과, 하고',
    whatItDoes: '说去哪里、和谁一起',
    whatItDoesBody: '两个核心：\n说目的地用 에 가요，说"和……一起"用 와/과 或 하고。\n中文的"去"和"和"是两个独立的词，韩语用助词直接贴在名词后面，不需要单独的动词。',
    structureNote: '这节课有两个句型：\n去哪里（에 가요）和和谁一起（와/과/하고）。\n先看清楚各自在句子里的位置。',
    rulesNote: '와/과 的选择只看一件事：\n前面名词最后有没有收音。\n口语直接用하고，不用考虑收音，说起来更轻松。',
    scenarioNote: '约朋友、出行、购物是用这套语法最频繁的场景约朋友去哪里、买东西"和"什么都用得到。',
    structures: [
      {
        ko: '카페에 가요',
        zh: '去咖啡馆。',
        tokens: [
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '친구와 카페에 가요',
        zh: '和朋友去咖啡馆。',
        tokens: [
          { text: '친구와', role: 'subject' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '친구하고 커피를 마셔요',
        zh: '和朋友喝咖啡。',
        tokens: [
          { text: '친구하고', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '地点名词 + 에 가요/와요',          examples: '학교에 가요 / 카페에 와요 / 병원에 가요' },
      { type: 'rule',    text: '有收音名词 → 과',                  examples: '책과 / 선생님과 / 동생과' },
      { type: 'rule',    text: '无收音名词 → 와',                  examples: '친구와 / 엄마와 / 가수와' },
      { type: 'usage',   text: '하고 不区分有无收音，口语中更自然',  examples: '친구하고 / 선생님하고 / 동생하고' },
      { type: 'compare', text: '와/과 vs 하고',                    examples: '와/과=书面/正式；하고=口语/日常，语意相同' },
      { type: 'usage',   text: '하고/와/과 也可并列名词',           examples: '커피하고 빵을 사요 / 책과 연필을 사요' },
      { type: 'note',    text: '에 가요 vs 에서 가요',             examples: '目的地用 에 가요；에서 表示"在某地"，不表移动方向' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去学校。',
        swapWords: ['카페에', '회사에', '병원에', '도서관에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '친구하고', role: 'object' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '和朋友去咖啡店。',
        swapWords: ['엄마하고', '언니하고', '오빠하고'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피하고', role: 'object' },
          { text: '빵을', role: 'object' },
          { text: '사요', role: 'verb' },
        ],
        zh: '我买咖啡和面包。',
        swapWords: ['주스하고 과자를', '라면하고 김밥을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '친구와', role: 'object' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我和朋友一起学习韩语。',
        swapWords: ['선생님과', '언니와'],
        swapRole: 'object',
      },
    ],
    scenarios: [
      { icon: '☕', context: '邀请朋友', ko: '같이 카페에 가요?', zh: '一起去咖啡店吗？' },
      { icon: '🛒', context: '购物', ko: '커피하고 빵을 사요.', zh: '买咖啡和面包。' },
      { icon: '🎵', context: 'KPOP 聊天', ko: '오늘 친구하고 콘서트에 가요!', zh: '今天和朋友去演唱会！' },
      { icon: '📚', context: '学习打卡', ko: '오늘도 친구와 한국어를 공부했어요.', zh: '今天也和朋友学习了韩语。' },
      { icon: '🍜', context: '约吃饭', ko: '언니하고 한식집에 가요.', zh: '和姐姐去韩食餐厅。' },
      { icon: '🏥', context: '去医院', ko: '엄마와 병원에 가요.', zh: '和妈妈去医院。' },
    ],
    mistakes: [
      { wrong: '친구과 가요', correct: '친구와 가요', note: '친구 末尾无收音，选 와，不是 과。' },
      { wrong: '책와 가요', correct: '책과 가요', note: '책 末尾有收音 ㄱ，选 과，不是 와。' },
      { wrong: '학교에서 가요', correct: '학교에 가요', note: '去某地用 에 가요；에서 表示"在某地做动作"。' },
      { wrong: '친구와하고 가요', correct: '친구와 가요 / 친구하고 가요', note: '와/과 和 하고 二选一，不要叠用。' },
    ],
    linkedGrammarIds: ['g4', 'g12'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에 가다 · 와/과 · 하고</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">说「去哪里」和「和谁一起」，这节课两个句型一起掌握。</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">친구하고 카페에 가요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">和朋友去咖啡店。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">선생님과 공부해요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">和老师一起学习。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">주말에 한국에 가요!</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">周末去韩国！</div></div>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">两个核心句型</div>
    <div style="background:#f8f4f0;border-radius:12px;padding:14px;font-size:16px;line-height:2.2">
      <div><span style="background:#eaf8f5;color:#2db89b;padding:2px 10px;border-radius:6px;font-weight:700">① 去哪里</span>　地点 <b style="color:#ff7fa8">에</b> 가요 / 와요</div>
      <div><span style="background:#fff0f5;color:#ff7fa8;padding:2px 10px;border-radius:6px;font-weight:700">② 和谁一起</span>　人名 <b style="color:#ff7fa8">와/과/하고</b> + 动词</div>
    </div>
    <div style="margin-top:10px;font-size:16px;color:#89756e">两个句型组合起来：친구<b style="color:#ff7fa8">와</b> 카페<b style="color:#ff7fa8">에</b> 가요 ✓</div>
  </div>
  <div class="reminder-box">와/과/하고 都是「和」，不同的是语气：하고 是日常口语，와/과 是书面或中性语气，<b>意思完全相同</b>，选哪个都对。</div>`,
    compareHtml: `<div class="card-title">와/과 vs 하고</div>
  <div class="card-body">와/과 看收音选形式；하고 口语万能，不用选。</div>
  <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
    <div style="background:#fff0f5;border-radius:16px;padding:16px">
      <div style="font-size:11px;font-weight:800;color:#ff7fa8;margin-bottom:10px">有收音 → 과</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="tok-row"><span class="tok t-s">선생님</span><span style="color:#89756e">→</span><span class="tok t-v">선생님과</span></div>
        <div class="tok-row"><span class="tok t-s">책</span><span style="color:#89756e">→</span><span class="tok t-v">책과</span></div>
        <div class="tok-row"><span class="tok t-s">동생</span><span style="color:#89756e">→</span><span class="tok t-v">동생과</span></div>
      </div>
    </div>
    <div style="background:#eaf8f5;border-radius:16px;padding:16px">
      <div style="font-size:11px;font-weight:800;color:#2db89b;margin-bottom:10px">无收音 → 와</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="tok-row"><span class="tok t-s">친구</span><span style="color:#89756e">→</span><span class="tok t-v">친구와</span></div>
        <div class="tok-row"><span class="tok t-s">엄마</span><span style="color:#89756e">→</span><span class="tok t-v">엄마와</span></div>
        <div class="tok-row"><span class="tok t-s">가수</span><span style="color:#89756e">→</span><span class="tok t-v">가수와</span></div>
      </div>
    </div>
  </div>
  <div style="background:#f3eefb;border-radius:16px;padding:16px;margin-bottom:12px">
    <div style="font-size:11px;font-weight:800;color:#6b7ff0;margin-bottom:10px">하고 — 口语，不分收音</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div class="tok-row"><span class="tok t-s">친구</span><span style="color:#89756e">→</span><span class="tok t-v">친구하고</span></div>
      <div class="tok-row"><span class="tok t-s">선생님</span><span style="color:#89756e">→</span><span class="tok t-v">선생님하고</span></div>
    </div>
  </div>
  <div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">选哪个？</div><div style="font-size:16px;color:#5a4640">日常对话：用 하고，简单好记，无需看收音。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">书面/正式：用 와/과——看最后有无收音，无收音→와，有收音→과。</div></div>
<div class="reminder-box">와/과 和 하고 <span class="hl">意思完全相同</span>，只是语气不同。日常对话里 하고 最常用，不用担心选错。</div>`,
    compareLabel: '와/과 vs 하고',
    quickTable: {
      title: '와/과/하고 速记',
      headers: ['用法', '条件', '助词', '例子'],
      rows: [
        ['去某地', '场所名词', { ko: '에 가요', zh: '去（方向）' }, { ko: '학교에 가요', zh: '去学校' }],
        ['和…（书面）', { ko: '有收音', zh: '有收音' }, { ko: '과', zh: '书面"和"' }, { ko: '선생님과', zh: '和老师（书面）' }],
        ['和…（书面）', { ko: '无收音', zh: '无收音' }, { ko: '와', zh: '书面"和"' }, { ko: '친구와', zh: '和朋友（书面）' }],
        ['和…（口语）', '不限收音', { ko: '하고', zh: '口语"和"' }, { ko: '친구하고', zh: '和朋友（口语）' }],
        ['并列名词', '不限', { ko: 'A하고/와/과 B', zh: '名词并列' }, { ko: '커피하고 빵', zh: '咖啡和面包' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的助词',
      body: '根据有无收音，选 와 或 과；也可选口语 하고。',
      questions: [
        {
          pre: '친구',
          post: ' 카페에 가요.',
          options: ['과', '하고', '와'],
          answer: 2,
          explanation: '친구 末尾无收音 → 와',
        },
        {
          pre: '선생님',
          post: ' 도서관에 가요.',
          options: ['과', '와', '하고'],
          answer: 0,
          explanation: '선생님 末尾有收音 ㅁ → 과',
        },
        {
          pre: '책',
          post: ' 연필을 사요.',
          options: ['하고', '와', '과'],
          answer: 2,
          explanation: '책 末尾有收音 ㄱ → 과',
        },
        {
          pre: '엄마',
          post: ' 시장에 가요.',
          options: ['하고', '와', '과'],
          answer: 1,
          explanation: '엄마 末尾无收音 → 와',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第1课</span>
  <div class="ov-title">에 가다 · 와/과 · 하고</div>
  <div class="ov-sub">说去哪里、和谁一起的两个核心句型</div>
  <div class="ov-sec">
    <h3>① 去某地：地点 + 에 가요</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">
      <span class="tok t-p">학교에</span><span class="tok t-v">가요</span>
    </div>
    <div style="font-size:16px;color:#89756e;margin-top:6px">可替换：카페에 / 회사에 / 병원에 / 도서관에</div>
  </div>
  <div class="ov-sec">
    <h3>② 和……：와/과（书面）</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      有收音 → <b style="color:#ff7fa8">과</b>：선생님과, 동생과, 책과<br>
      无收音 → <b style="color:#2db89b">와</b>：친구와, 엄마와, 가수와
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 和……：하고（口语）</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      不分收音，直接加：친구하고 / 선생님하고<br>
      <span style="color:#89756e">와/과 是书面，하고 是口语，都正确</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 并列名词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      커피<b style="color:#ff7fa8">하고</b> 빵을 사요（买咖啡和面包）<br>
      책<b style="color:#ff7fa8">과</b> 연필을 사요（买书和铅笔）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      친구<span style="color:#e05555;text-decoration:line-through">과</span> → 친구<span style="color:#2db89b">와</span>（无收音）<br>
      선생님<span style="color:#e05555;text-decoration:line-through">와</span> → 선생님<span style="color:#ff7fa8">과</span>（有收音）<br>
      학교<span style="color:#e05555;text-decoration:line-through">에서</span> 가요 → 학교<span style="color:#2db89b">에</span> 가요（目的地用 에）
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第2课：이/가 있다/없다 ───────────────────────────
  {
    id: 'card-p2-l02',
    partNumber: 2,
    lessonNumber: 2,
    title: '이/가 있다/없다',
    whatItDoes: '说有没有、人在不在',
    whatItDoesBody: '있어요 表示"有"或"在"，없어요 表示"没有"或"不在"，主语用 이/가 标记。\n和中文不同韩语"有书"和"书在这里"用同一个句型，区别只在于有没有写出地点。',
    structureNote: '这节课有三种句型：\n说"有/没有"、说"在哪里"、说"某地有什么"。\n三种句型都围绕 있어요/없어요 这两个词，先看清楚地点词在不在句子里。',
    rulesNote: '이/가 的选择只看主语名词最后一个字有没有收音。\n有收音接 이，没有收音接 가。\n这和P1的은/는逻辑一样，只是助词功能不同。',
    scenarioNote: '있어요/없어요 在日常对话里出现频率极高找东西、约时间、描述房间、拒绝邀请，全都用得到。\n学会这一课，韩语日常对话能覆盖80%的"有没有"场景。',
    structures: [
      {
        ko: '책이 있어요',
        zh: '有书。',
        tokens: [
          { text: '책이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 없어요',
        zh: '没时间。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
      },
      {
        ko: '책상 위에 책이 있어요',
        zh: '桌上有书。',
        tokens: [
          { text: '책상 위에', role: 'place' },
          { text: '책이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '有收音名词 → 이',                  examples: '책이 / 시간이 / 밥이 / 돈이' },
      { type: 'rule',    text: '无收音名词 → 가',                  examples: '커피가 / 친구가 / 의자가 / 고양이가' },
      { type: 'usage',   text: '있어요 = 有 或 在（看有无地点）',   examples: '책이 있어요（有书）/ 카페에 있어요（在咖啡店）' },
      { type: 'usage',   text: '없어요 = 没有 或 不在',            examples: '시간이 없어요 / 지금 집에 없어요' },
      { type: 'usage',   text: '某地有…：地点+에 + 名词 + 이/가 있어요', examples: '책상 위에 책이 있어요' },
      { type: 'vocab',   text: '常用位置词',                       examples: '위(上)·아래(下)·앞(前)·뒤(后)·안(里)·밖(外)·옆(旁)' },
      { type: 'note',    text: '있다/없다 的主语必须加 이/가，不可省略', examples: '친구 있어요 ✗ → 친구가 있어요 ✓' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '有时间。',
        swapRole: 'subject',
          swapWords: ['돈이', '친구가', '책이'],
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '시간이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '今天没有时间。',
        swapRole: 'subject',
          swapWords: ['내일은', '지금은'],
      },
      {
        wordBlocks: [
          { text: '가방 안에', role: 'place' },
          { text: '휴대폰이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '包里有手机。',
        swapRole: 'subject',
          swapWords: ['지갑이', '책이', '열쇠가'],
      },
      {
        wordBlocks: [
          { text: '카페에', role: 'place' },
          { text: '친구가', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '咖啡店里有朋友（朋友在咖啡店）。',
        swapWords: ['학교에', '집에', '도서관에'],

        swapRole: 'place',
      },
    ],
    scenarios: [
      { icon: '📱', context: '找东西', ko: '제 휴대폰이 어디에 있어요?', zh: '我的手机在哪里？' },
      { icon: '⏰', context: '约时间', ko: '내일 시간이 있어요? 같이 카페에 가요!', zh: '明天有时间吗？一起去咖啡店！' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래가 진짜 좋아요. 지금 제 플레이리스트에 있어요.', zh: '这首歌真的很好，现在在我的播放列表里。' },
      { icon: '🏠', context: '描述房间', ko: '책상 위에 책하고 커피가 있어요.', zh: '桌子上有书和咖啡。' },
      { icon: '🙅', context: '拒绝邀请', ko: '미안해요, 오늘 시간이 없어요.', zh: '抱歉，今天没有时间。' },
      { icon: '🛍️', context: '便利店', ko: '이 편의점에 ATM이 있어요?', zh: '这家便利店有ATM吗？' },
    ],
    mistakes: [
      { wrong: '커피이 있어요', correct: '커피가 있어요', note: '커피 末尾无收音，选 가，不是 이。' },
      { wrong: '책가 있어요', correct: '책이 있어요', note: '책 末尾有收音 ㄱ，选 이，不是 가。' },
      { wrong: '카페에서 있어요', correct: '카페에 있어요', note: '存在/所在用 에 있어요，에서 表示"在某地做某动作"。' },
      { wrong: '친구 있어요', correct: '친구가 있어요', note: '있다/없다 的主语必须加 이/가，不能省略。' },
    ],
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 2 课 · 已完成</div>
    <div class="ov-hero-title">이/가 있다/없다</div>
    <div class="ov-hero-sub">이/가 必须带 · 有无存在 · 위치 표현</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">있다/없다 的主语必须加 이/가</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px"><span class="pill p-s">친구가</span><span class="pill p-v">있어요</span></div>
      <div style="font-size:16px;color:#89756e">有朋友。— 이/가 不可省略</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-s">책이</span><span class="tok t-p">책상 위에</span><span class="tok t-v">있어요</span></div><div class="struct-zh">书在桌子上。</div></div>
        <div><div class="tok-row"><span class="tok t-s">고양이가</span><span class="tok t-p">소파 아래에</span><span class="tok t-v">없어요</span></div><div class="struct-zh">猫不在沙发下面。</div></div>
        <div><div class="tok-row"><span class="tok t-s">시간이</span><span class="tok t-v">있어요?</span></div><div class="struct-zh">有时间吗？</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구가 있어요（이/가 不可省）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">책상에 책이 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">책상 위에 책이 있어요（加 위 更准确）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g2', 'g4'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">이/가 있다 · 없다</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">「有/没有」「在/不在」——韩语用同一个词，关键看句子里有没有地点。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">책이 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">有书。（有/没有）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">휴대폰이 가방 안에 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">手机在包里。（在某地）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">책상 위에 책이 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">桌上有书。（某地有……）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">三种核心句型</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">① 有/没有</span>　名词+이/가 있어요 / 없어요</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">② 在某地</span>　名词+이/가 + 地点+에 있어요</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">③ 某地有</span>　地点+에 + 名词+이/가 있어요</div>
  </div>
  <div style="font-size:16px;color:#5a4640;margin-top:8px;line-height:1.7">중요：有/在/存在，韩语全用 있어요——靠有没有地点来区分"有"和"在"。</div>
</div>
<div class="reminder-box">이/가 的选择只看名词末字有没有收音：有收音 → 이，无收音 → 가。</div>`,
    compareHtml: `<div class="card-title">이 vs 가 — 主格助词选择</div>
<div class="card-body">只看名词最后一个字：有收音接 이，无收音接 가。和 이/가 是话题助词 은/는 的逻辑完全一样。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">有收音 → 이</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">책<b style="color:#ff7fa8">이</b></span><span style="font-size:16px;color:#89756e">书</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">시간<b style="color:#ff7fa8">이</b></span><span style="font-size:16px;color:#89756e">时间</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">돈<b style="color:#ff7fa8">이</b></span><span style="font-size:16px;color:#89756e">钱</span></div>
    <div class="tok-row"><span class="tok t-s">가방<b style="color:#ff7fa8">이</b></span><span style="font-size:16px;color:#89756e">包</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">无收音 → 가</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">친구<b style="color:#2db89b">가</b></span><span style="font-size:16px;color:#89756e">朋友</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">의자<b style="color:#2db89b">가</b></span><span style="font-size:16px;color:#89756e">椅子</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">커피<b style="color:#2db89b">가</b></span><span style="font-size:16px;color:#89756e">咖啡</span></div>
    <div class="tok-row"><span class="tok t-s">고양이<b style="color:#2db89b">가</b></span><span style="font-size:16px;color:#89756e">猫</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">常用位置词（+ 에）</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px">
    <span class="chip p">위（上）</span><span class="chip p">아래（下）</span><span class="chip p">앞（前）</span>
    <span class="chip p">뒤（后）</span><span class="chip p">안（里）</span><span class="chip p">밖（外）</span><span class="chip p">옆（旁）</span>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">이/가 vs 은/는</div><div style="font-size:16px;color:#5a4640">은/는 强调话题（我嘛……），이/가 强调主体或引入新信息。两者都能做主语助词，但感觉不同。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">초보자는 모음만 보면 됩니다 → 다음에 있다/없다가 오면 이/가를 씁니다。</div></div>
<div class="reminder-box">있다/없다 的主语必须加 이/가，不可省略：친구 있어요 ✗ → 친구가 있어요 ✓</div>`,
    compareLabel: '이 vs 가',
    quickTable: {
      title: '이/가 있다/없다 速记',
      headers: ['用法', '结构', '例子'],
      rows: [
        ['有……', { ko: '명사 + 이/가 있어요', zh: '名词+主格+有' }, { ko: '책이 있어요', zh: '有书' }],
        ['没有……', { ko: '명사 + 이/가 없어요', zh: '名词+主格+没有' }, { ko: '시간이 없어요', zh: '没时间' }],
        ['在某地', { ko: '명사 + 이/가 + 장소에 있어요', zh: '名词+主格+地点+在' }, { ko: '휴대폰이 가방 안에 있어요', zh: '手机在包里' }],
        ['某地有……', { ko: '장소에 + 명사 + 이/가 있어요', zh: '地点+名词+主格+有' }, { ko: '책상 위에 책이 있어요', zh: '桌上有书' }],
        [{ ko: '有收音', zh: '有收音' }, '+ 이', { ko: '책이, 시간이', zh: '书/时间+이' }],
        [{ ko: '无收音', zh: '无收音' }, '+ 가', { ko: '친구가, 커피가', zh: '朋友/咖啡+가' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的助词',
      body: '根据有无收音，选 이 或 가。',
      questions: [
        {
          pre: '책',
          post: ' 있어요.',
          options: ['가', '은', '이'],
          answer: 2,
          explanation: '책 有收音 ㄱ → 이',
        },
        {
          pre: '커피',
          post: ' 없어요.',
          options: ['는', '가', '이'],
          answer: 1,
          explanation: '커피 无收音 → 가',
        },
        {
          pre: '친구',
          post: ' 카페에 있어요.',
          options: ['가', '를', '이'],
          answer: 0,
          explanation: '친구 无收音 → 가',
        },
        {
          pre: '시간',
          post: ' 없어요?',
          options: ['도', '가', '이'],
          answer: 2,
          explanation: '시간 有收音 ㄴ → 이',
        },
      ],
    },
  },

  // ── 第二章 第3课：-ㅂ시다/읍시다, -(으)세요 ─────────────────
  {
    id: 'card-p2-l03',
    partNumber: 2,
    lessonNumber: 3,
    title: '-ㅂ시다/읍시다, -(으)세요',
    whatItDoes: '邀请别人一起做，或礼貌请求',
    whatItDoesBody: '-ㅂ시다/읍시다 是"我们一起……吧"，-(으)세요 是礼貌地请对方做某事。\n和中文类比：\nㅂ시다 ≈"咱们……吧"（说话人也参与），세요 ≈"请您……"（只请对方做）。',
    structureNote: '这节课有两套词尾：\nㅂ시다/읍시다 用来发出邀请，(으)세요 用来礼貌请求。\n两套词尾都要变形，先看清楚哪个场景用哪套。',
    rulesNote: '变形规则和之前一样，只看词干最后有没有收音：\n无收音接 -ㅂ시다/-세요，有收音接 -읍시다/-으세요。\n例外是 ㄹ 词干：\nㄹ 直接脱落再接 -ㅂ시다（알다→압시다）。',
    scenarioNote: '세요 在餐厅、课堂、服务业随处可见"请坐""请看"；\nㅂ시다 则是约朋友"一起去吧""一起学吧"。\n这两个词尾能让你的韩语立刻听起来更有礼貌。',
    structures: [
      {
        ko: '같이 갑시다',
        zh: '一起走吧。',
        tokens: [
          { text: '같이', role: 'place' },
          { text: '갑시다', role: 'verb' },
        ],
      },
      {
        ko: '앉으세요',
        zh: '请坐。',
        tokens: [
          { text: '앉으세요', role: 'verb' },
        ],
      },
      {
        ko: '여기를 보세요',
        zh: '请看这里。',
        tokens: [
          { text: '여기를', role: 'object' },
          { text: '보세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干无收音 → -ㅂ시다',            examples: '가다→갑시다 / 하다→합시다 / 보다→봅시다' },
      { type: 'rule',    text: '词干有收音 → -읍시다',            examples: '먹다→먹읍시다 / 앉다→앉읍시다 / 읽다→읽읍시다' },
      { type: 'rule',    text: '词干无收音 → -세요',              examples: '가다→가세요 / 하다→하세요 / 보다→보세요' },
      { type: 'rule',    text: '词干有收音 → -으세요',            examples: '먹다→먹으세요 / 앉다→앉으세요 / 읽다→읽으세요' },
      { type: 'compare', text: '-ㅂ시다 vs -(으)세요',           examples: 'ㅂ시다=说话人也参与（一起）；세요=只请对方做' },
      { type: 'usage',   text: '-(으)십시오 最正式，用于广播/告示', examples: '안전벨트를 착용하십시오 / 기다리십시오' },
      { type: 'note',    text: 'ㄹ 词干：ㄹ 脱落后接 -ㅂ시다',   examples: '알다→압시다 / 만들다→만듭시다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '공부합시다', role: 'verb' },
        ],
        zh: '一起学习吧。',
        swapWords: ['먹읍시다', '봅시다'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이쪽으로', role: 'place' },
          { text: '오세요', role: 'verb' },
        ],
        zh: '请往这边来。',
        swapWords: ['앉으세요', '보세요', '들어오세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '천천히', role: 'plain' },
          { text: '말씀해', role: 'plain' },
          { text: '주세요', role: 'verb' },
        ],
        zh: '请说慢一点。',
        swapWords: ['크게 말해 주세요', '다시 말씀해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '여기에', role: 'place' },
          { text: '이름을', role: 'object' },
          { text: '써 주세요', role: 'verb' },
        ],
        zh: '请在这里写上名字。',
        swapWords: ['번호를 써 주세요', '서명해 주세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习邀请', ko: '같이 한국어 공부합시다!', zh: '我们一起学韩语吧！' },
      { icon: '🍽️', context: '餐厅', ko: '이쪽으로 앉으세요.', zh: '请坐这边。' },
      { icon: '🎤', context: 'KPOP 跟唱', ko: '같이 따라 불러 봅시다!', zh: '我们一起跟着唱吧！' },
      { icon: '📢', context: '广播提示', ko: '안전벨트를 착용하십시오.', zh: '请系好安全带。' },
      { icon: '🗣️', context: '课堂', ko: '따라 하세요. 안녕하세요!', zh: '请跟我说。你好！' },
      { icon: '🏃', context: '运动约定', ko: '내일 아침에 같이 운동합시다!', zh: '明天早上一起运动吧！' },
    ],
    mistakes: [
      { wrong: '가읍시다', correct: '갑시다', note: '가 词干无收音，用 -ㅂ시다，不是 읍시다。' },
      { wrong: '먹세요', correct: '먹으세요', note: '먹 词干有收音，要加 으，用 먹으세요。' },
      { wrong: '앉세요', correct: '앉으세요', note: '앉 有复合收音 ㄵ，要加 으，用 앉으세요。' },
      { wrong: '같이 가세요（邀一起去）', correct: '같이 갑시다', note: '가세요 是请对方去，갑시다 是"我们一起去"。语气不同。' },
    ],
    linkedGrammarIds: ['g56', 'g58'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-ㅂ시다/읍시다 · -(으)세요</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">邀请对方一起做 vs 礼貌请对方做——两种词尾，语气完全不同。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">같이 공부합시다!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我们一起学习吧！（说话人也参与）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">앉으세요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">请坐。（礼貌请对方做）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">천천히 말씀해 주세요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">请说慢一点。（请求帮忙）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两套词尾的核心区别</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-ㅂ시다/읍시다</span>　说话人也参与 → "咱们一起……吧"</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-(으)세요</span>　　　只请对方做 → "请您……"</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">-(으)십시오</span>　正式场合专用 → 广播/告示</div>
  </div>
  <div style="font-size:16px;color:#5a4640;margin-top:8px;line-height:1.7">变形规则：看词干末字有无收音——无收音接 -ㅂ시다/-세요，有收音接 -읍시다/-으세요。</div>
</div>
<div class="reminder-box">ㅂ시다 说"我们一起去"，세요 说"请您去"——说话人参不参与是关键区别。</div>`,
    compareHtml: `<div class="card-title">-ㅂ시다/읍시다 vs -(으)세요</div>
<div class="card-body">词干末字有无收音决定接哪个形式。口诀：无收音短，有收音加 으。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">无收音 → -ㅂ시다 / -세요</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">갑시다</span><span style="font-size:16px;color:#89756e">走吧（가다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">봅시다</span><span style="font-size:16px;color:#89756e">看吧（보다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">가세요</span><span style="font-size:16px;color:#89756e">请去（가다）</span></div>
    <div class="tok-row"><span class="tok t-v">보세요</span><span style="font-size:16px;color:#89756e">请看（보다）</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">有收音 → -읍시다 / -으세요</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹읍시다</span><span style="font-size:16px;color:#89756e">吃吧（먹다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">읽읍시다</span><span style="font-size:16px;color:#89756e">读吧（읽다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹으세요</span><span style="font-size:16px;color:#89756e">请吃（먹다）</span></div>
    <div class="tok-row"><span class="tok t-v">앉으세요</span><span style="font-size:16px;color:#89756e">请坐（앉다）</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">ㄹ词干特例：ㄹ脱落后接 -ㅂ시다</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">압시다</span><span style="font-size:16px;color:#89756e">知道吧（알다 → ㄹ脱落）</span></div>
  <div class="tok-row"><span class="tok t-v">만듭시다</span><span style="font-size:16px;color:#89756e">做吧（만들다 → ㄹ脱落）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">이/가 与指示词位置</div><div style="font-size:16px;color:#5a4640">이/그/저 在名词前，이/가 在名词后。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">이 책이 좋아요 → 이（指示词）在前，이（助词）在后，看位置区分。</div></div>
<div class="reminder-box">갑시다（我们一起去）≠ 가세요（请您去）——搞混会造成语气误会。</div>`,
    compareLabel: '一起 vs 请您 vs 正式请',
    quickTable: {
      title: '接续规则速记',
      headers: ['语尾', '无收音词干', '有收音词干', '例子'],
      rows: [
        [{ ko: '-ㅂ시다/읍시다', zh: '一起做吧（提议）' }, { ko: '+ ㅂ시다', zh: '无收音+ㅂ시다' }, { ko: '+ 읍시다', zh: '有收音+읍시다' }, { ko: '갑시다 / 먹읍시다', zh: '走吧/吃吧' }],
        [{ ko: '-(으)세요', zh: '请……（礼貌请求）' }, { ko: '+ 세요', zh: '无收音+세요' }, { ko: '+ 으세요', zh: '有收音+으세요' }, { ko: '가세요 / 앉으세요', zh: '请去/请坐' }],
        [{ ko: '-(으)십시오', zh: '请……（正式请求）' }, { ko: '+ 십시오', zh: '无收音+십시오' }, { ko: '+ 으십시오', zh: '有收音+으십시오' }, { ko: '가십시오 / 앉으십시오', zh: '请去/请坐（正式）' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的语尾形式',
      body: '根据动词词干有无收音，选择正确的 -(으)세요 形式。',
      questions: [
        {
          pre: '가다 →',
          post: '',
          options: ['갑시다', '가세요', '가으세요'],
          answer: 1,
          explanation: '가 词干无收音 → 直接加 세요',
        },
        {
          pre: '앉다 →',
          post: '',
          options: ['앉세요', '앉읍시다', '앉으세요'],
          answer: 2,
          explanation: '앉 词干有收音 ㄵ → 加 으세요',
        },
        {
          pre: '읽다 →',
          post: '',
          options: ['읽세요', '읽십시오', '읽으세요'],
          answer: 2,
          explanation: '읽 词干有收音 ㄺ → 加 으세요',
        },
        {
          pre: '기다리다 →',
          post: '',
          options: ['기다리세요', '기다립시다', '기다리으세요'],
          answer: 0,
          explanation: '기다리 词干无收音 → 直接加 세요',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第3课</span>
  <div class="ov-title">-ㅂ시다/읍시다 · -(으)세요 · -(으)십시오</div>
  <div class="ov-sub">三种常见"让别人做事"的表达，语气各有侧重</div>
  <div class="ov-sec">
    <h3>① 一起……吧：-ㅂ시다/읍시다</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">ㅂ시다</b>：갑시다, 봅시다, 공부합시다<br>
      받침 있는 → <b style="color:#ff7fa8">읍시다</b>：먹읍시다, 읽읍시다, 앉읍시다
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 请您……：-(으)세요</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#2db89b">세요</b>：가세요, 보세요, 기다리세요<br>
      받침 있는 → <b style="color:#2db89b">으세요</b>：먹으세요, 읽으세요, 앉으세요
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 请……（正式）：-(으)십시오</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#6b7ff0">십시오</b>：가십시오, 확인하십시오<br>
      받침 있는 → <b style="color:#6b7ff0">으십시오</b>：앉으십시오, 읽으십시오
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 语气区别</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      같이 갑시다 — 一起去吧（说话人也去）<br>
      가세요 — 请您去（只请对方）<br>
      가십시오 — 请走（正式/公告语气）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      앉<span style="color:#e05555;text-decoration:line-through">세요</span> → 앉<span style="color:#2db89b">으세요</span>（받침 있는 必须加 으）<br>
      가<span style="color:#e05555;text-decoration:line-through">읍시다</span> → <span style="color:#ff7fa8">갑시다</span>（받침 없는 用 ㅂ시다）<br>
      가세요（误当"一起去"）→ 같이 <span style="color:#ff7fa8">갑시다</span>（一起要用 ㅂ시다）
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第4课：数词，量词 ──────────────────────────────
  {
    id: 'card-p2-l04',
    partNumber: 2,
    lessonNumber: 4,
    title: '数词，量词',
    whatItDoes: '数东西、点餐、报人数',
    whatItDoesBody: '韩语数字有两套：\n固有数词（하나/둘…）配个/人/杯，汉字数词（일/이/삼…）配钱/日期/电话。\n中文只有一套数字，韩语有两套是因为历史上借用了汉字数词，但保留了固有词用于数实物。',
    structureNote: '这节课核心是"数字 + 量词"的搭配。\n先认识两套数字各自负责什么，再看量词放在数字后面的位置规律。',
    rulesNote: '搞清楚两件事：①固有数词 vs 汉字数词数实物用固有（개/명/잔），数钱/时间分钟/日期用汉字。\n②固有数词在量词前缩短：\n하나→한，둘→두，셋→세，넷→네，其余不变。',
    scenarioNote: '点餐、购物、订位是用数词最集中的场景。\n掌握"커피 한 잔 주세요"这一句型，就能在咖啡店、餐厅、便利店畅通无阻。',
    conceptCompare: {
      zh: '一杯咖啡 / 两个人 / 三本书',
      ko: '커피 한 잔 / 두 명 / 책 세 권',
      note: '数字放在量词前面，固有数词 하나→한, 둘→두, 셋→세, 넷→네（수량사 앞에서 时缩短）。',
    },
    structures: [
      {
        ko: '커피 한 잔 주세요',
        zh: '请给我一杯咖啡。',
        tokens: [
          { text: '커피', role: 'object' },
          { text: '한 잔', role: 'place' },
          { text: '주세요', role: 'verb' },
        ],
      },
      {
        ko: '두 명이에요',
        zh: '是两位。',
        tokens: [
          { text: '두 명이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'vocab',   text: '固有数词（配个/人/杯/本/瓶/张/动物）', examples: '하나·둘·셋·넷·다섯·여섯·일곱·여덟·아홉·열' },
      { type: 'rule',    text: '量词前固有数词缩短形式',                  examples: '하나→한 / 둘→두 / 셋→세 / 넷→네' },
      { type: 'vocab',   text: '常用量词',                             examples: '개(个)·명(人)·분(位)·잔(杯)·권(本)·병(瓶)·장(张)·마리(动物)' },
      { type: 'vocab',   text: '汉字数词（配钱/月/日/分钟/电话）',      examples: '일·이·삼·사·오·육·칠·팔·구·십' },
      { type: 'rule',    text: '시간: 시간(小时)用固有，분(分)用汉字',  examples: '두 시간(两小时) / 삼십 분(30分)' },
      { type: 'note',    text: '固有数词和汉字数词不能混用',             examples: '두 원 ✗ → 이 원 ✓ / 이 명 ✗ → 두 명 ✓' },
      { type: 'usage',   text: '点餐/购物常用句式：物品 + 数量 + 주세요', examples: '아메리카노 한 잔 주세요 / 이거 두 개 주세요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아메리카노', role: 'object' },
          { text: '한 잔', role: 'plain' },
          { text: '주세요', role: 'verb' },
        ],
        zh: '请给我一杯美式咖啡。',
        swapWords: ['두 잔', '세 잔'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '두 명', role: 'subject' },
          { text: '이에요', role: 'verb' },
        ],
        zh: '两位（两个人）。',
        swapRole: 'subject',
          swapWords: ['세 명', '네 명', '다섯 명'],
      },
      {
        wordBlocks: [
          { text: '책', role: 'object' },
          { text: '세 권', role: 'plain' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '有三本书。',
        swapWords: ['두 권', '한 권'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '오천', role: 'plain' },
          { text: '원이에요', role: 'verb' },
        ],
        zh: '五千韩元。',
        swapWords: ['삼천 원', '만 원'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店点单', ko: '아메리카노 두 잔이랑 라떼 한 잔 주세요.', zh: '请给我两杯美式和一杯拿铁。' },
      { icon: '🍽️', context: '餐厅订位', ko: '네 명이에요. 자리 있어요?', zh: '四个人，有位子吗？' },
      { icon: '🛒', context: '购物', ko: '이거 두 개 주세요. 얼마예요?', zh: '这个给我两个，多少钱？' },
      { icon: '📚', context: '说学了几个单词', ko: '오늘 단어 열 개 외웠어요!', zh: '今天背了十个单词！' },
      { icon: '🎵', context: 'KPOP 活动', ko: '콘서트 티켓 두 장 샀어요!', zh: '买了两张演唱会票！' },
      { icon: '🐱', context: '宠物', ko: '우리 집에 고양이 두 마리 있어요.', zh: '我家有两只猫。' },
    ],
    mistakes: [
      { wrong: '커피 하나 잔', correct: '커피 한 잔', note: '하나 在量词前缩短为 한，所以是 한 잔，不是 하나 잔。' },
      { wrong: '이 명이에요（想说两个人）', correct: '두 명이에요', note: '"人数"用固有数词 둘→두，不用汉字数词 이。' },
      { wrong: '삼 개（想说三个）', correct: '세 개', note: '个数用固有数词 셋→세，不用汉字数词 삼。' },
      { wrong: '두 원（想说两韩元）', correct: '이 원', note: '韩元(원)用汉字数词，두 원 × → 이 원 ✓。' },
    ],
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">数词 · 量词</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">韩语有两套数字系统，搞清楚谁配谁，点餐、购物、报人数全不怕。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">아메리카노 한 잔 주세요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">请给我一杯美式。（固有数词+量词）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">네 명이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">四个人。（人数用固有数词）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">오천 원이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">五千韩元。（价格用汉字数词）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两套数字系统一眼看清</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">固有数词</span>　하나·둘·셋·넷… → 量词前缩短：한·두·세·네</div>
    <div style="font-size:16px;color:#89756e;padding-left:8px">配：个(개)·人(명)·杯(잔)·本(권)·瓶(병)·张(장)·只(마리)</div>
    <div style="font-size:16px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#2db89b">汉字数词</span>　일·이·삼·사… → 不缩短，直接用</div>
    <div style="font-size:16px;color:#89756e;padding-left:8px">配：韩元(원)·月份(월)·日期(일)·分钟(분)·电话号码</div>
  </div>
</div>
<div class="reminder-box">하나/둘/셋/넷 接量词时必须缩短：한 잔 ✓，하나 잔 ✗。</div>`,
    compareHtml: `<div class="card-title">固有数词 vs 汉字数词</div>
<div class="card-body">两套系统各有分工，混用会让人听不懂。关键：数人/个/杯/本用固有，数钱/月/日/分用汉字。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">固有数词（量词前缩短）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">한 잔</span><span style="font-size:16px;color:#89756e">一杯</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">두 명</span><span style="font-size:16px;color:#89756e">两人</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">세 권</span><span style="font-size:16px;color:#89756e">三本</span></div>
    <div class="tok-row"><span class="tok t-s">네 개</span><span style="font-size:16px;color:#89756e">四个</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">汉字数词（不缩短）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">오천 원</span><span style="font-size:16px;color:#89756e">五千元</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">삼 월</span><span style="font-size:16px;color:#89756e">三月</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">십오 일</span><span style="font-size:16px;color:#89756e">十五号</span></div>
    <div class="tok-row"><span class="tok t-v">삼십 분</span><span style="font-size:16px;color:#89756e">三十分</span></div>
  </div>
</div>
<div style="background:#f8f4f0;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">시(点)用固有，분(分)用汉字</div>
  <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">두 시</span><span style="font-size:16px;color:#89756e">两点（固有）</span></div>
  <div class="tok-row"><span class="tok t-v">삼십 분</span><span style="font-size:16px;color:#89756e">三十分（汉字）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">记忆口诀</div><div style="font-size:16px;color:#5a4640">固有数词（하나/둘…）：数人、数量词、时钟「几点」。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">汉字数词（일/이/삼…）：钱、月份、日期、分钟、电话号码。</div></div>
<div class="reminder-box">두 원 ✗ → 이 원 ✓（韩元用汉字）　이 명 ✗ → 두 명 ✓（人数用固有）</div>`,
    compareLabel: '固有数词 vs 汉字数词',
    quickTable: {
      title: '常用量词速记',
      headers: ['量词', '用途', '固有数词例', '汉字数词例'],
      rows: [
        [{ ko: '개', zh: '个（通用量词）' }, '个（物品）', { ko: '한 개 / 두 개', zh: '一个/两个' }, '—'],
        [{ ko: '명 / 분', zh: '人/位（명=一般,분=敬语）' }, '人 / 位（敬语）', { ko: '두 명 / 세 분', zh: '两人/三位' }, '—'],
        [{ ko: '잔', zh: '杯（饮品量词）' }, '杯（饮品）', { ko: '한 잔 / 두 잔', zh: '一杯/两杯' }, '—'],
        [{ ko: '권', zh: '本（书本量词）' }, '本（书本）', { ko: '한 권 / 세 권', zh: '一本/三本' }, '—'],
        [{ ko: '병', zh: '瓶（瓶装量词）' }, '瓶', { ko: '두 병 / 세 병', zh: '两瓶/三瓶' }, '—'],
        [{ ko: '장', zh: '张（纸张量词）' }, '张（纸/票）', { ko: '한 장 / 두 장', zh: '一张/两张' }, '—'],
        [{ ko: '원', zh: '韩元（货币单位）' }, '韩元', '—', { ko: '천 원 / 오만 원', zh: '千元/五万元' }],
        [{ ko: '월', zh: '月份（序数）' }, '月份', '—', { ko: '일 월 / 삼 월', zh: '一月/三月' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的数词',
      body: '根据场景，选择固有数词还是汉字数词形式。',
      questions: [
        {
          pre: '커피 _____ 잔 주세요.',
          post: '',
          options: ['한', '일', '하나'],
          answer: 0,
          explanation: '杯数用固有数词，하나 在量词前缩短为 한',
        },
        {
          pre: '_____ 명이에요.',
          post: '（两个人）',
          options: ['이', '두', '둘'],
          answer: 1,
          explanation: '人数用固有数词，둘 在量词前缩短为 두',
        },
        {
          pre: '오천 _____ 이에요.',
          post: '（5000韩元）',
          options: ['개', '원', '잔'],
          answer: 1,
          explanation: '韩元用汉字数词 + 원',
        },
        {
          pre: '사과 _____ 개 주세요.',
          post: '（三个苹果）',
          options: ['삼', '셋', '세'],
          answer: 2,
          explanation: '个数用固有数词，셋 在量词前缩短为 세',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第4课</span>
  <div class="ov-title">数词 + 量词</div>
  <div class="ov-sub">两套数字系统，搭配不同量词，数人数物点餐购物</div>
  <div class="ov-sec">
    <h3>① 固有数词（1-10）</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      하나(한) 둘(두) 셋(세) 넷(네) 다섯<br>
      여섯 일곱 여덟 아홉 열<br>
      <span style="color:#89756e;font-size:16px">수량사 앞에서 时：하나→한, 둘→두, 셋→세, 넷→네</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 汉字数词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      일 이 삼 사 오 육 칠 팔 구 십<br>
      백(100) 천(1000) 만(10000)<br>
      <span style="color:#89756e;font-size:16px">用于：价格/원、月份/월、日期/일、分钟/분</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 常用量词搭配</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">한 잔</b> 咖啡一杯 &nbsp; <b style="color:#ff7fa8">두 명</b> 两个人<br>
      <b style="color:#ff7fa8">세 권</b> 三本书 &nbsp; <b style="color:#ff7fa8">네 개</b> 四个<br>
      <b style="color:#2db89b">오천 원</b> 5000韩元 &nbsp; <b style="color:#2db89b">삼 월</b> 3月
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      커피 <span style="color:#e05555;text-decoration:line-through">하나 잔</span> → <span style="color:#ff7fa8">한 잔</span>（수량사 앞에서 缩短）<br>
      <span style="color:#e05555;text-decoration:line-through">이 명</span>이에요 → <span style="color:#ff7fa8">두 명</span>이에요（人数用固有）<br>
      사과 <span style="color:#e05555;text-decoration:line-through">삼 개</span> → <span style="color:#ff7fa8">세 개</span>（个数用固有，셋→세）
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第5课：의, 도, 만 ──────────────────────────────
  {
    id: 'card-p2-l05',
    partNumber: 2,
    lessonNumber: 5,
    title: '의, 도, 만',
    whatItDoes: '说"的""也""只"',
    whatItDoesBody: '三个小助词各有一招：\n의 标所属，도 加"也"，만 限制"只有"。\n这三个助词都贴在名词后面，但功能完全不同，类似中文的"的/也/只"认准功能，用法就清楚了。',
    structureNote: '这节课三个助词各自独立，不需要接续变形。\n重点是搞清楚每个助词替换掉的是哪个位置：\n도 和 만 会把 은/는/이/가/을/를 替换掉。',
    rulesNote: '의 在口语里常省略（내 친구 比 나의 친구 更自然）；\n도 和 만 会吃掉前面的格助词，但 도/만 自己可以叠加（밥만도 싫어요 = 连饭也不想要），只是不能同时接在同一名词上。',
    scenarioNote: '도 在日常对话里频率极高"我也是""我也想去"，每次附和都用得到；\n만 用来强调"就这个/只有这个"，点餐、表白、设限都用得上。',
    structures: [
      {
        ko: '저의 친구',
        zh: '我的朋友。',
        tokens: [
          { text: '저의', role: 'subject' },
          { text: '친구', role: 'object' },
        ],
      },
      {
        ko: '저도 한국어를 공부해요',
        zh: '我也学韩语。',
        tokens: [
          { text: '저도', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '저는 커피만 마셔요',
        zh: '我只喝咖啡。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피만', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '의：名词A + 의 + 名词B = A的B',         examples: '친구의 책（朋友的书）/ 선생님의 이름（老师的名字）' },
      { type: 'usage',   text: '口语"我的"：저의→제（正式），나의→내（亲近）', examples: '제 가방 / 내 친구 / 우리 엄마' },
      { type: 'rule',    text: '도：替换 은/는/이/가/을/를，直接接名词后', examples: '저도 / 한국어도 / 커피도' },
      { type: 'usage',   text: '도 表示"也"，前后是类似或递进信息',      examples: '저도 좋아요 / 이것도 맛있어요' },
      { type: 'rule',    text: '만：接名词后，替换其他助词，表限定',       examples: '커피만 / 오늘만 / 나만 / 한 개만' },
      { type: 'compare', text: '도 vs 만',                              examples: '도=也（扩展）；만=只（限定）' },
      { type: 'note',    text: '도/만 不能同时用在同一名词上',            examples: '커피도만 ✗ → 커피만 ✓ / 커피도 ✓' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이게', role: 'subject' },
          { text: '제', role: 'plain' },
          { text: '친구의 책이에요', role: 'verb' },
        ],
        zh: '这是我朋友的书。',
        swapRole: 'plain',
          swapWords: ['언니의 가방', '선생님의 연필'],
      },
      {
        wordBlocks: [
          { text: '저도', role: 'subject' },
          { text: '이 노래', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '我也喜欢这首歌。',
        swapRole: 'subject',
          swapWords: ['이 드라마도', '한국어도'],
      },
      {
        wordBlocks: [
          { text: '오늘만', role: 'plain' },
          { text: '시간이', role: 'subject' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '只有今天有时间。',
        swapRole: 'subject',
          swapWords: ['내일만', '지금만'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피만', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我只喝咖啡。',
        swapRole: 'object',
          swapWords: ['물만', '주스만'],
      },
    ],
    scenarios: [
      { icon: '👤', context: '自我介绍', ko: '이건 제 친구의 사진이에요.', zh: '这是我朋友的照片。' },
      { icon: '🎵', context: 'KPOP 粉丝', ko: '저도 이 가수 팬이에요!', zh: '我也是这位歌手的粉丝！' },
      { icon: '☕', context: '点餐', ko: '저는 커피만 마셔요. 차는 별로예요.', zh: '我只喝咖啡，茶不太喜欢。' },
      { icon: '⏰', context: '时间限定', ko: '오늘만 특별 할인이에요!', zh: '只有今天是特别折扣！' },
      { icon: '📚', context: '学习打卡', ko: '오늘도 한국어 공부했어요!', zh: '今天也学习了韩语！' },
      { icon: '🏠', context: '家里', ko: '집에 물만 있어요. 장 보러 가야 해요.', zh: '家里只有水了，得去买菜。' },
    ],
    mistakes: [
      { wrong: '제의 친구예요', correct: '제 친구예요', note: '제 已包含 의 的意思，不要再加 의。저의→제 是自然缩合，口语多用 제，正式书写可用 저의。' },
      { wrong: '저는도 좋아해요', correct: '저도 좋아해요', note: '도 替换 은/는，不要叠用：저는도 × → 저도 ✓。' },
      { wrong: '커피를만 마셔요', correct: '커피만 마셔요', note: '만 替换 을/를，不要叠用：커피를만 × → 커피만 ✓。' },
      { wrong: '저만도 알아요', correct: '저만 알아요', note: '도 和 만 不同时用于同一成分，意思会混乱。' },
    ],
    linkedGrammarIds: ['g7', 'g6'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">의 · 도 · 만</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">三个小助词让句子更丰富：说"的"用 의，说"也"用 도，说"只"用 만。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">이건 제 친구의 사진이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这是我朋友的照片。（의=的）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">저도 이 가수 좋아해요!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我也喜欢这位歌手！（도=也）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">저는 커피만 마셔요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我只喝咖啡。（만=只）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">三个助词核心用法</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">의</span>　名词A + 의 + 名词B = "A的B"　（口语"我的"：저의→제）</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">도</span>　直接替换 은/는/이/가/을/를 → 表示"也"</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">만</span>　直接替换其他助词 → 表示"只、仅"</div>
  </div>
  <div style="font-size:16px;color:#5a4640;margin-top:8px;line-height:1.7">도 和 만 不能叠加在同一名词上：커피를만 ✗ → 커피만 ✓。</div>
</div>
<div class="reminder-box">도/만 替换助词，不叠加——저는도 ✗ → 저도 ✓，커피를만 ✗ → 커피만 ✓。</div>`,
    compareHtml: `<div class="card-title">도（也）vs 만（只）</div>
<div class="card-body">两个助词功能相反：도 追加同类信息，만 排除其他只留一个。都直接接名词，替换原有助词。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">도 — 也（追加）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">저도</span><span style="font-size:16px;color:#89756e">我也</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">한국어도</span><span style="font-size:16px;color:#89756e">韩语也</span></div>
    <div class="tok-row"><span class="tok t-o">이것도</span><span style="font-size:16px;color:#89756e">这个也</span></div>
  </div>
  <div style="background:#f0eef8;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">만 — 只（限定）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">커피만</span><span style="font-size:16px;color:#89756e">只咖啡</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">오늘만</span><span style="font-size:16px;color:#89756e">只今天</span></div>
    <div class="tok-row"><span class="tok t-s">나만</span><span style="font-size:16px;color:#89756e">只有我</span></div>
  </div>
</div>
<div style="background:#fff0f5;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">의 — 的（所属）</div>
  <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">친구의 책</span><span style="font-size:16px;color:#89756e">朋友的书</span></div>
  <div class="tok-row"><span class="tok t-s">제 가방</span><span style="font-size:16px;color:#89756e">我的包（저의→제）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">의 vs 도/만</div><div style="font-size:16px;color:#5a4640">의（的）可以省略：저의 가방 = 제 가방，日常口语多省略。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">도（也）/만（只）直接替换主格/宾格助词，不叠加：저도（我也）→ 저는도 ✗。</div></div>
<div class="reminder-box">저는도 ✗ → 저도 ✓　커피를만 ✗ → 커피만 ✓　도/만 直接替换，不叠加。</div>`,
    compareLabel: '도（也）vs 만（只）',
    quickTable: {
      title: '의·도·만 用法速记',
      headers: ['助词', '意思', '用法', '例子'],
      rows: [
        ['의', '……的……', '名词A + 의 + 名词B', '친구의 책（朋友的书）'],
        ['제/내', '我的', '저의→제（礼貌）', '제 이름（我的名字）'],
        ['도', '也', '替换 은/는/이/가/을/를', '저도 좋아요（我也喜欢）'],
        ['만', '只、只有', '替换其他助词', '커피만 마셔요（只喝咖啡）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的助词',
      body: '根据句意，选 의、도 或 만。',
      questions: [
        {
          pre: '이건 친구',
          post: ' 가방이에요.',
          options: ['의', '도', '만'],
          answer: 0,
          explanation: '表示所属"朋友的包"，用 의',
        },
        {
          pre: '저',
          post: ' 한국어 좋아해요.',
          options: ['의', '도', '만'],
          answer: 1,
          explanation: '表示"我也"，用 도 替换 는',
        },
        {
          pre: '오늘',
          post: ' 시간이 있어요.',
          options: ['의', '도', '만'],
          answer: 2,
          explanation: '表示"只有今天"有时间，用 만',
        },
        {
          pre: '저는 커피',
          post: ' 마셔요.',
          options: ['의', '도', '만'],
          answer: 2,
          explanation: '表示"只喝咖啡"，用 만 替换 를',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第5课</span>
  <div class="ov-title">의 · 도 · 만</div>
  <div class="ov-sub">三个高频小助词：的、也、只</div>
  <div class="ov-sec">
    <h3>① 의 — ……的……</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      친구<b style="color:#ff7fa8">의</b> 책（朋友的书）<br>
      선생님<b style="color:#ff7fa8">의</b> 가방（老师的包）<br>
      <span style="color:#89756e">저의→<b style="color:#ff7fa8">제</b>（我的，礼貌口语）&nbsp; 나의→<b style="color:#ff7fa8">내</b>（我的，亲近口语）</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 도 — 也</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      저<b style="color:#2db89b">도</b> 학생이에요（我也是学生）<br>
      한국어<b style="color:#2db89b">도</b> 재미있어요（韩语也有趣）<br>
      <span style="color:#89756e">도 直接替换 은/는/이/가/을/를，不叠用</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 만 — 只、只有</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      커피<b style="color:#6b7ff0">만</b> 마셔요（只喝咖啡）<br>
      오늘<b style="color:#6b7ff0">만</b> 시간이 있어요（只有今天有时间）<br>
      <span style="color:#89756e">만 直接替换其他助词，不叠用</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">저는도</span> → <span style="color:#2db89b">저도</span>（도 替换 는）<br>
      <span style="color:#e05555;text-decoration:line-through">커피를만</span> → <span style="color:#6b7ff0">커피만</span>（만 替换 를）<br>
      <span style="color:#e05555;text-decoration:line-through">저만도</span> → <span style="color:#6b7ff0">저만</span>（도 和 만 不同时用）
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第6课：안, -지 않다, 그리고, 그렇지만 ─────────────
  {
    id: 'card-p2-l06',
    partNumber: 2,
    lessonNumber: 6,
    title: '안, -지 않다, 그리고, 그렇지만',
    whatItDoes: '说"不"，再用"但是"连句',
    whatItDoesBody: '안 是最简单的否定，-지 않다 更完整；\n그리고 连接补充信息，그렇지만 连接转折。\n这节课把"否定"和"连词"合在一起，是因为你一旦能说否定句，就需要连词来组合前后信息了。\n中文"不去"直接在动词前加"不"，韩语 안 位置相同，但 하다 动词需拆开：\n공부 안 해요（不是 안 공부해요）。',
    structureNote: '这节课分两块：\n否定（안 / -지 않다）和连词（그리고 / 그렇지만）。\n先把否定的两种方式搞清楚，再看连词怎么把两句话串起来。',
    rulesNote: '否定有两条路：\n안 直接放动词前（口语快速否定）；\n-지 않아요 接词干（更完整，也更书面）。\n하다 动词特殊要说 공부 안 해요，不能说 안 공부해요。',
    scenarioNote: '能说"不"是日常对话的基础拒绝邀请、说饮食偏好、表达不喜欢，全靠否定句。\n加上 그렇지만（但是），就能表达"虽然……但是……"的转折，让表达更自然。',
    structures: [
      {
        ko: '안 가요',
        zh: '不去。',
        tokens: [
          { text: '안', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 어렵지 않아요',
        zh: '韩语不难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '안 + 动词/形容词（口语简短否定）',        examples: '안 가요 / 안 먹어요 / 안 좋아요' },
      { type: 'rule',    text: '하다 动词口语否定：名词 + 안 해요',       examples: '공부 안 해요 / 운동 안 해요（比 안 공부해요 更自然）' },
      { type: 'rule',    text: '词干 + -지 않아요（完整否定）',           examples: '가지 않아요 / 어렵지 않아요 / 공부하지 않아요' },
      { type: 'compare', text: '안 vs -지 않아요',                       examples: '안=口语简短；지 않아요=书面/正式，语气更完整' },
      { type: 'usage',   text: '그리고：连接顺接/补充（而且/然后）',      examples: 'A. 그리고 B. — 커피를 마셨어요. 그리고 빵도 먹었어요.' },
      { type: 'usage',   text: '그렇지만：连接转折（但是/不过）',         examples: 'A. 그렇지만 B. — 맛있어요. 그렇지만 비싸요.' },
      { type: 'note',    text: '그리고/그렇지만 放第二句句首，前句用 。结尾', examples: '커피 안 마셔요. 그리고 차도 안 마셔요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'plain' },
          { text: '학교에', role: 'place' },
          { text: '안 가요', role: 'verb' },
        ],
        zh: '今天不去学校。',
        swapWords: ['안 먹어요', '안 마셔요', '안 봐요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
        zh: '韩语不难。',
        swapWords: ['길지 않아요', '재미없지 않아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오늘', role: 'plain' },
          { text: '공부', role: 'plain' },
          { text: '안 해요', role: 'verb' },
        ],
        zh: '今天不学习。',
        swapWords: ['운동 안 해요', '전화 안 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 음식은', role: 'subject' },
          { text: '맵지 않아요', role: 'verb' },
        ],
        zh: '这道菜不辣。',
        swapWords: ['짜지 않아요', '달지 않아요', '어렵지 않아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🙅', context: '拒绝邀请', ko: '오늘은 시간이 없어요. 그렇지만 내일은 괜찮아요!', zh: '今天没有时间，但是明天可以！' },
      { icon: '☕', context: '饮食偏好', ko: '저는 커피를 안 마셔요. 차를 마셔요.', zh: '我不喝咖啡，喝茶。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래는 좋아요. 그렇지만 발음이 어려워요.', zh: '这首歌很好，但是发音很难。' },
      { icon: '📚', context: '学习打卡', ko: '오늘도 한국어를 공부했어요. 그리고 드라마를 봤어요.', zh: '今天也学习了韩语，而且看了电视剧。' },
      { icon: '🏃', context: '日程说明', ko: '오늘 운동 안 했어요. 내일은 꼭 할 거예요.', zh: '今天没有运动，明天一定会做。' },
      { icon: '🍽️', context: '餐厅点餐', ko: '저는 고기를 안 먹어요. 채소 요리 있어요?', zh: '我不吃肉，有蔬菜料理吗？' },
    ],
    mistakes: [
      { wrong: '안 공부해요（想说"不学习"，较生硬）', correct: '공부 안 해요', note: '하다 动词否定口语首选"名词 + 안 해요"，更自然。' },
      { wrong: '가다지 않아요', correct: '가지 않아요', note: '-지 않아요 接词干，가다 去掉 다 得 가，再加 지 않아요。' },
      { wrong: '그리고 전에 쉼표 필수（以为要加逗号）', correct: '그리고/그렇지만 自成句首', note: '그리고/그렇지만 在韩语中直接放句首，前句用 。结尾，不用中文里的逗号接法。' },
      { wrong: '이 노래는 좋아요. 그리고 어려워요.（转折用了顺接）', correct: '이 노래는 좋아요. 그렇지만 어려워요.', note: '前后有对比/转折时用 그렇지만，补充信息才用 그리고。' },
    ],
    linkedGrammarIds: ['g15'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">안 · -지 않다 · 그리고 · 그렇지만</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">说"不……"的两种方式，再把两句话连起来——否定+连词一起学效率翻倍。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">오늘은 학교에 안 가요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">今天不去学校。（안 简短否定）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">한국어는 어렵지 않아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">韩语不难。（-지 않아요 完整否定）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">맛있어요. 그렇지만 비싸요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好吃，但是贵。（그렇지만 转折）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">否定两条路，连词两选一</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">안</span>　直接放动词前 → 口语快速否定（하다动词：名词 + 안 해요）</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-지 않아요</span>　词干 + 지 않아요 → 完整否定，更正式</div>
    <div style="font-size:16px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">그리고</span>　连接补充/顺接　<span style="font-weight:700;color:#b49ccf">그렇지만</span>　连接转折</div>
  </div>
</div>
<div class="reminder-box">하다 动词否定口语首选：공부 안 해요（✓）比 안 공부해요 更自然。</div>`,
    compareHtml: `<div class="card-title">안 vs -지 않아요</div>
<div class="card-body">两种否定语义相同，区别在语气：안 是口语快速否定，-지 않아요 更完整正式。하다 动词有特殊口语规则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">안 — 口语简短</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">안 가요</span><span style="font-size:16px;color:#89756e">不去</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">안 먹어요</span><span style="font-size:16px;color:#89756e">不吃</span></div>
    <div class="tok-row"><span class="tok t-v">공부 안 해요</span><span style="font-size:16px;color:#89756e">不学习</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">-지 않아요 — 完整正式</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">가지 않아요</span><span style="font-size:16px;color:#89756e">不去</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹지 않아요</span><span style="font-size:16px;color:#89756e">不吃</span></div>
    <div class="tok-row"><span class="tok t-v">어렵지 않아요</span><span style="font-size:16px;color:#89756e">不难</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">连接词对比</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">그리고</span><span style="font-size:16px;color:#89756e">而且/然后（顺接补充）</span></div>
  <div class="tok-row"><span class="tok t-v">그렇지만</span><span style="font-size:16px;color:#89756e">但是/不过（转折对比）</span></div>
</div>
<div class="reminder-box">그리고/그렇지만 放第二句句首，前句用句号结尾：맛있어요. 그렇지만 비싸요.</div>`,
    compareLabel: '안 vs -지 않아요',
    quickTable: {
      title: '否定 + 连接 速记',
      headers: ['表达', '用法', '例句', '中文'],
      rows: [
        ['안 + 动/形', '口语否定', '안 가요', '不去'],
        ['名词 + 안 해요', '하다 动词否定', '공부 안 해요', '不学习'],
        ['词干 + 지 않아요', '完整否定', '가지 않아요', '不去'],
        ['그리고', '而且/然后', 'A. 그리고 B.', '顺接补充'],
        ['그렇지만', '但是/不过', 'A. 그렇지만 B.', '转折对比'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的否定或连接词',
      body: '根据句意选择正确的填入。',
      questions: [
        {
          pre: '저는 커피를',
          post: ' 마셔요.',
          options: ['그리고', '안', '지 않'],
          answer: 1,
          explanation: '口语否定，안 放动词前：커피를 안 마셔요',
        },
        {
          pre: '한국어는 어렵',
          post: ' 않아요.',
          options: ['그렇지만', '안', '지'],
          answer: 2,
          explanation: '词干 + 지 않아요，形容词 어렵다→어렵지 않아요',
        },
        {
          pre: '한국어를 공부해요.',
          post: ' 드라마도 봐요.',
          options: ['안', '그렇지만', '그리고'],
          answer: 2,
          explanation: '顺接补充信息，用 그리고',
        },
        {
          pre: '이 노래는 좋아요.',
          post: ' 발음이 어려워요.',
          options: ['그렇지만', '그리고', '안'],
          answer: 0,
          explanation: '前后有转折，用 그렇지만',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第6课</span>
  <div class="ov-title">안 · -지 않다 · 그리고 · 그렇지만</div>
  <div class="ov-sub">否定表达 + 句子连接，让表达更完整自然</div>
  <div class="ov-sec">
    <h3>① 안 — 口语否定</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">안</b> 가요（不去）&nbsp; <b style="color:#ff7fa8">안</b> 먹어요（不吃）<br>
      하다 동사：공부 <b style="color:#ff7fa8">안 해요</b>（不学习，比 안 공부해요 更自然）
    </div>
  </div>
  <div class="ov-sec">
    <h3>② -지 않아요 — 完整否定</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      가<b style="color:#2db89b">지 않아요</b>（不去）&nbsp; 먹<b style="color:#2db89b">지 않아요</b>（不吃）<br>
      어렵<b style="color:#2db89b">지 않아요</b>（不难）&nbsp; 좋아하<b style="color:#2db89b">지 않아요</b>（不喜欢）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 连接词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">그리고</b>：A. 그리고 B.（而且/然后，顺接补充）<br>
      <b style="color:#e8a87c">그렇지만</b>：A. 그렇지만 B.（但是，转折对比）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">안 공부해요</span> → 공부 <span style="color:#ff7fa8">안 해요</span>（하다 동사 口语）<br>
      <span style="color:#e05555;text-decoration:line-through">가다지 않아요</span> → 가<span style="color:#2db89b">지 않아요</span>（接词干）<br>
      转折误用 그리고 → 用 <span style="color:#e8a87c">그렇지만</span>
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第7课：이/가, 冠词 이, 그, 저 ────────────────────
  {
    id: 'card-p2-l07',
    partNumber: 2,
    lessonNumber: 7,
    title: '이/가, 冠词 이, 그, 저',
    whatItDoes: '指出"这个/那个"，标出主语',
    whatItDoesBody: '이/가 标记主语或引入新信息；\n이・그・저 是指示词，放名词前表示"这个/那个/远处那个"。\n注意：\n이/가 是P1已学过的主格助词，这节课重点是把它和指示词结合用，同时理解"引入新信息"这个功能。\n中文"这个/那个"不按距离三分，韩语的 이/그/저 严格区分说话人、听话人、两者皆远三种距离。',
    structureNote: '这节课两块内容：\n이/가 的进阶用法（强调和引入新信息）+ 指示词이/그/저的用法。\n指示词放名词前，이/가 放名词后，位置不同，功能不同。',
    rulesNote: '이/그/저 按距离区分：\n이=说话人附近，그=听话人附近或刚提到的事物，저=双方都远。\n口语里 이것/그것/저것 缩成 이거/그거/저거。\n이/가 的收音规则和P1完全一样。',
    scenarioNote: '指示词是购物、聊K-pop、看剧时最常用的表达"这首歌""那个演员""这个多少钱"。\n学完这节课之后，你能更精准地指着某人/某物说话。',
    structures: [
      {
        ko: '비가 와요',
        zh: '下雨了。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '와요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래가 좋아요',
        zh: '这首歌好。',
        tokens: [
          { text: '이 노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
      {
        ko: '저 가수가 누구예요?',
        zh: '那位歌手是谁？',
        tokens: [
          { text: '저 가수가', role: 'subject' },
          { text: '누구예요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '有收音名词 → 이',                          examples: '책이 / 시간이 / 사람이 / 음식이' },
      { type: 'rule',    text: '无收音名词 → 가',                          examples: '친구가 / 비가 / 의자가 / 고양이가' },
      { type: 'usage',   text: '이/가 用于：①引入新信息 ②强调 ③있다/없다 主语', examples: '비가 와요（新信息）/ 제가 했어요（强调）' },
      { type: 'usage',   text: '이（이+名词）：说话人和听话人附近',          examples: '이 사람 / 이 노래 / 이 음식' },
      { type: 'usage',   text: '그（그+名词）：听话人附近或刚提到的',        examples: '그 책 / 그 배우 / 그 드라마' },
      { type: 'usage',   text: '저（저+名词）：双方都距离较远的',            examples: '저 가수 / 저 건물 / 저 사람' },
      { type: 'note',    text: '이/그/저 + 것(거) = 이것/그것/저것，口语 이거/그거/저거', examples: '이거 얼마예요? / 그거 주세요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '와요', role: 'verb' },
        ],
        zh: '朋友来了。',
        swapRole: 'subject',
          swapWords: ['선생님이', '비가', '버스가'],
      },
      {
        wordBlocks: [
          { text: '이 노래가', role: 'subject' },
          { text: '너무 좋아요', role: 'verb' },
        ],
        zh: '这首歌太好了。',
        swapRole: 'subject',
          swapWords: ['이 드라마가', '이 가수가'],
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '누구예요?', role: 'verb' },
        ],
        zh: '那个人是谁？',
        swapRole: 'subject',
          swapWords: ['그 가수가', '저 사람이'],
      },
      {
        wordBlocks: [
          { text: '이거', role: 'subject' },
          { text: '얼마예요?', role: 'verb' },
        ],
        zh: '这个多少钱？',
        swapRole: 'subject',
          swapWords: ['그거', '저거'],
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래가 진짜 너무 좋아요!', zh: '这首歌真的太好了！' },
      { icon: '🌧️', context: '天气', ko: '비가 와요. 우산 있어요?', zh: '下雨了，有雨伞吗？' },
      { icon: '👔', context: '指认物品', ko: '저 가방이 제 거예요. 이거 아니에요.', zh: '那个包是我的，不是这个。' },
      { icon: '🛒', context: '购物', ko: '이거 얼마예요? 그거도 주세요.', zh: '这个多少钱？那个也给我。' },
      { icon: '📱', context: '分享内容', ko: '그 드라마 봤어요? 진짜 재미있어요!', zh: '看了那部剧吗？真的很有意思！' },
      { icon: '🍜', context: '餐厅点餐', ko: '저 음식이 뭐예요? 맛있어 보여요.', zh: '那道菜是什么？看起来很好吃。' },
    ],
    mistakes: [
      { wrong: '이/가와 이/그/저 혼동', correct: '이/가 是助词，이/그/저 是冠词', note: '이 사람이 中：前面的 이 是指示词，后面的 이 是主格助词。两者功能不同。' },
      { wrong: '친구이 와요', correct: '친구가 와요', note: '친구 末尾无收音，主格助词用 가，不是 이。' },
      { wrong: '책가 있어요', correct: '책이 있어요', note: '책 末尾有收音 ㄱ，主格助词用 이，不是 가。' },
      { wrong: '이거는 얼마예요（选 은/는）', correct: '이거 얼마예요? 或 이게 얼마예요?', note: '问价格时 이거/이게 更自然，이거는 有对比意味，一般不这么问。' },
    ],
    linkedGrammarIds: ['g2'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">이/가 · 이, 그, 저</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">主格助词 이/가 标出主语，指示词 이/그/저 指出"这个/那个"——两套工具合起来就能精准说人说物。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">이 노래가 진짜 너무 좋아요!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这首歌真的太好了！（이=这，가=主格）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">저 가수가 누구예요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那位歌手是谁？（저=远处那个）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">이거 얼마예요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这个多少钱？（이거=이것 口语形）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两套工具各有位置</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">이/가</span>　接名词<b>后</b>，标记主语　有收音→이，无收音→가</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">이/그/저</span>　接名词<b>前</b>，指示距离　이=近，그=中，저=远</div>
    <div style="font-size:16px;color:#5a4640;margin-top:4px">两者可以同时出现：이 노래<b>가</b> 좋아요（这首歌好）</div>
  </div>
</div>
<div class="reminder-box">이/가 是助词（名词后），이/그/저 是指示词（名词前）——同一个 이 出现两次功能不同。</div>`,
    compareHtml: `<div class="card-title">이/그/저 — 三级距离指示词</div>
<div class="card-body">按说话人和听话人的距离分三级。口语中 이것/그것/저것 缩成 이거/그거/저거，更常用。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:10px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:6px">이 — 近（我这边）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">이 사람</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">이 노래</span></div>
    <div class="tok-row"><span class="tok t-s">이거</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:10px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:6px">그 — 中（你那边）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-v">그 책</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-v">그 배우</span></div>
    <div class="tok-row"><span class="tok t-v">그거</span></div>
  </div>
  <div style="background:#f0eef8;border-radius:12px;padding:10px">
    <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:6px">저 — 远（双方都远）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-o">저 가수</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-o">저 건물</span></div>
    <div class="tok-row"><span class="tok t-o">저거</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">이/가 收音选择规则</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">책<b style="color:#ff7fa8">이</b></span><span style="font-size:16px;color:#89756e">有收音→이</span></div>
  <div class="tok-row"><span class="tok t-s">친구<b style="color:#2db89b">가</b></span><span style="font-size:16px;color:#89756e">无收音→가</span></div>
</div>
<div class="reminder-box">이 사람이 에서：前面 이 是指示词（这），后面 이 是主格助词——两个 이 功能完全不同。</div>`,
    compareLabel: '이/그/저 距离对比',
    quickTable: {
      title: '이/가 + 이/그/저 速记',
      headers: ['用法', '规则', '例子', '中文'],
      rows: [
        ['主格 이', { ko: '받침 있는 + 이', zh: '有尾音+이' }, { ko: '책이, 시간이', zh: '书/时间（主语）' }, '书/时间（作主语）'],
        ['主格 가', { ko: '받침 없는 + 가', zh: '无尾音+가' }, { ko: '친구가, 비가', zh: '朋友/雨（主语）' }, '朋友/雨（作主语）'],
        ['이 + 名词', '近处', { ko: '이 노래, 이 사람', zh: '这首歌，这个人' }, '这首歌，这个人'],
        ['그 + 名词', '中距/刚提到', { ko: '그 책, 그 배우', zh: '那本书，那位演员' }, '那本书，那位演员'],
        ['저 + 名词', '远处', { ko: '저 가수, 저 건물', zh: '那位歌手，那栋楼' }, '那位歌手，那栋楼'],
        ['이거/그거/저거', '指示代词口语', { ko: '이거 얼마예요?', zh: '这个多少钱？' }, '这个多少钱？'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的助词或指示词',
      body: '根据语境选择正确形式。',
      questions: [
        {
          pre: '친구',
          post: ' 와요.',
          options: ['이', '가', '의'],
          answer: 1,
          explanation: '친구 末尾 无收音 → 主格助词 가',
        },
        {
          pre: '책',
          post: ' 있어요.',
          options: ['이', '가', '도'],
          answer: 0,
          explanation: '책 有收音 ㄱ → 主格助词 이',
        },
        {
          pre: '',
          post: ' 노래가 진짜 좋아요!（这首歌）',
          options: ['이', '그', '저'],
          answer: 0,
          explanation: '近处/当前提到的事物，用 이',
        },
        {
          pre: '',
          post: ' 가수가 누구예요?（远处那位）',
          options: ['이', '그', '저'],
          answer: 2,
          explanation: '远处的人或事物，用 저',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第7课</span>
  <div class="ov-title">이/가 · 이, 그, 저</div>
  <div class="ov-sub">主格助词 + 指示词，指人指物更清晰</div>
  <div class="ov-sec">
    <h3>① 주격 조사 이/가</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 있는 → <b style="color:#ff7fa8">이</b>：책이, 시간이, 돈이<br>
      받침 없는 → <b style="color:#2db89b">가</b>：친구가, 비가, 가수가<br>
      <span style="color:#89756e">用于：引入新信息、강조、있다/없다 的主语</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 指示词 이/그/저</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">이</b>（这）：이 사람, 이 노래, 이거<br>
      <b style="color:#2db89b">그</b>（那/刚提到的）：그 책, 그 배우, 그거<br>
      <b style="color:#6b7ff0">저</b>（远处那）：저 가수, 저 건물, 저거
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 이 사람이… — 双重 이</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">이</b> 사람<b style="color:#2db89b">이</b> 누구예요?<br>
      前者 이 = 指示词"这"，后者 이 = 主格助词
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      친구<span style="color:#e05555;text-decoration:line-through">이</span> 와요 → 친구<span style="color:#2db89b">가</span> 와요（받침 없는 用 가）<br>
      책<span style="color:#e05555;text-decoration:line-through">가</span> 있어요 → 책<span style="color:#ff7fa8">이</span> 있어요（받침 있는 用 이）<br>
      이/그/저 指示词 ≠ 이/가 助词，不要混淆
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第8课：부터…까지, 时间表示法 ────────────────────
  {
    id: 'card-p2-l08',
    partNumber: 2,
    lessonNumber: 8,
    title: '부터…까지, 时间表示法',
    whatItDoes: '说从几点到几点、从哪到哪',
    whatItDoesBody: '부터 表示起点"从"，까지 表示终点"到"，时间说法：\n시간은 固有数词，분은 汉字数词。\n这节课把P2-L04学的数词直接用到时间表达上，同时学会说"从……到……"的范围句型。\n中文"从三点到五点"结构和韩语相同，但韩语"小时"用固有数词、"分钟"用汉字数词，两套混用是中文没有的难点。',
    structureNote: '两个核心词 부터/까지 结构很简单：\n直接贴在时间/地点词后面。\n难点在时间的读法几点用固有数词，几分用汉字数词，两套混用。',
    rulesNote: '时间读法只需记住：\n시（点）用固有数词（한/두/세…열두），분（分）用汉字数词（일/이/십…오십오）。\n特殊：\n半小时说 반（두 시 반=两点半）。\n空间起点用 에서，时间起点用 부터，不能混用。',
    scenarioNote: '说工作时间、约定见面、描述演唱会时间부터/까지 是最常用的时间表达框架。\n掌握这节课，你能准确说出任何"从X到X"的安排。',
    conceptCompare: {
      zh: '从三点到五点 / 上午十点半',
      ko: '세 시부터 다섯 시까지 / 오전 열 시 반',
      note: '小时（시）用固有数词：한/두/세/네/다섯…열두；分钟（분）用汉字数词：일/이/삼…오십구。오전=上午，오후=下午。',
    },
    structures: [
      {
        ko: '세 시부터 다섯 시까지 공부해요',
        zh: '从三点学习到五点。',
        tokens: [
          { text: '세 시부터', role: 'place' },
          { text: '다섯 시까지', role: 'place' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '월요일부터 금요일까지 일해요',
        zh: '从周一到周五工作。',
        tokens: [
          { text: '월요일부터', role: 'place' },
          { text: '금요일까지', role: 'place' },
          { text: '일해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '부터：时间/范围起点（从）',              examples: '아침부터 / 월요일부터 / 지금부터' },
      { type: 'rule',    text: '까지：时间/范围终点（到）',              examples: '저녁까지 / 금요일까지 / 열 시까지' },
      { type: 'compare', text: '에서…까지 vs 부터…까지',               examples: '에서=空间起点（서울에서 부산까지）；부터=时间/抽象范围起点' },
      { type: 'rule',    text: '시（点）用固有数词',                    examples: '한 시 / 두 시 / 세 시 / 열두 시' },
      { type: 'rule',    text: '분（分）用汉字数词',                    examples: '십 분 / 삼십 분 / 오십오 분' },
      { type: 'usage',   text: '반（半）= 30分，可代替 삼십 분',        examples: '두 시 반（两点半）/ 세 시 반（三点半）' },
      { type: 'vocab',   text: '오전/오후 放时间前',                    examples: '오전 열 시（上午十点）/ 오후 두 시（下午两点）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아침부터', role: 'place' },
          { text: '저녁까지', role: 'place' },
          { text: '일해요', role: 'verb' },
        ],
        zh: '从早上工作到晚上。',
        swapWords: ['공부해요', '연습해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오후 세 시부터 다섯 시까지', role: 'time' },
          { text: '수업이에요', role: 'verb' },
        ],
        zh: '下午三点到五点是课。',
        swapWords: ['두 시부터 네 시까지', '열 시부터 열두 시까지'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '서울에서', role: 'place' },
          { text: '부산까지', role: 'time' },
          { text: '얼마나 걸려요?', role: 'verb' },
        ],
        zh: '从首尔到釜山要多久？',
        swapWords: ['인천까지', '제주도까지'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '수업은', role: 'subject' },
          { text: '오전 열 시부터', role: 'place' },
          { text: '열두 시까지예요', role: 'verb' },
        ],
        zh: '课是上午十点到十二点。',
        swapRole: 'place',
          swapWords: ['아홉 시부터 열한 시까지', '두 시부터 네 시까지'],
      },
    ],
    scenarios: [
      { icon: '📅', context: '说工作时间', ko: '저는 월요일부터 금요일까지 일해요.', zh: '我从周一工作到周五。' },
      { icon: '📚', context: '学习计划', ko: '오늘 두 시부터 네 시까지 공부할 거예요.', zh: '今天两点到四点要学习。' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '콘서트는 오후 다섯 시부터 여덟 시까지예요.', zh: '演唱会从下午五点到八点。' },
      { icon: '🕐', context: '说时间', ko: '지금 몇 시예요? 오후 두 시 삼십 분이에요.', zh: '现在几点？下午两点三十分。' },
      { icon: '🏃', context: '运动打卡', ko: '오늘 아침 여섯 시부터 운동했어요!', zh: '今天早上六点开始运动了！' },
      { icon: '🏥', context: '医院营业时间', ko: '병원은 오전 아홉 시부터 오후 여섯 시까지예요.', zh: '医院从上午九点到下午六点。' },
    ],
    mistakes: [
      { wrong: '두 시간부터（用 시간 代替 시）', correct: '두 시부터', note: '시간 是"小时"（时长），시 才是"点"（时刻），说几点用 시。' },
      { wrong: '서울부터 부산까지（空间起点用 부터）', correct: '서울에서 부산까지', note: '空间上"从A到B"用 에서…까지，부터…까지 多用于时间或抽象范围。' },
      { wrong: '삼 시（用汉字数词说时）', correct: '세 시', note: '几点用固有数词：하나→한, 둘→두, 셋→세，所以 三点 = 세 시。' },
      { wrong: '두 시 삼십 분 반', correct: '두 시 삼십 분 / 두 시 반', note: '삼십 분 和 반 意思一样，不要叠用。' },
    ],
    linkedGrammarIds: ['g11'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">부터…까지 · 时间表示法</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">说"从……到……"的范围，加上几点几分的读法——约时间、说日程全靠这节课。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">세 시부터 다섯 시까지 공부해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">从三点学习到五点。</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">오전 열 시 반이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">上午十点半。（반=30분）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">서울에서 부산까지 얼마나 걸려요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">从首尔到釜山要多久？（空间用 에서）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两个核心句型</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">부터…까지</span>　时间/范围：월요일부터 금요일까지</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">에서…까지</span>　空间：서울에서 부산까지</div>
    <div style="font-size:16px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">시（点）</span>固有数词　<span style="font-weight:700;color:#b49ccf">분（分）</span>汉字数词　반=30分</div>
  </div>
</div>
<div class="reminder-box">시（时刻）用固有：세 시 ✓，삼 시 ✗。분（分钟）用汉字：삼십 분 ✓，서른 분 ✗。</div>`,
    compareHtml: `<div class="card-title">부터 vs 에서（起点）</div>
<div class="card-body">两个助词都表示"从"，但分工不同：부터 管时间和抽象范围，에서 管空间地点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">부터 — 时间/范围起点</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">아침부터</span><span style="font-size:16px;color:#89756e">从早上</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">지금부터</span><span style="font-size:16px;color:#89756e">从现在</span></div>
    <div class="tok-row"><span class="tok t-s">월요일부터</span><span style="font-size:16px;color:#89756e">从周一</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">에서 — 空间地点起点</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-p">서울에서</span><span style="font-size:16px;color:#89756e">从首尔</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-p">집에서</span><span style="font-size:16px;color:#89756e">从家</span></div>
    <div class="tok-row"><span class="tok t-p">학교에서</span><span style="font-size:16px;color:#89756e">从学校</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">时间数词规则</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">세 시</span><span style="font-size:16px;color:#89756e">三点（固有数词 셋→세）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">삼십 분</span><span style="font-size:16px;color:#89756e">三十分（汉字数词）</span></div>
  <div class="tok-row"><span class="tok t-v">두 시 반</span><span style="font-size:16px;color:#89756e">两点半（반=30分）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">부터/까지 核心用法</div><div style="font-size:16px;color:#5a4640">时间范围：월요일부터 금요일까지（从周一到周五）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">空间起点用 에서（不用 부터）：서울에서 부산까지 — 에서 标动作出发地，부터 标时间/顺序起点。</div></div>
<div class="reminder-box">서울부터 부산까지 ✗ → 서울에서 부산까지 ✓　空间起点必须用 에서。</div>`,
    compareLabel: '부터 vs 에서（起点）',
    quickTable: {
      title: '时间表达速记',
      headers: ['时间', '韩语', '说明'],
      rows: [
        ['1点', { ko: '한 시', zh: '一点钟' }, '固有数词 하나→한'],
        ['2点半', { ko: '두 시 반', zh: '两点半' }, '固有数词 둘→두，반=30분'],
        ['3点15分', { ko: '세 시 십오 분', zh: '三点十五分' }, '셋→세，분 用汉字数词'],
        ['上午10点', { ko: '오전 열 시', zh: '上午十点' }, '오전=AM，열=10'],
        ['下午7点', { ko: '오후 일곱 시', zh: '下午七点' }, '오후=PM，일곱=7'],
        ['从3点到5点', { ko: '세 시부터 다섯 시까지', zh: '三点到五点' }, '부터=从，까지=到'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的时间表达',
      body: '根据语境选择正确的填入。',
      questions: [
        {
          pre: '지금',
          post: ' 공부할게요.（从现在开始）',
          options: ['부터', '에서', '까지'],
          answer: 0,
          explanation: '时间/抽象起点用 부터',
        },
        {
          pre: '세 시부터 다섯 시',
          post: ' 수업이에요.',
          options: ['까지', '에서', '부터'],
          answer: 0,
          explanation: '终点用 까지',
        },
        {
          pre: '서울',
          post: ' 부산까지 얼마나 걸려요?',
          options: ['까지', '부터', '에서'],
          answer: 2,
          explanation: '空间起点用 에서',
        },
        {
          pre: '지금 몇 시예요? 오후',
          post: ' 시 삼십 분이에요.（两点）',
          options: ['삼', '두', '이'],
          answer: 1,
          explanation: '时刻用固有数词，2点=두 시',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 第8课</span>
  <div class="ov-title">부터…까지 · 시간 표현</div>
  <div class="ov-sub">从……到……，加上时间表达</div>
  <div class="ov-sec">
    <h3>① A부터 B까지</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      월요일<b style="color:#ff7fa8">부터</b> 금요일<b style="color:#2db89b">까지</b>（从周一到周五）<br>
      세 시<b style="color:#ff7fa8">부터</b> 다섯 시<b style="color:#2db89b">까지</b>（从三点到五点）<br>
      공간 起点：서울<b style="color:#6b7ff0">에서</b> 부산<b style="color:#2db89b">까지</b>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 时间数词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      시（点钟）→ 固有数词：<b style="color:#ff7fa8">한 두 세 네 다섯…열두</b><br>
      분（分钟）→ 汉字数词：<b style="color:#2db89b">십 이십 삼십…오십구</b><br>
      반 = 30분：두 시 <b style="color:#ff7fa8">반</b>（两点半）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 오전/오후</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">오전</b> 열 시（上午十点）<br>
      <b style="color:#e8a87c">오후</b> 일곱 시（下午七点）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">삼 시</span> → <span style="color:#ff7fa8">세 시</span>（시 用固有数词）<br>
      서울<span style="color:#e05555;text-decoration:line-through">부터</span> 부산까지 → 서울<span style="color:#6b7ff0">에서</span> 부산까지（공간 기점 用 에서）<br>
      <span style="color:#e05555;text-decoration:line-through">두 시 삼십 분 반</span> → 두 시 반（삼십 분=반，不叠用）
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第9课：에게, 한테, ㅂ 不规则 ────────────────────
  {
    id: 'card-p2-l09',
    partNumber: 2,
    lessonNumber: 9,
    title: '에게, 한테, "ㅂ"不规则',
    whatItDoes: '说"给谁/对谁"，认识词尾变形',
    whatItDoesBody: '에게/한테 表示动作的对象（给谁/对谁）；\nㅂ 不规则：\n덥다→더워요，部分以 ㅂ 结尾的词遇元音变成 워요。\n这节课两个知识点看起来不相关，其实都是"动作有对象"的表达对人用 에게/한테，天气形容词变形是让你能描述环境。\n中文"给朋友"只有一种说法，韩语按语体分 에게（书面）和 한테（口语），是中文没有的区分。',
    structureNote: '两块内容：①에게/한테（给谁/对谁）接在人名或人称词后面；\n②ㅂ 不规则变形只影响天气/感觉类形容词。\n先把两块分开理解，再合起来用。',
    rulesNote: '에게 是书面/正式，한테 是口语。\n收/发方向区别：\n送出去用 에게/한테，从对方处收到用 에게서/한테서。\nㅂ 不规则：\n看词干末尾是否是 ㅂ，遇到元音时 ㅂ 变 워。\n注意 입다(穿)、잡다(抓) 是规则词，不变。',
    scenarioNote: '한테 是韩语聊天里最常见的词之一"给朋友发消息""从朋友那里收到礼物"都用它。\n天气词（더워요/추워요）则是每天都可能用到的表达，学完马上能在日记和对话里用上。',
    structures: [
      {
        ko: '친구에게 메시지를 보내요',
        zh: '给朋友发消息。',
        tokens: [
          { text: '친구에게', role: 'place' },
          { text: '메시지를', role: 'object' },
          { text: '보내요', role: 'verb' },
        ],
      },
      {
        ko: '선생님한테 질문해요',
        zh: '问老师问题。',
        tokens: [
          { text: '선생님한테', role: 'place' },
          { text: '질문해요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 더워요',
        zh: '今天热。',
        tokens: [
          { text: '오늘은', role: 'subject' },
          { text: '더워요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '에게：书面/中性，对人',                    examples: '친구에게 / 선생님에게 / 부모님에게' },
      { type: 'rule',    text: '한테：口语，对人',                         examples: '친구한테 / 엄마한테 / 동생한테' },
      { type: 'rule',    text: '에게서/한테서：从对方处（接收）',           examples: '친구한테서 선물을 받았어요' },
      { type: 'note',    text: '에게/한테 只用于人或动物，地点/物体用 에',  examples: '학교에게 ✗ → 학교에 ✓' },
      { type: 'rule',    text: 'ㅂ 不规则：词干末 ㅂ + 元音 → 워요',      examples: '덥다→더워요 / 춥다→추워요 / 어렵다→어려워요' },
      { type: 'vocab',   text: '常见 ㅂ 不规则形容词',                        examples: '덥다(热)·춥다(冷)·어렵다(难)·가볍다(轻)·무겁다(重)·아름답다(美丽)' },
      { type: 'note',    text: '规则 ㅂ 词（不变）',                      examples: '입다→입어요(穿) / 잡다→잡아요(抓)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구한테', role: 'place' },
          { text: '카톡을', role: 'object' },
          { text: '보내요', role: 'verb' },
        ],
        zh: '给朋友发KakaoTalk消息。',
        swapWords: ['메시지를', '사진을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '선생님에게', role: 'place' },
          { text: '질문했어요', role: 'verb' },
        ],
        zh: '问了老师。',
        swapWords: ['선생님한테', '친구에게'],
        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '오늘', role: 'plain' },
          { text: '너무', role: 'plain' },
          { text: '더워요', role: 'verb' },
        ],
        zh: '今天太热了。',
        swapWords: ['추워요', '어려워요', '무거워요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '这道题很难。',
        swapWords: ['쉬워요', '재미있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '💬', context: 'SNS 聊天', ko: '친구한테 카톡 보냈어요. 아직 답장이 없어요.', zh: '给朋友发了KakaoTalk，还没有回复。' },
      { icon: '🌡️', context: '天气', ko: '오늘 너무 더워요. 어제는 추웠어요.', zh: '今天太热了，昨天很冷。' },
      { icon: '📚', context: '学习反馈', ko: '이 문법이 어려워요. 선생님한테 물어볼 거예요.', zh: '这个语法很难，要问老师。' },
      { icon: '🎁', context: '收礼物', ko: '친구한테 선물을 받았어요!', zh: '收到了朋友的礼物！' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래 가사가 너무 아름다워요.', zh: '这首歌的歌词太美了。' },
      { icon: '🏋️', context: '运动', ko: '이 가방이 너무 무거워요. 좀 들어 주세요.', zh: '这个包太重了，帮我拿一下。' },
    ],
    mistakes: [
      { wrong: '학교에게 가요（对地点用 에게）', correct: '학교에 가요', note: '에게/한테 只用于人（或动物），地点用 에。' },
      { wrong: '덥어요（直接套规则）', correct: '더워요', note: '덥다 是 ㅂ 不规则，ㅂ 遇元音语尾变 워，得 더워요。' },
      { wrong: '입워요（把 입다 也不规则化）', correct: '입어요', note: '입다 是规则变化，直接套用：입 + 어요 = 입어요。' },
      { wrong: '에게서/한테서 混用 에게/한테', correct: '친구한테서 받았어요', note: '从对方处"得到"要加 서：친구한테서 선물을 받았어요。' },
    ],
    compareHtml: `<div class="card-title">에게 vs 한테 — 给谁/对谁</div>
<div class="card-body">两个都表示动作的对象"给谁/对谁"，区别只在场合：에게 书面，한테 口语。中文"给朋友"只有一种说法，韩语要看说话场合选择。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에게（书面/正式）</div><div style="font-size:16px;color:#89756e;margin-top:2px">文章、信件、正式场合</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">선생님에게 물었어요.</span><span style="font-size:16px;color:#5a4640">问了老师。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">친구에게 보냈어요.</span><span style="font-size:16px;color:#5a4640">发给朋友了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">한테（口语）</div><div style="font-size:16px;color:#89756e;margin-top:2px">日常对话、聊天</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테 카톡 보냈어요.</span><span style="font-size:16px;color:#5a4640">给朋友发了KakaoTalk。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">엄마한테 전화했어요.</span><span style="font-size:16px;color:#5a4640">给妈妈打了电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">ㅂ 不规则：遇元音变 워</div><div style="font-size:16px;color:#5a4640">덥다→더워요（热）/ 춥다→추워요（冷）/ 어렵다→어려워요（难）。规律：ㅂ 遇元音语尾时脱落，变成 워。但 입다(穿)/잡다(抓) 是规则变化，不走这条规律。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">收/发方向：에게/한테 = 给谁（发出）；에게서/한테서 = 从谁那里（收到）。</div></div>
<div class="reminder-box">에게/한테 只用于人或动物，地点用 에。학교한테 ✗ → 학교에 ✓。这是最容易犯的错误。</div>`,
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 9 课 · 已完成</div>
    <div class="ov-hero-title">에게/한테 + ㅂ 不规则</div>
    <div class="ov-hero-sub">给谁/从谁 · 方向助词 · ㅂ→워</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">에게/한테</span> → 给谁/对谁（方向）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">에게서/한테서</span> → 从谁那里（来源）</div>
        <div style="font-size:16px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">ㅂ 不规则</span>：ㅂ + 元音 → 워（덥다→더워요）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-s">친구한테</span><span class="tok t-v">전화해요</span></div><div class="struct-zh">给朋友打电话。</div></div>
        <div><div class="tok-row"><span class="tok t-s">선생님한테서</span><span class="tok t-v">배워요</span></div><div class="struct-zh">从老师那里学。</div></div>
        <div><div class="tok-row"><span class="tok t-v">더워요</span></div><div class="struct-zh">很热。（덥다 → ㅂ 不规则）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학교한테 가요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학교에 가요（에게/한테 只用于人/动物）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">더웁니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">덥습니다（ㅂ 脱落，합니다 体）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: ['g8'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에게 · 한테 · ㅂ 不规则</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">说"给谁/对谁"，加上天气词的特殊变形——让你能聊日常、说感受。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">친구한테 카톡 보냈어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">给朋友发了KakaoTalk消息。</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">오늘 너무 더워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">今天太热了。（덥다→더워요，ㅂ不规则）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">친구한테서 선물을 받았어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">从朋友那里收到了礼物。（한테서=来源）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两个核心知识点</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">에게/한테</span>　接人名后，表示"给谁/对谁"　口语用 한테，书面用 에게</div>
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">ㅂ 不规则</span>　词干末 ㅂ + 元音 → 워　덥다→더워요 / 춥다→추워요</div>
  </div>
  <div style="font-size:16px;color:#5a4640;margin-top:8px;line-height:1.7">注意：입다(穿)、잡다(抓) 是规则词，不变形：입어요 ✓，입워요 ✗。</div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">에게/한테 方向</div><div style="font-size:16px;color:#5a4640">给方向（向）→ 에게/한테：친구한테 전화해요（给朋友打电话）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">来源方向（从）→ 에게서/한테서：친구한테서 받았어요（从朋友那收到）。「서」表示来源。</div></div>
<div class="reminder-box">에게/한테 只用于人或动物，地点用 에：학교에게 ✗ → 학교에 ✓。</div>`,
    compareLabel: '에게 vs 한테',
    quickTable: {
      title: 'ㅂ 不规则常用词速记',
      headers: ['原形', '变形', '意思', '备注'],
      rows: [
        [{ ko: '덥다', zh: '热（原形）' }, { ko: '더워요', zh: '热（요体）' }, '热', 'ㅂ不规则变形'],
        [{ ko: '춥다', zh: '冷（原形）' }, { ko: '추워요', zh: '冷（요体）' }, '冷', 'ㅂ不规则变形'],
        [{ ko: '어렵다', zh: '难（原形）' }, { ko: '어려워요', zh: '难（요体）' }, '难', 'ㅂ不规则变形'],
        [{ ko: '아름답다', zh: '美丽（原形）' }, { ko: '아름다워요', zh: '美丽（요体）' }, '美丽', 'ㅂ不规则变形'],
        [{ ko: '가볍다', zh: '轻（原形）' }, { ko: '가벼워요', zh: '轻（요体）' }, '轻', 'ㅂ不规则变形'],
        [{ ko: '무겁다', zh: '重（原形）' }, { ko: '무거워요', zh: '重（요体）' }, '重', 'ㅂ不规则变形'],
        [{ ko: '입다', zh: '穿（原形）' }, { ko: '입어요', zh: '穿（요体）' }, '穿', '规则（不变）'],
        [{ ko: '잡다', zh: '抓（原形）' }, { ko: '잡아요', zh: '抓（요体）' }, '抓', '规则（不变）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的形式',
      body: '根据语境选 에게、한테，或选出正确的 ㅂ 变形。',
      questions: [
        {
          pre: '친구',
          post: ' 카톡 보내요.（口语）',
          options: ['한테', '에게', '에서'],
          answer: 0,
          explanation: '口语对话用 한테',
        },
        {
          pre: '선생님',
          post: ' 편지를 써요.（书面/正式）',
          options: ['한테서', '한테', '에게'],
          answer: 2,
          explanation: '书面/正式语境用 에게',
        },
        {
          pre: '오늘 날씨가 너무',
          post: '.',
          options: ['덥요', '더워요', '덥어요'],
          answer: 1,
          explanation: '덥다 是 ㅂ 不规则，ㅂ→워：더워요',
        },
        {
          pre: '이 가방이',
          post: '.',
          options: ['무겁어요', '무겁요', '무거워요'],
          answer: 2,
          explanation: '무겁다 是 ㅂ 不规则，ㅂ→워：무거워요',
        },
      ],
    },
  },

  // ── 第二章 第10课：ㄷ 不规则, ㅡ 脱落 ──────────────────────
  {
    id: 'card-p2-l10',
    partNumber: 2,
    lessonNumber: 10,
    title: '"ㄷ"不规则, 元音"ㅡ"脱落',
    whatItDoes: '认识两类常见不规则变形',
    whatItDoesBody: '两类变形规则：\nㄷ 不规则（部分 ㄷ 遇元音变 ㄹ），ㅡ 脱落（词干末 ㅡ 接 아/어요 时消失）。\n这节课是第二章的变形难点不是"怎么用"，而是"为什么这样变"。\n理解变形规律比死记硬背省力得多。\n中文动词没有任何语音变化，韩语这两类不规则变化是汉语母语者最陌生的部分，需要专门记忆。',
    structureNote: '两套变形规则独立存在：\nㄷ 不规则影响"听/走/问"这类动词，ㅡ 脱落影响"痛/忙/漂亮"这类形容词。\n两套都只在接元音语尾时才触发，接 -고 等辅音语尾时保持原样。',
    rulesNote: 'ㄷ 不规则：\n遇元音词尾 ㄷ→ㄹ（듣다→들어요），但 받다/믿다 不变要记哪些变、哪些不变。\nㅡ 脱落：\nㅡ 消失后，看前一个元音决定接 아요 还是 어요；\n单音节词干统一接 어요（쓰다→써요）。',
    scenarioNote: '듣다（听）和 아프다/바쁘다/예쁘다 是日常对话里出现频率极高的词。\n掌握这节课，你能自然说出"在听歌""头很痛""最近很忙""这首歌很好听"，让表达丰富很多。',
    structures: [
      {
        ko: '음악을 들어요',
        zh: '听音乐。',
        tokens: [
          { text: '음악을', role: 'object' },
          { text: '들어요', role: 'verb' },
        ],
      },
      {
        ko: '머리가 아파요',
        zh: '头疼。',
        tokens: [
          { text: '머리가', role: 'subject' },
          { text: '아파요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 바빠요',
        zh: '今天忙。',
        tokens: [
          { text: '오늘은', role: 'subject' },
          { text: '바빠요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: 'ㄷ 不规则：词干末 ㄷ + 元音语尾 → ㄷ 变 ㄹ',  examples: '듣다→들어요 / 걷다→걸어요 / 묻다→물어요(问)' },
      { type: 'note',    text: 'ㄷ 规则动词（不变）',                          examples: '받다→받아요(收) / 믿다→믿어요(信) / 닫다→닫아요(关)' },
      { type: 'note',    text: 'ㄷ 接辅音语尾 -고 时不变',                   examples: '듣고 있어요（不是 들고 있어요）' },
      { type: 'rule',    text: 'ㅡ 脱落：词干末 ㅡ + -아/어요 时 ㅡ 消失',  examples: '아프다→아파요 / 예쁘다→예뻐요 / 쓰다→써요' },
      { type: 'rule',    text: '前元音 ㅏ/ㅗ → 아요',                       examples: '아프다→아파요 / 바쁘다→바빠요 / 나쁘다→나빠요' },
      { type: 'rule',    text: '前元音 非 ㅏ/ㅗ → 어요',                      examples: '예쁘다→예뻐요 / 기쁘다→기뻐요 / 슬프다→슬퍼요' },
      { type: 'note',    text: '单音节词干 → 어요',                        examples: '쓰다→써요 / 크다→커요 / 끄다→꺼요' },
      { type: 'note',    text: 'ㅡ 接 -고 时不脱落',                        examples: '쓰고 있어요 / 아프고 피곤해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '听这首歌。',
        swapWords: ['들었어요', '듣고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '학교까지', role: 'place' },
          { text: '걸어요', role: 'verb' },
        ],
        zh: '走到学校。',
        swapWords: ['걸었어요', '걷고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '머리가', role: 'subject' },
          { text: '아파요', role: 'verb' },
        ],
        zh: '头疼。',
        swapWords: ['배가 아파요', '목이 아파요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '예뻐요', role: 'verb' },
        ],
        zh: '这件衣服很漂亮。',
        swapRole: 'subject',
          swapWords: ['이 가방이', '이 사진이'],
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 听歌', ko: '이 노래를 계속 들어요. 너무 좋아요!', zh: '一直在听这首歌，太好了！' },
      { icon: '🤒', context: '身体不舒服', ko: '머리가 아파요. 오늘 쉬고 싶어요.', zh: '头疼，今天想休息。' },
      { icon: '📅', context: '日程说明', ko: '요즘 너무 바빠요. 주말에도 일해요.', zh: '最近太忙了，周末也在工作。' },
      { icon: '✏️', context: '学习打卡', ko: '지금 일기를 쓰고 있어요. 한국어로 써요!', zh: '现在正在写日记，用韩语写！' },
      { icon: '🚶', context: '散步', ko: '날씨가 좋아요. 공원까지 걸어요.', zh: '天气很好，走到公园去。' },
      { icon: '😔', context: '情绪表达', ko: '오늘 슬퍼요. 친구한테 전화할 거예요.', zh: '今天很难过，要给朋友打电话。' },
    ],
    mistakes: [
      { wrong: '듣어요', correct: '들어요', note: '듣다 是 ㄷ 不规则，ㄷ 遇元音变 ㄹ → 들어요。' },
      { wrong: '받다→발아요（把规则 ㄷ 也不规则化）', correct: '받다→받아요', note: '받다 是规则变化，不是 ㄷ 不规则，直接套用即可。' },
      { wrong: '들고 있어요（想说"正在听"）', correct: '듣고 있어요', note: '接 -고 时不是元音语尾，ㄷ 不变：듣고 있어요。들다 是另一个词（拿/举）。' },
      { wrong: '아프어요', correct: '아파요', note: '아프다 的 ㅡ 脱落，前面元音 ㅏ → 아파요。' },
      { wrong: '예쁘아요', correct: '예뻐요', note: '예쁘다 的 ㅡ 脱落，前元音 ㅔ 非 ㅏ/ㅗ → 接 어요，쁘 去 ㅡ 后与 어 合并 → 뻐，得 예뻐요。' },
    ],
        overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 10 课 · 已完成</div>
    <div class="ov-hero-title">ㄷ 不规则 + ㅡ 脱落</div>
    <div class="ov-hero-sub">ㄷ→ㄹ · ㅡ 消失 · 规则 vs 不规则</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㄷ 不规则</span>：ㄷ + 元音 → ㄹ（듣다→들어요，걷다→걸어요）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">ㅡ 脱落</span>：末 ㅡ + 아/어 → ㅡ 消失（쓰다→써요，예쁘다→예뻐요）</div>
        <div style="font-size:16px;color:#89756e;margin-top:4px">注意：받다/믿다 的 ㄷ 是规则，不变形。</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-o">음악을</span><span class="tok t-v">들어요</span></div><div class="struct-zh">听音乐。（듣다→들어요）</div></div>
        <div><div class="tok-row"><span class="tok t-o">일기를</span><span class="tok t-v">써요</span></div><div class="struct-zh">写日记。（쓰다→써요）</div></div>
        <div><div class="tok-row"><span class="tok t-v">예뻐요</span></div><div class="struct-zh">漂亮。（예쁘다→예뻐요）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">들으요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">들어요（ㄷ → ㄹ，不是加 으）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">받다→랄아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">받아요（받다 是规则动词，ㄷ 不变）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">ㄷ 不规则 · ㅡ 脱落</h1>
<p class="sub" style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">两类变形规律——看懂 듣다→들어요 和 아프다→아파요，高频词一次搞定。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">이 노래를 들어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">听这首歌。（듣다→들어요，ㄷ不规则）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">머리가 아파요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">头疼。（아프다→아파요，ㅡ脱落）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:16px;font-weight:700;color:#241917">요즘 너무 바빠요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">最近太忙了。（바쁘다→바빠요，ㅡ脱落）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:8px">两套变形规律</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㄷ 不规则</span>　词干末 ㄷ + 元音 → ㄷ 变 ㄹ　듣다→들어요 / 걷다→걸어요</div>
    <div style="font-size:16px;color:#89756e;padding-left:8px">⚠️ 规则词不变：받다→받아요 / 믿다→믿어요</div>
    <div style="font-size:16px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#2db89b">ㅡ 脱落</span>　词干末 ㅡ 接 아/어요 时消失，看前元音选接 아/어</div>
    <div style="font-size:16px;color:#89756e;padding-left:8px">前元音 ㅏ/ㅗ→아파요 　其他→예뻐요 　单音节→써요</div>
  </div>
</div>
<div class="reminder-box">两种变形都接 -고 时不触发：듣고 있어요 ✓（不是 들고）/ 아프고 피곤해요 ✓。</div>`,
    compareHtml: `<div class="card-title">ㄷ 不规则 — 变 vs 不变</div>
<div class="card-body">不是所有 ㄷ 结尾的词都变形。高频词要记住哪些变、哪些不变，接 -고 等辅音语尾时两类都不变。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">ㄷ 不规则（遇元音变 ㄹ）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">들어요</span><span style="font-size:16px;color:#89756e">听（듣다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">걸어요</span><span style="font-size:16px;color:#89756e">走（걷다）</span></div>
    <div class="tok-row"><span class="tok t-v">물어요</span><span style="font-size:16px;color:#89756e">问（묻다）</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:16px;font-weight:700;color:#2db89b;margin-bottom:8px">ㄷ 规则（不变）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">받아요</span><span style="font-size:16px;color:#89756e">收（받다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">믿어요</span><span style="font-size:16px;color:#89756e">信（믿다）</span></div>
    <div class="tok-row"><span class="tok t-v">닫아요</span><span style="font-size:16px;color:#89756e">关（닫다）</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:16px;font-weight:700;color:#6b7ff0;margin-bottom:8px">ㅡ 脱落（前元音决定 아/어）</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">아파요</span><span style="font-size:16px;color:#89756e">痛（아프다，前元音ㅏ→아）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">바빠요</span><span style="font-size:16px;color:#89756e">忙（바쁘다，前元音ㅏ→아）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">예뻐요</span><span style="font-size:16px;color:#89756e">漂亮（예쁘다，前元音非ㅏ/ㅗ→어）</span></div>
  <div class="tok-row"><span class="tok t-v">써요</span><span style="font-size:16px;color:#89756e">写（쓰다，单音节→어）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">两类不规则口诀</div><div style="font-size:16px;color:#5a4640">ㄷ 不规则：듣다/묻다/걷다 遇元音时 ㄷ→ㄹ（듣+어요→들어요）。但 받다/믿다 是规则的。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">ㅡ 脱落：쓰다/바쁘다/예쁘다 词干末 ㅡ 遇 아/어 时脱落（쓰+어요→써요）。</div></div>
<div class="reminder-box">듣고 있어요 ✓（接 -고 不变）　들고 있어요 ✗（들다 是"拿/举"，意思不同）</div>`,
    compareLabel: 'ㄷ规则 vs 不规则',
    quickTable: {
      title: 'ㄷ不规则 + ㅡ脱落 常用词',
      headers: ['原形', '요 体', '意思', '类型'],
      rows: [
        [{ ko: '듣다', zh: '听（原形）' }, { ko: '들어요', zh: '听（요体）' }, '听', 'ㄷ不规则'],
        [{ ko: '걷다', zh: '走路（原形）' }, { ko: '걸어요', zh: '走路（요体）' }, '走路', 'ㄷ不规则'],
        [{ ko: '묻다', zh: '问（原形）' }, { ko: '물어요', zh: '问（요体）' }, '问', 'ㄷ不规则'],
        [{ ko: '받다', zh: '收（原形）' }, { ko: '받아요', zh: '收（요体）' }, '收', { ko: 'ㄷ규칙', zh: 'ㄷ规则（不变）' }],
        [{ ko: '아프다', zh: '疼/不舒服（原形）' }, { ko: '아파요', zh: '疼（요体）' }, '疼/不舒服', 'ㅡ脱落'],
        [{ ko: '바쁘다', zh: '忙（原形）' }, { ko: '바빠요', zh: '忙（요体）' }, '忙', 'ㅡ脱落'],
        [{ ko: '예쁘다', zh: '漂亮（原形）' }, { ko: '예뻐요', zh: '漂亮（요体）' }, '漂亮', 'ㅡ脱落'],
        [{ ko: '쓰다', zh: '写/用（原形）' }, { ko: '써요', zh: '写/用（요体）' }, '写/用', 'ㅡ脱落'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选出正确的变形',
      body: '根据变形规则，选出正确的 요 体形式。',
      questions: [
        {
          pre: '음악을',
          post: '.（듣다）',
          options: ['듣어요', '들어요', '듣아요'],
          answer: 1,
          explanation: '듣다 是 ㄷ 불규칙，ㄷ→ㄹ：들어요',
        },
        {
          pre: '받다 →',
          post: '',
          options: ['받아요', '받워요', '발아요'],
          answer: 0,
          explanation: '받다 是 ㄷ 규칙，直接套用：받아요',
        },
        {
          pre: '머리가',
          post: '.（아프다）',
          options: ['아프요', '아프어요', '아파요'],
          answer: 2,
          explanation: '아프다 ㅡ 脱落，前元音 ㅏ → 아파요',
        },
        {
          pre: '이 옷이',
          post: '.（예쁘다）',
          options: ['예쁘어요', '예쁘아요', '예뻐요'],
          answer: 2,
          explanation: '예쁘다 ㅡ 脱落，前元音 ㅔ → 어요：예뻐요',
        },
      ],
    },
  },

  // ── 第二章 第11课：综合练习② ─────────────────────────────
  {
    id: 'card-p2-l11',
    partNumber: 2,
    lessonNumber: 11,
    title: '综合练习②',
    whatItDoes: '第二章综合练习',
    whatItDoesBody: '完成这份练习，检验第二章前 10 课是否掌握。\n涵盖助词、数词、否定、时间、不规则变化等核心知识点。',
    isPractice: true,
    structureNote: '这是第二章的总复习。\n遇到不确定的题，先回想"这是哪节课的知识点"，再作答这个习惯比猜答案更有助于巩固记忆。',
    structures: [
      { ko: '친구와 카페에 가요', zh: '和朋友去咖啡店。', tokens: [{ text: '친구와', role: 'subject' }, { text: '카페에', role: 'place' }, { text: '가요', role: 'verb' }] },
      { ko: '책이 책상 위에 있어요', zh: '书在桌子上。', tokens: [{ text: '책이', role: 'subject' }, { text: '책상 위에', role: 'place' }, { text: '있어요', role: 'verb' }] },
      { ko: '앉으세요', zh: '请坐。', tokens: [{ text: '앉으세요', role: 'verb' }] },
      { ko: '커피 한 잔 주세요', zh: '请给我一杯咖啡。', tokens: [{ text: '커피', role: 'object' }, { text: '한 잔', role: 'place' }, { text: '주세요', role: 'verb' }] },
      { ko: '저도 한국어를 공부해요', zh: '我也学韩语。', tokens: [{ text: '저도', role: 'subject' }, { text: '한국어를', role: 'object' }, { text: '공부해요', role: 'verb' }] },
      { ko: '오늘은 공부 안 해요', zh: '今天不学习。', tokens: [{ text: '오늘은', role: 'time' }, { text: '공부', role: 'object' }, { text: '안 해요', role: 'verb' }] },
      { ko: '세 시부터 다섯 시까지 일해요', zh: '从三点工作到五点。', tokens: [{ text: '세 시부터', role: 'place' }, { text: '다섯 시까지', role: 'place' }, { text: '일해요', role: 'verb' }] },
      { ko: '오늘 너무 더워요', zh: '今天太热了。', tokens: [{ text: '오늘', role: 'time' }, { text: '너무 더워요', role: 'verb' }] },
      { ko: '이 노래를 들어요', zh: '听这首歌。', tokens: [{ text: '이 노래를', role: 'object' }, { text: '들어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '받침 있는 명사 뒤: 과/이/을/은，받침 없는 명사 뒤: 와/가/를/는', examples: '책과, 밥을, 책은 / 친구와, 커피를, 친구는' },
      { type: 'compare', text: '하고（구어, 받침 무관） vs 와/과（문어, 받침 구분）', examples: '친구하고 가요 / 친구와 가요' },
      { type: 'rule', text: '수사: 시각→고유 수사，분→한자 수사，수량사 앞에서 하나→한/둘→두/셋→세/넷→네', examples: '두 시 삼십 분 / 한 잔 / 세 명' },
      { type: 'rule', text: '의（~의）：명사A의 명사B；도：은/는/이/가/을/를 대체；만：한정 "오직"', examples: '친구의 책 / 저도 가요 / 오늘만 있어요' },
      { type: 'rule', text: '부정: 안 + 동사（구어）；동사 어간 + 지 않아요（문어）；하다 동사: 명사 + 안 해요', examples: '안 가요 / 가지 않아요 / 공부 안 해요' },
      { type: 'compare', text: '부터（시간 기점） vs 에서（공간 기점），까지（종점）', examples: '두 시부터 / 서울에서 부산까지' },
      { type: 'rule', text: 'ㅂ 불규칙: ㅂ + 모음 → 워，ㄷ 불규칙: ㄷ + 모음 → ㄹ', examples: '덥다→더워요 / 듣다→들어요' },
      { type: 'rule', text: 'ㅡ 탈락: 어간 끝 ㅡ + 아/어요 탈락', examples: '아프다→아파요 / 예쁘다→예뻐요' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '친구', role: 'subject' }, { text: '하고', role: 'plain' }, { text: '카페에', role: 'place' }, { text: '가요', role: 'verb' }],
        zh: '和朋友去咖啡店。',
        swapRole: 'subject',
          swapWords: ['엄마하고', '선생님하고'],
      },
      {
        wordBlocks: [{ text: '커피', role: 'object' }, { text: '두 잔', role: 'plain' }, { text: '주세요', role: 'verb' }],
        zh: '请给我两杯咖啡。',
        swapWords: ['한 잔', '세 잔'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [{ text: '저도', role: 'subject' }, { text: '이 노래', role: 'object' }, { text: '좋아해요', role: 'verb' }],
        zh: '我也喜欢这首歌。',
        swapRole: 'subject',
          swapWords: ['이 드라마도', '그 가수도'],
      },
      {
        wordBlocks: [{ text: '오늘은', role: 'time' }, { text: '공부', role: 'object' }, { text: '안 해요', role: 'verb' }],
        zh: '今天不学习。',
        swapWords: ['운동 안 해요', '요리 안 해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店', ko: '친구하고 카페에 가요. 아메리카노 두 잔 주세요.', zh: '和朋友去咖啡店，请给我两杯美式。' },
      { icon: '📚', context: '学习计划', ko: '오늘 두 시부터 네 시까지 한국어를 공부해요.', zh: '今天两点到四点学韩语。' },
      { icon: '🌡️', context: '天气', ko: '오늘 너무 더워요. 그렇지만 운동했어요!', zh: '今天太热了，但是运动了！' },
      { icon: '🎵', context: 'KPOP', ko: '친구한테 이 노래를 보냈어요. 가사가 너무 아름다워요!', zh: '给朋友发了这首歌，歌词太美了！' },
      { icon: '🙅', context: '拒绝', ko: '오늘은 시간이 없어요. 내일만 시간 있어요.', zh: '今天没有时间，只有明天有时间。' },
      { icon: '🌧️', context: '不规则变化', ko: '날씨가 추워요. 그래서 밖에 안 나가요.', zh: '天气冷。所以不出去。' },
    ],
    mistakes: [
      { wrong: '친구과 가요', correct: '친구와 가요', note: '친구는 받침 없는 명사 → 와' },
      { wrong: '커피 하나 잔', correct: '커피 한 잔', note: '수량사 앞에서 하나 → 한' },
      { wrong: '저는도 좋아요', correct: '저도 좋아요', note: '도는 은/는을 직접 대체，겹쳐 쓰지 않음' },
      { wrong: '안 공부해요', correct: '공부 안 해요', note: '하다 동사 구어 부정: 명사 + 안 해요' },
      { wrong: '서울부터 부산까지', correct: '서울에서 부산까지', note: '공간 기점은 에서，부터는 시간/추상에 사용' },
      { wrong: '덥어요', correct: '더워요', note: '덥다는 ㅂ 不规则，ㅂ→워' },
      { wrong: '듣어요', correct: '들어요', note: '듣다는 ㄷ 불규칙，ㄷ→ㄹ' },
    ],
    linkedGrammarIds: [],
    compareHtml: `<div class="card-title">第二章核心助词总览</div>
<div class="card-body">第二章学了大量助词和变形规则。这张卡帮你把最容易混淆的几对对比清楚。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">와/과 vs 하고</div><div style="font-size:16px;color:#89756e;margin-top:2px">都表示"和"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구와 가요（书面）</span><span style="font-size:16px;color:#5a4640">와/과：书面/正式</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">친구하고 가요（口语）</span><span style="font-size:16px;color:#5a4640">하고：口语，不看收音</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">부터 vs 에서</div><div style="font-size:16px;color:#89756e;margin-top:2px">都表示"从……"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">두 시부터（从两点）</span><span style="font-size:16px;color:#5a4640">부터：时间起点</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에서（从首尔）</span><span style="font-size:16px;color:#5a4640">에서：空间起点</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">不规则变化速记</div><div style="font-size:16px;color:#5a4640">ㅂ 不规则：덥다→더워요 / 춥다→추워요（ㅂ遇元音→워）<br>ㄷ 不规则：듣다→들어요（ㄷ遇元音→ㄹ）<br>ㅡ 脱落：아프다→아파요 / 예쁘다→예뻐요（ㅡ脱落看前一个元音）</div></div>
<div class="reminder-box">도/만/도 不替换，是叠加助词：저도（我也）/ 오늘만（只有今天）。은/는/이/가/을/를 遇到 도/만 时直接替换掉。</div>`,
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 综合练习</span>
  <div class="ov-title">综合练习②</div>
  <div class="ov-sub">第二章 10 课核心知识点总览</div>
  <div class="ov-sec">
    <h3>① 助词系统</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      와/과（和）：받침 있는→과，받침 없는→와；하고（口语）<br>
      에 가다（去某地）；이/가 있다/없다（有/在）<br>
      의（的）；도（也）；만（只）
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 请求 & 否定</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -ㅂ시다/읍시다（一起吧）；-(으)세요（请…）<br>
      안 + 동사；동사 어간 + 지 않아요；하다→명사 안 해요
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 数词 & 时间</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      固有数词（시/개/명/잔/권）：한 잔, 두 명<br>
      汉字数词（원/월/분）：오천 원, 삼십 분<br>
      A부터 B까지（时间）；에서…까지（공간）
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 不规则变化</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      ㅂ 불규칙：덥다→더워요, 춥다→추워요, 어렵다→어려워요<br>
      ㄷ 불규칙：듣다→들어요, 걷다→걸어요<br>
      ㅡ 탈락：아프다→아파요, 예쁘다→예뻐요, 바쁘다→바빠요
    </div>
  </div>
  <div class="ov-sec">
    <h3>⑤ 连接 & 指示</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      그리고（而且）；그렇지만（但是）<br>
      이/그/저 + 名词（这/那/远那）；에게/한테（给谁）
    </div>
  </div>
</div>`,
  },

  // ── 第三章 第11课：综合练习③ ─────────────────────────────
  {
    id: 'card-p3-l11',
    partNumber: 3,
    lessonNumber: 11,
    title: '综合练习③',
    whatItDoes: '第三章综合练习',
    whatItDoesBody: '完成这份练习，检验第三章前 10 课是否掌握。\n涵盖进行时、经历回顾、愿望、ㄹ 不规则、意愿选择、疑问词、连接词、目的表达、时间顺序等核心知识点。',
    isPractice: true,
    structureNote: '这是第三章的总复习。\n第三章的核心是"时态扩展"和"句子连接"进行时、经历回顾、愿望、目的、顺序，都是让表达从单句变成复句的工具。\n做题时注意这条主线。',
    structures: [
      { ko: '지금 드라마를 보고 있어요', zh: '现在正在看电视剧。', tokens: [{ text: '지금', role: 'time' }, { text: '드라마를', role: 'object' }, { text: '보고 있어요', role: 'verb' }] },
      { ko: '예전에 서울에 살았었어요', zh: '以前在首尔住过。', tokens: [{ text: '예전에', role: 'time' }, { text: '서울에', role: 'place' }, { text: '살았었어요', role: 'verb' }] },
      { ko: '한국에 가고 싶어요', zh: '想去韩国。', tokens: [{ text: '한국에', role: 'place' }, { text: '가고 싶어요', role: 'verb' }] },
      { ko: '카페에 공부하러 가요', zh: '去咖啡店学习。', tokens: [{ text: '카페에', role: 'place' }, { text: '공부하러', role: 'verb' }, { text: '가요', role: 'verb' }] },
      { ko: '밥을 먹은 후에 공부해요', zh: '吃饭后学习。', tokens: [{ text: '밥을', role: 'object' }, { text: '먹은 후에', role: 'time' }, { text: '공부해요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'usage', text: '-고 있어요: 正在进行; 착용동사 + -고 있어요: 持续状态', examples: '공부하고 있어요 / 안경을 쓰고 있어요（戴着）' },
      { type: 'usage', text: '-았었/었었어요: 以前曾经…（现在可能不同）', examples: '살았었어요 / 공부했었어요 / 학생이었었어요' },
      { type: 'usage', text: '-고 싶어요: 想做; 그러면/그럼: 那么（条件顺接）', examples: '가고 싶어요 / 배가 고파요. 그러면 같이 먹어요.' },
      { type: 'usage', text: 'ㄹ 불규칙: -아요/고 앞 보류, -세요/-ㅂ니다/-는 앞 탈락', examples: '살아요 ✓ / 사세요 ✓ / 삽니다 ✓' },
      { type: 'usage', text: '-을/ㄹ래요: 意愿选择; -겠어요: 意志/礼貌（알겠어요）', examples: '갈래요 / 먹을래요 / 알겠어요' },
      { type: 'usage', text: '무슨（名称）/ 어느（选项）/ 어떤（特点）', examples: '무슨 노래예요? / 어느 나라? / 어떤 음식을 좋아해요?' },
      { type: 'usage', text: '그렇지만（明确转折）/ 그런데（轻转折/话题推进）', examples: '재미있어요. 그렇지만 어려워요. / 그런데 이거 알아요?' },
      { type: 'usage', text: '그래서（所以，자연결과）/ 그러니까（所以，제안 어감）', examples: '비가 와요. 그래서 집에 있어요.' },
      { type: 'usage', text: '-(으)러 가다: 去做某事目的; -을/ㄹ까요?: 提议/询问', examples: '먹으러 가요 / 같이 갈까요?' },
      { type: 'usage', text: '-은/ㄴ 후에（之后，看 받침）/ -기 전에（之前，直接加 기）', examples: '먹은 후에 / 본 후에 / 먹기 전에 / 자기 전에' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '지금', role: 'time' }, { text: '안경을', role: 'object' }, { text: '쓰고 있어요', role: 'verb' }],
        zh: '正戴着眼镜。',
        swapWords: ['입고 있어요', '들고 있어요', '보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [{ text: '이 노래를', role: 'object' }, { text: '배우고 싶어요', role: 'verb' }],
        zh: '想学这首歌。',
        swapWords: ['가고 싶어요', '먹고 싶어요', '알고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [{ text: '자기 전에', role: 'time' }, { text: '복습해요', role: 'verb' }],
        zh: '睡觉前复习。',
        swapWords: ['공부한 후에 자요', '먹은 후에 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업이 끝난', role: 'time' },
          { text: '다음에', role: 'plain' },
          { text: '카페에 가요', role: 'verb' },
        ],
        zh: '课结束后去咖啡店。',
        swapWords: ['공부하러 가요', '밥을 먹어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习打卡', ko: '지금 한국어를 공부하고 있어요. 자기 전에 꼭 복습해요.', zh: '现在正在学习韩语。睡前一定复习。' },
      { icon: '🎵', context: 'KPOP', ko: '이 노래를 배우고 싶어요. 그러면 같이 연습할까요?', zh: '想学这首歌。那要一起练习吗？' },
      { icon: '✈️', context: '旅行愿望', ko: '한국에 가고 싶어요. 그래서 요즘 열심히 공부하고 있어요.', zh: '想去韩国，所以最近在努力学习。' },
      { icon: '☕', context: '日程安排', ko: '수업이 끝난 다음에 카페에 공부하러 가요.', zh: '课结束后去咖啡店学习。' },
      { icon: '💬', context: '对话练习', ko: '무슨 노래를 배우고 싶어요? 그런데 알겠어요, 같이 해 봐요!', zh: '想学什么歌？话说明白了，一起来试试吧！' },
      { icon: '🏠', context: '日常习惯', ko: '샤워한 후에 드라마를 봐요. 그런데 요즘 너무 피곤해요. 그래서 일찍 자고 싶어요.', zh: '洗澡后看电视剧。但最近太累了，所以想早睡。' },
    ],
    mistakes: [
      { wrong: '노래를 들고 있어요（想说正在听歌）', correct: '노래를 듣고 있어요', note: '-고 接续时 ㄷ 不规则不发生，듣다→듣고。' },
      { wrong: '커피고 싶어요', correct: '커피를 마시고 싶어요', note: '-고 싶어요 接动词，不直接接名词，需补出动词。' },
      { wrong: '알세요?', correct: '아세요?', note: '알다 + -세요 → ㄹ 脱落 → 아세요。' },
      { wrong: '먹러 가요', correct: '먹으러 가요', note: '받침 있는 + 으러，먹다→먹으러 가요。' },
      { wrong: '먹은 전에', correct: '먹기 전에', note: '-기 전에 前用名词化 -기，不用 -은/ㄴ。' },
      { wrong: '그러면을 "但是"로 사용', correct: '그러면（那么，条件顺接）/ 그렇지만（但是，转折）', note: '두 词意思完全不同，不能混用。' },
    ],
        compareHtml: `<div class="card-title">第三章综合练习</div>
<div class="card-body">完成这份练习，检验第三章前 10 课是否掌握。涵盖进行时、经历回顾、愿望、ㄹ 不规则、意愿选择、疑问词、连接词、目的表达、时间顺序等核心知识点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">本课复习</div><div style="font-size:16px;color:#89756e;margin-top:2px">一课一句核心</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 있다</span><span style="font-size:16px;color:#5a4640">正在做</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">-았었/었었</span><span style="font-size:16px;color:#5a4640">曾经……过</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">核心知识点</div><div style="font-size:16px;color:#89756e;margin-top:2px">全章重点</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 싶다 / 그러면</span><span style="font-size:16px;color:#5a4640">想做 / 那样的话</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">ㄹ不规则 / -을/ㄹ래요</span><span style="font-size:16px;color:#5a4640">变形 / 意愿选择</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">综合练习建议</div><div style="font-size:16px;color:#5a4640">遇到不确定的题，先回想"这是哪节课的知识点"，再作答。第三章的核心是"时间"和"目的"——什么时候做、为什么做、做了什么之后发生什么。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">如果大部分题都答对了，说明第三章掌握得不错，可以进入第四章。</div></div>
<div class="reminder-box">综合练习不计成绩，目的是帮你发现哪里还不熟练。答错了就回去复习对应的课次。</div>`,
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 综合练习</span>
  <div class="ov-title">综合练习③</div>
  <div class="ov-sub">第三章 10 课核心知识点总览</div>
  <div class="ov-sec">
    <h3>① 进行 & 经历</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">있어요</b>（正在做）/ -고 <b style="color:#ff7fa8">있었어요</b>（过去正在做）<br>
      穿戴类：입고/쓰고/들고 <b style="color:#ff7fa8">있어요</b>（穿着/戴着/拿着）<br>
      -<b style="color:#2db89b">았었/었었어요</b>（以前曾经……）；하다→했었어요；名词→이었었어요
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 愿望 & 意愿</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">싶어요</b>（想做）；그러면/그럼（那么，条件顺接）<br>
      -을/ㄹ<b style="color:#2db89b">래요</b>（我要/要不要）；<b style="color:#6b7ff0">알겠어요</b>（明白了）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ ㄹ 不规则</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      接元音 → ㄹ <b style="color:#2db89b">保留</b>：살아요, 알아요, 만들어요<br>
      接 ㄴ/ㅂ/ㅅ → ㄹ <b style="color:#ff7fa8">脱落</b>：사세요, 삽니다, 아세요
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 疑问词 & 连接词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">무슨</b>（名称/属性）/ <b style="color:#2db89b">어느</b>（选项）/ <b style="color:#6b7ff0">어떤</b>（特点）<br>
      <b style="color:#ff7fa8">그렇지만</b>（但是）/ <b style="color:#2db89b">그런데</b>（不过/话题转换）<br>
      <b style="color:#e8a87c">그래서</b>（所以）/ <b style="color:#6b7ff0">그러니까</b>（所以/因此，带劝告）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⑤ 目的 & 时间顺序</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -(으)러 가요（去做某事）；-을/ㄹ까요?（要不要……）<br>
      -은/ㄴ <b style="color:#ff7fa8">후에</b>（之后，看 받침）；-기 <b style="color:#2db89b">전에</b>（之前，不看 받침）
    </div>
  </div>
</div>`,
  },
];
