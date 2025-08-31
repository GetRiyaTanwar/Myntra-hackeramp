"use client"

import { TryOnUploader } from "@/components/avatar/try-on-uploader"
import { TryOnPreview } from "@/components/avatar/try-on-preview"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setOverlayProduct, setProcessing } from "@/lib/slices/avatar-slice"

export default function TryOnPage() {
  const dispatch = useDispatch()
  const { overlayProductImage, avatarUrl, selfieUrl, style, processing } = useSelector((s: RootState) => s.avatar)

  const applyTryOn = async () => {
    dispatch(setProcessing(true))
    try {
      await fetch("/api/tryon", {
        method: "POST",
        body: JSON.stringify({
          avatarUrl: avatarUrl || selfieUrl,
          productImage: overlayProductImage,
          style,
        }),
      })
      // Placeholder: preview already shows overlay
    } finally {
      dispatch(setProcessing(false))
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 font-sans">
      <h1 className="text-lg font-semibold">Virtual Try-On</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TryOnPreview />
        <div className="space-y-4">
          <TryOnUploader />
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Outfit Overlay</h3>
            {overlayProductImage ? (
              <div className="mt-2 text-sm text-gray-600">Product selected from PDP.</div>
            ) : (
              <div className="mt-2 text-sm text-gray-600">Visit a product page to select an item for try-on.</div>
            )}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={applyTryOn}
                disabled={!overlayProductImage || !(avatarUrl || selfieUrl) || processing}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {processing ? "Applying..." : "Apply Outfit"}
              </button>
              <button
                onClick={() => dispatch(setOverlayProduct(undefined))}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Clear Outfit
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Placeholder for TryOnDiffusion-like API. This demo overlays the product image on your avatar.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
