"use client"
import Image from "next/image"
import { useState } from "react"

export function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={images[active] || "/placeholder.svg"}
          alt={`Product image ${active + 1}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-md border ${i === active ? "ring-2 ring-emerald-600" : ""}`}
          >
            <Image src={src || "/placeholder.svg"} alt={`thumb ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
