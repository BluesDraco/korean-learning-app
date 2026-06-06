'use client';

import { useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { playClick, playSuccess, playError, playComplete } from '@/lib/soundManager';

export function useFeedback() {
  const { showToast } = useToast();

  const click = useCallback(() => playClick(), []);

  const success = useCallback((message: string) => {
    playSuccess();
    showToast(message, 'success');
  }, [showToast]);

  const error = useCallback((message: string) => {
    playError();
    showToast(message, 'error');
  }, [showToast]);

  const info = useCallback((message: string) => {
    showToast(message, 'info');
  }, [showToast]);

  const complete = useCallback((message?: string) => {
    playComplete();
    if (message) showToast(message, 'success');
  }, [showToast]);

  return { click, success, error, info, complete };
}
