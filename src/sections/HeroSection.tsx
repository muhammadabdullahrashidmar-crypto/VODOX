import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Play, Pause, SkipForward, Heart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useThemeStore } from '../store/useThemeStore';
import { BRAND_CONFIG } from '../data/brand';
import { useMagnetic } from '../hooks/useMagnetic';

interface HeroSectionProps {
  products: Product[];
  activeProduct: Product;
  onSelectProduct: (product: Product) => void;
  onExploreClick: () => void;
}

export function HeroSection({
  products,
  activeProduct,
  onSelectProduct,
  onExploreClick,
}: HeroSectionProps) {
  const addItem = useCartStore((state) => state.addItem);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  // Parallax tilt state for desktop
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Interactive Mini Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [addedCardId, setAddedCardId] = useState<string | null>(null);

  const exploreBtnRef = useMagnetic(0.2);
  const plusBtnRef = useMagnetic(0.3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);

    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringHero(false);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedCardId(product.id);
    setTimeout(() => setAddedCardId(null), 1800);
  };

  const bottomCards = products.slice(0, 3);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] lg:min-h-screen pt-24 lg:pt-28 pb-8 lg:pb-12 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        
        {/* Main Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center pt-2 md:pt-4 flex-1">
          
          {/* Left Column: Headline & Action Buttons (cols 1..6) */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center">
            
            {/* Liquid Glass Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill w-fit mb-4 lg:mb-5 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted dark:text-neutral-300">
                {BRAND_CONFIG.productLine}
              </span>
            </motion.div>

            {/* Giant Two-Line Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#0E1212] dark:text-white font-semibold tracking-[-0.04em] leading-[0.92] select-none text-[clamp(3.2rem,7vw,7.2rem)]"
                style={{ textShadow: '0 2px 12px rgba(14, 18, 18, 0.08)' }}
              >
                Immerse
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6 lg:mb-8">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#0E1212] dark:text-white font-semibold tracking-[-0.04em] leading-[0.92] select-none text-[clamp(3.2rem,7vw,7.2rem)]"
                style={{ textShadow: '0 2px 12px rgba(14, 18, 18, 0.08)' }}
              >
                Yourself
              </motion.h1>
            </div>

            {/* Action Buttons: Filled Teal Pill + Circular Outlined + */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 flex-wrap"
            >
              {/* Teal Pill Explore Button */}
              <button
                ref={exploreBtnRef as any}
                onClick={onExploreClick}
                data-cursor="Discover"
                data-cursor-variant="button"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all duration-300 ease-studio shadow-studio hover:shadow-accent-glow active:scale-95 focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
                <span className="tracking-tight text-sm font-normal">Explore</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>

              {/* Circular Outlined Plus Button with Liquid Glass */}
              <button
                ref={plusBtnRef as any}
                onClick={() => addItem(activeProduct, 1)}
                data-cursor="Quick Add"
                data-cursor-variant="button"
                className="group p-3.5 rounded-full liquid-pill text-ink dark:text-white hover:scale-105 transition-all duration-300 ease-studio active:scale-95 shadow-xs focus:outline-none"
                aria-label={`Add ${activeProduct.name} to cart`}
              >
                <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" strokeWidth={1.5} />
              </button>

              <div className="hidden sm:flex flex-col ml-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink dark:text-white">
                  {activeProduct.colourName}
                </span>
                <span className="text-xs text-muted dark:text-neutral-400 font-mono">
                  {BRAND_CONFIG.currencySymbol}{activeProduct.price} · Studio Stock
                </span>
              </div>
            </motion.div>

            {/* Circular Colour Switcher Dots with Smooth Pill Track */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-3 mt-6 pt-4 border-t border-ink/5 dark:border-white/10"
            >
              <span className="text-xs uppercase tracking-[0.16em] text-muted dark:text-neutral-400 font-medium mr-1">
                Finishes
              </span>
              {products.map((p) => {
                const isSelected = p.id === activeProduct.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    data-cursor={p.colour}
                    data-cursor-variant="button"
                    className={`relative p-1 rounded-full transition-all duration-300 focus:outline-none ${
                      isSelected ? 'scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Select ${p.colour} finish`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeColorRingLiquid"
                        className="absolute inset-0 rounded-full border-[1.5px] border-ink dark:border-white"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}
                    <span
                      className="block w-4 h-4 rounded-full shadow-inner border border-black/10 dark:border-white/20"
                      style={{ backgroundColor: p.hex }}
                    />
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Center-Right Column: Floating Headphone with Parallax and Sine Bob (cols 7..11) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            
            {/* Soft Elliptical Contact Shadow Underneath Headphone */}
            <motion.div
              animate={{
                scale: isHoveringHero ? [0.95, 1.05, 0.95] : [1, 1.08, 1],
                opacity: isDark ? [0.4, 0.25, 0.4] : [0.22, 0.16, 0.22],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute bottom-4 w-3/4 max-w-[320px] h-8 rounded-[100%] blur-2xl pointer-events-none ${
                isDark ? 'bg-black' : 'bg-ink/25'
              }`}
            />

            {/* Large Floating Headphone Image */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateX: tilt.y,
                rotateY: tilt.x,
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { type: 'spring', damping: 18, stiffness: 120 },
                rotateY: { type: 'spring', damping: 18, stiffness: 120 },
              }}
              className="relative w-full max-w-[380px] lg:max-w-[420px] aspect-square flex items-center justify-center select-none"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <img
                    src={activeProduct.heroImage}
                    alt={`${activeProduct.name} in ${activeProduct.colour}`}
                    loading="eager"
                    className="w-full h-full object-contain drop-shadow-studio mix-blend-multiply dark:mix-blend-normal dark:rounded-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Far Right Column: Liquid Glass Mini Player Vertical Pill - Desktop Only */}
          <div className="hidden lg:flex lg:col-span-1 justify-end items-center z-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 px-3 rounded-full liquid-glass flex flex-col items-center gap-5 shadow-liquid dark:shadow-liquid-dark"
            >
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-ink dark:bg-white text-white dark:text-ink flex items-center justify-center hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-colors shadow-xs active:scale-90"
                aria-label={isPlaying ? 'Pause sample' : 'Play acoustic sample'}
                title={isPlaying ? 'Pause acoustic sample' : 'Play acoustic sample'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" strokeWidth={1.5} />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" strokeWidth={1.5} />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={() => {
                  const nextIdx = (products.findIndex((p) => p.id === activeProduct.id) + 1) % products.length;
                  onSelectProduct(products[nextIdx]);
                }}
                className="p-2 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white transition-colors"
                aria-label="Next soundscape finish"
                title="Next soundscape finish"
              >
                <SkipForward className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* Animated Volume Indicator */}
              <div className="flex flex-col items-center gap-1.5 py-1">
                {[1, 2, 3, 4].map((dot, idx) => (
                  <motion.span
                    key={dot}
                    animate={
                      isPlaying
                        ? { scaleY: [1, 2.4, 1], opacity: [0.4, 1, 0.4] }
                        : { scaleY: 1, opacity: idx === 1 ? 0.9 : 0.3 }
                    }
                    transition={{
                      duration: 0.6 + idx * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-1 h-2 rounded-full bg-accent"
                  />
                ))}
              </div>

              {/* Heart Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 transition-colors ${
                  isLiked ? 'text-accent' : 'text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white'
                }`}
                aria-label={isLiked ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent text-accent' : ''}`} strokeWidth={1.5} />
              </button>

              {/* Vertical Rotated Text */}
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted dark:text-neutral-400 font-mono [writing-mode:vertical-rl] rotate-180 opacity-70">
                Spatial 96k
              </span>
            </motion.div>
          </div>

        </div>

        {/* Bottom of Hero: Three Liquid Glass Product Cards */}
        <div className="mt-8 lg:mt-10 pt-4 lg:pt-6 border-t border-ink/5 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.16em] text-muted dark:text-neutral-400 font-semibold">
              Signature Editions
            </span>
            <span className="text-xs text-muted dark:text-neutral-500 font-mono hidden sm:block">
              Free Express Worldwide Courier
            </span>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 scrollbar-none">
            {bottomCards.map((product) => {
              const isAdded = addedCardId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  data-cursor="Select"
                  data-cursor-variant="button"
                  className={`group relative snap-start min-w-[260px] sm:min-w-0 p-4 md:p-5 rounded-[22px] liquid-glass hover:scale-[1.01] transition-all duration-300 ease-studio flex items-center justify-between gap-3 cursor-pointer ${
                    activeProduct.id === product.id ? 'ring-1 ring-accent/70' : ''
                  }`}
                >
                  {/* Status Indicator Dot */}
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-pulse" />

                  {/* Left: Thumbnail with soft organic container */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white dark:bg-white/90 flex items-center justify-center p-1 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Right: Info + Quick Add */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-xs md:text-sm font-medium text-ink dark:text-white truncate">
                      {product.name.replace('VODOX Horizon — ', '')}
                    </h3>
                    <p className="text-[11px] text-muted dark:text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-ink/5 dark:border-white/5">
                      <span className="text-xs font-mono font-medium text-ink dark:text-white">
                        {BRAND_CONFIG.currencySymbol}{product.price}
                      </span>
                    </div>
                  </div>

                  {/* Round + Add to Cart Button */}
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    data-cursor="Add"
                    data-cursor-variant="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      isAdded
                        ? 'bg-accent text-white scale-105'
                        : 'bg-white dark:bg-white/10 border border-ink/10 dark:border-white/15 text-ink dark:text-white hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink shadow-xs'
                    }`}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
