export type TopicMeta = { key: string; emoji: string; kr: string; en: string };

// 主题分区顺序 + 韩文小标（内容按此分区展示）
export const TOPIC_META: TopicMeta[] = [
  { key: '이야기', emoji: '📖', kr: '동물 도시 이야기', en: 'Animal City Stories' },
  { key: '文化', emoji: '🏮', kr: '한국 문화', en: 'Korean Culture' },
  { key: '生活', emoji: '🏠', kr: '일상생활', en: 'Daily Life' },
  { key: '旅行', emoji: '🧳', kr: '여행', en: 'Travel' },
  { key: '社会', emoji: '📰', kr: '사회', en: 'Society' },
  { key: 'KPOP', emoji: '🎧', kr: '케이팝', en: 'K-Pop' },
  { key: '韩剧', emoji: '🎬', kr: '드라마', en: 'K-Drama' } ];
