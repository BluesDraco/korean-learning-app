import type { GrammarCard } from '@/types';

export const grammarCardsP12: GrammarCard[] = [
  {
    id: 'card-p12-l01',
    partNumber: 12,
    lessonNumber: 1,
    title: '-을/ㄹ 테니까, -(이)든지',
    whatItDoes: '表示"我会……所以你……"和"不管……都……"',
    whatItDoesBody: '-을/ㄹ 테니까 表示说话人自己的意图或推测作为前提，让对方据此采取行动，相当于"我会……，所以你……"。\n-(이)든지 表示"不管是哪个都行"，与 -거나 类似但更强调任何情况都可以，后常接 괜찮다/좋다/상관없다。',
    structureNote: '-을/ㄹ 테니까：동사 词干 + -을/ㄹ 테니까（有收音+을，无收音/ㄹ+ㄹ）\n-(이)든지：명사 + (이)든지，동사 + -든지',
    rulesNote: '-을/ㄹ 테니까 의 테 는 의지/추측의 의존명사 터 의 관형형에서 왔으며，주어는 반드시 1인칭（나/우리）。\n-(이)든지 는 두 개 이상 나열할 때：A든지 B든지 형태로 사용。',
    structures: [
      {
        ko: '제가 준비할 테니까 걱정하지 마세요',
        zh: '我来准备，请不要担心。',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '준비할 테니까', role: 'plain' },
          { text: '걱정하지 마세요', role: 'verb' },
        ],
      },
      {
        ko: '제가 먼저 갈 테니까 천천히 오세요',
        zh: '我先走，你慢慢来。',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '먼저 갈 테니까', role: 'plain' },
          { text: '천천히 오세요', role: 'verb' },
        ],
      },
      {
        ko: '뭐든지 다 잘 먹어요',
        zh: '什么都吃，不挑食。',
        tokens: [
          { text: '뭐든지', role: 'plain' },
          { text: '다 잘 먹어요', role: 'verb' },
        ],
      },
      {
        ko: '언제든지 연락해도 돼요',
        zh: '随时联系都可以。',
        tokens: [
          { text: '언제든지', role: 'time' },
          { text: '연락해도 돼요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을/ㄹ 테니까：有收音词干 + -을 테니까，无收音/ㄹ词干 + -ㄹ 테니까', examples: '먹다→먹을 테니까 / 가다→갈 테니까 / 만들다→만들 테니까' },
      { type: 'rule', text: '-(이)든지：명사 有收音 + 이든지，无收音 + 든지', examples: '학생이든지 / 의사든지 / 뭐든지 / 어디든지 / 누구든지' },
      { type: 'rule', text: '동사 + -든지：词干 + -든지（表示无论做什么动作都行）', examples: '가든지 오든지 / 먹든지 말든지 / 자든지 깨든지' },
      { type: 'usage', text: '-을/ㄹ 테니까 后句常接命令/请求/제안，前句主语必须是 1인칭', examples: '제가 할 테니까 쉬세요 / 내가 낼 테니까 신경 쓰지 마' },
      { type: 'usage', text: '-(이)든지 상관없다/괜찮다 와 자주 결합', examples: '어디든지 괜찮아요 / 누구든지 상관없어요 / 뭐든지 좋아요' },
      { type: 'note', text: '-을/ㄹ 테니까 의 테 는 의지（~할 테니까）와 강한 추측（~일 테니까）의 두 가지 의미', examples: '의지: 내가 운전할 테니까 걱정 마（我来开车）/ 추측: 거기 많이 추울 테니까 따뜻하게 입어요（那里一定很冷）' },
      { type: 'compare', text: '-을/ㄹ 테니까 vs -(으)니까：前者强调说话人意图，后者陈述客观原因', examples: '내가 살 테니까 골라（我来买，你选）vs 비가 오니까 우산 챙겨（因为下雨，带伞）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '요리할 테니까', role: 'plain' },
          { text: '설거지 해 주세요', role: 'verb' },
        ],
        zh: '我来做饭，你来洗碗吧。',
        swapWords: ['요리할 테니까 설거지 해 주세요', '청소할 테니까 장 봐 주세요', '준비할 테니까 기다려 주세요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '어디든지', role: 'plain' },
          { text: '같이 가면', role: 'plain' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '只要一起去哪里都好。',
        swapWords: ['어디든지 좋아요', '언제든지 좋아요', '누구든지 좋아요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '제가', role: 'subject' },
          { text: '먼저 자리를 맡을 테니까', role: 'plain' },
          { text: '천천히 오세요', role: 'verb' },
        ],
        zh: '我先去占位，你慢慢来。',
        swapWords: ['자리를 맡을 테니까 천천히 오세요', '표를 살 테니까 기다리세요', '주문할 테니까 앉아 계세요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '뭐든지', role: 'plain' },
          { text: '시켜도', role: 'plain' },
          { text: '괜찮아요', role: 'verb' },
        ],
        zh: '点什么都可以。',
        swapWords: ['뭐든지 괜찮아요', '언제든지 괜찮아요', '어디든지 괜찮아요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '分工合作', ko: '제가 요리할 테니까 설거지는 부탁해요.', zh: '我来做饭，洗碗麻烦你了。' },
      { icon: '🎵', context: 'KPOP 粉丝', ko: '뭐든지 들어요. 그 그룹 노래라면 다 좋아요.', zh: '什么都听，只要是那个组合的歌都喜欢。' },
      { icon: '📅', context: '约时间', ko: '언제든지 괜찮으니까 편한 때 연락해 주세요.', zh: '随时都可以，方便的时候联系我。' },
      { icon: '🚗', context: '出行安排', ko: '제가 운전할 테니까 걱정하지 마세요.', zh: '我来开车，不用担心。' },
      { icon: '💬', context: '강한 추측', ko: '거기 사람이 많을 테니까 일찍 가는 게 좋겠어요.', zh: '那里一定很多人，最好早点去。' },
      { icon: '🏪', context: '购物场景', ko: 'A: 뭐 먹을까요? B: 뭐든지 좋아요.', zh: 'A：吃什么？B：什么都好。' },
    ],
    mistakes: [
      { wrong: '친구가 올 테니까 기다려요', correct: '친구가 올 거니까 기다려요 또는 제가 기다릴 테니까 먼저 가세요', note: '-을/ㄹ 테니까 의 앞절 주어는 반드시 1인칭（나/우리）。3인칭에는 -을 거니까 사용。' },
      { wrong: '뭐이든지 먹어요', correct: '뭐든지 먹어요', note: '뭐 无收音 → 뭐든지（이든지 는 有收音 명사에만）。' },
      { wrong: '먹을 테니까 먹어요', correct: '먹을 테니까 기다려요 / 먹을 거니까 같이 먹어요', note: '-을 테니까 는 前后 주어가 다를 때 자연스럽다. 같은 주어면 어색。' },
      { wrong: '갈 테니까 갔어요', correct: '갈 테니까 기다리세요', note: '-을/ㄹ 테니까 는 미래 의지/추측에 사용，과거형과 결합하지 않는다。' },
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
      <div class="ko">동사 词干 + -을/ㄹ 테니까</div>
      <div class="zh">我会……，所以你……</div>
    </div>
    <div class="ov-block">
      <div class="badge">任意选择</div>
      <div class="ko">명사/동사 + -(이)든지</div>
      <div class="zh">不管哪个都……</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">제가 준비할 테니까 걱정하지 마세요.</span><span class="zh">我来准备，请不要担心。</span></div>
    <div class="hook-sent"><span class="ko">언제든지 연락해도 돼요.</span><span class="zh">随时联系都可以。</span></div>
  </div>
</div>`,
    compareLabel: '-을 테니까 vs -(으)니까',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-을/ㄹ 테니까</div>
    <div class="cmp-row"><span class="badge">주어</span>반드시 1인칭（나/우리）</div>
    <div class="cmp-row"><span class="badge">意思</span>我会……，所以你……</div>
    <div class="cmp-row"><span class="badge">后句</span>命令/请求/제안</div>
    <div class="cmp-row"><span class="ko">제가 살 테니까 골라요</span><span class="zh">我来买，你选</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-(으)니까</div>
    <div class="cmp-row"><span class="badge">주어</span>任意人称</div>
    <div class="cmp-row"><span class="badge">意思</span>因为……所以……</div>
    <div class="cmp-row"><span class="badge">后句</span>命令/陈述均可</div>
    <div class="cmp-row"><span class="ko">비가 오니까 우산 써요</span><span class="zh">因为下雨，用伞</span></div>
  </div>
</div>`,
    quickTable: {
      title: '-을/ㄹ 테니까 接续形式',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 테니까', zh: '' }, { ko: '먹을 테니까', zh: '我会吃，所以……' }, { ko: '', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 테니까', zh: '' }, { ko: '갈 테니까', zh: '我会去，所以……' }, { ko: '', zh: '' }],
        [{ ko: '추측용법', zh: '推测' }, { ko: '명사+일 테니까', zh: '' }, { ko: '추울 테니까', zh: '一定会很冷，所以……' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 테니까, -(이)든지',
      body: '测试对两个语法点的掌握',
      questions: [
        {
          prompt: '我来买单，你不用担心。→ 제가 낼 테니까 ___',
          options: ['걱정하지 마세요', '걱정했어요', '걱정하니까요', '걱정입니다'],
          answer: 0 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까 후절에 命令/부탁',
        },
        {
          prompt: '什么时候都可以。→ 언제___ 괜찮아요',
          options: ['든지', '이든지', '거나', '나'],
          answer: 0 as 0|1|2|3,
          explanation: '언제 无收音 → 언제든지',
        },
        {
          prompt: '-을/ㄹ 테니까 的前句主语必须是？',
          options: ['1인칭（나/우리）', '2인칭（너/당신）', '3인칭', '任何人称'],
          answer: 0 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까 앞절 주어는 반드시 1인칭',
        },
        {
          prompt: '我先去占位。→ 제가 먼저 자리를 맡___ 테니까 기다려요',
          options: ['을', 'ㄹ', '는', '기'],
          answer: 0 as 0|1|2|3,
          explanation: '맡다 有收音 → 맡을 테니까',
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
    whatItDoes: '表示"打算做某事"和"去/来做某事"',
    whatItDoesBody: '-(으)려고 하다 表示打算或意图，相当于"打算……/想要……"，强调说话人的主观意图。\n-(으)려고 가다/오다 表示为了某个目的而去/来，相当于"去/来做……"。\n两者都用 -(으)려고 作为前半，区别在于后接续的 动词不同。',
    structureNote: '-(으)려고：有收音词干 + -으려고，无收音/ㄹ词干 + -려고\n-(으)려고 하다：打算……\n-(으)려고 가다/오다：去/来做……',
    rulesNote: '-(으)려고 하다 의 주어는 보통 의지를 가진 사람（나/우리/그 사람 등）。\n-(으)려고 가다/오다 는 목적을 나타내므로，이동사 가다/오다 와 결합。\n-러 가다/오다 와 의미가 같지만 -(으)려고 가다/오다 는 의도성이 더 강조됨。',
    structures: [
      {
        ko: '내년에 한국에 유학 가려고 해요',
        zh: '打算明年去韩国留学。',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '유학 가려고 해요', role: 'verb' },
        ],
      },
      {
        ko: '새 옷을 사려고 백화점에 갔어요',
        zh: '为了买新衣服，去了百货商店。',
        tokens: [
          { text: '새 옷을', role: 'object' },
          { text: '사려고', role: 'plain' },
          { text: '백화점에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배우려고 학원에 다녀요',
        zh: '为了学韩语，在上补习班。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우려고', role: 'plain' },
          { text: '학원에', role: 'place' },
          { text: '다녀요', role: 'verb' },
        ],
      },
      {
        ko: '책을 빌리려고 도서관에 왔어요',
        zh: '为了借书来了图书馆。',
        tokens: [
          { text: '책을', role: 'object' },
          { text: '빌리려고', role: 'plain' },
          { text: '도서관에', role: 'place' },
          { text: '왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)려고：有收音词干 + -으려고，无收音/ㄹ词干 + -려고', examples: '먹다→먹으려고 / 가다→가려고 / 살다→살려고 / 만들다→만들려고' },
      { type: 'rule', text: '-(으)려고 하다：表示打算/意图（앞뒤 주어 동일）', examples: '뭐 하려고 해요?（你打算做什么？）/ 한국에 가려고 해요（打算去韩国）' },
      { type: 'rule', text: '-(으)려고 가다/오다：表示为了某目的而移动', examples: '밥 먹으려고 식당에 갔어요 / 친구 만나려고 왔어요' },
      { type: 'usage', text: '-(으)려고 앞에는 의지동사（의도적으로 하는 행동）가 와야 함，상태동사 불가', examples: '알려고 해요（× 알다는 상태）→ 알아보려고 해요（✓）' },
      { type: 'usage', text: '-(으)려고 의 前后 주어는 반드시 동일인', examples: '제가 먹으려고 샀어요（○）/ 친구가 먹으려고 제가 샀어요（× 주어 불일치）' },
      { type: 'note', text: '-러 가다/오다 와 -(으)려고 가다/오다 는 의미상 유사，-(으)려고 쪽이 구어체에 더 자유롭게 쓰임', examples: '밥 먹으러 갔어요 = 밥 먹으려고 갔어요' },
      { type: 'compare', text: '-(으)려고 하다 vs -(으)ㄹ 거예요：前者强调意图，后者更偏向计划/预测', examples: '가려고 해요（我有意去）vs 갈 거예요（我会去/打算去）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '다이어트를', role: 'object' },
          { text: '하려고', role: 'plain' },
          { text: '헬스장에 등록했어요', role: 'verb' },
        ],
        zh: '为了减肥，报了健身房。',
        swapWords: ['헬스장에 등록했어요', '음식을 줄이려고 해요', '매일 운동하려고 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이번 학기에', role: 'time' },
          { text: '한국어 시험에 합격하려고', role: 'plain' },
          { text: '열심히 공부하고 있어요', role: 'verb' },
        ],
        zh: '这学期为了通过韩语考试，正在努力学习。',
        swapWords: ['열심히 공부하고 있어요', '학원에 다녀요', '매일 복습해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭐', role: 'plain' },
          { text: '하려고', role: 'plain' },
          { text: '해요?', role: 'verb' },
        ],
        zh: '你打算做什么？',
        swapWords: ['해요?', '했어요?', '할 거예요?'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '건강해지려고', role: 'plain' },
          { text: '매일', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
        zh: '为了变健康，每天运动。',
        swapWords: ['매일 운동해요', '매일 걸어요', '음식을 조절해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎓', context: '学习目标', ko: '한국어를 잘 하려고 매일 연습해요.', zh: '为了学好韩语，每天练习。' },
      { icon: '🎵', context: 'KPOP 팬', ko: '콘서트 표를 사려고 아침 일찍 일어났어요.', zh: '为了买演唱会票，早早起床了。' },
      { icon: '✈️', context: '旅行计划', ko: '한국 여행을 가려고 돈을 모으고 있어요.', zh: '为了去韩国旅行，正在攒钱。' },
      { icon: '🍜', context: '目的移动', ko: '유명한 냉면을 먹으려고 부산까지 갔어요.', zh: '为了吃著名的冷面，特地去了釜山。' },
      { icon: '📚', context: '시험 준비', ko: 'TOPIK 시험을 보려고 열심히 준비 중이에요.', zh: '为了参加TOPIK考试，正在努力准备中。' },
      { icon: '💬', context: '일상 대화', ko: 'A: 왜 왔어요? B: 선생님 만나려고 왔어요.', zh: 'A：你来干什么？B：来见老师的。' },
    ],
    mistakes: [
      { wrong: '먹을려고 해요', correct: '먹으려고 해요', note: '有收音词干 + -으려고，不是 -을려고。먹다 → 먹으려고（不是 먹을려고）。' },
      { wrong: '알려고 해요', correct: '알아보려고 해요 또는 이해하려고 해요', note: '알다 는 상태동사，不能用 -(으)려고。需换用行为动词。' },
      { wrong: '친구가 오려고 제가 청소했어요', correct: '친구가 오기 때문에 제가 청소했어요', note: '-(으)려고 前后 주어는 반드시 동일인。主语不同时用 -기 때문에 等。' },
      { wrong: '가려고 갔어요', correct: '밥 먹으려고 갔어요', note: '-(으)려고 앞에 이동 동사와 같은 동사가 오면 어색。目的动词要不同于移动动词。' },
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
      <div class="ko">동사 词干 + -(으)려고 하다</div>
      <div class="zh">한국에 가려고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">目的移动</div>
      <div class="ko">동사 词干 + -(으)려고 가다/오다</div>
      <div class="zh">밥 먹으려고 갔어요</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">내년에 한국에 유학 가려고 해요.</span><span class="zh">打算明年去韩国留学。</span></div>
    <div class="hook-sent"><span class="ko">책을 빌리려고 도서관에 왔어요.</span><span class="zh">为了借书来了图书馆。</span></div>
  </div>
</div>`,
    compareLabel: '-(으)려고 하다 vs -ㄹ 거예요',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-(으)려고 하다</div>
    <div class="cmp-row"><span class="badge">강조</span>意图、动机</div>
    <div class="cmp-row"><span class="badge">语感</span>有意要做（意志性强）</div>
    <div class="cmp-row"><span class="ko">한국에 가려고 해요</span><span class="zh">我有意去韩国</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-(으)ㄹ 거예요</div>
    <div class="cmp-row"><span class="badge">강조</span>计划、预测</div>
    <div class="cmp-row"><span class="badge">语感</span>会去（计划性/预测）</div>
    <div class="cmp-row"><span class="ko">한국에 갈 거예요</span><span class="zh">我会去韩国</span></div>
  </div>
</div>`,
    quickTable: {
      title: '-(으)려고 接续形式',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-으려고', zh: '' }, { ko: '먹으려고', zh: '为了吃' }, { ko: '', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-려고', zh: '' }, { ko: '가려고', zh: '为了去' }, { ko: '', zh: '' }],
        [{ ko: 'ㄹ 词干', zh: '' }, { ko: '-려고（ㄹ不脱落）', zh: '' }, { ko: '만들려고', zh: '为了做' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)려고 하다/가다/오다',
      body: '测试对打算和目的表达的掌握',
      questions: [
        {
          prompt: '打算学韩语。→ 한국어를 배우___ 해요',
          options: ['려고', '으려고', '을려고', '기로'],
          answer: 0 as 0|1|2|3,
          explanation: '배우다 无收音 → 배우려고',
        },
        {
          prompt: '为了买书去了书店。→ 책을 사___ 서점에 갔어요',
          options: ['려고', '으려고', '기 위해서', '기로'],
          answer: 0 as 0|1|2|3,
          explanation: '사다 无收音 → 사려고 갔어요',
        },
        {
          prompt: '-(으)려고 前后 주어는 어때야 하나요?',
          options: ['반드시 동일인', '달라야 한다', '상관없다', '2인칭만 가능'],
          answer: 0 as 0|1|2|3,
          explanation: '-(으)려고 前后 주어는 반드시 동일인',
        },
        {
          prompt: '为了见朋友来了这里。→ 친구를 만나___ 여기 왔어요',
          options: ['려고', '으려고', '기 때문에', '는데'],
          answer: 0 as 0|1|2|3,
          explanation: '만나다 无收音 → 만나려고 왔어요',
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
    whatItDoes: '表示"原本打算……"和"你当时为何不……"',
    whatItDoesBody: '-(으)려고 했다 表示原本有某个意图但最终未实现，相当于"本来打算……的"，隐含实际没做到的语气。\n-지 그랬어(요)? 表示说话人建议对方当时应该做某事，含有轻微遗憾或责备语气，相当于"你那时候为什么不……呢？"。\n两者常一起出现：说明原计划→对方给出建议或遗憾。',
    structureNote: '-(으)려고 했다：동사 词干 + -(으)려고 했다（有收音+으려고，无收音/ㄹ+려고）\n-지 그랬어(요)?：동사 词干 + -지 그랬어요?（所有词干直接+지，格式固定）',
    rulesNote: '-(으)려고 했다 과거형表示意图未实现，若接 -는데 更自然：가려고 했는데 못 갔어요。\n-지 그랬어(요)? 의 그랬어요 는 그러다의 과거형，直译"为什么不那样做呢？"。\n두 형태 모두 후회·유감（遗憾）의 뉘앙스를 가짐。',
    structures: [
      {
        ko: '오늘 운동하려고 했는데 비가 와서 못 했어요',
        zh: '本来打算今天运动，但因为下雨没能做。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '운동하려고 했는데', role: 'plain' },
          { text: '비가 와서', role: 'plain' },
          { text: '못 했어요', role: 'verb' },
        ],
      },
      {
        ko: '일찍 자려고 했는데 드라마를 보다가 늦게 잤어요',
        zh: '本来打算早睡，但看剧看到了很晚。',
        tokens: [
          { text: '일찍 자려고 했는데', role: 'plain' },
          { text: '드라마를 보다가', role: 'plain' },
          { text: '늦게 잤어요', role: 'verb' },
        ],
      },
      {
        ko: '그냥 전화하지 그랬어요?',
        zh: '你那时候为什么不直接打电话呢？',
        tokens: [
          { text: '그냥', role: 'plain' },
          { text: '전화하지 그랬어요?', role: 'verb' },
        ],
      },
      {
        ko: '미리 예약하지 그랬어요?',
        zh: '你怎么不提前预约呢？',
        tokens: [
          { text: '미리', role: 'plain' },
          { text: '예약하지 그랬어요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)려고 했다：有收音词干 + -으려고 했다，无收音/ㄹ词干 + -려고 했다', examples: '먹다→먹으려고 했다 / 가다→가려고 했다 / 만들다→만들려고 했다' },
      { type: 'rule', text: '-지 그랬어(요)?：모든 동사 词干 + -지 그랬어요?（词干不变）', examples: '가다→가지 그랬어요? / 말하다→말하지 그랬어요? / 먹다→먹지 그랬어요?' },
      { type: 'usage', text: '-(으)려고 했는데：했다 뒤에 는데를 붙여，表示"本打算……但是……"，更口语化', examples: '자려고 했는데 잠이 안 왔어요 / 전화하려고 했는데 바빴어요' },
      { type: 'usage', text: '-지 그랬어요? 는 상대방의 행동에 대한 가벼운 유감/충고', examples: '일찍 오지 그랬어요?（你为什么不早点来）/ 도움 요청하지 그랬어요?（你为什么不求助呢）' },
      { type: 'note', text: '-(으)려고 했다 는 의도가 실현되지 않았음을 암시', examples: '가려고 했어요（有意但未去）vs 가려고 해요（正打算去，将来）' },
      { type: 'note', text: '-지 그랬어요? 반말형은 -지 그랬어?，格式固定不变', examples: '그냥 먹지 그랬어?（你为啥不吃）/ 진작 말하지 그랬어?（早说不就好了）' },
      { type: 'compare', text: '-(으)려고 했다 vs -(으)려고 하다：前者过去意图（未实现），后者当前/将来意图', examples: '가려고 했다（本打算去但没去）vs 가려고 한다（现在打算去）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '청소하려고 했는데', role: 'plain' },
          { text: '친구가 와서 못 했어요', role: 'verb' },
        ],
        zh: '周末本来打算打扫，但朋友来了没能做。',
        swapWords: ['청소하려고 했는데 친구가 와서 못 했어요', '요리하려고 했는데 시간이 없었어요', '공부하려고 했는데 피곤해서 잠들었어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '택시를 타지', role: 'plain' },
          { text: '그랬어요?', role: 'verb' },
        ],
        zh: '你为什么不坐出租车呢？',
        swapWords: ['그랬어요?', '그랬어?', '그러지'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트 표를', role: 'object' },
          { text: '일찍 예매하려고 했는데', role: 'plain' },
          { text: '매진됐어요', role: 'verb' },
        ],
        zh: '本来打算早点买演唱会票，但已经卖完了。',
        swapWords: ['일찍 예매하려고 했는데 매진됐어요', '예매하려고 했는데 사이트가 다운됐어요', '기다리려고 했는데 포기했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그냥', role: 'plain' },
          { text: '말하지', role: 'plain' },
          { text: '그랬어요?', role: 'verb' },
        ],
        zh: '你为什么不直接说呢？',
        swapWords: ['그랬어요?', '그랬어?', '그러지'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😅', context: '计划落空', ko: '오늘 일찍 일어나려고 했는데 알람을 못 들었어요.', zh: '今天本来打算早起，但没听到闹钟。' },
      { icon: '🎵', context: 'KPOP 팬', ko: '콘서트에 가려고 했는데 표가 다 팔렸어요.', zh: '本来想去演唱会，但票都卖完了。' },
      { icon: '💬', context: '朋友对话', ko: 'A: 길이 막혀서 늦었어요. B: 그럼 지하철을 타지 그랬어요?', zh: 'A：堵车迟到了。B：那你为什么不坐地铁呢？' },
      { icon: '📚', context: '학습 후회', ko: '시험 전에 더 공부하지 그랬어요.', zh: '考试前应该多学习的。' },
      { icon: '🍽️', context: '饮食场景', ko: '배고프면 먼저 먹지 그랬어요?', zh: '肚子饿的话你为什么不先吃呢？' },
      { icon: '✈️', context: '旅行计划', ko: '여행을 가려고 했는데 갑자기 일이 생겼어요.', zh: '本来打算去旅行，但突然有事了。' },
    ],
    mistakes: [
      { wrong: '가을려고 했어요', correct: '가려고 했어요', note: '가다 无收音词干 → 가려고（不是 가을려고），切忌多加 을。' },
      { wrong: '먹지 그래요?', correct: '먹지 그랬어요?', note: '-지 그랬어요? 는 반드시 과거형（그랬어요）을 사용。现在时 그래요 不表遗憾/建议语气。' },
      { wrong: '가려고 했는데 갔어요', correct: '가려고 했는데 못 갔어요', note: '-(으)려고 했는데 후절에는 일반적으로 의도와 다른 결과가 온다。後接못/안否定或意外情况。' },
      { wrong: '공부하지 않지 그랬어요?', correct: '공부하지 그랬어요?', note: '-지 그랬어요? 앞에는 긍정动词词干，不需要否定形式。想表达"为什么不学习"用 공부하지 그랬어요?。' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第3课</div><div class="ov-hero-title">-(으)려고 했다, -지 그랬어(요)?</div><div class="ov-hero-sub">未实现意图与遗憾建议的表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">未实现意图</div><div class="ko">동사 词干 + -(으)려고 했다</div><div class="zh">本来打算……（但没做到）</div></div><div class="ov-block"><div class="badge">遗憾建议</div><div class="ko">동사 词干 + -지 그랬어(요)?</div><div class="zh">你那时候为什么不……呢？</div></div></div></div>`,
    step0Html: `<div class="step0-hook"><div class="hook-box"><div class="hook-sent"><span class="ko">오늘 운동하려고 했는데 비가 와서 못 했어요.</span><span class="zh">本来打算运动，但下雨没能做。</span></div><div class="hook-sent"><span class="ko">그냥 전화하지 그랬어요?</span><span class="zh">你那时候为什么不直接打电话呢？</span></div></div></div>`,
    compareLabel: '-(으)려고 했다 vs -지 그랬어요?',
    compareHtml: `<div class="compare"><div class="cmp-block" style="border-left:4px solid #ff7fa8"><div class="cmp-title">-(으)려고 했다</div><div class="cmp-row"><span class="badge">视角</span>说话人自己的意图</div><div class="cmp-row"><span class="badge">语感</span>遗憾：本来想……没做到</div><div class="cmp-row"><span class="ko">가려고 했는데 못 갔어요</span><span class="zh">本来想去但没去成</span></div></div><div class="cmp-block" style="border-left:4px solid #aee3d8"><div class="cmp-title">-지 그랬어요?</div><div class="cmp-row"><span class="badge">视角</span>建议对方当时应该做</div><div class="cmp-row"><span class="badge">语感</span>轻责：你为什么不……</div><div class="cmp-row"><span class="ko">그냥 전화하지 그랬어요?</span><span class="zh">你为什么不打电话呢</span></div></div></div>`,
    quickTable: {
      title: '接续形式整理',
      headers: ['语法点', '接续', '예시', '意思'],
      rows: [
        [{ ko: '-(으)려고 했다', zh: '' }, { ko: '有收音+으려고 했다', zh: '' }, { ko: '먹으려고 했다', zh: '本来打算吃' }, { ko: '', zh: '' }],
        [{ ko: '-(으)려고 했다', zh: '' }, { ko: '无收音/ㄹ+려고 했다', zh: '' }, { ko: '가려고 했다', zh: '本来打算去' }, { ko: '', zh: '' }],
        [{ ko: '-지 그랬어요?', zh: '' }, { ko: '词干+지 그랬어요?', zh: '' }, { ko: '말하지 그랬어요?', zh: '你为什么不说呢' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)려고 했다, -지 그랬어(요)?',
      body: '测试对未实现意图和遗憾建议的掌握',
      questions: [
        {
          prompt: '本来打算早睡。→ 일찍 자___ 했어요',
          options: ['려고', '으려고', '를려고', '기로'],
          answer: 0 as 0|1|2|3,
          explanation: '자다 无收音 → 자려고 했어요',
        },
        {
          prompt: '你为什么不坐地铁呢？→ 지하철을 타___ 그랬어요?',
          options: ['지', '려고', '서', '면'],
          answer: 0 as 0|1|2|3,
          explanation: '타다 + -지 그랬어요? → 타지 그랬어요?',
        },
        {
          prompt: '-(으)려고 했는데 后面一般接什么？',
          options: ['未实现/意外结果', '将来计划', '现在进行', '命令'],
          answer: 0 as 0|1|2|3,
          explanation: '-(으)려고 했는데 暗示意图未实现，后句一般是못/안等否定结果',
        },
        {
          prompt: '本来打算吃饭但没吃。→ 밥을 먹___ 했는데 못 먹었어요',
          options: ['으려고', '려고', '기로', '을려고'],
          answer: 0 as 0|1|2|3,
          explanation: '먹다 有收音 → 먹으려고 했는데',
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
    whatItDoes: '表示"一举两得"和"趁着……顺便……"',
    whatItDoesBody: '겸 连接两个名词，表示同时兼顾两个目的或功能，相当于"既……又……／兼……"。\n-은/ㄴ 김에 接在过去冠词形之后，表示趁着某个已发生或正在做的事，顺便再做另一件事，相当于"趁着……，顺便……"。\n两者都传达"一石二鸟"的语感，겸 侧重并列目的，-은/ㄴ 김에 侧重借机行事。',
    structureNote: '겸：명사 + 겸 + 명사（两个名词之间）\n-은/ㄴ 김에：동사 过去冠词形 + 김에（有收音词干+-은 김에，无收音词干+-ㄴ 김에）',
    rulesNote: '겸 은 명사와만 결합하며，동사에 직접 붙이지 않는다。\n-은/ㄴ 김에 의 김 은 "기회/시점"을 뜻하는 의존명사。주로 이미 일어난 행동을 발판으로 추가 행동 제안 시 사용。\n-는 김에（현재진행）도 가능：청소하는 김에 정리도 해요。',
    structures: [
      {
        ko: '운동 겸 산책을 했어요',
        zh: '又锻炼又散步。',
        tokens: [
          { text: '운동 겸', role: 'plain' },
          { text: '산책을', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
      },
      {
        ko: '관광 겸 출장으로 서울에 갔어요',
        zh: '以旅游兼出差的名义去了首尔。',
        tokens: [
          { text: '관광 겸 출장으로', role: 'plain' },
          { text: '서울에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
      {
        ko: '나온 김에 장도 봤어요',
        zh: '趁着出来，顺便买了东西。',
        tokens: [
          { text: '나온 김에', role: 'plain' },
          { text: '장도', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
      },
      {
        ko: '청소하는 김에 빨래도 했어요',
        zh: '趁着打扫，顺便洗了衣服。',
        tokens: [
          { text: '청소하는 김에', role: 'plain' },
          { text: '빨래도', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '겸：명사 + 겸 + 명사，두 가지를 동시에 겸한다는 의미', examples: '운동 겸 산책 / 식사 겸 회의 / 관광 겸 출장 / 공부 겸 여행' },
      { type: 'rule', text: '-은/ㄴ 김에：有收音词干 + -은 김에，无收音/ㄹ词干 + -ㄴ 김에', examples: '나가다→나간 김에 / 먹다→먹은 김에 / 만들다→만든 김에' },
      { type: 'rule', text: '-는 김에（현재）도 가능：진행 중인 행동을 발판으로 할 때', examples: '요리하는 김에 간식도 만들어요 / 운동하는 김에 스트레칭도 해요' },
      { type: 'usage', text: '겸 앞뒤 명사는 같은 성격이거나 동시에 이룰 수 있는 것', examples: '식사 겸 미팅（餐叙）/ 휴식 겸 치료（边休养边治疗）' },
      { type: 'usage', text: '-은/ㄴ 김에 후절에는 주로 추가 행동 제안', examples: '여기 온 김에 사진도 찍어요 / 마트 간 김에 음료수도 사 왔어요' },
      { type: 'note', text: 'ㄹ 불규칙 동사도 -ㄴ 김에 적용：만들다→만든 김에，알다→안 김에', examples: '만든 김에 더 만들어요 / 안 김에 바로 연락했어요' },
      { type: 'compare', text: '겸 vs -은/ㄴ 김에：겸은 병렬 목적，-은/ㄴ 김에는 이미 된 일을 발판으로 추가 행동', examples: '운동 겸 산책（并列目的）vs 나온 김에 산책도 해요（趁机追加）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구 만남 겸', role: 'plain' },
          { text: '쇼핑도', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '既见了朋友，又购了物。',
        swapWords: ['친구 만남 겸 쇼핑도 했어요', '식사 겸 미팅을 했어요', '관광 겸 공부도 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울에 온 김에', role: 'plain' },
          { text: '박물관도', role: 'object' },
          { text: '가 봤어요', role: 'verb' },
        ],
        zh: '趁着来首尔，顺便去了博物馆。',
        swapWords: ['서울에 온 김에 박물관도 가 봤어요', '마트에 간 김에 음료수도 샀어요', '청소한 김에 정리도 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '요리하는 김에', role: 'plain' },
          { text: '도시락도', role: 'object' },
          { text: '만들었어요', role: 'verb' },
        ],
        zh: '趁着做饭，顺便做了便当。',
        swapWords: ['요리하는 김에 도시락도 만들었어요', '빨래하는 김에 청소도 했어요', '나가는 김에 우편도 부쳤어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '여기 온 김에', role: 'plain' },
          { text: '사진도', role: 'object' },
          { text: '찍어요', role: 'verb' },
        ],
        zh: '趁着来这里，顺便拍个照。',
        swapWords: ['사진도 찍어요', '구경도 해요', '커피도 마셔요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏃', context: '一举两得', ko: '운동 겸 산책으로 공원에 갔어요.', zh: '以锻炼兼散步为目的去了公园。' },
      { icon: '🎵', context: 'KPOP 팬', ko: '한국에 온 김에 좋아하는 가수 콘서트도 봤어요.', zh: '趁着来韩国，顺便看了喜欢的歌手演唱会。' },
      { icon: '🛒', context: '购物场景', ko: '마트 간 김에 필요한 거 다 샀어요.', zh: '趁着去超市，把需要的东西都买了。' },
      { icon: '✈️', context: '出行兼顾', ko: '관광 겸 출장으로 일본에 다녀왔어요.', zh: '以旅游兼出差的方式去日本了。' },
      { icon: '🏠', context: '家务效率', ko: '청소하는 김에 안 쓰는 물건도 버렸어요.', zh: '趁着打扫，顺便把不用的东西扔了。' },
      { icon: '💬', context: '日常对话', ko: 'A: 왜 이렇게 늦었어요? B: 나온 김에 친구도 만났어요.', zh: 'A：怎么这么晚？B：趁着出来，顺便见了朋友。' },
    ],
    mistakes: [
      { wrong: '공부하다 겸 여행하다 겸 갔어요', correct: '공부 겸 여행으로 갔어요', note: '겸 은 명사와 결합，동사 원형에 직접 붙이지 않는다。동사는 명사형으로 바꿔야 함。' },
      { wrong: '나가는 김에 어제 샀어요', correct: '나간 김에 샀어요', note: '-은/ㄴ 김에 와 -는 김에 는 시제에 따라 구분。已完成动작→-은/ㄴ 김에，进行中→-는 김에。' },
      { wrong: '먹을 김에 더 먹어요', correct: '먹는 김에 더 먹어요 / 먹은 김에 후식도 먹어요', note: '김에 앞에 미래형（-을）은 쓰지 않는다。현재진행（-는）이나 과거（-은/ㄴ）만 가능。' },
      { wrong: '운동 겸 먹었어요', correct: '운동 겸 산책을 했어요', note: '겸 앞뒤는 동시에 이룰 수 있는 관련된 목적이나 활동이어야 자연스럽다。' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第4课</div><div class="ov-hero-title">겸, -은/ㄴ 김에</div><div class="ov-hero-sub">一举两得与顺便的表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">兼顾两事</div><div class="ko">명사 + 겸 + 명사</div><div class="zh">既……又……／兼……</div></div><div class="ov-block"><div class="badge">顺便</div><div class="ko">동사 + -은/ㄴ 김에</div><div class="zh">趁着……，顺便……</div></div></div></div>`,
    step0Html: `<div class="step0-hook"><div class="hook-box"><div class="hook-sent"><span class="ko">운동 겸 산책을 했어요.</span><span class="zh">又锻炼又散步（一举两得）。</span></div><div class="hook-sent"><span class="ko">나온 김에 장도 봤어요.</span><span class="zh">趁着出来，顺便买了东西。</span></div></div></div>`,
    compareLabel: '겸 vs -은/ㄴ 김에',
    compareHtml: `<div class="compare"><div class="cmp-block" style="border-left:4px solid #ff7fa8"><div class="cmp-title">겸</div><div class="cmp-row"><span class="badge">결합</span>명사 + 겸 + 명사</div><div class="cmp-row"><span class="badge">意思</span>兼顾两个目的/功能</div><div class="cmp-row"><span class="ko">관광 겸 출장</span><span class="zh">既旅游又出差</span></div></div><div class="cmp-block" style="border-left:4px solid #aee3d8"><div class="cmp-title">-은/ㄴ 김에</div><div class="cmp-row"><span class="badge">결합</span>동사 过去冠词形 + 김에</div><div class="cmp-row"><span class="badge">意思</span>趁着某动作已发生，顺便……</div><div class="cmp-row"><span class="ko">나온 김에 커피도 마셔요</span><span class="zh">趁着出来，顺便喝杯咖啡</span></div></div></div>`,
    quickTable: {
      title: '-은/ㄴ 김에 접속 형식',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-은 김에', zh: '' }, { ko: '먹은 김에', zh: '趁着吃' }, { ko: '', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-ㄴ 김에', zh: '' }, { ko: '나간 김에', zh: '趁着出去' }, { ko: '', zh: '' }],
        [{ ko: '现在进行', zh: '' }, { ko: '-는 김에', zh: '' }, { ko: '청소하는 김에', zh: '趁着打扫' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '겸, -은/ㄴ 김에',
      body: '测试对겸和-은/ㄴ 김에的掌握',
      questions: [
        {
          prompt: '趁着出来，顺便买了咖啡。→ 나___ 김에 커피도 샀어요',
          options: ['온', '오는', '올', '오면'],
          answer: 0 as 0|1|2|3,
          explanation: '나오다 무받침 과거 관형형：나오+ㄴ=나온，题目已给出 나，填 온 → 나온 김에',
        },
        {
          prompt: '겸 앞뒤에는 무엇이 와야 하나요?',
          options: ['명사', '동사 원형', '형용사', '부사'],
          answer: 0 as 0|1|2|3,
          explanation: '겸 은 명사와 결합：운동 겸 산책，명사+겸+명사 형식',
        },
        {
          prompt: '趁着打扫，顺便整理。→ 청소하___ 김에 정리도 했어요',
          options: ['는', '은', 'ㄴ', '을'],
          answer: 0 as 0|1|2|3,
          explanation: '청소하다 + -는 김에：동작이 진행 중이거나 반복되는 상황에 사용，청소하는 김에（趁着打扫）',
        },
        {
          prompt: '以旅游兼出差。→ 관광 ___ 출장',
          options: ['겸', '과', '이랑', '하고'],
          answer: 0 as 0|1|2|3,
          explanation: '겸 连接两个并列目的名词：관광 겸 출장',
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
    whatItDoes: '表示金额量词：价值分量、面值规格和单价',
    whatItDoesBody: '(어)치 는 금액 뒤에 붙어 "그 금액만큼의 가치/분량"을 나타내며，"……价值的／……钱的东西"에 해당。\n짜리 는 수량이나 금액 뒤에 붙어 "그 단위나 규격의 것"을 나타내며，주로 화폐 단위나 크기에 사용。\n에 는 가격을 나타낼 때 "……에 팔다/사다" 형태로 쓰여 단가 또는 총액 표현에 사용。',
    structureNote: '(어)치：금액(숫자+단위) + 어치（표준형，받침 유무 관계없이 어치 사용）\n짜리：숫자+단위 + 짜리（크기·면값·규격 표현）\n에：금액 + 에（～에 사다/팔다，表示价格）',
    rulesNote: '(어)치 는 보통 어치 로 쓰이며 받침 유무와 관계없이 어치 사용이 자연스럽다：만 원어치，오천 원어치。\n짜리 는 화폐 단위 외에도 크기나 용량에 사용：100ml 짜리，3인분짜리。\n에 는 조사로 "얼마에 샀어요?"（多少钱买的？）처럼 가격 묻기에도 사용。',
    structures: [
      {
        ko: '만 원어치 과자를 샀어요',
        zh: '买了一万韩元的零食。',
        tokens: [
          { text: '만 원어치', role: 'plain' },
          { text: '과자를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '천 원짜리 동전이 있어요?',
        zh: '有一千韩元面值的硬币吗？',
        tokens: [
          { text: '천 원짜리', role: 'plain' },
          { text: '동전이', role: 'subject' },
          { text: '있어요?', role: 'verb' },
        ],
      },
      {
        ko: '이 가방은 오만 원에 샀어요',
        zh: '这个包是用五万韩元买的。',
        tokens: [
          { text: '이 가방은', role: 'subject' },
          { text: '오만 원에', role: 'plain' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '삼만 원어치 고기를 구웠어요',
        zh: '烤了三万韩元的肉。',
        tokens: [
          { text: '삼만 원어치', role: 'plain' },
          { text: '고기를', role: 'object' },
          { text: '구웠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '(어)치：금액 + 어치（표준형），"그 금액에 해당하는 양"', examples: '천 원어치 / 오만 원어치 / 십만 원어치' },
      { type: 'rule', text: '짜리：수량/금액 + 짜리，"그 단위·규격·면값의 것"', examples: '천 원짜리 동전 / 만 원짜리 지폐 / 500ml 짜리 / 1인분짜리' },
      { type: 'rule', text: '에（가격）：금액 + 에，"～에 사다/팔다/주다" 형식으로 가격 표현', examples: '이만 원에 팔아요 / 얼마에 샀어요? / 천 원에 세 개' },
      { type: 'usage', text: '(어)치 는 정량 구매 시 자주 사용，"얼마어치 주세요" 형태', examples: '오천 원어치 주세요（给我五千韩元的）/ 만 원어치 사과（一万韩元的苹果）' },
      { type: 'usage', text: '짜리 는 화폐 단위 외 용량·크기·인분 등에도 사용', examples: '2리터짜리 생수（2升装水）/ 2인분짜리 세트（两人份套餐）/ 50평짜리 아파트' },
      { type: 'note', text: '에 는 단가 표현에도 사용：개당 가격, 묶음 가격', examples: '개당 천 원에 팔아요 / 세 개에 오천 원이에요' },
      { type: 'compare', text: '(어)치 vs 짜리：어치는 금액분량（买了多少钱的东西），짜리는 규격/面值（这是多少钱面值的）', examples: '만 원어치 샀어요（买了一万韩元的）vs 만 원짜리 지폐（一万韩元面值的纸币）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오천 원어치', role: 'plain' },
          { text: '딸기를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '买了五千韩元的草莓。',
        swapWords: ['오천 원어치 딸기를 샀어요', '만 원어치 고기를 샀어요', '이만 원어치 과일을 샀어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '만 원짜리', role: 'plain' },
          { text: '지폐로', role: 'plain' },
          { text: '계산했어요', role: 'verb' },
        ],
        zh: '用一万韩元面值的纸币结账了。',
        swapWords: ['만 원짜리 지폐로 계산했어요', '오천 원짜리 지폐로 냈어요', '천 원짜리 동전으로 냈어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 옷은', role: 'subject' },
          { text: '삼만 원에', role: 'plain' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '这件衣服是三万韩元买的。',
        swapWords: ['삼만 원에 샀어요', '오만 원에 샀어요', '만오천 원에 샀어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '천 원짜리', role: 'plain' },
          { text: '동전', role: 'subject' },
          { text: '있어요?', role: 'verb' },
        ],
        zh: '有一千韩元的硬币吗？',
        swapWords: ['천 원짜리 동전 있어요?', '오백 원짜리 동전 있어요?', '만 원짜리 지폐 있어요?'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🛒', context: '市场购物', ko: '만 원어치 채소를 사 왔어요.', zh: '买了一万韩元的蔬菜回来了。' },
      { icon: '🎵', context: 'KPOP 굿즈', ko: '아이돌 포토카드를 오만 원어치 샀어요.', zh: '买了五万韩元的偶像照片卡。' },
      { icon: '💵', context: '换零钱', ko: '만 원짜리 지폐를 천 원짜리로 바꿔 주세요.', zh: '请把一万韩元面值的纸币换成一千韩元的。' },
      { icon: '🍖', context: '烤肉场景', ko: '삼만 원어치 삼겹살 주세요.', zh: '请给我三万韩元的五花肉。' },
      { icon: '🏪', context: '便利店', ko: '세 개에 천 원이에요.', zh: '三个一千韩元。' },
      { icon: '💬', context: '询问价格', ko: 'A: 이거 얼마에 샀어요? B: 이만 원에 샀어요.', zh: 'A：这个多少钱买的？B：两万韩元买的。' },
    ],
    mistakes: [
      { wrong: '만 원치 주세요', correct: '만 원어치 주세요', note: '표준형은 어치。받침 유무 관계없이 어치를 사용：천 원어치，만 원어치。' },
      { wrong: '천 원짜리어치', correct: '천 원어치 또는 천 원짜리', note: '짜리 와 어치 는 의미가 다르므로 중복 사용하지 않는다。' },
      { wrong: '얼마에서 샀어요?', correct: '얼마에 샀어요?', note: '가격을 물을 때는 에서 가 아닌 에 를 사용：얼마에 샀어요?（多少钱买的？）' },
      { wrong: '이만 원어치짜리', correct: '이만 원어치 또는 이만 원짜리', note: '어치 와 짜리 는 각각 독립적으로 사용하며 동시에 붙이지 않는다。' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第5课</div><div class="ov-hero-title">(어)치, 짜리, 에</div><div class="ov-hero-sub">金额量词与价格表达</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div><div class="ov-block"><div class="badge">价值量</div><div class="ko">금액 + (어)치</div><div class="zh">……价值的东西／……钱的</div></div><div class="ov-block"><div class="badge">面值/规格</div><div class="ko">수 + 짜리</div><div class="zh">……面值的／……规格的</div></div><div class="ov-block"><div class="badge">单价</div><div class="ko">금액 + 에</div><div class="zh">……钱（买到/卖出）</div></div></div></div>`,
    step0Html: `<div class="step0-hook"><div class="hook-box"><div class="hook-sent"><span class="ko">만 원어치 과자를 샀어요.</span><span class="zh">买了一万韩元的零食。</span></div><div class="hook-sent"><span class="ko">천 원짜리 동전이 있어요?</span><span class="zh">有一千韩元的硬币吗？</span></div></div></div>`,
    compareLabel: '(어)치 vs 짜리',
    compareHtml: `<div class="compare"><div class="cmp-block" style="border-left:4px solid #ff7fa8"><div class="cmp-title">(어)치</div><div class="cmp-row"><span class="badge">용법</span>금액 뒤에 붙어 "그 금액만큼의 분량/가치"</div><div class="cmp-row"><span class="badge">예</span>만 원어치 사과（一万韩元的苹果）</div><div class="cmp-row"><span class="ko">이만 원어치 주세요</span><span class="zh">给我两万韩元的</span></div></div><div class="cmp-block" style="border-left:4px solid #aee3d8"><div class="cmp-title">짜리</div><div class="cmp-row"><span class="badge">용법</span>수량/금액 뒤에 붙어 "그 단위/규격짜리"</div><div class="cmp-row"><span class="badge">예</span>천 원짜리 지폐（一千韩元面值的纸币）</div><div class="cmp-row"><span class="ko">오백 원짜리 동전</span><span class="zh">五百韩元硬币</span></div></div></div>`,
    quickTable: {
      title: '금액 표현 세 가지',
      headers: ['표현', '의미', '예시', '用法'],
      rows: [
        [{ ko: '(어)치', zh: '' }, { ko: '금액만큼의 분량', zh: '价值量' }, { ko: '만 원어치 사과', zh: '一万韩元的苹果' }, { ko: '', zh: '' }],
        [{ ko: '짜리', zh: '' }, { ko: '단위/규격/면값', zh: '规格/面值' }, { ko: '천 원짜리 동전', zh: '一千韩元硬币' }, { ko: '', zh: '' }],
        [{ ko: '에', zh: '' }, { ko: '가격(단가/총액)', zh: '价格' }, { ko: '만 원에 샀어요', zh: '一万韩元买的' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(어)치, 짜리, 에',
      body: '测试对三种价格表达的掌握',
      questions: [
        {
          prompt: '买了一万韩元的零食。→ 만 원___ 과자를 샀어요',
          options: ['어치', '짜리', '에', '치'],
          answer: 0 as 0|1|2|3,
          explanation: '금액만큼의 분량 → (어)치：만 원어치',
        },
        {
          prompt: '一千韩元面值的硬币。→ 천 원___ 동전',
          options: ['짜리', '어치', '에', '치'],
          answer: 0 as 0|1|2|3,
          explanation: '面值/규格 → 짜리：천 원짜리 동전',
        },
        {
          prompt: '这件衣服是三万韩元买的。→ 이 옷은 삼만 원___ 샀어요',
          options: ['에', '어치', '짜리', '에서'],
          answer: 0 as 0|1|2|3,
          explanation: '가격 표현 → 에：삼만 원에 샀어요',
        },
        {
          prompt: '给我五千韩元的草莓。→ 오천 원___ 딸기 주세요',
          options: ['어치', '짜리', '에', '만큼'],
          answer: 0 as 0|1|2|3,
          explanation: '금액만큼의 분량 구매 → 어치：오천 원어치 주세요',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l06',
    partNumber: 12,
    lessonNumber: 6,
    title: '"ㄹ" 的不规则音变',
    whatItDoes: 'ㄹ词干动词/形容词在特定词尾前ㄹ脱落的规则',
    whatItDoesBody: 'ㄹ 받침으로 끝나는 동사/형용사（ㄹ 词干）는 일부 어미 앞에서 ㄹ이 탈락한다。\nㄹ이 탈락하는 조건：어미가 ㄴ，ㅂ，시，오 로 시작할 때（기억법：나비시오）。\nㄹ이 유지되는 조건：어미가 아/어，고，지，면，도 등으로 시작할 때。',
    structureNote: 'ㄹ脱落：ㄹ词干 + -(으)ㄴ/-(으)ㄹ（관형형 제외）/ -ㅂ니다/-습니다 / -(으)세요 / -(으)오\nㄹ保留：ㄹ词干 + -아/어요 / -고 / -지 / -(으)면 / -아/어도 등\n주의：관형형 -(으)ㄴ은 ㄹ脱落지만 -(으)ㄹ（미래 관형형）은 보존',
    rulesNote: '기억법（나비시오）：ㄴ으로 시작하는 어미，ㅂ으로 시작하는 어미，시로 시작하는 어미，오로 시작하는 어미 앞에서 ㄹ 탈락。\n알다（知道）：알아요（知道）/ 아세요（知道吗/请知道）/ 압니다（知道）/ 아는（知道的）\n살다（居住）：살아요（居住）/ 사세요（请住）/ 삽니다（居住）/ 사는（居住的）\n만들다（制作）：만들어요（制作）/ 만드세요（请制作）/ 만듭니다（制作）/ 만드는（制作的）',
    structures: [
      {
        ko: '한국어를 잘 아세요?',
        zh: '你韩语说得好吗？（알다 + -(으)세요 → 아세요）',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘', role: 'plain' },
          { text: '아세요?', role: 'verb' },
        ],
      },
      {
        ko: '여기서 삽니다',
        zh: '住在这里。（살다 + -ㅂ니다 → 삽니다）',
        tokens: [
          { text: '여기서', role: 'place' },
          { text: '삽니다', role: 'verb' },
        ],
      },
      {
        ko: '직접 만든 케이크예요',
        zh: '是亲手做的蛋糕。（만들다 + -ㄴ → 만든）',
        tokens: [
          { text: '직접', role: 'plain' },
          { text: '만든', role: 'plain' },
          { text: '케이크예요', role: 'verb' },
        ],
      },
      {
        ko: '노래를 잘 부르는 사람이에요',
        zh: '是很会唱歌的人。（부르다 + -는 → 부르는，ㄹ保留）',
        tokens: [
          { text: '노래를', role: 'object' },
          { text: '잘 부르는', role: 'plain' },
          { text: '사람이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㄹ脱落 조건（나비시오）：어미가 ㄴ/ㅂ/시/오 로 시작할 때', examples: '알다：아는（ㄴ） / 압니다（ㅂ） / 아세요（시） / 아오（오）' },
      { type: 'rule', text: 'ㄹ保留 조건：어미가 아/어，고，지，면，도，ㄹ 등으로 시작할 때', examples: '알다：알아요 / 알고 / 알지 / 알면 / 알아도 / 알 거예요' },
      { type: 'rule', text: '현재 관형형：ㄹ词干 + -는（ㄹ保留），过去 관형형：ㄹ词干 + -ㄴ（ㄹ脱落）', examples: '만들다：만드는 것（现在）/ 만든 것（过去）/ 만들 것（未来，ㄹ保留）' },
      { type: 'usage', text: '주요 ㄹ 불규칙 동사：알다，살다，만들다，놀다，팔다，걸다，들다，불다，열다，울다，멀다', examples: '알다（知）/ 살다（住/生）/ 만들다（做）/ 놀다（玩）/ 팔다（卖）/ 열다（开）' },
      { type: 'usage', text: '형용사도 동일：길다（长），달다（甜），멀다（远），가늘다（细）', examples: '길다：긴（ㄴ）/ 깁니다（ㅂ）/ 기세요（시）/ 길어요（保留）' },
      { type: 'note', text: '-(으)ㄹ 미래 관형형에서는 ㄹ이 탈락하지 않는다', examples: '알 것 같아요（不是 아 것） / 만들 수 있어요（不是 만드 수）' },
      { type: 'compare', text: 'ㄹ 불규칙 vs 규칙 동사：ㄹ词词干是 특정 어미 앞에서만 탈락，규칙동사는 항상 유지', examples: '살다（不规则）：사세요 vs 참다（规则）：참으세요（으 추가）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래', role: 'subject' },
          { text: '아세요?', role: 'verb' },
        ],
        zh: '你知道这首歌吗？（알다→아세요，ㄹ脱落）',
        swapWords: ['아세요?', '알아요?', '알고 싶어요?'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '제가 직접', role: 'subject' },
          { text: '만든', role: 'plain' },
          { text: '음식이에요', role: 'verb' },
        ],
        zh: '是我亲手做的食物。（만들다+ㄴ→만든）',
        swapWords: ['만든 음식이에요', '만드는 음식이에요', '만들 음식이에요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '서울에', role: 'place' },
          { text: '사는', role: 'plain' },
          { text: '친구가 있어요', role: 'verb' },
        ],
        zh: '有住在首尔的朋友。（살다+는→사는，ㄹ脱落）',
        swapWords: ['사는 친구가 있어요', '살고 있는 친구가 있어요', '살던 친구가 있어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '만든', role: 'plain' },
          { text: '가수예요', role: 'verb' },
        ],
        zh: '是创作了这首歌的歌手。（만들다+ㄴ→만든）',
        swapWords: ['만든 가수예요', '만드는 가수예요', '만들었던 가수예요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 가사', ko: '이 노래 아세요? 제가 제일 좋아하는 곡이에요.', zh: '你知道这首歌吗？是我最喜欢的曲子。' },
      { icon: '🏠', context: '居住地', ko: '지금 어디 사세요? 저는 서울에 살아요.', zh: '您现在住哪里？我住在首尔。' },
      { icon: '🍰', context: '手工制作', ko: '이 케이크는 제가 직접 만든 거예요.', zh: '这个蛋糕是我亲手做的。' },
      { icon: '🎤', context: '歌手介绍', ko: '노래를 잘 부르는 가수를 좋아해요.', zh: '我喜欢唱歌好听的歌手。' },
      { icon: '📚', context: '语法说明', ko: '알다는 아세요로 바뀌어요. ㄹ이 탈락해요.', zh: '알다→아세요，ㄹ脱落了。' },
      { icon: '💬', context: '日常对话', ko: 'A: 한국어 잘 아세요? B: 조금 알아요.', zh: 'A：你韩语说得好吗？B：会一点。' },
    ],
    mistakes: [
      { wrong: '알으세요?', correct: '아세요?', note: 'ㄹ词干 + -(으)세요 시，ㄹ 탈락 후 으 도 필요없다：알다→아세요（不是 알으세요）。' },
      { wrong: '만들ㅂ니다', correct: '만듭니다', note: 'ㄹ词干 + -ㅂ니다 시，ㄹ 탈락：만들다→만듭니다（不是 만들ㅂ니다）。' },
      { wrong: '살는 사람', correct: '사는 사람', note: '살다 + -는（현재관형형）→ ㄹ 탈락：사는（不是 살는）。ㄹ词干의 현재관형형은 -는 앞에서 ㄹ이 탈락한다。' },
      { wrong: '아ㄹ 거예요', correct: '알 거예요', note: '미래 관형형 -(으)ㄹ 앞에서는 ㄹ이 탈락하지 않는다：알 거예요（不是 아 거예요）。' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第6课</div><div class="ov-hero-title">"ㄹ" 的不规则音变</div><div class="ov-hero-sub">ㄹ词干在특정 어미 앞에서의 탈락 규칙</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">核心规则</div></div><div class="ov-block"><div class="badge">ㄹ脱落</div><div class="ko">ㄹ词干 + ㄴ/ㅂ/시/오 → ㄹ脱落</div><div class="zh">알다→아세요 / 만들다→만듭니다</div></div><div class="ov-block"><div class="badge">保留</div><div class="ko">ㄹ词干 + 아/어/고/지/면… → ㄹ保留</div><div class="zh">알다→알아요 / 만들다→만들고</div></div></div></div>`,
    step0Html: `<div class="step0-hook"><div class="hook-box"><div class="hook-sent"><span class="ko">한국어를 잘 아세요?</span><span class="zh">你韩语说得好吗？（알다→아세요，ㄹ脱落）</span></div><div class="hook-sent"><span class="ko">제가 만들었어요.</span><span class="zh">是我做的。（만들다→만들었어요，ㄹ保留）</span></div></div></div>`,
    compareLabel: 'ㄹ脱落 vs ㄹ保留',
    compareHtml: `<div class="compare"><div class="cmp-block" style="border-left:4px solid #ff7fa8"><div class="cmp-title">ㄹ脱落的情况</div><div class="cmp-row"><span class="badge">条件</span>어미가 ㄴ/ㅂ/시/오 로 시작할 때</div><div class="cmp-row"><span class="ko">알다 + -(으)세요 → 아세요</span><span class="zh">ㄹ脱落</span></div><div class="cmp-row"><span class="ko">살다 + -ㅂ니다 → 삽니다</span><span class="zh">ㄹ脱落</span></div></div><div class="cmp-block" style="border-left:4px solid #aee3d8"><div class="cmp-title">ㄹ保留的情况</div><div class="cmp-row"><span class="badge">条件</span>어미가 아/어/고/지/면/도 로 시작할 때</div><div class="cmp-row"><span class="ko">알다 + -아요 → 알아요</span><span class="zh">ㄹ保留</span></div><div class="cmp-row"><span class="ko">만들다 + -고 → 만들고</span><span class="zh">ㄹ保留</span></div></div></div>`,
    quickTable: {
      title: 'ㄹ 불규칙 변화 정리（알다 예시）',
      headers: ['어미', 'ㄹ 처리', '결과형', '意思'],
      rows: [
        [{ ko: '-(으)세요', zh: '' }, { ko: 'ㄹ 탈락', zh: '' }, { ko: '아세요', zh: '请知道/您知道吗' }, { ko: '', zh: '' }],
        [{ ko: '-ㅂ니다', zh: '' }, { ko: 'ㄹ 탈락', zh: '' }, { ko: '압니다', zh: '知道（正式）' }, { ko: '', zh: '' }],
        [{ ko: '-(으)ㄴ（과거관형）', zh: '' }, { ko: 'ㄹ 탈락', zh: '' }, { ko: '안（알+ㄴ，非否定词）', zh: '知道的（过去）' }, { ko: '', zh: '' }],
        [{ ko: '-아/어요', zh: '' }, { ko: 'ㄹ 보존', zh: '' }, { ko: '알아요', zh: '知道' }, { ko: '', zh: '' }],
        [{ ko: '-고/-면/-도', zh: '' }, { ko: 'ㄹ 보존', zh: '' }, { ko: '알고/알면/알아도', zh: '知道并/如果知道/就算知道' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '"ㄹ" 的不规则音变',
      body: '测试ㄹ词干的变化规则',
      questions: [
        {
          prompt: '알다 + -(으)세요 = ?',
          options: ['아세요', '알으세요', '알세요', '알아세요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㄹ词干 + 시 시작 어미 → ㄹ 탈락：알다→아세요',
        },
        {
          prompt: '살다 + -ㅂ니다 = ?',
          options: ['삽니다', '살습니다', '살ㅂ니다', '사ㅂ니다'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㄹ词干 + ㅂ 시작 어미 → ㄹ 탈락：살다→삽니다',
        },
        {
          prompt: '만들다 + -는 = ?（현재 관형형）',
          options: ['만드는', '만들는', '만든', '만들은'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㄹ词干 + -는（현재관형형） → ㄹ 탈락：만들다→만드는',
        },
        {
          prompt: 'ㄹ이 탈락하지 않는 경우는?',
          options: ['알 거예요（미래관형）', '아세요（세요）', '압니다（ㅂ니다）', '아는（현재관형）'],
          answer: 0 as 0|1|2|3,
          explanation: '미래 관형형 -(으)ㄹ 앞에서는 ㄹ 탈락 없음：알 거예요（O）',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l07',
    partNumber: 12,
    lessonNumber: 7,
    title: '"ㅎ" 的不规则音变',
    whatItDoes: 'ㅎ词干形容词在모음 어미 앞에서 ㅎ脱落并发生모음 축약',
    whatItDoesBody: 'ㅎ 받침으로 끝나는 형용사（ㅎ 词干）는 모음으로 시작하는 어미 앞에서 ㅎ이 탈락하고 모음이 축약된다。\n대표적인 ㅎ 불규칙 형용사：빨갛다（红），파랗다（蓝），노랗다（黄），하얗다（白），까맣다（黑），어떻다（怎样），이렇다（这样），그렇다（那样），저렇다（那样/那边）。\n자음으로 시작하는 어미（-고，-지，-면）앞에서는 ㅎ이 그대로 유지된다。',
    structureNote: 'ㅎ脱落：ㅎ词干 + -아/어요 → ㅎ탈락 후 앞 모음과 축약（ㅏ/ㅓ→ㅐ）\n관형형：ㅎ词干 + -(으)ㄴ → ㅎ탈락（빨간，파란，어떤，그런，이런）\nㅎ保留：ㅎ词干 + -고/-지/-면/-다 → 그대로（빨갛고，어떻지，그렇다면）',
    rulesNote: '모음 축약 규칙：ㅎ탈락 후 앞 모음 ㅏ/ㅓ + 어미 아/어 → ㅐ로 축약。\n빨갛다（ㅏ）+ 아요 → 빨가+아요 → 빨개요\n파랗다（ㅏ）+ 아요 → 파라+아요 → 파래요\n어떻다（ㅓ）+ 어요 → 어떠+어요 → 어때요\n그렇다（ㅓ）+ 어요 → 그러+어요 → 그래요（그러+어→그래）\n하얗다 예외：하얗다 + 아요 → 하얘요（ㅑ+아→ㅒ 축약）',
    structures: [
      {
        ko: '하늘이 파래요',
        zh: '天空是蓝色的。（파랗다→파래요）',
        tokens: [
          { text: '하늘이', role: 'subject' },
          { text: '파래요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨 어때요?',
        zh: '今天天气怎么样？（어떻다→어때요）',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨', role: 'subject' },
          { text: '어때요?', role: 'verb' },
        ],
      },
      {
        ko: '빨간 장미를 샀어요',
        zh: '买了红色的玫瑰。（빨갛다+ㄴ→빨간）',
        tokens: [
          { text: '빨간', role: 'plain' },
          { text: '장미를', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
      },
      {
        ko: '그런 말은 하지 마세요',
        zh: '那种话不要说。（그렇다+ㄴ→그런）',
        tokens: [
          { text: '그런 말은', role: 'subject' },
          { text: '하지 마세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅎ脱落：ㅎ词干 + 모음 어미（아/어，은）→ ㅎ탈락 + 모음 축약', examples: '빨갛다→빨개요 / 파랗다→파래요 / 어떻다→어때요 / 그렇다→그래요' },
      { type: 'rule', text: '관형형：ㅎ词干 + -(으)ㄴ → ㅎ탈락（색깔 형용사 관형형）', examples: '빨갛다→빨간 / 파랗다→파란 / 노랗다→노란 / 하얗다→하얀 / 까맣다→까만' },
      { type: 'rule', text: 'ㅎ保留：ㅎ词干 + 자음 어미（고/지/면/다/네）→ ㅎ그대로', examples: '빨갛고（并且红）/ 어떻지（怎么样嘛）/ 그렇다면（如果那样）' },
      { type: 'usage', text: '색깔 형용사 관형형 정리（ㅎ탈락+ㄴ）', examples: '빨간 가방 / 파란 하늘 / 노란 꽃 / 하얀 눈 / 까만 밤' },
      { type: 'usage', text: '이렇다/그렇다/저렇다/어떻다 는 지시·의문 형용사로 활용 빈도 높음', examples: '이런 사람（这样的人）/ 그런 일（那样的事）/ 어떤 것（什么样的东西）/ 이래요/그래요/어때요' },
      { type: 'note', text: '하얗다 의 모음 축약：하얗+아요 → 하얘요（ㅑ+ㅏ→ㅒ），규칙과 동일하지만 결과가 다름', examples: '하얀 눈（白雪）/ 하얘요（是白色的）/ 하얗고（白色并且）' },
      { type: 'compare', text: 'ㅎ불규칙 vs ㄹ불규칙：ㅎ는 모음 어미 앞에서 탈락，ㄹ는 ㄴ/ㅂ/시/오 앞에서 탈락', examples: 'ㅎ：빨갛다→빨개요（모음앞탈락）/ ㄹ：알다→아세요（시앞탈락）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저 꽃', role: 'subject' },
          { text: '노래요', role: 'verb' },
        ],
        zh: '那朵花是黄色的。（노랗다→노래요，与名词 노래（歌）同音但无关）',
        swapWords: ['노래요', '노랗고 예뻐요', '노란 꽃이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이런 경우에는', role: 'plain' },
          { text: '어떻게 해요?', role: 'verb' },
        ],
        zh: '这种情况怎么办？（이렇다+ㄴ→이런）',
        swapWords: ['이런 경우에는 어떻게 해요?', '그런 경우에는 어떻게 해요?', '어떤 경우에도 괜찮아요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '머리가', role: 'subject' },
          { text: '까매요', role: 'verb' },
        ],
        zh: '头发是黑色的。（까맣다→까매요）',
        swapWords: ['까매요', '까맣고 길어요', '까만 머리예요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 꽃은', role: 'subject' },
          { text: '노랗고', role: 'plain' },
          { text: '예뻐요', role: 'verb' },
        ],
        zh: '这朵花是黄色的，很漂亮。（노랗고，ㅎ保留）',
        swapWords: ['노랗고 예뻐요', '빨갛고 예뻐요', '하얗고 예뻐요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🌈', context: '颜色描述', ko: '가을 하늘이 파랗고 높아요.', zh: '秋天的天空蓝而高。（파랗고，ㅎ保留）' },
      { icon: '🎵', context: 'KPOP 앨범', ko: '이번 앨범 어때요? 정말 좋아요!', zh: '这次专辑怎么样？真的很好！' },
      { icon: '🌸', context: '花卉描述', ko: '노란 꽃이 활짝 피었어요.', zh: '黄色的花盛开了。（노랗다+ㄴ→노란）' },
      { icon: '❄️', context: '冬天描述', ko: '눈이 와서 온 세상이 하얘요.', zh: '下雪了，整个世界都是白色的。（하얗다→하얘요）' },
      { icon: '💬', context: '日常询问', ko: 'A: 오늘 기분 어때요? B: 그냥 그래요.', zh: 'A：今天心情怎么样？B：就那样。（그렇다→그래요）' },
      { icon: '🌙', context: '夜晚描述', ko: '밤하늘이 까맣고 별이 많아요.', zh: '夜空黑黑的，星星很多。（까맣고，ㅎ保留）' },
    ],
    mistakes: [
      { wrong: '파랗아요', correct: '파래요', note: 'ㅎ词干 + 아/어요 시，ㅎ 탈락 후 모음 축약：파랗+아요→파라+아요→파래요。' },
      { wrong: '빨강은 가방', correct: '빨간 가방', note: 'ㅎ词干 관형형：빨갛다+ㄴ→빨간。빨강 은 명사（红色），관형형 아님。' },
      { wrong: '어떻아요?', correct: '어때요?', note: '어떻다+어요→어떠+어요→어때요。ㅎ탈락 후 ㅓ+어→ㅐ 축약。' },
      { wrong: '그렇은 사람', correct: '그런 사람', note: 'ㅎ词干 + -(으)ㄴ 관형형：그렇다+ㄴ→그런（ㅎ탈락，받침없어서 은 아닌 ㄴ 직접 결합）。' },
    ],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 第7课</div><div class="ov-hero-title">"ㅎ" 的不规则音变</div><div class="ov-hero-sub">ㅎ词干形容词在모음 어미 앞에서의 변화 규칙</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">核心规则</div></div><div class="ov-block"><div class="badge">ㅎ탈락+축약</div><div class="ko">ㅎ词干 + 아/어요 → ㅎ脱落 + 모음 축약</div><div class="zh">빨갛다→빨개요 / 어떻다→어때요</div></div><div class="ov-block"><div class="badge">ㅎ보존</div><div class="ko">ㅎ词干 + 고/지/면/다 → ㅎ保留</div><div class="zh">빨갛고 / 어떻지 / 그렇다면</div></div></div></div>`,
    step0Html: `<div class="step0-hook"><div class="hook-box"><div class="hook-sent"><span class="ko">하늘이 파래요.</span><span class="zh">天空是蓝的。（파랗다→파래요，ㅎ脱落）</span></div><div class="hook-sent"><span class="ko">오늘 날씨 어때요?</span><span class="zh">今天天气怎么样？（어떻다→어때요，ㅎ脱落）</span></div></div></div>`,
    compareLabel: 'ㅎ脱落 vs ㅎ保留',
    compareHtml: `<div class="compare"><div class="cmp-block" style="border-left:4px solid #ff7fa8"><div class="cmp-title">ㅎ脱落（모음 어미 앞）</div><div class="cmp-row"><span class="badge">조건</span>아/어，은，을 로 시작하는 어미</div><div class="cmp-row"><span class="ko">빨갛다 + 아요 → 빨개요</span><span class="zh">ㅎ脱落+ㅏ축약→ㅐ</span></div><div class="cmp-row"><span class="ko">파랗다 + 은 → 파란</span><span class="zh">ㅎ脱落（관형형）</span></div></div><div class="cmp-block" style="border-left:4px solid #aee3d8"><div class="cmp-title">ㅎ保留（자음 어미 앞）</div><div class="cmp-row"><span class="badge">조건</span>고，지，면，다，네 로 시작하는 어미</div><div class="cmp-row"><span class="ko">빨갛다 + 고 → 빨갛고</span><span class="zh">ㅎ保留</span></div><div class="cmp-row"><span class="ko">어떻다 + 지 → 어떻지</span><span class="zh">ㅎ保留</span></div></div></div>`,
    quickTable: {
      title: 'ㅎ 불규칙 변화 정리',
      headers: ['원형', '-아/어요', '-(으)ㄴ（관형형）', '-고（보존）'],
      rows: [
        [{ ko: '빨갛다', zh: '红' }, { ko: '빨개요', zh: '' }, { ko: '빨간', zh: '' }, { ko: '빨갛고', zh: '' }],
        [{ ko: '파랗다', zh: '蓝' }, { ko: '파래요', zh: '' }, { ko: '파란', zh: '' }, { ko: '파랗고', zh: '' }],
        [{ ko: '어떻다', zh: '怎样' }, { ko: '어때요', zh: '' }, { ko: '어떤', zh: '' }, { ko: '어떻고', zh: '' }],
        [{ ko: '그렇다', zh: '那样' }, { ko: '그래요', zh: '' }, { ko: '그런', zh: '' }, { ko: '그렇고', zh: '' }],
        [{ ko: '하얗다', zh: '白' }, { ko: '하얘요', zh: '' }, { ko: '하얀', zh: '' }, { ko: '하얗고', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '"ㅎ" 的不规则音变',
      body: '测试ㅎ词干形容词的变化规则',
      questions: [
        {
          prompt: '파랗다 + -아요 = ?',
          options: ['파래요', '파랗아요', '파라요', '파랬어요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ탈락 후 ㅏ+아→ㅐ 축약：파랗+아요→파래요',
        },
        {
          prompt: '빨갛다의 관형형（ㄴ）은?',
          options: ['빨간', '빨갛은', '빨강', '빨개'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ탈락 관형형：빨갛다+ㄴ→빨간',
        },
        {
          prompt: '어떻다 + -고 = ?（ㅎ 보존）',
          options: ['어떻고', '어때고', '어떠고', '어떻어고'],
          answer: 0 as 0|1|2|3,
          explanation: '자음 어미 앞에서는 ㅎ 보존：어떻다+고→어떻고',
        },
        {
          prompt: '그렇다 + -아/어요 = ?',
          options: ['그래요', '그렇어요', '그러요', '그렇아요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ탈락 후 ㅓ+어→ㅐ 축약：그렇+어요→그러+어요→그래요',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p12-l08',
    partNumber: 12,
    lessonNumber: 8,
    title: '综合练习⑫',
    isPractice: true,
    whatItDoes: 'P12 全课语法综合复习',
    whatItDoesBody: '复习 P12 所有语法点：-을/ㄹ 테니까，-(이)든지，-(으)려고 하다/가다/오다，-(으)려고 했다，-지 그랬어요?，겸，-은/ㄴ 김에，(어)치，짜리，에，ㄹ 불규칙，ㅎ 불규칙。',
    structureNote: '',
    rulesNote: '',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    overviewHtml: `<div class="overview"><div class="ov-hero"><div class="ov-hero-label">P12 · 综合练习</div><div class="ov-hero-title">综合练习⑫</div><div class="ov-hero-sub">P12 全课复习</div></div><div class="ov-section"><div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本册复习要点</div></div><div class="ov-block"><div class="badge">意图表达</div><div class="ko">-을/ㄹ 테니까 / -(으)려고 했다 / -지 그랬어요?</div></div><div class="ov-block"><div class="badge">量词价格</div><div class="ko">(어)치 / 짜리 / 에</div></div><div class="ov-block"><div class="badge">不规则변화</div><div class="ko">ㄹ 불규칙 / ㅎ 불규칙</div></div></div></div>`,
    step0Html: '',
    compareLabel: '',
    compareHtml: '',
    quickTable: {
      title: '',
      headers: [],
      rows: [],
    },
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑫',
      body: 'P12 语法综合测试',
      questions: [
        {
          prompt: '我来付钱，你不用担心。→ 제가 낼 ___ 걱정하지 마세요',
          options: ['테니까', '거니까', '려고', '는데'],
          answer: 0 as 0|1|2|3,
          explanation: '-을/ㄹ 테니까：说话人意图作为前提，后接命令/请求',
        },
        {
          prompt: '本来打算早起，但没听到闹钟。→ 일찍 일어나___ 했는데 알람을 못 들었어요',
          options: ['려고', '으려고', '기로', '고자'],
          answer: 0 as 0|1|2|3,
          explanation: '일어나다 无收音 → 일어나려고 했는데',
        },
        {
          prompt: '你为什么不坐地铁呢？→ 지하철을 타___ 그랬어요?',
          options: ['지', '려고', '면', '서'],
          answer: 0 as 0|1|2|3,
          explanation: '-지 그랬어요? 前接动词词干：타지 그랬어요?',
        },
        {
          prompt: '趁着来首尔，顺便去了博物馆。→ 서울에 ___ 김에 박물관도 갔어요',
          options: ['온', '오는', '올', '와서'],
          answer: 0 as 0|1|2|3,
          explanation: '오다 무받침 과거 관형형：오+ㄴ=온 → 서울에 온 김에',
        },
        {
          prompt: '买了一万韩元的零食。→ 만 원___ 과자를 샀어요',
          options: ['어치', '짜리', '에', '치'],
          answer: 0 as 0|1|2|3,
          explanation: '금액만큼의 분량 → (어)치：만 원어치',
        },
        {
          prompt: '살다 + -(으)세요 = ?（ㄹ 불규칙）',
          options: ['사세요', '살으세요', '살세요', '살아세요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㄹ词干 + 시 시작 어미 → ㄹ 탈락：살다→사세요',
        },
        {
          prompt: '파랗다 + -아요 = ?（ㅎ 불규칙）',
          options: ['파래요', '파랗아요', '파라요', '파랬어요'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ탈락 후 ㅏ+아→ㅐ 축약：파랗+아요→파래요',
        },
        {
          prompt: '어떻다의 관형형（ㄴ）은?',
          options: ['어떤', '어떻은', '어때', '어떻는'],
          answer: 0 as 0|1|2|3,
          explanation: 'ㅎ탈락 관형형：어떻다+ㄴ→어떤',
        },
      ],
    },
    linkedGrammarIds: ['card-p12-l01', 'card-p12-l02', 'card-p12-l03', 'card-p12-l04', 'card-p12-l05', 'card-p12-l06', 'card-p12-l07'],
  },
];
