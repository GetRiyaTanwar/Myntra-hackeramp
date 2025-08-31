"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { selectCartItems, selectCartTotals, removeFromCart, updateQty, clearCart } from "@/lib/slices/cart-slice"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const items = useSelector(selectCartItems)
  const totals = useSelector(selectCartTotals)
  const dispatch = useDispatch()
  const router = useRouter()

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({ total: totals.total, items: items.length }),
    })
    const data = await res.json()
    dispatch(clearCart())
    router.push(`/order/success?orderId=${encodeURIComponent(data.id)}`)
  }

  return (
    <main className="mx-auto max-w-6xl gap-6 px-4 py-6 font-sans md:grid md:grid-cols-3">
      <section className="md:col-span-2">
        <h1 className="text-lg font-semibold">Your Cart</h1>
        <div className="mt-4 space-y-3">
          {items.length === 0 && <p className="text-sm text-gray-600">Your cart is empty.</p>}
          {items.map((i) => (
            <div
              key={`${i.product.id}-${i.size}-${i.color}`}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={i.product.image || "/placeholder.svg"}
                  alt={i.product.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium">{i.product.title}</p>
                  <p className="text-gray-500">
                    ₹{i.product.price} • {i.size || "-"} • {i.color || "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e) =>
                    dispatch(
                      updateQty({ productId: i.product.id, qty: Number(e.target.value), size: i.size, color: i.color }),
                    )
                  }
                  className="w-16 rounded-md border px-2 py-1 text-sm"
                />
                <button
                  onClick={() => dispatch(removeFromCart({ productId: i.product.id, size: i.size, color: i.color }))}
                  className="rounded-md border px-3 py-2 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Checkout</h2>
        <form className="mt-4 space-y-3" onSubmit={placeOrder}>
          <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Full Name" />
          <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Address" />
          <div className="flex gap-3">
            <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="City" />
            <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="PIN" />
          </div>
          <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Card Number" />
          <div className="flex gap-3">
            <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Expiry" />
            <input required className="w-full rounded-md border px-3 py-2 text-sm" placeholder="CVV" />
          </div>

          <div className="mt-4 rounded-lg border p-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{totals.discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{totals.delivery}</span>
            </div>
            <div className="mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>₹{totals.total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Place Order
          </button>
        </form>
      </section>
    </main>
  )
}
