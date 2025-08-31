import Link from "next/link"

const cats = [
  {
    title: "Women Fashion",
    href: "/products?gender=Women",
    img: "/women-fashion-editorial.png",
    accent: "text-pink-500",
  },
  {
    title: "Men Fashion",
    href: "/products?gender=Men",
    img: "/men-fashion-editorial.png",
    accent: "text-blue-600",
  },
  {
    title: "Accessories",
    href: "/products?gender=Accessories",
    img: "/accessories-flatlay.png",
    accent: "text-slate-900",
  },
  {
    title: "Sale",
    href: "/products?discounted=true",
    img: "/red-sale-banner.png",
    accent: "text-red-500",
  },
]

export function CategoryCards() {
  return (
    <section aria-label="Shop by category" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cats.map((c) => (
        <Link key={c.title} href={c.href} className="group overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="relative">
            <img
              src={c.img || "/placeholder.svg"}
              alt={c.title}
              className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-3 left-3">
              <h3 className={`rounded bg-white/90 px-2 py-1 text-sm font-semibold ${c.accent}`}>{c.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}
