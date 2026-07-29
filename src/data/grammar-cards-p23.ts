import type { GrammarCard } from '@/types';

export const grammarCardsP23: GrammarCard[] = [
  // ── 第1课：-는/은/ㄴ 반면에 ─────────────────────────────────
  {
    id: 'card-p23-l01',
    partNumber: 23,
    lessonNumber: 1,
    title: '-는/은/ㄴ 반면에',
    whatItDoes: '与此相反……（对比两面）',
    whatItDoesBody: '表达同一件事物或情况的两个对立面。\n"一方面……另一方面……"、"……的同时相反……"。\n比 -지만（虽然）更强调"两个对立特征并存"，是 TOPIK 中级典型对比连接词。',
    structureNote: '结构：\n· 动词 + 는 반면에（现在）\n· 动词 + 은/ㄴ 반면에（过去）\n· 形容词 + 은/ㄴ 반면에\n· 名词 + 인 반면에\n\n"에"可省略变成 -는 반면，意思不变。',
    rulesNote: '和 -지만 差别：\n· -지만：单纯转折"虽然A但B"\n· -는 반면에：强调"A和B是对立特征"，通常同一主体的两面。\n\n常用于分析事物利弊、比较两种情况的差异。',
    structures: [
      {
        ko: '이 카페는 커피는 맛있는 반면에 가격이 비싸요',
        zh: '这家咖啡店，咖啡好喝，相反价格却贵。',
        tokens: [
          { text: '이 카페는', role: 'subject' },
          { text: '커피는', role: 'subject' },
          { text: '맛있는 반면에', role: 'verb' },
          { text: '가격이', role: 'subject' },
          { text: '비싸요', role: 'verb' },
        ],
      },
      {
        ko: '형은 활발한 반면에 동생은 조용해요',
        zh: '哥哥活泼，相反弟弟很安静。',
        tokens: [
          { text: '형은', role: 'subject' },
          { text: '활발한 반면에', role: 'verb' },
          { text: '동생은', role: 'subject' },
          { text: '조용해요', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 문법이 어려운 반면에 발음은 쉬운 편이에요',
        zh: '韩语语法难，相反发音算简单。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '문법이', role: 'subject' },
          { text: '어려운 반면에', role: 'verb' },
          { text: '발음은', role: 'subject' },
          { text: '쉬운 편이에요', role: 'verb' },
        ],
      },
      {
        ko: '이 일은 힘든 반면 보람도 커요',
        zh: '这份工作辛苦，但同时也很有成就感。',
        tokens: [
          { text: '이 일은', role: 'subject' },
          { text: '힘든 반면', role: 'verb' },
          { text: '보람도', role: 'subject' },
          { text: '커요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 + 는 반면에', examples: '먹다→먹는 반면에 / 가다→가는 반면에' },
      { type: 'rule', text: '形容词无收音 + ㄴ 반면에 / 有收音 + 은 반면에', examples: '크다→큰 반면에 / 좋다→좋은 반면에 / 어렵다→어려운 반면에' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 반면에', examples: '가다→간 반면에 / 먹다→먹은 반면에' },
      { type: 'rule', text: '名词 + 인 반면에', examples: '학생인 반면에 / 장점인 반면에' },
      { type: 'usage', text: '表达同一主体或相关主体的两个对立特征', examples: '커피는 맛있는 반면에 가격이 비싸요（好喝 vs 贵）' },
      { type: 'compare', text: '和 -지만 差别：单纯转折 vs 强调对立特征', examples: '맛있지만 비싸요（转折）/ 맛있는 반면 비싸요（对立特征）' },
      { type: 'note', text: '"에" 可省略为 -는 반면，语感更书面', examples: '어려운 반면에 → 어려운 반면（书面）' },
      { type: 'example', text: '문법이 어려운 반면에 발음은 쉬워요 / 이 일은 힘든 반면 보람도 커요' },
      { type: 'compare', text: '和 -는 대신에 区别：대신에 含"代价/交换"（贵，但换来质量好），반면에 只是中性并列两个对立特征、无交换含义', examples: '비싼 대신에 질이 좋아요（贵，但换来质量好）/ 비싼 반면에 질이 좋아요（贵，相反质量好）' },
      { type: 'note', text: '对比的两边常用对比助词 은/는 来凸显"对立"，比 이/가 更地道，不过用 이/가 也不算错', examples: '형은 활발한 반면에 동생은 조용해요（两边都用 은，对立更清晰）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 카페는', role: 'subject' },
          { text: '커피는', role: 'subject' },
          { text: '맛있는 반면에', role: 'verb' },
          { text: '가격이', role: 'subject' },
          { text: '비싸요', role: 'verb' },
        ],
        zh: '这家咖啡店咖啡好喝，相反价格贵。',
        swapWords: ['맛있는 반면에', '좋은 반면에', '유명한 반면에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '형은', role: 'subject' },
          { text: '활발한 반면에', role: 'verb' },
          { text: '동생은', role: 'subject' },
          { text: '조용해요', role: 'verb' },
        ],
        zh: '哥哥活泼，相反弟弟很安静。',
        swapWords: ['활발한 반면에', '외향적인 반면에', '적극적인 반면에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '문법이', role: 'subject' },
          { text: '어려운 반면에', role: 'verb' },
          { text: '발음은', role: 'subject' },
          { text: '쉬워요', role: 'verb' },
        ],
        zh: '韩语语法难，相反发音简单。',
        swapWords: ['어려운 반면에', '복잡한 반면에', '까다로운 반면에'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 일은', role: 'subject' },
          { text: '힘든 반면', role: 'verb' },
          { text: '보람도', role: 'subject' },
          { text: '커요', role: 'verb' },
        ],
        zh: '这份工作辛苦，但同时也很有成就感。',
        swapWords: ['힘든 반면', '피곤한 반면', '어려운 반면'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店评价', ko: '이 카페는 커피는 맛있는 반면에 가격이 비싸요.', zh: '这家咖啡店咖啡好喝，但价格贵。' },
      { icon: '👨‍👦', context: '兄弟对比', ko: '형은 활발한 반면에 동생은 내성적이에요.', zh: '哥哥活泼相反弟弟内向。' },
      { icon: '📚', context: '学习分析', ko: '한국어는 문법이 어려운 반면 발음은 쉬워요.', zh: '韩语语法难，发音简单。' },
      { icon: '💼', context: '工作利弊', ko: '이 회사는 월급이 많은 반면에 야근이 많아요.', zh: '这公司工资高，相反加班也多。' },
      { icon: '🏙️', context: '城市对比', ko: '서울은 편리한 반면 물가가 비싸요.', zh: '首尔方便，相反物价贵。' },
      { icon: '🍜', context: '食物评价', ko: '이 음식은 맛있는 반면에 살이 잘 쪄요.', zh: '这食物好吃相反容易长胖。' },
    ],
    mistakes: [
      { wrong: '먹은 반면에 배고파요（想说吃了却饿）', correct: '먹었는데도 배고파요', note: '-는 반면에 表达"两个对立特征并存"，不是"事件让步"。让步用 -는데도 或 -았는데도。' },
      { wrong: '어렵는 반면에', correct: '어려운 반면에', note: '形容词用 -은/ㄴ 반면에，不用 -는。어렵다 有收音 → 어려운 반면에。' },
      { wrong: '이 일은 힘든 반면에 저 일도 힘들어요', correct: '이 일은 힘든 반면에 저 일은 쉬워요', note: '반면에 前后必须是对立的两个特征。两边都"힘들다"不是对立。' },
      { wrong: '학생 반면에', correct: '학생인 반면에', note: '名词后必须加 인。' },
    ],
    quickTable: {
      title: '-는/은/ㄴ 반면에 冠形选择',
      body: '按词性和时态选择正确冠形。',
      headers: ['词性', '时态', '接续', '例句'],
      rows: [
        [{ ko: '动词', zh: '现在' }, { ko: '-는', zh: '进行/习惯' }, { ko: '먹는 반면에', zh: '吃…相反' }, { ko: '매일 먹는 반면에 살이 안 쪄요', zh: '每天吃相反不胖' }],
        [{ ko: '动词', zh: '过去' }, { ko: '-은/ㄴ', zh: '已完成' }, { ko: '간 반면에', zh: '去了…相反' }, { ko: '어제 간 반면에 오늘은 안 갔어요', zh: '昨天去了今天没去' }],
        [{ ko: '形容词', zh: '现在' }, { ko: '-은/ㄴ', zh: '状态' }, { ko: '좋은 반면에', zh: '好…相反' }, { ko: '맛있는 반면에 비싸요', zh: '好吃相反贵' }],
        [{ ko: '있다/없다', zh: '现在' }, { ko: '-는', zh: '例外' }, { ko: '있는 반면에', zh: '有…相反' }, { ko: '재미있는 반면에 어려워요', zh: '有趣相反难' }],
        [{ ko: '名词+이다', zh: '现在' }, { ko: '인', zh: '身份' }, { ko: '학생인 반면에', zh: '是学生…相反' }, { ko: '형은 학생인 반면에 동생은 회사원이에요', zh: '哥是学生相反弟是员工' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 반면에 冠形练习',
      body: '根据词性和时态选出正确形态。',
      questions: [
        {
          prompt: '"这咖啡店好喝相反价格贵" → 이 카페는 커피가 ___ 가격이 비싸요.',
          options: ['맛있은 반면에', '맛있는 반면에', '맛있을 반면에', '맛있어 반면에'],
          answer: 1,
          explanation: '맛있다 属 있다 类，例外用 -는 반면에（虽然是形容词性质）。맛있는 반면에。',
        },
        {
          prompt: '"哥哥活泼相反弟弟安静" → 형은 ___ 동생은 조용해요.',
          options: ['활발하는 반면에', '활발할 반면에', '활발한 반면에', '활발히 반면에'],
          answer: 2,
          explanation: '활발하다 是 하다类 形容词 → 활발한 반면에（无收音+ㄴ）。',
        },
        {
          prompt: '"哥哥是学生相反弟弟是员工" → 형은 ___ 동생은 회사원이에요.',
          options: ['학생 반면에', '학생는 반면에', '학생인 반면에', '학생의 반면에'],
          answer: 2,
          explanation: '名词 + 이다 + 은/ㄴ 冠形 → 名词 + 인 반면에。학생인 반면에。',
        },
        {
          prompt: '关于 -는 반면에 和 -지만，哪句最准确？',
          options: [
            '两者意思完全相同',
            '前者强调"对立特征并存"，后者是单纯转折',
            '前者用未来，后者用过去',
            '前者只用书面语',
          ],
          answer: 1,
          explanation: '-는 반면에 强调事物的两个对立特征并存，常用于分析利弊；-지만 是单纯转折。语感不同。',
        },
      ],
    },
    linkedGrammarIds: ['card-p7-l06'],
    step0Html: `<div class="card-title">-는/은/ㄴ 반면에</div>
<div class="card-body">"与此相反……" —— 对比同一事物的两个对立特征。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">对比 vs 转折</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-지만（单纯转折）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">맛있지만 비싸요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好吃但贵。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 반면에（对立特征）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">맛있는 반면에 비싸요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好吃，相反价格却贵。（利弊分析）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-는 반면에 常用于分析利弊、比较对立特征。语感比 -지만 更书面、更分析。</div>`,
    compareHtml: `<div class="card-title">-는 반면에 vs -는데</div>
<div class="card-body">两者都可以连接对立句，但用法侧重不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는데 → 背景/铺垫</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">提供背景信息，语气较弱</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 오는데 우산이 없어요.</span><span style="font-size:16px;color:#5a4640">下雨了但没伞。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 반면에 → 明确对立特征</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调两个对立面并存</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">여름은 더운 반면 겨울은 추워요.</span><span style="font-size:16px;color:#5a4640">夏天热，相反冬天冷。</span></div>
  </div>
</div>
<div class="reminder-box">语感强度：-지만 &lt; -는데 &lt; -는 반면에。反差越明显选后者。</div>`,
    compareLabel: '-는 반면에 vs -는데',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 1 课</div>
    <div class="ov-hero-title">-는/은/ㄴ 반면에</div>
    <div class="ov-hero-sub">"与此相反……" · 对立特征并存</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 반면에</b><br>
        形容词/动词过去 → <b style="color:#2db89b">-은/ㄴ 반면에</b><br>
        名词 → <b style="color:#6b7ff0">인 반면에</b><br>
        "에" 可省略为 <b style="color:#c89020">-는 반면</b>（书面）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        커피는 맛있는 반면에 가격이 비싸요.（好喝相反贵）<br>
        형은 활발한 반면에 동생은 조용해요.（哥活泼相反弟安静）<br>
        문법이 어려운 반면 발음은 쉬워요.（语法难相反发音简单）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">어렵는 반면에</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어려운 반면에（形容词用 -은/ㄴ）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">힘든 반면에 저 일도 힘들어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">반면에 前后必须是对立特征</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第2课：-는 데다가 ──────────────────────────────────
  {
    id: 'card-p23-l02',
    partNumber: 23,
    lessonNumber: 2,
    title: '-는/은/ㄴ 데다가',
    whatItDoes: '不仅……而且……（累加）',
    whatItDoesBody: '表达"在A的基础上又加B"的累加连接。\n"不仅……还……"、"又……又……"。\n后半句通常比前半句更进一步或程度加深，语气比 -고 更强。',
    structureNote: '结构：\n· 动词 + 는 데다가（现在）\n· 动词过去 + 은/ㄴ 데다가\n· 形容词 + 은/ㄴ 데다가\n· 名词 + 인 데다가\n\n"가" 可省略为 -는 데다，意思不变，更书面。',
    rulesNote: '和 -고 的差别：\n· -고：单纯并列"和/并且"\n· -는 데다가：累加+加强，"更……"\n\n后半句常有 -까지、-도、더욱 等加强词，突出"更进一步"。',
    structures: [
      {
        ko: '이 옷은 예쁜 데다가 가격도 저렴해요',
        zh: '这件衣服不仅好看，价格还便宜。',
        tokens: [
          { text: '이 옷은', role: 'subject' },
          { text: '예쁜 데다가', role: 'verb' },
          { text: '가격도', role: 'subject' },
          { text: '저렴해요', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 공부도 잘하는 데다가 운동도 잘해요',
        zh: '敏秀不仅学习好，运动也不错。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '공부도', role: 'object' },
          { text: '잘하는 데다가', role: 'verb' },
          { text: '운동도', role: 'object' },
          { text: '잘해요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 비가 오는 데다가 바람까지 불어요',
        zh: '今天不仅下雨，还刮风。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '오는 데다가', role: 'verb' },
          { text: '바람까지', role: 'subject' },
          { text: '불어요', role: 'verb' },
        ],
      },
      {
        ko: '이 사람은 학생인 데다가 아르바이트도 하고 있어요',
        zh: '这个人不仅是学生，还在做兼职。',
        tokens: [
          { text: '이 사람은', role: 'subject' },
          { text: '학생인 데다가', role: 'verb' },
          { text: '아르바이트도', role: 'object' },
          { text: '하고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 + 는 데다가', examples: '오다→오는 데다가 / 하다→하는 데다가' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 데다가', examples: '가다→간 데다가 / 먹다→먹은 데다가' },
      { type: 'rule', text: '形容词 + 은/ㄴ 데다가', examples: '예쁘다→예쁜 데다가 / 좋다→좋은 데다가' },
      { type: 'rule', text: '名词 + 인 데다가', examples: '학생인 데다가 / 부자인 데다가' },
      { type: 'usage', text: '后半句常配 -까지、-도、더욱 等加强词', examples: '비가 오는 데다가 바람까지 불어요 / 예쁜 데다가 가격도 싸요' },
      { type: 'compare', text: '和 -고 差别：并列 vs 累加加强', examples: '예쁘고 저렴해요（并列）/ 예쁜 데다가 저렴해요（累加，强调"上加"）' },
      { type: 'note', text: '前后句情感倾向必须一致（都正面或都负面）', examples: '예쁜 데다가 저렴해요（都正面 ✓）/ 예쁜 데다가 비싸요（矛盾 ✗）' },
      { type: 'compare', text: '和 -을 뿐 아니라（本章后面详学）区别：데다가 更口语、多用于日常；을 뿐 아니라 中性、口语书面都常用', examples: '예쁜 데다가 싸요（口语）≈ 예쁠 뿐 아니라 싸요（通用）' },
      { type: 'note', text: '这里的 데 是"累加"专用，别和表场所/情况的 -는 데（如 가는 데 시간이 걸려요＝去…花时间）混淆：判断标志是后面跟 -가/-다가', examples: '오는 데다가 바람도（累加）≠ 사는 데 돈이 들어요（场所/情况）' },
      { type: 'example', text: '공부도 잘하는 데다가 운동도 잘해요 / 오늘 비가 오는 데다가 바람까지 불어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 옷은', role: 'subject' },
          { text: '예쁜 데다가', role: 'verb' },
          { text: '가격도', role: 'subject' },
          { text: '저렴해요', role: 'verb' },
        ],
        zh: '这件衣服不仅好看，价格还便宜。',
        swapWords: ['예쁜 데다가', '멋진 데다가', '깔끔한 데다가'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '공부도', role: 'object' },
          { text: '잘하는 데다가', role: 'verb' },
          { text: '운동도', role: 'object' },
          { text: '잘해요', role: 'verb' },
        ],
        zh: '敏秀不仅学习好，运动也不错。',
        swapWords: ['공부도', '수학도', '영어도'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '오는 데다가', role: 'verb' },
          { text: '바람까지', role: 'subject' },
          { text: '불어요', role: 'verb' },
        ],
        zh: '今天不仅下雨，还刮风。',
        swapWords: ['바람까지', '천둥까지', '눈까지'],
        swapRole: 'subject',
      },
      {
        wordBlocks: [
          { text: '이 카페는', role: 'subject' },
          { text: '분위기가', role: 'subject' },
          { text: '좋은 데다가', role: 'verb' },
          { text: '커피도', role: 'subject' },
          { text: '맛있어요', role: 'verb' },
        ],
        zh: '这家咖啡店不仅气氛好，咖啡也好喝。',
        swapWords: ['좋은 데다가', '멋진 데다가', '아늑한 데다가'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '👗', context: '衣服评价', ko: '이 옷은 예쁜 데다가 가격도 저렴해요.', zh: '这衣服不仅好看还便宜。' },
      { icon: '🏆', context: '全能夸奖', ko: '민수 씨는 공부도 잘하는 데다가 운동도 잘해요.', zh: '敏秀不仅学习好还运动强。' },
      { icon: '🌧️', context: '天气糟糕', ko: '비가 오는 데다가 바람까지 불어요.', zh: '不仅下雨还刮风。' },
      { icon: '☕', context: '咖啡店推荐', ko: '분위기가 좋은 데다가 커피도 맛있어요.', zh: '不仅气氛好咖啡还好喝。' },
      { icon: '💼', context: '工作繁忙', ko: '일이 많은 데다가 회의도 계속 있어요.', zh: '不仅活多还一直开会。' },
      { icon: '🎓', context: '学生兼职', ko: '학생인 데다가 아르바이트도 두 개나 해요.', zh: '不仅是学生还打两份工。' },
    ],
    mistakes: [
      { wrong: '예쁜 데다가 비싸요', correct: '예쁜 데다가 가격도 저렴해요 / 예쁘지만 비싸요', note: '-는 데다가 前后必须情感倾向一致。"漂亮"和"贵"倾向矛盾，用 -지만 转折。' },
      { wrong: '예쁘는 데다가', correct: '예쁜 데다가', note: '形容词用 -은/ㄴ 데다가。예쁘다 无收音 → 예쁜 데다가。' },
      { wrong: '학생 데다가', correct: '학생인 데다가', note: '名词 + 인 데다가。' },
      { wrong: '갔는 데다가', correct: '간 데다가', note: '动词过去 + 은/ㄴ 데다가，不是 -았/었는 데다가。' },
    ],
    quickTable: {
      title: '-는/은/ㄴ/인 데다가 冠形选择',
      body: '按词性和时态选择正确冠形。',
      headers: ['词性', '时态', '接续', '例句'],
      rows: [
        [{ ko: '动词', zh: '现在' }, { ko: '-는', zh: '进行/习惯' }, { ko: '하는 데다가', zh: '不仅做…' }, { ko: '잘하는 데다가 열심히도 해요', zh: '不仅擅长还努力' }],
        [{ ko: '动词', zh: '过去' }, { ko: '-은/ㄴ', zh: '已完成' }, { ko: '간 데다가', zh: '不仅去了…' }, { ko: '어제 간 데다가 오늘도 갈 거예요', zh: '不仅昨天去今天也去' }],
        [{ ko: '形容词', zh: '现在' }, { ko: '-은/ㄴ', zh: '状态' }, { ko: '예쁜 데다가', zh: '不仅漂亮…' }, { ko: '예쁜 데다가 착해요', zh: '不仅漂亮还善良' }],
        [{ ko: '있다/없다', zh: '现在' }, { ko: '-는', zh: '例外' }, { ko: '있는 데다가', zh: '不仅有…' }, { ko: '재미있는 데다가 유익해요', zh: '不仅有趣还有益' }],
        [{ ko: '名词+이다', zh: '现在' }, { ko: '인', zh: '身份' }, { ko: '학생인 데다가', zh: '不仅是学生…' }, { ko: '학생인 데다가 알바까지 해요', zh: '不仅是学生还打工' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 데다가 冠形练习',
      body: '根据词性选出正确形态。',
      questions: [
        {
          prompt: '"这衣服不仅漂亮价格也便宜" → 이 옷은 ___ 가격도 저렴해요.',
          options: ['예쁜 데다가', '예쁘는 데다가', '예쁠 데다가', '예뻤는 데다가'],
          answer: 0,
          explanation: '예쁘다 是形容词无收音 → -ㄴ 데다가 → 예쁜 데다가。',
        },
        {
          prompt: '"敏秀学习好，运动也强" → 민수 씨는 공부도 ___ 운동도 잘해요.',
          options: ['잘한 데다가', '잘하는 데다가', '잘할 데다가', '잘하기 데다가'],
          answer: 1,
          explanation: '잘하다 是动词，"擅长"是现在时/习惯 → -는 데다가。잘하는 데다가。',
        },
        {
          prompt: '"这人不仅是学生还打工" → 이 사람은 ___ 아르바이트도 해요.',
          options: ['학생 데다가', '학생는 데다가', '학생인 데다가', '학생을 데다가'],
          answer: 2,
          explanation: '名词 + 이다 + -은/ㄴ 冠形 → 名词 + 인 데다가。학생인 데다가。',
        },
        {
          prompt: '关于 -는 데다가 的用法，哪句最准确？',
          options: [
            '前后句情感倾向可以对立',
            '前后句情感倾向必须一致（都正面或都负面）',
            '只能接动词',
            '意思等同于 -지만',
          ],
          answer: 1,
          explanation: '-는 데다가 表达累加加强，前后必须同倾向。矛盾情感（好+坏）要用 -지만。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l04'],
    step0Html: `<div class="card-title">-는/은/ㄴ 데다가</div>
<div class="card-body">"不仅……而且……" —— 在原有基础上累加加强。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">并列 vs 累加</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-고（单纯并列）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">예쁘고 저렴해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">又漂亮又便宜。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 데다가（累加加强）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">예쁜 데다가 가격도 저렴해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不仅漂亮，价格还便宜。（更进一步）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-는 데다가 前后必须同倾向（都好或都不好）。矛盾情感用 -지만。</div>`,
    compareHtml: `<div class="card-title">-는 데다가 vs -는 반면에</div>
<div class="card-body">两个都连接两个特征，但方向完全相反。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 데다가 → 累加（同倾向）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">A+B 都是同类特征</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">예쁜 데다가 저렴해요.</span><span style="font-size:16px;color:#5a4640">不仅漂亮还便宜。（都好）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 반면에 → 对立（异倾向）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">A 和 B 对立特征</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">예쁜 반면에 비싸요.</span><span style="font-size:16px;color:#5a4640">漂亮但贵。（一好一不好）</span></div>
  </div>
</div>
<div class="reminder-box">同倾向叠加用 데다가；对立特征用 반면에。选错会闹逻辑笑话。</div>`,
    compareLabel: '-는 데다가 vs -는 반면에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 2 课</div>
    <div class="ov-hero-title">-는/은/ㄴ 데다가</div>
    <div class="ov-hero-sub">"不仅……而且……" · 累加加强</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 데다가</b><br>
        形容词/动词过去 → <b style="color:#2db89b">-은/ㄴ 데다가</b><br>
        名词 → <b style="color:#6b7ff0">인 데다가</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        예쁜 데다가 가격도 저렴해요.（不仅漂亮还便宜）<br>
        공부도 잘하는 데다가 운동도 잘해요.（不仅学习好还运动强）<br>
        비가 오는 데다가 바람까지 불어요.（不仅下雨还刮风）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁜 데다가 비싸요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">前后倾向必须一致（都好或都不好）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 데다가</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생인 데다가（名词+인）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第3课：-기는커녕 ─────────────────────────────────────
  {
    id: 'card-p23-l03',
    partNumber: 23,
    lessonNumber: 3,
    title: '-기는커녕',
    whatItDoes: '别说……了，反而……',
    whatItDoesBody: '强烈否定预期："别说 A，连 B 都不……"或"别说 A，反而 B"。\n表达实际情况远差于（或远不同于）预期。\n语气比一般的转折强烈，带失望或抱怨的情感。',
    structureNote: '结构：\n· 动词/形容词词干 + 기는커녕 + 反预期结果\n· 名词 + 은/는커녕 + 反预期结果\n\n后半句常配 -도 못하다 / -지도 않다 等否定式，突出"连基本的都不……"。',
    rulesNote: '和 -는 반면에 差别：\n· -는 반면에 = 客观对比"A 与 B 相反"\n· -기는커녕 = 强烈失望"别说 A 了，连 B 都……"\n\n典型套路：\n· 预期做 A，结果连低于 A 的 B 都不……\n· "칭찬은커녕 혼났어요"（别说表扬了，还挨骂了）',
    structures: [
      {
        ko: '칭찬은커녕 혼만 났어요',
        zh: '别说表扬了，还挨了骂。',
        tokens: [
          { text: '칭찬은커녕', role: 'plain' },
          { text: '혼만', role: 'plain' },
          { text: '났어요', role: 'verb' },
        ],
      },
      {
        ko: '쉬기는커녕 밥도 못 먹었어요',
        zh: '别说休息了，连饭都没吃上。',
        tokens: [
          { text: '쉬기는커녕', role: 'verb' },
          { text: '밥도', role: 'object' },
          { text: '못 먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 잘하기는커녕 인사도 제대로 못 해요',
        zh: '别说韩语说得好了，连打招呼都不利索。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘하기는커녕', role: 'verb' },
          { text: '인사도', role: 'object' },
          { text: '제대로 못 해요', role: 'verb' },
        ],
      },
      {
        ko: '돈은커녕 시간도 없어요',
        zh: '别说钱了，连时间都没有。',
        tokens: [
          { text: '돈은커녕', role: 'plain' },
          { text: '시간도', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 기는커녕', examples: '쉬다→쉬기는커녕 / 자다→자기는커녕 / 잘하다→잘하기는커녕' },
      { type: 'rule', text: '名词无收音 + 는커녕 / 有收音 + 은커녕', examples: '돈→돈은커녕（有收音）/ 커피→커피는커녕（无收音）' },
      { type: 'usage', text: '后半句几乎必接否定式或反预期结果', examples: '칭찬은커녕 혼났어요 / 쉬기는커녕 밥도 못 먹었어요' },
      { type: 'usage', text: '后半句常配 -도、-까지 等强调助词', examples: '밥도 못 먹었어요 / 인사조차 못 해요' },
      { type: 'compare', text: '和 -지 않다 差别：语气强度差别大', examples: '쉬지 않았어요（客观事实）/ 쉬기는커녕 밥도 못 먹었어요（强烈失望）' },
      { type: 'note', text: '前后必须是"预期落空"关系：预期高 → 实际低于预期', examples: '칭찬 → 혼남 / 쉬기 → 밥 못 먹음 / 잘하기 → 인사도 못함' },
      { type: 'compare', text: '和 -조차/-마저（连…都）区别：조차/마저 只是"连极端的也…"，커녕 还多一层"别说前面那个了"的排除+失望', examples: '밥조차 못 먹었어요（连饭都没吃）/ 쉬기는커녕 밥도 못 먹었어요（别说休息，连饭都…）' },
      { type: 'note', text: '커녕 前项本身已带否定语气，A 部分不要再加 안/못；否定只落在后半句', examples: '쉬기는커녕 …（✓）不是 쉬지 못하기는커녕 …' },
      { type: 'example', text: '칭찬은커녕 혼났어요 / 도움은커녕 방해가 됐어요 / 쉬기는커녕 밤을 새웠어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '칭찬은커녕', role: 'plain' },
          { text: '혼만', role: 'plain' },
          { text: '났어요', role: 'verb' },
        ],
        zh: '别说表扬了，还挨了骂。',
        swapWords: ['칭찬은커녕', '보상은커녕', '인정은커녕'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '쉬기는커녕', role: 'verb' },
          { text: '밥도', role: 'object' },
          { text: '못 먹었어요', role: 'verb' },
        ],
        zh: '别说休息了，连饭都没吃上。',
        swapWords: ['쉬기는커녕', '자기는커녕', '눈 붙이기는커녕'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '잘하기는커녕', role: 'verb' },
          { text: '인사도', role: 'object' },
          { text: '제대로 못 해요', role: 'verb' },
        ],
        zh: '别说韩语说得好，连打招呼都不利索。',
        swapWords: ['한국어를', '중국어를', '영어를'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '돈은커녕', role: 'plain' },
          { text: '시간도', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '别说钱了，连时间都没有。',
        swapWords: ['돈은커녕', '여유는커녕', '기회는커녕'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😤', context: '预期落空', ko: '칭찬은커녕 혼만 났어요.', zh: '别说表扬了还挨骂。' },
      { icon: '😴', context: '忙到没休息', ko: '오늘 쉬기는커녕 점심도 못 먹었어요.', zh: '今天别说休息，午饭都没吃。' },
      { icon: '📚', context: '水平不够', ko: '한국어 잘하기는커녕 인사도 못 해요.', zh: '别说韩语好，连打招呼都不会。' },
      { icon: '💸', context: '双重缺乏', ko: '돈은커녕 시간도 없어요.', zh: '别说钱，连时间都没。' },
      { icon: '😔', context: '帮倒忙', ko: '도움은커녕 오히려 방해가 됐어요.', zh: '别说帮忙，反而添乱了。' },
      { icon: '💤', context: '通宵工作', ko: '자기는커녕 밤을 새웠어요.', zh: '别说睡觉，还熬了通宵。' },
    ],
    mistakes: [
      { wrong: '칭찬을커녕', correct: '칭찬은커녕', note: '名词有收音 → 은커녕（不是 을커녕）。칭찬 有收音 ㄴ → 칭찬은커녕。' },
      { wrong: '쉬는커녕', correct: '쉬기는커녕', note: '动词/形容词必须用 -기는커녕（名词化），不用 -는커녕。名词才用 은/는커녕。' },
      { wrong: '칭찬은커녕 표창도 받았어요', correct: '칭찬은커녕 혼만 났어요', note: '后半句必须是"预期落空、反预期"。"表扬 → 表彰"不是落空是累加，用 -는 데다가。' },
      { wrong: '돈이 있기는커녕 시간도 없어요', correct: '돈은커녕 시간도 없어요', note: '"돈"作名词直接用 은커녕，不需要动词化 있기는커녕。' },
    ],
    quickTable: {
      title: '-기는커녕 vs 은/는커녕',
      body: '词性决定接法。',
      headers: ['前面成分', '接法', '例子', '例句'],
      rows: [
        [{ ko: '动词/形容词', zh: '词干+기' }, { ko: '-기는커녕', zh: '"别说……了"' }, { ko: '쉬기는커녕', zh: '别说休息了' }, { ko: '쉬기는커녕 밥도 못 먹었어요', zh: '别说休息连饭都没吃' }],
        [{ ko: '名词有收音', zh: '直接接' }, { ko: '은커녕', zh: '"别说N了"' }, { ko: '칭찬은커녕', zh: '别说表扬了' }, { ko: '칭찬은커녕 혼났어요', zh: '别说表扬还挨骂' }],
        [{ ko: '名词无收音', zh: '直接接' }, { ko: '는커녕', zh: '"别说N了"' }, { ko: '커피는커녕', zh: '别说咖啡了' }, { ko: '커피는커녕 물도 못 마셨어요', zh: '别说咖啡水都没喝' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기는커녕 / 은는커녕 用法练习',
      body: '根据词性选出正确接法。',
      questions: [
        {
          prompt: '"别说表扬了，还挨骂了" → ___ 혼만 났어요.',
          options: ['칭찬을커녕', '칭찬은커녕', '칭찬기는커녕', '칭찬는커녕'],
          answer: 1,
          explanation: '名词 칭찬 有收音 ㄴ → 은커녕。칭찬은커녕。',
        },
        {
          prompt: '"别说休息，连饭都没吃" → ___ 밥도 못 먹었어요.',
          options: ['쉬은커녕', '쉬는커녕', '쉬기는커녕', '쉬을커녕'],
          answer: 2,
          explanation: '动词 쉬다 → 词干 + 기 + 는커녕 → 쉬기는커녕。',
        },
        {
          prompt: '"别说钱了连时间都没有" → ___ 시간도 없어요.',
          options: ['돈기는커녕', '돈은커녕', '돈는커녕', '돈있기는커녕'],
          answer: 1,
          explanation: '돈 是名词，有收音 ㄴ → 은커녕。돈은커녕。',
        },
        {
          prompt: '关于 -기는커녕 的用法，哪句最准确？',
          options: [
            '后半句可以是正面加强',
            '后半句必须是反预期或否定，表达"落空"',
            '只能接名词',
            '只用于正式场合',
          ],
          answer: 1,
          explanation: '-기는커녕 表达强烈的预期落空，后半句必须是反预期结果或否定，突出"连低于预期的都不……"。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l01'],
    step0Html: `<div class="card-title">-기는커녕 / 은/는커녕</div>
<div class="card-body">"别说 A 了，反而 B" —— 强烈的预期落空。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">动词 vs 名词接法</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">动词/形容词 → -기는커녕</div>
      <div style="font-size:16px;font-weight:800;color:#241917">쉬기는커녕 밥도 못 먹었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">别说休息，连饭都没吃。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">名词 → 은/는커녕</div>
      <div style="font-size:16px;font-weight:800;color:#241917">칭찬은커녕 혼만 났어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">别说表扬还挨骂。</div>
    </div>
  </div>
</div>
<div class="reminder-box">后半句必须是"反预期"结果。预期做 A → 结果连低于 A 的 B 都不……</div>`,
    compareHtml: `<div class="card-title">-기는커녕 vs -는 반면에</div>
<div class="card-body">两个都涉及对比，但语气和结构完全不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 반면에 → 客观对立特征</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">语气中性，分析</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부는 잘하는 반면 운동은 못해요.</span><span style="font-size:16px;color:#5a4640">学习好相反运动差。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기는커녕 → 强烈预期落空</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">带失望/抱怨</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">잘하기는커녕 인사도 못해요.</span><span style="font-size:16px;color:#5a4640">别说好，连打招呼都不会。</span></div>
  </div>
</div>
<div class="reminder-box">客观分析用 반면에；带失望/落空感用 기는커녕。</div>`,
    compareLabel: '-기는커녕 vs -는 반면에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 3 课</div>
    <div class="ov-hero-title">-기는커녕 / 은/는커녕</div>
    <div class="ov-hero-sub">"别说……了，反而……" · 预期落空</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词 → <b style="color:#ff7fa8">-기는커녕</b>：쉬기는커녕<br>
        名词有收音 → <b style="color:#2db89b">은커녕</b>：돈은커녕<br>
        名词无收音 → <b style="color:#6b7ff0">는커녕</b>：커피는커녕<br>
        后半句必须是反预期或否定式
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        칭찬은커녕 혼만 났어요.（别说表扬还挨骂）<br>
        쉬기는커녕 밥도 못 먹었어요.（别说休息连饭都没吃）<br>
        돈은커녕 시간도 없어요.（别说钱连时间都没）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">쉬는커녕</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">쉬기는커녕（动词要 -기）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">칭찬은커녕 표창도 받았어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">后半句必须反预期，不能是累加</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第4课：-을/ㄹ뿐더러 ────────────────────────────────
  {
    id: 'card-p23-l04',
    partNumber: 23,
    lessonNumber: 4,
    title: '-을/ㄹ뿐더러',
    whatItDoes: '不仅……而且……（书面累加）',
    whatItDoesBody: '和 -는 데다가 意思相似的书面表达。\n"不仅 A，而且 B"，A 和 B 都是同类特征的累加。\n更常用于书面语、正式演讲、TOPIK 写作。',
    structureNote: '结构：\n· 动词/形容词无收音词干 + ㄹ뿐더러\n· 动词/形容词有收音词干 + 을뿐더러\n· 过去 + -았/었을뿐더러\n· 名词 + 일뿐더러\n\n뿐더러 是"뿐"+ "더러"的合成，写作时不空格。',
    rulesNote: '和 -는 데다가 差别：\n· -는 데다가：口语/日常都可，累加语气\n· -을뿐더러：偏书面/正式，语气较庄重\n\n两者可以互换，选哪个看场合。TOPIK 写作、公司报告优先 -을뿐더러。',
    structures: [
      {
        ko: '이 제품은 품질이 좋을뿐더러 가격도 합리적입니다',
        zh: '这产品不仅质量好，价格也合理。',
        tokens: [
          { text: '이 제품은', role: 'subject' },
          { text: '품질이', role: 'subject' },
          { text: '좋을뿐더러', role: 'verb' },
          { text: '가격도', role: 'subject' },
          { text: '합리적입니다', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 성실할뿐더러 능력도 뛰어납니다',
        zh: '敏秀不仅诚实，能力也出众。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '성실할뿐더러', role: 'verb' },
          { text: '능력도', role: 'subject' },
          { text: '뛰어납니다', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 잘할뿐더러 문화에 대한 이해도 깊어요',
        zh: '不仅韩语说得好，对文化的理解也很深。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '잘할뿐더러', role: 'verb' },
          { text: '문화에 대한 이해도', role: 'subject' },
          { text: '깊어요', role: 'verb' },
        ],
      },
      {
        ko: '이 지역은 관광지일뿐더러 문화 유산도 많습니다',
        zh: '这个地区不仅是旅游地，文化遗产也多。',
        tokens: [
          { text: '이 지역은', role: 'subject' },
          { text: '관광지일뿐더러', role: 'verb' },
          { text: '문화 유산도', role: 'subject' },
          { text: '많습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ뿐더러', examples: '좋다→좋을뿐더러 / 하다→할뿐더러 / 예쁘다→예쁠뿐더러' },
      { type: 'rule', text: '有收音词干 + 을뿐더러', examples: '먹다→먹을뿐더러 / 좋다→좋을뿐더러（ㅎ 前后无关）' },
      { type: 'rule', text: '过去 → -았/었을뿐더러', examples: '갔을뿐더러 / 했을뿐더러' },
      { type: 'rule', text: '名词 + 일뿐더러', examples: '학생일뿐더러 / 전문가일뿐더러' },
      { type: 'usage', text: '书面/正式场合累加同类特征', examples: 'TOPIK 写作 / 公司报告 / 演讲' },
      { type: 'compare', text: '和 -는 데다가 差别：书面语感 vs 口语通用', examples: '좋을뿐더러（书面）≈ 좋은 데다가（日常）' },
      { type: 'note', text: '前后句同倾向（都正面或都负面）', examples: '좋을뿐더러 합리적이다（都正面）/ 어려울뿐더러 복잡하다（都负面）' },
      { type: 'rule', text: 'ㄹ词干不规则：词干以 ㄹ 结尾时直接 +뿐더러，不再加 을', examples: '살다→살뿐더러 / 만들다→만들뿐더러（不是 살을뿐더러 ✗）' },
      { type: 'compare', text: '和长得几乎一样的 -을 뿐(만) 아니라（本章 L07 详学）区别：뿐더러 是融合词尾、不空格；뿐 아니라 要空格且口语书面都通用', examples: '좋을뿐더러（一个词，偏书面）/ 좋을 뿐 아니라（短语，通用）' },
      { type: 'example', text: '품질이 좋을뿐더러 가격도 합리적입니다 / 성실할뿐더러 능력도 있어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 제품은', role: 'subject' },
          { text: '품질이', role: 'subject' },
          { text: '좋을뿐더러', role: 'verb' },
          { text: '가격도', role: 'subject' },
          { text: '합리적입니다', role: 'verb' },
        ],
        zh: '这产品不仅质量好，价格也合理。',
        swapWords: ['좋을뿐더러', '뛰어날뿐더러', '우수할뿐더러'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '성실할뿐더러', role: 'verb' },
          { text: '능력도', role: 'subject' },
          { text: '뛰어납니다', role: 'verb' },
        ],
        zh: '敏秀不仅诚实，能力也出众。',
        swapWords: ['성실할뿐더러', '똑똑할뿐더러', '친절할뿐더러'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '잘할뿐더러', role: 'verb' },
          { text: '문화 이해도', role: 'subject' },
          { text: '깊어요', role: 'verb' },
        ],
        zh: '不仅韩语好，文化理解也深。',
        swapWords: ['잘할뿐더러', '유창할뿐더러', '능숙할뿐더러'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 지역은', role: 'subject' },
          { text: '관광지일뿐더러', role: 'verb' },
          { text: '문화 유산도', role: 'subject' },
          { text: '많습니다', role: 'verb' },
        ],
        zh: '这地区不仅是旅游地，文化遗产也多。',
        swapWords: ['관광지일뿐더러', '명소일뿐더러', '휴양지일뿐더러'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📢', context: '产品广告', ko: '이 제품은 품질이 좋을뿐더러 가격도 합리적입니다.', zh: '此产品质量好，价格也合理。' },
      { icon: '👤', context: '人物评价', ko: '민수 씨는 성실할뿐더러 능력도 뛰어납니다.', zh: '敏秀诚实，能力出众。' },
      { icon: '🇰🇷', context: '文化评价', ko: '한국어를 잘할뿐더러 문화 이해도 깊어요.', zh: '韩语好，文化理解也深。' },
      { icon: '🏛️', context: '地区介绍', ko: '이 지역은 관광지일뿐더러 문화 유산도 많습니다.', zh: '此地既是旅游胜地也文化遗产丰富。' },
      { icon: '📚', context: '课程推荐', ko: '이 강의는 유익할뿐더러 재미도 있어요.', zh: '这课程既有益又有趣。' },
      { icon: '☕', context: '咖啡馆推荐', ko: '이 카페는 조용할뿐더러 분위기도 좋아요.', zh: '这咖啡店安静，气氛也好。' },
    ],
    mistakes: [
      { wrong: '좋는뿐더러', correct: '좋을뿐더러', note: '뿐더러 前必须是 -을/ㄹ 冠形，不用 -는。좋다 有 ㅎ 收音 → 좋을뿐더러。' },
      { wrong: '학생뿐더러', correct: '학생일뿐더러', note: '名词 + 이다 变形 + 을뿐더러 → 名词 + 일뿐더러。' },
      { wrong: '좋을 뿐더러', correct: '좋을뿐더러', note: '뿐더러 是复合词尾，不空格。' },
      { wrong: '좋을뿐더러 비싸요', correct: '좋을뿐더러 합리적입니다 / 좋지만 비싸요', note: '-을뿐더러 前后必须同倾向。矛盾特征用 -지만。' },
    ],
    quickTable: {
      title: '-을뿐더러 变形速查',
      body: '按词性和时态选正确形态。',
      headers: ['原形', '类型', '接续', '完整形'],
      rows: [
        ['좋다', '形容词有收音ㅎ', { ko: '좋+을뿐더러', zh: '-을뿐더러' }, { ko: '좋을뿐더러', zh: '不仅好' }],
        ['성실하다', '形容词하다类', { ko: '성실하+ㄹ뿐더러', zh: '-ㄹ뿐더러' }, { ko: '성실할뿐더러', zh: '不仅诚实' }],
        ['잘하다', '动词하다类', { ko: '잘하+ㄹ뿐더러', zh: '-ㄹ뿐더러' }, { ko: '잘할뿐더러', zh: '不仅擅长' }],
        ['먹다', '动词有收音', { ko: '먹+을뿐더러', zh: '-을뿐더러' }, { ko: '먹을뿐더러', zh: '不仅吃' }],
        ['갔다', '过去', { ko: '갔+을뿐더러', zh: '过去+을뿐더러' }, { ko: '갔을뿐더러', zh: '不仅去了' }],
        ['학생이다', '名词有收音', { ko: '학생+일뿐더러', zh: '名词+일뿐더러' }, { ko: '학생일뿐더러', zh: '不仅是学生' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ뿐더러 变形练习',
      body: '根据词性选出正确形态。',
      questions: [
        {
          prompt: '"这产品质量好价格也合理" → 이 제품은 품질이 ___ 가격도 합리적입니다.',
          options: ['좋는뿐더러', '좋을뿐더러', '좋았을뿐더러', '좋아뿐더러'],
          answer: 1,
          explanation: '좋다 现在时 + ㄹ/을뿐더러 → 좋을뿐더러（ㅎ 前用 을）。',
        },
        {
          prompt: '"敏秀诚实能力也出众" → 민수 씨는 ___ 능력도 뛰어납니다.',
          options: ['성실하뿐더러', '성실는뿐더러', '성실할뿐더러', '성실을뿐더러'],
          answer: 2,
          explanation: '성실하다 是 하다 类形容词，词干 성실하 无收音 → ㄹ뿐더러 → 성실할뿐더러。',
        },
        {
          prompt: '"这地区不仅是旅游地文化遗产也多" → 이 지역은 ___ 문화 유산도 많습니다.',
          options: ['관광지뿐더러', '관광지는뿐더러', '관광지일뿐더러', '관광지을뿐더러'],
          answer: 2,
          explanation: '名词 + 이다 + ㄹ뿐더러 → 名词 + 일뿐더러。관광지 + 일뿐더러。',
        },
        {
          prompt: '关于 -을뿐더러 和 -는 데다가，哪句最准确？',
          options: [
            '两者语法完全不同',
            '意思相近，前者书面正式，后者日常通用',
            '前者只用形容词，后者只用动词',
            '前者用于过去，后者用于现在',
          ],
          answer: 1,
          explanation: '两者都表达"不仅……而且……"的累加。-을뿐더러 偏书面/正式（TOPIK 写作、演讲）；-는 데다가 日常口语都用。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l02'],
    step0Html: `<div class="card-title">-을/ㄹ뿐더러</div>
<div class="card-body">"不仅……而且……"（书面累加）—— TOPIK 写作、正式场合首选。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">口语 vs 书面累加</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 데다가（口语通用）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이 제품은 좋은 데다가 저렴해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这产品好，还便宜。（日常）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을뿐더러（书面正式）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이 제품은 좋을뿐더러 합리적입니다.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">此产品好，价格也合理。（正式）</div>
    </div>
  </div>
</div>
<div class="reminder-box">意思几乎相同，但 -을뿐더러 更适合 TOPIK 写作、公文、演讲。日常对话优先 -는 데다가。</div>`,
    compareHtml: `<div class="card-title">-을뿐더러 vs -는 데다가</div>
<div class="card-body">两者都表达"不仅……而且……"，语域不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 데다가 → 日常口语</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">对话、聊天、微信</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">예쁜 데다가 저렴해요.</span><span style="font-size:16px;color:#5a4640">又漂亮又便宜。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을뿐더러 → 书面正式</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">TOPIK 写作、报告、演讲</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">품질이 좋을뿐더러 합리적입니다.</span><span style="font-size:16px;color:#5a4640">质量好且价格合理。</span></div>
  </div>
</div>
<div class="reminder-box">TOPIK 5-6 级写作用 -을뿐더러 显功底；日常聊天用 -는 데다가 更自然。</div>`,
    compareLabel: '-을뿐더러 vs -는 데다가',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 4 课</div>
    <div class="ov-hero-title">-을/ㄹ뿐더러</div>
    <div class="ov-hero-sub">"不仅……而且……" · 书面正式累加</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音词干 → <b style="color:#ff7fa8">ㄹ뿐더러</b>：할뿐더러 · 성실할뿐더러<br>
        有收音词干 → <b style="color:#2db89b">을뿐더러</b>：먹을뿐더러 · 좋을뿐더러<br>
        过去 → <b style="color:#6b7ff0">-았/었을뿐더러</b><br>
        名词 → <b style="color:#c89020">일뿐더러</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        품질이 좋을뿐더러 가격도 합리적입니다.<br>
        성실할뿐더러 능력도 뛰어납니다.<br>
        관광지일뿐더러 문화 유산도 많습니다.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋는뿐더러</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋을뿐더러（无收音+ㄹ / 有收音+을）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생뿐더러</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일뿐더러（名词+일）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第5课：-거니와 ───────────────────────────────────────
  {
    id: 'card-p23-l05',
    partNumber: 23,
    lessonNumber: 5,
    title: '-거니와',
    whatItDoes: '不仅……也……（书面并列/累加）',
    whatItDoesBody: '书面累加连接词，"不仅 A 也 B"、"既是 A 也是 B"。\n后半句常配 -도 强调"也"。\n偏文语，TOPIK 阅读、新闻报道中常见。',
    structureNote: '结构：\n· 动词/形容词词干 + 거니와\n· 过去 + -았/었거니와\n· 名词 + 이거니와 / 거니와\n\n不看收音，直接接词干。名词按有无收音选 이거니와 / 거니와。',
    rulesNote: '和 -을뿐더러 差别：\n· -을뿐더러：明确"不仅……而且"的累加\n· -거니와：既是 A 也是 B 的并列，语感更平衡\n\n两者都偏书面，但 -거니와 更接近"且"的正式感，-을뿐더러 更接近"而且"。',
    structures: [
      {
        ko: '이 책은 재미있거니와 유익하기도 하다',
        zh: '这书不仅有趣，也很有益。',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '재미있거니와', role: 'verb' },
          { text: '유익하기도 하다', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 성실하거니와 책임감도 강합니다',
        zh: '敏秀既踏实，责任感也强。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '성실하거니와', role: 'verb' },
          { text: '책임감도', role: 'subject' },
          { text: '강합니다', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 날씨도 좋거니와 바람도 시원합니다',
        zh: '今天不仅天气好，风也凉爽。',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '날씨도', role: 'subject' },
          { text: '좋거니와', role: 'verb' },
          { text: '바람도', role: 'subject' },
          { text: '시원합니다', role: 'verb' },
        ],
      },
      {
        ko: '그는 학자이거니와 훌륭한 교육자이기도 합니다',
        zh: '他是学者，也是出色的教育家。',
        tokens: [
          { text: '그는', role: 'subject' },
          { text: '학자이거니와', role: 'verb' },
          { text: '훌륭한 교육자이기도 합니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 거니와', examples: '있다→있거니와 / 좋다→좋거니와 / 하다→하거니와' },
      { type: 'rule', text: '过去 → -았/었거니와', examples: '갔거니와 / 했거니와' },
      { type: 'rule', text: '名词有收音 + 이거니와', examples: '학자이거니와 / 학생이거니와' },
      { type: 'rule', text: '名词无收音 + 거니와', examples: '가수거니와 / 배우거니와' },
      { type: 'usage', text: '书面/文语累加，前后同倾向', examples: '재미있거니와 유익하다 / 성실하거니와 책임감도 강하다' },
      { type: 'usage', text: '后半句常配 -도 强调"也"', examples: '좋거니와 바람도 시원합니다 / 있거니와 유익하기도 하다' },
      { type: 'compare', text: '和 -을뿐더러 差别：더러 更强调"进一步加"，거니와 更"两者并列"', examples: '재미있거니와 유익하거든요（有趣而且有益）' },
      { type: 'note', text: '语体禁忌：仅用于书面/正式语（TOPIK 阅读、报道、评论、演讲）。日常口语几乎不说，用出来会显得书生气；同样的"不仅…也"口语里用 -고 或 -은/는 데다가。' },
      { type: 'note', text: '语义细腻处：前项通常是"已知/理所当然"的事，后项再补一件相关的。国立国语院释义为"承认前句事实的同时，接着说相关的另一事"——所以两边不只是并列，更是"A 本就如此，B 也……"。' },
      { type: 'example', text: '재미있거니와 유익하다 / 성실하거니와 책임감도 강해요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '재미있거니와', role: 'verb' },
          { text: '유익하기도 하다', role: 'verb' },
        ],
        zh: '这书不仅有趣也很有益。',
        swapWords: ['재미있거니와', '흥미롭거니와', '유쾌하거니와'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '성실하거니와', role: 'verb' },
          { text: '책임감도', role: 'subject' },
          { text: '강합니다', role: 'verb' },
        ],
        zh: '敏秀踏实，责任感也强。',
        swapWords: ['성실하거니와', '근면하거니와', '진지하거니와'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '날씨도', role: 'subject' },
          { text: '좋거니와', role: 'verb' },
          { text: '바람도', role: 'subject' },
          { text: '시원합니다', role: 'verb' },
        ],
        zh: '今天天气好风也凉爽。',
        swapWords: ['좋거니와', '맑거니와', '따뜻하거니와'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그는', role: 'subject' },
          { text: '학자이거니와', role: 'verb' },
          { text: '훌륭한 교육자이기도 합니다', role: 'verb' },
        ],
        zh: '他既是学者也是教育家。',
        swapWords: ['학자이거니와', '연구자이거니와', '전문가이거니와'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '书评', ko: '이 책은 재미있거니와 유익하기도 합니다.', zh: '此书既有趣又有益。' },
      { icon: '👨‍💼', context: '人物评价', ko: '민수 씨는 성실하거니와 책임감도 강합니다.', zh: '敏秀踏实责任心也强。' },
      { icon: '🌤️', context: '天气描述', ko: '오늘은 날씨도 좋거니와 바람도 시원합니다.', zh: '今天天气好风也凉爽。' },
      { icon: '🎓', context: '学者介绍', ko: '그는 학자이거니와 훌륭한 교육자이기도 합니다.', zh: '他既是学者也是教育家。' },
      { icon: '🏢', context: '公司介绍', ko: '이 회사는 규모도 크거니와 복지도 좋습니다.', zh: '此公司规模大福利也好。' },
      { icon: '🎨', context: '作品评价', ko: '이 작품은 아름답거니와 의미도 깊습니다.', zh: '这作品美丽而意义也深。' },
    ],
    mistakes: [
      { wrong: '재미있는거니와', correct: '재미있거니와', note: '거니와 直接接词干，不需要冠形。재미있 + 거니와 = 재미있거니와。' },
      { wrong: '학자거니와', correct: '학자이거니와', note: '名词 + 이다 → 이거니와。학자 + 이 + 거니와 = 학자이거니와。' },
      { wrong: '좋거니와 나쁘다', correct: '좋거니와 좋기도 하다 / 좋지만 나쁘다', note: '前后必须同倾向。矛盾用 -지만。' },
      { wrong: '먹었은거니와', correct: '먹었거니와', note: '过去 -았/었 后直接接 거니와，不加冠形。' },
    ],
    quickTable: {
      title: '-거니와 变形速查',
      body: '不看收音，直接接词干。',
      headers: ['原形', '类型', '接续', '例句'],
      rows: [
        ['좋다', '形容词', { ko: '좋+거니와', zh: '直接接' }, { ko: '좋거니와', zh: '好，且' }],
        ['재미있다', '形容词', { ko: '재미있+거니와', zh: '直接接' }, { ko: '재미있거니와', zh: '有趣，且' }],
        ['성실하다', '形容词하다', { ko: '성실하+거니와', zh: '直接接' }, { ko: '성실하거니와', zh: '踏实，且' }],
        ['가다', '动词', { ko: '가+거니와', zh: '直接接' }, { ko: '가거니와', zh: '去，且' }],
        ['갔다', '过去', { ko: '갔+거니와', zh: '过去+거니와' }, { ko: '갔거니와', zh: '去了，且' }],
        ['학자이다', '名词有收音', { ko: '학자+이거니와', zh: '名词+이거니와' }, { ko: '학자이거니와', zh: '是学者，且' }],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-거니와 变形练习',
      body: '选出正确接法。',
      questions: [
        {
          prompt: '"这书有趣也有益" → 이 책은 ___ 유익하기도 합니다.',
          options: ['재미있는거니와', '재미있을거니와', '재미있거니와', '재미있어거니와'],
          answer: 2,
          explanation: '거니와 直接接词干，不需要冠形。재미있 + 거니와 = 재미있거니와。',
        },
        {
          prompt: '"敏秀踏实责任感也强" → 민수 씨는 ___ 책임감도 강합니다.',
          options: ['성실할거니와', '성실하거니와', '성실는거니와', '성실을거니와'],
          answer: 1,
          explanation: '성실하다 词干 성실하 + 거니와 = 성실하거니와。',
        },
        {
          prompt: '"他既是学者也是教育家" → 그는 ___ 훌륭한 교육자이기도 합니다.',
          options: ['학자거니와', '학자이거니와', '학자였거니와', '학자를거니와'],
          answer: 1,
          explanation: '名词 + 이다 词干 이 + 거니와 → 名词 + 이거니와。학자이거니와。',
        },
        {
          prompt: '关于 -거니와 的用法特征，哪句最准确？',
          options: [
            '主要用于口语',
            '偏书面/文语，前后同倾向的并列累加',
            '只能接名词',
            '意思等同于 -지만',
          ],
          answer: 1,
          explanation: '-거니와 是书面/文语连接词，表达"不仅 A 也 B"的并列累加，前后倾向必须一致。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l02', 'card-p23-l04'],
    step0Html: `<div class="card-title">-거니와</div>
<div class="card-body">"不仅……也……"（书面并列累加）—— TOPIK 阅读、正式文章常见。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">累加三姐妹</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 데다가（日常）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">재미있는 데다가 유익해요.</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-을뿐더러（书面）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">재미있을뿐더러 유익합니다.</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-거니와（文语）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">재미있거니와 유익하기도 하다.</div>
    </div>
  </div>
</div>
<div class="reminder-box">三个语法都是"不仅 A 也 B"，但语域从口语到文语渐进。TOPIK 5-6 级写作用后两个显功底。</div>`,
    compareHtml: `<div class="card-title">-거니와 vs -을뿐더러</div>
<div class="card-body">两个都是书面累加，微妙差别在语感平衡。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을뿐더러 → 累加加强</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"不仅 A，而且 B"（B 比 A 更进一步）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋을뿐더러 저렴합니다.</span><span style="font-size:16px;color:#5a4640">不仅好，还便宜。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-거니와 → 平行并列</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"既是 A 也是 B"（A 和 B 平行）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋거니와 저렴하기도 합니다.</span><span style="font-size:16px;color:#5a4640">既好又便宜。</span></div>
  </div>
</div>
<div class="reminder-box">意思相近，可互换。语感：더러 更"上加一层"，거니와 更"两者并陈"。</div>`,
    compareLabel: '-거니와 vs -을뿐더러',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 5 课</div>
    <div class="ov-hero-title">-거니와</div>
    <div class="ov-hero-sub">"不仅……也……" · 书面并列累加</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词词干 + <b style="color:#ff7fa8">거니와</b>：좋거니와 · 하거니와<br>
        过去 → <b style="color:#2db89b">-았/었거니와</b>：갔거니와<br>
        名词有收音 → <b style="color:#6b7ff0">이거니와</b>：학자이거니와<br>
        不看收音，直接接词干。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        이 책은 재미있거니와 유익하기도 하다.<br>
        민수 씨는 성실하거니와 책임감도 강합니다.<br>
        그는 학자이거니와 훌륭한 교육자이기도 합니다.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">재미있는거니와</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">재미있거니와（直接接词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋거니와 나쁘다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">前后必须同倾向</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第6课：-는 한편 ────────────────────────────────────
  {
    id: 'card-p23-l06',
    partNumber: 23,
    lessonNumber: 6,
    title: '-는 한편',
    whatItDoes: '一方面……另一方面……',
    whatItDoesBody: '连接同一时段发生的两件平行的事情或情况。\n"一方面 A，另一方面 B"，两件事往往是同一主体的两种行动或状态。\n用于描述复杂局面、多面性、平行进行的活动。',
    structureNote: '结构：\n· 动词 + 는 한편（现在）\n· 动词过去 + 은/ㄴ 한편\n· 形容词 + 은/ㄴ 한편\n· 名词 + 인 한편\n\n한편 本身是名词"一面/一方"，加冠形形成连接语。',
    rulesNote: '和 -는 반면에 差别：\n· -는 반면에：强调"对立"（A ↔ B）\n· -는 한편：强调"平行"（A + B 同时存在）\n\n典型套路：陈述某主体的一方面（A）+ 同时另一方面（B）。',
    structures: [
      {
        ko: '민수 씨는 일하는 한편 공부도 계속하고 있어요',
        zh: '敏秀一方面工作，另一方面还在继续学习。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '일하는 한편', role: 'verb' },
          { text: '공부도', role: 'object' },
          { text: '계속하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '이 회사는 매출이 증가하는 한편 직원 복지도 개선하고 있습니다',
        zh: '这公司一方面业绩上升，同时也在改善员工福利。',
        tokens: [
          { text: '이 회사는', role: 'subject' },
          { text: '매출이', role: 'subject' },
          { text: '증가하는 한편', role: 'verb' },
          { text: '직원 복지도', role: 'object' },
          { text: '개선하고 있습니다', role: 'verb' },
        ],
      },
      {
        ko: '한국은 전통을 지키는 한편 새로운 문화도 받아들여요',
        zh: '韩国一方面守护传统，另一方面也接受新文化。',
        tokens: [
          { text: '한국은', role: 'subject' },
          { text: '전통을', role: 'object' },
          { text: '지키는 한편', role: 'verb' },
          { text: '새로운 문화도', role: 'object' },
          { text: '받아들여요', role: 'verb' },
        ],
      },
      {
        ko: '기쁜 한편 서운한 마음도 들어요',
        zh: '一方面高兴，另一方面又有点失落。',
        tokens: [
          { text: '기쁜 한편', role: 'verb' },
          { text: '서운한 마음도', role: 'subject' },
          { text: '들어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在 + 는 한편', examples: '일하다→일하는 한편 / 지키다→지키는 한편' },
      { type: 'rule', text: '动词过去 + 은/ㄴ 한편', examples: '간 한편 / 먹은 한편' },
      { type: 'rule', text: '形容词 + 은/ㄴ 한편', examples: '기쁘다→기쁜 한편 / 좋다→좋은 한편' },
      { type: 'rule', text: '名词 + 인 한편', examples: '학생인 한편 / 아버지인 한편' },
      { type: 'usage', text: '描述同一主体的两个平行方面或活动', examples: '일하는 한편 공부하다 / 전통을 지키는 한편 새 문화 받아들이다' },
      { type: 'compare', text: '和 -는 반면에 差别：平行 vs 对立', examples: '지키는 한편 받아들여요（平行）/ 잘하는 반면 못해요（对立）' },
      { type: 'note', text: '负迁移陷阱：中文"一方面…另一方面…"既能表对立也能表平行，给不出选词信号，所以别照中文直译挑。判断法：后半句是否推翻/否定前半句？是→用 -는 반면에（对立）；只是补充同时存在的另一件事→用 -는 한편（平行）。' },
      { type: 'note', text: '文章分析、新闻报道、商务表达中常见', examples: '매출 증가 + 복지 개선 / 전통 + 현대' },
      { type: 'note', text: '别和句首独立的 한편, 混淆：新闻里常见句子开头单独一个"한편,"（另一方面/再者），那是承接上文换话题的副词用法，不接冠形词尾，和本课"冠形+한편"的连接用法不是一回事（后续阅读会大量遇到）。' },
      { type: 'example', text: '일하는 한편 공부도 해요 / 매출이 증가하는 한편 복지도 개선하고 있어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '일하는 한편', role: 'verb' },
          { text: '공부도', role: 'object' },
          { text: '계속하고 있어요', role: 'verb' },
        ],
        zh: '敏秀一方面工作一方面继续学习。',
        swapWords: ['일하는 한편', '근무하는 한편', '회사 다니는 한편'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 회사는', role: 'subject' },
          { text: '매출이', role: 'subject' },
          { text: '증가하는 한편', role: 'verb' },
          { text: '복지도', role: 'object' },
          { text: '개선하고 있어요', role: 'verb' },
        ],
        zh: '业绩上升同时也在改善福利。',
        swapWords: ['증가하는 한편', '늘어나는 한편', '성장하는 한편'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국은', role: 'subject' },
          { text: '전통을', role: 'object' },
          { text: '지키는 한편', role: 'verb' },
          { text: '새로운 문화도', role: 'object' },
          { text: '받아들여요', role: 'verb' },
        ],
        zh: '守护传统同时也接受新文化。',
        swapWords: ['지키는 한편', '유지하는 한편', '보존하는 한편'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '기쁜 한편', role: 'verb' },
          { text: '서운한 마음도', role: 'subject' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '一方面高兴一方面也失落。',
        swapWords: ['기쁜 한편', '즐거운 한편', '뿌듯한 한편'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '💼', context: '边工作边学', ko: '민수 씨는 일하는 한편 대학원도 다녀요.', zh: '敏秀一边工作一边读研。' },
      { icon: '📊', context: '公司战略', ko: '매출이 증가하는 한편 복지도 개선하고 있습니다.', zh: '业绩增长同时改善福利。' },
      { icon: '🏛️', context: '文化并存', ko: '한국은 전통을 지키는 한편 새로운 문화도 받아들여요.', zh: '守传统也接新文化。' },
      { icon: '💭', context: '复杂情感', ko: '기쁜 한편 서운한 마음도 들어요.', zh: '既高兴又失落。' },
      { icon: '📚', context: '学生兼职', ko: '학생인 한편 아르바이트도 하고 있어요.', zh: '一边是学生一边打工。' },
      { icon: '🎨', context: '艺术家多面', ko: '그는 화가인 한편 뛰어난 시인이기도 합니다.', zh: '他既是画家也是诗人。' },
    ],
    mistakes: [
      { wrong: '일하고 한편', correct: '일하는 한편', note: '한편 前必须是冠形形（-는），不用 -고。' },
      { wrong: '학생 한편', correct: '학생인 한편', note: '名词 + 이다 + 冠形 → 名词 + 인 한편。' },
      { wrong: '지키는 한편 지키다', correct: '지키는 한편 받아들여요', note: '한편 前后必须是不同方面/活动。两边同一件事失去"两方面"含义。' },
      { wrong: '기쁘는 한편', correct: '기쁜 한편', note: '形容词用 -은/ㄴ 冠形。기쁘다 无收音 → 기쁜 한편。' },
    ],
    quickTable: {
      title: '-는/은/ㄴ/인 한편 冠形选择',
      body: '按词性和时态选择。',
      headers: ['词性', '时态', '接续', '例句'],
      rows: [
        [{ ko: '动词', zh: '现在' }, { ko: '-는', zh: '进行/习惯' }, { ko: '일하는 한편', zh: '一边工作' }, { ko: '일하는 한편 공부해요', zh: '边工作边学习' }],
        [{ ko: '动词', zh: '过去' }, { ko: '-은/ㄴ', zh: '已完成' }, { ko: '간 한편', zh: '一方面去了' }, { ko: '어제 간 한편 오늘은…', zh: '昨天去了今天…' }],
        [{ ko: '形容词', zh: '现在' }, { ko: '-은/ㄴ', zh: '状态' }, { ko: '기쁜 한편', zh: '一方面高兴' }, { ko: '기쁜 한편 서운해요', zh: '既高兴又失落' }],
        [{ ko: '名词+이다', zh: '现在' }, { ko: '인', zh: '身份' }, { ko: '학생인 한편', zh: '一方面是学生' }, { ko: '학생인 한편 알바생이에요', zh: '既是学生也是兼职' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-는/은/ㄴ 한편 冠形练习',
      body: '根据词性选出正确接法。',
      questions: [
        {
          prompt: '"敏秀一边工作一边学习" → 민수 씨는 ___ 공부도 해요.',
          options: ['일하고 한편', '일하는 한편', '일한 한편', '일할 한편'],
          answer: 1,
          explanation: '动词现在时/习惯 → -는 한편。일하다 → 일하는 한편。',
        },
        {
          prompt: '"一方面高兴一方面失落" → ___ 서운한 마음도 들어요.',
          options: ['기쁘는 한편', '기쁜 한편', '기뻐 한편', '기쁠 한편'],
          answer: 1,
          explanation: '기쁘다 是形容词，无收音 → -ㄴ 한편 → 기쁜 한편。',
        },
        {
          prompt: '"一方面是学生一方面打工" → ___ 아르바이트도 해요.',
          options: ['학생 한편', '학생는 한편', '학생인 한편', '학생을 한편'],
          answer: 2,
          explanation: '名词 + 이다 + 冠形 → 名词 + 인 한편。학생인 한편。',
        },
        {
          prompt: '关于 -는 한편 和 -는 반면에，哪句最准确？',
          options: [
            '两者意思完全相同',
            '前者强调"平行并存"，后者强调"对立特征"',
            '前者用未来，后者用过去',
            '前者只用书面语',
          ],
          answer: 1,
          explanation: '-는 한편 强调同一主体的两个平行方面或活动；-는 반면에 强调两个对立特征。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l01'],
    step0Html: `<div class="card-title">-는/은/ㄴ 한편</div>
<div class="card-body">"一方面……另一方面……" —— 描述同一主体的两个平行方面。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">平行 vs 对立</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는 한편（平行）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일하는 한편 공부도 해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一边工作一边学习。（同时进行）</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-는 반면에（对立）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">일은 잘하는 반면 공부는 못해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">工作好但学习差。（对立）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-는 한편 常用于描述人物或组织的多面性、复杂局面。</div>`,
    compareHtml: `<div class="card-title">-는 한편 vs -는 반면에</div>
<div class="card-body">两个都涉及"两面"，但方向完全不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 한편 → 平行并存</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">A + B 同时进行 / 同时存在</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">전통을 지키는 한편 새 문화도 받아들여요.</span><span style="font-size:16px;color:#5a4640">守传统同时接新文化。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는 반면에 → 对立特征</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">A ↔ B 对立</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어는 문법이 어려운 반면 발음은 쉬워요.</span><span style="font-size:16px;color:#5a4640">语法难相反发音简单。</span></div>
  </div>
</div>
<div class="reminder-box">同时并行用 한편；对立特征用 반면에。</div>`,
    compareLabel: '-는 한편 vs -는 반면에',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 6 课</div>
    <div class="ov-hero-title">-는/은/ㄴ 한편</div>
    <div class="ov-hero-sub">"一方面……另一方面……" · 平行并存</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词现在 → <b style="color:#ff7fa8">-는 한편</b><br>
        形容词/动词过去 → <b style="color:#2db89b">-은/ㄴ 한편</b><br>
        名词 → <b style="color:#6b7ff0">인 한편</b>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        일하는 한편 공부도 해요.（边工作边学习）<br>
        전통을 지키는 한편 새 문화도 받아들여요.（守传统接新文化）<br>
        기쁜 한편 서운한 마음도 들어요.（既高兴又失落）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">일하고 한편</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">일하는 한편（要用冠形）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생 한편</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생인 한편（名词+인）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第7课：-고도 ─────────────────────────────────────────
  {
    id: 'card-p23-l07',
    partNumber: 23,
    lessonNumber: 7,
    title: '-고도',
    whatItDoes: '虽然……却/但……',
    whatItDoesBody: '连接前后矛盾/意外的事件："做了 A 却 B"、"是 A 却 B"。\n前后事件在同一主体上，形成"意外反差"。\n和 -지만 类似但更强调"事件已经发生却结果意外"。',
    structureNote: '结构：动词/形容词词干 + 고도。\n不看收音，所有词类同一接法。\n形容词较少用，最常和动词搭配。',
    rulesNote: '典型套路：\n· 前半：动作/状态已完成\n· 后半：出人意料的反面结果\n\n和 -고 差别：\n· -고：并列/顺承"做了A然后B"\n· -고도：意外反差"做了A却B"\n\n和 -지만 差别：语气更强、更强调"事件+反差"。',
    structures: [
      {
        ko: '그 사람은 부자이고도 낡은 옷을 입어요',
        zh: '那个人虽然是富人却穿旧衣服。',
        tokens: [
          { text: '그 사람은', role: 'subject' },
          { text: '부자이고도', role: 'verb' },
          { text: '낡은 옷을', role: 'object' },
          { text: '입어요', role: 'verb' },
        ],
      },
      {
        ko: '많이 먹고도 배가 안 불러요',
        zh: '吃了很多却还不饱。',
        tokens: [
          { text: '많이', role: 'plain' },
          { text: '먹고도', role: 'verb' },
          { text: '배가', role: 'subject' },
          { text: '안 불러요', role: 'verb' },
        ],
      },
      {
        ko: '알고도 모른 척했어요',
        zh: '明明知道却装作不知道。',
        tokens: [
          { text: '알고도', role: 'verb' },
          { text: '모른 척했어요', role: 'verb' },
        ],
      },
      {
        ko: '보고도 못 알아봤어요',
        zh: '看见了却没认出来。',
        tokens: [
          { text: '보고도', role: 'verb' },
          { text: '못 알아봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 고도', examples: '먹다→먹고도 / 알다→알고도 / 좋다→좋고도' },
      { type: 'rule', text: '名词 + 이고도 / 고도', examples: '학생이고도 / 부자이고도 / 가수고도' },
      { type: 'usage', text: '前后是同一主体的意外反差事件', examples: '먹고도 배 안 부르다 / 알고도 모른 척하다 / 보고도 못 알아보다' },
      { type: 'usage', text: '常用固定搭配', examples: '보고도 (못 알아보다) / 알고도 (모른 척하다) / 자고도 (피곤하다)' },
      { type: 'compare', text: '和 -지만 差别：语气更强、聚焦"事件+意外结果"', examples: '먹었지만 배고파요（转折）/ 먹고도 배가 고파요（意外反差）' },
      { type: 'note', text: '还有第二个意思——"既…又…/而且（更进一层）"：前后不是矛盾而是两个相容的（多为褒义）特征叠加时，-고도 不译"却"而译"又/而且"。判断法：后半句推翻前半→译"却"；后半句是加分项→译"又"。', examples: '크고도 넓다（又大又宽）/ 싸고도 좋다（既便宜又好）/ 곱고도 아름답다（既清秀又美丽）' },
      { type: 'note', text: '前后主语必须一致', examples: '내가 먹고도 내가 배고파요 ✓ / 내가 먹고도 네가 배고파요 ✗' },
      { type: 'example', text: '알고도 모른 척했어요 / 보고도 못 알아봤어요 / 먹고도 배 안 불러요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '많이', role: 'plain' },
          { text: '먹고도', role: 'verb' },
          { text: '배가', role: 'subject' },
          { text: '안 불러요', role: 'verb' },
        ],
        zh: '吃了很多却还不饱。',
        swapWords: ['먹고도', '먹었지만', '먹었는데도'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '알고도', role: 'verb' },
          { text: '모른 척했어요', role: 'verb' },
        ],
        zh: '明明知道却装作不知道。',
        swapWords: ['알고도', '보고도', '듣고도'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '보고도', role: 'verb' },
          { text: '못 알아봤어요', role: 'verb' },
        ],
        zh: '看见了却没认出来。',
        swapWords: ['못 알아봤어요', '몰랐어요', '지나쳤어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 사람은', role: 'subject' },
          { text: '부자이고도', role: 'verb' },
          { text: '낡은 옷을', role: 'object' },
          { text: '입어요', role: 'verb' },
        ],
        zh: '那个人是富人却穿旧衣服。',
        swapWords: ['부자이고도', '유명하고도', '성공했고도'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🍚', context: '吃不饱', ko: '많이 먹고도 배가 안 불러요.', zh: '吃了很多却不饱。' },
      { icon: '🤥', context: '装不知道', ko: '알고도 모른 척하지 마세요.', zh: '别明知却装作不知。' },
      { icon: '👀', context: '认不出来', ko: '오랜만이라 보고도 못 알아봤어요.', zh: '好久没见，看到都没认出。' },
      { icon: '😴', context: '睡了还累', ko: '오래 자고도 피곤해요.', zh: '睡了好久还是累。' },
      { icon: '💰', context: '富人俭朴', ko: '그 사람은 부자이고도 검소하게 살아요.', zh: '那人虽是富人却过得俭朴。' },
      { icon: '🎓', context: '有知识却装不懂', ko: '박사이고도 겸손해요.', zh: '虽是博士却很谦逊。' },
    ],
    mistakes: [
      { wrong: '먹으고도', correct: '먹고도', note: '고도 直接接词干，不需要 으。먹 + 고도 = 먹고도。' },
      { wrong: '먹고도 다른 사람이 배고파요', correct: '먹고도 (내가) 배고파요', note: '前后主语必须一致。-고도 是"同一主体的意外反差"。' },
      { wrong: '학생 고도', correct: '학생이고도', note: '名词有收音 + 이고도。学生 + 이고도 → 학생이고도。' },
      { wrong: '먹었고도', correct: '먹고도', note: '고도 通常直接接词干，不加过去 -았/었。语义已含"事件完成"。' },
    ],
    quickTable: {
      title: '"虽然……却……" 三兄弟',
      body: '意思接近但语气不同。',
      headers: ['结构', '语感', '例句', '中文'],
      rows: [
        [{ ko: '-지만', zh: '普通转折' }, { ko: '中性', zh: '一般' }, { ko: '먹었지만 배고파요', zh: '吃了但饿' }, '吃了但还饿（简单转折）'],
        [{ ko: '-는데도', zh: '让步' }, { ko: '意外', zh: '出乎意料' }, { ko: '먹었는데도 배고파요', zh: '尽管吃了却饿' }, '尽管吃了还饿（意外）'],
        [{ ko: '-고도', zh: '强调反差' }, { ko: '强意外', zh: '出人意料' }, { ko: '먹고도 배가 고파요', zh: '吃了还饿' }, '吃了却还饿（强反差）'],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-고도 用法练习',
      body: '根据词性和语境选出正确接法。',
      questions: [
        {
          prompt: '"吃了很多却还不饱" → 많이 ___ 배가 안 불러요.',
          options: ['먹으고도', '먹었고도', '먹고도', '먹으니고도'],
          answer: 2,
          explanation: '고도 直接接词干，不需要 으 或 았/었。먹 + 고도 = 먹고도。',
        },
        {
          prompt: '"明知却装不知" → ___ 모른 척했어요.',
          options: ['알으고도', '알고도', '알았고도', '알는고도'],
          answer: 1,
          explanation: '알다 词干 알 + 고도 = 알고도。这是固定搭配"알고도 모른 척하다"。',
        },
        {
          prompt: '"虽是富人却穿旧衣" → 그 사람은 ___ 낡은 옷을 입어요.',
          options: ['부자고도', '부자이고도', '부자를고도', '부자는고도'],
          answer: 1,
          explanation: '名词 + 이다 → 이고도。부자 + 이 + 고도 = 부자이고도。',
        },
        {
          prompt: '关于 -고도 的用法，哪句最准确？',
          options: [
            '前后主语可以不同',
            '前后主语必须一致，表达"同一主体的意外反差"',
            '主要用于并列',
            '意思等同于 -고',
          ],
          answer: 1,
          explanation: '-고도 是同一主体的意外反差连接。前后主语不同就用别的语法（-았는데도 等）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p6-l04'],
    step0Html: `<div class="card-title">-고도</div>
<div class="card-body">"虽然……却……" —— 同一主体的强反差事件。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">-고 vs -고도</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-고（顺承）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">밥을 먹고 잤어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">吃了饭就睡了。</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-고도（意外反差）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">밥을 먹고도 배가 고파요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">吃了饭却还饿。（意外）</div>
    </div>
  </div>
</div>
<div class="reminder-box">加 -도 后从并列变成反差。语感比 -지만 更强调"做了却……"。</div>`,
    compareHtml: `<div class="card-title">-고도 vs -는데도</div>
<div class="card-body">两个都表达"尽管……却……"，语感差别微妙。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고도 → 强反差（事件完成）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"做了 A，却出人意料 B"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹고도 배가 고파요.</span><span style="font-size:16px;color:#5a4640">吃了却还饿。（意外）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는데도 → 让步（尽管）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"尽管 A 状态存在，仍然 B"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹었는데도 배가 고파요.</span><span style="font-size:16px;color:#5a4640">尽管吃了还饿。</span></div>
  </div>
</div>
<div class="reminder-box">-고도 更聚焦"事件"，-는데도 更聚焦"状态让步"。可互换的场景多。</div>`,
    compareLabel: '-고도 vs -는데도',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 7 课</div>
    <div class="ov-hero-title">-고도</div>
    <div class="ov-hero-sub">"虽然……却……" · 同一主体的强反差</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        动词/形容词词干 + <b style="color:#ff7fa8">고도</b><br>
        名词 → <b style="color:#2db89b">이고도 / 고도</b><br>
        不看收音，直接接词干。<br>
        前后主语必须一致。
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        많이 먹고도 배가 안 불러요.（吃很多还不饱）<br>
        알고도 모른 척했어요.（明知却装不知）<br>
        보고도 못 알아봤어요.（看见却没认出）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹었고도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹고도（直接接词干）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내가 먹고도 네가 배고파요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">前后主语必须一致</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第8课：-을 뿐 아니라 ─────────────────────────────────
  {
    id: 'card-p23-l08',
    partNumber: 23,
    lessonNumber: 8,
    title: '-을/ㄹ 뿐 아니라',
    whatItDoes: '不仅……而且……（累加·全能用）',
    whatItDoesBody: '"뿐" 表"仅"，"아니라"表"不是" → "不仅仅是 A" → 后接更多。\n口语书面都通用，是累加连接词里最平衡的表达。\n和 -을뿐더러 意思几乎相同，但更中性、更常见。',
    structureNote: '结构：\n· 动词/形容词无收音 + ㄹ 뿐 아니라\n· 动词/形容词有收音 + 을 뿐 아니라\n· 过去 + -았/었을 뿐 아니라\n· 名词 + 뿐 아니라（直接接）/ 名词 + 일 뿐 아니라（用 -이다）\n\n뿐 独立后可以空格，也可写成 -을뿐 아니라（部分教材）。',
    rulesNote: '累加连接词 대비:\n· -고: 单纯并列（口语）\n· -는 데다가: 累加加强（口语/日常）\n· -을 뿐 아니라: 通用累加（口语/书面）\n· -을뿐더러: 书面累加（正式）\n· -거니와: 文语累加\n\n-을 뿐 아니라 是最实用最中性的。TOPIK 各级都常见。',
    structures: [
      {
        ko: '이 카페는 커피가 맛있을 뿐 아니라 분위기도 좋아요',
        zh: '这咖啡店不仅咖啡好喝，气氛也好。',
        tokens: [
          { text: '이 카페는', role: 'subject' },
          { text: '커피가', role: 'subject' },
          { text: '맛있을 뿐 아니라', role: 'verb' },
          { text: '분위기도', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
      },
      {
        ko: '민수 씨는 노래를 잘할 뿐 아니라 춤도 잘 춰요',
        zh: '敏秀不仅唱歌好，跳舞也好。',
        tokens: [
          { text: '민수 씨는', role: 'subject' },
          { text: '노래를', role: 'object' },
          { text: '잘할 뿐 아니라', role: 'verb' },
          { text: '춤도', role: 'object' },
          { text: '잘 춰요', role: 'verb' },
        ],
      },
      {
        ko: '이 책은 재미있을 뿐 아니라 유익하기도 해요',
        zh: '这书不仅有趣，也很有益。',
        tokens: [
          { text: '이 책은', role: 'subject' },
          { text: '재미있을 뿐 아니라', role: 'verb' },
          { text: '유익하기도 해요', role: 'verb' },
        ],
      },
      {
        ko: '나뿐 아니라 다른 사람들도 그렇게 생각해요',
        zh: '不仅我，别的人也这么想。',
        tokens: [
          { text: '나뿐 아니라', role: 'plain' },
          { text: '다른 사람들도', role: 'subject' },
          { text: '그렇게 생각해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音词干 + ㄹ 뿐 아니라', examples: '가다→갈 뿐 아니라 / 크다→클 뿐 아니라' },
      { type: 'rule', text: '有收音词干 + 을 뿐 아니라', examples: '먹다→먹을 뿐 아니라 / 좋다→좋을 뿐 아니라' },
      { type: 'rule', text: '过去 → -았/었을 뿐 아니라', examples: '갔을 뿐 아니라 / 잘했을 뿐 아니라' },
      { type: 'rule', text: '名词 + 뿐 아니라（直接接）', examples: '나뿐 아니라 / 학생뿐 아니라' },
      { type: 'usage', text: '前后同倾向累加，口语书面都通用', examples: '커피가 맛있을 뿐 아니라 분위기도 좋아요（咖啡不仅好喝，氛围也好。）' },
      { type: 'compare', text: '和 -을뿐더러 差别：-을 뿐 아니라 更通用，-을뿐더러 更书面', examples: '두 개 意思接近，但 -을 뿐 아니라 使用范围更广' },
      { type: 'note', text: '更常见的写法是加 만：뿐만 아니라 / -을 뿐만 아니라，意思完全相同，实际阅读和口语里 만 版本出现得更多。会了本课就等于会了 뿐만 아니라。', examples: '나뿐만 아니라 / 맛있을 뿐만 아니라（= 뿐 아니라）' },
      { type: 'compare', text: '别和 -을 뿐이다 混：两者都带"-을 뿐"，区别全在 뿐 后面接谁——接 아니라 是"不仅"（还有下文），接 이다 是"只是/仅仅"（到此为止，语气收束）。', examples: '먹을 뿐 아니라 자기도 해요（不仅吃还睡）/ 그냥 먹을 뿐이에요（只是吃罢了）' },
      { type: 'note', text: '空格：-을 뿐 아니라（뿐 前后空格）', examples: '먹을 뿐 아니라 ✓ / 먹을뿐아니라 ✗' },
      { type: 'example', text: '맛있을 뿐 아니라 분위기도 좋아요 / 노래를 잘할 뿐 아니라 춤도 잘 춰요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 카페는', role: 'subject' },
          { text: '커피가', role: 'subject' },
          { text: '맛있을 뿐 아니라', role: 'verb' },
          { text: '분위기도', role: 'subject' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '这咖啡店不仅咖啡好喝气氛也好。',
        swapWords: ['맛있을 뿐 아니라', '좋을 뿐 아니라', '훌륭할 뿐 아니라'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '민수 씨는', role: 'subject' },
          { text: '노래를', role: 'object' },
          { text: '잘할 뿐 아니라', role: 'verb' },
          { text: '춤도', role: 'object' },
          { text: '잘 춰요', role: 'verb' },
        ],
        zh: '敏秀唱歌好跳舞也好。',
        swapWords: ['잘할 뿐 아니라', '유창할 뿐 아니라', '능숙할 뿐 아니라'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '재미있을 뿐 아니라', role: 'verb' },
          { text: '유익하기도 해요', role: 'verb' },
        ],
        zh: '这书不仅有趣也有益。',
        swapWords: ['재미있을 뿐 아니라', '유쾌할 뿐 아니라', '흥미로울 뿐 아니라'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '나뿐 아니라', role: 'plain' },
          { text: '다른 사람들도', role: 'subject' },
          { text: '그렇게 생각해요', role: 'verb' },
        ],
        zh: '不仅我别人也这么想。',
        swapWords: ['나뿐 아니라', '저뿐 아니라', '우리뿐 아니라'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '☕', context: '咖啡店推荐', ko: '커피가 맛있을 뿐 아니라 분위기도 좋아요.', zh: '不仅咖啡好喝气氛也好。' },
      { icon: '🎤', context: '全才夸奖', ko: '노래를 잘할 뿐 아니라 춤도 잘 춰요.', zh: '不仅唱歌好还会跳舞。' },
      { icon: '📖', context: '书评', ko: '이 책은 재미있을 뿐 아니라 유익하기도 해요.', zh: '此书既有趣又有益。' },
      { icon: '👥', context: '意见一致', ko: '나뿐 아니라 다른 사람들도 그렇게 생각해요.', zh: '不仅我别人也这么想。' },
      { icon: '💼', context: '公司福利', ko: '월급이 많을 뿐 아니라 복지도 좋아요.', zh: '不仅工资高福利也好。' },
      { icon: '🏙️', context: '城市评价', ko: '서울은 편리할 뿐 아니라 볼거리도 많아요.', zh: '首尔不仅方便景点也多。' },
    ],
    mistakes: [
      { wrong: '먹는 뿐 아니라', correct: '먹을 뿐 아니라', note: '뿐 아니라 前用 -을/ㄹ 冠形（未来形），不用 -는（现在形）。' },
      { wrong: '학생을 뿐 아니라', correct: '학생뿐 아니라', note: '名词直接 + 뿐 아니라，不加 을。나 + 뿐 아니라 = 나뿐 아니라。' },
      { wrong: '먹을뿐아니라', correct: '먹을 뿐 아니라', note: '뿐 是依存名词，前后必须空格。' },
      { wrong: '좋을 뿐 아니라 나빠요', correct: '좋을 뿐 아니라 유익해요 / 좋지만 나빠요', note: '前后必须同倾向。矛盾用 -지만。' },
    ],
    quickTable: {
      title: '累加连接词全对比',
      body: 'P17 学过的累加连接词一览。',
      headers: ['结构', '语域', '语感', '例句'],
      rows: [
        [{ ko: '-고', zh: '日常' }, { ko: '中性', zh: '并列' }, { ko: '단순 병렬', zh: '普通' }, { ko: '예쁘고 저렴해요', zh: '又漂亮又便宜' }],
        [{ ko: '-는 데다가', zh: '日常/口语' }, { ko: '强调累加', zh: '加强' }, { ko: '"上加"', zh: '语感偏强' }, { ko: '예쁜 데다가 저렴해요', zh: '不仅漂亮还便宜' }],
        [{ ko: '-을 뿐 아니라', zh: '通用' }, { ko: '中性累加', zh: '通用' }, { ko: '"不仅仅"', zh: '平衡' }, { ko: '예쁠 뿐 아니라 저렴해요', zh: '不仅漂亮还便宜' }],
        [{ ko: '-을뿐더러', zh: '书面/正式' }, { ko: '正式累加', zh: '书面' }, { ko: 'TOPIK 写作', zh: '正式' }, { ko: '예쁠뿐더러 저렴합니다', zh: '既漂亮且便宜' }],
        [{ ko: '-거니와', zh: '文语' }, { ko: '并列累加', zh: '文语' }, { ko: '"既 A 也 B"', zh: '平衡' }, { ko: '예쁘거니와 저렴하기도 하다', zh: '既漂亮也便宜' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 뿐 아니라 用法练习',
      body: '根据词性和时态选出正确接法。',
      questions: [
        {
          prompt: '"这书有趣也有益" → 이 책은 ___ 유익하기도 해요.',
          options: ['재미있는 뿐 아니라', '재미있는데 뿐 아니라', '재미있을 뿐 아니라', '재미있고 뿐 아니라'],
          answer: 2,
          explanation: '뿐 아니라 前用 -을/ㄹ 冠形。재미있다 有收音 → 재미있을 뿐 아니라。',
        },
        {
          prompt: '"不仅我别人也这么想" → ___ 다른 사람들도 그렇게 생각해요.',
          options: ['나를 뿐 아니라', '나뿐 아니라', '나에 뿐 아니라', '나는 뿐 아니라'],
          answer: 1,
          explanation: '名词直接 + 뿐 아니라。나 + 뿐 아니라 = 나뿐 아니라。',
        },
        {
          prompt: '"敏秀唱歌好跳舞也好" → 민수 씨는 노래를 ___ 춤도 잘 춰요.',
          options: ['잘하는 뿐 아니라', '잘할 뿐 아니라', '잘한 뿐 아니라', '잘하기 뿐 아니라'],
          answer: 1,
          explanation: '잘하다 无收音 → -ㄹ 뿐 아니라 → 잘할 뿐 아니라。',
        },
        {
          prompt: '关于累加连接词的选择，哪句最准确？',
          options: [
            '-을 뿐 아니라 只能用于口语',
            '-을 뿐 아니라 口语书面都通用，是最中性的选择',
            '-을 뿐 아니라 只能接名词',
            '-을 뿐 아니라 和 -지만 意思相同',
          ],
          answer: 1,
          explanation: '-을 뿐 아니라 是最通用的累加连接词，语域中性，口语和书面都常见。TOPIK 各级都能用。',
        },
      ],
    },
    linkedGrammarIds: ['card-p23-l02', 'card-p23-l04', 'card-p23-l05'],
    step0Html: `<div class="card-title">-을/ㄹ 뿐 아니라</div>
<div class="card-body">"不仅仅……" —— 最通用的累加连接词，口语书面都能用。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;margin-bottom:12px">累加连接词全景</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">日常</div>
      <div style="font-size:16px;font-weight:800;color:#241917">예쁜 데다가 저렴해요.</div>
    </div>
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">通用（本课）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">예쁠 뿐 아니라 저렴해요.</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">正式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">예쁠뿐더러 저렴합니다.</div>
    </div>
  </div>
</div>
<div class="reminder-box">-을 뿐 아니라 是累加语法中最实用的一个。不知道用哪个就用这个准没错。</div>`,
    compareHtml: `<div class="card-title">-을 뿐 아니라 vs -을뿐더러</div>
<div class="card-body">两者意思几乎相同，选择靠语域感觉。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 뿐 아니라 → 中性通用</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">口语、书面都能用</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있을 뿐 아니라 분위기도 좋아요.</span><span style="font-size:16px;color:#5a4640">不仅好吃还气氛好。</span></div>
  </div>
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을뿐더러 → 书面正式</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">TOPIK 写作、报告首选</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있을뿐더러 분위기도 좋습니다.</span><span style="font-size:16px;color:#5a4640">既美味也气氛好。</span></div>
  </div>
</div>
<div class="reminder-box">不确定就用 -을 뿐 아니라；TOPIK 5-6 写作用 -을뿐더러 或 -거니와 显功底。</div>`,
    compareLabel: '-을 뿐 아니라 vs -을뿐더러',
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 第 8 课</div>
    <div class="ov-hero-title">-을/ㄹ 뿐 아니라</div>
    <div class="ov-hero-sub">"不仅仅……" · 最通用的累加</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        无收音 → <b style="color:#ff7fa8">ㄹ 뿐 아니라</b>：클 뿐 아니라<br>
        有收音 → <b style="color:#2db89b">을 뿐 아니라</b>：맛있을 뿐 아니라<br>
        过去 → <b style="color:#6b7ff0">-았/었을 뿐 아니라</b><br>
        名词 → <b style="color:#c89020">뿐 아니라</b>（直接接）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        커피가 맛있을 뿐 아니라 분위기도 좋아요.<br>
        노래를 잘할 뿐 아니라 춤도 잘 춰요.<br>
        나뿐 아니라 다른 사람들도 그렇게 생각해요.
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹는 뿐 아니라</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹을 뿐 아니라（用未来冠形）</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">나를 뿐 아니라</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">나뿐 아니라（名词直接接）</span></div></div>
    </div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ────────────────────────────────────
  {
    id: 'card-p23-l09',
    partNumber: 23,
    lessonNumber: 9,
    title: 'P23 综合练习',
    whatItDoes: 'P23 第1～8课 总复习',
    whatItDoesBody: '完成这份练习，检验高级连接与对比八大语法。\n覆盖：-는 반면에、-는 데다가、-기는커녕、-을뿐더러、-거니와、-는 한편、-고도、-을 뿐 아니라。\n重点掌握"对立/累加/反差/平行"四种关系的分辨。',
    isPractice: true,
    structureNote: 'P23 语法分组：\n【对立】L01 -는 반면에\n【累加】L02 -는 데다가 · L04 -을뿐더러 · L05 -거니와 · L08 -을 뿐 아니라\n【反差】L03 -기는커녕 · L07 -고도\n【平行】L06 -는 한편',
    structures: [
      { ko: '커피는 맛있는 반면 가격이 비싸요', zh: '咖啡好喝但价格贵。', tokens: [{ text: '커피는', role: 'subject' }, { text: '맛있는 반면', role: 'verb' }, { text: '가격이', role: 'subject' }, { text: '비싸요', role: 'verb' }] },
      { ko: '이 옷은 예쁜 데다가 저렴해요', zh: '这衣服不仅漂亮还便宜。', tokens: [{ text: '이 옷은', role: 'subject' }, { text: '예쁜 데다가', role: 'verb' }, { text: '저렴해요', role: 'verb' }] },
      { ko: '칭찬은커녕 혼만 났어요', zh: '别说表扬还挨骂。', tokens: [{ text: '칭찬은커녕', role: 'plain' }, { text: '혼만', role: 'plain' }, { text: '났어요', role: 'verb' }] },
      { ko: '품질이 좋을뿐더러 저렴합니다', zh: '质量好且便宜。', tokens: [{ text: '품질이', role: 'subject' }, { text: '좋을뿐더러', role: 'verb' }, { text: '저렴합니다', role: 'verb' }] },
      { ko: '재미있거니와 유익하기도 하다', zh: '有趣也有益。', tokens: [{ text: '재미있거니와', role: 'verb' }, { text: '유익하기도 하다', role: 'verb' }] },
      { ko: '일하는 한편 공부도 해요', zh: '边工作边学习。', tokens: [{ text: '일하는 한편', role: 'verb' }, { text: '공부도', role: 'object' }, { text: '해요', role: 'verb' }] },
      { ko: '먹고도 배가 고파요', zh: '吃了却还饿。', tokens: [{ text: '먹고도', role: 'verb' }, { text: '배가', role: 'subject' }, { text: '고파요', role: 'verb' }] },
      { ko: '맛있을 뿐 아니라 분위기도 좋아요', zh: '不仅好吃气氛也好。', tokens: [{ text: '맛있을 뿐 아니라', role: 'verb' }, { text: '분위기도', role: 'subject' }, { text: '좋아요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '对立特征 → -는 반면에', examples: '어려운 반면 발음은 쉬워요（语法难，发音却简单。）' },
      { type: 'rule', text: '累加加强（日常）→ -는 데다가', examples: '예쁜 데다가 저렴해요（又漂亮又便宜。）' },
      { type: 'rule', text: '预期落空 → -기는커녕 / 은/는커녕', examples: '칭찬은커녕 혼났어요（别说表扬，反倒挨骂了。）' },
      { type: 'rule', text: '累加加强（书面）→ -을뿐더러', examples: '좋을뿐더러 합리적입니다（不但好，而且合理。）' },
      { type: 'rule', text: '累加并列（文语）→ -거니와', examples: '재미있거니와 유익하다（既有趣又有益。）' },
      { type: 'rule', text: '平行并存 → -는 한편', examples: '일하는 한편 공부도 해요（一边工作一边也学习。）' },
      { type: 'rule', text: '意外反差 → -고도', examples: '먹고도 배가 고파요（吃了也还是饿。）' },
      { type: 'rule', text: '通用累加 → -을 뿐 아니라', examples: '맛있을 뿐 아니라 분위기도 좋아요（不仅好吃，氛围也好。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '이 옷은', role: 'subject' }, { text: '예쁜 데다가', role: 'verb' }, { text: '가격도', role: 'subject' }, { text: '저렴해요', role: 'verb' }],
        zh: '这衣服漂亮又便宜。',
        swapRole: 'verb',
        swapWords: ['예쁜 데다가', '멋진 데다가', '좋은 데다가'],
      },
      {
        wordBlocks: [{ text: '커피가', role: 'subject' }, { text: '맛있을 뿐 아니라', role: 'verb' }, { text: '분위기도', role: 'subject' }, { text: '좋아요', role: 'verb' }],
        zh: '咖啡好喝气氛也好。',
        swapRole: 'verb',
        swapWords: ['맛있을 뿐 아니라', '훌륭할 뿐 아니라', '좋을 뿐 아니라'],
      },
      {
        wordBlocks: [{ text: '알고도', role: 'verb' }, { text: '모른 척했어요', role: 'verb' }],
        zh: '明知却装不知。',
        swapRole: 'verb',
        swapWords: ['알고도', '보고도', '듣고도'],
      },
    ],
    scenarios: [
      { icon: '☕', context: 'L01 对立', ko: '커피는 맛있는 반면 가격이 비싸요.', zh: '咖啡好但价格贵。' },
      { icon: '👗', context: 'L02 累加', ko: '이 옷은 예쁜 데다가 저렴해요.', zh: '衣服漂亮又便宜。' },
      { icon: '😤', context: 'L03 落空', ko: '칭찬은커녕 혼만 났어요.', zh: '别说表扬还挨骂。' },
      { icon: '📢', context: 'L04 书面', ko: '품질이 좋을뿐더러 저렴합니다.', zh: '质好也便宜。' },
      { icon: '📖', context: 'L05 文语', ko: '재미있거니와 유익하기도 하다.', zh: '有趣也有益。' },
      { icon: '💼', context: 'L06 平行', ko: '일하는 한편 공부도 해요.', zh: '边工作边学习。' },
      { icon: '🍚', context: 'L07 反差', ko: '먹고도 배가 고파요.', zh: '吃了却还饿。' },
      { icon: '☕', context: 'L08 通用', ko: '맛있을 뿐 아니라 분위기도 좋아요.', zh: '好吃气氛也好。' },
    ],
    mistakes: [
      { wrong: '어렵는 반면에', correct: '어려운 반면에', note: 'L01：形容词用 -은/ㄴ 반면에。' },
      { wrong: '예쁜 데다가 비싸요', correct: '예쁜 데다가 스타일도 좋아요', note: 'L02：데다가 累加只能同向；矛盾情感（好+坏）要用 -지만。' },
      { wrong: '쉬는커녕', correct: '쉬기는커녕', note: 'L03：动词用 -기는커녕。' },
      { wrong: '좋는뿐더러', correct: '좋을뿐더러', note: 'L04：뿐더러 前用 -을/ㄹ 冠形。' },
      { wrong: '재미있는거니와', correct: '재미있거니와', note: 'L05：거니와 直接接词干。' },
      { wrong: '일하고 한편', correct: '일하는 한편', note: 'L06：한편 前用冠形 -는。' },
      { wrong: '먹었고도', correct: '먹고도', note: 'L07：고도 直接接词干。' },
      { wrong: '먹는 뿐 아니라', correct: '먹을 뿐 아니라', note: 'L08：뿐 아니라 前用未来冠形 -을/ㄹ。' },
    ],
    linkedGrammarIds: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习 · 高级连接与对比',
      body: '根据语境选出最合适的表达。',
      questions: [
        {
          prompt: '"这咖啡店咖啡好喝相反价格贵"（对立特征）→ 이 카페는 커피가 ___ 가격이 비싸요.',
          options: ['맛있는 데다가', '맛있는 반면', '맛있을뿐더러', '맛있을 뿐 아니라'],
          answer: 1,
          explanation: 'L01 对立特征 → -는 반면에。맛있는 반면。（好+贵 是矛盾对立）',
        },
        {
          prompt: '"这衣服漂亮价格也便宜"（累加同向 · 日常）→ 이 옷은 ___ 가격도 저렴해요.',
          options: ['예쁜 반면에', '예쁜 데다가', '예쁘거니와', '예쁘기는커녕'],
          answer: 1,
          explanation: 'L02 累加同向（日常）→ -는 데다가。예쁜 데다가。（都是正面特征）',
        },
        {
          prompt: '"别说表扬还挨骂"（预期落空）→ ___ 혼만 났어요.',
          options: ['칭찬은커녕', '칭찬인 반면에', '칭찬일뿐더러', '칭찬인 한편'],
          answer: 0,
          explanation: 'L03 强烈预期落空 → 은/는커녕。名词有收音 → 은커녕 → 칭찬은커녕。',
        },
        {
          prompt: '"品质好且便宜"（书面累加）→ 품질이 ___ 저렴합니다.',
          options: ['좋는 데다가', '좋을 뿐 아니라', '좋을뿐더러', '좋기는커녕'],
          answer: 2,
          explanation: 'L04 书面正式累加 → -을뿐더러。좋다 有 ㅎ → 좋을뿐더러（TOPIK 写作首选）。',
        },
        {
          prompt: '"这书有趣也有益"（文语并列）→ 이 책은 ___ 유익하기도 하다.',
          options: ['재미있는 반면에', '재미있는 한편', '재미있거니와', '재미있기는커녕'],
          answer: 2,
          explanation: 'L05 文语并列累加 → -거니와。재미있거니와 유익하기도 하다。',
        },
        {
          prompt: '"边工作边学习"（平行同时）→ 민수 씨는 ___ 공부도 해요.',
          options: ['일하는 반면에', '일하는 한편', '일할뿐더러', '일하고도'],
          answer: 1,
          explanation: 'L06 平行并存（同一主体的两个方面）→ -는 한편。일하는 한편。',
        },
        {
          prompt: '"吃了却还饿"（意外反差）→ 많이 ___ 배가 고파요.',
          options: ['먹었지만', '먹고도', '먹은 데다가', '먹기는커녕'],
          answer: 1,
          explanation: 'L07 强反差（同一主体的意外结果）→ -고도。먹고도 배가 고파요。',
        },
        {
          prompt: '"不仅咖啡好气氛也好"（通用累加）→ ___ 분위기도 좋아요.',
          options: ['맛있는 반면', '맛있기는커녕', '맛있을 뿐 아니라', '맛있고도'],
          answer: 2,
          explanation: 'L08 通用累加 → -을 뿐 아니라。맛있을 뿐 아니라（口语书面都通用）。',
        },
        {
          prompt: '"敏秀既是学生又打工"（多面性）→ ___ 아르바이트도 해요.',
          options: ['학생인 반면에', '학생인 한편', '학생거니와', '학생을뿐더러'],
          answer: 1,
          explanation: '主体的多面性/两个平行身份 → -는/인 한편。학생인 한편。',
        },
        {
          prompt: '关于 P23 语法选择，哪句最准确？',
          options: [
            '所有累加语法都可以互换',
            '-는 반면에（对立）、-는 데다가（同向累加）、-기는커녕（落空）、-는 한편（平行）关系完全不同',
            '-고도 意思和 -지만 完全相同',
            '-거니와 只能用于口语',
          ],
          answer: 1,
          explanation: 'P23 语法有严格的语义分工：对立、累加、落空、反差、平行各有专用连接词，选错会闹逻辑笑话。',
        },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P23 · 综合练习</div>
    <div class="ov-hero-title">P23 综合练习</div>
    <div class="ov-hero-sub">高级连接与对比 · 八大语法总复习</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">语法清单</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L01</span> -는/은/ㄴ 반면에 · 对立特征</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L02</span> -는/은/ㄴ 데다가 · 累加加强（日常）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L03</span> -기는커녕 / 은/는커녕 · 预期落空</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L04</span> -을/ㄹ뿐더러 · 累加（书面正式）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L05</span> -거니와 · 并列累加（文语）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L06</span> -는/은/ㄴ 한편 · 平行并存</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L07</span> -고도 · 意外反差</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">L08</span> -을/ㄹ 뿐 아니라 · 通用累加</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四大关系分类</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        <b style="color:#ff7fa8">对立</b>：-는 반면에（A ↔ B）<br>
        <b style="color:#2db89b">累加</b>：-는 데다가 · -을뿐더러 · -거니와 · -을 뿐 아니라（A + B 同向）<br>
        <b style="color:#6b7ff0">落空</b>：-기는커녕（A 落空 → B）<br>
        <b style="color:#c89020">反差</b>：-고도（做了 A 却 B）<br>
        <b style="color:#e05555">平行</b>：-는 한편（A 与 B 同时进行）
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">累加语法语域梯度</div></div>
    <div class="ov-block">
      <div style="font-size:16px;color:#241917;line-height:1.9">
        日常口语 → <b>-는 데다가</b><br>
        通用中性 → <b>-을 뿐 아니라</b><br>
        书面正式 → <b>-을뿐더러</b><br>
        文语并列 → <b>-거니와</b>
      </div>
    </div>
  </div>
</div>`,
  },

];
