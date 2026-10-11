import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-8 md:py-20">
      <div className="flex flex-col items-start">
        <p className="text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
          Colección Esencial · 2026
        </p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-balance text-ink md:text-7xl">
          Piezas que cuentan <em className="text-forest">tu historia</em>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted">
          Anillos de diseño exclusivo, seleccionados a mano y entregados en un empaque pensado para
          regalar. Producciones limitadas para quienes valoran los detalles.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#coleccion"
            className="bg-forest px-8 py-4 text-xs font-medium tracking-[0.18em] text-paper uppercase transition hover:bg-gold"
          >
            Descubrir colección
          </Link>
          <Link
            href="#historia"
            className="border-b border-ink/40 pb-1 text-xs tracking-[0.18em] text-ink uppercase transition hover:border-gold hover:text-gold"
          >
            Nuestra historia
          </Link>
        </div>
        <dl className="mt-12 grid w-full max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
          {[
            ['+1.200', 'Clientes felices'],
            ['4.9/5', 'Valoración'],
            ['100%', 'Pago seguro'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-3xl text-ink">{value}</dd>
              <dd className="mt-1 text-[11px] tracking-wider text-muted uppercase">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-line">
          <Image
            src="/images/hero.png"
            alt="Mano con anillos dorados sobre seda color marfil"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-6 bg-paper px-6 py-4 shadow-xl shadow-ink/5 md:-left-8">
          <p className="text-[10px] tracking-[0.2em] text-gold uppercase">Hecho para durar</p>
          <p className="mt-1 font-serif text-xl text-ink">Garantía de 6 meses</p>
        </div>
      </div>
    </section>
  )
}
