"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Link2 } from "lucide-react"

export function CTASection() {
  const isMobile = useIsMobile()
  return (
    <section className="py-12 md:py-20 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div id="final-cta" className="rounded-2xl md:rounded-3xl relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src="/gradient_bg.mp4"
          />
          <div className="relative z-10 p-8 md:p-12 text-center backdrop-blur-sm bg-black/30">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-sans mb-8 md:mb-10 text-white leading-tight">
              Get started with Fast Ads
            </h2>

            {/* CTA Buttons - responsive design */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <div className="w-full md:w-auto flex items-center bg-[#3a3a3a] rounded-full px-4 py-2.5 md:px-6 md:py-3">
                <Link2 className="w-4 h-4 text-[#9ca3af] mr-2 flex-shrink-0" />
                <span className="text-[#d1d5db] text-sm flex-1 whitespace-nowrap">{isMobile ? "Upload image" : "Drop a product photo and ..."}</span>
                <Button
                  className="ml-2 bg-white text-black hover:bg-gray-100 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-sm font-medium transition-all"
                >
                  Try free
                </Button>
              </div>

              {/* Secondary CTA for mobile */}
              <div className="w-full md:hidden">
                <Button
                  className="w-full bg-transparent text-white hover:bg-white/10 px-4 py-2.5 rounded-full text-sm font-medium transition-all border border-[#404040]"
                >
                  Get free ads
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
