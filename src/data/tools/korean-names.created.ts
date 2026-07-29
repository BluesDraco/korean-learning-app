/**
 * AI 创作名。
 * 采用韩文常见汉字构词逻辑组合，取材于真实韩国名字用字（如 하/서/유/민/재/도/윤/원 等），
 * 每一条都标注 source='created'，明确告诉用户"由 AI 组合，非登记实名"。
 * 全部选用寓意美好、发音自然、不会显得怪异的字词组合。
 */
import type { KoreanName } from './korean-names';

export const CREATED_NAMES: KoreanName[] = [
  // ── 女名 · 现代风 ──
  { hangul: '하린', roman: 'Ha-rin', hanja: '夏麟', meaning: '夏日的麒麟，象征祥瑞', gender: 'F', style: ['modern', 'literary'], source: 'created', reason: '"夏"取自 하윤/하은等真实韩名用字，"麟"寓意祥瑞。发音柔和优雅。' },
  { hangul: '서율', roman: 'Seo-yul', hanja: '瑞栗', meaning: '祥瑞坚实', gender: 'F', style: ['literary', 'modern'], source: 'created', reason: '"瑞"字来自 서준/서윤，"栗"寓意坚强饱满。清爽好听。' },
  { hangul: '유담', roman: 'Yu-dam', hanja: '侑潭', meaning: '受祐的深潭', gender: 'F', style: ['literary'], source: 'created', reason: '"侑"字来自 유나/유진，"潭"寓意沉静深邃。有文学气质。' },
  { hangul: '연서', roman: 'Yeon-seo', hanja: '妍瑞', meaning: '美丽祥瑞', gender: 'F', style: ['modern'], source: 'created', reason: '"妍+瑞"均为常见韩名用字。发音清亮，寓意直白美好。' },
  { hangul: '수하', roman: 'Su-ha', hanja: '秀夏', meaning: '秀丽如夏日', gender: 'F', style: ['literary', 'modern'], source: 'created', reason: '"秀+夏"经典组合，寓意青春秀美。' },
  { hangul: '민유', roman: 'Min-yu', hanja: '敏侑', meaning: '聪敏受祐', gender: 'F', style: ['modern'], source: 'created', reason: '"敏+侑"，寓意聪明且受庇佑。' },
  { hangul: '지유', roman: 'Ji-yu', hanja: '知悠', meaning: '知性悠然', gender: 'F', style: ['literary'], source: 'created', reason: '"知+悠"，寓意智慧从容。' },
  { hangul: '유서', roman: 'Yu-seo', hanja: '侑瑞', meaning: '受祐祥瑞', gender: 'F', style: ['modern'], source: 'created', reason: '"侑+瑞"叠加祝福，柔和亲切。' },
  { hangul: '아윤', roman: 'A-yun', hanja: '雅潤', meaning: '雅致润泽', gender: 'F', style: ['literary'], source: 'created', reason: '"雅+潤"，寓意优雅温润。' },
  { hangul: '리안', roman: 'Ri-an', hanja: '莉安', meaning: '如莉花般安宁', gender: 'F', style: ['modern'], source: 'created', reason: '"莉+安"，寓意柔美安好。' },
  { hangul: '나윤', roman: 'Na-yun', hanja: '娜潤', meaning: '娜姿润泽', gender: 'F', style: ['modern'], source: 'created', reason: '"娜+潤"，柔和又滋养。' },
  { hangul: '서하', roman: 'Seo-ha', hanja: '瑞夏', meaning: '祥瑞的夏日', gender: 'F', style: ['literary'], source: 'created', reason: '"瑞+夏"，明朗又吉祥。' },
  { hangul: '유리안', roman: 'Yu-ri-an', hanja: '琉璃安', meaning: '琉璃般清澈安好', gender: 'F', style: ['literary'], source: 'created', reason: '"琉璃+安"，晶莹剔透的美好。' },
  { hangul: '아라', roman: 'A-ra', hanja: '雅羅', meaning: '雅致如罗绮', gender: 'F', style: ['literary'], source: 'created', reason: '"雅+羅"，古典优雅。' },
  { hangul: '지음', roman: 'Ji-eum', hanja: '知音', meaning: '知音（懂心之人）', gender: 'F', style: ['literary'], source: 'created', reason: '汉字直译"知音"，寓意灵魂契合。' },
  { hangul: '유하', roman: 'Yu-ha', hanja: '悠夏', meaning: '悠然的夏日', gender: 'F', style: ['literary'], source: 'created', reason: '"悠+夏"，从容明朗。' },
  { hangul: '수린', roman: 'Su-rin', hanja: '秀璘', meaning: '秀丽如美玉', gender: 'F', style: ['literary'], source: 'created', reason: '"秀+璘（玉光）"，寓意光洁秀美。' },
  { hangul: '민아', roman: 'Min-a', hanja: '敏雅', meaning: '聪敏优雅', gender: 'F', style: ['modern'], source: 'created', reason: '"敏+雅"，聪明又有品味。' },
  { hangul: '해린', roman: 'Hae-rin', hanja: '海麟', meaning: '海边的麒麟', gender: 'F', style: ['literary'], source: 'created', reason: '"海+麟"，寓意胸怀开阔。NewJeans 有成员同名 haerin，此为 AI 组合。' },
  { hangul: '나온', roman: 'Na-on', hanja: '나온', meaning: '走出来的（纯韩语）', gender: 'F', style: ['literary'], source: 'created', reason: '纯韩语固有词组合，寓意勇敢面世。近年流行"纯韩名"趋势。' },

  // ── 男名 · 现代风 ──
  { hangul: '도현', roman: 'Do-hyun', hanja: '道賢', meaning: '有道德的贤者', gender: 'M', style: ['classic', 'literary'], source: 'created', reason: '"道+賢"儒家取名传统，寓意品行端正。' },
  { hangul: '재율', roman: 'Jae-yul', hanja: '在律', meaning: '存于法度', gender: 'M', style: ['modern'], source: 'created', reason: '"在+律"，寓意有规矩、稳重。' },
  { hangul: '유담', roman: 'Yu-dam', hanja: '裕潭', meaning: '富足的深潭', gender: 'M', style: ['literary'], source: 'created', reason: '"裕+潭"男性版本，寓意富足沉稳。与女版同名字不同汉字。' },
  { hangul: '태율', roman: 'Tae-yul', hanja: '泰律', meaning: '安泰有序', gender: 'M', style: ['modern'], source: 'created', reason: '"泰+律"，寓意稳定安定。' },
  { hangul: '해준', roman: 'Hae-jun', hanja: '海俊', meaning: '像海一样俊朗', gender: 'M', style: ['modern'], source: 'created', reason: '"海+俊"，开阔英俊。' },
  { hangul: '지원', roman: 'Ji-won', hanja: '至源', meaning: '至本源', gender: 'M', style: ['literary'], source: 'created', reason: '"至+源"男性组合，寓意回归本真。' },
  { hangul: '민율', roman: 'Min-yul', hanja: '敏律', meaning: '聪敏有律', gender: 'M', style: ['modern'], source: 'created', reason: '"敏+律"，寓意机敏自律。' },
  { hangul: '지훈', roman: 'Ji-hun', hanja: '至勳', meaning: '成就大功', gender: 'M', style: ['classic'], source: 'created', reason: '"至+勳"，寓意成就非凡。' },
  { hangul: '서온', roman: 'Seo-on', hanja: '瑞溫', meaning: '祥瑞温和', gender: 'M', style: ['modern'], source: 'created', reason: '"瑞+溫"，温柔又吉祥。' },
  { hangul: '건율', roman: 'Gun-yul', hanja: '健律', meaning: '健康有律', gender: 'M', style: ['modern'], source: 'created', reason: '"健+律"，寓意身心康健。' },
  { hangul: '주안', roman: 'Ju-an', hanja: '柱安', meaning: '如柱石般安稳', gender: 'M', style: ['classic'], source: 'created', reason: '"柱+安"，寓意可靠稳重。' },
  { hangul: '재하', roman: 'Jae-ha', hanja: '在夏', meaning: '身处夏日', gender: 'M', style: ['literary'], source: 'created', reason: '"在+夏"，明朗年轻的气质。' },
  { hangul: '태원', roman: 'Tae-won', hanja: '太源', meaning: '至大本源', gender: 'M', style: ['classic'], source: 'created', reason: '"太+源"，寓意大器。' },
  { hangul: '유안', roman: 'Yu-an', hanja: '裕安', meaning: '富足安宁', gender: 'M', style: ['modern'], source: 'created', reason: '"裕+安"，寓意生活富足平安。' },
  { hangul: '건우', roman: 'Gun-woo', hanja: '建祐', meaning: '建功受祐', gender: 'M', style: ['modern'], source: 'created', reason: '"建+祐"AI 组合。同发音的 건우(健祐) 是韩国实登名，此处采用不同汉字。' },
  { hangul: '이온', roman: 'I-on', hanja: '怡溫', meaning: '愉悦温和', gender: 'M', style: ['literary'], source: 'created', reason: '"怡+溫"，寓意心境明朗温润。' },
  { hangul: '해윤', roman: 'Hae-yun', hanja: '海潤', meaning: '海一般润泽', gender: 'M', style: ['literary'], source: 'created', reason: '"海+潤"，寓意胸怀润泽。' },
  { hangul: '수한', roman: 'Su-han', hanja: '秀翰', meaning: '秀丽文采', gender: 'M', style: ['literary'], source: 'created', reason: '"秀+翰"，寓意才华出众。' },
  { hangul: '아준', roman: 'A-jun', hanja: '雅俊', meaning: '雅致俊秀', gender: 'M', style: ['modern'], source: 'created', reason: '"雅+俊"，斯文帅气。' },
  { hangul: '민하', roman: 'Min-ha', hanja: '敏夏', meaning: '聪敏如夏', gender: 'M', style: ['modern'], source: 'created', reason: '"敏+夏"，聪明明朗。' },

  // ── 中性名 ──
  { hangul: '가온', roman: 'Ga-on', hanja: '가온', meaning: '中心（纯韩语古语）', gender: 'U', style: ['literary'], source: 'created', reason: '古韩语意为"中央/核心"，近年重新流行的新式纯韩名。' },
  { hangul: '한별', roman: 'Han-byeol', hanja: '一별', meaning: '一颗星（별=星，纯韩语）', gender: 'U', style: ['literary', 'modern'], source: 'created', reason: '"한(一)+별(星)"纯韩语组合，寓意独一无二的星光。' },
  { hangul: '온유', roman: 'On-yu', hanja: '溫柔', meaning: '温柔', gender: 'U', style: ['literary'], source: 'created', reason: '汉字直译"温柔"，男女皆宜。' },
  { hangul: '지음', roman: 'Ji-eum', hanja: '知音', meaning: '知音', gender: 'U', style: ['literary'], source: 'created', reason: '意为"懂彼此心"，含蓄文艺。' },
  { hangul: '별하', roman: 'Byeol-ha', hanja: '별夏', meaning: '星辰之夏', gender: 'U', style: ['literary'], source: 'created', reason: '纯韩语"별(星)"+汉字"夏"，意境清新。' },
  { hangul: '해솔', roman: 'Hae-sol', hanja: '海솔', meaning: '海边松（솔=松树）', gender: 'U', style: ['literary'], source: 'created', reason: '汉字"海"+纯韩语"솔(松)"，寓意坚韧不拔。' },
];
