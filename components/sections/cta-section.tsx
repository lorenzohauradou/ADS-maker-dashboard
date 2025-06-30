import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-card to-muted/50 rounded-3xl p-12 text-center border border-border relative overflow-hidden backdrop-blur-sm">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                Ready to Transform Your Marketing?
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Start Creating Professional
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Video Ads Today
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have already transformed their video marketing with Fast Ads AI. Your first video is free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 text-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Create Your First Video Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent text-lg px-8 py-4"
              >
                Talk to Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                2-minute setup
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                No credit card required
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Dedicated support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
