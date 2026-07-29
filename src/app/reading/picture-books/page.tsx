'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PicBooksRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/reading'); }, [router]);
  return null;
}
