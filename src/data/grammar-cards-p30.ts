import type { GrammarCard } from '@/types';

export const grammarCardsP30: GrammarCard[] = [
  // ── 第1课：눈 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l01',
    partNumber: 30,
    lessonNumber: 1,
    title: '눈 관용어',
    whatItDoes: '眼睛惯用语', english: 'Eye Idioms',
    whatItDoesBody: '韩语里"눈（眼睛）"的惯用语最多、最活。掌握 눈이 높다（眼光高）、눈에 밟히다（挂在眼前）、눈 밖에 나다（失宠）、눈이 빠지다（望眼欲穿）等，是从"考试韩语"进入"生活韩语"的分水岭。', english: 'In Korean, idioms using "눈 (eye)" are the most numerous and most commonly used. Mastering expressions like 눈이 높다 (to have high standards), 눈에 밟히다 (to linger in one\'s mind), 눈 밖에 나다 (to fall out of favor), and 눈이 빠지다 (to wait eagerly) marks the transition from "exam Korean" to "everyday Korean."',
    structureNote: '눈 + 助词 + 动词/形容词｜熟词组，语义与字面常不一致', english: '눈 + particle + verb/adjective | Idiomatic phrase; meaning often differs from literal words',
    rulesNote: '눈이 높다 眼光高 / 눈에 밟히다 挂心上 / 눈 밖에 나다 失宠 / 눈이 빠지다 望穿眼 / 눈감아 주다 睁一眼闭一眼', english: '눈이 높다 to have high standards / 눈에 밟히다 to be on one\'s mind / 눈 밖에 나다 to fall out of favor / 눈이 빠지다 to wait eagerly / 눈감아 주다 to turn a blind eye',
    structures: [
      {
        ko: '민수는 눈이 너무 높아서 아직도 결혼을 못 했어요.',
        zh: '民秀眼光太高，到现在还没结婚。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '눈이 너무 높아서', role: 'verb' },
          { text: '아직도', role: 'time' },
          { text: '결혼을 못 했어요', role: 'verb' },
        ],
      },
      {
        ko: '아이 얼굴이 자꾸 눈에 밟혀요.',
        zh: '孩子的脸总是浮现在眼前。',
        tokens: [
          { text: '아이 얼굴이', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '눈에 밟혀요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 실수를 자주 해서 상사 눈 밖에 났어요.',
        zh: '最近老失误，被上司嫌弃了。',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '실수를 자주 해서', role: 'plain' },
          { text: '상사 눈 밖에 났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '눈이 높다 → 眼光高 / 挑剔', examples: '민수는 눈이 너무 높아서 결혼을 못 해요.（民秀眼光太高，所以结不了婚。）' },
      { type: 'rule', text: '눈에 밟히다 → 挂在眼前 / 忘不掉', examples: '아이 얼굴이 눈에 밟혀요.（孩子的脸总浮现在眼前，让人挂念。）' },
      { type: 'rule', text: '눈 밖에 나다 → 失宠 / 招人嫌', examples: '상사 눈 밖에 나면 승진하기 어려워요.（一旦被上司厌弃，就很难升职。）' },
      { type: 'rule', text: '눈이 빠지다 → 望眼欲穿', examples: '눈이 빠지게 기다렸어요.（望眼欲穿地等了很久。）' },
      { type: 'rule', text: '눈감아 주다 → 睁一眼闭一眼', examples: '이번 한 번만 눈감아 주세요.（这一次就请您睁一只眼闭一只眼，通融一下吧。）' },
      { type: 'usage', text: '눈살을 찌푸리다 → 皱眉 / 反感', examples: '그 행동에 사람들이 눈살을 찌푸렸어요.（那个举动让大家皱起眉头，很反感。）' },
      { type: 'usage', text: '눈치 → 察言观色的能力', examples: '눈치가 빠르다（脑子快）/ 눈치를 보다（看脸色）' },
      { type: 'note', text: '这些是固定搭配，不能拆开或改助词', examples: '误：눈은 높다 / 正：눈이 높다' },
      { type: 'vocab', text: '눈치 是中文没有精准对应词的文化概念，接近"眼力见儿、看气氛的能力"。三个高频搭配要整体记：눈치가 빠르다（机灵、会看眼色）· 눈치가 없다（不懂看气氛）· 눈치를 보다（看人脸色、揣摩心思）', examples: '민수는 눈치가 빨라요.（民秀很会看眼色，机灵。）' },
      { type: 'note', text: '눈이 빠지다 几乎不单独用，固定为副词形"눈이 빠지게 + 기다리다/찾다"，表"望眼欲穿地等/找"', examples: '눈이 빠지게 기다렸어요.（望眼欲穿地等了很久。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '눈이 너무 높아서', role: 'verb' },
          { text: '결혼을 못 했어요', role: 'verb' },
        ],
        zh: '民秀眼光太高。',
        swapWords: ['민수', '언니', '동생', '친구'],
      },
      {
        wordBlocks: [
          { text: '아이 얼굴이', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '눈에 밟혀요', role: 'verb' },
        ],
        zh: '孩子脸挂在眼前。',
        swapWords: ['얼굴', '모습', '표정', '눈빛'],
      },
      {
        wordBlocks: [
          { text: '이번 한 번만', role: 'plain' },
          { text: '눈감아 주세요', role: 'verb' },
        ],
        zh: '这次就睁一眼闭一眼。',
        swapWords: ['눈감아 주다', '봐주다', '넘어가다', '용서하다'],
      },
    ],
    scenarios: [
      { icon: '👀', context: '眼光高', ko: '민수는 눈이 너무 높아요.', zh: '民秀眼光太高。' },
      { icon: '💭', context: '挂心上', ko: '아이 얼굴이 눈에 밟혀요.', zh: '孩子的脸浮现眼前。' },
      { icon: '😤', context: '失宠', ko: '상사 눈 밖에 났어요.', zh: '被上司嫌弃了。' },
      { icon: '⏳', context: '望眼欲穿', ko: '눈이 빠지게 기다렸어요.', zh: '望眼欲穿等待。' },
      { icon: '🤫', context: '通融', ko: '이번 한 번만 눈감아 주세요.', zh: '这次通融一下。' },
      { icon: '🎯', context: '察言观色', ko: '민수는 눈치가 빨라요.', zh: '民秀特会察言观色。' },
    ],
    mistakes: [
      { wrong: '민수는 눈은 높아요', correct: '민수는 눈이 높아요', note: '固定搭配是 눈이 높다，不用 눈은' },
      { wrong: '아이가 눈에 밟혀요', correct: '아이 얼굴이 눈에 밟혀요', note: '主语通常是"具体形象"如脸/身影，不是"人本身"' },
      { wrong: '눈이 감아 주세요', correct: '눈감아 주세요', note: '固定组合 눈감아 주다，不加 이/가' },
    ],
    quickTable: {
      title: '눈 관용어 速查', english: '눈 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['눈이 높다', '眼光高', '눈이 높아서 못 골라요'],
        ['눈에 밟히다', '忘不掉', '아이 얼굴이 눈에 밟혀요'],
        ['눈 밖에 나다', '失宠 / 招人嫌', '상사 눈 밖에 났어요'],
        ['눈이 빠지다', '望眼欲穿', '눈이 빠지게 기다렸어요'],
        ['눈감아 주다', '睁眼闭眼', '한 번만 눈감아 주세요'],
        ['눈치가 빠르다', '善察言观色', '민수는 눈치가 빨라요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '눈 관용어 练习', english: '눈 Idioms Practice',
      body: '选择正确含义',
      questions: [
        {
          prompt: '"민수는 눈이 너무 높아요." 的意思是？',
          options: ['个子很高', '眼光挑剔 / 要求高', '眼睛长得高', '看得很远'],
          answer: 1,
          explanation: '눈이 높다 是"眼光高/挑剔"，与身高无关。',
        },
        {
          prompt: '"아이 얼굴이 눈에 밟혀요." 的意思是？',
          options: ['孩子踩到眼睛', '孩子的脸总是浮现在心头 / 挂念', '孩子长得像我', '看不见孩子'],
          answer: 1,
          explanation: '눈에 밟히다 = 想忘也忘不掉的挂念感。',
        },
        {
          prompt: '"이번 한 번만 눈감아 주세요." 表达什么？',
          options: ['请闭上眼睛', '请通融一次 / 装作没看见', '请闭目养神', '请打瞌睡'],
          answer: 1,
          explanation: '눈감아 주다 = 睁一眼闭一眼 / 通融不追究。',
        },
        {
          prompt: '"상사 눈 밖에 났어요." 什么意思？',
          options: ['离开了上司的视线', '被上司嫌弃 / 失宠', '和上司分道扬镳', '成了上司眼中钉'],
          answer: 1,
          explanation: '눈 밖에 나다 = 失去某人的信任/好感。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语里"눈"最活跃：<b>눈이 높다</b>（眼光高）、<b>눈에 밟히다</b>（挂在心头）、<b>눈 밖에 나다</b>（失宠）。<br>字面翻译几乎没用，必须整体记忆。掌握"눈"的惯用语是从"考试韩语"进入"生活韩语"的分水岭。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>字面 vs 惯用</b><br>
    ・字面：눈이 크다.（眼睛大）<br>
    ・惯用：눈이 높다.（眼光高）<br>
    <span style="color:#89756e">눈이 크다 是描述外貌，눈이 높다 是描述择偶/择物标准</span>
  </div>
</div>`,
    compareLabel: '字面 vs 惯用',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">눈 관용어</div>
  <div style="font-size:14px;color:#89756e">韩语生活语核心之一</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      눈이 높다 → 眼光高<br>
      눈에 밟히다 → 忘不掉<br>
      눈 밖에 나다 → 失宠<br>
      눈이 빠지다 → 望眼欲穿<br>
      눈감아 주다 → 睁眼闭眼<br>
      눈치가 빠르다 → 察言观色
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">눈은 높다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">눈이 높다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">눈이 감아 주세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">눈감아 주세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：손 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l02',
    partNumber: 30,
    lessonNumber: 2,
    title: '손 관용어',
    whatItDoes: '手 惯用语', english: 'Hand Idioms',
    whatItDoesBody: '"손（手）"的惯用语大多与"做事、参与、慷慨、放弃"相关：손이 크다（大方）、손을 씻다（洗手不干）、손을 놓다（放手不管）、손이 모자라다（人手不够）、손을 대다（插手/开始动手）。', english: 'Idioms with "손 (hand)" mostly relate to "doing, participating, generosity, or giving up": 손이 크다 (generous), 손을 씻다 (wash one\'s hands of it), 손을 놓다 (let go / stop managing), 손이 모자라다 (short-handed), 손을 대다 (get involved / start working on).',
    structureNote: '손 + 助词 + 动词｜多表"做事/参与/放弃"', english: '손 + particle + verb | Often expresses "doing / participating / giving up"',
    rulesNote: '손이 크다 大方 / 손을 씻다 洗手不干 / 손을 놓다 放手不管 / 손이 모자라다 人手不够 / 손을 대다 开始动手', english: '손이 크다 generous / 손을 씻다 to wash one\'s hands of it / 손을 놓다 to let go / 손이 모자라다 to be short-handed / 손을 대다 to start working on',
    structures: [
      {
        ko: '엄마는 손이 크셔서 늘 음식을 많이 하세요.',
        zh: '妈妈很大方，做饭总是很多。',
        tokens: [
          { text: '엄마는', role: 'subject' },
          { text: '손이 크셔서', role: 'verb' },
          { text: '늘', role: 'time' },
          { text: '음식을 많이 하세요', role: 'verb' },
        ],
      },
      {
        ko: '이제 그 일에서 완전히 손을 씻었어요.',
        zh: '我彻底和那件事洗手不干了。',
        tokens: [
          { text: '이제', role: 'time' },
          { text: '그 일에서', role: 'place' },
          { text: '완전히', role: 'plain' },
          { text: '손을 씻었어요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 일이 너무 많아서 손이 모자라요.',
        zh: '最近事太多，人手不够。',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '일이 너무 많아서', role: 'plain' },
          { text: '손이 모자라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '손이 크다 → 大方 / 手大', examples: '엄마는 손이 크셔서 음식을 많이 하세요.（妈妈很大方，做饭总是做得很多。）' },
      { type: 'rule', text: '손을 씻다 → 洗手不干 / 金盆洗手', examples: '이제 그 일에서 손을 씻었어요.（现在我已经从那件事里金盆洗手了。）' },
      { type: 'rule', text: '손을 놓다 → 放手不管 / 停手', examples: '한동안 일에서 손을 놓고 쉬었어요.（有一阵子放下工作休息了。）' },
      { type: 'rule', text: '손이 모자라다 → 人手不够', examples: '주말이라 손이 모자라요.（因为是周末，所以人手不够。）' },
      { type: 'rule', text: '손을 대다 → 开始动手 / 插手', examples: '이 일에는 아직 손을 대지 않았어요.（这件事我还没着手去做。）' },
      { type: 'usage', text: '손을 잡다 → 携手合作', examples: '두 회사가 손을 잡고 새 프로젝트를 시작했어요.（两家公司携手合作，启动了新项目。）' },
      { type: 'usage', text: '손사래를 치다 → 摆手拒绝', examples: '그는 손사래를 치며 사양했어요.（他连连摆手，婉言谢绝了。）' },
      { type: 'note', text: '손이 크다 与身体无关，指心胸开阔/做事大方', examples: '误：손이 커요 = 手长得大 / 正：손이 커요 = 大方/爱送人' },
      { type: 'note', text: '负迁移警告：손이 크다 是纯褒义的"大方、出手阔绰、招待人不吝啬"，别用中文"大手大脚（浪费钱）"的贬义去理解。夸主人做菜多、送礼大方就说 손이 크다', examples: '엄마는 손이 크셔서 늘 음식을 많이 하세요.（妈妈很大方，做饭总是很多。）' },
      { type: 'compare', text: '손을 씻다 vs 손을 놓다：都像"停手"，但语感不同。손을 씻다 = 从坏事/纠纷里彻底金盆洗手，带道德色彩、不再回头；손을 놓다 = 暂时放下手中的活儿去歇一歇，中性、可以再拿起来', examples: '그 일에서 손을 씻었어요.（那件事金盆洗手了。）↔ 한동안 일에서 손을 놓고 쉬었어요.（有一阵子放下工作休息了。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마는', role: 'subject' },
          { text: '손이 크셔서', role: 'verb' },
          { text: '음식을 많이 하세요', role: 'verb' },
        ],
        zh: '妈妈大方，做很多菜。',
        swapWords: ['엄마', '할머니', '이모', '언니'],
      },
      {
        wordBlocks: [
          { text: '이제', role: 'time' },
          { text: '그 일에서', role: 'place' },
          { text: '손을 씻었어요', role: 'verb' },
        ],
        zh: '和那件事金盆洗手。',
        swapWords: ['손을 씻다', '발을 빼다', '그만두다', '떠나다'],
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '일이 너무 많아서', role: 'plain' },
          { text: '손이 모자라요', role: 'verb' },
        ],
        zh: '事太多人手不够。',
        swapWords: ['모자라다', '부족하다', '없다', '없어요'],
      },
    ],
    scenarios: [
      { icon: '🍲', context: '大方', ko: '엄마는 손이 크셔서 음식을 많이 하세요.', zh: '妈妈大方做很多菜。' },
      { icon: '🚫', context: '金盆洗手', ko: '그 일에서 손을 씻었어요.', zh: '那件事金盆洗手了。' },
      { icon: '😴', context: '放手', ko: '한동안 일에서 손을 놓고 쉬었어요.', zh: '暂时放下工作休息。' },
      { icon: '🙏', context: '人手不够', ko: '주말이라 손이 모자라요.', zh: '周末人手不够。' },
      { icon: '🤝', context: '合作', ko: '두 회사가 손을 잡고 시작했어요.', zh: '两家公司携手合作。' },
      { icon: '🖐️', context: '拒绝', ko: '그는 손사래를 치며 사양했어요.', zh: '他摆手推辞。' },
    ],
    mistakes: [
      { wrong: '엄마는 손을 커요', correct: '엄마는 손이 커요', note: '손이 크다 是惯用语（大方），主语助词用 이，不用 을' },
      { wrong: '손을 씻고 그 일 다시 시작할래요', correct: '손을 씻고 그 일에서 완전히 떠날래요', note: '손을 씻다 后不能再做同一件事，语义矛盾' },
      { wrong: '손이 없어서 힘들어요', correct: '손이 모자라서 힘들어요', note: '"人手不够"用 손이 모자라다，不用 손이 없다' },
    ],
    quickTable: {
      title: '손 관용어 速查', english: '손 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['손이 크다', '大方 / 爱送', '엄마는 손이 크세요'],
        ['손을 씻다', '金盆洗手', '그 일에서 손을 씻었어요'],
        ['손을 놓다', '停手 / 放手', '일에서 손을 놓았어요'],
        ['손이 모자라다', '人手不够', '주말이라 손이 모자라요'],
        ['손을 대다', '插手 / 开始', '이 일에 손을 대지 마세요'],
        ['손을 잡다', '携手合作', '두 회사가 손을 잡았어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '손 관용어 练习', english: '손 Idioms Practice',
      body: '选择正确含义',
      questions: [
        {
          prompt: '"엄마는 손이 크세요." 的意思是？',
          options: ['妈妈手长得大', '妈妈大方 / 慷慨', '妈妈手灵活', '妈妈手臂长'],
          answer: 1,
          explanation: '손이 크다 = 大方/慷慨，与手的物理大小无关。',
        },
        {
          prompt: '"그 일에서 손을 씻었어요." 表达什么？',
          options: ['把手洗干净了', '开始做那件事', '彻底不再做那件事 / 金盆洗手', '换个人做'],
          answer: 2,
          explanation: '손을 씻다 = 彻底脱离某事，多指停止不良行为。',
        },
        {
          prompt: '"손이 모자라요." 什么意思？',
          options: ['手不够长', '人手不足', '手指不够', '手工不够好'],
          answer: 1,
          explanation: '손이 모자라다 = 干活的人手不够。',
        },
        {
          prompt: '"두 회사가 손을 잡았어요." 意味着？',
          options: ['两家公司握手', '两家公司敌对', '两家公司合作 / 结盟', '两家公司分手'],
          answer: 2,
          explanation: '손을 잡다 = 携手合作 / 结盟。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l01', 'card-p30-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"손"的惯用语围绕"做事、参与、放弃"：<br><b>손이 크다</b>（大方）· <b>손을 씻다</b>（金盆洗手）· <b>손을 놓다</b>（放手）· <b>손이 모자라다</b>（人手不够）。<br>不能字面翻译，要整体记。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>손이 크다 vs 손이 작다</b><br>
    ・손이 크다 → 大方 / 爱送<br>
    <span style="color:#89756e">엄마는 손이 크세요.</span><br>
    ・손이 작다 → 小气 / 抠门（较少用）<br>
    <span style="color:#89756e">그 사람은 손이 작아요.（抠）</span>
  </div>
</div>`,
    compareLabel: '大方 vs 小气',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">손 관용어</div>
  <div style="font-size:14px;color:#89756e">做事 / 参与 / 放弃</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      손이 크다 → 大方<br>
      손을 씻다 → 金盆洗手<br>
      손을 놓다 → 放手不管<br>
      손이 모자라다 → 人手不够<br>
      손을 대다 → 插手 / 开始<br>
      손을 잡다 → 携手合作
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">손이 없어서 힘들어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">손이 모자라서 힘들어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">손이 커요（=物理大）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">손이 커요（=大方）</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：발 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l03',
    partNumber: 30,
    lessonNumber: 3,
    title: '발 관용어',
    whatItDoes: '脚 惯用语', english: 'Foot Idioms',
    whatItDoesBody: '"발（脚）"的惯用语多围绕"人脉、参与、脱身"：발이 넓다（人脉广）、발 벗고 나서다（挺身而出）、발을 빼다（抽身脱离）、발이 묶이다（被困住）、발 뻗고 자다（安心睡）。', english: 'Idioms with "발 (foot)" often revolve around "connections, participation, or getting away": 발이 넓다 (well-connected), 발 벗고 나서다 (step forward / throw oneself in), 발을 빼다 (pull out / extricate oneself), 발이 묶이다 (to be tied up / stuck), 발 뻗고 자다 (sleep peacefully).',
    structureNote: '발 + 助词 + 动词｜多表"人脉/参与/脱身/被困"', english: '발 + particle + verb ｜ Often expresses "connections / participation / getting away / being stuck"',
    rulesNote: '발이 넓다 人脉广 / 발 벗고 나서다 挺身而出 / 발을 빼다 抽身 / 발이 묶이다 被困 / 발 뻗고 자다 安心睡', english: '발이 넓다 to have many connections / 발 벗고 나서다 to step forward actively / 발을 빼다 to pull out (of a situation) / 발이 묶이다 to be tied up / 발 뻗고 자다 to sleep soundly',
    structures: [
      {
        ko: '민수는 발이 넓어서 아는 사람이 많아요.',
        zh: '民秀人脉广，认识的人多。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '발이 넓어서', role: 'verb' },
          { text: '아는 사람이 많아요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 어려울 때 발 벗고 나서 줬어요.',
        zh: '朋友有难时挺身而出。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '어려울 때', role: 'time' },
          { text: '발 벗고 나서 줬어요', role: 'verb' },
        ],
      },
      {
        ko: '이 프로젝트에서는 이미 발을 뺐어요.',
        zh: '这个项目我已经抽身了。',
        tokens: [
          { text: '이 프로젝트에서는', role: 'place' },
          { text: '이미', role: 'time' },
          { text: '발을 뺐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '발이 넓다 → 人脉广 / 交际广', examples: '민수는 발이 넓어서 도움을 잘 받아요.（民秀人脉广，所以很容易得到帮助。）' },
      { type: 'rule', text: '발 벗고 나서다 → 挺身而出 / 卖力帮忙', examples: '친구를 위해 발 벗고 나섰어요.（为了朋友挺身而出，全力相助。）' },
      { type: 'rule', text: '발을 빼다 → 抽身 / 脱离', examples: '위험한 일에서 발을 뺐어요.（从危险的事情里抽身退出了。）' },
      { type: 'rule', text: '발이 묶이다 → 被困 / 走不了', examples: '눈이 많이 와서 공항에서 발이 묶였어요.（因为下大雪，被困在机场走不了。）' },
      { type: 'rule', text: '발 뻗고 자다 → 安心睡 / 无忧无虑', examples: '일 다 끝내고 발 뻗고 자요.（把事情都做完，安心地睡个好觉。）' },
      { type: 'usage', text: '발 디딜 틈 없다 → 挤得没落脚地', examples: '지하철이 발 디딜 틈 없이 붐볐어요.（地铁挤得没有落脚的地方。）' },
      { type: 'usage', text: '발등에 불이 떨어지다 → 火烧眉毛', examples: '내일이 마감이라 발등에 불이 떨어졌어요.（明天就是截止日期，真是火烧眉毛了。）' },
      { type: 'note', text: '"발이 넓다" ≠ 脚长得宽；指人脉广', examples: '误：脚长得宽 / 正：交际广' },
      { type: 'compare', text: '발을 빼다 vs 손을 놓다：中文都可说"抽身/撒手"，但韩语分工严格。발을 빼다 = 从已经参与的事情或关系里退出、脱身（强调"不再牵扯其中"）；손을 놓다 = 停下手里正做的活、松手不再照管（强调"停止动作"）。抽身脱离用脚，停手放下用手，不能互换', examples: '위험한 일에서 발을 뺐어요.（从危险的事情里抽身退出。）↔ 한동안 일에서 손을 놓고 쉬었어요.（放下手头工作休息一阵。）' },
      { type: 'note', text: '발 벗고 나서다 字面是"脱了鞋光着脚冲出来"，惯用义是"奋不顾身、全力帮忙、挺身而出"。别被 벗고（脱）字面义带偏，它形容的是急切主动的态度', examples: '친구가 어려울 때 발 벗고 나서 줬어요.（朋友有难时挺身而出、全力相助。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '발이 넓어서', role: 'verb' },
          { text: '아는 사람이 많아요', role: 'verb' },
        ],
        zh: '民秀人脉广。',
        swapWords: ['민수', '팀장님', '언니', '삼촌'],
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '어려울 때', role: 'time' },
          { text: '발 벗고 나서 줬어요', role: 'verb' },
        ],
        zh: '朋友挺身而出。',
        swapWords: ['발 벗고 나서다', '도와주다', '돕다', '나서다'],
      },
      {
        wordBlocks: [
          { text: '눈이 많이 와서', role: 'plain' },
          { text: '공항에서', role: 'place' },
          { text: '발이 묶였어요', role: 'verb' },
        ],
        zh: '大雪被困机场。',
        swapWords: ['공항', '역', '터미널', '기차역'],
      },
    ],
    scenarios: [
      { icon: '🕸️', context: '人脉广', ko: '민수는 발이 넓어요.', zh: '民秀人脉广。' },
      { icon: '💪', context: '挺身而出', ko: '친구가 발 벗고 나서 줬어요.', zh: '朋友挺身而出。' },
      { icon: '🚪', context: '抽身', ko: '위험한 일에서 발을 뺐어요.', zh: '从危险事抽身。' },
      { icon: '❄️', context: '被困', ko: '공항에서 발이 묶였어요.', zh: '被困机场。' },
      { icon: '😴', context: '安心睡', ko: '일 다 끝내고 발 뻗고 자요.', zh: '事情做完安心睡。' },
      { icon: '🔥', context: '火烧眉毛', ko: '발등에 불이 떨어졌어요.', zh: '火烧眉毛了。' },
    ],
    mistakes: [
      { wrong: '민수는 발이 커서 인기가 많아요', correct: '민수는 발이 넓어서 인기가 많아요', note: '"人脉广"是 발이 넓다，不是 발이 크다' },
      { wrong: '이 일에서 발을 놓았어요', correct: '이 일에서 발을 뺐어요', note: '"抽身"用 발을 빼다，不用 발을 놓다（那是 손을 놓다）' },
      { wrong: '눈이 와서 발이 잡혔어요', correct: '눈이 와서 발이 묶였어요', note: '"被困"固定用 발이 묶이다' },
    ],
    quickTable: {
      title: '발 관용어 速查', english: '발 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['발이 넓다', '人脉广', '민수는 발이 넓어요'],
        ['발 벗고 나서다', '挺身而出', '친구를 위해 발 벗고 나섰어요'],
        ['발을 빼다', '抽身 / 脱离', '위험한 일에서 발을 뺐어요'],
        ['발이 묶이다', '被困 / 走不了', '공항에서 발이 묶였어요'],
        ['발 뻗고 자다', '安心睡', '일 끝내고 발 뻗고 자요'],
        ['발등에 불이 떨어지다', '火烧眉毛', '마감이 임박해 발등에 불이 떨어졌어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '발 관용어 练习', english: '발 Idioms Practice',
      body: '选择正确含义',
      questions: [
        {
          prompt: '"민수는 발이 넓어요." 的意思是？',
          options: ['脚长得宽', '人脉广 / 认识的人多', '走路快', '足弓宽'],
          answer: 1,
          explanation: '발이 넓다 = 人脉广。',
        },
        {
          prompt: '"이 일에서 발을 뺐어요." 表达什么？',
          options: ['把脚抽出来', '从这事里抽身/退出', '这事没做成', '把腿伸出来'],
          answer: 1,
          explanation: '발을 빼다 = 抽身 / 脱离某事。',
        },
        {
          prompt: '"눈이 와서 공항에서 발이 묶였어요." 什么意思？',
          options: ['脚被绳子绑住', '因大雪被困在机场走不了', '在机场被逮捕', '在机场滑倒'],
          answer: 1,
          explanation: '발이 묶이다 = 因外部原因被困原地。',
        },
        {
          prompt: '"발등에 불이 떨어졌어요." 意味着？',
          options: ['脚背烫伤', '事情十万火急 / 火烧眉毛', '不小心踩到火', '开始跑'],
          answer: 1,
          explanation: '발등에 불이 떨어지다 = 事情紧迫 / 火烧眉毛。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l02', 'card-p30-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"발"围绕"人脉/参与/脱身"：<br><b>발이 넓다</b>（人脉广）· <b>발 벗고 나서다</b>（挺身而出）· <b>발을 빼다</b>（抽身）· <b>발이 묶이다</b>（被困）。<br>字面翻译误人，必须整体记。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>参与 vs 脱离</b><br>
    ・발 벗고 나서다 → 主动参与<br>
    <span style="color:#89756e">친구를 위해 발 벗고 나섰어요.</span><br>
    ・발을 빼다 → 主动脱离<br>
    <span style="color:#89756e">위험한 일에서 발을 뺐어요.</span>
  </div>
</div>`,
    compareLabel: '参与 vs 脱离',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">발 관용어</div>
  <div style="font-size:14px;color:#89756e">人脉 · 参与 · 脱身 · 被困</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      발이 넓다 → 人脉广<br>
      발 벗고 나서다 → 挺身而出<br>
      발을 빼다 → 抽身<br>
      발이 묶이다 → 被困<br>
      발 뻗고 자다 → 安心睡<br>
      발등에 불이 떨어지다 → 火烧眉毛
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">발이 커요 = 人脉广</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">발이 넓어요 = 人脉广</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">발이 잡혔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">발이 묶였어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：마음 · 가슴 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l04',
    partNumber: 30,
    lessonNumber: 4,
    title: '마음 · 가슴 관용어',
    whatItDoes: '心 惯用语', english: 'Heart Idioms',
    whatItDoesBody: '"마음（心/心情）"和"가슴（胸/心窝）"是韩语情感表达的两大核心：마음에 들다（喜欢/合心意）、마음을 먹다（下决心）、가슴이 아프다（心痛）、가슴이 뭉클하다（感动）、가슴에 새기다（铭记于心）。', english: '"마음 (heart/mind)" and "가슴 (chest/heart)" are the two core words for expressing emotions in Korean: 마음에 들다 (to like / to be to one\'s liking), 마음을 먹다 (to make up one\'s mind), 가슴이 아프다 (heartache), 가슴이 뭉클하다 (to be moved), 가슴에 새기다 (to engrave in one\'s heart).',
    structureNote: '마음/가슴 + 助词 + 动词/形容词｜表情感/决心', english: '마음/가슴 + particle + verb/adjective ｜ Expresses emotions / determination',
    rulesNote: '마음에 들다 合心意 / 마음을 먹다 下决心 / 가슴이 아프다 心痛 / 가슴이 뭉클하다 感动 / 가슴에 새기다 铭记', english: '마음에 들다 to be to one\'s liking / 마음을 먹다 to make up one\'s mind / 가슴이 아프다 to have a heartache / 가슴이 뭉클하다 to be deeply moved / 가슴에 새기다 to engrave in one\'s heart',
    structures: [
      {
        ko: '이 옷이 정말 마음에 들어요.',
        zh: '这件衣服真合我心意。',
        tokens: [
          { text: '이 옷이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '마음에 들어요', role: 'verb' },
        ],
      },
      {
        ko: '드디어 유학 가기로 마음을 먹었어요.',
        zh: '终于下决心去留学了。',
        tokens: [
          { text: '드디어', role: 'time' },
          { text: '유학 가기로', role: 'plain' },
          { text: '마음을 먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '그 이야기를 듣고 가슴이 뭉클했어요.',
        zh: '听那故事，心里一阵感动。',
        tokens: [
          { text: '그 이야기를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가슴이 뭉클했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '마음에 들다 → 中意 / 合心意', examples: '이 옷이 마음에 들어요.（我很中意这件衣服。）' },
      { type: 'rule', text: '마음을 먹다 → 下决心', examples: '유학 가기로 마음을 먹었어요.（我下定决心要去留学。）' },
      { type: 'rule', text: '가슴이 아프다 → 心痛（同情 / 悲伤）', examples: '뉴스를 보고 가슴이 아팠어요.（看了那则新闻，感到心痛。）' },
      { type: 'rule', text: '가슴이 뭉클하다 → 一阵感动 / 鼻酸', examples: '어머니의 편지에 가슴이 뭉클했어요.（读了母亲的信，心里一阵感动。）' },
      { type: 'rule', text: '가슴에 새기다 → 铭记于心', examples: '선생님 말씀을 가슴에 새겼어요.（把老师的话铭记在心。）' },
      { type: 'usage', text: '마음이 놓이다 → 放心 / 心里松一口气', examples: '아이가 안전하다는 말에 마음이 놓였어요.（听说孩子平安，心里就放心了。）' },
      { type: 'usage', text: '마음이 무겁다 → 心情沉重', examples: '결과를 기다리는 동안 마음이 무거웠어요.（等待结果的那段时间，心情很沉重。）' },
      { type: 'note', text: '마음 偏向"决心/意愿"；가슴 偏向"情感/感受"', examples: '마음을 먹다（决心）/ 가슴이 뭉클하다（感动）' },
      { type: 'compare', text: '마음에 들다 vs 좋아하다：中文都译"喜欢"，但两点不同。①结构：좋아하다 是"我喜欢它"（人做主语、它用 를）；마음에 들다 是"它合我心"（喜欢的东西做主语、用 이/가，助词固定 마음에）。②语感：마음에 들다 偏一见就中意、合眼缘（常用于第一印象、买东西挑东西）；좋아하다 偏一贯的喜好', examples: '이 옷이 마음에 들어요.（这件衣服我一看就中意。）↔ 저는 이 옷을 좋아해요.（我喜欢这件衣服。）' },
      { type: 'note', text: '마음을 먹다 里的 먹다 不是"吃"，是"抱定（决心）"的意思，整体记成"下定决心"；口语也常写作一个词 마음먹다', examples: '드디어 유학 가기로 마음을 먹었어요.（终于下决心去留学了。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '마음에 들어요', role: 'verb' },
        ],
        zh: '这衣服合心意。',
        swapWords: ['옷', '가방', '신발', '색깔'],
      },
      {
        wordBlocks: [
          { text: '드디어', role: 'time' },
          { text: '유학 가기로', role: 'plain' },
          { text: '마음을 먹었어요', role: 'verb' },
        ],
        zh: '终于决心留学。',
        swapWords: ['유학', '이직', '결혼', '독립'],
      },
      {
        wordBlocks: [
          { text: '그 이야기를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가슴이 뭉클했어요', role: 'verb' },
        ],
        zh: '听后心里感动。',
        swapWords: ['뭉클하다', '따뜻하다', '먹먹하다', '벅차다'],
      },
    ],
    scenarios: [
      { icon: '💕', context: '合心意', ko: '이 옷이 마음에 들어요.', zh: '这衣服合心意。' },
      { icon: '💪', context: '下决心', ko: '유학 가기로 마음을 먹었어요.', zh: '决心去留学。' },
      { icon: '💔', context: '心痛', ko: '뉴스를 보고 가슴이 아팠어요.', zh: '看新闻心痛。' },
      { icon: '🥺', context: '感动', ko: '편지를 읽고 가슴이 뭉클했어요.', zh: '读信心里感动。' },
      { icon: '📝', context: '铭记', ko: '선생님 말씀을 가슴에 새겼어요.', zh: '把老师的话铭记在心。' },
      { icon: '😌', context: '放心', ko: '아이가 안전해서 마음이 놓였어요.', zh: '孩子安全放心了。' },
    ],
    mistakes: [
      { wrong: '이 옷이 마음이 들어요', correct: '이 옷이 마음에 들어요', note: '固定搭配是 마음에 들다（助词 -에），不用 -이/가' },
      { wrong: '유학 가기로 마음이 먹었어요', correct: '유학 가기로 마음을 먹었어요', note: '"下决心"是 마음을 먹다，用 -을' },
      { wrong: '뉴스를 보고 마음이 아팠어요', correct: '뉴스를 보고 가슴이 아팠어요', note: '"心痛"用 가슴이 아프다 更自然（同情/悲伤）；마음이 아프다 也可但语感偏内心懊悔' },
    ],
    quickTable: {
      title: '마음 · 가슴 관용어 速查', english: '마음 · 가슴 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['마음에 들다', '合心意 / 中意', '이 옷이 마음에 들어요'],
        ['마음을 먹다', '下决心', '유학 가기로 마음을 먹었어요'],
        ['마음이 놓이다', '放心', '아이가 안전해서 마음이 놓였어요'],
        ['가슴이 아프다', '心痛 / 同情', '가슴이 아파요'],
        ['가슴이 뭉클하다', '感动 / 鼻酸', '가슴이 뭉클했어요'],
        ['가슴에 새기다', '铭记于心', '가슴에 새겼어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '마음 · 가슴 练习', english: '마음 · 가슴 Practice',
      body: '选择正确的搭配',
      questions: [
        {
          prompt: '이 옷이 정말 (마음) 들어요.',
          options: ['이', '을', '에', '에서'],
          answer: 2,
          explanation: '固定搭配是 마음에 들다，助词是 -에。',
        },
        {
          prompt: '유학 가기로 (마음) 먹었어요.',
          options: ['이', '을', '에', '으로'],
          answer: 1,
          explanation: '"下决心"是 마음을 먹다，助词是 -을。',
        },
        {
          prompt: '"편지를 읽고 가슴이 뭉클했어요." 的意思？',
          options: ['胸口发疼', '一阵感动 / 鼻酸', '胸口发热', '心跳加快'],
          answer: 1,
          explanation: '가슴이 뭉클하다 = 因感动而心里一阵触动 / 鼻酸。',
        },
        {
          prompt: '"마음"和"가슴"的分工是？',
          options: [
            '完全相同',
            '마음 偏"决心/意愿"，가슴 偏"情感/感受"',
            '마음 = 头脑，가슴 = 身体',
            '마음 用于书面，가슴 用于口语',
          ],
          answer: 1,
          explanation: '마음：决心/意愿层面（먹다/들다/놓이다）；가슴：情感/身体感受（아프다/뭉클하다/새기다）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l01', 'card-p30-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"마음"和"가슴"是韩语情感表达的两大核心：<br><b>마음</b> 偏决心/意愿：마음에 들다（中意）· 마음을 먹다（下决心）<br><b>가슴</b> 偏情感/感受：가슴이 아프다（心痛）· 가슴이 뭉클하다（感动）</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>마음 vs 가슴</b><br>
    ・마음 → 决心/意愿<br>
    <span style="color:#89756e">마음을 먹다（下决心）</span><br>
    ・가슴 → 身体感受/情感<br>
    <span style="color:#89756e">가슴이 뭉클하다（感动）</span>
  </div>
</div>`,
    compareLabel: '마음 vs 가슴',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">마음 · 가슴 관용어</div>
  <div style="font-size:14px;color:#89756e">情感 · 决心 · 感受</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      마음에 들다 → 中意<br>
      마음을 먹다 → 下决心<br>
      마음이 놓이다 → 放心<br>
      가슴이 아프다 → 心痛<br>
      가슴이 뭉클하다 → 感动<br>
      가슴에 새기다 → 铭记
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">마음이 들어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">마음에 들어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">마음이 먹었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">마음을 먹었어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：입 · 말 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l05',
    partNumber: 30,
    lessonNumber: 5,
    title: '입 · 말 관용어',
    whatItDoes: '嘴/话 惯用语', english: 'Mouth/Speech Idioms',
    whatItDoesBody: '"입（嘴）"和"말（话）"的惯用语多与"保密/传播/说话方式"相关：입이 무겁다（守口如瓶）、입이 가볍다（嘴不严）、말꼬리를 잡다（抠字眼）、말을 아끼다（惜字如金）、입에 발린 말（花言巧语）。', english: 'Idioms using "입 (mouth)" and "말 (speech)" often relate to "keeping secrets / spreading rumors / speaking style": 입이 무겁다 (to be tight-lipped), 입이 가볍다 (to be loose-lipped), 말꼬리를 잡다 (to nitpick someone\'s words), 말을 아끼다 (to be sparing with words), 입에 발린 말 (sweet talk / flattery).',
    structureNote: '입/말 + 助词 + 动词/形容词｜表说话方式与信任', english: '입/말 + particle + verb/adjective | Expresses manner of speech and trust',
    rulesNote: '입이 무겁다 守口 / 입이 가볍다 嘴松 / 말꼬리를 잡다 抠字眼 / 말을 아끼다 惜字如金 / 입에 발린 말 花言巧语', english: '입이 무겁다 keep a secret / 입이 가볍다 loose-lipped / 말꼬리를 잡다 nitpick / 말을 아끼다 be sparing with words / 입에 발린 말 sweet talk',
    structures: [
      {
        ko: '민수는 입이 무거워서 비밀을 말해도 안전해요.',
        zh: '民秀嘴很严，说秘密也安全。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '입이 무거워서', role: 'verb' },
          { text: '비밀을 말해도', role: 'verb' },
          { text: '안전해요', role: 'verb' },
        ],
      },
      {
        ko: '자꾸 말꼬리를 잡으면 대화가 안 돼요.',
        zh: '老是抠字眼，对话没法进行。',
        tokens: [
          { text: '자꾸', role: 'plain' },
          { text: '말꼬리를 잡으면', role: 'verb' },
          { text: '대화가 안 돼요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 그 사람은 말을 아끼고 있어요.',
        zh: '最近他惜字如金。',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '그 사람은', role: 'subject' },
          { text: '말을 아끼고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '입이 무겁다 → 守口如瓶', examples: '민수는 입이 무거워요.（民秀嘴很严，守口如瓶。）' },
      { type: 'rule', text: '입이 가볍다 → 嘴不严 / 爱说', examples: '그 사람은 입이 가벼워서 조심하세요.（那个人嘴不严，你要小心点。）' },
      { type: 'rule', text: '말꼬리를 잡다 → 抠字眼 / 挑毛病', examples: '자꾸 말꼬리를 잡지 마세요.（别老是抓话柄挑字眼。）' },
      { type: 'rule', text: '말을 아끼다 → 惜字如金 / 少说话', examples: '요즘 그는 말을 아끼고 있어요.（最近他很少说话，惜字如金。）' },
      { type: 'rule', text: '입에 발린 말 → 花言巧语 / 敷衍话', examples: '입에 발린 말은 하지 마세요.（别说那些花言巧语的客套话。）' },
      { type: 'usage', text: '입방아를 찧다 → 说闲话 / 八卦', examples: '동네에서 그 사람 입방아를 찧어요.（街坊邻里都在说那个人的闲话。）' },
      { type: 'usage', text: '말이 씨가 되다 → 一语成谶', examples: '말이 씨가 될 수 있으니 조심하세요.（说出口的话可能会一语成谶，说话要小心。）' },
      { type: 'note', text: '입 vs 말 → 입 侧重"嘴的行为"，말 侧重"内容"', examples: '입이 무겁다（嘴严）/ 말이 많다（话多）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '입이 무거워서', role: 'verb' },
          { text: '비밀을 말해도', role: 'verb' },
          { text: '안전해요', role: 'verb' },
        ],
        zh: '民秀嘴严可托付秘密。',
        swapWords: ['입이 무겁다', '믿음직하다', '신뢰가 가다', '조심스럽다'],
      },
      {
        wordBlocks: [
          { text: '자꾸', role: 'plain' },
          { text: '말꼬리를 잡으면', role: 'verb' },
          { text: '대화가 안 돼요', role: 'verb' },
        ],
        zh: '总抠字眼没法对话。',
        swapWords: ['말꼬리', '말끝', '작은 부분', '단어'],
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '그 사람은', role: 'subject' },
          { text: '말을 아끼고 있어요', role: 'verb' },
        ],
        zh: '他最近惜字如金。',
        swapWords: ['아끼다', '삼가다', '줄이다', '피하다'],
      },
    ],
    scenarios: [
      { icon: '🤐', context: '嘴严', ko: '민수는 입이 무거워요.', zh: '民秀嘴严。' },
      { icon: '🗣️', context: '嘴松', ko: '그 사람은 입이 가벼워요.', zh: '他嘴不严。' },
      { icon: '🔍', context: '抠字眼', ko: '말꼬리를 잡지 마세요.', zh: '别抠字眼。' },
      { icon: '🤫', context: '少说话', ko: '요즘 말을 아끼고 있어요.', zh: '最近惜字如金。' },
      { icon: '😒', context: '敷衍话', ko: '입에 발린 말은 하지 마세요.', zh: '别说敷衍话。' },
      { icon: '💬', context: '八卦', ko: '동네에서 입방아를 찧어요.', zh: '街坊说闲话。' },
    ],
    mistakes: [
      { wrong: '민수는 입을 무겁습니다', correct: '민수는 입이 무겁습니다', note: '입이 무겁다 是惯用语（嘴严/守口如瓶），主语助词用 이，不用 을' },
      { wrong: '말꼬리를 잡아 주세요', correct: '말꼬리를 잡지 마세요', note: '말꼬리를 잡다 含贬义"抠字眼挑毛病"，不能作为"请求"' },
      { wrong: '요즘 말이 아껴요', correct: '요즘 말을 아껴요', note: '"惜字如金"是 말을 아끼다，用 -을' },
    ],
    quickTable: {
      title: '입 · 말 관용어 速查', english: '입 · 말 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['입이 무겁다', '嘴严 / 守口如瓶', '민수는 입이 무거워요'],
        ['입이 가볍다', '嘴不严', '그 사람은 입이 가벼워요'],
        ['말꼬리를 잡다', '抠字眼', '말꼬리를 잡지 마세요'],
        ['말을 아끼다', '惜字如金', '말을 아끼고 있어요'],
        ['입에 발린 말', '敷衍话 / 花言巧语', '입에 발린 말은 싫어요'],
        ['입방아를 찧다', '说闲话 / 八卦', '동네에서 입방아를 찧어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '입 · 말 练习', english: '입 · 말 Practice',
      body: '选择正确含义',
      questions: [
        {
          prompt: '"민수는 입이 무거워요." 的意思是？',
          options: ['嘴巴长得大', '嘴严 / 守口如瓶', '不爱吃东西', '嘴唇厚重'],
          answer: 1,
          explanation: '입이 무겁다 = 守口如瓶，能保守秘密。',
        },
        {
          prompt: '"자꾸 말꼬리를 잡지 마세요." 意味着？',
          options: ['不要抓话的尾巴', '不要抠字眼 / 挑毛病', '不要打断说话', '不要回答'],
          answer: 1,
          explanation: '말꼬리를 잡다 = 揪住某句话的细节挑刺。',
        },
        {
          prompt: '"입에 발린 말은 하지 마세요." 什么意思？',
          options: ['不要涂嘴唇', '不要说花言巧语 / 敷衍话', '不要说脏话', '不要说话'],
          answer: 1,
          explanation: '입에 발린 말 = 表面客套敷衍的话。',
        },
        {
          prompt: '입 vs 말 的核心区别？',
          options: [
            '完全相同',
            '입 → 嘴的行为（严/松）；말 → 话本身（内容/多/少）',
            '입 用于口语，말 用于书面',
            '입 是身体，말 是精神',
          ],
          answer: 1,
          explanation: '입（嘴的动作/属性）+ 말（话的内容/数量）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l04', 'card-p30-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"입"和"말"围绕"保密/传播/说话方式"：<br><b>입이 무겁다</b>（嘴严）· <b>입이 가볍다</b>（嘴松）· <b>말꼬리를 잡다</b>（抠字眼）· <b>말을 아끼다</b>（惜字如金）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>嘴严 vs 嘴松</b><br>
    ・입이 무겁다 → 守口如瓶<br>
    <span style="color:#89756e">민수는 입이 무거워요.</span><br>
    ・입이 가볍다 → 嘴不严<br>
    <span style="color:#89756e">그 사람은 입이 가벼워요.</span>
  </div>
</div>`,
    compareLabel: '嘴严 vs 嘴松',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">입 · 말 관용어</div>
  <div style="font-size:14px;color:#89756e">说话 · 保密 · 传播</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      입이 무겁다 → 嘴严<br>
      입이 가볍다 → 嘴松<br>
      말꼬리를 잡다 → 抠字眼<br>
      말을 아끼다 → 惜字如金<br>
      입에 발린 말 → 敷衍话<br>
      입방아를 찧다 → 说闲话
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">말이 아껴요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">말을 아껴요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">말꼬리를 잡아 주세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">말꼬리를 잡지 마세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：머리 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l06',
    partNumber: 30,
    lessonNumber: 6,
    title: '머리 관용어',
    whatItDoes: '头 惯用语', english: 'Head Idioms',
    whatItDoesBody: '"머리（头）"的惯用语多与思考、方案、合作、烦恼相关：머리를 굴리다（动脑筋）、머리를 맞대다（碰头商量）、머리가 아프다（头疼/烦）、머리가 잘 돌아가다（脑子灵）、머리를 식히다（透透气）。', english: 'Idioms using "머리 (head)" often relate to thinking, planning, cooperation, and worries: 머리를 굴리다 (rack your brain), 머리를 맞대다 (put heads together), 머리가 아프다 (have a headache / be troubled), 머리가 잘 돌아가다 (be quick-witted), 머리를 식히다 (clear your head).',
    structureNote: '머리 + 助词 + 动词/形容词｜表思考/方案/烦恼', english: '머리 + particle + verb/adjective | Expresses thinking/planning/worries',
    rulesNote: '머리를 굴리다 动脑 / 머리를 맞대다 碰头 / 머리가 아프다 头疼/烦 / 머리가 잘 돌아가다 脑子灵 / 머리를 식히다 透气', english: '머리를 굴리다 rack your brain / 머리를 맞대다 put heads together / 머리가 아프다 have a headache / be troubled / 머리가 잘 돌아가다 be quick-witted / 머리를 식히다 clear your head',
    structures: [
      {
        ko: '이 문제를 풀려고 머리를 굴렸어요.',
        zh: '为解这题，动了脑筋。',
        tokens: [
          { text: '이 문제를 풀려고', role: 'plain' },
          { text: '머리를 굴렸어요', role: 'verb' },
        ],
      },
      {
        ko: '팀원들이 머리를 맞대고 방법을 찾았어요.',
        zh: '组员们碰头商量找方法。',
        tokens: [
          { text: '팀원들이', role: 'subject' },
          { text: '머리를 맞대고', role: 'verb' },
          { text: '방법을 찾았어요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 일이 많아서 머리가 아파요.',
        zh: '最近事多头疼。',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '일이 많아서', role: 'plain' },
          { text: '머리가 아파요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '머리를 굴리다 → 动脑筋 / 想办法', examples: '어떻게 하지 하며 머리를 굴렸어요.（一边想着该怎么办，一边动起了脑筋。）' },
      { type: 'rule', text: '머리를 맞대다 → 碰头 / 商量', examples: '팀원들이 머리를 맞대고 의논했어요.（组员们凑在一起商量。）' },
      { type: 'rule', text: '머리가 아프다 → 头疼 / 心烦', examples: '이 문제 때문에 머리가 아파요.（这个问题让人头疼。）' },
      { type: 'rule', text: '머리가 (잘) 돌아가다 → 脑子灵 / 反应快', examples: '민수는 머리가 잘 돌아가서 답을 빨리 찾았어요.（民秀脑子转得快，很快就找到了答案。）' },
      { type: 'rule', text: '머리를 식히다 → 放空 / 透透气', examples: '산책하면서 머리를 식혔어요.（一边散步，一边让头脑放松一下。）' },
      { type: 'usage', text: '머리가 지끈지끈하다 → 头突突地疼', examples: '아침부터 머리가 지끈지끈해요.（从早上开始头就一阵阵地突突疼。）' },
      { type: 'usage', text: '머리를 짜다 → 绞尽脑汁', examples: '아이디어를 짜내려고 머리를 짜냈어요.（为了想出点子，绞尽了脑汁。）' },
      { type: 'note', text: '머리가 아프다 既指身体也指心烦意乱', examples: '身体：감기 걸려서 머리가 아파요 / 心烦：결정하기 힘들어서 머리가 아파요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 문제를 풀려고', role: 'plain' },
          { text: '머리를 굴렸어요', role: 'verb' },
        ],
        zh: '为解题动脑筋。',
        swapWords: ['굴리다', '짜다', '쓰다', '쥐어짜다'],
      },
      {
        wordBlocks: [
          { text: '팀원들이', role: 'subject' },
          { text: '머리를 맞대고', role: 'verb' },
          { text: '방법을 찾았어요', role: 'verb' },
        ],
        zh: '组员碰头找办法。',
        swapWords: ['머리를 맞대다', '의논하다', '토의하다', '상의하다'],
      },
      {
        wordBlocks: [
          { text: '산책하면서', role: 'plain' },
          { text: '머리를 식혔어요', role: 'verb' },
        ],
        zh: '散步透透气。',
        swapWords: ['식히다', '쉬다', '풀다', '비우다'],
      },
    ],
    scenarios: [
      { icon: '🧠', context: '动脑', ko: '문제를 풀려고 머리를 굴렸어요.', zh: '解题动脑筋。' },
      { icon: '👥', context: '碰头', ko: '팀원들이 머리를 맞대고 논의했어요.', zh: '组员碰头讨论。' },
      { icon: '🤯', context: '头疼', ko: '이 문제 때문에 머리가 아파요.', zh: '这问题让人头疼。' },
      { icon: '💡', context: '脑子灵', ko: '민수는 머리가 잘 돌아가요.', zh: '民秀脑子灵。' },
      { icon: '🍃', context: '透气', ko: '산책하면서 머리를 식혔어요.', zh: '散步透透气。' },
      { icon: '📚', context: '绞尽脑汁', ko: '아이디어를 짜내려고 머리를 짜냈어요.', zh: '绞尽脑汁想主意。' },
    ],
    mistakes: [
      { wrong: '문제를 풀려고 머리가 굴렸어요', correct: '문제를 풀려고 머리를 굴렸어요', note: '"动脑"是 머리를 굴리다，用 -을' },
      { wrong: '팀원들이 머리를 잡고 논의했어요', correct: '팀원들이 머리를 맞대고 논의했어요', note: '"碰头"固定为 머리를 맞대다，不是 머리를 잡다' },
      { wrong: '이 문제로 머리가 아프고 있어요', correct: '이 문제로 머리가 아파요', note: '머리가 아프다 是状态动词，不用 -고 있다' },
    ],
    quickTable: {
      title: '머리 관용어 速查', english: '머리 Idioms Quick Reference',
      headers: ['惯用语', '含义', '例子'],
      rows: [
        ['머리를 굴리다', '动脑筋', '머리를 굴려서 답을 찾았어요'],
        ['머리를 맞대다', '碰头 / 商量', '팀원들이 머리를 맞댔어요'],
        ['머리가 아프다', '头疼 / 心烦', '결정하기 힘들어서 머리가 아파요'],
        ['머리가 잘 돌아가다', '脑子灵', '민수는 머리가 잘 돌아가요'],
        ['머리를 식히다', '透气 / 放空', '산책하며 머리를 식혔어요'],
        ['머리를 짜다', '绞尽脑汁', '머리를 짜서 아이디어를 냈어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '머리 관용어 练习', english: '머리 Idioms Practice',
      body: '选择正确含义或搭配',
      questions: [
        {
          prompt: '"문제를 풀려고 머리를 굴렸어요." 意思？',
          options: ['滚动头', '动脑筋 / 想办法', '摇头', '摇晃身体'],
          answer: 1,
          explanation: '머리를 굴리다 = 动脑筋想办法。',
        },
        {
          prompt: '"팀원들이 머리를 맞대고 논의했어요." 什么意思？',
          options: ['头顶碰头顶', '碰头 / 共同商量', '打架', '互相点头'],
          answer: 1,
          explanation: '머리를 맞대다 = 聚在一起共同商量。',
        },
        {
          prompt: '민수는 머리가 잘 (   ) 답을 빨리 찾아요.',
          options: ['잡아서', '돌아가서', '식혀서', '아파서'],
          answer: 1,
          explanation: '"脑子灵"是 머리가 잘 돌아가다 → 돌아가서。',
        },
        {
          prompt: '"산책하면서 머리를 식혔어요." 意味着？',
          options: ['头变凉了', '放空 / 缓解精神疲劳', '生病发烧退了', '开始散步'],
          answer: 1,
          explanation: '머리를 식히다 = 让脑子透透气 / 缓解压力。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"머리"围绕"思考/方案/合作/烦恼"：<br><b>머리를 굴리다</b>（动脑筋）· <b>머리를 맞대다</b>（碰头）· <b>머리가 아프다</b>（头疼/烦）· <b>머리를 식히다</b>（透气）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>动脑 vs 放空</b><br>
    ・머리를 굴리다 → 主动想办法<br>
    <span style="color:#89756e">답을 찾으려 머리를 굴렸어요.</span><br>
    ・머리를 식히다 → 放空缓压<br>
    <span style="color:#89756e">산책하며 머리를 식혔어요.</span>
  </div>
</div>`,
    compareLabel: '动脑 vs 放空',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">머리 관용어</div>
  <div style="font-size:14px;color:#89756e">思考 · 商量 · 烦恼 · 放空</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      머리를 굴리다 → 动脑筋<br>
      머리를 맞대다 → 碰头商量<br>
      머리가 아프다 → 头疼 / 烦恼<br>
      머리가 잘 돌아가다 → 脑子灵<br>
      머리를 식히다 → 放空 / 透气<br>
      머리를 짜다 → 绞尽脑汁
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">머리가 굴렸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">머리를 굴렸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">머리를 잡고 논의</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">머리를 맞대고 논의</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：四字成语 · 情感与态度 ──────────────────────────────────────
  {
    id: 'card-p30-l07',
    partNumber: 30,
    lessonNumber: 7,
    title: '四字成语 · 情感与态度', english: 'Four-Character Idioms · Emotions and Attitudes',
    whatItDoes: '사자성어（1）', english: '사자성어 (1)',
    whatItDoesBody: '韩语四字成语（사자성어）多源自汉字典故，是韩语高级表达的标志。本课学与"情感/态度/合作"相关的六大成语：일석이조（一石二鸟）、동병상련（同病相怜）、십시일반（十匙一饭）、어부지리（渔翁得利）、자업자득（自作自受）、우유부단（优柔寡断）。', english: 'Korean four-character idioms (사자성어) mostly originate from Chinese classical stories and are a hallmark of advanced Korean expression. This lesson covers six idioms related to "emotions/attitudes/cooperation": 일석이조 (one stone, two birds), 동병상련 (misery loves company), 십시일반 (many hands make light work), 어부지리 (the fisherman\'s gain), 자업자득 (reap what you sow), and 우유부단 (indecisive).',
    structureNote: '四字成语作名词使用｜句中位置灵活｜多与 이다/하다 搭配', english: 'Four-character idioms are used as nouns | flexible position in sentences | often paired with 이다/하다',
    rulesNote: '읽는 법：일석이조[일써기조] / 어부지리[어부지리]，注意汉字词双拼读法', english: 'Pronunciation: 일석이조[일써기조] / 어부지리[어부지리], note the double-consonant reading of Sino-Korean words',
    structures: [
      {
        ko: '이번 여행은 관광도 하고 공부도 해서 일석이조였어요.',
        zh: '这次旅行既观光又学习，一石二鸟。',
        tokens: [
          { text: '이번 여행은', role: 'subject' },
          { text: '관광도 하고 공부도 해서', role: 'plain' },
          { text: '일석이조였어요', role: 'verb' },
        ],
      },
      {
        ko: '실직한 사람들끼리 만나면 동병상련을 느껴요.',
        zh: '失业的人聚在一起会感到同病相怜。',
        tokens: [
          { text: '실직한 사람들끼리', role: 'subject' },
          { text: '만나면', role: 'plain' },
          { text: '동병상련을 느껴요', role: 'verb' },
        ],
      },
      {
        ko: '십시일반으로 힘을 모아 어려운 이웃을 도왔어요.',
        zh: '十匙一饭，凝聚力量帮助了困难邻里。',
        tokens: [
          { text: '십시일반으로', role: 'plain' },
          { text: '힘을 모아', role: 'verb' },
          { text: '어려운 이웃을', role: 'object' },
          { text: '도왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '일석이조（一石二鸟）→ 一举两得', examples: '운동도 하고 살도 빼고 일석이조예요.（既锻炼了身体又减了肥，真是一举两得。）' },
      { type: 'rule', text: '동병상련（同病相怜）→ 处境相同互相同情', examples: '어려운 처지에 동병상련을 느껴요.（处境同样艰难，彼此感到同病相怜。）' },
      { type: 'rule', text: '십시일반（十匙一饭）→ 众人拾柴 / 每人出一点', examples: '십시일반으로 도와줬어요.（大家每人出一点力，众人拾柴地帮了忙。）' },
      { type: 'rule', text: '어부지리（渔翁得利）→ 鹬蚌相争渔翁得利', examples: '두 회사 싸움에서 어부지리를 얻었어요.（在两家公司的争斗中坐收了渔翁之利。）' },
      { type: 'rule', text: '자업자득（自作自受）→ 自食其果', examples: '거짓말이 들통난 건 자업자득이에요.（谎言被拆穿是自作自受。）' },
      { type: 'rule', text: '우유부단（优柔寡断）→ 犹豫不决', examples: '민수는 우유부단해서 결정을 못 해요.（民秀优柔寡断，迟迟做不了决定。）' },
      { type: 'usage', text: '语用：多用书面/新闻/正式演讲', examples: '기사 등에서 자주 나오는 표현' },
      { type: 'note', text: '判读时把汉字对照：일석(一石)+이조(二鸟)', examples: '일석이조=一+石+二+鸟' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이번 여행은', role: 'subject' },
          { text: '관광도 공부도', role: 'plain' },
          { text: '일석이조였어요', role: 'verb' },
        ],
        zh: '旅行是一石二鸟。',
        swapWords: ['일석이조', '일거양득', '두 가지', '동시'],
      },
      {
        wordBlocks: [
          { text: '실직한 사람들끼리', role: 'subject' },
          { text: '동병상련을', role: 'object' },
          { text: '느껴요', role: 'verb' },
        ],
        zh: '同病相怜。',
        swapWords: ['동병상련', '공감', '연민', '위로'],
      },
      {
        wordBlocks: [
          { text: '십시일반으로', role: 'plain' },
          { text: '어려운 이웃을', role: 'object' },
          { text: '도왔어요', role: 'verb' },
        ],
        zh: '众人拾柴帮邻里。',
        swapWords: ['십시일반', '조금씩', '함께', '모두'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '一举两得', ko: '이 여행은 일석이조였어요.', zh: '旅行一石二鸟。' },
      { icon: '🤝', context: '同病相怜', ko: '동병상련을 느꼈어요.', zh: '感到同病相怜。' },
      { icon: '💪', context: '众人拾柴', ko: '십시일반으로 도왔어요.', zh: '众人拾柴帮忙。' },
      { icon: '🎣', context: '渔翁得利', ko: '두 회사 싸움에 어부지리를 얻었어요.', zh: '两家争斗渔翁得利。' },
      { icon: '⚖️', context: '自作自受', ko: '거짓말이 들통난 건 자업자득이에요.', zh: '被戳穿是自食其果。' },
      { icon: '🤔', context: '优柔寡断', ko: '민수는 우유부단해요.', zh: '民秀优柔寡断。' },
    ],
    mistakes: [
      { wrong: '이 여행은 일석이조 있어요', correct: '이 여행은 일석이조였어요', note: '成语作名词，用 이다 系词，不用 있다' },
      { wrong: '십시일반이 도왔어요', correct: '십시일반으로 도왔어요', note: '"以十匙一饭方式"用 -으로' },
      { wrong: '우유부단이에요', correct: '우유부단해요', note: '우유부단하다 是形容词性，用 -해요' },
    ],
    quickTable: {
      title: '情感态度类 사자성어', english: 'Emotion & Attitude 사자성어',
      headers: ['成语', '汉字', '含义'],
      rows: [
        ['일석이조', '一石二鸟', '一举两得'],
        ['동병상련', '同病相怜', '处境相同互怜'],
        ['십시일반', '十匙一饭', '众人拾柴'],
        ['어부지리', '渔夫之利', '渔翁得利'],
        ['자업자득', '自业自得', '自作自受'],
        ['우유부단', '优柔不断', '犹豫不决'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '情感态度 사자성어 练习', english: 'Emotion & Attitude 사자성어 Practice',
      body: '选择正确的成语',
      questions: [
        {
          prompt: '"这次旅行既观光又学习" 最贴切的成语？',
          options: ['자업자득', '일석이조', '어부지리', '동병상련'],
          answer: 1,
          explanation: '"一举两得"是 일석이조。',
        },
        {
          prompt: '"两家公司斗争，我们赚了" 用哪个成语？',
          options: ['자업자득', '십시일반', '어부지리', '우유부단'],
          answer: 2,
          explanation: '"鹬蚌相争渔翁得利"是 어부지리。',
        },
        {
          prompt: '"每人出一点力帮忙" 用哪个？',
          options: ['십시일반', '일석이조', '어부지리', '동병상련'],
          answer: 0,
          explanation: '"众人拾柴"是 십시일반（十匙一饭）。',
        },
        {
          prompt: '"民秀总是拿不定主意" 最贴切？',
          options: ['자업자득', '동병상련', '우유부단', '십시일반'],
          answer: 2,
          explanation: '"犹豫不决"是 우유부단。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l08'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">四字成语是韩语高级表达的标志。<br>本课学 6 大情感/态度类：<b>일석이조</b>（一石二鸟）· <b>동병상련</b>（同病相怜）· <b>십시일반</b>（十匙一饭）· <b>어부지리</b>（渔翁得利）· <b>자업자득</b>（自作自受）· <b>우유부단</b>（优柔寡断）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>일석이조 vs 자업자득</b><br>
    ・일석이조 → 一石二鸟（正面结果）<br>
    <span style="color:#89756e">공부도 하고 돈도 벌어서 일석이조.</span><br>
    ・자업자득 → 自食其果（负面结果）<br>
    <span style="color:#89756e">거짓말이 들통난 건 자업자득.</span>
  </div>
</div>`,
    compareLabel: '正果 vs 恶果',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">사자성어（1）情感态度</div>
  <div style="font-size:14px;color:#89756e">书面高级表达</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大成语</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      일석이조（一石二鸟）→ 一举两得<br>
      동병상련（同病相怜）→ 互怜<br>
      십시일반（十匙一饭）→ 众人拾柴<br>
      어부지리（渔夫之利）→ 渔翁得利<br>
      자업자득（自业自得）→ 自食其果<br>
      우유부단（优柔不断）→ 犹豫不决
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">일석이조 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">일석이조였어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">우유부단이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">우유부단해요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：四字成语 · 事态与因果 ──────────────────────────────────────
  {
    id: 'card-p30-l08',
    partNumber: 30,
    lessonNumber: 8,
    title: '四字成语 · 事态与因果', english: 'Four-Character Idioms · Situations & Causality',
    whatItDoes: '사자성어（2）', english: '사자성어 (2)',
    whatItDoesBody: '本课学与"事态/因果/得失"相关的六大成语：전화위복（转祸为福）、오리무중（五里雾中）、유비무환（有备无患）、설상가상（雪上加霜）、고진감래（苦尽甘来）、다다익선（多多益善）。', english: 'This lesson covers six idioms related to "situations/causality/gain and loss": 전화위복 (turning misfortune into fortune), 오리무중 (lost in a fog), 유비무환 (preparedness prevents calamity), 설상가상 (adding frost to snow), 고진감래 (sweet comes after bitter), and 다다익선 (the more, the better).',
    structureNote: '同前课，作名词使用 · 与 이다/하다/-으로 搭配', english: 'Same as the previous lesson, used as nouns | paired with 이다/하다/-으로',
    rulesNote: '注意汉字对照：전화(转祸)+위복(为福) / 설상(雪上)+가상(加霜)', english: 'Note the Chinese character correspondences: 전화(转祸)+위복(为福) / 설상(雪上)+가상(加霜)',
    structures: [
      {
        ko: '큰 실패였지만 결국 전화위복이 되었어요.',
        zh: '虽是大失败，最终转祸为福。',
        tokens: [
          { text: '큰 실패였지만', role: 'plain' },
          { text: '결국', role: 'plain' },
          { text: '전화위복이 되었어요', role: 'verb' },
        ],
      },
      {
        ko: '사건의 원인이 아직 오리무중이에요.',
        zh: '事件原因仍在五里雾中。',
        tokens: [
          { text: '사건의 원인이', role: 'subject' },
          { text: '아직', role: 'time' },
          { text: '오리무중이에요', role: 'verb' },
        ],
      },
      {
        ko: '늦게 도착한 데다 비까지 와서 설상가상이었어요.',
        zh: '迟到又碰上下雨，雪上加霜。',
        tokens: [
          { text: '늦게 도착한 데다', role: 'plain' },
          { text: '비까지 와서', role: 'plain' },
          { text: '설상가상이었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '전화위복（转祸为福）→ 因祸得福', examples: '실패가 전화위복이 되었어요.（那次失败最终转祸为福。）' },
      { type: 'rule', text: '오리무중（五里雾中）→ 迷茫不明', examples: '원인이 오리무중이에요.（原因扑朔迷离，令人一头雾水。）' },
      { type: 'rule', text: '유비무환（有备无患）→ 有备无患', examples: '유비무환의 자세로 준비했어요.（本着有备无患的态度做了准备。）' },
      { type: 'rule', text: '설상가상（雪上加霜）→ 雪上加霜', examples: '설상가상으로 폭우까지 왔어요.（雪上加霜的是，还下起了暴雨。）' },
      { type: 'rule', text: '고진감래（苦尽甘来）→ 苦尽甘来', examples: '고진감래라, 이제 좋은 일이 생길 거예요.（苦尽甘来，接下来会有好事发生的。）' },
      { type: 'rule', text: '다다익선（多多益善）→ 多多益善', examples: '경험은 다다익선이에요.（经验多多益善。）' },
      { type: 'usage', text: '설상가상 常做副词化 → 설상가상으로', examples: '설상가상으로 차까지 고장 났어요.（雪上加霜的是，连车都坏了。）' },
      { type: 'note', text: '전화위복 = 好事从坏事转来；反义 = 호사다마（好事多磨）', examples: '一好一坏，语义相反' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '큰 실패였지만', role: 'plain' },
          { text: '결국', role: 'plain' },
          { text: '전화위복이 되었어요', role: 'verb' },
        ],
        zh: '失败转祸为福。',
        swapWords: ['전화위복', '고진감래', '희소식', '반전'],
      },
      {
        wordBlocks: [
          { text: '사건의 원인이', role: 'subject' },
          { text: '아직', role: 'time' },
          { text: '오리무중이에요', role: 'verb' },
        ],
        zh: '事件仍五里雾中。',
        swapWords: ['오리무중', '미궁', '의문', '불투명'],
      },
      {
        wordBlocks: [
          { text: '늦게 도착한 데다', role: 'plain' },
          { text: '비까지 와서', role: 'plain' },
          { text: '설상가상이었어요', role: 'verb' },
        ],
        zh: '迟到又下雨雪上加霜。',
        swapWords: ['설상가상', '엎친 데 덮친 격', '악재', '겹악재'],
      },
    ],
    scenarios: [
      { icon: '🔄', context: '因祸得福', ko: '실패가 전화위복이 되었어요.', zh: '失败转祸为福。' },
      { icon: '🌫️', context: '迷茫', ko: '원인이 오리무중이에요.', zh: '原因五里雾中。' },
      { icon: '📦', context: '有备无患', ko: '유비무환의 자세로 준비했어요.', zh: '以有备无患的态度准备。' },
      { icon: '☔', context: '雪上加霜', ko: '설상가상으로 폭우가 왔어요.', zh: '雪上加霜下暴雨。' },
      { icon: '🌈', context: '苦尽甘来', ko: '고진감래라, 이제 좋은 일이 생길 거예요.', zh: '苦尽甘来。' },
      { icon: '📚', context: '多多益善', ko: '경험은 다다익선이에요.', zh: '经验多多益善。' },
    ],
    mistakes: [
      { wrong: '실패가 전화위복 됐어요', correct: '실패가 전화위복이 되었어요', note: '"成为"要接 이/가 + 되다' },
      { wrong: '설상가상이 폭우까지 왔어요', correct: '설상가상으로 폭우까지 왔어요', note: '副词化用 -으로' },
      { wrong: '유비무환하게 준비', correct: '유비무환의 자세로 준비', note: '유비무환 是名词，不做副词，需借 "-의 자세로"' },
    ],
    quickTable: {
      title: '事态因果类 사자성어', english: 'Situation & Causality 사자성어',
      headers: ['成语', '汉字', '含义'],
      rows: [
        ['전화위복', '转祸为福', '因祸得福'],
        ['오리무중', '五里雾中', '迷茫不明'],
        ['유비무환', '有备无患', '有备无患'],
        ['설상가상', '雪上加霜', '雪上加霜'],
        ['고진감래', '苦尽甘来', '苦尽甘来'],
        ['다다익선', '多多益善', '多多益善'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '事态因果 사자성어 练习', english: 'Situation & Causality 사자성어 Practice',
      body: '选择正确成语',
      questions: [
        {
          prompt: '"失败反而带来好事" 最贴切成语？',
          options: ['설상가상', '전화위복', '자업자득', '오리무중'],
          answer: 1,
          explanation: '"因祸得福"是 전화위복。',
        },
        {
          prompt: '"迟到又下大雨" 最贴切成语？',
          options: ['전화위복', '고진감래', '설상가상', '다다익선'],
          answer: 2,
          explanation: '"雪上加霜"是 설상가상。',
        },
        {
          prompt: '"事情原因还没查清" 最贴切？',
          options: ['오리무중', '자업자득', '유비무환', '전화위복'],
          answer: 0,
          explanation: '"五里雾中"是 오리무중。',
        },
        {
          prompt: '"苦难过后好日子会来" 最贴切？',
          options: ['우유부단', '고진감래', '설상가상', '어부지리'],
          answer: 1,
          explanation: '"苦尽甘来"是 고진감래。',
        },
      ],
    },
    linkedGrammarIds: ['card-p30-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">本课六大事态因果成语：<br><b>전화위복</b>（因祸得福）· <b>오리무중</b>（五里雾中）· <b>유비무환</b>（有备无患）· <b>설상가상</b>（雪上加霜）· <b>고진감래</b>（苦尽甘来）· <b>다다익선</b>（多多益善）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>坏转好 vs 好转坏</b><br>
    ・전화위복 / 고진감래 → 坏事最终变好<br>
    <span style="color:#89756e">실패가 전화위복이 되었어요.</span><br>
    ・설상가상 → 坏事再叠坏事<br>
    <span style="color:#89756e">설상가상으로 폭우까지 왔어요.</span>
  </div>
</div>`,
    compareLabel: '坏转好 vs 更坏',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">사자성어（2）事态因果</div>
  <div style="font-size:14px;color:#89756e">书面高级表达</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">6 大成语</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      전화위복 → 因祸得福<br>
      오리무중 → 五里雾中<br>
      유비무환 → 有备无患<br>
      설상가상 → 雪上加霜<br>
      고진감래 → 苦尽甘来<br>
      다다익선 → 多多益善
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">설상가상이 폭우</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">설상가상으로 폭우</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">유비무환하게 준비</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">유비무환의 자세로 준비</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P28 综合练习 ──────────────────────────────────────
  {
    id: 'card-p30-l09',
    partNumber: 30,
    lessonNumber: 9,
    title: 'P30 综合练习', english: 'P30 Comprehensive Practice',
    isPractice: true,
    whatItDoes: '惯用语综合', english: 'Comprehensive Idioms',
    whatItDoesBody: '本课综合 P30 全部 8 类惯用语/成语：눈/손/발/마음/입/머리 六大身体部位 + 12 个 사자성어。综合考察含义与助词搭配。', english: 'This lesson covers all 8 types of idioms/idiomatic expressions from P30: six body parts (눈/손/발/마음/입/머리) plus 12 four-character idioms (사자성어). It tests both meaning and particle usage comprehensively.',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P30 综合练习', english: 'P30 Comprehensive Practice',
      body: '综合本章所有惯用语和成语',
      questions: [
        {
          prompt: '"민수는 눈이 너무 높아요." 的意思是？',
          options: ['个子高', '眼光挑剔', '视力好', '眼睛长得高'],
          answer: 1,
          explanation: '눈이 높다 = 眼光挑剔。',
        },
        {
          prompt: '"엄마는 손이 크세요." 意味着？',
          options: ['手长得大', '大方 / 慷慨', '手灵巧', '手长'],
          answer: 1,
          explanation: '손이 크다 = 大方。',
        },
        {
          prompt: '"민수는 발이 넓어요." 什么意思？',
          options: ['脚长得宽', '人脉广', '跑得快', '走路稳'],
          answer: 1,
          explanation: '발이 넓다 = 人脉广。',
        },
        {
          prompt: '이 옷이 정말 (마음) 들어요.',
          options: ['이', '을', '에', '으로'],
          answer: 2,
          explanation: '固定搭配 마음에 들다，助词是 -에。',
        },
        {
          prompt: '유학 가기로 (마음) 먹었어요.',
          options: ['이', '을', '에', '으로'],
          answer: 1,
          explanation: '"下决心"是 마음을 먹다，助词是 -을。',
        },
        {
          prompt: '"민수는 입이 무거워요." 什么意思？',
          options: ['嘴巴大', '嘴严 / 守口如瓶', '不爱吃', '嘴唇厚'],
          answer: 1,
          explanation: '입이 무겁다 = 守口如瓶。',
        },
        {
          prompt: '"팀원들이 머리를 맞대고 논의했어요." 什么意思？',
          options: ['头顶碰头顶', '碰头 / 共同商量', '打架', '各自思考'],
          answer: 1,
          explanation: '머리를 맞대다 = 聚在一起共同商量。',
        },
        {
          prompt: '"这次旅行既观光又学习" 最贴切成语？',
          options: ['자업자득', '일석이조', '어부지리', '동병상련'],
          answer: 1,
          explanation: '"一举两得"是 일석이조。',
        },
        {
          prompt: '"失败反而带来好事" 最贴切成语？',
          options: ['설상가상', '전화위복', '자업자득', '오리무중'],
          answer: 1,
          explanation: '"因祸得福"是 전화위복。',
        },
        {
          prompt: '"迟到又下大雨" 最贴切成语？',
          options: ['전화위복', '고진감래', '설상가상', '다다익선'],
          answer: 2,
          explanation: '"雪上加霜"是 설상가상。',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p30-l01',
      'card-p30-l02',
      'card-p30-l03',
      'card-p30-l04',
      'card-p30-l05',
      'card-p30-l06',
      'card-p30-l07',
      'card-p30-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P30 惯用语与四字表达总结</div>
  <div style="font-size:14px;color:#89756e">6 大身体部位 + 12 个成语</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">身体部位惯用语</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      눈 → 视觉/评价（눈이 높다, 눈에 밟히다, 눈 밖에 나다）<br>
      손 → 做事/参与（손이 크다, 손을 씻다）<br>
      발 → 人脉/脱身（발이 넓다, 발을 빼다）<br>
      마음/가슴 → 决心/情感（마음에 들다, 가슴이 뭉클하다）<br>
      입/말 → 保密/说话（입이 무겁다, 말을 아끼다）<br>
      머리 → 思考/合作（머리를 굴리다, 머리를 맞대다）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">四字成语（사자성어）</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      情感态度：일석이조 · 동병상련 · 십시일반 · 어부지리 · 자업자득 · 우유부단<br>
      事态因果：전화위복 · 오리무중 · 유비무환 · 설상가상 · 고진감래 · 다다익선
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">要点</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 惯用语的字面翻译几乎无用，必须整体记<br>
      2. 助词固定，误用 이/가 或 을/를 会破坏语义<br>
      3. 四字成语多做名词，与 이다/하다/으로 搭配<br>
      4. 형용사性成语（우유부단）用 -하다，别用 이다（우유부단이에요 ✗）<br>
      5. 掌握本章后，能进入韩语"生活语/新闻语"层次
    </div>
  </div>
</div>`,
  },
];
