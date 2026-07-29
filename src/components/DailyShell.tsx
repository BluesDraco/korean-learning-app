import React from 'react';

interface DailyShellProps {
  main: React.ReactNode;
  aside?: React.ReactNode;
}

export function DailyShell({ main, aside }: DailyShellProps) {
  return (
    <div className="lg:flex lg:gap-6 lg:pr-6 xl:pr-10 py-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="flex-1 min-w-0 space-y-4">
        {main}
      </div>
      {aside && (
        <aside className="hidden lg:flex flex-col gap-4 w-[240px] shrink-0 pt-0">
          {aside}
        </aside>
      )}
    </div>
  );
}
