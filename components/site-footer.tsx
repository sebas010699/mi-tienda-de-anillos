import Link from 'next/link'

import { whatsappLink } from '@/components/whatsapp-button'

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-paper/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl text-paper">
            Juli <span className="text-gold italic">&amp;</span> Sebas
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Joyería y accesorios de diseño exclusivo. Piezas seleccionadas a mano para acompañarte
            todos los días.
          </p>
        </div>
        <nav aria-label="Tienda">
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">Tienda</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link href="/#coleccion" className="hover:text-paper">Colección</Link></li>
            <li><Link href="/#historia" className="hover:text-paper">Nuestra historia</Link></li>
            <li><Link href="/#preguntas" className="hover:text-paper">Preguntas frecuentes</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">Contacto</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={whatsappLink('Hola, tengo una pregunta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                WhatsApp +57 314 305 5284
              </a>
            </li>
            <li>Envíos a toda Colombia</li>
            <li>Lunes a sábado · 9:00 a 19:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs md:flex-row md:px-8">
          <p>© 2026 Juli y Sebas. Todos los derechos reservados.</p>
          <p>Pedidos y atención por WhatsApp</p>
        </div>
      </div>
    </footer>
  )
}
