import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type Order = { id: string; total: number; date: string; items: number }
type UserState = {
  name?: string
  savedAvatars: string[]
  wardrobe: string[] // product ids
  orders: Order[]
}

const initialState: UserState = {
  name: "Guest",
  savedAvatars: [],
  wardrobe: [],
  orders: [],
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveAvatar(state, action: PayloadAction<string>) {
      if (!state.savedAvatars.includes(action.payload)) state.savedAvatars.push(action.payload)
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload)
    },
    addToWardrobe(state, action: PayloadAction<string>) {
      if (!state.wardrobe.includes(action.payload)) state.wardrobe.push(action.payload)
    },
  },
})

export const { saveAvatar, addOrder, addToWardrobe } = slice.actions
export default slice.reducer
