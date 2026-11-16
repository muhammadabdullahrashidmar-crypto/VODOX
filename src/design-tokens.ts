/**
 * VODOX Design System Tokens
 * ==========================
 * Single source of truth for brand, color palette, typography, and studio lighting tokens.
 * Modifying values in this file or `src/data/brand.ts` will propagate across the entire application.
 */

export const DESIGN_TOKENS = {
  brand: {
    name: 'VODOX',
    tagline: 'Immerse Yourself.',
    subtagline: 'Studio acoustic engineering meets sculpted industrial ergonomics.',
    productLine: 'Horizon ANC Series',
  },

  colors: {
    // Canvas & Studio Lighting
    bg: {
      light: '#FFFFFF',
      DEFAULT: '#F5F7F7',
      deep: '#EEF1F1',
      gradient: 'linear-gradient(135deg, #EEF1F1 0%, #FFFFFF 100%)',
    },
    // Typography & Ink
    ink: {
      DEFAULT: '#0E1212', // Near-black, never pure #000
      light: '#202626',
      deep: '#070A0A',
    },
    // Subtext & Structural Details
    muted: {
      DEFAULT: '#6B7676',
      light: '#8E9999',
      deep: '#4E5757',
    },
    // Interactive Accent (Pill buttons, badges, active dots)
    accent: {
      DEFAULT: '#5E9C93', // Muted Scandinavian teal-green
      hover: '#528B83',
      soft: '#EAF3F2',
      glow: 'rgba(94, 156, 147, 0.25)',
    },
    // Frosted Glass Layering
    glass: {
      surface: 'rgba(255, 255, 255, 0.55)',
      border: 'rgba(255, 255, 255, 0.70)',
      blur: '20px',
    },
  },

  finishes: [
    { id: 'midnight', name: 'Midnight', colourName: 'Space Grey', hex: '#383E45', ambientTint: 'rgba(56, 62, 69, 0.12)' },
    { id: 'rose', name: 'Rose', colourName: 'Warm Rose', hex: '#C6827D', ambientTint: 'rgba(198, 130, 125, 0.12)' },
    { id: 'sky', name: 'Sky', colourName: 'Glacier Blue', hex: '#627B8E', ambientTint: 'rgba(98, 123, 142, 0.14)' },
    { id: 'mint', name: 'Mint', colourName: 'Sage Green', hex: '#879B8C', ambientTint: 'rgba(135, 155, 140, 0.14)' },
    { id: 'onyx', name: 'Onyx', colourName: 'Obsidian Black', hex: '#1B1D1F', ambientTint: 'rgba(27, 29, 31, 0.16)' },
  ],

  typography: {
    fontFamily: '"Inter Tight", Inter, Manrope, -apple-system, sans-serif',
    headline: {
      size: 'clamp(3.5rem, 9vw, 9rem)',
      weight: 500,
      tracking: '-0.04em',
      lineHeight: 0.95,
    },
    body: {
      size: '16px',
      weight: 400,
      lineHeight: 1.6,
    },
    eyebrow: {
      size: '11px',
      weight: 600,
      tracking: '0.14em',
      textTransform: 'uppercase' as const,
    },
  },

  radii: {
    pill: '9999px',
    card: '28px',
    container: '32px',
  },

  shadows: {
    glass: '0 8px 32px 0 rgba(14, 18, 18, 0.05), 0 1px 2px 0 rgba(14, 18, 18, 0.02)',
    studio: '0 25px 50px -12px rgba(14, 18, 18, 0.12), 0 12px 24px -8px rgba(14, 18, 18, 0.06), 0 4px 6px -2px rgba(14, 18, 18, 0.03)',
  },

  animation: {
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    duration: '0.75s',
  },
} as const;

export default DESIGN_TOKENS;
