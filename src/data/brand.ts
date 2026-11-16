export interface BrandConfig {
  name: string;
  tagline: string;
  subtagline: string;
  productLine: string;
  currency: string;
  currencySymbol: string;
  shippingThreshold: number;
  tokens: {
    bg: string;
    ink: string;
    muted: string;
    accent: string;
    glass: string;
  };
  contact: {
    email: string;
    support: string;
    address: string;
  };
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
    spotify: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: "VODOX",
  tagline: "Immerse Yourself.",
  subtagline: "Studio acoustic engineering meets sculpted industrial ergonomics.",
  productLine: "Horizon ANC Series",
  currency: "USD",
  currencySymbol: "$",
  shippingThreshold: 150,
  tokens: {
    bg: "linear-gradient(135deg, #EEF1F1 0%, #FFFFFF 100%)",
    ink: "#0E1212",
    muted: "#6B7676",
    accent: "#5E9C93",
    glass: "rgba(255, 255, 255, 0.55)",
  },
  contact: {
    email: "concierge@vodox-audio.com",
    support: "+1 (800) 843-8636",
    address: "Studio 4, Atelier Quarter, 1012 Copenhagen",
  },
  socials: {
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    spotify: "https://spotify.com",
  },
};
