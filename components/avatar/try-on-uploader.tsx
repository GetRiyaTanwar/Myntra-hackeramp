"use client"
import { useDispatch, useSelector } from "react-redux"
import { setSelfie, setAvatar, setStyle, setProcessing } from "@/lib/slices/avatar-slice"
import type { RootState } from "@/lib/store"
import { useState } from "react"

export function TryOnUploader() {
  const dispatch = useDispatch()
  const { style, selfieUrl, processing } = useSelector((s: RootState) => s.avatar)
  const [fileName, setFileName] = useState<string | undefined>()

  const onFile = async (file: File | null) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setFileName(file.name)
    dispatch(setSelfie(url))
  }

  const createAvatar = async () => {
    dispatch(setProcessing(true))
    try {
      const res = await fetch("/api/avatar", {
        method: "POST",
        body: JSON.stringify({ style, selfie: !!selfieUrl }),
      })
      const data = await res.json()
      dispatch(setAvatar(data.avatarUrl))
    } catch (e) {
      console.error("[v0] avatar error", e)
    } finally {
      dispatch(setProcessing(false))
    }
  }

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <h3 className="font-medium">Create Your Avatar</h3>
      <div className="flex items-center gap-3">
        <label className="text-sm">Style</label>
        <select
          className="rounded-md border px-2 py-1 text-sm"
          value={style}
          onChange={(e) => dispatch(setStyle(e.target.value as any))}
        >
          <option value="2d">2D Cartoon</option>
          <option value="semi">Semi-Realistic</option>
          <option value="3d">3D</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <input
          id="selfie"
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
        {fileName ? <span className="text-xs text-gray-500">{fileName}</span> : null}
      </div>
      <button
        className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white disabled:opacity-50"
        onClick={createAvatar}
        disabled={processing}
      >
        {processing ? "Processing..." : "Create Avatar"}
      </button>
      <p className="text-xs text-gray-500">Uses a placeholder API that simulates Bitmoji-like generation.</p>
    </div>
  )
}
