import { ProductCatalog } from '@/components/product-catalog'

export function ProductGrid() {
  return (
    <section id="coleccion" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">La colección</p>
        <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Encuentra tu anillo</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Veinte piezas elegidas para darle un toque único a tu estilo. Unidades limitadas por
          colección.
        </p>
      </div>
      <ProductCatalog />
    </section>
  )
}
