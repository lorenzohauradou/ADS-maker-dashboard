import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Mic, Video, Smartphone } from "lucide-react"

export function SolutionSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Script Generation",
      description: "Scripts automatically optimized for your business type",
    },
    {
      icon: Mic,
      title: "Ultra-Realistic Voice",
      description: "Next-gen TTS indistinguishable from human voice",
    },
    {
      icon: Video,
      title: "Cinematic Animations",
      description: "Professional transitions and effects applied automatically",
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Ready",
      description: "Output optimized for TikTok, Instagram, YouTube and Facebook",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
          >
            <Zap className="w-4 h-4 mr-2" />
            The Game-Changing Solution
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              ADS MAKER AI
            </span>
            : The AI That Changes Everything
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Not just another generic video editor, but specialized AI that understands your business and creates video ads that actually convert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg mb-4">
                <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">3-5 Minutes</div>
              <div className="text-muted-foreground">instead of 2-4 weeks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$39/month</div>
              <div className="text-muted-foreground">instead of $500 per video</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Unlimited</div>
              <div className="text-muted-foreground">A/B test variants</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}