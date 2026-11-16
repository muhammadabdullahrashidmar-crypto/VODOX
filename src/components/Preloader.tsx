import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 950;

    const frame = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 150);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#EEF1F1] dark:bg-[#07090A] text-ink dark:text-white select-none"
        >
          <div className="relative flex flex-col items-center gap-6 z-10">
            {/* Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-medium tracking-[-0.04em]"
            >
              VODOX
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs uppercase tracking-[0.25em] text-muted dark:text-neutral-400 font-mono font-medium"
            >
              Acoustic Architecture
            </motion.p>

            {/* Precision progress track */}
            <div className="w-48 sm:w-64 h-[2px] bg-ink/10 dark:bg-white/10 overflow-hidden mt-2 relative">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <span className="text-[11px] font-mono tracking-wider text-muted dark:text-neutral-400">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
