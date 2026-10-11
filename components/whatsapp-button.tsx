import { MessageCircle } from 'lucide-react'

export const WHATSAPP_NUMBER = '573143055284'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Hola, quisiera recibir asesoría sobre sus anillos.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-forest text-paper shadow-lg shadow-forest/25 transition hover:bg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="sr-only">Escríbenos por WhatsApp</span>
    </a>
  )
}
