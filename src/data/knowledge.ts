export interface KnowledgeWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleZh: string;
  emoji: string;
  note?: string;
}

export interface KnowledgeCategory {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  description: string;
  emoji: string;
  words: KnowledgeWord[];
}

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'time', slug: 'time', name: '时间/日期', nameKo: '시간/날짜', emoji: '🕐',
    description: '学习表达日期、星期、时刻等时间相关词汇',
    words: [
      { id: 't1', word: '시간', pronunciation: 'sigan', meaning: '时间', partOfSpeech: '名词', emoji: '⏰', example: '시간이 없어요.', exampleZh: '没有时间。', note: '最常用的"时间"表达' },
      { id: 't2', word: '오늘', pronunciation: 'oneul', meaning: '今天', partOfSpeech: '名词', emoji: '📅', example: '오늘 날씨가 좋아요.', exampleZh: '今天天气很好。' },
      { id: 't3', word: '내일', pronunciation: 'naeil', meaning: '明天', partOfSpeech: '名词', emoji: '🔜', example: '내일 만나요!', exampleZh: '明天见！', note: '约时间的常用语' },
      { id: 't4', word: '어제', pronunciation: 'eoje', meaning: '昨天', partOfSpeech: '名词', emoji: '⬅️', example: '어제 뭐 했어요?', exampleZh: '昨天做了什么？' },
      { id: 't5', word: '지금', pronunciation: 'jigeum', meaning: '现在', partOfSpeech: '名词', emoji: '⌛', example: '지금 몇 시예요?', exampleZh: '现在几点了？' },
      { id: 't6', word: '아침', pronunciation: 'achim', meaning: '早上', partOfSpeech: '名词', emoji: '🌅', example: '아침에 일찍 일어나요.', exampleZh: '早上早起。' },
      { id: 't7', word: '점심', pronunciation: 'jeomsim', meaning: '中午', partOfSpeech: '名词', emoji: '☀️', example: '점심 먹었어요?', exampleZh: '吃午饭了吗？' },
      { id: 't8', word: '저녁', pronunciation: 'jeonyeok', meaning: '晚上', partOfSpeech: '名词', emoji: '🌙', example: '저녁에 뭐 해요?', exampleZh: '晚上做什么？' },
      { id: 't9', word: '주말', pronunciation: 'jumal', meaning: '周末', partOfSpeech: '名词', emoji: '🎉', example: '주말 잘 보내세요!', exampleZh: '周末愉快！', note: '常用祝福语' },
      { id: 't10', word: '년', pronunciation: 'nyeon', meaning: '年', partOfSpeech: '依存名词', emoji: '📆', example: '올해는 2026년이에요.', exampleZh: '今年是2026年。' },
      { id: 't11', word: '월', pronunciation: 'wol', meaning: '月', partOfSpeech: '依存名词', emoji: '🗓️', example: '5월에 한국에 가요.', exampleZh: '五月去韩国。' },
      { id: 't12', word: '일', pronunciation: 'il', meaning: '日/天', partOfSpeech: '依存名词', emoji: '📌', example: '며칠 동안 여행할 거예요?', exampleZh: '旅行几天？' },
      { id: 't13', word: '시', pronunciation: 'si', meaning: '点(时)', partOfSpeech: '依存名词', emoji: '🕒', example: '3시에 만나요.', exampleZh: '三点见面。' },
      { id: 't14', word: '분', pronunciation: 'bun', meaning: '分', partOfSpeech: '依存名词', emoji: '⏱️', example: '10분만 기다려 주세요.', exampleZh: '请等十分钟。' },
    ],
  },
  {
    id: 'numbers', slug: 'numbers', name: '数字', nameKo: '숫자', emoji: '🔢',
    description: '韩国有两套数字体系：汉字词和固有词',
    words: [
      { id: 'n1', word: '하나', pronunciation: 'hana', meaning: '一 (固有词)', partOfSpeech: '数词', emoji: '1️⃣', example: '하나 주세요.', exampleZh: '请给我一个。', note: '计数时用固有词' },
      { id: 'n2', word: '둘', pronunciation: 'dul', meaning: '二 (固有词)', partOfSpeech: '数词', emoji: '2️⃣', example: '둘이서 같이 가요.', exampleZh: '两个一起去。' },
      { id: 'n3', word: '셋', pronunciation: 'set', meaning: '三 (固有词)', partOfSpeech: '数词', emoji: '3️⃣', example: '셋을 세어 보세요.', exampleZh: '请数到三。' },
      { id: 'n4', word: '일', pronunciation: 'il', meaning: '一 (汉字词)', partOfSpeech: '数词', emoji: '①', example: '일번 출구로 나오세요.', exampleZh: '从一号出口出来。', note: '日期/金额/电话号码用汉字词' },
      { id: 'n5', word: '이', pronunciation: 'i', meaning: '二 (汉字词)', partOfSpeech: '数词', emoji: '②', example: '이번 주에 바빠요.', exampleZh: '这周很忙。' },
      { id: 'n6', word: '삼', pronunciation: 'sam', meaning: '三 (汉字词)', partOfSpeech: '数词', emoji: '③', example: '삼 층에 있어요.', exampleZh: '在三楼。' },
      { id: 'n7', word: '첫 번째', pronunciation: 'cheot beonjjae', meaning: '第一个', partOfSpeech: '名词', emoji: '🥇', example: '첫 번째로 말할게요.', exampleZh: '我第一个说。', note: '顺序表达' },
      { id: 'n8', word: '반', pronunciation: 'ban', meaning: '半', partOfSpeech: '名词', emoji: '🪙', example: '한 시 반이에요.', exampleZh: '一点半了。' },
      { id: 'n9', word: '백', pronunciation: 'baek', meaning: '百', partOfSpeech: '数词', emoji: '💯', example: '백 원이에요.', exampleZh: '一百韩元。' },
      { id: 'n10', word: '천', pronunciation: 'cheon', meaning: '千', partOfSpeech: '数词', emoji: '🔟', example: '이거 천 원이에요.', exampleZh: '这个一千韩元。' },
      { id: 'n11', word: '만', pronunciation: 'man', meaning: '万', partOfSpeech: '数词', emoji: '📊', example: '만 원만 빌려 주세요.', exampleZh: '请借我一万韩元。' },
    ],
  },
  {
    id: 'fruits', slug: 'fruits', name: '水果', nameKo: '과일', emoji: '🍎',
    description: '常见水果的韩语表达',
    words: [
      { id: 'f1', word: '사과', pronunciation: 'sagwa', meaning: '苹果', partOfSpeech: '名词', emoji: '🍎', example: '사과 하나 주세요.', exampleZh: '请给我一个苹果。' },
      { id: 'f2', word: '바나나', pronunciation: 'banana', meaning: '香蕉', partOfSpeech: '名词', emoji: '🍌', example: '바나나를 좋아해요.', exampleZh: '喜欢香蕉。', note: '外来词，发音与英语类似' },
      { id: 'f3', word: '포도', pronunciation: 'podo', meaning: '葡萄', partOfSpeech: '名词', emoji: '🍇', example: '포도 맛있어요!', exampleZh: '葡萄真好吃！' },
      { id: 'f4', word: '딸기', pronunciation: 'ttalgi', meaning: '草莓', partOfSpeech: '名词', emoji: '🍓', example: '딸기 케이크 먹고 싶어요.', exampleZh: '想吃草莓蛋糕。' },
      { id: 'f5', word: '수박', pronunciation: 'subak', meaning: '西瓜', partOfSpeech: '名词', emoji: '🍉', example: '여름에 수박이 제일 맛있어요.', exampleZh: '夏天西瓜最好吃。' },
      { id: 'f6', word: '복숭아', pronunciation: 'boksunga', meaning: '桃子', partOfSpeech: '名词', emoji: '🍑', example: '복숭아 향기가 좋아요.', exampleZh: '桃子很香。' },
      { id: 'f7', word: '오렌지', pronunciation: 'orenji', meaning: '橙子', partOfSpeech: '名词', emoji: '🍊', example: '오렌지 주스 주세요.', exampleZh: '请给我橙汁。' },
      { id: 'f8', word: '배', pronunciation: 'bae', meaning: '梨', partOfSpeech: '名词', emoji: '🍐', example: '한국 배는 아주 달아요.', exampleZh: '韩国梨很甜。' },
      { id: 'f9', word: '감', pronunciation: 'gam', meaning: '柿子', partOfSpeech: '名词', emoji: '🟠', example: '가을에 감을 많이 먹어요.', exampleZh: '秋天吃很多柿子。' },
      { id: 'f10', word: '귤', pronunciation: 'gyul', meaning: '橘子', partOfSpeech: '名词', emoji: '🍊', example: '제주도 귤이 유명해요.', exampleZh: '济州岛的橘子很有名。' },
    ],
  },
  {
    id: 'sports', slug: 'sports', name: '运动', nameKo: '운동', emoji: '⚽',
    description: '运动相关的词汇和表达',
    words: [
      { id: 's1', word: '운동', pronunciation: 'undong', meaning: '运动', partOfSpeech: '名词', emoji: '🏃', example: '매일 운동해요.', exampleZh: '每天运动。' },
      { id: 's2', word: '축구', pronunciation: 'chukgu', meaning: '足球', partOfSpeech: '名词', emoji: '⚽', example: '친구랑 축구 했어요.', exampleZh: '和朋友踢了足球。' },
      { id: 's3', word: '농구', pronunciation: 'nonggu', meaning: '篮球', partOfSpeech: '名词', emoji: '🏀', example: '농구를 잘해요.', exampleZh: '篮球打得好。' },
      { id: 's4', word: '수영', pronunciation: 'suyeong', meaning: '游泳', partOfSpeech: '名词', emoji: '🏊', example: '수영 배우고 싶어요.', exampleZh: '想学游泳。' },
      { id: 's5', word: '달리기', pronunciation: 'dalligi', meaning: '跑步', partOfSpeech: '名词', emoji: '🏃‍♂️', example: '아침마다 달리기 해요.', exampleZh: '每天早上跑步。' },
      { id: 's6', word: '야구', pronunciation: 'yagu', meaning: '棒球', partOfSpeech: '名词', emoji: '⚾', example: '한국에서 야구가 인기 있어요.', exampleZh: '棒球在韩国很受欢迎。' },
      { id: 's7', word: '탁구', pronunciation: 'takgu', meaning: '乒乓球', partOfSpeech: '名词', emoji: '🏓', example: '탁구 칠 줄 알아요?', exampleZh: '会打乒乓球吗？' },
      { id: 's8', word: '배드민턴', pronunciation: 'baedeuminteon', meaning: '羽毛球', partOfSpeech: '名词', emoji: '🏸', example: '주말에 배드민턴 쳐요.', exampleZh: '周末打羽毛球。', note: '外来词，来自 badminton' },
      { id: 's9', word: '요가', pronunciation: 'yoga', meaning: '瑜伽', partOfSpeech: '名词', emoji: '🧘', example: '요가로 스트레스 풀어요.', exampleZh: '用瑜伽缓解压力。' },
      { id: 's10', word: '등산', pronunciation: 'deungsan', meaning: '登山', partOfSpeech: '名词', emoji: '🧗', example: '주말에 등산 갈래요?', exampleZh: '周末去登山吗？', note: '韩国人非常喜欢登山' },
    ],
  },
  {
    id: 'hobbies', slug: 'hobbies', name: '兴趣爱好', nameKo: '취미', emoji: '🎨',
    description: '描述爱好和休闲活动的词汇',
    words: [
      { id: 'h1', word: '취미', pronunciation: 'chwimi', meaning: '兴趣爱好', partOfSpeech: '名词', emoji: '⭐', example: '취미가 뭐예요?', exampleZh: '你的爱好是什么？' },
      { id: 'h2', word: '독서', pronunciation: 'dokseo', meaning: '读书', partOfSpeech: '名词', emoji: '📚', example: '독서를 좋아해요.', exampleZh: '喜欢读书。' },
      { id: 'h3', word: '음악', pronunciation: 'eumak', meaning: '音乐', partOfSpeech: '名词', emoji: '🎵', example: '음악 들으면서 공부해요.', exampleZh: '边听音乐边学习。' },
      { id: 'h4', word: '영화', pronunciation: 'yeonghwa', meaning: '电影', partOfSpeech: '名词', emoji: '🎬', example: '주말에 영화 보러 가요.', exampleZh: '周末去看电影。' },
      { id: 'h5', word: '여행', pronunciation: 'yeohaeng', meaning: '旅行', partOfSpeech: '名词', emoji: '✈️', example: '한국으로 여행 가고 싶어요.', exampleZh: '想去韩国旅行。' },
      { id: 'h6', word: '사진', pronunciation: 'sajin', meaning: '照片/摄影', partOfSpeech: '名词', emoji: '📷', example: '사진 찍는 걸 좋아해요.', exampleZh: '喜欢拍照。' },
      { id: 'h7', word: '그림', pronunciation: 'geurim', meaning: '画画', partOfSpeech: '名词', emoji: '🎨', example: '그림 그리기가 취미예요.', exampleZh: '画画是我的爱好。' },
      { id: 'h8', word: '요리', pronunciation: 'yori', meaning: '烹饪', partOfSpeech: '名词', emoji: '🍳', example: '한국 요리를 배우고 있어요.', exampleZh: '正在学做韩国菜。' },
      { id: 'h9', word: '춤', pronunciation: 'chum', meaning: '跳舞', partOfSpeech: '名词', emoji: '💃', example: '케이팝 춤을 배워요.', exampleZh: '学跳K-pop舞蹈。' },
      { id: 'h10', word: '게임', pronunciation: 'geim', meaning: '游戏', partOfSpeech: '名词', emoji: '🎮', example: '게임 하면서 시간 가는 줄 몰라요.', exampleZh: '玩游戏忘记时间。', note: '外来词，来自 game' },
    ],
  },
  {
    id: 'family', slug: 'family', name: '家庭', nameKo: '가족', emoji: '👨‍👩‍👧‍👦',
    description: '家庭成员称呼和相关表达',
    words: [
      { id: 'fa1', word: '가족', pronunciation: 'gajok', meaning: '家庭', partOfSpeech: '名词', emoji: '👨‍👩‍👧‍👦', example: '가족이 몇 명이에요?', exampleZh: '家里有几口人？' },
      { id: 'fa2', word: '아버지', pronunciation: 'abeoji', meaning: '爸爸', partOfSpeech: '名词', emoji: '👨', example: '아버지께서 회사에 가셨어요.', exampleZh: '爸爸去公司了。', note: '敬语形式，可简称为아빠' },
      { id: 'fa3', word: '어머니', pronunciation: 'eomeoni', meaning: '妈妈', partOfSpeech: '名词', emoji: '👩', example: '어머니가 요리를 잘하세요.', exampleZh: '妈妈做饭很好吃。', note: '敬语形式，可简称为엄마' },
      { id: 'fa4', word: '형', pronunciation: 'hyeong', meaning: '哥哥（男称）', partOfSpeech: '名词', emoji: '🧑', example: '형이랑 같이 살아요.', exampleZh: '和哥哥一起住。', note: '男性称呼哥哥用형' },
      { id: 'fa5', word: '오빠', pronunciation: 'oppa', meaning: '哥哥（女称）', partOfSpeech: '名词', emoji: '🙋‍♂️', example: '오빠가 선물을 줬어요.', exampleZh: '哥哥送了礼物。', note: '女性称呼哥哥用오빠' },
      { id: 'fa6', word: '언니', pronunciation: 'eonni', meaning: '姐姐（女称）', partOfSpeech: '名词', emoji: '🙋‍♀️', example: '언니는 대학생이에요.', exampleZh: '姐姐是大学生。', note: '女性称呼姐姐用언니' },
      { id: 'fa7', word: '누나', pronunciation: 'nuna', meaning: '姐姐（男称）', partOfSpeech: '名词', emoji: '👧', example: '누나가 맛있는 거 사 줬어요.', exampleZh: '姐姐买了好吃的给我。', note: '男性称呼姐姐用누나' },
      { id: 'fa8', word: '동생', pronunciation: 'dongsaeng', meaning: '弟弟/妹妹', partOfSpeech: '名词', emoji: '👶', example: '동생이랑 사이가 좋아요.', exampleZh: '和弟弟/妹妹关系很好。' },
      { id: 'fa9', word: '할아버지', pronunciation: 'harabeoji', meaning: '爷爷', partOfSpeech: '名词', emoji: '👴', example: '할아버지 댁에 갔어요.', exampleZh: '去了爷爷家。' },
      { id: 'fa10', word: '할머니', pronunciation: 'halmeoni', meaning: '奶奶', partOfSpeech: '名词', emoji: '👵', example: '할머니 음식이 제일 맛있어요.', exampleZh: '奶奶做的饭最好吃。' },
      { id: 'fa11', word: '친구', pronunciation: 'chingu', meaning: '朋友', partOfSpeech: '名词', emoji: '🤝', example: '한국 친구를 사귀었어요.', exampleZh: '交了韩国朋友。' },
    ],
  },
  {
    id: 'food', slug: 'food', name: '饮食', nameKo: '음식', emoji: '🍜',
    description: '韩国美食和日常饮食词汇',
    words: [
      { id: 'fd1', word: '밥', pronunciation: 'bap', meaning: '饭', partOfSpeech: '名词', emoji: '🍚', example: '밥 먹었어요?', exampleZh: '吃饭了吗？', note: '韩国人最常用的问候语之一' },
      { id: 'fd2', word: '김치', pronunciation: 'gimchi', meaning: '泡菜', partOfSpeech: '名词', emoji: '🥬', example: '김치가 매워요.', exampleZh: '泡菜很辣。' },
      { id: 'fd3', word: '불고기', pronunciation: 'bulgogi', meaning: '烤肉', partOfSpeech: '名词', emoji: '🥩', example: '불고기 진짜 맛있어요!', exampleZh: '烤肉真好吃！' },
      { id: 'fd4', word: '비빔밥', pronunciation: 'bibimbap', meaning: '拌饭', partOfSpeech: '名词', emoji: '🍲', example: '비빔밥에 고추장 넣으세요.', exampleZh: '请在拌饭里放辣椒酱。' },
      { id: 'fd5', word: '떡볶이', pronunciation: 'tteokbokki', meaning: '辣炒年糕', partOfSpeech: '名词', emoji: '🍢', example: '분식집에서 떡볶이 먹어요.', exampleZh: '在小吃店吃辣炒年糕。' },
      { id: 'fd6', word: '삼겹살', pronunciation: 'samgyeopsal', meaning: '五花肉', partOfSpeech: '名词', emoji: '🥓', example: '오늘 저녁 삼겹살 어때요?', exampleZh: '今晚吃五花肉怎么样？' },
      { id: 'fd7', word: '물', pronunciation: 'mul', meaning: '水', partOfSpeech: '名词', emoji: '💧', example: '물 한 잔 주세요.', exampleZh: '请给我一杯水。' },
      { id: 'fd8', word: '커피', pronunciation: 'keopi', meaning: '咖啡', partOfSpeech: '名词', emoji: '☕', example: '커피 한 잔 할래요?', exampleZh: '喝杯咖啡吗？', note: '韩国的咖啡文化非常盛行' },
      { id: 'fd9', word: '맥주', pronunciation: 'maekju', meaning: '啤酒', partOfSpeech: '名词', emoji: '🍺', example: '치킨이랑 맥주 주세요.', exampleZh: '请给我炸鸡和啤酒。', note: '치맥 = 炸鸡+啤酒的经典搭配' },
      { id: 'fd10', word: '매워요', pronunciation: 'maewoyo', meaning: '辣', partOfSpeech: '形容词', emoji: '🌶️', example: '이거 너무 매워요!', exampleZh: '这个太辣了！', note: '描述辣味的常用表达' },
      { id: 'fd11', word: '맛있어요', pronunciation: 'masisseoyo', meaning: '好吃', partOfSpeech: '形容词', emoji: '😋', example: '와, 진짜 맛있어요!', exampleZh: '哇，真的很好吃！', note: '万能美食称赞句' },
    ],
  },
  {
    id: 'colors', slug: 'colors', name: '颜色', nameKo: '색깔', emoji: '🎨',
    description: '颜色名称和描述颜色的表达',
    words: [
      { id: 'c1', word: '빨간색', pronunciation: 'ppalgansaek', meaning: '红色', partOfSpeech: '名词', emoji: '🔴', example: '빨간색 좋아해요.', exampleZh: '喜欢红色。' },
      { id: 'c2', word: '파란색', pronunciation: 'paransaek', meaning: '蓝色', partOfSpeech: '名词', emoji: '🔵', example: '하늘은 파란색이에요.', exampleZh: '天空是蓝色的。' },
      { id: 'c3', word: '노란색', pronunciation: 'noransaek', meaning: '黄色', partOfSpeech: '名词', emoji: '🟡', example: '노란색 꽃이 예뻐요.', exampleZh: '黄色的花很漂亮。' },
      { id: 'c4', word: '초록색', pronunciation: 'choroksaek', meaning: '绿色', partOfSpeech: '名词', emoji: '🟢', example: '봄에는 초록색이 많아요.', exampleZh: '春天有很多绿色。' },
      { id: 'c5', word: '검은색', pronunciation: 'geomeunsaek', meaning: '黑色', partOfSpeech: '名词', emoji: '⚫', example: '검은색 옷을 자주 입어요.', exampleZh: '经常穿黑色衣服。' },
      { id: 'c6', word: '하얀색', pronunciation: 'hayansaek', meaning: '白色', partOfSpeech: '名词', emoji: '⚪', example: '하얀색 강아지예요.', exampleZh: '是一只白色的小狗。' },
      { id: 'c7', word: '분홍색', pronunciation: 'bunhongsaek', meaning: '粉色', partOfSpeech: '名词', emoji: '🩷', example: '분홍색이 잘 어울려요.', exampleZh: '粉色很配你。' },
      { id: 'c8', word: '보라색', pronunciation: 'borasaek', meaning: '紫色', partOfSpeech: '名词', emoji: '🟣', example: '보라색 포도가 맛있어요.', exampleZh: '紫葡萄很好吃。' },
      { id: 'c9', word: '주황색', pronunciation: 'juhwangsaek', meaning: '橙色', partOfSpeech: '名词', emoji: '🟠', example: '가을에는 주황색 단풍이 예뻐요.', exampleZh: '秋天的橙色枫叶很美。' },
      { id: 'c10', word: '갈색', pronunciation: 'galsaek', meaning: '棕色', partOfSpeech: '名词', emoji: '🟤', example: '갈색 신발을 샀어요.', exampleZh: '买了棕色的鞋。' },
    ],
  },
  {
    id: 'animals', slug: 'animals', name: '动物', nameKo: '동물', emoji: '🐶',
    description: '常见动物的韩语名称',
    words: [
      { id: 'a1', word: '강아지', pronunciation: 'gangaji', meaning: '小狗', partOfSpeech: '名词', emoji: '🐕', example: '강아지가 너무 귀여워요!', exampleZh: '小狗太可爱了！' },
      { id: 'a2', word: '고양이', pronunciation: 'goyangi', meaning: '猫', partOfSpeech: '名词', emoji: '🐱', example: '고양이 키우세요?', exampleZh: '您养猫吗？' },
      { id: 'a3', word: '토끼', pronunciation: 'tokki', meaning: '兔子', partOfSpeech: '名词', emoji: '🐰', example: '토끼가 풀을 먹어요.', exampleZh: '兔子在吃草。' },
      { id: 'a4', word: '곰', pronunciation: 'gom', meaning: '熊', partOfSpeech: '名词', emoji: '🐻', example: '곰 인형 선물 받았어요.', exampleZh: '收到了熊玩偶礼物。' },
      { id: 'a5', word: '코끼리', pronunciation: 'kokkiri', meaning: '大象', partOfSpeech: '名词', emoji: '🐘', example: '코끼리는 코가 길어요.', exampleZh: '大象的鼻子很长。' },
      { id: 'a6', word: '사자', pronunciation: 'saja', meaning: '狮子', partOfSpeech: '名词', emoji: '🦁', example: '사자는 용감해요.', exampleZh: '狮子很勇敢。' },
      { id: 'a7', word: '돼지', pronunciation: 'dwaeji', meaning: '猪', partOfSpeech: '名词', emoji: '🐷', example: '돼지 꿈 꾸면 돈 들어온대요.', exampleZh: '据说梦到猪会有财运。', note: '韩国有梦猪招财的说法' },
      { id: 'a8', word: '소', pronunciation: 'so', meaning: '牛', partOfSpeech: '名词', emoji: '🐮', example: '소가 풀밭에 있어요.', exampleZh: '牛在草地上。' },
      { id: 'a9', word: '닭', pronunciation: 'dak', meaning: '鸡', partOfSpeech: '名词', emoji: '🐔', example: '닭고기로 요리했어요.', exampleZh: '用鸡肉做了菜。' },
      { id: 'a10', word: '물고기', pronunciation: 'mulgogi', meaning: '鱼', partOfSpeech: '名词', emoji: '🐟', example: '물고기가 맑은 물에서 헤엄쳐요.', exampleZh: '鱼在清水里游。' },
    ],
  },
  {
    id: 'weather', slug: 'weather', name: '天气', nameKo: '날씨', emoji: '🌤️',
    description: '天气相关的词汇和表达',
    words: [
      { id: 'w1', word: '날씨', pronunciation: 'nalssi', meaning: '天气', partOfSpeech: '名词', emoji: '🌤️', example: '오늘 날씨 어때요?', exampleZh: '今天天气怎么样？' },
      { id: 'w2', word: '비', pronunciation: 'bi', meaning: '雨', partOfSpeech: '名词', emoji: '🌧️', example: '비가 와요. 우산 챙기세요.', exampleZh: '下雨了，请带伞。' },
      { id: 'w3', word: '눈', pronunciation: 'nun', meaning: '雪', partOfSpeech: '名词', emoji: '❄️', example: '첫눈이 왔어요!', exampleZh: '下初雪了！', note: '韩国人认为初雪很浪漫' },
      { id: 'w4', word: '바람', pronunciation: 'baram', meaning: '风', partOfSpeech: '名词', emoji: '💨', example: '바람이 많이 불어요.', exampleZh: '风很大。' },
      { id: 'w5', word: '구름', pronunciation: 'gureum', meaning: '云', partOfSpeech: '名词', emoji: '☁️', example: '구름이 많아서 별이 안 보여요.', exampleZh: '云多所以看不见星星。' },
      { id: 'w6', word: '해', pronunciation: 'hae', meaning: '太阳', partOfSpeech: '名词', emoji: '☀️', example: '해가 밝게 빛나요.', exampleZh: '太阳明亮地照耀。' },
      { id: 'w7', word: '더워요', pronunciation: 'deowoyo', meaning: '热', partOfSpeech: '形容词', emoji: '🥵', example: '여름이라 너무 더워요.', exampleZh: '因为是夏天所以太热了。' },
      { id: 'w8', word: '추워요', pronunciation: 'chuwoyo', meaning: '冷', partOfSpeech: '形容词', emoji: '🥶', example: '밖에 나가지 마세요, 추워요.', exampleZh: '不要去外面，很冷。' },
      { id: 'w9', word: '따뜻해요', pronunciation: 'ttatteutaeyo', meaning: '暖和', partOfSpeech: '形容词', emoji: '🔥', example: '이 방이 따뜻해요.', exampleZh: '这个房间很暖和。' },
      { id: 'w10', word: '시원해요', pronunciation: 'siwonhaeyo', meaning: '凉爽', partOfSpeech: '形容词', emoji: '🍃', example: '가을 바람이 시원해요.', exampleZh: '秋天的风很凉爽。' },
    ],
  },
  {
    id: 'body', slug: 'body', name: '身体', nameKo: '신체', emoji: '🦵',
    description: '身体部位和健康相关词汇',
    words: [
      { id: 'b1', word: '머리', pronunciation: 'meori', meaning: '头', partOfSpeech: '名词', emoji: '🗣️', example: '머리가 아파요.', exampleZh: '头疼。' },
      { id: 'b2', word: '얼굴', pronunciation: 'eolgul', meaning: '脸', partOfSpeech: '名词', emoji: '😊', example: '얼굴이 예쁘세요.', exampleZh: '您的脸很漂亮。' },
      { id: 'b3', word: '눈', pronunciation: 'nun', meaning: '眼睛', partOfSpeech: '名词', emoji: '👁️', example: '눈이 크고 예뻐요.', exampleZh: '眼睛又大又漂亮。' },
      { id: 'b4', word: '코', pronunciation: 'ko', meaning: '鼻子', partOfSpeech: '名词', emoji: '👃', example: '코가 높아요.', exampleZh: '鼻子很高。' },
      { id: 'b5', word: '입', pronunciation: 'ip', meaning: '嘴', partOfSpeech: '名词', emoji: '👄', example: '입이 마르네요, 물 좀 마실래요.', exampleZh: '口干了，喝点水吧。' },
      { id: 'b6', word: '귀', pronunciation: 'gwi', meaning: '耳朵', partOfSpeech: '名词', emoji: '👂', example: '귀에 음악이 들려요.', exampleZh: '耳朵里传来音乐。' },
      { id: 'b7', word: '손', pronunciation: 'son', meaning: '手', partOfSpeech: '名词', emoji: '✋', example: '손을 씻으세요.', exampleZh: '请洗手。' },
      { id: 'b8', word: '발', pronunciation: 'bal', meaning: '脚', partOfSpeech: '名词', emoji: '🦶', example: '하루 종일 걸어서 발이 아파요.', exampleZh: '走了一整天脚疼。' },
      { id: 'b9', word: '배', pronunciation: 'bae', meaning: '肚子', partOfSpeech: '名词', emoji: '🤰', example: '배가 고파요.', exampleZh: '肚子饿了。', note: '最常用的表达饿的说法' },
      { id: 'b10', word: '목', pronunciation: 'mok', meaning: '脖子/喉咙', partOfSpeech: '名词', emoji: '🦒', example: '목이 아파서 말하기 힘들어요.', exampleZh: '喉咙疼所以说话很困难。' },
    ],
  },
  {
    id: 'transport', slug: 'transport', name: '交通', nameKo: '교통', emoji: '🚗',
    description: '交通工具和出行相关词汇',
    words: [
      { id: 'tr1', word: '버스', pronunciation: 'beoseu', meaning: '公交车', partOfSpeech: '名词', emoji: '🚌', example: '버스 정류장이 어디예요?', exampleZh: '公交站在哪里？', note: '外来词 bus' },
      { id: 'tr2', word: '지하철', pronunciation: 'jihacheol', meaning: '地铁', partOfSpeech: '名词', emoji: '🚇', example: '지하철 타고 출근해요.', exampleZh: '坐地铁上班。' },
      { id: 'tr3', word: '택시', pronunciation: 'taeksi', meaning: '出租车', partOfSpeech: '名词', emoji: '🚕', example: '택시 불러 주세요.', exampleZh: '请帮我叫辆出租车。' },
      { id: 'tr4', word: '기차', pronunciation: 'gicha', meaning: '火车', partOfSpeech: '名词', emoji: '🚆', example: 'KTX 기차 타고 부산에 가요.', exampleZh: '坐KTX火车去釜山。' },
      { id: 'tr5', word: '비행기', pronunciation: 'bihaenggi', meaning: '飞机', partOfSpeech: '名词', emoji: '✈️', example: '비행기 표 예약했어요.', exampleZh: '预订了机票。' },
      { id: 'tr6', word: '자전거', pronunciation: 'jajeongeo', meaning: '自行车', partOfSpeech: '名词', emoji: '🚲', example: '자전거 타고 한강에 갔어요.', exampleZh: '骑自行车去了汉江。' },
      { id: 'tr7', word: '걷다', pronunciation: 'geotda', meaning: '走路', partOfSpeech: '动词', emoji: '🚶', example: '학교까지 걸어서 10분 걸려요.', exampleZh: '走到学校要十分钟。' },
      { id: 'tr8', word: '자동차', pronunciation: 'jadongcha', meaning: '汽车', partOfSpeech: '名词', emoji: '🚙', example: '자동차 면허증 있어요.', exampleZh: '有汽车驾驶证。' },
      { id: 'tr9', word: '신호등', pronunciation: 'sinhodeung', meaning: '红绿灯', partOfSpeech: '名词', emoji: '🚦', example: '신호등이 빨간색이에요.', exampleZh: '红绿灯是红色的。' },
      { id: 'tr10', word: '길', pronunciation: 'gil', meaning: '路', partOfSpeech: '名词', emoji: '🛣️', example: '이 길로 쭉 가세요.', exampleZh: '请沿着这条路一直走。' },
    ],
  },
];
