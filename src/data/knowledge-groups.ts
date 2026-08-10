import type { KnowledgeGroup } from './knowledge';

// 分类速查 → 对应场景词包的单向引导。key = category.slug。
// 只给"背完名词想学怎么用"成立的分类加，详情页底部渲染一张软引导卡。
export interface KnowledgeThemeLink {
  [k: string]: unknown;
  themeId: string;
  emoji: string;
  name: string;
}
export const knowledgeThemeLinks: Record<string, KnowledgeThemeLink> = {
  work: { themeId: 'theme-work', emoji: '📧', name: '邮件/职场用语', nameEn: 'Email/Workplace Expressions' },
  school: { themeId: 'theme-classroom', emoji: '🏫', name: '课堂用语', nameEn: 'Classroom Expressions' },
  emotions: { themeId: 'theme-emotions', emoji: '💕', name: '表白与情感', nameEn: 'Confessions & Emotions' },
  health: { themeId: 'theme-hospital', emoji: '🏥', name: '看医生', nameEn: 'Seeing the Doctor' },
  food: { themeId: 'theme-restaurant', emoji: '🍽️', name: '餐厅用餐', nameEn: 'Dining at a restaurant' },
};

// 每个分类的语义分组。key = category.slug。
// wordIds 必须精确匹配 knowledge.ts 中该分类的词条 id，且完整覆盖、不重复。
// 详情页在存在分组时按分组小标题渲染，否则回退平铺。
export const knowledgeGroups: Record<string, KnowledgeGroup[]> = {
  time: [
    { label: '一天时段', labelEn: 'Times of Day', emoji: '🌅', wordIds: ['t6', 't9', 't10', 't7', 't8', 't5'] },
    { label: '日期与天', labelEn: 'Dates & Days', emoji: '📅', wordIds: ['t2', 't3', 't4', 't17', 't18', 't1'] },
    { label: '星期与周', labelEn: 'Days of the Week & Weeks', emoji: '🗓️', wordIds: ['t13', 't14', 't11', 't12'] },
    { label: '年份', labelEn: 'Years', emoji: '📆', wordIds: ['t15', 't16'] },
    { label: '四季', labelEn: 'Four Seasons', emoji: '🍂', wordIds: ['t19', 't20', 't21', 't22'] },
  ],
  numbers: [
    { label: '汉字数字', labelEn: 'Sino-Korean Numbers', emoji: '🔢', wordIds: ['n1', 'n2', 'n3', 'n4', 'n5', 'n14', 'n15', 'n16', 'n17'] },
    { label: '固有数字', labelEn: 'Native Korean Numbers', emoji: '✋', wordIds: ['n6', 'n7', 'n8', 'n9'] },
    { label: '量词', labelEn: 'Counter.', emoji: '📏', wordIds: ['n10', 'n11', 'n12', 'n13', 'n19', 'n20'] },
    { label: '其他', labelEn: 'Other', emoji: '➗', wordIds: ['n18'] },
  ],
  fruits: [
    { label: '常见水果', labelEn: 'Common Fruits', emoji: '🍎', wordIds: ['f1', 'f2', 'f3', 'f4', 'f5', 'f8', 'f13'] },
    { label: '柑橘·浆果', labelEn: 'Citrus & Berries', emoji: '🍊', wordIds: ['f6', 'f9', 'f11', 'f16', 'f15'] },
    { label: '核果', labelEn: 'Stone Fruits', emoji: '🍑', wordIds: ['f7', 'f12', 'f17', 'f18'] },
    { label: '热带·其他', labelEn: 'Tropical & Others', emoji: '🥭', wordIds: ['f10', 'f14', 'f19', 'f20'] },
  ],
  sports: [
    { label: '球类', labelEn: 'Ball sports', emoji: '⚽', wordIds: ['sp2', 'sp3', 'sp4', 'sp5', 'sp6', 'sp8', 'sp9', 'sp10'] },
    { label: '水上·冰雪', labelEn: 'Water & ice sports', emoji: '🏊', wordIds: ['sp7', 'sp11', 'sp18', 'sp19'] },
    { label: '户外·健身', labelEn: 'Outdoor & fitness', emoji: '🏔️', wordIds: ['sp12', 'sp13', 'sp14', 'sp20'] },
    { label: '格斗·其他', labelEn: 'Martial arts & others', emoji: '🥋', wordIds: ['sp15', 'sp16', 'sp17', 'sp1'] },
  ],
  hobbies: [
    { label: '文艺欣赏', labelEn: 'Arts & appreciation', emoji: '🎬', wordIds: ['h1', 'h2', 'h3', 'h17'] },
    { label: '动手创作', labelEn: 'Hands-on creation', emoji: '🎨', wordIds: ['h4', 'h5', 'h9', 'h13', 'h16'] },
    { label: '乐器演奏', labelEn: 'Instrument playing', emoji: '🎹', wordIds: ['h12', 'h18', 'h19'] },
    { label: '户外活动', labelEn: 'Outdoor activities', emoji: '🏕️', wordIds: ['h6', 'h10', 'h11', 'h14'] },
    { label: '游戏·收藏', labelEn: 'Games & collecting', emoji: '🎮', wordIds: ['h7', 'h8', 'h15', 'h20'] },
  ],
  family: [
    { label: '统称', labelEn: 'General terms', emoji: '👨‍👩‍👧‍👦', wordIds: ['fa1', 'fa2'] },
    { label: '父母', labelEn: 'Parents', emoji: '👨‍👩‍👧', wordIds: ['fa3', 'fa4', 'fa5', 'fa6'] },
    { label: '祖辈', labelEn: 'Grandparents', emoji: '👴', wordIds: ['fa9', 'fa10'] },
    { label: '同辈', labelEn: 'Siblings & peers', emoji: '🧑‍🤝‍🧑', wordIds: ['fa11', 'fa12', 'fa13', 'fa14', 'fa15'] },
    { label: '子女·配偶·亲戚', labelEn: 'Children, spouse & relatives', emoji: '👶', wordIds: ['fa7', 'fa8', 'fa16', 'fa17', 'fa18', 'fa19', 'fa20'] },
  ],
  food: [
    { label: '主食·饭类', labelEn: 'Staples & rice dishes', emoji: '🍚', wordIds: ['fd1', 'fd4', 'fd5', 'fd18'] },
    { label: '韩式招牌', labelEn: 'Korean signature dishes', emoji: '🍖', wordIds: ['fd2', 'fd3', 'fd6', 'fd9', 'fd11'] },
    { label: '汤·锅·煎', labelEn: 'Soups, stews & griddled dishes', emoji: '🍲', wordIds: ['fd8', 'fd13', 'fd14', 'fd7'] },
    { label: '小食·配菜', labelEn: 'Snacks & side dishes', emoji: '🍗', wordIds: ['fd10', 'fd12', 'fd15', 'fd16', 'fd17'] },
    { label: '面包·饮品', labelEn: 'Bread & drinks', emoji: '🥛', wordIds: ['fd19', 'fd20'] },
  ],
  colors: [
    { label: '三原色·基础', labelEn: 'Primary colors & basics', emoji: '🎨', wordIds: ['co1', 'co2', 'co3', 'co5', 'co6'] },
    { label: '间色', labelEn: 'Secondary colors', emoji: '🟢', wordIds: ['co4', 'co7', 'co8', 'co9'] },
    { label: '深浅变化', labelEn: 'Shades & tints', emoji: '🔵', wordIds: ['co12', 'co13', 'co14'] },
    { label: '中性·金属色', labelEn: 'Neutral & metallic colors', emoji: '⚪', wordIds: ['co10', 'co11', 'co15'] },
  ],
  animals: [
    { label: '宠物·家养', labelEn: 'Pets & domestic animals', emoji: '🐶', wordIds: ['an1', 'an2', 'an3'] },
    { label: '野生猛兽', labelEn: 'Wild beasts', emoji: '🦁', wordIds: ['an4', 'an5', 'an6', 'an7', 'an8', 'an9'] },
    { label: '农场家畜', labelEn: 'Farm Animals', emoji: '🐄', wordIds: ['an10', 'an11', 'an12', 'an13', 'an14', 'an15'] },
    { label: '鸟·鱼·爬行', labelEn: 'Birds, Fish & Reptiles', emoji: '🐦', wordIds: ['an16', 'an17', 'an18', 'an19', 'an20'] },
  ],
  weather: [
    { label: '晴雨阴', labelEn: 'Sun, Rain & Clouds', emoji: '🌤️', wordIds: ['we1', 'we2', 'we3', 'we4', 'we5'] },
    { label: '风云雾', labelEn: 'Wind, Clouds & Fog', emoji: '💨', wordIds: ['we6', 'we7', 'we9'] },
    { label: '温度·湿度', labelEn: 'Temperature & Humidity', emoji: '🌡️', wordIds: ['we10', 'we11', 'we12', 'we13'] },
    { label: '灾害天气', labelEn: 'Severe Weather', emoji: '⛈️', wordIds: ['we8', 'we14', 'we15', 'we16', 'we17', 'we18'] },
    { label: '空气质量', labelEn: 'Air Quality', emoji: '😷', wordIds: ['we19', 'we20'] },
  ],
  body: [
    { label: '头面部', labelEn: 'Head & Face', emoji: '😀', wordIds: ['bo1', 'bo2', 'bo3', 'bo4', 'bo5', 'bo6', 'bo20'] },
    { label: '躯干', labelEn: 'Torso', emoji: '🫁', wordIds: ['bo11', 'bo12', 'bo13', 'bo14', 'bo19'] },
    { label: '四肢', labelEn: 'Limbs', emoji: '💪', wordIds: ['bo7', 'bo8', 'bo9', 'bo10', 'bo18'] },
    { label: '关节·末端', labelEn: 'Joints & Extremities', emoji: '🦵', wordIds: ['bo15', 'bo16', 'bo17'] },
  ],
  transport: [
    { label: '公共交通', labelEn: 'Public Transport', emoji: '🚌', wordIds: ['tr1', 'tr2', 'tr3', 'tr4', 'tr17', 'tr18'] },
    { label: '私人交通', labelEn: 'Private Transport', emoji: '🚗', wordIds: ['tr6', 'tr7', 'tr8', 'tr9'] },
    { label: '航空', labelEn: 'Aviation', emoji: '✈️', wordIds: ['tr5', 'tr12'] },
    { label: '车站·票务', labelEn: 'Stations & Tickets', emoji: '🎫', wordIds: ['tr10', 'tr11', 'tr13', 'tr14', 'tr20'] },
    { label: '道路设施', labelEn: 'Road Facilities', emoji: '🚦', wordIds: ['tr15', 'tr16', 'tr19'] },
  ],
  clothing: [
    { label: '上装', labelEn: 'Tops', emoji: '👕', wordIds: ['cl1', 'cl2', 'cl6', 'cl7', 'cl18', 'cl19'] },
    { label: '下装', labelEn: 'Bottoms', emoji: '👖', wordIds: ['cl3', 'cl4', 'cl5', 'cl16', 'cl17'] },
    { label: '鞋类', labelEn: 'Footwear', emoji: '👟', wordIds: ['cl8', 'cl9', 'cl10'] },
    { label: '配饰', labelEn: 'Accessories', emoji: '🧣', wordIds: ['cl11', 'cl12', 'cl13', 'cl15', 'cl20'] },
    { label: '袜子', labelEn: 'Socks', emoji: '🧦', wordIds: ['cl14'] },
  ],
  house: [
    { label: '房间格局', labelEn: 'Room Layout', emoji: '🏠', wordIds: ['ho1', 'ho2', 'ho3', 'ho4', 'ho5', 'ho6'] },
    { label: '门窗', labelEn: 'doors and windows', emoji: '🚪', wordIds: ['ho7', 'ho8'] },
    { label: '家具', labelEn: 'Furniture', emoji: '🛏️', wordIds: ['ho9', 'ho10', 'ho11', 'ho12', 'ho13', 'ho14'] },
    { label: '家电', labelEn: 'Appliances', emoji: '📺', wordIds: ['ho15', 'ho16', 'ho17', 'ho18', 'ho19', 'ho20'] },
  ],
  school: [
    { label: '人与场所', labelEn: 'People & Places', emoji: '🏫', wordIds: ['sc1', 'sc2', 'sc3', 'sc4', 'sc15'] },
    { label: '文具用品', labelEn: 'Stationery', emoji: '✏️', wordIds: ['sc5', 'sc6', 'sc7', 'sc8', 'sc9'] },
    { label: '学习任务', labelEn: 'Study task', emoji: '📝', wordIds: ['sc10', 'sc11', 'sc12', 'sc16'] },
    { label: '学期·学制', labelEn: 'Semester & School System', emoji: '🎓', wordIds: ['sc13', 'sc14', 'sc17', 'sc18', 'sc19', 'sc20'] },
  ],
  work: [
    { label: '公司·场所', labelEn: 'Company & Workplace', emoji: '🏢', wordIds: ['wo1', 'wo2', 'wo15'] },
    { label: '人员·职位', labelEn: 'People & Positions', emoji: '👔', wordIds: ['wo3', 'wo4', 'wo5'] },
    { label: '日常业务', labelEn: 'Daily Work', emoji: '💼', wordIds: ['wo6', 'wo7', 'wo8', 'wo9', 'wo16', 'wo17', 'wo20'] },
    { label: '薪酬·福利', labelEn: 'Salary & Benefits', emoji: '💰', wordIds: ['wo10', 'wo13', 'wo19'] },
    { label: '入职·文件', labelEn: 'Onboarding & Documents', emoji: '📄', wordIds: ['wo11', 'wo12', 'wo14', 'wo18'] },
  ],
  emotions: [
    { label: '正面情绪', labelEn: 'Positive Emotions', emoji: '😊', wordIds: ['em1', 'em6', 'em11', 'em13', 'em14', 'em16'] },
    { label: '负面情绪', labelEn: 'Negative Emotions', emoji: '😢', wordIds: ['em2', 'em3', 'em7', 'em12', 'em17', 'em19'] },
    { label: '紧张·不安', labelEn: 'Nervousness & Anxiety', emoji: '😰', wordIds: ['em4', 'em5', 'em10', 'em15'] },
    { label: '微妙情感', labelEn: 'Subtle Feelings', emoji: '😳', wordIds: ['em8', 'em9', 'em18', 'em20'] },
  ],
  health: [
    { label: '医院·人员', labelEn: 'Hospital & Staff', emoji: '🏥', wordIds: ['he1', 'he2', 'he3', 'he4', 'he20'] },
    { label: '药品·处方', labelEn: 'Medicine & Prescriptions', emoji: '💊', wordIds: ['he5', 'he6', 'he18'] },
    { label: '症状', labelEn: 'symptoms', emoji: '🤒', wordIds: ['he7', 'he8', 'he9', 'he10'] },
    { label: '科室·治疗', labelEn: 'Departments & Treatment', emoji: '🩺', wordIds: ['he11', 'he12', 'he13', 'he14'] },
    { label: '保健·保险', labelEn: 'Health & Insurance', emoji: '🥗', wordIds: ['he15', 'he16', 'he17', 'he19'] },
  ],
  nature: [
    { label: '山水地貌', labelEn: 'Landscapes & Terrain', emoji: '⛰️', wordIds: ['na1', 'na2', 'na3', 'na4', 'na5', 'na17', 'na18', 'na19'] },
    { label: '天空天体', labelEn: 'Sky & Celestial Bodies', emoji: '🌌', wordIds: ['na7', 'na8', 'na9', 'na10'] },
    { label: '植物', labelEn: 'Plants', emoji: '🌳', wordIds: ['na6', 'na11', 'na12', 'na13'] },
    { label: '土石元素', labelEn: 'Earth & Stone Elements', emoji: '🪨', wordIds: ['na14', 'na15', 'na16', 'na20'] },
  ],
  places: [
    { label: '餐饮购物', labelEn: 'Dining & Shopping', emoji: '🍽️', wordIds: ['pl2', 'pl3', 'pl5', 'pl6', 'pl19'] },
    { label: '生活服务', labelEn: 'Daily Services', emoji: '🏦', wordIds: ['pl7', 'pl8', 'pl9', 'pl20'] },
    { label: '医疗健身', labelEn: 'Healthcare & Fitness', emoji: '🏥', wordIds: ['pl10', 'pl12', 'pl13'] },
    { label: '文化休闲', labelEn: 'Culture & Leisure', emoji: '🎭', wordIds: ['pl4', 'pl11', 'pl16', 'pl17', 'pl18'] },
    { label: '宗教·统称', labelEn: 'Religion & General Terms', emoji: '⛩️', wordIds: ['pl14', 'pl15', 'pl1'] },
  ],
};
