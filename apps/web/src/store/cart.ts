import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '@bytemart/types';

interface CartStore extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      shipping: 15.99,
      tax: 0,
      total: 0,
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.productId === item.productId);
        let items;
        if (existingItem) {
          items = state.items.map(i => 
            i.productId === item.productId 
              ? { 
                  ...i, 
                  quantity: Math.min(i.quantity + 1, i.maxQuantity)
                }
              : i
          );
        } else {
          items = [...state.items, item];
        }
        
        const subtotal = calculateSubtotal(items);
        const tax = subtotal * 0.08;
        const total = subtotal + state.shipping + tax;
        
        return { items, subtotal, tax, total };
      }),

      removeItem: (itemId) => set((state) => {
        const items = state.items.filter(i => i.id !== itemId);
        const subtotal = calculateSubtotal(items);
        const tax = subtotal * 0.08;
        const total = subtotal + state.shipping + tax;
        return { items, subtotal, tax, total };
      }),

      updateQuantity: (itemId, quantity) => set((state) => {
        const items = state.items.map(item => 
          item.id === itemId 
            ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
            : item
        );
        const subtotal = calculateSubtotal(items);
        const tax = subtotal * 0.08;
        const total = subtotal + state.shipping + tax;
        
        return { items, subtotal, tax, total };
      }),

      clearCart: () => set({ 
        items: [], 
        subtotal: 0, 
        tax: 0, 
        total: 0 
      }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

const calculateSubtotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}; 