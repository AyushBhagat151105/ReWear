import CategoryGrid from '@/components/CategoryGrid'
import CTASection from '@/components/CTASection'
import ProductList from '@/components/FeaturedCarousel'

import LandingHero from '@/components/LandingHero'
import PlatformIntro from '@/components/PlatformIntro'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <LandingHero />
      <CategoryGrid />
      <PlatformIntro />
      <ProductList />
      <CTASection />
    </div>
  )
}
