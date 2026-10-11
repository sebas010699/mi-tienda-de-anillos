import Image from 'next/image'

export function Story() {
  return (
    <section id="historia" className="scroll-mt-28 bg-forest text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-28">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src="/images/atelier.png"
            alt="Estuche de terciopelo verde con un anillo dorado y tarjeta de regalo"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Nuestra historia</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-balance md:text-5xl">
            Detalles pensados con <em className="text-gold">cariño</em>, para acompañarte siempre
          </h2>
          <p className="mt-6 leading-relaxed text-paper/75">
            Juli y Sebas nació de una idea sencilla: que cada accesorio tenga un significado.
            Seleccionamos cada pieza a mano, revisamos sus acabados y la entregamos en un estuche
            listo para regalar.
          </p>
          <p className="mt-4 leading-relaxed text-paper/75">
            Trabajamos en colecciones pequeñas para que lo que lleves sea tan especial como tú.
          </p>
          <p className="mt-10 font-serif text-2xl text-gold italic">Juli &amp; Sebas</p>
        </div>
      </div>
    </section>
  )
}
