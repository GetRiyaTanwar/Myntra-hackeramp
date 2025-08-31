"use client"

import type { Product } from "@/lib/slices/products-slice"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/lib/slices/cart-slice"
import { toggleWishlist } from "@/lib/slices/wishlist-slice"
import type { RootState } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((s: RootState) => s.wishlist.ids)
  const wished = wishlist.includes(product.id)

  const discounted =
    product.discount && product.discount > 0
      ? Math.max(0, Math.round(product.price * (1 - product.discount / 100)))
      : null

  return (
    <div className="group rounded-lg border p-3 hover:shadow-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-md bg-muted">
          {/* discount badge */}
          {product.discount ? (
            <span className="absolute left-2 top-2 rounded bg-pink-500 px-2 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          ) : null}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="text-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-pretty">{product.title}</p>
            {discounted ? (
              <p className="text-right">
                <span className="mr-1 line-through text-gray-500">₹{product.price}</span>
                <span className="font-medium">₹{discounted}</span>
              </p>
            ) : (
              <p className="text-gray-700">₹{product.price}</p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {product.brand} • {product.rating.toFixed(1)}★
          </p>
        </div>
      </Link>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => dispatch(addToCart({ product }))}
          className="rounded-md bg-gray-900 px-3 py-2 text-xs text-white hover:bg-black"
        >
          Add to Cart
        </button>
        <Link
          href={`/try-on?productId=${encodeURIComponent(product.id)}`}
          className="rounded-md border px-3 py-2 text-center text-xs hover:border-gray-300"
        >
          Try On Avatar
        </Link>
        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          aria-label="Wishlist"
          className={cn(
            "col-span-2 rounded-md border px-3 py-2 text-xs",
            wished ? "border-rose-500 text-rose-600" : "hover:border-gray-300",
          )}
        >
          {wished ? "♥ In Wishlist" : "♡ Wishlist"}
        </button>
      </div>
    </div>
  )
}
