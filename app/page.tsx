import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TrustBar } from '@/components/trust-bar'
import { ProductGrid } from '@/components/product-grid'
import { Story } from '@/components/story'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <ProductGrid />
        <Story />
        <Testimonials />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
