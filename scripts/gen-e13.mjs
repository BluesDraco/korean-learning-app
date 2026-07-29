// Temporary generator for E13-I.json — original TOPIK I mock set 13
// Run: node scripts/gen-e13.mjs   (then delete this file)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public/data/topik/questions/E13-I.json');

const ER = 113;
const L = []; // listening 1-30
const R = []; // reading 31-70

function q(o) { return { level: 'beginner', type: 'multiple-choice', examRound: ER, groupId: null, ...o }; }

// ============ 听力 L01-L30 ============

// 1-4 응답 response [easy]
L.push(q({ id:'E13I-L01', section:'listening', topic:'일상', number:1, difficulty:'easy', testPoint:'날씨 상태 응답',
  audioText:'남자: 오늘 날씨가 어때요?',
  prompt:'여자의 대답으로 알맞은 것은?', promptZh:'今天天气怎么样？（选合适的答语）',
  options:['네, 날씨를 봐요.','아니요, 날씨가 없어요.','조금 추워요.','날씨를 좋아해요.'],
  correctIdx:2,
  explanation:'「날씨가 어때요?」是用「어때요」询问状态,须用形容词描述天气,「조금 추워요(有点冷)」正好回答状态。①「날씨를 봐요」把天气当宾语看,答非所问;②天气不能说「없어요(没有)」,语法不搭;④「좋아해요」是回答喜好而非状态。③정답。要点:「어때요」问状态→用形容词答。',
  vocabulary:['날씨','춥다','어때요'], questionType:'I-L-response' }));

L.push(q({ id:'E13I-L02', section:'listening', topic:'취미', number:2, difficulty:'easy', testPoint:'예/아니요 존재 응답',
  audioText:'여자: 주말에 시간이 있어요?',
  prompt:'남자의 대답으로 알맞은 것은?', promptZh:'周末有时间吗？（选合适的答语）',
  options:['네, 시간이 있어요.','네, 시간을 만나요.','아니요, 시간이 예뻐요.','아니요, 시간이 멀어요.'],
  correctIdx:0,
  explanation:'「시간이 있어요?」问存在与否,肯定回答用「네, 시간이 있어요」呼应。②「시간을 만나요」搭配错误,时间不能「만나다(见面)」;③「예뻐요(漂亮)」不能形容时间;④「멀어요(远)」用于距离,与时间存在无关。①정답。要点:「N이/가 있어요?」→「네, N이/가 있어요」。',
  vocabulary:['주말','시간','있다'], questionType:'I-L-response' }));

L.push(q({ id:'E13I-L03', section:'listening', topic:'쇼핑', number:3, difficulty:'easy', testPoint:'가격 수량 응답',
  audioText:'여자: 이 사과 얼마예요?',
  prompt:'남자의 대답으로 알맞은 것은?', promptZh:'这苹果多少钱？（选合适的答语）',
  options:['한 개 있어요.','사과를 좋아해요.','이천 원이에요.','아주 맛있어요.'],
  correctIdx:2,
  explanation:'「얼마예요?」问价格,须用金额回答,「이천 원이에요(两千韩元)」正确。①回答的是数量而非价格;②回答喜好;④回答味道。都不答价格。③정답。要点:「얼마예요?」→金额「N 원이에요」。',
  vocabulary:['사과','얼마','원'], questionType:'I-L-response' }));

L.push(q({ id:'E13I-L04', section:'listening', topic:'학교', number:4, difficulty:'easy', testPoint:'감사 표현 응답',
  audioText:'남자: 도와주셔서 정말 고맙습니다.',
  prompt:'여자의 대답으로 알맞은 것은?', promptZh:'非常感谢您的帮助。（选合适的答语）',
  options:['천만에요.','오랜만이에요.','잘 먹겠습니다.','축하합니다.'],
  correctIdx:0,
  explanation:'对方说「고맙습니다(谢谢)」,应答用「천만에요(不客气)」。②「오랜만이에요」是久别重逢的问候;③「잘 먹겠습니다」是饭前用语;④「축하합니다」是祝贺。都不对应道谢。①정답。要点:感谢→「천만에요/별말씀을요」。',
  vocabulary:['돕다','고맙다','천만에요'], questionType:'I-L-response' }));

// 5-6 접속(이어지는 말) followup [easy]
L.push(q({ id:'E13I-L05', section:'listening', topic:'일상', number:5, difficulty:'easy', testPoint:'전화 첫 인사 접속',
  audioText:'남자: 여보세요, 거기 민수 씨 집이지요?',
  prompt:'이어지는 여자의 말로 알맞은 것은?', promptZh:'喂,是民秀家吧?（选自然的接续话）',
  options:['잘 먹었습니다.','네, 그런데 누구세요?','처음 뵙겠습니다.','안녕히 계세요.'],
  correctIdx:1,
  explanation:'电话中确认「민수 씨 집이지요?」后,接话应先肯定再反问身份「네, 그런데 누구세요?」最自然。①饭后用语;③初次见面用语,电话里对方还没自报家门不合适作首选应答;④是挂断/告别语,对话刚开始不合适。②정답。要点:接电话被问确认→「네, 누구세요?」。',
  vocabulary:['여보세요','전화','누구'], questionType:'I-L-followup' }));

L.push(q({ id:'E13I-L06', section:'listening', topic:'식당', number:6, difficulty:'easy', testPoint:'주문 후 접속',
  audioText:'여자: 여기 비빔밥 두 개 주세요.',
  prompt:'이어지는 남자(점원)의 말로 알맞은 것은?', promptZh:'请给我两份拌饭。（选店员自然的接续话）',
  options:['네, 잠시만 기다려 주세요.','저는 비빔밥이 싫어요.','여기 앉으세요, 손님.','얼마나 자주 오세요?'],
  correctIdx:0,
  explanation:'顾客点餐后,店员应答「네, 잠시만 기다려 주세요(好的,请稍等)」最自然。②店员说自己讨厌拌饭不合场景;③是刚进门时的引位语,点完餐再说不合时序;④闲聊问句与点餐应答不搭。①정답。要点:顾客点餐→店员「네, 잠시만요/기다려 주세요」。',
  vocabulary:['비빔밥','주다','기다리다'], questionType:'I-L-followup' }));

// 7-10 장소 place [easy] — options 是地점 명사
L.push(q({ id:'E13I-L07', section:'listening', topic:'장소', number:7, difficulty:'easy', testPoint:'대화 장소 추론·병원',
  audioText:'여자: 어디가 아프세요?\n남자: 어제부터 목이 아프고 열이 나요.',
  prompt:'여기는 어디입니까?', promptZh:'这里是哪里？',
  options:['병원','서점','미용실','우체국'],
  correctIdx:0,
  explanation:'「어디가 아프세요?」「목이 아프고 열이 나요」是医生问诊、病人描述症状的对话,发生在「병원(医院)」。②书店谈书;③美容院谈发型;④邮局办寄件。都与看病无关。①정답。要点:症状+问诊→医院。',
  vocabulary:['아프다','목','열'], questionType:'I-L-place' }));

L.push(q({ id:'E13I-L08', section:'listening', topic:'장소', number:8, difficulty:'easy', testPoint:'대화 장소 추론·은행',
  audioText:'남자: 돈을 좀 찾으려고 하는데요.\n여자: 여기 이 서류를 먼저 써 주세요.',
  prompt:'여기는 어디입니까?', promptZh:'这里是哪里？',
  options:['도서관','은행','약국','빵집'],
  correctIdx:1,
  explanation:'「돈을 찾다(取钱)」「서류를 쓰다(填单)」是在「은행(银行)」办理。①图书馆借书;③药店买药;④面包店买面包。都不办理取款。②정답。要点:取钱/填单→银行。',
  vocabulary:['돈','찾다','서류'], questionType:'I-L-place' }));

L.push(q({ id:'E13I-L09', section:'listening', topic:'장소', number:9, difficulty:'easy', testPoint:'대화 장소 추론·꽃집',
  audioText:'여자: 어머니 생신 선물로 장미꽃을 사고 싶어요.\n남자: 그럼 이 빨간 장미 한 다발은 어떠세요?',
  prompt:'여기는 어디입니까?', promptZh:'这里是哪里？',
  options:['꽃집','옷 가게','신발 가게','과일 가게'],
  correctIdx:0,
  explanation:'买「장미꽃(玫瑰花)」「한 다발(一束)」是在「꽃집(花店)」。②卖衣服;③卖鞋;④卖水果。都不卖花。①정답。要点:玫瑰/花束→花店。',
  vocabulary:['장미','꽃','선물'], questionType:'I-L-place' }));

L.push(q({ id:'E13I-L10', section:'listening', topic:'장소', number:10, difficulty:'easy', testPoint:'대화 장소 추론·공항',
  audioText:'남자: 인천으로 가는 비행기가 몇 시에 출발해요?\n여자: 손님, 여권을 보여 주시겠어요?',
  prompt:'여기는 어디입니까?', promptZh:'这里是哪里？',
  options:['기차역','지하철역','공항','버스 정류장'],
  correctIdx:2,
  explanation:'「비행기(飞机)」「여권(护照)」是在「공항(机场)」办登机。①火车站坐火车;②地铁站;④公交站。都不涉及飞机和护照。③정답。要点:飞机+护照→机场。',
  vocabulary:['비행기','여권','출발'], questionType:'I-L-place' }));

// 11-14 화제 topic [easy] — options 是话题 명사
L.push(q({ id:'E13I-L11', section:'listening', topic:'화제', number:11, difficulty:'easy', testPoint:'대화 화제·가족',
  audioText:'남자: 형제가 어떻게 되세요?\n여자: 저는 언니 한 명하고 남동생 한 명이 있어요.',
  prompt:'두 사람은 무엇에 대해 이야기하고 있습니까?', promptZh:'两人在谈论什么？',
  options:['가족','고향','나이','직업'],
  correctIdx:0,
  explanation:'「형제」「언니」「남동생」都是家庭成员,谈的是「가족(家庭)」。②故乡谈地方;③年龄谈岁数;④职业谈工作。都没出现。①정답。要点:兄弟姐妹→家庭。',
  vocabulary:['형제','언니','남동생'], questionType:'I-L-topic' }));

L.push(q({ id:'E13I-L12', section:'listening', topic:'화제', number:12, difficulty:'easy', testPoint:'대화 화제·취미',
  audioText:'여자: 시간이 있을 때 보통 뭐 하세요?\n남자: 저는 주말마다 등산을 하러 가요.',
  prompt:'두 사람은 무엇에 대해 이야기하고 있습니까?', promptZh:'两人在谈论什么？',
  options:['날씨','취미','약속','교통'],
  correctIdx:1,
  explanation:'「시간이 있을 때 뭐 하세요」问闲暇活动,「등산을 하러 가요」是爱好,谈的是「취미(爱好)」。①天气;③约会安排;④交通。都不符。②정답。要点:空闲做什么/登山→爱好。',
  vocabulary:['등산','주말','취미'], questionType:'I-L-topic' }));

L.push(q({ id:'E13I-L13', section:'listening', topic:'화제', number:13, difficulty:'easy', testPoint:'대화 화제·계획',
  audioText:'남자: 이번 방학에 뭐 할 거예요?\n여자: 저는 부산에 여행을 갈 거예요.',
  prompt:'두 사람은 무엇에 대해 이야기하고 있습니까?', promptZh:'两人在谈论什么？',
  options:['건강','계획','값','음식'],
  correctIdx:1,
  explanation:'「이번 방학에 뭐 할 거예요?」「여행을 갈 거예요」用将来时谈假期打算,话题是「계획(计划)」。①健康;③价格;④食物。都没提。②정답。要点:「-을 거예요」谈将来打算→计划。',
  vocabulary:['방학','여행','계획'], questionType:'I-L-topic' }));

L.push(q({ id:'E13I-L14', section:'listening', topic:'화제', number:14, difficulty:'easy', testPoint:'대화 화제·날씨',
  audioText:'여자: 밖에 비가 많이 와요?\n남자: 네, 바람도 불고 아주 추워요.',
  prompt:'두 사람은 무엇에 대해 이야기하고 있습니까?', promptZh:'两人在谈论什么？',
  options:['날씨','시간','장소','나라'],
  correctIdx:0,
  explanation:'「비가 오다」「바람이 불다」「춥다」都描述天气状况,话题是「날씨(天气)」。②时间;③场所;④国家。都不符。①정답。要点:雨/风/冷→天气。',
  vocabulary:['비','바람','춥다'], questionType:'I-L-topic' }));

// 15-16 그림 picture [medium]
L.push(q({ id:'E13I-L15', section:'listening', topic:'교통', number:15, difficulty:'medium', testPoint:'看图选话·地铁问路',
  audioText:'여자: 저기요, 시청역까지 어떻게 가요?\n남자: 여기에서 지하철 2호선을 타고 세 정거장 가시면 돼요.',
  prompt:'대화에 알맞은 그림을 고르십시오.', promptZh:'请选择与对话相符的图片。',
  options:['①남자가 지하철 안에서 자리에 앉아 졸고 있다','②여자가 지하철역에서 남자에게 길을 물어보고 있다','③두 사람이 버스 안에서 손잡이를 잡고 서 있다','④여자가 매표소에서 표를 사고 있다'],
  imageDescriptions:['男子在地铁里座位上打瞌睡','女子在地铁站向男子问路','两人在公交车里抓着扶手站着','女子在售票处买票'],
  correctIdx:1,
  explanation:'对话是女子问「시청역까지 어떻게 가요?」男子指路,场景为地铁站里问路。①打瞌睡无问答;③在公交车上与地铁不符;④买票无问路对话。②정답。要点:问路+指方向→车站问路场景。',
  vocabulary:['지하철','정거장','타다'], questionType:'I-L-picture', audioUrl:'' }));

L.push(q({ id:'E13I-L16', section:'listening', topic:'생일', number:16, difficulty:'medium', testPoint:'看图选话·生日蛋糕',
  audioText:'남자: 생일 축하해요! 이거 선물이에요.\n여자: 와, 고마워요. 케이크도 정말 예쁘네요.',
  prompt:'대화에 알맞은 그림을 고르십시오.', promptZh:'请选择与对话相符的图片。',
  options:['①남자가 여자에게 선물을 주고 여자가 케이크를 보며 기뻐한다','②두 사람이 식당에서 밥을 먹고 있다','③여자가 혼자 케이크를 만들고 있다','④남자가 꽃집에서 꽃을 사고 있다'],
  imageDescriptions:['男子把礼物递给女子,女子看着蛋糕开心','两人在餐厅吃饭','女子独自在做蛋糕','男子在花店买花'],
  correctIdx:0,
  explanation:'男子送礼说生日快乐,女子看着蛋糕道谢,场景是送礼庆生。②吃饭无送礼;③独自做蛋糕无对话双方;④买花与蛋糕不符。①정답。要点:生日祝福+递礼物+夸蛋糕→庆生送礼场景。',
  vocabulary:['생일','선물','케이크'], questionType:'I-L-picture', audioUrl:'' }));

// 17-21 세부 내용 일치 detail [medium]
L.push(q({ id:'E13I-L17', section:'listening', topic:'약속', number:17, difficulty:'medium', testPoint:'세부 일치·약속 변경',
  audioText:'여자: 민호 씨, 내일 두 시에 만나기로 했지요?\n남자: 네, 그런데 제가 오전에 병원에 가야 해서요. 세 시로 미룰 수 있을까요?\n여자: 좋아요. 그럼 내일 세 시에 카페에서 봐요.',
  prompt:'대화 내용과 같은 것을 고르십시오.', promptZh:'请选择与对话内容一致的一项。',
  options:['두 사람은 두 시에 만날 겁니다.','남자는 오전에 병원에 갑니다.','여자는 약속을 취소했습니다.','두 사람은 식당에서 만날 겁니다.'],
  correctIdx:1,
  explanation:'男子说「오전에 병원에 가야 해서」要改约,与②一致。①约会已从两点改到三点,不是两点;③女子说「좋아요」同意改时间不是取消;④约在「카페(咖啡厅)」不是餐厅。②정답。要点:抓住改约理由「오전 병원」这一细节。',
  vocabulary:['약속','병원','미루다'], questionType:'I-L-detail' }));

L.push(q({ id:'E13I-L18', section:'listening', topic:'날씨', number:18, difficulty:'medium', testPoint:'세부 일치·주말 계획',
  audioText:'남자: 이번 주말에 등산 가기로 했는데 비가 온대요.\n여자: 그래요? 그럼 등산은 다음으로 미루고 영화나 볼까요?\n남자: 좋아요. 제가 표를 예매할게요.',
  prompt:'대화 내용과 같은 것을 고르십시오.', promptZh:'请选择与对话内容一致的一项。',
  options:['두 사람은 주말에 등산을 갈 겁니다.','남자가 영화표를 예매할 겁니다.','이번 주말에는 날씨가 맑습니다.','여자가 등산을 가자고 했습니다.'],
  correctIdx:1,
  explanation:'男子说「제가 표를 예매할게요」要订电影票,与②一致。①因下雨登山推迟,不去登山;③预报说「비가 온대요(下雨)」不是晴;④是女子提议改看电影,不是提议登山。②정답。要点:抓「제가 예매할게요」的施动者。',
  vocabulary:['등산','예매하다','영화'], questionType:'I-L-detail' }));

L.push(q({ id:'E13I-L19', section:'listening', topic:'쇼핑', number:19, difficulty:'medium', testPoint:'세부 일치·교환',
  audioText:'여자: 어제 산 이 신발을 바꾸고 싶은데요. 좀 작아요.\n남자: 네, 한 치수 큰 걸로 드릴게요. 색깔은 그대로 괜찮으세요?\n여자: 네, 색깔은 마음에 들어요.',
  prompt:'대화 내용과 같은 것을 고르십시오.', promptZh:'请选择与对话内容一致的一项。',
  options:['여자는 신발을 환불하려고 합니다.','여자는 신발 색깔이 마음에 안 듭니다.','여자는 더 큰 치수로 바꾸려고 합니다.','남자는 신발이 없다고 했습니다.'],
  correctIdx:2,
  explanation:'鞋子偏小,女子要换「한 치수 큰 걸(大一号)」,与③一致。①是换货(바꾸다)不是退款(환불);②女子说「색깔은 마음에 들어요」满意颜色;④店员说给大一号,没说没货。③정답。要点:区分「바꾸다(换)」与「환불(退款)」。',
  vocabulary:['신발','치수','바꾸다'], questionType:'I-L-detail' }));

L.push(q({ id:'E13I-L20', section:'listening', topic:'직장', number:20, difficulty:'medium', testPoint:'세부 일치·회의 안내',
  audioText:'남자: 수미 씨, 오늘 회의가 몇 시에 시작해요?\n여자: 원래 세 시였는데 두 시로 바뀌었어요. 회의실은 오 층이에요.\n남자: 알겠어요. 자료는 제가 준비할게요.',
  prompt:'대화 내용과 같은 것을 고르십시오.', promptZh:'请选择与对话内容一致的一项。',
  options:['회의는 세 시에 시작합니다.','회의실은 오 층에 있습니다.','여자가 자료를 준비합니다.','회의 장소가 바뀌었습니다.'],
  correctIdx:1,
  explanation:'女子说「회의실은 오 층이에요」,与②一致。①会议时间从三点改到两点,不是三点;③男子说「제가 준비할게요」准备资料的是男子;④改的是时间不是地点。②정답。要点:区分改变的是「시간」还是「장소」。',
  vocabulary:['회의','회의실','자료'], questionType:'I-L-detail' }));

L.push(q({ id:'E13I-L21', section:'listening', topic:'여행', number:21, difficulty:'medium', testPoint:'세부 일치·여행 준비',
  audioText:'여자: 제주도 여행 준비 다 했어요?\n남자: 비행기표는 샀는데 호텔은 아직 못 정했어요.\n여자: 그럼 제가 좋은 호텔을 하나 추천해 줄게요.',
  prompt:'대화 내용과 같은 것을 고르십시오.', promptZh:'请选择与对话内容一致的一项。',
  options:['남자는 호텔을 이미 예약했습니다.','남자는 비행기표를 샀습니다.','여자는 제주도에 갈 겁니다.','두 사람은 함께 여행을 갑니다.'],
  correctIdx:1,
  explanation:'男子说「비행기표는 샀는데」已买机票,与②一致。①酒店「아직 못 정했어요」还没定,更没预约;③④对话只说女子推荐酒店,没说她也去或一起去,信息不足不能选。②정답。要点:只选对话明确说到的信息,不臆测。',
  vocabulary:['제주도','비행기표','호텔'], questionType:'I-L-detail' }));

// 22-24 중심 생각 mainidea [medium]
L.push(q({ id:'E13I-L22', section:'listening', topic:'건강', number:22, difficulty:'medium', testPoint:'중심 생각·운동 습관',
  audioText:'여자: 요즘 계속 앉아서 일하니까 허리가 아파요.\n남자: 그러면 한 시간에 한 번씩 일어나서 조금씩 걸어 보세요. 저도 그렇게 하니까 훨씬 좋아졌어요.',
  prompt:'남자의 중심 생각으로 알맞은 것은?', promptZh:'男子的中心想法是什么？',
  options:['오래 앉아 일해야 합니다.','자주 일어나서 움직이는 것이 좋습니다.','허리가 아프면 병원에 가야 합니다.','일을 그만두는 것이 좋습니다.'],
  correctIdx:1,
  explanation:'男子建议「한 시간에 한 번씩 일어나서 걸어 보세요」并说自己这么做「훨씬 좋아졌어요」,中心是常起身活动有好处,②对。①与建议相反;③没提去医院;④没说辞职。②정답。要点:抓建议句「-어 보세요」+效果句。',
  vocabulary:['허리','일어나다','걷다'], questionType:'I-L-mainidea' }));

L.push(q({ id:'E13I-L23', section:'listening', topic:'환경', number:23, difficulty:'medium', testPoint:'중심 생각·장바구니',
  audioText:'남자: 마트에서 비닐봉지를 살 때마다 돈도 들고 쓰레기도 많아져요.\n여자: 맞아요. 그래서 저는 항상 장바구니를 가지고 다녀요. 조금 불편해도 환경에 좋잖아요.',
  prompt:'여자의 중심 생각으로 알맞은 것은?', promptZh:'女子的中心想法是什么？',
  options:['비닐봉지가 더 편리합니다.','장바구니를 쓰는 것이 좋습니다.','마트에 자주 가면 안 됩니다.','쓰레기는 버리면 됩니다.'],
  correctIdx:1,
  explanation:'女子说「항상 장바구니를 가지고 다녀요」并说「불편해도 환경에 좋잖아요」,主张用购物袋,②对。①塑料袋方便与女子立场相反;③没说别常去超市;④没说随便扔垃圾。②정답。要点:「불편해도 ~잖아요」表明其坚持的主张。',
  vocabulary:['비닐봉지','장바구니','환경'], questionType:'I-L-mainidea' }));

L.push(q({ id:'E13I-L24', section:'listening', topic:'학습', number:24, difficulty:'medium', testPoint:'중심 생각·외국어 공부',
  audioText:'여자: 한국어 단어가 너무 안 외워져서 속상해요.\n남자: 단어는 한 번에 많이 외우는 것보다 매일 조금씩 꾸준히 하는 게 더 잘 외워져요.',
  prompt:'남자의 중심 생각으로 알맞은 것은?', promptZh:'男子的中心想法是什么？',
  options:['단어를 한 번에 많이 외워야 합니다.','매일 꾸준히 외우는 것이 좋습니다.','단어는 외울 필요가 없습니다.','한국어는 배우기 어렵습니다.'],
  correctIdx:1,
  explanation:'男子说「매일 조금씩 꾸준히 하는 게 더 잘 외워져요」,主张每天坚持,②对。①一次多背与男子建议相反;③没说不用背;④没评价韩语难易。②정답。要点:「A보다 B가 더 좋다」比较句里被推荐的是B。',
  vocabulary:['단어','외우다','꾸준히'], questionType:'I-L-mainidea' }));

// 25-26 독백 목적 passage-purpose [medium] 组 G25-26
const AT2526 = '여자(안내 방송): 손님 여러분께 안내 말씀 드립니다. 저희 도서관은 이번 주 토요일부터 이용 시간이 바뀝니다. 평일에는 오전 아홉 시부터 밤 열 시까지, 주말에는 오전 열 시부터 오후 여섯 시까지 문을 엽니다. 또한 삼 층 열람실은 공사로 인해 다음 달까지 이용하실 수 없습니다. 이용에 불편을 드려 죄송합니다.';
L.push(q({ id:'E13I-L25', section:'listening', topic:'안내', number:25, difficulty:'medium', testPoint:'독백 목적·도서관 안내',
  audioText:AT2526,
  prompt:'여자가 왜 이 이야기를 하고 있는지 고르십시오.', promptZh:'女子为什么说这段话？',
  options:['도서관 이용 방법을 알려 주려고','바뀐 이용 시간과 공사를 안내하려고','새 책을 소개하려고','회원 가입을 권하려고'],
  correctIdx:1,
  explanation:'广播说「이용 시간이 바뀝니다」并告知三楼施工停用,目的是通知开放时间变更和施工,②对。①没讲怎么使用图书馆;③没介绍新书;④没劝办会员。②정답。要点:公告类独白抓"通知了什么变化"。',
  vocabulary:['도서관','이용','공사'], questionType:'I-L-passage-purpose', groupId:'E13I-L-G25-26' }));

L.push(q({ id:'E13I-L26', section:'listening', topic:'안내', number:26, difficulty:'medium', testPoint:'독백 세부·주말 개관',
  audioText:AT2526,
  prompt:'들은 내용과 같은 것을 고르십시오.', promptZh:'请选择与听到内容一致的一项。',
  options:['주말에는 오전 열 시에 문을 엽니다.','평일에는 밤 열두 시까지 엽니다.','삼 층 열람실은 지금 이용할 수 있습니다.','이용 시간은 바뀌지 않습니다.'],
  correctIdx:0,
  explanation:'广播说「주말에는 오전 열 시부터」,与①一致。②平日到「밤 열 시」不是十二点;③三楼阅览室施工「이용하실 수 없습니다」不能用;④明确说时间「바뀝니다」有变。①정답。要点:核对具体数字(周末10点)。',
  vocabulary:['주말','평일','열람실'], questionType:'I-L-passage-purpose', groupId:'E13I-L-G25-26' }));

// 27-28 대화 passage-topic [medium] 组 G27-28
const AT2728 = '남자: 수미 씨, 이번 여름휴가 때 뭐 할 거예요?\n여자: 저는 시골에 계신 할머니 댁에 가려고요. 매년 여름마다 가는데 공기도 맑고 조용해서 정말 좋아요.\n남자: 좋겠어요. 저는 사람이 많은 도시보다 시골이 더 편하더라고요.\n여자: 맞아요. 이번에는 할머니랑 텃밭에서 채소도 같이 기를 거예요.';
L.push(q({ id:'E13I-L27', section:'listening', topic:'휴가', number:27, difficulty:'medium', testPoint:'대화 화제·여름휴가',
  audioText:AT2728,
  prompt:'두 사람은 무엇에 대해 이야기하고 있습니까?', promptZh:'两人在谈论什么？',
  options:['여름휴가 계획','시골 집값','채소 값','할머니의 건강'],
  correctIdx:0,
  explanation:'对话围绕「여름휴가 때 뭐 할 거예요」展开谈假期安排,话题是暑假计划,①对。②房价③菜价没谈;④只提奶奶家没谈健康。①정답。要点:开头设问句常点出话题。',
  vocabulary:['여름휴가','시골','할머니'], questionType:'I-L-passage-topic', groupId:'E13I-L-G27-28' }));

L.push(q({ id:'E13I-L28', section:'listening', topic:'휴가', number:28, difficulty:'medium', testPoint:'대화 세부·여자의 계획',
  audioText:AT2728,
  prompt:'여자에 대한 내용과 같은 것을 고르십시오.', promptZh:'关于女子,与内容一致的一项是？',
  options:['여자는 도시로 여행을 갑니다.','여자는 할머니 댁에 매년 갑니다.','여자는 시골을 싫어합니다.','여자는 채소를 사러 갑니다.'],
  correctIdx:1,
  explanation:'女子说「매년 여름마다 가는데」每年都去奶奶家,与②一致。①她去乡下不是城市;③她说乡下「정말 좋아요」喜欢;④她要「채소도 같이 기를 거예요」是种菜不是买菜。②정답。要点:「기르다(种植)」≠「사다(买)」。',
  vocabulary:['매년','텃밭','기르다'], questionType:'I-L-passage-topic', groupId:'E13I-L-G27-28' }));

// 29-30 긴 독백 passage-main [hard] 组 G29-30
const AT2930 = '남자: 저는 십 년 동안 다니던 회사를 그만두고 작은 빵집을 열었습니다. 처음에는 안정된 직장을 왜 그만두느냐고 걱정하는 사람이 많았습니다. 하지만 저는 어릴 때부터 빵 만드는 일을 정말 좋아했고, 언젠가는 제 가게를 갖고 싶었습니다. 지금은 매일 새벽에 일어나 빵을 굽느라 몸은 힘들지만 마음은 어느 때보다 즐겁습니다. 좋아하는 일을 하니까 힘든 것도 견딜 수 있는 것 같습니다.';
L.push(q({ id:'E13I-L29', section:'listening', topic:'직업', number:29, difficulty:'hard', testPoint:'독백 중심 생각·좋아하는 일',
  audioText:AT2930,
  prompt:'남자의 중심 생각으로 알맞은 것은?', promptZh:'男子的中心想法是什么？',
  options:['안정된 직장이 가장 중요합니다.','좋아하는 일을 하면 힘들어도 즐겁습니다.','빵집은 돈을 많이 법니다.','새벽에 일어나는 것은 나쁩니다.'],
  correctIdx:1,
  explanation:'男子说「좋아하는 일을 하니까 힘든 것도 견딜 수 있는 것 같습니다」,中心是做喜欢的事虽累却快乐,②对。①他辞掉稳定工作与"最重要"相反;③没谈赚钱多少;④他说身体累但心里快乐,没否定早起本身。②정답。要点:结尾总结句最能点明主张。',
  vocabulary:['그만두다','빵집','견디다'], questionType:'I-L-passage-main', groupId:'E13I-L-G29-30' }));

L.push(q({ id:'E13I-L30', section:'listening', topic:'직업', number:30, difficulty:'hard', testPoint:'독백 세부·이유',
  audioText:AT2930,
  prompt:'들은 내용과 같은 것을 고르십시오.', promptZh:'请选择与听到内容一致的一项。',
  options:['남자는 회사를 계속 다니고 있습니다.','남자는 어릴 때부터 빵 만들기를 좋아했습니다.','남자는 빵집 일이 힘들어서 후회합니다.','주변 사람들은 모두 그를 응원했습니다.'],
  correctIdx:1,
  explanation:'男子说「어릴 때부터 빵 만드는 일을 정말 좋아했고」,与②一致。①他「그만두고 빵집을 열었습니다」已辞职;③他说「마음은 즐겁습니다」不后悔;④「걱정하는 사람이 많았습니다」很多人担心,不是都支持。②정답。要点:排除与原文态度、事实相反的项。',
  vocabulary:['어리다','좋아하다','걱정'], questionType:'I-L-passage-main', groupId:'E13I-L-G29-30' }));

// ============ 阅读 R31-R70 ============
// 31-33 화제 topic [easy]
R.push(q({ id:'E13I-R31', section:'reading', topic:'화제', number:31, difficulty:'easy', testPoint:'짧은 글 화제·계절',
  prompt:'봄은 따뜻합니다. 겨울은 춥습니다.\n\n무엇에 대한 이야기입니까?',
  promptZh:'春天温暖,冬天寒冷。这是关于什么的话？',
  options:['계절','시간','장소','음식'],
  correctIdx:0,
  explanation:'「봄」「겨울」是季节,谈的是「계절(季节)」。②时间③场所④食物都没涉及。①정답。要点:春/冬→季节。',
  vocabulary:['봄','겨울','계절'], questionType:'I-R-topic' }));

R.push(q({ id:'E13I-R32', section:'reading', topic:'화제', number:32, difficulty:'easy', testPoint:'짧은 글 화제·값',
  prompt:'우유는 천 원입니다. 빵은 이천 원입니다.\n\n무엇에 대한 이야기입니까?',
  promptZh:'牛奶一千韩元,面包两千韩元。这是关于什么的话？',
  options:['맛','값','색깔','크기'],
  correctIdx:1,
  explanation:'「천 원」「이천 원」都是金额,谈的是「값(价格)」。①味道②颜色④大小都没提。②정답。要点:金额数字→价格。',
  vocabulary:['우유','빵','값'], questionType:'I-R-topic' }));

R.push(q({ id:'E13I-R33', section:'reading', topic:'화제', number:33, difficulty:'easy', testPoint:'짧은 글 화제·날짜',
  prompt:'오늘은 오월 오일입니다. 내일은 오월 육일입니다.\n\n무엇에 대한 이야기입니까?',
  promptZh:'今天是5月5日,明天是5月6日。这是关于什么的话？',
  options:['요일','날짜','나이','시간'],
  correctIdx:1,
  explanation:'「오월 오일」「오월 육일」是几月几号,谈的是「날짜(日期)」。①星期几②年龄④时间(点)都不符。②정답。要点:月/日→日期;별与"요일(星期)"区分。',
  vocabulary:['오늘','내일','날짜'], questionType:'I-R-topic' }));

// 34-39 빈칸 채우기(词性) fill [easy]
R.push(q({ id:'E13I-R34', section:'reading', topic:'일상', number:34, difficulty:'easy', testPoint:'동사 채우기·자다',
  prompt:'저는 밤에 침대에서 (   ).',
  promptZh:'我晚上在床上（　）。',
  options:['잡니다','먹습니다','읽습니다','걷습니다'],
  correctIdx:0,
  explanation:'「밤에 침대에서」晚上在床上,自然的动词是「잡니다(睡觉)」。②吃③读④走都与"床上晚上"搭配不自然。①정답。要点:床+夜晚→睡觉。',
  vocabulary:['밤','침대','자다'], questionType:'I-R-fill-verb' }));

R.push(q({ id:'E13I-R35', section:'reading', topic:'날씨', number:35, difficulty:'easy', testPoint:'명사 채우기·우산',
  prompt:'비가 옵니다. 그래서 (   )을 씁니다.',
  promptZh:'下雨了,所以撑（　）。',
  options:['모자','우산','안경','가방'],
  correctIdx:1,
  explanation:'下雨时撑的是「우산(雨伞)」,「우산을 쓰다」是固定搭配。①帽子③眼镜④包虽都能「쓰다/들다」但下雨语境要伞。②정답。要点:비+쓰다→우산。',
  vocabulary:['비','우산','쓰다'], questionType:'I-R-fill-noun' }));

R.push(q({ id:'E13I-R36', section:'reading', topic:'일상', number:36, difficulty:'easy', testPoint:'조사 채우기·에서',
  prompt:'저는 도서관(   ) 책을 읽습니다.',
  promptZh:'我在图书馆读书。',
  options:['에서','에게','까지','보다'],
  correctIdx:0,
  explanation:'「책을 읽다」是在某地进行的动作,场所助词用「에서」。②에게用于人;③까지表到某处终点;④보다是比较。②③④都不搭动作场所。①정답。要点:动作发生地→에서。',
  vocabulary:['도서관','책','읽다'], questionType:'I-R-fill-particle' }));

R.push(q({ id:'E13I-R37', section:'reading', topic:'일상', number:37, difficulty:'easy', testPoint:'부사 채우기·아주',
  prompt:'이 커피는 (   ) 뜨거우니까 조심하세요.',
  promptZh:'这咖啡（　）烫,请小心。',
  options:['아주','전혀','별로','거의'],
  correctIdx:0,
  explanation:'后句「조심하세요(小心)」提示咖啡很烫,程度副词用「아주(非常)」。②전혀③별로后须接否定;④거의(几乎)语义不搭"提醒小心"。①정답。要点:「전혀/별로」要与否定呼应,肯定句用「아주」。',
  vocabulary:['커피','뜨겁다','조심하다'], questionType:'I-R-fill-adv' }));

R.push(q({ id:'E13I-R38', section:'reading', topic:'감정', number:38, difficulty:'easy', testPoint:'형용사 채우기·기쁘다',
  prompt:'시험에 합격해서 정말 (   ).',
  promptZh:'因为考试合格了,真（　）。',
  options:['슬픕니다','기쁩니다','아픕니다','피곤합니다'],
  correctIdx:1,
  explanation:'「시험에 합격해서(考试合格)」是好事,情绪应是「기쁩니다(高兴)」。①悲伤②应为①슬픕니다方向相反;③疼痛④疲惫都与合格的喜悦不符。②정답。要点:合格→喜悦。',
  vocabulary:['시험','합격','기쁘다'], questionType:'I-R-fill-adj' }));

R.push(q({ id:'E13I-R39', section:'reading', topic:'일상', number:39, difficulty:'easy', testPoint:'동사 채우기·타다',
  prompt:'학교에 갈 때 저는 지하철을 (   ).',
  promptZh:'去学校时我（　）地铁。',
  options:['탑니다','만듭니다','만납니다','씻습니다'],
  correctIdx:0,
  explanation:'「지하철을」的搭配动词是「탑니다(乘坐)」。②做③见④洗都不与地铁搭配。①정답。要点:交通工具+타다。',
  vocabulary:['학교','지하철','타다'], questionType:'I-R-fill-verb' }));

// 40-42 틀린 것 wrong-info [medium]
R.push(q({ id:'E13I-R40', section:'reading', topic:'안내', number:40, difficulty:'medium', testPoint:'안내문 불일치·요리 교실',
  prompt:'◆ 즐거운 요리 교실 ◆\n장소: 시민회관 2층\n시간: 매주 토요일 오전 10시\n준비물: 앞치마\n수강료: 한 달 3만 원\n\n맞지 않는 것을 고르십시오.',
  promptZh:'（快乐料理教室海报）请选择与内容不符的一项。',
  options:['이 수업은 토요일에 합니다.','수업은 시민회관에서 합니다.','앞치마를 가져가야 합니다.','수업은 무료입니다.'],
  correctIdx:3,
  explanation:'海报写「수강료: 한 달 3만 원」每月3万韩元收费,所以④「무료(免费)」与内容不符,为答案。①「매주 토요일」周六✓;②「시민회관 2층」市民会馆✓;③「준비물: 앞치마」要带围裙✓。选不符的④。要点:找与告示矛盾项。',
  vocabulary:['요리','앞치마','수강료'], questionType:'I-R-wrong-info' }));

R.push(q({ id:'E13I-R41', section:'reading', topic:'안내', number:41, difficulty:'medium', testPoint:'초대장 불일치·집들이',
  prompt:'수미 씨,\n이번 주 일요일 저녁 6시에 저희 집들이에 오세요.\n주소: 행복아파트 101동 502호\n맛있는 음식을 준비할게요. 선물은 안 가져오셔도 돼요.\n- 민호 -\n\n맞지 않는 것을 고르십시오.',
  promptZh:'（乔迁邀请短信）请选择与内容不符的一项。',
  options:['집들이는 일요일에 합니다.','민호 씨가 음식을 준비합니다.','수미 씨는 선물을 꼭 사야 합니다.','집들이는 저녁 6시에 시작합니다.'],
  correctIdx:2,
  explanation:'邀请写「선물은 안 가져오셔도 돼요」不用带礼物,所以③「꼭 사야 합니다(必须买)」与内容不符,为答案。①「일요일」周日✓;②「음식을 준비할게요」民浩准备食物✓;④「저녁 6시」✓。选③。要点:「-아도 되다(可以不…)」表明非必须。',
  vocabulary:['집들이','선물','준비'], questionType:'I-R-wrong-info' }));

R.push(q({ id:'E13I-R42', section:'reading', topic:'안내', number:42, difficulty:'medium', testPoint:'공지 불일치·도서 반납',
  prompt:'[도서관 이용 안내]\n- 한 사람이 책 5권까지 빌릴 수 있습니다.\n- 빌린 책은 2주 안에 반납해야 합니다.\n- 늦게 반납하면 하루에 100원을 내야 합니다.\n\n맞지 않는 것을 고르십시오.',
  promptZh:'（图书馆使用须知）请选择与内容不符的一项。',
  options:['책은 다섯 권까지 빌릴 수 있습니다.','책은 두 달 안에 반납해야 합니다.','늦게 반납하면 돈을 내야 합니다.','한 사람이 여러 권을 빌릴 수 있습니다.'],
  correctIdx:1,
  explanation:'须知写「2주 안에 반납」两周内还,②「두 달(两个月)」与内容不符,为答案。①「5권까지」最多5本✓;③「하루에 100원」逾期罚款✓;④能借5本即多本✓。选②。要点:核对时限"2주"≠"두 달"。',
  vocabulary:['빌리다','반납','늦다'], questionType:'I-R-wrong-info' }));

// 43-45 같은 것 content_match [medium]
R.push(q({ id:'E13I-R43', section:'reading', topic:'일상', number:43, difficulty:'medium', testPoint:'내용 일치·주말 활동',
  prompt:'저는 지난 주말에 친구와 같이 영화를 봤습니다. 영화가 아주 재미있었습니다. 영화를 본 후에 우리는 근처 식당에서 저녁을 먹었습니다.',
  promptZh:'（上周末我和朋友看电影、吃晚饭的短文）请选择与内容一致的一项。',
  options:['저는 혼자 영화를 봤습니다.','영화가 재미없었습니다.','영화를 본 후에 저녁을 먹었습니다.','우리는 집에서 저녁을 먹었습니다.'],
  correctIdx:2,
  explanation:'原文「영화를 본 후에 저녁을 먹었습니다」,与③一致。①是「친구와 같이」不是独自;②「아주 재미있었습니다」有趣,与"没意思"相反;④在「식당에서」餐厅不是家。③정답。要点:核对时间顺序"看后吃饭"。',
  vocabulary:['주말','영화','저녁'], questionType:'I-R-content_match' }));

R.push(q({ id:'E13I-R44', section:'reading', topic:'취미', number:44, difficulty:'medium', testPoint:'내용 일치·운동',
  prompt:'제 동생은 매일 아침 공원에서 자전거를 탑니다. 저는 자전거를 못 타서 동생과 같이 걷기만 합니다. 우리는 운동을 한 후에 기분이 좋아집니다.',
  promptZh:'（弟弟骑车、我走路的短文）请选择与内容一致的一项。',
  options:['저는 자전거를 잘 탑니다.','동생은 매일 자전거를 탑니다.','우리는 저녁에 운동을 합니다.','운동 후에 기분이 나빠집니다.'],
  correctIdx:1,
  explanation:'原文「동생은 매일 아침 자전거를 탑니다」,与②一致。①「저는 자전거를 못 타서」我不会骑;③是「아침」早上不是晚上;④「기분이 좋아집니다」变好,与"变坏"相反。②정답。要点:分清"我"和"弟弟"各做什么。',
  vocabulary:['자전거','공원','기분'], questionType:'I-R-content_match' }));

R.push(q({ id:'E13I-R45', section:'reading', topic:'음식', number:45, difficulty:'medium', testPoint:'내용 일치·요리',
  prompt:'저는 어제 처음으로 김치찌개를 만들었습니다. 인터넷을 보고 따라 했는데 생각보다 어렵지 않았습니다. 맛도 괜찮아서 다음에 또 만들고 싶습니다.',
  promptZh:'（第一次做泡菜锅的短文）请选择与内容一致的一项。',
  options:['저는 김치찌개를 자주 만듭니다.','요리가 아주 어려웠습니다.','인터넷을 보고 요리했습니다.','맛이 없어서 실망했습니다.'],
  correctIdx:2,
  explanation:'原文「인터넷을 보고 따라 했는데」看网络学做,与③一致。①「어제 처음으로」昨天第一次做,不是经常;②「어렵지 않았습니다」不难,与"很难"相反;④「맛도 괜찮아서 또 만들고 싶습니다」味道不错还想再做,不是失望。③정답。要点:「처음으로」=第一次。',
  vocabulary:['김치찌개','인터넷','만들다'], questionType:'I-R-content_match' }));

// 46-48 중심 생각 mainidea [medium]
R.push(q({ id:'E13I-R46', section:'reading', topic:'습관', number:46, difficulty:'medium', testPoint:'중심 생각·아침밥',
  prompt:'저는 예전에 바빠서 아침을 자주 걸렀습니다. 그런데 아침을 안 먹으니까 오전에 힘이 없고 집중이 잘 안 됐습니다. 요즘은 간단하게라도 아침을 꼭 먹는데 하루가 훨씬 활기찹니다.',
  promptZh:'（关于吃早饭的短文）请选择中心想法。',
  options:['아침은 안 먹는 것이 좋습니다.','아침을 먹으면 하루가 활기찹니다.','아침은 많이 먹어야 합니다.','바쁘면 아침을 걸러도 됩니다.'],
  correctIdx:1,
  explanation:'作者说吃早饭后「하루가 훨씬 활기찹니다」,中心是吃早饭让一天更有活力,②对。①不吃与作者体会相反;③没强调要多吃,而是"简单也要吃";④作者反思过去空腹的坏处,不主张可省略。②정답。要点:抓转折后"요즘"的正面体会。',
  vocabulary:['아침','거르다','활기차다'], questionType:'I-R-mainidea' }));

R.push(q({ id:'E13I-R47', section:'reading', topic:'인간관계', number:47, difficulty:'medium', testPoint:'중심 생각·인사',
  prompt:'저는 이사 온 후에 옆집 이웃에게 먼저 밝게 인사를 했습니다. 그랬더니 이웃도 반갑게 인사를 받아 주었고, 지금은 서로 음식도 나누는 사이가 되었습니다. 작은 인사 하나가 사람 사이를 가깝게 만듭니다.',
  promptZh:'（关于打招呼的短文）请选择中心想法。',
  options:['이웃과 인사할 필요가 없습니다.','먼저 인사하면 사이가 가까워집니다.','이사는 자주 하는 것이 좋습니다.','음식을 나누면 안 됩니다.'],
  correctIdx:1,
  explanation:'结尾「작은 인사 하나가 사람 사이를 가깝게 만듭니다」直接点明:主动打招呼拉近关系,②对。①与作者主张相反;③没谈搬家频率;④作者正面说分享食物,不是否定。②정답。要点:结尾概括句即中心。',
  vocabulary:['이웃','인사','가깝다'], questionType:'I-R-mainidea' }));

R.push(q({ id:'E13I-R48', section:'reading', topic:'환경', number:48, difficulty:'medium', testPoint:'중심 생각·계단 이용',
  prompt:'저는 요즘 엘리베이터 대신 계단을 이용합니다. 처음에는 힘들었지만 이제는 다리도 튼튼해지고 전기도 아낄 수 있어 좋습니다. 조금 불편해도 건강과 환경에 모두 도움이 됩니다.',
  promptZh:'（关于走楼梯的短文）请选择中心想法。',
  options:['엘리베이터가 더 편리합니다.','계단을 이용하면 건강과 환경에 좋습니다.','계단은 위험하니 조심해야 합니다.','전기를 많이 써도 괜찮습니다.'],
  correctIdx:1,
  explanation:'作者说走楼梯「건강과 환경에 모두 도움이 됩니다」,中心是走楼梯对健康和环境都好,②对。①电梯方便与作者选择相反;③没谈危险;④「전기도 아낄 수 있어」是省电,与"多用也行"相反。②정답。要点:抓"불편해도 ~에 도움"的主张。',
  vocabulary:['계단','엘리베이터','튼튼하다'], questionType:'I-R-mainidea' }));

// 49-56 短文题组 fill/conn 交替
// G49-50: passage 完整正文
const P4950 = '저는 지난달부터 아침마다 공원에서 산책을 합니다. 처음에는 일찍 일어나는 것이 힘들었습니다. 하지만 맑은 공기를 마시며 걷다 보니 기분이 좋아졌습니다. 요즘은 산책을 (   ) 하루를 시작하는 것이 아주 즐겁습니다.';
R.push(q({ id:'E13I-R49', section:'reading', topic:'습관', number:49, difficulty:'medium', testPoint:'빈칸·연결어미 -면서/으로',
  prompt:'저는 지난달부터 아침마다 공원에서 산책을 합니다. 처음에는 일찍 일어나는 것이 힘들었습니다. 하지만 맑은 공기를 마시며 걷다 보니 기분이 좋아졌습니다. 요즘은 산책을 (   ) 하루를 시작하는 것이 아주 즐겁습니다.\n\n(   )에 들어갈 알맞은 말을 고르십시오.',
  promptZh:'（晨间散步的短文）请选择填入括号处的话。',
  options:['하면서','하지만','하려고','하거나'],
  correctIdx:0,
  explanation:'括号后「하루를 시작하는 것」表示"一边散步一边开始一天",用同时进行的「-으면서」,「하면서」正确。②하지만是转折不接名词短语这里语义不通;③하려고表目的语义不搭;④하거나表选择不合。①정답。要点:两动作同时进行→-(으)면서。',
  vocabulary:['산책','아침','시작하다'], questionType:'I-R-passage-fill', groupId:'E13I-R-G49-50' }));

R.push(q({ id:'E13I-R50', section:'reading', topic:'습관', number:50, difficulty:'medium', testPoint:'중심 생각·산책',
  prompt:'저는 지난달부터 아침마다 공원에서 산책을 합니다. 처음에는 일찍 일어나는 것이 힘들었습니다. 하지만 맑은 공기를 마시며 걷다 보니 기분이 좋아졌습니다. 요즘은 산책을 하면서 하루를 시작하는 것이 아주 즐겁습니다.\n\n윗글의 중심 생각을 고르십시오.',
  promptZh:'（晨间散步的短文）请选择中心想法。',
  options:['아침 산책은 힘들기만 합니다.','아침 산책이 하루를 즐겁게 해 줍니다.','일찍 일어나면 안 됩니다.','공원은 아침에 사람이 많습니다.'],
  correctIdx:1,
  explanation:'结尾「산책을 하면서 하루를 시작하는 것이 아주 즐겁습니다」,中心是晨间散步让一天愉快,②对。①「기분이 좋아졌습니다」已转为好,不只是辛苦;③作者坚持早起,没说不该;④没提公园人多。②정답。要点:抓转折后的正面结论。',
  vocabulary:['산책','즐겁다','기분'], questionType:'I-R-passage-fill', groupId:'E13I-R-G49-50' }));

// G51-52: conn(연결어)
const P5152 = '한국에서는 이사를 하면 이웃에게 떡을 돌리는 풍습이 있습니다. 새로 온 사람이 이웃에게 인사를 하는 것입니다. (   ) 요즘은 아파트가 많아지면서 이런 풍습이 조금씩 사라지고 있습니다. 그래도 서로 인사를 나누는 마음은 변하지 않았으면 좋겠습니다.';
R.push(q({ id:'E13I-R51', section:'reading', topic:'문화', number:51, difficulty:'medium', testPoint:'연결어·그러나',
  prompt:'한국에서는 이사를 하면 이웃에게 떡을 돌리는 풍습이 있습니다. 새로 온 사람이 이웃에게 인사를 하는 것입니다. (   ) 요즘은 아파트가 많아지면서 이런 풍습이 조금씩 사라지고 있습니다. 그래도 서로 인사를 나누는 마음은 변하지 않았으면 좋겠습니다.\n\n(   )에 들어갈 알맞은 말을 고르십시오.',
  promptZh:'（搬家送年糕风俗的短文）请选择填入括号处的连接词。',
  options:['그리고','하지만','그래서','예를 들면'],
  correctIdx:1,
  explanation:'前句讲旧风俗,后句说「사라지고 있습니다(逐渐消失)」是相反发展,用转折「하지만」。①그리고表并列;③그래서表因果;④예를 들면举例。均不合前后逆转关系。②정답。要点:前后语义相反→转折连接词。',
  vocabulary:['이사','풍습','사라지다'], questionType:'I-R-passage-conn', groupId:'E13I-R-G51-52' }));

R.push(q({ id:'E13I-R52', section:'reading', topic:'문화', number:52, difficulty:'medium', testPoint:'내용 일치·떡 돌리기',
  prompt:'한국에서는 이사를 하면 이웃에게 떡을 돌리는 풍습이 있습니다. 새로 온 사람이 이웃에게 인사를 하는 것입니다. 하지만 요즘은 아파트가 많아지면서 이런 풍습이 조금씩 사라지고 있습니다. 그래도 서로 인사를 나누는 마음은 변하지 않았으면 좋겠습니다.\n\n윗글의 내용과 같은 것을 고르십시오.',
  promptZh:'（搬家送年糕风俗的短文）请选择与内容一致的一项。',
  options:['떡을 돌리는 것은 이웃에게 인사하는 뜻입니다.','요즘 이 풍습이 점점 많아지고 있습니다.','이사할 때 떡을 받아야 합니다.','아파트에서는 이사를 할 수 없습니다.'],
  correctIdx:0,
  explanation:'原文说送年糕是「이웃에게 인사를 하는 것」,与①一致。②「사라지고 있습니다」在减少,与"变多"相反;③是搬来的人"送(돌리다)"年糕不是必须"收";④公寓变多≠不能搬家。①정답。要点:抓风俗的含义句。',
  vocabulary:['떡','이웃','인사'], questionType:'I-R-passage-conn', groupId:'E13I-R-G51-52' }));

// G53-54: fill(동사/표현)
const P5354 = '도서관에서는 큰 소리로 이야기하면 안 됩니다. 다른 사람들이 조용히 공부하고 있기 때문입니다. 전화를 받아야 할 때는 밖에 (   ) 통화하는 것이 좋습니다. 작은 배려가 모두를 편하게 합니다.';
R.push(q({ id:'E13I-R53', section:'reading', topic:'예절', number:53, difficulty:'medium', testPoint:'빈칸·나가서',
  prompt:'도서관에서는 큰 소리로 이야기하면 안 됩니다. 다른 사람들이 조용히 공부하고 있기 때문입니다. 전화를 받아야 할 때는 밖에 (   ) 통화하는 것이 좋습니다. 작은 배려가 모두를 편하게 합니다.\n\n(   )에 들어갈 알맞은 말을 고르십시오.',
  promptZh:'（图书馆礼仪的短文）请选择填入括号处的话。',
  options:['나가서','들어와서','앉아서','누워서'],
  correctIdx:0,
  explanation:'为不打扰他人,接电话应「밖에 나가서(出去到外面)」,「밖에」与「나가다」搭配。②들어와서(进来)方向相反;③앉아서(坐)④누워서(躺)与"外面通话"不搭。①정답。要点:「밖에」+나가다(出去)。',
  vocabulary:['도서관','전화','통화'], questionType:'I-R-passage-fill', groupId:'E13I-R-G53-54' }));

R.push(q({ id:'E13I-R54', section:'reading', topic:'예절', number:54, difficulty:'medium', testPoint:'내용 일치·도서관 예절',
  prompt:'도서관에서는 큰 소리로 이야기하면 안 됩니다. 다른 사람들이 조용히 공부하고 있기 때문입니다. 전화를 받아야 할 때는 밖에 나가서 통화하는 것이 좋습니다. 작은 배려가 모두를 편하게 합니다.\n\n윗글의 내용과 같은 것을 고르십시오.',
  promptZh:'（图书馆礼仪的短文）请选择与内容一致的一项。',
  options:['도서관에서는 크게 이야기해도 됩니다.','전화는 도서관 안에서 받아야 합니다.','도서관에서는 조용히 해야 합니다.','도서관에는 사람이 없습니다.'],
  correctIdx:2,
  explanation:'原文「큰 소리로 이야기하면 안 됩니다」要保持安静,与③一致。①与"不能大声"相反;②应「밖에 나가서」接电话,不是在馆内;④「다른 사람들이 공부하고 있기 때문」说明有人。③정답。要点:抓"하면 안 됩니다"的禁止内容。',
  vocabulary:['조용히','배려','통화'], questionType:'I-R-passage-fill', groupId:'E13I-R-G53-54' }));

// G55-56: conn(지시/연결)
const P5556 = '저는 매주 토요일에 봉사 활동을 갑니다. 노인정에 가서 어르신들의 말벗이 되어 드립니다. 처음에는 무슨 이야기를 해야 할지 몰라 어색했습니다. (   ) 몇 번 만나다 보니 이제는 어르신들과 웃으며 이야기를 나눕니다.';
R.push(q({ id:'E13I-R55', section:'reading', topic:'봉사', number:55, difficulty:'medium', testPoint:'연결어·그러나(그런데)',
  prompt:'저는 매주 토요일에 봉사 활동을 갑니다. 노인정에 가서 어르신들의 말벗이 되어 드립니다. 처음에는 무슨 이야기를 해야 할지 몰라 어색했습니다. (   ) 몇 번 만나다 보니 이제는 어르신들과 웃으며 이야기를 나눕니다.\n\n(   )에 들어갈 알맞은 말을 고르십시오.',
  promptZh:'（周末做志愿服务的短文）请选择填入括号处的连接词。',
  options:['그리고','그러나','왜냐하면','그러면'],
  correctIdx:1,
  explanation:'前句「어색했습니다(尴尬)」与后句「웃으며 이야기를 나눕니다(有说有笑)」是转变对比,用「그러나」。①그리고并列;③왜냐하면表原因;④그러면表条件。均不合前后转折。②정답。要点:先难后好的转变→转折词。',
  vocabulary:['봉사','노인정','어색하다'], questionType:'I-R-passage-conn', groupId:'E13I-R-G55-56' }));

R.push(q({ id:'E13I-R56', section:'reading', topic:'봉사', number:56, difficulty:'medium', testPoint:'중심 생각·봉사',
  prompt:'저는 매주 토요일에 봉사 활동을 갑니다. 노인정에 가서 어르신들의 말벗이 되어 드립니다. 처음에는 무슨 이야기를 해야 할지 몰라 어색했습니다. 그러나 몇 번 만나다 보니 이제는 어르신들과 웃으며 이야기를 나눕니다.\n\n윗글의 중심 생각을 고르십시오.',
  promptZh:'（周末做志愿服务的短文）请选择中心想法。',
  options:['봉사 활동은 어렵기만 합니다.','자주 만나다 보면 편하게 이야기할 수 있습니다.','노인정에는 가면 안 됩니다.','봉사 활동은 토요일에만 해야 합니다.'],
  correctIdx:1,
  explanation:'作者从尴尬到「몇 번 만나다 보니 웃으며 이야기를 나눕니다」,中心是多接触就能自在交流,②对。①最后已变得自在,不只是难;③作者正是去老人院;④只是作者的安排,非主张。②정답。要点:抓"처음엔 어색→이제는 편함"的成长结论。',
  vocabulary:['말벗','만나다','나누다'], questionType:'I-R-passage-conn', groupId:'E13I-R-G55-56' }));

// 57-58 순서 배열 order [medium]
R.push(q({ id:'E13I-R57', section:'reading', topic:'일상', number:57, difficulty:'medium', testPoint:'문장 순서·감기',
  prompt:'다음을 순서에 맞게 배열한 것을 고르십시오.\n\n(가) 그래서 어제 병원에 갔습니다.\n(나) 며칠 전부터 감기에 걸렸습니다.\n(다) 의사 선생님이 약을 주셨습니다.\n(라) 약을 먹고 지금은 많이 좋아졌습니다.',
  promptZh:'请选择正确的排序。（关于感冒就医）',
  options:['(나)-(가)-(다)-(라)','(가)-(나)-(다)-(라)','(나)-(다)-(가)-(라)','(가)-(다)-(나)-(라)'],
  correctIdx:0,
  explanation:'时间因果顺序:先(나)感冒→(가)所以昨天去医院→(다)医生开药→(라)吃药后好转。①(나)-(가)-(다)-(라)正确。②以(가)"所以"开头缺前因,不能起首;③(다)开药在(가)去医院前,时序倒;④同样倒置。①정답。要点:「그래서」不能作首句,须有前因。',
  vocabulary:['감기','병원','약'], questionType:'I-R-order' }));

R.push(q({ id:'E13I-R58', section:'reading', topic:'요리', number:58, difficulty:'medium', testPoint:'문장 순서·라면 끓이기',
  prompt:'다음을 순서에 맞게 배열한 것을 고르십시오.\n\n(가) 먼저 냄비에 물을 넣고 끓입니다.\n(나) 물이 끓으면 면과 수프를 넣습니다.\n(다) 라면이 먹고 싶어서 직접 끓이기로 했습니다.\n(라) 사 분쯤 더 끓인 후에 그릇에 담습니다.',
  promptZh:'请选择正确的排序。（关于煮泡面）',
  options:['(다)-(가)-(나)-(라)','(가)-(다)-(나)-(라)','(다)-(나)-(가)-(라)','(가)-(나)-(다)-(라)'],
  correctIdx:0,
  explanation:'先(다)想吃面决定自己煮→(가)先烧水→(나)水开放面和料→(라)再煮四分钟盛出。①(다)-(가)-(나)-(라)正确。②以(가)起首但决定煮面的(다)应在最前作缘由;③(나)放面在(가)烧水前,时序倒;④(다)插在中间不合逻辑起点。①정답。要点:「-기로 했습니다」表决定,常作起因句。',
  vocabulary:['라면','냄비','끓이다'], questionType:'I-R-order' }));
