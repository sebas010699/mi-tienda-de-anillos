'use client'

import Link from 'next/link'

import { useCart } from '@/components/cart-provider'
import { whatsappLink } from '@/components/whatsapp-button'
import { formatPrice, getProduct } from '@/lib/products'
import { productImage } from '@/lib/site'

export function CheckoutView() {
  const { lines, subtotal } = useCart()

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center">
        <h1 className="font-serif text-4xl text-ink">Tu bolsa está vacía</h1>
        <p className="mt-4 text-muted">Añade una pieza de la colección para continuar.</p>
        <Link
          href="/#coleccion"
          className="mt-8 bg-forest px-8 py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
        >
          Ver colección
        </Link>
      </div>
    )
  }

  const message = [
    'Hola, quiero finalizar este pedido:',
    ...lines.map((line) => {
      const product = getProduct(line.id)
      return product ? `- ${line.quantity} x ${product.name}` : null
    }).filter(Boolean),
    `Total: ${formatPrice(subtotal)}`,
  ].join('\n')

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="mx-auto h-fit max-w-2xl border border-line bg-paper p-8 text-center">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Finalizar compra</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Pago por WhatsApp</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Confirma tu pedido por WhatsApp y coordinaremos el pago de forma directa.
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex bg-forest px-8 py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
        >
          Enviar pedido
        </a>
      </div>

      <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-32">
        <h2 className="font-serif text-2xl text-ink">Resumen del pedido</h2>
        <ul className="mt-5 divide-y divide-line">
          {lines.map((line) => {
            const product = getProduct(line.id)
            if (!product) return null
            return (
              <li key={line.id} className="flex items-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={productImage(product.image)} alt="" className="size-16 shrink-0 bg-ivory object-cover" />
                <div className="flex-1">
                  <p className="font-serif text-lg leading-tight text-ink">{product.name}</p>
                  <p className="text-xs text-muted">{`Cantidad: ${line.quantity}`}</p>
                </div>
                <p className="text-sm text-ink">
                  {formatPrice(product.priceInPesos * line.quantity)}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Envío</span>
            <span className="text-forest">Gratis</span>
          </div>
          <div className="flex items-baseline justify-between pt-2">
            <span className="text-xs tracking-[0.16em] text-ink uppercase">Total</span>
            <span className="font-serif text-2xl text-ink">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
