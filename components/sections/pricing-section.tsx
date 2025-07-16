"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Crown, Zap, Gift, Building2, Link2 } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [showWeeklyPass, setShowWeeklyPass] = useState(false)
  const [exitIntentShown, setExitIntentShown] = useState(false)

  // Exit-intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent && !exitIntentShown) {
        setShowExitIntent(true)
        setExitIntentShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitIntent, exitIntentShown])

  const handlePlanSelect = async (planType: string, planName: string) => {
    if (planName === "Free") {
      // Reindirizza alla dashboard per il piano gratuito
      window.location.href = "/dashboard"
      return
    }

    setLoading(planType)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: planType.toUpperCase()
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error('Errore checkout:', data.error)
        alert('Errore durante la creazione del checkout. Riprova.')
      }
    } catch (error) {
      console.error('Errore:', error)
      alert('Errore di connessione. Riprova.')
    } finally {
      setLoading(null)
    }
  }

  const handleWeeklyPassSelect = async () => {
    setLoading('weekly')

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: 'WEEKLY_PASS'
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error('Errore checkout:', data.error)
        alert('Errore durante la creazione del checkout. Riprova.')
      }
    } catch (error) {
      console.error('Errore:', error)
      alert('Errore di connessione. Riprova.')
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for testing the platform",
      icon: Gift,
      accentColor: "from-slate-500 to-slate-600",
      borderColor: "border-slate-500/20",
      iconBg: "bg-gradient-to-r from-slate-500 to-slate-600",
      features: [
        { text: "1 free video", included: true },
        { text: "Free Generated website", included: true },
        { text: "Basic avatar library (100+ avatars)", included: true },
        { text: "Extra videos at $9 each", included: true },
        { text: "Custom avatar creation", included: false },
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
      accentColor: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/20",
      iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
      features: [
        { text: "10 advertising videos per month", included: true },
        { text: "Auto-generated website", included: true },
        { text: "Full avatar library (750+ avatars)", included: true },
        { text: "Video templates library", included: true },
        { text: "Limited AI image studio access", included: true },
        { text: "Extra videos at $7 each", included: true },
        { text: "Standard support", included: true },
        { text: "Custom avatar creation", included: false },
      ],
      cta: "Start Now",
      popular: false,
    },
    {
      name: "Pro",
      price: "79",
      period: "month",
      description: "Perfect for content creators and small businesses",
      icon: Crown,
      accentColor: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
      popular: true,
      features: [
        { text: "35 video creations per month", included: true },
        { text: "Full avatar library (750+ avatars)", included: true },
        { text: "Design Your Own Avatar from text (5/month)", included: true },
        { text: "🔥 Bring Your Own Avatar (3/month)", included: true, highlight: true },
        { text: "Full AI image studio access", included: true },
        { text: "Unlimited websites generation", included: true },
        { text: "Premium templates", included: true },
        { text: "Priority support", included: true },
      ],
      cta: "Choose Pro",
    },
    {
      name: "Business",
      price: "149",
      period: "month",
      description: "For agencies and teams that need maximum power",
      icon: Building2,
      accentColor: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
      features: [
        { text: "100 video creations per month", included: true },
        { text: "Everything in Pro plan", included: true },
        { text: "Design Your Own Avatar (15/month)", included: true },
        { text: "Bring Your Own Avatar (10/month)", included: true },
        { text: "Multi-scene avatar videos", included: true },
        { text: "Team collaboration (5 seats)", included: true },
        { text: "White-label solutions", included: true },
        { text: "API access", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced analytics", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Custom integrations", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 bg-[#000000]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white leading-tight">
            Smart Pricing
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-3xl mx-auto">
            Professional video ads that cost less than a coffee per day. Speed is the key for every successful business.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 bg-[#2a2a2a] border-2 hover:scale-105 transition-all duration-300 ${plan.popular ? `${plan.borderColor} shadow-lg shadow-purple-500/10` : 'border-[#3a3a3a] hover:border-[#4a4a4a]'
                }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  ✨ Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${plan.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-[#9ca3af] text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-semibold text-white">${plan.price}</span>
                  <span className="text-[#9ca3af] ml-2">/{plan.period}</span>
                </div>
                {plan.name !== "Free" && (
                  <p className="text-xs text-[#6b7280] mt-1">
                    ~${plan.name === "Starter" ? "3.90" : plan.name === "Pro" ? "2.25" : "2.12"} per video
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={cn(
                      "flex items-center space-x-3",
                      feature.included ? "text-[#d1d5db]" : "text-[#6b7280]"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                      feature.included
                        ? plan.popular ? `bg-gradient-to-r ${plan.accentColor}` : "bg-white/20"
                        : "bg-[#3a3a3a]"
                    )}>
                      {feature.included ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-[#6b7280]" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      feature.highlight && plan.popular && "font-medium text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text"
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25"
                  : plan.name === "Free"
                    ? `bg-gradient-to-r ${plan.accentColor} hover:opacity-90 text-white`
                    : `bg-gradient-to-r ${plan.accentColor} hover:opacity-90 text-white`
                  }`}
                size="lg"
                onClick={() => handlePlanSelect(plan.name.toLowerCase(), plan.name)}
                disabled={loading === plan.name.toLowerCase()}
              >
                {loading === plan.name.toLowerCase() ? "Loading..." : plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Weekly Campaign Pass - Contextual Offer */}
        <div className="text-center mt-12">
          <p className="text-[#9ca3af] text-sm mb-4">
            Just need to run a single campaign this week?{" "}
            <button
              onClick={() => setShowWeeklyPass(true)}
              className="text-purple-400 hover:text-purple-300 underline transition-colors"
            >
              Check out our Weekly Campaign Pass 🚀
            </button>
          </p>
        </div>

        {/* Weekly Pass Modal */}
        {showWeeklyPass && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative bg-gradient-to-br from-[#2a2a2a]/95 to-[#1a1a1a]/95 backdrop-blur-xl border border-purple-500/40 rounded-[2rem] p-0 max-w-md mx-auto shadow-2xl shadow-purple-500/30 transform animate-in zoom-in-95 duration-500 overflow-hidden">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-pink-500/10"></div>

              <div className="relative z-10 p-8">
                <div className="text-center">
                  {/* Enhanced header */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-2xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-white/50 via-purple-400 to-white/60 rounded-2xl p-8 shadow-lg">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Weekly Campaign Pass</h3>
                      <p className="text-purple-100 text-sm opacity-90">Unlock Pro features for 7 days</p>
                    </div>
                  </div>

                  {/* Enhanced price section */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center mb-3">
                      <span className="text-6xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">$19</span>
                      <span className="text-[#9ca3af] ml-3 text-xl font-medium">/7 days</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-4 py-2 inline-block border border-purple-500/30">
                      <p className="text-xs text-purple-300 font-semibold">One-time payment • No recurring charges</p>
                    </div>
                  </div>

                  {/* Enhanced features */}
                  <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-6 mb-8 border border-purple-500/30 backdrop-blur-sm">
                    <p className="text-white font-bold mb-5 flex items-center justify-center text-lg">
                      Full Pro Access Includes:
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { icon: "🎥", text: "15 videos" },
                        { icon: "🎨", text: "AI image studio" },
                        { icon: "⭐", text: "Pro features" },
                        { icon: "🎯", text: "Priority support" }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                          <span className="text-lg">{feature.icon}</span>
                          <span className="text-[#d1d5db] font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced action buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setShowWeeklyPass(false)}
                      variant="outline"
                      className="flex-1 border-[#404040] text-[#9ca3af] hover:bg-[#3a3a3a] hover:text-white hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm"
                    >
                      Maybe Later
                    </Button>
                    <Button
                      onClick={handleWeeklyPassSelect}
                      disabled={loading === 'weekly'}
                      className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-purple-500/40 transition-all duration-300 font-bold text-lg py-6 backdrop-blur-sm"
                    >
                      {loading === 'weekly' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Loading...
                        </div>
                      ) : (
                        <span>Get Weekly Pass</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Exit-Intent Popup */}
        {showExitIntent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative bg-gradient-to-br from-[#2a2a2a]/95 to-[#1a1a1a]/95 backdrop-blur-xl border border-purple-500/40 rounded-[2rem] p-0 max-w-lg mx-auto shadow-2xl shadow-purple-500/30 transform animate-in zoom-in-95 duration-500 overflow-hidden">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-pink-500/10"></div>

              <div className="relative z-10 p-8">
                <div className="text-center">
                  {/* Enhanced header */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-2xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-8 shadow-lg">
                      <div className="text-5xl mb-3">⚡</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Wait! Not ready for monthly?</h3>
                      <p className="text-purple-100 text-sm opacity-90">
                        Try our 7-day Pro pass instead
                      </p>
                    </div>
                  </div>

                  {/* Enhanced value proposition */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center mb-6">
                      <span className="text-5xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">$19</span>
                      <span className="text-[#9ca3af] ml-3 text-xl font-medium">for 7 days</span>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-purple-500/30 backdrop-blur-sm">
                      <p className="text-purple-400 font-bold mb-4 flex items-center justify-center text-lg">
                        <span className="mr-2">🎯</span>
                        Perfect for:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm text-[#d1d5db]">
                        {[
                          { text: "Product launches" },
                          { text: "Platform testing" },
                          { text: "Quick campaigns" },
                          { text: "One-time projects" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                            <span className="font-bold text-center justify-end">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced action buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setShowExitIntent(false)}
                      variant="outline"
                      className="flex-1 border-[#404040] text-[#9ca3af] hover:bg-[#3a3a3a] hover:text-white hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm"
                    >
                      No Thanks
                    </Button>
                    <Button
                      onClick={() => {
                        setShowExitIntent(false)
                        handleWeeklyPassSelect()
                      }}
                      disabled={loading === 'weekly'}
                      className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-purple-500/40 transition-all duration-300 font-bold text-lg py-6 backdrop-blur-sm"
                    >
                      {loading === 'weekly' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Loading...
                        </div>
                      ) : (
                        <span>Get My Weekly Pass</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
