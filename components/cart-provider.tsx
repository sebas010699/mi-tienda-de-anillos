'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  MAX_ITEMS_PER_ORDER,
  MAX_QUANTITY_PER_PRODUCT,
  PRODUCTS,
  type Product,
} from '@/lib/products'
import { getSupabaseClient } from '@/lib/supabase'

const CART_STORAGE_KEY = 'juli-y-sebas-cart'

export interface CartLine {
  id: string
  quantity: number
}

type InventoryStatus = 'loading' | 'ready' | 'unavailable' | 'error'

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null || !('id' in value) || !('quantity' in value)) {
    return false
  }
  return (
    typeof value.id === 'string' &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= MAX_QUANTITY_PER_PRODUCT
  )
}

interface CartContextValue {
  lines: CartLine[]
  products: Product[]
  inventoryStatus: InventoryStatus
  inventoryError: string | null
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (id: string) => 'unavailable' | 'out-of-stock' | 'limit' | null
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  refreshProducts: () => Promise<void>
  submitOrder: () => Promise<{ orderId: string; orderNumber: number; total: number }>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatus>('loading')
  const [inventoryError, setInventoryError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const refreshProducts = useCallback(async () => {
    const client = getSupabaseClient()
    if (!client) {
      setInventoryStatus('unavailable')
      setInventoryError(null)
      return
    }

    setInventoryStatus('loading')
    setInventoryError(null)
    const { data, error } = await client
      .from('products')
      .select('id, name, description, price_in_pesos, image, category, metal, tag, stock')
      .eq('active', true)
      .order('name')

    if (error) {
      setInventoryStatus('error')
      setInventoryError(error.message)
      throw new Error(error.message)
    }

    const liveProducts: Product[] = data.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      priceInPesos: row.price_in_pesos,
      image: row.image,
      category: row.category,
      metal: row.metal,
      tag: row.tag ?? undefined,
      stock: row.stock,
      active: true,
    }))
    setProducts(liveProducts)
    setLines((current) => {
      const validLines = current.filter((line) => {
        const product = liveProducts.find((entry) => entry.id === line.id)
        return product && (product.stock ?? 0) > 0
      })
      if (validLines.length !== current.length) {
        console.error('Se quitaron del carrito los productos que ya no están disponibles.')
      }
      return validLines.map((line) => {
        const product = liveProducts.find((entry) => entry.id === line.id)!
        return {
          ...line,
          quantity: Math.min(line.quantity, product.stock ?? 0, MAX_QUANTITY_PER_PRODUCT),
        }
      })
    })
    setInventoryStatus('ready')
  }, [])

  useEffect(() => {
    void refreshProducts().catch((error: unknown) => {
      console.error('No se pudo cargar el inventario.', error)
    })
  }, [refreshProducts])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed: unknown = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          const validLines = parsed.filter(isCartLine)
          if (validLines.length !== parsed.length) {
            console.error('Se omitieron productos inválidos del carrito guardado.')
          }
          setLines(validLines)
        } else {
          console.error('El carrito guardado tiene un formato inválido.')
        }
      }
    } catch (error) {
      console.error('No se pudo restaurar el carrito guardado.', error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
    } catch (error) {
      console.error('No se pudo guardar el carrito.', error)
    }
  }, [isHydrated, lines])

  const add = useCallback(
    (id: string) => {
      if (inventoryStatus !== 'ready') return 'unavailable'
      const product = products.find((entry) => entry.id === id)
      if (!product || (product.stock ?? 0) < 1) return 'out-of-stock'

      const currentQuantity = lines.find((line) => line.id === id)?.quantity ?? 0
      if (currentQuantity >= Math.min(product.stock ?? 0, MAX_QUANTITY_PER_PRODUCT)) {
        return 'limit'
      }

      setLines((current) => {
        const existing = current.find((line) => line.id === id)
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
          )
        }
        return [...current, { id, quantity: 1 }]
      })
      setIsOpen(true)
      return null
    },
    [inventoryStatus, lines, products],
  )

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      const product = products.find((entry) => entry.id === id)
      const maximum = Math.min(product?.stock ?? 0, MAX_QUANTITY_PER_PRODUCT)
      setLines((current) =>
        quantity <= 0
          ? current.filter((line) => line.id !== id)
          : current.map((line) =>
              line.id === id ? { ...line, quantity: Math.min(quantity, maximum) } : line,
            ),
      )
    },
    [products],
  )

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }, [])

  const submitOrder = useCallback(async () => {
    const client = getSupabaseClient()
    if (!client || inventoryStatus !== 'ready') {
      throw new Error('El inventario no está conectado. Intenta de nuevo más tarde.')
    }
    if (lines.length === 0 || lines.reduce((sum, line) => sum + line.quantity, 0) > MAX_ITEMS_PER_ORDER) {
      throw new Error('Revisa las cantidades del carrito e inténtalo de nuevo.')
    }

    const { data, error } = await client.rpc('create_order', { p_items: lines })
    if (error) throw new Error(error.message)

    const order = data?.[0]
    if (!order || typeof order.order_id !== 'string') {
      throw new Error('No se recibió la confirmación del pedido. Contacta a la tienda antes de reintentarlo.')
    }

    setLines([])
    void refreshProducts().catch((refreshError: unknown) => {
      console.error('El pedido se guardó, pero no se pudo actualizar el inventario.', refreshError)
    })
    return {
      orderId: order.order_id,
      orderNumber: order.order_number,
      total: order.total_in_pesos,
    }
  }, [inventoryStatus, lines, refreshProducts])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0)
    const subtotal = lines.reduce(
      (total, line) =>
        total + (products.find((product) => product.id === line.id)?.priceInPesos ?? 0) * line.quantity,
      0,
    )
    return {
      lines,
      products,
      inventoryStatus,
      inventoryError,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
      refreshProducts,
      submitOrder,
    }
  }, [
    lines,
    products,
    inventoryStatus,
    inventoryError,
    isOpen,
    add,
    setQuantity,
    remove,
    refreshProducts,
    submitOrder,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
