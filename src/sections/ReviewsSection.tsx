import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Critiques & Endorsements
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2">
              Trusted by those who mix the world.
            </h2>
          </div>

          {/* Liquid Nav Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              data-cursor="Prev"
              data-cursor-variant="button"
              className="p-3 rounded-full liquid-pill text-ink dark:text-white hover:scale-105 transition-all shadow-xs active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="text-xs font-mono text-muted dark:text-neutral-400 px-3">
              0{currentIndex + 1} / 0{REVIEWS.length}
            </span>
            <button
              onClick={next}
              data-cursor="Next"
              data-cursor-variant="button"
              className="p-3 rounded-full liquid-pill text-ink dark:text-white hover:scale-105 transition-all shadow-xs active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Big Liquid Glass Editorial Quote Card */}
        <div className="relative rounded-[28px] liquid-glass p-8 md:p-14 min-h-[400px] flex flex-col justify-between shadow-liquid dark:shadow-liquid-dark">
          <Quote className="w-14 h-14 text-accent/20 absolute top-8 right-8 pointer-events-none" strokeWidth={1} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" strokeWidth={1.5} />
                  ))}
                </div>
                {currentReview.verified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Verified Studio Owner</span>
                  </span>
                )}
                <span className="text-xs text-muted dark:text-neutral-400 font-mono hidden sm:inline">
                  {currentReview.productColor} Edition
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink dark:text-white leading-snug">
                "{currentReview.headline}"
              </h3>

              {/* Body Content */}
              <p className="text-base text-muted dark:text-neutral-300 max-w-3xl leading-relaxed">
                {currentReview.content}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Author Meta */}
          <div className="flex items-center gap-4 pt-6 border-t border-ink/5 dark:border-white/10 mt-8">
            <img
              src={currentReview.avatar}
              alt={currentReview.author}
              className="w-11 h-11 rounded-full object-cover border border-white/80 dark:border-white/20 shadow-xs"
            />
            <div>
              <h4 className="text-sm font-semibold text-ink dark:text-white">{currentReview.author}</h4>
              <p className="text-xs text-muted dark:text-neutral-400">{currentReview.role}</p>
            </div>
            <span className="ml-auto text-xs font-mono text-muted/60 dark:text-neutral-500">
              {currentReview.date}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
