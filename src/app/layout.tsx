import type { Metadata, Viewport } from 'next';
import './globals.css';

import { AppShell } from '@/components/AppShell';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { FontProvider } from '@/components/FontProvider';
import { LangProvider } from '@/components/LangProvider';
import { PageViewTracker } from '@/components/PageViewTracker';
import { XpOverlay } from '@/components/XpOverlay';
import { FeedbackButton } from '@/components/FeedbackButton';
import { ToastProvider } from '@/hooks/useToast';
import { ToriToastContainer } from '@/components/ToriToast';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: '토리的 韩语日记',
  description: '用喜欢的内容学韩语 — KPOP、韩娱热点、绘本、韩剧表达',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '토리的 韩语日记',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFBF7',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Polyfills for older Chromium browsers (Baidu, 360, etc.) */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              if(typeof globalThis==='undefined'){try{Object.defineProperty(Object.prototype,'__magic__',{get:function(){return this},configurable:true});__magic__.globalThis=__magic__;delete Object.prototype.__magic__;}catch(e){window.globalThis=window;}}
              if(typeof queueMicrotask!=='function'){var p=Promise.resolve();window.queueMicrotask=function(fn){p.then(fn);};}
              if(typeof Promise.allSettled!=='function'){Promise.allSettled=function(ps){return Promise.all(ps.map(function(p){return Promise.resolve(p).then(function(v){return{status:'fulfilled',value:v}},function(e){return{status:'rejected',reason:e}})}));};}
              if(typeof Promise.any!=='function'){Promise.any=function(ps){return new Promise(function(res,rej){var n=ps.length;if(!n){rej(new Error('All promises were rejected'));return;}var errs=[];ps.forEach(function(p,i){Promise.resolve(p).then(res,function(e){errs[i]=e;if(--n===0)rej(new Error('All promises were rejected: '+errs.join(', ')));});});});};}
            } catch(e) {}
          })();
        `}} />
        {/* Anti-FOUC: apply font settings before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('font-settings'));if(s){var d=document.documentElement;if(s.preset)d.setAttribute('data-font',s.preset);if(s.size)d.setAttribute('data-font-size',s.size)}}catch(e){}})()`,
          }}
        />
        {/* Anti-FOUC: apply theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('flashcard-theme');var valid=['warm','dark','paper','pure'];if(t&&valid.indexOf(t)!==-1){document.documentElement.setAttribute('data-fc-theme',t)}else{document.documentElement.setAttribute('data-fc-theme','pure')}}catch(e){document.documentElement.setAttribute('data-fc-theme','pure')}})()`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased page-corner-bunny">
        <ThemeProvider>
          <FontProvider>
          <LangProvider>
          <AuthProvider>
          <ToastProvider>
          <PageViewTracker />
          <AppShell>{children}</AppShell>
          <ToriToastContainer />
          </ToastProvider>
          </AuthProvider>
          </LangProvider>
          </FontProvider>
        </ThemeProvider>
        <XpOverlay />
        <FeedbackButton />
        <ScrollToTop />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){caches.keys().then(function(keys){keys.filter(function(k){return k!=='korean-learn-v8'}).forEach(function(k){caches.delete(k)})});navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
