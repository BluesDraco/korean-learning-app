import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@libsql/client'],
  experimental: {
    // 按需打包：lucide 用了 156 处，旧版本会把整包打入，启用后只打实际用到的图标。
    // recharts 等大库同样受益。预期 First Load JS 减半。
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  // Exclude large authoring assets from build tracing to prevent build hangs
  outputFileTracingExcludes: {
    'next-server': [
      './public/images/picture-books/**',
      './data/dict/**',
      './reference/**',
    ],
    '/**/*': [
      './public/images/picture-books/**',
      './data/dict/**',
      './reference/**',
    ],
  },
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgnews.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'ssl.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },

  async redirects() {
    return [
      // 听说练习 → 口语练习 改名重定向(旧路由文件保留,此处 308 永久跳转)
      { source: '/listening', destination: '/speaking', permanent: true },
      { source: '/listening/speaking', destination: '/speaking/say', permanent: true },
      { source: '/listening/shadow', destination: '/speaking/shadow', permanent: true },
      {
        source: '/diary/:day(\\d+)',
        destination: '/diary/beginner/:day',
        permanent: true,
      },
      {
        source: '/pronunciation',
        destination: '/phonetics',
        permanent: true,
      },
      {
        source: '/phonetics/rules',
        destination: '/phonetics',
        permanent: true,
      },
    ];
  },

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    const securityHeaders = isProd ? [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
              "connect-src 'self' https://torikorean.com https://api.deepseek.com https://nls-gateway.cn-shanghai.aliyuncs.com https://nls-gateway-cn-shanghai.aliyuncs.com https://*.turso.io wss://*.turso.io",
              "media-src 'self' data: blob: https://torikorean.com https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com",
              "frame-src 'self' https://www.bilibili.com https://www.youtube.com https://www.youtube-nocookie.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=()' },
        ],
      },
    ] : [];

    return [
      // Next.js hashed static assets — immutable long cache（仅生产：dev 下 immutable 会缓存陈旧 chunk，破坏 HMR/水合）
      ...(isProd ? [{
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      }] : []),
      // 允许 Google 抓大图 + 长文本 snippet + 无限期视频预览（配合 OG 图和 metadata）
      // 负向前瞻加 (?:/|$) 边界锚，避免误伤 /dailyLife /minecraft 等前缀相似的公开路径
      {
        source: '/((?!(?:api|admin|mine|settings|messages|stats|daily|buddy|ai/voice|achievement|auth)(?:/|$)).*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        ],
      },
      // 私密页面：绝不缓存（防止 A 用户看到 B 用户数据，配合 layout 版本号自刷）
      { source: '/daily', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/daily/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/mine/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/settings/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/messages/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/admin/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/buddy/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/ai/voice/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/achievement/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/stats/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      { source: '/auth/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate' }] },
      // Auth endpoint — short private cache to avoid redundant DB hits on SPA navigation
      {
        source: '/api/auth/me',
        headers: [{ key: 'Cache-Control', value: 'private, max-age=30' }],
      },
      // API 默认不缓存
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache, no-store' }] },
      // 首页：CDN 缓 1 小时，浏览器 60 秒，允许 stale 一天
      {
        source: '/',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' }],
      },
      // Static content pages — 1 hour cache
      {
        source: '/phonetics/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/grammar/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/reading/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/diary/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/vocabulary/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/speaking/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/writing/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/dictation/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/korea/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      // Override for dynamic KPOP pages — short cache to avoid stale UI after deploy
      {
        source: '/korea/kpop/news/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=3600' }],
      },
      {
        source: '/korea/kpop/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=60, stale-while-revalidate=300' }],
      },
      {
        source: '/knowledge/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/expressions/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/dictionary/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/topik/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      // Static assets — long cache
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      // 词库 / TOPIK 真题 JSON：随构建静态产出、无身份信息，长缓存 + stale-while-revalidate
      {
        source: '/data/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      ...securityHeaders,
    ];
  },
};

export default nextConfig;
