import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "midnight",
    name: "VODOX Horizon — Midnight",
    colour: "Midnight",
    colourName: "Space Grey",
    category: "Dark",
    hex: "#383E45",
    accentTint: "rgba(56, 62, 69, 0.12)",
    price: 499,
    originalPrice: 549,
    shortDescription: "Anodized aerospace aluminum with acoustic mesh canopy in deep graphite tones.",
    story: "Machined from extruded anodized aluminum, the Midnight edition balances understated elegance with acoustic density. Calibrated for mastering engineers and discerning listeners who demand absolute sonic transparency.",
    image: "/images/midnight.jpg",
    heroImage: "/images/midnight.jpg",
    inStock: true,
    rating: 4.9,
    reviewsCount: 312,
    specs: {
      driver: "40mm Bespoke Titanium Composite Diaphragm",
      batteryLife: "40 Hours with ANC Active (Fast Charge 10m = 5h)",
      ancMode: "Hybrid Triple-Mic Inverted Acoustic Shielding",
      bluetooth: "Bluetooth 5.3 Low Energy + Multipoint",
      weight: "348 grams (balanced 50/50 lateral tension)",
      charging: "USB-C Fast Charging & Qi Inductive Dock",
      frequency: "5 Hz – 48,000 Hz Studio Resolution",
      codecs: "LDAC, aptX Adaptive, AAC, SBC",
    },
    features: [
      "Dynamic Head Tracking Spatial Audio",
      "Memory foam ear cushions with breathable weave",
      "Precision-machined digital crown for tactile control",
      "Dual ambient transparency beamforming microphones"
    ]
  },
  {
    id: "rose",
    name: "VODOX Horizon — Rose",
    colour: "Rose",
    colourName: "Warm Rose",
    category: "Colour",
    hex: "#C6827D",
    accentTint: "rgba(198, 130, 125, 0.12)",
    price: 499,
    shortDescription: "Soft brushed rose-gold housing with acoustic coral weave and memory cushion.",
    story: "Finished with a multi-stage micro-bead blast, Rose brings warm tactile warmth to minimalist audio hardware. The woven acoustic mesh headband disperses pressure evenly across the cranial arch for all-day listening sessions.",
    image: "/images/rose.jpg",
    heroImage: "/images/rose.jpg",
    inStock: true,
    rating: 4.9,
    reviewsCount: 184,
    specs: {
      driver: "40mm Bespoke Titanium Composite Diaphragm",
      batteryLife: "40 Hours with ANC Active (Fast Charge 10m = 5h)",
      ancMode: "Hybrid Triple-Mic Inverted Acoustic Shielding",
      bluetooth: "Bluetooth 5.3 Low Energy + Multipoint",
      weight: "348 grams (balanced 50/50 lateral tension)",
      charging: "USB-C Fast Charging & Qi Inductive Dock",
      frequency: "5 Hz – 48,000 Hz Studio Resolution",
      codecs: "LDAC, aptX Adaptive, AAC, SBC",
    },
    features: [
      "Dynamic Head Tracking Spatial Audio",
      "Memory foam ear cushions with breathable weave",
      "Precision-machined digital crown for tactile control",
      "Dual ambient transparency beamforming microphones"
    ]
  },
  {
    id: "sky",
    name: "VODOX Horizon — Sky",
    colour: "Sky",
    colourName: "Glacier Blue",
    category: "Colour",
    hex: "#627B8E",
    accentTint: "rgba(98, 123, 142, 0.14)",
    price: 529,
    originalPrice: 579,
    shortDescription: "Nordic arctic blue finish, paired with molded magnetic smart storage case.",
    story: "Inspired by glacial horizons and crisp arctic mornings. The Sky package includes our bespoke low-power smart case that puts Horizon into an ultra-preservation standby state instantly when stored.",
    image: "/images/sky.jpg",
    heroImage: "/images/sky.jpg",
    caseIncluded: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 247,
    specs: {
      driver: "40mm Bespoke Titanium Composite Diaphragm",
      batteryLife: "40 Hours with ANC Active (Fast Charge 10m = 5h)",
      ancMode: "Hybrid Triple-Mic Inverted Acoustic Shielding",
      bluetooth: "Bluetooth 5.3 Low Energy + Multipoint",
      weight: "348 grams (Smart Case adds 95g)",
      charging: "USB-C Fast Charging & Magnetic Smart Case Dock",
      frequency: "5 Hz – 48,000 Hz Studio Resolution",
      codecs: "LDAC, aptX Adaptive, AAC, SBC",
    },
    features: [
      "Includes Bespoke Magnetic Smart Travel Case",
      "Dynamic Head Tracking Spatial Audio",
      "Memory foam ear cushions with breathable weave",
      "Precision-machined digital crown for tactile control"
    ]
  },
  {
    id: "mint",
    name: "VODOX Horizon — Mint",
    colour: "Mint",
    colourName: "Sage Green",
    category: "Colour",
    hex: "#879B8C",
    accentTint: "rgba(135, 155, 140, 0.14)",
    price: 499,
    shortDescription: "Subtle sage green with matte ceramic coat and anti-resonance dampening chambers.",
    story: "A serene, organic palette that integrates seamlessly into natural studio workspaces. Engineered with internal Helmholtz resonance dampers that neutralize unwanted harmonic distortion in the sub-bass tier.",
    image: "/images/mint.jpg",
    heroImage: "/images/mint.jpg",
    inStock: true,
    rating: 4.8,
    reviewsCount: 168,
    specs: {
      driver: "40mm Bespoke Titanium Composite Diaphragm",
      batteryLife: "40 Hours with ANC Active (Fast Charge 10m = 5h)",
      ancMode: "Hybrid Triple-Mic Inverted Acoustic Shielding",
      bluetooth: "Bluetooth 5.3 Low Energy + Multipoint",
      weight: "348 grams (balanced 50/50 lateral tension)",
      charging: "USB-C Fast Charging & Qi Inductive Dock",
      frequency: "5 Hz – 48,000 Hz Studio Resolution",
      codecs: "LDAC, aptX Adaptive, AAC, SBC",
    },
    features: [
      "Acoustic Helmholtz Anti-Resonance Chambers",
      "Dynamic Head Tracking Spatial Audio",
      "Memory foam ear cushions with breathable weave",
      "Precision-machined digital crown for tactile control"
    ]
  },
  {
    id: "onyx",
    name: "VODOX Horizon — Onyx",
    colour: "Onyx",
    colourName: "Obsidian Black",
    category: "Dark",
    hex: "#1B1D1F",
    accentTint: "rgba(27, 29, 31, 0.16)",
    price: 499,
    shortDescription: "Deep matte black with DLC diamond-like carbon accents and stealth micro-perforations.",
    story: "The definitive studio flagship. Onyx is treated with a specialized vapor-deposited diamond-like carbon layer on critical stress points, providing scratch immunity and deep absorption of ambient light reflection.",
    image: "/images/onyx.jpg",
    heroImage: "/images/onyx.jpg",
    inStock: true,
    rating: 5.0,
    reviewsCount: 429,
    specs: {
      driver: "40mm Bespoke Titanium Composite Diaphragm",
      batteryLife: "40 Hours with ANC Active (Fast Charge 10m = 5h)",
      ancMode: "Hybrid Triple-Mic Inverted Acoustic Shielding",
      bluetooth: "Bluetooth 5.3 Low Energy + Multipoint",
      weight: "348 grams (balanced 50/50 lateral tension)",
      charging: "USB-C Fast Charging & Qi Inductive Dock",
      frequency: "5 Hz – 48,000 Hz Studio Resolution",
      codecs: "LDAC, aptX Adaptive, AAC, SBC",
    },
    features: [
      "Diamond-Like Carbon (DLC) Structural Coating",
      "Dynamic Head Tracking Spatial Audio",
      "Memory foam ear cushions with breathable weave",
      "Precision-machined digital crown for tactile control"
    ]
  }
];

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "Grammy-Nominated Mastering Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    verified: true,
    productColor: "Midnight",
    headline: "The acoustic transparency rivals my PMC studio monitors.",
    content: "Normally wireless ANC headphones compress the stereo soundstage and introduce phase smear in the lower mid-range. Horizon is the first pair where the sub-bass remains articulate and high-frequency decay feels genuinely organic.",
    date: "November 2024"
  },
  {
    id: "rev-2",
    author: "Marcus Lindqvist",
    role: "Industrial Design Lead, Studio Form",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    verified: true,
    productColor: "Sky",
    headline: "Finally, hardware that respects restraint and tactile honesty.",
    content: "The balance of weight across the cranial arch is perfection. No hot spots even after 8 hours of CAD modeling. The digital crown has real magnetic dampening that feels like high-end mechanical horology.",
    date: "October 2024"
  },
  {
    id: "rev-3",
    author: "Sarah Chen",
    role: "Film Score Composer, Los Angeles",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    verified: true,
    productColor: "Onyx",
    headline: "The noise cancellation creates an eerie, pristine silence.",
    content: "On flights between Tokyo and LA, the adaptive noise cancellation creates a pitch-black acoustic canvas. Orchestral quiet passages remain nuanced without the hiss characteristic of other flagship ANC models.",
    date: "October 2024"
  },
  {
    id: "rev-4",
    author: "Julian Vance",
    role: "Senior Audio Editor, Resonance Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    verified: true,
    productColor: "Mint",
    headline: "The microphone array makes conference calls feel in-room.",
    content: "Beyond the music performance, the beamforming mic algorithm rejects coffee shop background chatter so cleanly my clients assumed I was in an acoustically treated recording booth.",
    date: "September 2024"
  }
];

export const TECH_SPECS_FEATURES = [
  {
    id: "anc",
    title: "Adaptive Acoustic Shield",
    badge: "Active Cancellation",
    description: "Calculates external ambient noise 48,000 times per second, emitting precise anti-phase signals that dissipate distractions before they hit your tympanic membrane.",
    highlight: "-38dB",
    highlightLabel: "Peak Noise Attenuation",
    icon: "ShieldAlert"
  },
  {
    id: "transparency",
    title: "Natural Transparency Mode",
    badge: "Zero-Latency Acoustic Pass",
    description: "Inverted dual microphones capture external dialogue and directional cues, playing them back with zero phase lag so conversations feel as natural as unadorned hearing.",
    highlight: "<1.2ms",
    highlightLabel: "Latency Threshold",
    icon: "Radio"
  },
  {
    id: "spatial",
    title: "Spatial Soundstage with Head Tracking",
    badge: "Dynamic Gyro Array",
    description: "Internal 6-axis gyroscopes re-anchor sound in real 3D space. Turn your head and the sonic source stays fixed in your environment, mirroring the sensation of live performance.",
    highlight: "360°",
    highlightLabel: "Spherical Immersion",
    icon: "Compass"
  },
  {
    id: "battery",
    title: "40-Hour Continuous Endurance",
    badge: "High-Density Solid Chemistry",
    description: "Extended transcontinental battery life engineered to maintain full output voltage down to the last 2%. 10 minutes of fast charging yields 5 hours of lossless playback.",
    highlight: "40h",
    highlightLabel: "Continuous Playback",
    icon: "BatteryCharging"
  },
  {
    id: "pairing",
    title: "Seamless Multipoint Pairing",
    badge: "Bluetooth 5.3 LE Audio",
    description: "Intelligently hops between your laptop, tablet, and mobile without disconnection lag or missed notifications. Supports simultaneous dual-stream LDAC decoding.",
    highlight: "2 Devices",
    highlightLabel: "Instant Hand-off",
    icon: "Cpu"
  }
];
