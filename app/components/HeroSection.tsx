//dummy Hero section to test performance  

// 'use client';

// export default function Hero() {
//   return (
//     <section className="relative -mt-px min-h-screen w-full bg-zinc-900 flex flex-col items-center justify-center">
//       <div className="max-w-4xl px-8 text-center">
//         <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
//           Hero Section
//         </h2>
//         <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
//           This section becomes visible once you scroll through the hero animation.
//         </p>
//       </div>
//     </section>
//   );
// }










// app/components/HeroSection.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';

const FRAME_COUNT = 123;
const FRAME_DIGITS = 3;

function padLeft(num: number, digits: number) {
  return String(num).padStart(digits, '0');
}

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  text1Ref: React.RefObject<HTMLDivElement>;
  text3Ref: React.RefObject<HTMLDivElement>;
}

export default function HeroSection({ heroRef, canvasRef, text1Ref, text3Ref }: HeroSectionProps) {
  const paths = useMemo(() => {
    const getSrc = (frameIndex: number) =>
      `/frames/frame_${padLeft(frameIndex + 1, FRAME_DIGITS)}.webp`;
    return { getSrc };
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

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

    preloadWindow(0, 12);
    for (let i = 0; i < Math.min(FRAME_COUNT, 40); i++) loadFrame(i);

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
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = Math.round(img.naturalWidth * scale);
      const dh = Math.round(img.naturalHeight * scale);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, Math.round((cw - dw) / 2), Math.round((ch - dh) / 2), dw, dh);
    };

    let lastDrawIdx = -1;
    let rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (lastDrawIdx !== -1 && frames[lastDrawIdx]) drawCover(frames[lastDrawIdx]!);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const findNearestReady = (idx: number) => {
      if (frameReady[idx]) return idx;
      for (let d = 1; d < 20; d++) {
        if (idx - d >= 0 && frameReady[idx - d]) return idx - d;
        if (idx + d < FRAME_COUNT && frameReady[idx + d]) return idx + d;
      }
      return -1;
    };

    const tick = (time: number) => {
      if (destroyed) return;

      const start = heroEl.offsetTop;
      const end = start + heroEl.offsetHeight - window.innerHeight;
      
      const globalLenis = (window as any).lenis;
      let currentScrollY = globalLenis?.scroll ?? window.scrollY;
      const targetScrollY = globalLenis?.targetScroll ?? currentScrollY;
      if (Math.abs(targetScrollY - currentScrollY) < 20) currentScrollY = targetScrollY;

      let t = clamp01((currentScrollY - start) / (end - start));
      t = Math.pow(t, 0.9); 
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(t * (FRAME_COUNT - 1)))
      );

      // Reveal 1: Fully visible at start, fades out
      if (text1Ref.current) {
        let op = 1;
        if (t > 0.05) op = Math.max(0, 1 - ((t - 0.05) / 0.2));
        text1Ref.current.style.opacity = op.toString();
        text1Ref.current.style.transform = `translateY(${(1 - op) * 20}px)`;
      }

      // Reveal 3: Fades in with the background color
      if (text3Ref.current) {
        let op = 0;
        if (t > 0.72) op = Math.min(1, (t - 0.72) / 0.15);
        text3Ref.current.style.opacity = op.toString();
        text3Ref.current.style.transform = `translateY(${(1 - op) * 20}px)`;
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
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [paths, heroRef, canvasRef, text1Ref, text3Ref]);

  return (
    <section ref={heroRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          
          {/* ── REVEAL 1 · Full-Viewport Cinematic Editorial ── */}
          <div
            ref={text1Ref}
            className="absolute inset-0 will-change-[opacity,transform] z-20 grid"
            style={{ opacity: 1, gridTemplateRows: 'auto 1fr auto' }}
          >
            {/* ── Layered vignettes for legibility ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  'linear-gradient(to top, rgba(8,6,4,0.97) 0%, rgba(8,6,4,0.72) 22%, rgba(8,6,4,0.12) 50%, transparent 68%)',
                  'linear-gradient(to right, rgba(8,6,4,0.5) 0%, rgba(8,6,4,0.1) 50%, transparent 72%)',
                ].join(', '),
              }}
            />

            {/* ROW 1 · Top info bar */}
            <div
              className="relative z-10 flex justify-between items-end px-8 md:px-14 pb-4"
              style={{ paddingTop: '5.5rem', borderBottom: '1px solid rgba(245,158,11,0.1)' }}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                    style={{ background: '#f59e0b' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: '#f59e0b' }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: '"DM Sans", "Inter", sans-serif',
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,239,230,0.5)',
                  }}
                >
                  Chennai, India
                </span>
              </div>

              <div
                className="hidden md:block flex-1 mx-10"
                style={{ height: '1px', background: 'rgba(245,158,11,0.1)' }}
              />
            </div>

            {/* ROW 2 · Main title area */}
            <div className="relative z-10 flex items-end px-8 md:px-14 pb-10 md:pb-14 overflow-hidden">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5 md:mb-7">
                  <span
                    className="block"
                    style={{ width: '28px', height: '1px', background: 'rgba(245,158,11,0.6)' }}
                  />
                  <span
                    style={{
                      fontFamily: '"DM Sans", "Inter", sans-serif',
                      fontSize: '9px',
                      fontWeight: 400,
                      letterSpacing: '0.44em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,158,11,0.72)',
                    }}
                  >
                    Architectural Woodwork
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    lineHeight: '0.87',
                    letterSpacing: '-0.025em',
                    margin: 0,
                  }}
                >
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(2.6rem, 6.5vw, 6.2rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'rgba(245,239,230,0.78)',
                      marginBottom: '0.04em',
                    }}
                  >
                    MSJ
                  </span>
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.03em',
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(245,158,11,0.58)',
                    }}
                  >
                    Door
                  </span>
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.03em',
                      color: '#F5EFE6',
                      textShadow: '0 4px 40px rgba(0,0,0,0.65)',
                    }}
                  >
                    Palace
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* ── REVEAL 3 · Polaroid Photo Reveal (With Color Fade In) ── */}
          <div
            ref={text3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 will-change-[opacity,transform] px-6"
            style={{ background: '#F7F5F0' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-10 bg-teal-900/50" />
              <p className="text-teal-900 text-[10px] tracking-[0.45em] uppercase font-semibold">Our Heritage</p>
              <span className="block h-px w-10 bg-teal-900/50" />
            </div>

            <div className="relative flex items-center justify-center w-full max-w-4xl" style={{ height: 'clamp(220px, 40vw, 320px)' }}>
              {/* Left polaroid */}
              <div
                className="absolute left-0 md:left-10 hidden sm:block"
                style={{ width: 'clamp(100px, 22vw, 208px)', transform: 'rotate(-6deg) translateY(12px)', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))' }}
              >
                <div className="rounded-sm p-2 md:p-3 pb-7 md:pb-9" style={{ background: '#f5efe0', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                  <div className="w-full aspect-square rounded-sm relative overflow-hidden">
                    <img
                      src="https://5.imimg.com/data5/ET/HJ/MY-15807347/bedroom-wooden-door-250x250.jpg"
                      alt="Bedroom Wooden Door"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col items-center">
                      <span className="text-teal-700/80 text-[8px] tracking-widest uppercase">Est.</span>
                      <span className="text-white font-bold" style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.2rem,4vw,1.875rem)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>1975</span>
                      <span className="text-teal-700/80 text-[8px] tracking-widest uppercase">Chennai</span>
                    </div>
                  </div>
                  <p className="text-center text-[9px] mt-2 font-medium" style={{ color: '#5c3d1e', fontFamily: 'Georgia,serif' }}>
                    Bedroom Wooden Doors
                  </p>
                </div>
              </div>

              {/* Centre polaroid */}
              <div
                className="relative"
                style={{ width: 'clamp(160px, 40vw, 272px)', zIndex: 10, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.85))' }}
              >
                <div className="rounded-sm p-3 md:p-4 pb-8 md:pb-11" style={{ background: '#f8f2e6', boxShadow: '0 16px 64px rgba(0,0,0,0.7)' }}>
                  <div className="w-full rounded-sm relative overflow-hidden" style={{ minHeight: 'clamp(130px, 28vw, 190px)' }}>
                    <img
                      src="https://5.imimg.com/data5/XG/PL/MY-15807347/designer-teak-wood-door-250x250.jpg"
                      alt="Designer Teak Wood Door"
                      className="w-full h-full object-cover absolute inset-0"
                      style={{ minHeight: 'clamp(130px, 28vw, 190px)' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.08) 55%)' }} />
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                      <span className="text-teal-800/90 text-[8px] tracking-[0.2em] uppercase font-semibold bg-black/40 px-2 py-0.5 rounded-full">Teak Wood</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 flex flex-col items-center" style={{ justifyContent: 'flex-end' }}>
                      <span className="text-white font-bold tracking-wide" style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1rem,4vw,1.5rem)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>MSJ</span>
                      <span className="text-teal-700 text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Georgia,serif' }}>Door Palace</span>
                      <div className="flex gap-1.5 mt-1">
                        {[0,1,2].map(i => <span key={i} className="w-1 h-1 rounded-full bg-teal-800/70 block" />)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-[11px] font-semibold" style={{ color: '#4a2c0a', fontFamily: 'Georgia,serif' }}>Designer Teak Doors</p>
                    <p className="text-[9px]" style={{ color: '#8b6040' }}>Anna Nagar · Mylapore · Perambur</p>
                  </div>
                </div>
              </div>

              {/* Right polaroid */}
              <div
                className="absolute right-0 md:right-10 hidden sm:block"
                style={{ width: 'clamp(100px, 22vw, 208px)', transform: 'rotate(5deg) translateY(16px)', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))' }}
              >
                <div className="rounded-sm p-2 md:p-3 pb-7 md:pb-9" style={{ background: '#E8DECE', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                  <div className="w-full aspect-square rounded-sm relative overflow-hidden">
                    <img
                      src="https://5.imimg.com/data5/LM/OK/MY-15807347/exterior-carved-door-250x250.jpg"
                      alt="Exterior Carved Door"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%)' }} />
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                      <span className="text-teal-700/80 text-[8px] tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded-full">Carved</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col items-center">
                      <div className="border border-amber-200/50 rounded-full w-6 h-6 flex items-center justify-center mb-1">
                        <span className="text-teal-700 text-xs">✦</span>
                      </div>
                      <span className="text-teal-700/90 text-[8px] tracking-wider uppercase">South India</span>
                    </div>
                  </div>
                  <p className="text-center text-[9px] mt-2 font-medium" style={{ color: '#5c3d1e', fontFamily: 'Georgia,serif' }}>
                    Exterior Carved Doors
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-8">
              {[
                { val: '50+', label: 'Years' },
                { val: '3', label: 'Locations' },
                { val: '100%', label: 'Natural Wood' },
                { val: 'Leading', label: 'South India' },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-3 md:gap-8">
                  <div className="text-center">
                    <p className="text-teal-800 text-xl md:text-4xl font-bold drop-shadow-lg" style={{ fontFamily: 'Georgia,serif', textShadow: '0 2px 12px rgba(10,26,24,0.2)' }}>{s.val}</p>
                    <p className="text-teal-900/45 text-[9px] md:text-sm tracking-wider md:tracking-widest uppercase mt-0.5 font-medium">{s.label}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-teal-900/50 text-lg md:text-2xl font-thin">|</span>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}