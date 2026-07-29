'use client';

import dynamic from 'next/dynamic';

const PageViewTracker = dynamic(() => import('@/components/PageViewTracker').then(m => m.PageViewTracker).catch(() => () => null), { ssr: false });
const XpOverlay = dynamic(() => import('@/components/XpOverlay').then(m => m.XpOverlay).catch(() => () => null), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop').then(m => m.default).catch(() => () => null), { ssr: false });
const AddToHomeScreen = dynamic(() => import('@/components/AddToHomeScreen').then(m => m.AddToHomeScreen).catch(() => () => null), { ssr: false });

export function LazyLayoutComponents() {
  return (
    <>
      <PageViewTracker />
      <XpOverlay />
      <ScrollToTop />
      <AddToHomeScreen />
    </>
  );
}
