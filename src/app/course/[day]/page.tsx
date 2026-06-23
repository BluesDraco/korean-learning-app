'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import LessonEngine from '@/components/lesson/LessonEngine';

function CourseDayContent() {
  const { day } = useParams<{ day: string }>();
  const searchParams = useSearchParams();
  const dayNum = parseInt(day, 10);
  const [course, setCourse] = useState<DailyCourse | null | undefined>(undefined);
  const source = (searchParams.get('source') as 'daily' | 'course') || 'course';

  useEffect(() => {
    let cancelled = false;
    import('@/data/thirtyDayCourse').then((m) => {
      if (!cancelled) setCourse(m.thirtyDayCourse[dayNum - 1] ?? null);
    });
    return () => { cancelled = true; };
  }, [dayNum]);

  if (course === undefined) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[var(--pink-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[var(--text-muted)]">未找到该课程</p>
      </div>
    );
  }

  return <LessonEngine course={course} dayNum={dayNum} source={source} />;
}

export default function DailyCoursePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[var(--pink-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CourseDayContent />
    </Suspense>
  );
}
