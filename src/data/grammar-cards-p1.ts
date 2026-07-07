import type { GrammarCard } from '@/types';

export const grammarCardsP1: GrammarCard[] = [
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
      { type: 'note',    text: '否定放动词前',    examples: '안 먹어요（不吃，主观/单纯否定） / 못 가요（去不了，能力或外因受限）' },
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
      { wrong: '저 밥 먹어요', correct: '저는 밥을 먹어요', note: '日常口语 은/는/을/를 经常省略，但初学先学完整结构。课文/写作中助词不能省。' },
      { wrong: '저는 읽어요 도서관에서 책을', correct: '저는 도서관에서 책을 읽어요', note: '遇到长句先看最后一个词，再回头理清谁做了什么，不要按中文顺序把动词放在中间。' },
      { wrong: '오늘 저는 도서관 읽어요', correct: '오늘 저는 도서관에서 책을 읽어요', note: '地点助词 에서 不能省，宾语 책을 也不能省，助词是成分标记符号。' },
    ],
    readingGuide: {
      title: '先看句尾，再往前拆',
      body: '这个习惯能让你快速理解任何韩语句子，即使它很长。',
      steps: [
        { num: 1, text: '先看<span>句尾</span>：判断动作还是状态' },
        { num: 2, text: '再看<span>谁</span>在做这件事' },
        { num: 3, text: '最后补充<span>对象、地点、시간</span>' },
      ],
      demo: {
        ko: '저는 도서관에서 책을 읽어요.',
        rows: [
          { label: '① 句尾', text: '<span style="background:#ff7fa8;color:white;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">읽어요 → 读</span>' },
          { label: '② 谁', text: '<span style="background:#ddf5ef;color:#2db89b;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">저는 → 我</span>' },
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
        { options: ['오늘 저는 학교에 가요', '가요 오늘 저는 학교에'], answer: 0, explanation: '谓语 가요 必须放句末。"가요 오늘 저는 학교에" 把动词放在了句首，违反了韩语 SOV 语序的铁则。' },
      ],
    },
    compareHtml: `<div class="card-title">韩语语序 vs 中文语序</div>
<div class="card-body">韩语是 SOV 语序（主语+宾语+动词），中文是 SVO（主语+动词+宾语）。动词永远在句末——这是韩语所有句子的铁则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">中文语序（SVO）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词在宾语前</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">我 喝 咖啡。</span><span style="font-size:16px;color:#5a4640">主→动→宾</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">他 看 电影。</span><span style="font-size:16px;color:#5a4640">主→动→宾</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">韩语语序（SOV）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词在句末</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 커피를 마셔요.</span><span style="font-size:16px;color:#5a4640">主→宾→动</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저는 영화를 봐요.</span><span style="font-size:16px;color:#5a4640">主→宾→动</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">助词标记成分</div><div style="font-size:16px;color:#5a4640">韩语靠助词（는/가/를/에）标记每个词的成分，语序可以调整但动词必须在末尾。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">저는（主）커피를（宾）마셔요（谓）— 助词告诉你谁是主语谁是宾语。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">커피를 저는 마셔요 — 调换顺序仍然正确，因为助词没变。</div></div>
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
        <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:10px">动词/形容词永远放在句子最末尾</div>
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
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</span><span style="font-size:16px;color:#241917;font-weight:600">先看<span style="color:#ff7fa8">句尾</span>：判断动作还是状态</span></div>
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</span><span style="font-size:16px;color:#241917;font-weight:600">再看<span style="color:#ff7fa8">谁</span>在做这件事</span></div>
          <div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:99px;background:#ff7fa8;color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</span><span style="font-size:16px;color:#241917;font-weight:600">最后补充<span style="color:#ff7fa8">对象、地点、时间</span></span></div>
        </div>
        <div style="background:#fff0f5;border-radius:12px;padding:12px;margin-top:10px">
          <div style="font-size:16px;font-weight:800;color:#241917;margin-bottom:8px">저는 도서관에서 책을 읽어요.</div>
          <div style="font-size:16px;color:#89756e;line-height:1.8">① 읽어요（读）→ ② 저는（我）→ ③ 도서관에서（在图书馆）책을（书）<br><b style="color:#5a4640">→ 我在图书馆读书。</b></div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#c89020"></div><div class="ov-section-title" style="color:#c89020">常用助词</div></div>
      <div class="ov-block">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#241917">은/는</div><div style="font-size:11px;color:#89756e;margin-top:2px">提示话题</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#241917">을/를</div><div style="font-size:11px;color:#89756e;margin-top:2px">提示宾语</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#241917">에</div><div style="font-size:11px;color:#89756e;margin-top:2px">方向 / 时间</div></div>
          <div style="background:#f8f4f0;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#241917">에서</div><div style="font-size:11px;color:#89756e;margin-top:2px">动作发生地点</div></div>
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
        <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同一件事，两种说法</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">正式体</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생입니다.</div>
            <div style="font-size:16px;color:#89756e;margin-top:2px">我是学生。（面试 / 课堂）</div>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">日常体（下节课学）</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생이에요.</div>
            <div style="font-size:16px;color:#89756e;margin-top:2px">我是学生。（日常聊天）</div>
          </div>
        </div>
        <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这节课先学正式体，打好基础</div>
      </div>
      <div class="reminder-box">正式体常用于：<b>自我介绍、课堂回答、新闻播报、面试、公告</b>。<br>先记住这一课，下一课就学日常版本。</div>
    `,
    compareHtml: `<div class="card-title">名词句 vs 动词句 — 正式体选哪个</div>
<div class="card-body">正式体最关键的判断：前面是名词还是动词/形容词？两种情况用完全不同的词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词/形容词 → -ㅂ/습니다</div><div style="font-size:16px;color:#89756e;margin-top:2px">看词干有无收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갑니다</span><span style="font-size:16px;color:#5a4640">无收音 → -ㅂ니다</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹다 → 먹습니다</span><span style="font-size:16px;color:#5a4640">有收音 → -습니다</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">名词 → 입니다</div><div style="font-size:16px;color:#89756e;margin-top:2px">直接加 입니다，不看收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학생 → 학생입니다</span><span style="font-size:16px;color:#5a4640">我是学生。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교 → 학교입니다</span><span style="font-size:16px;color:#5a4640">这是学校。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词最常用</div><div style="font-size:16px;color:#5a4640">所有 하다 动词直接变 합니다：공부하다→공부합니다，좋아하다→좋아합니다。不需要判断收音，先把 합니다 背熟。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">疑问句只换词尾：입니다→입니까? / 갑니다→갑니까? / 먹습니다→먹습니까?</div></div>
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
    linkedGrammarIds: ['g54'],
    overviewHtml: `<div class="overview">
    <div class="ov-hero">
      <div class="ov-hero-label">第 2 课 · 已完成</div>
      <div class="ov-hero-title">正式礼貌体</div>
      <div class="ov-hero-sub">-ㅂ/습니다 · 입니다 · 합니다 · 名词句</div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规律</div></div>
      <div class="ov-block">
        <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:10px">正式体四种情况</div>
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
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생입니다</span></div><div style="font-size:16px;color:#89756e">我是学生。· 名词句</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">한국어를</span><span class="tok t-v">공부합니다</span></div><div style="font-size:16px;color:#89756e">我学习韩语。· 하다 动词</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">밥을</span><span class="tok t-v">먹습니다</span></div><div style="font-size:16px;color:#89756e">我吃饭。· 词干有收音</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">학교에</span><span class="tok t-v">갑니다</span></div><div style="font-size:16px;color:#89756e">我去学校。· 词干无收音</div></div>
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
        <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">上节课 vs 这节课</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">正式体（第2课）</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생입니다.</div>
            <div style="font-size:11px;color:#89756e;margin-top:2px">适合面试、课堂、公告</div>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">日常体（这节课）✨</div>
            <div style="font-size:16px;font-weight:800;color:#241917">저는 학생이에요.</div>
            <div style="font-size:11px;color:#89756e;margin-top:2px">适合日常聊天、评论、日记</div>
          </div>
        </div>
        <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 日常体用得更多，这节课最重要！</div>
      </div>
      <div class="reminder-box">日常体（-아/어/여요）是韩语里用得<b>最频繁</b>的礼貌表达。掌握它，就能开口说大部分日常韩语。</div>
    `,
    compareHtml: `<div class="card-title">日常体 — 动词句 vs 名词句</div>
<div class="card-body">日常体（해요 体）也分两种：动词/形容词看元音选词尾，名词看有无收音选 이에요/예요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词/形容词 → -아/어요</div><div style="font-size:16px;color:#89756e;margin-top:2px">看词干末元音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 가요</span><span style="font-size:16px;color:#5a4640">ㅏ/ㅗ → -아요（缩合）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹다 → 먹어요</span><span style="font-size:16px;color:#5a4640">其他 → -어요</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">名词 → 이에요 / 예요</div><div style="font-size:16px;color:#89756e;margin-top:2px">看名词有无收音</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학생 → 학생이에요</span><span style="font-size:16px;color:#5a4640">有收音 → 이에요</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교 → 학교예요</span><span style="font-size:16px;color:#5a4640">无收音 → 예요</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词最好记</div><div style="font-size:16px;color:#5a4640">所有 하다 动词统一变 해요：공부하다→공부해요，좋아하다→좋아해요。不需要判断元音，先把这个规律背熟，能说出大部分日常句子。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">和中文不同：中文"是学生"和"去学校"结构一样，韩语名词句（이에요）和动词句（가요）用完全不同的词尾。</div></div>
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
        zh: '这首歌很好听。',
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
      { type: 'note',    text: 'ㅡ 脱落：词干末为 ㅡ 时 ㅡ 脱落，前音节是 ㅏ/ㅗ 接 -아요，其他接 -어요', examples: '아프다→아파요（ㅏ）/ 예쁘다→예뻐요（ㅔ） / 크다→커요（无前音节，默认 어）' },
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
        zh: '这首歌很好听。',
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
      { icon: '🎬', context: '追剧评论', ko: '이 드라마가 정말 재미있어요.', zh: '这部剧真的很好看。' },
    ],
    mistakes: [
      { wrong: '학생예요', correct: '학생이에요', note: '학생 有收音 ㅇ，所以用 이에요。记住：有收音→이에요。' },
      { wrong: '학교이에요', correct: '학교예요', note: '학교 无收音，所以用 예요。记住：无收音→예요。' },
      { wrong: '공부하요', correct: '공부해요', note: '하다 动词变日常体要变成 해요，不是 하요。하→해！' },
      { wrong: '저는 학생입니다. 저는 카페예요.', correct: '저는 학생입니다. 저는 카페에 갑니다.', note: '正式体（입니다）和日常体（예요/이에요）不要混用，语感会很奇怪。同一段话选一种语体。' },
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
    linkedGrammarIds: ['g55'],
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
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생이에요</span></div><div style="font-size:16px;color:#89756e">我是学生。· 有收音名词</div></div>
          <div><div class="tok-row"><span class="tok t-s">여기는</span><span class="tok t-v">카페예요</span></div><div style="font-size:16px;color:#89756e">这里是咖啡店。· 无收音名词</div></div>
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-o">한국어를</span><span class="tok t-v">공부해요</span></div><div style="font-size:16px;color:#89756e">我学习韩语。· 하다→해요</div></div>
          <div><div class="tok-row"><span class="tok t-s">이 노래가</span><span class="tok t-v">좋아요</span></div><div style="font-size:16px;color:#89756e">这首歌很好。· 词干元音 ㅗ→아요</div></div>
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
        <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:10px">为什么韩语需要 은/는？</div>
        <div style="background:white;border-radius:14px;padding:14px;margin-bottom:12px">
          <div style="font-size:16px;font-weight:800;color:#241917;margin-bottom:6px">저는 학생이에요.</div>
          <div style="font-size:16px;color:#89756e;line-height:1.7">拆开来看：<br>
            <span style="background:#ddf5ef;color:#2db89b;padding:2px 8px;border-radius:6px;font-weight:700">저</span>（我）+
            <span style="background:#fff0f5;color:#ff7fa8;padding:2px 8px;border-radius:6px;font-weight:700">는</span>（话题标记）+
            학생이에요（是学生）<br><br>
            는 告诉听者：<b>「关于我嘛——」</b>，接下来说的是我的事。
          </div>
        </div>
        <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 은/는 = 「关于……嘛」「说到……」</div>
      </div>
      <div class="reminder-box">은/는 最主要的作用：<b>1) 提出话题</b>，<b>2) 做对比</b>。<br>这节课先学这两点，下一步再和 이/가 做区分。</div>
    `,
    compareHtml: `<div class="card-title">은/는 — 两个字，选一个</div>
<div class="card-body">选 은 还是 는，只看前面名词最后有没有收音。中文没有话题助词，但韩语的 은/는 是最常用的助词之一。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">有收音 → 은</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节有辅音收尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">책 → 책은</span><span style="font-size:16px;color:#5a4640">书（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학생 → 학생은</span><span style="font-size:16px;color:#5a4640">学生（话题）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">无收音 → 는</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저 → 저는</span><span style="font-size:16px;color:#5a4640">我（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">커피 → 커피는</span><span style="font-size:16px;color:#5a4640">咖啡（话题）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">은/는 的两个核心作用</div><div style="font-size:16px;color:#5a4640">① 提出话题：저는 학생이에요（说到我，我是学生）<br>② 做对比：저는 가요. 친구는 안 가요.（我去，朋友不去）<br>中文"我是学生"里没有"话题标记"的概念，韩语的 은/는 明确告诉听者"接下来说的是关于这个词的事"。</div></div>
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
      { wrong: '오늘는 바빠요', correct: '오늘은 바빠요', note: '오늘 末字 늘 有收音 ㄹ → 은。' },
      { wrong: '커피은 맛있어요', correct: '커피는 맛있어요', note: '커피 末字 피 无收音 → 는。' },
    ],
    quickTable: {
      title: '은/는 收音速查表',
      body: '看最后一个字有没有收音，两秒做判断。',
      headers: ['词', '中文', '有无收音', '结果'],
      rows: [
        ['저', '我', { ko: '无받침', zh: '无收音' }, { ko: '저는', zh: '我（话题）' }],
        ['우리', '我们', { ko: '无받침', zh: '无收音' }, { ko: '우리는', zh: '我们（话题）' }],
        ['장이 씨', '张伊', { ko: '无받침', zh: '无收音' }, { ko: '장이 씨는', zh: '张伊（话题）' }],
        ['선생님', '老师', { ko: '有받침 ㅁ', zh: '有收音ㅁ' }, { ko: '선생님은', zh: '老师（话题）' }],
        ['학생', '学生', { ko: '有받침 ㅇ', zh: '有收音ㅇ' }, { ko: '학생은', zh: '学生（话题）' }],
        ['한국', '韩国', { ko: '有받침 ㄱ', zh: '有收音ㄱ' }, { ko: '한국은', zh: '韩国（话题）' }],
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
    linkedGrammarIds: ['g1'],
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
          <div style="background:#eaf8f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#2db89b">은</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面有收音</div><div style="font-size:16px;color:#241917;margin-top:4px">책 → 책은</div></div>
          <div style="background:#fff0f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#ff7fa8">는</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面无收音</div><div style="font-size:16px;color:#241917;margin-top:4px">저 → 저는</div></div>
        </div>
        <div style="background:#f8f4f0;border-radius:12px;padding:12px">
          <div style="font-size:11px;font-weight:800;color:#89756e;margin-bottom:8px">两大用法</div>
          <div style="font-size:16px;color:#241917;line-height:1.8"><b>1. 提出话题：</b>저는 학생이에요.<br><b>2. 制造对比：</b>커피는 좋아해요. 차는 안 좋아해요.</div>
        </div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><div class="tok-row"><span class="tok t-s">저는</span><span class="tok t-v">학생이에요</span></div><div style="font-size:16px;color:#89756e">我是学生。</div></div>
          <div><div class="tok-row"><span class="tok t-s">한국어는</span><span class="tok t-v">재미있어요</span></div><div style="font-size:16px;color:#89756e">韩语很有意思。</div></div>
          <div><div class="tok-row"><span class="tok t-s">커피는</span><span class="tok t-v">좋아해요</span></div><div style="font-size:16px;color:#89756e">咖啡我喜欢。（对比感）</div></div>
          <div><div class="tok-row"><span class="tok t-s">오늘은</span><span class="tok t-v">바빠요</span></div><div style="font-size:16px;color:#89756e">今天忙。（含对比：今天 vs 其他天）</div></div>
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
    whatItDoesBody: '을/를 标记动作的对象，也就是宾语。韩语靠을/를标出宾语，相当于告诉听者「动作落在谁身上」——每次都要加，不能省略。',
    structureNote: '을/를 标记「动作的对象是谁」，位置在动词前面。\n下面的结构展示它在句子里的位置。',
    rulesNote: '跟 은/는 一样，只看最后有没有收音（받침）。\n有收音用 을，没有用 를。\n两条规则，一分钟记住。',
    scenarioNote: '只要句子里有动作（吃、喝、看、学……），动作对象后面就要加 을/를。\n中文不需要这个标记，所以刚开始会经常忘记加。',
    compareLabel: '有收音 vs 无收音',
    step0Html: `<div class="card-title">动作落在谁身上</div>
  <div class="card-body">을/를 告诉你：这个动作的「受害者」是谁。</div>
  <div class="hook-box">
    <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">을/를 是什么？</div>
    <div style="background:white;border-radius:14px;padding:14px;margin-bottom:12px">
      <div class="tok-row" style="margin-bottom:10px">
        <span class="tok t-s">저는</span>
        <span class="tok t-o">밥을</span>
        <span class="tok t-v">먹어요</span>
      </div>
      <div style="font-size:16px;color:#89756e;line-height:1.8">
        <span style="background:#ddf5ef;color:#2db89b;padding:2px 8px;border-radius:6px;font-weight:700">저는</span> 话题（我）<br>
        <span style="background:#f3eefb;color:#b49ccf;padding:2px 8px;border-radius:6px;font-weight:700">밥을</span> 动作对象（饭）← 을/를 标记这个<br>
        <span style="background:#ff7fa8;color:white;padding:2px 8px;border-radius:6px;font-weight:700">먹어요</span> 动作（吃）
      </div>
    </div>
    <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 을/를 标记动作落在哪个名词上</div>
  </div>
  <div class="reminder-box">을/를 不需要翻译成中文里的某个字。<br>它只是在说：<b>「前面这个词，是后面动作的对象。」</b></div>`,
    compareHtml: `<div class="card-title">을/를 — 两个字，选一个</div>
<div class="card-body">选 을 还是 를，和 은/는 一样只看有无收音。을/를 标记动作的宾语——动作"落"在哪个词上。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">有收音 → 을</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节有辅音收尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 → 밥을</span><span style="font-size:16px;color:#5a4640">吃饭（宾语）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">책 → 책을</span><span style="font-size:16px;color:#5a4640">读书（宾语）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">无收音 → 를</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피 → 커피를</span><span style="font-size:16px;color:#5a4640">喝咖啡（宾语）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래 → 노래를</span><span style="font-size:16px;color:#5a4640">听歌（宾语）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">을/를 vs 은/는 的区别</div><div style="font-size:16px;color:#5a4640">을/를：标宾语，标记动作的对象（"把什么"做了）<br>은/는：标话题，说"关于什么"<br>同一句话：저는（话题）커피를（宾语）마셔요。<br>中文"我喝咖啡"里没有这两种助词的区分，但韩语必须分清楚。</div></div>
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
      { type: 'compare', text: '좋아하다 加 을/를，좋다 加 이/가', examples: '이 노래를 좋아해요（动词，喜欢） vs 이 노래가 좋아요（形容词，好听）' },
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
        ['빵', '面包', { ko: '有받침 ㅇ', zh: '有收音ㅇ' }, { ko: '빵을', zh: '面包（宾格）' }],
        ['밥', '饭', { ko: '有받침 ㅂ', zh: '有收音ㅂ' }, { ko: '밥을', zh: '饭（宾格）' }],
        ['책', '书', { ko: '有받침 ㄱ', zh: '有收音ㄱ' }, { ko: '책을', zh: '书（宾格）' }],
        ['한국어', '韩语', { ko: '无받침', zh: '无收音' }, { ko: '한국어를', zh: '韩语（宾格）' }],
        ['커피', '咖啡', { ko: '无받침', zh: '无收音' }, { ko: '커피를', zh: '咖啡（宾格）' }],
        ['영화', '电影', { ko: '无받침', zh: '无收音' }, { ko: '영화를', zh: '电影（宾格）' }],
        ['친구', '朋友', { ko: '无받침', zh: '无收音' }, { ko: '친구를', zh: '朋友（宾格）' }],
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
    linkedGrammarIds: ['g3'],
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
          <div style="background:#eaf8f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#2db89b">을</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面有收音</div><div style="font-size:16px;color:#241917;margin-top:4px">밥 → 밥을</div></div>
          <div style="background:#fff0f5;border-radius:12px;padding:12px;text-align:center"><div style="font-size:20px;font-weight:900;color:#ff7fa8">를</div><div style="font-size:11px;color:#89756e;margin-top:4px">前面无收音</div><div style="font-size:16px;color:#241917;margin-top:4px">커피 → 커피를</div></div>
        </div>
        <div style="background:#f8f4f0;border-radius:12px;padding:12px;font-size:16px;color:#241917;line-height:1.8">을/를 = 标记<b>动作的对象</b>（宾语）<br>位置：宾语 + 动词 = 을/를 + 动词</div>
      </div>
    </div>
    <div class="ov-section">
      <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用搭配</div></div>
      <div class="ov-block">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">밥을</span><span class="tok t-v">먹어요</span></div><div style="font-size:16px;color:#89756e;align-self:center">吃饭</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">커피를</span><span class="tok t-v">마셔요</span></div><div style="font-size:16px;color:#89756e;align-self:center">喝咖啡</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">영화를</span><span class="tok t-v">봐요</span></div><div style="font-size:16px;color:#89756e;align-self:center">看电影</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">노래를</span><span class="tok t-v">들어요</span></div><div style="font-size:16px;color:#89756e;align-self:center">听歌</div></div>
          <div style="display:flex;justify-content:space-between"><div class="tok-row" style="margin:0"><span class="tok t-o">한국어를</span><span class="tok t-v">공부해요</span></div><div style="font-size:16px;color:#89756e;align-self:center">学韩语</div></div>
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
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에 — 一个词，三种定位</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">去哪里 · 在哪里 · 几点</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">想一想，这三句韩语你会说吗？</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">학교에 가요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">去学校。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">집에 있어요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">在家。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">세 시에 만나요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">三点见。</div></div>
    <div style="margin-top:12px;font-size:16px;color:#89756e">这三句里都有 <strong style="color:#ff7fa8">에</strong>，但含义不一样。这节课搞定它。</div>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">에 的三张面孔</div>
    <div class="row" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <span class="chip p">방향: 去哪里</span>
      <span class="chip s">존재: 在哪里</span>
      <span class="chip t">시간: 几点/什么时候</span>
    </div>
    <div style="margin-top:10px;font-size:16px;color:#89756e">同一个 에，意思取决于后面的动词。</div>
  </div>`,
    compareHtml: `<div class="card-title">에 — 三种用法一个助词</div>
<div class="card-body">中文"在/去/到"是三个词，韩语统一用 에，靠后面搭配的动词来区分含义。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">方向（去/来）</div><div style="font-size:16px;color:#89756e;margin-top:2px">地点 + 에 + 가다/오다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:16px;color:#5a4640">去学校。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국에 와요.</span><span style="font-size:16px;color:#5a4640">来韩国。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">存在（在）</div><div style="font-size:16px;color:#89756e;margin-top:2px">地点 + 에 + 있다/없다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">집에 있어요.</span><span style="font-size:16px;color:#5a4640">在家。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">세 시에 만나요.</span><span style="font-size:16px;color:#5a4640">三点见。（时间）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">时间也用 에</div><div style="font-size:16px;color:#5a4640">에 还可以表示时间点：세 시에 만나요（三点见）、월요일에 해요（周一做）。中文"在三点""在周一"里的"在"，韩语也用 에 表达。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">关键：에 后面接 가요/와요 → 方向；接 있어요/없어요 → 存在；接时间词 → 时间点。</div></div>
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
      { type: 'note',    text: '这些시간词不加 에',                    examples: '오늘・내일・어제・지금・매일・항상' },
      { type: 'note',    text: '에 不固定翻译为"在"，含义看搭配',     examples: '학교에 가요=去（方向） / 집에 있어요=在（存在） / 세 시에 만나요=在三点（시간点）' },
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
      { wrong: '학교에서 가요', correct: '학교에 가요', note: '가다 是位移动词，去某地用 에，不是 에서（에서 表示动作发生的场所）。' },
      { wrong: '저는 학교 가요', correct: '저는 학교에 가요', note: '口语有时省略，但初学阶段建议写完整。' },
    ],
    quickTable: {
      title: '에 速查表',
      body: '时间名词 + 에 / 地点名词 + 에',
      headers: ['类型', '助词', '作用', '例句'],
      rows: [
        ['时间名词', '에', '表示시간点', '오후에, 월요일에, 세 시에'],
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
        { options: ['친구가 집에 있어요', '친구가 집에서 있어요'], answer: 0, explanation: '있다/없다 表示存在，前面永远用 에，不用 에서。' },
      ],
    },
    linkedGrammarIds: ['g4'],
    overviewHtml: `<div class="overview">
    <div class="badge">第6课</div>
    <div class="ov-title">에 — 时间、地点、方向</div>
    <div class="ov-sub">장소에 가요 · 장소에 있어요 · 시간에 动词</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:16px;line-height:1.9">
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
      <div style="font-size:16px;line-height:1.8">
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
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">에서 — 在哪里「做」动作</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">动作 + 地点 的专属搭档</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">학교에서 공부해요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">在学校学习。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">카페에서 커피를 마셔요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">在咖啡店喝咖啡。</div></div>
    <div style="margin-bottom:10px"><div class="ko" style="font-size:20px;font-weight:700;color:#241917">공원에서 사진을 찍어요.</div><div class="zh" style="font-size:16px;color:#89756e;margin-top:2px">在公园拍照。</div></div>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">에 vs 에서 先记这一句</div>
    <div style="font-size:16px;line-height:2;background:#f8f4f0;border-radius:8px;padding:10px">
      <div><span style="color:#2db89b;font-weight:700">에</span>：去哪里 / 在哪里存在 / 几点</div>
      <div><span style="color:#ff7fa8;font-weight:700">에서</span>：在哪里<strong>做动作</strong></div>
    </div>
  </div>`,
    compareHtml: `<div class="card-title">에 vs 에서 — 最常混淆的两个助词</div>
<div class="card-body">中文"在图书馆读书"里"在"一个词搞定，韩语要区分 에（存在/方向）和 에서（动作发生地）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에（存在/方向）</div><div style="font-size:16px;color:#89756e;margin-top:2px">接 있다/없다/가다/오다</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">카페에 있어요.</span><span style="font-size:16px;color:#5a4640">在咖啡店。（存在）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">카페에 가요.</span><span style="font-size:16px;color:#5a4640">去咖啡店。（方向）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에서（动作发生地）</div><div style="font-size:16px;color:#89756e;margin-top:2px">接一般动作动词</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">카페에서 공부해요.</span><span style="font-size:16px;color:#5a4640">在咖啡店学习。（动作）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">도서관에서 책을 읽어요.</span><span style="font-size:16px;color:#5a4640">在图书馆读书。（动作）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">判断口诀</div><div style="font-size:16px;color:#5a4640">后面接 있다/없다/가다/오다 → 用 에。后面接其他动作动词（먹다/공부하다/일하다）→ 用 에서。这个区分中文没有，需要刻意练习。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">测试：학교에서 있어요 ✗ → 학교에 있어요 ✓（있다 前面用 에）</div></div>
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
      { icon: '🤳', context: 'SNS 打卡', ko: '카페에서 친구를 만나요!', zh: '在咖啡店见朋友！' },
    ],
    mistakes: [
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부해요 是动作，动作发生地点用 에서。' },
      { wrong: '집에서 있어요', correct: '집에 있어요', note: '있어요 是存在，不是动作，用 에。' },
      { wrong: '세 시에서 만나요', correct: '세 시에 만나요', note: '时间点用 에，不用 에서。' },
      { wrong: '카페에서 커피 마셔요', correct: '카페에서 커피를 마셔요', note: '에서 标地点，을/를 标宾语，各管各的，初学完整写出来。日常口语 를 可省。' },
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
    linkedGrammarIds: ['g5'],
    overviewHtml: `<div class="overview">
    <div class="badge">第7课</div>
    <div class="ov-title">에서 — 在哪里做动作</div>
    <div class="ov-sub">장소에서 + 动作动词</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:16px;line-height:1.9">
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
      <div style="font-size:16px;line-height:1.8">
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
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">过去时 — 说「昨天做了什么」</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">-았어요 / -었어요 / -했어요</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">从现在时到过去时</div>
    <table style="width:100%;border-collapse:collapse;font-size:16px">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">现在</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">→</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">过去</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">가요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">갔어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">去了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">먹어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">먹었어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">吃了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">봐요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">→</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">봤어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">看了</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">这节课学完，你能写韩语日记：</div>
    <div style="font-size:16px;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      어제 한국어를 공부했어요. — 昨天学习了韩语。<br>
      지난주에 도서관에 갔어요. — 上周去了图书馆。<br>
      이 노래가 좋았어요. — 这首歌很好。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">过去时变形 — 元音决定词尾</div>
<div class="card-body">韩语过去时词尾由词干末元音决定，不像中文加"了"那么简单——要先看元音再选词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">末元音 ㅏ/ㅗ → -았어요</div><div style="font-size:16px;color:#89756e;margin-top:2px">亮元音接亮词尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갔어요</span><span style="font-size:16px;color:#5a4640">去了。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">보다 → 봤어요</span><span style="font-size:16px;color:#5a4640">看了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">其他元音 → -었어요</div><div style="font-size:16px;color:#89756e;margin-top:2px">暗元音接暗词尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹었어요</span><span style="font-size:16px;color:#5a4640">吃了。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">마시다 → 마셨어요</span><span style="font-size:16px;color:#5a4640">喝了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">하다 动词特殊</div><div style="font-size:16px;color:#5a4640">所有 하다 动词统一变 했어요：공부하다→공부했어요，좋아하다→좋아했어요。不需要判断元音，记住这个特例就省事了。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">中文"了"表示动作完成或状态变化，韩语 -었어요 只表示"已经发生"，不表示状态持续。</div></div>
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
      { type: 'vocab',   text: '过去시간词',                 examples: '어제（昨天）·아까（刚才）·지난주에（上周）·어젯밤에（昨晚）' },
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
        { prompt: '现在时：가요', options: ['갔어요', '가었어요', '갔아요'], answer: 0, explanation: '가+았어요→갔어요（缩约）' },
        { prompt: '现在时：먹어요', options: ['먹어었어요', '먹았어요', '먹었어요'], answer: 2, explanation: '먹+었어요' },
        { prompt: '现在时：해요', options: ['하었어요', '했어요', '해었어요'], answer: 1, explanation: '하+였어요→했어요（缩约）' },
        { prompt: '现在时：와요', options: ['오었어요', '왔어요', '와었어요'], answer: 1, explanation: '오+았어요→왔어요（缩约）' },
      ],
    },
    linkedGrammarIds: ['g47'],
    overviewHtml: `<div class="overview">
    <div class="badge">第8课</div>
    <div class="ov-title">过去时 -았/었/했어요</div>
    <div class="ov-sub">昨天做了什么 · 刚才 · 上周</div>
    <div class="ov-sec">
      <h3>三条规则</h3>
      <div style="font-size:16px;line-height:2">
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
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">将来时 — 说「以后要做什么」</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">-을/ㄹ 거예요 = 要做/会做/打算做</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">三种时态对比</div>
    <table style="width:100%;border-collapse:collapse;font-size:16px">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">时态</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">韩语</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">现在</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">过去</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8;font-weight:700">将来</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부할 거예요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">要学习</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="font-size:16px;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      내일 한국어를 공부할 거예요. — 明天要学习韩语。<br>
      주말에 카페에 갈 거예요. — 周末要去咖啡店。<br>
      나중에 한국에 갈 거예요. — 以后会去韩国。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">将来时 — 两条规则搞定</div>
<div class="card-body">-을/ㄹ 거예요 表示要做/会做/打算做。中文"要/会/打算"是独立词，韩语把这三种意思全用一个词尾表达，放在动词末尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">词干无收音 → -ㄹ 거예요</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节以元音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 갈 거예요</span><span style="font-size:16px;color:#5a4640">要去。/ 打算去。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">하다 → 할 거예요</span><span style="font-size:16px;color:#5a4640">要做。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">词干有收音 → -을 거예요</div><div style="font-size:16px;color:#89756e;margin-top:2px">末音节以辅音结尾</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹을 거예요</span><span style="font-size:16px;color:#5a4640">要吃。/ 打算吃。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">읽다 → 읽을 거예요</span><span style="font-size:16px;color:#5a4640">要读。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">和现在时的对比</div><div style="font-size:16px;color:#5a4640">현재（现在）：지금 밥을 먹어요（现在吃饭）<br>미래（将来）：내일 밥을 먹을 거예요（明天要吃饭）。区别只在词尾，中文靠"现在/明天"区分，韩语词尾本身就带时态信息。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">问对方计划：뭐 할 거예요?（打算做什么？）— 日常对话高频句型。</div></div>
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
      { type: 'vocab',   text: '未来시간词',                     examples: '내일・주말에・다음 주에・이따가・나중에' },
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
        { prompt: '词典形：가다', options: ['가을 거예요', '갈 거예요', '갈거예요'], answer: 1, explanation: '词干 가 无收音 → ㄹ 거예요' },
        { prompt: '词典形：먹다', options: ['먹을 거예요', '먹ㄹ 거예요', '먹거예요'], answer: 0, explanation: '词干 먹 有收音 → 을 거예요' },
        { prompt: '词典形：하다', options: ['하을 거예요', '하ㄹ거예요', '할 거예요'], answer: 2, explanation: '词干 하 无收音 → ㄹ 거예요' },
        { prompt: '词典形：읽다', options: ['읽을 거예요', '읽거예요', '읽ㄹ 거예요'], answer: 0, explanation: '词干 읽 有收音 → 을 거예요' },
      ],
    },
    linkedGrammarIds: ['g48'],
    overviewHtml: `<div class="overview">
    <div class="badge">第9课</div>
    <div class="ov-title">将来时 -을/ㄹ 거예요</div>
    <div class="ov-sub">明天要做什么 · 周末计划 · 以后打算</div>
    <div class="ov-sec">
      <h3>两条规则</h3>
      <div style="font-size:16px;line-height:2">
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
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">进行时 — 说「正在做什么」</h1>
  <p class="sub" style="color:#89756e;font-size:16px;margin-bottom:22px">动词词干 + 고 있어요</p>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">三种时态全对比</div>
    <table style="width:100%;border-collapse:collapse;font-size:16px">
      <tr><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">时态</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">韩语</th><th style="background:#ffeef4;color:#be185d;padding:7px 10px;text-align:left;font-weight:700">中文</th></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">过去</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부했어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习了</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">现在/习惯</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부해요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8;font-weight:700">进行中</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4;color:#ff7fa8">공부하고 있어요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">正在学习</td></tr>
      <tr><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">将来</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">공부할 거예요</td><td style="padding:7px 10px;border-bottom:1px solid #f0e8e4">要学习</td></tr>
    </table>
  </div>
  <div class="block">
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#2db89b">学完这节课，你能说：</div>
    <div style="font-size:16px;line-height:2;background:#f0fdf8;border-radius:8px;padding:10px">
      지금 한국어를 공부하고 있어요. — 现在正在学习韩语。<br>
      이 노래를 듣고 있어요. — 正在听这首歌。<br>
      카페에서 커피를 마시고 있어요. — 正在咖啡店喝咖啡。
    </div>
  </div>`,
    compareHtml: `<div class="card-title">进行时 — 最简单的时态</div>
<div class="card-body">动词词干 + 고 있어요，不用判断元音，比过去时和将来时都简单。中文进行时靠"正在/着"表达，韩语把进行意义嵌入词尾。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">进行时（-고 있어요）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 고 있어요</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹다 → 먹고 있어요</span><span style="font-size:16px;color:#5a4640">正在吃。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">공부하다 → 공부하고 있어요</span><span style="font-size:16px;color:#5a4640">正在学习。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">现在时 vs 进行时</div><div style="font-size:16px;color:#89756e;margin-top:2px">习惯 vs 正在进行</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥을 먹어요.</span><span style="font-size:16px;color:#5a4640">（平时）吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">지금 밥을 먹고 있어요.</span><span style="font-size:16px;color:#5a4640">现在正在吃饭。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">穿戴类动词的特殊用法</div><div style="font-size:16px;color:#5a4640">입다（穿）/쓰다（戴）/신다（穿鞋）+ -고 있어요 表示"穿着/戴着"的持续状态，不是"正在穿"的动作进行。모자를 쓰고 있어요 = 戴着帽子（状态）。中文"穿着"和"正在穿"靠语境区分，韩语用同一结构。</div></div>
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
    linkedGrammarIds: ['g49'],    specialQuiz: {
      type: 'judge',
      title: '判断对错：-고 있어요 进行时',
      body: '选出使用 -고 있어요 正确的句子。',
      questions: [
        { options: ['지금 한국어를 공부하고 있어요', '지금 한국어를 공부해고 있어요'], answer: 0, explanation: '공부하다→공부하고 있어요。하다 动词加 -고 时用 하고，不是 해고。' },
        { options: ['친구를 기다리고 있어요', '친구를 기대리고 있어요'], answer: 0, explanation: '기다리다→기다리고 있어요（正在等朋友）。不是 기대리다。' },
        { options: ['이 노래가 좋고 있어요', '이 노래가 좋아요'], answer: 1, explanation: '形容词不能用 -고 있어요。좋다 是形容词，直接说 좋아요。' },
        { options: ['음악을 듣고 있어요', '음악을 들고 있어요'], answer: 0, explanation: '듣다→듣고 있어요（正在听）。들고 있어요 是"拿着"。' },
      ],
    },

    overviewHtml: `<div class="overview">
    <div class="badge">第10课</div>
    <div class="ov-title">进行时 -고 있어요</div>
    <div class="ov-sub">正在做什么 · 此刻状态</div>
    <div class="ov-sec">
      <h3>核心规律</h3>
      <div style="font-size:16px;line-height:2">
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
      <div style="font-size:16px;line-height:2;color:#475569">
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
      { icon: '🚫', context: '否定句', ko: '오늘은 안 가요. 시간이 없어요.', zh: '今天不去。没有시간。' },
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
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에 vs 에서</div><div style="font-size:16px;color:#89756e;margin-top:2px">方向/存在 vs 动作场所</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요 / 학교에 있어요</span><span style="font-size:16px;color:#5a4640">去学校 / 在学校（方向·存在）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학교에서 공부해요</span><span style="font-size:16px;color:#5a4640">在学校学习（动作场所）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">은/는 vs 을/를</div><div style="font-size:16px;color:#89756e;margin-top:2px">话题 vs 宾语</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 학생이에요</span><span style="font-size:16px;color:#5a4640">我是学生。（话题）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">밥을 먹어요</span><span style="font-size:16px;color:#5a4640">吃饭。（宾语）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">三种时态对比</div><div style="font-size:16px;color:#5a4640">현재（现在）：먹어요 / 공부해요<br>과거（过去）：먹었어요 / 공부했어요（-았/었어요）<br>미래（将来）：먹을 거예요 / 공부할 거예요（-을/ㄹ 거예요）<br>진행（进行）：먹고 있어요 / 공부하고 있어요（-고 있어요）</div></div>
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
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">语序</span> 主 → 宾 → 谓（动词永远在句末）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">助词</span> 은/는（话题）/ 을/를（宾语）/ 에（方向·存在）/ 에서（动作场所）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">时态</span> 먹어요 / 먹었어요 / 먹을 거예요 / 먹고 있어요</div>
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
];
