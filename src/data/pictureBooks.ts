export interface PictureBookPage {
  illustration: string;       // emoji 场景组合（imageUrl 加载失败时的fallback）
  imageUrl?: string;          // 绘本插图路径，如 /images/picture-books/tori-day-01.png
  bgColor: string;            // 页面背景色
  korean: string;
  pronunciation: string;
  chinese: string;
  vocab: { word: string; meaning: string }[];
}

export interface PictureBook {
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  level: 'beginner' | 'intermediate';
  description: string;
  color: string;
  pages: PictureBookPage[];
}

export const pictureBooks: PictureBook[] = [
  {
    id: 'tori-day',
    title: '토리의 하루',
    titleKo: '토리의 하루',
    emoji: '🐰',
    level: 'beginner',
    description: '跟Tori一起度过平凡又快乐的一天，学习最常用的日常韩语表达。适合零基础学习者。',
    color: 'var(--pink-primary)',
    pages: [
      {
        illustration: '🌅 🏠 🐰 💤',
        imageUrl: '/images/picture-books/tori-day-01.png',
        bgColor: '#FFF5F0',
        korean: '아침이에요! 토리는 아직 자고 있어요.',
        pronunciation: 'a-chi-mi-e-yo! to-ri-neun a-jik ja-go i-sseo-yo.',
        chinese: '早上好！Tori还在睡觉呢。',
        vocab: [
          { word: '아침', meaning: '早晨' },
          { word: '자다', meaning: '睡觉' },
        ],
      },
      {
        illustration: '⏰ 🐰 🙆 🌞',
        imageUrl: '/images/picture-books/tori-day-02.png',
        bgColor: '#FFF8E7',
        korean: '일어나요! 토리는 기지개를 켜요.',
        pronunciation: 'i-reo-na-yo! to-ri-neun gi-ji-gae-reul kyeo-yo.',
        chinese: '起床啦！Tori伸了个懒腰。',
        vocab: [
          { word: '일어나다', meaning: '起床' },
          { word: '기지개', meaning: '伸懒腰' },
        ],
      },
      {
        illustration: '🪥 🐰 🚿 ✨',
        imageUrl: '/images/picture-books/tori-day-03.png',
        bgColor: '#F0F8FF',
        korean: '세수를 하고 이를 닦아요. 깨끗해졌어요!',
        pronunciation: 'se-su-reul ha-go i-reul dak-ka-yo. kkae-kkeu-tae-jyeo-sseo-yo!',
        chinese: '洗了脸，刷了牙。变干净啦！',
        vocab: [
          { word: '세수', meaning: '洗脸' },
          { word: '이를 닦다', meaning: '刷牙' },
          { word: '깨끗하다', meaning: '干净' },
        ],
      },
      {
        illustration: '🍞 🥛 🐰 😋',
        imageUrl: '/images/picture-books/tori-day-04.png',
        bgColor: '#FFF5F5',
        korean: '아침을 먹어요. 빵과 우유를 마셔요. 맛있어요!',
        pronunciation: 'a-chi-meul meo-geo-yo. ppang-gwa u-yu-reul ma-syeo-yo. ma-si-sseo-yo!',
        chinese: '吃早饭啦。吃了面包，喝了牛奶。真好吃！',
        vocab: [
          { word: '먹다', meaning: '吃' },
          { word: '마시다', meaning: '喝' },
          { word: '맛있다', meaning: '好吃' },
          { word: '빵', meaning: '面包' },
          { word: '우유', meaning: '牛奶' },
        ],
      },
    ],
  },
];
