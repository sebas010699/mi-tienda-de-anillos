import Image from 'next/image'

import { siteAsset } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-40 -z-10 size-[32rem] rounded-full bg-gold/5 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:py-20 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:px-8 md:py-24 lg:gap-24 lg:py-28">
        <div className="flex flex-col items-start">
          <p className="flex items-center gap-3 text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Colección esencial · 2026
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-[clamp(3.4rem,7vw,6.8rem)] leading-[0.94] tracking-[-0.055em] text-balance text-ink">
            El detalle que <em className="font-normal text-forest">habla de ti.</em>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-7 text-pretty text-muted md:text-base">
            Anillos seleccionados a mano para celebrar lo cotidiano. Diseños especiales, listos para
            regalar y hechos para acompañarte.
          </p>
          <div className="mt-9 flex w-full flex-wrap items-center gap-4">
            <a
              href={siteAsset('/#coleccion')}
              className="inline-flex min-h-13 items-center justify-center gap-3 bg-forest px-7 py-4 text-[10px] font-medium tracking-[0.18em] text-paper uppercase shadow-lg shadow-forest/10 transition duration-300 hover:-translate-y-0.5 hover:bg-gold hover:shadow-gold/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Descubrir colección
              <span aria-hidden="true" className="text-base leading-none">↗</span>
            </a>
            <a
              href={siteAsset('/#historia')}
              className="border-b border-ink/25 pb-1.5 text-[10px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Nuestra historia
            </a>
          </div>
          <div className="mt-12 flex w-full max-w-md items-center gap-5 border-t border-line pt-6">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-ivory bg-forest text-[10px] text-paper">J</span>
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-ivory bg-gold text-[10px] text-paper">S</span>
            </div>
            <p className="max-w-56 text-xs leading-5 text-muted">
              Una selección cercana, preparada con cuidado para ti.
            </p>
            <span className="ml-auto hidden font-serif text-2xl text-gold sm:block" aria-hidden="true">J&amp;S</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl md:max-w-none">
          <div
            className="absolute -inset-3 translate-x-2 translate-y-2 border border-gold/30 md:-inset-4"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/4.3] overflow-hidden bg-line">
            <Image
              src={siteAsset('/images/hero.png')}
              alt="Mano con anillos dorados sobre seda color marfil"
              fill
              priority
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            <div className="absolute right-5 bottom-5 text-right text-[9px] tracking-[0.2em] text-paper uppercase sm:right-7 sm:bottom-7">
              Juli &amp; Sebas <span className="ml-2 text-gold">✳</span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-2 flex items-center gap-3 border border-line bg-paper px-4 py-3 shadow-xl shadow-ink/10 sm:-left-7 sm:px-5">
            <span className="flex size-9 items-center justify-center rounded-full bg-ivory font-serif text-lg text-gold" aria-hidden="true">✳</span>
            <div>
              <p className="text-[9px] tracking-[0.16em] text-muted uppercase">Un detalle especial</p>
              <p className="mt-1 font-serif text-base text-ink sm:text-lg">Empaque listo para regalar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
