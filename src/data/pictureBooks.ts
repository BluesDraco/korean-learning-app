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
      {
        illustration: '🚶 🐰 🌳 🌸 ☀️',
        imageUrl: '/images/picture-books/tori-day-05.png',
        bgColor: '#F5FFF5',
        korean: '밖에 나가요. 날씨가 정말 좋아요!',
        pronunciation: 'bak-ke na-ga-yo. nal-ssi-ga jeong-mal jo-a-yo!',
        chinese: '出门啦。天气真好！',
        vocab: [
          { word: '밖', meaning: '外面' },
          { word: '날씨', meaning: '天气' },
          { word: '좋다', meaning: '好' },
        ],
      },
      {
        illustration: '🐱 🐰 👋 💕',
        imageUrl: '/images/picture-books/tori-day-06.png',
        bgColor: '#FFF0F8',
        korean: '친구 고양이를 만났어요. 안녕하세요! 반가워요!',
        pronunciation: 'chin-gu go-yang-i-reul man-na-sseo-yo. an-nyeong-ha-se-yo! ban-ga-wo-yo!',
        chinese: '遇到了猫咪朋友。你好！见到你很高兴！',
        vocab: [
          { word: '친구', meaning: '朋友' },
          { word: '만나다', meaning: '遇见' },
          { word: '안녕하세요', meaning: '你好' },
          { word: '반갑다', meaning: '高兴 (见到)' },
        ],
      },
      {
        illustration: '📚 🐰 🐱 ✏️ 📖',
        imageUrl: '/images/picture-books/tori-day-07.png',
        bgColor: '#F8F5FF',
        korean: '함께 한국어를 공부해요. 토리는 글자를 잘 써요.',
        pronunciation: 'ham-kke han-gu-geo-reul gong-bu-hae-yo. to-ri-neun geul-ja-reul jal sseo-yo.',
        chinese: '一起学韩语。Tori字写得很好。',
        vocab: [
          { word: '함께', meaning: '一起' },
          { word: '공부하다', meaning: '学习' },
          { word: '글자', meaning: '字' },
          { word: '잘', meaning: '好/擅长' },
        ],
      },
      {
        illustration: '🎮 🐰 🐱 🎉 😆',
        imageUrl: '/images/picture-books/tori-day-08.png',
        bgColor: '#FFF8F0',
        korean: '공부한 후에 같이 놀아요. 정말 재미있어요!',
        pronunciation: 'gong-bu-han hu-e ga-chi no-ra-yo. jeong-mal jae-mi-i-sseo-yo!',
        chinese: '学习之后一起玩。真好玩！',
        vocab: [
          { word: '후', meaning: '之后' },
          { word: '놀다', meaning: '玩' },
          { word: '재미있다', meaning: '有趣/好玩' },
        ],
      },
      {
        illustration: '🍽️ 🐰 🥕 🍚 😋',
        imageUrl: '/images/picture-books/tori-day-09.png',
        bgColor: '#FFFFF5',
        korean: '저녁을 먹어요. 토리는 당근을 제일 좋아해요!',
        pronunciation: 'jeo-nyeo-geul meo-geo-yo. to-ri-neun dang-geu-neul je-il jo-a-hae-yo!',
        chinese: '吃晚饭啦。Tori最喜欢胡萝卜！',
        vocab: [
          { word: '저녁', meaning: '晚饭/傍晚' },
          { word: '당근', meaning: '胡萝卜' },
          { word: '제일', meaning: '最' },
          { word: '좋아하다', meaning: '喜欢' },
        ],
      },
      {
        illustration: '🌙 ⭐ 🐰 🛏️ 💤',
        imageUrl: '/images/picture-books/tori-day-10.png',
        bgColor: '#F0F0FF',
        korean: '잘 시간이에요. 토리는 골아떨어졌어요. 잘 자요!',
        pronunciation: 'jal si-ga-ni-e-yo. to-ri-neun go-ra-tteo-reo-jyeo-sseo-yo. jal ja-yo!',
        chinese: '该睡觉了。Tori呼呼大睡。晚安！',
        vocab: [
          { word: '잘 자다', meaning: '晚安/睡好' },
          { word: '시간', meaning: '时间' },
        ],
      },
    ],
  },
];
