export interface ProductSpec {
  driver: string;
  batteryLife: string;
  ancMode: string;
  bluetooth: string;
  weight: string;
  charging: string;
  frequency: string;
  codecs: string;
}

export type ProductColorCategory = "Dark" | "Light" | "Colour";

export interface Product {
  id: string;
  name: string;
  colour: string;
  colourName: string;
  category: ProductColorCategory;
  hex: string;
  accentTint: string; // for ambient background lighting shift
  price: number;
  originalPrice?: number;
  shortDescription: string;
  story: string;
  image: string;
  heroImage: string;
  caseIncluded?: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  specs: ProductSpec;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  verified: boolean;
  productColor: string;
  headline: string;
  content: string;
  date: string;
}
