import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, Brain, Mic, Video, ArrowRight, Link2, Play } from "lucide-react"

export function WorkflowSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Images",
      description: "Upload 1-5 images of your product or screenshots",
      time: "5 sec",
    },
    {
      icon: Brain,
      title: "AI Analyzes",
      description: "AI understands your business and generates optimized script",
      time: "20 sec",
    },
    {
      icon: Mic,
      title: "Realistic Voice",
      description: "Ultra-realistic AI actor with perfect intonation",
      time: "5 sec",
    },
    {
      icon: Video,
      title: "Pro Animations",
      description: "Cinematic effects and automatic subtitles",
      time: "10 sec",
    },
    {
      icon: Link2,
      title: "AI Website",
      description: "Generate optimized website for your product",
      time: "30 sec",
    },
  ]

  return (
    <section id="workflow" className="py-20 px-4 bg-[#000000]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white leading-tight">
            From Image to Video Ads in <span className="text-white">5 Minutes</span>
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-3xl mx-auto">
            The world's simplest process to create professional advertising videos
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-[#9ca3af] max-w-32">{step.description}</p>
                    <Badge
                      className="mt-2 text-xs bg-[#2a2a2a] text-[#d1d5db] border-[#3a3a3a]"
                    >
                      {step.time}
                    </Badge>
                  </div>
                </div>
                {index < steps.length - 1 && <ArrowRight className="w-6 h-6 text-[#6b7280] mx-8" />}
              </div>
            ))}
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="bg-black/30 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{step.title}</h3>
                      <Badge className="text-xs bg-[#1a1a1a] text-[#d1d5db] border-[#3a3a3a]">
                        {step.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#9ca3af]">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-8 py-4 border border-white/20 rounded-full">
            <span className="text-white font-medium text-lg">
              Total: 2 minutes vs 2-3 weeks traditional
            </span>
          </div>
        </div>

        {/* CTA after workflow */}
        <div className="text-center mt-16">
          <div className="rounded-3xl relative overflow-hidden max-w-7xl mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              src="/gradient_bg.mp4"
            />
            <div className="relative z-10 p-16 text-center backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center">
              <h3 className="text-3xl font-semibold mb-6 text-white">
                Ready to create your first video?
              </h3>
              <p className="text-[#d1d5db] mb-8 max-w-2xl mx-auto">
                While your competitors wait weeks for their videos, you can have yours ready in 1 minute.
                <span className="hidden md:block">
                  Start now and get an immediate competitive advantage.
                </span>
              </p>
              <Button className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium">
                <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Create Your <span className="hidden md:inline">Viral</span> Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
