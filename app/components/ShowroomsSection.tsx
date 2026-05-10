// app/components/ShowroomsSection.tsx
'use client';

export default function ShowroomsSection() {
  return (
    <div id="showrooms" className="relative pt-24 pb-12" style={{ background: '#F7F5F0', scrollMarginTop: '80px' }}>
      <div className="absolute inset-0 pointer-events-none select-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(28,27,26,0.02) 80px)',
      }} />
      
      <div aria-hidden="true" style={{
        position: 'absolute', top: '5%', left: '2%', 
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(28,27,26,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '3%', 
        width: 350, height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(28,27,26,0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div data-3d-reveal="slide-left" style={{ '--delay': '0s' } as React.CSSProperties}>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-3 h-3 rounded-full bg-[#1C1B1A]/10" />
              <p className="text-[#1C1B1A]/60 text-[9px] tracking-[0.6em] uppercase font-semibold">Find Us · Chennai</p>
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              lineHeight: 0.9,
              color: '#1C1B1A',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>
              Our<br />Showrooms
            </h2>
          </div>
          <p className="hidden md:block text-[#1C1B1A]/60 text-sm max-w-xs leading-relaxed mb-2" data-3d-reveal="slide-right" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            Two destinations across Chennai — each stocked with our complete collection of handcrafted teakwood doors.
          </p>
        </div>

        <div className="mt-10 mb-0 w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(28,27,26,0.15), rgba(28,27,26,0.02), transparent)' }} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {([
            {
              n: '01', branch: 'Anna Nagar', tag: 'Main Showroom',
              street: 'No.527/1, NSK Nagar, Anna Nagar',
              street2: '3rd Main Road, Chennai – 600 040',
              note: 'Near NSK Nagar · K3 Police Station',
              phone: '+91 80561 38951',
              hours: 'Mon – Sat · 9am – 8pm',
              href: 'https://maps.google.com/?q=MSJ+Door+Palace+Anna+Nagar+Chennai',
            },
            {
              n: '02', branch: 'Choolai Meedu', tag: 'Branch Showroom',
              street: 'Choolai Meedu',
              street2: 'Chennai, Tamil Nadu',
              note: 'Call for directions',
              phone: '+91 93828 62445',
              hours: 'Mon – Sat · 9am – 8pm',
              href: 'tel:+919382862445',
            },
          ]).map((s, idx) => (
            <div
              key={s.branch}
              className="showroom-card group"
              data-3d-reveal="showroom-row"
              style={{ '--delay': `${idx * 0.14}s` } as React.CSSProperties}
            >
              <div className="showroom-card-accent" />
              
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, right: 0,
                width: 100, height: 100,
                background: 'radial-gradient(circle at top right, rgba(28,27,26,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="showroom-card-index">{s.n}</p>
                  <span className="showroom-card-tag">{s.tag}</span>
                </div>
                <div className="showroom-pin-wrap" style={{ boxShadow: '0 4px 12px rgba(28,27,26,0.04)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,26,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
              </div>

              <h3 className="showroom-card-name">{s.branch}</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="showroom-card-rule flex-1" />
                <span style={{ color: 'rgba(28,27,26,0.2)', fontSize: '0.5rem' }}>◆</span>
                <div className="showroom-card-rule flex-1" />
              </div>

              <div className="showroom-card-address">
                <p>{s.street}</p>
                <p style={{ color: 'rgba(28,27,26,0.5)' }}>{s.street2}</p>
                <p className="showroom-card-note">{s.note}</p>
              </div>

              <div className="showroom-card-pills">
                <div className="showroom-pill" style={{ backdropFilter: 'blur(4px)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/></svg>
                  {s.phone}
                </div>
                <div className="showroom-pill" style={{ backdropFilter: 'blur(4px)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {s.hours}
                </div>
              </div>

              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="showroom-card-cta"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(28,27,26,0.04)';
                  el.style.borderColor = 'rgba(28,27,26,0.4)';
                  el.style.color = '#1C1B1A';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'transparent';
                  el.style.borderColor = 'rgba(28,27,26,0.15)';
                  el.style.color = 'rgba(28,27,26,0.65)';
                }}
              >
                <span>Get Directions</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-45deg)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-4 showroom-bottom-strip">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(28,27,26,0.15), transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(28,27,26,0.2)' }} />
            <p className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: 'rgba(28,27,26,0.4)' }}>Est. 1975 · Chennai</p>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(28,27,26,0.2)' }} />
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, rgba(28,27,26,0.15), transparent)' }} />
        </div>
      </div>

      <style>{`
        .showroom-card {
          position: relative;
          padding: 2.8rem;
          border-radius: 4px;
          background: transparent;
          border: 1px solid rgba(28,27,26,0.08);
          transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(28,27,26,0.02);
          backdrop-filter: blur(8px);
        }
        .showroom-card:hover {
          border-color: rgba(28,27,26,0.2);
          box-shadow: 0 12px 32px rgba(28,27,26,0.06);
          transform: translateY(-5px);
          background: rgba(28,27,26,0.015);
        }
        .showroom-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #1C1B1A, rgba(28,27,26,0.1), transparent);
          border-radius: 4px 4px 0 0;
        }
        .showroom-card-index {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 400;
          line-height: 1;
          color: #1C1B1A;
          opacity: 0.25;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .showroom-card-tag {
          display: inline-block;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 25px;
          background: rgba(28,27,26,0.04);
          border: 1px solid rgba(28,27,26,0.1);
          color: rgba(28,27,26,0.7);
        }
        .showroom-pin-wrap {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(28,27,26,0.02);
          border: 1px solid rgba(28,27,26,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .showroom-card:hover .showroom-pin-wrap {
          background: rgba(28,27,26,0.06);
          border-color: rgba(28,27,26,0.2);
          box-shadow: 0 0 20px rgba(28,27,26,0.05);
        }
        .showroom-card-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 400;
          color: #1C1B1A;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
        }
        .showroom-card-rule {
          height: 1px;
          background: linear-gradient(90deg, rgba(28,27,26,0.12), transparent);
          margin-bottom: 1.25rem;
        }
        .showroom-card-address {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: rgba(28,27,26,0.7);
          line-height: 1.7;
        }
        .showroom-card-note {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(28,27,26,0.4) !important;
          margin-top: 0.35rem;
          font-weight: 600;
        }
        .showroom-card-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.8rem;
        }
        .showroom-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 7px 16px;
          border-radius: 25px;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(28,27,26,0.6);
          background: rgba(28,27,26,0.03);
          border: 1px solid rgba(28,27,26,0.08);
          transition: all 0.3s ease;
        }
        .showroom-card:hover .showroom-pill {
          background: rgba(28,27,26,0.06);
          border-color: rgba(28,27,26,0.15);
        }
        .showroom-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 12px 24px;
          border: 1px solid rgba(28,27,26,0.15);
          color: rgba(28,27,26,0.65);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-decoration: none;
          transition: all 0.35s ease;
          text-transform: uppercase;
          background: transparent;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}