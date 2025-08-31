import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slices/products-slice"
import filtersReducer from "./slices/filters-slice"
import cartReducer from "./slices/cart-slice"
import wishlistReducer from "./slices/wishlist-slice"
import avatarReducer from "./slices/avatar-slice"
import userReducer from "./slices/user-slice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    avatar: avatarReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
