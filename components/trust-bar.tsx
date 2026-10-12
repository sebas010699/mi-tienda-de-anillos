import { Gift, MessageCircle, Sparkles, Truck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Envío gratis', text: 'A toda Colombia en 2 a 5 días' },
  { icon: MessageCircle, title: 'Pedido directo', text: 'Confirma por WhatsApp' },
  { icon: Gift, title: 'Listo para regalar', text: 'Estuche y tarjeta personalizada' },
  { icon: Sparkles, title: 'Garantía', text: '6 meses en todas las piezas' },
]

export function TrustBar() {
  return (
    <section aria-label="Beneficios" className="border-y border-line bg-paper">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-line/80 px-5 md:grid-cols-4 md:divide-y-0 md:px-8">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 px-3 py-5 first:pl-0 last:pr-0 sm:justify-center sm:px-5 md:py-7">
            <Icon className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="font-serif text-base text-ink sm:text-lg">{title}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted sm:text-xs">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
