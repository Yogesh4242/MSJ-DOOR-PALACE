// app/page.tsx
'use client';

import { useRef, useEffect } from 'react';
import Navbar from './components/Navbar'; // <-- Import the new component
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ShowroomsSection from './components/ShowroomsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function HomePage() {
  // Create refs inside the component
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  // Setup intersection observer for scroll animations
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-3d-reveal]');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Extracted Navbar Component */}
      <Navbar />

      {/* Sections - Pass refs with type assertions */}
      <HeroSection 
        heroRef={heroRef as React.RefObject<HTMLElement>}
        canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
        text1Ref={text1Ref as React.RefObject<HTMLDivElement>}
        text2Ref={text2Ref as React.RefObject<HTMLDivElement>}
        text3Ref={text3Ref as React.RefObject<HTMLDivElement>}
      />
      
      <section className="relative -mt-px w-full" style={{ background: '#F7F5F0' }}>
        <CollectionsSection modelContainerRef={modelContainerRef as React.RefObject<HTMLDivElement>} />
        <GallerySection />
        <AboutSection />
        <ShowroomsSection />
        <ContactSection />
        <Footer />
      </section>

      {/* Remaining styles specific to page interactions */}
      <style jsx>{`
        @keyframes orbSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes shimmerPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        [data-3d-reveal="float-up"] {
          opacity: 0;
          transform: translateY(48px) rotateX(18deg);
          transform-origin: center bottom;
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s), transform 0.85s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
          will-change: opacity, transform;
        }
        [data-3d-reveal="float-up"].reveal-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }
        [data-3d-reveal="slide-left"] {
          opacity: 0;
          transform: translateX(-56px) rotateY(12deg);
          transform-origin: right center;
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s), transform 0.9s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
          will-change: opacity, transform;
        }
        [data-3d-reveal="slide-left"].reveal-in {
          opacity: 1;
          transform: translateX(0) rotateY(0deg);
        }
        [data-3d-reveal="slide-right"] {
          opacity: 0;
          transform: translateX(56px) rotateY(-12deg);
          transform-origin: left center;
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s), transform 0.9s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
          will-change: opacity, transform;
        }
        [data-3d-reveal="slide-right"].reveal-in {
          opacity: 1;
          transform: translateX(0) rotateY(0deg);
        }
        [data-3d-reveal="showroom-row"] {
          opacity: 0;
          transform: translateX(-40px) translateZ(-30px) rotateX(6deg);
          transform-origin: left center;
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s), transform 0.85s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
          will-change: opacity, transform;
        }
        [data-3d-reveal="showroom-row"].reveal-in {
          opacity: 1;
          transform: translateX(0) translateZ(0) rotateX(0deg);
        }
      `}</style>
    </main>
  );
}