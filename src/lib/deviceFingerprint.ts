// 轻量设备指纹（防刷用，非强反作弊）。纯前端拼接稳定属性 → SHA-256 hex。
// 无痕/清缓存/换设备可绕过，MVP 接受此局限。
export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return '';
  try {
    const parts = [
      navigator.userAgent,
      `${screen.width}x${screen.height}`,
      Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      navigator.language,
      String(screen.colorDepth),
    ].join('|');
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(parts));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return '';
  }
}
