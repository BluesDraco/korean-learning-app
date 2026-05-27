export interface GrammarEntry {
  id: string;
  title: string;           // Korean grammar name
  titleKo: string;         // Korean name (한국어)
  level: 'beginner' | 'intermediate';
  category: string;        // e.g. '词尾', '助词', '连接', '终结'
  meaning: string;         // Chinese meaning
  conjugation: string;     // How to attach (conjugation rules)
  description: string;     // Detailed explanation in Chinese
  examples: {
    korean: string;
    romanization: string;
    chinese: string;
  }[];
  confusedWith?: {         // Similar grammar to distinguish
    grammar: string;
    difference: string;
  };
  tips?: string;           // Learning tip
  toriTip?: string;
}

export const beginnerGrammar: GrammarEntry[] = [
  // ── 助词 (Particles) ──
  {
    id: 'g-01',
    title: '은/는',
    titleKo: '은/는',
    level: 'beginner',
    category: '助词',
    meaning: '主题标记，"...是"（强调主题/对比）',
    conjugation: '有终声 + 은，无终声 + 는。例如：책은、나는',
    description: '은/는 是韩语的主题助词，用来标记句子的主题。它带有"对比"或"强调"的意味。与 이/가 不同，은/는 关注的是"关于这个主题的说明"。',
    examples: [
      { korean: '저는 학생이에요.', romanization: 'jeo-neun haksaeng-i-e-yo', chinese: '我是学生。' },
      { korean: '한국어는 재미있어요.', romanization: 'hangugeo-neun jaemiisseoyo', chinese: '韩语很有趣。（暗示其他语言可能不有趣）' },
      { korean: '오늘은 날씨가 좋아요.', romanization: 'oneul-eun nalssiga joayo', chinese: '今天天气好。（暗示其他日子不一定好）' },
    ],
    confusedWith: { grammar: '이/가', difference: '은/는 强调主题/对比；이/가 强调主语（回答"谁/什么"时用 이/가）' },
    tips: '新手记忆法：은/는 = "说到XX的话..."，像是在引出话题。',
    toriTip: '🐰 最简单的区分：第一次提到某人/物用 이/가，再次提到或大家都知道的话题用 은/는。"저는 토리예요"（我是托里—大家都知道我在这儿）vs "토리가 왔어요"（托里来了—告诉你一个新信息）。',
  },
  {
    id: 'g-02',
    title: '이/가',
    titleKo: '이/가',
    level: 'beginner',
    category: '助词',
    meaning: '主语标记，"...是"（中性陈述或回答提问）',
    conjugation: '有终声 + 이，无终声 + 가。例如：책이、내가',
    description: '이/가 是韩语的主语助词，标记动作或状态的主体。回答"누가?(谁?)"、"뭐가?(什么?)"时用 이/가。',
    examples: [
      { korean: '날씨가 좋아요.', romanization: 'nalssi-ga joayo', chinese: '天气好。（中性陈述）' },
      { korean: '누가 왔어요? 친구가 왔어요.', romanization: 'nuga wasseoyo? chinguga wasseoyo', chinese: '谁来了？朋友来了。' },
      { korean: '배가 고파요.', romanization: 'baega gopayo', chinese: '肚子饿。' },
    ],
    confusedWith: { grammar: '은/는', difference: '回答"누가/뭐가" → 用 이/가；展开新话题或对比 → 用 은/는' },
    toriTip: '🐰 问句里的"谁/什么"后面一定跟 이/가："누가 했어요?"（谁做的？）。回答也用 이/가："제가 했어요"（我做的）。이/가 把聚光灯打在主语上！',
  },
  {
    id: 'g-03',
    title: '을/를',
    titleKo: '을/를',
    level: 'beginner',
    category: '助词',
    meaning: '宾语标记，"把/将..."',
    conjugation: '有终声 + 을，无终声 + 를。例如：책을、커피를',
    description: '을/를 标记动作的承受者（宾语）。相当于中文的"把"字句中的宾语标记。',
    examples: [
      { korean: '밥을 먹어요.', romanization: 'babeul meogeoyo', chinese: '吃饭。' },
      { korean: '한국어를 공부해요.', romanization: 'hangugeo-reul gongbuhaeyo', chinese: '学习韩语。' },
      { korean: '음악을 들어요.', romanization: 'eumageul deureoyo', chinese: '听音乐。' },
    ],
    tips: '口语中经常省略 을/를，直接用名词 + 动词。但初学阶段建议先学会正确使用。',
  },
  {
    id: 'g-04',
    title: '에',
    titleKo: '에',
    level: 'beginner',
    category: '助词',
    meaning: '时间/地点标记，"在/到"',
    conjugation: '直接加在名词后。例如：학교에、3시에',
    description: '에 主要有两个用法：1) 表示"存在的地点"(있다/없다/살다 前)；2) 表示"时间点"（几点、几月几日）。注意：动作发生的场所用 에서，不用 에。',
    examples: [
      { korean: '학교에 있어요.', romanization: 'hakgyo-e isseoyo', chinese: '在学校。' },
      { korean: '3시에 만나요.', romanization: 'se-si-e mannayo', chinese: '3点见面。' },
      { korean: '집에 가요.', romanization: 'jibe gayo', chinese: '回家。（目的地）' },
    ],
    confusedWith: { grammar: '에서', difference: '에 = 存在的位置 / 目的地 / 时间点；에서 = 动作发生的场所' },
    toriTip: '🐰 口诀：있다/없다/가다/오다 前面用 에；공부하다/먹다/만나다 前面用 에서。"집에 가요"（回家，目的地用 에）vs "집에서 공부해요"（在家学习，动作用 에서）。',
  },
  {
    id: 'g-05',
    title: '에서',
    titleKo: '에서',
    level: 'beginner',
    category: '助词',
    meaning: '"在...(做某事)"或"从..."',
    conjugation: '直接加在名词后。例如：학교에서、집에서',
    description: '에서 有两个意思：1) 动作发生的场所（在哪里做某事）；2) 出发点（从哪里来）。',
    examples: [
      { korean: '학교에서 공부해요.', romanization: 'hakgyo-eseo gongbuhaeyo', chinese: '在学校学习。' },
      { korean: '한국에서 왔어요.', romanization: 'hangugeseo wasseoyo', chinese: '从韩国来的。' },
      { korean: '카페에서 친구를 만나요.', romanization: 'kapeeseo chingureul mannayo', chinese: '在咖啡厅见朋友。' },
    ],
  },

  // ── 终结词尾 (Sentence Endings) ──
  {
    id: 'g-06',
    title: '아요/어요/해요',
    titleKo: '아요/어요/해요',
    level: 'beginner',
    category: '终结',
    meaning: '礼貌体终结词尾，"...了/...呢"',
    conjugation: '词干最后元音为 ㅏ/ㅗ → 아요；其他 → 어요；하다 → 해요',
    description: '韩语中最常用的礼貌体终结词尾。是非正式场合的敬语（해요체），日常对话中使用频率最高。',
    examples: [
      { korean: '가다 → 가요', romanization: 'gada → gayo', chinese: '去 → 去' },
      { korean: '먹다 → 먹어요', romanization: 'meokda → meogeoyo', chinese: '吃 → 吃了/吃' },
      { korean: '공부하다 → 공부해요', romanization: 'gongbuhada → gongbuhaeyo', chinese: '学习 → 学习' },
    ],
    tips: '这是你最先要掌握的句型！几乎所有日常对话都用这个。',
    toriTip: '🐰 判断 아요 还是 어요 只要看词干最后一个元音！ㅏ/ㅗ → 아요（가요, 좋아요），其他 → 어요（먹어요, 읽어요）。하다 永远是 해요。记住了这三条规则，你就掌握了韩语80%的句子结尾！',
  },
  {
    id: 'g-07',
    title: 'ㅂ니다/습니다',
    titleKo: 'ㅂ니다/습니다',
    level: 'beginner',
    category: '终结',
    meaning: '正式敬语终结词尾',
    conjugation: '有终声 + 습니다，无终声 + ㅂ니다',
    description: '比 아/어요 更正式、更礼貌的终结语尾。用于正式场合、新闻播报、演讲、军队等。',
    examples: [
      { korean: '감사합니다.', romanization: 'gamsahamnida', chinese: '谢谢。' },
      { korean: '반갑습니다.', romanization: 'bangapseumnida', chinese: '很高兴见到你。' },
      { korean: '알겠습니다.', romanization: 'algesseumnida', chinese: '明白了。' },
    ],
  },

  // ── 时态 (Tense) ──
  {
    id: 'g-08',
    title: '았/었/했',
    titleKo: '았/었/했',
    level: 'beginner',
    category: '时态',
    meaning: '过去时，"...了/...过"',
    conjugation: '词干最后元音 ㅏ/ㅗ → 았어요；其他 → 었어요；하다 → 했어요',
    description: '韩语的过去时。规则与 아/어요 相同，在词干后加 았/었/했 再加 어요。',
    examples: [
      { korean: '어제 뭐 했어요?', romanization: 'eoje mwo haesseoyo?', chinese: '昨天做了什么？' },
      { korean: '밥 먹었어요.', romanization: 'bap meogeosseoyo', chinese: '吃过饭了。' },
      { korean: '영화 봤어요.', romanization: 'yeonghwa bwasseoyo', chinese: '看了电影。' },
    ],
    toriTip: '🐰 过去时和 아/어요 的变形规则完全一样！ㅏ/ㅗ → 았어요，其他 → 었어요，하다 → 했어요。记住：学会 아/어요 就自动学会了过去时！',
  },
  {
    id: 'g-09',
    title: '겠',
    titleKo: '겠',
    level: 'beginner',
    category: '时态',
    meaning: '将来时/推测，"会.../应该..."',
    conjugation: '词干 + 겠어요。例如：하겠어요、먹겠어요',
    description: '겠 有两个主要用法：1) 表示将来或意志（"我会做..."）；2) 表示推测（"应该/可能..."）。',
    examples: [
      { korean: '열심히 공부하겠습니다.', romanization: 'yeolsimhi gongbuhagesseumnida', chinese: '我会努力学习的。' },
      { korean: '맛있겠다!', romanization: 'masitgetda!', chinese: '看起来很好吃！' },
      { korean: '내일 비가 오겠어요.', romanization: 'naeil biga ogeteoyo', chinese: '明天应该会下雨。' },
    ],
    toriTip: '🐰 -겠- 最常用的场景是看到食物说"맛있겠다!"（看起来好好吃！）。你还可以说"힘들겠다"（看起来好累）、"춥겠다"（看着就冷），韩国人天天挂在嘴边！',
  },

  // ── 连接词尾 (Connective Endings) ──
  {
    id: 'g-10',
    title: '고',
    titleKo: '-고',
    level: 'beginner',
    category: '连接',
    meaning: '"...和.../...然后..."',
    conjugation: '词干 + 고。例如：먹고、하고',
    description: '连接两个动作或状态。可以表示并列（"既...又..."）或顺序（"先...然后..."）。',
    examples: [
      { korean: '밥을 먹고 커피를 마셨어요.', romanization: 'babeul meokgo keopireul masyeosseoyo', chinese: '吃了饭然后喝了咖啡。' },
      { korean: '예쁘고 똑똑해요.', romanization: 'yeppeugo ttokttokhaeyo', chinese: '又漂亮又聪明。' },
      { korean: '친구를 만나고 영화를 봤어요.', romanization: 'chingureul mannago yeonghwareul bwasseoyo', chinese: '见了朋友然后看了电影。' },
    ],
    toriTip: '🐰 -고 是串联事件的好帮手！"일어나고 씻고 밥 먹고 학교 가요"（起床、洗漱、吃饭、去学校）。一口气说完一天的活动，就像串糖葫芦一样简单。',
  },
  {
    id: 'g-11',
    title: '지만',
    titleKo: '-지만',
    level: 'beginner',
    category: '连接',
    meaning: '"虽然...但是..."',
    conjugation: '词干 + 지만。例如：먹지만、좋지만',
    description: '表示转折，相当于中文的"虽然...但是..."。前后两个分句是相反或对照的关系。',
    examples: [
      { korean: '한국어는 어렵지만 재미있어요.', romanization: 'hangugeo-neun eoryeopjiman jaemiisseoyo', chinese: '韩语虽然难但是有趣。' },
      { korean: '비싸지만 맛있어요.', romanization: 'bissajiman masisseoyo', chinese: '虽然贵但是好吃。' },
      { korean: '피곤하지만 공부해야 해요.', romanization: 'pigonhajiman gongbuhaeya haeyo', chinese: '虽然累但是得学习。' },
    ],
  },
  {
    id: 'g-12',
    title: '아서/어서/해서',
    titleKo: '-아서/어서/해서',
    level: 'beginner',
    category: '连接',
    meaning: '"因为...所以..."或"然后..."',
    conjugation: '与 아/어요 规则相同。例如：가서、먹어서、공부해서',
    description: '表示原因（"因为...所以..."）或时间的先后顺序（"...之后..."）。注意：前后主语一致时是顺序，表示原因时不受此限制。',
    examples: [
      { korean: '배가 고파서 밥을 먹었어요.', romanization: 'baega gopaseo babeul meogeosseoyo', chinese: '因为肚子饿了所以吃了饭。' },
      { korean: '학교에 가서 공부해요.', romanization: 'hakgyoe gaseo gongbuhaeyo', chinese: '去学校学习。' },
      { korean: '피곤해서 일찍 잤어요.', romanization: 'pigonhaeseo iljjik jasseoyo', chinese: '因为累了所以早睡了。' },
    ],
    confusedWith: { grammar: '니까', difference: '아서 不能用于命令句/请诱句；니까 可以用于命令句、请诱句' },
  },
  {
    id: 'g-13',
    title: '면/으면',
    titleKo: '-(으)면',
    level: 'beginner',
    category: '连接',
    meaning: '"如果...的话/当...的时候"',
    conjugation: '有终声 + 으면，无终声 + 면。例如：먹으면、가면',
    description: '表示假设条件或一般性条件。相当于"如果..."或"当...的时候"。',
    examples: [
      { korean: '시간이 있으면 만나요.', romanization: 'sigani isseumyeon mannayo', chinese: '如果有时间的话见面吧。' },
      { korean: '한국에 가면 뭐 할 거예요?', romanization: 'hanguge gamyeon mwo hal geoyeyo?', chinese: '去韩国的话要做什么？' },
      { korean: '봄이 되면 꽃이 펴요.', romanization: 'bomi doemyeon kkochi pyeoyo', chinese: '春天到了花就开了。' },
    ],
  },

  // ── 否定 (Negation) ──
  {
    id: 'g-14',
    title: '안 + 动词/形容词',
    titleKo: '안',
    level: 'beginner',
    category: '否定',
    meaning: '"不..."（简单否定）',
    conjugation: '안 + 动词/形容词。例如：안 먹어요、안 예뻐요',
    description: '最简单的否定方式，直接在前面加 안。主要用于口语。但 하다 类动词用 안 否定的形式是 안 해요。',
    examples: [
      { korean: '오늘 학교에 안 가요.', romanization: 'oneul hakgyoe an gayo', chinese: '今天不去学校。' },
      { korean: '이거 안 비싸요.', romanization: 'igeo an bissayo', chinese: '这个不贵。' },
      { korean: '아직 안 먹었어요.', romanization: 'ajik an meogeosseoyo', chinese: '还没吃。' },
    ],
  },
  {
    id: 'g-15',
    title: '지 않다',
    titleKo: '-지 않다',
    level: 'beginner',
    category: '否定',
    meaning: '"不..."（长形否定，更正式）',
    conjugation: '词干 + 지 않다。例如：먹지 않아요、예쁘지 않아요',
    description: '比 안 更正式、更完整的否定形式。在书面语和正式场合使用更多。',
    examples: [
      { korean: '저는 고기를 먹지 않아요.', romanization: 'jeoneun gogireul meokji anayo', chinese: '我不吃肉。' },
      { korean: '별로 좋지 않아요.', romanization: 'byeollo jochi anayo', chinese: '不太好。' },
    ],
  },
  {
    id: 'g-16',
    title: '못 + 动词',
    titleKo: '못',
    level: 'beginner',
    category: '否定',
    meaning: '"不能.../没办法..."（能力不足）',
    conjugation: '못 + 动词。例如：못 가요、못 먹어요',
    description: '못 表示"因为外部原因或能力不足而不能做某事"。区别于 안（主观不愿意）。',
    examples: [
      { korean: '바빠서 못 가요.', romanization: 'bappaseo mot gayo', chinese: '太忙了去不了。' },
      { korean: '매워서 못 먹어요.', romanization: 'maewoseo mot meogeoyo', chinese: '太辣了吃不了。' },
      { korean: '한국어를 못 해요.', romanization: 'hangugeo-reul mot haeyo', chinese: '不会韩语。' },
    ],
    confusedWith: { grammar: '안', difference: '안 = 主观不想做；못 = 能力不够或外部原因导致不能' },
    toriTip: '🐰 안 vs 못 是新手最容易搞混的一对！안 가요 = 我不去（不想去），못 가요 = 我去不了（想去但客观原因去不了）。"매워서 못 먹어요"（太辣吃不了 → 想吃但能力不够），不是 안 먹어요（不想吃）。',
  },

  // ── 意愿/能力 (Intention/Ability) ──
  {
    id: 'g-17',
    title: '고 싶다',
    titleKo: '-고 싶다',
    level: 'beginner',
    category: '意愿',
    meaning: '"想要..."',
    conjugation: '词干 + 고 싶어요。例如：먹고 싶어요、가고 싶어요',
    description: '表达愿望和希望。主语是第一人称时直接用，询问对方愿望时用 고 싶어요?',
    examples: [
      { korean: '한국에 가고 싶어요.', romanization: 'hanguge gago sipeoyo', chinese: '想去韩国。' },
      { korean: '뭐 먹고 싶어요?', romanization: 'mwo meokgo sipeoyo?', chinese: '想吃什么？' },
      { korean: '쉬고 싶어요.', romanization: 'swigo sipeoyo', chinese: '想休息。' },
    ],
  },
  {
    id: 'g-18',
    title: 'ㄹ/을 수 있다/없다',
    titleKo: '-(으)ㄹ 수 있다/없다',
    level: 'beginner',
    category: '能力',
    meaning: '"能/会..."或"不能..."',
    conjugation: '有终声 + 을 수 있다/없다，无终声 + ㄹ 수 있다/없다',
    description: '韩语中最常用的表达能力和可能性的语法。있다 表示"能"，없다 表示"不能"。与 못 不同，这个更正式完整。',
    examples: [
      { korean: '한국어를 할 수 있어요.', romanization: 'hangugeo-reul hal su isseoyo', chinese: '会说韩语。' },
      { korean: '내일 올 수 있어요?', romanization: 'naeil ol su isseoyo?', chinese: '明天能来吗？' },
      { korean: '매워서 먹을 수 없어요.', romanization: 'maewoseo meogeul su eopseoyo', chinese: '太辣了吃不了。' },
    ],
  },

  // ── 命令/建议 (Imperative/Suggestive) ──
  {
    id: 'g-19',
    title: '세요/으세요',
    titleKo: '-(으)세요',
    level: 'beginner',
    category: '命令',
    meaning: '"请..."（礼貌命令/请求）',
    conjugation: '有终声 + 으세요，无终声 + 세요。例如：먹으세요、가세요',
    description: '礼貌地请求或命令对方做某事。比直接用 아/어요 更尊敬。在餐厅、商店等服务场所使用频率很高。',
    examples: [
      { korean: '여기 앉으세요.', romanization: 'yeogi anjeuseyo', chinese: '请坐这里。' },
      { korean: '많이 드세요.', romanization: 'mani deuseyo', chinese: '请多吃点。' },
      { korean: '조심하세요!', romanization: 'josimhaseyo!', chinese: '请小心！' },
    ],
  },
  {
    id: 'g-20',
    title: '자',
    titleKo: '-자',
    level: 'beginner',
    category: '建议',
    meaning: '"一起...吧"（非敬语）',
    conjugation: '词干 + 자。例如：먹자、가자',
    description: '邀请对方一起做某事。注意：这是半语（반말），只对亲密的朋友或晚辈使用。对长辈用 -아/어요 或 -시죠。',
    examples: [
      { korean: '영화 보러 가자!', romanization: 'yeonghwa boreo gaja!', chinese: '一起去看电影吧！' },
      { korean: '밥 먹자!', romanization: 'bap meokja!', chinese: '一起吃饭吧！' },
    ],
  },

  // ── 名词化/修饰 (Nominalization/Modification) ──
  {
    id: 'g-21',
    title: '는 것',
    titleKo: '-는 것',
    level: 'beginner',
    category: '名词化',
    meaning: '"...这件事/...的行为"（将动词名词化）',
    conjugation: '动词词干 + 는 것。例如：먹는 것、공부하는 것',
    description: '将动词或形容词转换为名词形式。相当于中文的"做XX这件事"。韩语中非常关键的一个语法点。',
    examples: [
      { korean: '한국어 공부하는 것이 재미있어요.', romanization: 'hangugeo gongbuhaneun geosi jaemiisseoyo', chinese: '学韩语这件事很有趣。' },
      { korean: '운동하는 것을 좋아해요.', romanization: 'undonghaneun geoseul joahaeyo', chinese: '喜欢运动。' },
    ],
  },
  {
    id: 'g-22',
    title: 'ㄴ/은 / 는 / ㄹ/을',
    titleKo: '冠形词形',
    level: 'beginner',
    category: '修饰',
    meaning: '定语词尾，"...的XX"',
    conjugation: '形容词过去 + ㄴ/은，现在 + ㄴ/은；动词过去 + ㄴ/은，现在 + 는，将来 + ㄹ/을',
    description: '韩语用不同的词尾来修饰名词（做定语），与时态有关。这是韩语中最复杂的语法之一，需要分情况记忆。',
    examples: [
      { korean: '예쁜 꽃 → 漂亮的花', romanization: 'yeppeun kkot', chinese: '漂亮的花（形容词现在）' },
      { korean: '먹는 음식 → 正在吃的食物', romanization: 'meongneun eumsik', chinese: '正在吃的食物（动词现在）' },
      { korean: '읽은 책 → 读过的书', romanization: 'ilgeun chaek', chinese: '读过的书（动词过去）' },
      { korean: '할 일 → 要做的事', romanization: 'hal il', chinese: '要做的事（动词将来）' },
    ],
    tips: '简化记忆：形容词用 은/ㄴ，动词现在用 는，动词过去用 은/ㄴ，动词将来用 을/ㄹ。',
  },

  // ── 比较/程度 (Comparison/Degree) ──
  {
    id: 'g-23',
    title: '보다',
    titleKo: '보다',
    level: 'beginner',
    category: '比较',
    meaning: '"比..."',
    conjugation: '名词 + 보다。例如：나보다、어제보다',
    description: '表示比较。与 더（更）一起使用时是"比...更..."的意思。语序：比较对象 + 보다 + 主语 + 谓语。',
    examples: [
      { korean: '오늘은 어제보다 추워요.', romanization: 'oneureun eojeboda chuwoyo', chinese: '今天比昨天冷。' },
      { korean: '한국어가 영어보다 어려워요.', romanization: 'hangugeo-ga yeongeoboda eoryeowoyo', chinese: '韩语比英语难。' },
      { korean: '생각보다 재미있어요.', romanization: 'saenggakboda jaemiisseoyo', chinese: '比想象的有趣。' },
    ],
  },

  // ── 引用/间接引语 (Quotation) ──
  {
    id: 'g-24',
    title: '다고 하다',
    titleKo: '-다고 하다',
    level: 'beginner',
    category: '引用',
    meaning: '"据说.../听说..."',
    conjugation: '动词 + ㄴ/는다고 하다，形容词 + 다고 하다',
    description: '间接引语，引用别人的话或传达信息。口语中常简化为 대요。',
    examples: [
      { korean: '내일 비가 온다고 해요.', romanization: 'naeil biga ondago haeyo', chinese: '听说明天会下雨。' },
      { korean: '그 식당이 맛있다고 해요.', romanization: 'geu sikdangi masitdago haeyo', chinese: '听说那家餐厅好吃。' },
      { korean: '친구가 같이 가자고 했어요.', romanization: 'chinguga gachi gajago haesseoyo', chinese: '朋友说一起去吧。' },
    ],
  },

  // ── 义务/必要 (Obligation/Necessity) ──
  {
    id: 'g-25',
    title: '아/어야 되다/하다',
    titleKo: '-아/어야 되다/하다',
    level: 'beginner',
    category: '义务',
    meaning: '"必须.../得..."',
    conjugation: '词干 + 아/어야 되다/하다。与 아/어요 规则相同',
    description: '表示"必须做某事"或"应该做某事"。되다 和 하다 在此基本通用，되다 更口语化。',
    examples: [
      { korean: '지금 가야 돼요.', romanization: 'jigeum gaya dwaeyo', chinese: '现在得走了。' },
      { korean: '열심히 공부해야 해요.', romanization: 'yeolsimhi gongbuhaeya haeyo', chinese: '必须努力学习。' },
      { korean: '내일 일찍 일어나야 돼요.', romanization: 'naeil iljjik ireonaya dwaeyo', chinese: '明天得早起。' },
    ],
  },

  // ── 正在进行 (Progressive) ──
  {
    id: 'g-26',
    title: '고 있다',
    titleKo: '-고 있다',
    level: 'beginner',
    category: '进行',
    meaning: '"正在..."',
    conjugation: '词干 + 고 있다。例如：먹고 있어요、공부하고 있어요',
    description: '表示动作正在进行中，相当于英语的"be + -ing"或中文的"正在..."。',
    examples: [
      { korean: '지금 뭐 하고 있어요?', romanization: 'jigeum mwo hago isseoyo?', chinese: '现在在做什么？' },
      { korean: '한국어를 공부하고 있어요.', romanization: 'hangugeo-reul gongbuhago isseoyo', chinese: '正在学韩语。' },
      { korean: '비가 오고 있어요.', romanization: 'biga ogo isseoyo', chinese: '正在下雨。' },
    ],
  },

  // ── 经验 (Experience) ──
  {
    id: 'g-27',
    title: '아/어 본 적이 있다/없다',
    titleKo: '-아/어 본 적이 있다/없다',
    level: 'beginner',
    category: '经验',
    meaning: '"曾经...过/没...过"',
    conjugation: '词干 + 아/어 본 적이 있다/없다',
    description: '表示有/没有某种经历。相当于中文的"V + 过"。',
    examples: [
      { korean: '한국에 가 본 적이 있어요.', romanization: 'hanguge ga bon jeogi isseoyo', chinese: '去过韩国。' },
      { korean: '김치를 먹어 본 적이 없어요.', romanization: 'gimchireul meogeo bon jeogi eopseoyo', chinese: '没吃过泡菜。' },
      { korean: '이 노래 들어 본 적이 있어요?', romanization: 'i norae deureo bon jeogi isseoyo?', chinese: '听过这首歌吗？' },
    ],
  },

  // ── 尝试 (Attempt) ──
  {
    id: 'g-28',
    title: '아/어 보다',
    titleKo: '-아/어 보다',
    level: 'beginner',
    category: '尝试',
    meaning: '"试着做.../做做看"',
    conjugation: '词干 + 아/어 보다',
    description: '表示尝试做某事。与过去式结合（아/어 봤어요）表示"试过了"。',
    examples: [
      { korean: '한국어로 말해 보세요.', romanization: 'hangugeo-ro malhae boseyo', chinese: '请试着用韩语说说看。' },
      { korean: '이거 먹어 봐요.', romanization: 'igeo meogeo bwayo', chinese: '尝尝这个看。' },
      { korean: '한복을 입어 보고 싶어요.', romanization: 'hanbogeul ibeo bogo sipeoyo', chinese: '想试穿韩服看看。' },
    ],
    confusedWith: { grammar: '아/어 본 적이 있다', difference: '아/어 보다 = 尝试做（动作本身）；아/어 본 적이 있다 = 有经验（过去曾做过）' },
  },

  // ── 原因/理由加强 (Stronger Reason) ──
  {
    id: 'g-29',
    title: '니까/으니까',
    titleKo: '-(으)니까',
    level: 'beginner',
    category: '原因',
    meaning: '"因为...所以..."（可用于命令/请求）',
    conjugation: '有终声 + 으니까，无终声 + 니까',
    description: '表示原因，但与 아/어서 不同的是，니까 可以用在命令句和请诱句中。语气比 아/어서 更强调主观理由。',
    examples: [
      { korean: '추우니까 코트 입으세요.', romanization: 'chuunikka koteu ibeuseyo', chinese: '因为冷，请穿上大衣吧。' },
      { korean: '배고프니까 밥 먹자!', romanization: 'baegopeunikka bap meokja!', chinese: '因为饿了，一起吃饭吧！' },
      { korean: '시간이 없으니까 빨리 가요.', romanization: 'sigani eopseunikka ppalli gayo', chinese: '因为没时间了，快走吧。' },
    ],
  },

  // ── 打算/计划 (Plan) ──
  {
    id: 'g-30',
    title: 'ㄹ/을 거예요',
    titleKo: '-(으)ㄹ 거예요',
    level: 'beginner',
    category: '计划',
    meaning: '"打算.../会..."（将来计划）',
    conjugation: '有终声 + 을 거예요，无终声 + ㄹ 거예요',
    description: '表示将来的计划或打算。比 겠 更确定。口语中使用频率最高的将来时表达。',
    examples: [
      { korean: '내일 뭐 할 거예요?', romanization: 'naeil mwo hal geoyeyo?', chinese: '明天打算做什么？' },
      { korean: '한국어를 계속 공부할 거예요.', romanization: 'hangugeo-reul gyesok gongbuhal geoyeyo', chinese: '打算继续学韩语。' },
      { korean: '주말에 친구를 만날 거예요.', romanization: 'jumare chingureul mannal geoyeyo', chinese: '周末打算见朋友。' },
    ],
  },
];
