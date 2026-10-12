'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

import { useCart } from '@/components/cart-provider'
import { siteAsset } from '@/lib/site'

const NAV = [
  { href: siteAsset('/#coleccion'), label: 'Colección' },
  { href: siteAsset('/#historia'), label: 'Nuestra historia' },
  { href: siteAsset('/#preguntas'), label: 'Preguntas' },
]

export function SiteHeader() {
  const { count, open } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/95 backdrop-blur-xl">
      <p className="bg-forest px-4 py-2 text-center text-[9px] tracking-[0.2em] text-paper/90 uppercase sm:text-[10px]">
        Envío gratis a toda Colombia <span className="px-2 text-gold">✳</span> Empaque de regalo incluido
      </p>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link href="/" className="group flex shrink-0 flex-col leading-none">
          <span className="font-serif text-[25px] tracking-tight text-ink md:text-3xl">
            Juli <span className="text-gold italic">&amp;</span> Sebas
          </span>
          <span className="mt-1.5 text-[8px] tracking-[0.28em] text-muted uppercase transition-colors group-hover:text-gold">
            Joyas para contar historias
          </span>
        </Link>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-[10px] tracking-[0.18em] text-ink/75 uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-ink hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={open}
          className="relative flex shrink-0 items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-[10px] tracking-[0.16em] text-ink uppercase transition hover:border-forest hover:bg-forest hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <ShoppingBag className="size-4" strokeWidth={1.6} aria-hidden="true" />
          <span className="hidden sm:inline">Bolsa</span>
          <span className="sr-only">{`, ${count} ${count === 1 ? 'producto' : 'productos'}`}</span>
          {count > 0 && (
            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-paper"
            >
              {count}
            </span>
          )}
        </button>
      </div>
      <nav aria-label="Navegación móvil" className="flex items-center justify-center gap-6 border-t border-line/70 px-4 py-2.5 lg:hidden">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[9px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-gold sm:text-[10px]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
