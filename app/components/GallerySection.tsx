// app/components/GallerySection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// High-quality stock placeholders
const INITIAL_GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1712171984469-656cb869d45b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Carved Double Door', label: 'Heritage Double Door' },
  { src: 'https://images.woodenstreet.de/image/data/blog-images/28-mar-24/2%20Traditional%20Indian%20Patterns%20door.jpg', alt: 'Modern Wood Panel', label: 'Modern Wood Panel' },
  { src: 'https://cms.interiorcompany.com/wp-content/uploads/2024/07/wooden-main-door-with-jali-work.webp', alt: 'Minimalist Door', label: 'Minimalist Flush Door' },
  { src: 'https://plus.unsplash.com/premium_photo-1667520176756-a85d19fb7fe3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Wood Texture', label: 'Premium Teak Grain' },
  { src: 'https://www.greenply.com:5001/originalfile1769149994777-6738.jpg', alt: 'Interior Architecture', label: 'Interior Setup' },
  { src: 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/05103215/Teak-wood-main-door-design-ideas-for-your-house-FB-1200x700-compressed.jpg', alt: 'Entrance Door', label: 'Grand Entrance' },
];

const MORE_GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=800&auto=format&fit=crop', alt: 'Wood Details', label: 'Carved Details' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', alt: 'Corporate Wood Interior', label: 'Office Paneling' },
  { src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop', alt: 'Classic Architecture', label: 'Classic Architecture' },
  { src: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=800&auto=format&fit=crop', alt: 'Decorative Screen', label: 'Decorative Screen' },
  { src: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=800&auto=format&fit=crop', alt: 'Rustic Wood', label: 'Rustic Finish' },
  { src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop', alt: 'Sleek Setup', label: 'Sleek Setup' },
];

// Mapped exactly so the first 6 items form a perfect rectangle on a 4-column desktop grid.
const LAYOUT_PATTERN: Array<'hero' | 'tall' | 'wide' | 'std'> = [
  'hero', // 2x2
  'std',  // 1x1
  'tall', // 1x2
  'std',  // 1x1
  'wide', // 2x1
  'wide', // 2x1
  // Pattern for the "View More" 6 items:
  'wide', 'std', 'std', 'std', 'std', 'wide'
];

export default function GallerySection() {
  const [showMore, setShowMore] = useState(false);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const refreshLenis = () => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.resize();
    }
  };

  const handleViewMore = () => {
    setAnimating(true);
    setShowMore(true);
    setTimeout(() => refreshLenis(), 50);
  };

  useEffect(() => {
    if (showMore && containerRef.current) {
      refreshLenis();
      const timeouts = [100, 300, 600, 1000].map(delay => setTimeout(refreshLenis, delay));
      const resizeObserver = new ResizeObserver(() => refreshLenis());
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      return () => {
        timeouts.forEach(clearTimeout);
        resizeObserver.disconnect();
      };
    }
  }, [showMore]);

  const allImages = showMore ? [...INITIAL_GALLERY_IMAGES, ...MORE_GALLERY_IMAGES] : INITIAL_GALLERY_IMAGES;

  return (
    <div
      id="gallery"
      ref={containerRef}
      className="relative pt-16 pb-10"
      style={{
        background: '#F7F5F0',
        color: '#1C1B1A',
        scrollMarginTop: '80px',
      }}
    >
      {/* 110rem container matches Collections section for beautiful edge spacing */}
      <div className="max-w-[110rem] mx-auto">
        
        {/* Header Area */}
        <div className="px-5 md:px-10 xl:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-6" data-3d-reveal="slide-left" style={{ '--delay': '0s' } as React.CSSProperties}>
          <div>
            <div className="flex items-center gap-2 mb-3 pb-4">
              <span className="block h-px w-8 bg-[#1C1B1A]/30" />
              <p className="text-[#1C1B1A]/60 text-[9px] tracking-[0.6em] uppercase font-semibold ">
                Our Work · Crafted Doors
              </p>
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              color: '#1C1B1A',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>
              Gallery
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-4 mb-2" data-3d-reveal="slide-right" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <p className="text-[#1C1B1A]/70 text-[0.95rem] max-w-sm leading-relaxed text-right">
              A curated selection of our handcrafted teakwood doors — every piece a testament to five decades of artisanal mastery.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 md:mx-10 xl:mx-16 w-auto h-px mb-8 md:mb-10" style={{
          background: 'linear-gradient(90deg, rgba(28,27,26,0.15) 0%, rgba(28,27,26,0.02) 100%)',
        }} />

        {/* Gallery Grid */}
        <div className="gallery-grid px-4 md:px-10 xl:px-16">
          {allImages.map((img, i) => {
            const sizeClass = `gallery-cell-${LAYOUT_PATTERN[i % LAYOUT_PATTERN.length]}`;
            
            return (
              <div
                key={img.src + i}
                className={`gallery-item-group ${sizeClass}`}
                data-3d-reveal="float-up"
                style={{ 
                  '--delay': `${(i % 8) * 0.05}s`, 
                  animationDelay: animating && i >= 6 ? `${(i - 6) * 0.06}s` : '0s' 
                } as React.CSSProperties}
              >
                {/* Image Box - No padding, full bleed */}
                <div className="gallery-img-box">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="gallery-img"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                    onLoad={() => { if (showMore) refreshLenis(); }}
                  />
                </div>
                
                {/* External Name Label */}
                <div className="gallery-label-box">
                  <p className="gallery-label-text">{img.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        {!showMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button onClick={handleViewMore} className="gallery-btn-primary">
              <span>View More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {showMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button 
              className="gallery-btn-secondary"
              onClick={() => {
                setShowMore(false);
                setAnimating(false);
                refreshLenis();
              }}
            >
              ↑ Show Less
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* ── GRID LAYOUT ── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 300px;
          grid-auto-flow: dense;
          column-gap: 1.5rem;
          row-gap: 3rem; /* Extra space for labels */
        }

        /* Span Controls for Desktop */
        @media (min-width: 1024px) {
          .gallery-cell-hero { grid-column: span 2; grid-row: span 2; }
          .gallery-cell-tall { grid-column: span 1; grid-row: span 2; }
          .gallery-cell-wide { grid-column: span 2; grid-row: span 1; }
          .gallery-cell-std  { grid-column: span 1; grid-row: span 1; }
        }

        .gallery-item-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* ── IMAGE BOX (Full Bleed) ── */
        .gallery-img-box {
          width: 100%;
          flex-grow: 1; /* Takes up all available height left by the label */
          min-height: 0; /* Fixes flexbox blowout */
          background: #E8E5E1; /* Nice warm-grey placeholder color */
          border-radius: 4px;
          border: 1px solid rgba(28,27,26,0.06);
          overflow: hidden;
          /* Removed transition on background/border for minimal style */
        }

        /* ── THE IMAGE (Cover & Zoom) ── */
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Fills container edge-to-edge */
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Subtle Light Zoom on Hover */
        .gallery-item-group:hover .gallery-img {
          transform: scale(1.05);
        }

        /* ── EXTERNAL TEXT LABELS ── */
        .gallery-label-box {
          margin-top: 1rem;
          text-align: center;
          width: 100%;
          flex-shrink: 0;
        }

        .gallery-label-text {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(28,27,26,0.6);
          transition: color 0.3s ease;
        }

        .gallery-item-group:hover .gallery-label-text {
          color: #1C1B1A;
        }

        /* ── BUTTONS ── */
        .gallery-btn-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 40px;
          background: #1C1B1A;
          border: none;
          border-radius: 2px;
          color: #F7F5F0;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(28,27,26,0.1);
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .gallery-btn-primary:hover {
          background: #2A2A2A;
          transform: scale(1.02) translateY(-2px);
          box-shadow: 0 8px 24px rgba(28,27,26,0.15);
        }

        .gallery-btn-secondary {
          background: transparent;
          border: none;
          color: rgba(28,27,26,0.4);
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .gallery-btn-secondary:hover {
          color: #1C1B1A;
        }

        /* ── TABLET OVERRIDES ── */
        @media (max-width: 1024px) and (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 250px;
          }
          .gallery-cell-hero { grid-column: span 2; grid-row: span 2; }
          .gallery-cell-tall { grid-column: span 1; grid-row: span 2; }
          .gallery-cell-wide { grid-column: span 2; grid-row: span 1; }
          .gallery-cell-std  { grid-column: span 1; grid-row: span 1; }
        }

        /* ── MOBILE SPECIFIC (Strict 2x3 Grid) ── */
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr); 
            grid-auto-rows: 240px; /* Controls image height */
            column-gap: 0.75rem; 
            row-gap: 1.5rem; 
          }
          
          /* Override all spans on mobile so they behave uniformly */
          .gallery-cell-hero, 
          .gallery-cell-tall, 
          .gallery-cell-wide, 
          .gallery-cell-std {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }

          .gallery-label-box {
            margin-top: 0.75rem;
          }

          .gallery-label-text {
            font-size: 0.55rem; /* Tiny, elegant font size for mobile */
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </div>
  );
}