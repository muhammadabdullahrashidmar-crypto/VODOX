import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useThemeStore } from '../store/useThemeStore';
import { BRAND_CONFIG } from '../data/brand';
import { useMagnetic } from '../hooks/useMagnetic';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalCount = useCartStore((state) => state.getTotalCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const shopBtnRef = useMagnetic(0.2);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Technology', href: '/technology' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-studio ${
          isScrolled
            ? 'py-3.5 bg-white/70 dark:bg-[#0B0D0E]/80 backdrop-blur-[24px] border-b border-white/80 dark:border-white/10 shadow-studio-sm'
            : 'py-5 md:py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Left */}
          <Link
            to="/"
            className="group flex items-center gap-2 text-2xl font-medium tracking-[-0.04em] text-ink dark:text-white select-none relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <span>{BRAND_CONFIG.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Links Center: Liquid Glass Nav Pill */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-pill">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-ink dark:text-white font-semibold'
                      : 'text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navLiquidPill"
                      className="absolute inset-0 bg-white/90 dark:bg-white/15 rounded-full shadow-xs border border-white/80 dark:border-white/20"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Dark Mode Switcher + Liquid Glass Shop Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button: Circular Liquid Glass */}
            <button
              onClick={toggleTheme}
              data-cursor={isDark ? 'Light' : 'Dark'}
              data-cursor-variant="button"
              className="p-2.5 rounded-full liquid-pill text-ink dark:text-white hover:scale-105 active:scale-95 transition-all focus:outline-none"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-accent" strokeWidth={1.5} />
              ) : (
                <Moon className="w-4 h-4 text-ink" strokeWidth={1.5} />
              )}
            </button>

            {/* Outlined Pill Shop Button with Liquid Sheen */}
            <button
              ref={shopBtnRef as any}
              onClick={toggleCart}
              data-cursor="Cart"
              data-cursor-variant="button"
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full liquid-pill hover:scale-[1.02] text-ink dark:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-studio active:scale-95 focus:outline-none"
              aria-label={`Open shopping cart with ${totalCount} items`}
            >
              <span className="tracking-widest">Shop</span>
              <div className="relative">
                <ShoppingBag className="w-3.5 h-3.5 text-ink/80 dark:text-white/80 group-hover:text-ink dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                {totalCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-accent text-white text-[9px] font-mono font-semibold flex items-center justify-center shadow-xs"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full liquid-pill text-ink dark:text-white hover:scale-105 transition-all focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with Staggered Reveals */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#EEF1F1]/95 dark:bg-[#0A0C0D]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between px-8 pt-28 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center justify-between border-b border-ink/10 dark:border-white/10 pb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted dark:text-neutral-400 font-semibold">
                  Navigation
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink dark:text-white px-3 py-1.5 rounded-full liquid-pill"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light' : 'Dark'} Mode</span>
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * idx, duration: 0.4 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between text-2xl font-medium tracking-tight py-3 border-b border-ink/5 dark:border-white/5 ${
                          isActive ? 'text-accent' : 'text-ink dark:text-white hover:text-accent'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-40" strokeWidth={1.5} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-ink/10 dark:border-white/10 relative z-10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  toggleCart();
                }}
                className="w-full py-4 px-6 rounded-full bg-accent text-white font-medium text-xs uppercase tracking-widest text-center shadow-studio flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                <span>Open Cart ({totalCount})</span>
              </button>

              <div className="flex justify-between items-center text-xs text-muted dark:text-neutral-500 pt-2">
                <span>{BRAND_CONFIG.tagline}</span>
                <span>Flagship Wireless ANC</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
