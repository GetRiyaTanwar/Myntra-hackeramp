import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { Product } from "./products-slice"

type CartItem = {
  product: Product
  qty: number
  size?: string
  color?: string
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; qty?: number; size?: string; color?: string }>) {
      const { product, qty = 1, size, color } = action.payload
      const key = state.items.find((i) => i.product.id === product.id && i.size === size && i.color === color)
      if (key) key.qty += qty
      else state.items.push({ product, qty, size, color })
    },
    removeFromCart(state, action: PayloadAction<{ productId: string; size?: string; color?: string }>) {
      state.items = state.items.filter(
        (i) =>
          !(
            i.product.id === action.payload.productId &&
            i.size === action.payload.size &&
            i.color === action.payload.color
          ),
      )
    },
    updateQty(state, action: PayloadAction<{ productId: string; qty: number; size?: string; color?: string }>) {
      const item = state.items.find(
        (i) =>
          i.product.id === action.payload.productId &&
          i.size === action.payload.size &&
          i.color === action.payload.color,
      )
      if (item) item.qty = Math.max(1, action.payload.qty)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQty, clearCart } = slice.actions
export default slice.reducer

export const selectCartItems = (s: RootState) => s.cart.items
export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const discount = Math.round(subtotal * 0.05) // flat 5%
  const delivery = subtotal > 999 ? 0 : 49
  const total = subtotal - discount + delivery
  return { subtotal, discount, delivery, total }
})
