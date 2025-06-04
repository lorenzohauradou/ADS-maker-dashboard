import { Card } from "@/components/ui/card"
import { X, Clock, DollarSign, Users, Code, Zap } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: DollarSign,
      title: "Crushing Video Costs",
      description: "Need video editor, web developer, copywriter, designer",
      stat: "4-5 specialists = $3K+ monthly cost",
    },
    {
      icon: Code,
      title: "Expensive Website Development",
      description: "Custom landing pages cost $2,000-$8,000 and take weeks",
      stat: "Most businesses use generic templates",
    },
    {
      icon: Clock,
      title: "Endless Waiting Times",
      description: "2-3 weeks for video + 1-2 weeks for landing page setup",
      stat: "Too slow for agile marketing campaigns",
    },
  ]

  return (
    <section className="py-16 sm:py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            The <span className="text-red-500 dark:text-red-400">Problem</span> Every Business Faces
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto">
            Every business needs professional video ads AND high-converting landing pages to grow, but the reality is frustrating...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="bg-card border-border p-4 sm:p-6 hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-500/10 rounded-lg mb-3 sm:mb-4 group-hover:bg-red-500/20 transition-colors">
                <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed">{problem.description}</p>
              <div className="text-xs sm:text-sm text-red-500 dark:text-red-400 font-medium bg-red-500/5 px-2 py-1 rounded-md">
                {problem.stat}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          <div className="text-center p-4 sm:p-6 bg-card/50 rounded-xl border border-red-200 dark:border-red-800">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400 mb-2">$15K+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Average cost for professional video + landing page</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-card/50 rounded-xl border border-red-200 dark:border-red-800">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400 mb-2">4-6 weeks</div>
            <div className="text-sm sm:text-base text-muted-foreground">Time to launch complete campaign</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-card/50 rounded-xl border border-red-200 dark:border-red-800 sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400 mb-2">80%</div>
            <div className="text-sm sm:text-base text-muted-foreground">SMBs that give up on professional marketing</div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full max-w-full">
            <span className="text-red-500 dark:text-red-400 font-semibold text-sm sm:text-base text-center">
              Result: Most businesses struggle with fragmented, expensive marketing that doesn't convert
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
