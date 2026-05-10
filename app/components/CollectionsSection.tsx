// app/components/CollectionsSection.tsx


// export default function Hero() {
//   return (
//     <section className="relative -mt-px min-h-screen w-full bg-zinc-900 flex flex-col items-center justify-center">
//       <div className="max-w-4xl px-8 text-center">
//         <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
//           Collection Section
//         </h2>
//         <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
//           This section becomes visible once you scroll through the hero animation.
//         </p>
//       </div>
//     </section>
//   );
// }







'use client';

import { useState, useRef, useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'rotation-per-second'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'environment-image'?: string;
        'disable-zoom'?: boolean;
      }, HTMLElement>;
    }
  }
}

interface CollectionsSectionProps {
  modelContainerRef: React.RefObject<HTMLDivElement>;
}

export default function CollectionsSection({ modelContainerRef }: CollectionsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomUnlocked, setZoomUnlocked] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const collectionModels = [
    { n: '01', tag: 'Heritage Woodcraft', title: 'Ornate Floral\nCarved Panel', src: '/models/Meshy_AI_Ornate_Floral_Carved__0418225405_texture.glb', desc: 'A richly detailed floral wood carving — each petal traced from vernacular motifs found in South Indian temple joinery.' },
    { n: '02', tag: 'Devotional Sculpture', title: 'Ganesha\nWood Carving', src: '/models/Meshy_AI_Ganesha_Wood_Carving__0421212219_texture.glb', desc: 'A devotional Ganesha figure carved in hardwood, bridging traditional sculptural canon with 3D modelling workflows.' },
    { n: '03', tag: 'Entrance Architecture', title: 'Ornate Carved\nDouble Door', src: '/models/Meshy_AI_Ornate_Carved_Double__0421205408_texture.glb', desc: 'Referencing Chettinad palace entrances — where material craft and spatial transition converge into a singular gesture.' },
    { n: '04', tag: 'Decorative Element', title: 'Ornate Carved\nWooden Screen', src: '/models/Meshy_AI_Ornate_Carved_Wooden__0421210748_texture.glb', desc: 'A perforated carved wooden screen inspired by the jali tradition — mediating light, air, and vision.' },
    { n: '05', tag: 'Interior Architecture', title: 'Modern Wooden\nInterior Study', src: '/models/Meshy_AI_modern_wooden_interio_0421210214_texture.glb', desc: 'Exploring how exposed timber joinery and controlled natural light create environments that are restrained yet deeply textured.' },
    { n: '06', tag: 'Parametric Form', title: 'Faceted Diamond\nWood Object', src: '/models/Meshy_AI_Faceted_Diamond_Wood__0418201002_texture.glb', desc: 'A crystalline wooden volume resolved from a single algorithmic fold system — bridging parametric design with natural wood.' },
    { n: '07', tag: 'Metalwork Study', title: 'Ornate Iron\nRailing', src: '/models/Meshy_AI_Ornate_Iron_Railing_0423191024_texture.glb', desc: 'Drawing from colonial-era Madras bungalow balustrades — the railing as architectural calligraphy in wrought iron.' },
  ];

  useEffect(() => {
    const script = document.querySelector('script[src*="model-viewer"]');
    if (!script) {
      const newScript = document.createElement('script');
      newScript.type = 'module';
      newScript.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
      document.head.appendChild(newScript);
    }
  }, []);

  useEffect(() => {
    const el = modelContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (zoomUnlocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleMouseEnter = () => {
      if (zoomUnlocked && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    };

    const handleMouseLeave = () => {
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    if (!zoomUnlocked && (window as any).lenis) {
      (window as any).lenis.start();
    }

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [zoomUnlocked, modelContainerRef]);

  const changeSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setDescExpanded(false);
    setZoomUnlocked(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); 
  };

  const handleNext = () => changeSlide((currentSlide + 1) % collectionModels.length);
  const handlePrev = () => changeSlide((currentSlide - 1 + collectionModels.length) % collectionModels.length);

  return (
    <div id="collections" className="relative pt-12 md:pt-20 pb-16" style={{ scrollMarginTop: '80px', background: '#F7F5F0', color: '#1C1B1A' }}>
      
      <div className="max-w-[110rem] mx-auto px-5 md:px-10 xl:px-16">
        
        <div className="coll-master-grid">
          
          {/* LEFT COLUMN: Info & Navigation */}
          <div className="coll-left-col">
            
            <div className="coll-header" data-3d-reveal="slide-left" style={{ '--delay': '0s' } as React.CSSProperties}>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 0.9,
                color: '#1C1B1A',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}>
                Our<br className="hidden md:block" /> Collections
              </h2>
            </div>

            <div className="coll-info-content">
              <div className={`transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'}`}>
                <p className="coll-tag">{collectionModels[currentSlide].tag}</p>
                <h3 className="coll-title">{collectionModels[currentSlide].title}</h3>
                
                <div className="coll-desc-wrap">
                  <p className={`coll-desc ${!descExpanded ? 'line-clamp-2 md:line-clamp-none' : ''}`}>
                    {collectionModels[currentSlide].desc}
                  </p>
                  <button 
                    className="coll-read-more md:hidden"
                    onClick={() => setDescExpanded(!descExpanded)}
                  >
                    {descExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>

            <div className="coll-nav-controls">
              <div className="coll-counter">
                <span className="coll-counter-current">{collectionModels[currentSlide].n}</span>
                <span className="coll-counter-sep">/</span>
                <span className="coll-counter-total">{String(collectionModels.length).padStart(2, '0')}</span>
              </div>

              <div className="coll-dots hidden sm:flex">
                {collectionModels.map((_, i) => (
                  <button
                    key={i}
                    className={`coll-dot ${i === currentSlide ? 'coll-dot-active' : ''}`}
                    onClick={() => changeSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="coll-arrows">
                <button onClick={handlePrev} className="coll-arrow-btn" aria-label="Previous model">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <button onClick={handleNext} className="coll-arrow-btn" aria-label="Next model">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Huge 3D Model Area */}
          <div className="coll-model-area" ref={modelContainerRef}>
            {/* FIX: Changed 'w-full h-full' to 'absolute inset-0' to force 
              the container to stretch perfectly regardless of iOS/Safari flexbox quirks 
            */}
            <div className={`absolute inset-0 transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {/* @ts-ignore */}
              <model-viewer
                key={collectionModels[currentSlide].src}
                src={collectionModels[currentSlide].src}
                alt={collectionModels[currentSlide].title.replace('\n', ' ')}
                camera-controls
                auto-rotate
                rotation-per-second="20deg"
                shadow-intensity="1.5"
                exposure="1.1"
                environment-image="neutral"
                disable-zoom={!zoomUnlocked || undefined}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            <button
              onClick={() => setZoomUnlocked(prev => !prev)}
              className="coll-zoom-toggle"
              title={zoomUnlocked ? 'Lock scroll zoom' : 'Unlock scroll zoom'}
            >
              {zoomUnlocked ? (
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                </svg>
              ) : (
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              )}
              <span className="hidden md:inline">{zoomUnlocked ? 'Zoom On' : 'Zoom Locked'}</span>
            </button>

            <div className="coll-model-badge">
              <span className="font-semibold text-[#1C1B1A]">AUTO ROTATE ON</span>
              <span className="hidden md:inline">· Interactive 3D</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* --- HIDE DEFAULT MODEL-VIEWER LOADER --- */
        model-viewer {
          --poster-color: transparent;
        }
        model-viewer::part(default-progress-bar) {
          display: none;
        }
        model-viewer::part(default-progress-mask) {
          display: none;
        }

        /* ── Desktop Master Layout ── */
        .coll-master-grid {
          display: grid;
          grid-template-columns: 30% 1fr;
          gap: 6vw;
          align-items: stretch;
          min-height: 700px;
        }

        .coll-left-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 1rem;
          padding-bottom: 2rem;
        }

        .coll-header { margin-bottom: 3rem; }

        .coll-info-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .coll-tag {
          font-size: 0.75rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(28,27,26,0.5);
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .coll-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 400;
          color: #1C1B1A;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
          white-space: pre-line;
        }

        .coll-desc-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .coll-desc {
          color: rgba(28,27,26,0.7);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 440px;
        }

        .coll-read-more {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1C1B1A;
          border-bottom: 1px solid rgba(28,27,26,0.3);
          padding-bottom: 2px;
          cursor: pointer;
        }

        .coll-nav-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(28,27,26,0.1);
          margin-top: 2rem;
        }

        .coll-counter {
          font-family: 'Playfair Display', Georgia, serif;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .coll-counter-current { font-size: 2.4rem; color: #1C1B1A; line-height: 1; }
        .coll-counter-sep { color: rgba(28,27,26,0.3); font-size: 1.2rem; }
        .coll-counter-total { font-size: 1.2rem; color: rgba(28,27,26,0.5); }
        
        .coll-dots { gap: 10px; }
        .coll-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(28,27,26,0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .coll-dot-active { background: #1C1B1A; border-color: #1C1B1A; transform: scale(1.6); }

        .coll-arrows { display: flex; gap: 10px; }
        .coll-arrow-btn {
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(28,27,26,0.15);
          color: #1C1B1A;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .coll-arrow-btn:hover {
          background: #1C1B1A; color: #F7F5F0; border-color: #1C1B1A;
          transform: scale(1.05);
        }

        /* ── Right Column (3D Canvas) ── */
        .coll-model-area {
          position: relative;
          background: radial-gradient(circle at center, rgba(28,27,26,0.04) 0%, rgba(28,27,26,0.01) 100%);
          border: 1px solid rgba(28,27,26,0.06);
          border-radius: 6px;
          height: 100%; /* Explicit height added */
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .coll-zoom-toggle {
          position: absolute; top: 20px; right: 20px;
          display: flex; align-items: center; gap: 6px;
          padding: 10px 16px;
          border-radius: 30px;
          background: rgba(247,245,240,0.85);
          border: 1px solid rgba(28,27,26,0.08);
          backdrop-filter: blur(8px);
          color: #1C1B1A;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s ease; z-index: 10;
          box-shadow: 0 4px 12px rgba(28,27,26,0.05);
        }
        .coll-zoom-toggle:hover { background: #1C1B1A; color: #F7F5F0; }

        .coll-model-badge {
          position: absolute; bottom: 20px; left: 20px;
          background: rgba(247,245,240,0.85);
          border: 1px solid rgba(28,27,26,0.08);
          padding: 10px 16px; border-radius: 6px;
          backdrop-filter: blur(8px);
          pointer-events: none;
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.15em; color: rgba(28,27,26,0.5);
          display: flex; gap: 8px;
          box-shadow: 0 4px 12px rgba(28,27,26,0.05);
          z-index: 10;
        }

        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 1024px) {
          .coll-master-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          
          .coll-left-col { display: contents; }

          .coll-header { order: 1; margin-bottom: 1.5rem; }
          
          /* FIXED: Used explicit 55vh height so the model doesn't collapse */
          .coll-model-area { 
            order: 2; 
            width: 100%; 
            height: 55vh; 
            min-height: 400px; 
            margin-bottom: 2rem; 
            border-radius: 4px; 
          }
          
          .coll-info-content { order: 3; margin-bottom: 0.5rem; }
          
          .coll-nav-controls { 
            order: 4; 
            margin-top: 1rem; 
            padding-top: 1.5rem; 
            border-top: 1px solid rgba(28,27,26,0.1); 
            justify-content: space-between; 
          }

          .coll-title { font-size: 2.2rem; margin-bottom: 0.75rem; }
          .coll-desc { font-size: 0.95rem; }

          .coll-zoom-toggle {
            top: 10px; right: 10px;
            padding: 8px 10px;
            border-radius: 50%;
          }
          
          .coll-model-badge {
            bottom: 10px; left: 10px;
            padding: 6px 10px;
            font-size: 0.55rem;
            letter-spacing: 0.1em;
            border-radius: 4px;
          }
        }
      `}</style>
    </div>
  );
}