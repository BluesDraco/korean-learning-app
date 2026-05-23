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
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────

interface FeedbackData {
  natural: string;
  grammarError: string;
  betterWay: string;
}

interface DialogExchange {
  ai: { ko: string; zh: string };
  feedback: FeedbackData;
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
      },
      {
        ai: { ko: '몇 개 드릴까요? 하나에 천원이에요.', zh: '要几个？一个一千韩元。' },
        feedback: {
          natural: '数量表达很准确！',
          grammarError: '韩语计数要使用固有词数字（하나, 둘, 셋...）哦。',
          betterWay: '可以说 "OO개 주세요" 更自然。',
        },
      },
      {
        ai: { ko: '삼각김밥도 있어요. 드실래요?', zh: '也有三角饭团，要来一个吗？' },
        feedback: {
          natural: '很好的回答！',
          grammarError: '"있어요"表示存在，"있으세요"是敬语但一般不这么用。',
          betterWay: '"OO도 주세요" 可以用来加单。',
        },
      },
      {
        ai: { ko: '더 필요한 거 있으세요? 음료수는요?', zh: '还需要别的吗？饮料呢？' },
        feedback: {
          natural: '表达很自然！',
          grammarError: '"됐어요" 表示"可以了/够了"，注意语气不要太生硬。',
          betterWay: '可以完整地说 "아니요, 이걸로 됐어요"（不用了，就这些）。',
        },
      },
      {
        ai: { ko: '네, 총 5,000원입니다. 결제 도와드릴게요.', zh: '好的，总共5000韩元。我来帮您结算。' },
        feedback: {
          natural: '很好的回答！用词得当。',
          grammarError: '无语法错误。',
          betterWay: '也可以说 "카드로 결제할게요"（我用卡支付）。',
        },
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
      },
      {
        ai: { ko: '두 번째 사거리에서 오른쪽으로 가세요.', zh: '在第二个十字路口右转。' },
        feedback: {
          natural: '方向理解正确！',
          grammarError: '"오른쪽" 是"右边"，注意 "왼쪽(左边)"的区别。',
          betterWay: '可以说 "알겠습니다, 감사합니다" 确认收到了指示。',
        },
      },
      {
        ai: { ko: '저기 파란색 간판 보이시죠? 지하철역은 거기예요.', zh: '那边蓝色招牌看到了吗？地铁站就是那里。' },
        feedback: {
          natural: '很好的回应！',
          grammarError: '"보여요" 是被动形式"被看到"，"보이다"的用法。',
          betterWay: '可以说 "네, 보여요" 确认看到了。',
        },
      },
      {
        ai: { ko: '걸어서 한 10분쯤 걸려요. 가깝습니다.', zh: '走路大概10分钟左右。很近的。' },
        feedback: {
          natural: '理解正确！',
          grammarError: '韩语中 "쯤" 和 "정도" 都表示"大约"。',
          betterWay: '"알겠습니다, 감사합니다!" 结束问路时说谢谢。',
        },
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
      },
      {
        ai: { ko: '저쪽 3번 출구로 내려가세요. 2호선은 초록색 라인이에요.', zh: '从那边3号出口下去。2号线是绿色的。' },
        feedback: {
          natural: '理解正确！',
          grammarError: '"~로" 助词表示方向，"3번 출구로" 表示"向3号出口"。',
          betterWay: '说 "네, 알겠습니다" 确认理解。',
        },
      },
      {
        ai: { ko: '교통카드 있으세요? 있으면 편해요.', zh: '有交通卡吗？有的话方便很多。' },
        feedback: {
          natural: '回答很自然！',
          grammarError: '"T-money 카드" 是韩国最常用的交通卡名称。',
          betterWay: '可以说 "네, 있어요" 或 "아니요, 일회용 카드 살게요"。',
        },
      },
      {
        ai: { ko: '일회용 카드는 저기 기계에서 사시면 돼요. 보증금 500원 있어요.', zh: '一次性卡在那边机器上买就可以了。有500韩元押金。' },
        feedback: {
          natural: '表达很到位！',
          grammarError: '无语法错误。',
          betterWay: '"감사합니다" 加感谢更礼貌。',
        },
      },
      {
        ai: { ko: '타는 곳은 지하 2층이에요. 에스컬레이터 타고 내려가세요.', zh: '乘车处在B2层。坐扶梯下去。' },
        feedback: {
          natural: '理解正确，回答很自然！',
          grammarError: '方向助词 "~층에" 表示"在X层"。',
          betterWay: '可以说 "네, 지하 2층으로 갈게요" 表示"我会去B2"。',
        },
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
      },
      {
        ai: { ko: '가격은 3만원이에요. 색깔도 예쁘고 질도 좋아요.', zh: '价格是3万韩元。颜色也漂亮，质量也好。' },
        feedback: {
          natural: '问价表达很地道！',
          grammarError: '"비싸다(贵)" 用于口语中要变成 "비싸요"。',
          betterWay: '砍价可以说 "좀 깎아 주실 수 있어요?"（可以便宜一点吗？）',
        },
      },
      {
        ai: { ko: '에이~ 좀 비싸다고요? 네, 그럼 조금 깎아 드릴게요. 2만5천원 어때요?', zh: '哎~觉得有点贵吗？好吧，给您便宜一点。2万5千怎么样？' },
        feedback: {
          natural: '砍价表达很好！韩国也有砍价文化。',
          grammarError: '"너무 비싸요" 的 "너무" 表示"太"，语气稍微强了一点。',
          betterWay: '可以说 "조금만 더 깎아 주세요" 更委婉。',
        },
      },
      {
        ai: { ko: '음... 2만원까지는 좀 어렵고요, 2만2천원에 드릴게요.', zh: '嗯...2万有点困难，2万2千给您吧。' },
        feedback: {
          natural: '继续砍价很自然！',
          grammarError: '无语法错误，不过注意砍价时的语气不要太生硬。',
          betterWay: '可以说 "네, 그럼 그걸로 할게요" 表示接受。',
        },
      },
      {
        ai: { ko: '네, 포장해 드릴까요? 선물용이세요?', zh: '好的，要帮您包装吗？是送人吗？' },
        feedback: {
          natural: '接受价格很得体！',
          grammarError: '"됐어요" 表示"可以了/这样就可以了"。',
          betterWay: '可以说 "네, 그 가격에 살게요" 确认购买。',
        },
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
      },
      {
        ai: { ko: '목이 많이 부었네요. "아—" 해 보세요.', zh: '嗓子肿得很厉害呢。说"啊——"看看。' },
        feedback: {
          natural: '很好的回应，配合了医生的检查。',
          grammarError: '无语法错误。',
          betterWay: '可以问 "심각해요?"（严重吗？）。',
        },
      },
      {
        ai: { ko: '감기인 것 같아요. 주사 맞으실래요, 약 드실래요?', zh: '好像是感冒了。要打针还是吃药？' },
        feedback: {
          natural: '回答很清晰！',
          grammarError: '选择问句用 "~ㄹ래요" 结尾表示"要...吗？"',
          betterWay: '"주사 맞기 싫어요" 表示"不想打针"，"약 먹을게요" 表示"我吃药吧"。',
        },
      },
      {
        ai: { ko: '네, 약으로 드릴게요. 식후 30분에 하루 세 번 드세요.', zh: '好的，给您开药。饭后30分钟，一天三次。' },
        feedback: {
          natural: '接受治疗方案很配合！',
          grammarError: '无语法错误。',
          betterWay: '确认用法可以说 "식후에 세 번이요?"（饭后三次对吗？）。',
        },
      },
      {
        ai: { ko: '처방전 여기 있어요. 약국은 1층에 있어요. 보험증 있으세요?', zh: '这是处方，药房在一楼。有保险证吗？' },
        feedback: {
          natural: '回应很自然！',
          grammarError: '"여기 있어요" 表示"在这里/给你"。',
          betterWay: '可以说 "네, 감사합니다. 1층으로 갈게요"。',
        },
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
      },
      {
        ai: { ko: '오, 민수 씨요! 민수 씨가 정말 매력적이죠?', zh: '哇，是民秀！民秀真的很有魅力吧？' },
        feedback: {
          natural: '回应很热情！',
          grammarError: '无语法错误。',
          betterWay: '可以加 "완전 팬이에요（完全是粉丝）" 表达热情。',
        },
      },
      {
        ai: { ko: '사인은 어떻게 해드릴까요? 이름도 적어드릴까요?', zh: '签名要怎么签呢？要写上您的名字吗？' },
        feedback: {
          natural: '回答很得体！',
          grammarError: '"적다" 在这里是"写"的意思，不是"少"。',
          betterWay: '可以说 "네, 제 이름은 OO이에요" 给出名字。',
        },
      },
      {
        ai: { ko: '중국에서 오셨어요? 한국어 정말 잘하시네요! 발음이 좋아요.', zh: '您是从中国来的吗？韩语说得真好！发音很好。' },
        feedback: {
          natural: '谦虚回应很得体！',
          grammarError: '无语法错误。',
          betterWay: '被夸的时候说 "아직 많이 부족해요"（还差得远呢）是韩国常见的谦虚说法。',
        },
      },
      {
        ai: { ko: '민수 씨가 5분 후에 나올 거예요. 조금만 기다려 주세요!', zh: '民秀5分钟后出来。请稍等一下！' },
        feedback: {
          natural: '表达期待很自然！',
          grammarError: '"기대돼요" 是从 "기대되다（期待）" 来的，注意不是 "기대해요"。',
          betterWay: '可以说 "너무 설레요!"（好激动！）表达兴奋。',
        },
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

        {phase === 'chatting' && (
          <button
            onClick={handleEndConversation}
            className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-colors"
          >
            结束对话
          </button>
        )}
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
                    {msg.hint && (
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
                {msg.feedback && (
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
          <div className="flex items-end gap-2 max-w-2xl mx-auto">
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
