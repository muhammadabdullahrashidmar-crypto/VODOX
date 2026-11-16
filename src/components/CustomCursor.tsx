import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'product' | 'button'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for studio feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        const variant = (cursorTarget.getAttribute('data-cursor-variant') as any) || 'hover';
        setCursorText(text);
        setCursorVariant(variant);
        return;
      }

      // Check standard interactive elements
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        setCursorText('');
        setCursorVariant('button');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-ink mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorVariant === 'default' ? 6 : 0,
          height: cursorVariant === 'default' ? 6 : 0,
          opacity: cursorVariant === 'default' ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />

      {/* Floating magnetic ring / label bubble */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full text-[11px] font-medium tracking-wider uppercase backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'product' ? 72 : cursorVariant === 'button' ? 42 : 24,
          height: cursorVariant === 'product' ? 72 : cursorVariant === 'button' ? 42 : 24,
          backgroundColor: cursorVariant === 'product' ? 'rgba(14, 18, 18, 0.88)' : 'rgba(94, 156, 147, 0.12)',
          borderColor: cursorVariant === 'product' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(94, 156, 147, 0.5)',
          borderWidth: cursorVariant === 'default' ? 1 : 1.5,
          color: cursorVariant === 'product' ? '#FFFFFF' : '#0E1212',
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tracking-widest font-semibold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
