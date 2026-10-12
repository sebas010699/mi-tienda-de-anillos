import { Star } from 'lucide-react'

const REVIEWS = [
  {
    quote: 'El empaque es precioso y el anillo es aún más lindo en persona. Fue el regalo perfecto.',
    name: 'Valentina R.',
    city: 'Bogotá',
  },
  {
    quote: 'Llegó en tres días y la atención por WhatsApp fue impecable. Ya voy por mi segundo.',
    name: 'Camila M.',
    city: 'Medellín',
  },
  {
    quote: 'Diseños diferentes a lo que se ve siempre. Lo uso todos los días y sigue como nuevo.',
    name: 'Daniela P.',
    city: 'Cali',
  },
]

export function Testimonials() {
  return (
    <section aria-labelledby="opiniones" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-5 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] tracking-[0.24em] text-gold uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              Notas de cariño
            </p>
            <h2 id="opiniones" className="mt-4 max-w-xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
              Historias que se llevan puestas
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted md:pb-1">
            Cada pieza se entrega con el mismo cuidado con el que fue elegida.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <li key={review.name} className="group flex min-h-64 flex-col border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="font-serif text-2xl text-gold/50" aria-hidden="true">0{index + 1}</span>
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-xl leading-snug text-ink">
                “{review.quote}”
              </blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-ivory font-serif text-sm text-forest" aria-hidden="true">
                  {review.name.charAt(0)}
                </span>
                <p className="text-[10px] tracking-[0.14em] text-muted uppercase">
                  {review.name} <span className="px-1 text-gold">·</span> {review.city}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
