import { Gift, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Envío gratis', text: 'A toda Colombia en 2 a 5 días' },
  { icon: ShieldCheck, title: 'Pago seguro', text: 'Tarjetas protegidas con Stripe' },
  { icon: Gift, title: 'Listo para regalar', text: 'Estuche y tarjeta personalizada' },
  { icon: Sparkles, title: 'Garantía', text: '6 meses en todas las piezas' },
]

export function TrustBar() {
  return (
    <section aria-label="Beneficios" className="border-y border-line bg-paper">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col items-center gap-2 px-3 text-center">
            <Icon className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-1 font-serif text-lg text-ink">{title}</p>
            <p className="text-xs text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
