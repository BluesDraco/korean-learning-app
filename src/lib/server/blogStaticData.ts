// ⚠️ 自动生成，请勿手改。由 scripts/export-blog-static.mjs 从 data/app.db 导出。
// 仅服务端 import，绝不进客户端 bundle（含全部帖子正文，体积大）。
// NPC 剧情帖 + 现役 passerby 路人帖的静态数据：随代码部署上线，不依赖数据库。
// 用户 UGC 帖（author_kind='user'）仍在数据库，不在此文件。
import type { BlogPost } from '@/types';

export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    "id": "blog-w1-02",
    "slug": "w1-darami-morning-d1",
    "titleKo": "다람쥐의 아침 · 오늘의 날씨",
    "titleZh": "松鼠的早晨·今天的天气",
    "excerptKo": "좋은 아침이에요! 오늘 서울 날씨는 맑아요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "좋은 아침이에요! 다람쥐예요. 🐿️",
          "zh": "早上好！我是松鼠。",
          "t": [
            0,
            3.55
          ]
        },
        {
          "ko": "오늘 서울 날씨는 맑아요.",
          "zh": "今天首尔的天气很晴朗。",
          "t": [
            3.95,
            7.06
          ]
        },
        {
          "ko": "오늘의 단어는 \"인사\"예요. 다 같이 인사해요!",
          "zh": "今天的单词是“打招呼”，大家一起打招呼吧！",
          "t": [
            7.46,
            13.13
          ]
        }
      ],
      "vocab": [
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早晨、早上"
        },
        {
          "word": "날씨",
          "reading": "nal-ssi",
          "meaning": "天气"
        },
        {
          "word": "맑아요",
          "reading": "mal-ga-yo",
          "meaning": "晴朗"
        },
        {
          "word": "인사",
          "reading": "in-sa",
          "meaning": "打招呼、问候"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        },
        {
          "word": "다람쥐",
          "reading": "da-ram-jwi",
          "meaning": "松鼠"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "서울",
          "reading": "seo-ul",
          "meaning": "首尔"
        },
        {
          "word": "단어",
          "reading": "da-neo",
          "meaning": "单词"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "좋은 아침이에요! 오늘도 화이팅! 🌸",
          "zh": "早上好！今天也加油！",
          "audioUrl": "/audio/blog/comments/w1-darami-morning-d1-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "아침이에요…? 조금만 더 잘래요 🐨",
          "zh": "已经早上了…？再睡一会儿嘛",
          "audioUrl": "/audio/blog/comments/w1-darami-morning-d1-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "news",
        "nabi",
        "choco"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-darami-morning-d1.mp3",
    "audioDuration": 13,
    "coverEmoji": "🌅",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "darami",
    "likeCount": 22,
    "publishedAt": 1782249662311,
    "isFeatured": false,
    "unlockDay": 1,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-01",
    "slug": "w1-tori-departure",
    "titleKo": "내일 서울로 떠나요",
    "titleZh": "明天出发去首尔",
    "excerptKo": "드디어 내일 서울로 가요. 조금 떨리지만 정말 행복해요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "내일 저는 서울로 떠나요.",
          "zh": "明天我要出发去首尔。",
          "t": [
            0,
            2.03
          ]
        },
        {
          "ko": "엄마가 가방에 당근을 많이 넣어 줬어요.",
          "zh": "妈妈在包里塞了很多胡萝卜。",
          "t": [
            2.43,
            5.46
          ]
        },
        {
          "ko": "한국어를 잘 못해서 조금 떨려요.",
          "zh": "因为韩语说得不好，有点紧张。",
          "t": [
            5.86,
            8.94
          ]
        },
        {
          "ko": "그래도 새로운 친구를 만나고 싶어요.",
          "zh": "不过还是想认识新朋友。",
          "t": [
            9.34,
            12.69
          ]
        },
        {
          "ko": "서울아, 잘 부탁해!",
          "zh": "首尔，请多关照！",
          "t": [
            13.09,
            15.6
          ]
        }
      ],
      "vocab": [
        {
          "word": "내일",
          "reading": "nae-il",
          "meaning": "明天"
        },
        {
          "word": "서울",
          "reading": "seo-ul",
          "meaning": "首尔"
        },
        {
          "word": "떠나요",
          "reading": "tteo-na-yo",
          "meaning": "出发、离开"
        },
        {
          "word": "엄마",
          "reading": "eom-ma",
          "meaning": "妈妈"
        },
        {
          "word": "가방",
          "reading": "ga-bang",
          "meaning": "包、书包"
        },
        {
          "word": "당근",
          "reading": "dang-geun",
          "meaning": "胡萝卜"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "很多、多多地"
        },
        {
          "word": "한국어",
          "reading": "han-gu-geo",
          "meaning": "韩语"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "새로운",
          "reading": "sae-ro-un",
          "meaning": "新的"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        }
      ],
      "quiz": [
        {
          "question": "토리는 내일 어디로 가요?",
          "options": [
            "서울",
            "부산",
            "제주",
            "도쿄"
          ],
          "answerIndex": 0,
          "explanation": "第一句说“明天我要出发去首尔（서울）”。"
        }
      ],
      "comments": [
        {
          "animalId": "darami",
          "ko": "토리야, 서울에 온 걸 환영해요! 🌅",
          "zh": "兔莉，欢迎来首尔！",
          "audioUrl": "/audio/blog/comments/w1-tori-departure-c0.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "우와, 새로운 시작이네요! 응원해요 ✨",
          "zh": "哇，是新的开始呢，为你加油",
          "audioUrl": "/audio/blog/comments/w1-tori-departure-c1.mp3"
        },
        {
          "animalId": "choco",
          "ko": "서울에는 맛있는 게 정말 많아요! 🍫",
          "zh": "首尔好吃的真的超多！",
          "audioUrl": "/audio/blog/comments/w1-tori-departure-c2.mp3"
        }
      ],
      "likedBy": [
        "darami",
        "nabi",
        "choco",
        "news",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w1-tori-departure-1-1784644891318.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w1-tori-departure.mp3",
    "audioDuration": 16,
    "coverEmoji": "✈️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 16,
    "publishedAt": 1782249663311,
    "isFeatured": true,
    "unlockDay": 1,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-05",
    "slug": "w1-news-arrival-d2",
    "titleKo": "오늘 인천공항 소식",
    "titleZh": "今天仁川机场的消息",
    "excerptKo": "오늘 인천공항에 손님이 많이 도착했어요.",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "동물시 뉴스예요.",
          "zh": "这里是动物城新闻。",
          "t": [
            0,
            1.23
          ]
        },
        {
          "ko": "오늘 인천공항에 손님이 많이 왔어요.",
          "zh": "今天仁川机场来了很多客人。",
          "t": [
            1.63,
            4
          ]
        },
        {
          "ko": "모두 안전하게 도착했어요.",
          "zh": "大家都平安到达了。",
          "t": [
            4.4,
            6.72
          ]
        }
      ],
      "vocab": [
        {
          "word": "공항",
          "reading": "gong-hang",
          "meaning": "机场"
        },
        {
          "word": "손님",
          "reading": "son-nim",
          "meaning": "客人"
        },
        {
          "word": "도착",
          "reading": "do-chak",
          "meaning": "到达"
        },
        {
          "word": "인천공항",
          "reading": "in-cheon-gong-hang",
          "meaning": "仁川机场"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "很多"
        },
        {
          "word": "왔어요",
          "reading": "wa-sseo-yo",
          "meaning": "来了"
        },
        {
          "word": "모두",
          "reading": "mo-du",
          "meaning": "大家、全部"
        },
        {
          "word": "안전하게",
          "reading": "an-jeon-ha-ge",
          "meaning": "安全地、平安地"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "공항은 늘 복잡하죠. 다들 고생했어요 ✨",
          "zh": "机场总是很挤呢，大家都辛苦了",
          "audioUrl": "/audio/blog/comments/w1-news-arrival-d2-c0.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "koal",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-news-arrival-d2.mp3",
    "audioDuration": 7,
    "coverEmoji": "🛬",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 7,
    "publishedAt": 1782333080001,
    "isFeatured": false,
    "unlockDay": 2,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-04",
    "slug": "w1-tori-airplane",
    "titleKo": "비행기에서 처음 한국어를 했어요",
    "titleZh": "在飞机上第一次说了韩语",
    "excerptKo": "비행기 안에서 처음으로 한국어를 했어요. 두근두근!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "지금 비행기 안이에요.",
          "zh": "现在在飞机上。",
          "t": [
            0,
            1.75
          ]
        },
        {
          "ko": "승무원한테 처음으로 한국어를 했어요.",
          "zh": "第一次对乘务员说了韩语。",
          "t": [
            2.15,
            5.09
          ]
        },
        {
          "ko": "\"물 좀 주세요.\"라고 말했어요. 성공! 😆",
          "zh": "我说了“请给我水”。成功了！",
          "t": [
            5.49,
            9.7
          ]
        }
      ],
      "vocab": [
        {
          "word": "비행기",
          "reading": "bi-haeng-gi",
          "meaning": "飞机"
        },
        {
          "word": "한국어",
          "reading": "han-gu-geo",
          "meaning": "韩语"
        },
        {
          "word": "물",
          "reading": "mul",
          "meaning": "水"
        },
        {
          "word": "주세요",
          "reading": "ju-se-yo",
          "meaning": "请给我"
        },
        {
          "word": "지금",
          "reading": "ji-geum",
          "meaning": "现在"
        },
        {
          "word": "안",
          "reading": "an",
          "meaning": "里面"
        },
        {
          "word": "승무원",
          "reading": "seung-mu-won",
          "meaning": "乘务员"
        },
        {
          "word": "처음으로",
          "reading": "cheo-eu-meu-ro",
          "meaning": "第一次、初次"
        },
        {
          "word": "말했어요",
          "reading": "mal-hae-sseo-yo",
          "meaning": "说了"
        },
        {
          "word": "성공",
          "reading": "seong-gong",
          "meaning": "成功"
        }
      ],
      "quiz": [
        {
          "question": "토리는 승무원에게 뭐라고 말했어요?",
          "options": [
            "물 좀 주세요",
            "안녕히 가세요",
            "얼마예요",
            "죄송해요"
          ],
          "answerIndex": 0,
          "explanation": "第三句说她说了“물 좀 주세요（请给我水）”。"
        }
      ],
      "comments": [
        {
          "animalId": "darami",
          "ko": "우와, 벌써 한국어를 했어요? 대단해요! 🌅",
          "zh": "哇，已经说韩语了？好厉害！",
          "audioUrl": "/audio/blog/comments/w1-tori-airplane-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "\"주세요\"는 진짜 자주 써요! 👍",
          "zh": "“주세요”真的超常用！",
          "audioUrl": "/audio/blog/comments/w1-tori-airplane-c1.mp3"
        }
      ],
      "likedBy": [
        "darami",
        "choco",
        "nabi",
        "news"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-tori-airplane.mp3",
    "audioDuration": 10,
    "coverEmoji": "🛫",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "tori",
    "likeCount": 14,
    "publishedAt": 1782333081001,
    "isFeatured": false,
    "unlockDay": 2,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-07",
    "slug": "w1-minji-newfriend",
    "titleKo": "\"집이 무거워요\"라는 토끼 😂",
    "titleZh": "一只说“家很重”的兔子",
    "excerptKo": "공항에서 귀여운 토끼를 만났어요. \"집이 무거워요\"래요! 😆",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 공항에서 토끼 친구를 만났어요.",
          "zh": "今天在机场遇到了一只兔子朋友。",
          "t": [
            0,
            3.12
          ]
        },
        {
          "ko": "토끼가 \"집이 무거워요\"라고 했어요. 😆",
          "zh": "兔子说“我的家太重了”。",
          "t": [
            3.52,
            6.08
          ]
        },
        {
          "ko": "\"집\"이 아니라 \"짐\"이에요, 토리 씨! 아주 귀여워요.",
          "zh": "不是“家(집)”，是“行李(짐)”啦，兔莉！太可爱了。",
          "t": [
            6.48,
            11.07
          ]
        }
      ],
      "vocab": [
        {
          "word": "토끼",
          "reading": "to-kki",
          "meaning": "兔子"
        },
        {
          "word": "집",
          "reading": "jip",
          "meaning": "家"
        },
        {
          "word": "짐",
          "reading": "jim",
          "meaning": "行李"
        },
        {
          "word": "귀여워요",
          "reading": "gwi-yeo-wo-yo",
          "meaning": "可爱"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "공항",
          "reading": "gong-hang",
          "meaning": "机场"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "만났어요",
          "reading": "man-na-sseo-yo",
          "meaning": "遇见了"
        },
        {
          "word": "아니라",
          "reading": "a-ni-ra",
          "meaning": "不是（而是）"
        },
        {
          "word": "아주",
          "reading": "a-ju",
          "meaning": "非常"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "민지야, 오늘 고마워요! 🌸",
          "zh": "敏智，今天谢谢你！",
          "audioUrl": "/audio/blog/comments/w1-minji-newfriend-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "토리 만나고 싶어요! 🍫",
          "zh": "好想见见兔莉！",
          "audioUrl": "/audio/blog/comments/w1-minji-newfriend-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "nabi",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w1-minji-newfriend-1-1784644937667.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w1-minji-newfriend.mp3",
    "audioDuration": 11,
    "coverEmoji": "💧",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "minji",
    "likeCount": 15,
    "publishedAt": 1782416498690,
    "isFeatured": false,
    "unlockDay": 3,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-06",
    "slug": "w1-tori-meet-minji",
    "titleKo": "공항에서 \"집이 무거워요\"라고 했어요 😂",
    "titleZh": "在机场说成了“我的家太重了”",
    "excerptKo": "\"짐\"을 \"집\"이라고 잘못 말했어요. 그래도 민지가 도와줬어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "공항에서 짐이 너무 무거웠어요. 😥",
          "zh": "在机场行李太重了。",
          "t": [
            0,
            2.98
          ]
        },
        {
          "ko": "그런데 저는 \"집이 무거워요\"라고 말했어요. 😳",
          "zh": "结果我说成了“我的家太重了”。",
          "t": [
            3.38,
            8.17
          ]
        },
        {
          "ko": "짐하고 집, 한 글자 차이예요!",
          "zh": "“行李(짐)”和“家(집)”，就差一个字！",
          "t": [
            8.57,
            11.55
          ]
        },
        {
          "ko": "그때 민지가 웃었어요. 그리고 저를 도와줬어요. 첫 친구예요! 🌸",
          "zh": "那时敏智笑了，然后帮了我。第一个朋友！",
          "t": [
            11.95,
            18.58
          ]
        }
      ],
      "vocab": [
        {
          "word": "짐",
          "reading": "jim",
          "meaning": "行李"
        },
        {
          "word": "집",
          "reading": "jip",
          "meaning": "家"
        },
        {
          "word": "무거워요",
          "reading": "mu-geo-wo-yo",
          "meaning": "重"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "공항",
          "reading": "gong-hang",
          "meaning": "机场"
        },
        {
          "word": "너무",
          "reading": "neo-mu",
          "meaning": "太、过于"
        },
        {
          "word": "무거웠어요",
          "reading": "mu-geo-wo-sseo-yo",
          "meaning": "（曾）重"
        },
        {
          "word": "글자",
          "reading": "geul-ja",
          "meaning": "字"
        },
        {
          "word": "차이",
          "reading": "cha-i",
          "meaning": "差别、区别"
        },
        {
          "word": "그때",
          "reading": "geu-ttae",
          "meaning": "那时"
        },
        {
          "word": "웃었어요",
          "reading": "u-seo-sseo-yo",
          "meaning": "笑了"
        },
        {
          "word": "도와줬어요",
          "reading": "do-wa-jwo-sseo-yo",
          "meaning": "帮忙了"
        }
      ],
      "quiz": [
        {
          "question": "토리가 잘못 말한 단어는 뭐예요?",
          "options": [
            "집",
            "짐",
            "길",
            "친구"
          ],
          "answerIndex": 0,
          "explanation": "兔莉本想说“짐(行李)”，却说成了“집(家)”，所以变成“我的家太重了”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "하하, 그때 진짜 귀여웠어요! 😆💧",
          "zh": "哈哈，那时候真的太可爱了！",
          "audioUrl": "/audio/blog/comments/w1-tori-meet-minji-c0.mp3"
        },
        {
          "animalId": "darami",
          "ko": "짐하고 집, 저도 자주 헷갈려요! 🌅",
          "zh": "“行李”和“家”，我也常常搞混！",
          "audioUrl": "/audio/blog/comments/w1-tori-meet-minji-c1.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "첫 친구라니, 축하해요 ✨",
          "zh": "第一个朋友，恭喜呀",
          "audioUrl": "/audio/blog/comments/w1-tori-meet-minji-c2.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "nabi",
        "darami",
        "choco",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-tori-meet-minji.mp3",
    "audioDuration": 19,
    "coverEmoji": "🦦",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "tori",
    "likeCount": 19,
    "publishedAt": 1782416499690,
    "isFeatured": false,
    "unlockDay": 3,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-03",
    "slug": "w1-news-welcome",
    "titleKo": "동물시에 새 이웃이 왔어요",
    "titleZh": "动物城来了新邻居",
    "excerptKo": "이번 주 동물시에 새 이웃이 도착했어요. 다 같이 환영해요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "동물시 뉴스예요.",
          "zh": "这里是动物城新闻。",
          "t": [
            0,
            1.18
          ]
        },
        {
          "ko": "이번 주에 새 이웃이 왔어요.",
          "zh": "这周来了新邻居。",
          "t": [
            1.58,
            3.43
          ]
        },
        {
          "ko": "우리 다 같이 환영해요!",
          "zh": "我们一起欢迎吧！",
          "t": [
            3.83,
            5.25
          ]
        }
      ],
      "vocab": [
        {
          "word": "이웃",
          "reading": "i-ut",
          "meaning": "邻居"
        },
        {
          "word": "이번 주",
          "reading": "i-beon ju",
          "meaning": "这周"
        },
        {
          "word": "환영",
          "reading": "hwan-yeong",
          "meaning": "欢迎"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "뉴스",
          "reading": "nyu-seu",
          "meaning": "新闻"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "왔어요",
          "reading": "wa-sseo-yo",
          "meaning": "来了"
        },
        {
          "word": "우리",
          "reading": "u-ri",
          "meaning": "我们"
        },
        {
          "word": "다 같이",
          "reading": "da ga-chi",
          "meaning": "大家一起"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "앗, 저예요! 잘 부탁드려요 🌸",
          "zh": "啊，是我！请多关照",
          "audioUrl": "/audio/blog/comments/w1-news-welcome-c0.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "환영해요! 곧 만나요 ✨",
          "zh": "欢迎！回头见~",
          "audioUrl": "/audio/blog/comments/w1-news-welcome-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "darami",
        "nabi",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-news-welcome.mp3",
    "audioDuration": 5,
    "coverEmoji": "📰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 9,
    "publishedAt": 1782249661311,
    "isFeatured": false,
    "unlockDay": 4,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-09",
    "slug": "w1-darami-morning-d4",
    "titleKo": "다람쥐의 아침 · 오늘의 단어 \"인사\"",
    "titleZh": "松鼠的早晨·今日单词“打招呼”",
    "excerptKo": "좋은 아침이에요! 오늘은 인사를 배워요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "좋은 아침이에요! 🐿️",
          "zh": "早上好！",
          "t": [
            0,
            2
          ]
        },
        {
          "ko": "오늘의 단어는 \"안녕하세요\"예요.",
          "zh": "今天的单词是“您好”。",
          "t": [
            2.4,
            5.6
          ]
        },
        {
          "ko": "이웃을 만나면 안녕하세요, 하고 인사해요!",
          "zh": "遇到邻居就说“您好”打招呼吧！",
          "t": [
            6,
            10.06
          ]
        }
      ],
      "vocab": [
        {
          "word": "단어",
          "reading": "da-neo",
          "meaning": "单词"
        },
        {
          "word": "안녕하세요",
          "reading": "an-nyeong-ha-se-yo",
          "meaning": "您好"
        },
        {
          "word": "이웃",
          "reading": "i-ut",
          "meaning": "邻居"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        },
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早晨、早上"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "만나면",
          "reading": "man-na-myeon",
          "meaning": "如果遇到"
        },
        {
          "word": "인사해요",
          "reading": "in-sa-hae-yo",
          "meaning": "打招呼"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "안녕하세요! 오늘도 배워요 🌸",
          "zh": "您好！今天也来学习",
          "audioUrl": "/audio/blog/comments/w1-darami-morning-d4-c0.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "좋은 아침이에요, 다람쥐 님 ✨",
          "zh": "早上好，松鼠~",
          "audioUrl": "/audio/blog/comments/w1-darami-morning-d4-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "nabi",
        "news",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-darami-morning-d4.mp3",
    "audioDuration": 10,
    "coverEmoji": "🌅",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "darami",
    "likeCount": 18,
    "publishedAt": 1782499917380,
    "isFeatured": false,
    "unlockDay": 4,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-08",
    "slug": "w1-tori-dorm",
    "titleKo": "한빛 기숙사 첫날",
    "titleZh": "韩光宿舍第一天",
    "excerptKo": "드디어 기숙사에 도착했어요. 방은 삼 층에 있어요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 한빛 기숙사에 도착했어요.",
          "zh": "今天到了韩光宿舍。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "제 방은 삼 층에 있어요.",
          "zh": "我的房间在三楼。",
          "t": [
            3.62,
            6.22
          ]
        },
        {
          "ko": "사감 선생님께 인사를 했어요.",
          "zh": "向宿管老师问了好。",
          "t": [
            6.62,
            9.46
          ]
        },
        {
          "ko": "\"안녕하세요, 저는 토리예요.\"",
          "zh": "“您好，我是兔莉。”",
          "t": [
            9.86,
            13.17
          ]
        },
        {
          "ko": "방이 깨끗해서 기분이 좋아요.",
          "zh": "房间很干净，心情很好。",
          "t": [
            13.57,
            15.79
          ]
        }
      ],
      "vocab": [
        {
          "word": "기숙사",
          "reading": "gi-suk-sa",
          "meaning": "宿舍"
        },
        {
          "word": "방",
          "reading": "bang",
          "meaning": "房间"
        },
        {
          "word": "층",
          "reading": "cheung",
          "meaning": "楼、层"
        },
        {
          "word": "깨끗해서",
          "reading": "kkae-kkeu-tae-seo",
          "meaning": "因为干净"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "도착했어요",
          "reading": "do-cha-kae-sseo-yo",
          "meaning": "到达了"
        },
        {
          "word": "사감",
          "reading": "sa-gam",
          "meaning": "宿管、舍监"
        },
        {
          "word": "선생님",
          "reading": "seon-saeng-nim",
          "meaning": "老师"
        },
        {
          "word": "인사",
          "reading": "in-sa",
          "meaning": "打招呼、问候"
        },
        {
          "word": "안녕하세요",
          "reading": "an-nyeong-ha-se-yo",
          "meaning": "您好"
        },
        {
          "word": "기분",
          "reading": "gi-bun",
          "meaning": "心情"
        },
        {
          "word": "좋아요",
          "reading": "jo-a-yo",
          "meaning": "好"
        }
      ],
      "quiz": [
        {
          "question": "토리의 방은 몇 층에 있어요?",
          "options": [
            "삼 층",
            "일 층",
            "오 층",
            "십 층"
          ],
          "answerIndex": 0,
          "explanation": "第二句说“我的房间在三楼（삼 층）”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "방 깨끗해서 좋겠다! 💧",
          "zh": "房间干净真好啊",
          "audioUrl": "/audio/blog/comments/w1-tori-dorm-c0.mp3"
        },
        {
          "animalId": "darami",
          "ko": "기숙사 생활 잘 적응하길 바라요 🌅",
          "zh": "希望你尽快适应宿舍生活",
          "audioUrl": "/audio/blog/comments/w1-tori-dorm-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "darami",
        "news",
        "nabi"
      ],
      "images": [
        {
          "url": "/images/blog/w1-tori-dorm-1-1784644957146.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w1-tori-dorm.mp3",
    "audioDuration": 16,
    "coverEmoji": "🏠",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 13,
    "publishedAt": 1782499918380,
    "isFeatured": false,
    "unlockDay": 4,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-16",
    "slug": "w1-nabi-sky",
    "titleKo": "오늘 서울 하늘이 예뻐요",
    "titleZh": "今天首尔的天空好美",
    "excerptKo": "저녁에 하늘이 분홍색이었어요. 사진으로 남기고 싶어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 저녁 하늘이 정말 예뻐요.",
          "zh": "今天傍晚的天空真美。",
          "t": [
            0,
            2.65
          ]
        },
        {
          "ko": "하늘이 분홍색이에요. ✨",
          "zh": "天空是粉色的。",
          "t": [
            3.05,
            4.51
          ]
        },
        {
          "ko": "이런 순간을 사진으로 남기고 싶어요.",
          "zh": "想把这样的瞬间用照片留下来。",
          "t": [
            4.91,
            7.42
          ]
        }
      ],
      "vocab": [
        {
          "word": "하늘",
          "reading": "ha-neul",
          "meaning": "天空"
        },
        {
          "word": "저녁",
          "reading": "jeo-nyeok",
          "meaning": "傍晚、晚上"
        },
        {
          "word": "분홍색",
          "reading": "bun-hong-saek",
          "meaning": "粉色"
        },
        {
          "word": "사진",
          "reading": "sa-jin",
          "meaning": "照片"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        },
        {
          "word": "예뻐요",
          "reading": "ye-ppeo-yo",
          "meaning": "漂亮、美"
        },
        {
          "word": "이런",
          "reading": "i-reon",
          "meaning": "这样的"
        },
        {
          "word": "순간",
          "reading": "sun-gan",
          "meaning": "瞬间"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "우와, 하늘 색이 진짜 예뻐요! 🌸",
          "zh": "哇，天空的颜色真美！",
          "audioUrl": "/audio/blog/comments/w1-nabi-sky-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "나비는 사진을 참 잘 찍어요 🐨",
          "zh": "娜比拍照真的很棒",
          "audioUrl": "/audio/blog/comments/w1-nabi-sky-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "koal",
        "haru",
        "choco"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-nabi-sky.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌆",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nabi",
    "likeCount": 21,
    "publishedAt": 1782583310070,
    "isFeatured": false,
    "unlockDay": 5,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-11",
    "slug": "w1-haru-newneighbor",
    "titleKo": "새 이웃이 이사 왔어요 🌰",
    "titleZh": "新邻居搬来了",
    "excerptKo": "아래층에 귀여운 토끼 이웃이 왔어요. 도토리 과자를 나눴어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "우리 기숙사에 새 이웃이 이사 왔어요.",
          "zh": "我们宿舍搬来了新邻居。",
          "t": [
            0,
            4.35
          ]
        },
        {
          "ko": "이름은 토리예요. 토끼 친구예요.",
          "zh": "名字叫兔莉，是只兔子朋友。",
          "t": [
            4.75,
            8.74
          ]
        },
        {
          "ko": "같이 도토리 과자를 먹었어요. 🌰",
          "zh": "一起吃了橡子饼干。",
          "t": [
            9.14,
            12.6
          ]
        }
      ],
      "vocab": [
        {
          "word": "이사",
          "reading": "i-sa",
          "meaning": "搬家"
        },
        {
          "word": "과자",
          "reading": "gwa-ja",
          "meaning": "饼干、点心"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "우리",
          "reading": "u-ri",
          "meaning": "我们"
        },
        {
          "word": "기숙사",
          "reading": "gi-suk-sa",
          "meaning": "宿舍"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "이웃",
          "reading": "i-ut",
          "meaning": "邻居"
        },
        {
          "word": "이름",
          "reading": "i-reum",
          "meaning": "名字"
        },
        {
          "word": "토끼",
          "reading": "to-kki",
          "meaning": "兔子"
        },
        {
          "word": "도토리",
          "reading": "do-to-ri",
          "meaning": "橡子"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "하루야, 과자 정말 맛있었어요! 🌸",
          "zh": "哈鲁，饼干真的很好吃！",
          "audioUrl": "/audio/blog/comments/w1-haru-newneighbor-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "도토리 과자?! 저도 먹고 싶어요 🍫",
          "zh": "橡子饼干？！我也想吃",
          "audioUrl": "/audio/blog/comments/w1-haru-newneighbor-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "minji",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-haru-newneighbor.mp3",
    "audioDuration": 13,
    "coverEmoji": "🌰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "haru",
    "likeCount": 12,
    "publishedAt": 1782583315070,
    "isFeatured": false,
    "unlockDay": 5,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-10",
    "slug": "w1-tori-meet-haru",
    "titleKo": "기숙사에서 하루를 만났어요",
    "titleZh": "在宿舍遇见了哈鲁",
    "excerptKo": "기숙사 아래층에서 이웃 하루를 만났어요. 맞죠?",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 기숙사 아래층에서 하루를 만났어요.",
          "zh": "今天在宿舍楼下遇见了哈鲁。",
          "t": [
            0,
            3.36
          ]
        },
        {
          "ko": "\"우리 같은 층이죠, 맞죠?\" 하고 물었어요.",
          "zh": "我问“我们是同一层，对吧？”",
          "t": [
            3.76,
            8.45
          ]
        },
        {
          "ko": "하루는 조용하지만 아주 따뜻해요.",
          "zh": "哈鲁很安静，但很温暖。",
          "t": [
            8.85,
            11.74
          ]
        }
      ],
      "vocab": [
        {
          "word": "아래층",
          "reading": "a-rae-cheung",
          "meaning": "楼下"
        },
        {
          "word": "같은",
          "reading": "ga-teun",
          "meaning": "相同的"
        },
        {
          "word": "조용하지만",
          "reading": "jo-yong-ha-ji-man",
          "meaning": "虽然安静"
        },
        {
          "word": "따뜻해요",
          "reading": "tta-tteu-tae-yo",
          "meaning": "温暖"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "기숙사",
          "reading": "gi-suk-sa",
          "meaning": "宿舍"
        },
        {
          "word": "만났어요",
          "reading": "man-na-sseo-yo",
          "meaning": "遇见了"
        },
        {
          "word": "우리",
          "reading": "u-ri",
          "meaning": "我们"
        },
        {
          "word": "물었어요",
          "reading": "mu-reo-sseo-yo",
          "meaning": "问了"
        },
        {
          "word": "아주",
          "reading": "a-ju",
          "meaning": "非常"
        }
      ],
      "quiz": [
        {
          "question": "토리는 하루를 어디에서 만났어요?",
          "options": [
            "기숙사 아래층",
            "공항",
            "학교",
            "카페"
          ],
          "answerIndex": 0,
          "explanation": "第一句说“今天在宿舍楼下（아래층）遇见了하루”。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "맞아요! 우리 이웃이에요 🌰",
          "zh": "没错！我们是邻居",
          "audioUrl": "/audio/blog/comments/w1-tori-meet-haru-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "하루도 좋은 친구예요! 💧",
          "zh": "哈鲁也是好朋友哦！",
          "audioUrl": "/audio/blog/comments/w1-tori-meet-haru-c1.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "nabi",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w1-tori-meet-haru-1-1784644979859.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w1-tori-meet-haru.mp3",
    "audioDuration": 12,
    "coverEmoji": "🐹",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "tori",
    "likeCount": 17,
    "publishedAt": 1782583316070,
    "isFeatured": false,
    "unlockDay": 5,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-17",
    "slug": "w1-choco-snack",
    "titleKo": "기숙사 앞 붕어빵 발견! 🍫",
    "titleZh": "宿舍前发现了鲷鱼烧！",
    "excerptKo": "기숙사 앞에서 붕어빵을 팔아요. 진짜 맛있어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "기숙사 앞에서 붕어빵을 팔아요.",
          "zh": "宿舍前面在卖鲷鱼烧。",
          "t": [
            0,
            2.32
          ]
        },
        {
          "ko": "하나에 오백 원이에요. 🍫",
          "zh": "一个五百韩元。",
          "t": [
            2.72,
            4.18
          ]
        },
        {
          "ko": "따뜻하고 정말 맛있어요!",
          "zh": "热乎乎的，真好吃！",
          "t": [
            4.58,
            6.38
          ]
        }
      ],
      "vocab": [
        {
          "word": "붕어빵",
          "reading": "bung-eo-ppang",
          "meaning": "鲷鱼烧（豆沙鱼形饼）"
        },
        {
          "word": "앞",
          "reading": "ap",
          "meaning": "前面"
        },
        {
          "word": "맛있어요",
          "reading": "ma-si-sseo-yo",
          "meaning": "好吃"
        },
        {
          "word": "기숙사",
          "reading": "gi-suk-sa",
          "meaning": "宿舍"
        },
        {
          "word": "팔아요",
          "reading": "pa-ra-yo",
          "meaning": "卖"
        },
        {
          "word": "하나",
          "reading": "ha-na",
          "meaning": "一个"
        },
        {
          "word": "오백",
          "reading": "o-baek",
          "meaning": "五百"
        },
        {
          "word": "원",
          "reading": "won",
          "meaning": "韩元"
        },
        {
          "word": "따뜻하고",
          "reading": "tta-tteu-ta-go",
          "meaning": "温暖（而且）"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "어디예요? 저도 먹고 싶어요! 🌸",
          "zh": "在哪里？我也想吃！",
          "audioUrl": "/audio/blog/comments/w1-choco-snack-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "겨울엔 붕어빵이죠 🌰",
          "zh": "冬天就要吃鲷鱼烧呀",
          "audioUrl": "/audio/blog/comments/w1-choco-snack-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "같이 먹으러 가자!! 🔥",
          "zh": "一起去吃吧！！",
          "audioUrl": "/audio/blog/comments/w1-choco-snack-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "junho",
        "minji",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-choco-snack.mp3",
    "audioDuration": 6,
    "coverEmoji": "🐟",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "choco",
    "likeCount": 26,
    "publishedAt": 1782666729759,
    "isFeatured": false,
    "unlockDay": 6,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-13",
    "slug": "w1-junho-newterm",
    "titleKo": "새 학기 시작! 화이팅! 🔥",
    "titleZh": "新学期开始！加油！",
    "excerptKo": "새 학기가 시작됐어요! 새 친구도 많이 왔어요. 가자!!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새 학기가 시작됐어요! 🔥",
          "zh": "新学期开始了！",
          "t": [
            0,
            1.8
          ]
        },
        {
          "ko": "우리 반에 새 친구가 많이 왔어요.",
          "zh": "我们班来了很多新朋友。",
          "t": [
            2.2,
            4.8
          ]
        },
        {
          "ko": "올해도 다 같이 화이팅! 가자!! 🎤",
          "zh": "今年也一起加油！冲鸭！！",
          "t": [
            5.2,
            7.94
          ]
        }
      ],
      "vocab": [
        {
          "word": "학기",
          "reading": "hak-gi",
          "meaning": "学期"
        },
        {
          "word": "시작",
          "reading": "si-jak",
          "meaning": "开始"
        },
        {
          "word": "화이팅",
          "reading": "hwa-i-ting",
          "meaning": "加油"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "시작됐어요",
          "reading": "si-jak-dwae-sseo-yo",
          "meaning": "开始了"
        },
        {
          "word": "우리",
          "reading": "u-ri",
          "meaning": "我们"
        },
        {
          "word": "반",
          "reading": "ban",
          "meaning": "班级"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "很多"
        },
        {
          "word": "올해",
          "reading": "ol-hae",
          "meaning": "今年"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "준호, 오늘 인사 멋있었어요! 🌸",
          "zh": "俊浩，今天打招呼好帅！",
          "audioUrl": "/audio/blog/comments/w1-junho-newterm-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "반장님 파이팅! 🍫",
          "zh": "班长加油！",
          "audioUrl": "/audio/blog/comments/w1-junho-newterm-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "haru",
        "minji",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-junho-newterm.mp3",
    "audioDuration": 8,
    "coverEmoji": "🎤",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "junho",
    "likeCount": 24,
    "publishedAt": 1782666733759,
    "isFeatured": false,
    "unlockDay": 6,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-12",
    "slug": "w1-tori-school",
    "titleKo": "어학당 첫 수업 · 반장 준호",
    "titleZh": "语学堂第一课·班长俊浩",
    "excerptKo": "오늘 어학당 첫 수업이었어요. 반장 준호는 정말 활발해요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 어학당 첫 수업이었어요.",
          "zh": "今天是语学堂的第一节课。",
          "t": [
            0,
            2.6
          ]
        },
        {
          "ko": "반장 준호가 \"잘 부탁드려요!\" 하고 인사했어요.",
          "zh": "班长俊浩打招呼说“请多关照！”",
          "t": [
            3,
            7.69
          ]
        },
        {
          "ko": "준호는 목소리가 크고 활발해요. 🎤",
          "zh": "俊浩嗓门很大，很活泼。",
          "t": [
            8.09,
            10.88
          ]
        },
        {
          "ko": "교실 친구들이 다 웃었어요.",
          "zh": "教室里的朋友们都笑了。",
          "t": [
            11.28,
            14.26
          ]
        }
      ],
      "vocab": [
        {
          "word": "어학당",
          "reading": "eo-hak-dang",
          "meaning": "语学堂、语言学校"
        },
        {
          "word": "수업",
          "reading": "su-eop",
          "meaning": "课、上课"
        },
        {
          "word": "반장",
          "reading": "ban-jang",
          "meaning": "班长"
        },
        {
          "word": "활발해요",
          "reading": "hwal-bal-hae-yo",
          "meaning": "活泼"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "첫",
          "reading": "cheot",
          "meaning": "第一、首次"
        },
        {
          "word": "인사했어요",
          "reading": "in-sa-hae-sseo-yo",
          "meaning": "打招呼了"
        },
        {
          "word": "목소리",
          "reading": "mok-so-ri",
          "meaning": "嗓音、声音"
        },
        {
          "word": "크고",
          "reading": "keu-go",
          "meaning": "大（而且）"
        },
        {
          "word": "교실",
          "reading": "gyo-sil",
          "meaning": "教室"
        },
        {
          "word": "친구들",
          "reading": "chin-gu-deul",
          "meaning": "朋友们"
        },
        {
          "word": "웃었어요",
          "reading": "u-seo-sseo-yo",
          "meaning": "笑了"
        }
      ],
      "quiz": [
        {
          "question": "준호는 어떤 성격이에요?",
          "options": [
            "활발해요",
            "조용해요",
            "차가워요",
            "느려요"
          ],
          "answerIndex": 0,
          "explanation": "第三句说준호“嗓门大、很活泼（활발해요）”。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "토리! 우리 반 최고예요! 가자!! 🔥",
          "zh": "兔莉！我们班最棒！冲鸭！！",
          "audioUrl": "/audio/blog/comments/w1-tori-school-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "준호는 언제나 힘이 넘쳐요 😆",
          "zh": "俊浩总是充满活力",
          "audioUrl": "/audio/blog/comments/w1-tori-school-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "haru",
        "minji",
        "darami",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-tori-school.mp3",
    "audioDuration": 14,
    "coverEmoji": "🐯",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 20,
    "publishedAt": 1782666734759,
    "isFeatured": false,
    "unlockDay": 6,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-subway",
    "slug": "subway-morning",
    "titleKo": "아침 지하철",
    "titleZh": "早晨的地铁",
    "excerptKo": "매일 아침 지하철을 타고 학교에 가는 이야기예요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "저는 아침마다 지하철을 타고 학교에 가요.",
          "zh": "我每天早上坐地铁去学校。",
          "t": [
            0,
            4.45
          ]
        },
        {
          "ko": "지하철역은 우리 집에서 아주 가까워요.",
          "zh": "地铁站离我家很近。",
          "t": [
            4.85,
            8.92
          ]
        },
        {
          "ko": "아침에는 사람이 정말 많아요.",
          "zh": "早上人特别多。",
          "t": [
            9.32,
            12.44
          ]
        },
        {
          "ko": "그래서 저는 항상 이어폰으로 음악을 들어요.",
          "zh": "所以我总是用耳机听音乐。",
          "t": [
            12.84,
            16.4
          ]
        },
        {
          "ko": "지하철 요금은 카드로 내면 편해요.",
          "zh": "地铁的费用用卡付很方便。",
          "t": [
            16.8,
            20.11
          ]
        },
        {
          "ko": "창밖으로 한강이 보이면 기분이 좋아요.",
          "zh": "从窗外看到汉江时，心情很好。",
          "t": [
            20.51,
            24.38
          ]
        },
        {
          "ko": "학교까지 삼십 분쯤 걸려요.",
          "zh": "到学校大约要三十分钟。",
          "t": [
            24.78,
            27.95
          ]
        }
      ],
      "vocab": [
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早晨、早上"
        },
        {
          "word": "지하철",
          "reading": "ji-ha-cheol",
          "meaning": "地铁"
        },
        {
          "word": "지하철역",
          "reading": "ji-ha-cheol-yeok",
          "meaning": "地铁站"
        },
        {
          "word": "학교",
          "reading": "hak-gyo",
          "meaning": "学校"
        },
        {
          "word": "집",
          "reading": "jip",
          "meaning": "家、房子"
        },
        {
          "word": "이어폰",
          "reading": "i-eo-pon",
          "meaning": "耳机"
        },
        {
          "word": "음악",
          "reading": "eum-ak",
          "meaning": "音乐"
        },
        {
          "word": "요금",
          "reading": "yo-geum",
          "meaning": "费用、票价"
        },
        {
          "word": "카드",
          "reading": "ka-deu",
          "meaning": "卡、卡片"
        },
        {
          "word": "창밖",
          "reading": "chang-bak",
          "meaning": "窗外"
        },
        {
          "word": "한강",
          "reading": "han-gang",
          "meaning": "汉江（首尔的河）"
        },
        {
          "word": "기분",
          "reading": "gi-bun",
          "meaning": "心情、情绪"
        }
      ],
      "quiz": [
        {
          "question": "글쓴이는 아침에 무엇을 타고 학교에 가요?",
          "options": [
            "지하철",
            "버스",
            "자전거",
            "택시"
          ],
          "answerIndex": 0,
          "explanation": "第一句说“每天早上坐地铁去学校”。"
        }
      ],
      "comments": [
        {
          "animalId": "choco",
          "ko": "지하철 아침엔 진짜 붐비죠 ㅠㅠ",
          "zh": "地铁早上真的很挤",
          "audioUrl": "/audio/blog/comments/subway-morning-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "저는 버스 타요~",
          "zh": "我坐公交呀",
          "audioUrl": "/audio/blog/comments/subway-morning-c1.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "음악 들으면 시간 금방 가지 :)",
          "zh": "听着音乐时间过得很快呢",
          "audioUrl": "/audio/blog/comments/subway-morning-c2.mp3"
        }
      ],
      "likedBy": [
        "choco",
        "koal",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/subway-morning.mp3",
    "audioDuration": 28,
    "coverEmoji": "🚇",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "tori",
    "likeCount": 12,
    "publishedAt": 1782333019001,
    "isFeatured": false,
    "unlockDay": 7,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-15",
    "slug": "w1-news-weekreview",
    "titleKo": "이번 주 동물시 소식",
    "titleZh": "本周动物城消息",
    "excerptKo": "이번 주 동물시에는 새 이웃과 새 학기 소식이 있었어요.",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "동물시 뉴스예요.",
          "zh": "这里是动物城新闻。",
          "t": [
            0,
            1.32
          ]
        },
        {
          "ko": "이번 주에 새 이웃이 왔어요.",
          "zh": "这周来了新邻居。",
          "t": [
            1.72,
            3.57
          ]
        },
        {
          "ko": "그리고 어학당 새 학기가 시작됐어요.",
          "zh": "而且语学堂新学期开始了。",
          "t": [
            3.97,
            6.66
          ]
        },
        {
          "ko": "다음 주도 좋은 소식이 많기를 바라요!",
          "zh": "希望下周也有很多好消息！",
          "t": [
            7.06,
            9.33
          ]
        }
      ],
      "vocab": [
        {
          "word": "소식",
          "reading": "so-sik",
          "meaning": "消息"
        },
        {
          "word": "학기",
          "reading": "hak-gi",
          "meaning": "学期"
        },
        {
          "word": "다음 주",
          "reading": "da-eum ju",
          "meaning": "下周"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "뉴스",
          "reading": "nyu-seu",
          "meaning": "新闻"
        },
        {
          "word": "이번 주",
          "reading": "i-beon ju",
          "meaning": "这周"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "이웃",
          "reading": "i-ut",
          "meaning": "邻居"
        },
        {
          "word": "어학당",
          "reading": "eo-hak-dang",
          "meaning": "语学堂、语言学校"
        },
        {
          "word": "시작됐어요",
          "reading": "si-jak-dwae-sseo-yo",
          "meaning": "开始了"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "이번 주도 평화로웠네요 ✨",
          "zh": "这周也很平和呢",
          "audioUrl": "/audio/blog/comments/w1-news-weekreview-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "다음 주도 잘 부탁해요 🐨",
          "zh": "下周也请多关照",
          "audioUrl": "/audio/blog/comments/w1-news-weekreview-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "nabi",
        "koal",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-news-weekreview.mp3",
    "audioDuration": 9,
    "coverEmoji": "📰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 8,
    "publishedAt": 1782750152449,
    "isFeatured": false,
    "unlockDay": 7,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w1-14",
    "slug": "w1-tori-firstweek",
    "titleKo": "지하철에서 하루가 제 당근을 주웠어요",
    "titleZh": "地铁上，哈鲁捡起了我的胡萝卜",
    "excerptKo": "막차, 휴대폰 1%, 그리고 굴러간 용기 당근… 하루가 주워 줬어요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 밤 지하철에서 길을 잃었어요.",
          "zh": "今晚在地铁里迷路了。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "휴대폰은 1%, 막차도 곧 와요. 무서웠어요. 😥",
          "zh": "手机只剩1%，末班车也快来了。好害怕。",
          "t": [
            3.71,
            9.11
          ]
        },
        {
          "ko": "그때 엄마 당근이 바닥에 떨어졌어요.",
          "zh": "那时妈妈给的胡萝卜掉到了地上。",
          "t": [
            9.51,
            13.15
          ]
        },
        {
          "ko": "하루가 당근을 주웠어요. \"여기, 괜찮아?\" 🌰",
          "zh": "哈鲁捡起胡萝卜。“给你，没事吧？”",
          "t": [
            13.55,
            18
          ]
        },
        {
          "ko": "막차는 놓쳤어요. 그래도 정말 행복해요! 🌸",
          "zh": "虽然没赶上末班车，但真的很幸福！",
          "t": [
            18.4,
            23.14
          ]
        }
      ],
      "vocab": [
        {
          "word": "지하철",
          "reading": "ji-ha-cheol",
          "meaning": "地铁"
        },
        {
          "word": "무서웠어요",
          "reading": "mu-seo-wo-sseo-yo",
          "meaning": "（曾）害怕"
        },
        {
          "word": "당근",
          "reading": "dang-geun",
          "meaning": "胡萝卜"
        },
        {
          "word": "행복해요",
          "reading": "haeng-bo-kae-yo",
          "meaning": "幸福"
        },
        {
          "word": "밤",
          "reading": "bam",
          "meaning": "夜晚"
        },
        {
          "word": "길",
          "reading": "gil",
          "meaning": "路"
        },
        {
          "word": "잃었어요",
          "reading": "i-reo-sseo-yo",
          "meaning": "迷失、丢了"
        },
        {
          "word": "휴대폰",
          "reading": "hyu-dae-pon",
          "meaning": "手机"
        },
        {
          "word": "막차",
          "reading": "mak-cha",
          "meaning": "末班车"
        },
        {
          "word": "그때",
          "reading": "geu-ttae",
          "meaning": "那时"
        },
        {
          "word": "엄마",
          "reading": "eom-ma",
          "meaning": "妈妈"
        },
        {
          "word": "주웠어요",
          "reading": "ju-wo-sseo-yo",
          "meaning": "捡起了"
        }
      ],
      "quiz": [
        {
          "question": "하루가 지하철에서 뭘 주웠어요?",
          "options": [
            "당근",
            "휴대폰",
            "가방",
            "지갑"
          ],
          "answerIndex": 0,
          "explanation": "哈鲁捡起了兔莉掉在地上的“妈妈给的胡萝卜(당근)”。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "그 당근, 정말 소중해 보였어요 🌰",
          "zh": "那根胡萝卜，看起来真的很珍贵",
          "audioUrl": "/audio/blog/comments/w1-tori-firstweek-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "막차 놓쳐도 괜찮아요! 😆💧",
          "zh": "没赶上末班车也没关系！",
          "audioUrl": "/audio/blog/comments/w1-tori-firstweek-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "하루 완전 멋있다! 🔥",
          "zh": "哈鲁太帅了！",
          "audioUrl": "/audio/blog/comments/w1-tori-firstweek-c2.mp3"
        },
        {
          "animalId": "darami",
          "ko": "토리, 무서웠겠어요. 잘 견뎠어요! 🌅",
          "zh": "兔莉，肯定很害怕吧。你挺过来了！",
          "audioUrl": "/audio/blog/comments/w1-tori-firstweek-c3.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "junho",
        "darami",
        "nabi",
        "choco",
        "news",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w1-tori-firstweek.mp3",
    "audioDuration": 23,
    "coverEmoji": "🚇",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 28,
    "publishedAt": 1782750153449,
    "isFeatured": true,
    "unlockDay": 7,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-03",
    "slug": "w2-koal-sleepy",
    "titleKo": "오늘도 조금 졸려요",
    "titleZh": "今天也有点困",
    "excerptKo": "졸린 하루예요. 커피 한 잔 하고 천천히 가요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘도 조금 졸려요. 😴",
          "zh": "今天也有点困。",
          "t": [
            0,
            1.99
          ]
        },
        {
          "ko": "편의점에서 커피를 샀어요.",
          "zh": "在便利店买了咖啡。",
          "t": [
            2.39,
            4.71
          ]
        },
        {
          "ko": "천천히 마셔요. 😌",
          "zh": "慢慢地喝。",
          "t": [
            5.11,
            6.62
          ]
        }
      ],
      "vocab": [
        {
          "word": "졸려요",
          "reading": "jol-lyeo-yo",
          "meaning": "困、想睡"
        },
        {
          "word": "커피",
          "reading": "keo-pi",
          "meaning": "咖啡"
        },
        {
          "word": "천천히",
          "reading": "cheon-cheon-hi",
          "meaning": "慢慢地"
        },
        {
          "word": "오늘도",
          "reading": "o-neul-do",
          "meaning": "今天也"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "편의점",
          "reading": "pyeon-ui-jeom",
          "meaning": "便利店"
        },
        {
          "word": "샀어요",
          "reading": "sa-sseo-yo",
          "meaning": "买了"
        },
        {
          "word": "마셔요",
          "reading": "ma-syeo-yo",
          "meaning": "喝"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "haru",
          "ko": "푹 쉬어요 🌰",
          "zh": "好好休息",
          "audioUrl": "/audio/blog/comments/w2-koal-sleepy-c0.mp3"
        },
        {
          "animalId": "tori",
          "ko": "저도 커피 좋아해요 ☕",
          "zh": "我也喜欢咖啡",
          "audioUrl": "/audio/blog/comments/w2-koal-sleepy-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "nabi"
      ],
      "images": [
        {
          "url": "/images/blog/w2-koal-sleepy-1-1784645002397.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-koal-sleepy.mp3",
    "audioDuration": 7,
    "coverEmoji": "😴",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "koal",
    "likeCount": 11,
    "publishedAt": 1782832615139,
    "isFeatured": false,
    "unlockDay": 8,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-02",
    "slug": "w2-news-dosirak",
    "titleKo": "편의점에 새 도시락이 나왔어요",
    "titleZh": "便利店出了新便当",
    "excerptKo": "동물시 편의점에 새 도시락이 나왔어요. 가격도 착해요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "동물시 편의점에 새 도시락이 나왔어요.",
          "zh": "动物城便利店出了新便当。",
          "t": [
            0,
            2.69
          ]
        },
        {
          "ko": "가격은 삼천 원이에요.",
          "zh": "价格是三千韩元。",
          "t": [
            3.09,
            4.7
          ]
        },
        {
          "ko": "많이 사 주세요! 📡",
          "zh": "请多多购买！",
          "t": [
            5.1,
            6.18
          ]
        }
      ],
      "vocab": [
        {
          "word": "도시락",
          "reading": "do-si-rak",
          "meaning": "便当"
        },
        {
          "word": "가격",
          "reading": "ga-gyeok",
          "meaning": "价格"
        },
        {
          "word": "삼천",
          "reading": "sam-cheon",
          "meaning": "三千"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "편의점",
          "reading": "pyeon-ui-jeom",
          "meaning": "便利店"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "나왔어요",
          "reading": "na-wa-sseo-yo",
          "meaning": "出来了、上市了"
        },
        {
          "word": "원",
          "reading": "won",
          "meaning": "韩元"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "很多、多多地"
        },
        {
          "word": "사 주세요",
          "reading": "sa ju-se-yo",
          "meaning": "请购买"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "choco",
          "ko": "도시락 좋아요! 먹으러 가요 🍫",
          "zh": "便当好耶！去吃吧",
          "audioUrl": "/audio/blog/comments/w2-news-dosirak-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "삼천 원이면 괜찮네요 🌿",
          "zh": "三千韩元的话还不错呢",
          "audioUrl": "/audio/blog/comments/w2-news-dosirak-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "koal",
        "haru"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-news-dosirak.mp3",
    "audioDuration": 6,
    "coverEmoji": "🍱",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 9,
    "publishedAt": 1782832616139,
    "isFeatured": false,
    "unlockDay": 8,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-01",
    "slug": "w2-tori-cu",
    "titleKo": "혼자 있는 밤, 엄마가 보고 싶어요",
    "titleZh": "独自一人的夜晚，好想妈妈",
    "excerptKo": "방에 혼자 있어요. 조금 외로워요. 그래도 괜찮아질 거예요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 밤 방에 혼자 있어요.",
          "zh": "今晚一个人待在房间里。",
          "t": [
            0,
            2.03
          ]
        },
        {
          "ko": "조금 외로워요. 엄마가 보고 싶어요. 😢",
          "zh": "有点孤独。好想妈妈。",
          "t": [
            2.43,
            6.17
          ]
        },
        {
          "ko": "그래도 괜찮아질 거예요. 화이팅! 🌸",
          "zh": "不过会好起来的。加油！",
          "t": [
            6.57,
            9.55
          ]
        }
      ],
      "vocab": [
        {
          "word": "혼자",
          "reading": "hon-ja",
          "meaning": "独自、一个人"
        },
        {
          "word": "외로워요",
          "reading": "oe-ro-wo-yo",
          "meaning": "孤独"
        },
        {
          "word": "보고 싶어요",
          "reading": "bo-go si-peo-yo",
          "meaning": "想念"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "밤",
          "reading": "bam",
          "meaning": "夜晚、晚上"
        },
        {
          "word": "방",
          "reading": "bang",
          "meaning": "房间"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "엄마",
          "reading": "eom-ma",
          "meaning": "妈妈"
        },
        {
          "word": "그래도",
          "reading": "geu-rae-do",
          "meaning": "不过、即便如此"
        },
        {
          "word": "괜찮아질 거예요",
          "reading": "gwaen-cha-na-jil geo-ye-yo",
          "meaning": "会好起来的"
        },
        {
          "word": "화이팅",
          "reading": "hwa-i-ting",
          "meaning": "加油"
        }
      ],
      "quiz": [
        {
          "question": "토리는 지금 어떤 기분이에요?",
          "options": [
            "조금 외로워요",
            "아주 신나요",
            "많이 배불러요",
            "너무 졸려요"
          ],
          "answerIndex": 0,
          "explanation": "兔莉说“조금 외로워요(有点孤独)”“엄마가 보고 싶어요(想妈妈)”，第一晚独处有点想家。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "토리, 내일 같이 아침 먹어요 🌰",
          "zh": "兔莉，明天一起吃早饭吧",
          "audioUrl": "/audio/blog/comments/w2-tori-cu-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "외로우면 언제든지 연락해요! 💧",
          "zh": "孤独的话随时联系我！",
          "audioUrl": "/audio/blog/comments/w2-tori-cu-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "choco",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-cu-1-1784645703854.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-cu.mp3",
    "audioDuration": 10,
    "coverEmoji": "🌙",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "tori",
    "likeCount": 14,
    "publishedAt": 1782832617139,
    "isFeatured": false,
    "unlockDay": 8,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-05",
    "slug": "w2-minji-won",
    "titleKo": "한국 돈, 같이 봐요!",
    "titleZh": "韩国的钱，一起看看！",
    "excerptKo": "천 원, 오천 원, 만 원! 동전도 있어요. 어렵지 않아요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "한국 돈은 조금 어려워요. 같이 봐요! 💧",
          "zh": "韩国的钱有点难。一起看看！",
          "t": [
            0,
            3.46
          ]
        },
        {
          "ko": "천 원, 오천 원, 만 원이 있어요.",
          "zh": "有一千、五千、一万韩元。",
          "t": [
            3.86,
            6.46
          ]
        },
        {
          "ko": "동전도 있어요. 백 원, 오백 원! 😆",
          "zh": "也有硬币。一百、五百韩元！",
          "t": [
            6.86,
            10.78
          ]
        }
      ],
      "vocab": [
        {
          "word": "천 원",
          "reading": "cheon-won",
          "meaning": "一千韩元"
        },
        {
          "word": "동전",
          "reading": "dong-jeon",
          "meaning": "硬币"
        },
        {
          "word": "백 원",
          "reading": "baek-won",
          "meaning": "一百韩元"
        },
        {
          "word": "한국",
          "reading": "han-guk",
          "meaning": "韩国"
        },
        {
          "word": "돈",
          "reading": "don",
          "meaning": "钱"
        },
        {
          "word": "어려워요",
          "reading": "eo-ryeo-wo-yo",
          "meaning": "难"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "봐요",
          "reading": "bwa-yo",
          "meaning": "看"
        },
        {
          "word": "오천 원",
          "reading": "o-cheon-won",
          "meaning": "五千韩元"
        },
        {
          "word": "만 원",
          "reading": "man-won",
          "meaning": "一万韩元"
        },
        {
          "word": "오백 원",
          "reading": "o-baek-won",
          "meaning": "五百韩元"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 감사해요! 민지 씨 최고! 🌸",
          "zh": "哇，谢谢！敏智你最棒！",
          "audioUrl": "/audio/blog/comments/w2-minji-won-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "민지 씨 친절해요 🌰",
          "zh": "敏智真亲切",
          "audioUrl": "/audio/blog/comments/w2-minji-won-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "choco",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-minji-won.mp3",
    "audioDuration": 11,
    "coverEmoji": "🪙",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "minji",
    "likeCount": 15,
    "publishedAt": 1782916033828,
    "isFeatured": false,
    "unlockDay": 9,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-04",
    "slug": "w2-tori-money",
    "titleKo": "편의점에서 혼자 밥을 샀어요!",
    "titleZh": "在便利店自己买了饭！",
    "excerptKo": "\"이거 주세요. 그리고 이것도요.\" 혼자 성공했어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침에 배가 고파서 편의점에 갔어요.",
          "zh": "早上肚子饿，去了便利店。",
          "t": [
            0,
            3.55
          ]
        },
        {
          "ko": "\"이거 주세요. 그리고 이것도요.\"라고 말했어요.",
          "zh": "我说了“请给我这个，还有这个也要”。",
          "t": [
            3.95,
            9.64
          ]
        },
        {
          "ko": "삼각김밥하고 바나나우유를 샀어요. 혼자 성공! 😊",
          "zh": "买了三角饭团和香蕉牛奶。自己成功了！",
          "t": [
            10.04,
            15.39
          ]
        }
      ],
      "vocab": [
        {
          "word": "편의점",
          "reading": "pyeon-ui-jeom",
          "meaning": "便利店"
        },
        {
          "word": "이거",
          "reading": "i-geo",
          "meaning": "这个"
        },
        {
          "word": "삼각김밥",
          "reading": "sam-gak-gim-bap",
          "meaning": "三角饭团"
        },
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早上、早晨"
        },
        {
          "word": "배가 고파서",
          "reading": "bae-ga go-pa-seo",
          "meaning": "因为肚子饿"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "주세요",
          "reading": "ju-se-yo",
          "meaning": "请给我"
        },
        {
          "word": "말했어요",
          "reading": "mal-hae-sseo-yo",
          "meaning": "说了"
        },
        {
          "word": "바나나우유",
          "reading": "ba-na-na-u-yu",
          "meaning": "香蕉牛奶"
        },
        {
          "word": "성공",
          "reading": "seong-gong",
          "meaning": "成功"
        }
      ],
      "quiz": [
        {
          "question": "토리는 편의점에서 뭐라고 말했어요?",
          "options": [
            "이거 주세요.",
            "얼마예요?",
            "안녕하세요.",
            "괜찮아요."
          ],
          "answerIndex": 0,
          "explanation": "兔莉说了“이거 주세요”，买眼前的东西时最常用这句。“이것도요”是“这个也要”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "오, 혼자 샀어요? 대단해요! 💧",
          "zh": "哦，自己买的？太棒了！",
          "audioUrl": "/audio/blog/comments/w2-tori-money-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "바나나우유 맛있죠 🌰",
          "zh": "香蕉牛奶好喝吧",
          "audioUrl": "/audio/blog/comments/w2-tori-money-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "junho"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-money-1-1784645014980.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-money.mp3",
    "audioDuration": 15,
    "coverEmoji": "🏪",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 13,
    "publishedAt": 1782916034828,
    "isFeatured": false,
    "unlockDay": 9,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-08",
    "slug": "w2-haru-lunch",
    "titleKo": "토리하고 식당에서 밥을 먹었어요",
    "titleZh": "和兔莉在食堂吃了饭",
    "excerptKo": "오늘 토리하고 같이 점심을 먹었어요. 김치찌개가 맛있었어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 토리하고 식당에서 밥을 먹었어요.",
          "zh": "今天和兔莉在食堂吃了饭。",
          "t": [
            0,
            3.65
          ]
        },
        {
          "ko": "김치찌개가 정말 맛있었어요. 🌰",
          "zh": "泡菜汤真的很好吃。",
          "t": [
            4.05,
            7.4
          ]
        },
        {
          "ko": "다음에 또 같이 먹어요, 토리 씨. ☕",
          "zh": "下次再一起吃吧，兔莉。",
          "t": [
            7.8,
            10.88
          ]
        }
      ],
      "vocab": [
        {
          "word": "맛있었어요",
          "reading": "ma-si-sseo-sseo-yo",
          "meaning": "（过去）好吃"
        },
        {
          "word": "다음",
          "reading": "da-eum",
          "meaning": "下次、下一个"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "식당",
          "reading": "sik-dang",
          "meaning": "食堂"
        },
        {
          "word": "밥",
          "reading": "bap",
          "meaning": "饭"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        },
        {
          "word": "김치찌개",
          "reading": "gim-chi-jji-gae",
          "meaning": "泡菜汤"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        },
        {
          "word": "또",
          "reading": "tto",
          "meaning": "再、又"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "저도 즐거웠어요! 🌸",
          "zh": "我也很开心！",
          "audioUrl": "/audio/blog/comments/w2-haru-lunch-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "둘이 친해요! 💧",
          "zh": "你俩关系真好！",
          "audioUrl": "/audio/blog/comments/w2-haru-lunch-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "minji",
        "choco",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-haru-lunch.mp3",
    "audioDuration": 11,
    "coverEmoji": "🥢",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "haru",
    "likeCount": 13,
    "publishedAt": 1782999451518,
    "isFeatured": false,
    "unlockDay": 10,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-07",
    "slug": "w2-darami-morning-d10",
    "titleKo": "좋은 아침이에요! 오늘의 단어는 \"밥\"",
    "titleZh": "早上好！今天的单词是“饭”",
    "excerptKo": "오늘 서울은 조금 흐려요. 다 같이 밥 먹어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "좋은 아침이에요! 다람쥐예요. 🌅",
          "zh": "早上好！我是松鼠。",
          "t": [
            0,
            3.41
          ]
        },
        {
          "ko": "오늘 서울은 조금 흐려요.",
          "zh": "今天首尔有点阴。",
          "t": [
            3.81,
            6.72
          ]
        },
        {
          "ko": "오늘의 단어는 \"밥\"이에요. 다 같이 밥 먹어요! 🍚",
          "zh": "今天的单词是“饭”。大家一起吃饭吧！",
          "t": [
            7.12,
            12.18
          ]
        }
      ],
      "vocab": [
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早晨、早上"
        },
        {
          "word": "흐려요",
          "reading": "heu-ryeo-yo",
          "meaning": "阴天"
        },
        {
          "word": "밥",
          "reading": "bap",
          "meaning": "饭"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        },
        {
          "word": "다람쥐",
          "reading": "da-ram-jwi",
          "meaning": "松鼠"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "서울",
          "reading": "seo-ul",
          "meaning": "首尔"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "단어",
          "reading": "da-neo",
          "meaning": "单词"
        },
        {
          "word": "다 같이",
          "reading": "da ga-chi",
          "meaning": "大家一起"
        },
        {
          "word": "먹어요",
          "reading": "meo-geo-yo",
          "meaning": "吃"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "좋은 아침이에요! 🌸",
          "zh": "早上好！",
          "audioUrl": "/audio/blog/comments/w2-darami-morning-d10-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "오늘도 화이팅 🌿",
          "zh": "今天也加油",
          "audioUrl": "/audio/blog/comments/w2-darami-morning-d10-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "koal",
        "haru",
        "choco",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-darami-morning-d10.mp3",
    "audioDuration": 12,
    "coverEmoji": "🌅",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "darami",
    "likeCount": 10,
    "publishedAt": 1782999452518,
    "isFeatured": false,
    "unlockDay": 10,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-06",
    "slug": "w2-tori-cafeteria",
    "titleKo": "준호랑 식당에서 된장찌개를 먹었어요",
    "titleZh": "和俊浩在食堂吃了大酱汤",
    "excerptKo": "김치찌개는 없어요. 된장찌개는 있어요! 준호가 도와줬어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "준호랑 학교 식당에 갔어요.",
          "zh": "和俊浩去了学校食堂。",
          "t": [
            0,
            2.51
          ]
        },
        {
          "ko": "\"김치찌개 있어요?\" 그런데 오늘은 없어요. 😅",
          "zh": "“有泡菜汤吗？”可是今天没有。",
          "t": [
            2.91,
            7.4
          ]
        },
        {
          "ko": "된장찌개는 있어요! 준호가 뜻을 알려줬어요. 😊",
          "zh": "有大酱汤！俊浩告诉了我它的意思（된장=大酱）。",
          "t": [
            7.8,
            12.15
          ]
        },
        {
          "ko": "따뜻해서 엄마 생각이 났어요. 🌸",
          "zh": "热乎乎的，想起了妈妈。",
          "t": [
            12.55,
            15.82
          ]
        }
      ],
      "vocab": [
        {
          "word": "식당",
          "reading": "sik-dang",
          "meaning": "食堂"
        },
        {
          "word": "김치찌개",
          "reading": "gim-chi-jji-gae",
          "meaning": "泡菜汤"
        },
        {
          "word": "된장찌개",
          "reading": "doen-jang-jji-gae",
          "meaning": "大酱汤"
        },
        {
          "word": "학교",
          "reading": "hak-gyo",
          "meaning": "学校"
        },
        {
          "word": "있어요",
          "reading": "i-sseo-yo",
          "meaning": "有"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "없어요",
          "reading": "eop-seo-yo",
          "meaning": "没有"
        },
        {
          "word": "뜻",
          "reading": "tteut",
          "meaning": "意思、含义"
        },
        {
          "word": "알려줬어요",
          "reading": "al-lyeo-jwo-sseo-yo",
          "meaning": "告诉了、教了"
        },
        {
          "word": "따뜻해서",
          "reading": "tta-tteu-tae-seo",
          "meaning": "因为温暖"
        },
        {
          "word": "생각",
          "reading": "saeng-gak",
          "meaning": "想法、想起"
        }
      ],
      "quiz": [
        {
          "question": "오늘 식당에 뭐가 있어요?",
          "options": [
            "된장찌개",
            "김치찌개",
            "불고기",
            "커피"
          ],
          "answerIndex": 0,
          "explanation": "今天食堂没有泡菜汤(김치찌개 없어요)，有大酱汤(된장찌개 있어요)。“있어요/없어요”表示“有/没有”。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "된장찌개 최고지! 🔥",
          "zh": "大酱汤最棒了！",
          "audioUrl": "/audio/blog/comments/w2-tori-cafeteria-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "따뜻한 국물이 최고예요 🌰",
          "zh": "热乎乎的汤最棒了",
          "audioUrl": "/audio/blog/comments/w2-tori-cafeteria-c1.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "choco",
        "minji",
        "koal",
        "junho"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-cafeteria-1-1784645688684.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-cafeteria.mp3",
    "audioDuration": 16,
    "coverEmoji": "🍲",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 12,
    "publishedAt": 1782999453518,
    "isFeatured": false,
    "unlockDay": 10,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-10",
    "slug": "w2-nabi-stationery",
    "titleKo": "예쁜 노트를 봤어요",
    "titleZh": "看到了漂亮的笔记本",
    "excerptKo": "다이소에서 예쁜 노트를 봤어요. 색깔이 정말 예뻐요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다이소에서 예쁜 노트를 봤어요. ✨",
          "zh": "在大创看到了漂亮的笔记本。",
          "t": [
            0,
            2.03
          ]
        },
        {
          "ko": "색깔이 정말 예뻐요.",
          "zh": "颜色真漂亮。",
          "t": [
            2.43,
            4.37
          ]
        },
        {
          "ko": "사진을 찍었어요. 📷",
          "zh": "拍了照片。",
          "t": [
            4.77,
            6.42
          ]
        }
      ],
      "vocab": [
        {
          "word": "노트",
          "reading": "no-teu",
          "meaning": "笔记本"
        },
        {
          "word": "색깔",
          "reading": "saek-kkal",
          "meaning": "颜色"
        },
        {
          "word": "사진",
          "reading": "sa-jin",
          "meaning": "照片"
        },
        {
          "word": "다이소",
          "reading": "da-i-so",
          "meaning": "大创（Daiso）"
        },
        {
          "word": "예쁜",
          "reading": "ye-ppeun",
          "meaning": "漂亮的"
        },
        {
          "word": "봤어요",
          "reading": "bwa-sseo-yo",
          "meaning": "看到了"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        },
        {
          "word": "예뻐요",
          "reading": "ye-ppeo-yo",
          "meaning": "漂亮"
        },
        {
          "word": "찍었어요",
          "reading": "jji-geo-sseo-yo",
          "meaning": "拍了（照）"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 저도 사고 싶어요! 🌸",
          "zh": "哇，我也想买！",
          "audioUrl": "/audio/blog/comments/w2-nabi-stationery-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "나비 씨 사진 잘 찍어요 🍫",
          "zh": "娜比拍照拍得真好",
          "audioUrl": "/audio/blog/comments/w2-nabi-stationery-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "haru",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w2-nabi-stationery-1-1784645501747.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-nabi-stationery.mp3",
    "audioDuration": 6,
    "coverEmoji": "📔",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nabi",
    "likeCount": 12,
    "publishedAt": 1783082849208,
    "isFeatured": false,
    "unlockDay": 11,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-09",
    "slug": "w2-tori-daiso",
    "titleKo": "다이소에서 생활용품을 샀어요",
    "titleZh": "在大创买了生活用品",
    "excerptKo": "다이소에는 물건이 정말 많아요. 컵하고 수건을 샀어요. 정말 싸요!",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 다이소에 갔어요.",
          "zh": "今天去了大创（Daiso）。",
          "t": [
            0,
            2.41
          ]
        },
        {
          "ko": "다이소에는 물건이 정말 많아요.",
          "zh": "大创里的东西真多。",
          "t": [
            2.81,
            5.85
          ]
        },
        {
          "ko": "\"이거 얼마예요?\"라고 물어봤어요.",
          "zh": "我问了“这个多少钱？”。",
          "t": [
            6.25,
            9.46
          ]
        },
        {
          "ko": "컵하고 수건을 샀어요.",
          "zh": "买了杯子和毛巾。",
          "t": [
            9.86,
            12.32
          ]
        },
        {
          "ko": "전부 오천 원이었어요. 정말 싸요! 😍",
          "zh": "一共五千韩元。真便宜！",
          "t": [
            12.72,
            16.6
          ]
        }
      ],
      "vocab": [
        {
          "word": "물건",
          "reading": "mul-geon",
          "meaning": "东西、物品"
        },
        {
          "word": "컵",
          "reading": "keop",
          "meaning": "杯子"
        },
        {
          "word": "수건",
          "reading": "su-geon",
          "meaning": "毛巾"
        },
        {
          "word": "싸요",
          "reading": "ssa-yo",
          "meaning": "便宜"
        },
        {
          "word": "다이소",
          "reading": "da-i-so",
          "meaning": "大创（Daiso）"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        },
        {
          "word": "많아요",
          "reading": "ma-na-yo",
          "meaning": "多"
        },
        {
          "word": "얼마예요",
          "reading": "eol-ma-ye-yo",
          "meaning": "多少钱"
        },
        {
          "word": "물어봤어요",
          "reading": "mu-reo-bwa-sseo-yo",
          "meaning": "问了"
        },
        {
          "word": "전부",
          "reading": "jeon-bu",
          "meaning": "全部、一共"
        }
      ],
      "quiz": [
        {
          "question": "토리는 다이소에서 뭘 샀어요?",
          "options": [
            "컵하고 수건",
            "김치찌개",
            "삼각김밥",
            "커피"
          ],
          "answerIndex": 0,
          "explanation": "兔莉在大创买了杯子和毛巾（컵하고 수건）。“하고”表示“和”，用来连接两个名词。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "다이소 진짜 최고예요! 💧",
          "zh": "大创真是最棒的！",
          "audioUrl": "/audio/blog/comments/w2-tori-daiso-c0.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "거기 문구도 예뻐요 ✨",
          "zh": "那里的文具也很漂亮",
          "audioUrl": "/audio/blog/comments/w2-tori-daiso-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "수건 잘 샀어요 🌰",
          "zh": "毛巾买得好",
          "audioUrl": "/audio/blog/comments/w2-tori-daiso-c2.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "nabi",
        "haru",
        "choco",
        "koal",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-daiso-1-1784645506046.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-daiso.mp3",
    "audioDuration": 17,
    "coverEmoji": "🛍️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 17,
    "publishedAt": 1783082871208,
    "isFeatured": false,
    "unlockDay": 11,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-12",
    "slug": "w2-choco-cake",
    "titleKo": "이 카페 케이크가 진짜 맛있어요",
    "titleZh": "这家咖啡馆的蛋糕真好吃",
    "excerptKo": "초콜릿 케이크를 먹었어요. 여러분도 꼭 드세요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "이 카페 케이크가 진짜 맛있어요! 🍫",
          "zh": "这家咖啡馆的蛋糕真好吃！",
          "t": [
            0,
            2.94
          ]
        },
        {
          "ko": "초콜릿 케이크를 먹었어요.",
          "zh": "吃了巧克力蛋糕。",
          "t": [
            3.34,
            5.32
          ]
        },
        {
          "ko": "여러분도 꼭 드세요! 😋",
          "zh": "大家也一定要尝尝！",
          "t": [
            5.72,
            7.66
          ]
        }
      ],
      "vocab": [
        {
          "word": "케이크",
          "reading": "ke-i-keu",
          "meaning": "蛋糕"
        },
        {
          "word": "초콜릿",
          "reading": "cho-kol-lit",
          "meaning": "巧克力"
        },
        {
          "word": "여러분",
          "reading": "yeo-reo-bun",
          "meaning": "大家、各位"
        },
        {
          "word": "이",
          "reading": "i",
          "meaning": "这"
        },
        {
          "word": "카페",
          "reading": "ka-pe",
          "meaning": "咖啡馆"
        },
        {
          "word": "진짜",
          "reading": "jin-jja",
          "meaning": "真的"
        },
        {
          "word": "맛있어요",
          "reading": "ma-si-sseo-yo",
          "meaning": "好吃"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        },
        {
          "word": "꼭",
          "reading": "kkok",
          "meaning": "一定、务必"
        },
        {
          "word": "드세요",
          "reading": "deu-se-yo",
          "meaning": "请吃、请品尝"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 정말 맛있어요! 🌸",
          "zh": "哇，真好吃！",
          "audioUrl": "/audio/blog/comments/w2-choco-cake-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "저도 단거 좋아해요 🌰",
          "zh": "我也喜欢甜的",
          "audioUrl": "/audio/blog/comments/w2-choco-cake-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "minji",
        "koal",
        "nabi"
      ],
      "images": [
        {
          "url": "/images/blog/w2-choco-cake-1-1784645472958.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-choco-cake.mp3",
    "audioDuration": 8,
    "coverEmoji": "🍰",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "choco",
    "likeCount": 14,
    "publishedAt": 1783166267897,
    "isFeatured": false,
    "unlockDay": 12,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-11",
    "slug": "w2-tori-latte",
    "titleKo": "오늘 첫 라떼를 마셨어요",
    "titleZh": "今天喝了第一杯拿铁",
    "excerptKo": "작은 카페에서 따뜻한 라떼를 주문했어요. 정말 행복해요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 작은 카페에 갔어요. ☕",
          "zh": "今天去了一家小咖啡馆。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "\"따뜻한 라떼 주세요.\"라고 말했어요.",
          "zh": "我说了“请给我一杯热拿铁”。",
          "t": [
            3.62,
            7.22
          ]
        },
        {
          "ko": "라떼가 정말 맛있어요. 행복해요! 😊",
          "zh": "拿铁真好吃。好幸福！",
          "t": [
            7.62,
            11.74
          ]
        }
      ],
      "vocab": [
        {
          "word": "카페",
          "reading": "ka-pe",
          "meaning": "咖啡馆"
        },
        {
          "word": "따뜻한",
          "reading": "tta-tteu-tan",
          "meaning": "温热的"
        },
        {
          "word": "라떼",
          "reading": "ra-tte",
          "meaning": "拿铁"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "작은",
          "reading": "ja-geun",
          "meaning": "小的"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "주세요",
          "reading": "ju-se-yo",
          "meaning": "请给我"
        },
        {
          "word": "말했어요",
          "reading": "mal-hae-sseo-yo",
          "meaning": "说了"
        },
        {
          "word": "맛있어요",
          "reading": "ma-si-sseo-yo",
          "meaning": "好吃"
        },
        {
          "word": "행복해요",
          "reading": "haeng-bo-kae-yo",
          "meaning": "幸福"
        }
      ],
      "quiz": [
        {
          "question": "토리는 뭘 주문했어요?",
          "options": [
            "따뜻한 라떼",
            "김치찌개",
            "삼각김밥",
            "물"
          ],
          "answerIndex": 0,
          "explanation": "兔莉点了热拿铁（따뜻한 라떼）。“따뜻한”是“热的、温的”，点单时说“주세요”。"
        }
      ],
      "comments": [
        {
          "animalId": "choco",
          "ko": "라떼 최고죠 🍫",
          "zh": "拿铁最棒了",
          "audioUrl": "/audio/blog/comments/w2-tori-latte-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "이제 혼자 주문도 잘하네요! 💧",
          "zh": "现在自己点单也很拿手了呢！",
          "audioUrl": "/audio/blog/comments/w2-tori-latte-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "따뜻한 라떼 좋아요 🌰",
          "zh": "热拿铁真好",
          "audioUrl": "/audio/blog/comments/w2-tori-latte-c2.mp3"
        }
      ],
      "likedBy": [
        "choco",
        "minji",
        "haru",
        "darami",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-latte-1-1784645481268.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-latte.mp3",
    "audioDuration": 12,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 15,
    "publishedAt": 1783166268897,
    "isFeatured": false,
    "unlockDay": 12,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-15",
    "slug": "w2-darami-morning-d13",
    "titleKo": "좋은 아침이에요! 감기 조심해요",
    "titleZh": "早上好！小心感冒",
    "excerptKo": "요즘 날씨가 추워요. 다 같이 감기 조심해요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "좋은 아침이에요! 다람쥐예요. 🌅",
          "zh": "早上好！我是松鼠。",
          "t": [
            0,
            3.91
          ]
        },
        {
          "ko": "요즘 날씨가 추워요.",
          "zh": "最近天气冷。",
          "t": [
            4.31,
            6.82
          ]
        },
        {
          "ko": "다 같이 감기 조심해요! 🧣",
          "zh": "大家一起小心感冒！",
          "t": [
            7.22,
            9.58
          ]
        }
      ],
      "vocab": [
        {
          "word": "요즘",
          "reading": "yo-jeum",
          "meaning": "最近"
        },
        {
          "word": "추워요",
          "reading": "chu-wo-yo",
          "meaning": "冷"
        },
        {
          "word": "조심",
          "reading": "jo-sim",
          "meaning": "小心"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        },
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早上、早晨"
        },
        {
          "word": "다람쥐",
          "reading": "da-ram-jwi",
          "meaning": "松鼠"
        },
        {
          "word": "날씨",
          "reading": "nal-ssi",
          "meaning": "天气"
        },
        {
          "word": "다 같이",
          "reading": "da ga-chi",
          "meaning": "大家一起"
        },
        {
          "word": "감기",
          "reading": "gam-gi",
          "meaning": "感冒"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "네, 감사해요! 🌸",
          "zh": "好的，谢谢！",
          "audioUrl": "/audio/blog/comments/w2-darami-morning-d13-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "모두 따뜻하게 입어요 🌰",
          "zh": "大家穿暖和点",
          "audioUrl": "/audio/blog/comments/w2-darami-morning-d13-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "koal",
        "choco",
        "minji"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-darami-morning-d13.mp3",
    "audioDuration": 10,
    "coverEmoji": "🧣",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "darami",
    "likeCount": 11,
    "publishedAt": 1783249685587,
    "isFeatured": false,
    "unlockDay": 13,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-14",
    "slug": "w2-haru-care",
    "titleKo": "토리가 걱정돼요",
    "titleZh": "很担心兔莉",
    "excerptKo": "토리가 감기에 걸렸어요. 따뜻한 차를 만들었어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "토리가 감기에 걸렸어요. 걱정돼요. 🌰",
          "zh": "兔莉感冒了。很担心。",
          "t": [
            0,
            4.4
          ]
        },
        {
          "ko": "따뜻한 차를 만들었어요.",
          "zh": "泡了热茶。",
          "t": [
            4.8,
            6.92
          ]
        },
        {
          "ko": "토리 씨, 빨리 나으세요! ☕",
          "zh": "兔莉，快点好起来！",
          "t": [
            7.32,
            9.88
          ]
        }
      ],
      "vocab": [
        {
          "word": "걱정",
          "reading": "geok-jeong",
          "meaning": "担心"
        },
        {
          "word": "차",
          "reading": "cha",
          "meaning": "茶"
        },
        {
          "word": "빨리",
          "reading": "ppal-li",
          "meaning": "快、快点"
        },
        {
          "word": "감기",
          "reading": "gam-gi",
          "meaning": "感冒"
        },
        {
          "word": "걸렸어요",
          "reading": "geol-lyeo-sseo-yo",
          "meaning": "患上了、得了"
        },
        {
          "word": "걱정돼요",
          "reading": "geok-jeong-dwae-yo",
          "meaning": "担心、放心不下"
        },
        {
          "word": "따뜻한",
          "reading": "tta-tteu-tan",
          "meaning": "温热的"
        },
        {
          "word": "만들었어요",
          "reading": "man-deu-reo-sseo-yo",
          "meaning": "做了、制作了"
        },
        {
          "word": "나으세요",
          "reading": "na-eu-se-yo",
          "meaning": "请好起来（康复）"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "하루 씨, 고마워요. 😭🌸",
          "zh": "哈鲁，谢谢你。",
          "audioUrl": "/audio/blog/comments/w2-haru-care-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "하루 씨 정말 다정해요 💧",
          "zh": "哈鲁真体贴",
          "audioUrl": "/audio/blog/comments/w2-haru-care-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "minji",
        "choco",
        "darami",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-haru-care.mp3",
    "audioDuration": 10,
    "coverEmoji": "🍵",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "haru",
    "likeCount": 15,
    "publishedAt": 1783249686587,
    "isFeatured": false,
    "unlockDay": 13,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-13",
    "slug": "w2-tori-pharmacy",
    "titleKo": "감기에 걸려서 약국에 갔어요",
    "titleZh": "感冒了去了药店",
    "excerptKo": "어제부터 감기에 걸렸어요. 약국에서 감기약을 샀어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "어제부터 감기에 걸렸어요. 😷",
          "zh": "从昨天开始感冒了。",
          "t": [
            0,
            2.41
          ]
        },
        {
          "ko": "그래서 약국에 갔어요.",
          "zh": "所以去了药店。",
          "t": [
            2.81,
            4.75
          ]
        },
        {
          "ko": "약사님이 감기약을 줬어요. 콧물이 나요.",
          "zh": "药剂师给了感冒药。流鼻涕。",
          "t": [
            5.15,
            8.89
          ]
        }
      ],
      "vocab": [
        {
          "word": "감기",
          "reading": "gam-gi",
          "meaning": "感冒"
        },
        {
          "word": "약국",
          "reading": "yak-guk",
          "meaning": "药店"
        },
        {
          "word": "콧물",
          "reading": "kon-mul",
          "meaning": "鼻涕"
        },
        {
          "word": "어제",
          "reading": "eo-je",
          "meaning": "昨天"
        },
        {
          "word": "걸렸어요",
          "reading": "geol-lyeo-sseo-yo",
          "meaning": "患上了、得了"
        },
        {
          "word": "그래서",
          "reading": "geu-rae-seo",
          "meaning": "所以"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "약사님",
          "reading": "yak-sa-nim",
          "meaning": "药剂师"
        },
        {
          "word": "감기약",
          "reading": "gam-gi-yak",
          "meaning": "感冒药"
        },
        {
          "word": "나요",
          "reading": "na-yo",
          "meaning": "流、出（症状）"
        }
      ],
      "quiz": [
        {
          "question": "토리는 왜 약국에 갔어요?",
          "options": [
            "감기에 걸렸어요",
            "배가 고파요",
            "졸려요",
            "심심해요"
          ],
          "answerIndex": 0,
          "explanation": "兔莉因为感冒了（감기에 걸렸어요）才去药店。“~에 걸리다”表示“患上（某种病）”。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "어머, 푹 쉬어요! 🌰",
          "zh": "哎呀，好好休息！",
          "audioUrl": "/audio/blog/comments/w2-tori-pharmacy-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "따뜻한 물 많이 마셔요 💧",
          "zh": "多喝热水",
          "audioUrl": "/audio/blog/comments/w2-tori-pharmacy-c1.mp3"
        },
        {
          "animalId": "darami",
          "ko": "빨리 나으세요! 🌅",
          "zh": "快点好起来！",
          "audioUrl": "/audio/blog/comments/w2-tori-pharmacy-c2.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "darami",
        "choco",
        "koal",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-tori-pharmacy.mp3",
    "audioDuration": 9,
    "coverEmoji": "💊",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 16,
    "publishedAt": 1783249687587,
    "isFeatured": false,
    "unlockDay": 13,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-17",
    "slug": "w2-news-weekly",
    "titleKo": "이번 주 동물시 소식",
    "titleZh": "本周动物城消息",
    "excerptKo": "새 도시락이 인기가 많아요. 날씨가 추워요. 모두 감기 조심하세요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "이번 주 동물시 소식이에요. 📡",
          "zh": "这是本周动物城的消息。",
          "t": [
            0,
            2.22
          ]
        },
        {
          "ko": "새 편의점 도시락이 인기가 많아요.",
          "zh": "新的便利店便当很受欢迎。",
          "t": [
            2.62,
            4.79
          ]
        },
        {
          "ko": "날씨가 추워요. 모두 감기 조심하세요!",
          "zh": "天气冷。大家小心感冒！",
          "t": [
            5.19,
            8.36
          ]
        }
      ],
      "vocab": [
        {
          "word": "이번 주",
          "reading": "i-beon-ju",
          "meaning": "这周"
        },
        {
          "word": "인기",
          "reading": "in-gi",
          "meaning": "人气、受欢迎"
        },
        {
          "word": "모두",
          "reading": "mo-du",
          "meaning": "大家、全部"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "소식",
          "reading": "so-sik",
          "meaning": "消息"
        },
        {
          "word": "편의점",
          "reading": "pyeon-ui-jeom",
          "meaning": "便利店"
        },
        {
          "word": "도시락",
          "reading": "do-si-rak",
          "meaning": "便当"
        },
        {
          "word": "날씨",
          "reading": "nal-ssi",
          "meaning": "天气"
        },
        {
          "word": "추워요",
          "reading": "chu-wo-yo",
          "meaning": "冷"
        },
        {
          "word": "감기",
          "reading": "gam-gi",
          "meaning": "感冒"
        },
        {
          "word": "조심하세요",
          "reading": "jo-sim-ha-se-yo",
          "meaning": "请小心"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "이번 주도 다 지나갔어요! 🌸",
          "zh": "这周也过去了！",
          "audioUrl": "/audio/blog/comments/w2-news-weekly-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "도시락 진짜 맛있어요 🍫",
          "zh": "便当真好吃",
          "audioUrl": "/audio/blog/comments/w2-news-weekly-c1.mp3"
        },
        {
          "animalId": "koal",
          "ko": "저도 조심해요 🌿",
          "zh": "我也小心",
          "audioUrl": "/audio/blog/comments/w2-news-weekly-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "koal",
        "haru",
        "minji"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w2-news-weekly.mp3",
    "audioDuration": 8,
    "coverEmoji": "📰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 8,
    "publishedAt": 1783333104277,
    "isFeatured": false,
    "unlockDay": 14,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w2-16",
    "slug": "w2-tori-order-success",
    "titleKo": "혼자 주문에 성공했어요!",
    "titleZh": "一个人点单成功了！",
    "excerptKo": "오늘 혼자 카페에서 아메리카노를 주문했어요. 한국어로 다 말했어요!",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 특별한 날이에요.",
          "zh": "今天是特别的一天。",
          "t": [
            0,
            2.37
          ]
        },
        {
          "ko": "혼자 카페에 갔어요.",
          "zh": "一个人去了咖啡馆。",
          "t": [
            2.77,
            4.75
          ]
        },
        {
          "ko": "\"아이스 아메리카노 한 잔 주세요.\"라고 말했어요.",
          "zh": "我说了“请给我一杯冰美式”。",
          "t": [
            5.15,
            10.12
          ]
        },
        {
          "ko": "한국어로 다 말했어요. 성공! 🎉",
          "zh": "全部用韩语说了。成功！",
          "t": [
            10.52,
            14.08
          ]
        },
        {
          "ko": "이제 서울 생활이 조금 편해요. 😊",
          "zh": "现在首尔的生活稍微舒服一点了。",
          "t": [
            14.48,
            17.51
          ]
        }
      ],
      "vocab": [
        {
          "word": "특별한",
          "reading": "teuk-byeol-han",
          "meaning": "特别的"
        },
        {
          "word": "혼자",
          "reading": "hon-ja",
          "meaning": "一个人、独自"
        },
        {
          "word": "아메리카노",
          "reading": "a-me-ri-ka-no",
          "meaning": "美式咖啡"
        },
        {
          "word": "성공",
          "reading": "seong-gong",
          "meaning": "成功"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "날",
          "reading": "nal",
          "meaning": "日子、天"
        },
        {
          "word": "카페",
          "reading": "ka-pe",
          "meaning": "咖啡馆"
        },
        {
          "word": "아이스",
          "reading": "a-i-seu",
          "meaning": "冰（饮品）"
        },
        {
          "word": "한 잔",
          "reading": "han-jan",
          "meaning": "一杯"
        },
        {
          "word": "말했어요",
          "reading": "mal-hae-sseo-yo",
          "meaning": "说了"
        },
        {
          "word": "한국어",
          "reading": "han-gu-geo",
          "meaning": "韩语"
        },
        {
          "word": "편해요",
          "reading": "pyeon-hae-yo",
          "meaning": "舒服、方便"
        }
      ],
      "quiz": [
        {
          "question": "토리는 카페에서 뭘 주문했어요?",
          "options": [
            "아이스 아메리카노",
            "따뜻한 라떼",
            "김치찌개",
            "삼각김밥"
          ],
          "answerIndex": 0,
          "explanation": "兔莉点了一杯冰美式（아이스 아메리카노）。“한 잔”是“一杯”，点单结尾说“주세요”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "와아! 이제 진짜 서울 사람이에요! 💧",
          "zh": "哇！现在真的是首尔人了！",
          "audioUrl": "/audio/blog/comments/w2-tori-order-success-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "토리 씨, 정말 대단해요! 🌰",
          "zh": "兔莉，真了不起！",
          "audioUrl": "/audio/blog/comments/w2-tori-order-success-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "축하해요!! 🔥🎤",
          "zh": "恭喜！！",
          "audioUrl": "/audio/blog/comments/w2-tori-order-success-c2.mp3"
        },
        {
          "animalId": "darami",
          "ko": "멋져요! 🌅",
          "zh": "真棒！",
          "audioUrl": "/audio/blog/comments/w2-tori-order-success-c3.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "junho",
        "darami",
        "choco",
        "koal",
        "nabi"
      ],
      "images": [
        {
          "url": "/images/blog/w2-tori-order-success-1-1784645546599.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w2-tori-order-success.mp3",
    "audioDuration": 18,
    "coverEmoji": "🎉",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 24,
    "publishedAt": 1783333105277,
    "isFeatured": true,
    "unlockDay": 14,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-cafe",
    "slug": "weekend-cafe",
    "titleKo": "주말의 한옥 카페",
    "titleZh": "周末的韩屋咖啡馆",
    "excerptKo": "오래된 한옥을 개조한 카페에서 보낸 여유로운 주말이에요.",
    "level": "중급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "지난 주말에 저는 친구와 함께 서촌에 있는 카페에 갔어요.",
          "zh": "上个周末我和朋友一起去了西村的一家咖啡馆。",
          "t": [
            0,
            4.97
          ]
        },
        {
          "ko": "그 카페는 오래된 한옥을 개조해서 만든 곳이에요.",
          "zh": "那家咖啡馆是由一座老韩屋改造而成的。",
          "t": [
            5.37,
            9.91
          ]
        },
        {
          "ko": "문을 열자마자 고소한 커피 향이 났어요.",
          "zh": "一推开门，就飘来香浓的咖啡香。",
          "t": [
            10.31,
            14.09
          ]
        },
        {
          "ko": "우리는 창가에 앉아서 따뜻한 차를 마셨어요.",
          "zh": "我们坐在窗边喝了热茶。",
          "t": [
            14.49,
            19.14
          ]
        },
        {
          "ko": "사장님이 직접 만든 케이크도 정말 맛있었어요.",
          "zh": "老板亲手做的蛋糕也非常好吃。",
          "t": [
            19.54,
            23.71
          ]
        },
        {
          "ko": "창밖으로는 조용한 골목이 보였어요.",
          "zh": "窗外能看到安静的小巷。",
          "t": [
            24.11,
            27.89
          ]
        },
        {
          "ko": "도시 한가운데에서 이렇게 여유로운 시간을 보내니 기분이 좋았어요.",
          "zh": "在城市正中央度过这样悠闲的时光，心情很好。",
          "t": [
            28.29,
            33.64
          ]
        },
        {
          "ko": "다음에는 가족과 다시 오고 싶어요.",
          "zh": "下次想和家人再来。",
          "t": [
            34.04,
            36.83
          ]
        }
      ],
      "vocab": [
        {
          "word": "주말",
          "reading": "ju-mal",
          "meaning": "周末"
        },
        {
          "word": "서촌",
          "reading": "seo-chon",
          "meaning": "西村（首尔地名）"
        },
        {
          "word": "카페",
          "reading": "ka-pe",
          "meaning": "咖啡馆"
        },
        {
          "word": "한옥",
          "reading": "han-ok",
          "meaning": "韩屋（韩国传统房屋）"
        },
        {
          "word": "개조",
          "reading": "gae-jo",
          "meaning": "改造"
        },
        {
          "word": "향",
          "reading": "hyang",
          "meaning": "香气"
        },
        {
          "word": "창가",
          "reading": "chang-ga",
          "meaning": "窗边"
        },
        {
          "word": "차",
          "reading": "cha",
          "meaning": "茶"
        },
        {
          "word": "사장님",
          "reading": "sa-jang-nim",
          "meaning": "老板"
        },
        {
          "word": "케이크",
          "reading": "ke-i-keu",
          "meaning": "蛋糕"
        },
        {
          "word": "골목",
          "reading": "gol-mok",
          "meaning": "小巷、胡同"
        },
        {
          "word": "도시",
          "reading": "do-si",
          "meaning": "城市"
        },
        {
          "word": "여유로운",
          "reading": "yeo-yu-ro-un",
          "meaning": "悠闲的、从容的"
        }
      ],
      "quiz": [
        {
          "question": "그 카페는 무엇을 개조해서 만들었어요?",
          "options": [
            "한옥",
            "아파트",
            "학교",
            "시장"
          ],
          "answerIndex": 0,
          "explanation": "第二句说这家咖啡馆是由一座老韩屋改造而成的。"
        },
        {
          "question": "두 사람은 카페에서 무엇을 마셨어요?",
          "options": [
            "따뜻한 차",
            "맥주",
            "주스",
            "우유"
          ],
          "answerIndex": 0,
          "explanation": "第四句说他们坐在窗边喝了热茶。"
        }
      ],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "한옥 카페 분위기 최고죠 ✨",
          "zh": "韩屋咖啡馆的氛围超棒",
          "audioUrl": "/audio/blog/comments/weekend-cafe-c0.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "케이크 사진 봤어? 침 고인다 ㅋㅋ",
          "zh": "看到蛋糕照片了吗 流口水了哈哈",
          "audioUrl": "/audio/blog/comments/weekend-cafe-c1.mp3"
        },
        {
          "animalId": "koal",
          "ko": "조용해서 좋겠다~",
          "zh": "安静真好呀",
          "audioUrl": "/audio/blog/comments/weekend-cafe-c2.mp3"
        }
      ],
      "likedBy": [
        "nabi",
        "yowoo",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/weekend-cafe-1-1784645599210.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/weekend-cafe.mp3",
    "audioDuration": 37,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "tori",
    "likeCount": 15,
    "publishedAt": 1783415897966,
    "isFeatured": false,
    "unlockDay": 15,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-02",
    "slug": "w3-minji-tip-deposit",
    "titleKo": "집 구할 때 이것만 기억해요",
    "titleZh": "找房子时记住这些就好",
    "excerptKo": "보증금하고 월세를 꼭 확인해요. 계약 전에 방을 잘 봐요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "집 구할 때 이것만 기억해요! 💧",
          "zh": "找房子时记住这些就好！",
          "t": [
            0,
            2.65
          ]
        },
        {
          "ko": "보증금하고 월세를 꼭 확인해요.",
          "zh": "一定要确认押金和月租。",
          "t": [
            3.05,
            5.69
          ]
        },
        {
          "ko": "방을 잘 보고 계약해요. 😊",
          "zh": "好好看房再签约。",
          "t": [
            6.09,
            8.22
          ]
        }
      ],
      "vocab": [
        {
          "word": "월세",
          "reading": "wol-se",
          "meaning": "月租"
        },
        {
          "word": "확인",
          "reading": "hwa-gin",
          "meaning": "确认"
        },
        {
          "word": "계약",
          "reading": "gye-yak",
          "meaning": "合同、签约"
        },
        {
          "word": "집",
          "reading": "jip",
          "meaning": "家、房子"
        },
        {
          "word": "구할",
          "reading": "gu-hal",
          "meaning": "找、寻求"
        },
        {
          "word": "때",
          "reading": "ttae",
          "meaning": "时候"
        },
        {
          "word": "기억해요",
          "reading": "gi-eo-kae-yo",
          "meaning": "记住"
        },
        {
          "word": "꼭",
          "reading": "kkok",
          "meaning": "一定、务必"
        },
        {
          "word": "방",
          "reading": "bang",
          "meaning": "房间"
        },
        {
          "word": "잘",
          "reading": "jal",
          "meaning": "好好地"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 도움이 돼요! 감사해요 🌸",
          "zh": "哇，很有帮助！谢谢",
          "audioUrl": "/audio/blog/comments/w3-minji-tip-deposit-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "민지 씨는 척척박사예요 🌰",
          "zh": "敏智真是万事通",
          "audioUrl": "/audio/blog/comments/w3-minji-tip-deposit-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "choco",
        "koal",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-minji-tip-deposit.mp3",
    "audioDuration": 8,
    "coverEmoji": "🔑",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "minji",
    "likeCount": 16,
    "publishedAt": 1783417369966,
    "isFeatured": false,
    "unlockDay": 15,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-01",
    "slug": "w3-tori-house-hunt",
    "titleKo": "오늘 원룸을 보러 갔어요",
    "titleZh": "今天去看了单间房",
    "excerptKo": "기숙사 다음에는 원룸에 살고 싶어요. 보증금이 조금 비싸요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 원룸을 보러 갔어요. 🏠",
          "zh": "今天去看了单间房。",
          "t": [
            0,
            2.26
          ]
        },
        {
          "ko": "방이 작지만 깨끗해요.",
          "zh": "房间小但很干净。",
          "t": [
            2.66,
            4.7
          ]
        },
        {
          "ko": "그런데 보증금이 조금 비싸요. 😥",
          "zh": "不过押金有点贵。",
          "t": [
            5.1,
            7.84
          ]
        }
      ],
      "vocab": [
        {
          "word": "원룸",
          "reading": "won-rum",
          "meaning": "单间房、开间"
        },
        {
          "word": "방",
          "reading": "bang",
          "meaning": "房间"
        },
        {
          "word": "보증금",
          "reading": "bo-jeung-geum",
          "meaning": "押金、保证金"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "보러",
          "reading": "bo-reo",
          "meaning": "去看（为了看）"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "작지만",
          "reading": "jak-ji-man",
          "meaning": "虽然小"
        },
        {
          "word": "깨끗해요",
          "reading": "kkae-kkeu-tae-yo",
          "meaning": "干净"
        },
        {
          "word": "그런데",
          "reading": "geu-reon-de",
          "meaning": "不过、可是"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "비싸요",
          "reading": "bi-ssa-yo",
          "meaning": "贵"
        }
      ],
      "quiz": [
        {
          "question": "토리는 오늘 뭘 보러 갔어요?",
          "options": [
            "원룸",
            "병원",
            "은행",
            "지하철"
          ],
          "answerIndex": 0,
          "explanation": "兔莉去看了单间房（원룸）。“보러 가다”表示“去看（某物）”，是“보다+러 가다”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "원룸 구하기 힘들죠 💧",
          "zh": "找单间房不容易吧",
          "audioUrl": "/audio/blog/comments/w3-tori-house-hunt-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "깨끗하면 좋아요! 🌰",
          "zh": "干净就好！",
          "audioUrl": "/audio/blog/comments/w3-tori-house-hunt-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "choco",
        "koal",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-house-hunt-1-1784645852003.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-house-hunt.mp3",
    "audioDuration": 8,
    "coverEmoji": "🏠",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 14,
    "publishedAt": 1783417370966,
    "isFeatured": false,
    "unlockDay": 15,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-04",
    "slug": "w3-koal-walk",
    "titleKo": "천천히 동네를 걸었어요",
    "titleZh": "慢慢地在小区散了步",
    "excerptKo": "오늘은 천천히 동네를 걸었어요. 골목이 조용해요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 천천히 동네를 걸었어요. 🚶",
          "zh": "今天慢慢地在小区散了步。",
          "t": [
            0,
            3.12
          ]
        },
        {
          "ko": "골목이 조용해요.",
          "zh": "小巷很安静。",
          "t": [
            3.52,
            5.03
          ]
        },
        {
          "ko": "기분이 좋아요. 😌",
          "zh": "心情很好。",
          "t": [
            5.43,
            6.76
          ]
        }
      ],
      "vocab": [
        {
          "word": "동네",
          "reading": "dong-ne",
          "meaning": "小区、街区"
        },
        {
          "word": "골목",
          "reading": "gol-mok",
          "meaning": "小巷、胡同"
        },
        {
          "word": "조용해요",
          "reading": "jo-yong-hae-yo",
          "meaning": "安静"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "천천히",
          "reading": "cheon-cheon-hi",
          "meaning": "慢慢地"
        },
        {
          "word": "걸었어요",
          "reading": "geo-reo-sseo-yo",
          "meaning": "走了、散步了"
        },
        {
          "word": "기분",
          "reading": "gi-bun",
          "meaning": "心情"
        },
        {
          "word": "좋아요",
          "reading": "jo-a-yo",
          "meaning": "好"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "산책 좋아요 ✨",
          "zh": "散步真好",
          "audioUrl": "/audio/blog/comments/w3-koal-walk-c0.mp3"
        },
        {
          "animalId": "tori",
          "ko": "저도 같이 걷고 싶어요 🌸",
          "zh": "我也想一起散步",
          "audioUrl": "/audio/blog/comments/w3-koal-walk-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "nabi",
        "haru"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-koal-walk.mp3",
    "audioDuration": 7,
    "coverEmoji": "🚶",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "koal",
    "likeCount": 10,
    "publishedAt": 1783500788656,
    "isFeatured": false,
    "unlockDay": 16,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-03",
    "slug": "w3-tori-ask-way",
    "titleKo": "길을 물어봤어요",
    "titleZh": "问了路",
    "excerptKo": "길을 잃어서 물어봤어요. \"쭉 가서 오른쪽이에요.\" 성공!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 길을 잃었어요. 😵",
          "zh": "今天迷路了。",
          "t": [
            0,
            2.12
          ]
        },
        {
          "ko": "그래서 \"지하철역이 어디예요?\"라고 물어봤어요.",
          "zh": "所以问了“地铁站在哪里？”。",
          "t": [
            2.52,
            7.17
          ]
        },
        {
          "ko": "\"쭉 가서 오른쪽이에요.\"라고 알려줬어요. 성공! 😊",
          "zh": "对方说“一直走然后在右边”。成功！",
          "t": [
            7.57,
            13.35
          ]
        }
      ],
      "vocab": [
        {
          "word": "길",
          "reading": "gil",
          "meaning": "路"
        },
        {
          "word": "어디예요",
          "reading": "eo-di-ye-yo",
          "meaning": "在哪里"
        },
        {
          "word": "오른쪽",
          "reading": "o-reun-jjok",
          "meaning": "右边"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "잃었어요",
          "reading": "i-reo-sseo-yo",
          "meaning": "弄丢了、迷失了"
        },
        {
          "word": "그래서",
          "reading": "geu-rae-seo",
          "meaning": "所以"
        },
        {
          "word": "지하철역",
          "reading": "ji-ha-cheol-lyeok",
          "meaning": "地铁站"
        },
        {
          "word": "물어봤어요",
          "reading": "mu-reo-bwa-sseo-yo",
          "meaning": "问了"
        },
        {
          "word": "쭉",
          "reading": "jjuk",
          "meaning": "一直、直直地"
        },
        {
          "word": "알려줬어요",
          "reading": "al-lyeo-jwo-sseo-yo",
          "meaning": "告诉了"
        },
        {
          "word": "성공",
          "reading": "seong-gong",
          "meaning": "成功"
        }
      ],
      "quiz": [
        {
          "question": "지하철역은 어느 쪽에 있어요?",
          "options": [
            "오른쪽",
            "왼쪽",
            "뒤쪽",
            "위쪽"
          ],
          "answerIndex": 0,
          "explanation": "对方说“쭉 가서 오른쪽이에요”，地铁站在右边（오른쪽）。“쭉”是“一直、直直地”。"
        }
      ],
      "comments": [
        {
          "animalId": "choco",
          "ko": "길 찾기 어렵죠 🍫",
          "zh": "找路不容易吧",
          "audioUrl": "/audio/blog/comments/w3-tori-ask-way-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "이제 물어보기도 잘하네요! 💧",
          "zh": "现在问路也很拿手了呢！",
          "audioUrl": "/audio/blog/comments/w3-tori-ask-way-c1.mp3"
        }
      ],
      "likedBy": [
        "choco",
        "minji",
        "haru",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-ask-way-1-1784645652404.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-ask-way.mp3",
    "audioDuration": 13,
    "coverEmoji": "🧭",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 13,
    "publishedAt": 1783500789656,
    "isFeatured": false,
    "unlockDay": 16,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-hoesik",
    "slug": "hoesik-culture",
    "titleKo": "변화하는 회식 문화",
    "titleZh": "正在变化的聚餐文化",
    "excerptKo": "술자리 중심이던 회식이 요즘 어떻게 달라지고 있을까요.",
    "level": "중급",
    "category": "문화 노트",
    "content": {
      "sentences": [
        {
          "ko": "회식은 한국 직장 문화를 이해하는 중요한 열쇠이다.",
          "zh": "聚餐是理解韩国职场文化的一把重要钥匙。",
          "t": [
            0,
            4.12
          ]
        },
        {
          "ko": "회식은 단순히 함께 밥을 먹는 자리가 아니라 동료 사이의 관계를 다지는 시간이다.",
          "zh": "聚餐不只是一起吃饭的场合，而是巩固同事之间关系的时间。",
          "t": [
            4.52,
            11.2
          ]
        },
        {
          "ko": "예전에는 회식이 끝난 뒤 늦게까지 술을 마시는 경우가 많았다.",
          "zh": "以前聚餐结束后，常常喝酒喝到很晚。",
          "t": [
            11.6,
            16.61
          ]
        },
        {
          "ko": "상사가 권하는 술을 거절하기 어려운 분위기도 있었다.",
          "zh": "当时也存在难以拒绝上司劝酒的氛围。",
          "t": [
            17.01,
            20.66
          ]
        },
        {
          "ko": "그러나 최근에는 이러한 문화가 조금씩 바뀌고 있다.",
          "zh": "然而最近这种文化正在一点点改变。",
          "t": [
            21.06,
            25.09
          ]
        },
        {
          "ko": "젊은 세대는 개인의 시간과 사생활을 더 중요하게 여기기 때문이다.",
          "zh": "因为年轻一代更重视个人的时间和私生活。",
          "t": [
            25.49,
            30.89
          ]
        },
        {
          "ko": "그래서 요즘은 술 대신 점심을 함께 먹거나 공연을 보러 가는 회식도 늘고 있다.",
          "zh": "所以最近以吃午饭或看演出来代替喝酒的聚餐也在增多。",
          "t": [
            31.29,
            36.92
          ]
        },
        {
          "ko": "이러한 변화는 일과 삶의 균형을 중시하는 사회 분위기를 잘 보여 준다.",
          "zh": "这种变化很好地体现了重视工作与生活平衡的社会氛围。",
          "t": [
            37.32,
            43.19
          ]
        },
        {
          "ko": "결국 회식의 형태는 시대에 따라 계속 달라지고 있다.",
          "zh": "归根结底，聚餐的形式随着时代不断变化。",
          "t": [
            43.59,
            47.81
          ]
        }
      ],
      "vocab": [
        {
          "word": "회식",
          "reading": "hoe-sik",
          "meaning": "公司聚餐"
        },
        {
          "word": "직장",
          "reading": "jik-jang",
          "meaning": "职场、工作单位"
        },
        {
          "word": "열쇠",
          "reading": "yeol-soe",
          "meaning": "钥匙"
        },
        {
          "word": "동료",
          "reading": "dong-nyo",
          "meaning": "同事"
        },
        {
          "word": "관계",
          "reading": "gwan-gye",
          "meaning": "关系"
        },
        {
          "word": "술",
          "reading": "sul",
          "meaning": "酒"
        },
        {
          "word": "상사",
          "reading": "sang-sa",
          "meaning": "上司"
        },
        {
          "word": "거절",
          "reading": "geo-jeol",
          "meaning": "拒绝"
        },
        {
          "word": "분위기",
          "reading": "bun-wi-gi",
          "meaning": "氛围、气氛"
        },
        {
          "word": "세대",
          "reading": "se-dae",
          "meaning": "世代、一代人"
        },
        {
          "word": "사생활",
          "reading": "sa-saeng-hwal",
          "meaning": "私生活、隐私"
        },
        {
          "word": "공연",
          "reading": "gong-yeon",
          "meaning": "演出、表演"
        },
        {
          "word": "균형",
          "reading": "gyun-hyeong",
          "meaning": "均衡、平衡"
        }
      ],
      "quiz": [
        {
          "question": "예전 회식에서 거절하기 어려웠던 것은 무엇인가요?",
          "options": [
            "상사가 권하는 술",
            "늦은 점심",
            "회사 공연",
            "개인 시간"
          ],
          "answerIndex": 0,
          "explanation": "第四句提到，当时难以拒绝上司劝的酒。"
        },
        {
          "question": "젊은 세대가 더 중요하게 여기는 것은 무엇인가요?",
          "options": [
            "회사의 이익",
            "개인의 시간과 사생활",
            "늦은 술자리",
            "상사의 권유"
          ],
          "answerIndex": 1,
          "explanation": "第六句说年轻一代更重视个人的时间和私生活。"
        }
      ],
      "comments": [
        {
          "animalId": "yowoo",
          "ko": "나 회식 좋아하는데 ㅋㅋ",
          "zh": "我挺喜欢聚餐的哈哈",
          "audioUrl": "/audio/blog/comments/hoesik-culture-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "요즘은 1차만 하죠!",
          "zh": "最近只去第一场啦",
          "audioUrl": "/audio/blog/comments/hoesik-culture-c1.mp3"
        },
        {
          "animalId": "tori",
          "ko": "술 대신 점심 회식 좋아요!",
          "zh": "用午饭代替喝酒的聚餐真好",
          "audioUrl": "/audio/blog/comments/hoesik-culture-c2.mp3"
        }
      ],
      "likedBy": [
        "choco",
        "koal",
        "tori"
      ],
      "images": [
        {
          "url": "/images/blog/hoesik-culture-1-1784806633368.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/hoesik-culture.mp3",
    "audioDuration": 48,
    "coverEmoji": "🍶",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nabi",
    "likeCount": 31,
    "publishedAt": 1783583753345,
    "isFeatured": false,
    "unlockDay": 17,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-06",
    "slug": "w3-news-subway-line",
    "titleKo": "동물시 지하철 새 노선 소식",
    "titleZh": "动物城地铁新线路消息",
    "excerptKo": "동물시에 새 지하철 노선이 생겼어요. 더 편해졌어요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "동물시에 새 지하철 노선이 생겼어요. 📡",
          "zh": "动物城新增了一条地铁线路。",
          "t": [
            0,
            2.84
          ]
        },
        {
          "ko": "이제 학교까지 더 가까워요.",
          "zh": "现在去学校更近了。",
          "t": [
            3.24,
            5.28
          ]
        },
        {
          "ko": "많이 이용해 주세요!",
          "zh": "请多多乘坐！",
          "t": [
            5.68,
            7
          ]
        }
      ],
      "vocab": [
        {
          "word": "노선",
          "reading": "no-seon",
          "meaning": "线路"
        },
        {
          "word": "학교",
          "reading": "hak-gyo",
          "meaning": "学校"
        },
        {
          "word": "가까워요",
          "reading": "ga-kka-wo-yo",
          "meaning": "近"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "지하철",
          "reading": "ji-ha-cheol",
          "meaning": "地铁"
        },
        {
          "word": "생겼어요",
          "reading": "saeng-gyeo-sseo-yo",
          "meaning": "出现了、新增了"
        },
        {
          "word": "이제",
          "reading": "i-je",
          "meaning": "现在、如今"
        },
        {
          "word": "더",
          "reading": "deo",
          "meaning": "更、更加"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "多多地、大量"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 좋은 소식이에요! 🌸",
          "zh": "哇，好消息！",
          "audioUrl": "/audio/blog/comments/w3-news-subway-line-c0.mp3"
        },
        {
          "animalId": "junho",
          "ko": "학교 가기 편하겠다 🎤",
          "zh": "去学校会很方便呢",
          "audioUrl": "/audio/blog/comments/w3-news-subway-line-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "junho",
        "haru",
        "koal",
        "minji"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-news-subway-line.mp3",
    "audioDuration": 7,
    "coverEmoji": "🚉",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 9,
    "publishedAt": 1783584207345,
    "isFeatured": false,
    "unlockDay": 17,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-05",
    "slug": "w3-tori-tmoney",
    "titleKo": "티머니카드를 샀어요",
    "titleZh": "买了交通卡",
    "excerptKo": "지하철을 타려고 티머니카드를 샀어요. 충전도 했어요!",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 지하철을 타려고 티머니카드를 샀어요. 🚇",
          "zh": "今天为了坐地铁买了交通卡。",
          "t": [
            0,
            3.74
          ]
        },
        {
          "ko": "편의점에서 카드를 충전했어요.",
          "zh": "在便利店给卡充了值。",
          "t": [
            4.14,
            7.12
          ]
        },
        {
          "ko": "이제 지하철이 편해요. 😊",
          "zh": "现在坐地铁很方便。",
          "t": [
            7.52,
            9.6
          ]
        }
      ],
      "vocab": [
        {
          "word": "지하철",
          "reading": "ji-ha-cheol",
          "meaning": "地铁"
        },
        {
          "word": "티머니카드",
          "reading": "ti-meo-ni-ka-deu",
          "meaning": "T-money 交通卡"
        },
        {
          "word": "충전",
          "reading": "chung-jeon",
          "meaning": "充值、充电"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "타려고",
          "reading": "ta-ryeo-go",
          "meaning": "为了乘坐"
        },
        {
          "word": "샀어요",
          "reading": "sa-sseo-yo",
          "meaning": "买了"
        },
        {
          "word": "편의점",
          "reading": "pyeo-nui-jeom",
          "meaning": "便利店"
        },
        {
          "word": "카드",
          "reading": "ka-deu",
          "meaning": "卡"
        },
        {
          "word": "이제",
          "reading": "i-je",
          "meaning": "现在、如今"
        },
        {
          "word": "편해요",
          "reading": "pyeo-nae-yo",
          "meaning": "方便、舒服"
        }
      ],
      "quiz": [
        {
          "question": "토리는 어디에서 카드를 충전했어요?",
          "options": [
            "편의점",
            "은행",
            "병원",
            "카페"
          ],
          "answerIndex": 0,
          "explanation": "兔莉在便利店（편의점）给交通卡充值。“충전하다”是“充值”。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "지하철 타고 콘서트 가자!! 🔥",
          "zh": "坐地铁去演唱会吧！！",
          "audioUrl": "/audio/blog/comments/w3-tori-tmoney-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "티머니 충전 편하죠 💧",
          "zh": "交通卡充值很方便吧",
          "audioUrl": "/audio/blog/comments/w3-tori-tmoney-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "minji",
        "haru",
        "choco",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-tmoney-1-1784806222956.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-tmoney.mp3",
    "audioDuration": 10,
    "coverEmoji": "🚇",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 15,
    "publishedAt": 1783584208345,
    "isFeatured": false,
    "unlockDay": 17,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-08",
    "slug": "w3-darami-morning-d18",
    "titleKo": "좋은 아침이에요! 오늘의 단어는 \"은행\"",
    "titleZh": "早上好！今天的单词是“银行”",
    "excerptKo": "오늘 서울은 맑아요. 오늘의 단어는 \"은행\"이에요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "좋은 아침이에요! 다람쥐예요. 🌅",
          "zh": "早上好！我是松鼠。",
          "t": [
            0,
            3.26
          ]
        },
        {
          "ko": "오늘 서울은 맑아요.",
          "zh": "今天首尔很晴朗。",
          "t": [
            3.66,
            6.07
          ]
        },
        {
          "ko": "오늘의 단어는 \"은행\"이에요. 🏦",
          "zh": "今天的单词是“银行”。",
          "t": [
            6.47,
            9.43
          ]
        }
      ],
      "vocab": [
        {
          "word": "아침",
          "reading": "a-chim",
          "meaning": "早晨、早上"
        },
        {
          "word": "맑아요",
          "reading": "mal-ga-yo",
          "meaning": "晴朗"
        },
        {
          "word": "은행",
          "reading": "eun-haeng",
          "meaning": "银行"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        },
        {
          "word": "다람쥐",
          "reading": "da-ram-jwi",
          "meaning": "松鼠"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "서울",
          "reading": "seo-ul",
          "meaning": "首尔"
        },
        {
          "word": "단어",
          "reading": "da-neo",
          "meaning": "单词"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "오늘 은행에 가요! 🌸",
          "zh": "今天要去银行！",
          "audioUrl": "/audio/blog/comments/w3-darami-morning-d18-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "오늘도 좋은 하루 🌿",
          "zh": "今天也是好日子",
          "audioUrl": "/audio/blog/comments/w3-darami-morning-d18-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "koal",
        "haru",
        "nabi",
        "choco"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-darami-morning-d18.mp3",
    "audioDuration": 9,
    "coverEmoji": "🌅",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "darami",
    "likeCount": 10,
    "publishedAt": 1783667626035,
    "isFeatured": false,
    "unlockDay": 18,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-07",
    "slug": "w3-tori-bank",
    "titleKo": "은행에서 통장을 만들었어요",
    "titleZh": "在银行办了存折",
    "excerptKo": "외국인등록증으로 통장을 만들었어요. 조금 긴장했어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 은행에 갔어요. 🏦",
          "zh": "今天去了银行。",
          "t": [
            0,
            1.89
          ]
        },
        {
          "ko": "외국인등록증으로 통장을 만들었어요.",
          "zh": "用外国人登录证办了存折。",
          "t": [
            2.29,
            5.75
          ]
        },
        {
          "ko": "비밀번호도 정했어요. 조금 긴장했어요! 😅",
          "zh": "也设了密码。有点紧张！",
          "t": [
            6.15,
            9.84
          ]
        }
      ],
      "vocab": [
        {
          "word": "은행",
          "reading": "eun-haeng",
          "meaning": "银行"
        },
        {
          "word": "통장",
          "reading": "tong-jang",
          "meaning": "存折、账户"
        },
        {
          "word": "비밀번호",
          "reading": "bi-mil-beon-ho",
          "meaning": "密码"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "외국인등록증",
          "reading": "oe-gu-gin-deung-nok-jjeung",
          "meaning": "外国人登录证"
        },
        {
          "word": "만들었어요",
          "reading": "man-deu-reo-sseo-yo",
          "meaning": "做了、办了"
        },
        {
          "word": "정했어요",
          "reading": "jeong-hae-sseo-yo",
          "meaning": "决定了、设定了"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "긴장했어요",
          "reading": "gin-jang-hae-sseo-yo",
          "meaning": "紧张了"
        }
      ],
      "quiz": [
        {
          "question": "토리는 은행에서 뭘 만들었어요?",
          "options": [
            "통장",
            "티머니카드",
            "여권",
            "학생증"
          ],
          "answerIndex": 0,
          "explanation": "兔莉在银行办了存折/账户（통장）。“만들다”是“做、办、制作”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "통장 만들기 성공! 💧",
          "zh": "办账户成功！",
          "audioUrl": "/audio/blog/comments/w3-tori-bank-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "이제 진짜 서울 사람이에요 🌰",
          "zh": "现在真的是首尔人了",
          "audioUrl": "/audio/blog/comments/w3-tori-bank-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "choco",
        "koal",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-bank-1-1784806231935.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-bank.mp3",
    "audioDuration": 10,
    "coverEmoji": "🏦",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 14,
    "publishedAt": 1783667627035,
    "isFeatured": false,
    "unlockDay": 18,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-10",
    "slug": "w3-haru-hospital",
    "titleKo": "토리하고 병원에 갔다 왔어요",
    "titleZh": "陪兔莉去了趟医院",
    "excerptKo": "토리가 아파서 같이 병원에 갔어요. 이제 괜찮아서 다행이에요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 토리하고 병원에 갔다 왔어요. 🤝",
          "zh": "今天陪兔莉去了趟医院。",
          "t": [
            0,
            3.74
          ]
        },
        {
          "ko": "토리가 많이 아팠어요.",
          "zh": "兔莉病得挺重。",
          "t": [
            4.14,
            6.55
          ]
        },
        {
          "ko": "이제 괜찮아서 다행이에요. 🌰",
          "zh": "现在没事了，真是万幸。",
          "t": [
            6.95,
            9.37
          ]
        }
      ],
      "vocab": [
        {
          "word": "아팠어요",
          "reading": "a-pa-sseo-yo",
          "meaning": "（曾）疼、生病"
        },
        {
          "word": "괜찮아서",
          "reading": "gwaen-cha-na-seo",
          "meaning": "因为没事、因为还好"
        },
        {
          "word": "다행",
          "reading": "da-haeng",
          "meaning": "万幸、幸好"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "병원",
          "reading": "byeong-won",
          "meaning": "医院"
        },
        {
          "word": "왔어요",
          "reading": "wa-sseo-yo",
          "meaning": "回来了、来了"
        },
        {
          "word": "많이",
          "reading": "ma-ni",
          "meaning": "很、非常"
        },
        {
          "word": "이제",
          "reading": "i-je",
          "meaning": "现在、如今"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "하루 씨, 정말 고마워요 😭🌸",
          "zh": "哈鲁，真的谢谢你",
          "audioUrl": "/audio/blog/comments/w3-haru-hospital-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "둘이 진짜 친해요 💧",
          "zh": "你俩真要好",
          "audioUrl": "/audio/blog/comments/w3-haru-hospital-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "minji",
        "choco",
        "koal",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-haru-hospital.mp3",
    "audioDuration": 9,
    "coverEmoji": "🤝",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "haru",
    "likeCount": 14,
    "publishedAt": 1783751023725,
    "isFeatured": false,
    "unlockDay": 19,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-09",
    "slug": "w3-tori-clinic",
    "titleKo": "약국 약으로 안 나아서 병원에 갔어요",
    "titleZh": "药店的药没治好，去了医院",
    "excerptKo": "지난번 약이 부족했어요. 기침하고 열이 나서 병원에 갔어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "지난번 약국 약은 삼 일만 먹었어요. 그런데 또 아파요. 😷",
          "zh": "上次药店的药只吃了三天。可是又难受了。",
          "t": [
            0,
            6.35
          ]
        },
        {
          "ko": "오늘은 기침하고 열이 나서 병원에 갔어요. 🏥",
          "zh": "今天咳嗽又发烧，去了医院。",
          "t": [
            6.75,
            11.2
          ]
        },
        {
          "ko": "하루가 또 같이 갔어요. 정말 고마워요.",
          "zh": "哈鲁又一起去了。真的谢谢。",
          "t": [
            11.6,
            15.63
          ]
        },
        {
          "ko": "의사 선생님이 약을 줬어요. 이제 괜찮아요. 😊",
          "zh": "医生给了药。现在没事了。",
          "t": [
            16.03,
            19.95
          ]
        }
      ],
      "vocab": [
        {
          "word": "병원",
          "reading": "byeong-won",
          "meaning": "医院"
        },
        {
          "word": "기침",
          "reading": "gi-chim",
          "meaning": "咳嗽"
        },
        {
          "word": "열",
          "reading": "yeol",
          "meaning": "发烧、热"
        },
        {
          "word": "약국",
          "reading": "yak-guk",
          "meaning": "药店、药房"
        },
        {
          "word": "약",
          "reading": "yak",
          "meaning": "药"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        },
        {
          "word": "아파요",
          "reading": "a-pa-yo",
          "meaning": "疼、难受"
        },
        {
          "word": "의사",
          "reading": "ui-sa",
          "meaning": "医生"
        },
        {
          "word": "줬어요",
          "reading": "jwo-sseo-yo",
          "meaning": "给了"
        },
        {
          "word": "괜찮아요",
          "reading": "gwaen-cha-na-yo",
          "meaning": "没事、还好"
        }
      ],
      "quiz": [
        {
          "question": "토리는 왜 병원에 갔어요?",
          "options": [
            "기침하고 열이 나서",
            "배가 고파서",
            "심심해서",
            "졸려서"
          ],
          "answerIndex": 0,
          "explanation": "兔莉因为咳嗽又发烧（기침하고 열이 나서）去了医院。“~아서/어서”表示原因“因为…所以”。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "옆에 있어서 다행이에요 🌰",
          "zh": "能陪在旁边真好",
          "audioUrl": "/audio/blog/comments/w3-tori-clinic-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "푹 쉬어요, 토리 씨! 💧",
          "zh": "好好休息，兔莉！",
          "audioUrl": "/audio/blog/comments/w3-tori-clinic-c1.mp3"
        },
        {
          "animalId": "darami",
          "ko": "얼른 나으세요 🌅",
          "zh": "快点好起来",
          "audioUrl": "/audio/blog/comments/w3-tori-clinic-c2.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "darami",
        "choco",
        "koal",
        "nabi"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-clinic-1-1784806209362.jpg",
          "w": 1440,
          "h": 1080
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-clinic.mp3",
    "audioDuration": 20,
    "coverEmoji": "🏥",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 15,
    "publishedAt": 1783751045725,
    "isFeatured": false,
    "unlockDay": 19,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-12",
    "slug": "w3-nabi-room-photo",
    "titleKo": "작은 방도 예쁘게 꾸며요",
    "titleZh": "小房间也能布置得漂亮",
    "excerptKo": "작은 원룸도 예쁘게 꾸밀 수 있어요. 화분 하나면 충분해요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "작은 방도 예쁘게 꾸며요. ✨",
          "zh": "小房间也要布置得漂亮。",
          "t": [
            0,
            1.89
          ]
        },
        {
          "ko": "화분 하나면 기분이 좋아요.",
          "zh": "有一盆花心情就很好。",
          "t": [
            2.29,
            3.8
          ]
        },
        {
          "ko": "사진으로 남겨요. 📷",
          "zh": "拍照留念。",
          "t": [
            4.2,
            5.62
          ]
        }
      ],
      "vocab": [
        {
          "word": "예쁘게",
          "reading": "ye-ppeu-ge",
          "meaning": "漂亮地"
        },
        {
          "word": "화분",
          "reading": "hwa-bun",
          "meaning": "花盆"
        },
        {
          "word": "기분",
          "reading": "gi-bun",
          "meaning": "心情"
        },
        {
          "word": "작은",
          "reading": "ja-geun",
          "meaning": "小的"
        },
        {
          "word": "방",
          "reading": "bang",
          "meaning": "房间"
        },
        {
          "word": "꾸며요",
          "reading": "kku-myeo-yo",
          "meaning": "布置、装饰"
        },
        {
          "word": "하나",
          "reading": "ha-na",
          "meaning": "一个"
        },
        {
          "word": "좋아요",
          "reading": "jo-a-yo",
          "meaning": "好"
        },
        {
          "word": "사진",
          "reading": "sa-jin",
          "meaning": "照片"
        },
        {
          "word": "남겨요",
          "reading": "nam-gyeo-yo",
          "meaning": "留下、留存"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "와, 저도 화분 놓고 싶어요! 🌸",
          "zh": "哇，我也想摆盆花！",
          "audioUrl": "/audio/blog/comments/w3-nabi-room-photo-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "나비 씨 방 진짜 예뻐요 🍫",
          "zh": "娜比的房间真漂亮",
          "audioUrl": "/audio/blog/comments/w3-nabi-room-photo-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "haru",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-nabi-room-photo.mp3",
    "audioDuration": 6,
    "coverEmoji": "🪴",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nabi",
    "likeCount": 13,
    "publishedAt": 1783834442414,
    "isFeatured": false,
    "unlockDay": 20,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-11",
    "slug": "w3-tori-contract-prep",
    "titleKo": "내일 계약을 해요",
    "titleZh": "明天要签约",
    "excerptKo": "드디어 원룸을 정했어요! 보증금하고 월세, 관리비를 확인했어요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "드디어 원룸을 정했어요! 📝",
          "zh": "终于定好单间房了！",
          "t": [
            0,
            2.37
          ]
        },
        {
          "ko": "보증금하고 월세, 관리비를 확인했어요.",
          "zh": "确认了押金、月租和管理费。",
          "t": [
            2.77,
            6.32
          ]
        },
        {
          "ko": "내일 계약을 해요. 조금 떨려요. 😊",
          "zh": "明天签约。有点小紧张。",
          "t": [
            6.72,
            10.03
          ]
        }
      ],
      "vocab": [
        {
          "word": "정했어요",
          "reading": "jeong-hae-sseo-yo",
          "meaning": "（已）决定、定下"
        },
        {
          "word": "관리비",
          "reading": "gwal-li-bi",
          "meaning": "管理费"
        },
        {
          "word": "내일",
          "reading": "nae-il",
          "meaning": "明天"
        },
        {
          "word": "드디어",
          "reading": "deu-di-eo",
          "meaning": "终于"
        },
        {
          "word": "원룸",
          "reading": "won-rum",
          "meaning": "单间房、开间"
        },
        {
          "word": "보증금",
          "reading": "bo-jeung-geum",
          "meaning": "押金、保证金"
        },
        {
          "word": "월세",
          "reading": "wol-se",
          "meaning": "月租"
        },
        {
          "word": "확인했어요",
          "reading": "hwa-gin-hae-sseo-yo",
          "meaning": "确认了"
        },
        {
          "word": "계약",
          "reading": "gye-yak",
          "meaning": "合同、签约"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        },
        {
          "word": "떨려요",
          "reading": "tteol-lyeo-yo",
          "meaning": "发抖、紧张"
        }
      ],
      "quiz": [
        {
          "question": "토리는 내일 뭘 해요?",
          "options": [
            "계약",
            "시험",
            "여행",
            "이사"
          ],
          "answerIndex": 0,
          "explanation": "兔莉明天要签约（계약）。“계약을 하다”是“签合同、签约”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "축하해요! 좋은 집이에요 💧",
          "zh": "恭喜！是个好房子",
          "audioUrl": "/audio/blog/comments/w3-tori-contract-prep-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "이사 도와줄게요 🌰",
          "zh": "搬家我来帮忙",
          "audioUrl": "/audio/blog/comments/w3-tori-contract-prep-c1.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "choco",
        "koal",
        "nabi",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-tori-contract-prep.mp3",
    "audioDuration": 10,
    "coverEmoji": "📝",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 16,
    "publishedAt": 1783834443414,
    "isFeatured": false,
    "unlockDay": 20,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-14",
    "slug": "w3-news-weekly-d21",
    "titleKo": "이번 주 동물시 소식",
    "titleZh": "本周动物城消息",
    "excerptKo": "새 지하철 노선이 인기예요. 날씨가 맑아요. 좋은 주말 보내세요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "이번 주 동물시 소식이에요. 📡",
          "zh": "这是本周动物城的消息。",
          "t": [
            0,
            1.89
          ]
        },
        {
          "ko": "새 지하철 노선이 인기예요.",
          "zh": "新地铁线路很受欢迎。",
          "t": [
            2.29,
            4.46
          ]
        },
        {
          "ko": "날씨가 맑아요. 좋은 주말 보내세요!",
          "zh": "天气晴朗。周末愉快！",
          "t": [
            4.86,
            7.8
          ]
        }
      ],
      "vocab": [
        {
          "word": "이번 주",
          "reading": "i-beon-ju",
          "meaning": "这周"
        },
        {
          "word": "주말",
          "reading": "ju-mal",
          "meaning": "周末"
        },
        {
          "word": "인기",
          "reading": "in-gi",
          "meaning": "人气、受欢迎"
        },
        {
          "word": "동물시",
          "reading": "dong-mul-si",
          "meaning": "动物城"
        },
        {
          "word": "소식",
          "reading": "so-sik",
          "meaning": "消息"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "지하철",
          "reading": "ji-ha-cheol",
          "meaning": "地铁"
        },
        {
          "word": "노선",
          "reading": "no-seon",
          "meaning": "线路"
        },
        {
          "word": "날씨",
          "reading": "nal-ssi",
          "meaning": "天气"
        },
        {
          "word": "맑아요",
          "reading": "mal-ga-yo",
          "meaning": "晴朗"
        },
        {
          "word": "좋은",
          "reading": "jo-eun",
          "meaning": "好的"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "이번 주도 잘 보냈어요! 🌸",
          "zh": "这周也过得很好！",
          "audioUrl": "/audio/blog/comments/w3-news-weekly-d21-c0.mp3"
        },
        {
          "animalId": "koal",
          "ko": "주말엔 푹 쉬어요 🌿",
          "zh": "周末好好休息",
          "audioUrl": "/audio/blog/comments/w3-news-weekly-d21-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "koal",
        "haru",
        "choco",
        "minji"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w3-news-weekly-d21.mp3",
    "audioDuration": 8,
    "coverEmoji": "📰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 8,
    "publishedAt": 1783917861104,
    "isFeatured": false,
    "unlockDay": 21,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w3-13",
    "slug": "w3-tori-signed",
    "titleKo": "드디어 계약을 했어요!",
    "titleZh": "终于签合同了！",
    "excerptKo": "오늘 집주인 아저씨하고 계약을 했어요. 이제 제 방이 생겼어요!",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 정말 특별한 날이에요.",
          "zh": "今天是非常特别的一天。",
          "t": [
            0,
            2.74
          ]
        },
        {
          "ko": "집주인 아저씨하고 계약을 했어요. 🎊",
          "zh": "和房东大叔签了合同。",
          "t": [
            3.14,
            6.36
          ]
        },
        {
          "ko": "이제 제 방이 생겼어요!",
          "zh": "现在我有自己的房间了！",
          "t": [
            6.76,
            8.56
          ]
        },
        {
          "ko": "열쇠고리에 작은 당근이 있어요. 🥕",
          "zh": "钥匙扣上挂着一个小胡萝卜。",
          "t": [
            8.96,
            12.31
          ]
        },
        {
          "ko": "엄마 당근하고 똑같아요. 조금 울었어요. 😊",
          "zh": "和妈妈给的胡萝卜一模一样。有点哭了。",
          "t": [
            12.71,
            16.31
          ]
        }
      ],
      "vocab": [
        {
          "word": "집주인",
          "reading": "jip-ju-in",
          "meaning": "房东、房主"
        },
        {
          "word": "생겼어요",
          "reading": "saeng-gyeo-sseo-yo",
          "meaning": "有了、出现了"
        },
        {
          "word": "당근",
          "reading": "dang-geun",
          "meaning": "胡萝卜"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        },
        {
          "word": "특별한",
          "reading": "teuk-byeol-han",
          "meaning": "特别的"
        },
        {
          "word": "아저씨",
          "reading": "a-jeo-ssi",
          "meaning": "大叔"
        },
        {
          "word": "계약",
          "reading": "gye-yak",
          "meaning": "合同、签约"
        },
        {
          "word": "열쇠고리",
          "reading": "yeol-soe-go-ri",
          "meaning": "钥匙扣"
        },
        {
          "word": "엄마",
          "reading": "eom-ma",
          "meaning": "妈妈"
        },
        {
          "word": "똑같아요",
          "reading": "ttok-ga-ta-yo",
          "meaning": "一模一样"
        },
        {
          "word": "울었어요",
          "reading": "u-reo-sseo-yo",
          "meaning": "哭了"
        }
      ],
      "quiz": [
        {
          "question": "토리는 오늘 누구하고 계약을 했어요?",
          "options": [
            "집주인 아저씨",
            "의사 선생님",
            "은행 직원",
            "약사님"
          ],
          "answerIndex": 0,
          "explanation": "兔莉和房东大叔（집주인 아저씨）签了合同。“하고”在这里表示“和（某人一起）”。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "축하해요!! 이제 진짜 독립이에요! 💧",
          "zh": "恭喜！！现在真的独立了！",
          "audioUrl": "/audio/blog/comments/w3-tori-signed-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "토리 씨, 너무 멋져요! 🌰",
          "zh": "兔莉，太厉害了！",
          "audioUrl": "/audio/blog/comments/w3-tori-signed-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "집들이 하자!! 🔥🎤",
          "zh": "办乔迁派对吧！！",
          "audioUrl": "/audio/blog/comments/w3-tori-signed-c2.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "방 꾸미기 도와줄게요 ✨",
          "zh": "布置房间我来帮忙",
          "audioUrl": "/audio/blog/comments/w3-tori-signed-c3.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "junho",
        "nabi",
        "darami",
        "choco",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w3-tori-signed-1-1784645859664.jpg",
          "w": 1440,
          "h": 810
        },
        {
          "url": "/images/blog/w3-tori-signed-2-1784806857620.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w3-tori-signed.mp3",
    "audioDuration": 16,
    "coverEmoji": "🎊",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 26,
    "publishedAt": 1783917862104,
    "isFeatured": true,
    "unlockDay": 21,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-02",
    "slug": "w4-gomdori-proverb-start",
    "titleKo": "천 리 길도 한 걸음부터",
    "titleZh": "千里之行，始于足下",
    "excerptKo": "오늘은 옛 속담 하나를 들려줄게요. 작은 시작이 큰 길을 만든단다.",
    "level": "고급",
    "category": "속담",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 옛 속담 하나를 들려줄게요. 📖",
          "zh": "今天给大家讲一句老俗语。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "\"천 리 길도 한 걸음부터.\"",
          "zh": "“千里之行，始于足下。”",
          "t": [
            3.71,
            5.88
          ]
        },
        {
          "ko": "아무리 먼 길도 첫걸음에서 시작한단다.",
          "zh": "再远的路，也是从第一步开始的。",
          "t": [
            6.28,
            9.79
          ]
        },
        {
          "ko": "토리처럼 매일 한 걸음씩 걸으면 돼요.",
          "zh": "像兔莉一样，每天走一步就好。",
          "t": [
            10.19,
            13.36
          ]
        }
      ],
      "vocab": [
        {
          "word": "속담",
          "reading": "sok-dam",
          "meaning": "俗语、谚语"
        },
        {
          "word": "천 리",
          "reading": "cheon-ri",
          "meaning": "千里（形容很远）"
        },
        {
          "word": "걸음",
          "reading": "geo-reum",
          "meaning": "步、脚步"
        },
        {
          "word": "시작",
          "reading": "si-jak",
          "meaning": "开始"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "옛",
          "reading": "yet",
          "meaning": "古老的、旧时的"
        },
        {
          "word": "하나",
          "reading": "ha-na",
          "meaning": "一个"
        },
        {
          "word": "길",
          "reading": "gil",
          "meaning": "路"
        },
        {
          "word": "아무리",
          "reading": "a-mu-ri",
          "meaning": "再怎么、无论多么"
        },
        {
          "word": "먼",
          "reading": "meon",
          "meaning": "远的"
        },
        {
          "word": "첫걸음",
          "reading": "cheot-geo-reum",
          "meaning": "第一步"
        },
        {
          "word": "매일",
          "reading": "mae-il",
          "meaning": "每天"
        }
      ],
      "quiz": [
        {
          "question": "\"천 리 길도 한 걸음부터\"의 뜻은?",
          "options": [
            "큰일도 작은 시작에서 비롯된다",
            "길이 멀면 포기한다",
            "한 걸음이면 끝난다",
            "천 리는 너무 멀다"
          ],
          "answerIndex": 0,
          "explanation": "这句俗语意思是：再大的事也是从小小的第一步开始的，鼓励人踏实起步。"
        }
      ],
      "comments": [
        {
          "animalId": "tori",
          "ko": "곰돌이 님, 마음에 새길게요 🌸",
          "zh": "熊仔前辈，我会铭记在心",
          "audioUrl": "/audio/blog/comments/w4-gomdori-proverb-start-c0.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "좋은 말씀이에요 ☕",
          "zh": "说得真好",
          "audioUrl": "/audio/blog/comments/w4-gomdori-proverb-start-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "오늘도 한 걸음! 🌰",
          "zh": "今天也走一步！",
          "audioUrl": "/audio/blog/comments/w4-gomdori-proverb-start-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "yowoo",
        "haru",
        "minji",
        "nabi",
        "koal",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-gomdori-proverb-start.mp3",
    "audioDuration": 13,
    "coverEmoji": "📖",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gomdori",
    "likeCount": 19,
    "publishedAt": 1784000323794,
    "isFeatured": false,
    "unlockDay": 22,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-01",
    "slug": "w4-tori-haeyo",
    "titleKo": "이제 \"해요\"를 배웠어요",
    "titleZh": "现在学会了礼貌的口语说法",
    "excerptKo": "오늘 학교에서 해요체를 배웠어요. 가요, 먹어요, 공부해요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 학교에서 해요체를 배웠어요. 📚",
          "zh": "今天在学校学了礼貌的口语说法。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "가요, 먹어요, 공부해요!",
          "zh": "去、吃、学习！",
          "t": [
            3.71,
            7.06
          ]
        },
        {
          "ko": "이제 조금 더 자연스러워요. 😊",
          "zh": "现在说话更自然一点了。",
          "t": [
            7.46,
            9.97
          ]
        }
      ],
      "vocab": [
        {
          "word": "배웠어요",
          "reading": "bae-wo-sseo-yo",
          "meaning": "（已）学了"
        },
        {
          "word": "공부해요",
          "reading": "gong-bu-hae-yo",
          "meaning": "学习"
        },
        {
          "word": "자연스러워요",
          "reading": "ja-yeon-seu-reo-wo-yo",
          "meaning": "自然"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "학교",
          "reading": "hak-gyo",
          "meaning": "学校"
        },
        {
          "word": "해요체",
          "reading": "hae-yo-che",
          "meaning": "礼貌的口语说法"
        },
        {
          "word": "가요",
          "reading": "ga-yo",
          "meaning": "去"
        },
        {
          "word": "먹어요",
          "reading": "meo-geo-yo",
          "meaning": "吃"
        },
        {
          "word": "이제",
          "reading": "i-je",
          "meaning": "现在"
        },
        {
          "word": "조금",
          "reading": "jo-geum",
          "meaning": "一点、稍微"
        }
      ],
      "quiz": [
        {
          "question": "\"공부하다\"를 해요체로 하면?",
          "options": [
            "공부해요",
            "공부가요",
            "공부이에요",
            "공부먹어요"
          ],
          "answerIndex": 0,
          "explanation": "“공부하다”变成해요体是“공부해요”。“하다”结尾的动词变해요体时变成“해요”。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "해요체 마스터 가자!! 🔥",
          "zh": "口语说法大师，冲！！",
          "audioUrl": "/audio/blog/comments/w4-tori-haeyo-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "진짜 많이 늘었어요 🌰",
          "zh": "真的进步很多",
          "audioUrl": "/audio/blog/comments/w4-tori-haeyo-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "haru",
        "minji",
        "choco",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-haeyo-1-1784806922905.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-haeyo.mp3",
    "audioDuration": 10,
    "coverEmoji": "📚",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 15,
    "publishedAt": 1784000324794,
    "isFeatured": false,
    "unlockDay": 22,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-04",
    "slug": "w4-junho-idol",
    "titleKo": "오늘 최애를 실제로 봤다!!",
    "titleZh": "今天亲眼见到本命了！！",
    "excerptKo": "진짜 대박! 홍대에서 최애를 봤어요. 심장이 너무 빨리 뛰어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "진짜 대박!! 오늘 최애를 봤어요! 🎤",
          "zh": "真的太棒了！！今天见到本命了！",
          "t": [
            0,
            3.69
          ]
        },
        {
          "ko": "홍대에서 우연히 만났어요.",
          "zh": "在弘大偶然遇到的。",
          "t": [
            4.09,
            6.17
          ]
        },
        {
          "ko": "심장이 너무 빨리 뛰어요! 🔥",
          "zh": "心跳得太快了！",
          "t": [
            6.57,
            8.6
          ]
        }
      ],
      "vocab": [
        {
          "word": "대박",
          "reading": "dae-bak",
          "meaning": "厉害、太棒了"
        },
        {
          "word": "최애",
          "reading": "choe-ae",
          "meaning": "最爱、本命"
        },
        {
          "word": "심장",
          "reading": "sim-jang",
          "meaning": "心脏"
        },
        {
          "word": "진짜",
          "reading": "jin-jja",
          "meaning": "真的"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "봤어요",
          "reading": "bwa-sseo-yo",
          "meaning": "看到了"
        },
        {
          "word": "홍대",
          "reading": "hong-dae",
          "meaning": "弘大（首尔地名）"
        },
        {
          "word": "우연히",
          "reading": "u-yeon-hi",
          "meaning": "偶然地"
        },
        {
          "word": "만났어요",
          "reading": "man-na-sseo-yo",
          "meaning": "遇到了、见到了"
        },
        {
          "word": "너무",
          "reading": "neo-mu",
          "meaning": "太、非常"
        },
        {
          "word": "빨리",
          "reading": "ppal-li",
          "meaning": "快、迅速地"
        },
        {
          "word": "뛰어요",
          "reading": "ttwi-eo-yo",
          "meaning": "跳动、跑"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "준호 씨 너무 행복해 보여요 🌸",
          "zh": "俊浩看起来太幸福了",
          "audioUrl": "/audio/blog/comments/w4-junho-idol-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "축하해요!! 🍫",
          "zh": "恭喜！！",
          "audioUrl": "/audio/blog/comments/w4-junho-idol-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "choco",
        "haru",
        "minji",
        "nabi",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w4-junho-idol-1-1784806036731.jpg",
          "w": 1440,
          "h": 1080
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-junho-idol.mp3",
    "audioDuration": 9,
    "coverEmoji": "🎤",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "junho",
    "likeCount": 20,
    "publishedAt": 1784083742483,
    "isFeatured": false,
    "unlockDay": 23,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-03",
    "slug": "w4-tori-hongdae-idol",
    "titleKo": "홍대에서 아이돌을 봤어요",
    "titleZh": "在弘大看到了偶像",
    "excerptKo": "준호하고 홍대에 갔어요. 진짜 아이돌을 봤어요! 정말 신기해요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 준호하고 홍대에 갔어요. 🌟",
          "zh": "今天和俊浩去了弘大。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "길에서 진짜 아이돌을 봤어요!",
          "zh": "在街上看到了真的偶像！",
          "t": [
            3.71,
            6.69
          ]
        },
        {
          "ko": "준호가 너무 좋아했어요. 정말 신기해요. 😆",
          "zh": "俊浩超级开心。真的很神奇。",
          "t": [
            7.09,
            10.74
          ]
        }
      ],
      "vocab": [
        {
          "word": "아이돌",
          "reading": "a-i-dol",
          "meaning": "偶像、爱豆"
        },
        {
          "word": "진짜",
          "reading": "jin-jja",
          "meaning": "真的"
        },
        {
          "word": "신기해요",
          "reading": "sin-gi-hae-yo",
          "meaning": "神奇、新奇"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "홍대",
          "reading": "hong-dae",
          "meaning": "弘大（首尔地名）"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "길",
          "reading": "gil",
          "meaning": "路、街上"
        },
        {
          "word": "봤어요",
          "reading": "bwa-sseo-yo",
          "meaning": "看到了"
        },
        {
          "word": "너무",
          "reading": "neo-mu",
          "meaning": "太、非常"
        },
        {
          "word": "좋아했어요",
          "reading": "jo-a-hae-sseo-yo",
          "meaning": "（很）喜欢、（很）开心"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的、非常"
        }
      ],
      "quiz": [
        {
          "question": "토리는 홍대에서 누구를 봤어요?",
          "options": [
            "아이돌",
            "의사",
            "집주인",
            "약사"
          ],
          "answerIndex": 0,
          "explanation": "兔莉在弘大看到了偶像（아이돌）。“진짜”是“真的”，表示惊喜或强调。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "오늘 진짜 대박이었어!! 🔥🎤",
          "zh": "今天真的太棒了！！",
          "audioUrl": "/audio/blog/comments/w4-tori-hongdae-idol-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "우와, 부러워요! 💧",
          "zh": "哇，好羡慕！",
          "audioUrl": "/audio/blog/comments/w4-tori-hongdae-idol-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "minji",
        "haru",
        "choco",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-tori-hongdae-idol.mp3",
    "audioDuration": 11,
    "coverEmoji": "🌟",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 18,
    "publishedAt": 1784083743483,
    "isFeatured": false,
    "unlockDay": 23,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-hongdae",
    "slug": "hongdae-hana",
    "titleKo": "홍대에서의 하루",
    "titleZh": "在弘大的一天",
    "excerptKo": "친구랑 홍대에 가서 보낸 즐거운 하루 이야기예요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 날씨가 정말 좋아서 친구랑 홍대에 갔어요.",
          "zh": "今天天气特别好，所以和朋友一起去了弘大。",
          "t": [
            0,
            5.02
          ]
        },
        {
          "ko": "홍대는 한국의 젊은 문화가 모이는 곳이에요.",
          "zh": "弘大是韩国年轻文化聚集的地方。",
          "t": [
            5.42,
            8.72
          ]
        },
        {
          "ko": "거리에서 노래를 부르는 사람들을 많이 봤어요.",
          "zh": "在街上看到很多唱歌的人。",
          "t": [
            9.12,
            12.77
          ]
        },
        {
          "ko": "우리는 맛있는 커피를 마시면서 이야기를 많이 나눴어요.",
          "zh": "我们一边喝着好喝的咖啡，一边聊了很多。",
          "t": [
            13.17,
            17.71
          ]
        },
        {
          "ko": "정말 즐거운 하루였어요!",
          "zh": "真是愉快的一天！",
          "t": [
            18.11,
            20.62
          ]
        }
      ],
      "vocab": [
        {
          "word": "날씨",
          "reading": "nal-ssi",
          "meaning": "天气"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "홍대",
          "reading": "hong-dae",
          "meaning": "弘大（首尔地名）"
        },
        {
          "word": "문화",
          "reading": "mun-hwa",
          "meaning": "文化"
        },
        {
          "word": "거리",
          "reading": "geo-ri",
          "meaning": "街道、大街"
        },
        {
          "word": "노래",
          "reading": "no-rae",
          "meaning": "歌曲"
        },
        {
          "word": "사람들",
          "reading": "sa-ram-deul",
          "meaning": "人们"
        },
        {
          "word": "커피",
          "reading": "keo-pi",
          "meaning": "咖啡"
        },
        {
          "word": "이야기",
          "reading": "i-ya-gi",
          "meaning": "谈话、故事"
        },
        {
          "word": "하루",
          "reading": "ha-ru",
          "meaning": "一天"
        },
        {
          "word": "즐거운",
          "reading": "jeul-geo-un",
          "meaning": "愉快的、快乐的"
        }
      ],
      "quiz": [
        {
          "question": "글쓴이는 오늘 누구와 홍대에 갔어요?",
          "options": [
            "친구",
            "가족",
            "혼자",
            "선생님"
          ],
          "answerIndex": 0,
          "explanation": "第一句说“今天天气好，所以和朋友一起去了弘大”。"
        }
      ],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "우와~ 홍대 진짜 재밌겠다! 🥰",
          "zh": "哇 弘大肯定超好玩",
          "audioUrl": "/audio/blog/comments/hongdae-hana-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "다음엔 나도 데려가 줘 ㅠㅠ",
          "zh": "下次也带我去嘛",
          "audioUrl": "/audio/blog/comments/hongdae-hana-c1.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "사진 진짜 예쁘다 👍",
          "zh": "照片真好看",
          "audioUrl": "/audio/blog/comments/hongdae-hana-c2.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "좋은 하루 보냈구나 :)",
          "zh": "度过了美好的一天呢",
          "audioUrl": "/audio/blog/comments/hongdae-hana-c3.mp3"
        }
      ],
      "likedBy": [
        "gomdori",
        "nabi",
        "choco"
      ],
      "images": [
        {
          "url": "/images/blog/hongdae-hana-1-1784644898923.jpg",
          "w": 1440,
          "h": 754
        }
      ]
    },
    "audioUrl": "/audio/blog/hongdae-hana.mp3",
    "audioDuration": 21,
    "coverEmoji": "🎨",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 24,
    "publishedAt": 1782249603311,
    "isFeatured": true,
    "unlockDay": 24,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-06",
    "slug": "w4-koal-weekend",
    "titleKo": "다들 바쁘네요, 저는 낮잠 자요",
    "titleZh": "大家都好忙，我睡午觉",
    "excerptKo": "다들 콘서트 준비로 바빠요. 저는 조용히 낮잠 자요.",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다들 콘서트 준비로 바빠요.",
          "zh": "大家都在忙着准备演唱会。",
          "t": [
            0,
            2.17
          ]
        },
        {
          "ko": "저는 조용히 낮잠 자요. 💤",
          "zh": "我安静地睡午觉。",
          "t": [
            2.57,
            4.94
          ]
        },
        {
          "ko": "이것도 행복해요. 😌",
          "zh": "这样也很幸福。",
          "t": [
            5.34,
            7.28
          ]
        }
      ],
      "vocab": [
        {
          "word": "준비",
          "reading": "jun-bi",
          "meaning": "准备"
        },
        {
          "word": "바빠요",
          "reading": "ba-ppa-yo",
          "meaning": "忙"
        },
        {
          "word": "낮잠",
          "reading": "nat-jam",
          "meaning": "午觉"
        },
        {
          "word": "다들",
          "reading": "da-deul",
          "meaning": "大家都"
        },
        {
          "word": "콘서트",
          "reading": "kon-seo-teu",
          "meaning": "演唱会"
        },
        {
          "word": "저",
          "reading": "jeo",
          "meaning": "我（谦称）"
        },
        {
          "word": "조용히",
          "reading": "jo-yong-hi",
          "meaning": "安静地"
        },
        {
          "word": "자요",
          "reading": "ja-yo",
          "meaning": "睡"
        },
        {
          "word": "이것",
          "reading": "i-geot",
          "meaning": "这个"
        },
        {
          "word": "행복해요",
          "reading": "haeng-bo-kae-yo",
          "meaning": "幸福"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "haru",
          "ko": "코알 님 다운 하루 🌰",
          "zh": "很有考拉风格的一天",
          "audioUrl": "/audio/blog/comments/w4-koal-weekend-c0.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "푹 쉬어요 ✨",
          "zh": "好好休息",
          "audioUrl": "/audio/blog/comments/w4-koal-weekend-c1.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "nabi",
        "tori"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-koal-weekend.mp3",
    "audioDuration": 7,
    "coverEmoji": "💤",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "koal",
    "likeCount": 12,
    "publishedAt": 1784167161173,
    "isFeatured": false,
    "unlockDay": 24,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-05",
    "slug": "w4-tori-invite",
    "titleKo": "주말에 같이 콘서트 가요!",
    "titleZh": "周末一起去演唱会吧！",
    "excerptKo": "준호가 콘서트에 초대했어요. 민지하고 같이 가요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "준호가 콘서트에 초대했어요. 🎫",
          "zh": "俊浩邀请我去演唱会。",
          "t": [
            0,
            3.36
          ]
        },
        {
          "ko": "\"같이 가요!\"라고 했어요.",
          "zh": "他说“一起去吧！”。",
          "t": [
            3.76,
            6.26
          ]
        },
        {
          "ko": "민지하고 같이 가요. 신나요! 😊",
          "zh": "和敏智一起去。好兴奋！",
          "t": [
            6.66,
            9.4
          ]
        }
      ],
      "vocab": [
        {
          "word": "콘서트",
          "reading": "kon-seo-teu",
          "meaning": "演唱会、音乐会"
        },
        {
          "word": "초대",
          "reading": "cho-dae",
          "meaning": "邀请"
        },
        {
          "word": "신나요",
          "reading": "sin-na-yo",
          "meaning": "兴奋、开心"
        },
        {
          "word": "준호",
          "reading": "jun-ho",
          "meaning": "俊浩（人名）"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "가요",
          "reading": "ga-yo",
          "meaning": "去"
        },
        {
          "word": "했어요",
          "reading": "hae-sseo-yo",
          "meaning": "说了、做了"
        },
        {
          "word": "민지",
          "reading": "min-ji",
          "meaning": "敏智（人名）"
        }
      ],
      "quiz": [
        {
          "question": "토리는 주말에 어디에 가요?",
          "options": [
            "콘서트",
            "병원",
            "은행",
            "학교"
          ],
          "answerIndex": 0,
          "explanation": "兔莉周末要去演唱会（콘서트）。“같이 가요”是“一起去吧”，邀约时常用。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "당연하지! 같이 가자! 🎤",
          "zh": "当然啦！一起去！",
          "audioUrl": "/audio/blog/comments/w4-tori-invite-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "나도 기대돼요! 💧",
          "zh": "我也好期待！",
          "audioUrl": "/audio/blog/comments/w4-tori-invite-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "minji",
        "haru",
        "choco",
        "nabi",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-tori-invite.mp3",
    "audioDuration": 9,
    "coverEmoji": "🎫",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 16,
    "publishedAt": 1784167162173,
    "isFeatured": false,
    "unlockDay": 24,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-07",
    "slug": "w4-tori-hangang-concert",
    "titleKo": "한강에서 콘서트를 봤어요!",
    "titleZh": "在汉江看了演唱会！",
    "excerptKo": "한강 콘서트에 갔어요. 준호가 응원을 가르쳐 줬어요. 사랑해요!",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 한강에서 콘서트를 봤어요! 🎶",
          "zh": "今天在汉江看了演唱会！",
          "t": [
            0,
            3.12
          ]
        },
        {
          "ko": "준호가 응원을 가르쳐 줬어요.",
          "zh": "俊浩教了我应援。",
          "t": [
            3.52,
            6.26
          ]
        },
        {
          "ko": "다 같이 \"사랑해요!\"라고 외쳤어요.",
          "zh": "大家一起喊“我爱你！”。",
          "t": [
            6.66,
            10.45
          ]
        },
        {
          "ko": "정말 잊지 못할 밤이에요. 😭",
          "zh": "真是难忘的一夜。",
          "t": [
            10.85,
            12.93
          ]
        }
      ],
      "vocab": [
        {
          "word": "한강",
          "reading": "han-gang",
          "meaning": "汉江"
        },
        {
          "word": "응원",
          "reading": "eung-won",
          "meaning": "应援、加油"
        },
        {
          "word": "사랑해요",
          "reading": "sa-rang-hae-yo",
          "meaning": "我爱你"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "콘서트",
          "reading": "kon-seo-teu",
          "meaning": "演唱会"
        },
        {
          "word": "봤어요",
          "reading": "bwa-sseo-yo",
          "meaning": "看了"
        },
        {
          "word": "가르쳐 줬어요",
          "reading": "ga-reu-cheo-jwo-sseo-yo",
          "meaning": "教（给我）了"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "외쳤어요",
          "reading": "oe-chyeo-sseo-yo",
          "meaning": "喊了、呼喊"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的"
        },
        {
          "word": "밤",
          "reading": "bam",
          "meaning": "夜晚"
        }
      ],
      "quiz": [
        {
          "question": "다 같이 뭐라고 외쳤어요?",
          "options": [
            "사랑해요!",
            "안녕히 가세요!",
            "얼마예요?",
            "괜찮아요?"
          ],
          "answerIndex": 0,
          "explanation": "大家一起喊了“사랑해요!”（我爱你！）。“외치다”是“呼喊”，应援时用。"
        }
      ],
      "comments": [
        {
          "animalId": "junho",
          "ko": "우리 응원 완벽했어!! 🔥🎤",
          "zh": "我们的应援太完美了！！",
          "audioUrl": "/audio/blog/comments/w4-tori-hangang-concert-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "진짜 최고의 밤! 💧",
          "zh": "真是最棒的一夜！",
          "audioUrl": "/audio/blog/comments/w4-tori-hangang-concert-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "사진 보니까 너무 좋아 보여요 🌰",
          "zh": "看照片觉得你们太开心了",
          "audioUrl": "/audio/blog/comments/w4-tori-hangang-concert-c2.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "minji",
        "haru",
        "choco",
        "nabi",
        "koal",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-hangang-concert-1-1784806048663.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-hangang-concert.mp3",
    "audioDuration": 13,
    "coverEmoji": "🎶",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 21,
    "publishedAt": 1784250580863,
    "isFeatured": false,
    "unlockDay": 25,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-08",
    "slug": "w4-tori-daiso-again",
    "titleKo": "다이소에서 당근 펜을 샀어요",
    "titleZh": "在大创买了胡萝卜笔",
    "excerptKo": "오늘은 조용히 다이소에 갔어요. 귀여운 당근 펜을 발견했어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 조용히 다이소에 갔어요.",
          "zh": "今天安静地去了大创。",
          "t": [
            0,
            2.74
          ]
        },
        {
          "ko": "귀여운 당근 펜을 발견했어요! 🥕",
          "zh": "发现了可爱的胡萝卜笔！",
          "t": [
            3.14,
            6.03
          ]
        },
        {
          "ko": "일기를 쓰고 싶어요. 그래서 샀어요. 😊",
          "zh": "想写日记。所以买了它。",
          "t": [
            6.43,
            10.36
          ]
        }
      ],
      "vocab": [
        {
          "word": "귀여운",
          "reading": "gwi-yeo-un",
          "meaning": "可爱的"
        },
        {
          "word": "당근",
          "reading": "dang-geun",
          "meaning": "胡萝卜"
        },
        {
          "word": "발견",
          "reading": "bal-gyeon",
          "meaning": "发现"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "조용히",
          "reading": "jo-yong-hi",
          "meaning": "安静地"
        },
        {
          "word": "다이소",
          "reading": "da-i-so",
          "meaning": "大创（生活杂货店）"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "펜",
          "reading": "pen",
          "meaning": "笔"
        },
        {
          "word": "일기",
          "reading": "il-gi",
          "meaning": "日记"
        },
        {
          "word": "쓰고 싶어요",
          "reading": "sseu-go-si-peo-yo",
          "meaning": "想写"
        },
        {
          "word": "그래서",
          "reading": "geu-rae-seo",
          "meaning": "所以"
        },
        {
          "word": "샀어요",
          "reading": "sa-sseo-yo",
          "meaning": "买了"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "당근 펜 너무 귀여워요! ✨",
          "zh": "胡萝卜笔太可爱了！",
          "audioUrl": "/audio/blog/comments/w4-tori-daiso-again-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "일기 쓰는 토리 응원해요 🌰",
          "zh": "给写日记的兔莉加油",
          "audioUrl": "/audio/blog/comments/w4-tori-daiso-again-c1.mp3"
        }
      ],
      "likedBy": [
        "nabi",
        "haru",
        "choco",
        "minji",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-tori-daiso-again.mp3",
    "audioDuration": 10,
    "coverEmoji": "🥕",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 14,
    "publishedAt": 1784334000552,
    "isFeatured": false,
    "unlockDay": 26,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-10",
    "slug": "w4-choco-dinner",
    "titleKo": "토리 덕분에 맛있게 먹었어요",
    "titleZh": "多亏兔莉吃得很开心",
    "excerptKo": "오늘 토리가 한턱냈어요. 다 같이 국수를 먹었어요. 정말 맛있어요!",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 토리가 한턱냈어요! 🍲",
          "zh": "今天兔莉请客了！",
          "t": [
            0,
            1.56
          ]
        },
        {
          "ko": "다 같이 국수를 먹었어요.",
          "zh": "大家一起吃了面。",
          "t": [
            1.96,
            3.76
          ]
        },
        {
          "ko": "정말 맛있어서 배가 불러요. 🍫",
          "zh": "太好吃了，肚子好饱。",
          "t": [
            4.16,
            6.48
          ]
        }
      ],
      "vocab": [
        {
          "word": "국수",
          "reading": "guk-su",
          "meaning": "面条"
        },
        {
          "word": "배",
          "reading": "bae",
          "meaning": "肚子"
        },
        {
          "word": "불러요",
          "reading": "bul-leo-yo",
          "meaning": "饱"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "한턱냈어요",
          "reading": "han-teok-nae-sseo-yo",
          "meaning": "请了客"
        },
        {
          "word": "다",
          "reading": "da",
          "meaning": "全部、都"
        },
        {
          "word": "같이",
          "reading": "ga-chi",
          "meaning": "一起"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的"
        },
        {
          "word": "맛있어서",
          "reading": "ma-si-sseo-seo",
          "meaning": "因为好吃"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "많이 먹어서 다행이에요 🌸",
          "zh": "你们吃得多真好",
          "audioUrl": "/audio/blog/comments/w4-choco-dinner-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "국수 최고였어요 🌰",
          "zh": "面条太赞了",
          "audioUrl": "/audio/blog/comments/w4-choco-dinner-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "minji",
        "junho",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-choco-dinner.mp3",
    "audioDuration": 6,
    "coverEmoji": "🍲",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "choco",
    "likeCount": 13,
    "publishedAt": 1784417398242,
    "isFeatured": false,
    "unlockDay": 27,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-09",
    "slug": "w4-tori-treat",
    "titleKo": "친구들에게 한턱냈어요",
    "titleZh": "请了朋友们一顿",
    "excerptKo": "고마운 친구들에게 밥을 샀어요. \"오늘은 제가 낼게요!\"",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 친구들에게 밥을 샀어요. 🍜",
          "zh": "今天请朋友们吃了饭。",
          "t": [
            0,
            3.26
          ]
        },
        {
          "ko": "\"오늘은 제가 낼게요!\"라고 말했어요.",
          "zh": "我说了“今天我来请！”。",
          "t": [
            3.66,
            7.06
          ]
        },
        {
          "ko": "다들 도와줘서 정말 고마워요. 😊",
          "zh": "大家一直帮我，真的很感谢。",
          "t": [
            7.46,
            10.49
          ]
        }
      ],
      "vocab": [
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "낼게요",
          "reading": "nael-ge-yo",
          "meaning": "（我来）付、请客"
        },
        {
          "word": "고마워요",
          "reading": "go-ma-wo-yo",
          "meaning": "谢谢"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "밥",
          "reading": "bap",
          "meaning": "饭"
        },
        {
          "word": "샀어요",
          "reading": "sa-sseo-yo",
          "meaning": "买了、请（客）了"
        },
        {
          "word": "제가",
          "reading": "je-ga",
          "meaning": "我（做主语时）"
        },
        {
          "word": "말했어요",
          "reading": "mal-hae-sseo-yo",
          "meaning": "说了"
        },
        {
          "word": "다들",
          "reading": "da-deul",
          "meaning": "大家都"
        },
        {
          "word": "도와줘서",
          "reading": "do-wa-jwo-seo",
          "meaning": "因为帮助（我）"
        },
        {
          "word": "정말",
          "reading": "jeong-mal",
          "meaning": "真的"
        }
      ],
      "quiz": [
        {
          "question": "토리는 오늘 뭐라고 말했어요?",
          "options": [
            "제가 낼게요!",
            "얼마예요?",
            "주세요.",
            "안녕히 가세요."
          ],
          "answerIndex": 0,
          "explanation": "兔莉说了“제가 낼게요!”，意思是“我来付（请客）！”。“~ㄹ게요”表示说话人的意愿。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "토리 씨 멋져요! 잘 먹었어요 💧",
          "zh": "兔莉真帅气！吃得很好",
          "audioUrl": "/audio/blog/comments/w4-tori-treat-c0.mp3"
        },
        {
          "animalId": "junho",
          "ko": "다음엔 내가 쏜다! 🎤",
          "zh": "下次我请！",
          "audioUrl": "/audio/blog/comments/w4-tori-treat-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "맛있었어요, 고마워요 🌰",
          "zh": "很好吃，谢谢",
          "audioUrl": "/audio/blog/comments/w4-tori-treat-c2.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "junho",
        "haru",
        "choco",
        "nabi",
        "koal"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-treat-1-1784806059412.jpg",
          "w": 1440,
          "h": 1080
        },
        {
          "url": "/images/blog/w4-tori-treat-2-1784806697714.jpg",
          "w": 1254,
          "h": 1254
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-treat.mp3",
    "audioDuration": 10,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 17,
    "publishedAt": 1784417420242,
    "isFeatured": false,
    "unlockDay": 27,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-12",
    "slug": "w4-yowoo-thinking",
    "titleKo": "혼자 산다는 건 무엇일까요?",
    "titleZh": "独自生活意味着什么呢？",
    "excerptKo": "혼자 사는 건 외로움일까요, 아니면 자유일까요? 함께 생각해 봐요.",
    "level": "고급",
    "category": "문화 노트",
    "content": {
      "sentences": [
        {
          "ko": "오늘은 조용한 밤이에요. ☕",
          "zh": "今天是安静的夜晚。",
          "t": [
            0,
            4.21
          ]
        },
        {
          "ko": "혼자 산다는 건 무엇일까요?",
          "zh": "独自生活意味着什么呢？",
          "t": [
            4.61,
            6.94
          ]
        },
        {
          "ko": "외로움일까요, 아니면 자유일까요?",
          "zh": "是孤独，还是自由呢？",
          "t": [
            7.34,
            11.21
          ]
        },
        {
          "ko": "생각해 보면, 둘 다인 것 같아요.",
          "zh": "想一想，也许两者都是。",
          "t": [
            11.61,
            14.64
          ]
        }
      ],
      "vocab": [
        {
          "word": "외로움",
          "reading": "oe-ro-um",
          "meaning": "孤独"
        },
        {
          "word": "자유",
          "reading": "ja-yu",
          "meaning": "自由"
        },
        {
          "word": "생각",
          "reading": "saeng-gak",
          "meaning": "想法、思考"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "조용한",
          "reading": "jo-yong-han",
          "meaning": "安静的"
        },
        {
          "word": "밤",
          "reading": "bam",
          "meaning": "夜晚"
        },
        {
          "word": "혼자",
          "reading": "hon-ja",
          "meaning": "独自、一个人"
        },
        {
          "word": "산다는 건",
          "reading": "san-da-neun-geon",
          "meaning": "生活这件事"
        },
        {
          "word": "무엇",
          "reading": "mu-eot",
          "meaning": "什么"
        },
        {
          "word": "아니면",
          "reading": "a-ni-myeon",
          "meaning": "还是、或者"
        },
        {
          "word": "둘 다",
          "reading": "dul-da",
          "meaning": "两者都"
        }
      ],
      "quiz": [
        {
          "question": "여우는 혼자 사는 것을 어떻게 봤어요?",
          "options": [
            "외로움이자 자유",
            "오직 외로움",
            "오직 자유",
            "나쁜 것"
          ],
          "answerIndex": 0,
          "explanation": "狐狸认为独居既是孤独也是自由（외로움이자 자유），是一种辩证的看法。"
        }
      ],
      "comments": [
        {
          "animalId": "tori",
          "ko": "요즘 저도 그런 생각을 해요 🌸",
          "zh": "最近我也在想这个",
          "audioUrl": "/audio/blog/comments/w4-yowoo-thinking-c0.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "깊은 이야기네요 📖",
          "zh": "很有深度的话题呢",
          "audioUrl": "/audio/blog/comments/w4-yowoo-thinking-c1.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "조용한 밤에 어울려요 ✨",
          "zh": "很适合安静的夜晚",
          "audioUrl": "/audio/blog/comments/w4-yowoo-thinking-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "gomdori",
        "nabi",
        "haru",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-yowoo-thinking.mp3",
    "audioDuration": 15,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "yowoo",
    "likeCount": 17,
    "publishedAt": 1784500816932,
    "isFeatured": false,
    "unlockDay": 28,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-11",
    "slug": "w4-tori-past-tense",
    "titleKo": "이제 일기를 쓰기 시작했어요",
    "titleZh": "现在开始写日记了",
    "excerptKo": "오늘부터 한국어로 일기를 써요. \"갔어요, 먹었어요, 만났어요.\"",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘부터 한국어로 일기를 써요. ✍️",
          "zh": "从今天开始用韩语写日记。",
          "t": [
            0,
            2.65
          ]
        },
        {
          "ko": "\"갔어요, 먹었어요, 만났어요.\"",
          "zh": "“去了、吃了、见了。”",
          "t": [
            3.05,
            6.74
          ]
        },
        {
          "ko": "과거형을 쓰니까 뿌듯해요. 😊",
          "zh": "会用过去式了，好有成就感。",
          "t": [
            7.14,
            10.36
          ]
        }
      ],
      "vocab": [
        {
          "word": "일기",
          "reading": "il-gi",
          "meaning": "日记"
        },
        {
          "word": "과거형",
          "reading": "gwa-geo-hyeong",
          "meaning": "过去式"
        },
        {
          "word": "뿌듯해요",
          "reading": "ppu-deu-tae-yo",
          "meaning": "自豪、有成就感"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "한국어",
          "reading": "han-gu-geo",
          "meaning": "韩语"
        },
        {
          "word": "써요",
          "reading": "sseo-yo",
          "meaning": "写"
        },
        {
          "word": "갔어요",
          "reading": "ga-sseo-yo",
          "meaning": "去了"
        },
        {
          "word": "먹었어요",
          "reading": "meo-geo-sseo-yo",
          "meaning": "吃了"
        },
        {
          "word": "만났어요",
          "reading": "man-na-sseo-yo",
          "meaning": "见了、遇到了"
        },
        {
          "word": "쓰니까",
          "reading": "sseu-ni-kka",
          "meaning": "因为写、写了之后"
        }
      ],
      "quiz": [
        {
          "question": "\"가다\"의 과거형은?",
          "options": [
            "갔어요",
            "가요",
            "갈게요",
            "가고"
          ],
          "answerIndex": 0,
          "explanation": "“가다”的过去式是“갔어요”。过去式用“~았/었어요”，“가다”变成“갔어요”。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "토리 정말 많이 늘었어요! 🌰",
          "zh": "兔莉真的进步好多！",
          "audioUrl": "/audio/blog/comments/w4-tori-past-tense-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "한국어 일기라니, 멋져요! 💧",
          "zh": "用韩语写日记，太厉害了！",
          "audioUrl": "/audio/blog/comments/w4-tori-past-tense-c1.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "junho",
        "choco",
        "nabi",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-past-tense-1-1784806685086.jpg",
          "w": 1440,
          "h": 810
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-past-tense.mp3",
    "audioDuration": 10,
    "coverEmoji": "✍️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 18,
    "publishedAt": 1784500817932,
    "isFeatured": false,
    "unlockDay": 28,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-13",
    "slug": "w4-tori-first-diary",
    "titleKo": "엄마 당근 펜으로 첫 일기를 썼어요",
    "titleZh": "用妈妈的胡萝卜笔写了第一篇日记",
    "excerptKo": "엄마가 준 당근 펜으로 한국어 일기를 썼어요. \"저는 용기를 냈어요.\"",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 처음으로 한국어 일기를 썼어요. 📔",
          "zh": "今天第一次写了韩语日记。",
          "t": [
            0,
            3.51
          ]
        },
        {
          "ko": "엄마가 준 당근 펜으로 썼어요.",
          "zh": "用妈妈给的胡萝卜笔写的。",
          "t": [
            3.91,
            6.65
          ]
        },
        {
          "ko": "갔어요, 먹었어요, 만났어요, 웃었어요.",
          "zh": "去了、吃了、见了、笑了。",
          "t": [
            7.05,
            11.92
          ]
        },
        {
          "ko": "마지막 문장은 \"저는 용기를 냈어요.\"예요. 🌸",
          "zh": "最后一句是“我鼓起了勇气”。",
          "t": [
            12.32,
            16.86
          ]
        },
        {
          "ko": "내일은 초급 시험이에요. 조금 떨려요!",
          "zh": "明天是初级考试。有点紧张！",
          "t": [
            17.26,
            21.14
          ]
        }
      ],
      "vocab": [
        {
          "word": "당근",
          "reading": "dang-geun",
          "meaning": "胡萝卜"
        },
        {
          "word": "용기",
          "reading": "yong-gi",
          "meaning": "勇气"
        },
        {
          "word": "시험",
          "reading": "si-heom",
          "meaning": "考试"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "처음으로",
          "reading": "cheo-eu-meu-ro",
          "meaning": "第一次、首次"
        },
        {
          "word": "한국어",
          "reading": "han-gu-geo",
          "meaning": "韩语"
        },
        {
          "word": "일기",
          "reading": "il-gi",
          "meaning": "日记"
        },
        {
          "word": "썼어요",
          "reading": "sseo-sseo-yo",
          "meaning": "写了"
        },
        {
          "word": "만났어요",
          "reading": "man-na-sseo-yo",
          "meaning": "见了、遇到了"
        },
        {
          "word": "웃었어요",
          "reading": "u-seo-sseo-yo",
          "meaning": "笑了"
        },
        {
          "word": "마지막",
          "reading": "ma-ji-mak",
          "meaning": "最后"
        },
        {
          "word": "내일",
          "reading": "nae-il",
          "meaning": "明天"
        }
      ],
      "quiz": [
        {
          "question": "토리는 무엇으로 일기를 썼어요?",
          "options": [
            "당근 펜",
            "연필",
            "노트북",
            "휴대폰"
          ],
          "answerIndex": 0,
          "explanation": "兔莉用妈妈给的“당근 펜(胡萝卜笔)”写了日记，呼应第一天妈妈送的勇气胡萝卜。"
        }
      ],
      "comments": [
        {
          "animalId": "haru",
          "ko": "토리, 정말 자랑스러워요 🌰😭",
          "zh": "兔莉，真为你骄傲",
          "audioUrl": "/audio/blog/comments/w4-tori-first-diary-c0.mp3"
        },
        {
          "animalId": "minji",
          "ko": "처음 만난 날이 생각나요 💧",
          "zh": "想起第一次遇见你的那天",
          "audioUrl": "/audio/blog/comments/w4-tori-first-diary-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "내일 시험 화이팅!! 🔥🎤",
          "zh": "明天考试加油！！",
          "audioUrl": "/audio/blog/comments/w4-tori-first-diary-c2.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "한 걸음씩 여기까지 왔구나 📖",
          "zh": "一步一步走到了这里啊",
          "audioUrl": "/audio/blog/comments/w4-tori-first-diary-c3.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "minji",
        "junho",
        "gomdori",
        "yowoo",
        "nabi",
        "choco",
        "koal",
        "darami"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-first-diary-1-1784806193570.jpg",
          "w": 1440,
          "h": 1080
        },
        {
          "url": "/images/blog/w4-tori-first-diary-2-1784806675005.jpg",
          "w": 1440,
          "h": 1080
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-first-diary.mp3",
    "audioDuration": 21,
    "coverEmoji": "📔",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 28,
    "publishedAt": 1784584236621,
    "isFeatured": true,
    "unlockDay": 29,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-baedal",
    "slug": "baedal-food",
    "titleKo": "배달 음식의 세계",
    "titleZh": "外卖的世界",
    "excerptKo": "치킨부터 커피까지, 한국의 발달한 배달 문화를 들여다봐요.",
    "level": "고급",
    "category": "문화 노트",
    "content": {
      "sentences": [
        {
          "ko": "한국은 배달 음식의 천국이라고 불릴 만큼 배달 문화가 발달했다.",
          "zh": "韩国发达的外卖文化甚至让它被称为外卖的天堂。",
          "t": [
            0,
            4.69
          ]
        },
        {
          "ko": "치킨부터 족발, 심지어 커피까지 거의 모든 음식을 집 앞까지 받을 수 있다.",
          "zh": "从炸鸡到猪蹄，甚至连咖啡，几乎所有食物都能送到家门口。",
          "t": [
            5.09,
            11.24
          ]
        },
        {
          "ko": "스마트폰 앱 하나만 있으면 몇 번의 터치로 주문이 끝난다.",
          "zh": "只要有一个手机应用，点几下就能完成下单。",
          "t": [
            11.64,
            15.77
          ]
        },
        {
          "ko": "늦은 밤에도 배달이 가능해서 야식 문화가 자연스럽게 자리 잡았다.",
          "zh": "深夜也能配送，所以夜宵文化自然而然地扎下了根。",
          "t": [
            16.17,
            21.61
          ]
        },
        {
          "ko": "예전에는 중국집이나 치킨집 정도만 배달을 했다.",
          "zh": "以前只有中餐馆或炸鸡店之类才提供外卖。",
          "t": [
            22.01,
            25.52
          ]
        },
        {
          "ko": "그러나 배달 앱이 등장하면서 작은 식당들도 쉽게 배달을 시작할 수 있게 되었다.",
          "zh": "然而随着外卖应用的出现，小餐馆也能轻松开始配送。",
          "t": [
            25.92,
            32.02
          ]
        },
        {
          "ko": "물론 잦은 배달은 일회용 쓰레기 문제를 낳기도 한다.",
          "zh": "当然，频繁的外卖也带来了一次性垃圾的问题。",
          "t": [
            32.42,
            36.68
          ]
        },
        {
          "ko": "그래서 최근에는 다회용기를 쓰는 친환경 배달 서비스도 늘고 있다.",
          "zh": "因此最近使用可循环餐具的环保外卖服务也在增多。",
          "t": [
            37.08,
            41.82
          ]
        }
      ],
      "vocab": [
        {
          "word": "배달",
          "reading": "bae-dal",
          "meaning": "配送、外卖"
        },
        {
          "word": "음식",
          "reading": "eum-sik",
          "meaning": "食物、饮食"
        },
        {
          "word": "천국",
          "reading": "cheon-guk",
          "meaning": "天堂"
        },
        {
          "word": "치킨",
          "reading": "chi-kin",
          "meaning": "炸鸡"
        },
        {
          "word": "스마트폰",
          "reading": "seu-ma-teu-pon",
          "meaning": "智能手机"
        },
        {
          "word": "주문",
          "reading": "ju-mun",
          "meaning": "点餐、下单"
        },
        {
          "word": "야식",
          "reading": "ya-sik",
          "meaning": "夜宵"
        },
        {
          "word": "등장",
          "reading": "deung-jang",
          "meaning": "登场、出现"
        },
        {
          "word": "식당",
          "reading": "sik-dang",
          "meaning": "餐馆、饭店"
        },
        {
          "word": "쓰레기",
          "reading": "sseu-re-gi",
          "meaning": "垃圾"
        },
        {
          "word": "일회용",
          "reading": "il-hoe-yong",
          "meaning": "一次性"
        },
        {
          "word": "친환경",
          "reading": "chin-hwan-gyeong",
          "meaning": "环保"
        }
      ],
      "quiz": [
        {
          "question": "글에 따르면 한국에서 배달할 수 있는 음식은?",
          "options": [
            "거의 모든 음식",
            "치킨만",
            "커피만",
            "중국 음식만"
          ],
          "answerIndex": 0,
          "explanation": "第二句说从炸鸡到咖啡，几乎所有食物都能送到家门口。"
        },
        {
          "question": "잦은 배달이 낳는 문제는 무엇인가요?",
          "options": [
            "일회용 쓰레기 문제",
            "교통사고",
            "음식 가격 상승",
            "앱 오류"
          ],
          "answerIndex": 0,
          "explanation": "第七句说频繁的外卖会带来一次性垃圾的问题。"
        }
      ],
      "comments": [
        {
          "animalId": "tori",
          "ko": "배달 음식 없으면 못 살아요 ㅠㅠ",
          "zh": "没有外卖我可活不下去",
          "audioUrl": "/audio/blog/comments/baedal-food-c0.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "환경도 생각해야겠구나",
          "zh": "也得为环境着想呢",
          "audioUrl": "/audio/blog/comments/baedal-food-c1.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "나 어제도 치킨 시켰는데 ㅋㅋ",
          "zh": "我昨天也点了炸鸡哈哈",
          "audioUrl": "/audio/blog/comments/baedal-food-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "yowoo",
        "koal"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/baedal-food.mp3",
    "audioDuration": 42,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "choco",
    "likeCount": 27,
    "publishedAt": 1784083539483,
    "isFeatured": false,
    "unlockDay": 30,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-proverb",
    "slug": "proverb-ganeun-mal",
    "titleKo": "가는 말이 고와야 오는 말이 곱다",
    "titleZh": "你说话和气，别人才会和气",
    "excerptKo": "말의 힘을 일깨우는 한국 속담 하나를 소개해요.",
    "level": "고급",
    "category": "속담",
    "content": {
      "sentences": [
        {
          "ko": "'가는 말이 고와야 오는 말이 곱다'라는 속담이 있다.",
          "zh": "有一句俗语说“去话说得好听，来话才会好听”。",
          "t": [
            0,
            4.49
          ]
        },
        {
          "ko": "이 말은 내가 남에게 곱게 말해야 남도 나에게 곱게 말한다는 뜻이다.",
          "zh": "这句话的意思是，我对别人说话和气，别人才会对我说话和气。",
          "t": [
            4.89,
            11.77
          ]
        },
        {
          "ko": "즉, 말은 서로 주고받는 것이라는 지혜가 담겨 있다.",
          "zh": "也就是说，其中蕴含着“言语是相互往来的”这一智慧。",
          "t": [
            12.17,
            16.9
          ]
        },
        {
          "ko": "우리는 기분이 나쁠 때 무심코 거친 말을 내뱉기 쉽다.",
          "zh": "我们在心情不好时，容易无意间说出粗话。",
          "t": [
            17.3,
            22.7
          ]
        },
        {
          "ko": "그러나 거친 말은 결국 상대의 마음을 상하게 하고 나에게 돌아온다.",
          "zh": "然而粗话最终会伤害对方的心，并回到自己身上。",
          "t": [
            23.1,
            29.73
          ]
        },
        {
          "ko": "반대로 따뜻한 말 한마디는 상대의 마음을 열고 좋은 관계를 만든다.",
          "zh": "相反，一句温暖的话能打开对方的心，建立良好的关系。",
          "t": [
            30.13,
            36.24
          ]
        },
        {
          "ko": "그래서 한국 사람들은 말의 힘을 매우 소중하게 여긴다.",
          "zh": "所以韩国人非常珍视言语的力量。",
          "t": [
            36.64,
            41.85
          ]
        },
        {
          "ko": "작은 말투 하나가 사람의 관계를 바꿀 수 있다는 것을 잊지 말아야 한다.",
          "zh": "不要忘记，一个小小的语气也能改变人与人之间的关系。",
          "t": [
            42.25,
            50.11
          ]
        }
      ],
      "vocab": [
        {
          "word": "속담",
          "reading": "sok-dam",
          "meaning": "俗语、谚语"
        },
        {
          "word": "곱다",
          "reading": "gop-da",
          "meaning": "（话）和气好听；美丽"
        },
        {
          "word": "뜻",
          "reading": "tteut",
          "meaning": "意思、含义"
        },
        {
          "word": "지혜",
          "reading": "ji-hye",
          "meaning": "智慧"
        },
        {
          "word": "기분",
          "reading": "gi-bun",
          "meaning": "心情、情绪"
        },
        {
          "word": "거친",
          "reading": "geo-chin",
          "meaning": "粗鲁的、粗糙的"
        },
        {
          "word": "상대",
          "reading": "sang-dae",
          "meaning": "对方、对象"
        },
        {
          "word": "마음",
          "reading": "ma-eum",
          "meaning": "心、心意"
        },
        {
          "word": "한마디",
          "reading": "han-ma-di",
          "meaning": "一句话"
        },
        {
          "word": "관계",
          "reading": "gwan-gye",
          "meaning": "关系"
        },
        {
          "word": "힘",
          "reading": "him",
          "meaning": "力量、力气"
        },
        {
          "word": "말투",
          "reading": "mal-tu",
          "meaning": "语气、说话的口气"
        }
      ],
      "quiz": [
        {
          "question": "이 속담이 말하려는 것은 무엇인가요?",
          "options": [
            "내가 곱게 말해야 남도 곱게 말한다",
            "말은 많이 할수록 좋다",
            "침묵이 언제나 가장 좋다",
            "큰 소리로 말해야 한다"
          ],
          "answerIndex": 0,
          "explanation": "第二句解释了这句话的意思——我对别人说话和气，别人才会对我说话和气。"
        }
      ],
      "comments": [
        {
          "animalId": "tori",
          "ko": "곰돌이 오빠 최고예요! 👏",
          "zh": "熊哥哥最棒了",
          "audioUrl": "/audio/blog/comments/proverb-ganeun-mal-c0.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "말 진짜 예쁘게 하시네요 ✨",
          "zh": "说话真的好温柔",
          "audioUrl": "/audio/blog/comments/proverb-ganeun-mal-c1.mp3"
        },
        {
          "animalId": "nabi",
          "ko": "마음에 새길게요 :)",
          "zh": "我会记在心里的",
          "audioUrl": "/audio/blog/comments/proverb-ganeun-mal-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "nabi",
        "choco"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/proverb-ganeun-mal.mp3",
    "audioDuration": 50,
    "coverEmoji": "🌾",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gomdori",
    "likeCount": 18,
    "publishedAt": 1784167699173,
    "isFeatured": false,
    "unlockDay": 30,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-16",
    "slug": "w4-gomdori-farewell",
    "titleKo": "초급은 끝, 중급은 시작이란다",
    "titleZh": "初级结束，中级开始",
    "excerptKo": "토리의 중급반 진급을 축하하며, 옛말 하나를 전해요. 시작이 반이란다.",
    "level": "고급",
    "category": "속담",
    "content": {
      "sentences": [
        {
          "ko": "토리의 중급반 진급을 축하하며 옛말 하나를 전해요. 📖",
          "zh": "祝贺兔莉升入中级班，送上一句老话。",
          "t": [
            0,
            4.69
          ]
        },
        {
          "ko": "\"시작이 반이다.\"",
          "zh": "“开始就是成功的一半。”",
          "t": [
            5.09,
            6.65
          ]
        },
        {
          "ko": "토리는 용기 내어 첫걸음을 내디뎠단다.",
          "zh": "兔莉鼓起勇气迈出了第一步。",
          "t": [
            7.05,
            10.74
          ]
        },
        {
          "ko": "초급은 끝났지만, 중급은 또 다른 시작이란다.",
          "zh": "初级结束了，但中级是另一个开始。",
          "t": [
            11.14,
            15.45
          ]
        }
      ],
      "vocab": [
        {
          "word": "축하하며",
          "reading": "chu-ka-ha-myeo",
          "meaning": "一边祝贺、祝贺着"
        },
        {
          "word": "용기",
          "reading": "yong-gi",
          "meaning": "勇气"
        },
        {
          "word": "첫걸음",
          "reading": "cheot-geo-reum",
          "meaning": "第一步"
        },
        {
          "word": "중급반",
          "reading": "jung-geup-ban",
          "meaning": "中级班"
        },
        {
          "word": "진급",
          "reading": "jin-geup",
          "meaning": "升级、晋级"
        },
        {
          "word": "옛말",
          "reading": "yen-mal",
          "meaning": "古话、老话"
        },
        {
          "word": "하나",
          "reading": "ha-na",
          "meaning": "一个"
        },
        {
          "word": "시작",
          "reading": "si-jak",
          "meaning": "开始"
        },
        {
          "word": "반",
          "reading": "ban",
          "meaning": "一半"
        },
        {
          "word": "초급",
          "reading": "cho-geup",
          "meaning": "初级"
        },
        {
          "word": "또",
          "reading": "tto",
          "meaning": "又、再"
        }
      ],
      "quiz": [
        {
          "question": "\"시작이 반이다\"의 뜻은?",
          "options": [
            "시작하면 이미 절반은 이룬 것이다",
            "반만 하면 된다",
            "시작은 어렵다",
            "반드시 실패한다"
          ],
          "answerIndex": 0,
          "explanation": "这句俗语意思是：只要开始了，就已经完成了一半，鼓励人勇敢起步。"
        }
      ],
      "comments": [
        {
          "animalId": "tori",
          "ko": "곰돌이 님, 항상 고마워요 🌸",
          "zh": "熊仔前辈，一直谢谢您",
          "audioUrl": "/audio/blog/comments/w4-gomdori-farewell-c0.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "중급반에서도 잘할 거예요 ☕",
          "zh": "中级班也会做得很好的",
          "audioUrl": "/audio/blog/comments/w4-gomdori-farewell-c1.mp3"
        },
        {
          "animalId": "haru",
          "ko": "또 다른 시작, 응원해요 🌰",
          "zh": "另一个开始，加油",
          "audioUrl": "/audio/blog/comments/w4-gomdori-farewell-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "yowoo",
        "haru",
        "minji",
        "nabi",
        "koal",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-gomdori-farewell.mp3",
    "audioDuration": 15,
    "coverEmoji": "📖",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gomdori",
    "likeCount": 16,
    "publishedAt": 1784667654311,
    "isFeatured": false,
    "unlockDay": 30,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-15",
    "slug": "w4-news-graduation",
    "titleKo": "동물시 어학당 초급 시험 결과 소식",
    "titleZh": "动物城语学堂初级考试结果消息",
    "excerptKo": "오늘 초급반 월말 시험이 있었어요. 토리가 합격해서 중급반으로 올라가요!",
    "level": "초급",
    "category": "소식",
    "content": {
      "sentences": [
        {
          "ko": "오늘 동물시 어학당 초급 시험이 있었어요. 📡",
          "zh": "今天动物城语学堂举行了初级考试。",
          "t": [
            0,
            2.79
          ]
        },
        {
          "ko": "새 친구 토리가 합격했어요!",
          "zh": "新朋友兔莉合格了！",
          "t": [
            3.19,
            5.17
          ]
        },
        {
          "ko": "이제 중급반으로 올라가요. 모두 축하해 주세요! 🎓",
          "zh": "现在要升中级班了。请大家一起祝贺！",
          "t": [
            5.57,
            9.55
          ]
        }
      ],
      "vocab": [
        {
          "word": "어학당",
          "reading": "eo-hak-dang",
          "meaning": "语学堂、语言学校"
        },
        {
          "word": "합격",
          "reading": "hap-gyeok",
          "meaning": "合格、通过"
        },
        {
          "word": "축하",
          "reading": "chu-ka",
          "meaning": "祝贺、恭喜"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "초급",
          "reading": "cho-geup",
          "meaning": "初级"
        },
        {
          "word": "시험",
          "reading": "si-heom",
          "meaning": "考试"
        },
        {
          "word": "새",
          "reading": "sae",
          "meaning": "新的"
        },
        {
          "word": "친구",
          "reading": "chin-gu",
          "meaning": "朋友"
        },
        {
          "word": "이제",
          "reading": "i-je",
          "meaning": "现在"
        },
        {
          "word": "중급반",
          "reading": "jung-geup-ban",
          "meaning": "中级班"
        },
        {
          "word": "올라가요",
          "reading": "ol-la-ga-yo",
          "meaning": "升上去、上去"
        },
        {
          "word": "모두",
          "reading": "mo-du",
          "meaning": "大家、全部"
        }
      ],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "뉴스에 나왔어요! 신기해요 🌸",
          "zh": "上新闻了！好神奇",
          "audioUrl": "/audio/blog/comments/w4-news-graduation-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "토리 유명인이네요 🌰",
          "zh": "兔莉成名人了呢",
          "audioUrl": "/audio/blog/comments/w4-news-graduation-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "우리 토리 자랑스럽다! 🎤",
          "zh": "我们兔莉真让人骄傲！",
          "audioUrl": "/audio/blog/comments/w4-news-graduation-c2.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "haru",
        "junho",
        "minji",
        "choco",
        "koal",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/w4-news-graduation.mp3",
    "audioDuration": 10,
    "coverEmoji": "🎓",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "news",
    "likeCount": 12,
    "publishedAt": 1784667655311,
    "isFeatured": false,
    "unlockDay": 30,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-w4-14",
    "slug": "w4-tori-graduation",
    "titleKo": "초급 시험 합격! 중급반으로 올라가요 🎓",
    "titleZh": "初级考试合格！要升中级班了",
    "excerptKo": "월말 시험에 \"짐/집\" 문제가 나왔어요! 합격해서 중급반으로 올라가요.",
    "level": "초급",
    "category": "서울 일기",
    "content": {
      "sentences": [
        {
          "ko": "오늘 초급 월말 시험을 봤어요. ✏️",
          "zh": "今天考了初级月末考试。",
          "t": [
            0,
            2.55
          ]
        },
        {
          "ko": "시험에 \"짐\"하고 \"집\" 문제가 나왔어요! 😂",
          "zh": "考卷上出现了“짐(行李)”和“집(家)”的题！",
          "t": [
            2.95,
            7.78
          ]
        },
        {
          "ko": "삼 일 차 공항이 생각나서 혼자 웃었어요.",
          "zh": "想起第三天在机场的事，一个人笑了。",
          "t": [
            8.18,
            12.4
          ]
        },
        {
          "ko": "합격했어요! 이제 중급반으로 올라가요. 🎓",
          "zh": "合格了！现在要升中级班了。",
          "t": [
            12.8,
            17.49
          ]
        },
        {
          "ko": "민지, 하루, 준호… 모두 고마워요! 🌸",
          "zh": "敏智、哈鲁、俊浩……大家都谢谢你们！",
          "t": [
            17.89,
            22.43
          ]
        }
      ],
      "vocab": [
        {
          "word": "시험",
          "reading": "si-heom",
          "meaning": "考试"
        },
        {
          "word": "합격",
          "reading": "hap-gyeok",
          "meaning": "合格、通过"
        },
        {
          "word": "중급",
          "reading": "jung-geup",
          "meaning": "中级"
        },
        {
          "word": "오늘",
          "reading": "o-neul",
          "meaning": "今天"
        },
        {
          "word": "초급",
          "reading": "cho-geup",
          "meaning": "初级"
        },
        {
          "word": "짐",
          "reading": "jim",
          "meaning": "行李"
        },
        {
          "word": "집",
          "reading": "jip",
          "meaning": "家"
        },
        {
          "word": "문제",
          "reading": "mun-je",
          "meaning": "题目、问题"
        },
        {
          "word": "공항",
          "reading": "gong-hang",
          "meaning": "机场"
        },
        {
          "word": "웃었어요",
          "reading": "u-seo-sseo-yo",
          "meaning": "笑了"
        },
        {
          "word": "올라가요",
          "reading": "ol-la-ga-yo",
          "meaning": "升上去、上去"
        },
        {
          "word": "모두",
          "reading": "mo-du",
          "meaning": "大家、全部"
        }
      ],
      "quiz": [
        {
          "question": "토리는 시험에 합격해서 어떻게 됐어요?",
          "options": [
            "중급반으로 올라가요",
            "집에 돌아가요",
            "초급반을 다시 해요",
            "학교를 떠나요"
          ],
          "answerIndex": 0,
          "explanation": "兔莉通过初级月考（합격），升入中级班（중급반으로 올라가요）——不是离开，是继续学下去。"
        }
      ],
      "comments": [
        {
          "animalId": "minji",
          "ko": "토리, 축하해요! 중급반에서도 화이팅 💧",
          "zh": "兔莉，恭喜！中级班也加油",
          "audioUrl": "/audio/blog/comments/w4-tori-graduation-c0.mp3"
        },
        {
          "animalId": "haru",
          "ko": "\"집이 무거워요\" 그때가 생각나요 ㅋㅋ 🌰",
          "zh": "想起“我的家太重了”那时候，哈哈",
          "audioUrl": "/audio/blog/comments/w4-tori-graduation-c1.mp3"
        },
        {
          "animalId": "junho",
          "ko": "중급반 가도 같이 놀자!! 🎤",
          "zh": "升中级班也一起玩！！",
          "audioUrl": "/audio/blog/comments/w4-tori-graduation-c2.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "새로운 시작을 응원해요 ☕",
          "zh": "为你的新开始加油",
          "audioUrl": "/audio/blog/comments/w4-tori-graduation-c3.mp3"
        }
      ],
      "likedBy": [
        "minji",
        "haru",
        "junho",
        "yowoo",
        "gomdori",
        "nabi",
        "choco",
        "koal",
        "darami",
        "news"
      ],
      "images": [
        {
          "url": "/images/blog/w4-tori-graduation-1-1784806665008.jpg",
          "w": 1152,
          "h": 1440
        }
      ]
    },
    "audioUrl": "/audio/blog/w4-tori-graduation.mp3",
    "audioDuration": 22,
    "coverEmoji": "🎓",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "tori",
    "likeCount": 35,
    "publishedAt": 1784667656311,
    "isFeatured": true,
    "unlockDay": 30,
    "authorKind": "npc",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-12",
    "slug": "p2-gapyeong-first-snow-wish",
    "titleKo": "아 그냥 갑자기 행복하네",
    "titleZh": "啊突然就觉得很幸福",
    "excerptKo": "오늘 단골손님이 \"여기 오면 마음이 편해요\" 하고 가셨는데… 아 그냥 갑자기 행복하네",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 단골손님이 \"여기 오면 마음이 편해요\" 하고 가셨는데…",
          "zh": "今天常客说\"来这儿心里就踏实\"然后走了…",
          "t": [
            0,
            5.45
          ]
        },
        {
          "ko": "아 그냥 갑자기 행복하네",
          "zh": "啊突然就觉得好幸福",
          "t": [
            5.85,
            8.63
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "이런 말 들으면 진짜 힘 나죠 🌸",
          "zh": "听到这种话真的超有动力",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-first-snow-wish-c0.mp3"
        },
        {
          "animalId": "gomdori",
          "ko": "고슴이 카페 꼭 가볼게요",
          "zh": "刺猬的咖啡馆我一定去看看",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-first-snow-wish-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "gomdori",
        "minji",
        "haru",
        "nabi",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-first-snow-wish.mp3",
    "audioDuration": 9,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "gapyeong",
    "likeCount": 61,
    "publishedAt": 1784196000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-11",
    "slug": "p2-gapyeong-payday",
    "titleKo": "월세 내니까 통장 텅",
    "titleZh": "交完房租钱包空了",
    "excerptKo": "가게 월세 내고 나니까 통장이 텅텅… 근데 왜 치킨은 시키고 있지 나 ㅋㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "가게 월세 내고 나니까 통장이 텅텅…",
          "zh": "交完店租钱包空空的…",
          "t": [
            0,
            3.74
          ]
        },
        {
          "ko": "근데 왜 치킨은 시키고 있지 나 ㅋㅋㅋㅋ",
          "zh": "可我为啥还在点炸鸡啊哈哈哈哈",
          "t": [
            4.14,
            6.55
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "치킨은 별개죠 그건 진리 ㅋㅋ",
          "zh": "炸鸡是另一回事 那是真理哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-payday-c0.mp3"
        },
        {
          "animalId": "rider",
          "ko": "방금 그 치킨 제가 배달했나요 ㅋㅋㅋ",
          "zh": "刚那份炸鸡是我送的吗哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-payday-c1.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "rider",
        "coder",
        "busan",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-payday.mp3",
    "audioDuration": 7,
    "coverEmoji": "💸",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gapyeong",
    "likeCount": 46,
    "publishedAt": 1784286000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-06",
    "slug": "p2-coder-it-works",
    "titleKo": "갑자기 됨 왜 되는지 모름",
    "titleZh": "突然又好了 不知道为啥",
    "excerptKo": "아까 그 에러 갑자기 해결됨. 근데 왜 되는지 모르겠어서 더 무서움 ㅋㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아까 그 에러 갑자기 해결됨.",
          "zh": "刚才那个报错突然就好了。",
          "t": [
            0,
            3.03
          ]
        },
        {
          "ko": "근데 왜 되는지 모르겠어서 더 무서움 ㅋㅋㅋㅋ",
          "zh": "但不知道为啥好的反而更怕了哈哈哈哈",
          "t": [
            3.43,
            6.89
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "founder",
          "ko": "되면 건드리지 마세요 ㅋㅋㅋ",
          "zh": "能跑就别动它哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-coder-it-works-c0.mp3"
        }
      ],
      "likedBy": [
        "founder",
        "nightowl",
        "coder",
        "gapyeong",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-it-works.mp3",
    "audioDuration": 7,
    "coverEmoji": "🎉",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "coder",
    "likeCount": 51,
    "publishedAt": 1784296800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-06",
    "slug": "p2-nightowl-fix-sleep",
    "titleKo": "내일부터 일찍 잘 거임 (365일째)",
    "titleZh": "明天开始早睡（第365天）",
    "excerptKo": "내일부터 진짜 열두 시 전에 잘 거임. 이 말 몇 번째 하는지 나도 모름 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "내일부터 진짜 열두 시 전에 잘 거임.",
          "zh": "明天开始真的要在十二点前睡。",
          "t": [
            0,
            3.88
          ]
        },
        {
          "ko": "이 말 몇 번째 하는지 나도 모름 ㅋㅋㅋ",
          "zh": "这话我说过多少遍自己都不知道了哈哈哈",
          "t": [
            4.28,
            7.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "저도 매일 하는 다짐이에요 ㅋㅋ",
          "zh": "我也是每天都在下这个决心哈哈",
          "audioUrl": "/audio/blog/comments/p2-nightowl-fix-sleep-c0.mp3"
        },
        {
          "animalId": "coder",
          "ko": "우리 다 같은 거짓말쟁이…",
          "zh": "咱们都是一样的骗子…",
          "audioUrl": "/audio/blog/comments/p2-nightowl-fix-sleep-c1.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "coder",
        "student",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-fix-sleep.mp3",
    "audioDuration": 7,
    "coverEmoji": "😪",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "nightowl",
    "likeCount": 53,
    "publishedAt": 1784304000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-06",
    "slug": "p2-cook1-midnight",
    "titleKo": "야식의 유혹",
    "titleZh": "夜宵的诱惑",
    "excerptKo": "새벽 두 시에 라면 먹을지 말지 10분째 고민 중. 먹으면 내일 얼굴 붓는 거 아는데… 불 켰다 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽 두 시에 라면 먹을지 말지 10분째 고민 중.",
          "zh": "凌晨两点纠结要不要吃泡面已经想了十分钟。",
          "t": [
            0,
            4.88
          ]
        },
        {
          "ko": "먹으면 내일 얼굴 붓는 거 아는데… 불 켰다 ㅋㅋㅋ",
          "zh": "知道吃了明天脸会肿…但还是开了火哈哈哈",
          "t": [
            5.28,
            9.01
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "이미 불 켰으면 먹는 게 답이에요 ㅋㅋ",
          "zh": "都开了火就该吃了 这是唯一答案哈哈",
          "audioUrl": "/audio/blog/comments/p2-cook1-midnight-c0.mp3"
        },
        {
          "animalId": "student",
          "ko": "라면 먹고 자면 다음 날 얼굴 지옥ㅋㅋ",
          "zh": "吃了泡面睡第二天脸就是地狱哈哈",
          "audioUrl": "/audio/blog/comments/p2-cook1-midnight-c1.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "student",
        "coder",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-midnight.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "cook1",
    "likeCount": 55,
    "publishedAt": 1784307600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-06",
    "slug": "p2-granny-lonely",
    "titleKo": "혼자라도 괜찮아",
    "titleZh": "一个人也没关系",
    "excerptKo": "남편 먼저 보내고 십 년 됐네. 처음엔 외로웠는데 이젠 시장 친구도 있고 동네도 정들었어 ~ 혼자도 재미나게 살아야지",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "남편 먼저 보내고 십 년 됐네.",
          "zh": "老伴先走都十年了。",
          "t": [
            0,
            2.98
          ]
        },
        {
          "ko": "처음엔 외로웠는데 이젠 시장 친구도 있고 동네도 정들었어 ~",
          "zh": "一开始很孤单但现在市场有朋友、邻里也熟了～",
          "t": [
            3.38,
            8.49
          ]
        },
        {
          "ko": "혼자도 재미나게 살아야지",
          "zh": "一个人也得过得精彩嘛",
          "t": [
            8.89,
            10.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "멋져요 할머니 같이 등산 가요!",
          "zh": "太酷了奶奶 一起去爬山吧！",
          "audioUrl": "/audio/blog/comments/p2-granny-lonely-c0.mp3"
        },
        {
          "animalId": "florist",
          "ko": "할머니 가게에 꽃 자주 드릴게요 🌷",
          "zh": "奶奶我常给您店里送花",
          "audioUrl": "/audio/blog/comments/p2-granny-lonely-c1.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "florist",
        "jeju",
        "gapyeong",
        "newmom"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-lonely.mp3",
    "audioDuration": 11,
    "coverEmoji": "💛",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "granny",
    "likeCount": 72,
    "publishedAt": 1784329200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-06",
    "slug": "p2-runner-shoes",
    "titleKo": "러닝화 새로 샀다",
    "titleZh": "买了新跑鞋",
    "excerptKo": "새 러닝화 사서 신고 나왔는데 발이 너무 편해서 산 보람 있음 ㅋㅋ 이제 이걸로 개인 기록 갱신 가보자고",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새 러닝화 사서 신고 나왔는데 발이 너무 편해서 산 보람 있음 ㅋㅋ",
          "zh": "新跑鞋穿上出来脚太舒服了，买得太值了哈哈",
          "t": [
            0,
            6.35
          ]
        },
        {
          "ko": "이제 이걸로 개인 기록 갱신 가보자고",
          "zh": "现在穿这个去刷新个人记录了走着瞧",
          "t": [
            6.75,
            9.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "달리기 안 하는 저도 신발은 예쁘네요",
          "zh": "不跑步的我也觉得鞋子好看",
          "audioUrl": "/audio/blog/comments/p2-runner-shoes-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "busan",
        "runner"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-shoes.mp3",
    "audioDuration": 10,
    "coverEmoji": "👟",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "runner",
    "likeCount": 35,
    "publishedAt": 1784329200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-06",
    "slug": "p2-retiree-live-now",
    "titleKo": "은퇴 후 깨달은 것 하나",
    "titleZh": "退休后领悟的一件事",
    "excerptKo": "회사 다닐 땐 몰랐는데 인생에 정답은 없음. 그냥 오늘 하루 재미있게 살면 됨 ㅎㅎ 젊은 사람들 너무 불안해하지 마요",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "회사 다닐 땐 몰랐는데 인생에 정답은 없음.",
          "zh": "上班时不知道但现在领悟到人生没有标准答案。",
          "t": [
            0,
            3.83
          ]
        },
        {
          "ko": "그냥 오늘 하루 재미있게 살면 됨 ㅎㅎ",
          "zh": "就把今天一天过得有趣就好了呀呵呵",
          "t": [
            4.23,
            6.97
          ]
        },
        {
          "ko": "젊은 사람들 너무 불안해하지 마요",
          "zh": "年轻人别太焦虑了哦",
          "t": [
            7.37,
            10.59
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "이 말 오늘 꼭 필요했어요 감사합니다",
          "zh": "这话今天真的很需要 谢谢您",
          "audioUrl": "/audio/blog/comments/p2-retiree-live-now-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "인생 선배의 조언 감사히 듣겠습니다",
          "zh": "人生前辈的建议 会好好听的",
          "audioUrl": "/audio/blog/comments/p2-retiree-live-now-c1.mp3"
        }
      ],
      "likedBy": [
        "student",
        "gapyeong",
        "founder",
        "salaryman",
        "slow",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-live-now.mp3",
    "audioDuration": 11,
    "coverEmoji": "✨",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 77,
    "publishedAt": 1784332800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-06",
    "slug": "p2-firefighter-cat",
    "titleKo": "나무에 올라간 고양이",
    "titleZh": "上了树的猫",
    "excerptKo": "\"고양이 구조해 달라\" 신고 받고 출동함. 막상 도착하니 고양이는 알아서 내려옴 ㅋㅋ 그래도 신고해 주셔서 감사",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "\"고양이 구조해 달라\" 신고 받고 출동함.",
          "zh": "接到\"救救猫\"的报警出动了。",
          "t": [
            0,
            4.12
          ]
        },
        {
          "ko": "막상 도착하니 고양이는 알아서 내려옴 ㅋㅋ 그래도 신고해 주셔서 감사",
          "zh": "结果到了猫自己下来了哈哈 不过还是感谢报警",
          "t": [
            4.52,
            10.72
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "고양이 입장에서 그랬을 수도 있어요 ㅋㅋ",
          "zh": "从猫的角度可能就那么想的哈哈",
          "audioUrl": "/audio/blog/comments/p2-firefighter-cat-c0.mp3"
        }
      ],
      "likedBy": [
        "nabi",
        "granny",
        "newmom",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-cat.mp3",
    "audioDuration": 11,
    "coverEmoji": "🐱",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "firefighter",
    "likeCount": 62,
    "publishedAt": 1784336400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-06",
    "slug": "p2-newmom-metime",
    "titleKo": "엄마 말고 \"나\"로 산 2시간",
    "titleZh": "不是妈妈做回自己的2小时",
    "excerptKo": "시어머니가 아기 봐주셔서 카페에서 혼자 시간 보냄. 그냥 앉아서 커피 마시고 책 읽음. 한 달 만의 사치 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "시어머니가 아기 봐주셔서 카페에서 혼자 시간 보냄.",
          "zh": "婆婆帮看孩子去咖啡馆享受了一段独处时间。",
          "t": [
            0,
            4.21
          ]
        },
        {
          "ko": "그냥 앉아서 커피 마시고 책 읽음. 한 달 만의 사치 ㅠㅠ",
          "zh": "就那么坐着喝咖啡看书。一个月以来的奢侈呜呜",
          "t": [
            4.61,
            10.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "엄마도 사람이야 쉬어야 해",
          "zh": "妈妈也是人啊 得休息的",
          "audioUrl": "/audio/blog/comments/p2-newmom-metime-c0.mp3"
        },
        {
          "animalId": "nurse",
          "ko": "꼭 챙기세요 엄마 건강이 가족 건강이에요",
          "zh": "一定要顾好自己 妈妈的安康就是全家的安康",
          "audioUrl": "/audio/blog/comments/p2-newmom-metime-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "nurse",
        "jeju",
        "retiree",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-metime.mp3",
    "audioDuration": 10,
    "coverEmoji": "📖",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "newmom",
    "likeCount": 85,
    "publishedAt": 1784336400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-06",
    "slug": "p2-rider-cold-noodle",
    "titleKo": "여름 배달의 적",
    "titleZh": "夏天外卖的敌人",
    "excerptKo": "냉면 배달이 제일 스트레스임. 가는 동안 불면 안 되고 육수 안 쏟아야 하고… 근데 도착해서 식당처럼 먹는 손님 보면 뿌듯 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "냉면 배달이 제일 스트레스임.",
          "zh": "冷面外卖压力最大。",
          "t": [
            0,
            2.55
          ]
        },
        {
          "ko": "가는 동안 불면 안 되고 육수 안 쏟아야 하고…",
          "zh": "路上面不能坨汤不能洒…",
          "t": [
            2.95,
            6.65
          ]
        },
        {
          "ko": "근데 도착해서 식당처럼 먹는 손님 보면 뿌듯 ㅋㅋ",
          "zh": "但看到客人跟下馆子一样吃着的时候就很有成就感哈哈",
          "t": [
            7.05,
            12.21
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "냉면 배달의 달인이시네요 존경",
          "zh": "冷面外卖的大师啊 佩服",
          "audioUrl": "/audio/blog/comments/p2-rider-cold-noodle-c0.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "taxi",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-cold-noodle.mp3",
    "audioDuration": 12,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "rider",
    "likeCount": 42,
    "publishedAt": 1784343600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-10",
    "slug": "p2-gapyeong-playlist",
    "titleKo": "가게 노래 추천 좀요",
    "titleZh": "求推荐店里放的歌",
    "excerptKo": "맨날 틀던 플레이리스트 질렸어요 ㅠㅠ 카페에 틀기 좋은 노래 추천 좀 해주세요 얘들아",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "맨날 틀던 플레이리스트 질렸어요 ㅠㅠ",
          "zh": "天天放的歌单听腻了呜呜",
          "t": [
            0,
            2.84
          ]
        },
        {
          "ko": "카페에 틀기 좋은 노래 추천 좀 해주세요 얘들아",
          "zh": "宝子们求推荐适合咖啡馆放的歌",
          "t": [
            3.24,
            7.69
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "junho",
          "ko": "제가 플리 만들어서 보내드릴게요 🎤",
          "zh": "我做个歌单发你",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-playlist-c0.mp3"
        },
        {
          "animalId": "yowoo",
          "ko": "재즈 어때요? 카페엔 재즈죠 ☕",
          "zh": "爵士怎么样？咖啡馆就得爵士",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-playlist-c1.mp3"
        }
      ],
      "likedBy": [
        "junho",
        "yowoo",
        "nabi",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-playlist.mp3",
    "audioDuration": 8,
    "coverEmoji": "🎧",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "gapyeong",
    "likeCount": 29,
    "publishedAt": 1784354400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-06",
    "slug": "p2-carpenter-custom",
    "titleKo": "의뢰 받은 피아노 의자",
    "titleZh": "定制的钢琴凳子",
    "excerptKo": "손님 맞춤 높이로 피아노 의자 만듦. 피아노 치다가 허리 안 좋으셨다고 함. 써보시고 \"딱 맞다\"는 말 들음. 이게 진짜 보람 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "손님 맞춤 높이로 피아노 의자 만듦.",
          "zh": "按客人身高做了定制钢琴凳。",
          "t": [
            0,
            3.6
          ]
        },
        {
          "ko": "피아노 치다가 허리 안 좋으셨다고 함.",
          "zh": "说弹琴弹得腰不好了。",
          "t": [
            4,
            7.08
          ]
        },
        {
          "ko": "써보시고 \"딱 맞다\"는 말 들음. 이게 진짜 보람 ㅠㅠ",
          "zh": "用上了说\"正合适\"。这才是真正的意义呜呜",
          "t": [
            7.48,
            12.69
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "장인이네요 손으로 만드는 가치",
          "zh": "真是匠人啊 手工制作的价值",
          "audioUrl": "/audio/blog/comments/p2-carpenter-custom-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "granny",
        "newmom",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-custom.mp3",
    "audioDuration": 13,
    "coverEmoji": "🎹",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "carpenter",
    "likeCount": 58,
    "publishedAt": 1784358000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-06",
    "slug": "p2-salaryman-friday",
    "titleKo": "금요일 오후 네 시",
    "titleZh": "周五下午四点",
    "excerptKo": "금요일 오후 네 시부터는 뭘 해도 집중 안 됨. 뇌는 이미 주말 모드임. 동의하면 좋아요 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "금요일 오후 네 시부터는 뭘 해도 집중 안 됨.",
          "zh": "周五下午四点开始干什么都集中不了。",
          "t": [
            0,
            3.83
          ]
        },
        {
          "ko": "뇌는 이미 주말 모드임. 동의하면 좋아요 ㅋㅋ",
          "zh": "脑子已经是周末模式了。同意的点赞哈哈",
          "t": [
            4.23,
            8.16
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "월요일 아침까지 집중 안 됩니다",
          "zh": "我直到周一早上都集中不了",
          "audioUrl": "/audio/blog/comments/p2-salaryman-friday-c0.mp3"
        },
        {
          "animalId": "student",
          "ko": "저는 목요일부터 그랬어요 ㅋㅋ",
          "zh": "我从周四就这样了哈哈",
          "audioUrl": "/audio/blog/comments/p2-salaryman-friday-c1.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "student",
        "rider",
        "nurse",
        "nightowl"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-friday.mp3",
    "audioDuration": 8,
    "coverEmoji": "🎉",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "salaryman",
    "likeCount": 77,
    "publishedAt": 1784358000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-06",
    "slug": "p2-daegu-recommend",
    "titleKo": "맛집 추천 좀 진지하게",
    "titleZh": "认真求推荐好吃的",
    "excerptKo": "서울 온 지 얼마 안 돼서 맛집을 모름. 진짜 맛있는 데만 추천해 줘요 얘들아 실패 싫어 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "서울 온 지 얼마 안 돼서 맛집을 모름.",
          "zh": "来首尔没多久还不认识什么好馆子。",
          "t": [
            0,
            2.69
          ]
        },
        {
          "ko": "진짜 맛있는 데만 추천해 줘요 얘들아 실패 싫어 ㅠㅠ",
          "zh": "宝子们只推真好吃的啊 我怕踩雷呜呜",
          "t": [
            3.09,
            7.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "제가 배달 다니면서 찾은 곳들 알려드릴게요!",
          "zh": "我送外卖时发现的店告诉你！",
          "audioUrl": "/audio/blog/comments/p2-daegu-recommend-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "가평 쪽 오면 제가 안내할게요 ㅋㅋ",
          "zh": "来加平这边我给你带路哈哈",
          "audioUrl": "/audio/blog/comments/p2-daegu-recommend-c1.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "gapyeong",
        "busan",
        "salaryman",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-recommend.mp3",
    "audioDuration": 8,
    "coverEmoji": "📍",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "daegu",
    "likeCount": 39,
    "publishedAt": 1784361600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-06",
    "slug": "p2-seolgi-comment",
    "titleKo": "내 그림에 댓글 하나 달렸다",
    "titleZh": "我的画收到一条评论",
    "excerptKo": "올린 그림에 \"덕분에 오늘 위로받았어요\" 댓글 달렸는데… 아 나 이 맛에 그림 그림 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "올린 그림에 \"덕분에 오늘 위로받았어요\" 댓글 달렸는데…",
          "zh": "发的画下面有人评论\"多亏了它今天被治愈了\"…",
          "t": [
            0,
            5.21
          ]
        },
        {
          "ko": "아 나 이 맛에 그림 그림 ㅠㅠ",
          "zh": "啊我就是为了这个才画画的呜呜",
          "t": [
            5.61,
            9.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "그림 진짜 따뜻해요 계속 그려주세요 🌸",
          "zh": "画真的很温暖 请一直画下去",
          "audioUrl": "/audio/blog/comments/p2-seolgi-comment-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "이런 댓글 받으면 하루 종일 행복하죠",
          "zh": "收到这种评论能开心一整天",
          "audioUrl": "/audio/blog/comments/p2-seolgi-comment-c1.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "gapyeong",
        "actor",
        "florist",
        "nabi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-comment.mp3",
    "audioDuration": 9,
    "coverEmoji": "💌",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "seolgi",
    "likeCount": 68,
    "publishedAt": 1784365200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-06",
    "slug": "p2-jeju-come-visit",
    "titleKo": "제주 놀러 와요 진짜",
    "titleZh": "真的来济州玩吧",
    "excerptKo": "여름 휴가 어디 갈지 고민이면 그냥 제주 와요. 바다도 산도 다 있음. 내가 맛집 알려줄게 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "여름 휴가 어디 갈지 고민이면 그냥 제주 와요.",
          "zh": "暑假纠结去哪玩的话就来济州吧。",
          "t": [
            0,
            4.03
          ]
        },
        {
          "ko": "바다도 산도 다 있음. 내가 맛집 알려줄게 ㅋㅋ",
          "zh": "有海也有山。好吃的我来告诉你哈哈",
          "t": [
            4.43,
            8.5
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "busan",
          "ko": "이번 여름에 진짜 갈게요!",
          "zh": "这个夏天真的去！",
          "audioUrl": "/audio/blog/comments/p2-jeju-come-visit-c0.mp3"
        },
        {
          "animalId": "seolgi",
          "ko": "스케치북 들고 갈래요 🎨",
          "zh": "我要带着速写本去",
          "audioUrl": "/audio/blog/comments/p2-jeju-come-visit-c1.mp3"
        }
      ],
      "likedBy": [
        "busan",
        "seolgi",
        "daegu",
        "runner",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-come-visit.mp3",
    "audioDuration": 9,
    "coverEmoji": "🏝️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "jeju",
    "likeCount": 50,
    "publishedAt": 1784368800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-06",
    "slug": "p2-baker-leftover",
    "titleKo": "남은 빵 나눔합니다",
    "titleZh": "剩的面包送人",
    "excerptKo": "오늘 팔고 남은 빵 동네 노인정에 갖다 드림. 안 팔려서 버리기 아까웠는데 너무 좋아하셔서 나도 기분 좋음 🥖",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 팔고 남은 빵 동네 노인정에 갖다 드림.",
          "zh": "今天卖剩的面包拿去社区老人中心了。",
          "t": [
            0,
            3.88
          ]
        },
        {
          "ko": "안 팔려서 버리기 아까웠는데 너무 좋아하셔서 나도 기분 좋음 🥖",
          "zh": "没卖完丢了可惜他们那么开心我也高兴",
          "t": [
            4.28,
            9.68
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "마음도 반죽같이 부드럽구나",
          "zh": "心也像面团一样柔软啊",
          "audioUrl": "/audio/blog/comments/p2-baker-leftover-c0.mp3"
        },
        {
          "animalId": "retiree",
          "ko": "이런 분이 계셔서 동네가 따뜻해져요",
          "zh": "因为有这样的人小区才温暖起来",
          "audioUrl": "/audio/blog/comments/p2-baker-leftover-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "retiree",
        "jeju",
        "gapyeong",
        "firefighter"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-leftover.mp3",
    "audioDuration": 10,
    "coverEmoji": "🥖",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "baker",
    "likeCount": 74,
    "publishedAt": 1784372400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-06",
    "slug": "p2-slow-compare",
    "titleKo": "남이랑 비교 안 하기로 함",
    "titleZh": "决定不跟别人比了",
    "excerptKo": "남들 다 앞서가는 것 같아도 내 속도가 있는 거니까. 오늘부터 비교 그만 ㅋㅋ 마음 편함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "남들 다 앞서가는 것 같아도 내 속도가 있는 거니까.",
          "zh": "就算大家好像都跑在前面，我也有我自己的节奏。",
          "t": [
            0,
            4.45
          ]
        },
        {
          "ko": "오늘부터 비교 그만 ㅋㅋ 마음 편함",
          "zh": "从今天起不比了哈哈 心里舒坦",
          "t": [
            4.85,
            7.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "이 말 오늘 필요했어요 감사요 ㅠㅠ",
          "zh": "今天正需要这句话 谢谢呜呜",
          "audioUrl": "/audio/blog/comments/p2-slow-compare-c0.mp3"
        },
        {
          "animalId": "newmom",
          "ko": "각자 속도 인정 🌱",
          "zh": "各有各的节奏 认同",
          "audioUrl": "/audio/blog/comments/p2-slow-compare-c1.mp3"
        }
      ],
      "likedBy": [
        "student",
        "newmom",
        "gapyeong",
        "granny",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-compare.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌱",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "slow",
    "likeCount": 66,
    "publishedAt": 1784372400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-06",
    "slug": "p2-busan-homesick",
    "titleKo": "갑자기 엄마 보고 싶다",
    "titleZh": "突然好想妈妈",
    "excerptKo": "혼자 밥 먹다가 갑자기 엄마 생각남. 부산 내려가고 싶다 그냥… ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "혼자 밥 먹다가 갑자기 엄마 생각남.",
          "zh": "一个人吃饭突然想起妈妈。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "부산 내려가고 싶다 그냥… ㅠㅠ",
          "zh": "就是好想回釜山啊…呜呜",
          "t": [
            3.62,
            6.22
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "전화 한 통 드려 ~ 좋아하실 거야",
          "zh": "打个电话吧～她会很开心的",
          "audioUrl": "/audio/blog/comments/p2-busan-homesick-c0.mp3"
        },
        {
          "animalId": "newmom",
          "ko": "엄마 생각나는 날 있죠 ㅠㅠ",
          "zh": "总有想妈妈的日子呢呜呜",
          "audioUrl": "/audio/blog/comments/p2-busan-homesick-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "newmom",
        "gapyeong",
        "nabi",
        "haru"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-homesick.mp3",
    "audioDuration": 6,
    "coverEmoji": "🥲",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "busan",
    "likeCount": 52,
    "publishedAt": 1784376000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-06",
    "slug": "p2-florist-unsold",
    "titleKo": "안 팔린 꽃은 내가 산다",
    "titleZh": "没卖出去的花我买",
    "excerptKo": "오늘 안 팔린 장미 한 묶음 내가 사서 집에 데려감. 안 팔려도 누군가는 예뻐해 줘야지 🌹 꽃도 외로움 타나 봄",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 안 팔린 장미 한 묶음 내가 사서 집에 데려감.",
          "zh": "今天没卖掉的玫瑰我买了一束带回家。",
          "t": [
            0,
            4.45
          ]
        },
        {
          "ko": "안 팔려도 누군가는 예뻐해 줘야지 🌹",
          "zh": "卖不掉也该有人好好疼它呀",
          "t": [
            4.85,
            7.97
          ]
        },
        {
          "ko": "꽃도 외로움 타나 봄",
          "zh": "花开着是不是也会寂寞",
          "t": [
            8.37,
            10.36
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "마음이 참 곱구나 눈송이 ~",
          "zh": "心地真好啊雪花～",
          "audioUrl": "/audio/blog/comments/p2-florist-unsold-c0.mp3"
        },
        {
          "animalId": "newmom",
          "ko": "이 말 너무 예쁘다 저장할게요",
          "zh": "这句话太美了我收藏了",
          "audioUrl": "/audio/blog/comments/p2-florist-unsold-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "newmom",
        "seolgi",
        "retiree",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-unsold.mp3",
    "audioDuration": 10,
    "coverEmoji": "🌹",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 59,
    "publishedAt": 1784376000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-06",
    "slug": "p2-founder-doubt",
    "titleKo": "가끔 다 때려치고 싶을 때",
    "titleZh": "偶尔想全部放弃时",
    "excerptKo": "매출도 안 나오고 팀 분위기도 안 좋고… 가끔 취업할까 생각함. 그래도 아침에 일어나면 또 노트북 켜고 있음 ㅋㅋ 이게 병",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "매출도 안 나오고 팀 분위기도 안 좋고… 가끔 취업할까 생각함.",
          "zh": "销售没起色团队氛围也不好…偶尔会想去上班算了。",
          "t": [
            0,
            5.26
          ]
        },
        {
          "ko": "그래도 아침에 일어나면 또 노트북 켜고 있음 ㅋㅋ 이게 병",
          "zh": "但早上一起来又打开笔记本了哈哈 这就是病",
          "t": [
            5.66,
            10.4
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "저도 매일 아침 노트북 켜는 병 걸림 ㅋㅋ",
          "zh": "我也有每天早上开笔记本的病哈哈",
          "audioUrl": "/audio/blog/comments/p2-founder-doubt-c0.mp3"
        },
        {
          "animalId": "salaryman",
          "ko": "대표님 계속 도전하세요 응원합니다",
          "zh": "代表请继续挑战 支持你",
          "audioUrl": "/audio/blog/comments/p2-founder-doubt-c1.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "salaryman",
        "actor",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-doubt.mp3",
    "audioDuration": 10,
    "coverEmoji": "😮‍💨",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "founder",
    "likeCount": 67,
    "publishedAt": 1784376000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-06",
    "slug": "p2-actor-bow",
    "titleKo": "커튼콜의 맛",
    "titleZh": "谢幕的滋味",
    "excerptKo": "공연 끝나고 관객들 박수 받는 그 순간, 모든 고생이 사라짐. 이 오 분을 위해 버티는 것 같음. 배우하길 잘했어 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "공연 끝나고 관객들 박수 받는 그 순간, 모든 고생이 사라짐.",
          "zh": "演完收到观众掌声的那一刻所有辛苦都消失了。",
          "t": [
            0,
            5.21
          ]
        },
        {
          "ko": "이 오 분을 위해 버티는 것 같음. 배우하길 잘했어 ㅠㅠ",
          "zh": "好像就是为了这五分钟撑下来的。当演员真好呜呜",
          "t": [
            5.61,
            10.63
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "firefighter",
          "ko": "무대 위의 불꽃이시네요 멋져요",
          "zh": "真是舞台上的火花啊 帅呆了",
          "audioUrl": "/audio/blog/comments/p2-actor-bow-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "이런 얘기 너무 좋아요 계속 올려주세요",
          "zh": "太喜欢这种故事了 请继续发吧",
          "audioUrl": "/audio/blog/comments/p2-actor-bow-c1.mp3"
        }
      ],
      "likedBy": [
        "firefighter",
        "gapyeong",
        "seolgi",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-bow.mp3",
    "audioDuration": 11,
    "coverEmoji": "👏",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "actor",
    "likeCount": 66,
    "publishedAt": 1784379600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-06",
    "slug": "p2-taxi-lost-phone",
    "titleKo": "뒷자리에 두고 간 핸드폰",
    "titleZh": "后座落下的手机",
    "excerptKo": "손님이 핸드폰 두고 내려서 다시 찾으러 옴. 이런 일 한 달에 서너 번은 있음 ㅋㅋ 다들 내리기 전에 뒤 확인하세요 여러분",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "손님이 핸드폰 두고 내려서 다시 찾으러 옴.",
          "zh": "乘客落了手机下车又找回来。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "이런 일 한 달에 서너 번은 있음 ㅋㅋ 다들 내리기 전에 뒤 확인하세요 여러분",
          "zh": "这种事一个月能有三四回哈哈 各位下车前请检查后座",
          "t": [
            3.71,
            10.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "저도 두 번이나 두고 내렸어요 죄송합니다 ㅠ",
          "zh": "我也落过两次 对不起呜呜",
          "audioUrl": "/audio/blog/comments/p2-taxi-lost-phone-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "coder",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-lost-phone.mp3",
    "audioDuration": 10,
    "coverEmoji": "📱",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "taxi",
    "likeCount": 33,
    "publishedAt": 1784379600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-06",
    "slug": "p2-nurse-small-kindness",
    "titleKo": "퇴근길에 산 꽃 한 송이",
    "titleZh": "下班路上买的一朵花",
    "excerptKo": "힘든 근무 끝나고 집 가는 길에 꽃집에서 장미 한 송이 삼. 나 자신한테 주는 선물 ㅋㅋ 내일도 힘내야지 🌹",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "힘든 근무 끝나고 집 가는 길에 꽃집에서 장미 한 송이 삼.",
          "zh": "累人的班下班回家路上在花店买了一支玫瑰。",
          "t": [
            0,
            4.88
          ]
        },
        {
          "ko": "나 자신한테 주는 선물 ㅋㅋ 내일도 힘내야지 🌹",
          "zh": "送自己的一份礼物哈哈 明天也得加油",
          "t": [
            5.28,
            8.68
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "florist",
          "ko": "다음에 오시면 서비스로 한 송이 더 드릴게요 🌹",
          "zh": "下次来的话多送您一支",
          "audioUrl": "/audio/blog/comments/p2-nurse-small-kindness-c0.mp3"
        }
      ],
      "likedBy": [
        "florist",
        "newmom",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-small-kindness.mp3",
    "audioDuration": 9,
    "coverEmoji": "🌹",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "nurse",
    "likeCount": 60,
    "publishedAt": 1784383200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-06",
    "slug": "p2-student-d-day",
    "titleKo": "시험 D-30",
    "titleZh": "考试倒计时30天",
    "excerptKo": "드디어 시험 30일 남았음. 불안하고 떨리는데 이제 진짜 열심히 해야 할 때 ㅋㅋ 붙으면 여기서 치킨 기프티콘 쏠게",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "드디어 시험 30일 남았음.",
          "zh": "终于还剩30天了。",
          "t": [
            0,
            3.12
          ]
        },
        {
          "ko": "불안하고 떨리는데 이제 진짜 열심히 해야 할 때 ㅋㅋ",
          "zh": "又焦虑又发抖但现在该是真正拼的时候了哈哈",
          "t": [
            3.52,
            7.92
          ]
        },
        {
          "ko": "붙으면 여기서 치킨 기프티콘 쏠게",
          "zh": "考上了在这抽炸鸡兑换券",
          "t": [
            8.32,
            11.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "합격 기원합니다 진짜 파이팅",
          "zh": "祝你考上 真的加油",
          "audioUrl": "/audio/blog/comments/p2-student-d-day-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "치킨 기다릴게요 꼭 붙으세요 ㅋㅋ",
          "zh": "等着炸鸡呢 一定要考上啊哈哈",
          "audioUrl": "/audio/blog/comments/p2-student-d-day-c1.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "gapyeong",
        "rider",
        "nurse"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-d-day.mp3",
    "audioDuration": 12,
    "coverEmoji": "🔥",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "student",
    "likeCount": 58,
    "publishedAt": 1784383200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-08",
    "slug": "p2-gapyeong-cat-visit",
    "titleKo": "고양이 손님 또 왔다 🐱",
    "titleZh": "猫咪客人又来了",
    "excerptKo": "가게 앞에 매일 오는 고양이 오늘도 왔음. 얘가 진짜 우리 가게 마스코트인 듯 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "가게 앞에 매일 오는 고양이 오늘도 왔음.",
          "zh": "每天来店门口的那只猫今天又来了。",
          "t": [
            0,
            3.74
          ]
        },
        {
          "ko": "얘가 진짜 우리 가게 마스코트인 듯 ㅋㅋ",
          "zh": "它简直就是我们店的吉祥物哈哈",
          "t": [
            4.14,
            6.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nabi",
          "ko": "헐 사진 더 보여주세요 🐱",
          "zh": "天 快多发点照片",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-cat-visit-c0.mp3"
        },
        {
          "animalId": "choco",
          "ko": "단골 고양이 최고 ㅋㅋㅋ",
          "zh": "常客猫咪最棒了哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-cat-visit-c1.mp3"
        }
      ],
      "likedBy": [
        "nabi",
        "choco",
        "tori",
        "florist",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-cat-visit.mp3",
    "audioDuration": 7,
    "coverEmoji": "🐱",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gapyeong",
    "likeCount": 52,
    "publishedAt": 1784433600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-05",
    "slug": "p2-coder-weekend-plan",
    "titleKo": "주말엔 진짜 아무것도 안 할 거임",
    "titleZh": "这周末真的啥都不干",
    "excerptKo": "이번 주말엔 침대랑 한 몸 될 거임. 아무도 나 찾지 마세요 ㅋㅋㅋ 폰도 꺼둘 거야",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "이번 주말엔 침대랑 한 몸 될 거임.",
          "zh": "这周末我要和床合为一体。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "아무도 나 찾지 마세요 ㅋㅋㅋ 폰도 꺼둘 거야",
          "zh": "谁都别找我哈哈哈 手机也要关机",
          "t": [
            3.62,
            7.08
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "저도 데려가 주세요 침대로…",
          "zh": "也把我一起带去床上吧…",
          "audioUrl": "/audio/blog/comments/p2-coder-weekend-plan-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "주말 계획 완벽 ㅋㅋ",
          "zh": "周末计划完美哈哈",
          "audioUrl": "/audio/blog/comments/p2-coder-weekend-plan-c1.mp3"
        }
      ],
      "likedBy": [
        "student",
        "nightowl",
        "rider",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-weekend-plan.mp3",
    "audioDuration": 7,
    "coverEmoji": "🛏️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "coder",
    "likeCount": 44,
    "publishedAt": 1784458800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-05",
    "slug": "p2-nightowl-quiet",
    "titleKo": "새벽이 제일 좋은 이유",
    "titleZh": "最喜欢深夜的理由",
    "excerptKo": "다들 자니까 세상이 조용해서 좋음. 이 시간만큼은 온전히 내 시간인 느낌 🌙",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다들 자니까 세상이 조용해서 좋음.",
          "zh": "大家都睡了世界安静下来真好。",
          "t": [
            0,
            2.69
          ]
        },
        {
          "ko": "이 시간만큼은 온전히 내 시간인 느낌 🌙",
          "zh": "唯独这个时间感觉完全属于我自己",
          "t": [
            3.09,
            6.97
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "새벽 감성 인정합니다",
          "zh": "凌晨的这种感觉 我懂",
          "audioUrl": "/audio/blog/comments/p2-nightowl-quiet-c0.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "nabi",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-quiet.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌌",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nightowl",
    "likeCount": 49,
    "publishedAt": 1784480400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-05",
    "slug": "p2-baker-sourdough",
    "titleKo": "사워도우 키우는 중",
    "titleZh": "在养酸面团",
    "excerptKo": "천연 효모 키우는 중인데 이름도 지어줌 \"꼬물이\" ㅋㅋ 매일 먹이 주고 온도 체크하고… 반려 식물 키우는 기분",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "천연 효모 키우는 중인데 이름도 지어줌 \"꼬물이\" ㅋㅋ",
          "zh": "在养天然酵母还给起了名叫\"小蠕虫\"哈哈",
          "t": [
            0,
            4.78
          ]
        },
        {
          "ko": "매일 먹이 주고 온도 체크하고… 반려 식물 키우는 기분",
          "zh": "每天喂食查温度…有种养宠植物的感觉",
          "t": [
            5.18,
            10.29
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "cook1",
          "ko": "저도 키워봤는데 진짜 애정 생겨요 ㅋㅋ",
          "zh": "我也养过真的会有感情哈哈",
          "audioUrl": "/audio/blog/comments/p2-baker-sourdough-c0.mp3"
        }
      ],
      "likedBy": [
        "cook1",
        "newmom",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-sourdough.mp3",
    "audioDuration": 10,
    "coverEmoji": "🫙",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "baker",
    "likeCount": 42,
    "publishedAt": 1784494800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-05",
    "slug": "p2-granny-smartphone",
    "titleKo": "스마트폰 배우는 중",
    "titleZh": "正在学智能手机",
    "excerptKo": "손주가 스마트폰 알려줬는데 아직 헷갈림 ~ 그래도 이걸로 먼 데 사는 딸 얼굴 볼 수 있어서 좋네. 세상 참 좋아졌어 ㅎㅎ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "손주가 스마트폰 알려줬는데 아직 헷갈림 ~",
          "zh": "孙子教了我用手机可还是迷糊～",
          "t": [
            0,
            3.46
          ]
        },
        {
          "ko": "그래도 이걸로 먼 데 사는 딸 얼굴 볼 수 있어서 좋네.",
          "zh": "但能用这个看到远方的女儿的脸真好。",
          "t": [
            3.86,
            8.4
          ]
        },
        {
          "ko": "세상 참 좋아졌어 ㅎㅎ",
          "zh": "时代真是变好了呵呵",
          "t": [
            8.8,
            10.45
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "할머니 응원합니다 배움에 나이는 없어요!",
          "zh": "奶奶加油 学习不分年龄！",
          "audioUrl": "/audio/blog/comments/p2-granny-smartphone-c0.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "jeju",
        "student",
        "newmom",
        "retiree"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-smartphone.mp3",
    "audioDuration": 10,
    "coverEmoji": "📱",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "granny",
    "likeCount": 67,
    "publishedAt": 1784505600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-05",
    "slug": "p2-retiree-health",
    "titleKo": "건강검진 날",
    "titleZh": "体检日",
    "excerptKo": "오늘 정기 건강검진 다녀옴. 모든 수치 정상. 은퇴하고 스트레스 줄어서인지 몸이 더 좋아짐 ㅎㅎ 여러분도 건강 챙기세요",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 정기 건강검진 다녀옴.",
          "zh": "今天去做了定期体检。",
          "t": [
            0,
            2.79
          ]
        },
        {
          "ko": "모든 수치 정상.",
          "zh": "所有指标正常。",
          "t": [
            3.19,
            4.56
          ]
        },
        {
          "ko": "은퇴하고 스트레스 줄어서인지 몸이 더 좋아짐 ㅎㅎ 여러분도 건강 챙기세요",
          "zh": "也不知是不是退休后压力小了身体反而更好了呵呵 各位也请照顾健康",
          "t": [
            4.96,
            12.29
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nurse",
          "ko": "건강이 최고의 자산이에요 축하드려요",
          "zh": "健康是最好的财富 恭喜您",
          "audioUrl": "/audio/blog/comments/p2-retiree-health-c0.mp3"
        }
      ],
      "likedBy": [
        "nurse",
        "granny",
        "slow"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-health.mp3",
    "audioDuration": 12,
    "coverEmoji": "🏥",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 47,
    "publishedAt": 1784505600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-05",
    "slug": "p2-runner-marathon",
    "titleKo": "마라톤 신청 완료",
    "titleZh": "马拉松报名完成",
    "excerptKo": "생애 첫 마라톤 신청함. 목표는 완주지 기록 아님 ㅋㅋ 나만의 페이스로 끝까지 가는 게 중요함. 같이 뛸 사람?",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "생애 첫 마라톤 신청함.",
          "zh": "人生第一场马拉松报名了。",
          "t": [
            0,
            2.32
          ]
        },
        {
          "ko": "목표는 완주지 기록 아님 ㅋㅋ",
          "zh": "目标是完赛不是成绩哈哈",
          "t": [
            2.72,
            4.94
          ]
        },
        {
          "ko": "나만의 페이스로 끝까지 가는 게 중요함. 같이 뛸 사람?",
          "zh": "按自己的节奏坚持到底才重要。有人一起跑吗？",
          "t": [
            5.34,
            10.03
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "slow",
          "ko": "완주 정신 멋져요 응원할게요!",
          "zh": "完赛精神太酷了我给你加油",
          "audioUrl": "/audio/blog/comments/p2-runner-marathon-c0.mp3"
        }
      ],
      "likedBy": [
        "slow",
        "busan",
        "jeju",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-marathon.mp3",
    "audioDuration": 10,
    "coverEmoji": "🏅",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "runner",
    "likeCount": 52,
    "publishedAt": 1784505600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-09",
    "slug": "p2-gapyeong-monday",
    "titleKo": "월요일 왜 이렇게 길어",
    "titleZh": "周一为啥这么长",
    "excerptKo": "분명 아침 열었는데 아직도 오전임??? 월요일은 시간이 두 배로 가는 듯",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "분명 아침 열었는데 아직도 오전임???",
          "zh": "明明早上就开门了怎么还是上午？？？",
          "t": [
            0,
            3.78
          ]
        },
        {
          "ko": "월요일은 시간이 두 배로 가는 듯",
          "zh": "周一的时间感觉走得慢一倍",
          "t": [
            4.18,
            7.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "월요일은 원래 그런 겁니다 ㅋㅋ",
          "zh": "周一本来就这样哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-monday-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "coder",
        "student",
        "rider"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-monday.mp3",
    "audioDuration": 7,
    "coverEmoji": "😮‍💨",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "gapyeong",
    "likeCount": 40,
    "publishedAt": 1784509200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-05",
    "slug": "p2-newmom-photos",
    "titleKo": "핸드폰 용량 터지기 직전",
    "titleZh": "手机容量快炸了",
    "excerptKo": "아기 사진만 8000장 넘음. 똑같은 표정인데도 못 지움 ㅋㅋ 가족들한테 공유하느라 단톡방도 다섯 개",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아기 사진만 8000장 넘음.",
          "zh": "光宝宝照片就超过8000张了。",
          "t": [
            0,
            2.37
          ]
        },
        {
          "ko": "똑같은 표정인데도 못 지움 ㅋㅋ 가족들한테 공유하느라 단톡방도 다섯 개",
          "zh": "同一个表情也不舍得删哈哈 为了分享给家人群聊都建了五个",
          "t": [
            2.77,
            8.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "클라우드 결제하셔야겠네요 ㅋㅋ",
          "zh": "该买云存储了吧哈哈",
          "audioUrl": "/audio/blog/comments/p2-newmom-photos-c0.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "granny",
        "jeju",
        "newmom"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-photos.mp3",
    "audioDuration": 9,
    "coverEmoji": "📸",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "newmom",
    "likeCount": 44,
    "publishedAt": 1784509200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-05",
    "slug": "p2-cook1-home-meal",
    "titleKo": "엄마 요리가 그리운 날",
    "titleZh": "想念妈妈做饭的日子",
    "excerptKo": "오늘따라 엄마가 해준 미역국이 너무 먹고 싶음. 아무리 똑같이 해도 엄마 손맛을 못 따라감 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘따라 엄마가 해준 미역국이 너무 먹고 싶음.",
          "zh": "今天就特别想喝妈妈做的海带汤。",
          "t": [
            0,
            3.26
          ]
        },
        {
          "ko": "아무리 똑같이 해도 엄마 손맛을 못 따라감 ㅠㅠ",
          "zh": "再怎么照着做也赶不上妈妈的手艺呜呜",
          "t": [
            3.66,
            6.83
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "엄마 손맛은 재료에 사랑 한 스푼 더 넣은 거야",
          "zh": "妈妈的手艺是材料里多搁了一勺爱啊",
          "audioUrl": "/audio/blog/comments/p2-cook1-home-meal-c0.mp3"
        },
        {
          "animalId": "student",
          "ko": "저도 자취한 지 3년 됐는데 매일 그리움 ㅠ",
          "zh": "我也离家租房三年了 每天都想念呜",
          "audioUrl": "/audio/blog/comments/p2-cook1-home-meal-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "student",
        "newmom"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-home-meal.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍲",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "cook1",
    "likeCount": 65,
    "publishedAt": 1784512800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-05",
    "slug": "p2-jeju-ferry",
    "titleKo": "배 뜰지 매일 확인함",
    "titleZh": "每天都要查船开不开",
    "excerptKo": "육지 나가려면 날씨부터 확인. 바람 세면 배 안 떠서 발 묶임 ㅠㅠ 섬 생활의 애환",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "육지 나가려면 날씨부터 확인.",
          "zh": "要出岛去陆地得先看天气。",
          "t": [
            0,
            2.79
          ]
        },
        {
          "ko": "바람 세면 배 안 떠서 발 묶임 ㅠㅠ 섬 생활의 애환",
          "zh": "风大了船不开就走不了呜呜 岛上生活的心酸",
          "t": [
            3.19,
            7.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "busan",
          "ko": "아 그건 진짜 답답하겠다 ㅠㅠ",
          "zh": "啊那真的挺憋屈的呜呜",
          "audioUrl": "/audio/blog/comments/p2-jeju-ferry-c0.mp3"
        }
      ],
      "likedBy": [
        "busan",
        "slow",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-ferry.mp3",
    "audioDuration": 7,
    "coverEmoji": "⛴️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "jeju",
    "likeCount": 38,
    "publishedAt": 1784512800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-05",
    "slug": "p2-taxi-seoul-alleys",
    "titleKo": "서울 골목은 내가 전문",
    "titleZh": "首尔小巷我最熟",
    "excerptKo": "택시 15년 하면서 서울 골목 다 외움. 네비보다 내 머리가 더 정확함 ㅋㅋ 골목길 물어보면 나한테 와요",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "택시 15년 하면서 서울 골목 다 외움.",
          "zh": "开了15年出租首尔小巷子全背下来了。",
          "t": [
            0,
            4.83
          ]
        },
        {
          "ko": "네비보다 내 머리가 더 정확함 ㅋㅋ 골목길 물어보면 나한테 와요",
          "zh": "我的脑子比导航还准哈哈 需要小巷路线的来找我",
          "t": [
            5.23,
            9.54
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "살아있는 내비게이션이시네요 ㅎㅎ",
          "zh": "真是活导航啊呵呵",
          "audioUrl": "/audio/blog/comments/p2-taxi-seoul-alleys-c0.mp3"
        },
        {
          "animalId": "rider",
          "ko": "선배님 저도 골목 외우는 중입니다",
          "zh": "前辈我也在背小巷中",
          "audioUrl": "/audio/blog/comments/p2-taxi-seoul-alleys-c1.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "rider",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-seoul-alleys.mp3",
    "audioDuration": 10,
    "coverEmoji": "🗺️",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "taxi",
    "likeCount": 47,
    "publishedAt": 1784512800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-05",
    "slug": "p2-daegu-market",
    "titleKo": "시장 국밥이 그리움",
    "titleZh": "想念市场的汤饭",
    "excerptKo": "서울 밥집도 좋은데 대구 시장 국밥 그 맛이 안 남. 할머니가 막 퍼주시던 그 인심 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "서울 밥집도 좋은데 대구 시장 국밥 그 맛이 안 남.",
          "zh": "首尔的饭馆也不错，可就是没有大邱市场汤饭那个味。",
          "t": [
            0,
            4.49
          ]
        },
        {
          "ko": "할머니가 막 퍼주시던 그 인심 ㅠㅠ",
          "zh": "奶奶大勺大勺给你盛的那份人情味呜呜",
          "t": [
            4.89,
            7.88
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "시장 인심이 최고지 ~ 담엔 많이 드려요",
          "zh": "市场的人情最好啦～下次给你多盛点",
          "audioUrl": "/audio/blog/comments/p2-daegu-market-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "busan",
        "retiree",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-market.mp3",
    "audioDuration": 8,
    "coverEmoji": "🍲",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "daegu",
    "likeCount": 42,
    "publishedAt": 1784516400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-05",
    "slug": "p2-firefighter-cooking",
    "titleKo": "오늘 내가 밥 당번",
    "titleZh": "今天我轮值做饭",
    "excerptKo": "소방서 당직 요리 당번임. 열 명 분 카레 만드는 중. 내 카레가 꽤 맛있다고 소문 났음 ㅋㅋ 불 맛 아는 남자",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "소방서 당직 요리 당번임.",
          "zh": "消防局值班做饭轮到我。",
          "t": [
            0,
            2.6
          ]
        },
        {
          "ko": "열 명 분 카레 만드는 중. 내 카레가 꽤 맛있다고 소문 났음 ㅋㅋ",
          "zh": "正在做十个人的咖喱。据说我做的咖喱挺好吃的哈哈",
          "t": [
            3,
            8.74
          ]
        },
        {
          "ko": "불 맛 아는 남자",
          "zh": "懂火候的男人",
          "t": [
            9.14,
            10.65
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "cook1",
          "ko": "불 맛 아는 남자 ㅋㅋㅋ 센스 있으시네요",
          "zh": "懂火候的男人哈哈哈 有sense啊",
          "audioUrl": "/audio/blog/comments/p2-firefighter-cooking-c0.mp3"
        }
      ],
      "likedBy": [
        "cook1",
        "granny",
        "daegu"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-cooking.mp3",
    "audioDuration": 11,
    "coverEmoji": "🍛",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "firefighter",
    "likeCount": 44,
    "publishedAt": 1784516400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-05",
    "slug": "p2-salaryman-lunch",
    "titleKo": "점심 뭐 먹지 룰렛",
    "titleZh": "午餐吃啥轮盘",
    "excerptKo": "매일 점심시간마다 15분은 \"뭐 먹지\"에 씀. 결국 항상 제육볶음 먹으러 감 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "매일 점심시간마다 15분은 \"뭐 먹지\"에 씀.",
          "zh": "每天午饭时间15分钟都在\"吃啥\"上消耗。",
          "t": [
            0,
            3.92
          ]
        },
        {
          "ko": "결국 항상 제육볶음 먹으러 감 ㅋㅋㅋ",
          "zh": "最后还是去吃辣炒猪肉哈哈哈",
          "t": [
            4.32,
            7.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "제육은 사랑이죠 인정",
          "zh": "辣炒猪肉就是爱 认证",
          "audioUrl": "/audio/blog/comments/p2-salaryman-lunch-c0.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "coder",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-lunch.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍱",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "salaryman",
    "likeCount": 39,
    "publishedAt": 1784516400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-05",
    "slug": "p2-busan-hot",
    "titleKo": "서울 여름 왜 이렇게 더워",
    "titleZh": "首尔的夏天怎么这么热",
    "excerptKo": "바닷바람도 없고 그냥 찜통임… 서울 여름 이거 실화냐 진짜 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "바닷바람도 없고 그냥 찜통임…",
          "zh": "没有海风就是个大蒸笼…",
          "t": [
            0,
            3.6
          ]
        },
        {
          "ko": "서울 여름 이거 실화냐 진짜 ㅠㅠ",
          "zh": "首尔的夏天这是真的吗呜呜",
          "t": [
            4,
            7.51
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "에어컨 없이 못 살죠 요즘 ㅋㅋ",
          "zh": "最近没空调真活不了哈哈",
          "audioUrl": "/audio/blog/comments/p2-busan-hot-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "gapyeong",
        "nurse"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-hot.mp3",
    "audioDuration": 8,
    "coverEmoji": "🥵",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "busan",
    "likeCount": 41,
    "publishedAt": 1784523600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-05",
    "slug": "p2-carpenter-tools",
    "titleKo": "내 공구들은 내 자식",
    "titleZh": "我的工具就是我的孩子",
    "excerptKo": "다른 사람이 내 대패 만지면 진짜 화남. 공구는 목수의 분신이나 마찬가지임. 각자 다 이름도 붙였음 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다른 사람이 내 대패 만지면 진짜 화남.",
          "zh": "别人碰我的刨子我真的会生气。",
          "t": [
            0,
            3.03
          ]
        },
        {
          "ko": "공구는 목수의 분신이나 마찬가지임.",
          "zh": "工具就是木匠的分身。",
          "t": [
            3.43,
            7.41
          ]
        },
        {
          "ko": "각자 다 이름도 붙였음 ㅋㅋ",
          "zh": "每个都起了名字哈哈",
          "t": [
            7.81,
            9.51
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "baker",
          "ko": "제 반죽기는 \"믹서기 씨\" 라고 불러요 ㅋㅋ",
          "zh": "我把我的揉面机叫\"搅拌器先生\"哈哈",
          "audioUrl": "/audio/blog/comments/p2-carpenter-tools-c0.mp3"
        }
      ],
      "likedBy": [
        "baker",
        "seolgi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-tools.mp3",
    "audioDuration": 10,
    "coverEmoji": "🧰",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "carpenter",
    "likeCount": 40,
    "publishedAt": 1784523600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-05",
    "slug": "p2-nurse-off-day",
    "titleKo": "쉬는 날이 제일 행복",
    "titleZh": "休息日最幸福",
    "excerptKo": "오랜만에 쉬는 날인데 침대 밖에 안 나감. 밀린 드라마 보고 배달 시켜 먹고… 이게 행복이지 뭐 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오랜만에 쉬는 날인데 침대 밖에 안 나감.",
          "zh": "好久没休的休息日根本没起床。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "밀린 드라마 보고 배달 시켜 먹고… 이게 행복이지 뭐 ㅋㅋ",
          "zh": "追囤的剧点外卖吃…这不就是幸福嘛哈哈",
          "t": [
            3.71,
            8.02
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "slow",
          "ko": "쉬는 날 제대로 보내시네요 인정합니다",
          "zh": "休息日就该这么过 认可",
          "audioUrl": "/audio/blog/comments/p2-nurse-off-day-c0.mp3"
        }
      ],
      "likedBy": [
        "slow",
        "student",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-off-day.mp3",
    "audioDuration": 8,
    "coverEmoji": "🛌",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nurse",
    "likeCount": 53,
    "publishedAt": 1784523600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-05",
    "slug": "p2-slow-tea",
    "titleKo": "차 한 잔 우리는 시간",
    "titleZh": "泡一杯茶的时间",
    "excerptKo": "급하게 마시면 맛도 모름. 차 우러나는 거 기다리는 이 시간이 은근 좋음 🍵",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "급하게 마시면 맛도 모름.",
          "zh": "急着喝的话根本尝不出味。",
          "t": [
            0,
            1.94
          ]
        },
        {
          "ko": "차 우러나는 거 기다리는 이 시간이 은근 좋음 🍵",
          "zh": "等茶慢慢泡开的这段时间意外地喜欢",
          "t": [
            2.34,
            7.03
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "차는 기다림의 맛이죠 ㅎㅎ",
          "zh": "茶就是等待的味道呵呵",
          "audioUrl": "/audio/blog/comments/p2-slow-tea-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "granny",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-tea.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍵",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "slow",
    "likeCount": 41,
    "publishedAt": 1784527200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-05",
    "slug": "p2-founder-small-win",
    "titleKo": "첫 유료 고객 생김",
    "titleZh": "有了第一个付费客户",
    "excerptKo": "오늘 사이트에 첫 유료 고객 가입함. 알고 보니 내가 SNS에서 댓글 단 사람이었음 ㅋㅋ 작은 일도 쌓이면 연결됨",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 사이트에 첫 유료 고객 가입함.",
          "zh": "今天网站有了第一个付费客户注册。",
          "t": [
            0,
            3.12
          ]
        },
        {
          "ko": "알고 보니 내가 SNS에서 댓글 단 사람이었음 ㅋㅋ",
          "zh": "后来发现是我在SNS上回复过评论的人哈哈",
          "t": [
            3.52,
            8.54
          ]
        },
        {
          "ko": "작은 일도 쌓이면 연결됨",
          "zh": "小事积累起来也会产生连接的",
          "t": [
            8.94,
            11.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "축하드려요 첫 고객은 평생 기억난대요",
          "zh": "恭喜 听说第一个客人会记一辈子",
          "audioUrl": "/audio/blog/comments/p2-founder-small-win-c0.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "coder",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-small-win.mp3",
    "audioDuration": 11,
    "coverEmoji": "🎯",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "founder",
    "likeCount": 62,
    "publishedAt": 1784530800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-07",
    "slug": "p2-gapyeong-wrong-order",
    "titleKo": "주문 잘못 내드림 개창피 ㅠㅠ",
    "titleZh": "上错单了社死现场",
    "excerptKo": "오늘 손님한테 라떼 시켰는데 아메 드림… 아 개창피해 ㅠㅠ 그냥 서비스로 드렸다",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 손님한테 라떼 시켰는데 아메 드림…",
          "zh": "今天客人点了拿铁我给上成美式了…",
          "t": [
            0,
            4.78
          ]
        },
        {
          "ko": "아 개창피해 ㅠㅠ 그냥 서비스로 드렸다",
          "zh": "啊太社死了呜呜 干脆免费送了",
          "t": [
            5.18,
            8.64
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nurse",
          "ko": "괜찮아요 저도 어제 실수 백만 개…",
          "zh": "没事的我昨天也犯了一百万个错…",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-wrong-order-c0.mp3"
        }
      ],
      "likedBy": [
        "nurse",
        "haru",
        "minji"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-wrong-order.mp3",
    "audioDuration": 9,
    "coverEmoji": "😵",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "gapyeong",
    "likeCount": 36,
    "publishedAt": 1784530800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-05",
    "slug": "p2-rider-quickest",
    "titleKo": "오늘 개인 최단 기록",
    "titleZh": "今天个人最短记录",
    "excerptKo": "주문 받고 15분 만에 배달 완료함. 길이 뻥 뚫려서 신기록 찍음 ㅋㅋ 손님도 놀라면서 별 다섯 개 줌 🏆",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "주문 받고 15분 만에 배달 완료함.",
          "zh": "接单到送达15分钟。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "길이 뻥 뚫려서 신기록 찍음 ㅋㅋ 손님도 놀라면서 별 다섯 개 줌 🏆",
          "zh": "路超级通畅创记录了哈哈 客人也惊讶给了五星",
          "t": [
            3.71,
            9.82
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "taxi",
          "ko": "치타라는 이름 값 하시네요 ㅋㅋ",
          "zh": "不愧是叫猎豹的人哈哈",
          "audioUrl": "/audio/blog/comments/p2-rider-quickest-c0.mp3"
        }
      ],
      "likedBy": [
        "taxi",
        "daegu",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-quickest.mp3",
    "audioDuration": 10,
    "coverEmoji": "🏆",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "rider",
    "likeCount": 40,
    "publishedAt": 1784538000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-05",
    "slug": "p2-seolgi-color",
    "titleKo": "오늘 하늘 색 미쳤다",
    "titleZh": "今天天空的颜色绝了",
    "excerptKo": "퇴근길 하늘이 분홍 보라 섞여서 진짜 그림 같았음. 이런 색은 어떻게 만들지 계속 생각함 🎨",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "퇴근길 하늘이 분홍 보라 섞여서 진짜 그림 같았음.",
          "zh": "下班路上天空粉紫交织真的像画一样。",
          "t": [
            0,
            4.97
          ]
        },
        {
          "ko": "이런 색은 어떻게 만들지 계속 생각함 🎨",
          "zh": "一直在想这种颜色到底怎么调出来",
          "t": [
            5.37,
            8.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "jeju",
          "ko": "제주 노을도 진짜 예뻐요 보러 오세요",
          "zh": "济州的晚霞也超美 来看看吧",
          "audioUrl": "/audio/blog/comments/p2-seolgi-color-c0.mp3"
        },
        {
          "animalId": "florist",
          "ko": "저도 봤어요 오늘 하늘 대박 🌇",
          "zh": "我也看到了 今天天空绝了",
          "audioUrl": "/audio/blog/comments/p2-seolgi-color-c1.mp3"
        }
      ],
      "likedBy": [
        "jeju",
        "florist",
        "tori",
        "nabi",
        "runner"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-color.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌇",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "seolgi",
    "likeCount": 59,
    "publishedAt": 1784541600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-05",
    "slug": "p2-actor-method",
    "titleKo": "캐릭터에 빠지는 중",
    "titleZh": "正沉浸在角色里",
    "excerptKo": "이번 역은 실직자라서 일부러 며칠 동안 취직 정보만 검색해 봄. 진짜 마음이 무거워짐 ㅠㅠ 연기가 나를 먹는 느낌",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "이번 역은 실직자라서 일부러 며칠 동안 취직 정보만 검색해 봄.",
          "zh": "这次角色是失业者所以特意几天只搜求职信息来看。",
          "t": [
            0,
            5.45
          ]
        },
        {
          "ko": "진짜 마음이 무거워짐 ㅠㅠ 연기가 나를 먹는 느낌",
          "zh": "心情真的变得沉重呜呜 演技在吞噬我的感觉",
          "t": [
            5.85,
            9.77
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "seolgi",
          "ko": "진정한 배우가 되고 있네요 대단해요",
          "zh": "正在成为真正的演员啊 太厉害了",
          "audioUrl": "/audio/blog/comments/p2-actor-method-c0.mp3"
        }
      ],
      "likedBy": [
        "seolgi",
        "salaryman",
        "founder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-method.mp3",
    "audioDuration": 10,
    "coverEmoji": "🎬",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "actor",
    "likeCount": 41,
    "publishedAt": 1784545200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-05",
    "slug": "p2-florist-last-customer",
    "titleKo": "문 닫기 직전 손님",
    "titleZh": "快关门时的客人",
    "excerptKo": "9시에 닫으려는데 어떤 남자분이 뛰어 들어와서 \"여자친구 생일 깜빡했어요\" 함 ㅋㅋㅋ 급하게 꽃다발 만들어 드림. 사랑해요 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "9시에 닫으려는데 어떤 남자분이 뛰어 들어와서 \"여자친구 생일 깜빡했어요\" 함 ㅋㅋㅋ",
          "zh": "准备9点关门结果有个男的冲进来说\"我把女朋友生日忘了\"哈哈哈",
          "t": [
            0,
            7.38
          ]
        },
        {
          "ko": "급하게 꽃다발 만들어 드림. 사랑해요 ㅠㅠ",
          "zh": "紧急给做了束花。好有爱呜呜",
          "t": [
            7.78,
            11.19
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "아찔했을 듯 제가 그 남자 같아요 ㅋㅋ",
          "zh": "他能吓死吧 感觉我就是那种男的哈哈",
          "audioUrl": "/audio/blog/comments/p2-florist-last-customer-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "newmom",
        "busan",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-last-customer.mp3",
    "audioDuration": 11,
    "coverEmoji": "💝",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 64,
    "publishedAt": 1784548800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-05",
    "slug": "p2-student-study-buddy",
    "titleKo": "혼자 공부 너무 외로움",
    "titleZh": "独自学习太孤独了",
    "excerptKo": "혼자 공부하는 거 넘 외롭다. 얘들아 서로 응원이라도 하자 ㅠㅠ 댓글에 오늘 공부 시간 적고 가",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "혼자 공부하는 거 넘 외롭다.",
          "zh": "独自学习也太孤独了。",
          "t": [
            0,
            2.6
          ]
        },
        {
          "ko": "얘들아 서로 응원이라도 하자 ㅠㅠ 댓글에 오늘 공부 시간 적고 가",
          "zh": "大家我们互相加油吧呜呜 评论写下今天学了几个小时再走",
          "t": [
            3,
            8.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "6시간 했어요 ㅠㅠ 파이팅",
          "zh": "学了6小时呜呜 加油",
          "audioUrl": "/audio/blog/comments/p2-student-study-buddy-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "4시간 지금부터 시작합니다",
          "zh": "4小时 现在开始",
          "audioUrl": "/audio/blog/comments/p2-student-study-buddy-c1.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "nightowl",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-study-buddy.mp3",
    "audioDuration": 9,
    "coverEmoji": "📖",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "student",
    "likeCount": 42,
    "publishedAt": 1784552400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-04",
    "slug": "p2-nightowl-latenight-snack",
    "titleKo": "새벽에 라면 참기 힘듦",
    "titleZh": "深夜忍不住想吃泡面",
    "excerptKo": "새벽에 냄새 없는데도 라면 생각남. 지금 끓이면 지는 거 맞지? 근데 이미 물 올림 ㅋㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽에 냄새 없는데도 라면 생각남.",
          "zh": "深夜明明没闻到味也开始想泡面。",
          "t": [
            0,
            4.08
          ]
        },
        {
          "ko": "지금 끓이면 지는 거 맞지? 근데 이미 물 올림 ㅋㅋㅋㅋ",
          "zh": "现在煮就算输了对吧？可我已经把水坐上了哈哈哈哈",
          "t": [
            4.48,
            9.01
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "드세요 새벽 라면이 제일 맛있어요",
          "zh": "吃吧 深夜泡面最香了",
          "audioUrl": "/audio/blog/comments/p2-nightowl-latenight-snack-c0.mp3"
        },
        {
          "animalId": "busan",
          "ko": "이미 물 올렸으면 게임 끝 ㅋㅋ",
          "zh": "水都坐上了那就没得跑了哈哈",
          "audioUrl": "/audio/blog/comments/p2-nightowl-latenight-snack-c1.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "busan",
        "coder",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-latenight-snack.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "nightowl",
    "likeCount": 57,
    "publishedAt": 1784566800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-04",
    "slug": "p2-baker-regular",
    "titleKo": "매일 오는 단골 할아버지",
    "titleZh": "每天来的老爷爷熟客",
    "excerptKo": "아침 일곱 시마다 오시는 할아버지 있음. 항상 소보루빵 하나랑 커피. 오늘 안 오시면 걱정됨 ㅋㅋ 이게 단골의 정",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침 일곱 시마다 오시는 할아버지 있음.",
          "zh": "有个每天早上七点来的老爷爷。",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "항상 소보루빵 하나랑 커피.",
          "zh": "永远是酥皮面包配咖啡。",
          "t": [
            4.38,
            7.08
          ]
        },
        {
          "ko": "오늘 안 오시면 걱정됨 ㅋㅋ 이게 단골의 정",
          "zh": "今天没来的话会担心哈哈 这就是熟客的情分",
          "t": [
            7.48,
            11.64
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "단골이라는 말이 참 따뜻하구나",
          "zh": "常客这个词真温暖啊",
          "audioUrl": "/audio/blog/comments/p2-baker-regular-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "retiree",
        "florist",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-regular.mp3",
    "audioDuration": 12,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "baker",
    "likeCount": 60,
    "publishedAt": 1784584800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-04",
    "slug": "p2-taxi-rainy-surge",
    "titleKo": "비 오니까 콜 미침",
    "titleZh": "一下雨叫车疯了",
    "excerptKo": "비만 오면 콜이 미친 듯이 들어옴. 쉴 틈 없이 달렸는데도 계속 밀려 있음. 비 오는 날이 진짜 일당 제일 좋은 듯 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "비만 오면 콜이 미친 듯이 들어옴.",
          "zh": "一下雨叫车订单就疯了一样进来。",
          "t": [
            0,
            3.31
          ]
        },
        {
          "ko": "쉴 틈 없이 달렸는데도 계속 밀려 있음.",
          "zh": "没停地跑还是排着队。",
          "t": [
            3.71,
            6.97
          ]
        },
        {
          "ko": "비 오는 날이 진짜 일당 제일 좋은 듯 ㅋㅋ",
          "zh": "下雨天日收入好像真的是最好的哈哈",
          "t": [
            7.37,
            10.45
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "저도 비 오면 수수료 더 벌어요 ㅋㅋ",
          "zh": "我也是下雨能多赚点哈哈",
          "audioUrl": "/audio/blog/comments/p2-taxi-rainy-surge-c0.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "busan",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-rainy-surge.mp3",
    "audioDuration": 10,
    "coverEmoji": "🌧️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "taxi",
    "likeCount": 38,
    "publishedAt": 1784588400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-04",
    "slug": "p2-carpenter-apprentice",
    "titleKo": "요즘 젊은 사람들 목수에 관심 없음",
    "titleZh": "最近年轻人对木匠不感兴趣",
    "excerptKo": "기술 전수할 사람이 점점 없어짐 ㅠㅠ 그래도 가끔 체험하러 오는 사람 보면 희망이 생김. 전통 기술은 계속돼야 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "기술 전수할 사람이 점점 없어짐 ㅠㅠ",
          "zh": "能接手艺的人越来越少了呜呜",
          "t": [
            0,
            2.94
          ]
        },
        {
          "ko": "그래도 가끔 체험하러 오는 사람 보면 희망이 생김.",
          "zh": "但偶尔看到来体验的人就会有希望。",
          "t": [
            3.34,
            8.31
          ]
        },
        {
          "ko": "전통 기술은 계속돼야 함",
          "zh": "传统手艺必须传承下去",
          "t": [
            8.71,
            11.21
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "맞는 말이에요 젊은 세대가 관심 가져야 해요",
          "zh": "说得对 年轻一代应该关心",
          "audioUrl": "/audio/blog/comments/p2-carpenter-apprentice-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "granny",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-apprentice.mp3",
    "audioDuration": 11,
    "coverEmoji": "🪚",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "carpenter",
    "likeCount": 53,
    "publishedAt": 1784592000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-04",
    "slug": "p2-florist-season",
    "titleKo": "계절 바뀌는 게 보여",
    "titleZh": "能看到季节在变",
    "excerptKo": "꽃가게 하면서 제일 좋은 건 사계절을 꽃으로 느끼는 거. 봄엔 벚꽃, 여름엔 수국, 가을엔 코스모스… 지금은 수국이 제철",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "꽃가게 하면서 제일 좋은 건 사계절을 꽃으로 느끼는 거.",
          "zh": "开花店最好的事就是用花感受四季。",
          "t": [
            0,
            4.88
          ]
        },
        {
          "ko": "봄엔 벚꽃, 여름엔 수국, 가을엔 코스모스… 지금은 수국이 제철",
          "zh": "春天樱花夏天绣球秋天波斯菊…现在是绣球的季节",
          "t": [
            5.28,
            12.29
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "jeju",
          "ko": "제주는 지금 수국 천국이에요 🌺",
          "zh": "济州现在是绣球天堂",
          "audioUrl": "/audio/blog/comments/p2-florist-season-c0.mp3"
        }
      ],
      "likedBy": [
        "jeju",
        "seolgi",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-season.mp3",
    "audioDuration": 12,
    "coverEmoji": "🌺",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 48,
    "publishedAt": 1784592000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-04",
    "slug": "p2-granny-grandkids",
    "titleKo": "손주들 오는 날",
    "titleZh": "孙子们来的日子",
    "excerptKo": "오늘 손주들 온다고 떡이랑 과일 잔뜩 사왔어 ~ 냉장고에 넣어놨는데 벌써 반은 먹었네 ㅋㅋ 많이 먹어야지 뭐",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 손주들 온다고 떡이랑 과일 잔뜩 사왔어 ~",
          "zh": "今天孙子们要来我买了一堆糕点和水果～",
          "t": [
            0,
            3.69
          ]
        },
        {
          "ko": "냉장고에 넣어놨는데 벌써 반은 먹었네 ㅋㅋ 많이 먹어야지 뭐",
          "zh": "放冰箱里已经吃掉一半了哈哈 应该多吃嘛",
          "t": [
            4.09,
            9.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "newmom",
          "ko": "할머니 집 가면 항상 배 터져요 ㅋㅋ",
          "zh": "去奶奶家永远吃到撑哈哈",
          "audioUrl": "/audio/blog/comments/p2-granny-grandkids-c0.mp3"
        }
      ],
      "likedBy": [
        "newmom",
        "student",
        "gapyeong",
        "retiree"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-grandkids.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍡",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "granny",
    "likeCount": 58,
    "publishedAt": 1784595600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-04",
    "slug": "p2-retiree-old-friends",
    "titleKo": "40년 지기랑 통화",
    "titleZh": "跟40年老友通话",
    "excerptKo": "40년 전 회사 동기랑 전화로 옛날 이야기함. 웃다 보니 한 시간 훌쩍 감. 젊을 땐 술 마시고 지금은 차 마시면서 ㅎㅎ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "40년 전 회사 동기랑 전화로 옛날 이야기함.",
          "zh": "跟40年前的同事打电话聊了过去的事。",
          "t": [
            0,
            4.45
          ]
        },
        {
          "ko": "웃다 보니 한 시간 훌쩍 감.",
          "zh": "笑着笑着就过了一个小时。",
          "t": [
            4.85,
            7.74
          ]
        },
        {
          "ko": "젊을 땐 술 마시고 지금은 차 마시면서 ㅎㅎ",
          "zh": "年轻时喝酒聊现在喝茶聊呵呵",
          "t": [
            8.14,
            11.45
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "오래된 친구만 한 게 없지 ~",
          "zh": "没什么比得上老朋友～",
          "audioUrl": "/audio/blog/comments/p2-retiree-old-friends-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "jeju",
        "slow",
        "retiree"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-old-friends.mp3",
    "audioDuration": 11,
    "coverEmoji": "📞",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 52,
    "publishedAt": 1784595600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-04",
    "slug": "p2-rider-dog",
    "titleKo": "배달 가다 강아지 만남",
    "titleZh": "送餐路上遇到狗",
    "excerptKo": "배달 갔는데 문 앞에 있는 강아지가 꼬리 흔들면서 반겨줌. 배달보다 강아지랑 노느라 시간 더 씀 ㅋㅋ 최고의 팁",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "배달 갔는데 문 앞에 있는 강아지가 꼬리 흔들면서 반겨줌.",
          "zh": "去送餐门前的狗摇着尾巴欢迎我。",
          "t": [
            0,
            5.49
          ]
        },
        {
          "ko": "배달보다 강아지랑 노느라 시간 더 씀 ㅋㅋ 최고의 팁",
          "zh": "比送餐还花更多时间跟狗玩哈哈 这是最好的小费",
          "t": [
            5.89,
            11.63
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "강아지가 최고의 팁 ㅋㅋㅋ 공감",
          "zh": "狗就是最好的小费哈哈哈 同感",
          "audioUrl": "/audio/blog/comments/p2-rider-dog-c0.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "granny",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-dog.mp3",
    "audioDuration": 12,
    "coverEmoji": "🐕",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "rider",
    "likeCount": 65,
    "publishedAt": 1784606400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-04",
    "slug": "p2-slow-todo",
    "titleKo": "오늘 할 일 하나만 하기로 함",
    "titleZh": "今天决定只做一件事",
    "excerptKo": "할 일 열 개 적어놓고 스트레스 받느니 딱 하나만 하기로 함. 그거라도 하면 성공 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "할 일 열 개 적어놓고 스트레스 받느니 딱 하나만 하기로 함.",
          "zh": "与其列十件事然后压力山大，不如就定一件。",
          "t": [
            0,
            5.02
          ]
        },
        {
          "ko": "그거라도 하면 성공 ㅋㅋ",
          "zh": "哪怕就做了那一件也算成功哈哈",
          "t": [
            5.42,
            7.02
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "이거 진짜 마음 편해지는 방법이네요",
          "zh": "这方法真的让人轻松",
          "audioUrl": "/audio/blog/comments/p2-slow-todo-c0.mp3"
        },
        {
          "animalId": "salaryman",
          "ko": "저도 오늘부터 이렇게 할래요",
          "zh": "我也从今天开始这么干",
          "audioUrl": "/audio/blog/comments/p2-slow-todo-c1.mp3"
        }
      ],
      "likedBy": [
        "student",
        "salaryman",
        "gapyeong",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-todo.mp3",
    "audioDuration": 7,
    "coverEmoji": "✅",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "slow",
    "likeCount": 58,
    "publishedAt": 1784606400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-06",
    "slug": "p2-gapyeong-ice-americano",
    "titleKo": "겨울에도 아아 시키는 분들 손",
    "titleZh": "冬天也点冰美式的举手",
    "excerptKo": "아직 여름인데 벌써 궁금함. 겨울에도 아이스 아메리카노 드시는 분 손 들어봐요 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아직 여름인데 벌써 궁금함.",
          "zh": "还是夏天呢我就已经好奇了。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "겨울에도 아이스 아메리카노 드시는 분 손 들어봐요 ㅋㅋ",
          "zh": "冬天也喝冰美式的人举个手哈哈",
          "t": [
            3.62,
            7.12
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "busan",
          "ko": "저요!! 사계절 아아입니다",
          "zh": "我我我！！一年四季冰美式",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-ice-americano-c0.mp3"
        },
        {
          "animalId": "coder",
          "ko": "얼죽아 여기 있습니다 🧊",
          "zh": "冻死也要冰美式的我在这",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-ice-americano-c1.mp3"
        }
      ],
      "likedBy": [
        "busan",
        "coder",
        "student",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-ice-americano.mp3",
    "audioDuration": 7,
    "coverEmoji": "🧊",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "gapyeong",
    "likeCount": 44,
    "publishedAt": 1784610000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-04",
    "slug": "p2-founder-rejection",
    "titleKo": "오늘 투자 거절당함",
    "titleZh": "今天被投资拒绝了",
    "excerptKo": "잘될 거 같았던 투자사한테 거절당함. 이유는 \"아직 이르다\". 속상하지만 이유가 타당해서 더 속상 ㅠㅠ 다시 준비하자",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "잘될 거 같았던 투자사한테 거절당함.",
          "zh": "被看起来很看好的一家投资方拒绝了。",
          "t": [
            0,
            3.4
          ]
        },
        {
          "ko": "이유는 \"아직 이르다\". 속상하지만 이유가 타당해서 더 속상 ㅠㅠ",
          "zh": "理由是\"还太早\"。难过但理由有道理就更难过了呜呜",
          "t": [
            3.8,
            9.72
          ]
        },
        {
          "ko": "다시 준비하자",
          "zh": "重新准备吧",
          "t": [
            10.12,
            11.25
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "actor",
          "ko": "오디션 떨어지는 거랑 비슷하네요 ㅠㅠ",
          "zh": "跟试镜被刷很像啊呜呜",
          "audioUrl": "/audio/blog/comments/p2-founder-rejection-c0.mp3"
        },
        {
          "animalId": "coder",
          "ko": "\"이르다\"는 \"언젠간 된다\"는 뜻이에요",
          "zh": "\"还早\"的意思就是\"总有一天能成\"",
          "audioUrl": "/audio/blog/comments/p2-founder-rejection-c1.mp3"
        }
      ],
      "likedBy": [
        "actor",
        "coder",
        "firefighter"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-rejection.mp3",
    "audioDuration": 11,
    "coverEmoji": "💔",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "founder",
    "likeCount": 54,
    "publishedAt": 1784613600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-04",
    "slug": "p2-jeju-slow-life",
    "titleKo": "여기선 다들 천천히 삼",
    "titleZh": "这儿大家都过得慢悠悠",
    "excerptKo": "서울 갔다 오면 확실히 느낌. 제주는 시간이 천천히 가는 것 같음. 사람들도 안 급함 🐴",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "서울 갔다 오면 확실히 느낌.",
          "zh": "去趟首尔回来就明显感觉到。",
          "t": [
            0,
            2.89
          ]
        },
        {
          "ko": "제주는 시간이 천천히 가는 것 같음. 사람들도 안 급함 🐴",
          "zh": "济州的时间好像走得慢，人们也不着急",
          "t": [
            3.29,
            8.21
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "slow",
          "ko": "제주 살고 싶다 저랑 잘 맞을 듯 🐢",
          "zh": "好想住济州 感觉跟我很合",
          "audioUrl": "/audio/blog/comments/p2-jeju-slow-life-c0.mp3"
        },
        {
          "animalId": "retiree",
          "ko": "은퇴하면 제주 갈까 고민 중 ㅎㅎ",
          "zh": "正纠结退休后要不要去济州呵呵",
          "audioUrl": "/audio/blog/comments/p2-jeju-slow-life-c1.mp3"
        }
      ],
      "likedBy": [
        "slow",
        "retiree",
        "gapyeong",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-slow-life.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌴",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "jeju",
    "likeCount": 56,
    "publishedAt": 1784617200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-04",
    "slug": "p2-coder-meeting",
    "titleKo": "이 회의 메일로 됐잖아",
    "titleZh": "这会开成邮件不就完了",
    "excerptKo": "한 시간짜리 회의였는데 결론은 \"다음에 다시 얘기하자\"임. 이거 그냥 메일로 됐잖아 진짜 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "한 시간짜리 회의였는데 결론은 \"다음에 다시 얘기하자\"임.",
          "zh": "开了一小时的会，结论是\"下次再聊\"。",
          "t": [
            0,
            6.68
          ]
        },
        {
          "ko": "이거 그냥 메일로 됐잖아 진짜 ㅋㅋ",
          "zh": "这不发封邮件就完事了哈哈",
          "t": [
            7.08,
            9.29
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "founder",
          "ko": "회의 문화 저도 반성합니다 ㅠㅠ",
          "zh": "开会文化这点我也反省呜呜",
          "audioUrl": "/audio/blog/comments/p2-coder-meeting-c0.mp3"
        }
      ],
      "likedBy": [
        "founder",
        "salaryman",
        "actor"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-meeting.mp3",
    "audioDuration": 9,
    "coverEmoji": "😑",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "coder",
    "likeCount": 46,
    "publishedAt": 1784620800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-04",
    "slug": "p2-newmom-mess",
    "titleKo": "오늘 집 엉망진창",
    "titleZh": "今天家里一片狼藉",
    "excerptKo": "아기가 이유식 뒤집어 놓고 장난감 다 꺼내고… 청소기 한 번 못 돌림 ㅋㅋ 그래도 살아 있음에 감사",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아기가 이유식 뒤집어 놓고 장난감 다 꺼내고…",
          "zh": "宝宝把辅食打翻了玩具全扒拉出来了…",
          "t": [
            0,
            3.83
          ]
        },
        {
          "ko": "청소기 한 번 못 돌림 ㅋㅋ 그래도 살아 있음에 감사",
          "zh": "吸尘器一次都没能开哈哈 但还活着就感谢",
          "t": [
            4.23,
            8.63
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "그땐 힘든데 나중에 다 추억이에요",
          "zh": "那时候觉得累可过后全是回忆啊",
          "audioUrl": "/audio/blog/comments/p2-newmom-mess-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "granny",
        "cook1"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-mess.mp3",
    "audioDuration": 9,
    "coverEmoji": "🧸",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "newmom",
    "likeCount": 56,
    "publishedAt": 1784620800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-04",
    "slug": "p2-busan-surf",
    "titleKo": "주말에 서핑 갈 사람",
    "titleZh": "周末有人一起冲浪吗",
    "excerptKo": "이번 주말에 서핑 가려는데 같이 갈 사람 없나요 얘들아 초보도 환영 🏄",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "이번 주말에 서핑 가려는데 같이 갈 사람 없나요 얘들아",
          "zh": "这周末想去冲浪，宝子们有没有人一起",
          "t": [
            0,
            5.35
          ]
        },
        {
          "ko": "초보도 환영 🏄",
          "zh": "新手也欢迎",
          "t": [
            5.75,
            7.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "오 저 관심 있어요! 어디로 가요?",
          "zh": "哦我有兴趣！去哪儿啊",
          "audioUrl": "/audio/blog/comments/p2-busan-surf-c0.mp3"
        },
        {
          "animalId": "rider",
          "ko": "주말 근무라 ㅠㅠ 다음에 꼭",
          "zh": "周末要上班呜呜 下次一定",
          "audioUrl": "/audio/blog/comments/p2-busan-surf-c1.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "rider",
        "jeju",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-surf.mp3",
    "audioDuration": 8,
    "coverEmoji": "🏄",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "busan",
    "likeCount": 34,
    "publishedAt": 1784624400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-04",
    "slug": "p2-firefighter-family",
    "titleKo": "아내가 제일 무서워하는 전화",
    "titleZh": "老婆最怕接到的电话",
    "excerptKo": "출동 나갈 때마다 아내가 걱정하는 거 앎. 항상 \"조심해\" 문자 보내줌 ㅠㅠ 가족 생각하면 더 철저하게 안전 챙기게 됨",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "출동 나갈 때마다 아내가 걱정하는 거 앎.",
          "zh": "我知道每次出勤老婆都在担心。",
          "t": [
            0,
            4.26
          ]
        },
        {
          "ko": "항상 \"조심해\" 문자 보내줌 ㅠㅠ",
          "zh": "每次都给我发\"小心点\"的信息呜呜",
          "t": [
            4.66,
            6.79
          ]
        },
        {
          "ko": "가족 생각하면 더 철저하게 안전 챙기게 됨",
          "zh": "想到家人就会更彻底地注意安全",
          "t": [
            7.19,
            10.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "newmom",
          "ko": "눈물 나요 ㅠㅠ 가족분들 항상 응원합니다",
          "zh": "看哭了呜呜 家人一直在支持你们",
          "audioUrl": "/audio/blog/comments/p2-firefighter-family-c0.mp3"
        },
        {
          "animalId": "granny",
          "ko": "가족 기다리는 사람이 있다는 게 힘이야",
          "zh": "有家人在等就是力量啊",
          "audioUrl": "/audio/blog/comments/p2-firefighter-family-c1.mp3"
        }
      ],
      "likedBy": [
        "newmom",
        "granny",
        "nurse",
        "retiree"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-family.mp3",
    "audioDuration": 11,
    "coverEmoji": "❤️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "firefighter",
    "likeCount": 69,
    "publishedAt": 1784624400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-04",
    "slug": "p2-cook1-ingredients",
    "titleKo": "마늘 태움 또",
    "titleZh": "蒜又煎糊了",
    "excerptKo": "마늘 볶다가 또 태움. 마늘은 왜 이렇게 빨리 타는 거지 ㅠㅠ 불 조절이 인생 과제",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "마늘 볶다가 또 태움.",
          "zh": "炒蒜又糊了。",
          "t": [
            0,
            1.99
          ]
        },
        {
          "ko": "마늘은 왜 이렇게 빨리 타는 거지 ㅠㅠ 불 조절이 인생 과제",
          "zh": "蒜为什么这么容易糊呢呜呜 火候控制是人生课题",
          "t": [
            2.39,
            6.98
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "baker",
          "ko": "불 조절은 베이킹도 똑같아요 ㅋㅋ",
          "zh": "烘焙也一样要看火候哈哈",
          "audioUrl": "/audio/blog/comments/p2-cook1-ingredients-c0.mp3"
        }
      ],
      "likedBy": [
        "baker",
        "daegu"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-ingredients.mp3",
    "audioDuration": 7,
    "coverEmoji": "🧄",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "cook1",
    "likeCount": 33,
    "publishedAt": 1784628000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-04",
    "slug": "p2-salaryman-payday",
    "titleKo": "월급날 기분",
    "titleZh": "发工资日的心情",
    "excerptKo": "오늘 월급 들어왔는데 잠깐 행복하다가 공과금 내고 카드값 나가니까 다시 우울함. 이게 월급의 굴레지 뭐 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 월급 들어왔는데 잠깐 행복하다가 공과금 내고 카드값 나가니까 다시 우울함.",
          "zh": "今天工资到账短暂开心了一下，交完水电卡费又抑郁了。",
          "t": [
            0,
            7.91
          ]
        },
        {
          "ko": "이게 월급의 굴레지 뭐 ㅠㅠ",
          "zh": "这就是工资的枷锁吧呜呜",
          "t": [
            8.31,
            10.2
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "통장 스쳐 지나가는 숫자일 뿐 ㅠ",
          "zh": "只是存折上擦肩而过的数字呜",
          "audioUrl": "/audio/blog/comments/p2-salaryman-payday-c0.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "rider",
        "nurse",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-payday.mp3",
    "audioDuration": 10,
    "coverEmoji": "💰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "salaryman",
    "likeCount": 63,
    "publishedAt": 1784628000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-04",
    "slug": "p2-daegu-diet-fail",
    "titleKo": "다이어트 내일부터",
    "titleZh": "减肥明天开始",
    "excerptKo": "오늘 치킨 시키면서 다이어트는 내일부터라고 함. 근데 내 내일은 왜 안 오지 ㅋㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 치킨 시키면서 다이어트는 내일부터라고 함.",
          "zh": "今天点炸鸡的时候说减肥明天开始。",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "근데 내 내일은 왜 안 오지 ㅋㅋㅋㅋ",
          "zh": "可我的明天为啥总不来哈哈哈哈",
          "t": [
            4.38,
            7.03
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "내일은 영원히 안 옵니다 ㅋㅋ",
          "zh": "明天永远不会来的哈哈",
          "audioUrl": "/audio/blog/comments/p2-daegu-diet-fail-c0.mp3"
        },
        {
          "animalId": "runner",
          "ko": "같이 뛰어요 그럼 ㅋㅋ",
          "zh": "那一起跑步呗哈哈",
          "audioUrl": "/audio/blog/comments/p2-daegu-diet-fail-c1.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "runner",
        "busan",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-diet-fail.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍗",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "daegu",
    "likeCount": 60,
    "publishedAt": 1784631600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-04",
    "slug": "p2-student-parents",
    "titleKo": "엄마가 보내준 반찬",
    "titleZh": "妈妈寄来的小菜",
    "excerptKo": "엄마가 택배로 반찬 보내줬는데 김이랑 멸치볶음 보고 눈물남. 아무리 힘들어도 엄마 반찬 먹으면 다시 힘냄 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "엄마가 택배로 반찬 보내줬는데 김이랑 멸치볶음 보고 눈물남.",
          "zh": "妈妈快递寄来的小菜，看到海苔和炒鳀鱼干就掉眼泪了。",
          "t": [
            0,
            5.74
          ]
        },
        {
          "ko": "아무리 힘들어도 엄마 반찬 먹으면 다시 힘냄 ㅠㅠ",
          "zh": "再累吃了妈妈的小菜就能重新振作呜呜",
          "t": [
            6.14,
            9.64
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "newmom",
          "ko": "엄마는 위대해요 ㅠㅠ 나도 나중에",
          "zh": "妈妈真伟大呜呜 我以后也是",
          "audioUrl": "/audio/blog/comments/p2-student-parents-c0.mp3"
        },
        {
          "animalId": "granny",
          "ko": "엄마 마음은 다 똑같구나 ~",
          "zh": "做妈的心都一样啊～",
          "audioUrl": "/audio/blog/comments/p2-student-parents-c1.mp3"
        }
      ],
      "likedBy": [
        "newmom",
        "granny",
        "jeju",
        "gapyeong",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-parents.mp3",
    "audioDuration": 10,
    "coverEmoji": "🥘",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "student",
    "likeCount": 71,
    "publishedAt": 1784631600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-04",
    "slug": "p2-runner-night-run",
    "titleKo": "밤 러닝이 더 좋은 이유",
    "titleZh": "更喜欢夜跑的理由",
    "excerptKo": "밤에 뛰면 사람도 적고 조명도 예쁘고. 무엇보다 아무 생각 안 나서 좋음. 뛰는 동안만큼은 걱정 다 잊음",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "밤에 뛰면 사람도 적고 조명도 예쁘고.",
          "zh": "晚上跑人少灯也漂亮。",
          "t": [
            0,
            3.83
          ]
        },
        {
          "ko": "무엇보다 아무 생각 안 나서 좋음.",
          "zh": "最重要的是不用想任何事情真好。",
          "t": [
            4.23,
            7.69
          ]
        },
        {
          "ko": "뛰는 동안만큼은 걱정 다 잊음",
          "zh": "跑的那段时间能把所有烦恼都忘记",
          "t": [
            8.09,
            11.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "밤 운동 완전 공감이에요",
          "zh": "完全懂夜跑的感觉",
          "audioUrl": "/audio/blog/comments/p2-runner-night-run-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "student",
        "coder",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-night-run.mp3",
    "audioDuration": 11,
    "coverEmoji": "🌃",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "runner",
    "likeCount": 46,
    "publishedAt": 1784635200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-04",
    "slug": "p2-nurse-shoes",
    "titleKo": "간호사 신발 추천 좀",
    "titleZh": "求推荐护士鞋",
    "excerptKo": "근무 중에 제일 중요한 게 신발인 거 알지? 발 아프면 진짜 하루 종일 고통임. 좋은 신발 아는 사람 제보 좀 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "근무 중에 제일 중요한 게 신발인 거 알지?",
          "zh": "上班最重要的就是鞋你们知道吧？",
          "t": [
            0,
            3.4
          ]
        },
        {
          "ko": "발 아프면 진짜 하루 종일 고통임. 좋은 신발 아는 사람 제보 좀 ㅠㅠ",
          "zh": "脚疼真的整天都煎熬。知道好鞋的人求推荐呜呜",
          "t": [
            3.8,
            9.39
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "러닝화 중에 쿠션 좋은 걸로 사세요 두 시간 서 있어도 안 아파요",
          "zh": "买跑步鞋里缓震好的 站两小时也不疼",
          "audioUrl": "/audio/blog/comments/p2-nurse-shoes-c0.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "rider",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-shoes.mp3",
    "audioDuration": 9,
    "coverEmoji": "👟",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "nurse",
    "likeCount": 34,
    "publishedAt": 1784638800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-04",
    "slug": "p2-seolgi-erase",
    "titleKo": "세 시간 그린 거 다 지웠다",
    "titleZh": "画了三小时全擦了",
    "excerptKo": "세 시간 공들여 그렸는데 맘에 안 들어서 다 지움. 아 내가 왜 그랬지 ㅠㅠ 근데 후련하긴 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "세 시간 공들여 그렸는데 맘에 안 들어서 다 지움.",
          "zh": "花三小时精心画的，因为不满意全擦了。",
          "t": [
            0,
            4.35
          ]
        },
        {
          "ko": "아 내가 왜 그랬지 ㅠㅠ 근데 후련하긴 함",
          "zh": "啊我干嘛这样呜呜 但确实挺痛快的",
          "t": [
            4.75,
            9.25
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "actor",
          "ko": "그 마음 알아요… 완벽주의의 저주 ㅠㅠ",
          "zh": "懂那种心情…完美主义的诅咒呜呜",
          "audioUrl": "/audio/blog/comments/p2-seolgi-erase-c0.mp3"
        }
      ],
      "likedBy": [
        "actor",
        "nightowl",
        "tori"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-erase.mp3",
    "audioDuration": 9,
    "coverEmoji": "🧽",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "seolgi",
    "likeCount": 43,
    "publishedAt": 1784638800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-04",
    "slug": "p2-actor-part-time",
    "titleKo": "배우는 알바도 필수",
    "titleZh": "当演员打工也是必修",
    "excerptKo": "연기만 해선 못 먹고 살아서 편의점 알바함. 낮엔 연습 밤엔 편의점… 그래도 꿈을 위해선 이 정도는",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "연기만 해선 못 먹고 살아서 편의점 알바함.",
          "zh": "光靠演戏吃不饱所以在便利店打工。",
          "t": [
            0,
            4.21
          ]
        },
        {
          "ko": "낮엔 연습 밤엔 편의점… 그래도 꿈을 위해선 이 정도는",
          "zh": "白天排练晚上便利店…不过为了梦想这点不算什么",
          "t": [
            4.61,
            9.21
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "밤에 편의점 자주 가는데 공작님 만날 수도 있겠네요",
          "zh": "我晚上常去便利店 说不定能碰到孔雀nim",
          "audioUrl": "/audio/blog/comments/p2-actor-part-time-c0.mp3"
        },
        {
          "animalId": "rider",
          "ko": "같이 밤일 하시는군요 화이팅",
          "zh": "都做夜活呢 加油",
          "audioUrl": "/audio/blog/comments/p2-actor-part-time-c1.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "rider",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-part-time.mp3",
    "audioDuration": 9,
    "coverEmoji": "🏪",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "actor",
    "likeCount": 50,
    "publishedAt": 1784642400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-03",
    "slug": "p2-nightowl-daytime-sleepy",
    "titleKo": "낮엔 좀비 밤엔 멀쩡",
    "titleZh": "白天僵尸晚上精神",
    "excerptKo": "왜 나는 낮엔 좀비고 밤만 되면 멀쩡해지지. 몸이 시차 적응을 안 하나 봄 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "왜 나는 낮엔 좀비고 밤만 되면 멀쩡해지지.",
          "zh": "为啥我白天像僵尸一到晚上就精神了。",
          "t": [
            0,
            4.17
          ]
        },
        {
          "ko": "몸이 시차 적응을 안 하나 봄 ㅋㅋㅋ",
          "zh": "我这身体是不是永远倒不过时差哈哈哈",
          "t": [
            4.57,
            6.98
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "저랑 똑같아요 밤에 집중 잘 돼요",
          "zh": "跟我一样 晚上才专注",
          "audioUrl": "/audio/blog/comments/p2-nightowl-daytime-sleepy-c0.mp3"
        }
      ],
      "likedBy": [
        "student",
        "coder",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-daytime-sleepy.mp3",
    "audioDuration": 7,
    "coverEmoji": "🧟",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nightowl",
    "likeCount": 45,
    "publishedAt": 1784649600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-05",
    "slug": "p2-gapyeong-midnight-emo",
    "titleKo": "왜 새벽엔 다 진지해지지",
    "titleZh": "为啥一到深夜就开始emo",
    "excerptKo": "왜 새벽 두 시만 되면 갑자기 인생 진지하게 고민하게 됨… 얼른 자야 되는데",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "왜 새벽 두 시만 되면 갑자기 인생 진지하게 고민하게 됨…",
          "zh": "为啥一到凌晨两点就突然开始认真思考人生…",
          "t": [
            0,
            4.74
          ]
        },
        {
          "ko": "얼른 자야 되는데",
          "zh": "明明该赶紧睡了",
          "t": [
            5.14,
            6.65
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "그게 바로 새벽 감성이죠 🌙",
          "zh": "这就是凌晨限定的情绪啊",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-midnight-emo-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "nabi",
        "gomdori"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-midnight-emo.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌙",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "gapyeong",
    "likeCount": 39,
    "publishedAt": 1784653200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-03",
    "slug": "p2-nurse-first-aed",
    "titleKo": "처음으로 심폐소생술 성공",
    "titleZh": "第一次心肺复苏成功",
    "excerptKo": "오늘 응급실에서 CPR 성공함. 손이 아직도 떨림. 가족들 우는 모습 보고 나도 울컥했지만 참음 ㅠㅠ 이게 우리 일이지",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 응급실에서 CPR 성공함.",
          "zh": "今天在急诊室心肺复苏成功了。",
          "t": [
            0,
            3.17
          ]
        },
        {
          "ko": "손이 아직도 떨림.",
          "zh": "手现在还在抖。",
          "t": [
            3.57,
            5.22
          ]
        },
        {
          "ko": "가족들 우는 모습 보고 나도 울컥했지만 참음 ㅠㅠ 이게 우리 일이지",
          "zh": "看到家人哭的样子我也哽咽但忍住了呜呜 这就是我们的工作吧",
          "t": [
            5.62,
            10.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "firefighter",
          "ko": "진짜 영웅이세요 수고하셨습니다",
          "zh": "真是英雄 辛苦了",
          "audioUrl": "/audio/blog/comments/p2-nurse-first-aed-c0.mp3"
        }
      ],
      "likedBy": [
        "firefighter",
        "taxi",
        "rider",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-first-aed.mp3",
    "audioDuration": 11,
    "coverEmoji": "💙",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "nurse",
    "likeCount": 88,
    "publishedAt": 1784653200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-03",
    "slug": "p2-rider-late-night",
    "titleKo": "새벽 배달의 묘미",
    "titleZh": "深夜送餐的妙处",
    "excerptKo": "새벽엔 도로가 텅 비어서 달리기 좋음. 그리고 배고픈 사람들 먹을 거 전해 주는 기분도 은근 좋음 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽엔 도로가 텅 비어서 달리기 좋음.",
          "zh": "凌晨路空空的跑着很舒服。",
          "t": [
            0,
            3.55
          ]
        },
        {
          "ko": "그리고 배고픈 사람들 먹을 거 전해 주는 기분도 은근 좋음 ㅋㅋ",
          "zh": "而且把吃的递给饥饿的人的那种感觉意外地不错哈哈",
          "t": [
            3.95,
            9.83
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "새벽 배달 있으면 저도 자주 시킵니다 ㅋㅋ",
          "zh": "有凌晨外卖我经常点哈哈",
          "audioUrl": "/audio/blog/comments/p2-rider-late-night-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "coder",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-late-night.mp3",
    "audioDuration": 10,
    "coverEmoji": "🌙",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "rider",
    "likeCount": 37,
    "publishedAt": 1784653200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-03",
    "slug": "p2-baker-fail",
    "titleKo": "오늘 식빵 망함",
    "titleZh": "今天吐司翻车了",
    "excerptKo": "발효 시간 잘못 맞춰서 식빵 모양이 이상하게 나옴. 3년 차인데도 실수하네 ㅠㅠ 그래도 맛은 괜찮아서 반값 세일함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "발효 시간 잘못 맞춰서 식빵 모양이 이상하게 나옴.",
          "zh": "发酵时间没掌握好吐司形状有点怪。",
          "t": [
            0,
            4.4
          ]
        },
        {
          "ko": "3년 차인데도 실수하네 ㅠㅠ 그래도 맛은 괜찮아서 반값 세일함",
          "zh": "都三年了还是会失误呜呜 但味道还行就打折卖了",
          "t": [
            4.8,
            10.81
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "cook1",
          "ko": "실패도 예쁘게 포장하면 팔려요 ㅋㅋ",
          "zh": "翻车了包装好看点也能卖出去的哈哈",
          "audioUrl": "/audio/blog/comments/p2-baker-fail-c0.mp3"
        }
      ],
      "likedBy": [
        "cook1",
        "student",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-fail.mp3",
    "audioDuration": 11,
    "coverEmoji": "😅",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "baker",
    "likeCount": 38,
    "publishedAt": 1784671200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-03",
    "slug": "p2-retiree-garden",
    "titleKo": "베란다 텃밭 근황",
    "titleZh": "阳台菜园近况",
    "excerptKo": "상추랑 고추 기르는 중인데 상추가 진짜 잘 자람. 텃밭 가꾸기는 은퇴 후 최고의 취미 ㅎㅎ 직접 키운 채소 맛이 다름",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "상추랑 고추 기르는 중인데 상추가 진짜 잘 자람.",
          "zh": "在养生菜和辣椒，生菜长得特别好。",
          "t": [
            0,
            4.78
          ]
        },
        {
          "ko": "텃밭 가꾸기는 은퇴 후 최고의 취미 ㅎㅎ 직접 키운 채소 맛이 다름",
          "zh": "搞菜园子是退休后最好的爱好呵呵 自己种的菜味道就是不一样",
          "t": [
            5.18,
            11.77
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "상추는 물 자주 주는 게 비법이야 ~",
          "zh": "生菜勤浇水就是秘诀啊～",
          "audioUrl": "/audio/blog/comments/p2-retiree-garden-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "jeju",
        "newmom",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-garden.mp3",
    "audioDuration": 12,
    "coverEmoji": "🌱",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 43,
    "publishedAt": 1784674800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-03",
    "slug": "p2-salaryman-subway",
    "titleKo": "출근길 지하철 지옥",
    "titleZh": "通勤地铁地狱",
    "excerptKo": "아침 지하철 타고 출근하는데 사람이 너무 많아서 발이 땅에 안 닿음. 공중 부양 체험 중 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침 지하철 타고 출근하는데 사람이 너무 많아서 발이 땅에 안 닿음.",
          "zh": "早上坐地铁上班人多到脚踩不着地。",
          "t": [
            0,
            5.83
          ]
        },
        {
          "ko": "공중 부양 체험 중 ㅋㅋㅋ",
          "zh": "正在体验凌空悬浮哈哈哈",
          "t": [
            6.23,
            7.83
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "저도 신림선 완전 지옥 ㅠ",
          "zh": "我新林线也完全是地狱呜",
          "audioUrl": "/audio/blog/comments/p2-salaryman-subway-c0.mp3"
        },
        {
          "animalId": "rider",
          "ko": "오토바이가 답입니다",
          "zh": "摩托车才是出路",
          "audioUrl": "/audio/blog/comments/p2-salaryman-subway-c1.mp3"
        }
      ],
      "likedBy": [
        "student",
        "rider",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-subway.mp3",
    "audioDuration": 8,
    "coverEmoji": "🚇",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "salaryman",
    "likeCount": 56,
    "publishedAt": 1784674800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-03",
    "slug": "p2-daegu-breakfast",
    "titleKo": "아침부터 뭐 먹을지 고민",
    "titleZh": "一早就在纠结吃啥",
    "excerptKo": "눈 뜨자마자 오늘 점심 뭐 먹을지 고민함. 먹는 게 인생의 낙인 사람 손 🙋",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "눈 뜨자마자 오늘 점심 뭐 먹을지 고민함.",
          "zh": "一睁眼就在纠结今天午饭吃啥。",
          "t": [
            0,
            4.03
          ]
        },
        {
          "ko": "먹는 게 인생의 낙인 사람 손 🙋",
          "zh": "把吃当成人生乐趣的举手",
          "t": [
            4.43,
            7.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "저요 ㅋㅋ 먹으려고 삽니다",
          "zh": "我我 哈哈 为了吃而活",
          "audioUrl": "/audio/blog/comments/p2-daegu-breakfast-c0.mp3"
        },
        {
          "animalId": "busan",
          "ko": "손 들었습니다 확실히",
          "zh": "手举得稳稳的",
          "audioUrl": "/audio/blog/comments/p2-daegu-breakfast-c1.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "busan",
        "rider",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-breakfast.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍽️",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "daegu",
    "likeCount": 55,
    "publishedAt": 1784678400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-03",
    "slug": "p2-founder-first-hire",
    "titleKo": "첫 직원 뽑음",
    "titleZh": "招了第一个员工",
    "excerptKo": "드디어 첫 직원 뽑았음. 나 혼자 할 때랑은 차원이 다르네. 누군가의 월급 책임진다는 게 이렇게 무거운 거였어 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "드디어 첫 직원 뽑았음.",
          "zh": "终于招了第一个员工。",
          "t": [
            0,
            2.74
          ]
        },
        {
          "ko": "나 혼자 할 때랑은 차원이 다르네.",
          "zh": "跟自己一个人干的时候完全不是一个级别。",
          "t": [
            3.14,
            6.22
          ]
        },
        {
          "ko": "누군가의 월급 책임진다는 게 이렇게 무거운 거였어 ㅠㅠ",
          "zh": "要对别人的薪水负责原来是这么沉重的事呜呜",
          "t": [
            6.62,
            10.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "책임감 있는 대표님이시네요 멋져요",
          "zh": "有责任感的代表nim 很帅",
          "audioUrl": "/audio/blog/comments/p2-founder-first-hire-c0.mp3"
        },
        {
          "animalId": "retiree",
          "ko": "사람을 책임진다는 건 큰 일이죠",
          "zh": "对别人负责是件大事啊",
          "audioUrl": "/audio/blog/comments/p2-founder-first-hire-c1.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "retiree",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-first-hire.mp3",
    "audioDuration": 11,
    "coverEmoji": "🤝",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "founder",
    "likeCount": 55,
    "publishedAt": 1784678400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-03",
    "slug": "p2-taxi-grammar",
    "titleKo": "외국인 손님한테 한국어 알려줌",
    "titleZh": "教外国乘客韩语",
    "excerptKo": "외국인 손님이 한국어 공부한다고 택시에서 단어 연습함. 그래서 내가 \"감사합니다\" 발음 가르쳐 줌 ㅋㅋ 기분 좋네",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "외국인 손님이 한국어 공부한다고 택시에서 단어 연습함.",
          "zh": "外国乘客说在学韩语在车上就练起单词来了。",
          "t": [
            0,
            5.17
          ]
        },
        {
          "ko": "그래서 내가 \"감사합니다\" 발음 가르쳐 줌 ㅋㅋ 기분 좋네",
          "zh": "于是我就教了\"감사합니다\"的发音哈哈 心情不错",
          "t": [
            5.57,
            10.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "tori",
          "ko": "멋진 택시 기사님이세요 저희 앱 추천해 주셨나요 ㅋㅋ",
          "zh": "好酷的司机nim 您推荐了我们的app吗哈哈",
          "audioUrl": "/audio/blog/comments/p2-taxi-grammar-c0.mp3"
        }
      ],
      "likedBy": [
        "tori",
        "seolgi",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-grammar.mp3",
    "audioDuration": 10,
    "coverEmoji": "🗣️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "taxi",
    "likeCount": 52,
    "publishedAt": 1784682000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-03",
    "slug": "p2-runner-rain",
    "titleKo": "비 오는 날 러닝",
    "titleZh": "下雨天跑步",
    "excerptKo": "빗속에서 뛰는 게 은근 중독임. 땀인지 비인지 구분 안 가는 그 느낌 ㅋㅋ 근데 신발 젖는 건 진짜 극혐",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "빗속에서 뛰는 게 은근 중독임.",
          "zh": "雨中跑步意外地上瘾。",
          "t": [
            0,
            2.94
          ]
        },
        {
          "ko": "땀인지 비인지 구분 안 가는 그 느낌 ㅋㅋ",
          "zh": "分不清是汗还是雨的那个感觉哈哈",
          "t": [
            3.34,
            7.64
          ]
        },
        {
          "ko": "근데 신발 젖는 건 진짜 극혐",
          "zh": "但鞋子湿了真的极度厌恶",
          "t": [
            8.04,
            11.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "신발 젖으면 배달할 때 미끄러워요 ㅠ",
          "zh": "鞋子湿了送外卖时好滑呜",
          "audioUrl": "/audio/blog/comments/p2-runner-rain-c0.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "jeju",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-rain.mp3",
    "audioDuration": 11,
    "coverEmoji": "🌧️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "runner",
    "likeCount": 40,
    "publishedAt": 1784685600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-03",
    "slug": "p2-slow-walk",
    "titleKo": "산책하다 꽃 구경만 삼십 분",
    "titleZh": "散步光看花就三十分钟",
    "excerptKo": "동네 한 바퀴 도는데 꽃 보고 고양이 보고 하늘 보다 보면 시간 순삭임. 이게 힐링이지 뭐",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "동네 한 바퀴 도는데 꽃 보고 고양이 보고 하늘 보다 보면 시간 순삭임.",
          "zh": "在小区转一圈，看看花看看猫看看天，时间嗖一下就没了。",
          "t": [
            0,
            6.82
          ]
        },
        {
          "ko": "이게 힐링이지 뭐",
          "zh": "这不就是治愈嘛",
          "t": [
            7.22,
            8.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "florist",
          "ko": "산책 최고죠 🌷 저도 매일 해요",
          "zh": "散步最棒了 我也每天散",
          "audioUrl": "/audio/blog/comments/p2-slow-walk-c0.mp3"
        }
      ],
      "likedBy": [
        "florist",
        "granny",
        "retiree",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-walk.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌸",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "slow",
    "likeCount": 50,
    "publishedAt": 1784685600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-03",
    "slug": "p2-firefighter-new-recruit",
    "titleKo": "신입 대원 들어왔다",
    "titleZh": "新队员来了",
    "excerptKo": "신입 대원 왔는데 눈빛이 반짝반짝함. 나도 저랬던 때 있었지 ㅋㅋ 선배들이 나 가르쳐 줬던 것처럼 나도 잘 챙겨줘야지",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "신입 대원 왔는데 눈빛이 반짝반짝함.",
          "zh": "新队员来了眼睛闪闪发光。",
          "t": [
            0,
            3.83
          ]
        },
        {
          "ko": "나도 저랬던 때 있었지 ㅋㅋ",
          "zh": "我也有过那样的时候吧哈哈",
          "t": [
            4.23,
            6.4
          ]
        },
        {
          "ko": "선배들이 나 가르쳐 줬던 것처럼 나도 잘 챙겨줘야지",
          "zh": "像前辈们当初带我一样我也得好好照顾他",
          "t": [
            6.8,
            10.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "선배가 좋으면 신입이 빨리 적응해요!",
          "zh": "前辈好的话新人适应得快！",
          "audioUrl": "/audio/blog/comments/p2-firefighter-new-recruit-c0.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "nurse",
        "taxi",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-new-recruit.mp3",
    "audioDuration": 11,
    "coverEmoji": "🌟",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "firefighter",
    "likeCount": 57,
    "publishedAt": 1784689200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-03",
    "slug": "p2-florist-bouquet",
    "titleKo": "결혼식 부케 주문",
    "titleZh": "婚礼捧花订单",
    "excerptKo": "단골 손님 결혼식 부케 만들었는데 다 만들고 나니까 내가 다 설렘. 꽃으로 누군가의 특별한 날 장식하는 게 이 일의 매력 🌸",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "단골 손님 결혼식 부케 만들었는데 다 만들고 나니까 내가 다 설렘.",
          "zh": "给熟客做了婚礼捧花，做完我自己都心动了。",
          "t": [
            0,
            5.69
          ]
        },
        {
          "ko": "꽃으로 누군가의 특별한 날 장식하는 게 이 일의 매력 🌸",
          "zh": "用花装点别人特别的日子，这就是这工作的魅力",
          "t": [
            6.09,
            10.87
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "newmom",
          "ko": "제 결혼식 부케 생각나네요 ㅠㅠ",
          "zh": "想起我婚礼的捧花了呜呜",
          "audioUrl": "/audio/blog/comments/p2-florist-bouquet-c0.mp3"
        },
        {
          "animalId": "seolgi",
          "ko": "꽃 일러스트 그려도 돼요?",
          "zh": "可以画花的插画吗？",
          "audioUrl": "/audio/blog/comments/p2-florist-bouquet-c1.mp3"
        }
      ],
      "likedBy": [
        "newmom",
        "seolgi",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-bouquet.mp3",
    "audioDuration": 11,
    "coverEmoji": "💐",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 55,
    "publishedAt": 1784692800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-03",
    "slug": "p2-seolgi-exhibition",
    "titleKo": "주말에 전시 보러 갈 사람",
    "titleZh": "周末有人一起看展吗",
    "excerptKo": "홍대 근처에서 하는 전시 가보려는데 같이 갈 사람 있나요 얘들아. 혼자 가긴 좀 심심해서 ㅎㅎ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "홍대 근처에서 하는 전시 가보려는데 같이 갈 사람 있나요 얘들아.",
          "zh": "想去弘大附近的一个展，宝子们有没有人一起。",
          "t": [
            0,
            5.78
          ]
        },
        {
          "ko": "혼자 가긴 좀 심심해서 ㅎㅎ",
          "zh": "一个人去有点无聊呵呵",
          "t": [
            6.18,
            8.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "actor",
          "ko": "오 저 관심 있어요! 무슨 전시예요?",
          "zh": "哦我有兴趣！什么展啊",
          "audioUrl": "/audio/blog/comments/p2-seolgi-exhibition-c0.mp3"
        },
        {
          "animalId": "florist",
          "ko": "저도 껴도 되나요 ㅎㅎ",
          "zh": "我也能加入吗呵呵",
          "audioUrl": "/audio/blog/comments/p2-seolgi-exhibition-c1.mp3"
        }
      ],
      "likedBy": [
        "actor",
        "florist",
        "tori",
        "runner"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-exhibition.mp3",
    "audioDuration": 8,
    "coverEmoji": "🖼️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "seolgi",
    "likeCount": 35,
    "publishedAt": 1784696400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-03",
    "slug": "p2-carpenter-mistake",
    "titleKo": "실수로 나무 잘못 잘랐다",
    "titleZh": "失误锯错了木头",
    "excerptKo": "주문 받은 사이즈보다 2cm 짧게 잘랐음 ㅠㅠ 자재비만 몇만 원 날림. 목수는 한 번 잘못 자르면 끝나는 거라 긴장 많이 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "주문 받은 사이즈보다 2cm 짧게 잘랐음 ㅠㅠ",
          "zh": "比订单尺寸短了2cm呜呜",
          "t": [
            0,
            4.12
          ]
        },
        {
          "ko": "자재비만 몇만 원 날림.",
          "zh": "光材料费就赔了好几万。",
          "t": [
            4.52,
            7.08
          ]
        },
        {
          "ko": "목수는 한 번 잘못 자르면 끝나는 거라 긴장 많이 함",
          "zh": "木匠一刀锯错就完了所以特别小心",
          "t": [
            7.48,
            12.97
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "baker",
          "ko": "베이킹도 재료 날리는 날 진짜 속상해요",
          "zh": "烘焙也有浪费材料的时候真的心疼",
          "audioUrl": "/audio/blog/comments/p2-carpenter-mistake-c0.mp3"
        }
      ],
      "likedBy": [
        "baker",
        "founder",
        "actor"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-mistake.mp3",
    "audioDuration": 13,
    "coverEmoji": "😩",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "carpenter",
    "likeCount": 35,
    "publishedAt": 1784700000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-03",
    "slug": "p2-coder-coffee",
    "titleKo": "오늘 커피 6잔째",
    "titleZh": "今天第6杯咖啡了",
    "excerptKo": "오늘 커피 여섯 잔째인데 아직도 졸림. 이쯤 되면 커피가 물인 듯 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 커피 여섯 잔째인데 아직도 졸림.",
          "zh": "今天喝到第6杯咖啡了还是困。",
          "t": [
            0,
            3.46
          ]
        },
        {
          "ko": "이쯤 되면 커피가 물인 듯 ㅋㅋㅋ",
          "zh": "到这份上咖啡跟水没区别了哈哈哈",
          "t": [
            3.86,
            5.98
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "우리 카페 오세요 일곱 잔째 서비스 ☕",
          "zh": "来我们咖啡馆吧 第7杯免费",
          "audioUrl": "/audio/blog/comments/p2-coder-coffee-c0.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "nurse",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-coffee.mp3",
    "audioDuration": 6,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "coder",
    "likeCount": 40,
    "publishedAt": 1784700000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-03",
    "slug": "p2-jeju-tangerine",
    "titleKo": "귤은 겨울에만 먹는 거 아님",
    "titleZh": "橘子不是只有冬天吃",
    "excerptKo": "육지 친구가 여름에 웬 귤이냐는데 제주는 사시사철 귤 있음. 한라봉 진짜 맛있는데 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "육지 친구가 여름에 웬 귤이냐는데 제주는 사시사철 귤 있음.",
          "zh": "陆地朋友说夏天哪来的橘子，可济州一年四季都有橘子。",
          "t": [
            0,
            5.45
          ]
        },
        {
          "ko": "한라봉 진짜 맛있는데 ㅠㅠ",
          "zh": "汉拿峰橘子真的超好吃呜呜",
          "t": [
            5.85,
            7.45
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "한라봉 최고죠 택배로 시켜 먹어요",
          "zh": "汉拿峰橘最棒了 我都快递订着吃",
          "audioUrl": "/audio/blog/comments/p2-jeju-tangerine-c0.mp3"
        },
        {
          "animalId": "granny",
          "ko": "제주 귤은 달기가 다르지 ~",
          "zh": "济州的橘子甜度就是不一样～",
          "audioUrl": "/audio/blog/comments/p2-jeju-tangerine-c1.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "granny",
        "busan",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-tangerine.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍊",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "jeju",
    "likeCount": 43,
    "publishedAt": 1784700000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-03",
    "slug": "p2-busan-loud",
    "titleKo": "목소리 크다고 또 혼남 ㅋㅋ",
    "titleZh": "又因为嗓门大被说了哈哈",
    "excerptKo": "카페에서 친구랑 얘기했는데 목소리 크다고 눈치 줌… 나 부산 사람인데 어쩌라고 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "카페에서 친구랑 얘기했는데 목소리 크다고 눈치 줌…",
          "zh": "在咖啡馆跟朋友聊天，因为嗓门大被人瞪…",
          "t": [
            0,
            4.21
          ]
        },
        {
          "ko": "나 부산 사람인데 어쩌라고 ㅋㅋㅋ",
          "zh": "我釜山人啊你让我咋办哈哈哈",
          "t": [
            4.61,
            7.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [],
      "likedBy": [
        "runner",
        "coder",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-loud.mp3",
    "audioDuration": 7,
    "coverEmoji": "📢",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "busan",
    "likeCount": 47,
    "publishedAt": 1784703600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-03",
    "slug": "p2-newmom-first-word",
    "titleKo": "아기 첫 \"엄마\"",
    "titleZh": "宝宝第一次叫\"妈妈\"",
    "excerptKo": "오늘 아기가 \"엄마\"라고 함. 녹음해 놓고 열 번은 들은 듯 ㅠㅠ 밤새 못 자도 이 한마디면 다 괜찮아짐",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 아기가 \"엄마\"라고 함.",
          "zh": "今天宝宝喊了\"妈妈\"。",
          "t": [
            0,
            2.55
          ]
        },
        {
          "ko": "녹음해 놓고 열 번은 들은 듯 ㅠㅠ",
          "zh": "录下来大概听了有十遍了呜呜",
          "t": [
            2.95,
            5.17
          ]
        },
        {
          "ko": "밤새 못 자도 이 한마디면 다 괜찮아짐",
          "zh": "一夜没睡这一句话就什么都好了",
          "t": [
            5.57,
            8.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "눈물 난다 ~ 내 아들 첫 마디 아직도 기억해",
          "zh": "掉眼泪了～我家儿子的第一句到现在还记得",
          "audioUrl": "/audio/blog/comments/p2-newmom-first-word-c0.mp3"
        },
        {
          "animalId": "jeju",
          "ko": "축하해요 🎉 앞으로 매일 들을 거예요",
          "zh": "恭喜以后每天都会听到的",
          "audioUrl": "/audio/blog/comments/p2-newmom-first-word-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "jeju",
        "nurse",
        "florist",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-first-word.mp3",
    "audioDuration": 9,
    "coverEmoji": "💕",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "newmom",
    "likeCount": 91,
    "publishedAt": 1784703600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-03",
    "slug": "p2-student-mock-exam",
    "titleKo": "오늘 모의고사 망함",
    "titleZh": "今天模拟考炸了",
    "excerptKo": "공부한 데만 안 나오고 찍은 것도 다 틀림. 진짜 시험장 나오면서 한강 가고 싶었음 ㅠㅠ 근데 담주에 또 본다",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "공부한 데만 안 나오고 찍은 것도 다 틀림.",
          "zh": "学了的全没出蒙的全错了。",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "진짜 시험장 나오면서 한강 가고 싶었음 ㅠㅠ",
          "zh": "出考场的时候真想走去汉江呜呜",
          "t": [
            4.38,
            8.03
          ]
        },
        {
          "ko": "근데 담주에 또 본다",
          "zh": "但下周还有一场",
          "t": [
            8.43,
            10.98
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "한강 같이 뛰실래요 기분 좋아져요",
          "zh": "要不要一起跑汉江 心情会变好的",
          "audioUrl": "/audio/blog/comments/p2-student-mock-exam-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "삐약님 힘내요 이 시험 인생 전부 아니에요",
          "zh": "小鸡nim加油 这考试不是人生的全部",
          "audioUrl": "/audio/blog/comments/p2-student-mock-exam-c1.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "gapyeong",
        "salaryman",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-mock-exam.mp3",
    "audioDuration": 11,
    "coverEmoji": "😭",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "student",
    "likeCount": 63,
    "publishedAt": 1784703600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-03",
    "slug": "p2-cook1-jang",
    "titleKo": "장 보는 게 제일 어려움",
    "titleZh": "买菜最难",
    "excerptKo": "요리보다 냉장고에 있는 걸로 뭘 할지 정하는 게 더 어려움. 결국 오늘도 김치찌개 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "요리보다 냉장고에 있는 걸로 뭘 할지 정하는 게 더 어려움.",
          "zh": "比做饭更难的是用冰箱里的东西决定做什么。",
          "t": [
            0,
            4.4
          ]
        },
        {
          "ko": "결국 오늘도 김치찌개 ㅋㅋ",
          "zh": "到头来今天又是泡菜锅哈哈",
          "t": [
            4.8,
            7.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "김치찌개 만능 반찬 인정",
          "zh": "泡菜锅万能配菜 认可",
          "audioUrl": "/audio/blog/comments/p2-cook1-jang-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "student",
        "daegu"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-jang.mp3",
    "audioDuration": 7,
    "coverEmoji": "🛒",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "cook1",
    "likeCount": 41,
    "publishedAt": 1784707200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-03",
    "slug": "p2-granny-weather-knee",
    "titleKo": "내일 비 온다 내 무릎이 그래",
    "titleZh": "明天要下雨 我的膝盖说的",
    "excerptKo": "오른쪽 무릎이 찌릿찌릿하네 ~ 내일 비 올 거야. 일기예보보다 내 무릎이 더 정확해 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오른쪽 무릎이 찌릿찌릿하네 ~ 내일 비 올 거야.",
          "zh": "右边膝盖刺刺的～明天准下雨。",
          "t": [
            0,
            3.92
          ]
        },
        {
          "ko": "일기예보보다 내 무릎이 더 정확해 ㅋㅋㅋ",
          "zh": "比天气预报还准哈哈哈哈",
          "t": [
            4.32,
            7.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "저도 허리로 예보합니다 ㅋㅋ",
          "zh": "我靠腰预报哈哈",
          "audioUrl": "/audio/blog/comments/p2-granny-weather-knee-c0.mp3"
        },
        {
          "animalId": "runner",
          "ko": "진짜요?? 과학인가요 ㅋㅋ",
          "zh": "真的吗？这是科学吗哈哈",
          "audioUrl": "/audio/blog/comments/p2-granny-weather-knee-c1.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "runner",
        "jeju",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-weather-knee.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌧️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "granny",
    "likeCount": 61,
    "publishedAt": 1784707200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-03",
    "slug": "p2-actor-opening-night",
    "titleKo": "드디어 개막",
    "titleZh": "终于开幕了",
    "excerptKo": "두 달 연습한 연극 드디어 오늘 첫 공연. 커튼 오르기 직전 그 떨림은 진짜 말로 표현 안 됨. 관객들 반응 보고 싶다 🎭",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "두 달 연습한 연극 드디어 오늘 첫 공연.",
          "zh": "练了两个月的剧终于今天首演。",
          "t": [
            0,
            3.08
          ]
        },
        {
          "ko": "커튼 오르기 직전 그 떨림은 진짜 말로 표현 안 됨.",
          "zh": "幕布升起来前的那种悸动真的无法形容。",
          "t": [
            3.48,
            8.02
          ]
        },
        {
          "ko": "관객들 반응 보고 싶다 🎭",
          "zh": "好想看到观众的反应",
          "t": [
            8.42,
            9.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "seolgi",
          "ko": "연극 보러 갈래요 어디서 해요?",
          "zh": "我要去看 在哪演啊？",
          "audioUrl": "/audio/blog/comments/p2-actor-opening-night-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "첫 공연 축하드려요 최고의 무대 되길",
          "zh": "祝首演顺利 希望是最棒的舞台",
          "audioUrl": "/audio/blog/comments/p2-actor-opening-night-c1.mp3"
        }
      ],
      "likedBy": [
        "seolgi",
        "gapyeong",
        "florist",
        "nightowl"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-opening-night.mp3",
    "audioDuration": 10,
    "coverEmoji": "🎪",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "actor",
    "likeCount": 59,
    "publishedAt": 1784710800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-02",
    "slug": "p2-actor-line-memorize",
    "titleKo": "대본 외우기 꿀팁",
    "titleZh": "背台词小技巧",
    "excerptKo": "새벽에 대본 외우는 중. 나만의 팁: 대사를 손으로 한 번 더 쓰면 진짜 안 까먹음. 근데 손목 나감 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽에 대본 외우는 중.",
          "zh": "凌晨在背台词。",
          "t": [
            0,
            1.99
          ]
        },
        {
          "ko": "나만의 팁: 대사를 손으로 한 번 더 쓰면 진짜 안 까먹음.",
          "zh": "个人技巧：台词再手抄一遍就真的不会忘。",
          "t": [
            2.39,
            7.4
          ]
        },
        {
          "ko": "근데 손목 나감 ㅋㅋ",
          "zh": "但手腕要废了哈哈",
          "t": [
            7.8,
            9.97
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "이거 영어 단어 외울 때도 쓰는 방법이에요",
          "zh": "我背英语单词也用这个方法",
          "audioUrl": "/audio/blog/comments/p2-actor-line-memorize-c0.mp3"
        }
      ],
      "likedBy": [
        "student",
        "seolgi",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-line-memorize.mp3",
    "audioDuration": 10,
    "coverEmoji": "📝",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "actor",
    "likeCount": 35,
    "publishedAt": 1784736000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-02",
    "slug": "p2-nightowl-coffee-noon",
    "titleKo": "낮에 마신 커피 실화냐",
    "titleZh": "白天喝的咖啡真的假的",
    "excerptKo": "낮 두 시에 마신 커피 때문에 지금까지 안 잠… 카페인 나한테만 늦게 오나 봄 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "낮 두 시에 마신 커피 때문에 지금까지 안 잠…",
          "zh": "因为下午两点喝的咖啡到现在都没睡…",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "카페인 나한테만 늦게 오나 봄 ㅠㅠ",
          "zh": "咖啡因是不是只对我发作得晚啊呜呜",
          "t": [
            4.38,
            6.89
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "gapyeong",
          "ko": "오후엔 디카페인 드세요 ㅋㅋ",
          "zh": "下午喝低因的吧哈哈",
          "audioUrl": "/audio/blog/comments/p2-nightowl-coffee-noon-c0.mp3"
        }
      ],
      "likedBy": [
        "gapyeong",
        "coder",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-coffee-noon.mp3",
    "audioDuration": 7,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "nightowl",
    "likeCount": 38,
    "publishedAt": 1784739600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-02",
    "slug": "p2-founder-all-nighter",
    "titleKo": "밤샘 코딩 3일째",
    "titleZh": "连夜写码第三天",
    "excerptKo": "투자 심사 앞두고 밤샘 중. 커피로 버티는 중인데 손이 떨림 ㅋㅋ 창업의 낭만만 있는 거 아님",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "투자 심사 앞두고 밤샘 중.",
          "zh": "投资审查前在通宵。",
          "t": [
            0,
            2.51
          ]
        },
        {
          "ko": "커피로 버티는 중인데 손이 떨림 ㅋㅋ",
          "zh": "靠咖啡撑着手都在抖了哈哈",
          "t": [
            2.91,
            6.08
          ]
        },
        {
          "ko": "창업의 낭만만 있는 거 아님",
          "zh": "创业可不只有浪漫那一面",
          "t": [
            6.48,
            8.8
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "동지여 커피 한 잔 사드리고 싶네요",
          "zh": "同志啊 想请你喝杯咖啡",
          "audioUrl": "/audio/blog/comments/p2-founder-all-nighter-c0.mp3"
        },
        {
          "animalId": "coder",
          "ko": "저도 스타트업 다닐 때 그랬어요 ㅠㅠ",
          "zh": "我在初创公司时也那样呜呜",
          "audioUrl": "/audio/blog/comments/p2-founder-all-nighter-c1.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "coder",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-all-nighter.mp3",
    "audioDuration": 9,
    "coverEmoji": "💻",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "founder",
    "likeCount": 48,
    "publishedAt": 1784743200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-02",
    "slug": "p2-firefighter-after-fire",
    "titleKo": "화재 진압 후에",
    "titleZh": "灭火之后",
    "excerptKo": "불 다 끄고 나오는 길에 시민분들이 생수 챙겨주심. 이런 작은 일에 진짜 힘 남 ㅠㅠ 감사합니다",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "불 다 끄고 나오는 길에 시민분들이 생수 챙겨주심.",
          "zh": "灭完火出来的路上市民给我们递了水。",
          "t": [
            0,
            4.31
          ]
        },
        {
          "ko": "이런 작은 일에 진짜 힘 남 ㅠㅠ 감사합니다",
          "zh": "就这点小事真的能添力气呜呜 谢谢大家",
          "t": [
            4.71,
            8.11
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "항상 고맙게 생각하고 있어요 아들",
          "zh": "一直都很感激你们啊孩子",
          "audioUrl": "/audio/blog/comments/p2-firefighter-after-fire-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "nurse",
        "retiree",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-after-fire.mp3",
    "audioDuration": 8,
    "coverEmoji": "💪",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "firefighter",
    "likeCount": 81,
    "publishedAt": 1784746800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-02",
    "slug": "p2-baker-first-batch",
    "titleKo": "첫 오븐 열 때",
    "titleZh": "打开第一炉的时候",
    "excerptKo": "첫 오븐 열면 가게 전체가 빵 냄새로 가득 참. 이 냄새 때문에 이 일 못 그만둠 ㅋㅋ 진짜 마약임",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "첫 오븐 열면 가게 전체가 빵 냄새로 가득 참.",
          "zh": "打开第一炉整个店都是面包香。",
          "t": [
            0,
            4.54
          ]
        },
        {
          "ko": "이 냄새 때문에 이 일 못 그만둠 ㅋㅋ 진짜 마약임",
          "zh": "就因为这个味道干不了别的了哈哈 真是会上瘾的",
          "t": [
            4.94,
            8.63
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "빵집 앞만 지나가도 침 고여요 최고",
          "zh": "光路过面包店都流口水 太棒了",
          "audioUrl": "/audio/blog/comments/p2-baker-first-batch-c0.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "florist",
        "retiree",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-first-batch.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍞",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "baker",
    "likeCount": 51,
    "publishedAt": 1784750400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-02",
    "slug": "p2-granny-kimchi-tip",
    "titleKo": "김치 맛있게 담그는 비법 하나",
    "titleZh": "腌好吃泡菜的一个秘诀",
    "excerptKo": "배추 절일 때 소금물 온도가 제일 중요해 ~ 찬물에 하면 아삭함이 살고 미지근하면 물러짐. 우리 집 비법임 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "배추 절일 때 소금물 온도가 제일 중요해 ~",
          "zh": "腌白菜的时候盐水温度最重要～",
          "t": [
            0,
            3.17
          ]
        },
        {
          "ko": "찬물에 하면 아삭함이 살고 미지근하면 물러짐.",
          "zh": "冷水腌才脆，温的水就软了。",
          "t": [
            3.57,
            7.69
          ]
        },
        {
          "ko": "우리 집 비법임 ㅋㅋ",
          "zh": "我们家的独门秘诀哈哈",
          "t": [
            8.09,
            9.51
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "역시 할머니 손맛은 과학이네요",
          "zh": "果然奶奶的手艺也是科学",
          "audioUrl": "/audio/blog/comments/p2-granny-kimchi-tip-c0.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "jeju",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-kimchi-tip.mp3",
    "audioDuration": 10,
    "coverEmoji": "🥬",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "granny",
    "likeCount": 53,
    "publishedAt": 1784761200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-02",
    "slug": "p2-slow-morning",
    "titleKo": "아침에 일어나는 데 한 시간",
    "titleZh": "早上醒来要花一个小时",
    "excerptKo": "눈은 떴는데 몸이 안 움직임. 침대에서 나오는 데만 한 시간 걸리는 사람 나만은 아니겠지 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "눈은 떴는데 몸이 안 움직임.",
          "zh": "眼睛睁开了身体却不动。",
          "t": [
            0,
            2.65
          ]
        },
        {
          "ko": "침대에서 나오는 데만 한 시간 걸리는 사람 나만은 아니겠지 ㅋㅋ",
          "zh": "光是从床上爬起来就要一小时的人不止我一个吧哈哈",
          "t": [
            3.05,
            7.54
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "저는 두 시간 걸립니다 ㅋㅋㅋ",
          "zh": "我要两小时哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-slow-morning-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "gapyeong",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-morning.mp3",
    "audioDuration": 8,
    "coverEmoji": "🛏️",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "slow",
    "likeCount": 44,
    "publishedAt": 1784761200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-01",
    "slug": "p2-gapyeong-alarm",
    "titleKo": "알람 5개 다 껐다 진짜 ㅋㅋㅋ",
    "titleZh": "五个闹钟全被我关了哈哈哈",
    "excerptKo": "아 오늘도 알람 5개 다 껐어… 가게 문 여는 게 세상에서 제일 힘든 일 ㅋㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아 오늘도 알람 5개 다 껐어…",
          "zh": "啊今天又把5个闹钟全关了…",
          "t": [
            0,
            2.84
          ]
        },
        {
          "ko": "가게 문 여는 게 세상에서 제일 힘든 일 ㅋㅋㅋㅋ",
          "zh": "开店门真是天底下最难的事哈哈哈",
          "t": [
            3.24,
            6.89
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "저도요… 알람이랑 매일 싸워요 ㅋㅋ",
          "zh": "我也是…每天都在跟闹钟打架哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-alarm-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "busan",
        "nightowl",
        "darami"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-alarm.mp3",
    "audioDuration": 7,
    "coverEmoji": "⏰",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gapyeong",
    "likeCount": 41,
    "publishedAt": 1784764800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-02",
    "slug": "p2-retiree-weekdays",
    "titleKo": "평일 낮의 여유",
    "titleZh": "工作日下午的从容",
    "excerptKo": "은퇴의 최고 장점: 평일 낮에 카페 가도 자리 있음. 사람도 없고 조용함. 이걸 왜 다들 은퇴하고 나서야 알게 되는 걸까",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "은퇴의 최고 장점: 평일 낮에 카페 가도 자리 있음.",
          "zh": "退休的最大好处：工作日下午去咖啡馆也有空位。",
          "t": [
            0,
            4.88
          ]
        },
        {
          "ko": "사람도 없고 조용함. 이걸 왜 다들 은퇴하고 나서야 알게 되는 걸까",
          "zh": "人少安静。为什么大家都退休后才知道这个呢",
          "t": [
            5.28,
            11.15
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "부럽습니다 저는 지금 카페서 노트북 펴고 일 중 ㅠ",
          "zh": "好羡慕 我在咖啡馆刚摊开笔记本在工作呜",
          "audioUrl": "/audio/blog/comments/p2-retiree-weekdays-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "founder",
        "granny",
        "slow"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-weekdays.mp3",
    "audioDuration": 11,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 59,
    "publishedAt": 1784772000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-02",
    "slug": "p2-jeju-wind",
    "titleKo": "제주 바람 장난 아님",
    "titleZh": "济州的风不是闹着玩的",
    "excerptKo": "우산 쓰면 바로 뒤집힘. 육지 사람들 제주 바람 무시하지 마세요 진짜 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "우산 쓰면 바로 뒤집힘.",
          "zh": "打伞立马被吹翻。",
          "t": [
            0,
            2.46
          ]
        },
        {
          "ko": "육지 사람들 제주 바람 무시하지 마세요 진짜 ㅋㅋㅋ",
          "zh": "陆地上的各位别小看济州的风真的哈哈哈",
          "t": [
            2.86,
            7.4
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "거기서 뛰면 운동 두 배 되겠네요 ㅋㅋ",
          "zh": "在那儿跑步运动量得翻倍哈哈",
          "audioUrl": "/audio/blog/comments/p2-jeju-wind-c0.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "busan",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-wind.mp3",
    "audioDuration": 7,
    "coverEmoji": "💨",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "jeju",
    "likeCount": 47,
    "publishedAt": 1784775600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-02",
    "slug": "p2-busan-milmyeon",
    "titleKo": "서울 밀면은 왜 이래",
    "titleZh": "首尔的小麦冷面为啥这样",
    "excerptKo": "서울에서 밀면 시켰는데 이게 밀면이라고?? 부산 가고 싶다 진심 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "서울에서 밀면 시켰는데 이게 밀면이라고??",
          "zh": "在首尔点了小麦冷面，这也叫小麦冷面？？",
          "t": [
            0,
            3.78
          ]
        },
        {
          "ko": "부산 가고 싶다 진심 ㅠㅠ",
          "zh": "真心想回釜山啊呜呜",
          "t": [
            4.18,
            6.26
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "지역 음식은 현지가 진리죠 ㅋㅋ",
          "zh": "地方美食还得是本地的哈哈",
          "audioUrl": "/audio/blog/comments/p2-busan-milmyeon-c0.mp3"
        },
        {
          "animalId": "granny",
          "ko": "집밥이 그리운 게지 ~",
          "zh": "是想家里的饭了吧～",
          "audioUrl": "/audio/blog/comments/p2-busan-milmyeon-c1.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "granny",
        "salaryman",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-milmyeon.mp3",
    "audioDuration": 6,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "busan",
    "likeCount": 38,
    "publishedAt": 1784779200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-02",
    "slug": "p2-florist-rain",
    "titleKo": "비 오는 날 손님이 없어",
    "titleZh": "下雨天没客人",
    "excerptKo": "비 오니까 손님이 한 명도 없음. 꽃이랑 단둘이 있는 기분 ㅋㅋ 그래도 비 오는 날 꽃이 더 싱싱해 보여서 좋네",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "비 오니까 손님이 한 명도 없음.",
          "zh": "下雨了一个客人也没有。",
          "t": [
            0,
            3.08
          ]
        },
        {
          "ko": "꽃이랑 단둘이 있는 기분 ㅋㅋ",
          "zh": "感觉跟花单独待在一起哈哈",
          "t": [
            3.48,
            5.13
          ]
        },
        {
          "ko": "그래도 비 오는 날 꽃이 더 싱싱해 보여서 좋네",
          "zh": "不过雨天花看起来更新鲜挺好的",
          "t": [
            5.53,
            8.99
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "조용한 꽃집도 운치 있네요 ㅎㅎ",
          "zh": "安静的店也别有味道呵呵",
          "audioUrl": "/audio/blog/comments/p2-florist-rain-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "granny",
        "slow"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-rain.mp3",
    "audioDuration": 9,
    "coverEmoji": "🌧️",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 31,
    "publishedAt": 1784782800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-02",
    "slug": "p2-newmom-shower",
    "titleKo": "오늘 혼자 샤워 10분",
    "titleZh": "今天独自洗澡10分钟",
    "excerptKo": "아기 재우고 10분 샤워함. 샴푸도 제대로 하고 바디워시도 함. 이게 무슨 럭셔리 스파인 줄 ㅋㅋㅋ 엄마들 공감?",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아기 재우고 10분 샤워함.",
          "zh": "把宝宝哄睡了洗了10分钟的澡。",
          "t": [
            0,
            2.84
          ]
        },
        {
          "ko": "샴푸도 제대로 하고 바디워시도 함. 이게 무슨 럭셔리 스파인 줄 ㅋㅋㅋ",
          "zh": "还好好洗了头擦了沐浴露。这都赶得上豪华水疗了哈哈哈",
          "t": [
            3.24,
            8.78
          ]
        },
        {
          "ko": "엄마들 공감?",
          "zh": "妈妈们有同感吗？",
          "t": [
            9.18,
            10.31
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "완전 공감 ~ 나도 젊을 때 화장실이 유일한 도피처였어 ㅋㅋ",
          "zh": "完全同感～我年轻时厕所也是唯一的避难所哈哈",
          "audioUrl": "/audio/blog/comments/p2-newmom-shower-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "nurse",
        "jeju",
        "busan"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-shower.mp3",
    "audioDuration": 10,
    "coverEmoji": "🚿",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "newmom",
    "likeCount": 79,
    "publishedAt": 1784782800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-02",
    "slug": "p2-gapyeong-strawberry-cake",
    "titleKo": "딸기 케이크 먹고 인생 용서함 🍓",
    "titleZh": "吃了草莓蛋糕，原谅一切",
    "excerptKo": "손님이 딸기 케이크 남은 거 그냥 드시래서 먹었는데 진짜… 오늘 하루 다 용서됨 🍓",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "손님이 딸기 케이크 남은 거 그냥 드시래서 먹었는데 진짜…",
          "zh": "客人说剩的草莓蛋糕给我吃，结果真的…",
          "t": [
            0,
            5.49
          ]
        },
        {
          "ko": "오늘 하루 다 용서됨 🍓",
          "zh": "今天一整天的累都被原谅了",
          "t": [
            5.89,
            7.74
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "haru",
          "ko": "딸기 케이크는 진리죠 ㅠㅠ 부러워요",
          "zh": "草莓蛋糕就是真理啊呜呜 好羡慕",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-strawberry-cake-c0.mp3"
        },
        {
          "animalId": "tori",
          "ko": "헐 저도 먹고 싶다…",
          "zh": "天 我也想吃…",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-strawberry-cake-c1.mp3"
        }
      ],
      "likedBy": [
        "haru",
        "tori",
        "minji",
        "florist",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-strawberry-cake.mp3",
    "audioDuration": 8,
    "coverEmoji": "🍓",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "gapyeong",
    "likeCount": 58,
    "publishedAt": 1784786400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-02",
    "slug": "p2-salaryman-coffee",
    "titleKo": "커피 네 잔째",
    "titleZh": "第四杯咖啡",
    "excerptKo": "오늘 커피 네 잔째임. 손이 떨리는데도 자꾸 마시게 됨. 이것도 직업병인가 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "오늘 커피 네 잔째임.",
          "zh": "今天第四杯咖啡。",
          "t": [
            0,
            1.99
          ]
        },
        {
          "ko": "손이 떨리는데도 자꾸 마시게 됨. 이것도 직업병인가 ㅋㅋㅋ",
          "zh": "手都在抖了还是忍不住喝。这算职业病吗哈哈哈",
          "t": [
            2.39,
            8.17
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "저는 다섯 잔째입니다 ㅋㅋㅋ",
          "zh": "我已经第五杯了哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-salaryman-coffee-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "coder",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-coffee.mp3",
    "audioDuration": 8,
    "coverEmoji": "☕",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "salaryman",
    "likeCount": 41,
    "publishedAt": 1784786400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-02",
    "slug": "p2-carpenter-table",
    "titleKo": "한 달 걸린 식탁 완성",
    "titleZh": "花了一个月的餐桌完工了",
    "excerptKo": "한 달 동안 만든 원목 식탁 오늘 완성. 사진 찍어서 올림. 손으로 직접 사포질하고 오일 마감까지 다 함. 이 맛에 목수 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "한 달 동안 만든 원목 식탁 오늘 완성.",
          "zh": "做了一个月的实木餐桌今天完成了。",
          "t": [
            0,
            4.12
          ]
        },
        {
          "ko": "사진 찍어서 올림. 손으로 직접 사포질하고 오일 마감까지 다 함.",
          "zh": "拍了照放上来。亲手打磨上油了。",
          "t": [
            4.52,
            11.2
          ]
        },
        {
          "ko": "이 맛에 목수 함",
          "zh": "就是为这个才做木匠的",
          "t": [
            11.6,
            13.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "seolgi",
          "ko": "진짜 예뻐요 이런 가구는 살 수가 없죠",
          "zh": "真的漂亮 这种家具买不到的",
          "audioUrl": "/audio/blog/comments/p2-carpenter-table-c0.mp3"
        },
        {
          "animalId": "retiree",
          "ko": "정성 들인 게 보여서 멋지네요",
          "zh": "能看出花了心思 很了不起",
          "audioUrl": "/audio/blog/comments/p2-carpenter-table-c1.mp3"
        }
      ],
      "likedBy": [
        "seolgi",
        "retiree",
        "granny",
        "newmom"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-table.mp3",
    "audioDuration": 13,
    "coverEmoji": "🪵",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "carpenter",
    "likeCount": 78,
    "publishedAt": 1784797200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-02",
    "slug": "p2-runner-lazy",
    "titleKo": "오늘 러닝 귀찮음",
    "titleZh": "今天不想跑步",
    "excerptKo": "나가서 뛰기까지가 제일 힘듦. 오늘도 30분 동안 신발 신고 말고 고민 중 ㅋㅋ 결국 갈 거긴 한데…",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "나가서 뛰기까지가 제일 힘듦.",
          "zh": "最难的是出门之前那一段。",
          "t": [
            0,
            3.03
          ]
        },
        {
          "ko": "오늘도 30분 동안 신발 신고 말고 고민 중 ㅋㅋ 결국 갈 거긴 한데…",
          "zh": "今天又花30分钟纠结要不要穿鞋哈哈 最终还是会去但…",
          "t": [
            3.43,
            9.78
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "slow",
          "ko": "안 가도 괜찮아요 오늘은 쉬는 날로 ㅋㅋ",
          "zh": "不去也没关系 今天就当休息日哈哈",
          "audioUrl": "/audio/blog/comments/p2-runner-lazy-c0.mp3"
        }
      ],
      "likedBy": [
        "slow",
        "student",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-lazy.mp3",
    "audioDuration": 10,
    "coverEmoji": "👟",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "runner",
    "likeCount": 36,
    "publishedAt": 1784797200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-02",
    "slug": "p2-cook1-pasta-fail",
    "titleKo": "파스타 또 망함",
    "titleZh": "意面又失败了",
    "excerptKo": "유튜브 보고 따라 했는데 왜 내 건 면이 뭉치는 걸까 ㅠㅠ 사진이랑 다른 음식들 다 모여라 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "유튜브 보고 따라 했는데 왜 내 건 면이 뭉치는 걸까 ㅠㅠ",
          "zh": "照着YouTube做的为什么我的面总是粘成一坨呜呜",
          "t": [
            0,
            4.26
          ]
        },
        {
          "ko": "사진이랑 다른 음식들 다 모여라 ㅋㅋ",
          "zh": "做出来跟图片不一样的菜品都集合吧哈哈",
          "t": [
            4.66,
            7.22
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "student",
          "ko": "저도 백종원 레시피 따라 했다가 망함 ㅋㅋ",
          "zh": "我跟着白钟元食谱做也翻车了哈哈",
          "audioUrl": "/audio/blog/comments/p2-cook1-pasta-fail-c0.mp3"
        }
      ],
      "likedBy": [
        "student",
        "baker",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-pasta-fail.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍝",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "cook1",
    "likeCount": 37,
    "publishedAt": 1784800800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-02",
    "slug": "p2-daegu-makchang",
    "titleKo": "막창 먹고 싶다 진심으로",
    "titleZh": "真心想吃烤肠",
    "excerptKo": "갑자기 대구 막창 미친 듯이 땡김. 서울에도 파는 데 있나요 얘들아 알려줘요 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "갑자기 대구 막창 미친 듯이 땡김.",
          "zh": "突然疯狂想吃大邱烤肠。",
          "t": [
            0,
            3.51
          ]
        },
        {
          "ko": "서울에도 파는 데 있나요 얘들아 알려줘요 ㅠㅠ",
          "zh": "首尔有卖的地方吗宝子们告诉我呜呜",
          "t": [
            3.91,
            7.46
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "동대문 쪽에 유명한 집 있어요!",
          "zh": "东大门那边有家有名的！",
          "audioUrl": "/audio/blog/comments/p2-daegu-makchang-c0.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "busan",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-makchang.mp3",
    "audioDuration": 7,
    "coverEmoji": "🍢",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "daegu",
    "likeCount": 46,
    "publishedAt": 1784800800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-02",
    "slug": "p2-nurse-elderly",
    "titleKo": "할머니 환자분이 주신 사탕",
    "titleZh": "老奶奶病人给的糖",
    "excerptKo": "입원 중인 할머니가 \"고생한다\"면서 주머니에서 사탕 꺼내주심 ㅠㅠ 할머니들 사탕이 제일 달아요 진짜",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "입원 중인 할머니가 \"고생한다\"면서 주머니에서 사탕 꺼내주심 ㅠㅠ",
          "zh": "住院的奶奶说\"辛苦了\"从兜里掏出糖给了我呜呜",
          "t": [
            0,
            5.02
          ]
        },
        {
          "ko": "할머니들 사탕이 제일 달아요 진짜",
          "zh": "奶奶们给的糖真的最甜",
          "t": [
            5.42,
            9.11
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "우리도 손주 보는 마음이야 ~",
          "zh": "我们也是当孙子孙女看的心情呀～",
          "audioUrl": "/audio/blog/comments/p2-nurse-elderly-c0.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "retiree",
        "newmom",
        "florist"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-elderly.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍬",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "nurse",
    "likeCount": 76,
    "publishedAt": 1784804400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-02",
    "slug": "p2-rider-elevator",
    "titleKo": "엘리베이터 없는 건물",
    "titleZh": "没电梯的楼",
    "excerptKo": "5층까지 걸어서 배달 갔다 왔음. 다리 터질 뻔 ㅋㅋ 그래도 \"고생하셨어요\" 별 다섯 개 주면 만사 오케이",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "5층까지 걸어서 배달 갔다 왔음.",
          "zh": "爬五楼送了一趟。",
          "t": [
            0,
            3.03
          ]
        },
        {
          "ko": "다리 터질 뻔 ㅋㅋ 그래도 \"고생하셨어요\" 별 다섯 개 주면 만사 오케이",
          "zh": "腿快炸了哈哈 但一句\"辛苦了\"再给五星一切就值了",
          "t": [
            3.43,
            10.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "매일 등산하는 셈이네요 ㅋㅋ",
          "zh": "每天都等于在登山哈哈",
          "audioUrl": "/audio/blog/comments/p2-rider-elevator-c0.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "coder",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-elevator.mp3",
    "audioDuration": 10,
    "coverEmoji": "🛗",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "rider",
    "likeCount": 55,
    "publishedAt": 1784808000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-02",
    "slug": "p2-seolgi-idea-shower",
    "titleKo": "아이디어는 왜 샤워할 때만",
    "titleZh": "灵感为啥只在洗澡时来",
    "excerptKo": "하루 종일 안 떠오르던 아이디어가 샤워하자마자 폭발함. 물 틀면 뇌도 켜지나 봄 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "하루 종일 안 떠오르던 아이디어가 샤워하자마자 폭발함.",
          "zh": "一整天都想不出的灵感一洗澡就炸开了。",
          "t": [
            0,
            5.06
          ]
        },
        {
          "ko": "물 틀면 뇌도 켜지나 봄 ㅋㅋㅋ",
          "zh": "一放水脑子是不是也跟着开机了哈哈哈",
          "t": [
            5.46,
            7.88
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "코드도 샤워할 때 풀려요 ㅋㅋ",
          "zh": "写代码也是洗澡时才想通哈哈",
          "audioUrl": "/audio/blog/comments/p2-seolgi-idea-shower-c0.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "actor",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-idea-shower.mp3",
    "audioDuration": 8,
    "coverEmoji": "🚿",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "seolgi",
    "likeCount": 48,
    "publishedAt": 1784808000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-02",
    "slug": "p2-student-ramen",
    "titleKo": "컵라면이 내 친구",
    "titleZh": "杯面是我的朋友",
    "excerptKo": "일주일째 점심 저녁 컵라면임. 영양실조는 둘째 치고 이제 라면 냄새만 맡아도 속이 쓰림 ㅠㅠ 그래도 오늘도 뜯음",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "일주일째 점심 저녁 컵라면임.",
          "zh": "连续一周午饭晚饭都是杯面。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "영양실조는 둘째 치고 이제 라면 냄새만 맡아도 속이 쓰림 ㅠㅠ",
          "zh": "营不营养先不说现在光闻泡面味就烧心呜呜",
          "t": [
            3.62,
            9.01
          ]
        },
        {
          "ko": "그래도 오늘도 뜯음",
          "zh": "但今天还是拆了一盒",
          "t": [
            9.41,
            11.02
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "나중에 위장 망가져요 챙겨 드세요 ㅠ",
          "zh": "以后胃会坏的 好好吃饭吧呜",
          "audioUrl": "/audio/blog/comments/p2-student-ramen-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "컵라면 앞에선 우리 다 똑같아",
          "zh": "在杯面面前咱们都一样",
          "audioUrl": "/audio/blog/comments/p2-student-ramen-c1.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "nightowl",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-ramen.mp3",
    "audioDuration": 11,
    "coverEmoji": "🍜",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "student",
    "likeCount": 55,
    "publishedAt": 1784808000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-02",
    "slug": "p2-coder-bug",
    "titleKo": "어제까지 됐는데 왜 안 됨",
    "titleZh": "昨天还好好的今天咋就不行了",
    "excerptKo": "분명 어제까지 잘 됐는데 오늘 갑자기 에러남. 코드는 안 건드렸는데 왜… 컴퓨터가 미쳤나 봄",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "분명 어제까지 잘 됐는데 오늘 갑자기 에러남.",
          "zh": "明明昨天还好好的今天突然报错。",
          "t": [
            0,
            5.26
          ]
        },
        {
          "ko": "코드는 안 건드렸는데 왜… 컴퓨터가 미쳤나 봄",
          "zh": "代码我又没动为啥…电脑是不是疯了",
          "t": [
            5.66,
            10.58
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "그거 원래 안 건드렸다고 하죠 ㅋㅋㅋ",
          "zh": "大家都说自己没动过哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-coder-bug-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "founder",
        "student",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-bug.mp3",
    "audioDuration": 11,
    "coverEmoji": "🐛",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "coder",
    "likeCount": 55,
    "publishedAt": 1784811600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-02",
    "slug": "p2-taxi-drunk",
    "titleKo": "취객의 인생 상담",
    "titleZh": "醉汉的人生咨询",
    "excerptKo": "밤에 취한 손님 태웠는데 차에서 인생 상담함. 택시 기사가 바텐더도 하는 줄 아나 봄 ㅋㅋ 그래도 들어줌",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "밤에 취한 손님 태웠는데 차에서 인생 상담함.",
          "zh": "晚上拉了个醉客在车上跟我聊人生。",
          "t": [
            0,
            4.69
          ]
        },
        {
          "ko": "택시 기사가 바텐더도 하는 줄 아나 봄 ㅋㅋ 그래도 들어줌",
          "zh": "可能觉得出租车司机也兼酒保吧哈哈 但还是听着了",
          "t": [
            5.09,
            9.83
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nurse",
          "ko": "저도 야간 근무 때 환자분들 인생사 들어요 ㅋㅋ",
          "zh": "我夜班也听病人讲人生故事哈哈",
          "audioUrl": "/audio/blog/comments/p2-taxi-drunk-c0.mp3"
        }
      ],
      "likedBy": [
        "nurse",
        "nightowl",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-drunk.mp3",
    "audioDuration": 10,
    "coverEmoji": "🍺",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "taxi",
    "likeCount": 45,
    "publishedAt": 1784815200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-firefighter-01",
    "slug": "p2-firefighter-night-shift",
    "titleKo": "야간 근무 중 사이렌",
    "titleZh": "夜班中警铃响",
    "excerptKo": "자려고 누웠는데 사이렌 울리면 1분 안에 장비 다 차고 출동. 몸이 기억하고 있음. 이게 훈련의 힘인가 봄 🚒",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "자려고 누웠는데 사이렌 울리면 1분 안에 장비 다 차고 출동.",
          "zh": "刚躺下想睡如果警铃响了一分钟内装备全穿好就出动。",
          "t": [
            0,
            6.01
          ]
        },
        {
          "ko": "몸이 기억하고 있음. 이게 훈련의 힘인가 봄 🚒",
          "zh": "身体自己记住了。这就是训练的力量吧",
          "t": [
            6.41,
            12
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nurse",
          "ko": "저도 응급 호출 벨 소리 들으면 바로 일어나요",
          "zh": "我也是听到紧急呼叫铃立刻就能起来",
          "audioUrl": "/audio/blog/comments/p2-firefighter-night-shift-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "존경합니다 진짜 영웅이세요",
          "zh": "尊敬 真是英雄啊",
          "audioUrl": "/audio/blog/comments/p2-firefighter-night-shift-c1.mp3"
        }
      ],
      "likedBy": [
        "nurse",
        "nightowl",
        "gapyeong",
        "busan",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-firefighter-night-shift.mp3",
    "audioDuration": 12,
    "coverEmoji": "🚒",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "firefighter",
    "likeCount": 73,
    "publishedAt": 1784826000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-baker-01",
    "slug": "p2-baker-3am",
    "titleKo": "새벽 세 시 반죽 시작",
    "titleZh": "凌晨三点开始揉面",
    "excerptKo": "사람들 자는 시간에 반죽 시작함. 조용한 주방에서 반죽 치대는 소리만 나는 이 시간이 제일 좋음 🥐 다들 일어나면 따뜻한 빵 먹으러 와요",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "사람들 자는 시간에 반죽 시작함.",
          "zh": "在所有人睡觉的时候开始揉面。",
          "t": [
            0,
            2.98
          ]
        },
        {
          "ko": "조용한 주방에서 반죽 치대는 소리만 나는 이 시간이 제일 좋음 🥐",
          "zh": "安静的厨房里只有揉面的声音 最喜欢这个时刻",
          "t": [
            3.38,
            8.31
          ]
        },
        {
          "ko": "다들 일어나면 따뜻한 빵 먹으러 와요",
          "zh": "大家起床后来吃热面包吧",
          "t": [
            8.71,
            11.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "nightowl",
          "ko": "저도 일 끝나고 가끔 빵집 냄새 맡으러 가요 ㅋㅋ",
          "zh": "我下班后也偶尔去面包店闻闻味哈哈",
          "audioUrl": "/audio/blog/comments/p2-baker-3am-c0.mp3"
        }
      ],
      "likedBy": [
        "nightowl",
        "rider",
        "granny",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-baker-3am.mp3",
    "audioDuration": 11,
    "coverEmoji": "🥐",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "baker",
    "likeCount": 57,
    "publishedAt": 1784829600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nightowl-01",
    "slug": "p2-nightowl-3am",
    "titleKo": "지금 안 자는 사람 손",
    "titleZh": "现在还没睡的举手",
    "excerptKo": "새벽 세 시인데 눈이 말똥말똥함. 지금 안 자고 이거 보는 사람 우리 친구 하자 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽 세 시인데 눈이 말똥말똥함.",
          "zh": "凌晨三点了眼睛还贼精神。",
          "t": [
            0,
            3.88
          ]
        },
        {
          "ko": "지금 안 자고 이거 보는 사람 우리 친구 하자 ㅋㅋ",
          "zh": "现在没睡在看这条的咱们做朋友吧哈哈",
          "t": [
            4.28,
            8.11
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "접니다 야근 중이에요 ㅠㅠ",
          "zh": "是我 加班中呜呜",
          "audioUrl": "/audio/blog/comments/p2-nightowl-3am-c0.mp3"
        },
        {
          "animalId": "nurse",
          "ko": "저도요 지금 야간 근무…",
          "zh": "我也是 现在上夜班…",
          "audioUrl": "/audio/blog/comments/p2-nightowl-3am-c1.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "nurse",
        "gapyeong",
        "student"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nightowl-3am.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌙",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "nightowl",
    "likeCount": 62,
    "publishedAt": 1784829600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-nurse-01",
    "slug": "p2-nurse-night-shift-3",
    "titleKo": "야간 근무 셋째 날",
    "titleZh": "夜班第三天",
    "excerptKo": "야간 연속 셋째 날. 커피로 연명 중. 그래도 환자분들이 \"간호사님 고생하세요\" 하면 눈물 날 뻔 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "야간 연속 셋째 날. 커피로 연명 중.",
          "zh": "连上第三个夜班。靠咖啡续命。",
          "t": [
            0,
            3.88
          ]
        },
        {
          "ko": "그래도 환자분들이 \"간호사님 고생하세요\" 하면 눈물 날 뻔 ㅠㅠ",
          "zh": "但病人说\"护士您辛苦了\"的时候差点哭了呜呜",
          "t": [
            4.28,
            9.39
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "firefighter",
          "ko": "야간 근무 동지여 힘내요 ㅠ",
          "zh": "夜班的同志 加油呜",
          "audioUrl": "/audio/blog/comments/p2-nurse-night-shift-3-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "밤에 일하는 사람들 다 응원합니다",
          "zh": "支持所有夜里工作的人",
          "audioUrl": "/audio/blog/comments/p2-nurse-night-shift-3-c1.mp3"
        }
      ],
      "likedBy": [
        "firefighter",
        "nightowl",
        "rider",
        "taxi"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-nurse-night-shift-3.mp3",
    "audioDuration": 9,
    "coverEmoji": "🩺",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "nurse",
    "likeCount": 68,
    "publishedAt": 1784829600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-newmom-01",
    "slug": "p2-newmom-sleep",
    "titleKo": "통잠 못 잔 지 6개월",
    "titleZh": "6个月没睡过整觉了",
    "excerptKo": "아기 태어나고 통잠 자본 적 없음. 2시간마다 깨는 게 일상. 근데 아기 웃는 얼굴 보면 다 용서됨 ㅠㅠ 이게 엄마 마법",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아기 태어나고 통잠 자본 적 없음.",
          "zh": "孩子出生后就没睡过一个整觉。",
          "t": [
            0,
            2.98
          ]
        },
        {
          "ko": "2시간마다 깨는 게 일상.",
          "zh": "两小时醒一次是日常。",
          "t": [
            3.38,
            5.6
          ]
        },
        {
          "ko": "근데 아기 웃는 얼굴 보면 다 용서됨 ㅠㅠ 이게 엄마 마법",
          "zh": "但看到宝宝笑的脸一切都不计较了呜呜 这就是妈妈魔法",
          "t": [
            6,
            11.11
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "나도 그땐 그랬어 ~ 금방 큰다 아가",
          "zh": "我那时候也是啊～很快就长大了孩子",
          "audioUrl": "/audio/blog/comments/p2-newmom-sleep-c0.mp3"
        },
        {
          "animalId": "nurse",
          "ko": "엄마들 진짜 존경해요 매일 밤샘 근무",
          "zh": "真心尊敬妈妈们 每天都是夜班",
          "audioUrl": "/audio/blog/comments/p2-newmom-sleep-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "nurse",
        "florist",
        "newmom"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-newmom-sleep.mp3",
    "audioDuration": 11,
    "coverEmoji": "🍼",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "newmom",
    "likeCount": 82,
    "publishedAt": 1784833200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-taxi-01",
    "slug": "p2-taxi-crazy-fare",
    "titleKo": "오늘 첫 손님이 대박",
    "titleZh": "今天第一个乘客太牛了",
    "excerptKo": "새벽 다섯 시 첫 손님이 강남에서 인천공항 갔음. 하루 매출 반은 벌었네 ㅋㅋ 기분 좋게 시작 🚕",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "새벽 다섯 시 첫 손님이 강남에서 인천공항 갔음.",
          "zh": "凌晨五点第一个乘客从江南去仁川机场。",
          "t": [
            0,
            5.69
          ]
        },
        {
          "ko": "하루 매출 반은 벌었네 ㅋㅋ 기분 좋게 시작 🚕",
          "zh": "一天的收入搞定了一半哈哈 心情好好开始",
          "t": [
            6.09,
            10.16
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "rider",
          "ko": "장거리 손님 최고죠 축하드려요",
          "zh": "远程乘客最棒了 恭喜",
          "audioUrl": "/audio/blog/comments/p2-taxi-crazy-fare-c0.mp3"
        }
      ],
      "likedBy": [
        "rider",
        "salaryman",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-taxi-crazy-fare.mp3",
    "audioDuration": 10,
    "coverEmoji": "🚕",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "taxi",
    "likeCount": 36,
    "publishedAt": 1784836800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-granny-01",
    "slug": "p2-granny-morning-market",
    "titleKo": "아침 시장은 사람 사는 냄새",
    "titleZh": "早市是人活着的气味",
    "excerptKo": "아침 여섯 시 시장에 나왔는데 벌써 사람들 북적북적. 채소 사는 소리 생선 파는 소리 이게 다 살아있는 거지 ~",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침 여섯 시 시장에 나왔는데 벌써 사람들 북적북적.",
          "zh": "早上六点来市场已经人挤人了。",
          "t": [
            0,
            5.58
          ]
        },
        {
          "ko": "채소 사는 소리 생선 파는 소리 이게 다 살아있는 거지 ~",
          "zh": "买菜的人声卖鱼的吆喝 这不都是活生生的嘛～",
          "t": [
            5.98,
            10.43
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "retiree",
          "ko": "시장 냄새가 제일 편안해요 ㅎㅎ",
          "zh": "市场的气味最让人安心呵",
          "audioUrl": "/audio/blog/comments/p2-granny-morning-market-c0.mp3"
        }
      ],
      "likedBy": [
        "retiree",
        "gapyeong",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-granny-morning-market.mp3",
    "audioDuration": 10,
    "coverEmoji": "🧺",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "granny",
    "likeCount": 44,
    "publishedAt": 1784840400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-retiree-01",
    "slug": "p2-retiree-mountain",
    "titleKo": "오늘 북한산 정복",
    "titleZh": "今天征服北汉山",
    "excerptKo": "은퇴 후에 산 타는 재미에 빠짐. 오늘 북한산 정상 찍고 커피 한 잔 하니까 세상 부러울 게 없네 ㅎㅎ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "은퇴 후에 산 타는 재미에 빠짐.",
          "zh": "退休后迷上了爬山的乐趣。",
          "t": [
            0,
            3.22
          ]
        },
        {
          "ko": "오늘 북한산 정상 찍고 커피 한 잔 하니까 세상 부러울 게 없네 ㅎㅎ",
          "zh": "今天登了北汉山顶喝杯咖啡世上没什么可羡慕的了呵呵",
          "t": [
            3.62,
            9.06
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "다음엔 같이 가요 등산화 샀어요!",
          "zh": "下次一起去吧 我买了登山鞋！",
          "audioUrl": "/audio/blog/comments/p2-retiree-mountain-c0.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "granny",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-retiree-mountain.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍵",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "retiree",
    "likeCount": 67,
    "publishedAt": 1784844000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-carpenter-01",
    "slug": "p2-carpenter-wood-smell",
    "titleKo": "나무 냄새가 제일 좋음",
    "titleZh": "木头味最好闻",
    "excerptKo": "작업장에 들어서면 톱밥 냄새가 제일 먼저 반겨줌. 이 냄새 맡으면 마음이 진짜 편안해짐. 목수의 특권임 ㅋㅋ 🔨",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "작업장에 들어서면 톱밥 냄새가 제일 먼저 반겨줌.",
          "zh": "走进工坊最先迎接我的是锯末的气味。",
          "t": [
            0,
            4.21
          ]
        },
        {
          "ko": "이 냄새 맡으면 마음이 진짜 편안해짐. 목수의 특권임 ㅋㅋ 🔨",
          "zh": "闻到这个味道心就真的平静下来。是木匠的特权哈哈",
          "t": [
            4.61,
            9.58
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "baker",
          "ko": "저희 빵집도 밀가루 냄새 최고 ㅋㅋ",
          "zh": "我们面包店的麦粉味也最棒哈哈",
          "audioUrl": "/audio/blog/comments/p2-carpenter-wood-smell-c0.mp3"
        }
      ],
      "likedBy": [
        "baker",
        "retiree",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-carpenter-wood-smell.mp3",
    "audioDuration": 10,
    "coverEmoji": "🔨",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "carpenter",
    "likeCount": 43,
    "publishedAt": 1784847600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-florist-01",
    "slug": "p2-florist-sunflower",
    "titleKo": "오늘 해바라기 입고",
    "titleZh": "今天向日葵到货",
    "excerptKo": "아침에 해바라기 한 다발 들어왔는데 가게가 한순간에 노란색으로 물듦. 해바라기 보면 무조건 기분 좋아짐 🌻",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침에 해바라기 한 다발 들어왔는데 가게가 한순간에 노란색으로 물듦.",
          "zh": "早上进了一批向日葵，店里一瞬间被染成了黄色。",
          "t": [
            0,
            5.78
          ]
        },
        {
          "ko": "해바라기 보면 무조건 기분 좋아짐 🌻",
          "zh": "看到向日葵绝对心情变好",
          "t": [
            6.18,
            9.26
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "seolgi",
          "ko": "해바라기 그리러 갈게요!!",
          "zh": "我要去画向日葵!!",
          "audioUrl": "/audio/blog/comments/p2-florist-sunflower-c0.mp3"
        }
      ],
      "likedBy": [
        "seolgi",
        "jeju",
        "granny",
        "retiree"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-florist-sunflower.mp3",
    "audioDuration": 9,
    "coverEmoji": "🌻",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "florist",
    "likeCount": 43,
    "publishedAt": 1784847600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-jeju-01",
    "slug": "p2-jeju-sea-everyday",
    "titleKo": "바다 매일 봐도 안 질림",
    "titleZh": "海每天看都看不腻",
    "excerptKo": "제주 살면 바다 안 질리냐고 묻는데… 안 질림. 매일 색이 달라서 진짜 안 질림 🌊",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "제주 살면 바다 안 질리냐고 묻는데…",
          "zh": "有人问住济州会不会看海看腻…",
          "t": [
            0,
            3.46
          ]
        },
        {
          "ko": "안 질림. 매일 색이 달라서 진짜 안 질림 🌊",
          "zh": "不腻。每天颜色都不一样 真的不腻",
          "t": [
            3.86,
            7.93
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "busan",
          "ko": "부산 펭귄도 인정 바다는 진리 🌊",
          "zh": "釜山企鹅也认 海就是真理",
          "audioUrl": "/audio/blog/comments/p2-jeju-sea-everyday-c0.mp3"
        },
        {
          "animalId": "seolgi",
          "ko": "바다 색 그리고 싶다 진짜",
          "zh": "真想把海的颜色画下来",
          "audioUrl": "/audio/blog/comments/p2-jeju-sea-everyday-c1.mp3"
        }
      ],
      "likedBy": [
        "busan",
        "seolgi",
        "gapyeong",
        "runner"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-jeju-sea-everyday.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌊",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "jeju",
    "likeCount": 64,
    "publishedAt": 1784851200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-slow-01",
    "slug": "p2-slow-no-rush",
    "titleKo": "천천히 해도 괜찮아",
    "titleZh": "慢慢来也没关系",
    "excerptKo": "다들 빨리빨리 하는데 나만 느린 것 같을 때… 근데 뭐 어때. 천천히 가도 도착은 함 🐢",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다들 빨리빨리 하는데 나만 느린 것 같을 때…",
          "zh": "大家都在赶赶赶感觉只有我很慢的时候…",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "근데 뭐 어때. 천천히 가도 도착은 함 🐢",
          "zh": "但那又怎样。慢慢走也会到的",
          "t": [
            4.38,
            7.69
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "granny",
          "ko": "맞아 ~ 인생 뭐 급할 거 있나",
          "zh": "对呀～人生有啥好急的",
          "audioUrl": "/audio/blog/comments/p2-slow-no-rush-c0.mp3"
        },
        {
          "animalId": "retiree",
          "ko": "느린 게 오래 가요 ㅎㅎ",
          "zh": "慢的才走得远呵呵",
          "audioUrl": "/audio/blog/comments/p2-slow-no-rush-c1.mp3"
        }
      ],
      "likedBy": [
        "granny",
        "retiree",
        "gapyeong",
        "jeju"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-slow-no-rush.mp3",
    "audioDuration": 8,
    "coverEmoji": "🐢",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "slow",
    "likeCount": 71,
    "publishedAt": 1784854800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-founder-01",
    "slug": "p2-founder-pivot",
    "titleKo": "사업 방향 또 바꿈",
    "titleZh": "创业方向又换了",
    "excerptKo": "이번 달만 세 번째 피봇. 투자자한테 설명하기도 민망함 ㅋㅋ 근데 살아남으려면 바꿔야 함. 창업은 결국 적응력 싸움",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "이번 달만 세 번째 피봇.",
          "zh": "光这个月就第三次转型了。",
          "t": [
            0,
            2.17
          ]
        },
        {
          "ko": "투자자한테 설명하기도 민망함 ㅋㅋ",
          "zh": "连跟投资人解释都怪不好意思的哈哈",
          "t": [
            2.57,
            4.79
          ]
        },
        {
          "ko": "근데 살아남으려면 바꿔야 함. 창업은 결국 적응력 싸움",
          "zh": "但为了活下去必须改。创业说到就是适应力的比拼",
          "t": [
            5.19,
            11.77
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "피봇은 실패가 아니라 살아남은 거예요",
          "zh": "转型不是失败而是活下来了",
          "audioUrl": "/audio/blog/comments/p2-founder-pivot-c0.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "salaryman",
        "actor"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-founder-pivot.mp3",
    "audioDuration": 12,
    "coverEmoji": "🚀",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "founder",
    "likeCount": 46,
    "publishedAt": 1784858400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-03",
    "slug": "p2-gapyeong-rain-week",
    "titleKo": "다음 주 내내 비 온다는데 실화냐",
    "titleZh": "听说下周天天下雨，真的假的",
    "excerptKo": "다음 주 내내 비 온다는데 실화냐… 손님 다 어디 갔어 진짜 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "다음 주 내내 비 온다는데 실화냐…",
          "zh": "听说下周一整周都下雨，是真的吗…",
          "t": [
            0,
            3.88
          ]
        },
        {
          "ko": "손님 다 어디 갔어 진짜 ㅠㅠ",
          "zh": "客人们都跑哪去了啊真的是",
          "t": [
            4.28,
            7.26
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "jeju",
          "ko": "제주도도 계속 흐려요… 여름 어디 갔죠",
          "zh": "济州也一直阴着…夏天去哪了",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-rain-week-c0.mp3"
        }
      ],
      "likedBy": [
        "jeju",
        "busan",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-rain-week.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌧️",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "gapyeong",
    "likeCount": 33,
    "publishedAt": 1784858400000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-busan-01",
    "slug": "p2-busan-sea",
    "titleKo": "바다 안 보이면 답답해 죽음",
    "titleZh": "看不到海就憋得慌",
    "excerptKo": "서울 놀러 왔는데 바다가 없어 진짜… 부산 펭귄은 바다 안 보이면 답답해 죽음 ㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "서울 놀러 왔는데 바다가 없어 진짜…",
          "zh": "来首尔玩结果没有海真的是…",
          "t": [
            0,
            3.98
          ]
        },
        {
          "ko": "부산 펭귄은 바다 안 보이면 답답해 죽음 ㅋㅋ",
          "zh": "釜山企鹅看不到海就憋得慌哈哈",
          "t": [
            4.38,
            8.41
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "jeju",
          "ko": "제주도 오세요 바다 천지예요 🌊",
          "zh": "来济州吧 到处都是海",
          "audioUrl": "/audio/blog/comments/p2-busan-sea-c0.mp3"
        }
      ],
      "likedBy": [
        "jeju",
        "runner",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-busan-sea.mp3",
    "audioDuration": 8,
    "coverEmoji": "🌊",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "busan",
    "likeCount": 43,
    "publishedAt": 1784862000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-daegu-01",
    "slug": "p2-daegu-spicy",
    "titleKo": "서울 음식은 왜 안 매워",
    "titleZh": "首尔的菜为啥都不辣",
    "excerptKo": "여기 매운맛 시켰는데 하나도 안 매움. 대구 사람 입엔 이게 순한 맛이야 진짜 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "여기 매운맛 시켰는데 하나도 안 매움.",
          "zh": "这儿点了辣的结果一点都不辣。",
          "t": [
            0,
            3.55
          ]
        },
        {
          "ko": "대구 사람 입엔 이게 순한 맛이야 진짜 ㅋㅋㅋ",
          "zh": "在大邱人嘴里这就是微辣真的哈哈哈",
          "t": [
            3.95,
            7.03
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "busan",
          "ko": "부산도 매운맛 부심 있는데 대구 못 이김 ㅋㅋ",
          "zh": "釜山也自认能吃辣但比不过大邱哈哈",
          "audioUrl": "/audio/blog/comments/p2-daegu-spicy-c0.mp3"
        },
        {
          "animalId": "salaryman",
          "ko": "전 순한 맛도 매워요 ㅠㅠ",
          "zh": "我连微辣都觉得辣呜呜",
          "audioUrl": "/audio/blog/comments/p2-daegu-spicy-c1.mp3"
        }
      ],
      "likedBy": [
        "busan",
        "salaryman",
        "gapyeong",
        "rider"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-daegu-spicy.mp3",
    "audioDuration": 7,
    "coverEmoji": "🌶️",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "daegu",
    "likeCount": 51,
    "publishedAt": 1784865600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-student-01",
    "slug": "p2-student-library-sleep",
    "titleKo": "도서관에서 잠만 잠",
    "titleZh": "在图书馆光睡觉",
    "excerptKo": "아침 일곱 시에 도서관 와서 자리 잡고 다섯 시간 잤음. 집에서 자는 거랑 뭐가 다른지 모르겠다 ㅋㅋㅋ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "아침 일곱 시에 도서관 와서 자리 잡고 다섯 시간 잤음.",
          "zh": "早上七点来图书馆占完座睡了五个小时。",
          "t": [
            0,
            4.97
          ]
        },
        {
          "ko": "집에서 자는 거랑 뭐가 다른지 모르겠다 ㅋㅋㅋ",
          "zh": "跟在家睡觉到底有什么区别哈哈哈",
          "t": [
            5.37,
            8.49
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "자리라도 잡았으니 반은 성공",
          "zh": "至少占到位子了成功一半",
          "audioUrl": "/audio/blog/comments/p2-student-library-sleep-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "student",
        "nightowl"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-student-library-sleep.mp3",
    "audioDuration": 8,
    "coverEmoji": "📚",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "student",
    "likeCount": 48,
    "publishedAt": 1784869200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-seolgi-01",
    "slug": "p2-seolgi-blank",
    "titleKo": "흰 종이가 제일 무서움",
    "titleZh": "空白的纸最可怕",
    "excerptKo": "그림 그리려고 종이 폈는데 한 시간째 그냥 봄. 흰 종이가 세상에서 제일 무서운 거 실화 ㅠㅠ",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "그림 그리려고 종이 폈는데 한 시간째 그냥 봄.",
          "zh": "想画画摊开纸，结果盯着看了一小时。",
          "t": [
            0,
            4.35
          ]
        },
        {
          "ko": "흰 종이가 세상에서 제일 무서운 거 실화 ㅠㅠ",
          "zh": "空白的纸是世上最可怕的东西 这是真的呜呜",
          "t": [
            4.75,
            8.35
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "actor",
          "ko": "창작하는 사람들 다 공감할 듯 ㅠㅠ",
          "zh": "搞创作的应该都懂呜呜",
          "audioUrl": "/audio/blog/comments/p2-seolgi-blank-c0.mp3"
        },
        {
          "animalId": "nightowl",
          "ko": "일단 아무 선이라도 그어보세요!",
          "zh": "先随便画根线试试看！",
          "audioUrl": "/audio/blog/comments/p2-seolgi-blank-c1.mp3"
        }
      ],
      "likedBy": [
        "actor",
        "nightowl",
        "tori",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-seolgi-blank.mp3",
    "audioDuration": 8,
    "coverEmoji": "🎨",
    "coverImageUrl": "",
    "coverTheme": "pink",
    "authorId": "seolgi",
    "likeCount": 54,
    "publishedAt": 1784872800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-actor-01",
    "slug": "p2-actor-audition",
    "titleKo": "오늘 오디션 또 떨어짐",
    "titleZh": "今天试镜又掉了",
    "excerptKo": "스무 번째 오디션 떨어짐. 익숙해질 만도 한데 아직도 맘 아픔 ㅠㅠ 그래도 떨어져도 얻는 게 있다고 믿음. 배우 체질은 포기 못 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "스무 번째 오디션 떨어짐.",
          "zh": "第20次试镜掉了。",
          "t": [
            0,
            2.17
          ]
        },
        {
          "ko": "익숙해질 만도 한데 아직도 맘 아픔 ㅠㅠ",
          "zh": "按说该习惯了的可心里还是疼呜呜",
          "t": [
            2.57,
            5.88
          ]
        },
        {
          "ko": "그래도 떨어져도 얻는 게 있다고 믿음. 배우 체질은 포기 못 함",
          "zh": "但我相信就算掉了也有收获。演员体质没法放弃",
          "t": [
            6.28,
            11.16
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "seolgi",
          "ko": "공작님이 언젠간 주목 받을 거예요 화이팅",
          "zh": "孔雀nim总有一天会被看见的 加油",
          "audioUrl": "/audio/blog/comments/p2-actor-audition-c0.mp3"
        },
        {
          "animalId": "gapyeong",
          "ko": "스무 번 도전한 것만으로도 대단해요",
          "zh": "光是挑战了二十次就已经很厉害了",
          "audioUrl": "/audio/blog/comments/p2-actor-audition-c1.mp3"
        }
      ],
      "likedBy": [
        "seolgi",
        "gapyeong",
        "firefighter"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-actor-audition.mp3",
    "audioDuration": 11,
    "coverEmoji": "🎭",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "actor",
    "likeCount": 64,
    "publishedAt": 1784880000000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-gapyeong-04",
    "slug": "p2-gapyeong-new-bbq",
    "titleKo": "역 앞에 고기집 새로 생김 속보",
    "titleZh": "车站前新开烤肉店速报",
    "excerptKo": "얘들아 역 앞에 고기집 새로 생겼는데 이번 주 반값이래 ㅠㅠ 나 오늘 무조건 감",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "얘들아 역 앞에 고기집 새로 생겼는데 이번 주 반값이래 ㅠㅠ",
          "zh": "宝子们车站前新开了家烤肉店，这周半价啊呜呜",
          "t": [
            0,
            6.15
          ]
        },
        {
          "ko": "나 오늘 무조건 감",
          "zh": "我今天必去",
          "t": [
            6.55,
            9.68
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "runner",
          "ko": "오 정보 감사요 저도 갈래요!",
          "zh": "哦谢谢情报 我也要去！",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-new-bbq-c0.mp3"
        },
        {
          "animalId": "daegu",
          "ko": "반값이면 무조건이지 ㅋㅋㅋ",
          "zh": "半价的话必须冲啊哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-gapyeong-new-bbq-c1.mp3"
        }
      ],
      "likedBy": [
        "runner",
        "daegu",
        "salaryman",
        "coder",
        "rider"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-gapyeong-new-bbq.mp3",
    "audioDuration": 10,
    "coverEmoji": "🥓",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "gapyeong",
    "likeCount": 47,
    "publishedAt": 1784883600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-salaryman-01",
    "slug": "p2-salaryman-overtime",
    "titleKo": "오늘도 야근 확정",
    "titleZh": "今天也确定加班",
    "excerptKo": "여섯 시에 퇴근할 줄 알았는데 팀장님이 \"이거만 하고 가자\"고 함. 이 말이 제일 무서운 말임 ㅠㅠ 저녁도 못 먹음",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "여섯 시에 퇴근할 줄 알았는데 팀장님이 \"이거만 하고 가자\"고 함.",
          "zh": "以为六点能走，结果组长说\"把这个做完就走\"。",
          "t": [
            0,
            5.63
          ]
        },
        {
          "ko": "이 말이 제일 무서운 말임 ㅠㅠ 저녁도 못 먹음",
          "zh": "这句话是世上最可怕的话呜呜 晚饭也没吃到",
          "t": [
            6.03,
            10.15
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "coder",
          "ko": "이거만 = 오늘 밤 열두 시 까지 ㅋㅋㅋ",
          "zh": "这个=今晚到十二点哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-salaryman-overtime-c0.mp3"
        },
        {
          "animalId": "student",
          "ko": "사회생활 팁인가요.. 대학생은 무서워서 울어요",
          "zh": "社会生活小贴士吗..大学生吓得要哭了",
          "audioUrl": "/audio/blog/comments/p2-salaryman-overtime-c1.mp3"
        }
      ],
      "likedBy": [
        "coder",
        "student",
        "rider",
        "nightowl",
        "salaryman"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-salaryman-overtime.mp3",
    "audioDuration": 10,
    "coverEmoji": "💼",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "salaryman",
    "likeCount": 72,
    "publishedAt": 1784883600000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-coder-01",
    "slug": "p2-coder-friday-deploy",
    "titleKo": "금요일 저녁 배포는 누가 시킴",
    "titleZh": "谁让周五晚上上线的",
    "excerptKo": "금요일 저녁에 배포하자는 사람 진짜… 주말에 서버 터지면 누가 책임짐 ㅋㅋㅋ 퇴근 못 함",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "금요일 저녁에 배포하자는 사람 진짜…",
          "zh": "提议周五晚上上线的那个人真的是…",
          "t": [
            0,
            3.4
          ]
        },
        {
          "ko": "주말에 서버 터지면 누가 책임짐 ㅋㅋㅋ 퇴근 못 함",
          "zh": "周末服务器炸了谁负责啊哈哈哈 下不了班",
          "t": [
            3.8,
            7.92
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "salaryman",
          "ko": "금요일 배포 국룰 위반이죠 ㅋㅋ",
          "zh": "周五上线属于违反常识哈哈",
          "audioUrl": "/audio/blog/comments/p2-coder-friday-deploy-c0.mp3"
        }
      ],
      "likedBy": [
        "salaryman",
        "founder",
        "gapyeong"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-coder-friday-deploy.mp3",
    "audioDuration": 8,
    "coverEmoji": "💻",
    "coverImageUrl": "",
    "coverTheme": "purple",
    "authorId": "coder",
    "likeCount": 49,
    "publishedAt": 1784887200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-rider-01",
    "slug": "p2-rider-rain-tip",
    "titleKo": "비 오는 날 배달 꿀팁",
    "titleZh": "下雨天送外卖小贴士",
    "excerptKo": "비 오는 날엔 뜨거운 국물 요리 피하세요 여러분. 오다가 식어도 문제고 넘쳐도 문제임 ㅠㅠ 치킨이 최고",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "비 오는 날엔 뜨거운 국물 요리 피하세요 여러분.",
          "zh": "下雨天请大家避开热汤类。",
          "t": [
            0,
            4.45
          ]
        },
        {
          "ko": "오다가 식어도 문제고 넘쳐도 문제임 ㅠㅠ 치킨이 최고",
          "zh": "送过来凉了是问题洒了也是问题呜呜 炸鸡最好",
          "t": [
            4.85,
            10.29
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "치킨은 진리 ㅋㅋㅋ",
          "zh": "炸鸡是真理哈哈哈",
          "audioUrl": "/audio/blog/comments/p2-rider-rain-tip-c0.mp3"
        },
        {
          "animalId": "salaryman",
          "ko": "꿀팁 감사요 앞으로 비 오는 날 참고할게요",
          "zh": "谢谢贴士 以后下雨天注意",
          "audioUrl": "/audio/blog/comments/p2-rider-rain-tip-c1.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "salaryman",
        "coder"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-rider-rain-tip.mp3",
    "audioDuration": 10,
    "coverEmoji": "🛵",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "rider",
    "likeCount": 49,
    "publishedAt": 1784887200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-runner-01",
    "slug": "p2-runner-hangang",
    "titleKo": "오늘 한강 러닝 10km",
    "titleZh": "今天汉江跑步10公里",
    "excerptKo": "한강 10키로 뛰고 왔음. 바람 선선하고 노을 개이쁨. 뛰고 나서 편의점 맥주 한 캔 하는 게 인생 낙 🌇",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "한강 10키로 뛰고 왔음.",
          "zh": "汉江跑了10公里刚回来。",
          "t": [
            0,
            2.46
          ]
        },
        {
          "ko": "바람 선선하고 노을 개이쁨.",
          "zh": "风凉凉的晚霞超美。",
          "t": [
            2.86,
            5.46
          ]
        },
        {
          "ko": "뛰고 나서 편의점 맥주 한 캔 하는 게 인생 낙 🌇",
          "zh": "跑完来罐便利店啤酒就是人生至福",
          "t": [
            5.86,
            10.03
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "jeju",
          "ko": "한강 노을 제주도 만큼 이쁘네요",
          "zh": "汉江晚霞快赶上济州的漂亮了",
          "audioUrl": "/audio/blog/comments/p2-runner-hangang-c0.mp3"
        }
      ],
      "likedBy": [
        "jeju",
        "busan",
        "runner"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-runner-hangang.mp3",
    "audioDuration": 10,
    "coverEmoji": "🏃",
    "coverImageUrl": "",
    "coverTheme": "mint",
    "authorId": "runner",
    "likeCount": 49,
    "publishedAt": 1784887200000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  },
  {
    "id": "blog-p2-cook1-01",
    "slug": "p2-cook1-solo-dish",
    "titleKo": "혼밥도 요리다",
    "titleZh": "独食也是料理",
    "excerptKo": "혼자 먹어도 대충 안 먹음. 오늘은 된장찌개에 계란말이까지 함. 혼자서 이렇게 차려 먹는 게 내 힐링 ㅋㅋ 🍳",
    "level": "초급",
    "category": "일상",
    "content": {
      "sentences": [
        {
          "ko": "혼자 먹어도 대충 안 먹음.",
          "zh": "就算一个人吃也不马虎。",
          "t": [
            0,
            1.8
          ]
        },
        {
          "ko": "오늘은 된장찌개에 계란말이까지 함.",
          "zh": "今天做了大酱汤还做了鸡蛋卷。",
          "t": [
            2.2,
            5.18
          ]
        },
        {
          "ko": "혼자서 이렇게 차려 먹는 게 내 힐링 ㅋㅋ 🍳",
          "zh": "一个人这么摆盘吃就是我治愈自己的方式哈哈",
          "t": [
            5.58,
            8.57
          ]
        }
      ],
      "vocab": [],
      "quiz": [],
      "comments": [
        {
          "animalId": "daegu",
          "ko": "된장찌개는 사랑이죠",
          "zh": "大酱汤就是爱",
          "audioUrl": "/audio/blog/comments/p2-cook1-solo-dish-c0.mp3"
        }
      ],
      "likedBy": [
        "daegu",
        "student",
        "granny"
      ],
      "images": []
    },
    "audioUrl": "/audio/blog/p2-cook1-solo-dish.mp3",
    "audioDuration": 9,
    "coverEmoji": "🍳",
    "coverImageUrl": "",
    "coverTheme": "gold",
    "authorId": "cook1",
    "likeCount": 49,
    "publishedAt": 1784890800000,
    "isFeatured": false,
    "unlockDay": 0,
    "authorKind": "passerby",
    "aiStatus": "passed",
    "aiReason": "",
    "moderatedText": "",
    "featureDate": "",
    "featureRank": 0
  }
];
