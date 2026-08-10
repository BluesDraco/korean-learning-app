import type { GrammarCard } from '@/types';

export const grammarCardsP11: GrammarCard[] = [
  {
    id: 'card-p11-l01',
    partNumber: 11,
    lessonNumber: 1,
    title: '陈述句间接引语', titleEn: 'Indirect Speech for Declarative Sentences',
    whatItDoes: '转述别人说的话——"他说……"', whatItDoesEn: 'Reporting what someone said — "He said..."',
    whatItDoesBody: '间接引语是把别人的话或自己之前说的话转述出来的语法结构。陈述句间接引语根据谓词类型分为四种形式，统一用 -고 하다 收尾。\n口语中 -고 하다 常缩略为 -고 해요，更口语时直接用 -대요。', whatItDoesBodyEn: 'Indirect speech is a grammatical structure used to report what someone else said or what you said earlier. Declarative indirect speech has four forms based on the predicate type, all ending with -고 하다.\\nIn spoken Korean, -고 하다 often shortens to -고 해요, and even more colloquially to -대요.',
    structureNote: '动词：词干 + -는다고/ㄴ다고 하다\n形容词：词干 + -다고 하다\n名词谓词：名词 + -(이)라고 하다\n过去时统一：-았/었다고 하다', structureNoteEn: 'Verbs: stem + -는다고/ㄴ다고 하다\\nAdjectives: stem + -다고 하다\\nNoun predicates: noun + -(이)라고 하다\\nPast tense (all): -았/었다고 하다',
    rulesNote: '时态由被引语句本身决定：现在/过去/将来 均可出现。\n口语缩略：-는다고 해요 → -는대요，-다고 해요 → -대요，-(이)라고 해요 → -(이)래요。', rulesNoteEn: 'Tense is determined by the quoted clause itself: present/past/future all possible.\\nSpoken contractions: -는다고 해요 → -는대요, -다고 해요 → -대요, -(이)라고 해요 → -(이)래요.',
    structures: [
      {
        ko: '친구가 내일 온다고 했어요',
        zh: '朋友说明天会来。', zhEn: 'My friend said they will come tomorrow.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '온다고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 이 문제가 어렵다고 하셨어요',
        zh: '老师说这道题很难。', zhEn: 'The teacher said this problem is difficult.',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '이 문제가', role: 'object' },
          { text: '어렵다고 하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 학생이라고 했어요',
        zh: '那个人说自己是学生。', zhEn: 'That person said they are a student.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '학생이라고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '뉴스에서 내일 비가 온다고 했어요',
        zh: '新闻说明天会下雨。', zhEn: 'The news said it will rain tomorrow.',
        tokens: [
          { text: '뉴스에서', role: 'place' },
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '온다고 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词（有收音）词干 + -는다고 하다', textEn: 'Verb stem (with batchim) + -는다고 하다', examples: '먹다→먹는다고 해요 / 읽다→읽는다고 해요' },
      { type: 'rule', text: '动词（无收音/ㄹ词干）词干 + -ㄴ다고 하다', textEn: 'Verb stem (no batchim/ㄹ stem) + -ㄴ다고 하다', examples: '가다→간다고 해요 / 만들다→만든다고 해요' },
      { type: 'rule', text: '形容词词干 + -다고 하다（所有形容词）', textEn: 'Adjective stem + -다고 하다 (all adjectives)', examples: '좋다→좋다고 해요 / 크다→크다고 해요 / 바쁘다→바쁘다고 해요' },
      { type: 'rule', text: '名词 + -이라고 하다（有收音） / -라고 하다（无收音）', textEn: 'Noun + -이라고 하다 (with batchim) / -라고 하다 (no batchim)', examples: '학생이라고 해요 / 의사라고 해요' },
      { type: 'rule', text: '过去时统一用 -았/었다고 하다', textEn: 'Past tense uniformly uses -았/었다고 하다', examples: '먹었다고 해요 / 갔다고 해요 / 좋았다고 해요' },
      { type: 'usage', text: '口语缩略：-는다고 해요 → -는대요，-다고 해요 → -대요', textEn: 'Colloquial contraction: -는다고 해요 → -는대요, -다고 해요 → -대요', examples: '온대요（他说会来）/ 바쁘대요（他说很忙）/ 학생이래요（他说是学生）', examplesEn: '온대요 (he said he\'ll come) / 바쁘대요 (he said he\'s busy) / 학생이래요 (he said he\'s a student)' },
      { type: 'note', text: '转述主语（说话的人）通常是第三人称，原话中的我/你需要替换', textEn: 'The subject of the reported speech is usually third person; replace \'I/you\' from the original quote.', examples: '원래 말: "나는 바빠요" → 전달: 친구가 자기는 바쁘다고 했어요' },
      { type: 'compare', text: '-고 하다 vs -고 했다：前者表示最近说过，后者表示较早之前说过', textEn: '-고 하다 vs -고 했다: the former means said recently, the latter means said earlier.', examples: '지금 뭐라고 해요?（他现在说什么？）vs 어제 뭐라고 했어요?（昨天说了什么？）', examplesEn: '지금 뭐라고 해요? (What is he saying now?) vs 어제 뭐라고 했어요? (What did he say yesterday?)' },
      { type: 'note', text: '中文里"他说"后面直接跟原话、一个字都不用改；韩语必须先把原话的敬语终结语尾（-요/-습니다）去掉、换成基本阶（한다体）再接 -고。这个"先脱敬语再变形"的步骤中文没有，是本课最大的坎。', textEn: 'In Chinese, \'he said\' is followed directly by the quote without any changes; in Korean, you must first remove the polite ending (-요/-습니다) from the quote, change it to the plain form (한다체), then attach -고. This \'strip politeness then transform\' step doesn\'t exist in Chinese, making it the biggest hurdle in this lesson.', examples: '原话 내일 와요 → 转述 내일 온다고 했어요（와요 → 온다）', examplesEn: 'Original: 내일 와요 → Reported: 내일 온다고 했어요 (와요 → 온다)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '밥이', role: 'subject' },
          { text: '맛있다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '妈妈说饭很好吃。', zhEn: 'Mom said the food is delicious.',
        swapWords: ['맛있다고 했어요', '맛없다고 했어요', '짜다고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '오늘', role: 'time' },
          { text: '바쁘다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友说今天很忙。', zhEn: 'My friend said they\'re busy today.',
        swapWords: ['바쁘다고 했어요', '피곤하다고 했어요', '시간이 없다고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '선생님이라고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '那个人说自己是老师。', zhEn: 'That person said they are a teacher.',
        swapWords: ['선생님이라고 했어요', '의사라고 했어요', '학생이라고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '뉴스에서', role: 'place' },
          { text: '내일 비가 온다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '新闻说明天会下雨。', zhEn: 'The news said it will rain tomorrow.',
        swapWords: ['내일 비가 온다고 했어요', '내일 눈이 온다고 했어요', '내일 춥다고 했어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📱', context: '转达消息', contextEn: 'Relaying a message', ko: '친구가 파티에 못 온다고 했어요.', zh: '朋友说不能来派对了。', zhEn: 'My friend said they can\'t come to the party.' },
      { icon: '📺', context: '转述新闻', contextEn: 'Reporting news', ko: '뉴스에서 내일 눈이 온다고 했어요.', zh: '新闻说明天会下雪。', zhEn: 'The news said it will snow tomorrow.' },
      { icon: '🎵', context: 'KPOP 歌词引用', contextEn: 'KPOP lyric quote', ko: '그 가수가 이 노래는 팬들을 위한 거라고 했어요.', zh: '那位歌手说这首歌是为粉丝写的。', zhEn: 'That singer said this song was written for the fans.' },
      { icon: '👨‍👩‍👧', context: '转述家人的话', contextEn: 'Relaying what family said', ko: '아버지가 일찍 들어오라고 하셨어요.', zh: '爸爸说要早点回来。', zhEn: 'Dad said he\'d come back early.' },
      { icon: '🏥', context: '转述医生的话', contextEn: 'Relaying what the doctor said', ko: '의사가 일주일 동안 쉬어야 한다고 했어요.', zh: '医生说要休息一周。', zhEn: 'The doctor said to rest for a week.' },
      { icon: '💬', context: '口语缩略', contextEn: 'Spoken abbreviation', ko: 'A: 민준 씨는요? B: 오늘 늦는대요.', zh: 'A：敏俊呢？B：他说今天会晚。', zhEn: 'A: Where\'s Min-jun? B: He said he\'d be late today.' },
    ],
    mistakes: [
      { wrong: '친구가 바쁘는다고 했어요（形容词加 -는다고）', wrongEn: 'Friend said he\'s busy (adjective + -는다고)', correct: '친구가 바쁘다고 했어요', note: '形容词用 -다고，不加 -는다고。只有动词才区分是否有收音。', noteEn: 'Adjectives use -다고, not -는다고. Only verbs distinguish based on final consonant.' },
      { wrong: '그 사람이 의사이라고 했어요（无收音名词加 이라고）', wrongEn: 'He said that person is a doctor (noun without final consonant + 이라고)', correct: '그 사람이 의사라고 했어요', note: '名词无收音时用 -라고，有收音才用 -이라고。의사 无收音 → 의사라고.', noteEn: 'Nouns without a final consonant use -라고; with one, use -이라고. 의사 has no final consonant → 의사라고.' },
      { wrong: '어제 먹었는다고 했어요（过去时加 는다고）', wrongEn: 'Said he ate yesterday (past tense + 는다고)', correct: '어제 먹었다고 했어요', note: '过去时 -았/었- 后统一用 -다고，不分动词形容词。', noteEn: 'After past tense -았/었-, always use -다고, regardless of verb or adjective.' },
      { wrong: '오늘 가는다고 해요（无收音动词加 -는다고）', wrongEn: 'Says he\'s going today (verb without final consonant + -는다고)', correct: '오늘 간다고 해요', note: '가다 는 无收音词干 → -ㄴ다고：가다→간다고。-는다고 只用于有收音词干（먹다→먹는다고）。', noteEn: '가다 has no final consonant → -ㄴ다고: 가다→간다고. -는다고 is only for stems with a final consonant (먹다→먹는다고).' },
      { wrong: '친구가 내일 와요고 했어요（把敬语原话原封不动加 -고）', wrongEn: 'Friend said he\'d come tomorrow (adding -고 directly to polite speech)', correct: '친구가 내일 온다고 했어요', note: '不能把 -요 结尾的原话直接接 -고。要先脱掉敬语、变回基本阶 온다，再接 -고 하다。这是照搬中文"他说+原话"造成的典型错误。', noteEn: 'You can\'t attach -고 directly to speech ending in -요. First drop the polite form, revert to plain form 온다, then add -고 하다. This is a typical error from directly translating Chinese \'he said + quote\'.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第1课</div>
    <div class="ov-hero-title">陈述句间接引语</div>
    <div class="ov-hero-sub">转述他人话语的核心语法</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">四种形式</div></div>
    <div class="ov-block">
      <div class="badge">动词（有收音）</div>
      <div class="ko">-는다고 하다</div>
      <div class="zh">먹다 → 먹는다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">动词（无收音/ㄹ）</div>
      <div class="ko">-ㄴ다고 하다</div>
      <div class="zh">가다 → 간다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">形容词</div>
      <div class="ko">-다고 하다</div>
      <div class="zh">좋다 → 좋다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词谓词</div>
      <div class="ko">-(이)라고 하다</div>
      <div class="zh">학생이다 → 학생이라고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">过去时</div>
      <div class="ko">-았/었다고 하다</div>
      <div class="zh">먹었다 → 먹었다고 해요</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">转述别人说的话——"他说……"</div>
<div class="card-body">间接引语是把别人的话或自己之前说的话转述出来的语法结构。陈述句间接引语根据谓词类型分为四种形式，统一用 -고 하다 收尾。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">친구가 내일 온다고 했어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">朋友说明天会来。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">선생님이 이 문제가 어렵다고 하셨어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">老师说这道题很难。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">时态由被引语句本身决定：现在/过去/将来 均可出现。
口语缩略：-는다고 해요 → -는대요，-다고 해요 → -대요，-(이)라고 해요 → -(이)래요。</div>
`,
    compareLabel: '动词 vs 形容词 vs 名词', compareLabelEn: 'Verb vs adjective vs noun',
    compareHtml: `<div class="card-title">按谓词类型选接续</div>
<div class="card-body">陈述句间接引语统一用 <b>-고 하다</b> 收尾，但前面的接续随<b>谓词类型</b>而变。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">动词</div>
    <div class="cmp-row"><span class="badge">有收音</span><span class="zh">-는다고：먹다 → 먹는다고</span></div>
    <div class="cmp-row"><span class="badge">无收音/ㄹ</span><span class="zh">-ㄴ다고：가다 → 간다고</span></div>
    <div class="cmp-row"><span class="ko">친구가 내일 온다고 했어요</span></div>
    <div class="cmp-row"><span class="zh">朋友说明天会来。</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">形容词 / 名词 / 过去</div>
    <div class="cmp-row"><span class="badge">形容词</span><span class="zh">-다고：어렵다 → 어렵다고</span></div>
    <div class="cmp-row"><span class="badge">名词</span><span class="zh">-(이)라고：학생 → 학생이라고</span></div>
    <div class="cmp-row"><span class="badge">过去</span><span class="zh">统一 -았/었다고：먹었다고</span></div>
    <div class="cmp-row"><span class="ko">그 사람이 학생이라고 했어요</span></div>
  </div>
</div>
<div class="reminder-box">只有<b>动词</b>才分有无收音；<b>形容词</b>一律 -다고，<b>过去时</b>一律 -았/었다고。口语缩略：-대요 / -ㄴ대요 / -(이)래요。</div>`,
    quickTable: {
      title: '陈述句间接引语形式总览', titleEn: 'Overview of Declarative Indirect Speech Forms',
      headers: ['谓词类型', '接续', '例句', '缩略形'],
      rows: [
        [{ ko: '동사（有收音）', zh: '' }, { ko: '-는다고 하다', zh: '' }, { ko: '먹는다고 해요', zh: '说在吃', zhEn: 'Says (he) is eating' }, { ko: '-는대요', zh: '' }],
        [{ ko: '동사（无收音/ㄹ）', zh: '' }, { ko: '-ㄴ다고 하다', zh: '' }, { ko: '간다고 해요', zh: '说要去', zhEn: 'Says (he) will go' }, { ko: '-ㄴ대요', zh: '' }],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '-다고 하다', zh: '' }, { ko: '좋다고 해요', zh: '说很好', zhEn: 'Says (it\'s) good' }, { ko: '-대요', zh: '' }],
        [{ ko: '명사+이다', zh: '名词谓词', zhEn: 'Noun predicate' }, { ko: '-(이)라고 하다', zh: '' }, { ko: '학생이라고 해요', zh: '说是学生', zhEn: 'Says (he) is a student' }, { ko: '-(이)래요', zh: '' }],
        [{ ko: '과거시제', zh: '过去时', zhEn: 'Past tense' }, { ko: '-았/었다고 하다', zh: '' }, { ko: '먹었다고 해요', zh: '说吃了', zhEn: 'Says (he) ate' }, { ko: '-았/었대요', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '陈述句间接引语', titleEn: 'Indirect Speech for Declarative Sentences',
      body: '测试对四种引语形式的掌握', bodyEn: 'Test mastery of the four types of quotation forms',
      questions: [
        {
          prompt: '朋友说很累。→ 친구가 ___', promptEn: 'A friend said (they\'re) tired. → 친구가 ___',
          options: ['피곤한다고 했어요', '피곤이라고 했어요', '피곤하다고 했어요', '피곤는다고 했어요'],
          answer: 2 as 0|1|2|3,
          explanation: '形容词 → -다고 하다', explanationEn: 'Adjective → -다고 하다',
        },
        {
          prompt: '他说是医生。→ 의사___ 했어요', promptEn: 'He said (he\'s) a doctor. → 의사___ 했어요',
          options: ['라고', '는다고', '이라고', '다고'],
          answer: 0 as 0|1|2|3,
          explanation: '의사 无收音 → -라고', explanationEn: '의사 (no final consonant) → -라고',
        },
        {
          prompt: '妈妈说吃了。→ 엄마가 먹___고 했어요', promptEn: 'Mom said (she) ate. → 엄마가 먹___고 했어요',
          options: ['다', 'ㄴ다', '는다', '었다'],
          answer: 3 as 0|1|2|3,
          explanation: '过去时 → -았/었다고', explanationEn: 'Past tense → -았/었다고',
        },
        {
          prompt: '口语缩略：간다고 해요 → ___', promptEn: 'Colloquial contraction: 간다고 해요 → ___',
          options: ['간다요', '간대요', '가다요', '가래요'],
          answer: 1 as 0|1|2|3,
          explanation: '-ㄴ다고 해요 → -ㄴ대요',
        },
      ],
    },
    linkedGrammarIds: ['g78'],
  },

  {
    id: 'card-p11-l02',
    partNumber: 11,
    lessonNumber: 2,
    title: '疑问句间接引语', titleEn: 'Indirect Speech for Interrogative Sentences',
    whatItDoes: '转述别人问的问题——"他问……"', whatItDoesEn: 'Reporting someone\'s question — "He asked..."',
    whatItDoesBody: '疑问句间接引语把别人提问的内容转述出来，根据谓词类型有不同接续形式，统一用 -냐고 하다 收尾。\n口语中常用 -는지/은지/인지 代替 -냐고，与 알다/모르다 搭配更自然。\n含疑问词（뭐/어디/왜/언제/어떻게）时，疑问词保留在引语中。', whatItDoesBodyEn: 'Interrogative indirect speech reports the content of someone\'s question, with different endings based on predicate type, all ending with -냐고 하다.\\nIn spoken Korean, -는지/은지/인지 is often used instead of -냐고, pairing more naturally with 알다/모르다.\\nWhen the question contains a question word (뭐/어디/왜/언제/어떻게), it stays in the quoted clause.',
    structureNote: '动词：词干 + -느냐고/-냐고 하다\n形容词：词干 + -(으)냐고 하다\n名词谓词：名词 + -(이)냐고 하다\n过去时：-았/었냐고 하다', structureNoteEn: 'Verbs: stem + -느냐고/-냐고 하다\\nAdjectives: stem + -(으)냐고 하다\\nNoun predicates: noun + -(이)냐고 하다\\nPast tense: -았/었냐고 하다',
    rulesNote: '口语 -냐고 比 -느냐고 更常用。\n与 알다/모르다 搭配时用 -는지/-은지/-인지，不用 -냐고。', rulesNoteEn: 'In speech, -냐고 is more common than -느냐고.\\nWith 알다/모르다, use -는지/-은지/-인지 instead of -냐고.',
    structures: [
      {
        ko: '친구가 어디 사냐고 물었어요',
        zh: '朋友问住在哪里。', zhEn: 'A friend asked where (I) live.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '어디 사냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 숙제를 했냐고 물어보셨어요',
        zh: '老师问作业做了吗。', zhEn: 'The teacher asked if (I) did the homework.',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '숙제를', role: 'object' },
          { text: '했냐고 물어보셨어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 배고프냐고 하셨어요',
        zh: '妈妈问饿不饿。', zhEn: 'Mom asked if (I\'m) hungry.',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '배고프냐고 하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 학생이냐고 물었어요',
        zh: '那个人问是不是学生。', zhEn: 'That person asked if (I\'m) a student.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '학생이냐고 물었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + -느냐고/-냐고 하다（-냐고 更口语）', textEn: 'Verb + -느냐고/-냐고 하다 (-냐고 is more colloquial)', examples: '가다→가냐고 / 먹다→먹냐고' },
      { type: 'rule', text: '形容词 + -(으)냐고 하다', textEn: 'Adjective + -(으)냐고 하다', examples: '좋다→좋으냐고 / 바쁘다→바쁘냐고 / 크다→크냐고' },
      { type: 'rule', text: '名词+이다：-(이)냐고 하다（有收音：이냐고，无收音：냐고）', textEn: 'Noun + 이다: -(이)냐고 하다 (with final consonant: 이냐고, without: 냐고)', examples: '학생이냐고 / 의사냐고' },
      { type: 'rule', text: '过去时：-았/었냐고 하다', textEn: 'Past tense: -았/었냐고 하다', examples: '갔냐고 / 먹었냐고 / 좋았냐고' },
      { type: 'usage', text: '-는지/-은지/-인지 与 알다/모르다 搭配时是委婉的间接疑问', textEn: '-는지/-은지/-인지 with 알다/모르다 forms a polite indirect question', examples: '어디 사는지 알아요? / 바쁜지 몰라요' },
      { type: 'usage', text: '含疑问词时疑问词保留在引语中', textEn: 'When there\'s a question word, it stays in the quotation', examples: '왜 늦었냐고 물었어요 / 언제 오냐고 했어요 / 어떻게 했냐고 물었어요' },
      { type: 'note', text: '묻다/물어보다 是最常用的主动词，하다 也可以', textEn: '묻다/물어보다 are the most common main verbs; 하다 also works', examples: '뭐냐고 물었어요 / 뭐냐고 하던데요' },
      { type: 'compare', text: '-냐고 물었다 vs -는지 알다：前者转述提问，后者表示间接疑问', textEn: '-냐고 물었다 vs -는지 알다: the former reports a question, the latter expresses an indirect question', examples: '어디 사냐고 물었어요（他问住哪）vs 어디 사는지 알아요?（知道住哪吗？）', examplesEn: '어디 사냐고 물었어요 (He asked where I live) vs 어디 사는지 알아요? (Do you know where I live?)' },
      { type: 'compare', text: '⚠️易与上一课混：陈述句动词要加 -ㄴ다/-는다（온다고），疑问句动词却直接 词干+냐고，不加 -ㄴ다/-는다。刚学完陈述句的人最容易多加。', textEn: '⚠️ Easy to confuse with the previous lesson: declarative verbs take -ㄴ다/-는다 (온다고), but interrogative verbs just take the stem + 냐고, without -ㄴ다/-는다. People who just learned declaratives tend to add it by mistake.', examples: '陈述 온다고 했어요（他说会来）↔ 疑问 오냐고 물었어요（他问来不来）；绝不是 온다냐고', examplesEn: 'Declarative 온다고 했어요 (He said he\'d come) ↔ Interrogative 오냐고 물었어요 (He asked if I\'d come); never 온다냐고' },
      { type: 'note', text: '中文是非问用"来不来 / 是不是"这种 V-不-V 结构，韩语转述时只用一个 -냐고 收尾，千万别把"不 / 안"也翻进去。', textEn: 'Chinese yes/no questions use V-不-V structures like "来不来 / 是不是", but in Korean reported speech you just end with one -냐고 — don\'t translate the "不 / 안" in.', examples: '"问他来不来" = 오냐고 물었어요（不是 오냐 안 오냐）；"问是不是学生" = 학생이냐고 물었어요', examplesEn: '"Ask if he\'s coming" = 오냐고 물었어요 (not 오냐 안 오냐); "ask if (he\'s) a student" = 학생이냐고 물었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '왜 울었냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '朋友问为什么哭了。', zhEn: 'A friend asked why I was crying.',
        swapWords: ['왜 울었냐고 물었어요', '언제 왔냐고 물었어요', '뭐 먹었냐고 물었어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '밥은 먹었냐고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈问饭吃了没。', zhEn: 'Mom asked if I had eaten.',
        swapWords: ['밥은 먹었냐고 하셨어요', '숙제는 했냐고 하셨어요', '잘 잤냐고 하셨어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '한국 사람이냐고', role: 'plain' },
          { text: '물어봤어요', role: 'verb' },
        ],
        zh: '那个人问是不是韩国人。', zhEn: 'That person asked if I was Korean.',
        swapWords: ['한국 사람이냐고 물어봤어요', '학생이냐고 물어봐요', '여기 처음이냐고 물어봤어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '언제', role: 'time' },
          { text: '오냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '问什么时候来。', zhEn: 'Asked when I would come.',
        swapWords: ['언제 오냐고 물었어요', '왜 늦었냐고 물었어요', '어떻게 갔냐고 물었어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '💬', context: '转述提问', contextEn: 'Reporting questions', ko: '선생님이 숙제를 다 했냐고 물어보셨어요.', zh: '老师问作业都做完了吗。', zhEn: 'The teacher asked if I had finished all the homework.' },
      { icon: '📱', context: '日常对话', contextEn: 'Everyday conversation', ko: 'A: 뭐라고 했어요? B: 몇 시에 만나냐고 했어요.', zh: 'A：说什么了？B：问几点见面。', zhEn: 'A: What did they say? B: They asked what time to meet.' },
      { icon: '🎵', context: 'KPOP', ko: '그 노래에서 "나를 좋아하냐고" 묻는 가사가 너무 좋아요.', zh: '那首歌里"喜不喜欢我"的歌词太好了。', zhEn: 'The lyrics "Do you like me?" in that song are so good.' },
      { icon: '🏥', context: '诊室场景', contextEn: 'Clinic scene', ko: '의사가 어디가 아프냐고 물어봤어요.', zh: '医生问哪里不舒服。', zhEn: 'The doctor asked where it hurt.' },
      { icon: '✈️', context: '旅行场景', contextEn: 'Travel scene', ko: '호텔 직원이 몇 박을 할 거냐고 물었어요.', zh: '酒店员工问要住几晚。', zhEn: 'The hotel staff asked how many nights I\'d be staying.' },
      { icon: '🏫', context: '间接疑问', contextEn: 'Indirect questions', ko: '그 사람이 어디 사는지 혹시 알아요?', zh: '你知道那个人住哪里吗？', zhEn: 'Do you know where that person lives?' },
    ],
    mistakes: [
      { wrong: '친구가 바쁘는냐고 물었어요（形容词加 -는냐고）', wrongEn: 'A friend asked if I was busy (adjective + -는냐고)', correct: '친구가 바쁘냐고 물었어요', note: '형용사는 -(으)냐고，不加 -는。바쁘다 → 바쁘냐고。', noteEn: 'For adjectives, use -(으)냐고, not -는. 바쁘다 → 바쁘냐고.' },
      { wrong: '의사이냐고 물었어요（无收音名词加 이냐고）', wrongEn: 'Asked if he was a doctor (noun without final consonant + 이냐고)', correct: '의사냐고 물었어요', note: '无收音 名词 + 냐고，有收音 名词 + 이냐고。의사 无收音 → 의사냐고。', noteEn: 'Nouns without a final consonant take 냐고; with a final consonant, 이냐고. 의사 has no final consonant → 의사냐고.' },
      { wrong: '어디 가느냐고 알아요?（-느냐고 与 알다 搭配）', wrongEn: 'Do you know where he\'s going? (-느냐고 with 알다)', correct: '어디 가는지 알아요?', note: '与 알다/모르다 搭配用 -는지，不用 -냐고。', noteEn: 'With 알다/모르다, use -는지, not -냐고.' },
      { wrong: '먹었는냐고 물었어요（过去时加 는냐고）', wrongEn: 'Asked if I had eaten (past tense + 는냐고)', correct: '먹었냐고 물었어요', note: '过去时 -았/었- 后直接加 -냐고，不加 -는。', noteEn: 'After past tense -았/었-, add -냐고 directly, not -는.' },
      { wrong: '친구가 온다냐고 물었어요（把陈述句的 -ㄴ다 也带进疑问句）', wrongEn: 'A friend asked if I was coming (bringing the declarative -ㄴ다 into the question)', correct: '친구가 오냐고 물었어요', note: '疑问句是 词干+냐고，不要 -ㄴ다/-는다。온다고 是"他说会来"（陈述），오냐고 才是"他问来不来"（疑问）。刚学完上一课的人常犯。', noteEn: 'For questions, it\'s stem + 냐고, not -ㄴ다/-는다. 온다고 means "he said he\'d come" (statement), while 오냐고 means "he asked if I was coming" (question). This is a common mistake for those who just finished the previous lesson.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第2课</div>
    <div class="ov-hero-title">疑问句间接引语</div>
    <div class="ov-hero-sub">转述他人提问的表达方式</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">四种形式</div></div>
    <div class="ov-block">
      <div class="badge">动词</div>
      <div class="ko">-느냐고/-냐고 하다</div>
      <div class="zh">가냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">形容词</div>
      <div class="ko">-(으)냐고 하다</div>
      <div class="zh">바쁘냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词+이다</div>
      <div class="ko">-(이)냐고 하다</div>
      <div class="zh">학생이냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">委婉间接疑问</div>
      <div class="ko">-는지/-은지 알다/모르다</div>
      <div class="zh">어디 사는지 알아요?</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">转述别人问的问题——"他问……"</div>
<div class="card-body">疑问句间接引语把别人提问的内容转述出来，根据谓词类型有不同接续形式，统一用 -냐고 하다 收尾。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">친구가 어디 사냐고 물었어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">朋友问住在哪里。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">선생님이 숙제를 했냐고 물어보셨어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">老师问作业做了吗。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">口语 -냐고 比 -느냐고 更常用。
与 알다/모르다 搭配时用 -는지/-은지/-인지，不用 -냐고。</div>
`,
    compareLabel: '-냐고 vs -는지',
    compareHtml: `<div class="card-title">-냐고 vs -는지</div>
<div class="card-body">两者都涉及"疑问"，但一个是<b>转述别人的提问</b>，一个是<b>委婉的间接疑问</b>。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-냐고 (묻다/하다)</div>
    <div class="cmp-row"><span class="badge">功能</span><span class="zh">转述别人问的问题</span></div>
    <div class="cmp-row"><span class="ko">어디 사냐고 물었어요</span></div>
    <div class="cmp-row"><span class="zh">（他）问住在哪里。</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-는지 (알다/모르다)</div>
    <div class="cmp-row"><span class="badge">功能</span><span class="zh">间接疑问，常配 알다/모르다</span></div>
    <div class="cmp-row"><span class="ko">어디 사는지 알아요?</span></div>
    <div class="cmp-row"><span class="zh">你知道（他）住哪里吗？</span></div>
  </div>
</div>
<div class="reminder-box">配 <b>묻다/물어보다</b>（转述提问）用 <b>-냐고</b>；配 <b>알다/모르다</b>（间接疑问）用 <b>-는지/-은지/-인지</b>，不能用 -냐고。</div>`,
    quickTable: {
      title: '疑问句间接引语形式总览', titleEn: 'Overview of Interrogative Indirect Speech Forms',
      headers: ['谓词类型', '接续', '例句', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '-느냐고/-냐고', zh: '' }, { ko: '가냐고 물었어요', zh: '' }, { ko: '问去不去', zh: '' }],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '-(으)냐고', zh: '' }, { ko: '바쁘냐고 물었어요', zh: '' }, { ko: '问忙不忙', zh: '' }],
        [{ ko: '명사+이다', zh: '名词谓词', zhEn: 'Noun predicate' }, { ko: '-(이)냐고', zh: '' }, { ko: '학생이냐고 물었어요', zh: '' }, { ko: '问是不是学生', zh: '' }],
        [{ ko: '과거시제', zh: '过去时', zhEn: 'Past tense' }, { ko: '-았/었냐고', zh: '' }, { ko: '먹었냐고 물었어요', zh: '' }, { ko: '问吃了没', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '疑问句间接引语', titleEn: 'Indirect Speech for Interrogative Sentences',
      body: '测试对疑问句引语形式的掌握', bodyEn: 'Test mastery of indirect question forms',
      questions: [
        {
          prompt: '朋友问累不累。→ 친구가 피곤___ 물었어요', promptEn: 'A friend asked if I was tired. → 친구가 피곤___ 물었어요',
          options: ['하는냐고', '하냐고요', '이냐고', '하냐고'],
          answer: 3 as 0|1|2|3,
          explanation: '形容词 피곤하다 → 피곤하냐고', explanationEn: 'Adjective 피곤하다 → 피곤하냐고',
        },
        {
          prompt: '老师问作业做了吗。→ 선생님이 숙제를 했___ 물어보셨어요', promptEn: 'The teacher asked if the homework was done. → 선생님이 숙제를 했___ 물어보셨어요',
          options: ['는냐고', '냐고', '다고', '라고'],
          answer: 1 as 0|1|2|3,
          explanation: '过去时 했다 → 했냐고', explanationEn: 'Past tense 했다 → 했냐고',
        },
        {
          prompt: '问是不是医生。→ 의사___ 물었어요', promptEn: 'Asked if (he/she) is a doctor. → 의사___ 물었어요',
          options: ['냐고', '라고', '느냐고', '이냐고'],
          answer: 0 as 0|1|2|3,
          explanation: '의사 无收音 → 의사냐고', explanationEn: '의사 no final consonant → 의사냐고',
        },
        {
          prompt: '知道他住哪里吗？→ 그 사람이 어디 사___ 알아요?', promptEn: 'Do you know where he lives? → 그 사람이 어디 사___ 알아요?',
          options: ['느냐고', '는다고', '는지', '냐고'],
          answer: 2 as 0|1|2|3,
          explanation: '与 알다 搭配用 -는지', explanationEn: 'Use -는지 with 알다',
        },
      ],
    },
    linkedGrammarIds: ['g78', 'g80'],
  },

  {
    id: 'card-p11-l03',
    partNumber: 11,
    lessonNumber: 3,
    title: '命令句/共动句间接引语', titleEn: 'Indirect Speech for Imperative/Propositive Sentences',
    whatItDoes: '转述"叫人做某事"或"叫人一起做某事"', whatItDoesEn: 'Reporting "telling someone to do something" or "suggesting doing something together"',
    whatItDoesBody: '命令句间接引语用 -(으)라고 하다 转述别人的命令或请求。\n共动句间接引语用 -자고 하다 转述别人的邀请或提议一起做某事。\n两者形式固定，不区分动词词干是否有收音。', whatItDoesBodyEn: 'Imperative indirect speech uses -(으)라고 하다 to report someone\'s command or request.\\nPropositive indirect speech uses -자고 하다 to report someone\'s invitation or suggestion to do something together.\\nBoth forms are fixed and do not distinguish whether the verb stem ends in a consonant.',
    structureNote: '命令句：动词词干 + -(으)라고 하다\n共动句：动词词干 + -자고 하다\n命令句否定：-지 말라고 하다', structureNoteEn: 'Imperative: verb stem + -(으)라고 하다\\nPropositive: verb stem + -자고 하다\\nNegative imperative: -지 말라고 하다',
    rulesNote: '-(으)라고 的으 在有收音词干后加，无收音词干直接 -라고。\n-자고 형태는 固定，不变。\n하다 자체도 해라체→하라고，하자체→하자고。', rulesNoteEn: 'For -(으)라고, add 으 after stems ending in a consonant; stems without a consonant take -라고 directly.\\n-자고 is fixed and does not change.\\n하다 itself: 해라체 → 하라고, 하자체 → 하자고.',
    structures: [
      {
        ko: '선생님이 조용히 하라고 하셨어요',
        zh: '老师叫（大家）安静。', zhEn: 'The teacher told everyone to be quiet.',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '조용히 하라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 빨리 일어나라고 하셨어요',
        zh: '妈妈叫快点起床。', zhEn: 'Mom told (me) to get up quickly.',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리 일어나라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 같이 밥을 먹자고 했어요',
        zh: '朋友提议一起吃饭。', zhEn: 'A friend suggested eating together.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '같이 밥을', role: 'object' },
          { text: '먹자고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '의사가 술을 마시지 말라고 했어요',
        zh: '医生叫不要喝酒。', zhEn: 'The doctor told (me) not to drink.',
        tokens: [
          { text: '의사가', role: 'subject' },
          { text: '술을', role: 'object' },
          { text: '마시지 말라고 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '命令句：动词 词干 + -(으)라고 하다（有收音+으라고，无收音+라고）', textEn: 'Imperative: verb stem + -(으)라고 하다 (add 으라고 with final consonant, 라고 without)', examples: '먹다→먹으라고 / 가다→가라고 / 앉다→앉으라고 / 만들다→만들라고' },
      { type: 'rule', text: '命令句否定：动词 词干 + -지 말라고 하다', textEn: 'Negative imperative: verb stem + -지 말라고 하다', examples: '가지 말라고 했어요（叫不要去）/ 먹지 말라고 했어요（叫不要吃）', examplesEn: '가지 말라고 했어요 (told not to go) / 먹지 말라고 했어요 (told not to eat)' },
      { type: 'rule', text: '共动句：动词 词干 + -자고 하다（形式固定，不区分收音）', textEn: 'Suggestive: verb stem + -자고 하다 (fixed form, no distinction for final consonant)', examples: '가다→가자고 / 먹다→먹자고 / 공부하다→공부하자고' },
      { type: 'usage', text: '命令句引语的主动词：하다/시키다/부탁하다/요청하다 等', textEn: 'Main verbs for imperative quotes: 하다/시키다/부탁하다/요청하다 etc.', examples: '가라고 했어요 / 앉으라고 시켰어요 / 도와달라고 부탁했어요' },
      { type: 'usage', text: '共动句引语的主动词：하다/제안하다/권하다 等', textEn: 'Main verbs for suggestive quotes: 하다/제안하다/권하다 etc.', examples: '같이 가자고 했어요 / 같이 먹자고 제안했어요' },
      { type: 'note', text: '-아/어 주라고 하다 = 叫（帮忙）做某事（带请求语气）', textEn: '-아/어 주라고 하다 = to ask someone to do something (with a requesting tone)', examples: '도와주라고 했어요（叫帮忙）/ 가르쳐 주라고 했어요（叫教一下）', examplesEn: '도와주라고 했어요 (asked for help) / 가르쳐 주라고 했어요 (asked to teach)' },
      { type: 'compare', text: '-(으)라고 vs -(으)세요：前者是转述，后者是直接命令/请求', textEn: '-(으)라고 vs -(으)세요: the former is reported speech, the latter is a direct command/request', examples: '직접: 앉으세요（请坐）→ 간접: 앉으라고 하셨어요（叫坐下）', examplesEn: 'Direct: 앉으세요 (Please sit) → Indirect: 앉으라고 하셨어요 (Told to sit)' },
      { type: 'note', text: '⚠️本课最坑的例外：转述"叫给东西/帮忙"时，주다 分两个词。给的是第三方 → 주라고；给的是说话人自己 → 달라고。中文都说"给"，所以这里必错。', textEn: '⚠️ The trickiest exception in this lesson: when reporting "told to give something/help," 주다 splits into two words. Giving to a third party → 주라고; giving to the speaker → 달라고. Chinese uses "give" for both, so this is a guaranteed mistake.', examples: '동생한테 책을 주라고 했어요（叫把书给弟弟）↔ 나한테 책을 달라고 했어요（叫把书给我）', examplesEn: '동생한테 책을 주라고 했어요 (Told to give the book to younger sibling) ↔ 나한테 책을 달라고 했어요 (Told to give the book to me)' },
      { type: 'note', text: '和第1课一样要先脱原话敬语再变形，但命令/共动的原话结尾不同：原命令 -(으)세요/-아라 → -(으)라고；原提议 같이 -아요/-(으)ㅂ시다 → -자고。', textEn: 'As in Lesson 1, you must first strip the original speech of honorifics before transforming, but the endings for commands/suggestions differ: original command -(으)세요/-아라 → -(으)라고; original suggestion 같이 -아요/-(으)ㅂ시다 → -자고.', examples: '앉으세요 → 앉으라고 하셨어요；같이 가요 → 같이 가자고 했어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '책을', role: 'object' },
          { text: '읽으라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '老师叫读书。', zhEn: 'The teacher told us to read.',
        swapWords: ['읽으라고 하셨어요', '읽지 말라고 하셨어요', '같이 읽자고 하셨어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '운동하자고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友提议一起运动。', zhEn: 'A friend suggested exercising together.',
        swapWords: ['운동하자고 했어요', '공부하자고 했어요', '여행 가자고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '늦게 자지', role: 'plain' },
          { text: '말라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈叫不要晚睡。', zhEn: 'Mom told me not to stay up late.',
        swapWords: ['말라고 하셨어요', '말라고 했어요', '말라고 하시는데요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '조용히 하라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '老师叫安静。', zhEn: 'The teacher told us to be quiet.',
        swapWords: ['조용히 하라고 하셨어요', '앉으라고 하셨어요', '나가지 말라고 하셨어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🏫', context: '课堂场景', contextEn: 'Classroom scene', ko: '선생님이 교과서 10페이지를 펴라고 하셨어요.', zh: '老师叫打开教科书第10页。', zhEn: 'The teacher told us to open the textbook to page 10.' },
      { icon: '👨‍👩‍👧', context: '家庭场景', contextEn: 'Home scene', ko: '엄마가 방 청소하라고 하셨어요.', zh: '妈妈叫打扫房间。', zhEn: 'Mom told me to clean the room.' },
      { icon: '🎵', context: 'KPOP 演唱会', contextEn: 'KPOP concert', ko: '가수가 다 같이 노래하자고 했어요.', zh: '歌手提议大家一起唱歌。', zhEn: 'The singer suggested everyone sing together.' },
      { icon: '🏥', context: '医疗建议', contextEn: 'Medical advice', ko: '의사가 운동을 꾸준히 하라고 했어요.', zh: '医生叫坚持运动。', zhEn: 'The doctor told me to keep exercising.' },
      { icon: '💬', context: '转述请求', contextEn: 'Reporting a request', ko: '그 사람이 문을 닫아 달라고 했어요.', zh: '那个人叫把门关上。', zhEn: 'That person told me to close the door.' },
      { icon: '✈️', context: '旅行场景', contextEn: 'Travel scene', ko: '가이드가 여기서 기다리라고 했어요.', zh: '导游叫在这里等。', zhEn: 'The guide told us to wait here.' },
    ],
    mistakes: [
      { wrong: '선생님이 앉으자고 했어요（命令句用 -자고）', wrongEn: '선생님이 앉으자고 했어요 (Command sentences use -자고)', correct: '선생님이 앉으라고 했어요', note: '-자고 是共动句（一起做），-(으)라고 才是命令句（叫别人做）。', noteEn: '-자고 is for suggestion sentences (doing together), while -(으)라고 is for command sentences (telling someone to do).' },
      { wrong: '친구가 가자라고 했어요（-자라고 不存在）', wrongEn: '친구가 가자라고 했어요 (-자라고 doesn\'t exist)', correct: '친구가 가자고 했어요', note: '共动句引语固定用 -자고，不存在 -자라고 形式。', noteEn: 'Reported suggestion sentences always use -자고; the form -자라고 doesn\'t exist.' },
      { wrong: '가지 않으라고 했어요（否定命令用 않다）', wrongEn: '가지 않으라고 했어요 (Negative commands use 않다)', correct: '가지 말라고 했어요', note: '命令句否定固定用 -지 말라고，不用 -지 않으라고。', noteEn: 'Negative commands always use -지 말라고, not -지 않으라고.' },
      { wrong: '먹으라고 하라고 했어요（重复 하다）', wrongEn: 'Told someone to tell someone to eat (repeated 하다)', correct: '먹으라고 했어요', note: '引语动词 하다 只用一次，不重复。', noteEn: 'The quoting verb 하다 is used only once, not repeated.' },
      { wrong: '친구가 나한테 사진을 주라고 했어요（受益者是"我"却用 주라고）', wrongEn: 'A friend told me to give a photo (beneficiary is \'me\' but uses 주라고)', correct: '친구가 나한테 사진을 달라고 했어요', note: '受益者是说话人自己 → 用 달라고；受益者是第三方才用 주라고。中文都说"给我/给他"，韩语要分两个词。', noteEn: 'If the beneficiary is the speaker → use 달라고; only use 주라고 for a third party. Chinese says \'give me/him\' for both, but Korean has two separate words.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第3课</div>
    <div class="ov-hero-title">命令句/共动句间接引语</div>
    <div class="ov-hero-sub">转述命令与邀请的表达方式</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">两种形式</div></div>
    <div class="ov-block">
      <div class="badge">命令句</div>
      <div class="ko">动词 词干 + -(으)라고 하다</div>
      <div class="zh">가라고 했어요 / 먹으라고 했어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">命令否定</div>
      <div class="ko">动词 词干 + -지 말라고 하다</div>
      <div class="zh">가지 말라고 했어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">共动句</div>
      <div class="ko">动词 词干 + -자고 하다</div>
      <div class="zh">같이 가자고 했어요</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">转述"叫人做某事"或"叫人一起做某事"</div>
<div class="card-body">命令句间接引语用 -(으)라고 하다 转述别人的命令或请求。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">선생님이 조용히 하라고 하셨어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">老师叫（大家）安静。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">엄마가 빨리 일어나라고 하셨어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">妈妈叫快点起床。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-(으)라고 的으 在有收音词干后加，无收音词干直接 -라고。
-자고 형태는 固定，不变。
하다 자체도 해라체→하라고，하자체→하자고。</div>
`,
    compareLabel: '-(으)라고 vs -자고',
    compareHtml: `<div class="card-title">-(으)라고 vs -자고</div>
<div class="card-body">都是转述别人的话，区别在于是<b>叫你做</b>还是<b>邀你一起做</b>。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-(으)라고（命令）</div>
    <div class="cmp-row"><span class="badge">意义</span><span class="zh">转述命令/请求：叫（你）做</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">有收音+으라고 / 无收音+라고</span></div>
    <div class="cmp-row"><span class="badge">否定</span><span class="zh">-지 말라고（叫不要做）</span></div>
    <div class="cmp-row"><span class="ko">빨리 일어나라고 하셨어요</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-자고（共动）</div>
    <div class="cmp-row"><span class="badge">意义</span><span class="zh">转述提议：邀（一起）做</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">-자고（固定，不分收音）</span></div>
    <div class="cmp-row"><span class="badge">否定</span><span class="zh">-지 말자고（提议别做）</span></div>
    <div class="cmp-row"><span class="ko">같이 밥을 먹자고 했어요</span></div>
  </div>
</div>
<div class="reminder-box">易错：命令句别误用 -자고（앉으라고 ✗앉으자고）；共动句固定 -자고，没有 -자라고 这种形式。</div>`,
    quickTable: {
      title: '命令/共动间接引语 형식', titleEn: 'Imperative/Propositive Indirect Speech Forms',
      headers: ['类型', '形式', '例句', '意思'],
      rows: [
        [{ ko: '명령（有收音）', zh: '' }, { ko: '词干 + -으라고', zh: '' }, { ko: '먹으라고 했어요', zh: '' }, { ko: '叫吃', zh: '' }],
        [{ ko: '명령（无收音）', zh: '' }, { ko: '词干 + -라고', zh: '' }, { ko: '가라고 했어요', zh: '' }, { ko: '叫去', zh: '' }],
        [{ ko: '명령 否定', zh: '' }, { ko: '词干 + -지 말라고', zh: '' }, { ko: '가지 말라고 했어요', zh: '' }, { ko: '叫不要去', zh: '' }],
        [{ ko: '공동（邀请）', zh: '' }, { ko: '词干 + -자고', zh: '' }, { ko: '가자고 했어요', zh: '' }, { ko: '提议去', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '命令句/共动句间接引语', titleEn: 'Indirect Speech for Imperative/Propositive Sentences',
      body: '测试对两种引语形式的掌握', bodyEn: 'Test mastery of two quote forms',
      questions: [
        {
          prompt: '老师叫坐下。→ 선생님이 앉___ 하셨어요', promptEn: 'The teacher told us to sit down. → 선생님이 앉___ 하셨어요',
          options: ['으라고', '으냐고', '는다고', '자고'],
          answer: 0 as 0|1|2|3,
          explanation: '命令句：앉다（有收音）→ 앉으라고', explanationEn: 'Command: 앉다 (with final consonant) → 앉으라고',
        },
        {
          prompt: '朋友提议一起去旅行。→ 친구가 같이 여행 가___ 했어요', promptEn: 'A friend suggested traveling together. → 친구가 같이 여행 가___ 했어요',
          options: ['라고', '자고', '냐고', '다고'],
          answer: 1 as 0|1|2|3,
          explanation: '共动句：가다 → 가자고', explanationEn: 'Suggestive: 가다 → 가자고',
        },
        {
          prompt: '医生叫不要喝酒。→ 의사가 술을 마시지 ___ 했어요', promptEn: 'The doctor told me not to drink. → 의사가 술을 마시지 ___ 했어요',
          options: ['않자고', '말자고', '않으라고', '말라고'],
          answer: 3 as 0|1|2|3,
          explanation: '命令否定：-지 말라고 하다', explanationEn: 'Negative command: -지 말라고 하다',
        },
        {
          prompt: '妈妈叫快点回家。→ 엄마가 빨리 집에 오___ 하셨어요', promptEn: 'Mom told me to come home quickly. → 엄마가 빨리 집에 오___ 하셨어요',
          options: ['으라고', '냐고', '라고', '자고'],
          answer: 2 as 0|1|2|3,
          explanation: '오다 无收音 → 오라고', explanationEn: '오다 has no final consonant → 오라고',
        },
      ],
    },
    linkedGrammarIds: ['g78'],
  },

  {
    id: 'card-p11-l04',
    partNumber: 11,
    lessonNumber: 4,
    title: '-(으)니까, -(으)니, -아/어/여 보니까',
    whatItDoes: '表示"因为……所以……"和"一……就发现……"', whatItDoesEn: 'Expressing "because... so..." and "as soon as... I found..."',
    whatItDoesBody: '-(으)니까 表示原因或理由，比 -아/어서 更强调说话人的主观判断，后句可以接命令、建议、邀请。\n-(으)니 是 -(으)니까 的缩略，多用于口语或连接后续陈述。\n-아/어/여 보니까 表示"做了某事之后发现/才知道"，强调亲身体验后的发现。', whatItDoesBodyEn: '-(으)니까 expresses cause or reason, emphasizing the speaker\'s subjective judgment more than -아/어서, and can be followed by commands, suggestions, or invitations.\\n-(으)니 is a shortened form of -(으)니까, often used in speech or to connect a following statement.\\n-아/어/여 보니까 means "after doing something, I found/realized," emphasizing a discovery from firsthand experience.',
    structureNote: '-(으)니까：有收音+으니까，无收音+니까\n-(으)니：有收音+으니，无收音+니\n-아/어/여 보니까：动词 + 아/어/여 보니까', structureNoteEn: '-(으)니까: with final consonant + 으니까, without + 니까\\n-(으)니: with final consonant + 으니, without + 니\\n-아/어/여 보니까: verb + 아/어/여 보니까',
    rulesNote: '-(으)니까 后面可以接命令（-세요）、提议（-ㅂ시다）等，-아/어서 不可以。\n-아/어/여 보니까 强调亲身做过后的新发现，前后主语通常相同。', rulesNoteEn: '-(으)니까 can be followed by commands (-세요), suggestions (-ㅂ시다), etc., but -아/어서 cannot.\\n-아/어/여 보니까 emphasizes a new discovery after doing something firsthand, and the subject is usually the same before and after.',
    structures: [
      {
        ko: '비가 오니까 우산을 가져가세요',
        zh: '因为下雨，带把伞去吧。', zhEn: 'Since it\'s raining, take an umbrella.',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오니까', role: 'plain' },
          { text: '우산을', role: 'object' },
          { text: '가져가세요', role: 'verb' },
        ],
      },
      {
        ko: '피곤하니까 일찍 자는 게 좋겠어요',
        zh: '因为累，早点睡比较好。', zhEn: 'Since you\'re tired, it\'s better to sleep early.',
        tokens: [
          { text: '피곤하니까', role: 'plain' },
          { text: '일찍 자는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
      {
        ko: '직접 먹어 보니까 생각보다 맛있었어요',
        zh: '亲自吃了之后发现比想象中好吃。', zhEn: 'After trying it myself, I found it tastier than I expected.',
        tokens: [
          { text: '직접 먹어 보니까', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '맛있었어요', role: 'verb' },
        ],
      },
      {
        ko: '한국에 살아 보니까 생각보다 살기 좋더라고요',
        zh: '在韩国住了之后发现比想象中好住。', zhEn: 'After living in Korea, I found it more comfortable than I expected.',
        tokens: [
          { text: '한국에', role: 'place' },
          { text: '살아 보니까', role: 'plain' },
          { text: '생각보다 살기 좋더라고요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)니까：有收音词干 + -으니까，无收音词干 + -니까', textEn: '-(으)니까: stems with a final consonant + -으니까, stems without + -니까', examples: '먹다→먹으니까 / 가다→가니까 / 피곤하다→피곤하니까' },
      { type: 'rule', text: '-(으)니：-(으)니까 的缩略，后句更常是陈述或继续说明', textEn: '-(으)니: shortened form of -(으)니까, the following clause is more often a statement or continuation', examples: '보니 생각보다 어렵더라고요 / 들으니 재미있을 것 같아요' },
      { type: 'rule', text: '-아/어/여 보니까：动词 + 아/어/여 보니까（"尝试后发现"）', textEn: '-아/어/여 보니까: verb + 아/어/여 보니까 ("after trying, found that")', examples: '먹어 보니까 / 해 보니까 / 가 보니까 / 살아 보니까' },
      { type: 'usage', text: '-(으)니까 后可接命令/提议/禁止，这是与 -아/어서 的关键区别', textEn: '-(으)니까 can be followed by commands/suggestions/prohibitions, a key difference from -아/어서', examples: '늦으니까 빨리 가세요（因为晚了，快走）/ 바쁘니까 나중에 얘기해요（因为忙，等会儿说）', examplesEn: '늦으니까 빨리 가세요 (since it\'s late, hurry) / 바쁘니까 나중에 얘기해요 (since I\'m busy, let\'s talk later)' },
      { type: 'usage', text: '-아/어서 后不能接命令/提议，只能陈述结果', textEn: '-아/어서 cannot be followed by commands/suggestions, only statements of results', examples: '비가 와서 우산을 가져갔어요（OK）vs 비가 와서 우산을 가져가세요（×）' },
      { type: 'note', text: '-아/어/여 보니까 中的 보다 是补助动词"尝试"，不是"看"', textEn: 'In -아/어/여 보니까, 보다 is an auxiliary verb meaning "try", not "see"', examples: '살아 보니까（住了之后发现）/ 먹어 보니까（吃了之后发现）', examplesEn: '살아 보니까 (after living, found) / 먹어 보니까 (after eating, found)' },
      { type: 'compare', text: '-(으)니까 vs -아/어서：用法上最大区别是后句能否接命令/提议', textEn: '-(으)니까 vs -아/어서: the biggest usage difference is whether the following clause can take commands/suggestions', examples: '피곤하니까 쉬세요（因为累，休息吧 ✓）vs 피곤해서 쉬세요（×）', examplesEn: '피곤하니까 쉬세요 (since you\'re tired, rest ✓) vs 피곤해서 쉬세요 (×)' },
      { type: 'note', text: '道歉、感谢的理由固定用 -아/어서，绝不能用 -(으)니까。用 -(으)니까 会显得在给对方讲道理、很失礼——这是与"接命令用 -(으)니까"相反的一条边界，最容易搞反。', textEn: 'Reasons for apologies and thanks always use -아/어서, never -(으)니까. Using -(으)니까 sounds like you\'re lecturing the other person and is rude—this is the opposite boundary from "commands use -(으)니까", and it\'s the easiest to mix up.', examples: '늦어서 죄송합니다（迟到了对不起 ✓）/ 도와줘서 고마워요（谢谢你帮忙 ✓）；说成 늦으니까 죄송합니다 就很失礼', examplesEn: '늦어서 죄송합니다 (sorry for being late ✓) / 도와줘서 고마워요 (thanks for helping ✓); saying 늦으니까 죄송합니다 would be very rude' },
      { type: 'note', text: '中文"因为下雨了""因为去了"会诱导你在 -아/어서 前加过去时，但 -아/어서 前绝不能加 -았/었-。要点明过去，就把时态放后句，或改用能带时态的 -(으)니까。', textEn: 'Chinese "because it rained" or "because I went" tempts you to add past tense before -아/어서, but -아/어서 can never take -았/었-. To indicate the past, put the tense in the following clause or use -(으)니까, which can carry tense.', examples: '어제 비가 와서 길이 막혔어요（✓）/ 어제 비가 왔으니까 길이 막혔어요（✓）；비가 왔어서…（×）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '추우니까', role: 'plain' },
          { text: '따뜻하게 입으세요', role: 'verb' },
        ],
        zh: '因为天气冷，穿暖和点吧。', zhEn: 'Since the weather is cold, dress warmly.',
        swapWords: ['추우니까 따뜻하게 입으세요', '좋으니까 산책해요', '늦으니까 빨리 가요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 카페에', role: 'place' },
          { text: '와 보니까', role: 'plain' },
          { text: '분위기가 정말 좋아요', role: 'verb' },
        ],
        zh: '来了这家咖啡厅之后发现氛围真的很好。', zhEn: 'After coming to this café, I found the atmosphere is really nice.',
        swapWords: ['와 보니까 분위기가 좋아요', '와 보니까 생각보다 비싸요', '와 보니까 메뉴가 다양해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '없으니까', role: 'plain' },
          { text: '나중에 이야기해요', role: 'verb' },
        ],
        zh: '因为没时间，等会儿再说吧。', zhEn: 'Since there\'s no time, let\'s talk later.',
        swapWords: ['없으니까 나중에 이야기해요', '있으니까 지금 이야기해요', '없으니까 빨리 끝내요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한번 해 보니까', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
        zh: '试了一次之后发现没想象中难。', zhEn: 'After trying it once, I found it wasn\'t as hard as I thought.',
        swapWords: ['생각보다 어렵지 않아요', '생각보다 재미있어요', '생각보다 쉬워요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '日常建议', contextEn: 'Everyday advice', ko: '밖에 비가 오니까 우산 챙기는 거 잊지 마세요.', zh: '外面在下雨，别忘了带伞。', zhEn: 'It\'s raining outside, don\'t forget your umbrella.' },
      { icon: '🍜', context: '饮食体验', contextEn: 'Food experience', ko: '직접 먹어 보니까 정말 맛있더라고요. 추천해요.', zh: '亲自吃了之后发现真的很好吃，推荐。', zhEn: 'After trying it myself, I found it\'s really delicious, recommended.' },
      { icon: '🇰🇷', context: '旅行发现', contextEn: 'Travel Discovery', ko: '한국에 가 보니까 생각보다 물가가 높더라고요.', zh: '去了韩国之后发现物价比想象中高。', zhEn: 'After going to Korea, I found prices higher than expected.' },
      { icon: '📚', context: '学习场景', contextEn: 'Study Scene', ko: '공부해 보니까 이 책이 제일 도움이 됐어요.', zh: '学了之后发现这本书最有帮助。', zhEn: 'After studying it, I found this book most helpful.' },
      { icon: '🎵', context: 'KPOP', ko: '그 노래를 들어 보니까 왜 인기 있는지 알겠어요.', zh: '听了那首歌之后明白为什么那么受欢迎了。', zhEn: 'After listening to that song, I understood why it\'s so popular.' },
      { icon: '💬', context: '-(으)니', ko: '보니 생각보다 간단하더라고요.', zh: '看了之后发现比想象中简单。', zhEn: 'After watching it, I found it simpler than expected.' },
    ],
    mistakes: [
      { wrong: '피곤해서 쉬세요（-아/어서 接命令句）', wrongEn: '피곤해서 쉬세요 (-아/어서 with imperative)', correct: '피곤하니까 쉬세요', note: '-아/어서 후절에 명령/청유 불가。命令句前必须用 -(으)니까。', noteEn: '-아/어서 cannot be used with commands/suggestions in the following clause. Use -(으)니까 before commands.' },
      { wrong: '먹어보니까（보니까 连写）', wrongEn: '먹어보니까 (보니까 written together)', correct: '먹어 보니까', note: '-아/어/여 보니까 中 보다 是补助动词，与前面的 아/어 分开写。', noteEn: 'In -아/어/여 보니까, 보다 is an auxiliary verb and is written separately from the preceding 아/어.' },
      { wrong: '가니까서 늦었어요（混用两个原因语尾）', wrongEn: '가니까서 늦었어요 (mixing two reason endings)', correct: '가니까 늦었어요 或 가서 늦었어요', correctEn: '가니까 늦었어요 or 가서 늦었어요', note: '-니까 和 -아/어서 只能用一个，不能叠加。', noteEn: 'Use either -니까 or -아/어서, not both.' },
      { wrong: '춥으니까（ㅂ불규칙 形容词 오류）', wrongEn: '춥으니까 (ㅂ-irregular adjective error)', correct: '추우니까', note: '춥다 属 ㅂ 不规则变化：词干末 ㅂ + 으니까 → ㅂ 变为 우 → 추우니까。', noteEn: '춥다 is ㅂ-irregular: stem-final ㅂ + 으니까 → ㅂ becomes 우 → 추우니까.' },
      { wrong: '늦으니까 죄송합니다（道歉理由用 -(으)니까）', wrongEn: '늦으니까 죄송합니다 (using -(으)니까 for apology reason)', correct: '늦어서 죄송합니다', note: '道歉、感谢的理由固定用 -아/어서。用 -(으)니까 像在讲道理、很失礼。', noteEn: 'Reasons for apologies and thanks always use -아/어서. Using -(으)니까 sounds like making excuses and is rude.' },
      { wrong: '비가 왔어서 길이 막혔어요（-아/어서 前加过去时）', wrongEn: '비가 왔어서 길이 막혔어요 (adding past tense before -아/어서)', correct: '비가 와서 길이 막혔어요', note: '-아/어서 前绝不能加 -았/었-。过去意义靠后句 막혔어요 体现，前节保持 와서。', noteEn: 'Never add -았/었- before -아/어서. Past meaning comes from the following clause 막혔어요; keep the preceding part as 와서.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第4课</div>
    <div class="ov-hero-title">-(으)니까, -(으)니, -아/어/여 보니까</div>
    <div class="ov-hero-sub">原因陈述与亲身发现的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">原因（可接命令）</div>
      <div class="ko">-(으)니까</div>
      <div class="zh">因为……（后可接命令/建议）</div>
    </div>
    <div class="ov-block">
      <div class="badge">缩略形</div>
      <div class="ko">-(으)니</div>
      <div class="zh">-(으)니까 의 口语缩略</div>
    </div>
    <div class="ov-block">
      <div class="badge">亲身发现</div>
      <div class="ko">-아/어/여 보니까</div>
      <div class="zh">做了之后发现……</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"因为……所以……"和"一……就发现……"</div>
<div class="card-body">-(으)니까 表示原因或理由，比 -아/어서 更强调说话人的主观判断，后句可以接命令、建议、邀请。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">비가 오니까 우산을 가져가세요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为下雨，带把伞去吧。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">피곤하니까 일찍 자는 게 좋겠어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为累，早点睡比较好。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-(으)니까 后面可以接命令（-세요）、提议（-ㅂ시다）等，-아/어서 不可以。
-아/어/여 보니까 强调亲身做过后的新发现，前后主语通常相同。</div>
`,
    compareLabel: '-(으)니까 vs -아/어서',
    compareHtml: `<div class="card-title">-(으)니까 vs -아/어서</div>
<div class="card-body">都表原因，但最关键的区别是<b>后句能否接命令/建议</b>。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-(으)니까</div>
    <div class="cmp-row"><span class="badge">语感</span><span class="zh">主观判断的理由</span></div>
    <div class="cmp-row"><span class="badge">后句</span><span class="zh">可接命令/建议/邀请</span></div>
    <div class="cmp-row"><span class="ko">비가 오니까 우산을 가져가세요</span></div>
    <div class="cmp-row"><span class="zh">因为下雨，带把伞去吧。（命令 ✓）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-아/어서</div>
    <div class="cmp-row"><span class="badge">语感</span><span class="zh">客观的因果</span></div>
    <div class="cmp-row"><span class="badge">后句</span><span class="zh">只能陈述结果，不接命令</span></div>
    <div class="cmp-row"><span class="ko">비가 와서 우산을 가져갔어요</span></div>
    <div class="cmp-row"><span class="zh">因为下雨，带了伞。（陈述 ✓ / 命令 ✗）</span></div>
  </div>
</div>
<div class="reminder-box">口诀：后句要<b>叫人做事</b>（-세요/-ㅂ시다）只能用 <b>-(으)니까</b>；피곤해서 쉬세요 是错的，要说 피곤하니까 쉬세요。</div>`,
    quickTable: {
      title: '-(으)니까 接续形式', titleEn: '-(으)니까 connective form',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-으니까', zh: '' }, { ko: '먹으니까', zh: '' }, { ko: '因为吃', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-니까', zh: '' }, { ko: '가니까', zh: '' }, { ko: '因为去', zh: '' }],
        [{ ko: 'ㄹ 词干', zh: '' }, { ko: '-니까（ㄹ脱落）', zh: '' }, { ko: '만들다→만드니까', zh: '' }, { ko: '因为做', zh: '' }],
        [{ ko: 'ㅂ 불규칙', zh: 'ㅂ不规则', zhEn: 'ㅂ irregular' }, { ko: '-우니까', zh: '' }, { ko: '춥다→추우니까', zh: '' }, { ko: '因为冷', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)니까, -아/어/여 보니까',
      body: '测试对两个语法点的掌握', bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '因为天气好，去散步吧。→ 날씨가 좋___ 산책해요', promptEn: 'Since the weather is nice, let\'s go for a walk. → 날씨가 좋___ 산책해요',
          options: ['니까', '아서', '으면', '으니까'],
          answer: 3 as 0|1|2|3,
          explanation: '좋다 有收音ㅎ → 좋으니까（有收音词干 + -으니까）', explanationEn: '좋다 has the final consonant ㅎ → 좋으니까 (stem with final consonant + -으니까)',
        },
        {
          prompt: '亲自做了之后发现很简单。→ 직접 해 ___ 쉽더라고요', promptEn: 'After doing it myself, I found it\'s easy. → 직접 해 ___ 쉽더라고요',
          options: ['봤으니까', '보니까', '보면', '보다가'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어 보니까 = 尝试后发现', explanationEn: '-아/어 보니까 = found out after trying',
        },
        {
          prompt: '-(으)니까 与 -아/어서 最关键的区别是？', promptEn: 'What\'s the key difference between -(으)니까 and -아/어서?',
          options: ['两者都不能接命令句', '-아/어서 更正式', '-(으)니까 后可接命令句，-아/어서 不可以', '意思完全相同'],
          answer: 2 as 0|1|2|3,
          explanation: '-(으)니까 后句可接命令/共动句，-아/어서 不可以', explanationEn: '-(으)니까 can be followed by commands/suggestions, but -아/어서 cannot',
        },
        {
          prompt: '去了之后发现很漂亮。→ 가 ___ 정말 예쁘더라고요', promptEn: 'After going, I found it\'s really pretty. → 가 ___ 정말 예쁘더라고요',
          options: ['보니까', '보니까요', '봐서', '봤으니까'],
          answer: 0 as 0|1|2|3,
          explanation: '-아/어 보니까 = 尝试/去了之后发现：가 보니까。보니까요 句中不加요，봐서（-아서）和 봤으니까（因为去过）都不能引出"发现"的 더라고요。', explanationEn: '-아/어 보니까 = found out after trying/going: 가 보니까. Don\'t add 요 in the middle of the sentence; 봐서 (-아서) and 봤으니까 (because I went) can\'t introduce 더라고요 for "discovery."',
        },
      ],
    },
    linkedGrammarIds: ['g24'],
  },

  {
    id: 'card-p11-l05',
    partNumber: 11,
    lessonNumber: 5,
    title: '(으)로 유명하다, 이/가 되다',
    whatItDoes: '表示"以……著名"和"成为……/变成……"', whatItDoesEn: 'Expressing "famous for..." and "becoming.../turning into..."',
    whatItDoesBody: '(으)로 유명하다 表示某人或某地"以某事物著名"，로 后接名词。\n-기로 유명하다 表示某人或某地"以做某事著名"，기로 后接动词名词化形式。\n이/가 되다 表示"成为……"，是描述身份、状态变化的核心表达。', whatItDoesBodyEn: '(으)로 유명하다 means someone or somewhere is "famous for something," with 로 attached to a noun. \\n-기로 유명하다 means someone or somewhere is "famous for doing something," with 기로 attached to the nominalized verb form. \\n이/가 되다 means "to become..." and is the core expression for describing changes in identity or state.',
    structureNote: '(으)로 유명하다：名词 + (으)로 유명하다\n-기로 유명하다：动词词干 + 기로 유명하다\n이/가 되다：名词 + 이/가 되다', structureNoteEn: '(으)로 유명하다: noun + (으)로 유명하다\\n-기로 유명하다: verb stem + 기로 유명하다\\n이/가 되다: noun + 이/가 되다',
    rulesNote: '(으)로：名词有收音 + 으로，无收音/ㄹ结尾 + 로。\n이/가 되다 中 되다 本身可变时态：돼요/됐어요/될 거예요。\n이/가 되다 前的名词根据收音选 이（有）或 가（无）。', rulesNoteEn: '(으)로: noun with final consonant + 으로, without final consonant or ending in ㄹ + 로. \\nIn 이/가 되다, 되다 itself can change tense: 돼요/됐어요/될 거예요. \\nThe noun before 이/가 되다 takes 이 (with final consonant) or 가 (without).',
    structures: [
      {
        ko: '제주도는 경치로 유명해요',
        zh: '济州岛以风景著名。', zhEn: 'Jeju Island is famous for its scenery.',
        tokens: [
          { text: '제주도는', role: 'subject' },
          { text: '경치로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
      },
      {
        ko: '그 배우는 춤을 잘 추기로 유명해요',
        zh: '那个演员以擅长跳舞著名。', zhEn: 'That actor is famous for being good at dancing.',
        tokens: [
          { text: '그 배우는', role: 'subject' },
          { text: '춤을 잘 추기로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
      },
      {
        ko: '저는 선생님이 되고 싶어요',
        zh: '我想成为老师。', zhEn: 'I want to become a teacher.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '선생님이', role: 'plain' },
          { text: '되고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '드디어 봄이 됐어요',
        zh: '终于到春天了。', zhEn: 'Spring has finally come.',
        tokens: [
          { text: '드디어', role: 'plain' },
          { text: '봄이', role: 'plain' },
          { text: '됐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + (으)로 유명하다：有收音+으로，无收音/ㄹ+로', textEn: 'Noun + (으)로 유명하다: with final consonant + 으로, without final consonant/ㄹ + 로', examples: '음식으로 유명해요 / 경치로 유명해요 / K-pop으로 유명해요' },
      { type: 'rule', text: '动词 词干 + -기로 유명하다：以做某事著名', textEn: 'Verb stem + -기로 유명하다: famous for doing something', examples: '노래를 잘 하기로 유명해요 / 오래 걷기로 유명해요' },
      { type: 'rule', text: '名词 + 이/가 되다：有收音+이 되다，无收音+가 되다', textEn: 'Noun + 이/가 되다: with final consonant + 이 되다, without final consonant + 가 되다', examples: '의사가 됐어요 / 선생님이 됐어요 / 친구가 됐어요' },
      { type: 'usage', text: '이/가 되다 可表示身份变化、时间到来、状况变化', textEn: '이/가 되다 can express change of identity, arrival of time, or change of situation', examples: '봄이 됐어요（到春天了）/ 어른이 됐어요（成大人了）/ 문제가 됐어요（成了问题）', examplesEn: '봄이 됐어요 (spring has come) / 어른이 됐어요 (became an adult) / 문제가 됐어요 (became a problem)' },
      { type: 'usage', text: '유명하다 的否定：유명하지 않다 / 별로 안 유명해요', textEn: 'Negation of 유명하다: 유명하지 않다 / 별로 안 유명해요', examples: '이 가수는 아직 별로 안 유명해요（这个歌手还不太出名）', examplesEn: '이 가수는 아직 별로 안 유명해요 (This singer isn\'t very famous yet)' },
      { type: 'note', text: '이/가 되다 vs 이/가 아니다：前者表变化结果，后者表否定存在', textEn: '이/가 되다 vs 이/가 아니다: the former expresses a result of change, the latter expresses negation of existence', examples: '선생님이 됐어요（成为了老师）vs 선생님이 아니에요（不是老师）', examplesEn: '선생님이 됐어요 (became a teacher) vs 선생님이 아니에요 (is not a teacher)' },
      { type: 'compare', text: '(으)로 유명하다 vs -기로 유명하다：前者接名词，后者接动词', textEn: '(으)로 유명하다 vs -기로 유명하다: the former takes a noun, the latter takes a verb', examples: '김치로 유명해요（名词：以泡菜著名）vs 김치를 잘 만들기로 유명해요（动词：以擅长做泡菜著名）', examplesEn: '김치로 유명해요 (noun: famous for kimchi) vs 김치를 잘 만들기로 유명해요 (verb: famous for making kimchi well)' },
      { type: 'note', text: '유명하다 是"著名（状态）"，유명해지다 是"变得著名（变化过程）"，场景里的 유명해졌어요 就是后者。形容词 + 아/어지다 表"变得……"，아/어지다 后面章节详学，这里先能读懂即可', textEn: '유명하다 means "to be famous (state)", while 유명해지다 means "to become famous (change process)"; in the scene, 유명해졌어요 is the latter. Adjective + 아/어지다 indicates "to become...", which will be covered in detail in a later chapter—for now, just understand it.', examples: '지금 유명해요（现在就有名）vs 요즘 유명해졌어요（最近变有名了）', examplesEn: '지금 유명해요 (already famous now) vs 요즘 유명해졌어요 (recently became famous)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '서울은', role: 'subject' },
          { text: 'K-pop으로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
        zh: '首尔以K-pop著名。', zhEn: 'Seoul is famous for K-pop.',
        swapWords: ['K-pop으로 유명해요', '야경으로 유명해요', '쇼핑으로 유명해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '나중에', role: 'time' },
          { text: '의사가', role: 'plain' },
          { text: '되고 싶어요', role: 'verb' },
        ],
        zh: '我以后想成为医生。', zhEn: 'I want to become a doctor in the future.',
        swapWords: ['의사가 되고 싶어요', '선생님이 되고 싶어요', '디자이너가 되고 싶어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 식당은', role: 'subject' },
          { text: '맛있기로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
        zh: '那家餐厅以好吃著名。', zhEn: 'That restaurant is famous for being delicious.',
        swapWords: ['맛있기로 유명해요', '저렴하기로 유명해요', '줄이 길기로 유명해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '드디어', role: 'plain' },
          { text: '대학생이', role: 'subject' },
          { text: '됐어요', role: 'verb' },
        ],
        zh: '终于成为大学生了。', zhEn: 'Finally became a college student.',
        swapWords: ['대학생이 됐어요', '직장인이 됐어요', '어른이 됐어요'],
        swapRole: 'subject',
      },
    ],
    scenarios: [
      { icon: '🇰🇷', context: '韩国文化', contextEn: 'Korean culture', ko: '한국은 K-pop과 K-drama로 전 세계에 유명해요.', zh: '韩国以K-pop和K剧闻名全世界。', zhEn: 'Korea is famous worldwide for K-pop and K-dramas.' },
      { icon: '🎵', context: 'KPOP 偶像', contextEn: 'K-pop idol', ko: '그 그룹은 칼군무로 유명해요.', zh: '那个组合以整齐划一的舞蹈著名。', zhEn: 'That group is famous for their perfectly synchronized dancing.' },
      { icon: '🍜', context: '美食推荐', contextEn: 'Food recommendations', ko: '이 식당은 냉면으로 유명한데 꼭 가 보세요.', zh: '这家餐厅以冷面著名，一定要去。', zhEn: 'This restaurant is famous for its cold noodles—you must go.' },
      { icon: '🎓', context: '职业愿望', contextEn: 'Career aspirations', ko: '어릴 때부터 선생님이 되고 싶었어요.', zh: '从小就想成为老师。', zhEn: 'I\'ve wanted to become a teacher since I was young.' },
      { icon: '🌸', context: '季节变化', contextEn: 'Seasonal changes', ko: '어느새 날씨가 따뜻해져서 봄이 된 것 같아요.', zh: '不知不觉天气变暖，好像到春天了。', zhEn: 'Before I knew it, the weather warmed up—seems like spring has arrived.' },
      { icon: '📺', context: '韩剧场景', contextEn: 'K-drama scene', ko: '그 배우는 이 드라마로 유명해졌어요.', zh: '那个演员因为这部剧变得有名了。', zhEn: 'That actor became famous because of this drama.' },
    ],
    mistakes: [
      { wrong: '서울은 K-pop이로 유명해요（이로 不存在）', wrongEn: '서울은 K-pop이로 유명해요 (이로 doesn\'t exist)', correct: '서울은 K-pop으로 유명해요', note: 'K-pop 以 p 收音结尾 → K-pop으로（有收音+으로）。', noteEn: 'K-pop ends with the final consonant p → K-pop으로 (final consonant + 으로).' },
      { wrong: '의사이가 됐어요（이가 重复）', wrongEn: '의사이가 됐어요 (이가 is redundant)', correct: '의사가 됐어요', note: '의사 无收音 → 의사가 되다，不加 이。이/가 只能选一个。', noteEn: '의사 has no final consonant → 의사가 되다, no 이 added. Choose only one of 이/가.' },
      { wrong: '그 사람은 노래로 유명해요（要表达"以唱歌好著名"）', wrongEn: '그 사람은 노래로 유명해요 (to express "famous for singing well")', correct: '그 사람은 노래를 잘 하기로 유명해요', note: '用动词表达"以做某事著名"时用 -기로 유명하다，用名词时用 (으)로 유명하다。', noteEn: 'To express "famous for doing something" with a verb, use -기로 유명하다; with a noun, use (으)로 유명하다.' },
      { wrong: '됩니다 → 됬어요（됐의拼写错误）', wrongEn: '됩니다 → 됬어요 (spelling error of 됐)', correct: '됐어요', note: '되다 过去时：됐어요（되+었→됐），不是 됬어요。这是常见拼写错误。', noteEn: 'Past tense of 되다: 됐어요 (되+었→됐), not 됬어요. This is a common spelling mistake.' },
      { wrong: '저는 의사를 됐어요', correct: '저는 의사가 됐어요', note: '中文"成为医生"像及物动词带宾语，学生会误加 을/를。但 되다 是"变成"，前面的名词是变化结果，用主格 이/가，不用宾格 을/를。', noteEn: 'In Chinese, "becoming a doctor" looks like a transitive verb with an object, so students mistakenly add 을/를. But 되다 means "to become," and the preceding noun is the result of the change, so it takes the subject particle 이/가, not the object particle 을/를.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第5课</div>
    <div class="ov-hero-title">(으)로 유명하다, 이/가 되다</div>
    <div class="ov-hero-sub">著名理由与身份变化的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">以名词著名</div>
      <div class="ko">名词 + (으)로 유명하다</div>
      <div class="zh">김치로 유명해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">以动作著名</div>
      <div class="ko">动词 词干 + -기로 유명하다</div>
      <div class="zh">노래를 잘 하기로 유명해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">成为/变成</div>
      <div class="ko">名词 + 이/가 되다</div>
      <div class="zh">선생님이 됐어요</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"以……著名"和"成为……/变成……"</div>
<div class="card-body">(으)로 유명하다 表示某人或某地"以某事物著名"，로 后接名词。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">제주도는 경치로 유명해요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">济州岛以风景著名。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">그 배우는 춤을 잘 추기로 유명해요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">那个演员以擅长跳舞著名。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">(으)로：名词有收音 + 으로，无收音/ㄹ结尾 + 로。
이/가 되다 中 되다 本身可变时态：돼요/됐어요/될 거예요。
이/가 되다 前的名词根据收音选 이（有）或 가（无）。</div>
`,
    compareLabel: '(으)로 vs -기로 유명',
    compareHtml: `<div class="card-title">以…著名 vs 成为…</div>
<div class="card-body">"著名"看后面接<b>名词</b>还是<b>动词</b>；"成为"用 이/가 되다。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">(으)로 / -기로 유명하다</div>
    <div class="cmp-row"><span class="badge">名词</span><span class="zh">(으)로 유명하다</span></div>
    <div class="cmp-row"><span class="ko">제주도는 경치로 유명해요</span></div>
    <div class="cmp-row"><span class="badge">动词</span><span class="zh">-기로 유명하다</span></div>
    <div class="cmp-row"><span class="ko">춤을 잘 추기로 유명해요</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">이/가 되다（成为）</div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">有收音+이 / 无收音+가 되다</span></div>
    <div class="cmp-row"><span class="ko">선생님이 됐어요 / 의사가 됐어요</span></div>
    <div class="cmp-row"><span class="badge">时间</span><span class="zh">也表时候/状况到来</span></div>
    <div class="cmp-row"><span class="ko">드디어 봄이 됐어요</span></div>
  </div>
</div>
<div class="reminder-box">以名词著名用 <b>(으)로</b>（경치로），以动作著名用 <b>-기로</b>（잘 추기로）。되다 过去是 <b>됐어요</b>（되+었），不是 됬어요。</div>`,
    quickTable: {
      title: '이/가 되다 접속 형식',
      headers: ['名词末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '无收音', zh: '' }, { ko: '명사 + 가 되다', zh: '' }, { ko: '의사가 됐어요', zh: '' }, { ko: '成为了医生', zh: '' }],
        [{ ko: '有收音', zh: '' }, { ko: '명사 + 이 되다', zh: '' }, { ko: '선생님이 됐어요', zh: '' }, { ko: '成为了老师', zh: '' }],
        [{ ko: '시간（有收音）', zh: '' }, { ko: '시간 + 이 되다', zh: '' }, { ko: '봄이 됐어요', zh: '' }, { ko: '到春天了', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 유명하다, 이/가 되다',
      body: '测试对两个语法点的掌握', bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '首尔以购物著名。→ 서울은 쇼핑___ 유명해요', promptEn: 'Seoul is famous for shopping. → 서울은 쇼핑___ 유명해요',
          options: ['으로', '로', '가로', '이로'],
          answer: 0 as 0|1|2|3,
          explanation: '쇼핑 末音节 핑 有收音（ㅇ）→ 쇼핑으로（有收音+으로）', explanationEn: 'The last syllable of 쇼핑, 핑, has a final consonant (ㅇ) → 쇼핑으로 (final consonant + 으로)',
        },
        {
          prompt: '我想成为设计师。→ 저는 디자이너___ 되고 싶어요', promptEn: 'I want to become a designer. → 저는 디자이너___ 되고 싶어요',
          options: ['로', '가', '이', '으로'],
          answer: 1 as 0|1|2|3,
          explanation: '디자이너 无收音 → 디자이너가 되다', explanationEn: '디자이너 has no final consonant → 디자이너가 되다',
        },
        {
          prompt: '那个歌手以歌声好著名。→ 그 가수는 노래를 잘 하___ 유명해요', promptEn: 'That singer is famous for singing well. → 그 가수는 노래를 잘 하___ 유명해요',
          options: ['로', '으로', '기가', '기로'],
          answer: 3 as 0|1|2|3,
          explanation: '动词 하다 → 하기로 유명하다', explanationEn: 'Verb 하다 → 하기로 유명하다',
        },
        {
          prompt: '됐어요 的正确拼写是？', promptEn: 'What is the correct spelling of 됐어요?',
          options: ['되요', '됬어요', '됐어요', '됬었어요'],
          answer: 2 as 0|1|2|3,
          explanation: '됐어요 = 되+었어요 的缩略形，됬어요/됬었어요 都是错误拼写', explanationEn: '됐어요 is the contracted form of 되+었어요; 됬어요/됬었어요 are all incorrect spellings.',
        },
      ],
    },
    linkedGrammarIds: ['g9', 'g73'],
  },

  {
    id: 'card-p11-l06',
    partNumber: 11,
    lessonNumber: 6,
    title: '-을/ㄹ 만하다, -는 게 좋겠다',
    whatItDoes: '表示"值得做某事"和"最好做某事"', whatItDoesEn: 'Expressing "worth doing" and "it\'s best to do"',
    whatItDoesBody: '-을/ㄹ 만하다 表示某事值得做、有意义，相当于"值得……"。\n-는 게 좋겠다 表示说话人的建议或婉转的劝告，相当于"最好……"或"还是……比较好"，比 -(으)세요 更委婉。', whatItDoesBodyEn: '-을/ㄹ 만하다 means something is worth doing or meaningful, equivalent to "worth..." \\n-는 게 좋겠다 expresses the speaker\'s suggestion or gentle advice, equivalent to "it\'s best to..." or "it might be better to...", and is more polite than -(으)세요.',
    structureNote: '-을/ㄹ 만하다：动词 词干 + -을/ㄹ 만하다\n-는 게 좋겠다：动词 词干 + -는 게 좋겠다', structureNoteEn: '-을/ㄹ 만하다: verb stem + -을/ㄹ 만하다\\n-는 게 좋겠다: verb stem + -는 게 좋겠다',
    rulesNote: '-을/ㄹ 만하다 中 만 是依存名词"价值"，前用冠词形 -을/ㄹ。\n-는 게 좋겠다 比 -는 게 좋아요 语气更委婉、更具建议性。겠 表示说话人的主观判断。', rulesNoteEn: 'In -을/ㄹ 만하다, 만 is a dependent noun meaning "value," preceded by the adnominal form -을/ㄹ. \\n-는 게 좋겠다 is more polite and suggestive than -는 게 좋아요. 겠 expresses the speaker\'s subjective judgment.',
    structures: [
      {
        ko: '이 영화는 볼 만해요',
        zh: '这部电影值得看。', zhEn: 'This movie is worth watching.',
        tokens: [
          { text: '이 영화는', role: 'subject' },
          { text: '볼 만해요', role: 'verb' },
        ],
      },
      {
        ko: '이 식당은 한 번 가 볼 만해요',
        zh: '这家餐厅值得去一次。', zhEn: 'This restaurant is worth visiting once.',
        tokens: [
          { text: '이 식당은', role: 'subject' },
          { text: '한 번 가 볼 만해요', role: 'verb' },
        ],
      },
      {
        ko: '지금 출발하는 게 좋겠어요',
        zh: '现在出发比较好。', zhEn: 'It\'s better to leave now.',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '출발하는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람한테 먼저 연락해 보는 게 좋겠어요',
        zh: '先联系那个人比较好。', zhEn: 'It\'s better to contact that person first.',
        tokens: [
          { text: '그 사람한테', role: 'plain' },
          { text: '먼저 연락해 보는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을/ㄹ 만하다：有收音词干 + -을 만하다，无收音/ㄹ词干 + -ㄹ 만하다', textEn: '-을/ㄹ 만하다: stems with a final consonant + -을 만하다, stems without a final consonant or ending in ㄹ + -ㄹ 만하다', examples: '먹다→먹을 만해요 / 가다→갈 만해요 / 볼 만해요 / 읽을 만해요' },
      { type: 'rule', text: '-는 게 좋겠다：动词 词干 + -는 게 좋겠어요（委婉建议）', textEn: '-는 게 좋겠다: verb stem + -는 게 좋겠어요 (polite suggestion)', examples: '쉬는 게 좋겠어요 / 먹는 게 좋겠어요 / 말하는 게 좋겠어요' },
      { type: 'usage', text: '-을/ㄹ 만하다 可与 -아/어 보다 结合：-아/어 볼 만하다', textEn: '-을/ㄹ 만하다 can combine with -아/어 보다: -아/어 볼 만하다', examples: '먹어 볼 만해요（值得尝尝）/ 가 볼 만한 곳이에요（值得去的地方）', examplesEn: '먹어 볼 만해요 (worth trying) / 가 볼 만한 곳이에요 (a place worth going)' },
      { type: 'usage', text: '-을/ㄹ 만하다 可作冠词形修饰名词：-을/ㄹ 만한 + 名词', textEn: '-을/ㄹ 만하다 can be used in adnominal form to modify nouns: -을/ㄹ 만한 + noun', examples: '볼 만한 영화（值得看的电影）/ 갈 만한 카페（值得去的咖啡厅）', examplesEn: '볼 만한 영화 (a movie worth watching) / 갈 만한 카페 (a café worth going to)' },
      { type: 'note', text: '-는 게 좋겠다 中的 겠 表示说话人的主观推断，不是单纯的将来时，而是推测语气。', textEn: 'In -는 게 좋겠다, 겠 expresses the speaker\'s subjective inference, not simply future tense, but a conjectural tone.', examples: '병원에 가는 게 좋겠어요（建议你去医院）', examplesEn: 'You\'d better go to the hospital.' },
      { type: 'compare', text: '-는 게 좋겠다 vs -(으)세요：建议语气从委婉到直接', textEn: '-는 게 좋겠다 vs -(으)세요: from polite suggestion to direct command', examples: '쉬는 게 좋겠어요（委婉建议）< 쉬세요（直接命令）', examplesEn: '쉬는 게 좋겠어요 (polite suggestion) < 쉬세요 (direct command)' },
      { type: 'compare', text: '-을/ㄹ 만하다 vs -을/ㄹ 것 같다：前者评价值得，后者推测', textEn: '-을/ㄹ 만하다 vs -을/ㄹ 것 같다: the former evaluates worth, the latter guesses', examples: '볼 만해요（值得看）vs 재미있을 것 같아요（感觉会很有趣）', examplesEn: '볼 만해요 (worth watching) vs 재미있을 것 같아요 (seems fun)' },
      { type: 'note', text: '语感提醒：-을/ㄹ 만하다 口语里常是"还行、凑合能做、过得去"的中等评价，不一定是中文"值得"那种强力推荐。想强调很棒要另说 정말 좋아요、꼭 봐야 해요', textEn: 'Nuance note: in spoken Korean, -을/ㄹ 만하다 often means a moderate evaluation like "okay, passable, decent," not necessarily the strong recommendation of Chinese "worth it." To emphasize something is great, say 정말 좋아요 or 꼭 봐야 해요 instead.', examples: '이 영화 볼 만해요（这电影还行/凑合能看）vs 이 영화 정말 좋아요（这电影真的很棒）', examplesEn: '이 영화 볼 만해요 (this movie is okay/watchable) vs 이 영화 정말 좋아요 (this movie is really great)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '읽을 만해요', role: 'verb' },
        ],
        zh: '这本书值得读。', zhEn: 'This book is worth reading.',
        swapWords: ['읽을 만해요', '사 볼 만해요', '선물할 만해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '감기에 걸렸으면', role: 'plain' },
          { text: '병원에 가는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
        zh: '如果感冒了，最好去医院。', zhEn: 'If you have a cold, you\'d better go to the hospital.',
        swapWords: ['가는 게 좋겠어요', '쉬는 게 좋겠어요', '약을 먹는 게 좋겠어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '부산은', role: 'subject' },
          { text: '한 번 가 볼 만한', role: 'plain' },
          { text: '도시예요', role: 'verb' },
        ],
        zh: '釜山是值得去一次的城市。', zhEn: 'Busan is a city worth visiting once.',
        swapWords: ['가 볼 만한 도시예요', '살아 볼 만한 도시예요', '여행할 만한 도시예요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '일찍 자는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
        zh: '今天早点睡比较好。', zhEn: 'It\'s better to sleep early today.',
        swapWords: ['일찍 자는 게 좋겠어요', '집에서 쉬는 게 좋겠어요', '병원에 가는 게 좋겠어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '电影推荐', contextEn: 'Movie recommendation', ko: '이 영화 볼 만해요? 재미있어요?', zh: '这部电影值得看吗？好看吗？', zhEn: 'Is this movie worth watching? Is it good?' },
      { icon: '🍜', context: '美食推荐', contextEn: 'Food recommendations', ko: '여기 음식 먹을 만해요. 한 번 와 보세요.', zh: '这里的食物值得吃，来试试吧。', zhEn: 'The food here is worth trying, come and give it a shot.' },
      { icon: '💊', context: '健康建议', contextEn: 'Health advice', ko: '많이 피곤해 보이는데 오늘은 일찍 자는 게 좋겠어요.', zh: '看起来很累，今天早点睡比较好。', zhEn: 'You look tired; it\'s better to sleep early today.' },
      { icon: '🎵', context: 'KPOP', ko: '이 앨범은 들을 만해요. 특히 타이틀곡이 좋아요.', zh: '这张专辑值得听，特别是主打曲很好。', zhEn: 'This album is worth listening to, especially the title track is great.' },
      { icon: '📚', context: '学习建议', contextEn: 'Study advice', ko: '시험 전에 한 번 더 복습하는 게 좋겠어요.', zh: '考试前再复习一遍比较好。', zhEn: 'It\'s better to review once more before the exam.' },
      { icon: '✈️', context: '旅行建议', contextEn: 'Travel advice', ko: '거기는 한 번쯤 가 볼 만한 곳이에요.', zh: '那里是值得去一次的地方。', zhEn: 'That place is worth visiting once.' },
    ],
    mistakes: [
      { wrong: '이 영화는 보는 만해요（-는 만하다 不存在）', wrongEn: '이 영화는 보는 만해요 (-는 만하다 doesn\'t exist)', correct: '이 영화는 볼 만해요', note: '-을/ㄹ 만하다 前必须用冠词形 -을/ㄹ，不用 -는。', noteEn: '-을/ㄹ 만하다 must be preceded by the adnominal form -을/ㄹ, not -는.' },
      { wrong: '쉬겠는 게 좋겠어요（겠 位置错误）', wrongEn: '쉬겠는 게 좋겠어요 (겠 is in the wrong position)', correct: '쉬는 게 좋겠어요', note: '겠 已包含在 좋겠다 里，动词部分用 -는，不要再加 겠。', noteEn: '겠 is already included in 좋겠다; use -는 on the verb part, don\'t add 겠 again.' },
      { wrong: '먹어 만해요（-아/어 만하다 不完整）', wrongEn: '먹어 만해요 (-아/어 만하다 incomplete)', correct: '먹어 볼 만해요', note: '与 보다 结合时形式是 -아/어 볼 만하다，보다 不能省略。', noteEn: 'When combined with 보다, the form is -아/어 볼 만하다, and 보다 cannot be omitted.' },
      { wrong: '갈 만해서 가세요（-만하다 接命令）', wrongEn: '갈 만해서 가세요 (-만하다 with command)', correct: '갈 만하면 가세요 或 가 볼 만하니까 가세요', correctEn: '갈 만하면 가세요 or 가 볼 만하니까 가세요', note: '-을/ㄹ 만하다 本身是形容词，其后不直接接命令，需加条件或因果连接。', noteEn: '-을/ㄹ 만하다 is an adjective; it can\'t directly take a command, needs a conditional or causal connector.' },
      { wrong: '이 영화는 안 볼 만해요（想说"不值得看"）', wrongEn: '이 영화는 안 볼 만해요 (meaning "not worth watching")', correct: '이 영화는 볼 만하지 않아요', note: '否定"值得"要否定 만하다 整体，用 -지 않다：볼 만하지 않아요。안 放在 볼 前面是否定"看"这个动作，意思全错。', noteEn: 'To negate "worth," negate 만하다 as a whole with -지 않다: 볼 만하지 않아요. Putting 안 before 볼 negates the action "watch," which changes the meaning entirely.' },
      { wrong: '지금 가지 말는 게 좋겠어요（想说"最好别去"）', wrongEn: '지금 가지 말는 게 좋겠어요 (meaning "better not to go now")', correct: '지금 안 가는 게 좋겠어요 或 가지 않는 게 좋겠어요', correctEn: 'It\'s better not to go now, or It\'s better not to go', note: '"最好别做"要用普通否定 안 -는 게 좋겠어요 或 -지 않는 게 좋겠어요，不要套禁止形 -지 말다（말다 用于命令/劝阻，接不出 말는 这种形）。', noteEn: 'For \'better not to do,\' use the regular negative 안 -는 게 좋겠어요 or -지 않는 게 좋겠어요, not the prohibitive form -지 말다 (말다 is used for commands/discouragement and doesn\'t form 말는).' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第6课</div>
    <div class="ov-hero-title">-을/ㄹ 만하다, -는 게 좋겠다</div>
    <div class="ov-hero-sub">值得推荐与委婉建议的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">值得做</div>
      <div class="ko">动词 词干 + -을/ㄹ 만하다</div>
      <div class="zh">볼 만해요 / 먹을 만해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">委婉建议</div>
      <div class="ko">动词 词干 + -는 게 좋겠다</div>
      <div class="zh">쉬는 게 좋겠어요</div>
    </div>
  </div>
</div>`,
    step0Html: `
      <div class="card-title">值得做 vs 最好做</div>
      <div class="card-body">推荐和建议两个相邻的语气，韩语用两套结构来区分。</div>
      <div class="hook-box">
        <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种语气，两种结构</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">值得做 · 推荐</div>
            <div style="font-size:16px;font-weight:800;color:#241917">이 영화는 볼 만해요.</div>
            <div style="font-size:16px;color:#89756e;margin-top:2px">这部电影值得看。</div>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
            <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">最好做 · 委婉建议</div>
            <div style="font-size:16px;font-weight:800;color:#241917">오늘은 일찍 자는 게 좋겠어요.</div>
            <div style="font-size:16px;color:#89756e;margin-top:2px">今天早点睡比较好。</div>
          </div>
        </div>
        <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 「볼 만하다」评价值得；「자는 게 좋겠어요」建议对方</div>
      </div>
      <div class="reminder-box">两个语法点都用于<b>评价 / 建议</b>，但视角不同：<br><b>-을/ㄹ 만하다</b>是说话人对事物的客观评价；<br><b>-는 게 좋겠다</b>是说话人对听话人的委婉建议，比 -(으)세요 更柔和。</div>
    `,
    compareLabel: '-을 만하다 vs -는 게 좋겠다',
    compareHtml: `<div class="card-title">-을/ㄹ 만하다 vs -는 게 좋겠다</div>
<div class="card-body">两者都用于"推荐/建议"，但<b>视角</b>不同——一个评价事物，一个劝告对方。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-을/ㄹ 만하다（值得做）</div>
    <div class="cmp-row"><span class="badge">视角</span><span class="zh">对事物的客观评价：值得</span></div>
    <div class="cmp-row"><span class="ko">이 영화는 볼 만해요</span></div>
    <div class="cmp-row"><span class="zh">这部电影值得看。</span></div>
    <div class="cmp-row"><span class="ko">한 번 가 볼 만한 곳이에요</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-는 게 좋겠다（最好做）</div>
    <div class="cmp-row"><span class="badge">视角</span><span class="zh">对对方的委婉建议，比 -세요 柔和</span></div>
    <div class="cmp-row"><span class="ko">병원에 가는 게 좋겠어요</span></div>
    <div class="cmp-row"><span class="zh">最好去医院。</span></div>
    <div class="cmp-row"><span class="ko">오늘은 일찍 자는 게 좋겠어요</span></div>
  </div>
</div>
<div class="reminder-box">看视角：<b>评价事物</b>用 <b>-을 만하다</b>（电影值得看）；<b>劝告对方</b>用 <b>-는 게 좋겠다</b>（你该去医院）。만하다 前必须冠词形（볼 ✓ 보는 ✗）。</div>`,
    quickTable: {
      title: '-을/ㄹ 만하다 接续形式', titleEn: '-을/ㄹ 만하다 connective form',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 만하다', zh: '' }, { ko: '먹을 만해요', zh: '' }, { ko: '值得吃', zh: '' }],
        [{ ko: '无收音 / ㄹ', zh: '' }, { ko: '-ㄹ 만하다', zh: '' }, { ko: '볼 만해요', zh: '' }, { ko: '值得看', zh: '' }],
        [{ ko: '-아/어 보다 搭配', zh: '' }, { ko: '-아/어 볼 만하다', zh: '' }, { ko: '먹어 볼 만해요', zh: '' }, { ko: '值得尝尝', zh: '' }],
        [{ ko: '冠词形修饰', zh: '' }, { ko: '-을/ㄹ 만한 + 名词', zh: '' }, { ko: '볼 만한 영화', zh: '' }, { ko: '值得看的电影', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 만하다, -는 게 좋겠다',
      body: '测试对两个语法点的掌握', bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '这本书值得读。→ 이 책은 읽___ 만해요', promptEn: 'This book is worth reading. → 이 책은 읽___ 만해요',
          options: ['ㄹ', '기', '을', '는'],
          answer: 2 as 0|1|2|3,
          explanation: '읽다 有收音 → 읽을 만하다', explanationEn: '읽다 has a final consonant → 읽을 만하다',
        },
        {
          prompt: '还是先道歉比较好。→ 먼저 사과하___ 게 좋겠어요', promptEn: 'It\'s better to apologize first. → 먼저 사과하___ 게 좋겠어요',
          options: ['는', '을', 'ㄹ', '기'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 게 좋겠다：动词 词干 + -는', explanationEn: '-는 게 좋겠다: verb stem + -는',
        },
        {
          prompt: '"值得去一次的地方"韩语是？', promptEn: 'What\'s Korean for \'a place worth visiting once\'?',
          options: ['한 번 갈 만하는 곳', '한 번 가는 만한 곳', '한 번 가기 만한 곳', '한 번 가 볼 만한 곳'],
          answer: 3 as 0|1|2|3,
          explanation: '-아/어 볼 만한 + 名词', explanationEn: '-아/어 볼 만한 + noun',
        },
        {
          prompt: '感冒了，最好去医院。→ 감기에 걸렸으니까 병원에 가___ 게 좋겠어요', promptEn: 'You caught a cold, so it\'s better to go to the hospital. → 감기에 걸렸으니까 병원에 가___ 게 좋겠어요',
          options: ['을', '는', 'ㄹ', '기'],
          answer: 1 as 0|1|2|3,
          explanation: '-는 게 좋겠다：가다 → 가는 게 좋겠다',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p11-l07',
    partNumber: 11,
    lessonNumber: 7,
    title: '아니면, (이)나, -거나',
    whatItDoes: '表示"或者"——在两个选项中选一个', whatItDoesEn: 'Expressing "or" — choosing between two options',
    whatItDoesBody: '아니면 是连接两个句子或词组的"或者"，用于提供另一个选项。\n(이)나 接在名词后，表示"……或者……"，也可表示"至少"的语气。\n-거나 接在动词/形容词后，连接两个同等选项，表示"不管做哪个都行"。', whatItDoesBodyEn: '아니면 is "or" that connects two sentences or phrases, used to offer another option. \\n(이)나 attaches to nouns, meaning "...or...", and can also convey a sense of "at least." \\n-거나 attaches to verbs/adjectives, connecting two equal options, meaning "either one is fine."',
    structureNote: '아니면：独立连接词，接在句子或名词组后\n(이)나：名词 + (이)나（有收音+이나，无收音+나）\n-거나：动词/形容词词干 + -거나', structureNoteEn: '아니면: independent connector, follows sentences or noun phrases\\n(이)나: noun + (이)나 (with final consonant + 이나, without + 나)\\n-거나: verb/adjective stem + -거나',
    rulesNote: '아니면 用于句子之间，(이)나 接名词，-거나 接用言（动词/形容词）。\n(이)나 除了"或者"外还有"大约/至少"的意思：시간이 한 시간이나 걸려요（要花整整一小时）。', rulesNoteEn: '아니면 is used between sentences, (이)나 attaches to nouns, and -거나 attaches to predicates (verbs/adjectives). \\n(이)나 also means "approximately/at least" besides "or": 시간이 한 시간이나 걸려요 (it takes a whole hour).',
    structures: [
      {
        ko: '커피 아니면 차를 마실게요',
        zh: '我喝咖啡或者茶。', zhEn: 'I drink coffee or tea.',
        tokens: [
          { text: '커피', role: 'plain' },
          { text: '아니면', role: 'plain' },
          { text: '차를', role: 'object' },
          { text: '마실게요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 영화나 드라마를 봐요',
        zh: '周末看电影或者电视剧。', zhEn: 'On weekends, I watch movies or TV shows.',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '영화나 드라마를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 있거나 없거나 매일 운동해요',
        zh: '不管有没有时间，每天运动。', zhEn: 'Exercise every day, whether you have time or not.',
        tokens: [
          { text: '시간이 있거나 없거나', role: 'plain' },
          { text: '매일', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
      },
      {
        ko: '집에서 쉬거나 친구를 만나요',
        zh: '在家休息或者见朋友。', zhEn: 'Rest at home or meet friends.',
        tokens: [
          { text: '집에서', role: 'place' },
          { text: '쉬거나', role: 'plain' },
          { text: '친구를', role: 'object' },
          { text: '만나요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '아니면：句子/名词组之间，"或者/要不然"', textEn: '아니면: Between sentences/noun phrases, "or/otherwise"', examples: '버스 아니면 지하철로 가요 / 오늘 아니면 내일 할게요' },
      { type: 'rule', text: '(이)나：名词 + 이나（有收音）/ 나（无收音），"……或者……"', textEn: '(이)나: Noun + 이나 (with final consonant) / 나 (without), "...or..."', examples: '사과나 바나나 / 책이나 잡지 / 커피나 주스' },
      { type: 'rule', text: '-거나：动词/形容词 词干 + -거나，连接两个同等选项', textEn: '-거나: Verb/adjective stem + -거나, connects two equal options', examples: '먹거나 마시거나 / 크거나 작거나 / 가거나 안 가거나' },
      { type: 'usage', text: '-거나 -거나：重复使用表示"无论哪个都……"', textEn: '-거나 -거나: Repeated to mean "no matter which..."', examples: '비가 오거나 안 오거나 갈 거예요（不管下雨不下雨都要去）', examplesEn: '비가 오거나 안 오거나 갈 거예요 (Going whether it rains or not)' },
      { type: 'usage', text: '(이)나 表示"至少/大约"（强调数量多或时间长）', textEn: '(이)나 means "at least/approximately" (emphasizing large quantity or long time)', examples: '한 시간이나 기다렸어요（等了整整一小时）/ 열 명이나 왔어요（来了足足十个人）', examplesEn: '한 시간이나 기다렸어요 (Waited a whole hour) / 열 명이나 왔어요 (A full ten people came)' },
      { type: 'note', text: '아니면 可在疑问句中用作"还是"：A 아니면 B？', textEn: '아니면 can be used in questions as "or": A 아니면 B?', examples: '커피 아니면 차? / 오늘 아니면 내일이에요?' },
      { type: 'compare', text: '(이)나 vs -거나：前者接名词，后者接动词/形容词', textEn: '(이)나 vs -거나: The former attaches to nouns, the latter to verbs/adjectives', examples: '사과나 바나나（名词选择）vs 먹거나 마시거나（动词选择）', examplesEn: '사과나 바나나 (noun choice) vs 먹거나 마시거나 (verb choice)' },
      { type: 'compare', text: '和 vs 或 别混：两个都要用 하고/와·과（和），只选一个才用 (이)나（或）。中文习惯先想到"和"，说选择时容易错用', textEn: 'Don\'t mix up \'and\' vs \'or\': Use 하고/와·과 for both, (이)나 for choosing one. Chinese speakers often default to \'and\' and misuse it for choices', examples: '사과하고 바나나 샀어요（买了苹果和香蕉，两样都买）vs 사과나 바나나 살 거예요（打算买苹果或香蕉，选一样）', examplesEn: '사과하고 바나나 샀어요 (Bought apples and bananas, both) vs 사과나 바나나 살 거예요 (Plan to buy apples or bananas, one)' },
      { type: 'note', text: '아니면 除了"或者"，还有"否则/要不然"的意思（来自 아니다＋면＝如果不是的话）。听到句首的 아니면 要按上下文判断是"或者"还是"要不然"', textEn: '아니면 also means \'otherwise\' (from 아니다 + 면 = if not). At the start of a sentence, use context to decide if it\'s \'or\' or \'otherwise\'', examples: '빨리 가요. 아니면 늦어요（快走，否则会迟到）', examplesEn: '빨리 가요. 아니면 늦어요 (Hurry up, otherwise you\'ll be late)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '집에서 쉬거나', role: 'plain' },
          { text: '친구를 만날 거예요', role: 'verb' },
        ],
        zh: '今天打算在家休息或者见朋友。', zhEn: 'Today I plan to rest at home or meet friends.',
        swapWords: ['집에서 쉬거나 친구를 만날 거예요', '영화를 보거나 책을 읽을 거예요', '요리하거나 청소할 거예요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한국어나', role: 'plain' },
          { text: '영어로', role: 'plain' },
          { text: '써도 돼요', role: 'verb' },
        ],
        zh: '用韩语或英语写都可以。', zhEn: 'You can write it in Korean or English.',
        swapWords: ['한국어나 영어로 써도 돼요', '한국어나 중국어로 써도 돼요', '한국어나 일본어로 써도 돼요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '지하철', role: 'plain' },
          { text: '아니면', role: 'plain' },
          { text: '버스로 가요', role: 'verb' },
        ],
        zh: '坐地铁或者公交去。', zhEn: 'Go by subway or bus.',
        swapWords: ['버스로 가요', '택시로 가요', '걸어서 가요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '집에서 쉬거나', role: 'plain' },
          { text: '친구를 만나요', role: 'verb' },
        ],
        zh: '周末在家休息或者见朋友。', zhEn: 'On weekends, rest at home or meet friends.',
        swapWords: ['집에서 쉬거나 친구를 만나요', '운동하거나 영화를 봐요', '공부하거나 책을 읽어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '点餐场景', contextEn: 'Ordering food', ko: '비빔밥 아니면 불고기로 주세요.', zh: '请给我拌饭或者烤肉。', zhEn: 'Please give me bibimbap or bulgogi.' },
      { icon: '📅', context: '约时间', contextEn: 'Make a time', ko: '토요일이나 일요일에 만나요.', zh: '周六或者周日见面吧。', zhEn: 'Let\'s meet on Saturday or Sunday.' },
      { icon: '🎵', context: 'KPOP 歌词', contextEn: 'KPOP lyrics', ko: '행복하거나 슬프거나 이 노래를 들어요.', zh: '不管开心还是难过，都听这首歌。', zhEn: 'Whether happy or sad, listen to this song.' },
      { icon: '🚌', context: '交通选择', contextEn: 'Transportation choices', ko: '버스 아니면 지하철, 어떻게 가는 게 빠를까요?', zh: '公交还是地铁，哪个更快？', zhEn: 'Which is faster, bus or subway?' },
      { icon: '💬', context: '强调用法 이나', contextEn: 'Emphatic usage of 이나', ko: '그 가방이 얼마나 비싼지, 100만 원이나 해요!', zh: '那个包多贵啊，要100万韩元！', zhEn: 'That bag is so expensive, it costs 1 million won!' },
      { icon: '🏠', context: '休息日', contextEn: 'Rest day', ko: '주말에는 집에서 쉬거나 운동을 해요.', zh: '周末在家休息或者运动。', zhEn: 'On weekends, rest or exercise at home.' },
    ],
    mistakes: [
      { wrong: '사과이나 바나나（有收音名词用 나）', wrongEn: '사과이나 바나나 (nouns with a final consonant use 나)', correct: '사과나 바나나', note: '사과 无收音 → 사과나。이나 用于有收音名词：책이나。', noteEn: '사과 has no final consonant → 사과나. 이나 is used for nouns with a final consonant: 책이나.' },
      { wrong: '먹거나이나 마셔요（-거나 + 이나 혼용）', correct: '먹거나 마셔요', note: '-거나 和 (이)나 功能相同，只需用一个。动词后接 -거나，名词后接 (이)나。', noteEn: '-거나 and (이)나 have the same function; use only one. Attach -거나 to verbs, and (이)나 to nouns.' },
      { wrong: '커피 아니면이나 차（아니면 + 이나 混用）', wrongEn: '커피 아니면이나 차 (mixing 아니면 + 이나)', correct: '커피 아니면 차 或 커피나 차', correctEn: '커피 아니면 차 or 커피나 차', note: '아니면 和 (이)나 作用相同，只用其中一个即可。', noteEn: '아니면 and (이)나 have the same function; use only one of them.' },
      { wrong: '한 시간나 기다렸어요（无收音名词用 이나）', wrongEn: '한 시간나 기다렸어요 (nouns without a final consonant use 이나)', correct: '한 시간이나 기다렸어요', note: '시간 有收音（간）→ 시간이나（强调用法）。', noteEn: '시간 has a final consonant (간) → 시간이나 (emphatic usage).' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第7课</div>
    <div class="ov-hero-title">아니면, (이)나, -거나</div>
    <div class="ov-hero-sub">提供选项与"或者"的三种表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">句子/词组间</div>
      <div class="ko">아니면</div>
      <div class="zh">或者/要不然（连接句子）</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词间</div>
      <div class="ko">名词 + (이)나</div>
      <div class="zh">……或者……（接名词）</div>
    </div>
    <div class="ov-block">
      <div class="badge">动词/形容词间</div>
      <div class="ko">动词/形容词 词干 + -거나</div>
      <div class="zh">……或者……（接用言）</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"或者"——在两个选项中选一个</div>
<div class="card-body">아니면 是连接两个句子或词组的"或者"，用于提供另一个选项。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">커피 아니면 차를 마실게요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我喝咖啡或者茶。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">주말에 영화나 드라마를 봐요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">周末看电影或者电视剧。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">아니면 用于句子之间，(이)나 接名词，-거나 接用言（动词/形容词）。
(이)나 除了"或者"外还有"大约/至少"的意思：시간이 한 시간이나 걸려요（要花整整一小时）。</div>
`,
    compareLabel: '(이)나 vs -거나 vs 아니면',
    compareHtml: `<div class="card-title">三个"或者"怎么选</div>
<div class="card-body">都表"或者"，区别只在<b>接什么词</b>。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">아니면</div>
    <div class="cmp-row"><span class="badge">接</span><span class="zh">句子/词组之间</span></div>
    <div class="cmp-row"><span class="ko">커피 아니면 차를 마실게요</span></div>
    <div class="cmp-row"><span class="zh">喝咖啡或者茶。</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">(이)나</div>
    <div class="cmp-row"><span class="badge">接</span><span class="zh">名词后（有收音+이나 / 无+나）</span></div>
    <div class="cmp-row"><span class="ko">영화나 드라마를 봐요</span></div>
    <div class="cmp-row"><span class="zh">看电影或电视剧。</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-거나</div>
    <div class="cmp-row"><span class="badge">接</span><span class="zh">动词/形容词词干后</span></div>
    <div class="cmp-row"><span class="ko">쉬거나 친구를 만나요</span></div>
    <div class="cmp-row"><span class="zh">休息或者见朋友。</span></div>
  </div>
</div>
<div class="reminder-box">名词用 <b>(이)나</b>、用言（动/形）用 <b>-거나</b>、句子间用 <b>아니면</b>，三者不叠用。另：(이)나 还表"多达/整整"——한 시간이나 걸려요（花了整整一小时）。</div>`,
    quickTable: {
      title: '세 가지 "또는" 비교',
      headers: ['形式', '接续对象', '例句', '意思'],
      rows: [
        [{ ko: '아니면', zh: '' }, { ko: '句子/名词组', zh: '' }, { ko: '버스 아니면 지하철', zh: '' }, { ko: '公交或地铁', zh: '' }],
        [{ ko: '(이)나', zh: '' }, { ko: '명사', zh: '' }, { ko: '영화나 드라마', zh: '' }, { ko: '电影或电视剧', zh: '' }],
        [{ ko: '-거나', zh: '' }, { ko: '동사/形容词', zh: '' }, { ko: '먹거나 마시거나', zh: '' }, { ko: '吃或喝', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '아니면, (이)나, -거나',
      body: '测试对三种"或者"表达的掌握', bodyEn: 'Test mastery of three ways to express \'or\'',
      questions: [
        {
          prompt: '周末看电影或者读书。→ 주말에 영화를 보___ 책을 읽어요', promptEn: 'Watch a movie or read a book on the weekend. → 주말에 영화를 보___ 책을 읽어요',
          options: ['나', '이나', '거나', '아니면'],
          answer: 2 as 0|1|2|3,
          explanation: '连接两个动词 → -거나', explanationEn: 'Connecting two verbs → -거나',
        },
        {
          prompt: '吃苹果或香蕉。→ 사과___ 바나나를 먹어요', promptEn: 'Eat an apple or a banana. → 사과___ 바나나를 먹어요',
          options: ['나', '아니면', '거나', '이나'],
          answer: 0 as 0|1|2|3,
          explanation: '사과 无收音 → 사과나', explanationEn: '사과 has no final consonant → 사과나',
        },
        {
          prompt: '今天或明天来都可以。→ 오늘 ___ 내일 와도 돼요', promptEn: 'Coming today or tomorrow is fine. → 오늘 ___ 내일 와도 돼요',
          options: ['거나', '아니면', '나', '이나'],
          answer: 1 as 0|1|2|3,
          explanation: '连接句子/时间词 → 아니면', explanationEn: 'Connecting sentences/time words → 아니면',
        },
        {
          prompt: '(이)나 的第二个用法（强调）是？', promptEn: 'What is the second usage of (이)나 (emphasis)?',
          options: ['表示让步', '表示原因', '表示命令', '强调数量多或时间长'],
          answer: 3 as 0|1|2|3,
          explanation: '이나 的强调用法：한 시간이나 기다렸어요（等了整整一小时）', explanationEn: 'Emphatic usage of 이나: 한 시간이나 기다렸어요 (waited a whole hour)',
        },
      ],
    },
    linkedGrammarIds: ['g12', 'g40'],
  },

  {
    id: 'card-p11-l08',
    partNumber: 11,
    lessonNumber: 8,
    title: '-아/어/여 보이다, -나 보다',
    whatItDoes: '表示"看起来……"和"好像……（推测）"', whatItDoesEn: 'Expressing "looks like..." and "seems like... (guess)"',
    whatItDoesBody: '-아/어/여 보이다 表示根据外表或视觉印象判断"看起来……"，主要接形容词。\n-나 보다 表示根据某种迹象推测"好像……/看来……"，用于说话人自己推断出的结论。\n-는/은/ㄴ 가 보다 与 -나 보다 意思相近，形式略有不同。', whatItDoesBodyEn: '-아/어/여 보이다 means "looks..." based on appearance or visual impression, mainly used with adjectives. \\n-나 보다 means "seems like.../appears..." based on some evidence, used for conclusions the speaker infers. \\n-는/은/ㄴ 가 보다 is similar in meaning to -나 보다 but slightly different in form.',
    structureNote: '-아/어/여 보이다：形容词 词干 + -아/어/여 보이다\n-나 보다：动词 词干 + -나 보다，形容词 词干 + -(으)나 보다\n-는/은/ㄴ 가 보다：动词 -는 가 보다，形容词 -은/ㄴ 가 보다', structureNoteEn: '-아/어/여 보이다: adjective stem + -아/어/여 보이다\\n-나 보다: verb stem + -나 보다, adjective stem + -(으)나 보다\\n-는/은/ㄴ 가 보다: verb -는 가 보다, adjective -은/ㄴ 가 보다',
    rulesNote: '-아/어/여 보이다 主要与形容词结合，与动词结合较少见。\n-나 보다 与 -(으)ㄴ가 보다 含义几乎相同可互换，后者稍正式。\n两个表达都表示未直接确认的推测。', rulesNoteEn: '-아/어/여 보이다 mainly combines with adjectives, rarely with verbs. \\n-나 보다 and -(으)ㄴ가 보다 are almost identical in meaning and interchangeable, with the latter being slightly more formal. \\nBoth expressions indicate speculation that hasn\'t been directly confirmed.',
    structures: [
      {
        ko: '오늘 좀 피곤해 보여요',
        zh: '今天看起来有点累。', zhEn: 'You look a bit tired today.',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '좀 피곤해 보여요', role: 'verb' },
        ],
      },
      {
        ko: '이 음식 맛있어 보여요',
        zh: '这个食物看起来很好吃。', zhEn: 'This food looks delicious.',
        tokens: [
          { text: '이 음식', role: 'subject' },
          { text: '맛있어 보여요', role: 'verb' },
        ],
      },
      {
        ko: '밖에 비가 오나 봐요',
        zh: '外面好像在下雨。', zhEn: 'It seems to be raining outside.',
        tokens: [
          { text: '밖에', role: 'place' },
          { text: '비가', role: 'subject' },
          { text: '오나 봐요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 많이 바쁜가 봐요',
        zh: '那个人好像很忙。', zhEn: 'That person seems busy.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '많이 바쁜가 봐요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여 보이다：形容词 + 아/어/여 보이다（视觉的 判断）', textEn: '-아/어/여 보이다: adjective + 아/어/여 보이다 (visual judgment)', examples: '예쁘다→예뻐 보여요 / 힘들다→힘들어 보여요 / 행복하다→행복해 보여요' },
      { type: 'rule', text: '-나 보다：动词 词干 + -나 보다，过去 + -았/었나 보다', textEn: '-나 보다: verb stem + -나 보다, past + -았/었나 보다', examples: '오다→오나 봐요 / 먹다→먹나 봐요 / 갔나 봐요（好像去了）', examplesEn: '오다→오나 봐요 / 먹다→먹나 봐요 / 갔나 봐요 (seems like (he) went)' },
      { type: 'rule', text: '-(으)ㄴ가/는가 보다：形容词 词干 + -(으)ㄴ가 보다，动词 词干 + -는가 보다', textEn: '-(으)ㄴ가/는가 보다: adjective stem + -(으)ㄴ가 보다, verb stem + -는가 보다', examples: '바쁘다→바쁜가 봐요 / 크다→큰가 봐요 / 가다→가는가 봐요' },
      { type: 'usage', text: '-아/어 보이다 主要用于根据外貌或表情进行判断', textEn: '-아/어 보이다 is mainly used to judge based on appearance or facial expression', examples: '어려 보여요（看起来年轻）/ 똑똑해 보여요（看起来聪明）/ 비싸 보여요（看起来很贵）', examplesEn: '어려 보여요 (looks young) / 똑똑해 보여요 (looks smart) / 비싸 보여요 (looks expensive)' },
      { type: 'usage', text: '-나 보다 用于根据情境证据或间接信息进行推测', textEn: '-나 보다 is used to infer based on situational evidence or indirect information', examples: '불이 꺼진 것 보니 없나 봐요（灯灭了，好像不在）', examplesEn: '불이 꺼진 것 보니 없나 봐요 (The light is off, so it seems (he\'s) not there)' },
      { type: 'note', text: 'KPOP/韩剧中 -아/어 보이다 常用于夸奖外貌', textEn: 'In K-pop/K-dramas, -아/어 보이다 is often used to compliment appearance', examples: '오늘 진짜 예뻐 보여요 / 행복해 보여서 좋아요' },
      { type: 'compare', text: '-아/어 보이다 vs -나 보다：前者基于视觉外观，后者基于情境推测', textEn: '-아/어 보이다 vs -나 보다: the former is based on visual appearance, the latter on situational inference', examples: '피곤해 보여요（看起来累）vs 피곤한가 봐요（好像很累——基于行为推断）', examplesEn: '피곤해 보여요 (looks tired) vs 피곤한가 봐요 (seems tired—inferred from behavior)' },
      { type: 'compare', text: '-나 보다 vs -는 것 같다（前面学过）：-나 보다 强调"根据看到的迹象断出来的"，语气像"看来/敢情"，一般说别人或情况；-는 것 같다 更广更软，也能用来委婉说自己的感觉', textEn: '-나 보다 vs -는 것 같다 (learned earlier): -나 보다 emphasizes "concluding from observed signs," with a tone like "it seems/apparently," usually about others or situations; -는 것 같다 is broader and softer, and can also be used to politely express one\'s own feelings', examples: '전화를 안 받는 걸 보니 자나 봐요（看来在睡——有依据）vs 저는 좀 피곤한 것 같아요（我好像有点累——说自己的感觉）', examplesEn: '전화를 안 받는 걸 보니 자나 봐요 (Seems like (he\'s) sleeping—based on evidence) vs 저는 좀 피곤한 것 같아요 (I think I\'m a bit tired—expressing my own feeling)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '표정이', role: 'subject' },
          { text: '안 좋아 보여요', role: 'verb' },
        ],
        zh: '今天表情看起来不太好。', zhEn: 'Your expression doesn\'t look good today.',
        swapWords: ['안 좋아 보여요', '행복해 보여요', '피곤해 보여요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '연락이 없는 걸 보니', role: 'plain' },
          { text: '바쁜가 봐요', role: 'verb' },
        ],
        zh: '看他没有联系，好像很忙。', zhEn: 'Since he hasn\'t contacted, he seems busy.',
        swapWords: ['바쁜가 봐요', '자고 있나 봐요', '잊어버린 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 옷', role: 'subject' },
          { text: '너한테', role: 'plain' },
          { text: '잘 어울려 보여요', role: 'verb' },
        ],
        zh: '这件衣服看起来很适合你。', zhEn: 'This outfit looks good on you.',
        swapWords: ['잘 어울려 보여요', '좀 작아 보여요', '비싸 보여요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '연락이 없는 걸 보니', role: 'plain' },
          { text: '바쁜가', role: 'plain' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '看他没联系，好像很忙。', zhEn: 'He hasn\'t contacted me, seems busy.',
        swapWords: ['바쁜가 봐요', '자나 봐요', '외출했나 봐요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😊', context: '外貌评价', contextEn: 'Appearance Evaluation', ko: '오늘 정말 행복해 보여요. 무슨 좋은 일 있어요?', zh: '今天看起来真的很开心，有什么好事吗？', zhEn: 'You look really happy today—did something good happen?' },
      { icon: '🎵', context: 'KPOP 演唱会', contextEn: 'KPOP concert', ko: '저 가수, 무대에서 진짜 즐거워 보여요.', zh: '那个歌手，在舞台上看起来真的很开心。', zhEn: 'That singer looks really happy on stage.' },
      { icon: '🌧️', context: '天气推测', contextEn: 'Weather Inference', ko: '하늘이 흐린 걸 보니 비가 오나 봐요.', zh: '看天空阴沉，好像要下雨了。', zhEn: 'The sky looks gloomy; it seems like it\'s going to rain.' },
      { icon: '📱', context: '情况推测', contextEn: 'Situation Inference', ko: 'A: 왜 전화를 안 받지? B: 자나 봐요.', zh: 'A：为什么不接电话？B：好像在睡觉。', zhEn: 'A: Why aren\'t you answering the phone? B: Seems like they\'re sleeping.' },
      { icon: '🏠', context: '日常对话', contextEn: 'Everyday conversation', ko: '불이 꺼진 걸 보니 아무도 없나 봐요.', zh: '看灯都灭了，好像没有人在。', zhEn: 'The lights are all off; it seems like no one\'s there.' },
      { icon: '💬', context: '外貌称赞', contextEn: 'Appearance Compliment', ko: '요즘 운동을 하는지 건강해 보여요.', zh: '最近好像在运动，看起来很健康。', zhEn: 'You seem to be exercising lately; you look healthy.' },
    ],
    mistakes: [
      { wrong: '피곤하아 보여요（形容词+아 보이다 连接错误）', wrongEn: '피곤하아 보여요 (adjective + 아 보이다 connection error)', correct: '피곤해 보여요', note: '피곤하다 → 피곤해（하다 类用 여→해）보여요。注意 하다 类的 여/해 变化。', noteEn: '피곤하다 → 피곤해 (하다 type uses 여→해) 보여요. Note the 여/해 change for 하다 type.' },
      { wrong: '행복하아 보여요（하다 类形容词连接错误）', wrongEn: '행복하아 보여요 (하다 type adjective connection error)', correct: '행복해 보여요', note: '행복하다 → 행복해（하다 类用 여→해）보여요。所有 하다 类形容词都变成 해 보여요 形式。', noteEn: '행복하다 → 행복해 (하다 type uses 여→해) 보여요. All 하다 type adjectives become 해 보여요 form.' },
      { wrong: '예뻐 보입니다（-아/어 보이다 描述自己）', wrongEn: '예뻐 보입니다 (-아/어 보이다 describing oneself)', correct: '예뻐 보여요（描述他人外观）', correctEn: '예뻐 보여요 (describing others\' appearance)', note: '-아/어 보이다 用于他人或外部事物较自然，用于自己显得不自然。', noteEn: '-아/어 보이다 is more natural for others or external things; it sounds unnatural for oneself.' },
      { wrong: '저는 배가 고프나 봐요（推测自己的状态）', wrongEn: '저는 배가 고프나 봐요 (inferring one\'s own state)', correct: '저는 배가 고파요 或 배가 고픈 것 같아요', correctEn: '저는 배가 고파요 or 배가 고픈 것 같아요', note: '-나 보다 是"根据迹象推测别人/情况"，自己饿不饿是直接知道的，不用推测。说自己直接讲 배가 고파요，要婉转就用 -는 것 같다。', noteEn: '-나 보다 is for inferring others/situations based on clues; you know if you\'re hungry directly, no need to infer. For yourself, just say 배가 고파요, or use -는 것 같다 to be softer.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第8课</div>
    <div class="ov-hero-title">-아/어/여 보이다, -나 보다</div>
    <div class="ov-hero-sub">视觉印象与情境推测的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">视觉判断</div>
      <div class="ko">形容词 + -아/어/여 보이다</div>
      <div class="zh">피곤해 보여요（看起来累）</div>
    </div>
    <div class="ov-block">
      <div class="badge">情境推测（动词）</div>
      <div class="ko">动词 词干 + -나 보다</div>
      <div class="zh">오나 봐요（好像在来）</div>
    </div>
    <div class="ov-block">
      <div class="badge">情境推测（形容词）</div>
      <div class="ko">形容词 词干 + -(으)ㄴ가 보다</div>
      <div class="zh">바쁜가 봐요（好像很忙）</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"看起来……"和"好像……（推测）"</div>
<div class="card-body">-아/어/여 보이다 表示根据外表或视觉印象判断"看起来……"，主要接形容词。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">오늘 좀 피곤해 보여요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">今天看起来有点累。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이 음식 맛있어 보여요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这个食物看起来很好吃。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-아/어/여 보이다 主要与形容词结合，与动词结合较少见。
-나 보다 与 -(으)ㄴ가 보다 含义几乎相同可互换，后者稍正式。
两个表达都表示未直接确认的推测。</div>
`,
    compareLabel: '-아/어 보이다 vs -나 보다',
    compareHtml: `<div class="card-title">-아/어 보이다 vs -나 보다</div>
<div class="card-body">都表推测，但依据不同：一个看<b>外表</b>，一个靠<b>情境线索</b>。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-아/어 보이다（看起来）</div>
    <div class="cmp-row"><span class="badge">依据</span><span class="zh">视觉外观、表情</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">形容词 + 아/어/해 보이다</span></div>
    <div class="cmp-row"><span class="ko">오늘 좀 피곤해 보여요</span></div>
    <div class="cmp-row"><span class="zh">今天看起来有点累。</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-나 / -(으)ㄴ가 보다（好像）</div>
    <div class="cmp-row"><span class="badge">依据</span><span class="zh">情境线索、间接信息的推断</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词+나 보다 / 形容词+(으)ㄴ가 보다</span></div>
    <div class="cmp-row"><span class="ko">연락이 없는 걸 보니 바쁜가 봐요</span></div>
    <div class="cmp-row"><span class="zh">看他没联系，好像很忙。</span></div>
  </div>
</div>
<div class="reminder-box">"直接看到累相"用 <b>피곤해 보여요</b>；"由行为推断累"用 <b>피곤한가 봐요</b>。形容词推测更标准的说法是 -(으)ㄴ가 보다（바쁜가 봐요）。</div>`,
    quickTable: {
      title: '-아/어 보이다 접속 형식',
      headers: ['形容词类型', '变化', '例句', '意思'],
      rows: [
        [{ ko: '아 계열', zh: 'ㅏ/ㅗ结尾', zhEn: 'Ends in ㅏ/ㅗ' }, { ko: '-아 보이다', zh: '' }, { ko: '작아 보여요', zh: '' }, { ko: '看起来小', zh: '' }],
        [{ ko: '어 계열', zh: '其他', zhEn: 'Other' }, { ko: '-어 보이다', zh: '' }, { ko: '힘들어 보여요', zh: '' }, { ko: '看起来辛苦', zh: '' }],
        [{ ko: '하다 계열', zh: '' }, { ko: '-해 보이다', zh: '' }, { ko: '행복해 보여요', zh: '' }, { ko: '看起来幸福', zh: '' }],
        [{ ko: 'ㅂ 불규칙', zh: 'ㅂ不规则', zhEn: 'ㅂ irregular' }, { ko: '우+어=워 보이다', zh: '' }, { ko: '어려워 보여요', zh: '' }, { ko: '看起来难', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어/여 보이다, -나 보다',
      body: '测试对两个推测表达的掌握', bodyEn: 'Test mastery of two speculative expressions',
      questions: [
        {
          prompt: '今天看起来很开心。→ 오늘 기분이 좋___ 보여요', promptEn: 'You look happy today. → 오늘 기분이 좋___ 보여요',
          options: ['아', '어', '나', '해'],
          answer: 0 as 0|1|2|3,
          explanation: '좋다 末元音 ㅗ（阳性元音）→ 좋아 보여요（아 系列）', explanationEn: '좋다 ends in ㅗ (positive vowel) → 좋아 보여요 (아 series)',
        },
        {
          prompt: '外面好像在下雨。→ 밖에 비가 오___ 봐요', promptEn: 'It seems to be raining outside. → 밖에 비가 오___ 봐요',
          options: ['은가', '는가', '아', '나'],
          answer: 3 as 0|1|2|3,
          explanation: '动词 오다 → 오나 봐요', explanationEn: 'Verb 오다 → 오나 봐요',
        },
        {
          prompt: '好像很忙。→ 바쁜___ 봐요', promptEn: 'Seems busy. → 바쁜___ 봐요',
          options: ['어', '가', '나', '아'],
          answer: 1 as 0|1|2|3,
          explanation: '形容词 바쁘다 → 바쁜가 봐요（-(으)ㄴ가 보다）', explanationEn: 'Adjective 바쁘다 → 바쁜가 봐요 (-(으)ㄴ가 보다)',
        },
        {
          prompt: '-아/어/여 보이다 主要与哪类词结合？', promptEn: 'What type of words does -아/어/여 보이다 mainly combine with?',
          options: ['名词', '动词', '形容词', '副词'],
          answer: 2 as 0|1|2|3,
          explanation: '-아/어 보이다 主要与形容词结合，表达视觉印象', explanationEn: '-아/어 보이다 mainly combines with adjectives to express visual impressions',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p11-l09',
    partNumber: 11,
    lessonNumber: 9,
    isPractice: true,
    title: '综合练习⑪', titleEn: 'Comprehensive Practice ⑪',
    whatItDoes: '综合练习 P11——间接引语与进阶表达', whatItDoesEn: 'Comprehensive Practice P11 — Indirect Speech and Advanced Expressions',
    whatItDoesBody: '本章围绕间接引语展开：陈述句（-는다고/-다고/-(이)라고 하다）、疑问句（-(느)냐고 하다）、命令句（-(으)라고 하다）、共动句（-자고 하다）四种引语形式，以及进阶表达 -(으)니까、-아/어 보니까、(으)로 유명하다、이/가 되다、-을/ㄹ 만하다、-는 게 좋겠다、아니면/(이)나/-거나、-아/어 보이다/-나 보다。', whatItDoesBodyEn: 'This chapter focuses on indirect speech: declarative (-는다고/-다고/-(이)라고 하다), interrogative (-(느)냐고 하다), imperative (-(으)라고 하다), and propositive (-자고 하다) forms, along with advanced expressions -(으)니까, -아/어 보니까, (으)로 유명하다, 이/가 되다, -을/ㄹ 만하다, -는 게 좋겠다, 아니면/(이)나/-거나, -아/어 보이다/-나 보다.',
    structures: [], connectionRules: [], cardExamples: [], scenarios: [], mistakes: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑪</div>
    <div class="ov-hero-sub">间接引语与进阶表达综合复习</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本册复习要点</div></div>
    <div class="ov-block">
      <div class="badge">陈述句引语</div>
      <div class="ko">-는다고/-다고/-(이)라고 하다</div>
      <div class="zh">转述他人说的话</div>
    </div>
    <div class="ov-block">
      <div class="badge">疑问句引语</div>
      <div class="ko">-(느)냐고 하다 / -는지 알다</div>
      <div class="zh">转述他人的提问</div>
    </div>
    <div class="ov-block">
      <div class="badge">命令/共动引语</div>
      <div class="ko">-(으)라고 / -자고 하다</div>
      <div class="zh">转述命令与邀请</div>
    </div>
    <div class="ov-block">
      <div class="badge">原因/发现</div>
      <div class="ko">-(으)니까 / -아/어 보니까</div>
      <div class="zh">原因与亲身发现</div>
    </div>
    <div class="ov-block">
      <div class="badge">推测</div>
      <div class="ko">-아/어 보이다 / -나 보다</div>
      <div class="zh">视觉印象与情境推测</div>
    </div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑪', titleEn: 'Comprehensive Practice ⑪',
      body: 'P11 间接引语和进阶表达综合测试', bodyEn: 'P11 Comprehensive test on indirect speech and advanced expressions',
      questions: [
        {
          prompt: '朋友说明天会来。→ 친구가 내일 온___ 했어요', promptEn: 'My friend said he\'ll come tomorrow. → 친구가 내일 온___ 했어요',
          options: ['다고', '는다고', '라고', '냐고'],
          answer: 0 as 0|1|2|3,
          explanation: '오다（无收音）→ -ㄴ다고：온+다고 = 온다고 했어요', explanationEn: '오다 (no final consonant) → -ㄴ다고: 온+다고 = 온다고 했어요',
        },
        {
          prompt: '老师问作业做完了吗。→ 선생님이 숙제를 다 했___ 물으셨어요', promptEn: 'The teacher asked if we finished the homework. → 선생님이 숙제를 다 했___ 물으셨어요',
          options: ['자고', '다고', '냐고', '라고'],
          answer: 2 as 0|1|2|3,
          explanation: '疑问句引语 过去：했냐고', explanationEn: 'Question quotation past: 했냐고',
        },
        {
          prompt: '妈妈叫不要晚睡。→ 엄마가 늦게 자지 ___ 하셨어요', promptEn: 'Mom told me not to sleep late. → 엄마가 늦게 자지 ___ 하셨어요',
          options: ['않으라고', '자고', '라고', '말라고'],
          answer: 3 as 0|1|2|3,
          explanation: '命令否定：-지 말라고 하다', explanationEn: 'Negative command: -지 말라고 하다',
        },
        {
          prompt: '今天看起来很幸福。→ 오늘 행복___ 보여요', promptEn: 'You look happy today. → 오늘 행복___ 보여요',
          options: ['해', '어', '아', '나'],
          answer: 0 as 0|1|2|3,
          explanation: '행복하다 → 행복해 보여요（하다 类→해）', explanationEn: '행복하다 → 행복해 보여요 (하다 type → 해)',
        },
        {
          prompt: '因为很晚了，快点走吧。→ 많이 늦었___ 빨리 가요', promptEn: 'Since it\'s very late, let\'s go quickly. → 많이 늦었___ 빨리 가요',
          options: ['아서', '어서', '으면', '으니까'],
          answer: 3 as 0|1|2|3,
          explanation: '늦다（有收音）→ 늦었으니까（后接命令/建议可以）', explanationEn: '늦다 (has final consonant) → 늦었으니까 (can be followed by commands/suggestions)',
        },
        {
          prompt: '外面好像在下雨。→ 밖에 비가 오___ 봐요', promptEn: 'It seems to be raining outside. → 밖에 비가 오___ 봐요',
          options: ['아', '나', '는다', '는가'],
          answer: 1 as 0|1|2|3,
          explanation: '动词 오다 → 오나 봐요', explanationEn: 'Verb 오다 → 오나 봐요',
        },
      ],
    },
    linkedGrammarIds: ['card-p11-l01', 'card-p11-l02', 'card-p11-l03', 'card-p11-l04', 'card-p11-l08'],
  },
];
