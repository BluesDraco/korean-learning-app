import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { getServerLang } from '@/lib/server/lang';
import { SITE_URL, SITE_NAME, HOME_COPY, HOME_KEYWORDS_EN } from '@/lib/seo';

import { AppShell } from '@/components/AppShell';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { FontProvider } from '@/components/FontProvider';
import { LangProvider } from '@/components/LangProvider';
import { ToastProvider } from '@/hooks/useToast';
import { ToriToastContainer } from '@/components/ToriToast';
import { LazyLayoutComponents } from '@/components/LazyLayoutComponents';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { KoAutoFit } from '@/components/common/KoAutoFit';
import { ToriSplash } from '@/components/ToriSplash';

// iOS 加桌面启动图：iOS 不认 manifest 启动图，靠 media query 精确匹配设备尺寸。
// 消除 standalone 冷启动白屏。file=public/splash/*.png，pt 尺寸 + 像素比。
const IOS_SPLASH: { file: string; w: number; h: number; r: number }[] = [
  { file: 'iphone-se',       w: 375, h: 667, r: 2 },
  { file: 'iphone-8plus',    w: 414, h: 736, r: 3 },
  { file: 'iphone-x',        w: 375, h: 812, r: 3 },
  { file: 'iphone-xr',       w: 414, h: 896, r: 2 },
  { file: 'iphone-xsmax',    w: 414, h: 896, r: 3 },
  { file: 'iphone-12',       w: 390, h: 844, r: 3 },
  { file: 'iphone-12promax', w: 428, h: 926, r: 3 },
  { file: 'iphone-14pro',    w: 393, h: 852, r: 3 },
  { file: 'iphone-14promax', w: 430, h: 932, r: 3 },
  { file: 'iphone-16pro',    w: 402, h: 874, r: 3 },
  { file: 'iphone-16promax', w: 440, h: 956, r: 3 },
];

const KEYWORDS_ZH = [
  '韩语学习', '在线学韩语', '韩语入门', '零基础学韩语',
  '韩语40音', '韩语发音', '韩语语法', '韩语单词',
  'TOPIK', 'TOPIK真题', 'TOPIK备考', 'TOPIK 模拟题',
  '韩语日记', '韩语阅读', '韩语听力', '韩语打字',
  '兔莉', '兔莉韩语', '兔莉的韩语日记', 'Tori', 'torikorean',
];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  const isEn = lang === 'en';
  const homeUrl = isEn ? `${SITE_URL}/en` : SITE_URL;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: HOME_COPY.title[lang],
      template: `%s ｜ ${SITE_NAME[lang]}`,
    },
    description: HOME_COPY.description[lang],
    keywords: isEn ? HOME_KEYWORDS_EN : KEYWORDS_ZH,
    alternates: {
      canonical: isEn ? '/en' : '/',
      languages: {
        'zh-CN': `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME[lang],
      title: HOME_COPY.title[lang],
      description: HOME_COPY.description[lang],
      url: homeUrl,
      locale: isEn ? 'en_US' : 'zh_CN',
      images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: SITE_NAME[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_COPY.title[lang],
      description: HOME_COPY.description[lang],
      images: ['/tori-og-v2.webp'],
    },
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico?v=3',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME[lang],
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_VERIFY_GOOGLE ? { google: process.env.NEXT_PUBLIC_VERIFY_GOOGLE } : {}),
    ...(process.env.NEXT_PUBLIC_VERIFY_YANDEX ? { yandex: process.env.NEXT_PUBLIC_VERIFY_YANDEX } : {}),
    ...(process.env.NEXT_PUBLIC_VERIFY_YAHOO ? { yahoo: process.env.NEXT_PUBLIC_VERIFY_YAHOO } : {}),
    other: {
      ...(process.env.NEXT_PUBLIC_VERIFY_BAIDU ? { 'baidu-site-verification': process.env.NEXT_PUBLIC_VERIFY_BAIDU } : {}),
      ...(process.env.NEXT_PUBLIC_VERIFY_BING ? { 'msvalidate.01': process.env.NEXT_PUBLIC_VERIFY_BING } : {}),
      ...(process.env.NEXT_PUBLIC_VERIFY_SOGOU ? { 'sogou_site_verification': process.env.NEXT_PUBLIC_VERIFY_SOGOU } : {}),
      ...(process.env.NEXT_PUBLIC_VERIFY_SHENMA ? { 'shenma-site-verification': process.env.NEXT_PUBLIC_VERIFY_SHENMA } : {}),
      ...(process.env.NEXT_PUBLIC_VERIFY_360 ? { '360-site-verification': process.env.NEXT_PUBLIC_VERIFY_360 } : {}),
      ...(process.env.NEXT_PUBLIC_VERIFY_NAVER ? { 'naver-site-verification': process.env.NEXT_PUBLIC_VERIFY_NAVER } : {}),
    },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#FFFBF7',
  width: 'device-width',
  initialScale: 1,
  // App 原生感：禁双击/捏合缩放。iOS Safari + Android Chrome + 鸿蒙 ArkWeb 都认 viewport。
  // （iOS 16+ 会忽略 userScalable，主要靠 maximumScale 生效）
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getServerLang();
  return (
    <html lang={lang === 'en' ? 'en' : 'zh-CN'} suppressHydrationWarning>
      <head>
        {/* 版本号 · 每次部署需手动递增 · 用户端版本不一致时自动硬刷新绕过 CDN+浏览器双缓存 */}
        <Script id="tori-build-check" strategy="beforeInteractive">{`
          (function(){
            var BUILD='2026-07-29-fontfix';
            try{
              var s=localStorage.getItem('tori-build');
              if(s!==BUILD){localStorage.setItem('tori-build',BUILD);window.location.reload(true);}
            }catch(e){}
          })();
        `}</Script>
        {/* 开屏动画兔莉图：最高优先级预加载，否则动画一上屏图还没下载完 = 空框闪一秒 */}
        <link rel="preload" as="image" href="/icon-512.png?v=3" fetchPriority="high" />
        {/* Preconnect/dns-prefetch for faster resource loading */}
        <link rel="dns-prefetch" href={SITE_URL.replace(/^https?:/, '')} />
        <link rel="preconnect" href={SITE_URL} />
        {/* 拉丁字体 (Fraunces/Caveat/JetBrains Mono) 自托管 — 原 Google Fonts <link> 在大陆裸连被墙/超时，
            而它是阻塞渲染的 stylesheet，开屏动画期间主线程被卡 = 卡顿+版本reload 双重症状。中文/韩文靠
            霞鹜文楷+Pretendard+系统字体兜底，Noto SC/KR 无需自托管。 */}
        <link rel="stylesheet" href="/fonts/latin/latin.css" />
        {/* Pretendard(韩文)/Noto Sans SC(中文正文) 自托管字体已移除 — 10Mbps 出站带宽被 woff2 打满(占 68% 流量)导致
            全站卡顿。韩文回落 Malgun/Apple SD Gothic/Noto Sans KR 系统字体，中文回落 system-ui/雅黑/苹方，
            字体栈已内置完整 fallback，无需改 CSS。品牌衬线(latin/Fraunces)+楷体(lxgw)带宽占比极小予以保留。 */}
        {/* 霞鹜文楷 Screen (开源楷体, 97 分包按需加载, 自托管于 /public/fonts) — App 壳无系统 KaiTi 时的中文楷体保底, 避免逐字 fallback 粗细不均 */}
        <link
          rel="stylesheet"
          href="/fonts/lxgw/lxgwwenkaiscreen.css"
        />
        {/* iOS 加桌面启动图 — 各机型 media query 精确匹配，消除 standalone 冷启动白屏 */}
        {IOS_SPLASH.map((s) => (
          <link
            key={s.file}
            rel="apple-touch-startup-image"
            href={`/splash/${s.file}.png`}
            media={`(device-width: ${s.w}px) and (device-height: ${s.h}px) and (-webkit-device-pixel-ratio: ${s.r}) and (orientation: portrait)`}
          />
        ))}
        {/* Polyfills for older Chromium browsers (Baidu, 360, etc.) */}
        <Script id="tori-polyfills" strategy="beforeInteractive">{`
          (function(){
            try {
              if(typeof globalThis==='undefined'){try{Object.defineProperty(Object.prototype,'__magic__',{get:function(){return this},configurable:true});__magic__.globalThis=__magic__;delete Object.prototype.__magic__;}catch(e){window.globalThis=window;}}
              if(typeof queueMicrotask!=='function'){var p=Promise.resolve();window.queueMicrotask=function(fn){p.then(fn);};}
              if(typeof Promise.allSettled!=='function'){Promise.allSettled=function(ps){return Promise.all(ps.map(function(p){return Promise.resolve(p).then(function(v){return{status:'fulfilled',value:v}},function(e){return{status:'rejected',reason:e}})}));};}
              if(typeof Promise.any!=='function'){Promise.any=function(ps){return new Promise(function(res,rej){var n=ps.length;if(!n){rej(new Error('All promises were rejected'));return;}var errs=[];ps.forEach(function(p,i){Promise.resolve(p).then(res,function(e){errs[i]=e;if(--n===0)rej(new Error('All promises were rejected: '+errs.join(', ')));});});});};}
            } catch(e) {}
          })();
        `}</Script>
        {/* Anti-FOUC: apply font settings before paint */}
        <Script id="tori-fouc-font" strategy="beforeInteractive">{`(function(){try{var s=JSON.parse(localStorage.getItem('font-settings'));if(s){var d=document.documentElement;if(s.preset)d.setAttribute('data-font',s.preset);if(s.size)d.setAttribute('data-font-size',s.size)}}catch(e){}})()`}</Script>
        {/* Anti-FOUC: apply theme before paint */}
        <Script id="tori-fouc-theme" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`}</Script>
        {/* 尽早捕获 beforeinstallprompt：事件只触发一次且时机很早，晚挂监听会错过。存到 window 供加桌面按钮/引导卡读取 */}
        <Script id="tori-capture-install" strategy="beforeInteractive">{`(function(){window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__bipEvent=e;window.dispatchEvent(new Event('tori-installable'))});window.addEventListener('appinstalled',function(){window.__bipEvent=null;window.dispatchEvent(new Event('tori-installed'))})})()`}</Script>
        {/* Anti-FOUC: apply reduce-motion before paint (否则关动画的偏好每次重开都失效) */}
        <Script id="tori-fouc-motion" strategy="beforeInteractive">{`(function(){try{document.documentElement.setAttribute('data-reduce-motion',localStorage.getItem('tori_reduce_motion')==='true'?'true':'false')}catch(e){}})()`}</Script>
        {/* 低端设备探测：内存≤4G 或 CPU≤4核 → data-lite，全局关 backdrop-filter(毛玻璃在低端 GPU 滚动掉帧最狠)。paint 前设避免闪。 */}
        <Script id="tori-lite-mode" strategy="beforeInteractive">{`(function(){try{var m=navigator.deviceMemory,c=navigator.hardwareConcurrency;if((typeof m==='number'&&m<=4)||(typeof c==='number'&&c<=4)){document.documentElement.setAttribute('data-lite','1')}}catch(e){}})()`}</Script>
        <Script id="tori-fouc-flashcard-theme" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('flashcard-theme');var valid=['warm','dark','paper','pure'];if(t&&valid.indexOf(t)!==-1){document.documentElement.setAttribute('data-fc-theme',t)}else{document.documentElement.setAttribute('data-fc-theme','pure')}}catch(e){document.documentElement.setAttribute('data-fc-theme','pure')}})()`}</Script>
        {/* Chunk 加载失败自愈：SPA 导航时偶发取不到 JS chunk 会静默中断 hydration（表现为壳消失/页面卡在 SSR 态），
            此处捕获 ChunkLoadError 后自动硬刷新一次；用 sessionStorage 限一次，避免循环刷新 */}
        <Script id="tori-chunk-recover" strategy="beforeInteractive">{`(function(){function isChunkErr(m){return m&&(m.indexOf('ChunkLoadError')>-1||m.indexOf('Loading chunk')>-1||m.indexOf('Loading CSS chunk')>-1||/Failed to fetch dynamically imported module/.test(m))}function recover(){try{if(sessionStorage.getItem('tori-chunk-reloaded'))return;sessionStorage.setItem('tori-chunk-reloaded','1')}catch(e){}location.reload()}window.addEventListener('error',function(e){if(isChunkErr(e&&e.message))recover()});window.addEventListener('unhandledrejection',function(e){var r=e&&e.reason;if(isChunkErr(r&&(r.message||String(r))))recover()});try{if(sessionStorage.getItem('tori-chunk-reloaded')){setTimeout(function(){try{sessionStorage.removeItem('tori-chunk-reloaded')}catch(e){}},8000)}}catch(e){}})()`}</Script>
      </head>
      <body className="min-h-screen antialiased page-corner-bunny">
        {/* 全站根 JSON-LD：定义 Organization + WebSite 实体，供其他页面 JSON-LD 通过 @id 引用
            用普通 <script> 而非 next/Script，避免 next/Script 对 type="application/ld+json" 支持不佳 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#org`,
                  name: SITE_NAME[lang],
                  url: SITE_URL,
                  logo: `${SITE_URL}/tori-og-v2.webp`,
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: SITE_NAME[lang],
                  url: SITE_URL,
                  inLanguage: lang === 'en' ? ['en', 'ko'] : ['zh-CN', 'ko'],
                  publisher: { '@id': `${SITE_URL}/#org` },
                },
                {
                  '@type': 'Course',
                  '@id': `${SITE_URL}/#course`,
                  name: HOME_COPY.title[lang],
                  description: HOME_COPY.description[lang],
                  url: lang === 'en' ? `${SITE_URL}/en` : SITE_URL,
                  inLanguage: lang === 'en' ? 'en' : 'zh-CN',
                  teaches: 'Korean language',
                  educationalLevel: 'Beginner to Advanced',
                  isAccessibleForFree: true,
                  provider: { '@id': `${SITE_URL}/#org` },
                },
              ],
            }),
          }}
        />
        <ThemeProvider>
          <ToriSplash />
          <FontProvider>
          <LangProvider initialLang={lang}>
          <AuthProvider>
          <ToastProvider>
          <ErrorBoundary>
            <AppShell>{children}</AppShell>
          </ErrorBoundary>
          <ToriToastContainer />
          </ToastProvider>
          </AuthProvider>
          </LangProvider>
          </FontProvider>
        </ThemeProvider>
        <LazyLayoutComponents />
        <KoAutoFit />
        <Script id="tori-sw-register" strategy="afterInteractive">{`if('serviceWorker' in navigator){if(location.hostname==='localhost'||location.hostname==='127.0.0.1'){navigator.serviceWorker.getRegistrations().then(function(regs){regs.forEach(function(r){r.unregister()})});caches.keys().then(function(keys){keys.forEach(function(k){caches.delete(k)})})}else{caches.keys().then(function(keys){keys.filter(function(k){return k!=='korean-learn-v20'}).forEach(function(k){caches.delete(k)})});navigator.serviceWorker.register('/sw.js').then(function(reg){reg.update();if(reg.waiting)reg.waiting.postMessage({type:'SKIP_WAITING'})});var reloaded=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(reloaded)return;reloaded=true;window.location.reload()})}}`}</Script>
      </body>
    </html>
  );
}
