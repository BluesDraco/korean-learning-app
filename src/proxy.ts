import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const DEV_JWT_SECRET = 'dev-only-korean-learning-app-secret-change-me';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (secret) return new TextEncoder().encode(secret);

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
  }

  return new TextEncoder().encode(DEV_JWT_SECRET);
}

// SEO 公开页：游客可读，搜索引擎可爬。个性化数据由客户端组件自行降级。
const PUBLIC_PATHS = new Set<string>([
  '/',
  '/phonetics',
  '/grammar',
  '/reading',
  '/diary',
  '/blog',          // 兔莉的博客：游客可浏览 SNS feed，点赞/收藏在 API 层才要登录
  '/radio',         // 动物城电台：游客可浏览节目单，边听边学
  '/map',           // 动物城地图：学习总入口，游客可浏览，登录后才显示真实进度
  '/topik',
  '/vocabulary',
  '/listening',
  '/speaking',
  '/writing',
  '/dictation',
  '/typing',
  '/pronunciation',
  '/knowledge',
  '/explore',
  '/tori',
  '/learn',
  '/learning',
  '/practice',
  '/review',
  '/ai/analyze',    // AI 内容拆解：页面可入，分析按钮点击时才走登录门
  '/tools',         // 免费韩语工具箱入口
  '/korea',         // 韩国专题 hub
  '/daily',         // 今日页：游客走 GuestDaily 分支，登录后走 DailyPage
  '/membership',    // 会员定价页：游客可浏览，选购时才走登录门
  '/invite',        // 邀请落地页：被邀请者未登录也要能进以存邀请码（/invite/mine 仍需登录）
]);

const PUBLIC_PREFIXES = [
  '/phonetics/',
  '/grammar/',
  '/reading/',
  '/diary/',
  '/blog/',         // 博客详情页 /blog/[slug]：游客可读
  '/radio/',        // 电台播放页 /radio/[id]：游客可听
  '/topik/',        // 交互练习页游客态下会显示登录 CTA，路由仍放行
  '/vocabulary/',
  '/listening/',
  '/speaking/',
  '/writing/',
  '/dictation/',
  '/knowledge/',
  '/korea/',
  '/tori/',
  '/learn/',
  '/learning/',
  '/practice/',
  '/review/',
  '/tools/',        // /tools/romanization /tools/keyboard /tools/korean-name
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

// 搜索引擎爬虫 UA 白名单：上线预告门控(LAUNCH_GATE)开启时，游客被拦在登录预告页，
// 但爬虫需要能爬到公开学习内容页(否则 sitemap 里几百条 URL 全被 302 到登录页 = 零收录)。
// 爬到的内容与登录用户完全一致(仅游客被预告页拦住)，非欺骗性 cloaking。
// 爬虫仍受 isPublicPath 约束，爬不到 /mine /admin 等私密页(robots 也已 disallow，双保险)。
const CRAWLER_UA = /(Baiduspider|Sogou(?:\s|web|spider)|bingbot|360Spider|HaoSouSpider|YisouSpider|Bytespider|Googlebot|Yandex|DuckDuckBot|Applebot)/i;

function isSearchCrawler(ua: string | null): boolean {
  return !!ua && CRAWLER_UA.test(ua);
}

// ⚠️ 上线预告门控（国内版）：备案后正式开放前，游客/普通用户不可进入任何学习内容，
// 只放行 SEO 落地页(/)与登录注册页；管理员(token role=admin)正常访问测试。
// 海外版(overseas)不受影响。上线时把 LAUNCH_GATE 改为 false 即全量放开。
// 与 src/lib/server/auth.ts 的 LAUNCH_GATE 同步开关（那边管 API，这边管页面访问）。
const LAUNCH_GATE = false;
const IS_DOMESTIC = process.env.NEXT_PUBLIC_EDITION !== 'overseas';

// 门控开启时仍允许游客访问的页面：落地页 + 登录/注册（登录页显示预告横幅）
function isGateAllowedGuestPath(pathname: string): boolean {
  return pathname === '/' || pathname === '/auth/login' || pathname === '/auth/register';
}

export async function proxy(request: NextRequest) {
  const rawPath = request.nextUrl.pathname;

  // ── /en 语言前缀：剥离后用裸路径复用全部白名单/鉴权逻辑，最终 rewrite 回裸路径 + 注入语言 header ──
  const isEn = rawPath === '/en' || rawPath.startsWith('/en/');
  const pathname = isEn ? (rawPath === '/en' ? '/' : rawPath.slice(3)) : rawPath;

  // 允许游客访问的公开页放行时的统一构造器：
  // - /en 请求 => rewrite 到裸路径（浏览器 URL 保持 /en/xxx，服务端渲染裸路径页面）+ 注入 x-tori-lang=en
  // - 普通请求 => 直接放行
  const pass = () => {
    if (!isEn) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    const res = NextResponse.rewrite(url);
    res.headers.set('x-tori-lang', 'en');
    return res;
  };
  // /en 下需要 redirect 时，回跳地址补回 /en 前缀，保持用户停留在英文站
  const enHref = (p: string) => (isEn ? (p === '/' ? '/en' : `/en${p}`) : p);

  // Static assets — always allow
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname.startsWith('/data/') ||   // 公开学习数据 JSON（题库/词表/TOPIK），游客态也需读
    pathname.startsWith('/vad/') ||
    pathname.startsWith('/stickers') ||
    pathname.startsWith('/icons') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json' ||
    pathname === '/favicon.ico' ||
    pathname === '/lumi-paw.html' ||
    pathname === '/animal-city.html' ||
    pathname === '/sticker.html' ||
    pathname === '/file.svg' ||
    pathname === '/globe.svg' ||
    pathname === '/next.svg' ||
    pathname === '/vercel.svg' ||
    pathname === '/window.svg' ||
    /\.(css|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot|mp3|mp4|webm)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // SEO endpoints — must be crawlable
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/BingSiteAuth.xml' ||
    /^\/(google|baidu_verify|baidu_ym)[a-z0-9]*\.html$/i.test(pathname) ||
    /^\/(google|baidu_verify|baidu_ym)[a-z0-9]*\.xml$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Auth pages — always allow (handle redirect-if-logged-in below)
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, getJwtSecret());
        return NextResponse.redirect(new URL(enHref('/daily'), request.url));
      } catch {}
    }
    return pass();
  }

  // All API routes — pass through (each route handles its own auth)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // ── 上线预告门控（国内版）──
  // 开放前：除落地页/登录注册外的所有页面（含学习内容），游客与普通用户一律跳登录页看预告；
  // 仅管理员 token 放行。海外版跳过。放在 isPublicPath 之前，覆盖所有 SEO 公开学习页。
  // 例外：搜索引擎爬虫访问公开学习页时放行(养收录)，私密页仍走 isPublicPath 拦截。
  if (LAUNCH_GATE && IS_DOMESTIC && !isGateAllowedGuestPath(pathname)) {
    const isCrawler = isSearchCrawler(request.headers.get('user-agent'));
    if (!(isCrawler && isPublicPath(pathname))) {
      const token = request.cookies.get('token')?.value;
      let isAdmin = false;
      if (token) {
        try {
          const { payload } = await jose.jwtVerify(token, getJwtSecret());
          isAdmin = payload.role === 'admin';
        } catch { /* 无效 token 视为游客 */ }
      }
      if (!isAdmin) {
        const loginUrl = new URL(enHref('/auth/login'), request.url);
        loginUrl.searchParams.set('gate', '1');
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Public pages — allow guest access (client components degrade gracefully)
  if (isPublicPath(pathname)) {
    return pass();
  }

  // All other pages — require login (/daily, /mine, /settings, /messages, /admin, /buddy, /ai, /achievement, /stats, /auth/reset ...)
  const token = request.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = new URL(enHref('/auth/login'), request.url);
    loginUrl.searchParams.set('redirect', enHref(pathname));
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());

    // Admin routes: require admin role
    if ((pathname === '/admin' || pathname.startsWith('/admin/')) && payload.role !== 'admin') {
      return NextResponse.redirect(new URL(enHref('/daily'), request.url));
    }
  } catch {
    const loginUrl = new URL(enHref('/auth/login'), request.url);
    loginUrl.searchParams.set('redirect', enHref(pathname));
    return NextResponse.redirect(loginUrl);
  }

  return pass();
}

export const config = {
  // 排除整个 _next（含 dev 的 webpack-hmr WebSocket）——middleware 对 /_next 本就无条件放行，
  // 但若让 HMR 的 WS upgrade 请求经过 middleware 会破坏握手(ERR_INVALID_HTTP_RESPONSE)，导致 dev 下 React 不水合。
  matcher: ['/((?!_next|favicon.ico).*)'],
};
