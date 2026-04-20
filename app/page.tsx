'use client';

import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

const FRAME_COUNT = 216;
const FRAME_DIGITS = 4;

// Helper to format frame numbers (1 -> 0001)
function padLeft(num: number, digits: number) {
  return String(num).padStart(digits, '0');
}

// Helper to calculate fade in/out based on the scroll progress 't'
function calculateOpacity(t: number, start: number, peak: number, end: number) {
  if (t < start || t > end) return 0;
  if (t <= peak) return (t - start) / (peak - start); // Fading in
  return 1 - ((t - peak) / (end - peak)); // Fading out
}

export default function HeroFramesScroll() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for our text elements to update DOM directly without React re-renders
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

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

    // --- BUG FIX: Moved variable declarations above the resize function ---
    let lastDrawIdx = -1;
    let rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Now this works perfectly because lastDrawIdx exists
      if (lastDrawIdx !== -1 && frames[lastDrawIdx]) {
        drawCover(frames[lastDrawIdx]!);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const findNearestReady = (idx: number) => {
      if (frameReady[idx]) return idx;
      for (let d = 1; d < 20; d++) {
        if (frameReady[idx - d]) return idx - d;
        if (frameReady[idx + d]) return idx + d;
      }
      return -1;
    };

    const tick = (time: number) => {
      if (destroyed) return;

      lenis.raf(time);

      const start = heroEl.offsetTop;
      const end = start + heroEl.offsetHeight - window.innerHeight;

      let currentScrollY = lenis.scroll ?? window.scrollY;
      const targetScrollY = lenis.targetScroll ?? currentScrollY;

      // The Resting Snap
      if (Math.abs(targetScrollY - currentScrollY) < 20) {
        currentScrollY = targetScrollY;
      }

      // t represents the scroll progress from 0.0 to 1.0
      const t = clamp01((currentScrollY - start) / (end - start));
      const frameIndex = Math.round(t * (FRAME_COUNT - 1));

      // --- TEXT ANIMATION LOGIC ---
      if (text1Ref.current) {
        const op1 = calculateOpacity(t, 0, 0.15, 0.3);
        text1Ref.current.style.opacity = op1.toString();
        text1Ref.current.style.transform = `translateY(${(1 - op1) * 20}px)`; 
      }
      if (text2Ref.current) {
        const op2 = calculateOpacity(t, 0.35, 0.5, 0.65);
        text2Ref.current.style.opacity = op2.toString();
        text2Ref.current.style.transform = `translateY(${(1 - op2) * 20}px)`;
      }
      if (text3Ref.current) {
        const op3 = calculateOpacity(t, 0.7, 0.85, 0.95);
        text3Ref.current.style.opacity = op3.toString();
        text3Ref.current.style.transform = `translateY(${(1 - op3) * 20}px)`;
      }

      preloadWindow(frameIndex, 16);

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
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Canvas Background */}
          <div className="absolute inset-0 z-0">
            <canvas ref={canvasRef} className="w-full h-full object-cover transition-filters duration-75" />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40"/>
          </div>

          {/* Text Overlays */}
          <div className="relative z-10 text-center px-6 max-w-5xl w-full pointer-events-none">
            
            {/* Text 1 */}
            <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 will-change-[opacity,transform]">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                Solid Foundations.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 drop-shadow-md">
                Engineering the infrastructure of tomorrow, from the ground up.
              </p>
            </div>

            {/* Text 2 */}
            <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 will-change-[opacity,transform]">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                Uncompromising Precision.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 drop-shadow-md">
                Every beam, every weld, exacted to the millimeter.
              </p>
            </div>

            {/* Text 3 */}
            <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 will-change-[opacity,transform]">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                Built to Endure.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 drop-shadow-md">
                Creating legacies in steel and concrete that outlast generations.
              </p>
            </div>

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