import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, Brain, Mic, Video, Smartphone, ArrowRight, Play, Zap } from "lucide-react"

export function WorkflowSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Images",
      description: "Upload 1-5 images of your product or screenshots",
      time: "30 sec",
    },
    {
      icon: Brain,
      title: "AI Analyzes",
      description: "AI understands your business and generates optimized script",
      time: "1 min",
    },
    {
      icon: Mic,
      title: "Realistic Voice",
      description: "Ultra-realistic AI actor with perfect intonation",
      time: "1 min",
    },
    {
      icon: Video,
      title: "Pro Animations",
      description: "Cinematic effects and automatic subtitles",
      time: "2 min",
    },
    {
      icon: Smartphone,
      title: "Multi-Platform",
      description: "Publish optimized videos to every social network",
      time: "30 sec",
    },
  ]

  return (
    <section id="workflow" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          >
            Magic Workflow
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Image to Video Ads in <span className="text-blue-600 dark:text-blue-400">5 Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The world's simplest process to create professional advertising videos
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-32">{step.description}</p>
                    <Badge
                      variant="outline"
                      className="mt-2 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400"
                    >
                      {step.time}
                    </Badge>
                  </div>
                </div>
                {index < steps.length - 1 && <ArrowRight className="w-6 h-6 text-muted-foreground mx-8" />}
              </div>
            ))}
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-600 dark:text-blue-400">
                        {step.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full backdrop-blur-sm">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              Total: 5 minutes vs 2-3 weeks traditional
            </span>
          </div>
        </div>

        {/* CTA after workflow */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <span className="text-lg font-semibold text-foreground">
                Ready to create your first video?
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              While your competitors wait weeks for their videos, you can have yours ready in 5 minutes.
              Start now and get an immediate competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Create your first free video
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent px-8 py-4"
              >
                Watch Demo in action
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Setup in 30 seconds
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                No credit card required
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                HD video included
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
