export interface Product {
  id: string
  name: string
  description: string
  priceInPesos: number
  image: string
  tag?: string
}

export const MAX_QUANTITY_PER_PRODUCT = 5
export const MAX_ITEMS_PER_ORDER = 15

export const PRODUCTS: Product[] = [
  {
    id: 'anillo-oso',
    name: 'Anillo Oso',
    description: 'Un diseño dorado delicado para todos los días.',
    priceInPesos: 89000,
    image: 'https://i.imgur.com/NfxWV06.png',
    tag: 'Más vendido',
  },
  {
    id: 'anillo-lagarto',
    name: 'Anillo Lagarto',
    description: 'Líneas sutiles con un brillo que destaca.',
    priceInPesos: 76000,
    image:
      'https://img.kwcdn.com/product/fancy/50343a3e-9699-42a0-98a2-c8de4034d83a.jpg?imageView2/2/w/800/q/70/format/avif',
  },
  {
    id: 'anillo-leopardo',
    name: 'Anillo Leopardo',
    description: 'Un diseño audaz, lleno de personalidad y estilo único.',
    priceInPesos: 119000,
    image:
      'https://img.kwcdn.com/product/open/9cb0d5208b424695af864db466370242-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    tag: 'Edición limitada',
  },
  {
    id: 'anillo-retro-flores',
    name: 'Anillo Retro de Flores',
    description: 'Un acabado moderno y fácil de combinar.',
    priceInPesos: 82000,
    image:
      'https://img.kwcdn.com/product/open/252d780037b3465fb6fcbdf881a5cfa0-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
  },
  {
    id: 'anillo-margarita',
    name: 'Anillo de Margarita',
    description: 'Un diseño inspirado en la naturaleza.',
    priceInPesos: 95000,
    image:
      'https://img.kwcdn.com/product/fancy/185e214d-2bc9-417b-a426-71dd70dcab02.jpg?imageView2/2/w/800/q/70/format/avif',
    tag: 'Nuevo',
  },
]

export function getProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id)
}

const pesoFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatPrice(pesos: number) {
  return pesoFormatter.format(pesos)
}
