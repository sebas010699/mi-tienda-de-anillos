'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Lock, Minus, Plus, X } from 'lucide-react'

import { useCart } from '@/components/cart-provider'
import { MAX_QUANTITY_PER_PRODUCT, formatPrice, getProduct } from '@/lib/products'

export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu bolsa de compras"
        inert={!isOpen}
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl text-ink">Tu bolsa</h2>
          <button type="button" onClick={close} className="text-ink transition hover:text-gold">
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl text-ink">Tu bolsa está vacía</p>
            <p className="text-sm text-muted">Descubre piezas pensadas para ti.</p>
            <Link
              href="/#coleccion"
              onClick={close}
              className="mt-2 bg-forest px-8 py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
            >
              Ver colección
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => {
                const product = getProduct(line.id)
                if (!product) return null
                return (
                  <li key={line.id} className="flex gap-4 py-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt=""
                      className="size-24 shrink-0 bg-ivory object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-serif text-lg leading-tight text-ink">{product.name}</p>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className="text-muted transition hover:text-ink"
                        >
                          <X className="size-4" aria-hidden="true" />
                          <span className="sr-only">{`Quitar ${product.name}`}</span>
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-forest">
                        {formatPrice(product.priceInPesos)}
                      </p>
                      <div className="mt-auto flex w-fit items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          className="p-2 text-ink transition hover:text-gold"
                        >
                          <Minus className="size-3" aria-hidden="true" />
                          <span className="sr-only">Disminuir cantidad</span>
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          disabled={line.quantity >= MAX_QUANTITY_PER_PRODUCT}
                          className="p-2 text-ink transition hover:text-gold disabled:opacity-30"
                        >
                          <Plus className="size-3" aria-hidden="true" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Envío</span>
                <span className="text-forest">Gratis</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-xs tracking-[0.16em] text-ink uppercase">Subtotal</span>
                <span className="font-serif text-2xl text-ink">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-forest py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
              >
                <Lock className="size-3.5" aria-hidden="true" />
                Pagar de forma segura
              </Link>
              <p className="mt-3 text-center text-xs text-muted">
                Pago cifrado y procesado por Stripe
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
