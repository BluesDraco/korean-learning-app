// Typing practice levels — from jamo keys to full sentences
export interface TypingText {
  id: string;
  text: string;
  label: string;
}

export interface TypingLevel {
  id: number;
  name: string;
  description: string;
  texts: TypingText[];
}

export const typingLevels: TypingLevel[] = [
  {
    id: 1,
    name: '键位入门',
    description: '熟悉每个韩文字母对应的键盘位置',
    texts: [
      { id: 'l1-1', text: 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ', label: '上排辅音+元音' },
      { id: 'l1-2', text: 'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ', label: '中排辅音+元音' },
      { id: 'l1-3', text: 'ㅋㅌㅊㅍㅠㅜㅡ', label: '下排辅音+元音' },
      { id: 'l1-4', text: 'ㅃㅉㄸㄲㅆㅒㅖ', label: 'Shift 组合键' },
      { id: 'l1-5', text: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ', label: '全部辅音' },
      { id: 'l1-6', text: 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖ', label: '全部元音' },
    ],
  },
  {
    id: 2,
    name: '音节组合',
    description: '练习最常见的韩文音节，建立肌肉记忆',
    texts: [
      { id: 'l2-1', text: '가나다라마바사아자차카타파하', label: '가나다 系列' },
      { id: 'l2-2', text: '거너더러머버서어저처커터퍼허', label: 'ㅓ 系列' },
      { id: 'l2-3', text: '고노도로모보소오조초코토포호', label: 'ㅗ 系列' },
      { id: 'l2-4', text: '구누두루무부수우주추쿠투푸후', label: 'ㅜ 系列' },
      { id: 'l2-5', text: '기니디리미비시이지치키티피히', label: 'ㅣ 系列' },
      { id: 'l2-6', text: '는은를을가이들이에고다요', label: '高频语法音节' },
      { id: 'l2-7', text: '안녕하세요감사합니다반갑습니다', label: '常用问候语拆解' },
    ],
  },
  {
    id: 3,
    name: '常用单词',
    description: '打你最常用的词汇，开始有意义的输入',
    texts: [
      { id: 'l3-1', text: '사랑 친구 가족 학교 회사 한국', label: '生活基础词' },
      { id: 'l3-2', text: '공부하다 배우다 먹다 가다 오다 보다', label: '常用动词' },
      { id: 'l3-3', text: '예쁘다 맛있다 재미있다 좋다 크다 작다', label: '常用形容词' },
      { id: 'l3-4', text: '오늘 내일 어제 지금 아침 점심 저녁', label: '时间词' },
      { id: 'l3-5', text: '여기 거기 저기 어디 무엇 왜 어떻게', label: '疑问词+代词' },
      { id: 'l3-6', text: '진짜 정말 대박 헐 아이고 화이팅', label: '韩剧高频词' },
    ],
  },
  {
    id: 4,
    name: '完整句子',
    description: 'TOPIK 写作常见句型，训练流畅输入',
    texts: [
      { id: 'l4-1', text: '안녕하세요? 저는 한국어를 공부하고 있습니다.', label: '自我介绍' },
      { id: 'l4-2', text: '한국 드라마를 보면서 한국어를 배우고 있어요.', label: '学习动机' },
      { id: 'l4-3', text: '한국에 가 본 적이 없지만 언젠가 꼭 가 보고 싶어요.', label: '愿望表达' },
      { id: 'l4-4', text: '한국어는 배우면 배울수록 재미있는 것 같아요.', label: '学习感受' },
      { id: 'l4-5', text: '저는 일 년 후에 한국에 유학을 가려고 계획하고 있습니다.', label: '留学计划' },
      { id: 'l4-6', text: '한국 음식 중에서 떡볶이를 제일 좋아합니다.', label: '韩国饮食' },
      { id: 'l4-7', text: '요즘 한국어 말하기 대회를 준비하고 있어요.', label: '近期活动' },
      { id: 'l4-8', text: '한국어를 잘 하게 되면 한국 회사에서 일하고 싶습니다.', label: '职业目标' },
    ],
  },
  {
    id: 5,
    name: '限时写作',
    description: '模拟 TOPIK 机考写作，限时完成短文',
    texts: [
      {
        id: 'l5-1',
        text: '저는 한국어를 배운 지 6개월이 되었습니다. 처음에는 한글을 읽는 것조차 어려웠지만, 지금은 간단한 대화를 할 수 있게 되었습니다. 앞으로 더 열심히 공부해서 한국인 친구와 자유롭게 이야기하고 싶습니다.',
        label: '学习经历 (TOPIK 初级)',
      },
      {
        id: 'l5-2',
        text: '제 고향은 중국의 작은 도시입니다. 그곳에는 아름다운 산과 강이 있습니다. 봄에는 벚꽃이 피고, 가을에는 단풍이 듭니다. 저는 고향의 사계절을 모두 좋아합니다.',
        label: '介绍故乡 (TOPIK 初级)',
      },
      {
        id: 'l5-3',
        text: '요즘 젊은이들 사이에서 환경 보호에 대한 관심이 높아지고 있습니다. 일회용품 사용을 줄이고, 대중교통을 이용하는 등 작은 실천을 통해 환경을 지키려는 노력이 필요합니다.',
        label: '社会话题 (TOPIK 中级)',
      },
    ],
  },
];
