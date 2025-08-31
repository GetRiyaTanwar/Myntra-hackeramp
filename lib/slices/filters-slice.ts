import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type SortKey = "price_asc" | "price_desc" | "popularity" | "new" | undefined
type Gender = "Men" | "Women" | "Kids" | "Accessories" | undefined

export type FiltersState = {
  query?: string
  gender?: Gender
  category?: string
  color?: string
  brand?: string
  maxPrice?: number
  size?: string
  sort?: SortKey
  onlyWishlist?: boolean
}

const initialState: FiltersState = {
  sort: "popularity",
}

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      Object.assign(state, action.payload)
    },
    resetFilters() {
      return { sort: "popularity" } as FiltersState
    },
    applyQuery(state, action: PayloadAction<string>) {
      const q = action.payload
      state.query = q

      const tokens = q.toLowerCase().split(/\s+/)
      const underIdx = tokens.indexOf("under")
      if (underIdx !== -1 && tokens[underIdx + 1]) {
        const num = Number.parseInt(tokens[underIdx + 1].replace(/\D/g, ""), 10)
        if (!isNaN(num)) state.maxPrice = num
      }

      const genders: Gender[] = ["Men", "Women", "Kids", "Accessories"]
      genders.forEach((g) => {
        if (tokens.includes((g as string).toLowerCase())) state.gender = g
      })

      const colors = ["black", "white", "blue", "red", "yellow", "green", "brown"]
      for (const c of colors) {
        if (tokens.includes(c)) {
          state.color = c
          break
        }
      }

      if (tokens.includes("dress") || tokens.includes("dresses")) state.category = "Dresses"
      if (tokens.includes("shoe") || tokens.includes("sneaker") || tokens.includes("shoes")) state.category = "Shoes"
      if (tokens.includes("jacket") || tokens.includes("denim")) state.category = "Jackets"

      const brandIdx = tokens.indexOf("brand")
      if (brandIdx !== -1 && tokens[brandIdx + 1]) {
        state.brand = tokens[brandIdx + 1]
      }

      if (q.includes("low to high")) state.sort = "price_asc"
      if (q.includes("high to low")) state.sort = "price_desc"
      if (q.includes("new")) state.sort = "new"
      if (q.includes("popular") || q.includes("popularity")) state.sort = "popularity"
    },
  },
})

export const { setFilters, resetFilters, applyQuery } = slice.actions
export default slice.reducer
