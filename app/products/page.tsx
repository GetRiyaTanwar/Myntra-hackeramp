"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Filters } from "@/components/filters"
import { SortControl } from "@/components/sort-control"
import { ProductCard } from "@/components/product-card"
import { makeSelectFilteredProducts } from "@/lib/slices/products-slice"
import type { RootState } from "@/lib/store"
import { setFilters } from "@/lib/slices/filters-slice"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
  const dispatch = useDispatch()
  const sp = useSearchParams()
  const selectFiltered = makeSelectFilteredProducts()
  const products = useSelector((s: RootState) => selectFiltered(s))

  useEffect(() => {
    const gender = sp.get("gender") as any
    const sort = sp.get("sort") as any
    const wishlist = sp.get("wishlist") === "1"
    dispatch(setFilters({ gender, sort, onlyWishlist: wishlist || undefined }))
  }, [sp, dispatch])

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 pt-4 font-sans">
      <div className="flex flex-col gap-6 md:flex-row">
        <Filters />
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Products</h1>
            <SortControl />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
