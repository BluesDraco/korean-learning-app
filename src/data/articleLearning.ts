export interface ArticleKeyword {
  korean: string;
  pronunciation: string;
  chinese: string;
}

export interface ArticleQuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface ArticleLearningData {
  keywords: ArticleKeyword[];
  quiz: ArticleQuizQuestion[];
  outputPrompt: string;
  outputExample: string;
}

export const articleLearningMap: Record<string, ArticleLearningData> = {
  // ── 文化 (5) ──
  'convenience-store': {
    keywords: [
      { korean: '편의점', pronunciation: 'pyeo-nui-jeom', chinese: '便利店' },
      { korean: '도시락', pronunciation: 'do-si-rak', chinese: '便当' },
      { korean: '삼각김밥', pronunciation: 'sam-gak-gim-bap', chinese: '三角饭团' },
      { korean: '라면', pronunciation: 'ra-myeon', chinese: '拉面/方便面' },
      { korean: '할인', pronunciation: 'hal-in', chinese: '打折' },
      { korean: '편하다', pronunciation: 'pyeon-ha-da', chinese: '方便' },
      { korean: '24시간', pronunciation: 'i-sip-sa-si-gan', chinese: '24小时' },
      { korean: '시리즈', pronunciation: 'si-ri-jeu', chinese: '系列/品牌' },
    ],
    quiz: [
      {
        question: '韩国的便利店可以做什么？',
        options: ['只能买东西', '可以吃饭、缴费、取快递等', '只能买饮料', '只能取钱'],
        correct: 1,
      },
      {
        question: '韩国便利店最有代表性的饭团是什么形状？',
        options: ['圆形', '方形', '三角形', '椭圆形'],
        correct: 2,
      },
      {
        question: '韩国便利店的韩语叫什么？',
        options: ['마트', '편의점', '가게', '시장'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写一段在便利店买东西的对话（2-3句话）。',
    outputExample: '편의점에 갔어요. 삼각김밥과 라면을 샀어요. 정말 편했어요!',
  },

  'seoul-cafe': {
    keywords: [
      { korean: '카페', pronunciation: 'ka-pe', chinese: '咖啡馆' },
      { korean: '커피', pronunciation: 'keo-pi', chinese: '咖啡' },
      { korean: '아메리카노', pronunciation: 'a-me-ri-ka-no', chinese: '美式咖啡' },
      { korean: '카페라떼', pronunciation: 'ka-pe-ra-tte', chinese: '拿铁' },
      { korean: '디저트', pronunciation: 'di-jeo-teu', chinese: '甜点' },
      { korean: '분위기', pronunciation: 'bun-wi-gi', chinese: '氛围' },
      { korean: '테이크아웃', pronunciation: 'te-i-keu-a-ut', chinese: '外带' },
      { korean: '브런치', pronunciation: 'beu-reon-chi', chinese: '早午餐' },
    ],
    quiz: [
      {
        question: '韩国人平均每天喝几杯咖啡？',
        options: ['1杯', '2.3杯', '3.5杯', '0.5杯'],
        correct: 1,
      },
      {
        question: '韩国咖啡文化兴起的主要原因是？',
        options: ['咖啡便宜', '社交和生活方式', '法律规定', '没有茶'],
        correct: 1,
      },
      {
        question: '"아메리카노"是什么意思？',
        options: ['拿铁', '摩卡', '美式咖啡', '浓缩咖啡'],
        correct: 2,
      },
    ],
    outputPrompt: '用韩语写2句话，描述你在咖啡厅喜欢点什么。',
    outputExample: '저는 아메리카노를 좋아해요. 카페에서 친구를 만나는 걸 좋아해요.',
  },

  'greeting-culture': {
    keywords: [
      { korean: '인사', pronunciation: 'in-sa', chinese: '打招呼/问候' },
      { korean: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', chinese: '您好' },
      { korean: '고개 숙이다', pronunciation: 'go-gae su-gi-da', chinese: '低头/鞠躬' },
      { korean: '존댓말', pronunciation: 'jon-daen-mal', chinese: '敬语' },
      { korean: '반말', pronunciation: 'ban-mal', chinese: '半语/非敬语' },
      { korean: '어른', pronunciation: 'eo-reun', chinese: '长辈' },
      { korean: '처음 뵙겠습니다', pronunciation: 'cheo-eum boep-get-seum-ni-da', chinese: '初次见面' },
      { korean: '잘 부탁드립니다', pronunciation: 'jal bu-tak-deu-rim-ni-da', chinese: '请多多关照' },
    ],
    quiz: [
      {
        question: '对长辈打招呼时，韩国人通常会怎么做？',
        options: ['握手', '鞠躬', '拥抱', '挥手'],
        correct: 1,
      },
      {
        question: '"반말"是什么意思？',
        options: ['敬语', '半语/非敬语', '问候语', '告别语'],
        correct: 1,
      },
      {
        question: '韩国人初次见面时常说什么？',
        options: ['안녕!', '잘 가!', '처음 뵙겠습니다', '고마워!'],
        correct: 2,
      },
    ],
    outputPrompt: '用韩语写2句打招呼的话，一句对朋友，一句对长辈。',
    outputExample: '친구에게: 안녕! 잘 지냈어?\n선생님께: 안녕하세요! 잘 지내셨어요?',
  },

  'korean-holidays': {
    keywords: [
      { korean: '명절', pronunciation: 'myeong-jeol', chinese: '节日' },
      { korean: '설날', pronunciation: 'seol-nal', chinese: '春节' },
      { korean: '추석', pronunciation: 'chu-seok', chinese: '中秋/秋夕' },
      { korean: '송편', pronunciation: 'song-pyeon', chinese: '松饼' },
      { korean: '세뱃돈', pronunciation: 'se-baen-don', chinese: '压岁钱' },
      { korean: '한복', pronunciation: 'han-bok', chinese: '韩服' },
      { korean: '제사', pronunciation: 'je-sa', chinese: '祭祀' },
      { korean: '기념일', pronunciation: 'gi-nyeom-il', chinese: '纪念日' },
    ],
    quiz: [
      {
        question: '韩国最重要的两个传统节日是什么？',
        options: ['圣诞和元旦', '春节和秋夕', '端午和中秋', '万圣节和情人节'],
        correct: 1,
      },
      {
        question: '추석（秋夕）时韩国人吃什么传统食物？',
        options: ['饺子', '年糕汤', '松饼', '月饼'],
        correct: 2,
      },
      {
        question: '韩国春节时，晚辈给长辈行礼后会得到什么？',
        options: ['礼物', '红包/压岁钱', '糖果', '书籍'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，介绍你最喜欢的节日。',
    outputExample: '제가 가장 좋아하는 명절은 설날이에요. 가족과 함께 맛있는 음식을 먹어요.',
  },

  'kdrama-culture': {
    keywords: [
      { korean: '드라마', pronunciation: 'deu-ra-ma', chinese: '电视剧' },
      { korean: '오빠', pronunciation: 'o-ppa', chinese: '哥哥（女性叫）' },
      { korean: '언니', pronunciation: 'eon-ni', chinese: '姐姐（女性叫）' },
      { korean: '누나', pronunciation: 'nu-na', chinese: '姐姐（男性叫）' },
      { korean: '대사', pronunciation: 'dae-sa', chinese: '台词' },
      { korean: '명장면', pronunciation: 'myeong-jang-myeon', chinese: '名场面' },
      { korean: '회식', pronunciation: 'hoe-sik', chinese: '聚餐' },
      { korean: '소맥', pronunciation: 'so-maek', chinese: '烧酒+啤酒' },
    ],
    quiz: [
      {
        question: '韩剧中，女性叫年长男性什么？',
        options: ['형', '오빠', '누나', '언니'],
        correct: 1,
      },
      {
        question: '韩剧中常见的"회식"文化指什么？',
        options: ['开会', '公司聚餐', '约会', '旅行'],
        correct: 1,
      },
      {
        question: '"소맥"是什么？',
        options: ['一种面食', '烧酒和啤酒混合', '泡菜', '甜点'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，描述你最喜欢的韩剧场景。',
    outputExample: '제가 가장 좋아하는 드라마는 "도깨비"예요. 명장면이 정말 많아요.',
  },

  // ── 美食 (5) ──
  'kbbq-guide': {
    keywords: [
      { korean: '고기', pronunciation: 'go-gi', chinese: '肉' },
      { korean: '삼겹살', pronunciation: 'sam-gyeop-sal', chinese: '五花肉' },
      { korean: '불고기', pronunciation: 'bul-go-gi', chinese: '烤肉/炒肉' },
      { korean: '상추', pronunciation: 'sang-chu', chinese: '生菜' },
      { korean: '쌈', pronunciation: 'ssam', chinese: '菜包饭/包肉' },
      { korean: '반찬', pronunciation: 'ban-chan', chinese: '小菜' },
      { korean: '된장찌개', pronunciation: 'doen-jang-jji-gae', chinese: '大酱汤' },
      { korean: '소주', pronunciation: 'so-ju', chinese: '烧酒' },
    ],
    quiz: [
      {
        question: '韩国烤肉最经典的肉类是什么？',
        options: ['牛肉', '五花肉（삼겹살）', '鸡肉', '羊肉'],
        correct: 1,
      },
      {
        question: '吃烤肉时用什么包着吃？',
        options: ['面包', '米饭', '生菜（상추）', '海苔'],
        correct: 2,
      },
      {
        question: '韩国烤肉店通常免费提供的配菜叫什么？',
        options: ['메인 요리', '반찬', '디저트', '음료'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，描述你吃烤肉的经历或喜好。',
    outputExample: '저는 삼겹살을 정말 좋아해요. 친구들과 같이 먹으면 더 맛있어요!',
  },

  'street-food': {
    keywords: [
      { korean: '길거리 음식', pronunciation: 'gil-geo-ri eum-sik', chinese: '街头小吃' },
      { korean: '떡볶이', pronunciation: 'tteok-bok-kki', chinese: '辣炒年糕' },
      { korean: '순대', pronunciation: 'sun-dae', chinese: '米肠' },
      { korean: '어묵', pronunciation: 'eo-muk', chinese: '鱼糕/鱼饼' },
      { korean: '튀김', pronunciation: 'twi-gim', chinese: '油炸食品' },
      { korean: '계란빵', pronunciation: 'gye-ran-ppang', chinese: '鸡蛋面包' },
      { korean: '호떡', pronunciation: 'ho-tteok', chinese: '糖饼' },
      { korean: '명동', pronunciation: 'myeong-dong', chinese: '明洞' },
    ],
    quiz: [
      {
        question: '韩国的"떡볶이"是什么？',
        options: ['炸鸡', '辣炒年糕', '饺子', '面条'],
        correct: 1,
      },
      {
        question: '首尔最有名的街头小吃聚集地是哪里？',
        options: ['江南', '明洞', '弘大', '梨泰院'],
        correct: 1,
      },
      {
        question: '韩国冬天的街头小吃代表是什么？',
        options: ['冰淇淋', '红豆冰', '호떡（糖饼）和 어묵（鱼糕）', '冷面'],
        correct: 2,
      },
    ],
    outputPrompt: '用韩语写2句话，说说你想尝试的韩国街头小吃。',
    outputExample: '저는 떡볶이를 꼭 먹어보고 싶어요. 길거리 음식이 정말 맛있어 보여요!',
  },

  'korean-soup': {
    keywords: [
      { korean: '국', pronunciation: 'guk', chinese: '汤' },
      { korean: '찌개', pronunciation: 'jji-gae', chinese: '炖汤/锅' },
      { korean: '김치찌개', pronunciation: 'gim-chi-jji-gae', chinese: '泡菜汤' },
      { korean: '된장찌개', pronunciation: 'doen-jang-jji-gae', chinese: '大酱汤' },
      { korean: '삼계탕', pronunciation: 'sam-gye-tang', chinese: '参鸡汤' },
      { korean: '해장국', pronunciation: 'hae-jang-guk', chinese: '解酒汤' },
      { korean: '미역국', pronunciation: 'mi-yeok-guk', chinese: '海带汤' },
      { korean: '밥', pronunciation: 'bap', chinese: '饭' },
    ],
    quiz: [
      {
        question: '韩国人过生日时通常会喝什么汤？',
        options: ['泡菜汤', '大酱汤', '海带汤（미역국）', '参鸡汤'],
        correct: 2,
      },
      {
        question: '찌개和국的主要区别是什么？',
        options: ['没有区别', '찌개更咸更浓郁，국更清淡', '찌개是冷的', '국没有汤'],
        correct: 1,
      },
      {
        question: '韩国夏天最滋补的汤是什么？',
        options: ['해장국', '삼계탕（参鸡汤）', '된장찌개', '김치찌개'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，描述你喜欢的汤。',
    outputExample: '저는 김치찌개를 아주 좋아해요. 밥이랑 같이 먹으면 정말 맛있어요.',
  },

  'kdrama-ordering': {
    keywords: [
      { korean: '주문하다', pronunciation: 'ju-mun-ha-da', chinese: '点餐' },
      { korean: '여기요', pronunciation: 'yeo-gi-yo', chinese: '这里/服务员' },
      { korean: '계산하다', pronunciation: 'gye-san-ha-da', chinese: '结账' },
      { korean: '맛있다', pronunciation: 'ma-sit-da', chinese: '好吃' },
      { korean: '매워요', pronunciation: 'mae-wo-yo', chinese: '辣' },
      { korean: '하나 더 주세요', pronunciation: 'ha-na deo ju-se-yo', chinese: '请再给一个' },
      { korean: '치킨', pronunciation: 'chi-kin', chinese: '炸鸡' },
      { korean: '짜장면', pronunciation: 'jja-jang-myeon', chinese: '炸酱面' },
    ],
    quiz: [
      {
        question: '韩剧中常见的炸鸡配什么？',
        options: ['米饭', '啤酒（맥주）', '可乐', '牛奶'],
        correct: 1,
      },
      {
        question: '在韩国餐厅叫服务员时喊什么？',
        options: ['服务员！', '저기요/여기요', '老板！', '喂！'],
        correct: 1,
      },
      {
        question: '韩剧中最常出现的中国料理是什么？',
        options: ['火锅', '짜장면（炸酱面）', '炒饭', '馄饨'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，模拟在韩国餐厅点餐。',
    outputExample: '여기요! 비빔밥 하나 주세요. 그리고 물 좀 주세요.',
  },

  'korean-spicy': {
    keywords: [
      { korean: '맵다', pronunciation: 'maep-da', chinese: '辣' },
      { korean: '매운맛', pronunciation: 'mae-un-mat', chinese: '辣味' },
      { korean: '고추장', pronunciation: 'go-chu-jang', chinese: '辣椒酱' },
      { korean: '고춧가루', pronunciation: 'go-chun-ga-ru', chinese: '辣椒粉' },
      { korean: '불닭', pronunciation: 'bul-dak', chinese: '火鸡/辣鸡' },
      { korean: '떡볶이', pronunciation: 'tteok-bok-kki', chinese: '辣炒年糕' },
      { korean: '매운 라면', pronunciation: 'mae-un ra-myeon', chinese: '辣拉面' },
      { korean: '도전', pronunciation: 'do-jeon', chinese: '挑战' },
    ],
    quiz: [
      {
        question: '韩国料理"辣"的核心调味料是什么？',
        options: ['酱油', '고추장（辣椒酱）', '盐', '醋'],
        correct: 1,
      },
      {
        question: '"불닭"是什么意思？',
        options: ['烤鸡', '火鸡/超辣鸡肉', '炸鸡', '参鸡汤'],
        correct: 1,
      },
      {
        question: '韩国人为什么喜欢吃辣？',
        options: ['因为天气冷', '文化和口味习惯，辣味能解压', '法律规定', '没有其他调料'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，说说你对辣味的感受。',
    outputExample: '저는 매운 음식을 잘 못 먹어요. 하지만 떡볶이는 정말 맛있어요!',
  },

  // ── 旅行 (5) ──
  'seoul-districts': {
    keywords: [
      { korean: '동네', pronunciation: 'dong-ne', chinese: '街区' },
      { korean: '홍대', pronunciation: 'hong-dae', chinese: '弘大' },
      { korean: '강남', pronunciation: 'gang-nam', chinese: '江南' },
      { korean: '명동', pronunciation: 'myeong-dong', chinese: '明洞' },
      { korean: '이태원', pronunciation: 'i-tae-won', chinese: '梨泰院' },
      { korean: '인사동', pronunciation: 'in-sa-dong', chinese: '仁寺洞' },
      { korean: '성수동', pronunciation: 'seong-su-dong', chinese: '圣水洞' },
      { korean: '분위기', pronunciation: 'bun-wi-gi', chinese: '氛围/风格' },
    ],
    quiz: [
      {
        question: '首尔哪个区域以年轻艺术文化著称？',
        options: ['江南', '弘大（홍대）', '汝矣岛', '光化门'],
        correct: 1,
      },
      {
        question: '想买化妆品和逛街，最推荐去哪里？',
        options: ['明洞（명동）', '龙山', '麻浦', '城北'],
        correct: 0,
      },
      {
        question: '首尔哪个区以奢侈品和高端商业著称？',
        options: ['弘大', '梨泰院', '江南（강남）', '新村'],
        correct: 2,
      },
    ],
    outputPrompt: '用韩语写2句话，描述你想去的首尔区域。',
    outputExample: '저는 홍대에 가고 싶어요. 거기에서 버스킹을 보고 싶어요.',
  },

  'seoul-subway': {
    keywords: [
      { korean: '지하철', pronunciation: 'ji-ha-cheol', chinese: '地铁' },
      { korean: '역', pronunciation: 'yeok', chinese: '站' },
      { korean: '환승', pronunciation: 'hwan-seung', chinese: '换乘' },
      { korean: '노선도', pronunciation: 'no-seon-do', chinese: '路线图' },
      { korean: '교통카드', pronunciation: 'gyo-tong-ka-deu', chinese: '交通卡' },
      { korean: '출구', pronunciation: 'chul-gu', chinese: '出口' },
      { korean: '막차', pronunciation: 'mak-cha', chinese: '末班车' },
      { korean: '첫차', pronunciation: 'cheot-cha', chinese: '首班车' },
    ],
    quiz: [
      {
        question: '首尔地铁的韩语叫什么？',
        options: ['버스', '지하철', '택시', '기차'],
        correct: 1,
      },
      {
        question: '换乘的韩语是什么？',
        options: ['출구', '역', '환승', '노선'],
        correct: 2,
      },
      {
        question: '首尔地铁用什么卡最方便？',
        options: ['现金', '信用卡', 'T-money交通卡', '护照'],
        correct: 2,
      },
    ],
    outputPrompt: '用韩语写2句话，描述坐地铁的场景。',
    outputExample: '지하철을 타고 명동에 갔어요. 4호선을 이용했어요.',
  },

  'korea-taboos': {
    keywords: [
      { korean: '금기', pronunciation: 'geum-gi', chinese: '禁忌' },
      { korean: '조심하다', pronunciation: 'jo-sim-ha-da', chinese: '小心' },
      { korean: '예의', pronunciation: 'ye-ui', chinese: '礼貌' },
      { korean: '두 손', pronunciation: 'du son', chinese: '双手' },
      { korean: '신발', pronunciation: 'sin-bal', chinese: '鞋子' },
      { korean: '어른', pronunciation: 'eo-reun', chinese: '长辈' },
      { korean: '술', pronunciation: 'sul', chinese: '酒' },
      { korean: '연장자', pronunciation: 'yeon-jang-ja', chinese: '年长者' },
    ],
    quiz: [
      {
        question: '在韩国，给长辈递东西时应该怎么做？',
        options: ['单手递', '双手递', '扔过去', '用脚递'],
        correct: 1,
      },
      {
        question: '进韩国家庭时，首先应该做什么？',
        options: ['直接进去', '脱鞋', '先吃饭', '打电话'],
        correct: 1,
      },
      {
        question: '在韩国和长辈喝酒时应该怎么做？',
        options: ['直接喝', '侧身转头喝', '站着喝', '一口气喝完'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，说说你在韩国要注意的礼节。',
    outputExample: '한국에서 어른 앞에서 조심해야 해요. 두 손으로 물건을 드려요.',
  },

  'seoul-25-places': {
    keywords: [
      { korean: '명소', pronunciation: 'myeong-so', chinese: '名胜/景点' },
      { korean: '경복궁', pronunciation: 'gyeong-bok-gung', chinese: '景福宫' },
      { korean: '남산타워', pronunciation: 'nam-san-ta-wo', chinese: '南山塔' },
      { korean: '한강', pronunciation: 'han-gang', chinese: '汉江' },
      { korean: '전통', pronunciation: 'jeon-tong', chinese: '传统' },
      { korean: '사진', pronunciation: 'sa-jin', chinese: '照片' },
      { korean: '구경하다', pronunciation: 'gu-gyeong-ha-da', chinese: '游览/观光' },
      { korean: '인기', pronunciation: 'in-gi', chinese: '人气' },
    ],
    quiz: [
      {
        question: '首尔最有代表性的古宫是什么？',
        options: ['昌德宫', '景福宫（경복궁）', '德寿宫', '昌庆宫'],
        correct: 1,
      },
      {
        question: '想看首尔夜景，最推荐去哪里？',
        options: ['明洞', '南山塔（남산타워）', '弘大', '江南'],
        correct: 1,
      },
      {
        question: '首尔市民最喜欢去的休闲场所是哪里？',
        options: ['景福宫', '汉江（한강）公园', '明洞', '仁川机场'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，介绍你想去的首尔景点。',
    outputExample: '경복궁에 꼭 가보고 싶어요. 한복을 입고 사진을 찍을 거예요.',
  },

  'korea-shopping': {
    keywords: [
      { korean: '쇼핑', pronunciation: 'syo-ping', chinese: '购物' },
      { korean: '면세점', pronunciation: 'myeon-se-jeom', chinese: '免税店' },
      { korean: '할인', pronunciation: 'hal-in', chinese: '折扣' },
      { korean: '사이즈', pronunciation: 'sa-i-jeu', chinese: '尺码' },
      { korean: '얼마예요', pronunciation: 'eol-ma-ye-yo', chinese: '多少钱' },
      { korean: '깎아 주세요', pronunciation: 'kka-kka ju-se-yo', chinese: '请便宜点' },
      { korean: '화장품', pronunciation: 'hwa-jang-pum', chinese: '化妆品' },
      { korean: '기념품', pronunciation: 'gi-nyeom-pum', chinese: '纪念品' },
    ],
    quiz: [
      {
        question: '在韩国免税店购物需要出示什么？',
        options: ['身份证', '护照', '信用卡', '机票'],
        correct: 1,
      },
      {
        question: '问"多少钱"用韩语怎么说？',
        options: ['맛있어요?', '얼마예요?', '어디예요?', '뭐예요?'],
        correct: 1,
      },
      {
        question: '韩国最著名的化妆品购物街是？',
        options: ['江南', '明洞（명동）', '弘大', '新村'],
        correct: 1,
      },
    ],
    outputPrompt: '用韩语写2句话，模拟购物时问价格和讲价。',
    outputExample: '이거 얼마예요? 조금 깎아 주세요!',
  },
};

export function getArticleLearning(slug: string): ArticleLearningData | null {
  return articleLearningMap[slug] ?? null;
}
