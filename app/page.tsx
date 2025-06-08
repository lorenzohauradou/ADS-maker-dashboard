"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { ShowcaseSection } from "@/components/sections/showcase-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { DeviceShowcaseSection } from "@/components/sections/device-showcase-section"
import { SolutionSection } from "@/components/sections/solution-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { WorkflowSection } from "@/components/sections/workflow-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
        <Header />
        <main className="overflow-x-hidden">
          <HeroSection />
          <ShowcaseSection />
          <WorkflowSection />
          <ProblemSection />
          <SolutionSection />
          <DeviceShowcaseSection />
          <FeaturesSection />
          <PricingSection />
          <FaqSection />
          <CTASection />
        </main>
        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  )
}
