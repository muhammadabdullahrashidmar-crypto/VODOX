import { create } from 'zustand';
import { CartItem, Product } from '../types';
import { BRAND_CONFIG } from '../data/brand';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, color?: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
  getShippingProgress: () => { progress: number; remaining: number; qualifies: boolean };
}

const STORAGE_KEY = 'vodox_cart_v1';

const getInitialItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read cart from localStorage', e);
    return [];
  }
};

const saveItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialItems(),
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product: Product, quantity = 1, color = product.colour) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, quantity, selectedColor: color }];
      }

      saveItems(newItems);
      return { items: newItems, isOpen: true };
    });
  },

  removeItem: (productId: string, color: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedColor === color)
      );
      saveItems(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (productId: string, color: string, delta: number) => {
    set((state) => {
      const newItems = state.items
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === color) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      saveItems(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    saveItems([]);
    set({ items: [] });
  },

  getTotalCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getShippingProgress: () => {
    const subtotal = get().getSubtotal();
    const threshold = BRAND_CONFIG.shippingThreshold;
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    const remaining = Math.max(0, threshold - subtotal);
    return {
      progress,
      remaining,
      qualifies: subtotal >= threshold,
    };
  },
}));
