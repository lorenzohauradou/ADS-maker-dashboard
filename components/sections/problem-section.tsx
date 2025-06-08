import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingDown, Clock, DollarSign, Users, Zap, ChevronRight } from "lucide-react"

export function ProblemSection() {
  const painPoints = [
    {
      icon: DollarSign,
      title: "Your Competitors Are Stealing Your Customers",
      description: "While you're stuck with static images and boring ads, they're using viral videos that get 1200% more engagement",
      realImpact: "Lost opportunity: $50K+ revenue per month",
      urgency: "Every day you wait, they gain more market share"
    },
    {
      icon: Clock,
      title: "Missing The AI Video Gold Rush",
      description: "Your competitors are already using AI to create 10x more videos, with 90% lower costs and higher margins. They're scaling while you're still stuck in the old way",
      realImpact: "Competitive disadvantage: -75% efficiency vs AI users",
      urgency: "AI adopters are dominating market share daily"
    },
    {
      icon: TrendingDown,
      title: "Burning Money on Agencies & Freelancers",
      description: "$500-$2000 per video, 2-4 weeks delivery, and most videos don't even convert",
      realImpact: "Wasted budget: $15K+ with zero ROI guarantee",
      urgency: "Cash flow bleeding while competitors scale"
    }
  ]


  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-red-50/30 dark:to-red-950/20 relative overflow-hidden">
      {/* Background urgency elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge
            variant="destructive"
            className="mb-6 bg-red-500/10 text-red-600 border-red-500/20 animate-pulse"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Critical Business Alert
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            While You're Reading This,
            <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Your Competitors Are Winning
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <strong className="text-red-600">89% of businesses</strong> without video marketing are losing customers every single day to competitors who understand the power of video ads.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((pain, index) => (
            <Card
              key={index}
              className="bg-card/80 border-red-200/50 dark:border-red-800/50 p-6 hover:border-red-400/50 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Urgency indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>

              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-4 group-hover:bg-red-500/20 transition-colors">
                <pain.icon className="w-6 h-6 text-red-600" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground leading-tight">{pain.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{pain.description}</p>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-red-600 bg-red-50/50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                  💸 {pain.realImpact}
                </div>
                <div className="text-xs text-orange-600 bg-orange-50/50 dark:bg-orange-950/30 px-3 py-2 rounded-lg border-l-2 border-orange-400">
                  ⚡ {pain.urgency}
                </div>
              </div>
            </Card>
          ))}
        </div>


        {/* Urgency CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-red-500/15 to-orange-500/15 border-2 border-red-500/30 rounded-2xl backdrop-blur-sm max-w-4xl">
            <Zap className="w-6 h-6 text-red-600 mr-3 animate-bounce" />
            <span className="text-red-600 dark:text-red-400 font-bold text-lg">
              Every minute without video ads = Money flowing to your competitors
            </span>
            <ChevronRight className="w-5 h-5 text-red-600 ml-3" />
          </div>

          <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
            The businesses dominating your market right now started with video marketing 6-12 months ago.
            <strong> Don't let them get further ahead.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
