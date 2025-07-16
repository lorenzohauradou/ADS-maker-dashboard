"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { CreatorsBusinessesSection } from "@/components/sections/creators-businesses-section"
import { VideoShowcaseSection } from "@/components/sections/video-showcase-section"
import { AIIntelligenceSection } from "@/components/sections/ai-intelligence-section"
// import { TrustedCompaniesSection } from "@/components/sections/trusted-companies-section"
import { ShowcaseSection } from "@/components/sections/showcase-section"
// import { ProblemSection } from "@/components/sections/problem-section"
import { DeviceShowcaseSection } from "@/components/sections/device-showcase-section"
// import { SolutionSection } from "@/components/sections/solution-section"
// import { FeaturesSection } from "@/components/sections/features-section"
import { WorkflowSection } from "@/components/sections/workflow-section"
import { AvatarSelectionSection } from "@/components/sections/avatar-selection-section"
import { WebsiteShowcaseSection } from "@/components/sections/website-showcase-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StickyCTA } from "@/components/layout/sticky-cta"
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <CreatorsBusinessesSection />
        <VideoShowcaseSection />
        <AIIntelligenceSection />
        {/* <TrustedCompaniesSection /> */}
        <ShowcaseSection />
        <WorkflowSection />
        <AvatarSelectionSection />
        {/* <ProblemSection /> */}
        {/* <SolutionSection /> */}
        <WebsiteShowcaseSection />
        {/* <DeviceShowcaseSection /> */}
        <PricingSection />
        <FaqSection />
        <CTASection />
      </main>
      <Footer />
      <StickyCTA />
      <Analytics />
    </div>
  )
}
