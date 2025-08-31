"use client"

import type React from "react"

import Link from "next/link"
import { useDispatch } from "react-redux"
import { applyQuery, setFilters, resetFilters } from "@/lib/slices/filters-slice"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SiteHeader() {
  const dispatch = useDispatch()
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(applyQuery(q))
    router.push("/products")
  }

  const goto = (gender: "Men" | "Women" | "Kids" | "Accessories") => {
    dispatch(resetFilters())
    dispatch(setFilters({ gender }))
    router.push("/products")
  }

  // reflect wishlist-only toggle via query param
  const isWishlist = sp.get("wishlist") === "1"

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-bold text-emerald-600">
          Moda
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <button className="text-sm hover:text-emerald-600" onClick={() => goto("Men")}>
            Men
          </button>
          <button className="text-sm hover:text-emerald-600" onClick={() => goto("Women")}>
            Women
          </button>
          <button className="text-sm hover:text-emerald-600" onClick={() => goto("Kids")}>
            Kids
          </button>
          <button className="text-sm hover:text-emerald-600" onClick={() => goto("Accessories")}>
            Accessories
          </button>
          <button
            className="text-sm hover:text-emerald-600"
            onClick={() => {
              dispatch(resetFilters())
              dispatch(setFilters({ category: "Beauty" }))
              router.push("/products")
            }}
          >
            Beauty
          </button>
        </nav>

        <form onSubmit={submit} className="flex flex-1 max-w-md items-center gap-2">
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Try: black dresses under 2000"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white">
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
          <Link href="/profile" className="text-sm hover:text-emerald-600">
            Profile
          </Link>
          <Link href={`/products?wishlist=1`} className="text-sm hover:text-emerald-600">
            {isWishlist ? "Wishlist • On" : "Wishlist"}
          </Link>
          <Link href="/cart" className="text-sm hover:text-emerald-600">
            Cart
          </Link>
        </div>
      </div>
    </header>
  )
}
