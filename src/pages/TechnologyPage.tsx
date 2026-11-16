import React from 'react';
import { TechnologySection } from '../sections/TechnologySection';
import { StudioLighting } from '../components/StudioLighting';
import { Link } from 'react-router-dom';

export function TechnologyPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 relative">
      <StudioLighting tintColor="rgba(94, 156, 147, 0.16)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Acoustic Physics & DSP
          </span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink dark:text-white mt-3">
            Engineered to eliminate harmonic distortion.
          </h1>
          <p className="text-sm md:text-base text-muted dark:text-neutral-400 mt-4 leading-relaxed">
            By eliminating passive plastic resonating bodies and utilizing machined aerospace aluminum chambers, Horizon achieves studio monitor neutrality in a wireless over-ear format.
          </p>
        </div>

        {/* Deep Dive Bento Technology Section */}
        <TechnologySection />

        {/* Interactive Frequency Spectrum Simulation with Liquid Glass */}
        <div className="mt-20 p-8 md:p-14 rounded-[28px] liquid-glass shadow-liquid dark:shadow-liquid-dark">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-accent">
                Laboratory Calibration
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink dark:text-white mt-1">
                Linear Frequency Response (5 Hz – 48,000 Hz)
              </h2>
            </div>
            <span className="text-xs font-mono text-muted dark:text-neutral-500">
              Measured at 94dB SPL · Reference Ear Simulator IEC 60318-4
            </span>
          </div>

          {/* SVG Curve Diagram */}
          <div className="relative w-full h-48 md:h-64 rounded-2xl bg-bg-deep/40 dark:bg-black/40 p-4 flex items-center justify-center overflow-hidden border border-ink/5 dark:border-white/10">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-r border-b border-ink/20 dark:border-white/10" />
              ))}
            </div>

            <svg className="w-full h-full" viewBox="0 0 800 200" fill="none">
              <path
                d="M 0 100 Q 150 95, 250 85 T 450 70 T 600 65 T 750 90 T 800 110"
                stroke="#5E9C93"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              <path
                d="M 0 100 Q 150 95, 250 85 T 450 70 T 600 65 T 750 90 T 800 110 L 800 200 L 0 200 Z"
                fill="url(#curveGradient)"
                opacity="0.12"
              />
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E9C93" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            <span className="absolute bottom-3 left-6 text-[10px] font-mono text-muted dark:text-neutral-400 uppercase">
              Sub Bass (20Hz)
            </span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted dark:text-neutral-400 uppercase">
              Vocal Mid-Range (1kHz)
            </span>
            <span className="absolute bottom-3 right-6 text-[10px] font-mono text-muted dark:text-neutral-400 uppercase">
              Ultra High Harmonic (20kHz+)
            </span>
          </div>
        </div>

        {/* Bottom CTA to View Finishes */}
        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-colors"
          >
            <span>Explore Horizon Finishes</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
