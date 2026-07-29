const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/scenePreview');

const sceneContexts = {
  'pharmacy':       { g: ['向药剂师描述症状时','直接购买特定药品时','询问用法用量时','入店登记时'], pw: '询问/购药时' },
  'bbq-house':      { g: ['点肉类时','烤肉过程中','要配菜时','付款结账时'], pw: '点餐用餐时' },
  'daiso':          { g: ['指示物品时','找商品时','询问数量价格时','结账时'], pw: '购物时' },
  'school-canteen': { g: ['问今日菜单时','点餐时','描述口味时','加菜结账时'], pw: '食堂用餐时' },
  'hospital':       { g: ['挂号就诊时','描述症状时','接受检查时','遵从医嘱时'], pw: '就医时' },
  'samin-bank':     { g: ['办理基础业务时','出示证件时','处理货币时','在柜台办理时'], pw: '银行办事时' },
  'cu-mart':        { g: ['购买商品时','加热取工具时','结账时','其他服务时'], pw: '便利店购物时' },
  'subway-station': { g: ['问站和方向时','买票充值时','换乘时','找车站设施时'], pw: '乘坐地铁时' },
  'incheon-airport':{ g: ['入境审查时','处理行李时','找机场设施时','使用机场交通时'], pw: '在机场时' },
  'hanbit-dorm':    { g: ['办理入住时','询问房间设施时','宿舍日常时','借还物品时'], pw: '宿舍生活时' },
  'hanbit-classroom':{ g: ['课堂进行中','学习内容时','自我介绍时','课堂指令时'], pw: '课堂学习时' },
  'fansign-cafe':   { g: ['签售活动时','准备应援物时','互动说话时','表达支持时'], pw: '签售/应援时' },
  'real-estate':    { g: ['说明找房目标时','说明租赁条件时','了解房间条件时','询问合同细节时'], pw: '租房时' },
  'culture-park':   { g: ['偶遇互动时','公园活动时','应援表达时','情感表达时'], pw: '公园活动时' },
  'cinema':         { g: ['购票时','选择影厅时','观影中','评价电影时'], pw: '影院观影时' },
  'karaoke':        { g: ['KTV基本操作时','点歌时','评价演唱时','点零食饮料时'], pw: 'KTV唱歌时' },
  'fried-chicken':  { g: ['选炸鸡种类时','选配餐时','告知点单方式时','选数量时'], pw: '点炸鸡时' },
  'bakery':         { g: ['选面包时','选蛋糕甜品时','预订定制时','描述口味时'], pw: '烘焙店购物时' },
  'animal-market':  { g: ['买衣物时','砍价时','选尺寸时','选颜色材质时'], pw: '市场购物时' },
  'paws-mall':      { g: ['试穿时','选颜色款式时','询问价格折扣时','换退货时'], pw: '购物中心购物时' },
  'supermarket':    { g: ['找食材时','认识韩国蔬菜时','比较价格时','结账时'], pw: '超市购物时' },
  'stationery':     { g: ['买笔时','买纸类时','买办公用品时','说数量时'], pw: '文具店购物时' },
  'library':        { g: ['借还书时','找图书馆设施时','了解使用规则时','查找资料时'], pw: '图书馆时' },
  'underground-mall':{ g: ['问方向时','找路时','方位词时','找店铺时'], pw: '地下商街时' },
  'city-hall':      { g: ['正式场合时','做演讲时','使用敬语时','参与辩论时'], pw: '正式场合时' },
  'predator-store': { g: ['打工面试时','被拒绝时','提出异议时','结束对话时'], pw: '面试/工作交涉时' },
  'predator-street':{ g: ['迷路时','请求帮助时','紧张对话时','告别时'], pw: '紧张对话时' },
  'predator-bar':   { g: ['谈判时','小心交涉时','强硬表态时','结束谈判时'], pw: '谈判时' },
  'bookstore-24h':  { g: ['找书时','问推荐时','结账时','在店内阅读时'], pw: '书店购书时' },
  'bus-terminal':   { g: ['购票时','问班次路线时','找终端设施时','结账时'], pw: '巴士站购票时' },
  'central-park':   { g: ['野餐活动时','看自然景色时','购买食物时','日常对话时'], pw: '公园活动时' },
  'exam-hall':      { g: ['考试相关时','考场规则时','心理状态时','发表/演讲时'], pw: '考试时' },
  'hongkong-street':{ g: ['追星时','买东西时','问路时','点单时'], pw: '弘大街区活动时' },
  'suul-station':   { g: ['在火车上时','和邻座交流时','看时刻表时','结束旅行时'], pw: '乘坐火车时' },
};

let changed = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
  const slug = file.replace('.ts', '');
  if (slug === 'haru-cafe') { console.log('⏭  haru-cafe.ts (already done)'); continue; }

  const fp = path.join(dir, file);
  let txt = fs.readFileSync(fp, 'utf8');
  const orig = txt;
  const info = sceneContexts[slug] || { g: ['在此场景时','与人交流时','表达需求时','完成交易时'], pw: '使用该场景时' };

  // 1. Add context to groups
  let gi = 0;
  txt = txt.replace(/(      title: '([^']+)',)\s*\n(\s+items: \[)/g, (m, titleLine, title, itemsLine) => {
    if (txt.indexOf("context:") > txt.indexOf(titleLine) - 200 && txt.indexOf("context:") < txt.indexOf(titleLine) + 100) return m; // skip if already has context nearby
    const ctx = info.g[gi] || info.g[0];
    gi++;
    return `${titleLine}\n      context: '${ctx}',\n${itemsLine}`;
  });

  // 2. Add pos/tier/tags to items that have rom field but no pos
  txt = txt.replace(/([ \t]+rom: '[^']+',)\n(\s+)(example:|tip:|hook:|pos:|confuse:)/g, (m, romLine, sp, nf) => {
    if (nf === 'pos:' || nf === 'confuse:') return m;
    return `${romLine}\n${sp}pos: 'noun', tier: 'core', tags: [],\n${sp}${nf}`;
  });

  // 3. Add when/formal to patterns
  txt = txt.replace(/(      ko: '[^']+',\n      cn: '[^']+',)\n(\s+)(breakdown:|tips:|when:|formal:)/g, (m, kcLine, sp, nf) => {
    if (nf === 'when:' || nf === 'formal:') return m;
    return `${kcLine}\n${sp}when: '${info.pw}', formal: 'neutral',\n${sp}${nf}`;
  });

  if (txt !== orig) {
    fs.writeFileSync(fp, txt, 'utf8');
    console.log('✅ ' + file);
    changed++;
  } else {
    console.log('⚠  ' + file + ' (no change)');
  }
}
console.log('\nTotal changed: ' + changed + '/' + (files.length - 1));
