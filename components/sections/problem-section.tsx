import { Card } from "@/components/ui/card"
import { X, Clock, DollarSign, Users } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: DollarSign,
      title: "Crushing Costs",
      description: "Agencies charge $3,000-$5,000 for a single video ad",
      stat: "80% of SMBs can't afford it",
    },
    {
      icon: Clock,
      title: "Endless Waiting",
      description: "2-3 weeks to produce one advertising video",
      stat: "Too slow for the digital market",
    },
    {
      icon: Users,
      title: "Complex Requirements",
      description: "Need a full team: video editor, voice artist, copywriter",
      stat: "Skills hard to find & expensive",
    },
    {
      icon: X,
      title: "Can't Scale",
      description: "Impossible to create variants for A/B testing",
      stat: "Limits campaign optimization",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-red-500 dark:text-red-400">Problem</span> Every Business Faces
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every business needs video ads to grow, but the reality is frustrating...
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-4">
                <problem.icon className="w-6 h-6 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground mb-3 text-sm">{problem.description}</p>
              <div className="text-xs text-red-500 dark:text-red-400 font-medium">{problem.stat}</div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full">
            <span className="text-red-500 dark:text-red-400 font-semibold">
              Result: 80% of SMBs give up on professional video marketing
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
