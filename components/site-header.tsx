'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

import { useCart } from '@/components/cart-provider'

const NAV = [
  { href: '/#coleccion', label: 'Colección' },
  { href: '/#historia', label: 'Nuestra historia' },
  { href: '/#preguntas', label: 'Preguntas' },
]

export function SiteHeader() {
  const { count, open } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <p className="bg-forest px-4 py-2 text-center text-[11px] tracking-[0.18em] text-paper/90 uppercase">
        Envío gratis a toda Colombia · Empaque de regalo incluido
      </p>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="font-serif text-2xl tracking-wide text-ink md:text-3xl">
          Juli <span className="text-gold italic">&amp;</span> Sebas
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-[0.16em] text-ink/80 uppercase transition hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={open}
          className="relative flex items-center gap-2 text-xs tracking-[0.16em] text-ink uppercase transition hover:text-gold"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">Bolsa</span>
          <span className="sr-only">{`, ${count} productos`}</span>
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-2 -left-2 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-paper"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
