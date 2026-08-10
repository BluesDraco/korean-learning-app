import type { GrammarCard } from '@/types';

export const grammarCardsP28: GrammarCard[] = [
  // ── 第1课：-기(가) N하다 ──────────────────────────────────────
  {
    id: 'card-p28-l01',
    partNumber: 28,
    lessonNumber: 1,
    title: '-기(가) N하다',
    whatItDoes: '做……真是', whatItDoesEn: 'Doing... really is',
    whatItDoesBody: '「-기(가) + 形容词/名词하다」表示"做……是……的""……起来……"。把动词转成主语，后接形容词评价难易、感受。核心表达：어렵다/쉽다/힘들다/편하다/좋다 等。', whatItDoesBodyEn: '\'-기(가) + adjective/noun하다\' means \'doing... is...\', \'...to do\'. It turns a verb into a subject, followed by an adjective evaluating difficulty or feeling. Core expressions: 어렵다/쉽다/힘들다/편하다/좋다, etc.',
    structureNote: '动词词干 + -기(가) + 形容词/名词하다', structureNoteEn: 'Verb stem + -기(가) + adjective/noun하다',
    rulesNote: '常用搭配：-기 어렵다/쉽다/힘들다/편하다/좋다/싫다；助词 -가 可省略', rulesNoteEn: 'Common collocations: -기 어렵다/쉽다/힘들다/편하다/좋다/싫다; particle -가 can be omitted',
    structures: [
      {
        ko: '한국어는 배우기가 어려워요.',
        zh: '韩语学起来很难。', zhEn: 'Korean is hard to learn.',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '이 책은 읽기 쉬워요.',
        zh: '这本书读起来很容易。', zhEn: 'This book is easy to read.',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '읽기', role: 'verb' },
          { text: '쉬워요', role: 'verb' },
        ],
      },
      {
        ko: '혼자 살기가 편해요.',
        zh: '一个人住很方便。', zhEn: 'Living alone is convenient.',
        tokens: [
          { text: '혼자', role: 'plain' },
          { text: '살기가', role: 'verb' },
          { text: '편해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기(가) + 形容词하다', textEn: 'Verb stem + -기(가) + adjective 하다', examples: '배우다 → 배우기가 어렵다 / 읽다 → 읽기가 쉽다' },
      { type: 'rule', text: '助词 -가 常省略：-기 쉽다 / -기 어렵다', textEn: 'The particle -가 is often omitted: -기 쉽다 / -기 어렵다', examples: '읽기 쉬워요（读起来容易）= 읽기가 쉬워요（读起来容易，가 可省略）', examplesEn: '읽기 쉬워요 (easy to read) = 읽기가 쉬워요 (easy to read, 가 can be omitted)' },
      { type: 'usage', text: '常用搭配：-기 어렵다/쉽다/힘들다/편하다/좋다/싫다/불편하다', textEn: 'Common collocations: -기 어렵다/쉽다/힘들다/편하다/좋다/싫다/불편하다', examples: '이 문제는 풀기 어려워요.（这道题很难解。）', examplesEn: '이 문제는 풀기 어려워요. (This problem is hard to solve.)' },
      { type: 'usage', text: '感受类：-기 좋다/싫다/재미있다/재미없다', textEn: 'Feeling type: -기 좋다/싫다/재미있다/재미없다', examples: '이 노래는 듣기 좋아요.（这首歌很好听。）', examplesEn: '이 노래는 듣기 좋아요. (This song is nice to listen to.)' },
      { type: 'usage', text: '客观评价类：-기 쉽다/어렵다/편하다/불편하다', textEn: 'Objective evaluation type: -기 쉽다/어렵다/편하다/불편하다', examples: '이 신발은 신기 편해요.（这双鞋穿着舒服。）', examplesEn: '이 신발은 신기 편해요. (These shoes are comfortable to wear.)' },
      { type: 'compare', text: '-기(가) N하다 vs -기 위해서 → 前者是评价，后者是目的', textEn: '-기(가) N하다 vs -기 위해서 → the former is evaluation, the latter is purpose', examples: '배우기 쉬워요.(易学) / 배우기 위해 왔어요.(为学而来)', examplesEn: '배우기 쉬워요. (Easy to learn) / 배우기 위해 왔어요. (Came to learn)' },
      { type: 'note', text: '主语通常用 은/는 标记，评价对象', textEn: 'The subject is usually marked with 은/는, the object of evaluation', examples: '한국어는 배우기가 어려워요.（韩语学起来难。）', examplesEn: '한국어는 배우기가 어려워요. (Korean is hard to learn.)' },
      { type: 'compare', text: '中文"喜欢"别硬套：듣기 좋다＝好听/听着舒服，不是"喜欢听"（喜欢听＝듣기를 좋아하다）；하기 싫다＝不想做/讨厌做', textEn: 'Don\'t force the Chinese "like": 듣기 좋다 = sounds good/pleasant to listen to, not "like listening" (like listening = 듣기를 좋아하다); 하기 싫다 = don\'t want to do/hate doing', examples: '이 노래는 듣기 좋아요.（这歌好听。）/ 이 노래를 좋아해요.（喜欢这首歌。）', examplesEn: '이 노래는 듣기 좋아요. (This song sounds good.) / 이 노래를 좋아해요. (I like this song.)' },
      { type: 'note', text: '-기 把动词变成名词当主语（中文没有这种变形）：难易的主语是"做这件事"本身，人用 은/는 当话题', textEn: '-기 turns a verb into a noun used as the subject (Chinese has no such transformation): the subject of difficulty is "doing this thing" itself, and the person is the topic marked with 은/는', examples: '저는 한국어 배우기가 어려워요.（我觉得学韩语难。）', examplesEn: '저는 한국어 배우기가 어려워요. (I find learning Korean hard.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.',
        swapWords: ['배우다', '읽다', '쓰다', '말하다'],
      },
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '읽기', role: 'verb' },
          { text: '쉬워요', role: 'verb' },
        ],
        zh: '这本书读起来容易。', zhEn: 'This book is easy to read.',
        swapWords: ['쉽다', '어렵다', '재미있다', '지루하다'],
      },
      {
        wordBlocks: [
          { text: '혼자', role: 'plain' },
          { text: '살기가', role: 'verb' },
          { text: '편해요', role: 'verb' },
        ],
        zh: '一个人住方便。', zhEn: 'Living alone is convenient.',
        swapWords: ['살다', '지내다', '먹다', '자다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习', contextEn: 'to study', ko: '한국어는 배우기가 어려워요.', zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.' },
      { icon: '📖', context: '阅读', contextEn: 'reading', ko: '이 책은 읽기 쉬워요.', zh: '这本书读起来容易。', zhEn: 'This book is easy to read.' },
      { icon: '🏠', context: '生活', contextEn: 'Life', ko: '혼자 살기가 편해요.', zh: '一个人住方便。', zhEn: 'Living alone is convenient.' },
      { icon: '👟', context: '穿着', contextEn: 'wearing', ko: '이 신발은 신기 편해요.', zh: '这双鞋穿着舒服。', zhEn: 'These shoes are comfortable to wear.' },
      { icon: '🎵', context: '欣赏', contextEn: 'appreciate', ko: '이 노래는 듣기 좋아요.', zh: '这首歌听起来好。', zhEn: 'This song sounds good.' },
      { icon: '💼', context: '工作', contextEn: 'Work', ko: '지금 일은 하기 힘들어요.', zh: '现在这工作做起来累。', zhEn: 'This job is tiring to do now.' },
    ],
    mistakes: [
      { wrong: '한국어는 배워기가 어려워요', correct: '한국어는 배우기가 어려워요', note: '词干直接接 -기，不要变形', noteEn: 'Attach -기 directly to the stem, no changes' },
      { wrong: '읽는 것이 쉬워요', correct: '읽기(가) 쉬워요', note: '固定搭配是 -기 쉽다，不用 -는 것', noteEn: 'The fixed expression is -기 쉽다, not -는 것' },
      { wrong: '이 신발은 신기가 편이에요', correct: '이 신발은 신기가 편해요', note: '편하다 是形容词 → 편해요', noteEn: '편하다 is an adjective → 편해요' },
    ],
    quickTable: {
      title: '-기(가) N하다 常用搭配', titleEn: '-기(가) N하다 common collocations',
      headers: ['结构', '含义', '例子'],
      rows: [
        ['-기 어렵다/쉽다', '难/容易', '배우기 어려워요'],
        ['-기 힘들다/편하다', '累/舒适', '신기 편해요'],
        ['-기 좋다/싫다', '好（做）/不想做', '듣기 좋아요（好听）'],
        ['-기 재미있다/지루하다', '有趣/无聊', '읽기 재미있어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기(가) N하다 练习', titleEn: '-기(가) N하다 practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '한국어는 (배우다) 어려워요.',
          options: ['배워기가', '배우기가', '배운기가', '배울기가'],
          answer: 1,
          explanation: '词干 배우 直接接 -기 → 배우기가 어려워요。', explanationEn: 'Attach -기 directly to the stem 배우 → 배우기가 어려워요.',
        },
        {
          prompt: '이 책은 (읽다) 쉬워요.',
          options: ['읽는 것이', '읽기', '읽으면', '읽어서'],
          answer: 1,
          explanation: '固定搭配 -기 쉽다 → 읽기 쉬워요。', explanationEn: 'Fixed expression -기 쉽다 → 읽기 쉬워요.',
        },
        {
          prompt: '이 신발은 (신다) 편해요.',
          options: ['신는', '신기가', '신어서', '신어야'],
          answer: 1,
          explanation: '"穿着舒服"用 -기(가) 편하다 → 신기가 편해요。', explanationEn: 'For "comfortable to wear," use -기(가) 편하다 → 신기가 편해요.',
        },
        {
          prompt: '-기 어렵다 的语义是……', promptEn: 'The meaning of -기 어렵다 is...',
          options: ['为了……难', '……起来难', '做……的时候难', '因为难所以……'],
          answer: 1,
          explanation: '-기 어렵다 表示"……起来难/做……难"，把动词转主语后接评价。', explanationEn: '-기 어렵다 means "hard to do..." — it turns the verb into a subject and adds an evaluation.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"韩语学起来难""这鞋穿着舒服" —— 韩语这种"做……起来+形容词"的评价用 <b>-기(가) + 形容词하다</b>。<br>把动词转成主语，就能自由评价难易/舒适/喜好。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기 어렵다 vs -기 위해서</b><br>
    ・-기 + 形容词 → 评价<br>
    <span style="color:#89756e">배우기 어려워요.（学起来难）</span><br>
    ・-기 위해서 → 目的<br>
    <span style="color:#89756e">배우기 위해서 왔어요.（为学而来）</span>
  </div>
</div>`,
    compareLabel: '评价 vs 目的', compareLabelEn: 'Evaluation vs. Purpose',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기(가) N하다：做……起来</div>
  <div style="font-size:14px;color:#89756e">难易/舒适/喜好评价</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -기 어렵다 / 쉽다<br>
      -기 힘들다 / 편하다<br>
      -기 좋다 / 싫다<br>
      -기 재미있다 / 지루하다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      한국어는 배우기가 어려워요.<br>
      이 노래는 듣기 좋아요.<br>
      혼자 살기가 편해요.<br>
      이 신발은 신기 편해요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배워기가</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배우기가（词干+기）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">신기가 편이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">신기가 편해요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：얼마나 -는지/은지 모르다 ──────────────────────────────────────
  {
    id: 'card-p28-l02',
    partNumber: 28,
    lessonNumber: 2,
    title: '얼마나 -는지/은지 모르다',
    whatItDoes: '不知有多……', whatItDoesEn: 'You have no idea how...',
    whatItDoesBody: '「얼마나 + -는지/은지 + 모르다」表示"不知有多……""……得不得了"。用于强烈感叹某种程度之深，虽然字面是"不知道"，实际是强调"非常/极其"。', whatItDoesBodyEn: '「얼마나 + -는지/은지 + 모르다」means "you have no idea how..." or "...to an extreme degree." It\'s used to strongly exclaim about the depth of a degree; although literally it says "don\'t know," it actually emphasizes "very/extremely."',
    structureNote: '얼마나 + 动词现在 -는지 / 形容词有받침 -은지 / 无받침 -ㄴ지 + 모르다', structureNoteEn: '얼마나 + verb present -는지 / adjective with 받침 -은지 / without 받침 -ㄴ지 + 모르다',
    rulesNote: '动词现在 -는지；形容词 -은/ㄴ지；过去 -았/었는지；名词 -인지', rulesNoteEn: 'Verb present -는지; adjective -은/ㄴ지; past -았/었는지; noun -인지',
    structures: [
      {
        ko: '한국어가 얼마나 어려운지 몰라요.',
        zh: '韩语不知有多难。', zhEn: 'Korean is unbelievably hard.',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 얼마나 열심히 공부하는지 몰라요.',
        zh: '民秀不知有多用功学习。', zhEn: 'Min-su studies incredibly hard.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '열심히', role: 'plain' },
          { text: '공부하는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '어제 얼마나 웃었는지 몰라요.',
        zh: '昨天不知笑得有多厉害。', zhEn: 'We laughed so hard yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '얼마나', role: 'plain' },
          { text: '웃었는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：얼마나 -는지 모르다', textEn: 'Present tense verbs: 얼마나 -는지 모르다', examples: '공부하다 → 얼마나 공부하는지 몰라요' },
      { type: 'rule', text: '形容词：有받침 -은지 / 无받침 -ㄴ지', textEn: 'Adjectives: with 받침 -은지 / without 받침 -ㄴ지', examples: '어렵다 → 얼마나 어려운지 / 예쁘다 → 얼마나 예쁜지' },
      { type: 'rule', text: '过去：-았/었는지 모르다', textEn: 'Past tense: -았/었는지 모르다', examples: '얼마나 웃었는지 몰라요（笑得不知道有多厉害）', examplesEn: '얼마나 웃었는지 몰라요 (We laughed so hard, you wouldn\'t believe it.)' },
      { type: 'rule', text: '名词：얼마나 -인지 모르다', textEn: 'Nouns: 얼마나 -인지 모르다', examples: '얼마나 좋은 사람인지 몰라요（真不知道是多好的人）', examplesEn: '얼마나 좋은 사람인지 몰라요 (He\'s such a good person, you have no idea.)' },
      { type: 'usage', text: '字面"不知有多……"，实际是强烈感叹', textEn: 'Literally "don\'t know how much..." but actually a strong exclamation.', examples: '얼마나 좋은지 몰라요! = 好得不得了!', examplesEn: '얼마나 좋은지 몰라요! = It\'s incredibly good!' },
      { type: 'compare', text: '얼마나 -는지 모르다 vs -는지 모르다 → 前者感叹强调，后者是真的不知道', textEn: '얼마나 -는지 모르다 vs -는지 모르다 → the former is an emphatic exclamation, the latter means you genuinely don\'t know.', examples: '가는지 몰라요.(不知去否) / 얼마나 가는지 몰라요.(不知去了多少)', examplesEn: '가는지 몰라요. (I don\'t know if he\'s going.) / 얼마나 가는지 몰라요. (I don\'t know how much he goes.)' },
      { type: 'note', text: '常用来夸奖/抱怨/感叹强度', textEn: 'Often used to praise, complain, or express intensity.', examples: '얼마나 힘든지 몰라요.（真不知道有多累。）', examplesEn: '얼마나 힘든지 몰라요. (It\'s so tough, you have no idea.)' },
      { type: 'note', text: '这是固定感叹惯用型：모르다 不能换成 알다/알아요，也不能真去回答"到底多少"。整句＝中文"多……啊"', textEn: 'This is a fixed exclamatory pattern: 모르다 can\'t be replaced with 알다/알아요, and you can\'t actually answer "how much." The whole sentence equals "so... that you can\'t imagine" in Chinese.', examples: '얼마나 예쁜지 몰라요.（真不知道有多漂亮＝漂亮得不得了。）', examplesEn: '얼마나 예쁜지 몰라요. (She\'s so pretty, you wouldn\'t believe it.)' },
      { type: 'compare', text: '同一个 얼마나：疑问句里是"多久/多少/多么"（真提问）；这里是感叹（不提问）', textEn: 'The same 얼마나: in questions it means "how long/how much/how" (a real question); here it\'s an exclamation (not a question).', examples: '얼마나 걸려요?（要多久？疑问）/ 얼마나 먼지 몰라요.（不知道有多远＝远得很，感叹）', examplesEn: '얼마나 걸려요? (How long does it take? — question) / 얼마나 먼지 몰라요. (It\'s so far, you have no idea — exclamation.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '韩语不知有多难。', zhEn: 'Korean is unbelievably hard.',
        swapWords: ['어렵다', '재미있다', '유용하다', '복잡하다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '공부하는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '民秀不知多用功。', zhEn: 'Min-su studies so hard.',
        swapWords: ['공부하다', '일하다', '연습하다', '노력하다'],
      },
      {
        wordBlocks: [
          { text: '어제', role: 'time' },
          { text: '얼마나', role: 'plain' },
          { text: '웃었는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
        zh: '昨天笑得不知有多厉害。', zhEn: 'Yesterday I laughed so hard I couldn\'t stop.',
        swapWords: ['웃다', '울다', '놀라다', '기뻐하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '难度', contextEn: 'difficulty', ko: '한국어가 얼마나 어려운지 몰라요.', zh: '韩语不知有多难。', zhEn: 'Korean is unbelievably hard.' },
      { icon: '💪', context: '用功', contextEn: 'studious', ko: '민수가 얼마나 열심히 공부하는지 몰라요.', zh: '民秀不知多用功。', zhEn: 'Min-su studies so hard.' },
      { icon: '😂', context: '大笑', contextEn: 'laugh out loud', ko: '어제 얼마나 웃었는지 몰라요.', zh: '昨天不知笑得多厉害。', zhEn: 'Yesterday I laughed so much I can\'t even tell you.' },
      { icon: '😢', context: '伤心', contextEn: 'heartbroken', ko: '얼마나 슬픈지 몰라요.', zh: '不知有多伤心。', zhEn: 'I can\'t even tell you how sad I was.' },
      { icon: '💰', context: '贵', contextEn: 'Expensive', ko: '이 시계가 얼마나 비싼지 몰라요.', zh: '这表不知有多贵。', zhEn: 'This watch is so expensive you wouldn\'t believe it.' },
      { icon: '🌟', context: '好', contextEn: 'good', ko: '민수는 얼마나 좋은 사람인지 몰라요.', zh: '民秀是个多好的人啊。', zhEn: 'Min-su is such a good person.' },
    ],
    mistakes: [
      { wrong: '어렵는지', correct: '어려운지', note: '形容词冠形 -은/ㄴ，不用 -는', noteEn: 'Adjective modifier -은/ㄴ, not -는' },
      { wrong: '얼마나 공부한지', correct: '얼마나 공부하는지', note: '动词现在用 -는지，不用 -은/ㄴ지', noteEn: 'Verbs in present tense use -는지, not -은/ㄴ지' },
      { wrong: '얼마나 웃었지 몰라요', correct: '얼마나 웃었는지 몰라요', note: '固定为 -는/은지 모르다，不能省 -는', noteEn: 'Fixed as -는/은지 모르다, cannot omit -는' },
    ],
    quickTable: {
      title: '얼마나 -는지/은지 冠形', titleEn: '얼마나 -는지/은지 adnominal',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在', '얼마나 -는지', '얼마나 공부하는지'],
        ['形容词有받침', '얼마나 -은지', '얼마나 어려운지'],
        ['形容词无받침', '얼마나 -ㄴ지', '얼마나 예쁜지'],
        ['过去', '얼마나 -았/었는지', '얼마나 웃었는지'],
        ['名词', '얼마나 -인지', '얼마나 좋은 사람인지'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '얼마나 -는지/은지 综合', titleEn: '얼마나 -는지/은지 comprehensive',
      body: '选正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '한국어가 얼마나 (어렵다) 몰라요.',
          options: ['어렵는지', '어려운지', '어려울지', '어렵기지'],
          answer: 1,
          explanation: '어렵다 形容词有받침，用 -은지 → 어려운지。', explanationEn: '어렵다 is an adjective with 받침, so use -은지 → 어려운지.',
        },
        {
          prompt: '민수가 얼마나 (공부하다) 몰라요.',
          options: ['공부한지', '공부하는지', '공부할지', '공부하기지'],
          answer: 1,
          explanation: '공부하다 动词现在，用 -는지 → 공부하는지。', explanationEn: '공부하다 is a verb in present tense, so use -는지 → 공부하는지.',
        },
        {
          prompt: '어제 얼마나 (웃다) 몰라요.',
          options: ['웃는지', '웃은지', '웃었는지', '웃을지'],
          answer: 2,
          explanation: '"昨天笑"是过去，用 -았/었는지 → 웃었는지。', explanationEn: '"Laughed yesterday" is past tense, so use -았/었는지 → 웃었는지.',
        },
        {
          prompt: '얼마나 -는지 모르다 的语义是……', promptEn: 'The meaning of 얼마나 -는지 모르다 is...',
          options: ['真的不知道', '不知有多……(强烈感叹)', '不确定要不要', '推测可能性'],
          answer: 1,
          explanation: '얼마나 -는지 모르다 是强烈感叹"……得不得了"，不是真的不知道。', explanationEn: '얼마나 -는지 모르다 is a strong exclamation meaning "...so much that you can\'t believe it," not literally "I don\'t know."',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"韩语不知有多难""笑得不知多厉害" —— 韩语强烈感叹用 <b>얼마나 -는지/은지 모르다</b>。<br>字面是"不知道"，实际就是"非常/极其……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>字面 vs 实际</b><br>
    字面翻译："不知有多……"<br>
    实际语气：强烈感叹"极其/非常"<br>
    <span style="color:#89756e">얼마나 좋은지 몰라요! = 好得不得了!</span><br>
    <span style="color:#89756e">얼마나 힘든지 몰라요. = 累得不行。</span>
  </div>
</div>`,
    compareLabel: '不知道 = 极其', compareLabelEn: 'Don\'t know = extremely',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">얼마나 -는지 모르다：不知有多</div>
  <div style="font-size:14px;color:#89756e">强烈感叹表达</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는지</b>：공부하는지<br>
      形容词 → <b>-은/ㄴ지</b>：어려운지<br>
      过去 → <b>-았/었는지</b>：웃었는지<br>
      名词 → <b>-인지</b>：좋은 사람인지
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      夸奖：얼마나 좋은 사람인지 몰라요.<br>
      抱怨：얼마나 힘든지 몰라요.<br>
      惊叹：얼마나 비싼지 몰라요.<br>
      感激：얼마나 감사한지 몰라요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">어렵는지</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어려운지（形容词用 -은/ㄴ지）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">얼마나 웃었지 몰라요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">얼마나 웃었는지 몰라요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-다 못해 ──────────────────────────────────────
  {
    id: 'card-p28-l03',
    partNumber: 28,
    lessonNumber: 3,
    title: '-다 못해',
    whatItDoes: '甚至……到', whatItDoesEn: 'Even to the point of...',
    whatItDoesBody: '「-다 못해」表示"……到甚至……的地步""……以致于……"。前项达到某种程度后，导致更极端的后项。核心是"程度递进+超出常规"的强调。', whatItDoesBodyEn: '「-다 못해」means "to the point of even..." or "so much that..." The first clause reaches a certain degree, leading to a more extreme second clause. The core is an emphasis on "progression of degree + going beyond the norm."',
    structureNote: '形容词/动词词干 + -다 못해', structureNoteEn: 'Adjective/verb stem + -다 못해',
    rulesNote: '直接接词干，不看받침；后接更极端的状态/结果', rulesNoteEn: 'Attach directly to the stem, regardless of 받침; followed by a more extreme state/result',
    structures: [
      {
        ko: '하늘이 파랗다 못해 눈이 부실 정도예요.',
        zh: '天蓝到刺眼的程度。', zhEn: 'The sky is so blue it\'s blinding.',
        tokens: [
          { text: '하늘이', role: 'subject' },
          { text: '파랗다 못해', role: 'plain' },
          { text: '눈이 부실 정도예요', role: 'verb' },
        ],
      },
      {
        ko: '기다리다 못해 먼저 갔어요.',
        zh: '等不及了，先走了。', zhEn: 'I couldn\'t wait anymore, so I left first.',
        tokens: [
          { text: '기다리다 못해', role: 'verb' },
          { text: '먼저', role: 'plain' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '화가 나다 못해 눈물이 났어요.',
        zh: '气到掉眼泪。', zhEn: 'I was so angry I cried.',
        tokens: [
          { text: '화가', role: 'subject' },
          { text: '나다 못해', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '形容词/动词词干 + -다 못해，不看받침', textEn: 'Adjective/verb stem + -다 못해, regardless of 받침', examples: '파랗다 → 파랗다 못해 / 기다리다 → 기다리다 못해' },
      { type: 'usage', text: '语义1（形容词）：达到程度后引出更极端评价', textEn: 'Meaning 1 (adjective): after reaching a degree, leads to a more extreme evaluation', examples: '하늘이 파랗다 못해 눈부셔요.（天蓝得刺眼。）', examplesEn: '하늘이 파랗다 못해 눈부셔요. (The sky is so blue it\'s blinding.)' },
      { type: 'usage', text: '语义2（动词）：受不了以致于采取行动', textEn: 'Sense 2 (verb): Can\'t stand it, so you take action', examples: '기다리다 못해 먼저 갔어요.（等不下去才先走）', examplesEn: '기다리다 못해 먼저 갔어요. (Couldn\'t wait any longer, so I left first.)' },
      { type: 'usage', text: '语义3：情绪极致导致的反应', textEn: 'Sense 3: A reaction caused by extreme emotion', examples: '화가 나다 못해 눈물이 났어요.（气得都哭了。）', examplesEn: '화가 나다 못해 눈물이 났어요. (I was so angry I cried.)' },
      { type: 'compare', text: '-다 못해 vs -다가 → 前者程度递进，后者动作转变', textEn: '-다 못해 vs -다가 → The former shows escalating degree, the latter a shift in action', examples: '먹다 못해 토했다(吃到吐) / 먹다가 토했다(吃着吃着吐了)', examplesEn: '먹다 못해 토했다 (Ate until I threw up) / 먹다가 토했다 (Threw up while eating)' },
      { type: 'note', text: '常与"눈물이 나다/포기하다/쓰러지다"等极端反应搭配', textEn: 'Often pairs with extreme reactions like "눈물이 나다/포기하다/쓰러지다"', examples: '아프다 못해 쓰러졌어요.（疼得都倒下了。）', examplesEn: '아프다 못해 쓰러졌어요. (It hurt so much I collapsed.)' },
      { type: 'note', text: '前后主语可以是同一物/同一人的不同状态', textEn: 'The subject before and after can be the same thing/person in different states', examples: '슬프다 못해 웃음이 나요.（伤心到笑）', examplesEn: '슬프다 못해 웃음이 나요. (So sad I laugh.)' },
      { type: 'compare', text: '别被 못 骗了：这里的 -다 못해 不是"不能/做不到"（那是 못하다）。它表"到极致以致于"，是程度递进不是否定', textEn: 'Don\'t be fooled by 못: Here, -다 못해 doesn\'t mean "can\'t/not able to" (that\'s 못하다). It means "to the point of," showing escalation, not negation.', examples: '기다리다 못해 갔어요.（等到受不了才走＝去了，不是"不能等"）', examplesEn: '기다리다 못해 갔어요. (Waited until I couldn\'t take it, then left = I went, not "couldn\'t wait")' },
      { type: 'note', text: '偏书面/文艺的强调表达，日常口语更常说 너무……해서 或 -을 정도로', textEn: 'A more literary/artistic emphatic expression; in everyday speech, 너무……해서 or -을 정도로 is more common', examples: '너무 파래서 눈이 부셔요.（口语：蓝得刺眼。）', examplesEn: '너무 파래서 눈이 부셔요. (Colloquial: So blue it\'s dazzling.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '하늘이', role: 'subject' },
          { text: '파랗다', role: 'plain' },
          { text: '못해', role: 'verb' },
          { text: '눈부셔요', role: 'verb' },
        ],
        zh: '天蓝到刺眼。', zhEn: 'The sky is so blue it\'s dazzling.',
        swapWords: ['파랗다', '푸르다', '맑다', '깨끗하다'],
      },
      {
        wordBlocks: [
          { text: '기다리다', role: 'verb' },
          { text: '못해', role: 'verb' },
          { text: '먼저', role: 'plain' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '等不及了先走了。', zhEn: 'I couldn\'t wait any longer, so I left.',
        swapWords: ['기다리다', '참다', '견디다', '버티다'],
      },
      {
        wordBlocks: [
          { text: '화가', role: 'subject' },
          { text: '나다', role: 'verb' },
          { text: '못해', role: 'verb' },
          { text: '눈물이 났어요', role: 'verb' },
        ],
        zh: '气到掉眼泪。', zhEn: 'I was so angry I cried.',
        swapWords: ['화가 나다', '슬프다', '괴롭다', '답답하다'],
      },
    ],
    scenarios: [
      { icon: '💙', context: '天空', contextEn: 'sky', ko: '하늘이 파랗다 못해 눈이 부실 정도예요.', zh: '天蓝到刺眼。', zhEn: 'The sky is so blue it\'s dazzling.' },
      { icon: '⏰', context: '等待', contextEn: 'Wait', ko: '기다리다 못해 먼저 갔어요.', zh: '等不及了先走。', zhEn: 'Couldn\'t wait, so I left first.' },
      { icon: '😤', context: '气愤', contextEn: 'Furious', ko: '화가 나다 못해 눈물이 났어요.', zh: '气到掉眼泪。', zhEn: 'I was so angry I cried.' },
      { icon: '😴', context: '疲惫', contextEn: 'exhausted', ko: '피곤하다 못해 쓰러졌어요.', zh: '累到瘫倒。', zhEn: 'So tired I collapsed.' },
      { icon: '🍬', context: '味道', contextEn: 'taste', ko: '달다 못해 쓴맛이 나요.', zh: '甜到发苦。', zhEn: 'So sweet it\'s bitter.' },
      { icon: '❄️', context: '寒冷', contextEn: 'Cold', ko: '춥다 못해 몸이 떨려요.', zh: '冷到发抖。', zhEn: 'So cold I\'m shivering.' },
    ],
    mistakes: [
      { wrong: '파랗아 못해', correct: '파랗다 못해', note: '固定用 -다 못해，不做 -아/어 变形', noteEn: 'Always use -다 못해; don\'t conjugate to -아/어' },
      { wrong: '기다려 못해', correct: '기다리다 못해', note: '直接接词干原形 -다 못해', noteEn: 'Attach directly to the verb stem in its base form -다 못해' },
      { wrong: '슬프다 못하고', correct: '슬프다 못해', note: '固定是 -다 못해，不用 -다 못하고', noteEn: 'It\'s always -다 못해, not -다 못하고' },
    ],
    quickTable: {
      title: '-다 못해 用法', titleEn: '-다 못해 usage',
      headers: ['类型', '语义', '例子'],
      rows: [
        ['形容词', '程度极致导致新状态', '파랗다 못해 눈부시다'],
        ['动词', '受不了以致于采取行动', '기다리다 못해 먼저 갔다'],
        ['情绪', '情绪极致引发反应', '화가 나다 못해 눈물이 났다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-다 못해 综合练习', titleEn: '-다 못해 comprehensive practice',
      body: '选择正确表达', bodyEn: 'Choose the correct expression',
      questions: [
        {
          prompt: '하늘이 (파랗다) 눈이 부실 정도예요.',
          options: ['파래 못해', '파랗다 못해', '파란다 못해', '파랗아 못해'],
          answer: 1,
          explanation: '固定接词干原形 → 파랗다 못해。', explanationEn: 'Always attach to the stem\'s base form → 파랗다 못해.',
        },
        {
          prompt: '(기다리다) 먼저 갔어요.',
          options: ['기다리 못해', '기다려 못해', '기다리다 못해', '기다린 못해'],
          answer: 2,
          explanation: '-다 못해 直接接词干原形 → 기다리다 못해。', explanationEn: '-다 못해 attaches directly to the verb stem → 기다리다 못해.',
        },
        {
          prompt: '화가 (나다) 눈물이 났어요.',
          options: ['난 못해', '나 못해', '나다 못해', '나서 못해'],
          answer: 2,
          explanation: '-다 못해 → 나다 못해，表"气到极致引发眼泪"。', explanationEn: '-다 못해 → 나다 못해, meaning \'so angry that tears come out.\'',
        },
        {
          prompt: '-다 못해 表达的核心是……', promptEn: 'The core of -다 못해 is...',
          options: ['否定不能做', '程度递进到极端', '结果满意', '让步条件'],
          answer: 1,
          explanation: '-다 못해 = 达到某程度后引出更极端的状态或反应。', explanationEn: '-다 못해 = reaching a certain degree and then leading to a more extreme state or reaction.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"天蓝到刺眼""气到掉眼泪""等不及了先走" —— 韩语这种"程度极致引出更极端结果"用 <b>-다 못해</b>。<br>核心是"到了……的地步以致于……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-다 못해 vs -다가</b><br>
    ・-다 못해 → 程度递进"甚至到……"<br>
    <span style="color:#89756e">먹다 못해 토했다.（吃到吐）</span><br>
    ・-다가 → 动作转变"……着……"<br>
    <span style="color:#89756e">먹다가 토했다.（吃着吃着吐了）</span>
  </div>
</div>`,
    compareLabel: '-다 못해 vs -다가',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-다 못해：甚至……到</div>
  <div style="font-size:14px;color:#89756e">程度极致 · 引发更极端反应</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      形容词/动词词干 + <b>-다 못해</b><br>
      形容词：程度极致→新状态<br>
      动词：受不了→采取行动
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      파랗다 못해 눈부시다<br>
      기다리다 못해 먼저 가다<br>
      화가 나다 못해 눈물이 나다<br>
      피곤하다 못해 쓰러지다<br>
      달다 못해 쓰다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">파랗아 못해</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">파랗다 못해（直接词干+다）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">기다려 못해</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">기다리다 못해</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-을/ㄹ수록 ──────────────────────────────────────
  {
    id: 'card-p28-l04',
    partNumber: 28,
    lessonNumber: 4,
    title: '-을/ㄹ수록',
    whatItDoes: '越……越……', whatItDoesEn: 'The more..., the more...',
    whatItDoesBody: '「-을/ㄹ수록」表示"越……越……"，随着前项程度增加，后项程度也相应变化。常与"-으면 -을수록"搭配加强语气。', whatItDoesBodyEn: '「-을/ㄹ수록」means "the more..., the more..." As the degree of the first clause increases, the degree of the second clause changes accordingly. It\'s often paired with "-으면 -을수록" for emphasis.',
    structureNote: '词干：有받침 -을수록 / 无받침 -ㄹ수록 · 名词 -(이)ㄹ수록', structureNoteEn: 'Stem: with 받침 -을수록 / without 받침 -ㄹ수록 · noun -(이)ㄹ수록',
    rulesNote: '常见强调形："-으면 -을수록"（越……越……）；前后主语通常一致', rulesNoteEn: 'Common emphatic form: "-으면 -을수록" (the more..., the more...); subject is usually the same before and after',
    structures: [
      {
        ko: '한국어는 공부할수록 재미있어요.',
        zh: '韩语越学越有趣。', zhEn: 'The more you study Korean, the more interesting it gets.',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '공부할수록', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
      {
        ko: '보면 볼수록 예쁘네요.',
        zh: '越看越漂亮。', zhEn: 'The more you look, the prettier it gets.',
        tokens: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
      },
      {
        ko: '나이가 들수록 시간이 빨라져요.',
        zh: '年纪越大，时间过得越快。', zhEn: 'The older you get, the faster time seems to pass.',
        tokens: [
          { text: '나이가', role: 'subject' },
          { text: '들수록', role: 'verb' },
          { text: '시간이', role: 'subject' },
          { text: '빨라져요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침 → -을수록', textEn: 'With 받침 → -을수록', examples: '먹다 → 먹을수록 / 좋다 → 좋을수록' },
      { type: 'rule', text: '无받침 → -ㄹ수록', textEn: 'Without 받침 → -ㄹ수록', examples: '가다 → 갈수록 / 보다 → 볼수록' },
      { type: 'rule', text: '名词：-(이)ㄹ수록', textEn: 'Nouns: -(이)ㄹ수록', examples: '학생일수록 / 부자일수록' },
      { type: 'usage', text: '强调形："-으면 -을수록" = 越……越……', textEn: 'Emphatic form: "-으면 -을수록" = the more... the more...', examples: '보면 볼수록 예뻐요.（越看越美。）', examplesEn: '보면 볼수록 예뻐요. (The more you look, the prettier it is.)' },
      { type: 'usage', text: '前后动作/程度成正比或反比', textEn: 'The preceding and following actions/degrees are proportional or inversely proportional.', examples: '나이가 들수록 시간이 빨라져요.（越上年纪越觉得时间快。）', examplesEn: '나이가 들수록 시간이 빨라져요. (The older you get, the faster time feels.)' },
      { type: 'compare', text: '-을수록 vs -으면 → 后者是条件"如果"，前者是程度递进', textEn: '-을수록 vs -으면 → the latter is a condition \'if\', the former is a progressive degree.', examples: '먹으면 좋아요.(吃了就好) / 먹을수록 좋아요.(越吃越好)', examplesEn: '먹으면 좋아요. (It\'s good if you eat it.) / 먹을수록 좋아요. (The more you eat, the better.)' },
      { type: 'note', text: '常搭配"점점 더/갈수록"加强递进', textEn: 'Often paired with \'점점 더/갈수록\' to strengthen the progression.', examples: '갈수록 어려워져요.（越来越难。）', examplesEn: '갈수록 어려워져요. (It gets harder and harder.)' },
      { type: 'compare', text: '负迁移：中文"越A越B"有两个"越"，韩语只在前句用 -을수록，后句不再加标记（想加就用 더/점점）', textEn: 'Negative transfer: Chinese \'the more A, the more B\' has two \'more\'s, but Korean only uses -을수록 in the first clause, and doesn\'t add a marker in the second (if you want to, use 더/점점).', examples: '공부할수록 재미있어요.（越学越有趣，后句无"越"）/ 공부할수록 점점 더 재미있어요.', examplesEn: '공부할수록 재미있어요. (The more you study, the more interesting it is, no \'more\' in the second clause) / 공부할수록 점점 더 재미있어요.' },
      { type: 'note', text: '强调形 -으면 -을수록 必须重复同一个动词/形容词，不能换词', textEn: 'The emphatic form -으면 -을수록 must repeat the same verb/adjective, you can\'t switch words.', examples: '보면 볼수록（越看越）/ 알면 알수록（越了解越）', examplesEn: '보면 볼수록 (the more you look) / 알면 알수록 (the more you know)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '공부할수록', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '韩语越学越有趣。', zhEn: 'The more you study Korean, the more interesting it gets.',
        swapWords: ['공부하다', '연습하다', '배우다', '읽다'],
      },
      {
        wordBlocks: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
        zh: '越看越漂亮。', zhEn: 'The more you look, the prettier it gets.',
        swapWords: ['예쁘다', '멋있다', '귀엽다', '좋다'],
      },
      {
        wordBlocks: [
          { text: '나이가', role: 'subject' },
          { text: '들수록', role: 'verb' },
          { text: '시간이', role: 'subject' },
          { text: '빨라져요', role: 'verb' },
        ],
        zh: '年纪越大时间过得越快。', zhEn: 'The older you get, the faster time passes.',
        swapWords: ['빨라지다', '짧아지다', '느려지다', '길어지다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习', contextEn: 'to study', ko: '한국어는 공부할수록 재미있어요.', zh: '越学越有趣。', zhEn: 'The more you study, the more interesting it gets.' },
      { icon: '👀', context: '外观', contextEn: 'Appearance', ko: '보면 볼수록 예쁘네요.', zh: '越看越漂亮。', zhEn: 'The more you look, the prettier it gets.' },
      { icon: '⏰', context: '时间感', contextEn: 'sense of time', ko: '나이가 들수록 시간이 빨라져요.', zh: '年纪越大时间过得越快。', zhEn: 'The older you get, the faster time passes.' },
      { icon: '🍜', context: '味道', contextEn: 'taste', ko: '먹을수록 맛있어요.', zh: '越吃越好吃。', zhEn: 'The more you eat, the tastier it gets.' },
      { icon: '📈', context: '进步', contextEn: 'progress', ko: '연습할수록 실력이 늘어요.', zh: '越练实力越强。', zhEn: 'The more you practice, the stronger you get.' },
      { icon: '❤️', context: '感情', contextEn: 'feelings', ko: '만날수록 정이 들어요.', zh: '见面越多越有感情。', zhEn: 'The more you meet, the deeper the bond.' },
    ],
    mistakes: [
      { wrong: '가을수록', correct: '갈수록', note: '가다 无받침，用 -ㄹ수록', noteEn: '가다 has no batchim, use -ㄹ수록' },
      { wrong: '먹ㄹ수록', correct: '먹을수록', note: '먹다 有받침，用 -을수록', noteEn: '먹다 has batchim, use -을수록' },
      { wrong: '학생수록', correct: '학생일수록', note: '名词需加系词 이 变形', noteEn: 'Nouns require the copula 이 to be added' },
    ],
    quickTable: {
      title: '-을/ㄹ수록 一览', titleEn: '-을/ㄹ수록 Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有받침', '-을수록', '먹을수록, 좋을수록'],
        ['无받침', '-ㄹ수록', '갈수록, 볼수록'],
        ['名词', '-(이)ㄹ수록', '학생일수록'],
        ['强调形', '-으면 -을수록', '보면 볼수록'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ수록 变形', titleEn: '-을/ㄹ수록 Conjugation',
      body: '选正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '한국어는 (공부하다) 재미있어요.',
          options: ['공부할수록', '공부하을수록', '공부했수록', '공부는수록'],
          answer: 0,
          explanation: '공부하다 词干 공부하 无받침，用 -ㄹ수록 → 공부할수록。', explanationEn: '공부하다 stem 공부하 has no batchim, use -ㄹ수록 → 공부할수록.',
        },
        {
          prompt: '(먹다) 맛있어요.',
          options: ['먹수록', '먹ㄹ수록', '먹을수록', '먹었수록'],
          answer: 2,
          explanation: '먹다 有받침，用 -을수록 → 먹을수록。', explanationEn: '먹다 has batchim, use -을수록 → 먹을수록.',
        },
        {
          prompt: '(보다) 볼수록 예뻐요.',
          options: ['보', '보면', '봐서', '보니까'],
          answer: 1,
          explanation: '强调形是"-으면 -을수록" → 보면 볼수록。', explanationEn: 'The emphatic form is "-으면 -을수록" → 보면 볼수록.',
        },
        {
          prompt: '(학생) 열심히 공부해야 해요.',
          options: ['학생수록', '학생을수록', '학생일수록', '학생이수록'],
          answer: 2,
          explanation: '名词加 이 变形 → 학생이 + ㄹ수록 = 학생일수록。', explanationEn: 'Add 이 to the noun → 학생이 + ㄹ수록 = 학생일수록.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"越学越有趣""越看越漂亮" —— 韩语用 <b>-을/ㄹ수록</b>。<br>常用强调形 "-으면 -을수록" 加倍表达程度递进。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을수록 vs -으면</b><br>
    ・-을/ㄹ수록 → 程度递进"越……越……"<br>
    <span style="color:#89756e">먹을수록 맛있어요.（越吃越好吃）</span><br>
    ・-으면 → 条件"如果"<br>
    <span style="color:#89756e">먹으면 좋아요.（吃了就好）</span>
  </div>
</div>`,
    compareLabel: '程度递进 vs 条件', compareLabelEn: 'Progressive degree vs. condition',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ수록：越……越……</div>
  <div style="font-size:14px;color:#89756e">程度递进</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有받침 → <b>-을수록</b>：먹을수록<br>
      无받침 → <b>-ㄹ수록</b>：갈수록<br>
      名词 → <b>-(이)ㄹ수록</b>：학생일수록<br>
      强调形 → <b>-으면 -을수록</b>：보면 볼수록
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      공부할수록 재미있어요.<br>
      보면 볼수록 예뻐요.<br>
      나이가 들수록 시간이 빨라져요.<br>
      만날수록 정이 들어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을수록</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈수록（无받침 -ㄹ수록）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생수록</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일수록</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：오죽 -으면 ──────────────────────────────────────
  {
    id: 'card-p28-l05',
    partNumber: 28,
    lessonNumber: 5,
    title: '오죽 -으면',
    whatItDoes: '该多……', whatItDoesEn: 'How...',
    whatItDoesBody: '「오죽 -으면」是一种感叹反问："该多……啊""得多么……才……"。常与后句"-겠어요/-겠니"配合，表达对某程度深切的推想/共情。', whatItDoesBodyEn: '「오죽 -으면」 is an exclamatory rhetorical: "How..." "Just how... to...". Often paired with the following clause "-겠어요/-겠니" to express deep speculation/empathy about a degree.',
    structureNote: '오죽 + 动词/形容词 + -으면 + ...겠다', structureNoteEn: '오죽 + verb/adjective + -으면 + ...겠다',
    rulesNote: '"오죽" 本身是"多么/该多"的意思；结构 "오죽 -으면 -겠어요" 是固定感叹表达', rulesNoteEn: '"오죽" itself means "how/just how"; the structure "오죽 -으면 -겠어요" is a fixed exclamatory expression',
    structures: [
      {
        ko: '오죽 힘들면 그런 말을 했겠어요.',
        zh: '得多累啊才说出那种话。', zhEn: 'How exhausted must you be to say something like that?',
        tokens: [
          { text: '오죽', role: 'plain' },
          { text: '힘들면', role: 'verb' },
          { text: '그런 말을', role: 'object' },
          { text: '했겠어요', role: 'verb' },
        ],
      },
      {
        ko: '오죽 배고팠으면 그렇게 많이 먹었을까요.',
        zh: '得多饿啊才吃那么多。', zhEn: 'How hungry must you be to eat that much?',
        tokens: [
          { text: '오죽', role: 'plain' },
          { text: '배고팠으면', role: 'verb' },
          { text: '그렇게 많이', role: 'plain' },
          { text: '먹었을까요', role: 'verb' },
        ],
      },
      {
        ko: '오죽하면 눈물이 났겠어요?',
        zh: '得多难过才会掉眼泪呢？', zhEn: 'How sad must you be to shed tears?',
        tokens: [
          { text: '오죽하면', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '오죽 + 动词/形容词 + -(으)면', textEn: '오죽 + verb/adjective + -(으)면', examples: '힘들다 → 오죽 힘들면 / 아프다 → 오죽 아프면' },
      { type: 'rule', text: '后接 -겠다/-겠어요/-을까 表推想感叹', textEn: 'Followed by -겠다/-겠어요/-을까 to express conjecture and exclamation', examples: '오죽 힘들면 그랬겠어요.（要多难才会那样啊。）', examplesEn: '오죽 힘들면 그랬겠어요. (How hard must it have been for you to act that way?)' },
      { type: 'rule', text: '过去式：-았/었으면 + -았겠어요/-었을까요', textEn: 'Past tense: -았/었으면 + -았겠어요/-었을까요', examples: '오죽 배고팠으면 그렇게 먹었을까요.（得多饿才那样吃啊。）', examplesEn: '오죽 배고팠으면 그렇게 먹었을까요. (How hungry must you have been to eat like that?)' },
      { type: 'usage', text: '"오죽하면" 是常见凝缩形，直接表达"何等程度……才会"', textEn: '"오죽하면" is a common contracted form that directly expresses "to what extent... would"', examples: '오죽하면 그러겠어요?' },
      { type: 'usage', text: '带同情/理解/感叹的语气，不是简单陈述', textEn: 'Carries a tone of sympathy/understanding/exclamation, not a simple statement', examples: '오죽 답답하면 그렇게 소리쳤겠어요.（得多憋屈才那样喊啊。）', examplesEn: '오죽 답답하면 그렇게 소리쳤겠어요. (How stifled must you have felt to shout like that?)' },
      { type: 'note', text: '通常反问形，翻译"该多……啊"或"得多么……才……"', textEn: 'Usually a rhetorical question, translated as "how... must..." or "how... to..."', examples: '오죽 좋으면 하루종일 웃었겠어요?' },
      { type: 'note', text: '别把这里的 -(으)면 理解成"如果"。中文母语者常把"오죽 힘들면"读成"如果很累"，其实它是对既成事实的推想感叹："得多累才……"。', textEn: 'Don\'t interpret -(으)면 here as "if." Chinese speakers often read "오죽 힘들면" as "if very tired," but it\'s actually a conjectural exclamation about an established fact: "how tired must one be to..."', examples: '오죽 힘들면 그랬겠어요.（得多累才那样呢，不是"如果累"）', examplesEn: 'How exhausted must they have been to act that way (not "if tired").' },
      { type: 'compare', text: '오죽 vs 얼마나：얼마나 是中性的"多么/多少"，可以单纯提问；오죽 一定带同情/感叹，而且必须搭 -겠/-을까 推想，不能像 얼마나 那样单独发问。', textEn: '오죽 vs 얼마나: 얼마나 is neutral "how much/how many," used for simple questions; 오죽 always carries sympathy/exclamation and must pair with -겠/-을까 for inference, unlike 얼마나 which can stand alone.', examples: '얼마나 힘들었어요?（单纯问：有多累？）↔ 오죽 힘들면 그랬겠어요.（感叹：得多累才那样）', examplesEn: '얼마나 힘들었어요? (Simply asking: How tired were you?) ↔ 오죽 힘들면 그랬겠어요. (Exclaiming: How tired must they have been to act that way)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오죽', role: 'plain' },
          { text: '힘들면', role: 'verb' },
          { text: '그런 말을', role: 'object' },
          { text: '했겠어요', role: 'verb' },
        ],
        zh: '得多累才说出那种话。', zhEn: 'How exhausted must one be to say something like that.',
        swapWords: ['힘들다', '답답하다', '억울하다', '지치다'],
      },
      {
        wordBlocks: [
          { text: '오죽', role: 'plain' },
          { text: '배고팠으면', role: 'verb' },
          { text: '많이', role: 'plain' },
          { text: '먹었을까요', role: 'verb' },
        ],
        zh: '得多饿才吃那么多。', zhEn: 'How hungry must one be to eat that much.',
        swapWords: ['배고프다', '피곤하다', '지치다', '목마르다'],
      },
      {
        wordBlocks: [
          { text: '오죽하면', role: 'verb' },
          { text: '눈물이', role: 'subject' },
          { text: '났겠어요', role: 'verb' },
        ],
        zh: '得多难过才掉眼泪呢？', zhEn: 'How sad must one be to shed tears?',
        swapWords: ['눈물이 나다', '울다', '슬프다', '괴롭다'],
      },
    ],
    scenarios: [
      { icon: '💔', context: '共情', contextEn: 'Empathy', ko: '오죽 힘들면 그런 말을 했겠어요.', zh: '得多累才说那种话。', zhEn: 'How tired must one be to say that.' },
      { icon: '🍚', context: '推想', contextEn: 'Inference', ko: '오죽 배고팠으면 그렇게 많이 먹었을까요.', zh: '得多饿才吃那么多。', zhEn: 'How hungry must one be to eat that much.' },
      { icon: '😢', context: '感叹', contextEn: 'Exclamation', ko: '오죽하면 눈물이 났겠어요?', zh: '得多难过才掉泪呢？', zhEn: 'How upset must one be to cry?' },
      { icon: '😤', context: '气愤', contextEn: 'Furious', ko: '오죽 답답하면 그렇게 소리쳤겠어요.', zh: '得多憋屈才那么喊。', zhEn: 'How stifled must one be to shout like that.' },
      { icon: '🤝', context: '理解', contextEn: 'understand', ko: '오죽하면 그랬겠어요, 이해해요.', zh: '也是没办法才那样吧，我理解。', zhEn: 'They had no choice but to act that way, I get it.' },
      { icon: '😊', context: '好', contextEn: 'good', ko: '오죽 좋으면 하루종일 웃었겠어요?', zh: '得多开心才笑一整天呢？', zhEn: 'How happy must one be to smile all day?' },
    ],
    mistakes: [
      { wrong: '오죽 힘들어면', correct: '오죽 힘들면', note: '词干 힘들 有받침，加 -으면 → 힘들면（ㄹ 已在词干中）', noteEn: 'Stem 힘들 has batchim, add -으면 → 힘들면 (ㄹ already in stem)' },
      { wrong: '오죽 힘들면 그래요', correct: '오죽 힘들면 그러겠어요', note: '后句必须用推想感叹 -겠어요/-을까요', noteEn: 'The following clause must use inferential exclamation -겠어요/-을까요.' },
      { wrong: '오죽하다면', correct: '오죽하면', note: '오죽하면 是固定凝缩形，不用 -다면', noteEn: '오죽하면 is a fixed contracted form, not -다면.' },
    ],
    quickTable: {
      title: '오죽 -으면 结构', titleEn: '오죽 -으면 Structure',
      headers: ['要点', '规则', '例子'],
      rows: [
        ['前句', '오죽 + 词干 + -(으)면', '오죽 힘들면'],
        ['后句', '-겠어요/-을까요', '그랬겠어요'],
        ['过去', '-았/었으면 + -았겠어요', '배고팠으면 먹었을까요'],
        ['凝缩', '오죽하면', '오죽하면 그러겠어요?'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '오죽 -으면 综合练习', titleEn: '오죽 -으면 Comprehensive Practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '오죽 (힘들다) 그런 말을 했겠어요.',
          options: ['힘든면', '힘들면', '힘드면', '힘들으면'],
          answer: 1,
          explanation: '힘들다 词干 힘들，加 -면 → 힘들면。', explanationEn: '힘들다 stem is 힘들, add -면 → 힘들면.',
        },
        {
          prompt: '오죽 배고팠으면 그렇게 많이 (먹다) 까요.',
          options: ['먹', '먹었을', '먹으', '먹을'],
          answer: 1,
          explanation: '过去推想用 -았/었을까요 → 먹었을까요。', explanationEn: 'Past inference uses -았/었을까요 → 먹었을까요.',
        },
        {
          prompt: '(오죽) 눈물이 났겠어요?',
          options: ['오죽하다면', '오죽하면', '오죽으면', '오죽이면'],
          answer: 1,
          explanation: '固定凝缩形是 오죽하면。', explanationEn: 'The fixed contracted form is 오죽하면.',
        },
        {
          prompt: '오죽 -으면 后句应该用……', promptEn: 'After 오죽 -으면, the following clause should use...',
          options: ['-어요（陈述）', '-겠어요/-을까요（推想感叹）', '-으세요（命令）', '-읍시다（建议）'],
          answer: 1,
          explanation: '오죽 -으면 是感叹反问，后句必须是推想感叹 -겠어요/-을까요。', explanationEn: '오죽 -으면 is an exclamatory rhetorical question; the following clause must be inferential exclamation -겠어요/-을까요.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"得多累才说那种话""得多饿才吃那么多" —— 韩语这种带共情/推想的感叹反问用 <b>오죽 -으면 -겠어요</b>。<br>凝缩形 "오죽하면" 也超常用。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>오죽 -으면 结构</b><br>
    前句：오죽 + 形容词/动词 + -(으)면<br>
    后句：-겠어요 / -을까요（推想感叹）<br>
    <span style="color:#89756e">오죽 힘들면 그랬겠어요.（得多累才那样呢）</span><br>
    凝缩：오죽하면 -겠어요?
  </div>
</div>`,
    compareLabel: '感叹反问结构', compareLabelEn: 'Exclamatory rhetorical structure',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">오죽 -으면：该多……啊</div>
  <div style="font-size:14px;color:#89756e">感叹 · 共情 · 推想反问</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心结构</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句 → 오죽 + 词干 + <b>-(으)면</b><br>
      后句 → <b>-겠어요 / -을까요</b>（推想感叹）<br>
      凝缩 → <b>오죽하면</b> = "该多……才会"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型语气</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      共情：오죽하면 그랬겠어요, 이해해요.<br>
      推想：오죽 배고팠으면 그렇게 먹었을까요.<br>
      感叹：오죽 좋으면 하루종일 웃었겠어요?
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오죽 힘들면 그래요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오죽 힘들면 그러겠어요（后句必须推想）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오죽하다면</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">오죽하면（固定凝缩形）</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：-기(는) 하다 深化 ──────────────────────────────────────
  {
    id: 'card-p28-l06',
    partNumber: 28,
    lessonNumber: 6,
    title: '-기(는) 하다 深化', titleEn: '-기(는) 하다 Deep Dive',
    whatItDoes: '虽然……但', whatItDoesEn: 'Although... but',
    whatItDoesBody: '「-기(는) 하다」表示"虽然……但""……倒是……"。前项承认某事实，后接转折或补充。是让步语气，常与 -지만/-는데 搭配。', whatItDoesBodyEn: '「-기(는) 하다」 means "although... but" "...is... though". The first part acknowledges a fact, followed by a contrast or addition. It\'s a concessive tone, often paired with -지만/-는데.',
    structureNote: '动词/形容词词干 + -기(는) 하다 · 名词 + 이기(는) 하다', structureNoteEn: 'Verb/adjective stem + -기(는) 하다 · Noun + 이기(는) 하다',
    rulesNote: '常用形式：-기는 하다 / -기는 하지만 / -기는 한데；作让步转折', rulesNoteEn: 'Common forms: -기는 하다 / -기는 하지만 / -기는 한데; used for concession/contrast',
    structures: [
      {
        ko: '먹기는 하는데 맛이 없어요.',
        zh: '吃倒是吃，但不好吃。', zhEn: 'It\'s edible, but not tasty.',
        tokens: [
          { text: '먹기는 하는데', role: 'verb' },
          { text: '맛이 없어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어가 재미있기는 한데 어려워요.',
        zh: '韩语有趣是有趣，但难。', zhEn: 'Korean is interesting, but hard.',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있기는 한데', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 오기는 하지만 늦을 거예요.',
        zh: '民秀虽然会来，但会晚。', zhEn: 'Minsu will come, but he\'ll be late.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '오기는 하지만', role: 'verb' },
          { text: '늦을 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -기(는) 하다', textEn: 'Verb/Adjective stem + -기(는) 하다', examples: '먹다 → 먹기는 하다 / 좋다 → 좋기는 하다' },
      { type: 'rule', text: '名词 + 이기(는) 하다', textEn: 'Noun + 이기(는) 하다', examples: '학생이기는 하다（是学生倒是学生。）', examplesEn: '학생이기는 하다 (It\'s true that he\'s a student.)' },
      { type: 'rule', text: '-기는 하는데 / -기는 하지만 → 常见让步转折', textEn: '-기는 하는데 / -기는 하지만 → Common concession/contrast', examples: '가기는 하지만 늦게 갈 거예요.（去是去，但会晚到。）', examplesEn: '가기는 하지만 늦게 갈 거예요. (I\'ll go, but I\'ll arrive late.)' },
      { type: 'usage', text: '前句承认事实，后句加保留、限制、转折', textEn: 'The first clause acknowledges a fact, the second adds a reservation, limitation, or contrast', examples: '재미있기는 한데 어려워요.（有意思是有意思，但难。）', examplesEn: '재미있기는 한데 어려워요. (It\'s interesting, but it\'s hard.)' },
      { type: 'usage', text: '语气比 -지만 更强调"承认" + "但是"', textEn: 'The tone emphasizes "admission" + "but" more than -지만', examples: '오기는 하는데 시간이 오래 걸려요.（来是来，但要花很久。）', examplesEn: '오기는 하는데 시간이 오래 걸려요. (He comes, but it takes a long time.)' },
      { type: 'compare', text: '-기는 하다 vs -지만 → 前者带承认让步语气，后者纯转折', textEn: '-기는 하다 vs -지만 → The former has an admitting/conceding tone, the latter is a pure contrast', examples: '오지만 늦어요(转折) / 오기는 하는데 늦어요(承认+但)', examplesEn: '오지만 늦어요 (contrast) / 오기는 하는데 늦어요 (admission + but)' },
      { type: 'note', text: '"-기는요" 是缩略形，常用于回答表委婉否认', textEn: '"-기는요" is a shortened form, often used in replies to express polite denial', examples: '"잘하시네요." - "잘하기는요."（哪里/也谈不上）', examplesEn: '"잘하시네요." - "잘하기는요." (Not at all / I wouldn\'t say that.)' },
      { type: 'note', text: '时态、否定都挂在后面的 하다 上，前面的 -기 不变形。中文母语者常把"了"往前塞成 먹었기는 —— 错。过去要说 먹기는 했다。', textEn: 'Tense and negation attach to the following 하다; the preceding -기 doesn\'t change. Chinese speakers often wrongly insert "了" before it as 먹었기는 — wrong. For the past, say 먹기는 했다.', examples: '가기는 했는데 늦었어요.（去是去了，但迟到了）', examplesEn: '가기는 했는데 늦었어요. (I did go, but I was late.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '먹기는', role: 'verb' },
          { text: '하는데', role: 'verb' },
          { text: '맛이', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '吃倒是吃但不好吃。', zhEn: 'I do eat it, but it\'s not tasty.',
        swapWords: ['먹다', '마시다', '읽다', '보다'],
      },
      {
        wordBlocks: [
          { text: '한국어가', role: 'subject' },
          { text: '재미있기는', role: 'plain' },
          { text: '한데', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '有趣是有趣但难。', zhEn: 'It\'s interesting, but it\'s hard.',
        swapWords: ['재미있다', '유용하다', '흥미롭다', '좋다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '오기는', role: 'verb' },
          { text: '하지만', role: 'verb' },
          { text: '늦을 거예요', role: 'verb' },
        ],
        zh: '民秀会来但会晚。', zhEn: 'Minsu will come, but he\'ll be late.',
        swapWords: ['오다', '가다', '나가다', '들르다'],
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '味道', contextEn: 'taste', ko: '먹기는 하는데 맛이 없어요.', zh: '吃倒吃但不好吃。', zhEn: 'I do eat it, but it\'s not tasty.' },
      { icon: '📚', context: '学习', contextEn: 'to study', ko: '한국어가 재미있기는 한데 어려워요.', zh: '有趣是有趣但难。', zhEn: 'It\'s interesting, but it\'s hard.' },
      { icon: '⏰', context: '延迟', contextEn: 'delay', ko: '민수가 오기는 하지만 늦을 거예요.', zh: '来是会来但会晚。', zhEn: 'He\'ll come, but he\'ll be late.' },
      { icon: '👍', context: '委婉否认', contextEn: 'Polite denial', ko: '잘하기는요, 아직 부족해요.', zh: '哪里啊，还差得远。', zhEn: 'Not at all, I\'m far from it.' },
      { icon: '💰', context: '价格', contextEn: 'price', ko: '싸기는 한데 품질이 별로예요.', zh: '便宜是便宜但质量一般。', zhEn: 'It\'s cheap, but the quality is so-so.' },
      { icon: '🎨', context: '外观', contextEn: 'Appearance', ko: '예쁘기는 하지만 너무 화려해요.', zh: '漂亮是漂亮但太花哨。', zhEn: 'It\'s pretty, but too flashy.' },
    ],
    mistakes: [
      { wrong: '먹는 하는데', correct: '먹기는 하는데', note: '固定为 -기(는) 하다，不用 -는', noteEn: 'Fixed as -기(는) 하다, not -는' },
      { wrong: '먹기 한데', correct: '먹기는 한데', note: '让步语气需带助词 -는', noteEn: 'The concessive tone requires the particle -는' },
      { wrong: '한국어가 재미있기는 해서 어려워요', correct: '한국어가 재미있기는 한데 어려워요', note: '让步转折用 -기는 한데/하지만，不用 -해서', noteEn: 'For concessive contrast, use -기는 한데/하지만, not -해서' },
      { wrong: '먹었기는 하는데', correct: '먹기는 했는데', note: '过去式加在 하다 上（했-），不加在前面的 -기 上', noteEn: 'The past tense is added to 하다 (했-), not to the preceding -기' },
    ],
    quickTable: {
      title: '-기(는) 하다 变体', titleEn: '-기(는) 하다 Variants',
      headers: ['形式', '用法', '例子'],
      rows: [
        ['-기는 하다', '基本承认', '먹기는 해요'],
        ['-기는 하지만', '让步转折', '오기는 하지만 늦어요'],
        ['-기는 한데', '柔和转折', '재미있기는 한데'],
        ['-기는요', '委婉否认', '"잘하시네" - "잘하기는요"'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기(는) 하다 综合', titleEn: '-기(는) 하다 Comprehensive',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '먹 (하는데) 맛이 없어요.',
          options: ['먹기', '먹기는', '먹으면', '먹어서'],
          answer: 1,
          explanation: '让步语气用 -기는 → 먹기는 하는데。', explanationEn: 'Use -기는 for concession → 먹기는 하는데.',
        },
        {
          prompt: '한국어가 재미있기는 (한데/하다) 어려워요.',
          options: ['한다', '해서', '한데', '해요'],
          answer: 2,
          explanation: '柔和转折用 -기는 한데 → 재미있기는 한데 어려워요。', explanationEn: 'Use -기는 한데 for soft contrast → 재미있기는 한데 어려워요.',
        },
        {
          prompt: '"잘하시네요." → "(委婉否认)"', promptEn: '"잘하시네요." → "(polite denial)"',
          options: ['잘해요', '잘하기는요', '잘하기 해요', '잘하겠어요'],
          answer: 1,
          explanation: '委婉否认/自谦用 -기는요 → 잘하기는요。', explanationEn: 'Use -기는요 for polite denial/self-deprecation → 잘하기는요.',
        },
        {
          prompt: '-기는 하지만 的核心语气是……', promptEn: 'The core nuance of -기는 하지만 is...',
          options: ['纯转折', '承认事实+转折保留', '完全否定', '委婉命令'],
          answer: 1,
          explanation: '-기는 하지만 是"承认事实但……"，比 -지만 多了让步承认语气。', explanationEn: '-기는 하지만 means "acknowledging the fact but...", adding a concessive acknowledgment that -지만 lacks.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"吃倒是吃但不好吃""来是会来但会晚" —— 韩语这种"承认+让步转折"用 <b>-기(는) 하다</b>。<br>比 -지만 多了一层"我承认……"的语气。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기(는) 하다 vs -지만</b><br>
    ・-지만 → 单纯转折"但是"<br>
    <span style="color:#89756e">오지만 늦어요.（来但晚）</span><br>
    ・-기는 하다 → 承认+转折"确实……但"<br>
    <span style="color:#89756e">오기는 하는데 늦어요.（来是会来但晚）</span>
  </div>
</div>`,
    compareLabel: '纯转折 vs 承认让步', compareLabelEn: 'Pure contrast vs. concessive acknowledgment',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기(는) 하다：虽然……但</div>
  <div style="font-size:14px;color:#89756e">承认让步 + 转折</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四大变体</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-기는 하다</b>：基本承认 → 먹기는 해요<br>
      <b>-기는 하지만</b>：让步转折 → 오기는 하지만<br>
      <b>-기는 한데</b>：柔和转折 → 재미있기는 한데<br>
      <b>-기는요</b>：委婉否认 → "잘하기는요"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      먹기는 하는데 맛이 없어요.<br>
      싸기는 한데 품질이 별로예요.<br>
      예쁘기는 하지만 너무 화려해요.<br>
      "잘하시네" - "잘하기는요."
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹는 하는데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹기는 하는데（-기는，不是 -는）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">재미있기는 해서</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재미있기는 한데（让步转折）</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：-고말고요 ──────────────────────────────────────
  {
    id: 'card-p28-l07',
    partNumber: 28,
    lessonNumber: 7,
    title: '-고말고요',
    whatItDoes: '当然……了', whatItDoesEn: 'Of course...',
    whatItDoesBody: '「-고말고요 / -고말고」表示"当然……了""那还用说""……不用说"。用于强烈肯定/赞同对方的话，语气热情、直接、口语化。相当于中文的"当然啊""必须的"。', whatItDoesBodyEn: '「-고말고요 / -고말고」 means "of course..." "that goes without saying" "needless to say". Used to strongly affirm/agree with the other person, with a warm, direct, colloquial tone. Equivalent to "of course" "absolutely".',
    structureNote: '动词/形容词词干 + -고말고요', structureNoteEn: 'Verb/adjective stem + -고말고요',
    rulesNote: '直接接词干，不看받침；只用于口语回应；名词用 -이고말고요', rulesNoteEn: 'Attach directly to the stem, regardless of batchim; only used in spoken responses; for nouns use -이고말고요',
    structures: [
      {
        ko: '"영화 재미있었어요?" "재미있고말고요."',
        zh: '"电影有趣吗？" "当然有趣啦。"', zhEn: '"Is the movie interesting?" "Of course it is."',
        tokens: [
          { text: '재미있고말고요', role: 'verb' },
        ],
      },
      {
        ko: '"내일 오실 거예요?" "가고말고요."',
        zh: '"明天会来吗？" "当然去啊。"', zhEn: '"Will you come tomorrow?" "Of course I will."',
        tokens: [
          { text: '가고말고요', role: 'verb' },
        ],
      },
      {
        ko: '"김치 좋아하세요?" "좋아하고말고요."',
        zh: '"喜欢泡菜吗？" "当然喜欢了。"', zhEn: '"Do you like kimchi?" "Of course I do."',
        tokens: [
          { text: '좋아하고말고요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -고말고요', textEn: 'Verb/adjective stem + -고말고요', examples: '가다 → 가고말고요 / 좋다 → 좋고말고요' },
      { type: 'rule', text: '过去 → -았/었고말고요', textEn: 'Past → -았/었고말고요', examples: '먹었고말고요 / 좋았고말고요' },
      { type: 'rule', text: '名词 → -이고말고요', textEn: 'Noun → -이고말고요', examples: '학생이고말고요' },
      { type: 'usage', text: '仅用于口语，作强烈肯定回答', textEn: 'Used only in spoken language, as a strong affirmative response', examples: '"맛있어요?" - "맛있고말고요."' },
      { type: 'usage', text: '非敬语用 -고말고', textEn: 'Use -고말고 in informal speech', examples: '"밥 먹었어?" - "먹었고말고."' },
      { type: 'compare', text: '-고말고요 vs 그럼요 → 语义相同，都表"当然"', textEn: '-고말고요 vs 그럼요 → same meaning, both express "of course"', examples: '"가실 거예요?" - "가고말고요." = "그럼요, 가요."' },
      { type: 'note', text: '不用于陈述句，只作应答', textEn: 'Not used in declarative sentences, only as a response', examples: '(✗) 저는 가고말고요 시장에.（错误说法：고말고요 只作应答，不能这样接宾语作陈述句）', examplesEn: '(✗) 저는 가고말고요 시장에. (Incorrect: 고말고요 is only a response, cannot be used this way with an object in a declarative sentence)' },
      { type: 'compare', text: '这里的 -고 跟你学过的连接词尾 -고（"……而且……"）没关系，是一个整体固定词尾 -고말고요，不能拆开理解。别看到 -고 就以为要接下一个动作。', textEn: 'The -고 here is unrelated to the connective ending -고 ("...and...") you learned; it\'s a fixed ending -고말고요 as a whole, not to be broken apart. Don\'t assume -고 means the next action follows.', examples: '먹고 자요（先吃再睡，连接）↔ 먹고말고요（当然吃啦，应答，整体一个词）', examplesEn: '먹고 자요 (eat then sleep, connective) ↔ 먹고말고요 (of course I\'ll eat, response, one word)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '영화가', role: 'subject' },
          { text: '재미있고말고요', role: 'verb' },
        ],
        zh: '电影当然有趣啦。', zhEn: 'The movie is of course interesting.',
        swapWords: ['재미있다', '좋다', '멋있다', '유익하다'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '가고말고요', role: 'verb' },
        ],
        zh: '明天当然去啊。', zhEn: 'Of course I\'ll go tomorrow.',
        swapWords: ['가다', '오다', '만나다', '참석하다'],
      },
      {
        wordBlocks: [
          { text: '김치를', role: 'object' },
          { text: '좋아하고말고요', role: 'verb' },
        ],
        zh: '当然喜欢泡菜了。', zhEn: 'Of course I like kimchi.',
        swapWords: ['좋아하다', '먹다', '즐기다', '사랑하다'],
      },
    ],
    scenarios: [
      { icon: '🎬', context: '肯定', contextEn: 'certainly', ko: '"재미있어요?" "재미있고말고요."', zh: '当然有趣啦。', zhEn: 'Of course it\'s fun.' },
      { icon: '📅', context: '答应', contextEn: 'to promise', ko: '"오실 거예요?" "가고말고요."', zh: '当然去啊。', zhEn: 'Of course I\'ll go.' },
      { icon: '🥬', context: '喜好', contextEn: 'preference', ko: '"김치 좋아하세요?" "좋아하고말고요."', zh: '当然喜欢了。', zhEn: 'Of course I like it.' },
      { icon: '👨‍🎓', context: '身份', contextEn: 'Identity', ko: '"학생이에요?" "학생이고말고요."', zh: '当然是学生啦。', zhEn: 'Of course I\'m a student.' },
      { icon: '💪', context: '能力', contextEn: 'ability', ko: '"할 수 있어요?" "할 수 있고말고요."', zh: '当然能做到。', zhEn: 'Of course I can do it.' },
      { icon: '🤝', context: '同意', contextEn: 'Agreement', ko: '"동의하세요?" "동의하고말고요."', zh: '当然同意了。', zhEn: 'Of course I agree.' },
    ],
    mistakes: [
      { wrong: '가는고말고요', correct: '가고말고요', note: '直接接词干 -고말고요，不用 -는', noteEn: 'Attach directly to the stem with -고말고요, not -는' },
      { wrong: '가고말고요, 시장에 가요', correct: '가고말고요.', note: '-고말고요 只作应答，不接补足语句', noteEn: '-고말고요 is only used in responses, not with complements' },
      { wrong: '학생고말고요', correct: '학생이고말고요', note: '名词需加系词 이', noteEn: 'Nouns require the copula 이' },
    ],
    quickTable: {
      title: '-고말고요 用法', titleEn: '-고말고요 Usage',
      headers: ['结构', '用法', '例子'],
      rows: [
        ['-고말고요', '敬语回答', '가고말고요'],
        ['-고말고', '半语/非敬语', '먹었고말고'],
        ['-이고말고요', '名词回答', '학생이고말고요'],
        ['过去', '-았/었고말고요', '먹었고말고요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-고말고요 综合', titleEn: '-고말고요 Comprehensive',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '"영화 재미있었어요?" → "재미있(고말고요)."',
          options: ['재미있는고말고요', '재미있고말고요', '재미있는 고말고요', '재미있으고말고요'],
          answer: 1,
          explanation: '直接接词干 -고말고요 → 재미있고말고요。', explanationEn: 'Attach directly to the stem -고말고요 → 재미있고말고요.',
        },
        {
          prompt: '"학생이에요?" → "(학생) 고말고요."',
          options: ['학생', '학생은', '학생이', '학생을'],
          answer: 2,
          explanation: '名词加系词 이 + 고말고요 → 학생이고말고요。', explanationEn: 'Noun + copula 이 + 고말고요 → 학생이고말고요.',
        },
        {
          prompt: '"어제 밥 먹었어?" → "(먹다) 고말고."（半语）', promptEn: '"어제 밥 먹었어?" → "(먹다) 고말고." (informal)',
          options: ['먹', '먹었', '먹고', '먹으'],
          answer: 1,
          explanation: '过去时用 -았/었고말고 → 먹었고말고。', explanationEn: 'Past tense uses -았/었고말고 → 먹었고말고.',
        },
        {
          prompt: '-고말고요 的语义是……', promptEn: 'The meaning of -고말고요 is...',
          options: ['也许可以', '也不错', '当然/那还用说', '不一定'],
          answer: 2,
          explanation: '-고말고요 表强烈肯定"当然""那还用说"，只作口语应答。', explanationEn: '-고말고요 expresses strong affirmation, "of course" or "needless to say," used only in spoken responses.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"当然啦！""那还用说！" —— 韩语强烈肯定的口语应答用 <b>-고말고요</b>。<br>它只作应答，不能陈述使用；名词版加 이 → -이고말고요。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-고말고요 vs 그럼요</b><br>
    语义相同："当然/那还用说"<br>
    ・-고말고요 → 强调具体动作/状态<br>
    <span style="color:#89756e">"가실 거죠?" "가고말고요."</span><br>
    ・그럼요 → 简短肯定<br>
    <span style="color:#89756e">"가실 거죠?" "그럼요."</span>
  </div>
</div>`,
    compareLabel: '-고말고요 vs 그럼요',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-고말고요：当然……</div>
  <div style="font-size:14px;color:#89756e">口语强烈肯定应答</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词/形容词 → 词干 + <b>-고말고요</b><br>
      过去 → <b>-았/었고말고요</b><br>
      名词 → <b>-이고말고요</b><br>
      半语 → <b>-고말고</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型对话</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      "가실 거예요?" → "가고말고요."<br>
      "재미있어요?" → "재미있고말고요."<br>
      "학생이에요?" → "학생이고말고요."<br>
      "할 수 있어요?" → "할 수 있고말고요."
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가는고말고요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가고말고요（直接词干+고말고요）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생고말고요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이고말고요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：-을/ㄹ 따름이다 ──────────────────────────────────────
  {
    id: 'card-p28-l08',
    partNumber: 28,
    lessonNumber: 8,
    title: '-을/ㄹ 따름이다',
    whatItDoes: '只是……而已', whatItDoesEn: 'just... that\'s all',
    whatItDoesBody: '「-을/ㄹ 따름이다」表示"只是……而已""不过是……"。用于强调"没有其他，仅此而已"的心情。语感书面正式，常用于自谦、遗憾、无奈、感激的表达。', whatItDoesBodyEn: 'The pattern \'-을/ㄹ 따름이다\' means \'just... that\'s all\' or \'merely...\'. It emphasizes the feeling of \'nothing else, just this\'. It has a formal, written tone and is often used in expressions of humility, regret, helplessness, or gratitude.',
    structureNote: '动词/形容词词干：有받침 -을 따름이다 / 无받침 -ㄹ 따름이다', structureNoteEn: 'Verb/Adjective stem: with batchim -을 따름이다 / without batchim -ㄹ 따름이다',
    rulesNote: '"따름" 意为"仅仅/只是"；-을/ㄹ 따름이다 是固定搭配；名词 -(이)ㄹ 따름이다', rulesNoteEn: '\'따름\' means \'merely/just\'; -을/ㄹ 따름이다 is a fixed expression; for nouns, use -(이)ㄹ 따름이다',
    structures: [
      {
        ko: '그저 감사할 따름이에요.',
        zh: '只是感激而已。', zhEn: 'It\'s just gratitude.',
        tokens: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
      },
      {
        ko: '제 할 일을 했을 따름이에요.',
        zh: '只是做了本分而已。', zhEn: 'I just did my duty.',
        tokens: [
          { text: '제 할 일을', role: 'object' },
          { text: '했을', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
      },
      {
        ko: '그저 부끄러울 따름입니다.',
        zh: '只是感到惭愧而已。', zhEn: 'I just feel ashamed.',
        tokens: [
          { text: '그저', role: 'plain' },
          { text: '부끄러울', role: 'plain' },
          { text: '따름입니다', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침 → -을 따름이다', textEn: 'With batchim → -을 따름이다', examples: '먹다 → 먹을 따름이다 / 좋다 → 좋을 따름이다' },
      { type: 'rule', text: '无받침 → -ㄹ 따름이다', textEn: 'Without batchim → -ㄹ 따름이다', examples: '가다 → 갈 따름이다 / 하다 → 할 따름이다' },
      { type: 'rule', text: '过去 → -았/었을 따름이다', textEn: 'Past → -았/었을 따름이다', examples: '갔을 따름이다 / 했을 따름이다' },
      { type: 'rule', text: '名词 → -(이)ㄹ 따름이다', textEn: 'Noun → -(이)ㄹ 따름이다', examples: '학생일 따름이다（只不过是个学生罢了。）', examplesEn: '학생일 따름이다 (Just a student, that\'s all.)' },
      { type: 'usage', text: '强调"没别的，只有这个"，语气委婉正式', textEn: 'Emphasizes \'nothing else, only this\' — polite and formal in tone', examples: '감사할 따름이에요.（只是心怀感激）', examplesEn: '감사할 따름이에요. (I\'m just grateful.)' },
      { type: 'usage', text: '常用情感表达：감사할 / 부끄러울 / 안타까울 / 죄송할', textEn: 'Common emotional expressions: 감사할 / 부끄러울 / 안타까울 / 죄송할', examples: '죄송할 따름입니다.（只有满心歉意。）', examplesEn: '죄송할 따름입니다. (I\'m deeply sorry.)' },
      { type: 'compare', text: '-을 따름이다 vs -을 뿐이다 → 语义几乎相同，前者更正式书面', textEn: '-을 따름이다 vs -을 뿐이다 → Nearly identical in meaning; the former is more formal and written', examples: '감사할 따름 = 감사할 뿐（更书面 vs 更口语）', examplesEn: '감사할 따름 = 감사할 뿐 (more written vs. more spoken)' },
      { type: 'note', text: '主要用于自谦、道歉、感激、遗憾的正式场合', textEn: 'Mainly used in formal contexts of humility, apology, gratitude, or regret', examples: '노력했을 따름이에요.（只是尽力了而已。）', examplesEn: '노력했을 따름이에요. (I just did my best.)' },
      { type: 'note', text: '中文的"只"能表数量（只有一千块），但 따름이다 不表数量限定。它是"心情/行为仅此而已，别无其他"。数量上的"只有"要用 밖에/뿐。', textEn: 'In Chinese, \'only\' can express quantity (e.g., \'only 1,000 won\'), but 따름이다 does not limit quantity. It means \'this feeling/action and nothing else.\' For quantity, use 밖에/뿐.', examples: '(表数量) 천 원밖에 없어요.（只有一千块）↔ (表心情) 그저 감사할 따름이에요.（只是感激）', examplesEn: '(Quantity) 천 원밖에 없어요. (I only have 1,000 won) ↔ (Feeling) 그저 감사할 따름이에요. (I\'m just grateful.)' },
      { type: 'compare', text: '따름 只能出现在 따름이다 里，是个"专属搭档"。别拿它套 뿐 的扩展说法：뿐 有 뿐만 아니라，따름 没有 따름만 아니라。', textEn: '따름 only appears in 따름이다 — it\'s a fixed pair. Don\'t extend it like 뿐: 뿐 has 뿐만 아니라, but 따름 has no 따름만 아니라.', examples: '(✓) 감사할 따름이에요. / (✓) 도움뿐만 아니라… (✗) 도움 따름만 아니라' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是感激而已。', zhEn: 'It\'s just gratitude.',
        swapWords: ['감사하다', '고맙다', '기쁘다', '뿌듯하다'],
      },
      {
        wordBlocks: [
          { text: '제', role: 'plain' },
          { text: '할 일을', role: 'object' },
          { text: '했을', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是做了本分。', zhEn: 'Just did my duty.',
        swapWords: ['하다', '완수하다', '해내다', '이행하다'],
      },
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '부끄러울', role: 'plain' },
          { text: '따름입니다', role: 'plain' },
        ],
        zh: '只是感到惭愧。', zhEn: 'Just feel ashamed.',
        swapWords: ['부끄럽다', '민망하다', '창피하다', '죄송하다'],
      },
    ],
    scenarios: [
      { icon: '🙏', context: '感激', contextEn: 'grateful', ko: '그저 감사할 따름이에요.', zh: '只是感激而已。', zhEn: 'It\'s just gratitude.' },
      { icon: '💼', context: '自谦', contextEn: 'Self-effacing', ko: '제 할 일을 했을 따름이에요.', zh: '只是做了本分。', zhEn: 'Just did my duty.' },
      { icon: '😳', context: '惭愧', contextEn: 'Ashamed', ko: '그저 부끄러울 따름입니다.', zh: '只是感到惭愧。', zhEn: 'Just feel ashamed.' },
      { icon: '💔', context: '遗憾', contextEn: 'Regretful', ko: '안타까울 따름이에요.', zh: '只是觉得可惜。', zhEn: 'Just feel it\'s a pity.' },
      { icon: '🙇', context: '道歉', contextEn: 'to apologize', ko: '죄송할 따름입니다.', zh: '只有满心歉意。', zhEn: 'Only full of apologies.' },
      { icon: '🌟', context: '努力', contextEn: 'effort', ko: '최선을 다했을 따름입니다.', zh: '只是尽了最大努力。', zhEn: 'Just gave my best effort.' },
    ],
    mistakes: [
      { wrong: '감사하는 따름이다', correct: '감사할 따름이다', note: '固定为 -을/ㄹ 따름이다，不用 -는', noteEn: 'Fixed as -을/ㄹ 따름이다, not -는' },
      { wrong: '가을 따름이다', correct: '갈 따름이다', note: '가다 无받침，用 -ㄹ 따름이다', noteEn: '가다 has no batchim, so use -ㄹ 따름이다' },
      { wrong: '학생 따름이다', correct: '학생일 따름이다', note: '名词需加系词 이 变形', noteEn: 'Nouns require the copula 이 to be added' },
    ],
    quickTable: {
      title: '-을/ㄹ 따름이다 一览', titleEn: '-을/ㄹ 따름이다 Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有받침', '-을 따름이다', '먹을 따름이다'],
        ['无받침', '-ㄹ 따름이다', '할 따름이다'],
        ['过去', '-았/었을 따름이다', '했을 따름이다'],
        ['名词', '-(이)ㄹ 따름이다', '학생일 따름이다'],
        ['同义', '-을/ㄹ 뿐이다', '更口语版本'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ 따름이다 变形', titleEn: '-을/ㄹ 따름이다 Conjugation',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '그저 (감사하다) 따름이에요.',
          options: ['감사한', '감사할', '감사하는', '감사해서'],
          answer: 1,
          explanation: '감사하다 词干 감사하 无받침，用 -ㄹ 따름이다 → 감사할 따름이에요。', explanationEn: '감사하다 stem is 감사하, no batchim, so use -ㄹ 따름이다 → 감사할 따름이에요.',
        },
        {
          prompt: '제 할 일을 (하다) 따름이에요.',
          options: ['한', '할', '했을', '하는'],
          answer: 2,
          explanation: '"只是做了"是过去，用 -았/었을 따름이다 → 했을 따름이에요。', explanationEn: '\'Just did\' is past tense, so use -았/었을 따름이다 → 했을 따름이에요.',
        },
        {
          prompt: '그저 (부끄럽다) 따름입니다.',
          options: ['부끄러운', '부끄러울', '부끄러웠을', '부끄러운는'],
          answer: 1,
          explanation: '부끄럽다 词干 부끄러워 → 부끄러울 따름입니다（ㅂ不规则）。', explanationEn: 'The stem of 부끄럽다 is 부끄러워 → 부끄러울 따름입니다 (ㅂ irregular).',
        },
        {
          prompt: '-을/ㄹ 따름이다 的语气是……', promptEn: 'The tone of -을/ㄹ 따름이다 is...',
          options: ['轻松口语', '书面正式（自谦/感激/遗憾）', '强硬命令', '随便闲聊'],
          answer: 1,
          explanation: '-을/ㄹ 따름이다 是书面正式表达，多用于自谦、感激、道歉、遗憾。', explanationEn: '-을/ㄹ 따름이다 is a formal written expression, often used for humility, gratitude, apology, or regret.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"只是感激而已""只是做了本分" —— 韩语书面版"仅仅、只是"用 <b>-을/ㄹ 따름이다</b>。<br>它是 -을/ㄹ 뿐이다 的正式版，多用于自谦、道歉、感激。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을 따름이다 vs -을 뿐이다</b><br>
    语义相同："只是……而已"<br>
    ・-을 따름이다 → 书面/正式/演讲<br>
    <span style="color:#89756e">감사할 따름입니다.</span><br>
    ・-을 뿐이다 → 日常口语<br>
    <span style="color:#89756e">감사할 뿐이에요.</span>
  </div>
</div>`,
    compareLabel: '-을 따름 vs -을 뿐',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ 따름이다：只是……而已</div>
  <div style="font-size:14px;color:#89756e">书面正式版"仅此而已"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有받침 → <b>-을 따름이다</b>：먹을 따름<br>
      无받침 → <b>-ㄹ 따름이다</b>：할 따름<br>
      过去 → <b>-았/었을 따름이다</b>：했을 따름<br>
      名词 → <b>-(이)ㄹ 따름이다</b>：학생일 따름
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      感激：감사할 따름이에요.<br>
      自谦：할 일을 했을 따름이에요.<br>
      道歉：죄송할 따름입니다.<br>
      遗憾：안타까울 따름이에요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">감사하는 따름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">감사할 따름이다（-을/ㄹ 따름）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을 따름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈 따름이다</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p28-l09',
    partNumber: 28,
    lessonNumber: 9,
    title: 'P28 综合练习', titleEn: 'P28 Comprehensive Practice',
    whatItDoes: 'P28 综合复习', whatItDoesEn: 'P28 Comprehensive Review',
    whatItDoesBody: '本练习综合复习 P28 强调与感叹深化章节的 8 个语法点：-기(가) N하다 / 얼마나 -는지 모르다 / -다 못해 / -을수록 / 오죽 -으면 / -기(는) 하다 / -고말고요 / -을 따름이다。', whatItDoesBodyEn: 'This exercise comprehensively reviews the 8 grammar points from the P28 Emphasis and Exclamation Deepening chapter: -기(가) N하다 / 얼마나 -는지 모르다 / -다 못해 / -을수록 / 오죽 -으면 / -기(는) 하다 / -고말고요 / -을 따름이다.',
    structureNote: '综合本 Part 所有语法', structureNoteEn: 'Comprehensive review of all grammar in this part',
    rulesNote: '重点辨析：感叹强度阶梯 및 让步转折与限定表达', rulesNoteEn: 'Key Distinctions: Intensity Scale of Exclamations and Concessive/Contrastive & Limiting Expressions',
    isPractice: true,
    structures: [
      {
        ko: '한국어는 배우기가 어려워요.',
        zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '한국어가 얼마나 어려운지 몰라요.',
        zh: '韩语不知有多难。', zhEn: 'Korean is unbelievably hard.',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '얼마나', role: 'plain' },
          { text: '어려운지', role: 'plain' },
          { text: '몰라요', role: 'verb' },
        ],
      },
      {
        ko: '보면 볼수록 예쁘네요.',
        zh: '越看越漂亮。', zhEn: 'The more you look, the prettier it gets.',
        tokens: [
          { text: '보면', role: 'verb' },
          { text: '볼수록', role: 'verb' },
          { text: '예쁘네요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기(가) N하다 → 做……起来（评价难易/舒适）', textEn: '-기(가) N하다 → doing... (evaluating difficulty/comfort)' },
      { type: 'rule', text: '얼마나 -는지 모르다 → 不知有多……（强烈感叹）', textEn: '얼마나 -는지 모르다 → I can\'t tell you how... (strong exclamation)' },
      { type: 'rule', text: '-다 못해 → 甚至……到（程度递进）', textEn: '-다 못해 → even to the point of... (progressive degree)' },
      { type: 'rule', text: '-을/ㄹ수록 → 越……越……（程度递增）', textEn: '-을/ㄹ수록 → the more..., the more... (increasing degree)' },
      { type: 'rule', text: '오죽 -으면 -겠어요 → 该多……啊（共情推想）', textEn: '오죽 -으면 -겠어요 → how... it must be (empathic inference)' },
      { type: 'rule', text: '-기(는) 하다 → 承认+让步转折', textEn: '-기(는) 하다 → admit + concession/contrast' },
      { type: 'usage', text: '-고말고요 → 当然……啦（口语强烈肯定）', textEn: '-고말고요 → of course... (strong affirmative in speech)' },
      { type: 'usage', text: '-을/ㄹ 따름이다 → 只是……而已（书面正式）', textEn: '-을/ㄹ 따름이다 → just... that\'s all (formal written)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.',
        swapWords: ['어렵다', '쉽다', '재미있다', '유용하다'],
      },
      {
        wordBlocks: [
          { text: '먹기는', role: 'verb' },
          { text: '하는데', role: 'verb' },
          { text: '맛이 없어요', role: 'verb' },
        ],
        zh: '吃倒是吃但不好吃。', zhEn: 'I do eat it, but it\'s not tasty.',
        swapWords: ['먹다', '읽다', '보다', '듣다'],
      },
      {
        wordBlocks: [
          { text: '그저', role: 'plain' },
          { text: '감사할', role: 'verb' },
          { text: '따름이에요', role: 'plain' },
        ],
        zh: '只是感激而已。', zhEn: 'It\'s just gratitude.',
        swapWords: ['감사하다', '고맙다', '기쁘다', '뿌듯하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '评价', contextEn: 'evaluation', ko: '한국어는 배우기가 어려워요.', zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.' },
      { icon: '😲', context: '感叹', contextEn: 'Exclamation', ko: '한국어가 얼마나 어려운지 몰라요.', zh: '韩语不知多难。', zhEn: 'I can\'t tell you how hard Korean is.' },
      { icon: '😴', context: '极致', contextEn: 'extreme', ko: '피곤하다 못해 쓰러졌어요.', zh: '累到瘫倒。', zhEn: 'So tired I collapsed.' },
      { icon: '📈', context: '递进', contextEn: 'progression', ko: '공부할수록 재미있어요.', zh: '越学越有趣。', zhEn: 'The more you study, the more interesting it gets.' },
      { icon: '💔', context: '共情', contextEn: 'Empathy', ko: '오죽 힘들면 그랬겠어요.', zh: '得多累才那样。', zhEn: 'How exhausted must one be to be like that.' },
      { icon: '🙏', context: '感激', contextEn: 'grateful', ko: '그저 감사할 따름이에요.', zh: '只是感激而已。', zhEn: 'It\'s just gratitude.' },
    ],
    mistakes: [
      { wrong: '한국어가 얼마나 어렵는지 몰라요', correct: '한국어가 얼마나 어려운지 몰라요', note: '形容词用 -은/ㄴ지，不用 -는지', noteEn: 'For adjectives, use -은/ㄴ지, not -는지' },
      { wrong: '먹는 하는데 맛이 없어요', correct: '먹기는 하는데 맛이 없어요', note: '让步用 -기(는) 하다', noteEn: 'For concession, use -기(는) 하다' },
      { wrong: '감사하는 따름이다', correct: '감사할 따름이다', note: '固定为 -을/ㄹ 따름이다', noteEn: 'Fixed as -을/ㄹ 따름이다' },
    ],
    linkedGrammarIds: ['card-p28-l01', 'card-p28-l02', 'card-p28-l03', 'card-p28-l04', 'card-p28-l05', 'card-p28-l06', 'card-p28-l07', 'card-p28-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P28 综合练习', titleEn: 'P28 Comprehensive Practice',
      body: '选择正确的表达', bodyEn: 'Choose the correct expression.',
      questions: [
        {
          prompt: '"这书读起来容易" 用……', promptEn: '"This book is easy to read" use...',
          options: ['이 책은 읽으면 쉬워요', '이 책은 읽기 쉬워요', '이 책은 읽는 것이 쉬워요', '이 책은 읽어서 쉬워요'],
          answer: 1,
          explanation: '"做……起来"评价用 -기(가) N하다 → 읽기 쉬워요。', explanationEn: 'To evaluate "doing..." use -기(가) N하다 → 읽기 쉬워요.',
        },
        {
          prompt: '"韩语不知有多难"（强烈感叹）', promptEn: '"I can\'t tell you how hard Korean is" (strong exclamation)',
          options: ['한국어가 어려워요', '한국어가 얼마나 어려운지 몰라요', '한국어가 얼마나 어렵는지 몰라요', '한국어가 얼마나 어려울지 몰라요'],
          answer: 1,
          explanation: '强烈感叹用 얼마나 -은/ㄴ지 몰라요（形容词用 -은지）→ 어려운지 몰라요。', explanationEn: 'For strong exclamation, use 얼마나 -은/ㄴ지 몰라요 (adjectives use -은지) → 어려운지 몰라요.',
        },
        {
          prompt: '"越学越有趣"', promptEn: '"The more I study, the more interesting it gets"',
          options: ['공부하면 재미있어요', '공부할수록 재미있어요', '공부해서 재미있어요', '공부하니까 재미있어요'],
          answer: 1,
          explanation: '"越……越……"用 -을/ㄹ수록 → 공부할수록 재미있어요。', explanationEn: 'For "the more..., the more..." use -을/ㄹ수록 → 공부할수록 재미있어요.',
        },
        {
          prompt: '"当然去啊！"（口语强烈肯定）', promptEn: '"Of course I\'ll go!" (strong affirmative in spoken Korean)',
          options: ['갈 거예요', '가고말고요', '가면요', '가야죠'],
          answer: 1,
          explanation: '口语强烈肯定应答用 -고말고요 → 가고말고요。', explanationEn: 'For a strong affirmative response in speech, use -고말고요 → 가고말고요.',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P28 总结：强调与感叹深化</div>
  <div style="font-size:14px;color:#89756e">评价 / 感叹 / 递进 / 承认 / 肯定</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">八大表达</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-기(가) N하다</b> → 做……起来（评价难易）<br>
      <b>얼마나 -는지 모르다</b> → 不知有多……（强感叹）<br>
      <b>-다 못해</b> → 甚至……到（程度极致）<br>
      <b>-을/ㄹ수록</b> → 越……越……（程度递增）<br>
      <b>오죽 -으면 -겠어요</b> → 该多……啊<br>
      <b>-기(는) 하다</b> → 承认+让步转折<br>
      <b>-고말고요</b> → 当然！（口语肯定）<br>
      <b>-을/ㄹ 따름이다</b> → 只是……而已（正式）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">语气分组</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      评价 → -기 N하다<br>
      感叹 → 얼마나 -는지 모르다 / -다 못해 / 오죽 -으면<br>
      递进 → -을/ㄹ수록<br>
      让步 → -기(는) 하다<br>
      肯定 → -고말고요<br>
      限定 → -을/ㄹ 따름이다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">核心易错</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 形容词冠形用 -은/ㄴ，不用 -는（어렵는지 ✗）<br>
      2. 词干直接接 -기，不做 -아/어 变形<br>
      3. -고말고요 只作应答，不能陈述<br>
      4. -을/ㄹ 따름 vs -을/ㄹ 뿐 → 正式 vs 口语
    </div>
  </div>
</div>`,
  },

];
