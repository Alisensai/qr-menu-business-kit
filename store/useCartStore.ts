"use client";

import { create } from "zustand";

export interface CartItemInput {
  menuItemId: string;
  name: string;
  price: number;
  currency: string;
  imageUrl?: string;
}

export interface CartItem extends CartItemInput {
  quantity: number;
  note: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItemInput) => void;
  increaseItem: (menuItemId: string) => void;
  decreaseItem: (menuItemId: string) => void;
  updateNote: (menuItemId: string, note: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const currentItem = state.items.find((cartItem) => cartItem.menuItemId === item.menuItemId);

      if (currentItem) {
        return {
          items: state.items.map((cartItem) =>
            cartItem.menuItemId === item.menuItemId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...item,
            quantity: 1,
            note: ""
          }
        ]
      };
    }),
  increaseItem: (menuItemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    })),
  decreaseItem: (menuItemId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.menuItemId === menuItemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    })),
  updateNote: (menuItemId, note) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.menuItemId === menuItemId ? { ...item, note } : item
      )
    })),
  clearCart: () => set({ items: [] })
}));
