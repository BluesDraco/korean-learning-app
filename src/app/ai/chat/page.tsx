'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  Check,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Trophy,
  Sparkles,
  Star,
  Mic,
  Square,
  Play,
  Pause,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────

interface FeedbackData {
  natural: string;
  grammarError: string;
  betterWay: string;
}

interface ResponseHint {
  label: string;
  ko: string;
  zh: string;
}

interface DialogExchange {
  ai: { ko: string; zh: string };
  feedback: FeedbackData;
  hints: ResponseHint[];
}

interface ScenarioData {
  id: string;
  emoji: string;
  nameZh: string;
  nameKo: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  turns: number;
  opening: { ko: string; zh: string };
  closing: { ko: string; zh: string };
  exchanges: DialogExchange[];
  newWords: string[];
  grammarErrors: number;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  hint?: string;
  feedback?: FeedbackData;
}

// ── Scenario Data ────────────────────────────────────────────────

const scenarios: ScenarioData[] = [
  // ── 1. 便利店购物 ──────────────────────────────────────────
  {
    id: 'convenience',
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

  // ── 2. 餐厅点餐 （FULLY SCRIPTED） ─────────────────────────
  {
    id: 'restaurant',
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

  // ── 3. 问路 ─────────────────────────────────────────────────
  {
    id: 'directions',
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
        },
        hints: [
          { label: '确认目的地', ko: '네, 명동에 가고 싶어요.', zh: '是的，我想去明洞。' },
          { label: '问大概多远', ko: '여기서 멀어요?', zh: '离这里远吗？' },
          { label: '问怎么去', ko: '어떻게 가면 돼요?', zh: '怎么去呢？' },
        ],
      },
      {
        ai: { ko: '두 번째 사거리에서 오른쪽으로 가세요.', zh: '在第二个十字路口右转。' },
        feedback: {
          natural: '方向理解正确！',
          grammarError: '"오른쪽" 是"右边"，注意 "왼쪽(左边)"的区别。',
          betterWay: '可以说 "알겠습니다, 감사합니다" 确认收到了指示。',
        },
        hints: [
          { label: '确认方向', ko: '두 번째 사거리에서 오른쪽이요?', zh: '第二个十字路口右转对吗？' },
          { label: '表示理解', ko: '네, 알겠습니다.', zh: '好的，明白了。' },
          { label: '问要多远', ko: '거기까지 얼마나 걸어요?', zh: '走到那里要多久？' },
        ],
      },
      {
        ai: { ko: '저기 파란색 간판 보이시죠? 지하철역은 거기예요.', zh: '那边蓝色招牌看到了吗？地铁站就是那里。' },
        feedback: {
          natural: '很好的回应！',
          grammarError: '"보여요" 是被动形式"被看到"，"보이다"的用法。',
          betterWay: '可以说 "네, 보여요" 确认看到了。',
        },
        hints: [
          { label: '看到了', ko: '네, 보여요! 감사합니다.', zh: '是的，看到了！谢谢。' },
          { label: '确认标志物', ko: '파란색 간판이요? 네, 보여요.', zh: '蓝色招牌吗？是的，看到了。' },
          { label: '问还要走多久', ko: '여기서 얼마나 더 가야 해요?', zh: '从这里还要走多久？' },
        ],
      },
      {
        ai: { ko: '걸어서 한 10분쯤 걸려요. 가깝습니다.', zh: '走路大概10分钟左右。很近的。' },
        feedback: {
          natural: '理解正确！',
          grammarError: '韩语中 "쯤" 和 "정도" 都表示"大约"。',
          betterWay: '"알겠습니다, 감사합니다!" 结束问路时说谢谢。',
        },
        hints: [
          { label: '感谢指路', ko: '감사합니다! 큰 도움이 됐어요.', zh: '谢谢！帮大忙了。' },
          { label: '确认时间', ko: '10분이면 금방이네요.', zh: '10分钟很快呢。' },
          { label: '道别', ko: '네, 감사합니다. 안녕히 계세요!', zh: '好的，谢谢。再见！' },
        ],
      },
    ],
    newWords: ['직진', '사거리', '오른쪽', '간판', '지하철역'],
    grammarErrors: 1,
  },

  // ── 4. 咖啡厅 （FULLY SCRIPTED） ────────────────────────────
  {
    id: 'cafe',
    emoji: '☕',
    nameZh: '咖啡厅',
    nameKo: '카페',
    level: 'beginner',
    turns: 6,
    opening: {
      ko: '안녕하세요, 주문하시겠어요?',
      zh: '您好，请问要点单吗？',
    },
    closing: {
      ko: '주문하신 음료 나왔습니다. 맛있게 드세요!',
      zh: '您的饮料好了，请慢用！',
    },
    exchanges: [
      {
        ai: {
          ko: '어떤 메뉴를 드릴까요? 저희 카페는 아메리카노가 인기가 많아요.',
          zh: '请问您想喝点什么？我们咖啡馆的美式咖啡很受欢迎。',
        },
        feedback: {
          natural: '点单表达很自然！',
          grammarError: '"아메리카노 주세요" 注意名词后要加宾格助词 "를"。',
          betterWay: '可以说 "아메리카노 한 잔 주세요" 加上量词"한 잔"更地道。',
        },
        hints: [
          { label: '直接点单', ko: '아메리카노 한 잔 주세요.', zh: '请给我一杯美式咖啡。' },
          { label: '问推荐', ko: '뭐가 제일 맛있어요?', zh: '什么最好喝？' },
          { label: '想喝甜的', ko: '달달한 메뉴 있어요?', zh: '有甜的饮品吗？' },
        ],
      },
      {
        ai: {
          ko: '네, 아메리카노요. 뜨거운 걸로 드릴까요, 차가운 걸로 드릴까요?',
          zh: '好的，美式咖啡。要热的还是冰的？',
        },
        feedback: {
          natural: '选择表达很清晰！',
          grammarError: '"뜨거운" 是形容词 "뜨겁다(热)" 的定语形式，注意读音变化。',
          betterWay: '口语中说 "따뜻한 걸로요" 或 "아이스로요" 更简洁。',
        },
        hints: [
          { label: '要热的', ko: '따뜻한 걸로 주세요.', zh: '请给我热的。' },
          { label: '要冰的', ko: '아이스로 주세요.', zh: '请给我冰的。' },
          { label: '随便哪个都行', ko: '아무거나 괜찮아요.', zh: '哪个都行。' },
        ],
      },
      {
        ai: {
          ko: '사이즈는 어떻게 하시겠어요? 톨 사이즈, 그란데 사이즈 있어요.',
          zh: '请问要多大杯？有中杯和大杯。',
        },
        feedback: {
          natural: '尺寸选择很清晰！',
          grammarError: '"~로" 助词表示选择，"톨 사이즈로 주세요"。',
          betterWay: '可以直接说 "톨 사이즈 주세요"，比较口语化。',
        },
        hints: [
          { label: '选中杯', ko: '톨 사이즈로 주세요.', zh: '请给我中杯。' },
          { label: '选大杯', ko: '그란데 사이즈로 주세요.', zh: '请给我大杯。' },
          { label: '问区别', ko: '톨이랑 그란데 차이가 뭐예요?', zh: '中杯和大杯有什么区别？' },
        ],
      },
      {
        ai: {
          ko: '더 필요한 거 있으세요? 저희 수제 쿠키도 인기가 많아요.',
          zh: '还需要别的吗？我们家的手工饼干也很受欢迎哦。',
        },
        feedback: {
          natural: '回应很自然！',
          grammarError: '"괜찮아요" 在这里表示"不用了/没关系"，用法正确。',
          betterWay: '想加单可以说 "그럼 쿠키도 하나 주세요"。',
        },
        hints: [
          { label: '不需要别的', ko: '아니요, 괜찮아요. 이거면 돼요.', zh: '不用了，这些就够了。' },
          { label: '加一块饼干', ko: '그럼 수제 쿠키도 하나 주세요.', zh: '那手工饼干也给我一块。' },
          { label: '好奇饼干口味', ko: '쿠키는 무슨 맛이에요?', zh: '饼干是什么口味的？' },
        ],
      },
      {
        ai: {
          ko: '여기서 드실 거예요, 테이크아웃이세요?',
          zh: '在这里喝还是外带？',
        },
        feedback: {
          natural: '回答很清晰！',
          grammarError: '"여기서" 表示"在这里"，"가지고 가다" 表示"带走"。',
          betterWay: '说 "여기서 마실게요" 更自然，表示"在这里喝"。',
        },
        hints: [
          { label: '在这里喝', ko: '여기서 마실게요.', zh: '在这里喝。' },
          { label: '打包带走', ko: '테이크아웃으로 할게요.', zh: '我要打包带走。' },
          { label: '问能否坐楼上', ko: '2층에 앉아도 돼요?', zh: '可以坐二楼吗？' },
        ],
      },
    ],
    newWords: ['아메리카노', '뜨겁다', '차갑다', '사이즈', '테이크아웃', '수제 쿠키'],
    grammarErrors: 2,
  },

  // ── 5. 地铁 ─────────────────────────────────────────────────
  {
    id: 'subway',
    emoji: '🚇',
    nameZh: '地铁',
    nameKo: '지하철',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '안녕하세요! 어디까지 가세요?',
      zh: '您好！请问您要去哪里？',
    },
    closing: {
      ko: '네, 5개 정거장이면 금방이에요. 즐거운 여행 되세요!',
      zh: '好的，5站很快就到了。祝您旅途愉快！',
    },
    exchanges: [
      {
        ai: { ko: '홍대입구역이요? 2호선 타셔야 해요.', zh: '弘大入口站吗？要坐2号线。' },
        feedback: {
          natural: '目的地表达很清晰！',
          grammarError: '注意 "타다(乘坐)" 的用法，地铁用 "지하철을 타다"。',
          betterWay: '可以说 "네, 2호선 타고 싶어요" 更礼貌。',
        },
        hints: [
          { label: '确认目的地', ko: '네, 홍대입구역에 가고 싶어요.', zh: '是的，我想去弘大入口站。' },
          { label: '问要坐几号线', ko: '몇 호선 타야 해요?', zh: '要坐几号线？' },
          { label: '问多少钱', ko: '요금이 얼마예요?', zh: '车费多少钱？' },
        ],
      },
      {
        ai: { ko: '저쪽 3번 출구로 내려가세요. 2호선은 초록색 라인이에요.', zh: '从那边3号出口下去。2号线是绿色的。' },
        feedback: {
          natural: '理解正确！',
          grammarError: '"~로" 助词表示方向，"3번 출구로" 表示"向3号出口"。',
          betterWay: '说 "네, 알겠습니다" 确认理解。',
        },
        hints: [
          { label: '确认方向', ko: '네, 3번 출구로 내려가면 돼요?', zh: '好的，从3号出口下去就行吗？' },
          { label: '问绿色线是哪条', ko: '초록색 라인이 2호선이에요?', zh: '绿色线就是2号线吗？' },
          { label: '表示感谢', ko: '감사합니다!', zh: '谢谢！' },
        ],
      },
      {
        ai: { ko: '교통카드 있으세요? 있으면 편해요.', zh: '有交通卡吗？有的话方便很多。' },
        feedback: {
          natural: '回答很自然！',
          grammarError: '"T-money 카드" 是韩国最常用的交通卡名称。',
          betterWay: '可以说 "네, 있어요" 或 "아니요, 일회용 카드 살게요"。',
        },
        hints: [
          { label: '有交通卡', ko: '네, T-money 카드 있어요.', zh: '是的，我有T-money卡。' },
          { label: '没有卡要买', ko: '아니요, 없어요. 일회용 카드 사야 해요.', zh: '没有，我得买一次性卡。' },
          { label: '问在哪充值', ko: 'T-money 카드 충전은 어디서 해요?', zh: 'T-money卡在哪里充值？' },
        ],
      },
      {
        ai: { ko: '일회용 카드는 저기 기계에서 사시면 돼요. 보증금 500원 있어요.', zh: '一次性卡在那边机器上买就可以了。有500韩元押金。' },
        feedback: {
          natural: '表达很到位！',
          grammarError: '无语法错误。',
          betterWay: '"감사합니다" 加感谢更礼貌。',
        },
        hints: [
          { label: '去买卡', ko: '네, 일회용 카드 살게요. 감사합니다.', zh: '好的，我去买一次性卡。谢谢。' },
          { label: '确认押金', ko: '보증금 500원은 나중에 돌려받아요?', zh: '500韩元押金之后能退吗？' },
          { label: '问机器怎么用', ko: '기계 사용법 좀 알려주세요.', zh: '请告诉我机器怎么用。' },
        ],
      },
      {
        ai: { ko: '타는 곳은 지하 2층이에요. 에스컬레이터 타고 내려가세요.', zh: '乘车处在B2层。坐扶梯下去。' },
        feedback: {
          natural: '理解正确，回答很自然！',
          grammarError: '方向助词 "~층에" 表示"在X层"。',
          betterWay: '可以说 "네, 지하 2층으로 갈게요" 表示"我会去B2"。',
        },
        hints: [
          { label: '明白了去B2', ko: '네, 지하 2층으로 갈게요.', zh: '好的，我去B2层。' },
          { label: '问哪个方向', ko: '홍대 방향은 어느 쪽이에요?', zh: '弘大方向是哪边？' },
          { label: '再次感谢', ko: '자세히 알려주셔서 감사합니다!', zh: '谢谢你详细告诉我！' },
        ],
      },
    ],
    newWords: ['지하철', '호선', '출구', '교통카드', '일회용', '보증금'],
    grammarErrors: 1,
  },

  // ── 6. 购物砍价 ─────────────────────────────────────────────
  {
    id: 'shopping',
    emoji: '🛍️',
    nameZh: '购物砍价',
    nameKo: '쇼핑 흥정',
    level: 'intermediate',
    turns: 8,
    opening: {
      ko: '어서 오세요! 구경하세요. 마음에 드는 거 있으세요?',
      zh: '欢迎光临！随便看看。有喜欢的吗？',
    },
    closing: {
      ko: '네, 좋아요! 예쁘게 잘 쓰세요. 감사합니다!',
      zh: '好的，成交！请好好享用。谢谢！',
    },
    exchanges: [
      {
        ai: { ko: '아, 이 스카프요? 실크예요. 요즘 인기가 정말 많아요.', zh: '啊，这条围巾吗？是丝绸的，最近非常受欢迎。' },
        feedback: {
          natural: '询问表达很自然！',
          grammarError: '"이거" 是 "이것" 的口语形式，用于指近处的事物。',
          betterWay: '可以说 "이거 보여 주세요" 请店员展示商品。',
        },
        hints: [
          { label: '夸商品好看', ko: '와, 진짜 예뻐요!', zh: '哇，真的很漂亮！' },
          { label: '问材质', ko: '이거 실크예요? 촉감이 좋네요.', zh: '这是丝绸的吗？手感真好。' },
          { label: '先问问价格', ko: '이거 얼마예요?', zh: '这个多少钱？' },
        ],
      },
      {
        ai: { ko: '가격은 3만원이에요. 색깔도 예쁘고 질도 좋아요.', zh: '价格是3万韩元。颜色也漂亮，质量也好。' },
        feedback: {
          natural: '问价表达很地道！',
          grammarError: '"비싸다(贵)" 用于口语中要变成 "비싸요"。',
          betterWay: '砍价可以说 "좀 깎아 주실 수 있어요?"（可以便宜一点吗？）',
        },
        hints: [
          { label: '觉得有点贵', ko: '좀 비싸요. 깎아 주실 수 있어요?', zh: '有点贵。能便宜一点吗？' },
          { label: '直接砍一半', ko: '1만 5천원에 안 돼요?', zh: '15000韩元不行吗？' },
          { label: '再看看别的', ko: '그럼 다른 것도 좀 볼게요.', zh: '那我再看看别的。' },
        ],
      },
      {
        ai: { ko: '에이~ 좀 비싸다고요? 네, 그럼 조금 깎아 드릴게요. 2만5천원 어때요?', zh: '哎~觉得有点贵吗？好吧，给您便宜一点。2万5千怎么样？' },
        feedback: {
          natural: '砍价表达很好！韩国也有砍价文化。',
          grammarError: '"너무 비싸요" 的 "너무" 表示"太"，语气稍微强了一点。',
          betterWay: '可以说 "조금만 더 깎아 주세요" 更委婉。',
        },
        hints: [
          { label: '继续砍价', ko: '2만원에 해 주세요.', zh: '2万韩元吧。' },
          { label: '接受价格', ko: '네, 2만 5천원 좋아요.', zh: '好的，2万5千可以。' },
          { label: '说个中间价', ko: '2만 3천원은 어때요?', zh: '2万3千怎么样？' },
        ],
      },
      {
        ai: { ko: '음... 2만원까지는 좀 어렵고요, 2만2천원에 드릴게요.', zh: '嗯...2万有点困难，2万2千给您吧。' },
        feedback: {
          natural: '继续砍价很自然！',
          grammarError: '无语法错误，不过注意砍价时的语气不要太生硬。',
          betterWay: '可以说 "네, 그럼 그걸로 할게요" 表示接受。',
        },
        hints: [
          { label: '接受成交', ko: '네, 좋아요! 그걸로 할게요.', zh: '好的，就这样吧！' },
          { label: '再试探一下', ko: '정말 2만원은 안 돼요?', zh: '真的2万不行吗？' },
          { label: '痛快接受', ko: '네, 2만 2천원에 살게요.', zh: '好的，2万2千我买了。' },
        ],
      },
      {
        ai: { ko: '네, 포장해 드릴까요? 선물용이세요?', zh: '好的，要帮您包装吗？是送人吗？' },
        feedback: {
          natural: '接受价格很得体！',
          grammarError: '"됐어요" 表示"可以了/这样就可以了"。',
          betterWay: '可以说 "네, 그 가격에 살게요" 确认购买。',
        },
        hints: [
          { label: '需要包装', ko: '네, 포장해 주세요. 선물이에요.', zh: '是的，请帮我包装。是礼物。' },
          { label: '不用包装', ko: '아니요, 그냥 주세요.', zh: '不用了，直接给我就好。' },
          { label: '自用所以不用包', ko: '제가 쓸 거라서 포장은 괜찮아요.', zh: '我自己用的，不用包装。' },
        ],
      },
    ],
    newWords: ['스카프', '실크', '가격', '깎다', '포장', '선물용'],
    grammarErrors: 2,
  },

  // ── 7. 医院 ─────────────────────────────────────────────────
  {
    id: 'hospital',
    emoji: '🏥',
    nameZh: '医院',
    nameKo: '병원',
    level: 'intermediate',
    turns: 7,
    opening: {
      ko: '안녕하세요, 어디가 불편하세요?',
      zh: '您好，哪里不舒服？',
    },
    closing: {
      ko: '약 잘 드시고 푹 쉬세요. 빨리 나으세요!',
      zh: '好好吃药，多休息。祝早日康复！',
    },
    exchanges: [
      {
        ai: { ko: '열도 있으세요? 체온 한번 재볼게요.', zh: '有发烧吗？我帮您量一下体温。' },
        feedback: {
          natural: '症状描述很清晰！',
          grammarError: '说症状时用 "아파요(疼)" 或 "아픈 것 같아요(好像疼)"。',
          betterWay: '可以详细说明 "어제부터 목이 아팠어요"（从昨天开始嗓子疼）。',
        },
        hints: [
          { label: '描述症状', ko: '목이 아프고 열도 있는 것 같아요.', zh: '嗓子疼，好像也有点发烧。' },
          { label: '说明持续多久', ko: '어제부터 아팠어요.', zh: '从昨天开始疼的。' },
          { label: '问严重吗', ko: '많이 아픈가요?', zh: '很严重吗？' },
        ],
      },
      {
        ai: { ko: '목이 많이 부었네요. "아—" 해 보세요.', zh: '嗓子肿得很厉害呢。说"啊——"看看。' },
        feedback: {
          natural: '很好的回应，配合了医生的检查。',
          grammarError: '无语法错误。',
          betterWay: '可以问 "심각해요?"（严重吗？）。',
        },
        hints: [
          { label: '配合检查', ko: '아—', zh: '啊——' },
          { label: '问严重程度', ko: '심각해요?', zh: '严重吗？' },
          { label: '先问问是什么病', ko: '무슨 병이에요?', zh: '是什么病？' },
        ],
      },
      {
        ai: { ko: '감기인 것 같아요. 주사 맞으실래요, 약 드실래요?', zh: '好像是感冒了。要打针还是吃药？' },
        feedback: {
          natural: '回答很清晰！',
          grammarError: '选择问句用 "~ㄹ래요" 结尾表示"要...吗？"',
          betterWay: '"주사 맞기 싫어요" 表示"不想打针"，"약 먹을게요" 表示"我吃药吧"。',
        },
        hints: [
          { label: '选择吃药', ko: '약 먹을게요. 주사는 싫어요.', zh: '我吃药吧。不想打针。' },
          { label: '问打针好得快吗', ko: '주사 맞으면 빨리 나아요?', zh: '打针好得快吗？' },
          { label: '听医生的', ko: '선생님, 어떻게 하는 게 좋아요?', zh: '医生，怎么做比较好？' },
        ],
      },
      {
        ai: { ko: '네, 약으로 드릴게요. 식후 30분에 하루 세 번 드세요.', zh: '好的，给您开药。饭后30分钟，一天三次。' },
        feedback: {
          natural: '接受治疗方案很配合！',
          grammarError: '无语法错误。',
          betterWay: '确认用法可以说 "식후에 세 번이요?"（饭后三次对吗？）。',
        },
        hints: [
          { label: '确认服药方法', ko: '네, 식후 30분에 세 번이요?', zh: '好的，饭后30分钟三次对吗？' },
          { label: '问有无副作用', ko: '부작용은 없어요?', zh: '没有副作用吗？' },
          { label: '表示明白', ko: '네, 알겠습니다. 감사합니다.', zh: '好的，明白了。谢谢。' },
        ],
      },
      {
        ai: { ko: '처방전 여기 있어요. 약국은 1층에 있어요. 보험증 있으세요?', zh: '这是处方，药房在一楼。有保险证吗？' },
        feedback: {
          natural: '回应很自然！',
          grammarError: '"여기 있어요" 表示"在这里/给你"。',
          betterWay: '可以说 "네, 감사합니다. 1층으로 갈게요"。',
        },
        hints: [
          { label: '出示保险证', ko: '네, 여기 보험증이요.', zh: '好的，这是保险证。' },
          { label: '问药房位置确认', ko: '약국은 1층 어디에 있어요?', zh: '药房在一楼哪里？' },
          { label: '感谢医生', ko: '감사합니다, 선생님!', zh: '谢谢医生！' },
        ],
      },
    ],
    newWords: ['체온', '목', '붓다', '주사', '처방전', '약국', '보험증'],
    grammarErrors: 1,
  },

  // ── 8. 追星见面会 ───────────────────────────────────────────
  {
    id: 'fanmeeting',
    emoji: '🌟',
    nameZh: '追星见面会',
    nameKo: '팬미팅',
    level: 'advanced',
    turns: 8,
    opening: {
      ko: '안녕하세요! 팬사인회에 오신 걸 환영합니다!',
      zh: '您好！欢迎来到粉丝签名会！',
    },
    closing: {
      ko: '오늘 와주셔서 정말 감사합니다! 한국에서 즐거운 추억 많이 만드세요!',
      zh: '今天非常感谢您能来！祝您在韩国留下美好的回忆！',
    },
    exchanges: [
      {
        ai: { ko: '저희 그룹을 좋아해 주셔서 감사합니다. 어떤 멤버 제일 좋아하세요?', zh: '感谢您喜欢我们组合。您最喜欢哪位成员？' },
        feedback: {
          natural: '表达很自然！追星用语很地道。',
          grammarError: '"제일 좋아하다" 中 "제일" 是副词，放在动词前。',
          betterWay: '可以说 "OO 씨 팬이에요"（我是OO的粉丝）更自然。',
        },
        hints: [
          { label: '说出最喜欢的成员', ko: '민수 씨 제일 좋아해요!', zh: '我最喜欢民秀！' },
          { label: '全都喜欢', ko: '다 좋아해요! 근데 민수 씨가 제일 좋아요.', zh: '全都喜欢！但最喜欢民秀。' },
          { label: '表达是忠实粉丝', ko: '저는 완전 팬이에요!', zh: '我是忠实粉丝！' },
        ],
      },
      {
        ai: { ko: '오, 민수 씨요! 민수 씨가 정말 매력적이죠?', zh: '哇，是民秀！民秀真的很有魅力吧？' },
        feedback: {
          natural: '回应很热情！',
          grammarError: '无语法错误。',
          betterWay: '可以加 "완전 팬이에요（完全是粉丝）" 表达热情。',
        },
        hints: [
          { label: '超有魅力', ko: '네, 정말 매력적이에요!', zh: '是的，真的很有魅力！' },
          { label: '喜欢的原因', ko: '춤도 잘 추고 노래도 잘해서요!', zh: '跳舞好唱歌也好！' },
          { label: '表达激动', ko: '와, 직접 만나서 너무 기뻐요!', zh: '哇，能直接见到你太开心了！' },
        ],
      },
      {
        ai: { ko: '사인은 어떻게 해드릴까요? 이름도 적어드릴까요?', zh: '签名要怎么签呢？要写上您的名字吗？' },
        feedback: {
          natural: '回答很得体！',
          grammarError: '"적다" 在这里是"写"的意思，不是"少"。',
          betterWay: '可以说 "네, 제 이름은 OO이에요" 给出名字。',
        },
        hints: [
          { label: '要签名+名字', ko: '네, 이름도 적어 주세요! 제 이름은 지민이에요.', zh: '是的，请也写上名字！我叫지민。' },
          { label: '只要签名就好', ko: '사인만 해 주세요!', zh: '只要签名就好！' },
          { label: '想写特别的留言', ko: '특별한 메시지도 써 주세요!', zh: '请也写一段特别的留言！' },
        ],
      },
      {
        ai: { ko: '중국에서 오셨어요? 한국어 정말 잘하시네요! 발음이 좋아요.', zh: '您是从中国来的吗？韩语说得真好！发音很好。' },
        feedback: {
          natural: '谦虚回应很得体！',
          grammarError: '无语法错误。',
          betterWay: '被夸的时候说 "아직 많이 부족해요"（还差得远呢）是韩国常见的谦虚说法。',
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
];

// ── Helpers ──────────────────────────────────────────────────────

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

const levelLabel: Record<ScenarioData['level'], string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const levelColor: Record<ScenarioData['level'], string> = {
  beginner: 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]',
  intermediate: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  advanced: 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]',
};

// ── Main Page Component ──────────────────────────────────────────

export default function AIChatPage() {
  const [phase, setPhase] = useState<'selecting' | 'chatting' | 'finished'>('selecting');
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isProcessingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showChinese, setShowChinese] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat starts
  useEffect(() => {
    if (phase === 'chatting') {
      inputRef.current?.focus();
    }
  }, [phase]);

  // ── Select scenario ─────────────────────────────────────────
  const handleSelectScenario = useCallback((s: ScenarioData) => {
    setScenario(s);
    setMessages([
      {
        id: genId(),
        sender: 'ai',
        text: s.opening.ko,
        hint: s.opening.zh,
      },
    ]);
    setCurrentStep(0);
    setIsTyping(false);
    isProcessingRef.current = false;
    setPhase('chatting');
  }, []);

  // ── Send message ────────────────────────────────────────────
  const handleSend = useCallback(() => {
    if (!scenario) return;
    const text = inputValue.trim();
    if (!text || isProcessingRef.current || isTyping) return;

    isProcessingRef.current = true;
    setInputValue('');
    setShowHints(false);

    const userMsg: ChatMessage = {
      id: genId(),
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI analysis delay then show feedback
    setIsTyping(true);

    setTimeout(() => {
      const step = currentStep;
      const exchange = scenario.exchanges[step];
      if (exchange) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, feedback: exchange.feedback } : m,
          ),
        );
      }
      setIsTyping(false);

      // After feedback, show next AI message or closing
      setTimeout(() => {
        if (step < scenario.exchanges.length) {
          const nextAi = scenario.exchanges[step].ai;
          setMessages((prev) => [
            ...prev,
            {
              id: genId(),
              sender: 'ai',
              text: nextAi.ko,
              hint: nextAi.zh,
            },
          ]);
          setCurrentStep(step + 1);
        } else {
          // All exchanges done, show closing
          setMessages((prev) => [
            ...prev,
            {
              id: genId(),
              sender: 'ai',
              text: scenario.closing.ko,
              hint: scenario.closing.zh,
            },
          ]);
          setPhase('finished');
        }
        isProcessingRef.current = false;
        inputRef.current?.focus();
      }, 1000);
    }, 1200);
  }, [inputValue, scenario, currentStep, isTyping]);

  // ── End conversation early ──────────────────────────────────
  const handleEndConversation = useCallback(() => {
    if (!scenario) return;
    if (isProcessingRef.current) return;

    // Append closing message if not already there
    setMessages((prev) => {
      const lastMsg = prev[prev.length - 1];
      if (lastMsg?.text === scenario.closing.ko) return prev;
      return [
        ...prev,
        {
          id: genId(),
          sender: 'ai' as const,
          text: scenario.closing.ko,
          hint: scenario.closing.zh,
        },
      ];
    });
    setPhase('finished');
  }, [scenario]);

  // ── Play again / Back ───────────────────────────────────────
  const handlePlayAgain = useCallback(() => {
    if (!scenario) return;
    handleSelectScenario(scenario);
  }, [scenario, handleSelectScenario]);

  const handleBackToScenarios = useCallback(() => {
    setPhase('selecting');
    setScenario(null);
    setMessages([]);
    setCurrentStep(0);
    setInputValue('');
    setIsTyping(false);
    isProcessingRef.current = false;
  }, []);

  // ── Recording ──────────────────────────────────────────────
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm' });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setAudioUrl(null);
    } catch {
      alert('无法访问麦克风，请检查浏览器权限设置');
    }
  }, [audioUrl]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [isPlaying, audioUrl]);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  // ── Handle Enter key ────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // ── Handle input auto-resize ────────────────────────────────
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, []);

  // ── Completed exchanges for stats ───────────────────────────
  const completedExchanges = currentStep;

  // ═══════════════════════════════════════════════════════════════
  // PHASE 1: Scenario Selection
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'selecting') {
    return (
      <div className="py-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">情景对话</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            选择情景，开启沉浸式韩语对话练习
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(s)}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-left hover:border-[var(--pink-primary)]/40 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Emoji */}
              <div className="text-3xl mb-3">{s.emoji}</div>

              {/* Name */}
              <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1">
                {s.nameZh}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                {s.nameKo}
              </p>

              {/* Badges */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[13px] px-2 py-0.5 rounded-full font-medium ${levelColor[s.level]}`}
                >
                  {levelLabel[s.level]}
                </span>
                <span className="text-[13px] text-[var(--text-muted)]">
                  ~{s.turns}轮
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="text-center py-8">
          <div className="text-4xl mb-3">💬</div>
          <p className="text-sm text-[var(--text-secondary)]">
            选择一个情景开始对话练习
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            每次对话结束后，新词汇将自动加入你的单词库
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2: Chat Interface
  // ═══════════════════════════════════════════════════════════════
  if (!scenario) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">未选择情景</p>
        <button
          onClick={handleBackToScenarios}
          className="mt-3 text-sm text-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
        >
          返回选择
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] md:h-[calc(100vh-5rem)] -mx-3 md:-mx-5 lg:-mx-8">
      {/* ── Chat Header ──────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBackToScenarios}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="返回场景"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{scenario.emoji}</span>
              <span className="font-semibold text-[var(--text-primary)] truncate text-sm">
                {scenario.nameZh}
              </span>
              <span
                className={`text-[13px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${levelColor[scenario.level]}`}
              >
                {levelLabel[scenario.level]}
              </span>
            </div>
            <p className="text-[13px] text-[var(--text-muted)] ml-7">
              {scenario.nameKo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === 'chatting' && (
            <button
              onClick={() => setShowChinese(!showChinese)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showChinese
                  ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30 text-[var(--pink-primary)]'
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)]/30 hover:text-[var(--pink-primary)]'
              }`}
            >
              显示中文
            </button>
          )}
          {phase === 'chatting' && (
            <button
              onClick={handleEndConversation}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-colors"
            >
              结束对话
            </button>
          )}
        </div>
      </div>

      {/* ── Messages Area ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg-primary)]">
        {messages.map((msg) => (
          <div key={msg.id}>
            {/* AI message */}
            {msg.sender === 'ai' && (
              <div className="flex gap-2 max-w-[85%] animate-slide-up">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--purple-soft)]/15 flex items-center justify-center text-sm mt-0.5">
                  {scenario.emoji}
                </div>
                <div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {msg.text}
                    </p>
                    {msg.hint && showChinese && (
                      <p className="text-xs text-[var(--text-muted)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]">
                        {msg.hint}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* User message + feedback */}
            {msg.sender === 'user' && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto animate-slide-up">
                <div className="bg-[var(--pink-primary)]/12 border border-[var(--pink-primary)]/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {msg.text}
                  </p>
                </div>

                {/* Feedback card */}
                {msg.feedback && showChinese && (
                  <div className="mt-2 w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 space-y-2 animate-slide-up shadow-sm">
                    <p className="text-[13px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      AI 反馈
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-xs">
                        <Check size={14} className="text-[var(--mint-soft)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-[var(--mint-soft)]">表达自然</span>
                          <p className="text-[var(--text-secondary)] mt-0.5">
                            {msg.feedback.natural}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <AlertTriangle size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-[var(--peach-soft)]">语法提示</span>
                          <p className="text-[var(--text-secondary)] mt-0.5">
                            {msg.feedback.grammarError}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <Lightbulb size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-[var(--purple-soft)]">更地道的说法</span>
                          <p className="text-[var(--text-secondary)] mt-0.5">
                            {msg.feedback.betterWay}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 max-w-[85%] animate-slide-up">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--purple-soft)]/15 flex items-center justify-center text-sm">
              {scenario.emoji}
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* End-of-conversation stats */}
        {phase === 'finished' && (
          <div className="space-y-4 animate-slide-up">
            {/* Stats card */}
            <div className="bg-[var(--bg-card)] border-2 border-[var(--pink-primary)]/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-[var(--peach-soft)]" />
                <span className="font-bold text-[var(--text-primary)]">
                  对话完成！
                </span>
                <Sparkles size={16} className="text-[var(--purple-soft)]" />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--mint-soft)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--mint-soft)]">
                    {scenario.newWords.length}
                  </div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">新词数量</div>
                </div>
                <div className="bg-[var(--peach-soft)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--peach-soft)]">
                    {Math.min(scenario.grammarErrors, completedExchanges + 1)}
                  </div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">语法错误</div>
                </div>
                <div className="bg-[var(--pink-primary)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--pink-primary)]">+20</div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">本次 XP</div>
                </div>
              </div>

              {/* New words notice */}
              <div className="flex items-center gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-lg px-3 py-2">
                <Star size={14} className="text-[var(--purple-soft)] shrink-0" />
                <p className="text-xs text-[var(--text-secondary)]">
                  新词已自动加入单词库
                </p>
              </div>

              {/* New words list */}
              <div className="flex flex-wrap gap-1.5">
                {scenario.newWords.map((w) => (
                  <span
                    key={w}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePlayAgain}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white font-medium text-sm transition-colors"
              >
                <Sparkles size={16} />
                再来一轮
              </button>
              <button
                onClick={handleBackToScenarios}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-primary)] font-medium text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                返回场景
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────────────── */}
      {phase === 'chatting' && (
        <div className="shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-3">
          {/* Hints bottom drawer */}
          {showHints && (() => {
            const hintsIndex = currentStep > 0 ? currentStep - 1 : 0;
            const activeHints = scenario.exchanges[Math.min(hintsIndex, scenario.exchanges.length - 1)]?.hints;
            if (!activeHints) return null;
            return (
              <div className="mb-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-4 animate-slide-up-drawer shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-[var(--peach-soft)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">回答参考方向</span>
                  </div>
                  <button
                    onClick={() => setShowHints(false)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {activeHints.map((hint, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputValue(hint.ko);
                        setShowHints(false);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left bg-[var(--bg-card)] hover:bg-[var(--bg-accent)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 rounded-xl p-3 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                          {hint.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{hint.ko}</p>
                      {showChinese && <p className="text-xs text-[var(--text-muted)] mt-0.5">{hint.zh}</p>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Audio playback */}
          {audioUrl && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <button
                onClick={togglePlayback}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isPlaying
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                    : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--pink-primary)]/10 hover:text-[var(--pink-primary)]'
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div className="flex-1 h-1.5 bg-[var(--bg-input)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isPlaying ? 'bg-[var(--pink-primary)] animate-pulse' : 'bg-[var(--purple-soft)]/40'}`}
                  style={{ width: isPlaying ? '100%' : '0%' }}
                />
              </div>
              <span className="text-[11px] text-[var(--text-muted)] shrink-0">
                {isPlaying ? '播放中...' : '录音回放'}
              </span>
            </div>
          )}

          <div className="flex items-end gap-2 max-w-2xl mx-auto">
            {/* Mic button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTyping || isProcessingRef.current}
              className={`shrink-0 p-2.5 rounded-xl transition-all ${
                isRecording
                  ? 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] animate-pulse'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isRecording ? '停止录音' : '语音输入'}
            >
              {isRecording ? <Square size={18} /> : <Mic size={18} />}
            </button>

            {/* Hints button */}
            <button
              onClick={() => setShowHints(!showHints)}
              disabled={isTyping || isProcessingRef.current}
              className={`shrink-0 p-2.5 rounded-xl transition-all ${
                showHints
                  ? 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--peach-soft)] hover:bg-[var(--peach-soft)]/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="回答参考"
            >
              <Lightbulb size={18} />
            </button>

            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="用韩语输入你的回复... Enter发送"
              rows={1}
              disabled={isTyping || isProcessingRef.current}
              className="flex-1 resize-none bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50 focus:ring-1 focus:ring-[var(--pink-primary)]/25 disabled:opacity-50"
              style={{ maxHeight: '120px' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isProcessingRef.current}
              className="shrink-0 p-2.5 rounded-xl bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Hint text */}
          <p className="text-center text-[13px] text-[var(--text-muted)] mt-2">
            Enter 发送 · Shift+Enter 换行 · 输入韩语进行对话
          </p>
        </div>
      )}

      {/* Finished input area (disabled state) */}
      {phase === 'finished' && (
        <div className="shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-3">
          <p className="text-center text-sm text-[var(--text-muted)]">
            对话已结束。选择"再来一轮"或"返回场景"。
          </p>
        </div>
      )}
    </div>
  );
}
