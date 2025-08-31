"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function OrderSuccessPage() {
  const sp = useSearchParams()
  const id = sp.get("orderId") || "ORD-XXXXXX"
  const router = useRouter()

  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-center font-sans">
      <h1 className="text-xl font-semibold text-emerald-600">Order Placed Successfully</h1>
      <p className="mt-2 text-sm text-gray-600">Your tracking number is {id}.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/products" className="rounded-md border px-4 py-2 text-sm">
          Continue Shopping
        </Link>
        <button onClick={() => router.push("/profile")} className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white">
          View Orders
        </button>
      </div>
    </main>
  )
}
