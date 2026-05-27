export interface ArticleSentence {
  ko: string;
  zh: string;
  pronunciation: string;
  vocab: { word: string; meaning: string }[];
  grammar?: string;
}

export interface Article {
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  description: string;
  fullText: string;
  fullTextZh: string;
  sentences: ArticleSentence[];
}

export const articles: Article[] = [
  // ── 1. 我的一天 (Beginner) ──
  {
    id: 'my-day',
    title: '我的一天',
    titleKo: '나의 하루',
    emoji: '☀️',
    level: 'beginner',
    category: '日常',
    description: '从起床到睡觉，一个韩国大学生的日常一天',
    fullText: '아침 7시에 일어나요. 세수하고 이를 닦아요. 아침으로 토스트와 우유를 먹어요. 8시 반에 지하철을 타고 학교에 가요. 지하철은 사람이 정말 많아요. 그래서 항상 음악을 들으면서 가요. 오전에는 한국어 수업을 들어요. 수업이 끝나면 도서관에 가요. 점심은 친구들과 같이 학교 식당에서 먹어요. 요즘은 비빔밥을 자주 먹어요. 오후에는 도서관에서 공부를 열심히 해요. 가끔은 카페에 가서 공부하기도 해요. 저녁에는 집에 돌아와서 쉬어요. 샤워하고 핸드폰을 봐요. 자기 전에 책을 읽어요. 보통 11시쯤에 잠을 자요. 내일은 더 좋은 하루가 될 거예요!',
    fullTextZh: '早上7点起床。洗脸刷牙。早餐吃吐司和牛奶。8点半坐地铁去学校。地铁上人真的特别多，所以总是边听音乐边赶路。上午上韩语课，下课后去图书馆。午饭和朋友们一起在学校食堂吃，最近经常吃拌饭。下午在图书馆努力学习，有时也去咖啡厅学习。晚上回到家休息，洗完澡看看手机。睡前读一会儿书，通常11点左右睡觉。明天会是更好的一天！',
    sentences: [
      { ko: '아침 7시에 일어나요.', zh: '早上7点起床。', pronunciation: 'a-chim il-gop-si-e i-reo-na-yo', vocab: [{ word: '아침', meaning: '早上' }, { word: '일어나다', meaning: '起床' }], grammar: '~에: 时间助词，表示动作发生的时间点' },
      { ko: '세수하고 이를 닦아요.', zh: '洗脸刷牙。', pronunciation: 'se-su-ha-go i-reul dakk-a-yo', vocab: [{ word: '세수하다', meaning: '洗脸' }, { word: '이를 닦다', meaning: '刷牙' }], grammar: '~고: 连接词尾，表示动作的顺序"做了A然后做B"' },
      { ko: '아침으로 토스트와 우유를 먹어요.', zh: '早餐吃吐司和牛奶。', pronunciation: 'a-chim-eu-ro to-seu-teu-wa u-yu-reul meo-geo-yo', vocab: [{ word: '토스트', meaning: '吐司' }, { word: '우유', meaning: '牛奶' }], grammar: '~(으)로: 助词，表示"作为…"或"用…"' },
      { ko: '8시 반에 지하철을 타고 학교에 가요.', zh: '8点半坐地铁去学校。', pronunciation: 'yeo-deol-si ba-ne ji-ha-cheo-reul ta-go hak-gyo-e ga-yo', vocab: [{ word: '지하철', meaning: '地铁' }, { word: '타다', meaning: '乘坐' }], grammar: '~을/를 타다: "乘坐~"，宾语+目的助词的搭配' },
      { ko: '지하철은 사람이 정말 많아요.', zh: '地铁上人真的很多。', pronunciation: 'ji-ha-cheo-reun sa-ra-mi jeong-mal ma-na-yo', vocab: [{ word: '정말', meaning: '真的' }, { word: '많다', meaning: '多' }], grammar: '~은/는: 主题助词，标记句子的主题或对比' },
      { ko: '그래서 항상 음악을 들으면서 가요.', zh: '所以总是边听音乐边走。', pronunciation: 'geu-rae-seo hang-sang eu-ma-geul deu-reu-myeon-seo ga-yo', vocab: [{ word: '항상', meaning: '总是' }, { word: '음악', meaning: '音乐' }, { word: '듣다', meaning: '听' }], grammar: '~(으)면서: 表示"一边…一边…"两个动作同时进行' },
      { ko: '오전에는 한국어 수업을 들어요.', zh: '上午上韩语课。', pronunciation: 'o-jeo-ne-neun han-gu-geo su-eo-beul deu-reo-yo', vocab: [{ word: '오전', meaning: '上午' }, { word: '한국어', meaning: '韩语' }, { word: '수업', meaning: '课程' }], grammar: '~에는: 时间+主题助词，强调在该时间段' },
      { ko: '수업이 끝나면 도서관에 가요.', zh: '下课后去图书馆。', pronunciation: 'su-eo-bi kkeun-na-myeon do-seo-gwa-ne ga-yo', vocab: [{ word: '끝나다', meaning: '结束' }, { word: '도서관', meaning: '图书馆' }], grammar: '~(으)면: 条件连接词尾"如果…就…"' },
      { ko: '점심은 친구들과 같이 학교 식당에서 먹어요.', zh: '午饭和朋友们一起在学校食堂吃。', pronunciation: 'jeom-si-meun chin-gu-deul-gwa ga-chi hak-gyo sik-dang-e-seo meo-geo-yo', vocab: [{ word: '식당', meaning: '食堂' }, { word: '같이', meaning: '一起' }], grammar: '~와/과: 表示"和…一起"，~에서: 场所助词"在…"' },
      { ko: '요즘은 비빔밥을 자주 먹어요.', zh: '最近经常吃拌饭。', pronunciation: 'yo-jeu-meun bi-bim-ba-beul ja-ju meo-geo-yo', vocab: [{ word: '요즘', meaning: '最近' }, { word: '비빔밥', meaning: '拌饭' }, { word: '자주', meaning: '经常' }], grammar: '~은/는 (主题): "最近的话" 表示话题转换' },
      { ko: '오후에는 도서관에서 공부를 열심히 해요.', zh: '下午在图书馆努力学习。', pronunciation: 'o-hu-e-neun do-seo-gwa-ne-seo gong-bu-reul yeol-ssi-mi hae-yo', vocab: [{ word: '오후', meaning: '下午' }, { word: '열심히', meaning: '努力地' }], grammar: '~에서: 表示动作发生的场所' },
      { ko: '가끔은 카페에 가서 공부하기도 해요.', zh: '有时也去咖啡厅学习。', pronunciation: 'ga-kkeu-meun ka-pe-e ga-seo gong-bu-ha-gi-do hae-yo', vocab: [{ word: '가끔', meaning: '有时' }, { word: '카페', meaning: '咖啡厅' }], grammar: '~기도 하다: 表示"有时也做某事"' },
      { ko: '저녁에는 집에 돌아와서 쉬어요.', zh: '晚上回家休息。', pronunciation: 'jeo-nyeo-ge-neun ji-be do-ra-wa-seo swi-eo-yo', vocab: [{ word: '돌아오다', meaning: '回来' }, { word: '쉬다', meaning: '休息' }], grammar: '~아/어서: 表示先后顺序"做了A然后B"' },
      { ko: '샤워하고 핸드폰을 봐요.', zh: '洗完澡看手机。', pronunciation: 'sya-weo-ha-go haen-deu-po-neul bwa-yo', vocab: [{ word: '샤워하다', meaning: '洗澡' }, { word: '핸드폰', meaning: '手机' }], grammar: '~하고: 口语化的连接词尾，同~고' },
      { ko: '자기 전에 책을 읽어요.', zh: '睡前读书。', pronunciation: 'ja-gi jeo-ne chae-geul il-geo-yo', vocab: [{ word: '자다', meaning: '睡觉' }, { word: '전에', meaning: '之前' }], grammar: '~기 전에: 表示"在做某事之前"' },
      { ko: '보통 11시쯤에 잠을 자요.', zh: '通常11点左右睡觉。', pronunciation: 'bo-tong yeol-han-si-jjeu-me ja-meul ja-yo', vocab: [{ word: '보통', meaning: '通常' }, { word: '쯤', meaning: '左右' }], grammar: '~쯤: 表示"大约、左右"' },
      { ko: '내일은 더 좋은 하루가 될 거예요!', zh: '明天会是更好的一天！', pronunciation: 'nae-i-reun deo jo-eun ha-ru-ga dwel geo-ye-yo', vocab: [{ word: '내일', meaning: '明天' }, { word: '좋다', meaning: '好' }, { word: '되다', meaning: '成为' }], grammar: '~ㄹ/을 거예요: 将来时态"会、将要"' },
    ],
  },

  // ── 2. 我的家人 (Beginner) ──
  {
    id: 'my-family',
    title: '我的家人',
    titleKo: '우리 가족',
    emoji: '👨‍👩‍👧‍👦',
    level: 'beginner',
    category: '家庭',
    description: '介绍家庭成员的职业、性格和周末日常',
    fullText: '우리 가족은 모두 4명이에요. 아버지, 어머니, 여동생 그리고 저예요. 아버지는 회사원이에요. 매일 아침 일찍 출근하세요. 주말에는 집에서 쉬는 걸 좋아해요. 어머니는 요리를 정말 잘하세요. 특히 김치찌개를 제일 맛있게 만드세요. 어머니는 따뜻하고 친절한 분이에요. 여동생은 저보다 두 살 어려요. 지금은 고등학생이에요. 여동생은 그림 그리는 걸 아주 좋아해요. 가끔은 여동생이랑 싸우기도 하지만 금방 화해해요. 주말에는 가족이 함께 저녁을 먹어요. 식사하면서 재미있는 이야기를 많이 나눠요. 우리 가족은 정말 행복해요. 서로 사랑하는 마음이 가장 중요하니까요.',
    fullTextZh: '我家一共有四口人：爸爸、妈妈、妹妹和我。爸爸是公司职员，每天早上很早去上班，周末喜欢在家休息。妈妈做饭特别好吃，尤其泡菜汤做得最美味，是个既温暖又亲切的人。妹妹比我小两岁，现在是高中生，特别喜欢画画。偶尔也会和妹妹吵架，但很快就和好了。周末全家人会一起吃晚饭，边吃边分享有趣的故事。我们家真的很幸福，因为互相爱护的心最重要。',
    sentences: [
      { ko: '우리 가족은 모두 4명이에요.', zh: '我家一共有4口人。', pronunciation: 'u-ri ga-jo-geun mo-du ne-myeong-i-e-yo', vocab: [{ word: '가족', meaning: '家庭' }, { word: '모두', meaning: '全部、一共' }], grammar: '~이에요/예요: "是"的敬语终结词尾' },
      { ko: '아버지, 어머니, 여동생 그리고 저예요.', zh: '爸爸、妈妈、妹妹和我。', pronunciation: 'a-beo-ji, eo-meo-ni, yeo-dong-saeng geu-ri-go jeo-ye-yo', vocab: [{ word: '아버지', meaning: '爸爸' }, { word: '어머니', meaning: '妈妈' }, { word: '여동생', meaning: '妹妹' }], grammar: '그리고: 连接副词"还有、以及"' },
      { ko: '아버지는 회사원이에요. 매일 아침 일찍 출근하세요.', zh: '爸爸是公司职员。每天早上很早去上班。', pronunciation: 'a-beo-ji-neun hwe-sa-wo-ni-e-yo. mae-il a-chim il-jjik chul-geun-ha-se-yo', vocab: [{ word: '회사원', meaning: '公司职员' }, { word: '일찍', meaning: '早早地' }, { word: '출근하다', meaning: '上班' }], grammar: '~(으)세요: 敬语命令/陈述式，用于长辈' },
      { ko: '주말에는 집에서 쉬는 걸 좋아해요.', zh: '周末喜欢在家休息。', pronunciation: 'ju-ma-re-neun ji-be-seo swi-neun geol jo-a-hae-yo', vocab: [{ word: '주말', meaning: '周末' }, { word: '쉬다', meaning: '休息' }], grammar: '~는 걸 좋아하다: "喜欢做某事"的常用表达' },
      { ko: '어머니는 요리를 정말 잘하세요. 특히 김치찌개를 제일 맛있게 만드세요.', zh: '妈妈做饭特别好吃。尤其大酱汤做得最美味。', pronunciation: 'eo-meo-ni-neun yo-ri-reul jeong-mal jal-ha-se-yo. teu-ki gim-chi-jji-gae-reul je-il ma-sit-ge man-deu-se-yo', vocab: [{ word: '특히', meaning: '尤其' }, { word: '김치찌개', meaning: '泡菜汤' }, { word: '맛있다', meaning: '好吃' }], grammar: '~게: 副词化词尾，形容词+게→"…地"' },
      { ko: '어머니는 따뜻하고 친절한 분이에요.', zh: '妈妈是温暖又亲切的人。', pronunciation: 'eo-meo-ni-neun tta-tteu-ta-go chin-jeo-ran bu-ni-e-yo', vocab: [{ word: '따뜻하다', meaning: '温暖的' }, { word: '친절하다', meaning: '亲切的' }], grammar: '~하고: 连接两个形容词"又…又…"' },
      { ko: '여동생은 저보다 두 살 어려요. 지금은 고등학생이에요.', zh: '妹妹比我小两岁。现在是高中生。', pronunciation: 'yeo-dong-saeng-eun jeo-bo-da du sal eo-ryeo-yo. ji-geu-meun go-deung-hak-ssaeng-i-e-yo', vocab: [{ word: '~보다', meaning: '比~' }, { word: '어리다', meaning: '年纪小' }, { word: '고등학생', meaning: '高中生' }], grammar: '~보다: 比较助词"比…"' },
      { ko: '여동생은 그림 그리는 걸 아주 좋아해요.', zh: '妹妹非常喜欢画画。', pronunciation: 'yeo-dong-saeng-eun geu-rim geu-ri-neun geol a-ju jo-a-hae-yo', vocab: [{ word: '그림', meaning: '画' }, { word: '그리다', meaning: '画（动词）' }, { word: '아주', meaning: '非常' }], grammar: '~는 것: 将动词名词化"做…这件事"' },
      { ko: '가끔은 여동생이랑 싸우기도 하지만 금방 화해해요.', zh: '偶尔也会和妹妹吵架，但很快就和好了。', pronunciation: 'ga-kkeu-meun yeo-dong-saeng-i-rang ssa-u-gi-do ha-ji-man geum-bang hwa-hae-hae-yo', vocab: [{ word: '싸우다', meaning: '吵架' }, { word: '금방', meaning: '马上' }, { word: '화해하다', meaning: '和好' }], grammar: '~지만: 转折连接词尾"虽然…但是…"' },
      { ko: '주말에는 가족이 함께 저녁을 먹어요. 식사하면서 재미있는 이야기를 많이 나눠요.', zh: '周末全家人一起吃晚饭。边吃边分享有趣的故事。', pronunciation: 'ju-ma-re-neun ga-jo-gi ham-kke jeo-nyeo-geul meo-geo-yo. sik-ssa-ha-myeon-seo jae-mi-in-neun i-ya-gi-reul ma-ni na-nweo-yo', vocab: [{ word: '함께', meaning: '一起' }, { word: '이야기', meaning: '故事' }, { word: '나누다', meaning: '分享' }], grammar: '~(으)면서: "一边…一边…"' },
      { ko: '우리 가족은 정말 행복해요. 서로 사랑하는 마음이 가장 중요하니까요.', zh: '我们家真的很幸福。因为互相爱护的心最重要。', pronunciation: 'u-ri ga-jo-geun jeong-mal haeng-bo-kae-yo. seo-ro sa-rang-ha-neun ma-eu-mi ga-jang jung-yo-ha-ni-kka-yo', vocab: [{ word: '행복하다', meaning: '幸福' }, { word: '서로', meaning: '互相' }, { word: '사랑하다', meaning: '爱' }, { word: '마음', meaning: '心' }], grammar: '~(으)니까: 原因连接词尾"因为…所以…"' },
    ],
  },

  // ── 3. 首尔旅行 (Intermediate) ──
  {
    id: 'seoul-travel',
    title: '首尔旅行指南',
    titleKo: '서울 여행 가이드',
    emoji: '✈️',
    level: 'intermediate',
    category: '旅行',
    description: '三天两夜首尔自由行，景点、美食、交通全攻略',
    fullText: '서울은 한국의 수도이자 가장 큰 도시예요. 전통과 현대가 공존하는 매력적인 곳이에요. 저는 지난 주말에 친구와 함께 서울 여행을 다녀왔어요. 첫째 날은 경복궁과 인사동에 갔어요. 경복궁에서 한복을 입고 예쁜 사진을 많이 찍었어요. 인사동에서는 전통 공예품과 재미있는 기념품을 구경했어요. 둘째 날에는 명동과 남산타워에 갔어요. 명동에서 떡볶이와 닭꼬치 같은 길거리 음식을 많이 먹었어요. 남산타워에서는 서울의 아름다운 야경을 봤는데 정말 로맨틱했어요. 셋째 날은 홍대와 연남동을 구경했어요. 홍대에서는 버스킹 공연도 보고 독특한 카페에도 갔어요. 연남동의 예쁜 소품 가게들도 정말 인상적이었어요. 서울 지하철은 정말 편리해서 어디든 쉽게 갈 수 있어요. 이번 여행은 정말 즐거웠어요. 다음에 또 오고 싶어요!',
    fullTextZh: '首尔是韩国的首都，也是最大的城市，是一个传统与现代共存的充满魅力的地方。我上周末和朋友一起去首尔旅行了。第一天去了景福宫和仁寺洞，在景福宫穿了韩服拍了很多美照，在仁寺洞逛了传统工艺品和有趣的纪念品。第二天去了明洞和南山塔，在明洞吃了辣炒年糕和鸡肉串等各种街头美食，在南山塔看了首尔美丽的夜景，真的非常浪漫。第三天逛了弘大和延南洞，在弘大看了街头表演，还去了特色咖啡厅，延南洞那些漂亮的杂货小店也非常令人印象深刻。首尔地铁真的很方便，哪里都容易到达。这次旅行真的很开心，下次还想再来！',
    sentences: [
      { ko: '서울은 한국의 수도이자 가장 큰 도시예요.', zh: '首尔是韩国的首都，也是最大的城市。', pronunciation: 'seo-u-reun han-gu-gui su-do-i-ja ga-jang keun do-si-ye-yo', vocab: [{ word: '수도', meaning: '首都' }, { word: '도시', meaning: '城市' }], grammar: '~이자: "是…同时也是…"，书面连接词' },
      { ko: '전통과 현대가 공존하는 매력적인 곳이에요.', zh: '是一个传统与现代共存的充满魅力的地方。', pronunciation: 'jeon-tong-gwa hyeon-dae-ga gong-jon-ha-neun mae-ryeo-jeo-gin go-si-e-yo', vocab: [{ word: '전통', meaning: '传统' }, { word: '현대', meaning: '现代' }, { word: '공존하다', meaning: '共存' }], grammar: '~는: 定语形现在时，修饰后面的名词"共存的地方"' },
      { ko: '저는 지난 주말에 친구와 함께 서울 여행을 다녀왔어요.', zh: '我上个周末和朋友一起去首尔旅行了。', pronunciation: 'jeo-neun ji-nan ju-ma-re chin-gu-wa ham-kke seo-ul yeo-haeng-eul da-nyeo-wa-sseo-yo', vocab: [{ word: '지난', meaning: '上一个' }, { word: '여행', meaning: '旅行' }, { word: '다녀오다', meaning: '去了一趟回来' }], grammar: '~았/었어요: 过去时"做了…"' },
      { ko: '첫째 날은 경복궁과 인사동에 갔어요.', zh: '第一天去了景福宫和仁寺洞。', pronunciation: 'cheot-jjae na-reun gyeong-bok-ggung-gwa in-sa-dong-e ga-sseo-yo', vocab: [{ word: '첫째', meaning: '第一' }, { word: '경복궁', meaning: '景福宫' }], grammar: '~에 가다: "去…"，场所+에+移动动词' },
      { ko: '경복궁에서 한복을 입고 예쁜 사진을 많이 찍었어요.', zh: '在景福宫穿韩服拍了很多漂亮的照片。', pronunciation: 'gyeong-bok-ggung-e-seo han-bo-geul ip-go ye-ppeun sa-ji-neul ma-ni jji-geo-sseo-yo', vocab: [{ word: '한복', meaning: '韩服' }, { word: '사진을 찍다', meaning: '拍照' }], grammar: '~에서: 场所助词"在…（做某事）"' },
      { ko: '인사동에서는 전통 공예품과 재미있는 기념품을 구경했어요.', zh: '在仁寺洞逛了传统工艺品和有趣的纪念品。', pronunciation: 'in-sa-dong-e-seo-neun jeon-tong gong-ye-pum-gwa jae-mi-in-neun gi-nyeo-pu-meul gu-gyeong-hae-sseo-yo', vocab: [{ word: '공예품', meaning: '工艺品' }, { word: '기념품', meaning: '纪念品' }, { word: '구경하다', meaning: '逛、参观' }], grammar: '~에서는: 场所+主题助词"在…的话"' },
      { ko: '둘째 날에는 명동과 남산타워에 갔어요.', zh: '第二天去了明洞和南山塔。', pronunciation: 'dul-jjae na-re-neun myeong-dong-gwa nam-san-ta-weo-e ga-sseo-yo', vocab: [{ word: '둘째', meaning: '第二' }, { word: '명동', meaning: '明洞' }], grammar: '둘째: 序数词"第二"' },
      { ko: '명동에서 떡볶이와 닭꼬치 같은 길거리 음식을 많이 먹었어요.', zh: '在明洞吃了辣炒年糕和鸡肉串等很多街头美食。', pronunciation: 'myeong-dong-e-seo tteok-bbo-kki-wa dak-kko-chi ga-teun gil-geo-ri eum-si-geul ma-ni meo-geo-sseo-yo', vocab: [{ word: '떡볶이', meaning: '辣炒年糕' }, { word: '닭꼬치', meaning: '鸡肉串' }, { word: '길거리 음식', meaning: '街头小吃' }], grammar: '~ 같은: "像…一样的"，表示列举' },
      { ko: '남산타워에서는 서울의 아름다운 야경을 봤는데 정말 로맨틱했어요.', zh: '在南山塔看了首尔美丽的夜景，真的非常浪漫。', pronunciation: 'nam-san-ta-weo-e-seo-neun seo-u-re a-reum-da-un ya-gyeong-eul bwan-neun-de jeong-mal ro-maen-ti-kae-sseo-yo', vocab: [{ word: '야경', meaning: '夜景' }, { word: '아름답다', meaning: '美丽' }, { word: '로맨틱하다', meaning: '浪漫' }], grammar: '~는데: 提供背景信息"…了，而且…"' },
      { ko: '셋째 날은 홍대와 연남동을 구경했어요. 버스킹 공연도 보고 독특한 카페에도 갔어요.', zh: '第三天逛了弘大和延南洞。看了街头表演，还去了特色咖啡厅。', pronunciation: 'set-jjae na-reun hong-dae-wa yeon-nam-dong-eul gu-gyeong-hae-sseo-yo. beo-seu-king gong-yeon-do bo-go dok-teu-kan ka-pe-e-do ga-sseo-yo', vocab: [{ word: '버스킹', meaning: '街头表演' }, { word: '공연', meaning: '演出' }, { word: '독특하다', meaning: '独特的' }], grammar: '~도: 助词"也"表示追加' },
      { ko: '서울 지하철은 정말 편리해서 어디든 쉽게 갈 수 있어요.', zh: '首尔地铁非常方便，哪里都容易到达。', pronunciation: 'seo-ul ji-ha-cheo-reun jeong-mal pyeon-ri-hae-seo eo-di-deun swip-ge gal su i-sseo-yo', vocab: [{ word: '편리하다', meaning: '方便' }, { word: '어디든', meaning: '不管哪里' }], grammar: '~아/어서: 原因连接"因为…所以…"' },
      { ko: '이번 여행은 정말 즐거웠어요. 다음에 또 오고 싶어요!', zh: '这次旅行真的很开心。下次还想再来！', pronunciation: 'i-beon yeo-haeng-eun jeong-mal jeul-geo-weo-sseo-yo. da-eu-me tto o-go si-peo-yo', vocab: [{ word: '즐겁다', meaning: '开心' }, { word: '다음', meaning: '下次' }, { word: '또', meaning: '再' }], grammar: '~고 싶다: "想做…"表达愿望' },
    ],
  },

  // ── 4. 韩国饮食文化 (Intermediate) ──
  {
    id: 'korean-food',
    title: '韩国饮食文化',
    titleKo: '한국 음식 문화',
    emoji: '🍚',
    level: 'intermediate',
    category: '文化',
    description: '从泡菜到烤肉，了解韩国人的饭桌文化',
    fullText: '한국 음식 하면 가장 먼저 김치가 떠올라요. 김치는 한국인의 식탁에서 절대 빠질 수 없는 음식이에요. 매일 세 끼 식사에 항상 김치가 올라와요. 한국 식사에는 밥과 국, 그리고 여러 가지 반찬이 함께 나와요. 불고기는 외국인들에게 가장 인기 있는 한국 요리예요. 달콤한 양념이 정말 맛있어요. 떡볶이는 매콤달콤한 길거리 음식으로 젊은 사람들에게 특히 인기가 많아요. 비빔밥은 밥에 여러 가지 채소와 고추장을 넣고 비벼 먹는 건강식이에요. 삼겹살은 한국 사람들이 가장 사랑하는 회식 메뉴예요. 상추에 싸서 먹으면 더 맛있어요. 한국에서는 어른보다 먼저 수저를 들면 안 돼요. 어른이 먼저 드신 후에 먹는 것이 예의예요. 이런 식사 예절을 잘 지키는 것이 중요해요. 한국 음식은 맛도 좋고 건강에도 좋아서 세계적으로 인기가 많아지고 있어요.',
    fullTextZh: '提起韩国饮食，首先想到的就是泡菜。泡菜是韩国人餐桌上绝对不能缺少的食物，每天三餐总会有泡菜上桌。韩国餐桌上，米饭、汤和各种小菜会一起端上来。烤肉是最受外国人欢迎的韩国料理，甜美的调味酱真的很好吃。辣炒年糕是甜辣的街头美食，特别受年轻人欢迎。拌饭是在米饭里放入各种蔬菜和辣酱搅拌着吃的健康食品。五花肉是韩国人最爱的聚餐菜单，用生菜包着吃更美味。在韩国，不能在长辈之前先拿起餐具，等长辈先用之后再用餐才是礼仪。遵守这样的用餐礼仪很重要。韩国菜既好吃又健康，所以在全世界越来越受欢迎。',
    sentences: [
      { ko: '한국 음식 하면 가장 먼저 김치가 떠올라요.', zh: '提到韩国饮食，最先想到的是泡菜。', pronunciation: 'han-guk eum-sik ha-myeon ga-jang meon-jeo gim-chi-ga tteo-ol-la-yo', vocab: [{ word: '가장', meaning: '最' }, { word: '먼저', meaning: '首先' }, { word: '떠오르다', meaning: '想起来' }], grammar: '~(으)면: 条件假设"如果…的话"' },
      { ko: '김치는 한국인의 식탁에서 절대 빠질 수 없는 음식이에요.', zh: '泡菜是韩国人餐桌上绝对不能缺少的食物。', pronunciation: 'gim-chi-neun han-gu-gi-ne sik-ta-ge-seo jeol-ttae ppa-jil su eom-neun eum-si-gi-e-yo', vocab: [{ word: '식탁', meaning: '餐桌' }, { word: '절대', meaning: '绝对' }, { word: '빠지다', meaning: '缺少' }], grammar: '~ㄹ/을 수 없다: "不能…/无法…"表示不可能' },
      { ko: '매일 세 끼 식사에 항상 김치가 올라와요.', zh: '每天三餐饭桌上总会有泡菜。', pronunciation: 'mae-il se kki sik-ssa-e hang-sang gim-chi-ga ol-la-wa-yo', vocab: [{ word: '세 끼', meaning: '三餐' }, { word: '올라오다', meaning: '上（桌）' }], grammar: '~에: 时间/场所助词，这里表示"在每餐中"' },
      { ko: '한국 식사에는 밥과 국, 그리고 여러 가지 반찬이 함께 나와요.', zh: '韩国餐桌上饭、汤和各种小菜一起上。', pronunciation: 'han-guk sik-ssa-e-neun bap-gwa guk, geu-ri-go yeo-reo ga-ji ban-cha-ni ham-kke na-wa-yo', vocab: [{ word: '반찬', meaning: '小菜' }, { word: '여러 가지', meaning: '各种各样的' }, { word: '나오다', meaning: '出来、端上' }], grammar: '~(이)랑: 口语"和…一起"' },
      { ko: '불고기는 외국인들에게 가장 인기 있는 한국 요리예요.', zh: '烤肉是最受外国人欢迎的韩国料理。', pronunciation: 'bul-go-gi-neun we-guk-kin-deu-re-ge ga-jang in-gi in-neun han-guk yo-ri-ye-yo', vocab: [{ word: '외국인', meaning: '外国人' }, { word: '인기 있다', meaning: '受欢迎' }], grammar: '~에게: 给予格助词"对…来说"' },
      { ko: '달콤한 양념이 정말 맛있어요.', zh: '甜美的调味酱真的很好吃。', pronunciation: 'dal-kom-han yang-nyeo-mi jeong-mal ma-si-sseo-yo', vocab: [{ word: '달콤하다', meaning: '甜美' }, { word: '양념', meaning: '调味料' }], grammar: '~ㄴ/은: 形容词定语形修饰名词' },
      { ko: '떡볶이는 매콤달콤한 길거리 음식으로 젊은 사람들에게 특히 인기가 많아요.', zh: '辣炒年糕是甜辣的街头美食，特别受年轻人欢迎。', pronunciation: 'tteok-bbo-kki-neun mae-kom-dal-kom-han gil-geo-ri eum-si-geu-ro jeol-meun sa-ram-deu-re-ge teu-ki in-gi-ga ma-na-yo', vocab: [{ word: '매콤달콤하다', meaning: '甜辣的' }, { word: '특히', meaning: '特别' }, { word: '젊은', meaning: '年轻的' }], grammar: '~(으)로: "作为…"表示身份/类别' },
      { ko: '비빔밥은 밥에 여러 가지 채소와 고추장을 넣고 비벼 먹는 건강식이에요.', zh: '拌饭是在米饭里放入各种蔬菜和辣酱搅拌着吃的健康食品。', pronunciation: 'bi-bim-ba-beun ba-be yeo-reo ga-ji chae-so-wa go-chu-jang-eul neo-go bi-byeo meong-neun geon-gang-si-gi-e-yo', vocab: [{ word: '채소', meaning: '蔬菜' }, { word: '고추장', meaning: '辣椒酱' }, { word: '비비다', meaning: '搅拌' }], grammar: '~아/어 먹다: "…着吃"表示吃的方式' },
      { ko: '삼겹살은 한국 사람들이 가장 사랑하는 회식 메뉴예요.', zh: '五花肉是韩国人最爱的聚餐菜单。', pronunciation: 'sam-gyeop-ssa-reun han-guk sa-ram-deu-ri ga-jang sa-rang-ha-neun hwe-sik me-nyu-ye-yo', vocab: [{ word: '삼겹살', meaning: '五花肉' }, { word: '회식', meaning: '聚餐' }, { word: '사랑하다', meaning: '爱' }], grammar: '~하는: 动词定语形现在时' },
      { ko: '상추에 싸서 먹으면 더 맛있어요.', zh: '用生菜包着吃更好吃。', pronunciation: 'sang-chu-e ssa-seo meo-geu-myeon deo ma-si-sseo-yo', vocab: [{ word: '상추', meaning: '生菜' }, { word: '싸다', meaning: '包、裹' }], grammar: '~아/어서: "…了之后"表示方式' },
      { ko: '한국에서는 어른보다 먼저 수저를 들면 안 돼요.', zh: '在韩国，不能在长辈之前先拿餐具。', pronunciation: 'han-gu-ge-seo-neun eo-reun-bo-da meon-jeo su-jeo-reul deul-myeon an dwae-yo', vocab: [{ word: '어른', meaning: '长辈' }, { word: '수저', meaning: '勺筷' }], grammar: '~(으)면 안 되다: "不可以…/不能…"表示禁止' },
      { ko: '어른이 먼저 드신 후에 먹는 것이 예의예요.', zh: '长辈先用之后再用餐是礼仪。', pronunciation: 'eo-reu-ni meon-jeo deu-sin hu-e meong-neun geo-si ye-ui-ye-yo', vocab: [{ word: '드시다', meaning: '吃（敬语）' }, { word: '예의', meaning: '礼仪' }], grammar: '~(으)ㄴ 후에: "在…之后"时间顺序' },
      { ko: '한국 음식은 맛도 좋고 건강에도 좋아서 세계적으로 인기가 많아지고 있어요.', zh: '韩国菜味道好又健康，所以在全世界越来越受欢迎。', pronunciation: 'han-guk eum-si-geun mat-do jo-ko geon-gang-e-do jo-a-seo se-gye-jeo-geu-ro in-gi-ga ma-na-ji-go i-sseo-yo', vocab: [{ word: '건강', meaning: '健康' }, { word: '세계적', meaning: '世界性的' }, { word: '많아지다', meaning: '变多' }], grammar: '~아/어지고 있다: "正在变得越来越…"变化进行时' },
    ],
  },

  // ── 5. 韩国教育 (Advanced) ──
  {
    id: 'korean-education',
    title: '韩国教育制度',
    titleKo: '한국의 교육 제도',
    emoji: '🎓',
    level: 'advanced',
    category: '社会',
    description: '深入了解韩国教育体系，从入学考试到多文化背景学生的故事',
    fullText: '한국의 교육 제도는 초등학교 6년, 중학교 3년, 고등학교 3년, 그리고 대학교로 구성되어 있어요. 한국 학생들은 대학 입시를 위해 아주 열심히 공부해요. 수능이라고 불리는 대학수학능력시험은 매년 11월에 치러져요. 수능은 한국 사회에서 가장 중요한 시험 중 하나예요. 시험 당일에는 많은 사람들이 수험생을 응원하고, 경찰차와 택시까지 수험생을 태워 주기도 해요. 시험 결과에 따라 갈 수 있는 대학교가 달라지기 때문이에요. 그래서 많은 고등학생들은 방과 후에도 학원에 가서 밤늦게까지 공부를 계속해요. 이런 경쟁이 치열하지만, 요즘은 다양한 진로를 선택하는 학생들도 늘고 있어요. 예를 들어 예술이나 체육을 전공하거나 창업을 준비하는 학생들도 많아졌어요. 한편 한국에는 다문화 가정의 학생들도 점점 늘어나고 있어요. 이 학생들을 위한 특별한 한국어 교육 프로그램도 생기고 있어요. 교육의 기회는 누구에게나 평등해야 하니까요.',
    fullTextZh: '韩国的教育制度由小学6年、初中3年、高中3年和大学组成。韩国学生为了大学入学考试非常努力地学习。被称为"修能"的大学修学能力考试每年11月举行，是韩国社会最重要的考试之一。考试当天，很多人为考生加油助威，连警车和出租车都会帮忙送考生，因为根据考试结果，能上的大学会不一样。所以很多高中生放学后还要去补习班，一直学习到深夜。虽然竞争如此激烈，但最近选择多样化出路的学生也在增加，例如选择艺术或体育专业，或者准备创业的学生也变多了。另一方面，韩国的多文化家庭学生也在逐渐增多，针对这些学生的特别韩语教育项目也在出现。毕竟，教育的机会应该对任何人都平等。',
    sentences: [
      { ko: '한국의 교육 제도는 초등학교 6년, 중학교 3년, 고등학교 3년, 그리고 대학교로 구성되어 있어요.', zh: '韩国的教育制度由小学6年、初中3年、高中3年和大学组成。', pronunciation: 'han-gu-gui gyo-yuk je-do-neun cho-deung-hak-gyo yung-nyeon, jung-hak-gyo sam-nyeon, go-deung-hak-gyo sam-nyeon, geu-ri-go dae-hak-gyo-ro gu-seong-dwe-eo i-sseo-yo', vocab: [{ word: '교육 제도', meaning: '教育制度' }, { word: '초등학교', meaning: '小学' }, { word: '구성되다', meaning: '构成' }], grammar: '~로 구성되다: "由…构成"，书面表达' },
      { ko: '한국 학생들은 대학 입시를 위해 아주 열심히 공부해요.', zh: '韩国学生们为了大学入学考试非常努力地学习。', pronunciation: 'han-guk hak-ssaeng-deu-reun dae-hak ip-ssi-reul wi-hae a-ju yeol-ssim-hi gong-bu-hae-yo', vocab: [{ word: '대학', meaning: '大学' }, { word: '입시', meaning: '入学考试' }, { word: '~를 위해', meaning: '为了~' }], grammar: '~를/을 위해: "为了…"表示目的' },
      { ko: '수능이라고 불리는 대학수학능력시험은 매년 11월에 치러져요.', zh: '被称为"修能"的大学修学能力考试每年11月举行。', pronunciation: 'su-neung-i-ra-go bul-li-neun dae-hak su-hak neung-ryeok si-heo-meun mae-nyeon si-bi-rweo-re chi-reo-jyeo-yo', vocab: [{ word: '수능', meaning: '韩国高考' }, { word: '불리다', meaning: '被称为' }, { word: '매년', meaning: '每年' }], grammar: '~(이)라고 불리다: "被称为…"被动表达' },
      { ko: '수능은 한국 사회에서 가장 중요한 시험 중 하나예요.', zh: '修能是韩国社会中最重要的考试之一。', pronunciation: 'su-neung-eun han-guk sa-hwe-e-seo ga-jang jung-yo-han si-heom jung ha-na-ye-yo', vocab: [{ word: '사회', meaning: '社会' }, { word: '중요하다', meaning: '重要' }, { word: '~ 중 하나', meaning: '…之一' }], grammar: '~ 중 하나: "…中之一"常用表达式' },
      { ko: '시험 당일에는 많은 사람들이 수험생을 응원하고, 경찰차와 택시까지 수험생을 태워 주기도 해요.', zh: '考试当天很多人为考生加油，连警车和出租车也会送考生。', pronunciation: 'si-heom dang-i-re-neun ma-neun sa-ram-deu-ri su-heom-ssaeng-eul eung-weo-na-go, gyeong-chal-cha-wa taek-ssi-kka-ji su-heom-ssaeng-eul tae-weo ju-gi-do hae-yo', vocab: [{ word: '당일', meaning: '当天' }, { word: '수험생', meaning: '考生' }, { word: '응원하다', meaning: '支持' }, { word: '태우다', meaning: '载、送' }], grammar: '~까지: "甚至…也/连…都"表示极端情况' },
      { ko: '시험 결과에 따라 갈 수 있는 대학교가 달라지기 때문이에요.', zh: '因为根据考试结果，能上的大学会不一样。', pronunciation: 'si-heom gyeol-gwa-e tta-ra gal su in-neun dae-hak-gyo-ga dal-la-ji-gi ttae-mu-ni-e-yo', vocab: [{ word: '결과', meaning: '结果' }, { word: '달라지다', meaning: '变得不同' }], grammar: '~에 따라: "根据…/按照…"条件依据' },
      { ko: '그래서 많은 고등학생들은 방과 후에도 학원에 가서 밤늦게까지 공부를 계속해요.', zh: '所以很多高中生放学后还去补习班，学习到深夜。', pronunciation: 'geu-rae-seo ma-neun go-deung-hak-ssaeng-deu-reun bang-gwa hu-e-do ha-gweo-ne ga-seo bam-neut-ge-kka-ji gong-bu-reul gye-so-kae-yo', vocab: [{ word: '방과 후', meaning: '放学后' }, { word: '학원', meaning: '补习班' }, { word: '밤늦게', meaning: '深夜' }], grammar: '~까지: "到…为止"时间范围' },
      { ko: '이런 경쟁이 치열하지만, 요즘은 다양한 진로를 선택하는 학생들도 늘고 있어요.', zh: '虽然竞争激烈，但最近选择多样化出路的学生也在增加。', pronunciation: 'i-reon gyeong-jaeng-i chi-yeo-ra-ji-man, yo-jeu-meun da-yang-han jin-ro-reul seon-tae-ka-neun hak-ssaeng-deul-do neul-go i-sseo-yo', vocab: [{ word: '경쟁', meaning: '竞争' }, { word: '치열하다', meaning: '激烈' }, { word: '진로', meaning: '出路' }, { word: '늘다', meaning: '增加' }], grammar: '~지만: "虽然…但…"转折' },
      { ko: '예를 들어 예술이나 체육을 전공하거나 창업을 준비하는 학생들도 많아졌어요.', zh: '例如选择艺术或体育专业，或者准备创业的学生也变多了。', pronunciation: 'ye-reul deu-reo ye-su-ri-na che-yu-geul jeon-gong-ha-geo-na chang-eo-beul jun-bi-ha-neun hak-ssaeng-deul-do ma-na-jyeo-sseo-yo', vocab: [{ word: '예를 들어', meaning: '例如' }, { word: '전공하다', meaning: '专业' }, { word: '창업', meaning: '创业' }], grammar: '~거나: "…或者…"选择连接' },
      { ko: '한편 한국에는 다문화 가정의 학생들도 점점 늘어나고 있어요.', zh: '另一方面，韩国的多文化家庭学生也在逐渐增多。', pronunciation: 'han-pyeon han-gu-ge-neun da-mun-hwa ga-jeo-ngui hak-ssaeng-deul-do jeom-jeom neu-reo-na-go i-sseo-yo', vocab: [{ word: '한편', meaning: '另一方面' }, { word: '다문화', meaning: '多文化' }, { word: '가정', meaning: '家庭' }, { word: '점점', meaning: '逐渐' }], grammar: '~아/어지고 있다: 变化进行时"正在逐渐变得…"' },
      { ko: '이 학생들을 위한 특별한 한국어 교육 프로그램도 생기고 있어요.', zh: '针对这些学生的特别韩语教育项目也在出现。', pronunciation: 'i hak-ssaeng-deu-reul wi-han teuk-byeo-ran han-gu-geo gyo-yuk peu-ro-geu-raem-do saeng-gi-go i-sseo-yo', vocab: [{ word: '특별하다', meaning: '特别的' }, { word: '프로그램', meaning: '项目' }, { word: '생기다', meaning: '产生' }], grammar: '~를/을 위한: "为…的"定语修饰' },
      { ko: '교육의 기회는 누구에게나 평등해야 하니까요.', zh: '因为教育的机会应该对任何人都平等。', pronunciation: 'gyo-yu-gui gi-hwe-neun nu-gu-e-ge-na pyeong-deung-hae-ya ha-ni-kka-yo', vocab: [{ word: '기회', meaning: '机会' }, { word: '평등하다', meaning: '平等' }], grammar: '~아/어야 하다: "应该…/必须…"义务表达' },
    ],
  },
];

export const levelLabel: Record<Article['level'], string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

export const levelColor: Record<Article['level'], string> = {
  beginner: 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]',
  intermediate: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  advanced: 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]',
};
