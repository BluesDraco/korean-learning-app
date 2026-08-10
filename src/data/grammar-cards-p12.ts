import type { GrammarCard } from '@/types';

export const grammarCardsP12: GrammarCard[] = [
  {
    id: 'card-p12-l01',
    partNumber: 12,
    lessonNumber: 1,
    title: '-을/ㄹ 테니까, -(이)든지',
    whatItDoes: '表示"我会……所以你……"和"不管……都……"', whatItDoesEn: 'Expressing "I\'ll... so you..." and "no matter... it\'s all..."',
    whatItDoesBody: '-을/ㄹ 테니까 表示说话人自己的意图或推测作为前提，让对方据此采取行动，相当于"我会……，所以你……"。\n-(이)든지 表示"不管是哪个都行"，与 -거나 类似但更强调任何情况都可以，后常接 괜찮다/좋다/상관없다。', whatItDoesBodyEn: '-을/ㄹ 테니까 expresses the speaker\'s intention or guess as a premise for the other person to act on, equivalent to "I\'ll..., so you..." \\n-(이)든지 means "either one is fine," similar to -거나 but emphasizing that any case is acceptable, often followed by 괜찮다/좋다/상관없다.',
    structureNote: '-을/ㄹ 테니까：动词 词干 + -을/ㄹ 테니까（有收音+을，无收音/ㄹ+ㄹ）\n-(이)든지：名词 + (이)든지，动词 + -든지', structureNoteEn: '-을/ㄹ 테니까: verb stem + -을/ㄹ 테니까 (with final consonant + 을, without/ㄹ + ㄹ)\\n-(이)든지: noun + (이)든지, verb + -든지',
    rulesNote: '-을/ㄹ 테니까 的 테 来源于表意志/推测的依存名词 터 的冠词形，表意志时主语必须是第一人称（나/우리）。表推测时无此限制。\n-(이)든지 列出两个以上时：A든지 B든지 的形式。', rulesNoteEn: '-을/ㄹ 테니까 comes from the adnominal form of the dependent noun 터, which indicates intention or conjecture. When expressing intention, the subject must be first person (나/우리). When expressing conjecture, there is no such restriction.\\n-(이)든지 when listing two or more: A든지 B든지 form.',
    structures: [
      {
        ko: '제가 준비할 테니까 걱정하지 마세요',
        zh: '我来准备，请不要担心。', zhEn: 'I\'ll prepare it, so don\'t worry.',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '준비할 테니까', role: 'plain' },
          { text: '걱정하지 마세요', role: 'verb' },
        ],
      },
      {
        ko: '제가 먼저 갈 테니까 천천히 오세요',
        zh: '我先走，你慢慢来。', zhEn: 'I\'ll go first, take your time.',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '먼저 갈 테니까', role: 'plain' },
          { text: '천천히 오세요', role: 'verb' },
        ],
      },
      {
        ko: '뭐든지 다 잘 먹어요',
        zh: '什么都吃，不挑食。', zhEn: 'Eats everything, not picky.',
        tokens: [
          { text: '뭐든지', role: 'plain' },
          { text: '다 잘 먹어요', role: 'verb' },
        ],
      },
      {
        ko: '언제든지 연락해도 돼요',
        zh: '随时联系都可以。', zhEn: 'You can contact me anytime.',
        tokens: [
          { text: '언제든지', role: 'time' },
          { text: '연락해도 돼요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을/ㄹ 테니까：有收音词干 + -을 테니까，无收音/ㄹ词干 + -ㄹ 테니까', textEn: '-을/ㄹ 테니까: stem with batchim + -을 테니까, stem without batchim or ending in ㄹ + -ㄹ 테니까', examples: '먹다→먹을 테니까 / 가다→갈 테니까 / 만들다→만들 테니까' },
      { type: 'rule', text: '-(이)든지：名词 有收音 + 이든지，无收音 + 든지', textEn: '-(이)든지: noun with batchim + 이든지, without batchim + 든지', examples: '학생이든지 / 의사든지 / 뭐든지 / 어디든지 / 누구든지' },
      { type: 'rule', text: '动词 + -든지：词干 + -든지（表示无论做什么动作都行）', textEn: 'Verb + -든지: stem + -든지 (meaning no matter what action you do, it\'s fine)', examples: '가든지 오든지 / 먹든지 말든지 / 자든지 깨든지' },
      { type: 'usage', text: '-을/ㄹ 테니까 后句常接命令/请求/建议，意志用法中前句主语必须是第一人称，推测用法无此限制', textEn: '-을/ㄹ 테니까 is often followed by commands/requests/suggestions; in the volitional usage, the subject of the first clause must be first person, but there\'s no such restriction in the suppositional usage', examples: '제가 할 테니까 쉬세요 / 내가 낼 테니까 신경 쓰지 마' },
      { type: 'usage', text: '-(이)든지 常与 상관없다/괜찮다 搭配', textEn: '-(이)든지 often pairs with 상관없다/괜찮다', examples: '어디든지 괜찮아요 / 누구든지 상관없어요 / 뭐든지 좋아요' },
      { type: 'note', text: '-을/ㄹ 테니까 的 테 有意志（~할 테니까）和强推测（~일 테니까）两种含义', textEn: 'The 테 in -을/ㄹ 테니까 has two meanings: volition (~할 테니까) and strong supposition (~일 테니까)', examples: '意志: 내가 운전할 테니까 걱정 마（我来开车）/ 推测: 거기 많이 추울 테니까 따뜻하게 입어요（那里一定很冷）', examplesEn: 'Volition: 내가 운전할 테니까 걱정 마 (I\'ll drive) / Supposition: 거기 많이 추울 테니까 따뜻하게 입어요 (It must be really cold there)' },
      { type: 'compare', text: '-을/ㄹ 테니까 vs -(으)니까：前者强调说话人意图，后者陈述客观原因', textEn: '-을/ㄹ 테니까 vs -(으)니까: the former emphasizes the speaker\'s intention, the latter states an objective reason', examples: '내가 살 테니까 골라（我来买，你选）vs 비가 오니까 우산 챙겨（因为下雨，带伞）', examplesEn: '내가 살 테니까 골라 (I\'ll buy it, you pick) vs 비가 오니까 우산 챙겨 (It\'s raining, so bring an umbrella)' },
      { type: 'compare', text: '-든지 vs -거나（前面学过）：都译"或者"，但 -거나 只是并列选项；-든지 强调"选哪个都无所谓、不管怎样"，还能接疑问词表"任何"（뭐든지·언제든지·누구든지），-거나 不能这样用', textEn: '-든지 vs -거나 (learned earlier): both translate to "or," but -거나 just lists options; -든지 emphasizes "it doesn\'t matter which, regardless," and can attach to question words to mean "any" (뭐든지·언제든지·누구든지), which -거나 cannot do', examples: '먹거나 마셔요（吃或喝，并列）· 먹든지 말든지 마음대로 해（吃不吃随便你）／ 뭐든지 O · 뭐거나 ✗', examplesEn: '먹거나 마셔요 (eat or drink, listing) · 먹든지 말든지 마음대로 해 (eat or not, up to you) / 뭐든지 O · 뭐거나 ✗' },
      { type: 'note', text: '"A든지 (말)든지" 表"做不做都随便、我不管"，带放任或不在乎的语气，对长辈或正式场合慎用', textEn: '"A든지 (말)든지" means "whether you do it or not, I don\'t care," with a permissive or indifferent tone; use cautiously with elders or in formal settings', examples: '가든지 말든지（去不去随你）· 하든지 말든지 신경 안 써（做不做我都不管）', examplesEn: '가든지 말든지 (go or not, up to you) · 하든지 말든지 신경 안 써 (do it or not, I don\'t care)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '요리할 테니까', role: 'plain' },
          { text: '설거지 해 주세요', role: 'verb' },
        ],
        zh: '我来做饭，你来洗碗吧。', zhEn: 'I\'ll cook, and you do the dishes.',
        swapWords: ['요리할 테니까 설거지 해 주세요', '청소할 테니까 장 봐 주세요', '준비할 테니까 기다려 주세요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '어디든지', role: 'plain' },
          { text: '같이 가면', role: 'plain' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '只要一起去哪里都好。', zhEn: 'Anywhere is fine as long as we go together.',
        swapWords: ['어디든지 좋아요', '언제든지 좋아요', '누구든지 좋아요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '먼저 자리를 맡을 테니까', role: 'plain' },
          { text: '천천히 오세요', role: 'verb' },
        ],
        zh: '我先去占位，你慢慢来。', zhEn: 'I\'ll go save seats first; take your time.',
        swapWords: ['자리를 맡을 테니까 천천히 오세요', '표를 살 테니까 기다리세요', '주문할 테니까 앉아 계세요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '뭐든지', role: 'plain' },
          { text: '시켜도', role: 'plain' },
          { text: '괜찮아요', role: 'verb' },
        ],
        zh: '点什么都可以。', zhEn: 'Order anything you like.',
        swapWords: ['뭐든지 괜찮아요', '언제든지 괜찮아요', '어디든지 괜찮아요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '分工合作', contextEn: 'Dividing the work', ko: '제가 요리할 테니까 설거지는 부탁해요.', zh: '我来做饭，洗碗麻烦你了。', zhEn: 'I\'ll cook; I\'ll leave the dishes to you.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '뭐든지 들어요. 그 그룹 노래라면 다 좋아요.', zh: '什么都听，只要是那个组合的歌都喜欢。', zhEn: 'I listen to anything—I like all of that group\'s songs.' },
      { icon: '📅', context: '约时间', contextEn: 'Make a time', ko: '언제든지 괜찮으니까 편한 때 연락해 주세요.', zh: '随时都可以，方便的时候联系我。', zhEn: 'Anytime works—contact me when it\'s convenient.' },
      { icon: '🚗', context: '出行安排', contextEn: 'Travel plans', ko: '제가 운전할 테니까 걱정하지 마세요.', zh: '我来开车，不用担心。', zhEn: 'I\'ll drive, so don\'t worry.' },
      { icon: '💬', context: '强推测', contextEn: 'Strong supposition', ko: '거기 사람이 많을 테니까 일찍 가는 게 좋겠어요.', zh: '那里一定很多人，最好早点去。', zhEn: 'There must be a lot of people there; you\'d better go early.' },
      { icon: '🏪', context: '购物场景', contextEn: 'Shopping Scene', ko: 'A: 뭐 먹을까요? B: 뭐든지 좋아요.', zh: 'A：吃什么？B：什么都好。', zhEn: 'A: What should we eat? B: Anything is fine.' },
    ],
    mistakes: [
      { wrong: '친구가 올 테니까 기다려요（第三人称主语 + -을 테니까）', wrongEn: '친구가 올 테니까 기다려요 (Third-person subject + -을 테니까)', correct: '친구가 올 거니까 기다려요 / 제가 기다릴 테니까 먼저 가세요', note: '意志用法中，前句主语必须是第一人称（나/우리）。推测用法不受此限（如 추울 테니까 따뜻하게 입어요）。', noteEn: 'In the volitional usage, the subject of the preceding clause must be first person (나/우리). The suppositional usage is not limited this way (e.g., 추울 테니까 따뜻하게 입어요).' },
      { wrong: '뭐이든지 먹어요（无收音名词 + 이든지）', wrongEn: '뭐이든지 먹어요 (Noun without batchim + 이든지)', correct: '뭐든지 먹어요', note: '뭐 无收音 → 뭐든지。이든지 仅用于有收音名词。', noteEn: '뭐 has no batchim → 뭐든지. 이든지 is only used with nouns that have a batchim.' },
      { wrong: '먹을 테니까 먹어요（前后主语相同，意思重复）', wrongEn: '먹을 테니까 먹어요 (Same subject before and after, meaning is redundant)', correct: '먹을 테니까 기다려요 / 먹을 거니까 같이 먹어요', note: '-을 테니까 前后主语不同时较自然，相同主语时不自然。', noteEn: '-을 테니까 is more natural when the subjects before and after are different; it sounds unnatural when they are the same.' },
      { wrong: '갈 테니까 갔어요（过去时 + 테니까）', wrongEn: '갈 테니까 갔어요 (Past tense + 테니까)', correct: '갈 테니까 기다리세요', note: '-을/ㄹ 테니까 用于将来意图/推测，不能与过去时结合。', noteEn: '-을/ㄹ 테니까 is used for future intention/supposition and cannot be combined with past tense.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P12 · 第1课</div>
    <div class="ov-hero-title">-을/ㄹ 테니까, -(이)든지</div>
    <div class="ov-hero-sub">意图前提与任意选择的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">意图/推测前提</div>
      <div class="ko">动词 词干 + -을/ㄹ 테니까</div>
      <div class="zh">我会……，所以你……</div>
    </div>
    <div class="ov-block">
      <div class="badge">任意选择</div>
      <div class="ko">名词/动词 + -(이)든지</div>
      <div class="zh">不管哪个都……</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"我会……所以你……"和"不管……都……"</div>
<div class="card-body">-을/ㄹ 테니까 表示说话人自己的意图或推测作为前提，让对方据此采取行动，相当于"我会……，所以你……"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">제가 준비할 테니까 걱정하지 마세요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我来准备，请不要担心。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">제가 먼저 갈 테니까 천천히 오세요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我先走，你慢慢来。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-을/ㄹ 테니까 的 테 来源于表意志/推测的依存名词 터 的冠词形，表意志时主语必须是第一人称（나/우리），表推测时无此限制。
-(이)든지 列出两个以上时：A든지 B든지 的形式。</div>
`,
    compareLabel: '-을 테니까 vs -(으)니까',
    compareHtml: `
<div class="card-title">-을/ㄹ 테니까 vs -(으)니까</div>
<div class="card-body">两者都能连接前后句，但 <b>-을/ㄹ 테니까</b> 强调说话人自己的意图或推测作为前提，<b>-(으)니까</b> 只陈述客观原因。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-을/ㄹ 테니까</div>
    <div class="cmp-row"><span class="badge">语气</span><span class="zh">说话人的意图/推测作前提（我会…所以你…）</span></div>
    <div class="cmp-row"><span class="badge">主语</span><span class="zh">意志用法前句须第一人称（나/우리）</span></div>
    <div class="cmp-row"><span class="ko">제가 살 테니까 골라 보세요</span></div>
    <div class="cmp-row"><span class="zh">我来买，你选就行（我承担）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-(으)니까</div>
    <div class="cmp-row"><span class="badge">语气</span><span class="zh">陈述客观原因/理由</span></div>
    <div class="cmp-row"><span class="badge">主语</span><span class="zh">无人称限制</span></div>
    <div class="cmp-row"><span class="ko">비가 오니까 우산을 챙기세요</span></div>
    <div class="cmp-row"><span class="zh">因为下雨，带上伞吧（客观原因）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>테니까</b> 是"我打算…所以你…"（带意志、前句多为我）；<b>(으)니까</b> 是"因为…所以…"（纯讲原因）。</div>
`,
    quickTable: {
      title: '-을/ㄹ 테니까 接续形式', titleEn: '-을/ㄹ 테니까 Connective Form',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 테니까', zh: '' }, { ko: '먹을 테니까', zh: '' }, { ko: '我会吃，所以……', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 테니까', zh: '' }, { ko: '갈 테니까', zh: '' }, { ko: '我会去，所以……', zh: '' }],
        [{ ko: '推测用法', zh: '推测', zhEn: 'Supposition' }, { ko: '名词+일 테니까', zh: '' }, { ko: '추울 테니까', zh: '' }, { ko: '一定会很冷，所以……', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 테니까, -(이)든지',
      body: '测试对两个语法点的掌握', bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '我来买单，你不用担心。→ 제가 낼 테니까 ___', promptEn: 'I\'ll pay, so you don\'t have to worry. → 제가 낼 테니까 ___',
          options: ['걱정했어요', '걱정입니다', '걱정하지 마세요', '걱정하니까요'],
          answer: 2 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까 后句接命令/请求', explanationEn: '-을/ㄹ 테니까 is followed by a command/request in the next clause',
        },
        {
          prompt: '什么时候都可以。→ 언제___ 괜찮아요', promptEn: 'Any time is fine. → 언제___ 괜찮아요',
          options: ['든지', '까지', '거나', '이든지'],
          answer: 0 as 0|1|2|3,
          explanation: '"无论何时都行"用 -(이)든지：언제 无收音 → 언제든지。까지（到…为止）、거나（连接动词）、이든지（有收音才用 이）都不合。', explanationEn: '"Any time is fine" uses -(이)든지: 언제 has no batchim → 언제든지. 까지 (until), 거나 (connecting verbs), and 이든지 (이 only with batchim) are all incorrect.',
        },
        {
          prompt: '-을/ㄹ 테니까 的前句主语必须是？', promptEn: 'What must the subject of the preceding clause be for -을/ㄹ 테니까?',
          options: ['第三人称', '第一人称（나/우리）', '任何人称', '第二人称（너/당신）'],
          answer: 1 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까 表意志时前句主语必须是第一人称', explanationEn: 'When -을/ㄹ 테니까 expresses volition, the subject of the preceding clause must be first person',
        },
        {
          prompt: '我先去占位。→ 제가 먼저 자리를 맡___ 테니까 기다려요', promptEn: 'I\'ll go save seats first. → 제가 먼저 자리를 맡___ 테니까 기다려요',
          options: ['ㄹ', '기', '는', '을'],
          answer: 3 as 0|1|2|3,
          explanation: '맡다 有收音 → 맡을 테니까', explanationEn: '맡다 has a batchim → 맡을 테니까',
        },
      ],
    },
    linkedGrammarIds: ['g48', 'g28'],
  },

  {
    id: 'card-p12-l02',
    partNumber: 12,
    lessonNumber: 2,
    title: '-(으)려고 하다/가다/오다',
    whatItDoes: '表示"打算做某事"和"去/来做某事"', whatItDoesEn: 'Expressing "intending to do something" and "going/coming to do something"',
    whatItDoesBody: '-(으)려고 하다 表示打算或意图，相当于"打算……/想要……"，强调说话人的主观意图。\n-(으)려고 가다/오다 表示为了某个目的而去/来，相当于"去/来做……"。\n两者都用 -(으)려고 作为前半，区别在于后接续的 动词不同。', whatItDoesBodyEn: '-(으)려고 하다 expresses intention or plan, equivalent to "intend to.../want to...", emphasizing the speaker\'s subjective intention.\\n-(으)려고 가다/오다 expresses going/coming for a purpose, equivalent to "go/come to do...".\\nBoth use -(으)려고 as the first part, but differ in the following verb.',
    structureNote: '-(으)려고：有收音词干 + -으려고，无收音/ㄹ词干 + -려고\n-(으)려고 하다：打算……\n-(으)려고 가다/오다：去/来做……', structureNoteEn: '-(으)려고: stem with final consonant + -으려고, stem without final consonant or with ㄹ + -려고\\n-(으)려고 하다: intend to...\\n-(으)려고 가다/오다: go/come to do...',
    rulesNote: '-(으)려고 하다 的主语通常是有意志的人（나/우리/그 사람 등）。\n-(으)려고 가다/오다 表示目的，移动动词 가다/오다 与之搭配。\n-러 가다/오다 含义相同但 -(으)려고 가다/오다 意图性更强。', rulesNoteEn: 'The subject of -(으)려고 하다 is usually a person with intention (나/우리/그 사람 etc.).\\n-(으)려고 가다/오다 expresses purpose, paired with movement verbs 가다/오다.\\n-러 가다/오다 has the same meaning, but -(으)려고 가다/오다 is more intentional.',
    structures: [
      {
        ko: '내년에 한국에 유학 가려고 해요',
        zh: '打算明年去韩国留学。', zhEn: 'I plan to study abroad in Korea next year.',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '유학 가려고 해요', role: 'verb' },
        ],
      },
      {
        ko: '새 옷을 사려고 백화점에 갔어요',
        zh: '为了买新衣服，去了百货商店。', zhEn: 'I went to the department store to buy new clothes.',
        tokens: [
          { text: '새 옷을', role: 'object' },
          { text: '사려고', role: 'plain' },
          { text: '백화점에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배우려고 학원에 다녀요',
        zh: '为了学韩语，在上补习班。', zhEn: 'I\'m taking a cram course to learn Korean.',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우려고', role: 'plain' },
          { text: '학원에', role: 'place' },
          { text: '다녀요', role: 'verb' },
        ],
      },
      {
        ko: '책을 빌리려고 도서관에 왔어요',
        zh: '为了借书来了图书馆。', zhEn: 'I came to the library to borrow books.',
        tokens: [
          { text: '책을', role: 'object' },
          { text: '빌리려고', role: 'plain' },
          { text: '도서관에', role: 'place' },
          { text: '왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)려고：有收音词干 + -으려고，无收音/ㄹ词干 + -려고', textEn: '-(으)려고: stem with final consonant + -으려고, stem without final consonant or with ㄹ + -려고', examples: '먹다→먹으려고 / 가다→가려고 / 살다→살려고 / 만들다→만들려고' },
      { type: 'rule', text: '-(으)려고 하다：表示打算/意图（앞뒤 주어 동일）', textEn: '-(으)려고 하다: expresses intention/purpose (subject must be the same before and after)', examples: '뭐 하려고 해요?（你打算做什么？）/ 한국에 가려고 해요（打算去韩国）', examplesEn: '뭐 하려고 해요? (What are you planning to do?) / 한국에 가려고 해요 (I plan to go to Korea)' },
      { type: 'rule', text: '-(으)려고 가다/오다：表示为了某目的而移动', textEn: '-(으)려고 가다/오다: indicates movement for a purpose', examples: '밥 먹으려고 식당에 갔어요 / 친구 만나려고 왔어요' },
      { type: 'usage', text: '-(으)려고 前必须是意志动词（有意图的动作），状态动词不可', textEn: 'The verb before -(으)려고 must be an action verb (intentional action); state verbs are not allowed.', examples: '알려고 해요（× 알다는 상태）→ 알아보려고 해요（✓）' },
      { type: 'usage', text: '-(으)려고 的前后主语必须相同', textEn: 'The subject before and after -(으)려고 must be the same.', examples: '제가 먹으려고 샀어요（○）/ 친구가 먹으려고 제가 샀어요（× 主语不一致）', examplesEn: '제가 먹으려고 샀어요 (○) / 친구가 먹으려고 제가 샀어요 (× subject mismatch)' },
      { type: 'note', text: '-러 가다/오다 与 -(으)려고 가다/오다 含义相近，-(으)려고 在口语中用得更自由', textEn: '-러 가다/오다 and -(으)려고 가다/오다 have similar meanings, but -(으)려고 is used more freely in spoken language.', examples: '밥 먹으러 갔어요 = 밥 먹으려고 갔어요（去吃饭了，两种说法意思相近。）', examplesEn: '밥 먹으러 갔어요 = 밥 먹으려고 갔어요 (I went to eat; both expressions have similar meanings.)' },
      { type: 'compare', text: '-(으)려고 하다 vs -(으)ㄹ 거예요：前者强调意图，后者更偏向计划/预测', textEn: '-(으)려고 하다 vs -(으)ㄹ 거예요: the former emphasizes intention, the latter leans toward plan/prediction.', examples: '가려고 해요（我有意去）vs 갈 거예요（我会去/打算去）', examplesEn: '가려고 해요 (I intend to go) vs 갈 거예요 (I will go/plan to go)' },
      { type: 'note', text: '-(으)려고 하다 还有第二个含义："即将发生、快要……了"。此时主语可以是无意志的事物（雨/太阳/婴儿），与"打算"的用法相反', textEn: '-(으)려고 하다 also has a second meaning: "about to happen, almost...". In this case, the subject can be a non-volitional thing (rain/sun/baby), opposite to the "intention" usage.', examples: '비가 오려고 해요（快下雨了）· 해가 지려고 해요（太阳要落山了）· 아이가 울려고 해요（孩子快哭了）', examplesEn: '비가 오려고 해요 (It\'s about to rain) · 해가 지려고 해요 (The sun is about to set) · 아이가 울려고 해요 (The baby is about to cry)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '다이어트를', role: 'object' },
          { text: '하려고', role: 'plain' },
          { text: '헬스장에 등록했어요', role: 'verb' },
        ],
        zh: '为了减肥，报了健身房。', zhEn: 'I signed up for a gym to lose weight.',
        swapWords: ['헬스장에 등록했어요', '음식을 줄이려고 해요', '매일 운동하려고 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이번 학기에', role: 'time' },
          { text: '한국어 시험에 합격하려고', role: 'plain' },
          { text: '열심히 공부하고 있어요', role: 'verb' },
        ],
        zh: '这学期为了通过韩语考试，正在努力学习。', zhEn: 'I\'m studying hard this semester to pass the Korean exam.',
        swapWords: ['열심히 공부하고 있어요', '학원에 다녀요', '매일 복습해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭐', role: 'plain' },
          { text: '하려고', role: 'plain' },
          { text: '해요?', role: 'verb' },
        ],
        zh: '你打算做什么？', zhEn: 'What are you planning to do?',
        swapWords: ['해요?', '했어요?', '할 거예요?'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '건강해지려고', role: 'plain' },
          { text: '매일', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
        zh: '为了变健康，每天运动。', zhEn: 'I exercise every day to become healthy.',
        swapWords: ['매일 운동해요', '매일 걸어요', '음식을 조절해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎓', context: '学习目标', contextEn: 'Study goal', ko: '한국어를 잘 하려고 매일 연습해요.', zh: '为了学好韩语，每天练习。', zhEn: 'I practice every day to learn Korean well.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '콘서트 표를 사려고 아침 일찍 일어났어요.', zh: '为了买演唱会票，早早起床了。', zhEn: 'I woke up early to buy concert tickets.' },
      { icon: '✈️', context: '旅行计划', contextEn: 'Travel plans', ko: '한국 여행을 가려고 돈을 모으고 있어요.', zh: '为了去韩国旅行，正在攒钱。', zhEn: 'I\'m saving money to travel to Korea.' },
      { icon: '🍜', context: '目的移动', contextEn: 'Movement for a purpose', ko: '유명한 냉면을 먹으려고 부산까지 갔어요.', zh: '为了吃著名的冷面，特地去了釜山。', zhEn: 'I went all the way to Busan to eat the famous cold noodles.' },
      { icon: '📚', context: '考试准备', contextEn: 'Exam Prep', ko: 'TOPIK 시험을 보려고 열심히 준비 중이에요.', zh: '为了参加TOPIK考试，正在努力准备中。', zhEn: 'I\'m working hard to prepare for the TOPIK exam.' },
      { icon: '💬', context: '日常对话', contextEn: 'Everyday conversation', ko: 'A: 왜 왔어요? B: 선생님 만나려고 왔어요.', zh: 'A：你来干什么？B：来见老师的。', zhEn: 'A: What did you come for? B: I came to see the teacher.' },
    ],
    mistakes: [
      { wrong: '먹을려고 해요（不必要的 을 + 려고）', wrongEn: '먹을려고 해요 (unnecessary 을 + 려고)', correct: '먹으려고 해요', note: '有收音词干 + -으려고，不是 -을려고。먹다 → 먹으려고（不是 먹을려고）。', noteEn: 'For stems with a final consonant, use -으려고, not -을려고. 먹다 → 먹으려고 (not 먹을려고).' },
      { wrong: '알려고 해요（状态动词 + -(으)려고）', wrongEn: '알려고 해요 (state verb + -(으)려고)', correct: '알아보려고 해요 / 이해하려고 해요', note: '알다 是状态动词，不能用 -(으)려고，需换用行为动词。', noteEn: '알다 is a state verb, so you can\'t use -(으)려고 with it; switch to an action verb instead.' },
      { wrong: '친구가 오려고 제가 청소했어요（前后主语不同）', wrongEn: '친구가 오려고 제가 청소했어요 (different subjects before and after)', correct: '친구가 오기 때문에 제가 청소했어요', note: '-(으)려고 前后主语必须相同。主语不同时用 -기 때문에 等。', noteEn: 'The subject before and after -(으)려고 must be the same. If the subjects differ, use -기 때문에, etc.' },
      { wrong: '가려고 갔어요（前后动词重复）', wrongEn: '가려고 갔어요 (repeating the same verb before and after)', correct: '밥 먹으려고 갔어요', note: '-(으)려고 前若用与移动动词相同的动词不自然。目的动词应不同于移动动词。', noteEn: 'It\'s unnatural to use the same verb as the movement verb before -(으)려고. The purpose verb should differ from the movement verb.' },
      { wrong: '커피를 마시려고 해요（想表达"我想喝咖啡"这种单纯愿望时）', wrongEn: '커피를 마시려고 해요 (when you want to express a simple wish like "I want to drink coffee")', correct: '커피를 마시고 싶어요', note: '中文一个"想"对应两种韩语：单纯的愿望/渴望用 -고 싶다；已下定决心、正着手准备的计划才用 -(으)려고 하다。别用 -(으)려고 하다 硬套所有"想"。', noteEn: 'The Chinese "想" maps to two Korean forms: use -고 싶다 for simple wishes/desires, and -(으)려고 하다 only for plans you\'ve decided on and are preparing for. Don\'t force -(으)려고 하다 onto every "want."' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P12 · 第2课</div>
    <div class="ov-hero-title">-(으)려고 하다/가다/오다</div>
    <div class="ov-hero-sub">打算与目的移动的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">打算/意图</div>
      <div class="ko">动词 词干 + -(으)려고 하다</div>
      <div class="zh">한국에 가려고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">目的移动</div>
      <div class="ko">动词 词干 + -(으)려고 가다/오다</div>
      <div class="zh">밥 먹으려고 갔어요</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"打算做某事"和"去/来做某事"</div>
<div class="card-body">-(으)려고 하다 表示打算或意图，相当于"打算……/想要……"，强调说话人的主观意图。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">내년에 한국에 유학 가려고 해요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">打算明年去韩国留学。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">새 옷을 사려고 백화점에 갔어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">为了买新衣服，去了百货商店。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-(으)려고 하다 的主语通常是有意志的人（나/우리/그 사람 등）。
-(으)려고 가다/오다 表示目的，移动动词 가다/오다 与之搭配。
-러 가다/오다 含义相同但 -(으)려고 가다/오다 意图性更强。</div>
`,
    compareLabel: '-(으)려고 하다 vs -ㄹ 거예요',
    compareHtml: `
<div class="card-title">-(으)려고 하다 vs -ㄹ 거예요</div>
<div class="card-body">两者都谈将来的事，但 <b>-(으)려고 하다</b> 强调"有意图、正准备"，<b>-ㄹ 거예요</b> 更偏向"计划/预测"。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-(으)려고 하다</div>
    <div class="cmp-row"><span class="badge">重点</span><span class="zh">主观意图，正打算做（心里已有此意）</span></div>
    <div class="cmp-row"><span class="ko">한국에 가려고 해요</span></div>
    <div class="cmp-row"><span class="zh">我有意去韩国（正朝这方向准备）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-ㄹ 거예요</div>
    <div class="cmp-row"><span class="badge">重点</span><span class="zh">计划或预测，陈述将来会发生</span></div>
    <div class="cmp-row"><span class="ko">한국에 갈 거예요</span></div>
    <div class="cmp-row"><span class="zh">我会去/打算去韩国（既定计划）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>가려고 해요</b> 侧重"我有这个念头、正在着手"；<b>갈 거예요</b> 侧重"这是我的计划/预测"。</div>
`,
    quickTable: {
      title: '-(으)려고 接续形式', titleEn: '-(으)려고 Connective Form',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-으려고', zh: '' }, { ko: '먹으려고', zh: '' }, { ko: '为了吃', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-려고', zh: '' }, { ko: '가려고', zh: '' }, { ko: '为了去', zh: '' }],
        [{ ko: 'ㄹ 词干', zh: '' }, { ko: '-려고（ㄹ不脱落）', zh: '' }, { ko: '만들려고', zh: '' }, { ko: '为了做', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)려고 하다/가다/오다',
      body: '测试对打算和目的表达的掌握', bodyEn: 'Test your grasp of intention and purpose expressions',
      questions: [
        {
          prompt: '打算学韩语。→ 한국어를 배우___ 해요', promptEn: 'I plan to learn Korean. → 한국어를 배우___ 해요',
          options: ['기로', '을려고', '려고', '으려고'],
          answer: 2 as 0|1|2|3,
          explanation: '배우다 无收音 → 배우려고', explanationEn: '배우다 has no final consonant → 배우려고',
        },
        {
          prompt: '为了买书去了书店。→ 책을 사___ 서점에 갔어요', promptEn: 'I went to the bookstore to buy a book. → 책을 사___ 서점에 갔어요',
          options: ['려고', '면서', '으려고', '기로'],
          answer: 0 as 0|1|2|3,
          explanation: '目的用 -(으)려고，사다 无收音 → 사려고 갔어요。면서（一边…一边）、으려고（有收音才加 으）、기로（决定做）都不合。', explanationEn: 'For purpose, use -(으)려고; 사다 has no final consonant → 사려고 갔어요. 면서 (while), 으려고 (add 으 only with final consonant), and 기로 (decide to) don\'t fit.',
        },
        {
          prompt: '-(으)려고 前后主语应该怎样？', promptEn: 'What should the subjects before and after -(으)려고 be like?',
          options: ['无所谓', '必须相同', '必须不同', '只能用第二人称'],
          answer: 1 as 0|1|2|3,
          explanation: '-(으)려고 前后主语必须相同', explanationEn: 'The subjects before and after -(으)려고 must be the same.',
        },
        {
          prompt: '为了见朋友来了这里。→ 친구를 만나___ 여기 왔어요', promptEn: 'I came here to meet a friend. → 친구를 만나___ 여기 왔어요',
          options: ['기 때문에', '는데', '으려고', '려고'],
          answer: 3 as 0|1|2|3,
          explanation: '만나다 无收音 → 만나려고 왔어요', explanationEn: '만나다 (no batchim) → 만나려고 왔어요',
        },
      ],
    },
    linkedGrammarIds: ['g25'],
  },

  {
    id: 'card-p12-l03',
    partNumber: 12,
    lessonNumber: 3,
    title: '-(으)려고 했다, -지 그랬어(요)?',
    whatItDoes: '表示"原本打算……"和"你当时为何不……"', whatItDoesEn: 'Expressing "originally intended to..." and "why didn\'t you... then"',
    whatItDoesBody: '-(으)려고 했다 表示原本有某个意图但最终未实现，相当于"本来打算……的"，隐含实际没做到的语气。\n-지 그랬어(요)? 表示说话人建议对方当时应该做某事，含有轻微遗憾或责备语气，相当于"你那时候为什么不……呢？"。\n两者常一起出现：说明原计划→对方给出建议或遗憾。', whatItDoesBodyEn: '-(으)려고 했다 expresses that there was an intention but it was not ultimately realized, equivalent to "had intended to...", implying it wasn\'t done.\\n-지 그랬어(요)? expresses the speaker suggesting that the listener should have done something at that time, with a slight tone of regret or reproach, equivalent to "Why didn\'t you... then?"\\nThey often appear together: stating the original plan → the other gives advice or regret.',
    structureNote: '-(으)려고 했다：动词 词干 + -(으)려고 했다（有收音+으려고，无收音/ㄹ+려고）\n-지 그랬어(요)?：动词 词干 + -지 그랬어요?（所有词干直接+지，格式固定）', structureNoteEn: '-(으)려고 했다: verb stem + -(으)려고 했다 (with final consonant + 으려고, without final consonant or with ㄹ + 려고)\\n-지 그랬어(요)?: verb stem + -지 그랬어요? (all stems directly + 지, fixed form)',
    rulesNote: '-(으)려고 했다 过去形表示意图未实现，若接 -는데 更自然：가려고 했는데 못 갔어요。\n-지 그랬어(요)? 中的 그랬어요 是 그러다 的过去形，直译为"为什么不那样做呢？"。\n两种形式都带有后悔/遗憾的语气。', rulesNoteEn: 'The past form -(으)려고 했다 indicates an unrealized intention; it\'s more natural with -는데: 가려고 했는데 못 갔어요.\\nIn -지 그랬어(요)?, 그랬어요 is the past form of 그러다, literally "why didn\'t you do that?"\\nBoth forms carry a tone of regret/remorse.',
    structures: [
      {
        ko: '오늘 운동하려고 했는데 비가 와서 못 했어요',
        zh: '本来打算今天运动，但因为下雨没能做。', zhEn: 'I was planning to exercise today, but it rained so I couldn\'t.',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '운동하려고 했는데', role: 'plain' },
          { text: '비가 와서', role: 'plain' },
          { text: '못 했어요', role: 'verb' },
        ],
      },
      {
        ko: '일찍 자려고 했는데 드라마를 보다가 늦게 잤어요',
        zh: '本来打算早睡，但看剧看到了很晚。', zhEn: 'I was planning to sleep early, but I ended up watching a show late into the night.',
        tokens: [
          { text: '일찍 자려고 했는데', role: 'plain' },
          { text: '드라마를 보다가', role: 'plain' },
          { text: '늦게 잤어요', role: 'verb' },
        ],
      },
      {
        ko: '그냥 전화하지 그랬어요?',
        zh: '你那时候为什么不直接打电话呢？', zhEn: 'Why didn\'t you just call then?',
        tokens: [
          { text: '그냥', role: 'plain' },
          { text: '전화하지 그랬어요?', role: 'verb' },
        ],
      },
      {
        ko: '미리 예약하지 그랬어요?',
        zh: '你怎么不提前预约呢？', zhEn: 'Why didn\'t you make a reservation in advance?',
        tokens: [
          { text: '미리', role: 'plain' },
          { text: '예약하지 그랬어요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)려고 했다：有收音词干 + -으려고 했다，无收音/ㄹ词干 + -려고 했다', textEn: '-(으)려고 했다: stems with batchim + -으려고 했다, stems without batchim/ㄹ + -려고 했다', examples: '먹다→먹으려고 했다 / 가다→가려고 했다 / 만들다→만들려고 했다' },
      { type: 'rule', text: '-지 그랬어(요)?：所有动词词干 + -지 그랬어요?（词干不变）', textEn: '-지 그랬어(요)?: all verb stems + -지 그랬어요? (stem unchanged)', examples: '가다→가지 그랬어요? / 말하다→말하지 그랬어요? / 먹다→먹지 그랬어요?' },
      { type: 'usage', text: '-(으)려고 했는데：在 했다 后接 -는데，表示"本打算……但是……"，更口语化', textEn: '-(으)려고 했는데: add -는데 after 했다 to mean "was going to... but...", more colloquial', examples: '자려고 했는데 잠이 안 왔어요 / 전화하려고 했는데 바빴어요' },
      { type: 'usage', text: '-지 그랬어요? 用于对对方行为表达轻微的遗憾或劝告', textEn: '-지 그랬어요? is used to express mild regret or advice about someone\'s action', examples: '일찍 오지 그랬어요?（你为什么不早点来）/ 도움 요청하지 그랬어요?（你为什么不求助呢）', examplesEn: '일찍 오지 그랬어요? (Why didn\'t you come earlier?) / 도움 요청하지 그랬어요? (Why didn\'t you ask for help?)' },
      { type: 'note', text: '-(으)려고 했다 暗示意图未实现', textEn: '-(으)려고 했다 implies the intention wasn\'t carried out', examples: '가려고 했어요（有意但未去）vs 가려고 해요（正打算去，将来）', examplesEn: '가려고 했어요 (intended but didn\'t go) vs 가려고 해요 (planning to go, future)' },
      { type: 'note', text: '-지 그랬어요? 的平语形是 -지 그랬어?，格式固定不变', textEn: 'The plain form of -지 그랬어요? is -지 그랬어?, and the pattern is fixed', examples: '그냥 먹지 그랬어?（你为啥不吃）/ 진작 말하지 그랬어?（早说不就好了）', examplesEn: '그냥 먹지 그랬어? (Why didn\'t you just eat?) / 진작 말하지 그랬어? (You should\'ve said it earlier)' },
      { type: 'compare', text: '-(으)려고 했다 vs -(으)려고 하다：前者过去意图（未实现），后者当前/将来意图', textEn: '-(으)려고 했다 vs -(으)려고 하다: the former is past intention (unfulfilled), the latter is current/future intention', examples: '가려고 했다（本打算去但没去）vs 가려고 한다（现在打算去）', examplesEn: '가려고 했다 (was going to go but didn\'t) vs 가려고 한다 (planning to go now)' },
      { type: 'compare', text: '-지 그랬어요? vs -지 그래요?：换个时态意思就不同——그랬어요 是"当时该做却没做"的过去遗憾/责备；그래요 是"现在/以后何不……"的温和建议', textEn: '-지 그랬어요? vs -지 그래요?: changing the tense changes the meaning—그랬어요 is past regret/reproach for not doing something then; 그래요 is a gentle suggestion for now/later', examples: '좀 쉬지 그랬어요?（你当时怎么不歇会儿·已过去）vs 좀 쉬지 그래요?（要不歇会儿吧·现在的建议）', examplesEn: '좀 쉬지 그랬어요? (Why didn\'t you rest then?—past) vs 좀 쉬지 그래요? (Why not rest a bit?—suggestion now)' },
      { type: 'note', text: '-지 그랬어요? 带"你怎么没这么做"的责备口气，对上司、长辈用容易像埋怨，宜慎用；对平辈朋友表关心才自然', textEn: '-지 그랬어요? carries a reproachful tone of "why didn\'t you do this?"—using it with superiors or elders can sound like complaining, so use with caution; it\'s natural with peers to show concern', examples: '同辈：말하지 그랬어（早说不就好了）／ 对长辈宜换成 미리 말씀해 주셨으면 좋았을 텐데요', examplesEn: 'For peers: 말하지 그랬어 (You should\'ve said it earlier) / For elders, better to say 미리 말씀해 주셨으면 좋았을 텐데요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '청소하려고 했는데', role: 'plain' },
          { text: '친구가 와서 못 했어요', role: 'verb' },
        ],
        zh: '周末本来打算打扫，但朋友来了没能做。', zhEn: 'I was planning to clean over the weekend, but a friend came over so I couldn\'t.',
        swapWords: ['청소하려고 했는데 친구가 와서 못 했어요', '요리하려고 했는데 시간이 없었어요', '공부하려고 했는데 피곤해서 잠들었어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '택시를 타지', role: 'plain' },
          { text: '그랬어요?', role: 'verb' },
        ],
        zh: '你为什么不坐出租车呢？', zhEn: 'Why didn\'t you take a taxi?',
        swapWords: ['그랬어요?', '그랬어?', '그러지'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트 표를', role: 'object' },
          { text: '일찍 예매하려고 했는데', role: 'plain' },
          { text: '매진됐어요', role: 'verb' },
        ],
        zh: '本来打算早点买演唱会票，但已经卖完了。', zhEn: 'I was planning to buy concert tickets early, but they were already sold out.',
        swapWords: ['일찍 예매하려고 했는데 매진됐어요', '예매하려고 했는데 사이트가 다운됐어요', '기다리려고 했는데 포기했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그냥', role: 'plain' },
          { text: '말하지', role: 'plain' },
          { text: '그랬어요?', role: 'verb' },
        ],
        zh: '你为什么不直接说呢？', zhEn: 'Why didn\'t you just say it directly?',
        swapWords: ['그랬어요?', '그랬어?', '그러지'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😅', context: '计划落空', contextEn: 'Plans fell through', ko: '오늘 일찍 일어나려고 했는데 알람을 못 들었어요.', zh: '今天本来打算早起，但没听到闹钟。', zhEn: 'I planned to get up early today, but I didn\'t hear the alarm.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '콘서트에 가려고 했는데 표가 다 팔렸어요.', zh: '本来想去演唱会，但票都卖完了。', zhEn: 'I wanted to go to the concert, but the tickets were all sold out.' },
      { icon: '💬', context: '朋友对话', contextEn: 'Friend conversation', ko: 'A: 길이 막혀서 늦었어요. B: 그럼 지하철을 타지 그랬어요?', zh: 'A：堵车迟到了。B：那你为什么不坐地铁呢？', zhEn: 'A: I was late because of traffic. B: Then why didn\'t you take the subway?' },
      { icon: '📚', context: '学习后悔', contextEn: 'Regret about studying', ko: '시험 전에 더 공부하지 그랬어요.', zh: '考试前应该多学习的。', zhEn: 'I should have studied more before the exam.' },
      { icon: '🍽️', context: '饮食场景', contextEn: 'Food scene', ko: '배고프면 먼저 먹지 그랬어요?', zh: '肚子饿的话你为什么不先吃呢？', zhEn: 'If you\'re hungry, why didn\'t you eat first?' },
      { icon: '✈️', context: '旅行计划', contextEn: 'Travel plans', ko: '여행을 가려고 했는데 갑자기 일이 생겼어요.', zh: '本来打算去旅行，但突然有事了。', zhEn: 'I planned to go on a trip, but something came up suddenly.' },
    ],
    mistakes: [
      { wrong: '가을려고 했어요（多加 을）', wrongEn: '가을려고 했어요 (adding 을 unnecessarily)', correct: '가려고 했어요', note: '가다 无收音词干 → 가려고（不是 가을려고），切忌多加 을。', noteEn: '가다 has no final consonant → 가려고 (not 가을려고), don\'t add 을.' },
      { wrong: '먹지 그래요?（现在时）', wrongEn: '먹지 그래요? (present tense)', correct: '먹지 그랬어요?（过去时）', correctEn: '먹지 그랬어요? (past tense)', note: '-지 그랬어요? 必须用过去形（그랬어요）。现在时 그래요 不表遗憾/建议语气。', noteEn: '-지 그랬어요? must use the past form (그랬어요). The present tense 그래요 doesn\'t express regret/suggestion.' },
      { wrong: '가려고 했는데 갔어요（前后矛盾）', wrongEn: '가려고 했는데 갔어요 (contradiction)', correct: '가려고 했는데 못 갔어요', note: '-(으)려고 했는데 后句通常出现与意图不同的结果。后接 못/안 否定或意外情况。', noteEn: '-(으)려고 했는데 is usually followed by a result different from the intention, with 못/안 or an unexpected situation.' },
      { wrong: '공부하지 않지 그랬어요?', correct: '공부하지 그랬어요?', note: '-지 그랬어요? 前需用肯定动词词干，不需要否定形式。表达"为什么不学习"直接用 공부하지 그랬어요?。', noteEn: '-지 그랬어요? requires a positive verb stem, no need for negation. To say "why didn\'t you study," just use 공부하지 그랬어요?.' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第3课</div><div class="ov-hero-title">-(으)려고 했다, -지 그랬어(요)?</div><div class="ov-hero-sub">未实现意图与遗憾建议的表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">未实现意图</div><div class="ko">动词 词干 + -(으)려고 했다</div><div class="zh">本来打算……（但没做到）</div></div><div class="ov-block"><div class="badge">遗憾建议</div><div class="ko">动词 词干 + -지 그랬어(요)?</div><div class="zh">你那时候为什么不……呢？</div></div></div></div>`,
    step0Html: `
<div class="card-title">表示"原本打算……"和"你当时为何不……"</div>
<div class="card-body">-(으)려고 했다 表示原本有某个意图但最终未实现，相当于"本来打算……的"，隐含实际没做到的语气。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">오늘 운동하려고 했는데 비가 와서 못 했어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">本来打算今天运动，但因为下雨没能做。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">일찍 자려고 했는데 드라마를 보다가 늦게 잤어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">本来打算早睡，但看剧看到了很晚。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-(으)려고 했다 过去形表示意图未实现，若接 -는데 更自然：가려고 했는데 못 갔어요。
-지 그랬어(요)? 中的 그랬어요 是 그러다 的过去形，直译为"为什么不那样做呢？"。
两种形式都带有后悔/遗憾的语气。</div>
`,
    compareLabel: '-(으)려고 했다 vs -지 그랬어요?',
    compareHtml: `
<div class="card-title">-(으)려고 했다 vs -지 그랬어요?</div>
<div class="card-body">两者都带遗憾语气，但 <b>-(으)려고 했다</b> 说自己"本打算却没做到"，<b>-지 그랬어요?</b> 说对方"那时怎么不…"。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-(으)려고 했다</div>
    <div class="cmp-row"><span class="badge">谁</span><span class="zh">说自己：本来的意图未实现</span></div>
    <div class="cmp-row"><span class="ko">운동하려고 했는데 비가 와서 못 했어요</span></div>
    <div class="cmp-row"><span class="zh">本来打算运动，可下雨没能做</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-지 그랬어요?</div>
    <div class="cmp-row"><span class="badge">谁</span><span class="zh">对着对方：责备/建议当时该做</span></div>
    <div class="cmp-row"><span class="ko">그냥 전화하지 그랬어요?</span></div>
    <div class="cmp-row"><span class="zh">你那时怎么不直接打个电话呢？</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>-(으)려고 했다</b> 讲"我原打算"（对自己）；<b>-지 그랬어요?</b> 讲"你当时该…"（对别人，带轻责）。</div>
`,
    quickTable: {
      title: '接续形式整理', titleEn: 'Connective Form Summary',
      headers: ['语法点', '接续', '例句', '意思'],
      rows: [
        [{ ko: '-(으)려고 했다', zh: '' }, { ko: '有收音+으려고 했다', zh: '' }, { ko: '먹으려고 했다', zh: '' }, { ko: '本来打算吃', zh: '' }],
        [{ ko: '-(으)려고 했다', zh: '' }, { ko: '无收音/ㄹ+려고 했다', zh: '' }, { ko: '가려고 했다', zh: '' }, { ko: '本来打算去', zh: '' }],
        [{ ko: '-지 그랬어요?', zh: '' }, { ko: '词干+지 그랬어요?', zh: '' }, { ko: '말하지 그랬어요?', zh: '' }, { ko: '你为什么不说呢', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)려고 했다, -지 그랬어(요)?',
      body: '测试对未实现意图和遗憾建议的掌握', bodyEn: 'Test mastery of unrealized intentions and regretful suggestions',
      questions: [
        {
          prompt: '本来打算早睡。→ 일찍 자___ 했어요', promptEn: 'I originally planned to sleep early. → 일찍 자___ 했어요',
          options: ['려고', '를려고', '으려고', '기로'],
          answer: 0 as 0|1|2|3,
          explanation: '자다 无收音 → 자려고 했어요', explanationEn: '자다 (no batchim) → 자려고 했어요',
        },
        {
          prompt: '你为什么不坐地铁呢？→ 지하철을 타___ 그랬어요?', promptEn: 'Why didn\'t you take the subway? → 지하철을 타___ 그랬어요?',
          options: ['려고', '면', '지', '서'],
          answer: 2 as 0|1|2|3,
          explanation: '타다 + -지 그랬어요? → 타지 그랬어요?',
        },
        {
          prompt: '-(으)려고 했는데 后面一般接什么？', promptEn: 'What usually follows -(으)려고 했는데?',
          options: ['命令', '现在进行', '将来计划', '未实现/意外结果'],
          answer: 3 as 0|1|2|3,
          explanation: '-(으)려고 했는데 暗示意图未实现，后句一般是못/안等否定结果', explanationEn: '-(으)려고 했는데 implies the intention wasn\'t fulfilled; the following clause usually has a negative result like 못/안',
        },
        {
          prompt: '本来打算吃饭但没吃。→ 밥을 먹___ 했는데 못 먹었어요', promptEn: 'I planned to eat but didn\'t. → 밥을 먹___ 했는데 못 먹었어요',
          options: ['을려고', '으려고', '기로', '려고'],
          answer: 1 as 0|1|2|3,
          explanation: '먹다 有收音 → 먹으려고 했는데', explanationEn: '먹다 (has batchim) → 먹으려고 했는데',
        },
      ],
    },
    linkedGrammarIds: ['g25'],
  },

  
  {
    id: 'card-p12-l04',
    partNumber: 12,
    lessonNumber: 4,
    title: '겸, -은/ㄴ 김에',
    whatItDoes: '表示"一举两得"和"趁着……顺便……"', whatItDoesEn: 'Expressing "killing two birds with one stone" and "while at it, ..."',
    whatItDoesBody: '겸 连接两个名词，表示同时兼顾两个目的或功能，相当于"既……又……／兼……"。\n-은/ㄴ 김에 接在过去冠词形之后，表示趁着某个已发生或正在做的事，顺便再做另一件事，相当于"趁着……，顺便……"。\n两者都传达"一石二鸟"的语感，겸 侧重并列目的，-은/ㄴ 김에 侧重借机行事。', whatItDoesBodyEn: '겸 connects two nouns, indicating simultaneously serving two purposes or functions, equivalent to "both... and.../兼...".\\n-은/ㄴ 김에 attaches to the past adnominal form, meaning to take the opportunity of something already done or ongoing to do another thing, equivalent to "while at it, ...".\\nBoth convey a "two birds with one stone" nuance; 겸 emphasizes parallel purposes, -은/ㄴ 김에 emphasizes seizing the opportunity.',
    structureNote: '겸：名词 + 겸 + 名词（两个名词之间）\n-은/ㄴ 김에：动词 过去冠词形 + 김에（有收音词干+-은 김에，无收音词干+-ㄴ 김에）', structureNoteEn: '겸: noun + 겸 + noun (between two nouns)\\n-은/ㄴ 김에: verb past adnominal form + 김에 (stem with final consonant + -은 김에, stem without final consonant + -ㄴ 김에)',
    rulesNote: '겸 只与名词结合，不能直接附加在动词上。\n-은/ㄴ 김에 的 김 是表示"机会/时机"的依存名词。主要用于以已经发生的动作为基础，提议追加动作时。\n-는 김에（现在进行）也可：청소하는 김에 정리도 해요。', rulesNoteEn: '겸 only combines with nouns, cannot directly attach to verbs.\\nIn -은/ㄴ 김에, 김 is a dependent noun meaning "opportunity/timing". Mainly used to suggest an additional action based on an already occurring action.\\n-는 김에 (present progressive) is also possible: 청소하는 김에 정리도 해요.',
    structures: [
      {
        ko: '운동 겸 산책을 했어요',
        zh: '又锻炼又散步。', zhEn: 'I exercised and also took a walk.',
        tokens: [
          { text: '운동 겸', role: 'plain' },
          { text: '산책을', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '관광 겸 출장으로 서울에 갔어요',
        zh: '以旅游兼出差的名义去了首尔。', zhEn: 'I went to Seoul for both sightseeing and business.',
        tokens: [
          { text: '관광 겸 출장으로', role: 'plain' },
          { text: '서울에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '나온 김에 장도 봤어요',
        zh: '趁着出来，顺便买了东西。', zhEn: 'Since I was out anyway, I bought some things on the way.',
        tokens: [
          { text: '나온 김에', role: 'plain' },
          { text: '장도', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
      },
      {
        ko: '청소하는 김에 빨래도 했어요',
        zh: '趁着打扫，顺便洗了衣服。', zhEn: 'While cleaning, I did the laundry too.',
        tokens: [
          { text: '청소하는 김에', role: 'plain' },
          { text: '빨래도', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '겸：名词 + 겸 + 名词，表示两件事同时兼顾', textEn: '겸: noun + 겸 + noun, meaning doing two things at once', examples: '운동 겸 산책 / 식사 겸 회의 / 관광 겸 출장 / 공부 겸 여행' },
      { type: 'rule', text: '-은/ㄴ 김에：有收音词干 + -은 김에，无收音/ㄹ词干 + -ㄴ 김에', textEn: '-은/ㄴ 김에: stem with batchim + -은 김에, stem without batchim or with ㄹ + -ㄴ 김에', examples: '나가다→나간 김에 / 먹다→먹은 김에 / 만들다→만든 김에' },
      { type: 'rule', text: '-는 김에（现在）也可：以进行中的动作为基础时', textEn: '-는 김에 (present) is also possible: when based on an ongoing action', examples: '요리하는 김에 간식도 만들어요 / 운동하는 김에 스트레칭도 해요' },
      { type: 'usage', text: '겸 前后的名词应是性质相同或可同时实现的', textEn: 'The nouns before and after 겸 should be of the same nature or can be done simultaneously', examples: '식사 겸 미팅（餐叙）/ 휴식 겸 치료（边休养边治疗）', examplesEn: '식사 겸 미팅 (lunch meeting) / 휴식 겸 치료 (rest while receiving treatment)' },
      { type: 'usage', text: '-은/ㄴ 김에 的后句主要是追加动作的建议', textEn: 'The clause after -은/ㄴ 김에 mainly suggests an additional action', examples: '여기 온 김에 사진도 찍어요 / 마트 간 김에 음료수도 사 왔어요' },
      { type: 'note', text: 'ㄹ 不规则动词也适用 -ㄴ 김에：만들다→만든 김에，알다→안 김에', textEn: 'ㄹ-irregular verbs also use -ㄴ 김에: 만들다→만든 김에, 알다→안 김에', examples: '만든 김에 더 만들어요 / 안 김에 바로 연락했어요' },
      { type: 'compare', text: '겸 vs -은/ㄴ 김에：겸是并列目的，-은/ㄴ 김에是以已经做的事为基础追加动作', textEn: '겸 vs -은/ㄴ 김에: 겸 lists parallel purposes, -은/ㄴ 김에 adds an action based on something already done', examples: '운동 겸 산책（并列目的）vs 나온 김에 산책도 해요（趁机追加）', examplesEn: '운동 겸 산책 (parallel purposes) vs 나온 김에 산책도 해요 (taking the chance to add)' },
      { type: 'compare', text: '-(ㄴ) 김에 vs -는 길에：中文都像"顺便/顺路"，但 -는 길에 是"在去某地的路上"（有实际移动路径），-은/ㄴ 김에 是"既然已经在做某事，趁机再做"（不必是路上）', textEn: '-(ㄴ) 김에 vs -는 길에: both can mean \'while at it\' in Chinese, but -는 길에 means \'on the way to somewhere\' (actual movement path), while -은/ㄴ 김에 means \'since I\'m already doing this, I\'ll do that too\' (not necessarily on the way)', examples: '학교 가는 길에 편의점에 들렀어요（在去学校的路上顺路进了便利店）vs 편의점에 간 김에 우유도 샀어요（既然去了便利店，就顺便买了牛奶）', examplesEn: '학교 가는 길에 편의점에 들렀어요 (stopped by the convenience store on the way to school) vs 편의점에 간 김에 우유도 샀어요 (since I went to the store, I bought milk too)' },
      { type: 'note', text: '겸 不只接名词：接动词时用 -(으)ㄹ 겸（表"也为了……"），可两两并列 -을 겸 -을 겸 해서。所以本课"겸只能接名词"是入门简化，见到动词形不要以为错', textEn: '겸 isn\'t only for nouns: with verbs, use -(으)ㄹ 겸 (meaning \'also to...\'), and you can list two with -을 겸 -을 겸 해서. So this lesson\'s \'겸 only takes nouns\' is a beginner simplification; don\'t think it\'s wrong if you see it with verbs', examples: '바람도 쐴 겸 산책하러 나왔어요（也为了透透气才出来散步）· 친구도 만날 겸 겸사겸사 서울에 갔어요', examplesEn: '바람도 쐴 겸 산책하러 나왔어요 (came out for a walk to get some fresh air too) · 친구도 만날 겸 겸사겸사 서울에 갔어요 (went to Seoul to meet a friend and also for other things)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구 만남 겸', role: 'plain' },
          { text: '쇼핑도', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '既见了朋友，又购了物。', zhEn: 'I met friends and also went shopping.',
        swapWords: ['친구 만남 겸 쇼핑도 했어요', '식사 겸 미팅을 했어요', '관광 겸 공부도 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울에 온 김에', role: 'plain' },
          { text: '박물관도', role: 'object' },
          { text: '가 봤어요', role: 'verb' },
        ],
        zh: '趁着来首尔，顺便去了博物馆。', zhEn: 'While in Seoul, I stopped by the museum.',
        swapWords: ['서울에 온 김에 박물관도 가 봤어요', '마트에 간 김에 음료수도 샀어요', '청소한 김에 정리도 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '요리하는 김에', role: 'plain' },
          { text: '도시락도', role: 'object' },
          { text: '만들었어요', role: 'verb' },
        ],
        zh: '趁着做饭，顺便做了便当。', zhEn: 'While cooking, I also made a lunchbox.',
        swapWords: ['요리하는 김에 도시락도 만들었어요', '빨래하는 김에 청소도 했어요', '나가는 김에 우편도 부쳤어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '여기 온 김에', role: 'plain' },
          { text: '사진도', role: 'object' },
          { text: '찍어요', role: 'verb' },
        ],
        zh: '趁着来这里，顺便拍个照。', zhEn: 'Since I\'m here, let me take a photo.',
        swapWords: ['사진도 찍어요', '구경도 해요', '커피도 마셔요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏃', context: '一举两得', contextEn: 'Kill two birds with one stone', ko: '운동 겸 산책으로 공원에 갔어요.', zh: '以锻炼兼散步为目的去了公园。', zhEn: 'I went to the park for both exercise and a walk.' },
      { icon: '🎵', context: 'KPOP 粉丝', contextEn: 'K-pop fan.', ko: '한국에 온 김에 좋아하는 가수 콘서트도 봤어요.', zh: '趁着来韩国，顺便看了喜欢的歌手演唱会。', zhEn: 'While in Korea, I caught my favorite singer\'s concert.' },
      { icon: '🛒', context: '购物场景', contextEn: 'Shopping Scene', ko: '마트 간 김에 필요한 거 다 샀어요.', zh: '趁着去超市，把需要的东西都买了。', zhEn: 'While at the supermarket, I bought everything I needed.' },
      { icon: '✈️', context: '出行兼顾', contextEn: 'Multitasking on the go', ko: '관광 겸 출장으로 일본에 다녀왔어요.', zh: '以旅游兼出差的方式去日本了。', zhEn: 'I went to Japan for both tourism and business.' },
      { icon: '🏠', context: '家务效率', contextEn: 'Housework efficiency', ko: '청소하는 김에 안 쓰는 물건도 버렸어요.', zh: '趁着打扫，顺便把不用的东西扔了。', zhEn: 'While cleaning, I threw away things I didn\'t need.' },
      { icon: '💬', context: '日常对话', contextEn: 'Everyday conversation', ko: 'A: 왜 이렇게 늦었어요? B: 나온 김에 친구도 만났어요.', zh: 'A：怎么这么晚？B：趁着出来，顺便见了朋友。', zhEn: 'A: Why are you so late? B: Since I was out, I met up with a friend.' },
    ],
    mistakes: [
      { wrong: '공부하다 겸 여행하다 겸 갔어요（动词+겸 直接结合）', wrongEn: '공부하다 겸 여행하다 겸 갔어요 (Verb + 겸 directly combined)', correct: '공부 겸 여행으로 갔어요', note: '겸 与名词搭配，动词原形不能直接附加。动词须先改为名词形。', noteEn: '겸 pairs with nouns; verb stems can\'t attach directly. Verbs must be nominalized first.' },
      { wrong: '나가는 김에 어제 샀어요（前后时态不一致）', wrongEn: '나가는 김에 어제 샀어요 (Tense inconsistency)', correct: '나간 김에 샀어요', note: '-은/ㄴ 김에 和 -는 김에 按时态区分：已完成动作→-은/ㄴ 김에，进行中→-는 김에。', noteEn: '-은/ㄴ 김에 vs -는 김에: use -은/ㄴ 김에 for completed actions, -는 김에 for ongoing ones.' },
      { wrong: '먹을 김에 더 먹어요（未来形+김에）', wrongEn: '먹을 김에 더 먹어요 (Future form + 김에)', correct: '먹는 김에 더 먹어요 / 먹은 김에 후식도 먹어요', note: '김에 前不使用将来形（-을）。仅现在进行（-는）或过去（-은/ㄴ）可用。', noteEn: 'Don\'t use future form (-을) before 김에. Only present (-는) or past (-은/ㄴ) are allowed.' },
      { wrong: '운동 겸 먹었어요（겸 后接无关动作）', wrongEn: '운동 겸 먹었어요 (겸 followed by unrelated action)', correct: '운동 겸 산책을 했어요', note: '겸 前后必须是可同时实现的相关目的或活动，才自然。', noteEn: '겸 requires related purposes or activities that can happen simultaneously to sound natural.' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第4课</div><div class="ov-hero-title">겸, -은/ㄴ 김에</div><div class="ov-hero-sub">一举两得与顺便的表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">兼顾两事</div><div class="ko">名词 + 겸 + 名词</div><div class="zh">既……又……／兼……</div></div><div class="ov-block"><div class="badge">顺便</div><div class="ko">动词 + -은/ㄴ 김에</div><div class="zh">趁着……，顺便……</div></div></div></div>`,
    step0Html: `
<div class="card-title">表示"一举两得"和"趁着……顺便……"</div>
<div class="card-body">겸 连接两个名词，表示同时兼顾两个目的或功能，相当于"既……又……／兼……"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">운동 겸 산책을 했어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">又锻炼又散步。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">관광 겸 출장으로 서울에 갔어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">以旅游兼出差的名义去了首尔。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">겸 只与名词结合，不能直接附加在动词上。
-은/ㄴ 김에 的 김 是表示"机会/时机"的依存名词。主要用于以已经发生的动作为基础，提议追加动作时。
-는 김에（现在进行）也可：청소하는 김에 정리도 해요。</div>
`,
    compareLabel: '겸 vs -은/ㄴ 김에',
    compareHtml: `
<div class="card-title">겸 vs -은/ㄴ 김에</div>
<div class="card-body">两者都表"一举两得"，但 <b>겸</b> 是并列两个目的（名词+名词），<b>-은/ㄴ 김에</b> 是趁着已做的事顺便再做。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">겸</div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">名词 + 겸 + 名词</span></div>
    <div class="cmp-row"><span class="badge">语感</span><span class="zh">两个目的一开始就并列兼顾</span></div>
    <div class="cmp-row"><span class="ko">운동 겸 산책을 했어요</span></div>
    <div class="cmp-row"><span class="zh">又当锻炼又当散步（两个目的并列）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-은/ㄴ 김에</div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词 过去/现在冠词形 + 김에</span></div>
    <div class="cmp-row"><span class="badge">语感</span><span class="zh">趁做某事的机会，顺手追加另一件</span></div>
    <div class="cmp-row"><span class="ko">나온 김에 장도 봤어요</span></div>
    <div class="cmp-row"><span class="zh">趁着出来，顺便买了菜（借机追加）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>겸</b> 接名词、两事并列；<b>김에</b> 接动词冠词形、以已做的事为基础顺便再做。</div>
`,
    quickTable: {
      title: '-은/ㄴ 김에 接续形式', titleEn: '-은/ㄴ 김에 Connective Form',
      headers: ['词干末音', '形式', '例句', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-은 김에', zh: '' }, { ko: '먹은 김에', zh: '' }, { ko: '趁着吃', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-ㄴ 김에', zh: '' }, { ko: '나간 김에', zh: '' }, { ko: '趁着出去', zh: '' }],
        [{ ko: '现在进行', zh: '' }, { ko: '-는 김에', zh: '' }, { ko: '청소하는 김에', zh: '' }, { ko: '趁着打扫', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '겸, -은/ㄴ 김에',
      body: '测试对겸和-은/ㄴ 김에的掌握', bodyEn: 'Test your grasp of 겸 and -은/ㄴ 김에',
      questions: [
        {
          prompt: '趁着出来，顺便买了咖啡。→ 나___ 김에 커피도 샀어요', promptEn: 'Since I was out anyway, I bought coffee too. → 나___ 김에 커피도 샀어요',
          options: ['오는', '오면', '온', '올'],
          answer: 2 as 0|1|2|3,
          explanation: '나오다 无收音过去冠词形：나오+ㄴ=나온，题目已给出 나，填 온 → 나온 김에', explanationEn: '나오다 (to come out) past adnominal form without batchim: 나오+ㄴ=나온. The prompt gives 나, so fill in 온 → 나온 김에',
        },
        {
          prompt: '겸 前后必须是什么？', promptEn: 'What must come before and after 겸?',
          options: ['动词原形', '名词', '副词', '形容词'],
          answer: 1 as 0|1|2|3,
          explanation: '겸 与名词搭配：운동 겸 산책，名词+겸+名词 的形式', explanationEn: '겸 pairs with nouns: 운동 겸 산책, in the form noun+겸+noun',
        },
        {
          prompt: '趁着打扫，顺便整理。→ 청소하___ 김에 정리도 했어요', promptEn: 'While cleaning, I tidied up too. → 청소하___ 김에 정리도 했어요',
          options: ['을', '은', 'ㄴ', '는'],
          answer: 3 as 0|1|2|3,
          explanation: '청소하다 + -는 김에：动作正在进行或反复发生的情境使用，청소하는 김에（趁着打扫）', explanationEn: '청소하다 + -는 김에: used when an action is ongoing or repeated, 청소하는 김에 (while cleaning)',
        },
        {
          prompt: '以旅游兼出差。→ 관광 ___ 출장', promptEn: 'A trip that doubles as business. → 관광 ___ 출장',
          options: ['겸', '이랑', '과', '하고'],
          answer: 0 as 0|1|2|3,
          explanation: '겸 连接两个并列目的名词：관광 겸 출장', explanationEn: '겸 connects two parallel purpose nouns: 관광 겸 출장',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l05',
    partNumber: 12,
    lessonNumber: 5,
    title: '(어)치, 짜리, 에',
    whatItDoes: '表示金额量词：价值分量、面值规格和单价', whatItDoesEn: 'Expressing amount quantifiers: value/quantity, denomination/specification, and unit price',
    whatItDoesBody: '(어)치 接在金额后面，表示"该金额相应的价值/分量"，相当于"……价值的／……钱的东西"。\n짜리 接在数量或金额后，表示"该单位或规格的事物"，主要用于货币单位或大小。\n에 表示价格时用"……에 팔다/사다"的形式，表达单价或总额。', whatItDoesBodyEn: '(어)치 attaches after an amount, meaning "the value/quantity corresponding to that amount", equivalent to "...worth of / ...won worth of".\\n짜리 attaches after a quantity or amount, meaning "a thing of that unit or specification", mainly used for currency units or sizes.\\n에 for price uses the form "...에 팔다/사다", expressing unit price or total.',
    structureNote: '(어)치：金额（数字+单位）+ 어치（标准形，不论收音有无均用 어치）\n짜리：数字+单位 + 짜리（大小·面值·规格表达）\n에：金额 + 에（～에 사다/팔다，表示价格）', structureNoteEn: '(어)치: amount (number+unit) + 어치 (standard form, always 어치 regardless of final consonant)\\n짜리: number+unit + 짜리 (expressing size, denomination, specification)\\n에: amount + 에 (～에 사다/팔다, indicating price)',
    rulesNote: '(어)치 通常写作 어치，不论收音有无均用 어치 较自然：만 원어치，오천 원어치。\n짜리 除货币单位外也可用于大小或容量：100ml 짜리，3인분짜리。\n에 作为助词也用于问价："얼마에 샀어요?"（多少钱买的？）。', rulesNoteEn: '(어)치 is usually written as 어치, and it\'s natural to use 어치 regardless of final consonant: 만 원어치, 오천 원어치.\\n짜리 can also be used for size or capacity besides currency units: 100ml 짜리, 3인분짜리.\\n에 as a particle is also used to ask price: "얼마에 샀어요?" (How much did you buy it for?).',
    structures: [
      {
        ko: '만 원어치 과자를 샀어요',
        zh: '买了一万韩元的零食。', zhEn: 'I bought 10,000 won worth of snacks.',
        tokens: [
          { text: '만 원어치', role: 'plain' },
          { text: '과자를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '천 원짜리 동전이 있어요?',
        zh: '有一千韩元面值的硬币吗？', zhEn: 'Do you have a 1,000-won coin?',
        tokens: [
          { text: '천 원짜리', role: 'plain' },
          { text: '동전이', role: 'subject' },
          { text: '있어요?', role: 'verb' },
        ],
      },
      {
        ko: '이 가방은 오만 원에 샀어요',
        zh: '这个包是用五万韩元买的。', zhEn: 'I bought this bag for 50,000 won.',
        tokens: [
          { text: '이 가방은', role: 'subject' },
          { text: '오만 원에', role: 'plain' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '삼만 원어치 고기를 구웠어요',
        zh: '烤了三万韩元的肉。', zhEn: 'I grilled 30,000 won worth of meat.',
        tokens: [
          { text: '삼만 원어치', role: 'plain' },
          { text: '고기를', role: 'object' },
          { text: '구웠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '(어)치：金额 + 어치（标准形），"该金额相当于的量"', textEn: '(어)치: amount + 어치 (standard form), meaning \'the quantity equivalent to that amount\'', examples: '천 원어치 / 오만 원어치 / 십만 원어치' },
      { type: 'rule', text: '짜리：数量/金额 + 짜리，"该单位·规格·面值的事物"', textEn: '짜리: quantity/amount + 짜리, meaning \'an item of that unit, size, or denomination\'', examples: '천 원짜리 동전 / 만 원짜리 지폐 / 500ml 짜리 / 1인분짜리' },
      { type: 'rule', text: '에（价格）：金额 + 에，用"～에 사다/팔다/주다"形式表达价格', textEn: '에 (price): amount + 에, expressing price with \'buy/sell/give for ~\'', examples: '이만 원에 팔아요 / 얼마에 샀어요? / 천 원에 세 개' },
      { type: 'usage', text: '(어)치 常用于定量购买，"얼마어치 주세요" 形式', textEn: '(어)치 is often used for buying a set amount, as in \'얼마어치 주세요\'', examples: '오천 원어치 주세요（给我五千韩元的）/ 만 원어치 사과（一万韩元的苹果）', examplesEn: '오천 원어치 주세요 (give me 5,000 won worth) / 만 원어치 사과 (10,000 won worth of apples)' },
      { type: 'usage', text: '짜리 也可用于货币单位以外的容量、大小、人份等', textEn: '짜리 can also be used for capacity, size, servings, etc., beyond currency units', examples: '2리터짜리 생수（2升装水）/ 2인분짜리 세트（两人份套餐）/ 50평짜리 아파트', examplesEn: '2리터짜리 생수 (2-liter water) / 2인분짜리 세트 (two-person set) / 50평짜리 아파트 (50-pyeong apartment)' },
      { type: 'note', text: '에 也用于表达单价：개당价格，束装价格', textEn: '에 is also used for unit prices: price per item, per bundle', examples: '개당 천 원에 팔아요 / 세 개에 오천 원이에요' },
      { type: 'compare', text: '(어)치 vs 짜리：어치表示金额分量（买了多少钱的东西），짜리表示规格/面值（这是多少钱面值的）', textEn: '(어)치 vs 짜리: 어치 indicates the amount in money (how much worth you bought), 짜리 indicates specification/denomination (what value it is)', examples: '만 원어치 샀어요（买了一万韩元的）vs 만 원짜리 지폐（一万韩元面值的纸币）', examplesEn: '만 원어치 샀어요 (bought 10,000 won worth) vs 만 원짜리 지폐 (a 10,000-won bill)' },
      { type: 'compare', text: '어치 vs 에：어치看"值这么多钱的量"（买了多少份），에看"成交价格"（以多少钱买到）。中文都说"一万韩元的"，韩语要按意思分开', textEn: '어치 vs 에: 어치 focuses on \'the amount worth that much\' (how much you bought), 에 focuses on \'the transaction price\' (at what price). Both translate to \'10,000 won worth\' in Chinese, but Korean distinguishes them by meaning', examples: '만 원어치 샀어요（买了值一万韩元那么多的东西）vs 만 원에 샀어요（以一万韩元买到的）', examplesEn: '만 원어치 샀어요 (bought things worth 10,000 won) vs 만 원에 샀어요 (bought it for 10,000 won)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오천 원어치', role: 'plain' },
          { text: '딸기를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '买了五千韩元的草莓。', zhEn: 'I bought 5,000 won worth of strawberries.',
        swapWords: ['오천 원어치 딸기를 샀어요', '만 원어치 고기를 샀어요', '이만 원어치 과일을 샀어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '만 원짜리', role: 'plain' },
          { text: '지폐로', role: 'plain' },
          { text: '계산했어요', role: 'verb' },
        ],
        zh: '用一万韩元面值的纸币结账了。', zhEn: 'I paid with a 10,000 won bill.',
        swapWords: ['만 원짜리 지폐로 계산했어요', '오천 원짜리 지폐로 냈어요', '천 원짜리 동전으로 냈어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 옷은', role: 'subject' },
          { text: '삼만 원에', role: 'plain' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '这件衣服是三万韩元买的。', zhEn: 'I bought this outfit for 30,000 won.',
        swapWords: ['삼만 원에 샀어요', '오만 원에 샀어요', '만오천 원에 샀어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '천 원짜리', role: 'plain' },
          { text: '동전', role: 'subject' },
          { text: '있어요?', role: 'verb' },
        ],
        zh: '有一千韩元的硬币吗？', zhEn: 'Do you have a 1,000 won coin?',
        swapWords: ['천 원짜리 동전 있어요?', '오백 원짜리 동전 있어요?', '만 원짜리 지폐 있어요?'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🛒', context: '市场购物', contextEn: 'Market Shopping', ko: '만 원어치 채소를 사 왔어요.', zh: '买了一万韩元的蔬菜回来了。', zhEn: 'I came back after buying 10,000 won worth of vegetables.' },
      { icon: '🎵', context: 'KPOP 周边', contextEn: 'KPOP Merch', ko: '아이돌 포토카드를 오만 원어치 샀어요.', zh: '买了五万韩元的偶像照片卡。', zhEn: 'I bought a 50,000 won idol photo card.' },
      { icon: '💵', context: '换零钱', contextEn: 'Getting Change', ko: '만 원짜리 지폐를 천 원짜리로 바꿔 주세요.', zh: '请把一万韩元面值的纸币换成一千韩元的。', zhEn: 'Please exchange this 10,000 won bill for 1,000 won bills.' },
      { icon: '🍖', context: '烤肉场景', contextEn: 'BBQ Scene', ko: '삼만 원어치 삼겹살 주세요.', zh: '请给我三万韩元的五花肉。', zhEn: 'Please give me 30,000 won worth of pork belly.' },
      { icon: '🏪', context: '便利店', contextEn: 'Convenience store', ko: '세 개에 천 원이에요.', zh: '三个一千韩元。', zhEn: 'Three for 1,000 won.' },
      { icon: '💬', context: '询问价格', contextEn: 'Asking the Price', ko: 'A: 이거 얼마에 샀어요? B: 이만 원에 샀어요.', zh: 'A：这个多少钱买的？B：两万韩元买的。', zhEn: 'A: How much did you buy this for? B: I bought it for 20,000 won.' },
    ],
    mistakes: [
      { wrong: '만 원치 주세요（只用 치）', wrongEn: '만 원치 주세요 (using only 치)', correct: '만 원어치 주세요', note: '标准形是 어치。不论收音有无均用 어치：천 원어치，만 원어치。', noteEn: 'The standard form is 어치. Use 어치 regardless of whether there\'s a final consonant: 천 원어치, 만 원어치.' },
      { wrong: '천 원짜리어치（짜리+어치 重复）', wrongEn: '천 원짜리어치 (짜리 + 어치 repetition)', correct: '천 원어치（金额分量）或 천 원짜리（面值物品）', correctEn: '천 원어치 (amount worth) or 천 원짜리 (item of that value)', note: '짜리 和 어치 含义不同，不能重复使用。', noteEn: '짜리 and 어치 have different meanings and can\'t be used together.' },
      { wrong: '얼마에서 샀어요?（用了 에서）', wrongEn: '얼마에서 샀어요? (using 에서)', correct: '얼마에 샀어요?', note: '询问价格时用 에 而非 에서：얼마에 샀어요?（多少钱买的？）', noteEn: 'Use 에, not 에서, when asking the price: 얼마에 샀어요? (How much did you buy it for?)' },
      { wrong: '이만 원어치짜리（어치+짜리 混用）', wrongEn: '이만 원어치짜리 (mixing 어치 and 짜리)', correct: '이만 원어치（金额分量）或 이만 원짜리（规格/面值）', correctEn: '이만 원어치 (amount worth) or 이만 원짜리 (spec/denomination)', note: '어치 和 짜리 各自独立使用，不能同时附加。', noteEn: '어치 and 짜리 are used independently and can\'t be attached together.' },
      { wrong: '사과 세 개어치 주세요（把 어치 接在个数后）', wrongEn: '사과 세 개어치 주세요 (attaching 어치 to a count)', correct: '사과 만 원어치 주세요', note: '어치 只能接"金额"（万 원、오천 원），不能接个数。要论个买直接说 세 개：사과 세 개 주세요。', noteEn: '어치 can only attach to amounts (like 만 원, 오천 원), not to counts. To buy by the item, just say 세 개: 사과 세 개 주세요.' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第5课</div><div class="ov-hero-title">(어)치, 짜리, 에</div><div class="ov-hero-sub">金额量词与价格表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">价值量</div><div class="ko">금액 + (어)치</div><div class="zh">……价值的东西／……钱的</div></div><div class="ov-block"><div class="badge">面值/规格</div><div class="ko">수 + 짜리</div><div class="zh">……面值的／……规格的</div></div><div class="ov-block"><div class="badge">单价</div><div class="ko">금액 + 에</div><div class="zh">……钱（买到/卖出）</div></div></div></div>`,
    step0Html: `
<div class="card-title">表示金额量词：价值分量、面值规格和单价</div>
<div class="card-body">(어)치 接在金额后面，表示"该金额相应的价值/分量"，相当于"……价值的／……钱的东西"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">만 원어치 과자를 샀어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">买了一万韩元的零食。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">천 원짜리 동전이 있어요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">有一千韩元面值的硬币吗？</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">(어)치 通常写作 어치，不论收音有无均用 어치 较自然：만 원어치，오천 원어치。
짜리 除货币单位外也可用于大小或容量：100ml 짜리，3인분짜리。
에 作为助词也用于问价："얼마에 샀어요?"（多少钱买的？）。</div>
`,
    compareLabel: '(어)치 vs 짜리',
    compareHtml: `
<div class="card-title">(어)치 vs 짜리</div>
<div class="card-body">都接在金额后，但 <b>(어)치</b> 说"这么多钱买到的量"，<b>짜리</b> 说"这是多少钱面值/规格的东西"。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">(어)치</div>
    <div class="cmp-row"><span class="badge">含义</span><span class="zh">该金额相当的分量（买了多少钱的东西）</span></div>
    <div class="cmp-row"><span class="ko">만 원어치 과자를 샀어요</span></div>
    <div class="cmp-row"><span class="zh">买了一万韩元的零食（一万块的量）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">짜리</div>
    <div class="cmp-row"><span class="badge">含义</span><span class="zh">该面值/规格的事物（这一件是多少钱的）</span></div>
    <div class="cmp-row"><span class="ko">천 원짜리 동전이 있어요?</span></div>
    <div class="cmp-row"><span class="zh">有一千韩元面值的硬币吗？（这枚是千元的）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>어치</b>=买了多少钱的量（만 원어치 샀어요）；<b>짜리</b>=多少钱面值/规格的物（만 원짜리 지폐）。两者不能叠用。</div>
`,
    quickTable: {
      title: '金额表达三种', titleEn: 'Three Ways to Express Amounts',
      headers: ['表达', '含义', '例句', '用法'],
      rows: [
        [{ ko: '(어)치', zh: '' }, { ko: '该金额的分量', zh: '价值量', zhEn: 'value amount' }, { ko: '만 원어치 사과', zh: '' }, { ko: '一万韩元的苹果', zh: '' }],
        [{ ko: '짜리', zh: '' }, { ko: '单位/规格/面值', zh: '规格/面值', zhEn: 'denomination/face value' }, { ko: '천 원짜리 동전', zh: '' }, { ko: '一千韩元硬币', zh: '' }],
        [{ ko: '에', zh: '' }, { ko: '价格（单价/总额）', zh: '价格', zhEn: 'price' }, { ko: '만 원에 샀어요', zh: '' }, { ko: '一万韩元买的', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(어)치, 짜리, 에',
      body: '测试对三种价格表达的掌握', bodyEn: 'tests mastery of three price expressions',
      questions: [
        {
          prompt: '买了一万韩元的零食。→ 만 원___ 과자를 샀어요', promptEn: 'I bought snacks worth 10,000 won. → 만 원___ 과자를 샀어요',
          options: ['치', '어치', '짜리', '에'],
          answer: 1 as 0|1|2|3,
          explanation: '该金额的分量 → (어)치：만 원어치', explanationEn: 'the amount\'s worth → (어)치: 만 원어치',
        },
        {
          prompt: '一千韩元面值的硬币。→ 천 원___ 동전', promptEn: 'a coin with a 1,000-won face value. → 천 원___ 동전',
          options: ['어치', '에', '짜리', '치'],
          answer: 2 as 0|1|2|3,
          explanation: '面值/规格 → 짜리：천 원짜리 동전', explanationEn: 'denomination/denomination → 짜리: 천 원짜리 동전',
        },
        {
          prompt: '这件衣服是三万韩元买的。→ 이 옷은 삼만 원___ 샀어요', promptEn: 'I bought this outfit for 30,000 won. → 이 옷은 삼만 원___ 샀어요',
          options: ['에', '짜리', '에서', '어치'],
          answer: 0 as 0|1|2|3,
          explanation: '价格表达 → 에：삼만 원에 샀어요', explanationEn: 'price expression → 에: 삼만 원에 샀어요',
        },
        {
          prompt: '给我五千韩元的草莓。→ 오천 원___ 딸기 주세요', promptEn: 'Give me 5,000 won worth of strawberries. → 오천 원___ 딸기 주세요',
          options: ['에', '만큼', '짜리', '어치'],
          answer: 3 as 0|1|2|3,
          explanation: '按金额定量购买 → 어치：오천 원어치 주세요', explanationEn: 'buying a set amount by value → 어치: 오천 원어치 주세요',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l06',
    partNumber: 12,
    lessonNumber: 6,
    title: '"ㄹ" 的不规则音变', titleEn: 'Irregular Conjugation of "ㄹ"',
    whatItDoes: 'ㄹ词干动词/形容词在特定词尾前ㄹ脱落的规则', whatItDoesEn: 'Rule of ㄹ deletion for ㄹ-stem verbs/adjectives before certain endings',
    whatItDoesBody: '以 ㄹ 收音结尾的动词/形容词（ㄹ词干）在某些词尾前 ㄹ 会脱落。\nㄹ 脱落的条件：词尾以 ㄴ、ㅂ、시、오 开头时（记忆法：나비시오）。\nㄹ 保留的条件：词尾以 아/어、고、지、면、도 等开头时。', whatItDoesBodyEn: 'Verbs/adjectives ending in ㄹ (ㄹ-stems) drop the ㄹ before certain endings.\\nㄹ deletion condition: when the ending starts with ㄴ, ㅂ, 시, 오 (mnemonic: 나비시오).\\nㄹ retention condition: when the ending starts with 아/어, 고, 지, 면, 도, etc.',
    structureNote: 'ㄹ脱落：ㄹ词干 + -(으)ㄴ/-(으)ㄹ（除将来冠词形）/ -ㅂ니다/-습니다 / -(으)세요 / -(으)오\nㄹ保留：ㄹ词干 + -아/어요 / -고 / -지 / -(으)면 / -아/어도 等\n注意：过去冠词形 -(으)ㄴ 时 ㄹ 脱落；但 -(으)ㄹ（将来冠词形）时保留', structureNoteEn: 'ㄹ deletion: ㄹ-stem + -(으)ㄴ/-(으)ㄹ (except future adnominal) / -ㅂ니다/-습니다 / -(으)세요 / -(으)오\\nㄹ retention: ㄹ-stem + -아/어요 / -고 / -지 / -(으)면 / -아/어도 etc.\\nNote: ㄹ drops in past adnominal -(으)ㄴ; but retained in future adnominal -(으)ㄹ',
    rulesNote: '记忆法（나비시오）：以 ㄴ 开头的词尾、以 ㅂ 开头的词尾、以 시 开头的词尾、以 오 开头的词尾前 ㄹ 脱落。\n알다（知道）：알아요（知道）/ 아세요（知道吗/请知道）/ 압니다（知道）/ 아는（知道的）\n살다（居住）：살아요（居住）/ 사세요（请住）/ 삽니다（居住）/ 사는（居住的）\n만들다（制作）：만들어요（制作）/ 만드세요（请制作）/ 만듭니다（制作）/ 만드는（制作的）', rulesNoteEn: 'Mnemonic (나비시오): ㄹ drops before endings starting with ㄴ, ㅂ, 시, or 오.\\n알다 (to know): 알아요 (know) / 아세요 (do you know/please know) / 압니다 (know) / 아는 (knowing)\\n살다 (to live): 살아요 (live) / 사세요 (please live) / 삽니다 (live) / 사는 (living)\\n만들다 (to make): 만들어요 (make) / 만드세요 (please make) / 만듭니다 (make) / 만드는 (making)',
    structures: [
      {
        ko: '한국어를 잘 아세요?',
        zh: '你韩语说得好吗？（알다 + -(으)세요 → 아세요）', zhEn: 'Do you speak Korean well? (알다 + -(으)세요 → 아세요)',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘', role: 'plain' },
          { text: '아세요?', role: 'verb' },
        ],
      },
      {
        ko: '여기서 삽니다',
        zh: '住在这里。（살다 + -ㅂ니다 → 삽니다）', zhEn: 'I live here. (살다 + -ㅂ니다 → 삽니다)',
        tokens: [
          { text: '여기서', role: 'place' },
          { text: '삽니다', role: 'verb' },
        ],
      },
      {
        ko: '직접 만든 케이크예요',
        zh: '是亲手做的蛋糕。（만들다 + -ㄴ → 만든）', zhEn: 'It\'s a homemade cake. (만들다 + -ㄴ → 만든)',
        tokens: [
          { text: '직접', role: 'plain' },
          { text: '만든', role: 'plain' },
          { text: '케이크예요', role: 'verb' },
        ],
      },
      {
        ko: '서울에 사는 친구예요',
        zh: '是住在首尔的朋友。（살다 + -는 → 사는，ㄹ脱落）', zhEn: 'It\'s a friend living in Seoul. (살다 + -는 → 사는, ㄹ drops)',
        tokens: [
          { text: '서울에', role: 'place' },
          { text: '사는', role: 'plain' },
          { text: '친구예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㄹ 脱落条件（나비시오）：词尾以 ㄴ/ㅂ/시/오 开头时', textEn: 'ㄹ-drop condition (나비시오): when the ending starts with ㄴ/ㅂ/시/오', examples: '알다：아는（ㄴ） / 압니다（ㅂ） / 아세요（시） / 아오（오）' },
      { type: 'rule', text: 'ㄹ 保留条件：词尾以 아/어、고、지、면、도、ㄹ 等开头时', textEn: 'ㄹ-retention condition: when the ending starts with 아/어, 고, 지, 면, 도, ㄹ, etc.', examples: '알다：알아요 / 알고 / 알지 / 알면 / 알아도 / 알 거예요' },
      { type: 'rule', text: '现在冠词形：ㄹ词干 + -는（ㄹ脱落）；过去冠词形：ㄹ词干 + -ㄴ（ㄹ脱落）', textEn: 'Present adnominal: ㄹ-stem + -는 (ㄹ drops); past adnominal: ㄹ-stem + -ㄴ (ㄹ drops)', examples: '만들다：만드는 것（现在）/ 만든 것（过去）/ 만들 것（将来，ㄹ保留）', examplesEn: 'Make: making (present) / made (past) / will make (future, ㄹ retained)' },
      { type: 'usage', text: '主要 ㄹ 不规则动词：알다、살다、만들다、놀다、팔다、걸다、들다、불다、열다、울다、멀다', textEn: 'Main ㄹ irregular verbs: 알다, 살다, 만들다, 놀다, 팔다, 걸다, 들다, 불다, 열다, 울다, 멀다', examples: '알다（知）/ 살다（住/生）/ 만들다（做）/ 놀다（玩）/ 팔다（卖）/ 열다（开）', examplesEn: '알다 (know) / 살다 (live) / 만들다 (make) / 놀다 (play) / 팔다 (sell) / 열다 (open)' },
      { type: 'usage', text: '形容词也相同：길다（长），달다（甜），멀다（远），가늘다（细）', textEn: 'Adjectives work the same: 길다 (long), 달다 (sweet), 멀다 (far), 가늘다 (thin)', examples: '길다：긴（ㄴ）/ 깁니다（ㅂ）/ 기세요（시）/ 길어요（保留）', examplesEn: '길다: 긴 (ㄴ) / 깁니다 (ㅂ) / 기세요 (시) / 길어요 (retained)' },
      { type: 'note', text: '-(으)ㄹ 将来冠词形中 ㄹ 不脱落', textEn: 'In the -(으)ㄹ future adnominal form, ㄹ is not dropped', examples: '알 것 같아요（不是 아 것） / 만들 수 있어요（不是 만드 수）', examplesEn: '알 것 같아요 (not 아 것) / 만들 수 있어요 (not 만드 수)' },
      { type: 'compare', text: 'ㄹ 不规则 vs 规则动词：ㄹ词干仅在特定词尾前脱落，规则动词始终保留', textEn: 'ㄹ irregular vs regular verbs: ㄹ stems drop only before certain endings; regular verbs always retain it', examples: '살다（不规则）：사세요 vs 참다（规则）：참으세요（加 으）', examplesEn: '살다 (irregular): 사세요 vs 참다 (regular): 참으세요 (add 으)' },
      { type: 'note', text: '关键：ㄹ词干永远不加"으"。之前学的"有收音就加 으"对 ㄹ词干无效——无论 ㄹ 是脱落还是保留，都当作"没有收音"处理，直接接词尾', textEn: 'Key: ㄹ stems never take "으". The rule "add 으 after a final consonant" doesn\'t apply to ㄹ stems—whether ㄹ drops or stays, treat it as having no final consonant and attach endings directly', examples: '脱落时：사세요（不是 살으세요）；保留时：살면（不是 살으면）、살 거예요（不是 살을 거예요）', examplesEn: 'When dropped: 사세요 (not 살으세요); when retained: 살면 (not 살으면), 살 거예요 (not 살을 거예요)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래', role: 'subject' },
          { text: '아세요?', role: 'verb' },
        ],
        zh: '你知道这首歌吗？（알다→아세요，ㄹ脱落）', zhEn: 'Do you know this song? (알다→아세요, ㄹ dropped)',
        swapWords: ['아세요?', '알아요?', '알고 싶어요?'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '제가 직접', role: 'subject' },
          { text: '만든', role: 'plain' },
          { text: '음식이에요', role: 'verb' },
        ],
        zh: '是我亲手做的食物。（만들다+ㄴ→만든）', zhEn: 'It\'s food I made myself. (만들다+ㄴ→만든)',
        swapWords: ['만든 음식이에요', '만드는 음식이에요', '만들 음식이에요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울에', role: 'place' },
          { text: '사는', role: 'plain' },
          { text: '친구가 있어요', role: 'verb' },
        ],
        zh: '有住在首尔的朋友。（살다+는→사는，ㄹ脱落）', zhEn: 'I have a friend living in Seoul. (살다+는→사는, ㄹ dropped)',
        swapWords: ['사는 친구가 있어요', '살고 있는 친구가 있어요', '살던 친구가 있어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '만든', role: 'plain' },
          { text: '가수예요', role: 'verb' },
        ],
        zh: '是创作了这首歌的歌手。（만들다+ㄴ→만든）', zhEn: 'He\'s the singer who wrote this song. (만들다+ㄴ→만든)',
        swapWords: ['만든 가수예요', '만드는 가수예요', '만들었던 가수예요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 歌词', contextEn: 'KPOP lyrics', ko: '이 노래 아세요? 제가 제일 좋아하는 곡이에요.', zh: '你知道这首歌吗？是我最喜欢的曲子。', zhEn: 'Do you know this song? It\'s my favorite.' },
      { icon: '🏠', context: '居住地', contextEn: 'Place of residence', ko: '지금 어디 사세요? 저는 서울에 살아요.', zh: '您现在住哪里？我住在首尔。', zhEn: 'Where do you live now? I live in Seoul.' },
      { icon: '🍰', context: '手工制作', contextEn: 'Handmade', ko: '이 케이크는 제가 직접 만든 거예요.', zh: '这个蛋糕是我亲手做的。', zhEn: 'I made this cake myself.' },
      { icon: '🎤', context: '歌手介绍', contextEn: 'Singer introduction', ko: '노래를 잘 부르는 가수를 좋아해요.', zh: '我喜欢唱歌好听的歌手。', zhEn: 'I like singers who sing well.' },
      { icon: '📚', context: '语法说明', contextEn: 'Grammar explanation', ko: '알다는 아세요로 바뀌어요. ㄹ이 탈락해요.', zh: '알다→아세요，ㄹ脱落了。', zhEn: '알다→아세요, the ㄹ was dropped.' },
      { icon: '💬', context: '日常对话', contextEn: 'Everyday conversation', ko: 'A: 한국어 잘 아세요? B: 조금 알아요.', zh: 'A：你韩语说得好吗？B：会一点。', zhEn: 'A: Do you speak Korean well? B: A little.' },
    ],
    mistakes: [
      { wrong: '알으세요?（ㄹ 词干 + 으세요）', wrongEn: 'Do you know? (ㄹ stem + 으세요)', correct: '아세요?', note: 'ㄹ词干 + -(으)세요 时，ㄹ 脱落，으 也不需要：알다→아세요（不是 알으세요）。', noteEn: 'When ㄹ stem combines with -(으)세요, the ㄹ drops and 으 is not needed: 알다→아세요 (not 알으세요).' },
      { wrong: '만들ㅂ니다（无 ㄹ 脱落直接加 ㅂ니다）', wrongEn: '만들ㅂ니다 (adds ㅂ니다 directly without dropping ㄹ)', correct: '만듭니다', note: 'ㄹ词干 + -ㅂ니다 时，ㄹ 脱落：만들다→만듭니다（不是 만들ㅂ니다）。', noteEn: 'When ㄹ stem combines with -ㅂ니다, the ㄹ drops: 만들다→만듭니다 (not 만들ㅂ니다).' },
      { wrong: '살는 사람（ㄹ词干 + -는 冠词形直接结合）', wrongEn: '살는 사람 (ㄹ stem + -는 adnominal form directly combined)', correct: '사는 사람', note: '살다 + -는（现在冠词形）→ ㄹ 脱落：사는（不是 살는）。ㄹ词干在 -는 前 ㄹ 脱落。', noteEn: '살다 + -는 (present adnominal) → ㄹ drops: 사는 (not 살는). The ㄹ in ㄹ stems drops before -는.' },
      { wrong: '아ㄹ 거예요（将来冠词形脱落）', wrongEn: '아ㄹ 거예요 (future adnominal drops)', correct: '알 거예요', note: '将来冠词形 -(으)ㄹ 前 ㄹ 不脱落：알 거예요（不是 아 거예요）。', noteEn: 'Before the future adnominal -(으)ㄹ, the ㄹ does not drop: 알 거예요 (not 아 거예요).' },
      { wrong: '서울에 살으면（保留 ㄹ 时又硬加 으）', wrongEn: '서울에 살으면 (adding 으 when ㄹ is retained)', correct: '서울에 살면', note: 'ㄹ 保留的场合（면/-ㄹ 거예요 等）也不加 으：살면（不是 살으면）、만들면（不是 만들으면）。ㄹ词干一律当没收音接词尾。', noteEn: 'When ㄹ is retained (with 면/-ㄹ 거예요, etc.), 으 is not added: 살면 (not 살으면), 만들면 (not 만들으면). ㄹ stems are always treated as having no final consonant when attaching endings.' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第6课</div><div class="ov-hero-title">"ㄹ" 的不规则音变</div><div class="ov-hero-sub">ㄹ词干在特定词尾前的脱落规则</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">核心规则</div></div><div class="ov-block"><div class="badge">ㄹ脱落</div><div class="ko">ㄹ词干 + ㄴ/ㅂ/시/오 → ㄹ脱落</div><div class="zh">알다→아세요 / 만들다→만듭니다</div></div><div class="ov-block"><div class="badge">保留</div><div class="ko">ㄹ词干 + 아/어/고/지/면… → ㄹ保留</div><div class="zh">알다→알아요 / 만들다→만들고</div></div></div></div>`,
    step0Html: `
<div class="card-title">ㄹ词干动词/形容词在特定词尾前ㄹ脱落的规则</div>
<div class="card-body">以 ㄹ 收音结尾的动词/形容词（ㄹ词干）在某些词尾前 ㄹ 会脱落。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 잘 아세요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">你韩语说得好吗？（알다 + -(으)세요 → 아세요）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">여기서 삽니다</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">住在这里。（살다 + -ㅂ니다 → 삽니다）</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">记忆法（나비시오）：以 ㄴ 开头的词尾、以 ㅂ 开头的词尾、以 시 开头的词尾、以 오 开头的词尾前 ㄹ 脱落。
알다（知道）：알아요（知道）/ 아세요（知道吗/请知道）/ 압니다（知道）/ 아는（知道的）
살다（居住）：살아요（居住）/ 사세요（请住）/ 삽니다（居住）/ 사는（居住的）
만들다（制作）：만들어요（制作）/ 만드세요（请制作）/ 만듭니다（制作）/ 만드는（制作的）</div>
`,
    compareLabel: 'ㄹ脱落 vs ㄹ保留', compareLabelEn: 'ㄹ dropping vs. ㄹ retention',
    compareHtml: `
<div class="card-title">ㄹ脱落 vs ㄹ保留</div>
<div class="card-body">ㄹ词干看后面词尾决定 ㄹ 走留：以 <b>ㄴ/ㅂ/시/오（나비시오）</b> 开头就脱落，其余保留。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">ㄹ 脱落</div>
    <div class="cmp-row"><span class="badge">条件</span><span class="zh">词尾以 ㄴ/ㅂ/시/오 开头（나비시오）</span></div>
    <div class="cmp-row"><span class="ko">알다 → 아세요 (시) · 압니다 (ㅂ) · 아는 (ㄴ)</span></div>
    <div class="cmp-row"><span class="ko">만들다 → 만든 (ㄴ 冠词形)</span></div>
    <div class="cmp-row"><span class="zh">直接手做的（蛋糕）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">ㄹ 保留</div>
    <div class="cmp-row"><span class="badge">条件</span><span class="zh">词尾以 아/어·고·지·면·도·ㄹ 等开头</span></div>
    <div class="cmp-row"><span class="ko">알다 → 알아요 · 알고 · 알면 · 알 거예요</span></div>
    <div class="cmp-row"><span class="ko">만들다 → 만들어요 · 만들고</span></div>
    <div class="cmp-row"><span class="zh">将来冠词形 -(으)ㄹ 也保留（알 거예요）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：口诀 <b>나비시오（ㄴ·ㅂ·시·오）</b> 开头的词尾让 ㄹ 消失，其余（尤其 아/어요、고、将来 -ㄹ）ㄹ 都留着。</div>
`,
    quickTable: {
      title: 'ㄹ 不规则变化整理（以 알다 为例）', titleEn: 'ㄹ Irregular Conjugation Summary (using 알다)',
      headers: ['词尾', 'ㄹ 处理', '结果形', '意思'],
      rows: [
        [{ ko: '-(으)세요', zh: '' }, { ko: 'ㄹ 脱落', zh: '' }, { ko: '아세요', zh: '' }, { ko: '请知道/您知道吗', zh: '' }],
        [{ ko: '-ㅂ니다', zh: '' }, { ko: 'ㄹ 脱落', zh: '' }, { ko: '압니다', zh: '' }, { ko: '知道（正式）', zh: '' }],
        [{ ko: '-(으)ㄴ（过去冠词形）', zh: '' }, { ko: 'ㄹ 脱落', zh: '' }, { ko: '안（알+ㄴ，非否定词）', zh: '' }, { ko: '知道的（过去）', zh: '' }],
        [{ ko: '-아/어요', zh: '' }, { ko: 'ㄹ 保留', zh: '' }, { ko: '알아요', zh: '' }, { ko: '知道', zh: '' }],
        [{ ko: '-고/-면/-도', zh: '' }, { ko: 'ㄹ 保留', zh: '' }, { ko: '알고/알면/알아도', zh: '' }, { ko: '知道并/如果知道/就算知道', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '"ㄹ" 的不规则音变', titleEn: 'Irregular Conjugation of "ㄹ"',
      body: '测试ㄹ词干的变化规则', bodyEn: 'Test the rules for ㄹ stem changes',
      questions: [
        {
          prompt: '알다 + -(으)세요 = ?',
          options: ['알아세요', '아세요', '알세요', '알으세요'],
          answer: 1 as 0|1|2|3,
          explanation: 'ㄹ词干 + 시 开头词尾 → ㄹ 脱落：알다→아세요', explanationEn: 'ㄹ stem + ending starting with 시 → ㄹ drops: 알다→아세요',
        },
        {
          prompt: '살다 + -ㅂ니다 = ?',
          options: ['살ㅂ니다', '사ㅂ니다', '살습니다', '삽니다'],
          answer: 3 as 0|1|2|3,
          explanation: 'ㄹ词干 + ㅂ 开头词尾 → ㄹ 脱落：살다→삽니다', explanationEn: 'ㄹ stem + ending starting with ㅂ → ㄹ drops: 살다→삽니다',
        },
        {
          prompt: '만들다 + -는 = ?（现在 冠词形）', promptEn: '만들다 + -는 = ? (present adnominal)',
          options: ['만든', '만들은', '만드는', '만들는'],
          answer: 2 as 0|1|2|3,
          explanation: 'ㄹ词干 + -는（现在冠词形） → ㄹ 脱落：만들다→만드는', explanationEn: 'ㄹ stem + -는 (present adnominal) → ㄹ drops: 만들다→만드는',
        },
        {
          prompt: 'ㄹ 不脱落的情况是？', promptEn: 'When does ㄹ not drop?',
          options: ['알 거예요（将来冠词形）', '아세요（세요）', '압니다（ㅂ니다）', '아는（现在冠词形）'],
          answer: 0 as 0|1|2|3,
          explanation: '将来冠词形 -(으)ㄹ 前 ㄹ 不脱落：알 거예요（O）', explanationEn: 'Future adnominal form -(으)ㄹ: ㄹ does not drop before it: 알 거예요 (O)',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l07',
    partNumber: 12,
    lessonNumber: 7,
    title: '"ㅎ" 的不规则音变', titleEn: 'Irregular Conjugation of "ㅎ"',
    whatItDoes: 'ㅎ词干形容词在元音词尾前 ㅎ 脱落并发生元音缩约', whatItDoesEn: 'ㅎ-stem adjectives drop ㅎ before vowel endings and undergo vowel contraction',
    whatItDoesBody: '以 ㅎ 收音结尾的形容词（ㅎ词干）在以元音开头的词尾前 ㅎ 脱落，并发生元音缩约。\n典型的 ㅎ 不规则形容词：빨갛다（红），파랗다（蓝），노랗다（黄），하얗다（白），까맣다（黑），어떻다（怎样），이렇다（这样），그렇다（那样），저렇다（那样/那边）。\n在以辅音开头的词尾（-고，-지，-면）前 ㅎ 保留。', whatItDoesBodyEn: 'Adjectives ending in ㅎ (ㅎ-stems) drop ㅎ before vowel-initial endings and undergo vowel contraction.\\nTypical ㅎ-irregular adjectives: 빨갛다 (red), 파랗다 (blue), 노랗다 (yellow), 하얗다 (white), 까맣다 (black), 어떻다 (how), 이렇다 (like this), 그렇다 (like that), 저렇다 (like that/over there).\\nBefore consonant-initial endings (-고, -지, -면), ㅎ is retained.',
    structureNote: 'ㅎ脱落：ㅎ词干 + -아/어요 → ㅎ脱落后与前元音缩约（ㅏ/ㅓ→ㅐ）\n冠词形：ㅎ词干 + -(으)ㄴ → ㅎ脱落（빨간，파란，어떤，그런，이런）\nㅎ保留：ㅎ词干 + -고/-지/-면/-다 → 不变（빨갛고，어떻지，그렇다면）', structureNoteEn: 'ㅎ drop: ㅎ-stem + -아/어요 → ㅎ drops and contracts with the preceding vowel (ㅏ/ㅓ→ㅐ)\\nAdnominal form: ㅎ-stem + -(으)ㄴ → ㅎ drops (빨간, 파란, 어떤, 그런, 이런)\\nㅎ retained: ㅎ-stem + -고/-지/-면/-다 → unchanged (빨갛고, 어떻지, 그렇다면)',
    rulesNote: '元音缩约规则：ㅎ脱落后 前元音 ㅏ/ㅓ + 词尾 아/어 → 缩约为 ㅐ。\n빨갛다（ㅏ）+ 아요 → 빨가+아요 → 빨개요\n파랗다（ㅏ）+ 아요 → 파라+아요 → 파래요\n어떻다（ㅓ）+ 어요 → 어떠+어요 → 어때요\n그렇다（ㅓ）+ 어요 → 그러+어요 → 그래요\n하얗다 例外：하얗다 + 아요 → 하얘요（ㅑ+아→ㅒ 缩约）', rulesNoteEn: 'Vowel contraction rule: after ㅎ drops, preceding vowel ㅏ/ㅓ + ending 아/어 → contracts to ㅐ.\\n빨갛다 (ㅏ) + 아요 → 빨가+아요 → 빨개요\\n파랗다 (ㅏ) + 아요 → 파라+아요 → 파래요\\n어떻다 (ㅓ) + 어요 → 어떠+어요 → 어때요\\n그렇다 (ㅓ) + 어요 → 그러+어요 → 그래요\\n하얗다 exception: 하얗다 + 아요 → 하얘요 (ㅑ+아→ㅒ contraction)',
    structures: [
      {
        ko: '하늘이 파래요',
        zh: '天空是蓝色的。（파랗다→파래요）', zhEn: 'The sky is blue. (파랗다→파래요)',
        tokens: [
          { text: '하늘이', role: 'subject' },
          { text: '파래요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨 어때요?',
        zh: '今天天气怎么样？（어떻다→어때요）', zhEn: 'How\'s the weather today? (어떻다→어때요)',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨', role: 'subject' },
          { text: '어때요?', role: 'verb' },
        ],
      },
      {
        ko: '빨간 장미를 샀어요',
        zh: '买了红色的玫瑰。（빨갛다+ㄴ→빨간）', zhEn: 'I bought red roses. (빨갛다+ㄴ→빨간)',
        tokens: [
          { text: '빨간', role: 'plain' },
          { text: '장미를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '그런 말은 하지 마세요',
        zh: '那种话不要说。（그렇다+ㄴ→그런）', zhEn: 'Don\'t say that kind of thing. (그렇다+ㄴ→그런)',
        tokens: [
          { text: '그런 말은', role: 'subject' },
          { text: '하지 마세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅎ脱落：ㅎ词干 + 元音词尾（아/어，은）→ ㅎ脱落 + 元音缩约', textEn: 'ㅎ-drop: ㅎ stems + vowel endings (아/어, 은) → ㅎ drops + vowel contraction', examples: '빨갛다→빨개요 / 파랗다→파래요 / 어떻다→어때요 / 그렇다→그래요' },
      { type: 'rule', text: '冠词形：ㅎ词干 + -(으)ㄴ → ㅎ脱落（颜色形容词冠词形）', textEn: 'Adnominal form: ㅎ stems + -(으)ㄴ → ㅎ drops (color adjective adnominal form)', examples: '빨갛다→빨간 / 파랗다→파란 / 노랗다→노란 / 하얗다→하얀 / 까맣다→까만' },
      { type: 'rule', text: 'ㅎ保留：ㅎ词干 + 辅音词尾（고/지/면/다/네）→ ㅎ 保持', textEn: 'ㅎ retained: ㅎ stems + consonant endings (고/지/면/다/네) → ㅎ stays', examples: '빨갛고（并且红）/ 어떻지（怎么样嘛）/ 그렇다면（如果那样）', examplesEn: '빨갛고 (and red) / 어떻지 (how is it) / 그렇다면 (if so)' },
      { type: 'usage', text: '颜色形容词冠词形整理（ㅎ脱落+ㄴ）', textEn: 'Summary of color adjective adnominal forms (ㅎ-drop + ㄴ)', examples: '빨간 가방 / 파란 하늘 / 노란 꽃 / 하얀 눈 / 까만 밤' },
      { type: 'usage', text: '이렇다/그렇다/저렇다/어떻다 作为指示·疑问形容词使用频率很高', textEn: '이렇다/그렇다/저렇다/어떻다 are frequently used as demonstrative/interrogative adjectives', examples: '이런 사람（这样的人）/ 그런 일（那样的事）/ 어떤 것（什么样的东西）/ 이래요/그래요/어때요', examplesEn: '이런 사람 (a person like this) / 그런 일 (that kind of thing) / 어떤 것 (what kind of thing) / 이래요/그래요/어때요' },
      { type: 'note', text: '하얗다 的元音缩约：하얗+아요 → 하얘요（ㅑ+ㅏ→ㅒ），规律相同但结果不同', textEn: 'Vowel contraction in 하얗다: 하얗+아요 → 하얘요 (ㅑ+ㅏ→ㅒ), same rule but different result', examples: '하얀 눈（白雪）/ 하얘요（是白色的）/ 하얗고（白色并且）', examplesEn: '하얀 눈 (white snow) / 하얘요 (is white) / 하얗고 (white and)' },
      { type: 'compare', text: 'ㅎ不规则 vs ㄹ不规则：ㅎ 在元音词尾前脱落，ㄹ 在 ㄴ/ㅂ/시/오 前脱落', textEn: 'ㅎ-irregular vs ㄹ-irregular: ㅎ drops before vowel endings, ㄹ drops before ㄴ/ㅂ/시/오', examples: 'ㅎ：빨갛다→빨개요（元音前脱落）/ ㄹ：알다→아세요（시前脱落）', examplesEn: 'ㅎ: 빨갛다→빨개요 (drops before vowels) / ㄹ: 알다→아세요 (drops before 시)' },
      { type: 'note', text: '重要边界：不是所有 ㅎ 收尾都不规则。ㅎ 不规则只发生在"形容词"上，动词（넣다放入/놓다放/낳다生/쌓다堆）一律规则变化，ㅎ 不脱落', textEn: 'Important boundary: not all ㅎ-final words are irregular. ㅎ-irregularity only occurs with adjectives; verbs (넣다 put in/놓다 put/낳다 give birth/쌓다 pile) are always regular, ㅎ doesn\'t drop', examples: '넣다→넣어요（不是 내요）/ 놓다→놓아요 / 낳다→낳아요', examplesEn: '넣다→넣어요 (not 내요) / 놓다→놓아요 / 낳다→낳아요' },
      { type: 'note', text: '最大例外：좋다（好）虽是 ㅎ 收尾的形容词，却是规则变化，ㅎ 不脱落。别把它当颜色形容词那样变', textEn: 'Biggest exception: 좋다 (good), though a ㅎ-final adjective, is regular; ㅎ doesn\'t drop. Don\'t conjugate it like a color adjective', examples: '좋다→좋아요（不是 좋애요/좨요）/ 좋은 사람（不是 좐 사람）', examplesEn: '좋다→좋아요 (not 좋애요/좨요) / 좋은 사람 (not 좐 사람)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저 꽃', role: 'subject' },
          { text: '노래요', role: 'verb' },
        ],
        zh: '那朵花是黄色的。（노랗다→노래요，与名词 노래（歌）同音但无关）', zhEn: 'That flower is yellow. (노랗다→노래요, homophone with the noun 노래 (song) but unrelated)',
        swapWords: ['노래요', '노랗고 예뻐요', '노란 꽃이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이런 경우에는', role: 'plain' },
          { text: '어떻게 해요?', role: 'verb' },
        ],
        zh: '这种情况怎么办？（이렇다+ㄴ→이런）', zhEn: 'What should I do in this case? (이렇다+ㄴ→이런)',
        swapWords: ['이런 경우에는 어떻게 해요?', '그런 경우에는 어떻게 해요?', '어떤 경우에도 괜찮아요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '머리가', role: 'subject' },
          { text: '까매요', role: 'verb' },
        ],
        zh: '头发是黑色的。（까맣다→까매요）', zhEn: 'The hair is black. (까맣다→까매요)',
        swapWords: ['까매요', '까맣고 길어요', '까만 머리예요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 꽃은', role: 'subject' },
          { text: '노랗고', role: 'plain' },
          { text: '예뻐요', role: 'verb' },
        ],
        zh: '这朵花是黄色的，很漂亮。（노랗고，ㅎ保留）', zhEn: 'This flower is yellow and pretty. (노랗고, ㅎ retained)',
        swapWords: ['노랗고 예뻐요', '빨갛고 예뻐요', '하얗고 예뻐요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🌈', context: '颜色描述', contextEn: 'Color descriptions', ko: '가을 하늘이 파랗고 높아요.', zh: '秋天的天空蓝而高。（파랗고，ㅎ保留）', zhEn: 'The autumn sky is blue and high. (파랗고, ㅎ retained)' },
      { icon: '🎵', context: 'KPOP 专辑', contextEn: 'KPOP album', ko: '이번 앨범 어때요? 정말 좋아요!', zh: '这次专辑怎么样？真的很好！', zhEn: 'How\'s this album? It\'s really good!' },
      { icon: '🌸', context: '花卉描述', contextEn: 'Flower description', ko: '노란 꽃이 활짝 피었어요.', zh: '黄色的花盛开了。（노랗다+ㄴ→노란）', zhEn: 'Yellow flowers are in full bloom. (노랗다+ㄴ→노란)' },
      { icon: '❄️', context: '冬天描述', contextEn: 'Winter description', ko: '눈이 와서 온 세상이 하얘요.', zh: '下雪了，整个世界都是白色的。（하얗다→하얘요）', zhEn: 'It\'s snowing, and the whole world is white. (하얗다→하얘요)' },
      { icon: '💬', context: '日常询问', contextEn: 'Daily inquiry', ko: 'A: 오늘 기분 어때요? B: 그냥 그래요.', zh: 'A：今天心情怎么样？B：就那样。（그렇다→그래요）', zhEn: 'A: How are you feeling today? B: Just so-so. (그렇다→그래요)' },
      { icon: '🌙', context: '夜晚描述', contextEn: 'Night description', ko: '밤하늘이 까맣고 별이 많아요.', zh: '夜空黑黑的，星星很多。（까맣고，ㅎ保留）', zhEn: 'The night sky is pitch black, with many stars. (까맣고, ㅎ retained)' },
    ],
    mistakes: [
      { wrong: '파랗아요（ㅎ 未脱落直接加 아요）', wrongEn: '파랗아요 (ㅎ not dropped, directly adding 아요)', correct: '파래요', note: 'ㅎ词干 + 아/어요 时，ㅎ 脱落后元音缩约：파랗+아요→파라+아요→파래요。', noteEn: 'When ㅎ-stem + 아/어요, ㅎ drops and vowels contract: 파랗+아요→파라+아요→파래요.' },
      { wrong: '빨강은 가방（冠词形错误）', wrongEn: '빨강은 가방 (adnominal form error)', correct: '빨간 가방', note: 'ㅎ词干冠词形：빨갛다+ㄴ→빨간。빨강 是名词（红色），不是冠词形。', noteEn: 'ㅎ-stem adnominal form: 빨갛다+ㄴ→빨간. 빨강 is a noun (red), not an adnominal form.' },
      { wrong: '어떻아요?（ㅎ 未脱落）', wrongEn: '어떻아요? (ㅎ not dropped)', correct: '어때요?', note: '어떻다+어요→어떠+어요→어때요。ㅎ脱落后 ㅓ+어→ㅐ 缩约。', noteEn: '어떻다+어요→어떠+어요→어때요. After ㅎ drops, ㅓ+어 contracts to ㅐ.' },
      { wrong: '그렇은 사람（冠词形错误）', wrongEn: '그렇은 사람 (adnominal form error)', correct: '그런 사람', note: 'ㅎ词干 + -(으)ㄴ 冠词形：그렇다+ㄴ→그런（ㅎ脱落，无收音故直接接 ㄴ 而非 은）。', noteEn: 'ㅎ-stem + -(으)ㄴ adnominal form: 그렇다+ㄴ→그런 (ㅎ drops, no final consonant so ㄴ is added directly, not 은).' },
      { wrong: '기분이 좨요（把 좋다 当不规则脱落缩约）', wrongEn: '기분이 좨요 (treating 좋다 as irregular dropping/contracting)', correct: '기분이 좋아요', note: '좋다 是规则形容词，ㅎ 不脱落：좋아요、좋은。别套颜色形容词的 ㅎ 不规则。', noteEn: '좋다 is a regular adjective, ㅎ doesn\'t drop: 좋아요, 좋은. Don\'t apply the ㅎ irregularity of color adjectives.' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第7课</div><div class="ov-hero-title">"ㅎ" 的不规则音变</div><div class="ov-hero-sub">ㅎ词干形容词在元音词尾前的变化规则</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">核心规则</div></div><div class="ov-block"><div class="badge">ㅎ脱落+缩约</div><div class="ko">ㅎ词干 + 아/어요 → ㅎ脱落 + 元音缩约</div><div class="zh">빨갛다→빨개요 / 어떻다→어때요</div></div><div class="ov-block"><div class="badge">ㅎ保留</div><div class="ko">ㅎ词干 + 고/지/면/다 → ㅎ保留</div><div class="zh">빨갛고 / 어떻지 / 그렇다면</div></div></div></div>`,
    step0Html: `
<div class="card-title">ㅎ词干形容词在元音词尾前 ㅎ 脱落并发生元音缩约</div>
<div class="card-body">以 ㅎ 收音结尾的形容词（ㅎ词干）在以元音开头的词尾前 ㅎ 脱落，并发生元音缩约。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">하늘이 파래요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">天空是蓝色的。（파랗다→파래요）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">오늘 날씨 어때요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">今天天气怎么样？（어떻다→어때요）</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">元音缩约规则：ㅎ脱落后 前元音 ㅏ/ㅓ + 词尾 아/어 → 缩约为 ㅐ。
빨갛다（ㅏ）+ 아요 → 빨가+아요 → 빨개요
파랗다（ㅏ）+ 아요 → 파라+아요 → 파래요
어떻다（ㅓ）+ 어요 → 어떠+어요 → 어때요
그렇다（ㅓ）+ 어요 → 그러+어요 → 그래요
하얗다 例外：하얗다 + 아요 → 하얘요（ㅑ+아→ㅒ 缩约）</div>
`,
    compareLabel: 'ㅎ脱落 vs ㅎ保留', compareLabelEn: 'ㅎ dropping vs ㅎ retention',
    compareHtml: `
<div class="card-title">ㅎ脱落 vs ㅎ保留</div>
<div class="card-body">ㅎ词干形容词看后面词尾：以<b>元音（아/어、은）</b>开头就 ㅎ 脱落并缩约，以<b>辅音（고/지/면）</b>开头则 ㅎ 保留。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">ㅎ 脱落 + 缩约</div>
    <div class="cmp-row"><span class="badge">条件</span><span class="zh">元音词尾（아/어요、-(으)ㄴ 冠词形）</span></div>
    <div class="cmp-row"><span class="ko">파랗다 → 파래요 · 어떻다 → 어때요</span></div>
    <div class="cmp-row"><span class="ko">빨갛다 → 빨간 (冠词形)</span></div>
    <div class="cmp-row"><span class="zh">ㅏ/ㅓ + 아/어 缩约成 ㅐ</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">ㅎ 保留</div>
    <div class="cmp-row"><span class="badge">条件</span><span class="zh">辅音词尾（고/지/면/다/네）</span></div>
    <div class="cmp-row"><span class="ko">빨갛고 · 어떻지 · 그렇다면</span></div>
    <div class="cmp-row"><span class="ko">파랗고 예뻐요</span></div>
    <div class="cmp-row"><span class="zh">蓝蓝的又漂亮（ㅎ 不动）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：碰到 <b>元音</b>（아/어요、冠词形 ㄴ）ㅎ 消失并把前元音缩成 ㅐ（빨개요/빨간）；碰到 <b>辅音</b>（고/지/면）ㅎ 原样保留（빨갛고）。</div>
`,
    quickTable: {
      title: 'ㅎ 不规则变化整理', titleEn: 'ㅎ Irregular Conjugation Summary',
      headers: ['原形', '-아/어요', '-(으)ㄴ（冠词形）', '-고（保留）'],
      rows: [
        [{ ko: '빨갛다', zh: '红', zhEn: 'red' }, { ko: '빨개요', zh: '' }, { ko: '빨간', zh: '' }, { ko: '빨갛고', zh: '' }],
        [{ ko: '파랗다', zh: '蓝', zhEn: 'blue' }, { ko: '파래요', zh: '' }, { ko: '파란', zh: '' }, { ko: '파랗고', zh: '' }],
        [{ ko: '어떻다', zh: '怎样', zhEn: 'how' }, { ko: '어때요', zh: '' }, { ko: '어떤', zh: '' }, { ko: '어떻고', zh: '' }],
        [{ ko: '그렇다', zh: '那样', zhEn: 'like that' }, { ko: '그래요', zh: '' }, { ko: '그런', zh: '' }, { ko: '그렇고', zh: '' }],
        [{ ko: '하얗다', zh: '白', zhEn: 'white' }, { ko: '하얘요', zh: '' }, { ko: '하얀', zh: '' }, { ko: '하얗고', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '"ㅎ" 的不规则音变', titleEn: 'Irregular Conjugation of "ㅎ"',
      body: '测试ㅎ词干形容词的变化规则', bodyEn: 'Test: ㅎ-stem adjective conjugation rules',
      questions: [
        {
          prompt: '파랗다 + -아요 = ?',
          options: ['파랗아요', '파라요', '파랬어요', '파래요'],
          answer: 3 as 0|1|2|3,
          explanation: 'ㅎ脱落后 ㅏ+아→ㅐ 缩约：파랗+아요→파래요', explanationEn: 'After ㅎ drops, ㅏ+아 contracts to ㅐ: 파랗+아요→파래요',
        },
        {
          prompt: '빨갛다 的冠词形（ㄴ）是？', promptEn: 'What is the adnominal form (ㄴ) of 빨갛다?',
          options: ['빨강', '빨간', '빨개', '빨갛은'],
          answer: 1 as 0|1|2|3,
          explanation: 'ㅎ脱落冠词形：빨갛다+ㄴ→빨간', explanationEn: 'ㅎ-dropping adnominal form: 빨갛다+ㄴ→빨간',
        },
        {
          prompt: '어떻다 + -고 = ?（ㅎ 保留）', promptEn: '어떻다 + -고 = ? (ㅎ retained)',
          options: ['어떻고', '어때고', '어떠고', '어떻어고'],
          answer: 0 as 0|1|2|3,
          explanation: '辅音词尾前 ㅎ 保留：어떻다+고→어떻고', explanationEn: 'ㅎ is retained before consonant endings: 어떻다+고→어떻고',
        },
        {
          prompt: '그렇다 + -아/어요 = ?',
          options: ['그렇아요', '그러요', '그래요', '그렇어요'],
          answer: 2 as 0|1|2|3,
          explanation: 'ㅎ脱落后 ㅓ+어→ㅐ 缩约：그렇+어요→그러+어요→그래요', explanationEn: 'After ㅎ drops, ㅓ+어 contracts to ㅐ: 그렇+어요→그러+어요→그래요',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l08',
    partNumber: 12,
    lessonNumber: 8,
    title: '综合练习⑫', titleEn: 'Comprehensive Practice ⑫',
    isPractice: true,
    whatItDoes: 'P12 全课语法综合复习', whatItDoesEn: 'P12 Full Lesson Grammar Review',
    whatItDoesBody: '复习 P12 所有语法点：-을/ㄹ 테니까，-(이)든지，-(으)려고 하다/가다/오다，-(으)려고 했다，-지 그랬어요?，겸，-은/ㄴ 김에，(어)치，짜리，에，ㄹ 不规则，ㅎ 不规则。', whatItDoesBodyEn: 'Review all P12 grammar points: -을/ㄹ 테니까, -(이)든지, -(으)려고 하다/가다/오다, -(으)려고 했다, -지 그랬어요?, 겸, -은/ㄴ 김에, (어)치, 짜리, 에, ㄹ irregular, ㅎ irregular.',
    structureNote: '',
    rulesNote: '',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 综合练习</div><div class="ov-hero-title">综合练习⑫</div><div class="ov-hero-sub">P12 全课复习</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本册复习要点</div></div><div class="ov-block"><div class="badge">意图表达</div><div class="ko">-을/ㄹ 테니까 / -(으)려고 했다 / -지 그랬어요?</div></div><div class="ov-block"><div class="badge">量词价格</div><div class="ko">(어)치 / 짜리 / 에</div></div><div class="ov-block"><div class="badge">不规则变化</div><div class="ko">ㄹ 不规则 / ㅎ 不规则</div></div></div></div>`,
    step0Html: '',
    compareLabel: '',
    compareHtml: '',
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑫', titleEn: 'Comprehensive Practice ⑫',
      body: 'P12 语法综合测试', bodyEn: 'P12 Grammar Comprehensive Test',
      questions: [
        {
          prompt: '我来付钱，你不用担心。→ 제가 낼 ___ 걱정하지 마세요', promptEn: 'I\'ll pay, don\'t worry. → 제가 낼 ___ 걱정하지 마세요',
          options: ['는데', '려고', '테니까', '면서'],
          answer: 2 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까：说话人的意图作前提，后接命令/请求（我会付钱，所以别担心）。는데、려고、면서 都不能接在冠形词 낼 后表达这个意思。', explanationEn: '-을/ㄹ 테니까: the speaker\'s intention as a premise, followed by a command/request (I\'ll pay, so don\'t worry). 는데, 려고, 면서 can\'t follow the adnominal 낼 to express this.',
        },
        {
          prompt: '本来打算早起，但没听到闹钟。→ 일찍 일어나___ 했는데 알람을 못 들었어요', promptEn: 'I planned to wake up early, but didn\'t hear the alarm. → 일찍 일어나___ 했는데 알람을 못 들었어요',
          options: ['기로', '으려고', '고자', '려고'],
          answer: 3 as 0|1|2|3,
          explanation: '일어나다 无收音 → 일어나려고 했는데', explanationEn: '일어나다 has no final consonant → 일어나려고 했는데',
        },
        {
          prompt: '你为什么不坐地铁呢？→ 지하철을 타___ 그랬어요?', promptEn: 'Why didn\'t you take the subway? → 지하철을 타___ 그랬어요?',
          options: ['지', '면', '려고', '서'],
          answer: 0 as 0|1|2|3,
          explanation: '-지 그랬어요? 前接动词词干：타지 그랬어요?', explanationEn: '-지 그랬어요? attaches to verb stems: 타지 그랬어요?',
        },
        {
          prompt: '趁着来首尔，顺便去了博物馆。→ 서울에 ___ 김에 박물관도 갔어요', promptEn: 'While in Seoul, I went to the museum too. → 서울에 ___ 김에 박물관도 갔어요',
          options: ['와서', '올', '오는', '온'],
          answer: 3 as 0|1|2|3,
          explanation: '오다 无收音过去冠词形：오+ㄴ=온 → 서울에 온 김에', explanationEn: '오다 no final consonant, past adnominal: 오+ㄴ=온 → 서울에 온 김에',
        },
        {
          prompt: '买了一万韩元的零食。→ 만 원___ 과자를 샀어요', promptEn: 'I bought snacks worth 10,000 won. → 만 원___ 과자를 샀어요',
          options: ['어치', '치', '짜리', '에'],
          answer: 0 as 0|1|2|3,
          explanation: '该金额的分量 → (어)치：만 원어치', explanationEn: 'the amount\'s worth → (어)치: 만 원어치',
        },
        {
          prompt: '살다 + -(으)세요 = ?（ㄹ 不规则）', promptEn: '살다 + -(으)세요 = ? (ㄹ irregular)',
          options: ['사세요', '살아세요', '살세요', '살으세요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㄹ词干 + 시 开头词尾 → ㄹ 脱落：살다→사세요', explanationEn: 'ㄹ-stem + ending starting with 시 → ㄹ drops: 살다→사세요',
        },
        {
          prompt: '파랗다 + -아요 = ?（ㅎ 不规则）', promptEn: '파랗다 + -아요 = ? (ㅎ irregular)',
          options: ['파랗아요', '파래요', '파랬어요', '파라요'],
          answer: 1 as 0|1|2|3,
          explanation: 'ㅎ脱落后 ㅏ+아→ㅐ 缩约：파랗+아요→파래요', explanationEn: 'After ㅎ drops, ㅏ+아 contracts to ㅐ: 파랗+아요→파래요',
        },
        {
          prompt: '어떻다 的冠词形（ㄴ）是？', promptEn: 'What is the adnominal form (ㄴ) of 어떻다?',
          options: ['어떤', '어떻는', '어때', '어떻은'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ脱落冠词形：어떻다+ㄴ→어떤', explanationEn: 'ㅎ-dropping adnominal form: 어떻다+ㄴ→어떤',
        },
      ],
    },
    linkedGrammarIds: ['card-p12-l01', 'card-p12-l02', 'card-p12-l03', 'card-p12-l04', 'card-p12-l05', 'card-p12-l06', 'card-p12-l07'],
  },
];
