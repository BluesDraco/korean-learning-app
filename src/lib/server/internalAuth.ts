// 站间通信：上海站(统一后台)跨站调香港站的内部数据接口。
// 走服务间密钥(非用户 token)。只上海主动调香港，单向。

const SECRET = process.env.INTERNAL_API_SECRET || '';
const PEER_URL = (process.env.PEER_SITE_URL || '').replace(/\/$/, '');
const HEADER = 'x-internal-secret';

// 香港站用：校验来访请求是否携带正确的内部密钥。
// 未配置 SECRET 时一律拒绝(防止空密钥裸奔)。
export function assertInternalCaller(req: Request): boolean {
  if (!SECRET) return false;
  return req.headers.get(HEADER) === SECRET;
}

export function hasPeerConfigured(): boolean {
  return !!(SECRET && PEER_URL);
}

// 上海站用：请求对方站(香港)的内部接口。5s 超时，任何失败抛错由调用方降级。
export async function fetchPeerSite<T>(path: string): Promise<T> {
  if (!hasPeerConfigured()) {
    throw new Error('PEER_SITE_URL / INTERNAL_API_SECRET 未配置');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${PEER_URL}${path}`, {
      headers: { [HEADER]: SECRET },
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`peer responded ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}
