// 去掉帖子文本里的 emoji（学习内容不夹图形符），并清理残留的双空格/首尾空白。
// 列表 feed 与详情页共用，保证同一套规则。
export function stripEmoji(text: string): string {
  return text
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{20E3}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
