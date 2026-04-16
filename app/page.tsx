'use client';

import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

const FRAME_COUNT = 216;
const FRAME_DIGITS = 4;

// Helper to format frame numbers (1 -> 0001)
function padLeft(num: number, digits: number) {
  return String(num).padStart(digits, '0');
}

export default function HeroFramesScroll() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paths = useMemo(() => {
    const getSrc = (frameIndex: number) => {
      return `/frames/frame_${padLeft(frameIndex + 1, FRAME_DIGITS)}.webp`;
    };
    return { getSrc };
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let destroyed = false;

    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const frameReady: boolean[] = new Array(FRAME_COUNT).fill(false);
    const requested: boolean[] = new Array(FRAME_COUNT).fill(false);

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    const loadFrame = (idx: number) => {
      if (requested[idx] || idx < 0 || idx >= FRAME_COUNT) return;
      requested[idx] = true;

      const img = new Image();
      img.decoding = 'async';
      img.src = paths.getSrc(idx);
      frames[idx] = img;

      const markReady = () => {
        if (destroyed) return;
        frameReady[idx] = true;
        if (idx === 0) drawCover(img);
      };

      img.onload = markReady;
      img.decode?.().then(markReady).catch(() => {});
    };

    const preloadWindow = (center: number, radius: number) => {
      for (let d = -radius; d <= radius; d++) {
        const i = center + d;
        if (i >= 0 && i < FRAME_COUNT) loadFrame(i);
      }
    };

    // Initial preload
    preloadWindow(0, 12);
    for (let i = 0; i < Math.min(FRAME_COUNT, 40); i++) loadFrame(i);

    // Background preload
    const scheduleBackgroundPreload = () => {
      const run = () => {
        if (destroyed) return;
        for (let i = 0; i < FRAME_COUNT; i++) loadFrame(i);
      };
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(run);
      } else {
        setTimeout(run, 300);
      }
    };
    scheduleBackgroundPreload();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      
      const dw = Math.round(iw * scale);
      const dh = Math.round(ih * scale);
      const dx = Math.round((cw - dw) / 2);
      const dy = Math.round((ch - dh) / 2);

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const findNearestReady = (idx: number) => {
      if (frameReady[idx]) return idx;
      for (let d = 1; d < 20; d++) {
        if (frameReady[idx - d]) return idx - d;
        if (frameReady[idx + d]) return idx + d;
      }
      return -1;
    };

    let lastDrawIdx = -1;
    let rafId = 0;

    const tick = (time: number) => {
      if (destroyed) return;

      lenis.raf(time);

      const start = heroEl.offsetTop;
      const end = start + heroEl.offsetHeight - window.innerHeight;

      let currentScrollY = lenis.scroll ?? window.scrollY;
      const targetScrollY = lenis.targetScroll ?? currentScrollY;

      // THE FIX: The Resting Snap
      // If the smoothed scroll is within 20px of the physical wheel target, 
      // instantly snap the frame calculation to the target.
      // This kills the 1-by-1 creeping effect at the tail end of a slow stop.
      if (Math.abs(targetScrollY - currentScrollY) < 20) {
        currentScrollY = targetScrollY;
      }

      const t = clamp01((currentScrollY - start) / (end - start));
      const frameIndex = Math.round(t * (FRAME_COUNT - 1));

      preloadWindow(frameIndex, 16);

      // Dynamic Velocity Blur (hides sub-pixel jumps during fast scrolls)
     

      const drawIdx = findNearestReady(frameIndex);

      if (drawIdx !== -1 && drawIdx !== lastDrawIdx) {
        lastDrawIdx = drawIdx;
        drawCover(frames[drawIdx]!);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      lenis.destroy();
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [paths]);

  return (
    <main>
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[400vh] w-full bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          <div className="absolute inset-0">
            <canvas ref={canvasRef} className="w-full h-full transition-filters duration-75" />
            
            {/* Dark Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10"/>

          </div>

          <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
              Dreamwalk Studio
            </h1>
          </div>

        </div>
      </section>

      {/* NEXT SECTION UI */}
      <section className="relative -mt-px min-h-screen w-full bg-zinc-900 flex flex-col items-center justify-center">
        <div className="max-w-6xl px-8 text-center">
          
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Designed for Immersive Experiences
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
            Scroll-driven storytelling powered by high-performance rendering,
            optimized assets, and smooth interaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-zinc-800/60 backdrop-blur-md p-6 rounded-2xl border border-zinc-700 hover:border-white/20 transition">
              <h3 className="text-white text-xl font-semibold mb-3">Smooth Scroll</h3>
              <p className="text-zinc-400 text-sm">
                Lenis-powered motion ensures fluid, natural scrolling across devices.
              </p>
            </div>

            <div className="bg-zinc-800/60 backdrop-blur-md p-6 rounded-2xl border border-zinc-700 hover:border-white/20 transition">
              <h3 className="text-white text-xl font-semibold mb-3">Optimized Frames</h3>
              <p className="text-zinc-400 text-sm">
                Efficient WebP sequences deliver high quality without performance loss.
              </p>
            </div>

            <div className="bg-zinc-800/60 backdrop-blur-md p-6 rounded-2xl border border-zinc-700 hover:border-white/20 transition">
              <h3 className="text-white text-xl font-semibold mb-3">Canvas Rendering</h3>
              <p className="text-zinc-400 text-sm">
                GPU-friendly rendering eliminates DOM overhead and ensures stability.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}