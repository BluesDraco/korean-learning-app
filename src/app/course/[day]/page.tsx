'use client';

import { Suspense, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';
import LessonEngine from '@/components/lesson/LessonEngine';

function CourseDayContent() {
  const { day } = useParams<{ day: string }>();
  const searchParams = useSearchParams();
  const dayNum = parseInt(day, 10);
  const course = useMemo(() => thirtyDayCourse[dayNum - 1], [dayNum]);
  const source = (searchParams.get('source') as 'daily' | 'course') || 'course';

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
