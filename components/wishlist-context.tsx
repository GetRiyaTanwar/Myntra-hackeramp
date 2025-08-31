"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Ctx = {
  items: string[]
  toggle: (id: string) => void
}

const WishlistCtx = createContext<Ctx | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wishlist")
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items))
    } catch {}
  }, [items])

  const value = useMemo<Ctx>(
    () => ({
      items,
      toggle: (id: string) => setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    }),
    [items],
  )

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
