'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle2, Lock } from 'lucide-react'

import { startCheckoutSession } from '@/app/actions/stripe'
import { useCart, type CartLine } from '@/components/cart-provider'
import { formatPrice, getProduct } from '@/lib/products'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export function CheckoutView() {
  const { lines, subtotal, clear } = useCart()
  const [snapshot, setSnapshot] = useState<CartLine[] | null>(null)
  const [completed, setCompleted] = useState(false)

  const orderLines = snapshot ?? lines
  const orderTotal = orderLines.reduce(
    (total, line) => total + (getProduct(line.id)?.priceInPesos ?? 0) * line.quantity,
    0,
  )

  const fetchClientSecret = useCallback(() => {
    const items = lines.map(({ id, quantity }) => ({ id, quantity }))
    setSnapshot(items)
    return startCheckoutSession(items, crypto.randomUUID())
    // Only create one session per visit to the checkout page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleComplete = useCallback(() => {
    setCompleted(true)
    clear()
  }, [clear])

  if (completed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center">
        <CheckCircle2 className="size-12 text-forest" strokeWidth={1.25} aria-hidden="true" />
        <h1 className="mt-6 font-serif text-4xl text-ink md:text-5xl">¡Gracias por tu compra!</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Recibimos tu pedido. Te enviaremos la confirmación y el número de guía a tu correo.
          Preparamos tu pieza con todo el cuidado que merece.
        </p>
        <Link
          href="/"
          className="mt-8 bg-forest px-8 py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
        >
          Volver a la tienda
        </Link>
      </div>
    )
  }

  if (lines.length === 0 && !snapshot) {
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

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Finalizar compra</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Pago seguro</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <Lock className="size-3.5" aria-hidden="true" />
          Tus datos están cifrados y protegidos por Stripe.
        </p>
        <div id="checkout" className="mt-8 overflow-hidden border border-line bg-paper p-2 md:p-4">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret, onComplete: handleComplete }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>

      <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-32">
        <h2 className="font-serif text-2xl text-ink">Resumen del pedido</h2>
        <ul className="mt-5 divide-y divide-line">
          {orderLines.map((line) => {
            const product = getProduct(line.id)
            if (!product) return null
            return (
              <li key={line.id} className="flex items-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt="" className="size-16 shrink-0 bg-ivory object-cover" />
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
            <span className="font-serif text-2xl text-ink">
              {formatPrice(snapshot ? orderTotal : subtotal)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  )
}
