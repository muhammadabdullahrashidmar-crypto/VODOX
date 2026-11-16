import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useThemeStore } from './store/useThemeStore';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const location = useLocation();
  const theme = useThemeStore((state) => state.theme);

  // Sync theme class to documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialize Lenis smooth scroll
  useLenisScroll();

  return (
    <div className="min-h-screen bg-[#EEF1F1] dark:bg-[#0A0C0D] text-ink dark:text-neutral-100 relative selection:bg-accent selection:text-white transition-colors duration-500">
      {/* 0.95s studio preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Custom magnetic cursor (desktop only) */}
      <CustomCursor />

      {/* Global Scroll to Top */}
      <ScrollToTop />

      {/* Navigation Header with Dark Mode Toggle */}
      <Navbar />

      {/* Slide-in Cart Drawer */}
      <CartDrawer />

      {/* Animated Route Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Branded Footer */}
      <Footer />
    </div>
  );
}

export default App;
