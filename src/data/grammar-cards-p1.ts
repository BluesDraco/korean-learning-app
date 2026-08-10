import type { GrammarCard } from '@/types';

export const grammarCardsP1: GrammarCard[] = [
  {
    id: 'card-p1-l01',
    partNumber: 1,
    lessonNumber: 1,
    title: '韩语句子结构', titleEn: 'Korean sentence structure',
    whatItDoes: '韩语语序和中文不一样', whatItDoesEn: 'Korean word order is different from Chinese',
    whatItDoesBody: '只需要记住一件事，就能看懂大多数韩语句子。\n和中文最大的不同：\n动词永远在句子最后，而中文动词在中间。', whatItDoesBodyEn: 'Just remember one thing to understand most Korean sentences.\\nThe biggest difference from Chinese:\\nThe verb always comes at the end of the sentence, while in Chinese it\'s in the middle.',
    structureNote: '下面展示的是韩语最基本的句子框架。\n不需要背，先看懂每个位置放什么就够了。', structureNoteEn: 'Here\'s the most basic Korean sentence structure.\\nNo need to memorize—just understand what goes in each position.',
    rulesNote: '韩语靠"助词"标记每个词的角色，所以词序比中文灵活。\n这几条规则是骨架，后面每节课都会用到。', rulesNoteEn: 'Korean uses "particles" to mark each word\'s role, so word order is more flexible than Chinese.\\nThese rules are the backbone—you\'ll use them in every lesson ahead.',
    scenarioNote: '韩语的SOV语序在所有场合都适用从日常聊天到正式演讲。\n先记住动词永远在句末，其他慢慢来。', scenarioNoteEn: 'Korean\'s SOV word order applies everywhere, from casual chats to formal speeches.\\nFirst remember the verb always comes last—the rest will come with time.',
    conceptCompare: {
      zh: '我 · 吃 · 饭', zhEn: 'I · eat · food',
      ko: '저는 · 밥을 · 먹어요',
      note: '韩语不是按中文顺序翻译的。<b>动词/形容词永远放在句子最末尾。</b><br><br>记住这一点，后面的助词、时态、敬语都会更容易理解。', noteEn: 'Korean isn\'t translated in Chinese word order. <b>Verbs/adjectives always go at the very end of the sentence.</b><br><br>Keep this in mind, and particles, tenses, and honorifics will be much easier to understand.',
    },
    structures: [
      {
        ko: '저는 밥을 먹어요',
        zh: '我吃饭。', zhEn: 'I eat.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 가요',
        zh: '我去学校。', zhEn: 'I go to school.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '저는 이 노래를 좋아해요',
        zh: '我喜欢这首歌。', zhEn: 'I like this song.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '이 노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 저는 도서관에서 책을 읽어요',
        zh: '今天我在图书馆读书。', zhEn: 'Today I read at the library.',
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
      { type: 'rule',    text: '谓语放句末', textEn: 'Predicate at the End',     examples: '动词/形容词永远是最后一个词，不管句子多长', examplesEn: 'The verb/adjective is always the last word, no matter how long the sentence is.' },
      { type: 'rule',    text: '时间状语放句首', textEn: 'Time Adverbs at the Start',  examples: '오늘（今天）・지금（现在）・내일（明天）通常放最前面', examplesEn: '오늘 (today)・지금 (now)・내일 (tomorrow) usually go first.' },
      { type: 'usage',   text: '助词标记成分', textEn: 'Particles Mark Sentence Roles',    examples: '은/는（话题）・을/를（宾语）・에（方向/地点）・에서（动作发生地）', examplesEn: '은/는 (topic) · 을/를 (object) · 에 (direction/location) · 에서 (place of action)' },
      { type: 'usage',   text: '先看句尾', textEn: 'Look at the ending first.',        examples: '遇到长句跳到最后一个词，先判断「做什么/是什么」', examplesEn: 'For long sentences, jump to the last word and first figure out \'what\'s being done / what it is.\'' },
      { type: 'note',    text: '主语可省略', textEn: 'The subject can be omitted.',      examples: '对话中语境清楚时，저는 可以不说，直接说 밥을 먹어요', examplesEn: 'When the context is clear in conversation, you can drop 저는 and just say 밥을 먹어요.' },
      { type: 'note',    text: '否定放动词前', textEn: 'Negation goes before the verb.',    examples: '안 먹어요（不吃，主观/单纯否定） / 못 가요（去不了，能力或外因受限）', examplesEn: '안 먹어요 (don\'t eat — subjective/simple negation) / 못 가요 (can\'t go — limited by ability or external factors)' },
      { type: 'note',    text: '中文没有「助词」这个东西', textEn: 'Chinese doesn\'t have \'particles.\'',  examples: '中文靠语序说清「谁做什么」，韩语靠助词（은/는・을/를・에）黏在词后标出角色——这正是韩语语序能比中文灵活的原因，也是整章要反复练的新概念', examplesEn: 'Chinese relies on word order to show \'who does what,\' but Korean uses particles (은/는 · 을/를 · 에) attached after words to mark their roles — this is why Korean word order can be more flexible than Chinese, and it\'s the new concept this chapter will keep practicing.' },
      { type: 'note',    text: '「是」不是单独的一个词', textEn: '\'Is\' isn\'t a standalone word.',    examples: '저는 학생이에요 里数不出对应「是」的那个词——「是」就藏在名词后的 이에요 里，别照中文「我·是·学生」去找中间那个「是」', examplesEn: 'In 저는 학생이에요, you can\'t pick out a word for \'is\' — \'is\' is hidden in the 이에요 after the noun. Don\'t look for a middle \'is\' like in Chinese \'I · am · a student.\'' },
      { type: 'example', text: '저는 밥을 먹어요 / 오늘 저는 도서관에서 책을 읽어요 / 저는 이 노래를 좋아해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。', zhEn: 'I drink coffee.',
        swapWords: ['커피를', '물을', '주스를', '차를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '我去学校。', zhEn: 'I go to school.',
        swapWords: ['학교에', '회사에', '카페에', '집에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我学习韩语。', zhEn: 'I study Korean.',
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
        zh: '今天我在家听音乐。', zhEn: 'Today I\'m listening to music at home.',
        swapWords: ['음악을 들어요', '드라마를 봐요', '책을 읽어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '👋', context: '初次见面', contextEn: 'first meeting', ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.' },
      { icon: '☕', context: '日常出行', contextEn: 'Daily outings', ko: '저는 카페에 가요.', zh: '我去咖啡店。', zhEn: 'I\'m going to a café.' },
      { icon: '📓', context: '韩语日记', contextEn: 'Korean diary', ko: '오늘 저는 집에서 쉬어요.', zh: '今天我在家休息。', zhEn: 'Today I\'m resting at home.' },
      { icon: '🍜', context: '点餐场景', contextEn: 'Ordering food', ko: '저는 라면을 먹어요.', zh: '我吃拉面。', zhEn: 'I\'m eating ramen.' },
      { icon: '🏫', context: '学校生活', contextEn: 'School life', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。', zhEn: 'I\'m reading at the library.' },
      { icon: '🎵', context: 'KPOP 入门', contextEn: 'KPOP basics', ko: '저는 이 노래를 좋아해요.', zh: '我喜欢这首歌。', zhEn: 'I like this song.' },
    ],
    mistakes: [
      { wrong: '저는 먹어요 밥을', correct: '저는 밥을 먹어요', note: '按中文顺序硬翻。谓语必须放句末，不能放中间。', noteEn: 'Don\'t translate word-for-word following Chinese order. The predicate must go at the end of the sentence, not in the middle.' },
      { wrong: '저 밥 먹어요', correct: '저는 밥을 먹어요', note: '日常口语 은/는/을/를 经常省略，但初学先学完整结构。课文/写作中助词不能省。', noteEn: 'In everyday speech, 은/는/을/를 are often dropped, but as a beginner, learn the full structure first. In texts and writing, particles can\'t be omitted.' },
      { wrong: '저는 읽어요 도서관에서 책을', correct: '저는 도서관에서 책을 읽어요', note: '遇到长句先看最后一个词，再回头理清谁做了什么，不要按中文顺序把动词放在中间。', noteEn: 'For long sentences, look at the last word first, then work backward to figure out who did what. Don\'t place the verb in the middle following Chinese word order.' },
      { wrong: '오늘 저는 도서관 읽어요', correct: '오늘 저는 도서관에서 책을 읽어요', note: '地点助词 에서 不能省，宾语 책을 也不能省，助词是成分标记符号。', noteEn: 'The location particle 에서 can\'t be omitted, and the object 책을 can\'t be omitted either—particles mark grammatical roles.' },
    ],
    readingGuide: {
      title: '先看句尾，再往前拆', titleEn: 'Look at the ending first, then work backwards',
      body: '这个习惯能让你快速理解任何韩语句子，即使它很长。', bodyEn: 'This habit lets you quickly understand any Korean sentence, even long ones.',
      steps: [
        { num: 1, text: '先看<span>句尾</span>：判断动作还是状态', textEn: 'First check the <span>ending</span>: is it an action or a state?' },
        { num: 2, text: '再看<span>谁</span>在做这件事', textEn: 'Then see <span>who</span> is doing it.' },
        { num: 3, text: '最后补充<span>对象、地点、时间</span>', textEn: 'Finally add the <span>object, place, and time</span>.' },
      ],
      demo: {
        ko: '저는 도서관에서 책을 읽어요.',
        rows: [
          { label: '① 句尾', labelEn: '① Ending', text: '<span style="background:#ff7fa8;color:white;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">읽어요 → 读</span>', textEn: '<span style="background:#ff7fa8;color:white;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">읽어요 → read</span>' },
          { label: '② 谁', labelEn: '② Who', text: '<span style="background:#ddf5ef;color:#2db89b;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">저는 → 我</span>', textEn: '<span style="background:#ddf5ef;color:#2db89b;padding:3px 9px;border-radius:7px;font-size:16px;font-weight:700">저는 → I</span>' },
          { label: '③ 补充', labelEn: '③ Add details', text: '도서관에서（在图书馆）책을（书）', textEn: '도서관에서 (at the library) 책을 (book)' },
        ],
        result: '→ 我在图书馆读书。', resultEn: '→ I read books at the library.',
      },
    },
    specialQuiz: {
      type: 'judge',
      title: '哪句是对的？', titleEn: 'Which sentence is correct?',
      body: '两句中只有一句语序正确，点击选出正确的那句。', bodyEn: 'Only one of the two sentences has correct word order—tap to choose it.',
      questions: [
        { options: ['저는 학교에 갑니다', '저는 갑니다 학교에'], answer: 0, explanation: '갑니다（去）是动词，必须放句末，학교에（去学校）放在动词前面。', explanationEn: '갑니다 (go) is a verb and must go at the end; 학교에 (to school) goes before the verb.' },
        { options: ['저는 밥을 먹어요', '저는 먹어요 밥을'], answer: 0, explanation: '먹어요（吃）是动词，必须放句末，밥을（饭）是宾语放在动词前面。', explanationEn: '먹어요 (eat) is a verb and must go at the end; 밥을 (rice) is the object and goes before the verb.' },
        { options: ['책이 있어요', '있어요 책이'], answer: 0, explanation: '있어요 表示"有/存在"，也是谓语，同样要放在句末。', explanationEn: '있어요 means "have/exist" and is also a predicate, so it goes at the end too.' },
        { options: ['오늘 저는 학교에 가요', '가요 오늘 저는 학교에'], answer: 0, explanation: '谓语 가요 必须放句末。"가요 오늘 저는 학교에" 把动词放在了句首，违反了韩语 SOV 语序的铁则。', explanationEn: 'The predicate 가요 must go at the end. "가요 오늘 저는 학교에" puts the verb first, breaking Korean\'s strict SOV order.' },
      ],
    },
    compareHtml: `<div class="card-title">韩语语序 vs 中文语序</div>
<div class="card-body">韩语是 SOV 语序（主语+宾语+动词），中文是 SVO（主语+动词+宾语）。动词永远在句末——这是韩语所有句子的铁则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">中文语序（SVO）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词在宾语前</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">我 喝 咖啡。</span><span style="font-size:16px;color:#5a4640">主→动→宾</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">他 看 电影。</span><span style="font-size:16px;color:#5a4640">主→动→宾</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">韩语语序（SOV）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词在句末</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 커피를 마셔요.</span><span style="font-size:16px;color:#5a4640">主→宾→动</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저는 영화를 봐요.</span><span style="font-size:16px;color:#5a4640">主→宾→动</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">助词标记成分</div><div style="font-size:16px;color:#5a4640">韩语靠助词（는/가/를/에）标记每个词的成分，语序可以调整但动词必须在末尾。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">저는（主）커피를（宾）마셔요（谓）— 助词告诉你谁是主语谁是宾语。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">커피를 저는 마셔요 — 调换顺序仍然正确，因为助词没变。</div></div>
<div class="reminder-box">커피를 마셔요 저는 ✗（动词不在末尾）— 无论怎么调顺序，动词必须在最后。这是韩语语序唯一不能打破的规则。</div>`,
    compareLabel: '韩语语序（SOV）vs 中文语序（SVO）', compareLabelEn: 'Korean word order (SOV) vs. Chinese word order (SVO)',
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
    whatItDoes: '正式场合的礼貌说法', whatItDoesEn: 'Polite speech for formal situations',
    whatItDoesBody: '一种语气，搞定面试、课堂、公告三大场景。', whatItDoesBodyEn: 'One tone covers interviews, classrooms, and announcements.',
    structureNote: '下面是正式体的三种句型。\n先认识「词干有无收音→词尾变化」这一条，剩下的靠感觉就能记住。', structureNoteEn: 'Here are three formal sentence patterns.\\nFirst learn "stem with or without batchim → ending change," and the rest you\'ll pick up naturally.',
    rulesNote: '词尾变化只看一件事：\n词干最后一个音节有没有收音（받침）。\n这和中文完全不同，但两条规则就能覆盖所有情况。', rulesNoteEn: 'Ending changes depend on just one thing:\\nwhether the stem\'s last syllable has a batchim (받침).\\nThis is totally different from Chinese, but two rules cover all cases.',
    scenarioNote: '正式体用在面试、课堂提问、公开演讲、新闻播报。\n和朋友或平辈说话用这种语气会显得很生硬，日常聊天下节课学。', scenarioNoteEn: 'Formal speech is used in interviews, class questions, public speeches, and news broadcasts.\\nUsing it with friends or peers sounds stiff—casual talk comes next lesson.',
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
        zh: '我是学生。', zhEn: 'I am a student.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생입니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부합니다',
        zh: '我学习韩语。', zhEn: 'I study Korean.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부합니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 밥을 먹습니다',
        zh: '我吃饭。', zhEn: 'I eat.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹습니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 갑니다',
        zh: '我去学校。', zhEn: 'I go to school.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갑니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干无收音 → -ㅂ니다 / -ㅂ니까?', textEn: 'Stem ends in a vowel → -ㅂ니다 / -ㅂ니까?', examples: '가다→갑니다 / 마시다→마십니다' },
      { type: 'rule',    text: '词干有收音 → -습니다 / -습니까?', textEn: 'Stem ends in a consonant → -습니다 / -습니까?',  examples: '먹다→먹습니다 / 읽다→읽습니다' },
      { type: 'rule',    text: '하다 固定变 합니다', textEn: '하다 always becomes 합니다',               examples: '공부하다→공부합니다 / 연습하다→연습합니다' },
      { type: 'rule',    text: '体词（名词）→ 입니다 / 입니까?', textEn: 'Nouns → 입니다 / 입니까?',   examples: '학생→학생입니다 / 친구→친구입니다' },
      { type: 'usage',   text: '疑问句只换词尾', textEn: 'For questions, just change the ending',                   examples: '-ㅂ니다→-ㅂ니까? / -습니다→-습니까? / 입니다→입니까?' },
      { type: 'compare', text: '正式体 vs 日常体不可混用', textEn: 'Don\'t mix formal and casual speech',          examples: '입니다/합니다 是一套；이에요/해요 是另一套', examplesEn: '입니다/합니다 go together; 이에요/해요 are a separate set' },
      { type: 'note',    text: '中文没有「说话前先选语体」这回事', textEn: 'Chinese doesn\'t have the concept of choosing a speech level before speaking',  examples: '中文对领导和对朋友用词稍变，句子结构不变；韩语要先按「场合+对方身份」选一整套句尾——正式体只是第一套，说错套=失礼，不只是说错词', examplesEn: 'In Chinese, you slightly change your wording for a boss vs. a friend, but the sentence structure stays the same. In Korean, you first pick a whole set of endings based on the situation and the other person\'s status—the formal style is just one set. Using the wrong set is rude, not just a word choice error.' },
      { type: 'note',    text: 'ㄹ 收音是例外，要脱落', textEn: 'The ㄹ batchim is an exception—it drops.',            examples: '살다→삽니다・알다→압니다・만들다→만듭니다：词干带 ㄹ 收音时，ㄹ 先脱落再接 -ㅂ니다，不是 -습니다', examplesEn: '살다→삽니다, 알다→압니다, 만들다→만듭니다: when the stem ends in ㄹ, the ㄹ drops before adding -ㅂ니다, not -습니다.' },
      { type: 'example', text: '저는 회사원입니다 / 저는 음악을 듣습니다 / 여기는 서울입니까?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생입니다', role: 'verb' },
        ],
        zh: '我是学生。', zhEn: 'I am a student.',
        swapRole: 'verb',
          swapWords: ['선생님입니다', '회사원입니다', '요리사입니다'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부합니다', role: 'verb' },
        ],
        zh: '我学习韩语。', zhEn: 'I study Korean.',
        swapRole: 'verb',
          swapWords: ['공부합니다', '배웁니다', '연습합니다'],
      },
      {
        wordBlocks: [
          { text: '음악을', role: 'object' },
          { text: '듣습니다', role: 'verb' },
        ],
        zh: '听音乐。', zhEn: 'Listen to music.',
        swapWords: ['듣습니다', '찾습니다', '삽니다'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '카페에', role: 'place' },
          { text: '갑니다', role: 'verb' },
        ],
        zh: '我去咖啡店。', zhEn: 'I\'m going to a café.',
        swapWords: ['카페에', '학교에', '서울에'],
        swapRole: 'place',
      },
    ],
    scenarios: [
      { icon: '🎤', context: '初次见面', contextEn: 'first meeting', ko: '저는 김민준입니다. 중국 사람입니다.', zh: '我是金民俊。是中国人。', zhEn: 'I\'m Kim Min-jun. I\'m Chinese.' },
      { icon: '🎓', context: '课堂回答', contextEn: 'Classroom answer', ko: '저는 한국어를 공부합니다.', zh: '我学习韩语。', zhEn: 'I study Korean.' },
      { icon: '📢', context: '广播/公告', contextEn: 'Broadcast/announcement', ko: '수업을 시작합니다.', zh: '开始上课。', zhEn: 'Let\'s start class.' },
      { icon: '💼', context: '面试开场', contextEn: 'Interview opening', ko: '저는 회사원입니다. 잘 부탁드립니다.', zh: '我是公司职员。请多关照。', zhEn: 'I\'m a company employee. Nice to meet you.' },
      { icon: '🎵', context: 'KPOP 字幕正式字', contextEn: 'KPOP subtitles in formal style', ko: '저는 음악을 좋아합니다.', zh: '我喜欢音乐。（正式体字幕）', zhEn: 'I like music. (formal subtitle)' },
      { icon: '🗺️', context: '旅行问路', contextEn: 'Asking for directions while traveling', ko: '여기는 명동입니까?', zh: '这里是明洞吗？', zhEn: 'Is this Myeongdong?' },
    ],
    mistakes: [
      { wrong: '먹ㅂ니다', correct: '먹습니다', note: '먹 词干有收音，所以用 -습니다，不是 -ㅂ니다。', noteEn: 'The stem 먹 has a batchim, so use -습니다, not -ㅂ니다.' },
      { wrong: '가습니다', correct: '갑니다', note: '가 词干无收音，所以用 -ㅂ니다，不是 -습니다。', noteEn: 'The stem 가 has no batchim, so use -ㅂ니다, not -습니다.' },
      { wrong: '학생습니다', correct: '학생입니다', note: '학생 是名词，名词后用 입니다，不是 습니다。', noteEn: '학생 is a noun; after nouns use 입니다, not 습니다.' },
      { wrong: '살습니다', correct: '삽니다', note: '살다 词干带 ㄹ 收音，是例外：ㄹ 要先脱落再接 -ㅂ니다，所以是 삽니다，不是 살습니다。알다→압니다、만들다→만듭니다 同理。', noteEn: 'The stem 살다 ends in ㄹ, which is an exception: the ㄹ drops before adding -ㅂ니다, so it\'s 삽니다, not 살습니다. Same for 알다→압니다 and 만들다→만듭니다.' },
      { wrong: '저는 학생입니다. 공부해요.', correct: '저는 학생입니다. 공부합니다.', note: '입니다/합니다 是正式体；이에요/해요 是日常体，一句话里选一种，不要混用。', noteEn: '입니다/합니다 is formal; 이에요/해요 is casual. Pick one per sentence—don\'t mix them.' },
    ],
    quickTable: {
      title: '一张表搞定所有变化', titleEn: 'One table covers all the changes',
      body: '陈述句和疑问句结构完全对称，换个词尾就好。', bodyEn: 'Statements and questions have perfectly symmetrical structures—just swap the ending.',
      headers: ['词性/规则', '陈述句', '疑问句', '例子'],
      rows: [
        ['动词/形容词\n词干无收音', { ko: '-ㅂ니다', zh: '正式体陈述句', zhEn: 'Formal statement' }, { ko: '-ㅂ니까?', zh: '正式体疑问句', zhEn: 'Formal question' }, { ko: '가다→갑니다\n마시다→마십니다', zh: '去→正式体\n喝→正式体', zhEn: 'go→formal\\ndrink→formal' }],
        ['动词/形容词\n词干有收音', { ko: '-습니다', zh: '正式体陈述句', zhEn: 'Formal statement' }, { ko: '-습니까?', zh: '正式体疑问句', zhEn: 'Formal question' }, { ko: '앉다→앉습니다\n먹다→먹습니다', zh: '坐→正式体\n吃→正式体', zhEn: 'sit→formal\\neat→formal' }],
        ['하다 型动词', { ko: '합니다', zh: '하다正式体', zhEn: '하다 formal' }, { ko: '합니까?', zh: '하다正式疑问', zhEn: 'Formal question form of 하다' }, { ko: '공부하다→공부합니다', zh: '学习→正式体', zhEn: 'Study → Formal form' }],
        ['体词（名词）', { ko: '-입니다', zh: '名词正式体', zhEn: 'Noun formal form' }, { ko: '-입니까?', zh: '名词正式疑问', zhEn: 'Noun formal question' }, { ko: '학생→학생입니다\n친구→친구입니다', zh: '学生→正式体\n朋友→正式体', zhEn: 'Student → formal form\\nFriend → formal form' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选出正确的变形结果', titleEn: 'Choose the correct conjugated form',
      body: '根据词典形，选出正确的正式体变形。', bodyEn: 'Based on the dictionary form, choose the correct formal form.',
      questions: [
        { prompt: '词典形：가다（去）', promptEn: 'Dictionary form: 가다 (to go)', options: ['갑니다', '가습니다', '가ㅂ니다'], answer: 0, explanation: '가 词干无收音→用 -ㅂ니다，所以是 갑니다。', explanationEn: 'The stem 가 has no final consonant → use -ㅂ니다, so it\'s 갑니다.' },
        { prompt: '词典形：먹다（吃）', promptEn: 'Dictionary form: 먹다 (to eat)', options: ['먹ㅂ니다', '먹습니다', '먹이다'], answer: 1, explanation: '먹 词干有收音→用 -습니다，所以是 먹습니다。', explanationEn: 'The stem 먹 has a final consonant → use -습니다, so it\'s 먹습니다.' },
        { prompt: '词典形：하다（做）', promptEn: 'Dictionary form: 하다 (to do)', options: ['하ㅂ니다', '하습니다', '합니다'], answer: 2, explanation: '하다 固定变 합니다，这是唯一特例，直接记住。', explanationEn: '하다 always becomes 합니다 — this is the only exception, just memorize it.' },
        { prompt: '词典形：읽다（读）', promptEn: 'Dictionary form: 읽다 (to read)', options: ['읽ㅂ니다', '읽습니다', '읽어요'], answer: 1, explanation: '읽 词干有收音→用 -습니다，所以是 읽습니다。', explanationEn: 'The stem 읽 has a final consonant → use -습니다, so it\'s 읽습니다.' },
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
    whatItDoes: '日常对话最常用的说法', whatItDoesEn: 'The most common speech for everyday conversation',
    whatItDoesBody: '和朋友聊天、发动态、追剧评论，全靠这一课。\n和中文不同：\n韩语动词分两套说法，하다 动词直接变成 해요，其他动词要看词干最后一个元音来决定接 아요 还是 어요。', whatItDoesBodyEn: 'Chatting with friends, posting updates, commenting on shows—this lesson has you covered.\\nUnlike Chinese:\\nKorean verbs have two sets of forms. 하다 verbs become 해요 directly; others depend on the last vowel of the stem to choose between 아요 and 어요.',
    structureNote: '这节课的句型是日常生活里用得最多的。\n同样先看框架，不用担心所有变化规则，练习的时候自然就记住了。', structureNoteEn: 'These patterns are the most used in daily life.\\nSame approach—look at the structure first, don\'t stress over all the rules; you\'ll remember them through practice.',
    rulesNote: '变化规则看起来多，但核心只有一条：\n词干最后的元音决定用 아요 还是 어요。\n하다 动词直接记 해요 就行。', rulesNoteEn: 'The rules look like a lot, but there\'s one core idea:\\nthe last vowel of the stem decides between 아요 and 어요.\\nFor 하다 verbs, just remember 해요.',
    scenarioNote: '해요 体是韩语里使用频率最高的语体，聊天、发消息、追剧评论、和陌生人对话都用这个。\n学好这课，日常80%的场景都能应对。', scenarioNoteEn: 'The 해요 form is the most frequently used speech level in Korean—used for chatting, texting, commenting on shows, and talking to strangers.\\nMaster this lesson and you\'ll handle 80% of daily situations.',
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
        zh: '我是学生。', zhEn: 'I am a student.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
      },
      {
        ko: '여기는 카페예요',
        zh: '这里是咖啡店。', zhEn: 'This is a coffee shop.',
        tokens: [
          { text: '여기는', role: 'subject' },
          { text: '카페예요', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부해요',
        zh: '我学习韩语。', zhEn: 'I study Korean.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래가 좋아요',
        zh: '这首歌很好听。', zhEn: 'This song is really good.',
        tokens: [
          { text: '이 노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干末元音为 ㅏ/ㅗ → -아요（常缩写）', textEn: 'If the stem\'s last vowel is ㅏ/ㅗ → -아요 (often contracted)', examples: '가다→가요 / 오다→와요 / 보다→봐요' },
      { type: 'rule',    text: '其他元音 → -어요', textEn: 'Other vowels → -어요',                   examples: '먹다→먹어요 / 읽다→읽어요 / 마시다→마셔요' },
      { type: 'rule',    text: '하다 固定变 해요', textEn: '하다 always becomes 해요',                   examples: '공부하다→공부해요 / 좋아하다→좋아해요' },
      { type: 'rule',    text: '无收音名词 → -예요', textEn: 'Noun without final consonant → -예요',                  examples: '카페→카페예요 / 가수→가수예요' },
      { type: 'rule',    text: '有收音名词 → -이에요', textEn: 'Noun with final consonant → -이에요',                examples: '학생→학생이에요 / 음악→음악이에요' },
      { type: 'note',    text: 'ㅡ 脱落：词干末为 ㅡ 时 ㅡ 脱落，前音节是 ㅏ/ㅗ 接 -아요，其他接 -어요', textEn: 'ㅡ drops: when the stem ends in ㅡ, it drops; if the preceding syllable is ㅏ/ㅗ, use -아요, otherwise -어요', examples: '아프다→아파요（ㅏ）/ 예쁘다→예뻐요（ㅔ） / 크다→커요（无前音节，默认 어）', examplesEn: '아프다→아파요 (ㅏ) / 예쁘다→예뻐요 (ㅔ) / 크다→커요 (no preceding syllable, default 어)' },
      { type: 'note',    text: '先分「名词」还是「动/形」，再决定接哪套', textEn: 'First decide if it\'s a noun or verb/adjective, then choose the set',  examples: '名词（학생・카페）才接 이에요/예요；动词形容词（먹다・좋다）接 아/어요。别被中文「是」带偏——「好」是形容词 좋아요，不是 좋다예요', examplesEn: 'Only nouns (학생, 카페) take 이에요/예요; verbs and adjectives (먹다, 좋다) take 아/어요. Don\'t be misled by the Chinese \'is\' — \'good\' is the adjective 좋아요, not 좋다예요' },
      { type: 'note',    text: '이에요/예요 就是「是」，不用再找一个「是」', textEn: '이에요/예요 already means \'is\' — no need to add another \'is\'',  examples: '학생이에요 已经等于「是学生」；写成 학생이에요 前面别再想补一个对应「是」的词', examplesEn: '학생이에요 already means "is a student"; when writing 학생이에요, don\'t try to add a separate word for "is" before it.' },
      { type: 'example', text: '저는 학생이에요 / 이 노래가 좋아요 / 여기는 카페예요 / 오늘 날씨가 좋아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
        zh: '我是学生。', zhEn: 'I am a student.',
        swapWords: ['학생이에요', '팬이에요', '회사원이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '여기는', role: 'subject' },
          { text: '카페예요', role: 'verb' },
        ],
        zh: '这里是咖啡店。', zhEn: 'This is a coffee shop.',
        swapWords: ['카페예요', '학교예요', '식당이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。', zhEn: 'I drink coffee.',
        swapWords: ['마셔요', '좋아해요', '사요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래가', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '这首歌很好听。', zhEn: 'This song is really good.',
        swapRole: 'subject',
          swapWords: ['이 노래가', '이 무대가', '이 가사가'],
      },
    ],
    scenarios: [
      { icon: '💬', context: '日常自我介绍', contextEn: 'Everyday self-introduction', ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.' },
      { icon: '☕', context: '咖啡店日常', contextEn: 'Coffee shop daily life', ko: '여기는 제가 자주 오는 카페예요.', zh: '这里是我常来的咖啡店。', zhEn: 'This is the coffee shop I usually come to.' },
      { icon: '📓', context: '韩语日记', contextEn: 'Korean diary', ko: '오늘은 날씨가 좋아요.', zh: '今天天气很好。', zhEn: 'The weather is really nice today.' },
      { icon: '🤳', context: 'SNS 打卡', contextEn: 'SNS check-in', ko: '저는 지금 한국어를 공부해요!', zh: '我现在正在学韩语！', zhEn: 'I\'m learning Korean right now!' },
      { icon: '🍽️', context: '餐厅点餐', contextEn: 'Ordering at a restaurant', ko: '이 음식이 맛있어요.', zh: '这道菜很好吃。', zhEn: 'This dish is really delicious.' },
      { icon: '🎬', context: '追剧评论', contextEn: 'Drama review', ko: '이 드라마가 정말 재미있어요.', zh: '这部剧真的很好看。', zhEn: 'This drama is really good.' },
    ],
    mistakes: [
      { wrong: '학생예요', correct: '학생이에요', note: '학생 有收音 ㅇ，所以用 이에요。记住：有收音→이에요。', noteEn: '학생 has a final consonant ㅇ, so use 이에요. Remember: final consonant → 이에요.' },
      { wrong: '학교이에요', correct: '학교예요', note: '학교 无收音，所以用 예요。记住：无收音→예요。', noteEn: '학교 has no final consonant, so use 예요. Remember: no final consonant → 예요.' },
      { wrong: '공부하요', correct: '공부해요', note: '하다 动词变日常体要变成 해요，不是 하요。하→해！', noteEn: 'The verb 하다 changes to 해요 in the casual form, not 하요. 하→해!' },
      { wrong: '이 노래가 좋아이에요', correct: '이 노래가 좋아요', note: '좋다 是形容词，直接变 좋아요；이에요 只接名词。被中文「是好的」带偏了，韩语这里没有「是」。', noteEn: '좋다 is an adjective, so it becomes 좋아요 directly; 이에요 only attaches to nouns. Don\'t be misled by the Chinese "is good" — Korean doesn\'t have "is" here.' },
      { wrong: '저는 학생입니다. 저는 카페예요.', correct: '저는 학생입니다. 저는 카페에 갑니다.', note: '正式体（입니다）和日常体（예요/이에요）不要混用，语感会很奇怪。同一段话选一种语体。', noteEn: 'Don\'t mix the formal form (입니다) and the casual form (예요/이에요) — it\'ll sound weird. Pick one style for the whole sentence.' },
    ],
    quickTable: {
      title: '正式体 vs 日常体对照', titleEn: 'Formal vs. casual speech comparison',
      body: '两课内容放一起，对比记忆更高效。', bodyEn: 'Putting two lessons together makes it easier to memorize by comparison.',
      headers: ['词性/规则', '正式体（第2课）', '日常体（这节课）'],
      rows: [
        ['动词/形容词\n词干末元音 ㅏ/ㅗ', { ko: '-ㅂ니다', zh: '正式体陈述', zhEn: 'Formal statement' }, { ko: '-아요', zh: '日常体ㅏ/ㅗ结尾', zhEn: 'Casual form with ㅏ/ㅗ ending' }],
        ['动词/形容词\n其他情况', { ko: '-습니다', zh: '正式体陈述', zhEn: 'Formal statement' }, { ko: '-어요', zh: '日常体其他', zhEn: 'Casual form with other endings' }],
        ['하다 型动词', { ko: '합니다', zh: '하다正式体', zhEn: '하다 formal' }, { ko: '해요', zh: '하다日常体', zhEn: '하다 casual form' }],
        ['名词（无收音）', { ko: '입니다', zh: '名词正式体', zhEn: 'Noun formal form' }, { ko: '-예요', zh: '无收音名词日常', zhEn: 'Casual form for nouns without final consonant' }],
        ['名词（有收音）', { ko: '입니다', zh: '名词正式体', zhEn: 'Noun formal form' }, { ko: '-이에요', zh: '有收音名词日常', zhEn: 'Casual form for nouns with final consonant' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '选出正确的日常体变形', titleEn: 'Choose the correct casual form',
      body: '根据词典形，选出正确的日常体变形。', bodyEn: 'Based on the dictionary form, choose the correct casual form.',
      questions: [
        { prompt: '词典形：가다（去）', promptEn: 'Dictionary form: 가다 (to go)', options: ['가요', '거요', '해요'], answer: 0, explanation: '词干 가 末元音为 ㅏ→아요→缩写为 가요。', explanationEn: 'The stem 가 ends in vowel ㅏ → 아요 → contracted to 가요.' },
        { prompt: '词典形：먹다（吃）', promptEn: 'Dictionary form: 먹다 (to eat)', options: ['먹요', '먹어요', '먹아요'], answer: 1, explanation: '词干 먹 末元音非 ㅏ/ㅗ→어요→먹어요。', explanationEn: 'The stem 먹 doesn\'t end in ㅏ/ㅗ → 어요 → 먹어요.' },
        { prompt: '词典形：하다（做）', promptEn: 'Dictionary form: 하다 (to do)', options: ['하어요', '하요', '해요'], answer: 2, explanation: '하다 固定变 해요，是唯一的特殊变化，直接记。', explanationEn: '하다 always becomes 해요 — it\'s the only irregular one, just memorize it.' },
        { prompt: '词典形：오다（来）', promptEn: 'Dictionary form: 오다 (to come)', options: ['오요', '와요', '오어요'], answer: 1, explanation: '오 末元音为 ㅗ→아요→오+아요 缩约成 와요。', explanationEn: '오 ends in vowel ㅗ → 아요 → 오+아요 contracts to 와요.' },
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
    whatItDoes: '把话题提出来，说"是/不是"', whatItDoesEn: 'Bring up a topic and say "yes/no"',
    whatItDoesBody: '一个助词，让对方知道你接下来要说谁/什么，还能制造对比感。', whatItDoesBodyEn: 'One particle tells the listener who or what you\'re talking about next, and can create contrast.',
    structureNote: '은/는 加在句子主题后面，告诉听者「接下来说的是关于这个的」。\n下面的结构展示它出现在哪个位置。', structureNoteEn: '은/는 attaches after the sentence topic, telling the listener "what follows is about this."\\nThe structure below shows where it goes.',
    rulesNote: '只需要看一件事：\n这个词最后有没有收音（받침）。\n有收音用 은，没有用 는。\n这个规则贯穿韩语所有助词，掌握了很有用。', rulesNoteEn: 'Just check one thing:\\nwhether the word ends with a batchim (받침).\\nWith batchim use 은, without use 는.\\nThis rule applies to all Korean particles—mastering it is very useful.',
    scenarioNote: '은/는 在几乎所有句子里都会出现自我介绍、描述事物、做对比都用它。\n中文通常省略这个位置的词，所以初学者容易忘加。', scenarioNoteEn: '은/는 appears in almost every sentence—used for self-introductions, describing things, and making comparisons.\\nChinese often omits this particle, so beginners tend to forget to add it.',
    compareLabel: '有收音 vs 无收音', compareLabelEn: 'With batchim vs. without batchim',
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
        zh: '我是学生。', zhEn: 'I am a student.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 재미있어요',
        zh: '韩语很有意思。', zhEn: 'Korean is really interesting.',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
      {
        ko: '커피는 좋아해요',
        zh: '咖啡我喜欢。', zhEn: 'I like coffee.',
        tokens: [
          { text: '커피는', role: 'subject' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 바빠요',
        zh: '今天忙。', zhEn: 'I\'m busy today.',
        tokens: [
          { text: '오늘은', role: 'subject' },
          { text: '바빠요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '有收音名词 → 은', textEn: 'Noun with batchim → 은',   examples: '책→책은 / 학생→학생은 / 한국→한국은' },
      { type: 'rule',    text: '无收音名词 → 는', textEn: 'Noun without batchim → 는',   examples: '저→저는 / 학교→학교는 / 커피→커피는' },
      { type: 'usage',   text: '用法一：提出话题', textEn: 'Usage 1: Introducing a topic',  examples: '저는 학생이에요（关于我——）', examplesEn: '저는 학생이에요 (About me —)' },
      { type: 'usage',   text: '用法二：制造对比', textEn: 'Usage 2: Creating contrast',  examples: '커피는 좋아해요. 차는 별로예요.（咖啡我喜欢，茶一般般。）', examplesEn: '커피는 좋아해요. 차는 별로예요. (I like coffee. Tea is just so-so.)' },
      { type: 'vocab',   text: '人称常见形', textEn: 'Common personal forms',        examples: '저는（我，正式）/ 나는（我，口语）/ 우리는（我们）', examplesEn: '저는 (I, formal) / 나는 (I, casual) / 우리는 (we)' },
      { type: 'note',    text: '은/는 ≠ "是"', textEn: '은/는 ≠ "is"',     examples: '저는 里的 는 只是话题标记，"是"是后面的 이에요', examplesEn: 'The 는 in 저는 is just a topic marker; "is" is the 이에요 that follows.' },
      { type: 'compare', text: '先建立语感：은/는 提「已知话题」，이/가 提「新登场/焦点」', textEn: 'Build intuition first: 은/는 marks a "known topic," 이/가 marks "new/focus."',  examples: '누가 학생이에요?（谁是学生?）→ 제가 학생이에요（是我，焦点用 가）；话题已知时才用 저는 학생이에요。이/가 后面章节专门学，这里先有个印象', examplesEn: '누가 학생이에요? (Who is the student?) → 제가 학생이에요 (It\'s me, focus uses 가); only when the topic is known do you use 저는 학생이에요. 이/가 is covered in a later chapter — just get a feel for it here.' },
      { type: 'example', text: '저는 중국 사람이에요 / 한국어는 재미있어요 / 오늘은 시간이 없어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생이에요', role: 'verb' },
        ],
        zh: '我是学生。', zhEn: 'I am a student.',
        swapRole: 'subject',
          swapWords: ['저는', '친구는', '언니는'],
      },
      {
        wordBlocks: [
          { text: '커피는', role: 'subject' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '咖啡我喜欢。', zhEn: 'I like coffee.',
        swapRole: 'subject',
          swapWords: ['커피는', '이 노래는', '라면은'],
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'subject' },
          { text: '바빠요', role: 'verb' },
        ],
        zh: '今天忙。', zhEn: 'I\'m busy today.',
        swapRole: 'subject',
          swapWords: ['오늘은', '내일은', '지금은'],
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '韩语很有意思。', zhEn: 'Korean is really interesting.',
        swapRole: 'subject',
          swapWords: ['한국어는', '한국 음식은', '이 드라마는'],
      },
    ],
    scenarios: [
      { icon: '👤', context: '初次见面', contextEn: 'first meeting', ko: '저는 왕쯔단이에요. 중국 사람이에요.', zh: '我叫王子丹，是中国人。', zhEn: 'My name is Wang Zidan, and I\'m Chinese.' },
      { icon: '☕', context: '聊偏好（对比）', contextEn: 'Talking about preferences (contrast)', ko: '커피는 좋아해요. 차는 별로예요.', zh: '咖啡我喜欢，茶一般般。', zhEn: 'I like coffee, but tea is just so-so.' },
      { icon: '📅', context: '约时间（对比）', contextEn: 'Making plans (contrast)', ko: '오늘은 바빠요. 내일은 괜찮아요.', zh: '今天忙，明天可以。', zhEn: 'I\'m busy today, but tomorrow works.' },
      { icon: '📓', context: '韩语日记话题', contextEn: 'Korean diary topic', ko: '오늘은 날씨가 정말 좋아요.', zh: '今天天气真的很好。', zhEn: 'The weather is really nice today.' },
      { icon: '🍽️', context: '餐厅偏好', contextEn: 'Restaurant preferences', ko: '한식은 좋아해요. 양식은 별로예요.', zh: '韩餐我喜欢，西餐一般般。', zhEn: 'I like Korean food, but Western food is just okay.' },
      { icon: '🎵', context: '音乐偏好', contextEn: 'Music preferences', ko: '이 노래는 정말 좋아해요.', zh: '这首歌我真的很喜欢。', zhEn: 'I really like this song.' },
    ],
    mistakes: [
      { wrong: '책는 좋아요', correct: '책은 좋아요', note: '책 有收音 ㄱ，所以用 은，不是 는。', noteEn: '책 has the final consonant ㄱ, so use 은, not 는.' },
      { wrong: '저은 학생이에요', correct: '저는 학생이에요', note: '저 无收音，所以用 는，不是 은。', noteEn: '저 has no final consonant, so use 는, not 은.' },
      { wrong: '오늘는 바빠요', correct: '오늘은 바빠요', note: '오늘 末字 늘 有收音 ㄹ → 은。', noteEn: 'The last syllable of 오늘 is 늘, which has the final consonant ㄹ → use 은.' },
      { wrong: '커피은 맛있어요', correct: '커피는 맛있어요', note: '커피 末字 피 无收音 → 는。', noteEn: 'The last syllable of 커피 is 피, which has no final consonant → use 는.' },
      { wrong: '누가 학생이에요? — 저는 학생이에요.', correct: '누가 학생이에요? — 제가 학생이에요.', note: '这不是收音选错，是用法：回答「谁?」时焦点在自己，要用焦点助词 이/가（저+가=제가），不用话题助词 저는。이/가 后面章节详学。', noteEn: 'This isn\'t about choosing the wrong final consonant—it\'s about usage: when answering \'who?\', the focus is on yourself, so use the focus particle 이/가 (저+가=제가), not the topic particle 저는. We\'ll cover 이/가 in detail in a later chapter.' },
    ],
    quickTable: {
      title: '은/는 收音速查表', titleEn: '은/는 Final Consonant Quick Reference',
      body: '看最后一个字有没有收音，两秒做判断。', bodyEn: 'Check if the last syllable has a final consonant—make the call in two seconds.',
      headers: ['词', '中文', '有无收音', '结果'],
      rows: [
        ['저', '我', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '저는', zh: '我（话题）', zhEn: 'I (topic)' }],
        ['우리', '我们', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '우리는', zh: '我们（话题）', zhEn: 'We (topic)' }],
        ['장이 씨', '张伊', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '장이 씨는', zh: '张伊（话题）', zhEn: 'Jang-i (topic)' }],
        ['선생님', '老师', { ko: '有받침 ㅁ', zh: '有收音ㅁ', zhEn: 'Has final consonant ㅁ' }, { ko: '선생님은', zh: '老师（话题）', zhEn: 'Teacher (topic)' }],
        ['학생', '学生', { ko: '有받침 ㅇ', zh: '有收音ㅇ', zhEn: 'Has final consonant ㅇ' }, { ko: '학생은', zh: '学生（话题）', zhEn: 'Student (topic)' }],
        ['한국', '韩国', { ko: '有받침 ㄱ', zh: '有收音ㄱ', zhEn: 'Has final consonant ㄱ' }, { ko: '한국은', zh: '韩国（话题）', zhEn: 'Korea (topic)' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选对 은/는', titleEn: 'Choose the correct 은/는',
      body: '根据名词有无收音，选择正确的话题助词。', bodyEn: 'Choose the correct topic particle based on whether the noun has a final consonant.',
      questions: [
        { pre: '저', post: '학생이에요', options: ['은', '는'], answer: 1, explanation: '저 无收音→는。저는 학생이에요。', explanationEn: 'No final consonant → 는. 저는 학생이에요.' },
        { pre: '한국어', post: '재미있어요', options: ['은', '는'], answer: 1, explanation: '어 无收音→는。한국어는 재미있어요。', explanationEn: 'No final consonant → 는. 한국어는 재미있어요.' },
        { pre: '밥', post: '맛있어요', options: ['은', '는'], answer: 0, explanation: '밥 有收音 ㅂ→은。밥은 맛있어요。', explanationEn: 'Has final consonant ㅂ → 은. 밥은 맛있어요.' },
        { pre: '학생', post: '열심히 공부해요', options: ['은', '는'], answer: 0, explanation: '생 有收音 ㅇ→은。학생은 열심히 공부해요。', explanationEn: 'Has final consonant ㅇ → 은. 학생은 열심히 공부해요.' },
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
    whatItDoes: '标出动作的对象', whatItDoesEn: 'Mark the object of the action',
    whatItDoesBody: '을/를 标记动作的对象，也就是宾语。韩语靠을/를标出宾语，相当于告诉听者「动作落在谁身上」——每次都要加，不能省略。', whatItDoesBodyEn: '을/를 marks the object of an action—the direct object. Korean uses 을/를 to indicate the object, telling the listener \'who receives the action\'—it must be added every time and cannot be omitted.',
    structureNote: '을/를 标记「动作的对象是谁」，位置在动词前面。\n下面的结构展示它在句子里的位置。', structureNoteEn: '을/를 marks \'who is the object of the action\' and comes before the verb.\\nThe structure below shows its position in a sentence.',
    rulesNote: '跟 은/는 一样，只看最后有没有收音（받침）。\n有收音用 을，没有用 를。\n两条规则，一分钟记住。', rulesNoteEn: 'Just like 은/는, it depends on whether there\'s a final consonant (받침).\\nWith a final consonant, use 을; without, use 를.\\nTwo rules, memorized in a minute.',
    scenarioNote: '只要句子里有动作（吃、喝、看、学……），动作对象后面就要加 을/를。\n中文不需要这个标记，所以刚开始会经常忘记加。', scenarioNoteEn: 'Whenever there\'s an action (eat, drink, watch, study...), the object of that action must be followed by 을/를.\\nChinese doesn\'t need this marker, so you\'ll often forget to add it at first.',
    compareLabel: '有收音 vs 无收音', compareLabelEn: 'With batchim vs. without batchim',
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
        zh: '我吃饭。', zhEn: 'I eat.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 커피를 마셔요',
        zh: '我喝咖啡。', zhEn: 'I drink coffee.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
      },
      {
        ko: '저는 영화를 봐요',
        zh: '我看电影。', zhEn: 'I watch a movie.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '영화를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
      {
        ko: '저는 한국어를 공부해요',
        zh: '我学韩语。', zhEn: 'I study Korean.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '有收音名词 → 을', textEn: 'Nouns with a final consonant → 을',              examples: '밥→밥을 / 책→책을 / 음악→음악을' },
      { type: 'rule',    text: '无收音名词 → 를', textEn: 'Nouns without a final consonant → 를',              examples: '커피→커피를 / 한국어→한국어를 / 노래→노래를' },
      { type: 'usage',   text: '宾语放动词前，动词在句末', textEn: 'The object goes before the verb, and the verb is at the end of the sentence.',      examples: '저는 밥을 먹어요（不是 저는 먹어요 밥을）', examplesEn: '저는 밥을 먹어요 (not 저는 먹어요 밥을)' },
      { type: 'note',    text: '只有动作对象才加 을/를', textEn: 'Only the object of an action takes 을/를.',        examples: '학생이에요（身份），不加 을/를', examplesEn: '학생이에요 (identity), no 을/를.' },
      { type: 'note',    text: '을/를 不用翻译成"把/将"', textEn: '을/를 doesn\'t translate to "把/将."',      examples: '理解为动作落在这个名词上即可', examplesEn: 'Just understand it as the action being done to this noun.' },
      { type: 'compare', text: '좋아하다 加 을/를，좋다 加 이/가', textEn: '좋아하다 takes 을/를, 좋다 takes 이/가.', examples: '이 노래를 좋아해요（动词，喜欢） vs 이 노래가 좋아요（形容词，好听）', examplesEn: '이 노래를 좋아해요 (verb, to like) vs 이 노래가 좋아요 (adjective, is good).' },
      { type: 'example', text: '저는 밥을 먹어요 / 저는 커피를 마셔요 / 저는 한국어를 공부해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '밥을', role: 'object' },
          { text: '먹어요', role: 'verb' },
        ],
        zh: '我吃饭。', zhEn: 'I eat.',
        swapWords: ['밥을', '김밥을', '라면을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '我喝咖啡。', zhEn: 'I drink coffee.',
        swapWords: ['커피를', '물을', '주스를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '이 노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '我喜欢这首歌。', zhEn: 'I like this song.',
        swapWords: ['이 노래를', '이 드라마를', '이 무대를'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我学习韩语。', zhEn: 'I study Korean.',
        swapWords: ['한국어를 공부해요', '노래를 들어요', '영화를 봐요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🍜', context: '日常吃饭', contextEn: 'Eating a meal.', ko: '저는 김밥을 먹어요.', zh: '我吃紫菜包饭。', zhEn: 'I eat kimbap.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '저는 이 노래를 매일 들어요.', zh: '我每天听这首歌。', zhEn: 'I listen to this song every day.' },
      { icon: '📺', context: '推荐韩剧', contextEn: 'Recommending a K-drama.', ko: '저는 이 드라마를 봐요. 너무 재미있어요.', zh: '我在看这部剧，太有意思了。', zhEn: 'I\'m watching this drama; it\'s so interesting.' },
      { icon: '📚', context: '打卡学习', contextEn: 'Checking in to study.', ko: '저는 매일 한국어를 공부해요.', zh: '我每天学习韩语。', zhEn: 'I study Korean every day.' },
      { icon: '📖', context: '图书馆', contextEn: 'library', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。', zhEn: 'I\'m reading at the library.' },
      { icon: '☕', context: '咖啡店', contextEn: 'Cafe.', ko: '저는 카페에서 커피를 마셔요.', zh: '我在咖啡店喝咖啡。', zhEn: 'I drink coffee at a café.' },
    ],
    mistakes: [
      { wrong: '밥를 먹어요', correct: '밥을 먹어요', note: '밥 有收音 ㅂ，所以用 을，不是 를。', noteEn: '밥 ends with the final consonant ㅂ, so use 을, not 를.' },
      { wrong: '커피을 마셔요', correct: '커피를 마셔요', note: '커피 无收音，所以用 를，不是 을。', noteEn: '커피 has no final consonant, so use 를, not 을.' },
      { wrong: '저는 먹어요 밥을', correct: '저는 밥을 먹어요', note: '宾语（을/를）放在动词前面，动词在句末。', noteEn: 'The object (을/를) goes before the verb, and the verb comes at the end of the sentence.' },
      { wrong: '저는 학생을이에요', correct: '저는 학생이에요', note: '학생 是身份说明，不是动作对象，不加 을/를。', noteEn: '학생 describes identity, not an action target, so it doesn\'t take 을/를.' },
    ],
    quickTable: {
      title: '을/를 收音速查表', titleEn: '을/를 Final Consonant Quick Reference',
      body: '看最后一个字有没有收音，两秒做判断。', bodyEn: 'Check if the last syllable has a final consonant—make the call in two seconds.',
      headers: ['词', '中文', '有无收音', '结果'],
      rows: [
        ['빵', '面包', { ko: '有받침 ㅇ', zh: '有收音ㅇ', zhEn: 'Has final consonant ㅇ' }, { ko: '빵을', zh: '面包（宾格）', zhEn: 'bread (object)' }],
        ['밥', '饭', { ko: '有받침 ㅂ', zh: '有收音ㅂ', zhEn: 'has final consonant ㅂ' }, { ko: '밥을', zh: '饭（宾格）', zhEn: 'rice (object)' }],
        ['책', '书', { ko: '有받침 ㄱ', zh: '有收音ㄱ', zhEn: 'Has final consonant ㄱ' }, { ko: '책을', zh: '书（宾格）', zhEn: 'book (object)' }],
        ['한국어', '韩语', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '한국어를', zh: '韩语（宾格）', zhEn: 'Korean (object)' }],
        ['커피', '咖啡', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '커피를', zh: '咖啡（宾格）', zhEn: 'coffee (object)' }],
        ['영화', '电影', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '영화를', zh: '电影（宾格）', zhEn: 'movie (object)' }],
        ['친구', '朋友', { ko: '无받침', zh: '无收音', zhEn: 'No final consonant' }, { ko: '친구를', zh: '朋友（宾格）', zhEn: 'friend (object)' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '을 还是 를？', titleEn: '을 or 를?',
      body: '根据名词有无收音，选出正确的宾格助词。', bodyEn: 'Choose the correct object particle based on whether the noun has a final consonant.',
      questions: [
        { pre: '한국어', post: '공부해요', options: ['을', '를'], answer: 1, explanation: '어 无收音 → 를', explanationEn: '어 has no final consonant → 를' },
        { pre: '밥', post: '먹어요', options: ['을', '를'], answer: 0, explanation: '밥 有收音 ㅂ → 을', explanationEn: '밥 has final consonant ㅂ → 을' },
        { pre: '음악', post: '들어요', options: ['을', '를'], answer: 0, explanation: '악 有收音 ㄱ → 을', explanationEn: '악 has final consonant ㄱ → 을' },
        { pre: '커피', post: '마셔요', options: ['을', '를'], answer: 1, explanation: '피 无收音 → 를', explanationEn: '피 has no final consonant → 를' },
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
    whatItDoes: '说"在哪里"和"去哪里"', whatItDoesEn: 'Saying \'where\' and \'going where\'',
    whatItDoesBody: '에 可以表示去哪里、在哪里、几点，意思取决于后面的动词。\n和中文不同：\n中文"在/去/到"是三个词，韩语统一用 에，靠搭配的动词来区分含义。', whatItDoesBodyEn: '에 can indicate going to, being at, or a specific time—the meaning depends on the following verb.\\nUnlike Chinese:\\nChinese uses three words \'at/go/to\', but Korean uses 에 uniformly, distinguishing meaning by the verb it pairs with.',
    structureNote: '에 有三种用法，但形式完全一样。\n下面展示三种句型，靠后面的动词就能判断是哪种用法。', structureNoteEn: '에 has three uses, but the form is exactly the same.\\nBelow are three sentence patterns—the verb after it tells you which use it is.',
    rulesNote: '에 的规则简单：\n直接加在时间词或地点词后面，不看收音。\n关键是后面配什么动词：\n가다/오다→方向，있다/없다→存在，시간+에→时间点。', rulesNoteEn: 'The rule for 에 is simple:\\nAttach it directly after time or place words, regardless of final consonants.\\nThe key is the verb that follows:\\n가다/오다→direction, 있다/없다→existence, 시간+에→point in time.',
    scenarioNote: '에 在日常对话里极其常见说去哪里、在哪里、几点都用它。\n中文的"在/去/到"是三个词，韩语统一用 에，靠动词来区分含义。', scenarioNoteEn: '에 is extremely common in daily conversation—used for going somewhere, being somewhere, and telling time.\\nChinese uses \'at/go/to\' as three words, but Korean uses 에 uniformly, distinguishing meaning by the verb.',
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
        zh: '去学校。', zhEn: 'Go to school.',
        tokens: [
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '저는 집에 있어요',
        zh: '我在家。', zhEn: 'I\'m at home.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '집에', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
      },
      {
        ko: '세 시에 만나요',
        zh: '三点见。', zhEn: 'See you at three.',
        tokens: [
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
      },
      {
        ko: '서울에 살아요',
        zh: '住在首尔。', zhEn: 'Live in Seoul.',
        tokens: [
          { text: '서울에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'usage',   text: '방향: 地点 + 에 가요/와요', textEn: 'Direction: place + 에 가요/와요',           examples: '학교에 가요 / 한국에 와요' },
      { type: 'usage',   text: '존재: 地点 + 에 있어요/없어요/살아요', textEn: 'Existence: place + 에 있어요/없어요/살아요', examples: '집에 있어요 / 서울에 살아요' },
      { type: 'usage',   text: '시간: 时间词 + 에 + 动词', textEn: 'Time: time word + 에 + verb',              examples: '세 시에 만나요 / 토요일에 가요' },
      { type: 'note',    text: '这些时间词不加 에', textEn: 'These time words don\'t take 에',                    examples: '오늘・내일・어제・지금・매일・항상' },
      { type: 'note',    text: '에 不固定翻译为"在"，含义看搭配', textEn: '에 isn\'t always translated as "at/in" — its meaning depends on the context.',     examples: '학교에 가요=去（方向） / 집에 있어요=在（存在） / 세 시에 만나요=在三点（时间点）', examplesEn: '학교에 가요 = to (direction) / 집에 있어요 = at (existence) / 세 시에 만나요 = at 3 o\'clock (time point)' },
      { type: 'compare', text: '에 vs 에서',                          examples: '去/存在目标 → 에；在某地做动作 → 에서（下节课）', examplesEn: 'Target of going/existence → 에; doing an action somewhere → 에서 (next lesson)' },
      { type: 'example', text: '학교에 가요 / 집에 있어요 / 세 시에 만나요 / 서울에 살아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: ' 가요', role: 'verb' },
        ],
        zh: '我去学校。', zhEn: 'I go to school.',
        swapWords: ['학교에', '카페에', '병원에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '집에', role: 'place' },
          { text: ' 있어요', role: 'verb' },
        ],
        zh: '我在家。', zhEn: 'I\'m at home.',
        swapWords: ['집에', '도서관에', '회사에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '세 시에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '三点见。', zhEn: 'See you at three.',
        swapWords: ['세 시에', '토요일에', '주말에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '서울에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '住在首尔。', zhEn: 'Live in Seoul.',
        swapWords: ['서울에 살아요', '중국에 살아요', '한국에 살아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📍', context: '约朋友', contextEn: 'Making plans with a friend', ko: '토요일에 카페에 가요!', zh: '周六去咖啡店！', zhEn: 'Let\'s go to the café on Saturday!' },
      { icon: '🕑', context: '约见面时间', contextEn: 'Setting a meeting time', ko: '오후 두 시에 만나요.', zh: '下午两点见。', zhEn: 'See you at 2 PM.' },
      { icon: '🏠', context: '说明在哪', contextEn: 'Saying where you are', ko: '저는 지금 집에 있어요.', zh: '我现在在家。', zhEn: 'I\'m at home now.' },
      { icon: '🇰🇷', context: '旅行计划', contextEn: 'Travel plans', ko: '다음 달에 한국에 가요.', zh: '下个月去韩国。', zhEn: 'I\'m going to Korea next month.' },
      { icon: '📚', context: '学习作息', contextEn: 'Study routine', ko: '아침에 한국어를 공부해요.', zh: '早上学习韩语。', zhEn: 'I study Korean in the morning.' },
      { icon: '🎵', context: 'KPOP 演唱会', contextEn: 'KPOP concert', ko: '이번 주말에 콘서트에 가요!', zh: '这个周末去演唱会！', zhEn: 'Let\'s go to the concert this weekend!' },
    ],
    mistakes: [
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부해요 是动作，动作发生地点用 에서。', noteEn: '공부해요 is an action, so the place where it happens uses 에서.' },
      { wrong: '오늘에 공부해요 / 내일에 만나요', correct: '오늘 공부해요 / 내일 만나요', note: '오늘·내일·어제·지금·매일 这类词不加 에。', noteEn: 'Words like 오늘, 내일, 어제, 지금, 매일 don\'t take 에.' },
      { wrong: '학교에서 가요', correct: '학교에 가요', note: '가다 是位移动词，去某地用 에，不是 에서（에서 表示动作发生的场所）。', noteEn: '가다 is a movement verb — use 에 for going somewhere, not 에서 (에서 marks where an action takes place).' },
      { wrong: '저는 학교 가요', correct: '저는 학교에 가요', note: '口语有时省略，但初学阶段建议写完整。', noteEn: 'In speech it\'s sometimes dropped, but as a beginner, it\'s best to write it out fully.' },
    ],
    quickTable: {
      title: '에 速查表', titleEn: '에 Quick Reference',
      body: '时间名词 + 에 / 地点名词 + 에', bodyEn: 'Time noun + 에 / Place noun + 에',
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
      title: '判断对错：에 的用法', titleEn: 'True or False: Using 에',
      body: '选出使用 에 正确的句子。', bodyEn: 'Choose the sentence where 에 is used correctly.',
      questions: [
        { options: ['오늘 공부해요', '오늘에 공부해요'], answer: 0, explanation: '오늘/내일/어제 等词不加 에。', explanationEn: 'Words like 오늘, 내일, 어제 don\'t take 에.' },
        { options: ['학교에서 공부해요', '학교에 공부해요'], answer: 0, explanation: '动作发生的场所用 에서。', explanationEn: 'The place where an action happens uses 에서.' },
        { options: ['집에 가요', '집에서 가요'], answer: 0, explanation: '가다 等方向动词用 에。', explanationEn: 'Direction verbs like 가다 use 에.' },
        { options: ['친구가 집에 있어요', '친구가 집에서 있어요'], answer: 0, explanation: '있다/없다 表示存在，前面永远用 에，不用 에서。', explanationEn: '있다/없다 express existence — they always take 에, never 에서.' },
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
    whatItDoes: '说"在哪里做什么"', whatItDoesEn: 'Saying \'doing something somewhere\'',
    whatItDoesBody: '动作 + 地点的专属搭档，只要是"真的在做什么"就用 에서。\n和中文不同：\n中文"在图书馆读书"里的"在"一个词搞定，韩语要区分 에（存在/方向）和 에서（动作发生地）。', whatItDoesBodyEn: 'The dedicated partner for action + location—use 에서 whenever you\'re \'actually doing something\'.\\nUnlike Chinese:\\nChinese uses one word \'at\' in \'reading at the library\', but Korean distinguishes between 에 (existence/direction) and 에서 (place of action).',
    structureNote: '에서 只有一个用法：\n在哪里「做」动作。\n下面的结构展示它和动词的搭配方式。', structureNoteEn: '에서 has only one use:\\n\'doing\' an action somewhere.\\nThe structure below shows how it pairs with verbs.',
    rulesNote: '判断用 에 还是 에서 只需要问一句话：\n这里是「真的在做某件事」，还是「只是存在/在那里」？做事→ 에서，存在/去向→ 에。', rulesNoteEn: 'To decide between 에 and 에서, just ask one question:\\nIs this \'actually doing something\' or \'just existing/being there\'? Doing something→에서, existing/going→에.',
    scenarioNote: '几乎所有「在某地做某事」的句子都需要 에서在咖啡店工作、在学校学习、在家休息。\n和 에 的区分是P1最重要的辨析，值得多练。', scenarioNoteEn: 'Almost every sentence about \'doing something somewhere\' needs 에서—working at a café, studying at school, resting at home.\\nDistinguishing it from 에 is the most important concept in P1, worth practicing a lot.',
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
        zh: '在学校学习。', zhEn: 'Study at school.',
        tokens: [
          { text: '학교에서', role: 'place' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '회사에서 일해요',
        zh: '在公司工作。', zhEn: 'Work at the company.',
        tokens: [
          { text: '회사에서', role: 'place' },
          { text: '일해요', role: 'verb' },
        ],
      },
      {
        ko: '저는 도서관에서 책을 빌려요',
        zh: '我在图书馆借书。', zhEn: 'I borrow books at the library.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '도서관에서', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '빌려요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'usage',   text: '在哪里做动作 → 地点 + 에서 + 动词', textEn: 'Where an action happens → Place + 에서 + Verb',          examples: '학교에서 공부해요 / 카페에서 마셔요' },
      { type: 'compare', text: '에 vs 에서',                             examples: '只是"在不在" → 에；真的"做什么" → 에서', examplesEn: 'Just "being there" → 에; actually "doing something" → 에서' },
      { type: 'note',    text: '있어요/없어요 用 에，不用 에서', textEn: 'Use 에 with 있어요/없어요, not 에서',           examples: '도서관에 있어요（在图书馆）—— 存在不是动作', examplesEn: '도서관에 있어요 (at the library) — existence is not an action' },
      { type: 'note',    text: '时间点用 에，不用 에서', textEn: 'Use 에 for time points, not 에서',                   examples: '세 시에 만나요（不是 세 시에서）', examplesEn: '세 시에 만나요 (not 세 시에서)' },
      { type: 'usage',   text: '에서 后面必须是动作动词', textEn: '에서 must be followed by an action verb',                  examples: '공부해요·먹어요·마셔요·일해요·읽어요' },
      { type: 'usage',   text: '에서 也可表示起点（从某地出发）', textEn: '에서 can also indicate a starting point (departing from somewhere)',           examples: '집에서 학교까지（从家到学校）', examplesEn: '집에서 학교까지 (from home to school)' },
      { type: 'example', text: '학교에서 공부해요 / 카페에서 커피를 마셔요 / 도서관에서 책을 빌려요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는 ', role: 'subject' },
          { text: '학교에서', role: 'place' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '我在学校学习。', zhEn: 'I study at school.',
        swapWords: ['학교에서', '카페에서', '도서관에서'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '在咖啡店喝咖啡。', zhEn: 'Drink coffee at a café.',
        swapWords: ['커피를 마셔요', '밥을 먹어요', '친구를 만나요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '공원에서', role: 'place' },
          { text: '사진을', role: 'object' },
          { text: '찍어요', role: 'verb' },
        ],
        zh: '在公园拍照。', zhEn: 'Take photos at the park.',
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
        zh: '我在图书馆读书。', zhEn: 'I\'m reading at the library.',
        swapWords: ['도서관에서 책을 읽어요', '집에서 음악을 들어요', '식당에서 밥을 먹어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店打卡', contextEn: 'Café check-in', ko: '오늘 카페에서 한국어를 공부해요.', zh: '今天在咖啡店学习韩语。', zhEn: 'Today, I\'m studying Korean at a café.' },
      { icon: '📚', context: '图书馆自习', contextEn: 'Library self-study', ko: '저는 도서관에서 책을 읽어요.', zh: '我在图书馆读书。', zhEn: 'I\'m reading at the library.' },
      { icon: '🍜', context: '餐厅用餐', contextEn: 'Dining at a restaurant', ko: '식당에서 냉면을 먹어요.', zh: '在餐厅吃冷面。', zhEn: 'Eat cold noodles at a restaurant.' },
      { icon: '🏢', context: '职场表达', contextEn: 'Workplace expressions', ko: '저는 회사에서 일해요.', zh: '我在公司工作。', zhEn: 'I work at the company.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '집에서 좋아하는 노래를 들어요.', zh: '在家听喜欢的歌。', zhEn: 'Listen to my favorite songs at home.' },
      { icon: '🤳', context: 'SNS 打卡', contextEn: 'SNS check-in', ko: '카페에서 친구를 만나요!', zh: '在咖啡店见朋友！', zhEn: 'Meet friends at the café!' },
    ],
    mistakes: [
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부해요 是动作，动作发生地点用 에서。', noteEn: '공부해요 is an action, so the place where it happens uses 에서.' },
      { wrong: '집에서 있어요', correct: '집에 있어요', note: '있어요 是存在，不是动作，用 에。', noteEn: '있어요 indicates existence, not an action, so use 에.' },
      { wrong: '세 시에서 만나요', correct: '세 시에 만나요', note: '时间点用 에，不用 에서。', noteEn: 'For time points, use 에, not 에서.' },
      { wrong: '카페에서 커피 마셔요', correct: '카페에서 커피를 마셔요', note: '에서 标地点，을/를 标宾语，各管各的，初学完整写出来。日常口语 를 可省。', noteEn: '에서 marks location, 을/를 marks the object—each does its own job. Write them out fully when learning. In casual speech, 를 can be dropped.' },
    ],
    quickTable: {
      title: '에서 vs 에 — 一张表搞清楚', titleEn: '에서 vs 에 — A Simple Chart',
      body: '关键：后面是不是「动作动词」', bodyEn: 'Key: is the following verb an action verb?',
      headers: ['韩语', '助词', '中文', '为什么'],
      rows: [
        [{ ko: '학교에 가요', zh: '去学校', zhEn: 'go to school' }, { ko: '에', zh: '方向助词', zhEn: 'direction particle' }, '去学校', '方向移动'],
        [{ ko: '학교에 있어요', zh: '在学校', zhEn: 'at school' }, { ko: '에', zh: '存在助词', zhEn: 'existence particle' }, '在学校', '存在状态'],
        [{ ko: '학교에서 공부해요', zh: '在学校学习', zhEn: 'study at school' }, { ko: '에서', zh: '动作场所', zhEn: 'action location' }, '在学校学习', '动作发生'],
        [{ ko: '집에 있어요', zh: '在家', zhEn: 'at home' }, { ko: '에', zh: '存在助词', zhEn: 'existence particle' }, '在家', '存在状态'],
        [{ ko: '집에서 쉬어요', zh: '在家休息', zhEn: 'rest at home' }, { ko: '에서', zh: '动作场所', zhEn: 'action location' }, '在家休息', '动作发生'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选对 에 / 에서', titleEn: 'Choose the correct 에 / 에서',
      body: '根据句子含义，选择正确的助词。', bodyEn: 'Choose the correct particle based on the sentence meaning.',
      questions: [
        { pre: '학교', post: '공부해요', options: ['에', '에서'], answer: 1, explanation: '공부하다 是动作 → 动作场所用 에서', explanationEn: '공부하다 is an action → use 에서 for the action location' },
        { pre: '집', post: '가요', options: ['에', '에서'], answer: 0, explanation: '가다 是方向 → 目标地点用 에', explanationEn: '가다 is direction → use 에 for the destination' },
        { pre: '카페', post: '친구를 만나요', options: ['에', '에서'], answer: 1, explanation: '만나다 是动作 → 动作场所用 에서', explanationEn: '만나다 is an action → use 에서 for the action location' },
        { pre: '화장실', post: '있어요', options: ['에', '에서'], answer: 0, explanation: '있다 是存在 → 存在位置用 에', explanationEn: '있다 is existence → use 에 for the location of existence' },
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
    title: '过去时', titleEn: 'Past tense',
    whatItDoes: '说过去做了什么', whatItDoesEn: 'Saying what you did in the past',
    whatItDoesBody: '词干末元音决定用哪个词尾，三条规则搞定所有过去时。\n和中文「了」不同的是：\n韩语过去时只表示「已经发生」，不表示状态变化或持续结果。', whatItDoesBodyEn: 'The final vowel of the stem determines which ending to use—three rules cover all past tense. \\nUnlike Chinese \'了\': \\nKorean past tense only means \'already happened,\' not a change of state or ongoing result.',
    structureNote: '过去时只改动词/形容词的词尾，主语和助词完全不变。\n下面展示变化后的句型框架。', structureNoteEn: 'Past tense only changes the verb/adjective ending; the subject and particles stay exactly the same. \\nHere\'s the sentence pattern after the change.',
    rulesNote: '过去时词尾由词干最后的元音决定：\nㅏ/ㅗ 结尾→ 았어요，其他元音→ 었어요，하다→ 했어요。\n三条规则覆盖99%的词。', rulesNoteEn: 'The past tense ending is determined by the last vowel of the stem: \\nㅏ/ㅗ ending → 았어요, other vowels → 었어요, 하다 → 했어요. \\nThree rules cover 99% of words.',
    scenarioNote: '写日记、讲昨天发生的事、追剧聊剧情都需要过去时。\n和中文的「了」不完全一样韩语过去时单纯表示「已发生」，不像中文「了」还能表示变化或持续结果。', scenarioNoteEn: 'Writing a diary, talking about yesterday, or discussing a drama\'s plot all need past tense. \\nUnlike Chinese \'了,\' Korean past tense simply means \'already happened\'—it doesn\'t imply a change or ongoing result like Chinese \'了\' can.',
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
        zh: '昨天学习了韩语。', zhEn: 'I studied Korean yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부했어요', role: 'verb' },
        ],
      },
      {
        ko: '아까 밥을 먹었어요',
        zh: '刚才吃饭了。', zhEn: 'I just ate.',
        tokens: [
          { text: '아까', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '지난주에 도서관에 갔어요',
        zh: '上周去了图书馆。', zhEn: 'I went to the library last week.',
        tokens: [
          { text: '지난주에', role: 'time' },
          { text: '도서관에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干末元音 ㅏ/ㅗ → -았어요', textEn: 'Stem ending in ㅏ/ㅗ → -았어요', examples: '가다→갔어요 / 오다→왔어요 / 보다→봤어요' },
      { type: 'rule',    text: '其他元音 → -었어요', textEn: 'Other vowels → -었어요',         examples: '먹다→먹었어요 / 읽다→읽었어요 / 마시다→마셨어요' },
      { type: 'rule',    text: '하다 → 했어요',             examples: '공부하다→공부했어요 / 좋아하다→좋아했어요' },
      { type: 'rule',    text: '名词句过去时', textEn: 'Past tense for noun sentences',               examples: '학생이에요→학생이었어요 / 가수예요→가수였어요' },
      { type: 'note',    text: 'ㅡ 脱落过去时', textEn: 'ㅡ-dropping past tense',             examples: '아프다→아팠어요 / 예쁘다→예뻤어요 / 크다→컸어요' },
      { type: 'vocab',   text: '过去时间词', textEn: 'Past time words',                 examples: '어제（昨天）·아까（刚才）·지난주에（上周）·어젯밤에（昨晚）', examplesEn: '어제 (yesterday) · 아까 (just now) · 지난주에 (last week) · 어젯밤에 (last night)' },
      { type: 'note',    text: '中文形容词不变形（"昨天很好"里"好"不动），韩语形容词也要跟动词一样变过去时，规则完全相同', textEn: 'Chinese adjectives don\'t change form (in "yesterday was good," "good" stays the same), but in Korean, adjectives also conjugate to past tense just like verbs, with exactly the same rules.', examples: '좋다→좋았어요 / 재미있다→재미있었어요 / 예쁘다→예뻤어요' },
      { type: 'note',    text: '别拿中文"了"硬套：表"就要…了"的将来义（走了！/要下雨了）韩语用将来时，不能用过去时——将来时下一课详学', textEn: 'Don\'t force Chinese "了" onto Korean: for the future meaning of "about to..." (e.g., "I\'m leaving!" / "It\'s about to rain"), Korean uses the future tense, not the past tense—we\'ll cover the future tense in the next lesson.' },
      { type: 'example', text: '어제 한국어를 공부했어요 / 지난주에 서울에 갔어요 / 이 노래가 좋았어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '공부했어요', role: 'verb' },
        ],
        zh: '昨天学习了。', zhEn: 'I studied yesterday.',
        swapWords: ['공부했어요', '운동했어요', '복습했어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아까', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
        zh: '刚才吃了饭。', zhEn: 'I just ate.',
        swapWords: ['밥을 먹었어요', '커피를 마셨어요', '라면을 먹었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지난주에', role: 'time' },
          { text: '도서관에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '上周去了图书馆。', zhEn: 'I went to the library last week.',
        swapWords: ['도서관에', '카페에', '영화관에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '어젯밤에', role: 'time' },
          { text: '이 노래를', role: 'object' },
          { text: '들었어요', role: 'verb' },
        ],
        zh: '昨晚听了这首歌。', zhEn: 'I listened to this song last night.',
        swapWords: ['이 노래를 들었어요', '이 드라마를 봤어요', '이 영상을 봤어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📔', context: '韩语日记', contextEn: 'Korean diary', ko: '어제 한국어를 공부했어요. 재미있었어요!', zh: '昨天学习了韩语，很有意思！', zhEn: 'I studied Korean yesterday—it was really fun!' },
      { icon: '☕', context: '周末回顾', contextEn: 'Weekend recap', ko: '지난 주말에 카페에서 친구를 만났어요.', zh: '上周末在咖啡店见了朋友。', zhEn: 'I met a friend at a café last weekend.' },
      { icon: '📱', context: '聊天回复', contextEn: 'Chat reply', ko: '아까 밥을 먹었어요. 지금 집에 있어요.', zh: '刚才吃了饭，现在在家。', zhEn: 'I just ate, and I\'m home now.' },
      { icon: '🏥', context: '身体不适', contextEn: 'Feeling unwell', ko: '어제 병원에 갔어요. 많이 나았어요.', zh: '昨天去了医院，好多了。', zhEn: 'I went to the hospital yesterday, and I feel much better now.' },
      { icon: '🇰🇷', context: '旅行回忆', contextEn: 'Travel memories', ko: '작년에 서울에 갔어요. 정말 재미있었어요.', zh: '去年去了首尔，真的很有趣。', zhEn: 'I went to Seoul last year—it was really interesting.' },
      { icon: '🎵', context: '音乐感想', contextEn: 'Music thoughts', ko: '어젯밤에 이 노래를 들었어요. 정말 좋았어요.', zh: '昨晚听了这首歌，真的很好。', zhEn: 'I listened to this song last night—it\'s really good.' },
    ],
    mistakes: [
      { wrong: '공부하었어요', correct: '공부했어요', note: '하다 过去时直接变 했어요，不是 하었어요。', noteEn: 'The past tense of 하다 is directly 했어요, not 하었어요.' },
      { wrong: '가았어요', correct: '갔어요', note: '가았어요 → 缩写为 갔어요。', noteEn: '가았어요 → contracted to 갔어요.' },
      { wrong: '먹았어요', correct: '먹었어요', note: '먹 的元音是 ㅓ，不是 ㅏ/ㅗ，所以用 었어요。', noteEn: 'The vowel in 먹 is ㅓ, not ㅏ/ㅗ, so it takes 었어요.' },
      { wrong: '어제 공부해요', correct: '어제 공부했어요', note: '어제·아까·지난주 是过去时间词，后面用过去时。', noteEn: '어제, 아까, and 지난주 are past time words, so they\'re followed by the past tense.' },
      { wrong: '어제 날씨가 좋아요', correct: '어제 날씨가 좋았어요', note: '中文"昨天天气好"里"好"不变，但韩语形容词 좋다 也要变过去时 좋았어요。', noteEn: 'In Chinese, "good" doesn\'t change in "the weather was good yesterday," but the Korean adjective 좋다 also becomes past tense 좋았어요.' },
    ],
    quickTable: {
      title: '过去时速查表', titleEn: 'Past Tense Quick Reference',
      body: '词干元音 → 过去时词尾', bodyEn: 'Stem vowel → past tense ending',
      headers: ['原形', '词干末元音', '过去时（正式）', '过去时（日常）'],
      rows: [
        [{ ko: '가다', zh: '去（原形）', zhEn: 'to go (base form)' }, 'ㅏ', { ko: '갔습니다', zh: '去了（正式）', zhEn: 'went (formal)' }, { ko: '갔어요', zh: '去了（日常）', zhEn: 'went (casual)' }],
        [{ ko: '오다', zh: '来（原形）', zhEn: 'to come (base form)' }, 'ㅗ', { ko: '왔습니다', zh: '来了（正式）', zhEn: 'came (formal)' }, { ko: '왔어요', zh: '来了（日常）', zhEn: 'came (casual)' }],
        [{ ko: '보다', zh: '看（原形）', zhEn: 'to see (base form)' }, 'ㅗ', { ko: '봤습니다', zh: '看了（正式）', zhEn: 'saw (formal)' }, { ko: '봤어요', zh: '看了（日常）', zhEn: 'saw (casual)' }],
        [{ ko: '먹다', zh: '吃（原形）', zhEn: 'to eat (base form)' }, 'ㅓ', { ko: '먹었습니다', zh: '吃了（正式）', zhEn: 'ate (formal)' }, { ko: '먹었어요', zh: '吃了（日常）', zhEn: 'ate (casual)' }],
        [{ ko: '마시다', zh: '喝（原形）', zhEn: 'to drink (base form)' }, 'ㅣ', { ko: '마셨습니다', zh: '喝了（正式）', zhEn: 'drank (formal)' }, { ko: '마셨어요', zh: '喝了（日常）', zhEn: 'drank (casual)' }],
        [{ ko: '읽다', zh: '读（原形）', zhEn: 'to read (base form)' }, 'ㅣ', { ko: '읽었습니다', zh: '读了（正式）', zhEn: 'read (formal)' }, { ko: '읽었어요', zh: '读了（日常）', zhEn: 'read (casual)' }],
        [{ ko: '공부하다', zh: '学习（原形）', zhEn: 'to study (base form)' }, { ko: '하다', zh: '하다 型', zhEn: '하다 type' }, { ko: '공부했습니다', zh: '学了（正式）', zhEn: 'studied (formal)' }, { ko: '공부했어요', zh: '学了（日常）', zhEn: 'studied (casual)' }],
        [{ ko: '일하다', zh: '工作（原形）', zhEn: 'to work (base form)' }, { ko: '하다', zh: '하다 型', zhEn: '하다 type' }, { ko: '일했습니다', zh: '工作了（正式）', zhEn: 'worked (formal)' }, { ko: '일했어요', zh: '工作了（日常）', zhEn: 'worked (casual)' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '过去时变形练习', titleEn: 'Past Tense Conjugation Practice',
      body: '根据日常体现在时，选出正确的过去时。', bodyEn: 'Based on the casual present tense, choose the correct past tense.',
      questions: [
        { prompt: '现在时：가요', promptEn: 'Present tense: 가요', options: ['갔어요', '가었어요', '갔아요'], answer: 0, explanation: '가+았어요→갔어요（缩约）', explanationEn: '가+았어요→갔어요 (contraction)' },
        { prompt: '现在时：먹어요', promptEn: 'Present tense: 먹어요', options: ['먹어었어요', '먹았어요', '먹었어요'], answer: 2, explanation: '먹+었어요' },
        { prompt: '现在时：해요', promptEn: 'Present tense: 해요', options: ['하었어요', '했어요', '해었어요'], answer: 1, explanation: '하+였어요→했어요（缩约）', explanationEn: '하+였어요→했어요 (contraction)' },
        { prompt: '现在时：와요', promptEn: 'Present tense: 와요', options: ['오었어요', '왔어요', '와었어요'], answer: 1, explanation: '오+았어요→왔어요（缩约）', explanationEn: '오+았어요→왔어요 (contraction)' },
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
    title: '将来时', titleEn: 'Future tense',
    whatItDoes: '说将来打算做什么', whatItDoesEn: 'Talking About Future Plans',
    whatItDoesBody: '-을/ㄹ 거예요 表示要做/会做/打算做，两条规则搞定。\n和中文不同：\n中文"要/会/打算"是独立词，韩语把这三种意思都用一个词尾表达，放在动词末尾。', whatItDoesBodyEn: '-을/ㄹ 거예요 means \'will do / going to do / plan to do\'—two rules cover it. \\nUnlike Chinese: \\nChinese uses separate words like \'要/会/打算,\' but Korean expresses all three with a single ending attached to the verb.',
    structureNote: '将来时在现在时的基础上只改动词词尾，结构位置完全相同。\n下面展示变化后的句型。', structureNoteEn: 'Future tense only changes the verb ending from the present tense; the structure and position are identical. \\nHere\'s the pattern after the change.',
    rulesNote: '将来时只看一件事：\n词干最后有没有收音。\n有收音加을 거예요，没有收音加ㄹ 거예요。\n比过去时更简单，只有两条。', rulesNoteEn: 'Future tense only checks one thing: \\nwhether the stem ends with a final consonant (받침). \\nWith 받침 → add 을 거예요; without → add ㄹ 거예요. \\nSimpler than past tense—only two rules.',
    scenarioNote: '说计划、约定、推测都用-을/ㄹ 거예요。\n它同时覆盖中文的「要/会/打算」三种含义，是一个词尾三种用法。', scenarioNoteEn: 'Plans, promises, and predictions all use -을/ㄹ 거예요. \\nIt covers Chinese \'要/会/打算\' in one ending—three meanings, one form.',
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
        zh: '明天要学韩语。', zhEn: 'I\'m going to study Korean tomorrow.',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부할 거예요', role: 'verb' },
        ],
      },
      {
        ko: '이따가 밥을 먹을 거예요',
        zh: '一会儿要吃饭。', zhEn: 'I\'m going to eat in a bit.',
        tokens: [
          { text: '이따가', role: 'time' },
          { text: '밥을', role: 'object' },
          { text: '먹을 거예요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 카페에 갈 거예요',
        zh: '周末要去咖啡店。', zhEn: 'I\'m going to a café this weekend.',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '카페에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
      {
        ko: '나중에 한국에 갈 거예요',
        zh: '以后会去韩国。', zhEn: 'I\'ll go to Korea later.',
        tokens: [
          { text: '나중에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '词干无收音 → -ㄹ 거예요', textEn: 'Stem ends in vowel → -ㄹ 거예요',        examples: '가다→갈 거예요 / 하다→할 거예요 / 보다→볼 거예요' },
      { type: 'rule',    text: '词干有收音 → -을 거예요', textEn: 'Stem ends in consonant → -을 거예요',        examples: '먹다→먹을 거예요 / 읽다→읽을 거예요' },
      { type: 'rule',    text: 'ㄹ 词干：本身已有 ㄹ，直接加 거예요', textEn: 'ㄹ stem: already has ㄹ, just add 거예요', examples: '살다→살 거예요 / 만들다→만들 거예요' },
      { type: 'vocab',   text: '未来时间词', textEn: 'Future time words',                     examples: '내일・주말에・다음 주에・이따가・나중에' },
      { type: 'note',    text: '내일·이따가 不加 에', textEn: '내일·이따가 don\'t take 에',             examples: '내일 갈 거예요 / 이따가 먹을 거예요' },
      { type: 'compare', text: '거예요 vs 겠어요',               examples: '거예요=计划/预测；겠어요=即刻意图（中级再细分）', examplesEn: '거예요 = plan/prediction; 겠어요 = immediate intention (more detail at intermediate level)' },
      { type: 'note',    text: '-을/ㄹ 거예요 不只表"打算/要"，也表"推测/大概"。中文这两种意思用不同词（要 vs 大概会），韩语靠主语和语境区分：自己做→计划，说别人或天气→推测', textEn: '-을/ㄹ 거예요 doesn\'t just mean "plan to/will" — it also means "probably/probably will." In Chinese these two meanings use different words (要 vs 大概会), but Korean distinguishes them by subject and context: talking about yourself → plan; talking about others or weather → prediction', examples: '주말에 갈 거예요（我打算去）/ 지금 집에 있을 거예요（他大概在家）', examplesEn: '주말에 갈 거예요 (I plan to go) / 지금 집에 있을 거예요 (He\'s probably home)' },
      { type: 'note',    text: '中文形容词不变形，但韩语形容词和 이다 也能加 -을/ㄹ 거예요，此时意思偏"推测/应该会"', textEn: 'Chinese adjectives don\'t change form, but Korean adjectives and 이다 can also take -을/ㄹ 거예요, in which case it leans toward "prediction/should be"', examples: '좋다→좋을 거예요（会很好）/ 이다→학생일 거예요（大概是学生）', examplesEn: '좋다→좋을 거예요 (will be good) / 이다→학생일 거예요 (is probably a student)' },
      { type: 'example', text: '내일 한국어를 공부할 거예요 / 주말에 카페에 갈 거예요 / 나중에 한국에 갈 거예요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부할 거예요', role: 'verb' },
        ],
        zh: '明天要学习韩语。', zhEn: 'I\'m going to study Korean tomorrow.',
        swapWords: ['공부할 거예요', '영화를 볼 거예요', '쉴 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '카페에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
        zh: '周末要去咖啡店。', zhEn: 'I\'m going to a café this weekend.',
        swapWords: ['카페에', '도서관에', '영화관에'],

        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '이따가', role: 'time' },
          { text: '라면을', role: 'object' },
          { text: '먹을 거예요', role: 'verb' },
        ],
        zh: '等一下要吃拉面。', zhEn: 'I\'m going to eat ramen in a bit.',
        swapWords: ['라면을 먹을 거예요', '밥을 먹을 거예요', '커피를 마실 거예요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '나중에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '갈 거예요', role: 'verb' },
        ],
        zh: '以后会去韩国。', zhEn: 'I\'ll go to Korea later.',
        swapWords: ['한국에 갈 거예요', '서울에 갈 거예요', '일본에 갈 거예요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', contextEn: 'Study plan', ko: '내일부터 매일 한국어를 공부할 거예요.', zh: '从明天开始每天学习韩语。', zhEn: 'Starting tomorrow, I\'ll study Korean every day.' },
      { icon: '🇰🇷', context: '旅行梦想', contextEn: 'Travel dream', ko: '나중에 한국에 갈 거예요. 서울에서 맛있는 음식을 먹을 거예요!', zh: '以后会去韩国，在首尔吃好吃的！', zhEn: 'I\'ll go to Korea later and eat delicious food in Seoul!' },
      { icon: '📱', context: '聊天回复', contextEn: 'Chat reply', ko: '이따가 전화할 거예요. 지금 밥 먹고 있어요.', zh: '等一下会打电话，现在在吃饭。', zhEn: 'I\'ll call you in a bit; I\'m eating right now.' },
      { icon: '☕', context: '周末安排', contextEn: 'Weekend Plans', ko: '주말에 카페에서 친구를 만날 거예요.', zh: '周末要在咖啡店见朋友。', zhEn: 'I\'m meeting a friend at a café this weekend.' },
      { icon: '🏥', context: '看病计划', contextEn: 'Doctor\'s Visit Plan', ko: '내일 병원에 갈 거예요. 요즘 몸이 안 좋아요.', zh: '明天要去医院，最近身体不太好。', zhEn: 'I\'m going to the hospital tomorrow; I haven\'t been feeling well lately.' },
      { icon: '🎵', context: '周末活动', contextEn: 'Weekend Activities', ko: '이번 주말에 친구하고 영화를 볼 거예요.', zh: '这个周末要和朋友看电影。', zhEn: 'I\'m going to watch a movie with a friend this weekend.' },
    ],
    mistakes: [
      { wrong: '먹ㄹ 거예요', correct: '먹을 거예요', note: '먹 有收音，所以用 -을 거예요。', noteEn: '먹 has a final consonant, so use -을 거예요.' },
      { wrong: '가을 거예요', correct: '갈 거예요', note: '가 无收音，所以用 -ㄹ 거예요。', noteEn: '가 has no final consonant, so use -ㄹ 거예요.' },
      { wrong: '공부하을 거예요', correct: '공부할 거예요', note: '하다 将来时 → 할 거예요（하 + ㄹ 거예요）。', noteEn: '하다 future tense → 할 거예요 (하 + ㄹ 거예요).' },
      { wrong: '내일 공부했어요', correct: '내일 공부할 거예요', note: '내일 是未来时间词，要配将来时。', noteEn: '내일 is a future time word, so pair it with the future tense.' },
      { wrong: '갈 거에요', correct: '갈 거예요', note: '거 后面是 예요 不是 에요，写成 거에요 是最高频的拼写错误。', noteEn: 'After 거 it\'s 예요, not 에요; writing 거에요 is the most common spelling mistake.' },
    ],
    quickTable: {
      title: '将来时速查表', titleEn: 'Future Tense Quick Reference',
      body: '有收音→을 거예요 / 无收音→ㄹ 거예요', bodyEn: 'Final consonant → 을 거예요 / No final consonant → ㄹ 거예요',
      headers: ['原形', '有/无收音', '将来时（正式）', '将来时（日常）'],
      rows: [
        [{ ko: '먹다', zh: '吃（原形）', zhEn: 'to eat (base form)' }, '有', { ko: '먹을 겁니다', zh: '要吃（正式）', zhEn: 'to eat (formal)' }, { ko: '먹을 거예요', zh: '要吃（日常）', zhEn: 'to eat (casual)' }],
        [{ ko: '읽다', zh: '读（原形）', zhEn: 'to read (base form)' }, '有', { ko: '읽을 겁니다', zh: '要读（正式）', zhEn: 'to read (formal)' }, { ko: '읽을 거예요', zh: '要读（日常）', zhEn: 'to read (casual)' }],
        [{ ko: '하다', zh: '做（原形）', zhEn: 'to do (base form)' }, '无', { ko: '할 겁니다', zh: '要做（正式）', zhEn: 'to do (formal)' }, { ko: '할 거예요', zh: '要做（日常）', zhEn: 'to do (casual)' }],
        [{ ko: '만나다', zh: '见面（原形）', zhEn: 'to meet (base form)' }, '无', { ko: '만날 겁니다', zh: '要见面（正式）', zhEn: 'to meet (formal)' }, { ko: '만날 거예요', zh: '要见面（日常）', zhEn: 'to meet (casual)' }],
        [{ ko: '가다', zh: '去（原形）', zhEn: 'to go (base form)' }, '无', { ko: '갈 겁니다', zh: '要去（正式）', zhEn: 'to go (formal)' }, { ko: '갈 거예요', zh: '要去（日常）', zhEn: 'to go (casual)' }],
        [{ ko: '보다', zh: '看（原形）', zhEn: 'to see (base form)' }, '无', { ko: '볼 겁니다', zh: '要看（正式）', zhEn: 'to look (formal)' }, { ko: '볼 거예요', zh: '要看（日常）', zhEn: 'to look (casual)' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '将来时变形练习', titleEn: 'Future Tense Conjugation Practice',
      body: '根据词典形，选出正确的将来时。', bodyEn: 'Based on the dictionary form, choose the correct future tense.',
      questions: [
        { prompt: '词典形：가다', promptEn: 'Dictionary form: 가다', options: ['가을 거예요', '갈 거예요', '갈거예요'], answer: 1, explanation: '词干 가 无收音 → ㄹ 거예요', explanationEn: 'Stem 가 has no batchim → ㄹ 거예요' },
        { prompt: '词典形：먹다', promptEn: 'Dictionary form: 먹다', options: ['먹을 거예요', '먹ㄹ 거예요', '먹거예요'], answer: 0, explanation: '词干 먹 有收音 → 을 거예요', explanationEn: 'Stem 먹 has batchim → 을 거예요' },
        { prompt: '词典形：하다', promptEn: 'Dictionary form: 하다', options: ['하을 거예요', '하ㄹ거예요', '할 거예요'], answer: 2, explanation: '词干 하 无收音 → ㄹ 거예요', explanationEn: 'Stem 하 has no batchim → ㄹ 거예요' },
        { prompt: '词典形：읽다', promptEn: 'Dictionary form: 읽다', options: ['읽을 거예요', '읽거예요', '읽ㄹ 거예요'], answer: 0, explanation: '词干 읽 有收音 → 을 거예요', explanationEn: 'Stem 읽 has batchim → 을 거예요' },
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
    title: '进行时', titleEn: 'Progressive tense',
    whatItDoes: '说正在做什么', whatItDoesEn: 'Talking About What\'s Happening Now',
    whatItDoesBody: '动词词干 + 고 있어요，比过去时和将来时都简单，不用判断元音。\n和中文不同：\n中文进行时靠"正在/着"来表达，韩语把进行意义直接嵌入动词词尾，不需要额外加词。', whatItDoesBodyEn: 'Verb stem + 고 있어요—simpler than past and future tense, no vowel checking needed. \\nUnlike Chinese: \\nChinese uses \'正在/着\' for progressive, but Korean builds it right into the verb ending with no extra words.',
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
        zh: '现在正在学韩语。', zhEn: 'I\'m learning Korean right now.',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 카페에서 커피를 마시고 있어요',
        zh: '我在咖啡馆喝咖啡。', zhEn: 'I\'m drinking coffee at the café.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마시고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래를 듣고 있어요',
        zh: '正在听这首歌。', zhEn: 'I\'m listening to this song.',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '밥을 먹고 있어요',
        zh: '正在吃饭。', zhEn: 'I\'m eating.',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule',    text: '动词去掉 다，直接加 -고 있어요', textEn: 'Drop 다 from the verb and add -고 있어요 directly.',        examples: '먹다→먹고 있어요 / 보다→보고 있어요 / 가다→가고 있어요' },
      { type: 'rule',    text: '不用判断元音，不用判断有无收音', textEn: 'No need to check vowels or batchim.',          examples: '所有动词统一加 -고 있어요', examplesEn: 'All verbs take -고 있어요 the same way.' },
      { type: 'rule',    text: '하다 → 하고 있어요（不是 해고 있어요）', textEn: '하다 → 하고 있어요 (not 해고 있어요)', examples: '공부하다→공부하고 있어요 / 연습하다→연습하고 있어요' },
      { type: 'note',    text: '形容词不用 -고 있어요', textEn: 'Adjectives don\'t use -고 있어요.',                  examples: '좋아요（不说 좋고 있어요）/ 예뻐요（不说 예쁘고 있어요）', examplesEn: '좋아요 (not 좋고 있어요) / 예뻐요 (not 예쁘고 있어요)' },
      { type: 'compare', text: '进行时 vs 普通现在时', textEn: 'Progressive vs. simple present',                   examples: '공부해요（习惯）vs 공부하고 있어요（此刻正在）', examplesEn: '공부해요 (habit) vs. 공부하고 있어요 (right now)' },
      { type: 'note',    text: 'ㄷ 不规则接 -고 时不变', textEn: 'ㄷ-irregular verbs don\'t change before -고.',                examples: '듣다→듣고 있어요（-고 以辅音开头，不触发变化）', examplesEn: '듣다→듣고 있어요 (-고 starts with a consonant, so no change is triggered)' },
      { type: 'note',    text: '中文"在"一词两用：表地点（在咖啡店）也表进行（在学习）。韩语分成两处——地点用 에서，进行用 -고 있어요，一句里能同时出现', textEn: 'Chinese \'在\' does double duty: location (at the café) and ongoing action (studying). Korean splits these—location uses 에서, ongoing action uses -고 있어요, and both can appear in one sentence.', examples: '카페에서 공부하고 있어요（在咖啡店 + 在学习）', examplesEn: 'Studying at a cafe (at a cafe + studying)' },
      { type: 'note',    text: '过去进行"（当时）正在做"：있어요 换成 있었어요 即可，和第8课过去时融合', textEn: 'Past progressive "(then) was doing": just change 있어요 to 있었어요, combining with Lesson 8\'s past tense', examples: '공부하고 있어요→공부하고 있었어요 / 어제 그 노래를 듣고 있었어요（昨天正在听那首歌）', examplesEn: '공부하고 있어요→공부하고 있었어요 / Yesterday I was listening to that song' },
      { type: 'example', text: '지금 한국어를 공부하고 있어요 / 이 노래를 듣고 있어요 / 밥을 먹고 있어요' },
    ],
    structureNote: '进行时只有一套公式：\n动词词干 + 고 있어요。\n不用判断元音、不用看收音，是第一章最省心的语法。\n关键是搞清楚"正在做"和"习惯做"的区别。', structureNoteEn: 'Progressive tense has just one formula: \\nverb stem + 고 있어요. \\nNo vowel or 받침 checks—the easiest grammar in Chapter 1. \\nThe key is understanding the difference between \'doing now\' and \'habitual action.\'',
    rulesNote: '最大陷阱：\n하다 动词接고时保持原形，공부하고 있어요 而不是 공부해고 있어요。\n另外形容词（좋다、예쁘다）描述状态，不表示动作，所以不能加 -고 있어요。', rulesNoteEn: 'Biggest trap: \\n하다 verbs keep their base form before 고—공부하고 있어요, not 공부해고 있어요. \\nAlso, adjectives (좋다, 예쁘다) describe states, not actions, so they can\'t take -고 있어요.',
    scenarioNote: '对方问"你在干嘛？"时，如果是此刻正在做的事就用进行时；\n如果是表达习惯或身份就用普通现在时。\n手机打字、追剧、等人这些日常场景里进行时出现率极高。', scenarioNoteEn: 'When someone asks \'What are you doing?,\' use progressive tense for what\'s happening right now; \\nuse simple present for habits or identity. \\nProgressive tense is super common in daily scenes like texting, binge-watching, or waiting for someone.',
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
        zh: '现在正在学习韩语。', zhEn: 'I\'m studying Korean right now.',
        swapWords: ['공부하고 있어요', '드라마를 보고 있어요', '이 노래를 듣고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '카페에서', role: 'place' },
          { text: '커피를', role: 'object' },
          { text: '마시고 있어요', role: 'verb' },
        ],
        zh: '正在咖啡店喝咖啡。', zhEn: 'I\'m drinking coffee at a cafe.',
        swapWords: ['커피를 마시고 있어요', '밥을 먹고 있어요', '책을 읽고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
        zh: '正在听这首歌。', zhEn: 'I\'m listening to this song.',
        swapWords: ['이 노래를 듣고 있어요', '이 드라마를 보고 있어요', '이 영상을 보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '밥을', role: 'object' },
          { text: '먹고 있어요', role: 'verb' },
        ],
        zh: '正在吃饭。', zhEn: 'I\'m eating.',
        swapWords: ['밥을 먹고 있어요', '라면을 먹고 있어요', '커피를 마시고 있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📱', context: '学习打卡', contextEn: 'Study check-in', ko: '지금 한국어를 공부하고 있어요!', zh: '现在正在学习韩语！', zhEn: 'I\'m studying Korean right now!' },
      { icon: '🍽️', context: '用餐中', contextEn: 'Eating', ko: '지금 밥 먹고 있어요. 조금 이따가 연락할게요.', zh: '现在正在吃饭，过一会联系你。', zhEn: 'I\'m eating right now, I\'ll contact you later.' },
      { icon: '📺', context: '追剧中', contextEn: 'Watching a drama', ko: '지금 드라마 보고 있어요. 이따가 전화할게요.', zh: '现在在看电视剧，等一下打给你。', zhEn: 'I\'m watching a drama now, I\'ll call you in a bit.' },
      { icon: '☕', context: '咖啡店学习', contextEn: 'Studying at a cafe', ko: '지금 카페에서 공부하고 있어요.', zh: '现在在咖啡店学习。', zhEn: 'I\'m studying at a cafe now.' },
      { icon: '🏥', context: '等候室', contextEn: 'Waiting room', ko: '지금 병원에서 기다리고 있어요.', zh: '现在在医院等候。', zhEn: 'I\'m waiting at the hospital now.' },
      { icon: '🎵', context: '听歌中', contextEn: 'Listening to music', ko: '지금 좋아하는 노래를 듣고 있어요.', zh: '现在正在听喜欢的歌。', zhEn: 'I\'m listening to my favorite song right now.' },
    ],
    mistakes: [
      { wrong: '공부해고 있어요', correct: '공부하고 있어요', note: '공부하다 去掉 다 是 공부하，直接接 고 있어요，不变成 해。', noteEn: 'For 공부하다, drop 다 to get 공부하, then directly add 고 있어요—it doesn\'t change to 해.' },
      { wrong: '지금 공부했어요', correct: '지금 공부하고 있어요', note: '공부했어요 是"学习了"（过去），공부하고 있어요 才是"正在学习"。', noteEn: '공부했어요 means "studied" (past), while 공부하고 있어요 means "am studying."' },
      { wrong: '좋고 있어요 / 예쁘고 있어요', correct: '좋아요 / 예뻐요', note: '形容词表示状态，不表示进行中的动作，不能加 -고 있어요。', noteEn: 'Adjectives describe states, not ongoing actions, so they can\'t take -고 있어요.' },
      { wrong: '카페에 커피를 마시고 있어요', correct: '카페에서 커피를 마시고 있어요', note: '动作发生的场所用 에서（마시다 是动作动词）。', noteEn: 'Use 에서 for the place where an action happens (마시다 is an action verb).' },
      { wrong: '아까 노래를 들었어요', correct: '아까 노래를 듣고 있었어요', note: '想说"刚才（当时）正在听歌"要用过去进行 듣고 있었어요；单说 들었어요 只是"听了"，不含"正在"。', noteEn: 'To say "was listening to music (then)," use the past progressive 듣고 있었어요; just 들었어요 means "listened," without the "was -ing" sense.' },
    ],
    quickTable: {
      title: '进行时速查表', titleEn: 'Progressive Tense Quick Reference',
      body: '动词词干 + 고 있습니다 / 고 있어요', bodyEn: 'Verb stem + 고 있습니다 / 고 있어요',
      headers: ['原形', '进行时（正式）', '进行时（日常）', '中文'],
      rows: [
        [{ ko: '가다', zh: '去', zhEn: 'Go' }, { ko: '가고 있습니다', zh: '正在去（正式）', zhEn: 'Going (formal)' }, { ko: '가고 있어요', zh: '正在去（日常）', zhEn: 'Going (casual)' }, '正在去'],
        [{ ko: '먹다', zh: '吃', zhEn: 'Eat' }, { ko: '먹고 있습니다', zh: '正在吃（正式）', zhEn: 'Eating (formal)' }, { ko: '먹고 있어요', zh: '正在吃（日常）', zhEn: 'Eating (casual)' }, '正在吃'],
        ['공부하다 学习', { ko: '공부하고 있습니다', zh: '正在学习（正式）', zhEn: 'Studying (formal)' }, { ko: '공부하고 있어요', zh: '正在学习（日常）', zhEn: 'Studying (casual)' }, '正在学习'],
        [{ ko: '보다', zh: '看', zhEn: 'to see' }, { ko: '보고 있습니다', zh: '正在看（正式）', zhEn: 'Watching (formal)' }, { ko: '보고 있어요', zh: '正在看（日常）', zhEn: 'Watching (casual)' }, '正在看'],
        ['듣다 听', { ko: '듣고 있습니다', zh: '正在听（正式）', zhEn: 'Listening (formal)' }, { ko: '듣고 있어요', zh: '正在听（日常）', zhEn: 'Listening (casual)' }, '正在听'],
      ],
    },
    linkedGrammarIds: ['g49'],    specialQuiz: {
      type: 'judge',
      title: '判断对错：-고 있어요 进行时', titleEn: 'True or False: -고 있어요 Progressive Tense',
      body: '选出使用 -고 있어요 正确的句子。', bodyEn: 'Choose the sentence that correctly uses -고 있어요.',
      questions: [
        { options: ['지금 한국어를 공부하고 있어요', '지금 한국어를 공부해고 있어요'], answer: 0, explanation: '공부하다→공부하고 있어요。하다 动词加 -고 时用 하고，不是 해고。', explanationEn: '공부하다→공부하고 있어요. When adding -고 to 하다 verbs, use 하고, not 해고.' },
        { options: ['친구를 기다리고 있어요', '친구를 기대리고 있어요'], answer: 0, explanation: '기다리다→기다리고 있어요（正在等朋友）。不是 기대리다。', explanationEn: '기다리다→기다리고 있어요 (waiting for a friend). Not 기대리다.' },
        { options: ['이 노래가 좋고 있어요', '이 노래가 좋아요'], answer: 1, explanation: '形容词不能用 -고 있어요。좋다 是形容词，直接说 좋아요。', explanationEn: 'Adjectives can\'t use -고 있어요. 좋다 is an adjective, so just say 좋아요.' },
        { options: ['음악을 듣고 있어요', '음악을 들고 있어요'], answer: 0, explanation: '듣다→듣고 있어요（正在听）。들고 있어요 是"拿着"。', explanationEn: '듣다→듣고 있어요 (listening). 들고 있어요 means "holding."' },
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
    title: '综合练习①', titleEn: 'Comprehensive practice ①',
    whatItDoes: '第一章综合练习', whatItDoesEn: 'Chapter 1 Comprehensive Review',
    whatItDoesBody: '完成这份练习，检验前 10 课是否掌握。\n10 题，5 阶段循序渐进：识别 2 → 变形 3 → 选择 2 → 改错 2 → 应用 1。', whatItDoesBodyEn: 'Complete this exercise to test your grasp of the first 10 lessons. \\n10 questions, 5 progressive stages: Identify 2 → Conjugate 3 → Choose 2 → Correct 2 → Apply 1.',
    isPractice: true,
    specialQuiz: {
      type: 'morph',
      title: '第一章综合练习', titleEn: 'Chapter 1 Comprehensive Review',
      body: '10 题 · 从识别到应用，检验语序 · 助词 · 时态 · 礼貌体', bodyEn: '10 questions · From recognition to application, testing word order · particles · tenses · polite forms',
      questions: [
        // ═══ 识别阶段 (2 题) — 认出正确的写法 ═══════════════════════════════
        {
          prompt: '【识别 1/10】下面哪句是"我是学生"的正确写法？', promptEn: '[Recognition 1/10] Which sentence is the correct way to write "I am a student"?',
          options: [
            '학생 저는 이에요',
            '저는 학생이에요',
            '저는 이에요 학생',
            '학생이에요 저는',
          ],
          answer: 1,
          explanation: '韩语语序：主语 → 谓语。"저는（我-话题）+ 학생이에요（是学生）"。名词述语用 "이에요/예요"。', explanationEn: 'Korean word order: subject → predicate. "저는 (I-topic) + 학생이에요 (am a student)". Noun predicates use "이에요/예요".',
        },
        {
          prompt: '【识别 2/10】下面哪句是"我吃饭"的正确写法？', promptEn: '[Recognition 2/10] Which sentence is the correct way to write "I eat"?',
          options: [
            '저는 먹어요 밥을',
            '밥을 저는 먹어요',
            '저는 밥을 먹어요',
            '저는 밥 먹어요를',
          ],
          answer: 2,
          explanation: '韩语语序：主 → 宾 → 谓。谓语（动词）永远在句末。宾语加 을/를，밥（有 받침）→ 을。', explanationEn: 'Korean word order: Subject → Object → Verb. The predicate (verb) always comes at the end. Objects take 을/를—밥 (has 받침) → 을.',
        },

        // ═══ 变形阶段 (3 题) — 掌握变形规则 ═══════════════════════════════
        {
          prompt: '【变形 3/10】"학생"（有 받침）作话题时，正确的助词是？', promptEn: '[Conjugation 3/10] When \'학생\' (has 받침) is the topic, what\'s the correct particle?',
          options: ['은', '는', '이', '가'],
          answer: 0,
          explanation: '话题用 은/는。학생 末字"생"有 받침（ㅇ）→ 은。有 받침 → 은/을/이；无 받침 → 는/를/가。', explanationEn: 'Topics use 은/는. The last syllable of 학생, \'생,\' has 받침 (ㅇ) → 은. With 받침 → 은/을/이; without → 는/를/가.',
        },
        {
          prompt: '【变形 4/10】动词 "먹다" 变过去时"吃了"，正确形式是？', promptEn: '[Conjugation 4/10] The verb "먹다" in past tense "ate" — what\'s the correct form?',
          options: ['먹어요', '먹었어요', '먹을 거예요', '먹고 있어요'],
          answer: 1,
          explanation: '过去时 -았/었어요。먹（末元音 ㅓ，阴性）→ 먹었어요。现在 먹어요 / 将来 먹을 거예요 / 进行 먹고 있어요。', explanationEn: 'Past tense -았/었어요. 먹 (final vowel ㅓ, negative vowel) → 먹었어요. Present 먹어요 / Future 먹을 거예요 / Progressive 먹고 있어요.',
        },
        {
          prompt: '【变形 5/10】动词 "가다" 变将来时"要去"，正确形式是？', promptEn: '[Conjugation 5/10] The verb "가다" in future tense "will go" — what\'s the correct form?',
          options: ['가요', '갔어요', '갈 거예요', '가고 있어요'],
          answer: 2,
          explanation: '将来时 -을/ㄹ 거예요。가（无 받침）→ 갈 거예요。语义：明天/以后打算去。', explanationEn: 'Future tense -을/ㄹ 거예요. 가 (no 받침) → 갈 거예요. Meaning: plan to go tomorrow/later.',
        },

        // ═══ 选择阶段 (2 题) — 填空/选合适的助词 ═══════════════════════════════
        {
          prompt: '【选择 6/10】"학교___ 공부해요."（在学校学习）空里填？', promptEn: '[Selection 6/10] "학교___ 공부해요." (study at school) What goes in the blank?',
          options: ['에', '에서', '은', '를'],
          answer: 1,
          explanation: '动作发生场所用 에서。공부하다 是"学习"这个动作，"在学校"发生 → 학교에서。에 只用于方向/存在（가다/있다）。', explanationEn: 'Use 에서 for the place where an action occurs. 공부하다 is the action "to study," happening "at school" → 학교에서. 에 is only for direction/existence (가다/있다).',
        },
        {
          prompt: '【选择 7/10】"저는 카페___ 가요."（我去咖啡店）空里填？', promptEn: '[Select 7/10] "저는 카페___ 가요." (I go to the café) What goes in the blank?',
          options: ['에', '에서', '을', '이'],
          answer: 0,
          explanation: '方向"去某地"用 에（不用 에서）。가다/오다 表移动 → 목적지（目的地）用 에。', explanationEn: 'For direction "going somewhere," use 에 (not 에서). 가다/오다 indicate movement → use 에 for the destination.',
        },

        // ═══ 改错阶段 (2 题) — 从错句找正确改法 ═══════════════════════════════
        {
          prompt: '【改错 8/10】"집에서 있어요."（我在家）这句哪里错？选正确写法：', promptEn: '[Correct 8/10] "집에서 있어요." (I\'m at home) What\'s wrong here? Choose the correct form:',
          options: [
            '집에 있어요.',
            '집을 있어요.',
            '집에서 있어요.',
            '집이 있어요.',
          ],
          answer: 0,
          explanation: '있다（在/有）表存在，前面用 에，不用 에서。에서 只用于"发生动作"的场所。同类：있다/없다/살다 前用 에。', explanationEn: '있다 (to be/exist) indicates existence, so use 에 before it, not 에서. 에서 is only for places where actions happen. Similarly: use 에 before 있다/없다/살다.',
        },
        {
          prompt: '【改错 9/10】"내일 공부했어요."（明天学习了）这句时态矛盾，改成？', promptEn: '[Correct 9/10] "내일 공부했어요." (I studied tomorrow) This has a tense contradiction. Change it to?',
          options: [
            '내일 공부해요.',
            '내일 공부할 거예요.',
            '어제 공부할 거예요.',
            '지금 공부했어요.',
          ],
          answer: 1,
          explanation: '내일（明天）是未来时间词，谓语必须用将来时 -을/ㄹ 거예요 → 공부할 거예요。"내일 + 过去时"是矛盾病句。', explanationEn: '내일 (tomorrow) is a future time word, so the predicate must use the future tense -을/ㄹ 거예요 → 공부할 거예요. "내일 + past tense" is a contradictory sentence.',
        },

        // ═══ 应用阶段 (1 题) — 完整场景整句选择 ═══════════════════════════════
        {
          prompt: '【应用 10/10】你在电话里说"我现在在咖啡厅喝咖啡"，最合适的表达是？', promptEn: '[Apply 10/10] You say on the phone, "I\'m drinking coffee at the café right now." What\'s the most appropriate expression?',
          options: [
            '저는 지금 카페에 커피가 마셔요.',
            '지금 카페에서 커피를 마시고 있어요.',
            '지금 카페에 커피를 마셨어요.',
            '지금 커피를 카페에서 마실 거예요.',
          ],
          answer: 1,
          explanation: '지금（现在）+ 进行时 -고 있어요；카페에서（动作场所用 에서）；커피를（宾语）；마시고 있어요（现在正在喝）。综合语序 · 助词 · 时态三个考点。', explanationEn: '지금 (now) + progressive -고 있어요; 카페에서 (action place uses 에서); 커피를 (object); 마시고 있어요 (currently drinking). This combines word order, particles, and tense.',
        },
      ],
    },
    structureNote: '第一章10节课的核心主线：\n韩语语序（SOV）、两种礼貌体、六个助词（은/는/을/를/에/에서）、三种时态（过去/将来/进行）。\n这份练习覆盖全部考点，做完就能知道自己哪里还没掌握。', structureNoteEn: 'The core thread of Chapter 1\'s 10 lessons: \\nKorean word order (SOV), two politeness levels, six particles (은/는/을/를/에/에서), three tenses (past/future/progressive). \\nThis exercise covers all the key points—after finishing it, you\'ll know what you haven\'t mastered yet.',
    structures: [
      { ko: '저는 밥을 먹어요', zh: '我吃饭。', zhEn: 'I eat.', tokens: [{ text: '저는', role: 'subject' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }] },
      { ko: '한국어를 공부해요', zh: '学习韩语。', zhEn: 'Study Korean.', tokens: [{ text: '한국어를', role: 'object' }, { text: '공부해요', role: 'verb' }] },
      { ko: '저는 학교에 가요', zh: '我去学校。', zhEn: 'I go to school.', tokens: [{ text: '저는', role: 'subject' }, { text: '학교에', role: 'place' }, { text: '가요', role: 'verb' }] },
      { ko: '저는 카페에서 커피를 마셔요', zh: '我在咖啡店喝咖啡。', zhEn: 'I drink coffee at a café.', tokens: [{ text: '저는', role: 'subject' }, { text: '카페에서', role: 'place' }, { text: '커피를', role: 'object' }, { text: '마셔요', role: 'verb' }] },
      { ko: '지금 이 노래를 듣고 있어요', zh: '现在正在听这首歌。', zhEn: 'I\'m listening to this song right now.', tokens: [{ text: '지금', role: 'time' }, { text: '이 노래를', role: 'object' }, { text: '듣고 있어요', role: 'verb' }] },
      { ko: '내일 공부할 거예요', zh: '明天要学习。', zhEn: 'I\'ll study tomorrow.', tokens: [{ text: '내일', role: 'time' }, { text: '공부할 거예요', role: 'verb' }] },
      { ko: '어제 공부했어요', zh: '昨天学习了。', zhEn: 'I studied yesterday.', tokens: [{ text: '어제', role: 'time' }, { text: '공부했어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '韩语语序：主语 → 宾语/状语 → 谓语（动词/形容词永远在句末）', textEn: 'Korean word order: Subject → Object/Adverbial → Predicate (verbs/adjectives always at the end)' },
      { type: 'rule', text: '有收音名词后：은/을/이；无收音名词后：는/를/가', textEn: 'After nouns with a final consonant: 은/을/이; after nouns without: 는/를/가', examples: '학생은, 밥을, 이것이 / 저는, 커피를, 친구가' },
      { type: 'rule', text: '에（方向/存在/时间） vs 에서（动作发生场所）', textEn: '에 (direction/existence/time) vs 에서 (place where an action occurs)', examples: '학교에 가요 / 학교에서 공부해요' },
      { type: 'rule', text: '现在：아요/어요，过去：았/었어요，将来：을/ㄹ 거예요，进行：고 있어요', textEn: 'Present: 아요/어요, Past: 았/었어요, Future: 을/ㄹ 거예요, Progressive: 고 있어요', examples: '먹어요 / 먹었어요 / 먹을 거예요 / 먹고 있어요' },
      { type: 'compare', text: '합니다体（正式） vs 해요体（非正式礼貌）', textEn: '합니다 style (formal) vs 해요 style (informal polite)', examples: '먹습니다 / 먹어요' },
      { type: 'rule', text: '否定：안 + 动词（口语），动词 + 지 않아요（书面）', textEn: 'Negation: 안 + verb (spoken), verb + 지 않아요 (written)', examples: '안 먹어요 / 먹지 않아요' },
      { type: 'rule', text: '疑问句：해요体末尾不变，语调上扬', textEn: 'Questions: 해요 style ending stays the same, raise intonation', examples: '먹어요? / 가요? / 학생이에요?' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '저는', role: 'subject' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }], zh: '我吃饭。', zhEn: 'I eat.', swapRole: 'object',
          swapWords: ['커피를', '김밥을'] },
      { wordBlocks: [{ text: '저는', role: 'subject' }, { text: '학교에', role: 'place' }, { text: '가요', role: 'verb' }], zh: '我去学校。', zhEn: 'I go to school.', swapRole: 'place',
          swapWords: ['카페에', '회사에'] },
      { wordBlocks: [{ text: '어제', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }], zh: '昨天见了朋友。', zhEn: 'I met a friend yesterday.', swapRole: 'object',
          swapWords: ['선생님을', '가족을'] },
      { wordBlocks: [{ text: '내일', role: 'time' }, { text: '한국어를', role: 'object' }, { text: '공부할 거예요', role: 'verb' }], zh: '明天要学韩语。', zhEn: 'I\'m going to study Korean tomorrow.', swapRole: 'object',
          swapWords: ['영화를', '음악을'] },
    ],
    scenarios: [
      { icon: '🔤', context: '基本语序', contextEn: 'Basic word order', ko: '저는 밥을 먹어요.', zh: '我吃饭。谓语放句末。', zhEn: 'I eat. The predicate goes at the end.' },
      { icon: '🎙️', context: '礼貌体', contextEn: 'Polite style', ko: '저는 학생입니다.', zh: '我是学生。正式体用 ㅂ니다/습니다。', zhEn: 'I am a student. Formal style uses ㅂ니다/습니다.' },
      { icon: '🏷️', context: '话题助词', contextEn: 'Topic particle', ko: '저는 한국어를 공부해요.', zh: '我学韩语。은/는 标记话题。', zhEn: 'I study Korean. 은/는 marks the topic.' },
      { icon: '📍', context: '地点助词', contextEn: 'Location particle', ko: '학교에서 공부해요.', zh: '在学校学习。动作发生场所用 에서。', zhEn: 'Study at school. Use 에서 for the place where an action occurs.' },
      { icon: '⏳', context: '时态运用', contextEn: 'Tense usage', ko: '어제 공부했어요. 내일도 공부할 거예요.', zh: '昨天学习了，明天也要学习。', zhEn: 'Studied yesterday, will study tomorrow too.' },
      { icon: '🚫', context: '否定句', contextEn: 'Negative sentences', ko: '오늘은 안 가요. 시간이 없어요.', zh: '今天不去。没有时间。', zhEn: 'Not going today. No time.' },
    ],
    mistakes: [
      { wrong: '저은 학생이에요', correct: '저는 학생이에요', note: '저는 无收音名词后 → 는', noteEn: '저는: after nouns without a final consonant → 는' },
      { wrong: '저는 밥를 먹어요', correct: '저는 밥을 먹어요', note: '밥 有收音名词 → 을', noteEn: '밥: nouns with a final consonant → 을' },
      { wrong: '학교에 공부해요', correct: '학교에서 공부해요', note: '공부하다 是动作动词 → 에서', noteEn: '공부하다 is an action verb → 에서' },
      { wrong: '집에서 있어요', correct: '집에 있어요', note: '있다 是存在表达 → 에', noteEn: '있다 is an expression of existence → 에' },
      { wrong: '내일 공부했어요', correct: '내일 공부할 거예요', note: '내일 是未来时间词 → 을/ㄹ 거예요', noteEn: '내일 is a future time word → 을/ㄹ 거예요' },
      { wrong: '학생습니다', correct: '학생입니다', note: '名词后用 입니다，动词后用 습니다', noteEn: 'Use 입니다 after nouns, 습니다 after verbs' },
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
