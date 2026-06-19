'use client';

import { useIsMobile } from '@/lib/useIsMobile';
import { BottomTabBar } from '@/components/mobile/BottomTabBar';
import { MobilePageContainer } from '@/components/mobile/MobilePageContainer';

export function MobileAppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--bg-base)]">
      <MobilePageContainer>{children}</MobilePageContainer>
      <BottomTabBar />
    </div>
  );
}
