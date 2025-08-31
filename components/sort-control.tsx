"use client"
import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "@/lib/slices/filters-slice"
import type { RootState } from "@/lib/store"

export function SortControl() {
  const sort = useSelector((s: RootState) => s.filters.sort)
  const dispatch = useDispatch()
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-500">Sort</label>
      <select
        className="rounded-md border px-2 py-1 text-sm"
        value={sort || ""}
        onChange={(e) => dispatch(setFilters({ sort: (e.target.value || undefined) as any }))}
      >
        <option value="popularity">Popularity</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="new">New Arrivals</option>
      </select>
    </div>
  )
}
