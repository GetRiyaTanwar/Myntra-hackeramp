"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const slides = [
  {
    title: "End of Season Sale",
    subtitle: "Up to 60% OFF",
    img: "/end-of-season-fashion-sale.png",
    href: "/products?discounted=true",
    cta: "Shop Sale",
  },
  {
    title: "Fresh Fits for Him",
    subtitle: "New Arrivals",
    img: "/men-fashion-editorial.png",
    href: "/products?category=Men",
    cta: "Shop Men",
  },
  {
    title: "Top Picks for Her",
    subtitle: "Trending Now",
    img: "/women-fashion-editorial.png",
    href: "/products?category=Women",
    cta: "Shop Women",
  },
]

export function BannerCarousel() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])
  const s = slides[i]
  return (
    <section aria-label="Seasonal campaigns" className="relative overflow-hidden rounded-xl shadow-sm">
      <img
        src={s.img || "/placeholder.svg"}
        alt={`${s.title} banner`}
        className="h-[220px] w-full object-cover md:h-[400px]"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-lg text-white">
            <h2 className="text-balance text-2xl font-bold md:text-4xl">{s.title}</h2>
            <p className="mt-2 text-sm md:text-base">{s.subtitle}</p>
            <Link
              href={s.href}
              className="mt-4 inline-block rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
            >
              {s.cta}
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 w-2 rounded-full ${idx === i ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  )
}
