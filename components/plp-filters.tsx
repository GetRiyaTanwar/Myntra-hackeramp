"use client"

import { useDispatch, useSelector } from "react-redux"
import { setFilters, resetFilters } from "@/lib/slices/filters-slice"
import type { RootState } from "@/lib/store"
import { useMemo } from "react"

export function PlpFilters() {
  const dispatch = useDispatch()
  const filters = useSelector((s: RootState) => s.filters)
  const products = useSelector((s: RootState) => s.products.items)

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products])
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products])
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes))), [products])
  const colors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors))), [products])

  return (
    <aside className="sticky top-20 h-fit space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        <button className="text-xs text-blue-600 hover:underline" onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>

      <label className="block text-sm">
        <span className="text-gray-600">Max Price</span>
        <input
          type="number"
          min={0}
          value={filters.maxPrice ?? ""}
          onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="e.g. 2000"
        />
      </label>

      <label className="block text-sm">
        <span className="text-gray-600">Brand</span>
        <select
          value={filters.brand ?? ""}
          onChange={(e) => dispatch(setFilters({ brand: e.target.value || undefined }))}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-gray-600">Color</span>
        <select
          value={filters.color ?? ""}
          onChange={(e) => dispatch(setFilters({ color: e.target.value || undefined }))}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-gray-600">Size</span>
        <select
          value={filters.size ?? ""}
          onChange={(e) => dispatch(setFilters({ size: e.target.value || undefined }))}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-gray-600">Category</span>
        <select
          value={filters.category ?? ""}
          onChange={(e) => dispatch(setFilters({ category: e.target.value || undefined }))}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!filters.onlyWishlist}
          onChange={(e) => dispatch(setFilters({ onlyWishlist: e.target.checked }))}
        />
        <span>Wishlist only</span>
      </label>
    </aside>
  )
}
