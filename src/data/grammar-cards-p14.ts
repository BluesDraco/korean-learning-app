import type { GrammarCard } from '@/types';

export const grammarCardsP14: GrammarCard[] = [
  // ── 第1课：-이/히/리/기 短形使动（1）──────────────────────────────────────
  {
    id: 'card-p14-l01',
    partNumber: 14,
    lessonNumber: 1,
    title: '-이/히/리/기 短形使动',
    whatItDoes: '让某人做',
    whatItDoesBody: '韩语使动的核心方式之一：动词词干加使动接尾 -이-/-히-/-리-/-기-。使动的意思是"让 A 做 B 事"。本课学 -이-/-히-/-리-/-기- 四组共同规则。哪个动词属哪一组需按记忆表。',
    structureNote: '动词词干 + -이/히/리/기- + 语尾｜句式：S가 O를 V-이/히-（S 让 O 做 V）',
    rulesNote: '-이-：보다→보이다（给看）｜-히-：읽다→읽히다（让读）｜-리-：울다→울리다（弄哭）｜-기-：웃다→웃기다（逗笑）',
    structures: [
      {
        ko: '엄마가 아기에게 그림책을 보였어요.',
        zh: '妈妈给宝宝看图画书。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아기에게', role: 'plain' },
          { text: '그림책을', role: 'object' },
          { text: '보였어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 학생들에게 책을 읽혔어요.',
        zh: '老师让学生们读书。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들에게', role: 'plain' },
          { text: '책을', role: 'object' },
          { text: '읽혔어요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 친구를 자꾸 울려요.',
        zh: '民秀总是把朋友弄哭。',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '친구를', role: 'object' },
          { text: '자꾸', role: 'plain' },
          { text: '울려요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-이- 类：보다→보이다（给看）/ 먹다→먹이다（喂）/ 죽다→죽이다（弄死）', examples: '엄마가 아기에게 우유를 먹였어요.' },
      { type: 'rule', text: '-히- 类：읽다→읽히다（让读）/ 앉다→앉히다（让坐）/ 눕다→눕히다（让躺）', examples: '선생님이 아이를 자리에 앉혔어요.' },
      { type: 'rule', text: '-리- 类：울다→울리다（弄哭）/ 살다→살리다（救活）/ 알다→알리다（告知）', examples: '민수가 친구를 울렸어요. / 그가 소식을 알렸다.' },
      { type: 'rule', text: '-기- 类：웃다→웃기다（逗笑）/ 벗다→벗기다（脱下）/ 감다→감기다（洗头/闭眼）', examples: '개그맨이 관객을 웃겼어요.' },
      { type: 'usage', text: '使动句式：S가 O를(에게) V-이/히-', examples: '엄마가 아기에게 밥을 먹였다. / 형이 동생을 울렸다.' },
      { type: 'compare', text: '短形使动 vs 短形被动（同接尾）→ 靠助词区分', examples: '(被动) 아이가 잡혔다.（被抓）/(使动) 엄마가 아이를 잡혔다. → 通常这类语义直接用被动或换 -게 하다' },
      { type: 'note', text: '哪个动词属哪一组需按表记，不能自造', examples: '먹다→먹이다 ✓ / 먹다→먹히다（这是被动"被吃"）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아기에게', role: 'plain' },
          { text: '그림책을', role: 'object' },
          { text: '보였어요', role: 'verb' },
        ],
        zh: '妈妈给宝宝看图画书。',
        swapWords: ['그림책', '사진', '동영상', '카드'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들에게', role: 'plain' },
          { text: '책을', role: 'object' },
          { text: '읽혔어요', role: 'verb' },
        ],
        zh: '老师让学生读书。',
        swapWords: ['책', '소설', '동화', '시'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '친구를', role: 'object' },
          { text: '자꾸', role: 'plain' },
          { text: '울려요', role: 'verb' },
        ],
        zh: '民秀总把朋友弄哭。',
        swapWords: ['울리다', '웃기다', '놀리다', '괴롭히다'],
      },
    ],
    scenarios: [
      { icon: '📖', context: '给看', ko: '엄마가 아기에게 그림책을 보였어요.', zh: '妈妈给宝宝看书。' },
      { icon: '🍼', context: '喂食', ko: '엄마가 아기에게 우유를 먹였어요.', zh: '妈妈喂宝宝喝奶。' },
      { icon: '📚', context: '让读', ko: '선생님이 학생들에게 책을 읽혔어요.', zh: '老师让学生读书。' },
      { icon: '💺', context: '让坐', ko: '선생님이 아이를 자리에 앉혔어요.', zh: '老师让孩子坐下。' },
      { icon: '😭', context: '弄哭', ko: '민수가 친구를 울렸어요.', zh: '民秀把朋友弄哭。' },
      { icon: '😂', context: '逗笑', ko: '개그맨이 관객을 웃겼어요.', zh: '喜剧演员把观众逗笑。' },
    ],
    mistakes: [
      { wrong: '엄마가 아기가 우유를 먹였어요', correct: '엄마가 아기에게 우유를 먹였어요', note: '被使动者用 에게 或 을/를，不用 이/가' },
      { wrong: '민수가 친구가 울렸어요', correct: '민수가 친구를 울렸어요', note: '使动句里对方是被支配对象 → 을/를' },
      { wrong: '개그맨이 관객을 웃혔어요', correct: '개그맨이 관객을 웃겼어요', note: '웃다 → 웃기다（-기-类），不是 웃히다' },
    ],
    quickTable: {
      title: '-이/히/리/기 短形使动速查',
      headers: ['接尾', '原型 → 使动', '含义'],
      rows: [
        ['-이-', '보다 → 보이다', '看 → 给看'],
        ['-이-', '먹다 → 먹이다', '吃 → 喂'],
        ['-이-', '죽다 → 죽이다', '死 → 弄死'],
        ['-히-', '읽다 → 읽히다', '读 → 让读'],
        ['-히-', '앉다 → 앉히다', '坐 → 让坐'],
        ['-리-', '울다 → 울리다', '哭 → 弄哭'],
        ['-리-', '알다 → 알리다', '知道 → 告知'],
        ['-기-', '웃다 → 웃기다', '笑 → 逗笑'],
        ['-기-', '벗다 → 벗기다', '脱 → 脱下'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '短形使动 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '엄마가 아기에게 우유를 (먹다) 였어요.',
          options: ['먹였어요', '먹혔어요', '먹어졌어요', '먹었어요'],
          answer: 0,
          explanation: '먹다 的使动是 먹이다（喂）→ 먹였어요。먹혔다 是被动"被吃"。',
        },
        {
          prompt: '선생님이 학생들에게 책을 (읽다) 혔어요.',
          options: ['읽어졌어요', '읽혔어요', '읽었어요', '읽리었어요'],
          answer: 1,
          explanation: '읽다 的使动是 읽히다（让读）→ 읽혔어요。',
        },
        {
          prompt: '개그맨이 관객을 (웃다) 요.',
          options: ['웃혀요', '웃겨요', '웃려요', '웃여요'],
          answer: 1,
          explanation: '웃다 的使动是 웃기다（逗笑）→ 웃겨요。',
        },
        {
          prompt: '"엄마가 아기에게 우유를 먹였다" 里的 먹이다 是……？',
          options: ['被动（被喂）', '使动（喂）', '主动（吃）', '完成时'],
          answer: 1,
          explanation: '먹이다 是"喂"（使动），让宝宝吃奶。먹히다 才是被动"被吃"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l02', 'card-p14-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"妈妈喂宝宝""老师让学生读书""朋友把我弄哭" —— 韩语最经典的使动方式：动词加 <b>-이/히/리/기-</b>。<br>먹다→먹이다（喂），울다→울리다（弄哭），웃다→웃기다（逗笑）。跟短形被动同一套接尾，靠助词分辨。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>短形使动 vs 短形被动</b><br>
    ・使动：엄마가 아기에게 밥을 먹였다.<br>
    <span style="color:#89756e">(S가 O에게/를 V-이/히-)</span><br>
    ・被动：작은 물고기가 큰 물고기에게 먹혔다.<br>
    <span style="color:#89756e">(S가 A에게 V-이/히-)</span>
  </div>
</div>`,
    compareLabel: '使动 vs 被动',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-이/히/리/기 短形使动</div>
  <div style="font-size:14px;color:#89756e">让人做 · 高频使动动词组</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四组接尾</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -이-：보이다 / 먹이다 / 죽이다<br>
      -히-：읽히다 / 앉히다 / 눕히다<br>
      -리-：울리다 / 살리다 / 알리다<br>
      -기-：웃기다 / 벗기다 / 감기다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">句式</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      S가 + O에게/를 + 名词을/를 + V-이/히-<br>
      엄마가 아기에게 우유를 먹였다.<br>
      선생님이 학생을 앉혔다.<br>
      민수가 친구를 울렸다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아기가 우유를 먹였어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아기에게 우유를 먹였어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">개그맨이 관객을 웃혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">개그맨이 관객을 웃겼어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-우/구/추 短形使动 ──────────────────────────────────────
  {
    id: 'card-p14-l02',
    partNumber: 14,
    lessonNumber: 2,
    title: '-우/구/추 短形使动',
    whatItDoes: '短形使动 续',
    whatItDoesBody: '短形使动的另外三组接尾：-우-/-구-/-추-。-우- 是最常见的，如 자다→재우다（哄睡）、타다→태우다（载）；-구- 罕见如 솟다→솟구다；-추- 类如 낮다→낮추다（降低）、늦다→늦추다（推迟）。',
    structureNote: '词干 + -우/구/추- + 语尾',
    rulesNote: '-우-：자다→재우다、타다→태우다、깨다→깨우다、서다→세우다｜-추-：낮다→낮추다、늦다→늦추다、맞다→맞추다｜-구-：솟다→솟구다（少见）',
    structures: [
      {
        ko: '엄마가 아기를 재웠어요.',
        zh: '妈妈哄宝宝睡着。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
      },
      {
        ko: '아빠가 아이를 차에 태웠어요.',
        zh: '爸爸把孩子送上车。',
        tokens: [
          { text: '아빠가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '차에', role: 'place' },
          { text: '태웠어요', role: 'verb' },
        ],
      },
      {
        ko: '에어컨 온도를 낮췄어요.',
        zh: '把空调温度调低了。',
        tokens: [
          { text: '에어컨 온도를', role: 'object' },
          { text: '낮췄어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-우- 类：자다→재우다（哄睡）/ 타다→태우다（载）/ 깨다→깨우다（叫醒）/ 서다→세우다（让站/建）', examples: '엄마가 아이를 재웠다. / 차를 세웠다.' },
      { type: 'rule', text: '-추- 类：낮다→낮추다（降低）/ 늦다→늦추다（推迟）/ 맞다→맞추다（对齐/搭配）', examples: '온도를 낮췄다. / 시간을 늦췄다.' },
      { type: 'rule', text: '-구- 类：稀少，多数教材归到"솟구다"这类少数动词', examples: '솟다 → 솟구다（涌出）' },
      { type: 'usage', text: '不规则变化：자다→재우다（모음 이 삽입）；서다→세우다', examples: '자다 + 우 → 재우다（词内元音变化）' },
      { type: 'usage', text: '句式：S가 O를 [场所에] V-우/추-', examples: '엄마가 아이를 차에 태웠다.' },
      { type: 'compare', text: '短形使动 vs -게 하다 → 前者固定动词组（记忆），后者通用', examples: '재우다（固定）/ 자게 하다（通用）' },
      { type: 'note', text: '-우- 类多为身体/位置类动词的使动化', examples: '눕다→눕히다（-히） vs 자다→재우다（-우）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
        zh: '妈妈哄宝宝睡。',
        swapWords: ['재우다', '깨우다', '달래다', '안다'],
      },
      {
        wordBlocks: [
          { text: '아빠가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '차에', role: 'place' },
          { text: '태웠어요', role: 'verb' },
        ],
        zh: '爸爸让孩子上车。',
        swapWords: ['태우다', '내리다', '데려가다', '내려주다'],
      },
      {
        wordBlocks: [
          { text: '에어컨 온도를', role: 'object' },
          { text: '낮췄어요', role: 'verb' },
        ],
        zh: '把空调温度调低。',
        swapWords: ['낮추다', '올리다', '높이다', '조절하다'],
      },
    ],
    scenarios: [
      { icon: '👶', context: '哄睡', ko: '엄마가 아기를 재웠어요.', zh: '妈妈哄宝宝睡。' },
      { icon: '🚗', context: '载客', ko: '아빠가 아이를 차에 태웠어요.', zh: '爸爸让孩子上车。' },
      { icon: '❄️', context: '降温', ko: '에어컨 온도를 낮췄어요.', zh: '把空调调低。' },
      { icon: '⏰', context: '叫醒', ko: '아침에 아이를 깨웠어요.', zh: '早晨叫醒孩子。' },
      { icon: '🕰️', context: '推迟', ko: '회의 시간을 늦췄어요.', zh: '把会议时间推迟。' },
      { icon: '🏗️', context: '建立', ko: '광장에 동상을 세웠어요.', zh: '在广场立了雕像。' },
    ],
    mistakes: [
      { wrong: '엄마가 아기를 자였어요', correct: '엄마가 아기를 재웠어요', note: '자다 + -우- → 재우다（词内元音要变），不是 자우다' },
      { wrong: '아빠가 아이를 차에 타웠어요', correct: '아빠가 아이를 차에 태웠어요', note: '타다 + -우- → 태우다，词内元音也要变' },
      { wrong: '온도를 낮혔어요', correct: '온도를 낮췄어요', note: '낮다 的使动是 낮추다（-추-类），不用 -히-' },
    ],
    quickTable: {
      title: '-우/구/추 使动速查',
      headers: ['接尾', '原型 → 使动', '含义'],
      rows: [
        ['-우-', '자다 → 재우다', '睡 → 哄睡（元音变化）'],
        ['-우-', '타다 → 태우다', '乘 → 载/使搭乘'],
        ['-우-', '깨다 → 깨우다', '醒 → 叫醒'],
        ['-우-', '서다 → 세우다', '站 → 让站/建立'],
        ['-추-', '낮다 → 낮추다', '低 → 降低'],
        ['-추-', '늦다 → 늦추다', '晚 → 推迟'],
        ['-추-', '맞다 → 맞추다', '对 → 对齐/搭配'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-우/구/추 使动 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '엄마가 아기를 (자다) 웠어요.',
          options: ['자웠어요', '재웠어요', '자혔어요', '자였어요'],
          answer: 1,
          explanation: '자다 的使动是 재우다（词内元音变化）→ 재웠어요。',
        },
        {
          prompt: '아빠가 아이를 차에 (타다) 웠어요.',
          options: ['타웠어요', '태웠어요', '타혔어요', '타이었어요'],
          answer: 1,
          explanation: '타다 的使动是 태우다 → 태웠어요。',
        },
        {
          prompt: '에어컨 온도를 (낮다) 요.',
          options: ['낮혀요', '낮춰요', '낮여요', '낮게 해요'],
          answer: 1,
          explanation: '낮다 的使动是 낮추다 → 낮춰요。',
        },
        {
          prompt: '-우- 类使动的典型特征是……？',
          options: [
            '接尾直接加，无元音变化',
            '常伴随词内元音变化（자→재、타→태、서→세）',
            '只用于形容词',
            '只用于하다类动词',
          ],
          answer: 1,
          explanation: '-우- 类常伴随词内元音变化：자→재、타→태、서→세。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l01', 'card-p14-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"哄宝宝睡""让孩子上车""调低温度" —— 短形使动的另一半：<b>-우- / -추-</b>（-구- 极少）。<br>特点是常伴词内元音变化：자→재우다，타→태우다，서→세우다。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-우- vs -추-</b><br>
    ・-우- → 位置/身体（睡/坐/立/载）<br>
    <span style="color:#89756e">자다→재우다 / 타다→태우다</span><br>
    ・-추- → 程度/时间调整<br>
    <span style="color:#89756e">낮다→낮추다 / 늦다→늦추다</span>
  </div>
</div>`,
    compareLabel: '-우- vs -추-',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-우/구/추 短形使动</div>
  <div style="font-size:14px;color:#89756e">位置/时间/程度使动</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-우- 类（元音变）</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      자다 → 재우다（哄睡）<br>
      타다 → 태우다（载）<br>
      깨다 → 깨우다（叫醒）<br>
      서다 → 세우다（让站/立）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">-추- 类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      낮다 → 낮추다（降低）<br>
      늦다 → 늦추다（推迟）<br>
      맞다 → 맞추다（对齐/搭配）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">자웠어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재웠어요（元音变）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">낮혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">낮췄어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-게 하다（一般使动） ──────────────────────────────────────
  {
    id: 'card-p14-l03',
    partNumber: 14,
    lessonNumber: 3,
    title: '-게 하다',
    whatItDoes: '让/使',
    whatItDoesBody: '「-게 하다」是韩语最通用的使动表达："让 A 做 B""使 A 变得……"。可接任意动词/形容词，不看받침。相比短形使动（要记单词），-게 하다 是万能通配公式。',
    structureNote: '动词/形容词词干 + -게 하다｜句式：S가 O를 V-게 하다',
    rulesNote: '不看받침；可接任意动词/形容词；比短形使动更委婉、更客观',
    structures: [
      {
        ko: '엄마가 아이를 일찍 자게 했어요.',
        zh: '妈妈让孩子早睡。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '일찍', role: 'plain' },
          { text: '자게 했어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 학생들을 웃게 했어요.',
        zh: '老师让学生们笑起来。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들을', role: 'object' },
          { text: '웃게 했어요', role: 'verb' },
        ],
      },
      {
        ko: '이 영화가 저를 슬프게 했어요.',
        zh: '这部电影让我伤心。',
        tokens: [
          { text: '이 영화가', role: 'subject' },
          { text: '저를', role: 'object' },
          { text: '슬프게 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -게 하다（不看받침）', examples: '자다 → 자게 하다 / 웃다 → 웃게 하다 / 슬프다 → 슬프게 하다' },
      { type: 'rule', text: '句式：S가 O를 V-게 하다', examples: '엄마가 아이를 자게 했어요.' },
      { type: 'usage', text: '通用性最强，可与任意动词/形容词搭配', examples: '어떤 동사든 → -게 하다 형태 가능' },
      { type: 'usage', text: '相比短形使动，-게 하다 更客观、更委婉', examples: '(短形) 재우다（哄睡，直接照顾）｜(-게 하다) 자게 하다（让睡，允许/命令）' },
      { type: 'compare', text: '-게 하다 vs 短形使动 → 前者通用/客观，后者固定/亲密', examples: '엄마가 아기를 재웠다（亲自哄）/ 엄마가 아기를 자게 했다（安排/让）' },
      { type: 'note', text: '-게 하다 可用于允许/命令/让/使多种语气', examples: '아이를 놀게 하다.（允许玩）/ 학생들을 조용히 하게 하다.（让安静）' },
      { type: 'note', text: '句末动词接尾变化跟 하다 一致：하게 했어요 / 했어요 / 할 거예요', examples: '자게 할 거예요.（要让睡）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '일찍', role: 'plain' },
          { text: '자게 했어요', role: 'verb' },
        ],
        zh: '妈妈让孩子早睡。',
        swapWords: ['자다', '먹다', '쉬다', '놀다'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들을', role: 'object' },
          { text: '웃게 했어요', role: 'verb' },
        ],
        zh: '老师让学生们笑。',
        swapWords: ['웃다', '울다', '생각하다', '집중하다'],
      },
      {
        wordBlocks: [
          { text: '이 영화가', role: 'subject' },
          { text: '저를', role: 'object' },
          { text: '슬프게 했어요', role: 'verb' },
        ],
        zh: '电影让我伤心。',
        swapWords: ['슬프다', '기쁘다', '화나다', '감동스럽다'],
      },
    ],
    scenarios: [
      { icon: '🛏️', context: '哄睡', ko: '엄마가 아이를 일찍 자게 했어요.', zh: '妈妈让孩子早睡。' },
      { icon: '😂', context: '逗乐', ko: '선생님이 학생들을 웃게 했어요.', zh: '老师逗笑学生。' },
      { icon: '😢', context: '感人', ko: '이 영화가 저를 슬프게 했어요.', zh: '电影让我伤心。' },
      { icon: '🍎', context: '让吃', ko: '아빠가 아이에게 야채를 먹게 했어요.', zh: '爸爸让孩子吃菜。' },
      { icon: '📖', context: '让读', ko: '선생님이 학생들을 책을 읽게 했어요.', zh: '老师让学生读书。' },
      { icon: '🤫', context: '让安静', ko: '엄마가 아이들을 조용히 하게 했어요.', zh: '妈妈让孩子们安静。' },
    ],
    mistakes: [
      { wrong: '엄마가 아이가 자게 했어요', correct: '엄마가 아이를 자게 했어요', note: '使动句里 O 用 을/를，不用 이/가' },
      { wrong: '엄마가 아이를 자는 게 했어요', correct: '엄마가 아이를 자게 했어요', note: '固定为 -게 하다，不用 -는 게' },
      { wrong: '아빠가 아이에게 야채가 먹게 했어요', correct: '아빠가 아이에게 야채를 먹게 했어요', note: '被吃的对象宾语用 을/를' },
    ],
    quickTable: {
      title: '-게 하다 vs 短形使动',
      headers: ['形式', '特点', '语气'],
      rows: [
        ['-게 하다', '通用/任意动词', '客观/委婉/允许'],
        ['短形使动 (-이/히/리/기)', '固定组/需记忆', '亲密/直接'],
        ['-도록 하다', '正式/带安排感', '书面/建议'],
        ['-시키다', '하다类专用', '中性/命令'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-게 하다 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '엄마가 아이를 일찍 (자다) 했어요.',
          options: ['자는 게', '자게', '자서', '자기가'],
          answer: 1,
          explanation: '固定为 -게 하다 → 자게 했어요。',
        },
        {
          prompt: '이 영화가 저를 (슬프다) 했어요.',
          options: ['슬프는 게', '슬픈', '슬프게', '슬퍼서'],
          answer: 2,
          explanation: '形容词也接 -게 하다 → 슬프게 했어요（让我伤心）。',
        },
        {
          prompt: '엄마가 아이(   ) 야채(   ) 먹게 했어요.',
          options: ['가 / 가', '를 / 를', '에게 / 를', '가 / 을'],
          answer: 2,
          explanation: '被动者用 에게（这里"让阿姨吃"，对象人），宾语야채用 을。',
        },
        {
          prompt: '-게 하다 与短形使动最核心的区别？',
          options: [
            '意义完全相同',
            '-게 하다 通用可接任意动词/形容词；短形使动只对固定动词组',
            '-게 하다 只用于口语',
            '短形使动更客观',
          ],
          answer: 1,
          explanation: '-게 하다 是通用公式（不受动词限制）；短形使动是固定组合。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l01', 'card-p14-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">短形使动只对特定动词，怎么办？韩语给了万能通配公式：<b>-게 하다</b>。<br>接任意动词/形容词，直接表"让……做/使……变得……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-게 하다 vs 短形使动</b><br>
    ・-게 하다 → 通用<br>
    <span style="color:#89756e">자게 하다 / 웃게 하다 / 슬프게 하다</span><br>
    ・短形使动 → 固定组<br>
    <span style="color:#89756e">재우다 / 웃기다 / 울리다</span>
  </div>
</div>`,
    compareLabel: '通用 vs 固定',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-게 하다</div>
  <div style="font-size:14px;color:#89756e">万能使动公式</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词/形容词 + <b>-게 하다</b><br>
      句式：S가 O를 V-게 하다<br>
      形容词也可接（让……变得）<br>
      任何动词都能用（对比短形使动）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      엄마가 아이를 일찍 자게 했어요.<br>
      선생님이 학생들을 웃게 했어요.<br>
      이 영화가 저를 슬프게 했어요.<br>
      아빠가 아이에게 야채를 먹게 했어요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아이가 자게 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아이를 자게 했어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">자는 게 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">자게 했어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-도록 하다（安排/建议使动） ──────────────────────────────────────
  {
    id: 'card-p14-l04',
    partNumber: 14,
    lessonNumber: 4,
    title: '-도록 하다',
    whatItDoes: '安排/建议做',
    whatItDoesBody: '「-도록 하다」和 -게 하다 类似，都表"让/使"，但语气更书面、更正式，含"安排/建议/规定"的味道。常用于工作场合、规章制度、上级对下级的建议中。',
    structureNote: '动词词干 + -도록 하다｜句式：S가 O를 V-도록 하다',
    rulesNote: '正式/书面/含安排感；不接形容词；也常用于自我规劝 -도록 하다',
    structures: [
      {
        ko: '팀장님이 저희를 매일 회의에 참석하도록 했어요.',
        zh: '组长安排我们每天参加会议。',
        tokens: [
          { text: '팀장님이', role: 'subject' },
          { text: '저희를', role: 'object' },
          { text: '매일', role: 'time' },
          { text: '회의에', role: 'place' },
          { text: '참석하도록 했어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘부터 담배를 피우지 않도록 하겠습니다.',
        zh: '从今天起我决心不再抽烟。',
        tokens: [
          { text: '오늘부터', role: 'time' },
          { text: '담배를', role: 'object' },
          { text: '피우지 않도록 하겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '학생들이 시간을 지키도록 지도해 주세요.',
        zh: '请指导学生们守时。',
        tokens: [
          { text: '학생들이', role: 'subject' },
          { text: '시간을', role: 'object' },
          { text: '지키도록', role: 'verb' },
          { text: '지도해 주세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -도록 하다（不接形容词）', examples: '참석하다 → 참석하도록 하다 / 지키다 → 지키도록 하다' },
      { type: 'rule', text: '句式：S가 O를 V-도록 하다', examples: '팀장님이 저희를 참석하도록 했어요.' },
      { type: 'usage', text: '语气：书面/正式/安排感/建议', examples: '规章："학생들이 규정을 준수하도록 한다."' },
      { type: 'usage', text: '自我规劝：주어가 자기 자신에게 다짐', examples: '오늘부터 열심히 공부하도록 하겠습니다.' },
      { type: 'compare', text: '-도록 하다 vs -게 하다 → 前者更正式/带安排感，后者更中性/口语', examples: '(正式) 참석하도록 하다 / (中性) 참석하게 하다' },
      { type: 'note', text: '书面命令句常用 -도록 하다 而不是 -게 하다', examples: '"모든 직원이 참석하도록 한다."' },
      { type: 'note', text: '-도록 하다 前不接形容词；形容词用 -게 하다', examples: '误：슬프도록 하다 / 正：슬프게 하다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '팀장님이', role: 'subject' },
          { text: '저희를', role: 'object' },
          { text: '회의에', role: 'place' },
          { text: '참석하도록 했어요', role: 'verb' },
        ],
        zh: '组长安排我们参会。',
        swapWords: ['참석하다', '발표하다', '제출하다', '보고하다'],
      },
      {
        wordBlocks: [
          { text: '오늘부터', role: 'time' },
          { text: '담배를', role: 'object' },
          { text: '피우지 않도록 하겠습니다', role: 'verb' },
        ],
        zh: '从今起决心不吸烟。',
        swapWords: ['담배', '술', '커피', '야식'],
      },
      {
        wordBlocks: [
          { text: '학생들이', role: 'subject' },
          { text: '시간을', role: 'object' },
          { text: '지키도록', role: 'verb' },
          { text: '지도해 주세요', role: 'verb' },
        ],
        zh: '请指导学生守时。',
        swapWords: ['지키다', '준수하다', '따르다', '실천하다'],
      },
    ],
    scenarios: [
      { icon: '📋', context: '安排', ko: '팀장님이 저희를 회의에 참석하도록 했어요.', zh: '组长安排我们参会。' },
      { icon: '🚭', context: '自我规劝', ko: '담배를 피우지 않도록 하겠습니다.', zh: '决心不再抽烟。' },
      { icon: '⏰', context: '教育', ko: '학생들이 시간을 지키도록 지도해 주세요.', zh: '请指导学生守时。' },
      { icon: '📢', context: '规章', ko: '모든 직원이 매일 출석하도록 합니다.', zh: '所有员工都必须每日出勤。' },
      { icon: '💪', context: '决心', ko: '앞으로 운동을 열심히 하도록 하겠습니다.', zh: '今后决心努力运动。' },
      { icon: '🚦', context: '规则', ko: '보행자는 신호를 지키도록 해야 합니다.', zh: '行人须遵守信号灯。' },
    ],
    mistakes: [
      { wrong: '학생들을 슬프도록 했어요', correct: '학생들을 슬프게 했어요', note: '-도록 하다 不接形容词；形容词用 -게 하다' },
      { wrong: '아이를 자도록 했어요', correct: '아이를 자게 했어요 / 아이를 재웠어요', note: '日常"让孩子睡"更自然用 -게 하다 或短形使动；-도록 하다 偏正式安排感' },
      { wrong: '담배를 피우지 않도록 하다', correct: '담배를 피우지 않도록 하겠습니다', note: '自我决心用 -하겠습니다 更贴切' },
    ],
    quickTable: {
      title: '-도록 하다 vs -게 하다',
      headers: ['形式', '语体', '典型语境'],
      rows: [
        ['-도록 하다', '正式/书面', '安排 / 规章 / 建议 / 自我规劝'],
        ['-게 하다', '中性/口语', '一般"让"'],
        ['-도록 하다（+형용사）', '不用', '形容词请改用 -게 하다'],
        ['-시키다', '하다类专用', '例：공부시키다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-도록 하다 练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '팀장님이 저희를 회의에 (참석하다) 했어요.',
          options: ['참석하는 게', '참석하도록', '참석하게', '참석해서'],
          answer: 1,
          explanation: '正式安排语境 → -도록 하다 → 참석하도록 했어요。（참석하게 했어요 也可，但正式度略低）',
        },
        {
          prompt: '오늘부터 담배를 (피우지 않다) 하겠습니다.',
          options: ['피우지 않은', '피우지 않도록', '피우지 않아서', '피우지 않고'],
          answer: 1,
          explanation: '自我规劝/决心 → -지 않도록 하다 → 피우지 않도록 하겠습니다。',
        },
        {
          prompt: '"学生们伤心了" 韩语用 -도록 하다 是否合适？',
          options: ['合适', '不合适（形容词请用 -게 하다）', '取决于语境', '完全通用'],
          answer: 1,
          explanation: '-도록 하다 只接动词；形容词（如 슬프다）用 -게 하다 → 슬프게 하다。',
        },
        {
          prompt: '-도록 하다 vs -게 하다 最核心区别是？',
          options: [
            '意义完全相同',
            '-도록 하다 更正式/带安排感；-게 하다 中性/通用（可接形容词）',
            '-도록 하다 只用于疑问句',
            '-도록 하다 只用于过去时',
          ],
          answer: 1,
          explanation: '-도록 하다 正式/安排感/仅接动词；-게 하다 中性/更通用/可接形容词。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"组长安排我们参会""决心戒烟" —— 韩语正式场合、规章、自我规劝的使动用 <b>-도록 하다</b>。<br>比 -게 하다 更书面、更带"安排/建议"感，不接形容词。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-도록 하다 vs -게 하다</b><br>
    ・-도록 하다 → 正式/书面/含安排<br>
    <span style="color:#89756e">참석하도록 했어요.（安排参会）</span><br>
    ・-게 하다 → 中性/口语/可接形容词<br>
    <span style="color:#89756e">웃게 했어요. / 슬프게 했어요.</span>
  </div>
</div>`,
    compareLabel: '正式安排 vs 通用',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-도록 하다</div>
  <div style="font-size:14px;color:#89756e">正式安排 / 规章 / 自我规劝</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词词干 + <b>-도록 하다</b><br>
      不接形容词（用 -게 하다）<br>
      语气：书面/正式/安排感<br>
      自我规劝："…-도록 하겠습니다"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">典型场景</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      팀장님이 참석하도록 했어요.（安排）<br>
      담배를 피우지 않도록 하겠습니다.（决心）<br>
      학생들이 시간을 지키도록 지도해 주세요.（教育）<br>
      직원 모두 출석하도록 한다.（规章）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">슬프도록 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">슬프게 했어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아이를 자도록 했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아이를 자게 했어요 / 재웠어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：-시키다（하다类使动） ──────────────────────────────────────
  {
    id: 'card-p14-l05',
    partNumber: 14,
    lessonNumber: 5,
    title: '-시키다',
    whatItDoes: '하다类使动',
    whatItDoesBody: '「하다」结尾的动词无法直接加 -이/히/리/기，要变使动就用 -시키다：공부하다 → 공부시키다（让……学习）、청소하다 → 청소시키다（让……打扫）、운동하다 → 운동시키다。语义常带"命令/使唤/让做"，语气可能偏强。',
    structureNote: '汉字词/N + 하다 → N + 시키다｜句式：S가 O에게 N을 시키다',
    rulesNote: '하다 类专用；日常口语常用；有时带"使唤/命令"的语气感',
    structures: [
      {
        ko: '엄마가 아이에게 공부를 시켰어요.',
        zh: '妈妈让孩子学习。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아이에게', role: 'plain' },
          { text: '공부를', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 학생들을 청소시켰어요.',
        zh: '老师让学生们打扫。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들을', role: 'object' },
          { text: '청소시켰어요', role: 'verb' },
        ],
      },
      {
        ko: '식당에서 김치찌개를 시켰어요.',
        zh: '在餐厅点了泡菜汤。',
        tokens: [
          { text: '식당에서', role: 'place' },
          { text: '김치찌개를', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '汉字词 + 하다 → 汉字词 + 시키다', examples: '공부하다 → 공부시키다 / 청소하다 → 청소시키다 / 운동하다 → 운동시키다' },
      { type: 'rule', text: '句式 A：S가 O에게 N을 시키다', examples: '엄마가 아이에게 공부를 시켰어요.' },
      { type: 'rule', text: '句式 B：S가 O를 N시키다（连写）', examples: '선생님이 학생들을 청소시켰어요.' },
      { type: 'usage', text: '"点菜/点单" → 也用 시키다', examples: '식당에서 짜장면을 시켰다.' },
      { type: 'usage', text: '带"命令/使唤"语气感，慎用于对上级/长辈', examples: '避免对长辈说 "일 시키셨어요?"（不礼貌）' },
      { type: 'compare', text: '-시키다 vs -게 하다 → 前者只对하다类，语气可能偏"使唤"；后者通用/客观', examples: '공부시키다（让/使唤学习）/ 공부하게 하다（让学习，更中性）' },
      { type: 'note', text: '双重使动 -시키다 + 하게 하다 是错误', examples: '误：공부시키게 하다 → 用 공부시키다 或 공부하게 하다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아이에게', role: 'plain' },
          { text: '공부를', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
        zh: '妈妈让孩子学习。',
        swapWords: ['공부', '숙제', '운동', '연습'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '학생들을', role: 'object' },
          { text: '청소시켰어요', role: 'verb' },
        ],
        zh: '老师让学生打扫。',
        swapWords: ['청소', '정리', '준비', '이동'],
      },
      {
        wordBlocks: [
          { text: '식당에서', role: 'place' },
          { text: '김치찌개를', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
        zh: '在餐厅点泡菜汤。',
        swapWords: ['김치찌개', '된장찌개', '비빔밥', '떡볶이'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '让学习', ko: '엄마가 아이에게 공부를 시켰어요.', zh: '妈妈让孩子学习。' },
      { icon: '🧹', context: '让打扫', ko: '선생님이 학생들을 청소시켰어요.', zh: '老师让学生打扫。' },
      { icon: '🍜', context: '点单', ko: '식당에서 김치찌개를 시켰어요.', zh: '在餐厅点泡菜汤。' },
      { icon: '🏃', context: '让运动', ko: '코치가 선수들을 운동시켰어요.', zh: '教练让选手运动。' },
      { icon: '📝', context: '让写', ko: '선생님이 학생들에게 시험을 보게 시켰어요.', zh: '老师让学生考试。' },
      { icon: '👔', context: '使唤', ko: '상사가 부하 직원을 잔심부름 시켜요.', zh: '上司让下属跑腿。' },
    ],
    mistakes: [
      { wrong: '엄마가 아이에게 공부하시켰어요', correct: '엄마가 아이에게 공부를 시켰어요', note: '-시키다 直接接名词（공부），不接하다 词干' },
      { wrong: '엄마가 아이를 공부하게 시켰어요', correct: '엄마가 아이를 공부하게 했어요 / 공부시켰어요', note: '双重使动错误；两者选一' },
      { wrong: '선배님, 무엇을 시켰어요?', correct: '선배님, 무엇을 부탁하셨어요?', note: '"시키다" 对长辈显失礼，用 부탁하다 / 지시하다' },
    ],
    quickTable: {
      title: '常用 -시키다 汇总',
      headers: ['原型 하다', '使动 시키다', '含义'],
      rows: [
        ['공부하다', '공부시키다', '让学习'],
        ['청소하다', '청소시키다', '让打扫'],
        ['운동하다', '운동시키다', '让运动'],
        ['이동하다', '이동시키다', '让移动/调动'],
        ['정지하다', '정지시키다', '让停止'],
        ['(点菜)', '시키다', '点单/点餐'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-시키다 练习',
      body: '选择正确形式或搭配',
      questions: [
        {
          prompt: '엄마가 아이에게 공부(   ) (하다) 였어요.',
          options: ['가 / 하시켰어요', '를 / 시켰어요', '를 / 했어요', '가 / 시켰어요'],
          answer: 1,
          explanation: '하다 类使动 → 名词 + 을/를 + 시키다 → 공부를 시켰어요。',
        },
        {
          prompt: '식당에서 짜장면을 (?).',
          options: ['만들었어요', '먹였어요', '시켰어요', '했어요'],
          answer: 2,
          explanation: '"点单/点餐" 用 시키다 → 짜장면을 시켰어요。',
        },
        {
          prompt: '下列哪句 -시키다 使用不当？',
          options: [
            '엄마가 아이에게 공부를 시켰어요.',
            '코치가 선수들을 운동시켰어요.',
            '선배님, 무엇을 시켰어요?',
            '식당에서 김치찌개를 시켰어요.',
          ],
          answer: 2,
          explanation: '对长辈直接用 "시키다" 显不敬；应改用 부탁하다 / 지시하다。',
        },
        {
          prompt: '-시키다 vs -게 하다 vs 短形使动 三者的关系？',
          options: [
            '-시키다 = 短形使动',
            '-시키다 专用于하다类；-게 하다 通用；短形使动固定动词组',
            '三者完全相同',
            '-시키다 是被动',
          ],
          answer: 1,
          explanation: '三者分工：-시키다（하다类）/ -게 하다（通用）/ 短形使动（固定组）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"妈妈让孩子学习""老师让打扫""点菜" —— 韩语하다类动词的使动是 <b>-시키다</b>。<br>공부하다→공부시키다，청소하다→청소시키다。带"命令/使唤"语气，对长辈慎用。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-시키다 vs -게 하다</b><br>
    ・-시키다 → 하다类专用<br>
    <span style="color:#89756e">공부시키다（让学习）/ 청소시키다</span><br>
    ・-게 하다 → 通用<br>
    <span style="color:#89756e">공부하게 하다 / 청소하게 하다</span>
  </div>
</div>`,
    compareLabel: '-시키다 vs -게 하다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-시키다（하다类使动）</div>
  <div style="font-size:14px;color:#89756e">让做 / 使唤 / 点单</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      하다 → <b>시키다</b>：공부하다 → 공부시키다<br>
      句式：S가 O에게 N을 시키다<br>
      也用于"点菜/点单"<br>
      带"使唤/命令"感 → 对长辈慎用
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频例子</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      공부시키다（让学习）<br>
      청소시키다（让打扫）<br>
      운동시키다（让运动）<br>
      이동시키다（让移动/调动）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">공부하시켰어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">공부를 시켰어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">공부하게 시켰어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">공부시켰어요 / 공부하게 했어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：被动 vs 使动 辨析 ──────────────────────────────────────
  {
    id: 'card-p14-l06',
    partNumber: 14,
    lessonNumber: 6,
    title: '被动 vs 使动 辨析',
    whatItDoes: '同接尾 分辨',
    whatItDoesBody: '被动和使动共用 -이/히/리/기 接尾，学习者最容易混。分辨的钥匙是"句子结构和助词"：被动的主语是"被做的人/物"（이/가 + V-히-）；使动的主语是"让别人做的人"（이/가 + O를 + V-히-）。',
    structureNote: '被动：受动者이/가 + 施动者에게 + V-이/히-｜使动：施动者이/가 + 受动者를 + V-이/히-',
    rulesNote: '结构里有没有"目的宾语 을/를"是关键：有 → 使动；没有 → 被动',
    structures: [
      {
        ko: '도둑이 경찰에게 잡혔어요.',
        zh: '小偷被警察抓了。（被动）',
        tokens: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
      },
      {
        ko: '경찰이 도둑을 잡았어요.',
        zh: '警察抓了小偷。（主动）',
        tokens: [
          { text: '경찰이', role: 'subject' },
          { text: '도둑을', role: 'object' },
          { text: '잡았어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 아이에게 밥을 먹였어요.',
        zh: '妈妈喂孩子饭。（使动）',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아이에게', role: 'plain' },
          { text: '밥을', role: 'object' },
          { text: '먹였어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '被动：受动者做主语，用 이/가；施动者用 에게/에', examples: '도둑이 경찰에게 잡혔다.' },
      { type: 'rule', text: '使动：施动者做主语，用 이/가；受动者用 에게/를；有 O를', examples: '엄마가 아이에게 밥을 먹였다.' },
      { type: 'rule', text: '关键区别：使动句里有"目的宾语 을/를"，被动句里没有', examples: '(使动) 밥을 먹였다 有 밥을 / (被动) 잡혔다 没有 을/를' },
      { type: 'usage', text: '同一动词 먹이다：使动"喂" ≠ 被动 먹히다"被吃"', examples: '엄마가 아이에게 밥을 먹였다.（喂）/ 물고기가 큰 물고기에게 먹혔다.（被吃）' },
      { type: 'usage', text: '보이다 特殊：既是被动"能看到"又是使动"给看"', examples: '(被动) 산이 보인다. / (使动) 엄마가 아기에게 그림책을 보였다.' },
      { type: 'compare', text: '被动 vs 使动 判断步骤 → 找主语角色→看有无 을/를 宾语', examples: '有宾语 → 使动；无宾语 → 被动' },
      { type: 'note', text: '一些动词既是被动又是使动，靠语境判断', examples: '보이다 / 잡히다 / 안기다（分场景理解）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '도둑이', role: 'subject' },
          { text: '경찰에게', role: 'plain' },
          { text: '잡혔어요', role: 'verb' },
        ],
        zh: '小偷被警察抓（被动）。',
        swapWords: ['도둑', '범인', '용의자', '탈옥범'],
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아이에게', role: 'plain' },
          { text: '밥을', role: 'object' },
          { text: '먹였어요', role: 'verb' },
        ],
        zh: '妈妈喂孩子饭（使动）。',
        swapWords: ['밥', '우유', '약', '과일'],
      },
      {
        wordBlocks: [
          { text: '작은 물고기가', role: 'subject' },
          { text: '큰 물고기에게', role: 'plain' },
          { text: '먹혔어요', role: 'verb' },
        ],
        zh: '小鱼被大鱼吃（被动）。',
        swapWords: ['먹히다', '잡히다', '쫓기다', '물리다'],
      },
    ],
    scenarios: [
      { icon: '👮', context: '被动·抓', ko: '도둑이 경찰에게 잡혔어요.', zh: '小偷被警察抓（被动）。' },
      { icon: '🍚', context: '使动·喂', ko: '엄마가 아이에게 밥을 먹였어요.', zh: '妈妈喂孩子（使动）。' },
      { icon: '🐟', context: '被动·被吃', ko: '작은 물고기가 큰 물고기에게 먹혔어요.', zh: '小鱼被大鱼吃（被动）。' },
      { icon: '📖', context: '使动·给看', ko: '엄마가 아기에게 그림책을 보였어요.', zh: '妈妈给宝宝看书（使动）。' },
      { icon: '⛰️', context: '被动·能看见', ko: '멀리서 산이 보여요.', zh: '远处能看见山（被动）。' },
      { icon: '👶', context: '使动·哄睡', ko: '엄마가 아기를 재웠어요.', zh: '妈妈哄宝宝睡（使动）。' },
    ],
    mistakes: [
      { wrong: '엄마가 아이를 밥을 먹혔어요', correct: '엄마가 아이에게 밥을 먹였어요', note: '먹히다 是被动"被吃"；使动是 먹이다' },
      { wrong: '도둑을 경찰에게 잡혔어요', correct: '도둑이 경찰에게 잡혔어요', note: '被动句受动者做主语用 이/가' },
      { wrong: '엄마가 아이가 우유를 먹였어요', correct: '엄마가 아이에게 우유를 먹였어요', note: '使动句里被使动者用 에게 或 을/를，不用 이/가' },
    ],
    quickTable: {
      title: '被动 vs 使动 分辨',
      headers: ['判断维度', '被动', '使动'],
      rows: [
        ['主语', '受动者（被做的人/物）', '施动者（让别人做的人）'],
        ['助词', '受动者이/가 + 施动者에게', '施动者이/가 + 受动者를/에게'],
        ['宾语 을/를', '通常没有', '有目的宾语 을/를'],
        ['例', '도둑이 경찰에게 잡혔다', '엄마가 아이에게 밥을 먹였다'],
        ['-이/히-', '먹히다（被吃）', '먹이다（喂）'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '被动 vs 使动 判断',
      body: '判断句子属于哪种',
      questions: [
        {
          prompt: '"엄마가 아이에게 밥을 먹였어요."',
          options: ['被动', '使动', '主动', '过去时'],
          answer: 1,
          explanation: '主语엄마（施动者），有宾语 밥을，먹이다 是使动"喂"。',
        },
        {
          prompt: '"작은 물고기가 큰 물고기에게 먹혔어요."',
          options: ['被动', '使动', '主动', '将来时'],
          answer: 0,
          explanation: '主语 작은 물고기（受动者），无 을/를，먹히다 是被动"被吃"。',
        },
        {
          prompt: '"엄마가 아이를 재웠어요."',
          options: ['被动', '使动', '主动', '推测'],
          answer: 1,
          explanation: '主语엄마（施动者），有 아이를，재우다 是使动"哄睡"。',
        },
        {
          prompt: '被动 vs 使动 最快的判断方法？',
          options: [
            '看动词长度',
            '看接尾（-이/히/리/기）是哪一个',
            '看句子里有没有目的宾语 을/를',
            '看时态',
          ],
          answer: 2,
          explanation: '同接尾时，有目的宾语 을/를 → 使动；没有 → 被动。',
        },
      ],
    },
    linkedGrammarIds: ['card-p13-l01', 'card-p14-l01'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"먹이다"（喂 · 使动）vs"먹히다"（被吃 · 被动） —— 同一套接尾 -이/히/리/기，学习者最容易混。<br>分辨的黄金公式：<b>句子里有没有"을/를"目的宾语？</b> 有 → 使动；没有 → 被动。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>被动 vs 使动</b><br>
    ・被动：<span style="color:#89756e">B가 A에게 V-히-</span><br>
    도둑이 경찰에게 잡혔다.（无 을/를）<br>
    ・使动：<span style="color:#89756e">S가 O에게 N을 V-이-</span><br>
    엄마가 아이에게 밥을 먹였다.（有 을/를）
  </div>
</div>`,
    compareLabel: '被动 vs 使动',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">被动 vs 使动 辨析</div>
  <div style="font-size:14px;color:#89756e">同接尾 · 靠结构分辨</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">判断三步</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 找主语：是"被做的"还是"让别人做的"？<br>
      2. 看有没有 을/를 目的宾语<br>
      3. 有宾语 → 使动；无宾语 → 被动
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">高频对比</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      먹히다（被吃）/ 먹이다（喂）<br>
      잡히다（被抓）/ 잡히다（让抓 · 少用）<br>
      보이다（能看到 · 被动）/ 보이다（给看 · 使动）<br>
      안기다（被抱）/ 안기다（让抱）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">엄마가 아이에게 밥을 먹혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">엄마가 아이에게 밥을 먹였어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">도둑을 경찰에게 잡혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">도둑이 경찰에게 잡혔어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：使动句助词 을/를 · 에게 ──────────────────────────────────────
  {
    id: 'card-p14-l07',
    partNumber: 14,
    lessonNumber: 7,
    title: '使动句助词 을/를·에게',
    whatItDoes: '被使动者助词',
    whatItDoesBody: '使动句里"被使动者（被让做的人）"到底该用 을/를 还是 에게？规则：不及物动词的使动 → 用 을/를；及物动词的使动 → 用 에게，因为宾语位置已被"目的宾语"占了。这个"占位"逻辑是使动助词的核心。',
    structureNote: '不及物 → S가 O를 V-使动｜及物 → S가 O에게 N을 V-使动',
    rulesNote: '判断动词原型是否及物 → 决定被使动者用 을/를 还是 에게',
    structures: [
      {
        ko: '엄마가 아기를 재웠어요.',
        zh: '妈妈哄宝宝睡。（자다 不及物 → 아기를）',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 아기에게 우유를 먹였어요.',
        zh: '妈妈喂宝宝奶。（먹다 及物 → 아기에게）',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아기에게', role: 'plain' },
          { text: '우유를', role: 'object' },
          { text: '먹였어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 학생을 웃겼어요.',
        zh: '老师逗笑了学生。（웃다 不及物 → 학생을）',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '학생을', role: 'object' },
          { text: '웃겼어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '不及物动词的使动 → 被使动者用 을/를', examples: '자다（不及物） → 아기를 재웠다 / 웃다 → 학생을 웃겼다' },
      { type: 'rule', text: '及物动词的使动 → 被使动者用 에게，目的宾语用 을/를', examples: '먹다（及物） → 아기에게 우유를 먹였다 / 읽다 → 학생에게 책을 읽혔다' },
      { type: 'rule', text: '判断法：原型动词能不能接 을/를 宾语', examples: '자다 O를 자다 ✗ → 不及物；먹다 O를 먹다 ✓ → 及物' },
      { type: 'usage', text: '一个使动句最多两个 을/를 是可能的', examples: '误：엄마가 아이를 우유를 먹였다 → 正：아이에게 우유를 먹였다' },
      { type: 'usage', text: '也可用 에게 表被使动者（不及物动词的情况下更委婉）', examples: '엄마가 아이에게 자게 했다.（比 아이를 자게 했다 更委婉）' },
      { type: 'compare', text: '短形使动 vs -게 하다 助词规则相同', examples: '재우다 / 자게 하다 → 都用 아기를 或 아이에게' },
      { type: 'note', text: '-시키다 常用"S가 O에게 N을 시키다"', examples: '엄마가 아이에게 공부를 시켰다.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
        zh: '妈妈哄宝宝睡。',
        swapWords: ['재우다', '깨우다', '앉히다', '눕히다'],
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아기에게', role: 'plain' },
          { text: '우유를', role: 'object' },
          { text: '먹였어요', role: 'verb' },
        ],
        zh: '妈妈喂宝宝奶。',
        swapWords: ['우유', '주스', '이유식', '물'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '학생에게', role: 'plain' },
          { text: '책을', role: 'object' },
          { text: '읽혔어요', role: 'verb' },
        ],
        zh: '老师让学生读书。',
        swapWords: ['읽히다', '외우게 하다', '풀게 하다', '쓰게 하다'],
      },
    ],
    scenarios: [
      { icon: '👶', context: '不及物·哄睡', ko: '엄마가 아기를 재웠어요.', zh: '妈妈哄睡。' },
      { icon: '🍼', context: '及物·喂奶', ko: '엄마가 아기에게 우유를 먹였어요.', zh: '妈妈喂奶。' },
      { icon: '😂', context: '不及物·逗笑', ko: '선생님이 학생을 웃겼어요.', zh: '老师逗笑。' },
      { icon: '📖', context: '及物·让读', ko: '선생님이 학생에게 책을 읽혔어요.', zh: '老师让学生读书。' },
      { icon: '🚶', context: '不及物·让站', ko: '경찰이 시민들을 세웠어요.', zh: '警察让市民站着。' },
      { icon: '📝', context: '及物·写作业', ko: '선생님이 학생에게 숙제를 하게 했어요.', zh: '老师让学生做作业。' },
    ],
    mistakes: [
      { wrong: '엄마가 아기를 우유를 먹였어요', correct: '엄마가 아기에게 우유를 먹였어요', note: '及物动词的使动，被使动者用 에게，宾语用 을/를；不能两个 을/를' },
      { wrong: '엄마가 아기에게 재웠어요', correct: '엄마가 아기를 재웠어요', note: '자다 不及物 → 被使动者用 을/를 更自然' },
      { wrong: '선생님이 학생을 책을 읽혔어요', correct: '선생님이 학생에게 책을 읽혔어요', note: '읽다 及物 → 被使动者用 에게' },
    ],
    quickTable: {
      title: '使动句助词规则',
      headers: ['原型动词', '被使动者', '目的宾语'],
      rows: [
        ['자다（不及物）', '아기를', '—'],
        ['웃다（不及物）', '학생을', '—'],
        ['서다（不及物）', '차를', '—'],
        ['먹다（及物）', '아기에게', '우유를'],
        ['읽다（及物）', '학생에게', '책을'],
        ['공부하다（及物）', '아이에게', '공부를'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '使动助词练习',
      body: '选择正确的助词',
      questions: [
        {
          prompt: '엄마가 아기(   ) 재웠어요.',
          options: ['에게', '를', '이', '가'],
          answer: 1,
          explanation: '자다 是不及物动词 → 被使动者用 을/를 → 아기를。',
        },
        {
          prompt: '엄마가 아기(   ) 우유(   ) 먹였어요.',
          options: ['를 / 를', '에게 / 를', '에게 / 가', '가 / 를'],
          answer: 1,
          explanation: '먹다 及物 → 被使动者用 에게，目的宾语用 을/를 → 아기에게 우유를。',
        },
        {
          prompt: '선생님이 학생(   ) 책(   ) 읽혔어요.',
          options: ['을 / 을', '에게 / 을', '에게 / 이', '가 / 을'],
          answer: 1,
          explanation: '읽다 是及物动词 → 学生用 에게，책用 을 → 학생에게 책을。',
        },
        {
          prompt: '决定使动句中"被使动者用 을/를 还是 에게"的关键是？',
          options: [
            '被使动者是不是人',
            '原型动词是不是及物（能不能接 을/를 宾语）',
            '是不是过去时',
            '句子是不是长',
          ],
          answer: 1,
          explanation: '原型动词及物 → 被使动者用 에게（宾位已被占）；不及物 → 用 을/를。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l01', 'card-p14-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">使动句里"被使动者"到底用 을/를 还是 에게？答案在<b>原型动词是否及物</b>：<br>不及物（자다/웃다）→ 아기를；及物（먹다/읽다）→ 아기에게 + 목적어 을/를。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>不及物 vs 及物 使动</b><br>
    ・不及物 → S가 O를 V<br>
    <span style="color:#89756e">엄마가 아기를 재웠다.</span><br>
    ・及物 → S가 O에게 N을 V<br>
    <span style="color:#89756e">엄마가 아기에게 우유를 먹였다.</span>
  </div>
</div>`,
    compareLabel: '不及物 vs 及物',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">使动句助词</div>
  <div style="font-size:14px;color:#89756e">을/를 vs 에게 · 靠及物性区分</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      不及物 → <b>被使动者用 을/를</b><br>
      及物 → <b>被使动者用 에게，宾语用 을/를</b><br>
      避免一句两个 을/를<br>
      -시키다 → S가 O에게 N을 시키다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">典型例子</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      엄마가 아기를 재웠다.（不及物）<br>
      엄마가 아기에게 우유를 먹였다.（及物）<br>
      선생님이 학생을 웃겼다.（不及物）<br>
      선생님이 학생에게 책을 읽혔다.（及物）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아기를 우유를 먹였다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아기에게 우유를 먹였다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아기에게 재웠다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아기를 재웠다</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：强制 vs 允许 vs 使唤 语气对比 ──────────────────────────────────────
  {
    id: 'card-p14-l08',
    partNumber: 14,
    lessonNumber: 8,
    title: '强制 vs 允许 vs 使唤',
    whatItDoes: '使动语气分层',
    whatItDoesBody: '同样是"让"，语气差异巨大：短形使动多为"照顾/亲密"、-게 하다 多为"允许/中性"、-도록 하다 多为"安排/规章"、-시키다 常带"使唤"感。选错语气可能显得强硬或不敬。',
    structureNote: '4 种使动方式的语气光谱',
    rulesNote: '短形使动 → 亲密照顾｜-게 하다 → 中性允许｜-도록 하다 → 正式安排｜-시키다 → 命令使唤',
    structures: [
      {
        ko: '엄마가 아기를 재웠어요.',
        zh: '妈妈亲手哄宝宝睡（短形，照顾感）。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 아이를 일찍 자게 했어요.',
        zh: '妈妈让孩子早睡（-게 하다，中性）。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '일찍', role: 'plain' },
          { text: '자게 했어요', role: 'verb' },
        ],
      },
      {
        ko: '상사가 부하에게 야근을 시켰어요.',
        zh: '上司让下属加班（-시키다，命令使唤感）。',
        tokens: [
          { text: '상사가', role: 'subject' },
          { text: '부하에게', role: 'plain' },
          { text: '야근을', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '短形使动（-이/히/리/기/우/추）→ 亲密/照顾/亲手做', examples: '엄마가 아기를 재웠다.（亲手哄睡）' },
      { type: 'rule', text: '-게 하다 → 中性/允许/一般"让"', examples: '엄마가 아이를 자게 했다.（让睡，安排）' },
      { type: 'rule', text: '-도록 하다 → 正式/安排感/规章', examples: '팀장이 팀원을 참석하도록 했다.（正式安排）' },
      { type: 'rule', text: '-시키다 → 命令使唤感（对下位者）', examples: '상사가 부하에게 야근을 시켰다.（命令）' },
      { type: 'usage', text: '选用建议：对长辈/客户避免 -시키다', examples: '避免："선생님, 무엇을 시켰어요?" → 请用"부탁하다 / 지시하다"' },
      { type: 'compare', text: '同一场景不同语气：재우다 vs 자게 하다 vs 자도록 하다', examples: '재웠다（亲手）/ 자게 했다（允许/让）/ 자도록 했다（正式安排）' },
      { type: 'note', text: '使动 ≠ 强迫；语境决定是"允许"还是"命令"', examples: '아이를 놀게 했다.（允许玩）/ 아이를 놀게 시켰다（少用；强调命令）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아기를', role: 'object' },
          { text: '재웠어요', role: 'verb' },
        ],
        zh: '妈妈亲手哄睡（照顾）。',
        swapWords: ['재우다', '먹이다', '입히다', '씻기다'],
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '아이를', role: 'object' },
          { text: '일찍', role: 'plain' },
          { text: '자게 했어요', role: 'verb' },
        ],
        zh: '妈妈让孩子早睡（允许）。',
        swapWords: ['자다', '먹다', '쉬다', '나가다'],
      },
      {
        wordBlocks: [
          { text: '상사가', role: 'subject' },
          { text: '부하에게', role: 'plain' },
          { text: '야근을', role: 'object' },
          { text: '시켰어요', role: 'verb' },
        ],
        zh: '上司命下属加班（使唤）。',
        swapWords: ['야근', '심부름', '보고', '출장'],
      },
    ],
    scenarios: [
      { icon: '💕', context: '亲手·照顾', ko: '엄마가 아기를 재웠어요.', zh: '妈妈亲手哄睡。' },
      { icon: '🙂', context: '允许', ko: '엄마가 아이를 밖에서 놀게 했어요.', zh: '妈妈让孩子出去玩。' },
      { icon: '📋', context: '正式安排', ko: '팀장님이 팀원을 회의에 참석하도록 했어요.', zh: '组长安排参会。' },
      { icon: '💼', context: '命令使唤', ko: '상사가 부하에게 야근을 시켰어요.', zh: '上司让下属加班。' },
      { icon: '📚', context: '教育安排', ko: '학생들이 시간을 지키도록 지도해 주세요.', zh: '请指导学生守时。' },
      { icon: '🍚', context: '中性让', ko: '아빠가 아이에게 야채를 먹게 했어요.', zh: '爸爸让孩子吃菜。' },
    ],
    mistakes: [
      { wrong: '선생님, 무엇을 시키셨어요?', correct: '선생님, 무엇을 부탁하셨어요?', note: '对长辈用 -시키다 显不敬；用 부탁하다 / 지시하다' },
      { wrong: '엄마가 아기를 자도록 했어요', correct: '엄마가 아기를 자게 했어요 / 재웠어요', note: '亲密照顾场景用 -도록 하다 显生硬；用 -게 하다 或短形使动' },
      { wrong: '아이를 놀게 시켰어요', correct: '아이를 놀게 했어요', note: '一般"允许玩"用 -게 하다 就够；-시키다 语气偏命令' },
    ],
    quickTable: {
      title: '4 种使动 · 语气光谱',
      headers: ['形式', '语气', '典型场景'],
      rows: [
        ['短形使动 (-이/히-)', '亲密/照顾', '母子/亲手做的动作'],
        ['-게 하다', '中性/允许', '一般"让"'],
        ['-도록 하다', '正式/安排', '规章/工作场合/自我规劝'],
        ['-시키다', '命令/使唤', '上级对下级/下达任务/点单'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '语气分层判断',
      body: '选择最合适的使动方式',
      questions: [
        {
          prompt: '"妈妈亲手哄宝宝睡" 最贴切的表达是？',
          options: ['아기를 자도록 했어요', '아기를 자게 시켰어요', '아기를 재웠어요', '아기를 자도록 시켰어요'],
          answer: 2,
          explanation: '亲手照顾语境 → 短形使动 재우다 最贴切；-도록 하다 生硬；-시키다 使唤感。',
        },
        {
          prompt: '"组长安排组员参会" 最贴切的表达是？',
          options: ['팀원을 참석하게 시켰어요', '팀원을 참석하도록 했어요', '팀원을 참석시켰어요', '팀원이 참석했어요'],
          answer: 1,
          explanation: '正式安排/公务场合 → -도록 하다。-시키다 略带命令感也可，但 -도록 하다 更正式。',
        },
        {
          prompt: '下列哪句对长辈失礼？',
          options: [
            '선생님이 학생들에게 숙제를 시키셨어요.',
            '선생님, 무엇을 시키셨어요?',
            '엄마가 저에게 심부름을 시켰어요.',
            '코치가 선수를 훈련시켰어요.',
          ],
          answer: 1,
          explanation: '直接问长辈 "무엇을 시키셨어요?" 显不敬；应用 "무엇을 부탁하셨어요?"。',
        },
        {
          prompt: '同一场景可选多种使动，最重要的挑选标准是？',
          options: [
            '哪个短',
            '语气 - 亲密/中性/正式/命令 是否符合语境',
            '哪个新',
            '哪个是过去时',
          ],
          answer: 1,
          explanation: '语境是关键 - 亲手照顾用短形，一般让用 -게 하다，正式用 -도록 하다，使唤用 -시키다。',
        },
      ],
    },
    linkedGrammarIds: ['card-p14-l01', 'card-p14-l03', 'card-p14-l04', 'card-p14-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">同是"让"，语气天差地别：<br><b>재우다</b>（亲手哄）· <b>-게 하다</b>（一般让）· <b>-도록 하다</b>（正式安排）· <b>-시키다</b>（命令使唤）。<br>用错了就会从"妈妈的爱"变成"命令使唤"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>使动语气光谱</b><br>
    ・短形使动 → 亲密/照顾<br>
    <span style="color:#89756e">엄마가 아기를 재웠다.</span><br>
    ・-게 하다 → 中性/允许<br>
    <span style="color:#89756e">엄마가 아이를 자게 했다.</span><br>
    ・-도록 하다 → 正式/安排<br>
    <span style="color:#89756e">팀장이 참석하도록 했다.</span><br>
    ・-시키다 → 命令/使唤<br>
    <span style="color:#89756e">상사가 부하에게 야근을 시켰다.</span>
  </div>
</div>`,
    compareLabel: '使动语气光谱',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">使动语气分层</div>
  <div style="font-size:14px;color:#89756e">4 种方式 · 4 种语气</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">4 种使动</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      短形使动（-이/히/리/기/우/추/구） → 亲密/照顾<br>
      -게 하다 → 中性/允许<br>
      -도록 하다 → 正式/安排<br>
      -시키다 → 命令/使唤（하다类）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">选用建议</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      亲手照顾 → 短形使动（재우다）<br>
      日常"让" → -게 하다<br>
      规章/公务/自我规劝 → -도록 하다<br>
      对下级下达任务 → -시키다（对长辈避用）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선생님, 무엇을 시키셨어요?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선생님, 무엇을 부탁하셨어요?</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아기를 자도록 했어요（亲手照顾生硬）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아기를 재웠어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P14 综合练习 ──────────────────────────────────────
  {
    id: 'card-p14-l09',
    partNumber: 14,
    lessonNumber: 9,
    title: 'P14 综合练习',
    isPractice: true,
    whatItDoes: '使动语态综合',
    whatItDoesBody: '本课综合 P14 全部 8 个使动语法点：短形使动（-이/히/리/기/우/추）、-게 하다、-도록 하다、-시키다、被动 vs 使动辨析、助词 을/를·에게、语气分层。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P14 综合练习',
      body: '综合本章所有使动语法',
      questions: [
        {
          prompt: '엄마가 아기에게 우유를 (먹다) 였어요.',
          options: ['먹였어요', '먹혔어요', '먹어졌어요', '먹었어요'],
          answer: 0,
          explanation: '먹다 的使动是 먹이다（喂）→ 먹였어요。먹혔다 才是被动"被吃"。',
        },
        {
          prompt: '엄마가 아기를 (자다) 웠어요.',
          options: ['자웠어요', '재웠어요', '자혔어요', '자였어요'],
          answer: 1,
          explanation: '자다 的使动是 재우다（词内元音变化）→ 재웠어요。',
        },
        {
          prompt: '이 영화가 저를 (슬프다) 했어요.',
          options: ['슬프는 게', '슬픈', '슬프게', '슬퍼서'],
          answer: 2,
          explanation: '形容词接 -게 하다 → 슬프게 했어요（让我伤心）。',
        },
        {
          prompt: '팀장님이 저희를 회의에 (참석하다) 했어요.',
          options: ['참석하는 게', '참석하도록', '참석해서', '참석하기가'],
          answer: 1,
          explanation: '正式安排场合 → -도록 하다 → 참석하도록 했어요。',
        },
        {
          prompt: '엄마가 아이(   ) 공부(   ) 시켰어요.',
          options: ['가 / 가', '를 / 를', '에게 / 를', '가 / 을'],
          answer: 2,
          explanation: '-시키다 句式：S가 O에게 N을 시키다 → 아이에게 공부를 시켰어요。',
        },
        {
          prompt: '"엄마가 아이에게 밥을 먹였어요." 是……',
          options: ['被动', '使动', '主动', '过去完成'],
          answer: 1,
          explanation: '主语엄마（施动者）+ 目的宾语 밥을 + 먹이다（使动）→ 使动句。',
        },
        {
          prompt: '엄마가 아기(   ) 재웠어요.',
          options: ['에게', '를', '이', '가'],
          answer: 1,
          explanation: '자다 不及物 → 被使动者用 을/를 → 아기를。',
        },
        {
          prompt: '엄마가 아기(   ) 우유(   ) 먹였어요.',
          options: ['를 / 를', '에게 / 를', '에게 / 가', '가 / 를'],
          answer: 1,
          explanation: '먹다 及物 → 被使动者用 에게，宾语用 을/를。',
        },
        {
          prompt: '"上司让下属加班" 最贴切的表达？',
          options: ['부하가 야근했어요', '부하에게 야근을 시켰어요', '부하를 야근했어요', '부하가 야근을 당했어요'],
          answer: 1,
          explanation: '"命令使唤" 语气 → -시키다 → 부하에게 야근을 시켰어요。',
        },
        {
          prompt: '被动 vs 使动 最快的判断方法？',
          options: [
            '看动词长',
            '看接尾字母',
            '看句子里有没有目的宾语 을/를',
            '看时态',
          ],
          answer: 2,
          explanation: '同接尾时，有目的宾语 을/를 → 使动；没有 → 被动。',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p14-l01',
      'card-p14-l02',
      'card-p14-l03',
      'card-p14-l04',
      'card-p14-l05',
      'card-p14-l06',
      'card-p14-l07',
      'card-p14-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P14 使动语态总结</div>
  <div style="font-size:14px;color:#89756e">4 种使动 · 一套助词 · 一个分辨</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">4 种使动方式</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 短形使动（-이/히/리/기/우/추）→ 亲密/照顾<br>
      2. -게 하다 → 中性/允许<br>
      3. -도록 하다 → 正式/安排<br>
      4. -시키다 → 命令使唤（하다类）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">助词规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      不及物 → 被使动者用 을/를<br>
      及物 → 被使动者用 에게，宾语用 을/를<br>
      避免一句两个 을/를<br>
      -시키다 → S가 O에게 N을 시키다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">被动 vs 使动</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      同接尾 -이/히/리/기<br>
      有目的宾语 을/를 → 使动<br>
      无目的宾语 → 被动<br>
      먹이다（喂/使动）≠ 먹히다（被吃/被动）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 短形使动只对固定动词组，不能自造<br>
      2. 하다类使动只能用 -시키다 或 -게 하다<br>
      3. -도록 하다 不接形容词<br>
      4. -시키다 对长辈失礼，用 부탁하다<br>
      5. 一句最多一个 을/를 目的宾语
    </div>
  </div>
</div>`,
  },
];
