// Typing practice levels — from jamo keys to full sentences
export interface TypingText {
  [k: string]: unknown;
  id: string;
  text: string;
  label: string;
  chinese?: string;
}

export interface TypingLevel {
  [k: string]: unknown;
  id: number;
  name: string;
  description: string;
  texts: TypingText[];
}

export const typingLevels: TypingLevel[] = [
  {
    id: 1,
    name: '键位入门', nameEn: 'Keyboard Basics',
    description: '熟悉每个韩文字母对应的键盘位置', descriptionEn: 'Get familiar with the keyboard position for each Korean letter.',
    texts: [
      { id: 'l1-1', text: 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ', label: '上排辅音+元音', labelEn: 'Top Row Consonants + Vowels' },
      { id: 'l1-2', text: 'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ', label: '中排辅音+元音', labelEn: 'Middle Row Consonants + Vowels' },
      { id: 'l1-3', text: 'ㅋㅌㅊㅍㅠㅜㅡ', label: '下排辅音+元音', labelEn: 'Bottom Row Consonants + Vowels' },
      { id: 'l1-4', text: 'ㅃㅉㄸㄲㅆㅒㅖ', label: 'Shift 组合键', labelEn: 'Shift Combinations' },
      { id: 'l1-5', text: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ', label: '全部辅音', labelEn: 'All Consonants' },
      { id: 'l1-6', text: 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖ', label: '基础+双元音', labelEn: 'Basic + Diphthongs' },
      { id: 'l1-7', text: 'ㅘㅙㅚㅝㅞㅟㅢ', label: '复合元音 · 键位组合', labelEn: 'Compound Vowels · Key Combinations', chinese: 'ㅗ+ㅏ,ㅗ+ㅐ,ㅗ+ㅣ,ㅜ+ㅓ,ㅜ+ㅔ,ㅜ+ㅣ,ㅡ+ㅣ' },
    ],
  },
  {
    id: 2,
    name: '音节组合', nameEn: 'Syllable Combinations',
    description: '练习最常见的韩文音节，建立肌肉记忆', descriptionEn: 'Practice the most common Korean syllables to build muscle memory.',
    texts: [
      { id: 'l2-1', text: '가나다라마바사아자차카타파하', label: '가나다 系列', labelEn: '가나다 Series' },
      { id: 'l2-2', text: '거너더러머버서어저처커터퍼허', label: 'ㅓ 系列', labelEn: 'ㅓ Series' },
      { id: 'l2-3', text: '고노도로모보소오조초코토포호', label: 'ㅗ 系列', labelEn: 'ㅗ Series' },
      { id: 'l2-4', text: '구누두루무부수우주추쿠투푸후', label: 'ㅜ 系列', labelEn: 'ㅜ Series' },
      { id: 'l2-5', text: '기니디리미비시이지치키티피히', label: 'ㅣ 系列', labelEn: 'ㅣ Series' },
      { id: 'l2-6', text: '는은를을가이들이에고다요', label: '高频语法音节', labelEn: 'High-Frequency Grammar Syllables' },
      { id: 'l2-7', text: '안녕하세요감사합니다반갑습니다', label: '常用问候语拆解', labelEn: 'Breaking Down Common Greetings' },
    ],
  },
  {
    id: 3,
    name: '常用单词', nameEn: 'Common Words',
    description: '打你最常用的词汇，开始有意义的输入', descriptionEn: 'Type your most-used vocabulary and start meaningful input.',
    texts: [
      { id: 'l3-1', text: '사랑 친구 가족 학교 회사 한국', label: '生活基础词', labelEn: 'Basic Life Words', chinese: '爱情 朋友 家人 学校 公司 韩国', chineseEn: 'Love, Friends, Family, School, Company, Korea' },
      { id: 'l3-2', text: '공부하다 배우다 먹다 가다 오다 보다', label: '常用动词', labelEn: 'Common Verbs', chinese: '学习 学 吃 去 来 看', chineseEn: 'Study, Learn, Eat, Go, Come, See' },
      { id: 'l3-3', text: '예쁘다 맛있다 재미있다 좋다 크다 작다', label: '常用形容词', labelEn: 'Common Adjectives', chinese: '漂亮 好吃 有趣 好 大 小', chineseEn: 'Pretty, Delicious, Fun, Good, Big, Small' },
      { id: 'l3-4', text: '오늘 내일 어제 지금 아침 점심 저녁', label: '时间词', labelEn: 'Time Words', chinese: '今天 明天 昨天 现在 早上 中午 晚上', chineseEn: 'Today, Tomorrow, Yesterday, Now, Morning, Noon, Evening' },
      { id: 'l3-5', text: '여기 거기 저기 어디 무엇 왜 어떻게', label: '疑问词+代词', labelEn: 'Question Words + Pronouns', chinese: '这里 那里 那边 哪里 什么 为什么 怎么', chineseEn: 'Here, There, Over There, Where, What, Why, How' },
      { id: 'l3-6', text: '진짜 정말 대박 헐 아이고 화이팅', label: '韩剧高频词', labelEn: 'High-Frequency K-Drama Words', chinese: '真的 真的 太棒了 晕 哎呀 加油', chineseEn: 'Really, Really, Awesome, Dizzy, Oh My, Cheer Up' },
      { id: 'l3-7', text: '카페 편의점 지하철 버스 택시 기차', label: '出行场所', labelEn: 'Places to Go', chinese: '咖啡厅 便利店 地铁 公交车 出租车 火车', chineseEn: 'Cafe, Convenience Store, Subway, Bus, Taxi, Train' },
      { id: 'l3-8', text: '월요일 화요일 수요일 목요일 금요일 토요일 일요일', label: '一周七天', labelEn: 'Seven Days of the Week', chinese: '周一 周二 周三 周四 周五 周六 周日', chineseEn: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday' },
    ],
  },
  {
    id: 4,
    name: '完整句子', nameEn: 'Full Sentences',
    description: 'TOPIK 写作常见句型，训练流畅输入', descriptionEn: 'Common TOPIK writing patterns to practice smooth input.',
    texts: [
      { id: 'l4-1', text: '안녕하세요? 저는 한국어를 공부하고 있습니다.', label: '自我介绍', labelEn: 'Self-introduction', chinese: '你好？我正在学习韩国语。', chineseEn: 'Hello? I am learning Korean.' },
      { id: 'l4-2', text: '한국 드라마를 보면서 한국어를 배우고 있어요.', label: '学习动机', labelEn: 'Learning Motivation', chinese: '我一边看韩剧一边学韩语。', chineseEn: 'I learn Korean while watching K-dramas.' },
      { id: 'l4-3', text: '한국에 가 본 적이 없지만 언젠가 꼭 가 보고 싶어요.', label: '愿望表达', labelEn: 'Expressing Wishes', chinese: '虽然没去过韩国，但总有一天一定要去看看。', chineseEn: 'I\'ve never been to Korea, but I definitely want to go someday.' },
      { id: 'l4-4', text: '한국어는 배우면 배울수록 재미있는 것 같아요.', label: '学习感受', labelEn: 'Learning experience', chinese: '韩语越学越觉得有趣。', chineseEn: 'The more I learn Korean, the more interesting it gets.' },
      { id: 'l4-5', text: '저는 일 년 후에 한국에 유학을 가려고 계획하고 있습니다.', label: '留学计划', labelEn: 'Study Abroad Plans', chinese: '我计划一年后去韩国留学。', chineseEn: 'I plan to study abroad in Korea in a year.' },
      { id: 'l4-6', text: '한국 음식 중에서 떡볶이를 제일 좋아합니다.', label: '韩国饮食', labelEn: 'Korean Food', chinese: '韩国菜中我最喜欢炒年糕。', chineseEn: 'Among Korean dishes, I like tteokbokki the most.' },
      { id: 'l4-7', text: '요즘 한국어 말하기 대회를 준비하고 있어요.', label: '近期活动', labelEn: 'Recent Activities', chinese: '最近我在准备韩语演讲比赛。', chineseEn: 'I\'ve been preparing for a Korean speech contest lately.' },
      { id: 'l4-8', text: '한국어를 잘하게 되면 한국 회사에서 일하고 싶습니다.', label: '职业目标', labelEn: 'Career Goals', chinese: '如果韩语学好了，我想在韩国公司工作。', chineseEn: 'If I get good at Korean, I want to work at a Korean company.' },
      { id: 'l4-9', text: '오늘은 회의가 있어서 야근할 것 같아요.', label: '职场日常', labelEn: 'Workplace Daily Life', chinese: '今天有会议，好像要加班了。', chineseEn: 'There\'s a meeting today, so it looks like I\'ll have to work overtime.' },
      { id: 'l4-10', text: '주말에 시간이 있으면 같이 영화 볼래요?', label: '朋友邀约', labelEn: 'Friend\'s invitation', chinese: '周末有时间的话要不要一起看电影？', chineseEn: 'If you have time this weekend, want to watch a movie together?' },
      { id: 'l4-11', text: '지하철을 타면 더 빠르지만 조금 복잡해요.', label: '出行选择', labelEn: 'Transportation Choices', chinese: '坐地铁虽然更快但有点复杂。', chineseEn: 'The subway is faster, but it\'s a bit complicated.' },
      { id: 'l4-12', text: '이번 방학에는 한국 여행을 가려고 계획하고 있어요.', label: '假期计划', labelEn: 'Holiday Plans', chinese: '这个假期计划去韩国旅行。', chineseEn: 'I\'m planning to travel to Korea this holiday.' },
    ],
  },
  {
    id: 5,
    name: '限时写作', nameEn: 'Timed Writing',
    description: '模拟 TOPIK 机考写作，限时完成短文', descriptionEn: 'Simulate the TOPIK computer-based writing test and complete a short essay within the time limit.',
    texts: [
      {
        id: 'l5-1',
        text: '저는 한국어를 배운 지 6개월이 되었습니다. 처음에는 한글을 읽는 것조차 어려웠지만, 지금은 간단한 대화를 할 수 있게 되었습니다. 앞으로 더 열심히 공부해서 한국인 친구와 자유롭게 이야기하고 싶습니다.',
        label: '学习经历 (TOPIK 初级)', labelEn: 'Learning Experience (TOPIK Beginner)',
        chinese: '我学韩语已经6个月了。一开始连读韩文都很难，但现在可以进行简单的对话了。以后想更加努力学习，和韩国朋友自由地聊天。', chineseEn: 'I\'ve been learning Korean for 6 months. At first, even reading Hangul was hard, but now I can have simple conversations. In the future, I want to study harder and chat freely with Korean friends.',
      },
      {
        id: 'l5-2',
        text: '제 고향은 중국의 작은 도시입니다. 그곳에는 아름다운 산과 강이 있습니다. 봄에는 벚꽃이 피고, 가을에는 단풍이 듭니다. 저는 고향의 사계절을 모두 좋아합니다.',
        label: '介绍故乡 (TOPIK 初级)', labelEn: 'Introducing My Hometown (TOPIK Beginner)',
        chinese: '我的故乡是中国的一个小城市。那里有美丽的山和河流。春天樱花盛开，秋天枫叶变红。我喜欢故乡的四季。', chineseEn: 'My hometown is a small city in China. It has beautiful mountains and rivers. Cherry blossoms bloom in spring, and maple leaves turn red in autumn. I love the four seasons in my hometown.',
      },
      {
        id: 'l5-3',
        text: '한글은 조선 시대 세종대왕이 만든 문자입니다. 세계에서 가장 과학적이고 배우기 쉬운 문자 중 하나로 평가받고 있습니다. 지금은 한국뿐만 아니라 전 세계 많은 사람들이 한글을 배우고 있습니다.',
        label: '文化介绍 (TOPIK 中级)', labelEn: 'Cultural Introduction (TOPIK Intermediate)',
        chinese: '韩文是朝鲜时代世宗大王创制的文字。它被评价为世界上最科学、最易学的文字之一。如今不仅在韩国,全世界很多人都在学习韩文。', chineseEn: 'Hangul was created by King Sejong during the Joseon Dynasty. It is praised as one of the most scientific and easiest writing systems in the world. Today, not only in Korea but also around the world, many people are learning Hangul.',
      },
      {
        id: 'l5-4',
        text: '스마트폰의 발달로 우리 생활이 매우 편리해졌습니다. 언제 어디서나 정보를 얻을 수 있고, 멀리 있는 사람과도 쉽게 연락할 수 있습니다. 하지만 스마트폰에 너무 많은 시간을 쓰지 않도록 주의해야 합니다.',
        label: '现代科技 (TOPIK 中级)', labelEn: 'Modern Technology (TOPIK Intermediate)',
        chinese: '随着智能手机的发展,我们的生活变得非常便利。可以随时随地获取信息,也可以轻松联系远方的人。但也要注意不要在智能手机上花太多时间。', chineseEn: 'With the development of smartphones, our lives have become very convenient. We can get information anytime, anywhere, and easily contact people far away. But we should also be careful not to spend too much time on our smartphones.',
      },
      {
        id: 'l5-5',
        text: '여행은 새로운 곳을 경험하고 다양한 문화를 배울 수 있는 좋은 기회입니다. 저는 여행을 갈 때마다 그 지역의 음식을 꼭 먹어 보고, 현지 사람들과 이야기를 나누려고 노력합니다. 특히 혼자 하는 여행은 자신을 더 잘 알게 되는 소중한 시간이라고 생각합니다.',
        label: '旅行体验 (TOPIK 中级)', labelEn: 'Travel Experience (TOPIK Intermediate)',
        chinese: '旅行是体验新地方和学习多样文化的好机会。我每次旅行一定会尝当地食物并努力和当地人交流。尤其一个人旅行,我认为是更了解自己的宝贵时间。', chineseEn: 'Travel is a great opportunity to experience new places and learn about diverse cultures. Every time I travel, I make sure to try local food and try to communicate with locals. Especially when traveling alone, I think it\'s a valuable time to get to know myself better.',
      },
      {
        id: 'l5-6',
        text: '한국 사람들은 보통 아침에 밥과 국, 그리고 여러 가지 반찬을 먹습니다. 김치는 한국 식탁에서 빠질 수 없는 음식이고, 된장찌개는 많은 사람들이 즐겨 먹는 전통 음식입니다. 요즘에는 건강에 관심이 많아져서 채소 위주의 식사를 하는 사람들도 늘고 있습니다.',
        label: '韩国饮食 (TOPIK 中级)', labelEn: 'Korean Food (TOPIK Intermediate)',
        chinese: '韩国人早上一般吃饭和汤以及各种小菜。泡菜是韩国餐桌上不可缺少的食物,大酱汤是很多人喜爱的传统食物。最近人们对健康的关注增加,吃以蔬菜为主的饮食的人也增多了。', chineseEn: 'Koreans typically eat rice, soup, and various side dishes in the morning. Kimchi is an essential food on the Korean table, and doenjang jjigae (soybean paste stew) is a traditional dish loved by many. Recently, as people\'s interest in health has increased, more people are eating vegetable-based diets.',
      },
      {
        id: 'l5-7',
        text: '한국에는 봄, 여름, 가을, 겨울 사계절이 뚜렷합니다. 봄에는 날씨가 따뜻해지고 꽃이 피기 시작합니다. 여름에는 덥고 비가 많이 옵니다. 가을은 하늘이 맑고 선선해서 여행하기 가장 좋은 계절입니다. 겨울에는 춥고 눈이 와서 스키나 스노보드를 즐기는 사람들이 많습니다.',
        label: '四季天气 (TOPIK 初级)', labelEn: 'Four Seasons Weather (TOPIK Beginner)',
        chinese: '韩国有春夏秋冬分明的四季。春天天气变暖花开始开。夏天热且多雨。秋天天高气爽是最适合旅游的季节。冬天冷下雪,滑雪滑单板的人很多。', chineseEn: 'Korea has four distinct seasons: spring, summer, autumn, and winter. In spring, the weather warms up and flowers begin to bloom. Summer is hot and rainy. Autumn has clear, crisp weather and is the best season for traveling. In winter, it\'s cold and snowy, and many people go skiing and snowboarding.',
      },
      {
        id: 'l5-8',
        text: '건강을 유지하기 위해서는 규칙적인 운동과 균형 잡힌 식사가 중요합니다. 일주일에 세 번 이상, 한 번에 30분씩 걷기만 해도 건강에 큰 도움이 됩니다. 저는 매일 아침 공원에서 조깅을 하고, 저녁에는 스트레칭을 하면서 몸과 마음의 건강을 모두 챙기려고 합니다.',
        label: '健康生活 (TOPIK 中级)', labelEn: 'Healthy Living (TOPIK Intermediate)',
        chinese: '为了维持健康,规律的运动和均衡的饮食很重要。一周三次以上,每次只走30分钟也对健康很有帮助。我每天早上去公园慢跑,晚上做拉伸,努力照顾身体和心灵的健康。', chineseEn: 'To maintain health, regular exercise and a balanced diet are important. Even just walking 30 minutes at a time, three or more times a week, is very helpful for your health. I go jogging in the park every morning and do stretching at night, making an effort to take care of both my physical and mental health.',
      },
    ],
  },
];
