import type { GrammarCard } from '@/types';

export const grammarCardsP15: GrammarCard[] = [
  // ── 第1课：주체높임법 -(으)시- ──────────────────────────────────────
  {
    id: 'card-p15-l01',
    partNumber: 15,
    lessonNumber: 1,
    title: '주체높임법 -(으)시-',
    whatItDoes: '主体尊敬',
    whatItDoesBody: '주체높임 是韩语敬语体系的核心：在动词/形容词词干加 -(으)시-，抬高句子主语（长辈/上司/客户）。有받침 -으시-，无받침 -시-。句尾时态与 -시- 融合：现재 -세요/-십니다，过去 -셨어요/-셨습니다。',
    structureNote: '动词/形容词词干 + -(으)시- + 语尾｜有받침 -으시- / 无받침 -시-',
    rulesNote: '现在 -세요/-십니다｜过去 -셨어요/-셨습니다｜将来 -실 거예요｜请求 -(으)세요',
    structures: [
      {
        ko: '아버지는 지금 신문을 읽으세요.',
        zh: '父亲现在正在看报。',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '신문을', role: 'object' },
          { text: '읽으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 어제 학교에 오셨어요.',
        zh: '老师昨天来学校了。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '어제', role: 'time' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
      },
      {
        ko: '할머니는 내일 병원에 가실 거예요.',
        zh: '奶奶明天要去医院。',
        tokens: [
          { text: '할머니는', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '병원에', role: 'place' },
          { text: '가실 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침词干 → -으시-', examples: '읽다 → 읽으시다 → 읽으세요' },
      { type: 'rule', text: '无받침词干 → -시-', examples: '가다 → 가시다 → 가세요' },
      { type: 'rule', text: '过去时：-(으)시- + -었- → -(으)셨-', examples: '오다 → 오시다 → 오셨어요' },
      { type: 'rule', text: '将来时：-(으)실 거예요', examples: '가다 → 가실 거예요' },
      { type: 'usage', text: '请求 -(으)세요 也是 -시- 的应用', examples: '앉으세요 / 드세요' },
      { type: 'compare', text: '普通 vs 주체높임', examples: '(普通) 아버지가 신문을 읽어요 / (높임) 아버지가 신문을 읽으세요' },
      { type: 'note', text: '不能对第一人称"我"用 -(으)시-', examples: '误：저는 갔으세요 / 正：저는 갔어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '신문을', role: 'object' },
          { text: '읽으세요', role: 'verb' },
        ],
        zh: '父亲在看报。',
        swapWords: ['아버지', '어머니', '할아버지', '선생님'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '어제', role: 'time' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
        zh: '老师昨天来学校。',
        swapWords: ['오다', '가다', '도착하다', '들어오다'],
      },
      {
        wordBlocks: [
          { text: '할머니는', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '병원에', role: 'place' },
          { text: '가실 거예요', role: 'verb' },
        ],
        zh: '奶奶明天去医院。',
        swapWords: ['병원', '시장', '교회', '공원'],
      },
    ],
    scenarios: [
      { icon: '📰', context: '看报', ko: '아버지는 신문을 읽으세요.', zh: '父亲在读报。' },
      { icon: '🏫', context: '到校', ko: '선생님이 학교에 오셨어요.', zh: '老师到学校了。' },
      { icon: '🏥', context: '就医', ko: '할머니는 병원에 가실 거예요.', zh: '奶奶要去医院。' },
      { icon: '🍚', context: '用餐', ko: '아버지가 밥을 드세요.', zh: '父亲在用餐。' },
      { icon: '📚', context: '教学', ko: '교수님이 강의를 하세요.', zh: '教授在讲课。' },
      { icon: '💤', context: '就寝', ko: '할아버지는 벌써 주무세요.', zh: '爷爷已经就寝了。' },
    ],
    mistakes: [
      { wrong: '아버지가 신문을 읽어요', correct: '아버지가 신문을 읽으세요', note: '对长辈需加 -(으)시-' },
      { wrong: '선생님이 어제 왔어요', correct: '선생님이 어제 오셨어요', note: '过去时也要加 -(으)셨-' },
      { wrong: '저는 갔으세요', correct: '저는 갔어요', note: '不能对"我"自己用 -시-' },
    ],
    quickTable: {
      title: '주체높임 时态变化',
      headers: ['时态', '普通', '높임'],
      rows: [
        ['现在', '가요', '가세요'],
        ['现在', '읽어요', '읽으세요'],
        ['过去', '갔어요', '가셨어요'],
        ['过去', '읽었어요', '읽으셨어요'],
        ['将来', '갈 거예요', '가실 거예요'],
        ['请求', '가요', '가세요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '주체높임 -(으)시- 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '선생님이 어제 학교에 (오다) 어요.',
          options: ['왔어요', '오셨어요', '오세요', '오시었어요'],
          answer: 1,
          explanation: '오다 + -시- + -었어요 → 오셨어요。',
        },
        {
          prompt: '아버지는 신문을 (읽다) 세요.',
          options: ['읽으', '읽어', '읽으시', '읽'],
          answer: 0,
          explanation: '읽다（有받침）→ -으시- → 읽으세요。',
        },
        {
          prompt: '할머니는 내일 병원에 (가다) 거예요.',
          options: ['갈', '가실', '가시는', '갔을'],
          answer: 1,
          explanation: '将来 -(으)ㄹ 거예요 → 高级 -(으)실 거예요 → 가실 거예요。',
        },
        {
          prompt: '下列句子哪个用错了 -(으)시-？',
          options: [
            '아버지가 신문을 읽으세요.',
            '저는 학교에 가셨어요.',
            '선생님이 강의를 하세요.',
            '할머니는 주무세요.',
          ],
          answer: 1,
          explanation: '不能对"我 저"自己用 -(으)시-；应改为 저는 학교에 갔어요。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l02', 'card-p15-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">对长辈/上司/客户说话时，动词要"抬高"：加 <b>-(으)시-</b>。<br>있다→계시다？"这是特殊尊敬词。本课先学万能通配公式：<b>词干 + -(으)시-</b>。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 주체높임</b><br>
    ・普通：<br>
    <span style="color:#89756e">아버지가 신문을 읽어요.</span><br>
    ・높임：<br>
    <span style="color:#89756e">아버지가 신문을 읽으세요.</span>
  </div>
</div>`,
    compareLabel: '普通 vs 높임',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">주체높임법 -(으)시-</div>
  <div style="font-size:14px;color:#89756e">抬高主语（长辈/上司/客户）</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">时态变化</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      现在 → <b>-(으)세요 / -십니다</b><br>
      过去 → <b>-(으)셨어요 / -(으)셨습니다</b><br>
      将来 → <b>-(으)실 거예요</b><br>
      请求 → <b>-(으)세요</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 갔으세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 갔어요（不对自己用）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아버지가 신문을 읽어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아버지가 신문을 읽으세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：주체높임 特殊词汇 ──────────────────────────────────────
  {
    id: 'card-p15-l02',
    partNumber: 15,
    lessonNumber: 2,
    title: '주체높임 特殊词汇',
    whatItDoes: '特殊尊敬词',
    whatItDoesBody: '一些高频动词/形容词的敬语形式不是加 -(으)시-，而是换成另一个词：있다→계시다（在）、먹다/마시다→드시다·잡수시다（用膳）、자다→주무시다（就寝）、죽다→돌아가시다（去世）、말하다→말씀하시다（讲话）、아프다→편찮으시다（欠安）。这些是必背清单。',
    structureNote: '不加 -시-，直接换特殊词｜多为身体活动/生命状态相关动词',
    rulesNote: '있다→계시다/있으시다｜먹다→드시다｜자다→주무시다｜말하다→말씀하시다｜아프다→편찮으시다｜죽다→돌아가시다',
    structures: [
      {
        ko: '할아버지는 지금 방에 계세요.',
        zh: '爷爷现在在房间里。',
        tokens: [
          { text: '할아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '방에', role: 'place' },
          { text: '계세요', role: 'verb' },
        ],
      },
      {
        ko: '어머니께서는 이미 저녁을 드셨어요.',
        zh: '母亲已经用过晚餐了。',
        tokens: [
          { text: '어머니께서는', role: 'subject' },
          { text: '이미', role: 'time' },
          { text: '저녁을', role: 'object' },
          { text: '드셨어요', role: 'verb' },
        ],
      },
      {
        ko: '아버지는 일찍 주무세요.',
        zh: '父亲很早就寝。',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '일찍', role: 'time' },
          { text: '주무세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '있다 → 계시다（在／人存在）｜있으시다（有／所有）', examples: '할아버지가 계세요 / 시간이 있으세요?' },
      { type: 'rule', text: '먹다·마시다 → 드시다 / 잡수시다', examples: '어머니가 저녁을 드세요 / 할머니가 잡수세요' },
      { type: 'rule', text: '자다 → 주무시다', examples: '아버지는 일찍 주무세요' },
      { type: 'rule', text: '말하다 → 말씀하시다', examples: '선생님께서 말씀하세요' },
      { type: 'rule', text: '아프다 → 편찮으시다', examples: '어머니께서 편찮으세요' },
      { type: 'rule', text: '죽다 → 돌아가시다', examples: '할아버지께서 작년에 돌아가셨어요' },
      { type: 'usage', text: '有些动词有"人높임（계시다）"和"物높임（있으시다）"两种', examples: '(人在) 계시다 / (有钱) 돈이 있으시다' },
      { type: 'note', text: '存在动词区分：人 → 계시다，物 → 있으시다', examples: '아버지가 계세요.（在） / 시간이 있으세요?（有）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '할아버지는', role: 'subject' },
          { text: '방에', role: 'place' },
          { text: '계세요', role: 'verb' },
        ],
        zh: '爷爷在房间。',
        swapWords: ['방', '거실', '서재', '마당'],
      },
      {
        wordBlocks: [
          { text: '어머니께서는', role: 'subject' },
          { text: '저녁을', role: 'object' },
          { text: '드셨어요', role: 'verb' },
        ],
        zh: '母亲用晚餐了。',
        swapWords: ['저녁', '아침', '점심', '식사'],
      },
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '일찍', role: 'time' },
          { text: '주무세요', role: 'verb' },
        ],
        zh: '父亲早就寝。',
        swapWords: ['일찍', '이미', '벌써', '늘'],
      },
    ],
    scenarios: [
      { icon: '🏠', context: '在家', ko: '할아버지는 방에 계세요.', zh: '爷爷在房间。' },
      { icon: '🍚', context: '用餐', ko: '어머니께서 저녁을 드세요.', zh: '母亲在用餐。' },
      { icon: '💤', context: '就寝', ko: '아버지는 일찍 주무세요.', zh: '父亲早就寝。' },
      { icon: '🎤', context: '讲话', ko: '선생님이 말씀하세요.', zh: '老师在讲话。' },
      { icon: '🤒', context: '欠安', ko: '어머니가 편찮으세요.', zh: '母亲身体欠安。' },
      { icon: '🕊️', context: '去世', ko: '할아버지가 작년에 돌아가셨어요.', zh: '爷爷去年去世了。' },
    ],
    mistakes: [
      { wrong: '할아버지가 방에 있으세요', correct: '할아버지가 방에 계세요', note: '"人在"用 계시다，不用 있으시다' },
      { wrong: '어머니가 밥을 먹으세요', correct: '어머니가 밥을 드세요', note: '"用餐"是 드시다，不是 먹으시다' },
      { wrong: '아버지가 자세요', correct: '아버지가 주무세요', note: '"就寝"是 주무시다，不是 자시다' },
      { wrong: '어머니가 아프세요', correct: '어머니가 편찮으세요', note: '对长辈"欠安"用 편찮으시다' },
    ],
    quickTable: {
      title: '주체높임 特殊词汇速查',
      headers: ['普通', '높임', '语义'],
      rows: [
        ['있다（人）', '계시다', '（人）在'],
        ['있다（物）', '있으시다', '（物）有'],
        ['먹다/마시다', '드시다 / 잡수시다', '用膳'],
        ['자다', '주무시다', '就寝'],
        ['말하다', '말씀하시다', '讲话'],
        ['아프다', '편찮으시다', '身体欠安'],
        ['죽다', '돌아가시다', '去世'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '주체높임 特殊词汇 练习',
      body: '选择正确的敬语',
      questions: [
        {
          prompt: '할아버지는 지금 방에 (   ).',
          options: ['있어요', '있으세요', '계세요', '있어시요'],
          answer: 2,
          explanation: '"（人）在" → 계시다 → 계세요。있으시다 用于"（物/事）有"。',
        },
        {
          prompt: '어머니께서는 저녁을 (   ).',
          options: ['먹으세요', '먹어세요', '드셨어요', '잡숫어요'],
          answer: 2,
          explanation: '"用餐" → 드시다 / 잡수시다；过去 → 드셨어요。',
        },
        {
          prompt: '"父亲早睡" 最合适的敬语？',
          options: ['아버지가 일찍 자세요', '아버지가 일찍 주무세요', '아버지가 일찍 잠으세요', '아버지가 일찍 자시어요'],
          answer: 1,
          explanation: '"就寝"用 주무시다 → 주무세요。',
        },
        {
          prompt: '"人在"的敬语和"物/事有"的敬语分别是？',
          options: [
            '계시다 / 계시다',
            '계시다 / 있으시다',
            '있으시다 / 계시다',
            '있으시다 / 있으시다',
          ],
          answer: 1,
          explanation: '人 → 계시다（存在）；物/事 → 있으시다（拥有）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">高频动词的尊敬形不是加 -(으)시-，而是<b>换词</b>：<br>있다→계시다（在）· 먹다→드시다（用膳）· 자다→주무시다（就寝）· 말하다→말씀하시다· 아프다→편찮으시다· 죽다→돌아가시다。<br>这些是韩语敬语的"必背清单"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>있다 → 계시다 / 있으시다</b><br>
    ・人存在 → 계시다<br>
    <span style="color:#89756e">할아버지가 방에 계세요.</span><br>
    ・物/事持有 → 있으시다<br>
    <span style="color:#89756e">시간이 있으세요?</span>
  </div>
</div>`,
    compareLabel: '계시다 vs 있으시다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">주체높임 特殊词汇</div>
  <div style="font-size:14px;color:#89756e">6 大必背换词</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">必背清单</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      있다（人）→ 계시다<br>
      있다（物）→ 있으시다<br>
      먹다/마시다 → 드시다 / 잡수시다<br>
      자다 → 주무시다<br>
      말하다 → 말씀하시다<br>
      아프다 → 편찮으시다<br>
      죽다 → 돌아가시다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할아버지가 있으세요（人）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할아버지가 계세요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아버지가 자세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아버지가 주무세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：객체높임 特殊动词 ──────────────────────────────────────
  {
    id: 'card-p15-l03',
    partNumber: 15,
    lessonNumber: 3,
    title: '객체높임 特殊动词',
    whatItDoes: '客体尊敬',
    whatItDoesBody: '객체높임 抬高动作"接受者"（宾语/间接宾语）。这类动词多是"给/见/问/带"这些涉及"对方"的动词：주다→드리다（给长辈）、보다→뵙다（拜见）、묻다→여쭙다（请教）、데리다→모시다（陪同）。',
    structureNote: '换成特殊动词｜受动者用 -께 助词｜多与 주체높임 -시- 一起用',
    rulesNote: '주다→드리다｜보다/만나다→뵙다·뵈다｜묻다→여쭙다·여쭈다｜데리다→모시다',
    structures: [
      {
        ko: '선생님께 선물을 드렸어요.',
        zh: '给老师送了礼物。',
        tokens: [
          { text: '선생님께', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
      },
      {
        ko: '내일 부모님을 뵙기로 했어요.',
        zh: '明天要去拜见父母。',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '부모님을', role: 'object' },
          { text: '뵙기로 했어요', role: 'verb' },
        ],
      },
      {
        ko: '교수님께 궁금한 것을 여쭤봤어요.',
        zh: '向教授请教了不懂的地方。',
        tokens: [
          { text: '교수님께', role: 'plain' },
          { text: '궁금한 것을', role: 'object' },
          { text: '여쭤봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '주다 → 드리다（给长辈/上级）', examples: '선생님께 선물을 드렸어요.' },
      { type: 'rule', text: '보다/만나다 → 뵙다·뵈다（拜见）', examples: '내일 부모님을 뵙기로 했어요.' },
      { type: 'rule', text: '묻다 → 여쭙다·여쭈다（请教）', examples: '교수님께 여쭤봤어요.' },
      { type: 'rule', text: '데리다 → 모시다（陪同长辈）', examples: '할머니를 병원에 모시고 갔어요.' },
      { type: 'usage', text: '客体接受者助词 -에게 → -께', examples: '친구에게 → 선생님께' },
      { type: 'compare', text: '주체높임 vs 객체높임', examples: '(주체) 아버지가 오세요.（主语被抬高）/ (객체) 아버지께 선물을 드렸어요.（宾语被抬高）' },
      { type: 'note', text: '뵙다 是最正式的拜见（初次见面/正式场合）；뵈다 略随和', examples: '처음 뵙겠습니다.（初次见面）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님께', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
        zh: '给老师送礼。',
        swapWords: ['선물', '꽃', '편지', '음식'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '부모님을', role: 'object' },
          { text: '뵙기로 했어요', role: 'verb' },
        ],
        zh: '明天拜见父母。',
        swapWords: ['부모님', '조부모님', '스승님', '어른'],
      },
      {
        wordBlocks: [
          { text: '교수님께', role: 'plain' },
          { text: '궁금한 것을', role: 'object' },
          { text: '여쭤봤어요', role: 'verb' },
        ],
        zh: '向教授请教。',
        swapWords: ['여쭈다', '물어보다', '문의하다', '질문하다'],
      },
    ],
    scenarios: [
      { icon: '🎁', context: '送礼', ko: '선생님께 선물을 드렸어요.', zh: '给老师送礼。' },
      { icon: '🤝', context: '拜见', ko: '부모님을 뵙기로 했어요.', zh: '拜见父母。' },
      { icon: '❓', context: '请教', ko: '교수님께 여쭤봤어요.', zh: '向教授请教。' },
      { icon: '🏥', context: '陪同', ko: '할머니를 병원에 모시고 갔어요.', zh: '陪奶奶去医院。' },
      { icon: '💌', context: '致函', ko: '사장님께 이메일을 드렸어요.', zh: '给社长发邮件。' },
      { icon: '🕊️', context: '首次拜见', ko: '처음 뵙겠습니다.', zh: '初次见面。' },
    ],
    mistakes: [
      { wrong: '선생님에게 선물을 주었어요', correct: '선생님께 선물을 드렸어요', note: '给长辈 → 드리다 + 助词 -께' },
      { wrong: '부모님을 봐요', correct: '부모님을 뵈요 / 뵙겠습니다', note: '"拜见"是 뵙다 / 뵈다' },
      { wrong: '교수님에게 물어봤어요', correct: '교수님께 여쭤봤어요', note: '"请教"是 여쭙다 / 여쭈다 + 助词 -께' },
      { wrong: '할머니를 병원에 데려갔어요', correct: '할머니를 병원에 모시고 갔어요', note: '"陪同长辈"用 모시다' },
    ],
    quickTable: {
      title: '객체높임 特殊动词',
      headers: ['普通', '높임', '语义'],
      rows: [
        ['주다', '드리다', '给（长辈）'],
        ['보다·만나다', '뵙다·뵈다', '拜见'],
        ['묻다', '여쭙다·여쭈다', '请教'],
        ['데리다', '모시다', '陪同'],
        ['助词 -에게', '-께', '给（受尊者）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '객체높임 特殊动词 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '선생님(   ) 선물을 (   ).',
          options: ['에게 / 주었어요', '께 / 드렸어요', '에 / 드렸어요', '한테 / 주셨어요'],
          answer: 1,
          explanation: '给长辈用 -께 + 드리다 → 선생님께 드렸어요。',
        },
        {
          prompt: '내일 부모님을 (   ).',
          options: ['봐요', '뵙기로 했어요', '보시기로 했어요', '보아 드려요'],
          answer: 1,
          explanation: '"拜见"是 뵙다 → 뵙기로 했어요。',
        },
        {
          prompt: '교수님(   ) 궁금한 것을 여쭤봤어요.',
          options: ['에게', '한테', '께', '한테서'],
          answer: 2,
          explanation: '"请教长辈"必须用 -께。',
        },
        {
          prompt: '주체높임 与 객체높임 的核心区别？',
          options: [
            '完全相同',
            '주체높임 抬高主语（-시-）；객체높임 抬高宾语/间接宾语（换词+-께）',
            '주체높임 用于口语，객체높임 用于书面',
            '주체높임 是过去时，객체높임 是现在时',
          ],
          answer: 1,
          explanation: '주체（主语）+ -시-；객체（宾语/间接宾语）+ 特殊换词 + -께。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">주체높임抬高"主语"，객체높임抬高"接受者"。<br>주다→<b>드리다</b>（给长辈）· 보다→<b>뵙다</b>（拜见）· 묻다→<b>여쭙다</b>（请教）· 데리다→<b>모시다</b>（陪同）。<br>受尊敬的接受者助词从 -에게 变成 <b>-께</b>。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>주체 vs 객체</b><br>
    ・주체（主语）→ -(으)시-<br>
    <span style="color:#89756e">아버지가 오세요.</span><br>
    ・객체（受动者）→ 换词 + -께<br>
    <span style="color:#89756e">아버지께 선물을 드렸어요.</span>
  </div>
</div>`,
    compareLabel: '주체 vs 객체',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">객체높임 特殊动词</div>
  <div style="font-size:14px;color:#89756e">抬高接受者</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">必背换词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      주다 → 드리다（给）<br>
      보다 → 뵙다·뵈다（拜见）<br>
      묻다 → 여쭙다·여쭈다（请教）<br>
      데리다 → 모시다（陪同）<br>
      助词 -에게 → -께
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선생님에게 주었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선생님께 드렸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할머니를 데려갔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할머니를 모시고 갔어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：높임 조사 -께서 · -께 · -님 ──────────────────────────────────────
  {
    id: 'card-p15-l04',
    partNumber: 15,
    lessonNumber: 4,
    title: '높임 조사 -께서·-께·-님',
    whatItDoes: '尊敬助词',
    whatItDoesBody: '敬语系统的助词升级：主语的 -이/가 → -께서；给的对象 -에게 → -께；名词加 -님 表尊称。三者配合动词 -시- 或换词，构成完整敬语句。',
    structureNote: '主语 -이/가 → -께서｜给 -에게 → -께｜N + -님',
    rulesNote: '-께서 与 -이/가 语法功能同（主语标记）｜-께 与 -에게 同（间接宾语）｜-님 加在人称名词后',
    structures: [
      {
        ko: '선생님께서 학교에 오셨어요.',
        zh: '老师来学校了。',
        tokens: [
          { text: '선생님께서', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
      },
      {
        ko: '사장님께 보고서를 드렸어요.',
        zh: '给社长交了报告。',
        tokens: [
          { text: '사장님께', role: 'plain' },
          { text: '보고서를', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
      },
      {
        ko: '교수님께서는 항상 자상하세요.',
        zh: '教授总是那么细心亲切。',
        tokens: [
          { text: '교수님께서는', role: 'subject' },
          { text: '항상', role: 'time' },
          { text: '자상하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '主语 -이/가 → -께서', examples: '선생님이 오세요 → 선생님께서 오세요' },
      { type: 'rule', text: '话题 -은/는 → -께서는（可省 -는，只用 -께서）', examples: '교수님께서는 자상하세요' },
      { type: 'rule', text: '间接宾语 -에게 → -께', examples: '친구에게 → 선생님께' },
      { type: 'rule', text: '名词 + -님 表尊称', examples: '선생 → 선생님 / 사장 → 사장님 / 교수 → 교수님' },
      { type: 'usage', text: '-께서 常与 주체높임 -시- 搭配', examples: '선생님께서 오셨어요.' },
      { type: 'usage', text: '-께 常与 객체높임 드리다/여쭙다 搭配', examples: '선생님께 여쭤봤어요.' },
      { type: 'compare', text: '普通 vs 敬语助词', examples: '아버지가 오세요 → 아버지께서 오세요（更正式）' },
      { type: 'note', text: '日常口语中 -께서/-께 可省，用 -이/가/-에게 也可以，但正式场合必须用', examples: '(口语) 선생님이 오셨어요 / (正式) 선생님께서 오셨어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님께서', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
        zh: '老师来学校。',
        swapWords: ['선생님', '교수님', '사장님', '부장님'],
      },
      {
        wordBlocks: [
          { text: '사장님께', role: 'plain' },
          { text: '보고서를', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
        zh: '交报告给社长。',
        swapWords: ['보고서', '문서', '자료', '기획서'],
      },
      {
        wordBlocks: [
          { text: '교수님께서는', role: 'subject' },
          { text: '항상', role: 'time' },
          { text: '자상하세요', role: 'verb' },
        ],
        zh: '教授一贯亲切。',
        swapWords: ['자상하다', '친절하다', '엄격하다', '유머러스하다'],
      },
    ],
    scenarios: [
      { icon: '👨‍🏫', context: '正式到访', ko: '선생님께서 학교에 오셨어요.', zh: '老师来学校。' },
      { icon: '📋', context: '汇报', ko: '사장님께 보고서를 드렸어요.', zh: '给社长报告。' },
      { icon: '💐', context: '性格描述', ko: '교수님께서는 자상하세요.', zh: '教授亲切。' },
      { icon: '🍽️', context: '用餐', ko: '아버님께서 식사를 하세요.', zh: '父亲用餐。' },
      { icon: '📧', context: '致函', ko: '팀장님께 이메일을 드렸어요.', zh: '给组长发邮件。' },
      { icon: '👨‍💼', context: '尊称', ko: '박 사장님을 뵈러 왔습니다.', zh: '来拜见朴社长。' },
    ],
    mistakes: [
      { wrong: '선생님이 오셨어요', correct: '선생님께서 오셨어요', note: '正式敬语中主语用 -께서（-이/가 只用于口语）' },
      { wrong: '사장님에게 보고서를 드렸어요', correct: '사장님께 보고서를 드렸어요', note: '给尊者用 -께，不用 -에게' },
      { wrong: '선생 오셨어요', correct: '선생님 오셨어요', note: '人称名词需加 -님' },
    ],
    quickTable: {
      title: '敬语助词对照',
      headers: ['普通', '敬语', '用法'],
      rows: [
        ['-이/가', '-께서', '主语'],
        ['-은/는', '-께서는', '话题'],
        ['-에게 / 한테', '-께', '间接宾语'],
        ['N', 'N-님', '尊称'],
        ['이름', '성함', '姓名（尊称）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '敬语助词 练习',
      body: '选择正确助词',
      questions: [
        {
          prompt: '선생님(   ) 학교에 오셨어요.',
          options: ['이', '가', '께서', '으로'],
          answer: 2,
          explanation: '正式敬语主语用 -께서。',
        },
        {
          prompt: '사장님(   ) 보고서를 드렸어요.',
          options: ['에게', '한테', '께', '으로'],
          answer: 2,
          explanation: '给尊者用 -께。',
        },
        {
          prompt: '"教授总是很亲切" 最合适的敬语？',
          options: [
            '교수는 항상 자상해요',
            '교수님은 항상 자상해요',
            '교수님께서는 항상 자상하세요',
            '교수님이 항상 자상하세요',
          ],
          answer: 2,
          explanation: '正式敬语：-님 + -께서는 + -시-；最完整最尊敬。',
        },
        {
          prompt: '-께서 与 -이/가 的关系？',
          options: [
            '完全不同的助词',
            '-께서 是 -이/가 的敬语版，主语标记',
            '-께서 是宾语标记',
            '-께서 只用于问句',
          ],
          answer: 1,
          explanation: '-께서 是 -이/가 的敬语替换，仍是主语标记。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语不仅动词升级，助词也要升级：<br>主语 -이/가 → <b>-께서</b> · 给 -에게 → <b>-께</b> · 名词加 <b>-님</b>。<br>三者配合 -(으)시- 或换词，才是完整敬语句。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 敬语助词</b><br>
    ・普通：선생님이 친구에게 책을 주었어요.<br>
    ・敬语：선생님께서 친구에게 책을 주셨어요.<br>
    ・双敬语：선생님께서 학생에게 책을 주셨어요 / 학생이 선생님께 책을 드렸어요
  </div>
</div>`,
    compareLabel: '普通 vs 敬语',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">敬语助词 -께서 · -께 · -님</div>
  <div style="font-size:14px;color:#89756e">正式场合必备</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">对照表</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -이/가 → <b>-께서</b>（主语）<br>
      -은/는 → <b>-께서는</b>（话题）<br>
      -에게 → <b>-께</b>（间接宾语）<br>
      N → <b>N-님</b>（尊称）<br>
      이름 → <b>성함</b>（姓名尊称）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사장님에게 드렸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사장님께 드렸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선생 오셨어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선생님 오셨어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：청자높임 语体切换 -습니다/-어요/-어 ──────────────────────────────────────
  {
    id: 'card-p15-l05',
    partNumber: 15,
    lessonNumber: 5,
    title: '청자높임 语体切换',
    whatItDoes: '听者尊敬',
    whatItDoesBody: '청자높임 靠句尾语体表达对"听者"的尊敬程度，是韩语敬语的第三个维度。四大语体：하십시오체（最正式，-습니다）、해요체（正式亲切，-어요）、해체（半语，-어）、해라체（书面/命令）。选错语体就选错关系。',
    structureNote: '句尾语体 → 하십시오체 / 해요체 / 해체 / 해라체｜按听者身份切换',
    rulesNote: '하십시오체（-습니다/-십니다） · 해요체（-어요/-으세요） · 해체（-어/-야 · 半语） · 해라체（-는다/-어라）',
    structures: [
      {
        ko: '안녕하십니까? 저는 김민수입니다.',
        zh: '您好，我是金民秀。（최正式）',
        tokens: [
          { text: '안녕하십니까?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '김민수입니다', role: 'verb' },
        ],
      },
      {
        ko: '안녕하세요? 저는 민수예요.',
        zh: '你好，我是民秀。（正式亲切）',
        tokens: [
          { text: '안녕하세요?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '민수예요', role: 'verb' },
        ],
      },
      {
        ko: '안녕? 나는 민수야.',
        zh: '嗨，我是民秀。（半语）',
        tokens: [
          { text: '안녕?', role: 'verb' },
          { text: '나는', role: 'subject' },
          { text: '민수야', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '하십시오체（최正式）→ -습니다 / -십니다 / -십니까?', examples: '갑니다 / 가십니다 / 가십니까?' },
      { type: 'rule', text: '해요체（正式亲切）→ -어요 / -으세요', examples: '가요 / 가세요' },
      { type: 'rule', text: '해체（半语）→ -어 / -야', examples: '가 / 민수야' },
      { type: 'rule', text: '해라체（书面/命令）→ -는다 / -어라 / -자', examples: '간다 / 가라 / 가자' },
      { type: 'usage', text: '正式场合（会议/演讲/客户）→ 하십시오체', examples: '회의를 시작하겠습니다.' },
      { type: 'usage', text: '日常礼貌（对客气对象/工作）→ 해요체', examples: '주말에 뭐 하세요?' },
      { type: 'usage', text: '亲密关系（家人/朋友/晚辈）→ 해체', examples: '뭐 해? / 밥 먹었어?' },
      { type: 'compare', text: '同一意思，四种语体差别', examples: '갑니다 → 가요 → 가 → 간다' },
      { type: 'note', text: '语体不匹配会显得失礼或过于生分', examples: '对老板用 해체 → 失礼 / 对家人用 하십시오체 → 生分' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '안녕하십니까?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '김민수입니다', role: 'verb' },
        ],
        zh: '您好我是民秀（最正式）。',
        swapWords: ['입니다', '입니까', '됩니다', '갑니다'],
      },
      {
        wordBlocks: [
          { text: '안녕하세요?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '민수예요', role: 'verb' },
        ],
        zh: '你好我是民秀（亲切）。',
        swapWords: ['예요', '이에요', '이야', '입니다'],
      },
      {
        wordBlocks: [
          { text: '안녕?', role: 'verb' },
          { text: '나는', role: 'subject' },
          { text: '민수야', role: 'verb' },
        ],
        zh: '嗨我民秀（半语）。',
        swapWords: ['야', '이야', '이지', '이거든'],
      },
    ],
    scenarios: [
      { icon: '👔', context: '面试/演讲', ko: '안녕하십니까? 지원자 김민수입니다.', zh: '您好我是应聘者。' },
      { icon: '💼', context: '正式工作', ko: '주말에 뭐 하세요?', zh: '周末做什么？（正式亲切）' },
      { icon: '☕', context: '朋友聊天', ko: '주말에 뭐 해?', zh: '周末做什么？（半语）' },
      { icon: '📝', context: '书面报道', ko: '민수는 오늘 도착한다.', zh: '民秀今天到达（书面）。' },
      { icon: '📞', context: '客户电话', ko: '언제 도착하십니까?', zh: '您何时到达？（最正式）' },
      { icon: '👨‍👩‍👦', context: '家庭对话', ko: '엄마, 밥 먹었어?', zh: '妈，吃饭了吗？（半语）' },
    ],
    mistakes: [
      { wrong: '(对老板) 사장님, 저 가.', correct: '사장님, 저 갑니다 / 가겠습니다.', note: '对老板用 하십시오체 或 해요체，不用 해체' },
      { wrong: '(对家人) 어머니, 지금 어디에 계십니까?', correct: '어머니, 지금 어디에 계세요?', note: '家人平常用 해요체 就够，하십시오체 显生分' },
      { wrong: '아빠, 어디에 가십니까?', correct: '아빠, 어디에 가세요?', note: '对家人用 하십시오체（-십니까）显生分；해요体（-세요）更自然' },
    ],
    quickTable: {
      title: '四大语体对照',
      headers: ['语体', '结尾', '典型场景'],
      rows: [
        ['하십시오체', '-습니다 / -십니다', '面试 / 演讲 / 首次见客户'],
        ['해요체', '-어요 / -으세요', '日常礼貌 / 工作 / 陌生人'],
        ['해체', '-어 / -야', '朋友 / 家人 / 晚辈'],
        ['해라체', '-는다 / -어라', '书面 / 新闻 / 命令'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '语体切换 练习',
      body: '判断哪种语体最合适',
      questions: [
        {
          prompt: '"求职面试时对面试官" 最合适的语体？',
          options: ['해체', '해요체', '하십시오체', '해라체'],
          answer: 2,
          explanation: '面试是最正式场合 → 하십시오체（-습니다/-십니다）。',
        },
        {
          prompt: '"和亲密朋友聊天" 最合适的语体？',
          options: ['하십시오체', '해요체', '해체', '해라체'],
          answer: 2,
          explanation: '亲密朋友用 해체（半语 -어/-야）。',
        },
        {
          prompt: '"新闻稿书面报道" 最合适的语体？',
          options: ['해요체', '해체', '해라체', '하십시오체'],
          answer: 2,
          explanation: '书面报道用 해라체（-는다/-었다）。',
        },
        {
          prompt: '"对家里妈妈说话" 最合适的语体？',
          options: [
            '하십시오체（어머니, 뭐 하십니까?）',
            '해요체（어머니, 뭐 하세요?）',
            '해체（엄마, 뭐 해?）',
            '해라체（엄마 뭐 한다）',
          ],
          answer: 2,
          explanation: '家人日常用 해체（半语）；用 하십시오체 显得生分。（在部分家庭对妈妈也可用 해요체 表尊重）',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语的敬语第三层是"对听者的礼貌"—— <b>语体切换</b>。<br>四层：<b>하십시오체</b>（最正式）· <b>해요체</b>（亲切正式）· <b>해체</b>（半语）· <b>해라체</b>（书面）。<br>选错语体就选错关系。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>同一意思，四种语体</b><br>
    ・하십시오체：갑니다.<br>
    ・해요체：가요.<br>
    ・해체：가.<br>
    ・해라체：간다.
  </div>
</div>`,
    compareLabel: '四大语体',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">청자높임 语体切换</div>
  <div style="font-size:14px;color:#89756e">对听者的礼貌</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大语体</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      하십시오체 → 面试/演讲/客户<br>
      해요체 → 日常礼貌/工作/陌生人<br>
      해체 → 朋友/家人/晚辈<br>
      해라체 → 书面/新闻/命令
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">(对老板) 사장님, 저 가</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사장님, 저 갑니다 / 가겠습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">(对家人) 어디에 계십니까?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어디에 계세요?</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：自己낮춤 저·저희·드리다 ──────────────────────────────────────
  {
    id: 'card-p15-l06',
    partNumber: 15,
    lessonNumber: 6,
    title: '자기낮춤 저·저희',
    whatItDoes: '自谦',
    whatItDoesBody: '韩语敬语系统的另一半是"自谦（낮춤）"：把自己/自己群体压低，也是尊敬对方的一种方式。第一人称 나→저、우리→저희、주다→드리다（给长辈）、말하다→말씀하다（自己说时也可）都是自谦形式。',
    structureNote: '나→저｜우리→저희｜주다→드리다｜말하다→말씀 드리다',
    rulesNote: '자기낮춤 用于面对长辈/正式场合时降低自己的位阶',
    structures: [
      {
        ko: '저는 김민수라고 합니다.',
        zh: '我叫金民秀。（自谦）',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '김민수라고 합니다', role: 'verb' },
        ],
      },
      {
        ko: '저희 회사에서는 새 제품을 출시했습니다.',
        zh: '我们公司发布了新产品。',
        tokens: [
          { text: '저희 회사에서는', role: 'place' },
          { text: '새 제품을', role: 'object' },
          { text: '출시했습니다', role: 'verb' },
        ],
      },
      {
        ko: '자세한 내용은 이메일로 말씀 드리겠습니다.',
        zh: '详细内容我会用邮件告诉您。',
        tokens: [
          { text: '자세한 내용은', role: 'subject' },
          { text: '이메일로', role: 'plain' },
          { text: '말씀 드리겠습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '나 → 저（第一人称自谦）', examples: '나는 → 저는' },
      { type: 'rule', text: '우리 → 저희（复数自谦）', examples: '우리 회사 → 저희 회사' },
      { type: 'rule', text: '주다 → 드리다（给长辈时的自谦）', examples: '아버지께 드릴게요.' },
      { type: 'rule', text: '말하다 → 말씀 드리다（自己"讲"面对长辈时）', examples: '자세히 말씀 드리겠습니다.' },
      { type: 'usage', text: '正式场合演讲/自我介绍常用 저 / 저희', examples: '저는 김민수입니다.' },
      { type: 'usage', text: '与哪些人不能自谦：同龄朋友/晚辈/亲密关系', examples: '和朋友说话用 나 / 우리 即可' },
      { type: 'compare', text: '저 vs 나 → 前者对上/正式，后者对同辈以下', examples: '(正式) 저는 학생입니다 / (亲密) 나는 학생이야' },
      { type: 'note', text: '저희 나라 vs 우리 나라 → 前者太谦，习惯用 우리 나라', examples: '避免："저희 나라 사람들" → 用："우리 나라 사람들"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '김민수라고 합니다', role: 'verb' },
        ],
        zh: '我叫金民秀。',
        swapWords: ['라고 하다', '이다', '입니다', '라 부르다'],
      },
      {
        wordBlocks: [
          { text: '저희 회사에서는', role: 'place' },
          { text: '새 제품을', role: 'object' },
          { text: '출시했습니다', role: 'verb' },
        ],
        zh: '我们公司发布新产品。',
        swapWords: ['회사', '팀', '부서', '단체'],
      },
      {
        wordBlocks: [
          { text: '자세한 내용은', role: 'subject' },
          { text: '이메일로', role: 'plain' },
          { text: '말씀 드리겠습니다', role: 'verb' },
        ],
        zh: '细节邮件告知。',
        swapWords: ['이메일', '문자', '전화', '서면'],
      },
    ],
    scenarios: [
      { icon: '🎤', context: '自我介绍', ko: '저는 김민수라고 합니다.', zh: '我叫民秀。' },
      { icon: '🏢', context: '公司介绍', ko: '저희 회사에서 새 제품을 출시했습니다.', zh: '我公司发布新品。' },
      { icon: '💌', context: '致函', ko: '자세히 말씀 드리겠습니다.', zh: '详情将告知。' },
      { icon: '🎁', context: '送礼', ko: '이것은 제가 준비한 선물입니다.', zh: '这是我准备的礼物。' },
      { icon: '📞', context: '电话', ko: '저희 팀장님을 바꿔 드리겠습니다.', zh: '为您转组长。' },
      { icon: '🌏', context: '国家称呼', ko: '우리 나라 문화입니다.', zh: '我国文化。' },
    ],
    mistakes: [
      { wrong: '나는 김민수입니다', correct: '저는 김민수입니다', note: '正式自介用 저，不用 나' },
      { wrong: '우리 회사에서는（对客户）', correct: '저희 회사에서는', note: '对外/正式用 저희' },
      { wrong: '저희 나라 사람들', correct: '우리 나라 사람들', note: '国家自称用 우리 나라（约定俗成）' },
      { wrong: '자세히 말씀 하겠습니다', correct: '자세히 말씀 드리겠습니다', note: '对客/长辈自己讲要 말씀 드리다' },
    ],
    quickTable: {
      title: '自谦对照',
      headers: ['普通', '自谦', '使用场景'],
      rows: [
        ['나', '저', '对上/正式'],
        ['우리', '저희', '对外/正式（除"우리 나라"）'],
        ['주다', '드리다', '给长辈/客户'],
        ['말하다', '말씀 드리다', '自己讲(面对尊者)'],
        ['이름', '성함', '姓名（尊称对方）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '자기낮춤 练习',
      body: '选择正确的自谦形式',
      questions: [
        {
          prompt: '正式自我介绍："___는 김민수라고 합니다."',
          options: ['나', '저', '내', '제'],
          answer: 1,
          explanation: '正式场合第一人称用 저。',
        },
        {
          prompt: '对客户："___ 회사에서는 새 제품을 출시했습니다."',
          options: ['우리', '저희', '내', '자기'],
          answer: 1,
          explanation: '对外/正式用 저희。',
        },
        {
          prompt: '"我们国家" 最自然的说法？',
          options: ['저희 나라', '우리 나라', '내 나라', '한 나라'],
          answer: 1,
          explanation: '国家自称习惯用 우리 나라（不用 저희 나라，这样反而不自然）。',
        },
        {
          prompt: '"我会详细告诉您" 最合适？',
          options: [
            '자세히 얘기하겠습니다',
            '자세히 말씀 드리겠습니다',
            '자세히 말씀 하겠습니다',
            '자세히 말할 것입니다',
          ],
          answer: 1,
          explanation: '面对长辈/客户，自己"讲"用 말씀 드리다（自谦 + 客体高임）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l03', 'card-p15-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语的另一半是<b>自谦（낮춤）</b>：把自己压低。<br>나→<b>저</b> · 우리→<b>저희</b> · 주다→<b>드리다</b> · 말하다→<b>말씀 드리다</b>。<br>特殊：<b>우리 나라</b> 约定俗成，不用 저희 나라。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 自谦</b><br>
    ・普通：나는 김민수야.<br>
    <span style="color:#89756e">（朋友/晚辈）</span><br>
    ・自谦：저는 김민수라고 합니다.<br>
    <span style="color:#89756e">（正式场合）</span>
  </div>
</div>`,
    compareLabel: '나 vs 저',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">자기낮춤（自谦）</div>
  <div style="font-size:14px;color:#89756e">压低自己 · 尊重对方</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">对照表</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      나 → <b>저</b><br>
      우리 → <b>저희</b>（除"우리 나라"）<br>
      주다 → <b>드리다</b><br>
      말하다 → <b>말씀 드리다</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저희 나라</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">우리 나라</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">나는 김민수입니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 김민수입니다</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：간접높임 与身体/所有物 ──────────────────────────────────────
  {
    id: 'card-p15-l07',
    partNumber: 15,
    lessonNumber: 7,
    title: '간접높임（间接尊敬）',
    whatItDoes: '身体/所有物 간접높임',
    whatItDoesBody: '当句子主语不是尊者本人，而是他"身体的一部分""所有物""所属"时，动词/形容词仍要加 -(으)시-。这叫 간접높임（间接尊敬）：抬高 A 的东西 = 抬高 A。',
    structureNote: '尊者的身体/所有物/所属 + V-(으)시-｜通过间接对象抬高本人',
    rulesNote: '주체는 사람 아닌 그 사람의 "무엇"｜典型：손, 눈, 마음, 성함, 연세, 말씀 등',
    structures: [
      {
        ko: '아버지는 손이 크세요.',
        zh: '父亲手很大。（间接高임，抬高父亲）',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '손이', role: 'subject' },
          { text: '크세요', role: 'verb' },
        ],
      },
      {
        ko: '할아버지는 연세가 많으세요.',
        zh: '爷爷年岁大。',
        tokens: [
          { text: '할아버지는', role: 'subject' },
          { text: '연세가', role: 'subject' },
          { text: '많으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님, 성함이 어떻게 되세요?',
        zh: '老师，您贵姓？',
        tokens: [
          { text: '선생님', role: 'subject' },
          { text: '성함이', role: 'subject' },
          { text: '어떻게 되세요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '身体部位 + 형용사 -(으)시-：손이 크세요 / 눈이 크세요', examples: '아버지는 손이 크세요.' },
      { type: 'rule', text: '所有物 + 属性 -(으)시-：집이 넓으세요 / 옷이 예쁘세요', examples: '어머니 집이 넓으세요.' },
      { type: 'rule', text: '尊称化名词：나이 → 연세, 이름 → 성함, 밥 → 진지, 말 → 말씀, 있다 → 계시다', examples: '연세가 많으세요 / 성함이 어떻게 되세요' },
      { type: 'usage', text: '连尊者"话/意图"也间接高임', examples: '말씀 있으세요? / 어떤 뜻이신가요?' },
      { type: 'usage', text: '不能对完全无关的物体加 -(으)시-（如 물건이 예쁘세요 ✗）', examples: '误：커피가 나오셨습니다 → 应：커피 나왔습니다' },
      { type: 'compare', text: '直接高임 vs 间接高임', examples: '(直接) 아버지가 오세요 / (间接) 아버지 손이 크세요' },
      { type: 'note', text: '当代韩国常有"过度敬语"现象 → 커피 나오셨습니다 是错误', examples: '"物品"不能被"尊敬"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '손이', role: 'subject' },
          { text: '크세요', role: 'verb' },
        ],
        zh: '父亲手大（间接）。',
        swapWords: ['손', '발', '눈', '얼굴'],
      },
      {
        wordBlocks: [
          { text: '할아버지는', role: 'subject' },
          { text: '연세가', role: 'subject' },
          { text: '많으세요', role: 'verb' },
        ],
        zh: '爷爷年岁大。',
        swapWords: ['연세', '나이'],
      },
      {
        wordBlocks: [
          { text: '선생님', role: 'subject' },
          { text: '성함이', role: 'subject' },
          { text: '어떻게 되세요?', role: 'verb' },
        ],
        zh: '老师您贵姓？',
        swapWords: ['성함', '이름'],
      },
    ],
    scenarios: [
      { icon: '👋', context: '身体', ko: '아버지는 손이 크세요.', zh: '父亲手大。' },
      { icon: '👴', context: '年岁', ko: '할아버지는 연세가 많으세요.', zh: '爷爷高龄。' },
      { icon: '🎓', context: '询问姓名', ko: '성함이 어떻게 되세요?', zh: '您贵姓？' },
      { icon: '🏠', context: '所有物', ko: '교수님 집이 넓으세요.', zh: '教授家宽敞。' },
      { icon: '💬', context: '话语间接', ko: '무슨 말씀이신가요?', zh: '您指的什么？' },
      { icon: '☕', context: '禁忌', ko: '커피 나왔습니다.', zh: '咖啡好了。（不用 나오셨습니다）' },
    ],
    mistakes: [
      { wrong: '아버지 손이 커요', correct: '아버지 손이 크세요', note: '尊者身体也要 -(으)시-（间接尊敬）' },
      { wrong: '커피가 나오셨습니다', correct: '커피가 나왔습니다', note: '物品"咖啡"不能被尊敬（当代常见的"过度敬语"错误）' },
      { wrong: '할아버지 나이가 많아요', correct: '할아버지는 연세가 많으세요', note: '나이 → 연세（尊称化名词）+ 谓语加 -(으)시-' },
    ],
    quickTable: {
      title: '尊称化名词',
      headers: ['普通', '尊称', '语境'],
      rows: [
        ['나이', '연세', '年龄'],
        ['이름', '성함', '姓名'],
        ['밥', '진지', '饭食（对长辈）'],
        ['말', '말씀', '话语'],
        ['있다', '계시다', '（人）在'],
        ['생일', '생신', '生日'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '간접높임 练习',
      body: '选择正确表达',
      questions: [
        {
          prompt: '아버지는 손이 (   ).',
          options: ['커요', '크세요', '커요세요', '크시어요'],
          answer: 1,
          explanation: '身体部位属于间接尊敬 → 크세요。',
        },
        {
          prompt: '"教授家宽敞" 最合适？',
          options: [
            '교수님 집이 넓어요',
            '교수님 집이 넓으세요',
            '교수님 집을 넓어요',
            '교수님이 집이 넓으셨어요',
          ],
          answer: 1,
          explanation: '所有物"집"通过形容词 -(으)세요 抬高教授。',
        },
        {
          prompt: '下列哪句是"过度敬语"错误？',
          options: [
            '아버지는 연세가 많으세요.',
            '커피가 나오셨습니다.',
            '어머니는 손이 크세요.',
            '선생님, 성함이 어떻게 되세요?',
          ],
          answer: 1,
          explanation: '커피（物品）不能被尊敬 → 应改为 커피 나왔습니다。',
        },
        {
          prompt: '간접높임（间接尊敬）的原理？',
          options: [
            '直接抬高主语',
            '通过抬高尊者的身体/所有物 间接尊敬本人',
            '只抬高动词',
            '只用于问句',
          ],
          answer: 1,
          explanation: '通过尊者的"东西"加 -(으)시- 间接抬高本人。物品不能滥用。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">尊者的<b>身体/所有物</b>也要 -(으)시-：아버지 <b>손이 크세요</b>。<br>但是"物品本身"不能被尊敬 → <b>커피 나왔습니다</b>（不是 나오셨습니다）。<br>这是当代韩语最常见的"过度敬语"错误。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>可以 vs 不可以</b><br>
    ・尊者身体/所有 ✓<br>
    <span style="color:#89756e">아버지 손이 크세요.</span><br>
    ・物品本身 ✗<br>
    <span style="color:#89756e">커피가 나오셨습니다 → 나왔습니다</span>
  </div>
</div>`,
    compareLabel: '间接 vs 过度',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">간접높임（间接尊敬）</div>
  <div style="font-size:14px;color:#89756e">身体/所有物 → 抬高本人</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">尊称化名词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      나이 → 연세<br>
      이름 → 성함<br>
      밥 → 진지<br>
      말 → 말씀<br>
      생일 → 생신
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">커피 나오셨습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">커피 나왔습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할아버지 나이가 많아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할아버지는 연세가 많으세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：높임 误用禁忌与압존 ──────────────────────────────────────
  {
    id: 'card-p15-l08',
    partNumber: 15,
    lessonNumber: 8,
    title: '높임 误用禁忌与압존',
    whatItDoes: '禁忌与압존법',
    whatItDoesBody: '本课系统整理韩语敬语最容易踩的坑：过度敬语（커피 나오셨습니다）、압존법（面对最高尊者时抬他下面的人是否降低）、对陌生人的默认语体、职场敬语的边界。这些是韩语高级学习者的必修。',
    structureNote: '禁忌 · 压尊 · 默认语体｜四大常见错误',
    rulesNote: '过度敬语｜압존법（对老板讲组长时"降"组长）｜第一人称不加 -시-｜物品不加 -시-',
    structures: [
      {
        ko: '주문하신 커피 나왔습니다.',
        zh: '您点的咖啡好了。',
        tokens: [
          { text: '주문하신', role: 'plain' },
          { text: '커피', role: 'subject' },
          { text: '나왔습니다', role: 'verb' },
        ],
      },
      {
        ko: '(사장님께) 팀장이 조금 전에 나갔습니다.',
        zh: '（对社长）组长刚刚出去了。（압존）',
        tokens: [
          { text: '팀장이', role: 'subject' },
          { text: '조금 전에', role: 'time' },
          { text: '나갔습니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 갔어요.',
        zh: '我去了学校。（自己不用 -시-）',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '禁忌 1：物品不加 -(으)시-（커피 / 사이즈 / 주문）', examples: '(错) 커피 나오셨어요 → 나왔어요' },
      { type: 'rule', text: '禁忌 2：第一人称"我/我们"不加 -(으)시-', examples: '(错) 제가 가시겠습니다 → 제가 가겠습니다' },
      { type: 'rule', text: '禁忌 3：压尊法（압존법）— 对最高尊者时，抬中间层次是失礼', examples: '(对社长) 팀장님이 오셨습니다 → 팀장이 왔습니다（正式压尊；现代职场多已放宽）' },
      { type: 'rule', text: '禁忌 4：过度嵌套 -(으)시- + -어요 + -님 有时反而失礼', examples: '需按听者/情境选合适的层级' },
      { type: 'usage', text: '现代韩国职场对압존법态度放宽 → 一般也可"팀장님이 오셨습니다"', examples: '大企业内规多允许 팀장님 加 님 + -시-' },
      { type: 'usage', text: '正式服务业错误："-님, 사이즈가 어떠세요?" → 사이즈 어떠십니까? / 어떠세요? 都好', examples: '避免："고객님 계산이 나오셨어요" → "계산 나왔어요"' },
      { type: 'compare', text: '正确 vs 过度', examples: '(错) 옷이 예쁘시네요 → (对) 옷이 예쁘네요 (物品) / 손님이 예쁘시네요 (人)' },
      { type: 'note', text: '"过度敬语"是当代韩国服务业普遍问题；正式考试/正确用语要区分', examples: '国立国어원 教材明确否定"物品 -시-"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '주문하신', role: 'plain' },
          { text: '커피', role: 'subject' },
          { text: '나왔습니다', role: 'verb' },
        ],
        zh: '您的咖啡好了。',
        swapWords: ['커피', '음료', '주문', '음식'],
      },
      {
        wordBlocks: [
          { text: '팀장이', role: 'subject' },
          { text: '조금 전에', role: 'time' },
          { text: '나갔습니다', role: 'verb' },
        ],
        zh: '组长刚出去（对社长）。',
        swapWords: ['팀장', '과장', '차장', '부장'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '我去学校。',
        swapWords: ['학교', '회사', '집', '병원'],
      },
    ],
    scenarios: [
      { icon: '☕', context: '服务业禁忌', ko: '주문하신 커피 나왔습니다.', zh: '您的咖啡好了。' },
      { icon: '👔', context: '압존법', ko: '팀장이 조금 전에 나갔습니다.', zh: '组长刚出去了（面对社长时的压尊法）。' },
      { icon: '🙋', context: '自己不用 -시-', ko: '저는 학교에 갔어요.', zh: '我去学校。' },
      { icon: '💰', context: '禁忌', ko: '계산 도와드리겠습니다.', zh: '为您结账。' },
      { icon: '📏', context: '禁忌 2', ko: '사이즈 어떠세요?', zh: '尺寸如何？（不用 사이즈가 어떠십니까?）' },
      { icon: '🎁', context: '正确嵌套', ko: '아버님, 이 선물이 마음에 드세요?', zh: '爸这礼物您喜欢吗？' },
    ],
    mistakes: [
      { wrong: '커피가 나오셨습니다', correct: '커피 나왔습니다', note: '物品不能被尊敬' },
      { wrong: '(对社长) 팀장님이 오셨습니다', correct: '(压尊) 팀장이 왔습니다 / (职场放宽) 팀장님이 오셨습니다', note: '严格 압존法降尊；现代职场多已放宽' },
      { wrong: '제가 가시겠습니다', correct: '제가 가겠습니다', note: '第一人称不能加 -(으)시-' },
      { wrong: '옷이 예쁘시네요（对客人时形容衣服）', correct: '옷이 예쁘네요 / 손님이 예뻐 보이세요', note: '尊敬人本身，不尊敬"物品"' },
    ],
    quickTable: {
      title: '常见误用与修正',
      headers: ['错误类型', '错', '正'],
      rows: [
        ['物品尊敬', '커피 나오셨어요', '커피 나왔어요'],
        ['第一人称', '제가 가시겠어요', '제가 가겠어요'],
        ['압존（严格）', '팀장님이 오셨습니다', '팀장이 왔습니다'],
        ['服务业过度', '사이즈가 어떠십니까?', '사이즈 어떠세요?'],
        ['所有物过度', '옷이 예쁘시네요', '옷이 예쁘네요'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '误用判断',
      body: '选出用得对的表达',
      questions: [
        {
          prompt: '"顾客的咖啡好了" 最合适？',
          options: [
            '커피가 나오셨습니다',
            '커피 나왔습니다',
            '커피께서 나오셨습니다',
            '커피 나오셨어요',
          ],
          answer: 1,
          explanation: '物品（咖啡）不能被尊敬 → 커피 나왔습니다。',
        },
        {
          prompt: '"我要去" 最合适？',
          options: [
            '제가 가시겠습니다',
            '제가 가겠습니다',
            '제가 가시어요',
            '제가 가세요',
          ],
          answer: 1,
          explanation: '第一人称不加 -(으)시- → 제가 가겠습니다。',
        },
        {
          prompt: '"（对社长）组长刚出去" 现代职场最普遍的说法？',
          options: [
            '팀장이 나갔습니다（严格 압존）',
            '팀장님이 나가셨습니다（放宽后）',
            '팀장이 나가셨어요',
            '팀장님 나가셨어요',
          ],
          answer: 1,
          explanation: '严格 압존法要降尊；但现代韩国职场普遍已放宽，说 팀장님이 나가셨습니다 也可接受。',
        },
        {
          prompt: '"这件衣服真漂亮"（对客人时）最合适？',
          options: [
            '옷이 예쁘시네요',
            '옷이 예쁘네요',
            '옷께서 예쁘십니다',
            '옷이 예쁘십니다',
          ],
          answer: 1,
          explanation: '衣服是物品不能尊敬；说 옷이 예쁘네요 或转为 "손님이 예뻐 보이세요"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语误用四大常见：<br>1. 物品尊敬（<b>커피 나오셨어요</b>）· 2. 第一人称加 -시-（<b>제가 가시겠어요</b>）<br>3. 压尊法（对社长说组长要"降尊"）· 4. 过度嵌套。<br>掌握这些是韩语真正流利的一关。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>严格 vs 放宽压尊</b><br>
    ・严格 압존（教材标准）<br>
    <span style="color:#89756e">(对社长) 팀장이 왔습니다.</span><br>
    ・现代职场（放宽）<br>
    <span style="color:#89756e">(对社长) 팀장님이 오셨습니다.</span>
  </div>
</div>`,
    compareLabel: '严格 vs 放宽',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">敬语误用禁忌</div>
  <div style="font-size:14px;color:#89756e">四大常见错误</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大禁忌</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 物品不加 -(으)시-<br>
      2. 第一人称不加 -(으)시-<br>
      3. 압존法（对最高尊者时降中间尊者）<br>
      4. 服务业过度嵌套（사이즈 어떠십니까?）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">커피 나오셨습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">커피 나왔습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">제가 가시겠습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">제가 가겠습니다</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P15 综合练习 ──────────────────────────────────────
  {
    id: 'card-p15-l09',
    partNumber: 15,
    lessonNumber: 9,
    title: 'P15 综合练习',
    isPractice: true,
    whatItDoes: '敬语综合',
    whatItDoesBody: '本课综合 P15 全部 8 类敬语内容：주체높임 -(으)시- / 特殊词汇 / 객체높임 换词 / 助词 -께서·-께·-님 / 语体切换 / 자기낮춤 / 간접높임 / 误用禁忌。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P15 综合练习',
      body: '综合本章所有敬语内容',
      questions: [
        {
          prompt: '선생님이 어제 학교에 (오다) 어요.',
          options: ['왔어요', '오셨어요', '오세요', '오시어요'],
          answer: 1,
          explanation: '过去 -(으)셨어요 → 오셨어요。',
        },
        {
          prompt: '할아버지는 지금 방에 (   ).',
          options: ['있어요', '있으세요', '계세요', '있어시요'],
          answer: 2,
          explanation: '"（人）在"用 계시다 → 계세요。',
        },
        {
          prompt: '아버지는 일찍 (자다) 세요.',
          options: ['자', '주무', '주무시', '자시'],
          answer: 1,
          explanation: '"就寝"用 주무시다 → 주무세요（주무 + -세요）。',
        },
        {
          prompt: '선생님(   ) 선물을 (   ).',
          options: ['에게 / 주었어요', '께 / 드렸어요', '에 / 드렸어요', '한테 / 주셨어요'],
          answer: 1,
          explanation: '给尊者：-께 + 드리다 → 께 드렸어요。',
        },
        {
          prompt: '선생님(   ) 학교에 오셨어요.',
          options: ['이', '가', '께서', '으로'],
          answer: 2,
          explanation: '正式敬语主语用 -께서。',
        },
        {
          prompt: '"面试自我介绍" 最合适语体？',
          options: ['해체', '해요체', '하십시오체', '해라체'],
          answer: 2,
          explanation: '正式面试用 하십시오체。',
        },
        {
          prompt: '正式自介："___는 김민수라고 합니다."',
          options: ['나', '저', '내', '제'],
          answer: 1,
          explanation: '正式第一人称用 저。',
        },
        {
          prompt: '아버지는 손이 (   ).',
          options: ['커요', '크세요', '커요세요', '크시어요'],
          answer: 1,
          explanation: '身体部位 → 간접높임 → 크세요。',
        },
        {
          prompt: '"顾客的咖啡好了" 最合适？',
          options: [
            '커피가 나오셨습니다',
            '커피 나왔습니다',
            '커피께서 나오셨습니다',
            '커피 나오셨어요',
          ],
          answer: 1,
          explanation: '物品不能被尊敬 → 커피 나왔습니다。',
        },
        {
          prompt: '주체높임 与 객체높임 的核心区别？',
          options: [
            '完全相同',
            '주체 抬高主语（-시-）；객체 抬高宾语/接受者（换词+-께）',
            '주체 用于口语，객체 用于书面',
            '주체 是过去，객체 是现在',
          ],
          answer: 1,
          explanation: '주체（主语）+ -시-；객체（宾语/接受者）+ 特殊换词 + -께。',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p15-l01',
      'card-p15-l02',
      'card-p15-l03',
      'card-p15-l04',
      'card-p15-l05',
      'card-p15-l06',
      'card-p15-l07',
      'card-p15-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P15 敬语体系深化总结</div>
  <div style="font-size:14px;color:#89756e">3 大维度 · 助词 · 语体 · 自谦 · 禁忌</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">敬语 3 大维度</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 주체높임 → 抬高主语（-(으)시-）<br>
      2. 객체높임 → 抬高宾语/接受者（换词 + -께）<br>
      3. 청자높임 → 语体切换（4 大语体）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">助词升级</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -이/가 → -께서<br>
      -은/는 → -께서는<br>
      -에게 → -께<br>
      N → N-님
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">特殊换词清单</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      있다 → 계시다 / 있으시다<br>
      먹다 → 드시다 / 잡수시다<br>
      자다 → 주무시다 / 말하다 → 말씀하시다<br>
      주다 → 드리다 / 보다 → 뵙다<br>
      묻다 → 여쭙다 / 데리다 → 모시다<br>
      나이 → 연세 / 이름 → 성함 / 밥 → 진지
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">四大误用禁忌</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 物品不加 -(으)시-（커피 나왔습니다）<br>
      2. 第一人称不加 -(으)시-（제가 가겠습니다）<br>
      3. 압존法（正式场合注意抬中间层）<br>
      4. 语体不匹配（选对语体最重要）
    </div>
  </div>
</div>`,
  },
];
