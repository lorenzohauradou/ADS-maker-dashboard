import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Brain, Mic, Video, Smartphone, ArrowRight, CheckCircle, Play, Sparkles, TrendingUp, Clock, DollarSign } from "lucide-react"

export function SolutionSection() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI Script Generation",
      description: "Scripts automatically optimized for your business type and target audience",
      highlight: "147% higher conversion rates",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mic,
      title: "Ultra-Realistic Voice",
      description: "Next-gen TTS technology indistinguishable from professional voice actors",
      highlight: "98% can't tell it's AI-generated",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Video,
      title: "Cinematic Production",
      description: "Hollywood-level transitions, effects and animations applied automatically",
      highlight: "Professional quality guaranteed",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Optimization",
      description: "Perfect output for TikTok, Instagram, YouTube, Facebook and LinkedIn",
      highlight: "Maximum reach across all channels",
      color: "from-orange-500 to-red-500"
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "5 Minutes vs 4 Weeks",
      description: "Create professional video ads faster than competitors can plan them",
      stat: "1200% faster"
    },
    {
      icon: DollarSign,
      title: "$39 vs $5,000",
      description: "Get agency-quality results at a fraction of the traditional cost",
      stat: "98% cost savings"
    },
    {
      icon: TrendingUp,
      title: "Unlimited Variations",
      description: "A/B test different versions until you find the perfect converting video",
      stat: "Endless possibilities"
    }
  ]



  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-green-50/30 dark:to-green-950/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <Badge
            variant="secondary"
            className="mb-4 md:mb-6 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 backdrop-blur-sm px-4 py-2"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            The Complete Solution
          </Badge>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              FAST ADS AI
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-muted-foreground font-normal">
              Changes Everything
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Not just another video editor - a specialized AI that understands your business
            and creates video ads that <span className="text-green-600 font-semibold">actually convert</span>.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {mainFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card/80 border-border p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden backdrop-blur-sm"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className={`absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${feature.color} rounded-2xl opacity-20 animate-ping group-hover:animate-none`}></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-base">
                    {feature.highlight}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Comparison */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-blue-600">FAST ADS AI</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
              Compare traditional methods with our AI-powered solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-card to-muted/30 border-border p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-3 text-foreground">{benefit.title}</h4>
                <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
                  {benefit.description}
                </p>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold px-3 py-1"
                >
                  {benefit.stat}
                </Badge>
              </Card>
            ))}
          </div>
        </div>



        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-card/80 to-muted/30 rounded-2xl md:rounded-3xl p-8 md:p-12 border border-border backdrop-blur-sm relative overflow-hidden max-w-4xl mx-auto">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-36 md:h-36 bg-blue-500/10 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mr-3" />
                <span className="text-xl md:text-2xl font-bold text-foreground">
                  Ready to Transform Your Marketing?
                </span>
              </div>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
                Join thousands of businesses that have already revolutionized their video marketing.
                Your first professional video is just 5 minutes away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 md:px-12 py-4 md:py-6 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:scale-110 transition-transform" />
                  Start Creating Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent px-8 md:px-12 py-4 md:py-6 text-base md:text-lg transition-all duration-300 group w-full sm:w-auto"
                >
                  See How It Works
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground mt-6">
                <span className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  No credit card required
                </span>
                <span className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  First video free
                </span>
                <span className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Setup in 2 minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
