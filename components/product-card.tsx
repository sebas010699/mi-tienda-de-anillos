'use client'

import { useCart } from '@/components/cart-provider'
import { whatsappLink } from '@/components/whatsapp-button'
import { formatPrice, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-paper/95 px-3 py-1.5 text-[10px] tracking-[0.16em] text-forest uppercase">
            {product.tag}
          </span>
        )}
        <button
          type="button"
          onClick={() => add(product.id)}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 bg-forest py-3.5 text-[11px] tracking-[0.18em] text-paper uppercase opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold focus-visible:translate-y-0 focus-visible:opacity-100 md:block"
        >
          Añadir a la bolsa
        </button>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl text-ink md:text-2xl">{product.name}</h3>
          <p className="shrink-0 text-sm font-medium text-forest">{formatPrice(product.priceInPesos)}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
        <div className="mt-auto flex flex-col gap-2 pt-5">
          <button
            type="button"
            onClick={() => add(product.id)}
            className="bg-forest py-3.5 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold md:hidden"
          >
            Añadir a la bolsa
          </button>
          <a
            href={whatsappLink(`Hola, quiero información sobre el ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[11px] tracking-[0.16em] text-muted uppercase underline-offset-4 transition hover:text-gold hover:underline md:text-left"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
