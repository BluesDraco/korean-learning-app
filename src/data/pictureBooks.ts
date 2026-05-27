export interface PictureBookPage {
  illustration: string;
  imageUrl?: string;
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
  coverImage?: string;
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
    description: '跟Tori一起学习韩语，从一封神秘信件开始。适合零基础学习者。',
    coverImage: '/images/picture-books/tori-day/封面.png',
    color: 'var(--pink-primary)',
    pages: [
      {
        illustration: '📦\n🐰✨',
        imageUrl: '/images/picture-books/tori-day/01.png',
        bgColor: '#FFF0F3',
        korean: '토리가 가장 좋아하는 것은\n이불 속에서 간식 먹기예요.\n어느 날 아침, 문 앞에\n신비로운 소포가 생겼어요.',
        pronunciation: 'to-ri-ga ga-jang jo-a-ha-neun geo-seun\ni-bul so-ge-seo gan-sik meok-gi-ye-yo.\neo-neu nal a-chim, mun a-pe\nsin-bi-ro-un so-po-ga saeng-gyeo-sseo-yo.',
        chinese: 'Tori最喜欢的事情就是\n在被窝里吃零食。\n有一天早上，门口出现了\n一个神秘的包裹。',
        vocab: [
          { word: '이불', meaning: '被子' },
          { word: '간식', meaning: '零食' },
          { word: '소포', meaning: '包裹' },
          { word: '신비롭다', meaning: '神秘' },
        ],
      },
      {
        illustration: '🍬\n✉️🐰',
        imageUrl: '/images/picture-books/tori-day/02.png',
        bgColor: '#FFF8F0',
        korean: '소포 안에는 알록달록한\n한국 간식들이 가득했어요.\n그리고 손으로 쓴 편지도 있었어요.\n"아, 무슨 내용인지 알고 싶다!"',
        pronunciation: 'so-po a-ne-neun al-lok-dal-lo-kan\nhan-guk gan-sik-deu-ri ga-deu-kae-sseo-yo.\ngeu-ri-go so-neu-ro sseun pyeon-ji-do i-sseo-sseo-yo.\n"a, mu-seun nae-yong-in-ji al-go sip-tta!"',
        chinese: '包裹里装满了\n五颜六色的韩国零食。\n还有一封手写的信。\n"啊，好想知道里面写了什么！"',
        vocab: [
          { word: '알록달록하다', meaning: '五颜六色' },
          { word: '편지', meaning: '信' },
          { word: '내용', meaning: '内容' },
          { word: '가득하다', meaning: '充满' },
        ],
      },
      {
        illustration: '📚\n🍬🐰',
        imageUrl: '/images/picture-books/tori-day/03.png',
        bgColor: '#FFF8E7',
        korean: '"한국어를 배워서\n이 편지를 읽을 거야!"\n두꺼운 책을 가져왔어요.\n그런데... 첫 페이지도 다 읽기 전에\n간식을 먹기 시작했어요.',
        pronunciation: '"han-gu-geo-reul bae-wo-seo\ni pyeon-ji-reul il-geul geo-ya!"\ndu-kkeo-un chae-geul ga-jyeo-wa-sseo-yo.\ngeu-reon-de... cheot pe-i-ji-do da il-gi jeo-ne\n gan-si-geul meok-gi si-ja-kae-sseo-yo.',
        chinese: '"我要学韩语，\n把这封信读出来！"\n拿来了一本厚厚的书。\n但是...第一页还没读完，\n就开始吃零食了。',
        vocab: [
          { word: '배우다', meaning: '学习' },
          { word: '읽다', meaning: '读' },
          { word: '두껍다', meaning: '厚' },
          { word: '시작하다', meaning: '开始' },
        ],
      },
      {
        illustration: '✏️\n📝🐰',
        imageUrl: '/images/picture-books/tori-day/04.png',
        bgColor: '#F0F8FF',
        korean: '삐뚤빼뚤, 다시 써요.\n또 삐뚤빼뚤, 다시 써요.\n열 번째에 드디어!\n삐뚤빼뚤하지만\n"안녕"을 썼어요!',
        pronunciation: 'ppi-ttul-ppae-ttul, da-si sseo-yo.\ntto ppi-ttul-ppae-ttul, da-si sseo-yo.\nyeol beon-jjae-e deu-di-eo!\nppi-ttul-ppae-ttul-ha-ji-man\n"an-nyeong"-eul sseo-sseo-yo!',
        chinese: '歪歪扭扭地，重新写。\n又歪歪扭扭，再写一遍。\n第十遍，终于！\n虽然歪歪扭扭，\n但写出了"你好"！',
        vocab: [
          { word: '쓰다', meaning: '写' },
          { word: '다시', meaning: '再次' },
          { word: '드디어', meaning: '终于' },
          { word: '안녕', meaning: '你好' },
        ],
      },
      {
        illustration: '🍡\n😋🐰',
        imageUrl: '/images/picture-books/tori-day/05.png',
        bgColor: '#FFF5F5',
        korean: '토리가 떡 한 조각을 베어 물었어요.\n달콤하고 부드러웠어요.\n참지 못하고 외쳤어요.\n"맛있다!"\n잠깐, 그건 편지의 첫 번째 문장이었어요!',
        pronunciation: 'to-ri-ga tteok han jo-ga-geul be-eo mu-reo-sseo-yo.\ndal-ko-ma-go bu-deu-reo-wo-sseo-yo.\ncham-ji mo-ta-go oe-chyeo-sseo-yo.\n"ma-sit-tta!"\njam-kkan, geu-geon pyeon-ji-eui cheot beon-jjae mun-jang-i-eo-sseo-yo!',
        chinese: 'Tori咬了一口年糕。\n甜甜的，软软的。\n忍不住喊了出来。\n"好吃！"\n等等，那是信里的第一句话！',
        vocab: [
          { word: '떡', meaning: '年糕' },
          { word: '달콤하다', meaning: '甜' },
          { word: '참다', meaning: '忍住' },
          { word: '문장', meaning: '句子' },
        ],
      },
      {
        illustration: '✏️\n⭕🐰',
        imageUrl: '/images/picture-books/tori-day/06.png',
        bgColor: '#FFF8F0',
        korean: '토리는 연필을 들고\n아는 단어마다 동그라미를 쳤어요.\n맛있다, 귀엽다, 친구...\n편지 속에는 작은 마음들이\n가득 담겨 있었어요.',
        pronunciation: 'to-ri-neun yeon-pi-reul deul-go\na-neun da-neo-ma-da dong-geu-ra-mi-reul chyeo-sseo-yo.\nma-sit-tta, gwi-yeop-tta, chin-gu...\npyeon-ji so-ge-neun ja-geun ma-eum-deu-ri\nga-deuk dam-gyeo i-sseo-sseo-yo.',
        chinese: 'Tori拿起铅笔，\n在认识的单词上画圈。\n好吃、可爱、朋友...\n信里装满了\n小小的温暖心意。',
        vocab: [
          { word: '연필', meaning: '铅笔' },
          { word: '동그라미', meaning: '圆圈' },
          { word: '귀엽다', meaning: '可爱' },
          { word: '마음', meaning: '心、心意' },
        ],
      },
      {
        illustration: '🪞\n🐰💬',
        imageUrl: '/images/picture-books/tori-day/07.png',
        bgColor: '#FFF5FA',
        korean: '토리는 거울 앞으로 달려갔어요.\n진지하게 말했어요.\n"저는 토리예요."\n거울 속의 작은 토끼가\n눈을 깜빡였어요.',
        pronunciation: 'to-ri-neun geo-ul a-peu-ro dal-lyeo-ga-sseo-yo.\njin-ji-ha-ge mal-hae-sseo-yo.\n"jeo-neun to-ri-ye-yo."\ngeo-ul so-ge ja-geun to-kki-ga\nnu-neul kkam-ppa-gyeo-sseo-yo.',
        chinese: 'Tori跑到镜子前，\n认真地说：\n"我是Tori。"\n镜子里的小兔子\n眨了眨眼睛。',
        vocab: [
          { word: '거울', meaning: '镜子' },
          { word: '진지하다', meaning: '认真' },
          { word: '토끼', meaning: '兔子' },
          { word: '깜빡이다', meaning: '眨眼' },
        ],
      },
      {
        illustration: '🖊️\n💌🐰',
        imageUrl: '/images/picture-books/tori-day/08.png',
        bgColor: '#FFF5EE',
        korean: '토리는 펜을 들고\n친구에게 답장을 쓰기 시작했어요.\n천천히, 한 글자 한 글자.\n한 줄 쓸 때마다\n방긋 웃었어요.',
        pronunciation: 'to-ri-neun pe-neul deul-go\nchin-gu-e-ge dap-jang-eul sseu-gi si-ja-kae-sseo-yo.\ncheon-cheo-ni, han geul-ja han geul-ja.\nhan jul sseul ttae-ma-da\nbang-geu u-seo-sseo-yo.',
        chinese: 'Tori拿起笔，\n开始给朋友写回信。\n慢慢地，一个字一个字。\n每写一行，\n都会露出微笑。',
        vocab: [
          { word: '답장', meaning: '回信' },
          { word: '천천히', meaning: '慢慢地' },
          { word: '글자', meaning: '字' },
          { word: '웃다', meaning: '笑' },
        ],
      },
      {
        illustration: '✉️\n🐰🎀',
        imageUrl: '/images/picture-books/tori-day/09.png',
        bgColor: '#F0F0FF',
        korean: '다 썼어요!\n봉투에 삐뚤빼뚤한 한국어로 썼어요.\n"감사해요. 나의 친구에게."\n그리고 귀여운 토끼 스티커를 붙였어요.',
        pronunciation: 'da sseo-sseo-yo!\nbong-tu-e ppi-ttul-ppae-ttul-han han-gu-geo-ro sseo-sseo-yo.\n"gam-sa-hae-yo. na-eui chin-gu-e-ge."\ngeu-ri-go gwi-yeo-un to-kki seu-ti-keo-reul bu-chyeo-sseo-yo.',
        chinese: '写好了！\n在信封上用歪歪扭扭的韩语写道：\n"谢谢你，我的朋友。"\n然后贴上了可爱的兔子贴纸。',
        vocab: [
          { word: '봉투', meaning: '信封' },
          { word: '감사하다', meaning: '感谢' },
          { word: '스티커', meaning: '贴纸' },
          { word: '붙이다', meaning: '贴' },
        ],
      },
      {
        illustration: '🌙\n🐰💤',
        imageUrl: '/images/picture-books/tori-day/10.png',
        bgColor: '#F5F0FF',
        korean: '그날 밤, 토리는 이불 속에 폭 파묻혀\n마지막 떡을 먹으며\n창밖의 별을 바라봤어요.\n\'한국어는 생각보다 어렵지 않아.\n읽고 싶은 이유만 있으면 돼.\'\n안녕히 주무세요, 토리. 🌙',
        pronunciation: 'geu-nal bam, to-ri-neun i-bul so-ge pok pa-mu-chyeo\nma-ji-mak tteo-geul meo-geu-myeo\nchang-bak-keu-i byeol-eu-ra-bwa-sseo-yo.\n\'han-gu-geo-neun saeng-gak-bo-da eo-ryeop-ji a-na.\nil-go si-peun i-yu-man i-sseu-myeon dwae.\'\nan-nyeong-hi ju-mu-se-yo, to-ri.',
        chinese: '那天晚上，Tori埋头在被窝里，\n吃着最后一块年糕，\n望着窗外的星星。\n"韩语没有想象中那么难。\n只要有想读懂的理由就够了。"\n晚安，Tori。',
        vocab: [
          { word: '밤', meaning: '夜晚' },
          { word: '별', meaning: '星星' },
          { word: '생각', meaning: '想法' },
          { word: '이유', meaning: '理由' },
        ],
      },
      {
        illustration: '📝\n🐰✨',
        imageUrl: '/images/picture-books/tori-day/11.png',
        bgColor: '#FFF5FA',
        korean: '토리가 배운 한국어\n\n한국  ·  편지  ·  공부\n안녕  ·  맛있다  ·  귀엽다\n친구  ·  저는 토리예요\n감사해요\n안녕히 주무세요',
        pronunciation: 'to-ri-ga bae-un han-gu-geo.\n\nhan-guk, pyeon-ji, gong-bu.\nan-nyeong, ma-sit-tta, gwi-yeop-tta.\nchin-gu, jeo-neun to-ri-ye-yo.\ngam-sa-hae-yo.\nan-nyeong-hi ju-mu-se-yo.',
        chinese: 'Tori学到的韩语\n\n韩国 · 信 · 学习\n你好 · 好吃 · 可爱\n朋友 · 我是Tori\n谢谢\n晚安',
        vocab: [
          { word: '한국', meaning: '韩国' },
          { word: '편지', meaning: '信' },
          { word: '공부', meaning: '学习' },
          { word: '안녕', meaning: '你好' },
          { word: '맛있다', meaning: '好吃' },
          { word: '귀엽다', meaning: '可爱' },
          { word: '친구', meaning: '朋友' },
          { word: '감사해요', meaning: '谢谢' },
          { word: '안녕히 주무세요', meaning: '晚安' },
        ],
      },
    ],
  },
];
