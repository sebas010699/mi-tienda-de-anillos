import { Plus } from 'lucide-react'

const QUESTIONS = [
  {
    q: '¿Cuánto tarda el envío?',
    a: 'Despachamos en 24 horas hábiles. El envío es gratis y llega entre 2 y 5 días hábiles a cualquier ciudad de Colombia.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Escríbenos por WhatsApp para confirmar tu pedido y coordinar el método de pago disponible.',
  },
  {
    q: '¿Cómo sé mi talla?',
    a: 'La mayoría de nuestros diseños son ajustables. Si tienes dudas, escríbenos por WhatsApp y te ayudamos a elegir la talla ideal.',
  },
  {
    q: '¿Puedo cambiar o devolver mi pedido?',
    a: 'Sí. Tienes 15 días desde que recibes tu pedido para solicitar un cambio, siempre que la pieza esté sin uso y en su empaque original.',
  },
  {
    q: '¿Las piezas tienen garantía?',
    a: 'Todas nuestras piezas cuentan con 6 meses de garantía por defectos de fabricación.',
  },
]

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-28 border-t border-line bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Ayuda</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Preguntas frecuentes</h2>
        </div>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="size-4 shrink-0 text-gold transition group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
