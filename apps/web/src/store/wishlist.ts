import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Wishlist, WishlistItem } from '@bytemart/types';

interface WishlistStore extends Wishlist {
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (item) => set((state) => ({
        items: state.items.some(i => i.id === item.id)
          ? state.items
          : [...state.items, item]
      })),

      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(i => i.id !== itemId)
      })),

      toggleItem: (item) => set((state) => ({
        items: state.items.some(i => i.id === item.id)
          ? state.items.filter(i => i.id !== item.id)
          : [...state.items, item]
      })),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
); 