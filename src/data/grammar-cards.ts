import type { GrammarCard } from '@/types';

// 第1课完整内容，其余课次为占位（内容待录入）
export const grammarCards: GrammarCard[] = [
  {
    id: 'card-p1-l01',
    partNumber: 1,
    lessonNumber: 1,
    title: '韩语句子结构',
    whatItDoes: '韩语语序和中文不一样',
    whatItDoesBody: '只需要记住一件事，就能看懂大多数韩语句子。\n和中文最大的不同：\n动词永远在句子最后，而中文动词在中间。',
    structureNote: '下面展示的是韩语最基本的句子框架。\n不需要背，先看懂每个位置放什么就够了。',
    rulesNote: '韩语靠"助词"标记每个词的角色，所以词序比中文灵活。\n这几条规则是骨架，后面每节课都会用到。',
    scenarioNote: '韩语的SOV语序在所有场合都适用从日常聊天到正式演讲。\n先记住动词永远在句末，其他慢慢来。',
    conceptCompare: {
      zh: '我 · 吃 · 饭',
      ko: '저는 · 밥을 · 먹어요',
      note: '韩语不是按中文顺序翻译的。<b>动词/形容词永远放在句子最末尾。</b><br><br>记住这一点，后面的助词、时态、敬语都会更容易理解。',
    },
    structures: [
      {
        ko: '저는 밥을 먹어요',
        zh: '我吃饭。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 가요',
        zh: '我去学校。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '저는 이 노래를 좋아해요',
        zh: '我喜欢这首歌。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '이 노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 저는 도서관에서 책을 읽어요',
        zh: '今天我在图书馆读书。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '저는', role: 'subject' },
          { text: '도서관에서', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '谓语放句末',     examples: '动词/形容词永远是最后一个词，不管句子多长' },
      { type: 'rule',    text: '时间状语放句首',  examples: '오늘（今天）・지금（现在）・내일（明天）通常放最前面' },
      { type: 'usage',   text: '助词标记成分',    examples: '은/는（话题）・을/를（宾语）・에（方向/地点）・에서（动作发生地）' },
      { type: 'usage',   text: '先看句尾',        examples: '遇到长句跳到最后一个词，先判断「做什么/是什么」' },
      { type: 'note',    text: '主语可省略',      examples: '对话中语境清楚时，저는 可以不说，直接说 밥을 먹어요' },
      { type: 'note',    text: '否定放动词前',    examples: '안 먹어요（不吃）・못 가요（不能去）' },
      { type: 'example', text: '저는 밥을 먹어요 / 오늘 저는 도서관에서 책을 읽어요 / 저는 이 노래를 좋아해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。',
        swapWords: ['커피를', '물을', '주스를', '차를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '我去学校。',
        swapWords: ['학교에', '회사에', '카페에', '집에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我学习韩语。',
        swapWords: ['한국어를', '영어를', '일본어를', '이 드라마를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '저는', role: 'subject' },
          { text: '집에서', role: 'place' },
          { text: '음악을', role: 'object' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '今天我在家听音乐。',
        swapWords: ['음악을 들어요', '드라마를 봐요', '책을 읽어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '👋', context: '初次见面', ko: '저는 학생이에요.', zh: '我是学生。' },
      { icon: '☕', context: '日常出行', ko: '저는 카페에 가요.', zh: '我去咖啡店。' },
      { icon: '📓', context: '韩语日记', ko: '오늘 저는 집에서 쉬어요.', zh: '今天我在家休息。' },
      { icon: '🍜', context: '点餐场景', ko: '저는 라면을 먹어요.', zh: '我吃拉面。' },
      { icon: '🏫', context: '学校生活', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。' },
      { icon: '🎵', context: 'KPOP 入门', ko: '저는 이 노래를 좋아해요.', zh: '我喜欢这首歌。' },
    ],
    mistakes: [
      { wrong: '저는 먹어요 밥을', correct: '저는 밥을 먹어요', note: '按中文顺序硬翻。谓语必须放句末，不能放中间。' },
      { wrong: '저 밥 먹어요', correct: '저는 밥을 먹어요', note: '助词是韩语骨架，은/는·을/를 不能省。先学完整句，再了解口语省略。' },
      { wrong: '저는 읽어요 도서관에서 책을', correct: '저는 도서관에서 책을 읽어요', note: '遇到长句先看最后一个词，再回头理清谁做了什么，不要按中文顺序把动词放在中间。' },
      { wrong: '오늘 저는 도서관 읽어요', correct: '오늘 저는 도서관에서 책을 읽어요', note: '地点助词 에서 不能省，宾语 책을 也不能省，助词是成分标记符号。' },
    ],
    readingGuide: {
      title: '先看句尾，再往前拆',
      body: '这个习惯能让你快速理解任何韩语句子，即使它很长。',
      steps: [
        { num: 1, text: '先看<span>句尾</span>：判断动作还是状态' },
        { num: 2, text: '再看<span>谁</span>在做这件事' },
        { num: 3, text: '最后补充<span>对象、地点、时间</span>' },
      ],
      demo: {
        ko: '저는 도서관에서 책을 읽어요.',
        rows: [
          { label: '① 句尾', text: '<span style="background:#ff7fa8;color:white;padding:3px 9px;border-radius:7px;font-size:13px;font-weight:700">읽어요 → 读</span>' },
          { label: '② 谁', text: '<span style="background:#ddf5ef;color:#2db89b;padding:3px 9px;border-radius:7px;font-size:13px;font-weight:700">저는 → 我</span>' },
          { label: '③ 补充', text: '도서관에서（在图书馆）책을（书）' },
        ],
        result: '→ 我在图书馆读书。',
      },
    },
    specialQuiz: {
      type: 'judge',
      title: '哪句是对的？',
      body: '两句中只有一句语序正确，点击选出正确的那句。',
      questions: [
        { options: ['저는 학교에 갑니다', '저는 갑니다 학교에'], answer: 0, explanation: '갑니다（去）是动词，必须放句末，학교에（去学校）放在动词前面。' },
        { options: ['저는 밥을 먹어요', '저는 먹어요 밥을'], answer: 0, explanation: '먹어요（吃）是动词，必须放句末，밥을（饭）是宾语放在动词前面。' },
        { options: ['책이 있어요', '있어요 책이'], answer: 0, explanation: '있어요 表示"有/存在"，也是谓语，同样要放在句末。' },
      ],
    },
    compareHtml: `<div class="card-title">韩语语序 vs 中文语序</div>
<div class="card-body">韩语是 SOV 语序（主语+宾语+动词），中文是 SVO（主语+动词+宾语）。动词永远在句末——这是韩语所有句子的铁则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">中文语序（SVO）</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词在宾语前</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">我 喝 咖啡。</span><span style="font-size:14px;color:#5a4640">主→动→宾</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">他 看 电影。</span><span style="font-size:14px;color:#5a4640">主→动→宾</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">韩语语序（SOV）</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词在句末</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 커피를 마셔요.</span><span style="font-size:14px;color:#5a4640">主→宾→动</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저는 영화를 봐요.</span><span style="font-size:14px;color:#5a4640">主→宾→动</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">助词标记成分</div><div style="font-size:15px;color:#5a4640">韩语靠助词（는/가/를/에）标记每个词的成分，语序可以调整但动词必须在末尾。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">저는（主）커피를（宾）마셔요（谓）— 助词告诉你谁是主语谁是宾语。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">커피를 저는 마셔요 — 调换顺序仍然正确，因为助词没变。</div></div>
<div class="reminder-box">커피를 마셔요 저는 ✗（动词不在末尾）— 无论怎么调顺序，动词必须在最后。这是韩语语序唯一不能打破的规则。</div>`,
    compareLabel: '韩语语序（SOV）vs 中文语序（SVO）',
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 1 课 · 已完成</div>
      <div class="ov-hero-title">韩语句子结构</div>
      <div class="ov-hero-sub">动词放最后 · 助词标成分 · 先看句尾再往前拆</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:10px">动词/形容词永远放在句子最末尾</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="pill p-s">저는（我）</span><span class="pill p-o">밥을（饭）</span><span class="pill p-v">먹어요（吃）</span></div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四种基础结构</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">밥을</span><span class="tok t-v">먹어요</span></div><div class="struct-zh">我吃饭。· 主+宾+谓</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-p">학교에</span><span class="tok t-v">가요</span></div><div class="struct-zh">我去学校。· 主+地点+谓</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">이 노래를</span><span class="tok t-v">좋아해요</span></div><div class="struct-zh">我喜欢这首歌。· 主+宾+谓</div></div>
          <div><div class="tok-row"><span class="tok t-t">오늘</span><span class="tok t-s">저는</span><span class="tok t-p">도서관에서</span><span class="tok t-o">책을</span><span class="tok t-v">읽어요</span></div><div class="struct-zh">今天我在图书馆读书。· 时+主+地+宾+谓</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">阅读三步法</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</span><span style="font-size:13px;color:#241917;font-weight:600">先看<span style="color:#ff7fa8">句尾</span>：判断动作还是状态</span></div>
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</span><span style="font-size:13px;color:#241917;font-weight:600">再看<span style="color:#ff7fa8">谁</span>在做这件事</span></div>
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</span><span style="font-size:13px;color:#241917;font-weight:600">最后补充<span style="color:#ff7fa8">对象、地点、时间</span></span></div>
        </div>
        <div style="background:#fff0f5;border-radius:12px;padding:12px;margin-top:10px">
          <div style="font-size:14px;font-weight:800;color:#241917;margin-bottom:8px">저는 도서관에서 책을 읽어요.</div>
          <div style="font-size:12px;color:#89756e;line-height:1.8">① 읽어요（读）→ ② 저는（我）→ ③ 도서관에서（在图书馆）책을（书）<br><b style="color:#5a4640">→ 我在图书馆读书。</b></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#c89020"></div><div class="ov-section-title" style="color:#c89020">常用助词</div></div>
      <div class="ov-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#241917">은/는</div><div style="font-size:11px;color:#89756e;margin-top:2px">提示话题</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#241917">을/를</div><div style="font-size:11px;color:#89756e;margin-top:2px">提示宾语</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#241917">에</div><div style="font-size:11px;color:#89756e;margin-top:2px">方向 / 时间</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#241917">에서</div><div style="font-size:11px;color:#89756e;margin-top:2px">动作发生地点</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
      <div class="ov-block">
        <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 먹어요 밥을</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 밥을 먹어요</span></div></div>
        <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저 밥 먹어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 밥을 먹어요</span></div></div>
      </div>
    </div>
  </div>`,
  },

  // ── 第2课：正式礼貌体 ──────────────────────────────────────
  {
    id: 'card-p1-l02',
    partNumber: 1,
    lessonNumber: 2,
    title: '-ㅂ니다/습니다, -입니다',
    whatItDoes: '正式场合的礼貌说法',
    whatItDoesBody: '一种语气，搞定面试、课堂、公告三大场景。',
    structureNote: '下面是正式体的三种句型。\n先认识「词干有无收音→词尾变化」这一条，剩下的靠感觉就能记住。',
    rulesNote: '词尾变化只看一件事：\n词干最后一个音节有没有收音（받침）。\n这和中文完全不同，但两条规则就能覆盖所有情况。',
    scenarioNote: '正式体用在面试、课堂提问、公开演讲、新闻播报。\n和朋友或平辈说话用这种语气会显得很生硬，日常聊天下节课学。',
    step0Html: `
      <div class="card-title">正式场合这样说</div>
      <div class="card-body">一种语气，搞定面试、课堂、公告三大场景。</div>
      <div class="hook-box">
        <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同一件事，两种说法</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">正式体</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생입니다.</div>
            <div style="font-size:12px;color:#89756e;margin-top:2px">我是学生。（面试 / 课堂）</div>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">日常体（下节课学）</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생이에요.</div>
            <div style="font-size:12px;color:#89756e;margin-top:2px">我是学生。（日常聊天）</div>
          </div>
        </div>
        <div style="font-size:13px;color:#ff7fa8;font-weight:700">👆 这节课先学正式体，打好基础</div>
      </div>
      <div class="reminder-box">正式体常用于：<b>自我介绍、课堂回答、新闻播报、面试、公告</b>。<br>先记住这一课，下一课就学日常版本。</div>
    `,
    compareHtml: `<div class="card-title">名词句 vs 动词句 — 正式体选哪个</div>
<div class="card-body">正式体最关键的判断：前面是名词还是动词/形容词？两种情况用完全不同的词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词/形容词 → -ㅂ/습니다</div><div style="font-size:14px;color:#89756e;margin-top:2px">看词干有无收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갑니다</span><span style="font-size:14px;color:#5a4640">无收音 → -ㅂ니다</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹다 → 먹습니다</span><span style="font-size:14px;color:#5a4640">有收音 → -습니다</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">名词 → 입니다</div><div style="font-size:14px;color:#89756e;margin-top:2px">直接加 입니다，不看收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학생 → 학생입니다</span><span style="font-size:14px;color:#5a4640">我是学生。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교 → 학교입니다</span><span style="font-size:14px;color:#5a4640">这是学校。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词最常用</div><div style="font-size:15px;color:#5a4640">所有 하다 动词直接变 합니다：공부하다→공부합니다，좋아하다→좋아합니다。不需要判断收音，先把 합니다 背熟。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">疑问句只换词尾：입니다→입니까? / 갑니다→갑니까? / 먹습니다→먹습니까?</div></div>
<div class="reminder-box">中文"我是学生"和"我去学校"里"是"和"去"是动词，韩语却分两套词尾。名词句用 입니다，动词句看收音选 ㅂ니다/습니다——这是正式体最容易搞混的地方。</div>`,
    structures: [
      {
        ko: '저는 학생입니다',
        zh: '我是学生。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생입니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부합니다',
        zh: '我学习韩语。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부합니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 밥을 먹습니다',
        zh: '我吃饭。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹습니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 갑니다',
        zh: '我去学校。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갑니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干无收音 → -ㅂ니다 / -ㅂ니까?', examples: '가다→갑니다 / 마시다→마십니다' },
      { type: 'rule',    text: '词干有收音 → -습니다 / -습니까?',  examples: '먹다→먹습니다 / 읽다→읽습니다' },
      { type: 'rule',    text: '하다 固定变 합니다',               examples: '공부하다→공부합니다 / 연습하다→연습합니다' },
      { type: 'rule',    text: '体词（名词）→ 입니다 / 입니까?',   examples: '학생→학생입니다 / 친구→친구입니다' },
      { type: 'usage',   text: '疑问句只换词尾',                   examples: '-ㅂ니다→-ㅂ니까? / -습니다→-습니까? / 입니다→입니까?' },
      { type: 'compare', text: '正式体 vs 日常体不可混用',          examples: '입니다/합니다 是一套；이에요/해요 是另一套' },
      { type: 'example', text: '저는 회사원입니다 / 저는 음악을 듣습니다 / 여기는 서울입니까?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생입니다', role: 'verb' },
        ],
        zh: '我是学生。',
        swapRole: 'verb',
          swapWords: ['선생님입니다', '회사원입니다', '요리사입니다'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부합니다', role: 'verb' },
        ],
        zh: '我学习韩语。',
        swapRole: 'verb',
          swapWords: ['공부합니다', '배웁니다', '연습합니다'],
      },
      {
        wordBlocks: [
          { text: '음악을', role: 'object' },
          { text: '듣습니다', role: 'verb' },
        ],
        zh: '听音乐。',
        swapWords: ['듣습니다', '찾습니다', '삽니다'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '카페에', role: 'place' },
          { text: '갑니다', role: 'verb' },
        ],
        zh: '我去咖啡店。',
        swapWords: ['카페에', '학교에', '서울에'],
        swapRole: 'place',
      },
    ],
    scenarios: [
      { icon: '🎤', context: '初次见面', ko: '저는 김민준입니다. 중국 사람입니다.', zh: '我是金民俊。是中国人。' },
      { icon: '🎓', context: '课堂回答', ko: '저는 한국어를 공부합니다.', zh: '我学习韩语。' },
      { icon: '📢', context: '广播/公告', ko: '수업을 시작합니다.', zh: '开始上课。' },
      { icon: '💼', context: '面试开场', ko: '저는 회사원입니다. 잘 부탁드립니다.', zh: '我是公司职员。请多关照。' },
      { icon: '🎵', context: 'KPOP 字幕正式字', ko: '저는 음악을 좋아합니다.', zh: '我喜欢音乐。（正式体字幕）' },
      { icon: '🗺️', context: '旅行问路', ko: '여기는 명동입니까?', zh: '这里是明洞吗？' },
    ],
    mistakes: [
      { wrong: '먹ㅂ니다', correct: '먹습니다', note: '먹 词干有收音，所以用 -습니다，不是 -ㅂ니다。' },
      { wrong: '가습니다', correct: '갑니다', note: '가 词干无收音，所以用 -ㅂ니다，不是 -습니다。' },
      { wrong: '학생습니다', correct: '학생입니다', note: '학생 是名词，名词后用 입니다，不是 습니다。' },
      { wrong: '저는 학생입니다. 공부해요.', correct: '저는 학생입니다. 공부합니다.', note: '입니다/합니다 是正式体；이에요/해요 是日常体，一句话里选一种，不要混用。' },
    ],
    quickTable: {
      title: '一张表搞定所有变化',
      body: '陈述句和疑问句结构完全对称，换个词尾就好。',
      headers: ['词性/规则', '陈述句', '疑问句', '例子'],
      rows: [
        ['动词/形容词\n词干无收音', { ko: '-ㅂ니다', zh: '正式体陈述句' }, { ko: '-ㅂ니까?', zh: '正式体疑问句' }, { ko: '가다→갑니다\n마시다→마십니다', zh: '去→正式体\n喝→正式体' }],
        ['动词/形容词\n词干有收音', { ko: '-습니다', zh: '正式体陈述句' }, { ko: '-습니까?', zh: '正式体疑问句' }, { ko: '앉다→앉습니다\n먹다→먹습니다', zh: '坐→正式体\n吃→正式体' }],
        ['하다 型动词', { ko: '합니다', zh: '하다正式体' }, { ko: '합니까?', zh: '하다正式疑问' }, { ko: '공부하다→공부합니다', zh: '学习→正式体' }],
        ['体词（名词）', { ko: '-입니다', zh: '名词正式体' }, { ko: '-입니까?', zh: '名词正式疑问' }, { ko: '학생→학생입니다\n친구→친구입니다', zh: '学生→正式体\n朋友→正式体' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选出正确的变形结果',
      body: '根据词典形，选出正确的正式体变形。',
      questions: [
        { prompt: '词典形：가다（去）', options: ['갑니다', '가습니다', '가ㅂ니다'], answer: 0, explanation: '가 词干无收音→用 -ㅂ니다，所以是 갑니다。' },
        { prompt: '词典形：먹다（吃）', options: ['먹ㅂ니다', '먹습니다', '먹이다'], answer: 1, explanation: '먹 词干有收音→用 -습니다，所以是 먹습니다。' },
        { prompt: '词典形：하다（做）', options: ['하ㅂ니다', '하습니다', '합니다'], answer: 2, explanation: '하다 固定变 합니다，这是唯一特例，直接记住。' },
        { prompt: '词典形：읽다（读）', options: ['읽ㅂ니다', '읽습니다', '읽어요'], answer: 1, explanation: '읽 词干有收音→用 -습니다，所以是 읽습니다。' },
      ],
    },
    linkedGrammarIds: ['gp-02'],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 2 课 · 已完成</div>
      <div class="ov-hero-title">正式礼貌体</div>
      <div class="ov-hero-sub">-ㅂ/습니다 · 입니다 · 합니다 · 名词句</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:10px">正式体四种情况</div>
        <div class="table-wrap">
          <div class="tbl-row hd"><div class="tc">类型</div><div class="tc">陈述</div><div class="tc">疑问</div><div class="tc">例子</div></div>
          <div class="tbl-row"><div class="tc">无收音</div><div class="tc" style="color:#6b7ff0;font-weight:800">-ㅂ니다</div><div class="tc" style="color:#c89020">-ㅂ니까?</div><div class="tc">갑니다</div></div>
          <div class="tbl-row"><div class="tc">有收音</div><div class="tc" style="color:#6b7ff0;font-weight:800">-습니다</div><div class="tc" style="color:#c89020">-습니까?</div><div class="tc">먹습니다</div></div>
          <div class="tbl-row"><div class="tc">하다</div><div class="tc" style="color:#6b7ff0;font-weight:800">합니다</div><div class="tc" style="color:#c89020">합니까?</div><div class="tc">공부합니다</div></div>
          <div class="tbl-row"><div class="tc">名词</div><div class="tc" style="color:#ff7fa8;font-weight:800">입니다</div><div class="tc" style="color:#ff7fa8">입니까?</div><div class="tc">학생입니다</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생입니다</span></div><div style="font-size:12px;color:#89756e">我是学生。· 名词句</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">한국어를</span><span class="tok t-v">공부합니다</span></div><div style="font-size:12px;color:#89756e">我学习韩语。· 하다 动词</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">밥을</span><span class="tok t-v">먹습니다</span></div><div style="font-size:12px;color:#89756e">我吃饭。· 词干有收音</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">학교에</span><span class="tok t-v">갑니다</span></div><div style="font-size:12px;color:#89756e">我去学校。· 词干无收音</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
      <div class="ov-block">
        <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹ㅂ니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹습니다（词干有收音，用 습니다）</span></div></div>
        <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생입니다（名词用 입니다）</span></div></div>
      </div>
    </div>
  </div>`,
  },

  // ── 第3课：日常礼貌体 ──────────────────────────────────────
  {
    id: 'card-p1-l03',
    partNumber: 1,
    lessonNumber: 3,
    title: '-아/어/여요, -예요/이에요',
    whatItDoes: '日常对话最常用的说法',
    whatItDoesBody: '和朋友聊天、发动态、追剧评论，全靠这一课。\n和中文不同：\n韩语动词分两套说法，하다 动词直接变成 해요，其他动词要看词干最后一个元音来决定接 아요 还是 어요。',
    structureNote: '这节课的句型是日常生活里用得最多的。\n同样先看框架，不用担心所有变化规则，练习的时候自然就记住了。',
    rulesNote: '变化规则看起来多，但核心只有一条：\n词干最后的元音决定用 아요 还是 어요。\n하다 动词直接记 해요 就行。',
    scenarioNote: '해요 体是韩语里使用频率最高的语体，聊天、发消息、追剧评论、和陌生人对话都用这个。\n学好这课，日常80%的场景都能应对。',
    step0Html: `
      <div class="card-title">日常最常用的说法</div>
      <div class="card-body">和朋友聊天、发动态、追剧评论，全靠这一课。</div>
      <div class="hook-box">
        <div style="font-size:12px;font-weight:800;color:#89756e;margin-bottom:12px">上节课 vs 这节课</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">正式体（第2课）</div>
            <div style="font-size:15px;font-weight:800;color:#241917">저는 학생입니다.</div>
            <div style="font-size:11px;color:#89756e;margin-top:2px">适合面试、课堂、公告</div>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">日常体（这节课）✨</div>
            <div style="font-size:15px;font-weight:800;color:#241917">저는 학생이에요.</div>
            <div style="font-size:11px;color:#89756e;margin-top:2px">适合日常聊天、评论、日记</div>
          </div>
        </div>
        <div style="font-size:13px;color:#ff7fa8;font-weight:700">👆 日常体用得更多，这节课最重要！</div>
      </div>
      <div class="reminder-box">日常体（-아/어/여요）是韩语里用得<b>最频繁</b>的礼貌表达。掌握它，就能开口说大部分日常韩语。</div>
    `,
    compareHtml: `<div class="card-title">日常体 — 动词句 vs 名词句</div>
<div class="card-body">日常体（해요 体）也分两种：动词/形容词看元音选词尾，名词看有无收音选 이에요/예요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词/形容词 → -아/어요</div><div style="font-size:14px;color:#89756e;margin-top:2px">看词干末元音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 가요</span><span style="font-size:14px;color:#5a4640">ㅏ/ㅗ → -아요（缩合）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹다 → 먹어요</span><span style="font-size:14px;color:#5a4640">其他 → -어요</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">名词 → 이에요 / 예요</div><div style="font-size:14px;color:#89756e;margin-top:2px">看名词有无收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학생 → 학생이에요</span><span style="font-size:14px;color:#5a4640">有收音 → 이에요</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교 → 학교예요</span><span style="font-size:14px;color:#5a4640">无收音 → 예요</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词最好记</div><div style="font-size:15px;color:#5a4640">所有 하다 动词统一变 해요：공부하다→공부해요，좋아하다→좋아해요。不需要判断元音，先把这个规律背熟，能说出大部分日常句子。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">和中文不同：中文"是学生"和"去学校"结构一样，韩语名词句（이에요）和动词句（가요）用完全不同的词尾。</div></div>
<div class="reminder-box">예요 vs 이에요 速记：학교예요（无收音，直接 예요）/ 학생이에요（有收音，加 이）。疑问句语调上扬即可，不换词尾。</div>`,
    structures: [
      {
        ko: '저는 학생이에요',
        zh: '我是学生。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
      },
      {
        ko: '여기는 카페예요',
        zh: '这里是咖啡店。',
        tokens: [
          { text: '여기는', role: 'subject' },
          { text: '카페예요', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부해요',
        zh: '我学习韩语。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래가 좋아요',
        zh: '这首歌很好。',
        tokens: [
          { text: '이 노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干末元音为 ㅏ/ㅗ → -아요（常缩写）', examples: '가다→가요 / 오다→와요 / 보다→봐요' },
      { type: 'rule',    text: '其他元音 → -어요',                   examples: '먹다→먹어요 / 읽다→읽어요 / 마시다→마셔요' },
      { type: 'rule',    text: '하다 固定变 해요',                   examples: '공부하다→공부해요 / 좋아하다→좋아해요' },
      { type: 'rule',    text: '无收音名词 → -예요',                  examples: '카페→카페예요 / 가수→가수예요' },
      { type: 'rule',    text: '有收音名词 → -이에요',                examples: '학생→학생이에요 / 음악→음악이에요' },
      { type: 'note',    text: 'ㅡ 脱落：词干末为 ㅡ 时，接 -아/어요 前 ㅡ 脱落', examples: '예쁘다→예뻐요 / 크다→커요 / 아프다→아파요' },
      { type: 'example', text: '저는 학생이에요 / 이 노래가 좋아요 / 여기는 카페예요 / 오늘 날씨가 좋아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
        zh: '我是学生。',
        swapWords: ['학생이에요', '팬이에요', '회사원이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '여기는', role: 'subject' },
          { text: '카페예요', role: 'verb' },
        ],
        zh: '这里是咖啡店。',
        swapWords: ['카페예요', '학교예요', '식당이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。',
        swapWords: ['마셔요', '좋아해요', '사요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '这首歌很好。',
        swapRole: 'subject',
          swapWords: ['이 노래가', '이 무대가', '이 가사가'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '日常自我介绍', ko: '저는 중국 사람이에요.', zh: '我是中国人。' },
      { icon: '☕', context: '咖啡店日常', ko: '여기는 제가 자주 오는 카페예요.', zh: '这里是我常来的咖啡店。' },
      { icon: '📓', context: '韩语日记', ko: '오늘은 날씨가 좋아요.', zh: '今天天气很好。' },
      { icon: '🤳', context: 'SNS 打卡', ko: '저는 지금 한국어를 공부해요!', zh: '我现在正在学韩语！' },
      { icon: '🍽️', context: '餐厅点餐', ko: '이 음식이 맛있어요.', zh: '这道菜很好吃。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 드라마가 정말 재미있어요.', zh: '这部剧真的很有趣。' },
    ],
    mistakes: [
      { wrong: '학생예요', correct: '학생이에요', note: '학생 有收音 ㅇ，所以用 이에요。记住：有收音→이에요。' },
      { wrong: '학교이에요', correct: '학교예요', note: '학교 无收音，所以用 예요。记住：无收音→예요。' },
      { wrong: '공부하요', correct: '공부해요', note: '하다 动词变日常体要变成 해요，不是 하요。하→해！' },
      { wrong: '저는 학생입니다 + 저는 카페예요 混搭', correct: '同一段话选一种语体', note: '正式体（입니다）和日常体（예요/이에요）不要混用，语感会很奇怪。' },
    ],
    quickTable: {
      title: '正式体 vs 日常体对照',
      body: '两课内容放一起，对比记忆更高效。',
      headers: ['词性/规则', '正式体（第2课）', '日常体（这节课）'],
      rows: [
        ['动词/形容词\n词干末元音 ㅏ/ㅗ', { ko: '-ㅂ니다', zh: '正式体陈述' }, { ko: '-아요', zh: '日常体ㅏ/ㅗ结尾' }],
        ['动词/形容词\n其他情况', { ko: '-습니다', zh: '正式体陈述' }, { ko: '-어요', zh: '日常体其他' }],
        ['하다 型动词', { ko: '합니다', zh: '하다正式体' }, { ko: '해요', zh: '하다日常体' }],
        ['名词（无收音）', { ko: '입니다', zh: '名词正式体' }, { ko: '-예요', zh: '无收音名词日常' }],
        ['名词（有收音）', { ko: '입니다', zh: '名词正式体' }, { ko: '-이에요', zh: '有收音名词日常' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选出正确的日常体变形',
      body: '根据词典形，选出正确的日常体变形。',
      questions: [
        { prompt: '词典形：가다（去）', options: ['가요', '거요', '해요'], answer: 0, explanation: '词干 가 末元音为 ㅏ→아요→缩写为 가요。' },
        { prompt: '词典形：먹다（吃）', options: ['먹요', '먹어요', '먹아요'], answer: 1, explanation: '词干 먹 末元音非 ㅏ/ㅗ→어요→먹어요。' },
        { prompt: '词典形：하다（做）', options: ['하어요', '하요', '해요'], answer: 2, explanation: '하다 固定变 해요，是唯一的特殊变化，直接记。' },
        { prompt: '词典形：오다（来）', options: ['오요', '와요', '오어요'], answer: 1, explanation: '오 末元音为 ㅗ→아요→오+아요 缩约成 와요。' },
      ],
    },
    linkedGrammarIds: ['gp-01'],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 3 课 · 已完成</div>
      <div class="ov-hero-title">日常礼貌体</div>
      <div class="ov-hero-sub">-아/어/여요 · 예요/이에요 · 하다→해요</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div class="table-wrap">
          <div class="tbl-row hd"><div class="tc">类型</div><div class="tc">正式体</div><div class="tc">日常体</div></div>
          <div class="tbl-row"><div class="tc">词干末元音 ㅏ/ㅗ</div><div class="tc">-ㅂ니다</div><div class="tc" style="color:#ff7fa8;font-weight:800">-아요</div></div>
          <div class="tbl-row"><div class="tc">词干末元音其他</div><div class="tc">-습니다</div><div class="tc" style="color:#ff7fa8;font-weight:800">-어요</div></div>
          <div class="tbl-row"><div class="tc">하다 型动词</div><div class="tc">합니다</div><div class="tc" style="color:#ff7fa8;font-weight:800">해요</div></div>
          <div class="tbl-row"><div class="tc">无收音名词</div><div class="tc">입니다</div><div class="tc" style="color:#ff7fa8;font-weight:800">예요</div></div>
          <div class="tbl-row"><div class="tc">有收音名词</div><div class="tc">입니다</div><div class="tc" style="color:#ff7fa8;font-weight:800">이에요</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생이에요</span></div><div style="font-size:12px;color:#89756e">我是学生。· 有收音名词</div></div>
          <div><div class="tok-row"><span class="tok t-s">여기는</span><span class="tok t-v">카페예요</span></div><div style="font-size:12px;color:#89756e">这里是咖啡店。· 无收音名词</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">한국어를</span><span class="tok t-v">공부해요</span></div><div style="font-size:12px;color:#89756e">我学习韩语。· 하다→해요</div></div>
          <div><div class="tok-row"><span class="tok t-s">이 노래가</span><span class="tok t-v">좋아요</span></div><div style="font-size:12px;color:#89756e">这首歌很好。· 词干元音 ㅗ→아요</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
      <div class="ov-block">
        <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이에요（有收音→이에요）</span></div></div>
        <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">공부하요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">공부해요（하다→해요）</span></div></div>
      </div>
    </div>
  </div>`,
  },

  // ── 第4课：은/는 ──────────────────────────────────────────
  {
    id: 'card-p1-l04',
    partNumber: 1,
    lessonNumber: 4,
    title: '은/는',
    whatItDoes: '把话题提出来，说"是/不是"',
    whatItDoesBody: '一个助词，让对方知道你接下来要说谁/什么，还能制造对比感。',
    structureNote: '은/는 加在句子主题后面，告诉听者「接下来说的是关于这个的」。\n下面的结构展示它出现在哪个位置。',
    rulesNote: '只需要看一件事：\n这个词最后有没有收音（받침）。\n有收音用 은，没有用 는。\n这个规则贯穿韩语所有助词，掌握了很有用。',
    scenarioNote: '은/는 在几乎所有句子里都会出现自我介绍、描述事物、做对比都用它。\n中文通常省略这个位置的词，所以初学者容易忘加。',
    compareLabel: '有收音 vs 无收音',
    step0Html: `
      <div class="card-title">提出话题的小标记</div>
      <div class="card-body">一个助词，让对方知道你接下来要说谁/什么。</div>
      <div class="hook-box">
        <div style="font-size:12px;font-weight:800;color:#89756e;margin-bottom:10px">为什么韩语需要 은/는？</div>
        <div style="background:white;border-radius:14px;padding:14px;margin-bottom:12px">
          <div style="font-size:15px;font-weight:800;color:#241917;margin-bottom:6px">저는 학생이에요.</div>
          <div style="font-size:12px;color:#89756e;line-height:1.7">拆开来看：<br>
            <span style="background:#ddf5ef;color:#2db89b;padding:2px 8px;border-radius:6px;font-weight:700">저</span>（我）+
            <span style="background:#fff0f5;color:#ff7fa8;padding:2px 8px;border-radius:6px;font-weight:700">는</span>（话题标记）+
            학생이에요（是学生）<br><br>
            는 告诉听者：<b>「关于我嘛——」</b>，接下来说的是我的事。
          </div>
        </div>
        <div style="font-size:13px;color:#ff7fa8;font-weight:700">👆 은/는 = 「关于……嘛」「说到……」</div>
      </div>
      <div class="reminder-box">은/는 最主要的作用：<b>1) 提出话题</b>，<b>2) 做对比</b>。<br>这节课先学这两点，下一步再和 이/가 做区分。</div>
    `,
    compareHtml: `<div class="card-title">은/는 — 两个字，选一个</div>
<div class="card-body">选 은 还是 는，只看前面名词最后有没有收音。中文没有话题助词，但韩语的 은/는 是最常用的助词之一。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">有收音 → 은</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节有辅音收尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">책 → 책은</span><span style="font-size:14px;color:#5a4640">书（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학생 → 학생은</span><span style="font-size:14px;color:#5a4640">学生（话题）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">无收音 → 는</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저 → 저는</span><span style="font-size:14px;color:#5a4640">我（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">커피 → 커피는</span><span style="font-size:14px;color:#5a4640">咖啡（话题）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">은/는 的两个核心作用</div><div style="font-size:15px;color:#5a4640">① 提出话题：저는 학생이에요（说到我，我是学生）<br>② 做对比：저는 가요. 친구는 안 가요.（我去，朋友不去）<br>中文"我是学生"里没有"话题标记"的概念，韩语的 은/는 明确告诉听者"接下来说的是关于这个词的事"。</div></div>
<div class="reminder-box">速记口诀：有收音 → 은，无收音 → 는。이/가（主格）和 은/는（话题）不一样——下节课专门对比。</div>`,
    structures: [
      {
        ko: '저는 학생이에요',
        zh: '我是学生。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 재미있어요',
        zh: '韩语很有意思。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
      {
        ko: '커피는 좋아해요',
        zh: '咖啡我喜欢。',
        tokens: [
          { text: '커피는', role: 'subject' },
          { text: '좋아해요', role: 'verb' },
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
      { type: 'rule',    text: '有收音名词 → 은',   examples: '책→책은 / 학생→학생은 / 한국→한국은' },
      { type: 'rule',    text: '无收音名词 → 는',   examples: '저→저는 / 학교→학교는 / 커피→커피는' },
      { type: 'usage',   text: '用法一：提出话题',  examples: '저는 학생이에요（关于我——）' },
      { type: 'usage',   text: '用法二：制造对比',  examples: '커피는 좋아해요. 차는 별로예요.' },
      { type: 'vocab',   text: '人称常见形',        examples: '저는（我，正式）/ 나는（我，口语）/ 우리는（我们）' },
      { type: 'note',    text: '은/는 ≠ "是"',     examples: '저는 里的 는 只是话题标记，"是"是后面的 이에요' },
      { type: 'example', text: '저는 중국 사람이에요 / 한국어는 재미있어요 / 오늘은 시간이 없어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
        zh: '我是学生。',
        swapRole: 'subject',
          swapWords: ['저는', '친구는', '언니는'],
      },
      {
        wordBlocks: [
          { text: '커피는', role: 'subject' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '咖啡我喜欢。',
        swapRole: 'subject',
          swapWords: ['커피는', '이 노래는', '라면은'],
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'subject' },
          { text: '바빠요', role: 'verb' },
        ],
        zh: '今天忙。',
        swapRole: 'subject',
          swapWords: ['오늘은', '내일은', '지금은'],
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '韩语很有意思。',
        swapRole: 'subject',
          swapWords: ['한국어는', '한국 음식은', '이 드라마는'],
      },
    ],
    scenarios: [
      { icon: '👤', context: '初次见面', ko: '저는 왕쯔단이에요. 중국 사람이에요.', zh: '我叫王子丹，是中国人。' },
      { icon: '☕', context: '聊偏好（对比）', ko: '커피는 좋아해요. 차는 별로예요.', zh: '咖啡我喜欢，茶一般般。' },
      { icon: '📅', context: '约时间（对比）', ko: '오늘은 바빠요. 내일은 괜찮아요.', zh: '今天忙，明天可以。' },
      { icon: '📓', context: '韩语日记话题', ko: '오늘은 날씨가 정말 좋아요.', zh: '今天天气真的很好。' },
      { icon: '🍽️', context: '餐厅偏好', ko: '한식은 좋아해요. 양식은 별로예요.', zh: '韩餐我喜欢，西餐一般般。' },
      { icon: '🎵', context: '音乐偏好', ko: '이 노래는 정말 좋아해요.', zh: '这首歌我真的很喜欢。' },
    ],
    mistakes: [
      { wrong: '책는 좋아요', correct: '책은 좋아요', note: '책 有收音 ㄱ，所以用 은，不是 는。' },
      { wrong: '저은 학생이에요', correct: '저는 학생이에요', note: '저 无收音，所以用 는，不是 은。' },
      { wrong: '저 학생이에요（省略了话题标记 는）', correct: '저는 학생이에요', note: '저는 학생이에요 里 는 是话题标记，不可省略；省略后句子缺少话题标示，语感不完整。' },
      { wrong: '는 和 이/가 混用', correct: '은/는 提话题，이/가 标主语', note: '同一句子里两者作用不同；详细区分在第2部分第3课（이/가 那课）学。' },
    ],
    quickTable: {
      title: '은/는 收音速查表',
      body: '看最后一个字有没有收音，两秒做判断。',
      headers: ['词', '中文', '有无收音', '结果'],
      rows: [
        ['저', '我', { ko: '无收音', zh: '无收音' }, { ko: '저는', zh: '我（话题）' }],
        ['우리', '我们', { ko: '无收音', zh: '无收音' }, { ko: '우리는', zh: '我们（话题）' }],
        ['장이 씨', '张伊', { ko: '无收音', zh: '无收音' }, { ko: '장이 씨는', zh: '张伊（话题）' }],
        ['선생님', '老师', { ko: '有收音 ㅁ', zh: '有收音ㅁ' }, { ko: '선생님은', zh: '老师（话题）' }],
        ['학생', '学生', { ko: '有收音 ㅇ', zh: '有收音ㅇ' }, { ko: '학생은', zh: '学生（话题）' }],
        ['한국', '韩国', { ko: '有收音 ㄱ', zh: '有收音ㄱ' }, { ko: '한국은', zh: '韩国（话题）' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选对 은/는',
      body: '根据名词有无收音，选择正确的话题助词。',
      questions: [
        { pre: '저', post: '학생이에요', options: ['은', '는'], answer: 1, explanation: '저 无收音→는。저는 학생이에요。' },
        { pre: '한국어', post: '재미있어요', options: ['은', '는'], answer: 1, explanation: '어 无收音→는。한국어는 재미있어요。' },
        { pre: '밥', post: '맛있어요', options: ['은', '는'], answer: 0, explanation: '밥 有收音 ㅂ→은。밥은 맛있어요。' },
        { pre: '학생', post: '열심히 공부해요', options: ['은', '는'], answer: 0, explanation: '생 有收音 ㅇ→은。학생은 열심히 공부해요。' },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 4 课 · 已完成</div>
      <div class="ov-hero-title">은/는 话题助词</div>
      <div class="ov-hero-sub">提出话题 · 制造对比 · 有收音→은 无收音→는</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
          <div style="background:#eaf8f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#2db89b">은</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面有收音</div><div style="font-size:12px;color:#241917;margin-top:4px">책 → 책은</div></div>
          <div style="background:#fff0f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#ff7fa8">는</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面无收音</div><div style="font-size:12px;color:#241917;margin-top:4px">저 → 저는</div></div>
        </div>
        <div style="background:#f8f4f0;border-radius:12px;padding:12px">
          <div style="font-size:11px;font-weight:800;color:#89756e;margin-bottom:8px">两大用法</div>
          <div style="font-size:13px;color:#241917;line-height:1.8"><b>1. 提出话题：</b>저는 학생이에요.<br><b>2. 制造对比：</b>커피는 좋아해요. 차는 안 좋아해요.</div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생이에요</span></div><div style="font-size:12px;color:#89756e">我是学生。</div></div>
          <div><div class="tok-row"><span class="tok t-s">한국어는</span><span class="tok t-v">재미있어요</span></div><div style="font-size:12px;color:#89756e">韩语很有意思。</div></div>
          <div><div class="tok-row"><span class="tok t-s">커피는</span><span class="tok t-v">좋아해요</span></div><div style="font-size:12px;color:#89756e">咖啡我喜欢。（对比感）</div></div>
          <div><div class="tok-row"><span class="tok t-s">오늘은</span><span class="tok t-v">바빠요</span></div><div style="font-size:12px;color:#89756e">今天忙。（含对比：今天 vs 其他天）</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
      <div class="ov-block">
        <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">책는 좋아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">책은 좋아요（有收音→은）</span></div></div>
        <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저은 학생이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 학생이에요（无收音→는）</span></div></div>
      </div>
    </div>
  </div>`,
  },

  // ── 第5课：을/를 ──────────────────────────────────────────
  {
    id: 'card-p1-l05',
    partNumber: 1,
    lessonNumber: 5,
    title: '을/를',
    whatItDoes: '标出动作的对象',
    whatItDoesBody: '을/를 告诉你动作落在谁身上相当于中文「把」字句里的对象，但韩语每次都要加，不能省略。',
    structureNote: '을/를 标记「动作的对象是谁」，位置在动词前面。\n下面的结构展示它在句子里的位置。',
    rulesNote: '跟 은/는 一样，只看最后有没有收音（받침）。\n有收音用 을，没有用 를。\n两条规则，一分钟记住。',
    scenarioNote: '只要句子里有动作（吃、喝、看、学……），动作对象后面就要加 을/를。\n中文不需要这个标记，所以刚开始会经常忘记加。',
    compareLabel: '有收音 vs 无收音',
    step0Html: `<div class="card-title">动作落在谁身上</div>
  <div class="card-body">을/를 告诉你：这个动作的「受害者」是谁。</div>
  <div class="hook-box">
    <div style="font-size:12px;font-weight:800;color:#89756e;margin-bottom:12px">을/를 是什么？</div>
    <div style="background:white;border-radius:14px;padding:14px;margin-bottom:12px">
      <div class="tok-row" style="margin-bottom:10px">
        <span class="tok t-s">저는</span>
        <span class="tok t-o">밥을</span>
        <span class="tok t-v">먹어요</span>
      </div>
      <div style="font-size:12px;color:#89756e;line-height:1.8">
        <span style="background:#ddf5ef;color:#2db89b;padding:2px 8px;border-radius:6px;font-weight:700">저는</span> 话题（我）<br>
        <span style="background:#f3eefb;color:#b49ccf;padding:2px 8px;border-radius:6px;font-weight:700">밥을</span> 动作对象（饭）← 을/를 标记这个<br>
        <span style="background:#ff7fa8;color:white;padding:2px 8px;border-radius:6px;font-weight:700">먹어요</span> 动作（吃）
      </div>
    </div>
    <div style="font-size:13px;color:#ff7fa8;font-weight:700">👆 을/를 标记动作落在哪个名词上</div>
  </div>
  <div class="reminder-box">을/를 不需要翻译成中文里的某个字。<br>它只是在说：<b>「前面这个词，是后面动作的对象。」</b></div>`,
    compareHtml: `<div class="card-title">을/를 — 两个字，选一个</div>
<div class="card-body">选 을 还是 를，和 은/는 一样只看有无收音。을/를 标记动作的宾语——动作"落"在哪个词上。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">有收音 → 을</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节有辅音收尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 → 밥을</span><span style="font-size:14px;color:#5a4640">吃饭（宾语）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">책 → 책을</span><span style="font-size:14px;color:#5a4640">读书（宾语）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">无收音 → 를</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피 → 커피를</span><span style="font-size:14px;color:#5a4640">喝咖啡（宾语）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래 → 노래를</span><span style="font-size:14px;color:#5a4640">听歌（宾语）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">을/를 vs 은/는 的区别</div><div style="font-size:15px;color:#5a4640">을/를：标宾语，标记动作的对象（"把什么"做了）<br>은/는：标话题，说"关于什么"<br>同一句话：저는（话题）커피를（宾语）마셔요。<br>中文"我喝咖啡"里没有这两种助词的区分，但韩语必须分清楚。</div></div>
<div class="reminder-box">을/를 不需要翻译成中文的某个字，它只表示"前面的词是后面动作的对象"。선생님을 좋아해요（喜欢老师）——을 就是宾格标记。</div>`,
    structures: [
      {
        ko: '저는 밥을 먹어요',
        zh: '我吃饭。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 커피를 마셔요',
        zh: '我喝咖啡。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
      },
      {
        ko: '저는 영화를 봐요',
        zh: '我看电影。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '영화를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부해요',
        zh: '我学韩语。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '有收音名词 → 을',              examples: '밥→밥을 / 책→책을 / 음악→음악을' },
      { type: 'rule',    text: '无收音名词 → 를',              examples: '커피→커피를 / 한국어→한국어를 / 노래→노래를' },
      { type: 'usage',   text: '宾语放动词前，动词在句末',      examples: '저는 밥을 먹어요（不是 저는 먹어요 밥을）' },
      { type: 'note',    text: '只有动作对象才加 을/를',        examples: '학생이에요（身份），不加 을/를' },
      { type: 'note',    text: '을/를 不用翻译成"把/将"',      examples: '理解为动作落在这个名词上即可' },
      { type: 'compare', text: '좋아하다 也加 을/를（非 이/가）', examples: '이 노래를 좋아해요（不是 이 노래가 좋아하다）' },
      { type: 'example', text: '저는 밥을 먹어요 / 저는 커피를 마셔요 / 저는 한국어를 공부해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
        zh: '我吃饭。',
        swapWords: ['밥을', '김밥을', '라면을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。',
        swapWords: ['커피를', '물을', '주스를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '이 노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '我喜欢这首歌。',
        swapWords: ['이 노래를', '이 드라마를', '이 무대를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我学习韩语。',
        swapWords: ['한국어를 공부해요', '노래를 들어요', '영화를 봐요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🍜', context: '日常吃饭', ko: '저는 김밥을 먹어요.', zh: '我吃紫菜包饭。' },
      { icon: '🎵', context: 'KPOP 粉丝', ko: '저는 이 노래를 매일 들어요.', zh: '我每天听这首歌。' },
      { icon: '📺', context: '推荐韩剧', ko: '저는 이 드라마를 봐요. 너무 재미있어요.', zh: '我在看这部剧，太有意思了。' },
      { icon: '📚', context: '打卡学习', ko: '저는 매일 한국어를 공부해요.', zh: '我每天学习韩语。' },
      { icon: '📖', context: '图书馆', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。' },
      { icon: '☕', context: '咖啡店', ko: '저는 카페에서 커피를 마셔요.', zh: '我在咖啡店喝咖啡。' },
    ],
    mistakes: [
      { wrong: '밥를 먹어요', correct: '밥을 먹어요', note: '밥 有收音 ㅂ，所以用 을，不是 를。' },
      { wrong: '커피을 마셔요', correct: '커피를 마셔요', note: '커피 无收音，所以用 를，不是 을。' },
      { wrong: '저는 먹어요 밥을', correct: '저는 밥을 먹어요', note: '宾语（을/를）放在动词前面，动词在句末。' },
      { wrong: '저는 학생을이에요', correct: '저는 학생이에요', note: '학생 是身份说明，不是动作对象，不加 을/를。' },
    ],
    quickTable: {
      title: '을/를 收音速查表',
      body: '看最后一个字有没有收音，两秒做判断。',
      headers: ['词', '中文', '有无收音', '结果'],
      rows: [
        ['빵', '面包', { ko: '有收音 ㅇ', zh: '有收音ㅇ' }, { ko: '빵을', zh: '面包（宾格）' }],
        ['밥', '饭', { ko: '有收音 ㅂ', zh: '有收音ㅂ' }, { ko: '밥을', zh: '饭（宾格）' }],
        ['책', '书', { ko: '有收音 ㄱ', zh: '有收音ㄱ' }, { ko: '책을', zh: '书（宾格）' }],
        ['한국어', '韩语', { ko: '无收音', zh: '无收音' }, { ko: '한국어를', zh: '韩语（宾格）' }],
        ['커피', '咖啡', { ko: '无收音', zh: '无收音' }, { ko: '커피를', zh: '咖啡（宾格）' }],
        ['영화', '电影', { ko: '无收音', zh: '无收音' }, { ko: '영화를', zh: '电影（宾格）' }],
        ['친구', '朋友', { ko: '无收音', zh: '无收音' }, { ko: '친구를', zh: '朋友（宾格）' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '을 还是 를？',
      body: '根据名词有无收音，选出正确的宾格助词。',
      questions: [
        { pre: '한국어', post: '공부해요', options: ['을', '를'], answer: 1, explanation: '어 无收音 → 를' },
        { pre: '밥', post: '먹어요', options: ['을', '를'], answer: 0, explanation: '밥 有收音 ㅂ → 을' },
        { pre: '음악', post: '들어요', options: ['을', '를'], answer: 0, explanation: '악 有收音 ㄱ → 을' },
        { pre: '커피', post: '마셔요', options: ['을', '를'], answer: 1, explanation: '피 无收音 → 를' },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 5 课 · 已完成</div>
      <div class="ov-hero-title">을/를 宾语助词</div>
      <div class="ov-hero-sub">标记动作对象 · 有收音→을 无收音→를</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
          <div style="background:#eaf8f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#2db89b">을</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面有收音</div><div style="font-size:12px;color:#241917;margin-top:4px">밥 → 밥을</div></div>
          <div style="background:#fff0f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#ff7fa8">를</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面无收音</div><div style="font-size:12px;color:#241917;margin-top:4px">커피 → 커피를</div></div>
        </div>
        <div style="background:#f8f4f0;border-radius:12px;padding:12px;font-size:13px;color:#241917;line-height:1.8">을/를 = 标记<b>动作的对象</b>（宾语）<br>位置：宾语 + 动词 = 을/를 + 动词</div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用搭配</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">밥을</span><span class="tok t-v">먹어요</span></div><div style="font-size:12px;color:#89756e;align-self:center">吃饭</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">커피를</span><span class="tok t-v">마셔요</span></div><div style="font-size:12px;color:#89756e;align-self:center">喝咖啡</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">영화를</span><span class="tok t-v">봐요</span></div><div style="font-size:12px;color:#89756e;align-self:center">看电影</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">노래를</span><span class="tok t-v">들어요</span></div><div style="font-size:12px;color:#89756e;align-self:center">听歌</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">한국어를</span><span class="tok t-v">공부해요</span></div><div style="font-size:12px;color:#89756e;align-self:center">学韩语</div></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
      <div class="ov-block">
        <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">밥를 먹어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">밥을 먹어요（有收音→을）</span></div></div>
        <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 먹어요 밥을</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 밥을 먹어요（宾语在前）</span></div></div>
      </div>
    </div>
  </div>`,
  },

  // ── 第6课：에 ────────────────────────────────────────────
  {
    id: 'card-p1-l06',
    partNumber: 1,
    lessonNumber: 6,
    title: '에',
    whatItDoes: '说"在哪里"和"去哪里"',
    whatItDoesBody: '에 可以表示去哪里、在哪里、几点，意思取决于后面的动词。\n和中文不同：\n中文"在/去/到"是三个词，韩语统一用 에，靠搭配的动词来区分含义。',
    structureNote: '에 有三种用法，但形式完全一样。\n下面展示三种句型，靠后面的动词就能判断是哪种用法。',
    rulesNote: '에 的规则简单：\n直接加在时间词或地点词后面，不看收音。\n关键是后面配什么动词：\n가다/오다→方向，있다/없다→存在，시간+에→时间点。',
    scenarioNote: '에 在日常对话里极其常见说去哪里、在哪里、几点都用它。\n中文的"在/去/到"是三个词，韩语统一用 에，靠动词来区分含义。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에 — 一个词，三种定位</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">去哪里 · 在哪里 · 几点</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">想一想，这三句韩语你会说吗？</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">학교에 가요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">去学校。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">집에 있어요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">在家。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">세 시에 만나요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">三点见。</div></div>
    <div style="margin-top:12px;font-size:.88rem;color:#89756e">这三句里都有 <strong style="color:#ff7fa8">에</strong>，但含义不一样。这节课搞定它。</div>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">에 的三张面孔</div>
    <div class="row" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <span class="chip p">방향: 去哪里</span>
      <span class="chip s">존재: 在哪里</span>
      <span class="chip t">시간: 几点/什么时候</span>
    </div>
    <div style="margin-top:10px;font-size:.85rem;color:#89756e">同一个 에，意思取决于后面的动词。</div>
  </div>`,
    compareHtml: `<div class="card-title">에 — 三种用法一个助词</div>
<div class="card-body">中文"在/去/到"是三个词，韩语统一用 에，靠后面搭配的动词来区分含义。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">方向（去/来）</div><div style="font-size:14px;color:#89756e;margin-top:2px">地点 + 에 + 가다/오다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:14px;color:#5a4640">去学校。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국에 와요.</span><span style="font-size:14px;color:#5a4640">来韩国。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">存在（在）</div><div style="font-size:14px;color:#89756e;margin-top:2px">地点 + 에 + 있다/없다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">집에 있어요.</span><span style="font-size:14px;color:#5a4640">在家。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">세 시에 만나요.</span><span style="font-size:14px;color:#5a4640">三点见。（时间）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">时间也用 에</div><div style="font-size:15px;color:#5a4640">에 还可以表示时间点：세 시에 만나요（三点见）、월요일에 해요（周一做）。中文"在三点""在周一"里的"在"，韩语也用 에 表达。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">关键：에 后面接 가요/와요 → 方向；接 있어요/없어요 → 存在；接时间词 → 时间点。</div></div>
<div class="reminder-box">에서 ≠ 에。에서 是"在某地做动作"，에 是"去某地/在某地存在"。下一课专门学 에서。</div>`,
    structures: [
      {
        ko: '학교에 가요',
        zh: '去学校。',
        tokens: [
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '저는 집에 있어요',
        zh: '我在家。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '집에', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
      },
      {
        ko: '세 시에 만나요',
        zh: '三点见。',
        tokens: [
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
      },
      {
        ko: '서울에 살아요',
        zh: '住在首尔。',
        tokens: [
          { text: '서울에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'usage',   text: '방향: 地点 + 에 가요/와요',           examples: '학교에 가요 / 한국에 와요' },
      { type: 'usage',   text: '존재: 地点 + 에 있어요/없어요/살아요', examples: '집에 있어요 / 서울에 살아요' },
      { type: 'usage',   text: '시간: 时间词 + 에 + 动词',              examples: '세 시에 만나요 / 토요일에 가요' },
      { type: 'note',    text: '这些时间词不加 에',                    examples: '오늘・내일・어제・지금・매일・항상' },
      { type: 'note',    text: '에 ≠ "在"，含义取决于后面的动词',     examples: '가요=方向 / 있어요=存在 / 만나요=时间点' },
      { type: 'compare', text: '에 vs 에서',                          examples: '去/存在目标 → 에；在某地做动作 → 에서（下节课）' },
      { type: 'example', text: '학교에 가요 / 집에 있어요 / 세 시에 만나요 / 서울에 살아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: ' 가요', role: 'verb' },
        ],
        zh: '我去学校。',
        swapWords: ['학교에', '카페에', '병원에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '집에', role: 'place' },
          { text: ' 있어요', role: 'verb' },
        ],
        zh: '我在家。',
        swapWords: ['집에', '도서관에', '회사에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '三点见。',
        swapWords: ['세 시에', '토요일에', '주말에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '서울에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '住在首尔。',
        swapWords: ['서울에 살아요', '중국에 살아요', '한국에 살아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📍', context: '约朋友', ko: '토요일에 카페에 가요!', zh: '周六去咖啡店！' },
      { icon: '🕑', context: '约见面时间', ko: '오후 두 시에 만나요.', zh: '下午两点见。' },
      { icon: '🏠', context: '说明在哪', ko: '저는 지금 집에 있어요.', zh: '我现在在家。' },
      { icon: '🇰🇷', context: '旅行计划', ko: '다음 달에 한국에 가요.', zh: '下个月去韩国。' },
      { icon: '📚', context: '学习作息', ko: '아침에 한국어를 공부해요.', zh: '早上学习韩语。' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '이번 주말에 콘서트에 가요!', zh: '这个周末去演唱会！' },
    ],
    mistakes: [
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부해요 是动作，动作发生地点用 에서。' },
      { wrong: '오늘에 공부해요 / 내일에 만나요', correct: '오늘 공부해요 / 내일 만나요', note: '오늘·내일·어제·지금·매일 这类词不加 에。' },
      { wrong: '학교에 가요', correct: '학교에 가요 = 去学校', note: '에 不是"在"，而是方向标记。含义取决于后面的动词，不能固定翻译成"在"。' },
      { wrong: '저는 학교 가요', correct: '저는 학교에 가요', note: '口语有时省略，但初学阶段建议写完整。' },
    ],
    quickTable: {
      title: '에 速查表',
      body: '时间名词 + 에 / 地点名词 + 에',
      headers: ['类型', '助词', '作用', '例句'],
      rows: [
        ['时间名词', '에', '表示时间点', '오후에, 월요일에, 세 시에'],
        ['方向地点', '에', '表示去向（+가다/오다）', '학교에 가요, 시장에 가요'],
        ['存在地点', '에', '表示存在位置（+있다/없다）', '집에 있어요'],
        ['居住地点', '에', '表示居住地（+살다）', '서울에 살아요'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '判断对错：에 的用法',
      body: '选出使用 에 正确的句子。',
      questions: [
        { options: ['오늘 공부해요', '오늘에 공부해요'], answer: 0, explanation: '오늘/내일/어제 等词不加 에。' },
        { options: ['학교에서 공부해요', '학교에 공부해요'], answer: 0, explanation: '动作发生的场所用 에서。' },
        { options: ['집에 가요', '집에서 가요'], answer: 0, explanation: '가다 等方向动词用 에。' },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="badge">第6课</div>
    <div class="ov-title">에 — 时间、地点、方向</div>
    <div class="ov-sub">장소에 가요 · 장소에 있어요 · 시간에 动词</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:.88rem;line-height:1.9">
        <strong>방향: </strong>장소에 가요 / 와요<br>
        <strong>존재: </strong>장소에 있어요 / 없어요 / 살아요<br>
        <strong>시간: </strong>시간에 + 动词<br>
        <strong>记住：</strong>오늘·내일·어제·지금·매일 不加 에
      </div>
    </div>
    <div class="ov-sec">
      <h3>速查表</h3>
      <table>
        <tr><th>用法</th><th>结构</th><th>例句</th></tr>
        <tr><td>方向</td><td>장소에 가요</td><td>학교에 가요</td></tr>
        <tr><td>存在</td><td>장소에 있어요</td><td>집에 있어요</td></tr>
        <tr><td>时间</td><td>时间 에 动词</td><td>세 시에 만나요</td></tr>
        <tr><td>居住</td><td>장소에 살아요</td><td>서울에 살아요</td></tr>
      </table>
    </div>
    <div class="ov-sec">
      <h3>不加 에 的时间词</h3>
      <div class="row" style="margin-top:6px">
        <span class="chip n">오늘</span><span class="chip n">내일</span><span class="chip n">어제</span><span class="chip n">지금</span><span class="chip n">매일</span>
      </div>
    </div>
    <div class="ov-sec">
      <h3>常见错误</h3>
      <div style="font-size:.85rem;line-height:1.8">
        <span style="color:#be185d">✗</span> 학교에 공부해요 → <span style="color:#1a7a4a">✓</span> 학교<strong>에서</strong> 공부해요<br>
        <span style="color:#be185d">✗</span> 오늘에 공부해요 → <span style="color:#1a7a4a">✓</span> 오늘 공부해요
      </div>
    </div>
  </div>`,
  },

  // ── 第7课：에서 ──────────────────────────────────────────
  {
    id: 'card-p1-l07',
    partNumber: 1,
    lessonNumber: 7,
    title: '에서',
    whatItDoes: '说"在哪里做什么"',
    whatItDoesBody: '动作 + 地点的专属搭档，只要是"真的在做什么"就用 에서。\n和中文不同：\n中文"在图书馆读书"里的"在"一个词搞定，韩语要区分 에（存在/方向）和 에서（动作发生地）。',
    structureNote: '에서 只有一个用法：\n在哪里「做」动作。\n下面的结构展示它和动词的搭配方式。',
    rulesNote: '判断用 에 还是 에서 只需要问一句话：\n这里是「真的在做某件事」，还是「只是存在/在那里」？做事→ 에서，存在/去向→ 에。',
    scenarioNote: '几乎所有「在某地做某事」的句子都需要 에서在咖啡店工作、在学校学习、在家休息。\n和 에 的区分是P1最重要的辨析，值得多练。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에서 — 在哪里「做」动作</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">动作 + 地点 的专属搭档</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">학교에서 공부해요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">在学校学习。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">카페에서 커피를 마셔요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">在咖啡店喝咖啡。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">공원에서 사진을 찍어요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">在公园拍照。</div></div>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">에 vs 에서 先记这一句</div>
    <div style="font-size:.88rem;line-height:2;background:#f8f4f0;border-radius:8px;padding:10px">
      <div><span style="color:#2db89b;font-weight:700">에</span>：去哪里 / 在哪里存在 / 几点</div>
      <div><span style="color:#ff7fa8;font-weight:700">에서</span>：在哪里<strong>做动作</strong></div>
    </div>
  </div>`,
    compareHtml: `<div class="card-title">에 vs 에서 — 最常混淆的两个助词</div>
<div class="card-body">中文"在图书馆读书"里"在"一个词搞定，韩语要区分 에（存在/方向）和 에서（动作发生地）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에（存在/方向）</div><div style="font-size:14px;color:#89756e;margin-top:2px">接 있다/없다/가다/오다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">카페에 있어요.</span><span style="font-size:14px;color:#5a4640">在咖啡店。（存在）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">카페에 가요.</span><span style="font-size:14px;color:#5a4640">去咖啡店。（方向）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에서（动作发生地）</div><div style="font-size:14px;color:#89756e;margin-top:2px">接一般动作动词</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">카페에서 공부해요.</span><span style="font-size:14px;color:#5a4640">在咖啡店学习。（动作）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">도서관에서 책을 읽어요.</span><span style="font-size:14px;color:#5a4640">在图书馆读书。（动作）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">判断口诀</div><div style="font-size:15px;color:#5a4640">后面接 있다/없다/가다/오다 → 用 에。后面接其他动作动词（먹다/공부하다/일하다）→ 用 에서。这个区分中文没有，需要刻意练习。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">测试：학교에서 있어요 ✗ → 학교에 있어요 ✓（있다 前面用 에）</div></div>
<div class="reminder-box">에서 있어요 ✗ — 있다/없다 前面永远用 에，不用 에서。这是 P1 里最常犯的助词错误。</div>`,
    structures: [
      {
        ko: '학교에서 공부해요',
        zh: '在学校学习。',
        tokens: [
          { text: '학교에서', role: 'place' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '회사에서 일해요',
        zh: '在公司工作。',
        tokens: [
          { text: '회사에서', role: 'place' },
          { text: '일해요', role: 'verb' },
        ],
      },
      {
        ko: '저는 도서관에서 책을 빌려요',
        zh: '我在图书馆借书。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '도서관에서', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '빌려요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'usage',   text: '在哪里做动作 → 地点 + 에서 + 动词',          examples: '학교에서 공부해요 / 카페에서 마셔요' },
      { type: 'compare', text: '에 vs 에서',                             examples: '只是"在不在" → 에；真的"做什么" → 에서' },
      { type: 'note',    text: '있어요/없어요 用 에，不用 에서',           examples: '도서관에 있어요（在图书馆）—— 存在不是动作' },
      { type: 'note',    text: '时间点用 에，不用 에서',                   examples: '세 시에 만나요（不是 세 시에서）' },
      { type: 'usage',   text: '에서 后面必须是动作动词',                  examples: '공부해요·먹어요·마셔요·일해요·읽어요' },
      { type: 'usage',   text: '에서 也可表示起点（从某地出发）',           examples: '집에서 학교까지（从家到学校）' },
      { type: 'example', text: '학교에서 공부해요 / 카페에서 커피를 마셔요 / 도서관에서 책을 빌려요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '학교에서', role: 'place' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我在学校学习。',
        swapWords: ['학교에서', '카페에서', '도서관에서'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '在咖啡店喝咖啡。',
        swapWords: ['커피를 마셔요', '밥을 먹어요', '친구를 만나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '공원에서', role: 'place' },
          { text: '사진을', role: 'object' },
          { text: '찍어요', role: 'verb' },
        ],
        zh: '在公园拍照。',
        swapWords: ['공원에서', '카페에서', '거리에서'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '도서관에서', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
        zh: '我在图书馆读书。',
        swapWords: ['도서관에서 책을 읽어요', '집에서 음악을 들어요', '식당에서 밥을 먹어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店打卡', ko: '오늘 카페에서 한국어를 공부해요.', zh: '今天在咖啡店学习韩语。' },
      { icon: '📚', context: '图书馆自习', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。' },
      { icon: '🍜', context: '餐厅用餐', ko: '식당에서 냉면을 먹어요.', zh: '在餐厅吃冷面。' },
      { icon: '🏢', context: '职场表达', ko: '저는 회사에서 일해요.', zh: '我在公司工作。' },
      { icon: '🎵', context: 'KPOP 粉丝', ko: '집에서 좋아하는 노래를 들어요.', zh: '在家听喜欢的歌。' },
      { icon: '🤳', context: 'SNS 打卡', ko: '카페에서 친구를 만났어요!', zh: '在咖啡店见到朋友了！' },
    ],
    mistakes: [
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부해요 是动作，动作发生地点用 에서。' },
      { wrong: '집에서 있어요', correct: '집에 있어요', note: '있어요 是存在，不是动作，用 에。' },
      { wrong: '세 시에서 만나요', correct: '세 시에 만나요', note: '时间点用 에，不用 에서。' },
      { wrong: '카페에서 커피 마셔요（省略了 를）', correct: '카페에서 커피를 마셔요', note: '에서 标地点，을/를 标宾语，各管各的，一起出现很正常。' },
    ],
    quickTable: {
      title: '에서 vs 에 — 一张表搞清楚',
      body: '关键：后面是不是「动作动词」',
      headers: ['韩语', '助词', '中文', '为什么'],
      rows: [
        [{ ko: '학교에 가요', zh: '去学校' }, { ko: '에', zh: '方向助词' }, '去学校', '方向移动'],
        [{ ko: '학교에 있어요', zh: '在学校' }, { ko: '에', zh: '存在助词' }, '在学校', '存在状态'],
        [{ ko: '학교에서 공부해요', zh: '在学校学习' }, { ko: '에서', zh: '动作场所' }, '在学校学习', '动作发生'],
        [{ ko: '집에 있어요', zh: '在家' }, { ko: '에', zh: '存在助词' }, '在家', '存在状态'],
        [{ ko: '집에서 쉬어요', zh: '在家休息' }, { ko: '에서', zh: '动作场所' }, '在家休息', '动作发生'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选对 에 / 에서',
      body: '根据句子含义，选择正确的助词。',
      questions: [
        { pre: '학교', post: '공부해요', options: ['에', '에서'], answer: 1, explanation: '공부하다 是动作 → 动作场所用 에서' },
        { pre: '집', post: '가요', options: ['에', '에서'], answer: 0, explanation: '가다 是方向 → 目标地点用 에' },
        { pre: '카페', post: '친구를 만나요', options: ['에', '에서'], answer: 1, explanation: '만나다 是动作 → 动作场所用 에서' },
        { pre: '화장실', post: '있어요', options: ['에', '에서'], answer: 0, explanation: '있다 是存在 → 存在位置用 에' },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="badge">第7课</div>
    <div class="ov-title">에서 — 在哪里做动作</div>
    <div class="ov-sub">장소에서 + 动作动词</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:.88rem;line-height:1.9">
        <strong>에서</strong>：在哪里做动作 → 地点 + 에서 + 动词<br>
        <strong>에 vs 에서：</strong>只是"在不在" → 에；真的"做什么" → 에서<br>
        <strong>记住：</strong>있어요/없어요 用 에，不用 에서
      </div>
    </div>
    <div class="ov-sec">
      <h3>常用搭配</h3>
      <table>
        <tr><th>地点</th><th>动作</th><th>句子</th></tr>
        <tr><td>학교에서</td><td>공부해요</td><td>학교에서 공부해요</td></tr>
        <tr><td>카페에서</td><td>커피를 마셔요</td><td>카페에서 커피를 마셔요</td></tr>
        <tr><td>도서관에서</td><td>책을 읽어요</td><td>도서관에서 책을 읽어요</td></tr>
        <tr><td>집에서</td><td>쉬어요</td><td>집에서 쉬어요</td></tr>
      </table>
    </div>
    <div class="ov-sec">
      <h3>常见错误</h3>
      <div style="font-size:.85rem;line-height:1.8">
        <span style="color:#be185d">✗</span> 학교에 공부해요 → <span style="color:#1a7a4a">✓</span> 학교<strong>에서</strong> 공부해요<br>
        <span style="color:#be185d">✗</span> 집에서 있어요 → <span style="color:#1a7a4a">✓</span> 집<strong>에</strong> 있어요<br>
        <span style="color:#be185d">✗</span> 세 시에서 만나요 → <span style="color:#1a7a4a">✓</span> 세 시<strong>에</strong> 만나요
      </div>
    </div>
  </div>`,
  },

  // ── 第8课：过去时 ──────────────────────────────────────────
  {
    id: 'card-p1-l08',
    partNumber: 1,
    lessonNumber: 8,
    title: '过去时',
    whatItDoes: '说过去做了什么',
    whatItDoesBody: '词干末元音决定用哪个词尾，三条规则搞定所有过去时。\n和中文「了」不同的是：\n韩语过去时只表示「已经发生」，不表示状态变化或持续结果。',
    structureNote: '过去时只改动词/形容词的词尾，主语和助词完全不变。\n下面展示变化后的句型框架。',
    rulesNote: '过去时词尾由词干最后的元音决定：\nㅏ/ㅗ 结尾→ 았어요，其他元音→ 었어요，하다→ 했어요。\n三条规则覆盖99%的词。',
    scenarioNote: '写日记、讲昨天发生的事、追剧聊剧情都需要过去时。\n和中文的「了」不完全一样韩语过去时单纯表示「已发生」，不像中文「了」还能表示变化或持续结果。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">过去时 — 说「昨天做了什么」</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">-았어요 / -었어요 / -했어요</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">从现在时到过去时</div>
    <table style="width:100%;border-collapse:collapse;font-size:.86rem">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">现在</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">→</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">过去</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">가요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">갔어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">去了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">먹어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">먹었어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">吃了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">봐요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">봤어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">看了</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">这节课学完，你能写韩语日记：</div>
    <div style="font-size:.88rem;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      어제 한국어를 공부했어요. — 昨天学习了韩语。<br>
      지난주에 도서관에 갔어요. — 上周去了图书馆。<br>
      이 노래가 좋았어요. — 这首歌很好。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">过去时变形 — 元音决定词尾</div>
<div class="card-body">韩语过去时词尾由词干末元音决定，不像中文加"了"那么简单——要先看元音再选词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">末元音 ㅏ/ㅗ → -았어요</div><div style="font-size:14px;color:#89756e;margin-top:2px">亮元音接亮词尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갔어요</span><span style="font-size:14px;color:#5a4640">去了。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">보다 → 봤어요</span><span style="font-size:14px;color:#5a4640">看了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">其他元音 → -었어요</div><div style="font-size:14px;color:#89756e;margin-top:2px">暗元音接暗词尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹었어요</span><span style="font-size:14px;color:#5a4640">吃了。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">마시다 → 마셨어요</span><span style="font-size:14px;color:#5a4640">喝了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词特殊</div><div style="font-size:15px;color:#5a4640">所有 하다 动词统一变 했어요：공부하다→공부했어요，좋아하다→좋아했어요。不需要判断元音，记住这个特例就省事了。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">中文"了"表示动作完成或状态变化，韩语 -었어요 只表示"已经发生"，不表示状态持续。</div></div>
<div class="reminder-box">이다（是）→ 이었어요/였어요（过去"是"）。학생이었어요（曾经是学生）/ 가수였어요（曾经是歌手）。이다 过去时容易忘，要单独记。</div>`,
    structures: [
      {
        ko: '어제 한국어를 공부했어요',
        zh: '昨天学习了韩语。',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부했어요', role: 'verb' },
        ],
      },
      {
        ko: '아까 밥을 먹었어요',
        zh: '刚才吃饭了。',
        tokens: [
          { text: '아까', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '지난주에 도서관에 갔어요',
        zh: '上周去了图书馆。',
        tokens: [
          { text: '지난주에', role: 'time' },
          { text: '도서관에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干末元音 ㅏ/ㅗ → -았어요', examples: '가다→갔어요 / 오다→왔어요 / 보다→봤어요' },
      { type: 'rule',    text: '其他元音 → -었어요',         examples: '먹다→먹었어요 / 읽다→읽었어요 / 마시다→마셨어요' },
      { type: 'rule',    text: '하다 → 했어요',             examples: '공부하다→공부했어요 / 좋아하다→좋아했어요' },
      { type: 'rule',    text: '名词句过去时',               examples: '학생이에요→학생이었어요 / 가수예요→가수였어요' },
      { type: 'note',    text: 'ㅡ 脱落过去时',             examples: '아프다→아팠어요 / 예쁘다→예뻤어요 / 크다→컸어요' },
      { type: 'vocab',   text: '过去时间词',                 examples: '어제（昨天）·아까（刚才）·지난주에（上周）·어젯밤에（昨晚）' },
      { type: 'example', text: '어제 한국어를 공부했어요 / 지난주에 서울에 갔어요 / 이 노래가 좋았어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '공부했어요', role: 'verb' },
        ],
        zh: '昨天学习了。',
        swapWords: ['공부했어요', '운동했어요', '복습했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아까', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
        zh: '刚才吃了饭。',
        swapWords: ['밥을 먹었어요', '커피를 마셨어요', '라면을 먹었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지난주에', role: 'time' },
          { text: '도서관에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '上周去了图书馆。',
        swapWords: ['도서관에', '카페에', '영화관에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '어젯밤에', role: 'time' },
          { text: '이 노래를', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '昨晚听了这首歌。',
        swapWords: ['이 노래를 들었어요', '이 드라마를 봤어요', '이 영상을 봤어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📔', context: '韩语日记', ko: '어제 한국어를 공부했어요. 재미있었어요!', zh: '昨天学习了韩语，很有意思！' },
      { icon: '☕', context: '周末回顾', ko: '지난 주말에 카페에서 친구를 만났어요.', zh: '上周末在咖啡店见了朋友。' },
      { icon: '📱', context: '聊天回复', ko: '아까 밥을 먹었어요. 지금 집에 있어요.', zh: '刚才吃了饭，现在在家。' },
      { icon: '🏥', context: '身体不适', ko: '어제 병원에 갔어요. 많이 나았어요.', zh: '昨天去了医院，好多了。' },
      { icon: '🇰🇷', context: '旅行回忆', ko: '작년에 서울에 갔어요. 정말 재미있었어요.', zh: '去年去了首尔，真的很有趣。' },
      { icon: '🎵', context: '音乐感想', ko: '어젯밤에 이 노래를 들었어요. 정말 좋았어요.', zh: '昨晚听了这首歌，真的很好。' },
    ],
    mistakes: [
      { wrong: '공부하었어요', correct: '공부했어요', note: '하다 过去时直接变 했어요，不是 하었어요。' },
      { wrong: '가았어요', correct: '갔어요', note: '가았어요 → 缩写为 갔어요。' },
      { wrong: '먹았어요', correct: '먹었어요', note: '먹 的元音是 ㅓ，不是 ㅏ/ㅗ，所以用 었어요。' },
      { wrong: '어제 공부해요', correct: '어제 공부했어요', note: '어제·아까·지난주 是过去时间词，后面用过去时。' },
      { wrong: '보았어요（书面可以，口语少用）', correct: '봤어요（更常用）', note: '보았어요 → 봤어요，两种都正确但 봤어요 更自然。' },
    ],
    quickTable: {
      title: '过去时速查表',
      body: '词干元音 → 过去时词尾',
      headers: ['原形', '词干末元音', '过去时（正式）', '过去时（日常）'],
      rows: [
        [{ ko: '가다', zh: '去（原形）' }, 'ㅏ', { ko: '갔습니다', zh: '去了（正式）' }, { ko: '갔어요', zh: '去了（日常）' }],
        [{ ko: '오다', zh: '来（原形）' }, 'ㅗ', { ko: '왔습니다', zh: '来了（正式）' }, { ko: '왔어요', zh: '来了（日常）' }],
        [{ ko: '보다', zh: '看（原形）' }, 'ㅗ', { ko: '봤습니다', zh: '看了（正式）' }, { ko: '봤어요', zh: '看了（日常）' }],
        [{ ko: '먹다', zh: '吃（原形）' }, 'ㅓ', { ko: '먹었습니다', zh: '吃了（正式）' }, { ko: '먹었어요', zh: '吃了（日常）' }],
        [{ ko: '마시다', zh: '喝（原形）' }, 'ㅣ', { ko: '마셨습니다', zh: '喝了（正式）' }, { ko: '마셨어요', zh: '喝了（日常）' }],
        [{ ko: '읽다', zh: '读（原形）' }, 'ㅣ', { ko: '읽었습니다', zh: '读了（正式）' }, { ko: '읽었어요', zh: '读了（日常）' }],
        [{ ko: '공부하다', zh: '学习（原形）' }, { ko: '하다', zh: '하다 型' }, { ko: '공부했습니다', zh: '学了（正式）' }, { ko: '공부했어요', zh: '学了（日常）' }],
        [{ ko: '일하다', zh: '工作（原形）' }, { ko: '하다', zh: '하다 型' }, { ko: '일했습니다', zh: '工作了（正式）' }, { ko: '일했어요', zh: '工作了（日常）' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '过去时变形练习',
      body: '根据日常体现在时，选出正确的过去时。',
      questions: [
        { prompt: '现在时：가요', options: ['갔어요', '갔아요', '가었어요'], answer: 0, explanation: '가+았어요→갔어요（缩约）' },
        { prompt: '现在时：먹어요', options: ['먹었어요', '먹았어요', '먹어었어요'], answer: 0, explanation: '먹+었어요' },
        { prompt: '现在时：해요', options: ['했어요', '하었어요', '해었어요'], answer: 0, explanation: '하+였어요→했어요（缩约）' },
        { prompt: '现在时：와요', options: ['왔어요', '오었어요', '와었어요'], answer: 0, explanation: '오+았어요→왔어요（缩约）' },
      ],
    },
    linkedGrammarIds: ['gp-23'],
    overviewHtml: `<div class="overview">
    <div class="badge">第8课</div>
    <div class="ov-title">过去时 -았/었/했어요</div>
    <div class="ov-sub">昨天做了什么 · 刚才 · 上周</div>
    <div class="ov-sec">
      <h3>三条规则</h3>
      <div style="font-size:.88rem;line-height:2">
        <strong>规则 1：</strong>词干元音 ㅏ/ㅗ → -았어요（가→갔어요, 보→봤어요）<br>
        <strong>规则 2：</strong>其他元音 → -었어요（먹→먹었어요）<br>
        <strong>规则 3：</strong>하다 → 했어요（공부하다→공부했어요）
      </div>
    </div>
    <div class="ov-sec">
      <h3>速查表</h3>
      <table>
        <tr><th>原形</th><th>过去时</th><th>中文</th></tr>
        <tr><td>가다</td><td>갔어요</td><td>去了</td></tr>
        <tr><td>보다</td><td>봤어요</td><td>看了</td></tr>
        <tr><td>먹다</td><td>먹었어요</td><td>吃了</td></tr>
        <tr><td>공부하다</td><td>공부했어요</td><td>学习了</td></tr>
        <tr><td>듣다</td><td>들었어요</td><td>听了</td></tr>
      </table>
    </div>
    <div class="ov-sec">
      <h3>过去时间词</h3>
      <div class="row" style="margin-top:0">
        <span class="chip t">어제</span><span class="chip t">아까</span><span class="chip t">지난주에</span><span class="chip t">어젯밤에</span>
      </div>
    </div>
  </div>`,
  },

  // ── 第9课：将来时 ─────────────────────────────────────────
  {
    id: 'card-p1-l09',
    partNumber: 1,
    lessonNumber: 9,
    title: '将来时',
    whatItDoes: '说将来打算做什么',
    whatItDoesBody: '-을/ㄹ 거예요 表示要做/会做/打算做，两条规则搞定。\n和中文不同：\n中文"要/会/打算"是独立词，韩语把这三种意思都用一个词尾表达，放在动词末尾。',
    structureNote: '将来时在现在时的基础上只改动词词尾，结构位置完全相同。\n下面展示变化后的句型。',
    rulesNote: '将来时只看一件事：\n词干最后有没有收音。\n有收音加을 거예요，没有收音加ㄹ 거예요。\n比过去时更简单，只有两条。',
    scenarioNote: '说计划、约定、推测都用-을/ㄹ 거예요。\n它同时覆盖中文的「要/会/打算」三种含义，是一个词尾三种用法。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">将来时 — 说「以后要做什么」</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">-을/ㄹ 거예요 = 要做/会做/打算做</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">三种时态对比</div>
    <table style="width:100%;border-collapse:collapse;font-size:.86rem">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">时态</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">韩语</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">现在</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">过去</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8;font-weight:700">将来</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부할 거예요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">要学习</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="font-size:.88rem;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      내일 한국어를 공부할 거예요. — 明天要学习韩语。<br>
      주말에 카페에 갈 거예요. — 周末要去咖啡店。<br>
      나중에 한국에 갈 거예요. — 以后会去韩国。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">将来时 — 两条规则搞定</div>
<div class="card-body">-을/ㄹ 거예요 表示要做/会做/打算做。中文"要/会/打算"是独立词，韩语把这三种意思全用一个词尾表达，放在动词末尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">词干无收音 → -ㄹ 거예요</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갈 거예요</span><span style="font-size:14px;color:#5a4640">要去。/ 打算去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">하다 → 할 거예요</span><span style="font-size:14px;color:#5a4640">要做。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">词干有收音 → -을 거예요</div><div style="font-size:14px;color:#89756e;margin-top:2px">末音节以辅音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹을 거예요</span><span style="font-size:14px;color:#5a4640">要吃。/ 打算吃。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">읽다 → 읽을 거예요</span><span style="font-size:14px;color:#5a4640">要读。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">和现在时的对比</div><div style="font-size:15px;color:#5a4640">현재（现在）：지금 밥을 먹어요（现在吃饭）<br>미래（将来）：내일 밥을 먹을 거예요（明天要吃饭）。区别只在词尾，中文靠"现在/明天"区分，韩语词尾本身就带时态信息。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">问对方计划：뭐 할 거예요?（打算做什么？）— 日常对话高频句型。</div></div>
<div class="reminder-box">거예요 前面有空格：먹을 거예요（✓），먹을거예요（✗）。거 和 예요 之间也有空格，是三个词：먹을 / 거 / 예요。</div>`,
    structures: [
      {
        ko: '내일 한국어를 공부할 거예요',
        zh: '明天要学韩语。',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부할 거예요', role: 'verb' },
        ],
      },
      {
        ko: '이따가 밥을 먹을 거예요',
        zh: '一会儿要吃饭。',
        tokens: [
          { text: '이따가', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 카페에 갈 거예요',
        zh: '周末要去咖啡店。',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '카페에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
      {
        ko: '나중에 한국에 갈 거예요',
        zh: '以后会去韩国。',
        tokens: [
          { text: '나중에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干无收音 → -ㄹ 거예요',        examples: '가다→갈 거예요 / 하다→할 거예요 / 보다→볼 거예요' },
      { type: 'rule',    text: '词干有收音 → -을 거예요',        examples: '먹다→먹을 거예요 / 읽다→읽을 거예요' },
      { type: 'rule',    text: 'ㄹ 词干：本身已有 ㄹ，直接加 거예요', examples: '살다→살 거예요 / 만들다→만들 거예요' },
      { type: 'vocab',   text: '未来时间词',                     examples: '내일・주말에・다음 주에・이따가・나중에' },
      { type: 'note',    text: '내일·이따가 不加 에',             examples: '내일 갈 거예요 / 이따가 먹을 거예요' },
      { type: 'compare', text: '거예요 vs 겠어요',               examples: '거예요=计划/预测；겠어요=即刻意图（中级再细分）' },
      { type: 'example', text: '내일 한국어를 공부할 거예요 / 주말에 카페에 갈 거예요 / 나중에 한국에 갈 거예요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부할 거예요', role: 'verb' },
        ],
        zh: '明天要学习韩语。',
        swapWords: ['공부할 거예요', '영화를 볼 거예요', '쉴 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '카페에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
        zh: '周末要去咖啡店。',
        swapWords: ['카페에', '도서관에', '영화관에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '이따가', role: 'time' },
          { text: '라면을', role: 'object' },
          { text: '먹을 거예요', role: 'verb' },
        ],
        zh: '等一下要吃拉面。',
        swapWords: ['라면을 먹을 거예요', '밥을 먹을 거예요', '커피를 마실 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '나중에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
        zh: '以后会去韩国。',
        swapWords: ['한국에 갈 거예요', '서울에 갈 거예요', '일본에 갈 거예요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', ko: '내일부터 매일 한국어를 공부할 거예요.', zh: '从明天开始每天学习韩语。' },
      { icon: '🇰🇷', context: '旅行梦想', ko: '나중에 한국에 갈 거예요. 서울에서 맛있는 음식을 먹을 거예요!', zh: '以后会去韩国，在首尔吃好吃的！' },
      { icon: '📱', context: '聊天回复', ko: '이따가 전화할 거예요. 지금 밥 먹고 있어요.', zh: '等一下会打电话，现在在吃饭。' },
      { icon: '☕', context: '周末安排', ko: '주말에 카페에서 친구를 만날 거예요.', zh: '周末要在咖啡店见朋友。' },
      { icon: '🏥', context: '看病计划', ko: '내일 병원에 갈 거예요. 요즘 몸이 안 좋아요.', zh: '明天要去医院，最近身体不太好。' },
      { icon: '🎵', context: '周末活动', ko: '이번 주말에 친구하고 영화를 볼 거예요.', zh: '这个周末要和朋友看电影。' },
    ],
    mistakes: [
      { wrong: '먹ㄹ 거예요', correct: '먹을 거예요', note: '먹 有收音，所以用 -을 거예요。' },
      { wrong: '가을 거예요', correct: '갈 거예요', note: '가 无收音，所以用 -ㄹ 거예요。' },
      { wrong: '공부하을 거예요', correct: '공부할 거예요', note: '하다 将来时 → 할 거예요（하 + ㄹ 거예요）。' },
      { wrong: '내일 공부했어요', correct: '내일 공부할 거예요', note: '내일 是未来时间词，要配将来时。' },
    ],
    quickTable: {
      title: '将来时速查表',
      body: '有收音→을 거예요 / 无收音→ㄹ 거예요',
      headers: ['原形', '有/无收音', '将来时（正式）', '将来时（日常）'],
      rows: [
        [{ ko: '먹다', zh: '吃（原形）' }, '有', { ko: '먹을 겁니다', zh: '要吃（正式）' }, { ko: '먹을 거예요', zh: '要吃（日常）' }],
        [{ ko: '읽다', zh: '读（原形）' }, '有', { ko: '읽을 겁니다', zh: '要读（正式）' }, { ko: '읽을 거예요', zh: '要读（日常）' }],
        [{ ko: '하다', zh: '做（原形）' }, '无', { ko: '할 겁니다', zh: '要做（正式）' }, { ko: '할 거예요', zh: '要做（日常）' }],
        [{ ko: '만나다', zh: '见面（原形）' }, '无', { ko: '만날 겁니다', zh: '要见面（正式）' }, { ko: '만날 거예요', zh: '要见面（日常）' }],
        [{ ko: '가다', zh: '去（原形）' }, '无', { ko: '갈 겁니다', zh: '要去（正式）' }, { ko: '갈 거예요', zh: '要去（日常）' }],
        [{ ko: '보다', zh: '看（原形）' }, '无', { ko: '볼 겁니다', zh: '要看（正式）' }, { ko: '볼 거예요', zh: '要看（日常）' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '将来时变形练习',
      body: '根据词典形，选出正确的将来时。',
      questions: [
        { prompt: '词典形：가다', options: ['갈 거예요', '가을 거예요', '갈거예요'], answer: 0, explanation: '词干 가 无收音 → ㄹ 거예요' },
        { prompt: '词典形：먹다', options: ['먹을 거예요', '먹ㄹ 거예요', '먹거예요'], answer: 0, explanation: '词干 먹 有收音 → 을 거예요' },
        { prompt: '词典形：하다', options: ['할 거예요', '하을 거예요', '하ㄹ거예요'], answer: 0, explanation: '词干 하 无收音 → ㄹ 거예요' },
        { prompt: '词典形：읽다', options: ['읽을 거예요', '읽ㄹ 거예요', '읽거예요'], answer: 0, explanation: '词干 읽 有收音 → 을 거예요' },
      ],
    },
    linkedGrammarIds: ['gp-24'],
    overviewHtml: `<div class="overview">
    <div class="badge">第9课</div>
    <div class="ov-title">将来时 -을/ㄹ 거예요</div>
    <div class="ov-sub">明天要做什么 · 周末计划 · 以后打算</div>
    <div class="ov-sec">
      <h3>两条规则</h3>
      <div style="font-size:.88rem;line-height:2">
        <strong>规则 1：</strong>词干无收音 → -ㄹ 거예요（가→갈, 보→볼）<br>
        <strong>规则 2：</strong>词干有收音 → -을 거예요（먹→먹을）<br>
        <strong>特例：</strong>하다 → 할 거예요（공부할, 운동할）
      </div>
    </div>
    <div class="ov-sec">
      <h3>速查表</h3>
      <table>
        <tr><th>原形</th><th>将来时</th><th>中文</th></tr>
        <tr><td>가다</td><td>갈 거예요</td><td>要去</td></tr>
        <tr><td>보다</td><td>볼 거예요</td><td>要看</td></tr>
        <tr><td>먹다</td><td>먹을 거예요</td><td>要吃</td></tr>
        <tr><td>공부하다</td><td>공부할 거예요</td><td>要学习</td></tr>
        <tr><td>쉬다</td><td>쉴 거예요</td><td>要休息</td></tr>
      </table>
    </div>
    <div class="ov-sec">
      <h3>未来时间词</h3>
      <div class="row" style="margin-top:0">
        <span class="chip t">내일</span><span class="chip t">주말에</span><span class="chip t">다음 주에</span><span class="chip t">이따가</span><span class="chip t">나중에</span>
      </div>
    </div>
  </div>`,
  },

  // ── 第10课：进行时 ────────────────────────────────────────
  {
    id: 'card-p1-l10',
    partNumber: 1,
    lessonNumber: 10,
    title: '进行时',
    whatItDoes: '说正在做什么',
    whatItDoesBody: '动词词干 + 고 있어요，比过去时和将来时都简单，不用判断元音。\n和中文不同：\n中文进行时靠"正在/着"来表达，韩语把进行意义直接嵌入动词词尾，不需要额外加词。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">进行时 — 说「正在做什么」</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">动词词干 + 고 있어요</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">三种时态全对比</div>
    <table style="width:100%;border-collapse:collapse;font-size:.86rem">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">时态</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">韩语</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">过去</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">现在/习惯</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8;font-weight:700">进行中</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부하고 있어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">正在学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">将来</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부할 거예요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">要学习</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="font-size:.88rem;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      지금 한국어를 공부하고 있어요. — 现在正在学习韩语。<br>
      이 노래를 듣고 있어요. — 正在听这首歌。<br>
      카페에서 커피를 마시고 있어요. — 正在咖啡店喝咖啡。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">进行时 — 最简单的时态</div>
<div class="card-body">动词词干 + 고 있어요，不用判断元音，比过去时和将来时都简单。中文进行时靠"正在/着"表达，韩语把进行意义嵌入词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">进行时（-고 있어요）</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词词干 + 고 있어요</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹고 있어요</span><span style="font-size:14px;color:#5a4640">正在吃。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">공부하다 → 공부하고 있어요</span><span style="font-size:14px;color:#5a4640">正在学习。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">现在时 vs 进行时</div><div style="font-size:14px;color:#89756e;margin-top:2px">习惯 vs 正在进行</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥을 먹어요.</span><span style="font-size:14px;color:#5a4640">（平时）吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">지금 밥을 먹고 있어요.</span><span style="font-size:14px;color:#5a4640">现在正在吃饭。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">穿戴类动词的特殊用法</div><div style="font-size:15px;color:#5a4640">입다（穿）/쓰다（戴）/신다（穿鞋）+ -고 있어요 表示"穿着/戴着"的持续状态，不是"正在穿"的动作进行。모자를 쓰고 있어요 = 戴着帽子（状态）。中文"穿着"和"正在穿"靠语境区分，韩语用同一结构。</div></div>
<div class="reminder-box">-고 연결 时不触发不规则变化：듣다 → 듣고 있어요（✓），不变形。-고 있다 只接动作动词，形容词不能用（예쁘고 있어요 ✗）。</div>`,
    structures: [
      {
        ko: '지금 한국어를 공부하고 있어요',
        zh: '现在正在学韩语。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 카페에서 커피를 마시고 있어요',
        zh: '我在咖啡馆喝咖啡。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마시고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래를 듣고 있어요',
        zh: '正在听这首歌。',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '밥을 먹고 있어요',
        zh: '正在吃饭。',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '动词去掉 다，直接加 -고 있어요',        examples: '먹다→먹고 있어요 / 보다→보고 있어요 / 가다→가고 있어요' },
      { type: 'rule',    text: '不用判断元音，不用判断有无收音',          examples: '所有动词统一加 -고 있어요' },
      { type: 'rule',    text: '하다 → 하고 있어요（不是 해고 있어요）', examples: '공부하다→공부하고 있어요 / 연습하다→연습하고 있어요' },
      { type: 'note',    text: '形容词不用 -고 있어요',                  examples: '좋아요（不说 좋고 있어요）/ 예뻐요（不说 예쁘고 있어요）' },
      { type: 'compare', text: '进行时 vs 普通现在时',                   examples: '공부해요（习惯）vs 공부하고 있어요（此刻正在）' },
      { type: 'note',    text: 'ㄷ 不规则接 -고 时不变',                examples: '듣다→듣고 있어요（-고 以辅音开头，不触发变化）' },
      { type: 'example', text: '지금 한국어를 공부하고 있어요 / 이 노래를 듣고 있어요 / 밥을 먹고 있어요' },
    ],
    structureNote: '进行时只有一套公式：\n动词词干 + 고 있어요。\n不用判断元音、不用看收音，是第一章最省心的语法。\n关键是搞清楚"正在做"和"习惯做"的区别。',
    rulesNote: '最大陷阱：\n하다 动词接고时保持原形，공부하고 있어요 而不是 공부해고 있어요。\n另外形容词（좋다、예쁘다）描述状态，不表示动作，所以不能加 -고 있어요。',
    scenarioNote: '对方问"你在干嘛？"时，如果是此刻正在做的事就用进行时；\n如果是表达习惯或身份就用普通现在时。\n手机打字、追剧、等人这些日常场景里进行时出现率极高。',
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
        zh: '现在正在学习韩语。',
        swapWords: ['공부하고 있어요', '드라마를 보고 있어요', '이 노래를 듣고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마시고 있어요', role: 'verb' },
        ],
        zh: '正在咖啡店喝咖啡。',
        swapWords: ['커피를 마시고 있어요', '밥을 먹고 있어요', '책을 읽고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
        zh: '正在听这首歌。',
        swapWords: ['이 노래를 듣고 있어요', '이 드라마를 보고 있어요', '이 영상을 보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '밥을', role: 'object' },
          { text: '먹고 있어요', role: 'verb' },
        ],
        zh: '正在吃饭。',
        swapWords: ['밥을 먹고 있어요', '라면을 먹고 있어요', '커피를 마시고 있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📱', context: '学习打卡', ko: '지금 한국어를 공부하고 있어요!', zh: '现在正在学习韩语！' },
      { icon: '🍽️', context: '用餐中', ko: '지금 밥 먹고 있어요. 조금 이따가 연락할게요.', zh: '现在正在吃饭，过一会联系你。' },
      { icon: '📺', context: '追剧中', ko: '지금 드라마 보고 있어요. 이따가 전화할게요.', zh: '现在在看电视剧，等一下打给你。' },
      { icon: '☕', context: '咖啡店学习', ko: '지금 카페에서 공부하고 있어요.', zh: '现在在咖啡店学习。' },
      { icon: '🏥', context: '等候室', ko: '지금 병원에서 기다리고 있어요.', zh: '现在在医院等候。' },
      { icon: '🎵', context: '听歌中', ko: '지금 좋아하는 노래를 듣고 있어요.', zh: '现在正在听喜欢的歌。' },
    ],
    mistakes: [
      { wrong: '공부해고 있어요', correct: '공부하고 있어요', note: '공부하다 去掉 다 是 공부하，直接接 고 있어요，不变成 해。' },
      { wrong: '지금 공부했어요', correct: '지금 공부하고 있어요', note: '공부했어요 是"学习了"（过去），공부하고 있어요 才是"正在学习"。' },
      { wrong: '좋고 있어요 / 예쁘고 있어요', correct: '좋아요 / 예뻐요', note: '形容词表示状态，不表示进行中的动作，不能加 -고 있어요。' },
      { wrong: '카페에 커피를 마시고 있어요', correct: '카페에서 커피를 마시고 있어요', note: '动作发生的场所用 에서（마시다 是动作动词）。' },
    ],
    quickTable: {
      title: '进行时速查表',
      body: '动词词干 + 고 있습니다 / 고 있어요',
      headers: ['原形', '进行时（正式）', '进行时（日常）', '中文'],
      rows: [
        [{ ko: '가다', zh: '去' }, { ko: '가고 있습니다', zh: '正在去（正式）' }, { ko: '가고 있어요', zh: '正在去（日常）' }, '正在去'],
        [{ ko: '먹다', zh: '吃' }, { ko: '먹고 있습니다', zh: '正在吃（正式）' }, { ko: '먹고 있어요', zh: '正在吃（日常）' }, '正在吃'],
        ['공부하다 学习', { ko: '공부하고 있습니다', zh: '正在学习（正式）' }, { ko: '공부하고 있어요', zh: '正在学习（日常）' }, '正在学习'],
        [{ ko: '보다', zh: '看' }, { ko: '보고 있습니다', zh: '正在看（正式）' }, { ko: '보고 있어요', zh: '正在看（日常）' }, '正在看'],
        ['듣다 听', { ko: '듣고 있습니다', zh: '正在听（正式）' }, { ko: '듣고 있어요', zh: '正在听（日常）' }, '正在听'],
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
    <div class="badge">第10课</div>
    <div class="ov-title">进行时 -고 있어요</div>
    <div class="ov-sub">正在做什么 · 此刻状态</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:.88rem;line-height:2">
        <strong>规则：</strong>动词去掉 다，直接加 -고 있어요<br>
        <strong>地点：</strong>在某地做某事 → 에서 + 动词 + 고 있어요<br>
        <strong>注意：</strong>하다 → 하고 있어요（不是 해고 있어요）<br>
        <strong>注意：</strong>形容词不用 -고 있어요（좋아요，不说 좋고 있어요）
      </div>
    </div>
    <div class="ov-sec">
      <h3>常用进行时表达</h3>
      <table>
        <tr><th>原形</th><th>进行时</th><th>中文</th></tr>
        <tr><td>공부하다</td><td>공부하고 있어요</td><td>正在学习</td></tr>
        <tr><td>먹다</td><td>먹고 있어요</td><td>正在吃</td></tr>
        <tr><td>보다</td><td>보고 있어요</td><td>正在看</td></tr>
        <tr><td>듣다</td><td>듣고 있어요</td><td>正在听</td></tr>
        <tr><td>기다리다</td><td>기다리고 있어요</td><td>正在等</td></tr>
      </table>
    </div>
    <div class="ov-sec">
      <h3>第一章全部语法点</h3>
      <div style="font-size:.82rem;line-height:2;color:#475569">
        01 SOV语序 · 02 正式体 ㅂ니다 · 03 日常体 아/어요<br>
        04 话题助词 은/는 · 05 宾语助词 을/를<br>
        06 助词 에 · 07 助词 에서<br>
        08 过去时 았/었어요 · 09 将来时 을/ㄹ 거예요 · 10 进行时 고 있어요
      </div>
    </div>
  </div>`,
  },
  {
    id: 'card-p1-l11',
    partNumber: 1,
    lessonNumber: 11,
    title: '综合练习①',
    whatItDoes: '第一章综合练习',
    whatItDoesBody: '完成这份练习，检验前 10 课是否掌握。\n共 7 组练习，包含排序、填空、变形、判断和改错。',
    isPractice: true,
    structureNote: '第一章10节课的核心主线：\n韩语语序（SOV）、两种礼貌体、六个助词（은/는/을/를/에/에서）、三种时态（过去/将来/进行）。\n这份练习覆盖全部考点，做完就能知道自己哪里还没掌握。',
    structures: [
      { ko: '저는 밥을 먹어요', zh: '我吃饭。', tokens: [{ text: '저는', role: 'subject' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }] },
      { ko: '한국어를 공부해요', zh: '学习韩语。', tokens: [{ text: '한국어를', role: 'object' }, { text: '공부해요', role: 'verb' }] },
      { ko: '저는 학교에 가요', zh: '我去学校。', tokens: [{ text: '저는', role: 'subject' }, { text: '학교에', role: 'place' }, { text: '가요', role: 'verb' }] },
      { ko: '저는 카페에서 커피를 마셔요', zh: '我在咖啡店喝咖啡。', tokens: [{ text: '저는', role: 'subject' }, { text: '카페에서', role: 'place' }, { text: '커피를', role: 'object' }, { text: '마셔요', role: 'verb' }] },
      { ko: '지금 이 노래를 듣고 있어요', zh: '现在正在听这首歌。', tokens: [{ text: '지금', role: 'time' }, { text: '이 노래를', role: 'object' }, { text: '듣고 있어요', role: 'verb' }] },
      { ko: '내일 공부할 거예요', zh: '明天要学习。', tokens: [{ text: '내일', role: 'time' }, { text: '공부할 거예요', role: 'verb' }] },
      { ko: '어제 공부했어요', zh: '昨天学习了。', tokens: [{ text: '어제', role: 'time' }, { text: '공부했어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '韩语语序：主语 → 宾语/状语 → 谓语（动词/形容词永远在句末）' },
      { type: 'rule', text: '有收音名词后：은/을/이；无收音名词后：는/를/가', examples: '학생은, 밥을, 이것이 / 저는, 커피를, 친구가' },
      { type: 'rule', text: '에（方向/存在/时间） vs 에서（动作发生场所）', examples: '학교에 가요 / 학교에서 공부해요' },
      { type: 'rule', text: '现在：아요/어요，过去：았/었어요，将来：을/ㄹ 거예요，进行：고 있어요', examples: '먹어요 / 먹었어요 / 먹을 거예요 / 먹고 있어요' },
      { type: 'compare', text: '합니다体（正式） vs 해요体（非正式礼貌）', examples: '먹습니다 / 먹어요' },
      { type: 'rule', text: '否定：안 + 动词（口语），动词 + 지 않아요（书面）', examples: '안 먹어요 / 먹지 않아요' },
      { type: 'rule', text: '疑问句：해요体末尾不变，语调上扬', examples: '먹어요? / 가요? / 학생이에요?' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '저는', role: 'subject' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }], zh: '我吃饭。', swapRole: 'object',
          swapWords: ['커피를', '김밥을'] },
      { wordBlocks: [{ text: '저는', role: 'subject' }, { text: '학교에', role: 'place' }, { text: '가요', role: 'verb' }], zh: '我去学校。', swapRole: 'place',
          swapWords: ['카페에', '회사에'] },
      { wordBlocks: [{ text: '어제', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }], zh: '昨天见了朋友。', swapRole: 'object',
          swapWords: ['선생님을', '가족을'] },
      { wordBlocks: [{ text: '내일', role: 'time' }, { text: '한국어를', role: 'object' }, { text: '공부할 거예요', role: 'verb' }], zh: '明天要学韩语。', swapRole: 'object',
          swapWords: ['영화를', '음악을'] },
    ],
    scenarios: [
      { icon: '🔤', context: '基本语序', ko: '저는 밥을 먹어요.', zh: '我吃饭。谓语放句末。' },
      { icon: '🎙️', context: '礼貌体', ko: '저는 학생입니다.', zh: '我是学生。正式体用 ㅂ니다/습니다。' },
      { icon: '🏷️', context: '话题助词', ko: '저는 한국어를 공부해요.', zh: '我学韩语。은/는 标记话题。' },
      { icon: '📍', context: '地点助词', ko: '학교에서 공부해요.', zh: '在学校学习。动作发生场所用 에서。' },
      { icon: '⏳', context: '时态运用', ko: '어제 공부했어요. 내일도 공부할 거예요.', zh: '昨天学习了，明天也要学习。' },
      { icon: '🚫', context: '否定句', ko: '오늘은 안 가요. 시간이 없어요.', zh: '今天不去。没有时间。' },
    ],
    mistakes: [
      { wrong: '저은 학생이에요', correct: '저는 학생이에요', note: '저는 无收音名词后 → 는' },
      { wrong: '저는 밥를 먹어요', correct: '저는 밥을 먹어요', note: '밥 有收音名词 → 을' },
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부하다 是动作动词 → 에서' },
      { wrong: '집에서 있어요', correct: '집에 있어요', note: '있다 是存在表达 → 에' },
      { wrong: '내일 공부했어요', correct: '내일 공부할 거예요', note: '내일 是未来时间词 → 을/ㄹ 거예요' },
      { wrong: '학생습니다', correct: '학생입니다', note: '名词后用 입니다，动词后用 습니다' },
    ],
    linkedGrammarIds: [],
    compareHtml: `<div class="card-title">第一章核心助词总览</div>
<div class="card-body">第一章学了六个最基础的助词和三种时态。这张卡把最容易混淆的几对放在一起对比，确认都记清楚了再进入第二章。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에 vs 에서</div><div style="font-size:14px;color:#89756e;margin-top:2px">方向/存在 vs 动作场所</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요 / 학교에 있어요</span><span style="font-size:14px;color:#5a4640">去学校 / 在学校（方向·存在）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교에서 공부해요</span><span style="font-size:14px;color:#5a4640">在学校学习（动作场所）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">은/는 vs 을/를</div><div style="font-size:14px;color:#89756e;margin-top:2px">话题 vs 宾语</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 학생이에요</span><span style="font-size:14px;color:#5a4640">我是学生。（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">밥을 먹어요</span><span style="font-size:14px;color:#5a4640">吃饭。（宾语）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">三种时态对比</div><div style="font-size:15px;color:#5a4640">현재（现在）：먹어요 / 공부해요<br>과거（过去）：먹었어요 / 공부했어요（-았/었어요）<br>미래（将来）：먹을 거예요 / 공부할 거예요（-을/ㄹ 거예요）<br>진행（进行）：먹고 있어요 / 공부하고 있어요（-고 있어요）</div></div>
<div class="reminder-box">收音判断口诀：有收音→은/을，无收音→는/를。에서 있어요 ✗ → 에 있어요 ✓（있다/없다 前永远用 에）。</div>`,
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 1 部分 · 综合练习</div>
    <div class="ov-hero-title">综合练习①</div>
    <div class="ov-hero-sub">语序 · 助词 · 时态 · 礼貌体</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本章核心语法</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">语序</span> 主 → 宾 → 谓（动词永远在句末）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">助词</span> 은/는（话题）/ 을/를（宾语）/ 에（方向·存在）/ 에서（动作场所）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">时态</span> 먹어요 / 먹었어요 / 먹을 거예요 / 먹고 있어요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">밥을</span><span class="tok t-v">먹어요</span></div><div class="struct-zh">我吃饭。</div></div>
        <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-p">학교에서</span><span class="tok t-v">공부해요</span></div><div class="struct-zh">我在学校学习。</div></div>
        <div><div class="tok-row"><span class="tok t-v">어제 공부했어요</span></div><div class="struct-zh">昨天学习了。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">집에서 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">집에 있어요（있다 用 에，不用 에서）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학교에 공부해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학교에서 공부해요（动作场所用 에서）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第二章 第1课：에 가다, 와/과, 하고 ──────────────────────
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에 가다 · 와/과 · 하고</h1>
  <p class="sub" style="color:#89756e;font-size:.9rem;margin-bottom:22px">说「去哪里」和「和谁一起」，这节课两个句型一起掌握。</p>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">친구하고 카페에 가요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">和朋友去咖啡店。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">선생님과 공부해요.</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">和老师一起学习。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:1.25rem;font-weight:700;color:#241917">주말에 한국에 가요!</div><div class="zh" style="font-size:.88rem;color:#89756e;margin-top:2px">周末去韩国！</div></div>
  </div>
  <div class="block">
    <div style="font-size:.95rem;font-weight:700;margin-bottom:10px;color:#2db89b">两个核心句型</div>
    <div style="background:#f8f4f0;border-radius:12px;padding:14px;font-size:.88rem;line-height:2.2">
      <div><span style="background:#eaf8f5;color:#2db89b;padding:2px 10px;border-radius:6px;font-weight:700">① 去哪里</span>　地点 <b style="color:#ff7fa8">에</b> 가요 / 와요</div>
      <div><span style="background:#fff0f5;color:#ff7fa8;padding:2px 10px;border-radius:6px;font-weight:700">② 和谁一起</span>　人名 <b style="color:#ff7fa8">와/과/하고</b> + 动词</div>
    </div>
    <div style="margin-top:10px;font-size:.85rem;color:#89756e">两个句型组合起来：친구<b style="color:#ff7fa8">와</b> 카페<b style="color:#ff7fa8">에</b> 가요 ✓</div>
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
  <div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">选哪个？</div><div style="font-size:15px;color:#5a4640">日常对话：用 하고，简单好记，无需看收音。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">书面/正式：用 와/과——看最后有无收音，无收音→와，有收音→과。</div></div>
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
          options: ['와', '과', '하고'],
          answer: 0,
          explanation: '친구 末尾无收音 → 와',
        },
        {
          pre: '선생님',
          post: ' 도서관에 가요.',
          options: ['와', '과', '하고'],
          answer: 1,
          explanation: '선생님 末尾有收音 ㅁ → 과',
        },
        {
          pre: '책',
          post: ' 연필을 사요.',
          options: ['와', '과', '하고'],
          answer: 1,
          explanation: '책 末尾有收音 ㄱ → 과',
        },
        {
          pre: '엄마',
          post: ' 시장에 가요.',
          options: ['와', '과', '하고'],
          answer: 0,
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
    <div style="font-size:12px;color:#89756e;margin-top:6px">可替换：카페에 / 회사에 / 병원에 / 도서관에</div>
  </div>
  <div class="ov-sec">
    <h3>② 和……：와/과（书面）</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      有收音 → <b style="color:#ff7fa8">과</b>：선생님과, 동생과, 책과<br>
      无收音 → <b style="color:#2db89b">와</b>：친구와, 엄마와, 가수와
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 和……：하고（口语）</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      不分收音，直接加：친구하고 / 선생님하고<br>
      <span style="color:#89756e">와/과 是书面，하고 是口语，都正确</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 并列名词</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      커피<b style="color:#ff7fa8">하고</b> 빵을 사요（买咖啡和面包）<br>
      책<b style="color:#ff7fa8">과</b> 연필을 사요（买书和铅笔）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
      <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">있다/없다 的主语必须加 이/가</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px"><span class="pill p-s">친구가</span><span class="pill p-v">있어요</span></div>
      <div style="font-size:12px;color:#89756e">有朋友。— 이/가 不可省略</div>
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">이/가 있다 · 없다</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">「有/没有」「在/不在」——韩语用同一个词，关键看句子里有没有地点。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">책이 있어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">有书。（有/没有）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">휴대폰이 가방 안에 있어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">手机在包里。（在某地）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">책상 위에 책이 있어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">桌上有书。（某地有……）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">三种核心句型</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">① 有/没有</span>　名词+이/가 있어요 / 없어요</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">② 在某地</span>　名词+이/가 + 地点+에 있어요</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">③ 某地有</span>　地点+에 + 名词+이/가 있어요</div>
  </div>
  <div style="font-size:13px;color:#5a4640;margin-top:8px;line-height:1.7">중요：有/在/存在，韩语全用 있어요——靠有没有地点来区分"有"和"在"。</div>
</div>
<div class="reminder-box">이/가 的选择只看名词末字有没有收音：有收音 → 이，无收音 → 가。</div>`,
    compareHtml: `<div class="card-title">이 vs 가 — 主格助词选择</div>
<div class="card-body">只看名词最后一个字：有收音接 이，无收音接 가。和 이/가 是话题助词 은/는 的逻辑完全一样。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">有收音 → 이</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">책<b style="color:#ff7fa8">이</b></span><span style="font-size:12px;color:#89756e">书</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">시간<b style="color:#ff7fa8">이</b></span><span style="font-size:12px;color:#89756e">时间</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">돈<b style="color:#ff7fa8">이</b></span><span style="font-size:12px;color:#89756e">钱</span></div>
    <div class="tok-row"><span class="tok t-s">가방<b style="color:#ff7fa8">이</b></span><span style="font-size:12px;color:#89756e">包</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">无收音 → 가</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">친구<b style="color:#2db89b">가</b></span><span style="font-size:12px;color:#89756e">朋友</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">의자<b style="color:#2db89b">가</b></span><span style="font-size:12px;color:#89756e">椅子</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">커피<b style="color:#2db89b">가</b></span><span style="font-size:12px;color:#89756e">咖啡</span></div>
    <div class="tok-row"><span class="tok t-s">고양이<b style="color:#2db89b">가</b></span><span style="font-size:12px;color:#89756e">猫</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">常用位置词（+ 에）</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px">
    <span class="chip p">위（上）</span><span class="chip p">아래（下）</span><span class="chip p">앞（前）</span>
    <span class="chip p">뒤（后）</span><span class="chip p">안（里）</span><span class="chip p">밖（外）</span><span class="chip p">옆（旁）</span>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">이/가 vs 은/는</div><div style="font-size:15px;color:#5a4640">은/는 强调话题（我嘛……），이/가 强调主体或引入新信息。两者都能做主语助词，但感觉不同。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">초보자는 모음만 보면 됩니다 → 다음에 있다/없다가 오면 이/가를 씁니다。</div></div>
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
          options: ['이', '가', '은'],
          answer: 0,
          explanation: '책 有收音 ㄱ → 이',
        },
        {
          pre: '커피',
          post: ' 없어요.',
          options: ['이', '가', '는'],
          answer: 1,
          explanation: '커피 无收音 → 가',
        },
        {
          pre: '친구',
          post: ' 카페에 있어요.',
          options: ['이', '가', '를'],
          answer: 1,
          explanation: '친구 无收音 → 가',
        },
        {
          pre: '시간',
          post: ' 없어요?',
          options: ['이', '가', '도'],
          answer: 0,
          explanation: '시간 有收音 ㄴ → 이',
        },
      ],
    },
  },

  // ── 第二章 第3课：-ㅂ시다/읍시다, -(으)세요 ─────────────────
  {
    id: 'card-p2-l03',
    partNumber: 2,
    lessonNumber: 4,
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-ㅂ시다/읍시다 · -(으)세요</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">邀请对方一起做 vs 礼貌请对方做——两种词尾，语气完全不同。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">같이 공부합시다!</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">我们一起学习吧！（说话人也参与）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">앉으세요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">请坐。（礼貌请对方做）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">천천히 말씀해 주세요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">请说慢一点。（请求帮忙）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两套词尾的核心区别</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-ㅂ시다/읍시다</span>　说话人也参与 → "咱们一起……吧"</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-(으)세요</span>　　　只请对方做 → "请您……"</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">-(으)십시오</span>　正式场合专用 → 广播/告示</div>
  </div>
  <div style="font-size:13px;color:#5a4640;margin-top:8px;line-height:1.7">变形规则：看词干末字有无收音——无收音接 -ㅂ시다/-세요，有收音接 -읍시다/-으세요。</div>
</div>
<div class="reminder-box">ㅂ시다 说"我们一起去"，세요 说"请您去"——说话人参不参与是关键区别。</div>`,
    compareHtml: `<div class="card-title">-ㅂ시다/읍시다 vs -(으)세요</div>
<div class="card-body">词干末字有无收音决定接哪个形式。口诀：无收音短，有收音加 으。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">无收音 → -ㅂ시다 / -세요</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">갑시다</span><span style="font-size:12px;color:#89756e">走吧（가다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">봅시다</span><span style="font-size:12px;color:#89756e">看吧（보다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">가세요</span><span style="font-size:12px;color:#89756e">请去（가다）</span></div>
    <div class="tok-row"><span class="tok t-v">보세요</span><span style="font-size:12px;color:#89756e">请看（보다）</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">有收音 → -읍시다 / -으세요</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹읍시다</span><span style="font-size:12px;color:#89756e">吃吧（먹다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">읽읍시다</span><span style="font-size:12px;color:#89756e">读吧（읽다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹으세요</span><span style="font-size:12px;color:#89756e">请吃（먹다）</span></div>
    <div class="tok-row"><span class="tok t-v">앉으세요</span><span style="font-size:12px;color:#89756e">请坐（앉다）</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">ㄹ词干特例：ㄹ脱落后接 -ㅂ시다</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">압시다</span><span style="font-size:12px;color:#89756e">知道吧（알다 → ㄹ脱落）</span></div>
  <div class="tok-row"><span class="tok t-v">만듭시다</span><span style="font-size:12px;color:#89756e">做吧（만들다 → ㄹ脱落）</span></div>
</div>
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
          options: ['가세요', '가으세요', '갑시다'],
          answer: 0,
          explanation: '가 词干无收音 → 直接加 세요',
        },
        {
          pre: '앉다 →',
          post: '',
          options: ['앉세요', '앉으세요', '앉읍시다'],
          answer: 1,
          explanation: '앉 词干有收音 ㄵ → 加 으세요',
        },
        {
          pre: '읽다 →',
          post: '',
          options: ['읽세요', '읽으세요', '읽십시오'],
          answer: 1,
          explanation: '읽 词干有收音 ㄺ → 加 으세요',
        },
        {
          pre: '기다리다 →',
          post: '',
          options: ['기다리으세요', '기다리세요', '기다립시다'],
          answer: 1,
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
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">ㅂ시다</b>：갑시다, 봅시다, 공부합시다<br>
      받침 있는 → <b style="color:#ff7fa8">읍시다</b>：먹읍시다, 읽읍시다, 앉읍시다
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 请您……：-(으)세요</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#2db89b">세요</b>：가세요, 보세요, 기다리세요<br>
      받침 있는 → <b style="color:#2db89b">으세요</b>：먹으세요, 읽으세요, 앉으세요
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 请……（正式）：-(으)십시오</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#6b7ff0">십시오</b>：가십시오, 확인하십시오<br>
      받침 있는 → <b style="color:#6b7ff0">으십시오</b>：앉으십시오, 읽으십시오
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 语气区别</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      같이 갑시다 — 一起去吧（说话人也去）<br>
      가세요 — 请您去（只请对方）<br>
      가십시오 — 请走（正式/公告语气）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
    lessonNumber: 5,
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
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">数词 · 量词</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">韩语有两套数字系统，搞清楚谁配谁，点餐、购物、报人数全不怕。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">아메리카노 한 잔 주세요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">请给我一杯美式。（固有数词+量词）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">네 명이에요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">四个人。（人数用固有数词）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">오천 원이에요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">五千韩元。（价格用汉字数词）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两套数字系统一眼看清</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">固有数词</span>　하나·둘·셋·넷… → 量词前缩短：한·두·세·네</div>
    <div style="font-size:12px;color:#89756e;padding-left:8px">配：个(개)·人(명)·杯(잔)·本(권)·瓶(병)·张(장)·只(마리)</div>
    <div style="font-size:13px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#2db89b">汉字数词</span>　일·이·삼·사… → 不缩短，直接用</div>
    <div style="font-size:12px;color:#89756e;padding-left:8px">配：韩元(원)·月份(월)·日期(일)·分钟(분)·电话号码</div>
  </div>
</div>
<div class="reminder-box">하나/둘/셋/넷 接量词时必须缩短：한 잔 ✓，하나 잔 ✗。</div>`,
    compareHtml: `<div class="card-title">固有数词 vs 汉字数词</div>
<div class="card-body">两套系统各有分工，混用会让人听不懂。关键：数人/个/杯/本用固有，数钱/月/日/分用汉字。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">固有数词（量词前缩短）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">한 잔</span><span style="font-size:12px;color:#89756e">一杯</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">두 명</span><span style="font-size:12px;color:#89756e">两人</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">세 권</span><span style="font-size:12px;color:#89756e">三本</span></div>
    <div class="tok-row"><span class="tok t-s">네 개</span><span style="font-size:12px;color:#89756e">四个</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">汉字数词（不缩短）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">오천 원</span><span style="font-size:12px;color:#89756e">五千元</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">삼 월</span><span style="font-size:12px;color:#89756e">三月</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">십오 일</span><span style="font-size:12px;color:#89756e">十五号</span></div>
    <div class="tok-row"><span class="tok t-v">삼십 분</span><span style="font-size:12px;color:#89756e">三十分</span></div>
  </div>
</div>
<div style="background:#f8f4f0;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#241917;margin-bottom:6px">시(点)用固有，분(分)用汉字</div>
  <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">두 시</span><span style="font-size:12px;color:#89756e">两点（固有）</span></div>
  <div class="tok-row"><span class="tok t-v">삼십 분</span><span style="font-size:12px;color:#89756e">三十分（汉字）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">记忆口诀</div><div style="font-size:15px;color:#5a4640">固有数词（하나/둘…）：数人、数量词、时钟「几点」。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">汉字数词（일/이/삼…）：钱、月份、日期、分钟、电话号码。</div></div>
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
    <div style="font-size:13px;color:#241917;line-height:2">
      하나(한) 둘(두) 셋(세) 넷(네) 다섯<br>
      여섯 일곱 여덟 아홉 열<br>
      <span style="color:#89756e;font-size:12px">수량사 앞에서 时：하나→한, 둘→두, 셋→세, 넷→네</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 汉字数词</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      일 이 삼 사 오 육 칠 팔 구 십<br>
      백(100) 천(1000) 만(10000)<br>
      <span style="color:#89756e;font-size:12px">用于：价格/원、月份/월、日期/일、分钟/분</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 常用量词搭配</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">한 잔</b> 咖啡一杯 &nbsp; <b style="color:#ff7fa8">두 명</b> 两个人<br>
      <b style="color:#ff7fa8">세 권</b> 三本书 &nbsp; <b style="color:#ff7fa8">네 개</b> 四个<br>
      <b style="color:#2db89b">오천 원</b> 5000韩元 &nbsp; <b style="color:#2db89b">삼 월</b> 3月
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
    lessonNumber: 7,
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
      { wrong: '저의 = 제（一律替换）', correct: '두 표현 모두 사용 가능', note: '저의 和 제 都对，제 在口语更自然，저의 更书面正式。' },
      { wrong: '저는도 좋아해요', correct: '저도 좋아해요', note: '도 替换 은/는，不要叠用：저는도 × → 저도 ✓。' },
      { wrong: '커피를만 마셔요', correct: '커피만 마셔요', note: '만 替换 을/를，不要叠用：커피를만 × → 커피만 ✓。' },
      { wrong: '저만도 알아요', correct: '저만 알아요', note: '도 和 만 不同时用于同一成分，意思会混乱。' },
    ],
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">의 · 도 · 만</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">三个小助词让句子更丰富：说"的"用 의，说"也"用 도，说"只"用 만。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">이건 제 친구의 사진이에요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">这是我朋友的照片。（의=的）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">저도 이 가수 좋아해요!</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">我也喜欢这位歌手！（도=也）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">저는 커피만 마셔요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">我只喝咖啡。（만=只）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">三个助词核心用法</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">의</span>　名词A + 의 + 名词B = "A的B"　（口语"我的"：저의→제）</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">도</span>　直接替换 은/는/이/가/을/를 → 表示"也"</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">만</span>　直接替换其他助词 → 表示"只、仅"</div>
  </div>
  <div style="font-size:13px;color:#5a4640;margin-top:8px;line-height:1.7">도 和 만 不能叠加在同一名词上：커피를만 ✗ → 커피만 ✓。</div>
</div>
<div class="reminder-box">도/만 替换助词，不叠加——저는도 ✗ → 저도 ✓，커피를만 ✗ → 커피만 ✓。</div>`,
    compareHtml: `<div class="card-title">도（也）vs 만（只）</div>
<div class="card-body">两个助词功能相反：도 追加同类信息，만 排除其他只留一个。都直接接名词，替换原有助词。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">도 — 也（追加）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">저도</span><span style="font-size:12px;color:#89756e">我也</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">한국어도</span><span style="font-size:12px;color:#89756e">韩语也</span></div>
    <div class="tok-row"><span class="tok t-o">이것도</span><span style="font-size:12px;color:#89756e">这个也</span></div>
  </div>
  <div style="background:#f0eef8;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">만 — 只（限定）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">커피만</span><span style="font-size:12px;color:#89756e">只咖啡</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-o">오늘만</span><span style="font-size:12px;color:#89756e">只今天</span></div>
    <div class="tok-row"><span class="tok t-s">나만</span><span style="font-size:12px;color:#89756e">只有我</span></div>
  </div>
</div>
<div style="background:#fff0f5;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">의 — 的（所属）</div>
  <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">친구의 책</span><span style="font-size:12px;color:#89756e">朋友的书</span></div>
  <div class="tok-row"><span class="tok t-s">제 가방</span><span style="font-size:12px;color:#89756e">我的包（저의→제）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">의 vs 도/만</div><div style="font-size:15px;color:#5a4640">의（的）可以省略：저의 가방 = 제 가방，日常口语多省略。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">도（也）/만（只）直接替换主格/宾格助词，不叠加：저도（我也）→ 저는도 ✗。</div></div>
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
    <div style="font-size:13px;color:#241917;line-height:2">
      친구<b style="color:#ff7fa8">의</b> 책（朋友的书）<br>
      선생님<b style="color:#ff7fa8">의</b> 가방（老师的包）<br>
      <span style="color:#89756e">저의→<b style="color:#ff7fa8">제</b>（我的，礼貌口语）&nbsp; 나의→<b style="color:#ff7fa8">내</b>（我的，亲近口语）</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 도 — 也</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      저<b style="color:#2db89b">도</b> 학생이에요（我也是学生）<br>
      한국어<b style="color:#2db89b">도</b> 재미있어요（韩语也有趣）<br>
      <span style="color:#89756e">도 直接替换 은/는/이/가/을/를，不叠用</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 만 — 只、只有</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      커피<b style="color:#6b7ff0">만</b> 마셔요（只喝咖啡）<br>
      오늘<b style="color:#6b7ff0">만</b> 시간이 있어요（只有今天有时间）<br>
      <span style="color:#89756e">만 直接替换其他助词，不叠用</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
    lessonNumber: 8,
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">안 · -지 않다 · 그리고 · 그렇지만</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">说"不……"的两种方式，再把两句话连起来——否定+连词一起学效率翻倍。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">오늘은 학교에 안 가요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">今天不去学校。（안 简短否定）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">한국어는 어렵지 않아요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">韩语不难。（-지 않아요 完整否定）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">맛있어요. 그렇지만 비싸요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">好吃，但是贵。（그렇지만 转折）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">否定两条路，连词两选一</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">안</span>　直接放动词前 → 口语快速否定（하다动词：名词 + 안 해요）</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-지 않아요</span>　词干 + 지 않아요 → 完整否定，更正式</div>
    <div style="font-size:13px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">그리고</span>　连接补充/顺接　<span style="font-weight:700;color:#b49ccf">그렇지만</span>　连接转折</div>
  </div>
</div>
<div class="reminder-box">하다 动词否定口语首选：공부 안 해요（✓）比 안 공부해요 更自然。</div>`,
    compareHtml: `<div class="card-title">안 vs -지 않아요</div>
<div class="card-body">两种否定语义相同，区别在语气：안 是口语快速否定，-지 않아요 更完整正式。하다 动词有特殊口语规则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">안 — 口语简短</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">안 가요</span><span style="font-size:12px;color:#89756e">不去</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">안 먹어요</span><span style="font-size:12px;color:#89756e">不吃</span></div>
    <div class="tok-row"><span class="tok t-v">공부 안 해요</span><span style="font-size:12px;color:#89756e">不学习</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">-지 않아요 — 完整正式</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">가지 않아요</span><span style="font-size:12px;color:#89756e">不去</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">먹지 않아요</span><span style="font-size:12px;color:#89756e">不吃</span></div>
    <div class="tok-row"><span class="tok t-v">어렵지 않아요</span><span style="font-size:12px;color:#89756e">不难</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">连接词对比</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">그리고</span><span style="font-size:12px;color:#89756e">而且/然后（顺接补充）</span></div>
  <div class="tok-row"><span class="tok t-v">그렇지만</span><span style="font-size:12px;color:#89756e">但是/不过（转折对比）</span></div>
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
          options: ['안', '지 않', '그리고'],
          answer: 0,
          explanation: '口语否定，안 放动词前：커피를 안 마셔요',
        },
        {
          pre: '한국어는 어렵',
          post: ' 않아요.',
          options: ['안', '지', '그렇지만'],
          answer: 1,
          explanation: '词干 + 지 않아요，形容词 어렵다→어렵지 않아요',
        },
        {
          pre: '한국어를 공부해요.',
          post: ' 드라마도 봐요.',
          options: ['그리고', '그렇지만', '안'],
          answer: 0,
          explanation: '顺接补充信息，用 그리고',
        },
        {
          pre: '이 노래는 좋아요.',
          post: ' 발음이 어려워요.',
          options: ['그리고', '그렇지만', '안'],
          answer: 1,
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
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">안</b> 가요（不去）&nbsp; <b style="color:#ff7fa8">안</b> 먹어요（不吃）<br>
      하다 동사：공부 <b style="color:#ff7fa8">안 해요</b>（不学习，比 안 공부해요 更自然）
    </div>
  </div>
  <div class="ov-sec">
    <h3>② -지 않아요 — 完整否定</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      가<b style="color:#2db89b">지 않아요</b>（不去）&nbsp; 먹<b style="color:#2db89b">지 않아요</b>（不吃）<br>
      어렵<b style="color:#2db89b">지 않아요</b>（不难）&nbsp; 좋아하<b style="color:#2db89b">지 않아요</b>（不喜欢）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 连接词</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">그리고</b>：A. 그리고 B.（而且/然后，顺接补充）<br>
      <b style="color:#e8a87c">그렇지만</b>：A. 그렇지만 B.（但是，转折对比）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
    lessonNumber: 3,
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">이/가 · 이, 그, 저</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">主格助词 이/가 标出主语，指示词 이/그/저 指出"这个/那个"——两套工具合起来就能精准说人说物。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">이 노래가 진짜 너무 좋아요!</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">这首歌真的太好了！（이=这，가=主格）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">저 가수가 누구예요?</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">那位歌手是谁？（저=远处那个）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">이거 얼마예요?</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">这个多少钱？（이거=이것 口语形）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两套工具各有位置</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">이/가</span>　接名词<b>后</b>，标记主语　有收音→이，无收音→가</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">이/그/저</span>　接名词<b>前</b>，指示距离　이=近，그=中，저=远</div>
    <div style="font-size:13px;color:#5a4640;margin-top:4px">两者可以同时出现：이 노래<b>가</b> 좋아요（这首歌好）</div>
  </div>
</div>
<div class="reminder-box">이/가 是助词（名词后），이/그/저 是指示词（名词前）——同一个 이 出现两次功能不同。</div>`,
    compareHtml: `<div class="card-title">이/그/저 — 三级距离指示词</div>
<div class="card-body">按说话人和听话人的距离分三级。口语中 이것/그것/저것 缩成 이거/그거/저거，更常用。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:10px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:6px">이 — 近（我这边）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">이 사람</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-s">이 노래</span></div>
    <div class="tok-row"><span class="tok t-s">이거</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:10px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:6px">그 — 中（你那边）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-v">그 책</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-v">그 배우</span></div>
    <div class="tok-row"><span class="tok t-v">그거</span></div>
  </div>
  <div style="background:#f0eef8;border-radius:12px;padding:10px">
    <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:6px">저 — 远（双方都远）</div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-o">저 가수</span></div>
    <div class="tok-row" style="margin-bottom:4px"><span class="tok t-o">저 건물</span></div>
    <div class="tok-row"><span class="tok t-o">저거</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">이/가 收音选择规则</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">책<b style="color:#ff7fa8">이</b></span><span style="font-size:12px;color:#89756e">有收音→이</span></div>
  <div class="tok-row"><span class="tok t-s">친구<b style="color:#2db89b">가</b></span><span style="font-size:12px;color:#89756e">无收音→가</span></div>
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
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 있는 → <b style="color:#ff7fa8">이</b>：책이, 시간이, 돈이<br>
      받침 없는 → <b style="color:#2db89b">가</b>：친구가, 비가, 가수가<br>
      <span style="color:#89756e">用于：引入新信息、강조、있다/없다 的主语</span>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 指示词 이/그/저</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">이</b>（这）：이 사람, 이 노래, 이거<br>
      <b style="color:#2db89b">그</b>（那/刚提到的）：그 책, 그 배우, 그거<br>
      <b style="color:#6b7ff0">저</b>（远处那）：저 가수, 저 건물, 저거
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 이 사람이… — 双重 이</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">이</b> 사람<b style="color:#2db89b">이</b> 누구예요?<br>
      前者 이 = 指示词"这"，后者 이 = 主格助词
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
    lessonNumber: 6,
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">부터…까지 · 时间表示法</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">说"从……到……"的范围，加上几点几分的读法——约时间、说日程全靠这节课。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">세 시부터 다섯 시까지 공부해요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">从三点学习到五点。</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">오전 열 시 반이에요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">上午十点半。（반=30분）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">서울에서 부산까지 얼마나 걸려요?</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">从首尔到釜山要多久？（空间用 에서）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两个核心句型</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">부터…까지</span>　时间/范围：월요일부터 금요일까지</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">에서…까지</span>　空间：서울에서 부산까지</div>
    <div style="font-size:13px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">시（点）</span>固有数词　<span style="font-weight:700;color:#b49ccf">분（分）</span>汉字数词　반=30分</div>
  </div>
</div>
<div class="reminder-box">시（时刻）用固有：세 시 ✓，삼 시 ✗。분（分钟）用汉字：삼십 분 ✓，서른 분 ✗。</div>`,
    compareHtml: `<div class="card-title">부터 vs 에서（起点）</div>
<div class="card-body">两个助词都表示"从"，但分工不同：부터 管时间和抽象范围，에서 管空间地点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">부터 — 时间/范围起点</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">아침부터</span><span style="font-size:12px;color:#89756e">从早上</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">지금부터</span><span style="font-size:12px;color:#89756e">从现在</span></div>
    <div class="tok-row"><span class="tok t-s">월요일부터</span><span style="font-size:12px;color:#89756e">从周一</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">에서 — 空间地点起点</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-p">서울에서</span><span style="font-size:12px;color:#89756e">从首尔</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-p">집에서</span><span style="font-size:12px;color:#89756e">从家</span></div>
    <div class="tok-row"><span class="tok t-p">학교에서</span><span style="font-size:12px;color:#89756e">从学校</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">时间数词规则</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-s">세 시</span><span style="font-size:12px;color:#89756e">三点（固有数词 셋→세）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">삼십 분</span><span style="font-size:12px;color:#89756e">三十分（汉字数词）</span></div>
  <div class="tok-row"><span class="tok t-v">두 시 반</span><span style="font-size:12px;color:#89756e">两点半（반=30分）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">부터/까지 核心用法</div><div style="font-size:15px;color:#5a4640">时间范围：월요일부터 금요일까지（从周一到周五）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">空间起点用 에서（不用 부터）：서울에서 부산까지 — 에서 标动作出发地，부터 标时间/顺序起点。</div></div>
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
          options: ['부터', '까지', '에서'],
          answer: 0,
          explanation: '时间/抽象起点用 부터',
        },
        {
          pre: '세 시부터 다섯 시',
          post: ' 수업이에요.',
          options: ['부터', '까지', '에서'],
          answer: 1,
          explanation: '终点用 까지',
        },
        {
          pre: '서울',
          post: ' 부산까지 얼마나 걸려요?',
          options: ['부터', '에서', '까지'],
          answer: 1,
          explanation: '空间起点用 에서',
        },
        {
          pre: '지금 몇 시예요? 오후',
          post: ' 시 삼십 분이에요.（两点）',
          options: ['이', '두', '삼'],
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
    <div style="font-size:13px;color:#241917;line-height:2">
      월요일<b style="color:#ff7fa8">부터</b> 금요일<b style="color:#2db89b">까지</b>（从周一到周五）<br>
      세 시<b style="color:#ff7fa8">부터</b> 다섯 시<b style="color:#2db89b">까지</b>（从三点到五点）<br>
      공간 起点：서울<b style="color:#6b7ff0">에서</b> 부산<b style="color:#2db89b">까지</b>
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 时间数词</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      시（点钟）→ 固有数词：<b style="color:#ff7fa8">한 두 세 네 다섯…열두</b><br>
      분（分钟）→ 汉字数词：<b style="color:#2db89b">십 이십 삼십…오십구</b><br>
      반 = 30분：두 시 <b style="color:#ff7fa8">반</b>（两点半）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 오전/오후</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">오전</b> 열 시（上午十点）<br>
      <b style="color:#e8a87c">오후</b> 일곱 시（下午七点）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
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
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에게（书面/正式）</div><div style="font-size:14px;color:#89756e;margin-top:2px">文章、信件、正式场合</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">선생님에게 물었어요.</span><span style="font-size:14px;color:#5a4640">问了老师。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">친구에게 보냈어요.</span><span style="font-size:14px;color:#5a4640">发给朋友了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">한테（口语）</div><div style="font-size:14px;color:#89756e;margin-top:2px">日常对话、聊天</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테 카톡 보냈어요.</span><span style="font-size:14px;color:#5a4640">给朋友发了KakaoTalk。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">엄마한테 전화했어요.</span><span style="font-size:14px;color:#5a4640">给妈妈打了电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">ㅂ 不规则：遇元音变 워</div><div style="font-size:15px;color:#5a4640">덥다→더워요（热）/ 춥다→추워요（冷）/ 어렵다→어려워요（难）。规律：ㅂ 遇元音语尾时脱落，变成 워。但 입다(穿)/잡다(抓) 是规则变化，不走这条规律。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">收/发方向：에게/한테 = 给谁（发出）；에게서/한테서 = 从谁那里（收到）。</div></div>
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">에게/한테</span> → 给谁/对谁（方向）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">에게서/한테서</span> → 从谁那里（来源）</div>
        <div style="font-size:13px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#6b7ff0">ㅂ 不规则</span>：ㅂ + 元音 → 워（덥다→더워요）</div>
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
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에게 · 한테 · ㅂ 不规则</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">说"给谁/对谁"，加上天气词的特殊变形——让你能聊日常、说感受。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">친구한테 카톡 보냈어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">给朋友发了KakaoTalk消息。</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">오늘 너무 더워요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">今天太热了。（덥다→더워요，ㅂ不规则）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">친구한테서 선물을 받았어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">从朋友那里收到了礼物。（한테서=来源）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两个核心知识点</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">에게/한테</span>　接人名后，表示"给谁/对谁"　口语用 한테，书面用 에게</div>
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">ㅂ 不规则</span>　词干末 ㅂ + 元音 → 워　덥다→더워요 / 춥다→추워요</div>
  </div>
  <div style="font-size:13px;color:#5a4640;margin-top:8px;line-height:1.7">注意：입다(穿)、잡다(抓) 是规则词，不变形：입어요 ✓，입워요 ✗。</div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:.85rem;font-weight:700;color:#241917;margin-bottom:6px">에게/한테 方向</div><div style="font-size:.85rem;color:#5a4640">给方向（向）→ 에게/한테：친구한테 전화해요（给朋友打电话）。</div><div style="margin-top:4px;font-size:.85rem;color:#5a4640">来源方向（从）→ 에게서/한테서：친구한테서 받았어요（从朋友那收到）。「서」表示来源。</div></div>
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
          options: ['에게', '한테', '에서'],
          answer: 1,
          explanation: '口语对话用 한테',
        },
        {
          pre: '선생님',
          post: ' 편지를 써요.（书面/正式）',
          options: ['에게', '한테', '한테서'],
          answer: 0,
          explanation: '书面/正式语境用 에게',
        },
        {
          pre: '오늘 날씨가 너무',
          post: '.',
          options: ['덥어요', '더워요', '덥요'],
          answer: 1,
          explanation: '덥다 是 ㅂ 不规则，ㅂ→워：더워요',
        },
        {
          pre: '이 가방이',
          post: '.',
          options: ['무겁어요', '무거워요', '무겁요'],
          answer: 1,
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㄷ 不规则</span>：ㄷ + 元音 → ㄹ（듣다→들어요，걷다→걸어요）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">ㅡ 脱落</span>：末 ㅡ + 아/어 → ㅡ 消失（쓰다→써요，예쁘다→예뻐요）</div>
        <div style="font-size:12px;color:#89756e;margin-top:4px">注意：받다/믿다 的 ㄷ 是规则，不变形。</div>
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
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">받다→발아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">받아요（받다 是规则动词，ㄷ 不变）</span></div></div>
    </div>
  </div>
</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">ㄷ 不规则 · ㅡ 脱落</h1>
<p class="sub" style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">两类变形规律——看懂 듣다→들어요 和 아프다→아파요，高频词一次搞定。</p>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">이 노래를 들어요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">听这首歌。（듣다→들어요，ㄷ不规则）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">머리가 아파요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">头疼。（아프다→아파요，ㅡ脱落）</div>
    </div>
    <div style="background:#fff8fb;border-radius:10px;padding:10px 14px">
      <div style="font-size:15px;font-weight:700;color:#241917">요즘 너무 바빠요.</div>
      <div style="font-size:13px;color:#89756e;margin-top:2px">最近太忙了。（바쁘다→바빠요，ㅡ脱落）</div>
    </div>
  </div>
</div>
<div class="block">
  <div style="font-size:13px;font-weight:700;color:#241917;margin-bottom:8px">两套变形规律</div>
  <div style="background:#f8f4f0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㄷ 不规则</span>　词干末 ㄷ + 元音 → ㄷ 变 ㄹ　듣다→들어요 / 걷다→걸어요</div>
    <div style="font-size:12px;color:#89756e;padding-left:8px">⚠️ 规则词不变：받다→받아요 / 믿다→믿어요</div>
    <div style="font-size:13px;color:#241917;margin-top:4px"><span style="font-weight:700;color:#2db89b">ㅡ 脱落</span>　词干末 ㅡ 接 아/어요 时消失，看前元音选接 아/어</div>
    <div style="font-size:12px;color:#89756e;padding-left:8px">前元音 ㅏ/ㅗ→아파요 　其他→예뻐요 　单音节→써요</div>
  </div>
</div>
<div class="reminder-box">两种变形都接 -고 时不触发：듣고 있어요 ✓（不是 들고）/ 아프고 피곤해요 ✓。</div>`,
    compareHtml: `<div class="card-title">ㄷ 不规则 — 变 vs 不变</div>
<div class="card-body">不是所有 ㄷ 结尾的词都变形。高频词要记住哪些变、哪些不变，接 -고 等辅音语尾时两类都不变。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
  <div style="background:#fff0f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#ff7fa8;margin-bottom:8px">ㄷ 不规则（遇元音变 ㄹ）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">들어요</span><span style="font-size:12px;color:#89756e">听（듣다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">걸어요</span><span style="font-size:12px;color:#89756e">走（걷다）</span></div>
    <div class="tok-row"><span class="tok t-v">물어요</span><span style="font-size:12px;color:#89756e">问（묻다）</span></div>
  </div>
  <div style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div style="font-size:12px;font-weight:700;color:#2db89b;margin-bottom:8px">ㄷ 规则（不变）</div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">받아요</span><span style="font-size:12px;color:#89756e">收（받다）</span></div>
    <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">믿어요</span><span style="font-size:12px;color:#89756e">信（믿다）</span></div>
    <div class="tok-row"><span class="tok t-v">닫아요</span><span style="font-size:12px;color:#89756e">关（닫다）</span></div>
  </div>
</div>
<div style="background:#f0eef8;border-radius:12px;padding:12px;margin-bottom:12px">
  <div style="font-size:12px;font-weight:700;color:#6b7ff0;margin-bottom:8px">ㅡ 脱落（前元音决定 아/어）</div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">아파요</span><span style="font-size:12px;color:#89756e">痛（아프다，前元音ㅏ→아）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">바빠요</span><span style="font-size:12px;color:#89756e">忙（바쁘다，前元音ㅏ→아）</span></div>
  <div class="tok-row" style="margin-bottom:6px"><span class="tok t-v">예뻐요</span><span style="font-size:12px;color:#89756e">漂亮（예쁘다，前元音非ㅏ/ㅗ→어）</span></div>
  <div class="tok-row"><span class="tok t-v">써요</span><span style="font-size:12px;color:#89756e">写（쓰다，单音节→어）</span></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">两类不规则口诀</div><div style="font-size:15px;color:#5a4640">ㄷ 不规则：듣다/묻다/걷다 遇元音时 ㄷ→ㄹ（듣+어요→들어요）。但 받다/믿다 是规则的。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">ㅡ 脱落：쓰다/바쁘다/예쁘다 词干末 ㅡ 遇 아/어 时脱落（쓰+어요→써요）。</div></div>
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
          options: ['발아요', '받아요', '받워요'],
          answer: 1,
          explanation: '받다 是 ㄷ 규칙，直接套用：받아요',
        },
        {
          pre: '머리가',
          post: '.（아프다）',
          options: ['아프어요', '아파요', '아프요'],
          answer: 1,
          explanation: '아프다 ㅡ 脱落，前元音 ㅏ → 아파요',
        },
        {
          pre: '이 옷이',
          post: '.（예쁘다）',
          options: ['예쁘아요', '예쁘어요', '예뻐요'],
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
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">와/과 vs 하고</div><div style="font-size:14px;color:#89756e;margin-top:2px">都表示"和"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구와 가요（书面）</span><span style="font-size:14px;color:#5a4640">와/과：书面/正式</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">친구하고 가요（口语）</span><span style="font-size:14px;color:#5a4640">하고：口语，不看收音</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">부터 vs 에서</div><div style="font-size:14px;color:#89756e;margin-top:2px">都表示"从……"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">두 시부터（从两点）</span><span style="font-size:14px;color:#5a4640">부터：时间起点</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에서（从首尔）</span><span style="font-size:14px;color:#5a4640">에서：空间起点</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">不规则变化速记</div><div style="font-size:15px;color:#5a4640">ㅂ 不规则：덥다→더워요 / 춥다→추워요（ㅂ遇元音→워）<br>ㄷ 不规则：듣다→들어요（ㄷ遇元音→ㄹ）<br>ㅡ 脱落：아프다→아파요 / 예쁘다→예뻐요（ㅡ脱落看前一个元音）</div></div>
<div class="reminder-box">도/만/도 不替换，是叠加助词：저도（我也）/ 오늘만（只有今天）。은/는/이/가/을/를 遇到 도/만 时直接替换掉。</div>`,
    overviewHtml: `<div class="overview">
  <span class="badge">第2部分 · 综合练习</span>
  <div class="ov-title">综合练习②</div>
  <div class="ov-sub">第二章 10 课核心知识点总览</div>
  <div class="ov-sec">
    <h3>① 助词系统</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      와/과（和）：받침 있는→과，받침 없는→와；하고（口语）<br>
      에 가다（去某地）；이/가 있다/없다（有/在）<br>
      의（的）；도（也）；만（只）
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 请求 & 否定</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      -ㅂ시다/읍시다（一起吧）；-(으)세요（请…）<br>
      안 + 동사；동사 어간 + 지 않아요；하다→명사 안 해요
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ 数词 & 时间</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      固有数词（시/개/명/잔/권）：한 잔, 두 명<br>
      汉字数词（원/월/분）：오천 원, 삼십 분<br>
      A부터 B까지（时间）；에서…까지（공간）
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 不规则变化</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      ㅂ 불규칙：덥다→더워요, 춥다→추워요, 어렵다→어려워요<br>
      ㄷ 불규칙：듣다→들어요, 걷다→걸어요<br>
      ㅡ 탈락：아프다→아파요, 예쁘다→예뻐요, 바쁘다→바빠요
    </div>
  </div>
  <div class="ov-sec">
    <h3>⑤ 连接 & 指示</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
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
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">本课复习</div><div style="font-size:14px;color:#89756e;margin-top:2px">一课一句核心</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 있다</span><span style="font-size:14px;color:#5a4640">正在做</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">-았었/었었</span><span style="font-size:14px;color:#5a4640">曾经……过</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">核心知识点</div><div style="font-size:14px;color:#89756e;margin-top:2px">全章重点</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 싶다 / 그러면</span><span style="font-size:14px;color:#5a4640">想做 / 那样的话</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">ㄹ不规则 / -을/ㄹ래요</span><span style="font-size:14px;color:#5a4640">变形 / 意愿选择</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">综合练习建议</div><div style="font-size:15px;color:#5a4640">遇到不确定的题，先回想"这是哪节课的知识点"，再作答。第三章的核心是"时间"和"目的"——什么时候做、为什么做、做了什么之后发生什么。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">如果大部分题都答对了，说明第三章掌握得不错，可以进入第四章。</div></div>
<div class="reminder-box">综合练习不计成绩，目的是帮你发现哪里还不熟练。答错了就回去复习对应的课次。</div>`,
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 综合练习</span>
  <div class="ov-title">综合练习③</div>
  <div class="ov-sub">第三章 10 课核心知识点总览</div>
  <div class="ov-sec">
    <h3>① 进行 & 经历</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">있어요</b>（正在做）/ -고 <b style="color:#ff7fa8">있었어요</b>（过去正在做）<br>
      穿戴类：입고/쓰고/들고 <b style="color:#ff7fa8">있어요</b>（穿着/戴着/拿着）<br>
      -<b style="color:#2db89b">았었/었었어요</b>（以前曾经……）；하다→했었어요；名词→이었었어요
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 愿望 & 意愿</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">싶어요</b>（想做）；그러면/그럼（那么，条件顺接）<br>
      -을/ㄹ<b style="color:#2db89b">래요</b>（我要/要不要）；<b style="color:#6b7ff0">알겠어요</b>（明白了）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ ㄹ 不规则</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      接元音 → ㄹ <b style="color:#2db89b">保留</b>：살아요, 알아요, 만들어요<br>
      接 ㄴ/ㅂ/ㅅ → ㄹ <b style="color:#ff7fa8">脱落</b>：사세요, 삽니다, 아세요
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 疑问词 & 连接词</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">무슨</b>（名称/属性）/ <b style="color:#2db89b">어느</b>（选项）/ <b style="color:#6b7ff0">어떤</b>（特点）<br>
      <b style="color:#ff7fa8">그렇지만</b>（但是）/ <b style="color:#2db89b">그런데</b>（不过/话题转换）<br>
      <b style="color:#e8a87c">그래서</b>（所以）/ <b style="color:#6b7ff0">그러니까</b>（所以/因此，带劝告）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⑤ 目的 & 时间顺序</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      -(으)러 가요（去做某事）；-을/ㄹ까요?（要不要……）<br>
      -은/ㄴ <b style="color:#ff7fa8">후에</b>（之后，看 받침）；-기 <b style="color:#2db89b">전에</b>（之前，不看 받침）
    </div>
  </div>
</div>`,
  },


  {
    id: 'card-p3-l01',
    partNumber: 3,
    lessonNumber: 1,
    title: '-고 있다, -고 있었다',
    whatItDoes: '说正在做、之前一直在做',
    whatItDoesBody: '-고 있어요 把动作拉成正在进行的状态；\n-고 있었어요 表达过去某个时候正在做。\n和中文"正在……"类似，但韩语还能用于"穿着/戴着/拿着"这类持续状态。',
    structureNote: '这节课只有一个核心结构：\n动词词干 + -고 있어요。\n现在进行用 있어요，过去进行用 있었어요。\n注意这个结构只接动词，不接形容词。',
    rulesNote: '-고 接续时不触发不规则变化（듣다→듣고 있어요，不变形）。\n特殊用法：\n입다/쓰다/들다 等穿戴动词 + -고 있어요 表示"穿着/戴着/拿着"的持续状态，不是进行中的动作。',
    scenarioNote: '-고 있어요 是 SNS 和聊天里最自然的表达"在听歌""在看剧""在等人"。\n穿戴用法（입고 있어요/쓰고 있어요）在描述人物外貌时也非常常用。',
    structures: [
      {
        ko: '지금 한국어를 공부하고 있어요',
        zh: '现在正在学习韩语。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '어제 드라마를 보고 있었어요',
        zh: '昨天正在看电视剧。',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 있어요 — 正在做', examples: '공부하다→공부하고 있어요, 먹다→먹고 있어요, 보다→보고 있어요' },
      { type: 'rule', text: '动词词干 + -고 있었어요 — 过去某时正在做', examples: '어제 드라마를 보고 있었어요, 친구를 기다리고 있었어요' },
      { type: 'note', text: '接 -고 时 ㄷ 不规则不发生', examples: '듣다→듣고 있어요（✓）/ 들고 있어요（✗）' },
      { type: 'note', text: '-고 있다 只接动作动词，不接形容词', examples: '예쁘다→예뻐요（✓）/ 예쁘고 있어요（✗）' },
      { type: 'usage', text: '穿戴动词 + -고 있어요 — 穿戴持续状态', examples: '입다→입고 있어요（穿着）, 쓰다→쓰고 있어요（戴着）, 들다→들고 있어요（拿着）, 신다→신고 있어요（穿着鞋）' },
      { type: 'compare', text: '-아요/어요 vs -고 있어요', examples: '먹어요（平时吃/习惯）/ 먹고 있어요（现在正在吃，动作未结束）' },
      { type: 'example', text: '지금 한국어를 공부하고 있어요 / 친구를 기다리고 있었어요 / 모자를 쓰고 있어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
        zh: '现在正在听歌。',
        swapWords: ['공부하고 있어요', '먹고 있어요', '보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제 밤에', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
        zh: '昨晚正在看电视剧。',
        swapWords: ['공부하고 있었어요', '기다리고 있었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '안경을', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '戴着眼镜。',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '모자를', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '现在戴着帽子。',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习打卡', ko: '지금 한국어를 공부하고 있어요.', zh: '现在正在学习韩语。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '이 노래를 듣고 있어요.', zh: '正在听这首歌。' },
      { icon: '📺', context: '影音跟读', ko: '드라마를 보고 있었어요.', zh: '刚才正在看电视剧。' },
      { icon: '👓', context: '穿戴持续', ko: '그는 안경을 쓰고 있어요. 어머니는 가방을 들고 있어요.', zh: '他戴着眼镜。妈妈拎着包。' },
      { icon: '🏥', context: '医院等待', ko: '지금 병원에서 기다리고 있어요. 의사 선생님이 곧 오실 거예요.', zh: '现在正在医院等待，医生马上会来。' },
      { icon: '🛒', context: '便利店', ko: '편의점에서 계산하고 있어요. 잠깐만 기다려 주세요.', zh: '正在便利店结账，请稍等一下。' },
    ],
    mistakes: [
      { wrong: '노래를 들고 있어요（想说正在听歌）', correct: '노래를 듣고 있어요', note: '听歌用 듣다，接 -고 时 ㄷ 不规则不发生 → 듣고 있어요。注意：들다（拿/举）接 -고 있어요 是正确的，如 가방을 들고 있어요（拎着包）。' },
      { wrong: '예쁘고 있어요（想说正在漂亮）', correct: '예뻐요', note: '-고 있다 只接动作动词，形容词直接用原形。' },
      { wrong: '먹고 있었어요 和 먹었어요 混用', correct: '먹고 있었어요（当时正在吃）/ 먹었어요（吃了）', note: '-고 있었어요 强调过去某个时间点正在进行，-었어요 只是过去完成。' },
      { wrong: '입고 있어요를 "正在穿"로만 이해', correct: '입고 있어요（穿着/正在穿）', note: '穿戴类动词（입다、쓰다、들다、신다）+ -고 있어요 既可表示动作进行，也可表示持续状态（穿着/戴着）。具体看语境。' },
    ],
        compareHtml: `<div class="card-title">"正在做"vs"之前一直在做"</div>
<div class="card-body">-고 있다 把动作拉成正在进行的状态；-고 있었다 表达过去某个时候正在做。和中文"正在……"类似，但韩语还能用于"穿着/戴着/拿着"这类持续状态。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">现在进行（-고 있다）</div><div style="font-size:14px;color:#89756e;margin-top:2px">动作正在进行</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지금 공부하고 있어요.</span><span style="font-size:14px;color:#5a4640">正在学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래를 듣고 있어요.</span><span style="font-size:14px;color:#5a4640">正在听歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">过去进行（-고 있었다）</div><div style="font-size:14px;color:#89756e;margin-top:2px">过去某时正在做</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아까 공부하고 있었어요.</span><span style="font-size:14px;color:#5a4640">刚才正在学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">전화하고 있었어요.</span><span style="font-size:14px;color:#5a4640">刚才正在打电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">持续状态用法</div><div style="font-size:15px;color:#5a4640">韩语的 -고 있다 不仅表示"正在做动作"，还表示"穿着/戴着/拿着"等持续状态。中文里"穿着衣服"和"正在穿衣服"是两回事，韩语共用同一结构。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">例如：입고 있어요 = 正在穿 / 穿着。需要根据上下文判断是"进行中"还是"状态持续"。</div></div>
<div class="reminder-box">"穿着衣服"是 입고 있어요，"正在穿衣服"也是 입고 있어요！中文用不同词表达，韩语靠上下文区分。说清楚时间就能避免误会。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 있어요 / -고 있었어요</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">把动作变成"正在……"的持续状态，现在进行或过去进行。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">지금 한국어를 공부하고 있어요.</div>
    <div class="zh">现在正在学习韩语。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">어제 밤에 드라마를 보고 있었어요.</div>
    <div class="zh">昨晚正在看电视剧。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">그는 안경을 쓰고 있어요.</div>
    <div class="zh">他戴着眼镜。（穿戴持续状态）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:14px">动词词干</span>
      <span style="font-weight:800;color:#ff7fa8;font-size:1.1rem">+ -고 있어요</span>
      <span style="font-size:13px;color:#89756e">现在正在做</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:14px">动词词干</span>
      <span style="font-weight:800;color:#2db89b;font-size:1.1rem">+ -고 있었어요</span>
      <span style="font-size:13px;color:#89756e">过去某时正在做</span>
    </div>
  </div>
</div>
<div class="reminder-box">-고 接续时不触发不规则变化：듣다 → 듣고 있어요（✓），不变形。-고 있다 只接动作动词，形容词不能用。</div>`,
    
    compareLabel: '먹어요 vs 먹고 있어요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第1课</span>
  <div class="ov-title">-고 있어요 / -고 있었어요</div>
  <div class="ov-sub">把动作拉成进行状态，现在进行或过去进行</div>
  <div class="ov-sec">
    <h3>现在进行：-고 있어요</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      공부하<b style="color:#ff7fa8">고 있어요</b>（正在学习）&nbsp; 노래를 듣<b style="color:#ff7fa8">고 있어요</b>（正在听歌）<br>
      드라마를 보<b style="color:#ff7fa8">고 있어요</b>（正在看电视剧）
    </div>
  </div>
  <div class="ov-sec">
    <h3>过去进行：-고 있었어요</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      드라마를 보<b style="color:#2db89b">고 있었어요</b>（当时正在看）<br>
      친구를 기다리<b style="color:#2db89b">고 있었어요</b>（当时正在等朋友）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">들고 있어요</span> → <span style="color:#ff7fa8">듣고 있어요</span>（ㄷ 不规则接-고 不变）<br>
      <span style="color:#e05555;text-decoration:line-through">예쁘고 있어요</span> → <span style="color:#ff7fa8">예뻐요</span>（形容词不用-고 있다）
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l02',
    partNumber: 3,
    lessonNumber: 5,
    title: '-았었/었었/였었-',
    whatItDoes: '说以前曾经……现在不一样了',
    whatItDoesBody: '-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉，比普通过去时多一层回忆感。\n中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。',
    structureNote: '这节课在P1过去时基础上加一层：\n-았어요 是普通过去，-았었어요 是"回忆性过去"强调现在和过去已经不同了。\n结构是在过去时词尾上再加一个 -었어요。',
    rulesNote: '变形逻辑和普通过去时完全一样（看词干末尾元音选 았/었/였），只是再叠一层 었어요。\n注意：\n昨天发生的普通事件用 -았어요，不要用 -았었어요（어제 밥을 먹었어요 ✓，먹었었어요 ✗）。',
    scenarioNote: '"以前喜欢过这个歌手""小时候住过首尔""以前经常听这首歌"这类带着回忆和变化感的表达，正是 -았었어요 的主战场。\n追星、聊经历、回忆往事全都用得到。',
    structures: [
      {
        ko: '예전에 서울에 살았었어요',
        zh: '以前在首尔住过。',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
      },
      {
        ko: '예전에 이 가수를 좋아했었어요',
        zh: '以前喜欢过这位歌手。',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '이 가수를', role: 'object' },
          { text: '좋아했었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '词干末元音为 ㅏ/ㅗ → -았었어요', examples: '살다→살았었어요, 좋다→좋았었어요, 오다→왔었어요' },
      { type: 'rule', text: '词干末元音非 ㅏ/ㅗ → -었었어요', examples: '먹다→먹었었어요, 있다→있었었어요, 배우다→배웠었어요' },
      { type: 'rule', text: '하다 动词 → 했었어요', examples: '공부하다→공부했었어요, 좋아하다→좋아했었어요, 일하다→일했었어요' },
      { type: 'rule', text: '名词 + 이었었어요/였었어요', examples: '학생이었었어요（以前是学生）, 친구였었어요（以前是朋友）' },
      { type: 'compare', text: '-았어요 vs -았었어요', examples: '어제 먹었어요（昨天吃了，普通过去）/ 예전에 자주 먹었었어요（以前经常吃，现在未必）' },
      { type: 'note', text: '昨天发生的普通事件用 -았/었어요', examples: '어제 밥을 먹었어요 ✓ / 어제 밥을 먹었었어요 ✗' },
      { type: 'usage', text: '常与时间表达搭配使用', examples: '예전에 / 어렸을 때 / 몇 년 전에 → 살았었어요, 공부했었어요, 다녔었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부했었어요', role: 'verb' },
        ],
        zh: '以前学过韩语。',
        swapWords: ['배웠었어요', '좋아했었어요', '들었었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '以前在首尔住过。',
        swapWords: ['있었었어요', '다녔었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '이 노래를', role: 'object' },
          { text: '자주 들었었어요', role: 'verb' },
        ],
        zh: '以前经常听这首歌。',
        swapWords: ['봤었어요', '좋아했었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어렸을 때', role: 'time' },
          { text: '여기에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '小时候住在这里。',
        swapWords: ['다녔었어요', '있었었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习经历', ko: '예전에 한국어를 공부했었어요.', zh: '以前学过韩语。' },
      { icon: '🏙️', context: '居住经历', ko: '예전에 서울에 살았었어요.', zh: '以前在首尔住过。' },
      { icon: '🎤', context: '追星回忆', ko: '예전에 이 가수를 정말 좋아했었어요.', zh: '以前非常喜欢过这位歌手。' },
      { icon: '🎓', context: '身份变化', ko: '저도 오년 전에 한국어 학생이었었어요.', zh: '我五年前也曾是韩语学生。' },
      { icon: '🏫', context: '学校往事', ko: '어렸을 때 이 동네에 살았었어요. 지금은 다른 곳에 살아요.', zh: '小时候住在这个小区，现在住在别的地方了。' },
      { icon: '🍜', context: '饮食变化', ko: '예전에는 매운 음식을 잘 먹었었어요. 그런데 지금은 못 먹어요.', zh: '以前很能吃辣的食物，但现在不行了。' },
    ],
    mistakes: [
      { wrong: '어제 밥을 먹었었어요（昨天吃饭，普通过去）', correct: '어제 밥을 먹었어요', note: '昨天发生的普通事件用 -었어요，不需要 -었었어요 的回忆感。' },
      { wrong: '좋아했었어요 误解为"现在还喜欢"', correct: '좋아했었어요（以前喜欢过，现在未必）', note: '-았었어요 常暗示现在状态可能不同了，注意语气。' },
      { wrong: '어제 공부했었어요（昨天学习）', correct: '어제 공부했어요', note: '-았었어요 用于有时间距离的回忆，昨天的事直接用 -았어요。' },
      { wrong: '친구이었었어요', correct: '친구였었어요', note: '친구 以 모음 结尾，用 였었어요，不是 이었었어요。' },
    ],
        compareHtml: `<div class="card-title">"曾经……过"vs 普通过去时</div>
<div class="card-body">-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉。中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">普通过去时</div><div style="font-size:14px;color:#89756e;margin-top:2px">单纯叙述过去</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠어요.</span><span style="font-size:14px;color:#5a4640">学了韩语。（陈述事实）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔어요.</span><span style="font-size:14px;color:#5a4640">去了首尔。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">过去回想（-았었/었었）</div><div style="font-size:14px;color:#89756e;margin-top:2px">回忆过去，暗示变化</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠었어요.</span><span style="font-size:14px;color:#5a4640">学过韩语（但现在可能忘了）。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔었어요.</span><span style="font-size:14px;color:#5a4640">去过首尔（但现在不在了）。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">回忆感从何而来</div><div style="font-size:15px;color:#5a4640">中文说"学过韩语"和"学了韩语"差别不大，得靠上下文判断是否现在还在学。韩语直接用词尾 -았었 标明"曾经学过，现在可能不学了"——一个词尾代替了一整句背景说明。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">使用场景：聊过去的学校、前公司、以前住过的地方。</div></div>
<div class="reminder-box">回忆过去和普通过去看起来只差一个"었"，但语感完全不同。想问别人"以前是不是学过韩语？"用 배웠어요? 还是 배웠었어요?——后者更自然，因为你暗示了"现在不一定还在学"。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-았었/었었/였었어요</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">以前曾经……，现在可能已经不同了。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">예전에 서울에 살았었어요.</div>
    <div class="zh">以前在首尔住过。（现在不住了）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">예전에 이 가수를 좋아했었어요.</div>
    <div class="zh">以前喜欢过这位歌手。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">어렸을 때 여기에 살았었어요.</div>
    <div class="zh">小时候住在这里。</div>
  </div>
</div>
<div class="block">
  <div class="h2">三种变形规则</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">词干末 ㅏ/ㅗ</span>
      <span style="font-weight:800;color:#ff7fa8">→ -았었어요</span>
      <span style="font-size:12px;color:#89756e">살다→살았었어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">其他元音</span>
      <span style="font-weight:800;color:#2db89b">→ -었었어요</span>
      <span style="font-size:12px;color:#89756e">먹다→먹었었어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">하다 动词</span>
      <span style="font-weight:800;color:#6b7ff0">→ 했었어요</span>
      <span style="font-size:12px;color:#89756e">공부하다→공부했었어요</span>
    </div>
  </div>
</div>
<div class="reminder-box">昨天的普通事件用 -었어요 就够了，-았었어요 用于有时间距离的回忆或强调"现在已不同"。</div>`,
    
    compareLabel: '-었어요 vs -었었어요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第2课</span>
  <div class="ov-title">-았었/었었/였었어요</div>
  <div class="ov-sub">以前曾经……，带有"现在可能已不同"的回忆感</div>
  <div class="ov-sec">
    <h3>变化规则</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      ㅏ/ㅗ → <b style="color:#ff7fa8">았었어요</b>：살았었어요（住过）, 좋았었어요（曾经好）<br>
      其他 → <b style="color:#2db89b">었었어요</b>：먹었었어요（吃过）, 있었었어요（有过）<br>
      하다 → <b style="color:#6b7ff0">했었어요</b>：공부했었어요（学习过）, 좋아했었어요（喜欢过）<br>
      名词 → <b style="color:#e8a87c">이었었어요/였었어요</b>：학생이었었어요（以前是学生）
    </div>
  </div>
  <div class="ov-sec">
    <h3>常用表达</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      예전에 서울에 <b style="color:#ff7fa8">살았었어요</b>（以前在首尔住过）<br>
      이 가수를 <b style="color:#6b7ff0">좋아했었어요</b>（以前喜欢过这位歌手）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      昨天普通事件 → 用 <span style="color:#ff7fa8">-었어요</span>，不用 -었었어요<br>
      <span style="color:#e05555;text-decoration:line-through">어제 먹었었어요</span> → <span style="color:#ff7fa8">어제 먹었어요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l03',
    partNumber: 3,
    lessonNumber: 3,
    title: '-고 싶다, 그러면',
    whatItDoes: '说想做什么，以及"那样的话"',
    whatItDoesBody: '-고 싶어요 表达说话人自己的愿望；\n그러면 连接条件和结果，表示"那么/那样的话"。\n-고 싶어요 只能用于第一人称，说别人想做要换成 -고 싶어하다。\n和中文不同：\n中文"想做"不区分人称，韩语第一人称用 싶어요，第三人称要换成 싶어하다。',
    structureNote: '两块内容：①-고 싶어요（想做）动词词干直接加，非常规律；\n②그러면（那么）放句首连接两句话，口语常缩成 그럼。',
    rulesNote: '-고 싶어요 只接动词词干，不能直接接名词（커피고 싶어요 ✗）。\n说第三人称的愿望要用 -고 싶어하다（친구는 가고 싶어해요）。\n그러면 表示顺接条件，和转折用的 그렇지만 不同。',
    scenarioNote: '-고 싶어요 是表达愿望最自然的方式说学习目标、旅行计划、购物心愿都用它。\n加上 그러면/그럼，就能做出"如果……那就……"的建议句，对话立刻更流畅。',
    structures: [
      {
        ko: '한국에 가고 싶어요',
        zh: '想去韩国。',
        tokens: [
          { text: '한국에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 있어요? 그러면 같이 가요',
        zh: '有时间吗？那一起去吧。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '있어요?', role: 'verb' },
          { text: '그러면', role: 'plain' },
          { text: '같이 가요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 싶어요', examples: '가다→가고 싶어요, 먹다→먹고 싶어요, 배우다→배우고 싶어요, 마시다→마시고 싶어요' },
      { type: 'note', text: '-고 싶어요 只接动词词干，不能直接接名词', examples: '커피고 싶어요 ✗ → 커피를 마시고 싶어요 ✓' },
      { type: 'note', text: '-고 싶어요 表达说话人本人的愿望；第三人称用 -고 싶어하다', examples: '저는 가고 싶어요（我想去）/ 친구는 가고 싶어해요（朋友想去）' },
      { type: 'rule', text: '그러면 — 放句首连接条件与结果', examples: '시간이 있어요? 그러면 같이 가요.' },
      { type: 'compare', text: '그러면 ≠ 그렇지만', examples: '그러면（那么，条件顺接）/ 그렇지만（但是，明确转折）' },
      { type: 'usage', text: '口语中 그러면 常缩短为 그럼', examples: '그럼 같이 가요. / 그럼 내일 봐요.' },
      { type: 'example', text: '한국어를 잘하고 싶어요. / 뭐 먹고 싶어요? / 배가 고파요. 그러면 같이 밥을 먹어요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우고 싶어요', role: 'verb' },
        ],
        zh: '想学韩语。',
        swapWords: ['가고 싶어요', '먹고 싶어요', '보고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
        zh: '想去演唱会。',
        swapWords: ['한국에 가고 싶어요', '이 노래를 배우고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시간이 있어요.', role: 'plain' },
          { text: '그러면', role: 'plain' },
          { text: '같이 공부해요', role: 'verb' },
        ],
        zh: '有时间。那一起学习吧。',
        swapWords: ['같이 가요', '같이 먹어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '잘하고 싶어요.', role: 'verb' },
          { text: '그러면', role: 'plain' },
          { text: '매일 연습하세요', role: 'verb' },
        ],
        zh: '想把韩语学好。那就每天练习吧。',
        swapWords: ['그럼 같이 해요', '그럼 시작해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎯', context: '学习目标', ko: '한국어를 잘하고 싶어요.', zh: '想把韩语学好。' },
      { icon: '✈️', context: '旅行计划', ko: '한국에 가고 싶어요.', zh: '想去韩国。' },
      { icon: '🎤', context: 'KPOP 追星', ko: '이 가수의 콘서트에 가고 싶어요.', zh: '想去这位歌手的演唱会。' },
      { icon: '🍚', context: '日常对话', ko: '가: 배가 너무 고파요. 나: 그러면 같이 밥을 먹읍시다.', zh: '甲：肚子太饿了。乙：那一起去吃饭吧。' },
      { icon: '🛍️', context: '购物愿望', ko: '이 가방을 사고 싶어요. 그런데 좀 비싸요.', zh: '想买这个包，但有点贵。' },
      { icon: '🍣', context: '餐厅', ko: '오늘은 일식을 먹고 싶어요. 그러면 역 앞에 있는 식당에 가요.', zh: '今天想吃日料，那去车站前面那家餐厅吧。' },
    ],
    mistakes: [
      { wrong: '커피고 싶어요', correct: '커피를 마시고 싶어요', note: '-고 싶어요 接动词，不直接接名词，需要补出动词。' },
      { wrong: '그러면을 "但是"용', correct: '그러면 = 那么/那样的话（顺接条件）', note: '转折用 그렇지만，그러면 是条件推进，意思完全不同。' },
      { wrong: '한국어고 싶어요', correct: '한국어를 배우고 싶어요', note: '-고 싶어요 接动词词干，不能直接接名词。' },
      { wrong: '친구는 가고 싶어요（第三人称）', correct: '친구는 가고 싶어해요', note: '说话人本人用 -고 싶어요，第三人称换成 -고 싶어하다。' },
    ],
        compareHtml: `<div class="card-title">"想做"vs"那样的话"</div>
<div class="card-body">-고 싶어요 表达说话人自己的愿望；그러면 连接条件和结果，表示"那么/那样的话"。和中文不同：中文"想做"不区分人称，韩语第一人称用 싶어요，第三人称要换成 싶어하다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-고 싶어요（我想做）</div><div style="font-size:14px;color:#89756e;margin-top:2px">第一人称"我想……"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 가고 싶어요.</span><span style="font-size:14px;color:#5a4640">我想去韩国。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">이 노래를 듣고 싶어요.</span><span style="font-size:14px;color:#5a4640">我想听这首歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그러면（那样的话）</div><div style="font-size:14px;color:#89756e;margin-top:2px">连接条件→结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 없어요. 그러면 다음에 만나요.</span><span style="font-size:14px;color:#5a4640">没时间。那下次见吧。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">배고파요? 그러면 먹어요.</span><span style="font-size:14px;color:#5a4640">饿了吗？那就吃吧。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">人称区分要牢记</div><div style="font-size:15px;color:#5a4640">中文"我想去"和"他/她想去"用的动词一样，韩语不一样。说别人想做什么，必须用 싶어하다（第三人称专用形式）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">저는 가고 싶어요 ✓ / 친구가 가고 싶어해요 ✓ / 친구가 가고 싶어요 ✗</div></div>
<div class="reminder-box">-고 싶어요 是"我想"（自己说），说别人用 -고 싶어하다。中文"想去"一个词搞定所有人，韩语必须区分——这是最容易犯的错误之一。</div>`,
    linkedGrammarIds: ['gp-11'],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 싶어요 · 그러면</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">表达心里想做的事，再用"那么"连接下一句。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">한국에 가고 싶어요.</div>
    <div class="zh">想去韩国。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">이 노래를 배우고 싶어요.</div>
    <div class="zh">想学这首歌。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">시간이 있어요? 그러면 같이 가요.</div>
    <div class="zh">有时间吗？那一起去吧。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:14px">动词词干</span>
      <span style="font-weight:800;color:#ff7fa8;font-size:1.1rem">+ -고 싶어요</span>
      <span style="font-size:13px;color:#89756e">想做……</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:1.1rem">그러면 / 그럼</span>
      <span style="font-size:13px;color:#89756e">那么/那样的话（放句首）</span>
    </div>
  </div>
</div>
<div class="reminder-box">-고 싶어요 只接动词词干，不直接接名词。说第三人称愿望换成 -고 싶어하다：친구는 가고 싶어해요。</div>`,
    
    compareLabel: '-고 싶어요 vs -을/ㄹ래요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第3课</span>
  <div class="ov-title">-고 싶어요 · 그러면</div>
  <div class="ov-sub">表达愿望，用条件连接下一句</div>
  <div class="ov-sec">
    <h3>-고 싶어요 变化</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      가다 → 가<b style="color:#ff7fa8">고 싶어요</b>（想去）<br>
      먹다 → 먹<b style="color:#ff7fa8">고 싶어요</b>（想吃）<br>
      배우다 → 배우<b style="color:#ff7fa8">고 싶어요</b>（想学）<br>
      공부하다 → 공부하<b style="color:#ff7fa8">고 싶어요</b>（想学习）
    </div>
  </div>
  <div class="ov-sec">
    <h3>그러면 用法</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      시간이 있어요? <b style="color:#2db89b">그러면</b> 같이 가요.（有时间？那一起去）<br>
      한국어를 배우고 싶어요? <b style="color:#2db89b">그러면</b> 매일 연습하세요.
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">커피고 싶어요</span> → <span style="color:#ff7fa8">커피를 마시고 싶어요</span><br>
      그러면 ≠ 但是 → 但是用 <span style="color:#ff7fa8">그렇지만</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l04',
    partNumber: 3,
    lessonNumber: 10,
    title: '"ㄹ"不规则音变',
    whatItDoes: '认识ㄹ收音词的特殊变形规律',
    whatItDoesBody: 'ㄹ 不规则不是永远变化，而是遇到 ㄴ/ㅂ/ㅅ 开头的语尾时 ㄹ 脱落。\n接 -아요/어요、-고 时保留。\n常见词：\n살다, 알다, 만들다, 놀다。\n中文没有类似规则，记住"遇 ㄴ/ㅂ/ㅅ 就脱落"这一条就够了。',
    structureNote: '这节课不是新句型，而是变形规则：\nㄹ 词干在接哪些语尾时会脱落 ㄹ，在哪些语尾前保留。\n把常用词（살다/알다/만들다）的几种形式对比记，比背规则快。',
    rulesNote: 'ㄹ 脱落触发条件：\n后接语尾首字母是 ㄴ/ㅂ/ㅅ（如 -(으)세요、正式体 -ㅂ니다/습니다、冠词形 -는）。\n接元音语尾（-아요/어요）或 -고 时 ㄹ 保留不变。\n口诀：\n살아요（保）/ 사세요（落）/ 삽니다（落）/ 사는（落）。',
    scenarioNote: '살다/알다/만들다 是极高频词问住哪、问认不认识、说自己做的。\n掌握 ㄹ 脱落，遇到这类词就不会写错形式，听力也更容易识别。',
    structures: [
      {
        ko: '어디에 살아요?',
        zh: '住在哪里？',
        tokens: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
      },
      {
        ko: '이 단어를 아세요?',
        zh: '您知道这个单词吗？',
        tokens: [
          { text: '이 단어를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㄹ + -아요/어요 → ㄹ 保留', examples: '살다→살아요, 알다→알아요, 만들다→만들어요, 놀다→놀아요' },
      { type: 'rule', text: 'ㄹ + -고 → ㄹ 保留', examples: '살고 있어요, 알고 있어요, 만들고 싶어요' },
      { type: 'rule', text: 'ㄹ + -(으)세요 → ㄹ 脱落', examples: '살다→사세요, 알다→아세요, 만들다→만드세요, 놀다→노세요' },
      { type: 'rule', text: 'ㄹ + -ㅂ니다 → ㄹ 脱落', examples: '살다→삽니다, 알다→압니다, 만들다→만듭니다, 팔다→팝니다' },
      { type: 'note', text: '口诀：ㄹ 在 ㄴ/ㅂ/ㅅ 开头语尾前脱落，在元音开头语尾前保留', examples: '-(으)세요/ㅂ니다/는 前脱落；-아요/어요/-고 前保留' },
      { type: 'rule', text: 'ㄹ + -는 → ㄹ 脱落（冠词形）', examples: '살다→사는 사람（住的人）, 알다→아는 단어（认识的单词）, 만들다→만드는 방법' },
      { type: 'example', text: '살아요 / 사세요 / 삽니다 / 사는 — 살다 全形变一览; 알아요 / 아세요 / 압니다 — 알다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '住在哪里？',
        swapWords: ['알아요', '만들어요', '놀아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
        zh: '您知道这首歌吗？',
        swapWords: ['사세요', '만드세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '문장을', role: 'object' },
          { text: '만들어요', role: 'verb' },
        ],
        zh: '造句。',
        swapWords: ['만드세요', '만듭니다'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '最近住在哪里？',
        swapWords: ['알아요', '놀아요', '팔아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏠', context: '问住址', ko: '어디에 살아요?', zh: '住在哪里？' },
      { icon: '🎵', context: 'KPOP 互动', ko: '이 노래 아세요?', zh: '您知道这首歌吗？' },
      { icon: '✏️', context: '学习造句', ko: '문장을 만들어 보세요.', zh: '请试着造句。' },
      { icon: '😊', context: '日常对话', ko: '요즘 잘 지내고 있어요? 저는 잘 살고 있어요.', zh: '最近过得好吗？我过得很好。' },
      { icon: '🏡', context: '问住所', ko: '지금 어디에 살아요? 저는 서울에 살아요. 회사에서 가까워요.', zh: '现在住在哪里？我住在首尔，离公司很近。' },
      { icon: '🍳', context: '做饭', ko: '직접 만들어요? 네, 저는 요리하는 걸 좋아해요.', zh: '自己做吗？是的，我喜欢做饭。' },
    ],
    mistakes: [
      { wrong: '알세요?', correct: '아세요?', note: '알다 + -세요 → ㄹ 脱落 → 아세요。不要保留 ㄹ。' },
      { wrong: '사아요（살다→살아요의 误写）', correct: '살아요', note: '接 -아요 时 ㄹ 保留，살다 → 살아요，不是 사아요。' },
      { wrong: '만들세요', correct: '만드세요', note: '만들다 + -세요 → ㄹ 脱落 → 만드세요。' },
      { wrong: '놀세요（권유）', correct: '노세요', note: '놀다 + -세요 → ㄹ 脱落 → 노세요。-세요 前 ㄹ 总是脱落。' },
    ],
        compareHtml: `<div class="card-title">ㄹ收音词的特殊变形规律</div>
<div class="card-body">ㄹ 不规则不是永远变化，而是遇到 ㄴ/ㅂ/ㅅ 开头的语尾时 ㄹ 脱落。接 -아요/어요、-고 时保留。常见词：살다, 알다, 만들다, 놀다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">保留 ㄹ 的情况</div><div style="font-size:14px;color:#89756e;margin-top:2px">接元音/고 时不变</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">살다 → 살아요（活着）</span><span style="font-size:14px;color:#5a4640">接 -아요，ㄹ 保留</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알다 → 알고 있어요（知道）</span><span style="font-size:14px;color:#5a4640">接 -고，ㄹ 保留</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">ㄹ 脱落的情况</div><div style="font-size:14px;color:#89756e;margin-top:2px">接 ㄴ/ㅂ/ㅅ 时脱落</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">살다 → 삽니다（生活）</span><span style="font-size:14px;color:#5a4640">接 ㅂ→脱落</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알다 → 아는 사람（认识的人）</span><span style="font-size:14px;color:#5a4640">接 ㄴ→脱落</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">中文没有的规则</div><div style="font-size:15px;color:#5a4640">中文没有类似的语音脱落现象。韩语里 ㄹ 在遇到 ㄴ/ㅂ/ㅅ 时"消失"，是因为发音器官冲突——舌边音 ㄹ 和鼻音/塞音连读不顺畅，韩语选择了简化。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">记住一句话："遇 ㄴ/ㅂ/ㅅ 就脱落"，其他情况保留。</div></div>
<div class="reminder-box">알다（知道）→ 아는（知道的）→ 알고（知道+고）→ 압니다（합니다 体）。"遇 ㄴ/ㅂ/ㅅ 脱落"——就这一条规则。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">"ㄹ" 不规则音变</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">ㄹ 词干遇到特定语尾会脱落 ㄹ，规律很好记。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">어디에 살아요?</div>
    <div class="zh">住在哪里？（ㄹ 保留）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">이 노래 아세요?</div>
    <div class="zh">您知道这首歌吗？（ㄹ 脱落）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">문장을 만들어 보세요.</div>
    <div class="zh">请试着造句。（만들다 → 만들어）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心规则</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">接 -아요/어요/-고</span>
      <span style="font-weight:800;color:#2db89b">ㄹ 保留</span>
      <span style="font-size:12px;color:#89756e">살아요, 알고 있어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">接 -(으)세요/-ㅂ니다/-는</span>
      <span style="font-weight:800;color:#ff7fa8">ㄹ 脱落</span>
      <span style="font-size:12px;color:#89756e">사세요, 삽니다, 사는</span>
    </div>
  </div>
</div>
<div class="reminder-box">口诀：遇 ㄴ/ㅂ/ㅅ 开头语尾就脱落，遇元音开头语尾就保留。살다 → 살아요（保）/ 사세요（落）。</div>`,
    
    compareLabel: 'ㄹ 保留 vs ㄹ 脱落',
    quickTable: {
      title: 'ㄹ 不规则高频词变形',
      headers: ['原形', '-아요/어요', '-(으)세요', '-ㅂ니다'],
      rows: [
        ['살다 住', '살아요', '사세요', '삽니다'],
        ['알다 知道', '알아요', '아세요', '압니다'],
        ['만들다 制作', '만들어요', '만드세요', '만듭니다'],
        ['놀다 玩', '놀아요', '노세요', '놉니다'],
        ['팔다 卖', '팔아요', '파세요', '팝니다'],
        ['길다 长', '길어요', '기세요', '깁니다'],
        ['달다 甜', '달아요', '다세요', '답니다'],
        ['들다 拿/花费', '들어요', '드세요', '듭니다'],
        ['멀다 远', '멀어요', '머세요', '멉니다'],
        ['힘들다 辛苦', '힘들어요', '힘드세요', '힘듭니다'],
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第4课</span>
  <div class="ov-title">"ㄹ" 不规则音变</div>
  <div class="ov-sub">ㄹ 遇 ㄴ/ㅂ/ㅅ 脱落，遇元音保留</div>
  <div class="ov-sec">
    <h3>保留 ㄹ（接元音开头）</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      살<b style="color:#2db89b">아요</b> · 알<b style="color:#2db89b">아요</b> · 만들<b style="color:#2db89b">어요</b><br>
      살<b style="color:#2db89b">고</b> 있어요 · 알<b style="color:#2db89b">고</b> 있어요
    </div>
  </div>
  <div class="ov-sec">
    <h3>脱落 ㄹ（接 ㄴ/ㅂ/ㅅ 开头）</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      살다 → <b style="color:#ff7fa8">사세요</b> · <b style="color:#ff7fa8">삽니다</b><br>
      알다 → <b style="color:#ff7fa8">아세요</b> · <b style="color:#ff7fa8">압니다</b><br>
      만들다 → <b style="color:#ff7fa8">만드세요</b> · <b style="color:#ff7fa8">만듭니다</b>
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">알세요</span> → <span style="color:#ff7fa8">아세요</span><br>
      <span style="color:#e05555;text-decoration:line-through">만들세요</span> → <span style="color:#ff7fa8">만드세요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l05',
    partNumber: 3,
    lessonNumber: 4,
    title: '-을/ㄹ래요, -겠-',
    whatItDoes: '说"好的我知道了"和做选择',
    whatItDoesBody: '-을/ㄹ래요 表达"我要……/要不要……"，比 -고 싶어요 更直接；\n-겠- 表达意志、推测或礼貌，最常见固定表达是 알겠어요（明白了）。\n-을/ㄹ래요 类似中文口语里"我要……"，-겠- 类似"我会/我来……"。',
    structureNote: '两块内容：①-을/ㄹ래요（要做/要不要）看词干有无收音选 을래요/ㄹ래요；\n②-겠-（意志/礼貌）初学阶段先掌握 알겠어요 这一个固定表达就够。',
    rulesNote: '-을/ㄹ래요 收音规则和之前完全一样：\n有收音接 을래요，无收音接 ㄹ래요。\n-겠- 直接加在词干后，不用考虑收音。\n注意区分：\n-고 싶어요 是内心愿望（柔和），-을/ㄹ래요 是直接表态（更口语）。',
    scenarioNote: '갈래요/먹을래요/볼래요 是朋友间最自然的邀约用语"要去吗？""要吃什么？"。\n알겠어요 则是课堂、服务场合里每天都会说的回应。\n这节课学完，日常对话的流畅度会明显提升。',
    structures: [
      {
        ko: '저는 커피 마실래요',
        zh: '我要喝咖啡。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
      },
      {
        ko: '알겠어요. 다시 해 볼게요',
        zh: '明白了。我再试一次。',
        tokens: [
          { text: '알겠어요', role: 'verb' },
          { text: '다시 해 볼게요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词词干 + ㄹ래요', examples: '가다→갈래요, 보다→볼래요, 마시다→마실래요, 공부하다→공부할래요' },
      { type: 'rule', text: '有收音动词词干 + 을래요', examples: '먹다→먹을래요, 읽다→읽을래요, 앉다→앉을래요' },
      { type: 'rule', text: '动词词干 + -겠어요', examples: '가겠어요, 먹겠어요, 알겠어요, 하겠어요' },
      { type: 'usage', text: '-겠- 表达意志/推测/礼貌', examples: '알겠어요（明白了）, 하겠어요（我来做）, 어떻게 하겠어요?（打算怎么做？）' },
      { type: 'note', text: '-겠- 不只表示将来；初学阶段先掌握 알겠어요', examples: '알겠어요（明白了）— 会话最高频固定表达' },
      { type: 'compare', text: '-고 싶어요 vs -을/ㄹ래요', examples: '커피 마시고 싶어요（内心愿望，柔和）/ 커피 마실래요（直接意愿选择，更自然口语）' },
      { type: 'example', text: '갈래요 / 먹을래요 / 볼래요 / 알겠어요 / 하겠어요 — 高频例句速记' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈래요', role: 'verb' },
        ],
        zh: '要一起去吗？',
        swapWords: ['먹을래요', '볼래요', '할래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '아이스 아메리카노', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
        zh: '我要喝冰美式。',
        swapWords: ['먹을래요', '볼래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '알겠어요', role: 'verb' },
        ],
        zh: '明白了。',
        swapWords: ['하겠어요', '가겠어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭐', role: 'object' },
          { text: '먹을래요', role: 'verb' },
        ],
        zh: '要吃什么？',
        swapWords: ['마실래요', '할래요', '볼래요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '点餐', ko: '저는 아이스 아메리카노 마실래요.', zh: '我要喝冰美式。' },
      { icon: '👫', context: '朋友邀约', ko: '같이 갈래요?', zh: '要一起去吗？' },
      { icon: '📚', context: '学习回应', ko: '알겠어요. 다시 해 볼게요.', zh: '明白了，我再试一次。' },
      { icon: '🎵', context: 'KPOP', ko: '이 무대를 다시 볼래요.', zh: '我要再看这个舞台。' },
      { icon: '🍽️', context: '餐厅点单', ko: '뭐 드실래요? 저는 냉면 먹을래요.', zh: '您要吃什么？我要吃冷面。' },
      { icon: '🚌', context: '出行', ko: '거기까지 같이 갈래요? 알겠어요, 그럼 10분 후에 출발해요.', zh: '要一起去那里吗？明白了，那10分钟后出发。' },
    ],
    mistakes: [
      { wrong: '먹ㄹ래요', correct: '먹을래요', note: '有收音词干用 을래요，먹다 → 먹을래요。' },
      { wrong: '-겠어요 只理解成将来时', correct: '알겠어요（明白了），하겠어요（我来做）', note: '-겠- 语气多样，初学先记 알겠어요 这个高频固定表达。' },
      { wrong: '가ㄹ래요', correct: '갈래요', note: '无收音词干用 ㄹ래요：가다 → 갈래요，不单独写 ㄹ。' },
      { wrong: '알겠어요 = 알았어요（以为意思相同）', correct: '알겠어요（现在明白了，礼貌回应）/ 알았어요（知道了，随意口语）', note: '알겠어요 更礼貌，适合对上级或正式场合；알았어요 是朋友间用语。' },
    ],
        compareHtml: `<div class="card-title">"我要……"vs"好的我知道了"</div>
<div class="card-body">-을/ㄹ래요 表达"我要……/要不要……"，比 -고 싶어요 更直接；-겠- 表达意志、推测或礼貌，最常见固定表达是 알겠어요（明白了）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-을/ㄹ래요（我要……）</div><div style="font-size:14px;color:#89756e;margin-top:2px">意愿+提议，口语常用</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹을래요?</span><span style="font-size:14px;color:#5a4640">要吃饭吗？/ 我要吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">뭐 마실래요?</span><span style="font-size:14px;color:#5a4640">要喝什么？</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-겠-（我知道了）</div><div style="font-size:14px;color:#89756e;margin-top:2px">意志/推测/礼貌</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">알겠어요.</span><span style="font-size:14px;color:#5a4640">明白了。（认知→承诺）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">내가 하겠어요.</span><span style="font-size:14px;color:#5a4640">我来做。（意志）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">和中文的对应关系</div><div style="font-size:15px;color:#5a4640">-을/ㄹ래요 既是问句也是陈述句：뭐 먹을래요?（你要吃什么？）밥 먹을래요（我要吃饭）。中文需要语调区分，韩语靠上下文。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-겠- 没有中文直接对应词，它嵌入在词尾里。알겠어요 直译是"会知道的"，实际意思是"我明白了/我知道了"。</div></div>
<div class="reminder-box">알겠어요 是你和韩国人对话时用得最多的词之一——对方说什么，回一句 알겠어요 表示"明白了/收到了"。类似中文"好的"或"明白了"。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-을/ㄹ래요 · -겠어요</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">直接表达"我要……"，以及礼貌回应"明白了"。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">같이 갈래요?</div>
    <div class="zh">要一起去吗？</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">저는 아이스 아메리카노 마실래요.</div>
    <div class="zh">我要喝冰美式。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">알겠어요. 다시 해 볼게요.</div>
    <div class="zh">明白了，我再试一次。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">无收音词干</span>
      <span style="font-weight:800;color:#ff7fa8">+ ㄹ래요</span>
      <span style="font-size:12px;color:#89756e">가다→갈래요, 보다→볼래요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">有收音词干</span>
      <span style="font-weight:800;color:#2db89b">+ 을래요</span>
      <span style="font-size:12px;color:#89756e">먹다→먹을래요, 읽다→읽을래요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">词干</span>
      <span style="font-weight:800;color:#6b7ff0">+ -겠어요</span>
      <span style="font-size:12px;color:#89756e">알겠어요（明白了）</span>
    </div>
  </div>
</div>
<div class="reminder-box">-겠- 不只表示将来，初学阶段先把 알겠어요（明白了）作为固定表达记住，会话立刻更自然。</div>`,
    
    compareLabel: '-고 싶어요 vs -을/ㄹ래요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第5课</span>
  <div class="ov-title">-을/ㄹ래요 · -겠어요</div>
  <div class="ov-sub">意愿选择 + 알겠어요 礼貌回应</div>
  <div class="ov-sec">
    <h3>-을/ㄹ래요 变化</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">ㄹ래요</b>：갈래요 · 볼래요 · 마실래요<br>
      받침 있는 → <b style="color:#2db89b">을래요</b>：먹을래요 · 읽을래요 · 앉을래요
    </div>
  </div>
  <div class="ov-sec">
    <h3>-겠어요 高频表达</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">알겠어요</b>（明白了）&nbsp; 하겠어요（我来做）&nbsp; 가겠어요（我去）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹ㄹ래요</span> → <span style="color:#ff7fa8">먹을래요</span>（받침 있는 用 을래요）<br>
      -겠어요 不只是将来 → 先记 <span style="color:#6b7ff0">알겠어요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l06',
    partNumber: 3,
    lessonNumber: 2,
    title: '무슨, 어느, 어떤',
    whatItDoes: '问什么、哪个、什么样的',
    whatItDoesBody: '三个疑问词都可译成"什么/哪"，但用法不同：\n무슨 问名称内容，어느 从选项中选哪个，어떤 问性质特点。\n中文"什么歌""哪首歌""什么风格的歌"对应的就是这三个词。',
    structureNote: '这节课三个疑问词都放在名词前面，结构一样，区别只在"问的是什么"。\n记住三个典型句：\n무슨 뜻이에요？/ 어느 나라 사람이에요？/ 어떤 음식을 좋아해요？',
    rulesNote: '어느 只用于疑问句，肯定句里不用（不说"어느 노래가 좋아요"来表达喜欢）。\n무슨 和 어떤 的区别：\n问"叫什么名字/是什么"用 무슨，问"属于哪种/什么特点"用 어떤。',
    scenarioNote: '这三个词是开启话题的万能钥匙"这是什么歌""你是哪国人""喜欢什么样的食物"。\n掌握这节课，你能问出更精准的问题，对话不再只靠"뭐예요？"。',
    structures: [
      {
        ko: '무슨 뜻이에요?',
        zh: '是什么意思？',
        tokens: [
          { text: '무슨', role: 'plain' },
          { text: '뜻이에요', role: 'verb' },
        ],
      },
      {
        ko: '어떤 노래를 좋아해요?',
        zh: '喜欢什么样的歌？',
        tokens: [
          { text: '어떤', role: 'place' },
          { text: '노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '무슨 + 名词 — 问名称/内容/意思/属性', examples: '무슨 노래예요? 무슨 뜻이에요? 무슨 색을 좋아해요? 오늘 무슨 일이 있어요?' },
      { type: 'rule', text: '어느 + 名词 — 从选项中选哪一个（只用于疑问句）', examples: '어느 나라 사람이에요? 어느 카페에 갈래요? 어느 것이 좋아요?' },
      { type: 'rule', text: '어떤 + 名词 — 问性质/特征/类型', examples: '어떤 음식을 좋아해요? 어떤 사람이에요? 어떤 영화를 봐요?' },
      { type: 'compare', text: '区别方法：名称/属性→무슨，选项→어느，特征→어떤', examples: '무슨 노래예요?（名称）/ 어느 노래가 좋아요?（选项）/ 어떤 노래를 좋아해요?（特点偏好）' },
      { type: 'note', text: '어느 主要用于疑问句，肯定陈述句中一般不用', examples: '이 노래가 좋아요 ✓（肯定句不用 어느）/ 어느 노래가 좋아요?（疑问句 ✓）' },
      { type: 'usage', text: '무슨 일이에요? — 日常高频表达', examples: '무슨 일이에요?（什么事？）/ 무슨 생각을 해요?（在想什么？）/ 무슨 말이에요?（什么意思？）' },
      { type: 'example', text: '무슨 뜻이에요? / 어느 나라 사람이에요? / 어떤 음식을 좋아해요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '무슨', role: 'plain' },
          { text: '노래예요', role: 'verb' },
        ],
        zh: '是什么歌？',
        swapWords: ['무슨 뜻이에요', '무슨 일이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어느', role: 'plain' },
          { text: '나라', role: 'subject' },
          { text: '사람이에요', role: 'verb' },
        ],
        zh: '是哪国人？',
        swapWords: ['어느 노래가 좋아요', '어느 카페에 갈래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '음식을', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '喜欢什么样的食物？',
        swapWords: ['어떤 노래를 좋아해요', '어떤 사람이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '일을', role: 'object' },
          { text: '하세요', role: 'verb' },
        ],
        zh: '您做什么工作？',
        swapWords: ['무슨 일을 하세요', '어떤 공부를 해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🔍', context: '查词', ko: '무슨 뜻이에요?', zh: '是什么意思？' },
      { icon: '🎵', context: 'KPOP 问歌', ko: '무슨 노래예요?', zh: '是什么歌？' },
      { icon: '🌏', context: '认识新朋友', ko: '어느 나라 사람이에요?', zh: '是哪国人？' },
      { icon: '🎨', context: '问颜色/属性', ko: '무슨 색을 좋아해요? 오늘 무슨 일이 있어요?', zh: '喜欢什么颜色？今天有什么事？' },
      { icon: '🏪', context: '便利店/超市', ko: '어떤 음료를 좋아해요? 저는 차가운 것을 좋아해요.', zh: '喜欢什么饮料？我喜欢凉的。' },
      { icon: '🤝', context: '初次见面', ko: '어느 나라 사람이에요? 어떤 일을 하세요?', zh: '是哪国人？做什么工作？' },
    ],
    mistakes: [
      { wrong: '어느 뜻이에요?（问意思）', correct: '무슨 뜻이에요?', note: '问名称/内容用 무슨，어느 是从选项里选一个，不适合问意思。' },
      { wrong: '무슨/어떤 混用', correct: '무슨 노래예요?（问名称）/ 어떤 노래를 좋아해요?（问偏好）', note: '问这首歌叫什么名用 무슨，问喜欢什么类型用 어떤。' },
      { wrong: '어느 음식이 맛있어요（肯定陈述句）', correct: '이 음식이 맛있어요 / 어떤 음식이 맛있어요?', note: '어느 主要用于疑问句中选择选项，肯定陈述句里用感觉很奇怪。' },
      { wrong: '어떤 뜻이에요?', correct: '무슨 뜻이에요?', note: '问意思/名称用 무슨，어떤 是问性质和特征时用。' },
    ],
        compareHtml: `<div class="card-title">무슨 vs 어느 vs 어떤</div>
<div class="card-body">三个疑问词都可译成"什么/哪/什么样的"，但用法完全不同：무슨 问名称内容，어느 从选项中选哪个，어떤 问性质特点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">무슨（什么名称）</div><div style="font-size:14px;color:#89756e;margin-top:2px">问名称/内容/种类</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">무슨 노래 좋아해요?</span><span style="font-size:14px;color:#5a4640">喜欢什么歌？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">무슨 일 있어요?</span><span style="font-size:14px;color:#5a4640">有什么事吗？</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">어느（哪个）</div><div style="font-size:14px;color:#89756e;margin-top:2px">从有限选项中选一个</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어느 나라 가고 싶어요?</span><span style="font-size:14px;color:#5a4640">想去哪个国家？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어느 쪽이 더 좋아요?</span><span style="font-size:14px;color:#5a4640">哪个更好？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">中文三个词的区别</div><div style="font-size:15px;color:#5a4640">中文"什么歌""哪首歌""什么风格的歌"——正好对应 무슨/어느/어떤。무슨 노래（什么歌名），어느 노래（哪首歌，从列表选），어떤 노래（什么样的歌，问风格类型）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">三个词不能互换，用错会让韩国人困惑。</div></div>
<div class="reminder-box">무슨（什么名字）→ 어느（选哪个）→ 어떤（什么样的）。中文都问"什么"，韩语需要精确区分你想问的是名字、选项还是特征。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">무슨 · 어느 · 어떤</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">都能放名词前表示"什么/哪"，但问的内容不一样。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">무슨 뜻이에요?</div>
    <div class="zh">是什么意思？（问名称/内容）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">어느 나라 사람이에요?</div>
    <div class="zh">是哪国人？（从选项中选）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">어떤 음식을 좋아해요?</div>
    <div class="zh">喜欢什么样的食物？（问特点/类型）</div>
  </div>
</div>
<div class="block">
  <div class="h2">三词核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:1.05rem">무슨</span>
      <span style="font-size:13px;color:#241917">问名称、内容、意思、属性</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:1.05rem">어느</span>
      <span style="font-size:13px;color:#241917">从多个选项里选哪一个</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#6b7ff0;font-size:1.05rem">어떤</span>
      <span style="font-size:13px;color:#241917">问性质、特征、类型、偏好</span>
    </div>
  </div>
</div>
<div class="reminder-box">어느 只用于疑问句；肯定句里说喜欢哪首歌，直接用"이 노래가 좋아요"，不用 어느。</div>`,
    
    compareLabel: '무슨 / 어느 / 어떤 对比',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第6课</span>
  <div class="ov-title">무슨 · 어느 · 어떤</div>
  <div class="ov-sub">问名称用 무슨，选选项用 어느，问特点用 어떤</div>
  <div class="ov-sec">
    <h3>三词用法</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">무슨</b>：무슨 뜻이에요? · 무슨 노래예요?（名称/内容）<br>
      <b style="color:#2db89b">어느</b>：어느 나라 사람이에요? · 어느 노래가 좋아요?（选项）<br>
      <b style="color:#6b7ff0">어떤</b>：어떤 음식을 좋아해요? · 어떤 사람이에요?（特点）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">어느 뜻이에요</span> → <span style="color:#ff7fa8">무슨 뜻이에요</span><br>
      问歌名 → <span style="color:#ff7fa8">무슨 노래예요</span>，问偏好 → <span style="color:#6b7ff0">어떤 노래를 좋아해요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l07',
    partNumber: 3,
    lessonNumber: 6,
    title: '그렇지만, 그런데',
    whatItDoes: '说"但是/不过"，转折话题',
    whatItDoesBody: '그렇지만 是明确转折"但是"；\n그런데 语气更口语，可以是轻转折"不过"，也可以用来推进话题或引入新信息。\n这节课和P2的 그렇지만 有重叠重点是新增 그런데，弄清楚两者的区别。\n中文"但是"和"不过"的区别类似：\n그렇지만 ≈ 但是（正式转折），그런데 ≈ 不过（口语，还能转换话题）。',
    structureNote: '两个连词都放在第二句句首，结构完全一样。\n区别在语气和功能：\n그렇지만 只能做转折，그런데 还能转换话题（"对了，这个词什么意思？"）。',
    rulesNote: '判断用哪个很简单：\n前后有明确对比关系用 그렇지만；\n想轻松转换话题或信息时用 그런데。\n口语里 그런데 远比 그렇지만 常见，可以覆盖大多数场合。',
    scenarioNote: '그런데 是韩语口语里出现最频繁的连词之一用来插入新话题、提出疑问、轻轻转折。\n学会 그런데，你的对话会更自然流畅，不再只有"但是"这一种过渡方式。',
    structures: [
      {
        ko: '이 노래는 좋아요. 그렇지만 어려워요',
        zh: '这首歌很好，但是很难。',
        tokens: [
          { text: '이 노래는', role: 'subject' },
          { text: '좋아요.', role: 'verb' },
          { text: '그렇지만', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '그런데 이 단어는 무슨 뜻이에요?',
        zh: '不过这个单词是什么意思？',
        tokens: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '그렇지만 — 明确转折，前后信息形成对比', examples: '한국어는 재미있어요. 그렇지만 어려워요.' },
      { type: 'compare', text: '그런데 — 轻转折/话题推进，口语高频', examples: '이 노래는 좋아요. 그런데 발음이 빨라요.' },
      { type: 'note', text: '그런데 有话题转换功能，그렇지만 没有', examples: '그런데 무슨 뜻이에요? — 不能换成 그렇지만' },
      { type: 'rule', text: '两个连词都放在第二句句首', examples: '문장1. 그렇지만/그런데 문장2.' },
      { type: 'compare', text: '그리고 vs 그렇지만', examples: '공부해요. 그리고 드라마도 봐요.（补充）/ 공부해요. 그렇지만 어려워요.（转折）' },
      { type: 'usage', text: '顺接与逆接区分', examples: '前后有对比 → 그렇지만/그런데；信息补充 → 그리고' },
      { type: 'example', text: '재미있어요. 그렇지만 어려워요. / 그런데 이 단어는 무슨 뜻이에요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요.', role: 'verb' },
          { text: '그렇지만', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语有意思，但是难。',
        swapWords: ['그런데 어려워요', '그런데 발음이 빨라요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 영상은', role: 'subject' },
          { text: '재미있어요.', role: 'verb' },
          { text: '그런데', role: 'plain' },
          { text: '조금 길어요', role: 'verb' },
        ],
        zh: '这个视频有意思，不过有点长。',
        swapWords: ['그렇지만 조금 길어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
        zh: '不过这个单词是什么意思？',
        swapWords: ['그런데 이 노래 알아요', '그런데 시간 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '음식이', role: 'subject' },
          { text: '맛있어요.', role: 'verb' },
          { text: '그런데', role: 'plain' },
          { text: '좀 매워요', role: 'verb' },
        ],
        zh: '食物很好吃，不过有点辣。',
        swapWords: ['그렇지만 좀 매워요', '그런데 좀 비싸요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习反馈', ko: '한국어는 재미있어요. 그렇지만 문법은 어려워요.', zh: '韩语有意思，但是语法难。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래는 좋아요. 그런데 발음이 빨라요.', zh: '这首歌很好，不过发音很快。' },
      { icon: '💬', context: '话题转换', ko: '그런데 이 단어는 무슨 뜻이에요?', zh: '话说，这个单词是什么意思？' },
      { icon: '🏃', context: '两者互换', ko: '선수들이 다 피곤해요. 그렇지만 열심히 훈련해요.', zh: '运动员们都很累，但是努力训练。' },
      { icon: '🍽️', context: '餐厅', ko: '이 식당은 맛있어요. 그런데 좀 비싸요.', zh: '这家餐厅很好吃，不过有点贵。' },
      { icon: '🌧️', context: '天气变化', ko: '오늘은 날씨가 좋아요. 그렇지만 내일은 비가 와요.', zh: '今天天气好，但是明天会下雨。' },
    ],
    mistakes: [
      { wrong: '顺接用了 그렇지만', correct: '공부해요. 그리고 드라마도 봐요.', note: '补充信息用 그리고，前后有对比才用 그렇지만/그런데。' },
      { wrong: '把 그런데 只理解成强转折', correct: '그런데 무슨 뜻이에요?（话题推进）', note: '그런데 在口语中很常见，不一定是强转折，也可以只是话题推进。' },
      { wrong: '用 그렇지만 推进话题', correct: '그런데 이거 알아요?（话题推进）', note: '话题推进/引入新信息只能用 그런데，그렇지만 只有转折功能。' },
      { wrong: '그리고 位置用了 그런데', correct: '공부해요. 그리고 운동도 해요.', note: '补充并列信息用 그리고，不是 그런데。' },
    ],
        compareHtml: `<div class="card-title">"但是"vs"不过"</div>
<div class="card-body">그렇지만 是明确转折"但是"；그런데 语气更口语，可以是轻转折"不过"，也可以用来推进话题或引入新信息。P2已经学过 그렇지만，这课重点是新增 그런데。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">그렇지만（但是）</div><div style="font-size:14px;color:#89756e;margin-top:2px">明确转折，正式</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바빠요. 그렇지만 할게요.</span><span style="font-size:14px;color:#5a4640">很忙。但是我会做。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려워요. 그렇지만 재미있어요.</span><span style="font-size:14px;color:#5a4640">很难。但是很有趣。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그런데（不过/话说）</div><div style="font-size:14px;color:#89756e;margin-top:2px">轻转折/引入新话题</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부했어요. 그런데 잘 모르겠어요.</span><span style="font-size:14px;color:#5a4640">学了。不过还是不太懂。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">그런데 내일 뭐 할 거예요?</span><span style="font-size:14px;color:#5a4640">话说，明天打算做什么？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">中文对应关系</div><div style="font-size:15px;color:#5a4640">中文"但是"和"不过"的区别——但是更正式，不过更口语。韩语同理，그렇지만≈"但是"（正式/书面），그런데≈"不过"（口语/自然）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">额外区别：그런데 还能引出新话题，类似中文"话说……"——这是 그렇지만 做不到的。</div></div>
<div class="reminder-box">그렇지만 = 但是（转折）<br>그런데 = 不过（轻转折）或"话说……"（引入新话题）。两个不要混用。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">그렇지만 · 그런데</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">转折连接词，放第二句句首，语气强弱不同。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">한국어는 재미있어요. 그렇지만 어려워요.</div>
    <div class="zh">韩语很有意思，但是难。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">이 노래는 좋아요. 그런데 발음이 빨라요.</div>
    <div class="zh">这首歌很好，不过发音很快。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">그런데 이 단어는 무슨 뜻이에요?</div>
    <div class="zh">话说，这个单词是什么意思？（话题推进）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:1.05rem">그렇지만</span>
      <span style="font-size:13px;color:#241917">明确转折"但是"（只能转折）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:1.05rem">그런데</span>
      <span style="font-size:13px;color:#241917">轻转折"不过" + 可转换话题（口语更常用）</span>
    </div>
  </div>
</div>
<div class="reminder-box">그런데 比 그렇지만 用途更广——轻转折、话题推进都能用，口语里出现频率远高于 그렇지만。</div>`,
    
    compareLabel: '그리고 / 그렇지만 / 그런데',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第7课</span>
  <div class="ov-title">그렇지만 · 그런데</div>
  <div class="ov-sub">转折连接词，放在第二句句首</div>
  <div class="ov-sec">
    <h3>用法对比</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">그렇지만</b>：明确转折"但是" — 좋아요. 그렇지만 어려워요.<br>
      <b style="color:#2db89b">그런데</b>：轻转折/话题推进 — 재미있어요. 그런데 발음이 빨라요.<br>
      <b style="color:#6b7ff0">그리고</b>（已学）：顺接补充"而且"
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      顺接误用转折 → <span style="color:#ff7fa8">그리고</span>（补充）vs <span style="color:#2db89b">그런데</span>（转折）<br>
      그런데 不只是强转折，口语里也常用于转话题
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l08',
    partNumber: 3,
    lessonNumber: 7,
    title: '그래서, 그러니까',
    whatItDoes: '说"所以/因此"，连接原因结果',
    whatItDoesBody: '그래서 连接原因和自然结果；\n그러니까 也表示所以/因此，口语中常带总结、提醒或劝告的语气。\n两个都对应中文"所以"，区别在 그러니까 更像"所以说……"，语气更强调。',
    structureNote: '两个连词都放第二句句首，原因在前，结果在后，顺序不能反。\n区别：\n그래서 陈述自然结果，그러니까 常接建议或提醒（所以你该……）。',
    rulesNote: '原因-结果顺序固定，不能倒装（비가 와요. 그래서 집에 있어요. ✓）。\n그래서 和 그러니까 不用于转折转折用 그런데/그렇지만。\n两词区别：\n그래서=自然结果，그러니까=带劝告语气的总结。',
    scenarioNote: '日常生活中因为……所以……无处不在"因为下雨所以在家""因为太忙所以不能去"。\n掌握 그래서，你能解释原因、表达关联，让对话更有逻辑感。',
    structures: [
      {
        ko: '비가 와요. 그래서 집에 있어요',
        zh: '下雨。所以在家。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '와요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '집에', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
      },
      {
        ko: '이 문법은 중요해요. 그러니까 복습하세요',
        zh: '这个语法很重要。所以请复习。',
        tokens: [
          { text: '이 문법은', role: 'subject' },
          { text: '중요해요.', role: 'verb' },
          { text: '그러니까', role: 'plain' },
          { text: '복습하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '그래서 — 原因 + 그래서 + 自然结果', examples: '비가 와요. 그래서 집에 있어요.' },
      { type: 'rule', text: '그러니까 — 原因 + 그러니까 + 结果/建议（带提醒语气）', examples: '지금 길이 막힙니다. 그러니까 빨리 가세요.' },
      { type: 'example', text: '그러니까 推断：내일 주말이에요. 그러니까 사람이 많을 거예요.' },
      { type: 'note', text: '原因-结果顺序固定：原因在前，그래서/그러니까 + 结果', examples: '집에 있어요. 그래서 비가 와요. ✗ / 비가 와요. 그래서 집에 있어요. ✓' },
      { type: 'compare', text: '그래서/그러니까 vs 그런데', examples: '그래서（所以，原因结果）/ 그런데（不过，转折）' },
      { type: 'compare', text: '그래서 vs 그러니까', examples: '그래서（自然结果）/ 그러니까（带提醒/劝告语气，口语更强调）' },
      { type: 'usage', text: '高频模式：原因 + 그래서/그러니까 + 行动/建议', examples: '배가 고파요. 그래서 밥을 먹어요. / 피곤해요. 그러니까 좀 쉬세요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '바빠요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '공부 못 해요', role: 'verb' },
        ],
        zh: '今天很忙。所以不能学习。',
        swapWords: ['그래서 카페에 안 가요', '그래서 집에 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '발음이 빨라요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '따라 하기 어려워요', role: 'verb' },
        ],
        zh: '这首歌发音快。所以跟读难。',
        swapWords: ['그래서 외우기 어려워요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문법은', role: 'subject' },
          { text: '중요해요.', role: 'verb' },
          { text: '그러니까', role: 'plain' },
          { text: '꼭 복습하세요', role: 'verb' },
        ],
        zh: '这个语法很重要。所以一定要复习。',
        swapWords: ['그러니까 같이 공부해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '배가', role: 'subject' },
          { text: '고파요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '밥을 먹어요', role: 'verb' },
        ],
        zh: '肚子饿。所以吃饭。',
        swapWords: ['그래서 카페에 가요', '그러니까 빨리 가세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气原因', ko: '비가 와요. 그래서 집에 있어요.', zh: '下雨。所以在家。' },
      { icon: '📚', context: '学习反馈', ko: '이 문법은 어려워요. 그래서 다시 복습해요.', zh: '这个语法难。所以重新复习。' },
      { icon: '🚗', context: '交通推断', ko: '지금 길이 막힙니다. 그러니까 빨리 가세요.', zh: '现在堵车。所以快走吧。' },
      { icon: '📅', context: '周末推断', ko: '내일 주말이에요. 그러니까 사람이 많을 거예요.', zh: '明天是周末。所以人会很多。' },
      { icon: '😴', context: '疲倦原因', ko: '어제 많이 걸었어요. 그래서 오늘 다리가 아파요.', zh: '昨天走了很多路，所以今天腿疼。' },
      { icon: '🏥', context: '医院就诊', ko: '열이 나요. 그러니까 오늘은 쉬세요.', zh: '发烧了，所以今天休息吧。' },
    ],
    mistakes: [
      { wrong: '집에 있어요. 그래서 비가 와요.（原因结果反了）', correct: '비가 와요. 그래서 집에 있어요.', note: '原因在前，그래서 结果在后，顺序不能反。' },
      { wrong: '그래서와 그런데 混用', correct: '그래서（所以，原因结果）/ 그런데（不过，转折）', note: '两个词意思完全不同，原因结果用 그래서/그러니까。' },
      { wrong: '그래서 前后顺序弄反', correct: '피곤해요. 그래서 쉬어요.', note: '그래서 前是原因，后是结果，顺序不能换。' },
      { wrong: '그런데 位置用了 그래서', correct: '이 노래는 좋아요. 그런데 발음이 빨라요.', note: '转折用 그런데，그래서 只用于原因-结果关系。' },
    ],
        compareHtml: `<div class="card-title">"所以"vs"所以说"</div>
<div class="card-body">그래서 连接原因和自然结果；그러니까 也表示"所以/因此"，口语中常带总结、提醒或劝告的语气。两个都对应中文"所以"，区别在 그러니까 更像"所以说……"，语气更强调。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">그래서（所以→结果）</div><div style="font-size:14px;color:#89756e;margin-top:2px">原因→自然结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 왔어요. 그래서 집에 있었어요.</span><span style="font-size:14px;color:#5a4640">下雨了。所以在家待着。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바빠요. 그래서 늦었어요.</span><span style="font-size:14px;color:#5a4640">很忙。所以迟到了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그러니까（所以说→总结）</div><div style="font-size:14px;color:#89756e;margin-top:2px">总结/提醒/劝告</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 없어요. 그러니까 빨리 가요.</span><span style="font-size:14px;color:#5a4640">没时间了。所以说快走吧。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려워요. 그러니까 연습해야 해요.</span><span style="font-size:14px;color:#5a4640">很难。所以说要多练习。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">两个"所以"的微妙区别</div><div style="font-size:15px;color:#5a4640">中文"所以"两个字涵盖所有情况，韩语分两种语气。그래서 单纯叙述因果关系（因→果），그러니까 带有"我刚才说了什么来着"的总结感。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">记住这个测试：如果能在"所以"前面加"所以说"，就用 그러니까；如果只是陈述结果，就用 그래서。</div></div>
<div class="reminder-box">그래서 = 所以（因果关系连接）<br>그러니까 = 所以说（总结/劝告/提醒）<br>代入中文"所以说"测试一下就知道该用哪个。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">그래서 · 그러니까</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">连接原因和结果，表达"所以/因此"。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">비가 와요. 그래서 집에 있어요.</div>
    <div class="zh">下雨。所以在家。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">이 문법은 중요해요. 그러니까 복습하세요.</div>
    <div class="zh">这个语法很重要。所以请复习。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">배가 고파요. 그래서 밥을 먹어요.</div>
    <div class="zh">肚子饿。所以吃饭。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:1.05rem">그래서</span>
      <span style="font-size:13px;color:#241917">所以（陈述自然结果）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:1.05rem">그러니까</span>
      <span style="font-size:13px;color:#241917">所以（带总结/劝告语气，口语强调感更强）</span>
    </div>
  </div>
</div>
<div class="reminder-box">原因一定在前，그래서/그러니까 + 结果在后，顺序不能反。转折用 그런데，不要混用。</div>`,
    
    compareLabel: '그래서 vs 그런데',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第8课</span>
  <div class="ov-title">그래서 · 그러니까</div>
  <div class="ov-sub">连接原因和结果，"所以/因此"</div>
  <div class="ov-sec">
    <h3>用法</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">그래서</b>：原因 → 自然结果<br>
      비가 와요. <b style="color:#ff7fa8">그래서</b> 집에 있어요.<br>
      <b style="color:#2db89b">그러니까</b>：原因 → 总结/劝告<br>
      중요해요. <b style="color:#2db89b">그러니까</b> 복습하세요.
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      原因结果顺序反了 → 先写原因，<span style="color:#ff7fa8">그래서</span> 再写结果<br>
      <span style="color:#e05555;text-decoration:line-through">그래서</span> 当转折用 → 转折用 <span style="color:#2db89b">그런데</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l09',
    partNumber: 3,
    lessonNumber: 8,
    title: '-(으)러 가다/오다, -을/ㄹ까요?',
    whatItDoes: '说"去做某事"，以及提议询问',
    whatItDoesBody: '-(으)러 가다/오다 表达"去/来做某事"的目的；\n-을/ㄹ까요? 用于提议或询问意见，表示"要不要……？"。\n中文"去吃饭"直接说，韩语需要目的助词 -(으)러 连接动词和去/来。',
    structureNote: '两块内容：①-(으)러 가다/오다（去做某事）目的动词加 러/으러，后接 가요/와요；\n②-을/ㄹ까요?（提议/询问）接在动词词干后，看有无收音选 을/ㄹ。',
    rulesNote: '-(으)러 的收音规则：\n有收音接 으러（먹으러），无收音接 러（보러）。\n注意区分 -(으)러 가요（去做）和 -고 가요（做了再走）前者是目的，后者是顺序。\n-을/ㄹ까요 形容词也能用（좋을까요？）。',
    scenarioNote: '뭐 먹으러 갈까요？这一句几乎是韩国人约饭时的标准开场白。\n-(으)러 가다 和 -을/ㄹ까요 配合使用，就能邀约、提议、表达目的，日常对话里会一直用到。',
    structures: [
      {
        ko: '카페에 공부하러 가요',
        zh: '去咖啡店学习。',
        tokens: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '밥 먹으러 갈까요?',
        zh: '要去吃饭吗？',
        tokens: [
          { text: '밥', role: 'object' },
          { text: '먹으러', role: 'verb' },
          { text: '갈까요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词 + 러 가다/오다', examples: '보다→보러 가요, 마시다→마시러 가요, 공부하다→공부하러 가요' },
      { type: 'rule', text: '有收音动词 + 으러 가다/오다', examples: '먹다→먹으러 가요, 읽다→읽으러 가요, 찾다→찾으러 가요' },
      { type: 'rule', text: '无收音动词 + ㄹ까요?', examples: '가다→갈까요?, 보다→볼까요?, 마시다→마실까요?' },
      { type: 'rule', text: '有收音动词 + 을까요?', examples: '먹다→먹을까요?, 읽다→읽을까요?' },
      { type: 'note', text: '-을/ㄹ까요? 形容词/名词也能接', examples: '얼마일까요?（多少钱呢？）, 좋을까요?（好吗？）' },
      { type: 'compare', text: '-(으)러 가요 vs -고 가요', examples: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）— 目的 vs 先后顺序' },
      { type: 'usage', text: '日常高频模式', examples: '뭐 먹으러 갈까요? / 카페에 공부하러 가요. / 같이 볼까요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去咖啡店学习。',
        swapWords: ['먹으러 가요', '보러 가요', '마시러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트를', role: 'object' },
          { text: '보러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去看演唱会。',
        swapWords: ['먹으러 가요', '공부하러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈까요', role: 'verb' },
        ],
        zh: '要一起去吗？',
        swapWords: ['먹을까요', '볼까요', '할까요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도서관에', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '빌리러 가요', role: 'verb' },
        ],
        zh: '去图书馆借书。',
        swapWords: ['공부하러 가요', '반납하러 가요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '去咖啡店', ko: '카페에 공부하러 가요.', zh: '去咖啡店学习。' },
      { icon: '🍜', context: '约饭', ko: '밥 먹으러 갈까요?', zh: '要去吃饭吗？' },
      { icon: '🎤', context: 'KPOP', ko: '콘서트를 보러 가요.', zh: '去看演唱会。' },
      { icon: '📺', context: '提议', ko: '이 영상을 볼까요?', zh: '要看这个视频吗？' },
      { icon: '🏪', context: '便利店', ko: '편의점에 뭔가 사러 가요.', zh: '去便利店买东西。' },
      { icon: '🏋️', context: '健身房', ko: '운동하러 헬스장에 갈까요?', zh: '要去健身房运动吗？' },
    ],
    mistakes: [
      { wrong: '먹러 가요（有收音忘加 으）', correct: '먹으러 가요', note: '有收音用 으러，먹다 → 먹으러 가요。' },
      { wrong: '먹으러 가요 vs 먹고 가요 混用', correct: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）', note: '-(으)러 是目的，-고 是先后顺序，意思不同。' },
      { wrong: '먹ㄹ까요', correct: '먹을까요', note: '有收音 + 을까요，먹다 → 먹을까요。' },
      { wrong: '가러 가요', correct: '가러 가요 ✗ → 가려고 가요 or 그냥 가요', note: '가다 + 러 가다 很奇怪，目的动词和移动动词相同时换用其他表达。' },
    ],
        compareHtml: `<div class="card-title">"去做某事"vs"要不要……？"</div>
<div class="card-body">-(으)러 가다/오다 表达"去/来做某事"的目的；-을/ㄹ까요? 用于提议或询问意见，表示"要不要……？"。中文"去吃饭"直接说，韩语需要目的助词 -(으)러 连接动词和去/来。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-(으)러 가다（去做……）</div><div style="font-size:14px;color:#89756e;margin-top:2px">目的连接+去/来</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹으러 가요.</span><span style="font-size:14px;color:#5a4640">去吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래 들으러 왔어요.</span><span style="font-size:14px;color:#5a4640">来听歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-을/ㄹ까요?（要不要？）</div><div style="font-size:14px;color:#89756e;margin-top:2px">提议/询问意见</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">같이 먹을까요?</span><span style="font-size:14px;color:#5a4640">一起吃吗？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">뭐 마실까요?</span><span style="font-size:14px;color:#5a4640">喝点什么呢？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">中文和韩语的结构差异</div><div style="font-size:15px;color:#5a4640">中文"去吃饭"——"去"和"吃"直接连用。韩语必须在中间插入 -(으)러：먹<u>으러</u> 가다。这个 -(으)러 告诉听者"去做某事"的目的是什么。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-을/ㄹ까요? 类似中文"要不要……？"或"……怎么样？"，但中文用疑问句加上商量语气，韩语用专门词尾。</div></div>
<div class="reminder-box">-(으)러 表目的+去/来：말하다 → 말하러 가요（去说话）<br>注意：-(으)러 只能搭配 가다/오다/다니다，不能搭配其他动词。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-(으)러 가요 · -을/ㄹ까요?</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">表达去做某事的目的，以及提议。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">카페에 공부하러 가요.</div>
    <div class="zh">去咖啡店学习。（目的）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">밥 먹으러 갈까요?</div>
    <div class="zh">要去吃饭吗？（目的+提议）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">콘서트를 보러 가요.</div>
    <div class="zh">去看演唱会。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">无收音</span>
      <span style="font-weight:800;color:#ff7fa8">+ 러 가요</span>
      <span style="font-size:12px;color:#89756e">보다→보러 가요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">有收音</span>
      <span style="font-weight:800;color:#2db89b">+ 으러 가요</span>
      <span style="font-size:12px;color:#89756e">먹다→먹으러 가요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">提议</span>
      <span style="font-weight:800;color:#6b7ff0">-을/ㄹ까요?</span>
      <span style="font-size:12px;color:#89756e">갈까요? / 먹을까요?</span>
    </div>
  </div>
</div>
<div class="reminder-box">먹으러 가요（去吃）≠ 먹고 가요（吃了再走）。-(으)러 是目的，-고 是先后顺序，两者不能混用。</div>`,
    
    compareLabel: '-(으)러 가요 vs -고 가요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第9课</span>
  <div class="ov-title">-(으)러 가요 · -을/ㄹ까요?</div>
  <div class="ov-sub">目的 + 提议，去做某事或邀约</div>
  <div class="ov-sec">
    <h3>-(으)러 가다/오다</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">러</b>：공부하러 가요 · 보러 가요<br>
      받침 있는 → <b style="color:#2db89b">으러</b>：먹으러 가요 · 읽으러 가요
    </div>
  </div>
  <div class="ov-sec">
    <h3>-을/ㄹ까요?</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#6b7ff0">ㄹ까요</b>：갈까요? · 볼까요?<br>
      받침 있는 → <b style="color:#6b7ff0">을까요</b>：먹을까요? · 읽을까요?
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹러 가요</span> → <span style="color:#ff7fa8">먹으러 가요</span>（받침 있는 加 으）<br>
      먹으러 가요（去吃）≠ 먹<span style="color:#2db89b">고</span> 가요（吃了再走）
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l10',
    partNumber: 3,
    lessonNumber: 9,
    title: '-은/ㄴ 후에, -기 전에',
    whatItDoes: '说"做完之后"和"做之前"',
    whatItDoesBody: '-은/ㄴ 후에 表达"做完……之后"；\n-기 전에 表达"做……之前"。\n两者合用可以清晰表达时间顺序，适合写学习计划、日程和日记。\n注意：\n-기 전에 不管有没有收音都直接加 기，比 -은/ㄴ 후에 更简单。\n中文"之后/之前"直接放动词后面，韩语需要正确的词尾变形，尤其 -은/ㄴ 후에 的收音判断是中文没有的难点。',
    structureNote: '两个时间表达结构不同：\n-은/ㄴ 후에 接在动词变形后（要看收音），-기 전에 直接接词干+기，不需要考虑收音。\n先记住这个差异，变形就不会混乱。',
    rulesNote: '후에 接续：\n有收音→은 후에（먹은 후에），无收音→ㄴ 후에（본 후에）。\n전에 接续：\n一律 -기 전에，不看收音。\n易错：\n먹은 전에 ✗，必须说 먹기 전에。',
    scenarioNote: '日记、学习计划、日常习惯"吃饭后学习""睡觉前复习""听歌前看歌词"，这类时间顺序表达每天都用得到。\n掌握这节课，你的韩语日记能立刻写得更自然。',
    structures: [
      {
        ko: '밥을 먹은 후에 공부해요',
        zh: '吃饭后学习。',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹은 후에', role: 'time' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '자기 전에 복습해요',
        zh: '睡觉前复习。',
        tokens: [
          { text: '자기 전에', role: 'time' },
          { text: '복습해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音动词 + -은 후에', examples: '먹다→먹은 후에, 읽다→읽은 후에' },
      { type: 'rule', text: '无收音动词 + -ㄴ 후에', examples: '보다→본 후에, 공부하다→공부한 후에' },
      { type: 'rule', text: '动词词干 + -기 전에（不看收音）', examples: '먹다→먹기 전에, 보다→보기 전에, 자다→자기 전에' },
      { type: 'usage', text: '名词 + 후에/다음에', examples: '수업 후에, 점심 다음에；动词 + -ㄴ/은 다음에：수업이 끝난 다음에' },
      { type: 'example', text: '자기 전에 우유 한 잔을 마셔요 / 공부하기 전에 커피를 마셔요' },
      { type: 'note', text: '-기 전에 前不能用 -은/ㄴ 形式', examples: '먹은 전에 ✗ → 먹기 전에 ✓' },
      { type: 'compare', text: '-은/ㄴ 후에 vs -기 전에 接续区别', examples: '먹은 후에（之后，看收音）/ 먹기 전에（之前，不看收音，直接加 기）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '드라마를', role: 'object' },
          { text: '본 후에', role: 'time' },
          { text: '자요', role: 'verb' },
        ],
        zh: '看完电视剧后睡觉。',
        swapWords: ['공부한 후에 자요', '먹은 후에 공부해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣기 전에', role: 'time' },
          { text: '가사를 봐요', role: 'verb' },
        ],
        zh: '听歌前看歌词。',
        swapWords: ['자기 전에 복습해요', '먹기 전에 손을 씻어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업', role: 'object' },
          { text: '후에', role: 'time' },
          { text: '카페에 가요', role: 'verb' },
        ],
        zh: '课后去咖啡店。',
        swapWords: ['수업 다음에 공부해요', '점심 후에 산책해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '손을', role: 'object' },
          { text: '씻은 후에', role: 'time' },
          { text: '밥을 먹어요', role: 'verb' },
        ],
        zh: '洗手后吃饭。',
        swapWords: ['공부한 후에 쉬어요', '먹은 후에 산책해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习计划', ko: '수업 후에 복습해요.', zh: '课后复习。' },
      { icon: '🥛', context: '睡前习惯', ko: '자기 전에 우유 한 잔을 마셔요.', zh: '睡前喝一杯牛奶。' },
      { icon: '🎵', context: 'KPOP 学习', ko: '노래를 듣기 전에 가사를 봐요.', zh: '听歌前看歌词。' },
      { icon: '🍱', context: '日程顺序', ko: '수업이 끝난 다음에 같이 밥을 먹어요.', zh: '课结束后一起吃饭。' },
      { icon: '🛁', context: '日常习惯', ko: '샤워한 후에 보통 드라마를 봐요.', zh: '洗完澡后通常看电视剧。' },
      { icon: '🍱', context: '吃饭前后', ko: '밥을 먹기 전에 손을 씻어요.', zh: '吃饭前洗手。' },
    ],
    mistakes: [
      { wrong: '먹은 전에（후에 和 전에 接续混用）', correct: '먹기 전에', note: '전에 前用 -기 名词化，不用 -은/ㄴ。먹은 후에（之后）/ 먹기 전에（之前）。' },
      { wrong: '보은 후에（无收音接错）', correct: '본 후에', note: '보다 无收音，接 -ㄴ 후에 → 본 후에，不是 보은 후에。' },
      { wrong: '前后时间顺序写反', correct: '먹은 후에 공부해요（先吃，后学）', note: '-은/ㄴ 후에 前面的动作先发生，后面的动作后发生，不要写反。' },
      { wrong: '자은 후에', correct: '잔 후에', note: '자다 无收音 → ㄴ 후에 → 잔 후에。无收音动词接 -ㄴ 후에。' },
    ],
        compareHtml: `<div class="card-title">"做完……之后"vs"做……之前"</div>
<div class="card-body">-은/ㄴ 후에 表达"做完……之后"；-기 전에 表达"做……之前"。两者合用可以清晰表达时间顺序，适合写学习计划、日程和日记。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-은/ㄴ 후에（……之后）</div><div style="font-size:14px;color:#89756e;margin-top:2px">做完A之后做B</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹은 후에 커피 마셔요.</span><span style="font-size:14px;color:#5a4640">吃完饭之后喝咖啡。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">수업 끝난 후에 갈게요.</span><span style="font-size:14px;color:#5a4640">下课后去。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-기 전에（……之前）</div><div style="font-size:14px;color:#89756e;margin-top:2px">在做A之前先做B</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">자기 전에 일기 써요.</span><span style="font-size:14px;color:#5a4640">睡觉前写日记。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가기 전에 전화해 주세요.</span><span style="font-size:14px;color:#5a4640">去之前请打电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">接续规则对比</div><div style="font-size:15px;color:#5a4640">-은/ㄴ 후에 需要判断词干有无收音（먹다→먹은 후에，가다→간 후에），-기 전에 则固定加 기，不管什么动词都用同一形式。前者麻烦但表达更精确，后者简单但使用范围更广。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">中文"之后/之前"直接放动词后面，韩语需要正确的词尾变形——尤其是 -은/ㄴ 후에 的收音判断。</div></div>
<div class="reminder-box">-기 전에 没有变形烦恼：不管什么动词，都加 기 就行。<br>-은/ㄴ 후에 需判断收音：먹다→먹<span style="color:#ff7fa8">은</span> 후에，가다→가<span style="color:#2db89b">ㄴ</span> 후에。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-은/ㄴ 후에 · -기 전에</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">表达时间顺序：做完之后，以及做之前。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">밥을 먹은 후에 공부해요.</div>
    <div class="zh">吃饭后学习。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">자기 전에 단어를 외워요.</div>
    <div class="zh">睡前背单词。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">노래를 듣기 전에 가사를 봐요.</div>
    <div class="zh">听歌前看歌词。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">有收音</span>
      <span style="font-weight:800;color:#ff7fa8">+ -은 후에</span>
      <span style="font-size:12px;color:#89756e">먹다→먹은 후에</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">无收音</span>
      <span style="font-weight:800;color:#2db89b">+ -ㄴ 후에</span>
      <span style="font-size:12px;color:#89756e">보다→본 후에，자다→잔 후에</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:13px">不看收音</span>
      <span style="font-weight:800;color:#6b7ff0">+ -기 전에</span>
      <span style="font-size:12px;color:#89756e">먹기 전에，자기 전에</span>
    </div>
  </div>
</div>
<div class="reminder-box">-기 전에 不管有没有收音，都直接接词干+기，比 -은/ㄴ 후에 简单得多，不会出错。</div>`,
    
    compareLabel: '-은/ㄴ 후에 vs -기 전에',
    quickTable: {
      title: '후에 / 전에 변형 速记',
      headers: ['原形', '-은/ㄴ 후에', '-기 전에'],
      rows: [
        ['먹다 吃', '먹은 후에', '먹기 전에'],
        ['보다 看', '본 후에', '보기 전에'],
        ['자다 睡', '잔 후에', '자기 전에'],
        ['공부하다 学习', '공부한 후에', '공부하기 전에'],
        ['듣다 听', '들은 후에', '듣기 전에'],
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第10课</span>
  <div class="ov-title">-은/ㄴ 후에 · -기 전에</div>
  <div class="ov-sub">之后用 -은/ㄴ 후에，之前用 -기 전에</div>
  <div class="ov-sec">
    <h3>变化规则</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      받침 있는 → <b style="color:#ff7fa8">은 후에</b>：먹은 후에 · 읽은 후에<br>
      받침 없는 → <b style="color:#2db89b">ㄴ 후에</b>：본 후에 · 공부한 후에<br>
      全部 → <b style="color:#6b7ff0">기 전에</b>：먹기 전에 · 자기 전에
    </div>
  </div>
  <div class="ov-sec">
    <h3>常用表达</h3>
    <div style="font-size:13px;color:#241917;line-height:2">
      수업 <b style="color:#ff7fa8">후에</b> 복습해요（课后复习）<br>
      자<b style="color:#6b7ff0">기 전에</b> 단어를 외워요（睡前背单词）<br>
      노래를 듣<b style="color:#6b7ff0">기 전에</b> 가사를 봐요
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:12px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹은 전에</span> → <span style="color:#6b7ff0">먹기 전에</span><br>
      <span style="color:#e05555;text-decoration:line-through">보은 후에</span> → <span style="color:#ff7fa8">본 후에</span>（받침 없는 用 ㄴ）
    </div>
  </div>
</div>`,
  },

  {
    id: 'card-p4-l01',
    partNumber: 4,
    lessonNumber: 1,
    title: '-고, -아/어/여서',
    whatItDoes: '连接两个动作，说原因和顺序',
    whatItDoesBody: '-고 把两个动作并列或按顺序连起来；\n-아/어/여서 表示原因、理由，或前后动作自然衔接。\n这节课是"复句"的起点学会这两个连接形式，就能把单句扩展成连贯的表达。\n中文"吃饭和喝水"直接用"和"连接，韩语用 -고 嵌入动词词干；\n中文"因为……所以"是独立词，韩语的 -아/어서 直接附在动词后，没有独立的"因为"词。',
    structureNote: '两个连接形式功能不同：\n-고 是中性连接（做A然后做B），-아/어/여서 是因果连接（因为A所以B）。\n结构上都是接在前一个动词词干后，后句正常说。',
    rulesNote: '-고 接续最简单直接去掉 다 加 고，大多数不规则在 -고 前不触发。\n-아/어/여서 变形和 -아요/어요 一样：\n词干末元音 ㅏ/ㅗ→아서，其他→어서，하다→해서。\n注意：\n-아/어/여서 原因句后面不适合接命令句。',
    scenarioNote: '这两个连接形式是韩语表达的骨架"喝完咖啡再学""因为发音快所以难""因为头疼所以休息"，几乎每句复句都用得到。\n掌握这节课，你的韩语表达会从"断句"变成"连贯句"。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 · -아/어/여서</h1>
<p style="font-size:.9rem;color:#89756e;margin-bottom:16px;line-height:1.6">把两个动作连起来——顺序连接或原因连接。</p>
<div class="block">
  <div style="font-size:13px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">노래를 듣고 가사를 봐요.</div>
    <div class="zh">听歌，然后看歌词。（顺序连接）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:1.05rem">머리가 아파서 쉬어요.</div>
    <div class="zh">因为头疼，所以休息。（原因连接）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:1.05rem">발음이 빨라서 어려워요.</div>
    <div class="zh">因为发音快，所以难。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:1.05rem">-고</span>
      <span style="font-size:13px;color:#241917">并列/顺序（中性连接，做A然后做B）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#6b7ff0;font-size:1.05rem">-아/어/여서</span>
      <span style="font-size:13px;color:#241917">原因/先后（因为A所以B，主语须一致）</span>
    </div>
  </div>
</div>
<div class="reminder-box">하다 + 아/어/여서 → 해서（不是 하서）。ㅡ 脱落：아프다 → 아파서。ㅂ 不规则：어렵다 → 어려워서。</div>`,
    compareHtml: `<div class="card-title">-고 vs -아/어/여서</div>
<div class="card-body">两者都能连接两个动作，但连接关系不同：-고 是中性顺序，-아/어/여서 是原因或自然先后。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v" style="background:#fff0f5;color:#ff7fa8">-고（顺序/并列）</div><div style="font-size:14px;color:#89756e;margin-top:2px">中性连接，前后无因果关系</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노래를 듣고 가사를 봐요.</span><span style="font-size:14px;color:#5a4640">听歌，然后看歌词。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v" style="background:#f0f0ff;color:#6b7ff0">-아/어/여서（原因）</div><div style="font-size:14px;color:#89756e;margin-top:2px">前句是原因，后句是结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">머리가 아파서 쉬어요.</span><span style="font-size:14px;color:#5a4640">因为头疼，所以休息。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">-고 vs -아/어/여서 핵심 차이</div><div style="font-size:15px;color:#5a4640">-고（顺序/并列）：前后动作可以交换顺序，结果不变——학교에 가고 공부해요。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-아/어/여서（原因）：前句是后句的原因，顺序固定——배가 고파서 밥을 먹어요（因为饿所以吃饭）。</div></div>
<div class="reminder-box">노래를 듣어서 가사를 봐요 ✗ — 顺序并列用 -고，不用 -아/어/여서。两者不能混用。</div>`,
    compareLabel: '-고 vs -아/어/여서',
    structures: [
      {
        ko: '동사/형용사 어간 + -고',
        zh: '动词/形容词词干 + -고',
        tokens: [
          { text: '동사/형용사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-고', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 + -아/어/여서',
        zh: '动词/形容词 + -아/어/여서',
        tokens: [
          { text: '동사/형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여서', role: 'plain' },
        ],
      },
      {
        ko: '커피를 마시고 공부해요.',
        zh: '喝咖啡，然后学习。',
        tokens: [
          { text: '커피를', role: 'object' },
          { text: '마시고', role: 'verb' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '머리가 아파서 쉬어요.',
        zh: '因为头疼，所以休息。',
        tokens: [
          { text: '머리가', role: 'subject' },
          { text: '아파서', role: 'verb' },
          { text: '쉬어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-고：去掉词典形的 다，直接加 고', examples: '듣다→듣고 / 걷다→걷고 / 쓰다→쓰고（接 -고 时多数不规则不触发变化）' },
      { type: 'rule', text: '名词 + -고：名词+(이)고', examples: '有收音→이고：학생이고 / 无收音→고：가수고（两者并列）' },
      { type: 'rule', text: '-아/어/여서 原因：词干末元音 ㅏ/ㅗ→아서；其他→어서；하다→해서', examples: '名词有收音→이라서；无收音→라서' },
      { type: 'usage', text: '-아/어/여서 先后动作：表示前后两个动作紧密连接，两个动作的主语必须一致', examples: '相当于"……然后……"连动结构' },
      { type: 'note', text: '하다 变形：하다→해서', examples: '不是 하서 或 공부하서' },
      { type: 'note', text: 'ㅡ 脱落', examples: '아프다→아파서 / 예쁘다→예뻐서' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려워서 / 가볍다→가벼워서' },
      { type: 'note', text: '原因句注意：用 -아/어/여서 表原因时，后句不接命令式更自然' },
      { type: 'usage', text: '小贴士：可以拆分为两句话用 그래서 连接', examples: '감기에 걸렸어요. 그래서 학교에 안 가요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '외우고', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
        zh: '背单词，然后读句子。',
        swapWords: ['단어를 외우고', '노래를 듣고', '커피를 마시고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '머리가', role: 'subject' },
          { text: '아파서', role: 'verb' },
          { text: '쉬어요', role: 'verb' },
        ],
        zh: '因为头疼，所以休息。',
        swapRole: 'subject',
          swapWords: ['머리가 아파서', '시간이 없어서', '발음이 빨라서'],
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '听歌，然后看歌词。',
        swapWords: ['노래를 듣고', '영상을 보고', '단어를 외우고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '因为发音快，所以难。',
        swapRole: 'subject',
          swapWords: ['발음이 빨라서', '단어가 많아서', '문법이 어려워서'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习流程', ko: '단어를 외우고 문장을 읽어요.', zh: '背单词，然后读句子。' },
      { icon: '🎵', context: 'KPOP 跟读', ko: '노래를 듣고 따라 해요.', zh: '听歌，然后跟读。' },
      { icon: '🤒', context: '身体状态', ko: '배가 아파서 병원에 가요.', zh: '因为肚子疼，去医院。' },
      { icon: '⏰', context: '无法赴约', ko: '시간이 없어서 못 가요.', zh: '因为没时间，所以不能去。' },
      { icon: '🎤', context: '跟唱困难', ko: '발음이 빨라서 따라 하기 어려워요.', zh: '因为发音快，跟读很难。' },
      { icon: '☕', context: '日常顺序', ko: '커피를 마시고 공부해요.', zh: '喝咖啡，然后学习。' },
    ],
    mistakes: [
      { wrong: '공부하서 피곤해요.', correct: '공부해서 피곤해요.', note: '하다 + 아/어/여서 → 해서，不是 하서' },
      { wrong: '아프어서 쉬어요.', correct: '아파서 쉬어요.', note: 'ㅡ 脱落规则：아프다 → 아파서' },
      { wrong: '발음이 빨라서 연습하세요.', correct: '발음이 빨라서 연습해요.', note: '原因句后接命令式不自然，初级用陈述句' },
      { wrong: '노래를 듣어서 가사를 봐요.', correct: '노래를 듣고 가사를 봐요.', note: '并列顺序用 -고，不用 -아/어/여서' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-고', '-아/어/여서'],
      rows: [
        ['가다 去', '가고', '가서'],
        ['먹다 吃', '먹고', '먹어서'],
        ['하다 做', '하고', '해서'],
        ['아프다 疼/难受', '아프고', '아파서'],
        ['어렵다 难', '어렵고', '어려워서'],
        ['듣다 听', '듣고', '들어서'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-고 · -아/어/여서 完成！</div>
  <div class='ov-sub'>连接词让句子流畅起来</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-고</span> 并列顺序：먹고 공부해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-아/어/여서</span> 原因先后：아파서 쉬어요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다 变形</span> 하다 → 해서（不是 하서）</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㅡ 脱落</span> 아프다 → 아파서</div>
</div>`,
    linkedGrammarIds: ['gp-25'],
  },
  {
    id: 'card-p4-l02',
    partNumber: 4,
    lessonNumber: 3,
    title: '-아/어/여야 하다/되다, -지 말다',
    whatItDoes: '说必须做，或请别人别做',
    whatItDoesBody: '-아/어/여야 해요 / 돼요 表达"必须、应该、得……"；\n-지 마세요 表达"请不要……"。\n-아/어/여야 해요 对应中文"得……/必须……"，-지 마세요 对应"请不要……"，两者都是日常非常高频的表达。',
    structureNote: '两块内容：①必须做（-아/어/여야 해요/돼요）变形和 -아요/어요 一样，再加 야 해요/돼요；\n②请不要（-지 마세요）直接接词干加 지 마세요，不需要考虑收音。',
    rulesNote: '变形重点：\n하다 动词→해야 해요（공부해야 해요），不是 하야 해요。\nㄷ 不规则在 -아/어야 前触发（듣다→들어야 해요）。\n돼요 和 해요 意思相同，돼요 更口语化。\n-지 마세요 比 -지 않아요 多一层指令语气，不能混用。',
    scenarioNote: '必须做的事（复习、练习、准时到）和请求别人不要做（别担心、别忘了）这两种表达在学习打卡、日常沟通、服务场合都随处可见。\n学完这节课，你能发出请求也能表达义务。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-아/어/여야 해요 · -지 마세요</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">表达"必须做"和"请不要做"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 단어를 복습해야 해요.</span> — 今天必须复习单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">아프면 쉬어야 돼요.</span> — 如果不舒服，就应该休息。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">녹음 중에는 나가지 마세요.</span> — 录音中请不要退出。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个核心结构</div>
  <div style="margin-bottom:6px">① <b>-아/어/여야 해요</b> — 必须做（义务）<br><span style="color:#89756e;font-size:.9rem">变形和 -아요/어요 一样，再加 야 해요/돼요</span></div>
  <div>② <b>-지 마세요</b> — 请不要做（指令）<br><span style="color:#89756e;font-size:.9rem">直接接词干 + 지 마세요，不需要考虑收音</span></div>
</div>
<div class="reminder-box">하다→해야 해요（不是 하야 해요）；ㄷ 不规则：듣다→들어야 해요；-지 마세요 直接接词干：가지 마세요 / 먹지 마세요。</div>`,
    compareHtml: `<div class="card-title">-아/어/여야 해요 vs -지 마세요</div>
<div class="card-body">两者都是对行为的态度表达，但方向相反：-아/어/여야 해요 是必须做（义务），-지 마세요 是请不要做（禁止/请求）。本课核心是掌握这两个语法的变形规则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-아/어/여야 해요</div><div style="font-size:14px;color:#89756e;margin-top:2px">必须做（义务/要求）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부해야 해요.</span><span style="font-size:14px;color:#5a4640">必须学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹어야 해요.</span><span style="font-size:14px;color:#5a4640">必须吃。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-지 마세요</div><div style="font-size:14px;color:#89756e;margin-top:2px">请不要做（禁止/请求）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">걱정하지 마세요.</span><span style="font-size:14px;color:#5a4640">请不要担心。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">늦지 마세요.</span><span style="font-size:14px;color:#5a4640">请不要迟到。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">变形规则</div><div style="font-size:15px;color:#5a4640">-아/어/여야 해요：词干末元音 ㅏ/ㅗ→아야 해요；其他→어야 해요；하다→해야 해요。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-지 마세요：直接接词干，去掉 다 加 지 마세요，无需考虑收音。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-아/어/여야 되다 和 -아/어/여야 하다 意思相同，都表示必须。</div><div style="margin-top:4px;font-size:15px;color:#e05555">注意 ㄷ 不规则：듣다→들어야 해요（不是 듣어야 해요）。</div></div>
<div class="reminder-box">공부해야 해요（必须学）vs 공부하지 마세요（请别学）— 义务和禁止方向相反，不能混用。하다 变形：하다→해야 해요（不是 하야 해요）。</div>`,
    compareLabel: '-아/어/여야 해요 vs -지 마세요',
    structures: [
      {
        ko: '동사 + -아/어/여야 해요',
        zh: '动词 + -아/어/여야 해요 = 必须……',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여야 해요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 + -지 마세요',
        zh: '动词词干 + -지 마세요 = 请不要……',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지 마세요', role: 'plain' },
        ],
      },
      {
        ko: '오늘 단어를 복습해야 해요.',
        zh: '今天必须复习单词。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습해야 해요', role: 'verb' },
        ],
      },
      {
        ko: '녹음 중에는 나가지 마세요.',
        zh: '录音中请不要退出。',
        tokens: [
          { text: '녹음 중에는', role: 'time' },
          { text: '나가지 마세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여야 해요 变形规则：词干末音节元音是 ㅏ/ㅗ→아야 해요；其他→어야 해요；하다 结尾→해야 해요' },
      { type: 'note', text: '하다 动词：하다→해야 해요', examples: '공부하다→공부해야 해요，不是 공부하야 해요' },
      { type: 'note', text: 'ㄷ 不规则', examples: '듣다→들어야 해요 / 걷다→걸어야 해요' },
      { type: 'compare', text: '-아/어/여야 돼요：与 해야 해요 意思相同，更口语', examples: '복습해야 돼요 / 기다려야 돼요' },
      { type: 'vocab', text: '-지 말다 完整级别', examples: '-지 마세요（请不要）/ -지 마십시오（正式）/ -지 맙시다（共同，不要吧）/ -지 말고+句子（不要……而是）/ -지 말아요（不要）' },
      { type: 'rule', text: '-지 마세요：直接接词干', examples: '가지 마세요 / 먹지 마세요 / 걱정하지 마세요' },
      { type: 'compare', text: '注意区分：-지 않아요（不做，陈述）vs -지 마세요（请不要做，指令）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습해야 해요', role: 'verb' },
        ],
        zh: '今天必须复习单词。',
        swapWords: ['복습해야 해요', '들어야 해요', '연습해야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '먼저', role: 'time' },
          { text: '원곡을', role: 'object' },
          { text: '들어야 해요', role: 'verb' },
        ],
        zh: '首先要听原唱。',
        swapWords: ['들어야 해요', '봐야 해요', '외워야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '걱정하지 마세요', role: 'verb' },
        ],
        zh: '请不要担心。',
        swapWords: ['걱정하지 마세요', '나가지 마세요', '늦지 마세요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아프면', role: 'plain' },
          { text: '쉬어야 해요', role: 'verb' },
        ],
        zh: '如果不舒服，就应该休息。',
        swapWords: ['쉬어야 해요', '병원에 가야 해요', '약을 먹어야 해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习任务', ko: '오늘 단어를 복습해야 해요.', zh: '今天必须复习单词。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '먼저 원곡을 들어야 해요.', zh: '首先要听原唱。' },
      { icon: '🤒', context: '健康提醒', ko: '아프면 쉬어야 해요.', zh: '如果不舒服，就应该休息。' },
      { icon: '📱', context: 'App 提示', ko: '녹음 중에는 나가지 마세요.', zh: '录音中请不要退出。' },
      { icon: '⏰', context: '日程提醒', ko: '내일까지 제출해야 돼요.', zh: '明天之前必须提交。' },
      { icon: '🙏', context: '礼貌请求', ko: '여기서 사진을 찍지 마세요.', zh: '请不要在这里拍照。' },
    ],
    mistakes: [
      { wrong: '공부하야 해요.', correct: '공부해야 해요.', note: '하다 变形：하다 → 해야，不是 하야' },
      { wrong: '가요지 마세요.', correct: '가지 마세요.', note: '-지 마세요 直接接词干，不加 요 体' },
      { wrong: '먹지 않아요 (想表达请不要吃).', correct: '먹지 마세요.', note: '-지 않아요 是陈述"不吃"，-지 마세요 才是"请不要吃"' },
      { wrong: '들야 해요.', correct: '들어야 해요.', note: 'ㄷ 不规则：듣다 → 들어야 해요' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-아/어/여야 해요', '-지 마세요'],
      rows: [
        ['가다 去', '가야 해요 必须去', '가지 마세요 请不要去'],
        ['먹다 吃', '먹어야 해요 必须吃', '먹지 마세요 请不要吃'],
        ['하다 做', '해야 해요 必须做', '하지 마세요 请不要做'],
        ['듣다 听', '들어야 해요 必须听', '듣지 마세요 请不要听'],
        ['복습하다 复习', '복습해야 해요 必须复习', '복습하지 마세요 请不要复习'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-야 해요 · -지 마세요 完成！</div>
  <div class='ov-sub'>说必须做，也说请不要做</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-아/어/여야 해요</span> 必须：복습해야 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-아/어/여야 돼요</span> 口语：복습해야 돼요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>-지 마세요</span> 请不要：걱정하지 마세요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다 变形</span> 하다 → 해야（不是 하야）</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l03',
    partNumber: 4,
    lessonNumber: 4,
    title: '걸리다, -는 데(에) + 돈 + 들다',
    whatItDoes: '说花了多长时间、多少钱',
    whatItDoesBody: '걸려요 表示花费时间；\n-는 데 돈이 들어요 表示做某事花钱。\n和中文"花了三十分钟""很花钱"对应韩语要用专门的动词 걸리다（时间）和 들다（金钱），不能混用。',
    structureNote: '两块内容：①걸려요（花时间）时间词做主语，结构是"时间 + 걸려요"；\n②돈이 들어요（花钱）配合 -는 데 说"做某事花钱"。\n两者主语不同，걸려요 主语是时间，들어요 主语是 돈。',
    rulesNote: '걸리다 只用于时间，不能说花钱（花钱用 돈이 들어요）。\n-는 데 是动词的现在时修饰形 + 데，表示"做……这件事"。\n时间读法：\n分钟用汉字数词（삼십 분），小时用固有数词（두 시간）。',
    scenarioNote: '"从家到学校要多久""去演唱会很花钱"这类描述日常花费的表达，出行、购物、计划时都需要。\n掌握这节课，你能准确描述时间和金钱成本。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">걸리다 · -는 데 들다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说花多少时间，或做某事要花多少钱。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">집에서 학교까지 삼십 분 걸려요.</span> — 从家到学校花三十分钟。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">콘서트에 가는 데 돈이 많이 들어요.</span> — 去演唱会很花钱。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">한국어를 배우는 데 시간이 걸려요.</span> — 学韩语很花时间。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个核心结构</div>
  <div style="margin-bottom:6px">① <b>时间 + 걸려요</b> — 花……时间<br><span style="color:#89756e;font-size:.9rem">主语是时间量，不是人</span></div>
  <div>② <b>动词 + -는 데 + 돈이 들어요</b> — 做某事花钱<br><span style="color:#89756e;font-size:.9rem">-는 데 = 做……这件事</span></div>
</div>
<div class="reminder-box">걸리다 只用于时间；花钱说 돈이 들어요，不能说 돈이 걸려요。分钟用汉字数词（삼십 분），小时用固有数词（두 시간）。</div>`,
    compareHtml: `<div class="card-title">걸려요（时间）vs 들어요（金钱）</div>
<div class="card-body">两个词都表示"花费"，但主语不同：걸려요 的主语是时间量，들어요 的主语通常是 돈（钱）。混用会造成语义错误。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">걸려요</div><div style="font-size:14px;color:#89756e;margin-top:2px">花时间（时间做主语）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한 시간이 걸려요.</span><span style="font-size:14px;color:#5a4640">花一个小时。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울까지 두 시간이 걸려요.</span><span style="font-size:14px;color:#5a4640">到首尔要花两个小时。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">돈이 들어요</div><div style="font-size:14px;color:#89756e;margin-top:2px">花钱（돈 做主语）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">돈이 많이 들어요.</span><span style="font-size:14px;color:#5a4640">很花钱。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">콘서트 티켓에 돈이 많이 들어요.</span><span style="font-size:14px;color:#5a4640">演唱会票很花钱。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">구조 비교</div><div style="font-size:15px;color:#5a4640">걸려요：시간 표현 + 이/가 걸려요（时间表达做主语）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">들어요：돈이 들어요 / 비용이 들어요（돈/비용 做主语）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-는 데（에）걸려요/들어요：이 노래를 외우는 데 시간이 걸려요。</div></div>
<div class="reminder-box">콘서트에 가는 데 걸려요 ✗ — 去演唱会是花钱，要用 돈이 들어요，不用 걸려요。时间问句：얼마나 걸려요?（花多长时间？）/ 돈이 얼마나 들어요?（花多少钱？）</div>`,
    compareLabel: '걸려요（时间）vs 들어요（金钱）',
    structures: [
      {
        ko: '시간 + 걸려요',
        zh: '时间 + 걸려요 = 花……时间',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
      {
        ko: '장소에서 장소까지 + 시간 + 걸려요',
        zh: '从……到…… + 时间 + 걸려요',
        tokens: [
          { text: '장소에서', role: 'place' },
          { text: '장소까지', role: 'place' },
          { text: '시간', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
      {
        ko: '동사 + -는 데(에) + 돈이 들어요',
        zh: '动词 + -는 데 + 돈이 들어요 = 做……花钱',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '-는 데', role: 'plain' },
          { text: '돈이 들어요', role: 'verb' },
        ],
      },
      {
        ko: '집에서 학교까지 삼십 분 걸려요.',
        zh: '从家到学校花三十分钟。',
        tokens: [
          { text: '집에서', role: 'place' },
          { text: '학교까지', role: 'place' },
          { text: '삼십 분', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '걸리다：主语是时间量', examples: '삼십 분 걸려요 / 두 시간 걸려요 / 일주일 걸려요' },
      { type: 'usage', text: '에서…까지：表示从某处到某处', examples: '집에서 학교까지 삼십 분 걸려요 / 베이징에서 한국까지 비행기로 두 시간 걸려요' },
      { type: 'rule', text: '동사 + -는 데：动词现在修饰形 + 데', examples: '가다→가는 데 / 배우다→배우는 데 / 공부하다→공부하는 데' },
      { type: 'rule', text: '돈이 들다：花钱说法', examples: '돈이 들어요 / 돈이 많이 들어요 / 돈이 안 들어요' },
      { type: 'note', text: '数字规则：分钟用汉字数词（삼십 분）；小时用固有数词（두 시간）' },
      { type: 'note', text: '걸리다 只用于时间，花钱要用 돈이 들어요' },
      { type: 'example', text: '교재 예문：이 책을 읽는 데 시간이 얼마나 걸렸어요?（하루 걸렸어요）/ 이 책을 쓰는 데 얼마나 걸렸어요?（꼬박 일년 걸렸어요）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '집에서', role: 'place' },
          { text: '학교까지', role: 'place' },
          { text: '삼십 분', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
        zh: '从家到学校花三十分钟。',
        swapWords: ['삼십 분', '십 분', '한 시간'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '콘서트에', role: 'place' },
          { text: '가는 데', role: 'verb' },
          { text: '돈이', role: 'subject' },
          { text: '많이', role: 'plain' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '去演唱会很花钱。',
        swapWords: ['돈이 많이 들어요', '돈이 안 들어요', '시간이 많이 걸려요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 데', role: 'verb' },
          { text: '시간이 많이', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
        zh: '学韩语很花时间。',
        swapWords: ['시간이 많이 걸려요', '돈이 많이 들어요', '노력이 필요해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문장을', role: 'object' },
          { text: '이해하는 데', role: 'verb' },
          { text: '십 분', role: 'time' },
          { text: '걸렸어요', role: 'verb' },
        ],
        zh: '理解这个句子花了十分钟。',
        swapWords: ['십 분 걸렸어요', '오 분 걸렸어요', '한 시간 걸렸어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌', context: '通勤时间', ko: '집에서 학교까지 삼십 분 걸려요.', zh: '从家到学校花三十分钟。' },
      { icon: '📚', context: '学习时间', ko: '한국어를 배우는 데 시간이 많이 걸려요.', zh: '学韩语很花时间。' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '콘서트에 가는 데 돈이 많이 들어요.', zh: '去演唱会很花钱。' },
      { icon: '✈️', context: '旅行成本', ko: '한국에 가는 데 얼마나 들어요?', zh: '去韩国要花多少钱？' },
      { icon: '🧠', context: '理解难句', ko: '이 문장을 이해하는 데 십 분 걸렸어요.', zh: '理解这个句子花了十分钟。' },
      { icon: '💰', context: '免费学习', ko: '한국어를 배우는 데 돈이 안 들어요.', zh: '学韩语不花钱。' },
    ],
    mistakes: [
      { wrong: '콘서트에 가는 데 걸려요. (想说花钱)', correct: '콘서트에 가는 데 돈이 들어요.', note: '걸려요 只表示花时间，花钱要用 돈이 들어요' },
      { wrong: '한국어를 배우다 데 시간이 걸려요.', correct: '한국어를 배우는 데 시간이 걸려요.', note: '动词接 데 前要加 -는（现在修饰形）' },
      { wrong: '두 분 걸려요. (想说两分钟)', correct: '이 분 걸려요.', note: '分钟用汉字数词：이 분 / 삼십 분；小时用固有数词：두 시간' },
      { wrong: '학교에서 집에 삼십 분 걸려요.', correct: '학교에서 집까지 삼십 분 걸려요.', note: '终点用 까지，不用 에' },
    ],
    quickTable: {
      title: '시간 표현 속찰표',
      headers: ['说法', '例子', '中文'],
      rows: [
        ['N분 걸려요', '十分钟', '花十分钟'],
        ['N시간 걸려요', '两小时', '花两小时'],
        ['A에서 B까지 걸려요', '집에서 학교까지 삼십 분 걸려요', '从家到学校花30分钟'],
        ['-는 데 돈이 들어요', '가는 데 돈이 들어요', '去那里花钱'],
        ['-는 데 돈이 안 들어요', '배우는 데 돈이 안 들어요', '学习不花钱'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>걸려요 · 들어요 完成！</div>
  <div class='ov-sub'>说花多久，也说花多少钱</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>걸려요</span> 花时间：삼십 분 걸려요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-는 데 들어요</span> 花钱：가는 데 돈이 들어요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>에서…까지</span> 从…到…：집에서 학교까지</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>数字规则</span> 분=汉字数词 / 시간=固有数词</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l04',
    partNumber: 4,
    lessonNumber: 5,
    title: '-은/ㄴ/는데요',
    whatItDoes: '说话时加自然的铺垫语气',
    whatItDoesBody: '-은/ㄴ/는데요 是口语常用的铺垫表达，带有"是这样，不过……"的语气，用于转折、说明、引出后文。\n中文没有完全对应的表达它更像是一种语气词，让句子听起来更柔和、更自然，不那么直接。',
    structureNote: '变形规则按词性分三类：\n动词→-는데요，形容词→-은/ㄴ데요（按받침），名词→인데요。\n本阶段的难点不在变形，而在理解这个语气词"在做什么"它是铺垫，不是转折词。',
    rulesNote: '形容词的变形：\n有받침→은데요（좋은데요），无받침→ㄴ데요（예쁜데요）。\nㅂ 不规则在此触发：\n어렵다→어려운데요。\n있다/없다 用 -는데요（和动词一样）。\n过去时统一用 았/었는데요。',
    scenarioNote: '-는데요 是让韩语听起来"像韩国人说的"的关键语气词"我在学习呢""这首歌挺好，不过……""我是学生……"。\n学会这个，你的表达会更柔和自然，不再只有干巴巴的陈述句。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-은/ㄴ/는데요</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说话时加上自然的铺垫语气，让表达更柔和。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 노래는 좋은데요, 발음이 빨라요.</span> — 这首歌挺好，不过发音很快。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 학생인데요.</span> — 我是学生，是这样的……</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">지금 공부하고 있는데요.</span> — 我现在正在学习呢……</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">变形规则（按词性）</div>
  <div style="margin-bottom:6px">① 动词 → <b>-는데요</b>：가다→가는데요 / 먹다→먹는데요</div>
  <div style="margin-bottom:6px">② 形容词有收音 → <b>-은데요</b>：좋다→좋은데요</div>
  <div style="margin-bottom:6px">③ 形容词无收音 → <b>-ㄴ데요</b>：예쁘다→예쁜데요</div>
  <div>④ 名词 → <b>인데요</b>：학생→학생인데요</div>
</div>
<div class="reminder-box">-는데요 不只是"但是"——更多时候是铺垫语气，引出话题或委婉说明。ㅂ 不规则：어렵다→어려운데요。있다/없다 和动词一样用 -는데요。</div>`,
    compareHtml: `<div class="card-title">动词 -는데요 vs 形容词 -은/ㄴ데요</div>
<div class="card-body">动词和形容词的变形规则不同：动词统一用 -는데요，形容词按有无收音用 -은데요/-ㄴ데요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词 + -는데요</div><div style="font-size:14px;color:#89756e;margin-top:2px">动词现在时铺垫</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지금 공부하는데요.</span><span style="font-size:14px;color:#5a4640">我现在正在学习呢……</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">이 노래 아는데요.</span><span style="font-size:14px;color:#5a4640">这首歌我知道呢……</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">形容词 + -은/ㄴ데요</div><div style="font-size:14px;color:#89756e;margin-top:2px">按有无收音区分</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋은데요 / 예쁜데요</span><span style="font-size:14px;color:#5a4640">挺好的 / 挺漂亮的</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려운데요 / 바쁜데요</span><span style="font-size:14px;color:#5a4640">挺难的 / 挺忙的</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">变形规则总结</div><div style="font-size:15px;color:#5a4640">动词（현재）→ -는데요（统一，无需看收音）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">形容词 有收音 → -은데요：좋다→좋은데요 / 많다→많은데요</div><div style="margin-top:4px;font-size:15px;color:#5a4640">形容词 无收音 → -ㄴ데요：예쁘다→예쁜데요 / 크다→큰데요</div><div style="margin-top:4px;font-size:15px;color:#5a4640">名词 → -인데요：학생인데요 / 가수인데요</div></div>
<div class="reminder-box">좋는데요 ✗ → 좋은데요 ✓（形容词 좋다 有收音，用 -은데요，不是 -는데요）。있다/없다 例外：동사 규칙 따라 -는데요（있는데요 / 없는데요）。</div>`,
    compareLabel: '动词 -는데요 vs 形容词 -은/ㄴ데요',
    structures: [
      {
        ko: '형용사 (받침 O) + -은데요',
        zh: '形容词有收音 + -은데요',
        tokens: [
          { text: '형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-은데요', role: 'plain' },
        ],
      },
      {
        ko: '형용사 (받침 X) + -ㄴ데요',
        zh: '形容词无收音 + -ㄴ데요',
        tokens: [
          { text: '형용사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄴ데요', role: 'plain' },
        ],
      },
      {
        ko: '동사 + -는데요',
        zh: '动词 + -는데요',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는데요', role: 'plain' },
        ],
      },
      {
        ko: '명사 + 인데요',
        zh: '名词 + 인데요',
        tokens: [
          { text: '명사', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '인데요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在时统一用 -는데요', examples: '가다→가는데요 / 먹다→먹는데요 / 공부하다→공부하는데요' },
      { type: 'rule', text: '形容词有收音 + -은데요', examples: '좋다→좋은데요 / 작다→작은데요 / 많다→많은데요' },
      { type: 'rule', text: '形容词无收音 + -ㄴ데요', examples: '예쁘다→예쁜데요 / 바쁘다→바쁜데요 / 크다→큰데요' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려운데요（ㅂ→우+ㄴ데요）' },
      { type: 'note', text: '있다/없다 → -는데요', examples: '있는데요 / 없는데요（与动词相同）' },
      { type: 'rule', text: '名词用 인데요', examples: '학생인데요 / 가수인데요' },
      { type: 'rule', text: '过去时：동사/형용사 末音节元音是 ㅏ/ㅗ→았는데요；其他→었는데요；하다→했는데요', examples: '갔는데요 / 먹었는데요 / 했는데요' },
      { type: 'usage', text: '-는데요 不只是"但是"，更多时候是铺垫语气，常用于对话中做铺垫、引出话题、委婉说明' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '좋은데요,', role: 'verb' },
          { text: '발음이', role: 'subject' },
          { text: '빨라요', role: 'verb' },
        ],
        zh: '这首歌挺好，不过发音很快。',
        swapWords: ['좋은데요', '어려운데요', '재미있는데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '공부하고', role: 'verb' },
          { text: '있는데요', role: 'verb' },
        ],
        zh: '我现在正在学习呢……',
        swapWords: ['공부하고 있는데요', '기다리고 있는데요', '듣고 있는데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생인데요', role: 'verb' },
        ],
        zh: '我是学生，是这样的……',
        swapWords: ['학생인데요', '초보자인데요', '한국어 공부 중인데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문법은', role: 'subject' },
          { text: '어려운데요', role: 'verb' },
        ],
        zh: '这个语法有点难呢。',
        swapWords: ['어려운데요', '재미있는데요', '쉬운데요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🙏', context: '委婉拒绝', ko: '좋은데요, 오늘은 시간이 없어요.', zh: '挺好的，不过今天没时间。' },
      { icon: '📚', context: '学习反馈', ko: '이 문법은 어려운데요.', zh: '这个语法有点难呢。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래는 좋은데요, 발음이 빨라요.', zh: '这首歌挺好，不过发音很快。' },
      { icon: '👤', context: '自我说明', ko: '저는 학생인데요.', zh: '我是学生，是这样的……' },
      { icon: '📱', context: '正在进行', ko: '지금 공부하고 있는데요.', zh: '我现在正在学习呢……' },
      { icon: '💬', context: '引出后文', ko: '사실 한국어를 배우고 있는데요, 어렵지 않아요.', zh: '其实我在学韩语，不过不难。' },
    ],
    mistakes: [
      { wrong: '좋는데요.', correct: '좋은데요.', note: '形容词 좋다 有收音 ㅎ，接 -은데요，不是 -는데요' },
      { wrong: '학생는데요.', correct: '학생인데요.', note: '名词后要用 인데요，不是直接加 는데요' },
      { wrong: '어렵은데요.', correct: '어려운데요.', note: 'ㅂ 不规则：어렵다 → 어려운데요（ㅂ→우）' },
      { wrong: '只翻成"但是"', correct: '根据上下文判断铺垫/转折/说明', note: '-는데요 不等于"但是"，更多是铺垫语气，含义取决于上下文' },
    ],
    quickTable: {
      title: '接续规则表',
      headers: ['词性', '接续规则', '例子'],
      rows: [
        ['动词', '词干 + -는데요', '가다→가는데요'],
        ['形容词（有收音）', '词干 + -은데요', '좋다→좋은데요'],
        ['形容词（无收音）', '词干 + -ㄴ데요', '예쁘다→예쁜데요'],
        ['名词', '名词 + 인데요', '학생→학생인데요'],
        ['ㅂ 不规则', 'ㅂ→우 + ㄴ데요', '어렵다→어려운데요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-는데요 완성！</div>
  <div class='ov-sub'>让你的韩语更有铺垫感</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>동사</span> 가는데요 / 먹는데요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>형용사</span> 좋은데요 / 예쁜데요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>명사</span> 학생인데요</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>语气</span> 铺垫 / 转折 / 委婉说明</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l05',
    partNumber: 4,
    lessonNumber: 6,
    title: '체언 서술형, -는 것, -게',
    whatItDoes: '把动作变名词，把形容词变副词',
    whatItDoesBody: '名词+이다 做谓语；\n动词 + -는 것 把动作名词化；\n形容词 + -게 变成副词，表示方式。\n这节课是韩语表达的"变形工具"让动词能当主语用，让形容词能修饰动作。\n中文动词可以直接当主语（"学习很重要"），韩语必须用 -는 것 把动词名词化才能放在主语或宾语位置。',
    structureNote: '三块内容：①명사+이에요（是……，已学基础）；\n②-는 것（动作名词化，"学习这件事"）；\n③-게（形容词变副词，"简单地""快速地"）。\n重点是后两个它们让句子结构更灵活。',
    rulesNote: '-는 것 直接接动词词干，形容词名词化是 -ㄴ/은 것（后续课程）。\n-게 直接接形容词词干，但注意：\n빠르다、많다、높다 等有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。',
    scenarioNote: '"学韩语这件事很有意思""把句子写得简单一点""快速读歌词"-는 것 和 -게 在学习打卡、追星、日常表达里都高频出现。\n掌握这两个工具，你的句子能说得更精确。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-는 것 · -게</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">把动作变成"这件事"，把形容词变成副词。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 배우는 것은 재미있어요.</span> — 学韩语这件事很有意思。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">노래를 듣는 것이 좋아요.</span> — 听歌这件事很好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">문장을 쉽게 써요.</span> — 把句子写得简单一点。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个变形工具</div>
  <div style="margin-bottom:6px">① <b>名词 + 이에요/예요</b> — 是……（基础谓语）</div>
  <div style="margin-bottom:6px">② <b>动词词干 + -는 것</b> — 做某事这件事（名词化）</div>
  <div>③ <b>形容词词干 + -게</b> — ……地（副词化，表示方式）</div>
</div>
<div class="reminder-box">빠르다/많다/높다 有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。-는 것 只接动作动词，形容词名词化用 -ㄴ/은 것。</div>`,
    compareHtml: `<div class="card-title">-는 것（名词化）vs -게（副词化）</div>
<div class="card-body">两者都是"变形工具"，但方向不同：-는 것 把动作变成名词（可以做主语/宾语），-게 把形容词变成副词（修饰后面的动作）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词 + -는 것</div><div style="font-size:14px;color:#89756e;margin-top:2px">动作→名词（这件事）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">듣는 것이 좋아요.</span><span style="font-size:14px;color:#5a4640">听这件事很好。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어를 배우는 것은 재미있어요.</span><span style="font-size:14px;color:#5a4640">学韩语这件事很有意思。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">形容词 + -게</div><div style="font-size:14px;color:#89756e;margin-top:2px">形容词→副词（方式）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">쉽게 써요.</span><span style="font-size:14px;color:#5a4640">简单地写。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">천천히 말해 주세요.</span><span style="font-size:14px;color:#5a4640">请慢慢说。（专属副词优先）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">주의 사항</div><div style="font-size:15px;color:#5a4640">빠르다/많다/높다 有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-는 것 只接动作动词（현재형）；形容词名词化用 -ㄴ/은 것（后续课程）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-는 것 可充当句子各成分：主语（-는 것이）/ 宾语（-는 것을）/ 主题（-는 것은）。</div></div>
<div class="reminder-box">쉽고 써요 ✗ → 쉽게 써요 ✓ — -게 表示方式，-고 表示并列顺序，两者不能混用。빠르게 가요 可以说，但 빨리 가요 更自然——遇到有专属副词的词，优先用专属副词。</div>`,
    compareLabel: '-는 것（名词化）vs -게（副词化）',
    structures: [
      {
        ko: '명사 + 이에요/예요',
        zh: '名词 + 이에요/예요 = 是……',
        tokens: [
          { text: '명사', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이에요/예요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 + -는 것',
        zh: '动词词干 + -는 것 = 做某事这件事',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는 것', role: 'plain' },
        ],
      },
      {
        ko: '형용사 어간 + -게',
        zh: '形容词词干 + -게 = ……地',
        tokens: [
          { text: '형용사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-게', role: 'plain' },
        ],
      },
      {
        ko: '한국어를 배우는 것은 재미있어요.',
        zh: '学韩语这件事很有意思。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 것은', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词+이다：口语变成 이에요/예요', examples: '학생→학생이에요 / 가수→가수예요。아버지는 의사이고 어머니는 선생님이에요' },
      { type: 'rule', text: '동사+-는 것：接现在修饰 형', examples: '보다→보는 것 / 듣다→듣는 것 / 공부하다→공부하는 것。可充当多种句子成分' },
      { type: 'note', text: '形容词 + -게 注意事项：如果形容词有专属副词，优先用专属副词', examples: '높다→높이（高）/ 빠르다→빨리（快）/ 많다→많이（多）' },
      { type: 'rule', text: '无专属副词时用 -게', examples: '맛있다→맛있게 / 예쁘다→예쁘게' },
      { type: 'usage', text: '-게 表示方式，修饰后面的动词', examples: '쉽게 써요（简单地写）/ 빠르게 읽어요（快速地读）' },
      { type: 'note', text: '-는 것 只接动作动词（现在时）；形容词名词化用 -ㄴ/은 것（后续课程学）' },
      { type: 'compare', text: '注意区分：-게（方式）vs -고（并列顺序）', examples: '쉽게 써요 vs 쓰고 읽어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 것은', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '学韩语这件事很有意思。',
        swapWords: ['배우는 것', '듣는 것', '쓰는 것'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣는 것이', role: 'verb' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '听歌这件事很好。',
        swapWords: ['듣는 것', '부르는 것', '외우는 것'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '문장을', role: 'object' },
          { text: '쉽게', role: 'plain' },
          { text: '써요', role: 'verb' },
        ],
        zh: '把句子写得简单一点。',
        swapWords: ['쉽게', '빠르게', '천천히'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 사람은', role: 'subject' },
          { text: '가수예요', role: 'verb' },
        ],
        zh: '这个人是歌手。',
        swapWords: ['가수예요', '학생이에요', '선생님이에요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习感受', ko: '한국어를 배우는 것은 재미있어요.', zh: '学韩语这件事很有意思。' },
      { icon: '🎵', context: 'KPOP 学习', ko: '노래를 듣는 것이 좋아요.', zh: '听歌这件事很好。' },
      { icon: '✏️', context: '写作练习', ko: '문장을 쉽게 써요.', zh: '把句子写得简单一点。' },
      { icon: '🗣️', context: '发音提示', ko: '천천히 말해 주세요.', zh: '请慢慢说。' },
      { icon: '👤', context: '自我介绍', ko: '저는 한국어 공부 중인 학생이에요.', zh: '我是正在学韩语的学生。' },
      { icon: '🏃', context: '方式说明', ko: '빠르게 읽는 것이 어려워요.', zh: '快速读这件事很难。' },
    ],
    mistakes: [
      { wrong: '좋는 것이 좋아요. (想说听歌)', correct: '듣는 것이 좋아요.', note: '-는 것 接动作动词，不接形容词' },
      { wrong: '쉽고 써요. (想说简单地写)', correct: '쉽게 써요.', note: '-게 表示方式，不是 -고（-고 表示并列顺序）' },
      { wrong: '저는 학생. (省略谓语)', correct: '저는 학생이에요.', note: '名词做谓语必须加 이에요/예요，不能省略' },
      { wrong: '빠르는 것 (想说快速这件事)', correct: '빠른 것', note: '形容词名词化用 -ㄴ/은 것，不是 -는 것（-는 것 只接动作动词）' },
    ],
    quickTable: {
      title: '변형 속찰표',
      headers: ['原形', '-는 것 / -게', '中文'],
      rows: [
        ['공부하다 学习', '공부하는 것 学习这件事', '学习这件事'],
        ['듣다 听', '듣는 것 听这件事', '听这件事'],
        ['쉽다', '쉽게 简单地', '简单地'],
        ['빠르다', '빨리（速度副词）快', '快（优先用 빨리）'],
        ['느리다', '느리게 慢慢地', '慢慢地'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-는 것 · -게 완성！</div>
  <div class='ov-sub'>动作变事情，形容词变方式</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>명사+이에요</span> 가수예요 / 학생이에요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>동사+-는 것</span> 배우는 것 / 듣는 것</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>형용사+-게</span> 쉽게 / 빠르게</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>구분</span> -게（方式）≠ -고（并列）</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l06',
    partNumber: 4,
    lessonNumber: 7,
    title: '보다, 에 비하다',
    whatItDoes: '说"比……更……"和"和……相比"',
    whatItDoesBody: 'N보다 表示"比……"；\n에 비해서 表示"和……相比"（更书面）。\n和中文一样，韩语比较句也是"A比B更……"的结构，보다 相当于中文的"比"，直接贴在比较基准后面。',
    structureNote: '这节课两个比较结构：①보다（口语比较）直接接在名词后，配合 더 加强；\n②에 비해서（书面比较）更适合分析说明。\n两者都能说"比……"，区别是语体风格。',
    rulesNote: '보다 直接贴名词后，无需考虑받침。\n더 可加可不加，加了更强调"更"。\n注意 보다 的双重身份：\n보다 动词是"看"，비교조사 보다 是"比"，看句子位置区分。\n에 비해서/비하면/비하여 是同一词的三种形式。',
    scenarioNote: '比较两首歌、两个语言的难度、两个地方的特点보다 是日常表达里用频率最高的比较词。\n学会这节课，你能准确说出"比……更好听""比昨天更难"。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">보다 · 에 비해서</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"比……更……"，或"和……相比"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어는 영어보다 어려워요.</span> — 韩语比英语难。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">어제보다 오늘 더 잘해요.</span> — 今天比昨天做得更好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">초급에 비해서 중급 문법은 어려워요.</span> — 和初级相比，中级语法更难。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个比较结构</div>
  <div style="margin-bottom:6px">① <b>A는 B보다 (더) + 형용사</b> — A比B更……（口语，直接）</div>
  <div>② <b>B에 비해서 A는 + 형용사</b> — 和B相比，A……（书面，分析用）</div>
</div>
<div class="reminder-box">보다 直接贴在被比较对象后，더 可加可不加；에 비해서/비하면/비하여 是同一词的三种形式。注意：보다 还是动词"看"，靠位置区分。</div>`,
    compareHtml: `<div class="card-title">보다（口语）vs 에 비해서（书面）</div>
<div class="card-body">两者都能表达"比较"，但语体不同：보다 简洁直接，日常对话首选；에 비해서 偏书面，适合分析说明或写作场合。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">N보다</div><div style="font-size:14px;color:#89756e;margin-top:2px">口语比较，简洁直接</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이 노래는 저 노래보다 빨라요.</span><span style="font-size:14px;color:#5a4640">这首歌比那首歌快。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어가 영어보다 어려워요.</span><span style="font-size:14px;color:#5a4640">韩语比英语难。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에 비해서</div><div style="font-size:14px;color:#89756e;margin-top:2px">书面比较，适合分析说明</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">초급에 비해서 중급이 어려워요.</span><span style="font-size:14px;color:#5a4640">和初级相比，中级更难。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">작년에 비해서 실력이 늘었어요.</span><span style="font-size:14px;color:#5a4640">和去年相比，实力提升了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">비교 구조</div><div style="font-size:15px;color:#5a4640">A가/는 B보다 + 형용사：A比B更……（보다 贴在基准B后面）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">더 可省略，加了更强调：한국어가 영어보다 더 어려워요。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">에 비해서 = 에 비하면 = 에 비하여（三种形式意思相同）</div></div>
<div class="reminder-box">보다 接在被比较对象（基准）后，不是主语后：한국어는 영어보다 어려워요（韩语比英语难）— 영어 是基准，贴 보다。보다 더 싸요（比……更便宜）— 보다 단독으로도 쓸 수 있어요。</div>`,
    compareLabel: 'N보다（口语）vs 에 비해서（书面）',
    structures: [
      {
        ko: 'A는 B보다 더 + 형용사',
        zh: 'A 比 B 更……',
        tokens: [
          { text: 'A는', role: 'subject' },
          { text: 'B보다', role: 'plain' },
          { text: '더', role: 'plain' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: 'B보다 A가 더 + 형용사',
        zh: '比起 B，A 更……',
        tokens: [
          { text: 'B보다', role: 'plain' },
          { text: 'A가', role: 'subject' },
          { text: '더', role: 'plain' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: 'B에 비해서 A는 + 형용사',
        zh: '和 B 相比，A……',
        tokens: [
          { text: 'B에 비해서', role: 'plain' },
          { text: 'A는', role: 'subject' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 영어보다 어려워요.',
        zh: '韩语比英语难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '보다：直接接在比较基准名词后', examples: '영어보다 / 어제보다 / 이 노래보다' },
      { type: 'usage', text: '更：더 可以加在形容词前强调"更"', examples: '더 어려워요 / 더 좋아요 / 더 빨라요' },
      { type: 'usage', text: '语序：A는 B보다 더 형용사（A比B更）；或 B보다 A가 더 형용사（比B，A更）' },
      { type: 'vocab', text: '에 비하다 三种形式', examples: '에 비해서（和……相比）/ 에 비하면（如果和……相比）/ 에 비하여（书面，和……相比）' },
      { type: 'example', text: '교재 예문：중국이 한국보다 커요 / 남자가 여자보다 힘이 세요 / 저는 바다보다 산을 더 좋아해요' },
      { type: 'compare', text: '보다 双重身份：동사 보다（看）vs 비교조사 보다（比）', examples: '영화를 봐요（看电影）vs 영어보다（比英语）' },
      { type: 'usage', text: '口语优先用 보다；写内容分析时可以用 에 비해서' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '더 어려워요', role: 'verb' },
        ],
        zh: '韩语比英语更难。',
        swapWords: ['더 어려워요', '더 재미있어요', '더 어렵지 않아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '저 노래보다', role: 'plain' },
          { text: '빨라요', role: 'verb' },
        ],
        zh: '这首歌比那首歌快。',
        swapWords: ['빨라요', '어려워요', '좋아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제보다', role: 'plain' },
          { text: '오늘', role: 'time' },
          { text: '더 잘해요', role: 'verb' },
        ],
        zh: '今天比昨天做得更好。',
        swapWords: ['더 잘해요', '더 좋아요', '더 열심히 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '초급에 비해서', role: 'plain' },
          { text: '중급 문법은', role: 'subject' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '和初级相比，中级语法更难。',
        swapWords: ['어려워요', '복잡해요', '재미있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习难度', ko: '한국어 문법은 발음보다 어려워요.', zh: '韩语语法比发音难。' },
      { icon: '🎵', context: 'KPOP 比较', ko: '이 노래는 저 노래보다 빨라요.', zh: '这首歌比那首歌快。' },
      { icon: '📈', context: '学习进步', ko: '어제보다 오늘 더 잘해요.', zh: '今天比昨天做得更好。' },
      { icon: '🏫', context: '课程分析', ko: '초급에 비해서 중급 문법은 어려워요.', zh: '和初级相比，中级语法更难。' },
      { icon: '🌏', context: '语言比较', ko: '영어에 비해서 한국어는 발음이 어려워요.', zh: '和英语相比，韩语发音更难。' },
      { icon: '🍽️', context: '餐厅比较', ko: '이 식당은 저 식당보다 더 맛있어요.', zh: '这家餐厅比那家餐厅更好吃。' },
    ],
    mistakes: [
      { wrong: '영어는 한국어보다 어려워요. (想说韩语比英语难)', correct: '한국어는 영어보다 어려워요.', note: '보다 接在比较基准（被比较的那个）后面，不是主语后' },
      { wrong: '보다 쓸 때 항상 동사 "보다"라고 생각함', correct: '영어보다 어려워요（比较助词）vs 영화를 봐요（动词看）', note: '보다 有两个用法：比较助词（接名词后）和动词"看"（需要宾语）' },
      { wrong: '일상 대화에서 에 비해서 남발', correct: '일상에서는 보다를, 분석/설명에서는 에 비해서를 써요.', note: '에 비해서 语气偏书面，日常对话直接用 보다 更自然' },
      { wrong: '어제보다 더 잘했어요. (忘记加时间词)', correct: '어제보다 오늘 더 잘해요.', note: '用 보다 比较时，两个比较对象要都出现在句中' },
    ],
    quickTable: {
      title: '비교 표현 속찰표',
      headers: ['表达', '用法', '例子'],
      rows: [
        ['A는 B보다 더...', 'A比B更...', '한국어는 영어보다 더 어려워요.'],
        ['B보다 A가 더...', '比起B，A更...', '영어보다 한국어가 더 어려워요.'],
        ['B에 비해서 A는...', '和B相比，A...', '영어에 비해서 한국어는 어려워요.'],
        ['어제보다 오늘 더...', '今天比昨天更...', '어제보다 오늘 더 잘해요.'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>보다 · 에 비해서 완성！</div>
  <div class='ov-sub'>比较让表达更有层次</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>N보다</span> 口语比较：영어보다 어려워요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>에 비해서</span> 书面比较：초급에 비해서 어려워요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>더</span> 加强"更"：더 어려워요 / 더 좋아요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 보다 两个身份：比较助词 vs 动词"看"</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l07',
    partNumber: 4,
    lessonNumber: 8,
    title: '(으)로',
    whatItDoes: '说用什么工具、以什么身份',
    whatItDoesBody: '(으)로 是多义助词：\n表示工具/语言、方向、身份结果。\n有收音用 으로，无收音或 ㄹ 收音用 로。\n中文"用韩语说""往右走""用信用卡付"都靠 (으)로 来表达。',
    structureNote: '(으)로 有四种用法：\n方向（往哪走）、工具/语言（用什么说/做）、变化结果（变成什么）、身份（作为什么）。\n结构一样，都贴在名词后，靠语境区分意思。',
    rulesNote: '받침 规则有个特例：\nㄹ 받침不接 으로，直接接 로（지하철로/서울로）。\n区分 에 和 (으)로：\n에 是"到达目的地"，(으)로 是"朝着方向走"학교에 가요（去学校）vs 오른쪽으로 가요（往右走）。',
    scenarioNote: '"用韩语说""往右转""用相机拍""换大号"(으)로 是你在韩国问路、购物、沟通时绕不开的助词。\n掌握这节课，遇到"用/往/作为"这类表达就能自然说出来。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">(으)로</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说用什么工具、往哪个方向、以什么身份。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어로 말해요.</span> — 用韩语说。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오른쪽으로 가세요.</span> — 请往右走。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">지하철로 학교에 가요.</span> — 坐地铁去学校。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">收音选择规则</div>
  <div style="margin-bottom:6px">有收音（非ㄹ）→ <b>으로</b>：펜→펜으로 / 오른쪽→오른쪽으로</div>
  <div style="margin-bottom:6px">无收音 → <b>로</b>：한국어→한국어로 / 버스→버스로</div>
  <div>ㄹ 收音（特例）→ <b>로</b>：지하철→지하철로 / 서울→서울로</div>
</div>
<div class="reminder-box">四种用法：方向（오른쪽으로）、工具/语言（한국어로）、变化结果（큰 사이즈로 바꿔요）、身份（선생님으로 일해요）。靠语境区分。</div>`,
    compareHtml: `<div class="card-title">에（到达）vs (으)로（方向/工具）</div>
<div class="card-body">两者都能和移动动词搭配，但含义不同：에 表示"到达的目的地"，(으)로 表示"朝着某个方向走"或"使用某种工具/方式"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에</div><div style="font-size:14px;color:#89756e;margin-top:2px">到达地点（目的地）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:14px;color:#5a4640">去学校。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">도서관에 있어요.</span><span style="font-size:14px;color:#5a4640">在图书馆。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">(으)로</div><div style="font-size:14px;color:#89756e;margin-top:2px">方向 / 工具 / 身份</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오른쪽으로 가요.</span><span style="font-size:14px;color:#5a4640">往右走。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어로 말해요.</span><span style="font-size:14px;color:#5a4640">用韩语说。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">四种用法</div><div style="font-size:15px;color:#5a4640">① 方向：오른쪽으로 가세요（往右走）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">② 工具/手段：한국어로 말해요 / 카메라로 사진을 찍어요</div><div style="margin-top:4px;font-size:15px;color:#5a4640">③ 变化结果：큰 사이즈로 바꿔 주세요（换成大号）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">④ 身份/资格：모범학생으로 뽑혔어요（被选为模范学生）</div></div>
<div class="reminder-box">학교로 가요 ✗（想说去学校）→ 학교에 가요 ✓ — 到达目的地用 에，(으)로 不表示目的地。注意：ㄹ 收音名词后用 로，不加 으：지하철로 가요（不是 지하철으로）。</div>`,
    compareLabel: '에（到达）vs (으)로（方向/工具）',
    structures: [
      {
        ko: '명사 (받침 O) + 으로',
        zh: '有收音名词 + 으로',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '으로', role: 'plain' },
        ],
      },
      {
        ko: '명사 (받침 X / ㄹ) + 로',
        zh: '无收音或ㄹ收音 + 로',
        tokens: [
          { text: '명사(받침X/ㄹ)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '로', role: 'plain' },
        ],
      },
      {
        ko: '한국어로 말해요.',
        zh: '用韩语说。',
        tokens: [
          { text: '한국어로', role: 'plain' },
          { text: '말해요', role: 'verb' },
        ],
      },
      {
        ko: '오른쪽으로 가세요.',
        zh: '请往右走。',
        tokens: [
          { text: '오른쪽으로', role: 'place' },
          { text: '가세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音（非 ㄹ）→ 으로', examples: '펜→펜으로 / 책→책으로 / 오른쪽→오른쪽으로' },
      { type: 'rule', text: '无收音 → 로', examples: '한국어→한국어로 / 버스→버스로 / 나라→나라로' },
      { type: 'rule', text: 'ㄹ 收音 → 로（特例）', examples: '지하철→지하철로 / 서울→서울로' },
      { type: 'usage', text: '四种用法：① 方向（오른쪽으로 가세요）② 工具/手段（한국어로 말해요 / 카메라로 사진을 찍어요）③ 变化结果（큰 사이즈로 바꿔 주세요）④ 身份/资格（저는 모범학생으로 뽑혔어요）' },
      { type: 'compare', text: '에 vs (으)로：에 是到达地点（학교에 가요）；(으)로 是方向/方式（오른쪽으로 가요）' },
      { type: 'example', text: '재료/방법 예문：피자는 밀가루로 만들어요（材料）/ 신용카드로 계산하겠습니다（支付方式）' },
      { type: 'compare', text: '펜으로 써요（工具助词）vs 펜을 써요（宾语助词），语气不同' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '말해요', role: 'verb' },
        ],
        zh: '用韩语说。',
        swapWords: ['한국어로', '영어로', '중국어로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '펜으로', role: 'plain' },
          { text: '써요', role: 'verb' },
        ],
        zh: '用笔写。',
        swapWords: ['펜으로', '연필로', '핸드폰으로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '오른쪽으로', role: 'place' },
          { text: '가세요', role: 'verb' },
        ],
        zh: '请往右走。',
        swapWords: ['오른쪽으로', '왼쪽으로', '앞으로'],
        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '지하철로', role: 'plain' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐地铁去学校。',
        swapWords: ['지하철로', '버스로', '걸어서'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '语言工具', ko: '한국어로 말해요.', zh: '用韩语说。' },
      { icon: '✏️', context: '书写工具', ko: '펜으로 문장을 써요.', zh: '用笔写句子。' },
      { icon: '🚇', context: '交通方式', ko: '지하철로 학교에 가요.', zh: '坐地铁去学校。' },
      { icon: '↩️', context: '路线方向', ko: '오른쪽으로 가세요.', zh: '请往右走。' },
      { icon: '📝', context: 'KPOP 练习', ko: '이 문장을 한국어로 써요.', zh: '把这个句子用韩语写出来。' },
      { icon: '👩‍🏫', context: '身份说明', ko: '선생님으로 일해요.', zh: '作为老师工作。' },
    ],
    mistakes: [
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'ㄹ 收音后用 로，不是 으로' },
      { wrong: '학교로 가요. (想说去学校)', correct: '학교에 가요.', note: '到达目的地用 에，(으)로 表方向/方式，不是目的地' },
      { wrong: '펜으로를 써요.', correct: '펜으로 써요.', note: '(으)로 已经是助词，后面不再加 를' },
      { wrong: '영어으로 말해요.', correct: '영어로 말해요.', note: '영어 无收音，用 로，不是 으로' },
    ],
    quickTable: {
      title: '로/으로 선택표',
      headers: ['名词末音', '助词', '例子'],
      rows: [
        ['有收音（非ㄹ）', '으로', '펜→펜으로 / 책→책으로'],
        ['无收音', '로', '한국어→한국어로 / 버스→버스로'],
        ['ㄹ收音', '로（ㄹ收音用）', '지하철→지하철로 / 서울→서울로'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>(으)로 완성！</div>
  <div class='ov-sub'>一个助词，三种用途</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>도구/언어</span> 한국어로 / 펜으로</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>방향</span> 오른쪽으로 / 서울로</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>신분</span> 선생님으로 일해요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 지하철로（ㄹ 받침 뒤에 로）</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l08',
    partNumber: 4,
    lessonNumber: 9,
    title: '(이)나, -거나',
    whatItDoes: '说"或者""随便哪个""至少"',
    whatItDoesBody: '(이)나 连接名词表示"或者"；\n-거나 连接动作表示"或者做……"。\n中文"咖啡或者茶""听歌或者看剧"前者用 (이)나，后者用 -거나，按名词/动词分类就记住了。',
    structureNote: '两块内容：①(이)나（名词之间的或者）按받침选 이나/나；\n②-거나（动作之间的或者）直接接动词词干，不考虑받침。\n选择表达是日常沟通中最基础的需求之一。',
    rulesNote: '(이)나 的收音规则和 이/가 完全一样：\n有收音→이나（책이나），无收音→나（커피나）。\n-거나 直接加词干，规律统一。\n注意 (이)나 还有另一个用法：\n表示"至少/就算"（밥이나 먹어요=就吃点饭吧），语气柔和。',
    scenarioNote: '"休息日听歌或者看剧""喝咖啡还是茶""无聊就刷刷手机"(이)나/-거나 在描述日常选择和习惯时极为常用。\n掌握这节课，你能更自然地描述自己的日常。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">(이)나 · -거나</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"或者"——名词之间用 (이)나，动作之间用 -거나。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">커피나 차를 마셔요.</span> — 喝咖啡或者茶。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">노래를 듣거나 드라마를 봐요.</span> — 听歌或者看电视剧。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">토요일이나 일요일에 만나요.</span> — 周六或者周日见。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">选哪个？按名词/动作分</div>
  <div style="margin-bottom:6px">名词 + 有收音 → <b>이나</b>：책이나 / 토요일이나</div>
  <div style="margin-bottom:6px">名词 + 无收音 → <b>나</b>：커피나 / 차나</div>
  <div>动词词干 → <b>-거나</b>：듣거나 / 보거나 / 공부하거나</div>
</div>
<div class="reminder-box">(이)나 还带"随便/至少"语气：커피나 마셔요（随便喝杯咖啡吧）。-거나 不考虑收音，统一接词干。</div>`,
    compareHtml: `<div class="card-title">(이)나（名词）vs -거나（动作）</div>
<div class="card-body">两者都表示"或者"，但适用范围不同：名词之间只能用 (이)나，动作/状态之间只能用 -거나，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">(이)나</div><div style="font-size:14px;color:#89756e;margin-top:2px">名词之间的"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피나 차 / 책이나 노트</span><span style="font-size:14px;color:#5a4640">咖啡或茶 / 书或笔记本</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울이나 부산에 가고 싶어요.</span><span style="font-size:14px;color:#5a4640">想去首尔或釜山。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-거나</div><div style="font-size:14px;color:#89756e;margin-top:2px">动作之间的"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">듣거나 봐요.</span><span style="font-size:14px;color:#5a4640">听或者看。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">집에 있거나 공부해요.</span><span style="font-size:14px;color:#5a4640">在家或者学习。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">变形规则</div><div style="font-size:15px;color:#5a4640">(이)나：有收音名词 + 이나 / 无收音名词 + 나</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-거나：现在时：去掉 다 接 거나（不考虑收音）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">-거나：过去时：词干末元音 ㅏ/ㅗ→았거나；其他→었거나；하다→했거나</div></div>
<div class="reminder-box">커피거나 차를 마셔요 ✗ → 커피나 차를 마셔요 ✓ — 名词之间不用 -거나。듣이나 봐요 ✗ → 듣거나 봐요 ✓ — 动作之间不用 (이)나。</div>`,
    compareLabel: '(이)나（名词）vs -거나（动作）',
    structures: [
      {
        ko: '명사 (받침 O) + 이나 + 명사',
        zh: '有收音名词 + 이나',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이나', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '명사 (받침 X) + 나 + 명사',
        zh: '无收音名词 + 나',
        tokens: [
          { text: '명사(받침X)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '나', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '동사 어간 + -거나',
        zh: '动词词干 + -거나',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-거나', role: 'plain' },
        ],
      },
      {
        ko: '노래를 듣거나 드라마를 봐요.',
        zh: '听歌或者看电视剧。',
        tokens: [
          { text: '노래를', role: 'object' },
          { text: '듣거나', role: 'verb' },
          { text: '드라마를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → 이나', examples: '책→책이나 / 물→물이나 / 토요일→토요일이나' },
      { type: 'rule', text: '无收音 → 나', examples: '커피→커피나 / 차→차나 / 친구→친구나' },
      { type: 'rule', text: '-거나 现在时：去掉 다 接 거나', examples: '보다→보거나 / 먹다→먹거나 / 공부하다→공부하거나' },
      { type: 'rule', text: '-거나 过去时：词干末音节元音是 ㅏ/ㅗ→았거나；其他→었거나；하다→했거나', examples: '갔거나 / 먹었거나 / 했거나' },
      { type: 'example', text: '교재 예문：학교에 갔거나 친구를 만났을 거예요 / 집에서 쉬거나 쇼핑을 해요' },
      { type: 'compare', text: '(이)나 用于名词之间；-거나 用于动作/状态之间，不能混用' },
      { type: 'usage', text: '(이)나 还带"随便选一个/至少"语气', examples: '커피나 마셔요（随便喝杯咖啡吧）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '커피나', role: 'object' },
          { text: '차를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '喝咖啡或者茶。',
        swapWords: ['커피나 차를', '주스나 물을', '라면이나 밥을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '토요일이나', role: 'time' },
          { text: '일요일에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '周六或者周日见。',
        swapWords: ['토요일이나 일요일에', '아침이나 저녁에', '오전이나 오후에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣거나', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
        zh: '听歌或者读句子。',
        swapWords: ['듣거나', '보거나', '따라 하거나'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뮤비를', role: 'object' },
          { text: '보거나', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '看 MV 或者看歌词。',
        swapWords: ['보거나', '듣거나', '따라 하거나'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '点饮品', ko: '커피나 차를 마셔요.', zh: '喝咖啡或者茶。' },
      { icon: '📅', context: '约时间', ko: '토요일이나 일요일에 만나요.', zh: '周六或者周日见。' },
      { icon: '📚', context: '学习方式', ko: '노래를 듣거나 문장을 읽어요.', zh: '听歌或者读句子。' },
      { icon: '🎵', context: 'KPOP 内容', ko: '뮤비를 보거나 가사를 봐요.', zh: '看 MV 或者看歌词。' },
      { icon: '😴', context: '休息选择', ko: '공부하거나 쉬어요.', zh: '学习或者休息。' },
      { icon: '🍜', context: '随便选', ko: '라면이나 먹어요.', zh: '随便吃碗拉面吧。' },
    ],
    mistakes: [
      { wrong: '책나 노트', correct: '책이나 노트', note: '책 有收音，用 이나' },
      { wrong: '듣이나 봐요. (想说听或者看)', correct: '듣거나 봐요.', note: '动作之间用 -거나，不是 (이)나' },
      { wrong: '커피거나 차를 마셔요.', correct: '커피나 차를 마셔요.', note: '名词之间用 (이)나，不用 -거나' },
      { wrong: '나를 커피나 차를 마셔요. (나=我)', correct: '커피나 차를 마셔요.', note: '커피나 的 나 是助词，和代词"我（나）"不同' },
    ],
    quickTable: {
      title: '이나/나/거나 선택표',
      headers: ['情况', '助词', '例子'],
      rows: [
        ['名词有收音', '이나', '책이나 / 물이나'],
        ['名词无收音', '나', '커피나 / 차나'],
        ['动词/形容词', '-거나', '듣거나 / 보거나'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>(이)나 · -거나 완성！</div>
  <div class='ov-sub'>说或者，让选择更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>명사+이나</span> 책이나 / 커피나</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>동사+-거나</span> 듣거나 / 보거나</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>구분</span> 名词用 이나，动作用 거나</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>语气</span> (이)나 也有"随便/至少"的语气</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l09',
    partNumber: 4,
    lessonNumber: 2,
    title: '에게서, 한테서, 씨, 짜리',
    whatItDoes: '说从谁那里得到，礼貌称呼人',
    whatItDoesBody: '에게서/한테서 表示"从谁那里"；\n씨 是人名后的礼貌称呼；\n짜리 表示价格/年龄/面额属性。\n这节课三个知识点各自独立，但都是日常韩语里非常实用的细节。\n中文"从朋友那里"一个结构搞定，韩语要区分语体：\n에게서（书面）和 한테서（口语）。',
    structureNote: '三块内容：①에게서/한테서（从谁那里收到/听说）和 에게/한테 方向相反；\n②씨（称呼用法）接在名字后，不接在姓后；\n③짜리（属性修饰）接在价格/数量后修饰名词。',
    rulesNote: '에게서/한테서 的方向逻辑：\n에게/한테=给出去，에게서/한테서=从那里收进来。\n씨 用法：\n김민준 씨（全名+씨）或 민준 씨（名+씨），不能直接说 김 씨（只用姓）。\n짜리 直接贴数字后。',
    scenarioNote: '"从朋友那里收到礼物""从老师那里学到的""买了一万韩元的票"这三个表达在购物、交流、介绍人物时都很常用。\n씨 则是韩国人日常称呼对方时最礼貌的方式。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">에게서 · 씨 · 짜리</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说从谁那里得到，礼貌称呼人，以及说多少钱的东西。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">친구한테서 선물을 받았어요.</span> — 从朋友那里收到了礼物。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">민수 씨, 안녕하세요?</span> — 民秀，你好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">만원짜리 티켓을 샀어요.</span> — 买了一万韩元的票。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个知识点</div>
  <div style="margin-bottom:6px">① <b>에게서/한테서</b> — 从谁那里（来源方向，收进来）<br><span style="color:#89756e;font-size:.9rem">에게서 偏书面，한테서 更口语</span></div>
  <div style="margin-bottom:6px">② <b>씨</b> — 人名后的礼貌称呼<br><span style="color:#89756e;font-size:.9rem">민수 씨 / 지민 씨，不接职称</span></div>
  <div>③ <b>짜리</b> — 价格/数量属性修饰<br><span style="color:#89756e;font-size:.9rem">만원짜리 / 두 시간짜리，前面必须有数量</span></div>
</div>
<div class="reminder-box">方向逻辑：에게/한테 = 给出去（给予方向）；에게서/한테서 = 从那里收进来（来源方向）。씨 接在人名后，不接职称（선생님 씨 ✗）。</div>`,
    compareHtml: `<div class="card-title">에게（给/对）vs 에게서（从……那里）</div>
<div class="card-body">两者形式相近，但方向相反：에게/한테 是动作指向对方（给出去），에게서/한테서 是动作来自对方（收进来）。搞混方向会意思完全相反。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에게/한테</div><div style="font-size:14px;color:#89756e;margin-top:2px">给谁 / 对谁（方向：出）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테 선물을 줘요.</span><span style="font-size:14px;color:#5a4640">给朋友礼物。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">선생님께 질문해요.</span><span style="font-size:14px;color:#5a4640">向老师提问。（께 是敬语形）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에게서/한테서</div><div style="font-size:14px;color:#89756e;margin-top:2px">从谁那里（方向：入）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테서 선물을 받아요.</span><span style="font-size:14px;color:#5a4640">从朋友那里收到礼物。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">남자 친구에게서 연락이 왔어요.</span><span style="font-size:14px;color:#5a4640">收到了男友的联系。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">口语 vs 书面用法</div><div style="font-size:15px;color:#5a4640">에게/에게서：书面语，适合正式写作和正式场合。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">한테/한테서：口语，日常对话首选，两者意思完全相同。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">씨：接在名字后表示礼貌称呼：손창 씨（不能只说 씨）。짜리：接金额后表示价值……的：오천 원짜리。</div></div>
<div class="reminder-box">친구에게서 선물을 줘요 ✗ — 给出去要用 에게/한테，不是 에게서。记忆口诀：에게서/한테서 = "서" 是"from"的标记，有 서 就是"从……那里来"。</div>`,
    compareLabel: '에게（给/对）vs 에게서（从……那里）',
    structures: [
      {
        ko: '사람 + 에게서/한테서 + 받다/듣다/배우다',
        zh: '人 + 에게서/한테서 + 收到/听说/学',
        tokens: [
          { text: '사람', role: 'subject' },
          { text: '에게서/한테서', role: 'plain' },
          { text: '받다/듣다/배우다', role: 'verb' },
        ],
      },
      {
        ko: '이름 + 씨',
        zh: '人名 + 씨（礼貌称呼）',
        tokens: [
          { text: '이름', role: 'subject' },
          { text: '씨', role: 'plain' },
        ],
      },
      {
        ko: '가격/수량/나이 + 짜리 + 명사',
        zh: '价格/数量/年龄 + 짜리 + 名词',
        tokens: [
          { text: '가격/수량', role: 'plain' },
          { text: '짜리', role: 'plain' },
          { text: '명사', role: 'object' },
        ],
      },
      {
        ko: '친구한테서 선물을 받았어요.',
        zh: '从朋友那里收到了礼物。',
        tokens: [
          { text: '친구한테서', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '받았어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '에게서 偏书面，한테서 更口语', examples: '선생님에게서 배워요 / 친구한테서 들었어요' },
      { type: 'note', text: '注意：名词+에게/한테 表示动作涉及的对象（给……）；名词+에게서/한테서 表示动作出发点（从……那里）' },
      { type: 'example', text: '教材例句：남자 친구에게서 선물을 받았어요 / 장 선생님에게서 배웠어요 / 남자 친구한테서 전화가 왔어요' },
      { type: 'usage', text: '씨：接在名字后', examples: '선우 씨 / 진주 씨。不用于职称（선생님 씨 ✗）' },
      { type: 'usage', text: '짜리：接在价格、时间、年龄等数量后表示面值/价值，在与同类商品比较时使用', examples: '만원짜리 / 800원짜리 배 / 5,000원짜리' },
      { type: 'vocab', text: '에게서/한테서 常与接收动词搭配', examples: '받다（收到）/ 듣다（听说）/ 배우다（学）/ 오다（来电话）' },
      { type: 'note', text: '짜리 前必须有数量信息，不能单独使用' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구한테서', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '받았어요', role: 'verb' },
        ],
        zh: '从朋友那里收到了礼物。',
        swapWords: ['친구한테서', '선생님에게서', '부모님에게서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '선생님에게서', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배워요', role: 'verb' },
        ],
        zh: '向老师学习韩语。',
        swapWords: ['선생님에게서', '토리한테서', '유튜브에서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '만원짜리', role: 'plain' },
          { text: '티켓을', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '买了一万韩元的票。',
        swapWords: ['만원짜리', '십만 원짜리', '이만 원짜리'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '민수 씨,', role: 'subject' },
          { text: '안녕하세요?', role: 'verb' },
        ],
        zh: '民秀，你好。',
        swapRole: 'subject',
          swapWords: ['민수 씨', '지민 씨', '토리 씨'],
      },
    ],
    scenarios: [
      { icon: '🎁', context: '收礼物', ko: '친구한테서 선물을 받았어요.', zh: '从朋友那里收到了礼物。' },
      { icon: '📚', context: '学习来源', ko: '선생님에게서 한국어를 배워요.', zh: '向老师学习韩语。' },
      { icon: '👋', context: '礼貌打招呼', ko: '민수 씨, 안녕하세요?', zh: '民秀，你好。' },
      { icon: '🎵', context: 'KPOP 票价', ko: '십만 원짜리 티켓을 샀어요.', zh: '买了十万韩元的票。' },
      { icon: '💬', context: '听说消息', ko: '친구한테서 들었어요.', zh: '从朋友那里听说了。' },
      { icon: '⏱️', context: '时长说明', ko: '두 시간짜리 영상이에요.', zh: '这是两个小时的视频。' },
    ],
    mistakes: [
      { wrong: '친구에게서 선물을 줘요. (想说给朋友)', correct: '친구한테 선물을 줘요.', note: '给出用 에게/한테；从那里收到用 에게서/한테서，方向相反' },
      { wrong: '선생님 씨, 안녕하세요?', correct: '선생님, 안녕하세요?', note: '씨 接人名，不接职称。선생님 本身就是称呼' },
      { wrong: '짜리 티켓을 샀어요. (没有数量)', correct: '만원짜리 티켓을 샀어요.', note: '짜리 前必须有价格/数量/年龄等信息' },
      { wrong: '친구에게서 선물을 받아요. (口语场合)', correct: '친구한테서 선물을 받아요.', note: '口语里更常用 한테서；에게서 偏书面/正式' },
    ],
    quickTable: {
      title: '방향 정리표',
      headers: ['助词', '方向', '例子'],
      rows: [
        ['에게/한테 给/对', '→ 给/对（出）', '친구한테 줘요 给朋友'],
        ['에게서/한테서 从……那里', '← 从……那里（入）', '친구한테서 받아요 从朋友那里收到'],
        ['씨 人名礼貌称呼', '人名称呼', '민수 씨'],
        ['짜리 属性限定', '属性限定', '만원짜리 티켓 一万元的票'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>에게서 · 씨 · 짜리 완성！</div>
  <div class='ov-sub'>来源、称呼、属性都会说了</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>한테서</span> 从朋友那里：친구한테서 받아요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>씨</span> 礼貌称呼：민수 씨</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>짜리</span> 属性：만원짜리 티켓</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 에게（给）↔ 에게서（从……那里）方向相反</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l10',
    partNumber: 4,
    lessonNumber: 10,
    title: '敬语',
    whatItDoes: '学会基本敬语，说话更有礼貌',
    whatItDoesBody: '-(으)세요 是最基础敬语请求形式；\n部分特殊敬语词（드세요/계세요/말씀하세요/주무세요）需要整词记忆。\n韩语敬语是文化必需见长辈、服务员、陌生人都需要用，不用会显得失礼。\n和中文不同：\n中文靠"请"字表达礼貌，韩语直接改变动词词尾形式，敬语是语法层面的要求，不是可选的礼貌词。',
    structureNote: '两块内容：①-(으)세요（敬语请求）已在P2学过，这节课补充更多用法和场景；\n②特殊敬语词먹다→드세요，있다→계세요，자다→주무세요，这几个需要整词背，不能从普通词变形。',
    rulesNote: '-(으)세요 变形和P2完全一样（有받침→으세요，无받침→세요）。\n特殊敬语词只有几个，全部记住：\n먹다/마시다→드세요，있다→계세요，자다→주무세요，말하다→말씀하세요。\n这类词无规律可循，只能背。',
    scenarioNote: '在韩国咖啡店、地铁、见朋友父母随处都需要用到敬语。\n드세요（请吃/请喝）和 계세요（在）是最高频的特殊敬语词。\n学会这节课，你能在礼貌场合自然说话，不会显得突兀。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">敬语基础</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">学会 -(으)세요 和几个必须整词记忆的特殊敬语词。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">여기에 앉으세요.</span> — 请坐这里。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">많이 드세요.</span> — 请多吃。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">선생님이 계세요?</span> — 老师在吗？</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两块内容</div>
  <div style="margin-bottom:6px">① <b>-(으)세요</b>：有收音→으세요，无收音→세요，ㄹ 收音脱落→세요<br><span style="color:#89756e;font-size:.9rem">앉으세요 / 보세요 / 아세요（알다）</span></div>
  <div>② <b>特殊敬语词</b>（整词记忆）：<br><span style="color:#89756e;font-size:.9rem">먹다→드세요 / 있다→계세요 / 자다→주무세요 / 말하다→말씀하세요</span></div>
</div>
<div class="reminder-box">많이 먹으세요 ✗（对长辈）→ 많이 드세요 ✓ — 特殊敬语词不能用普通变形替代。선생님이 있으세요 ✗ → 선생님이 계세요 ✓。</div>`,
    compareHtml: `<div class="card-title">普通表达 vs 敬语表达</div>
<div class="card-body">韩语敬语不只是语气词，有几个动词必须换成完全不同的词才算正确敬语。这几个词需要整词记忆，不能靠规则推导。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">普通表达</div><div style="font-size:14px;color:#89756e;margin-top:2px">日常/非敬语</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹어요 / 있어요 / 자요</span><span style="font-size:14px;color:#5a4640">吃 / 在 / 睡</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">말해요 / 죽어요</span><span style="font-size:14px;color:#5a4640">说 / 死</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">敬语表达</div><div style="font-size:14px;color:#89756e;margin-top:2px">对长辈/陌生人</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">드세요 / 계세요 / 주무세요</span><span style="font-size:14px;color:#5a4640">请吃 / 在 / 请睡</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">말씀하세요 / 돌아가세요</span><span style="font-size:14px;color:#5a4640">请说 / 去世（委婉）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">特殊敬语词对照</div><div style="font-size:15px;color:#5a4640">먹다/마시다 → 드시다（드세요）：请吃/请喝</div><div style="margin-top:4px;font-size:15px;color:#5a4640">있다 → 계시다（계세요）：在/有（人）</div><div style="margin-top:4px;font-size:15px;color:#5a4640">자다 → 주무시다（주무세요）：请睡</div><div style="margin-top:4px;font-size:15px;color:#5a4640">말하다 → 말씀하시다（말씀하세요）：请说</div><div style="margin-top:4px;font-size:15px;color:#5a4640">일반 동사 → -(으)세요：가다→가세요 / 읽다→읽으세요</div></div>
<div class="reminder-box">알으세요 ✗ → 아세요 ✓ — ㄹ 收音脱落：알다→아세요。먹으세요 ✗ → 드세요 ✓ — 먹다 有专属敬语词 드시다，必须换词，不能只加 -(으)세요。</div>`,
    compareLabel: '普通表达 vs 敬语表达',
    structures: [
      {
        ko: '동사 어간 (받침 X) + -세요',
        zh: '无收音词干 + 세요',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-세요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 (받침 O) + -으세요',
        zh: '有收音词干 + 으세요',
        tokens: [
          { text: '동사 어간(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으세요', role: 'plain' },
        ],
      },
      {
        ko: '여기에 앉으세요.',
        zh: '请坐这里。',
        tokens: [
          { text: '여기에', role: 'place' },
          { text: '앉으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 계세요.',
        zh: '老师在。（尊敬）',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '계세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音 → 세요', examples: '가다→가세요 / 보다→보세요 / 하다→하세요' },
      { type: 'rule', text: '有收音 → 으세요', examples: '앉다→앉으세요 / 읽다→읽으세요 / 받다→받으세요' },
      { type: 'rule', text: 'ㄹ 收音脱落', examples: '알다→아세요 / 살다→사세요 / 만들다→만드세요' },
      { type: 'vocab', text: '特殊敬语词 整词记忆', examples: '먹다→드시다/드세요 / 있다→계시다/계세요 / 말하다→말씀하시다/말씀하세요 / 자다→주무시다/주무세요 / 죽다→돌아가시다 / 아프다→편찮으시다 / 주다→드리다' },
      { type: 'vocab', text: '敬语名词', examples: '집→댁 / 이름→성함 / 생일→생신 / 말→말씀 / 나이→연세 / 아내→부인' },
      { type: 'note', text: '谦让语：当听话人是说话人的长辈或上级时使用', examples: '나→저 / 우리→저희 / 내가→제가 / 내→제' },
      { type: 'note', text: '助词变化：主语助词 은/는→께서는 / 이/가→께서；动作对象 에게/한테→께', examples: '선생님께 드려요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '여기에', role: 'place' },
          { text: '앉으세요', role: 'verb' },
        ],
        zh: '请坐这里。',
        swapWords: ['앉으세요', '기다리세요', '들어오세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '많이', role: 'plain' },
          { text: '드세요', role: 'verb' },
        ],
        zh: '请多吃。',
        swapWords: ['드세요', '마시세요', '드시고 가세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '선생님,', role: 'subject' },
          { text: '다시', role: 'plain' },
          { text: '말씀해 주세요', role: 'verb' },
        ],
        zh: '老师，请再说一遍。',
        swapWords: ['말씀해 주세요', '설명해 주세요', '천천히 말씀해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '천천히', role: 'plain' },
          { text: '따라 하세요', role: 'verb' },
        ],
        zh: '请慢慢跟读。',
        swapWords: ['따라 하세요', '읽으세요', '말하세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏫', context: '课堂请求', ko: '선생님, 다시 말씀해 주세요.', zh: '老师，请再说一遍。' },
      { icon: '🪑', context: '接待服务', ko: '여기에 앉으세요.', zh: '请坐这里。' },
      { icon: '🍽️', context: '用餐招待', ko: '많이 드세요.', zh: '请多吃。' },
      { icon: '🌙', context: '晚安问候', ko: '안녕히 주무세요.', zh: '晚安。请好好休息。' },
      { icon: '📱', context: 'Tori 跟读提示', ko: '천천히 따라 하세요.', zh: '请慢慢跟读。' },
      { icon: '📞', context: '确认老师在', ko: '선생님이 계세요?', zh: '老师在吗？' },
    ],
    mistakes: [
      { wrong: '많이 먹으세요. (对长辈)', correct: '많이 드세요.', note: '对长辈/客人 먹다 更自然用特殊敬语词 드세요' },
      { wrong: '선생님이 있으세요. (老师在)', correct: '선생님이 계세요.', note: '尊敬对象"在"用 계세요，不是 있으세요' },
      { wrong: '알으세요? (알다+으세요)', correct: '아세요?', note: 'ㄹ 收音脱落：알다→아세요' },
      { wrong: '初级阶段就想学完整套敬语', correct: '初级先掌握高频固定表达', note: '敬语系统复杂，初级先掌握高频固定表达（앉으세요/드세요/계세요）' },
    ],
    quickTable: {
      title: '일반 → 경어 대조표',
      headers: ['普通表达', '敬语表达', '中文'],
      rows: [
        ['먹어요/마셔요 吃/喝', '드세요 请吃/请喝', '请吃/请喝'],
        ['있어요（人在）', '계세요 在（敬语）', '在（尊敬）'],
        ['말해요 说', '말씀하세요 请说', '请说'],
        ['자요 睡觉', '주무세요 请睡/晚安', '请睡/晚安'],
        ['가세요/오세요 请去/来', '가세요/오세요（同形）', '请去/请来（同形）'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>경어 완성！</div>
  <div class='ov-sub'>礼貌表达让韩语更有温度</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)세요</span> 앉으세요 / 읽으세요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>드세요</span> 먹다/마시다 的敬语</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>계세요</span> 있다（人在）的敬语</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>말씀/주무세요</span> 말하다/자다 的敬语</div>
</div>`,
    linkedGrammarIds: [],
  },

  {
    id: 'card-p4-l11',
    partNumber: 4,
    lessonNumber: 11,
    title: '综合练习④',
    whatItDoes: '第四章综合练习',
    whatItDoesBody: '综合运用第四章 L01-L10 所学语法：\n动作连接与原因（-고/-아서）、必须与禁止（-아야 해요/-지 마세요）、花时间/花钱（걸리다/들다）、铺垫语气（-는데요）、名词化与副词化（-는 것/-게）、比较（보다/에 비해서）、工具/方向/身份（(으)로）、选择（(이)나/-거나）、来源与称呼（에게서/씨）、敬语基础（-(으)세요）。',
    isPractice: true,
    structureNote: '这是第四章的总复习。\n第四章的主线是"表达更精细"怎么连句、怎么说义务、怎么比较、怎么礼貌说话。\n做题时想想每个语法点背后的"表达功能"，而不只是记形式。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">第四章综合练习</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">连接句子、表达义务、比较、礼貌说话——全部整合在一起。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">这章学了什么：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L01-L03</span> — 动作连接（-고/-아서）、必须与禁止（-아야 해요/-지 마세요）、花时间/花钱（걸리다/들다）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L04-L07</span> — 铺垫语气（-는데요）、名词化/副词化（-는 것/-게）、比较（보다/에 비해서）、工具方向身份（(으)로）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">L08-L10</span> — 或者选择（(이)나/-거나）、来源称呼（에게서/씨/짜리）、敬语基础（-(으)세요/드세요/계세요）</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">综合例句</div>
  <div style="margin-bottom:6px">한국어를 배우는 데 시간이 걸리는데요, 재미있어요.</div>
  <div style="color:#89756e;font-size:.9rem">学韩语虽然花时间，不过很有意思。（L03+L04综合）</div>
</div>
<div class="reminder-box">综合练习会混合本章所有语法点出题。不确定时回到对应课次复习。</div>`,
    compareHtml: `<div class="card-title">第四章要点速览</div>
<div class="card-body">本章十节课的核心是"把句子说得更精细"——连接前后动作、表达义务、做比较、礼貌说话。每个语法点都有易混点，把对比记清楚就掌握了本章精髓。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-고 vs -아/어서</div><div style="font-size:14px;color:#89756e;margin-top:2px">顺序并列 vs 原因结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹고 공부해요 / 아파서 쉬어요</span><span style="font-size:14px;color:#5a4640">吃完再学 / 因为疼所以休息</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">걸려요 vs 들어요</div><div style="font-size:14px;color:#89756e;margin-top:2px">花时间 vs 花钱</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한 시간 걸려요 / 돈이 들어요</span><span style="font-size:14px;color:#5a4640">花一小时 / 花钱</span></div></div>
  <div class="tok-row"><div class="tok t-v">보다 vs 에 비해서</div><div style="font-size:14px;color:#89756e;margin-top:2px">口语比较 vs 书面比较</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">영어보다 어려워요 / 작년에 비해서</span><span style="font-size:14px;color:#5a4640">比英语难 / 和去年相比</span></div></div>
  <div class="tok-row"><div class="tok t-v">(이)나 vs -거나</div><div style="font-size:14px;color:#89756e;margin-top:2px">名词"或者" vs 动词"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피나 차 / 듣거나 봐요</span><span style="font-size:14px;color:#5a4640">咖啡或茶 / 听或者看</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">两个"必须"和"禁止"</div><div style="font-size:15px;color:#5a4640">-아/어야 해요（必须做）vs -지 마세요（请勿做）：방에 들어가야 해요（必须进去）/ 떠들지 마세요（请勿喧哗）。中文"必须"和"不要"是独立词，韩语嵌入词尾——一旦记住形式，任何动词都能套用。</div></div>
<div class="reminder-box">에게/한테（给出）vs 에게서/한테서（收入）方向相反；드세요/계세요/주무세요 是敬语特殊词，整词记忆。</div>`,
    compareLabel: '第四章要点速览',
    structures: [
      {
        ko: '복습 범위：L01-L10 핵심 문법',
        zh: '复习范围：L01-L10 核心语法',
        tokens: [
          { text: '복습', role: 'verb' },
          { text: 'L01–L10', role: 'plain' },
        ],
      },
      {
        ko: '한국어로 말하는 것은 어렵지만 재미있어요.',
        zh: '用韩语说话这件事虽然难，但很有意思。',
        tokens: [
          { text: '한국어로', role: 'plain' },
          { text: '말하는 것은', role: 'verb' },
          { text: '어렵지만', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'L01 -고：顺序连接"做A再做B"；-아/어/여서：原因连接"因为A所以B"', examples: '먹고 공부해요 / 피곤해서 쉬어요' },
      { type: 'rule', text: 'L02 -아/어/여야 해요：必须做；-지 마세요：请不要做', examples: '매일 복습해야 해요 / 늦지 마세요' },
      { type: 'rule', text: 'L03 걸리다：花时间；들다：花钱/花费', examples: '한 시간 걸려요 / 오만 원 들어요' },
      { type: 'rule', text: 'L04 -은/ㄴ/는데요：铺垫语气，引出话题或转折', examples: '날씨가 좋은데요 / 한국어를 배우는데요' },
      { type: 'rule', text: 'L05 -는 것：名词化（把动作变成"这件事"）；-게：副词化（把形容词变成"……地"）', examples: '공부하는 것이 어려워요 / 크게 말해요' },
      { type: 'rule', text: 'L06 보다：比……更……；에 비해서：和……相比', examples: '한국어는 영어보다 어려워요 / 작년에 비해서 실력이 늘었어요' },
      { type: 'rule', text: 'L07 (으)로：用……（工具）/ 往……（方向）/ 作为……（身份）', examples: '버스로 가요 / 왼쪽으로 가요 / 선생님으로 일해요' },
      { type: 'rule', text: 'L08 (이)나：或者（名词选一）；-거나：或者（动词选一）', examples: '커피나 차 주세요 / 노래하거나 춤춰요' },
      { type: 'rule', text: 'L09 에게서/한테서：从谁那里得到；씨：对人的礼貌称呼；짜리：……价值的东西', examples: '친구에게서 받았어요 / 김민준 씨 / 오천 원짜리' },
      { type: 'rule', text: 'L10 -(으)세요：尊敬请求；드세요：먹다/마시다 的敬语（请吃/请喝）；계세요：있다 尊敬体（在）', examples: '앉으세요 / 드세요 / 선생님이 계세요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '외우고', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어야 해요', role: 'verb' },
        ],
        zh: '必须背单词，然后读句子。',
        swapWords: ['외우고', '듣고', '보고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '어려운데요', role: 'verb' },
        ],
        zh: '韩语比英语难呢……',
        swapWords: ['어려운데요', '재미있는데요', '발음이 빠른데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '말하는 것이', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '用韩语说话这件事很难。',
        swapWords: ['어려워요', '재미있어요', '쉽지 않아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '선생님에게서', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배우는 데', role: 'verb' },
          { text: '시간이 걸려요', role: 'verb' },
        ],
        zh: '向老师学韩语需要花时间。',
        swapWords: ['시간이 걸려요', '돈이 들어요', '노력이 필요해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', ko: '단어를 외우고 문장을 읽어야 해요.', zh: '必须背单词，然后读句子。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '노래를 듣거나 가사를 봐요.', zh: '听歌或者看歌词。' },
      { icon: '⏰', context: '时间成本', ko: '한국어를 배우는 데 시간이 많이 걸려요.', zh: '学韩语很花时间。' },
      { icon: '🏫', context: '礼貌表达', ko: '선생님, 천천히 말씀해 주세요.', zh: '老师，请慢慢说。' },
      { icon: '💬', context: '铺垫说明', ko: '한국어가 어려운데요, 재미있어요.', zh: '韩语是有点难，不过很有意思。' },
      { icon: '🚇', context: '交通工具', ko: '지하철로 가는 데 삼십 분 걸려요.', zh: '坐地铁去要花三十分钟。' },
    ],
    mistakes: [
      { wrong: '공부하서 피곤해요.', correct: '공부해서 피곤해요.', note: 'L01：하다→해서' },
      { wrong: '공부하야 해요.', correct: '공부해야 해요.', note: 'L02：하다→해야' },
      { wrong: '이 책을 읽는다 데 시간이 걸려요.', correct: '이 책을 읽는 데 시간이 걸려요.', note: 'L03：动词+-는 데，不加 다' },
      { wrong: '학생는데요.', correct: '학생인데요.', note: 'L04：名词用 인데요' },
      { wrong: '빠르게 읽어요. (빠르다 有专属副词)', correct: '빨리 읽어요.', note: 'L05：빠르다 有专属副词 빨리，优先用 빨리' },
      { wrong: '영어는 한국어보다 어려워요. (想说韩语比英语难)', correct: '한국어는 영어보다 어려워요.', note: 'L06：보다 接在比较基准后' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'L07：ㄹ 받침 뒤에 로' },
      { wrong: '책거나 노트를 사요. (想说书或笔记本)', correct: '책이나 노트를 사요.', note: 'L08：名词之间用 이나，不用 거나' },
      { wrong: '친구에게서 선물을 줘요. (想说给朋友)', correct: '친구한테 선물을 줘요.', note: 'L09：에게서 是从那里收到，不是给出' },
      { wrong: '많이 먹으세요. (对长辈)', correct: '많이 드세요.', note: 'L10：对长辈用特殊敬语词 드세요' },
    ],
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>제4장 종합 연습 완성！</div>
  <div class='ov-sub'>第四章 10 课全部完成</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>연결</span> -고 / -아/어서</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>의무</span> -야 해요 / -지 마세요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>시간/돈</span> 걸려요 / 들어요</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>비교</span> 보다 / 에 비해서</div>
  <div class='ov-sec'><span class='badge' style='background:#c89020;color:white'>(으)로</span> 工具/方向/身份</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>경어</span> 드세요 / 계세요 / 말씀하세요</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l01',
    partNumber: 5,
    lessonNumber: 1,
    title: '-(으)면, -(으)려면',
    whatItDoes: '说"如果……"和"想要……的话"',
    whatItDoesBody: '-(으)면 表示"如果……"的条件；\n-(으)려면 表示"想要做……的话"，后句常接建议或要求。\n-(으)면 对应中文"如果……就……"，-(으)려면 对应"想……的话就要……"，是第五章最核心的条件句结构。',
    structureNote: '两个条件结构共用一套收音规则：\n有收音→으면/으려면，无收音/ㄹ收音→면/려면。\n区别在含义：\n-(으)면 是普通条件，-(으)려면 是"以目标为前提"的条件，后句常配 -야 해요 或 -세요。',
    rulesNote: 'ㄹ 收音直接接 -면（살면/알면），不脱落 ㄹ。\n不规则在此正常触发：\n듣다→들으면，춥다→추우면，어렵다→어려우면。\n-(으)려면 是 -(으)려고 하면 的缩略形，后句适合接命令或义务句。',
    scenarioNote: '"如果有时间就去""想把韩语学好就要每天练习"条件句是日常对话里最常用的句型之一。\n掌握这节课，你能给出建议、表达计划、描述"如果……"的情况。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-(으)면 · -(으)려면</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"如果……"和"想要……的话"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">시간이 있으면 카페에 가요.</span> — 如果有时间，就去咖啡店。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 잘하려면 매일 연습해야 해요.</span> — 想把韩语学好，就要每天练习。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">피곤하면 일찍 쉬세요.</span> — 如果累了，请早点休息。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">收音规则（两者相同）</div>
  <div style="margin-bottom:6px">有收音（非ㄹ）→ <b>으면/으려면</b>：먹다→먹으면/먹으려면</div>
  <div style="margin-bottom:6px">无收音 → <b>면/려면</b>：가다→가면/가려면</div>
  <div>ㄹ 收音 → <b>면/려면</b>（不加 으）：살다→살면/살려면</div>
</div>
<div class="reminder-box">-(으)려면 是"以目标为前提"的条件，后句常接 -야 해요 或 -세요。天气等无意志主语不用 -려면。</div>`,
    compareHtml: `<div class="card-title">-(으)면（条件）vs -(으)려면（目标）</div>
<div class="card-body">两者变形规则相同，含义不同：-(으)면 是普通"如果……就……"，-(으)려면 是"以某个目标为前提"，相当于"想……的话就要……"，后句通常是建议或义务。中文"如果"和"想要……的话"在韩语里是两套不同结构。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">普通条件：如果……就……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 있으면 공부해요.</span><span style="font-size:14px;color:#5a4640">如果有时间就学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨가 좋으면 산책해요.</span><span style="font-size:14px;color:#5a4640">如果天气好就散步。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)려면</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">目标条件：想……的话就……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잘하려면 매일 들어야 해요.</span><span style="font-size:14px;color:#5a4640">想做好的话就要每天听。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 가려면 비자가 필요해요.</span><span style="font-size:14px;color:#5a4640">想去韩国的话需要签证。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则（两者相同）</div>
  <div style="font-size:15px;color:#241917">有收音 → <b>-으면 / -으려면</b>：먹다 → 먹으면 / 먹으려면</div>
  <div style="font-size:15px;color:#241917">无收音 / ㄹ收音 → <b>-면 / -려면</b>：가다 → 가면 / 가려면 &nbsp;|&nbsp; 살다 → 살면 / 살려면</div>
</div>
<div class="reminder-box">가면 일찍 일어나야 해요 ✗（想说想去的话）→ 가려면 일찍 일어나야 해요 ✓ — 目标条件用 -려면，不用 -면。-(으)려면 后句常带 -야 해요 或 -세요，这是固定搭配信号。</div>`,
    compareLabel: '-(으)면（条件）vs -(으)려면（目标）',
    structures: [
      {
        ko: '동사/형용사 (받침 O) + -으면',
        zh: '有收音词干 + -으면',
        tokens: [
          { text: '동사/형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으면', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 (받침 X/ㄹ) + -면',
        zh: '无收音或ㄹ收音 + -면',
        tokens: [
          { text: '동사/형용사(받침X/ㄹ)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-면', role: 'plain' },
        ],
      },
      {
        ko: '시간이 있으면 카페에 가요.',
        zh: '如果有时间，就去咖啡店。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 잘하려면 매일 연습해야 해요.',
        zh: '想把韩语学好，就要每天练习。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘하려면', role: 'verb' },
          { text: '매일', role: 'time' },
          { text: '연습해야 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音（非ㄹ）→ -으면/-으려면', examples: '먹다→먹으면/먹으려면 / 읽다→읽으면/읽으려면 / 있다→있으면' },
      { type: 'rule', text: '无收音 → -면/-려면', examples: '가다→가면/가려면 / 보다→보면/보려면 / 공부하다→공부하면/공부하려면' },
      { type: 'rule', text: 'ㄹ 收音直接接 -면/-려면（ㄹ 不脱落）', examples: '살다→살면/살려면 / 알다→알면/알려면 / 만들다→만들면/만들려면' },
      { type: 'note', text: '不规则变形照常触发', examples: '듣다→들으면 / 춥다→추우면 / 아프다→아프면 / 어렵다→어려우면' },
      { type: 'usage', text: '-(으)려면 是 -(으)려고 하면 的缩略形，后句接命令句或义务句（어야 해요/하세요）最自然' },
      { type: 'example', text: '교재 예문：시간이 있으면 여행가고 싶어요 / 피곤하면 일찍 쉬세요 / 졸업하면 일을 하고 싶어요' },
      { type: 'example', text: '-(으)려면 교재 예문：전자사전을 사려면 쇼핑몰에 가야 해요' },
      { type: 'usage', text: '-(으)면 可用于过去形后面', examples: '공부했으면 좋겠어요（如果学过了就好了）' },
      { type: 'note', text: '-(으)려면 后句限制：后句接命令句（-세요/-아/어요）或义务句（-아야/어야 해요）最自然' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '카페에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '如果有时间，就去咖啡店。',
        swapRole: 'verb',
          swapWords: ['있으면', '없으면', '많으면'],
      },
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '좋으면', role: 'verb' },
          { text: '산책해요', role: 'verb' },
        ],
        zh: '如果天气好，就散步。',
        swapRole: 'verb',
          swapWords: ['좋으면', '나쁘면', '추우면'],
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '부르려면', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '먼저 봐야 해요', role: 'verb' },
        ],
        zh: '想唱这首歌，就要先看歌词。',
        swapWords: ['부르려면', '외우려면', '따라 하려면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '저장하려면', role: 'verb' },
          { text: '이 버튼을', role: 'object' },
          { text: '누르세요', role: 'verb' },
        ],
        zh: '想保存单词，请点这个按钮。',
        swapWords: ['저장하려면', '찾으려면', '복습하려면'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习建议', ko: '한국어를 잘하려면 매일 연습해야 해요.', zh: '想把韩语学好，就要每天练习。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '이 노래를 부르려면 가사를 먼저 봐야 해요.', zh: '想唱这首歌，就要先看歌词。' },
      { icon: '☕', context: '日常条件', ko: '시간이 있으면 카페에 가요.', zh: '如果有时间，就去咖啡店。' },
      { icon: '😴', context: '健康提示', ko: '피곤하면 일찍 쉬세요.', zh: '如果累了，请早点休息。' },
      { icon: '📱', context: 'App 引导', ko: '단어를 저장하려면 이 버튼을 누르세요.', zh: '想保存单词，请点这个按钮。' },
      { icon: '🎓', context: '目标规划', ko: '시험에 합격하려면 열심히 공부해야 해요.', zh: '想通过考试，就要努力学习。' },
    ],
    mistakes: [
      { wrong: '먹면 배불러요.', correct: '먹으면 배불러요.', note: '먹다 有收音，用 -으면，不是 -면' },
      { wrong: '가면 일찍 일어나야 해요. (想说想去学校的话)', correct: '가려면 일찍 일어나야 해요.', note: '目标条件用 -려면；-면 是普通"如果"' },
      { wrong: '살으면', correct: '살면', note: 'ㄹ 收音直接接 -면，不需要 으：살다→살면' },
      { wrong: '들면 (듣다+면)', correct: '들으면', note: 'ㄷ 不规则：듣다→들으면（ㄷ→ㄹ）' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-(으)면', '-(으)려면'],
      rows: [
        ['가다 去', '가면 如果去', '가려면 想去的话'],
        ['먹다 吃', '먹으면 如果吃', '먹으려면 想吃的话'],
        ['하다 做', '하면 如果做', '하려면 想做的话'],
        ['듣다 听', '들으면 如果听', '들으려면 想听的话'],
        ['살다 住/活', '살면 如果住', '살려면 想住的话'],
        ['춥다 冷', '추우면 如果冷', '추우려면 想冷的话'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-(으)면 · -(으)려면 완성！</div>
  <div class='ov-sub'>条件句让表达更有逻辑</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)면</span> 如果：시간이 있으면 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-(으)려면</span> 想……的话：잘하려면 연습해야 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>받침 있는</span> 먹다→먹으면 / 읽다→읽으면</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 살다→살면（不加 으）</div>
</div>`,
    linkedGrammarIds: ['gp-28'],
  },
  {
    id: 'card-p5-l02',
    partNumber: 5,
    lessonNumber: 2,
    title: '못, -지 못하다, 안, -지 않다',
    whatItDoes: '区分"不做"和"做不到"',
    whatItDoesBody: '안/-지 않다 表示主观"不做"；\n못/-지 못하다 表示客观"不能/做不了"，常因能力或条件不允许。\n这个区别在中文里不明显，但韩语必须分清"我不喝咖啡"和"我喝不了咖啡"是完全不同的表达。',
    structureNote: '两套否定各有短形和长形：\n안/못（短形，口语常用）和 -지 않다/-지 못하다（长形，更完整）。\n短形直接放动词前，长形接词干后加 지。\n注意 못 不能用于形容词。',
    rulesNote: '하다 动词的否定要把 안/못 插在 하다 前面：\n공부 안 해요，不是 안 공부해요。\n못 不能用于形容词（날씨가 못 좋아요 ✗→안 좋아요 ✓）。\n关键区分：\n自愿不做用 안，条件/能力不允许用 못。',
    scenarioNote: '"我不吃辣""因为过敏所以不能喝""发音太快跟不上"\n안 和 못 的区分是日常对话里非常实用的技能，能让你表达更准确，避免误会。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">안/못 · -지 않다/-지 못하다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">区分"不做"（主观）和"做不了"（客观）。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 공부 안 해요.</span> — 今天不学习。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 커피를 안 마셔요.</span> — 我不喝咖啡。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">너무 빨라서 따라 하지 못해요.</span> — 太快了，所以跟不上。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两套否定，用法不同</div>
  <div style="margin-bottom:6px">① <b>안 / -지 않다</b> — 主观不做（我选择不做）</div>
  <div style="margin-bottom:6px">② <b>못 / -지 못하다</b> — 客观不能（条件/能力不允许）</div>
  <div style="color:#89756e;font-size:.9rem">短形（안/못）放动词前；长形（-지 않다/-지 못하다）接词干后</div>
</div>
<div class="reminder-box">하다 动词：안/못 插在 하다 前 → 공부 안 해요 / 공부 못 해요。못 不接形容词：날씨가 못 좋아요 ✗ → 안 좋아요 ✓。</div>`,
    compareHtml: `<div class="card-title">안（不做）vs 못（做不了）</div>
<div class="card-body">中文"不"和"不能"有时可互换，但韩语 안 和 못 含义差别很大：안 是主观意愿，못 是客观条件/能力不允许。搞混会让对方误解你的意思——说 안 가요 表示你选择不去，说 못 가요 表示你去不了。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">안 / -지 않다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">主观：我选择不做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 커피를 안 마셔요.</span><span style="font-size:14px;color:#5a4640">我不喝咖啡。（个人偏好）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오늘은 안 가요.</span><span style="font-size:14px;color:#5a4640">今天我不去。（主动选择）</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">못 / -지 못하다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">客观：条件/能力不允许</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">알레르기가 있어서 못 마셔요.</span><span style="font-size:14px;color:#5a4640">因为过敏所以不能喝。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">약속이 있어서 못 가요.</span><span style="font-size:14px;color:#5a4640">因为有约所以去不了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">长形否定（更正式）</div>
  <div style="font-size:15px;color:#241917">안 → <b>-지 않아요</b>：가지 않아요（不去）</div>
  <div style="font-size:15px;color:#241917">못 → <b>-지 못해요</b>：가지 못해요（去不了）</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">短形口语更常用，长形书面/正式场合使用</div>
</div>
<div class="reminder-box">안 가요（我选择不去）vs 못 가요（我去不了）— 语气差别很大。하다 动词：안 해요 / 못 해요（中间加空格）。形容词只能用 안：안 예뻐요 ✓，못 예뻐요 ✗。</div>`,
    compareLabel: '안（不做）vs 못（做不了）',
    structures: [
      {
        ko: '안 + 동사/형용사',
        zh: '안 + 动词/形容词 = 不……',
        tokens: [
          { text: '안', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '동사/형용사', role: 'verb' },
        ],
      },
      {
        ko: '동사 어간 + -지 않아요',
        zh: '动词词干 + -지 않아요 = 不……',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지 않아요', role: 'plain' },
        ],
      },
      {
        ko: '못 + 동사',
        zh: '못 + 动词 = 不能……',
        tokens: [
          { text: '못', role: 'plain' },
          { text: '+', role: 'plain' },
          { text: '동사', role: 'verb' },
        ],
      },
      {
        ko: '너무 빨라서 따라 하지 못해요.',
        zh: '太快了，所以跟不上。',
        tokens: [
          { text: '너무 빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '안 + 动词/形容词：안 放在动词前', examples: '안 가요 / 안 먹어요 / 안 좋아요' },
      { type: 'note', text: '하다 动词：안/못 插在 하다 前面', examples: '공부 안 해요 / 공부 못 해요（不是 안 공부해요，口语更自然）' },
      { type: 'rule', text: '-지 않아요：去掉 다 加 지 않아요', examples: '가다→가지 않아요 / 먹다→먹지 않아요' },
      { type: 'rule', text: '-지 못해요：去掉 다 加 지 못해요', examples: '가다→가지 못해요 / 이해하다→이해하지 못해요' },
      { type: 'example', text: '교재 예문（못）：저는 채식주의자라서 고기를 못 먹어요 / 일이 있어서 못 갔어요 / 알코올에 알레르기가 있어서 술을 못 마셔요' },
      { type: 'example', text: '교재 예문（안）：저는 커피를 안 마셔요 / 오늘 공부 안 해요' },
      { type: 'note', text: '못 不接形容词：날씨가 못 좋아요（✗）→ 날씨가 안 좋아요（✓）' },
      { type: 'compare', text: '못 vs 안 总结：自愿不做用 안，条件/能力不允许用 못' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '공부', role: 'object' },
          { text: '안 해요', role: 'verb' },
        ],
        zh: '今天不学习。',
        swapWords: ['안 해요', '안 가요', '안 먹어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '없어서', role: 'verb' },
          { text: '못 가요', role: 'verb' },
        ],
        zh: '因为没时间，所以不能去。',
        swapWords: ['못 가요', '못 해요', '가지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
        zh: '因为发音快，所以跟不上。',
        swapWords: ['따라 하지 못해요', '이해하지 못해요', '외우지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문장을', role: 'object' },
          { text: '이해하지', role: 'verb' },
          { text: '않아요', role: 'verb' },
        ],
        zh: '不理解这个句子。',
        swapWords: ['이해하지 않아요', '외우지 않아요', '읽지 않아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '⏰', context: '日程冲突', ko: '오늘은 시간이 없어서 못 가요.', zh: '今天因为没时间，所以不能去。' },
      { icon: '📚', context: '学习困难', ko: '이 문장을 이해하지 못해요.', zh: '不能理解这个句子。' },
      { icon: '🎵', context: 'KPOP 跟读', ko: '너무 빨라서 따라 하지 못해요.', zh: '太快了，所以跟不上。' },
      { icon: '☕', context: '个人喜好', ko: '저는 커피를 안 마셔요.', zh: '我不喝咖啡。' },
      { icon: '🥩', context: '饮食限制', ko: '채식주의자라서 고기를 못 먹어요.', zh: '因为是素食者，所以不能吃肉。' },
      { icon: '🎤', context: '唱歌挑战', ko: '이 노래는 너무 높아서 부르지 못해요.', zh: '这首歌太高了，唱不了。' },
    ],
    mistakes: [
      { wrong: '오늘 안 공부해요. (하다동사)', correct: '오늘 공부 안 해요.', note: '하다 动词口语更自然：공부 안 해요（안 插入 하다 前）' },
      { wrong: '날씨가 못 좋아요.', correct: '날씨가 안 좋아요.', note: '못 不接形容词，否定形容词用 안' },
      { wrong: '가다지 못해요.', correct: '가지 못해요.', note: '-지 못하다 接词干，去掉 다 后加 지 못해요' },
      { wrong: '안 가요 / 못 가요 语气相同', correct: '안 가요（主观不去）/ 못 가요（客观不能去）', note: '안=主观选择不做；못=条件/能力不允许，语气差别大' },
    ],
    quickTable: {
      title: '否定表达表',
      headers: ['否定类型', '短形', '长形'],
      rows: [
        ['主观不做', '안 가요 不去', '가지 않아요 不去（长否）'],
        ['客观不能', '못 가요 不能去', '가지 못해요 不能去（长否）'],
        ['하다 型主观否定', '공부 안 해요 不学习', '공부하지 않아요 不学习（长否）'],
        ['하다 型客观否定', '공부 못 해요 不能学习', '공부하지 못해요 不能学习（长否）'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>안 · 못 완성！</div>
  <div class='ov-sub'>否定也有主观和客观之分</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>안/-지 않다</span> 主观不做：안 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>못/-지 못하다</span> 客观不能：못 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다동사</span> 공부 안/못 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 못 不接形容词</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l03',
    partNumber: 5,
    lessonNumber: 4,
    title: '-(으)려고 하다, (아마) -을/ㄹ 것이다',
    whatItDoes: '说打算做什么，大概会怎样',
    whatItDoesBody: '-(으)려고 해요 表示"打算/准备做某事"；\n아마 -을/ㄹ 거예요 表示"大概会……"的推测。\n前者是P1将来时 -을/ㄹ 거예요 的延伸将来时说"会做"，这节课的 -(으)려고 해요 强调"已有计划/意图"。\n中文"打算去"和"会去"都靠独立词区分，韩语用不同词尾直接嵌入动词末尾表达。',
    structureNote: '两块内容：①-(으)려고 해요（计划/意图）有收音接 으려고，无收音接 려고；\n②아마 -을/ㄹ 거예요（推测）-을/ㄹ 거예요 已学过，加 아마 表示"大概/可能"。',
    rulesNote: '-(으)려고 해요 的主语必须是有意志的人/动物，天气等无意志主语不能用（날씨가 따뜻하려고 해요 ✗）。\n推测的강도：\n갈 거예요（会去）→ 아마 갈 거예요（大概会去）。\nㅂ 不规则触发：\n어렵다→어려울 거예요。',
    scenarioNote: '"今天打算复习单词""打算去演唱会""票大概会很贵"计划和推测是学习日记、聊天、讨论未来时最常用的表达。\n掌握这节课，你能说出自己的计划也能猜测别人的情况。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-(으)려고 하다 · 아마 -을/ㄹ 것이다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说打算做什么，或大概会怎样。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 단어를 복습하려고 해요.</span> — 今天打算复习单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 노래를 따라 하려고 해요.</span> — 打算跟唱这首歌。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">아마 콘서트 티켓이 비쌀 거예요.</span> — 演唱会票大概会很贵。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个结构</div>
  <div style="margin-bottom:6px">① <b>-(으)려고 해요</b> — 打算/计划做（有意志的主语）<br><span style="color:#89756e;font-size:.9rem">有收音→으려고，无收音→려고</span></div>
  <div>② <b>아마 -을/ㄹ 거예요</b> — 大概会……（推测）<br><span style="color:#89756e;font-size:.9rem">아마 加强"不确定"语气</span></div>
</div>
<div class="reminder-box">ㅂ 不规则：어렵다→어려울 거예요。무의지 주어（天气等）不能用 -려고 해요，改用 -을/ㄹ 거예요。</div>`,
    compareHtml: `<div class="card-title">-(으)려고 해요（计划）vs 아마 -을/ㄹ 거예요（推测）</div>
<div class="card-body">两者都说"将来"，但意图不同：-(으)려고 해요 是已有计划/意图，主语必须是有意志的人；아마 -을/ㄹ 거예요 是对未来的推测，主语可以是人也可以是天气、事物。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)려고 해요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">个人计划：我打算……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오늘 공부하려고 해요.</span><span style="font-size:14px;color:#5a4640">今天打算学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">내년에 한국에 가려고 해요.</span><span style="font-size:14px;color:#5a4640">明年打算去韩国。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아마 -을/ㄹ 거예요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">未来推测：大概会……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아마 어려울 거예요.</span><span style="font-size:14px;color:#5a4640">大概会难。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아마 내일 비가 올 거예요.</span><span style="font-size:14px;color:#5a4640">明天大概会下雨。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则</div>
  <div style="font-size:15px;color:#241917">-(으)려고：有收音 → <b>-으려고</b>（먹으려고），无收音 → <b>-려고</b>（가려고）</div>
  <div style="font-size:15px;color:#241917">-을/ㄹ 거예요：有收音 → <b>-을 거예요</b>（먹을），无收音 → <b>-ㄹ 거예요</b>（갈）</div>
</div>
<div class="reminder-box">비가 오려고 해요 ✗（天气没有意志）→ 아마 비가 올 거예요 ✓ — 天气/事物无意志，只能用推测句。-(으)려고 해요 和 -(으)ㄹ 거예요 都能说计划，但 -려고 更强调"我有意图"，거예요 更中性。</div>`,
    compareLabel: '-(으)려고 해요（计划）vs 아마 -을/ㄹ 거예요（推测）',
    structures: [
      {
        ko: '동사 (받침 X) + -려고 해요',
        zh: '无收音词干 + -려고 해요 = 打算……',
        tokens: [
          { text: '동사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-려고 해요', role: 'plain' },
        ],
      },
      {
        ko: '동사 (받침 O) + -으려고 해요',
        zh: '有收音词干 + -으려고 해요',
        tokens: [
          { text: '동사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으려고 해요', role: 'plain' },
        ],
      },
      {
        ko: '아마 + 동사/형용사 + -을/ㄹ 거예요',
        zh: '아마 + 동사/형용사 + -을/ㄹ 거예요 = 大概会……',
        tokens: [
          { text: '아마', role: 'plain' },
          { text: '동사/형용사', role: 'verb' },
          { text: '-을/ㄹ 거예요', role: 'plain' },
        ],
      },
      {
        ko: '이 노래를 따라 하려고 해요.',
        zh: '打算跟唱这首歌。',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '따라 하려고 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音 → -려고 해요', examples: '가다→가려고 해요 / 보다→보려고 해요 / 공부하다→공부하려고 해요' },
      { type: 'rule', text: '有收音 → -으려고 해요', examples: '먹다→먹으려고 해요 / 읽다→읽으려고 해요 / 듣다→들으려고 해요' },
      { type: 'rule', text: '-을/ㄹ 거예요（推测）：无收音→-ㄹ 거예요；有收音→-을 거예요', examples: '가다→갈 거예요 / 먹다→먹을 거예요' },
      { type: 'usage', text: '아마 是推测副词，降低确定性', examples: '아마 갈 거예요（大概会去）vs 갈 거예요（会去）' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려울 거예요 / 무겁다→무거울 거예요 / 가볍다→가벼울 거예요' },
      { type: 'note', text: '-(으)려고 해요 的主语必须是有意志的，天气等无意志主语不可用' },
      { type: 'example', text: '교재 예문：오늘 한국어를 공부하려고 해요 / 이 노래를 따라 하려고 해요 / 아마 내일 비가 올 거예요' },
      { type: 'usage', text: '과거 추측：-았/었을 거예요', examples: '갔을 거예요（可能去了）/ 먹었을 거예요（可能吃了）' },
      { type: 'example', text: '추가 교재 예문：콘서트가 재미있을 거예요（演唱会应该很有趣）/ 내일도 날씨가 좋을 거예요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습하려고 해요', role: 'verb' },
        ],
        zh: '今天打算复习单词。',
        swapWords: ['복습하려고 해요', '외우려고 해요', '정리하려고 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '따라 하려고 해요', role: 'verb' },
        ],
        zh: '打算跟唱这首歌。',
        swapWords: ['따라 하려고 해요', '외우려고 해요', '녹음하려고 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아마', role: 'plain' },
          { text: '콘서트 티켓이', role: 'subject' },
          { text: '비쌀 거예요', role: 'verb' },
        ],
        zh: '演唱会票大概会很贵。',
        swapWords: ['비쌀 거예요', '없을 거예요', '구하기 어려울 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아마', role: 'plain' },
          { text: '이 문법은', role: 'subject' },
          { text: '어려울 거예요', role: 'verb' },
        ],
        zh: '这个语法大概会难。',
        swapWords: ['어려울 거예요', '재미있을 거예요', '도움이 될 거예요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', ko: '오늘 단어를 복습하려고 해요.', zh: '今天打算复习单词。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '이 노래를 따라 하려고 해요.', zh: '打算跟唱这首歌。' },
      { icon: '🌤️', context: '天气预测', ko: '아마 내일 날씨가 좋을 거예요.', zh: '明天天气大概会好。' },
      { icon: '🌧️', context: '天气预测', ko: '아마 내일 비가 올 거예요.', zh: '明天大概会下雨。' },
      { icon: '📖', context: '课程计划', ko: '시험이 있어서 복습하려고 해요.', zh: '因为有考试，所以打算复习。' },
      { icon: '😅', context: '难度预判', ko: '아마 이 문법은 어려울 거예요.', zh: '这个语法大概会难。' },
    ],
    mistakes: [
      { wrong: '먹려고 해요.', correct: '먹으려고 해요.', note: '먹다 有收音，用 -으려고 해요' },
      { wrong: '비가 오려고 해요. (天气打算下雨)', correct: '아마 비가 올 거예요.', note: '无意志主语不能用 -려고 해요，天气预测用 -을/ㄹ 거예요' },
      { wrong: '아마 갈 거예요. (太确定)', correct: '아마 갈 거예요.（语气本身没错，注意翻译不要说"一定会去"）', note: '아마 表示大概，中文翻译要保留不确定性' },
      { wrong: '들려고 해요. (듣다+려고)', correct: '들으려고 해요.', note: 'ㄷ 不规则：듣다→들으려고 해요' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-(으)려고 해요', '-을/ㄹ 거예요'],
      rows: [
        ['가다 去', '가려고 해요 打算去', '갈 거예요 要去/大概去'],
        ['먹다 吃', '먹으려고 해요 打算吃', '먹을 거예요 要吃/大概吃'],
        ['공부하다 学习', '공부하려고 해요 打算学习', '공부할 거예요 要学习'],
        ['듣다 听', '들으려고 해요 打算听', '들을 거예요 要听'],
        ['어렵다 难', '—', '어려울 거예요 大概很难'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-(으)려고 · 아마 -을/ㄹ 거예요 완성！</div>
  <div class='ov-sub'>计划和推测，让表达更有前瞻性</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)려고 해요</span> 打算：복습하려고 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>아마 -을/ㄹ 거예요</span> 推测：아마 어려울 거예요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>받침 있는</span> 먹으려고 / 먹을 거예요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 无意志主语不用 -려고 해요</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l04',
    partNumber: 5,
    lessonNumber: 3,
    title: '이/가 아니다, -는 게 아니라',
    whatItDoes: '说"不是……"和"不是A而是B"',
    whatItDoesBody: '이/가 아니에요 表示"不是"；\n이/가 아니라 B예요 表示"不是A而是B"；\n-는 게 아니라 用于纠正动作。\n纠正误解、澄清事实、对比两种说法这节课的三个结构都是用来"说清楚真相"的。\n中文"不是A而是B"靠词序和独立词实现，韩语用 이/가 아니라 + B예요 的专用结构，助词选择还要看有无收音。',
    structureNote: '三块内容：①이/가 아니에요（单纯否定"不是"）；\n②이/가 아니라 B예요（对比否定"不是A而是B"）；\n③-는 게 아니라（动作层面的"不是做A"）。\n아니라 后面必须跟正确答案，不能单独用。',
    rulesNote: '이/가 的收音规则和主格助词相同：\n有收音→이 아니에요，无收音→가 아니에요。\n-는 게 아니라 中的 게 是 것이 的口语缩略。\n注意：\n아니에요 可以单独结束句子，아니라 必须接 B예요 给出正确答案。',
    scenarioNote: '"这不是咖啡而是茶""不是背单词而是要理解""我不是老师，我是学生"纠正误解、澄清身份、说明真相，这类场景在日常对话里非常常见。\n学会这节课，你能更自信地说清楚"不是这样"。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">이/가 아니다 · -는 게 아니라</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说"不是……"和"不是A而是B"。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 학생이 아니에요.</span> — 我不是学生。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이건 커피가 아니라 차예요.</span> — 这不是咖啡，而是茶。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">외우는 게 아니라 이해해야 해요.</span> — 不是背，而是要理解。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个否定结构</div>
  <div style="margin-bottom:6px">① <b>이/가 아니에요</b> — 单纯否定"不是"（有收音→이，无收音→가）</div>
  <div style="margin-bottom:6px">② <b>이/가 아니라 B예요</b> — 纠正"不是A而是B"（后必须给出正确答案）</div>
  <div>③ <b>-는 게 아니라</b> — 动作层面纠正（동사 词干 + -는 게 아니라）</div>
</div>
<div class="reminder-box">아니라 和 아니에요 不同：아니에요 单独结束句子；아니라 后面必须跟 B예요 给出正确答案。</div>`,
    compareHtml: `<div class="card-title">이/가 아니에요（单纯否定）vs 이/가 아니라 B예요（对比纠正）</div>
<div class="card-body">两个结构都是否定，但目的不同：이/가 아니에요 只说"不是"，可以单独成句；이/가 아니라 B예요 在否定的同时给出正确答案，语气更完整，适合纠正误解。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">이/가 아니에요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">单纯否定：不是（可独立成句）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 학생이 아니에요.</span><span style="font-size:14px;color:#5a4640">我不是学生。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이건 커피가 아니에요.</span><span style="font-size:14px;color:#5a4640">这个不是咖啡。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">이/가 아니라 B예요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">对比纠正：不是A而是B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피가 아니라 차예요.</span><span style="font-size:14px;color:#5a4640">不是咖啡而是茶。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">선생님이 아니라 학생이에요.</span><span style="font-size:14px;color:#5a4640">不是老师而是学生。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">收音规则（两者相同）</div>
  <div style="font-size:15px;color:#241917">有收音名词 → <b>이 아니에요 / 이 아니라</b>：학생이 아니에요 / 학생이 아니라</div>
  <div style="font-size:15px;color:#241917">无收音名词 → <b>가 아니에요 / 가 아니라</b>：가수가 아니에요 / 가수가 아니라</div>
</div>
<div class="reminder-box">커피가 아니에요 차예요 ✗ → 커피가 아니라 차예요 ✓ — 对比纠正不是两个独立句，要用 아니라 连接。아니라 必须后接 B예요/이에요，不能单独结尾。</div>`,
    compareLabel: '단순 부정 vs 대조 부정',
    structures: [
      {
        ko: '명사 (받침 O) + 이 아니에요',
        zh: '有收音名词 + 이 아니에요',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이 아니에요', role: 'plain' },
        ],
      },
      {
        ko: '명사 (받침 X) + 가 아니에요',
        zh: '无收音名词 + 가 아니에요',
        tokens: [
          { text: '명사(받침X)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '가 아니에요', role: 'plain' },
        ],
      },
      {
        ko: '이건 커피가 아니라 차예요.',
        zh: '这不是咖啡，而是茶。',
        tokens: [
          { text: '이건', role: 'subject' },
          { text: '커피가 아니라', role: 'plain' },
          { text: '차예요', role: 'verb' },
        ],
      },
      {
        ko: '외우는 게 아니라 이해해야 해요.',
        zh: '不是背，而是要理解。',
        tokens: [
          { text: '외우는 게 아니라', role: 'verb' },
          { text: '이해해야 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → 이 아니에요/이 아니라', examples: '학생→학생이 아니에요 / 학생이 아니라' },
      { type: 'rule', text: '无收音 → 가 아니에요/가 아니라', examples: '가수→가수가 아니에요 / 커피→커피가 아니라' },
      { type: 'rule', text: '-는 게 아니라：动词词干 + -는 게 아니라', examples: '외우다→외우는 게 아니라 / 보다→보는 게 아니라 / 듣다→듣는 게 아니라' },
      { type: 'usage', text: 'A가 아니라 B예요 结构：B 必须给出正确答案', examples: '커피가 아니라 차예요 / 번역이 아니라 발음 연습이에요' },
      { type: 'compare', text: '이/가 아니라 vs 이/가 아니에요：아니에요 单纯否定；아니라 必须有对比答案' },
      { type: 'example', text: '교재 예문：이건 커피가 아니라 차예요 / 외우는 게 아니라 이해해야 해요 / 이건 번역이 아니라 발음 연습이에요' },
      { type: 'example', text: '추가 예문：이 음료수는 바나나 우유가 아니에요（这不是香蕉牛奶）/ 여기가 명동이 아니에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이', role: 'plain' },
          { text: '아니에요', role: 'verb' },
        ],
        zh: '我不是学生。',
        swapWords: ['학생이 아니에요', '선생님이 아니에요', '가수가 아니에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이건', role: 'subject' },
          { text: '커피가 아니라', role: 'plain' },
          { text: '차예요', role: 'verb' },
        ],
        zh: '这不是咖啡，而是茶。',
        swapWords: ['커피가 아니라 차예요', '번역이 아니라 발음 연습이에요', '숙제가 아니라 복습이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '외우는 게', role: 'verb' },
          { text: '아니라', role: 'plain' },
          { text: '이해해야 해요', role: 'verb' },
        ],
        zh: '不是背，而是要理解。',
        swapWords: ['외우는 게 아니라', '읽는 게 아니라', '듣는 게 아니라'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이건', role: 'subject' },
          { text: '번역이 아니라', role: 'plain' },
          { text: '발음 연습이에요', role: 'verb' },
        ],
        zh: '这不是翻译，而是发音练习。',
        swapRole: 'subject',
          swapWords: ['번역이 아니라', '숙제가 아니라', '시험이 아니라'],
      },
    ],
    scenarios: [
      { icon: '👤', context: '身份说明', ko: '저는 선생님이 아니에요.', zh: '我不是老师。' },
      { icon: '☕', context: '物品纠正', ko: '이건 커피가 아니라 차예요.', zh: '这不是咖啡，而是茶。' },
      { icon: '📚', context: '学习方法', ko: '외우는 게 아니라 이해해야 해요.', zh: '不是背，而是要理解。' },
      { icon: '🎵', context: 'KPOP 练习', ko: '이건 번역이 아니라 발음 연습이에요.', zh: '这不是翻译，而是发音练习。' },
      { icon: '💬', context: '纠正误解', ko: '그게 아니라 이렇게 하는 거예요.', zh: '不是那样，而是这样做。' },
      { icon: '🏫', context: '课程说明', ko: '이건 시험이 아니라 연습이에요.', zh: '这不是考试，而是练习。' },
    ],
    mistakes: [
      { wrong: '학생가 아니에요.', correct: '학생이 아니에요.', note: '학생 有收音，用 이 아니에요' },
      { wrong: '커피가 아니에요 차예요. (想说不是咖啡而是茶)', correct: '커피가 아니라 차예요.', note: '对比纠正用 아니라，不是两个独立句' },
      { wrong: '보다는 게 아니라', correct: '보는 게 아니라', note: '-는 게 아니라 接词干：보다→보는 게 아니라' },
      { wrong: '커피이 아니에요.', correct: '커피가 아니에요.', note: '커피 无收音，用 가 아니에요' },
    ],
    quickTable: {
      title: '부정 구조표',
      headers: ['用途', '结构', '例子'],
      rows: [
        ['单纯否定', '명사+이/가 아니에요', '학생이 아니에요'],
        ['对比纠正（名词）', '명사+이/가 아니라 B예요', '커피가 아니라 차예요'],
        ['对比纠正（动作）', '동사+-는 게 아니라', '외우는 게 아니라 이해해요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>아니에요 · 아니라 완성！</div>
  <div class='ov-sub'>否定和纠正，让表达更精确</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>이/가 아니에요</span> 不是：학생이 아니에요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>이/가 아니라</span> 不是A而是B：커피가 아니라 차예요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>-는 게 아니라</span> 动作纠正：외우는 게 아니라</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 받침 있는→이 / 받침 없는→가</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l05',
    partNumber: 5,
    lessonNumber: 5,
    title: '动词、形容词的冠词形',
    whatItDoes: '用动作和状态来修饰名词',
    whatItDoesBody: '动词/形容词加冠词形后置于名词前：\n现在动作用 -는，形容词用 -은/ㄴ，未来/未完成用 -을/ㄹ。\n中文里形容词本来就能直接修饰名词（"难的语法""学习的人"），韩语需要通过变形加上特定词尾才能放到名词前。',
    structureNote: '三套冠词形：①动词现在→-는（공부하는 사람）；\n②形容词→-은/ㄴ（按收音，어려운 문법）；\n③动词未来/未完成→-을/ㄹ（갈 곳）。\n变形后直接放名词前，结构和中文"……的+名词"一样。',
    rulesNote: '动词 -는 不看收音，统一接 는。\n形容词 -은/ㄴ 看收音：\n有收音→은，无收音→ㄴ。\n-을/ㄹ 看收音：\n有收音→을，无收音→ㄹ。\n注意 있다/없다 用 -는（있는/없는），和动词一样。\nㅂ 不规则触发：\n어렵다→어려운。',
    scenarioNote: '"现在听的歌""学习韩语的人""明天要去的地方"冠词形是韩语里使用频率极高的结构，几乎每个较复杂的句子都会用到。\n掌握这节课，你能描述事物、修饰名词，表达大幅丰富。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">动词/形容词的冠词形</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">用动作和状态来修饰名词。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 공부하는 사람이에요.</span> — 是学习韩语的人。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">어려운 문법은 천천히 공부해요.</span> — 难的语法慢慢学。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">내일 갈 곳이 있어요.</span> — 明天有要去的地方。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三套冠词形</div>
  <div style="margin-bottom:6px">① 动词现在 → <b>-는</b>：공부하다→공부하는 사람</div>
  <div style="margin-bottom:6px">② 形容词 → <b>-은/ㄴ</b>（有收音→은，无收音→ㄴ）：어렵다→어려운 문법</div>
  <div>③ 动词未来 → <b>-을/ㄹ</b>（有收音→을，无收音→ㄹ）：가다→갈 곳</div>
</div>
<div class="reminder-box">있다/없다 和动词一样用 -는：있는 / 없는。ㅂ 不规则：어렵다→어려운。形容词不用 -는（좋는 노래 ✗）。</div>`,
    compareHtml: `<div class="card-title">动词 -는（现在）vs 形容词 -은/ㄴ vs 动词未来 -을/ㄹ</div>
<div class="card-body">动词和形容词的冠词形不同：动词现在时用 -는，形容词按有无收音用 -은/-ㄴ，动词未来/未完成用 -을/-ㄹ。三套规则各自独立，混用会直接暴露语法错误。</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0">
  <div class="tok-row">
    <div class="tok t-v">动词现在 -는</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">不看收音，统一接 는</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하는 사람</span><span style="font-size:14px;color:#5a4640">学习的人</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹는 음식</span><span style="font-size:14px;color:#5a4640">吃的食物</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">形容词 -은/ㄴ</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">有收音→-은，无收音→-ㄴ</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어려운 문법</span><span style="font-size:14px;color:#5a4640">难的语法</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">좋은 노래</span><span style="font-size:14px;color:#5a4640">好听的歌</span></div>
  </div>
  <div class="tok-row">
    <div class="tok t-v">动词未来 -을/ㄹ</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">有收音→-을，无收音→-ㄹ</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">갈 곳</span><span style="font-size:14px;color:#5a4640">要去的地方</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹을 것</span><span style="font-size:14px;color:#5a4640">要吃的东西</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">있다/없다 特殊规则</div>
  <div style="font-size:15px;color:#241917">있다/없다 虽然是形容词，但冠词形用动词规则 <b>-는</b>：있는 사람 / 없는 것</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">ㅂ 不规则：어렵다 → 어려운（-다 前 ㅂ→우，再接 -ㄴ）</div>
</div>
<div class="reminder-box">좋는 노래 ✗ → 좋은 노래 ✓ — 形容词有收音用 -은，不用 -는。공부한 사람 ✗（习惯）→ 공부하는 사람 ✓ — 习惯动作用现在冠词形 -는。</div>`,
    compareLabel: '동사 -는 vs 형용사 -은/ㄴ',
    structures: [
      {
        ko: '동사 + -는 + 명사',
        zh: '动词 + -는 + 名词 = 做……的名词',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '형용사 (받침 O) + -은 + 명사',
        zh: '有收音形容词 + -은 + 名词',
        tokens: [
          { text: '형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-은', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '동사 + -을/ㄹ + 명사',
        zh: '动词 + -을/ㄹ + 名词 = 要做……的名词',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-을/ㄹ', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '지금 듣는 노래가 좋아요.',
        zh: '现在听的歌很好听。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '듣는', role: 'verb' },
          { text: '노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在冠词形 -는：直接接词干', examples: '가다→가는 / 먹다→먹는 / 듣다→듣는 / 공부하다→공부하는' },
      { type: 'rule', text: '形容词有收音 -은', examples: '좋다→좋은 / 작다→작은 / 많다→많은' },
      { type: 'rule', text: '形容词无收音 -ㄴ', examples: '예쁘다→예쁜 / 바쁘다→바쁜 / 크다→큰' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려운 / 가볍다→가벼운' },
      { type: 'rule', text: '动词未来冠词形 -을/ㄹ：有收音→-을；无收音→-ㄹ', examples: '먹다→먹을 / 가다→갈 / 보다→볼 / 듣다（ㄷ不规则）→들을' },
      { type: 'note', text: '动词过去冠词形 -은/ㄴ（已完成）：和形容词 -은/ㄴ 同形，靠词性区分', examples: '먹다→먹은 음식（吃过的食物）；가다→간 곳（去过的地方）' },
      { type: 'example', text: '교재 예문：한국어를 공부하는 사람 / 좋은 노래를 들어요 / 내일 갈 곳이 있어요 / 오늘 배울 문법' },
      { type: 'compare', text: '动词过去 vs 形容词现在：먹은（动词过去）vs 작은（形容词现在）— 形态相同，靠词性区分意思' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '공부하는', role: 'verb' },
          { text: '사람이에요', role: 'verb' },
        ],
        zh: '是学习韩语的人。',
        swapWords: ['공부하는 사람', '좋아하는 사람', '가르치는 사람'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '듣는', role: 'verb' },
          { text: '노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '现在听的歌很好听。',
        swapRole: 'subject',
          swapWords: ['듣는 노래', '배우는 노래', '외우는 노래'],
      },
      {
        wordBlocks: [
          { text: '어려운', role: 'verb' },
          { text: '문법은', role: 'subject' },
          { text: '천천히 공부해요', role: 'verb' },
        ],
        zh: '难的语法慢慢学。',
        swapRole: 'subject',
          swapWords: ['어려운 문법', '재미있는 문법', '중요한 문법'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '갈 곳이', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '明天有要去的地方。',
        swapWords: ['갈 곳', '볼 곳', '먹을 곳'],
        swapRole: 'place',
      },
    ],
    scenarios: [
      { icon: '👤', context: '描述人物', ko: '한국어를 공부하는 사람이에요.', zh: '是学习韩语的人。' },
      { icon: '🎵', context: 'KPOP 歌曲', ko: '지금 듣는 노래가 정말 좋아요.', zh: '现在听的歌真的很好听。' },
      { icon: '📚', context: '内容拆解', ko: '오늘 배울 문법이 어렵지 않아요.', zh: '今天要学的语法不难。' },
      { icon: '🗺️', context: '旅行计划', ko: '내일 갈 곳을 찾고 있어요.', zh: '正在找明天要去的地方。' },
      { icon: '✏️', context: '学习建议', ko: '어려운 문법은 천천히 공부하세요.', zh: '难的语法请慢慢学。' },
      { icon: '🍜', context: '饮食选择', ko: '먹을 음식을 골라요.', zh: '选要吃的食物。' },
    ],
    mistakes: [
      { wrong: '좋는 노래 (형용사+는)', correct: '좋은 노래', note: '形容词不用 -는，有收音用 -은：좋다→좋은' },
      { wrong: '공부한 사람 (想说学习的人)', correct: '공부하는 사람', note: '-은/ㄴ 接动词表示已完成（过去），现在/习惯用 -는' },
      { wrong: '내일 가는 곳 (强调将要去)', correct: '내일 갈 곳', note: '未来/未完成用 -을/ㄹ：가다→갈 곳' },
      { wrong: '어렵는 문법', correct: '어려운 문법', note: 'ㅂ 不规则：어렵다→어려운（ㅂ→우）' },
    ],
    quickTable: {
      title: '관형형 변형표',
      headers: ['类型', '接续', '例子'],
      rows: [
        ['动词（现在）', '词干 + -는', '공부하다→공부하는 사람'],
        ['形容词（有收音）', '词干 + -은', '좋다→좋은 노래'],
        ['形容词（无收音）', '词干 + -ㄴ', '예쁘다→예쁜 사진'],
        ['动词（未来，有收音）', '词干 + -을', '먹다→먹을 음식'],
        ['动词（未来，无收音）', '词干 + -ㄹ', '가다→갈 곳'],
        ['ㅂ 不规则', 'ㅂ→우+ㄴ', '어렵다→어려운 문법'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>관형형 완성！</div>
  <div class='ov-sub'>动词形容词都能修饰名词了</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>동사 -는</span> 공부하는 사람</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>형용사 -은/ㄴ</span> 좋은 노래 / 예쁜 사진</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>미래 -을/ㄹ</span> 갈 곳 / 먹을 음식</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 형용사는 -는 쓰지 않음</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l06',
    partNumber: 5,
    lessonNumber: 6,
    title: '-아/어/여 주다, -지요?',
    whatItDoes: '请别人帮忙，或用"对吧"确认',
    whatItDoesBody: '-아/어/여 주세요 表示"请帮我……"；\n-지요? 表示确认语气"……吧？对吧？"，口语常缩成 -죠?。\n-아/어/여 주세요 是韩国人在餐厅、课堂、服务场合最常说的请求方式，也是最礼貌的说法。\n中文"请帮我做"靠独立词"帮/请"，韩语把"帮"嵌入词尾 주세요，不能单独拆出来用。',
    structureNote: '两块内容：①-아/어/여 주세요（请帮我做）变形和 -아요/어요 一样，加 주세요；\n②-지요?/-죠?（确认语气）直接接词干，不看收音，用于寻求对方同意或确认。',
    rulesNote: '-아/어/여 주세요 变形：\n词干末元音 ㅏ/ㅗ→아 주세요，其他→어 주세요，하다→해 주세요。\n-지요? 口语几乎总缩成 -죠?。\n注意：\n주세요 是对对方的请求，주다 用于对第三方（친구한테 선물을 줘요）。',
    scenarioNote: '"请慢点说""请再说一遍""这首歌很好听吧？"-아/어/여 주세요 在任何需要帮助的场合都用得到，-죠? 在分享感受、确认信息时是最自然的语气。\n这节课学完，你的对话立刻更流畅自然。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-아/어/여 주다 · -지요?</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">请别人帮忙，或用"吧？"确认。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">다시 말해 주세요.</span> — 请再说一遍。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 단어를 알려 주세요.</span> — 请告诉我这个单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">이 문법은 어렵지요?</span> — 这个语法很难吧？</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两块内容</div>
  <div style="margin-bottom:6px">① <b>-아/어/여 주세요</b> — 请帮我做（礼貌请求）<br><span style="color:#89756e;font-size:.9rem">变形和 -아요/어요 一样，再加 주세요</span></div>
  <div>② <b>-지요? / -죠?</b> — ……吧？（确认语气）<br><span style="color:#89756e;font-size:.9rem">直接接词干，口语常缩成 -죠?</span></div>
</div>
<div class="reminder-box">말하다 주세요 ✗ → 말해 주세요 ✓ — 주세요 前先变 아/어/여 形。-지요? 是确认，不是否定（어렵지요? ≠ 어렵지 않아요）。</div>`,
    compareHtml: `<div class="card-title">-아/어/여 주세요（请求）vs -지요?（确认）</div>
<div class="card-body">两者都是常用对话工具：주세요 用于请别人帮忙做某事，-지요? 用于寻求对方同意或确认信息。前者是请求，后者是引导共鸣或确认。中文"请……"和"……吧？"是这两个的最直接对应。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어/여 주세요</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">礼貌请求：请帮我做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">기다려 주세요.</span><span style="font-size:14px;color:#5a4640">请等一下。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">천천히 말해 주세요.</span><span style="font-size:14px;color:#5a4640">请说慢一点。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지요? / -죠?</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">确认语气：……吧？对吧？</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있죠?</span><span style="font-size:14px;color:#5a4640">有意思吧？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어 공부하지요?</span><span style="font-size:14px;color:#5a4640">你在学韩语吧？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-아/어/여 주세요 变形规则</div>
  <div style="font-size:15px;color:#241917">阳性元音（아/오）→ <b>아 주세요</b>：봐 주세요 / 도와주세요</div>
  <div style="font-size:15px;color:#241917">其他元音 → <b>어 주세요</b>：읽어 주세요 / 가르쳐 주세요</div>
  <div style="font-size:15px;color:#241917">하다 → <b>해 주세요</b>：설명해 주세요 / 전화해 주세요</div>
</div>
<div class="reminder-box">도움 주세요 ✗ → 도와주세요 ✓ — 帮忙是固定合写形。기다리어 주세요 ✗ → 기다려 주세요 ✓ — ㅣ+어→여 缩合。-지요? 口语缩为 -죠?，意思完全相同。</div>`,
    compareLabel: '주세요（请求）vs -지요?（确认）',
    structures: [
      {
        ko: '동사 + -아/어/여 주세요',
        zh: '动词 + -아/어/여 주세요 = 请帮我……',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여 주세요', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 + -지요?',
        zh: '动词/形容词 + -지요? = ……吧？',
        tokens: [
          { text: '동사/형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지요?', role: 'plain' },
        ],
      },
      {
        ko: '다시 말해 주세요.',
        zh: '请再说一遍。',
        tokens: [
          { text: '다시', role: 'plain' },
          { text: '말해 주세요', role: 'verb' },
        ],
      },
      {
        ko: '이 문법은 어렵지요?',
        zh: '这个语法很难吧？',
        tokens: [
          { text: '이 문법은', role: 'subject' },
          { text: '어렵지요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여 주세요 变形：词干末元音 ㅏ/ㅗ→아 주세요；其他→어 주세요；하다→해 주세요' },
      { type: 'vocab', text: '常用合成形', examples: '도와주세요（돕다+주다）/ 알려 주세요（알리다+주다）/ 보여 주세요（보이다+주다）' },
      { type: 'usage', text: '-아/어/여 줘요：为对方做某事（非请求）', examples: '친구에게 알려 줘요（告诉朋友）' },
      { type: 'note', text: '-지요 可缩略成 -죠', examples: '어렵죠? / 좋죠? / 재미있죠?（口语常用）' },
      { type: 'note', text: '-지요? 是确认，不是否定', examples: '어렵지요?（很难吧）≠ 어렵지 않아요（不难）' },
      { type: 'example', text: '교재 예문：다시 말해 주세요 / 이 단어를 알려 주세요 / 천천히 들려 주세요 / 이 문법은 어렵지요?' },
      { type: 'usage', text: '주다 敬語：주세요（请给/请做）→ 드리다（我给长辈）', examples: '선생님께 드려요（我给老师）' },
      { type: 'vocab', text: '드리다 用法', examples: '선생님께 말씀드려요 / 부모님께 선물을 드려요（드리다 = 주다 的谦让形）' },
      { type: 'example', text: '-지요? 过去形：-았지요?/-었지요?', examples: '어제 공부했지요?（昨天学习了吧？）/ 맛있었지요?（很好吃吧？）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '다시', role: 'plain' },
          { text: '말해 주세요', role: 'verb' },
        ],
        zh: '请再说一遍。',
        swapWords: ['말해 주세요', '들려 주세요', '설명해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 단어를', role: 'object' },
          { text: '알려 주세요', role: 'verb' },
        ],
        zh: '请告诉我这个单词。',
        swapWords: ['알려 주세요', '저장해 주세요', '찾아 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '기다려', role: 'verb' },
          { text: '주세요', role: 'verb' },
        ],
        zh: '请等一下。',
        swapWords: ['기다려 주세요', '도와주세요', '확인해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있지요?', role: 'verb' },
        ],
        zh: '韩语很有意思吧？',
        swapRole: 'verb',
          swapWords: ['재미있지요?', '어렵지요?', '좋지요?'],
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '课堂请求', ko: '다시 한번 말해 주세요.', zh: '请再说一遍。' },
      { icon: '📱', context: 'App 功能', ko: '이 단어를 저장해 주세요.', zh: '请保存这个单词。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '천천히 들려 주세요.', zh: '请慢慢放给我听。' },
      { icon: '💬', context: '学习确认', ko: '이 문법은 어렵지요?', zh: '这个语法很难吧？' },
      { icon: '🤝', context: '请求帮忙', ko: '좀 도와주세요.', zh: '请帮帮我。' },
      { icon: '✅', context: '互动确认', ko: '재미있죠?', zh: '有意思吧？' },
    ],
    mistakes: [
      { wrong: '말하다 주세요.', correct: '말해 주세요.', note: '주세요 前要先变 아/어/여 形：말하다→말해 주세요' },
      { wrong: '어렵지요? / 어렵지 않아요. (混淆)', correct: '어렵지요?（难吧）vs 어렵지 않아요.（不难）', note: '-지요? 是确认疑问；-지 않아요 是否定陈述' },
      { wrong: '도움 주세요. (想说请帮忙)', correct: '도와주세요.', note: '도와주다 是固定合写形，帮忙=도와주세요' },
      { wrong: '기다리어 주세요.', correct: '기다려 주세요.', note: '기다리다 词干末元音 ㅣ+어→여：기다려 주세요' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['原形', '-아/어/여 주세요', '-지요?'],
      rows: [
        ['가다 去', '가 주세요 请帮我去', '가지요? 去吧？'],
        ['먹다 吃', '먹어 주세요 请帮我吃', '먹지요? 吃吧？'],
        ['하다 做', '해 주세요 请帮我做', '하지요? 做吧？'],
        ['기다리다 等待', '기다려 주세요 请等一下', '기다리지요? 等吧？'],
        ['어렵다 难', '—', '어렵지요? 很难吧？'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>주세요 · -지요? 완성！</div>
  <div class='ov-sub'>请求和确认，互动更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>주세요</span> 请帮：말해 주세요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>줘요</span> 给他人做：알려 줘요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>-지요?</span> 确认：어렵지요? / 어렵죠?</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 주세요 前先进行 아/어/여 变形</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l07',
    partNumber: 5,
    lessonNumber: 7,
    title: '电话号码的读法, 时间助词',
    whatItDoes: '读电话号码，说具体时间',
    whatItDoesBody: '电话号码用汉字数词逐个读；\n时间点用 에，时间范围用 부터…까지。\n这节课把P2的时间知识做综合应用数字读法、时间助词 에/부터/까지 全部整合在一起。\n和中文不同：\n中文"在三点"和"从三点到五点"用不同介词，韩语时间点用 에，时间范围用 부터…까지，分工明确。',
    structureNote: '三块内容：①电话号码读法（汉字数词逐位读，0读 공）；\n②시간+에（在某个时间点做）；\n③부터…까지（从某时到某时的范围）。\n时间点和时间范围是两种不同表达，不能混用。',
    rulesNote: '时间点用 에（세 시에 만나요），时间范围用 부터/까지（세 시부터 다섯 시까지）。\n0 在电话号码里读 공，不读 영。\n시（点）用固有数词，분（分）用汉字数词和P2学的一样，这节课再强化一遍。',
    scenarioNote: '"下午三点见""课程从十点到十一点""我的电话是010-xxxx-xxxx"约时间、说课程表、留联系方式，这三种场景每天都会碰到。\n掌握这节课，你能在韩国顺畅处理时间相关的对话。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">전화번호 읽기 · 시간 에/부터/까지</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">读电话号码，说在几点、从几点到几点。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">제 전화번호는 공일공 일이삼사 오육칠팔이에요.</span> — 我的电话是010-1234-5678。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오후 세 시에 만나요.</span> — 下午三点见。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">세 시부터 다섯 시까지 공부해요.</span> — 从三点到五点学习。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三块内容</div>
  <div style="margin-bottom:6px">① <b>电话号码</b> — 用汉字数词逐位读，0读 공<br><span style="color:#89756e;font-size:.9rem">010-1234-5678 → 공일공 일이삼사 오육칠팔</span></div>
  <div style="margin-bottom:6px">② <b>시간 + 에</b> — 在某个时间点做（세 시에 만나요）</div>
  <div>③ <b>부터…까지</b> — 从某时到某时（세 시부터 다섯 시까지）</div>
</div>
<div class="reminder-box">시（点）用固有数词：한/두/세/네 시；분（分）用汉字数词：십 분/삼십 분。时间点 에 和时间范围 부터…까지 不能混用。</div>`,
    compareHtml: `<div class="card-title">시간 에（时间点）vs 부터…까지（时间范围）</div>
<div class="card-body">两者都表示时间，但用途不同：에 指某个具体时刻（在三点），부터…까지 表示一段时间范围（从三点到五点）。不能互换，用错会让对方不知道你说的是时刻还是时段。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">시간 + 에</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">时间点：在……（某一刻）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 시에 만나요.</span><span style="font-size:14px;color:#5a4640">三点见。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아침 여덟 시에 일어나요.</span><span style="font-size:14px;color:#5a4640">早上八点起床。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">부터…까지</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">时间范围：从……到……</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 시부터 다섯 시까지</span><span style="font-size:14px;color:#5a4640">从三点到五点</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">월요일부터 금요일까지 일해요.</span><span style="font-size:14px;color:#5a4640">从周一到周五工作。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">时间数词读法</div>
  <div style="font-size:15px;color:#241917">小时（시）→ 固有数词：한 시 / 두 시 / 세 시 … 열두 시</div>
  <div style="font-size:15px;color:#241917">分钟（분）→ 汉字数词：일 분 / 십오 분 / 삼십 분</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">3:30 = 세 시 삼십 분 / 口语：세 시 반（半）</div>
</div>
<div class="reminder-box">세 시에부터 ✗ → 세 시부터 ✓ — 부터 直接加在时间词后，不加 에。세 시에 만나요（在三点见）vs 세 시부터 공부해요（从三点开始学）— 一个是时刻，一个是起点。</div>`,
    compareLabel: '시간 에（时间点）vs 부터…까지（时间范围）',
    structures: [
      {
        ko: '전화번호：숫자를 하나씩 읽어요',
        zh: '电话号码：用汉字数词逐个读',
        tokens: [
          { text: '010', role: 'plain' },
          { text: '→', role: 'plain' },
          { text: '공일공', role: 'plain' },
        ],
      },
      {
        ko: '시간 + 에 + 동사',
        zh: '时间点 + 에 + 动词',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '+', role: 'plain' },
          { text: '에', role: 'plain' },
          { text: '동사', role: 'verb' },
        ],
      },
      {
        ko: '시간 + 부터 + 시간 + 까지',
        zh: '时间 + 부터 + 时间 + 까지',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '부터', role: 'plain' },
          { text: '시간', role: 'time' },
          { text: '까지', role: 'plain' },
        ],
      },
      {
        ko: '수업은 열 시부터 열한 시까지예요.',
        zh: '课程是十点到十一点。',
        tokens: [
          { text: '수업은', role: 'subject' },
          { text: '열 시부터', role: 'time' },
          { text: '열한 시까지예요', role: 'time' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '电话号码用汉字数词逐个读', examples: '0=공 / 1=일 / 2=이 / 3=삼 / 4=사 / 5=오 / 6=육 / 7=칠 / 8=팔 / 9=구' },
      { type: 'example', text: '전화번호 읽는 법', examples: '010-1234-5678 → 공일공 일이삼사 오육칠팔（分组读，用停顿隔开）' },
      { type: 'rule', text: '时间：시（点）用固有数词，분（分）用汉字数词', examples: '한 시 / 두 시 / 세 시 / 네 시 / 다섯 시…열두 시 / 십 분 / 삼십 분 / 오십오 분' },
      { type: 'rule', text: '时间 + 에：时间点助词', examples: '세 시에 만나요 / 오전 열 시에 시작해요' },
      { type: 'usage', text: '부터…까지：시간/장소 범위', examples: '세 시부터 다섯 시까지 / 월요일부터 금요일까지' },
      { type: 'example', text: '교재 예문：전화번호가 뭐예요? / 팬미팅은 오후 두 시에 시작해요 / 수업은 열 시부터 열한 시까지예요' },
      { type: 'vocab', text: '전화번호 형식', examples: '02-1234-5678（지역번호-국번-번호）/ 핸드폰：010-xxxx-xxxx' },
      { type: 'note', text: '분（分）用汉字数词（이 분/삼십 분），시（点）用固有数词（두 시/세 시）——不能混用' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오후', role: 'time' },
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '下午三点见。',
        swapWords: ['세 시에', '두 시에', '네 시에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '세 시부터', role: 'time' },
          { text: '다섯 시까지', role: 'time' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '从三点到五点学习。',
        swapWords: ['세 시부터 다섯 시까지', '한 시부터 두 시까지', '오전 열 시부터 열한 시까지'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '전화번호가', role: 'subject' },
          { text: '뭐예요?', role: 'verb' },
        ],
        zh: '电话号码是多少？',
        swapRole: 'subject',
          swapWords: ['전화번호가 뭐예요?', '번호가 어떻게 돼요?', '연락처가 뭐예요?'],
      },
      {
        wordBlocks: [
          { text: '팬미팅은', role: 'subject' },
          { text: '오후 두 시에', role: 'time' },
          { text: '시작해요', role: 'verb' },
        ],
        zh: '粉丝见面会下午两点开始。',
        swapWords: ['두 시에', '세 시에', '다섯 시에'],
        swapRole: 'time',
      },
    ],
    scenarios: [
      { icon: '📞', context: '交换联系方式', ko: '전화번호가 뭐예요?', zh: '电话号码是多少？' },
      { icon: '🕒', context: '约见时间', ko: '오후 세 시에 만나요.', zh: '下午三点见。' },
      { icon: '📚', context: '学习时间', ko: '세 시부터 다섯 시까지 공부해요.', zh: '从三点到五点学习。' },
      { icon: '🎵', context: 'KPOP 活动', ko: '팬미팅은 오후 두 시에 시작해요.', zh: '粉丝见面会下午两点开始。' },
      { icon: '🏫', context: '课程安排', ko: '수업은 열 시부터 열한 시까지예요.', zh: '课程是十点到十一点。' },
      { icon: '📅', context: '周间安排', ko: '월요일부터 금요일까지 학교에 가요.', zh: '从周一到周五去学校。' },
    ],
    mistakes: [
      { wrong: '전화번호를 하나/둘/셋으로 읽음', correct: '공일공 일이삼사 오육칠팔', note: '电话号码用汉字数词，不用固有数词' },
      { wrong: '세 삼 시에 만나요. (混用数词)', correct: '세 시에 만나요.', note: '小时用固有数词（세），不是汉字数词（삼）' },
      { wrong: '세 시에부터 공부해요.', correct: '세 시부터 공부해요.', note: '부터 直接接时间词，不在 에 之后再加' },
      { wrong: '시간 에 없음 (忘记时间点加 에)', correct: '세 시에 만나요.', note: '时间点后必须加 에：세 시에 / 오전 열 시에' },
    ],
    quickTable: {
      title: '시간 표현표',
      headers: ['表达', '助词', '例子'],
      rows: [
        ['时间点', '에', '세 시에 만나요'],
        ['时间范围起点', '부터', '세 시부터'],
        ['时间范围终点', '까지', '다섯 시까지'],
        ['完整范围', '부터…까지', '세 시부터 다섯 시까지'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>전화번호 · 시간 助词 완성！</div>
  <div class='ov-sub'>数字和时间，日常生活都能说</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>전화번호</span> 공일공 일이삼사 오육칠팔</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>시간 + 에</span> 세 시에 만나요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>부터…까지</span> 세 시부터 다섯 시까지</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 시간=固有数词 / 전화번호=汉字数词</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l08',
    partNumber: 5,
    lessonNumber: 8,
    title: '을/를 타다, 타고 가다/오다, (으)로 가다/오다',
    whatItDoes: '说坐什么交通工具去/来',
    whatItDoesBody: '을/를 타다 表示乘坐；\n타고 가다/오다 表示坐着去/来；\n(으)로 가다/오다 表示用某交通方式去/来。\n三种说法意思相近，区别在强调点：\n타고 强调"坐上再走"的动作，(으)로 强调"用这种方式"。\n中文"坐地铁去"是三个独立词，韩语要选择 타고 或 (으)로 两种不同结构，还需判断有无收音来选 으로/로。',
    structureNote: '三个表达方式：①타요（单独说乘坐）；\n②타고 가요/와요（坐上后去/来，强调动作连续）；\n③(으)로 가요/와요（用某方式去/来，更简洁）。\n日常口语中 타고 和 (으)로 都常用，可互换。',
    rulesNote: '타고 가다 中的 타고 是 타다+-고 的连接形（已学）。\n(으)로 的收音规则：\n有收音→으로，无收音/ㄹ→로（버스로/지하철로）。\n걸어서 가요（走着去）是例外走路不用 타다，用 걸어서。',
    scenarioNote: '"坐地铁去公司""坐飞机去韩国""坐公交去学校"说出行方式是日常对话中最基础的场景之一。\n掌握这节课，你能流畅描述交通出行，在韩国问路和回答都没问题。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">을/를 타다 · 타고 가다 · (으)로 가다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说坐什么交通工具去或来。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">버스를 타고 학교에 가요.</span> — 坐公交去学校。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">지하철로 회사에 가요.</span> — 坐地铁去公司。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">걸어서 집에 와요.</span> — 走着回家。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种表达</div>
  <div style="margin-bottom:6px">① <b>교통수단 + 을/를 타요</b> — 单独说"乘坐"（버스를 타요）</div>
  <div style="margin-bottom:6px">② <b>교통수단 + 을/를 타고 가요</b> — 坐上后去（强调动作连续）</div>
  <div>③ <b>교통수단 + (으)로 가요</b> — 用某方式去（更简洁，日常常用）</div>
</div>
<div class="reminder-box">걸어서 가요（走着去）— 走路不用 타다，用 걸어서。(으)로 的收音规则：有收音→으로（지하철로），无收音/ㄹ收音→로（버스로）。</div>`,
    compareHtml: `<div class="card-title">타고 가다（坐上再去）vs (으)로 가다（用某方式去）</div>
<div class="card-body">两者都表示乘交通工具出行，意思几乎相同，但结构不同：타고 가다 是两个动词连接（坐上+去），(으)로 가다 是方式助词+去。日常口语两者都自然，但走路固定用 걸어서，不能替换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">교통수단을 타고 가다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">坐上后去（动作连接）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스를 타고 가요.</span><span style="font-size:14px;color:#5a4640">坐公交去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철을 타고 왔어요.</span><span style="font-size:14px;color:#5a4640">坐地铁来的。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">교통수단(으)로 가다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">用某方式去（方式助词）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스로 가요.</span><span style="font-size:14px;color:#5a4640">坐公交去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철로 왔어요.</span><span style="font-size:14px;color:#5a4640">坐地铁来的。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">(으)로 收音规则</div>
  <div style="font-size:15px;color:#241917">无收音 / ㄹ收音 → <b>로</b>：버스로 / 택시로 / 지하철로 / 자전거로</div>
  <div style="font-size:15px;color:#241917">有收音（非ㄹ）→ <b>으로</b>：（交通工具中少见，일반적으로 无收音/ㄹ收音 적용）</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">걸어서 가요（走路去）— 走路固定用 걸어서，不能说 발로 가요</div>
</div>
<div class="reminder-box">버스를 타고 가요 = 버스로 가요 — 两种说法都正确。걸어로 가요 ✗ → 걸어서 가요 ✓ — 走路固定用 걸어서。지하철을 타고 vs 지하철로：타고 更强调动作过程，로 更简洁。</div>`,
    compareLabel: '타고 가다 vs (으)로 가다',
    structures: [
      {
        ko: '교통수단 + 을/를 타요',
        zh: '交通工具 + 을/를 타요 = 乘坐……',
        tokens: [
          { text: '교통수단', role: 'object' },
          { text: '을/를', role: 'plain' },
          { text: '타요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + 을/를 타고 + 장소에 가요',
        zh: '交通工具 + 을/를 타고 + 去地点',
        tokens: [
          { text: '교통수단을', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '장소에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + (으)로 + 장소에 가요',
        zh: '交通工具 + (으)로 + 去地点',
        tokens: [
          { text: '교통수단으로/로', role: 'plain' },
          { text: '장소에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '비행기를 타고 한국에 가요.',
        zh: '坐飞机去韩国。',
        tokens: [
          { text: '비행기를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '한국에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '을/를 타다：交通工具 + 目的格助词', examples: '버스를 타요 / 지하철을 타요 / 택시를 타요 / 비행기를 타요' },
      { type: 'rule', text: '타고 가다/오다：坐上后连接移动', examples: '버스를 타고 가요 / 택시를 타고 와요' },
      { type: 'rule', text: '(으)로 가다：ㄹ收音/无收音→로；有收音（非ㄹ）→으로', examples: '지하철로 / 버스로 / 택시로' },
      { type: 'note', text: '지하철 是 ㄹ 收音，用 로', examples: '지하철로（不是 지하철으로）' },
      { type: 'compare', text: '两种表达都可以：버스를 타고 가요 ＝ 버스로 가요（语感略有不同，口语都自然）' },
      { type: 'example', text: '교재 예문：버스를 타고 학교에 가요 / 지하철로 회사에 가요 / 비행기를 타고 한국에 가요 / 택시를 타고 콘서트장에 가요' },
      { type: 'example', text: '추가 교재 대화：어떻게 오셨어요? / 버스로 왔어요 / 지하철로 오는 게 더 빨라요' },
      { type: 'compare', text: '方式助词总结：(으)로（手段/方式）vs 을/를 타고（乘坐）', examples: '택시를 타고 가요 / 버스로 가요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '버스를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐公交去学校。',
        swapWords: ['버스를 타고', '지하철을 타고', '택시를 타고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지하철로', role: 'plain' },
          { text: '회사에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐地铁去公司。',
        swapWords: ['지하철로', '버스로', '택시로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '비행기를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '한국에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐飞机去韩国。',
        swapWords: ['한국에 가요', '일본에 가요', '제주도에 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '택시를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '콘서트장에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐出租车去演唱会场馆。',
        swapWords: ['택시를 타고', '버스를 타고', '지하철을 타고'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌', context: '上学', ko: '버스를 타고 학교에 가요.', zh: '坐公交去学校。' },
      { icon: '🚇', context: '上班', ko: '지하철로 회사에 가요.', zh: '坐地铁去公司。' },
      { icon: '✈️', context: '旅行', ko: '비행기를 타고 한국에 가요.', zh: '坐飞机去韩国。' },
      { icon: '🎵', context: 'KPOP 活动', ko: '택시를 타고 콘서트장에 가요.', zh: '坐出租车去演唱会场馆。' },
      { icon: '🚗', context: '接送', ko: '차로 공항에 가요.', zh: '坐车去机场。' },
      { icon: '🚶', context: '步行', ko: '걸어서 학교에 가요.', zh: '走路去学校。' },
    ],
    mistakes: [
      { wrong: '버스에 타요. (想说坐公交)', correct: '버스를 타요.', note: '타다 的对象用 을/를，基础表达记 버스를 타요' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'ㄹ 收音后用 로，不是 으로' },
      { wrong: '버스를 타고로 가요. (混用)', correct: '버스를 타고 가요. 或 버스로 가요.', note: '타고와 로 选一个，不能同时用' },
      { wrong: '택시에서 가요. (想说坐出租车去)', correct: '택시로 가요. 或 택시를 타고 가요.', note: '乘坐交通工具用 를 타고 或 로，不用 에서' },
    ],
    quickTable: {
      title: '교통 표현표',
      headers: ['交通工具', '을/를 타요', '(으)로 가요'],
      rows: [
        ['버스 公交车', '버스를 타요 乘公交车', '버스로 가요 坐公交去'],
        ['지하철 地铁', '지하철을 타요 乘地铁', '지하철로 가요 坐地铁去'],
        ['택시 出租车', '택시를 타요 乘出租车', '택시로 가요 坐出租去'],
        ['비행기 飞机', '비행기를 타요 乘飞机', '비행기로 가요 坐飞机去'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>타다 · 타고 가다 · (으)로 가다 완성！</div>
  <div class='ov-sub'>交通表达让出行描述更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>을/를 타요</span> 버스를 타요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>타고 가요</span> 버스를 타고 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>(으)로 가요</span> 지하철로 가요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 지하철로（ㄹ 받침 뒤에 로）</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l09',
    partNumber: 5,
    lessonNumber: 9,
    title: '을/를 갈아타다, (으)로 갈아타다',
    whatItDoes: '说换乘、中途转车',
    whatItDoesBody: '갈아타다 表示换乘；\n을/를 갈아타다 强调换乘对象；\n(으)로 갈아타다 强调换成什么；\nA에서 B로 갈아타다 表示从A换到B。\n갈아타다 是 타다（乘）的扩展갈아 表示"换"，合起来就是"换着乘/转乘"。\n和中文不同：\n中文"换乘地铁"直接搭配，韩语需要用助词区分"换哪条线"（을/를）和"换成什么"（(으)로），表达更精确。',
    structureNote: '这节课是上节课 타다/(으)로 가다 的延伸，核心动词换成 갈아타다。\n三种表达：①을/를 갈아타요（换乘某工具）；\n②(으)로 갈아타요（换成某方向）；\n③A에서 B로 갈아타요（从A换到B，最完整）。',
    rulesNote: '갈아타다 的助词选择和 타다 一样：\n宾语位置用 을/를，方向/工具位置用 (으)로。\n起点用 에서（버스에서），终点用 (으)로（지하철로）。\n次数说法：\n두 번 갈아타야 해요（要换两次）。',
    scenarioNote: '"在这里换乘2号线""从公交换地铁""要换几次"问路和乘车时这类表达必不可少。\n去韩国旅行、坐地铁换乘都会用到。\n这节课配合上节课，出行对话就完整了。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">갈아타다 · A에서 B로 갈아타다</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说中途换乘、转车。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">버스에서 지하철로 갈아타요.</span> — 从公交换乘地铁。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이호선으로 갈아타세요.</span> — 请换乘2号线。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">두 번 갈아타야 해요.</span> — 要换乘两次。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三种表达</div>
  <div style="margin-bottom:6px">① <b>교통수단 + 을/를 갈아타요</b> — 换乘某工具</div>
  <div style="margin-bottom:6px">② <b>(으)로 갈아타요</b> — 换成某工具/方向（更常用）</div>
  <div>③ <b>A에서 B로 갈아타요</b> — 从A换到B（最完整，问路用）</div>
</div>
<div class="reminder-box">갈아타다 = 갈아（换）+ 타다（乘坐）。起点用 에서，终点用 (으)로：버스에서 지하철로 갈아타요。次数说法：한 번/두 번 갈아타야 해요。</div>`,
    compareHtml: `<div class="card-title">타다（乘坐）vs 갈아타다（换乘）</div>
<div class="card-body">타다 是最初上车乘坐，갈아타다 是途中换乘另一辆。两个词的助词用法也不同：타다 用目的格 을/를，갈아타다 用方向助词 (으)로，起点用 에서 标出。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 타다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">乘坐（上车，宾语 을/를）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지하철을 타요.</span><span style="font-size:14px;color:#5a4640">坐地铁。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스를 탔어요.</span><span style="font-size:14px;color:#5a4640">坐了公交。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에서 (으)로 갈아타다</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">换乘（起点 에서 + 目标 (으)로）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">버스에서 지하철로 갈아타요.</span><span style="font-size:14px;color:#5a4640">从公交换地铁。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">2호선에서 3호선으로 갈아타세요.</span><span style="font-size:14px;color:#5a4640">从2号线换3号线。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">换乘次数表达</div>
  <div style="font-size:15px;color:#241917">한 번 갈아타요（换一次乘）/ 두 번 갈아타요（换两次）</div>
  <div style="font-size:15px;color:#241917">환승 없이 가요（不换乘直达）</div>
  <div style="font-size:15px;color:#89756e;margin-top:4px">어디서 갈아타요?（在哪换乘？）— 问路必备句型</div>
</div>
<div class="reminder-box">지하철을 갈아타요（换乘地铁，强调对象）= 지하철로 갈아타요（换乘地铁，强调方向）— 两种说法都正确，口语中 (으)로 갈아타다 更常用。어디서 갈아타요?（在哪换乘？）是问路必备句型。</div>`,
    compareLabel: '타다（乘坐）vs 갈아타다（换乘）',
    structures: [
      {
        ko: '교통수단 + 을/를 갈아타요',
        zh: '交通工具 + 을/를 갈아타요 = 换乘……',
        tokens: [
          { text: '교통수단', role: 'object' },
          { text: '을/를', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: '교통수단 + (으)로 갈아타요',
        zh: '换成……（방향 강조）',
        tokens: [
          { text: '교통수단', role: 'plain' },
          { text: '(으)로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: 'A에서 B로 갈아타요',
        zh: '从A换到B',
        tokens: [
          { text: 'A에서', role: 'place' },
          { text: 'B로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
      {
        ko: '버스에서 지하철로 갈아타요.',
        zh: '从公交换乘地铁。',
        tokens: [
          { text: '버스에서', role: 'place' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '을/를 갈아타다：强调换乘对象（换的是什么）', examples: '지하철을 갈아타요 / 버스를 갈아타요' },
      { type: 'rule', text: '(으)로 갈아타다：强调换乘方向（换成什么方向）', examples: '지하철로 갈아타요 / 버스로 갈아타요' },
      { type: 'usage', text: 'A에서 B로 갈아타요：从A换到B', examples: '버스에서 지하철로 갈아타요 / 지하철에서 버스로 갈아타요' },
      { type: 'rule', text: '(으)로 接续：ㄹ收音/无收音→로；有收音（非ㄹ）→으로', examples: '지하철로 / 버스로 / 택시로' },
      { type: 'vocab', text: '换乘次数表达', examples: '한 번 갈아타요（换乘一次）/ 두 번 갈아타야 해요（要换乘两次）' },
      { type: 'example', text: '교재 예문：버스에서 지하철로 갈아타요 / 학교에 가려면 지하철로 갈아타야 해요 / 콘서트장에 가려면 두 번 갈아타야 해요' },
      { type: 'example', text: '추가 교재 예문：텐진에서 비행기로 갈아타요（在天津换乘飞机）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '버스에서', role: 'place' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '从公交换乘地铁。',
        swapWords: ['지하철로 갈아타요', '버스로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '학교에', role: 'place' },
          { text: '가려면', role: 'verb' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타야 해요', role: 'verb' },
        ],
        zh: '想去学校的话，得换乘地铁。',
        swapWords: ['지하철로 갈아타야 해요', '버스로 갈아타야 해요', '한 번 갈아타야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '두 번', role: 'plain' },
          { text: '갈아타야 해요', role: 'verb' },
        ],
        zh: '要换乘两次。',
        swapWords: ['두 번', '한 번', '세 번'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '공항에서', role: 'place' },
          { text: '버스로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '在机场换乘公交。',
        swapWords: ['버스로 갈아타요', '지하철로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌🚇', context: '通勤换乘', ko: '버스에서 지하철로 갈아타요.', zh: '从公交换乘地铁。' },
      { icon: '🏫', context: '上学路线', ko: '학교에 가려면 지하철로 갈아타야 해요.', zh: '想去学校得换乘地铁。' },
      { icon: '🎵', context: '演唱会出行', ko: '콘서트장에 가려면 두 번 갈아타야 해요.', zh: '去演唱会场馆要换乘两次。' },
      { icon: '✈️', context: '机场到市区', ko: '공항에서 지하철로 갈아타요.', zh: '在机场换乘地铁。' },
      { icon: '🗺️', context: '路线说明', ko: '지하철에서 버스로 갈아타면 돼요.', zh: '从地铁换乘公交就好。' },
      { icon: '⏱️', context: '问路线', ko: '몇 번 갈아타야 해요?', zh: '要换乘几次？' },
    ],
    mistakes: [
      { wrong: '버스를 타다 지하철로. (想说换乘)', correct: '버스에서 지하철로 갈아타요.', note: '换乘要用 갈아타다，타다 只表示乘坐' },
      { wrong: '지하철으로 갈아타요.', correct: '지하철로 갈아타요.', note: 'ㄹ 收音后用 로，不是 으로' },
      { wrong: '갈아타다 와 타다 혼용', correct: '버스를 타요（乘坐）vs 지하철로 갈아타요（换乘）', note: '타다=乘坐；갈아타다=换乘，不能互换' },
      { wrong: '버스에 지하철로 갈아타요. (A用 에)', correct: '버스에서 지하철로 갈아타요.', note: '出发地（换乘前）用 에서，不是 에' },
    ],
    quickTable: {
      title: '갈아타기 표현표',
      headers: ['表达', '结构', '例子'],
      rows: [
        ['换乘某工具', 'B를 갈아타요', '지하철을 갈아타요'],
        ['换成某工具', 'B로 갈아타요', '지하철로 갈아타요'],
        ['从A换到B', 'A에서 B로 갈아타요', '버스에서 지하철로 갈아타요'],
        ['换乘N次', 'N번 갈아타야 해요', '두 번 갈아타야 해요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>갈아타다 완성！</div>
  <div class='ov-sub'>换乘表达让路线说明更清晰</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>B로 갈아타요</span> 换成地铁：지하철로 갈아타요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>A에서 B로</span> 从公交换地铁</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>N번 갈아타야 해요</span> 换乘N次</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 타다（乘坐）≠ 갈아타다（换乘）</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p5-l10',
    partNumber: 5,
    lessonNumber: 10,
    title: '-다가',
    whatItDoes: '说做着做着发生了变化',
    whatItDoesBody: '-다가 表示在做某动作的过程中发生变化、中断或切换，相当于"做着做着……"。\n中文"学着学着睡着了""看着看着哭了"这种"途中发生变化"的表达，韩语就用 -다가。',
    structureNote: '结构非常简单：\n动词词干直接加 -다가，不看收音，后句说发生的变化或结果。\n注意 -다가 和 -고 的区别：\n-고 是"做完A再做B"，-다가 是"做A途中（没做完）就发生了B"。',
    rulesNote: '-다가 直接接词干，无变形，不规则也不触发。\n关键是含义前句动作必须是"正在进行中/未完成"的状态，后句是中途发生的变化。\n可以缩略成 -다：\n공부하다 잠들었어요。',
    scenarioNote: '"追剧追着追着哭了""学习学着学着睡着了""走着走着迷路了"这类"做着做着"的描述在讲故事、聊日常经历时非常自然。\n掌握 -다가，你的韩语叙述能力会明显提升。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">-다가</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">说做着做着，中途发生了变化。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">공부하다가 잠들었어요.</span> — 学着学着睡着了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">드라마를 보다가 울었어요.</span> — 看电视剧看着看着哭了。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">길을 걷다가 친구를 만났어요.</span> — 走路走着走着遇见了朋友。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">结构与含义</div>
  <div style="margin-bottom:6px"><b>동사 词干 + -다가 + 变化/结果</b></div>
  <div style="margin-bottom:6px">前句动作：正在进行、<b>未完成</b></div>
  <div>后句：途中发生的变化或意外结果</div>
</div>
<div class="reminder-box">-다가 直接接词干，无需看收音，不规则也不触发。可缩略成 -다：공부하다 잠들었어요。和 -고 的区别：-고 是"做完A再做B"，-다가 是"做A途中（没做完）就B了"。</div>`,
    compareHtml: `<div class="card-title">-고（顺接/完成后）vs -다가（中途变化）</div>
<div class="card-body">-고 是做完A再做B（A完成），-다가 是做A途中发生了B（A未完成）。含义差别很大：-고 前句动作已结束，-다가 前句动作被中断或转向，两者不能随意替换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">顺接：A完成后做B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥을 먹고 공부해요.</span><span style="font-size:14px;color:#5a4640">吃完饭然后学习。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">샤워를 하고 잤어요.</span><span style="font-size:14px;color:#5a4640">洗完澡睡觉了。</span></div>
  </div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-다가</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">中途变化：做A途中发生B</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하다가 잠들었어요.</span><span style="font-size:14px;color:#5a4640">学着学着睡着了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">걷다가 넘어졌어요.</span><span style="font-size:14px;color:#5a4640">走着走着摔倒了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:10px">
  <div style="font-size:14px;font-weight:700;color:#ff7fa8;margin-bottom:6px">-다가 的三种用法</div>
  <div style="font-size:15px;color:#241917">① 动作中途中断：공부하다가 전화가 왔어요（学习中接到电话）</div>
  <div style="font-size:15px;color:#241917">② 方向转变：집에 가다가 슈퍼에 들렀어요（回家途中顺路去了超市）</div>
  <div style="font-size:15px;color:#241917">③ 意外发生：서다가 넘어졌어요（站着站着摔倒了）</div>
</div>
<div class="reminder-box">밥을 먹고 잠들었어요（吃完饭睡着了）vs 밥을 먹다가 잠들었어요（吃着吃着睡着了）— 一字之差，含义完全不同。-다가 接续：去掉 다 直接加 다가，所有不规则均不触发（다가 以辅音开头）。</div>`,
    compareLabel: '-고（顺接）vs -다가（中途变化）',
    structures: [
      {
        ko: '동사 어간 + -다가 + 변화/결과',
        zh: '动词词干 + -다가 + 变化/结果',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-다가', role: 'plain' },
          { text: '변화/결과', role: 'verb' },
        ],
      },
      {
        ko: '공부하다가 잠들었어요.',
        zh: '学着学着睡着了。',
        tokens: [
          { text: '공부하다가', role: 'verb' },
          { text: '잠들었어요', role: 'verb' },
        ],
      },
      {
        ko: '길을 걷다가 친구를 만났어요.',
        zh: '走路时遇见了朋友。',
        tokens: [
          { text: '길을', role: 'object' },
          { text: '걷다가', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
      },
      {
        ko: '노래를 듣다가 가사를 봤어요.',
        zh: '听歌听着听着看了歌词。',
        tokens: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-다가 接续：去掉 다 后接 다가', examples: '보다→보다가 / 먹다→먹다가 / 공부하다→공부하다가 / 듣다→듣다가' },
      { type: 'note', text: '-다가 接续时不规则基本不触发（辅音 ㄷ 앞）', examples: '듣다→듣다가（不是 들다가）/ 걷다→걷다가 / 쓰다→쓰다가' },
      { type: 'usage', text: '-다가 强调途中变化：前句动作未完成时后句发生', examples: '공부하다가 잠들었어요（学习中途睡着）' },
      { type: 'vocab', text: '后句常见搭配', examples: '잠들다 / 울다 / 웃다 / 만나다 / 보다（中断/切换/意外/发现）' },
      { type: 'compare', text: '-다가 vs -고：-고 是A完成后B；-다가 是做A途中B发生，前句动作未完成' },
      { type: 'example', text: '교재 예문：공부하다가 잠들었어요 / 드라마를 보다가 울었어요 / 길을 걷다가 친구를 만났어요 / 노래를 듣다가 가사를 봤어요' },
      { type: 'usage', text: '-다가 方向转换：常与移动动词搭配', examples: '먼저 5번 버스를 타고 가다가 명동역에서 내리세요' },
      { type: 'usage', text: '-다가 动作中断', examples: '똑바로 가다가 저기 백화점에서 내려 주세요（一直走，在那个百货店下）' },
      { type: 'note', text: '前后主语一致：-다가 前后主语必须是同一个人/物' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '공부하다가', role: 'verb' },
          { text: '잠들었어요', role: 'verb' },
        ],
        zh: '学着学着睡着了。',
        swapWords: ['공부하다가', '책을 읽다가', '단어를 외우다가'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '드라마를', role: 'object' },
          { text: '보다가', role: 'verb' },
          { text: '울었어요', role: 'verb' },
        ],
        zh: '看电视剧看着看着哭了。',
        swapWords: ['보다가 울었어요', '보다가 웃었어요', '보다가 잠들었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '听歌听着听着看了歌词。',
        swapWords: ['듣다가 가사를 봤어요', '듣다가 따라 했어요', '듣다가 저장했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '길을', role: 'object' },
          { text: '걷다가', role: 'verb' },
          { text: '친구를', role: 'object' },
          { text: '만났어요', role: 'verb' },
        ],
        zh: '走路时遇见了朋友。',
        swapWords: ['걷다가 친구를 만났어요', '걷다가 넘어졌어요', '걷다가 쉬었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😴', context: '学习中断', ko: '공부하다가 잠들었어요.', zh: '学着学着睡着了。' },
      { icon: '😢', context: '看剧哭了', ko: '드라마를 보다가 울었어요.', zh: '看剧看着看着哭了。' },
      { icon: '🎵', context: 'KPOP 学习', ko: '노래를 듣다가 가사를 봤어요.', zh: '听歌听着听着看了歌词。' },
      { icon: '🚶', context: '路上偶遇', ko: '길을 걷다가 친구를 만났어요.', zh: '走路时遇见了朋友。' },
      { icon: '📖', context: '阅读切换', ko: '단어를 외우다가 문장을 읽었어요.', zh: '背单词背着背着去读句子了。' },
      { icon: '😂', context: '意外发笑', ko: '공부하다가 웃겼어요.', zh: '学着学着觉得好笑。' },
    ],
    mistakes: [
      { wrong: '공부하다가 밥을 먹어요. (平铺两件事)', correct: '공부하고 밥을 먹어요.', note: '只是顺序做两件事用 -고；-다가 要有中途变化感' },
      { wrong: '들다가 가사를 봤어요. (듣다의 다가)', correct: '듣다가 가사를 봤어요.', note: '-다가 接续时 ㄷ 不规则不触发：듣다→듣다가（不是 들다가）' },
      { wrong: '-다가 后句没有变化（如学完继续学）', correct: '공부하다가 잠들었어요.（有变化）', note: '-다가 后句应有变化、中断、意外，不能前后完全无关' },
      { wrong: '먹다가 공부해요. (완성 후 공부)', correct: '먹고 공부해요.（완성 후）/ 먹다가 그만뒀어요.（중단）', note: '吃完后学习用 -고；吃到一半停下才用 -다가' },
    ],
    quickTable: {
      title: '-다가 변형표',
      headers: ['词典形', '-다가', '例句'],
      rows: [
        ['보다 看', '보다가 看着看着', '드라마를 보다가 看着剧'],
        ['공부하다 学习', '공부하다가 学着学着', '공부하다가 잠들었어요'],
        ['듣다 听', '듣다가 听着听着', '노래를 듣다가 听着歌'],
        ['걷다 走路', '걷다가 走着走着', '길을 걷다가 走着路'],
        ['쓰다 写', '쓰다가 写着写着', '일기를 쓰다가 写着日记'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-다가 완성！</div>
  <div class='ov-sub'>做着做着发生变化，表达更生动</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-다가</span> 공부하다가 잠들었어요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>변화</span> 中断/切换/意外/情绪</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>불규칙 미적용</span> 듣다→듣다가</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>-고와 구분</span> -고（顺接完成）vs -다가（中途变化）</div>
</div>`,
    linkedGrammarIds: [],
  },

  {
    id: 'card-p5-l11',
    partNumber: 5,
    lessonNumber: 11,
    title: '综合练习⑤',
    whatItDoes: '第五章综合练习',
    whatItDoesBody: '综合运用第五章 L01-L10 所学语法：\n条件、否定、计划推测、纠正、冠词形、请求确认、交通出行、换乘、动作转换。',
    isPractice: true,
    structureNote: '这是第五章的总复习。\n第五章的主线是"表达更立体"条件假设、否定辨析、修饰名词、出行交通，让你从说单句升级到说复杂情境。\n做题时想想每个语法点在真实对话里会出现在哪个场景。',
    step0Html: `<h1 style="font-size:1.55rem;font-weight:800;margin:0 0 4px 0;color:#241917">第五章综合练习</h1>
<p style="font-size:.9rem;color:#89756e;margin:0 0 16px 0">条件、否定、计划、冠词形、交通出行——全部整合在一起。</p>
<div class="block">
  <div style="font-size:.85rem;font-weight:700;color:#ff7fa8;margin-bottom:8px">这章学了什么：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L01-L03</span> — 条件（-(으)면）、否定（안/못）、计划推测（-(으)려고 하다）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L04-L06</span> — 纠正否定（아니라）、冠词形（-는/은/을）、请求确认（주세요/-지요?）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">L07-L10</span> — 时间助词、交通（타다/(으)로）、换乘（갈아타다）、途中变化（-다가）</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">综合例句</div>
  <div style="margin-bottom:6px">한국어를 잘하려면 매일 공부하는 게 좋아요.</div>
  <div style="color:#89756e;font-size:.9rem">想把韩语学好，每天学习才好。（L01+L05综合）</div>
</div>
<div class="reminder-box">综合练习会混合本章所有语法点出题。不确定时回到对应课次复习。</div>`,
    compareLabel: '第五章要点速览',
    structures: [
      {
        ko: '복습 범위：L01-L10 핵심 문법',
        zh: '复习范围：L01-L10 核心语法',
        tokens: [
          { text: '복습', role: 'verb' },
          { text: 'L01–L10', role: 'plain' },
        ],
      },
      {
        ko: '한국어를 잘하려면 매일 공부하는 게 좋아요.',
        zh: '想把韩语学好，每天学习才好。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘하려면', role: 'verb' },
          { text: '매일', role: 'time' },
          { text: '공부하는 게', role: 'verb' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'L01 -(으)면：如果……；-(으)려면：想要……的话（目标条件）', examples: '시간이 있으면 가요 / 잘하려면 매일 연습해야 해요' },
      { type: 'rule', text: 'L02 못/-지 못하다：客观做不到；안/-지 않다：主观不想做', examples: '피곤해서 못 가요 / 오늘은 안 가요' },
      { type: 'rule', text: 'L03 -(으)려고 해요：打算做；아마 -을/ㄹ 거예요：大概会……', examples: '한국에 가려고 해요 / 아마 비가 올 거예요' },
      { type: 'rule', text: 'L04 이/가 아니라：不是……（名词纠正）；-는 게 아니라：不是在做……（动词纠正）', examples: '학생이 아니라 선생님이에요 / 노는 게 아니라 공부해요' },
      { type: 'rule', text: 'L05 动词现在冠词형：-는；动词过去：-은/ㄴ；形容词：-은/ㄴ；将来：-을/ㄹ', examples: '먹는 사람 / 먹은 음식 / 예쁜 꽃 / 먹을 것' },
      { type: 'rule', text: 'L06 -아/어/여 주세요：请帮我做；-지요?/-죠?：对吧？（确认）', examples: '도와주세요 / 한국 사람이지요?' },
      { type: 'rule', text: 'L07 전화번호：공（0）, 일이삼...으로 읽기；시간：에（时刻）/부터…까지（时段）', examples: '010-1234-5678 / 세 시에 / 두 시부터 네 시까지' },
      { type: 'rule', text: 'L08 을/를 타다：乘坐；타고 가다/오다：坐着去/来；(으)로 가다：用某方式去', examples: '지하철을 타요 / 버스를 타고 가요 / 택시로 가요' },
      { type: 'rule', text: 'L09 갈아타다：换乘；A에서 B로 갈아타다：从A换到B', examples: '지하철로 갈아타요 / 버스에서 지하철로 갈아타요' },
      { type: 'rule', text: 'L10 -다가：做A途中发生B（动作未完成就转变）', examples: '공부하다가 잠들었어요 / 드라마를 보다가 울었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '있으면', role: 'verb' },
          { text: '노래를', role: 'object' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '如果有时间，就听歌。',
        swapWords: ['있으면', '없으면', '많으면'],
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '따라 하지', role: 'verb' },
          { text: '못해요', role: 'verb' },
        ],
        zh: '因为发音快，跟不上。',
        swapWords: ['따라 하지 못해요', '이해하지 못해요', '외우지 못해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '버스를', role: 'object' },
          { text: '타고', role: 'verb' },
          { text: '지하철로', role: 'plain' },
          { text: '갈아타요', role: 'verb' },
        ],
        zh: '坐公交然后换乘地铁。',
        swapWords: ['지하철로 갈아타요', '버스로 갈아타요', '택시로 갈아타요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣다가', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '听歌听着听着看了歌词。',
        swapWords: ['듣다가 가사를 봤어요', '듣다가 따라 했어요', '듣다가 잠들었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习条件', ko: '한국어를 잘하려면 매일 연습해야 해요.', zh: '想把韩语学好，就要每天练习。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '노래를 듣다가 가사를 봤어요.', zh: '听歌听着听着看了歌词。' },
      { icon: '🚇', context: '交通换乘', ko: '버스에서 지하철로 갈아타요.', zh: '从公交换乘地铁。' },
      { icon: '💬', context: '礼貌请求', ko: '다시 말해 주세요.', zh: '请再说一遍。' },
      { icon: '📖', context: '冠词修饰', ko: '오늘 배울 문법이 재미있어요.', zh: '今天要学的语法很有意思。' },
      { icon: '🚫', context: '否定纠正', ko: '외우는 게 아니라 이해해야 해요.', zh: '不是背，而是要理解。' },
    ],
    mistakes: [
      { wrong: '먹면 배불러요.', correct: '먹으면 배불러요.', note: 'L01：有收音用 -으면' },
      { wrong: '날씨가 못 좋아요.', correct: '날씨가 안 좋아요.', note: 'L02：못 不接形容词' },
      { wrong: '먹려고 해요.', correct: '먹으려고 해요.', note: 'L03：有收音用 -으려고' },
      { wrong: '커피가 아니에요 차예요.', correct: '커피가 아니라 차예요.', note: 'L04：纠正对比用 아니라' },
      { wrong: '좋는 노래', correct: '좋은 노래', note: 'L05：形容词用 -은/ㄴ，不用 -는' },
      { wrong: '말하다 주세요.', correct: '말해 주세요.', note: 'L06：주세요 前先进行 아/어/여 变形' },
      { wrong: '세 삼 시에 만나요.', correct: '세 시에 만나요.', note: 'L07：小时用固有数词' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'L08/L09：ㄹ 收音后用 로' },
      { wrong: '들다가 가사를 봤어요.', correct: '듣다가 가사를 봤어요.', note: 'L10：-다가 接续 ㄷ 不规则不触发' },
      { wrong: '공부하다가 밥을 먹어요. (순서만)', correct: '공부하고 밥을 먹어요.', note: 'L10：只是顺序用 -고，中途变化才用 -다가' },
    ],
    compareHtml: `<div class="card-title">第五章核心对比速览</div>
<div class="card-body">第五章的主线是"条件、否定、交通、冠词修饰、请求、中途转变"。这几组最容易混淆，对比清楚就掌握了本章要点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-(으)면 vs -(으)려면</div><div style="font-size:14px;color:#89756e;margin-top:2px">条件 vs 目的条件</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 있으면 가요.</span><span style="font-size:14px;color:#5a4640">如果有时间就去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">잘하려면 연습해야 해요.</span><span style="font-size:14px;color:#5a4640">想做好的话要练习。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">안 vs 못</div><div style="font-size:14px;color:#89756e;margin-top:2px">主观不做 vs 客观不能</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">안 가요. （不想去）</span><span style="font-size:14px;color:#5a4640">主观选择不去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">못 가요. （不能去）</span><span style="font-size:14px;color:#5a4640">客观条件做不到。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">-고 vs -다가</div><div style="font-size:15px;color:#5a4640">-고：顺序完成再做下一个（먹고 가요 = 吃完再去）<br>-다가：做A做到一半，中途转变成B（먹다가 전화가 왔어요 = 正吃着电话来了）<br>区别：-고 前面动作已完成；-다가 前面动作未完成就中断。</div></div>
<div class="reminder-box">타다（乘坐）+ 갈아타다（换乘）：버스를 타고 지하철로 갈아타요。(으)로 表方向/工具，ㄹ收音后用 로（지하철로 ✓，지하철으로 ✗）。</div>`,
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>제5장 종합 연습 완성！</div>
  <div class='ov-sub'>第五章 10 课全部完成</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>조건</span> -(으)면 / -(으)려면</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>부정</span> 안/못 / 아니라</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>교통</span> 타다 / 갈아타다</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>관형형</span> -는/-은ㄴ/-을ㄹ</div>
  <div class='ov-sec'><span class='badge' style='background:#c89020;color:white'>요청</span> -아/어/여 주세요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>전환</span> -다가</div>
</div>`,
    linkedGrammarIds: [],
  },
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
    rulesNote: '-나요? 直接接词干，动词可用，形容词现在时用 -은/ㄴ가요?（어렵나요? ✗ → 어려운가요? ✓）。\n形容词过去时可用 -았/었나요?（어려웠나요? ✓）。\n-은/ㄴ가요? 只用于형용사：\n有收음→은가요?，无收음→ㄴ가요?。\n-ㅂ니다만：\n有收음词干→습니다만，无收음词干→ㅂ니다만。\n注意 이다→입니다만。',
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
        ko: '동사 어간 + -나요?（형용사 현재시는 -은/ㄴ가요?）',
        zh: '动词词干 + -나요?（形容词现在时用 -은/ㄴ가요?）',
        tokens: [
          { text: '동사 어간', role: 'verb' },
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
          { text: '어려운가요', role: 'verb' },
        ],
        zh: '学韩语难吗？',
        swapWords: ['어려운가요', '재미있나요', '힘드나요'],

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
  <div style="font-size:15px;color:#241917">有收音名词 → <b>은요</b>：형은요? / 밥은요?</div>
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
      { type: 'rule', text: '은요：有收음名词 + 은요（追问）', examples: '형→형은요? / 밥→밥은요? / 학교→학교는요?' },
      { type: 'rule', text: '는요：无收음名词 + 는요（追问）', examples: '저→저는요? / 친구→친구는요? / 오빠→오빠는요? / 손창 씨→손창 씨는요?' },
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
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">-다고 하다 变形规则</div><div style="font-size:15px;color:#5a4640">动词现在时：-는다고（먹는다고）；形容词：-다고（좋다고）；名词+이다：-(이)라고（학생이라고）。</div><div style="margin-top:4px;font-size:15px;color:#5a4640">过去时统一加 -았/었다고：먹었다고、좋았다고。-라고 생각해요 表示我觉得/认为，是日常表达看法的标准句式。</div></div>
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
      { wrong: '갈 생각 못 해요.', correct: '갈 생각도 못 해요.', note: '固定句式必须加 도，强调连……都' },
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
