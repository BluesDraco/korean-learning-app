import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

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
          <Navbar />
          <main className="pb-16 md:pb-6 pl-0 md:pl-48 px-3 md:px-5 lg:px-8 page-container">
            {children}
          </main>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
