import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { VisitorCounter } from '@/components/VisitorCounter';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { AuthProvider } from '@/components/AuthProvider';
import { XpOverlay } from '@/components/XpOverlay';

export const metadata: Metadata = {
  title: '한국어 - 韩语学习',
  description: 'YouTube学韩语，智能背单词，影子跟读练口语',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '韩语学习',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFBF7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai&family=Nanum+Pen+Script&family=Nanum+Gothic:wght@400;700;800&family=Nunito:wght@400;500;600;700;800&family=ZCOOL+KuaiLe&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased page-corner-bunny">
        <ThemeProvider>
          <AuthProvider>
          {/* Floating decorative particles */}
          <FloatingDecorations />
          {/* Marquee banner */}
          <div className="marquee-banner fixed top-0 left-0 right-0 z-[60] md:left-48">
            <span>
              🌸 한국어 공부하자! ✧ 韩语学习日记 ✧ 안녕하세요 ✧ 今天也是努力学习的一天 ✧ 화이팅! ✧
              🌸 한국어 공부하자! ✧ 韩语学习日记 ✧ 안녕하세요 ✧ 今天也是努力学习的一天 ✧ 화이팅! ✧
            </span>
          </div>
          {/* Offset for marquee banner */}
          <div className="h-[44px]" />
          <Navbar />
          <main className="pb-16 md:pb-6 pl-0 md:pl-48 px-3 md:px-5 lg:px-8 page-container pt-3">
            {children}
          </main>
          {/* Visitor counter — indie web classic */}
          <div className="hidden md:block fixed bottom-4 left-[196px] z-40">
            <VisitorCounter />
          </div>
          </AuthProvider>
        </ThemeProvider>
        <XpOverlay />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
