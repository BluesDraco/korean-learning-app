import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';

import { AppShell } from '@/components/AppShell';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { FontProvider } from '@/components/FontProvider';
import { PageViewTracker } from '@/components/PageViewTracker';

const FloatingDecorations = dynamic(() => import('@/components/FloatingDecorations').then((m) => ({ default: m.FloatingDecorations })), { ssr: false });
const XpOverlay = dynamic(() => import('@/components/XpOverlay').then((m) => ({ default: m.XpOverlay })), { ssr: false });
const FeedbackButton = dynamic(() => import('@/components/FeedbackButton').then((m) => ({ default: m.FeedbackButton })), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
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
          <FloatingDecorations />
          <PageViewTracker />
          <AppShell>{children}</AppShell>
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
