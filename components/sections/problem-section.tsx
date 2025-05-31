import { Card } from "@/components/ui/card"
import { X, Clock, DollarSign, Users } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: DollarSign,
      title: "Costi Proibitivi",
      description: "Le agenzie chiedono €80-€100 per un singolo video ads",
      stat: "80% delle PMI non può permetterselo",
    },
    {
      icon: Clock,
      title: "Tempi Lunghi",
      description: "2-3 settimane per produrre un video pubblicitario",
      stat: "Troppo lento per il mercato digitale",
    },
    {
      icon: Users,
      title: "Complessità Tecnica",
      description: "Serve un team: video editor, voice artist, copywriter",
      stat: "Competenze difficili da trovare",
    },
    {
      icon: X,
      title: "Non Scalabile",
      description: "Impossibile creare varianti per A/B testing",
      stat: "Limita l'ottimizzazione delle campagne",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Il <span className="text-red-500 dark:text-red-400">Problema</span> che Ogni Business Affronta
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ogni business ha bisogno di video ads per crescere, ma la realtà è frustrante...
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
              Risultato: 80% delle PMI rinuncia al video marketing professionale
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
