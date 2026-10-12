import { ProductCatalog } from '@/components/product-catalog'

export function ProductGrid() {
  return (
    <section id="coleccion" className="scroll-mt-40 bg-paper lg:scroll-mt-28">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-5 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] tracking-[0.24em] text-gold uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              Hecho para elegir con calma
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-6xl">Encuentra tu anillo</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted md:pb-1">
            Diseños seleccionados para acompañar tus momentos y convertirse en parte de tu historia.
          </p>
        </div>
        <ProductCatalog />
      </div>
    </section>
  )
}
