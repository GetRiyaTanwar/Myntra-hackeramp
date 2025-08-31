"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = ["Women", "Men", "Kids", "Accessories", "Beauty"]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl tracking-tight">
              MyntraLite
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/products?category=${encodeURIComponent(c)}`}
                  className={cn("text-sm font-medium text-slate-900 hover:text-pink-500 transition-colors")}
                >
                  {c}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Input placeholder="Search for products, brands and more" className="w-80" aria-label="Search" />
            <Link href="/profile" className="text-sm font-medium">
              Profile
            </Link>
            <Link href="/wishlist" className="p-2" aria-label="Wishlist">
              <Heart className="h-5 w-5 text-pink-500" />
            </Link>
            <button className="p-2" aria-label="Bag">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </button>
          </div>

          <button className="md:hidden p-2" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <Input placeholder="Search products" className="w-full" />
              <div className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <Link
                    key={c}
                    href={`/products?category=${encodeURIComponent(c)}`}
                    className="text-sm font-medium text-slate-900 hover:text-pink-500"
                    onClick={() => setOpen(false)}
                  >
                    {c}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Link href="/profile" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                </Link>
                <Link href="/profile?tab=wishlist" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm" className="text-pink-500 bg-transparent">
                    Wishlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
