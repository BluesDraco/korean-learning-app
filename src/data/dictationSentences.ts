export interface DictationSentence {
  id: string;
  korean: string;
  chinese: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tag?: string;
}

export const dictationSentences: DictationSentence[] = [
  // ── Beginner ──
  { id: 'ds01', korean: '안녕하세요? 저는 한국어를 공부하고 있습니다.', chinese: '你好？我正在学习韩国语。', level: 'beginner', tag: '自我介绍' },
  { id: 'ds02', korean: '오늘 날씨가 정말 좋아요.', chinese: '今天天气真好。', level: 'beginner', tag: '日常' },
  { id: 'ds03', korean: '이거 얼마예요?', chinese: '这个多少钱？', level: 'beginner', tag: '购物' },
  { id: 'ds04', korean: '커피 한 잔 주세요.', chinese: '请给我一杯咖啡。', level: 'beginner', tag: '点餐' },
  { id: 'ds05', korean: '저는 학생이에요.', chinese: '我是学生。', level: 'beginner', tag: '自我介绍' },
  { id: 'ds06', korean: '한국 음식을 좋아해요.', chinese: '我喜欢韩国菜。', level: 'beginner', tag: '饮食' },
  { id: 'ds07', korean: '여기가 어디예요?', chinese: '这是哪里？', level: 'beginner', tag: '问路' },
  { id: 'ds08', korean: '사진 찍어도 돼요?', chinese: '可以拍照吗？', level: 'beginner', tag: '日常' },
  { id: 'ds09', korean: '오늘 뭐 해요?', chinese: '今天做什么？', level: 'beginner', tag: '日常' },
  { id: 'ds10', korean: '배가 고파요. 밥 먹으러 가요.', chinese: '肚子饿了。去吃饭吧。', level: 'beginner', tag: '饮食' },

  // ── Intermediate ──
  { id: 'ds11', korean: '한국 드라마를 보면서 한국어를 배우고 있어요.', chinese: '我一边看韩剧一边学韩语。', level: 'intermediate', tag: '学习' },
  { id: 'ds12', korean: '한국에 가 본 적이 없지만 언젠가 꼭 가 보고 싶어요.', chinese: '虽然没去过韩国，但总有一天一定要去看看。', level: 'intermediate', tag: '愿望' },
  { id: 'ds13', korean: '한국어는 배우면 배울수록 재미있는 것 같아요.', chinese: '韩语越学越觉得有趣。', level: 'intermediate', tag: '学习' },
  { id: 'ds14', korean: '길을 잃어버렸어요. 도와주실 수 있나요?', chinese: '我迷路了。可以帮帮我吗？', level: 'intermediate', tag: '求助' },
  { id: 'ds15', korean: '이 근처에 맛있는 식당이 있나요?', chinese: '这附近有好吃的餐厅吗？', level: 'intermediate', tag: '饮食' },
  { id: 'ds16', korean: '내일 몇 시에 만날까요?', chinese: '明天几点见？', level: 'intermediate', tag: '约会' },
  { id: 'ds17', korean: '이 옷이 저한테 어울릴까요?', chinese: '这件衣服适合我吗？', level: 'intermediate', tag: '购物' },
  { id: 'ds18', korean: '한국 음식 중에서 떡볶이를 제일 좋아합니다.', chinese: '韩国菜中我最喜欢炒年糕。', level: 'intermediate', tag: '饮食' },
  { id: 'ds19', korean: '일주일에 두 번 정도 한국어 수업을 들어요.', chinese: '一周上两次左右的韩语课。', level: 'intermediate', tag: '学习' },
  { id: 'ds20', korean: '친구랑 같이 영화를 보러 갈 거예요.', chinese: '打算和朋友一起去看电影。', level: 'intermediate', tag: '日常' },

  // ── Advanced ──
  { id: 'ds21', korean: '요즘 젊은이들 사이에서 환경 보호에 대한 관심이 높아지고 있습니다.', chinese: '最近年轻人对环保的关注越来越高。', level: 'advanced', tag: '社会' },
  { id: 'ds22', korean: '경험을 통해 많은 것을 배울 수 있다고 생각합니다.', chinese: '我认为通过经验可以学到很多东西。', level: 'advanced', tag: '观点' },
  { id: 'ds23', korean: '앞으로 더 열심히 공부해서 한국 회사에서 일하고 싶습니다.', chinese: '以后想更努力学习，在韩国公司工作。', level: 'advanced', tag: '目标' },
  { id: 'ds24', korean: '현대 사회에서 소통의 중요성은 점점 더 커지고 있어요.', chinese: '在现代社会中，沟通的重要性越来越大了。', level: 'advanced', tag: '社会' },
  { id: 'ds25', korean: '모든 사람이 평등하게 존중받을 권리가 있습니다.', chinese: '每个人都有被平等尊重的权利。', level: 'advanced', tag: '社会' },
  { id: 'ds26', korean: '성공하기 위해서는 꾸준한 노력이 필요합니다.', chinese: '为了成功，需要持续的努力。', level: 'advanced', tag: '励志' },
  { id: 'ds27', korean: '서로 다른 문화를 이해하는 것이 중요하다고 생각해요.', chinese: '我认为理解彼此不同的文化很重要。', level: 'advanced', tag: '观点' },
  { id: 'ds28', korean: '기술의 발전이 우리 생활을 크게 변화시켰습니다.', chinese: '技术的发展极大地改变了我们的生活。', level: 'advanced', tag: '科技' },
];
