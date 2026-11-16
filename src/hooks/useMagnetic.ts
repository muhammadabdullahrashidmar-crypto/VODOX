import { useRef, useEffect } from 'react';

export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if device supports hover and pointer is fine
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = 'translate3d(0px, 0px, 0)';
    };

    el.addEventListener('mousemove', handleMouseMove as EventListener);
    el.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [strength]);

  return ref;
}
