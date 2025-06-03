import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, ShoppingCart, Briefcase, Target, Palette, BarChart, ArrowRight, Crown, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const specializations = [
    {
      icon: Code,
      title: "SaaS/Tech",
      description: "Professional scripts, authoritative voice, ROI and metrics focus",
      example: '"Still wasting time with manual deployments?"',
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Engaging voice, lifestyle shots, product quality focus",
      example: '"Here\'s why 10K+ customers love this product"',
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Credible voice, before/after, testimonials and case studies",
      example: '"How Fortune 500 companies achieve extraordinary results"',
    },
  ]

  const differentiators = [
    {
      icon: Target,
      title: "vs Canva/CapCut",
      points: ["Specialized for ADS", "AI Script Generation", "Human-like realistic voice"],
    },
    {
      icon: Palette,
      title: "vs Agencies",
      points: ["5 minutes vs 2-4 weeks", "$39/month vs $10K", "Unlimited A/B variants"],
    },
    {
      icon: BarChart,
      title: "vs Luma/Runway",
      points: ["Business-focused", "Real images", "Immediate ROI"],
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Specializations */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
            >
              AI Specialization
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Not a Generic Video Editor</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized AI that understands your business type and creates optimized content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mb-4">
                  <spec.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{spec.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{spec.description}</p>
                <div className="bg-muted/50 rounded-lg p-3 border-l-2 border-purple-500">
                  <div className="text-xs text-muted-foreground mb-1">Script Example:</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 italic">{spec.example}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why ADS MAKER AI is <span className="text-yellow-600 dark:text-yellow-400">Different</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not another editing tool. We're the first AI specialized for video ads that actually convert.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg mb-4">
                  <diff.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{diff.title}</h3>
                <ul className="space-y-2">
                  {diff.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mr-3"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Contextual CTA after differentiators */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="text-lg font-semibold text-foreground">
                    Pronto a Dominare la Concorrenza?
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Ora che hai visto cosa ti separa dai tuoi competitor, è il momento di agire.
                  Mentre loro lottano con strumenti generici e costi elevati, tu puoi creare video professionali in minuti.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-4"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Inizia il Tuo Vantaggio Competitivo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent px-8 py-4"
                  >
                    Confronta con la Concorrenza
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <div className="text-center mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                  >
                    🎯 Garanzia 30 giorni ROI o rimborso completo
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
