export interface Product {
  id: string
  name: string
  description: string
  priceInPesos: number
  image: string
  category: Category
  metal: Metal
  tag?: string
}

export type Category = 'animales' | 'flores' | 'minimalista' | 'statement'
export type Metal = 'dorado' | 'plateado'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'animales', label: 'Animales' },
  { value: 'flores', label: 'Flores' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'statement', label: 'Statement' },
]

export const METALS: { value: Metal; label: string }[] = [
  { value: 'dorado', label: 'Dorado' },
  { value: 'plateado', label: 'Plateado' },
]

export const MAX_QUANTITY_PER_PRODUCT = 5
export const MAX_ITEMS_PER_ORDER = 15

export const PRODUCTS: Product[] = [
  {
    id: 'anillo-oso',
    category: 'animales',
    metal: 'dorado',
    name: 'Anillo Oso',
    description: 'Un diseño dorado delicado para todos los días.',
    priceInPesos: 89000,
    image: 'https://i.imgur.com/NfxWV06.png',
    tag: 'Más vendido',
  },
  {
    id: 'anillo-lagarto',
    category: 'animales',
    metal: 'dorado',
    name: 'Anillo Lagarto',
    description: 'Líneas sutiles con un brillo que destaca.',
    priceInPesos: 76000,
    image:
      'https://img.kwcdn.com/product/fancy/50343a3e-9699-42a0-98a2-c8de4034d83a.jpg?imageView2/2/w/800/q/70/format/avif',
  },
  {
    id: 'anillo-leopardo',
    category: 'animales',
    metal: 'dorado',
    name: 'Anillo Leopardo',
    description: 'Un diseño audaz, lleno de personalidad y estilo único.',
    priceInPesos: 119000,
    image:
      'https://img.kwcdn.com/product/open/9cb0d5208b424695af864db466370242-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    tag: 'Edición limitada',
  },
  {
    id: 'anillo-retro-flores',
    category: 'flores',
    metal: 'dorado',
    name: 'Anillo Retro de Flores',
    description: 'Un acabado moderno y fácil de combinar.',
    priceInPesos: 82000,
    image:
      'https://img.kwcdn.com/product/open/252d780037b3465fb6fcbdf881a5cfa0-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
  },
  {
    id: 'anillo-margarita',
    category: 'flores',
    metal: 'plateado',
    name: 'Anillo de Margarita',
    description: 'Un diseño inspirado en la naturaleza.',
    priceInPesos: 95000,
    image:
      'https://img.kwcdn.com/product/fancy/185e214d-2bc9-417b-a426-71dd70dcab02.jpg?imageView2/2/w/800/q/70/format/avif',
    tag: 'Nuevo',
  },
  {
    id: 'anillo-serpiente',
    category: 'animales',
    metal: 'dorado',
    name: 'Anillo Serpiente',
    description: 'Una serpiente envolvente que simboliza transformación.',
    priceInPesos: 112000,
    image: '/images/products/serpiente.png',
    tag: 'Nuevo',
  },
  {
    id: 'anillo-mariposa',
    category: 'animales',
    metal: 'plateado',
    name: 'Anillo Mariposa',
    description: 'Ligero y delicado, como un vuelo de primavera.',
    priceInPesos: 69000,
    image: '/images/products/mariposa.png',
  },
  {
    id: 'anillo-colibri',
    category: 'animales',
    metal: 'dorado',
    name: 'Anillo Colibrí',
    description: 'Detalles de esmalte verde inspirados en nuestras aves.',
    priceInPesos: 129000,
    image: '/images/products/colibri.png',
    tag: 'Edición limitada',
  },
  {
    id: 'anillo-buho',
    category: 'animales',
    metal: 'plateado',
    name: 'Anillo Búho',
    description: 'Plata envejecida con plumaje tallado a mano.',
    priceInPesos: 98000,
    image: '/images/products/buho.png',
  },
  {
    id: 'anillo-rosa-vintage',
    category: 'flores',
    metal: 'dorado',
    name: 'Anillo Rosa Vintage',
    description: 'Una rosa esculpida con alma de joya antigua.',
    priceInPesos: 105000,
    image: '/images/products/rosa.png',
  },
  {
    id: 'anillo-lirio',
    category: 'flores',
    metal: 'plateado',
    name: 'Anillo Lirio',
    description: 'Pétalos elegantes que abrazan tu dedo.',
    priceInPesos: 79000,
    image: '/images/products/lirio.png',
  },
  {
    id: 'anillo-girasol',
    category: 'flores',
    metal: 'dorado',
    name: 'Anillo Girasol',
    description: 'Un rayo de sol con centro texturizado.',
    priceInPesos: 88000,
    image: '/images/products/girasol.png',
    tag: 'Más vendido',
  },
  {
    id: 'anillo-tulipan',
    category: 'flores',
    metal: 'plateado',
    name: 'Anillo Tulipán',
    description: 'Plata minimalista con una piedra rosa sutil.',
    priceInPesos: 72000,
    image: '/images/products/tulipan.png',
  },
  {
    id: 'anillo-luna',
    category: 'minimalista',
    metal: 'plateado',
    name: 'Anillo Luna Creciente',
    description: 'Una media luna fina para usar sola o en capas.',
    priceInPesos: 59000,
    image: '/images/products/luna.png',
  },
  {
    id: 'anillo-infinito',
    category: 'minimalista',
    metal: 'dorado',
    name: 'Anillo Infinito',
    description: 'El símbolo del amor eterno en oro pulido.',
    priceInPesos: 65000,
    image: '/images/products/infinito.png',
  },
  {
    id: 'anillo-perla',
    category: 'minimalista',
    metal: 'dorado',
    name: 'Anillo Perla Solitaria',
    description: 'Una perla de agua dulce sobre un aro dorado.',
    priceInPesos: 92000,
    image: '/images/products/perla.png',
    tag: 'Nuevo',
  },
  {
    id: 'anillo-trenzado',
    category: 'minimalista',
    metal: 'plateado',
    name: 'Anillo Trenzado',
    description: 'Hilos de plata entrelazados con precisión.',
    priceInPesos: 62000,
    image: '/images/products/trenzado.png',
  },
  {
    id: 'anillo-sello-sol',
    category: 'statement',
    metal: 'dorado',
    name: 'Anillo Sello Sol',
    description: 'Un sello robusto grabado con un sol radiante.',
    priceInPesos: 149000,
    image: '/images/products/sello.png',
  },
  {
    id: 'anillo-esmeralda',
    category: 'statement',
    metal: 'dorado',
    name: 'Anillo Esmeralda Antiguo',
    description: 'Una piedra verde intensa en montura de inspiración antigua.',
    priceInPesos: 179000,
    image: '/images/products/esmeralda.png',
    tag: 'Edición limitada',
  },
  {
    id: 'anillo-ola',
    category: 'statement',
    metal: 'plateado',
    name: 'Anillo Ola Cósmica',
    description: 'Plata escultórica con un zafiro azul profundo.',
    priceInPesos: 139000,
    image: '/images/products/ola.png',
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
