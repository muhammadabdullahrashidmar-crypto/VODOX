import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { StudioLighting } from '../components/StudioLighting';
import { HeroSection } from '../sections/HeroSection';
import { TrustMarquee } from '../sections/TrustMarquee';
import { ProductStorySection } from '../sections/ProductStorySection';
import { ProductGridSection } from '../sections/ProductGridSection';
import { TechnologySection } from '../sections/TechnologySection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { CtaBannerSection } from '../sections/CtaBannerSection';

export function HomePage() {
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);

  const handleExploreClick = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Studio Lighting with dynamic ambient color shift matching selected headphone */}
      <StudioLighting tintColor={activeProduct.accentTint} />

      {/* Main Sections */}
      <div className="relative z-10">
        <HeroSection
          products={PRODUCTS}
          activeProduct={activeProduct}
          onSelectProduct={(p) => setActiveProduct(p)}
          onExploreClick={handleExploreClick}
        />

        <TrustMarquee />

        <ProductStorySection product={activeProduct} />

        <ProductGridSection products={PRODUCTS} />

        <TechnologySection />

        <ReviewsSection />

        <CtaBannerSection />
      </div>
    </div>
  );
}
