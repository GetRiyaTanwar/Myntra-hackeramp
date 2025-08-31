"use client"

import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { selectProducts } from "@/lib/slices/products-slice"
import { useSelector } from "react-redux"
import { BannerCarousel } from "@/components/banner-carousel"
import { CategoryCards } from "@/components/category-cards"

export default function HomePage() {
  const products = useSelector(selectProducts)
  const trending = products.slice(0, 8)

  return (
    <main className="font-sans">
      <section className="mx-auto max-w-6xl px-4">
        <div className="mt-4">
          <BannerCarousel />
        </div>

        <div className="mt-10">
          <CategoryCards />
        </div>

        <div className="mt-10 rounded-2xl bg-gray-900 px-6 py-12 text-white">
          <h1 className="text-balance text-2xl font-semibold md:text-3xl">Season of Style: Up to 50% OFF</h1>
          <p className="mt-2 text-sm text-gray-200">Fresh drops for Men, Women, and Kids. Free delivery over ₹999.</p>
          <div className="mt-4 flex gap-3">
            <Link className="rounded-md bg-emerald-600 px-4 py-2 text-sm" href="/products">
              Shop Now
            </Link>
            <Link className="rounded-md border border-white/20 px-4 py-2 text-sm" href="/products?sort=new">
              New Arrivals
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-balance text-lg font-semibold">Trending Now</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {trending.map((p) => (
              <div key={p.id} className="flex-none">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
