import { readFileSync, writeFileSync } from 'fs';

// Load remaining batches A-D only (previous batches already injected)
const u56 = JSON.parse(readFileSync('C:/tmp/deepseek_complete.json', 'utf8'));
const rA = JSON.parse(readFileSync('vocab_remaining_A.json', 'utf8'));
const rB = JSON.parse(readFileSync('vocab_remaining_B.json', 'utf8'));
const rC = JSON.parse(readFileSync('vocab_remaining_C.json', 'utf8'));
const rD = JSON.parse(readFileSync('vocab_remaining_D.json', 'utf8'));

// Units 9-10: parse from the agent result string (saved inline here)
const u910 = [
  {"word":"부탁을 들어주다","examples":[{"text":"친구가 부탁을 들어줘서 정말 고마웠어요.","translation":"朋友答应了我的请求，真的很感谢。"},{"text":"그는 항상 다른 사람의 부탁을 잘 들어줍니다.","translation":"他总是很擅长答应别人的请求。"}]},
  {"word":"거절을 하다","examples":[{"text":"그는 초대를 정중하게 거절을 했어요.","translation":"他礼貌地拒绝了邀请。"},{"text":"나는 그 제안을 거절을 하기로 결정했어요.","translation":"我决定拒绝那个提议。"}]},
  {"word":"거절을 당하다","examples":[{"text":"그녀는 면접에서 거절을 당해서 속상했어요.","translation":"她在面试中被拒绝了，心里很难过。"},{"text":"한 번 거절을 당했다고 포기하지 마세요.","translation":"不要因为被拒绝一次就放弃。"}]},
  {"word":"분명하다","examples":[{"text":"그의 의견은 아주 분명했어요.","translation":"他的意见非常明确。"},{"text":"이 길이 맞는지 분명하지 않아요.","translation":"这条路是否正确并不清楚。"}]},
  {"word":"지나가다","examples":[{"text":"버스가 우리 집 앞을 지나가요.","translation":"公交车经过我家门前。"},{"text":"시간이 너무 빨리 지나가는 것 같아요.","translation":"时间好像过得太快了。"}]},
  {"word":"추천서","examples":[{"text":"교수님께 추천서를 부탁드렸어요.","translation":"我请教授帮我写了推荐信。"},{"text":"추천서가 있어야 지원할 수 있어요.","translation":"必须有推荐信才能申请。"}]},
  {"word":"도움을 청하다","examples":[{"text":"길을 잃었을 때 경찰관에게 도움을 청했어요.","translation":"迷路的时候向警察求助了。"},{"text":"어려운 문제가 있으면 친구에게 도움을 청하세요.","translation":"遇到难题的话就向朋友求助吧。"}]},
  {"word":"떨어지다","examples":[{"text":"시험에 떨어져서 다시 공부해야 해요.","translation":"考试没通过，得重新学习。"},{"text":"나뭇잎이 땅에 떨어졌어요.","translation":"树叶掉到了地上。"}]},
  {"word":"용돈","examples":[{"text":"부모님께서 매달 용돈을 주세요.","translation":"父母每个月给我零花钱。"},{"text":"용돈을 아껴서 쓰는 습관이 중요해요.","translation":"节约零花钱的习惯很重要。"}]},
  {"word":"기린","examples":[{"text":"동물원에서 기린을 봤는데 목이 정말 길었어요.","translation":"在动物园看到了长颈鹿，脖子真的很长。"},{"text":"아이들이 기린 그림을 그리고 있어요.","translation":"孩子们正在画长颈鹿。"}]},
  {"word":"기술","examples":[{"text":"그는 컴퓨터 기술이 아주 뛰어나요.","translation":"他的电脑技术非常出色。"},{"text":"새로운 기술을 배우는 것은 재미있어요.","translation":"学习新技术很有趣。"}]},
  {"word":"내밀다","examples":[{"text":"그는 손을 내밀어 악수를 청했어요.","translation":"他伸出手来要握手。"},{"text":"고양이가 발을 내밀어 장난감을 건드렸어요.","translation":"猫咪伸出爪子碰了碰玩具。"}]},
  {"word":"물러나다","examples":[{"text":"위험하니까 뒤로 물러나세요.","translation":"危险，请往后退。"},{"text":"그는 자리에서 물러나기로 결정했어요.","translation":"他决定从位置上退下来。"}]},
  {"word":"발짝","examples":[{"text":"한 발짝만 더 다가가 주세요.","translation":"请再靠近一步。"},{"text":"그는 두 발짝 뒤로 물러섰어요.","translation":"他往后退了两步。"}]},
  {"word":"이기적","examples":[{"text":"그는 너무 이기적이라서 친구가 없어요.","translation":"他太自私了，所以没有朋友。"},{"text":"이기적인 행동은 다른 사람에게 상처를 줄 수 있어요.","translation":"自私的行为可能会伤害到别人。"}]},
  {"word":"안 되다","examples":[{"text":"여기서 사진을 찍으면 안 돼요.","translation":"这里不可以拍照。"},{"text":"그렇게 하면 안 된다고 생각해요.","translation":"我觉得那样做不行。"}]},
  {"word":"불가능하다","examples":[{"text":"이 일은 혼자서 하기에는 불가능해요.","translation":"这件事一个人做是不可能的。"},{"text":"불가능하다고 생각했지만 결국 해냈어요.","translation":"虽然觉得不可能，但最终还是做到了。"}]},
  {"word":"지방","examples":[{"text":"서울은 수도이고, 다른 지역은 지방이라고 불러요.","translation":"首尔是首都，其他地区被称为地方。"},{"text":"지방에 사는 친구가 올라와서 같이 놀았어요.","translation":"住在地方的朋友上来一起玩了。"}]},
  {"word":"파악하다","examples":[{"text":"상황을 빨리 파악하는 것이 중요해요.","translation":"快速掌握情况很重要。"},{"text":"그는 문제의 원인을 정확히 파악했어요.","translation":"他准确地掌握了问题的原因。"}]},
  {"word":"발표","examples":[{"text":"내일 학교에서 발표를 해야 해요.","translation":"明天要在学校做发表。"},{"text":"그는 연구 결과를 발표했어요.","translation":"他发表了研究结果。"}]},
  {"word":"순서","examples":[{"text":"일을 할 때는 순서를 지키는 게 좋아요.","translation":"做事的时候最好按顺序来。"},{"text":"발표 순서는 제가 먼저예요.","translation":"发表的顺序是我先。"}]},
  {"word":"승낙","examples":[{"text":"그는 제 요청에 승낙을 했어요.","translation":"他答应了我的请求。"},{"text":"승낙을 받기 위해서는 설득이 필요해요.","translation":"要得到允许需要说服。"}]},
  {"word":"쩔쩔매다","examples":[{"text":"시험 문제를 보고 그는 쩔쩔맸어요.","translation":"看到考试题他急得团团转。"},{"text":"길을 몰라서 쩔쩔매고 있었는데 도와주셨어요.","translation":"我不认识路正不知所措，有人帮了我。"}]},
  {"word":"한계","examples":[{"text":"인내심에도 한계가 있어요.","translation":"忍耐也是有限度的。"},{"text":"이 방법은 한계가 분명해요.","translation":"这个方法有明显的局限。"}]},
  {"word":"거래처","examples":[{"text":"우리 회사는 여러 거래처와 계약을 맺었어요.","translation":"我们公司和多个客户签了合同。"},{"text":"거래처와의 관계를 잘 유지하는 것이 중요해요.","translation":"保持好与客户的关系很重要。"}]},
  {"word":"통역","examples":[{"text":"회의에서 통역이 필요해요.","translation":"会议需要翻译。"},{"text":"그는 한국어와 영어 통역을 잘해요.","translation":"他韩语和英语翻译得很好。"}]},
  {"word":"곤란하다","examples":[{"text":"이 질문에 대답하기가 곤란해요.","translation":"这个问题很难回答。"},{"text":"지금 상황이 좀 곤란해요.","translation":"现在的情况有点困难。"}]},
  {"word":"귀하다","examples":[{"text":"시간이 귀하니까 잘 사용해야 해요.","translation":"时间宝贵，要好好利用。"},{"text":"이 책은 아주 귀한 자료예요.","translation":"这本书是很珍贵的资料。"}]},
  {"word":"사모님","examples":[{"text":"사모님께서 맛있는 음식을 만들어 주셨어요.","translation":"师母做了好吃的饭菜。"},{"text":"우리 회사 사장님 사모님은 정말 친절하세요.","translation":"我们公司社长的夫人非常亲切。"}]},
  {"word":"마중을 나가다","examples":[{"text":"공항에 친구 마중을 나갔어요.","translation":"去机场接朋友了。"},{"text":"역에 마중을 나가려고 일찍 일어났어요.","translation":"为了去车站接人早起床了。"}]},
  {"word":"기운이 없다","examples":[{"text":"오늘은 좀 기운이 없어서 집에 있을게요.","translation":"今天有点没精神，就待在家里了。"},{"text":"감기에 걸려서 기운이 하나도 없어요.","translation":"因为感冒一点力气都没有。"}]},
  {"word":"성의가 없다","examples":[{"text":"그의 사과는 성의가 없는 것 같았어요.","translation":"他的道歉好像没有诚意。"},{"text":"선물이 너무 작아서 성의가 없다고 생각했어요.","translation":"礼物太小了，觉得没有诚意。"}]},
  {"word":"속담","examples":[{"text":"한국 속담 중에 '시작이 반이다'라는 말이 있어요.","translation":"韩国俗语中有句话叫'好的开始是成功的一半'。"},{"text":"속담을 배우면 한국어가 더 재미있어져요.","translation":"学习俗语会让韩语变得更有趣。"}]},
  {"word":"정직하다","examples":[{"text":"그는 항상 정직하게 말해요.","translation":"他总是诚实地说。"},{"text":"정직한 사람이 신뢰를 받을 수 있어요.","translation":"诚实的人能得到信任。"}]},
  {"word":"그립다","examples":[{"text":"고향이 너무 그리워요.","translation":"非常想念故乡。"},{"text":"어릴 적 친구들이 그립습니다.","translation":"想念小时候的朋友们。"}]},
  {"word":"기억하다","examples":[{"text":"그날 일을 아직도 잘 기억해요.","translation":"那天的事情还记得很清楚。"},{"text":"약속을 꼭 기억하세요.","translation":"一定要记住约定。"}]},
  {"word":"관련","examples":[{"text":"이 문제는 경제와 관련이 있어요.","translation":"这个问题与经济相关。"},{"text":"그 사건과 관련된 사람들을 조사 중이에요.","translation":"正在调查与那件事相关的人。"}]},
  {"word":"들키다","examples":[{"text":"거짓말이 들켜서 부끄러웠어요.","translation":"谎言被发现了，很羞愧。"},{"text":"몰래 먹다가 엄마한테 들켰어요.","translation":"偷吃被妈妈发现了。"}]},
  {"word":"땡땡이치다","examples":[{"text":"그는 학교를 땡땡이치고 놀러 갔어요.","translation":"他逃学去玩了。"},{"text":"땡땡이치면 나중에 후회할 거예요.","translation":"逃课的话以后会后悔的。"}]},
  {"word":"떠오르다","examples":[{"text":"좋은 아이디어가 갑자기 떠올랐어요.","translation":"突然想到了一个好主意。"},{"text":"해가 동쪽에서 떠오르고 있어요.","translation":"太阳正从东边升起。"}]},
  {"word":"반성","examples":[{"text":"잘못을 인정하고 반성해야 해요.","translation":"要承认错误并反省。"},{"text":"그는 자신의 행동을 반성하고 사과했어요.","translation":"他反省了自己的行为并道了歉。"}]},
  {"word":"외우다","examples":[{"text":"시험을 위해 단어를 많이 외웠어요.","translation":"为了考试背了很多单词。"},{"text":"이 노래 가사를 다 외웠어요.","translation":"这首歌的歌词全都背下来了。"}]},
  {"word":"유난히","examples":[{"text":"오늘은 유난히 날씨가 추워요.","translation":"今天天气特别冷。"},{"text":"그 아이는 유난히 말을 잘해요.","translation":"那个孩子特别会说话。"}]},
  {"word":"통통하다","examples":[{"text":"아기가 볼이 통통해서 귀여워요.","translation":"宝宝的脸颊胖嘟嘟的很可爱。"},{"text":"그녀는 통통한 체형이지만 건강해 보여요.","translation":"她虽然身材丰满，但看起来很健康。"}]},
  {"word":"회상","examples":[{"text":"어린 시절을 회상하면 항상 즐거워요.","translation":"回忆童年总是很开心。"},{"text":"그는 과거를 회상하며 이야기하기 시작했어요.","translation":"他开始回忆过去讲起了故事。"}]},
  {"word":"후회","examples":[{"text":"그 일을 후회하고 있어요.","translation":"我正在后悔那件事。"},{"text":"후회해도 소용없어요.","translation":"后悔也没用。"}]},
  {"word":"상","examples":[{"text":"그 장면을 상상만 해도 무서워요.","translation":"光想象那个场景就害怕。"},{"text":"상상이 현실이 될 수도 있어요.","translation":"想象也有可能变成现实。"}]},
  {"word":"잔소리","examples":[{"text":"어머니의 잔소리가 듣기 싫어요.","translation":"不想听妈妈的唠叨。"},{"text":"잔소리 좀 그만하세요.","translation":"别再唠叨了。"}]},
  {"word":"깜빡하다","examples":[{"text":"약속을 깜빡해서 미안해요.","translation":"不小心忘了约定，对不起。"},{"text":"지갑을 집에 두고 왔는지 깜빡했어요.","translation":"不小心把钱包落在家里了。"}]},
  {"word":"말이 나온 김에","examples":[{"text":"말이 나온 김에 내일 계획도 이야기할까요?","translation":"既然说到了，要不要也聊聊明天的计划？"},{"text":"말이 나온 김에 그 문제도 같이 해결합시다.","translation":"既然提到了，那个问题也一起解决吧。"}]},
  {"word":"추억하다","examples":[{"text":"우리는 함께한 시간을 추억했어요.","translation":"我们一起回忆了共度的时光。"},{"text":"사진을 보며 옛날을 추억했어요.","translation":"看着照片回忆了过去。"}]},
  {"word":"단짝 친구","examples":[{"text":"그녀는 제 단짝 친구예요.","translation":"她是我的挚友。"},{"text":"단짝 친구와 항상 함께 점심을 먹어요.","translation":"总是和挚友一起吃午饭。"}]},
  {"word":"단층","examples":[{"text":"이 건물은 단층으로 지어졌어요.","translation":"这栋建筑是单层建的。"},{"text":"단층 주택에 살면 계단이 없어 편해요.","translation":"住平房没有楼梯很方便。"}]},
  {"word":"늘다","examples":[{"text":"한국어 실력이 많이 늘었어요.","translation":"韩语实力提高了很多。"},{"text":"운동을 하니까 체력이 늘었어요.","translation":"做运动之后体力增强了。"}]},
  {"word":"바뀌다","examples":[{"text":"계획이 갑자기 바뀌었어요.","translation":"计划突然改变了。"},{"text":"그의 태도가 완전히 바뀌었어요.","translation":"他的态度完全变了。"}]},
  {"word":"발전되다","examples":[{"text":"기술이 많이 발전되었어요.","translation":"技术发展了很多。"},{"text":"이 도시는 지난 10년 동안 크게 발전되었어요.","translation":"这个城市在过去十年里大大发展了。"}]},
  {"word":"변하다","examples":[{"text":"날씨가 갑자기 변했어요.","translation":"天气突然变了。"},{"text":"그는 성격이 많이 변했어요.","translation":"他的性格变了很多。"}]},
  {"word":"양쪽","examples":[{"text":"길 양쪽에 나무가 심어져 있어요.","translation":"路两边种着树。"},{"text":"양쪽 의견을 모두 들어봐야 해요.","translation":"应该听听双方的意见。"}]},
  {"word":"좋아지다","examples":[{"text":"날씨가 점점 좋아지고 있어요.","translation":"天气渐渐变好了。"},{"text":"그의 건강 상태가 좋아졌어요.","translation":"他的健康状况变好了。"}]},
  {"word":"태어나다","examples":[{"text":"저는 서울에서 태어났어요.","translation":"我出生在首尔。"},{"text":"아기가 건강하게 태어났어요.","translation":"宝宝健康地出生了。"}]},
  {"word":"경우","examples":[{"text":"이 경우에는 어떻게 해야 할까요?","translation":"这种情况下应该怎么做呢？"},{"text":"비가 오는 경우에는 행사가 취소돼요.","translation":"下雨的情况下活动会被取消。"}]},
  {"word":"귀국하다","examples":[{"text":"그는 다음 주에 귀국할 예정이에요.","translation":"他计划下周回国。"},{"text":"유학 생활을 마치고 귀국했어요.","translation":"结束留学生活回国了。"}]},
  {"word":"바라다","examples":[{"text":"당신의 행복을 바랍니다.","translation":"祝你幸福。"},{"text":"그는 성공하기를 바라고 있어요.","translation":"他希望成功。"}]},
  {"word":"사정","examples":[{"text":"사정이 있어서 약속을 취소했어요.","translation":"因为有情况取消了约会。"},{"text":"그의 사정을 이해해 주세요.","translation":"请理解他的情况。"}]},
  {"word":"어느새","examples":[{"text":"어느새 밤이 되었어요.","translation":"不知不觉天黑了。"},{"text":"어느새 아이가 많이 컸네요.","translation":"不知不觉孩子长大了很多。"}]},
  {"word":"가정하다","examples":[{"text":"비가 온다고 가정하고 준비합시다.","translation":"假设下雨做准备吧。"},{"text":"그것이 사실이라고 가정해 봅시다.","translation":"假设那是事实吧。"}]},
  {"word":"향상되다","examples":[{"text":"실력이 많이 향상되었어요.","translation":"实力提高了很多。"},{"text":"생활 수준이 향상되고 있어요.","translation":"生活水平正在提高。"}]},
  {"word":"아쉽다","examples":[{"text":"시간이 없어서 못 가서 아쉬워요.","translation":"没时间去很遗憾。"},{"text":"결과가 아쉽지만 다음에 잘하자.","translation":"结果虽然遗憾，但下次加油吧。"}]},
  {"word":"예전","examples":[{"text":"예전에는 이곳이 공원이었어요.","translation":"以前这里是公园。"},{"text":"예전 친구를 길에서 만났어요.","translation":"在路上遇到了以前的朋友。"}]},
  {"word":"자부심","examples":[{"text":"그는 자신의 일에 자부심을 가지고 있어요.","translation":"他对自己的工作有自豪感。"},{"text":"한국인이라는 자부심을 느껴요.","translation":"感受到作为韩国人的自豪。"}]},
  {"word":"시간이 흐르다","examples":[{"text":"시간이 흐르면서 모든 게 변했어요.","translation":"随着时间流逝一切都变了。"},{"text":"시간이 흐르는 게 너무 빨라요.","translation":"时间流逝得太快了。"}]},
  {"word":"초고속","examples":[{"text":"초고속 인터넷이 필요해요.","translation":"需要超高速网络。"},{"text":"그는 초고속으로 일을 끝냈어요.","translation":"他以超高速完成了工作。"}]},
  {"word":"세월","examples":[{"text":"세월이 정말 빠르네요.","translation":"岁月真快啊。"},{"text":"세월이 흐르면서 기억도 희미해졌어요.","translation":"随着岁月流逝记忆也变得模糊了。"}]},
  {"word":"상태","examples":[{"text":"그의 건강 상태가 좋지 않아요.","translation":"他的健康状况不好。"},{"text":"지금 도로 상태가 어떤지 확인해 봐요.","translation":"确认一下现在的道路状况。"}]},
  {"word":"상황","examples":[{"text":"지금 상황을 설명해 주세요.","translation":"请说明一下现在的情况。"},{"text":"상황이 나빠지고 있어요.","translation":"情况正在变糟。"}]},
  {"word":"대통령","examples":[{"text":"대통령 선거가 다음 달에 있어요.","translation":"下个月有总统选举。"},{"text":"그는 대통령이 되기 위해 열심히 일했어요.","translation":"他为了成为总统而努力工作。"}]},
  {"word":"이루다","examples":[{"text":"꿈을 이루기 위해 노력하고 있어요.","translation":"为了实现梦想正在努力。"},{"text":"그는 큰 성과를 이루었어요.","translation":"他取得了很大的成果。"}]},
  {"word":"예상하다","examples":[{"text":"그는 비가 올 것을 예상했어요.","translation":"他预想到了会下雨。"},{"text":"결과를 예상하기 어려워요.","translation":"很难预料结果。"}]},
  {"word":"추측하다","examples":[{"text":"그는 그녀의 마음을 추측하려고 했어요.","translation":"他试图猜测她的心思。"},{"text":"정확히 알 수 없으니 추측만 할 뿐이에요.","translation":"无法准确知道，只能猜测。"}]},
  {"word":"결과적으로","examples":[{"text":"결과적으로 우리는 성공했어요.","translation":"结果我们成功了。"},{"text":"결과적으로 그 결정은 옳았어요.","translation":"结果那个决定是对的。"}]},
  {"word":"가사","examples":[{"text":"이 노래의 가사가 정말 아름다워요.","translation":"这首歌的歌词真的很美。"},{"text":"가사를 외우면 노래 부르기 쉬워요.","translation":"背下歌词唱歌就容易了。"}]},
  {"word":"관계자","examples":[{"text":"행사 관계자만 입장할 수 있어요.","translation":"只有活动相关人员可以入场。"},{"text":"관계자 여러분께 감사드립니다.","translation":"感谢各位相关人员。"}]},
  {"word":"기능","examples":[{"text":"이 핸드폰은 다양한 기능이 있어요.","translation":"这部手机有各种功能。"},{"text":"이 기계의 기능을 설명해 주세요.","translation":"请说明一下这台机器的功能。"}]},
  {"word":"나타나다","examples":[{"text":"갑자기 문제가 나타났어요.","translation":"突然出现了问题。"},{"text":"그는 예상치 못한 곳에 나타났어요.","translation":"他出现在意想不到的地方。"}]},
  {"word":"드디어","examples":[{"text":"드디어 방학이 시작됐어요.","translation":"终于放假了。"},{"text":"드디어 그 일을 끝냈어요.","translation":"终于完成了那件事。"}]},
  {"word":"새롭다","examples":[{"text":"새로운 도전을 시작했어요.","translation":"开始了新的挑战。"},{"text":"이 디자인은 아주 새로워요.","translation":"这个设计很新颖。"}]},
  {"word":"소비자","examples":[{"text":"소비자의 권리를 보호해야 해요.","translation":"要保护消费者的权益。"},{"text":"이 제품은 소비자에게 인기가 많아요.","translation":"这个产品很受消费者欢迎。"}]},
  {"word":"신기록","examples":[{"text":"그 선수가 신기록을 세웠어요.","translation":"那位选手创造了新纪录。"},{"text":"이번 대회에서 신기록이 나왔어요.","translation":"这次比赛出现了新纪录。"}]},
  {"word":"신기술","examples":[{"text":"신기술을 개발하는 데 시간이 걸려요.","translation":"开发新技术需要时间。"},{"text":"이 회사는 신기술 도입에 투자하고 있어요.","translation":"这家公司正在投资引进新技术。"}]},
  {"word":"신상품","examples":[{"text":"백화점에 신상품이 많이 나왔어요.","translation":"百货商店出了很多新品。"},{"text":"신상품을 홍보하는 행사가 있어요.","translation":"有宣传新品的活动。"}]},
  {"word":"신제품","examples":[{"text":"이 회사는 신제품을 출시했어요.","translation":"这家公司推出了新产品。"},{"text":"신제품 발표회에 초대받았어요.","translation":"被邀请参加新产品发布会。"}]},
  {"word":"신형","examples":[{"text":"신형 자동차가 인기가 많아요.","translation":"新型汽车很受欢迎。"},{"text":"신형 컴퓨터는 더 빠르고 가벼워요.","translation":"新型电脑更快更轻。"}]},
  {"word":"알려지다","examples":[{"text":"그 소식은 곧 모두에게 알려졌어요.","translation":"那个消息很快传开了。"},{"text":"이 가수는 전 세계에 알려져 있어요.","translation":"这位歌手全世界闻名。"}]},
  {"word":"완벽하다","examples":[{"text":"그의 발표는 완벽했어요.","translation":"他的发表很完美。"},{"text":"완벽한 사람은 없어요.","translation":"没有完美的人。"}]},
  {"word":"준비","examples":[{"text":"시험 준비를 철저히 해야 해요.","translation":"要彻底准备考试。"},{"text":"여행 준비가 다 끝났어요.","translation":"旅行准备都结束了。"}]}
];

// Merge remaining batches into lookup map
const allExamples = [...rA, ...rB, ...rC, ...rD];
const exMap = new Map();
for (const entry of allExamples) {
  exMap.set(entry.word, entry.examples);
}

console.log(`Total example entries loaded: ${exMap.size}`);

// Read the source file
let src = readFileSync('src/data/yonsei-books.ts', 'utf8');

// Replace examples: [] with examples: [actual data] for each word in Book 3
// Strategy: find each word entry in Book 3 section and replace its examples: []
// We'll do this by regex replacement on the whole file

let replaced = 0;
let notFound = [];

// Process each entry in the map
for (const [word, examples] of exMap) {
  const exJson = JSON.stringify(examples);

  // Match the word entry pattern: word: "WORD", ... examples: []
  // We need to be careful to only replace in yonsei-3- units
  // Pattern: { word: "WORD", pronunciation: "...", meaning: "...", partOfSpeech: '' , examples: [] }
  // Use a regex that matches the specific word and its empty examples
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // File uses single quotes: word: 'foo', ... examples: []
  const pattern = new RegExp(
    `(\\{\\s*word:\\s*'${escapedWord}',[^}]*?examples:\\s*)\\[\\]`,
    'g'
  );

  const newSrc = src.replace(pattern, `$1${exJson}`);
  if (newSrc !== src) {
    replaced++;
    src = newSrc;
  } else {
    notFound.push(word);
  }
}

console.log(`Replaced: ${replaced}`);
if (notFound.length > 0) {
  console.log(`Not found (${notFound.length}):`, notFound.slice(0, 20));
}

writeFileSync('src/data/yonsei-books.ts', src, 'utf8');
console.log('Done. File written.');
