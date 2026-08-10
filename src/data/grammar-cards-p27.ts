import type { GrammarCard } from '@/types';

export const grammarCardsP27: GrammarCard[] = [
  // ── 第1课：-기 마련이다 ──────────────────────────────────────
  {
    id: 'card-p27-l01',
    partNumber: 27,
    lessonNumber: 1,
    title: '-기 마련이다',
    whatItDoes: '本来就……',
    whatItDoesBody: '「-기 마련이다」表示"本来就……""必然会……""理所当然……"。用于陈述普遍规律、常识、必然结果。语气偏客观，常用于说教、经验总结。',
    structureNote: '动词/形容词词干 + -기 마련이다 · 名词 + 이기 마련이다',
    rulesNote: '直接接词干，不看받침；名词加系词 이 后再接；等同 -는 법이다',
    structures: [
      {
        ko: '노력하면 성공하기 마련이에요.',
        zh: '努力的话必然会成功。',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 지나면 잊혀지기 마련이에요.',
        zh: '时间过去自然就会被遗忘。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '지나면', role: 'verb' },
          { text: '잊혀지기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '오래 사귀면 싸우기 마련이에요.',
        zh: '交往久了必然会吵架。',
        tokens: [
          { text: '오래', role: 'plain' },
          { text: '사귀면', role: 'verb' },
          { text: '싸우기 마련이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -기 마련이다，不看받침', examples: '가다 → 가기 마련이다 / 좋다 → 좋기 마련이다' },
      { type: 'rule', text: '名词 + 이기 마련이다', examples: '학생은 공부하는 존재이기 마련이다（学生本就是要学习的存在。）' },
      { type: 'usage', text: '陈述普遍真理、常识、必然结果', examples: '나이가 들면 늙기 마련이에요.（上了年纪自然会老。）' },
      { type: 'usage', text: '前句多为条件（-면、-으면、시간이 지나면 등）', examples: '오래 쓰면 낡기 마련이다.（用久了难免会旧。）' },
      { type: 'compare', text: '-기 마련이다 vs -는 법이다 → 语义几乎相同，可互换；-는 법이다 更书面', examples: '노력하면 성공하기 마련이다（努力就会成功）= 노력하면 성공하는 법이다（努力自然会成功）' },
      { type: 'note', text: '语气是客观陈述，不带主观判断', examples: '누구나 실수하기 마련이에요.（谁都难免会犯错。）' },
      { type: 'note', text: '不与命令/建议句连用', examples: '(✗) 성공하기 마련이세요（错误说法：마련이다 不能加尊敬 -세요）' },
      { type: 'compare', text: '中文"会"有两种意思，别混：讲普遍规律的"必然会"用 마련이다；对某个具体事情的推测用 -을 거예요/-겠-。前者是"凡此类都如此"，后者是"这一件我猜会"', examples: '노력하면 성공하기 마련이에요.（普遍：凡努力必成功）↔ 그 사람은 성공할 거예요.（推测：那个人应该会成功）' },
      { type: 'note', text: '只用于普遍规律、反复出现的现象，不能描述一次性的具体事件；具体某件事该用 -을 거예요', examples: '(✗) 내일 시험에 떨어지기 마련이에요 → (○) 오래 사귀면 싸우기 마련이에요（反复规律才行）' },
      { type: 'note', text: '「-기 마련이다」和「-게 마련이다」两种都正确、都常见，意思一样，看到 게 형 不用当成错', examples: '싸우기 마련이에요 = 싸우게 마련이에요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '努力的话必然成功。',
        swapWords: ['성공하다', '이루다', '해내다', '얻다'],
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '지나면', role: 'verb' },
          { text: '잊혀지기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '时间过去必然会被遗忘。',
        swapWords: ['잊혀지다', '사라지다', '흐려지다', '멀어지다'],
      },
      {
        wordBlocks: [
          { text: '사람은', role: 'subject' },
          { text: '누구나', role: 'plain' },
          { text: '실수하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '人都难免会犯错。',
        swapWords: ['실수하다', '틀리다', '넘어지다', '잘못하다'],
      },
    ],
    scenarios: [
      { icon: '💪', context: '努力', ko: '노력하면 성공하기 마련이에요.', zh: '努力必然成功。' },
      { icon: '⏳', context: '时间', ko: '시간이 지나면 잊혀지기 마련이에요.', zh: '时间会淡化一切。' },
      { icon: '💑', context: '恋爱', ko: '오래 사귀면 싸우기 마련이에요.', zh: '交往久了会吵架。' },
      { icon: '👴', context: '年龄', ko: '나이가 들면 늙기 마련이에요.', zh: '上年纪就会老。' },
      { icon: '❌', context: '犯错', ko: '사람은 누구나 실수하기 마련이에요.', zh: '人都难免犯错。' },
      { icon: '🍂', context: '自然', ko: '가을이 되면 낙엽이 지기 마련이에요.', zh: '一到秋天必然落叶。' },
    ],
    mistakes: [
      { wrong: '성공하는 마련이에요', correct: '성공하기 마련이에요', note: '固定为 -기 마련이다，不用 -는 마련' },
      { wrong: '학생 마련이에요', correct: '학생이기 마련이에요', note: '名词需加 이 变形' },
      { wrong: '성공하기 마련이세요', correct: '성공하기 마련이에요', note: '客观陈述句，不能敬语命令' },
    ],
    quickTable: {
      title: '-기 마련이다 一览',
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
      title: '-기 마련이다 变形',
      body: '选择正确形式',
      questions: [
        {
          prompt: '노력하면 (성공하다) 마련이에요.',
          options: ['성공하는', '성공하기', '성공하면', '성공한'],
          answer: 1,
          explanation: '固定形态 -기 마련이다，动词词干 + -기 → 성공하기 마련이다。',
        },
        {
          prompt: '시간이 지나면 (잊혀지다) 마련이에요.',
          options: ['잊혀지는', '잊혀지기', '잊혀진', '잊혀지고'],
          answer: 1,
          explanation: '-기 마련이다 固定接 -기 → 잊혀지기 마련이다。',
        },
        {
          prompt: '(학생) 공부해야 하는 존재이기 마련이에요.',
          options: ['학생', '학생은', '학생이', '학생을'],
          answer: 2,
          explanation: '主语用 이/가 → 학생이 …이기 마련이다。',
        },
        {
          prompt: '-기 마련이다 的语义是……',
          options: ['意愿/打算', '本来就/必然会', '推测/大概', '许可/允许'],
          answer: 1,
          explanation: '-기 마련이다 表"本来就……""理所当然""必然会……"。',
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
    whatItDoes: '道理如此',
    whatItDoesBody: '「-는 법이다 / -은/ㄴ 법이다」表示"本来就……""按道理讲……""自然而然……"。用于陈述普遍规律、道理，语气较书面，含说教/警示意味。也常用于 -는 법이 없다 表"绝不会……"。',
    structureNote: '动词现在 -는 법이다 · 形容词 -은/ㄴ 법이다 · 名词 -인 법이다 · 否定 -는 법이 없다',
    rulesNote: '动词冠形 -는，形容词冠形 -은/ㄴ；否定用 -는 법이 없다 表强烈否认',
    structures: [
      {
        ko: '노력하는 사람은 성공하는 법이에요.',
        zh: '努力的人自然会成功。',
        tokens: [
          { text: '노력하는', role: 'verb' },
          { text: '사람은', role: 'subject' },
          { text: '성공하는 법이에요', role: 'verb' },
        ],
      },
      {
        ko: '착한 사람은 언제나 착한 법이에요.',
        zh: '善良的人始终是善良的。',
        tokens: [
          { text: '착한', role: 'plain' },
          { text: '사람은', role: 'subject' },
          { text: '언제나', role: 'plain' },
          { text: '착한 법이에요', role: 'plain' },
        ],
      },
      {
        ko: '거짓말은 오래가는 법이 없어요.',
        zh: '谎言绝不会长久。',
        tokens: [
          { text: '거짓말은', role: 'subject' },
          { text: '오래가는 법이 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 법이다', examples: '가다 → 가는 법이다 / 먹다 → 먹는 법이다' },
      { type: 'rule', text: '形容词：有받침 -은 법이다 / 无받침 -ㄴ 법이다', examples: '좋다 → 좋은 법이다 / 크다 → 큰 법이다' },
      { type: 'rule', text: '名词：-인 법이다', examples: '진리인 법이다（本就是真理。）' },
      { type: 'rule', text: '否定：-는 법이 없다 表"绝不会……"', examples: '거짓말은 오래가는 법이 없어요（谎言不会长久。）' },
      { type: 'usage', text: '陈述普遍道理、常识、必然规律', examples: '노력하는 사람은 성공하는 법이에요.（努力的人自然会成功。）' },
      { type: 'compare', text: '-는 법이다 vs -기 마련이다 → 前者更书面/说教，后者更口语', examples: '两者语义近乎相同' },
      { type: 'note', text: '常用来教训、警示、总结经验', examples: '남을 속이면 벌 받는 법이야.（骗人自然会遭报应。）' },
      { type: 'compare', text: '警惕："법"本身还有"方法"的意思。区别看它后面接什么：接 이다 结句=道理/必然（本课）；接 을/를 알다·배우다·모르다=方法/做法（不是本课语法）', examples: '먹는 법이에요.（本就会吃 · 道理）↔ 먹는 법을 몰라요.（不知道吃的方法）' },
      { type: 'note', text: '为什么动词用 -는、形容词用 -은/ㄴ？这是冠形词尾（前面章节详学），不是本课专属规则，别混：动词现在 -는，形容词 -은/ㄴ', examples: '가다(动)→가는 법 / 좋다(形)→좋은 법' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하는', role: 'verb' },
          { text: '사람은', role: 'subject' },
          { text: '성공하는', role: 'verb' },
          { text: '법이에요', role: 'verb' },
        ],
        zh: '努力的人自然成功。',
        swapWords: ['노력하다', '공부하다', '준비하다', '연습하다'],
      },
      {
        wordBlocks: [
          { text: '착한', role: 'plain' },
          { text: '사람은', role: 'subject' },
          { text: '착한', role: 'plain' },
          { text: '법이에요', role: 'plain' },
        ],
        zh: '善良的人本就善良。',
        swapWords: ['착하다', '정직하다', '성실하다', '따뜻하다'],
      },
      {
        wordBlocks: [
          { text: '거짓말은', role: 'subject' },
          { text: '오래가는', role: 'verb' },
          { text: '법이', role: 'plain' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '谎言绝不会长久。',
        swapWords: ['거짓말', '비밀', '실수', '오해'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '道理', ko: '노력하는 사람은 성공하는 법이에요.', zh: '努力的人会成功。' },
      { icon: '💖', context: '天性', ko: '착한 사람은 언제나 착한 법이에요.', zh: '善良的人始终善良。' },
      { icon: '🚫', context: '强否定', ko: '거짓말은 오래가는 법이 없어요.', zh: '谎言绝不会长久。' },
      { icon: '⚖️', context: '因果', ko: '남을 속이면 벌 받는 법이야.', zh: '欺骗别人自然会受罚。' },
      { icon: '📖', context: '经验', ko: '실패에서 배우는 법이에요.', zh: '本就从失败中学习。' },
      { icon: '🌸', context: '规律', ko: '봄이 오면 꽃이 피는 법이에요.', zh: '春来花开是自然规律。' },
    ],
    mistakes: [
      { wrong: '성공하기 법이다', correct: '성공하는 법이다', note: '固定用冠形 -는，不用 -기' },
      { wrong: '좋는 법이다', correct: '좋은 법이다', note: '形容词冠形用 -은/ㄴ，不用 -는' },
      { wrong: '거짓말은 오래가는 법이 있어요', correct: '거짓말은 오래가는 법이 없어요', note: '否定"绝不"是 -는 법이 없다' },
    ],
    quickTable: {
      title: '-는 법이다 冠形变化',
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
      title: '-는 법이다 冠形',
      body: '选正确冠形',
      questions: [
        {
          prompt: '노력하는 사람은 (성공하다) 법이에요.',
          options: ['성공한', '성공하는', '성공할', '성공했는'],
          answer: 1,
          explanation: '动词现在冠形用 -는 → 성공하는 법이에요。',
        },
        {
          prompt: '(착하다) 사람은 언제나 착한 법이에요.',
          options: ['착하는', '착한', '착할', '착하기'],
          answer: 1,
          explanation: '착하다 是形容词，无받침加 -ㄴ → 착한。',
        },
        {
          prompt: '거짓말은 오래가는 법이 (없다/있다).',
          options: ['있어요', '없어요', '해요', '되어요'],
          answer: 1,
          explanation: '"绝不会长久"用 -는 법이 없다 → 없어요。',
        },
        {
          prompt: '(좋다) 법이에요.',
          options: ['좋는', '좋은', '좋을', '좋기'],
          answer: 1,
          explanation: '좋다 形容词有받침，冠形用 -은 → 좋은 법이에요。',
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
    compareLabel: '肯定 vs 否定',
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
    whatItDoes: '有可能……',
    whatItDoesBody: '「-을/ㄹ 법하다」表示"看起来会……""有可能……""大概会……"。用于对某种可能性做出推测，语感偏文学、书面。类似 -을/ㄹ 것 같다，但更委婉、更古典。',
    structureNote: '动词/形容词词干：有받침 -을 법하다 / 无받침 -ㄹ 법하다 · 名词 -(이)ㄹ 법하다',
    rulesNote: '与 -는 법이다 结构相近但语义不同！-는 법이다 = 必然道理；-을/ㄹ 법하다 = 有可能。需特别注意区分。',
    structures: [
      {
        ko: '그런 일도 있을 법한 일이에요.',
        zh: '那种事也是可能发生的。',
        tokens: [
          { text: '그런 일도', role: 'subject' },
          { text: '있을 법한', role: 'plain' },
          { text: '일이에요', role: 'plain' },
        ],
      },
      {
        ko: '누구나 한 번쯤 겪을 법한 경험이에요.',
        zh: '谁都可能经历过一次的经验。',
        tokens: [
          { text: '누구나', role: 'plain' },
          { text: '한 번쯤', role: 'plain' },
          { text: '겪을 법한', role: 'plain' },
          { text: '경험이에요', role: 'plain' },
        ],
      },
      {
        ko: '민수가 벌써 도착했을 법해요.',
        zh: '民秀好像已经到了。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '도착했을 법해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침 → -을 법하다', examples: '있다 → 있을 법하다 / 먹다 → 먹을 법하다' },
      { type: 'rule', text: '无받침 → -ㄹ 법하다', examples: '가다 → 갈 법하다 / 크다 → 클 법하다' },
      { type: 'rule', text: '过去推测 → -았/었을 법하다', examples: '갔을 법하다（很可能去了）, 도착했을 법하다（很可能到了）' },
      { type: 'usage', text: '表达"看起来可能""大概会"，语气委婉', examples: '그런 일도 있을 법해요.（这种事也可能有。）' },
      { type: 'usage', text: '冠形形式 -을/ㄹ 법한 N 用来修饰名词', examples: '있을 법한 일 / 겪을 법한 경험' },
      { type: 'compare', text: '-을 법하다 vs -을 것 같다 → 前者书面/文学，后者口语', examples: '올 법해요.(可能会来) / 올 것 같아요.(好像会来)' },
      { type: 'note', text: '与 -는 법이다 结构相似但语义完全不同：前者可能，后者必然道理', examples: '올 법하다(可能来) ≠ 오는 법이다(自然会来)' },
      { type: 'note', text: '别拿它当日常口语的"会/可能"。它偏书面、文学，语感是"合情合理、说得过去、想象得到"，不是简单猜概率。日常猜测请优先用 -을 것 같다', examples: '동화에 나올 법한 이야기（像是童话里会有的故事 · 合情合理）' },
      { type: 'note', text: '最高频用法是冠形式 -을 법한 + 名词，等于"想象得到的/说得过去的那种…"，是一个固定语感，先整块记住', examples: '있을 법한 일（可能有的事）· 겪을 법한 경험（可能经历的事）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그런 일도', role: 'subject' },
          { text: '있을', role: 'verb' },
          { text: '법한', role: 'plain' },
          { text: '일이에요', role: 'plain' },
        ],
        zh: '那种事也可能发生。',
        swapWords: ['있다', '생기다', '벌어지다', '일어나다'],
      },
      {
        wordBlocks: [
          { text: '누구나', role: 'plain' },
          { text: '한번쯤', role: 'plain' },
          { text: '겪을', role: 'verb' },
          { text: '법한 경험이에요', role: 'plain' },
        ],
        zh: '谁都可能经历过的事。',
        swapWords: ['겪다', '느끼다', '경험하다', '만나다'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '벌써', role: 'plain' },
          { text: '도착했을', role: 'verb' },
          { text: '법해요', role: 'verb' },
        ],
        zh: '民秀应该已经到了吧。',
        swapWords: ['도착하다', '오다', '나가다', '떠나다'],
      },
    ],
    scenarios: [
      { icon: '🤔', context: '推测', ko: '그런 일도 있을 법한 일이에요.', zh: '那种事也可能发生。' },
      { icon: '👥', context: '普遍', ko: '누구나 한 번쯤 겪을 법한 경험이에요.', zh: '谁都可能经历过的事。' },
      { icon: '⏰', context: '大概', ko: '민수가 벌써 도착했을 법해요.', zh: '民秀应该已经到了。' },
      { icon: '📚', context: '文学', ko: '동화에 나올 법한 이야기예요.', zh: '像童话里的故事。' },
      { icon: '🎭', context: '想象', ko: '영화에나 있을 법한 장면이에요.', zh: '只在电影里可能出现的场景。' },
      { icon: '💭', context: '猜想', ko: '이해 못할 법한 상황은 아니에요.', zh: '不是无法理解的情况。' },
    ],
    mistakes: [
      { wrong: '있는 법한 일', correct: '있을 법한 일', note: '推测用 -을/ㄹ 법한，不用 -는' },
      { wrong: '갈 법이에요', correct: '갈 법해요', note: '固定为 -을/ㄹ 법하다，不是 -을 법이에요' },
      { wrong: '오는 법하다', correct: '올 법하다', note: '与 -는 법이다(必然) 混淆，推测用 -을/ㄹ' },
    ],
    quickTable: {
      title: '-을/ㄹ 법하다 一览',
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
      body: '语义辨析',
      questions: [
        {
          prompt: '"那种事也可能发生"（推测可能性）',
          options: ['있는 법한 일이에요', '있을 법한 일이에요', '있는 법이에요', '있기 법한 일이에요'],
          answer: 1,
          explanation: '推测可能用 -을/ㄹ 법한 → 있을 법한 일이에요。',
        },
        {
          prompt: '"努力的人自然会成功"（必然道理）',
          options: ['성공할 법한 사람이에요', '성공하는 법이에요', '성공하는 법한 사람이에요', '성공할 법이에요'],
          answer: 1,
          explanation: '必然道理用 -는 법이다 → 성공하는 법이에요。',
        },
        {
          prompt: '(도착하다) 법해요. 表达"应该已经到了"',
          options: ['도착한', '도착할', '도착했을', '도착하는'],
          answer: 2,
          explanation: '"已经到了"是过去推测，用 -았/었을 법하다 → 도착했을 법해요。',
        },
        {
          prompt: '-을/ㄹ 법하다 与 -는 법이다 的区别是……',
          options: ['完全相同', '前者推测可能性，后者陈述必然', '前者过去，后者未来', '前者口语，后者书面'],
          answer: 1,
          explanation: '两者结构相似但语义完全不同：-을/ㄹ 법하다=可能，-는 법이다=必然道理。',
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
    compareLabel: '可能 vs 必然',
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
    whatItDoes: '取决于……',
    whatItDoesBody: '「-기 나름이다」表示"取决于……的方式/程度""看你怎么……"。前接动词表达"结果依赖于此动作/方式"。名词版本是 "N 나름이다"（看N而定）。',
    structureNote: '动词词干 + -기 나름이다 · 名词 + 나름이다',
    rulesNote: '动词接 -기 后 + 나름이다；名词直接 + 나름이다；不与形容词连用',
    structures: [
      {
        ko: '성공은 노력하기 나름이에요.',
        zh: '成功取决于你怎么努力。',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기 나름이에요', role: 'verb' },
        ],
      },
      {
        ko: '결과는 생각하기 나름이에요.',
        zh: '结果取决于你怎么想。',
        tokens: [
          { text: '결과는', role: 'subject' },
          { text: '생각하기 나름이에요', role: 'verb' },
        ],
      },
      {
        ko: '행복은 마음먹기 나름이에요.',
        zh: '幸福在于你的心态。',
        tokens: [
          { text: '행복은', role: 'subject' },
          { text: '마음먹기 나름이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기 나름이다', examples: '노력하다 → 노력하기 나름이다 / 쓰다 → 쓰기 나름이다' },
      { type: 'rule', text: '名词 + 나름이다', examples: '사람 나름이에요 / 상황 나름이에요' },
      { type: 'usage', text: '强调"取决于方式/方法"，前接的动作/名词是决定因素', examples: '결과는 생각하기 나름이에요.（结果全看你怎么想。）' },
      { type: 'usage', text: '常用于回避绝对回答：사람 나름 / 상황 나름 / 경우 나름', examples: '"맛있어요?" - "사람 나름이에요."' },
      { type: 'usage', text: '固定搭配：마음먹기 나름 / 생각하기 나름 / 쓰기 나름', examples: '행복은 마음먹기 나름이에요.（幸福取决于心态。）' },
      { type: 'compare', text: '-기 나름이다 vs -기에 달려 있다 → 语义几乎相同，可互换', examples: '노력하기 나름이다（全看努力）= 노력하기에 달려 있다（取决于努力）' },
      { type: 'note', text: '不与形容词连用', examples: '(✗) 예쁘기 나름이다（错误说法：나름이다 不接形容词）' },
      { type: 'compare', text: '语序和中文相反：中文"成功取决于努力"把"取决于"放中间，韩语把"依据的事(努力)"放前面 + 나름이다，把"结果(成功)"提到句首当主题 -은/는', examples: '성공은(结果·主题) 노력하기 나름이에요(依据+나름이다).（成功取决于努力）' },
      { type: 'note', text: '注意另一个长得像的词：「나름대로」意思是"按自己的方式/自有一套"，和本课"取决于"不同，别混（这是另一个用法，日后遇到单独记）', examples: '나름대로 노력했어요.（我按自己的方式努力过了）≠ 노력하기 나름이에요（取决于努力）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '成功取决于努力。',
        swapWords: ['노력하다', '준비하다', '실천하다', '집중하다'],
      },
      {
        wordBlocks: [
          { text: '결과는', role: 'subject' },
          { text: '생각하기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '结果取决于想法。',
        swapWords: ['생각하다', '판단하다', '해석하다', '느끼다'],
      },
      {
        wordBlocks: [
          { text: '행복은', role: 'subject' },
          { text: '마음먹기', role: 'verb' },
          { text: '나름이에요', role: 'verb' },
        ],
        zh: '幸福在于心态。',
        swapWords: ['마음먹다', '생각하다', '받아들이다', '살다'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '成功', ko: '성공은 노력하기 나름이에요.', zh: '成功看努力。' },
      { icon: '💭', context: '想法', ko: '결과는 생각하기 나름이에요.', zh: '结果看怎么想。' },
      { icon: '😊', context: '心态', ko: '행복은 마음먹기 나름이에요.', zh: '幸福看心态。' },
      { icon: '👥', context: '因人而异', ko: '맛있는지는 사람 나름이에요.', zh: '好不好吃因人而异。' },
      { icon: '💰', context: '用钱', ko: '돈은 쓰기 나름이에요.', zh: '钱在于怎么花。' },
      { icon: '🎨', context: '解读', ko: '예술은 해석하기 나름이에요.', zh: '艺术在于怎么解读。' },
    ],
    mistakes: [
      { wrong: '예쁘기 나름이다', correct: '예쁘게 보이기 나름이다', note: '不与形容词连用，需转成动词或名词' },
      { wrong: '노력하는 나름이다', correct: '노력하기 나름이다', note: '固定接 -기，不用 -는' },
      { wrong: '사람 나름이 있어요', correct: '사람 나름이에요', note: '固定为 나름이다，不加 있다' },
    ],
    quickTable: {
      title: '-기 나름이다 用法',
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
      title: '-기 나름이다 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '성공은 (노력하다) 나름이에요.',
          options: ['노력하는', '노력하기', '노력한', '노력할'],
          answer: 1,
          explanation: '-기 나름이다 固定接 -기 → 노력하기 나름이에요。',
        },
        {
          prompt: '"맛있어요?" "(사람) 나름이에요."',
          options: ['사람이', '사람은', '사람', '사람의'],
          answer: 2,
          explanation: '名词直接 + 나름이다，不加조사 → 사람 나름이에요。',
        },
        {
          prompt: '행복은 (마음먹다) 나름이에요.',
          options: ['마음먹은', '마음먹기', '마음먹는', '마음먹을'],
          answer: 1,
          explanation: '固定搭配 "마음먹기 나름" → 幸福在于心态。',
        },
        {
          prompt: '-기 나름이다 的语义是……',
          options: ['本来就……', '取决于……的方式', '不得不……', '不管怎样……'],
          answer: 1,
          explanation: '-기 나름이다 = "取决于……的方式/方法"，强调结果由前项决定。',
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
    compareLabel: '动词版 vs 名词版',
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
    whatItDoes: '在于……',
    whatItDoesBody: '「-기에 달려 있다」表示"取决于……""在于……""看……"。用于强调事情的关键决定因素。名词版本是 "N에 달려 있다"。语气比 -기 나름이다 更正式书面。',
    structureNote: '动词词干 + -기에 달려 있다 · 名词 + 에 달려 있다',
    rulesNote: '固定搭配"-기에 달려 있다"；主语常为决定的对象（성공/실패/미래 等）',
    structures: [
      {
        ko: '성공은 노력하기에 달려 있어요.',
        zh: '成功在于努力。',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '결과는 어떻게 준비하기에 달려 있어요.',
        zh: '结果取决于怎么准备。',
        tokens: [
          { text: '결과는', role: 'subject' },
          { text: '어떻게', role: 'plain' },
          { text: '준비하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '우리의 미래는 오늘의 선택에 달려 있어요.',
        zh: '我们的未来取决于今天的选择。',
        tokens: [
          { text: '우리의', role: 'plain' },
          { text: '미래는', role: 'subject' },
          { text: '오늘의 선택에', role: 'plain' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -기에 달려 있다', examples: '노력하다 → 노력하기에 달려 있다' },
      { type: 'rule', text: '名词 + 에 달려 있다', examples: '노력 → 노력에 달려 있다 / 선택 → 선택에 달려 있다' },
      { type: 'usage', text: '强调关键决定因素，语气比 -기 나름이다 正式', examples: '성공은 노력하기에 달려 있어요.（成功取决于努力。）' },
      { type: 'usage', text: '前面加疑问词"怎么/多少"时要用 -느냐에/-는지에，不能用 -기에', examples: '결과는 어떻게 준비하느냐에 달려 있어요.（结果取决于怎么准备。）' },
      { type: 'usage', text: '书面表达常用于演讲、教育、格言', examples: '아이의 미래는 부모의 사랑에 달려 있다.（孩子的未来取决于父母的爱。）' },
      { type: 'compare', text: '-기에 달려 있다 vs -기 나름이다 → 前者更正式书面，后者口语', examples: '노력하기에 달려 있어요（取决于努力）= 노력하기 나름이에요（全看努力）' },
      { type: 'note', text: '与 "달려있다"(挂着) 是不同的动词短语，需理解为"取决于"', examples: '달려 있다 在此为习惯搭配' },
      { type: 'note', text: '取决于"是否/多么/怎样……"时，韩语把疑问嵌进去用 -느냐에／-는지에 달려 있다，不能把 얼마나/어떻게 硬接到 -기에 上（间接疑问后面章节详学）', examples: '얼마나 노력하느냐에 달려 있어요.（取决于你多努力。）' },
      { type: 'example', text: '"成不成 / 做不做"这种正反问用 -느냐 마느냐', examples: '성공하느냐 마느냐는 마음가짐에 달려 있어요.（成不成取决于心态。）' },
      { type: 'note', text: '别把主语和决定因素接反：被决定的结果（성공·미래）做主语带 은/는，决定因素才带 에／기에', examples: '성공은 노력에 달려 있다（○） · 노력은 성공에 달려 있다（✗ 意思反了）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려', role: 'verb' },
          { text: '있어요', role: 'verb' },
        ],
        zh: '成功在于努力。',
        swapWords: ['노력하다', '준비하다', '실천하다', '집중하다'],
      },
      {
        wordBlocks: [
          { text: '결과는', role: 'subject' },
          { text: '어떻게', role: 'plain' },
          { text: '준비하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
        zh: '结果看怎么准备。',
        swapWords: ['준비하다', '접근하다', '진행하다', '대응하다'],
      },
      {
        wordBlocks: [
          { text: '미래는', role: 'subject' },
          { text: '오늘의', role: 'plain' },
          { text: '선택에', role: 'plain' },
          { text: '달려 있어요', role: 'verb' },
        ],
        zh: '未来取决于今天的选择。',
        swapWords: ['선택', '결정', '노력', '태도'],
      },
    ],
    scenarios: [
      { icon: '🏆', context: '成功', ko: '성공은 노력하기에 달려 있어요.', zh: '成功在于努力。' },
      { icon: '📊', context: '结果', ko: '결과는 어떻게 준비하기에 달려 있어요.', zh: '结果看怎么准备。' },
      { icon: '🔮', context: '未来', ko: '미래는 오늘의 선택에 달려 있어요.', zh: '未来取决于今天。' },
      { icon: '💖', context: '关系', ko: '관계는 서로의 태도에 달려 있어요.', zh: '关系在于彼此态度。' },
      { icon: '📚', context: '学习', ko: '실력은 얼마나 연습하느냐에 달려 있어요.', zh: '实力看练多少。' },
      { icon: '🎯', context: '目标', ko: '목표 달성은 계획에 달려 있어요.', zh: '目标实现在于计划。' },
    ],
    mistakes: [
      { wrong: '노력하는 데 달려 있다', correct: '노력하기에 달려 있다', note: '固定搭配是 -기에 달려 있다' },
      { wrong: '노력에 달렸어요', correct: '노력에 달려 있어요', note: '正确形是 달려 있다（不是 달렸다）' },
      { wrong: '노력하기 달려 있다', correct: '노력하기에 달려 있다', note: '必须有 에；-기에 是固定接续' },
    ],
    quickTable: {
      title: '-기에 달려 있다 用法',
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
      title: '-기에 달려 있다 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '성공은 (노력하다) 달려 있어요.',
          options: ['노력하기', '노력하기에', '노력해서', '노력하러'],
          answer: 1,
          explanation: '固定搭配是 -기에 달려 있다 → 노력하기에。',
        },
        {
          prompt: '미래는 오늘의 (선택) 달려 있어요.',
          options: ['선택', '선택이', '선택에', '선택은'],
          answer: 2,
          explanation: '名词版是 N에 달려 있다 → 선택에 달려 있어요。',
        },
        {
          prompt: '결과는 어떻게 (준비하다) 달려 있어요.',
          options: ['준비하기', '준비하기에', '준비해서', '준비하면'],
          answer: 1,
          explanation: '-기에 달려 있다 固定接 -기에 → 준비하기에 달려 있어요。',
        },
        {
          prompt: '哪个句子正确？',
          options: ['노력에 달렸어요', '노력하기 달려 있어요', '노력에 달려 있어요', '노력하는 데 달려 있어요'],
          answer: 2,
          explanation: '正确形态是 N에 달려 있다，명사"노력" + 에 달려 있다 → 노력에 달려 있어요。',
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
    compareLabel: '书面 vs 口语',
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
    whatItDoes: '算是……',
    whatItDoesBody: '「-는/은/ㄴ 셈이다」表示"算是……""相当于……""可以说是……"。用于综合考虑各方面后做出的估算/评价。多用于总结、评估、比较后的结论。',
    structureNote: '动词现在 -는 셈이다 · 形容词 -은/ㄴ 셈이다 · 名词 -인 셈이다 · 过去 -은/ㄴ 셈이다',
    rulesNote: '关注冠形选择：动词现在 -는，动词过去 -은/ㄴ，形容词 -은/ㄴ，名词 -인',
    structures: [
      {
        ko: '이 정도면 잘 사는 셈이에요.',
        zh: '这种程度算是过得好了。',
        tokens: [
          { text: '이 정도면', role: 'plain' },
          { text: '잘 사는 셈이에요', role: 'verb' },
        ],
      },
      {
        ko: '5만 원이면 싼 셈이에요.',
        zh: '5万韩元算便宜了。',
        tokens: [
          { text: '5만 원이면', role: 'plain' },
          { text: '싼 셈이에요', role: 'plain' },
        ],
      },
      {
        ko: '민수는 거의 다 온 셈이에요.',
        zh: '民秀算是快到了。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '거의', role: 'plain' },
          { text: '다 온 셈이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 셈이다', examples: '가다 → 가는 셈이다 / 먹다 → 먹는 셈이다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 셈이다', examples: '갔다 → 간 셈이다 / 먹었다 → 먹은 셈이다' },
      { type: 'rule', text: '形容词：有받침 -은 / 无받침 -ㄴ 셈이다', examples: '좋다 → 좋은 셈이다 / 싸다 → 싼 셈이다' },
      { type: 'rule', text: '名词：-인 셈이다', examples: '학생인 셈이다 / 반은 성공인 셈이다' },
      { type: 'usage', text: '综合考虑后的估算/评价，含"就……而言算是"', examples: '이 정도면 잘 사는 셈이에요.（这样算是过得不错了。）' },
      { type: 'usage', text: '常见搭配：거의 다 -은 셈이다（算是快……了）', examples: '거의 다 끝난 셈이에요.（算是差不多结束了。）' },
      { type: 'compare', text: '-는 셈이다 vs -는 셈치다 → 前者估算评价，后者假想/就当', examples: '가는 셈이다(算是去) / 가는 셈치다(就当作去)' },
      { type: 'compare', text: '-는 셈이다 vs -는 편이다 → 都译"算是"，但 편이다 是"在同类中偏向某一端(比较…)"，셈이다 是"折算下来相当于/几乎等于"', examples: '싼 편이에요（算是比较便宜的一类）/ 싼 셈이에요（折算下来算便宜了）' },
      { type: 'note', text: '语义核心是"实际虽非如此、但折算/综合下来相当于"，需要一个前提或比较基准，不能当普通判断词"是"来用', examples: '거의 다 온 셈이에요.（实际还没到，但折算下来算是快到了。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 정도면', role: 'plain' },
          { text: '잘 사는', role: 'verb' },
          { text: '셈이에요', role: 'verb' },
        ],
        zh: '这种程度算是好的。',
        swapWords: ['잘 살다', '잘 하다', '잘 지내다', '잘 되다'],
      },
      {
        wordBlocks: [
          { text: '5만 원이면', role: 'plain' },
          { text: '싼', role: 'plain' },
          { text: '셈이에요', role: 'plain' },
        ],
        zh: '5万韩元算便宜了。',
        swapWords: ['싸다', '적당하다', '괜찮다', '저렴하다'],
      },
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '거의', role: 'plain' },
          { text: '다 온', role: 'verb' },
          { text: '셈이에요', role: 'verb' },
        ],
        zh: '民秀算是快到了。',
        swapWords: ['오다', '끝나다', '마치다', '도착하다'],
      },
    ],
    scenarios: [
      { icon: '💰', context: '价格', ko: '5만 원이면 싼 셈이에요.', zh: '5万算便宜了。' },
      { icon: '🏠', context: '生活', ko: '이 정도면 잘 사는 셈이에요.', zh: '这样算过得好。' },
      { icon: '✅', context: '完成度', ko: '숙제는 거의 다 한 셈이에요.', zh: '作业算是快做完了。' },
      { icon: '🎓', context: '身份', ko: '거의 대학생인 셈이에요.', zh: '算是差不多是大学生了。' },
      { icon: '⚡', context: '快速', ko: '3시간이면 빠른 셈이에요.', zh: '3小时算快的。' },
      { icon: '🏃', context: '接近', ko: '민수는 거의 다 온 셈이에요.', zh: '民秀算是快到了。' },
    ],
    mistakes: [
      { wrong: '싸는 셈이다', correct: '싼 셈이다', note: '形容词用 -은/ㄴ，不用 -는' },
      { wrong: '학생 셈이다', correct: '학생인 셈이다', note: '名词需加 -인' },
      { wrong: '가는 셈쳤어요', correct: '가는 셈이에요', note: '-셈이다 是评估，-셈치다 是假想，需区分' },
    ],
    quickTable: {
      title: '-는 셈이다 冠形',
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
      title: '-는 셈이다 冠形选择',
      body: '选正确冠形',
      questions: [
        {
          prompt: '이 정도면 (잘 살다) 셈이에요.',
          options: ['잘 산', '잘 사는', '잘 살', '잘 살기'],
          answer: 1,
          explanation: '动词现在冠形 → 잘 사는 셈이에요。',
        },
        {
          prompt: '5만 원이면 (싸다) 셈이에요.',
          options: ['싸는', '싼', '싼다는', '쌀'],
          answer: 1,
          explanation: '싸다 形容词无받침，冠形 -ㄴ → 싼 셈이에요。',
        },
        {
          prompt: '민수는 거의 다 (오다) 셈이에요.',
          options: ['오는', '온', '올', '오기'],
          answer: 1,
          explanation: '"快到了"是完成的状态，用过去冠形 → 온 셈이에요。',
        },
        {
          prompt: '거의 (대학생) 셈이에요.',
          options: ['대학생', '대학생이', '대학생인', '대학생는'],
          answer: 2,
          explanation: '名词冠形 -인 → 대학생인 셈이에요。',
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
    whatItDoes: '就当作……',
    whatItDoesBody: '「-는/은/ㄴ 셈치다」表示"就当作……""假设……""视为……"。用于假想、心理让步或安慰自己接受某种情况。语气类似"就当没发生"。',
    structureNote: '动词现在 -는 셈치다 · 动词过去 -은/ㄴ 셈치다 · 形容词 -은/ㄴ 셈치다 · 名词 -인 셈치다',
    rulesNote: '常搭配 -고 用作连接："-는 셈치고" = 就当作……，然后……',
    structures: [
      {
        ko: '오늘은 쉬는 셈치고 아무 것도 안 할래요.',
        zh: '今天就当休息，什么都不做。',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '쉬는 셈치고', role: 'verb' },
          { text: '아무 것도', role: 'object' },
          { text: '안 할래요', role: 'verb' },
        ],
      },
      {
        ko: '속은 셈치고 잊어버려요.',
        zh: '就当被骗了，忘了吧。',
        tokens: [
          { text: '속은 셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
      },
      {
        ko: '5만 원을 잃어버린 셈치고 기부했어요.',
        zh: '就当丢了5万块，捐掉了。',
        tokens: [
          { text: '5만 원을', role: 'object' },
          { text: '잃어버린 셈치고', role: 'verb' },
          { text: '기부했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 셈치다', examples: '쉬다 → 쉬는 셈치다 / 자다 → 자는 셈치다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 셈치다', examples: '속다 → 속은 셈치다 / 잃다 → 잃은 셈치다' },
      { type: 'rule', text: '形容词/名词：-은/ㄴ 셈치다 / -인 셈치다', examples: '없는 셈치다 / 학생인 셈치다' },
      { type: 'usage', text: '常搭配 -고 连接："-는 셈치고" + 后续行动', examples: '속은 셈치고 잊어버려요.（就当被骗了，忘了吧。）' },
      { type: 'usage', text: '心理调节：让自己接受损失/意外/委屈', examples: '5만 원을 잃어버린 셈치고 기부했어요.（就当丢了 5 万韩元，捐了。）' },
      { type: 'compare', text: '-는 셈이다 vs -는 셈치다 → 前者综合评估的事实，后者假想让步', examples: '가는 셈이다(算是去了) / 가는 셈치자(就当去了)' },
      { type: 'note', text: '-는 셈치다 常用建议形态"-는 셈치자/치고 -하자"', examples: '그냥 없는 셈치자.（就当没有吧。）' },
      { type: 'compare', text: '-는 셈치다 vs -는 척하다 → 셈치다 是自己内心决定"就当作(接受)"，척하다 是对外"装作/假装"给别人看（척하다 后面章节详学）', examples: '못 본 셈치고 넘어가요（自己决定当没看见、放过）/ 못 본 척했어요（假装没看见、演给对方看）' },
      { type: 'note', text: '本质是与事实相反的假想：明明发生了/存在，却决定"当作"相反，所以常带 그냥、그렇다 치고 等词缓和语气', examples: '그냥 안 들은 셈칠게요.（我就当没听到吧。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '쉬는', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '안 할래요', role: 'verb' },
        ],
        zh: '今天就当休息，不做了。',
        swapWords: ['쉬다', '자다', '놀다', '즐기다'],
      },
      {
        wordBlocks: [
          { text: '속은', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
        zh: '就当被骗了，忘了吧。',
        swapWords: ['속다', '당하다', '실수하다', '넘어지다'],
      },
      {
        wordBlocks: [
          { text: '잃어버린', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '기부했어요', role: 'verb' },
        ],
        zh: '就当丢了，捐了。',
        swapWords: ['잃어버리다', '없어지다', '버리다', '지나가다'],
      },
    ],
    scenarios: [
      { icon: '😴', context: '自我安慰', ko: '오늘은 쉬는 셈치고 아무 것도 안 할래요.', zh: '今天就当休息。' },
      { icon: '😞', context: '被骗', ko: '속은 셈치고 잊어버려요.', zh: '就当被骗了。' },
      { icon: '💸', context: '认栽', ko: '5만 원을 잃어버린 셈치고 기부했어요.', zh: '就当丢了钱。' },
      { icon: '📚', context: '假想', ko: '내가 그를 모르는 셈치자.', zh: '就当我不认识他。' },
      { icon: '👻', context: '视而不见', ko: '없는 셈치고 넘어가요.', zh: '就当没有，过去吧。' },
      { icon: '🙈', context: '不追究', ko: '못 본 셈치고 지나갈게요.', zh: '就当没看见，过去了。' },
    ],
    mistakes: [
      { wrong: '쉬는 셈이고', correct: '쉬는 셈치고', note: '"就当作"用 -셈치다，不是 -셈이다' },
      { wrong: '속이는 셈치고', correct: '속는 셈치고', note: '"就当上当一次"用 속다（被骗）的 속는，不是 속이다（骗别人）的 속이는' },
      { wrong: '학생 셈치다', correct: '학생인 셈치다', note: '名词需加 -인' },
    ],
    quickTable: {
      title: '-는 셈치다 用法',
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
      body: '选正确语义',
      questions: [
        {
          prompt: '"就当被骗了，忘了吧"',
          options: ['속는 셈이고 잊어요', '속은 셈이고 잊어요', '속은 셈치고 잊어요', '속는 셈치고 잊어요'],
          answer: 2,
          explanation: '"就当作"用 -셈치다；"被骗了"是完成动作用过去 -은 → 속은 셈치고。',
        },
        {
          prompt: '"这样算过得好的"（评估）',
          options: ['이 정도면 잘 사는 셈이에요', '이 정도면 잘 사는 셈쳐요', '이 정도면 잘 산 셈치자', '이 정도면 잘 사기 셈이에요'],
          answer: 0,
          explanation: '综合评估用 -셈이다 → 잘 사는 셈이에요。',
        },
        {
          prompt: '오늘은 (쉬다) 셈치고 아무 것도 안 할래요.',
          options: ['쉰', '쉬는', '쉴', '쉬기'],
          answer: 1,
          explanation: '"今天就当休息"用动词现在冠形 -는 → 쉬는 셈치고。',
        },
        {
          prompt: '-는 셈치다 与 -는 셈이다 的区别是……',
          options: ['完全相同', '前者假想/让步"就当"，后者评估"算是"', '前者过去，后者未来', '前者口语，后者书面'],
          answer: 1,
          explanation: '-셈이다=综合评估的事实"算是"；-셈치다=假想让步"就当作"。',
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
    compareLabel: '事实 vs 假想',
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
    title: '-는 척하다 / -는 체하다 深化',
    whatItDoes: '假装……',
    whatItDoesBody: '「-는/은/ㄴ 척하다 / -는/은/ㄴ 체하다」表示"假装……""装作……"。两者语义几乎相同，척하다 更口语，체하다 更书面。冠形变化按词类而定，与 -셈이다 相同。',
    structureNote: '动词现在 -는 척하다 · 动词过去 -은/ㄴ 척하다 · 形容词 -은/ㄴ 척하다 · 名词 -인 척하다',
    rulesNote: '척하다=체하다 语义相同；否定用 -지 않는 척하다 / 안 -는 척하다',
    structures: [
      {
        ko: '민수는 모르는 척했어요.',
        zh: '民秀装作不知道。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '모르는 척했어요', role: 'verb' },
        ],
      },
      {
        ko: '아픈 척하지 마세요.',
        zh: '别装病。',
        tokens: [
          { text: '아픈 척하지', role: 'plain' },
          { text: '마세요', role: 'verb' },
        ],
      },
      {
        ko: '못 본 체하고 지나갔어요.',
        zh: '假装没看见就过去了。',
        tokens: [
          { text: '못 본 체하고', role: 'verb' },
          { text: '지나갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在：-는 척하다/체하다', examples: '모르다 → 모르는 척하다 / 자다 → 자는 척하다' },
      { type: 'rule', text: '动词过去：-은/ㄴ 척하다', examples: '보다 → 본 척하다 / 먹다 → 먹은 척하다' },
      { type: 'rule', text: '形容词：-은/ㄴ 척하다', examples: '아프다 → 아픈 척하다 / 좋다 → 좋은 척하다' },
      { type: 'rule', text: '名词：-인 척하다', examples: '학생인 척하다 / 부자인 척하다' },
      { type: 'usage', text: '척하다 更口语；체하다 更书面/正式，两者可互换', examples: '못 본 척했어요 = 못 본 체했어요（假装没看见）' },
      { type: 'usage', text: '否定：-지 않는 척하다 / 안 -는 척하다', examples: '아프지 않은 척했어요.（假装不疼。）' },
      { type: 'compare', text: '-는 척하다 vs -는 것 같다 → 前者故意装，后者是我的主观感觉', examples: '자는 척해요.(假装睡) / 자는 것 같아요.(好像睡了)' },
      { type: 'note', text: '常见搭配 못 -는 척하다（假装做不到）', examples: '못 듣는 척하지 마세요.（别假装听不见。）' },
      { type: 'note', text: '语感：척하다 常带贬义，尤其 아는 척/잘난 척 = "显摆、自以为是"，不是中性的"假装"。中文"假装"没有这层贬义，别乱用', examples: '아는 척하지 마.（别不懂装懂/别显摆。）· 잘난 척하다（自以为了不起、摆架子）' },
      { type: 'note', text: '척 是依存名词，可插助词或单独用：아는 척(을) 하다；连"假装"都不做时说 척도 안 하다', examples: '인사는커녕 아는 척도 안 했어요.（别说打招呼，连搭理都没搭理。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '모르는', role: 'verb' },
          { text: '척했어요', role: 'verb' },
        ],
        zh: '民秀装不知道。',
        swapWords: ['모르다', '못 듣다', '못 보다', '괜찮다'],
      },
      {
        wordBlocks: [
          { text: '아픈', role: 'plain' },
          { text: '척하지', role: 'verb' },
          { text: '마세요', role: 'verb' },
        ],
        zh: '别装病。',
        swapWords: ['아프다', '피곤하다', '슬프다', '괴롭다'],
      },
      {
        wordBlocks: [
          { text: '못 본', role: 'verb' },
          { text: '체하고', role: 'verb' },
          { text: '지나갔어요', role: 'verb' },
        ],
        zh: '假装没看见就过去了。',
        swapWords: ['보다', '듣다', '알다', '느끼다'],
      },
    ],
    scenarios: [
      { icon: '🙈', context: '假装不知', ko: '민수는 모르는 척했어요.', zh: '民秀装不知道。' },
      { icon: '🤒', context: '装病', ko: '아픈 척하지 마세요.', zh: '别装病。' },
      { icon: '👻', context: '视而不见', ko: '못 본 체하고 지나갔어요.', zh: '装没看见走过去了。' },
      { icon: '😴', context: '装睡', ko: '자는 척했어요.', zh: '装睡了。' },
      { icon: '💵', context: '装有钱', ko: '부자인 척하지 마세요.', zh: '别装有钱。' },
      { icon: '📖', context: '装懂', ko: '이해한 척했지만 사실은 몰랐어요.', zh: '装懂了其实不懂。' },
    ],
    mistakes: [
      { wrong: '자은 척했어요', correct: '자는 척했어요', note: '"装睡"用动词现在冠形 -는' },
      { wrong: '아프는 척하지 마세요', correct: '아픈 척하지 마세요', note: '아프다 是形容词，冠形用 -ㄴ' },
      { wrong: '학생 척하다', correct: '학생인 척하다', note: '名词需加 -인' },
    ],
    quickTable: {
      title: '-는 척하다/체하다 冠形',
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
      title: '-는 척하다 冠形选择',
      body: '选正确冠形',
      questions: [
        {
          prompt: '민수는 (모르다) 척했어요.',
          options: ['모른', '모르는', '모를', '모르기'],
          answer: 1,
          explanation: '모르다 动词现在冠形 -는 → 모르는 척했어요。',
        },
        {
          prompt: '(아프다) 척하지 마세요.',
          options: ['아프는', '아픈', '아플', '아프기'],
          answer: 1,
          explanation: '아프다 是形容词，冠形用 -ㄴ → 아픈 척하지。',
        },
        {
          prompt: '민수가 (보다) 체하고 지나갔어요. 假装没看见',
          options: ['보는', '못 본', '보고', '볼'],
          answer: 1,
          explanation: '"假装没看见"是过去且否定，用 못 + 过去冠形 → 못 본 체하고。',
        },
        {
          prompt: '(학생) 척하지 마세요.',
          options: ['학생', '학생이', '학생인', '학생는'],
          answer: 2,
          explanation: '名词冠形 -인 → 학생인 척하지 마세요。',
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
    compareLabel: '假装 vs 好像',
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
    title: 'P27 综合练习',
    whatItDoes: 'P27 综合复习',
    whatItDoesBody: '本练习综合复习 P27 情态与语气强化章节的 8 个语法点：-기 마련이다 / -는 법이다 / -을/ㄹ 법하다 / -기 나름이다 / -기에 달려 있다 / -는 셈이다 / -는 셈치다 / -는 척하다。',
    structureNote: '综合本 Part 所有语法',
    rulesNote: '重点辨析：-는 법이다 vs -을 법하다；-셈이다 vs -셈치다',
    isPractice: true,
    structures: [
      {
        ko: '노력하면 성공하기 마련이에요.',
        zh: '努力必然会成功。',
        tokens: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기 마련이에요', role: 'verb' },
        ],
      },
      {
        ko: '성공은 노력하기에 달려 있어요.',
        zh: '成功在于努力。',
        tokens: [
          { text: '성공은', role: 'subject' },
          { text: '노력하기에', role: 'verb' },
          { text: '달려 있어요', role: 'verb' },
        ],
      },
      {
        ko: '민수는 모르는 척했어요.',
        zh: '民秀装作不知道。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '모르는 척했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기 마련이다 / -는 법이다 → 本来就/必然（口语 vs 书面）' },
      { type: 'rule', text: '-을/ㄹ 법하다 → 有可能（推测），结构相似但语义不同' },
      { type: 'rule', text: '-기 나름이다 / -기에 달려 있다 → 取决于（口语 vs 书面）' },
      { type: 'rule', text: '-는 셈이다 → 综合评估"算是"' },
      { type: 'rule', text: '-는 셈치다 → 假想让步"就当作"' },
      { type: 'rule', text: '-는 척하다 / -는 체하다 → 假装（口语 vs 书面）' },
      { type: 'usage', text: '冠形规则一致：动词现在 -는，动词过去/形容词 -은/ㄴ，名词 -인' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '노력하면', role: 'verb' },
          { text: '성공하기', role: 'verb' },
          { text: '마련이에요', role: 'verb' },
        ],
        zh: '努力必然会成功。',
        swapWords: ['성공하다', '이루다', '해내다', '얻다'],
      },
      {
        wordBlocks: [
          { text: '이 정도면', role: 'plain' },
          { text: '싼', role: 'plain' },
          { text: '셈이에요', role: 'plain' },
        ],
        zh: '这个价格算便宜了。',
        swapWords: ['싸다', '괜찮다', '적당하다', '저렴하다'],
      },
      {
        wordBlocks: [
          { text: '속은', role: 'verb' },
          { text: '셈치고', role: 'verb' },
          { text: '잊어버려요', role: 'verb' },
        ],
        zh: '就当被骗了，忘了吧。',
        swapWords: ['속다', '당하다', '잃다', '실수하다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '必然', ko: '노력하면 성공하기 마련이에요.', zh: '努力必然成功。' },
      { icon: '🎯', context: '取决于', ko: '성공은 노력하기에 달려 있어요.', zh: '成功在于努力。' },
      { icon: '🤔', context: '有可能', ko: '그런 일도 있을 법한 일이에요.', zh: '那种事也可能发生。' },
      { icon: '💰', context: '算是', ko: '5만 원이면 싼 셈이에요.', zh: '5万算便宜。' },
      { icon: '😞', context: '就当', ko: '속은 셈치고 잊어버려요.', zh: '就当被骗，忘了吧。' },
      { icon: '🙈', context: '假装', ko: '민수는 모르는 척했어요.', zh: '民秀装不知道。' },
    ],
    mistakes: [
      { wrong: '오는 법하다', correct: '올 법하다', note: '推测用 -을/ㄹ 법하다；-는 법이다 是必然道理' },
      { wrong: '가는 셈치고 놀았어요', correct: '가는 셈이에요', note: '"算是"用 -셈이다；"就当作"才用 -셈치다' },
      { wrong: '학생 척하다', correct: '학생인 척하다', note: '名词需加 -인 冠形' },
    ],
    linkedGrammarIds: ['card-p27-l01', 'card-p27-l02', 'card-p27-l03', 'card-p27-l04', 'card-p27-l05', 'card-p27-l06', 'card-p27-l07', 'card-p27-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P27 综合练习',
      body: '选择正确的表达',
      questions: [
        {
          prompt: '"努力必然会成功" 用……',
          options: ['성공할 법해요', '성공하는 법이 없어요', '성공하기 마련이에요', '성공하는 셈이에요'],
          answer: 2,
          explanation: '"必然""本来就"用 -기 마련이다 → 성공하기 마련이에요。',
        },
        {
          prompt: '"那种事也可能发生"（推测）',
          options: ['있는 법이에요', '있을 법한 일이에요', '있는 셈이에요', '있는 척해요'],
          answer: 1,
          explanation: '推测可能用 -을/ㄹ 법한 → 있을 법한 일이에요。',
        },
        {
          prompt: '"就当被骗，忘了吧"',
          options: ['속은 셈이고 잊어요', '속은 셈치고 잊어요', '속은 법이고 잊어요', '속는 척하고 잊어요'],
          answer: 1,
          explanation: '"就当作"用 -셈치다，"被骗了"用过去冠形 → 속은 셈치고。',
        },
        {
          prompt: '"民秀装不知道" 用……',
          options: ['모르는 셈이에요', '모르는 셈치자', '모르는 척했어요', '모르는 법이에요'],
          answer: 2,
          explanation: '"假装"用 -는 척하다 → 모르는 척했어요。',
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
