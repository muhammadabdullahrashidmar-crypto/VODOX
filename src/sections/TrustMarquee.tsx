import React from 'react';

export function TrustMarquee() {
  const items = [
    '40h battery',
    'Active noise cancelling',
    'Spatial audio',
    'Hi-Res wireless 96kHz/24bit',
    'Bespoke Titanium Diaphragm',
    'Acoustic Mesh Canopy',
    'Lossless LDAC Codec',
    'Anodized Aluminum Chassis',
  ];

  return (
    <div className="relative py-7 overflow-hidden border-y border-ink/5 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-sm select-none">
      <div className="flex w-fit whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 mx-6">
            <span
              className="text-xl md:text-2xl font-light tracking-[-0.02em] text-ink/80 dark:text-neutral-200 hover:text-accent dark:hover:text-accent transition-colors"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
              }}
            >
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-accent/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
