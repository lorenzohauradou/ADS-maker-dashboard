import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Crown, Zap, Gift, Building2, Star } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for testing the platform",
      icon: Gift,
      color: "from-slate-600 to-slate-700",
      borderColor: "border-slate-300 dark:border-slate-700",
      bgColor: "bg-slate-50 dark:bg-slate-900/40",
      features: [
        { text: "1 free video", included: true },
        { text: "Free Generated website", included: true },
        { text: "Extra videos at $9 each", included: true },
        { text: "Priority support", included: false },
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Starter",
      price: "39",
      period: "month",
      description: "Ideal for small businesses and content creators",
      icon: Zap,
      color: "from-blue-600 to-blue-700",
      borderColor: "border-blue-300 dark:border-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-500/5",
      features: [
        { text: "10 advertising videos per month", included: true },
        { text: "Auto-generated website", included: true },
        //{ text: "1 custom domain", included: true },
        { text: "HD + 4K downloads", included: true },
        { text: "Extra videos at $7 each", included: true },
        { text: "Email support", included: true },
      ],
      cta: "Start Now",
      popular: false,
    },
    {
      name: "Pro",
      price: "79",
      period: "month",
      description: "For businesses that want to scale fast",
      icon: Crown,
      color: "from-purple-600 to-pink-600",
      borderColor: "border-purple-300 dark:border-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-500/5",
      features: [
        { text: "25 advertising videos per month", included: true },
        { text: "Unlimited generated websites", included: true },
        //{ text: "Automatic A/B testing", included: true },
        //{ text: "Advanced analytics", included: true },
        { text: "Extra videos at $5 each", included: true },
        { text: "Priority support", included: true },
        //{ text: "Auto social media publishing", included: true },
      ],
      cta: "Choose Pro",
      popular: true,
    },
    {
      name: "Business",
      price: "149",
      period: "month",
      description: "For enterprise companies and agencies",
      icon: Building2,
      color: "from-orange-600 to-red-600",
      borderColor: "border-orange-300 dark:border-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-500/5",
      features: [
        { text: "55 advertising videos per month", included: true },
        { text: "Unlimited websites", included: true },
        { text: "Complete white-label", included: true },
        { text: "Full API access", included: true },
        { text: "Extra videos at $3 each", included: true },
        //{ text: "Dedicated account manager", included: true },
        { text: "24/7 priority support", included: true },
        //{ text: "Custom dashboard", included: true },
        //{ text: "CRM integration", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-muted/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 backdrop-blur-sm"
          >
            💰 Competitive Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional video ads that cost less than a coffee per day. Speed is the key for every successful business.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 ${plan.bgColor} ${plan.borderColor} border-2 hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:shadow-xl`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  🔥 Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                {plan.name !== "Free" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ~${plan.name === "Starter" ? "3.90" : plan.name === "Pro" ? "3.16" : "2.70"} per video
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                  : "bg-card hover:bg-accent text-foreground border border-border"
                  }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-8">
            <span>✅ No annual contract</span>
            <span>✅ Cancel anytime</span>
            <span>✅ English support</span>
            <span>✅ Free migration</span>
          </div>
        </div>
      </div>
    </section>
  )
}
