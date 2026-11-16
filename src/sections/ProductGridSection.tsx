import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { BRAND_CONFIG } from '../data/brand';

interface ProductGridSectionProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductGridSection({
  products,
  title = "Signature Finishes",
  subtitle = "Precision-milled aerospace aluminum paired with breathable acoustic mesh.",
}: ProductGridSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  const filters = ['All', 'Dark', 'Colour'];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  const handleQuickAdd = (p: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(p, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="products" className="py-24 md:py-32 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header and Liquid Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              The Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2">
              {title}
            </h2>
            <p className="text-sm text-muted dark:text-neutral-400 mt-2 max-w-lg">
              {subtitle}
            </p>
          </div>

          {/* Liquid Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full liquid-pill shadow-xs w-fit">
            {filters.map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  data-cursor={filter}
                  data-cursor-variant="button"
                  className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-ink dark:bg-white text-white dark:text-ink shadow-xs font-semibold'
                      : 'text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: Circular Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col justify-between p-7 rounded-[24px] liquid-glass hover:scale-[1.015] shadow-liquid dark:shadow-liquid-dark transition-all duration-500 ease-studio hover:-translate-y-1.5"
                >
                  {/* Top Bar: Color Dot & Tag */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                        style={{ backgroundColor: product.hex }}
                      />
                      <span className="text-xs uppercase tracking-widest font-semibold text-muted dark:text-neutral-400">
                        {product.colourName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted dark:text-neutral-400 font-mono">
                      <Star className="w-3 h-3 fill-accent text-accent" strokeWidth={1.5} />
                      <span>{product.rating}</span>
                      <span className="text-muted/60 dark:text-neutral-500">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Centered Headphone Display */}
                  <Link
                    to={`/products/${product.id}`}
                    data-cursor="View"
                    data-cursor-variant="product"
                    className="relative my-6 aspect-square w-full flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className="absolute inset-4 rounded-full opacity-20 dark:opacity-15 group-hover:opacity-40 dark:group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                      style={{ backgroundColor: product.hex }}
                    />

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500 ease-studio drop-shadow-studio mix-blend-multiply dark:mix-blend-normal dark:rounded-2xl"
                    />

                    <div className="absolute bottom-2 w-3/5 h-3 bg-ink/15 dark:bg-black/50 rounded-[100%] blur-md pointer-events-none" />
                  </Link>

                  {/* Bottom Info: Title, Description, Price, Quick Add */}
                  <div className="z-10 pt-4 border-t border-ink/5 dark:border-white/10">
                    <div>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-lg font-medium tracking-tight text-ink dark:text-white hover:text-accent transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-medium font-mono text-ink dark:text-white">
                          {BRAND_CONFIG.currencySymbol}{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono text-muted dark:text-neutral-500 line-through">
                            {BRAND_CONFIG.currencySymbol}{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="px-4 py-2 rounded-full text-xs font-medium text-ink dark:text-neutral-300 hover:text-accent hover:bg-white/80 dark:hover:bg-white/10 transition-colors flex items-center gap-1 border border-ink/5 dark:border-white/10"
                        >
                          <span>Specs</span>
                          <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                        </Link>

                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          data-cursor="Add"
                          data-cursor-variant="button"
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isAdded
                              ? 'bg-accent text-white scale-105'
                              : 'bg-ink dark:bg-white text-white dark:text-ink hover:bg-accent dark:hover:bg-accent dark:hover:text-white shadow-xs'
                          }`}
                          aria-label={`Quick add ${product.name} to bag`}
                        >
                          {isAdded ? (
                            <Check className="w-4 h-4" strokeWidth={1.5} />
                          ) : (
                            <Plus className="w-4 h-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
