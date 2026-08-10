import type { GrammarCard } from '@/types';

export const grammarCardsP30: GrammarCard[] = [
  // ── 第1课：눈 관용어 ──────────────────────────────────────
  {
    id: 'card-p30-l01',
    partNumber: 30,
    lessonNumber: 1,
    title: '눈 관용어',
    whatItDoes: '眼睛惯用语', whatItDoesEn: 'Eye Idioms',
    whatItDoesBody: '韩语里"눈（眼睛）"的惯用语最多、最活。掌握 눈이 높다（眼光高）、눈에 밟히다（挂在眼前）、눈 밖에 나다（失宠）、눈이 빠지다（望眼欲穿）等，是从"考试韩语"进入"生活韩语"的分水岭。', whatItDoesBodyEn: 'In Korean, idioms using "눈 (eye)" are the most numerous and lively. Mastering ones like 눈이 높다 (having high standards), 눈에 밟히다 (to be on one\'s mind), 눈 밖에 나다 (to fall out of favor), and 눈이 빠지다 (to wait eagerly) is a turning point from "exam Korean" to "everyday Korean."',
    structureNote: '눈 + 助词 + 动词/形容词｜熟词组，语义与字面常不一致', structureNoteEn: '눈 + particle + verb/adjective | Fixed phrases; meaning often differs from the literal',
    rulesNote: '눈이 높다 眼光高 / 눈에 밟히다 挂心上 / 눈 밖에 나다 失宠 / 눈이 빠지다 望穿眼 / 눈감아 주다 睁一眼闭一眼', rulesNoteEn: '눈이 높다 to have high standards / 눈에 밟히다 to be on one\'s mind / 눈 밖에 나다 to fall out of favor / 눈이 빠지다 to wait eagerly / 눈감아 주다 to turn a blind eye',
    structures: [
      {
        ko: '민수는 눈이 너무 높아서 아직도 결혼을 못 했어요.',
        zh: '民秀眼光太高，到现在还没结婚。', zhEn: 'Minsu has high standards, so he still hasn\'t married.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '눈이 너무 높아서', role: 'verb' },
          { text: '아직도', role: 'time' },
          { text: '결혼을 못 했어요', role: 'verb' },
        ],
      },
      {
        ko: '아이 얼굴이 자꾸 눈에 밟혀요.',
        zh: '孩子的脸总是浮现在眼前。', zhEn: 'The child\'s face keeps appearing before my eyes.',
        tokens: [
          { text: '아이 얼굴이', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '눈에 밟혀요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 실수를 자주 해서 상사 눈 밖에 났어요.',
        zh: '最近老失误，被上司嫌弃了。', zhEn: 'I keep making mistakes lately, and my boss is fed up with me.',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '실수를 자주 해서', role: 'plain' },
          { text: '상사 눈 밖에 났어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '눈이 높다 → 眼光高 / 挑剔', textEn: '눈이 높다 → high standards / picky', examples: '민수는 눈이 너무 높아서 결혼을 못 해요.（民秀眼光太高，所以结不了婚。）', examplesEn: '민수는 눈이 너무 높아서 결혼을 못 해요. (Minsu has such high standards that he can\'t get married.)' },
      { type: 'rule', text: '눈에 밟히다 → 挂在眼前 / 忘不掉', textEn: '눈에 밟히다 → lingering in one\'s mind / can\'t forget', examples: '아이 얼굴이 눈에 밟혀요.（孩子的脸总浮现在眼前，让人挂念。）', examplesEn: 'The child\'s face keeps coming to mind, making me worry.' },
      { type: 'rule', text: '눈 밖에 나다 → 失宠 / 招人嫌', textEn: '눈 밖에 나다 → Fall out of favor / Get on someone\'s bad side', examples: '상사 눈 밖에 나면 승진하기 어려워요.（一旦被上司厌弃，就很难升职。）', examplesEn: 'If you fall out of favor with your boss, it\'s hard to get promoted.' },
      { type: 'rule', text: '눈이 빠지다 → 望眼欲穿', textEn: '눈이 빠지다 → Wait with bated breath', examples: '눈이 빠지게 기다렸어요.（望眼欲穿地等了很久。）', examplesEn: 'I waited with bated breath for a long time.' },
      { type: 'rule', text: '눈감아 주다 → 睁一眼闭一眼', textEn: '눈감아 주다 → Turn a blind eye', examples: '이번 한 번만 눈감아 주세요.（这一次就请您睁一只眼闭一只眼，通融一下吧。）', examplesEn: 'Please just turn a blind eye this once.' },
      { type: 'usage', text: '눈살을 찌푸리다 → 皱眉 / 反感', textEn: '눈살을 찌푸리다 → Frown / Take offense', examples: '그 행동에 사람들이 눈살을 찌푸렸어요.（那个举动让大家皱起眉头，很反感。）', examplesEn: 'That behavior made people frown in disapproval.' },
      { type: 'usage', text: '눈치 → 察言观色的能力', textEn: '눈치 → Ability to read the room', examples: '눈치가 빠르다（脑子快）/ 눈치를 보다（看脸色）', examplesEn: '눈치가 빠르다 (Quick-witted) / 눈치를 보다 (Read the room)' },
      { type: 'note', text: '这些是固定搭配，不能拆开或改助词', textEn: 'These are fixed expressions; you can\'t break them apart or change the particles.', examples: '误：눈은 높다 / 正：눈이 높다', examplesEn: 'Wrong: 눈은 높다 / Correct: 눈이 높다' },
      { type: 'vocab', text: '눈치 是中文没有精准对应词的文化概念，接近"眼力见儿、看气氛的能力"。三个高频搭配要整体记：눈치가 빠르다（机灵、会看眼色）· 눈치가 없다（不懂看气氛）· 눈치를 보다（看人脸色、揣摩心思）', textEn: '눈치 is a cultural concept with no exact Chinese equivalent, close to "social awareness, ability to read the atmosphere." Memorize these three high-frequency collocations as a whole: 눈치가 빠르다 (quick-witted, good at reading cues) · 눈치가 없다 (oblivious to the mood) · 눈치를 보다 (watch someone\'s face, gauge their thoughts)', examples: '민수는 눈치가 빨라요.（民秀很会看眼色，机灵。）', examplesEn: 'Minsu is quick on the uptake.' },
      { type: 'note', text: '눈이 빠지다 几乎不单独用，固定为副词形"눈이 빠지게 + 기다리다/찾다"，表"望眼欲穿地等/找"', textEn: '눈이 빠지다 is rarely used alone; it\'s fixed as the adverbial form "눈이 빠지게 + 기다리다/찾다," meaning "wait/search with bated breath."', examples: '눈이 빠지게 기다렸어요.（望眼欲穿地等了很久。）', examplesEn: 'I waited with bated breath for a long time.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '눈이 너무 높아서', role: 'verb' },
          { text: '결혼을 못 했어요', role: 'verb' },
        ],
        zh: '民秀眼光太高。', zhEn: 'Minsu has high standards.',
        swapWords: ['민수', '언니', '동생', '친구'],
      },
      {
        wordBlocks: [
          { text: '아이 얼굴이', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '눈에 밟혀요', role: 'verb' },
        ],
        zh: '孩子脸挂在眼前。', zhEn: 'The child\'s face lingers before my eyes.',
        swapWords: ['얼굴', '모습', '표정', '눈빛'],
      },
      {
        wordBlocks: [
          { text: '이번 한 번만', role: 'plain' },
          { text: '눈감아 주세요', role: 'verb' },
        ],
        zh: '这次就睁一眼闭一眼。', zhEn: 'Let\'s just turn a blind eye this time.',
        swapWords: ['눈감아 주다', '봐주다', '넘어가다', '용서하다'],
      },
    ],
    scenarios: [
      { icon: '👀', context: '眼光高', contextEn: 'High standards', ko: '민수는 눈이 너무 높아요.', zh: '民秀眼光太高。', zhEn: 'Minsu has high standards.' },
      { icon: '💭', context: '挂心上', contextEn: 'Weigh on one\'s mind', ko: '아이 얼굴이 눈에 밟혀요.', zh: '孩子的脸浮现眼前。', zhEn: 'The child\'s face comes to mind.' },
      { icon: '😤', context: '失宠', contextEn: 'Fall out of favor', ko: '상사 눈 밖에 났어요.', zh: '被上司嫌弃了。', zhEn: 'Got on the boss\'s bad side.' },
      { icon: '⏳', context: '望眼欲穿', contextEn: 'Wait with bated breath', ko: '눈이 빠지게 기다렸어요.', zh: '望眼欲穿等待。', zhEn: 'Waiting with eager anticipation.' },
      { icon: '🤫', context: '通融', contextEn: 'to make an exception', ko: '이번 한 번만 눈감아 주세요.', zh: '这次通融一下。', zhEn: 'Make an exception this time.' },
      { icon: '🎯', context: '察言观色', contextEn: 'to read the room', ko: '민수는 눈치가 빨라요.', zh: '民秀特会察言观色。', zhEn: 'Minsu is really good at reading the room.' },
    ],
    mistakes: [
      { wrong: '민수는 눈은 높아요', correct: '민수는 눈이 높아요', note: '固定搭配是 눈이 높다，不用 눈은', noteEn: 'The fixed expression is 눈이 높다, not 눈은.' },
      { wrong: '아이가 눈에 밟혀요', correct: '아이 얼굴이 눈에 밟혀요', note: '主语通常是"具体形象"如脸/身影，不是"人本身"', noteEn: 'The subject is usually a specific image like a face or figure, not the person themselves.' },
      { wrong: '눈이 감아 주세요', correct: '눈감아 주세요', note: '固定组合 눈감아 주다，不加 이/가', noteEn: 'The fixed combination is 눈감아 주다, without 이/가.' },
    ],
    quickTable: {
      title: '눈 관용어 速查', titleEn: 'Eye Idioms Quick Reference',
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
      title: '눈 관용어 练习', titleEn: 'Eye Idioms Practice',
      body: '选择正确含义', bodyEn: 'Choose the correct meaning.',
      questions: [
        {
          prompt: '"민수는 눈이 너무 높아요." 的意思是？', promptEn: 'What does "민수는 눈이 너무 높아요." mean?',
          options: ['个子很高', '眼光挑剔 / 要求高', '眼睛长得高', '看得很远'],
          answer: 1,
          explanation: '눈이 높다 是"眼光高/挑剔"，与身高无关。', explanationEn: '눈이 높다 means "having high standards/being picky," and has nothing to do with height.',
        },
        {
          prompt: '"아이 얼굴이 눈에 밟혀요." 的意思是？', promptEn: 'What does "아이 얼굴이 눈에 밟혀요." mean?',
          options: ['孩子踩到眼睛', '孩子的脸总是浮现在心头 / 挂念', '孩子长得像我', '看不见孩子'],
          answer: 1,
          explanation: '눈에 밟히다 = 想忘也忘不掉的挂念感。', explanationEn: '눈에 밟히다 = a lingering feeling you can\'t forget no matter how hard you try.',
        },
        {
          prompt: '"이번 한 번만 눈감아 주세요." 表达什么？', promptEn: 'What does "이번 한 번만 눈감아 주세요." express?',
          options: ['请闭上眼睛', '请通融一次 / 装作没看见', '请闭目养神', '请打瞌睡'],
          answer: 1,
          explanation: '눈감아 주다 = 睁一眼闭一眼 / 通融不追究。', explanationEn: '눈감아 주다 = to turn a blind eye / to let it slide without consequences.',
        },
        {
          prompt: '"상사 눈 밖에 났어요." 什么意思？', promptEn: 'What does "상사 눈 밖에 났어요." mean?',
          options: ['离开了上司的视线', '被上司嫌弃 / 失宠', '和上司分道扬镳', '成了上司眼中钉'],
          answer: 1,
          explanation: '눈 밖에 나다 = 失去某人的信任/好感。', explanationEn: '눈 밖에 나다 = to lose someone\'s trust/favor.',
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
    compareLabel: '字面 vs 惯用', compareLabelEn: 'Literal vs. Idiomatic',
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
    whatItDoes: '手 惯用语', whatItDoesEn: 'Hand Idioms',
    whatItDoesBody: '"손（手）"的惯用语大多与"做事、参与、慷慨、放弃"相关：손이 크다（大方）、손을 씻다（洗手不干）、손을 놓다（放手不管）、손이 모자라다（人手不够）、손을 대다（插手/开始动手）。', whatItDoesBodyEn: 'Idioms with "손 (hand)" mostly relate to doing things, participating, being generous, or giving up: 손이 크다 (to be generous), 손을 씻다 (to wash one\'s hands of something), 손을 놓다 (to let go), 손이 모자라다 (to be short-handed), and 손을 대다 (to get involved/start).',
    structureNote: '손 + 助词 + 动词｜多表"做事/参与/放弃"', structureNoteEn: '손 + particle + verb | Often expresses doing/participating/giving up',
    rulesNote: '손이 크다 大方 / 손을 씻다 洗手不干 / 손을 놓다 放手不管 / 손이 모자라다 人手不够 / 손을 대다 开始动手', rulesNoteEn: '손이 크다 to be generous / 손을 씻다 to wash one\'s hands of / 손을 놓다 to let go / 손이 모자라다 to be short-handed / 손을 대다 to get involved',
    structures: [
      {
        ko: '엄마는 손이 크셔서 늘 음식을 많이 하세요.',
        zh: '妈妈很大方，做饭总是很多。', zhEn: 'Mom is very generous and always cooks a lot.',
        tokens: [
          { text: '엄마는', role: 'subject' },
          { text: '손이 크셔서', role: 'verb' },
          { text: '늘', role: 'time' },
          { text: '음식을 많이 하세요', role: 'verb' },
        ],
      },
      {
        ko: '이제 그 일에서 완전히 손을 씻었어요.',
        zh: '我彻底和那件事洗手不干了。', zhEn: 'I\'ve completely washed my hands of that matter.',
        tokens: [
          { text: '이제', role: 'time' },
          { text: '그 일에서', role: 'place' },
          { text: '완전히', role: 'plain' },
          { text: '손을 씻었어요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 일이 너무 많아서 손이 모자라요.',
        zh: '最近事太多，人手不够。', zhEn: 'There\'s too much going on lately; we\'re short on hands.',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '일이 너무 많아서', role: 'plain' },
          { text: '손이 모자라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '손이 크다 → 大方 / 手大', textEn: '손이 크다 → generous / big-handed', examples: '엄마는 손이 크셔서 음식을 많이 하세요.（妈妈很大方，做饭总是做得很多。）', examplesEn: '엄마는 손이 크셔서 음식을 많이 하세요. (Mom is very generous and always cooks a lot.)' },
      { type: 'rule', text: '손을 씻다 → 洗手不干 / 金盆洗手', textEn: '손을 씻다 → to wash one\'s hands of / to quit for good', examples: '이제 그 일에서 손을 씻었어요.（现在我已经从那件事里金盆洗手了。）', examplesEn: '이제 그 일에서 손을 씻었어요. (I\'ve now washed my hands of that matter for good.)' },
      { type: 'rule', text: '손을 놓다 → 放手不管 / 停手', textEn: 'Let go of / stop doing something', examples: '한동안 일에서 손을 놓고 쉬었어요.（有一阵子放下工作休息了。）', examplesEn: 'I took a break from work for a while.' },
      { type: 'rule', text: '손이 모자라다 → 人手不够', textEn: 'Short on hands / understaffed', examples: '주말이라 손이 모자라요.（因为是周末，所以人手不够。）', examplesEn: 'It\'s the weekend, so we\'re short on hands.' },
      { type: 'rule', text: '손을 대다 → 开始动手 / 插手', textEn: 'Start working on / get involved', examples: '이 일에는 아직 손을 대지 않았어요.（这件事我还没着手去做。）', examplesEn: 'I haven\'t started on this yet.' },
      { type: 'usage', text: '손을 잡다 → 携手合作', textEn: 'Join hands / cooperate', examples: '두 회사가 손을 잡고 새 프로젝트를 시작했어요.（两家公司携手合作，启动了新项目。）', examplesEn: 'The two companies joined hands and started a new project.' },
      { type: 'usage', text: '손사래를 치다 → 摆手拒绝', textEn: 'Wave hands to refuse', examples: '그는 손사래를 치며 사양했어요.（他连连摆手，婉言谢绝了。）', examplesEn: 'He waved his hands and politely declined.' },
      { type: 'note', text: '손이 크다 与身体无关，指心胸开阔/做事大方', textEn: '손이 크다 has nothing to do with the body; it means generous/open-hearted', examples: '误：손이 커요 = 手长得大 / 正：손이 커요 = 大方/爱送人', examplesEn: 'Wrong: 손이 커요 = big hands / Right: 손이 커요 = generous/likes to give' },
      { type: 'note', text: '负迁移警告：손이 크다 是纯褒义的"大方、出手阔绰、招待人不吝啬"，别用中文"大手大脚（浪费钱）"的贬义去理解。夸主人做菜多、送礼大方就说 손이 크다', textEn: 'Negative transfer warning: 손이 크다 is purely positive, meaning \'generous, lavish, not stingy in hosting.\' Don\'t interpret it with the negative Chinese meaning of \'wasteful.\' Praise someone for cooking a lot or giving generously by saying 손이 크다.', examples: '엄마는 손이 크셔서 늘 음식을 많이 하세요.（妈妈很大方，做饭总是很多。）', examplesEn: 'Mom is generous, so she always cooks a lot.' },
      { type: 'compare', text: '손을 씻다 vs 손을 놓다：都像"停手"，但语感不同。손을 씻다 = 从坏事/纠纷里彻底金盆洗手，带道德色彩、不再回头；손을 놓다 = 暂时放下手中的活儿去歇一歇，中性、可以再拿起来', textEn: '손을 씻다 vs 손을 놓다: Both mean \'stop,\' but the nuance differs. 손을 씻다 = to completely quit something bad or a dispute, with moral overtones, never looking back; 손을 놓다 = to temporarily put down work to rest, neutral, can pick it up again.', examples: '그 일에서 손을 씻었어요.（那件事金盆洗手了。）↔ 한동안 일에서 손을 놓고 쉬었어요.（有一阵子放下工作休息了。）', examplesEn: 'I washed my hands of that matter. ↔ I took a break from work for a while.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마는', role: 'subject' },
          { text: '손이 크셔서', role: 'verb' },
          { text: '음식을 많이 하세요', role: 'verb' },
        ],
        zh: '妈妈大方，做很多菜。', zhEn: 'Mom is generous and cooks a lot.',
        swapWords: ['엄마', '할머니', '이모', '언니'],
      },
      {
        wordBlocks: [
          { text: '이제', role: 'time' },
          { text: '그 일에서', role: 'place' },
          { text: '손을 씻었어요', role: 'verb' },
        ],
        zh: '和那件事金盆洗手。', zhEn: 'Washed hands of that matter.',
        swapWords: ['손을 씻다', '발을 빼다', '그만두다', '떠나다'],
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '일이 너무 많아서', role: 'plain' },
          { text: '손이 모자라요', role: 'verb' },
        ],
        zh: '事太多人手不够。', zhEn: 'Too much work, not enough hands.',
        swapWords: ['모자라다', '부족하다', '없다', '없어요'],
      },
    ],
    scenarios: [
      { icon: '🍲', context: '大方', contextEn: 'Generous', ko: '엄마는 손이 크셔서 음식을 많이 하세요.', zh: '妈妈大方做很多菜。', zhEn: 'Mom is generous and cooks a lot.' },
      { icon: '🚫', context: '金盆洗手', contextEn: 'Wash hands of', ko: '그 일에서 손을 씻었어요.', zh: '那件事金盆洗手了。', zhEn: 'Washed hands of that matter.' },
      { icon: '😴', context: '放手', contextEn: 'Let go', ko: '한동안 일에서 손을 놓고 쉬었어요.', zh: '暂时放下工作休息。', zhEn: 'Temporarily put down work and rest.' },
      { icon: '🙏', context: '人手不够', contextEn: 'Short on hands', ko: '주말이라 손이 모자라요.', zh: '周末人手不够。', zhEn: 'We\'re short on hands this weekend.' },
      { icon: '🤝', context: '合作', contextEn: 'cooperation', ko: '두 회사가 손을 잡고 시작했어요.', zh: '两家公司携手合作。', zhEn: 'The two companies joined hands to cooperate.' },
      { icon: '🖐️', context: '拒绝', contextEn: 'Refuse', ko: '그는 손사래를 치며 사양했어요.', zh: '他摆手推辞。', zhEn: 'He waved his hand to decline.' },
    ],
    mistakes: [
      { wrong: '엄마는 손을 커요', correct: '엄마는 손이 커요', note: '손이 크다 是惯用语（大方），主语助词用 이，不用 을', noteEn: '손이 크다 is an idiom (generous); the subject particle is 이, not 을.' },
      { wrong: '손을 씻고 그 일 다시 시작할래요', correct: '손을 씻고 그 일에서 완전히 떠날래요', note: '손을 씻다 后不能再做同一件事，语义矛盾', noteEn: 'After 손을 씻다, you can\'t do the same thing again—it\'s semantically contradictory.' },
      { wrong: '손이 없어서 힘들어요', correct: '손이 모자라서 힘들어요', note: '"人手不够"用 손이 모자라다，不用 손이 없다', noteEn: 'For "short on hands," use 손이 모자라다, not 손이 없다.' },
    ],
    quickTable: {
      title: '손 관용어 速查', titleEn: 'Hand Idioms Quick Reference',
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
      title: '손 관용어 练习', titleEn: 'Hand Idioms Practice',
      body: '选择正确含义', bodyEn: 'Choose the correct meaning.',
      questions: [
        {
          prompt: '"엄마는 손이 크세요." 的意思是？', promptEn: 'What does "엄마는 손이 크세요." mean?',
          options: ['妈妈手长得大', '妈妈大方 / 慷慨', '妈妈手灵活', '妈妈手臂长'],
          answer: 1,
          explanation: '손이 크다 = 大方/慷慨，与手的物理大小无关。', explanationEn: '손이 크다 = generous; it has nothing to do with the physical size of the hand.',
        },
        {
          prompt: '"그 일에서 손을 씻었어요." 表达什么？', promptEn: 'What does "그 일에서 손을 씻었어요." express?',
          options: ['把手洗干净了', '开始做那件事', '彻底不再做那件事 / 金盆洗手', '换个人做'],
          answer: 2,
          explanation: '손을 씻다 = 彻底脱离某事，多指停止不良行为。', explanationEn: '손을 씻다 = to completely detach from something, often meaning to stop a bad habit.',
        },
        {
          prompt: '"손이 모자라요." 什么意思？', promptEn: 'What does "손이 모자라요." mean?',
          options: ['手不够长', '人手不足', '手指不够', '手工不够好'],
          answer: 1,
          explanation: '손이 모자라다 = 干活的人手不够。', explanationEn: '손이 모자라다 = not enough hands to do the work.',
        },
        {
          prompt: '"두 회사가 손을 잡았어요." 意味着？', promptEn: 'What does "두 회사가 손을 잡았어요." mean?',
          options: ['两家公司握手', '两家公司敌对', '两家公司合作 / 结盟', '两家公司分手'],
          answer: 2,
          explanation: '손을 잡다 = 携手合作 / 结盟。', explanationEn: '손을 잡다 = to join hands / form an alliance.',
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
    compareLabel: '大方 vs 小气', compareLabelEn: 'Generous vs stingy',
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
    whatItDoes: '脚 惯用语', whatItDoesEn: 'Foot Idioms',
    whatItDoesBody: '"발（脚）"的惯用语多围绕"人脉、参与、脱身"：발이 넓다（人脉广）、발 벗고 나서다（挺身而出）、발을 빼다（抽身脱离）、발이 묶이다（被困住）、발 뻗고 자다（安心睡）。', whatItDoesBodyEn: 'Idioms with "발 (foot)" often revolve around connections, participation, and getting away: 발이 넓다 (to have a wide network), 발 벗고 나서다 (to step forward), 발을 빼다 (to pull out), 발이 묶이다 (to be tied up), and 발 뻗고 자다 (to sleep soundly).',
    structureNote: '발 + 助词 + 动词｜多表"人脉/参与/脱身/被困"', structureNoteEn: '발 + particle + verb | Often expresses connections/participation/escaping/being stuck',
    rulesNote: '발이 넓다 人脉广 / 발 벗고 나서다 挺身而出 / 발을 빼다 抽身 / 발이 묶이다 被困 / 발 뻗고 자다 安心睡', rulesNoteEn: '발이 넓다 to have a wide network / 발 벗고 나서다 to step forward / 발을 빼다 to pull out / 발이 묶이다 to be tied up / 발 뻗고 자다 to sleep soundly',
    structures: [
      {
        ko: '민수는 발이 넓어서 아는 사람이 많아요.',
        zh: '民秀人脉广，认识的人多。', zhEn: 'Min-su has a wide network and knows many people.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '발이 넓어서', role: 'verb' },
          { text: '아는 사람이 많아요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 어려울 때 발 벗고 나서 줬어요.',
        zh: '朋友有难时挺身而出。', zhEn: 'Step up when a friend is in trouble.',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '어려울 때', role: 'time' },
          { text: '발 벗고 나서 줬어요', role: 'verb' },
        ],
      },
      {
        ko: '이 프로젝트에서는 이미 발을 뺐어요.',
        zh: '这个项目我已经抽身了。', zhEn: 'I\'ve already pulled out of this project.',
        tokens: [
          { text: '이 프로젝트에서는', role: 'place' },
          { text: '이미', role: 'time' },
          { text: '발을 뺐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '발이 넓다 → 人脉广 / 交际广', textEn: '발이 넓다 → well-connected / sociable', examples: '민수는 발이 넓어서 도움을 잘 받아요.（民秀人脉广，所以很容易得到帮助。）', examplesEn: 'Min-su is well-connected, so he easily gets help.' },
      { type: 'rule', text: '발 벗고 나서다 → 挺身而出 / 卖力帮忙', textEn: '발 벗고 나서다 → to step up / pitch in eagerly', examples: '친구를 위해 발 벗고 나섰어요.（为了朋友挺身而出，全力相助。）', examplesEn: 'I stepped up and gave my all for my friend.' },
      { type: 'rule', text: '발을 빼다 → 抽身 / 脱离', textEn: '발을 빼다 → to pull out / withdraw', examples: '위험한 일에서 발을 뺐어요.（从危险的事情里抽身退出了。）', examplesEn: 'I pulled out of the dangerous situation.' },
      { type: 'rule', text: '발이 묶이다 → 被困 / 走不了', textEn: '발이 묶이다 → Stuck / Can\'t leave', examples: '눈이 많이 와서 공항에서 발이 묶였어요.（因为下大雪，被困在机场走不了。）', examplesEn: '눈이 많이 와서 공항에서 발이 묶였어요. (Because of heavy snow, I was stuck at the airport and couldn\'t leave.)' },
      { type: 'rule', text: '발 뻗고 자다 → 安心睡 / 无忧无虑', textEn: '발 뻗고 자다 → Sleep peacefully / Carefree', examples: '일 다 끝내고 발 뻗고 자요.（把事情都做完，安心地睡个好觉。）', examplesEn: '일 다 끝내고 발 뻗고 자요. (After finishing everything, I sleep peacefully.)' },
      { type: 'usage', text: '발 디딜 틈 없다 → 挤得没落脚地', textEn: '발 디딜 틈 없다 → So crowded there\'s no room to stand', examples: '지하철이 발 디딜 틈 없이 붐볐어요.（地铁挤得没有落脚的地方。）', examplesEn: '지하철이 발 디딜 틈 없이 붐볐어요. (The subway was so crowded there was no room to stand.)' },
      { type: 'usage', text: '발등에 불이 떨어지다 → 火烧眉毛', textEn: '발등에 불이 떨어지다 → A matter of urgency / Critical', examples: '내일이 마감이라 발등에 불이 떨어졌어요.（明天就是截止日期，真是火烧眉毛了。）', examplesEn: '내일이 마감이라 발등에 불이 떨어졌어요. (The deadline is tomorrow, so it\'s urgent.)' },
      { type: 'note', text: '"발이 넓다" ≠ 脚长得宽；指人脉广', textEn: '"발이 넓다" ≠ Feet are wide; means well-connected', examples: '误：脚长得宽 / 正：交际广', examplesEn: 'Wrong: Feet are wide / Correct: Well-connected' },
      { type: 'compare', text: '발을 빼다 vs 손을 놓다：中文都可说"抽身/撒手"，但韩语分工严格。발을 빼다 = 从已经参与的事情或关系里退出、脱身（强调"不再牵扯其中"）；손을 놓다 = 停下手里正做的活、松手不再照管（强调"停止动作"）。抽身脱离用脚，停手放下用手，不能互换', textEn: '발을 빼다 vs 손을 놓다: Both can mean "pull out/let go" in Chinese, but Korean distinguishes strictly. 발을 빼다 = withdraw from an involvement or relationship (emphasizing no longer being part of it); 손을 놓다 = stop what you\'re doing, let go of care (emphasizing stopping the action). Use feet for withdrawing, hands for letting go—they can\'t be swapped.', examples: '위험한 일에서 발을 뺐어요.（从危险的事情里抽身退出。）↔ 한동안 일에서 손을 놓고 쉬었어요.（放下手头工作休息一阵。）', examplesEn: '위험한 일에서 발을 뺐어요. (I withdrew from the dangerous situation.) ↔ 한동안 일에서 손을 놓고 쉬었어요. (I let go of work and rested for a while.)' },
      { type: 'note', text: '발 벗고 나서다 字面是"脱了鞋光着脚冲出来"，惯用义是"奋不顾身、全力帮忙、挺身而出"。别被 벗고（脱）字面义带偏，它形容的是急切主动的态度', textEn: '발 벗고 나서다 literally means "take off shoes and rush out barefoot," but idiomatically means "devote oneself, help wholeheartedly, step up." Don\'t be misled by the literal meaning of 벗고 (take off); it describes an eager, proactive attitude.', examples: '친구가 어려울 때 발 벗고 나서 줬어요.（朋友有难时挺身而出、全力相助。）', examplesEn: '친구가 어려울 때 발 벗고 나서 줬어요. (When my friend was in trouble, I stepped up and helped wholeheartedly.)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '발이 넓어서', role: 'verb' },
          { text: '아는 사람이 많아요', role: 'verb' },
        ],
        zh: '民秀人脉广。', zhEn: 'Min-su is well-connected.',
        swapWords: ['민수', '팀장님', '언니', '삼촌'],
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '어려울 때', role: 'time' },
          { text: '발 벗고 나서 줬어요', role: 'verb' },
        ],
        zh: '朋友挺身而出。', zhEn: 'A friend stepped up.',
        swapWords: ['발 벗고 나서다', '도와주다', '돕다', '나서다'],
      },
      {
        wordBlocks: [
          { text: '눈이 많이 와서', role: 'plain' },
          { text: '공항에서', role: 'place' },
          { text: '발이 묶였어요', role: 'verb' },
        ],
        zh: '大雪被困机场。', zhEn: 'Stuck at the airport due to heavy snow.',
        swapWords: ['공항', '역', '터미널', '기차역'],
      },
    ],
    scenarios: [
      { icon: '🕸️', context: '人脉广', contextEn: 'Well-connected', ko: '민수는 발이 넓어요.', zh: '民秀人脉广。', zhEn: 'Min-su is well-connected.' },
      { icon: '💪', context: '挺身而出', contextEn: 'Step up', ko: '친구가 발 벗고 나서 줬어요.', zh: '朋友挺身而出。', zhEn: 'A friend stepped up.' },
      { icon: '🚪', context: '抽身', contextEn: 'Withdraw', ko: '위험한 일에서 발을 뺐어요.', zh: '从危险事抽身。', zhEn: 'Withdrew from a dangerous situation.' },
      { icon: '❄️', context: '被困', contextEn: 'Stuck', ko: '공항에서 발이 묶였어요.', zh: '被困机场。', zhEn: 'Stuck at the airport.' },
      { icon: '😴', context: '安心睡', contextEn: 'Sleep peacefully', ko: '일 다 끝내고 발 뻗고 자요.', zh: '事情做完安心睡。', zhEn: 'Sleep peacefully after finishing things.' },
      { icon: '🔥', context: '火烧眉毛', contextEn: 'extremely urgent', ko: '발등에 불이 떨어졌어요.', zh: '火烧眉毛了。', zhEn: 'It\'s extremely urgent.' },
    ],
    mistakes: [
      { wrong: '민수는 발이 커서 인기가 많아요', correct: '민수는 발이 넓어서 인기가 많아요', note: '"人脉广"是 발이 넓다，不是 발이 크다', noteEn: '"Well-connected" is 발이 넓다, not 발이 크다.' },
      { wrong: '이 일에서 발을 놓았어요', correct: '이 일에서 발을 뺐어요', note: '"抽身"用 발을 빼다，不用 발을 놓다（那是 손을 놓다）', noteEn: '"To extricate oneself" uses 발을 빼다, not 발을 놓다 (that\'s 손을 놓다).' },
      { wrong: '눈이 와서 발이 잡혔어요', correct: '눈이 와서 발이 묶였어요', note: '"被困"固定用 발이 묶이다', noteEn: '"To be stuck" is always 발이 묶이다.' },
    ],
    quickTable: {
      title: '발 관용어 速查', titleEn: 'Foot Idioms Quick Reference',
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
      title: '발 관용어 练习', titleEn: 'Foot Idioms Practice',
      body: '选择正确含义', bodyEn: 'Choose the correct meaning.',
      questions: [
        {
          prompt: '"민수는 발이 넓어요." 的意思是？', promptEn: 'What does "민수는 발이 넓어요." mean?',
          options: ['脚长得宽', '人脉广 / 认识的人多', '走路快', '足弓宽'],
          answer: 1,
          explanation: '발이 넓다 = 人脉广。', explanationEn: '발이 넓다 = well-connected.',
        },
        {
          prompt: '"이 일에서 발을 뺐어요." 表达什么？', promptEn: 'What does "이 일에서 발을 뺐어요." express?',
          options: ['把脚抽出来', '从这事里抽身/退出', '这事没做成', '把腿伸出来'],
          answer: 1,
          explanation: '발을 빼다 = 抽身 / 脱离某事。', explanationEn: '발을 빼다 = to extricate oneself / to pull out of something.',
        },
        {
          prompt: '"눈이 와서 공항에서 발이 묶였어요." 什么意思？', promptEn: 'What does "눈이 와서 공항에서 발이 묶였어요." mean?',
          options: ['脚被绳子绑住', '因大雪被困在机场走不了', '在机场被逮捕', '在机场滑倒'],
          answer: 1,
          explanation: '발이 묶이다 = 因外部原因被困原地。', explanationEn: '발이 묶이다 = to be stuck in place due to external reasons.',
        },
        {
          prompt: '"발등에 불이 떨어졌어요." 意味着？', promptEn: 'What does "발등에 불이 떨어졌어요." mean?',
          options: ['脚背烫伤', '事情十万火急 / 火烧眉毛', '不小心踩到火', '开始跑'],
          answer: 1,
          explanation: '발등에 불이 떨어지다 = 事情紧迫 / 火烧眉毛。', explanationEn: '발등에 불이 떨어지다 = urgent / extremely pressing.',
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
    compareLabel: '参与 vs 脱离', compareLabelEn: 'Participate vs. Withdraw',
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
    whatItDoes: '心 惯用语', whatItDoesEn: 'Heart Idioms',
    whatItDoesBody: '"마음（心/心情）"和"가슴（胸/心窝）"是韩语情感表达的两大核心：마음에 들다（喜欢/合心意）、마음을 먹다（下决心）、가슴이 아프다（心痛）、가슴이 뭉클하다（感动）、가슴에 새기다（铭记于心）。', whatItDoesBodyEn: '"마음 (heart/mind)" and "가슴 (chest/heart)" are the two cores of emotional expression in Korean: 마음에 들다 (to like), 마음을 먹다 (to make up one\'s mind), 가슴이 아프다 (to be heartbroken), 가슴이 뭉클하다 (to be moved), and 가슴에 새기다 (to engrave in one\'s heart).',
    structureNote: '마음/가슴 + 助词 + 动词/形容词｜表情感/决心', structureNoteEn: '마음/가슴 + particle + verb/adjective | Expresses emotion/decision',
    rulesNote: '마음에 들다 合心意 / 마음을 먹다 下决心 / 가슴이 아프다 心痛 / 가슴이 뭉클하다 感动 / 가슴에 새기다 铭记', rulesNoteEn: '마음에 들다 to one\'s liking / 마음을 먹다 to make up one\'s mind / 가슴이 아프다 heartache / 가슴이 뭉클하다 to be moved / 가슴에 새기다 to engrave in one\'s heart',
    structures: [
      {
        ko: '이 옷이 정말 마음에 들어요.',
        zh: '这件衣服真合我心意。', zhEn: 'This outfit really suits my taste.',
        tokens: [
          { text: '이 옷이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '마음에 들어요', role: 'verb' },
        ],
      },
      {
        ko: '드디어 유학 가기로 마음을 먹었어요.',
        zh: '终于下决心去留学了。', zhEn: 'I finally made up my mind to study abroad.',
        tokens: [
          { text: '드디어', role: 'time' },
          { text: '유학 가기로', role: 'plain' },
          { text: '마음을 먹었어요', role: 'verb' },
        ],
      },
      {
        ko: '그 이야기를 듣고 가슴이 뭉클했어요.',
        zh: '听那故事，心里一阵感动。', zhEn: 'Hearing that story, I felt a wave of emotion.',
        tokens: [
          { text: '그 이야기를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가슴이 뭉클했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '마음에 들다 → 中意 / 合心意', textEn: '마음에 들다 → to like / to be to one\'s liking', examples: '이 옷이 마음에 들어요.（我很中意这件衣服。）', examplesEn: '이 옷이 마음에 들어요. (I really like this outfit.)' },
      { type: 'rule', text: '마음을 먹다 → 下决心', textEn: '마음을 먹다 → to make up one\'s mind', examples: '유학 가기로 마음을 먹었어요.（我下定决心要去留学。）', examplesEn: '유학 가기로 마음을 먹었어요. (I\'ve made up my mind to go study abroad.)' },
      { type: 'rule', text: '가슴이 아프다 → 心痛（同情 / 悲伤）', textEn: '가슴이 아프다 → heartache (sympathy / sadness)', examples: '뉴스를 보고 가슴이 아팠어요.（看了那则新闻，感到心痛。）', examplesEn: '뉴스를 보고 가슴이 아팠어요. (I felt heartache after watching the news.)' },
      { type: 'rule', text: '가슴이 뭉클하다 → 一阵感动 / 鼻酸', textEn: '가슴이 뭉클하다 → to be moved / to feel a lump in one\'s throat', examples: '어머니의 편지에 가슴이 뭉클했어요.（读了母亲的信，心里一阵感动。）', examplesEn: '어머니의 편지에 가슴이 뭉클했어요. (I was deeply moved by my mother\'s letter.)' },
      { type: 'rule', text: '가슴에 새기다 → 铭记于心', textEn: 'Carve into one\'s heart → Remember forever', examples: '선생님 말씀을 가슴에 새겼어요.（把老师的话铭记在心。）', examplesEn: 'I took the teacher\'s words to heart.' },
      { type: 'usage', text: '마음이 놓이다 → 放心 / 心里松一口气', textEn: 'One\'s mind is at ease → Feel relieved', examples: '아이가 안전하다는 말에 마음이 놓였어요.（听说孩子平安，心里就放心了。）', examplesEn: 'I felt relieved to hear that the child is safe.' },
      { type: 'usage', text: '마음이 무겁다 → 心情沉重', textEn: 'One\'s heart is heavy → Feel heavy-hearted', examples: '결과를 기다리는 동안 마음이 무거웠어요.（等待结果的那段时间，心情很沉重。）', examplesEn: 'My heart was heavy while waiting for the results.' },
      { type: 'note', text: '마음 偏向"决心/意愿"；가슴 偏向"情感/感受"', textEn: '마음 leans toward \'determination/will\'; 가슴 leans toward \'emotion/feeling\'', examples: '마음을 먹다（决心）/ 가슴이 뭉클하다（感动）', examplesEn: '마음을 먹다 (make up one\'s mind) / 가슴이 뭉클하다 (be moved)' },
      { type: 'compare', text: '마음에 들다 vs 좋아하다：中文都译"喜欢"，但两点不同。①结构：좋아하다 是"我喜欢它"（人做主语、它用 를）；마음에 들다 是"它合我心"（喜欢的东西做主语、用 이/가，助词固定 마음에）。②语感：마음에 들다 偏一见就中意、合眼缘（常用于第一印象、买东西挑东西）；좋아하다 偏一贯的喜好', textEn: '마음에 들다 vs 좋아하다: Both translate to \'like\' in Chinese, but differ in two ways. ① Structure: 좋아하다 is \'I like it\' (person is subject, it takes 를); 마음에 들다 is \'it suits my heart\' (the liked thing is subject, takes 이/가, with the fixed particle 마음에). ② Nuance: 마음에 들다 leans toward liking at first sight, catching one\'s eye (often used for first impressions, shopping choices); 좋아하다 leans toward a consistent preference.', examples: '이 옷이 마음에 들어요.（这件衣服我一看就中意。）↔ 저는 이 옷을 좋아해요.（我喜欢这件衣服。）', examplesEn: 'This outfit caught my eye right away. ↔ I like this outfit.' },
      { type: 'note', text: '마음을 먹다 里的 먹다 不是"吃"，是"抱定（决心）"的意思，整体记成"下定决心"；口语也常写作一个词 마음먹다', textEn: 'In 마음을 먹다, 먹다 doesn\'t mean \'eat\' but \'hold onto (a resolution)\'; remember the whole as \'make up one\'s mind\'; in speech it\'s often written as one word, 마음먹다.', examples: '드디어 유학 가기로 마음을 먹었어요.（终于下决心去留学了。）', examplesEn: 'I finally made up my mind to study abroad.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '마음에 들어요', role: 'verb' },
        ],
        zh: '这衣服合心意。', zhEn: 'This outfit suits my taste.',
        swapWords: ['옷', '가방', '신발', '색깔'],
      },
      {
        wordBlocks: [
          { text: '드디어', role: 'time' },
          { text: '유학 가기로', role: 'plain' },
          { text: '마음을 먹었어요', role: 'verb' },
        ],
        zh: '终于决心留学。', zhEn: 'Finally resolved to study abroad.',
        swapWords: ['유학', '이직', '결혼', '독립'],
      },
      {
        wordBlocks: [
          { text: '그 이야기를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가슴이 뭉클했어요', role: 'verb' },
        ],
        zh: '听后心里感动。', zhEn: 'Moved after hearing it.',
        swapWords: ['뭉클하다', '따뜻하다', '먹먹하다', '벅차다'],
      },
    ],
    scenarios: [
      { icon: '💕', context: '合心意', contextEn: 'Suits one\'s taste', ko: '이 옷이 마음에 들어요.', zh: '这衣服合心意。', zhEn: 'This outfit suits my taste.' },
      { icon: '💪', context: '下决心', contextEn: 'Make up one\'s mind', ko: '유학 가기로 마음을 먹었어요.', zh: '决心去留学。', zhEn: 'Resolved to study abroad.' },
      { icon: '💔', context: '心痛', contextEn: 'Heartache', ko: '뉴스를 보고 가슴이 아팠어요.', zh: '看新闻心痛。', zhEn: 'Heartbroken watching the news.' },
      { icon: '🥺', context: '感动', contextEn: 'Moved', ko: '편지를 읽고 가슴이 뭉클했어요.', zh: '读信心里感动。', zhEn: 'Moved reading the letter.' },
      { icon: '📝', context: '铭记', contextEn: 'Remember forever', ko: '선생님 말씀을 가슴에 새겼어요.', zh: '把老师的话铭记在心。', zhEn: 'Took the teacher\'s words to heart.' },
      { icon: '😌', context: '放心', contextEn: 'Feel relieved', ko: '아이가 안전해서 마음이 놓였어요.', zh: '孩子安全放心了。', zhEn: 'Relieved that the child is safe.' },
    ],
    mistakes: [
      { wrong: '이 옷이 마음이 들어요', correct: '이 옷이 마음에 들어요', note: '固定搭配是 마음에 들다（助词 -에），不用 -이/가', noteEn: 'The fixed expression is 마음에 들다 (particle -에), not -이/가' },
      { wrong: '유학 가기로 마음이 먹었어요', correct: '유학 가기로 마음을 먹었어요', note: '"下决心"是 마음을 먹다，用 -을', noteEn: '"To make up one\'s mind" is 마음을 먹다, using -을' },
      { wrong: '뉴스를 보고 마음이 아팠어요', correct: '뉴스를 보고 가슴이 아팠어요', note: '"心痛"用 가슴이 아프다 更自然（同情/悲伤）；마음이 아프다 也可但语感偏内心懊悔', noteEn: 'For "heartache," 가슴이 아프다 is more natural (sympathy/sadness); 마음이 아프다 also works but leans toward inner regret' },
    ],
    quickTable: {
      title: '마음 · 가슴 관용어 速查', titleEn: '마음 · 가슴 Idioms Quick Reference',
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
      title: '마음 · 가슴 练习', titleEn: '마음 · 가슴 Practice',
      body: '选择正确的搭配', bodyEn: 'Choose the correct collocation',
      questions: [
        {
          prompt: '이 옷이 정말 (마음) 들어요.',
          options: ['이', '을', '에', '에서'],
          answer: 2,
          explanation: '固定搭配是 마음에 들다，助词是 -에。', explanationEn: 'The fixed expression is 마음에 들다, with the particle -에.',
        },
        {
          prompt: '유학 가기로 (마음) 먹었어요.',
          options: ['이', '을', '에', '으로'],
          answer: 1,
          explanation: '"下决心"是 마음을 먹다，助词是 -을。', explanationEn: '"To make up one\'s mind" is 마음을 먹다, with the particle -을.',
        },
        {
          prompt: '"편지를 읽고 가슴이 뭉클했어요." 的意思？', promptEn: 'What does "편지를 읽고 가슴이 뭉클했어요." mean?',
          options: ['胸口发疼', '一阵感动 / 鼻酸', '胸口发热', '心跳加快'],
          answer: 1,
          explanation: '가슴이 뭉클하다 = 因感动而心里一阵触动 / 鼻酸。', explanationEn: '가슴이 뭉클하다 = to feel a surge of emotion / a lump in your throat from being moved.',
        },
        {
          prompt: '"마음"和"가슴"的分工是？', promptEn: 'What\'s the division between "마음" and "가슴"?',
          options: [
            '完全相同',
            '마음 偏"决心/意愿"，가슴 偏"情感/感受"',
            '마음 = 头脑，가슴 = 身体',
            '마음 用于书面，가슴 用于口语',
          ],
          answer: 1,
          explanation: '마음：决心/意愿层面（먹다/들다/놓이다）；가슴：情感/身体感受（아프다/뭉클하다/새기다）。', explanationEn: '마음: the realm of resolve/intention (먹다/들다/놓이다); 가슴: emotional/physical feelings (아프다/뭉클하다/새기다).',
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
    whatItDoes: '嘴/话 惯用语', whatItDoesEn: 'Mouth/Speech Idioms',
    whatItDoesBody: '"입（嘴）"和"말（话）"的惯用语多与"保密/传播/说话方式"相关：입이 무겁다（守口如瓶）、입이 가볍다（嘴不严）、말꼬리를 잡다（抠字眼）、말을 아끼다（惜字如金）、입에 발린 말（花言巧语）。', whatItDoesBodyEn: 'Idioms with "입 (mouth)" and "말 (speech)" often relate to secrecy, spreading information, or speaking style: 입이 무겁다 (tight-lipped), 입이 가볍다 (loose-lipped), 말꼬리를 잡다 (nitpick), 말을 아끼다 (sparing with words), 입에 발린 말 (sweet talk).',
    structureNote: '입/말 + 助词 + 动词/形容词｜表说话方式与信任', structureNoteEn: '입/말 + particle + verb/adjective | expressing speaking style and trust',
    rulesNote: '입이 무겁다 守口 / 입이 가볍다 嘴松 / 말꼬리를 잡다 抠字眼 / 말을 아끼다 惜字如金 / 입에 발린 말 花言巧语', rulesNoteEn: '입이 무겁다 tight-lipped / 입이 가볍다 loose-lipped / 말꼬리를 잡다 nitpick / 말을 아끼다 sparing with words / 입에 발린 말 sweet talk',
    structures: [
      {
        ko: '민수는 입이 무거워서 비밀을 말해도 안전해요.',
        zh: '民秀嘴很严，说秘密也安全。', zhEn: 'Min-su is tight-lipped, so it\'s safe to tell him secrets.',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '입이 무거워서', role: 'verb' },
          { text: '비밀을 말해도', role: 'verb' },
          { text: '안전해요', role: 'verb' },
        ],
      },
      {
        ko: '자꾸 말꼬리를 잡으면 대화가 안 돼요.',
        zh: '老是抠字眼，对话没法进行。', zhEn: 'If you keep nitpicking words, the conversation can\'t go on.',
        tokens: [
          { text: '자꾸', role: 'plain' },
          { text: '말꼬리를 잡으면', role: 'verb' },
          { text: '대화가 안 돼요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 그 사람은 말을 아끼고 있어요.',
        zh: '最近他惜字如金。', zhEn: 'Lately, he\'s been sparing with his words.',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '그 사람은', role: 'subject' },
          { text: '말을 아끼고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '입이 무겁다 → 守口如瓶', textEn: '입이 무겁다 → tight-lipped / to keep a secret', examples: '민수는 입이 무거워요.（民秀嘴很严，守口如瓶。）', examplesEn: '민수는 입이 무거워요. (Min-su is tight-lipped and keeps secrets well.)' },
      { type: 'rule', text: '입이 가볍다 → 嘴不严 / 爱说', textEn: '입이 가볍다 → loose-lipped / to blab', examples: '그 사람은 입이 가벼워서 조심하세요.（那个人嘴不严，你要小心点。）', examplesEn: '그 사람은 입이 가벼워서 조심하세요. (That person is loose-lipped, so be careful.)' },
      { type: 'rule', text: '말꼬리를 잡다 → 抠字眼 / 挑毛病', textEn: '말꼬리를 잡다 → to nitpick / to find fault', examples: '자꾸 말꼬리를 잡지 마세요.（别老是抓话柄挑字眼。）', examplesEn: '자꾸 말꼬리를 잡지 마세요. (Don\'t keep nitpicking at every word.)' },
      { type: 'rule', text: '말을 아끼다 → 惜字如金 / 少说话', textEn: '말을 아끼다 → to be sparing with words / to speak little', examples: '요즘 그는 말을 아끼고 있어요.（最近他很少说话，惜字如金。）', examplesEn: '요즘 그는 말을 아끼고 있어요. (Lately, he\'s been sparing with his words.)' },
      { type: 'rule', text: '입에 발린 말 → 花言巧语 / 敷衍话', textEn: '입에 발린 말 → sweet talk / empty flattery', examples: '입에 발린 말은 하지 마세요.（别说那些花言巧语的客套话。）', examplesEn: '입에 발린 말은 하지 마세요. (Don\'t say those empty pleasantries.)' },
      { type: 'usage', text: '입방아를 찧다 → 说闲话 / 八卦', textEn: '입방아를 찧다 → to gossip / to talk behind someone\'s back', examples: '동네에서 그 사람 입방아를 찧어요.（街坊邻里都在说那个人的闲话。）', examplesEn: '동네에서 그 사람 입방아를 찧어요. (The neighbors are all gossiping about that person.)' },
      { type: 'usage', text: '말이 씨가 되다 → 一语成谶', textEn: '말이 씨가 되다 → a saying comes true', examples: '말이 씨가 될 수 있으니 조심하세요.（说出口的话可能会一语成谶，说话要小心。）', examplesEn: 'Your words can come true, so be careful what you say.' },
      { type: 'note', text: '입 vs 말 → 입 侧重"嘴的行为"，말 侧重"内容"', textEn: '입 vs 말 → 입 focuses on the action of the mouth, 말 focuses on the content', examples: '입이 무겁다（嘴严）/ 말이 많다（话多）', examplesEn: '입이 무겁다 (tight-lipped) / 말이 많다 (talkative)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '입이 무거워서', role: 'verb' },
          { text: '비밀을 말해도', role: 'verb' },
          { text: '안전해요', role: 'verb' },
        ],
        zh: '民秀嘴严可托付秘密。', zhEn: 'Min-su is tight-lipped; you can trust him with secrets.',
        swapWords: ['입이 무겁다', '믿음직하다', '신뢰가 가다', '조심스럽다'],
      },
      {
        wordBlocks: [
          { text: '자꾸', role: 'plain' },
          { text: '말꼬리를 잡으면', role: 'verb' },
          { text: '대화가 안 돼요', role: 'verb' },
        ],
        zh: '总抠字眼没法对话。', zhEn: 'You can\'t have a conversation if you keep nitpicking words.',
        swapWords: ['말꼬리', '말끝', '작은 부분', '단어'],
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '그 사람은', role: 'subject' },
          { text: '말을 아끼고 있어요', role: 'verb' },
        ],
        zh: '他最近惜字如金。', zhEn: 'He\'s been sparing with his words lately.',
        swapWords: ['아끼다', '삼가다', '줄이다', '피하다'],
      },
    ],
    scenarios: [
      { icon: '🤐', context: '嘴严', contextEn: 'tight-lipped', ko: '민수는 입이 무거워요.', zh: '民秀嘴严。', zhEn: 'Min-su is tight-lipped.' },
      { icon: '🗣️', context: '嘴松', contextEn: 'loose-lipped', ko: '그 사람은 입이 가벼워요.', zh: '他嘴不严。', zhEn: 'He\'s not tight-lipped.' },
      { icon: '🔍', context: '抠字眼', contextEn: 'nitpick words', ko: '말꼬리를 잡지 마세요.', zh: '别抠字眼。', zhEn: 'Don\'t nitpick words.' },
      { icon: '🤫', context: '少说话', contextEn: 'speak less', ko: '요즘 말을 아끼고 있어요.', zh: '最近惜字如金。', zhEn: 'Recently, he\'s been sparing with his words.' },
      { icon: '😒', context: '敷衍话', contextEn: 'perfunctory words', ko: '입에 발린 말은 하지 마세요.', zh: '别说敷衍话。', zhEn: 'Don\'t give perfunctory answers.' },
      { icon: '💬', context: '八卦', contextEn: 'gossip', ko: '동네에서 입방아를 찧어요.', zh: '街坊说闲话。', zhEn: 'The neighbors are gossiping.' },
    ],
    mistakes: [
      { wrong: '민수는 입을 무겁습니다', correct: '민수는 입이 무겁습니다', note: '입이 무겁다 是惯用语（嘴严/守口如瓶），主语助词用 이，不用 을', noteEn: '입이 무겁다 is an idiom (tight-lipped/keeping secrets), and the subject particle is 이, not 을' },
      { wrong: '말꼬리를 잡아 주세요', correct: '말꼬리를 잡지 마세요', note: '말꼬리를 잡다 含贬义"抠字眼挑毛病"，不能作为"请求"', noteEn: '말꼬리를 잡다 has a negative connotation of nitpicking and finding fault, and cannot be used as a request' },
      { wrong: '요즘 말이 아껴요', correct: '요즘 말을 아껴요', note: '"惜字如金"是 말을 아끼다，用 -을', noteEn: '"Sparing with words" is 말을 아끼다, using -을' },
    ],
    quickTable: {
      title: '입 · 말 관용어 速查', titleEn: '입 · 말 Idioms Quick Reference',
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
      title: '입 · 말 练习', titleEn: '입 · 말 Practice',
      body: '选择正确含义', bodyEn: 'Choose the correct meaning.',
      questions: [
        {
          prompt: '"민수는 입이 무거워요." 的意思是？', promptEn: 'What does "민수는 입이 무거워요." mean?',
          options: ['嘴巴长得大', '嘴严 / 守口如瓶', '不爱吃东西', '嘴唇厚重'],
          answer: 1,
          explanation: '입이 무겁다 = 守口如瓶，能保守秘密。', explanationEn: '입이 무겁다 = tight-lipped, able to keep secrets.',
        },
        {
          prompt: '"자꾸 말꼬리를 잡지 마세요." 意味着？', promptEn: 'What does "자꾸 말꼬리를 잡지 마세요." mean?',
          options: ['不要抓话的尾巴', '不要抠字眼 / 挑毛病', '不要打断说话', '不要回答'],
          answer: 1,
          explanation: '말꼬리를 잡다 = 揪住某句话的细节挑刺。', explanationEn: 'To nitpick someone\'s words by catching at details.',
        },
        {
          prompt: '"입에 발린 말은 하지 마세요." 什么意思？', promptEn: 'What does "Don\'t say empty flattery" mean?',
          options: ['不要涂嘴唇', '不要说花言巧语 / 敷衍话', '不要说脏话', '不要说话'],
          answer: 1,
          explanation: '입에 발린 말 = 表面客套敷衍的话。', explanationEn: 'Lip service — words that are superficially polite but insincere.',
        },
        {
          prompt: '입 vs 말 的核心区别？', promptEn: 'What\'s the core difference between 입 and 말?',
          options: [
            '完全相同',
            '입 → 嘴的行为（严/松）；말 → 话本身（内容/多/少）',
            '입 用于口语，말 用于书面',
            '입 是身体，말 是精神',
          ],
          answer: 1,
          explanation: '입（嘴的动作/属性）+ 말（话的内容/数量）。', explanationEn: '입 (the mouth\'s action/attribute) + 말 (the content/quantity of speech).',
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
    compareLabel: '嘴严 vs 嘴松', compareLabelEn: 'Tight-lipped vs loose-lipped',
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
    whatItDoes: '头 惯用语', whatItDoesEn: 'Head Idioms',
    whatItDoesBody: '"머리（头）"的惯用语多与思考、方案、合作、烦恼相关：머리를 굴리다（动脑筋）、머리를 맞대다（碰头商量）、머리가 아프다（头疼/烦）、머리가 잘 돌아가다（脑子灵）、머리를 식히다（透透气）。', whatItDoesBodyEn: 'Idioms with "머리 (head)" often relate to thinking, planning, cooperation, or worries: 머리를 굴리다 (rack one\'s brains), 머리를 맞대다 (put heads together), 머리가 아프다 (headache/troubled), 머리가 잘 돌아가다 (quick-witted), 머리를 식히다 (clear one\'s head).',
    structureNote: '머리 + 助词 + 动词/形容词｜表思考/方案/烦恼', structureNoteEn: '머리 + particle + verb/adjective | expressing thinking/planning/worries',
    rulesNote: '머리를 굴리다 动脑 / 머리를 맞대다 碰头 / 머리가 아프다 头疼/烦 / 머리가 잘 돌아가다 脑子灵 / 머리를 식히다 透气', rulesNoteEn: '머리를 굴리다 rack one\'s brains / 머리를 맞대다 put heads together / 머리가 아프다 headache/troubled / 머리가 잘 돌아가다 quick-witted / 머리를 식히다 clear one\'s head',
    structures: [
      {
        ko: '이 문제를 풀려고 머리를 굴렸어요.',
        zh: '为解这题，动了脑筋。', zhEn: 'To solve this problem, I racked my brain.',
        tokens: [
          { text: '이 문제를 풀려고', role: 'plain' },
          { text: '머리를 굴렸어요', role: 'verb' },
        ],
      },
      {
        ko: '팀원들이 머리를 맞대고 방법을 찾았어요.',
        zh: '组员们碰头商量找方法。', zhEn: 'The team members put their heads together to find a solution.',
        tokens: [
          { text: '팀원들이', role: 'subject' },
          { text: '머리를 맞대고', role: 'verb' },
          { text: '방법을 찾았어요', role: 'verb' },
        ],
      },
      {
        ko: '요즘 일이 많아서 머리가 아파요.',
        zh: '最近事多头疼。', zhEn: 'I\'ve had a lot on my plate lately, and it\'s giving me a headache.',
        tokens: [
          { text: '요즘', role: 'time' },
          { text: '일이 많아서', role: 'plain' },
          { text: '머리가 아파요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '머리를 굴리다 → 动脑筋 / 想办法', textEn: 'To rack one\'s brain / to think of a way', examples: '어떻게 하지 하며 머리를 굴렸어요.（一边想着该怎么办，一边动起了脑筋。）', examplesEn: 'I racked my brain, wondering what to do.' },
      { type: 'rule', text: '머리를 맞대다 → 碰头 / 商量', textEn: 'To put heads together / to consult', examples: '팀원들이 머리를 맞대고 의논했어요.（组员们凑在一起商量。）', examplesEn: 'The team members put their heads together and discussed it.' },
      { type: 'rule', text: '머리가 아프다 → 头疼 / 心烦', textEn: 'To have a headache / to be troubled', examples: '이 문제 때문에 머리가 아파요.（这个问题让人头疼。）', examplesEn: 'This problem is giving me a headache.' },
      { type: 'rule', text: '머리가 (잘) 돌아가다 → 脑子灵 / 反应快', textEn: 'To have a quick mind / to be sharp', examples: '민수는 머리가 잘 돌아가서 답을 빨리 찾았어요.（民秀脑子转得快，很快就找到了答案。）', examplesEn: 'Minsu has a quick mind, so he found the answer fast.' },
      { type: 'rule', text: '머리를 식히다 → 放空 / 透透气', textEn: 'To clear one\'s head / to take a breather', examples: '산책하면서 머리를 식혔어요.（一边散步，一边让头脑放松一下。）', examplesEn: 'I cleared my head by taking a walk.' },
      { type: 'usage', text: '머리가 지끈지끈하다 → 头突突地疼', textEn: 'To have a throbbing headache', examples: '아침부터 머리가 지끈지끈해요.（从早上开始头就一阵阵地突突疼。）', examplesEn: 'My head has been throbbing since morning.' },
      { type: 'usage', text: '머리를 짜다 → 绞尽脑汁', textEn: 'To rack one\'s brains', examples: '아이디어를 짜내려고 머리를 짜냈어요.（为了想出点子，绞尽了脑汁。）', examplesEn: 'I racked my brains to come up with an idea.' },
      { type: 'note', text: '머리가 아프다 既指身体也指心烦意乱', textEn: '머리가 아프다 refers to both physical pain and mental distress.', examples: '身体：감기 걸려서 머리가 아파요 / 心烦：결정하기 힘들어서 머리가 아파요', examplesEn: 'Physical: I have a headache from a cold / Mental: I have a headache because it\'s hard to decide.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 문제를 풀려고', role: 'plain' },
          { text: '머리를 굴렸어요', role: 'verb' },
        ],
        zh: '为解题动脑筋。', zhEn: 'Use your head to solve the problem.',
        swapWords: ['굴리다', '짜다', '쓰다', '쥐어짜다'],
      },
      {
        wordBlocks: [
          { text: '팀원들이', role: 'subject' },
          { text: '머리를 맞대고', role: 'verb' },
          { text: '방법을 찾았어요', role: 'verb' },
        ],
        zh: '组员碰头找办法。', zhEn: 'Team members put their heads together to find a solution.',
        swapWords: ['머리를 맞대다', '의논하다', '토의하다', '상의하다'],
      },
      {
        wordBlocks: [
          { text: '산책하면서', role: 'plain' },
          { text: '머리를 식혔어요', role: 'verb' },
        ],
        zh: '散步透透气。', zhEn: 'Take a walk to clear your head.',
        swapWords: ['식히다', '쉬다', '풀다', '비우다'],
      },
    ],
    scenarios: [
      { icon: '🧠', context: '动脑', contextEn: 'Use your brain', ko: '문제를 풀려고 머리를 굴렸어요.', zh: '解题动脑筋。', zhEn: 'Use your brain to solve the problem.' },
      { icon: '👥', context: '碰头', contextEn: 'Put heads together', ko: '팀원들이 머리를 맞대고 논의했어요.', zh: '组员碰头讨论。', zhEn: 'Team members put their heads together to discuss.' },
      { icon: '🤯', context: '头疼', contextEn: 'Headache', ko: '이 문제 때문에 머리가 아파요.', zh: '这问题让人头疼。', zhEn: 'This problem is a headache.' },
      { icon: '💡', context: '脑子灵', contextEn: 'Quick-witted', ko: '민수는 머리가 잘 돌아가요.', zh: '民秀脑子灵。', zhEn: 'Minsu is quick-witted.' },
      { icon: '🍃', context: '透气', contextEn: 'Get some air', ko: '산책하면서 머리를 식혔어요.', zh: '散步透透气。', zhEn: 'Take a walk to clear your head.' },
      { icon: '📚', context: '绞尽脑汁', contextEn: 'Rack your brains', ko: '아이디어를 짜내려고 머리를 짜냈어요.', zh: '绞尽脑汁想主意。', zhEn: 'Rack your brains for an idea.' },
    ],
    mistakes: [
      { wrong: '문제를 풀려고 머리가 굴렸어요', correct: '문제를 풀려고 머리를 굴렸어요', note: '"动脑"是 머리를 굴리다，用 -을', noteEn: '"动脑" is 머리를 굴리다, use -을' },
      { wrong: '팀원들이 머리를 잡고 논의했어요', correct: '팀원들이 머리를 맞대고 논의했어요', note: '"碰头"固定为 머리를 맞대다，不是 머리를 잡다', noteEn: '"碰头" is fixed as 머리를 맞대다, not 머리를 잡다' },
      { wrong: '이 문제로 머리가 아프고 있어요', correct: '이 문제로 머리가 아파요', note: '머리가 아프다 是状态动词，不用 -고 있다', noteEn: '머리가 아프다 is a state verb, don\'t use -고 있다' },
    ],
    quickTable: {
      title: '머리 관용어 速查', titleEn: '머리 Idioms Quick Reference',
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
      title: '머리 관용어 练习', titleEn: '머리 Idioms Practice',
      body: '选择正确含义或搭配', bodyEn: 'Choose the correct meaning or collocation',
      questions: [
        {
          prompt: '"문제를 풀려고 머리를 굴렸어요." 意思？', promptEn: 'What does "문제를 풀려고 머리를 굴렸어요." mean?',
          options: ['滚动头', '动脑筋 / 想办法', '摇头', '摇晃身体'],
          answer: 1,
          explanation: '머리를 굴리다 = 动脑筋想办法。', explanationEn: '머리를 굴리다 = to use your brain to think of a solution.',
        },
        {
          prompt: '"팀원들이 머리를 맞대고 논의했어요." 什么意思？', promptEn: 'What does "팀원들이 머리를 맞대고 논의했어요." mean?',
          options: ['头顶碰头顶', '碰头 / 共同商量', '打架', '互相点头'],
          answer: 1,
          explanation: '머리를 맞대다 = 聚在一起共同商量。', explanationEn: '머리를 맞대다 = to put heads together and discuss.',
        },
        {
          prompt: '민수는 머리가 잘 (   ) 답을 빨리 찾아요.',
          options: ['잡아서', '돌아가서', '식혀서', '아파서'],
          answer: 1,
          explanation: '"脑子灵"是 머리가 잘 돌아가다 → 돌아가서。', explanationEn: '"脑子灵" is 머리가 잘 돌아가다 → 돌아가서.',
        },
        {
          prompt: '"산책하면서 머리를 식혔어요." 意味着？', promptEn: 'What does "산책하면서 머리를 식혔어요." mean?',
          options: ['头变凉了', '放空 / 缓解精神疲劳', '生病发烧退了', '开始散步'],
          answer: 1,
          explanation: '머리를 식히다 = 让脑子透透气 / 缓解压力。', explanationEn: '머리를 식히다 = to clear your head / relieve stress.',
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
    compareLabel: '动脑 vs 放空', compareLabelEn: 'Thinking vs. Zoning Out',
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
    title: '四字成语 · 情感与态度', titleEn: 'Four-Character Idioms · Emotions & Attitudes',
    whatItDoes: '사자성어（1）',
    whatItDoesBody: '韩语四字成语（사자성어）多源自汉字典故，是韩语高级表达的标志。本课学与"情感/态度/合作"相关的六大成语：일석이조（一石二鸟）、동병상련（同病相怜）、십시일반（十匙一饭）、어부지리（渔翁得利）、자업자득（自作自受）、우유부단（优柔寡断）。', whatItDoesBodyEn: 'Korean four-character idioms (사자성어) often originate from Chinese classics and mark advanced Korean expression. This lesson covers six idioms related to "emotion/attitude/cooperation": 일석이조 (kill two birds with one stone), 동병상련 (misery loves company), 십시일반 (many hands make light work), 어부지리 (fisherman\'s gain), 자업자득 (reap what you sow), 우유부단 (indecisive).',
    structureNote: '四字成语作名词使用｜句中位置灵活｜多与 이다/하다 搭配', structureNoteEn: 'Four-character idioms used as nouns | flexible position in sentences | often paired with 이다/하다',
    rulesNote: '읽는 법：일석이조[일써기조] / 어부지리[어부지리]，注意汉字词双拼读法', rulesNoteEn: 'Reading: 일석이조[일써기조] / 어부지리[어부지리], note the compound reading of Sino-Korean words',
    structures: [
      {
        ko: '이번 여행은 관광도 하고 공부도 해서 일석이조였어요.',
        zh: '这次旅行既观光又学习，一石二鸟。', zhEn: 'This trip was both sightseeing and learning—killing two birds with one stone.',
        tokens: [
          { text: '이번 여행은', role: 'subject' },
          { text: '관광도 하고 공부도 해서', role: 'plain' },
          { text: '일석이조였어요', role: 'verb' },
        ],
      },
      {
        ko: '실직한 사람들끼리 만나면 동병상련을 느껴요.',
        zh: '失业的人聚在一起会感到同病相怜。', zhEn: 'Unemployed people who gather together feel a sense of shared misery.',
        tokens: [
          { text: '실직한 사람들끼리', role: 'subject' },
          { text: '만나면', role: 'plain' },
          { text: '동병상련을 느껴요', role: 'verb' },
        ],
      },
      {
        ko: '십시일반으로 힘을 모아 어려운 이웃을 도왔어요.',
        zh: '十匙一饭，凝聚力量帮助了困难邻里。', zhEn: 'Many hands make light work—they pooled their strength to help neighbors in need.',
        tokens: [
          { text: '십시일반으로', role: 'plain' },
          { text: '힘을 모아', role: 'verb' },
          { text: '어려운 이웃을', role: 'object' },
          { text: '도왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '일석이조（一石二鸟）→ 一举两得', textEn: '일석이조 (One stone, two birds) → Killing two birds with one stone', examples: '운동도 하고 살도 빼고 일석이조예요.（既锻炼了身体又减了肥，真是一举两得。）', examplesEn: '운동도 하고 살도 빼고 일석이조예요. (I exercised and lost weight—killing two birds with one stone.)' },
      { type: 'rule', text: '동병상련（同病相怜）→ 处境相同互相同情', textEn: '동병상련 (Shared illness, mutual pity) → Those in the same boat sympathize with each other', examples: '어려운 처지에 동병상련을 느껴요.（处境同样艰难，彼此感到同病相怜。）', examplesEn: '어려운 처지에 동병상련을 느껴요. (In similar tough situations, we feel a bond of shared suffering.)' },
      { type: 'rule', text: '십시일반（十匙一饭）→ 众人拾柴 / 每人出一点', textEn: '십시일반 (Ten spoons make one meal) → Many hands make light work / Everyone chips in a little', examples: '십시일반으로 도와줬어요.（大家每人出一点力，众人拾柴地帮了忙。）', examplesEn: '십시일반으로 도와줬어요. (Everyone chipped in a little and helped out together.)' },
      { type: 'rule', text: '어부지리（渔翁得利）→ 鹬蚌相争渔翁得利', textEn: '어부지리 (The fisherman\'s gain) → The third party benefits from others\' conflict', examples: '두 회사 싸움에서 어부지리를 얻었어요.（在两家公司的争斗中坐收了渔翁之利。）', examplesEn: '두 회사 싸움에서 어부지리를 얻었어요. (I reaped the benefits from the fight between the two companies.)' },
      { type: 'rule', text: '자업자득（自作自受）→ 自食其果', textEn: '자업자득 (You reap what you sow) → Getting what you deserve', examples: '거짓말이 들통난 건 자업자득이에요.（谎言被拆穿是自作自受。）', examplesEn: '거짓말이 들통난 건 자업자득이에요. (Getting caught in a lie is just reaping what you sowed.)' },
      { type: 'rule', text: '우유부단（优柔寡断）→ 犹豫不决', textEn: '우유부단 (Indecisive) → Hesitant and unable to decide', examples: '민수는 우유부단해서 결정을 못 해요.（民秀优柔寡断，迟迟做不了决定。）', examplesEn: '민수는 우유부단해서 결정을 못 해요. (Minsu is so indecisive he can\'t make up his mind.)' },
      { type: 'usage', text: '语用：多用书面/新闻/正式演讲', textEn: 'Usage: Mostly in writing, news, and formal speeches', examples: '기사 등에서 자주 나오는 표현' },
      { type: 'note', text: '判读时把汉字对照：일석(一石)+이조(二鸟)', textEn: 'When deciphering, match the Hanja: 일석 (one stone) + 이조 (two birds)', examples: '일석이조=一+石+二+鸟', examplesEn: '일석이조 = one + stone + two + bird' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이번 여행은', role: 'subject' },
          { text: '관광도 공부도', role: 'plain' },
          { text: '일석이조였어요', role: 'verb' },
        ],
        zh: '旅行是一石二鸟。', zhEn: 'The trip was killing two birds with one stone.',
        swapWords: ['일석이조', '일거양득', '두 가지', '동시'],
      },
      {
        wordBlocks: [
          { text: '실직한 사람들끼리', role: 'subject' },
          { text: '동병상련을', role: 'object' },
          { text: '느껴요', role: 'verb' },
        ],
        zh: '同病相怜。', zhEn: 'Misery loves company.',
        swapWords: ['동병상련', '공감', '연민', '위로'],
      },
      {
        wordBlocks: [
          { text: '십시일반으로', role: 'plain' },
          { text: '어려운 이웃을', role: 'object' },
          { text: '도왔어요', role: 'verb' },
        ],
        zh: '众人拾柴帮邻里。', zhEn: 'Many hands helped the neighbors.',
        swapWords: ['십시일반', '조금씩', '함께', '모두'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '一举两得', contextEn: 'Kill two birds with one stone', ko: '이 여행은 일석이조였어요.', zh: '旅行一石二鸟。', zhEn: 'The trip was two birds with one stone.' },
      { icon: '🤝', context: '同病相怜', contextEn: 'Shared suffering, mutual sympathy', ko: '동병상련을 느꼈어요.', zh: '感到同病相怜。', zhEn: 'Feeling a sense of shared suffering.' },
      { icon: '💪', context: '众人拾柴', contextEn: 'Many hands make light work', ko: '십시일반으로 도왔어요.', zh: '众人拾柴帮忙。', zhEn: 'Many hands make light work.' },
      { icon: '🎣', context: '渔翁得利', contextEn: 'The fisherman profits', ko: '두 회사 싸움에 어부지리를 얻었어요.', zh: '两家争斗渔翁得利。', zhEn: 'When two fight, the third wins.' },
      { icon: '⚖️', context: '自作自受', contextEn: 'Suffer the consequences', ko: '거짓말이 들통난 건 자업자득이에요.', zh: '被戳穿是自食其果。', zhEn: 'Being exposed is reaping what you sow.' },
      { icon: '🤔', context: '优柔寡断', contextEn: 'Indecisive', ko: '민수는 우유부단해요.', zh: '民秀优柔寡断。', zhEn: 'Min-su is indecisive.' },
    ],
    mistakes: [
      { wrong: '이 여행은 일석이조 있어요', correct: '이 여행은 일석이조였어요', note: '成语作名词，用 이다 系词，不用 있다', noteEn: 'Idioms as nouns use the copula 이다, not 있다' },
      { wrong: '십시일반이 도왔어요', correct: '십시일반으로 도왔어요', note: '"以十匙一饭方式"用 -으로', noteEn: 'Use -으로 for \'in the manner of ten spoons, one meal\'' },
      { wrong: '우유부단이에요', correct: '우유부단해요', note: '우유부단하다 是形容词性，用 -해요', noteEn: '우유부단하다 is adjectival, use -해요' },
    ],
    quickTable: {
      title: '情感态度类 사자성어', titleEn: 'Emotion/Attitude 사자성어',
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
      title: '情感态度 사자성어 练习', titleEn: 'Emotion/Attitude 사자성어 Practice',
      body: '选择正确的成语', bodyEn: 'Choose the correct idiom',
      questions: [
        {
          prompt: '"这次旅行既观光又学习" 最贴切的成语？', promptEn: 'Which idiom best fits \'This trip is both sightseeing and learning\'?',
          options: ['자업자득', '일석이조', '어부지리', '동병상련'],
          answer: 1,
          explanation: '"一举两得"是 일석이조。', explanationEn: '\'Kill two birds with one stone\' is 일석이조.',
        },
        {
          prompt: '"两家公司斗争，我们赚了" 用哪个成语？', promptEn: 'Which idiom for \'Two companies fought, and we profited\'?',
          options: ['자업자득', '십시일반', '어부지리', '우유부단'],
          answer: 2,
          explanation: '"鹬蚌相争渔翁得利"是 어부지리。', explanationEn: '\'The fisherman profits from the fight\' is 어부지리.',
        },
        {
          prompt: '"每人出一点力帮忙" 用哪个？', promptEn: 'Which one for \'Everyone pitches in a little to help\'?',
          options: ['십시일반', '일석이조', '어부지리', '동병상련'],
          answer: 0,
          explanation: '"众人拾柴"是 십시일반（十匙一饭）。', explanationEn: '\'Many hands make light work\' is 십시일반 (ten spoons, one meal).',
        },
        {
          prompt: '"民秀总是拿不定主意" 最贴切？', promptEn: 'Which best fits \'Min-su can never make up his mind\'?',
          options: ['자업자득', '동병상련', '우유부단', '십시일반'],
          answer: 2,
          explanation: '"犹豫不决"是 우유부단。', explanationEn: '\'Hesitant and indecisive\' is 우유부단.',
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
    compareLabel: '正果 vs 恶果', compareLabelEn: 'Good outcome vs bad outcome',
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
    title: '四字成语 · 事态与因果', titleEn: 'Four-Character Idioms · Situations & Causality',
    whatItDoes: '사자성어（2）',
    whatItDoesBody: '本课学与"事态/因果/得失"相关的六大成语：전화위복（转祸为福）、오리무중（五里雾中）、유비무환（有备无患）、설상가상（雪上加霜）、고진감래（苦尽甘来）、다다익선（多多益善）。', whatItDoesBodyEn: 'This lesson covers six idioms related to "situations/cause and effect/gain and loss": 전화위복 (turn misfortune into a blessing), 오리무중 (completely in the dark), 유비무환 (preparedness prevents calamity), 설상가상 (adding insult to injury), 고진감래 (sweet after bitter), 다다익선 (the more the better).',
    structureNote: '同前课，作名词使用 · 与 이다/하다/-으로 搭配', structureNoteEn: 'Same as previous lesson, used as nouns · paired with 이다/하다/-으로',
    rulesNote: '注意汉字对照：전화(转祸)+위복(为福) / 설상(雪上)+가상(加霜)', rulesNoteEn: 'Note the Sino-Korean correspondence: 전화 (turn misfortune) + 위복 (into blessing) / 설상 (snow on top) + 가상 (frost added)',
    structures: [
      {
        ko: '큰 실패였지만 결국 전화위복이 되었어요.',
        zh: '虽是大失败，最终转祸为福。', zhEn: 'Though it was a big failure, it turned misfortune into a blessing.',
        tokens: [
          { text: '큰 실패였지만', role: 'plain' },
          { text: '결국', role: 'plain' },
          { text: '전화위복이 되었어요', role: 'verb' },
        ],
      },
      {
        ko: '사건의 원인이 아직 오리무중이에요.',
        zh: '事件原因仍在五里雾中。', zhEn: 'The cause of the incident is still shrouded in mystery.',
        tokens: [
          { text: '사건의 원인이', role: 'subject' },
          { text: '아직', role: 'time' },
          { text: '오리무중이에요', role: 'verb' },
        ],
      },
      {
        ko: '늦게 도착한 데다 비까지 와서 설상가상이었어요.',
        zh: '迟到又碰上下雨，雪上加霜。', zhEn: 'Being late and then caught in the rain—adding insult to injury.',
        tokens: [
          { text: '늦게 도착한 데다', role: 'plain' },
          { text: '비까지 와서', role: 'plain' },
          { text: '설상가상이었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '전화위복（转祸为福）→ 因祸得福', textEn: '전화위복 (turning misfortune into fortune) → a blessing in disguise', examples: '실패가 전화위복이 되었어요.（那次失败最终转祸为福。）', examplesEn: 'That failure turned into a blessing in disguise.' },
      { type: 'rule', text: '오리무중（五里雾中）→ 迷茫不明', textEn: 'In a fog → confused and unclear', examples: '원인이 오리무중이에요.（原因扑朔迷离，令人一头雾水。）', examplesEn: 'The cause is shrouded in mystery, leaving everyone baffled.' },
      { type: 'rule', text: '유비무환（有备无患）→ 有备无患', textEn: 'Preparedness ensures safety', examples: '유비무환의 자세로 준비했어요.（本着有备无患的态度做了准备。）', examplesEn: 'I prepared with a mindset of being prepared for all contingencies.' },
      { type: 'rule', text: '설상가상（雪上加霜）→ 雪上加霜', textEn: 'Adding insult to injury', examples: '설상가상으로 폭우까지 왔어요.（雪上加霜的是，还下起了暴雨。）', examplesEn: 'To make matters worse, a torrential rain came.' },
      { type: 'rule', text: '고진감래（苦尽甘来）→ 苦尽甘来', textEn: 'After hardship comes happiness', examples: '고진감래라, 이제 좋은 일이 생길 거예요.（苦尽甘来，接下来会有好事发生的。）', examplesEn: 'After hardship comes happiness, so good things are coming now.' },
      { type: 'rule', text: '다다익선（多多益善）→ 多多益善', textEn: 'The more, the better', examples: '경험은 다다익선이에요.（经验多多益善。）', examplesEn: 'When it comes to experience, the more, the better.' },
      { type: 'usage', text: '설상가상 常做副词化 → 설상가상으로', textEn: '설상가상 is often used adverbially → as 설상가상으로', examples: '설상가상으로 차까지 고장 났어요.（雪上加霜的是，连车都坏了。）', examplesEn: 'To make matters worse, even the car broke down.' },
      { type: 'note', text: '전화위복 = 好事从坏事转来；反义 = 호사다마（好事多磨）', textEn: '전화위복 = good fortune arising from misfortune; antonym = 호사다마 (good things are not easily achieved)', examples: '一好一坏，语义相反', examplesEn: 'One is good, one is bad—opposite in meaning.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '큰 실패였지만', role: 'plain' },
          { text: '결국', role: 'plain' },
          { text: '전화위복이 되었어요', role: 'verb' },
        ],
        zh: '失败转祸为福。', zhEn: 'Failure turned into a blessing.',
        swapWords: ['전화위복', '고진감래', '희소식', '반전'],
      },
      {
        wordBlocks: [
          { text: '사건의 원인이', role: 'subject' },
          { text: '아직', role: 'time' },
          { text: '오리무중이에요', role: 'verb' },
        ],
        zh: '事件仍五里雾中。', zhEn: 'The matter is still shrouded in mystery.',
        swapWords: ['오리무중', '미궁', '의문', '불투명'],
      },
      {
        wordBlocks: [
          { text: '늦게 도착한 데다', role: 'plain' },
          { text: '비까지 와서', role: 'plain' },
          { text: '설상가상이었어요', role: 'verb' },
        ],
        zh: '迟到又下雨雪上加霜。', zhEn: 'Being late and then rain—adding insult to injury.',
        swapWords: ['설상가상', '엎친 데 덮친 격', '악재', '겹악재'],
      },
    ],
    scenarios: [
      { icon: '🔄', context: '因祸得福', contextEn: 'Turning misfortune into a blessing', ko: '실패가 전화위복이 되었어요.', zh: '失败转祸为福。', zhEn: 'Failure turned into a blessing.' },
      { icon: '🌫️', context: '迷茫', contextEn: 'Confused', ko: '원인이 오리무중이에요.', zh: '原因五里雾中。', zhEn: 'The cause is a complete mystery.' },
      { icon: '📦', context: '有备无患', contextEn: 'Preparedness prevents calamity', ko: '유비무환의 자세로 준비했어요.', zh: '以有备无患的态度准备。', zhEn: 'Prepared with a mindset of readiness.' },
      { icon: '☔', context: '雪上加霜', contextEn: 'Adding insult to injury', ko: '설상가상으로 폭우가 왔어요.', zh: '雪上加霜下暴雨。', zhEn: 'Adding insult to injury, it poured rain.' },
      { icon: '🌈', context: '苦尽甘来', contextEn: 'Sweetness comes after bitterness', ko: '고진감래라, 이제 좋은 일이 생길 거예요.', zh: '苦尽甘来。', zhEn: 'Sweetness comes after bitterness.' },
      { icon: '📚', context: '多多益善', contextEn: 'The more, the better', ko: '경험은 다다익선이에요.', zh: '经验多多益善。', zhEn: 'The more experience, the better.' },
    ],
    mistakes: [
      { wrong: '실패가 전화위복 됐어요', correct: '실패가 전화위복이 되었어요', note: '"成为"要接 이/가 + 되다', noteEn: '"To become" takes 이/가 + 되다' },
      { wrong: '설상가상이 폭우까지 왔어요', correct: '설상가상으로 폭우까지 왔어요', note: '副词化用 -으로', noteEn: 'Adverbialization with -으로' },
      { wrong: '유비무환하게 준비', correct: '유비무환의 자세로 준비', note: '유비무환 是名词，不做副词，需借 "-의 자세로"', noteEn: '유비무환 is a noun, not an adverb; use "-의 자세로" instead' },
    ],
    quickTable: {
      title: '事态因果类 사자성어', titleEn: 'Situation/Cause-Effect 사자성어',
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
      title: '事态因果 사자성어 练习', titleEn: 'Situation/Cause-Effect 사자성어 Practice',
      body: '选择正确成语', bodyEn: 'Choose the correct idiom',
      questions: [
        {
          prompt: '"失败反而带来好事" 最贴切成语？', promptEn: 'Which idiom best fits "Failure brings good things"?',
          options: ['설상가상', '전화위복', '자업자득', '오리무중'],
          answer: 1,
          explanation: '"因祸得福"是 전화위복。', explanationEn: '"A blessing in disguise" is 전화위복.',
        },
        {
          prompt: '"迟到又下大雨" 最贴切成语？', promptEn: 'Which idiom best fits "Late and caught in heavy rain"?',
          options: ['전화위복', '고진감래', '설상가상', '다다익선'],
          answer: 2,
          explanation: '"雪上加霜"是 설상가상。', explanationEn: '"Adding insult to injury" is 설상가상.',
        },
        {
          prompt: '"事情原因还没查清" 最贴切？', promptEn: 'Which best fits "The cause is still unclear"?',
          options: ['오리무중', '자업자득', '유비무환', '전화위복'],
          answer: 0,
          explanation: '"五里雾中"是 오리무중。', explanationEn: '"Completely in the dark" is 오리무중.',
        },
        {
          prompt: '"苦难过后好日子会来" 最贴切？', promptEn: 'Which best fits "Good times come after hardship"?',
          options: ['우유부단', '고진감래', '설상가상', '어부지리'],
          answer: 1,
          explanation: '"苦尽甘来"是 고진감래。', explanationEn: '"Sweetness after bitterness" is 고진감래.',
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
    compareLabel: '坏转好 vs 更坏', compareLabelEn: 'Bad to good vs. worse',
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
    title: 'P30 综合练习', titleEn: 'P30 Comprehensive Practice',
    isPractice: true,
    whatItDoes: '惯用语综合', whatItDoesEn: 'Idioms Comprehensive',
    whatItDoesBody: '本课综合 P30 全部 8 类惯用语/成语：눈/손/발/마음/입/머리 六大身体部位 + 12 个 사자성어。综合考察含义与助词搭配。', whatItDoesBodyEn: 'This lesson covers all 8 types of idioms/idiomatic phrases from P30: six body parts (눈/손/발/마음/입/머리) plus 12 four-character idioms (사자성어). Tests both meanings and particle usage.',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P30 综合练习', titleEn: 'P30 Comprehensive Practice',
      body: '综合本章所有惯用语和成语', bodyEn: 'Review all idioms and proverbs from this chapter',
      questions: [
        {
          prompt: '"민수는 눈이 너무 높아요." 的意思是？', promptEn: 'What does "민수는 눈이 너무 높아요." mean?',
          options: ['个子高', '眼光挑剔', '视力好', '眼睛长得高'],
          answer: 1,
          explanation: '눈이 높다 = 眼光挑剔。', explanationEn: '눈이 높다 = picky.',
        },
        {
          prompt: '"엄마는 손이 크세요." 意味着？', promptEn: 'What does "엄마는 손이 크세요." mean?',
          options: ['手长得大', '大方 / 慷慨', '手灵巧', '手长'],
          answer: 1,
          explanation: '손이 크다 = 大方。', explanationEn: '손이 크다 = generous.',
        },
        {
          prompt: '"민수는 발이 넓어요." 什么意思？', promptEn: 'What does "민수는 발이 넓어요." mean?',
          options: ['脚长得宽', '人脉广', '跑得快', '走路稳'],
          answer: 1,
          explanation: '발이 넓다 = 人脉广。', explanationEn: '발이 넓다 = well-connected.',
        },
        {
          prompt: '이 옷이 정말 (마음) 들어요.',
          options: ['이', '을', '에', '으로'],
          answer: 2,
          explanation: '固定搭配 마음에 들다，助词是 -에。', explanationEn: 'The fixed phrase 마음에 들다 takes the particle -에.',
        },
        {
          prompt: '유학 가기로 (마음) 먹었어요.',
          options: ['이', '을', '에', '으로'],
          answer: 1,
          explanation: '"下决心"是 마음을 먹다，助词是 -을。', explanationEn: '"To make up one\'s mind" is 마음을 먹다, with the particle -을.',
        },
        {
          prompt: '"민수는 입이 무거워요." 什么意思？', promptEn: 'What does "민수는 입이 무거워요." mean?',
          options: ['嘴巴大', '嘴严 / 守口如瓶', '不爱吃', '嘴唇厚'],
          answer: 1,
          explanation: '입이 무겁다 = 守口如瓶。', explanationEn: '입이 무겁다 = tight-lipped.',
        },
        {
          prompt: '"팀원들이 머리를 맞대고 논의했어요." 什么意思？', promptEn: 'What does "팀원들이 머리를 맞대고 논의했어요." mean?',
          options: ['头顶碰头顶', '碰头 / 共同商量', '打架', '各自思考'],
          answer: 1,
          explanation: '머리를 맞대다 = 聚在一起共同商量。', explanationEn: '머리를 맞대다 = to put heads together and discuss.',
        },
        {
          prompt: '"这次旅行既观光又学习" 最贴切成语？', promptEn: 'Which idiom best fits "This trip was both sightseeing and learning"?',
          options: ['자업자득', '일석이조', '어부지리', '동병상련'],
          answer: 1,
          explanation: '"一举两得"是 일석이조。', explanationEn: '\'Kill two birds with one stone\' is 일석이조.',
        },
        {
          prompt: '"失败反而带来好事" 最贴切成语？', promptEn: 'Which idiom best fits "Failure brings good things"?',
          options: ['설상가상', '전화위복', '자업자득', '오리무중'],
          answer: 1,
          explanation: '"因祸得福"是 전화위복。', explanationEn: '"A blessing in disguise" is 전화위복.',
        },
        {
          prompt: '"迟到又下大雨" 最贴切成语？', promptEn: 'Which idiom best fits "Late and caught in heavy rain"?',
          options: ['전화위복', '고진감래', '설상가상', '다다익선'],
          answer: 2,
          explanation: '"雪上加霜"是 설상가상。', explanationEn: '"Adding insult to injury" is 설상가상.',
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
