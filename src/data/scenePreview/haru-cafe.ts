/**
 * 하루 카페 · 咖啡馆 · 场景预习
 * 韩语审查状态：PASS（含 4 处小瑕疵修复后）
 */
import type { ScenePreview } from '../sceneLocations';

export const haruCafePreview: ScenePreview = {
  sceneIntro: {
    headline: '首尔咖啡文化 · 全世界都在惊叹', headlineEn: 'Seoul\'s Coffee Culture · The World Is Amazed',
    lead: '每 30 米一家咖啡馆，年人均 300+ 杯，2 元一杯的美式和 8 元一杯的手冲共存——首尔早已把咖啡玩成了一种生活方式。', leadEn: 'A café every 30 meters, 300+ cups per person per year, and $2 Americanos coexisting with $8 pour-overs—Seoul has turned coffee into a lifestyle.',
    facts: [
      { emoji: '☕', label: '18,000+', desc: '首尔咖啡馆数量，比全球任何城市都多', descEn: 'Seoul has more cafés than any other city in the world' },
      { emoji: '📈', label: '405 杯', labelEn: '405 cups', desc: '韩国年人均咖啡消费量，全球第 2', descEn: 'Korea\'s annual coffee consumption per person, 2nd in the world' },
      { emoji: '🧊', label: '80%', desc: '首尔咖啡馆冰美式全年销量占比', descEn: 'Share of iced Americano sales in Seoul cafés year-round' },
      { emoji: '⏱', label: '15 min', desc: '平均步行到最近咖啡馆的时间', descEn: 'Average walking time to the nearest café' },
    ],
    cards: [
      {
        emoji: '❄️',
        title: '「얼죽아」冬天也喝冰美式', titleEn: '\'Eoljuga\' Drinking Iced Americanos Even in Winter',
        body: '「얼어 죽어도 아이스 아메리카노」（冻死也要冰美式）。零下 10 度，你还是能看到韩国人一手拎着冰美式一手插兜——这不是段子，是首尔冬天的日常。', bodyEn: '\'Eoreo jugeodo aiseu amerikano\' (I\'d rather freeze to death than give up iced Americano). At minus 10 degrees, you\'ll still see Koreans holding an iced Americano in one hand and their other hand in their pocket—this isn\'t a joke, it\'s a typical Seoul winter day.',
      },
      {
        emoji: '🏢',
        title: '咖啡馆 = 城市共享客厅', titleEn: 'Cafés = The City\'s Shared Living Room',
        body: '首尔人不在家会客——租金贵，房子小。咖啡馆变成了工作、约会、学习、独处的公共起居室。「카공족」（在咖啡馆学习的人）能占位一整天。', bodyEn: 'Seoulites don\'t host guests at home—rent is expensive and apartments are small. Cafés have become public living rooms for work, dates, studying, and alone time. \'Kagongjok\' (people who study at cafés) can camp out for an entire day.',
      },
      {
        emoji: '💳',
        title: '几乎不收现金', titleEn: 'they barely accept cash',
        body: '别掏钱包。首尔 95% 咖啡馆只刷卡或 Kakao Pay，甚至有店挂「현금 사절」（谢绝现金）。学好「카드로요」比背钱数更实用。', bodyEn: 'Don\'t pull out your wallet. 95% of cafes in Seoul only take cards or Kakao Pay, some even have signs saying \'현금 사절\' (no cash). Learning \'카드로요\' is more useful than memorizing money amounts.',
      },
      {
        emoji: '🎨',
        title: 'Instagram 是隐形菜单', titleEn: 'Instagram is the hidden menu',
        body: '很多首尔咖啡馆开在小巷、地下室、没有招牌——但它们的 Instagram 有几万粉丝。咖啡馆比拼的不是咖啡，是空间设计和拍照角度。', bodyEn: 'Many Seoul cafés are tucked away in alleys, basements, or have no sign at all—yet they have tens of thousands of Instagram followers. The competition isn\'t about the coffee; it\'s about space design and photo angles.',
      },
    ],
    didyouknow: [
      {
        q: '为什么星巴克在韩国叫「스타벅스」？', qEn: 'Why is Starbucks called \'스타벅스\' in Korea?',
        a: '按英语 Starbucks 的发音转写，实际念「seu-ta-beok-sseu」。韩国人爱把它缩写成「스벅」，年轻人日常口语几乎只说缩写。', aEn: 'It\'s a transliteration of the English pronunciation, actually read as \'seu-ta-beok-sseu.\' Koreans love to shorten it to \'스벅,\' and young people almost only use the abbreviation in everyday speech.',
      },
      {
        q: '为什么点单要说「걸로」而不是「것을」？', qEn: 'Why do you say \'걸로\' instead of \'것을\' when ordering?',
        a: '「걸로」= 것으로 的口语缩写，表达「就选这个」的选择感。日常几乎听不到「것을」的完整形。', aEn: '\'걸로\' is the colloquial abbreviation of 것으로, conveying a sense of \'I\'ll go with this.\' You rarely hear the full form \'것을\' in daily conversation.',
      },
      {
        q: '首尔第一家咖啡馆开在哪？', qEn: 'Where was Seoul\'s first café?',
        a: '1902 年首尔 손탁호텔（Sontag Hotel）——韩国第一家商业售咖啡的酒店。高宗皇帝更早（1896）在俄国公使馆就喝过咖啡，但正式营业的咖啡馆从这里起步。', aEn: 'In 1902, at the Sontag Hotel in Seoul—Korea\'s first hotel to commercially serve coffee. Emperor Gojong had already drunk coffee earlier (1896) at the Russian legation, but the officially operating café started here.',
      },
    ],
  },
  openingHighlights: [
    { role: 'user', ko: '아이스 아메리카노 한 잔 주세요.', cn: '请给我一杯冰美式。', cnEn: 'Please give me an iced Americano.' },
    { role: 'user', ko: '시럽 빼고 주세요.', cn: '请不要糖浆。', cnEn: 'No syrup, please.' },
    { role: 'user', ko: '테이크아웃이요.', cn: '外带。', cnEn: 'To go.' },
  ],
  culturalTips: [
    {
      emoji: '☕',
      title: '「얼죽아」文化', titleEn: 'The \'얼죽아\' culture',
      body: '얼어 죽어도 아이스 아메리카노（冻死也要冰美式）—— 韩国人真的一年四季喝冰美式，冬天也一样。', bodyEn: '\'Iced Americano even if I freeze to death\'—Koreans really drink iced Americanos all year round, even in winter.',
    },
    {
      emoji: '💳',
      title: '几乎不收现金', titleEn: 'they barely accept cash',
      body: '首尔咖啡馆基本只刷卡或手机支付。「카드로요（刷卡）」是最保险的答复。', bodyEn: 'Seoul cafés basically only accept card or mobile payments. \'카드로요\' (by card) is the safest answer.',
    },
    {
      emoji: '📱',
      title: '会员/积分默认问', titleEn: 'Membership/points are asked by default',
      body: '结账前店员通常问「포인트 있으세요?（有积分卡吗？）」，没有就答「없어요（没有）」即可。', bodyEn: 'Before checkout, the staff usually asks \'포인트 있으세요?\' (Do you have a points card?). If not, just answer \'없어요\' (no).',
    },
  ],
  vocab: [
    {
      title: '커피 종류 · 咖啡种类', titleEn: '커피 종류 · Coffee types',
      context: '点单选饮品时', contextEn: 'When ordering a drink',
      items: [
        {
          ko: '아메리카노', cn: '美式', cnEn: 'Americano', emoji: '☕', rom: 'a-me-ri-ka-no',
          pos: 'noun', tier: 'core', tags: ['点单必备'],
          example: { ko: '아메리카노 한 잔 주세요.', cn: '请给我一杯美式。', cnEn: 'One Americano, please.' },
          tip: '韩国最热销咖啡，默认冰的居多。', tipEn: 'Korea\'s best-selling coffee, usually iced by default.',
          hook: '音译自英文 americano，念慢一点跟英文几乎一样。', hookEn: 'Transliterated from English \'americano\'; said slowly, it sounds almost identical to English.',
          confuse: { ko: '에스프레소', cn: '浓缩', cnEn: 'capture, condense', diff: '아메리카노是浓缩加水，에스프레소是原液不加水。', diffEn: 'An Americano is espresso with water added; an espresso is the pure shot without water.' },
        },
        {
          ko: '카페라떼', cn: '拿铁', cnEn: 'latte', emoji: '🥛', rom: 'ka-pe-ra-tte',
          pos: 'noun', tier: 'core', tags: ['点单必备'],
          example: { ko: '따뜻한 카페라떼로 주세요.', cn: '要一杯热拿铁。', cnEn: 'A hot latte, please.' },
          tip: '카페=咖啡，라떼来自意大利语 latte（牛奶），记住「咖啡+牛奶」。', tipEn: '카페 means coffee, and 라떼 comes from Italian \'latte\' (milk)—remember \'coffee + milk.\'',
          hook: '카페(咖啡) + 라떼(牛奶)，两词拼在一起就是拿铁。', hookEn: 'Cafe (coffee) + latte (milk), put together and you get a latte.',
          confuse: { ko: '아메리카노', cn: '美式', cnEn: 'Americano', diff: '라떼有牛奶，아메리카노无牛奶。', diffEn: 'Latte has milk, americano doesn\'t.' },
        },
        {
          ko: '카페모카', cn: '摩卡', cnEn: 'Mocha', emoji: '🍫', rom: 'ka-pe-mo-ka',
          pos: 'noun', tier: 'useful', tags: ['点单时'],
          example: { ko: '카페모카 시럽 빼고 주세요.', cn: '摩卡不要额外糖浆。', cnEn: 'Mocha, no extra syrup.' },
          tip: '含巧克力糖浆本身很甜。시럽 빼고 指去掉额外香草/榛果浆，摩卡的巧克力浆保留。', tipEn: 'The chocolate syrup is already sweet. \'Syrup out\' means removing extra vanilla/hazelnut syrup, but the mocha\'s chocolate syrup stays.',
          hook: '모카=Mocha，摩卡咖啡豆产地也叫 Mocha，所以带巧克力香气。', hookEn: 'Mocha = Mocha, and the coffee bean origin is also called Mocha, so it has a chocolate aroma.',
        },
        {
          ko: '바닐라라떼', cn: '香草拿铁', cnEn: 'Vanilla latte', emoji: '🌿', rom: 'ba-ni-la-ra-tte',
          pos: 'noun', tier: 'useful', tags: ['点单时'],
          example: { ko: '바닐라라떼 작은 걸로요.', cn: '香草拿铁，小杯。', cnEn: 'Vanilla latte, small.' },
          tip: '女生下单率超高，几乎每家店都有。', tipEn: 'Super popular with women, almost every shop has it.',
          hook: '바닐라=Vanilla，发音和英文高度接近，跟着读几遍就记住。', hookEn: 'Vanilla = Vanilla, the pronunciation is very close to English, read it a few times and you\'ll remember it.',
        },
        {
          ko: '콜드브루', cn: '冷萃', cnEn: 'Cold brew', emoji: '🧊', rom: 'kol-deu-beu-ru',
          pos: 'noun', tier: 'bonus', tags: ['冷饮时'],
          example: { ko: '콜드브루 있어요?', cn: '有冷萃吗？', cnEn: 'Do you have cold brew?' },
          tip: '不是所有店都有，问一下再点。', tipEn: 'Not every shop has it, ask before ordering.',
          hook: 'Cold Brew 直接音译，念时把每个音节拆开：콜-드-브-루。', hookEn: 'Cold Brew is directly transliterated, break it into syllables: kol-deu-beu-ru.',
        },
      ],
    },
    {
      title: '커스터마이징 · 定制选项', titleEn: 'Customizing · Customization options',
      context: '想调整饮品配方时', contextEn: 'When you want to adjust a drink recipe',
      items: [
        {
          ko: '샷 추가', cn: '加浓缩', cnEn: 'Add a shot', emoji: '➕', rom: 'syat chu-ga',
          pos: 'expr', tier: 'core', tags: ['定制时'],
          example: { ko: '샷 하나 추가해 주세요.', cn: '多加一份浓缩。', cnEn: 'Add an extra shot.' },
          tip: '샷=shot，一份 espresso。说法：샷 추가(短) 或 샷 하나 추가해 주세요(完整)。', tipEn: 'Shot = shot, one espresso. Say: \'shot chuga\' (short) or \'shot hana chugahaeyo juseyo\' (full).',
          hook: '추가(追加)是汉字词，中文也用"追加"，意思完全一样！', hookEn: 'Chuga (add) is a Sino-Korean word, Chinese also uses \'add\', meaning exactly the same!',
          forms: [
            { label: '请求加', labelEn: 'Ask to add', ko: '추가해 주세요' },
            { label: '请求去掉', labelEn: 'Ask to remove', ko: '빼고 주세요' },
          ],
        },
        {
          ko: '디카페인', cn: '低因', cnEn: 'Decaf', emoji: '😌', rom: 'di-ka-pe-in',
          pos: 'noun', tier: 'useful', tags: ['特殊需求'],
          example: { ko: '디카페인으로 해주세요.', cn: '做低因的。', cnEn: 'Make it decaf.' },
          tip: '晚上想喝咖啡又怕失眠时点这个。', tipEn: 'Order this when you want coffee at night but are afraid of insomnia.',
          hook: 'Decaf 的韩语是 디카페인，de-（去除）+ caffeine（咖啡因）= 低因。', hookEn: 'Decaf in Korean is \'dikapein\', de- (remove) + caffeine = decaf.',
          forms: [
            { label: '点单时说', labelEn: 'When ordering', ko: '디카페인으로 해주세요' },
            { label: '询问有没有', labelEn: 'Asking if something is available', ko: '디카페인 있어요?' },
          ],
        },
        {
          ko: '시럽', cn: '糖浆', cnEn: 'Syrup', emoji: '🍯', rom: 'si-reop',
          pos: 'noun', tier: 'core', tags: ['定制时'],
          example: { ko: '시럽 빼고 주세요.', cn: '不要糖浆。', cnEn: 'No syrup.' },
          tip: '빼고=去掉；적게=少放；넣어서=加入。三个搭配都要会。', tipEn: '빼고=remove; 적게=less; 넣어서=add. You need to know all three.',
          hook: '音译自英文 syrup，记住 시→sy，럽→rup。', hookEn: 'Transliterated from English \'syrup\'; remember 시→sy, 럽→rup.',
          forms: [
            { label: '不要', labelEn: 'don\'t want', ko: '시럽 빼고 주세요' },
            { label: '少放', labelEn: 'Less', ko: '시럽 적게 넣어 주세요' },
          ],
        },
        {
          ko: '휘핑크림', cn: '奶油顶', cnEn: 'Whipped cream topping', emoji: '☁️', rom: 'hwi-ping-keu-rim',
          pos: 'noun', tier: 'useful', tags: ['定制时'],
          example: { ko: '휘핑크림 많이 주세요.', cn: '奶油多一点。', cnEn: 'Extra whipped cream.' },
          tip: '奶油顶的意思，摩卡默认有，拿铁默认没有。', tipEn: 'Means whipped cream topping; mochas have it by default, lattes don\'t.',
          hook: '휘핑=Whipping，크림=Cream，两个音译拼在一起。', hookEn: '휘핑=Whipping, 크림=Cream, two transliterations combined.',
        },
        {
          ko: '헤이즐넛 시럽', cn: '榛果糖浆', cnEn: 'Hazelnut syrup', emoji: '🌰', rom: 'he-i-jeul-neot si-reop',
          pos: 'noun', tier: 'bonus', tags: ['定制时'],
          example: { ko: '헤이즐넛 시럽 넣어 주세요.', cn: '请加榛果糖浆。', cnEn: 'Please add hazelnut syrup.' },
          tip: '外来语拼写长，菜单上一般直接有按钮，点就行。', tipEn: 'Loanwords are long to spell, but menus usually have buttons—just tap.',
          hook: '헤이즐넛=Hazelnut，拼写长但按英文发音来就不难。', hookEn: '헤이즐넛=Hazelnut; it\'s long but easy if you follow the English pronunciation.',
        },
      ],
    },
    {
      title: '온도 / 사이즈 · 温度 / 容量', titleEn: '온도 / 사이즈 · Temperature / Size',
      context: '回答店员问温度或尺寸时', contextEn: 'When answering staff about temperature or size',
      items: [
        {
          ko: '뜨거운', cn: '热的', cnEn: 'Hot', emoji: '🔥', rom: 'tteu-geo-un',
          pos: 'adj', tier: 'core', tags: ['回答温度'],
          example: { ko: '뜨거운 걸로 주세요.', cn: '要热的。', cnEn: 'Hot, please.' },
          tip: '뜨겁다的修饰形，修饰名词时用뜨거운；「걸로」= 것으로 的口语缩写。', tipEn: 'Adjective form of 뜨겁다; use 뜨거운 before nouns; \'걸로\' is the colloquial short form of 것으로.',
          hook: '뜨겁다的词根发音「tteu」带点紧张感，和热气腾腾的感觉很像。', hookEn: 'The root \'tteu\' in 뜨겁다 has a tense feel, like steam rising.',
          confuse: { ko: '따뜻한', cn: '温暖的', cnEn: 'warm', diff: '뜨거운=烫/热(高温)，따뜻한=温热/暖和(舒适温度)，咖啡通常说뜨거운。', diffEn: '뜨거운=scalding/hot (high temp), 따뜻한=warm/cozy (comfortable); for coffee, use 뜨거운.' },
        },
        {
          ko: '차가운', cn: '冰的', cnEn: 'Iced', emoji: '❄️', rom: 'cha-ga-un',
          pos: 'adj', tier: 'core', tags: ['回答温度'],
          example: { ko: '차가운 걸로 주세요.', cn: '要冰的。', cnEn: 'Iced, please.' },
          tip: '형용사 차갑다的修饰形。口语里说「아이스로요」更常听到、更地道。', tipEn: 'Adjective form of 차갑다. In speech, \'아이스로요\' is more common and natural.',
          hook: '차=차갑다的词根，联想中文"冷"字的寒意感。', hookEn: '차 is the root of 차갑다; think of the chill in the Chinese character \'冷\'.',
          confuse: { ko: '아이스', cn: '冰的(英文外来语)', cnEn: 'Iced (English loanword)', diff: '차가운是形容词，아이스(ice)是外来名词，点单口语更常用아이스로요。', diffEn: '차가운 is an adjective, 아이스(ice) is a loan noun; in ordering, 아이스로요 is more common.' },
        },
        {
          ko: '작은 사이즈', cn: '小杯', cnEn: 'Small', emoji: '🥃', rom: 'ja-geun sa-i-jeu',
          pos: 'expr', tier: 'core', tags: ['回答尺寸'],
          example: { ko: '작은 사이즈로 주세요.', cn: '给我小杯。', cnEn: 'Give me a small.' },
          tip: '星巴克有톨/그란데/벤티专属叫法；一般咖啡店直接说작은/큰。', tipEn: 'Starbucks has its own terms 톨/그란데/벤티; regular cafés just say 작은/큰.',
          hook: '작다(小)→작은(修饰形)，사이즈=size，英文词直接音译。', hookEn: '작다 (small) → 작은 (modifier form), 사이즈 = size, a direct transliteration of the English word.',
        },
        {
          ko: '큰 사이즈', cn: '大杯', cnEn: 'Large cup', emoji: '🥤', rom: 'keun sa-i-jeu',
          pos: 'expr', tier: 'core', tags: ['回答尺寸'],
          example: { ko: '큰 걸로요.', cn: '大杯。', cnEn: 'Large.' },
          tip: '差价通常只有 500원。口语可以省成「큰 걸로요」超自然。', tipEn: 'The price difference is usually only 500 won. In casual speech, you can shorten it to \'큰 걸로요\'—super natural.',
          hook: '크다(大)→큰(修饰形)，크다的크발音就像"克"，联想"大克拉"。', hookEn: '크다 (big) → 큰 (modifier form). The 크 in 크다 sounds like \'keu\', think \'big carat\'.',
        },
      ],
    },
    {
      title: '주문 방식 · 用餐方式', titleEn: 'Order Method · Dining Style',
      context: '结账和告知用餐方式时', contextEn: 'When paying and telling them how you\'ll dine',
      items: [
        {
          ko: '매장', cn: '店内', cnEn: 'Dine-in', emoji: '🪑', rom: 'mae-jang',
          pos: 'noun', tier: 'core', tags: ['结账时'],
          example: { ko: '매장에서 마실게요.', cn: '在店里喝。', cnEn: 'Drink here.' },
          tip: '疫情后有店只做外带，先问「매장 이용 되나요?」安全。', tipEn: 'After the pandemic, some stores are takeout-only, so asking \'매장 이용 되나요?\' first is safer.',
          hook: '매장(卖场)=汉字词，卖场/店面，中文里也有"卖场"！', hookEn: '매장 (store) = Sino-Korean word, meaning store/front. Chinese also has \'卖场\'!',
        },
        {
          ko: '테이크아웃', cn: '外带', cnEn: 'takeout', emoji: '🥡', rom: 'te-i-keu-a-ut',
          pos: 'expr', tier: 'useful', tags: ['结账时'],
          example: { ko: '테이크아웃으로 해주세요.', cn: '要外带。', cnEn: 'To go.' },
          tip: '口语更常说「포장이요」，短又快。테이크아웃요 显得更像外国人。', tipEn: 'In casual speech, \'포장이요\' is more common—short and quick. Saying \'테이크아웃요\' sounds more like a foreigner.',
          hook: 'Take out 音译，不过韩国人日常更喜欢说포장(打包)。', hookEn: 'It\'s a transliteration of \'take out\', but Koreans prefer saying 포장 (packaging) in daily life.',
          confuse: { ko: '포장', cn: '打包', cnEn: 'To pack up', diff: '意思相同，포장更短更口语，테이크아웃显得更「洋气」。', diffEn: 'They mean the same, but 포장 is shorter and more colloquial, while 테이크아웃 sounds more \'trendy\'.' },
        },
        {
          ko: '포장', cn: '打包', cnEn: 'To pack up', emoji: '🎁', rom: 'po-jang',
          pos: 'noun', tier: 'core', tags: ['结账时'],
          example: { ko: '포장이요.', cn: '打包。', cnEn: 'Takeout.' },
          tip: '结账时店员会问「매장이세요, 포장이세요?」 直接答포장이요 最省力。', tipEn: 'When paying, the staff will ask \'매장이세요, 포장이세요?\' Just answering \'포장이요\' is the easiest.',
          hook: '포장(包装)=汉字词，中文的「包装」！同源词，直接记住。', hookEn: '포장 (packaging) = Sino-Korean word, same as Chinese \'包装\'! Cognate, just memorize it.',
        },
        {
          ko: '카드로 결제', cn: '刷卡', cnEn: 'Pay by card', emoji: '💳', rom: 'ka-deu-ro gyeol-je',
          pos: 'expr', tier: 'core', tags: ['结账时'],
          example: { ko: '카드로 결제할게요.', cn: '用卡结账。', cnEn: 'Pay by card.' },
          tip: '90% 场合直说「카드로요」就够；결제할게요 是更完整的表达。', tipEn: 'In 90% of cases, just saying \'카드로요\' is enough; 결제할게요 is a more complete expression.',
          hook: '결제(决济)=汉字词，就是"结账/支付"，카드=card。', hookEn: '결제 (payment) = Sino-Korean word, meaning \'settle/pay\', 카드 = card.',
          forms: [
            { label: '完整说法', labelEn: 'Full expression', ko: '카드로 결제할게요' },
            { label: '口语省略', labelEn: 'Spoken abbreviation', ko: '카드로요' },
          ],
        },
        {
          ko: '현금으로', cn: '现金', cnEn: 'cash', emoji: '💵', rom: 'hyeon-geum-eu-ro',
          pos: 'expr', tier: 'useful', tags: ['结账时'],
          example: { ko: '현금으로 낼게요.', cn: '用现金付。', cnEn: 'Pay in cash.' },
          tip: '小咖啡店可能不收现金，先看柜台标识「현금 사절」= 谢绝现金。', tipEn: 'Small cafés may not accept cash; check the counter sign \'현금 사절\' = no cash.',
          hook: '현금(现金)＝汉字词「现金」，中韩同源，读音「hyeon-geum」轻松记。', hookEn: '현금(现金) is a Sino-Korean word for \'cash,\' shared with Chinese; pronounce it \'hyeon-geum\' for easy recall.',
        },
      ],
    },
  ],
  patterns: [
    {
      ko: '아메리카노 한 잔 주세요.',
      cn: '请给我一杯美式。', cnEn: 'One Americano, please.',
      when: '点饮品时', whenEn: 'When ordering drinks',
      formal: 'neutral',
      breakdown: [
        { role: '宾语', roleEn: 'Object', text: '아메리카노', meaning: '美式（咖啡种类）', meaningEn: 'Americano (coffee type)' },
        { role: '修饰', roleEn: 'modify', text: '한 잔', meaning: '一杯（数量）', meaningEn: 'One cup (quantity)' },
        { role: '谓语', roleEn: 'predicate', text: '주세요', meaning: '请给我（请求句尾）', meaningEn: 'Please give me (request ending)' },
      ],
      tips: [
        '「N + 주세요」= 「请给我 N」，是点单最通用的句式。',
        '量词「잔」用于杯装饮料；固体则用「개」（个）。',
      ],
      swaps: [
        {
          slot: '아메리카노',
          options: [
            { ko: '카페라떼', cn: '拿铁', cnEn: 'latte' },
            { ko: '바닐라라떼', cn: '香草拿铁', cnEn: 'Vanilla latte' },
            { ko: '콜드브루', cn: '冷萃', cnEn: 'Cold brew' },
            { ko: '카페모카', cn: '摩卡', cnEn: 'Mocha' },
          ],
        },
        {
          slot: '한 잔',
          options: [
            { ko: '두 잔', cn: '两杯', cnEn: 'Two cups' },
            { ko: '세 잔', cn: '三杯', cnEn: 'Three cups' },
          ],
        },
      ],
      pitfall: '数字「하나」在量词前缩成「한」（한 잔），单独说数量时才保持 하나。', pitfallEn: 'The number \'하나\' shortens to \'한\' before counters (한 잔), but stays \'하나\' when counting alone.',
      upgrade: { ko: '아메리카노 한 잔 부탁드립니다.', cn: '（更正式）请给我一杯美式。', cnEn: '(More formal) Please give me an Americano.' },
      downgrade: { ko: '아메리카노 하나요.', cn: '美式一杯。（超简短，对熟悉的店员）', cnEn: 'One Americano. (Very short, for familiar staff)' },
    },
    {
      ko: '뜨거운 걸로 주세요.',
      cn: '要热的。', cnEn: 'Hot, please.',
      when: '回答店员问温度时', whenEn: 'When answering the staff\'s question about temperature',
      formal: 'neutral',
      breakdown: [
        { role: '修饰', roleEn: 'modify', text: '뜨거운', meaning: '热的（형용사修饰形）', meaningEn: 'Hot (adjective modifier form)' },
        { role: '宾语', roleEn: 'Object', text: '걸로', meaning: '것으로的口语缩写：选这个', meaningEn: 'Colloquial abbreviation of 것으로: choose this one' },
        { role: '谓语', roleEn: 'predicate', text: '주세요', meaning: '请给我', meaningEn: 'Please give me' },
      ],
      tips: [
        '「~(으)로 주세요」表示「在选项中选…」，比单说「뜨거운 주세요」更自然。',
        '「걸로」= 것으로的口语省略，所有点单场景通用。',
      ],
      swaps: [
        {
          slot: '뜨거운',
          options: [
            { ko: '차가운', cn: '冰的', cnEn: 'Iced' },
            { ko: '따뜻한', cn: '温热的', cnEn: 'Warm' },
          ],
        },
      ],
      pitfall: '不能只说「뜨거운 주세요」——걸로(것으로)不能省略，否则语感很怪。口语最常用：아이스로요 / 뜨거운 걸로요。', pitfallEn: 'You can\'t just say \'뜨거운 주세요\' — 걸로(것으로) can\'t be omitted, or it sounds weird. In speech, the most common are: 아이스로요 / 뜨거운 걸로요.',
      upgrade: { ko: '뜨거운 것으로 주시겠어요?', cn: '（更委婉）能给我热的吗？', cnEn: '(More polite) Could I get it hot?' },
      downgrade: { ko: '뜨거운 걸로요.', cn: '（更简短）要热的。', cnEn: '(Shorter) I\'ll have it hot.' },
    },
    {
      ko: '샷 하나 추가해 주세요.',
      cn: '多加一份浓缩。', cnEn: 'Add an extra shot.',
      when: '想加浓缩时', whenEn: 'When you want to add a shot',
      formal: 'neutral',
      breakdown: [
        { role: '宾语', roleEn: 'Object', text: '샷', meaning: '浓缩（英语 shot）', meaningEn: 'Shot (from English \'shot\')' },
        { role: '修饰', roleEn: 'modify', text: '하나', meaning: '一份（独立使用时；量词前变한，如한 잔）', meaningEn: 'One (when used alone; becomes 한 before counters, e.g., 한 잔)' },
        { role: '谓语', roleEn: 'predicate', text: '추가해 주세요', meaning: '请加上（추가하다+주세요）', meaningEn: 'Please add (추가하다 + 주세요)' },
      ],
      tips: [
        '「V + 아/어 주세요」= 「请（帮我）做…」，最礼貌的请求形式。',
        '추가(追加)是汉字词，跟中文"追加"完全同源。',
      ],
      swaps: [
        {
          slot: '하나',
          options: [
            { ko: '두 개', cn: '两份', cnEn: 'Two' },
            { ko: '세 개', cn: '三份', cnEn: 'Three' },
          ],
        },
        {
          slot: '추가해',
          options: [
            { ko: '빼고', cn: '去掉', cnEn: 'Remove' },
            { ko: '넣어서', cn: '加入', cnEn: 'Add' },
          ],
        },
      ],
      pitfall: '「샷」用「개/하나/두 개」计数，不能用「잔」——「잔」只用于杯装饮料，说「샷 한 잔」是错的。', pitfallEn: '\'샷\' is counted with \'개/하나/두 개\', not \'잔\' — \'잔\' is only for cup drinks, so \'샷 한 잔\' is wrong.',
      upgrade: { ko: '샷 하나 추가해 주실 수 있을까요?', cn: '（极度礼貌）能帮我加一份浓缩吗？', cnEn: '(Very polite) Could I get an extra shot of espresso?' },
      downgrade: { ko: '샷 하나 더요.', cn: '再加一份浓缩。（随意口语）', cnEn: 'Add another shot of espresso. (Casual)' },
    },
    {
      ko: '시럽 빼고 주세요.',
      cn: '不要糖浆。', cnEn: 'No syrup.',
      when: '要去掉某种原料时', whenEn: 'When removing an ingredient',
      formal: 'neutral',
      breakdown: [
        { role: '宾语', roleEn: 'Object', text: '시럽', meaning: '糖浆', meaningEn: 'Syrup' },
        { role: '修饰', roleEn: 'modify', text: '빼고', meaning: '去掉（빼다的연결형）', meaningEn: 'Remove (connective form of 빼다)' },
        { role: '谓语', roleEn: 'predicate', text: '주세요', meaning: '请', meaningEn: 'Please' },
      ],
      tips: [
        '「N 빼고」= 「去掉 N」，빼다（去除）+ 연결어미 -고。',
        '相反用「N 넣어서 주세요」=「加上 N」。',
      ],
      swaps: [
        {
          slot: '시럽',
          options: [
            { ko: '얼음', cn: '冰', cnEn: 'ice' },
            { ko: '휘핑크림', cn: '奶油', cnEn: 'Whipped cream' },
            { ko: '헤이즐넛 시럽', cn: '榛果糖浆', cnEn: 'Hazelnut syrup' },
            { ko: '바닐라 시럽', cn: '香草糖浆', cnEn: 'Vanilla syrup' },
          ],
        },
      ],
      pitfall: '「빼고 주세요」中的「고」表并列连接（去掉 X 再给我），别写成「빼서」——「빼서」是先做再做的顺序连接，语感偏「先拿掉 X 之后」，用在点单里不自然。', pitfallEn: 'In \'빼고 주세요\', \'고\' indicates a parallel connection (remove X and give it to me). Don\'t use \'빼서\'—that\'s a sequential connection meaning \'after removing X first,\' which sounds unnatural when ordering.',
      upgrade: { ko: '시럽 빼고 주실 수 있을까요?', cn: '（极度礼貌）能帮我去掉糖浆吗？', cnEn: '(Very polite) Could you leave out the syrup?' },
      downgrade: { ko: '시럽 빼주세요.', cn: '（口语更短）不要糖浆。', cnEn: '(Shorter, casual) No syrup.' },
    },
    {
      ko: '테이크아웃이요.',
      cn: '外带。', cnEn: 'To go.',
      when: '结账前告知店员外带时', whenEn: 'When telling the staff you want takeout before paying',
      formal: 'casual',
      breakdown: [
        { role: '主语', roleEn: 'Subject', text: '테이크아웃', meaning: '外带（英语 takeout）', meaningEn: 'Takeout (from English \'takeout\')' },
        { role: '谓语', roleEn: 'predicate', text: '이요', meaning: '是…（省略句口语敬语）', meaningEn: 'It\'s... (elliptical, polite casual)' },
      ],
      tips: [
        '「~이요/예요」是 입니다的口语敬语，答复店员最省事。',
        '有받침（如 테이크아웃，끝 ㅅ）接이요；无받침接예요（커피예요）。',
      ],
      swaps: [
        {
          slot: '테이크아웃',
          options: [
            { ko: '포장', cn: '打包（更口语）', cnEn: 'To-go (more casual)' },
            { ko: '매장', cn: '堂食', cnEn: 'For here' },
          ],
        },
      ],
      pitfall: '이요 vs 예요：받침 있으면 이요，없으면 예요。테이크아웃 ends with ㅅ → 이요✓',
      upgrade: { ko: '테이크아웃으로 해주세요.', cn: '请帮我做外带。（更完整）', cnEn: 'Please make it to-go. (More complete)' },
      downgrade: { ko: '포장이요.', cn: '打包。（更简短，韩国人更常说）', cnEn: 'To-go. (Shorter, more common in Korea)' },
    },
    {
      ko: '카드로 결제할게요.',
      cn: '用卡结账。', cnEn: 'Pay by card.',
      when: '告知结账方式时', whenEn: 'When stating your payment method',
      formal: 'neutral',
      breakdown: [
        { role: '修饰', roleEn: 'modify', text: '카드로', meaning: '用卡（카드 + 助词로）', meaningEn: 'By card (카드 + particle 로)' },
        { role: '谓语', roleEn: 'predicate', text: '결제할게요', meaning: '我会结账（意愿句尾 ㄹ게요）', meaningEn: 'I\'ll pay (intentional ending ㄹ게요)' },
      ],
      tips: [
        '助词「(으)로」表工具/手段，「用…做」。',
        '「-(으)ㄹ게요」是「我打算…」的意愿句尾，比할 거예요更亲切。',
      ],
      swaps: [
        {
          slot: '카드로',
          options: [
            { ko: '현금으로', cn: '用现金', cnEn: 'With cash' },
            { ko: '카카오페이로', cn: '用KakaoPay', cnEn: 'With KakaoPay' },
            { ko: '삼성페이로', cn: '用SamsungPay', cnEn: 'With SamsungPay' },
          ],
        },
      ],
      pitfall: '工具助词 -로/-으로 看받침：无받침或ㄹ받침用「로」（카드로／서울로），其他辅音用「으로」（현금으로／손으로）。别搞反。',
      upgrade: { ko: '카드로 결제하겠습니다.', cn: '（更正式）用卡结账。', cnEn: '(More formal) I\'ll pay by card.' },
      downgrade: { ko: '카드로요.', cn: '刷卡。（最常用最简短）', cnEn: 'Card. (Most common and shortest)' },
    },
    {
      ko: '디카페인 있어요?',
      cn: '有无因咖啡因的吗？', cnEn: 'Do you have decaf?',
      when: '询问有没有某种选项时', whenEn: 'When asking if a certain option is available',
      formal: 'neutral',
      breakdown: [
        { role: '主语', roleEn: 'Subject', text: '디카페인', meaning: '低因咖啡（decaf）', meaningEn: 'decaf coffee' },
        { role: '谓语', roleEn: 'predicate', text: '있어요?', meaning: '有吗？（存在疑问句尾）', meaningEn: 'Is there? (question ending for existence)' },
      ],
      tips: [
        '「N 있어요?」是「有 N 吗？」的万能询问句型，疑问语调上扬。',
        '否定回答：없어요（没有）；肯定回답：네, 있어요（有）。',
      ],
      swaps: [
        {
          slot: '디카페인',
          options: [
            { ko: '바닐라 시럽', cn: '香草糖浆', cnEn: 'Vanilla syrup' },
            { ko: '두유', cn: '豆奶', cnEn: 'soy milk' },
            { ko: '화장실', cn: '洗手间', cnEn: 'Bathroom' },
            { ko: '와이파이', cn: 'WiFi' },
          ],
        },
      ],
      pitfall: '问菜单有没有用「있어요?」；问能不能做某事要用「돼요?」（如디카페인 돼요? 能做低因吗）。两者别混——问有无 vs 问是否可行。', pitfallEn: 'Use \'있어요?\' to ask if something\'s on the menu; use \'돼요?\' to ask if something can be done (e.g., 디카페인 돼요? Can you make it decaf?). Don\'t mix them up—asking about existence vs. feasibility.',
      upgrade: { ko: '혹시 디카페인 있으세요?', cn: '（更委婉）请问有低因的吗？', cnEn: '(More polite) Excuse me, do you have decaf?' },
      downgrade: { ko: '디카페인 돼요?', cn: '（更口语）低因可以吗？', cnEn: '(More casual) Is decaf okay?' },
    },
  ],
  responses: [
    {
      npcKo: '사이즈는 어떻게 해드릴까요?', npcCn: '尺寸要什么？', npcCnEn: 'What size would you like?',
      userKo: '큰 걸로요.', userCn: '要大杯。', userCnEn: 'I\'ll have a large.',
      correctNote: '「사이즈」问的是尺寸，用「큰/작은 걸로요」是最直接的回法。', correctNoteEn: '\'사이즈\' asks about size; replying with \'큰/작은 걸로요\' is the most direct way.',
      distractors: ['테이크아웃이요.', '카드로요.', '뜨거운 걸로요.'],
      distractorCn: ['打包带走。', '用卡。', '要热的。'],
      distractorNotes: [
        '这是回答「外带还是堂食」的，不是尺寸。',
        '这是回答「怎么结账」的，答错问题。',
        '这是回答「热还是冰」的，跟尺寸无关。',
      ],
    },
    {
      npcKo: '따뜻하게 드릴까요, 차갑게?', npcCn: '热的还是冰的？', npcCnEn: 'Hot or iced?',
      userKo: '아이스로요.', userCn: '要冰的。', userCnEn: 'Iced, please.',
      correctNote: '口语说「아이스로요」比「차가운 걸로요」更常听到、更地道。', correctNoteEn: 'In spoken Korean, \'아이스로요\' is more common and natural than \'차가운 걸로요\'.',
      distractors: ['큰 걸로요.', '포장이요.', '샷 추가요.'],
      distractorCn: ['要大的。', '打包。', '加浓缩。'],
      distractorNotes: [
        '这是回答尺寸的，不是温度。',
        '这是回答「打包还是堂食」的。',
        '这是加料需求，跟温度无关。',
      ],
    },
    {
      npcKo: '시럽 넣어드릴까요?', npcCn: '要加糖浆吗？', npcCnEn: 'Would you like syrup?',
      userKo: '아니요, 괜찮아요.', userCn: '不用，谢谢。', userCnEn: 'No, thank you.',
      correctNote: '「괜찮아요」是委婉拒绝的万能句，比「싫어요」礼貌得多。', correctNoteEn: '\'괜찮아요\' is a versatile polite refusal, much more courteous than \'싫어요\'.',
      distractors: ['네, 매장이요.', '카드로 할게요.', '작은 걸로요.'],
      distractorCn: ['是的，堂食。', '用卡。', '要小的。'],
      distractorNotes: [
        '「매장」是堂食，跟糖浆是两个问题。',
        '这是结账方式，答非所问。',
        '这是尺寸回答，跟糖浆无关。',
      ],
    },
    {
      npcKo: '매장에서 드세요?', npcCn: '在店里喝吗？', npcCnEn: 'For here?',
      userKo: '아니요, 포장이요.', userCn: '不，打包。', userCnEn: 'No, to go.',
      correctNote: '否认后加「포장이요」告诉店员要外带，一步到位。', correctNoteEn: 'After declining, add \'포장이요\' to tell the staff you want it to go—all in one step.',
      distractors: ['시럽 빼고요.', '뜨거운 걸로요.', '디카페인으로요.'],
      distractorCn: ['不加糖浆。', '要热的。', '要低咖啡因。'],
      distractorNotes: [
        '这是定制糖浆的话，跟堂食/外带无关。',
        '这是温度选择，答非所问。',
        '这是咖啡因选项，跟堂食无关。',
      ],
    },
    {
      npcKo: '포인트 있으세요?', npcCn: '有积分卡吗？', npcCnEn: 'Do you have a rewards card?',
      userKo: '아니요, 없어요.', userCn: '没有。', userCnEn: 'There isn\'t any.',
      correctNote: '「있어요? → 없어요」是「有 → 没有」的最自然对答。', correctNoteEn: '\'있어요? → 없어요\' is the most natural exchange for \'have → don\'t have\'.',
      distractors: ['아메리카노 주세요.', '큰 걸로요.', '아이스로요.'],
      distractorCn: ['请给美式咖啡。', '要大的。', '要冰的。'],
      distractorNotes: [
        '这是点单用语，此时已经在结账了。',
        '这是尺寸回答，跟积分卡无关。',
        '这是温度回答，跟积分卡无关。',
      ],
    },
    {
      npcKo: '결제는 어떻게 하시겠어요?', npcCn: '怎么结账？', npcCnEn: 'How do you pay?',
      userKo: '카드로요.', userCn: '刷卡。', userCnEn: 'Card.',
      correctNote: '简短「카드로요」= 「카드로 할게요」的口语省略，最常听到。', correctNoteEn: 'A short \'카드로요\' is the spoken abbreviation of \'카드로 할게요\'—the most common way to hear it.',
      distractors: ['매장이요.', '샷 하나 추가요.', '따뜻한 걸로요.'],
      distractorCn: ['堂食。', '加一份浓缩。', '要温的。'],
      distractorNotes: [
        '这是堂食回答，跟结账方式无关。',
        '这是加料需求，此时已经在结账了。',
        '这是温度回答，跟结账无关。',
      ],
    },
  ],
  chatTasks: [
    {
      label: '点单', labelEn: 'Order',
      emoji: '☕',
      hint: '告诉店员你想点什么，说出饮品名 + 数量', hintEn: 'Tell the staff what you want to order—state the drink name + quantity',
      suggestions: [
        '아메리카노 한 잔 주세요.',
        '카페라떼 주세요.',
        '바닐라라떼 한 잔 주세요.',
      ],
    },
    {
      label: '选尺寸', labelEn: 'Choose a size',
      emoji: '📏',
      hint: '店员问尺寸时，用「걸로」回答大杯或小杯', hintEn: 'When the staff asks about size, use \'걸로\' to answer large or small',
      suggestions: [
        '큰 걸로요.',
        '작은 걸로요.',
      ],
    },
    {
      label: '选温度', labelEn: 'Choose temperature',
      emoji: '🌡️',
      hint: '回答冰的还是热的。口语常说「아이스로요」', hintEn: 'Answer whether you want it iced or hot. In casual speech, people often say \'아이스로요\'',
      suggestions: [
        '아이스로요.',
        '뜨거운 걸로요.',
      ],
    },
    {
      label: '加料 / 定制', labelEn: 'Add-ons / Customize',
      emoji: '✨',
      hint: '要不要加浓缩、去糖浆、换低因？', hintEn: 'Want an extra shot, no syrup, or decaf?',
      suggestions: [
        '샷 하나 추가해 주세요.',
        '시럽 빼고 주세요.',
        '디카페인으로 해주세요.',
      ],
    },
    {
      label: '结账', labelEn: 'check, please',
      emoji: '💳',
      hint: '刷卡还是现金？告诉店员堂食还是外带', hintEn: 'Card or cash? Let the staff know if you\'re dining in or taking out',
      suggestions: [
        '카드로요.',
        '테이크아웃이요.',
        '매장에서 마실게요.',
      ],
    },
  ],
  dialogues: [
    {
      title: '对话 A · 简单点单', titleEn: 'Dialogue A · Simple Order',
      lines: [
        { role: 'npc', ko: '어서 오세요! 뭐 드릴까요?', cn: '欢迎光临！要什么？', cnEn: 'Welcome! What would you like?' },
        { role: 'user', ko: '아메리카노 한 잔 주세요.', cn: '请给我一杯美式。', cnEn: 'One Americano, please.' },
        { role: 'npc', ko: '사이즈는요?', cn: '尺寸呢？', cnEn: 'What size?' },
        { role: 'user', ko: '큰 걸로요.', cn: '要大杯。', cnEn: 'I\'ll have a large.' },
        { role: 'npc', ko: '따뜻하게 드릴까요?', cn: '要热的吗？', cnEn: 'Would you like it hot?' },
        { role: 'user', ko: '아이스로요.', cn: '要冰的。', cnEn: 'Iced, please.' },
        { role: 'npc', ko: '4,500원이에요. 결제는 어떻게 하세요?', cn: '4500韩元。怎么结账？', cnEn: 'That\'s 4,500 won. How would you like to pay?' },
        { role: 'user', ko: '카드로요.', cn: '刷卡。', cnEn: 'Card.' },
        { role: 'npc', ko: '감사합니다. 맛있게 드세요!', cn: '谢谢。请慢用！', cnEn: 'Thanks. Enjoy!' },
      ],
    },
    {
      title: '对话 B · 定制需求', titleEn: 'Dialogue B · Custom Order',
      lines: [
        { role: 'user', ko: '바닐라라떼 주세요. 시럽은 적게 넣어주세요.', cn: '请给我香草拿铁。糖浆少放。', cnEn: 'A vanilla latte, please. Light on the syrup.' },
        { role: 'npc', ko: '사이즈는 어떻게 해드릴까요?', cn: '尺寸要什么？', cnEn: 'What size would you like?' },
        { role: 'user', ko: '작은 걸로요. 그리고 디카페인으로 해주세요.', cn: '要小杯。还有，做低因的。', cnEn: 'Small size. And make it decaf.' },
        { role: 'npc', ko: '네, 알겠습니다. 매장에서 드세요?', cn: '好的，知道了。在店里喝吗？', cnEn: 'Okay, got it. Are you drinking it here?' },
        { role: 'user', ko: '아니요, 포장이요.', cn: '不，打包。', cnEn: 'No, to go.' },
      ],
    },
  ],
};
