import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@libsql/client'],
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
      {
        source: '/',
        destination: '/daily',
        permanent: false,
      },
      {
        source: '/diary/:day(\\d+)',
        destination: '/diary/beginner/:day',
        permanent: false,
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
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
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
      // Next.js hashed static assets — immutable long cache
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Page HTML — always revalidate so users get fresh chunk manifest after deploy
      {
        source: '/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
      // Auth endpoint — short private cache to avoid redundant DB hits on SPA navigation
      {
        source: '/api/auth/me',
        headers: [{ key: 'Cache-Control', value: 'private, max-age=30' }],
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
      ...securityHeaders,
    ];
  },
};

export default nextConfig;
