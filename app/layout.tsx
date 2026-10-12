import type { Metadata, Viewport } from 'next'

import { CartProvider } from '@/components/cart-provider'
import { CartDrawer } from '@/components/cart-drawer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

export const metadata: Metadata = {
  title: 'Juli y Sebas | Joyería y accesorios exclusivos',
  description:
    'Anillos y accesorios de diseño exclusivo. Piezas seleccionadas a mano, empaque de regalo y pedidos por WhatsApp con envío a toda Colombia.',
}

export const viewport: Viewport = {
  themeColor: '#213a2c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
