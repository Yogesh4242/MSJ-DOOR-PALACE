// app/components/Footer.tsx
'use client';

export default function Footer() {
  return (
    <div 
      className="border-t py-8 text-center" 
      data-3d-reveal="float-up" 
      style={{ 
        background: '#F7F5F0', 
        borderColor: 'rgba(28,27,26,0.1)',
        '--delay': '0s' 
      } as React.CSSProperties}
    >
      <p className="text-[#1C1B1A]/50 text-[10px] font-semibold tracking-[0.2em] uppercase">
        © MSJ Door Palace · Est. 1975 · Chennai, Tamil Nadu · Leading Doors & Windows Manufacturer in South India
      </p>
    </div>
  );
}