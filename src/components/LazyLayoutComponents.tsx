'use client';

import dynamic from 'next/dynamic';

const PageViewTracker = dynamic(() => import('@/components/PageViewTracker').then(m => m.PageViewTracker).catch(() => () => null), { ssr: false });
const XpOverlay = dynamic(() => import('@/components/XpOverlay').then(m => m.XpOverlay).catch(() => () => null), { ssr: false });
const FeedbackButton = dynamic(() => import('@/components/FeedbackButton').then(m => m.FeedbackButton).catch(() => () => null), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop').then(m => m.default).catch(() => () => null), { ssr: false });

export function LazyLayoutComponents() {
  return (
    <>
      <PageViewTracker />
      <XpOverlay />
      <FeedbackButton />
      <ScrollToTop />
    </>
  );
}
