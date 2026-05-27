export interface PictureBookPage {
  illustration: string;
  bgColor: string;
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
        illustration: '📖\n🐰✨\n🌅',
        bgColor: '#FFF0F3',
        korean: '토리의 하루',
        pronunciation: 'to-ri-eui ha-ru',
        chinese: 'Tori的一天',
        vocab: [
          { word: '하루', meaning: '一天' },
          { word: '토리', meaning: 'Tori（名字）' },
        ],
      },
      {
        illustration: '🌅\n🏠 🐰 💤\n⏰',
        bgColor: '#FFF5F0',
        korean: '아침이에요!\n토리는 아직 자고 있어요.',
        pronunciation: 'a-chi-mi-e-yo! to-ri-neun a-jik ja-go i-sseo-yo.',
        chinese: '早上啦！Tori还在睡觉呢。',
        vocab: [
          { word: '아침', meaning: '早晨' },
          { word: '자다', meaning: '睡觉' },
          { word: '아직', meaning: '还、仍然' },
        ],
      },
      {
        illustration: '⏰\n🐰 🙆‍♀️\n🌞',
        bgColor: '#FFF8E7',
        korean: '일어나요!\n토리는 기지개를 켜요.',
        pronunciation: 'i-reo-na-yo! to-ri-neun gi-ji-gae-reul kyeo-yo.',
        chinese: '起床啦！Tori伸了个懒腰。',
        vocab: [
          { word: '일어나다', meaning: '起床' },
          { word: '기지개', meaning: '伸懒腰' },
        ],
      },
      {
        illustration: '🪥 🐰 🚿\n✨😊\n🫧',
        bgColor: '#F0F8FF',
        korean: '세수를 하고\n이를 닦아요.\n깨끗해졌어요!',
        pronunciation: 'se-su-reul ha-go i-reul dak-ka-yo. kkae-kkeu-tae-jyeo-sseo-yo!',
        chinese: '洗了脸，刷了牙。变干净啦！',
        vocab: [
          { word: '세수', meaning: '洗脸' },
          { word: '이를 닦다', meaning: '刷牙' },
          { word: '깨끗하다', meaning: '干净' },
        ],
      },
      {
        illustration: '🍞 🥛\n🐰 😋\n✨',
        bgColor: '#FFF5F5',
        korean: '아침을 먹어요.\n빵과 우유를 마셔요.\n맛있어요!',
        pronunciation: 'a-chi-meul meo-geo-yo. ppang-gwa u-yu-reul ma-syeo-yo. ma-si-sseo-yo!',
        chinese: '吃早饭啦。面包和牛奶，真好吃！',
        vocab: [
          { word: '먹다', meaning: '吃' },
          { word: '마시다', meaning: '喝' },
          { word: '맛있다', meaning: '好吃' },
          { word: '빵', meaning: '面包' },
          { word: '우유', meaning: '牛奶' },
        ],
      },
      {
        illustration: '👕 👖\n🐰 🎒\n🚪 🌳',
        bgColor: '#F0FFF0',
        korean: '옷을 입고\n밖에 나가요.\n날씨가 좋아요!',
        pronunciation: 'o-seul ip-kko bak-ke na-ga-yo. nal-ssi-ga jo-a-yo!',
        chinese: '穿上衣服出门啦。天气真好！',
        vocab: [
          { word: '옷', meaning: '衣服' },
          { word: '입다', meaning: '穿' },
          { word: '날씨', meaning: '天气' },
          { word: '좋다', meaning: '好' },
        ],
      },
      {
        illustration: '🏫 📚\n🐰 ✏️\n🇰🇷',
        bgColor: '#FFF8F0',
        korean: '학교에 가요.\n한국어를 공부해요.\n정말 재미있어요!',
        pronunciation: 'hak-kyo-e ga-yo. han-gu-geo-reul gong-bu-hae-yo. jeong-mal jae-mi-i-sseo-yo!',
        chinese: '去学校啦。学习韩语，真好玩！',
        vocab: [
          { word: '학교', meaning: '学校' },
          { word: '공부하다', meaning: '学习' },
          { word: '한국어', meaning: '韩语' },
          { word: '재미있다', meaning: '有趣' },
        ],
      },
      {
        illustration: '🛝 🐰\n🐻 👋\n🎵 😄',
        bgColor: '#FFF5FA',
        korean: '친구랑 놀아요.\n그네도 타고\n미끄럼틀도 타요!',
        pronunciation: 'chin-gu-rang no-ra-yo. geu-ne-do ta-go mi-kkeu-reom-teul-do ta-yo!',
        chinese: '和朋友一起玩。荡秋千，滑滑梯！',
        vocab: [
          { word: '친구', meaning: '朋友' },
          { word: '놀다', meaning: '玩' },
          { word: '그네', meaning: '秋千' },
        ],
      },
      {
        illustration: '🍚 🥩\n🐰 😋\n👨‍👩‍👧 💕',
        bgColor: '#FFF5EE',
        korean: '저녁을 먹어요.\n엄마가 만든 불고기!\n너무 맛있어요!',
        pronunciation: 'jeo-nyeo-geul meo-geo-yo. eom-ma-ga man-deun bul-go-gi! neo-mu ma-si-sseo-yo!',
        chinese: '吃晚饭啦。妈妈做的烤肉！太好吃了！',
        vocab: [
          { word: '저녁', meaning: '晚上' },
          { word: '불고기', meaning: '韩式烤肉' },
          { word: '엄마', meaning: '妈妈' },
          { word: '너무', meaning: '非常' },
        ],
      },
      {
        illustration: '🛁 🐰\n🫧 ✨\n🧼',
        bgColor: '#F0F0FF',
        korean: '목욕을 해요.\n따뜻한 물이\n기분 좋아요!',
        pronunciation: 'mo-gyo-geul hae-yo. tta-tteu-tan mu-ri gi-bun jo-a-yo!',
        chinese: '洗澡啦。暖暖的水，真舒服！',
        vocab: [
          { word: '목욕', meaning: '洗澡' },
          { word: '따뜻하다', meaning: '温暖' },
          { word: '기분', meaning: '心情' },
        ],
      },
      {
        illustration: '🌙 ⭐\n🐰 💤\n📖',
        bgColor: '#F5F0FF',
        korean: '잘 자요, 토리야!\n내일 또 만나요.\n좋은 꿈 꿔요!',
        pronunciation: 'jal ja-yo, to-ri-ya! nae-il tto man-na-yo. jo-eun kkum kkwo-yo!',
        chinese: '晚安，Tori！明天再见。做个好梦！',
        vocab: [
          { word: '잘 자다', meaning: '晚安' },
          { word: '내일', meaning: '明天' },
          { word: '꿈', meaning: '梦' },
          { word: '만나다', meaning: '见面' },
        ],
      },
    ],
  },
];
