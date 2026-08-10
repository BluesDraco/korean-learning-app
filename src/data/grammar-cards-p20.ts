import type { GrammarCard } from '@/types';

export const grammarCardsP20: GrammarCard[] = [
  {
    id: 'card-p20-l01',
    partNumber: 20,
    lessonNumber: 1,
    title: '에 대해(서)，에 관해서，에 관한',
    whatItDoes: '表示"关于……/有关……"的话题指示', whatItDoesEn: 'Indicating the Topic: "About.../Regarding..."',
    whatItDoesBody: '에 대해(서) 和 에 관해(서) 均表示"关于……"，用于指示谈论、研究、思考的对象，意思非常接近，可以互换。\n에 관한/에 대한 是冠词形（定语形），用于修饰后面的名词，相当于"关于……的（名词）"。\n에 대해서 较口语，에 관해서 较书面/正式。', whatItDoesBodyEn: '에 대해(서) and 에 관해(서) both mean "about..." and are used to indicate the object of talking, researching, or thinking. They\'re very close in meaning and interchangeable. \\n에 관한/에 대한 are the adnominal (attributive) forms, used to modify a following noun, equivalent to "(noun) about..." \\n에 대해서 is more colloquial, while 에 관해서 is more written/formal.',
    structureNote: '名词 + 에 대해（서）：动词前，"关于……"\n名词 + 에 관해（서）：动词前，"关于……"（较正式）\n名词 + 에 관한/에 대한 + 名词：定语，"关于……的（名词）"', structureNoteEn: 'Noun + 에 대해(서): before a verb, "about..."\\nNoun + 에 관해(서): before a verb, "about..." (more formal)\\nNoun + 에 관한/에 대한 + Noun: attributive, "about... (noun)"',
    rulesNote: '에 대해 和 에 관해 含义几乎相同，但 에 관해 在学术/报告等正式文体中更自然。\n에 관한/에 대한 是冠词形，后面必须接名词。动词前用 에 대해/에 관해。', rulesNoteEn: '에 대해 and 에 관해 have nearly the same meaning, but 에 관해 is more natural in formal contexts like academic writing or reports.\\n에 관한/에 대한 are adnominal forms and must be followed by a noun. Before a verb, use 에 대해/에 관해.',
    scenarioNote: '"환경에 대해 이야기하다"，"역사에 관한 책"般，广泛用于发表、论文、新闻、对话。', scenarioNoteEn: 'Like "환경에 대해 이야기하다" or "역사에 관한 책", it\'s widely used in presentations, papers, news, and conversations.',
    structures: [
      {
        ko: '명사 + 에 대해（서）+ 动词',
        tokens: [
          { text: '이 문제', role: 'plain' },
          { text: '에 대해서', role: 'plain' },
          { text: ' 어떻게 생각해요？', role: 'verb' },
        ],
        zh: '关于这个问题，你怎么看？', zhEn: 'What do you think about this issue?',
      },
      {
        ko: '명사 + 에 관해（서）+ 动词',
        tokens: [
          { text: '환경', role: 'plain' },
          { text: '에 관해서', role: 'plain' },
          { text: ' 발표했어요', role: 'verb' },
        ],
        zh: '就环境问题做了发表。', zhEn: 'I gave a presentation on environmental issues.',
      },
      {
        ko: '명사 + 에 관한/에 대한 + 名词',
        tokens: [
          { text: '한국 역사', role: 'plain' },
          { text: '에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 읽었어요', role: 'verb' },
        ],
        zh: '读了关于韩国历史的书。', zhEn: 'I read a book about Korean history.',
      },
      {
        ko: '에 대한 + 名词（口语）',
        tokens: [
          { text: '그 사건', role: 'plain' },
          { text: '에 대한', role: 'plain' },
          { text: ' 뉴스를', role: 'object' },
          { text: ' 봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。', zhEn: 'I watched the news about that incident.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 에 대해（서）+ 动词：口语/书面语都可用', textEn: 'noun + 에 대해(서) + verb: usable in both speech and writing', examples: '이것에 대해 말씀드릴게요（我来讲讲这个），음식에 대해서 이야기해요（聊聊食物）', examplesEn: '이것에 대해 말씀드릴게요 (I\'ll talk about this), 음식에 대해서 이야기해요 (let\'s talk about food)' },
      { type: 'rule', text: '名词 + 에 관해（서）+ 动词：正式/学术文体更自然', textEn: 'noun + 에 관해(서) + verb: more natural in formal/academic style', examples: '환경에 관해 연구했어요（研究了环境），역사에 관해서 발표했어요（就历史做了发表）', examplesEn: '환경에 관해 연구했어요 (researched the environment), 역사에 관해서 발표했어요 (gave a presentation on history)' },
      { type: 'rule', text: '名词 + 에 대한/에 관한 + 名词：冠词形，后面必须接名词', textEn: 'Noun + 에 대한/에 관한 + Noun: Adnominal form, must be followed by a noun', examples: '환경에 관한 책，그 문제에 대한 해결책' },
      { type: 'compare', text: '에 대해 vs 에 관해：含义相同，에 관해更正式', textEn: '에 대해 vs 에 관해: Same meaning, 에 관해 is more formal', examples: '내 꿈에 대해 말했어요（口语）vs 기후에 관해 연구했어요（正式）', examplesEn: '내 꿈에 대해 말했어요 (colloquial) vs 기후에 관해 연구했어요 (formal)' },
      { type: 'note', text: '에 대해/에 관해 后面不能直接接名词，要用 에 대한/에 관한', textEn: '에 대해/에 관해 cannot be directly followed by a noun; use 에 대한/에 관한 instead', examples: '환경에 대해 책（✗）→ 환경에 대한 책（✓）' },
      { type: 'note', text: '서 可省略：에 대해서 = 에 대해，에 관해서 = 에 관해', textEn: '서 can be omitted: 에 대해서 = 에 대해, 에 관해서 = 에 관해', examples: '이것에 대해 얘기해요（聊这个）= 이것에 대해서 얘기해요（聊这个，两种说法通用）', examplesEn: '이것에 대해 얘기해요 (talk about this) = 이것에 대해서 얘기해요 (talk about this, both are interchangeable)' },
      { type: 'note', text: '语序陷阱：中文"关于"放在前面（关于环境），韩语 에 대해 放在名词后面。别照中文语序写成 에 대해 환경。', textEn: 'Word order trap: In Chinese, "about" comes first (about the environment), but in Korean, 에 대해 comes after the noun. Don\'t write 에 대해 환경 following Chinese word order.', examples: '关于环境 → 환경에 대해（✓）；에 대해 환경（✗）', examplesEn: 'About the environment → 환경에 대해 (✓); 에 대해 환경 (✗)' },
      { type: 'note', text: '에 대해 只能接名词。要说"关于做某事"，得先把动作名词化再接（动词+는 것에 대해），-는 것 后面章节详学。', textEn: '에 대해 can only follow nouns. To say "about doing something," you must first nominalize the action (verb + 는 것에 대해). -는 것 will be covered in detail in a later chapter.', examples: '关于学韩语 → 한국어 공부에 대해 / 한국어를 배우는 것에 대해（✓）；배우다에 대해（✗）', examplesEn: 'About learning Korean → 한국어 공부에 대해 / 한국어를 배우는 것에 대해 (✓); 배우다에 대해 (✗)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '건강에 대해서', role: 'plain' },
          { text: ' 이야기해 봐요', role: 'verb' },
        ],
        zh: '来聊聊关于健康的话题吧。', zhEn: 'Let\'s talk about health.',
        swapWords: ['음식에 대해서', '여행에 대해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '기후 변화에 관해서', role: 'plain' },
          { text: ' 보고서를', role: 'object' },
          { text: ' 썼어요', role: 'verb' },
        ],
        zh: '写了关于气候变化的报告。', zhEn: 'I wrote a report about climate change.',
        swapWords: ['환경에 관해서', '역사에 관해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한국 문화에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 추천해 줘요', role: 'verb' },
        ],
        zh: '推荐一本关于韩国文化的书给我吧。', zhEn: 'Recommend a book about Korean culture to me.',
        swapWords: ['역사에 관한', '음식에 대한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사건에 대한', role: 'plain' },
          { text: '뉴스를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。', zhEn: 'I watched the news about that incident.',
        swapWords: ['그 문제에 대한', '그 영화에 대한'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📝', context: '写报告', contextEn: 'Write a report', ko: '환경에 관해서 보고서를 써야 해요.', zh: '得写一篇关于环境的报告。', zhEn: 'I have to write a report about the environment.' },
      { icon: '💬', context: '日常对话', contextEn: 'Everyday conversation', ko: '요즘 건강에 대해 관심이 많아요.', zh: '最近对健康很感兴趣。', zhEn: 'I\'ve been really interested in health lately.' },
      { icon: '📚', context: '推荐书籍', contextEn: 'Recommend books', ko: '역사에 관한 책을 많이 읽었어요.', zh: '读了很多关于历史的书。', zhEn: 'I\'ve read a lot of books about history.' },
      { icon: '🎤', context: '发表', contextEn: 'Presentation', ko: '이 주제에 대해서 발표하겠습니다.', zh: '我将就这个主题进行发表。', zhEn: 'I will give a presentation on this topic.' },
      { icon: '🤔', context: '征求意见', contextEn: 'Ask for opinions', ko: '이 문제에 대해 어떻게 생각해요？', zh: '关于这个问题你怎么看？', zhEn: 'What do you think about this issue?' },
      { icon: '📰', context: '新闻报道', contextEn: 'News report', ko: '그 사건에 대한 기사를 읽었어요.', zh: '读了关于那件事的报道。', zhEn: 'I read a report about that incident.' },
    ],
    mistakes: [
      { wrong: '환경에 대해 책을 읽었어요（에 대해 + 直接接名词）', wrongEn: '환경에 대해 책을 읽었어요 (에 대해 + directly followed by a noun)', correct: '환경에 대한 책을 읽었어요', note: '修饰名词时用冠词形 에 대한/에 관한。에 대해/에 관해 后面接动词：에 대해 이야기하다（✓）。', noteEn: 'When modifying a noun, use the adnominal forms 에 대한/에 관한. 에 대해/에 관해 are followed by verbs: 에 대해 이야기하다 (✓).' },
      { wrong: '에 관해한 책（에 관해 + 한）', correct: '에 관한 책', note: '冠词形是 에 관한，에 관해한 是不存在的形式。에 관해 后接动词，에 관한 后接名词。', noteEn: 'The adnominal form is 에 관한; 에 관해한 doesn\'t exist. 에 관해 is followed by a verb, 에 관한 is followed by a noun.' },
      { wrong: '이것에 대하여 이야기해요（正式的 대하여 用在口语）', wrongEn: 'Let\'s talk about this (formal 대하여 used in speech)', correct: '이것에 대해서 이야기해요', note: '에 대하여 是书面语/正式体形式。口语中用 에 대해서 或 에 대해 更自然。', noteEn: '에 대하여 is the written/formal form. In speech, 에 대해서 or 에 대해 is more natural.' },
      { wrong: '把 에 관해 和 에 대해 当成完全不同的表达', wrongEn: 'Treating 에 관해 and 에 대해 as completely different expressions', correct: '에 관해서 ≈ 에 대해서（含义相同，正式度略有差别）', correctEn: '에 관해서 ≈ 에 대해서 (same meaning, slight formality difference)', note: '에 관해서 和 에 대해서 含义相同。에 관해서 更适合学术/正式文体，에 대해서 在口语中也自然。', noteEn: '에 관해서 and 에 대해서 have the same meaning. 에 관해서 suits academic/formal writing, while 에 대해서 is natural in speech too.' },
      { wrong: '선생님에 대해 질문했어요（想说"向老师提问"）', wrongEn: '선생님에 대해 질문했어요 (meaning to say "ask the teacher")', correct: '선생님에게 질문했어요', note: '中文"对"身兼两义：表"关于（某话题）"用 에 대해，表"向/对（某人）"要用 에게/한테。向人提问、对人说是"对某人"，用 에게。선생님에 대해 질문했어요 意思会变成"就老师这个话题提问"。', noteEn: 'Chinese "对" has two meanings: for "about (a topic)" use 에 대해, for "to/toward (a person)" use 에게/한테. Asking someone or saying to someone is "toward a person," so use 에게. 선생님에 대해 질문했어요 would mean "asked a question about the teacher."' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '에 대해(서)，에 관해서，에 관한',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '한국 역사___ 책을 읽었어요。（读了关于韩国历史的书。）', promptEn: '한국 역사___ 책을 읽었어요. (Read a book about Korean history.)',
          options: ['에 관한', '에 대해서', '에 대해', '에 관해'],
          answer: 0 as 0|1|2|3,
          explanation: '名词（책）를 수식하므로 冠词形 에 관한（✓）。에 관해/에 대해/에 대해서 는 动词 앞에 쓰며 名词 直接 수식 불가。', explanationEn: 'Since it modifies a noun (책), use the adnominal form 에 관한 (✓). 에 관해/에 대해/에 대해서 are used before verbs and cannot directly modify nouns.',
        },
        {
          prompt: '기후 변화___ 발표했어요。（就气候变化做了发表。）', promptEn: '기후 변화___ 발표했어요. (Gave a presentation on climate change.)',
          options: ['에 대하여서', '에 관한', '에 관해서', '에 대한'],
          answer: 2 as 0|1|2|3,
          explanation: '动词（발표하다）前用 에 관해서（✓）。에 관한/에 대한 是冠词形，只能放在名词前；에 대하여서 是不存在的形式。', explanationEn: 'Before a verb (발표하다), use 에 관해서 (✓). 에 관한/에 대한 are adnominal forms, only placed before nouns; 에 대하여서 is a non-existent form.',
        },
        {
          prompt: '이 문제___ 어떻게 생각해요？（关于这个问题，你怎么看？）', promptEn: '이 문제___ 어떻게 생각해요? (What do you think about this issue?)',
          options: ['에 관하여서', '에 대해서', '에 대한', '에 관한'],
          answer: 1 as 0|1|2|3,
          explanation: '动词（생각하다）前 → 에 대해서（✓）。에 대한/에 관한 是冠词形；에 관하여서 是不存在的形式。', explanationEn: 'Before a verb (생각하다) → 에 대해서 (✓). 에 대한/에 관한 are adnominal forms; 에 관하여서 is a non-existent form.',
        },
        {
          prompt: '下列哪句正确？', promptEn: 'Which sentence is correct?',
          options: ['음식에 에 대해 이야기해요', '환경에 대해 책을 읽었어요', '역사에 관해한 보고서', '그 사건에 대한 뉴스를 봤어요'],
          answer: 3 as 0|1|2|3,
          explanation: '에 대한 + 名词（뉴스）是正确的冠词形（✓）。에 대해 不能直接修饰名词，에 관해한 是不存在的形式，에 에 대해 是助词重复。', explanationEn: '에 대한 + noun (뉴스) is the correct adnominal form (✓). 에 대해 cannot directly modify a noun, 에 관해한 is a non-existent form, and 에 에 대해 repeats the particle.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P20 · 第1课</div>
    <div class="ov-hero-title">에 대해，에 관해，에 관한</div>
    <div class="ov-hero-sub">关于…… · 有关……的</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">关于……（动词前）</div>
      <div class="ko">名词 + 에 대해（서）/ 에 관해（서）</div>
      <div class="zh">话题指示，后接动词</div>
    </div>
    <div class="ov-block">
      <div class="badge">……的（名词前）</div>
      <div class="ko">名词 + 에 대한 / 에 관한 + 名词</div>
      <div class="zh">定语形，后接名词</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">正式度差别</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">에 대해（서）</span>：口语/书面语都可用</div>
        <div><span style="font-weight:700">에 관해（서）</span>：学术/正式文体更自然</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">환경에 대해 책（直接接名词）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">환경에 대한 책</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">에 관해한（不存在的形式）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">에 관한</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">关于……</div>
<div class="card-body">话题前置的表达，说什么之前先说"关于"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">动词前 vs 名词前</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">+ 动词 → 에 대해/에 관해</div>
      <div style="font-size:16px;font-weight:800;color:#241917">환경에 대해 이야기해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">聊聊关于环境的话题。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">+ 名词 → 에 대한/에 관한</div>
      <div style="font-size:16px;font-weight:800;color:#241917">환경에 관한 책이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">是关于环境的书。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 后面接动词 → 에 대해，后面接名词 → 에 대한</div>
</div>
<div class="reminder-box">에 관해서 = 에 대해서（意思相同，관해서 更书面）。</div>`,
    compareHtml: `<div class="card-title">에 대해 vs 에 관해 vs 에 대한 vs 에 관한</div>
<div class="card-body">四种形式的准确用法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词前，口语/书面语</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">건강에 대해 이야기해요</span><span style="font-size:16px;color:#5a4640">聊关于健康的话题</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词前，正式/学术体</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">환경에 관해 연구해요</span><span style="font-size:16px;color:#5a4640">研究关于环境的问题</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词前，口语/书面语</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 사건에 대한 뉴스</span><span style="font-size:16px;color:#5a4640">关于那件事的新闻</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词前，正式/学术体</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">역사에 관한 책</span><span style="font-size:16px;color:#5a4640">关于历史的书</span></div>
  </div>
</div>`,
    compareLabel: '에 대해 vs 에 관해 vs 에 대한 vs 에 관한',
    quickTable: {
      title: '에 대해/에 관해 用法整理', titleEn: 'Usage summary of 에 대해/에 관해',
      headers: ['形式', '后接', '正式度', '例句'],
      rows: [
        ['에 대해（서）', '动词', '口语/书面语', '건강에 대해 이야기해요'],
        ['에 관해（서）', '动词', '正式/学术', '환경에 관해 연구해요'],
        ['에 대한', '名词', '口语/书面语', '그 문제에 대한 해결책'],
        ['에 관한', '名词', '正式/学术', '역사에 관한 책'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l02',
    partNumber: 20,
    lessonNumber: 2,
    title: '을/를 비롯한，비롯해서，만 해도',
    whatItDoes: '举例列举，或以某事为基准说"光是……就……"', whatItDoesEn: 'Listing examples, or using something as a basis to say "just... alone"',
    whatItDoesBody: '을/를 비롯한 和 을/를 비롯해서 均表示"以……为首/包括……在内"，用于列举，说明某事物是其中代表性的例子。\n비롯한 是冠词形（定语），修饰后面的名词；비롯해서 是连用形，后接动词。\n(까지)만 해도 表示"光是……就……/即便只说……也……"，以某一具体事例强调整体程度，常带有"更不用说其他"的含义。', whatItDoesBodyEn: '을/를 비롯한 and 을/를 비롯해서 both mean "including..." or "with... at the forefront", used for listing, indicating that something is a representative example.\\n비롯한 is adnominal (attributive), modifying the following noun; 비롯해서 is connective, followed by a verb.\\n(까지)만 해도 means "just... alone" or "even just...", emphasizing the overall degree with a specific example, often implying "let alone the rest".',
    structureNote: '名词 + 을/를 비롯한 + 名词（以……为首的……）\n名词 + 을/를 비롯해서 + 动词（包括……在内，……）\n名词 + 만 해도 / 名词 + 까지만 해도（光是……就……）', structureNoteEn: 'Noun + 을/를 비롯한 + Noun (including... / with... at the forefront)\\nNoun + 을/를 비롯해서 + Verb (including...)\\nNoun + 만 해도 / Noun + 까지만 해도 (just... alone)',
    rulesNote: '비롯한/비롯해서 前面的名词，是列举整体中的典型例子。\n만 해도 举出一个极端事例来强调整体。까지 是语气更强的补助词，进一步强调"极端"。', rulesNoteEn: 'The noun before 비롯한/비롯해서 is a typical example from the whole group.\\n만 해도 gives an extreme example to emphasize the whole. 까지 is a stronger particle, further emphasizing the "extreme".',
    scenarioNote: '"BTS를 비롯한 K-POP 그룹들"般，常用于先提出代表性例子的说明/发表。\n"이것만 해도 너무 많아요"般，用于日常对话中的夸张/强调。', scenarioNoteEn: 'Like "BTS를 비롯한 K-POP 그룹들", it\'s often used in explanations/presentations that first give a representative example.\\nLike "이것만 해도 너무 많아요", it\'s used for exaggeration/emphasis in everyday conversation.',
    structures: [
      {
        ko: '을/를 비롯한 + 名词',
        tokens: [
          { text: 'BTS', role: 'plain' },
          { text: '를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们很受欢迎。', zhEn: 'K-pop groups including BTS are very popular.',
      },
      {
        ko: '을/를 비롯해서 + 动词',
        tokens: [
          { text: '서울', role: 'plain' },
          { text: '을 비롯해서', role: 'plain' },
          { text: ' 전국에서', role: 'place' },
          { text: ' 참가했어요', role: 'verb' },
        ],
        zh: '包括首尔在内，全国各地都参加了。', zhEn: 'All across the country, including Seoul, participated.',
      },
      {
        ko: '명사 + 만 해도',
        tokens: [
          { text: '이것', role: 'plain' },
          { text: '만 해도', role: 'plain' },
          { text: ' 너무 많아요', role: 'verb' },
        ],
        zh: '光是这个就已经太多了。', zhEn: 'This alone is already too much.',
      },
      {
        ko: '명사 + 까지만 해도',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '까지만 해도', role: 'plain' },
          { text: ' 괜찮았어요', role: 'verb' },
        ],
        zh: '就连昨天还好好的（更不用说之前）。', zhEn: 'Even yesterday it was fine (let alone before).',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '收音O 名词 + 을 비롯한/비롯해서，收音X 名词 + 를 비롯한/비롯해서', textEn: 'Noun with batchim + 을 비롯한/비롯해서, noun without batchim + 를 비롯한/비롯해서', examples: '음악을 비롯한（收音ㄱ），BTS를 비롯해서（收音X）', examplesEn: '음악을 비롯한 (batchim ㄱ), BTS를 비롯해서 (no batchim)' },
      { type: 'rule', text: '비롯한 + 名词（冠词形），비롯해서 + 动词（连接形）', textEn: '비롯한 + noun (adnominal form), 비롯해서 + verb (connective form)', examples: 'BTS를 비롯한 그룹들（修饰名词）vs 서울을 비롯해서 전국이（动词前）', examplesEn: 'BTS를 비롯한 그룹들 (modifying a noun) vs 서울을 비롯해서 전국이 (before a verb)' },
      { type: 'note', text: '비롯한/비롯해서 前面的名词，是后面所列举整体的代表性事例', textEn: 'The noun before 비롯한/비롯해서 is a representative example of the whole group listed after it.', examples: 'BTS를 비롯한 K-POP 그룹들（BTS 是代表性事例）', examplesEn: 'K-POP groups including BTS (BTS is a representative example)' },
      { type: 'rule', text: '名词 + 만 해도：以极端事例强调整体', textEn: 'Noun + 만 해도: emphasizes the whole using an extreme example', examples: '이것만 해도，서울만 해도，하루만 해도' },
      { type: 'rule', text: '名词 + 까지만 해도：加上 까지 强调极端性', textEn: 'Noun + 까지만 해도: adding 까지 emphasizes extremity', examples: '어제까지만 해도，그것까지만 해도' },
      { type: 'compare', text: '만 해도 vs 까지만 해도：含义相近，까지만 해도 更极端', textEn: '만 해도 vs 까지만 해도: similar meanings, but 까지만 해도 is more extreme', examples: '이것만 해도 많아요（光这个就很多）vs 이것까지만 해도 이미 너무 많아요（光到这个就已经太多了）', examplesEn: '이것만 해도 많아요 (Just this alone is a lot) vs 이것까지만 해도 이미 너무 많아요 (Even just up to this is already too much)' },
      { type: 'note', text: '만 해도 里的 해도 是固定说法，别理解成"做"。它能接跟"做"毫无关系的名词（房租、昨天），整体只是"光是…就"的举例强调，不用去想"做什么"。', textEn: 'In 만 해도, 해도 is a fixed expression—don\'t interpret it as \'do.\' It can attach to nouns unrelated to \'doing\' (like rent, yesterday); the whole phrase just means \'just... alone\' for emphasis, so don\'t think about \'doing\' anything.', examples: '집세만 해도 너무 비싸요（光房租就太贵）——这里没有"做"的意思', examplesEn: '집세만 해도 너무 비싸요 (Just the rent alone is too expensive)—there\'s no \'doing\' meaning here.' },
      { type: 'compare', text: '만 vs 만 해도：만 是"只有（排他）"，만 해도 是"光是…就（举例强调，暗示还有更多）"，别混用。', textEn: '만 vs 만 해도: 만 means \'only\' (exclusive), while 만 해도 means \'just... alone\' (emphasizing an example, implying there\'s more). Don\'t mix them up.', examples: '이것만 비싸요（只有这个贵，别的不贵）vs 이것만 해도 비싸요（光这个就已经很贵了，暗示还有别的）', examplesEn: '이것만 비싸요 (Only this is expensive, others aren\'t) vs 이것만 해도 비싸요 (Just this alone is already expensive, implying there\'s more)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: 'BTS를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 세계적으로', role: 'plain' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们在全球很受欢迎。', zhEn: 'K-POP groups, led by BTS, are very popular worldwide.',
        swapWords: ['블랙핑크를 비롯한', '한국을 비롯한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울을 비롯해서', role: 'plain' },
          { text: ' 전국에서', role: 'place' },
          { text: ' 많은 사람들이', role: 'subject' },
          { text: ' 모였어요', role: 'verb' },
        ],
        zh: '包括首尔在内，全国各地聚集了很多人。', zhEn: 'People gathered from all over the country, including Seoul.',
        swapWords: ['한국을 비롯해서', '음식을 비롯해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '교통비만 해도', role: 'plain' },
          { text: ' 한 달에', role: 'time' },
          { text: ' 10만 원이', role: 'subject' },
          { text: ' 넘어요', role: 'verb' },
        ],
        zh: '光是交通费一个月就超过10万韩元。', zhEn: 'Just transportation costs alone exceed 100,000 won a month.',
        swapWords: ['식비만 해도', '이것만 해도'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '어제까지만 해도', role: 'plain' },
          { text: ' 건강했는데', role: 'verb' },
          { text: ' 갑자기', role: 'plain' },
          { text: ' 아파요', role: 'verb' },
        ],
        zh: '就连昨天还好好的，突然就不舒服了。', zhEn: 'Even yesterday it was fine, but suddenly it became uncomfortable.',
        swapWords: ['아까까지만 해도', '지난주까지만 해도'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'K-POP介绍', contextEn: 'K-POP Introduction', ko: 'BTS를 비롯한 K-POP 가수들이 유명해요.', zh: '以BTS为首的K-POP歌手们都很有名。', zhEn: 'K-POP singers, starting with BTS, are all famous.' },
      { icon: '🌏', context: '国际会议', contextEn: 'International Conference', ko: '한국을 비롯해서 20개국이 참가했어요.', zh: '包括韩国在内，共20个国家参加了。', zhEn: 'A total of 20 countries participated, including Korea.' },
      { icon: '💸', context: '生活费贵', contextEn: 'High Cost of Living', ko: '집세만 해도 너무 비싸요.', zh: '光是房租就太贵了。', zhEn: 'Just the rent alone is too expensive.' },
      { icon: '😮', context: '突然变化', contextEn: 'Sudden Change', ko: '아까까지만 해도 괜찮았는데요.', zh: '刚才还好好的呢。', zhEn: 'It was fine just a moment ago.' },
      { icon: '📊', context: '数据列举', contextEn: 'Data Listing', ko: '서울을 비롯한 대도시의 집값이 올랐어요.', zh: '以首尔为首的大城市房价上涨了。', zhEn: 'Housing prices in major cities, led by Seoul, have risen.' },
      { icon: '😫', context: '任务繁重', contextEn: 'Heavy Workload', ko: '이것까지만 해도 이미 너무 많아요.', zh: '光是这些就已经太多了。', zhEn: 'Even just this is already too much.' },
    ],
    mistakes: [
      { wrong: 'BTS를 비롯해서 그룹들이（비롯해서 + 名词 수식）', wrongEn: 'BTS를 비롯해서 그룹들이 (비롯해서 + noun modification)', correct: 'BTS를 비롯한 그룹들이', note: '修饰名词时用冠词形 비롯한。비롯해서 是连接形用在动词前：비롯해서 모였어요（✓）。', noteEn: 'When modifying a noun, use the adnominal form 비롯한. 비롯해서 is the connective form used before verbs: 비롯해서 모였어요 (✓).' },
      { wrong: 'BTS를 비롯하는 그룹（비롯하는）', correct: 'BTS를 비롯한 그룹', note: '비롯한 是 비롯하다 的冠词形。비롯하는 是现在形冠词形，不用于这个表达。此处冠词形应为 비롯한。', noteEn: '비롯한 is the adnominal form of 비롯하다. 비롯하는 is the present adnominal form and isn\'t used in this expression. The correct adnominal form here is 비롯한.' },
      { wrong: '교통비도 해도 비싸요（用 도 해도 代替 만 해도）', wrongEn: '교통비도 해도 비싸요 (using 도 해도 instead of 만 해도)', correct: '교통비만 해도 비싸요', note: '만 해도 是助词 만 + 해도 的结合。도 해도 是不存在的表达。要表达"光是"的语气时用 만 해도。', noteEn: '만 해도 is a combination of the particle 만 + 해도. 도 해도 is not a valid expression. To convey the nuance of "just" or "even just," use 만 해도.' },
      { wrong: '음악를 비롯한（收音O 名词用 를）', wrongEn: '음악를 비롯한 (nouns with a final consonant take 를)', correct: '음악을 비롯한', note: '음악（有收音ㄱ）→ 을 비롯한（✓）。有收音的名词后用 을，无收音的名词后用 를。', noteEn: '음악 (has final consonant ㄱ) → 을 비롯한 (✓). After nouns with a final consonant, use 을; after nouns without one, use 를.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '을/를 비롯한，비롯해서，만 해도',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）', promptEn: 'BTS___ 비롯한 K-POP 그룹들이 인기예요. (K-POP groups led by BTS are popular.)',
          options: ['를', '가', '을', '이'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（无收音）→ 를 비롯한（✓）。有收音的名词用 을 비롯한。이/가 是主格助词，不用在 비롯한 前面。', explanationEn: 'BTS (no final consonant) → 를 비롯한 (✓). Nouns with a final consonant take 을 비롯한. 이/가 are subject particles and aren\'t used before 비롯한.',
        },
        {
          prompt: '서울을 비롯해서 전국___ 참가했어요。（包括首尔在内，全国各地参加了。）', promptEn: '서울을 비롯해서 전국___ 참가했어요. (People from all over the country, including Seoul, participated.)',
          options: ['에', '이', '에서', '을'],
          answer: 2 as 0|1|2|3,
          explanation: '전국에서：地点 + 에서（表示动作发生的地点）：전국에서 참가했어요（✓）。에 表目的地，이 是主格，을 是宾格，都不合此语境。', explanationEn: '전국에서: location + 에서 (marks where an action takes place): 전국에서 참가했어요 (✓). 에 marks a destination, 이 is a subject particle, and 을 is an object particle—none fit this context.',
        },
        {
          prompt: '집세___ 해도 너무 비싸요。（光是房租就太贵了。）', promptEn: '집세___ 해도 너무 비싸요. (Just the rent alone is too expensive.)',
          options: ['까지', '만', '는', '도'],
          answer: 1 as 0|1|2|3,
          explanation: '만 해도 强调"光是"：집세만 해도（✓）。도 해도 是不存在的表达；까지만 해도 也可以，但 만 해도 是基本形；는 해도 是另一种含义。', explanationEn: '만 해도 emphasizes "just": 집세만 해도 (✓). 도 해도 is not a valid expression; 까지만 해도 is also possible, but 만 해도 is the basic form; 는 해도 has a different meaning.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['음악를 비롯한 예술（收音O）', '이것도 해도 많아요', 'BTS를 비롯해서 그룹들이 유명해요（수식）', '한국을 비롯한 아시아 국가들이 참가했어요'],
          answer: 3 as 0|1|2|3,
          explanation: '한국을 비롯한 + 名词（✓）：用冠词形修饰名词。비롯해서 用在动词前；음악를→을 비롯한，이것도 해도→이것만 해도。', explanationEn: '한국을 비롯한 + noun (✓): use the adnominal form to modify a noun. 비롯해서 is used before verbs; 음악를 → 을 비롯한, 이것도 해도 → 이것만 해도.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P20 · 第2课</div>
    <div class="ov-hero-title">비롯한，비롯해서，만 해도</div>
    <div class="ov-hero-sub">以……为首 · 光是……就……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">以……为首</div>
      <div class="ko">을/를 비롯한（名词 앞）/ 비롯해서（动词 앞）</div>
      <div class="zh">列举代表性事例</div>
    </div>
    <div class="ov-block">
      <div class="badge">光是……就</div>
      <div class="ko">名词 + 만 해도 / 까지만 해도</div>
      <div class="zh">用极端事例强调整体程度</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">비롯한 vs 비롯해서</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">비롯한</span> + 名词：BTS를 비롯한 <b style="color:#ff7fa8">그룹들</b></div>
        <div><span style="font-weight:700">비롯해서</span> + 动词：서울을 비롯해서 <b style="color:#ff7fa8">전국이 참가했어요</b></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">BTS를 비롯해서 그룹들이（名词 수식）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">BTS를 비롯한 그룹들이</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">음악를 비롯한（收音O）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">음악을 비롯한</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">以……为首 / 光是……就</div>
<div class="card-body">列举时以代表为先，强调时以极端为证。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种列举强调方式</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">비롯한/비롯해서 — 以……为首</div>
      <div style="font-size:16px;font-weight:800;color:#241917">BTS를 비롯한 그룹들</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">以BTS为首的团体们</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">만 해도 — 光是……就</div>
      <div style="font-size:16px;font-weight:800;color:#241917">집세만 해도 너무 비싸요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">光是房租就太贵了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 비롯한(名词 수식) vs 비롯해서(动词 앞) 구분 중요</div>
</div>
<div class="reminder-box">收音O → 을 비롯한，收音X → 를 비롯한。</div>`,
    compareHtml: `<div class="card-title">비롯한 vs 비롯해서 / 만 해도 vs 까지만 해도</div>
<div class="card-body">对比形式相似的几组。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">冠词形，后接名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">BTS를 비롯한 그룹들</span><span style="font-size:16px;color:#5a4640">以BTS为首的团体们</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">连接形，后接动词分句</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">서울을 비롯해서 전국이 참가했어요</span><span style="font-size:16px;color:#5a4640">包括首尔在内全国参加了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">以极端事例强调（光是）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">집세만 해도 비싸요</span><span style="font-size:16px;color:#5a4640">光是房租就贵</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">까지만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">更强的极端强调</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어제까지만 해도 괜찮았어요</span><span style="font-size:16px;color:#5a4640">就连昨天还好好的</span></div>
  </div>
</div>`,
    compareLabel: '비롯한 vs 비롯해서 / 만 해도 vs 까지만 해도',
    quickTable: {
      title: '비롯한/비롯해서/만 해도 用法整理', titleEn: 'Usage summary of 비롯한/비롯해서/만 해도',
      headers: ['形式', '后接', '功能', '例句'],
      rows: [
        ['을/를 비롯한', '名词', '冠词形', 'BTS를 비롯한 그룹들'],
        ['을/를 비롯해서', '动词', '连接形', '서울을 비롯해서 참가했어요'],
        ['만 해도', '动词（谓语）', '极端强调', '집세만 해도 비싸요'],
        ['까지만 해도', '动词（谓语）', '更强极端', '어제까지만 해도 괜찮았어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l03',
    partNumber: 20,
    lessonNumber: 3,
    title: '개나，까지（强调补助词）', titleEn: '개나, 까지 (emphatic particles)',
    whatItDoes: '表示数量之多令人意外，或"连……都/甚至……"', whatItDoesEn: 'Indicates a surprising large quantity, or "even..."',
    whatItDoesBody: '개나（도）用在数量词后，表示说话人觉得该数量多得出乎意料，相当于"竟然……个/多达……"，带有轻微惊讶或夸张语气。\n까지 作为强调助词，表示"连……都/甚至……"，强调到了意想不到的极端，可以是正面惊喜也可以是负面意外。', whatItDoesBodyEn: '개나(도) is used after a number, indicating the speaker finds the quantity surprisingly large, equivalent to "as many as..." or "no less than...", with a slight surprise or exaggeration.\\n까지 as an emphatic particle means "even...", emphasizing an unexpected extreme, which can be a positive surprise or a negative shock.',
    structureNote: '수량 + 개나（도）：数量 + 개/명/권 + 나（도）（竟然……个）\n名词/부사 + 까지：名词/副词 + 까지（连……都/甚至……）', structureNoteEn: 'Quantity + 개나(도): number + 개/명/권 + 나(도) (as many as...)\\nNoun/Adverb + 까지: noun/adverb + 까지 (even...)',
    rulesNote: '개나 中的 나 表示"比预期多"的辅助语气。나/이나 后面不能再加 도（개나도✗）。\n까지 表示"达到极端"。用于意料之外的事态、极端事例。前面名词无论有无收音，까지 形式不变。', rulesNoteEn: 'The 나 in 개나 adds a nuance of "more than expected". 나/이나 cannot be followed by 도 (개나도✗).\\n까지 means "reaching an extreme". Used for unexpected situations or extreme examples. The form 까지 doesn\'t change regardless of whether the preceding noun ends in a consonant or vowel.',
    scenarioNote: '"이게 벌써 세 개나 됐어？（竟然已经三个了？）"，"친구까지 나를 의심해（连朋友都怀疑我）"般，常用于表达惊讶。', scenarioNoteEn: 'Like "이게 벌써 세 개나 됐어?" (It\'s already three?) or "친구까지 나를 의심해" (Even my friend doubts me), it\'s often used to express surprise.',
    structures: [
      {
        ko: '수량 + 개나（의외의 많음）',
        tokens: [
          { text: '사과를', role: 'object' },
          { text: ' 다섯', role: 'plain' },
          { text: ' 개나', role: 'plain' },
          { text: ' 먹었어요', role: 'verb' },
        ],
        zh: '苹果竟然吃了五个。', zhEn: 'I ended up eating five apples, surprisingly.',
      },
      {
        ko: '수량 + 이나（强调）',
        tokens: [
          { text: '실수를', role: 'object' },
          { text: ' 열 번', role: 'plain' },
          { text: '이나', role: 'plain' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '竟然犯了十次错误。', zhEn: 'I made ten mistakes, surprisingly.',
      },
      {
        ko: '명사 + 까지（극단 到达）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '까지', role: 'plain' },
          { text: ' 나를', role: 'object' },
          { text: ' 의심해요', role: 'verb' },
        ],
        zh: '连朋友都怀疑我。', zhEn: 'Even my friends doubt me.',
      },
      {
        ko: '부사 + 까지（정도 强调）',
        tokens: [
          { text: '이렇게', role: 'plain' },
          { text: '까지', role: 'plain' },
          { text: ' 할 필요는', role: 'verb' },
          { text: ' 없어요', role: 'verb' },
        ],
        zh: '没必要做到这种程度。', zhEn: 'There\'s no need to go that far.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '数量词 + 나：表示比预期多', textEn: 'numeral + 나: indicates more than expected', examples: '다섯 개나，열 명이나，세 권이나，두 시간이나' },
      { type: 'note', text: '나 / 이나 的选择：前面数量词末字有收音用 이나，无收音用 나', textEn: 'Choosing between 나 / 이나: if the preceding numeral ends with a final consonant, use 이나; otherwise, use 나.', examples: '다섯 개나（无收音），열 명이나（有收音），세 번이나（有收音）', examplesEn: '다섯 개나 (no final consonant), 열 명이나 (final consonant), 세 번이나 (final consonant)' },
      { type: 'note', text: '나/이나 后不能再加 도：열 개나（✓），열 개나도（✗）', textEn: '나/이나 cannot be followed by 도: 열 개나 (✓), 열 개나도 (✗)', examples: '다섯 개나 먹었어요（竟吃了五个），세 번이나 실수했어요（竟失误了三次）', examplesEn: '다섯 개나 먹었어요 (ate as many as five), 세 번이나 실수했어요 (made mistakes as many as three times)' },
      { type: 'rule', text: '名词 + 까지：极端事例 强调（甚至……）', textEn: 'Noun + 까지: emphasizes an extreme case (even...)', examples: '친구까지，선생님까지，그것까지，이렇게까지' },
      { type: 'compare', text: '까지 vs 도：까지 强调"到极端/连…都"，도 只是"也/包含"', textEn: '까지 vs 도: 까지 emphasizes "to the extreme/even...", 도 just means "also/includes"', examples: '친구까지 왔어요（连朋友都来了，出乎意料）vs 친구도 왔어요（朋友也来了，平铺直叙）', examplesEn: '친구까지 왔어요 (even friends came, unexpected) vs 친구도 왔어요 (friends came too, plain statement)' },
      { type: 'note', text: '까지 前面的名词无论有无收音，形式都不变', textEn: 'The noun before 까지 stays the same regardless of whether it ends in a consonant or vowel', examples: '친구까지，학교까지，선생님까지 全都一样', examplesEn: '친구까지, 학교까지, 선생님까지 are all the same' },
      { type: 'note', text: '이나 是多义助词，这一课只讲"数量多得意外"这个用法。它另有"或者（选择）""大约（估量）"等义，后面章节详学，别把这些混进来。', textEn: '이나 is a multi-purpose particle; this lesson only covers the "surprisingly many" usage. It also has "or (choice)" and "approximately (estimate)" meanings, which will be covered in later chapters—don\'t mix them up.', examples: '커피나 차（咖啡或茶，选择）/ 열 명이나（竟有十人，本课用法）——形一样意不同', examplesEn: '커피나 차 (coffee or tea, choice) / 열 명이나 (as many as ten people, this lesson\'s usage)—same form, different meaning' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: ' 커피를', role: 'object' },
          { text: ' 세 잔이나', role: 'plain' },
          { text: ' 마셨어요', role: 'verb' },
        ],
        zh: '今天竟然喝了三杯咖啡。', zhEn: 'I drank three cups of coffee today, surprisingly.',
        swapWords: ['다섯 잔이나', '두 잔이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '숙제를', role: 'object' },
          { text: ' 두 번이나', role: 'plain' },
          { text: ' 잊어버렸어요', role: 'verb' },
        ],
        zh: '作业竟然忘了两次。', zhEn: 'I forgot the homework twice, surprisingly.',
        swapWords: ['세 번이나', '네 번이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구까지', role: 'subject' },
          { text: ' 나를', role: 'object' },
          { text: ' 믿지 않아요', role: 'verb' },
        ],
        zh: '连朋友都不相信我。', zhEn: 'Even my friends don\'t believe me.',
        swapWords: ['가족까지', '선생님까지'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '이렇게까지', role: 'plain' },
          { text: ' 해 줄', role: 'verb' },
          { text: '필요는 없었는데요', role: 'plain' },
        ],
        zh: '没必要做到这种程度的。', zhEn: 'There\'s no need to go that far.',
        swapWords: ['여기까지', '이것까지'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😮', context: '吃太多', contextEn: 'eating too much', ko: '피자를 네 조각이나 먹었어요.', zh: '竟然吃了四片披萨。', zhEn: 'I ate four slices of pizza, surprisingly.' },
      { icon: '😢', context: '连朋友都', contextEn: 'Even friends...', ko: '친구까지 연락을 안 해요.', zh: '连朋友都不联系了。', zhEn: 'I don\'t even contact my friends anymore.' },
      { icon: '😅', context: '犯了很多错', contextEn: 'Made many mistakes', ko: '오늘 실수를 다섯 번이나 했어요.', zh: '今天竟然犯了五次错。', zhEn: 'I made five mistakes today, surprisingly.' },
      { icon: '🥺', context: '感动', contextEn: 'Moved', ko: '선생님까지 와 주셨어요.', zh: '连老师都来了。', zhEn: 'Even the teacher came.' },
      { icon: '😤', context: '等了好久', contextEn: 'Waited a long time', ko: '두 시간이나 기다렸어요.', zh: '竟然等了两个小时。', zhEn: 'I waited two hours, surprisingly.' },
      { icon: '😨', context: '过分了', contextEn: 'That\'s too much.', ko: '이렇게까지 할 줄은 몰랐어요.', zh: '没想到会做到这种程度。', zhEn: 'I didn\'t expect it to go this far.' },
    ],
    mistakes: [
      { wrong: '다섯 개나이（无收音的 나 前又加 이）', wrongEn: '다섯 개나이 (adding 이 before 나 which has no final consonant)', correct: '다섯 개나', note: '개 没有收音，所以用 나：다섯 개나（✓）。이나 用在有收音的数量词后：세 번이나（번 有收音）。', noteEn: '개 has no final consonant, so use 나: 다섯 개나 (✓). 이나 is used after counters with a final consonant: 세 번이나 (번 has a final consonant).' },
      { wrong: '친구도까지 왔어요（도 + 까지 重复）', wrongEn: 'A friend even came (도 + 까지 repeated)', correct: '친구까지 왔어요 또는 친구도 왔어요', note: '까지 和 도 是同一位置的补助词，不能同时使用。까지 表示极端，도 表示包含。按语境只选其一。', noteEn: '까지 and 도 are auxiliary particles that occupy the same position and can\'t be used together. 까지 indicates an extreme, while 도 indicates inclusion. Choose only one based on context.' },
      { wrong: '열 명나（有收音的名词用 나）', wrongEn: '열 명나 (nouns with a final consonant use 나)', correct: '열 명이나', note: '명（有收音ㅇ）→ 이나：열 명이나（✓）。只有无收音的数量词才用 나。', noteEn: '명 (final consonant ㅇ) → 이나: 열 명이나 (✓). Only counters without a final consonant use 나.' },
      { wrong: '까지도 친구가 안 왔어요（까지도 语序错误）', wrongEn: '까지도 친구가 안 왔어요 (word order error with 까지도)', correct: '친구까지도 안 왔어요', note: '까지（도）紧跟在所强调的名词后面：친구까지도（✓）。把 까지도 独立放在句首会很别扭。', noteEn: '까지(도) directly follows the noun being emphasized: 친구까지도 (✓). Placing 까지도 independently at the start of a sentence sounds awkward.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '개나，까지',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '커피를 세 잔___ 마셨어요。（竟然喝了三杯咖啡。）', promptEn: 'I drank three cups of coffee (surprisingly).',
          options: ['이나', '도', '나', '까지'],
          answer: 0 as 0|1|2|3,
          explanation: '잔（有收音ㄴ）→ 이나：세 잔이나（✓）。无收音的数量词用 나；까지 表极端强调，도 表包含。', explanationEn: '잔 (final consonant ㄴ) → 이나: 세 잔이나 (✓). Counters without a final consonant use 나; 까지 expresses extreme emphasis, 도 expresses inclusion.',
        },
        {
          prompt: '사과를 다섯 개___ 먹었어요。（竟然吃了五个苹果。）', promptEn: 'I ate five apples (surprisingly).',
          options: ['도', '이나', '까지', '나'],
          answer: 3 as 0|1|2|3,
          explanation: '개（无收音）→ 나：다섯 개나（✓）。有收音的数量词用 이나；까지/도 是其他用法。', explanationEn: '개 (no final consonant) → 나: 다섯 개나 (✓). Counters with a final consonant use 이나; 까지/도 have other uses.',
        },
        {
          prompt: '가족___ 나를 이해 못 해요。（连家人都不理解我。）', promptEn: 'Even my family doesn\'t understand me.',
          options: ['나', '이나', '까지', '도'],
          answer: 2 as 0|1|2|3,
          explanation: '强调极端事例（连……都）→ 까지：가족까지（✓）。나/이나 用在数量词后，도 表包含（家人也），极端强调的语气较弱。', explanationEn: 'To emphasize an extreme case (even...) → 까지: 가족까지 (✓). 나/이나 are used after counters, 도 indicates inclusion (family too), with weaker extreme emphasis.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['세 개나이 먹었어요', '두 시간이나 기다렸어요', '친구도까지 왔어요', '열 명나 모였어요'],
          answer: 1 as 0|1|2|3,
          explanation: '시간（有收音ㄴ）→ 이나：두 시간이나（✓）。세 개나이→세 개나；친구도까지→친구까지（助词重复）；열 명나→열 명이나（有收音）。', explanationEn: '시간 (final consonant ㄴ) → 이나: 두 시간이나 (✓). 세 개나이→세 개나; 친구도까지→친구까지 (particle repetition); 열 명나→열 명이나 (final consonant).',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P20 · 第3课</div>
    <div class="ov-hero-title">개나，까지</div>
    <div class="ov-hero-sub">竟然……个 · 连……都/甚至</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">竟然……个</div>
      <div class="ko">수량 + 나/이나（개나）</div>
      <div class="zh">数量超出预期，表惊讶</div>
    </div>
    <div class="ov-block">
      <div class="badge">连……都</div>
      <div class="ko">名词 + 까지</div>
      <div class="zh">极端事例强调（甚至……）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">나/이나 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>无收音 → <b style="color:#ff7fa8">나</b>：다섯 개나，두 채나</div>
        <div>有收音 → <b style="color:#ff7fa8">이나</b>：세 잔이나，두 번이나，열 명이나</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">열 명나（收音O에 나）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">열 명이나</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구도까지（助词重复）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구까지</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">竟然这么多 / 连……都</div>
<div class="card-body">数量超出预期用 나/이나，极端举例用 까지。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两个补助词的区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">나/이나 — 数量惊讶</div>
      <div style="font-size:16px;font-weight:800;color:#241917">커피를 세 잔이나 마셨어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">竟然喝了三杯咖啡。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">까지 — 极端事例</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친구까지 안 믿어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">连朋友都不相信了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 有收音 → 이나，无收音 → 나（까지 不变化）</div>
</div>
<div class="reminder-box">까지 和 도 不能同时使用（도까지 X）。</div>`,
    compareHtml: `<div class="card-title">나/이나 vs 도 vs 까지</div>
<div class="card-body">三个补助词的含义对比。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">나/이나</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">数量超出预期（惊讶）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 잔이나 마셨어요</span><span style="font-size:16px;color:#5a4640">竟然喝了三杯</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">包含/添加（也）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구도 왔어요</span><span style="font-size:16px;color:#5a4640">朋友也来了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">到达极端（连……都/甚至）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了</span></div>
  </div>
</div>`,
    compareLabel: '나/이나 vs 도 vs 까지',
    quickTable: {
      title: '나/이나 收音选择 / 까지 用法整理', titleEn: '나/이나 consonant/vowel selection / Usage summary of 까지',
      headers: ['助词', '前接名词条件', '功能', '例句'],
      rows: [
        ['나', '无收音数量词', '数量超出惊讶', '다섯 개나，두 채나'],
        ['이나', '有收音数量词', '数量超出惊讶', '세 잔이나，두 번이나，열 명이나'],
        ['까지', '收音无关', '强调极端事例', '친구까지，가족까지，이렇게까지'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  {
    id: 'card-p20-l04',
    partNumber: 20,
    lessonNumber: 4,
    title: '(이)라든가，(이)라든지，마저',
    whatItDoes: '举例列举，或表示"连最后的……都"', whatItDoesEn: 'Listing examples, or indicating "even the last..."',
    whatItDoesBody: '(이)라든가 和 (이)라든지 均用于列举若干例子，表示"……啊/……之类的"，说明不限于某一个，是其中的若干例子之一。两者意思相同，라든지 略比 라든가 更书面。\n마저 表示"连最后一个也/连剩下的也"，强调到了最后的、本不应该如此的也发生了，带有绝望或遗憾的语气，相当于"连……都……（最后的希望/剩下的也）"。', whatItDoesBodyEn: '(이)라든가 and (이)라든지 are both used to list several examples, meaning "...or something like that", indicating it\'s not limited to one but one of several examples. They have the same meaning, but 라든지 is slightly more formal than 라든가.\\n마저 means "even the last one" or "even the remaining one", emphasizing that even the last thing that shouldn\'t have happened did, with a tone of despair or regret, equivalent to "even... (the last hope/remaining)".',
    structureNote: '收音O 名词 + 이라든가/이라든지\n收音X 名词 + 라든가/라든지\n名词 + 마저（连最后一个也……）', structureNoteEn: 'Consonant-ending noun + 이라든가/이라든지\\nVowel-ending noun + 라든가/라든지\\nNoun + 마저 (even the last...)',
    rulesNote: '(이)라든가/(이)라든지 后面通常接动词或继续列举其他项。列举两个以上项目时，加在每个项目后面。\n마저 表示在本已糟糕的情境下，连最后剩下的也变成如此的绝望感。比 까지 的否定语气更强。', rulesNoteEn: '(이)라든가/(이)라든지 is usually followed by a verb or continues listing other items. When listing two or more items, attach it to each item.\\n마저 indicates a sense of despair that even the last remaining thing becomes so in an already bad situation. It has a stronger negative nuance than 까지.',
    scenarioNote: '"영화라든가 음악이라든가（电影啊音乐之类的）"般，列举兴趣时，\n"희망마저 없어졌어요（连希望都没了）"般，用于表达绝望情境。', scenarioNoteEn: 'Like "영화라든가 음악이라든가" (movies or music) when listing hobbies, or "희망마저 없어졌어요" (Even hope is gone) to express a desperate situation.',
    structures: [
      {
        ko: '收音X 名词 + 라든가',
        tokens: [
          { text: '영화', role: 'plain' },
          { text: '라든가', role: 'plain' },
          { text: ' 음악', role: 'plain' },
          { text: '이라든가', role: 'plain' },
          { text: ' 좋아해요', role: 'verb' },
        ],
        zh: '喜欢电影啊音乐之类的。', zhEn: 'I like things like movies and music.',
      },
      {
        ko: '收音O 名词 + 이라든지',
        tokens: [
          { text: '책', role: 'plain' },
          { text: '이라든지', role: 'plain' },
          { text: ' 잡지', role: 'plain' },
          { text: '라든지', role: 'plain' },
          { text: ' 읽어요', role: 'verb' },
        ],
        zh: '读书啊杂志之类的。', zhEn: 'Things like books and magazines.',
      },
      {
        ko: '명사 + 마저（绝望/안타까움）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 떠났어요', role: 'verb' },
        ],
        zh: '连朋友也离开了（连最后的朋友都走了）。', zhEn: 'Even my friend left (even the last friend is gone).',
      },
      {
        ko: '마저 强调（남은 것마저）',
        tokens: [
          { text: '돈', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '连钱也没了（连最后的钱都没了）。', zhEn: 'Even the money is gone (even the last of the money).',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音名词 + 라든가/라든지，有收音名词 + 이라든가/이라든지', textEn: 'Nouns without final consonant + 라든가/라든지, nouns with final consonant + 이라든가/이라든지', examples: '영화라든가（无收音），음악이라든가（收音ㄱ），책이라든지（收音ㄱ）', examplesEn: '영화라든가 (no final consonant), 음악이라든가 (final consonant ㄱ), 책이라든지 (final consonant ㄱ)' },
      { type: 'note', text: '(이)라든가/(이)라든지 通常用于列举两个以上的项目', textEn: '(이)라든가/(이)라든지 is typically used to list two or more items.', examples: 'A라든가 B라든가，A이라든지 B라든지 这样罗列', examplesEn: 'List them like A라든가 B라든가, A이라든지 B이라든지.' },
      { type: 'compare', text: '라든가 vs 라든지：含义相同，라든지 略偏正式体', textEn: '라든가 vs 라든지: Same meaning, but 라든지 is slightly more formal.', examples: '영화라든가（口语）vs 영화라든지（书面/正式）', examplesEn: '영화라든가 (colloquial) vs 영화라든지 (written/formal)' },
      { type: 'rule', text: '名词 + 마저：连最后剩下的也变成如此（绝望/惋惜）', textEn: 'Noun + 마저: Even the last remaining one becomes so (despair/regret)', examples: '친구마저，희망마저，돈마저，건강마저' },
      { type: 'compare', text: '마저 vs 까지：마저 以最后一个强调绝望，까지 是极端列举', textEn: '마저 vs 까지: 마저 emphasizes despair with the last one, 까지 is extreme listing', examples: '친구까지 왔어요（中性）vs 친구마저 떠났어요（绝望）', examplesEn: '친구까지 왔어요 (neutral) vs 친구마저 떠났어요 (despair)' },
      { type: 'note', text: '마저 前面以"最后剩下的东西"这一语境为前提', textEn: '마저 presupposes the context of \'the last remaining thing\'', examples: '모두 포기했고，희망마저 없어졌어요（全都放弃了，连希望都没了）', examplesEn: '모두 포기했고, 희망마저 없어졌어요 (Gave up everything, even hope is gone)' },
      { type: 'compare', text: '中文"连…都/也"一个词，韩语分三级：도（也，最中性）< 까지（连…都，出乎意料）< 마저（连最后仅剩的也，绝望）。按语气强弱和是否绝望来选，别一律套 마저。', textEn: 'Chinese \'even\' is one word, but Korean has three levels: 도 (also, most neutral) < 까지 (even, unexpected) < 마저 (even the last remaining, despair). Choose based on intensity and despair, don\'t always use 마저.', examples: '친구도 왔어요（朋友也来）→ 친구까지 왔어요（连朋友都来了）→ 친구마저 떠났어요（连朋友也走了，只剩绝望）', examplesEn: '친구도 왔어요 (Friend came too) → 친구까지 왔어요 (Even the friend came) → 친구마저 떠났어요 (Even the friend left, only despair remains)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '취미로', role: 'plain' },
          { text: '영화라든가', role: 'plain' },
          { text: '독서라든가', role: 'plain' },
          { text: '해요', role: 'verb' },
        ],
        zh: '兴趣爱好是看电影啊读书之类的。', zhEn: 'My hobbies are watching movies, reading, and things like that.',
        swapWords: ['음악이라든가 그림이라든가', '여행이라든가 요리라든가'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '주말에는', role: 'time' },
          { text: ' 책이라든지', role: 'plain' },
          { text: ' 잡지라든지', role: 'plain' },
          { text: ' 읽어요', role: 'verb' },
        ],
        zh: '周末读书啊杂志之类的。', zhEn: 'On weekends, I read books, magazines, and things like that.',
        swapWords: ['신문이라든지 잡지라든지', '소설이라든지 만화라든지'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '모두 포기하고', role: 'plain' },
          { text: ' 희망마저', role: 'subject' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '全部放弃了，连希望都消失了。', zhEn: 'I gave up everything, even hope is gone.',
        swapWords: ['의욕마저', '돈마저'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '건강마저', role: 'subject' },
          { text: ' 나빠져서', role: 'verb' },
          { text: ' 정말 힘들어요', role: 'plain' },
        ],
        zh: '连健康都变差了，真的很难熬。', zhEn: 'Even my health got worse, it\'s really hard.',
        swapWords: ['일마저', '자신감마저'],
        swapRole: 'subject',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '列举兴趣', contextEn: 'Listing hobbies', ko: '취미가 영화라든가 음악이라든가 있어요.', zh: '兴趣有看电影啊听音乐之类的。', zhEn: 'My hobbies include watching movies, listening to music, and things like that.' },
      { icon: '📚', context: '书面列举', contextEn: 'Formal listing', ko: '시라든지 소설이라든지 즐겨 읽어요.', zh: '喜欢读诗啊小说之类的。', zhEn: 'I like reading poetry, novels, and things like that.' },
      { icon: '😞', context: '绝望', contextEn: 'Despair', ko: '친구마저 연락을 끊었어요.', zh: '连朋友都断联了。', zhEn: 'Even my friends lost contact.' },
      { icon: '💔', context: '失去一切', contextEn: 'Losing everything', ko: '일도 잃고 돈마저 없어졌어요.', zh: '工作也丢了，连钱也没了。', zhEn: 'I lost my job, and even money is gone.' },
      { icon: '🤔', context: '举例建议', contextEn: 'Suggesting examples', ko: '여행이라든가 새로운 취미라든가 시도해 봐요.', zh: '试试旅行啊新兴趣之类的吧。', zhEn: 'Try traveling, new hobbies, or something like that.' },
      { icon: '😔', context: '最后的希望', contextEn: 'Last hope', ko: '마지막 기회마저 놓쳤어요.', zh: '连最后的机会都错过了。', zhEn: 'Even the last chance was missed.' },
    ],
    mistakes: [
      { wrong: '음악라든가（有收音名词用 라든가）', wrongEn: 'For nouns ending in a consonant, use 라든가', correct: '음악이라든가', note: '음악（有收音ㄱ）→ 이라든가（✓）。只有无收音的名词才用 라든가：영화라든가（영화 无收音）。', noteEn: '음악 (ends in ㄱ) → 이라든가 (✓). Only nouns without a final consonant use 라든가: 영화라든가 (영화 has no final consonant).' },
      { wrong: '영화이라든가（无收音名词用 이라든가）', wrongEn: '영화이라든가 (for nouns without a final consonant, use 이라든가)', correct: '영화라든가', note: '영화（无收音）→ 라든가（✓）。给无收音的名词加 이라든가 是错的。', noteEn: '영화 (no final consonant) → 라든가 (✓). Adding 이라든가 to a noun without a final consonant is wrong.' },
      { wrong: '친구가마저 떠났어요（마저 前多了 가）', wrongEn: '친구가마저 떠났어요 (there\'s an extra 가 before 마저)', correct: '친구마저 떠났어요', note: '마저 直接接在名词后，不加主格助词 가：친구마저（✓）。마저 本身兼作助词，前面不再放 가/를。', noteEn: '마저 attaches directly to a noun without the subject particle 가: 친구마저 (✓). 마저 itself acts as a particle, so no 가/를 is needed before it.' },
      { wrong: '在肯定语境中用 마저：선물마저 받았어요', wrongEn: 'Use 마저 in positive contexts: 선물마저 받았어요', correct: '선물까지 받았어요', note: '마저 只用于否定/绝望的语境。肯定语境的"连……都"要用 까지：선물까지 받았어요（✓）。', noteEn: '마저 is only used in negative/despairing contexts. For "even" in positive contexts, use 까지: 선물까지 받았어요 (✓).' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '(이)라든가，(이)라든지，마저',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '취미로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）', promptEn: 'For hobbies, I do things like watching movies or listening to music.',
          options: ['라든가', '까지', '마저', '이라든가'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（无收音）→ 라든가（✓）。이라든가 用于有收音名词；마저/까지 不是列举，而是强调助词。', explanationEn: '영화 (no final consonant) → 라든가 (✓). 이라든가 is for nouns with a final consonant; 마저/까지 are not for listing but for emphasis.',
        },
        {
          prompt: '주말에는 책___ 잡지라든지 읽어요。（周末读书啊杂志之类的。）', promptEn: 'On weekends, I read things like books or magazines.',
          options: ['마저', '라든지', '까지', '이라든지'],
          answer: 3 as 0|1|2|3,
          explanation: '책（有收音ㄱ）→ 이라든지（✓）。라든지 用于无收音名词；마저/까지 不是列举助词。', explanationEn: '책 (ends in ㄱ) → 이라든지 (✓). 라든지 is for nouns without a final consonant; 마저/까지 are not listing particles.',
        },
        {
          prompt: '모두 잃고 희망___ 없어졌어요。（全失去了，连希望都消失了。—绝望）', promptEn: 'I lost everything, and even hope disappeared. (despair)',
          options: ['까지', '이나', '마저', '라든가'],
          answer: 2 as 0|1|2|3,
          explanation: '마저：连最后剩下的也变成如此（绝望）：희망마저（✓）。까지 是中性/肯定的极端，이나 表数量，라든가 是列举。', explanationEn: '마저: even the last remaining thing becomes so (despair): 희망마저 (✓). 까지 is neutral/positive extreme, 이나 indicates quantity, 라든가 is for listing.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['선물마저 받았어요（肯定）', '음악이라든가 영화라든가 좋아해요', '친구가마저 떠났어요', '음악라든가 좋아해요（收音O）'],
          answer: 1 as 0|1|2|3,
          explanation: '음악이라든가（收音ㄱ→이라든가）영화라든가（无收音→라든가）（✓）。음악라든가→이라든가；선물마저 받았어요 是肯定语境应用 까지；친구가마저 多了主格 가，应为 친구마저。', explanationEn: '음악이라든가 (final ㄱ → 이라든가) 영화라든가 (no final → 라든가) (✓). 음악라든가 → 이라든가; 선물마저 받았어요 is a positive context, so use 까지; 친구가마저 has an extra subject particle 가, should be 친구마저.',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P20 · 第4课</div>
    <div class="ov-hero-title">(이)라든가，(이)라든지，마저</div>
    <div class="ov-hero-sub">……之类的 · 连最后的……都</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">之类的</div>
      <div class="ko">(이)라든가 / (이)라든지</div>
      <div class="zh">列举若干例子（……啊……之类）</div>
    </div>
    <div class="ov-block">
      <div class="badge">连最后的……都</div>
      <div class="ko">名词 + 마저</div>
      <div class="zh">绝望/遗憾（最后剩下的也……）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">이라든가/라든가 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>收音X → <b style="color:#ff7fa8">라든가/라든지</b>：영화라든가，잡지라든지</div>
        <div>收音O → <b style="color:#ff7fa8">이라든가/이라든지</b>：음악이라든가，책이라든지</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">음악라든가（收音O에 라든가）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">음악이라든가</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선물마저 받았어요（肯定）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선물까지 받았어요</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">……之类的 / 连最后的……都</div>
<div class="card-body">列举用 라든가，绝望用 마저。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种强调方式</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">(이)라든가/(이)라든지 — 列举</div>
      <div style="font-size:16px;font-weight:800;color:#241917">영화라든가 음악이라든가 좋아해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">喜欢电影啊音乐之类的。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">마저 — 绝望</div>
      <div style="font-size:16px;font-weight:800;color:#241917">희망마저 없어졌어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">连希望都消失了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 마저 必须只用于否定语境</div>
</div>
<div class="reminder-box">有收音 → 이라든가/이라든지，无收音 → 라든가/라든지。</div>`,
    compareHtml: `<div class="card-title">마저 vs 까지 / 라든가 vs 라든지</div>
<div class="card-body">对比相似的几组。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">마저</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">绝望/否定语境，连最后的也</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구마저 떠났어요</span><span style="font-size:16px;color:#5a4640">连朋友都走了（绝望）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">极端强调，肯定/否定皆可</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了（惊喜）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">偏口语的列举</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">영화라든가 음악이라든가</span><span style="font-size:16px;color:#5a4640">电影啊音乐之类</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">略偏正式的列举</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">책이라든지 잡지라든지</span><span style="font-size:16px;color:#5a4640">书啊杂志之类</span></div>
  </div>
</div>`,
    compareLabel: '마저 vs 까지 / 라든가 vs 라든지',
    quickTable: {
      title: '(이)라든가/(이)라든지/마저 用法整理', titleEn: 'Usage summary of (이)라든가/(이)라든지/마저',
      headers: ['助词', '收音条件', '功能', '例句'],
      rows: [
        ['라든가/라든지', '无收音名词', '列举（口语/正式）', '영화라든가，잡지라든지'],
        ['이라든가/이라든지', '有收音名词', '列举（口语/正式）', '음악이라든가，책이라든지'],
        ['마저', '收音无关', '绝望极端（否定）', '친구마저，희망마저，돈마저'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  {
    id: 'card-p20-l05',
    partNumber: 20,
    lessonNumber: 5,
    title: '-는가 하면，-기도 하다',
    whatItDoes: '表示一面……一面……，或"也会/也有"', whatItDoesEn: 'Indicates doing something while doing another, or "also"',
    whatItDoesBody: '-는/은/ㄴ가 하면 表示两种对比或并列的情况同时存在，相当于"一方面……另一方面……/有时……有时……"，常用于描述事物的两面性。\n-기도 하다 表示在某行为或状态之外也有其他情况，相当于"也会/也有时/也是"，语气比较平和，常与 때로는、偶尔 等副词搭配。', whatItDoesBodyEn: '-는/은/ㄴ가 하면 indicates two contrasting or parallel situations coexisting, equivalent to "on one hand... on the other hand.../sometimes... sometimes...", often used to describe two sides of something.\\n-기도 하다 indicates there are other situations beyond a certain action or state, equivalent to "also/also sometimes/also is", with a calm tone, often used with adverbs like 때로는, occasionally.',
    structureNote: '-는/은/ㄴ가 하면：动词/形容词 冠词形 + 가 하면\n-기도 하다：动词/形容词 词干 + 기도 하다', structureNoteEn: '-는/은/ㄴ가 하면: verb/adjective adnominal form + 가 하면\\n-기도 하다: verb/adjective stem + 기도 하다',
    rulesNote: '-는가 하면 前后分句是相互对照的内容。前句是一种情境，后句是相反或另一种情境。\n-기도 하다 可以单独使用（如"～하기도 해요"），也可以用在罗列结构中（如"-기도 하고 -기도 하다"）。', rulesNoteEn: '-는가 하면: the clauses before and after contrast with each other. The first clause describes one situation, and the second describes an opposite or different one.\\n-기도 하다 can be used alone (e.g., "~하기도 해요") or in a listing structure (e.g., "-기도 하고 -기도 하다").',
    scenarioNote: '如"가격이 싼가 하면 품질이 나빠요（一方面价格便宜，另一方面质量不好）"，\n"슬프기도 하고 기쁘기도 해요（既有些难过，也有些高兴）"，用于描述复杂情感或情境。', scenarioNoteEn: 'For example, "가격이 싼가 하면 품질이 나빠요 (on one hand the price is cheap, on the other hand the quality is bad)",\\n"슬프기도 하고 기쁘기도 해요 (it\'s both a bit sad and a bit happy)", used to describe complex emotions or situations.',
    structures: [
      {
        ko: '동사 -는가 하면',
        tokens: [
          { text: '웃는가', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 또 울어요', role: 'verb' },
        ],
        zh: '一会儿笑，一会儿又哭。', zhEn: 'Sometimes laughing, sometimes crying.',
      },
      {
        ko: '형용사 -은/ㄴ가 하면',
        tokens: [
          { text: '가격이', role: 'subject' },
          { text: ' 싼가', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 품질이 나빠요', role: 'verb' },
        ],
        zh: '价格便宜，但质量不好。', zhEn: 'It\'s cheap, but the quality is bad.',
      },
      {
        ko: '词干 + 기도 하다（단독）',
        tokens: [
          { text: '가끔', role: 'plain' },
          { text: ' 슬프기도 해요', role: 'verb' },
        ],
        zh: '有时也会感到悲伤。', zhEn: 'Sometimes I also feel sad.',
      },
      {
        ko: '-기도 하고 -기도 하다（나열）',
        tokens: [
          { text: '재미있기도 하고', role: 'verb' },
          { text: ' 어렵기도 해요', role: 'verb' },
        ],
        zh: '既有趣，也有些难。', zhEn: 'It\'s fun, but also a bit difficult.',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 + 는가 하면，形容词 + 은/ㄴ가 하면，动词过去 + 았/었는가 하면', textEn: 'Verb present + 는가 하면, adjective + 은/ㄴ가 하면, verb past + 았/었는가 하면', examples: '웃는가 하면，싼가 하면，먹었는가 하면' },
      { type: 'note', text: '-는가 하면 前后分句是对照内容：A인가 하면 B（A 与 B 相反/并列）', textEn: '-는가 하면 connects contrasting clauses: A인가 하면 B (A and B are opposite/parallel)', examples: '빠른가 하면 느리기도 해요（说快也快说慢也慢），웃는가 하면 울기도 해요（又哭又笑）', examplesEn: '빠른가 하면 느리기도 해요 (sometimes fast, sometimes slow), 웃는가 하면 울기도 해요 (sometimes laughing, sometimes crying)' },
      { type: 'rule', text: '动词/形容词词干 + 기도 하다', textEn: 'Verb/adjective stem + 기도 하다', examples: '슬프기도 해요（也会难过），먹기도 해요（也会吃），웃기도 해요（也会笑）', examplesEn: '슬프기도 해요 (also sad), 먹기도 해요 (also eat), 웃기도 해요 (also laugh)' },
      { type: 'note', text: '-기도 하고 -기도 하다：罗列两种状态或行为', textEn: '-기도 하고 -기도 하다: Lists two states or actions', examples: '재미있기도 하고 어렵기도 해요（既有趣又难），웃기도 하고 울기도 해요（又笑又哭）', examplesEn: '재미있기도 하고 어렵기도 해요 (fun and difficult), 웃기도 하고 울기도 해요 (laugh and cry)' },
      { type: 'compare', text: '-는가 하면 vs -기도 하다：는가 하면 表对照，기도 하다 表并列/补充', textEn: '-는가 하면 vs -기도 하다: 는가 하면 shows contrast, 기도 하다 shows listing/addition', examples: '싼가 하면 품질이 나빠요（对照）vs 비싸기도 하고 좋기도 해요（并列）', examplesEn: '싼가 하면 품질이 나빠요 (contrast) vs 비싸기도 하고 좋기도 해요 (listing)' },
      { type: 'note', text: '-기도 하다 常与 때로는、가끔 等频率副词呼应', textEn: '-기도 하다 often pairs with frequency adverbs like 때로는, 가끔', examples: '때로는 슬프기도 해요（有时也会难过），가끔 실수하기도 해요（偶尔也会失误）', examplesEn: '때로는 슬프기도 해요 (sometimes sad), 가끔 실수하기도 해요 (occasionally make mistakes)' },
      { type: 'note', text: '别被 -는가 的疑问外形骗到。-는가 单独是疑问句尾，但 -는가 하면 是固定说法，意思是"一方面…（另一方面）/有时…有时…"，不是在提问，翻译时别加"是否"。', textEn: 'Don\'t be fooled by -는가\'s question form. -는가 alone is a question ending, but -는가 하면 is a fixed expression meaning "on one hand... (on the other)/sometimes... sometimes...", not a question. Don\'t add "whether" when translating.', examples: '싼가 하면 품질이 나빠요＝一方面便宜，另一方面质量差（不是"便宜吗？"）', examplesEn: '싼가 하면 품질이 나빠요 = on one hand cheap, on the other poor quality (not "is it cheap?")' },
      { type: 'compare', text: '又…又：单纯 -고 是中性并列陈述，-기도 하고…-기도 하다 强调"也有…的时候/这两种情况都存在"，语气更强。别把带感情的两面性都写成平铺的 -고。', textEn: 'Both... and: plain -고 is neutral listing, -기도 하고...-기도 하다 emphasizes "there are times when.../both exist", stronger tone. Don\'t flatten emotional duality into plain -고.', examples: '재미있고 어려워요（有趣而且难，客观陈述）vs 재미있기도 하고 어렵기도 해요（有有趣的时候，也有难的时候）', examplesEn: '재미있고 어려워요 (fun and difficult, objective) vs 재미있기도 하고 어렵기도 해요 (sometimes fun, sometimes difficult)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '친절한가 하면', role: 'verb' },
          { text: '가끔', role: 'plain' },
          { text: '차갑기도 해요', role: 'verb' },
        ],
        zh: '那个人一方面很亲切，有时也会冷漠。', zhEn: 'That person is kind on one hand, but sometimes cold.',
        swapWords: ['착한가 하면', '조용한가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 영화는', role: 'subject' },
          { text: '슬프기도 하고', role: 'verb' },
          { text: '재미있기도 해요', role: 'verb' },
        ],
        zh: '这部电影既有些悲伤，也很有趣。', zhEn: 'This movie is a bit sad, but also fun.',
        swapWords: ['무섭기도 하고 감동적이기도 해요', '웃기기도 하고 감동적이기도 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: ' 어려운가 하면', role: 'verb' },
          { text: ' 재미있기도 해요', role: 'verb' },
        ],
        zh: '韩语一方面很难，另一方面也很有趣。', zhEn: 'Korean is hard on one hand, but also fun on the other.',
        swapWords: ['복잡한가 하면', '쉬운가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가끔', role: 'plain' },
          { text: '지치기도 하지만', role: 'verb' },
          { text: '계속', role: 'plain' },
          { text: '하고 싶어요', role: 'verb' },
        ],
        zh: '有时也会疲惫，但还是想继续。', zhEn: 'Sometimes I get tired, but I still want to continue.',
        swapWords: ['힘들기도 하지만', '포기하고 싶기도 하지만'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😄😢', context: '复杂心情', contextEn: 'Mixed feelings', ko: '기쁘기도 하고 슬프기도 해요.', zh: '既高兴又有些难过。', zhEn: 'Happy but a bit sad.' },
      { icon: '🌤️', context: '天气变化', contextEn: 'Weather changes', ko: '맑은가 하면 비가 오기도 해요.', zh: '有时晴，有时也会下雨。', zhEn: 'Sometimes sunny, sometimes rainy.' },
      { icon: '📚', context: '学习感受', contextEn: 'Learning experience', ko: '한국어가 재미있는가 하면 어렵기도 해요.', zh: '韩语一方面有趣，另一方面也难。', zhEn: 'Korean is fun on one hand, but hard on the other.' },
      { icon: '🤷', context: '两面性', contextEn: 'Two-sidedness', ko: '그 사람은 친절한가 하면 무서운 면도 있어요.', zh: '那个人亲切的一面，也有让人害怕的一面。', zhEn: 'That person has a kind side, but also a scary side.' },
      { icon: '💪', context: '坚持', contextEn: 'Perseverance', ko: '힘들기도 하지만 보람 있어요.', zh: '有时也辛苦，但很有成就感。', zhEn: 'Sometimes tough, but rewarding.' },
      { icon: '🍽️', context: '食物两面', contextEn: 'Food duality', ko: '맵기도 하고 맛있기도 해요.', zh: '既辣，也好吃。', zhEn: 'It\'s spicy, but also delicious.' },
    ],
    mistakes: [
      { wrong: '웃은가 하면（动词现在用 은가）', wrongEn: '웃은가 하면 (use 은가 for present tense verbs)', correct: '웃는가 하면', note: '动词现在用 -는가：웃는가 하면（✓）。-은/ㄴ가 用于形容词；动词过去用 았/었는가（먹었는가 하면）。', noteEn: 'For present tense verbs, use -는가: 웃는가 하면 (✓). -은/ㄴ가 is for adjectives; for past tense verbs, use 았/었는가 (먹었는가 하면).' },
      { wrong: '비싸는가 하면（形容词用 -는가）', wrongEn: '비싸는가 하면 (use -는가 for adjectives)', correct: '비싼가 하면', note: '形容词的冠词形是 -은/ㄴ：비싸다→비싼가 하면（✓）。给形容词用动词形 -는가 是错的。', noteEn: 'The adnominal form for adjectives is -은/ㄴ: 비싸다→비싼가 하면 (✓). Using the verb form -는가 for adjectives is incorrect.' },
      { wrong: '먹기도하다（没有分写）', wrongEn: '먹기도하다 (no spacing)', correct: '먹기도 하다', note: '-기도 하다 要把 기도 和 하다 分开写：먹기도 해요（✓）。连写就是错误的形式。', noteEn: '-기도 하다 requires spacing between 기도 and 하다: 먹기도 해요 (✓). Writing it together is incorrect.' },
      { wrong: '슬프기도하고 기쁘기도해요', correct: '슬프기도 하고 기쁘기도 해요', note: '-기도 하고 结构中，기도 后面、하고 前面必须分写：슬프기도 하고（✓）。', noteEn: 'In the -기도 하고 structure, there must be spacing after 기도 and before 하고: 슬프기도 하고 (✓).' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는가 하면，-기도 하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '날씨가 맑___ 하면 갑자기 비가 오기도 해요。（有时晴，有时突然下雨。）', promptEn: '날씨가 맑___ 하면 갑자기 비가 오기도 해요. (Sometimes it\'s sunny, sometimes it suddenly rains.)',
          options: ['는가', '던가', '을가', '은가'],
          answer: 3 as 0|1|2|3,
          explanation: '맑다（形容词）的冠词形：맑은가 하면（✓）。는가 用于动词现在形，던가 表回想，을가 是不存在的形式。', explanationEn: 'The adnominal form of 맑다 (adjective): 맑은가 하면 (✓). 는가 is for present tense verbs, 던가 indicates recollection, and 을가 is not a valid form.',
        },
        {
          prompt: '한국어가 재미있___ 하면 어렵기도 해요。（韩语一方面有趣，另一方面也难。）', promptEn: '한국어가 재미있___ 하면 어렵기도 해요. (Korean is fun on one hand, but also difficult on the other.)',
          options: ['던가', '은가', '는가', '을가'],
          answer: 2 as 0|1|2|3,
          explanation: '재미있다（있다 系列形容词）在冠词形上例外地用 -는：재미있는가 하면（✓）。一般形容词用 -은/ㄴ가，但 있다/없다 用 -는가 形式。은가/던가/을가 都不合此语境。', explanationEn: '재미있다 (an 있다-series adjective) exceptionally uses -는 in its adnominal form: 재미있는가 하면 (✓). Regular adjectives use -은/ㄴ가, but 있다/없다 use -는가. 은가/던가/을가 are all inappropriate here.',
        },
        {
          prompt: '이 음식은 맵___ 하고 짜기도 해요。（这道食物既辣又咸。）', promptEn: '이 음식은 맵___ 하고 짜기도 해요. (This food is both spicy and salty.)',
          options: ['기만', '기도', '은가', '는가'],
          answer: 1 as 0|1|2|3,
          explanation: '-기도 하고 -기도 하다：맵기도 하고 짜기도 해요（✓）。는가/은가 是对照结构，기만 是不存在的形式。', explanationEn: '-기도 하고 -기도 하다: 맵기도 하고 짜기도 해요 (✓). 는가/은가 are contrast structures, and 기만 is not a valid form.',
        },
        {
          prompt: '다음 중 올바른 문장은？',
          options: ['슬프기도 하고 기쁘기도 해요', '웃은가 하면 또 울어요（动词现在）', '비싸는가 하면（形容词+는가）', '먹기도하다（分写）'],
          answer: 0 as 0|1|2|3,
          explanation: '슬프기도 하고 기쁘기도 해요：正确的罗列结构（✓）。웃은가→웃는가（动词现在），비싸는가→비싼가（形容词），먹기도하다→먹기도 하다（需分写）。', explanationEn: '슬프기도 하고 기쁘기도 해요: correct listing structure (✓). 웃은가→웃는가 (present tense verb), 비싸는가→비싼가 (adjective), 먹기도하다→먹기도 하다 (needs spacing).',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P20 · 第5课</div>
    <div class="ov-hero-title">-는가 하면，-기도 하다</div>
    <div class="ov-hero-sub">一面……一面…… · 也会……/也是……</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">两面对比</div>
      <div class="ko">冠词形 + 가 하면</div>
      <div class="zh">一方面……另一方面……（对比/并列）</div>
    </div>
    <div class="ov-block">
      <div class="badge">也会/有时</div>
      <div class="ko">词干 + 기도 하다</div>
      <div class="zh">也会……/有时也……（补充）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠词形 선택</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">动词 现在</span>：웃<b style="color:#ff7fa8">는가</b> 하면</div>
        <div><span style="font-weight:700">形容词</span>：비싸<b style="color:#ff7fa8">ㄴ가</b> 하면（비싼가 하면）</div>
        <div><span style="font-weight:700">있다/없다</span>：재미있<b style="color:#ff7fa8">는가</b> 하면（虽是形容词，但用 -는）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비싸는가 하면（形容词+는가）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비싼가 하면</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹기도하다（分写）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹기도 하다</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">一面……一面…… / 也会……</div>
<div class="card-body">同一个人/事物有两面，或者有时还有另一种情况。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种表达方式</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는/은/ㄴ가 하면 — 대조</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친절한가 하면 차갑기도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一方面亲切，有时也会冷漠。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-기도 하다 — 병렬/추가</div>
      <div style="font-size:16px;font-weight:800;color:#241917">슬프기도 하고 기쁘기도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">既悲伤，也高兴。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 形容词 + 가 하면 → 은/ㄴ가（비싼가，어려운가）</div>
</div>
<div class="reminder-box">-기도 하다 中的 기도 和 하다 必须分开写。</div>`,
    compareHtml: `<div class="card-title">-는가 하면 vs -기도 하다 / 있다 注意</div>
<div class="card-body">相似结构的区别，以及 있다/없다 的特殊处理。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는가 하면</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">前后对照，描述两面</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비싼가 하면 품질이 좋아요</span><span style="font-size:16px;color:#5a4640">贵是贵，但质量好</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기도 하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">补充/罗列，多种状态并列</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맵기도 하고 달기도 해요</span><span style="font-size:16px;color:#5a4640">既辣又甜</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">있다/없다 + 는가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">있다/없다 虽是形容词但用 -는가</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있는가 하면</span><span style="font-size:16px;color:#5a4640">一方面有趣</span></div>
  </div>
</div>`,
    compareLabel: '-는가 하면 vs -기도 하다',
    quickTable: {
      title: '-는/은/ㄴ가 하면 冠词形选择', titleEn: '-는/은/ㄴ가 하면 adnominal form selection',
      headers: ['词性', '冠词形', '例句'],
      rows: [
        ['动词现在', '-는가', '웃는가 하면，먹는가 하면'],
        ['形容词', '-은/ㄴ가', '비싼가 하면，어려운가 하면，좋은가 하면'],
        ['있다/없다', '-는가', '재미있는가 하면，없는가 하면'],
        ['-기도 하다', '词干 + 기도', '먹기도 해요，슬프기도 해요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l06',
    isPractice: true,
    partNumber: 20,
    lessonNumber: 6,
    title: 'P20 综合练习', titleEn: 'P20 Comprehensive Practice',
    whatItDoes: 'P20 第1～5课 综合练习', whatItDoesEn: 'P20 Lessons 1-5 Comprehensive Review',
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
    <div class="ov-hero-label">P20 · 综合练习</div>
    <div class="ov-hero-title">第1～5课 복습</div>
    <div class="ov-hero-sub">에 대해/에 관해/에 관한 · 비롯한/비롯해서/만 해도 · 개나/까지 · (이)라든가/마저 · -는가 하면/-기도 하다</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P20 综合练习', titleEn: 'P20 Comprehensive Practice',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）', promptEn: 'BTS___ 비롯한 K-POP 그룹들이 인기예요. (K-POP groups led by BTS are popular.)',
          options: ['를', '이', '가', '을'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（无收音）→ 를 비롯한（✓）。有收音用 을 비롯한。이/가 是主格助词。', explanationEn: 'BTS (no final consonant) → 를 비롯한 (✓). Use 을 비롯한 after a final consonant. 이/가 are subject particles.',
        },
        {
          prompt: '오늘 커피를 세 잔___ 마셨어요。（今天竟然喝了三杯咖啡。）', promptEn: '오늘 커피를 세 잔___ 마셨어요. (I drank as many as three cups of coffee today.)',
          options: ['나', '이나', '마저', '까지'],
          answer: 1 as 0|1|2|3,
          explanation: '잔（有收音ㄴ）→ 이나：세 잔이나（✓）。无收音用 나；까지 表极端，마저 表绝望。', explanationEn: '잔 (final consonant ㄴ) → 이나: 세 잔이나 (✓). Use 나 after no final consonant; 까지 indicates extremity, 마저 indicates despair.',
        },
        {
          prompt: '모두 잃고 희망___ 없어졌어요。（连希望都消失了。—绝望）', promptEn: '모두 잃고 희망___ 없어졌어요. (Even hope disappeared. —despair)',
          options: ['까지', '라든가', '마저', '이나'],
          answer: 2 as 0|1|2|3,
          explanation: '마저：在绝望语境中连最后的也如此：희망마저（✓）。까지 是中性/肯定，이나 表数量，라든가 是列举。', explanationEn: '마저: in despair contexts, even the last one is affected: 희망마저 (✓). 까지 is neutral/positive, 이나 indicates quantity, 라든가 is for listing.',
        },
        {
          prompt: '한국 역사___ 책을 읽었어요。（读了关于韩国历史的书。）', promptEn: '한국 역사___ 책을 읽었어요. (Read a book about Korean history.)',
          options: ['에 대해', '에 관한', '에 대해서', '에 관해'],
          answer: 1 as 0|1|2|3,
          explanation: '修饰名词（책）用冠词形 에 관한：역사에 관한 책（✓）。에 대해/에 관해/에 대해서 用在动词前，不能直接修饰名词。', explanationEn: 'To modify a noun (책), use the adnominal form 에 관한: 역사에 관한 책 (✓). 에 대해/에 관해/에 대해서 are used before verbs and cannot directly modify nouns.',
        },
        {
          prompt: '한국어는 어려운가 하면 재미있___ 해요。（韩语一方面难，另一方面也有趣。）', promptEn: '한국어는 어려운가 하면 재미있___ 해요. (Korean is difficult on one hand, but also interesting on the other.)',
          options: ['기도', '기가', '는가', '기만'],
          answer: 0 as 0|1|2|3,
          explanation: '-기도 하다：补充/罗列：재미있기도 해요（✓）。는가 用在对照结构前，기만/기가 是不存在的形式。', explanationEn: '-기도 하다: addition/listing: 재미있기도 해요 (✓). 는가 is used before contrast structures, 기만/기가 are not valid forms.',
        },
        {
          prompt: '취미로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）', promptEn: 'For hobbies, I do things like watching movies or listening to music.',
          options: ['라든가', '까지', '이라든가', '마저'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（无收音）→ 라든가（✓）。이라든가 用于有收音名词；마저 表绝望，까지 表极端。', explanationEn: '영화 (no final consonant) → 라든가 (✓). 이라든가 is used after nouns with a final consonant; 마저 indicates despair, 까지 indicates extremity.',
        },
      ],
    },
  },

];
