import type { GrammarCard } from '@/types';

export const grammarCardsP27: GrammarCard[] = [
  // ── 第1课：-기 마련이다 ──────────────────────────────────────
  {
    id: 'card-p27-l01',
    partNumber: 27,
    lessonNumber: 1,
    title: '-기 마련이다',
    whatItDoes: '本来就……', whatItDoesEn: 'It\'s only natural that...',
    whatItDoesBody: '「-기 마련이다」表示"本来就……""必然会……""理所当然……"。用于陈述普遍规律、常识、必然结果。语气偏客观，常用于说教、经验总结。', whatItDoesBodyEn: '\'-기 마련이다\' means \'it\'s only natural that...\', \'it\'s bound to...\', \'of course...\'. Used to state universal rules, common sense, or inevitable results. The tone is objective, often used in lessons or summarizing experiences.',
    structureNote: '动词/形容词词干 + -기 마련이다 · 名词 + 이기 마련이다', structureNoteEn: 'Verb/Adjective stem + -기 마련이다 · Noun + 이기 마련이다',
    rulesNote: '直接接词干，不看받침；名词加系词 이 后再接；等同 -는 법이다', rulesNoteEn: 'Attach directly to the stem, regardless of batchim; for nouns, add the copula 이 before it; equivalent to -는 법이다',
    structures: [
      {
        ko: '노력하면 성공하기 마련이에요.',
        zh: '努力的话必然会成功。', zhEn: 'If you work hard, success is inevitable.',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 지나면 잊혀지기 마련이에요.',
        zh: '时间过去自然就会被遗忘。', zhEn: 'As time passes, things naturally get forgotten.',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '지나면', role: 'verb' },
          { text: '잊혀지기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '오래 사귀면 싸우기 마련이에요.',
        zh: '交往久了必然会吵架。', zhEn: 'If you date long enough, fights are bound to happen.',
        tokens: [
          { text: '오래', role: 'plain' },
          { text: '사귀면', role: 'verb' },
          { text: '싸우기 마련이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -기 마련이다，不看받침', textEn: 'Verb/Adjective stem + -기 마련이다, regardless of batchim', examples: '가다 → 가기 마련이다 / 좋다 → 좋기 마련이다' },
      { type: 'rule', text: '名词 + 이기 마련이다', textEn: 'Noun + 이기 마련이다', examples: '학생은 공부하는 존재이기 마련이다（学生本就是要学习的存在。）', examplesEn: '학생은 공부하는 존재이기 마련이다 (Students are meant to study.)' },
      { type: 'usage', text: '陈述普遍真理、常识、必然结果', textEn: 'States universal truths, common sense, or inevitable results', examples: '나이가 들면 늙기 마련이에요.（上了年纪自然会老。）', examplesEn: '나이가 들면 늙기 마련이에요. (You naturally age as you get older.)' },
      { type: 'usage', text: '前句多为条件（-면、-으면、시간이 지나면 등）', textEn: 'The preceding clause is often a condition (-면, -으면, 시간이 지나면, etc.)', examples: '오래 쓰면 낡기 마련이다.（用久了难免会旧。）', examplesEn: '오래 쓰면 낡기 마련이다. (Used long enough, it\'s bound to wear out.)' },
      { type: 'compare', text: '-기 마련이다 vs -는 법이다 → 语义几乎相同，可互换；-는 법이다 更书面', textEn: '-기 마련이다 vs -는 법이다 → nearly identical in meaning, interchangeable; -는 법이다 is more formal', examples: '노력하면 성공하기 마련이다（努力就会成功）= 노력하면 성공하는 법이다（努力自然会成功）', examplesEn: '노력하면 성공하기 마련이다 (If you work hard, you\'ll succeed) = 노력하면 성공하는 법이다 (Work hard and success follows naturally)' },
      { type: 'note', text: '语气是客观陈述，不带主观判断', textEn: 'The tone is objective, without subjective judgment', examples: '누구나 실수하기 마련이에요.（谁都难免会犯错。）', examplesEn: '누구나 실수하기 마련이에요. (Everyone makes mistakes.)' },
      { type: 'note', text: '不与命令/建议句连用', textEn: 'Not used with imperative or suggestion sentences', examples: '(✗) 성공하기 마련이세요（错误说法：마련이다 不能加尊敬 -세요）', examplesEn: '(✗) 성공하기 마련이세요 (Incorrect: 마련이다 cannot take the honorific -세요)' },
      { type: 'compare', text: '中文"会"有两种意思，别混：讲普遍规律的"必然会"用 마련이다；对某个具体事情的推测用 -을 거예요/-겠-。前者是"凡此类都如此"，后者是"这一件我猜会"', textEn: 'The Chinese "会" has two meanings, don\'t mix them up: for general rules "inevitably will" use 마련이다; for speculation about a specific event use -을 거예요/-겠-. The former means "all of this kind are like this," the latter means "I guess this one will."', examples: '노력하면 성공하기 마련이에요.（普遍：凡努力必成功）↔ 그 사람은 성공할 거예요.（推测：那个人应该会成功）', examplesEn: '노력하면 성공하기 마련이에요. (General: effort always leads to success) ↔ 그 사람은 성공할 거예요. (Speculation: that person will probably succeed.)' },
      { type: 'note', text: '只用于普遍规律、反复出现的现象，不能描述一次性的具体事件；具体某件事该用 -을 거예요', textEn: 'Only used for general rules and recurring phenomena, not for one-time specific events; for a specific event use -을 거예요.', examples: '(✗) 내일 시험에 떨어지기 마련이에요 → (○) 오래 사귀면 싸우기 마련이에요（反复规律才行）', examplesEn: '(✗) 내일 시험에 떨어지기 마련이에요 → (○) 오래 사귀면 싸우기 마련이에요 (It has to be a recurring pattern.)' },
      { type: 'note', text: '「-기 마련이다」和「-게 마련이다」两种都正确、都常见，意思一样，看到 게 형 不用当成错', textEn: 'Both "-기 마련이다" and "-게 마련이다" are correct and common, with the same meaning; don\'t treat the 게 form as a mistake.', examples: '싸우기 마련이에요 = 싸우게 마련이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '努力的话必然成功。', zhEn: 'If you work hard, you\'re bound to succeed.',
        swapWords: ['성공하다', '이루다', '해내다', '얻다'],
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '지나면', role: 'verb' },
          { text: '잊혀지기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '时间过去必然会被遗忘。', zhEn: 'As time passes, things are bound to be forgotten.',
        swapWords: ['잊혀지다', '사라지다', '흐려지다', '멀어지다'],
      },
      {
        wordBlocks: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '人都难免会犯错。', zhEn: 'Everyone is bound to make mistakes.',
        swapWords: ['실수하다', '틀리다', '넘어지다', '잘못하다'],
      },
    ],
    scenarios: [
      { icon: '💪', context: '努力', contextEn: 'effort', ko: '노력하면 성공하기 마련이에요.', zh: '努力必然成功。', zhEn: 'Effort is bound to lead to success.' },
      { icon: '⏳', context: '时间', contextEn: 'time', ko: '시간이 지나면 잊혀지기 마련이에요.', zh: '时间会淡化一切。', zhEn: 'Time fades everything.' },
      { icon: '💑', context: '恋爱', contextEn: 'dating', ko: '오래 사귀면 싸우기 마련이에요.', zh: '交往久了会吵架。', zhEn: 'If you date long enough, you\'re bound to fight.' },
      { icon: '👴', context: '年龄', contextEn: 'Age', ko: '나이가 들면 늙기 마련이에요.', zh: '上年纪就会老。', zhEn: 'As you get older, you\'re bound to age.' },
      { icon: '❌', context: '犯错', contextEn: 'making mistakes', ko: '사람은 누구나 실수하기 마련이에요.', zh: '人都难免犯错。', zhEn: 'Everyone is bound to make mistakes.' },
      { icon: '🍂', context: '自然', contextEn: 'natural', ko: '가을이 되면 낙엽이 지기 마련이에요.', zh: '一到秋天必然落叶。', zhEn: 'When autumn comes, leaves are bound to fall.' },
    ],
    mistakes: [
      { wrong: '성공하는 마련이에요', correct: '성공하기 마련이에요', note: '固定为 -기 마련이다，不用 -는 마련', noteEn: 'It\'s fixed as -기 마련이다, not -는 마련.' },
      { wrong: '학생 마련이에요', correct: '학생이기 마련이에요', note: '名词需加 이 变形', noteEn: 'Nouns require the 이 particle.' },
      { wrong: '성공하기 마련이세요', correct: '성공하기 마련이에요', note: '客观陈述句，不能敬语命令', noteEn: 'It\'s an objective statement, not a polite command.' },
    ],
    quickTable: {
      title: '-기 마련이다 一览', titleEn: 'Overview of -기 마련이다',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词/形容词', '词干 + -기 마련이다', '성공하기 마련이다'],
        ['名词', '+ 이기 마련이다', '학생이기 마련이다'],
        ['前句', '常为 -면 条件', '오래 쓰면 낡기 마련이다'],
        ['同义', '-는 법이다', '两者可互换'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기 마련이다 变形', titleEn: 'Conjugation of -기 마련이다',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '노력하면 (성공하다) 마련이에요.',
          options: ['성공하는', '성공하기', '성공하면', '성공한'],
          answer: 1,
          explanation: '固定形态 -기 마련이다，动词词干 + -기 → 성공하기 마련이다。', explanationEn: 'Fixed form -기 마련이다, verb stem + -기 → 성공하기 마련이다.',
        },
        {
          prompt: '시간이 지나면 (잊혀지다) 마련이에요.',
          options: ['잊혀지는', '잊혀지기', '잊혀진', '잊혀지고'],
          answer: 1,
          explanation: '-기 마련이다 固定接 -기 → 잊혀지기 마련이다。', explanationEn: '-기 마련이다 is always attached to -기 → 잊혀지기 마련이다.',
        },
        {
          prompt: '(학생) 공부해야 하는 존재이기 마련이에요.',
          options: ['학생', '학생은', '학생이', '학생을'],
          answer: 2,
          explanation: '主语用 이/가 → 학생이 …이기 마련이다。', explanationEn: 'The subject takes 이/가 → 학생이 …이기 마련이다.',
        },
        {
          prompt: '-기 마련이다 的语义是……', promptEn: 'The meaning of -기 마련이다 is...',
          options: ['意愿/打算', '本来就/必然会', '推测/大概', '许可/允许'],
          answer: 1,
          explanation: '-기 마련이다 表"本来就……""理所当然""必然会……"。', explanationEn: '-기 마련이다 means "it\'s only natural that...", "of course", "it\'s bound to...".',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"努力必然会成功""上年纪就会老"——这种"本来就……""必然会……"的常识陈述，韩语用 <b>-기 마련이다</b>。<br>它和 -는 법이다 几乎同义，语气客观、说教感强。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기 마련이다 vs -는 법이다</b><br>
    语义几乎相同："本来就……" / "自然如此"<br>
    ・-기 마련이다 → 更口语常见<br>
    ・-는 법이다 → 更书面/说教<br>
    <span style="color:#89756e">노력하면 성공하기 마련이다 = 노력하면 성공하는 법이다</span>
  </div>
</div>`,
    compareLabel: '-기 마련이다 vs -는 법이다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기 마련이다：本来就</div>
  <div style="font-size:14px;color:#89756e">陈述必然/常识</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词/形容词 → 词干 + <b>-기 마련이다</b><br>
      名词 → <b>-이기 마련이다</b><br>
      前句常为 -면 条件
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      노력하면 성공하기 마련<br>
      나이가 들면 늙기 마련<br>
      누구나 실수하기 마련<br>
      오래 쓰면 낡기 마련
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">성공하는 마련이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">성공하기 마련이에요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 마련이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이기 마련이에요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-는 법이다 ──────────────────────────────────────
  {
    id: 'card-p27-l02',
    partNumber: 27,
    lessonNumber: 2,
    title: '-는 법이다',
    whatItDoes: '道理如此', whatItDoesEn: 'That\'s just how it is',
    whatItDoesBody: '「-는 법이다 / -은/ㄴ 법이다」表示"本来就……""按道理讲……""自然而然……"。用于陈述普遍规律、道理，语气较书面，含说教/警示意味。也常用于 -는 법이 없다 表"绝不会……"。', whatItDoesBodyEn: '\'-는 법이다 / -은/ㄴ 법이다\' means \'it\'s only natural that...\', \'by all logic...\', \'naturally...\'. Used to state universal rules or principles, with a more formal tone and a hint of lesson/warning. Also commonly used as -는 법이 없다 to mean \'will never...\'.',
    structureNote: '动词现在 -는 법이다 · 形容词 -은/ㄴ 법이다 · 名词 -인 법이다 · 否定 -는 법이 없다', structureNoteEn: 'Verb present -는 법이다 · Adjective -은/ㄴ 법이다 · Noun -인 법이다 · Negative -는 법이 없다',
    rulesNote: '动词冠形 -는，形容词冠形 -은/ㄴ；否定用 -는 법이 없다 表强烈否认', rulesNoteEn: 'Verb adnominal -는, adjective adnominal -은/ㄴ; negative uses -는 법이 없다 for strong denial',
    structures: [
      {
        ko: '노력하는 사람은 성공하는 법이에요.',
        zh: '努力的人自然会成功。', zhEn: 'Those who work hard are naturally bound to succeed.',
        tokens: [
          { text: '노력하는', role: 'verb' },
          { text: '사람은', role: 'subject' },
          { text: '성공하는 법이에요', role: 'verb' },
        ],
      },
      {
        ko: '착한 사람은 언제나 착한 법이에요.',
        zh: '善良的人始终是善良的。', zhEn: 'Kind people are always kind.',
        tokens: [
          { text: '착한', role: 'plain' },
          { text: '사람은', role: 'subject' },
          { text: '언제나', role: 'plain' },
          { text: '착한 법이에요', role: 'plain' },
        ],
      },
      {
        ko: '거짓말은 오래가는 법이 없어요.',
        zh: '谎言绝不会长久。', zhEn: 'Lies never last long.',
        tokens: [
          { text: '거짓말은', role: 'subject' },
          { text: '오래가는 법이 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 법이다', textEn: 'Verb present: -는 법이다', examples: '가다 → 가는 법이다 / 먹다 → 먹는 법이다' },
      { type: 'rule', text: '形容词：有받침 -은 법이다 / 无받침 -ㄴ 법이다', textEn: 'Adjectives: with batchim -은 법이다 / without batchim -ㄴ 법이다', examples: '좋다 → 좋은 법이다 / 크다 → 큰 법이다' },
      { type: 'rule', text: '名词：-인 법이다', textEn: 'Noun: -인 법이다', examples: '진리인 법이다（本就是真理。）', examplesEn: '진리인 법이다 (It\'s simply the truth.)' },
      { type: 'rule', text: '否定：-는 법이 없다 表"绝不会……"', textEn: 'Negation: -는 법이 없다 means "never..."', examples: '거짓말은 오래가는 법이 없어요（谎言不会长久。）', examplesEn: '거짓말은 오래가는 법이 없어요 (Lies don\'t last long.)' },
      { type: 'usage', text: '陈述普遍道理、常识、必然规律', textEn: 'States universal truths, common sense, or inevitable rules', examples: '노력하는 사람은 성공하는 법이에요.（努力的人自然会成功。）', examplesEn: '노력하는 사람은 성공하는 법이에요. (Hardworking people naturally succeed.)' },
      { type: 'compare', text: '-는 법이다 vs -기 마련이다 → 前者更书面/说教，后者更口语', textEn: '-는 법이다 vs -기 마련이다 → the former is more formal/didactic, the latter more colloquial', examples: '两者语义近乎相同', examplesEn: 'The two are nearly identical in meaning' },
      { type: 'note', text: '常用来教训、警示、总结经验', textEn: 'Often used to teach, warn, or summarize experience', examples: '남을 속이면 벌 받는 법이야.（骗人自然会遭报应。）', examplesEn: '남을 속이면 벌 받는 법이야. (If you deceive others, you\'ll naturally face consequences.)' },
      { type: 'compare', text: '警惕："법"本身还有"方法"的意思。区别看它后面接什么：接 이다 结句=道理/必然（本课）；接 을/를 알다·배우다·모르다=方法/做法（不是本课语法）', textEn: 'Caution: "법" also means "method." Distinguish by what follows: with 이다 at the end = principle/inevitability (this lesson); with 을/를 알다·배우다·모르다 = method/way (not this lesson\'s grammar)', examples: '먹는 법이에요.（本就会吃 · 道理）↔ 먹는 법을 몰라요.（不知道吃的方法）', examplesEn: '먹는 법이에요. (It\'s just how one eats · principle) ↔ 먹는 법을 몰라요. (I don\'t know how to eat)' },
      { type: 'note', text: '为什么动词用 -는、形容词用 -은/ㄴ？这是冠形词尾（前面章节详学），不是本课专属规则，别混：动词现在 -는，形容词 -은/ㄴ', textEn: 'Why do verbs use -는 and adjectives -은/ㄴ? This is an adnominal ending (covered in earlier chapters), not exclusive to this lesson—don\'t confuse: verbs present -는, adjectives -은/ㄴ', examples: '가다(动)→가는 법 / 좋다(形)→좋은 법', examplesEn: '가다 (verb) → 가는 법 / 좋다 (adjective) → 좋은 법' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하는', role: 'verb' },
          { text: '사람은', role: 'subject' },
          { text: '성공하는', role: 'verb' },
          { text: '법이에요', role: 'verb' },
        ],
        zh: '努力的人自然成功。', zhEn: 'Hardworking people naturally succeed.',
        swapWords: ['노력하다', '공부하다', '준비하다', '연습하다'],
      },
      {
        wordBlocks: [
          { text: '착한', role: 'plain' },
          { text: '사람은', role: 'subject' },
          { text: '착한', role: 'plain' },
          { text: '법이에요', role: 'plain' },
        ],
        zh: '善良的人本就善良。', zhEn: 'Kind people are simply kind.',
        swapWords: ['착하다', '정직하다', '성실하다', '따뜻하다'],
      },
      {
        wordBlocks: [
          { text: '거짓말은', role: 'subject' },
          { text: '오래가는', role: 'verb' },
          { text: '법이', role: 'plain' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '谎言绝不会长久。', zhEn: 'Lies never last long.',
        swapWords: ['거짓말', '비밀', '실수', '오해'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '道理', contextEn: 'principle', ko: '노력하는 사람은 성공하는 법이에요.', zh: '努力的人会成功。', zhEn: 'Hardworking people will succeed.' },
      { icon: '💖', context: '天性', contextEn: 'nature', ko: '착한 사람은 언제나 착한 법이에요.', zh: '善良的人始终善良。', zhEn: 'Kind people remain kind.' },
      { icon: '🚫', context: '强否定', contextEn: 'strong negation', ko: '거짓말은 오래가는 법이 없어요.', zh: '谎言绝不会长久。', zhEn: 'Lies never last long.' },
      { icon: '⚖️', context: '因果', contextEn: 'cause and effect', ko: '남을 속이면 벌 받는 법이야.', zh: '欺骗别人自然会受罚。', zhEn: 'Deceiving others naturally leads to punishment.' },
      { icon: '📖', context: '经验', contextEn: 'Experience', ko: '실패에서 배우는 법이에요.', zh: '本就从失败中学习。', zhEn: 'We learn from failure in the first place.' },
      { icon: '🌸', context: '规律', contextEn: 'rule/pattern', ko: '봄이 오면 꽃이 피는 법이에요.', zh: '春来花开是自然规律。', zhEn: 'Flowers blooming in spring is a natural rule.' },
    ],
    mistakes: [
      { wrong: '성공하기 법이다', correct: '성공하는 법이다', note: '固定用冠形 -는，不用 -기', noteEn: 'Always use the adnominal form -는, not -기' },
      { wrong: '좋는 법이다', correct: '좋은 법이다', note: '形容词冠形用 -은/ㄴ，不用 -는', noteEn: 'Adjectives take the adnominal form -은/ㄴ, not -는' },
      { wrong: '거짓말은 오래가는 법이 있어요', correct: '거짓말은 오래가는 법이 없어요', note: '否定"绝不"是 -는 법이 없다', noteEn: 'For negation, "never" is -는 법이 없다' },
    ],
    quickTable: {
      title: '-는 법이다 冠形变化', titleEn: '-neun beobida adnominal change',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在', '-는 법이다', '가는 법이다'],
        ['形容词有받침', '-은 법이다', '좋은 법이다'],
        ['形容词无받침', '-ㄴ 법이다', '큰 법이다'],
        ['名词', '-인 법이다', '진리인 법이다'],
        ['否定', '-는 법이 없다', '오래가는 법이 없다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-는 법이다 冠形', titleEn: '-neun beobida adnominal',
      body: '选正确冠形', bodyEn: 'Choose the correct adnominal form',
      questions: [
        {
          prompt: '노력하는 사람은 (성공하다) 법이에요.',
          options: ['성공한', '성공하는', '성공할', '성공했는'],
          answer: 1,
          explanation: '动词现在冠形用 -는 → 성공하는 법이에요。', explanationEn: 'For present tense verbs, use -는 → 성공하는 법이에요.',
        },
        {
          prompt: '(착하다) 사람은 언제나 착한 법이에요.',
          options: ['착하는', '착한', '착할', '착하기'],
          answer: 1,
          explanation: '착하다 是形容词，无받침加 -ㄴ → 착한。', explanationEn: 'Chakhada is an adjective; without a batchim, add -n → chakhan.',
        },
        {
          prompt: '거짓말은 오래가는 법이 (없다/있다).',
          options: ['있어요', '없어요', '해요', '되어요'],
          answer: 1,
          explanation: '"绝不会长久"用 -는 법이 없다 → 없어요。', explanationEn: 'For "never lasts," use -는 법이 없다 → 없어요.',
        },
        {
          prompt: '(좋다) 법이에요.',
          options: ['좋는', '좋은', '좋을', '좋기'],
          answer: 1,
          explanation: '좋다 形容词有받침，冠形用 -은 → 좋은 법이에요。', explanationEn: 'Jota is an adjective with a batchim; the adnominal uses -eun → joeun beobieyo.',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l01'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"努力的人自然会成功""谎言不会长久" —— 韩语这种带说教感的道理陈述用 <b>-는 법이다</b>。<br>它是 -기 마련이다 的书面版，并常用 -는 법이 없다 表强烈否认。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>肯定 vs 否定</b><br>
    ・-는 법이다 → "本来就……"<br>
    <span style="color:#89756e">성공하는 법이에요.（本来会成功）</span><br>
    ・-는 법이 없다 → "绝不会……"<br>
    <span style="color:#89756e">거짓말은 오래가는 법이 없어요.（谎言不会长久）</span>
  </div>
</div>`,
    compareLabel: '肯定 vs 否定', compareLabelEn: 'Affirmative vs. Negative',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 법이다：道理如此</div>
  <div style="font-size:14px;color:#89756e">陈述普遍规律 · 说教感</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는 법이다</b><br>
      形容词 → <b>-은/ㄴ 법이다</b><br>
      名词 → <b>-인 법이다</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">强否定</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-는 법이 없다</b> = "绝不会……"<br>
      거짓말은 오래가는 법이 없다.<br>
      정직한 사람은 손해 보는 법이 없다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">성공하기 법이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">성공하는 법이다（用 -는，不用 -기）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋는 법이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋은 법이다（形容词用 -은）</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-을/ㄹ 법하다 ──────────────────────────────────────
  {
    id: 'card-p27-l03',
    partNumber: 27,
    lessonNumber: 3,
    title: '-을/ㄹ 법하다',
    whatItDoes: '有可能……', whatItDoesEn: 'It\'s possible that...',
    whatItDoesBody: '「-을/ㄹ 법하다」表示"看起来会……""有可能……""大概会……"。用于对某种可能性做出推测，语感偏文学、书面。类似 -을/ㄹ 것 같다，但更委婉、更古典。', whatItDoesBodyEn: '\'-eul/ril beophada\' means \'seems like it will...\', \'it\'s possible that...\', \'probably will...\'. It\'s used to speculate about a possibility, with a literary, written feel. Similar to -eul/ril geot gatda, but more euphemistic and classical.',
    structureNote: '动词/形容词词干：有받침 -을 법하다 / 无받침 -ㄹ 법하다 · 名词 -(이)ㄹ 법하다', structureNoteEn: 'Verb/adjective stem: with batchim -eul beophada / without batchim -ril beophada · Noun -(i)l beophada',
    rulesNote: '与 -는 법이다 结构相近但语义不同！-는 법이다 = 必然道理；-을/ㄹ 법하다 = 有可能。需特别注意区分。', rulesNoteEn: 'Similar in structure to -neun beobida but different in meaning! -neun beobida = inevitable principle; -eul/ril beophada = possible. Be careful to distinguish them.',
    structures: [
      {
        ko: '그런 일도 있을 법한 일이에요.',
        zh: '那种事也是可能发生的。', zhEn: 'That kind of thing can happen too.',
        tokens: [
          { text: '그런 일도', role: 'subject' },
          { text: '있을 법한', role: 'plain' },
          { text: '일이에요', role: 'plain' },
        ],
      },
      {
        ko: '누구나 한 번쯤 겪을 법한 경험이에요.',
        zh: '谁都可能经历过一次的经验。', zhEn: 'An experience anyone might have had at least once.',
        tokens: [
          { text: '누구나', role: 'plain' },
          { text: '한 번쯤', role: 'plain' },
          { text: '겪을 법한', role: 'plain' },
          { text: '경험이에요', role: 'plain' },
        ],
      },
      {
        ko: '민수가 벌써 도착했을 법해요.',
        zh: '民秀好像已经到了。', zhEn: 'Minsu seems to have already arrived.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '도착했을 법해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침 → -을 법하다', textEn: 'With batchim → -eul beophada', examples: '있다 → 있을 법하다 / 먹다 → 먹을 법하다' },
      { type: 'rule', text: '无받침 → -ㄹ 법하다', textEn: 'Without batchim → -ril beophada', examples: '가다 → 갈 법하다 / 크다 → 클 법하다' },
      { type: 'rule', text: '过去推测 → -았/었을 법하다', textEn: 'Past speculation → -았/었을 법하다', examples: '갔을 법하다（很可能去了）, 도착했을 법하다（很可能到了）', examplesEn: '갔을 법하다 (likely went), 도착했을 법하다 (likely arrived)' },
      { type: 'usage', text: '表达"看起来可能""大概会"，语气委婉', textEn: 'Expresses "seems possible" or "probably will," with a soft tone', examples: '그런 일도 있을 법해요.（这种事也可能有。）', examplesEn: '그런 일도 있을 법해요. (That kind of thing could happen too.)' },
      { type: 'usage', text: '冠形形式 -을/ㄹ 법한 N 用来修饰名词', textEn: 'The adnominal form -을/ㄹ 법한 N is used to modify nouns', examples: '있을 법한 일 / 겪을 법한 경험' },
      { type: 'compare', text: '-을 법하다 vs -을 것 같다 → 前者书面/文学，后者口语', textEn: '-을 법하다 vs -을 것 같다 → the former is written/literary, the latter is colloquial', examples: '올 법해요.(可能会来) / 올 것 같아요.(好像会来)', examplesEn: '올 법해요. (might come) / 올 것 같아요. (seems like it\'ll come)' },
      { type: 'note', text: '与 -는 법이다 结构相似但语义完全不同：前者可能，后者必然道理', textEn: 'Similar in structure to -는 법이다 but completely different in meaning: the former is possibility, the latter is inevitable truth.', examples: '올 법하다(可能来) ≠ 오는 법이다(自然会来)', examplesEn: '올 법하다 (might come) ≠ 오는 법이다 (naturally comes)' },
      { type: 'note', text: '别拿它当日常口语的"会/可能"。它偏书面、文学，语感是"合情合理、说得过去、想象得到"，不是简单猜概率。日常猜测请优先用 -을 것 같다', textEn: 'Don\'t treat it as everyday spoken \'will/might.\' It\'s more written and literary, with a nuance of \'reasonable, plausible, imaginable\'—not just guessing probability. For everyday guesses, prefer -을 것 같다.', examples: '동화에 나올 법한 이야기（像是童话里会有的故事 · 合情合理）', examplesEn: '동화에 나올 법한 이야기 (a story that seems like it could be in a fairy tale · plausible)' },
      { type: 'note', text: '最高频用法是冠形式 -을 법한 + 名词，等于"想象得到的/说得过去的那种…"，是一个固定语感，先整块记住', textEn: 'The most frequent usage is the adnominal form -을 법한 + noun, meaning \'the kind of... you can imagine/that makes sense.\' It\'s a fixed nuance—memorize it as a chunk first.', examples: '있을 법한 일（可能有的事）· 겪을 법한 경험（可能经历的事）', examplesEn: '있을 법한 일 (something that could happen) · 겪을 법한 경험 (an experience you might go through)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그런 일도', role: 'subject' },
          { text: '있을', role: 'verb' },
          { text: '법한', role: 'plain' },
          { text: '일이에요', role: 'plain' },
        ],
        zh: '那种事也可能发生。', zhEn: 'That kind of thing could happen too.',
        swapWords: ['있다', '생기다', '벌어지다', '일어나다'],
      },
      {
        wordBlocks: [
          { text: '누구나', role: 'plain' },
          { text: '한번쯤', role: 'plain' },
          { text: '겪을', role: 'verb' },
          { text: '법한 경험이에요', role: 'plain' },
        ],
        zh: '谁都可能经历过的事。', zhEn: 'Something anyone might have experienced.',
        swapWords: ['겪다', '느끼다', '경험하다', '만나다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '도착했을', role: 'verb' },
          { text: '법해요', role: 'verb' },
        ],
        zh: '民秀应该已经到了吧。', zhEn: 'Min-su should have arrived by now.',
        swapWords: ['도착하다', '오다', '나가다', '떠나다'],
      },
    ],
    scenarios: [
      { icon: '🤔', context: '推测', contextEn: 'Supposition', ko: '그런 일도 있을 법한 일이에요.', zh: '那种事也可能发生。', zhEn: 'That kind of thing could happen too.' },
      { icon: '👥', context: '普遍', contextEn: 'common', ko: '누구나 한 번쯤 겪을 법한 경험이에요.', zh: '谁都可能经历过的事。', zhEn: 'Something anyone might have experienced.' },
      { icon: '⏰', context: '大概', contextEn: 'probably', ko: '민수가 벌써 도착했을 법해요.', zh: '民秀应该已经到了。', zhEn: 'Min-su should have arrived.' },
      { icon: '📚', context: '文学', contextEn: 'literature', ko: '동화에 나올 법한 이야기예요.', zh: '像童话里的故事。', zhEn: 'Like a story from a fairy tale.' },
      { icon: '🎭', context: '想象', contextEn: 'imagination', ko: '영화에나 있을 법한 장면이에요.', zh: '只在电影里可能出现的场景。', zhEn: 'A scene that could only happen in a movie.' },
      { icon: '💭', context: '猜想', contextEn: 'conjecture', ko: '이해 못할 법한 상황은 아니에요.', zh: '不是无法理解的情况。', zhEn: 'It\'s not an incomprehensible situation.' },
    ],
    mistakes: [
      { wrong: '있는 법한 일', correct: '있을 법한 일', note: '推测用 -을/ㄹ 법한，不用 -는', noteEn: 'For speculation, use -을/ㄹ 법한, not -는.' },
      { wrong: '갈 법이에요', correct: '갈 법해요', note: '固定为 -을/ㄹ 법하다，不是 -을 법이에요', noteEn: 'It\'s fixed as -을/ㄹ 법하다, not -을 법이에요.' },
      { wrong: '오는 법하다', correct: '올 법하다', note: '与 -는 법이다(必然) 混淆，推测用 -을/ㄹ', noteEn: 'Don\'t confuse with -는 법이다 (inevitable); for speculation use -을/ㄹ.' },
    ],
    quickTable: {
      title: '-을/ㄹ 법하다 一览', titleEn: '-eul/ril beophada overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有받침', '-을 법하다', '있을 법하다'],
        ['无받침', '-ㄹ 법하다', '갈 법하다'],
        ['过去', '-았/었을 법하다', '도착했을 법하다'],
        ['冠形', '-을/ㄹ 법한 + N', '있을 법한 일'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ 법하다 vs -는 법이다',
      body: '语义辨析', bodyEn: 'Semantic distinction',
      questions: [
        {
          prompt: '"那种事也可能发生"（推测可能性）', promptEn: '\'That kind of thing could happen too\' (speculating possibility)',
          options: ['있는 법한 일이에요', '있을 법한 일이에요', '있는 법이에요', '있기 법한 일이에요'],
          answer: 1,
          explanation: '推测可能用 -을/ㄹ 법한 → 있을 법한 일이에요。', explanationEn: 'For speculating possibility, use -을/ㄹ 법한 → 있을 법한 일이에요.',
        },
        {
          prompt: '"努力的人自然会成功"（必然道理）', promptEn: '\'Those who work hard naturally succeed\' (inevitable truth)',
          options: ['성공할 법한 사람이에요', '성공하는 법이에요', '성공하는 법한 사람이에요', '성공할 법이에요'],
          answer: 1,
          explanation: '必然道理用 -는 법이다 → 성공하는 법이에요。', explanationEn: 'For inevitable truths, use -는 법이다 → 성공하는 법이에요.',
        },
        {
          prompt: '(도착하다) 법해요. 表达"应该已经到了"', promptEn: '(도착하다) 법해요. Expresses \'should have arrived.\'',
          options: ['도착한', '도착할', '도착했을', '도착하는'],
          answer: 2,
          explanation: '"已经到了"是过去推测，用 -았/었을 법하다 → 도착했을 법해요。', explanationEn: '\'Already arrived\' is a past speculation, so use -았/었을 법하다 → 도착했을 법해요.',
        },
        {
          prompt: '-을/ㄹ 법하다 与 -는 법이다 的区别是……', promptEn: 'What\'s the difference between -을/ㄹ 법하다 and -는 법이다...',
          options: ['完全相同', '前者推测可能性，后者陈述必然', '前者过去，后者未来', '前者口语，后者书面'],
          answer: 1,
          explanation: '两者结构相似但语义完全不同：-을/ㄹ 법하다=可能，-는 법이다=必然道理。', explanationEn: 'They look similar but mean totally different things: -을/ㄹ 법하다 = possibility, -는 법이다 = a natural rule.',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"那种事也可能发生""像童话里的故事" —— 韩语文学、书面的推测语气用 <b>-을/ㄹ 법하다</b>。<br>注意别和 -는 법이다(必然道理) 搞混：-을/ㄹ 表可能，-는 表必然。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을/ㄹ 법하다 vs -는 법이다</b><br>
    结构相似 → 语义完全不同！<br>
    ・<b>-을/ㄹ 법하다</b> → 推测可能："可能会/大概"<br>
    <span style="color:#89756e">올 법해요.（可能会来）</span><br>
    ・<b>-는 법이다</b> → 必然道理："本来就"<br>
    <span style="color:#89756e">오는 법이에요.（本来就会来）</span>
  </div>
</div>`,
    compareLabel: '可能 vs 必然', compareLabelEn: 'Possibility vs. inevitability',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ 법하다：有可能</div>
  <div style="font-size:14px;color:#89756e">书面/文学式推测</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有받침 → <b>-을 법하다</b>：있을 법하다<br>
      无받침 → <b>-ㄹ 법하다</b>：갈 법하다<br>
      过去 → <b>-았/었을 법하다</b>：도착했을 법하다<br>
      冠形 → <b>-을/ㄹ 법한 N</b>：있을 법한 일
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型语境</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      文学：동화에 나올 법한 이야기<br>
      电影：영화에나 있을 법한 장면<br>
      推测：벌써 도착했을 법해요<br>
      普遍：누구나 겪을 법한 경험
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">있는 법한 일</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">있을 법한 일（-을/ㄹ 법한）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">오는 법하다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">올 법하다（推测用 -을/ㄹ）</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-기 나름이다 ──────────────────────────────────────
  {
    id: 'card-p27-l04',
    partNumber: 27,
    lessonNumber: 4,
    title: '-기 나름이다',
    whatItDoes: '取决于……', whatItDoesEn: 'Depends on...',
    whatItDoesBody: '「-기 나름이다」表示"取决于……的方式/程度""看你怎么……"。前接动词表达"结果依赖于此动作/方式"。名词版本是 "N 나름이다"（看N而定）。', whatItDoesBodyEn: '\'-gi nareumida\' means \'depends on the way/degree of...\' or \'it\'s up to how you...\'. It follows a verb to express that the result depends on that action/manner. The noun version is \'N nareumida\' (depends on N).',
    structureNote: '动词词干 + -기 나름이다 · 名词 + 나름이다', structureNoteEn: 'Verb stem + -gi nareumida · Noun + nareumida',
    rulesNote: '动词接 -기 后 + 나름이다；名词直接 + 나름이다；不与形容词连用', rulesNoteEn: 'Verbs take -gi then + nareumida; nouns directly + nareumida; not used with adjectives.',
    structures: [
      {
        ko: '성공은 노력하기 나름이에요.',
        zh: '成功取决于你怎么努力。', zhEn: 'Success depends on how you try.',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기 나름이에요', role: 'verb' },
        ],
      },
      {
        ko: '결과는 생각하기 나름이에요.',
        zh: '结果取决于你怎么想。', zhEn: 'The result depends on how you think.',
        tokens: [
          { text: '결과는', role: 'subject' },
          { text: '생각하기 나름이에요', role: 'verb' },
        ],
      },
      {
        ko: '행복은 마음먹기 나름이에요.',
        zh: '幸福在于你的心态。', zhEn: 'Happiness lies in your mindset.',
        tokens: [
          { text: '행복은', role: 'subject' },
          { text: '마음먹기 나름이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기 나름이다', textEn: 'Verb stem + -기 나름이다', examples: '노력하다 → 노력하기 나름이다 / 쓰다 → 쓰기 나름이다' },
      { type: 'rule', text: '名词 + 나름이다', textEn: 'Noun + 나름이다', examples: '사람 나름이에요 / 상황 나름이에요' },
      { type: 'usage', text: '强调"取决于方式/方法"，前接的动作/名词是决定因素', textEn: 'Emphasizes \'depends on the way/method\'; the preceding action/noun is the deciding factor.', examples: '결과는 생각하기 나름이에요.（结果全看你怎么想。）', examplesEn: '결과는 생각하기 나름이에요. (The result all depends on how you think.)' },
      { type: 'usage', text: '常用于回避绝对回答：사람 나름 / 상황 나름 / 경우 나름', textEn: 'Often used to avoid absolute answers: 사람 나름 / 상황 나름 / 경우 나름', examples: '"맛있어요?" - "사람 나름이에요."' },
      { type: 'usage', text: '固定搭配：마음먹기 나름 / 생각하기 나름 / 쓰기 나름', textEn: 'Fixed expressions: 마음먹기 나름 / 생각하기 나름 / 쓰기 나름', examples: '행복은 마음먹기 나름이에요.（幸福取决于心态。）', examplesEn: '행복은 마음먹기 나름이에요. (Happiness depends on your mindset.)' },
      { type: 'compare', text: '-기 나름이다 vs -기에 달려 있다 → 语义几乎相同，可互换', textEn: '-기 나름이다 vs -기에 달려 있다 → nearly identical in meaning, interchangeable.', examples: '노력하기 나름이다（全看努力）= 노력하기에 달려 있다（取决于努力）', examplesEn: '노력하기 나름이다 (all about effort) = 노력하기에 달려 있다 (depends on effort)' },
      { type: 'note', text: '不与形容词连用', textEn: 'Not used with adjectives.', examples: '(✗) 예쁘기 나름이다（错误说法：나름이다 不接形容词）', examplesEn: '(✗) 예쁘기 나름이다 (incorrect: 나름이다 doesn\'t take adjectives)' },
      { type: 'compare', text: '语序和中文相反：中文"成功取决于努力"把"取决于"放中间，韩语把"依据的事(努力)"放前面 + 나름이다，把"结果(成功)"提到句首当主题 -은/는', textEn: 'Word order is opposite to Chinese: Chinese puts \'depends on\' in the middle, but Korean puts the basis (effort) first + 나름이다, and moves the result (success) to the front as the topic -은/는.', examples: '성공은(结果·主题) 노력하기 나름이에요(依据+나름이다).（成功取决于努力）', examplesEn: '성공은 (result·topic) 노력하기 나름이에요 (basis + 나름이다). (Success depends on effort.)' },
      { type: 'note', text: '注意另一个长得像的词：「나름대로」意思是"按自己的方式/自有一套"，和本课"取决于"不同，别混（这是另一个用法，日后遇到单独记）', textEn: 'Watch out for a similar word: \'나름대로\' means \'in one\'s own way / has its own style,\' different from this lesson\'s \'depends on\'—don\'t mix them up (it\'s a separate usage, note it when you see it later).', examples: '나름대로 노력했어요.（我按自己的方式努力过了）≠ 노력하기 나름이에요（取决于努力）', examplesEn: '나름대로 노력했어요. (I tried in my own way) ≠ 노력하기 나름이에요 (depends on effort)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '成功取决于努力。', zhEn: 'Success depends on effort.',
        swapWords: ['노력하다', '준비하다', '실천하다', '집중하다'],
      },
      {
        wordBlocks: [
          { text: '결과는', role: 'subject' },
          { text: '생각하기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '结果取决于想法。', zhEn: 'The result depends on your thoughts.',
        swapWords: ['생각하다', '판단하다', '해석하다', '느끼다'],
      },
      {
        wordBlocks: [
          { text: '행복은', role: 'subject' },
          { text: '마음먹기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '幸福在于心态。', zhEn: 'Happiness is about mindset.',
        swapWords: ['마음먹다', '생각하다', '받아들이다', '살다'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '成功', contextEn: 'Success', ko: '성공은 노력하기 나름이에요.', zh: '成功看努力。', zhEn: 'Success comes down to effort.' },
      { icon: '💭', context: '想法', contextEn: 'thought', ko: '결과는 생각하기 나름이에요.', zh: '结果看怎么想。', zhEn: 'It depends on how you look at it.' },
      { icon: '😊', context: '心态', contextEn: 'mindset', ko: '행복은 마음먹기 나름이에요.', zh: '幸福看心态。', zhEn: 'Happiness depends on your mindset.' },
      { icon: '👥', context: '因人而异', contextEn: 'it varies from person to person', ko: '맛있는지는 사람 나름이에요.', zh: '好不好吃因人而异。', zhEn: 'Whether it tastes good varies from person to person.' },
      { icon: '💰', context: '用钱', contextEn: 'spending money', ko: '돈은 쓰기 나름이에요.', zh: '钱在于怎么花。', zhEn: 'Money is about how you spend it.' },
      { icon: '🎨', context: '解读', contextEn: 'interpretation', ko: '예술은 해석하기 나름이에요.', zh: '艺术在于怎么解读。', zhEn: 'Art is about how you interpret it.' },
    ],
    mistakes: [
      { wrong: '예쁘기 나름이다', correct: '예쁘게 보이기 나름이다', note: '不与形容词连用，需转成动词或名词', noteEn: 'Not used with adjectives; must be converted to a verb or noun.' },
      { wrong: '노력하는 나름이다', correct: '노력하기 나름이다', note: '固定接 -기，不用 -는', noteEn: 'Always takes -기, not -는.' },
      { wrong: '사람 나름이 있어요', correct: '사람 나름이에요', note: '固定为 나름이다，不加 있다', noteEn: 'Fixed as 나름이다, without 있다.' },
    ],
    quickTable: {
      title: '-기 나름이다 用法', titleEn: '-gi nareumida usage',
      headers: ['类型', '规则', '例子'],
      rows: [
        ['动词', '-기 나름이다', '노력하기 나름이다'],
        ['名词', '+ 나름이다', '사람 나름이에요'],
        ['固定搭配', '마음먹기/생각하기 나름', '행복은 마음먹기 나름'],
        ['禁用', '不与形容词直连', '(✗) 예쁘기 나름이다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기 나름이다 练习', titleEn: '-gi nareumida practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '성공은 (노력하다) 나름이에요.',
          options: ['노력하는', '노력하기', '노력한', '노력할'],
          answer: 1,
          explanation: '-기 나름이다 固定接 -기 → 노력하기 나름이에요。', explanationEn: '-기 나름이다 always takes -기 → 노력하기 나름이에요.',
        },
        {
          prompt: '"맛있어요?" "(사람) 나름이에요."',
          options: ['사람이', '사람은', '사람', '사람의'],
          answer: 2,
          explanation: '名词直接 + 나름이다，不加조사 → 사람 나름이에요。', explanationEn: 'Nouns directly take 나름이다, no particle → 사람 나름이에요.',
        },
        {
          prompt: '행복은 (마음먹다) 나름이에요.',
          options: ['마음먹은', '마음먹기', '마음먹는', '마음먹을'],
          answer: 1,
          explanation: '固定搭配 "마음먹기 나름" → 幸福在于心态。', explanationEn: 'Fixed phrase "마음먹기 나름" → Happiness depends on your mindset.',
        },
        {
          prompt: '-기 나름이다 的语义是……', promptEn: 'The meaning of -기 나름이다 is...',
          options: ['本来就……', '取决于……的方式', '不得不……', '不管怎样……'],
          answer: 1,
          explanation: '-기 나름이다 = "取决于……的方式/方法"，强调结果由前项决定。', explanationEn: '-기 나름이다 = "depends on how..." emphasizing that the result is determined by the preceding clause.',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"成功取决于努力""幸福看心态" —— 韩语这种"看你怎么……"的表达用 <b>-기 나름이다</b>。<br>回避绝对回答时也超常用："맛있어요?" "사람 나름이에요."（因人而异）</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>动词版 vs 名词版</b><br>
    ・动词：-기 나름이다 → 노력하기 나름<br>
    ・名词：N 나름이다 → 사람 나름<br>
    两者常互换：<br>
    <span style="color:#89756e">"看情况" 상황 나름 / 상황에 따라 다르기 나름</span>
  </div>
</div>`,
    compareLabel: '动词版 vs 名词版', compareLabelEn: 'Verb version vs. noun version',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기 나름이다：取决于</div>
  <div style="font-size:14px;color:#89756e">看你怎么做</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词 → <b>-기 나름이다</b>：노력하기 나름<br>
      名词 → <b>N 나름이다</b>：사람 나름<br>
      结果依赖于此动作/因素
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">固定金句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      행복은 마음먹기 나름이에요.<br>
      결과는 생각하기 나름이에요.<br>
      돈은 쓰기 나름이에요.<br>
      맛은 사람 나름이에요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁘기 나름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">예쁘게 보이기 나름이다（不与形容词直连）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">노력하는 나름이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">노력하기 나름이다</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：-기에 달려 있다 ──────────────────────────────────────
  {
    id: 'card-p27-l05',
    partNumber: 27,
    lessonNumber: 5,
    title: '-기에 달려 있다',
    whatItDoes: '在于……', whatItDoesEn: 'Lies in...',
    whatItDoesBody: '「-기에 달려 있다」表示"取决于……""在于……""看……"。用于强调事情的关键决定因素。名词版本是 "N에 달려 있다"。语气比 -기 나름이다 更正式书面。', whatItDoesBodyEn: '\'-gie dallyeo itda\' means \'depends on...\', \'lies in...\', \'hinges on...\'. It\'s used to emphasize the key determining factor. The noun version is \'N-e dallyeo itda\'. It\'s more formal and written than -gi nareumida.',
    structureNote: '动词词干 + -기에 달려 있다 · 名词 + 에 달려 있다', structureNoteEn: 'Verb stem + -gie dallyeo itda · Noun + e dallyeo itda',
    rulesNote: '固定搭配"-기에 달려 있다"；主语常为决定的对象（성공/실패/미래 等）', rulesNoteEn: 'Fixed expression \'-gie dallyeo itda\'; the subject is often the thing being determined (success/failure/future, etc.).',
    structures: [
      {
        ko: '성공은 노력하기에 달려 있어요.',
        zh: '成功在于努力。', zhEn: 'Success depends on effort.',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '결과는 어떻게 준비하기에 달려 있어요.',
        zh: '结果取决于怎么准备。', zhEn: 'The result depends on how you prepare.',
        tokens: [
          { text: '결과는', role: 'subject' },
          { text: '어떻게', role: 'plain' },
          { text: '준비하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '우리의 미래는 오늘의 선택에 달려 있어요.',
        zh: '我们的未来取决于今天的选择。', zhEn: 'Our future depends on today\'s choices.',
        tokens: [
          { text: '우리의', role: 'plain' },
          { text: '미래는', role: 'subject' },
          { text: '오늘의 선택에', role: 'plain' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기에 달려 있다', textEn: 'Verb stem + -기에 달려 있다', examples: '노력하다 → 노력하기에 달려 있다' },
      { type: 'rule', text: '名词 + 에 달려 있다', textEn: 'Noun + 에 달려 있다', examples: '노력 → 노력에 달려 있다 / 선택 → 선택에 달려 있다' },
      { type: 'usage', text: '强调关键决定因素，语气比 -기 나름이다 正式', textEn: 'Emphasizes the key deciding factor; more formal than -기 나름이다.', examples: '성공은 노력하기에 달려 있어요.（成功取决于努力。）', examplesEn: '성공은 노력하기에 달려 있어요. (Success depends on effort.)' },
      { type: 'usage', text: '前面加疑问词"怎么/多少"时要用 -느냐에/-는지에，不能用 -기에', textEn: 'When adding question words like "how" or "how much," use -느냐에/-는지에, not -기에.', examples: '결과는 어떻게 준비하느냐에 달려 있어요.（结果取决于怎么准备。）', examplesEn: 'The result depends on how you prepare.' },
      { type: 'usage', text: '书面表达常用于演讲、教育、格言', textEn: 'Common in formal writing, such as speeches, education, and proverbs.', examples: '아이의 미래는 부모의 사랑에 달려 있다.（孩子的未来取决于父母的爱。）', examplesEn: 'A child\'s future depends on their parents\' love.' },
      { type: 'compare', text: '-기에 달려 있다 vs -기 나름이다 → 前者更正式书面，后者口语', textEn: '-기에 달려 있다 vs -기 나름이다: the former is more formal/written, the latter is colloquial.', examples: '노력하기에 달려 있어요（取决于努力）= 노력하기 나름이에요（全看努力）', examplesEn: 'It depends on effort = It\'s all about effort.' },
      { type: 'note', text: '与 "달려있다"(挂着) 是不同的动词短语，需理解为"取决于"', textEn: 'This is a different verb phrase from "달려있다" (to hang); understand it as "to depend on."', examples: '달려 있다 在此为习惯搭配', examplesEn: '달려 있다 is a fixed collocation here.' },
      { type: 'note', text: '取决于"是否/多么/怎样……"时，韩语把疑问嵌进去用 -느냐에／-는지에 달려 있다，不能把 얼마나/어떻게 硬接到 -기에 上（间接疑问后面章节详学）', textEn: 'When expressing "depends on whether/how much/how," Korean embeds the question using -느냐에/-는지에 달려 있다; you can\'t attach 얼마나/어떻게 directly to -기에 (indirect questions are covered in a later chapter).', examples: '얼마나 노력하느냐에 달려 있어요.（取决于你多努力。）', examplesEn: 'It depends on how hard you try.' },
      { type: 'example', text: '"成不成 / 做不做"这种正反问用 -느냐 마느냐', textEn: 'For yes/no questions like "whether it works or not," use -느냐 마느냐.', examples: '성공하느냐 마느냐는 마음가짐에 달려 있어요.（成不成取决于心态。）', examplesEn: 'Whether you succeed or not depends on your mindset.' },
      { type: 'note', text: '别把主语和决定因素接反：被决定的结果（성공·미래）做主语带 은/는，决定因素才带 에／기에', textEn: 'Don\'t reverse the subject and the determining factor: the result being determined (성공·미래) takes 은/는 as the subject, while the determining factor takes 에/기에.', examples: '성공은 노력에 달려 있다（○） · 노력은 성공에 달려 있다（✗ 意思反了）', examplesEn: 'Success depends on effort (○) · Effort depends on success (✗ — meaning reversed).' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려', role: 'verb' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '成功在于努力。', zhEn: 'Success depends on effort.',
        swapWords: ['노력하다', '준비하다', '실천하다', '집중하다'],
      },
      {
        wordBlocks: [
          { text: '결과는', role: 'subject' },
          { text: '어떻게', role: 'plain' },
          { text: '준비하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
        zh: '结果看怎么准备。', zhEn: 'The result depends on how you prepare.',
        swapWords: ['준비하다', '접근하다', '진행하다', '대응하다'],
      },
      {
        wordBlocks: [
          { text: '미래는', role: 'subject' },
          { text: '오늘의', role: 'plain' },
          { text: '선택에', role: 'plain' },
          { text: '달려 있어요', role: 'verb' },
        ],
        zh: '未来取决于今天的选择。', zhEn: 'The future depends on today\'s choices.',
        swapWords: ['선택', '결정', '노력', '태도'],
      },
    ],
    scenarios: [
      { icon: '🏆', context: '成功', contextEn: 'Success', ko: '성공은 노력하기에 달려 있어요.', zh: '成功在于努力。', zhEn: 'Success depends on effort.' },
      { icon: '📊', context: '结果', contextEn: 'result', ko: '결과는 어떻게 준비하기에 달려 있어요.', zh: '结果看怎么准备。', zhEn: 'The result depends on how you prepare.' },
      { icon: '🔮', context: '未来', contextEn: 'Future', ko: '미래는 오늘의 선택에 달려 있어요.', zh: '未来取决于今天。', zhEn: 'The future depends on today.' },
      { icon: '💖', context: '关系', contextEn: 'Relationships', ko: '관계는 서로의 태도에 달려 있어요.', zh: '关系在于彼此态度。', zhEn: 'Relationships depend on each other\'s attitudes.' },
      { icon: '📚', context: '学习', contextEn: 'to study', ko: '실력은 얼마나 연습하느냐에 달려 있어요.', zh: '实力看练多少。', zhEn: 'Skill depends on how much you practice.' },
      { icon: '🎯', context: '目标', contextEn: 'Goal', ko: '목표 달성은 계획에 달려 있어요.', zh: '目标实现在于计划。', zhEn: 'Achieving your goals depends on your plan.' },
    ],
    mistakes: [
      { wrong: '노력하는 데 달려 있다', correct: '노력하기에 달려 있다', note: '固定搭配是 -기에 달려 있다', noteEn: 'The fixed collocation is -기에 달려 있다.' },
      { wrong: '노력에 달렸어요', correct: '노력에 달려 있어요', note: '正确形是 달려 있다（不是 달렸다）', noteEn: 'The correct form is dallyeo itda (not dallyeotda).' },
      { wrong: '노력하기 달려 있다', correct: '노력하기에 달려 있다', note: '必须有 에；-기에 是固定接续', noteEn: '에 is required; -기에 is a fixed connector.' },
    ],
    quickTable: {
      title: '-기에 달려 있다 用法', titleEn: '-gie dallyeo itda usage',
      headers: ['类型', '规则', '例子'],
      rows: [
        ['动词', '-기에 달려 있다', '노력하기에 달려 있다'],
        ['名词', '에 달려 있다', '선택에 달려 있다'],
        ['强调', '어떻게/얼마나 + -기에', '어떻게 준비하기에'],
        ['同义', '-기 나름이다', '两者可互换'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-기에 달려 있다 练习', titleEn: '-gie dallyeo itda practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '성공은 (노력하다) 달려 있어요.',
          options: ['노력하기', '노력하기에', '노력해서', '노력하러'],
          answer: 1,
          explanation: '固定搭配是 -기에 달려 있다 → 노력하기에。', explanationEn: 'The fixed collocation is -기에 달려 있다 → 노력하기에.',
        },
        {
          prompt: '미래는 오늘의 (선택) 달려 있어요.',
          options: ['선택', '선택이', '선택에', '선택은'],
          answer: 2,
          explanation: '名词版是 N에 달려 있다 → 선택에 달려 있어요。', explanationEn: 'The noun version is N에 달려 있다 → 선택에 달려 있어요.',
        },
        {
          prompt: '결과는 어떻게 (준비하다) 달려 있어요.',
          options: ['준비하기', '준비하기에', '준비해서', '준비하면'],
          answer: 1,
          explanation: '-기에 달려 있다 固定接 -기에 → 준비하기에 달려 있어요。', explanationEn: '-기에 달려 있다 is fixed with -기에 → 준비하기에 달려 있어요.',
        },
        {
          prompt: '哪个句子正确？', promptEn: 'Which sentence is correct?',
          options: ['노력에 달렸어요', '노력하기 달려 있어요', '노력에 달려 있어요', '노력하는 데 달려 있어요'],
          answer: 2,
          explanation: '正确形态是 N에 달려 있다，명사"노력" + 에 달려 있다 → 노력에 달려 있어요。', explanationEn: 'The correct form is N에 달려 있다, noun "노력" + 에 달려 있다 → 노력에 달려 있어요.',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"成功在于努力""未来取决于选择" —— 韩语正式版"取决于……"用 <b>-기에 달려 있다</b>。<br>它是 -기 나름이다 的书面版，多用于演讲、教育、格言。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-기에 달려 있다 vs -기 나름이다</b><br>
    语义几乎相同："取决于……"<br>
    ・-기에 달려 있다 → 正式/书面/格言<br>
    <span style="color:#89756e">성공은 노력하기에 달려 있어요.</span><br>
    ・-기 나름이다 → 日常口语<br>
    <span style="color:#89756e">성공은 노력하기 나름이에요.</span>
  </div>
</div>`,
    compareLabel: '书面 vs 口语', compareLabelEn: 'Written vs. Spoken',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-기에 달려 있다：在于</div>
  <div style="font-size:14px;color:#89756e">正式/书面版"取决于"</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词 → <b>-기에 달려 있다</b><br>
      名词 → <b>N에 달려 있다</b><br>
      前面常加 어떻게/얼마나 强调
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">经典金句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      성공은 노력하기에 달려 있다.<br>
      미래는 오늘의 선택에 달려 있다.<br>
      관계는 서로의 태도에 달려 있다.<br>
      실력은 얼마나 연습하기에 달려 있다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">노력하기 달려 있다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">노력하기에 달려 있다（必须有 에）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">노력에 달렸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">노력에 달려 있어요（달려 있다）</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：-는 셈이다 ──────────────────────────────────────
  {
    id: 'card-p27-l06',
    partNumber: 27,
    lessonNumber: 6,
    title: '-는 셈이다',
    whatItDoes: '算是……', whatItDoesEn: 'Could be considered...',
    whatItDoesBody: '「-는/은/ㄴ 셈이다」表示"算是……""相当于……""可以说是……"。用于综合考虑各方面后做出的估算/评价。多用于总结、评估、比较后的结论。', whatItDoesBodyEn: '\'-는/은/ㄴ 셈이다\' means \'can be considered as...\', \'amounts to...\', \'one could say...\'. It\'s used for estimates/evaluations made after considering various aspects, often in conclusions after summarizing, assessing, or comparing.',
    structureNote: '动词现在 -는 셈이다 · 形容词 -은/ㄴ 셈이다 · 名词 -인 셈이다 · 过去 -은/ㄴ 셈이다', structureNoteEn: 'Verb present -는 셈이다 · Adjective -은/ㄴ 셈이다 · Noun -인 셈이다 · Past -은/ㄴ 셈이다',
    rulesNote: '关注冠形选择：动词现在 -는，动词过去 -은/ㄴ，形容词 -은/ㄴ，名词 -인', rulesNoteEn: 'Note the adnominal form: verb present -는, verb past -은/ㄴ, adjective -은/ㄴ, noun -인',
    structures: [
      {
        ko: '이 정도면 잘 사는 셈이에요.',
        zh: '这种程度算是过得好了。', zhEn: 'This level counts as living well.',
        tokens: [
          { text: '이 정도면', role: 'plain' },
          { text: '잘 사는 셈이에요', role: 'verb' },
        ],
      },
      {
        ko: '5만 원이면 싼 셈이에요.',
        zh: '5万韩元算便宜了。', zhEn: '50,000 won is considered cheap.',
        tokens: [
          { text: '5만 원이면', role: 'plain' },
          { text: '싼 셈이에요', role: 'plain' },
        ],
      },
      {
        ko: '민수는 거의 다 온 셈이에요.',
        zh: '民秀算是快到了。', zhEn: 'Minsu is almost here, so to speak.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '거의', role: 'plain' },
          { text: '다 온 셈이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 셈이다', textEn: 'Verb present: -는 셈이다', examples: '가다 → 가는 셈이다 / 먹다 → 먹는 셈이다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 셈이다', textEn: 'Verb past: -은/ㄴ 셈이다', examples: '갔다 → 간 셈이다 / 먹었다 → 먹은 셈이다' },
      { type: 'rule', text: '形容词：有받침 -은 / 无받침 -ㄴ 셈이다', textEn: 'Adjective: with batchim -은 / without batchim -ㄴ 셈이다', examples: '좋다 → 좋은 셈이다 / 싸다 → 싼 셈이다' },
      { type: 'rule', text: '名词：-인 셈이다', textEn: 'Noun: -인 셈이다', examples: '학생인 셈이다 / 반은 성공인 셈이다' },
      { type: 'usage', text: '综合考虑后的估算/评价，含"就……而言算是"', textEn: 'An estimate/evaluation after considering everything, meaning "considering..., it counts as"', examples: '이 정도면 잘 사는 셈이에요.（这样算是过得不错了。）', examplesEn: '이 정도면 잘 사는 셈이에요. (This counts as living well.)' },
      { type: 'usage', text: '常见搭配：거의 다 -은 셈이다（算是快……了）', textEn: 'Common collocation: 거의 다 -은 셈이다 (counts as almost...ing)', examples: '거의 다 끝난 셈이에요.（算是差不多结束了。）', examplesEn: '거의 다 끝난 셈이에요. (It counts as almost finished.)' },
      { type: 'compare', text: '-는 셈이다 vs -는 셈치다 → 前者估算评价，后者假想/就当', textEn: '-는 셈이다 vs -는 셈치다 → the former is an estimate/evaluation, the latter is hypothetical/pretend', examples: '가는 셈이다(算是去) / 가는 셈치다(就当作去)', examplesEn: '가는 셈이다 (counts as going) / 가는 셈치다 (pretend to go)' },
      { type: 'compare', text: '-는 셈이다 vs -는 편이다 → 都译"算是"，但 편이다 是"在同类中偏向某一端(比较…)"，셈이다 是"折算下来相当于/几乎等于"', textEn: '-는 셈이다 vs -는 편이다 → both translate as "counts as," but 편이다 means "leans toward one end within a category (comparatively...)" while 셈이다 means "when calculated, it\'s equivalent to/almost equals"', examples: '싼 편이에요（算是比较便宜的一类）/ 싼 셈이에요（折算下来算便宜了）', examplesEn: '싼 편이에요 (counts as the cheaper kind) / 싼 셈이에요 (when calculated, it\'s cheap)' },
      { type: 'note', text: '语义核心是"实际虽非如此、但折算/综合下来相当于"，需要一个前提或比较基准，不能当普通判断词"是"来用', textEn: 'The semantic core is "although not actually so, when calculated/combined, it\'s equivalent to," requiring a premise or comparison basis, and can\'t be used as a simple copula "is"', examples: '거의 다 온 셈이에요.（实际还没到，但折算下来算是快到了。）', examplesEn: '거의 다 온 셈이에요. (Not actually arrived yet, but when calculated, it counts as almost here.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 정도면', role: 'plain' },
          { text: '잘 사는', role: 'verb' },
          { text: '셈이에요', role: 'verb' },
        ],
        zh: '这种程度算是好的。', zhEn: 'This level counts as good.',
        swapWords: ['잘 살다', '잘 하다', '잘 지내다', '잘 되다'],
      },
      {
        wordBlocks: [
          { text: '5만 원이면', role: 'plain' },
          { text: '싼', role: 'plain' },
          { text: '셈이에요', role: 'plain' },
        ],
        zh: '5万韩元算便宜了。', zhEn: '50,000 won is considered cheap.',
        swapWords: ['싸다', '적당하다', '괜찮다', '저렴하다'],
      },
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '거의', role: 'plain' },
          { text: '다 온', role: 'verb' },
          { text: '셈이에요', role: 'verb' },
        ],
        zh: '民秀算是快到了。', zhEn: 'Minsu is almost here, so to speak.',
        swapWords: ['오다', '끝나다', '마치다', '도착하다'],
      },
    ],
    scenarios: [
      { icon: '💰', context: '价格', contextEn: 'price', ko: '5만 원이면 싼 셈이에요.', zh: '5万算便宜了。', zhEn: '50,000 counts as cheap.' },
      { icon: '🏠', context: '生活', contextEn: 'Life', ko: '이 정도면 잘 사는 셈이에요.', zh: '这样算过得好。', zhEn: 'This counts as living well.' },
      { icon: '✅', context: '完成度', contextEn: 'Completion', ko: '숙제는 거의 다 한 셈이에요.', zh: '作业算是快做完了。', zhEn: 'The homework is almost done, I\'d say.' },
      { icon: '🎓', context: '身份', contextEn: 'Identity', ko: '거의 대학생인 셈이에요.', zh: '算是差不多是大学生了。', zhEn: 'You could say you\'re basically a college student now.' },
      { icon: '⚡', context: '快速', contextEn: 'quick', ko: '3시간이면 빠른 셈이에요.', zh: '3小时算快的。', zhEn: '3 hours is considered fast.' },
      { icon: '🏃', context: '接近', contextEn: 'close to', ko: '민수는 거의 다 온 셈이에요.', zh: '民秀算是快到了。', zhEn: 'Minsu is almost here, so to speak.' },
    ],
    mistakes: [
      { wrong: '싸는 셈이다', correct: '싼 셈이다', note: '形容词用 -은/ㄴ，不用 -는', noteEn: 'For adjectives, use -은/ㄴ, not -는.' },
      { wrong: '학생 셈이다', correct: '학생인 셈이다', note: '名词需加 -인', noteEn: 'Nouns require -인.' },
      { wrong: '가는 셈쳤어요', correct: '가는 셈이에요', note: '-셈이다 是评估，-셈치다 是假想，需区分', noteEn: '-셈이다 is an assessment, -셈치다 is hypothetical; they need to be distinguished.' },
    ],
    quickTable: {
      title: '-는 셈이다 冠形', titleEn: '-는 셈이다 adnominal form',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在', '-는 셈이다', '가는 셈이다'],
        ['动词过去', '-은/ㄴ 셈이다', '간 셈이다'],
        ['形容词有받침', '-은 셈이다', '좋은 셈이다'],
        ['形容词无받침', '-ㄴ 셈이다', '싼 셈이다'],
        ['名词', '-인 셈이다', '학생인 셈이다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-는 셈이다 冠形选择', titleEn: '-는 셈이다 adnominal form selection',
      body: '选正确冠形', bodyEn: 'Choose the correct adnominal form',
      questions: [
        {
          prompt: '이 정도면 (잘 살다) 셈이에요.',
          options: ['잘 산', '잘 사는', '잘 살', '잘 살기'],
          answer: 1,
          explanation: '动词现在冠形 → 잘 사는 셈이에요。', explanationEn: 'Present verb modifier → 잘 사는 셈이에요.',
        },
        {
          prompt: '5만 원이면 (싸다) 셈이에요.',
          options: ['싸는', '싼', '싼다는', '쌀'],
          answer: 1,
          explanation: '싸다 形容词无받침，冠形 -ㄴ → 싼 셈이에요。', explanationEn: '싸다 is an adjective without batchim, adnominal -ㄴ → 싼 셈이에요.',
        },
        {
          prompt: '민수는 거의 다 (오다) 셈이에요.',
          options: ['오는', '온', '올', '오기'],
          answer: 1,
          explanation: '"快到了"是完成的状态，用过去冠形 → 온 셈이에요。', explanationEn: '"Almost there" is a completed state, use past modifier → 온 셈이에요.',
        },
        {
          prompt: '거의 (대학생) 셈이에요.',
          options: ['대학생', '대학생이', '대학생인', '대학생는'],
          answer: 2,
          explanation: '名词冠形 -인 → 대학생인 셈이에요。', explanationEn: 'Noun modifier -인 → 대학생인 셈이에요.',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"这样算过得好的""5万算便宜了" —— 韩语综合评估后下结论用 <b>-는/은/ㄴ 셈이다</b>。<br>核心是"综合考虑后，可以说是……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-는 셈이다 vs -는 셈치다</b><br>
    ・-는 셈이다 → 综合评估：算是……<br>
    <span style="color:#89756e">가는 셈이에요.（算是去了）</span><br>
    ・-는 셈치다 → 假想让步：就当作……<br>
    <span style="color:#89756e">가는 셈치고 그냥 자요.（就当去了，睡吧）</span>
  </div>
</div>`,
    compareLabel: '-셈이다 vs -셈치다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 셈이다：算是</div>
  <div style="font-size:14px;color:#89756e">综合评估的结论</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形变化</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는 셈이다</b>：가는 셈이다<br>
      动词过去 → <b>-은/ㄴ 셈이다</b>：간 셈이다<br>
      形容词 → <b>-은/ㄴ 셈이다</b>：싼 셈이다<br>
      名词 → <b>-인 셈이다</b>：학생인 셈이다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用套路</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      이 정도면 -는/은/ㄴ 셈이다<br>
      거의 다 -은 셈이다<br>
      비교하면 -은 셈이다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">싸는 셈이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">싼 셈이다（形容词用 -ㄴ）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 셈이다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생인 셈이다</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：-는 셈치다 ──────────────────────────────────────
  {
    id: 'card-p27-l07',
    partNumber: 27,
    lessonNumber: 7,
    title: '-는 셈치다',
    whatItDoes: '就当作……', whatItDoesEn: 'Just consider it as...',
    whatItDoesBody: '「-는/은/ㄴ 셈치다」表示"就当作……""假设……""视为……"。用于假想、心理让步或安慰自己接受某种情况。语气类似"就当没发生"。', whatItDoesBodyEn: '\'-는/은/ㄴ 셈치다\' means \'to consider as...\', \'to assume...\', \'to regard as...\'. Used for hypotheticals, mental concessions, or comforting oneself to accept a situation. The tone is similar to \'just pretend it didn\'t happen\'.',
    structureNote: '动词现在 -는 셈치다 · 动词过去 -은/ㄴ 셈치다 · 形容词 -은/ㄴ 셈치다 · 名词 -인 셈치다', structureNoteEn: 'Verb present -는 셈치다 · Verb past -은/ㄴ 셈치다 · Adjective -은/ㄴ 셈치다 · Noun -인 셈치다',
    rulesNote: '常搭配 -고 用作连接："-는 셈치고" = 就当作……，然后……', rulesNoteEn: 'Often used with -고 as a connector: \'-는 셈치고\' = consider it as..., then...',
    structures: [
      {
        ko: '오늘은 쉬는 셈치고 아무 것도 안 할래요.',
        zh: '今天就当休息，什么都不做。', zhEn: 'Let\'s just treat today as a rest day and do nothing.',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '쉬는 셈치고', role: 'verb' },
          { text: '아무 것도', role: 'object' },
          { text: '안 할래요', role: 'verb' },
        ],
      },
      {
        ko: '속은 셈치고 잊어버려요.',
        zh: '就当被骗了，忘了吧。', zhEn: 'Just consider yourself scammed and forget it.',
        tokens: [
          { text: '속은 셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
      },
      {
        ko: '5만 원을 잃어버린 셈치고 기부했어요.',
        zh: '就当丢了5万块，捐掉了。', zhEn: 'Treat it as if you lost 50,000 won and donated it.',
        tokens: [
          { text: '5만 원을', role: 'object' },
          { text: '잃어버린 셈치고', role: 'verb' },
          { text: '기부했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 셈치다', textEn: 'Present verb: -는 셈치다', examples: '쉬다 → 쉬는 셈치다 / 자다 → 자는 셈치다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 셈치다', textEn: 'Past verb: -은/ㄴ 셈치다', examples: '속다 → 속은 셈치다 / 잃다 → 잃은 셈치다' },
      { type: 'rule', text: '形容词/名词：-은/ㄴ 셈치다 / -인 셈치다', textEn: 'Adjective/Noun: -은/ㄴ 셈치다 / -인 셈치다', examples: '없는 셈치다 / 학생인 셈치다' },
      { type: 'usage', text: '常搭配 -고 连接："-는 셈치고" + 后续行动', textEn: 'Often used with -고: "-는 셈치고" + following action', examples: '속은 셈치고 잊어버려요.（就当被骗了，忘了吧。）', examplesEn: '속은 셈치고 잊어버려요. (Just consider yourself scammed and forget it.)' },
      { type: 'usage', text: '心理调节：让自己接受损失/意外/委屈', textEn: 'Mental adjustment: making yourself accept loss, accidents, or grievances', examples: '5만 원을 잃어버린 셈치고 기부했어요.（就当丢了 5 万韩元，捐了。）', examplesEn: '5만 원을 잃어버린 셈치고 기부했어요. (Treat it as if you lost 50,000 won and donated it.)' },
      { type: 'compare', text: '-는 셈이다 vs -는 셈치다 → 前者综合评估的事实，后者假想让步', textEn: '-는 셈이다 vs -는 셈치다 → the former is an overall assessment of facts, the latter is hypothetical concession', examples: '가는 셈이다(算是去了) / 가는 셈치자(就当去了)', examplesEn: '가는 셈이다 (counts as going) / 가는 셈치자 (let\'s pretend we went)' },
      { type: 'note', text: '-는 셈치다 常用建议形态"-는 셈치자/치고 -하자"', textEn: '-는 셈치다 is often used in suggestion form "-는 셈치자/치고 -하자"', examples: '그냥 없는 셈치자.（就当没有吧。）', examplesEn: 'Let\'s just pretend it doesn\'t exist.' },
      { type: 'compare', text: '-는 셈치다 vs -는 척하다 → 셈치다 是自己内心决定"就当作(接受)"，척하다 是对外"装作/假装"给别人看（척하다 后面章节详学）', textEn: '-는 셈치다 vs -는 척하다 → 셈치다 is an internal decision to \'consider it as (accept)\', while 척하다 is outward \'pretending/acting\' for others (척하다 is covered in detail in a later chapter).', examples: '못 본 셈치고 넘어가요（自己决定当没看见、放过）/ 못 본 척했어요（假装没看见、演给对方看）', examplesEn: '못 본 셈치고 넘어가요 (decide to overlook it and let it go) / 못 본 척했어요 (pretended not to see, acting for the other person).' },
      { type: 'note', text: '本质是与事实相反的假想：明明发生了/存在，却决定"当作"相反，所以常带 그냥、그렇다 치고 等词缓和语气', textEn: 'The essence is a hypothetical contrary to reality: something happened/exists, but you decide to \'treat it as\' the opposite, so words like 그냥, 그렇다 치고 are often used to soften the tone.', examples: '그냥 안 들은 셈칠게요.（我就当没听到吧。）', examplesEn: 'I\'ll just pretend I didn\'t hear it.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '쉬는', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '안 할래요', role: 'verb' },
        ],
        zh: '今天就当休息，不做了。', zhEn: 'Let\'s just treat today as a rest day and skip it.',
        swapWords: ['쉬다', '자다', '놀다', '즐기다'],
      },
      {
        wordBlocks: [
          { text: '속은', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
        zh: '就当被骗了，忘了吧。', zhEn: 'Just consider yourself scammed and forget it.',
        swapWords: ['속다', '당하다', '실수하다', '넘어지다'],
      },
      {
        wordBlocks: [
          { text: '잃어버린', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '기부했어요', role: 'verb' },
        ],
        zh: '就当丢了，捐了。', zhEn: 'Just consider it lost and donated.',
        swapWords: ['잃어버리다', '없어지다', '버리다', '지나가다'],
      },
    ],
    scenarios: [
      { icon: '😴', context: '自我安慰', contextEn: 'self-comfort', ko: '오늘은 쉬는 셈치고 아무 것도 안 할래요.', zh: '今天就当休息。', zhEn: 'Just treat today as a rest day.' },
      { icon: '😞', context: '被骗', contextEn: 'to be scammed', ko: '속은 셈치고 잊어버려요.', zh: '就当被骗了。', zhEn: 'Just consider it as being scammed.' },
      { icon: '💸', context: '认栽', contextEn: 'to accept the loss', ko: '5만 원을 잃어버린 셈치고 기부했어요.', zh: '就当丢了钱。', zhEn: 'Just think of it as losing money.' },
      { icon: '📚', context: '假想', contextEn: 'hypothetical', ko: '내가 그를 모르는 셈치자.', zh: '就当我不认识他。', zhEn: 'Just pretend I don\'t know him.' },
      { icon: '👻', context: '视而不见', contextEn: 'to turn a blind eye', ko: '없는 셈치고 넘어가요.', zh: '就当没有，过去吧。', zhEn: 'Just pretend it\'s not there and move on.' },
      { icon: '🙈', context: '不追究', contextEn: 'to not pursue', ko: '못 본 셈치고 지나갈게요.', zh: '就当没看见，过去了。', zhEn: 'Just pretend you didn\'t see it and let it pass.' },
    ],
    mistakes: [
      { wrong: '쉬는 셈이고', correct: '쉬는 셈치고', note: '"就当作"用 -셈치다，不是 -셈이다', noteEn: 'For \'just consider it as\', use -셈치다, not -셈이다.' },
      { wrong: '속이는 셈치고', correct: '속는 셈치고', note: '"就当上当一次"用 속다（被骗）的 속는，不是 속이다（骗别人）的 속이는', noteEn: 'For \'just consider it as being fooled once\', use 속다 (to be scammed) in the form 속는, not 속이다 (to deceive others) in the form 속이는.' },
      { wrong: '학생 셈치다', correct: '학생인 셈치다', note: '名词需加 -인', noteEn: 'Nouns require -인.' },
    ],
    quickTable: {
      title: '-는 셈치다 用法', titleEn: '-는 셈치다 usage',
      headers: ['类型', '规则', '例子'],
      rows: [
        ['动词现在', '-는 셈치다', '쉬는 셈치다'],
        ['动词过去', '-은/ㄴ 셈치다', '속은 셈치다'],
        ['连接', '-는 셈치고', '없는 셈치고 잊어요'],
        ['建议', '-는 셈치자', '없는 셈치자'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-는 셈치다 vs -는 셈이다',
      body: '选正确语义', bodyEn: 'Choose the correct meaning.',
      questions: [
        {
          prompt: '"就当被骗了，忘了吧"', promptEn: '\'Just consider it as being scammed and forget it.\'',
          options: ['속는 셈이고 잊어요', '속은 셈이고 잊어요', '속은 셈치고 잊어요', '속는 셈치고 잊어요'],
          answer: 2,
          explanation: '"就当作"用 -셈치다；"被骗了"是完成动作用过去 -은 → 속은 셈치고。', explanationEn: 'For \'just consider it as\', use -셈치다; \'was scammed\' is a completed action, so use the past form -은 → 속은 셈치고.',
        },
        {
          prompt: '"这样算过得好的"（评估）', promptEn: '\'This counts as living well\' (evaluation).',
          options: ['이 정도면 잘 사는 셈이에요', '이 정도면 잘 사는 셈쳐요', '이 정도면 잘 산 셈치자', '이 정도면 잘 사기 셈이에요'],
          answer: 0,
          explanation: '综合评估用 -셈이다 → 잘 사는 셈이에요。', explanationEn: 'For overall assessment, use -셈이다 → 잘 사는 셈이에요.',
        },
        {
          prompt: '오늘은 (쉬다) 셈치고 아무 것도 안 할래요.',
          options: ['쉰', '쉬는', '쉴', '쉬기'],
          answer: 1,
          explanation: '"今天就当休息"用动词现在冠形 -는 → 쉬는 셈치고。', explanationEn: '"Just treat today as rest" uses the present adnominal form -는 → 쉬는 셈치고.',
        },
        {
          prompt: '-는 셈치다 与 -는 셈이다 的区别是……', promptEn: 'The difference between -는 셈치다 and -는 셈이다 is...',
          options: ['完全相同', '前者假想/让步"就当"，后者评估"算是"', '前者过去，后者未来', '前者口语，后者书面'],
          answer: 1,
          explanation: '-셈이다=综合评估的事实"算是"；-셈치다=假想让步"就当作"。', explanationEn: '-셈이다 = an assessed fact, "counts as"; -셈치다 = hypothetical concession, "just pretend it\'s".',
        },
      ],
    },
    linkedGrammarIds: ['card-p27-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"就当被骗了""就当丢了钱" —— 这种自我安慰、假想让步用 <b>-는/은 셈치다</b>。<br>常搭配 -고 用作连接："-는 셈치고 + 后续行动"。别和 -셈이다(算是) 搞混。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-셈이다 vs -셈치다</b><br>
    结构相似但语义分工明确<br>
    ・<b>-셈이다</b> → 综合评估的事实<br>
    <span style="color:#89756e">잘 사는 셈이에요.（算是过得好）</span><br>
    ・<b>-셈치다</b> → 假想让步/自我安慰<br>
    <span style="color:#89756e">속은 셈치고 잊어요.（就当被骗，忘了）</span>
  </div>
</div>`,
    compareLabel: '事实 vs 假想', compareLabelEn: 'Fact vs. Hypothesis',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 셈치다：就当作</div>
  <div style="font-size:14px;color:#89756e">假想 · 心理调节</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形变化</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는 셈치다</b>：쉬는 셈치다<br>
      动词过去 → <b>-은/ㄴ 셈치다</b>：속은 셈치다<br>
      形容词 → <b>-은/ㄴ 셈치다</b>：없는 셈치다<br>
      名词 → <b>-인 셈치다</b>：학생인 셈치다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      被骗认栽：속은 셈치고 잊어요<br>
      损失接受：잃어버린 셈치고 기부해요<br>
      视而不见：못 본 셈치고 지나가요<br>
      自我调节：오늘은 쉬는 셈치자
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">쉬는 셈이고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">쉬는 셈치고</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">속는 셈치고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">속은 셈치고（完成用 -은）</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：-는 척하다 / -는 체하다 深化 ──────────────────────────────────────
  {
    id: 'card-p27-l08',
    partNumber: 27,
    lessonNumber: 8,
    title: '-는 척하다 / -는 체하다 深化', titleEn: '-는 척하다 / -는 체하다 deep dive',
    whatItDoes: '假装……', whatItDoesEn: 'Pretend to...',
    whatItDoesBody: '「-는/은/ㄴ 척하다 / -는/은/ㄴ 체하다」表示"假装……""装作……"。两者语义几乎相同，척하다 更口语，체하다 更书面。冠形变化按词类而定，与 -셈이다 相同。', whatItDoesBodyEn: '\'-는/은/ㄴ 척하다 / -는/은/ㄴ 체하다\' means \'to pretend...\', \'to act as if...\'. The two are nearly identical in meaning; 척하다 is more colloquial, 체하다 more formal. The adnominal form changes by part of speech, same as -셈이다.',
    structureNote: '动词现在 -는 척하다 · 动词过去 -은/ㄴ 척하다 · 形容词 -은/ㄴ 척하다 · 名词 -인 척하다', structureNoteEn: 'Verb present -는 척하다 · Verb past -은/ㄴ 척하다 · Adjective -은/ㄴ 척하다 · Noun -인 척하다',
    rulesNote: '척하다=체하다 语义相同；否定用 -지 않는 척하다 / 안 -는 척하다', rulesNoteEn: '척하다 = 체하다, same meaning; negation uses -지 않는 척하다 / 안 -는 척하다',
    structures: [
      {
        ko: '민수는 모르는 척했어요.',
        zh: '民秀装作不知道。', zhEn: 'Minsu pretended not to know.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '모르는 척했어요', role: 'verb' },
        ],
      },
      {
        ko: '아픈 척하지 마세요.',
        zh: '别装病。', zhEn: 'Don\'t fake being sick.',
        tokens: [
          { text: '아픈 척하지', role: 'plain' },
          { text: '마세요', role: 'verb' },
        ],
      },
      {
        ko: '못 본 체하고 지나갔어요.',
        zh: '假装没看见就过去了。', zhEn: 'He pretended not to see it and moved on.',
        tokens: [
          { text: '못 본 체하고', role: 'verb' },
          { text: '지나갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 척하다/체하다', textEn: 'Present tense verbs: -는 척하다/체하다', examples: '모르다 → 모르는 척하다 / 자다 → 자는 척하다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 척하다', textEn: 'Past tense verbs: -은/ㄴ 척하다', examples: '보다 → 본 척하다 / 먹다 → 먹은 척하다' },
      { type: 'rule', text: '形容词：-은/ㄴ 척하다', textEn: 'Adjectives: -은/ㄴ 척하다', examples: '아프다 → 아픈 척하다 / 좋다 → 좋은 척하다' },
      { type: 'rule', text: '名词：-인 척하다', textEn: 'Nouns: -인 척하다', examples: '학생인 척하다 / 부자인 척하다' },
      { type: 'usage', text: '척하다 更口语；체하다 更书面/正式，两者可互换', textEn: '척하다 is more colloquial; 체하다 is more written/formal, but they\'re interchangeable.', examples: '못 본 척했어요 = 못 본 체했어요（假装没看见）', examplesEn: '못 본 척했어요 = 못 본 체했어요 (pretended not to see)' },
      { type: 'usage', text: '否定：-지 않는 척하다 / 안 -는 척하다', textEn: 'Negation: -지 않는 척하다 / 안 -는 척하다', examples: '아프지 않은 척했어요.（假装不疼。）', examplesEn: '아프지 않은 척했어요. (Pretended it didn\'t hurt.)' },
      { type: 'compare', text: '-는 척하다 vs -는 것 같다 → 前者故意装，后者是我的主观感觉', textEn: '-는 척하다 vs -는 것 같다 → the former is deliberate pretense, the latter is my subjective feeling.', examples: '자는 척해요.(假装睡) / 자는 것 같아요.(好像睡了)', examplesEn: '자는 척해요. (Pretending to sleep) / 자는 것 같아요. (Seems like sleeping)' },
      { type: 'note', text: '常见搭配 못 -는 척하다（假装做不到）', textEn: 'Common collocation: 못 -는 척하다 (pretend to be unable to do)', examples: '못 듣는 척하지 마세요.（别假装听不见。）', examplesEn: '못 듣는 척하지 마세요. (Don\'t pretend you can\'t hear.)' },
      { type: 'note', text: '语感：척하다 常带贬义，尤其 아는 척/잘난 척 = "显摆、自以为是"，不是中性的"假装"。中文"假装"没有这层贬义，别乱用', textEn: 'Nuance: 척하다 often carries a negative connotation, especially 아는 척/잘난 척 = "showing off, being smug," not a neutral "pretend." Chinese "假装" lacks this negative tone, so don\'t overuse it.', examples: '아는 척하지 마.（别不懂装懂/别显摆。）· 잘난 척하다（自以为了不起、摆架子）', examplesEn: '아는 척하지 마. (Don\'t pretend to know / don\'t show off.) · 잘난 척하다 (acting all high and mighty, putting on airs)' },
      { type: 'note', text: '척 是依存名词，可插助词或单独用：아는 척(을) 하다；连"假装"都不做时说 척도 안 하다', textEn: '척 is a dependent noun; you can insert particles or use it alone: 아는 척(을) 하다; when not even pretending, say 척도 안 하다.', examples: '인사는커녕 아는 척도 안 했어요.（别说打招呼，连搭理都没搭理。）', examplesEn: '인사는커녕 아는 척도 안 했어요. (Never mind greeting, he didn\'t even acknowledge me.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '모르는', role: 'verb' },
          { text: '척했어요', role: 'verb' },
        ],
        zh: '民秀装不知道。', zhEn: 'Minsu pretended not to know.',
        swapWords: ['모르다', '못 듣다', '못 보다', '괜찮다'],
      },
      {
        wordBlocks: [
          { text: '아픈', role: 'plain' },
          { text: '척하지', role: 'verb' },
          { text: '마세요', role: 'verb' },
        ],
        zh: '别装病。', zhEn: 'Don\'t fake being sick.',
        swapWords: ['아프다', '피곤하다', '슬프다', '괴롭다'],
      },
      {
        wordBlocks: [
          { text: '못 본', role: 'verb' },
          { text: '체하고', role: 'verb' },
          { text: '지나갔어요', role: 'verb' },
        ],
        zh: '假装没看见就过去了。', zhEn: 'He pretended not to see it and moved on.',
        swapWords: ['보다', '듣다', '알다', '느끼다'],
      },
    ],
    scenarios: [
      { icon: '🙈', context: '假装不知', contextEn: 'pretend not to know', ko: '민수는 모르는 척했어요.', zh: '民秀装不知道。', zhEn: 'Minsu pretended not to know.' },
      { icon: '🤒', context: '装病', contextEn: 'pretend to be sick', ko: '아픈 척하지 마세요.', zh: '别装病。', zhEn: 'Don\'t fake being sick.' },
      { icon: '👻', context: '视而不见', contextEn: 'to turn a blind eye', ko: '못 본 체하고 지나갔어요.', zh: '装没看见走过去了。', zhEn: 'pretended not to see and walked past.' },
      { icon: '😴', context: '装睡', contextEn: 'pretend to sleep', ko: '자는 척했어요.', zh: '装睡了。', zhEn: 'pretended to be asleep.' },
      { icon: '💵', context: '装有钱', contextEn: 'pretend to be rich', ko: '부자인 척하지 마세요.', zh: '别装有钱。', zhEn: 'Don\'t pretend to be rich.' },
      { icon: '📖', context: '装懂', contextEn: 'pretend to understand', ko: '이해한 척했지만 사실은 몰랐어요.', zh: '装懂了其实不懂。', zhEn: 'pretended to understand but actually didn\'t.' },
    ],
    mistakes: [
      { wrong: '자은 척했어요', correct: '자는 척했어요', note: '"装睡"用动词现在冠形 -는', noteEn: 'For \'pretend to sleep,\' use the present adnominal form -는 with verbs.' },
      { wrong: '아프는 척하지 마세요', correct: '아픈 척하지 마세요', note: '아프다 是形容词，冠形用 -ㄴ', noteEn: '아프다 is an adjective, so the adnominal form uses -ㄴ.' },
      { wrong: '학생 척하다', correct: '학생인 척하다', note: '名词需加 -인', noteEn: 'Nouns require -인.' },
    ],
    quickTable: {
      title: '-는 척하다/체하다 冠形', titleEn: '-는 척하다/체하다 adnominal form',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词现在', '-는 척하다', '모르는 척하다'],
        ['动词过去', '-은/ㄴ 척하다', '본 척하다'],
        ['形容词', '-은/ㄴ 척하다', '아픈 척하다'],
        ['名词', '-인 척하다', '학생인 척하다'],
        ['体', '척하다=체하다', '两者可互换'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-는 척하다 冠形选择', titleEn: '-는 척하다 adnominal form selection',
      body: '选正确冠形', bodyEn: 'Choose the correct adnominal form',
      questions: [
        {
          prompt: '민수는 (모르다) 척했어요.',
          options: ['모른', '모르는', '모를', '모르기'],
          answer: 1,
          explanation: '모르다 动词现在冠形 -는 → 모르는 척했어요。', explanationEn: '모르다 is a verb, present adnominal -는 → 모르는 척했어요.',
        },
        {
          prompt: '(아프다) 척하지 마세요.',
          options: ['아프는', '아픈', '아플', '아프기'],
          answer: 1,
          explanation: '아프다 是形容词，冠形用 -ㄴ → 아픈 척하지。', explanationEn: '아프다 is an adjective, adnominal -ㄴ → 아픈 척하지.',
        },
        {
          prompt: '민수가 (보다) 체하고 지나갔어요. 假装没看见', promptEn: '민수가 pretended not to see and passed by.',
          options: ['보는', '못 본', '보고', '볼'],
          answer: 1,
          explanation: '"假装没看见"是过去且否定，用 못 + 过去冠形 → 못 본 체하고。', explanationEn: 'For \'pretend not to have seen,\' it\'s past and negative, use 못 + past adnominal → 못 본 체하고.',
        },
        {
          prompt: '(학생) 척하지 마세요.',
          options: ['학생', '학생이', '학생인', '학생는'],
          answer: 2,
          explanation: '名词冠形 -인 → 학생인 척하지 마세요。', explanationEn: 'For nouns, adnominal -인 → 학생인 척하지 마세요.',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"民秀装不知道""别装病" —— 韩语"假装"用 <b>-는/은/ㄴ 척하다</b> 或 <b>-는/은/ㄴ 체하다</b>。<br>两者语义相同，척하다更口语，체하다更书面。冠形规则和 -셈이다 一致。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-는 척하다 vs -는 것 같다</b><br>
    ・<b>-는 척하다</b> → 故意假装（主体是"装的人"）<br>
    <span style="color:#89756e">민수가 자는 척해요.（民秀装睡）</span><br>
    ・<b>-는 것 같다</b> → 我的主观推测<br>
    <span style="color:#89756e">민수가 자는 것 같아요.（民秀好像睡了）</span>
  </div>
</div>`,
    compareLabel: '假装 vs 好像', compareLabelEn: 'pretend vs. seem like',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 척/체하다：假装</div>
  <div style="font-size:14px;color:#89756e">故意装作某种样子</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形规则（与 -셈이다 相同）</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는 척하다</b>：모르는 척<br>
      动词过去 → <b>-은/ㄴ 척하다</b>：본 척<br>
      形容词 → <b>-은/ㄴ 척하다</b>：아픈 척<br>
      名词 → <b>-인 척하다</b>：학생인 척
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      装不知：모르는 척했어요<br>
      装病：아픈 척하지 마세요<br>
      装睡：자는 척했어요<br>
      装懂：이해한 척하지 마요
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아프는 척하지</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아픈 척하지（形容词用 -ㄴ）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 척하다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생인 척하다</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p27-l09',
    partNumber: 27,
    lessonNumber: 9,
    title: 'P27 综合练习', titleEn: 'P27 Comprehensive Practice',
    whatItDoes: 'P27 综合复习', whatItDoesEn: 'P27 Comprehensive Review',
    whatItDoesBody: '本练习综合复习 P27 情态与语气强化章节的 8 个语法点：-기 마련이다 / -는 법이다 / -을/ㄹ 법하다 / -기 나름이다 / -기에 달려 있다 / -는 셈이다 / -는 셈치다 / -는 척하다。', whatItDoesBodyEn: 'This exercise comprehensively reviews the 8 grammar points from the P27 Modality & Tone Reinforcement chapter: -기 마련이다 / -는 법이다 / -을/ㄹ 법하다 / -기 나름이다 / -기에 달려 있다 / -는 셈이다 / -는 셈치다 / -는 척하다.',
    structureNote: '综合本 Part 所有语法', structureNoteEn: 'Comprehensive review of all grammar in this part',
    rulesNote: '重点辨析：-는 법이다 vs -을 법하다；-셈이다 vs -셈치다', rulesNoteEn: 'Key distinctions: -는 법이다 vs -을 법하다; -셈이다 vs -셈치다',
    isPractice: true,
    structures: [
      {
        ko: '노력하면 성공하기 마련이에요.',
        zh: '努力必然会成功。', zhEn: 'Hard work is bound to succeed.',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '성공은 노력하기에 달려 있어요.',
        zh: '成功在于努力。', zhEn: 'Success depends on effort.',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '민수는 모르는 척했어요.',
        zh: '民秀装作不知道。', zhEn: 'Minsu pretended not to know.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '모르는 척했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기 마련이다 / -는 법이다 → 本来就/必然（口语 vs 书面）', textEn: '-기 마련이다 / -는 법이다 → naturally/inevitably (spoken vs. written)' },
      { type: 'rule', text: '-을/ㄹ 법하다 → 有可能（推测），结构相似但语义不同', textEn: '-을/ㄹ 법하다 → likely (conjecture), similar structure but different meaning' },
      { type: 'rule', text: '-기 나름이다 / -기에 달려 있다 → 取决于（口语 vs 书面）', textEn: '-기 나름이다 / -기에 달려 있다 → depends on (spoken vs. written)' },
      { type: 'rule', text: '-는 셈이다 → 综合评估"算是"', textEn: '-는 셈이다 → overall assessment \'counts as\'' },
      { type: 'rule', text: '-는 셈치다 → 假想让步"就当作"', textEn: '-는 셈치다 → hypothetical concession \'just consider it as\'' },
      { type: 'rule', text: '-는 척하다 / -는 체하다 → 假装（口语 vs 书面）', textEn: '-는 척하다 / -는 체하다 → pretend (spoken vs. written)' },
      { type: 'usage', text: '冠形规则一致：动词现在 -는，动词过去/形容词 -은/ㄴ，名词 -인', textEn: 'Adnominal rules are consistent: verbs present -는, verbs past/adjectives -은/ㄴ, nouns -인' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '努力必然会成功。', zhEn: 'Hard work is bound to succeed.',
        swapWords: ['성공하다', '이루다', '해내다', '얻다'],
      },
      {
        wordBlocks: [
          { text: '이 정도면', role: 'plain' },
          { text: '싼', role: 'plain' },
          { text: '셈이에요', role: 'plain' },
        ],
        zh: '这个价格算便宜了。', zhEn: 'This price is considered cheap.',
        swapWords: ['싸다', '괜찮다', '적당하다', '저렴하다'],
      },
      {
        wordBlocks: [
          { text: '속은', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
        zh: '就当被骗了，忘了吧。', zhEn: 'Just consider yourself scammed and forget it.',
        swapWords: ['속다', '당하다', '잃다', '실수하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '必然', contextEn: 'inevitable', ko: '노력하면 성공하기 마련이에요.', zh: '努力必然成功。', zhEn: 'Effort is bound to lead to success.' },
      { icon: '🎯', context: '取决于', contextEn: 'depends on', ko: '성공은 노력하기에 달려 있어요.', zh: '成功在于努力。', zhEn: 'Success depends on effort.' },
      { icon: '🤔', context: '有可能', contextEn: 'possibly', ko: '그런 일도 있을 법한 일이에요.', zh: '那种事也可能发生。', zhEn: 'That kind of thing could happen too.' },
      { icon: '💰', context: '算是', contextEn: 'considered as', ko: '5만 원이면 싼 셈이에요.', zh: '5万算便宜。', zhEn: '50,000 is considered cheap.' },
      { icon: '😞', context: '就当', contextEn: 'just treat as', ko: '속은 셈치고 잊어버려요.', zh: '就当被骗，忘了吧。', zhEn: 'Just treat it as being scammed and forget it.' },
      { icon: '🙈', context: '假装', contextEn: 'pretend', ko: '민수는 모르는 척했어요.', zh: '民秀装不知道。', zhEn: 'Minsu pretended not to know.' },
    ],
    mistakes: [
      { wrong: '오는 법하다', correct: '올 법하다', note: '推测用 -을/ㄹ 법하다；-는 법이다 是必然道理', noteEn: 'For speculation use -을/ㄹ 법하다; -는 법이다 expresses inevitability.' },
      { wrong: '가는 셈치고 놀았어요', correct: '가는 셈이에요', note: '"算是"用 -셈이다；"就当作"才用 -셈치다', noteEn: 'Use -셈이다 for "considered as"; use -셈치다 for "treat as."' },
      { wrong: '학생 척하다', correct: '학생인 척하다', note: '名词需加 -인 冠形', noteEn: 'Nouns require the -인 adnominal form.' },
    ],
    linkedGrammarIds: ['card-p27-l01', 'card-p27-l02', 'card-p27-l03', 'card-p27-l04', 'card-p27-l05', 'card-p27-l06', 'card-p27-l07', 'card-p27-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P27 综合练习', titleEn: 'P27 Comprehensive Practice',
      body: '选择正确的表达', bodyEn: 'Choose the correct expression.',
      questions: [
        {
          prompt: '"努力必然会成功" 用……', promptEn: '"Hard work inevitably leads to success" uses...',
          options: ['성공할 법해요', '성공하는 법이 없어요', '성공하기 마련이에요', '성공하는 셈이에요'],
          answer: 2,
          explanation: '"必然""本来就"用 -기 마련이다 → 성공하기 마련이에요。', explanationEn: 'For "inevitable" or "naturally," use -기 마련이다 → 성공하기 마련이에요.',
        },
        {
          prompt: '"那种事也可能发生"（推测）', promptEn: '"That kind of thing could happen" (speculation)',
          options: ['있는 법이에요', '있을 법한 일이에요', '있는 셈이에요', '있는 척해요'],
          answer: 1,
          explanation: '推测可能用 -을/ㄹ 법한 → 있을 법한 일이에요。', explanationEn: 'For speculating possibility, use -을/ㄹ 법한 → 있을 법한 일이에요.',
        },
        {
          prompt: '"就当被骗，忘了吧"', promptEn: '"Just treat it as being scammed and forget it"',
          options: ['속은 셈이고 잊어요', '속은 셈치고 잊어요', '속은 법이고 잊어요', '속는 척하고 잊어요'],
          answer: 1,
          explanation: '"就当作"用 -셈치다，"被骗了"用过去冠形 → 속은 셈치고。', explanationEn: 'Use -셈치다 for "treat as," and the past adnominal for "was scammed" → 속은 셈치고.',
        },
        {
          prompt: '"民秀装不知道" 用……', promptEn: '"Min-su pretended not to know" uses...',
          options: ['모르는 셈이에요', '모르는 셈치자', '모르는 척했어요', '모르는 법이에요'],
          answer: 2,
          explanation: '"假装"用 -는 척하다 → 모르는 척했어요。', explanationEn: 'For "pretend," use -는 척하다 → 모르는 척했어요.',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P27 总结：情态与语气强化</div>
  <div style="font-size:14px;color:#89756e">陈述/推测/评估/假装的完整体系</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">六大情态表达</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-기 마련이다 / -는 법이다</b> → 本来就/必然<br>
      <b>-을/ㄹ 법하다</b> → 有可能/大概<br>
      <b>-기 나름이다 / -기에 달려 있다</b> → 取决于<br>
      <b>-는 셈이다</b> → 综合评估"算是"<br>
      <b>-는 셈치다</b> → 假想让步"就当作"<br>
      <b>-는 척하다 / -는 체하다</b> → 假装
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">冠形速查</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词现在 → <b>-는</b>：가는 셈/척/법이다<br>
      动词过去/形容词 → <b>-은/ㄴ</b>：간/싼 셈이다<br>
      名词 → <b>-인</b>：학생인 셈/척이다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">核心易错</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. -는 법이다(必然) vs -을 법하다(可能) 结构相似语义不同<br>
      2. -셈이다(算是) vs -셈치다(就当作) 混用<br>
      3. 形容词用 -은/ㄴ 冠形，不用 -는<br>
      4. 名词必须加 -인 冠形
    </div>
  </div>
</div>`,
  },

];
