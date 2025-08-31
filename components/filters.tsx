"use client"

import { useDispatch, useSelector } from "react-redux"
import { setFilters, resetFilters } from "@/lib/slices/filters-slice"
import type { RootState } from "@/lib/store"

export function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector((s: RootState) => s.filters)
  // derive available options from products
  const products = useSelector((s: RootState) => s.products.items)
  const categories = Array.from(new Set(products.map((p) => p.category)))
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes)))

  return (
    <aside className="w-full rounded-lg border p-4 md:w-64 md:sticky md:top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <button className="text-xs text-gray-500 hover:underline" onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Category */}
        <div>
          <label className="text-xs text-gray-500">Category</label>
          <select
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={filters.category || ""}
            onChange={(e) => dispatch(setFilters({ category: e.target.value || undefined }))}
          >
            <option value="">Any</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-xs text-gray-500">Brand</label>
          <input
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            placeholder="e.g., UrbanEdge"
            value={filters.brand || ""}
            onChange={(e) => dispatch(setFilters({ brand: e.target.value || undefined }))}
          />
        </div>

        {/* Color */}
        <div>
          <label className="text-xs text-gray-500">Color</label>
          <select
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={filters.color || ""}
            onChange={(e) => dispatch(setFilters({ color: e.target.value || undefined }))}
          >
            <option value="">Any</option>
            <option>black</option>
            <option>white</option>
            <option>blue</option>
            <option>red</option>
            <option>yellow</option>
            <option>green</option>
            <option>brown</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="text-xs text-gray-500">Size</label>
          <select
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={filters.size || ""}
            onChange={(e) => dispatch(setFilters({ size: e.target.value || undefined }))}
          >
            <option value="">Any</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label className="text-xs text-gray-500">Max Price</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            placeholder="e.g., 2000"
            value={filters.maxPrice ?? ""}
            onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
          />
        </div>

        {/* Sort by */}
        <div>
          <label className="text-xs text-gray-500">Sort by</label>
          <select
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            value={filters.sort || ""}
            onChange={(e) => dispatch(setFilters({ sort: (e.target.value || undefined) as any }))}
          >
            <option value="popularity">Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="new">New Arrivals</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
