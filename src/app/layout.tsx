import type { Metadata, Viewport } from 'next';
import './globals.css';

import { AppShell } from '@/components/AppShell';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { FontProvider } from '@/components/FontProvider';
import { LangProvider } from '@/components/LangProvider';
import { ToastProvider } from '@/hooks/useToast';
import { ToriToastContainer } from '@/components/ToriToast';
import { LazyLayoutComponents } from '@/components/LazyLayoutComponents';

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
        {/* Preconnect/dns-prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="//torikorean.com" />
        <link rel="preconnect" href="https://torikorean.com" />
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
        {/* 维护公告弹窗 */}
        <div id="maintenance-overlay" style={{position:'fixed',inset:0,zIndex:99999,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
          <div style={{background:'#fffbf7',borderRadius:'20px',padding:'32px 28px',maxWidth:'360px',width:'100%',textAlign:'center',boxShadow:'0 8px 40px rgba(0,0,0,0.18)'}}>
            <div style={{fontSize:'40px',marginBottom:'16px'}}>🔧</div>
            <div style={{fontSize:'20px',fontWeight:'800',color:'#241917',marginBottom:'12px',lineHeight:'1.4'}}>系统升级中</div>
            <div style={{fontSize:'15px',color:'#5a4640',lineHeight:'1.7',marginBottom:'16px'}}>
              目前网站正在进行<strong>用户数据库升级</strong>及<strong>服务器扩容</strong>，预计很快恢复上线。
            </div>
            <div style={{background:'#fff0f5',borderRadius:'12px',padding:'12px 16px',marginBottom:'20px'}}>
              <div style={{fontSize:'14px',fontWeight:'700',color:'#ff7fa8',marginBottom:'4px'}}>⚠️ 暂时无法登录</div>
              <div style={{fontSize:'13px',color:'#89756e',lineHeight:'1.6'}}>升级期间暂时无法登录，请稍后再来。</div>
            </div>
            <div style={{fontSize:'13px',color:'#89756e'}}>torikorean.com</div>
          </div>
        </div>
        <ThemeProvider>
          <FontProvider>
          <LangProvider>
          <AuthProvider>
          <ToastProvider>
          <AppShell>{children}</AppShell>
          <ToriToastContainer />
          </ToastProvider>
          </AuthProvider>
          </LangProvider>
          </FontProvider>
        </ThemeProvider>
        <LazyLayoutComponents />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){caches.keys().then(function(keys){keys.filter(function(k){return k!=='korean-learn-v8'}).forEach(function(k){caches.delete(k)})});navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
