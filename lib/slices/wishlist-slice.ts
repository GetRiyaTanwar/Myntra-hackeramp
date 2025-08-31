import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type WishlistState = {
  ids: string[]
}

const initialState: WishlistState = {
  ids: [],
}

const slice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
      } else {
        state.ids.push(id)
      }
    },
    clearWishlist(state) {
      state.ids = []
    },
  },
})

export const { toggleWishlist, clearWishlist } = slice.actions
export default slice.reducer
