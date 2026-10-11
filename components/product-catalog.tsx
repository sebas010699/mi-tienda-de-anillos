'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import {
  CATEGORIES,
  METALS,
  PRODUCTS,
  formatPrice,
  type Category,
  type Metal,
} from '@/lib/products'

type Sort = 'destacados' | 'precio-asc' | 'precio-desc' | 'nombre'

const PRICE_RANGES = [
  { value: 'todos', label: 'Todos los precios', min: 0, max: Infinity },
  { value: 'hasta-80', label: `Hasta ${formatPrice(80000)}`, min: 0, max: 80000 },
  { value: '80-120', label: `${formatPrice(80000)} – ${formatPrice(120000)}`, min: 80000, max: 120000 },
  { value: 'mas-120', label: `Más de ${formatPrice(120000)}`, min: 120000, max: Infinity },
] as const

type PriceRange = (typeof PRICE_RANGES)[number]['value']

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition ${
        active
          ? 'border-forest bg-forest text-paper'
          : 'border-line bg-paper text-ink hover:border-gold hover:text-gold'
      }`}
    >
      {children}
    </button>
  )
}

export function ProductCatalog() {
  const [category, setCategory] = useState<Category | 'todas'>('todas')
  const [metal, setMetal] = useState<Metal | 'todos'>('todos')
  const [price, setPrice] = useState<PriceRange>('todos')
  const [sort, setSort] = useState<Sort>('destacados')

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === price)!
    const list = PRODUCTS.filter(
      (p) =>
        (category === 'todas' || p.category === category) &&
        (metal === 'todos' || p.metal === metal) &&
        p.priceInPesos >= range.min &&
        p.priceInPesos < range.max,
    )
    if (sort === 'precio-asc') return [...list].sort((a, b) => a.priceInPesos - b.priceInPesos)
    if (sort === 'precio-desc') return [...list].sort((a, b) => b.priceInPesos - a.priceInPesos)
    if (sort === 'nombre') return [...list].sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return list
  }, [category, metal, price, sort])

  const hasFilters = category !== 'todas' || metal !== 'todos' || price !== 'todos'

  function reset() {
    setCategory('todas')
    setMetal('todos')
    setPrice('todos')
  }

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-6 border-y border-line py-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
          <Chip active={category === 'todas'} onClick={() => setCategory('todas')}>
            Todas
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
              {c.label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">Metal</span>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value as Metal | 'todos')}
                className="min-w-36 border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
              >
                <option value="todos">Todos</option>
                {METALS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">Precio</span>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value as PriceRange)}
                className="min-w-48 border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
            {hasFilters && (
              <button
                type="button"
                onClick={reset}
                className="py-2.5 text-[11px] tracking-[0.16em] text-muted uppercase underline-offset-4 hover:text-gold hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-end justify-between gap-4 md:justify-end">
            <p className="py-2.5 text-sm text-muted" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'pieza' : 'piezas'}
            </p>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">Ordenar</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="min-w-44 border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A–Z</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-24 text-center">
          <p className="font-serif text-2xl text-ink">No encontramos piezas con esos filtros</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 bg-forest px-8 py-3.5 text-[11px] tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
          >
            Ver toda la colección
          </button>
        </div>
      )}
    </div>
  )
}
