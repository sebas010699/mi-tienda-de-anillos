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
    <section aria-labelledby="opiniones" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Opiniones</p>
        <h2 id="opiniones" className="mt-4 font-serif text-4xl text-ink md:text-5xl">
          Lo que dicen nuestras clientas
        </h2>
      </div>
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <li key={review.name} className="flex flex-col border border-line bg-paper p-8">
            <div className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-ink">
              {`"${review.quote}"`}
            </blockquote>
            <p className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">
              {review.name} · {review.city}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
