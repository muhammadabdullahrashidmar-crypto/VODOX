import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Radio, Compass, BatteryCharging, Cpu } from 'lucide-react';

export function TechnologySection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = 40;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setHours(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section ref={ref} id="technology" className="py-24 md:py-32 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Bespoke Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2">
              Acoustic architecture without compromise.
            </h2>
          </div>
          <p className="text-sm text-muted dark:text-neutral-400 max-w-md leading-relaxed">
            Our custom drivers and multi-processor acoustic signal chain render frequencies from 5 Hz to 48 kHz with imperceptible distortion.
          </p>
        </div>

        {/* Bento Grid: Circular Liquid Glass Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Adaptive Noise Cancelling (7 cols) */}
          <div className="md:col-span-7 rounded-[24px] liquid-glass p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group shadow-liquid dark:shadow-liquid-dark">
            <div className="z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase border border-accent/20">
                  Hybrid ANC
                </span>
                <span className="text-2xl font-mono font-medium text-ink dark:text-white">-38 dB</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink dark:text-white mb-3">
                Adaptive Acoustic Cancellation
              </h3>
              <p className="text-sm text-muted dark:text-neutral-400 max-w-lg leading-relaxed">
                Six inverted microphones monitor incoming ambient sound waves 48,000 times per second, emitting an exact anti-phase waveform that neutralizes jet engines, metro roar, and urban distractions.
              </p>
            </div>

            {/* Soundwave Frequency Graph */}
            <div className="mt-8 pt-6 border-t border-ink/5 dark:border-white/10 flex items-center justify-between gap-1.5 h-16">
              {[40, 65, 30, 85, 95, 45, 75, 100, 60, 35, 70, 90, 50, 80, 45, 60].map((h, i) => (
                <motion.div
                  key={i}
                  animate={isInView ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] } : {}}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                  className="flex-1 bg-accent/50 rounded-full min-h-[3px]"
                  style={{ height: `${h * 0.6}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bento Card 2: 40-Hour Battery Counter (5 cols) */}
          <div className="md:col-span-5 rounded-[24px] liquid-glass p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group shadow-liquid dark:shadow-liquid-dark">
            <div className="z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3.5 py-1 rounded-full bg-ink/5 dark:bg-white/5 text-ink dark:text-white text-xs font-semibold tracking-wider uppercase border border-ink/10 dark:border-white/10">
                  Endurance
                </span>
                <BatteryCharging className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-ink dark:text-white mb-2">
                40-Hour Reserve
              </h3>
              <p className="text-sm text-muted dark:text-neutral-400 leading-relaxed">
                Dual solid-state cells engineered for transcontinental flights without intermediate recharging.
              </p>
            </div>

            <div className="mt-8 pt-4 flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-mono font-medium tracking-tighter text-ink dark:text-white">
                {hours}
              </span>
              <span className="text-2xl font-medium text-accent">hours</span>
              <span className="text-xs text-muted dark:text-neutral-500 ml-auto pb-2 font-mono">
                10m = 5h fast charge
              </span>
            </div>
          </div>

          {/* Bento Card 3: Spatial Audio (4 cols) */}
          <div className="md:col-span-4 rounded-[24px] liquid-glass p-8 flex flex-col justify-between relative group shadow-liquid dark:shadow-liquid-dark">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-6 border border-accent/20">
                <Compass className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-ink dark:text-white mb-2">
                Spatial Audio 360°
              </h3>
              <p className="text-xs text-muted dark:text-neutral-400 leading-relaxed">
                Integrated 6-axis IMU gyroscopes map acoustic soundstages fixed in physical space around your head.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center py-4">
              <div className="relative w-22 h-22 rounded-full border border-ink/15 dark:border-white/15 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1 rounded-full border border-dashed border-accent/60"
                />
                <span className="text-xs font-mono font-medium text-ink dark:text-white">3D Spherical</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Transparency Mode (4 cols) */}
          <div className="md:col-span-4 rounded-[24px] liquid-glass p-8 flex flex-col justify-between relative group shadow-liquid dark:shadow-liquid-dark">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-ink/5 dark:bg-white/5 flex items-center justify-center text-ink dark:text-white mb-6 border border-ink/10 dark:border-white/10">
                <Radio className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-ink dark:text-white mb-2">
                Natural Transparency
              </h3>
              <p className="text-xs text-muted dark:text-neutral-400 leading-relaxed">
                Zero-latency ambient pass-through filters dialogue cleanly without unnatural tinny resonance.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/5 dark:border-white/10 flex justify-between items-center text-xs">
              <span className="text-muted dark:text-neutral-400">Acoustic latency</span>
              <span className="font-mono font-semibold text-accent">&lt; 1.2 ms</span>
            </div>
          </div>

          {/* Bento Card 5: Seamless Dual Multipoint Pairing (4 cols) */}
          <div className="md:col-span-4 rounded-[24px] liquid-glass p-8 flex flex-col justify-between relative group shadow-liquid dark:shadow-liquid-dark">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-6 border border-accent/20">
                <Cpu className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-ink dark:text-white mb-2">
                Multipoint Bluetooth 5.3
              </h3>
              <p className="text-xs text-muted dark:text-neutral-400 leading-relaxed">
                Automatic transition between laptop mix sessions and mobile incoming calls without audio dropout.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/5 dark:border-white/10 flex justify-between items-center text-xs">
              <span className="text-muted dark:text-neutral-400">Simultaneous sources</span>
              <span className="font-mono font-semibold text-ink dark:text-white">2 Devices Auto</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
