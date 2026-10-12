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

import { MAX_QUANTITY_PER_PRODUCT, getProduct } from '@/lib/products'

const CART_STORAGE_KEY = 'juli-y-sebas-cart'

export interface CartLine {
  id: string
  quantity: number
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null || !('id' in value) || !('quantity' in value)) {
    return false
  }
  return (
    typeof value.id === 'string' &&
    Boolean(getProduct(value.id)) &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= MAX_QUANTITY_PER_PRODUCT
  )
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

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

  const add = useCallback((id: string) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === id)
      if (existing) {
        return current.map((line) =>
          line.id === id
            ? { ...line, quantity: Math.min(line.quantity + 1, MAX_QUANTITY_PER_PRODUCT) }
            : line,
        )
      }
      return [...current, { id, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY_PER_PRODUCT) }
              : line,
          ),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0)
    const subtotal = lines.reduce(
      (total, line) => total + (getProduct(line.id)?.priceInPesos ?? 0) * line.quantity,
      0,
    )
    return {
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
    }
  }, [lines, isOpen, add, setQuantity, remove])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
