import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';

interface StudioLightingProps {
  tintColor?: string; // e.g. "rgba(94, 156, 147, 0.12)" or hex
}

export function StudioLighting({ tintColor = 'rgba(94, 156, 147, 0.12)' }: StudioLightingProps) {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base gradient: Light mode vs Dark mode */}
      <div 
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 120% 80% at 50% -20%, #111416 0%, #0A0C0D 50%, #060708 100%)'
            : 'radial-gradient(ellipse 120% 80% at 50% -20%, #FFFFFF 0%, #F5F7F7 50%, #EEF1F1 100%)',
        }}
      />

      {/* Dynamic ambient color glow from active headphone finish */}
      <motion.div
        animate={{
          background: isDark
            ? `radial-gradient(circle at 65% 35%, ${tintColor.replace('0.12', '0.22').replace('0.14', '0.24').replace('0.16', '0.26')} 0%, rgba(6,7,8,0) 65%)`
            : `radial-gradient(circle at 65% 35%, ${tintColor} 0%, rgba(255,255,255,0) 65%)`,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      />

      {/* Diagonal studio light beam 1 */}
      <div 
        className={`absolute -top-[30%] -right-[15%] w-[90vw] h-[160vh] mix-blend-overlay rotate-[-32deg] ${
          isDark ? 'opacity-20' : 'opacity-40'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(94,156,147,0.3) 35%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 80%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Diagonal soft shadow fall-off */}
      <div 
        className={`absolute -top-[20%] -left-[10%] w-[80vw] h-[140vh] rotate-[-28deg] ${
          isDark ? 'opacity-35' : 'opacity-15'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)'
            : 'linear-gradient(90deg, rgba(14,18,18,0.12) 0%, rgba(14,18,18,0.03) 40%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Diagonal studio light beam 2 */}
      <div 
        className={`absolute top-[40%] -left-[20%] w-[70vw] h-[120vh] mix-blend-soft-light rotate-[-25deg] ${
          isDark ? 'opacity-20' : 'opacity-25'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(94,156,147,0.4) 50%, rgba(255,255,255,0.2) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,1) 100%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
