import type { GrammarCard } from '@/types';

export const grammarCardsP20: GrammarCard[] = [
  {
    id: 'card-p20-l01',
    partNumber: 20,
    lessonNumber: 1,
    title: '에 대해(서)，에 관해서，에 관한',
    whatItDoes: '表示"关于……/有关……"的话题指示',
    whatItDoesBody: '에 대해(서) 和 에 관해(서) 均表示"关于……"，用于指示谈论、研究、思考的对象，意思非常接近，可以互换。\n에 관한/에 대한 是冠词形（定语形），用于修饰后面的名词，相当于"关于……的（名词）"。\n에 대해서 较口语，에 관해서 较书面/正式。',
    structureNote: '名词 + 에 대해（서）：动词前，"关于……"\n名词 + 에 관해（서）：动词前，"关于……"（较正式）\n名词 + 에 관한/에 대한 + 名词：定语，"关于……的（名词）"',
    rulesNote: '에 대해 와 에 관해 는 含义가 几乎 같지만，에 관해 는 학술/보고서 등 格式体에서 더 자연스럽다。\n에 관한/에 대한 은 뒤에 名词가 必须 온다（冠词形이므로）。动词 앞에는 에 대해/에 관해 使用。',
    scenarioNote: '"환경에 대해 이야기하다"，"역사에 관한 책"般，广泛用于发表、论文、新闻、对话。',
    structures: [
      {
        ko: '명사 + 에 대해（서）+ 动词',
        tokens: [
          { text: '이 문제', role: 'plain' },
          { text: '에 대해서', role: 'plain' },
          { text: ' 어떻게 생각해요？', role: 'verb' },
        ],
        zh: '关于这个问题，你怎么看？',
      },
      {
        ko: '명사 + 에 관해（서）+ 动词',
        tokens: [
          { text: '환경', role: 'plain' },
          { text: '에 관해서', role: 'plain' },
          { text: ' 发表했어요', role: 'verb' },
        ],
        zh: '就环境问题做了发表。',
      },
      {
        ko: '명사 + 에 관한/에 대한 + 名词',
        tokens: [
          { text: '한국 역사', role: 'plain' },
          { text: '에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 읽었어요', role: 'verb' },
        ],
        zh: '读了关于韩国历史的书。',
      },
      {
        ko: '에 대한 + 名词（口语）',
        tokens: [
          { text: '그 사건', role: 'plain' },
          { text: '에 대한', role: 'plain' },
          { text: ' 新闻를', role: 'object' },
          { text: ' 봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 에 대해（서）+ 动词：口语/书面语 모두 使用', examples: '이것에 대해 말씀드릴게요，음식에 대해서 이야기해요' },
      { type: 'rule', text: '名词 + 에 관해（서）+ 动词：격식/학술 문체에 더 자연스러움', examples: '환경에 관해 연구했어요，역사에 관해서 发表했어요' },
      { type: 'rule', text: '名词 + 에 대한/에 관한 + 名词：冠词形，뒤에 名词 必需', examples: '환경에 관한 책，그 문제에 대한 해결책' },
      { type: 'compare', text: '에 대해 vs 에 관해：含义 동일，에 관해가 더 格式体', examples: '내 꿈에 대해 말했어요（口语）vs 기후에 관해 연구했어요（격식）' },
      { type: 'note', text: '에 대해/에 관해 뒤에 바로 名词 불가，에 대한/에 관한 使用', examples: '환경에 대해 책（✗）→ 환경에 대한 책（✓）' },
      { type: 'note', text: '서 생략 可能：에 대해서 = 에 대해，에 관해서 = 에 관해', examples: '이것에 대해 얘기해요 = 이것에 대해서 얘기해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '건강에 대해서', role: 'plain' },
          { text: ' 이야기해 봐요', role: 'verb' },
        ],
        zh: '来聊聊关于健康的话题吧。',
        swapWords: ['음식에 대해서', '여행에 대해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '기후 변화에 관해서', role: 'plain' },
          { text: ' 보고서를', role: 'object' },
          { text: ' 썼어요', role: 'verb' },
        ],
        zh: '写了关于气候变化的报告。',
        swapWords: ['환경에 관해서', '역사에 관해서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한국 문화에 관한', role: 'plain' },
          { text: ' 책을', role: 'object' },
          { text: ' 추천해 줘요', role: 'verb' },
        ],
        zh: '推荐一本关于韩国文化的书给我吧。',
        swapWords: ['역사에 관한', '음식에 대한'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사건에 대한', role: 'plain' },
          { text: '뉴스를', role: 'object' },
          { text: '봤어요', role: 'verb' },
        ],
        zh: '看了关于那件事的新闻。',
        swapWords: ['그 문제에 대한', '그 영화에 대한'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📝', context: '写报告', ko: '환경에 관해서 보고서를 써야 해요.', zh: '得写一篇关于环境的报告。' },
      { icon: '💬', context: '日常对话', ko: '요즘 건강에 대해 관심이 많아요.', zh: '最近对健康很感兴趣。' },
      { icon: '📚', context: '推荐书籍', ko: '역사에 관한 책을 많이 읽었어요.', zh: '读了很多关于历史的书。' },
      { icon: '🎤', context: '发表', ko: '이 주제에 대해서 발표하겠습니다.', zh: '我将就这个主题进行发表。' },
      { icon: '🤔', context: '征求意见', ko: '이 문제에 대해 어떻게 생각해요？', zh: '关于这个问题你怎么看？' },
      { icon: '📰', context: '新闻报道', ko: '그 사건에 대한 기사를 읽었어요.', zh: '读了关于那件事的报道。' },
    ],
    mistakes: [
      { wrong: '환경에 대해 책을 읽었어요（에 대해 + 直接 名词）', correct: '환경에 대한 책을 읽었어요', note: '修饰名词时用 에 대한/에 관한（冠词形）。에 대해/에 관해 后接动词：에 대해 이야기하다（✓）。' },
      { wrong: '에 관해한 책（에 관해 + 한）', correct: '에 관한 책', note: '冠词形是 에 관한。에 관해한是不存在的形式。에 관해后接动词，에 관한后接名词。' },
      { wrong: '이것에 대하여 이야기해요（격식 대하여 口语에 使用）', correct: '이것에 대해서 이야기해요', note: '에 대하여 는 书面语/格式体 形式。口语에서는 에 대해서 또는 에 대해 가 더 자연스럽다。' },
      { wrong: '에 관해와 에 대해를 完全 다른 表达으로 혼동', correct: '에 관해서 ≈ 에 대해서（含义 동일，격식도 차이）', note: '에 관해서 와 에 대해서 는 含义가 같다。에 관해서 가 학술/格式体에 더 어울리고，에 대해서 는 口语에서도 자연스럽다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '에 대해(서)，에 관해서，에 관한',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '한국 역사___ 책을 읽었어요。（读了关于韩国历史的书。）',
          options: ['에 관한', '에 대해서', '에 대해', '에 관해'],
          answer: 0 as 0|1|2|3,
          explanation: '名词（책）를 수식하므로 冠词形 에 관한（✓）。에 관해/에 대해/에 대해서 는 动词 앞에 쓰며 名词 直接 수식 불가。',
        },
        {
          prompt: '기후 변화___ 发表했어요。（就气候变化做了发表。）',
          options: ['에 대하여서', '에 관한', '에 관해서', '에 대한'],
          answer: 2 as 0|1|2|3,
          explanation: '动词（发表하다）앞에는 에 관해서（✓）。에 관한/에 대한 은 冠词形으로 名词 앞에만，에 대하여서 는 不存在的形式。',
        },
        {
          prompt: '이 문제___ 어떻게 생각해요？（关于这个问题，你怎么看？）',
          options: ['에 관하여서', '에 대해서', '에 대한', '에 관한'],
          answer: 1 as 0|1|2|3,
          explanation: '动词（생각하다）앞 → 에 대해서（✓）。에 대한/에 관한 은 冠词形，에 관하여서 는 不存在的形式。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['음식에 에 대해 이야기해요', '환경에 대해 책을 읽었어요', '역사에 관해한 보고서', '그 사건에 대한 新闻를 봤어요'],
          answer: 3 as 0|1|2|3,
          explanation: '에 대한 + 名词（新闻）：올바른 冠词形（✓）。에 대해 + 名词 直接 수식 불가，에 관해한은 不存在的形式，에 에 대해 는 助词 중복。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第15课</div>
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
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">격식도 차이</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div><span style="font-weight:700">에 대해（서）</span>：口语/书面语 모두 OK</div>
        <div><span style="font-weight:700">에 관해（서）</span>：학술/格式体에 더 자연스러움</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">환경에 대해 책（+名词 直接）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">환경에 대한 책</span></div></div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 뒤에 动词 → 에 대해，뒤에 名词 → 에 대한</div>
</div>
<div class="reminder-box">에 관해서 = 에 대해서（意思相同，관해서 更书面）。</div>`,
    compareHtml: `<div class="card-title">에 대해 vs 에 관해 vs 에 대한 vs 에 관한</div>
<div class="card-body">四种形式的准确用法。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词 앞，口语/书面语</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">건강에 대해 이야기해요</span><span style="font-size:16px;color:#5a4640">聊关于健康的话题</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관해（서）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词 앞，격식/학술체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">환경에 관해 연구해요</span><span style="font-size:16px;color:#5a4640">研究关于环境的问题</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">에 대한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 앞，口语/书面语</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">그 사건에 대한 新闻</span><span style="font-size:16px;color:#5a4640">关于那件事的新闻</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">에 관한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 앞，격식/학술체</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">역사에 관한 책</span><span style="font-size:16px;color:#5a4640">关于历史的书</span></div>
  </div>
</div>`,
    compareLabel: '에 대해 vs 에 관해 vs 에 대한 vs 에 관한',
    quickTable: {
      title: '에 대해/에 관해 使用 정리',
      headers: ['形式', '뒤에 오는 것', '격식도', '例句'],
      rows: [
        ['에 대해（서）', '动词', '口语/书面语', '건강에 대해 이야기해요'],
        ['에 관해（서）', '动词', '격식/학술', '환경에 관해 연구해요'],
        ['에 대한', '名词', '口语/书面语', '그 문제에 대한 해결책'],
        ['에 관한', '名词', '격식/학술', '역사에 관한 책'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l02',
    partNumber: 20,
    lessonNumber: 2,
    title: '을/를 비롯한，비롯해서，만 해도',
    whatItDoes: '举例列举，或以某事为基准说"光是……就……"',
    whatItDoesBody: '을/를 비롯한 和 을/를 비롯해서 均表示"以……为首/包括……在内"，用于列举，说明某事物是其中代表性的例子。\n비롯한 是冠词形（定语），修饰后面的名词；비롯해서 是连用形，后接动词。\n(까지)만 해도 表示"光是……就……/即便只说……也……"，以某一具体事例强调整体程度，常带有"更不用说其他"的含义。',
    structureNote: '名词 + 을/를 비롯한 + 名词（以……为首的……）\n名词 + 을/를 비롯해서 + 动词（包括……在内，……）\n名词 + 만 해도 / 名词 + 까지만 해도（光是……就……）',
    rulesNote: '비롯한/비롯해서 앞 名词는 전체 중 典型的 例句가 온다。\n만 해도 는 极端事例 하나를 들어 전체를 强调한다。까지 는 "극단"을 더 强调하는 보助词。',
    scenarioNote: '"BTS를 비롯한 K-POP 그룹들"般，常用于先提出代表性例子的说明/发表。\n"이것만 해도 너무 많아요"般，用于日常对话中的夸张/强调。',
    structures: [
      {
        ko: '을/를 비롯한 + 名词',
        tokens: [
          { text: 'BTS', role: 'plain' },
          { text: '를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们很受欢迎。',
      },
      {
        ko: '을/를 비롯해서 + 动词',
        tokens: [
          { text: '서울', role: 'plain' },
          { text: '을 비롯해서', role: 'plain' },
          { text: ' 전국에서', role: 'place' },
          { text: ' 참가했어요', role: 'verb' },
        ],
        zh: '包括首尔在内，全国各地都参加了。',
      },
      {
        ko: '명사 + 만 해도',
        tokens: [
          { text: '이것', role: 'plain' },
          { text: '만 해도', role: 'plain' },
          { text: ' 너무 많아요', role: 'verb' },
        ],
        zh: '光是这个就已经太多了。',
      },
      {
        ko: '명사 + 까지만 해도',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '까지만 해도', role: 'plain' },
          { text: ' 괜찮았어요', role: 'verb' },
        ],
        zh: '就连昨天还好好的（更不用说之前）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '收音O 名词 + 을 비롯한/비롯해서，收音X 名词 + 를 비롯한/비롯해서', examples: '음악을 비롯한（收音ㄱ），BTS를 비롯해서（收音X）' },
      { type: 'rule', text: '비롯한 + 名词（冠词形），비롯해서 + 动词（连接형）', examples: 'BTS를 비롯한 그룹들（名词 수식）vs 서울을 비롯해서 전국이（动词 앞）' },
      { type: 'note', text: '비롯한/비롯해서 앞 명사는 뒤에 나열될 전체의 代表 事例', examples: 'BTS를 비롯한 K-POP 그룹들（BTS가 代表 事例）' },
      { type: 'rule', text: '名词 + 만 해도：극단 事例로 전체 强调', examples: '이것만 해도，서울만 해도，하루만 해도' },
      { type: 'rule', text: '名词 + 까지만 해도：까지 첨가로 극단성 强调', examples: '어제까지만 해도，그것까지만 해도' },
      { type: 'compare', text: '만 해도 vs 까지만 해도：含义 유사，까지만 해도가 더 极端', examples: '이것만 해도 많아요 vs 이것까지만 해도 已经 너무 많아요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: 'BTS를 비롯한', role: 'plain' },
          { text: ' K-POP 그룹들이', role: 'subject' },
          { text: ' 세계적으로', role: 'plain' },
          { text: ' 인기예요', role: 'verb' },
        ],
        zh: '以BTS为首的K-POP团体们在全球很受欢迎。',
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
        zh: '包括首尔在内，全国各地聚集了很多人。',
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
        zh: '光是交通费一个月就超过10万韩元。',
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
        zh: '就连昨天还好好的，突然就不舒服了。',
        swapWords: ['아까까지만 해도', '지난주까지만 해도'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'K-POP介绍', ko: 'BTS를 비롯한 K-POP 가수들이 유명해요.', zh: '以BTS为首的K-POP歌手们都很有名。' },
      { icon: '🌏', context: '国际会议', ko: '한국을 비롯해서 20개국이 참가했어요.', zh: '包括韩国在内，共20个国家参加了。' },
      { icon: '💸', context: '生活费贵', ko: '집세만 해도 너무 비싸요.', zh: '光是房租就太贵了。' },
      { icon: '😮', context: '突然变化', ko: '아까까지만 해도 괜찮았는데요.', zh: '刚才还好好的呢。' },
      { icon: '📊', context: '数据列举', ko: '서울을 비롯한 대도시의 집값이 올랐어요.', zh: '以首尔为首的大城市房价上涨了。' },
      { icon: '😫', context: '任务繁重', ko: '이것까지만 해도 이미 너무 많아요.', zh: '光是这些就已经太多了。' },
    ],
    mistakes: [
      { wrong: 'BTS를 비롯해서 그룹들이（비롯해서 + 名词 수식）', correct: 'BTS를 비롯한 그룹들이', note: '修饰名词时用冠词形 비롯한。비롯해서 是连接形用在动词前：비롯해서 모였어요（✓）。' },
      { wrong: 'BTS를 비롯하는 그룹（비롯하는）', correct: 'BTS를 비롯한 그룹', note: '비롯한 은 비롯하다의 冠词形이다。비롯하는 은 现在형 冠词形으로 이 表达에 쓰이지 않는다。冠词形은 비롯한 이다。' },
      { wrong: '교통비도 해도 비싸요（만 해도 대신 도 해도）', correct: '교통비만 해도 비싸요', note: '만 해도 是助词 만 + 해도 的结合。도 해도 不存在的表达。要表达"光是"的语气时 만 해도 使用。' },
      { wrong: '음악를 비롯한（收音O 명사에 를）', correct: '음악을 비롯한', note: '음악（收音ㄱ 있음）→ 을 비롯한（✓）。收音 있는 名词 뒤에는 을，收音 없는 名词 뒤에는 使用。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '을/를 비롯한，비롯해서，만 해도',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）',
          options: ['를', '가', '을', '이'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（收音X）→ 를 비롯한（✓）。收音 있는 名词면 을 비롯한。이/가는 주격 助词로 비롯한 앞에 쓰지 않는다。',
        },
        {
          prompt: '서울을 비롯해서 전국___ 참가했어요。（包括首尔在内，全国各地参加了。）',
          options: ['에', '이', '에서', '을'],
          answer: 2 as 0|1|2|3,
          explanation: '전국에서：地点+에서（행동 발생 地点）：전국에서 참가했어요（✓）。에는 目的지，이는 주격，을은 目的격으로 이 문맥에 맞지 않는다。',
        },
        {
          prompt: '집세___ 해도 너무 비싸요。（光是房租就太贵了。）',
          options: ['까지', '만', '는', '도'],
          answer: 1 as 0|1|2|3,
          explanation: '만 해도："광（光是）"强调：집세만 해도（✓）。도 해도는 不存在的表达，까지만 해도도 可能하나 만 해도가 基本形，는 해도는 다른 含义。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['음악를 비롯한 예술（收音O）', '이것도 해도 많아요', 'BTS를 비롯해서 그룹들이 유명해요（수식）', '한국을 비롯한 아시아 국가들이 참가했어요'],
          answer: 3 as 0|1|2|3,
          explanation: '한국을 비롯한 + 名词（✓）：冠词形으로 名词 수식。비롯해서는 动词 앞，음악는→을 비롯한，이것도 해도→이것만 해도。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第16课</div>
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
<div class="card-body">形式가 비슷한 쌍 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯한</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">冠词形，뒤에 名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">BTS를 비롯한 그룹들</span><span style="font-size:16px;color:#5a4640">以BTS为首的团体们</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">을/를 비롯해서</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">连接형，뒤에 动词절</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">서울을 비롯해서 전국이 참가했어요</span><span style="font-size:16px;color:#5a4640">包括首尔在内全国参加了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 事例 强调（光是）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">집세만 해도 비싸요</span><span style="font-size:16px;color:#5a4640">光是房租就贵</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">까지만 해도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">더 강한 극단 强调</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어제까지만 해도 괜찮았어요</span><span style="font-size:16px;color:#5a4640">就连昨天还好好的</span></div>
  </div>
</div>`,
    compareLabel: '비롯한 vs 비롯해서 / 만 해도 vs 까지만 해도',
    quickTable: {
      title: '비롯한/비롯해서/만 해도 정리',
      headers: ['形式', '뒤에 오는 것', '기능', '例句'],
      rows: [
        ['을/를 비롯한', '名词', '冠词形', 'BTS를 비롯한 그룹들'],
        ['을/를 비롯해서', '动词', '连接형', '서울을 비롯해서 참가했어요'],
        ['만 해도', '动词（술어）', '극단 强调', '집세만 해도 비싸요'],
        ['까지만 해도', '动词（술어）', '더 강한 극단', '어제까지만 해도 괜찮았어요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l03',
    partNumber: 20,
    lessonNumber: 3,
    title: '개나，까지（强调 보助词）',
    whatItDoes: '表示数量之多令人意外，或"连……都/甚至……"',
    whatItDoesBody: '개나（도）用在数量词后，表示说话人觉得该数量多得出乎意料，相当于"竟然……个/多达……"，带有轻微惊讶或夸张语气。\n까지 作为强调助词，表示"连……都/甚至……"，强调到了意想不到的极端，可以是正面惊喜也可以是负面意外。',
    structureNote: '수량 + 개나（도）：数量 + 개/명/권 + 나（도）（竟然……个）\n名词/부사 + 까지：名词/副词 + 까지（连……都/甚至……）',
    rulesNote: '개나 의 나 表示"比预期多"的辅助语气다。개나也可像 도 那样添加 도 来加强强调。\n까지 表示"达到极端"。用于意料之外的事态、极端事例。前面名词无论有无收音，까지 形式不变。',
    scenarioNote: '"이게 벌써 세 개나 됐어？（竟然已经三个了？）"，"친구까지 나를 의심해（连朋友都怀疑我）"般，常用于表达惊讶。',
    structures: [
      {
        ko: '수량 + 개나（의외의 많음）',
        tokens: [
          { text: '사과를', role: 'object' },
          { text: ' 다섯', role: 'plain' },
          { text: ' 개나', role: 'plain' },
          { text: ' 먹었어요', role: 'verb' },
        ],
        zh: '苹果竟然吃了五个。',
      },
      {
        ko: '수량 + 이나도（强调）',
        tokens: [
          { text: '실수를', role: 'object' },
          { text: ' 열 번', role: 'plain' },
          { text: '이나도', role: 'plain' },
          { text: ' 했어요', role: 'verb' },
        ],
        zh: '竟然犯了十次错误。',
      },
      {
        ko: '명사 + 까지（극단 到达）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '까지', role: 'plain' },
          { text: ' 나를', role: 'object' },
          { text: ' 의심해요', role: 'verb' },
        ],
        zh: '连朋友都怀疑我。',
      },
      {
        ko: '부사 + 까지（정도 强调）',
        tokens: [
          { text: '이렇게', role: 'plain' },
          { text: '까지', role: 'plain' },
          { text: ' 할 需要는', role: 'verb' },
          { text: ' 없어요', role: 'verb' },
        ],
        zh: '没必要做到这种程度。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '수량사 + 나：比预期多을 나타냄', examples: '다섯 개나，열 명이나，세 권이나，두 시간이나' },
      { type: 'note', text: '나（이나）선택：앞 수량사 末자 收音 있으면 이나，없으면 나', examples: '다섯 개나（收音X），열 명이나（收音O），세 번이나（收音O）' },
      { type: 'note', text: '나도：나 + 도를 더해 더 강한 惊讶 表达', examples: '열 개나도 먹었어요，세 번이나도 실수했어요' },
      { type: 'rule', text: '名词 + 까지：极端事例 强调（甚至……）', examples: '친구까지，선생님까지，그것까지，이렇게까지' },
      { type: 'compare', text: '까지 vs 도：까지는 극단 到达，도는 포함/첨가', examples: '친구까지 왔어요（连朋友都来了）vs 친구도 왔어요（朋友也来了）' },
      { type: 'note', text: '까지 앞 명사는 收音 유무와 관계없이 까지 形式变化 없음', examples: '친구까지，학교까지，선생님까지 모두 동일' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: ' 커피를', role: 'object' },
          { text: ' 세 잔이나', role: 'plain' },
          { text: ' 마셨어요', role: 'verb' },
        ],
        zh: '今天竟然喝了三杯咖啡。',
        swapWords: ['다섯 잔이나', '두 잔이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '숙제를', role: 'object' },
          { text: ' 두 번이나', role: 'plain' },
          { text: ' 잊어버렸어요', role: 'verb' },
        ],
        zh: '作业竟然忘了两次。',
        swapWords: ['세 번이나', '네 번이나'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구까지', role: 'subject' },
          { text: ' 나를', role: 'object' },
          { text: ' 믿지 않아요', role: 'verb' },
        ],
        zh: '连朋友都不相信我。',
        swapWords: ['가족까지', '선생님까지'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '이렇게까지', role: 'plain' },
          { text: ' 해 줄', role: 'verb' },
          { text: '필요는 없었는데요', role: 'plain' },
        ],
        zh: '没必要做到这种程度的。',
        swapWords: ['여기까지', '이것까지'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😮', context: '吃太多', ko: '피자를 네 조각이나 먹었어요.', zh: '竟然吃了四片披萨。' },
      { icon: '😢', context: '连朋友都', ko: '친구까지 연락을 안 해요.', zh: '连朋友都不联系了。' },
      { icon: '😅', context: '犯了很多错', ko: '오늘 실수를 다섯 번이나 했어요.', zh: '今天竟然犯了五次错。' },
      { icon: '🥺', context: '感动', ko: '선생님까지 와 주셨어요.', zh: '连老师都来了。' },
      { icon: '😤', context: '等了好久', ko: '두 시간이나 기다렸어요.', zh: '竟然等了两个小时。' },
      { icon: '😨', context: '过分了', ko: '이렇게까지 할 줄은 몰랐어요.', zh: '没想到会做到这种程度。' },
    ],
    mistakes: [
      { wrong: '다섯 개나이（이나 앞 收音X에 이 추가）', correct: '다섯 개나', note: '개는 收音이 없으므로 나 使用：다섯 개나（✓）。이나는 收音 있는 수량사 뒤에 쓴다：세 번이나（번 收音O）。' },
      { wrong: '친구도까지 왔어요（도 + 까지 중복）', correct: '친구까지 왔어요 또는 친구도 왔어요', note: '까지 와 도 는 같은 위치의 보助词로 同时 쓸 수 없다。까지 는 극단，도 는 포함。문맥에 맞게 하나만 선택한다。' },
      { wrong: '열 명나（收音O 명사에 나）', correct: '열 명이나', note: '명（收音ㅇ 있음）→ 이나：열 명이나（✓）。收音 없는 수량사에만 나 使用。' },
      { wrong: '까지도 친구가 안 왔어요（까지도 어순 오류）', correct: '친구까지도 안 왔어요', note: '까지（도）는 强调하는 名词 바로 뒤에 붙는다：친구까지도（✓）。까지도를 句子 앞에 독립적으로 쓰는 것은 어색하다。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '개나，까지',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '커피를 세 잔___ 마셨어요。（竟然喝了三杯咖啡。）',
          options: ['이나', '도', '나', '까지'],
          answer: 0 as 0|1|2|3,
          explanation: '잔（收音ㄴ 있음）→ 이나：세 잔이나（✓）。收音 없는 수량사면 나，까지는 极端强调，도는 포함。',
        },
        {
          prompt: '사과를 다섯 개___ 먹었어요。（竟然吃了五个苹果。）',
          options: ['도', '이나', '까지', '나'],
          answer: 3 as 0|1|2|3,
          explanation: '개（收音X）→ 나：다섯 개나（✓）。收音 있는 수량사면 이나，까지/도는 다른 용법。',
        },
        {
          prompt: '가족___ 나를 이해 못 해요。（连家人都不理解我。）',
          options: ['나', '이나', '까지', '도'],
          answer: 2 as 0|1|2|3,
          explanation: '극단 事例 强调（连……都）→ 까지：가족까지（✓）。나/이나는 수량사 뒤，도는 포함（家人也）으로 극단 强调 语感가 약하다。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['세 개나이 먹었어요', '두 시간이나 기다렸어요', '친구도까지 왔어요', '열 명나 모였어요'],
          answer: 1 as 0|1|2|3,
          explanation: '时间（收音ㄴ）→ 이나：두 시간이나（✓）。세 개나이→세 개나，친구도까지→친구까지（助词 중복），열 명나→열 명이나（收音O）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第17课</div>
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
        <div>收音X → <b style="color:#ff7fa8">나</b>：다섯 개나，세 시간이나 아님→세 시간이나（时间 收音X…）</div>
        <div>收音O → <b style="color:#ff7fa8">이나</b>：세 잔이나，두 번이나，열 명이나</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">열 명나（收音O에 나）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">열 명이나</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">친구도까지（보助词 중복）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">친구까지</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">竟然这么多 / 连……都</div>
<div class="card-body">数量超出预期用 나/이나，极端举例用 까지。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">두 보助词의 차이</div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 收音O → 이나，收音X → 나（까지는 변화 없음）</div>
</div>
<div class="reminder-box">까지 와 도 는 同时 쓰지 않는다（도까지 X）。</div>`,
    compareHtml: `<div class="card-title">나/이나 vs 도 vs 까지</div>
<div class="card-body">세 보助词 含义 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">나/이나</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">수량 预期 초과（惊讶）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">세 잔이나 마셨어요</span><span style="font-size:16px;color:#5a4640">竟然喝了三杯</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">도</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">포함/첨가（也）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구도 왔어요</span><span style="font-size:16px;color:#5a4640">朋友也来了</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 到达（连……都/甚至）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了</span></div>
  </div>
</div>`,
    compareLabel: '나/이나 vs 도 vs 까지',
    quickTable: {
      title: '나/이나 收音 선택 / 까지 정리',
      headers: ['助词', '앞 名词 条件', '기능', '例句'],
      rows: [
        ['나', '收音X 수량사', '수량 초과 惊讶', '다섯 개나，두 时间나→두 시간이나（간：收音ㄴ→이나）'],
        ['이나', '收音O 수량사', '수량 초과 惊讶', '세 잔이나，두 번이나，열 명이나'],
        ['까지', '收音 무관', '극단 事例 强调', '친구까지，가족까지，이렇게까지'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  {
    id: 'card-p20-l04',
    partNumber: 20,
    lessonNumber: 4,
    title: '(이)라든가，(이)라든지，마저',
    whatItDoes: '举例列举，或表示"连最后的……都"',
    whatItDoesBody: '(이)라든가 和 (이)라든지 均用于列举若干例子，表示"……啊/……之类的"，说明不限于某一个，是其中的若干例子之一。两者意思相同，라든지 略比 라든가 更书面。\n마저 表示"连最后一个也/连剩下的也"，强调到了最后的、本不应该如此的也发生了，带有绝望或遗憾的语气，相当于"连……都……（最后的希望/剩下的也）"。',
    structureNote: '收音O 名词 + 이라든가/이라든지\n收音X 名词 + 라든가/라든지\n名词 + 마저（连最后一个也……）',
    rulesNote: '(이)라든가/(이)라든지 뒤에는 보통 动词나 추가 列举가 이어진다。두 개 以上의 항목을 나열할 때 각 항목 뒤에 붙인다。\n마저 는 已经 나쁜 情境에서 마지막 남은 것마저 그렇게 됐다는 绝望감을 表达한다。까지 보다 否定적 语感가 강하다。',
    scenarioNote: '"영화라든가 음악이라든가（电影啊音乐之类的）"般，列举兴趣时，\n"희망마저 消失了（连希望都消失了）"般，用于表达绝望情境。',
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
        zh: '喜欢电影啊音乐之类的。',
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
        zh: '读书啊杂志之类的。',
      },
      {
        ko: '명사 + 마저（绝望/안타까움）',
        tokens: [
          { text: '친구', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 떠났어요', role: 'verb' },
        ],
        zh: '连朋友也离开了（连最后的朋友都走了）。',
      },
      {
        ko: '마저 强调（남은 것마저）',
        tokens: [
          { text: '돈', role: 'subject' },
          { text: '마저', role: 'plain' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '连钱也没了（连最后的钱都没了）。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '收音X 名词 + 라든가/라든지，收音O 名词 + 이라든가/이라든지', examples: '영화라든가（收音X），음악이라든가（收音ㄱ），책이라든지（收音ㄱ）' },
      { type: 'note', text: '(이)라든가/(이)라든지 는 보통 두 개 以上 항목 列举', examples: 'A라든가 B라든가，A이라든지 B라든지 形式 나열' },
      { type: 'compare', text: '라든가 vs 라든지：含义 동일，라든지가 약간 格式体', examples: '영화라든가（口语）vs 영화라든지（书面语/격식）' },
      { type: 'rule', text: '名词 + 마저：마지막 남은 것마저 그렇게 됨（绝望/안타까움）', examples: '친구마저，희망마저，돈마저，건강마저' },
      { type: 'compare', text: '마저 vs 까지：마저는 마지막 것으로 绝望 强调，까지는 극단 列举', examples: '친구까지 왔어요（中性）vs 친구마저 떠났어요（绝望）' },
      { type: 'note', text: '마저 앞에는 "마지막 남은 것"이라는 맥락이 전제', examples: '모두 포기했고，희망마저 없어졌어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '취미로', role: 'plain' },
          { text: '영화라든가', role: 'plain' },
          { text: '독서라든가', role: 'plain' },
          { text: '해요', role: 'verb' },
        ],
        zh: '兴趣爱好是看电影啊读书之类的。',
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
        zh: '周末读书啊杂志之类的。',
        swapWords: ['신문이라든지 잡지라든지', '소설이라든지 만화라든지'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '모두 포기하고', role: 'plain' },
          { text: ' 희망마저', role: 'subject' },
          { text: ' 없어졌어요', role: 'verb' },
        ],
        zh: '全部放弃了，连希望都消失了。',
        swapWords: ['의욕마저', '돈마저'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '건강마저', role: 'subject' },
          { text: ' 나빠져서', role: 'verb' },
          { text: ' 정말 힘들어요', role: 'plain' },
        ],
        zh: '连健康都变差了，真的很难熬。',
        swapWords: ['일마저', '자신감마저'],
        swapRole: 'subject',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '列举兴趣', ko: '취미가 영화라든가 음악이라든가 있어요.', zh: '兴趣有看电影啊听音乐之类的。' },
      { icon: '📚', context: '书面列举', ko: '시라든지 소설이라든지 즐겨 읽어요.', zh: '喜欢读诗啊小说之类的。' },
      { icon: '😞', context: '绝望', ko: '친구마저 연락을 끊었어요.', zh: '连朋友都断联了。' },
      { icon: '💔', context: '失去一切', ko: '일도 잃고 돈마저 없어졌어요.', zh: '工作也丢了，连钱也没了。' },
      { icon: '🤔', context: '举例建议', ko: '여행이라든가 새로운 취미라든가 시도해 봐요.', zh: '试试旅行啊新兴趣之类的吧。' },
      { icon: '😔', context: '最后的希望', ko: '마지막 기회마저 놓쳤어요.', zh: '连最后的机会都错过了。' },
    ],
    mistakes: [
      { wrong: '음악라든가（收音O 명사에 라든가）', correct: '음악이라든가', note: '음악（收音ㄱ 있음）→ 이라든가（✓）。收音 없는 명사에만 라든가 使用：영화라든가（영화 收音X）。' },
      { wrong: '영화이라든가（收音X 명사에 이라든가）', correct: '영화라든가', note: '영화（收音X）→ 라든가（✓）。收音 없는 명사에 이라든가 를 붙이면 틀린다。' },
      { wrong: '친구마저도（마저 + 도 중복）', correct: '친구마저', note: '마저 뒤에 도 를 덧붙이는 것은 어색하다。마저 자체에 已经 强调의 含义가 있으므로 단독으로 쓴다。' },
      { wrong: '마저 를 肯定적 맥락에 使用：선물마저 받았어요', correct: '선물까지 받았어요', note: '마저 는 否定적/绝望적 맥락에만 쓴다。肯定적 맥락의 "连……都"는 까지 를 써야 한다：선물까지 받았어요（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '(이)라든가，(이)라든지，마저',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '兴趣로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）',
          options: ['라든가', '까지', '마저', '이라든가'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（收音X）→ 라든가（✓）。이라든가는 收音O 명사에，마저/까지는 列举가 아니라 强调 助词。',
        },
        {
          prompt: '주말에는 책___ 잡지라든지 읽어요。（周末读书啊杂志之类的。）',
          options: ['마저', '라든지', '까지', '이라든지'],
          answer: 3 as 0|1|2|3,
          explanation: '책（收音ㄱ 있음）→ 이라든지（✓）。라든지는 收音X，마저/까지는 列举 助词가 아니다。',
        },
        {
          prompt: '모두 잃고 희망___ 消失了。（全失去了，连希望都消失了。—绝望）',
          options: ['까지', '이나', '마저', '라든가'],
          answer: 2 as 0|1|2|3,
          explanation: '마저：마지막 남은 것마저 그렇게 됨（绝望）：희망마저（✓）。까지는 중성/肯定 극단，이나는 수량，라든가는 列举。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['선물마저 받았어요（肯定）', '음악이라든가 영화라든가 좋아해요', '친구마저도 왔어요', '음악라든가 좋아해요（收音O）'],
          answer: 1 as 0|1|2|3,
          explanation: '음악이라든가（收音ㄱ→이라든가）영화라든가（收音X→라든가）（✓）。음악라든가→이라든가，마저는 否定 맥락만，마저도는 중복。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第18课</div>
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
<div class="card-body">列举用라든가，绝望用마저。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种 强调 방식</div>
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
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 마저 는 必须 否定적 맥락에서만 쓴다</div>
</div>
<div class="reminder-box">收音O → 이라든가/이라든지，收音X → 라든가/라든지。</div>`,
    compareHtml: `<div class="card-title">마저 vs 까지 / 라든가 vs 라든지</div>
<div class="card-body">비슷한 쌍 비교。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">마저</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">绝望/否定 맥락，마지막 것마저</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구마저 떠났어요</span><span style="font-size:16px;color:#5a4640">连朋友都走了（绝望）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">까지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">극단 强调，긍/否定 모두 可能</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구까지 왔어요</span><span style="font-size:16px;color:#5a4640">连朋友都来了（惊喜）</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">口语적 列举</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">영화라든가 음악이라든가</span><span style="font-size:16px;color:#5a4640">电影啊音乐之类</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0ee;border-radius:12px;padding:12px">
    <div class="tok t-v">(이)라든지</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">약간 格式体 列举</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">책이라든지 잡지라든지</span><span style="font-size:16px;color:#5a4640">书啊杂志之类</span></div>
  </div>
</div>`,
    compareLabel: '마저 vs 까지 / 라든가 vs 라든지',
    quickTable: {
      title: '(이)라든가/(이)라든지/마저 정리',
      headers: ['助词', '收音 条件', '기능', '例句'],
      rows: [
        ['라든가/라든지', '收音X 名词', '列举（口语/격식）', '영화라든가，잡지라든지'],
        ['이라든가/이라든지', '收音O 名词', '列举（口语/격식）', '음악이라든가，책이라든지'],
        ['마저', '收音 무관', '绝望 극단（否定）', '친구마저，희망마저，돈마저'],
      ],
    },
    linkedGrammarIds: ['g12'],
  },

  {
    id: 'card-p20-l05',
    partNumber: 20,
    lessonNumber: 5,
    title: '-는가 하면，-기도 하다',
    whatItDoes: '表示一面……一面……，或"也会/也有"',
    whatItDoesBody: '-는/은/ㄴ가 하면 表示两种对比或并列的情况同时存在，相当于"一方面……另一方面……/有时……有时……"，常用于描述事物的两面性。\n-기도 하다 表示在某行为或状态之外也有其他情况，相当于"也会/也有时/也是"，语气比较平和，常与 때로는、偶尔 等副词搭配。',
    structureNote: '-는/은/ㄴ가 하면：动词/形容词 冠词形 + 가 하면\n-기도 하다：动词/形容词 词干 + 기도 하다',
    rulesNote: '-는가 하면 의 앞后句은 대조되는 내용이 온다。前句이 한 情境，后句이 반대이거나 다른 情境이다。\n-기도 하다 는 단독으로 "～하기도 해요"처럼 쓰이거나，나열 구조에서 "-기도 하고 -기도 하다"般使用。',
    scenarioNote: '"价格便宜 하면 质量不好（一方面价格便宜，另一方面质量不好）"，\n"有些难过 하고 有些高兴 해요（既有些难过，也有些高兴）"般，用于描述复杂情感或情境。',
    structures: [
      {
        ko: '동사 -는가 하면',
        tokens: [
          { text: '웃는가', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 또 울어요', role: 'verb' },
        ],
        zh: '一会儿笑，一会儿又哭。',
      },
      {
        ko: '형용사 -은/ㄴ가 하면',
        tokens: [
          { text: '价格이', role: 'subject' },
          { text: ' 便宜', role: 'verb' },
          { text: ' 하면', role: 'plain' },
          { text: ' 质量이 나빠요', role: 'verb' },
        ],
        zh: '价格便宜，但质量不好。',
      },
      {
        ko: '词干 + 기도 하다（단독）',
        tokens: [
          { text: '偶尔', role: 'plain' },
          { text: ' 有些难过 해요', role: 'verb' },
        ],
        zh: '有时也会感到悲伤。',
      },
      {
        ko: '-기도 하고 -기도 하다（나열）',
        tokens: [
          { text: '재미있기도 하고', role: 'verb' },
          { text: ' 어렵기도 해요', role: 'verb' },
        ],
        zh: '既有趣，也有些难。',
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + 는가 하면，形容词/动词 过去 + 은/ㄴ가 하면', examples: '웃는가 하면，便宜 하면，먹은가 하면' },
      { type: 'note', text: '-는가 하면 앞后句은 대조 내용：A인가 하면 B（A와 B가 상반/병렬）', examples: '빠른가 하면 느리기도 해요，웃는가 하면 울기도 해요' },
      { type: 'rule', text: '动词/形容词 词干 + 기도 하다', examples: '有些难过 해요，먹기도 해요，웃기도 해요' },
      { type: 'note', text: '-기도 하고 -기도 하다：两种 상태나 행동을 나열', examples: '재미있기도 하고 어렵기도 해요，웃기도 하고 울기도 해요' },
      { type: 'compare', text: '-는가 하면 vs -기도 하다：는가 하면은 대조，기도 하다는 병렬/추가', examples: '비便宜 하면 质量이 좋아요（대조）vs 비싸기도 하고 质量이 좋기도 해요（병렬）' },
      { type: 'note', text: '-기도 하다 는 때로는，偶尔 등 빈도 부사와 经常 호응', examples: '때로는 有些难过 해요，偶尔 실수하기도 해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '친절한가 하면', role: 'verb' },
          { text: '가끔', role: 'plain' },
          { text: '차갑기도 해요', role: 'verb' },
        ],
        zh: '那个人一方面很亲切，有时也会冷漠。',
        swapWords: ['착한가 하면', '조용한가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 영화는', role: 'subject' },
          { text: '슬프기도 하고', role: 'verb' },
          { text: '재미있기도 해요', role: 'verb' },
        ],
        zh: '这部电影既有些悲伤，也很有趣。',
        swapWords: ['무섭기도 하고 감동적이기도 해요', '웃기기도 하고 감동적이기도 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: ' 어려운가 하면', role: 'verb' },
          { text: ' 재미있기도 해요', role: 'verb' },
        ],
        zh: '韩语一方面很难，另一方面也很有趣。',
        swapWords: ['复杂的가 하면', '쉬운가 하면'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '가끔', role: 'plain' },
          { text: '지치기도 하지만', role: 'verb' },
          { text: '계속', role: 'plain' },
          { text: '하고 싶어요', role: 'verb' },
        ],
        zh: '有时也会疲惫，但还是想继续。',
        swapWords: ['힘들기도 하지만', '포기하고 싶기도 하지만'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '😄😢', context: '复杂心情', ko: '기쁘기도 하고 슬프기도 해요.', zh: '既高兴又有些难过。' },
      { icon: '🌤️', context: '天气变化', ko: '맑은가 하면 비가 오기도 해요.', zh: '有时晴，有时也会下雨。' },
      { icon: '📚', context: '学习感受', ko: '한국어가 재미있는가 하면 어렵기도 해요.', zh: '韩语一方面有趣，另一方面也难。' },
      { icon: '🤷', context: '两面性', ko: '그 사람은 친절한가 하면 무서운 면도 있어요.', zh: '那个人亲切的一面，也有让人害怕的一面。' },
      { icon: '💪', context: '坚持', ko: '힘들기도 하지만 보람 있어요.', zh: '有时也辛苦，但很有成就感。' },
      { icon: '🍽️', context: '食物两面', ko: '맵기도 하고 맛있기도 해요.', zh: '既辣，也好吃。' },
    ],
    mistakes: [
      { wrong: '웃은가 하면（动词 现在에 은가）', correct: '웃는가 하면', note: '动词 现在 冠词形은 -는：웃는가 하면（✓）。-은가 는 形容词나 动词 过去형에 쓴다。' },
      { wrong: '비싸는가 하면（형용사에 -는가）', correct: '비便宜 하면', note: '形容词 冠词形은 -은/ㄴ：비싸다→비便宜 하면（✓）。형용사에 动词형 -는가 를 쓰면 틀린다。' },
      { wrong: '먹기도하다（띄어쓰기 없음）', correct: '먹기도 하다', note: '-기도 하다 는 기도 와 하다 关系를 띄어 쓴다：먹기도 해요（✓）。붙여 쓰면 틀린 形式 보인다。' },
      { wrong: '有些难过하고 有些高兴해요', correct: '有些难过 하고 有些高兴 해요', note: '-기도 하고 구조에서 기도 뒤와 하고 앞에 必须 띄어쓰기가 需要하다。有些难过 하고（✓）。' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '-는가 하면，-기도 하다',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: '날씨가 맑___ 하면 갑자기 비가 오기도 해요。（有时晴，有时突然下雨。）',
          options: ['는가', '던가', '을가', '은가'],
          answer: 3 as 0|1|2|3,
          explanation: '맑다（形容词）冠词形：맑은가 하면（✓）。는가는 动词 现在형，던가는 回想，을가는 不存在的形式。',
        },
        {
          prompt: '한국어가 재미있___ 하면 어렵기도 해요。（韩语一方面有趣，另一方面也难。）',
          options: ['던가', '은가', '는가', '을가'],
          answer: 2 as 0|1|2|3,
          explanation: '재미있다（있다 系列 形容词）는 冠词形에서 例外적으로 -는 을 씁니다：재미있는가 하면（✓）。一般 형용사는 -은/ㄴ가를 쓰지만，있다/없다는 -는가 形式를 씁니다。은가/던가/을가는 이 문맥에 맞지 않습니다。',
        },
        {
          prompt: '이 음식은 맵___ 하고 짜기도 해요。（这道食物既辣又咸。）',
          options: ['기만', '기도', '은가', '는가'],
          answer: 1 as 0|1|2|3,
          explanation: '-기도 하고 -기도 하다：맵기도 하고 짜기도 해요（✓）。는가/은가는 대조 구조，기만은 不存在的形式。',
        },
        {
          prompt: '다음 중 올바른 句子은？',
          options: ['有些难过 하고 有些高兴 해요', '웃은가 하면 또 울어요（动词 现在）', '비싸는가 하면（形容词+는가）', '먹기도하다（띄어쓰기）'],
          answer: 0 as 0|1|2|3,
          explanation: '有些难过 하고 有些高兴 해요：올바른 나열 구조（✓）。웃은가→웃는가（动词 现在），비싸는가→비便宜（形容词），먹기도하다→먹기도 하다（띄어쓰기）。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P14 · 第20课</div>
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
        <div><span style="font-weight:700">形容词</span>：비싸<b style="color:#ff7fa8">ㄴ가</b> 하면（비便宜 하면）</div>
        <div><span style="font-weight:700">있다/없다</span>：재미있<b style="color:#ff7fa8">는가</b> 하면（形容词이나 -는 使用）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비싸는가 하면（形容词+는가）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비便宜 하면</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹기도하다（띄어쓰기）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹기도 하다</span></div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">一面……一面…… / 也会……</div>
<div class="card-body">同一个人/事物有两面，或者有时还有另一种情况。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种 表达 방식</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는/은/ㄴ가 하면 — 대조</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친절한가 하면 차갑기도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一方面亲切，有时也会冷漠。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#5bbfb0;margin-bottom:4px">-기도 하다 — 병렬/추가</div>
      <div style="font-size:16px;font-weight:800;color:#241917">有些难过 하고 有些高兴 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">既悲伤，也高兴。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 形容词 + 가 하면 → 은/ㄴ가（비便宜，어려운가）</div>
</div>
<div class="reminder-box">-기도 하다 의 기도 와 하다 关系는 必须 띄어 쓴다。</div>`,
    compareHtml: `<div class="card-title">-는가 하면 vs -기도 하다 / 있다 注意</div>
<div class="card-body">类似的 구조의 차이와 있다/없다 特殊 처리。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는가 하면</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">앞뒤 대조，양면 描述</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비便宜 하면 质量이 좋아요</span><span style="font-size:16px;color:#5a4640">贵是贵，但质量好</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기도 하다</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">추가/나열，여러 상태 병렬</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맵기도 하고 달기도 해요</span><span style="font-size:16px;color:#5a4640">既辣又甜</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">있다/없다 + 는가</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">있다/없다는 形容词이나 -는가 使用</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">재미있는가 하면</span><span style="font-size:16px;color:#5a4640">一方面有趣</span></div>
  </div>
</div>`,
    compareLabel: '-는가 하면 vs -기도 하다',
    quickTable: {
      title: '-는/은/ㄴ가 하면 冠词形 선택',
      headers: ['품사', '冠词形', '例句'],
      rows: [
        ['动词 现在', '-는가', '웃는가 하면，먹는가 하면'],
        ['形容词', '-은/ㄴ가', '비便宜 하면，어려운가 하면，좋은가 하면'],
        ['있다/없다', '-는가', '재미있는가 하면，없는가 하면'],
        ['-기도 하다', '词干 + 기도', '먹기도 해요，有些难过 해요'],
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p20-l06',
    isPractice: true,
    partNumber: 20,
    lessonNumber: 6,
    title: 'P16 综合练习',
    whatItDoes: 'P14 第16～20课 综합练习',
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
    <div class="ov-hero-label">P14 · 综合练习②</div>
    <div class="ov-hero-title">第16～20课 복습</div>
    <div class="ov-hero-sub">비롯한/비롯해서/만 해도 · 개나/까지 · (이)라든가/마저 · 체하다/척하다 · -는가 하면/-기도 하다</div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: 'P16 综合练习',
      body: '선택지 중 맞는 것을 고르세요',
      questions: [
        {
          prompt: 'BTS___ 비롯한 K-POP 그룹들이 인기예요。（以BTS为首的K-POP团体们很受欢迎。）',
          options: ['를', '이', '가', '을'],
          answer: 0 as 0|1|2|3,
          explanation: 'BTS（收音X）→ 를 비롯한（✓）。收音O면 을 비롯한。이/가는 주격 助词。',
        },
        {
          prompt: '오늘 커피를 세 잔___ 마셨어요。（今天竟然喝了三杯咖啡。）',
          options: ['나', '이나', '마저', '까지'],
          answer: 1 as 0|1|2|3,
          explanation: '잔（收音ㄴ 있음）→ 이나：세 잔이나（✓）。收音X면 나，까지는 극단，마저는 绝望。',
        },
        {
          prompt: '모두 잃고 희망___ 消失了。（连希望都消失了。—绝望）',
          options: ['까지', '라든가', '마저', '이나'],
          answer: 2 as 0|1|2|3,
          explanation: '마저：绝望적 맥락에서 마지막 것마저：희망마저（✓）。까지는 중성/肯定，이나는 수량，라든가는 列举。',
        },
        {
          prompt: '그 사람은 나를 보고도 모르___ 척했어요。（那个人明明看到我，却假装不认识。—现在）',
          options: ['을', 'ㄴ', '은', '는'],
          answer: 3 as 0|1|2|3,
          explanation: '모르다（动词）现在 冠词形：모르는 척했어요（✓）。过去라면 모른 척，은/ㄴ은 形容词나 过去형，을은 将来형。',
        },
        {
          prompt: '한국어는 어려운가 하면 재미있___ 해요。（韩语一方面难，另一方面也有趣。）',
          options: ['기도', '기가', '는가', '기만'],
          answer: 0 as 0|1|2|3,
          explanation: '-기도 하다：추가/나열：재미있기도 해요（✓）。는가는 대조 구조 앞，기만/기가는 不存在的形式。',
        },
        {
          prompt: '兴趣로 영화___ 음악이라든가 해요。（兴趣爱好是电影啊音乐之类的。）',
          options: ['라든가', '까지', '이라든가', '마저'],
          answer: 0 as 0|1|2|3,
          explanation: '영화（收音X）→ 라든가（✓）。이라든가는 收音O 명사에，마저는 绝望，까지는 극단。',
        },
      ],
    },
  },

];
