import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export type Product = {
  id: string
  title: string
  brand: string
  price: number
  gender: "Men" | "Women" | "Kids" | "Accessories"
  colors: string[]
  sizes: string[]
  image: string
  rating: number
  popularity: number
  newArrival?: boolean
  category: string
  discount?: number // optional % discount
}

type ProductsState = {
  items: Product[]
}

const ph = (q: string, w = 640, h = 800) => `/placeholder.svg?height=${h}&width=${w}&query=${encodeURIComponent(q)}`

const initialState: ProductsState = {
  items: [
    {
      id: "p1",
      title: "Black A-Line Dress",
      brand: "UrbanEdge",
      price: 1799,
      gender: "Women",
      colors: ["black"],
      sizes: ["S", "M", "L"],
      image: ph("black a-line dress on mannequin"),
      rating: 4.4,
      popularity: 92,
      newArrival: true,
      category: "Dresses",
      discount: 20,
    },
    {
      id: "p2",
      title: "Classic White Sneakers",
      brand: "Stride",
      price: 2299,
      gender: "Men",
      colors: ["white"],
      sizes: ["8", "9", "10", "11"],
      image: ph("white sneakers on gray background"),
      rating: 4.6,
      popularity: 97,
      category: "Shoes",
      discount: 10,
    },
    {
      id: "p3",
      title: "Kids Graphic Tee",
      brand: "PlayKid",
      price: 699,
      gender: "Kids",
      colors: ["blue", "yellow"],
      sizes: ["XS", "S"],
      image: ph("kids graphic t-shirt flat lay blue"),
      rating: 4.2,
      popularity: 80,
      newArrival: true,
      category: "T-Shirts",
    },
    {
      id: "p4",
      title: "Leather Belt",
      brand: "CraftCo",
      price: 999,
      gender: "Accessories",
      colors: ["brown", "black"],
      sizes: ["M", "L"],
      image: ph("brown leather belt coiled"),
      rating: 4.1,
      popularity: 70,
      category: "Belts",
    },
    {
      id: "p5",
      title: "Black Bodycon Dress",
      brand: "UrbanEdge",
      price: 1999,
      gender: "Women",
      colors: ["black"],
      sizes: ["S", "M"],
      image: ph("black bodycon dress studio"),
      rating: 4.7,
      popularity: 99,
      category: "Dresses",
    },
    {
      id: "p6",
      title: "Men’s Denim Jacket",
      brand: "DenimHub",
      price: 2499,
      gender: "Men",
      colors: ["blue"],
      sizes: ["M", "L", "XL"],
      image: ph("mens denim jacket on hanger"),
      rating: 4.5,
      popularity: 95,
      category: "Jackets",
    },
  ],
}

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<Product[]>) {
      state.items.push(...action.payload)
    },
  },
})

export const { addProducts } = slice.actions
export default slice.reducer

export const selectProducts = (state: RootState) => state.products.items

export const makeSelectFilteredProducts = () =>
  createSelector(
    [
      (state: RootState) => state.products.items,
      (state: RootState) => state.filters,
      (state: RootState) => state.wishlist.ids,
    ],
    (items, filters, wishlistIds) => {
      let result = items.filter((p) => {
        if (filters.gender && p.gender !== filters.gender) return false
        if (filters.category && p.category !== filters.category) return false
        if (filters.color && !p.colors.includes(filters.color)) return false
        if (filters.brand && p.brand.toLowerCase() !== filters.brand.toLowerCase()) return false
        if (filters.maxPrice && p.price > filters.maxPrice) return false
        if (filters.query) {
          const q = filters.query.toLowerCase()
          if (
            !(
              p.title.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q)
            )
          )
            return false
        }
        if (filters.onlyWishlist && !wishlistIds.includes(p.id)) return false
        return true
      })

      switch (filters.sort) {
        case "price_asc":
          result = result.slice().sort((a, b) => a.price - b.price)
          break
        case "price_desc":
          result = result.slice().sort((a, b) => b.price - a.price)
          break
        case "popularity":
          result = result.slice().sort((a, b) => b.popularity - a.popularity)
          break
        case "new":
          result = result.slice().sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
          break
      }

      return result
    },
  )
