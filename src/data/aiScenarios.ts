export interface FeedbackData {
  natural: string;
  grammarError: string;
  betterWay: string;
  wrongPart?: string;   // 用户原句中错误的子串，无错误返回 ""
  correctPart?: string; // 对应正确写法，无错误返回 ""
}

export interface ResponseHint {
  label: string;
  ko: string;
  zh: string;
}

export interface DialogExchange {
  ai: { ko: string; zh: string };
  feedback: FeedbackData;
  hints: ResponseHint[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  hint?: string;
  feedback?: FeedbackData;
}

export interface ScenarioData {
  id: string;
  emoji: string;
  nameZh: string;
  nameKo: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'daily' | 'kpop' | 'study';
  turns: number;
  opening: { ko: string; zh: string };
  closing: { ko: string; zh: string };
  exchanges?: DialogExchange[];
  newWords: string[];
  grammarErrors: number;
  systemHint?: string;
}

export const scenarios: ScenarioData[] = [
  {
    id: 'convenience',
    category: 'daily',
    emoji: '🏪',
    nameZh: '便利店购物',
    nameKo: '편의점',
    level: 'beginner',
    turns: 6,
    opening: {
      ko: '어서 오세요! 뭘 찾으세요?',
      zh: '欢迎光临！您要找什么？',
    },
    closing: {
      ko: '감사합니다, 또 오세요!',
      zh: '谢谢，欢迎再来！',
    },
    exchanges: [
      {
        ai: { ko: '아, 이건 신상품이에요. 정말 맛있어요!', zh: '啊，这是新品，真的很好吃哦！' },
        feedback: {
          natural: '很自然的回答！语法和用词都没问题。',
          grammarError: '注意 "뭘" 是 "무엇을" 的缩写，用于口语中。',
          betterWay: '可以说 "OO을/를 찾고 있어요" 更礼貌。',
          wrongPart: '찾아요', correctPart: '찾고 있어요',
        },
        hints: [
          { label: '直接说想买什么', ko: '이거 주세요. 얼마예요?', zh: '请给我这个。多少钱？' },
          { label: '先问问是什么', ko: '이게 뭐예요? 어떤 맛이에요?', zh: '这是什么？什么味道？' },
          { label: '礼貌拒绝再看看', ko: '아, 네. 좀 더 둘러볼게요.', zh: '啊好的。我再逛逛。' },
        ],
      },
      {
        ai: { ko: '몇 개 드릴까요? 하나에 천원이에요.', zh: '要几个？一个一千韩元。' },
        feedback: {
          natural: '数量表达很准确！',
          grammarError: '韩语计数要使用固有词数字（하나, 둘, 셋...）哦。',
          betterWay: '可以说 "OO개 주세요" 更自然。',
          wrongPart: '두개', correctPart: '두 개',
        },
        hints: [
          { label: '痛快下单', ko: '두 개 주세요.', zh: '请给我两个。' },
          { label: '确认价格再买', ko: '그럼 두 개 주세요. 총 2,000원이에요?', zh: '那给我两个。总共2000韩元吗？' },
          { label: '先买一个试试', ko: '하나만 주세요.', zh: '先给我一个吧。' },
        ],
      },
      {
        ai: { ko: '삼각김밥도 있어요. 드실래요?', zh: '也有三角饭团，要来一个吗？' },
        feedback: {
          natural: '很好的回答！',
          grammarError: '"있어요"表示存在，"있으세요"是敬语但一般不这么用。',
          betterWay: '"OO도 주세요" 可以用来加单。',
          wrongPart: '있으세요', correctPart: '있어요',
        },
        hints: [
          { label: '欣然接受推荐', ko: '네, 그럼 삼각김밥도 하나 주세요.', zh: '好的，那三角饭团也给我一个。' },
          { label: '好奇是什么口味', ko: '삼각김밥은 무슨 맛이에요?', zh: '三角饭团是什么口味的？' },
          { label: '够了不需要', ko: '아니요, 괜찮아요. 이거면 돼요.', zh: '不用了，没关系。这些就够了。' },
        ],
      },
      {
        ai: { ko: '더 필요한 거 있으세요? 음료수는요?', zh: '还需要别的吗？饮料呢？' },
        feedback: {
          natural: '表达很自然！',
          grammarError: '"됐어요" 表示"可以了/够了"，注意语气不要太生硬。',
          betterWay: '可以完整地说 "아니요, 이걸로 됐어요"（不用了，就这些）。',
          wrongPart: '충분해요', correctPart: '됐어요',
        },
        hints: [
          { label: '顺便买饮料', ko: '아, 그러면 콜라 한 캔도 주세요.', zh: '啊，那再给我一罐可乐。' },
          { label: '不需要了', ko: '아니요, 이걸로 충분해요.', zh: '不用了，这些足够了。' },
          { label: '问有没有别的饮品', ko: '음료수는 어떤 게 있어요?', zh: '饮料有哪些？' },
        ],
      },
      {
        ai: { ko: '네, 총 5,000원입니다. 결제 도와드릴게요.', zh: '好的，总共5000韩元。我来帮您结算。' },
        feedback: {
          natural: '很好的回答！用词得当。',
          grammarError: '无语法错误。',
          betterWay: '也可以说 "카드로 결제할게요"（我用卡支付）。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '刷卡', ko: '카드로 할게요.', zh: '我用卡支付。' },
          { label: '付现金', ko: '현금으로 할게요. 여기 있어요.', zh: '我用现金。给你。' },
          { label: '确认后付款', ko: '네, 5,000원이에요? 여기요.', zh: '好的，5000韩元吗？给你。' },
        ],
      },
    ],
    newWords: ['편의점', '신상품', '삼각김밥', '음료수', '결제'],
    grammarErrors: 1,
  },
  {
    id: 'restaurant',
    category: 'daily',
    emoji: '🍽️',
    nameZh: '餐厅点餐',
    nameKo: '식당 주문',
    level: 'beginner',
    turns: 8,
    opening: {
      ko: '어서 오세요! 몇 분이세요?',
      zh: '欢迎光临！请问几位？',
    },
    closing: {
      ko: '네, 계산 도와드리겠습니다. 감사합니다, 또 오세요!',
      zh: '好的，我帮您结账。谢谢，欢迎再来！',
    },
    exchanges: [
      {
        ai: {
          ko: '네, 두 분이세요. 이쪽으로 오세요. 여기 창가 자리 앉으세요.',
          zh: '好的，两位。这边请。坐窗边这个位置吧。',
        },
        feedback: {
          natural: '人数表达很自然！"두 명이에요" 是正确的表达。',
          grammarError: '"명"前面要用固有数字词（한, 두, 세...），不是汉字数字。',
          betterWay: '更礼貌可以说 "두 명이요" 省略 "예요"。',
          wrongPart: '이 명', correctPart: '두 명',
        },
        hints: [
          { label: '确认人数', ko: '네, 두 명이에요.', zh: '是的，两位。' },
          { label: '喜欢窗边位置', ko: '창가 자리 좋아요!', zh: '窗边位置很好！' },
          { label: '礼貌跟随', ko: '네, 감사합니다.', zh: '好的，谢谢。' },
        ],
      },
      {
        ai: {
          ko: '메뉴판 여기 있습니다. 천천히 고르세요. 무엇을 드시겠어요?',
          zh: '这是菜单，慢慢挑选。请问想吃点什么？',
        },
        feedback: {
          natural: '点餐表达很清晰！',
          grammarError: '"OO 주세요" 要加宾格助词 "을/를"——"비빔밥을 주세요"。',
          betterWay: '可以说 "비빔밥 하나 주세요" 加上量词"하나"更自然。',
          wrongPart: '비빔밥 주세요', correctPart: '비빔밥을 주세요',
        },
        hints: [
          { label: '直接点菜', ko: '비빔밥 하나 주세요.', zh: '请给我一份拌饭。' },
          { label: '询问推荐', ko: '여기서 제일 인기 있는 메뉴가 뭐예요?', zh: '这里最受欢迎的菜是什么？' },
          { label: '先看看再说', ko: '잠시만요, 좀 더 볼게요.', zh: '等一下，我再看看。' },
        ],
      },
      {
        ai: {
          ko: '네, 비빔밥 하나, 된장찌개 하나요. 더 필요한 거 있으세요?',
          zh: '好的，一份拌饭，一份大酱汤。还需要别的吗？',
        },
        feedback: {
          natural: '表达自然流畅，非常好！',
          grammarError: '注意序数词，如果点多份要说 "OO 둘 주세요"。',
          betterWay: '可以说 "그리고 OO도 주세요" 来追加点单。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '确认就行了', ko: '네, 그걸로 됐어요.', zh: '好的，就这些。' },
          { label: '再加点东西', ko: '김치 더 주세요.', zh: '再给我一些泡菜。' },
          { label: '问有没有别的', ko: '혹시 떡볶이도 있어요?', zh: '请问有炒年糕吗？' },
        ],
      },
      {
        ai: {
          ko: '반찬은 기본으로 나오고요, 물은 저쪽에 있어요. 셀프예요.',
          zh: '小菜是免费送的，饮水机在那边，是自助的。',
        },
        feedback: {
          natural: '回答很得体！',
          grammarError: '"알겠어요" 稍显生硬，用 "알겠습니다" 更正式。',
          betterWay: '可以说 "네, 알겠습니다. 감사합니다" 更礼貌。',
          wrongPart: '알겠어요', correctPart: '알겠습니다',
        },
        hints: [
          { label: '表示明白', ko: '네, 알겠습니다.', zh: '好的，明白了。' },
          { label: '问具体位置', ko: '물은 어디에 있어요?', zh: '水在哪里？' },
          { label: '感谢说明', ko: '설명해 주셔서 감사합니다.', zh: '谢谢您的说明。' },
        ],
      },
      {
        ai: {
          ko: '네, 조금만 기다려 주세요. 금방 준비해 드릴게요.',
          zh: '好的，请稍等。马上为您准备。',
        },
        feedback: {
          natural: '表达很自然！',
          grammarError: '"기다리다" 的敬语形式是 "기다리세요" 或 "기다려 주세요"。',
          betterWay: '可以说 "네, 천천히 하세요"（好的，慢慢来）表示不着急。',
          wrongPart: '기다려요', correctPart: '기다려 주세요',
        },
        hints: [
          { label: '表示不着急', ko: '네, 천천히 하세요.', zh: '好的，慢慢来。' },
          { label: '问要多久', ko: '얼마나 걸려요?', zh: '要多久？' },
          { label: '礼貌等候', ko: '네, 기다릴게요.', zh: '好的，我等。' },
        ],
      },
      {
        ai: {
          ko: '여기 비빔밥이랑 된장찌개 나왔습니다. 맛있게 드세요!',
          zh: '这是您的拌饭和大酱汤。请慢用！',
        },
        feedback: {
          natural: '回应很自然！韩国人用餐前常说这句话。',
          grammarError: '"잘 먹겠습니다" 是正确用法，注意不要和 "잘 먹었습니다" 混淆。',
          betterWay: '可以说 "잘 먹겠습니다! 감사합니다" 加上感谢更完整。',
          wrongPart: '잘 먹었습니다', correctPart: '잘 먹겠습니다',
        },
        hints: [
          { label: '开动', ko: '잘 먹겠습니다!', zh: '我会好好享用的！' },
          { label: '赞叹美食', ko: '와, 맛있어 보여요!', zh: '哇，看起来很好吃！' },
          { label: '感谢服务员', ko: '감사합니다!', zh: '谢谢！' },
        ],
      },
      {
        ai: {
          ko: '식사 다 하셨어요? 더 드릴 거 있으세요? 디저트는요?',
          zh: '吃好了吗？还需要什么吗？甜点呢？',
        },
        feedback: {
          natural: '回答很得体！',
          grammarError: '"잘 먹었어요" 是过去式，表示"吃好了/吃饱了"。',
          betterWay: '可以说 "잘 먹었습니다. 계산해 주세요" 直接请结账。',
          wrongPart: '먹었어요', correctPart: '잘 먹었습니다',
        },
        hints: [
          { label: '吃好了要结账', ko: '네, 잘 먹었습니다. 계산해 주세요.', zh: '是的，吃好了。请结账。' },
          { label: '还想看甜品', ko: '디저트 메뉴 좀 보여 주세요.', zh: '请给我看看甜品菜单。' },
          { label: '吃饱了结账', ko: '아니요, 배불러요. 계산할게요.', zh: '不用了，饱了。结账吧。' },
        ],
      },
    ],
    newWords: ['메뉴판', '비빔밥', '된장찌개', '반찬', '셀프', '계산', '디저트'],
    grammarErrors: 2,
  },
  {
    id: 'directions',
    category: 'daily',
    emoji: '🗺️',
    nameZh: '问路',
    nameKo: '길 찾기',
    level: 'beginner',
    turns: 5,
    opening: {
      ko: '실례합니다, 길 좀 물어봐도 될까요?',
      zh: '打扰一下，我可以问一下路吗？',
    },
    closing: {
      ko: '네, 조심히 가세요!',
      zh: '好的，请小心慢走！',
    },
    exchanges: [
      {
        ai: { ko: '아, 명동이요? 이쪽으로 쭉 직진하세요.', zh: '啊，去明洞吗？请往这边直走。' },
        feedback: {
          natural: '问路表达很自然！',
          grammarError: '"어디예요?" 是"在哪里？"的正确用法。',
          betterWay: '更礼貌可以说 "OO에 어떻게 가요?"',
          wrongPart: '어디있어요', correctPart: '어디예요',
        },
        hints: [
          { label: '确认目的地', ko: '네, 명동에 가고 싶어요.', zh: '是的，我想去明洞。' },
          { label: '问大概多远', ko: '여기서 멀어요?', zh: '离这里远吗？' },
          { label: '问怎么去', ko: '어떻게 가면 돼요?', zh: '怎么去呢？' },
        ],
      },
      {
        ai: { ko: '쭉 가시다가 두 번째 사거리에서 오른쪽으로 도세요.', zh: '一直走，在第二个十字路口右转。' },
        feedback: {
          natural: '确认很到位！',
          grammarError: '"몇 번째" 表示"第几个"，注意不要和 "몇 개" 混淆。',
          betterWay: '可以说 "두 번째 사거리요? 알겠습니다" 复述一遍以确认。',
          wrongPart: '몇 개', correctPart: '몇 번째',
        },
        hints: [
          { label: '复述确认', ko: '네, 두 번째 사거리에서 오른쪽이요. 알겠습니다.', zh: '好的，第二个十字路口右转，明白了。' },
          { label: '问要走多久', ko: '걸어서 얼마나 걸려요?', zh: '走路要多久？' },
          { label: '问附近地标', ko: '사거리 근처에 뭐가 있어요?', zh: '十字路口附近有什么？' },
        ],
      },
      {
        ai: { ko: '네, 맞아요. 오른쪽으로 돌면 바로 보일 거예요.', zh: '对，右转后马上就能看到。' },
        feedback: {
          natural: '回应很自然！',
          grammarError: '无语法错误。',
          betterWay: '可以说 "감사합니다! 큰 도움이 됐어요"（谢谢！帮大忙了）。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '表示感谢', ko: '감사합니다! 큰 도움이 됐어요.', zh: '谢谢！帮大忙了。' },
          { label: '确认一下时间', ko: '지금 가면 몇 분쯤 걸릴까요?', zh: '现在去的话大概要几分钟？' },
          { label: '问有没有捷径', ko: '혹시 더 빠른 길이 있어요?', zh: '请问有更快的路吗？' },
        ],
      },
      {
        ai: { ko: '아니요, 천천히 가도 10분이면 도착해요. 즐거운 여행 되세요!', zh: '没有，慢慢走10分钟也就到了。祝您旅途愉快！' },
        feedback: {
          natural: '回答很得体！',
          grammarError: '"감사합니다" 后面接 "안녕히 계세요" 很合适。',
          betterWay: '可以说 "네, 감사합니다! 안녕히 계세요" 完整告别。',
          wrongPart: '안녕히 가세요', correctPart: '안녕히 계세요',
        },
        hints: [
          { label: '礼貌告别', ko: '네, 감사합니다! 안녕히 계세요.', zh: '好的，谢谢！再见。' },
          { label: '说会好好逛逛', ko: '감사합니다! 명동에서 재미있게 놀게요.', zh: '谢谢！我会在明洞好好玩的。' },
          { label: '表达感激', ko: '정말 친절하시네요. 감사합니다!', zh: '您真亲切。谢谢！' },
        ],
      },
    ],
    newWords: ['실례합니다', '직진', '사거리', '오른쪽', '도움이 되다'],
    grammarErrors: 0,
  },
  {
    id: 'cafe',
    category: 'daily',
    emoji: '☕',
    nameZh: '咖啡厅',
    nameKo: '카페',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '안녕하세요! 주문 도와드릴게요. 어떤 걸로 드릴까요?',
      zh: '您好！我来帮您点单。想要点什么呢？',
    },
    closing: {
      ko: '맛있게 드세요! 또 오실 거죠? 기다릴게요~',
      zh: '请慢用！您还会来的吧？我等您哦~',
    },
    exchanges: [
      {
        ai: { ko: '아이스 아메리카노 좋은 선택이에요! 사이즈는 어떻게 해 드릴까요?', zh: '冰美式是个好选择！要什么杯型呢？' },
        feedback: {
          natural: '点单很自然！',
          grammarError: '"Tall 사이즈로 주세요" 中 "로" 的用法正确。',
          betterWay: '直接说 "Tall로 주세요" 省略 "사이즈" 更自然。',
          wrongPart: '사이즈 주세요', correctPart: 'Tall로 주세요',
        },
        hints: [
          { label: '直接选杯型', ko: 'Tall로 주세요. 얼음 많이 넣어 주세요.', zh: '请给我Tall杯。多加点冰。' },
          { label: '先问有哪些杯型', ko: '사이즈가 어떻게 돼요?', zh: '有哪些杯型？' },
          { label: '无所谓随便选', ko: '그냥 기본 사이즈로 주세요.', zh: '就默认杯型吧。' },
        ],
      },
      {
        ai: { ko: '네, 샷 추가는 안 하실래요? 한 잔에 500원 추가예요.', zh: '好的，要加shot吗？一杯加500韩元。' },
        feedback: {
          natural: '加shot表达很地道！',
          grammarError: '"샷 하나 추가해 주세요" 中 "추가하다" 直接加宾格。',
          betterWay: '可以说 "샷 하나만 추가해 주세요" 加上 "만" 更精确。',
          wrongPart: '샷 추가', correctPart: '샷 하나 추가해 주세요',
        },
        hints: [
          { label: '加shot', ko: '네, 샷 하나 추가해 주세요.', zh: '好的，请加一个shot。' },
          { label: '不加shot', ko: '아니요, 그냥 기본으로 할게요.', zh: '不用，就基本的吧。' },
          { label: '先问问苦不苦', ko: '원래도 쓴가요? 샷 추가하면 더 써요?', zh: '本来就苦吗？加shot更苦吗？' },
        ],
      },
      {
        ai: { ko: '매장에서 드실 거예요, 테이크아웃이세요?', zh: '您在店里喝，还是带走？' },
        feedback: {
          natural: '选择堂食的表达很自然！',
          grammarError: '"매장에서" 的 "에서" 表示动作进行的场所。',
          betterWay: '可以说 "여기서 마실게요" 更口语化。',
          wrongPart: '매장에 마실게요', correctPart: '매장에서 마실게요',
        },
        hints: [
          { label: '堂食', ko: '여기서 마실게요.', zh: '在这里喝。' },
          { label: '带走', ko: '테이크아웃으로 할게요.', zh: '带走。' },
          { label: '先问忙不忙', ko: '자리 있어요?', zh: '有座位吗？' },
        ],
      },
      {
        ai: { ko: '네, 영수증 드릴까요? 적립은 어떻게 해 드릴까요?', zh: '好的，要小票吗？积分怎么弄？' },
        feedback: {
          natural: '处理积分的表达很好！',
          grammarError: '"적립" 后面直接加宾格，说 "적립해 주세요"。',
          betterWay: '可以说 "전화번호로 적립해 주세요" 更完整。',
          wrongPart: '적립 해주세요', correctPart: '적립해 주세요',
        },
        hints: [
          { label: '手机号积分', ko: '전화번호로 적립해 주세요. 010-xxxx-xxxx.', zh: '请用手机号积分。' },
          { label: '没有积分卡', ko: '적립 안 해도 돼요. 영수증만 주세요.', zh: '不用积分了。请给我小票。' },
          { label: '有会员卡', ko: '멤버십 카드 있어요. 여기요.', zh: '我有会员卡。给你。' },
        ],
      },
      {
        ai: { ko: '아이스 아메리카노 한 잔 나왔습니다! 진동벨 드릴까요?', zh: '一杯冰美式好了！要给您震动铃吗？' },
        feedback: {
          natural: '回答很自然！',
          grammarError: '无语法错误。',
          betterWay: '可以说 "그냥 불러 주세요"（直接叫我吧）如果不想要震动铃。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '要震动铃', ko: '네, 진동벨 주세요.', zh: '好的，请给我震动铃。' },
          { label: '不要铃直接叫', ko: '괜찮아요. 그냥 불러 주세요.', zh: '没关系。直接叫我吧。' },
          { label: '已经在旁边等', ko: '괜찮아요. 여기서 기다릴게요.', zh: '没关系。我在这里等。' },
        ],
      },
      {
        ai: { ko: '네, 맛있게 드세요! 테이블은 저쪽에 있어요.', zh: '好的，请慢用！桌子在那边。' },
        feedback: {
          natural: '回应很得体！',
          grammarError: '"잘 마실게요" 是"我会好好喝的"的意思，和 "잘 먹을게요" 类似。',
          betterWay: '可以说 "감사합니다! 잘 마실게요" 加上感谢。',
          wrongPart: '잘 마셨어요', correctPart: '잘 마실게요',
        },
        hints: [
          { label: '感谢就坐', ko: '감사합니다! 잘 마실게요.', zh: '谢谢！我会好好品尝的。' },
          { label: '问WiFi', ko: '감사합니다! 와이파이 비밀번호가 뭐예요?', zh: '谢谢！WiFi密码是什么？' },
          { label: '找个好位置', ko: '네, 감사합니다! 창가 자리 갈게요.', zh: '好的，谢谢！我去窗边的位置。' },
        ],
      },
    ],
    newWords: ['아메리카노', '사이즈', '샷 추가', '매장', '테이크아웃', '적립', '진동벨'],
    grammarErrors: 0,
  },
  {
    id: 'fansign',
    category: 'kpop',
    emoji: '💜',
    nameZh: '粉丝签售会',
    nameKo: '팬사인회',
    level: 'advanced',
    turns: 6,
    opening: {
      ko: '안녕하세요! 팬사인회 오신 걸 환영합니다! 어떤 멤버 사인 받고 싶으세요?',
      zh: '您好！欢迎来到粉丝签售会！您想收到哪位成员的签名？',
    },
    closing: {
      ko: '오늘 와 주셔서 정말 감사합니다! 다음에 또 만나요~',
      zh: '今天真的非常感谢您的到来！下次再见~',
    },
    exchanges: [
      {
        ai: { ko: '아, 진짜 팬이시네요! 민수 씨가 이거 들으면 정말 기뻐할 거예요.', zh: '啊，您真是一位粉丝！民秀听到这个会很高兴的。' },
        feedback: {
          natural: '表达粉丝热情很自然！"진짜 팬" 的说法很地道。',
          grammarError: '"최애" 是"最爱的成员/本命"的缩写，粉丝圈常用词。',
          betterWay: '可以说 "민수 씨가 제 최애예요"（民秀是我的本命）。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '表达喜爱', ko: '네! 민수 씨가 제 최애예요. 정말 좋아해요!', zh: '是的！民秀是我的本命。我真的好喜欢他！' },
          { label: '说是海外来的', ko: '네, 저는 중국에서 왔어요. 민수 씨 보러 왔어요.', zh: '是的，我从中国来的。专程来看民秀。' },
          { label: '谦虚一点', ko: '네, 팬 된 지 얼마 안 됐는데 민수 씨가 제일 좋아요.', zh: '是的，刚成为粉丝不久，但最喜欢民秀。' },
        ],
      },
      {
        ai: { ko: '중국에서 오셨어요? 한국어 정말 잘하시네요! 발음이 좋아요.', zh: '您是从中国来的吗？韩语说得真好！发音很好。' },
        feedback: {
          natural: '谦虚回应很得体！',
          grammarError: '无语法错误。',
          betterWay: '被夸的时候说 "아직 많이 부족해요"（还差得远呢）是韩国常见的谦虚说法。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '谦虚回应', ko: '아니에요, 아직 많이 부족해요.', zh: '哪里哪里，还差得远呢。' },
          { label: '说是为了追星学的', ko: '한국어 공부한 이유가 바로 이거예요!', zh: '学韩语就是为了这个！' },
          { label: '回夸对方', ko: '감사합니다! 선생님도 중국어 잘하시네요?', zh: '谢谢！您中文也很好吗？' },
        ],
      },
      {
        ai: { ko: '민수 씨가 5분 후에 나올 거예요. 조금만 기다려 주세요!', zh: '民秀5分钟后出来。请稍等一下！' },
        feedback: {
          natural: '表达期待很自然！',
          grammarError: '"기대돼요" 是从 "기대되다（期待）" 来的，注意不是 "기대해요"。',
          betterWay: '可以说 "너무 설레요!"（好激动！）表达兴奋。',
          wrongPart: '기대해요', correctPart: '기대돼요',
        },
        hints: [
          { label: '表示期待', ko: '네, 기대돼요! 너무 설레요!', zh: '好的，好期待！太激动了！' },
          { label: '耐心等待', ko: '네, 천천히 기다릴게요.', zh: '好的，我会慢慢等。' },
          { label: '表达感谢', ko: '오늘 정말 감사합니다! 평생 잊지 못할 거예요.', zh: '今天真的非常感谢！永生难忘。' },
        ],
      },
    ],
    newWords: ['팬사인회', '멤버', '매력적', '사인', '발음', '기대되다', '설레다'],
    grammarErrors: 0,
  },
  {
    id: 'pharmacy',
    category: 'daily',
    emoji: '💊',
    nameZh: '药店买药',
    nameKo: '약국',
    level: 'beginner',
    turns: 4,
    opening: {
      ko: '어서 오세요! 어떻게 오셨어요?',
      zh: '欢迎光临！请问有什么需要？',
    },
    closing: {
      ko: '빨리 나으세요! 또 오세요.',
      zh: '祝您早日康复！欢迎再来。',
    },
    exchanges: [
      {
        ai: { ko: '아, 감기 증상이 있으시군요. 목이 아프세요, 아니면 코가 막히세요?', zh: '啊，您有感冒症状呀。是喉咙痛，还是鼻塞？' },
        feedback: {
          natural: '描述症状很自然！',
          grammarError: '"아파요" 是基本形，描述身体部位疼痛用 "OO이/가 아파요"。',
          betterWay: '可以说 "목이 아프고 열도 있어요"（喉咙痛而且还发烧）更完整。',
          wrongPart: '아파요', correctPart: '목이 아파요',
        },
        hints: [
          { label: '描述喉咙痛', ko: '목이 아프고 열이 좀 있어요.', zh: '喉咙痛，还有点发烧。' },
          { label: '鼻塞头痛', ko: '코가 막히고 머리가 아파요.', zh: '鼻塞，头也痛。' },
          { label: '全身不舒服', ko: '몸살 기운이 있어요. 으슬으슬해요.', zh: '感觉浑身酸痛，发冷。' },
        ],
      },
      {
        ai: { ko: '알겠습니다. 종합감기약 드릴게요. 하루에 세 번 드세요.', zh: '好的。我给您综合感冒药。一天吃三次。' },
        feedback: {
          natural: '回应很自然！',
          grammarError: '"몇 번" 表示几次，"하루에 세 번" 是"一天三次"的正确说法。',
          betterWay: '可以说 "식후에 드시면 더 좋아요"（饭后吃效果更好）追问用法。',
          wrongPart: '세번', correctPart: '세 번',
        },
        hints: [
          { label: '确认用法', ko: '네, 알겠습니다. 식후에 먹으면 돼요?', zh: '好的，明白了。饭后吃就行吗？' },
          { label: '问副作用', ko: '이 약 졸려요?', zh: '这药会犯困吗？' },
          { label: '问价格', ko: '얼마예요?', zh: '多少钱？' },
        ],
      },
      {
        ai: { ko: '네, 식후 30분에 드시면 좋아요. 물 많이 드시고요.', zh: '好的，饭后30分钟吃最好。多喝水。' },
        feedback: {
          natural: '理解并回应很得体！',
          grammarError: '"알겠습니다" 比 "알겠어요" 更正式，药店等场合用前者更礼貌。',
          betterWay: '可以说 "네, 알겠습니다. 감사합니다" 表示感谢。',
          wrongPart: '알겠어요', correctPart: '알겠습니다',
        },
        hints: [
          { label: '表示明白', ko: '네, 알겠습니다. 감사합니다!', zh: '好的，明白了。谢谢！' },
          { label: '再问一下', ko: '하루에 몇 번이요? 다시 한 번 말씀해 주세요.', zh: '一天几次？请再说一遍。' },
          { label: '补充问题', ko: '어린이도 먹을 수 있어요?', zh: '小孩也能吃吗？' },
        ],
      },
      {
        ai: { ko: '총 8,000원입니다. 카드 되세요?', zh: '总共8000韩元。可以刷卡吗？' },
        feedback: {
          natural: '付款表达很自然！',
          grammarError: '无语法错误。',
          betterWay: '可以说 "카드로 할게요" 或 "현금으로 할게요" 明确支付方式。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '刷卡', ko: '네, 카드로 할게요.', zh: '好的，刷卡。' },
          { label: '付现金', ko: '현금으로 할게요. 여기 있어요.', zh: '付现金。给你。' },
          { label: '问能不能用手机支付', ko: '카카오페이 돼요?', zh: '可以用KakaoPay吗？' },
        ],
      },
    ],
    newWords: ['약국', '감기', '증상', '종합감기약', '식후', '처방전'],
    grammarErrors: 1,
  },
  {
    id: 'subway',
    category: 'daily',
    emoji: '🚇',
    nameZh: '地铁问路',
    nameKo: '지하철',
    level: 'beginner',
    turns: 4,
    opening: {
      ko: '실례합니다, 지하철 타는 곳이 어디예요?',
      zh: '打扰一下，请问地铁站在哪里？',
    },
    closing: {
      ko: '잘 찾아가세요! 즐거운 여행 되세요~',
      zh: '祝您顺利找到！旅途愉快~',
    },
    exchanges: [
      {
        ai: { ko: '지하철역이요? 저쪽 횡단보도 건너서 왼쪽으로 가시면 돼요.', zh: '地铁站吗？过那边的斑马线左转就到了。' },
        feedback: {
          natural: '确认理解的表达很自然！',
          grammarError: '"건너다" 的连接形是 "건너서"，表示先过马路再转向。',
          betterWay: '可以复述 "횡단보도 건너서 왼쪽이요? 감사합니다" 确认方向。',
          wrongPart: '건너고', correctPart: '건너서',
        },
        hints: [
          { label: '复述确认', ko: '횡단보도 건너서 왼쪽이요? 감사합니다!', zh: '过斑马线左转对吗？谢谢！' },
          { label: '问大概多久', ko: '걸어서 얼마나 걸려요?', zh: '走路要多久？' },
          { label: '问有没有出口', ko: '몇 번 출구예요?', zh: '是几号出口？' },
        ],
      },
      {
        ai: { ko: '네, 걸어서 5분이에요. 2호선 타시려고요?', zh: '对，走路5分钟。您要坐2号线吗？' },
        feedback: {
          natural: '回应很自然！',
          grammarError: '"몇 호선" 是"几号线"，"2호선" 是"2号线"。',
          betterWay: '可以说 "네, 홍대 가려고요" 说明目的地更清楚。',
          wrongPart: '2번 호선', correctPart: '2호선',
        },
        hints: [
          { label: '说目的地', ko: '네, 홍대 가려고요. 어디서 타요?', zh: '对，我要去弘大。在哪里坐？' },
          { label: '确认换乘', ko: '환승해야 해요?', zh: '需要换乘吗？' },
          { label: '问票价', ko: '얼마예요? 교통카드 있어요.', zh: '多少钱？我有交通卡。' },
        ],
      },
      {
        ai: { ko: '홍대요? 2호선 타고 세 정거장이에요. 환승 없이 바로 가요.', zh: '弘大吗？坐2号线三站就到，不用换乘。' },
        feedback: {
          natural: '感谢表达很真诚！',
          grammarError: '"정거장" 是站的意思，"세 정거장" 是"三站"的正确说法。',
          betterWay: '可以说 "정말 감사합니다! 덕분에 찾았어요"（多亏了您才找到）更地道。',
          wrongPart: '세개 역', correctPart: '세 정거장',
        },
        hints: [
          { label: '感谢告别', ko: '감사합니다! 덕분에 찾았어요.', zh: '谢谢！多亏了您。' },
          { label: '再确认一次', ko: '2호선, 세 정거장이요. 알겠습니다!', zh: '2号线，三站。明白了！' },
          { label: '问末班车', ko: '막차가 몇 시예요?', zh: '末班车几点？' },
        ],
      },
      {
        ai: { ko: '네, 막차는 밤 12시예요. 서두르세요!', zh: '对，末班车是晚上12点。快去吧！' },
        feedback: {
          natural: '回应很得体！',
          grammarError: '无语法错误。',
          betterWay: '可以说 "네, 감사합니다! 빨리 갈게요"（好的，谢谢！我赶紧去）。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '道谢告别', ko: '네, 감사합니다! 빨리 갈게요.', zh: '好的，谢谢！我赶紧去。' },
          { label: '表示放心', ko: '다행이에요. 시간 있네요. 감사합니다!', zh: '太好了，还有时间。谢谢！' },
          { label: '礼貌道别', ko: '정말 친절하세요. 안녕히 계세요!', zh: '您真亲切。再见！' },
        ],
      },
    ],
    newWords: ['지하철', '횡단보도', '호선', '정거장', '환승', '막차'],
    grammarErrors: 0,
  },
  {
    id: 'kpop_talk',
    category: 'kpop',
    emoji: '🎵',
    nameZh: '和朋友聊KPOP',
    nameKo: 'K팝 이야기',
    level: 'intermediate',
    turns: 5,
    opening: {
      ko: '야, 너 요즘 어떤 아이돌 좋아해?',
      zh: '哎，你最近喜欢哪个偶像？',
    },
    closing: {
      ko: '그렇구나! 나중에 같이 콘서트 가자~',
      zh: '原来如此！下次一起去演唱会吧~',
    },
    exchanges: [
      {
        ai: { ko: '오, 진짜? 나도 그 팀 좋아해! 최애 멤버가 누구야?', zh: '哦，真的吗？我也喜欢那个团！你的本命是谁？' },
        feedback: {
          natural: '粉丝对话表达很自然！',
          grammarError: '"최애" 是"最爱"的缩写，是粉丝圈常用词。',
          betterWay: '可以说 "내 최애는 OOO이야" 更直接地表达本命。',
          wrongPart: '제일 좋아하는 멤버', correctPart: '최애 멤버',
        },
        hints: [
          { label: '说本命', ko: '내 최애는 지민이야. 너무 매력 있어!', zh: '我的本命是智敏。太有魅力了！' },
          { label: '说喜欢整个团', ko: '다 좋아서 최애를 못 정하겠어.', zh: '都喜欢，没办法定本命。' },
          { label: '说最近才入坑', ko: '최근에 입덕해서 아직 잘 모르겠어.', zh: '最近才入坑，还不太了解。' },
        ],
      },
      {
        ai: { ko: '지민 진짜 댄스 실력이 대박이지! 최근 컴백 봤어?', zh: '智敏的舞技真的绝了！你看了最近的回归了吗？' },
        feedback: {
          natural: '评价偶像的表达很地道！',
          grammarError: '"봤어" 是过去式口语，朋友间用 "봤어?" 比 "봤어요?" 更自然。',
          betterWay: '可以说 "응, 뮤비 열 번은 봤어!"（嗯，MV看了至少十遍！）表达热情。',
          wrongPart: '봤어요', correctPart: '봤어',
        },
        hints: [
          { label: '说看了好多遍', ko: '응, 뮤비 완전 대박이지 않아? 열 번은 봤어!', zh: '嗯，MV是不是超级棒？我看了十遍了！' },
          { label: '没来得及看', ko: '아직 못 봤어. 스포 하지 마!', zh: '还没看呢。别剧透！' },
          { label: '表达期待', ko: '봤지! 이번 무대 진짜 기대됐어.', zh: '看了！这次的舞台真的很期待。' },
        ],
      },
      {
        ai: { ko: '맞아! 이번 앨범 완전 좋던데. 타이틀 곡 계속 듣고 있어.', zh: '对！这次的专辑真的很好。主打歌一直在听。' },
        feedback: {
          natural: '音乐评价表达很自然！',
          grammarError: '"듣고 있어" 是现在进行时，表示"正在听/一直在听"，用法正确。',
          betterWay: '可以说 "나도 수록곡도 다 좋아"（我连收录曲都喜欢）来深化讨论。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说最喜欢哪首', ko: '나는 수록곡 중에 OOO이 제일 좋아.', zh: '我最喜欢收录曲里的OOO。' },
          { label: '说一直在单曲循环', ko: '타이틀 곡 완전 중독성 있어. 머리에서 안 떠나.', zh: '主打歌太洗脑了。脑子里挥不去。' },
          { label: '问对方最喜欢哪首', ko: '너는 어떤 곡 제일 좋아?', zh: '你最喜欢哪首歌？' },
        ],
      },
      {
        ai: { ko: '그러게! 혹시 팬미팅 갈 생각 있어? 다음 달에 있대.', zh: '就是！你有想过去粉丝见面会吗？听说下个月有。' },
        feedback: {
          natural: '表达计划和意愿很自然！',
          grammarError: '"가고 싶어" 是"想去"，"갈 생각이 있어" 是"有去的想法"，两者都正确。',
          betterWay: '可以说 "같이 가자! 티켓팅 같이 해줄게"（一起去吧！我帮你一起抢票）。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说想一起去', ko: '완전 가고 싶어! 같이 가자!', zh: '超想去！一起去吧！' },
          { label: '说票很难抢', ko: '가고 싶은데 티켓팅이 너무 어려워.', zh: '想去，但是抢票太难了。' },
          { label: '问票价', ko: '티켓 얼마야? 자리마다 다르지?', zh: '票多少钱？不同位置不一样吧？' },
        ],
      },
      {
        ai: { ko: '나도 같이 가고 싶어! 티켓팅 같이 도전해 보자!', zh: '我也想一起去！一起去试试抢票吧！' },
        feedback: {
          natural: '约定一起行动的表达很自然！',
          grammarError: '"같이 해보자" 是邀请对方一起做某事，"도전하다" 是"挑战"，搭配很地道。',
          betterWay: '可以说 "좋아! 미리 연습해 놓자"（好！提前练习一下吧）表示认真准备。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '爽快答应', ko: '좋아! 미리 연습해 놓자. 꼭 성공하자!', zh: '好！提前练练。一定要成功！' },
          { label: '表示紧张', ko: '긴장되는데... 그래도 해보자!', zh: '有点紧张……但还是试试吧！' },
          { label: '说好期待', ko: '진짜 설레다! 꼭 같이 가자~', zh: '真的好激动！一定要一起去哦~' },
        ],
      },
    ],
    newWords: ['아이돌', '최애', '입덕', '컴백', '뮤비', '타이틀 곡', '팬미팅', '티켓팅'],
    grammarErrors: 0,
  },
  {
    id: 'job_interview',
    category: 'study',
    emoji: '💼',
    nameZh: '打工面试',
    nameKo: '아르바이트 면접',
    level: 'intermediate',
    turns: 6,
    opening: {
      ko: '안녕하세요! 오늘 면접에 오셨군요. 먼저 간단하게 자기소개 해 주세요.',
      zh: '你好！今天来面试啊。先简单做个自我介绍吧。',
    },
    closing: {
      ko: '오늘 면접 수고하셨습니다! 결과는 내일 연락드릴게요.',
      zh: '今天面试辛苦了！结果明天联系您。',
    },
    exchanges: [
      {
        ai: { ko: '네, 잘 알겠습니다. 혹시 편의점이나 서비스 관련 아르바이트 경험이 있으신가요?', zh: '好的，了解了。请问有便利店或服务相关的打工经验吗？' },
        feedback: {
          natural: '自我介绍结构完整，用了正确的敬语。',
          grammarError: '',
          betterWay: '可以加上 "잘 부탁드립니다"（请多关照）让自我介绍更完整。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说有经验', ko: '네, 작년에 카페에서 6개월 일한 적이 있습니다.', zh: '有的，去年在咖啡店工作过6个月。' },
          { label: '说没经验', ko: '아직 경험은 없지만 열심히 하겠습니다.', zh: '还没有经验，但我会努力的。' },
          { label: '说在学习', ko: '아르바이트는 처음이지만 한국어를 열심히 공부하고 있습니다.', zh: '第一次打工，但我在认真学韩语。' },
        ],
      },
      {
        ai: { ko: '그렇군요. 그럼 일주일에 며칠, 어느 시간대에 일하실 수 있나요?', zh: '原来如此。那一周几天、什么时间段可以上班呢？' },
        feedback: {
          natural: '说明工作经验很自然，逻辑清晰。',
          grammarError: '',
          betterWay: '可以补充说 "성실하게 일했습니다"（我工作很认真）来加分。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说周末可以', ko: '주말은 항상 가능하고, 평일은 수업 후인 저녁 6시 이후에 가능합니다.', zh: '周末一直可以，平日下课后6点以后可以。' },
          { label: '说早班可以', ko: '아침 수업이 없는 날은 오전 9시부터 가능합니다.', zh: '没有早课的日子，早上9点开始可以。' },
          { label: '说很灵活', ko: '스케줄은 유연하게 맞출 수 있습니다. 필요한 시간에 맞추겠습니다.', zh: '时间上可以灵活配合，按需要的时间来。' },
        ],
      },
      {
        ai: { ko: '편의점에는 가끔 불만을 가진 손님이 오시기도 해요. 그런 상황에서 어떻게 하실 것 같아요?', zh: '便利店有时会来有不满的顾客。遇到那种情况你会怎么做呢？' },
        feedback: {
          natural: '时间说明清楚，用词正确。',
          grammarError: '',
          betterWay: '可以加上 "주 X일 정도면 딱 좋을 것 같아요"（一周X天左右正好）让回答更具体。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说先道歉', ko: '먼저 죄송하다고 말씀드리고, 손님의 말씀을 잘 듣겠습니다.', zh: '先道歉，然后认真听顾客说的话。' },
          { label: '说报告上级', ko: '혼자 해결하기 어려우면 점장님께 바로 도움을 요청하겠습니다.', zh: '自己难以解决的话，马上向店长寻求帮助。' },
          { label: '说保持冷静', ko: '침착하게 대응하고, 손님이 만족하실 수 있도록 최선을 다하겠습니다.', zh: '冷静应对，尽力让顾客满意。' },
        ],
      },
      {
        ai: { ko: '좋아요. 그리고 시급은 최저 시급으로 시작하는데 괜찮으세요? 수습 기간은 한 달이에요.', zh: '好的。另外工资从最低时薪开始，可以吗？试用期是一个月。' },
        feedback: {
          natural: '回答思路清晰，态度积极。',
          grammarError: '',
          betterWay: '可以说 "고객 응대 경험을 통해 배우고 싶습니다"（想通过接待顾客来学习）表现学习意愿。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说可以接受', ko: '네, 괜찮습니다. 경험을 쌓는 게 더 중요하니까요.', zh: '好的，没问题。积累经验更重要。' },
          { label: '问涨薪可能', ko: '수습 후에 시급이 올라갈 수도 있나요?', zh: '试用期结束后时薪有可能涨吗？' },
          { label: '确认细节', ko: '네, 알겠습니다. 주휴수당도 포함인가요?', zh: '好的，了解了。包含周休津贴吗？' },
        ],
      },
      {
        ai: { ko: '네, 열심히 하실 것 같아서 저희 쪽에서도 긍정적으로 검토할게요. 혹시 저한테 궁금한 점 있으세요?', zh: '好的，感觉你会认真工作，我们这边也会积极考虑。你有什么想问我的吗？' },
        feedback: {
          natural: '谈条件时表现出诚意和学习态度很好。',
          grammarError: '',
          betterWay: '可以用 "잘 부탁드립니다" 表示期待录用，印象会更好。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '问上班时间', ko: '보통 한 번 근무할 때 몇 시간씩 일하게 되나요?', zh: '通常每次上班工作几个小时？' },
          { label: '问团队', ko: '같이 일하는 분들은 몇 분이세요?', zh: '一起工作的有几个人？' },
          { label: '表示期待', ko: '특별히 없습니다. 잘 부탁드립니다! 열심히 하겠습니다.', zh: '没有特别的问题。请多关照！我会努力的。' },
        ],
      },
    ],
    newWords: ['아르바이트', '자기소개', '시급', '최저 시급', '수습 기간', '주휴수당', '손님', '점장'],
    grammarErrors: 2,
  },
  {
    id: 'hospital',
    category: 'daily',
    emoji: '🏥',
    nameZh: '医院看诊',
    nameKo: '병원 진료',
    level: 'advanced',
    turns: 5,
    opening: {
      ko: '어디가 불편해서 오셨어요? 증상이 언제부터 시작됐나요?',
      zh: '哪里不舒服来的？症状是从什么时候开始的？',
    },
    closing: {
      ko: '빨리 나으세요! 약 꼭 챙겨 드시고요.',
      zh: '祝您早日康复！药一定要按时吃哦。',
    },
    exchanges: [
      {
        ai: { ko: '열은 있으세요? 혹시 기침이나 콧물도 나오나요?', zh: '有发烧吗？有没有咳嗽或流鼻涕？' },
        feedback: {
          natural: '描述症状准确，时间说明清楚。',
          grammarError: '',
          betterWay: '可以加上 "많이 힘들어요"（很难受）让症状描述更有感情，医生会更重视。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说有发烧', ko: '네, 어젯밤부터 열이 나고 몸살도 있어요.', zh: '有，从昨晚开始发烧，全身也酸痛。' },
          { label: '说没发烧', ko: '열은 없는데 목이 많이 아프고 기침이 계속 나요.', zh: '没发烧，但喉咙很痛，一直咳嗽。' },
          { label: '说多种症状', ko: '열도 있고, 기침도 나고, 머리도 아파요.', zh: '发烧，咳嗽，头也疼。' },
        ],
      },
      {
        ai: { ko: '알겠습니다. 평소에 드시는 약이 있으신가요? 알레르기는요?', zh: '明白了。平时有在吃什么药吗？有过敏史吗？' },
        feedback: {
          natural: '回答症状细节很完整，医生能清楚了解状况。',
          grammarError: '',
          betterWay: '可以说 "목이 칼칼해요"（喉咙刺痛）或 "코가 막혀요"（鼻塞）等更具体的表达。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '说没有', ko: '특별히 먹는 약은 없고, 알레르기도 없어요.', zh: '没有特别在吃的药，过敏史也没有。' },
          { label: '说有过敏', ko: '페니실린 알레르기가 있어요. 다른 약은 괜찮아요.', zh: '有青霉素过敏。其他药没问题。' },
          { label: '说在吃药', ko: '혈압약을 먹고 있어요. 알레르기는 없어요.', zh: '在吃降压药。没有过敏史。' },
        ],
      },
      {
        ai: { ko: '진찰해 보겠습니다. 목이 많이 부었네요. 독감은 아니고 급성 인두염 같습니다. 많이 힘드셨겠어요.', zh: '我来检查一下。喉咙肿得很厉害。不是流感，像是急性咽炎。一定很难受吧。' },
        feedback: {
          natural: '用药信息说明清楚，没有遗漏重要信息。',
          grammarError: '',
          betterWay: '可以问 "혹시 심각한 건 아니죠?"（不严重吧？）表现对病情的关心。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '问严重性', ko: '많이 심각한가요? 금방 나을 수 있을까요?', zh: '严重吗？能很快好吗？' },
          { label: '问治疗方法', ko: '어떻게 치료해야 하나요? 약을 먹으면 되나요?', zh: '需要怎么治疗？吃药就可以吗？' },
          { label: '表示理解', ko: '아, 인두염이군요. 약 처방해 주시면 감사하겠습니다.', zh: '啊，是咽炎啊。麻烦给我开药，谢谢。' },
        ],
      },
      {
        ai: { ko: '항생제랑 해열제, 그리고 목 염증 약을 처방해 드릴게요. 3일치 드릴 테니 다 드시고 나아지지 않으면 다시 오세요.', zh: '我给你开抗生素、退烧药和消炎药。给你开3天的，吃完没好的话再来。' },
        feedback: {
          natural: '对医生的诊断反应自然，提问恰当。',
          grammarError: '',
          betterWay: '可以说 "빨리 낫고 싶어요"（想快点好）表达配合治疗的意愿。',
          wrongPart: '', correctPart: '',
        },
        hints: [
          { label: '确认注意事项', ko: '식사 후에 먹어야 하나요? 물은 많이 마셔야 하나요?', zh: '饭后吃吗？需要多喝水吗？' },
          { label: '问禁忌', ko: '약 먹는 동안 못 먹는 음식이 있나요?', zh: '吃药期间有不能吃的东西吗？' },
          { label: '表示感谢', ko: '감사합니다. 말씀대로 잘 먹겠습니다. 빨리 나았으면 좋겠어요.', zh: '谢谢。我会按您说的好好吃药的。希望快点好。' },
        ],
      },
    ],
    newWords: ['증상', '인두염', '항생제', '해열제', '처방', '알레르기', '진찰', '몸살'],
    grammarErrors: 1,
  },

  // ── KPOP 类 ──────────────────────────────────────────────────────
  {
    id: 'merch_shop',
    category: 'kpop',
    emoji: '🛒',
    nameZh: '周边商品店',
    nameKo: '굿즈 숍',
    level: 'beginner',
    turns: 6,
    opening: {
      ko: '어서 오세요! 어떤 아티스트 굿즈 찾으세요?',
      zh: '欢迎光临！您在找哪位艺人的周边？',
    },
    closing: {
      ko: '감사합니다! 좋은 팬 라이프 되세요~',
      zh: '谢谢您！祝您粉丝生涯愉快～',
    },
    newWords: ['굿즈', '포토카드', '응원봉', '한정판', '품절', '예약'],
    grammarErrors: 1,
    systemHint: '你是K-POP周边商品店的店员，热情友好，熟悉各种偶像团体和周边类型。',
  },
  {
    id: 'music_show',
    category: 'kpop',
    emoji: '📺',
    nameZh: '音乐节目现场',
    nameKo: '음악 방송',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '안녕하세요! 오늘 뮤직뱅크 관람 오셨나요? 티켓 확인할게요.',
      zh: '您好！今天来观看Music Bank吗？我来确认一下票。',
    },
    closing: {
      ko: '즐거운 관람 되세요! 오늘 공연 정말 기대되죠?',
      zh: '祝您观看愉快！今天的演出很期待吧？',
    },
    newWords: ['뮤직뱅크', '공개방송', '대기', '입장', '촬영금지', '응원'],
    grammarErrors: 1,
    systemHint: '你是音乐节目现场工作人员，负责引导观众入场，了解节目流程。',
  },
  {
    id: 'fan_cafe',
    category: 'kpop',
    emoji: '💻',
    nameZh: '粉丝咖啡厅',
    nameKo: '팬카페',
    level: 'intermediate',
    turns: 6,
    opening: {
      ko: '안녕하세요~ 저는 아이유 팬카페 운영자예요. 어떤 도움이 필요하세요?',
      zh: '您好～我是IU粉丝咖啡厅的运营者。需要什么帮助吗？',
    },
    closing: {
      ko: '앞으로도 잘 부탁드려요! 같이 응원해요!',
      zh: '以后也请多关照！一起加油응援吧！',
    },
    newWords: ['팬카페', '덕질', '최애', '직캠', '팬아트', '공지'],
    grammarErrors: 1,
    systemHint: '你是一个热情的K-POP粉丝咖啡厅运营者，熟悉饭圈文化和用语。',
  },
  {
    id: 'idol_sasaeng',
    category: 'kpop',
    emoji: '🎤',
    nameZh: '偶像后台偶遇',
    nameKo: '아이돌 백스테이지',
    level: 'advanced',
    turns: 6,
    opening: {
      ko: '저기요! 혹시 팬이세요? 잠깐 인터뷰해도 될까요?',
      zh: '请问！您是粉丝吗？可以接受一下采访吗？',
    },
    closing: {
      ko: '인터뷰 감사해요! 앞으로도 응원 부탁드려요~',
      zh: '谢谢接受采访！以后也请继续支持～',
    },
    newWords: ['인터뷰', '팬미팅', '컴백', '데뷔', '소감', '응원메시지'],
    grammarErrors: 2,
    systemHint: '你是一个韩国娱乐媒体记者，正在采访一位热情的K-POP粉丝，话题围绕偶像和粉丝文化。',
  },

  // ── 生活类 ────────────────────────────────────────────────────────
  {
    id: 'delivery_order',
    category: 'daily',
    emoji: '📱',
    nameZh: '外卖点单',
    nameKo: '배달 주문',
    level: 'beginner',
    turns: 6,
    opening: {
      ko: '네, 주문 받겠습니다. 무엇을 주문하시겠어요?',
      zh: '好的，我来接单。您要点什么？',
    },
    closing: {
      ko: '감사합니다! 30분 이내로 배달해 드릴게요.',
      zh: '谢谢！30分钟内给您送到。',
    },
    newWords: ['배달', '주문', '배달비', '최소주문금액', '예상시간', '리뷰'],
    grammarErrors: 1,
    systemHint: '你是一个韩国外卖餐厅的接单员，帮助顾客完成外卖点单，处理菜品询问和配送信息。',
  },
  {
    id: 'hair_salon',
    category: 'daily',
    emoji: '✂️',
    nameZh: '发廊理发',
    nameKo: '미용실',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '어서 오세요! 예약하셨나요? 오늘 어떻게 해드릴까요?',
      zh: '欢迎光临！您有预约吗？今天想怎么剪？',
    },
    closing: {
      ko: '완성됐어요! 어떠세요? 마음에 드세요?',
      zh: '完成了！您觉得怎么样？满意吗？',
    },
    newWords: ['미용실', '염색', '파마', '커트', '레이어드', '볼륨매직'],
    grammarErrors: 1,
    systemHint: '你是韩国美容院的发型师，帮助顾客沟通发型需求、颜色选择等。',
  },
  {
    id: 'bank',
    category: 'daily',
    emoji: '🏦',
    nameZh: '银行办事',
    nameKo: '은행',
    level: 'advanced',
    turns: 7,
    opening: {
      ko: '안녕하세요, 어떤 업무 보러 오셨어요?',
      zh: '您好，请问您来办什么业务？',
    },
    closing: {
      ko: '업무 처리 완료됐습니다. 다른 필요한 거 있으세요?',
      zh: '业务办理完毕。还有其他需要吗？',
    },
    newWords: ['통장', '계좌', '이체', '환전', '금리', '신분증'],
    grammarErrors: 2,
    systemHint: '你是韩国银行的窗口服务人员，帮助外国顾客办理各种银行业务，说话正式礼貌。',
  },

  // ── 学习类 ────────────────────────────────────────────────────────
  {
    id: 'language_exchange',
    category: 'study',
    emoji: '🤝',
    nameZh: '语言交换',
    nameKo: '언어 교환',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '안녕하세요! 저는 한국어 배우는 중국 친구를 찾고 있었어요. 언어 교환 하실래요?',
      zh: '您好！我一直在找学韩语的中国朋友。要做语言交换吗？',
    },
    closing: {
      ko: '오늘 정말 즐거웠어요! 다음에 또 만나요~',
      zh: '今天真的很开心！下次再见～',
    },
    newWords: ['언어교환', '회화', '발음', '교정', '원어민', '공부법'],
    grammarErrors: 1,
    systemHint: '你是一个想学中文的韩国大学生，热情友好，愿意帮对方纠正韩语，同时也希望练习中文。对话轻松自然。',
  },
  {
    id: 'study_cafe',
    category: 'study',
    emoji: '📚',
    nameZh: '考试备考',
    nameKo: '공부 카페',
    level: 'beginner',
    turns: 6,
    opening: {
      ko: '어서 오세요! 스터디카페 이용하실 건가요?',
      zh: '欢迎光临！您要使用自习室吗？',
    },
    closing: {
      ko: '공부 잘 되길 바랍니다! 화이팅!',
      zh: '祝您学习顺利！加油！',
    },
    newWords: ['스터디카페', '자습실', '시간권', '음료', '프린터', '집중'],
    grammarErrors: 0,
    systemHint: '你是韩国自习室（스터디카페）的工作人员，帮助顾客了解使用规则、价格和设施。',
  },
  {
    id: 'topik_prep',
    category: 'study',
    emoji: '📝',
    nameZh: 'TOPIK考试咨询',
    nameKo: 'TOPIK 상담',
    level: 'advanced',
    turns: 7,
    opening: {
      ko: '안녕하세요! TOPIK 시험 준비 때문에 오셨나요?',
      zh: '您好！是来咨询TOPIK考试准备的吗？',
    },
    closing: {
      ko: '꼭 좋은 성적 받으실 거예요. 파이팅!',
      zh: '您一定会取得好成绩的。加油！',
    },
    newWords: ['TOPIK', '급수', '읽기', '쓰기', '듣기', '어휘', '문법'],
    grammarErrors: 2,
    systemHint: '你是韩国语言学院的TOPIK考试辅导老师，熟悉考试结构、备考策略和常见难点。',
  },
];
