import { HeroSection } from '@/components/sections/HeroSection'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { BuildSection } from '@/components/sections/BuildSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { ToolsSection } from '@/components/sections/ToolsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { SubscriptionSection } from '@/components/sections/SubscriptionSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ArticlesSection } from '@/components/sections/ArticlesSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { Footer } from '@/components/sections/Footer'
import { RevealAnimations } from '@/components/ui/RevealAnimations'

export default function Home() {
  return (
    <>
      <RevealAnimations />
      <HeroSection />
      <TrustedBy />
      <BuildSection />
      <BenefitsSection />
      <ToolsSection />
      <FeaturesSection />
      <SubscriptionSection />
      <TestimonialsSection />
      <PricingSection />
      <ArticlesSection />
      <FaqSection />
      <CtaSection />
      <NewsletterSection />
      <Footer />
    </>
  )
}
