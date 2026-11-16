import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { ReviewsSection } from '../sections/ReviewsSection';
import { StudioLighting } from '../components/StudioLighting';

export function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredReviews = REVIEWS.filter((r) => {
    if (selectedFilter === 'All') return true;
    return r.productColor === selectedFilter;
  });

  return (
    <div className="pt-28 md:pt-36 pb-24 relative">
      <StudioLighting tintColor="rgba(94, 156, 147, 0.12)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Real Studio Feedback
          </span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink dark:text-white mt-3">
            Acclaimed by producers, composers, and industrial designers.
          </h1>
          <p className="text-sm md:text-base text-muted dark:text-neutral-400 mt-4 leading-relaxed">
            Read unprompted observations from mastering facilities and creative studios across London, Copenhagen, Tokyo, and Los Angeles.
          </p>
        </div>

        {/* Pull Quote Carousel */}
        <ReviewsSection />

        {/* Detailed Review Cards Grid: Circular Liquid Glass Cards */}
        <div className="mt-20 pt-16 border-t border-ink/5 dark:border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl font-medium text-ink dark:text-white">All Verified Dispatches</h2>
            <div className="flex items-center gap-1.5 p-1 rounded-full liquid-pill">
              {['All', 'Midnight', 'Sky', 'Onyx', 'Mint'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedFilter(color)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedFilter === color
                      ? 'bg-ink dark:bg-white text-white dark:text-ink font-semibold'
                      : 'text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-8 rounded-[24px] liquid-glass shadow-liquid dark:shadow-liquid-dark flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={1.5} />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-muted dark:text-neutral-400">{rev.productColor} finish</span>
                  </div>

                  <h3 className="text-base md:text-lg font-medium text-ink dark:text-white mb-2">"{rev.headline}"</h3>
                  <p className="text-xs md:text-sm text-muted dark:text-neutral-300 leading-relaxed">{rev.content}</p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-ink/5 dark:border-white/10 mt-6">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/80 dark:border-white/20"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-ink dark:text-white">{rev.author}</h4>
                    <p className="text-[11px] text-muted dark:text-neutral-400">{rev.role}</p>
                  </div>
                  {rev.verified && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
