'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 8;

export function FloatingDecorations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('span');
      particle.className = 'float-particle';
      particle.style.setProperty('--dur', `${8 + Math.random() * 14}s`);
      particle.style.setProperty('--delay', `${Math.random() * 8}s`);
      particle.style.setProperty('--size', `${6 + Math.random() * 8}px`);
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
    }
  }, []);

  return <div ref={containerRef} className="floating-particles" aria-hidden="true" />;
}
