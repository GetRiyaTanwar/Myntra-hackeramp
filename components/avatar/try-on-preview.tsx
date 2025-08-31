"use client"
import Image from "next/image"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export function TryOnPreview() {
  const { avatarUrl, overlayProductImage, selfieUrl } = useSelector((s: RootState) => s.avatar)
  const base = avatarUrl || selfieUrl || "/avatar-placeholder.png"

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border bg-muted">
      <Image src={base || "/placeholder.svg"} alt="Avatar base" fill className="object-cover" />
      {overlayProductImage ? (
        <Image
          src={overlayProductImage || "/placeholder.svg"}
          alt="Outfit overlay"
          fill
          className="object-contain opacity-90 mix-blend-multiply"
        />
      ) : null}
    </div>
  )
}
