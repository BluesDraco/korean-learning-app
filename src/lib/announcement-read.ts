// 公告已读状态的 localStorage 兜底 key
// 服务端写入失败/网络抖动时也不会导致弹窗重复触发
// 两个入口共用：PopupAnnouncement.tsx + daily/page.tsx
export const ANNOUNCEMENT_READ_PREFIX = 'popup-announcement-read:';

export function announcementReadKey(userId: string, annId: string): string {
  return `${ANNOUNCEMENT_READ_PREFIX}${userId}:${annId}`;
}
