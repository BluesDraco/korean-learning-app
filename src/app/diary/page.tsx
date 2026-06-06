'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DiaryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/mine/diary');
  }, [router]);

  return null;
}
