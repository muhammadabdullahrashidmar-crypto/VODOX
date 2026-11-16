import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGridSection } from '../sections/ProductGridSection';
import { StudioLighting } from '../components/StudioLighting';
import { Check } from 'lucide-react';

export function ProductsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 relative">
      <StudioLighting tintColor="rgba(94, 156, 147, 0.12)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold font-mono">
            VODOX Acoustic Lineup
          </span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink dark:text-white mt-3">
            Five signature finishes. One uncompromised acoustic driver.
          </h1>
          <p className="text-sm md:text-base text-muted dark:text-neutral-400 mt-4 leading-relaxed">
            Every Horizon headphone features identical bespoke 40mm titanium composite diaphragms, 48kHz sampling processors, and balanced lateral arch tension.
          </p>
        </div>

        {/* Product Grid */}
        <ProductGridSection
          products={PRODUCTS}
          title="Browse All Editions"
          subtitle="Select your preferred exterior aesthetic. All models include wireless fast-charging."
        />

        {/* Technical Comparison Matrix - Rounded Liquid Glass Table */}
        <div className="mt-24 pt-16 border-t border-ink/5 dark:border-white/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.18em] text-muted dark:text-neutral-400 font-semibold font-mono">
              Side-by-Side Reference
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink dark:text-white mt-1">
              Architecture Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm rounded-[24px] liquid-glass overflow-hidden shadow-liquid dark:shadow-liquid-dark">
              <thead>
                <tr className="border-b border-ink/5 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-muted dark:text-neutral-400 bg-white/40 dark:bg-white/[0.04]">
                  <th className="p-4 md:p-5 font-semibold">Edition</th>
                  <th className="p-4 md:p-5 font-semibold">Finish / Material</th>
                  <th className="p-4 md:p-5 font-semibold">Smart Case</th>
                  <th className="p-4 md:p-5 font-semibold">Battery Reserve</th>
                  <th className="p-4 md:p-5 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5 dark:divide-white/5 text-ink dark:text-white">
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="hover:bg-white/80 dark:hover:bg-white/[0.06] transition-colors">
                    <td className="p-4 md:p-5 font-medium flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span>{p.name.replace('VODOX Horizon — ', '')}</span>
                    </td>
                    <td className="p-4 md:p-5 text-muted dark:text-neutral-400 font-mono text-xs">{p.colourName} Anodized</td>
                    <td className="p-4 md:p-5">
                      {p.caseIncluded ? (
                        <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                          <Check className="w-3.5 h-3.5" /> Included
                        </span>
                      ) : (
                        <span className="text-xs text-muted dark:text-neutral-500">Acoustic Pouch</span>
                      )}
                    </td>
                    <td className="p-4 md:p-5 font-mono text-muted dark:text-neutral-400 text-xs">40 Hours ANC</td>
                    <td className="p-4 md:p-5 font-mono font-medium">${p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
