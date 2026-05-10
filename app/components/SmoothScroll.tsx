'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with "Editorial Luxe" settings
    const lenis = new Lenis({
      duration: 1.5,      // Slightly longer duration for smoother glides
      lerp: 0.1,          // Lower lerp (0.1) creates a much smoother "floaty" feel
      smoothWheel: true,
      
      // MOBILE FIX: Disable syncTouch to let the device handle 
      // scrolling via hardware acceleration.
      syncTouch: false,   
      touchMultiplier: 1.5,
      
      // Easing function for that premium architectural site feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Attach to window for global access (useful for your Hero component)
    (window as any).lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}