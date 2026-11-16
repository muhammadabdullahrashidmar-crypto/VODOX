# VODOX — "Immerse Yourself"
### Award-Level Studio E-Commerce Landing Website

A handcrafted, high-fidelity landing experience for **VODOX Horizon Series** — premium over-ear wireless noise-cancelling headphones sold in 5 signature finishes. Designed with studio lighting aesthetics, frosted glass cards, smooth Lenis inertia scrolling, Framer Motion choreography, and a persistent Zustand cart drawer.

---

## 🎧 Live Experience Highlights

- **Hero Studio Stage**:
  - Mask-revealed giant typography (`clamp(3.5rem, 9vw, 9rem)`)
  - Floating headphone with depth-of-field settle, 6-second sine float, and desktop 3D cursor parallax tilt
  - Interactive **Mini Player glass pill** (play/pause audio sample, track skip, volume frequency dots, heart)
  - 5-finish color switcher dots (Midnight, Rose, Sky, Mint, Onyx) that shift ambient studio lighting tints in real-time
  - 3 frosted glass cards at the bottom (snap-scroll carousel on mobile)
- **Trust Marquee**: Ultra-smooth infinite marquee ticker with thin outlined typography.
- **Scroll-Driven Product Story**: Interactive perspective angle dial with callout pins and thin leader lines (*Mesh canopy headband, Aluminium frame, Digital crown dial, Memory-foam cushions*).
- **Product Grid**: Filter chips (*All, Dark, Colour*), hover lift with soft contact shadows, rating chips, and quick-add actions.
- **Technology Bento Grid**: Asymmetric cards featuring a counting-up **40-hour battery** counter, animated soundwave frequency graph, 360° spatial compass, and zero-latency transparency indicators.
- **Reviews Carousel**: Pull-quote carousel with verified-owner badges, star rows, and testimonial navigation.
- **Cart Drawer**: Slide-in cart with quantity steppers, subtotal calculator, free-shipping threshold bar, and celebration confetti upon checkout.
- **Custom Magnetic Cursor**: Physics-based desktop cursor with expanding product inspection rings (*View, Add, Explore*).
- **0.95s Studio Preloader**: Precision progress line and wordmark reveal.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18 + Vite** | Blazing-fast development server & optimized production rollup |
| **TypeScript** | Strict type safety for products, cart store, and component interfaces |
| **Tailwind CSS** | Custom design tokens only (no default stock palette in UI) |
| **Framer Motion** | Physics-based spring animations, layout transitions, route choreographies |
| **Lenis** | Studio-grade inertia smooth scrolling |
| **React Router v6** | Multi-page routing (`/`, `/products`, `/products/:id`, `/technology`, `/reviews`, `404`) |
| **Zustand** | Global cart store with quantity manipulation and `localStorage` persistence |
| **Lucide Icons** | Ultra-thin 1.5px stroke icons |
| **Canvas Confetti** | Checkout delightful celebration micro-interaction |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled, minified bundle will be generated in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 How to Customize Brand, Colors & Products in One Place

### 1. Changing Brand Name & Taglines
Open `src/data/brand.ts`:
```typescript
export const BRAND_CONFIG = {
  name: "VODOX", // <-- Change to your brand name
  tagline: "Immerse Yourself.",
  subtagline: "Studio acoustic engineering meets sculpted industrial ergonomics.",
  productLine: "Horizon ANC Series",
  currencySymbol: "$",
  shippingThreshold: 150, // Free shipping milestone
  // ...
};
```
Every component (Navbar, Hero, Preloader, Footer, Cart, Metadata) reads from this configuration automatically.

### 2. Changing Design Tokens (Colors, Glass, Shadows)
Open `src/design-tokens.ts` and `tailwind.config.js`:
- `--bg`: Studio grey-to-white gradient (`#EEF1F1` to `#FFFFFF`)
- `--ink`: Near-black (`#0E1212`, never pure `#000`)
- `--muted`: Refined neutral (`#6B7676`)
- `--accent`: Scandinavian muted teal (`#5E9C93`)
- `--glass`: `rgba(255, 255, 255, 0.55)` with 20px backdrop blur and 1px border

### 3. Adding or Updating Products & Finishes
Open `src/data/products.ts`:
```typescript
{
  id: "midnight",
  name: "VODOX Horizon — Midnight",
  colour: "Midnight",
  colourName: "Space Grey",
  category: "Dark",
  hex: "#383E45",
  accentTint: "rgba(56, 62, 69, 0.12)",
  price: 499,
  shortDescription: "Anodized aerospace aluminum with acoustic mesh canopy...",
  image: "/images/midnight.jpg",
  specs: { ... }
}
```
All 5 finishes are fully functional in the Hero switcher, the Product Grid, the Product Detail deep-dive page, and the Cart Drawer.

---

## 📱 Responsive Testing Matrix

The layout is built mobile-first and tested to ensure zero horizontal scroll across:
- **360px & 390px** (Mobile portrait): Vertical hero stack, touch targets ≥ 44px, full-screen mobile menu with staggered link reveals, horizontal snap-scroll card carousel.
- **768px** (Tablet): 2-column bento & product grid, touch-friendly stepper controls.
- **1024px** (Laptop): 3-column asymmetric layout, interactive mini player, 3D mouse parallax tilt.
- **1280px & 1440px** (Desktop studio): 12-column grid capped at 1440px, magnetic buttons, custom cursor.
- **1920px & Ultrawide**: Seamlessly centered studio gradient with ambient diagonal lighting beams.

---

## ♿ Accessibility & Performance

- **Semantic HTML5** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- **Keyboard Navigation** & visible focus rings (`focus-visible:ring-accent`)
- **Reduced Motion Support**: Automatically disables parallax tilt, custom cursor, and heavy animations when `prefers-reduced-motion` is detected.
- **Zero CLS & Preloaded Fonts**: Web-safe fallbacks, preconnect to Google Fonts for Inter Tight.
