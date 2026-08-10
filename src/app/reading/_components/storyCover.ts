// 故事集封面图（3:4 纵版，600×800，放 public/images/reading-covers/{id}.webp）
// 后台上传时 sharp 统一裁成 3:4；前端有图则覆盖纯色兜底，缺图走 CSS 色块 + emoji。
export function storyCoverUrl(id: string): string {
  return `/images/reading-covers/${id}.webp`;
}
