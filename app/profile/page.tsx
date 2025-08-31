"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import Link from "next/link"
import { selectProducts } from "@/lib/slices/products-slice"
import { ProductCard } from "@/components/product-card"

export default function ProfilePage() {
  const user = useSelector((s: RootState) => s.user)
  const wishlistIds = useSelector((s: RootState) => s.wishlist.ids)
  const products = useSelector(selectProducts)
  const wishlist = products.filter((p) => wishlistIds.includes(p.id))

  const [tab, setTab] = useState<"avatars" | "wishlist" | "wardrobe" | "orders">("avatars")

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 font-sans">
      <h1 className="text-lg font-semibold">Hello, {user.name}</h1>

      <nav className="mt-4 flex gap-2" role="tablist" aria-label="Profile tabs">
        {[
          { key: "avatars", label: "Saved Avatars" },
          { key: "wishlist", label: `Wishlist (${wishlist.length})` },
          { key: "wardrobe", label: `My Wardrobe (${user.wardrobe.length})` },
          { key: "orders", label: "Orders" },
        ].map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === (t.key as any)}
            onClick={() => setTab(t.key as any)}
            className={`rounded-md px-3 py-2 text-sm ${tab === (t.key as any) ? "bg-gray-900 text-white" : "border"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6" role="tabpanel">
        {tab === "avatars" && (
          <section className="rounded-lg border p-4">
            <h2 className="font-medium">Saved Avatars</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
              {user.savedAvatars.length === 0 && <p className="text-sm text-gray-600">No avatars saved yet.</p>}
              {user.savedAvatars.map((url, i) => (
                <img
                  key={i}
                  src={url || "/placeholder.svg"}
                  alt={`avatar ${i + 1}`}
                  className="h-32 w-full rounded-md object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {tab === "wishlist" && (
          <section className="rounded-lg border p-4">
            <h2 className="font-medium">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="mt-2 text-sm text-gray-600">
                No items yet.{" "}
                <Link className="text-emerald-600" href="/products?wishlist=1">
                  Browse wishlist
                </Link>
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {wishlist.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "wardrobe" && (
          <section className="rounded-lg border p-4">
            <h2 className="font-medium">My Wardrobe</h2>
            <p className="mt-2 text-sm text-gray-600">{user.wardrobe.length} saved items.</p>
          </section>
        )}

        {tab === "orders" && (
          <section className="rounded-lg border p-4">
            <h2 className="font-medium">Order History</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {user.orders.length === 0 && <li>No orders yet.</li>}
              {user.orders.map((o) => (
                <li key={o.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <span>{o.id}</span>
                  <span>₹{o.total}</span>
                  <span>{o.items} item(s)</span>
                  <span className="text-gray-500">{o.date}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
