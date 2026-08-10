// 主题 → 卡片顶部横幅图（16:9，1200×675，放 public/images/reading-topics/）
// 每个主题一张，同主题所有文章卡片共用。缺图时 CSS 兜底纯色渐变。
const TOPIC_IMAGE: Record<string, string> = {
  이야기: '/images/reading-topics/topic-story.webp',
  文化: '/images/reading-topics/topic-culture.webp',
  生活: '/images/reading-topics/topic-life.webp',
  旅行: '/images/reading-topics/topic-travel.webp',
  社会: '/images/reading-topics/topic-society.webp',
  KPOP: '/images/reading-topics/topic-kpop.webp',
  韩剧: '/images/reading-topics/topic-drama.webp',
};

export function topicImage(topic: string): string | undefined {
  return TOPIC_IMAGE[topic];
}
