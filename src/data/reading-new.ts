import type { Article } from '@/types';

const now = Date.now();

export const readingArticles: Article[] = [
  // ═══════════════════════════════════════════
  // 1. 我喜欢咖啡 (A0) — 12 sentences
  // ═══════════════════════════════════════════
  {
    id: 'i-like-coffee',
    title: '我喜欢咖啡',
    titleKo: '저는 커피를 좋아해요',
    emoji: '☕',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会用"저는 ~를 좋아해요"表达喜好',
      '掌握8个咖啡相关词汇',
      '读懂一篇完整的韩语短文',
    ],
    coreWords: [
      { word: '저', meaning: '我（敬语）', pronunciation: 'jeo' },
      { word: '커피', meaning: '咖啡', pronunciation: 'keo-pi' },
      { word: '좋아해요', meaning: '喜欢', pronunciation: 'jo-a-hae-yo' },
      { word: '오늘', meaning: '今天', pronunciation: 'o-neul' },
      { word: '마셔요', meaning: '喝', pronunciation: 'ma-syeo-yo' },
      { word: '맛있어요', meaning: '好吃/好喝', pronunciation: 'ma-si-sseo-yo' },
      { word: '아이스', meaning: '冰的（外来词）', pronunciation: 'a-i-seu' },
      { word: '카페', meaning: '咖啡馆', pronunciation: 'ka-pe' },
    ],
    grammarIds: ['gp-01', 'gp-13', 'gp-19', 'gp-20'],
    sentences: [
      {
        id: 's1', ko: '안녕하세요! 저는 토리예요.', zh: '你好！我是 Tori。',
        pronunciation: 'an-nyeong-ha-se-yo! jeo-neun to-ri-ye-yo.',
        words: [{ word: '안녕하세요', meaning: '你好' }, { word: '저', meaning: '我' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '저는 커피를 정말 좋아해요.', zh: '我非常喜欢咖啡。',
        pronunciation: 'jeo-neun keo-pi-reul jeong-mal jo-a-hae-yo.',
        words: [{ word: '커피', meaning: '咖啡' }, { word: '정말', meaning: '真的/非常' }, { word: '좋아해요', meaning: '喜欢' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '매일 아침에 커피를 한 잔 마셔요.', zh: '每天早上喝一杯咖啡。',
        pronunciation: 'mae-il a-chi-me keo-pi-reul han jan ma-syeo-yo.',
        words: [{ word: '매일', meaning: '每天' }, { word: '아침', meaning: '早上' }, { word: '한 잔', meaning: '一杯' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's4', ko: '오늘은 날씨가 좋아서 카페에 왔어요.', zh: '今天天气很好，所以来了咖啡馆。',
        pronunciation: 'o-neu-reun nal-ssi-ga jo-a-seo ka-pe-e wa-sseo-yo.',
        words: [{ word: '날씨', meaning: '天气' }, { word: '카페', meaning: '咖啡馆' }, { word: '왔어요', meaning: '来了' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's5', ko: '이 카페는 분위기가 정말 좋아요.', zh: '这家咖啡馆气氛很好。',
        pronunciation: 'i ka-pe-neun bun-wi-gi-ga jeong-mal jo-a-yo.',
        words: [{ word: '분위기', meaning: '气氛' }, { word: '정말', meaning: '真的' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's6', ko: '따뜻한 아메리카노를 주문했어요.', zh: '我点了一杯热美式。',
        pronunciation: 'tta-tteu-tan a-me-ri-ka-no-reul ju-mun-hae-sseo-yo.',
        words: [{ word: '따뜻하다', meaning: '温暖的' }, { word: '아메리카노', meaning: '美式咖啡' }, { word: '주문했어요', meaning: '点了（下单了）' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's7', ko: '커피 향이 참 좋아요.', zh: '咖啡的香气真好。',
        pronunciation: 'keo-pi hyang-i cham jo-a-yo.',
        words: [{ word: '향', meaning: '香气' }, { word: '참', meaning: '真/很' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's8', ko: '저는 보통 라떼도 좋아해요.', zh: '我平时也喜欢拿铁。',
        pronunciation: 'jeo-neun bo-tong ra-tte-do jo-a-hae-yo.',
        words: [{ word: '보통', meaning: '通常/平时' }, { word: '라떼', meaning: '拿铁' }, { word: '~도', meaning: '也' }],
        grammarIds: ['gp-19'], difficulty: 'easy',
      },
      {
        id: 's9', ko: '친구는 달달한 바닐라 라떼를 마셨어요.', zh: '朋友喝了甜甜的香草拿铁。',
        pronunciation: 'chin-gu-neun dal-dal-han ba-nil-la ra-tte-reul ma-syeo-sseo-yo.',
        words: [{ word: '친구', meaning: '朋友' }, { word: '달달하다', meaning: '甜甜的' }, { word: '바닐라', meaning: '香草' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's10', ko: '아이스 커피도 인기가 많아요.', zh: '冰咖啡也很受欢迎。',
        pronunciation: 'a-i-seu keo-pi-do in-gi-ga ma-na-yo.',
        words: [{ word: '인기', meaning: '人气/受欢迎' }, { word: '많아요', meaning: '很多' }],
        grammarIds: ['gp-19', 'gp-20'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '한국 사람들은 정말 커피를 자주 마셔요.', zh: '韩国人真的很经常喝咖啡。',
        pronunciation: 'han-guk sa-ram-deu-reun jeong-mal keo-pi-reul ja-ju ma-syeo-yo.',
        words: [{ word: '한국 사람', meaning: '韩国人' }, { word: '자주', meaning: '经常/频繁' }],
        grammarIds: ['gp-13'], difficulty: 'medium',
      },
      {
        id: 's12', ko: '다음에 또 오고 싶어요!', zh: '下次还想再来！',
        pronunciation: 'da-eu-me tto o-go si-peo-yo!',
        words: [{ word: '다음', meaning: '下次' }, { word: '또', meaning: '再/又' }, { word: '~고 싶어요', meaning: '想做~' }],
        grammarIds: ['gp-15'], difficulty: 'easy',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇文章主要在讲什么？', options: ['作者去咖啡馆的经历', '韩国咖啡的历史', '如何制作咖啡', '咖啡的价格'], answer: 0, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"매일"是什么意思？', options: ['朋友', '每天', '咖啡', '今天'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者的朋友喝了什么？', options: ['美式咖啡', '冰咖啡', '香草拿铁', '什么都没喝'], answer: 2, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___를/를 좋아해요. ___도 좋아해요.', hint: '写两句话：我喜欢___，也喜欢___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 2. 便利店 (A0) — 12 sentences
  // ═══════════════════════════════════════════
  {
    id: 'convenience-store',
    title: '韩国便利店',
    titleKo: '한국 편의점',
    emoji: '🏪',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会购物时用韩语表达',
      '掌握便利店常见商品词汇',
      '练习"~(으)러 가요"句型',
    ],
    coreWords: [
      { word: '편의점', meaning: '便利店', pronunciation: 'pyeo-ni-jeom' },
      { word: '김밥', meaning: '紫菜包饭', pronunciation: 'gim-bap' },
      { word: '라면', meaning: '拉面', pronunciation: 'ra-myeon' },
      { word: '삼각김밥', meaning: '三角饭团', pronunciation: 'sam-gak-gim-bap' },
      { word: '음료수', meaning: '饮料', pronunciation: 'eum-nyo-su' },
      { word: '계산', meaning: '结账', pronunciation: 'gye-san' },
      { word: '사요', meaning: '买', pronunciation: 'sa-yo' },
    ],
    grammarIds: ['gp-01', 'gp-13', 'gp-14', 'gp-15'],
    sentences: [
      {
        id: 's1', ko: '오늘 편의점에 가요.', zh: '今天去便利店。',
        pronunciation: 'o-neul pyeo-ni-jeo-me ga-yo.',
        words: [{ word: '오늘', meaning: '今天' }, { word: '편의점', meaning: '便利店' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '한국 편의점에는 정말 다양한 음식이 있어요.', zh: '韩国便利店里真的有各种各样的食物。',
        pronunciation: 'han-guk pyeo-ni-jeo-me-neun jeong-mal da-yang-han eum-si-gi i-sseo-yo.',
        words: [{ word: '다양하다', meaning: '多样的' }, { word: '음식', meaning: '食物' }],
        grammarIds: ['gp-14'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '그중에서 김밥이 제일 인기가 많아요.', zh: '其中紫菜包饭最受欢迎。',
        pronunciation: 'geu-jung-e-seo gim-ba-bi je-il in-gi-ga ma-na-yo.',
        words: [{ word: '그중에서', meaning: '其中' }, { word: '제일', meaning: '最' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's4', ko: '참치 김밥하고 불고기 김밥을 샀어요.', zh: '买了金枪鱼紫菜包饭和烤肉紫菜包饭。',
        pronunciation: 'cham-chi gim-ba-pa-go bul-go-gi gim-ba-beul sa-sseo-yo.',
        words: [{ word: '참치', meaning: '金枪鱼' }, { word: '불고기', meaning: '烤牛肉' }],
        grammarIds: ['gp-13'], difficulty: 'medium',
      },
      {
        id: 's5', ko: '라면 코너도 정말 커요.', zh: '拉面区也很大。',
        pronunciation: 'ra-myeon ko-neo-do jeong-mal keo-yo.',
        words: [{ word: '코너', meaning: '角落/分类区' }, { word: '커요', meaning: '大' }],
        grammarIds: ['gp-19', 'gp-20'], difficulty: 'easy',
      },
      {
        id: 's6', ko: '육개장 라면이랑 신라면이 가장 유명해요.', zh: '牛肉汤拉面和新拉面最有名。',
        pronunciation: 'yuk-gae-jang ra-myeo-ni-rang sil-la-myeo-ni ga-jang yu-myeong-hae-yo.',
        words: [{ word: '가장', meaning: '最' }, { word: '유명해요', meaning: '有名' }],
        grammarIds: ['gp-20'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '저는 배가 고파서 삼각김밥도 하나 골랐어요.', zh: '我肚子饿了，所以也挑了一个三角饭团。',
        pronunciation: 'jeo-neun bae-ga go-pa-seo sam-gak-gim-bap-do ha-na gol-la-sseo-yo.',
        words: [{ word: '배가 고파요', meaning: '肚子饿' }, { word: '고르다', meaning: '挑选' }],
        grammarIds: ['gp-19'], difficulty: 'medium',
      },
      {
        id: 's8', ko: '음료수 냉장고에서 바나나 우유를 꺼냈어요.', zh: '从饮料冰箱里拿出了香蕉牛奶。',
        pronunciation: 'eum-nyo-su naeng-jang-go-e-seo ba-na-na u-yu-reul kkeo-nae-sseo-yo.',
        words: [{ word: '냉장고', meaning: '冰箱' }, { word: '바나나 우유', meaning: '香蕉牛奶' }],
        grammarIds: ['gp-13'], difficulty: 'medium',
      },
      {
        id: 's9', ko: '바나나 우유는 한국에서 진짜 인기 많아요!', zh: '香蕉牛奶在韩国真的超受欢迎！',
        pronunciation: 'ba-na-na u-yu-neun han-gu-ge-seo jin-jja in-gi ma-na-yo!',
        words: [{ word: '진짜', meaning: '真的（口语）' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's10', ko: '계산대에서 "카드로 할게요"라고 말했어요.', zh: '在收银台说了"用卡支付"。',
        pronunciation: 'gye-san-dae-e-seo "ka-deu-ro hal-ge-yo" ra-go mal-hae-sseo-yo.',
        words: [{ word: '계산대', meaning: '收银台' }, { word: '카드', meaning: '卡' }],
        grammarIds: ['gp-03'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '총 6,500원이었어요. 생각보다 싸요!', zh: '总共6500韩元。比想象中便宜！',
        pronunciation: 'chong yuk-cheon-o-bae-gwo-ni-eo-sseo-yo. saeng-gak-bo-da ssa-yo!',
        words: [{ word: '총', meaning: '总共' }, { word: '싸요', meaning: '便宜' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's12', ko: '한국 편의점 음식은 진짜 맛있어요. 꼭 드셔 보세요!', zh: '韩国便利店的食物真的很好吃。一定要尝尝！',
        pronunciation: 'han-guk pyeo-ni-jeom eum-si-geun jin-jja ma-si-sseo-yo. kkok deu-syeo bo-se-yo!',
        words: [{ word: '꼭', meaning: '一定' }, { word: '드셔 보세요', meaning: '请尝尝（敬语）' }],
        grammarIds: ['gp-15', 'gp-20'], difficulty: 'easy',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者在便利店里做了什么？', options: ['只看了价格', '买了各种食物', '遇到了朋友', '在便利店打工'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"배가 고파서"是什么意思？', options: ['因为下雨', '因为肚子饿', '因为开心', '因为赶时间'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者在便利店总共花了多少钱？', options: ['5,000韩元', '6,500韩元', '10,000韩元', '15,000韩元'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___에 가요. ___하고 ___을/를 사요.', hint: '写两句话：我去___。买了___和___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 3. 天气真好 (A0) — 12 sentences
  // ═══════════════════════════════════════════
  {
    id: 'nice-weather',
    title: '天气真好',
    titleKo: '날씨가 정말 좋아요',
    emoji: '🌤️',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会用韩语描述天气',
      '掌握季节相关词汇',
      '练习用"~(으)면"造句',
    ],
    coreWords: [
      { word: '날씨', meaning: '天气', pronunciation: 'nal-ssi' },
      { word: '봄', meaning: '春天', pronunciation: 'bom' },
      { word: '따뜻하다', meaning: '温暖', pronunciation: 'tta-tteu-ta-da' },
      { word: '하늘', meaning: '天空', pronunciation: 'ha-neul' },
      { word: '꽃', meaning: '花', pronunciation: 'kkot' },
      { word: '산책', meaning: '散步', pronunciation: 'san-chaek' },
    ],
    grammarIds: ['gp-01', 'gp-05', 'gp-15', 'gp-20'],
    sentences: [
      {
        id: 's1', ko: '오늘 날씨가 정말 좋아요!', zh: '今天天气真好！',
        pronunciation: 'o-neul nal-ssi-ga jeong-mal jo-a-yo!',
        words: [{ word: '날씨', meaning: '天气' }, { word: '좋아요', meaning: '好' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '하늘이 정말 파랗고 깨끗해요.', zh: '天空很蓝很干净。',
        pronunciation: 'ha-neu-ri jeong-mal pa-ra-ko kkae-kkeu-tae-yo.',
        words: [{ word: '하늘', meaning: '天空' }, { word: '파랗다', meaning: '蓝' }, { word: '깨끗하다', meaning: '干净' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '지금은 4월이에요. 봄이에요.', zh: '现在是4月。是春天。',
        pronunciation: 'ji-geu-meun sa-wo-ri-e-yo. bo-mi-e-yo.',
        words: [{ word: '지금', meaning: '现在' }, { word: '봄', meaning: '春天' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's4', ko: '한국의 봄은 정말 아름다워요.', zh: '韩国的春天真的很美。',
        pronunciation: 'han-gu-gui bo-meun jeong-mal a-reum-da-wo-yo.',
        words: [{ word: '아름다워요', meaning: '美丽' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's5', ko: '공원에 벚꽃이 많이 피었어요.', zh: '公园里樱花开了很多。',
        pronunciation: 'gong-wo-ne beot-kko-chi ma-ni pi-eo-sseo-yo.',
        words: [{ word: '공원', meaning: '公园' }, { word: '벚꽃', meaning: '樱花' }, { word: '피었어요', meaning: '开了（花）' }],
        grammarIds: ['gp-20'], difficulty: 'medium',
      },
      {
        id: 's6', ko: '사람들이 벚꽃 사진을 많이 찍고 있어요.', zh: '人们在拍很多樱花照片。',
        pronunciation: 'sa-ram-deu-ri beot-kkot sa-ji-neul ma-ni jjik-go i-sseo-yo.',
        words: [{ word: '사진', meaning: '照片' }, { word: '찍다', meaning: '拍（照）' }],
        grammarIds: ['gp-13', 'gp-08'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '날씨가 따뜻해서 산책하기 좋아요.', zh: '天气温暖，很适合散步。',
        pronunciation: 'nal-ssi-ga tta-tteu-tae-seo san-chae-ka-gi jo-a-yo.',
        words: [{ word: '따뜻해서', meaning: '因为温暖' }, { word: '산책하기', meaning: '散步这件事' }],
        grammarIds: ['gp-06'], difficulty: 'medium',
      },
      {
        id: 's8', ko: '바람도 살랑살랑 불어서 기분이 좋아요.', zh: '微风轻轻吹着，心情很好。',
        pronunciation: 'ba-ram-do sal-lang-sal-lang bu-reo-seo gi-bu-ni jo-a-yo.',
        words: [{ word: '바람', meaning: '风' }, { word: '살랑살랑', meaning: '轻轻吹拂（拟声词）' }, { word: '기분', meaning: '心情' }],
        grammarIds: ['gp-20'], difficulty: 'medium',
      },
      {
        id: 's9', ko: '친구랑 같이 벤치에 앉아서 이야기했어요.', zh: '和朋友一起坐在长椅上聊天了。',
        pronunciation: 'chin-gu-rang ga-chi ben-chi-e an-ja-seo i-ya-gi-hae-sseo-yo.',
        words: [{ word: '같이', meaning: '一起' }, { word: '벤치', meaning: '长椅' }, { word: '이야기했어요', meaning: '聊天了' }],
        grammarIds: ['gp-06'], difficulty: 'medium',
      },
      {
        id: 's10', ko: '봄에는 이렇게 밖에 나오는 게 좋아요.', zh: '春天这样出来外面真好。',
        pronunciation: 'bo-me-neun i-reo-ke ba-kke na-o-neun ge jo-a-yo.',
        words: [{ word: '밖', meaning: '外面' }, { word: '이렇게', meaning: '这样' }],
        grammarIds: ['gp-20', 'gp-05'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '날씨가 더우면 에어컨이 필요하지만, 봄은 딱 좋아요.', zh: '天气热的话需要空调，但春天刚刚好。',
        pronunciation: 'nal-ssi-ga deo-u-myeon e-eo-keo-ni pi-ryo-ha-ji-man, bo-meun ttak jo-a-yo.',
        words: [{ word: '덥다', meaning: '热' }, { word: '딱', meaning: '正好' }],
        grammarIds: ['gp-05', 'gp-04'], difficulty: 'hard',
      },
      {
        id: 's12', ko: '다음 주말에도 날씨가 좋으면 또 나올 거예요.', zh: '下周末天气好的话还会再出来。',
        pronunciation: 'da-eum ju-ma-re-do nal-ssi-ga jo-eu-myeon tto na-ol geo-ye-yo.',
        words: [{ word: '주말', meaning: '周末' }, { word: '나오다', meaning: '出来' }],
        grammarIds: ['gp-05', 'gp-15'], difficulty: 'medium',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者在做什么？', options: ['在办公室工作', '在公园享受春天', '在咖啡厅学习', '在家睡觉'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"벚꽃"是什么？', options: ['菊花', '樱花', '玫瑰', '梅花'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者为什么觉得心情好？', options: ['因为吃了好东西', '因为微风轻轻吹', '因为考试通过了', '因为工作完成了'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '오늘 날씨가 ___. 그래서 ___.', hint: '写两句话：今天天气___。所以___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 4. 我的日常 (A0) — 12 sentences
  // ═══════════════════════════════════════════
  {
    id: 'my-daily-routine',
    title: '我的一天',
    titleKo: '저의 하루',
    emoji: '⏰',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会描述一天的日程',
      '掌握时间表达和时间相关词汇',
      '练习"~(으)ㄴ 후에"句型',
    ],
    coreWords: [
      { word: '일어나요', meaning: '起床', pronunciation: 'i-reo-na-yo' },
      { word: '아침', meaning: '早上', pronunciation: 'a-chim' },
      { word: '먹어요', meaning: '吃', pronunciation: 'meo-geo-yo' },
      { word: '회사', meaning: '公司', pronunciation: 'hoe-sa' },
      { word: '퇴근', meaning: '下班', pronunciation: 'toe-geun' },
      { word: '자요', meaning: '睡觉', pronunciation: 'ja-yo' },
    ],
    grammarIds: ['gp-01', 'gp-05', 'gp-06', 'gp-13'],
    sentences: [
      {
        id: 's1', ko: '저는 보통 아침 7시에 일어나요.', zh: '我通常早上7点起床。',
        pronunciation: 'jeo-neun bo-tong a-chim il-gop-si-e i-reo-na-yo.',
        words: [{ word: '보통', meaning: '通常' }, { word: '일어나요', meaning: '起床' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '일어난 후에 바로 세수를 해요.', zh: '起床后马上洗脸。',
        pronunciation: 'i-reo-nan hu-e ba-ro se-su-reul hae-yo.',
        words: [{ word: '바로', meaning: '马上' }, { word: '세수', meaning: '洗脸' }],
        grammarIds: ['gp-06'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '아침 식사로 보통 토스트와 우유를 먹어요.', zh: '早餐一般吃吐司和牛奶。',
        pronunciation: 'a-chim sik-sa-ro bo-tong to-seu-teu-wa u-yu-reul meo-geo-yo.',
        words: [{ word: '식사', meaning: '餐/饭' }, { word: '토스트', meaning: '吐司' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's4', ko: '그리고 8시 반에 집에서 나와요.', zh: '然后8点半从家里出来。',
        pronunciation: 'geu-ri-go yeo-deol-si ba-ne ji-be-seo na-wa-yo.',
        words: [{ word: '반', meaning: '半' }, { word: '나와요', meaning: '出来' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's5', ko: '지하철로 회사에 가요. 30분쯤 걸려요.', zh: '坐地铁去公司。大概需要30分钟。',
        pronunciation: 'ji-ha-cheol-lo hoe-sa-e ga-yo. sam-sip-bun-jjeum geol-lyeo-yo.',
        words: [{ word: '지하철', meaning: '地铁' }, { word: '걸려요', meaning: '花费（时间）' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's6', ko: '회사에 도착하면 제일 먼저 커피를 마셔요.', zh: '到公司后第一件事就是喝咖啡。',
        pronunciation: 'hoe-sa-e do-cha-ka-myeon je-il meon-jeo keo-pi-reul ma-syeo-yo.',
        words: [{ word: '도착하면', meaning: '到达的话' }, { word: '제일 먼저', meaning: '最先' }],
        grammarIds: ['gp-05', 'gp-13'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '오전에는 주로 이메일을 확인하고 회의를 해요.', zh: '上午主要确认邮件和开会。',
        pronunciation: 'o-jeo-ne-neun ju-ro i-me-i-reul hwa-gin-ha-go hoe-i-reul hae-yo.',
        words: [{ word: '이메일', meaning: '邮件' }, { word: '회의', meaning: '会议' }],
        grammarIds: ['gp-13'], difficulty: 'medium',
      },
      {
        id: 's8', ko: '점심은 보통 동료들이랑 같이 먹어요.', zh: '午餐通常和同事们一起吃。',
        pronunciation: 'jeom-si-meun bo-tong dong-nyo-deu-ri-rang ga-chi meo-geo-yo.',
        words: [{ word: '점심', meaning: '午餐' }, { word: '동료', meaning: '同事' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's9', ko: '오늘은 비빔밥을 먹었어요. 아주 맛있었어요.', zh: '今天吃了拌饭。非常好吃。',
        pronunciation: 'o-neu-reun bi-bim-ba-beul meo-geo-sseo-yo. a-ju ma-si-sseo-sseo-yo.',
        words: [{ word: '비빔밥', meaning: '拌饭' }, { word: '아주', meaning: '非常' }],
        grammarIds: ['gp-13', 'gp-20'], difficulty: 'easy',
      },
      {
        id: 's10', ko: '오후에는 집중해서 일해요. 시간이 빨리 가요.', zh: '下午集中精力工作。时间过得很快。',
        pronunciation: 'o-hu-e-neun jip-jung-hae-seo il-hae-yo. si-ga-ni ppal-li ga-yo.',
        words: [{ word: '집중해서', meaning: '集中精力' }, { word: '빨리', meaning: '快/迅速' }],
        grammarIds: ['gp-06'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '보통 7시쯤 퇴근해요. 가끔은 좀 늦어요.', zh: '一般7点左右下班。偶尔会晚一点。',
        pronunciation: 'bo-tong il-gop-si-jjeum toe-geun-hae-yo. ga-kkeu-meun jom neu-jeo-yo.',
        words: [{ word: '퇴근', meaning: '下班' }, { word: '가끔', meaning: '偶尔' }, { word: '늦어요', meaning: '晚' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's12', ko: '집에 돌아오면 샤워하고 좀 쉬어요. 그리고 잠을 자요.', zh: '回家后洗个澡休息一下。然后睡觉。',
        pronunciation: 'ji-be do-ra-o-myeon sya-wo-ha-go jom swi-eo-yo. geu-ri-go ja-meul ja-yo.',
        words: [{ word: '돌아오다', meaning: '回来' }, { word: '샤워', meaning: '洗澡' }, { word: '쉬다', meaning: '休息' }],
        grammarIds: ['gp-05'], difficulty: 'medium',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇文章描述了什​么？', options: ['周末旅行', '作者一天的生活', '韩国饮食文化', '运动健身'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"퇴근"是什么意思？', options: ['上班', '下班', '加班', '请假'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者今天午餐吃了什么？', options: ['拉面', '吐司', '拌饭', '炸鸡'], answer: 2, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 보통 ___시에 일어나요. ___을/를 먹어요.', hint: '用韩语写你的起床时间和早餐内容。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 5. 周末计划 (A1) — 14 sentences
  // ═══════════════════════════════════════════
  {
    id: 'weekend-plans',
    title: '周末计划',
    titleKo: '주말 계획',
    emoji: '📅',
    level: 'A1',
    topic: '生活',
    estimatedMinutes: 6,
    learningGoals: [
      '学会用韩语制定计划',
      '掌握"~(으)려고 해요"句型',
      '练习用"~(으)면 좋겠어요"表达愿望',
    ],
    coreWords: [
      { word: '주말', meaning: '周末', pronunciation: 'ju-mal' },
      { word: '계획', meaning: '计划', pronunciation: 'gye-hoek' },
      { word: '친구', meaning: '朋友', pronunciation: 'chin-gu' },
      { word: '영화', meaning: '电影', pronunciation: 'yeong-hwa' },
      { word: '쇼핑', meaning: '购物', pronunciation: 'syo-ping' },
      { word: '청소', meaning: '打扫', pronunciation: 'cheong-so' },
      { word: '요리', meaning: '做饭', pronunciation: 'yo-ri' },
    ],
    grammarIds: ['gp-01', 'gp-05', 'gp-06', 'gp-15'],
    sentences: [
      {
        id: 's1', ko: '이번 주말에는 할 일이 정말 많아요.', zh: '这个周末要做的事情真多。',
        pronunciation: 'i-beon ju-ma-re-neun hal i-ri jeong-mal ma-na-yo.',
        words: [{ word: '이번', meaning: '这次' }, { word: '할 일', meaning: '要做的事' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '토요일 아침에는 집 청소를 하려고 해요.', zh: '周六早上打算打扫家里。',
        pronunciation: 'to-yo-il a-chi-me-neun jip cheong-so-reul ha-ryeo-go hae-yo.',
        words: [{ word: '청소', meaning: '打扫' }, { word: '~하려고 해요', meaning: '打算做~' }],
        grammarIds: ['gp-15'], difficulty: 'medium',
      },
      {
        id: 's3', ko: '청소가 끝나면 빨래도 해야 돼요.', zh: '打扫完了还得洗衣服。',
        pronunciation: 'cheong-so-ga kkeun-na-myeon ppal-lae-do hae-ya dwae-yo.',
        words: [{ word: '빨래', meaning: '洗衣服' }, { word: '~야 돼요', meaning: '必须做~' }],
        grammarIds: ['gp-05', 'gp-15'], difficulty: 'medium',
      },
      {
        id: 's4', ko: '점심때 친구를 만나서 같이 밥을 먹을 거예요.', zh: '午餐时间和朋友见面一起吃饭。',
        pronunciation: 'jeom-sim-ttae chin-gu-reul man-na-seo ga-chi ba-beul meo-geul geo-ye-yo.',
        words: [{ word: '만나다', meaning: '见面' }, { word: '밥', meaning: '饭' }],
        grammarIds: ['gp-06'], difficulty: 'easy',
      },
      {
        id: 's5', ko: '친구가 새로운 일본 식당을 찾았어요.', zh: '朋友找到了一家新的日本餐厅。',
        pronunciation: 'chin-gu-ga sae-ro-un il-bon sik-dang-eul cha-ja-sseo-yo.',
        words: [{ word: '새로운', meaning: '新的' }, { word: '식당', meaning: '餐厅' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's6', ko: '거기서 초밥이랑 라멘을 먹어볼 생각이에요.', zh: '打算在那里尝尝寿司和拉面。',
        pronunciation: 'geo-gi-seo cho-ba-bi-rang ra-me-neul meo-geo-bol saeng-ga-gi-e-yo.',
        words: [{ word: '초밥', meaning: '寿司' }, { word: '라멘', meaning: '拉面（日式）' }],
        grammarIds: ['gp-15'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '오후에는 쇼핑하러 홍대에 갈 거예요.', zh: '下午要去弘大购物。',
        pronunciation: 'o-hu-e-neun syo-ping-ha-reo hong-dae-e gal geo-ye-yo.',
        words: [{ word: '홍대', meaning: '弘大（弘益大学商圈）' }],
        grammarIds: ['gp-15'], difficulty: 'easy',
      },
      {
        id: 's8', ko: '요즘 홍대에 예쁜 옷가게가 많이 생겼어요.', zh: '最近弘大开了很多漂亮的服装店。',
        pronunciation: 'yo-jeum hong-dae-e ye-ppeun ot-ga-ge-ga ma-ni saeng-gyeo-sseo-yo.',
        words: [{ word: '요즘', meaning: '最近' }, { word: '옷가게', meaning: '服装店' }],
        grammarIds: ['gp-20'], difficulty: 'medium',
      },
      {
        id: 's9', ko: '새 옷을 한두 벌 사고 싶어요.', zh: '想买一两件新衣服。',
        pronunciation: 'sae o-seul han-du beol sa-go si-peo-yo.',
        words: [{ word: '한두 벌', meaning: '一两件（衣服）' }, { word: '~고 싶어요', meaning: '想做~' }],
        grammarIds: ['gp-15'], difficulty: 'easy',
      },
      {
        id: 's10', ko: '일요일은 좀 여유롭게 보내려고 해요.', zh: '周日打算过得悠闲一点。',
        pronunciation: 'i-ryo-i-reun jom yeo-yu-rop-ge bo-nae-ryeo-go hae-yo.',
        words: [{ word: '여유롭다', meaning: '悠闲' }, { word: '보내다', meaning: '度过' }],
        grammarIds: ['gp-15'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '아침에 늦잠을 자고, 집에서 간단하게 요리할 거예요.', zh: '早上睡个懒觉，在家简单做点饭。',
        pronunciation: 'a-chi-me neut-ja-meul ja-go, ji-be-seo gan-da-na-ge yo-ri-hal geo-ye-yo.',
        words: [{ word: '늦잠', meaning: '懒觉' }, { word: '간단하게', meaning: '简单地' }],
        grammarIds: ['gp-06'], difficulty: 'medium',
      },
      {
        id: 's12', ko: '저녁에는 넷플릭스 보면서 쉴 거예요.', zh: '晚上一边看Netflix一边休息。',
        pronunciation: 'jeo-nyeo-ge-neun net-peul-lik-seu bo-myeon-seo swil geo-ye-yo.',
        words: [{ word: '넷플릭스', meaning: 'Netflix' }, { word: '~면서', meaning: '一边~一边' }],
        grammarIds: ['gp-08'], difficulty: 'medium',
      },
      {
        id: 's13', ko: '요즘 보고 있는 한국 드라마가 정말 재미있어요.', zh: '最近看的韩剧特别有意思。',
        pronunciation: 'yo-jeum bo-go in-neun han-guk deu-ra-ma-ga jeong-mal jae-mi-i-sseo-yo.',
        words: [{ word: '드라마', meaning: '电视剧' }, { word: '재미있어요', meaning: '有意思' }],
        grammarIds: ['gp-08', 'gp-20'], difficulty: 'medium',
      },
      {
        id: 's14', ko: '이런 주말이 제일 좋아요. 바쁘지만 행복해요!', zh: '这种周末最好。虽然忙但很幸福！',
        pronunciation: 'i-reon ju-ma-ri je-il jo-a-yo. ba-ppeu-ji-man haeng-bo-kae-yo!',
        words: [{ word: '바쁘다', meaning: '忙' }, { word: '행복하다', meaning: '幸福' }],
        grammarIds: ['gp-20', 'gp-04'], difficulty: 'medium',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者周末打算做什么？', options: ['只在家休息', '打扫、见朋友、购物、休息', '去国外旅行', '加班工作'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"늦잠을 자다"是什么意思？', options: ['早起', '睡懒觉', '熬夜', '打盹'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者和朋友打算去哪里吃饭？', options: ['韩式餐厅', '日本餐厅', '中餐厅', '意大利餐厅'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '이번 주말에 ___하려고 해요. 그리고 ___도 하고 싶어요.', hint: '写你的周末计划：打算做___，还想做___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 6. 去食堂 (A1) — 14 sentences
  // ═══════════════════════════════════════════
  {
    id: 'school-cafeteria',
    title: '学校食堂',
    titleKo: '학교 식당',
    emoji: '🍱',
    level: 'A1',
    topic: '校园',
    estimatedMinutes: 6,
    learningGoals: [
      '学会在食堂点餐的韩语表达',
      '掌握韩国校园生活词汇',
      '练习"~(으)ㄹ래요"句型',
    ],
    coreWords: [
      { word: '학생 식당', meaning: '学生食堂', pronunciation: 'hak-ssaeng sik-dang' },
      { word: '메뉴', meaning: '菜单', pronunciation: 'me-nyu' },
      { word: '김치찌개', meaning: '泡菜汤', pronunciation: 'gim-chi-jji-gae' },
      { word: '된장찌개', meaning: '大酱汤', pronunciation: 'doen-jang-jji-gae' },
      { word: '반찬', meaning: '小菜', pronunciation: 'ban-chan' },
      { word: '배식구', meaning: '取餐窗口', pronunciation: 'bae-sik-gu' },
    ],
    grammarIds: ['gp-01', 'gp-03', 'gp-05', 'gp-15'],
    sentences: [
      {
        id: 's1', ko: '오늘은 수업이 끝나고 친구랑 학교 식당에 왔어요.', zh: '今天下课后和朋友来了学校食堂。',
        pronunciation: 'o-neu-reun su-eo-bi kkeun-na-go chin-gu-rang hak-gyo sik-dang-e wa-sseo-yo.',
        words: [{ word: '수업', meaning: '课' }, { word: '끝나다', meaning: '结束' }],
        grammarIds: ['gp-06'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '벌써 12시라서 사람이 정말 많아요.', zh: '已经12点了所以人特别多。',
        pronunciation: 'beol-sseo yeol-du-si-ra-seo sa-ra-mi jeong-mal ma-na-yo.',
        words: [{ word: '벌써', meaning: '已经（早于预期）' }],
        grammarIds: ['gp-20'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '오늘 메뉴는 뭐예요?', zh: '今天的菜单是什么？',
        pronunciation: 'o-neul me-nyu-neun mwo-ye-yo?',
        words: [{ word: '메뉴', meaning: '菜单' }, { word: '뭐', meaning: '什么' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's4', ko: 'A코너에는 김치찌개가 있고, B코너에는 된장찌개가 있어요.', zh: 'A窗口有泡菜汤，B窗口有大酱汤。',
        pronunciation: 'A-ko-neo-e-neun gim-chi-jji-gae-ga it-go, B-ko-neo-e-neun doen-jang-jji-gae-ga i-sseo-yo.',
        words: [{ word: '김치찌개', meaning: '泡菜汤' }, { word: '된장찌개', meaning: '大酱汤' }],
        grammarIds: ['gp-14', 'gp-20'], difficulty: 'medium',
      },
      {
        id: 's5', ko: '저는 김치찌개를 먹을래요. 친구는 된장찌개를 골랐어요.', zh: '我要吃泡菜汤。朋友选了大酱汤。',
        pronunciation: 'jeo-neun gim-chi-jji-gae-reul meo-geul-lae-yo. chin-gu-neun doen-jang-jji-gae-reul gol-la-sseo-yo.',
        words: [{ word: '먹을래요', meaning: '要吃（意愿）' }, { word: '고르다', meaning: '选' }],
        grammarIds: ['gp-15'], difficulty: 'medium',
      },
      {
        id: 's6', ko: '찌개에는 항상 밥과 반찬 세 가지가 같이 나와요.', zh: '汤类总是配着饭和三样小菜。',
        pronunciation: 'jji-gae-e-neun hang-sang bap-gwa ban-chan se ga-ji-ga ga-chi na-wa-yo.',
        words: [{ word: '항상', meaning: '总是' }, { word: '반찬', meaning: '小菜' }],
        grammarIds: ['gp-20'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '오늘 반찬은 김치, 멸치볶음, 그리고 어묵볶음이에요.', zh: '今天小菜是泡菜、炒小银鱼和炒鱼糕。',
        pronunciation: 'o-neul ban-cha-neun gim-chi, myeol-chi-bo-kkeum, geu-ri-go eo-muk-bo-kkeu-mi-e-yo.',
        words: [{ word: '멸치볶음', meaning: '炒小银鱼' }, { word: '어묵볶음', meaning: '炒鱼糕' }],
        grammarIds: ['gp-01'], difficulty: 'hard',
      },
      {
        id: 's8', ko: '김치찌개가 조금 매웠지만 정말 맛있었어요.', zh: '泡菜汤有点辣但真的很好吃。',
        pronunciation: 'gim-chi-jji-gae-ga jo-geum mae-wot-ji-man jeong-mal ma-si-sseo-sseo-yo.',
        words: [{ word: '맵다', meaning: '辣' }, { word: '조금', meaning: '一点' }],
        grammarIds: ['gp-04', 'gp-20'], difficulty: 'medium',
      },
      {
        id: 's9', ko: '한국 학생 식당의 좋은 점은 반찬을 무한 리필할 수 있다는 거예요.', zh: '韩国学生食堂的好处是小菜可以无限续。',
        pronunciation: 'han-guk hak-ssaeng sik-dang-ui jo-eun jeo-meun ban-cha-neul mu-han ri-pil-hal su it-da-neun geo-ye-yo.',
        words: [{ word: '무한 리필', meaning: '无限续' }, { word: '~ㄹ 수 있다', meaning: '可以~' }],
        grammarIds: ['gp-15'], difficulty: 'hard',
      },
      {
        id: 's10', ko: '밥을 다 먹은 후에는 식판을 반납하는 곳에 가야 해요.', zh: '吃完饭之后得去归还餐盘的地方。',
        pronunciation: 'ba-beul da meo-geun hu-e-neun sik-pa-neul ban-na-pa-neun go-se ga-ya hae-yo.',
        words: [{ word: '식판', meaning: '餐盘' }, { word: '반납하다', meaning: '归还' }],
        grammarIds: ['gp-06', 'gp-15'], difficulty: 'hard',
      },
      {
        id: 's11', ko: '반납할 때 "잘 먹었습니다"라고 인사해요.', zh: '归还时说"잘 먹었습니다"打招呼。',
        pronunciation: 'ban-na-pal ttae "jal meo-geo-sseum-ni-da" ra-go in-sa-hae-yo.',
        words: [{ word: '인사하다', meaning: '打招呼' }, { word: '잘 먹었습니다', meaning: '吃好了（食后礼貌语）' }],
        grammarIds: ['gp-03'], difficulty: 'medium',
      },
      {
        id: 's12', ko: '"잘 먹었습니다"는 한국 식사 예절에서 중요한 말이에요.', zh: '"잘 먹었습니다"是韩国餐桌礼仪中重要的话。',
        pronunciation: '"jal meo-geo-sseum-ni-da"-neun han-guk sik-sa ye-jeo-re-seo jung-yo-han ma-ri-e-yo.',
        words: [{ word: '예절', meaning: '礼仪' }, { word: '중요하다', meaning: '重要' }],
        grammarIds: ['gp-01'], difficulty: 'medium',
      },
      {
        id: 's13', ko: '후식으로 매점에서 바나나 우유 하나를 샀어요.', zh: '作为饭后甜点，在小卖部买了一瓶香蕉牛奶。',
        pronunciation: 'hu-si-geu-ro mae-jeo-me-seo ba-na-na u-yu ha-na-reul sa-sseo-yo.',
        words: [{ word: '후식', meaning: '饭后甜点' }, { word: '매점', meaning: '小卖部' }],
        grammarIds: ['gp-13'], difficulty: 'medium',
      },
      {
        id: 's14', ko: '학교 식당은 정말 싸고 맛있어요. 매일 오고 싶어요!', zh: '学校食堂真的又便宜又好吃。每天都想来！',
        pronunciation: 'hak-gyo sik-dang-eun jeong-mal ssa-go ma-si-sseo-yo. mae-il o-go si-peo-yo!',
        words: [{ word: '싸다', meaning: '便宜' }],
        grammarIds: ['gp-20', 'gp-15'], difficulty: 'easy',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者在食堂吃了什么？', options: ['大酱汤', '泡菜汤', '拌饭', '冷面'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"반찬"是什么意思？', options: ['主食', '小菜', '饮料', '甜点'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '吃完饭后应该说什么礼貌语？', options: ['안녕하세요', '잘 먹었습니다', '감사합니다', '맛있어요'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___을/를 먹을래요. ___가/이 맛있어요.', hint: '写两句话：我要吃___。___很好吃。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 7. 和朋友看电影 (A1) — 14 sentences
  // ═══════════════════════════════════════════
  {
    id: 'movie-with-friend',
    title: '和朋友看电影',
    titleKo: '친구랑 영화 보기',
    emoji: '🎬',
    level: 'A1',
    topic: '生活',
    estimatedMinutes: 6,
    learningGoals: [
      '学会用韩语谈论电影',
      '掌握表达意见的句型"~(으)ㄴ 것 같아요"',
      '练习比较表达"~보다 더"',
    ],
    coreWords: [
      { word: '영화관', meaning: '电影院', pronunciation: 'yeong-hwa-gwan' },
      { word: '티켓', meaning: '票', pronunciation: 'ti-ket' },
      { word: '팝콘', meaning: '爆米花', pronunciation: 'pap-kon' },
      { word: '재미있다', meaning: '有趣', pronunciation: 'jae-mi-it-da' },
      { word: '감동적이다', meaning: '感人', pronunciation: 'gam-dong-jeo-gi-da' },
      { word: '배우', meaning: '演员', pronunciation: 'bae-u' },
    ],
    grammarIds: ['gp-01', 'gp-03', 'gp-05', 'gp-15'],
    sentences: [
      {
        id: 's1', ko: '주말에 친구랑 영화를 보러 갔어요.', zh: '周末和朋友去看电影了。',
        pronunciation: 'ju-ma-re chin-gu-rang yeong-hwa-reul bo-reo ga-sseo-yo.',
        words: [{ word: '영화', meaning: '电影' }, { word: '보러 가다', meaning: '去看' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's2', ko: 'CGV에서 최신 한국 영화를 봤어요.', zh: '在CGV看了最新的韩国电影。',
        pronunciation: 'CGV-e-seo choe-sin han-guk yeong-hwa-reul bwa-sseo-yo.',
        words: [{ word: '최신', meaning: '最新' }],
        grammarIds: ['gp-13'], difficulty: 'easy',
      },
      {
        id: 's3', ko: '영화 제목은 "서울의 봄"이었어요.', zh: '电影名字叫《首尔之春》。',
        pronunciation: 'yeong-hwa je-mo-geun "seo-u-re bom" i-eo-sseo-yo.',
        words: [{ word: '제목', meaning: '标题/名字' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's4', ko: '입구에서 티켓을 확인하고 팝콘 세트를 샀어요.', zh: '在入口确认了票，买了爆米花套餐。',
        pronunciation: 'ip-gu-e-seo ti-ke-seul hwa-gin-ha-go pap-kon se-teu-reul sa-sseo-yo.',
        words: [{ word: '입구', meaning: '入口' }, { word: '세트', meaning: '套餐' }],
        grammarIds: ['gp-06', 'gp-13'], difficulty: 'medium',
      },
      {
        id: 's5', ko: '영화관 팝콘은 집에서 먹는 것보다 더 맛있는 것 같아요.', zh: '电影院的爆米花好像比在家吃的更好吃。',
        pronunciation: 'yeong-hwa-gwan pap-ko-neun ji-be-seo meong-neun geot-bo-da deo ma-sin-neun geot ga-ta-yo.',
        words: [{ word: '~보다', meaning: '比~' }, { word: '~ㄴ 것 같아요', meaning: '好像~' }],
        grammarIds: ['gp-15'], difficulty: 'hard',
      },
      {
        id: 's6', ko: '영화가 시작하기 전에 예고편이 10분 동안 나왔어요.', zh: '电影开始前放了10分钟预告片。',
        pronunciation: 'yeong-hwa-ga si-ja-ka-gi jeo-ne ye-go-pyeo-ni sip-bun dong-an na-wa-sseo-yo.',
        words: [{ word: '예고편', meaning: '预告片' }, { word: '동안', meaning: '期间' }],
        grammarIds: ['gp-05'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '영화 내용은 정말 감동적이었고, 배우들의 연기도 훌륭했어요.', zh: '电影内容真的很感人，演员们的演技也很出色。',
        pronunciation: 'yeong-hwa nae-yong-eun jeong-mal gam-dong-jeo-gi-eot-go, bae-u-deu-re yeon-gi-do hul-lyung-hae-sseo-yo.',
        words: [{ word: '내용', meaning: '内容' }, { word: '연기', meaning: '演技' }],
        grammarIds: ['gp-20', 'gp-13'], difficulty: 'hard',
      },
      {
        id: 's8', ko: '마지막 장면에서 눈물이 날 뻔했어요.', zh: '最后一场差点哭了。',
        pronunciation: 'ma-ji-mak jang-myeo-ne-seo nun-mu-ri nal ppeo-nae-sseo-yo.',
        words: [{ word: '마지막', meaning: '最后' }, { word: '눈물', meaning: '眼泪' }],
        grammarIds: ['gp-15'], difficulty: 'hard',
      },
      {
        id: 's9', ko: '영화가 끝난 후에 친구랑 근처 카페에서 수다를 떨었어요.', zh: '电影结束后和朋友在附近咖啡厅聊天。',
        pronunciation: 'yeong-hwa-ga kkeun-nan hu-e chin-gu-rang geun-cheo ka-pe-e-seo su-da-reul tteo-reo-sseo-yo.',
        words: [{ word: '근처', meaning: '附近' }, { word: '수다를 떨다', meaning: '闲聊' }],
        grammarIds: ['gp-06'], difficulty: 'medium',
      },
      {
        id: 's10', ko: '친구는 영화가 좀 길다고 했지만, 저는 딱 좋았어요.', zh: '朋友说电影有点长，但我觉得刚刚好。',
        pronunciation: 'chin-gu-neun yeong-hwa-ga jom gil-da-go haet-ji-man, jeo-neun ttak jo-a-sseo-yo.',
        words: [{ word: '길다', meaning: '长' }, { word: '딱', meaning: '刚好' }],
        grammarIds: ['gp-03', 'gp-04'], difficulty: 'medium',
      },
      {
        id: 's11', ko: '다음 달에는 또 다른 한국 영화가 개봉한대요.', zh: '听说下个月又有其他韩国电影上映。',
        pronunciation: 'da-eum da-re-neun tto da-reun han-guk yeong-hwa-ga gae-bong-han-dae-yo.',
        words: [{ word: '개봉하다', meaning: '上映/公映' }],
        grammarIds: ['gp-17'], difficulty: 'medium',
      },
      {
        id: 's12', ko: '그 영화도 같이 보러 가기로 약속했어요.', zh: '约好了一起去看那部电影。',
        pronunciation: 'geu yeong-hwa-do ga-chi bo-reo ga-gi-ro yak-so-kae-sseo-yo.',
        words: [{ word: '약속하다', meaning: '约定' }],
        grammarIds: ['gp-15'], difficulty: 'medium',
      },
      {
        id: 's13', ko: '한국 영화는 요즘 정말 퀄리티가 높아진 것 같아요.', zh: '韩国电影最近质量好像真的提高了。',
        pronunciation: 'han-guk yeong-hwa-neun yo-jeum jeong-mal kwol-li-ti-ga no-pa-jin geot ga-ta-yo.',
        words: [{ word: '퀄리티', meaning: '质量' }, { word: '높아지다', meaning: '变高/提高' }],
        grammarIds: ['gp-15', 'gp-20'], difficulty: 'hard',
      },
      {
        id: 's14', ko: '영화 보는 걸 정말 좋아해서, 매주 한 편씩 보려고 해요.', zh: '我真的很喜欢看电影，打算每周看一部。',
        pronunciation: 'yeong-hwa bo-neun geol jeong-mal jo-a-hae-seo, mae-ju han pyeon-ssik bo-ryeo-go hae-yo.',
        words: [{ word: '매주', meaning: '每周' }, { word: '한 편', meaning: '一部（电影）' }],
        grammarIds: ['gp-06', 'gp-15'], difficulty: 'medium',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者看了什么电影？', options: ['一部动作片', '《首尔之春》', '一部喜剧', '外国电影'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"눈물이 날 뻔했어요"是什么意思？', options: ['开心地笑了', '差点哭了', '睡着了', '很生气'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '看完电影后作者和朋友去了哪里？', options: ['回家', '附近的咖啡厅', '酒吧', '去散步'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___영화를 봤어요. ___재미있었어요.', hint: '写你看过的电影：看了___电影。___很有意思。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 8. 韩国外卖 (A2) — 16 sentences
  // ═══════════════════════════════════════════
  {
    id: 'korean-delivery',
    title: '韩国外卖文化',
    titleKo: '한국 배달 문화',
    emoji: '🛵',
    level: 'A2',
    topic: '生活',
    estimatedMinutes: 7,
    learningGoals: [
      '了解韩国外卖文化',
      '掌握用韩语点外卖的表达',
      '练习"~는 편이다"和"~거든요"句型',
    ],
    coreWords: [
      { word: '배달', meaning: '外卖/配送', pronunciation: 'bae-dal' },
      { word: '주문하다', meaning: '下单', pronunciation: 'ju-mun-ha-da' },
      { word: '치킨', meaning: '炸鸡', pronunciation: 'chi-kin' },
      { word: '배달 앱', meaning: '外卖APP', pronunciation: 'bae-dal aep' },
      { word: '배달비', meaning: '配送费', pronunciation: 'bae-dal-bi' },
      { word: '리뷰', meaning: '评价/评论', pronunciation: 'ri-byu' },
      { word: '할인', meaning: '折扣', pronunciation: 'ha-rin' },
      { word: '골목', meaning: '小巷', pronunciation: 'gol-mok' },
    ],
    grammarIds: ['gp-03', 'gp-05', 'gp-06', 'gp-09', 'gp-15'],
    sentences: [
      {
        id: 's1', ko: '한국은 배달 문화가 정말 발달한 나라예요.', zh: '韩国是一个外卖文化非常发达的国家。',
        pronunciation: 'han-gu-geun bae-dal mun-hwa-ga jeong-mal bal-dal-han na-ra-ye-yo.',
        words: [{ word: '발달하다', meaning: '发达' }, { word: '나라', meaning: '国家' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's2', ko: '밤 11시에도 배달을 시킬 수 있어서 정말 편리해요.', zh: '晚上11点也能叫外卖，真的很方便。',
        pronunciation: 'bam yeol-han-si-e-do bae-da-reul si-kil su i-sseo-seo jeong-mal pyeol-li-hae-yo.',
        words: [{ word: '편리하다', meaning: '方便' }],
        grammarIds: ['gp-06', 'gp-15'], difficulty: 'medium',
      },
      {
        id: 's3', ko: '요즘은 배달의민족이나 쿠팡이츠 같은 앱을 많이 써요.', zh: '最近很多人用"外卖的民族"或"酷胖食"这类APP。',
        pronunciation: 'yo-jeu-meun bae-da-re-mi-jok-i-na ku-pang-i-cheu ga-teun ae-beul ma-ni sseo-yo.',
        words: [{ word: '배달의민족', meaning: '外卖的民族（APP名）' }, { word: '쿠팡이츠', meaning: '酷胖食（APP名）' }],
        grammarIds: ['gp-13', 'gp-09'], difficulty: 'medium',
      },
      {
        id: 's4', ko: '앱으로 주문하면 30분에서 1시간 안에 도착해요.', zh: '用APP下单的话30分钟到1小时内到达。',
        pronunciation: 'ae-beu-ro ju-mu-na-myeon sam-sip-bun-e-seo han-si-gan a-ne do-cha-kae-yo.',
        words: [{ word: '도착하다', meaning: '到达' }, { word: '~안에', meaning: '在~之内' }],
        grammarIds: ['gp-05'], difficulty: 'medium',
      },
      {
        id: 's5', ko: '저는 평소에 요리를 잘 안 하는 편이에요. 그래서 배달을 자주 시켜요.', zh: '我平时不太做饭。所以经常叫外卖。',
        pronunciation: 'jeo-neun pyeong-so-e yo-ri-reul jal an ha-neun pyeo-ni-e-yo. geu-rae-seo bae-da-reul ja-ju si-kyeo-yo.',
        words: [{ word: '평소', meaning: '平时' }, { word: '~는 편이다', meaning: '属于~的类型' }],
        grammarIds: ['gp-09', 'gp-06'], difficulty: 'hard',
      },
      {
        id: 's6', ko: '한국 배달 음식 중에서 제일 인기 있는 건 치킨이에요.', zh: '韩国外卖中最受欢迎的是炸鸡。',
        pronunciation: 'han-guk bae-dal eum-sik jung-e-seo je-il in-gi in-neun geon chi-ki-ni-e-yo.',
        words: [{ word: '중에서', meaning: '之中' }],
        grammarIds: ['gp-01', 'gp-20'], difficulty: 'medium',
      },
      {
        id: 's7', ko: '한국에는 치킨 브랜드만 300개가 넘는다고 해요.', zh: '据说韩国光是炸鸡品牌就超过300个。',
        pronunciation: 'han-gu-ge-neun chi-kin beu-raen-deu-man sam-baek-gae-ga neom-neun-da-go hae-yo.',
        words: [{ word: '브랜드', meaning: '品牌' }, { word: '넘다', meaning: '超过' }],
        grammarIds: ['gp-17'], difficulty: 'medium',
      },
      {
        id: 's8', ko: '저는 양념치킨보다 후라이드치킨을 더 좋아하는 편이에요.', zh: '比起调味炸鸡，我更偏好原味炸鸡。',
        pronunciation: 'jeo-neun yang-nyeom-chi-kin-bo-da hu-ra-i-deu-chi-ki-neul deo jo-a-ha-neun pyeo-ni-e-yo.',
        words: [{ word: '양념치킨', meaning: '调味炸鸡' }, { word: '~보다', meaning: '比起~' }],
        grammarIds: ['gp-09', 'gp-13'], difficulty: 'hard',
      },
      {
        id: 's9', ko: '치킨을 시키면 보통 치킨무와 콜라가 같이 와요.', zh: '点炸鸡的话一般会送腌萝卜和可乐。',
        pronunciation: 'chi-ki-neul si-ki-myeon bo-tong chi-kin-mu-wa kol-la-ga ga-chi wa-yo.',
        words: [{ word: '치킨무', meaning: '炸鸡腌萝卜' }],
        grammarIds: ['gp-05'], difficulty: 'medium',
      },
      {
        id: 's10', ko: '배달비는 보통 1,000원에서 3,000원 정도예요.', zh: '配送费一般在1000到3000韩元左右。',
        pronunciation: 'bae-dal-bi-neun bo-tong cheon-won-e-seo sam-cheon-won jeong-do-ye-yo.',
        words: [{ word: '배달비', meaning: '配送费' }, { word: '정도', meaning: '左右/大约' }],
        grammarIds: ['gp-01'], difficulty: 'easy',
      },
      {
        id: 's11', ko: '비가 오는 날에는 배달 주문이 평소보다 2배 이상 늘어나요.', zh: '下雨天外卖订单比平时增加2倍以上。',
        pronunciation: 'bi-ga o-neun na-re-neun bae-dal ju-mu-ni pyeong-so-bo-da du-bae i-sang neu-reo-na-yo.',
        words: [{ word: '늘어나다', meaning: '增加' }, { word: '2배', meaning: '两倍' }],
        grammarIds: ['gp-05', 'gp-09'], difficulty: 'hard',
      },
      {
        id: 's12', ko: '비 오는 날 치킨 먹는 게 한국에서는 국룰이에요.', zh: '下雨天吃炸鸡在韩国是"国规"（默认规则）。',
        pronunciation: 'bi o-neun nal chi-kin meong-neun ge han-gu-ge-seo-neun gung-nu-ri-e-yo.',
        words: [{ word: '국룰', meaning: '国规（网络用语：默认规则）' }],
        grammarIds: ['gp-01'], difficulty: 'medium',
      },
      {
        id: 's13', ko: '한국 배달의 장점은 거의 모든 음식을 배달해 준다는 거예요.', zh: '韩国外卖的优点是几乎什么食物都可以送。',
        pronunciation: 'han-guk bae-da-re jang-jeo-meun geo-i mo-deun eum-si-geul bae-dal-hae jun-da-neun geo-ye-yo.',
        words: [{ word: '장점', meaning: '优点' }, { word: '거의', meaning: '几乎' }],
        grammarIds: ['gp-17', 'gp-20'], difficulty: 'hard',
      },
      {
        id: 's14', ko: '찜닭, 보쌈, 떡볶이 같은 것도 다 배달돼요. 진짜 대단하죠?', zh: '炖鸡、包肉、炒年糕这些也都能送。真的很厉害吧？',
        pronunciation: 'jjim-dak, bo-ssam, tteok-bbo-kki ga-teun geot-do da bae-dal-dwae-yo. jin-jja dae-dan-ha-jyo?',
        words: [{ word: '찜닭', meaning: '炖鸡' }, { word: '대단하다', meaning: '了不起' }],
        grammarIds: ['gp-09', 'gp-20'], difficulty: 'hard',
      },
      {
        id: 's15', ko: '배달 음식을 먹고 나서는 분리수거를 꼭 해야 해요.', zh: '吃完外卖后一定要做分类回收。',
        pronunciation: 'bae-dal eum-si-geul meok-go na-seo-neun bul-li-su-geo-reul kkok hae-ya hae-yo.',
        words: [{ word: '분리수거', meaning: '分类回收' }, { word: '꼭', meaning: '一定' }],
        grammarIds: ['gp-06', 'gp-15'], difficulty: 'medium',
      },
      {
        id: 's16', ko: '한국에서는 음식물 쓰레기를 일반 쓰레기랑 따로 버려야 하거든요.', zh: '因为在韩国，食物垃圾要跟一般垃圾分开扔。',
        pronunciation: 'han-gu-ge-seo-neun eum-sing-mul sseu-re-gi-reul il-ban sseu-re-gi-rang tta-ro beo-ryeo-ya ha-geo-deun-yo.',
        words: [{ word: '음식물 쓰레기', meaning: '食物垃圾' }, { word: '따로', meaning: '分开' }],
        grammarIds: ['gp-15', 'gp-08'], difficulty: 'hard',
      },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇文章主要讲什么？', options: ['韩国饮食文化', '韩国外卖文化和点餐习惯', '韩国垃圾回收', '韩国炸鸡历史'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"국룰"是什么意思？', options: ['国家法律', '默认规则/惯例', '国际标准', '传统习俗'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '韩国外卖配送费通常是多少？', options: ['免费', '1,000-3,000韩元', '5,000-10,000韩元', '15,000韩元以上'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '한국 배달 문화에서 제일 신기한 건 ___예요/이에요. 우리나라에서는 ___.', hint: '写你对韩国外卖文化的感想。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 9. 首尔旅行 (A2) — 从 articles.ts 精写文章转换
  // ═══════════════════════════════════════════
  {
    id: 'seoul-travel',
    title: '首尔旅行指南',
    titleKo: '서울 여행 가이드',
    emoji: '✈️',
    level: 'A2',
    topic: '旅行',
    estimatedMinutes: 7,
    learningGoals: [
      '读一篇完整的三天两夜首尔旅行记录',
      '掌握旅行场景中的韩语表达',
      '练习用过去时叙述经历',
    ],
    coreWords: [
      { word: '수도', meaning: '首都', pronunciation: 'su-do' },
      { word: '전통', meaning: '传统', pronunciation: 'jeon-tong' },
      { word: '한복', meaning: '韩服', pronunciation: 'han-bok' },
      { word: '야경', meaning: '夜景', pronunciation: 'ya-gyeong' },
      { word: '기념품', meaning: '纪念品', pronunciation: 'gi-nyeom-pum' },
      { word: '편리하다', meaning: '方便', pronunciation: 'pyeol-li-ha-da' },
    ],
    grammarIds: ['gp-01', 'gp-06', 'gp-08', 'gp-13', 'gp-15'],
    sentences: [
      { id: 's1', ko: '서울은 한국의 수도이자 가장 큰 도시예요.', zh: '首尔是韩国的首都，也是最大的城市。', pronunciation: 'seo-u-reun han-gu-gui su-do-i-ja ga-jang keun do-si-ye-yo.', words: [{ word: '수도', meaning: '首都' }, { word: '도시', meaning: '城市' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's2', ko: '전통과 현대가 공존하는 매력적인 곳이에요.', zh: '是一个传统与现代共存的充满魅力的地方。', pronunciation: 'jeon-tong-gwa hyeon-dae-ga gong-jon-ha-neun mae-ryeo-jeo-gin go-si-e-yo.', words: [{ word: '전통', meaning: '传统' }, { word: '현대', meaning: '现代' }, { word: '공존하다', meaning: '共存' }], grammarIds: ['gp-20'], difficulty: 'medium' },
      { id: 's3', ko: '저는 지난 주말에 친구와 함께 서울 여행을 다녀왔어요.', zh: '我上个周末和朋友一起去首尔旅行了。', pronunciation: 'jeo-neun ji-nan ju-ma-re chin-gu-wa ham-kke seo-ul yeo-haeng-eul da-nyeo-wa-sseo-yo.', words: [{ word: '지난', meaning: '上一个' }, { word: '여행', meaning: '旅行' }, { word: '다녀오다', meaning: '去了一趟回来' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's4', ko: '첫째 날은 경복궁과 인사동에 갔어요.', zh: '第一天去了景福宫和仁寺洞。', pronunciation: 'cheot-jjae na-reun gyeong-bok-ggung-gwa in-sa-dong-e ga-sseo-yo.', words: [{ word: '첫째', meaning: '第一' }, { word: '경복궁', meaning: '景福宫' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's5', ko: '경복궁에서 한복을 입고 예쁜 사진을 많이 찍었어요.', zh: '在景福宫穿韩服拍了很多漂亮的照片。', pronunciation: 'gyeong-bok-ggung-e-seo han-bo-geul ip-go ye-ppeun sa-ji-neul ma-ni jji-geo-sseo-yo.', words: [{ word: '한복', meaning: '韩服' }, { word: '사진을 찍다', meaning: '拍照' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's6', ko: '인사동에서는 전통 공예품과 재미있는 기념품을 구경했어요.', zh: '在仁寺洞逛了传统工艺品和有趣的纪念品。', pronunciation: 'in-sa-dong-e-seo-neun jeon-tong gong-ye-pum-gwa jae-mi-in-neun gi-nyeom-pu-meul gu-gyeong-hae-sseo-yo.', words: [{ word: '공예품', meaning: '工艺品' }, { word: '기념품', meaning: '纪念品' }, { word: '구경하다', meaning: '逛' }], grammarIds: ['gp-13'], difficulty: 'medium' },
      { id: 's7', ko: '둘째 날에는 명동과 남산타워에 갔어요.', zh: '第二天去了明洞和南山塔。', pronunciation: 'dul-jjae na-re-neun myeong-dong-gwa nam-san-ta-weo-e ga-sseo-yo.', words: [{ word: '둘째', meaning: '第二' }, { word: '명동', meaning: '明洞' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's8', ko: '명동에서 떡볶이와 닭꼬치 같은 길거리 음식을 많이 먹었어요.', zh: '在明洞吃了辣炒年糕和鸡肉串等各种街头美食。', pronunciation: 'myeong-dong-e-seo tteok-bbo-kki-wa dak-kko-chi ga-teun gil-geo-ri eum-si-geul ma-ni meo-geo-sseo-yo.', words: [{ word: '떡볶이', meaning: '辣炒年糕' }, { word: '닭꼬치', meaning: '鸡肉串' }, { word: '길거리 음식', meaning: '街头小吃' }], grammarIds: ['gp-13', 'gp-09'], difficulty: 'medium' },
      { id: 's9', ko: '남산타워에서는 서울의 아름다운 야경을 봤는데 정말 로맨틱했어요.', zh: '在南山塔看了首尔美丽的夜景，真的非常浪漫。', pronunciation: 'nam-san-ta-weo-e-seo-neun seo-u-re a-reum-da-un ya-gyeong-eul bwan-neun-de jeong-mal ro-maen-ti-kae-sseo-yo.', words: [{ word: '야경', meaning: '夜景' }, { word: '아름답다', meaning: '美丽' }, { word: '로맨틱하다', meaning: '浪漫' }], grammarIds: ['gp-08', 'gp-20'], difficulty: 'medium' },
      { id: 's10', ko: '셋째 날은 홍대와 연남동을 구경했어요. 버스킹 공연도 보고 독특한 카페에도 갔어요.', zh: '第三天逛了弘大和延南洞。看了街头表演还去了特色咖啡厅。', pronunciation: 'set-jjae na-reun hong-dae-wa yeon-nam-dong-eul gu-gyeong-hae-sseo-yo. beo-seu-king gong-yeon-do bo-go dok-teu-kan ka-pe-e-do ga-sseo-yo.', words: [{ word: '버스킹', meaning: '街头表演' }, { word: '공연', meaning: '演出' }, { word: '독특하다', meaning: '独特的' }], grammarIds: ['gp-06', 'gp-19'], difficulty: 'medium' },
      { id: 's11', ko: '서울 지하철은 정말 편리해서 어디든 쉽게 갈 수 있어요.', zh: '首尔地铁非常方便，哪里都容易到达。', pronunciation: 'seo-ul ji-ha-cheo-reun jeong-mal pyeol-li-hae-seo eo-di-deun swip-ge gal su i-sseo-yo.', words: [{ word: '편리하다', meaning: '方便' }, { word: '어디든', meaning: '不管哪里' }], grammarIds: ['gp-06', 'gp-15'], difficulty: 'medium' },
      { id: 's12', ko: '이번 여행은 정말 즐거웠어요. 다음에 또 오고 싶어요!', zh: '这次旅行真的很开心。下次还想再来！', pronunciation: 'i-beon yeo-haeng-eun jeong-mal jeul-geo-weo-sseo-yo. da-eu-me tto o-go si-peo-yo.', words: [{ word: '즐겁다', meaning: '开心' }, { word: '다음', meaning: '下次' }, { word: '또', meaning: '再' }], grammarIds: ['gp-15'], difficulty: 'easy' },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇旅行记录去了几天？', options: ['一天', '两天', '三天', '四天'], answer: 2, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"야경"是什么？', options: ['夜景', '日景', '街景', '雪景'], answer: 0, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者在南山塔做了什么？', options: ['吃了晚餐', '看了夜景', '买了纪念品', '拍照了'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___에 갔어요. ___을/를 봤어요. 정말 ___했어요.', hint: '写一次旅行：去了___。看了___。真的很___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 10. 韩国饮食文化 (A2) — 从 articles.ts 精写文章转换
  // ═══════════════════════════════════════════
  {
    id: 'korean-food',
    title: '韩国饮食文化',
    titleKo: '한국 음식 문화',
    emoji: '🍚',
    level: 'A2',
    topic: '生活',
    estimatedMinutes: 8,
    learningGoals: [
      '了解韩国饮食文化核心特点',
      '掌握食物相关的韩语表达',
      '学习韩国餐桌礼仪表达',
    ],
    coreWords: [
      { word: '김치', meaning: '泡菜', pronunciation: 'gim-chi' },
      { word: '반찬', meaning: '小菜', pronunciation: 'ban-chan' },
      { word: '불고기', meaning: '烤牛肉', pronunciation: 'bul-go-gi' },
      { word: '비빔밥', meaning: '拌饭', pronunciation: 'bi-bim-bap' },
      { word: '삼겹살', meaning: '五花肉', pronunciation: 'sam-gyeop-sal' },
      { word: '예의', meaning: '礼仪', pronunciation: 'ye-ui' },
    ],
    grammarIds: ['gp-01', 'gp-04', 'gp-05', 'gp-06', 'gp-15', 'gp-20'],
    sentences: [
      { id: 's1', ko: '한국 음식 하면 가장 먼저 김치가 떠올라요.', zh: '提到韩国饮食，最先想到的是泡菜。', pronunciation: 'han-guk eum-sik ha-myeon ga-jang meon-jeo gim-chi-ga tteo-ol-la-yo.', words: [{ word: '떠오르다', meaning: '想起来' }, { word: '가장 먼저', meaning: '最先' }], grammarIds: ['gp-05'], difficulty: 'easy' },
      { id: 's2', ko: '김치는 한국인의 식탁에서 절대 빠질 수 없는 음식이에요.', zh: '泡菜是韩国人餐桌上绝对不能缺少的食物。', pronunciation: 'gim-chi-neun han-gu-gi-ne sik-ta-ge-seo jeol-ttae ppa-jil su eom-neun eum-si-gi-e-yo.', words: [{ word: '식탁', meaning: '餐桌' }, { word: '절대', meaning: '绝对' }, { word: '빠지다', meaning: '缺少' }], grammarIds: ['gp-15'], difficulty: 'medium' },
      { id: 's3', ko: '매일 세 끼 식사에 항상 김치가 올라와요.', zh: '每天三餐饭桌上总会有泡菜。', pronunciation: 'mae-il se kki sik-ssa-e hang-sang gim-chi-ga ol-la-wa-yo.', words: [{ word: '세 끼', meaning: '三餐' }, { word: '올라오다', meaning: '上（桌）' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's4', ko: '한국 식사에는 밥과 국, 그리고 여러 가지 반찬이 함께 나와요.', zh: '韩国餐桌上饭、汤和各种小菜一起上。', pronunciation: 'han-guk sik-ssa-e-neun bap-gwa guk, geu-ri-go yeo-reo ga-ji ban-cha-ni ham-kke na-wa-yo.', words: [{ word: '반찬', meaning: '小菜' }, { word: '여러 가지', meaning: '各种各样的' }, { word: '나오다', meaning: '出来/端上' }], grammarIds: ['gp-01', 'gp-06'], difficulty: 'medium' },
      { id: 's5', ko: '불고기는 외국인들에게 가장 인기 있는 한국 요리예요.', zh: '烤牛肉是最受外国人欢迎的韩国料理。', pronunciation: 'bul-go-gi-neun we-guk-kin-deu-re-ge ga-jang in-gi in-neun han-guk yo-ri-ye-yo.', words: [{ word: '외국인', meaning: '外国人' }, { word: '인기 있다', meaning: '受欢迎' }], grammarIds: ['gp-01', 'gp-20'], difficulty: 'easy' },
      { id: 's6', ko: '달콤한 양념이 정말 맛있어요.', zh: '甜美的调味酱真的很好吃。', pronunciation: 'dal-kom-han yang-nyeo-mi jeong-mal ma-si-sseo-yo.', words: [{ word: '달콤하다', meaning: '甜美' }, { word: '양념', meaning: '调味料' }], grammarIds: ['gp-20'], difficulty: 'easy' },
      { id: 's7', ko: '떡볶이는 매콤달콤한 길거리 음식으로 젊은 사람들에게 특히 인기가 많아요.', zh: '辣炒年糕是甜辣的街头美食，特别受年轻人欢迎。', pronunciation: 'tteok-bbo-kki-neun mae-kom-dal-kom-han gil-geo-ri eum-si-geu-ro jeol-meun sa-ram-deu-re-ge teu-ki in-gi-ga ma-na-yo.', words: [{ word: '매콤달콤하다', meaning: '甜辣的' }, { word: '특히', meaning: '特别' }, { word: '젊은', meaning: '年轻的' }], grammarIds: ['gp-20'], difficulty: 'hard' },
      { id: 's8', ko: '비빔밥은 밥에 여러 가지 채소와 고추장을 넣고 비벼 먹는 건강식이에요.', zh: '拌饭是在米饭里放入各种蔬菜和辣酱搅拌着吃的健康食品。', pronunciation: 'bi-bim-ba-beun ba-be yeo-reo ga-ji chae-so-wa go-chu-jang-eul neo-go bi-byeo meong-neun geon-gang-si-gi-e-yo.', words: [{ word: '채소', meaning: '蔬菜' }, { word: '고추장', meaning: '辣椒酱' }, { word: '비비다', meaning: '搅拌' }], grammarIds: ['gp-06'], difficulty: 'hard' },
      { id: 's9', ko: '삼겹살은 한국 사람들이 가장 사랑하는 회식 메뉴예요.', zh: '五花肉是韩国人最爱的聚餐菜单。', pronunciation: 'sam-gyeop-ssa-reun han-guk sa-ram-deu-ri ga-jang sa-rang-ha-neun hwe-sik me-nyu-ye-yo.', words: [{ word: '삼겹살', meaning: '五花肉' }, { word: '회식', meaning: '聚餐' }, { word: '사랑하다', meaning: '爱' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's10', ko: '상추에 싸서 먹으면 더 맛있어요.', zh: '用生菜包着吃更好吃。', pronunciation: 'sang-chu-e ssa-seo meo-geu-myeon deo ma-si-sseo-yo.', words: [{ word: '상추', meaning: '生菜' }, { word: '싸다', meaning: '包/裹' }], grammarIds: ['gp-05', 'gp-06'], difficulty: 'easy' },
      { id: 's11', ko: '한국에서는 어른보다 먼저 수저를 들면 안 돼요.', zh: '在韩国，不能在长辈之前先拿餐具。', pronunciation: 'han-gu-ge-seo-neun eo-reun-bo-da meon-jeo su-jeo-reul deul-myeon an dwae-yo.', words: [{ word: '어른', meaning: '长辈' }, { word: '수저', meaning: '勺筷' }], grammarIds: ['gp-05', 'gp-15'], difficulty: 'medium' },
      { id: 's12', ko: '어른이 먼저 드신 후에 먹는 것이 예의예요.', zh: '长辈先用之后再用餐是礼仪。', pronunciation: 'eo-reu-ni meon-jeo deu-sin hu-e meong-neun geo-si ye-ui-ye-yo.', words: [{ word: '드시다', meaning: '吃（敬语）' }, { word: '예의', meaning: '礼仪' }], grammarIds: ['gp-01', 'gp-06'], difficulty: 'medium' },
      { id: 's13', ko: '한국 음식은 맛도 좋고 건강에도 좋아서 세계적으로 인기가 많아지고 있어요.', zh: '韩国菜味道好又健康，所以在全世界越来越受欢迎。', pronunciation: 'han-guk eum-si-geun mat-do jo-ko geon-gang-e-do jo-a-seo se-gye-jeo-geu-ro in-gi-ga ma-na-ji-go i-sseo-yo.', words: [{ word: '건강', meaning: '健康' }, { word: '세계적', meaning: '世界性的' }, { word: '많아지다', meaning: '变多' }], grammarIds: ['gp-06', 'gp-08', 'gp-20'], difficulty: 'hard' },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇文章主要介绍了什么？', options: ['韩国家庭结构', '韩国饮食文化和礼仪', '韩国旅游景点', '韩国教育制度'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"어른보다 먼저 수저를 들면 안 돼요"中"수저"是什么意思？', options: ['筷子', '勺子和筷子', '叉子', '刀'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '韩国餐桌上，谁应该先开始用餐？', options: ['孩子', '客人', '长辈', '主人'], answer: 2, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '한국 음식 중에서 ___이/가 제일 맛있어 보여요. 왜냐하면 ___.', hint: '写你对一种韩国食物的印象：我觉得___看起来最好吃，因为___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 11. 韩国教育制度 (B1) — 从 articles.ts 精写文章转换
  // ═══════════════════════════════════════════
  {
    id: 'korean-education',
    title: '韩国教育制度',
    titleKo: '한국의 교육 제도',
    emoji: '🎓',
    level: 'B1',
    topic: '校园',
    estimatedMinutes: 8,
    learningGoals: [
      '了解韩国教育体系',
      '掌握教育和社会话题相关的韩语表达',
      '练习衔接词尾和书面表达',
    ],
    coreWords: [
      { word: '교육 제도', meaning: '教育制度', pronunciation: 'gyo-yuk je-do' },
      { word: '수능', meaning: '韩国高考', pronunciation: 'su-neung' },
      { word: '입시', meaning: '入学考试', pronunciation: 'ip-si' },
      { word: '경쟁', meaning: '竞争', pronunciation: 'gyeong-jaeng' },
      { word: '치열하다', meaning: '激烈', pronunciation: 'chi-yeol-ha-da' },
      { word: '다문화', meaning: '多文化', pronunciation: 'da-mun-hwa' },
    ],
    grammarIds: ['gp-01', 'gp-03', 'gp-04', 'gp-06', 'gp-17', 'gp-20'],
    sentences: [
      { id: 's1', ko: '한국의 교육 제도는 초등학교 6년, 중학교 3년, 고등학교 3년, 그리고 대학교로 구성되어 있어요.', zh: '韩国的教育制度由小学6年、初中3年、高中3年和大学组成。', pronunciation: 'han-gu-gui gyo-yuk je-do-neun cho-deung-hak-gyo yung-nyeon, jung-hak-gyo sam-nyeon, go-deung-hak-gyo sam-nyeon, geu-ri-go dae-hak-gyo-ro gu-seong-dwe-eo i-sseo-yo.', words: [{ word: '교육 제도', meaning: '教育制度' }, { word: '초등학교', meaning: '小学' }, { word: '구성되다', meaning: '构成' }], grammarIds: ['gp-01', 'gp-20'], difficulty: 'medium' },
      { id: 's2', ko: '한국 학생들은 대학 입시를 위해 아주 열심히 공부해요.', zh: '韩国学生们为了大学入学考试非常努力地学习。', pronunciation: 'han-guk hak-ssaeng-deu-reun dae-hak ip-ssi-reul wi-hae a-ju yeol-ssim-hi gong-bu-hae-yo.', words: [{ word: '대학', meaning: '大学' }, { word: '입시', meaning: '入学考试' }, { word: '열심히', meaning: '努力地' }], grammarIds: ['gp-01', 'gp-06'], difficulty: 'easy' },
      { id: 's3', ko: '수능이라고 불리는 대학수학능력시험은 매년 11월에 치러져요.', zh: '被称为"修能"的大学修学能力考试每年11月举行。', pronunciation: 'su-neung-i-ra-go bul-li-neun dae-hak-su-hak-neung-nyeo-si-heo-meun mae-nyeon si-bi-rweo-re chi-reo-jyeo-yo.', words: [{ word: '수능', meaning: '韩国高考' }, { word: '매년', meaning: '每年' }, { word: '치러지다', meaning: '举行（被动）' }], grammarIds: ['gp-03', 'gp-17'], difficulty: 'hard' },
      { id: 's4', ko: '수능은 한국 사회에서 가장 중요한 시험 중 하나예요.', zh: '修能是韩国社会最重要的考试之一。', pronunciation: 'su-neung-eun han-guk sa-hoe-e-seo ga-jang jung-yo-han si-heom jung ha-na-ye-yo.', words: [{ word: '사회', meaning: '社会' }, { word: '중요하다', meaning: '重要' }, { word: '시험', meaning: '考试' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's5', ko: '시험 당일에는 많은 사람들이 수험생을 응원하고, 경찰차와 택시까지 수험생을 태워 주기도 해요.', zh: '考试当天很多人为考生加油，连警车和出租车都会送考生。', pronunciation: 'si-heom dang-i-re-neun ma-neun sa-ram-deu-ri su-heom-saeng-eul eung-wo-na-go, gyeong-chal-cha-wa taek-si-kka-ji su-heom-saeng-eul tae-weo ju-gi-do hae-yo.', words: [{ word: '당일', meaning: '当天' }, { word: '수험생', meaning: '考生' }, { word: '응원하다', meaning: '加油/助威' }], grammarIds: ['gp-06', 'gp-17', 'gp-19'], difficulty: 'hard' },
      { id: 's6', ko: '시험 결과에 따라 갈 수 있는 대학교가 달라지기 때문이에요.', zh: '因为根据考试结果，能去的大学会不一样。', pronunciation: 'si-heom gyeol-gwa-e tta-ra gal su in-neun dae-hak-gyo-ga dal-la-ji-gi ttae-mu-ni-e-yo.', words: [{ word: '결과', meaning: '结果' }, { word: '~에 따라', meaning: '根据~' }, { word: '달라지다', meaning: '变得不同' }], grammarIds: ['gp-06', 'gp-15'], difficulty: 'hard' },
      { id: 's7', ko: '그래서 많은 고등학생들은 방과 후에도 학원에 가서 밤늦게까지 공부를 계속해요.', zh: '所以很多高中生放学后还要去补习班学习到深夜。', pronunciation: 'geu-rae-seo ma-neun go-deung-hak-ssaeng-deu-reun bang-gwa hu-e-do ha-gwo-ne ga-seo bam-neut-ge-kka-ji gong-bu-reul gye-so-kae-yo.', words: [{ word: '방과 후', meaning: '放学后' }, { word: '학원', meaning: '补习班' }, { word: '계속하다', meaning: '继续' }], grammarIds: ['gp-06', 'gp-19'], difficulty: 'medium' },
      { id: 's8', ko: '이런 경쟁이 치열하지만, 요즘은 다양한 진로를 선택하는 학생들도 늘고 있어요.', zh: '虽然竞争如此激烈，但最近选择多样出路的学生也在增加。', pronunciation: 'i-reon gyeong-jaeng-i chi-yeol-ha-ji-man, yo-jeu-meun da-yang-han jil-lo-reul seon-tae-ka-neun hak-ssaeng-deul-do neul-go i-sseo-yo.', words: [{ word: '경쟁', meaning: '竞争' }, { word: '치열하다', meaning: '激烈' }, { word: '진로', meaning: '出路/前程' }], grammarIds: ['gp-04', 'gp-08', 'gp-20'], difficulty: 'hard' },
      { id: 's9', ko: '예를 들어 예술이나 체육을 전공하거나 창업을 준비하는 학생들도 많아졌어요.', zh: '比如说，选择艺术或体育专业，或者准备创业的学生也变多了。', pronunciation: 'ye-reul deu-reo ye-su-ri-na che-yu-geul jeon-gong-ha-geo-na chang-eo-beul jun-bi-ha-neun hak-ssaeng-deul-do ma-na-jyeo-sseo-yo.', words: [{ word: '예술', meaning: '艺术' }, { word: '체육', meaning: '体育' }, { word: '전공하다', meaning: '专业/主修' }, { word: '창업', meaning: '创业' }], grammarIds: ['gp-03', 'gp-17'], difficulty: 'hard' },
      { id: 's10', ko: '한편 한국에는 다문화 가정의 학생들도 점점 늘어나고 있어요.', zh: '另一方面，韩国的多文化家庭学生也在逐渐增多。', pronunciation: 'han-pyeon han-gu-ge-neun da-mun-hwa ga-jeong-ui hak-ssaeng-deul-do jeom-jeom neu-reo-na-go i-sseo-yo.', words: [{ word: '한편', meaning: '另一方面' }, { word: '다문화 가정', meaning: '多文化家庭' }, { word: '점점', meaning: '逐渐' }], grammarIds: ['gp-08', 'gp-19', 'gp-20'], difficulty: 'medium' },
      { id: 's11', ko: '이 학생들을 위한 특별한 한국어 교육 프로그램도 생기고 있어요.', zh: '针对这些学生的特别韩语教育项目也在出现。', pronunciation: 'i hak-ssaeng-deu-reul wi-han teuk-byeo-ran han-gu-geo gyo-yuk peu-ro-geu-raem-do saeng-gi-go i-sseo-yo.', words: [{ word: '특별하다', meaning: '特别' }, { word: '프로그램', meaning: '项目/计划' }, { word: '생기다', meaning: '出现/产生' }], grammarIds: ['gp-08', 'gp-06'], difficulty: 'medium' },
      { id: 's12', ko: '교육의 기회는 누구에게나 평등해야 하니까요.', zh: '毕竟教育的机会对任何人都应该平等。', pronunciation: 'gyo-yu-gui gi-hoe-neun nu-gu-e-ge-na pyeong-deung-hae-ya ha-ni-kka-yo.', words: [{ word: '기회', meaning: '机会' }, { word: '평등하다', meaning: '平等' }], grammarIds: ['gp-06', 'gp-15'], difficulty: 'medium' },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '韩国学生为什么努力学习？', options: ['因为喜欢学习', '因为大学入学考试竞争激烈', '因为父母逼迫', '因为老师要求'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"수능"是什么？', options: ['一种运动', '韩国高考', '大学名称', '考试科目'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '文章中提到韩国教育最近有什么变化？', options: ['高考取消了', '多样化出路选择增多', '补习班消失了', '大学免费了'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '한국의 교육 제도에서 ___는/은 ___때문에 인상적이에요.', hint: '写你对韩国教育的印象：韩国教育中的___因为___让我印象深刻。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 12. 我的一天 (A0) — 精写版本，替换原短版
  // ═══════════════════════════════════════════
  {
    id: 'my-day',
    title: '我的一天',
    titleKo: '나의 하루',
    emoji: '☀️',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会用韩语描述一天的生活',
      '掌握时间表达和日常动词',
      '练习用"~(으)면서"和"~기 전에"',
    ],
    coreWords: [
      { word: '일어나다', meaning: '起床', pronunciation: 'i-reo-na-da' },
      { word: '지하철', meaning: '地铁', pronunciation: 'ji-ha-cheol' },
      { word: '수업', meaning: '课程', pronunciation: 'su-eop' },
      { word: '도서관', meaning: '图书馆', pronunciation: 'do-seo-gwan' },
      { word: '비빔밥', meaning: '拌饭', pronunciation: 'bi-bim-bap' },
      { word: '열심히', meaning: '努力地', pronunciation: 'yeol-ssi-mi' },
    ],
    grammarIds: ['gp-01', 'gp-05', 'gp-06', 'gp-08', 'gp-13'],
    sentences: [
      { id: 's1', ko: '아침 7시에 일어나요.', zh: '早上7点起床。', pronunciation: 'a-chim il-gop-si-e i-reo-na-yo.', words: [{ word: '아침', meaning: '早上' }, { word: '일어나다', meaning: '起床' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's2', ko: '세수하고 이를 닦아요.', zh: '洗脸刷牙。', pronunciation: 'se-su-ha-go i-reul dakk-a-yo.', words: [{ word: '세수하다', meaning: '洗脸' }, { word: '이를 닦다', meaning: '刷牙' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's3', ko: '아침으로 토스트와 우유를 먹어요.', zh: '早餐吃吐司和牛奶。', pronunciation: 'a-chim-eu-ro to-seu-teu-wa u-yu-reul meo-geo-yo.', words: [{ word: '토스트', meaning: '吐司' }, { word: '우유', meaning: '牛奶' }], grammarIds: ['gp-13'], difficulty: 'easy' },
      { id: 's4', ko: '8시 반에 지하철을 타고 학교에 가요.', zh: '8点半坐地铁去学校。', pronunciation: 'yeo-deol-si ba-ne ji-ha-cheo-reul ta-go hak-gyo-e ga-yo.', words: [{ word: '지하철', meaning: '地铁' }, { word: '타다', meaning: '乘坐' }], grammarIds: ['gp-06', 'gp-13'], difficulty: 'easy' },
      { id: 's5', ko: '지하철은 사람이 정말 많아요. 그래서 항상 음악을 들으면서 가요.', zh: '地铁上人真的特别多。所以总是边听音乐边赶路。', pronunciation: 'ji-ha-cheo-reun sa-ra-mi jeong-mal ma-na-yo. geu-rae-seo hang-sang eu-ma-geul deu-reu-myeon-seo ga-yo.', words: [{ word: '정말', meaning: '真的' }, { word: '항상', meaning: '总是' }, { word: '음악', meaning: '音乐' }], grammarIds: ['gp-08', 'gp-20'], difficulty: 'medium' },
      { id: 's6', ko: '오전에는 한국어 수업을 들어요.', zh: '上午上韩语课。', pronunciation: 'o-jeo-ne-neun han-gu-geo su-eo-beul deu-reo-yo.', words: [{ word: '오전', meaning: '上午' }, { word: '한국어', meaning: '韩语' }, { word: '수업', meaning: '课程' }], grammarIds: ['gp-13'], difficulty: 'easy' },
      { id: 's7', ko: '수업이 끝나면 도서관에 가요.', zh: '下课后去图书馆。', pronunciation: 'su-eo-bi kkeun-na-myeon do-seo-gwa-ne ga-yo.', words: [{ word: '끝나다', meaning: '结束' }, { word: '도서관', meaning: '图书馆' }], grammarIds: ['gp-05'], difficulty: 'easy' },
      { id: 's8', ko: '점심은 친구들과 같이 학교 식당에서 먹어요.', zh: '午饭和朋友们一起在学校食堂吃。', pronunciation: 'jeom-si-meun chin-gu-deul-gwa ga-chi hak-gyo sik-dang-e-seo meo-geo-yo.', words: [{ word: '식당', meaning: '食堂' }, { word: '같이', meaning: '一起' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's9', ko: '요즘은 비빔밥을 자주 먹어요. 정말 맛있어요.', zh: '最近经常吃拌饭。真的很好吃。', pronunciation: 'yo-jeu-meun bi-bim-ba-beul ja-ju meo-geo-yo. jeong-mal ma-si-sseo-yo.', words: [{ word: '요즘', meaning: '最近' }, { word: '비빔밥', meaning: '拌饭' }, { word: '자주', meaning: '经常' }], grammarIds: ['gp-13', 'gp-20'], difficulty: 'easy' },
      { id: 's10', ko: '오후에는 도서관에서 공부를 열심히 해요. 가끔은 카페에 가서 공부하기도 해요.', zh: '下午在图书馆努力学习。有时也去咖啡厅学习。', pronunciation: 'o-hu-e-neun do-seo-gwa-ne-seo gong-bu-reul yeol-ssi-mi hae-yo. ga-kkeu-meun ka-pe-e ga-seo gong-bu-ha-gi-do hae-yo.', words: [{ word: '오후', meaning: '下午' }, { word: '열심히', meaning: '努力地' }, { word: '가끔', meaning: '有时' }], grammarIds: ['gp-06'], difficulty: 'medium' },
      { id: 's11', ko: '저녁에는 집에 돌아와서 쉬어요. 샤워하고 핸드폰을 봐요.', zh: '晚上回家休息。洗个澡看看手机。', pronunciation: 'jeo-nyeo-ge-neun ji-be do-ra-wa-seo swi-eo-yo. sya-weo-ha-go haen-deu-po-neul bwa-yo.', words: [{ word: '돌아오다', meaning: '回来' }, { word: '쉬다', meaning: '休息' }, { word: '핸드폰', meaning: '手机' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's12', ko: '자기 전에 책을 읽어요. 보통 11시쯤에 잠을 자요.', zh: '睡前读一会儿书。一般11点左右睡觉。', pronunciation: 'ja-gi jeo-ne chae-geul il-geo-yo. bo-tong yeol-han-si-jjeu-me ja-meul ja-yo.', words: [{ word: '전에', meaning: '之前' }, { word: '보통', meaning: '通常' }, { word: '쯤', meaning: '左右' }], grammarIds: ['gp-01', 'gp-06'], difficulty: 'easy' },
      { id: 's13', ko: '내일은 더 좋은 하루가 될 거예요!', zh: '明天会是更好的一天！', pronunciation: 'nae-i-reun deo jo-eun ha-ru-ga dwel geo-ye-yo!', words: [{ word: '내일', meaning: '明天' }, { word: '되다', meaning: '成为' }], grammarIds: ['gp-15', 'gp-20'], difficulty: 'easy' },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '这篇文章描述了什么？', options: ['韩国旅游指南', '一个学生的一天', '韩国食物介绍', '地铁乘坐指南'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"일어나다"是什么意思？', options: ['睡觉', '起床', '吃饭', '学习'], answer: 1, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '作者午餐经常吃什么？', options: ['泡菜汤', '拌饭', '拉面', '寿司'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '저는 ___시에 일어나요. ___을/를 타고 ___에 가요.', hint: '写你的日常：我___点起床。坐___去___。' },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 13. 我的家人 (A1) — 精写版本
  // ═══════════════════════════════════════════
  {
    id: 'my-family',
    title: '我的家人',
    titleKo: '우리 가족',
    emoji: '👨‍👩‍👧‍👦',
    level: 'A1',
    topic: '生活',
    estimatedMinutes: 5,
    learningGoals: [
      '学会介绍家人',
      '掌握敬语表达（~(으)세요）',
      '练习比较级"~보다"',
    ],
    coreWords: [
      { word: '가족', meaning: '家庭', pronunciation: 'ga-jok' },
      { word: '회사원', meaning: '公司职员', pronunciation: 'hoe-sa-won' },
      { word: '따뜻하다', meaning: '温暖的', pronunciation: 'tta-tteu-ta-da' },
      { word: '친절하다', meaning: '亲切的', pronunciation: 'chin-jeol-ha-da' },
      { word: '여동생', meaning: '妹妹', pronunciation: 'yeo-dong-saeng' },
      { word: '행복하다', meaning: '幸福', pronunciation: 'haeng-bo-ka-da' },
    ],
    grammarIds: ['gp-01', 'gp-03', 'gp-04', 'gp-06', 'gp-15'],
    sentences: [
      { id: 's1', ko: '우리 가족은 모두 4명이에요. 아버지, 어머니, 여동생 그리고 저예요.', zh: '我家共有四口人：爸爸、妈妈、妹妹和我。', pronunciation: 'u-ri ga-jo-geun mo-du ne-myeong-i-e-yo. a-beo-ji, eo-meo-ni, yeo-dong-saeng geu-ri-go jeo-ye-yo.', words: [{ word: '가족', meaning: '家庭' }, { word: '모두', meaning: '全部' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's2', ko: '아버지는 회사원이에요. 매일 아침 일찍 출근하세요.', zh: '爸爸是公司职员。每天早上很早就上班。', pronunciation: 'a-beo-ji-neun hwe-sa-wo-ni-e-yo. mae-il a-chim il-jjik chul-geun-ha-se-yo.', words: [{ word: '회사원', meaning: '公司职员' }, { word: '일찍', meaning: '早早地' }, { word: '출근하다', meaning: '上班' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's3', ko: '주말에는 집에서 쉬는 걸 좋아하세요.', zh: '周末喜欢在家休息。', pronunciation: 'ju-ma-re-neun ji-be-seo swi-neun geol jo-a-ha-se-yo.', words: [{ word: '주말', meaning: '周末' }, { word: '쉬다', meaning: '休息' }], grammarIds: ['gp-15'], difficulty: 'easy' },
      { id: 's4', ko: '어머니는 요리를 정말 잘하세요. 특히 김치찌개를 제일 맛있게 만드세요.', zh: '妈妈做饭特别好吃。尤其泡菜汤做得最美味。', pronunciation: 'eo-meo-ni-neun yo-ri-reul jeong-mal jal-ha-se-yo. teu-ki gim-chi-jji-gae-reul je-il ma-sit-ge man-deu-se-yo.', words: [{ word: '특히', meaning: '尤其' }, { word: '김치찌개', meaning: '泡菜汤' }], grammarIds: ['gp-20'], difficulty: 'medium' },
      { id: 's5', ko: '어머니는 따뜻하고 친절한 분이세요.', zh: '妈妈是温暖又亲切的人。', pronunciation: 'eo-meo-ni-neun tta-tteu-ta-go chin-jeo-ran bu-ni-se-yo.', words: [{ word: '따뜻하다', meaning: '温暖的' }, { word: '친절하다', meaning: '亲切的' }], grammarIds: ['gp-06'], difficulty: 'easy' },
      { id: 's6', ko: '여동생은 저보다 두 살 어려요. 지금은 고등학생이에요.', zh: '妹妹比我小两岁。现在是高中生。', pronunciation: 'yeo-dong-saeng-eun jeo-bo-da du sal eo-ryeo-yo. ji-geu-meun go-deung-hak-ssaeng-i-e-yo.', words: [{ word: '~보다', meaning: '比~' }, { word: '어리다', meaning: '年纪小' }, { word: '고등학생', meaning: '高中生' }], grammarIds: ['gp-01'], difficulty: 'easy' },
      { id: 's7', ko: '여동생은 그림 그리는 걸 아주 좋아해요.', zh: '妹妹非常喜欢画画。', pronunciation: 'yeo-dong-saeng-eun geu-rim geu-ri-neun geol a-ju jo-a-hae-yo.', words: [{ word: '그림', meaning: '画' }, { word: '그리다', meaning: '画（动词）' }, { word: '아주', meaning: '非常' }], grammarIds: ['gp-15', 'gp-20'], difficulty: 'easy' },
      { id: 's8', ko: '가끔은 여동생이랑 싸우기도 하지만 금방 화해해요.', zh: '偶尔也会和妹妹吵架，但很快就和好了。', pronunciation: 'ga-kkeu-meun yeo-dong-saeng-i-rang ssa-u-gi-do ha-ji-man geum-bang hwa-hae-hae-yo.', words: [{ word: '싸우다', meaning: '吵架' }, { word: '금방', meaning: '马上' }, { word: '화해하다', meaning: '和好' }], grammarIds: ['gp-04', 'gp-19'], difficulty: 'medium' },
      { id: 's9', ko: '주말에는 가족이 함께 저녁을 먹어요. 식사하면서 재미있는 이야기를 많이 나눠요.', zh: '周末全家人一起吃晚饭。边吃边分享有趣的故事。', pronunciation: 'ju-ma-re-neun ga-jo-gi ham-kke jeo-nyeo-geul meo-geo-yo. sik-sa-ha-myeon-seo jae-mi-in-neun i-ya-gi-reul ma-ni na-nweo-yo.', words: [{ word: '함께', meaning: '一起' }, { word: '이야기', meaning: '故事' }, { word: '나누다', meaning: '分享' }], grammarIds: ['gp-06', 'gp-08'], difficulty: 'medium' },
      { id: 's10', ko: '우리 가족은 정말 행복해요. 서로 사랑하는 마음이 가장 중요하니까요.', zh: '我家真的很幸福。因为互相爱护的心最重要。', pronunciation: 'u-ri ga-jo-geun jeong-mal haeng-bo-kae-yo. seo-ro sa-rang-ha-neun ma-eu-mi ga-jang jung-yo-ha-ni-kka-yo.', words: [{ word: '행복하다', meaning: '幸福' }, { word: '서로', meaning: '互相' }, { word: '사랑하다', meaning: '爱' }, { word: '마음', meaning: '心' }], grammarIds: ['gp-06', 'gp-20'], difficulty: 'medium' },
    ],
    questions: [
      { id: 'q1', type: 'main_idea', prompt: '作者家有几口人？', options: ['三口', '四口', '五口', '六口'], answer: 1, explanation: '' },
      { id: 'q2', type: 'vocab', prompt: '"여동생"是什么？', options: ['姐姐', '哥哥', '妹妹', '弟弟'], answer: 2, explanation: '' },
      { id: 'q3', type: 'detail', prompt: '周末作者家做什么？', options: ['一起看电影', '一起吃饭聊天', '一起去旅行', '各自休息'], answer: 1, explanation: '' },
    ],
    outputTask: { type: 'complete_sentence', template: '우리 가족은 ___명이에요. ___는/은 ___을/를 좋아해요.', hint: '写你的家庭：我家有___口人。___喜欢___。' },
    createdAt: now,
  },
];

/** 按等级分组 */
export function getArticlesByLevel(level: Article['level']): Article[] {
  return readingArticles.filter((a) => a.level === level);
}

/** 按主题分组 */
export function getArticlesByTopic(topic: string): Article[] {
  return readingArticles.filter((a) => a.topic === topic);
}

/** 获取今日阅读推荐 */
export function getTodayArticle(): Article {
  const idx = new Date().getDate() % readingArticles.length;
  return readingArticles[idx];
}

/** 等级标签 */
export const levelLabel: Record<Article['level'], string> = {
  A0: '零基础',
  A1: '入门',
  A2: '初级',
  B1: '进阶',
  TOPIK: 'TOPIK',
};

/** 等级颜色 */
export const levelColor: Record<Article['level'], string> = {
  A0: 'bg-emerald-100 text-emerald-700',
  A1: 'bg-teal-100 text-teal-700',
  A2: 'bg-sky-100 text-sky-700',
  B1: 'bg-purple-100 text-purple-700',
  TOPIK: 'bg-rose-100 text-rose-700',
};

/** 主题列表 */
export const topics = ['生活', '旅行', '咖啡', 'KPOP', '韩剧', '校园', 'TOPIK'] as const;
