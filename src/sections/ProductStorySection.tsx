import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Sliders, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductStorySectionProps {
  product: Product;
}

export function ProductStorySection({ product }: ProductStorySectionProps) {
  const [activeCallout, setActiveCallout] = useState<number | null>(0);
  const [sliderAngle, setSliderAngle] = useState(0);

  const callouts = [
    {
      id: 0,
      title: 'Mesh Canopy Headband',
      positionText: 'Top Arc',
      icon: Layers,
      description: 'A breathable knit canopy disperses headphone mass across the cranial arch, eliminating top-of-head pressure hotspots during extended mixing sessions.',
      coords: { x: '50%', y: '16%' },
    },
    {
      id: 1,
      title: 'Aluminium Telescoping Frame',
      positionText: 'Right Yoke',
      icon: Sparkles,
      description: 'Machined from single-billet aerospace aluminium. Telescoping arms extend smoothly and lock firmly into place with calibrated internal detents.',
      coords: { x: '78%', y: '38%' },
    },
    {
      id: 2,
      title: 'Digital Crown Dial',
      positionText: 'Control Ring',
      icon: Sliders,
      description: 'Inspired by mechanical horology. Delivers micro-haptic clicks for millibel-precise volume adjustments and instant ANC-to-Transparency switching.',
      coords: { x: '74%', y: '62%' },
    },
    {
      id: 3,
      title: 'Acoustic Memory-Foam Cushions',
      positionText: 'Ear Cups',
      icon: Compass,
      description: 'Viscoelastic memory foam enclosed in acoustically transparent textile creates an airtight bass seal without excessive lateral clamping force.',
      coords: { x: '28%', y: '68%' },
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Anatomy of Immersion
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2">
              Sculpted for pure acoustic isolation.
            </h2>
          </div>
          <p className="text-sm text-muted dark:text-neutral-400 max-w-md leading-relaxed">
            Every curve, seam, and acoustic chamber is engineered to eliminate internal resonance and deliver reference-grade stereo separation.
          </p>
        </div>

        {/* Liquid Glass Interactive Stage with gentle rounded corners */}
        <div className="relative rounded-[26px] liquid-glass p-8 md:p-12 min-h-[580px] flex flex-col justify-between shadow-liquid dark:shadow-liquid-dark">
          
          {/* Top Bar with Rounded Callout Switchers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 z-20">
            {callouts.map((item) => {
              const Icon = item.icon;
              const isSelected = activeCallout === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCallout(item.id)}
                  data-cursor="Inspect"
                  data-cursor-variant="button"
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/95 dark:bg-white/15 shadow-sm border-accent text-ink dark:text-white'
                      : 'bg-white/40 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-white/10 border-white/60 dark:border-white/10 text-muted dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-accent' : 'text-muted'}`} strokeWidth={1.5} />
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-muted dark:text-neutral-500">
                      {item.positionText}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Center Stage: Headphone Visual */}
          <div className="relative w-full max-w-lg mx-auto aspect-square my-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-radial-gradient from-accent/15 via-transparent to-transparent blur-3xl pointer-events-none" />

            <motion.div
              animate={{
                rotateY: sliderAngle,
                rotateZ: sliderAngle * 0.15,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative w-4/5 h-4/5 flex items-center justify-center select-none"
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              <img
                src={product.heroImage}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-studio mix-blend-multiply dark:mix-blend-normal dark:rounded-2xl"
              />

              {/* Rounded Circular Pin Markers */}
              {callouts.map((c) => {
                const isActive = activeCallout === c.id;
                return (
                  <div
                    key={c.id}
                    className="absolute hidden md:block"
                    style={{ left: c.coords.x, top: c.coords.y }}
                  >
                    <button
                      onClick={() => setActiveCallout(c.id)}
                      className="relative -translate-x-1/2 -translate-y-1/2 group"
                      aria-label={`Inspect ${c.title}`}
                    >
                      <span className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isActive ? 'bg-accent border-white scale-125 shadow-accent-glow' : 'bg-white/90 dark:bg-black/90 border-ink/40 dark:border-white/40 hover:scale-110'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Stage: Active Callout Description & Perspective Slider */}
          <div className="z-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-ink/5 dark:border-white/10">
            <div className="max-w-xl">
              {activeCallout !== null && (
                <motion.div
                  key={activeCallout}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                    Detail · {callouts[activeCallout].title}
                  </span>
                  <p className="text-sm text-ink/85 dark:text-neutral-300 mt-1 leading-relaxed">
                    {callouts[activeCallout].description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Liquid Dial Pill */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full liquid-pill shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-muted dark:text-neutral-400 font-medium">
                Tilt Perspective
              </span>
              <input
                type="range"
                min="-25"
                max="25"
                value={sliderAngle}
                onChange={(e) => setSliderAngle(Number(e.target.value))}
                className="w-24 accent-[#5E9C93] cursor-pointer"
                aria-label="Tilt headphone angle"
              />
              <span className="text-xs font-mono text-ink/80 dark:text-white min-w-[28px] text-right">
                {sliderAngle}°
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
