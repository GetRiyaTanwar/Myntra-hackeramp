"use client"

import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ImageGallery } from "@/components/image-gallery"
import { selectProducts } from "@/lib/slices/products-slice"
import { addToCart } from "@/lib/slices/cart-slice"
import { setOverlayProduct } from "@/lib/slices/avatar-slice"
import { useState } from "react"

export default function PDPPage() {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(selectProducts)
  const product = products.find((p) => p.id === id)
  const dispatch = useDispatch()
  const router = useRouter()
  const [size, setSize] = useState<string | undefined>()
  const [color, setColor] = useState<string | undefined>()

  if (!product) return <div className="mx-auto max-w-6xl px-4 py-10">Product not found.</div>

  const images = [product.image, product.image, product.image]

  const addCart = () => {
    dispatch(addToCart({ product, size, color }))
  }

  const tryOn = () => {
    dispatch(setOverlayProduct(product.image))
    router.push("/try-on")
  }

  return (
    <main className="mx-auto max-w-6xl gap-10 px-4 py-6 font-sans md:grid md:grid-cols-2">
      <ImageGallery images={images} />
      <div>
        <h1 className="text-balance text-xl font-semibold">{product.title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {product.brand} • {product.rating}★
        </p>
        <p className="mt-2 text-lg font-medium">₹{product.price}</p>

        <div className="mt-4">
          <label className="text-xs text-gray-500">Size</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-md border px-3 py-1 text-sm ${size === s ? "border-emerald-600" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs text-gray-500">Color</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-md border px-3 py-1 text-sm capitalize ${color === c ? "border-emerald-600" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white" onClick={addCart}>
            Add to Cart
          </button>
          <button className="rounded-md border px-4 py-2 text-sm" onClick={tryOn}>
            Try On Avatar
          </button>
        </div>

        <div className="mt-8">
          <h3 className="font-medium">Reviews & Ratings</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>“Great fit and quality” — 5★</li>
            <li>“Worth the price” — 4★</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
