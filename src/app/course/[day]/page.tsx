'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';
import LessonEngine from '@/components/lesson/LessonEngine';

export default function DailyCoursePage() {
  const { day } = useParams<{ day: string }>();
  const dayNum = parseInt(day, 10);
  const course = useMemo(() => thirtyDayCourse[dayNum - 1], [dayNum]);

  if (!course) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-[var(--text-muted)]">未找到该课程</p>
      </div>
    );
  }

  return <LessonEngine course={course} dayNum={dayNum} />;
}
