import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { VisitorCounter } from '@/components/VisitorCounter';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { AuthProvider } from '@/components/AuthProvider';
import { FontProvider } from '@/components/FontProvider';
import { XpOverlay } from '@/components/XpOverlay';
import { FeedbackButton } from '@/components/FeedbackButton';
import { PageViewTracker } from '@/components/PageViewTracker';
import ScrollToTop from '@/components/ScrollToTop';

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
        {/* Anti-FOUC: apply font settings before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('font-settings'));if(s){var d=document.documentElement;if(s.preset)d.setAttribute('data-font',s.preset);if(s.size)d.setAttribute('data-font-size',s.size)}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased page-corner-bunny">
        <ThemeProvider>
          <FontProvider>
          <AuthProvider>
          {/* Floating decorative particles */}
          <FloatingDecorations />
          {/* Beta notice banner */}
          <div className="fixed top-0 left-0 right-0 z-[60] md:left-52 bg-gradient-to-r from-[#FFF5EE] via-[#FFF0F5] to-[#FFF5EE] border-b-2 border-dashed border-pink-200 py-1.5 text-center">
            <span className="text-sm font-bold tracking-widest bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] bg-clip-text text-transparent" style={{ fontFamily: "'ZCOOL KuaiLe', cursive" }}>🐰 内测阶段，全功能免费体验 · 正式版即将上线</span>
          </div>
          {/* Offset for marquee banner */}
          <div className="h-[44px]" />
          <PageViewTracker />
          <Navbar />
          <main className="pb-16 md:pb-6 pl-0 md:pl-52 px-3 md:px-5 lg:px-8 page-container pt-3">
            {children}
          </main>
          {/* Visitor counter — indie web classic */}
          <div className="hidden md:block fixed bottom-4 left-[212px] z-40">
            <VisitorCounter />
          </div>
          </AuthProvider>
          </FontProvider>
        </ThemeProvider>
        <XpOverlay />
        <FeedbackButton />
        <ScrollToTop />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
