import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '../types';

export interface WishlistItem {
  product: Product;
  variant?: ProductVariant;
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({
            items: [...state.items, { product, variant, addedAt: new Date().toISOString() }],
          }));
        }
      },
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      })),
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (productId) => get().items.some((item) => item.product.id === productId),
    }),
    {
      name: 'uma-bali-wishlist',
    }
  )
);
