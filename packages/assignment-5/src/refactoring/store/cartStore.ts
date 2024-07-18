// store/cartStore.ts
import create from 'zustand';
import { Product, CartItem } from '../../types';

interface CartItem {
  product: Product;
  quantity: number;
}

// 스토어 타입 정의
type CartStore = {
  cartItems: CartItem[];
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  addCartItem: (newItem: CartItem) => void;
  removeCartItem: (productId: string) => void;
};

// 스토어 생성
export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  updateCartItemQuantity: (productId: string, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    })),

  addCartItem: (newItem) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.productId === newItem.productId);
      return {
        cartItems: existingItem
          ? state.cartItems.map((item) =>
              item.productId === newItem.productId ? { ...item, quantity: item.quantity + newItem.quantity } : item
            )
          : [...state.cartItems, newItem]
      };
    }),

  removeCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId)
    }))
}));
