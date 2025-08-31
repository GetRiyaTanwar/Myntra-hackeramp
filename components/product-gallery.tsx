"use client"

import { useState } from "react"

export function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
        <img
          src={images[active] || "/placeholder.svg?height=480&width=480&query=fashion%20product"}
          alt={`Product image ${active + 1}`}
          className="h-96 w-full object-cover md:h-[480px]"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={`overflow-hidden rounded-lg border ${i === active ? "ring-2 ring-pink-500" : ""}`}
          >
            <img src={src || "/placeholder.svg"} alt="" className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
