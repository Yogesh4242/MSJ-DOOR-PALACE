// app/components/ContactSection.tsx
'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="relative overflow-hidden" style={{ background: '#F7F5F0', scrollMarginTop: '80px' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(28,27,26,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="flex items-center gap-3 mb-10" data-3d-reveal="float-up" style={{ '--delay': '0s' } as React.CSSProperties}>
          <span className="block h-px w-8 bg-[#1C1B1A]/30" />
          <p className="text-[#1C1B1A]/60 text-[9px] tracking-[0.6em] uppercase font-semibold">Get In Touch</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div data-3d-reveal="slide-left" style={{ '--delay': '0.05s' } as React.CSSProperties}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              lineHeight: 0.88,
              color: '#1C1B1A',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              Visit Us<br />
              <span style={{ color: 'rgba(28,27,26,0.4)', fontStyle: 'italic' }}>Today.</span>
            </h2>
            <p style={{ color: 'rgba(28,27,26,0.6)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '26rem', marginBottom: '2.5rem' }}>
              Walk into any of our Chennai showrooms or reach out directly — we'll help you find the perfect door for your home.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,26,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.3rem' }}>Call Us</p>
                  <a href="tel:+918056138951" style={{ color: '#1C1B1A', fontSize: '1.05rem', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, textDecoration: 'none', display: 'block' }}>+91 80561 38951</a>
                  <a href="tel:+919382862445" style={{ color: 'rgba(28,27,26,0.6)', fontSize: '0.95rem', fontFamily: '"Playfair Display", Georgia, serif', textDecoration: 'none', display: 'block', marginTop: '0.15rem' }}>+91 93828 62445</a>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,26,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.3rem' }}>Email</p>
                  <a href="mailto:MSJSHAHUL@Gmail.Com" style={{ color: '#1C1B1A', fontSize: '0.95rem', fontFamily: '"Playfair Display", Georgia, serif', textDecoration: 'none' }}>MSJSHAHUL@Gmail.Com</a>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,26,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.3rem' }}>Open Hours</p>
                  <p style={{ color: '#1C1B1A', fontSize: '0.95rem', fontFamily: '"Playfair Display", Georgia, serif' }}>Monday – Saturday · 9am – 8pm</p>
                </div>
              </div>
            </div>

            <p style={{ marginTop: '2.5rem', color: 'rgba(28,27,26,0.3)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>
              Shahul Hameed · Managing Director
            </p>
          </div>

          {/* Right Column - Contact Form */}
          <div data-3d-reveal="slide-right" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <div style={{
              padding: '2.5rem',
              borderRadius: '4px',
              background: 'rgba(28,27,26,0.02)',
              border: '1px solid rgba(28,27,26,0.08)',
              boxShadow: '0 8px 32px rgba(28,27,26,0.04)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: '#1C1B1A', fontSize: '0.65rem', letterSpacing: '0.45em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>Send us a message</p>
                <p style={{ color: 'rgba(28,27,26,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>We'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="contact-field-wrap">
                    <label className="contact-field-label">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul" className="contact-field-input" required />
                  </div>
                  <div className="contact-field-wrap">
                    <label className="contact-field-label">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="contact-field-input" required />
                  </div>
                </div>

                <div className="contact-field-wrap">
                  <label className="contact-field-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="contact-field-input" required />
                </div>

                <div className="contact-field-wrap">
                  <label className="contact-field-label">Message</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements — size, design preference, location..." className="contact-field-input" style={{ resize: 'none' }} required />
                </div>

                <button type="submit" className="contact-submit-btn mt-2" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Sending...' : 'Submit Message'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#F7F5F0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </button>

                {submitStatus === 'success' && (
                  <p style={{ color: '#1C1B1A', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.75rem', fontWeight: 500 }}>✓ Message sent successfully! We'll get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p style={{ color: 'rgba(28,27,26,0.6)', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.75rem' }}>✗ Something went wrong. Please try again or call us directly.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(28,27,26,0.15), transparent)' }} />

      <style>{`
        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.1rem 1.4rem;
          border-radius: 4px;
          background: transparent;
          border: 1px solid rgba(28,27,26,0.08);
          border-left: 2px solid rgba(28,27,26,0.15);
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .contact-info-row:hover {
          border-color: rgba(28,27,26,0.2);
          border-left-color: #1C1B1A;
          background: rgba(28,27,26,0.02);
          transform: translateX(4px);
        }
        .contact-info-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          border-radius: 50%;
          background: rgba(28,27,26,0.04);
          border: 1px solid rgba(28,27,26,0.08);
          display: flex; align-items: center; justify-content: center;
        }
        .contact-field-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-field-label {
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(28,27,26,0.6);
        }
        .contact-field-input {
          width: 100%;
          padding: 0.9rem 1rem;
          border-radius: 2px;
          background: rgba(247,245,240,0.5);
          border: 1px solid rgba(28,27,26,0.15);
          color: #1C1B1A;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.25s ease;
          font-family: inherit;
          box-sizing: border-box;
        }
        .contact-field-input::placeholder { color: rgba(28,27,26,0.3); }
        .contact-field-input:focus {
          border-color: rgba(28,27,26,0.5);
          background: transparent;
          box-shadow: 0 4px 12px rgba(28,27,26,0.03);
        }
        .contact-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1.1rem;
          border-radius: 2px;
          background: #1C1B1A;
          border: none;
          color: #F7F5F0;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(28,27,26,0.1);
        }
        .contact-submit-btn:hover:not(:disabled) {
          background: #2A2A2A;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(28,27,26,0.15);
        }
        .contact-submit-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>
    </div>
  );
}