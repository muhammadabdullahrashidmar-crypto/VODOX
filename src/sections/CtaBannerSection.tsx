import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useMagnetic } from '../hooks/useMagnetic';

export function CtaBannerSection() {
  const openCart = useCartStore((state) => state.openCart);
  const ctaBtnRef = useMagnetic(0.2);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative rounded-[32px] bg-[#0E1212] dark:bg-[#07090A] text-white p-10 md:p-20 overflow-hidden shadow-studio dark:shadow-studio-dark border border-white/10 flex flex-col items-center text-center">
          
          {/* Subtle Ambient Reflections */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          {/* Liquid Glass Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-8 z-10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/90">
              Complimentary In-Home Trial
            </span>
          </div>

          {/* Main Statement */}
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] max-w-2xl mb-6 z-10">
            Hear everything. Feel nothing else.
          </h2>

          <p className="text-sm md:text-base text-neutral-400 max-w-xl mb-10 font-normal leading-relaxed z-10">
            Calibrated with custom 40mm titanium drivers and 40-hour battery endurance. Delivered with 30-day studio trial.
          </p>

          {/* Circular Pill Shop Button */}
          <div className="z-10">
            <button
              ref={ctaBtnRef as any}
              onClick={openCart}
              data-cursor="Shop"
              data-cursor-variant="button"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all duration-300 ease-studio shadow-studio hover:shadow-accent-glow active:scale-95"
            >
              <span>Explore The Horizon Series</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
