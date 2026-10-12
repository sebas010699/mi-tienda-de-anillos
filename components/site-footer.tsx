import Link from 'next/link'

import { whatsappLink } from '@/components/whatsapp-button'
import { siteAsset } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-paper/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_0.7fr_0.9fr] md:gap-16 md:px-8 md:py-20">
        <div>
          <p className="font-serif text-3xl tracking-tight text-paper">
            Juli <span className="text-gold italic">&amp;</span> Sebas
          </p>
          <p className="mt-2 text-[9px] tracking-[0.24em] text-gold uppercase">Joyas para contar historias</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Joyería y accesorios de diseño exclusivo. Piezas seleccionadas a mano para acompañarte
            todos los días.
          </p>
        </div>
        <nav aria-label="Tienda">
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">Tienda</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><a href={siteAsset('/#coleccion')} className="hover:text-paper">Colección</a></li>
            <li><a href={siteAsset('/#historia')} className="hover:text-paper">Nuestra historia</a></li>
            <li><a href={siteAsset('/#preguntas')} className="hover:text-paper">Preguntas frecuentes</a></li>
            <li><Link href="/admin/" className="hover:text-paper">Administración</Link></li>
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
