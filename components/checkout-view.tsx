'use client'

import Link from 'next/link'
import { useState } from 'react'

import { useCart } from '@/components/cart-provider'
import { whatsappLink } from '@/components/whatsapp-button'
import { formatPrice } from '@/lib/products'
import { productImage } from '@/lib/site'

export function CheckoutView() {
  const { lines, products, inventoryStatus, inventoryError, subtotal, submitOrder } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  const canSubmit = inventoryStatus === 'ready' && !isSubmitting

  async function handleSubmit() {
    if (!canSubmit) return
    setErrorMessage(null)
    setIsSubmitting(true)
    const whatsappWindow = window.open('', '_blank')

    try {
      const order = await submitOrder()
      const orderLines = lines.map((line) => {
        const product = products.find((entry) => entry.id === line.id)
        return product ? `- ${line.quantity} x ${product.name}` : null
      }).filter((line): line is string => line !== null)
      const message = [
        `Hola, quiero confirmar el pedido #${order.orderNumber}.`,
        ...orderLines,
        `Total: ${formatPrice(order.total)}`,
        `Referencia: ${order.orderId}`,
      ].join('\n')
      const destination = whatsappLink(message)

      if (whatsappWindow) {
        whatsappWindow.opener = null
        whatsappWindow.location.href = destination
      } else {
        window.location.assign(destination)
      }
    } catch (error) {
      whatsappWindow?.close()
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo registrar el pedido.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="mx-auto h-fit max-w-2xl border border-line bg-paper p-8 text-center">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Finalizar compra</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Pago por WhatsApp</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Registraremos tu pedido y reservaremos las unidades antes de abrir WhatsApp.
        </p>
        {inventoryStatus === 'error' && (
          <p role="alert" className="mt-4 text-sm text-red-800">
            No se pudo validar el inventario: {inventoryError}
          </p>
        )}
        {inventoryStatus === 'unavailable' && (
          <p role="alert" className="mt-4 text-sm text-red-800">
            La conexión del inventario aún no está configurada; no es posible registrar el pedido.
          </p>
        )}
        {errorMessage && <p role="alert" className="mt-4 text-sm text-red-800">{errorMessage}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-8 inline-flex bg-forest px-8 py-4 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-muted"
        >
          {isSubmitting ? 'Registrando pedido...' : 'Registrar pedido y abrir WhatsApp'}
        </button>
      </div>

      <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-32">
        <h2 className="font-serif text-2xl text-ink">Resumen del pedido</h2>
        <ul className="mt-5 divide-y divide-line">
          {lines.map((line) => {
            const product = products.find((entry) => entry.id === line.id)
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
