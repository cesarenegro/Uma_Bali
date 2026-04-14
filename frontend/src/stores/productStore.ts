import { create } from 'zustand';
import type { Product, Category, Collection, Designer } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

export interface FilterState {
  category: string[];
  collection: string[];
  designer: string[];
  material: string[];
  environment: string[];
  style: string[];
}

export interface CartItem {
  id: string; // unique literal id for cart item
  productId: string;
  quantity: number;
  woodFinish?: string;
  fabricType?: string;
  fabricColor?: string;
  priceIndicator?: 'on_request' | 'contact_dealer' | number | null;
}


interface ProductStore {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  designers: Designer[];
  activeFilters: FilterState;
  searchQuery: string;
  setFilter: (key: keyof FilterState, values: string[]) => void;
  resetFilters: () => void;
  setSearch: (q: string) => void;
  getProductsByCategory: (category: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  
  // Cart State
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: (isOpen?: boolean) => void;
  clearCart: () => void;
}


const initialFilters: FilterState = {
  category: [],
  collection: [],
  designer: [],
  material: [],
  environment: [],
  style: [],
};

// Strongly typing JSON import ensures TS doesn't complain about property missing
const parsedProducts = productsData as unknown as Product[];
const parsedCategories = categoriesData as unknown as Category[];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: parsedProducts,
  categories: parsedCategories,
  collections: [],
  designers: [],
  activeFilters: initialFilters,
  searchQuery: '',
  
  setFilter: (key, values) => set((state) => ({
    activeFilters: {
      ...state.activeFilters,
      [key]: values
    }
  })),
  
  resetFilters: () => set({ activeFilters: initialFilters }),
  
  setSearch: (q) => set({ searchQuery: q }),
  
  getProductsByCategory: (category: string) => {
    return get().products.filter(p => p.category === category);
  },
  
  getProductById: (id: string) => {
    return get().products.find(p => p.id === id);
  },

  cartItems: [],
  isCartOpen: false,
  
  addToCart: (item) => set((state) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    return { cartItems: [...state.cartItems, newItem], isCartOpen: true };
  }),
  
  removeFromCart: (cartItemId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== cartItemId)
  })),
  
  updateCartQuantity: (cartItemId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  
  toggleCart: (isOpen) => set((state) => ({
    isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen
  })),
  
  clearCart: () => set({ cartItems: [] }),
}));
