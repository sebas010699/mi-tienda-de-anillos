import type { Metadata } from 'next'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CheckoutView } from '@/components/checkout-view'

export const metadata: Metadata = {
  title: 'Finalizar compra | Juli y Sebas',
}

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <CheckoutView />
      </main>
      <SiteFooter />
    </>
  )
}
