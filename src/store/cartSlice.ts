import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/Cart";
import type { Product } from "../types/Product";
import { getProductImageUrl } from "../utils/productImage";

const CART_STORAGE_KEY = "ecommerce-cart";

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

interface CartSliceState {
  items: CartItem[];
}

const initialState: CartSliceState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const image = getProductImageUrl(product.images);
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

type CartSelectorState = { cart: CartSliceState };

export const selectCartItems = (state: CartSelectorState) => state.cart.items;

export const selectTotalItems = (state: CartSelectorState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: CartSelectorState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
