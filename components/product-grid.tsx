import { PRODUCTS } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function ProductGrid() {
  return (
    <section id="coleccion" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Una selección especial</p>
        <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Nuestros favoritos</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Cinco piezas elegidas para darle un toque único a tu estilo. Unidades limitadas por
          colección.
        </p>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
