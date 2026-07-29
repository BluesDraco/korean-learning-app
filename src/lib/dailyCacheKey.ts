export function dailyCacheKey(prefix: string, uid: string): string {
  const d = new Date();
  return `${prefix}:v2:${uid}:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
