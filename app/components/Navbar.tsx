// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "#collections" },
  { label: "Showrooms", href: "#showrooms" },
  { label: "Contact", href: "#contact" },
];

const BrandLogo = () => (
  <Link href="/" className="brand-logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="84" height="28">
      <defs>
        <linearGradient id="msjSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C1B1A" />
          <stop offset="50%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#1C1B1A" />
        </linearGradient>
      </defs>
    </svg>
    {/* Uncomment if you want the text to show */}
    {/* <span style={{ color: '#1C1B1A', fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.25rem', letterSpacing: '0.05em', fontWeight: 600 }}>MSJ</span> */}
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(true);

  // Handle the phone/email flipper cycle
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const runCycle = (isPhoneCycle: boolean) => {
      setShowPhone(isPhoneCycle);
      if (isPhoneCycle) {
        timeoutId = setTimeout(() => runCycle(false), 10000);
      } else {
        timeoutId = setTimeout(() => runCycle(true), 5000);
      }
    };
    timeoutId = setTimeout(() => runCycle(false), 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    // Replaced the fragment <> with <nav> to fix styled-jsx scoping issues
    <nav>
      <div className="navbar-container">
        <BrandLogo />
        <button className={`hamburger-toggle ${isMobileMenuOpen ? "hamburger-toggle--open" : ""}`} onClick={toggleMenu}>
          {isMobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className={`hamburger-overlay ${isMobileMenuOpen ? "hamburger-overlay--open" : ""}`}>
          {/* Changed background color to dark #1C1B1A */}
          <div className="absolute inset-0 w-full h-full bg-[#1C1B1A]" />
          <img aria-hidden="true" src="/wood-texture.jpeg" alt="" className="absolute inset-0 w-full h-full block md:hidden" style={{ objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'screen' }} />
          
          <ul className="hamburger-menu-track">
            {navLinks.map(({ label, href }, index) => {
              const isActive = pathname === href;
              return (
                <li key={label} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                  <Link
                    href={href}
                    onClick={(e) => {
                      if (href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(href);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }
                      handleLinkClick(href);
                    }}
                    className={`hamburger-nav-item ${isActive ? "hamburger-nav-item--active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            
            <li style={{ "--delay": `${navLinks.length * 0.1}s` } as React.CSSProperties} className="hamburger-cta-wrapper">
              <div className="cta-flipper">
                <div className={`cta-inner ${showPhone ? "" : "flipped"}`}>
                  <a href="tel:+918043868492" className="cta-face cta-front">+91 80438 68492</a>
                  <a href="mailto:info@msjdoorpalace.com" className="cta-face cta-back">info@msjdoorpalace.com</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0 24px;
          pointer-events: none;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #1C1B1A;
          text-decoration: none;
          pointer-events: auto;
          filter: drop-shadow(0 4px 12px rgba(247,245,240,0.8));
          z-index: 1002;
        }
        .hamburger-toggle {
          display: flex;
          pointer-events: auto;
          width: 52px;
          height: 52px;
          align-items: center;
          justify-content: center;
          background: #1C1B1A;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(28,27,26,0.1);
          border-radius: 50%;
          color: #F7F5F0;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(28,27,26,0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1002;
        }
        .hamburger-toggle:hover {
          background: #2A2A2A;
          color: #F7F5F0;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(28,27,26,0.15);
        }
        .hamburger-toggle:active { transform: scale(0.92); }
        .hamburger-toggle--open {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          color: #F7F5F0; /* Changed to white so the 'X' is visible on the dark overlay */
        }
        .hamburger-toggle--open:hover {
          background: rgba(247,245,240,0.1); /* Subtle white hover state */
          color: #F7F5F0;
          transform: none;
          box-shadow: none;
        }
        .hamburger-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          clip-path: circle(0px at calc(100% - 50px) 50px);
          transition: clip-path 0.7s cubic-bezier(0.7, 0, 0.2, 1);
        }
        .hamburger-overlay--open {
          pointer-events: auto;
          clip-path: circle(150vh at calc(100% - 50px) 50px);
        }
        .hamburger-menu-track {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .hamburger-cta-wrapper {
          margin-top: 32px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0s;
        }
        .hamburger-overlay--open .hamburger-cta-wrapper {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(0.2s + var(--delay));
        }
        .hamburger-cta-wrapper .cta-flipper {
          width: 240px;
          height: 52px;
          margin: 0;
        }
        .hamburger-cta-wrapper .cta-face { font-size: 16px; }
        .hamburger-nav-item {
          display: inline-block;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #F7F5F0; /* Changed to white for dark mode */
          text-decoration: none;
          padding: 10px 20px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
          transition-delay: 0s;
        }
        .hamburger-overlay--open .hamburger-nav-item {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(0.2s + var(--delay));
        }
        .hamburger-nav-item--active {
          font-style: italic;
          color: rgba(247,245,240,0.5); /* Dimmer white for active state */
        }
        .hamburger-nav-item:hover { color: rgba(247,245,240,0.8); } /* Dimmer white for hover */
        
        .cta-flipper {
          perspective: 1000px;
          width: 170px;
          height: 36px;
        }
        .cta-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .cta-inner.flipped { transform: rotateX(180deg); }
        .cta-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F7F5F0; /* Flipped: White background */
          color: #1C1B1A; /* Flipped: Dark text */
          font-family: inherit;
          font-weight: 600;
          letter-spacing: 0.1em;
          font-size: 14px;
          border-radius: 30px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        .cta-face:hover {
          background: #FFFFFF; /* Bright white on hover */
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .cta-back { transform: rotateX(180deg); }

        @media (min-width: 1024px) {
          .hamburger-menu-track { gap: 36px; }
          .hamburger-nav-item { font-size: 5.5rem; }
          .hamburger-cta-wrapper { margin-top: 48px; }
          .hamburger-cta-wrapper .cta-flipper { width: 260px; height: 56px; }
          .hamburger-cta-wrapper .cta-face { font-size: 15px; }
        }
        @media (max-width: 640px) {
          .hamburger-menu-track { gap: 24px; }
          .hamburger-nav-item { font-size: 3.5rem; }
          .hamburger-cta-wrapper .cta-flipper { width: 220px; height: 48px; }
        }
      `}</style>
    </nav>
  );
}
