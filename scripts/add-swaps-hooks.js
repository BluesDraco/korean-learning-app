/**
 * 为29个场景批量添加 swaps（换词练）和 hooks（记忆锚点）
 * haru-cafe + 6个已手动处理的文件仍可从此脚本获益（hooks）
 */
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '../src/data/scenePreview');

// ── swaps 数据：{ 场景slug: [ { koMatch, swaps[] } ] } ──
const swapsData = {
  'animal-market': [
    { koMatch: '이거 얼마예요?', swaps: [{ slot:'이거', options:[{ko:'저거',cn:'那个(远)'},{ko:'그거',cn:'那个(近你)'},{ko:'이 옷',cn:'这件衣服'}] }] },
    { koMatch: '두 개 사면 깎아주세요.', swaps:[{slot:'두 개',options:[{ko:'세 개',cn:'三个'},{ko:'네 개',cn:'四个'}]}] },
  ],
  'paws-mall': [
    { koMatch: '사이즈 하나 큰 걸로 주세요.', swaps:[{slot:'큰',options:[{ko:'작은',cn:'小一号'},{ko:'두 사이즈 큰',cn:'大两号'}]}] },
    { koMatch: '다른 색 있어요?', swaps:[{slot:'색',options:[{ko:'사이즈',cn:'尺码'},{ko:'디자인',cn:'款式'}]}] },
  ],
  'cinema': [
    { koMatch: 'OO 영화 표 두 장 주세요.', swaps:[{slot:'두 장',options:[{ko:'한 장',cn:'一张'},{ko:'세 장',cn:'三张'}]}] },
    { koMatch: '7시 30분으로 주세요.', swaps:[{slot:'7시 30분',options:[{ko:'5시',cn:'5点场'},{ko:'10시',cn:'10点场'},{ko:'가장 빠른 걸로',cn:'最早的场次'}]}] },
    { koMatch: '3D로 보여주세요.', swaps:[{slot:'3D',options:[{ko:'IMAX',cn:'IMAX'},{ko:'4D',cn:'4D'},{ko:'일반',cn:'普通'}]}] },
    { koMatch: '팝콘 콤보 하나 주세요.', swaps:[{slot:'팝콘 콤보',options:[{ko:'카라멜 팝콘',cn:'焦糖爆米花'},{ko:'치즈 팝콘',cn:'芝士爆米花'}]}] },
  ],
  'karaoke': [
    { koMatch: '룸 하나 주세요.', swaps:[{slot:'하나',options:[{ko:'두 개',cn:'两间'},{ko:'큰 걸로',cn:'大间'}]}] },
    { koMatch: '다음 곡으로 넘어가요.', swaps:[{slot:'다음 곡',options:[{ko:'이전 곡',cn:'上一首'},{ko:'다른 곡',cn:'其他歌曲'}]}] },
  ],
  'fried-chicken': [
    { koMatch: '반반 한 마리 주세요.', swaps:[{slot:'반반',options:[{ko:'후라이드',cn:'原味'},{ko:'양념',cn:'调味'},{ko:'간장치킨',cn:'酱油炸鸡'}]},{slot:'한 마리',options:[{ko:'반 마리',cn:'半只'},{ko:'두 마리',cn:'两只'}]}] },
    { koMatch: '치킨무 더 주세요.', swaps:[{slot:'치킨무',options:[{ko:'소스',cn:'酱料'},{ko:'콜라',cn:'可乐'},{ko:'냅킨',cn:'纸巾'}]}] },
  ],
  'bakery': [
    { koMatch: '크루아상 두 개 주세요.', swaps:[{slot:'크루아상',options:[{ko:'단팥빵',cn:'红豆面包'},{ko:'소보로',cn:'酥皮面包'},{ko:'메론빵',cn:'菠萝包'},{ko:'식빵',cn:'吐司'}]},{slot:'두 개',options:[{ko:'하나',cn:'一个'},{ko:'세 개',cn:'三个'}]}] },
    { koMatch: '달지 않은 거 있어요?', swaps:[{slot:'달지 않은',options:[{ko:'바삭한',cn:'脆的'},{ko:'짭짤한',cn:'咸香的'}]}] },
    { koMatch: '생일 케이크 예약하고 싶어요.', swaps:[{slot:'예약하고',options:[{ko:'주문하고',cn:'下单'},{ko:'픽업하고',cn:'自取'}]}] },
  ],
  'stationery': [
    { koMatch: '볼펜 한 자루 주세요.', swaps:[{slot:'볼펜',options:[{ko:'연필',cn:'铅笔'},{ko:'형광펜',cn:'荧光笔'},{ko:'펜',cn:'笔'}]},{slot:'한 자루',options:[{ko:'두 자루',cn:'两支'},{ko:'세 자루',cn:'三支'}]}] },
    { koMatch: '노트 두 권 주세요.', swaps:[{slot:'노트',options:[{ko:'공책',cn:'本子'},{ko:'스케치북',cn:'素描本'}]},{slot:'두 권',options:[{ko:'한 권',cn:'一本'},{ko:'세 권',cn:'三本'}]}] },
    { koMatch: '더 싼 건 없어요?', swaps:[{slot:'싼',options:[{ko:'큰',cn:'大的'},{ko:'예쁜',cn:'好看的'}]}] },
  ],
  'supermarket': [
    { koMatch: '이거 어디에 있어요?', swaps:[{slot:'이거',options:[{ko:'배추',cn:'白菜'},{ko:'계란',cn:'鸡蛋'},{ko:'라면',cn:'方便面'},{ko:'두부',cn:'豆腐'}]}] },
    { koMatch: '이거보다 더 싼 거 있어요?', swaps:[{slot:'싼',options:[{ko:'큰',cn:'大的'},{ko:'신선한',cn:'新鲜的'}]}] },
    { koMatch: '1+1이에요?', swaps:[{slot:'1+1',options:[{ko:'2+1',cn:'买二送一'},{ko:'30% 할인',cn:'七折'}]}] },
  ],
  'real-estate': [
    { koMatch: '원룸 찾고 있어요.', swaps:[{slot:'원룸',options:[{ko:'투룸',cn:'两室'},{ko:'오피스텔',cn:'商住'},{ko:'고시원',cn:'考试院'}]}] },
    { koMatch: '월세로 찾고 있어요.', swaps:[{slot:'월세',options:[{ko:'전세',cn:'全租'},{ko:'단기 임대',cn:'短租'}]}] },
    { koMatch: '보증금은 얼마예요?', swaps:[{slot:'보증금',options:[{ko:'월세',cn:'月租'},{ko:'관리비',cn:'管理费'},{ko:'계약금',cn:'定金'}]}] },
  ],
  'samin-bank': [
    { koMatch: '달러를 원으로 바꿔주세요.', swaps:[{slot:'달러',options:[{ko:'위안',cn:'人民币'},{ko:'엔',cn:'日元'},{ko:'유로',cn:'欧元'}]},{slot:'원',options:[{ko:'달러',cn:'美元'},{ko:'위안',cn:'人民币'}]}] },
    { koMatch: '잔액 확인할 수 있어요?', swaps:[{slot:'잔액 확인',options:[{ko:'송금',cn:'汇款'},{ko:'출금',cn:'取款'},{ko:'입금',cn:'存款'}]}] },
    { koMatch: '계좌 개설하고 싶어요.', swaps:[{slot:'개설하고',options:[{ko:'송금하고',cn:'汇款'},{ko:'환전하고',cn:'换汇'}]}] },
  ],
  'incheon-airport': [
    { koMatch: '관광으로 왔어요.', swaps:[{slot:'관광',options:[{ko:'학업',cn:'学习'},{ko:'출장',cn:'出差'},{ko:'친구 방문',cn:'拜访朋友'}]}] },
    { koMatch: '가방을 잃어버렸어요.', swaps:[{slot:'가방',options:[{ko:'여권',cn:'护照'},{ko:'지갑',cn:'钱包'},{ko:'휴대폰',cn:'手机'}]}] },
    { koMatch: '공항철도는 어디서 타요?', swaps:[{slot:'공항철도',options:[{ko:'리무진버스',cn:'机场大巴'},{ko:'택시',cn:'出租车'}]}] },
  ],
  'hanbit-classroom': [
    { koMatch: '중국에서 왔어요.', swaps:[{slot:'중국',options:[{ko:'일본',cn:'日本'},{ko:'베트남',cn:'越南'},{ko:'태국',cn:'泰国'},{ko:'미국',cn:'美国'}]}] },
    { koMatch: '잘 모르겠어요.', swaps:[{slot:'잘 모르겠어요',options:[{ko:'이해했어요',cn:'理解了'},{ko:'다시 설명해주세요',cn:'再解释一遍'}]}] },
  ],
  'hanbit-dorm': [
    { koMatch: '이거 좀 빌릴 수 있어요?', swaps:[{slot:'이거',options:[{ko:'드라이기',cn:'吹风机'},{ko:'충전기',cn:'充电器'},{ko:'우산',cn:'雨伞'},{ko:'세탁기',cn:'洗衣机'}]}] },
    { koMatch: '와이파이 비밀번호가 뭐예요?', swaps:[{slot:'와이파이 비밀번호',options:[{ko:'방 번호',cn:'房间号'},{ko:'세탁실 비밀번호',cn:'洗衣房密码'}]}] },
  ],
  'fansign-cafe': [
    { koMatch: '여기에 사인해 주세요.', swaps:[{slot:'사인해',options:[{ko:'하트 그려',cn:'画个心'},{ko:'이름 써',cn:'写名字'}]}] },
    { koMatch: '앨범 사고 왔어요.', swaps:[{slot:'사고',options:[{ko:'팬 되고',cn:'成为粉丝后'},{ko:'응원하러',cn:'来应援'}]}] },
  ],
  'library': [
    { koMatch: '이 책 대출할 수 있어요?', swaps:[{slot:'대출',options:[{ko:'예약',cn:'预约'},{ko:'반납',cn:'还书'}]},{slot:'이 책',options:[{ko:'이 잡지',cn:'这本杂志'},{ko:'이 DVD',cn:'这张DVD'}]}] },
    { koMatch: '반납은 언제까지예요?', swaps:[{slot:'반납',options:[{ko:'연장',cn:'续借'}]}] },
    { koMatch: '조용히 해 주세요.', swaps:[{slot:'조용히',options:[{ko:'천천히',cn:'慢点'},{ko:'크게',cn:'大声点'}]}] },
  ],
  'underground-mall': [
    { koMatch: '길을 잃었어요. 3번 출구 어디예요?', swaps:[{slot:'3번',options:[{ko:'1번',cn:'1号'},{ko:'5번',cn:'5号'},{ko:'8번',cn:'8号'}]}] },
    { koMatch: '지하철역으로 어떻게 가요?', swaps:[{slot:'지하철역',options:[{ko:'엘리베이터',cn:'电梯'},{ko:'화장실',cn:'洗手间'},{ko:'출구',cn:'出口'}]}] },
  ],
  'bus-terminal': [
    { koMatch: '부산행 버스 표 주세요.', swaps:[{slot:'부산',options:[{ko:'대구',cn:'大邱'},{ko:'광주',cn:'光州'},{ko:'대전',cn:'大田'}]},{slot:'표',options:[{ko:'왕복 표',cn:'往返票'},{ko:'편도 표',cn:'单程票'}]}] },
    { koMatch: '왕복으로 주세요.', swaps:[{slot:'왕복',options:[{ko:'편도',cn:'单程'}]}] },
    { koMatch: '창가 자리로 주세요.', swaps:[{slot:'창가 자리',options:[{ko:'통로 자리',cn:'走道座位'},{ko:'앞 자리',cn:'前排'}]}] },
  ],
  'culture-park': [
    { koMatch: '사인해 주실 수 있어요?', swaps:[{slot:'사인해',options:[{ko:'사진 찍어',cn:'拍照'},{ko:'같이',cn:'一起(做某事)'}]}] },
    { koMatch: '정말 좋아해요. 응원하고 있어요.', swaps:[{slot:'응원하고 있어요',options:[{ko:'항상 지지해요',cn:'一直支持'},{ko:'팬이에요',cn:'是粉丝'}]}] },
  ],
  'daiso': [
    { koMatch: '이거 얼마예요?', swaps:[{slot:'이거',options:[{ko:'저거',cn:'那个(远)'},{ko:'그거',cn:'那个'}]}] },
    { koMatch: '그거 두 개 주세요.', swaps:[{slot:'두 개',options:[{ko:'하나',cn:'一个'},{ko:'세 개',cn:'三个'},{ko:'네 개',cn:'四个'}]},{slot:'그거',options:[{ko:'이거',cn:'这个'},{ko:'저거',cn:'那个(远)'}]}] },
    { koMatch: '화장지 어디에 있어요?', swaps:[{slot:'화장지',options:[{ko:'문구류',cn:'文具'},{ko:'수건',cn:'毛巾'},{ko:'세제',cn:'洗涤剂'}]}] },
  ],
  'hongkong-street': [
    { koMatch: '콘서트장이 어느 쪽이에요?', swaps:[{slot:'콘서트장',options:[{ko:'생카페',cn:'生日咖啡厅'},{ko:'팬사인회장',cn:'签售会场'},{ko:'지하철역',cn:'地铁站'}]}] },
  ],
  'bookstore-24h': [
    { koMatch: '요즘 베스트셀러 추천해 주세요.', swaps:[{slot:'베스트셀러',options:[{ko:'한국어 공부 책',cn:'韩语学习书'},{ko:'소설',cn:'小说'},{ko:'에세이',cn:'随笔'}]}] },
  ],
  'predator-store': [
    { koMatch: '아르바이트 자리 있어요?', swaps:[{slot:'아르바이트',options:[{ko:'정직원',cn:'正式员工'},{ko:'파트타임',cn:'兼职'}]}] },
  ],
  'city-hall': [
    { koMatch: '저는 찬성합니다.', swaps:[{slot:'찬성',options:[{ko:'반대',cn:'反对'},{ko:'동의',cn:'同意'}]}] },
    { koMatch: '제 의견을 말씀드리겠습니다.', swaps:[{slot:'의견',options:[{ko:'생각',cn:'想法'},{ko:'제안',cn:'建议'}]}] },
  ],
  'exam-hall': [
    { koMatch: '발표 시작하겠습니다.', swaps:[{slot:'발표',options:[{ko:'자기소개',cn:'自我介绍'},{ko:'시험',cn:'考试'}]}] },
  ],
  'central-park': [
    { koMatch: '같이 불러요!', swaps:[{slot:'불러요',options:[{ko:'먹어요',cn:'吃吧'},{ko:'가요',cn:'走吧'},{ko:'찍어요',cn:'拍吧'}]}] },
  ],
};

// ── hooks 数据：{ 场景slug: { ko단어: hook문자열 } } ──
const hooksData = {
  'hospital': {
    '접수': '접수(接受)=汉字词，대한민국 의료에서 "挂号"이 표준用語，서중국 接受와 意味가 다름。',
    '진료': '진료(診療)=诊疗，汉字词，診+療=诊断+治疗，连在一起就是"看诊"。',
    '아프다': '아프다=疼/病，형용사。注意：건강이 안 좋다(身体不好)与아프다구별。',
    '열': '열이 나다=发烧(열=热，나다=出现)——热出现了=发烧。固定搭配不能改。',
    '처방전': '처방전(処方箋)：처방(处方)+전(箋/纸)=处方纸，有了它才能买抗생素。',
  },
  'subway-station': {
    '역': '역(驛)=汉字词"驿"，古代驿站=换马中转的地方，现在=换乘地铁的地方，逻辑一样！',
    '환승': '환승(乗換)=换乘，汉字词，환=换，승=乘，跟中文换乘完全同源。',
    '충전': '充전(充填)=充值，汉字词，충=充，전=填，往卡里充=填满。',
    '편도': '편도(片道)=单程，汉字词，片道=一条道(单程)，왕복(往復)=往返(来回)。',
  },
  'samin-bank': {
    '계좌': '계좌(口座)=账户，汉字词，日语同形「口座」，中韩日共用漢字概念！',
    '환전': '환전(換錢)=换汇，汉字词，환=换，전=钱，换钱=换汇，完全一样。',
    '수수료': '수수료(手数料)=手续费，汉字词，日语「手数料」同形，한중일 공용 表現。',
    '입금': '입금(入金)=存款(钱入=存入)，출금(出金)=取款(钱出=取出)——방向이 반대。',
  },
  'real-estate': [
    '전세=全貰：전(全)+세(貰)=全额押金制，中国没有，韩国特有的租房制度！',
  ],
  'cu-mart': {
    '삼각김밥': '삼각(三角)+김밥(紫菜饭)=三角紫菜包饭，三角形是为了방편하게 hold하기 위해서。',
    '데우다': '데우다=加热，固有词，냉장(冷藏)한 것을 데우다=把冷藏的加热，도우미는 전자레인지。',
  },
  'bbq-house': {
    '삼겹살': '삼겹(三겹)+살(肉)=三层肉，三层指肥瘦相间的三层=五花肉。拆字记忆最直接！',
    '쌈장': '쌈(包)+장(酱)=包肉酱，쌈=用菜包的意思，쌈장=专门配包肉用的酱。',
    '가위': '가위(剪刀)=固有词，韩国烤肉必备，比刀更好控制肉片大小=文化独有选择。',
  },
  'fried-chicken': {
    '치맥': '치맥=치킨+맥주的合成语，炸鸡+啤酒=韩国的国민 콤비네이션！',
    '반반': '반반(半半)=各一半，후라이드(原味)+양념(调味)=一只鸡의 절반씩=选择困难的解决方案。',
  },
  'school-canteen': {
    '반찬': '반찬(飯饌)=小菜，汉字词，飯+饌=饭的配菜，韩国免费続，被认为是基本权利！',
    '김치찌개': '김치(泡菜)+찌개(炖菜)=泡菜汤，찌개=浓汤(炖出来的)，跟찌다(蒸/炖)同源。',
  },
  'pharmacy': {
    '식후': '식후(食後)=饭后，汉字词，食+後，식전(食前)=饭前，약봉투에 꼭 써있어요！',
    '부작용': '부작용(副作用)=汉字词，中韩完全一样！副+作+用=副作用，零记忆成本。',
  },
  'bakery': {
    '식빵': '식빵(食パン)=吐司，식=食(汉字)+빵(日语パン/面包)，中文的"食"+"パン"=吃的面包。',
    '소보로': '소보로=来自日语そぼろ(松散)，表面撒糖粒的酥皮面包，韩国人把日式面包本土化了。',
  },
  'stationery': {
    '자루': '자루(支)=笔的量词。물건 담는자루(袋子)와발음이 같지만 의미가 다름！量词的자루来源不同。',
    '권': '권(卷)=本/卷，汉字词，책 한 권(一本书)，잡지 두 권(两本杂志)——书类专用量词。',
  },
  'library': {
    '대출': '대출(貸出)=借出(图书馆借书)，对比은행 대출(银行贷款)=同一汉字但语境不同！',
    '반납': '반납(返納)=还书，반환(返還)=退货，两个词都有返还意思，但앞者=정부/도서관，후者=상점。',
  },
  'incheon-airport': {
    '여권': '여권(旅券)=护照，汉字词，旅行의券=旅行证件，比"패스포트"更正式，官方全部用여권。',
    '환승': '환승(乗換)=转机/换乘，공항에서는 "트랜짓"보다 환승이 더 공식적인 용어！',
  },
  'hanbit-classroom': {
    '발표': '발표(発表)=发表/演讲，汉字词，발=发，표=表，发表=发表，中韩完全同源！',
    '과제': '과제(課題)=作业/课题，汉字词，과=课，제=题，학교 과제는 문제(问题)가 아니라 과제！',
  },
  'culture-park': {
    '응원봉': '응원(응援)+봉(棒)=응援棒，응원=应援(汉字词)，봉=棒(汉字词)，KPOP文化的核心符号。',
    '팬': '팬=fan，英语直接音译，한국어로 팬덤=fandom(粉丝圈)도 英語 音譯이에요！',
  },
  'fansign-cafe': {
    '사인': '사인=sign，英文直接音译，한국에서는 "서명(署名)"보다 "사인"이 더 친근하게 쓰임。',
    '편지': '편지(便紙)=信，汉字词，"便"=便条，"紙"=纸，合起来就是信纸/信件。',
  },
};

// ── 应用函数 ──
function applySwaps(txt, swapList) {
  for (const { koMatch, swaps } of swapList) {
    // 找到匹配的 pattern，在 formal 后插入 swaps
    const escapedKo = koMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patternRe = new RegExp(`(ko: '${escapedKo}',\\s*cn: '[^']+',\\s*)(formal: 'neutral',)`, 's');
    if (patternRe.test(txt)) {
      const swapStr = `\n      swaps: [\n` +
        swaps.map(sw =>
          `        { slot: '${sw.slot}', options: [\n` +
          sw.options.map(o => `          { ko: '${o.ko}', cn: '${o.cn}' },`).join('\n') +
          `\n        ]},`
        ).join('\n') +
        `\n      ],`;
      txt = txt.replace(patternRe, `$1$2${swapStr}`);
    }
  }
  return txt;
}

function applyHooks(txt, hooksMap) {
  if (Array.isArray(hooksMap)) return txt; // 배열인 경우 스킵
  for (const [koWord, hookText] of Object.entries(hooksMap)) {
    // 找到匹配的 vocab item
    const escapedKo = koWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // 在 tip 后插入 hook（如果没有的话）
    const itemRe = new RegExp(`(ko: '${escapedKo}',[^}]+?tip: '[^']+')`, 'g');
    if (!txt.includes(`ko: '${koWord}'`) || txt.includes(`ko: '${koWord}'`) && txt.match(new RegExp(`ko: '${escapedKo}'[^}]+?hook:`))) continue;
    txt = txt.replace(itemRe, `$1,\n          hook: '${hookText.replace(/'/g, "\\'")}'`);
  }
  return txt;
}

let changed = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
  const slug = file.replace('.ts', '');
  const fp = path.join(dir, file);
  let txt = fs.readFileSync(fp, 'utf8');
  const orig = txt;

  if (swapsData[slug]) txt = applySwaps(txt, swapsData[slug]);
  if (hooksData[slug]) txt = applyHooks(txt, hooksData[slug]);

  if (txt !== orig) {
    fs.writeFileSync(fp, txt, 'utf8');
    console.log('✅ ' + file);
    changed++;
  }
}
console.log(`\nDone: ${changed}/${files.length - 1} files updated`);
