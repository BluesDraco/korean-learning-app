import type { KnowledgeGroup } from './knowledge';

// 分类速查 → 对应场景词包的单向引导。key = category.slug。
// 只给"背完名词想学怎么用"成立的分类加，详情页底部渲染一张软引导卡。
export interface KnowledgeThemeLink {
  themeId: string;
  emoji: string;
  name: string;
}
export const knowledgeThemeLinks: Record<string, KnowledgeThemeLink> = {
  work: { themeId: 'theme-work', emoji: '📧', name: '邮件/职场用语' },
  school: { themeId: 'theme-classroom', emoji: '🏫', name: '课堂用语' },
  emotions: { themeId: 'theme-emotions', emoji: '💕', name: '表白与情感' },
  health: { themeId: 'theme-hospital', emoji: '🏥', name: '看医生' },
  food: { themeId: 'theme-restaurant', emoji: '🍽️', name: '餐厅用餐' },
};

// 每个分类的语义分组。key = category.slug。
// wordIds 必须精确匹配 knowledge.ts 中该分类的词条 id，且完整覆盖、不重复。
// 详情页在存在分组时按分组小标题渲染，否则回退平铺。
export const knowledgeGroups: Record<string, KnowledgeGroup[]> = {
  time: [
    { label: '一天时段', emoji: '🌅', wordIds: ['t6', 't9', 't10', 't7', 't8', 't5'] },
    { label: '日期与天', emoji: '📅', wordIds: ['t2', 't3', 't4', 't17', 't18', 't1'] },
    { label: '星期与周', emoji: '🗓️', wordIds: ['t13', 't14', 't11', 't12'] },
    { label: '年份', emoji: '📆', wordIds: ['t15', 't16'] },
    { label: '四季', emoji: '🍂', wordIds: ['t19', 't20', 't21', 't22'] },
  ],
  numbers: [
    { label: '汉字数字', emoji: '🔢', wordIds: ['n1', 'n2', 'n3', 'n4', 'n5', 'n14', 'n15', 'n16', 'n17'] },
    { label: '固有数字', emoji: '✋', wordIds: ['n6', 'n7', 'n8', 'n9'] },
    { label: '量词', emoji: '📏', wordIds: ['n10', 'n11', 'n12', 'n13', 'n19', 'n20'] },
    { label: '其他', emoji: '➗', wordIds: ['n18'] },
  ],
  fruits: [
    { label: '常见水果', emoji: '🍎', wordIds: ['f1', 'f2', 'f3', 'f4', 'f5', 'f8', 'f13'] },
    { label: '柑橘·浆果', emoji: '🍊', wordIds: ['f6', 'f9', 'f11', 'f16', 'f15'] },
    { label: '核果', emoji: '🍑', wordIds: ['f7', 'f12', 'f17', 'f18'] },
    { label: '热带·其他', emoji: '🥭', wordIds: ['f10', 'f14', 'f19', 'f20'] },
  ],
  sports: [
    { label: '球类', emoji: '⚽', wordIds: ['sp2', 'sp3', 'sp4', 'sp5', 'sp6', 'sp8', 'sp9', 'sp10'] },
    { label: '水上·冰雪', emoji: '🏊', wordIds: ['sp7', 'sp11', 'sp18', 'sp19'] },
    { label: '户外·健身', emoji: '🏔️', wordIds: ['sp12', 'sp13', 'sp14', 'sp20'] },
    { label: '格斗·其他', emoji: '🥋', wordIds: ['sp15', 'sp16', 'sp17', 'sp1'] },
  ],
  hobbies: [
    { label: '文艺欣赏', emoji: '🎬', wordIds: ['h1', 'h2', 'h3', 'h17'] },
    { label: '动手创作', emoji: '🎨', wordIds: ['h4', 'h5', 'h9', 'h13', 'h16'] },
    { label: '乐器演奏', emoji: '🎹', wordIds: ['h12', 'h18', 'h19'] },
    { label: '户外活动', emoji: '🏕️', wordIds: ['h6', 'h10', 'h11', 'h14'] },
    { label: '游戏·收藏', emoji: '🎮', wordIds: ['h7', 'h8', 'h15', 'h20'] },
  ],
  family: [
    { label: '统称', emoji: '👨‍👩‍👧‍👦', wordIds: ['fa1', 'fa2'] },
    { label: '父母', emoji: '👨‍👩‍👧', wordIds: ['fa3', 'fa4', 'fa5', 'fa6'] },
    { label: '祖辈', emoji: '👴', wordIds: ['fa9', 'fa10'] },
    { label: '同辈', emoji: '🧑‍🤝‍🧑', wordIds: ['fa11', 'fa12', 'fa13', 'fa14', 'fa15'] },
    { label: '子女·配偶·亲戚', emoji: '👶', wordIds: ['fa7', 'fa8', 'fa16', 'fa17', 'fa18', 'fa19', 'fa20'] },
  ],
  food: [
    { label: '主食·饭类', emoji: '🍚', wordIds: ['fd1', 'fd4', 'fd5', 'fd18'] },
    { label: '韩式招牌', emoji: '🍖', wordIds: ['fd2', 'fd3', 'fd6', 'fd9', 'fd11'] },
    { label: '汤·锅·煎', emoji: '🍲', wordIds: ['fd8', 'fd13', 'fd14', 'fd7'] },
    { label: '小食·配菜', emoji: '🍗', wordIds: ['fd10', 'fd12', 'fd15', 'fd16', 'fd17'] },
    { label: '面包·饮品', emoji: '🥛', wordIds: ['fd19', 'fd20'] },
  ],
  colors: [
    { label: '三原色·基础', emoji: '🎨', wordIds: ['co1', 'co2', 'co3', 'co5', 'co6'] },
    { label: '间色', emoji: '🟢', wordIds: ['co4', 'co7', 'co8', 'co9'] },
    { label: '深浅变化', emoji: '🔵', wordIds: ['co12', 'co13', 'co14'] },
    { label: '中性·金属色', emoji: '⚪', wordIds: ['co10', 'co11', 'co15'] },
  ],
  animals: [
    { label: '宠物·家养', emoji: '🐶', wordIds: ['an1', 'an2', 'an3'] },
    { label: '野生猛兽', emoji: '🦁', wordIds: ['an4', 'an5', 'an6', 'an7', 'an8', 'an9'] },
    { label: '农场家畜', emoji: '🐄', wordIds: ['an10', 'an11', 'an12', 'an13', 'an14', 'an15'] },
    { label: '鸟·鱼·爬行', emoji: '🐦', wordIds: ['an16', 'an17', 'an18', 'an19', 'an20'] },
  ],
  weather: [
    { label: '晴雨阴', emoji: '🌤️', wordIds: ['we1', 'we2', 'we3', 'we4', 'we5'] },
    { label: '风云雾', emoji: '💨', wordIds: ['we6', 'we7', 'we9'] },
    { label: '温度·湿度', emoji: '🌡️', wordIds: ['we10', 'we11', 'we12', 'we13'] },
    { label: '灾害天气', emoji: '⛈️', wordIds: ['we8', 'we14', 'we15', 'we16', 'we17', 'we18'] },
    { label: '空气质量', emoji: '😷', wordIds: ['we19', 'we20'] },
  ],
  body: [
    { label: '头面部', emoji: '😀', wordIds: ['bo1', 'bo2', 'bo3', 'bo4', 'bo5', 'bo6', 'bo20'] },
    { label: '躯干', emoji: '🫁', wordIds: ['bo11', 'bo12', 'bo13', 'bo14', 'bo19'] },
    { label: '四肢', emoji: '💪', wordIds: ['bo7', 'bo8', 'bo9', 'bo10', 'bo18'] },
    { label: '关节·末端', emoji: '🦵', wordIds: ['bo15', 'bo16', 'bo17'] },
  ],
  transport: [
    { label: '公共交通', emoji: '🚌', wordIds: ['tr1', 'tr2', 'tr3', 'tr4', 'tr17', 'tr18'] },
    { label: '私人交通', emoji: '🚗', wordIds: ['tr6', 'tr7', 'tr8', 'tr9'] },
    { label: '航空', emoji: '✈️', wordIds: ['tr5', 'tr12'] },
    { label: '车站·票务', emoji: '🎫', wordIds: ['tr10', 'tr11', 'tr13', 'tr14', 'tr20'] },
    { label: '道路设施', emoji: '🚦', wordIds: ['tr15', 'tr16', 'tr19'] },
  ],
  clothing: [
    { label: '上装', emoji: '👕', wordIds: ['cl1', 'cl2', 'cl6', 'cl7', 'cl18', 'cl19'] },
    { label: '下装', emoji: '👖', wordIds: ['cl3', 'cl4', 'cl5', 'cl16', 'cl17'] },
    { label: '鞋类', emoji: '👟', wordIds: ['cl8', 'cl9', 'cl10'] },
    { label: '配饰', emoji: '🧣', wordIds: ['cl11', 'cl12', 'cl13', 'cl15', 'cl20'] },
    { label: '袜子', emoji: '🧦', wordIds: ['cl14'] },
  ],
  house: [
    { label: '房间格局', emoji: '🏠', wordIds: ['ho1', 'ho2', 'ho3', 'ho4', 'ho5', 'ho6'] },
    { label: '门窗', emoji: '🚪', wordIds: ['ho7', 'ho8'] },
    { label: '家具', emoji: '🛏️', wordIds: ['ho9', 'ho10', 'ho11', 'ho12', 'ho13', 'ho14'] },
    { label: '家电', emoji: '📺', wordIds: ['ho15', 'ho16', 'ho17', 'ho18', 'ho19', 'ho20'] },
  ],
  school: [
    { label: '人与场所', emoji: '🏫', wordIds: ['sc1', 'sc2', 'sc3', 'sc4', 'sc15'] },
    { label: '文具用品', emoji: '✏️', wordIds: ['sc5', 'sc6', 'sc7', 'sc8', 'sc9'] },
    { label: '学习任务', emoji: '📝', wordIds: ['sc10', 'sc11', 'sc12', 'sc16'] },
    { label: '学期·学制', emoji: '🎓', wordIds: ['sc13', 'sc14', 'sc17', 'sc18', 'sc19', 'sc20'] },
  ],
  work: [
    { label: '公司·场所', emoji: '🏢', wordIds: ['wo1', 'wo2', 'wo15'] },
    { label: '人员·职位', emoji: '👔', wordIds: ['wo3', 'wo4', 'wo5'] },
    { label: '日常业务', emoji: '💼', wordIds: ['wo6', 'wo7', 'wo8', 'wo9', 'wo16', 'wo17', 'wo20'] },
    { label: '薪酬·福利', emoji: '💰', wordIds: ['wo10', 'wo13', 'wo19'] },
    { label: '入职·文件', emoji: '📄', wordIds: ['wo11', 'wo12', 'wo14', 'wo18'] },
  ],
  emotions: [
    { label: '正面情绪', emoji: '😊', wordIds: ['em1', 'em6', 'em11', 'em13', 'em14', 'em16'] },
    { label: '负面情绪', emoji: '😢', wordIds: ['em2', 'em3', 'em7', 'em12', 'em17', 'em19'] },
    { label: '紧张·不安', emoji: '😰', wordIds: ['em4', 'em5', 'em10', 'em15'] },
    { label: '微妙情感', emoji: '😳', wordIds: ['em8', 'em9', 'em18', 'em20'] },
  ],
  health: [
    { label: '医院·人员', emoji: '🏥', wordIds: ['he1', 'he2', 'he3', 'he4', 'he20'] },
    { label: '药品·处方', emoji: '💊', wordIds: ['he5', 'he6', 'he18'] },
    { label: '症状', emoji: '🤒', wordIds: ['he7', 'he8', 'he9', 'he10'] },
    { label: '科室·治疗', emoji: '🩺', wordIds: ['he11', 'he12', 'he13', 'he14'] },
    { label: '保健·保险', emoji: '🥗', wordIds: ['he15', 'he16', 'he17', 'he19'] },
  ],
  nature: [
    { label: '山水地貌', emoji: '⛰️', wordIds: ['na1', 'na2', 'na3', 'na4', 'na5', 'na17', 'na18', 'na19'] },
    { label: '天空天体', emoji: '🌌', wordIds: ['na7', 'na8', 'na9', 'na10'] },
    { label: '植物', emoji: '🌳', wordIds: ['na6', 'na11', 'na12', 'na13'] },
    { label: '土石元素', emoji: '🪨', wordIds: ['na14', 'na15', 'na16', 'na20'] },
  ],
  places: [
    { label: '餐饮购物', emoji: '🍽️', wordIds: ['pl2', 'pl3', 'pl5', 'pl6', 'pl19'] },
    { label: '生活服务', emoji: '🏦', wordIds: ['pl7', 'pl8', 'pl9', 'pl20'] },
    { label: '医疗健身', emoji: '🏥', wordIds: ['pl10', 'pl12', 'pl13'] },
    { label: '文化休闲', emoji: '🎭', wordIds: ['pl4', 'pl11', 'pl16', 'pl17', 'pl18'] },
    { label: '宗教·统称', emoji: '⛩️', wordIds: ['pl14', 'pl15', 'pl1'] },
  ],
};
