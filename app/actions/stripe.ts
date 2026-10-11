'use server'

import { randomUUID } from 'node:crypto'

import { stripe } from '@/lib/stripe'
import { MAX_ITEMS_PER_ORDER, MAX_QUANTITY_PER_PRODUCT, getProduct } from '@/lib/products'

export interface CheckoutItem {
  id: string
  quantity: number
}

export async function startCheckoutSession(items: CheckoutItem[], requestId: string) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Tu carrito está vacío.')
  }

  const quantities = new Map<string, number>()
  for (const item of items) {
    const quantity = Number(item?.quantity)
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Cantidad inválida.')
    }
    if (!getProduct(String(item?.id))) {
      throw new Error('Producto no encontrado.')
    }
    quantities.set(item.id, (quantities.get(item.id) ?? 0) + quantity)
  }

  let totalItems = 0
  for (const quantity of quantities.values()) {
    if (quantity > MAX_QUANTITY_PER_PRODUCT) {
      throw new Error(`Máximo ${MAX_QUANTITY_PER_PRODUCT} unidades por producto.`)
    }
    totalItems += quantity
  }
  if (totalItems > MAX_ITEMS_PER_ORDER) {
    throw new Error(`Máximo ${MAX_ITEMS_PER_ORDER} piezas por pedido.`)
  }

  const lineItems = [...quantities.entries()].map(([id, quantity]) => {
    const product = getProduct(id)!
    return {
      price_data: {
        currency: 'cop',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceInPesos * 100,
      },
      quantity,
    }
  })

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['CO'] },
      phone_number_collection: { enabled: true },
      locale: 'es',
    },
    { idempotencyKey: typeof requestId === 'string' && requestId ? requestId : randomUUID() },
  )

  if (!session.client_secret) {
    throw new Error('No se pudo iniciar el pago.')
  }

  return session.client_secret
}
