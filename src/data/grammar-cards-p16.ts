import type { GrammarCard } from '@/types';

export const grammarCardsP16: GrammarCard[] = [
  // ── 第1课：의성어（拟声语）基础 ──────────────────────────────────────
  {
    id: 'card-p16-l01',
    partNumber: 16,
    lessonNumber: 1,
    title: '의성어（拟声语）基础', titleEn: 'Basics of Onomatopoeia (의성어)',
    whatItDoes: '模拟声音', whatItDoesEn: 'Mimicking Sounds',
    whatItDoesBody: '의성어（拟声语）是模拟自然界声音的词：멍멍（汪汪）、야옹（喵）、쨍그랑（哐当）、쿵쿵（咚咚）、똑똑（当当敲门）、쿨쿨（呼噜）。韩语拟声语极其丰富，是漫画、儿童文学、日常对话的重要组成部分。', whatItDoesBodyEn: 'Onomatopoeia (의성어) are words that mimic natural sounds: 멍멍 (woof), 야옹 (meow), 쨍그랑 (clang), 쿵쿵 (thump), 똑똑 (knock knock), 쿨쿨 (snore). Korean onomatopoeia is incredibly rich and a key part of comics, children\'s literature, and everyday conversation.',
    structureNote: '声音模拟词 → 独立使用或作定语｜多数含 반복（重复）', structureNoteEn: 'Sound-mimicking words → used independently or as modifiers | Most contain repetition (반복)',
    rulesNote: '动物声音 / 物体撞击 / 人的声音 / 自然声音 四大类', rulesNoteEn: 'Four categories: animal sounds / object impacts / human sounds / natural sounds',
    structures: [
      {
        ko: '강아지가 멍멍 짖어요.',
        zh: '小狗汪汪叫。', zhEn: 'The puppy barks woof woof.',
        tokens: [
          { text: '강아지가', role: 'subject' },
          { text: '멍멍', role: 'plain' },
          { text: '짖어요', role: 'verb' },
        ],
      },
      {
        ko: '창문을 똑똑 두드렸어요.',
        zh: '当当地敲了窗户。', zhEn: 'Knocked on the window with a bang bang.',
        tokens: [
          { text: '창문을', role: 'object' },
          { text: '똑똑', role: 'plain' },
          { text: '두드렸어요', role: 'verb' },
        ],
      },
      {
        ko: '아기가 쿨쿨 자고 있어요.',
        zh: '宝宝呼呼睡着。', zhEn: 'The baby is sleeping soundly.',
        tokens: [
          { text: '아기가', role: 'subject' },
          { text: '쿨쿨', role: 'plain' },
          { text: '자고 있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动物声：멍멍（汪汪）/ 야옹（喵）/ 꼬꼬댁（咯咯）/ 짹짹（叽叽）', textEn: 'Animal sounds: 멍멍 (woof) / 야옹 (meow) / 꼬꼬댁 (cluck) / 짹짹 (chirp)', examples: '강아지가 멍멍 짖어요.（小狗汪汪叫。）', examplesEn: 'The puppy barks woof woof.' },
      { type: 'rule', text: '物体撞击：쨍그랑（碎裂）/ 쿵쿵（咚咚）/ 똑똑（敲）/ 콩콩（跳跃）', textEn: 'Object impacts: 쨍그랑 (shatter) / 쿵쿵 (thud) / 똑똑 (knock) / 콩콩 (bounce)', examples: '유리가 쨍그랑 깨졌어요.（玻璃哐当碎了。）', examplesEn: 'The glass shattered with a crash.' },
      { type: 'rule', text: '人声：쿨쿨（呼噜）/ 하하（哈哈）/ 훌쩍훌쩍（抽泣）/ 아이고（哎哟）', textEn: 'Human sounds: 쿨쿨 (snore) / 하하 (haha) / 훌쩍훌쩍 (sob) / 아이고 (ouch)', examples: '아기가 쿨쿨 자요.（宝宝呼呼睡。）', examplesEn: 'The baby sleeps soundly.' },
      { type: 'rule', text: '自然声：쏴（哗）/ 우르릉（隆隆）/ 뚝뚝（滴答）/ 웅웅（嗡嗡）', textEn: 'Nature sounds: 쏴 (whoosh) / 우르릉 (rumble) / 뚝뚝 (drip) / 웅웅 (buzz)', examples: '비가 쏴 쏟아졌어요.（雨哗地倾泻下来。）', examplesEn: 'The rain poured down with a whoosh.' },
      { type: 'usage', text: '拟声语一般作副词修饰动词', textEn: 'Onomatopoeia usually acts as an adverb modifying verbs.', examples: '멍멍 짖어요 / 똑똑 두드렸어요' },
      { type: 'compare', text: '의성어 vs 의태어 → 前者模拟声音，后者模拟状态/动作', textEn: '의성어 vs 의태어 → the former mimics sounds, the latter mimics states/actions.', examples: '(의성) 쿵쿵 = 咚咚声 / (의태) 살금살금 = 蹑手蹑脚', examplesEn: '(의성) 쿵쿵 = thudding sound / (의태) 살금살금 = tiptoeing' },
      { type: 'note', text: '汉语和韩语的拟声词不能字面对译', textEn: 'Chinese and Korean onomatopoeia cannot be translated literally.', examples: '中文"喵" ≠ 韩语"야옹"（读音也不同）', examplesEn: 'Chinese "meow" ≠ Korean "야옹" (pronunciation differs too).' },
      { type: 'vocab', text: '拟声语搭配的动词是固定的，凭中文猜不出来，要成组记忆：비가 주룩주룩 내리다（雨哗哗下）/ 천둥이 우르릉 치다（打雷）/ 코를 드르렁 골다（打呼噜）/ 문을 똑똑 두드리다（敲门）', textEn: 'Onomatopoeia pairs with fixed verbs that can\'t be guessed from Chinese; memorize them as groups: 비가 주룩주룩 내리다 (rain pours) / 천둥이 우르릉 치다 (thunder rumbles) / 코를 드르렁 골다 (snore) / 문을 똑똑 두드리다 (knock on door)', examples: '打雷的动词是 치다、打呼噜的动词是 골다，都不能按中文动词直译', examplesEn: 'The verb for thunder is 치다, and for snoring is 골다; neither can be translated literally from Chinese verbs.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '강아지가', role: 'subject' },
          { text: '멍멍', role: 'plain' },
          { text: '짖어요', role: 'verb' },
        ],
        zh: '狗汪汪叫。', zhEn: 'The dog barks woof woof.',
        swapWords: ['멍멍', '왈왈', '왕왕'],
      },
      {
        wordBlocks: [
          { text: '창문을', role: 'object' },
          { text: '똑똑', role: 'plain' },
          { text: '두드렸어요', role: 'verb' },
        ],
        zh: '当当敲窗户。', zhEn: 'Knock on the window with a bang.',
        swapWords: ['똑똑', '탕탕', '쿵쿵', '쿵'],
      },
      {
        wordBlocks: [
          { text: '아기가', role: 'subject' },
          { text: '쿨쿨', role: 'plain' },
          { text: '자고 있어요', role: 'verb' },
        ],
        zh: '宝宝呼呼睡。', zhEn: 'The baby sleeps soundly.',
        swapWords: ['쿨쿨', '드르렁', '새근새근'],
      },
    ],
    scenarios: [
      { icon: '🐶', context: '狗叫', contextEn: 'dog bark', ko: '강아지가 멍멍 짖어요.', zh: '狗汪汪叫。', zhEn: 'The dog barks woof woof.' },
      { icon: '🚪', context: '敲门', contextEn: 'knock on door', ko: '문을 똑똑 두드렸어요.', zh: '当当敲门。', zhEn: 'Knock on the door with a bang.' },
      { icon: '😴', context: '睡觉', contextEn: 'sleep', ko: '아기가 쿨쿨 자요.', zh: '宝宝呼呼睡。', zhEn: 'The baby sleeps soundly.' },
      { icon: '💥', context: '玻璃碎', contextEn: 'glass shatter', ko: '유리가 쨍그랑 깨졌어요.', zh: '玻璃哐当碎。', zhEn: 'The glass shattered with a crash.' },
      { icon: '🌧️', context: '下雨', contextEn: 'Rain', ko: '비가 쏴 쏟아졌어요.', zh: '雨哗地下。', zhEn: 'The rain poured down.' },
      { icon: '⚡', context: '打雷', contextEn: 'Thunder', ko: '천둥이 우르릉 쳤어요.', zh: '雷隆隆响。', zhEn: 'Thunder rumbled.' },
    ],
    mistakes: [
      { wrong: '강아지가 멍멍이 짖어요', correct: '강아지가 멍멍 짖어요', note: '拟声语作副词直接接动词，不加助词', noteEn: 'Onomatopoeia used as an adverb directly modifies the verb without a particle.' },
      { wrong: '문을 똑똑을 두드렸어요', correct: '문을 똑똑 두드렸어요', note: '拟声语后不加宾格助词', noteEn: 'No object particle is added after onomatopoeia.' },
      { wrong: '고양이가 야옹 짖어요', correct: '고양이가 야옹 울어요', note: '狗用 짖다（吠），猫用 울다（叫）；动词搭配要对', noteEn: 'Dogs use 짖다 (bark), cats use 울다 (cry); match the verb correctly.' },
    ],
    quickTable: {
      title: '常见 의성어', titleEn: 'Common Onomatopoeia',
      headers: ['声音', '拟声语', '典型语境'],
      rows: [
        ['狗叫', '멍멍 / 왈왈', '강아지가 멍멍 짖어요'],
        ['猫叫', '야옹', '고양이가 야옹 울어요'],
        ['敲门', '똑똑', '똑똑 두드렸어요'],
        ['破碎', '쨍그랑', '유리가 쨍그랑 깨졌어요'],
        ['呼噜', '쿨쿨 / 드르렁', '아기가 쿨쿨 자요'],
        ['雨', '쏴 / 뚝뚝', '비가 쏴 내려요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '의성어 练习', titleEn: 'Onomatopoeia Practice',
      body: '选择正确的拟声语', bodyEn: 'Choose the correct onomatopoeia.',
      questions: [
        {
          prompt: '"狗汪汪叫" 最合适的拟声语？', promptEn: 'What\'s the best onomatopoeia for \'a dog barking\'?',
          options: ['야옹', '멍멍', '짹짹', '쿵쿵'],
          answer: 1,
          explanation: '狗叫是 멍멍（也可 왈왈）。', explanationEn: 'A dog\'s bark is 멍멍 (also 왈왈).',
        },
        {
          prompt: '"敲门声当当" 最合适？', promptEn: 'What\'s the best for \'a knocking sound\'?',
          options: ['똑똑', '쿨쿨', '야옹', '쿵쾅'],
          answer: 0,
          explanation: '敲门声是 똑똑（也可 탕탕）。', explanationEn: 'A knock is 똑똑 (also 탕탕).',
        },
        {
          prompt: '"玻璃碎了" 最合适的拟声语？', promptEn: 'What\'s the best onomatopoeia for \'glass breaking\'?',
          options: ['쿵쿵', '드르렁', '쨍그랑', '쿨쿨'],
          answer: 2,
          explanation: '玻璃碎裂用 쨍그랑。', explanationEn: 'Glass breaking uses 쨍그랑.',
        },
        {
          prompt: '拟声语（의성어）在句中通常作什么？', promptEn: 'What role does onomatopoeia (의성어) usually play in a sentence?',
          options: ['主语', '宾语', '副词（修饰动词）', '定语'],
          answer: 2,
          explanation: '拟声语一般作副词修饰动词，不加助词。', explanationEn: 'Onomatopoeia generally acts as an adverb modifying the verb, without a particle.',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语的<b>拟声语（의성어）</b>非常丰富，是漫画、儿童文学、日常对话的核心。<br>멍멍（汪汪）· 야옹（喵）· 똑똑（敲门）· 쨍그랑（碎裂）· 쿨쿨（呼噜）。<br>作副词直接修饰动词，不加助词。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>의성어 vs 의태어</b><br>
    ・의성어 → 模拟"声音"<br>
    <span style="color:#89756e">멍멍 / 쨍그랑 / 쿨쿨</span><br>
    ・의태어 → 模拟"状态/动作"<br>
    <span style="color:#89756e">살금살금 / 반짝반짝 / 두근두근</span>
  </div>
</div>`,
    compareLabel: '声音 vs 状态', compareLabelEn: 'Sound vs. State',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">의성어（拟声语）</div>
  <div style="font-size:14px;color:#89756e">模拟自然声音</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动物声 → 멍멍 / 야옹 / 짹짹<br>
      物体撞击 → 쨍그랑 / 쿵쿵 / 똑똑<br>
      人声 → 쿨쿨 / 하하 / 훌쩍<br>
      自然声 → 쏴 / 우르릉 / 뚝뚝
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">멍멍이 짖어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">멍멍 짖어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">고양이가 야옹 짖어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">고양이가 야옹 울어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：의태어（拟态语）基础 ──────────────────────────────────────
  {
    id: 'card-p16-l02',
    partNumber: 16,
    lessonNumber: 2,
    title: '의태어（拟态语）基础', titleEn: 'Basics of Mimetic Words (의태어)',
    whatItDoes: '模拟状态/动作', whatItDoesEn: 'Mimicking States/Actions',
    whatItDoesBody: '의태어（拟态语）模拟看得见的动作或状态，是韩语最独特的词汇宝藏。반짝반짝（闪闪）、살금살금（蹑手蹑脚）、두근두근（怦怦跳）、깜빡깜빡（一闪一闪/忘）、헐레벌떡（气喘吁吁）。韩语文学与对话生动感的核心。', whatItDoesBodyEn: 'Mimetic words (의태어) mimic visible actions or states, making them one of Korean\'s most unique vocabulary treasures. 반짝반짝 (sparkling), 살금살금 (tiptoeing), 두근두근 (pounding), 깜빡깜빡 (blinking/forgetting), 헐레벌떡 (panting). They are the core of vividness in Korean literature and conversation.',
    structureNote: '模拟状态/动作的副词｜多为 ABAB 型 반복 形式', structureNoteEn: 'Adverbs mimicking states/actions | Mostly ABAB repetition forms',
    rulesNote: '视觉/听觉/心理/动作 四大类｜多以 반복형 出现（AB AB → ABAB）', rulesNoteEn: 'Four categories: visual/auditory/psychological/action | Mostly appear in repeated forms (AB AB → ABAB)',
    structures: [
      {
        ko: '별이 반짝반짝 빛나요.',
        zh: '星星闪闪发光。', zhEn: 'The stars sparkle.',
        tokens: [
          { text: '별이', role: 'subject' },
          { text: '반짝반짝', role: 'plain' },
          { text: '빛나요', role: 'verb' },
        ],
      },
      {
        ko: '아이가 살금살금 걸어왔어요.',
        zh: '孩子蹑手蹑脚走过来。', zhEn: 'The child tiptoed over.',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: '살금살금', role: 'plain' },
          { text: '걸어왔어요', role: 'verb' },
        ],
      },
      {
        ko: '가슴이 두근두근 뛰어요.',
        zh: '心怦怦跳。', zhEn: 'My heart pounds.',
        tokens: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '视觉：반짝반짝（闪闪）/ 반들반들（光溜溜）/ 알록달록（五彩缤纷）', textEn: 'Visual: 반짝반짝 (sparkling) / 반들반들 (smooth) / 알록달록 (colorful)', examples: '별이 반짝반짝 빛나요.（星星一闪一闪地亮。）', examplesEn: '별이 반짝반짝 빛나요. (The stars twinkle.)' },
      { type: 'rule', text: '动作：살금살금（蹑手蹑脚）/ 어슬렁어슬렁（悠悠晃晃）/ 아장아장（蹒跚学步）', textEn: 'Action: 살금살금 (tiptoeing) / 어슬렁어슬렁 (loitering) / 아장아장 (toddling)', examples: '아이가 살금살금 걸어왔어요.（孩子蹑手蹑脚地走过来。）', examplesEn: '아이가 살금살금 걸어왔어요. (The child tiptoed over.)' },
      { type: 'rule', text: '心理：두근두근（怦怦）/ 두리번두리번（东张西望）/ 안절부절（坐立不安）', textEn: 'Psychology: 두근두근 (pounding) / 두리번두리번 (looking around) / 안절부절 (fidgeting)', examples: '가슴이 두근두근 뛰어요.（心怦怦跳。）', examplesEn: 'My heart is pounding.' },
      { type: 'rule', text: '记忆/意识：깜빡깜빡（一闪一闪 / 忘记）/ 아리송아리송（迷迷糊糊）', textEn: 'Memory/Awareness: 깜빡깜빡 (blinking / forgetting) / 아리송아리송 (fuzzy)', examples: '요즘 자꾸 깜빡깜빡해요.（最近老是走神/丢三落四。）', examplesEn: 'I keep spacing out/forgetting things lately.' },
      { type: 'usage', text: '大多是 ABAB 型 반복 形式', textEn: 'Mostly ABAB repetitive forms', examples: '반짝 → 반짝반짝 / 두근 → 두근두근' },
      { type: 'usage', text: '常作副词修饰动词/形容词', textEn: 'Often used as adverbs to modify verbs/adjectives', examples: '반짝반짝 빛나다 / 두근두근 뛰다' },
      { type: 'compare', text: '의성어 vs 의태어', examples: '(의성) 쨍그랑 = 声音 / (의태) 반짝반짝 = 视觉状态', examplesEn: '(Onomatopoeia) 쨍그랑 = sound / (Mimetic) 반짝반짝 = visual state' },
      { type: 'note', text: '拟态语学不好，韩语再流利也失去生动感', textEn: 'If you don\'t learn mimetic words well, even fluent Korean loses its vividness', examples: '韩国儿童绘本和综艺是拟态语学习的最佳材料', examplesEn: 'Korean children\'s picture books and variety shows are the best materials for learning mimetic words' },
      { type: 'note', text: '中文没有"拟态语"这种能产词类，母语者习惯用形容词或整句来描写（如"偷偷地走过来"），结果几乎不用拟态语，句子听起来平淡。要主动把拟态语当成一个词记下来用', textEn: 'Chinese has no productive word class like \'mimetic words.\' Native speakers tend to describe with adjectives or full sentences (e.g., \'sneak over\'), so they rarely use mimetic words, making sentences sound flat. Actively memorize mimetic words as vocabulary and use them.', examples: '살금살금 걸어왔어요 一个词就说清"蹑手蹑脚走过来"，不必绕成长句', examplesEn: '살금살금 걸어왔어요 says \'sneaked over\' in one word—no need for a long sentence.' },
      { type: 'vocab', text: '同一个拟态语常一词多义，中文母语者想不到：깜빡깜빡 既是"灯一闪一闪"，也是"眨眼睛"，还是"走神/忘事"', textEn: 'The same mimetic word often has multiple meanings that Chinese speakers wouldn\'t expect: 깜빡깜빡 means both \'light flickering,\' \'blinking,\' and \'spacing out/forgetting.\'', examples: '불이 깜빡깜빡해요（灯闪）/ 눈을 깜빡깜빡해요（眨眼）/ 자꾸 깜빡깜빡해요（老忘事）', examplesEn: 'The light is flickering / Blinking eyes / Keep forgetting things' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '별이', role: 'subject' },
          { text: '반짝반짝', role: 'plain' },
          { text: '빛나요', role: 'verb' },
        ],
        zh: '星星闪闪。', zhEn: 'The stars are twinkling.',
        swapWords: ['별', '눈', '보석', '유리'],
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: '살금살금', role: 'plain' },
          { text: '걸어왔어요', role: 'verb' },
        ],
        zh: '孩子蹑手蹑脚。', zhEn: 'The child is tiptoeing.',
        swapWords: ['살금살금', '아장아장', '어슬렁어슬렁'],
      },
      {
        wordBlocks: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
        zh: '心怦怦跳。', zhEn: 'My heart pounds.',
        swapWords: ['두근두근', '콩닥콩닥', '팔딱팔딱'],
      },
    ],
    scenarios: [
      { icon: '✨', context: '闪光', contextEn: 'flash', ko: '별이 반짝반짝 빛나요.', zh: '星星闪闪。', zhEn: 'The stars are twinkling.' },
      { icon: '👣', context: '蹑手蹑脚', contextEn: 'tiptoe', ko: '아이가 살금살금 걸어왔어요.', zh: '孩子蹑手蹑脚。', zhEn: 'The child is tiptoeing.' },
      { icon: '💓', context: '心跳', contextEn: 'heartbeat', ko: '가슴이 두근두근 뛰어요.', zh: '心怦怦跳。', zhEn: 'My heart pounds.' },
      { icon: '💫', context: '晕眩', contextEn: 'dizzy', ko: '어지러워서 빙글빙글 돌아요.', zh: '晕得团团转。', zhEn: 'Spinning around dizzily.' },
      { icon: '🌈', context: '五彩', contextEn: 'colorful', ko: '옷이 알록달록 예뻐요.', zh: '衣服五彩缤纷。', zhEn: 'The clothes are colorful.' },
      { icon: '🏃', context: '气喘', contextEn: 'out of breath', ko: '헐레벌떡 뛰어왔어요.', zh: '气喘吁吁跑来。', zhEn: 'Came running out of breath.' },
    ],
    mistakes: [
      { wrong: '별이 반짝반짝이 빛나요', correct: '별이 반짝반짝 빛나요', note: '拟态语作副词直接接动词，不加助词', noteEn: 'Mimetic words as adverbs directly modify verbs without particles' },
      { wrong: '아이가 살금살금로 걸었어요', correct: '아이가 살금살금 걸었어요', note: '拟态语后不加 -로（因为它已经是副词）', noteEn: 'No -로 after mimetic words (since they\'re already adverbs)' },
      { wrong: '가슴이 두근두근', correct: '가슴이 두근두근 뛰어요', note: '拟态语后必须接动词，不能单独作谓语', noteEn: 'Mimetic words must be followed by a verb; they cannot stand alone as a predicate.' },
    ],
    quickTable: {
      title: '常见 의태어', titleEn: 'Common Mimetic Words',
      headers: ['状态', '拟态语', '例句'],
      rows: [
        ['闪光', '반짝반짝', '별이 반짝반짝 빛나요'],
        ['蹑手蹑脚', '살금살금', '살금살금 걸었어요'],
        ['心跳', '두근두근', '가슴이 두근두근 뛰어요'],
        ['蹒跚', '아장아장', '아기가 아장아장 걸어요'],
        ['团团转', '빙글빙글', '빙글빙글 돌아요'],
        ['五彩缤纷', '알록달록', '알록달록 예뻐요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '의태어 练习', titleEn: 'Mimetic Words Practice',
      body: '选择正确的拟态语', bodyEn: 'Choose the correct mimetic word.',
      questions: [
        {
          prompt: '"星星闪闪发光" 最合适？', promptEn: 'Which is best for "the stars sparkle"?',
          options: ['쨍그랑', '반짝반짝', '두근두근', '살금살금'],
          answer: 1,
          explanation: '视觉"闪光"用 반짝반짝。', explanationEn: 'For visual "sparkling," use 반짝반짝.',
        },
        {
          prompt: '"心怦怦跳" 最合适？', promptEn: 'Which is best for "my heart pounds"?',
          options: ['반짝반짝', '두근두근', '알록달록', '아장아장'],
          answer: 1,
          explanation: '心跳用 두근두근（也可 콩닥콩닥）。', explanationEn: 'For a heartbeat, use 두근두근 (also 콩닥콩닥).',
        },
        {
          prompt: '"孩子蹑手蹑脚走" 最合适？', promptEn: 'Which is best for "the child tiptoes"?',
          options: ['빙글빙글', '살금살금', '헐레벌떡', '두근두근'],
          answer: 1,
          explanation: '"蹑手蹑脚"用 살금살금。', explanationEn: 'For "tiptoeing," use 살금살금.',
        },
        {
          prompt: '의성어 与 의태어 的核心区别？', promptEn: 'What\'s the core difference between 의성어 and 의태어?',
          options: [
            '完全相同',
            '의성어 模拟"声音"，의태어 模拟"状态/动作"',
            '의성어 用于动物，의태어 用于人',
            '의성어 长，의태어 短',
          ],
          answer: 1,
          explanation: '의성어 = 声音；의태어 = 状态/动作。', explanationEn: '의성어 = sounds; 의태어 = states/actions.',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l01', 'card-p16-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语的<b>拟态语（의태어）</b>是全世界数量最多的语系之一。<br>반짝반짝（闪闪）· 살금살금（蹑手蹑脚）· 두근두근（怦怦跳）· 알록달록（五彩缤纷）。<br>掌握它，韩语一下子生动起来。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 拟态</b><br>
    ・普通：별이 빛나요.<br>
    ・拟态：별이 반짝반짝 빛나요.<br>
    <span style="color:#89756e">加拟态语，画面感立现</span>
  </div>
</div>`,
    compareLabel: '普通 vs 生动', compareLabelEn: 'Plain vs. Vivid',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">의태어（拟态语）</div>
  <div style="font-size:14px;color:#89756e">模拟状态与动作</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      视觉 → 반짝반짝 / 알록달록<br>
      动作 → 살금살금 / 아장아장<br>
      心理 → 두근두근 / 두리번두리번<br>
      记忆 → 깜빡깜빡 / 아리송아리송
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">반짝반짝이 빛나요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">반짝반짝 빛나요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">살금살금로 걸었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">살금살금 걸었어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：AB형 · 阴阳母音对比 ──────────────────────────────────────
  {
    id: 'card-p16-l03',
    partNumber: 16,
    lessonNumber: 3,
    title: 'AB형·阴阳母音对比', titleEn: 'AB Forms: Bright vs. Dark Vowel Contrast',
    whatItDoes: '음성/양성 交替', whatItDoesEn: 'Dark/Bright Vowel Alternation',
    whatItDoesBody: '韩语拟声/拟态语最独特的规律：<b>阳性母音（ㅏ/ㅗ）</b>用于"小/亮/轻/可爱"，<b>阴性母音（ㅓ/ㅜ）</b>用于"大/暗/重/沉"。同一词根换母音，语感截然不同：깡충깡충（小兔跳）vs 껑충껑충（大跳）；졸졸（小水流）vs 줄줄（大流）。', whatItDoesBodyEn: 'The most unique rule of Korean onomatopoeia/mimetic words: <b>bright vowels (ㅏ/ㅗ)</b> convey "small/bright/light/cute," while <b>dark vowels (ㅓ/ㅜ)</b> convey "big/dark/heavy/deep." Changing the vowel in the same root creates a completely different feel: 깡충깡충 (little bunny hops) vs. 껑충껑충 (big leaps); 졸졸 (small stream) vs. 줄줄 (large flow).',
    structureNote: '换母音：ㅏ/ㅗ ↔ ㅓ/ㅜ｜阳性→小可爱 / 阴性→大沉重', structureNoteEn: 'Vowel swap: ㅏ/ㅗ ↔ ㅓ/ㅜ | Bright → small/cute / Dark → big/heavy',
    rulesNote: 'ㅏ/ㅗ = 양성 = 小/亮/可爱｜ㅓ/ㅜ = 음성 = 大/暗/沉重', rulesNoteEn: 'ㅏ/ㅗ = bright = small/bright/cute | ㅓ/ㅜ = dark = big/dark/heavy',
    structures: [
      {
        ko: '토끼가 깡충깡충 뛰어요.',
        zh: '兔子蹦蹦跳跳。（阳性 → 小可爱）', zhEn: 'The rabbit hops along. (Bright vowel → small and cute)',
        tokens: [
          { text: '토끼가', role: 'subject' },
          { text: '깡충깡충', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
      },
      {
        ko: '큰 개가 껑충껑충 뛰어요.',
        zh: '大狗大步大步跳。（阴性 → 大沉重）', zhEn: 'The big dog bounds along. (Dark vowel → big and heavy)',
        tokens: [
          { text: '큰 개가', role: 'subject' },
          { text: '껑충껑충', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
      },
      {
        ko: '개울물이 졸졸 흘러요.',
        zh: '小溪潺潺流。（小水流）', zhEn: 'The stream trickles. (Small water flow)',
        tokens: [
          { text: '개울물이', role: 'subject' },
          { text: '졸졸', role: 'plain' },
          { text: '흘러요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '阳性 ㅏ/ㅗ → 小/亮/轻/可爱', textEn: 'Bright vowels ㅏ/ㅗ → small/bright/light/cute', examples: '깡충깡충 / 방긋 / 살랑살랑 / 반짝' },
      { type: 'rule', text: '阴性 ㅓ/ㅜ → 大/暗/重/沉重', textEn: 'Dark vowels ㅓ/ㅜ → big/dark/heavy/weighty', examples: '껑충껑충 / 벙긋 / 설렁설렁 / 번쩍' },
      { type: 'rule', text: '同一词根：깡충↔껑충 / 졸졸↔줄줄 / 반짝↔번쩍', textEn: 'Same root: 깡충↔껑충 / 졸졸↔줄줄 / 반짝↔번쩍', examples: '语义等级不同', examplesEn: 'Different levels of meaning' },
      { type: 'usage', text: '阳性适合描写"儿童 / 动物 / 精致物"', textEn: 'Bright vowels suit describing "children/animals/delicate things"', examples: '토끼가 깡충깡충 / 아기가 방긋 웃어요' },
      { type: 'usage', text: '阴性适合描写"成人 / 大物 / 沉重感"', textEn: 'Dark vowels suit describing "adults/large things/heaviness"', examples: '큰 개가 껑충껑충 / 물이 줄줄 흘러요' },
      { type: 'compare', text: '반짝 vs 번쩍 → 前者小闪，后者强闪', textEn: '반짝 vs 번쩍 → the former is a small sparkle, the latter a strong flash', examples: '별이 반짝 / 번개가 번쩍' },
      { type: 'note', text: '母音选错会让描写"错位"（大狗不会 깡충깡충）', textEn: 'Choosing the wrong vowel makes the description "off" (a big dog wouldn\'t go 깡충깡충)', examples: '토끼 → 깡충 / 사자 → 껑충' },
      { type: 'note', text: '别被"阴阳"这两个中文字带偏：中文里"阳"给人"强大"、"阴"给人"弱小"的感觉，韩语这里正好相反——阳性 ㅏ/ㅗ 才是小/轻/可爱，阴性 ㅓ/ㅜ 才是大/重/沉', textEn: 'Don\'t be misled by the Chinese words "bright" and "dark": in Chinese, "bright" feels powerful and "dark" feels weak, but Korean is the opposite—bright vowels ㅏ/ㅗ are small/light/cute, while dark vowels ㅓ/ㅜ are big/heavy/weighty.', examples: '记口诀：ㅏ/ㅗ 嘴张小=小事物，ㅓ/ㅜ 嘴张大=大事物', examplesEn: 'Remember the trick: ㅏ/ㅗ mouth small = small things, ㅓ/ㅜ mouth wide = big things' },
      { type: 'note', text: '这是"语感倾向"不是死规则：不能靠随手换母音去造词，也不是每个词都成对存在，要以实际用过的词为准', textEn: 'This is a "feel-based tendency," not a hard rule: you can\'t just swap vowels to coin words, and not every word has a pair—go by what\'s actually used.', examples: '반짝↔번쩍、졸졸↔줄줄 成对；但不能凭空造 *깽충 这种没人用的形式', examplesEn: '반짝↔번쩍, 졸졸↔줄줄 are pairs; but you can\'t just make up forms like *깽충 that nobody uses.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '토끼가', role: 'subject' },
          { text: '깡충깡충', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
        zh: '兔子蹦蹦跳。', zhEn: 'The rabbit hops and jumps.',
        swapWords: ['토끼', '아기 강아지', '다람쥐', '병아리'],
      },
      {
        wordBlocks: [
          { text: '큰 개가', role: 'subject' },
          { text: '껑충껑충', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
        zh: '大狗大跳。', zhEn: 'The big dog leaps and bounds.',
        swapWords: ['큰 개', '사자', '말', '기린'],
      },
      {
        wordBlocks: [
          { text: '개울물이', role: 'subject' },
          { text: '졸졸', role: 'plain' },
          { text: '흘러요', role: 'verb' },
        ],
        zh: '小溪潺潺。', zhEn: 'The stream babbles along.',
        swapWords: ['개울물', '샘물', '이슬', '눈물'],
      },
    ],
    scenarios: [
      { icon: '🐰', context: '小兔子跳', contextEn: 'A little rabbit hops.', ko: '토끼가 깡충깡충 뛰어요.', zh: '兔子蹦蹦跳。', zhEn: 'The rabbit hops and jumps.' },
      { icon: '🐕', context: '大狗跳', contextEn: 'A big dog jumps.', ko: '큰 개가 껑충껑충 뛰어요.', zh: '大狗大跳。', zhEn: 'The big dog leaps and bounds.' },
      { icon: '🌊', context: '小溪流', contextEn: 'A small stream flows.', ko: '개울물이 졸졸 흘러요.', zh: '小溪潺潺。', zhEn: 'The stream babbles along.' },
      { icon: '🌊', context: '大水流', contextEn: 'A big flow of water.', ko: '눈물이 줄줄 흘러요.', zh: '眼泪哗哗流。', zhEn: 'Tears stream down.' },
      { icon: '⭐', context: '小闪光', contextEn: 'A small glimmer.', ko: '별이 반짝 빛나요.', zh: '星星轻轻闪。', zhEn: 'Stars twinkle softly.' },
      { icon: '⚡', context: '大闪光', contextEn: 'A big flash.', ko: '번개가 번쩍 쳤어요.', zh: '闪电轰地打。', zhEn: 'Lightning strikes with a flash.' },
    ],
    mistakes: [
      { wrong: '큰 개가 깡충깡충 뛰어요', correct: '큰 개가 껑충껑충 뛰어요', note: '大狗大身体 → 阴性 껑충', noteEn: 'Big dog, big body → negative 껑충' },
      { wrong: '눈물이 졸졸 흘러요', correct: '눈물이 줄줄 흘러요', note: '眼泪流量多 → 阴性 줄줄', noteEn: 'Tears flow a lot → negative 줄줄' },
      { wrong: '토끼가 껑충껑충 뛰어요', correct: '토끼가 깡충깡충 뛰어요', note: '兔子小 → 阳性 깡충', noteEn: 'Rabbit is small → positive 깡충' },
    ],
    quickTable: {
      title: '阳性 vs 阴性 拟态对比', titleEn: 'Bright vs. Dark Mimetic Contrast',
      headers: ['意象', '阳性（小/亮）', '阴性（大/沉）'],
      rows: [
        ['跳', '깡충깡충（小兔）', '껑충껑충（大狗）'],
        ['流水', '졸졸（小溪）', '줄줄（大流）'],
        ['闪光', '반짝（星星）', '번쩍（闪电）'],
        ['风', '살랑살랑（微风）', '설렁설렁（强风）'],
        ['笑', '방긋（可爱）', '벙긋（傻笑）'],
        ['泪', '방울방울（一滴滴）', '뻘뻘（豆大）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '阴阳母音 练习', titleEn: 'Bright/Dark Vowel Practice',
      body: '选择合适的拟态语', bodyEn: 'Choose the right mimetic word.',
      questions: [
        {
          prompt: '"兔子蹦蹦跳" 最合适？', promptEn: 'Is "the rabbit hops and jumps" the best fit?',
          options: ['껑충껑충', '깡충깡충', '살랑살랑', '뒤뚱뒤뚱'],
          answer: 1,
          explanation: '小兔子 → 阳性 깡충깡충。', explanationEn: 'A little rabbit → positive 깡충깡충.',
        },
        {
          prompt: '"眼泪哗哗流" 最合适？', promptEn: 'Is "tears stream down" the best fit?',
          options: ['졸졸', '줄줄', '반짝', '살랑'],
          answer: 1,
          explanation: '大量流 → 阴性 줄줄。', explanationEn: 'Flowing a lot → negative 줄줄.',
        },
        {
          prompt: '"闪电轰地打" 最合适？', promptEn: 'Is "lightning strikes with a flash" the best fit?',
          options: ['반짝', '번쩍', '깜빡', '반짝반짝'],
          answer: 1,
          explanation: '闪电强大 → 阴性 번쩍。', explanationEn: 'Lightning is powerful → negative 번쩍.',
        },
        {
          prompt: '韩语拟声/拟态语中的"阴阳母音规律"是什么？', promptEn: 'What is the "vowel harmony rule" in Korean onomatopoeia/mimetic words?',
          options: [
            '阳性/阴性完全相同',
            'ㅏ/ㅗ = 小/可爱；ㅓ/ㅜ = 大/沉重',
            '只用阳性',
            'ㅏ/ㅗ = 大；ㅓ/ㅜ = 小',
          ],
          answer: 1,
          explanation: 'ㅏ/ㅗ（阳性）= 小/亮/轻；ㅓ/ㅜ（阴性）= 大/暗/沉。', explanationEn: 'ㅏ/ㅗ (positive) = small/bright/light; ㅓ/ㅜ (negative) = big/dark/heavy.',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l02', 'card-p16-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语拟态语的独特规律：<b>阴阳母音交替</b>。<br>ㅏ/ㅗ（阳性）→ 小/可爱：깡충 / 반짝 / 방긋<br>ㅓ/ㅜ（阴性）→ 大/沉重：껑충 / 번쩍 / 벙긋<br>同一词换母音，画面感立变。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>阳性 vs 阴性</b><br>
    ・阳性 → 小/可爱<br>
    <span style="color:#89756e">토끼가 깡충깡충 뛰어요.</span><br>
    ・阴性 → 大/沉重<br>
    <span style="color:#89756e">큰 개가 껑충껑충 뛰어요.</span>
  </div>
</div>`,
    compareLabel: '깡충 vs 껑충',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">阴阳母音对比</div>
  <div style="font-size:14px;color:#89756e">拟态语的核心规律</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">规律</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      阳性 ㅏ/ㅗ → 小/亮/可爱<br>
      阴性 ㅓ/ㅜ → 大/暗/沉重<br>
      깡충↔껑충 / 졸졸↔줄줄<br>
      반짝↔번쩍 / 방긋↔벙긋
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">큰 개가 깡충깡충</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">큰 개가 껑충껑충</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">눈물이 졸졸 흘러요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">눈물이 줄줄 흘러요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：반복형 拟态语 ──────────────────────────────────────
  {
    id: 'card-p16-l04',
    partNumber: 16,
    lessonNumber: 4,
    title: '반복형 拟态语', titleEn: 'Repeated-Form Mimetic Words',
    whatItDoes: 'AB→ABAB 反复', whatItDoesEn: 'AB→ABAB Repetition',
    whatItDoesBody: '韩语拟态语的另一个规律：单音节/双音节的"AB形"往往变成"ABAB形"来强调反复/持续。반짝→반짝반짝、두근→두근두근、헐레→헐레벌떡（例外）、깜빡→깜빡깜빡。ABAB形 强调"多次/持续"，AB形 强调"一次/瞬间"。', whatItDoesBodyEn: 'Another rule of Korean mimetic words: single/double-syllable "AB forms" often become "ABAB forms" to emphasize repetition/continuation. 반짝→반짝반짝, 두근→두근두근, 헐레→헐레벌떡 (exception), 깜빡→깜빡깜빡. ABAB forms emphasize "repeated/ongoing," while AB forms emphasize "once/momentary."',
    structureNote: 'AB → ABAB → 反复形态｜同词根，重复=持续/多次', structureNoteEn: 'AB → ABAB → repeated form | Same root, repetition = ongoing/multiple times',
    rulesNote: 'AB = 一次/瞬时｜ABAB = 反复/持续｜有些词只有 ABAB 形', rulesNoteEn: 'AB = once/instantaneous | ABAB = repeated/continuous | Some words only have ABAB form',
    structures: [
      {
        ko: '별이 반짝 빛났어요.',
        zh: '星星闪了一下。（一次）', zhEn: 'The star twinkled once. (one time)',
        tokens: [
          { text: '별이', role: 'subject' },
          { text: '반짝', role: 'plain' },
          { text: '빛났어요', role: 'verb' },
        ],
      },
      {
        ko: '별이 반짝반짝 빛나요.',
        zh: '星星闪闪发光。（反复/持续）', zhEn: 'The star sparkles. (repeated/continuous)',
        tokens: [
          { text: '별이', role: 'subject' },
          { text: '반짝반짝', role: 'plain' },
          { text: '빛나요', role: 'verb' },
        ],
      },
      {
        ko: '가슴이 두근두근 뛰어요.',
        zh: '心怦怦跳（反复）。', zhEn: 'Heart pounding (repeated).',
        tokens: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'AB → 一次/瞬时 · ABAB → 反复/持续', textEn: 'AB → one time/instant · ABAB → repeated/continuous', examples: '반짝（一闪） vs 반짝반짝（一直闪）', examplesEn: '반짝 (one flash) vs 반짝반짝 (keeps flashing)' },
      { type: 'rule', text: '同一 AB 词根衍生 ABAB', textEn: 'Same AB root derives ABAB', examples: '반짝→반짝반짝 / 두근→두근두근 / 깜빡→깜빡깜빡' },
      { type: 'rule', text: '部分词只有 ABAB 形（无 AB 单独）', textEn: 'Some words only have ABAB form (no standalone AB)', examples: '살금살금 / 두리번두리번 / 알록달록' },
      { type: 'usage', text: 'AB 强调一次性动作/瞬间视觉', textEn: 'AB emphasizes a one-time action/instant visual', examples: '별이 반짝 빛났어요.（闪了一下）', examplesEn: '별이 반짝 빛났어요. (flashed once)' },
      { type: 'usage', text: 'ABAB 强调反复性状态/延续', textEn: 'ABAB emphasizes a repeated state/continuation', examples: '별이 반짝반짝 빛나요.（一直闪）', examplesEn: '별이 반짝반짝 빛나요. (keeps flashing)' },
      { type: 'compare', text: '반짝 vs 반짝반짝 → 前者瞬时，后者持续', textEn: '반짝 vs 반짝반짝 → former is instant, latter is continuous', examples: '(瞬时) 반짝 지나갔어요 / (持续) 반짝반짝 빛나요', examplesEn: '(instant) 반짝 지나갔어요 / (continuous) 반짝반짝 빛나요' },
      { type: 'note', text: '选 AB 还是 ABAB 视语境判断动作是否反复', textEn: 'Choose AB or ABAB based on whether the action repeats in context', examples: '一下 vs 一直', examplesEn: 'Once vs continuously' },
      { type: 'note', text: '中文母语者的负迁移：中文拟声/拟态词几乎全是叠的（"闪闪""蹦蹦跳跳"），所以韩语里也习惯全部说成 ABAB，结果丢掉了瞬时的 AB 形。想表达"就那一下"时，记得用单个 AB', textEn: 'Negative transfer from Chinese speakers: Chinese onomatopoeia/mimetic words are almost all reduplicated ("闪闪" "蹦蹦跳跳"), so learners habitually say everything as ABAB in Korean, losing the instant AB form. To express "just that one time," remember to use the single AB.', examples: '想说"星星闪了一下"要说 반짝 빛났어요，说成 반짝반짝 就变成"一直闪"了', examplesEn: 'To say "the star twinkled once," use 반짝 빛났어요; saying 반짝반짝 makes it "keeps flashing."' },
      { type: 'vocab', text: 'ABAB 不都是同一音节翻倍，有些是 A+B 两个不同音节拼成的固定叠词，不能自己机械翻倍造出来，只能整词背：헐레벌떡（气喘吁吁）/ 티격태격（拌嘴）/ 울긋불긋（斑斓）', textEn: 'ABAB isn\'t always doubling the same syllable; some are fixed reduplications of two different syllables (A+B) that can\'t be mechanically doubled—you have to memorize the whole word: 헐레벌떡 (out of breath) / 티격태격 (bickering) / 울긋불긋 (colorful)', examples: '헐레벌떡 不是 *헐레헐레，울긋불긋 不是 *울긋울긋', examplesEn: '헐레벌떡 is not *헐레헐레, 울긋불긋 is not *울긋울긋' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '별이', role: 'subject' },
          { text: '반짝', role: 'plain' },
          { text: '빛났어요', role: 'verb' },
        ],
        zh: '星星闪一下。', zhEn: 'The star twinkles once.',
        swapWords: ['반짝', '번쩍', '깜빡', '살짝'],
      },
      {
        wordBlocks: [
          { text: '별이', role: 'subject' },
          { text: '반짝반짝', role: 'plain' },
          { text: '빛나요', role: 'verb' },
        ],
        zh: '星星一直闪。', zhEn: 'The star keeps flashing.',
        swapWords: ['반짝반짝', '번쩍번쩍', '깜빡깜빡'],
      },
      {
        wordBlocks: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근', role: 'plain' },
          { text: '뛰어요', role: 'verb' },
        ],
        zh: '心怦怦跳。', zhEn: 'My heart pounds.',
        swapWords: ['두근두근', '콩닥콩닥', '팔딱팔딱'],
      },
    ],
    scenarios: [
      { icon: '✨', context: '一次闪', contextEn: 'One flash', ko: '별이 반짝 빛났어요.', zh: '星星闪一下。', zhEn: 'The star twinkles once.' },
      { icon: '⭐', context: '持续闪', contextEn: 'Continuous flashing', ko: '별이 반짝반짝 빛나요.', zh: '星星一直闪。', zhEn: 'The star keeps flashing.' },
      { icon: '💓', context: '反复心跳', contextEn: 'Repeated heartbeat', ko: '가슴이 두근두근 뛰어요.', zh: '心怦怦跳。', zhEn: 'My heart pounds.' },
      { icon: '👁️', context: '眨眼', contextEn: 'Blink', ko: '눈을 깜빡깜빡 해요.', zh: '一直眨眼。', zhEn: 'Keep blinking.' },
      { icon: '🌊', context: '波涛', contextEn: 'waves', ko: '파도가 출렁출렁 쳐요.', zh: '波涛起伏。', zhEn: 'The waves rise and fall.' },
      { icon: '🌬️', context: '风飘', contextEn: 'wind drifting', ko: '깃발이 펄럭펄럭 날려요.', zh: '旗帜飘扬。', zhEn: 'The flag flutters.' },
    ],
    mistakes: [
      { wrong: '별이 반짝 빛나고 있어요', correct: '별이 반짝반짝 빛나고 있어요', note: '进行中/持续用 ABAB 形', noteEn: 'Ongoing/repeated → use ABAB form' },
      { wrong: '살금 걸었어요', correct: '살금살금 걸었어요', note: '살금 是习惯 ABAB 形式，不单独用 AB', noteEn: '살금 is habitually used in ABAB form, not alone as AB' },
      { wrong: '별이 반짝반짝 빛났어요（一下过去）', wrongEn: 'The stars twinkled (in the past)', correct: '별이 반짝 빛났어요', note: '"闪了一下"用 AB 形 반짝', noteEn: '"Flashed once" uses AB form 반짝' },
    ],
    quickTable: {
      title: 'AB vs ABAB',
      headers: ['AB', 'ABAB', '语感差异'],
      rows: [
        ['반짝', '반짝반짝', '一闪 / 持续闪'],
        ['두근', '두근두근', '一跳 / 反复跳'],
        ['깜빡', '깜빡깜빡', '一眨 / 反复眨'],
        ['펄럭', '펄럭펄럭', '一飘 / 反复飘'],
        ['(无)', '살금살금', '只反复形'],
        ['(无)', '알록달록', '只反复形'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '反复形拟态 练习', titleEn: 'Repeated Form Mimetic Practice',
      body: '选择合适的形式', bodyEn: 'Choose the appropriate form',
      questions: [
        {
          prompt: '"星星一直闪" 最合适？', promptEn: 'Which is best for "the stars keep twinkling"?',
          options: ['반짝', '반짝반짝', '깜빡', '깡충'],
          answer: 1,
          explanation: '持续/反复 → ABAB 形 → 반짝반짝。', explanationEn: 'Repeated/ongoing → ABAB form → 반짝반짝.',
        },
        {
          prompt: '"心一直怦怦跳" 最合适？', promptEn: 'Which is best for "my heart keeps pounding"?',
          options: ['두근', '두근두근', '반짝', '살금'],
          answer: 1,
          explanation: '反复心跳 → 두근두근。', explanationEn: 'Repeated heartbeat → 두근두근.',
        },
        {
          prompt: '"闪了一下" 最合适？', promptEn: 'Which is best for "flashed once"?',
          options: ['반짝반짝', '반짝', '깜빡깜빡', '살랑살랑'],
          answer: 1,
          explanation: '一次瞬时 → AB 形 → 반짝。', explanationEn: 'One-time instant → AB form → 반짝.',
        },
        {
          prompt: 'AB 与 ABAB 形态的分工是？', promptEn: 'What\'s the division between AB and ABAB forms?',
          options: [
            '完全相同',
            'AB = 一次/瞬时；ABAB = 反复/持续',
            'AB 用于名词，ABAB 用于动词',
            'ABAB 只用于书面',
          ],
          answer: 1,
          explanation: 'AB → 一次/瞬时；ABAB → 反复/持续。', explanationEn: 'AB → one-time/instant; ABAB → repeated/ongoing.',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l03', 'card-p16-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">同一拟态语，AB 形和 ABAB 形语感完全不同：<br><b>반짝</b>（闪一下）· <b>반짝반짝</b>（一直闪）<br><b>두근</b>（一跳）· <b>두근두근</b>（反复跳）<br>AB = 瞬时 · ABAB = 反复。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>AB vs ABAB</b><br>
    ・AB → 一次瞬时<br>
    <span style="color:#89756e">별이 반짝 빛났어요.</span><br>
    ・ABAB → 反复持续<br>
    <span style="color:#89756e">별이 반짝반짝 빛나요.</span>
  </div>
</div>`,
    compareLabel: 'AB vs ABAB',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">반복형 拟态语</div>
  <div style="font-size:14px;color:#89756e">AB → ABAB 强调反复</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">规律</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      AB → 一次/瞬时<br>
      ABAB → 反复/持续<br>
      반짝↔반짝반짝 / 두근↔두근두근<br>
      깜빡↔깜빡깜빡 / 펄럭↔펄럭펄럭
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">별이 반짝 빛나고 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">별이 반짝반짝 빛나고 있어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">살금 걸었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">살금살금 걸었어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：심리·감정 拟态语 ──────────────────────────────────────
  {
    id: 'card-p16-l05',
    partNumber: 16,
    lessonNumber: 5,
    title: '심리·감정 拟态语', titleEn: '심리·감정 Mimetic Words',
    whatItDoes: '心理感情', whatItDoesEn: 'Psychology and Emotions',
    whatItDoesBody: '心理/感情类拟态语让韩语情感表达立体：두근두근（怦怦紧张）、설레설레（心动）、안절부절（坐立不安）、조마조마（提心吊胆）、두리번두리번（东张西望）、멍하니（呆呆地）。恋爱剧和心理描写不可缺。', whatItDoesBodyEn: 'Psychology/emotion mimetic words make Korean emotional expression vivid: 두근두근 (heart pounding nervously), 설레설레 (heart fluttering), 안절부절 (restless), 조마조마 (anxious), 두리번두리번 (looking around), 멍하니 (blankly). Essential for romance dramas and psychological descriptions.',
    structureNote: '拟态语 + 动词/形容词｜多为反复形 ABAB', structureNoteEn: 'Mimetic word + verb/adjective | Mostly repeated ABAB form',
    rulesNote: '두근두근/설레설레→期待｜조마조마/안절부절→焦虑｜멍하니/두리번두리번→迷茫', rulesNoteEn: '두근두근/설레설레→anticipation | 조마조마/안절부절→anxiety | 멍하니/두리번두리번→confusion',
    structures: [
      {
        ko: '내일 발표라 두근두근 떨려요.',
        zh: '明天要发表，心怦怦紧张。', zhEn: 'I have a presentation tomorrow, my heart is pounding nervously.',
        tokens: [
          { text: '내일 발표라', role: 'plain' },
          { text: '두근두근', role: 'plain' },
          { text: '떨려요', role: 'verb' },
        ],
      },
      {
        ko: '결과가 나올 때까지 조마조마했어요.',
        zh: '结果出来之前一直提心吊胆。', zhEn: 'I was on edge until the results came out.',
        tokens: [
          { text: '결과가 나올 때까지', role: 'plain' },
          { text: '조마조마했어요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 멍하니 창밖을 봐요.',
        zh: '民秀呆呆地望着窗外。', zhEn: 'Min-su stared blankly out the window.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '멍하니', role: 'plain' },
          { text: '창밖을', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '두근두근 → 期待/紧张的心跳', textEn: '두근두근 → heartbeat of anticipation/nervousness', examples: '두근두근 떨려요.（心怦怦地紧张。）', examplesEn: '두근두근 떨려요. (My heart is pounding nervously.)' },
      { type: 'rule', text: '콩닥콩닥 → 心怦怦跳（比 두근두근 更急促）', textEn: '콩닥콩닥 → heart pounding (more rapid than 두근두근)', examples: '첫 데이트라 콩닥콩닥 뛰었어요.（第一次约会，心怦怦直跳。）注意"心动"是动词 설레다（마음이 설레요），설레설레 其实是"摇头"的样子，别混用。', examplesEn: '첫 데이트라 콩닥콩닥 뛰었어요. (It was my first date, so my heart was pounding.) Note: "being excited" is the verb 설레다 (마음이 설레요), and 설레설레 actually means "shaking one\'s head" — don\'t mix them up.' },
      { type: 'rule', text: '조마조마 → 提心吊胆', textEn: 'Jomajoma → Nervous/anxious', examples: '결과 나올 때까지 조마조마했어요.（等结果出来前一直提心吊胆。）', examplesEn: 'I was on edge until the results came out.' },
      { type: 'rule', text: '안절부절 → 坐立不安', textEn: 'Anjeolbujeol → Fidgety/restless', examples: '기다리는 내내 안절부절 못 했어요.（等的时候一直坐立不安。）', examplesEn: 'I couldn\'t sit still the whole time I was waiting.' },
      { type: 'rule', text: '두리번두리번 → 东张西望', textEn: 'Duribeonduribeon → Look around', examples: '두리번두리번 주위를 살펴봤어요.（东张西望地打量四周。）', examplesEn: 'I looked around, glancing here and there.' },
      { type: 'rule', text: '멍하니 → 呆呆地/失神', textEn: 'Meonghani → Blankly/absent-minded', examples: '멍하니 창밖을 봐요.（呆呆地望着窗外。）', examplesEn: 'I stare blankly out the window.' },
      { type: 'usage', text: '안절부절 常固定搭配 못하다', textEn: 'Anjeolbujeol is often used with \'motada\'', examples: '안절부절 못 했어요（坐立不安）', examplesEn: 'I couldn\'t sit still (restless)' },
      { type: 'note', text: '심리감정类拟态语让韩剧台词生动化的关键', textEn: 'Mimetic words for emotions are key to making K-drama lines vivid', examples: '恋爱台词多用 두근두근 / 콩닥콩닥', examplesEn: 'Romantic lines often use 두근두근 / 콩닥콩닥' },
      { type: 'compare', text: '三个中文都可译成"紧张/不安"，韩语语感分岔：두근두근=心跳（既可期待也可害怕）｜조마조마=怕结果变坏的提心吊胆｜안절부절=坐不住的焦躁不安。别混用', textEn: 'All three can be translated as \'nervous/uneasy\' in Chinese, but Korean nuances differ: dugeundugeun = heartbeat (can be anticipation or fear) | jomajoma = anxious about a bad outcome | anjeolbujeol = restless and fidgety. Don\'t mix them up.', examples: '두근두근 떨려요（心跳）／결과까지 조마조마했어요（怕变坏）／안절부절 못 했어요（坐不住）', examplesEn: 'My heart is pounding (heartbeat) / I was anxious until the result (fear of bad outcome) / I couldn\'t sit still (restless)' },
      { type: 'note', text: '두근두근 情绪中性，靠上下文判正负；조마조마、안절부절 只形容负面焦虑，不能拿来表达开心的期待', textEn: 'Dugeundugeun is neutral and depends on context; jomajoma and anjeolbujeol only describe negative anxiety, not happy anticipation.', examples: '좋은 소식을 기다리며 두근두근해요.（等好消息心怦怦，✓期待）', examplesEn: 'My heart pounds waiting for good news (✓ anticipation)' },
      { type: 'note', text: '멍하니 不是 ABAB 反复形，它是 멍하다 的副词形（멍하다 → 멍하니），别照搬叠词规律写成 멍멍하니', textEn: 'Meonghani is not an ABAB reduplication; it\'s the adverb form of meonghada (meonghada → meonghani). Don\'t write it as meongmeonghani.', examples: '멍하니 창밖을 봐요.（呆呆望着窗外。）', examplesEn: 'I stare blankly out the window.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일 발표라', role: 'plain' },
          { text: '두근두근', role: 'plain' },
          { text: '떨려요', role: 'verb' },
        ],
        zh: '发表前紧张。', zhEn: 'Nervous before presenting.',
        swapWords: ['두근두근', '콩닥콩닥', '조마조마'],
      },
      {
        wordBlocks: [
          { text: '결과가 나올 때까지', role: 'plain' },
          { text: '조마조마했어요', role: 'verb' },
        ],
        zh: '一直提心吊胆。', zhEn: 'I\'ve been on edge the whole time.',
        swapWords: ['조마조마', '안절부절', '초조', '떨림'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '멍하니', role: 'plain' },
          { text: '창밖을', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '呆呆望窗外。', zhEn: 'Staring blankly out the window.',
        swapWords: ['멍하니', '멀뚱히', '넋 놓고', '무심히'],
      },
    ],
    scenarios: [
      { icon: '💓', context: '紧张', contextEn: 'nervous', ko: '두근두근 떨려요.', zh: '心怦怦跳。', zhEn: 'My heart pounds.' },
      { icon: '💕', context: '心动', contextEn: 'Heart flutter', ko: '고백 앞에서 마음이 설레요.', zh: '表白前心动（小鹿乱撞）。', zhEn: 'Heart flutters before confessing (butterflies in stomach).' },
      { icon: '😰', context: '提心', contextEn: 'On edge', ko: '결과까지 조마조마했어요.', zh: '一直提心吊胆。', zhEn: 'I\'ve been on edge the whole time.' },
      { icon: '😵', context: '坐立不安', contextEn: 'Restless', ko: '안절부절 못 했어요.', zh: '坐立不安。', zhEn: 'Fidgety.' },
      { icon: '👀', context: '东张西望', contextEn: 'Looking around', ko: '두리번두리번 살펴봤어요.', zh: '东张西望。', zhEn: 'Looking around.' },
      { icon: '😶', context: '呆呆', contextEn: 'Blankly', ko: '멍하니 창밖을 봐요.', zh: '呆呆望窗外。', zhEn: 'Staring blankly out the window.' },
    ],
    mistakes: [
      { wrong: '두근두근을 뛰어요', correct: '두근두근 뛰어요', note: '拟态语不加助词', noteEn: 'Mimetic words don\'t take particles' },
      { wrong: '안절부절 있어요', correct: '안절부절 못 했어요', note: '안절부절 固定搭配 못하다（否定辅助动词）', noteEn: '안절부절 is fixed with 못하다 (negative auxiliary verb)' },
      { wrong: '조마조마 있어요', correct: '조마조마해요', note: '조마조마 + 하다 变形容词性谓语', noteEn: '조마조마 + 하다 becomes an adjective predicate' },
    ],
    quickTable: {
      title: '심리·감정 拟态语', titleEn: '심리·감정 Mimetic Words',
      headers: ['拟态语', '含义', '例句'],
      rows: [
        ['두근두근', '紧张/期待心跳', '내일 두근두근 떨려요'],
        ['콩닥콩닥', '激动心跳', '가슴이 콩닥콩닥 뛰어요'],
        ['조마조마', '提心吊胆', '조마조마했어요'],
        ['안절부절', '坐立不安', '안절부절 못 했어요'],
        ['두리번두리번', '东张西望', '두리번두리번 봐요'],
        ['멍하니', '呆呆/失神', '멍하니 앉아 있어요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '심리감정 练习', titleEn: 'Psychology and Emotion Practice',
      body: '选择合适拟态语', bodyEn: 'Choose the right mimetic word',
      questions: [
        {
          prompt: '"发表前紧张心跳" 最合适？', promptEn: 'Which fits best for \'heart pounding before a presentation\'?',
          options: ['살금살금', '두근두근', '반짝반짝', '알록달록'],
          answer: 1,
          explanation: '"紧张心跳"用 두근두근。', explanationEn: 'Use 두근두근 for \'heart pounding.\'',
        },
        {
          prompt: '"结果出来前一直提心吊胆" 最合适？', promptEn: 'Which fits best for \'anxious until the results come out\'?',
          options: ['조마조마', '반짝반짝', '두근두근', '깜빡깜빡'],
          answer: 0,
          explanation: '"提心吊胆"用 조마조마。', explanationEn: 'Use 조마조마 for \'anxious.\'',
        },
        {
          prompt: '"발표 결과가 걱정돼서 (   ) 못 했어요."',
          options: ['두근두근', '안절부절', '살금살금', '깜빡깜빡'],
          answer: 1,
          explanation: '안절부절 固定搭 못하다 → 坐立不安。', explanationEn: '안절부절 + 못하다 → fidgety.',
        },
        {
          prompt: '"民秀呆呆望窗外" 最合适？', promptEn: 'Which fits best for \'Min-su staring blankly out the window\'?',
          options: ['두리번두리번', '멍하니', '반짝반짝', '설레설레'],
          answer: 1,
          explanation: '"呆呆/失神"用 멍하니。', explanationEn: 'Use 멍하니 for \'blankly/absent-minded.\'',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l02', 'card-p16-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">心理感情类拟态语是韩剧台词的灵魂：<br><b>두근두근</b>（紧张心跳）· <b>콩닥콩닥</b>（激动急促心跳）· <b>조마조마</b>（提心吊胆）· <b>안절부절</b>（坐立不安）· <b>멍하니</b>（呆呆）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>紧张 vs 焦虑</b><br>
    ・두근두근 → 紧张期待（心跳）<br>
    <span style="color:#89756e">발표라 두근두근 떨려요.</span><br>
    ・조마조마 → 提心吊胆（担心）<br>
    <span style="color:#89756e">결과까지 조마조마했어요.</span>
  </div>
</div>`,
    compareLabel: '두근 vs 조마',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">심리·감정 拟态语</div>
  <div style="font-size:14px;color:#89756e">韩剧台词的灵魂</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">6 大高频</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      두근두근 → 紧张心跳<br>
      콩닥콩닥 → 激动急促心跳<br>
      조마조마 → 提心吊胆<br>
      안절부절（+못하다）→ 坐立不安<br>
      두리번두리번 → 东张西望<br>
      멍하니 → 呆呆失神
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">안절부절 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">안절부절 못 했어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">조마조마 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">조마조마해요</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：움직임·모양 拟态语 ──────────────────────────────────────
  {
    id: 'card-p16-l06',
    partNumber: 16,
    lessonNumber: 6,
    title: '움직임·모양 拟态语', titleEn: '움직임·모양 Mimetic Words',
    whatItDoes: '动作与形态', whatItDoesEn: 'Actions and Shapes',
    whatItDoesBody: '动作/形态拟态语让描写立体：뒤뚱뒤뚱（一摇一摆）、엉금엉금（爬）、비틀비틀（踉跄）、허둥지둥（慌张）、성큼성큼（大步流星）、쭈뼛쭈뼛（缩着身子/害羞）。用对拟态语，人物形象立现。', whatItDoesBodyEn: 'Action/shape mimetic words make descriptions vivid: 뒤뚱뒤뚱 (waddling), 엉금엉금 (crawling), 비틀비틀 (staggering), 허둥지둥 (flustered), 성큼성큼 (striding), 쭈뼛쭈뼛 (shrinking/shy). Use the right mimetic word and the character comes to life.',
    structureNote: '拟态语 + 动词｜多为 ABAB 反复', structureNoteEn: 'Mimetic word + verb | Mostly ABAB repetition',
    rulesNote: '步态类 / 姿势类 / 速度类 / 慌乱类', rulesNoteEn: 'Gait / Posture / Speed / Flustered',
    structures: [
      {
        ko: '오리가 뒤뚱뒤뚱 걸어요.',
        zh: '鸭子一摇一摆走。', zhEn: 'The duck waddles.',
        tokens: [
          { text: '오리가', role: 'subject' },
          { text: '뒤뚱뒤뚱', role: 'plain' },
          { text: '걸어요', role: 'verb' },
        ],
      },
      {
        ko: '아기가 엉금엉금 기어와요.',
        zh: '宝宝爬着过来。', zhEn: 'The baby crawls over.',
        tokens: [
          { text: '아기가', role: 'subject' },
          { text: '엉금엉금', role: 'plain' },
          { text: '기어와요', role: 'verb' },
        ],
      },
      {
        ko: '민수가 성큼성큼 다가왔어요.',
        zh: '民秀大步流星走过来。', zhEn: 'Min-su strides over.',
        tokens: [
          { text: '민수가', role: 'subject' },
          { text: '성큼성큼', role: 'plain' },
          { text: '다가왔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '뒤뚱뒤뚱 → 一摇一摆（鸭子、企鹅、胖子）', textEn: '뒤뚱뒤뚱 → waddle (ducks, penguins, heavy people)', examples: '오리가 뒤뚱뒤뚱 걸어요.（鸭子摇摇摆摆地走。）', examplesEn: 'The duck waddles.' },
      { type: 'rule', text: '엉금엉금 → 爬行（婴儿、乌龟）', textEn: '엉금엉금 → crawl (babies, turtles)', examples: '아기가 엉금엉금 기어요.（宝宝慢吞吞地爬。）', examplesEn: 'The baby crawls slowly.' },
      { type: 'rule', text: '비틀비틀 → 踉跄（醉汉、生病）', textEn: '비틀비틀 → stagger (drunk, sick)', examples: '술 취해서 비틀비틀 걸어요.（喝醉了走路摇摇晃晃。）', examplesEn: 'He walks staggering drunk.' },
      { type: 'rule', text: '허둥지둥 → 慌张（迟到）', textEn: '허둥지둥 → flustered (being late)', examples: '허둥지둥 뛰어왔어요.（慌慌张张地跑来。）', examplesEn: 'Came running in a fluster.' },
      { type: 'rule', text: '성큼성큼 → 大步流星', textEn: '성큼성큼 → With big strides', examples: '성큼성큼 다가왔어요.（大步流星地走近。）', examplesEn: 'Came closer with big strides.' },
      { type: 'rule', text: '쭈뼛쭈뼛 → 缩着身子（害羞/紧张）', textEn: '쭈뼛쭈뼛 → Shrinking back (shy/nervous)', examples: '쭈뼛쭈뼛 다가왔어요.（怯生生地凑近。）', examplesEn: 'Came closer timidly.' },
      { type: 'usage', text: '选拟态语时看人物身份/状态', textEn: 'Choose the mimetic word based on the character\'s identity/state', examples: '婴儿=엉금엉금 / 醉汉=비틀비틀 / 迟到=허둥지둥', examplesEn: 'Baby=엉금엉금 / Drunkard=비틀비틀 / Late=허둥지둥' },
      { type: 'note', text: '拟态语搭错动词很奇怪', textEn: 'Pairing the wrong mimetic word with a verb sounds odd', examples: '误：뒤뚱뒤뚱 뛰어요 → 正：뒤뚱뒤뚱 걸어요', examplesEn: 'Wrong: 뒤뚱뒤뚱 뛰어요 → Right: 뒤뚱뒤뚱 걸어요' },
      { type: 'compare', text: '中文"摇摇晃晃"一个词，韩语要按原因分：뒤뚱뒤뚱=身体重/左右摇（鸭子、胖子，正常走）｜비틀비틀=站不稳/快摔倒（醉汉、生病）。译成中文都像，但不能互换', textEn: 'Chinese uses one word for "wobbling," but Korean distinguishes by cause: 뒤뚱뒤뚱=heavy body/swaying side to side (duck, fat person, normal walking) | 비틀비틀=unsteady/about to fall (drunkard, sick person). Both translate similarly to Chinese, but they can\'t be swapped.', examples: '오리가 뒤뚱뒤뚱 걸어요（重心摇摆）／술 취해서 비틀비틀 걸어요（站不稳）', examplesEn: 'The duck waddles (swaying重心) / Walks unsteadily because drunk (unsteady)' },
      { type: 'note', text: '성큼성큼 是"步子大又快"，别被字面误当成慢动作；엉금엉금 才是慢吞吞地爬', textEn: '성큼성큼 means "big and fast steps," don\'t mistake it for slow motion; 엉금엉금 is the slow crawl.', examples: '성큼성큼 다가왔어요（大步快速走近）／아기가 엉금엉금 기어요（慢慢爬）', examplesEn: 'Came closer with big quick strides / The baby crawls slowly' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오리가', role: 'subject' },
          { text: '뒤뚱뒤뚱', role: 'plain' },
          { text: '걸어요', role: 'verb' },
        ],
        zh: '鸭子一摇一摆。', zhEn: 'The duck waddles.',
        swapWords: ['오리', '펭귄', '거위', '아기'],
      },
      {
        wordBlocks: [
          { text: '아기가', role: 'subject' },
          { text: '엉금엉금', role: 'plain' },
          { text: '기어와요', role: 'verb' },
        ],
        zh: '宝宝爬来。', zhEn: 'The baby crawls over.',
        swapWords: ['엉금엉금', '엉기적엉기적', '기어서', '느리게'],
      },
      {
        wordBlocks: [
          { text: '민수가', role: 'subject' },
          { text: '성큼성큼', role: 'plain' },
          { text: '다가왔어요', role: 'verb' },
        ],
        zh: '民秀大步走来。', zhEn: 'Min-su walks over with big strides.',
        swapWords: ['성큼성큼', '큰 걸음', '뚜벅뚜벅', '당당히'],
      },
    ],
    scenarios: [
      { icon: '🦆', context: '鸭子步', contextEn: 'Duck waddle', ko: '오리가 뒤뚱뒤뚱 걸어요.', zh: '鸭子一摇一摆。', zhEn: 'The duck waddles.' },
      { icon: '👶', context: '爬行', contextEn: 'Crawling', ko: '아기가 엉금엉금 기어요.', zh: '宝宝爬。', zhEn: 'The baby crawls.' },
      { icon: '🍺', context: '醉汉', contextEn: 'Drunkard', ko: '술 취해서 비틀비틀 걸어요.', zh: '醉了踉跄。', zhEn: 'Staggers when drunk.' },
      { icon: '🏃', context: '慌张', contextEn: 'Flustered', ko: '허둥지둥 뛰어왔어요.', zh: '慌张跑来。', zhEn: 'Came running in a fluster.' },
      { icon: '👣', context: '大步', contextEn: 'Big strides', ko: '성큼성큼 다가왔어요.', zh: '大步流星。', zhEn: 'With big strides.' },
      { icon: '😳', context: '害羞', contextEn: 'Shy', ko: '쭈뼛쭈뼛 다가왔어요.', zh: '缩着身子过来。', zhEn: 'Come over hunched over.' },
    ],
    mistakes: [
      { wrong: '오리가 뒤뚱뒤뚱 뛰어요', correct: '오리가 뒤뚱뒤뚱 걸어요', note: '뒤뚱뒤뚱 只搭配 걷다，不搭 뛰다', noteEn: '뒤뚱뒤뚱 only pairs with 걷다, not 뛰다.' },
      { wrong: '아기가 엉금엉금 걸어요', correct: '아기가 엉금엉금 기어요', note: '엉금엉금 搭配 기다（爬）', noteEn: '엉금엉금 pairs with 기다 (crawl).' },
      { wrong: '민수가 성큼성큼 기어와요', correct: '민수가 성큼성큼 다가왔어요', note: '성큼성큼 搭配"大步走"，不搭 기다', noteEn: '성큼성큼 pairs with "walking with big strides," not 기다.' },
    ],
    quickTable: {
      title: '动作类拟态语', titleEn: 'Action Mimetic Words',
      headers: ['拟态语', '含义', '搭配'],
      rows: [
        ['뒤뚱뒤뚱', '一摇一摆', '걷다'],
        ['엉금엉금', '缓慢爬行', '기다'],
        ['비틀비틀', '踉跄', '걷다 / 서다'],
        ['허둥지둥', '慌张', '뛰다 / 오다'],
        ['성큼성큼', '大步流星', '걷다 / 다가오다'],
        ['쭈뼛쭈뼛', '缩着身子/害羞', '다가오다 / 서다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '动作拟态 练习', titleEn: 'Action Mimetic Practice',
      body: '选择合适的拟态语', bodyEn: 'Choose the right mimetic word.',
      questions: [
        {
          prompt: '"鸭子一摇一摆走" 最合适？', promptEn: 'What\'s best for "a duck waddling"?',
          options: ['성큼성큼', '뒤뚱뒤뚱', '엉금엉금', '비틀비틀'],
          answer: 1,
          explanation: '鸭子/企鹅步态 → 뒤뚱뒤뚱。', explanationEn: 'Duck/penguin gait → 뒤뚱뒤뚱.',
        },
        {
          prompt: '"宝宝爬" 最合适？', promptEn: 'What\'s best for "a baby crawling"?',
          options: ['성큼성큼', '뒤뚱뒤뚱', '엉금엉금', '허둥지둥'],
          answer: 2,
          explanation: '爬行 → 엉금엉금。', explanationEn: 'Crawling → 엉금엉금.',
        },
        {
          prompt: '"迟到了慌张跑来" 最合适？', promptEn: 'What\'s best for "running over flustered because you\'re late"?',
          options: ['성큼성큼', '허둥지둥', '뒤뚱뒤뚱', '엉금엉금'],
          answer: 1,
          explanation: '慌张 → 허둥지둥。', explanationEn: 'Flustered → 허둥지둥.',
        },
        {
          prompt: '"성큼성큼" 后面通常接？', promptEn: 'What usually follows 성큼성큼?',
          options: ['기어요', '뛰어요', '다가왔어요', '올라왔어요'],
          answer: 2,
          explanation: '성큼성큼 搭配 다가오다 / 걷다（大步）。', explanationEn: '성큼성큼 pairs with 다가오다 / 걷다 (big strides).',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l05', 'card-p16-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">动作/形态拟态语让描写立体：<br><b>뒤뚱뒤뚱</b>（一摇一摆）· <b>엉금엉금</b>（爬）· <b>비틀비틀</b>（踉跄）· <b>허둥지둥</b>（慌张）· <b>성큼성큼</b>（大步）· <b>쭈뼛쭈뼛</b>（缩身害羞）。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>慢 vs 快</b><br>
    ・慢/摇摆 → 뒤뚱뒤뚱 / 엉금엉금<br>
    <span style="color:#89756e">오리가 뒤뚱뒤뚱 걸어요.</span><br>
    ・快/大步 → 성큼성큼 / 허둥지둥<br>
    <span style="color:#89756e">성큼성큼 다가왔어요.</span>
  </div>
</div>`,
    compareLabel: '慢 vs 快', compareLabelEn: 'Slow vs. fast',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">움직임·모양 拟态语</div>
  <div style="font-size:14px;color:#89756e">生动化描写</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">6 大动作</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      뒤뚱뒤뚱 → 一摇一摆 · 걷다<br>
      엉금엉금 → 缓慢爬行 · 기다<br>
      비틀비틀 → 踉跄 · 걷다<br>
      허둥지둥 → 慌张 · 뛰다<br>
      성큼성큼 → 大步流星 · 걷다<br>
      쭈뼛쭈뼛 → 缩着 · 다가오다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">뒤뚱뒤뚱 뛰어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">뒤뚱뒤뚱 걸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">엉금엉금 걸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">엉금엉금 기어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：拟声/拟态语 + -하다/-거리다/-대다 ──────────────────────────────────────
  {
    id: 'card-p16-l07',
    partNumber: 16,
    lessonNumber: 7,
    title: '+ -하다/-거리다/-대다',
    whatItDoes: '词化 派生动词', whatItDoesEn: 'Lexicalized Derived Verbs',
    whatItDoesBody: '拟声/拟态语加上 -하다 / -거리다 / -대다 后缀，就变成动词/形容词。语感有别：-하다 中性（두근두근하다=心跳）、-거리다 强调反复动作、-대다 强调反复且带负面感（贬义）。掌握后可自由造词。', whatItDoesBodyEn: 'Adding suffixes -하다 / -거리다 / -대다 to onomatopoeic/mimetic words turns them into verbs/adjectives. Nuances differ: -하다 is neutral (두근두근하다 = heart pounding), -거리다 emphasizes repeated action, -대다 emphasizes repetition with a slightly negative feel (derogatory). Master these and you can create words freely.',
    structureNote: '拟态语 + -하다 / -거리다 / -대다 → 派生动词', structureNoteEn: 'Mimetic word + -하다 / -거리다 / -대다 → derived verb',
    rulesNote: '-하다 中性 / -거리다 反复 / -대다 反复+略贬｜三者常可互换但语感不同', rulesNoteEn: '-하다 neutral / -거리다 repeated / -대다 repeated + slightly negative | Often interchangeable but with different nuances',
    structures: [
      {
        ko: '가슴이 두근두근해요.',
        zh: '心怦怦跳。（-하다 中性）', zhEn: 'Heart pounding. (-하다 neutral)',
        tokens: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근해요', role: 'verb' },
        ],
      },
      {
        ko: '별이 반짝거려요.',
        zh: '星星一闪一闪。（-거리다 反复）', zhEn: 'Stars twinkling. (-거리다 repetitive)',
        tokens: [
          { text: '별이', role: 'subject' },
          { text: '반짝거려요', role: 'verb' },
        ],
      },
      {
        ko: '아이가 자꾸 칭얼대요.',
        zh: '孩子老是哭闹。（-대다 略负面）', zhEn: 'The kid keeps fussing. (-대다 slightly negative)',
        tokens: [
          { text: '아이가', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '칭얼대요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '拟态语 + -하다 → 中性谓语', textEn: 'Mimetic word + -하다 → neutral predicate', examples: '두근두근하다 / 반짝하다 / 살랑살랑하다' },
      { type: 'rule', text: '拟态语 AB + -거리다 → 反复动作', textEn: 'Mimetic word AB + -거리다 → repeated action', examples: '반짝거리다 / 두근거리다 / 살랑거리다' },
      { type: 'rule', text: '拟态语 AB + -대다 → 反复且略带贬义', textEn: 'Mimetic word AB + -대다 → repeated with a slightly negative tone', examples: '반짝대다 / 투덜대다 / 칭얼대다' },
      { type: 'usage', text: '同一词根三种后缀常可互换', textEn: 'The three suffixes on the same root are often interchangeable', examples: '두근두근하다 = 두근거리다 ≈ 두근대다（心怦怦跳，三种说法近义）', examplesEn: '두근두근하다 = 두근거리다 ≈ 두근대다 (heart pounding; all three are similar)' },
      { type: 'usage', text: '-대다 语感偏负面（对说话对象不太喜欢的行为）', textEn: '-대다 feels negative (behavior the speaker dislikes)', examples: '떠들다 → 떠들어대다（吵闹）', examplesEn: '떠들다 → 떠들어대다 (make noise)' },
      { type: 'compare', text: '-거리다 vs -대다', examples: '(中性) 반짝거리다 / (略负) 반짝대다', examplesEn: '(neutral) 반짝거리다 / (slightly negative) 반짝대다' },
      { type: 'note', text: 'AB (单次) + -거리다/-대다，不用 ABAB 形', textEn: 'AB (single occurrence) + -거리다/-대다, not the ABAB form', examples: '误：반짝반짝거리다 → 正：반짝거리다', examplesEn: 'Wrong: 반짝반짝거리다 → Right: 반짝거리다' },
      { type: 'note', text: '"三缀常可互换"是就成对的高频词说的，别当成"任意词根都能自造三种"。以实际存在的词为准，拿不准就用最稳的 -하다', textEn: 'The three suffixes are often interchangeable for common paired words, but don\'t assume any root can form all three. Stick to words that actually exist; when in doubt, use the safest -하다.', examples: '두근두근하다/두근거리다/두근대다 ✓ 都存在；生僻词别硬凑 X대다', examplesEn: '두근두근하다/두근거리다/두근대다 ✓ all exist; don\'t force X대다 for rare words.' },
      { type: 'note', text: '-대다 的贬义是"说话人自己的不满态度"，中文没有对应的动词后缀。夸自家宝宝可爱、或对客户说话时，别用 -대다，否则听起来像嫌弃', textEn: '-대다 carries the speaker\'s own dissatisfaction, which has no direct Chinese verb suffix. Don\'t use -대다 when praising your baby or speaking to clients—it sounds like complaining.', examples: '(嫌孩子烦) 자꾸 칭얼대요 ✓／(疼爱语气) 아기가 방긋방긋 웃어요 ✓ 不用 -대다', examplesEn: '(Annoyed) 자꾸 칭얼대요 ✓ / (Affectionate) 아기가 방긋방긋 웃어요 ✓—no -대다 needed.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '가슴이', role: 'subject' },
          { text: '두근두근해요', role: 'verb' },
        ],
        zh: '心怦怦跳。', zhEn: 'My heart pounds.',
        swapWords: ['두근두근하다', '두근거리다', '두근대다', '뛰다'],
      },
      {
        wordBlocks: [
          { text: '별이', role: 'subject' },
          { text: '반짝거려요', role: 'verb' },
        ],
        zh: '星星闪闪。', zhEn: 'The stars are twinkling.',
        swapWords: ['반짝거리다', '반짝반짝하다', '반짝하다', '빛나다'],
      },
      {
        wordBlocks: [
          { text: '아이가', role: 'subject' },
          { text: '자꾸', role: 'plain' },
          { text: '칭얼대요', role: 'verb' },
        ],
        zh: '孩子老哭闹。', zhEn: 'The child keeps whining.',
        swapWords: ['칭얼대다', '칭얼거리다', '보채다', '떼쓰다'],
      },
    ],
    scenarios: [
      { icon: '💓', context: '-하다', ko: '가슴이 두근두근해요.', zh: '心跳。', zhEn: 'Heartbeat.' },
      { icon: '✨', context: '-거리다', ko: '별이 반짝거려요.', zh: '闪闪。', zhEn: 'Sparkle.' },
      { icon: '👶', context: '-대다略贬', contextEn: '-대다 is slightly negative.', ko: '아이가 칭얼대요.', zh: '孩子哭闹。', zhEn: 'The child cries and fusses.' },
      { icon: '🌊', context: '-하다', ko: '파도가 출렁출렁해요.', zh: '波涛起伏。', zhEn: 'The waves rise and fall.' },
      { icon: '🌬️', context: '-거리다', ko: '깃발이 펄럭거려요.', zh: '旗帜飘动。', zhEn: 'The flag flutters.' },
      { icon: '🗣️', context: '-대다', ko: '옆에서 자꾸 떠들어대요.', zh: '旁边一直吵闹。', zhEn: 'It\'s noisy next door all the time.' },
    ],
    mistakes: [
      { wrong: '반짝반짝거려요', correct: '반짝거려요 / 반짝반짝해요', note: '-거리다 接单次形 AB，不接反复形 ABAB', noteEn: '-거리다 attaches to the single-action form AB, not the repeated form ABAB.' },
      { wrong: '두근거리해요', correct: '두근거려요 / 두근두근해요', note: '-거리다 和 -하다 二选一，不能叠加', noteEn: 'Choose either -거리다 or -하다—they can\'t be combined.' },
      { wrong: '(对客户) 이 시계가 반짝대요', wrongEn: '(To a client) 이 시계가 반짝대요', correct: '이 시계가 반짝반짝해요 / 반짝거려요', note: '-대다 略负面，正式场合避用', noteEn: '-대다 is slightly negative; avoid it in formal settings.' },
    ],
    quickTable: {
      title: '拟态派生动词', titleEn: 'Mimetic Derived Verbs',
      headers: ['形式', '语感', '例子'],
      rows: [
        ['ABAB + -하다', '中性/描写状态', '두근두근하다 / 반짝반짝하다'],
        ['AB + -거리다', '反复动作', '두근거리다 / 반짝거리다'],
        ['AB + -대다', '反复 + 略负面', '떠들어대다 / 칭얼대다'],
        ['AB + -이/-히', '副词化', '반짝이 / 살포시'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '派生动词 练习', titleEn: 'Derived Verb Practice',
      body: '选择合适形式', bodyEn: 'Choose the right form.',
      questions: [
        {
          prompt: '"心怦怦跳"（中性）最合适？', promptEn: 'Is "heart pounding" (neutral) the best fit?',
          options: ['두근두근이다', '두근두근해요', '두근두근을 뛰어요', '두근두근합니다'],
          answer: 1,
          explanation: 'ABAB + -하다 → 두근두근해요。',
        },
        {
          prompt: '"星星一闪一闪"（反复动作）最合适？', promptEn: 'Is "stars twinkling" (repeated action) the best fit?',
          options: ['반짝반짝거려요', '반짝거려요', '반짝하다요', '반짝합니다'],
          answer: 1,
          explanation: 'AB + -거리다 → 반짝거려요。ABAB 不接 -거리다。', explanationEn: 'AB + -거리다 → 반짝거려요. ABAB doesn\'t take -거리다.',
        },
        {
          prompt: '"孩子老是哭闹"（略负面）最合适？', promptEn: 'Is "the child keeps whining" (slightly negative) the best fit?',
          options: ['칭얼해요', '칭얼거려요', '칭얼대요', '칭얼합니다'],
          answer: 2,
          explanation: '-대다 有反复+负面感 → 칭얼대요（哭闹）。', explanationEn: '-대다 implies repetition + negativity → 칭얼대요 (whining).',
        },
        {
          prompt: '-하다 / -거리다 / -대다 三者的语感区别？', promptEn: 'What\'s the nuance difference among -하다 / -거리다 / -대다?',
          options: [
            '完全相同',
            '-하다 中性 / -거리다 反复动作 / -대다 反复+略负面',
            '-하다 用于形容词 / -거리다 用于动词 / -대다 用于名词',
            '-하다 用于口语 / -거리다 用于书面 / -대다 用于诗',
          ],
          answer: 1,
          explanation: '-하다（中性）/ -거리다（反复）/ -대다（反复+略负）。', explanationEn: '-하다 (neutral) / -거리다 (repetitive) / -대다 (repetitive + slightly negative).',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l04', 'card-p16-l08'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">拟态语加后缀就能造动词/形容词：<br><b>-하다</b>（中性）· <b>-거리다</b>（反复）· <b>-대다</b>（反复+略负）<br>두근두근하다 / 반짝거리다 / 칭얼대다。<br>选对后缀，语感立现。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-거리다 vs -대다</b><br>
    ・-거리다 → 中性反复<br>
    <span style="color:#89756e">별이 반짝거려요.</span><br>
    ・-대다 → 反复+略负面<br>
    <span style="color:#89756e">아이가 칭얼대요.</span>
  </div>
</div>`,
    compareLabel: '-거리다 vs -대다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">拟态语派生动词</div>
  <div style="font-size:14px;color:#89756e">-하다 / -거리다 / -대다</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">三大后缀</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      ABAB + <b>-하다</b> → 中性描写<br>
      AB + <b>-거리다</b> → 反复动作<br>
      AB + <b>-대다</b> → 反复 + 略负面
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">반짝반짝거려요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">반짝거려요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">두근거리해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">두근거려요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：조사/부사 搭配（-이/-히/-게）──────────────────────────────────────
  {
    id: 'card-p16-l08',
    partNumber: 16,
    lessonNumber: 8,
    title: '拟态语 + -이/-히/-게 搭配', titleEn: 'Mimetic Word + -이/-히/-게 Combinations',
    whatItDoes: '副词化搭配', whatItDoesEn: 'Adverbial Combinations',
    whatItDoesBody: '除了 -하다 / -거리다 / -대다，拟态语还可以搭 -이/-히/-게 变成"副词化描写"：반짝이（闪着）、살포시（轻轻地）、살랑살랑（微风飘）、가만히（悄悄地）。三者搭配规则不同，需按词记。', whatItDoesBodyEn: 'Besides -하다 / -거리다 / -대다, mimetic words can combine with -이/-히/-게 to become "adverbial descriptions": 반짝이 (sparkling), 살포시 (gently), 살랑살랑 (wafting in the breeze), 가만히 (quietly). The combination rules differ for each, so memorize them word by word.',
    structureNote: '拟态语 + -이 / -히 / -게 → 副词化｜按词固定搭配', structureNoteEn: 'Mimetic word + -이 / -히 / -게 → adverbialization | Fixed combinations per word',
    rulesNote: '-이：多修饰视觉/动作｜-히：多修饰状态/心境｜-게：通用副词化', rulesNoteEn: '-이: mostly modifies visuals/actions | -히: mostly modifies states/moods | -게: general adverbializer',
    structures: [
      {
        ko: '눈물이 반짝 빛났어요.',
        zh: '泪珠闪着光。', zhEn: 'Tears glisten.',
        tokens: [
          { text: '눈물이', role: 'subject' },
          { text: '반짝', role: 'plain' },
          { text: '빛났어요', role: 'verb' },
        ],
      },
      {
        ko: '살포시 미소 지었어요.',
        zh: '轻轻地微笑。', zhEn: 'Smile gently.',
        tokens: [
          { text: '살포시', role: 'plain' },
          { text: '미소', role: 'object' },
          { text: '지었어요', role: 'verb' },
        ],
      },
      {
        ko: '가만히 앉아 있었어요.',
        zh: '安静地坐着。', zhEn: 'Sit quietly.',
        tokens: [
          { text: '가만히', role: 'plain' },
          { text: '앉아 있었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '拟态语 + -이 → 副词化（视觉/动作）', textEn: 'Mimetic word + -이 → adverbialization (visual/action)', examples: '방긋 → 방긋이 / 생긋 → 생긋이' },
      { type: 'rule', text: '拟态语 + -히 → 副词化（状态/心境）', textEn: 'Mimetic word + -히 → adverbialization (state/mood)', examples: '살포시 / 조용히 / 가만히' },
      { type: 'rule', text: '拟态语/形容词 + -게 → 通用副词化', textEn: 'Mimetic/adjective + -게 → general adverbialization', examples: '조용하게 / 반짝이게 / 예쁘게' },
      { type: 'usage', text: '这些副词化形式修饰动词', textEn: 'These adverbial forms modify verbs', examples: '살포시 미소 지었어요.（轻轻地微笑。）', examplesEn: '살포시 미소 지었어요. (Smiled gently.)' },
      { type: 'usage', text: '有些 -이 也可作名词（반짝이=亮片）', textEn: 'Some -이 forms can also be nouns (반짝이 = sequin)', examples: '옷에 반짝이가 붙어 있어요.（衣服上沾着亮片。）', examplesEn: '옷에 반짝이가 붙어 있어요. (There are sequins on the clothes.)' },
      { type: 'compare', text: '-이 vs -히 → 前者多视觉动作，后者多状态心境', textEn: '-이 vs -히 → the former is more visual/action, the latter more state/mood', examples: '방긋이 vs 조용히 / 살포시' },
      { type: 'note', text: '搭配是习惯，不能自造 -이 或 -히', textEn: 'Collocations are habitual; you can\'t invent -이 or -히', examples: '误：두근이 → 正：두근두근해요 / 두근거려요', examplesEn: 'Wrong: 두근이 → Correct: 두근두근해요 / 두근거려요' },
      { type: 'note', text: '中文"地"一个字通吃，韩语这里没有万能标记：-이/-히 是逐词记死的固定形，不能靠语感现推。生词先查是否有副词形，没有就用 ABAB 原形或 -하게', textEn: 'Chinese uses one word \'地\' for everything, but Korean has no universal marker here: -이/-히 are fixed forms memorized per word, not derived by feel. For new words, check if an adverbial form exists; if not, use the ABAB base form or -하게', examples: '방긋 → 방긋이（✓固定）／살포시（✓固定）；查不到就用 살랑살랑 原形', examplesEn: '방긋 → 방긋이 (✓fixed) / 살포시 (✓fixed); if not found, use the base form 살랑살랑' },
      { type: 'note', text: '-게 虽通用，但不能顶替已有固定副词形。已经是副词的词（살포시、가만히）再加 -게 是错的', textEn: '-게 is general, but can\'t replace existing fixed adverbial forms. Adding -게 to words already adverbial (살포시, 가만히) is wrong', examples: '误：살포시게 → 正：살포시；误：가만히게 → 正：가만히', examplesEn: 'Wrong: 살포시게 → Correct: 살포시; Wrong: 가만히게 → Correct: 가만히' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '눈물이', role: 'subject' },
          { text: '반짝이', role: 'plain' },
          { text: '빛났어요', role: 'verb' },
        ],
        zh: '泪珠闪光。', zhEn: 'Tears glisten.',
        swapWords: ['반짝이', '반짝반짝', '눈물', '별처럼'],
      },
      {
        wordBlocks: [
          { text: '살포시', role: 'plain' },
          { text: '미소', role: 'object' },
          { text: '지었어요', role: 'verb' },
        ],
        zh: '轻轻微笑。', zhEn: 'Smile softly.',
        swapWords: ['살포시', '살짝', '가만히', '조용히'],
      },
      {
        wordBlocks: [
          { text: '가만히', role: 'plain' },
          { text: '앉아 있었어요', role: 'verb' },
        ],
        zh: '安静地坐着。', zhEn: 'Sit quietly.',
        swapWords: ['가만히', '조용히', '가만가만', '얌전히'],
      },
    ],
    scenarios: [
      { icon: '💧', context: '闪光', contextEn: 'flash', ko: '눈물이 반짝이 빛났어요.', zh: '泪珠闪光。', zhEn: 'Tears glisten.' },
      { icon: '😊', context: '轻笑', contextEn: 'Soft laugh', ko: '살포시 미소 지었어요.', zh: '轻轻微笑。', zhEn: 'Smile softly.' },
      { icon: '🧘', context: '安坐', contextEn: 'Sit still', ko: '가만히 앉아 있었어요.', zh: '安静坐着。', zhEn: 'Sit quietly.' },
      { icon: '🚶', context: '悄悄地', contextEn: 'Quietly', ko: '살금살금 다가갔어요.', zh: '悄悄靠近。', zhEn: 'Approach quietly.' },
      { icon: '🎈', context: '飘动', contextEn: 'Flutter', ko: '깃발이 살랑살랑 흔들려요.', zh: '旗子微微摆。', zhEn: 'The flag sways slightly.' },
      { icon: '📚', context: '仔细', contextEn: 'carefully', ko: '꼼꼼히 읽어봤어요.', zh: '仔细读了。', zhEn: 'I read it carefully.' },
    ],
    mistakes: [
      { wrong: '방긋히 웃었어요', correct: '방긋이 웃었어요', note: '방긋 + -이（固定搭配）', noteEn: '방긋 + -이 (fixed combination)' },
      { wrong: '살포시게 미소 지었어요', correct: '살포시 미소 지었어요', note: '살포시 已是副词，不用 -게', noteEn: '살포시 is already an adverb, no need for -게' },
      { wrong: '두근이 뛰어요', correct: '두근두근 뛰어요 / 두근거려요', note: '두근 没有 -이 副词形式', noteEn: '두근 has no -이 adverb form' },
    ],
    quickTable: {
      title: '拟态语副词化', titleEn: 'Adverbializing mimetic words',
      headers: ['形式', '语感', '例子'],
      rows: [
        ['AB + -이', '视觉/动作副词', '반짝이 / 방긋이 / 살랑이'],
        ['AB + -히', '状态/心境副词', '살포시 / 가만히 / 조용히'],
        ['AB/形容词 + -게', '通用副词', '조용하게 / 예쁘게'],
        ['ABAB', '副词（直接用）', '반짝반짝 / 살금살금'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '副词化搭配 练习', titleEn: 'Adverbialization collocation practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '"泪珠闪着光" 最合适？', promptEn: 'Is "teardrops glistening" the most suitable?',
          options: ['반짝히', '반짝이', '반짝게', '반짝'],
          answer: 1,
          explanation: '반짝 + -이 → 반짝이（固定搭配）。', explanationEn: '반짝 + -이 → 반짝이 (fixed combination).',
        },
        {
          prompt: '"轻轻微笑" 最合适？', promptEn: 'Is "gently smiling" the most suitable?',
          options: ['살포시', '살포시게', '살포시히', '살포시이'],
          answer: 0,
          explanation: '살포시 本身是副词，不再加后缀。', explanationEn: '살포시 is already an adverb, no suffix needed.',
        },
        {
          prompt: '"安静地坐着" 最合适？', promptEn: 'Is "sitting quietly" the most suitable?',
          options: ['가만이', '가만히', '가만하게', '가만가만이'],
          answer: 1,
          explanation: '固定副词是 가만히 / 조용히。', explanationEn: 'The fixed adverbs are 가만히 / 조용히.',
        },
        {
          prompt: '拟态语搭配副词化后缀的选用原则？', promptEn: 'What\'s the principle for choosing adverbial suffixes with mimetic words?',
          options: [
            '任意选择',
            '按词固定搭配 - -이 多视觉/动作，-히 多状态/心境',
            '所有都用 -게',
            '所有都用 -이',
          ],
          answer: 1,
          explanation: '固定搭配 - 按词记忆；-이 多视觉动作，-히 多状态心境。', explanationEn: 'Fixed combinations - memorize by word; -이 for visual actions, -히 for states and moods.',
        },
      ],
    },
    linkedGrammarIds: ['card-p16-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">拟态语除了 -하다/-거리다/-대다，还能变副词：<br><b>-이</b>（视觉动作）→ 반짝이 · 방긋이<br><b>-히</b>（状态心境）→ 살포시 · 가만히<br><b>-게</b>（通用）→ 조용하게 · 예쁘게<br>搭配固定，按词记忆。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-이 vs -히</b><br>
    ・-이 → 视觉/动作<br>
    <span style="color:#89756e">눈물이 반짝이 빛났어요.</span><br>
    ・-히 → 状态/心境<br>
    <span style="color:#89756e">살포시 미소 지었어요.</span>
  </div>
</div>`,
    compareLabel: '-이 vs -히',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">拟态语副词化</div>
  <div style="font-size:14px;color:#89756e">-이 / -히 / -게</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">副词化后缀</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      AB + <b>-이</b> → 视觉/动作<br>
      AB + <b>-히</b> → 状态/心境<br>
      + <b>-게</b> → 通用副词<br>
      ABAB → 直接作副词
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">반짝히 빛났어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">반짝이 빛났어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">두근이 뛰어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">두근두근 뛰어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P16 综合练习 ──────────────────────────────────────
  {
    id: 'card-p16-l09',
    partNumber: 16,
    lessonNumber: 9,
    title: 'P16 综合练习', titleEn: 'P16 Comprehensive Practice',
    isPractice: true,
    whatItDoes: '拟声/拟态语综合', whatItDoesEn: 'Onomatopoeia/mimetic words comprehensive',
    whatItDoesBody: '本课综合 P16 全部内容：의성어（拟声）· 의태어（拟态）· 阴阳母音对比 · 反复形 · 심리감정 · 움직임모양 · -하다/-거리다/-대다 · -이/-히/-게。', whatItDoesBodyEn: 'This lesson covers all of P16: 의성어 (onomatopoeia) · 의태어 (mimetic words) · yin-yang vowel contrast · reduplication · 심리감정 (psychological feelings) · 움직임모양 (movement/shape) · -하다/-거리다/-대다 · -이/-히/-게.',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P16 综合练习', titleEn: 'P16 Comprehensive Practice',
      body: '综合本章拟声/拟态内容', bodyEn: 'Summary of this chapter\'s onomatopoeia/mimetic content',
      questions: [
        {
          prompt: '"狗汪汪叫" 最合适？', promptEn: 'Is "the dog barking" the most suitable?',
          options: ['야옹', '멍멍', '짹짹', '쿵쿵'],
          answer: 1,
          explanation: '狗叫是 멍멍。', explanationEn: 'Dogs bark with 멍멍.',
        },
        {
          prompt: '"星星闪闪发光" 最合适？', promptEn: 'Which is best for "the stars sparkle"?',
          options: ['쨍그랑', '반짝반짝', '두근두근', '살금살금'],
          answer: 1,
          explanation: '视觉闪光 → 반짝반짝。', explanationEn: 'Visual flashing → 반짝반짝.',
        },
        {
          prompt: '"兔子蹦蹦跳" 最合适？', promptEn: 'Is "the rabbit hops and jumps" the best fit?',
          options: ['껑충껑충', '깡충깡충', '살랑살랑', '뒤뚱뒤뚱'],
          answer: 1,
          explanation: '小兔子 → 阳性 깡충깡충。', explanationEn: 'A little rabbit → positive 깡충깡충.',
        },
        {
          prompt: '"眼泪哗哗流" 最合适？', promptEn: 'Is "tears stream down" the best fit?',
          options: ['졸졸', '줄줄', '반짝', '살랑'],
          answer: 1,
          explanation: '大量流 → 阴性 줄줄。', explanationEn: 'Flowing a lot → negative 줄줄.',
        },
        {
          prompt: '"星星闪了一下" 最合适？', promptEn: 'Is "the star twinkled" the most suitable?',
          options: ['반짝반짝', '반짝', '깜빡깜빡', '살랑살랑'],
          answer: 1,
          explanation: '一次瞬时 → AB 形 → 반짝。', explanationEn: 'One-time instant → AB form → 반짝.',
        },
        {
          prompt: '"心一直怦怦跳" 最合适？', promptEn: 'Which is best for "my heart keeps pounding"?',
          options: ['두근', '두근두근', '반짝', '살금'],
          answer: 1,
          explanation: '反复心跳 → 두근두근。', explanationEn: 'Repeated heartbeat → 두근두근.',
        },
        {
          prompt: '"民秀大步流星走过来" 最合适？', promptEn: 'Is "Min-su striding over" the most suitable?',
          options: ['성큼성큼', '뒤뚱뒤뚱', '엉금엉금', '허둥지둥'],
          answer: 0,
          explanation: '大步 → 성큼성큼。', explanationEn: 'Big steps → 성큼성큼.',
        },
        {
          prompt: '"星星一闪一闪"（反复动作）最合适？', promptEn: 'Is "stars twinkling" (repeated action) the best fit?',
          options: ['반짝반짝거려요', '반짝거려요', '반짝하다요', '반짝합니다'],
          answer: 1,
          explanation: 'AB + -거리다 → 반짝거려요。',
        },
        {
          prompt: '"轻轻微笑" 最合适？', promptEn: 'Is "gently smiling" the most suitable?',
          options: ['살포시', '살포시게', '살포시히', '살포시이'],
          answer: 0,
          explanation: '살포시 已是副词。', explanationEn: '살포시 is already an adverb.',
        },
        {
          prompt: '의성어 与 의태어 的核心区别？', promptEn: 'What\'s the core difference between 의성어 and 의태어?',
          options: [
            '完全相同',
            '의성어 模拟"声音"；의태어 模拟"状态/动作"',
            '의성어 用于动物',
            '의성어 长，의태어 短',
          ],
          answer: 1,
          explanation: '의성어 = 声音；의태어 = 状态/动作。', explanationEn: '의성어 = sounds; 의태어 = states/actions.',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p16-l01',
      'card-p16-l02',
      'card-p16-l03',
      'card-p16-l04',
      'card-p16-l05',
      'card-p16-l06',
      'card-p16-l07',
      'card-p16-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P16 拟声/拟态语总结</div>
  <div style="font-size:14px;color:#89756e">2 大类 · 4 大规律</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">2 大类</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      의성어（拟声）→ 模拟声音<br>
      의태어（拟态）→ 模拟状态/动作
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">4 大规律</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 阴阳母音：ㅏ/ㅗ 阳性=小 · ㅓ/ㅜ 阴性=大<br>
      2. 反复形：AB=一次 · ABAB=反复<br>
      3. 派生动词：-하다 中性 · -거리다 反复 · -대다 略负<br>
      4. 副词化：-이 视觉 · -히 状态 · -게 通用
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">要点</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 拟声/拟态作副词直接接动词，不加助词<br>
      2. 阳性/阴性母音语感不同，选错让描写"错位"<br>
      3. AB vs ABAB 语义有别 - 一次 vs 反复<br>
      4. 后缀搭配是习惯，按词记忆<br>
      5. 掌握后韩语一下子生动立体
    </div>
  </div>
</div>`,
  },
];
