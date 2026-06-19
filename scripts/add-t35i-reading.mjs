import fs from 'fs';

const path = 'C:/Users/Administrator/Desktop/korean-learning-app/src/data/topik-questions.ts';
let content = fs.readFileSync(path, 'utf8');

// 先删掉之前写错格式的题目块
const startMarker = '\n  // ── T35I 阅读 31-70（图片题40/41/42/63/64暂空）─────────────────────────────';
const endMarker = '\n];\n';
const startIdx = content.indexOf(startMarker);
if (startIdx !== -1) {
  content = content.slice(0, startIdx) + endMarker;
}

// 重新追加正确格式
const newQuestions = `
  // ══════════════════════════════════════════════
  // 第35届 TOPIK I 阅读 (T35I-R31 ~ T35I-R70)
  // 图片题 40/41/42/63/64 暂空
  // ══════════════════════════════════════════════

  // ── [31-33] 무엇에 대한 이야기 ──
  { id:'T35I-R31', section:'reading', level:'beginner', topic:'소개', number:31, type:'multiple-choice', difficulty:'easy', testPoint:'화제 파악', prompt:'저는 김민수입니다. 이 사람은 제임스입니다.\\n\\n무엇에 대한 이야기입니까?', promptZh:'我叫金民秀。这个人叫詹姆斯。\\n\\n这是关于什么的话？', options:['시간','장소','이름','주말'], correctIdx:2, explanation:'자기소개에서 이름을 말하고 있습니다.', vocabulary:['이름','소개'] },
  { id:'T35I-R32', section:'reading', level:'beginner', topic:'음식', number:32, type:'multiple-choice', difficulty:'easy', testPoint:'화제 파악', prompt:'불고기를 먹습니다. 맛있습니다.\\n\\n무엇에 대한 이야기입니까?', promptZh:'吃烤牛肉。很好吃。\\n\\n这是关于什么的话？', options:['쇼핑','사람','노래','음식'], correctIdx:3, explanation:'먹는 것에 대한 이야기이므로 음식입니다.', vocabulary:['불고기','맛있다','음식'] },
  { id:'T35I-R33', section:'reading', level:'beginner', topic:'장소', number:33, type:'multiple-choice', difficulty:'easy', testPoint:'화제 파악', prompt:'선생님을 만납니다. 공부를 합니다.\\n\\n무엇에 대한 이야기입니까?', promptZh:'见老师。学习。\\n\\n这是关于什么的话？', options:['학교','요일','취미','날짜'], correctIdx:0, explanation:'선생님과 공부는 학교에 관한 이야기입니다.', vocabulary:['선생님','공부','학교'] },

  // ── [34-39] 빈칸 채우기 ──
  { id:'T35I-R34', section:'reading', level:'beginner', topic:'문법', number:34, type:'multiple-choice', difficulty:'easy', testPoint:'조사', prompt:'몇 시( )옵니까?', promptZh:'几点（　）来？（填助词）', options:['가','는','를','에'], correctIdx:3, explanation:'시간 명사 뒤에는 조사 "에"를 씁니다.', vocabulary:['몇 시','에'] },
  { id:'T35I-R35', section:'reading', level:'beginner', topic:'장소', number:35, type:'multiple-choice', difficulty:'easy', testPoint:'어휘', prompt:'( )에 갑니다. 우유를 삽니다.\\n\\n( )에 들어갈 알맞은 것은?', promptZh:'去（　）。买牛奶。（填场所）', options:['가게','교실','은행','서점'], correctIdx:0, explanation:'우유를 사러 가는 곳은 가게(商店)입니다.', vocabulary:['가게','우유','사다'] },
  { id:'T35I-R36', section:'reading', level:'beginner', topic:'직업', number:36, type:'multiple-choice', difficulty:'easy', testPoint:'어휘', prompt:'저는 한국어 선생님입니다. 한국어를 ( ).\\n\\n( )에 들어갈 알맞은 것은?', promptZh:'我是韩语老师。我（　）韩语。（填动词）', options:['줍니다','모릅니다','가르칩니다','일어납니다'], correctIdx:2, explanation:'한국어 선생님이므로 한국어를 "가르칩니다(教)"가 맞습니다.', vocabulary:['선생님','가르치다'] },
  { id:'T35I-R37', section:'reading', level:'beginner', topic:'일상', number:37, type:'multiple-choice', difficulty:'easy', testPoint:'어휘', prompt:'요즘 일이 ( ). 바쁩니다.\\n\\n( )에 들어갈 알맞은 것은?', promptZh:'最近事情（　）。很忙。（填形容词）', options:['비쌉니다','작습니다','많습니다','나쁩니다'], correctIdx:2, explanation:'일이 많아서 바쁜 것입니다.', vocabulary:['요즘','바쁘다','많다'] },
  { id:'T35I-R38', section:'reading', level:'beginner', topic:'취미', number:38, type:'multiple-choice', difficulty:'easy', testPoint:'어휘', prompt:'산을 좋아합니다. 그래서 등산을 ( )합니다.\\n\\n( )에 들어갈 알맞은 것은?', promptZh:'喜欢山。所以（　）登山。（填副词）', options:['자주','제일','아주','아까'], correctIdx:0, explanation:'좋아해서 "자주(经常)"합니다.', vocabulary:['등산','자주','좋아하다'] },
  { id:'T35I-R39', section:'reading', level:'beginner', topic:'일상', number:39, type:'multiple-choice', difficulty:'easy', testPoint:'문법', prompt:'머리가 깁니다. 그래서 ( )싶습니다.\\n\\n( )에 들어갈 알맞은 것은?', promptZh:'头发长。所以想（　）。（填动词）', options:['자르고','나오고','가지고','마시고'], correctIdx:0, explanation:'머리가 길어서 "자르고(剪)"싶습니다.', vocabulary:['머리','길다','자르다'] },

  // ── [43-45] 내용 일치 (단문) ──
  { id:'T35I-R43', section:'reading', level:'beginner', topic:'일상', number:43, type:'multiple-choice', difficulty:'easy', testPoint:'내용 일치', prompt:'저는 매일 아침 산책을 하고 학교에 갑니다. 학생 식당에서 아침을 먹고 수업을 듣습니다. 그리고 커피숍에서 아르바이트를 합니다.\\n\\n내용과 같은 것은?', promptZh:'我每天早晨散步后去学校。在学生食堂吃早饭后听课。然后在咖啡店打工。\\n\\n与内容一致的是？', options:['저는 아침마다 산책을 합니다.','저는 아침을 먹고 학교에 갑니다.','저는 아르바이트를 하고 학교에 갑니다.','저는 학생 식당에서 아르바이트를 합니다.'], correctIdx:0, explanation:'매일 아침 산책을 하고 학교에 갑니다.', vocabulary:['산책','아르바이트','학생 식당'] },
  { id:'T35I-R44', section:'reading', level:'beginner', topic:'학교', number:44, type:'multiple-choice', difficulty:'easy', testPoint:'내용 일치', prompt:'다음 주 월요일에 수학 시험이 있습니다. 그 시험은 아주 어렵습니다. 그래서 날마다 도서관에 가서 공부합니다.\\n\\n내용과 같은 것은?', promptZh:'下周一有数学考试。那个考试非常难。所以每天去图书馆学习。\\n\\n与内容一致的是？', options:['저는 수학을 좋아합니다.','저는 요즘 열심히 공부합니다.','이번 주에 수학 시험이 있습니다.','저는 월요일마다 어려운 시험이 있습니다.'], correctIdx:1, explanation:'날마다 도서관에서 공부하므로 요즘 열심히 공부합니다.', vocabulary:['시험','도서관','날마다'] },
  { id:'T35I-R45', section:'reading', level:'beginner', topic:'일상', number:45, type:'multiple-choice', difficulty:'easy', testPoint:'내용 일치', prompt:'친구가 지난달에 고향으로 돌아갔습니다. 친구는 저에게 냉장고를 주었습니다. 그 냉장고는 커서 좋습니다.\\n\\n내용과 같은 것은?', promptZh:'朋友上个月回了老家。朋友把冰箱给了我。那个冰箱很大很好。\\n\\n与内容一致的是？', options:['저는 냉장고를 샀습니다.','저는 이 냉장고가 마음에 듭니다.','저는 고향에 큰 냉장고가 있습니다.','저는 친구에게 냉장고를 주었습니다.'], correctIdx:1, explanation:'냉장고가 커서 좋다 → 마음에 듭니다.', vocabulary:['냉장고','고향','돌아가다'] },

  // ── [46-48] 중심 생각 ──
  { id:'T35I-R46', section:'reading', level:'beginner', topic:'취미', number:46, type:'multiple-choice', difficulty:'easy', testPoint:'중심 생각', prompt:'저는 극장에 가지 않고 집에서 혼자 영화를 봅니다. 집에서 영화를 보면 누워서 볼 수 있습니다. 그리고 보고 싶은 시간에 볼 수 있습니다.\\n\\n중심 생각은?', promptZh:'我不去剧场，在家一个人看电影。在家看电影可以躺着看。而且可以在想看的时间看。\\n\\n中心思想是？', options:['저는 극장에 자주 갑니다.','저는 친구와 영화를 봅니다.','저는 극장에서 영화를 봅니다.','저는 집에서 영화 보는 것을 좋아합니다.'], correctIdx:3, explanation:'집에서 영화 보는 것의 장점을 설명하며 좋아한다고 합니다.', vocabulary:['극장','누워서','영화'] },
  { id:'T35I-R47', section:'reading', level:'beginner', topic:'인간관계', number:47, type:'multiple-choice', difficulty:'easy', testPoint:'중심 생각', prompt:'시간이 없어서 일을 다 하지 못했습니다. 그래서 지현 씨가 저를 도와주었습니다. 저는 지현 씨에게 커피를 사 주었습니다.\\n\\n중심 생각은?', promptZh:'因为时间不够没能做完工作。所以智贤帮了我。我给智贤买了咖啡。\\n\\n中心思想是？', options:['저는 일을 많이 합니다.','저는 커피를 좋아합니다.','저는 지현 씨가 고마웠습니다.','저는 지현 씨를 도와주었습니다.'], correctIdx:2, explanation:'도움을 받고 커피를 사 준 것은 감사함의 표현입니다.', vocabulary:['도와주다','고맙다','커피'] },
  { id:'T35I-R48', section:'reading', level:'beginner', topic:'취미', number:48, type:'multiple-choice', difficulty:'easy', testPoint:'중심 생각', prompt:'이번 주말에 제가 좋아하는 가수의 공연이 있습니다. 저는 두 달 전에 표를 미리 샀습니다. 공연을 빨리 보고 싶습니다.\\n\\n중심 생각은?', promptZh:'这周末有我喜欢的歌手的演出。我两个月前就提前买了票。好想快点看演出。\\n\\n中心思想是？', options:['저는 표를 사고 싶습니다.','저는 가수가 되고 싶습니다.','저는 공연을 기다리고 있습니다.','저는 두 달 전에 공연을 봤습니다.'], correctIdx:2, explanation:'공연을 빨리 보고 싶다 → 공연을 기다리고 있습니다.', vocabulary:['공연','표','가수'] },

  // ── [49-50] 장문 읽기 (종이컵) ──
  { id:'T35I-R49', section:'reading', level:'beginner', topic:'취미', number:49, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'제 친구는 그림 그리는 것을 좋아합니다. 그래서 시간이 있을 때마다 종이컵에 그림을 그립니다. 그리고 친한 사람들에게 종이컵을 선물합니다. ( ㉠ )종이컵은 세상에 하나만 있습니다. 친구의 종이컵은 참 예쁩니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'我的朋友喜欢画画。所以一有时间就在纸杯上画画。然后把纸杯送给亲近的人。（　）纸杯是世界上唯一的。朋友的纸杯真的很漂亮。\\n\\n㉠应填入的内容是？', options:['친구가 산','친구가 만든','사람들이 선물한','사람들이 버리는'], correctIdx:1, explanation:'친구가 직접 그림을 그려 만든 종이컵입니다.', vocabulary:['종이컵','그림','선물'] },
  { id:'T35I-R50', section:'reading', level:'beginner', topic:'취미', number:50, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'제 친구는 그림 그리는 것을 좋아합니다. 그래서 시간이 있을 때마다 종이컵에 그림을 그립니다. 그리고 친한 사람들에게 종이컵을 선물합니다. 친구가 만든 종이컵은 세상에 하나만 있습니다. 친구의 종이컵은 참 예쁩니다.\\n\\n이 글의 내용과 같은 것은?', promptZh:'我的朋友喜欢画画...（同上文）\\n\\n与内容一致的是？', options:['친구는 종이로 컵을 만듭니다.','친구는 예쁜 종이컵을 받았습니다.','친구는 친한 사람들과 그림을 그립니다.','친구는 종이컵에 예쁘게 그림을 그립니다.'], correctIdx:3, explanation:'친구는 종이컵에 그림을 그려서 선물합니다.', vocabulary:['종이컵','그림','선물'] },

  // ── [51-52] 장문 읽기 (미래 직업) ──
  { id:'T35I-R51', section:'reading', level:'beginner', topic:'미래', number:51, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'몇 십 년 후에는 자동차가 하늘로 다닐 것입니다. 그러면 그 자동차를 만드는 사람이 필요합니다. 그리고 하늘에 자동차가 있으면 하늘에서 일하는 교통경찰도 있어야 합니다. 지금은 이런 사람들을 ( ㉠ )없습니다. 하지만 앞으로는 이런 사람들을 자주 볼 수 있을 것입니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'几十年后汽车将会在天上飞...现在（　）这样的人。但以后将经常能见到。\\n\\n㉠应填入的内容是？', options:['만날 수','보낼 수','가르칠 수','기다릴 수'], correctIdx:0, explanation:'지금은 이런 사람들을 "만날 수"가 없습니다.', vocabulary:['교통경찰','미래','직업'] },
  { id:'T35I-R52', section:'reading', level:'beginner', topic:'미래', number:52, type:'multiple-choice', difficulty:'medium', testPoint:'주제 파악', prompt:'몇 십 년 후에는 자동차가 하늘로 다닐 것입니다. 그러면 그 자동차를 만드는 사람이 필요합니다. 그리고 하늘에 자동차가 있으면 하늘에서 일하는 교통경찰도 있어야 합니다. 지금은 이런 사람들을 만날 수 없습니다. 하지만 앞으로는 이런 사람들을 자주 볼 수 있을 것입니다.\\n\\n무엇에 대한 이야기입니까?', promptZh:'这篇文章是关于什么的？', options:['미래의 집','미래의 직업','내가 만든 자동차','내가 좋아하는 자동차'], correctIdx:1, explanation:'미래에 생길 새로운 직업에 대한 이야기입니다.', vocabulary:['미래','직업','자동차'] },

  // ── [53-54] 장문 읽기 (운동) ──
  { id:'T35I-R53', section:'reading', level:'beginner', topic:'건강', number:53, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'저는 아침에 일어나서 혼자 운동을 합니다. 운동을 하면 즐겁습니다. 그런데 아침에 ( ㉠ )일어나는 것이 힘들어서 가끔 운동을 못 합니다. 그래서 다음 주부터는 저녁에 친구와 같이 운동을 하기로 했습니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'...但是早上（　）起来很难所以有时运动不了。\\n\\n㉠应填入的内容是？', options:['많이','잠깐','늦게','일찍'], correctIdx:3, explanation:'아침에 "일찍" 일어나는 것이 힘들다는 뜻입니다.', vocabulary:['운동','힘들다','일찍'] },
  { id:'T35I-R54', section:'reading', level:'beginner', topic:'건강', number:54, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'저는 아침에 일어나서 혼자 운동을 합니다. 운동을 하면 즐겁습니다. 그런데 아침에 일찍 일어나는 것이 힘들어서 가끔 운동을 못 합니다. 그래서 다음 주부터는 저녁에 친구와 같이 운동을 하기로 했습니다. 이제 매일 운동을 할 것 같습니다.\\n\\n내용과 같은 것은?', promptZh:'...所以从下周起约好和朋友一起在晚上运动。\\n\\n与内容一致的是？', options:['이 사람은 저녁에 운동을 했습니다.','이 사람은 아침마다 친구를 만납니다.','이 사람은 친구와 운동을 할 것입니다.','이 사람은 친구와 약속을 하려고 합니다.'], correctIdx:2, explanation:'다음 주부터 저녁에 친구와 같이 운동하기로 했습니다.', vocabulary:['운동','저녁','친구'] },

  // ── [55-56] 장문 읽기 (안경) ──
  { id:'T35I-R55', section:'reading', level:'beginner', topic:'일상', number:55, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'저는 안경이 여러 개 있습니다. 그래서 그때그때 다른 안경을 씁니다. 사람을 처음 만날 때는 부드러운 느낌의 안경을 씁니다. 운동을 할 때는 가벼운 안경을 씁니다. ( ㉠ )멋있게 보이고 싶을 때는 유행하는 안경을 씁니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'...运动时戴轻的眼镜。（　）想显得帅气时戴流行的眼镜。\\n\\n㉠应填入的内容是？', options:['그러면','그래서','그리고','그러니까'], correctIdx:2, explanation:'앞 내용에 이어 추가 정보를 연결하는 "그리고(并且)"입니다.', vocabulary:['안경','유행','가볍다'] },
  { id:'T35I-R56', section:'reading', level:'beginner', topic:'일상', number:56, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'저는 안경이 여러 개 있습니다. 그래서 그때그때 다른 안경을 씁니다. 사람을 처음 만날 때는 부드러운 느낌의 안경을 씁니다. 운동을 할 때는 가벼운 안경을 씁니다. 그리고 멋있게 보이고 싶을 때는 유행하는 안경을 씁니다.\\n\\n내용과 같은 것은?', promptZh:'与内容一致的是？', options:['저는 안경이 한 개 있습니다.','저는 유행하는 안경이 있습니다.','저는 운동을 할 때 안경을 안 씁니다.','저는 사람을 만날 때 안경을 벗습니다.'], correctIdx:1, explanation:'멋있게 보이고 싶을 때 유행하는 안경을 씁니다.', vocabulary:['안경','유행','멋있다'] },

  // ── [57-58] 순서 배열 ──
  { id:'T35I-R57', section:'reading', level:'beginner', topic:'동물', number:57, type:'multiple-choice', difficulty:'medium', testPoint:'순서 배열', prompt:'(가) 모든 동물은 잠을 잡니다.\\n(나) 하지만 개나 고양이는 열 시간쯤 잡니다.\\n(다) 말은 하루에 세 시간만 자도 괜찮습니다.\\n(라) 그런데 잠을 자는 시간은 동물마다 다릅니다.\\n\\n순서대로 나열한 것은?', promptZh:'排列顺序正确的是？', options:['(가)-(나)-(다)-(라)','(가)-(다)-(나)-(라)','(가)-(라)-(나)-(다)','(가)-(라)-(다)-(나)'], correctIdx:3, explanation:'(가)동물은 잠을 잔다→(라)시간은 다르다→(다)말은 3시간→(나)개/고양이는 10시간.', vocabulary:['동물','잠','하루'] },
  { id:'T35I-R58', section:'reading', level:'beginner', topic:'지역', number:58, type:'multiple-choice', difficulty:'medium', testPoint:'순서 배열', prompt:'(가) 우리 고향에는 딸기가 많이 납니다.\\n(나) 그래서 딸기가 많은 4월에 축제를 합니다.\\n(다) 그리고 맛있는 딸기를 시장보다 싸게 살 수 있습니다.\\n(라) 이 축제에서는 딸기로 여러 가지 음식을 만들어 볼 수 있습니다.\\n\\n순서대로 나열한 것은?', promptZh:'排列顺序正确的是？', options:['(가)-(나)-(다)-(라)','(가)-(나)-(라)-(다)','(가)-(다)-(나)-(라)','(가)-(라)-(나)-(다)'], correctIdx:1, explanation:'(가)딸기가 많다→(나)4월 축제→(라)축제에서 딸기음식→(다)시장보다 싸게 살 수 있다.', vocabulary:['딸기','축제','고향'] },

  // ── [59-60] 장문 읽기 (라면) ──
  { id:'T35I-R59', section:'reading', level:'beginner', topic:'음식', number:59, type:'multiple-choice', difficulty:'medium', testPoint:'문장 삽입', prompt:'라면은 맛있지만 소금이 많이 들어 있어서 건강에 나쁩니다. ( ㉠ ) 라면의 소금은 보통 국물을 만드는 스프에 있습니다. ( ㉡ ) 그래도 국물을 먹고 싶으면 스프를 조금만 넣습니다. ( ㉢ ) 그리고 라면을 끓일 때 스프를 늦게 넣는 것도 소금을 덜 먹는 또 하나의 방법입니다. ( ㉣ )\\n\\n다음 문장이 들어갈 곳은?\\n"그래서 소금을 적게 먹으려면 라면 국물을 먹지 않는 게 좋습니다."', promptZh:'下面这句话应插入哪里？"所以想少吃盐的话最好不要喝拉面汤。"', options:['㉠','㉡','㉢','㉣'], correctIdx:1, explanation:'스프에 소금이 있다는 설명 바로 뒤에 국물을 먹지 않는 것이 좋다는 결론이 옵니다.', vocabulary:['라면','소금','스프','국물'] },
  { id:'T35I-R60', section:'reading', level:'beginner', topic:'음식', number:60, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'라면은 맛있지만 소금이 많이 들어 있어서 건강에 나쁩니다. 라면의 소금은 보통 국물을 만드는 스프에 있습니다. 그래서 소금을 적게 먹으려면 라면 국물을 먹지 않는 게 좋습니다. 그래도 국물을 먹고 싶으면 스프를 조금만 넣습니다. 그리고 라면을 끓일 때 스프를 늦게 넣는 것도 소금을 덜 먹는 또 하나의 방법입니다.\\n\\n내용과 같은 것은?', promptZh:'与内容一致的是？', options:['라면은 건강에 좋은 음식입니다.','스프를 많이 넣으면 건강에 좋습니다.','스프를 먼저 넣으면 소금을 많이 먹게 됩니다.','라면의 소금을 적게 먹는 방법은 한 가지입니다.'], correctIdx:2, explanation:'스프를 늦게 넣는 것이 소금을 덜 먹는 방법이므로, 먼저 넣으면 소금을 많이 먹게 됩니다.', vocabulary:['라면','소금','스프'] },

  // ── [61-62] 장문 읽기 (지폐) ──
  { id:'T35I-R61', section:'reading', level:'beginner', topic:'역사', number:61, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'지금은 동전과 지폐를 모두 사용합니다. 하지만 전에는 동전만 사용했습니다. 종이로 만든 지폐는 쉽게 찢어지고 더러워져서 ( ㉠ )못합니다. 그리고 가짜 돈을 만들기도 쉽습니다. 그래서 동전보다 지폐를 늦게 사용한 것입니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'纸币容易破损变脏所以（　）不了。\\n\\n㉠应填入的内容是？', options:['오래 쓰지','가끔 내지','자주 만들지','계속 나오지'], correctIdx:0, explanation:'찢어지고 더러워져서 "오래 쓰지"못합니다.', vocabulary:['지폐','동전','찢어지다'] },
  { id:'T35I-R62', section:'reading', level:'beginner', topic:'역사', number:62, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'지금은 동전과 지폐를 모두 사용합니다. 하지만 전에는 동전만 사용했습니다. 종이로 만든 지폐는 쉽게 찢어지고 더러워져서 오래 쓰지 못합니다. 그리고 가짜 돈을 만들기도 쉽습니다. 그래서 동전보다 지폐를 늦게 사용한 것입니다.\\n\\n내용과 같은 것은?', promptZh:'与内容一致的是？', options:['지폐는 잘 더러워집니다.','옛날에도 지폐를 사용했습니다.','지폐가 동전보다 먼저 나왔습니다.','동전은 가짜 돈을 만들기 쉽습니다.'], correctIdx:0, explanation:'종이로 만든 지폐는 쉽게 찢어지고 더러워집니다.', vocabulary:['지폐','동전','더럽다'] },

  // ── [65-66] 장문 읽기 (식혜) ──
  { id:'T35I-R65', section:'reading', level:'beginner', topic:'음식', number:65, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'식혜는 한국의 전통 음료수입니다. 보통 모임이나 잔치에서 ( ㉠ ) 식혜를 마십니다. 이것은 식혜가 소화를 도와주기 때문입니다. 식혜는 달고 맛있어서 많은 사람들이 좋아합니다. 시원하게 마시면 더 좋습니다. 저는 식혜를 만드는 방법이 간단해서 자주 만들어 먹습니다. 하지만 만드는 데 시간이 오래 걸립니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'在聚会或宴席上（　）喝米甜酒。\\n\\n㉠应填入的内容是？', options:['운동을 한 후에','음식을 먹은 후에','모임에 가기 전에','음료수를 마시기 전에'], correctIdx:1, explanation:'식혜는 소화를 도와주므로 음식을 먹은 후에 마십니다.', vocabulary:['식혜','소화','전통'] },
  { id:'T35I-R66', section:'reading', level:'beginner', topic:'음식', number:66, type:'multiple-choice', difficulty:'medium', testPoint:'내용 일치', prompt:'식혜는 한국의 전통 음료수입니다. 보통 모임이나 잔치에서 음식을 먹은 후에 식혜를 마십니다. 이것은 식혜가 소화를 도와주기 때문입니다. 식혜는 달고 맛있어서 많은 사람들이 좋아합니다. 시원하게 마시면 더 좋습니다. 저는 식혜를 만드는 방법이 간단해서 자주 만들어 먹습니다. 하지만 만드는 데 시간이 오래 걸립니다.\\n\\n내용과 같은 것은?', promptZh:'与内容一致的是？', options:['식혜는 빨리 만들 수 있습니다.','식혜는 달아서 사람들이 싫어합니다.','식혜는 차갑게 마시면 더 맛있습니다.','모임이나 잔치에 가면 식혜를 만듭니다.'], correctIdx:2, explanation:'시원하게 마시면 더 좋습니다.', vocabulary:['식혜','시원하다','소화'] },

  // ── [67-68] 장문 읽기 (걷기) ──
  { id:'T35I-R67', section:'reading', level:'beginner', topic:'건강', number:67, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'문제를 풀기 어려울 때는 책상 앞에만 앉아 있지 마십시오. 계속 앉아 있으면 좋은 생각이 ( ㉠ )않습니다. 그럴 때는 일어나서 걷는 것이 좋습니다. 걸으려고 꼭 밖으로 ( ㉡ ). 집 안도 좋고 사무실 안도 괜찮습니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'...一直坐着的话好的想法（　）不出来。\\n\\n㉠应填入的内容是？', options:['나지','많지','없어지지','달라지지'], correctIdx:0, explanation:'좋은 생각이 "나지"않습니다.', vocabulary:['문제','생각','걷다'] },
  { id:'T35I-R68', section:'reading', level:'beginner', topic:'건강', number:68, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'문제를 풀기 어려울 때는 책상 앞에만 앉아 있지 마십시오. 계속 앉아 있으면 좋은 생각이 나지 않습니다. 그럴 때는 일어나서 걷는 것이 좋습니다. 걸으려고 꼭 밖으로 ( ㉡ ). 집 안도 좋고 사무실 안도 괜찮습니다.\\n\\n㉡에 들어갈 알맞은 말은?', promptZh:'走路不一定非要（　）。在家里或办公室里也行。\\n\\n㉡应填入的内容是？', options:['나가려고 합니다','나갈 수 있습니다','나가지 않아도 됩니다','나가지 않기로 합니다'], correctIdx:2, explanation:'집 안이나 사무실 안도 괜찮으므로 "나가지 않아도 됩니다".', vocabulary:['걷다','밖','사무실'] },

  // ── [69-70] 장문 읽기 (할머니 공연) ──
  { id:'T35I-R69', section:'reading', level:'beginner', topic:'가족', number:69, type:'multiple-choice', difficulty:'medium', testPoint:'빈칸 추론', prompt:'우리 가족은 ( ㉠ )적이 없습니다. 그래서 저는 그동안 할머니께서 노래를 좋아하는 것을 몰랐습니다. 그런데 어젯밤에 할머니께서 공연 초대장을 주셨습니다. 그 공연에서 할머니가 노래를 하실 것입니다. 우리 가족은 공연에 가려고 합니다.\\n\\n㉠에 들어갈 알맞은 말은?', promptZh:'我们家人从来没有（　）过。所以一直不知道奶奶喜欢唱歌。\\n\\n㉠应填入的内容是？', options:['할머니와 공연을 한','할머니와 공연을 본','할머니와 노래를 배운','할머니의 노래를 들은'], correctIdx:3, explanation:'할머니의 노래를 들은 적이 없어서 좋아하는지 몰랐습니다.', vocabulary:['할머니','공연','초대장'] },
  { id:'T35I-R70', section:'reading', level:'beginner', topic:'가족', number:70, type:'multiple-choice', difficulty:'medium', testPoint:'내용 추론', prompt:'우리 가족은 할머니의 노래를 들은 적이 없습니다. 그래서 저는 그동안 할머니께서 노래를 좋아하는 것을 몰랐습니다. 그런데 어젯밤에 할머니께서 공연 초대장을 주셨습니다. 그 공연에서 할머니가 노래를 하실 것입니다. 우리 가족은 공연에 가려고 합니다. 거기에서 할머니의 노래를 처음 듣게 될 것입니다.\\n\\n이 글의 내용으로 알 수 있는 것은?', promptZh:'通过这篇文章能知道的是？', options:['할머니는 노래 부르기를 좋아하십니다.','우리 가족은 함께 노래 연습을 했습니다.','할머니는 가끔 우리를 공연에 초대하십니다.','우리 가족은 할머니의 공연을 보러 갔습니다.'], correctIdx:0, explanation:'할머니께서 공연에서 노래를 하실 것이므로 노래 부르기를 좋아하십니다.', vocabulary:['할머니','공연','노래'] },
`;

content = content.replace(/\];\s*$/, '');
content = content + newQuestions + '\n];\n';
fs.writeFileSync(path, content, 'utf8');
console.log('T35I 阅读题录入完成（正确格式）');
