// app/components/AboutSection.tsx
'use client';

export default function AboutSection() {
  return (
    <>
      <div id="about" className="relative overflow-hidden" style={{ background: '#F7F5F0', borderTop: '1px solid rgba(28,27,26,0.08)' }}>
        {/* Subtle Ambient Orbs */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '10%', right: '-10%', width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28,27,26,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'orbSpin 20s linear infinite',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '20%', left: '-5%', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28,27,26,0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'orbSpin 25s linear infinite reverse',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '30%', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28,27,26,0.015) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'orbSpin 15s linear infinite',
        }} />
        
        {/* Subtle Grid Pattern */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(28,27,26,0.015) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(28,27,26,0.015) 3px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
          <div className="flex items-center gap-3 mb-12" data-3d-reveal="float-up" style={{ '--delay': '0s' } as React.CSSProperties}>
            <span className="block h-px w-8 bg-[#1C1B1A]/30" />
            <p className="text-[#1C1B1A]/60 text-[9px] tracking-[0.6em] uppercase font-semibold">Our Story · Est. 1975</p>
            <span className="block w-2 h-2 bg-[#1C1B1A]/20 rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div data-3d-reveal="slide-left" style={{ '--delay': '0.05s' } as React.CSSProperties}>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                lineHeight: 0.88,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '2.5rem',
              }}>
                <span style={{ color: '#1C1B1A' }}>Crafting</span><br />
                <span style={{ color: 'rgba(28,27,26,0.4)', fontStyle: 'italic' }}>Legacies</span><br />
                <span style={{ color: '#1C1B1A' }}>in Wood.</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{
                  padding: '1.5rem',
                  borderLeft: '2px solid rgba(28,27,26,0.2)',
                  background: 'linear-gradient(90deg, rgba(28,27,26,0.03) 0%, transparent 100%)',
                  borderRadius: '0 8px 8px 0',
                }}>
                  <p style={{ color: 'rgba(28,27,26,0.7)', fontSize: '1rem', lineHeight: 1.85 }}>
                    Founded in <strong style={{ color: '#1C1B1A', fontWeight: 600 }}>1975</strong> by the visionary{' '}
                    <strong style={{ color: '#1C1B1A', fontWeight: 600 }}>Mr. M.S. Jaffar</strong>, chairman of the MSJ Traders Group,
                    MSJ Door Palace began with a singular mission — to bring the unmatched beauty of first-quality Burma Teakwood
                    into the homes of Chennai.
                  </p>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  borderLeft: '2px solid rgba(28,27,26,0.1)',
                  background: 'linear-gradient(90deg, rgba(28,27,26,0.02) 0%, transparent 100%)',
                  borderRadius: '0 8px 8px 0',
                }}>
                  <p style={{ color: 'rgba(28,27,26,0.6)', fontSize: '0.95rem', lineHeight: 1.85 }}>
                    In the year 2000, his son{' '}
                    <strong style={{ color: '#1C1B1A', fontWeight: 600 }}>Mr. Shahul Hameed</strong> joined the enterprise,
                    carrying forward the founding craft philosophy with a modern eye. Today, MSJ Door Palace stands as one of South India's
                    most trusted names in handcrafted wooden doors — blending traditional joinery with contemporary design.
                  </p>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  borderLeft: '2px solid rgba(28,27,26,0.05)',
                  background: 'linear-gradient(90deg, rgba(28,27,26,0.01) 0%, transparent 100%)',
                  borderRadius: '0 8px 8px 0',
                }}>
                  <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    Every door that leaves our showroom is a testament to five decades of skill — hand-carved, kiln-dried,
                    finished to last generations. From ornate temple-inspired panels to sleek modern flush doors,
                    we craft to your vision and deliver across South India.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-5 p-4 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(28,27,26,0.03) 0%, transparent 100%)',
                border: '1px solid rgba(28,27,26,0.08)',
              }}>
                <div style={{ 
                  width: 56, height: 56, 
                  borderRadius: '50%', 
                  background: '#1C1B1A', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(28,27,26,0.1)',
                }}>
                  <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 500, color: '#F7F5F0' }}>M</span>
                </div>
                <div>
                  <p style={{ color: '#1C1B1A', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em' }}>Shahul Hameed</p>
                  <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Managing Director · MSJ Door Palace</p>
                </div>
              </div>
            </div>

            <div data-3d-reveal="slide-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', '--delay': '0.15s' } as React.CSSProperties}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '🪵', title: '100% Natural Wood', desc: 'First-quality Burma Teakwood — no composites, no compromises.' },
                  { icon: '✦', title: 'Master Craftsmanship', desc: 'Each piece hand-carved by artisans trained in traditional South Indian joinery.' },
                  { icon: '🚚', title: 'Quick Delivery', desc: 'Efficient dispatch across Chennai and all of South India.' },
                  { icon: '₹', title: 'Reasonable Price', desc: 'Premium quality made accessible — direct from our workshop.' },
                ].map((p) => (
                  <div key={p.title} style={{
                    padding: '1.5rem',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(28,27,26,0.08)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(28,27,26,0.2)';
                    el.style.background = 'rgba(28,27,26,0.02)';
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 30px rgba(28,27,26,0.05)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(28,27,26,0.08)';
                    el.style.background = 'transparent';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                  >
                    <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem', position: 'relative', opacity: 0.8 }}>{p.icon}</p>
                    <p style={{ color: '#1C1B1A', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.02em', position: 'relative' }}>{p.title}</p>
                    <p style={{ color: 'rgba(28,27,26,0.6)', fontSize: '0.75rem', lineHeight: 1.6, position: 'relative' }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ 
                padding: '1.8rem', 
                borderRadius: '8px', 
                background: 'rgba(28,27,26,0.02)', 
                border: '1px solid rgba(28,27,26,0.08)',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1C1B1A' }} />
                  <p style={{ color: '#1C1B1A', fontSize: '0.72rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600 }}>What We Make</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {[
                    'Wooden Front Doors', 'Flush Doors', 'Moulded Panel Doors',
                    'Carved Teakwood Doors', 'Solid Wood Doors', 'Exterior Entry Doors',
                    'Classic Collection Doors', 'Pooja Mandapam Doors', 'Custom Doors',
                    'UPVC Windows', 'Aluminium Windows', 'Mosquito Nets',
                  ].map((item) => (
                    <span key={item} style={{
                      padding: '6px 14px', borderRadius: '25px', fontSize: '0.72rem', fontWeight: 500,
                      background: 'transparent', border: '1px solid rgba(28,27,26,0.15)',
                      color: 'rgba(28,27,26,0.7)', letterSpacing: '0.02em',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = 'rgba(28,27,26,0.05)';
                      el.style.borderColor = 'rgba(28,27,26,0.3)';
                      el.style.color = '#1C1B1A';
                      el.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = 'transparent';
                      el.style.borderColor = 'rgba(28,27,26,0.15)';
                      el.style.color = 'rgba(28,27,26,0.7)';
                      el.style.transform = 'translateY(0)';
                    }}
                    >{item}</span>
                  ))}
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '1px', 
                background: 'rgba(28,27,26,0.08)', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: '1px solid rgba(28,27,26,0.08)',
              }}>
                {[
                  { val: '50+', label: 'Years', bg: 'rgba(247,245,240,0.5)' },
                  { val: '2', label: 'Showrooms', bg: 'rgba(247,245,240,0.5)' },
                  { val: '1975', label: 'Founded', bg: 'rgba(247,245,240,0.5)' },
                ].map((s) => (
                  <div key={s.label} style={{ background: s.bg, padding: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: '-100%',
                      width: '100%', height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(28,27,26,0.03), transparent)',
                      animation: 'shimmerPulse 3s ease-in-out infinite',
                    }} />
                    <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#1C1B1A', lineHeight: 1, position: 'relative' }}>{s.val}</p>
                    <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '0.5rem', position: 'relative', fontWeight: 600 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ borderTop: '1px solid rgba(28,27,26,0.08)', borderBottom: '1px solid rgba(28,27,26,0.08)', background: '#F7F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {[
            { val: '50+', sub: 'Years of Craft' },
            { val: '100%', sub: 'Natural Teakwood' },
            { val: '2', sub: 'Chennai Showrooms' },
            { val: '1975', sub: 'Est. Chennai' },
          ].map((s, i) => (
            <div key={s.sub} className="text-center py-10 px-4" data-3d-reveal="float-up" style={{ borderLeft: i > 0 ? '1px solid rgba(28,27,26,0.08)' : 'none', '--delay': `${i * 0.1}s` } as React.CSSProperties}>
              <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, color: '#1C1B1A', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</p>
              <p className="text-[#1C1B1A]/50 text-[10px] font-semibold tracking-[0.2em] uppercase mt-3">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="marquee-track-outer" aria-hidden="true" style={{ background: '#1C1B1A' }}>
        <div className="marquee-track">
          {[
            '✦ First Quality Burma Teakwood', '· 50+ Years of Craftsmanship', '✦ Hand-Carved by Master Artisans',
            '· Delivered Across South India', '✦ Est. 1975 · Chennai', '· Reasonable Price · Quick Delivery',
            '✦ 100% Natural Wood', '· Two Showrooms in Chennai', '✦ Custom Designs Available', '· Pooja Mandapam & Carved Doors',
          ].map((item, i) => (
            <span key={i} className={`marquee-item ${i % 2 === 0 ? 'text-[#F7F5F0]' : 'text-[#F7F5F0]/60'}`}>{item}</span>
          ))}
          {[
            '✦ First Quality Burma Teakwood', '· 50+ Years of Craftsmanship', '✦ Hand-Carved by Master Artisans',
            '· Delivered Across South India', '✦ Est. 1975 · Chennai', '· Reasonable Price · Quick Delivery',
            '✦ 100% Natural Wood', '· Two Showrooms in Chennai',
          ].map((item, i) => (
            <span key={`dup-${i}`} className={`marquee-item ${i % 2 === 0 ? 'text-[#F7F5F0]' : 'text-[#F7F5F0]/60'}`}>{item}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes shimmerPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .marquee-track-outer {
          overflow: hidden;
          padding: 14px 0;
          white-space: nowrap;
          border-top: 1px solid rgba(28,27,26,0.9);
        }
        .marquee-track {
          display: inline-flex;
          gap: 0;
          animation: marqueeScroll 38s linear infinite;
          will-change: transform;
        }
        .marquee-item {
          display: inline-block;
          padding: 0 2rem;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 500;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-55%); }
        }
        .marquee-track-outer:hover .marquee-track { animation-play-state: paused; }
      `}</style>
    </>
  );
}