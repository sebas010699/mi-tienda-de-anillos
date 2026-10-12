'use client'

import { useState } from 'react'

import { useCart } from '@/components/cart-provider'
import { whatsappLink } from '@/components/whatsapp-button'
import { formatPrice, type Product } from '@/lib/products'
import { productImage } from '@/lib/site'

export function ProductCard({ product }: { product: Product }) {
  const { add, inventoryStatus } = useCart()
  const [message, setMessage] = useState('')
  const unavailable = inventoryStatus !== 'ready' || !product.stock

  function addToCart() {
    const result = add(product.id)
    setMessage(
      result === 'unavailable'
        ? 'El inventario no está disponible.'
        : result === 'out-of-stock'
          ? 'Esta pieza está agotada.'
          : result === 'limit'
            ? 'No hay más unidades disponibles.'
            : '',
    )
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.image)}
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
          onClick={addToCart}
          disabled={unavailable}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 bg-forest py-3.5 text-[11px] tracking-[0.18em] text-paper uppercase opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold focus-visible:translate-y-0 focus-visible:opacity-100 disabled:cursor-not-allowed disabled:bg-muted md:block"
        >
          {inventoryStatus !== 'ready'
            ? 'Inventario no disponible'
            : product.stock === 0
              ? 'Agotado'
              : 'Añadir a la bolsa'}
        </button>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl text-ink md:text-2xl">{product.name}</h3>
          <p className="shrink-0 text-sm font-medium text-forest">{formatPrice(product.priceInPesos)}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
        <p className="mt-2 text-xs text-muted">
          {product.stock === undefined
            ? 'Inventario sin confirmar'
            : product.stock === 0
              ? 'Agotado'
              : `${product.stock} ${product.stock === 1 ? 'unidad disponible' : 'unidades disponibles'}`}
        </p>
        {message && <p role="status" className="mt-2 text-xs text-red-800">{message}</p>}
        <div className="mt-auto flex flex-col gap-2 pt-5">
          <button
            type="button"
            onClick={addToCart}
            disabled={unavailable}
            className="bg-forest py-3.5 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-muted md:hidden"
          >
            {inventoryStatus !== 'ready'
              ? 'Inventario no disponible'
              : product.stock === 0
                ? 'Agotado'
                : 'Añadir a la bolsa'}
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
