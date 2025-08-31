"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setFilters } from "@/lib/slices/filters-slice"

export function SortSelect() {
  const dispatch = useDispatch()
  const sort = useSelector((s: RootState) => s.filters.sort || "popularity")

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      Sort by:
      <select
        value={sort}
        onChange={(e) => dispatch(setFilters({ sort: e.target.value as any }))}
        className="rounded border px-2 py-1"
        aria-label="Sort products"
      >
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="new">Newest</option>
        <option value="popularity">Popularity</option>
      </select>
    </label>
  )
}
