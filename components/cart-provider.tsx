'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { MAX_QUANTITY_PER_PRODUCT, getProduct } from '@/lib/products'

export interface CartLine {
  id: string
  quantity: number
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
