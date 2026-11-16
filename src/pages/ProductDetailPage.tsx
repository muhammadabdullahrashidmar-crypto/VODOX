import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { StudioLighting } from '../components/StudioLighting';
import { BRAND_CONFIG } from '../data/brand';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 relative min-h-screen">
      <StudioLighting tintColor={product.accentTint} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted dark:text-neutral-400 hover:text-ink dark:hover:text-white font-semibold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Back to Collection</span>
        </Link>

        {/* Product Layout: Circular Liquid Glass Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Product Studio Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-xl rounded-[28px] liquid-glass shadow-liquid dark:shadow-liquid-dark flex items-center justify-center p-8 select-none overflow-hidden dark:bg-white/[0.06]">
              <div
                className="absolute inset-10 rounded-full opacity-25 dark:opacity-45 blur-3xl"
                style={{ backgroundColor: product.hex }}
              />

              <motion.img
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                src={product.heroImage}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain drop-shadow-studio relative z-10 mix-blend-multiply dark:mix-blend-normal dark:rounded-2xl"
              />

              <div className="absolute bottom-8 w-2/3 h-5 bg-ink/15 dark:bg-black/60 rounded-[100%] blur-xl pointer-events-none" />
            </div>

            {/* Circular Finish Switcher Pill */}
            <div className="flex items-center gap-3 mt-6 p-2 rounded-full liquid-pill shadow-xs">
              <span className="text-xs uppercase tracking-wider text-muted dark:text-neutral-400 font-medium px-2">
                Finishes:
              </span>
              {PRODUCTS.map((p) => {
                const isSelected = p.id === product.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/products/${p.id}`)}
                    className={`relative p-1 rounded-full transition-transform ${
                      isSelected ? 'scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    title={p.colour}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full border-[1.5px] border-ink dark:border-white" />
                    )}
                    <span
                      className="block w-4 h-4 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                      style={{ backgroundColor: p.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Title, Story, Specs, Buy Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
                  {BRAND_CONFIG.name} · {product.colourName}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted dark:text-neutral-400 font-mono">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={1.5} />
                  <span>{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-mono font-medium text-ink dark:text-white">
                  {BRAND_CONFIG.currencySymbol}{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base font-mono text-muted dark:text-neutral-500 line-through">
                    {BRAND_CONFIG.currencySymbol}{product.originalPrice}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wider font-semibold text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 ml-2">
                  In Stock & Ready
                </span>
              </div>
            </div>

            {/* Description & Story */}
            <div className="space-y-3 text-sm text-muted dark:text-neutral-300 leading-relaxed border-t border-ink/5 dark:border-white/10 pt-6">
              <p>{product.shortDescription}</p>
              <p>{product.story}</p>
            </div>

            {/* Key Acoustic Features */}
            <div className="space-y-2 border-t border-ink/5 dark:border-white/10 pt-6">
              <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white mb-3">
                Signature Features
              </span>
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-ink/85 dark:text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" strokeWidth={1.5} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Circular Liquid Action Panel: Quantity + Add to Bag Button */}
            <div className="p-6 rounded-[24px] liquid-glass shadow-liquid dark:shadow-liquid-dark space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted dark:text-neutral-400">
                  Quantity
                </span>
                <div className="flex items-center rounded-full border border-ink/10 dark:border-white/15 bg-bg dark:bg-black/30 px-3 py-1 gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-muted hover:text-ink dark:hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="font-mono text-sm font-medium text-ink dark:text-white min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-muted hover:text-ink dark:hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                data-cursor="Add"
                data-cursor-variant="button"
                className={`w-full py-4 px-6 rounded-full text-white font-medium text-sm transition-all duration-300 ease-studio flex items-center justify-center gap-2.5 shadow-studio ${
                  isAdded
                    ? 'bg-accent'
                    : 'bg-ink dark:bg-white text-white dark:text-ink hover:bg-accent dark:hover:bg-accent dark:hover:text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={1.5} />
                    <span>Added to Acoustic Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                    <span>Add to Bag · {BRAND_CONFIG.currencySymbol}{product.price * quantity}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-muted dark:text-neutral-400 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  <span>Express Courier</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  <span>30-Day Trial</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Acoustic Specifications: Rounded Matrix */}
            <div className="border-t border-ink/5 dark:border-white/10 pt-6 space-y-3">
              <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white">
                Laboratory Specifications
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">Acoustic Driver</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.driver}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">Battery Life</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.batteryLife}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">Frequency Band</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.frequency}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">Lossless Codecs</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.codecs}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">Mass</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.weight}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/10">
                  <span className="text-muted dark:text-neutral-500 block text-[10px] uppercase">ANC Mode</span>
                  <span className="font-medium text-ink dark:text-white mt-0.5 block">{product.specs.ancMode}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
