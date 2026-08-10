import { BLOG_CAST_BY_ID } from './blogCast';

// 自定义场景「谁来陪演」卡司（派生自 blogCast，补中文名+人设，供 AI 挑角色/创建页 picker/渲染头像）
// 排除 news(动物城新闻官方号，不是可演角色)。emoji/nameKo 从 BLOG_CAST 取，此处只补 blogCast 缺的字段。
export interface SceneCastMember {
  [k: string]: unknown;
  id: string;
  emoji: string;
  nameKo: string;
  nameZh: string;
  persona: string; // 一句话人设，喂进 AI prompt
}

const EXTRA: Record<string, { nameZh: string; persona: string }> = {
  tori:    { nameZh: '兔莉', nameZhEn: 'Tori',   persona: '温暖亲切、耐心，说话自然口语', personaEn: 'Warm, friendly, patient, speaks naturally and colloquially' },
  minji:   { nameZh: '敏智', nameZhEn: 'Minji',   persona: '活泼水獭，热情外向、爱聊天', personaEn: 'Lively otter, outgoing and chatty' },
  haru:    { nameZh: '哈鲁', nameZhEn: 'Haru',   persona: '认真仓鼠，细致、守规矩', personaEn: 'Diligent hamster, meticulous and rule-abiding' },
  junho:   { nameZh: '俊浩', nameZhEn: 'Junho',   persona: '爽朗老虎，直率、有活力', personaEn: 'Cheerful tiger, straightforward and energetic' },
  darami:  { nameZh: '松鼠', nameZhEn: 'squirrel',   persona: '清晨般清爽，条理分明', personaEn: 'Fresh as the morning, well-organized' },
  gomdori: { nameZh: '熊多力', nameZhEn: 'Bear Dori', persona: '沉稳温厚，慢条斯理', personaEn: 'Calm and gentle, slow-paced' },
  yowoo:   { nameZh: '狐狸', nameZhEn: 'fox',   persona: '聪明冷静，略带距离感、问话犀利', personaEn: 'Smart and composed, slightly distant, sharp questions' },
  nabi:    { nameZh: '娜比', nameZhEn: 'Nabi',   persona: '文静小猫，细腻、敏感', personaEn: 'Quiet cat, delicate and sensitive' },
  choco:   { nameZh: '巧克', nameZhEn: 'Choco',   persona: '热情小狗，元气满满', personaEn: 'Energetic puppy, full of vitality' },
  koal:    { nameZh: '考拉', nameZhEn: 'Koala',   persona: '慢性子，放松随和', personaEn: 'Easygoing, relaxed and laid-back' },
};

export const SCENE_CAST: SceneCastMember[] = Object.entries(EXTRA).map(([id, e]) => {
  const b = BLOG_CAST_BY_ID[id];
  return { id, emoji: b.emoji, nameKo: b.name, nameZh: e.nameZh, persona: e.persona };
});

export const SCENE_CAST_BY_ID: Record<string, SceneCastMember> = Object.fromEntries(
  SCENE_CAST.map((c) => [c.id, c]),
);

export function getSceneCastById(id: string): SceneCastMember {
  return SCENE_CAST_BY_ID[id] ?? SCENE_CAST_BY_ID.tori;
}
